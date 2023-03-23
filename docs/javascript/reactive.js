/**
 * @Author: wangrenjie86@gmail.com
 * @Date: 2023-03-20 12:05:33
 * @LastEditors: wangrenjie86@gmail.com
 * @LastEditTime: 2023-03-21 13:48:46
 * @FilePath: \docs\javascript\reactive.js
 * @Description:
 */

// for...in执行的时候依赖搜集的key
const ITERATE_KEY = Symbol();
const TriggerType = {
  SET: 'SET',
  ADD: 'ADD',
  DELETE: 'DELETE',
};

// 定义一个 Map 实例，存储原始对象到代理对象的映射
const reactiveMap = new Map();

function reactive(obj) {
  // 优先通过原始对象 obj 寻找之前创建的代理对象，如果找到了，直接返回已有的代理对象
  const existionProxy = reactiveMap.get(obj);
  if (existionProxy) return existionProxy;

  // 否则，创建新的代理对象
  const proxy = createReactive(obj);
  // 存储到 Map 中，从而避免重复创建
  reactiveMap.set(obj, proxy);

  return proxy;
}

function shallowReactive(obj) {
  return createReactive(obj, true);
}

function readonly(obj) {
  return createReactive(oj, false, true);
}

function shallowReadonly(obj) {
  return createReactive(oj, true, true);
}

// 重写数组的方法
const arrayInstrumentations = {};
['includes', 'indexOf', 'lastIndexOf'].forEach(method => {
  const originMethod = Array.prototype[method];
  arrayInstrumentations[method] = function (...args) {
    // this 是代理对象，先在代理对象中查找，将结果存储到 res 中
    let res = originMethod.apply(this, args);
    if (res === false || res === -1) {
      // res 为 false 说明没找到，通过 this.raw 拿到原始数组，再去其中查找，并更新 res 值
      res = originMethod.apply(this.raw, args);
    }
    // 返回最终结果
    return res;
  };
});

// 重写数组的 push、pop、shift、unshift 以及 splice 方法
let shouldTrack = true;
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(method => {
  const originMethod = Array.prototype[method];
  arrayInstrumentations[method] = function (...args) {
    shouldTrack = false;
    let res = originMethod.apply(this, args);
    shouldTrack = true;
    return res;
  };
});

function createReactive(obj, isShallow = false, isReadonly = false) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      // 代理对象可以通过 raw 属性访问原始数据
      if (key === 'raw') {
        return target;
      }
      // 如果读取的是 size 属性，通过指定第三个参数 receiver 为原始对象 target 从而修复问题
      if (key === 'size') {
        track(target, ITERATE_KEY);
        return Reflect.get(target, key, target);
      }

      // 如果操作的目标对象是数组，并且 key 存在于arrayInstrumentations 上，
      // 那么返回定义在 arrayInstrumentations 上的值
      if (Array.isArray(target) && arrayInstrumentations.hasOwnProperty(key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }

      // 非只读的时候才需要建立响应联系
      // 如果 key 的类型是 symbol，则不进行追踪
      if (!isReadonly && typeof key !== 'symbol') {
        track(target, key);
      }

      const res = Reflect.get(target, key, receiver);

      if (isShallow) {
        return res;
      }

      if (typeof res === 'object' && res !== null) {
        // 如果数据为只读，则调用 readonly 对值进行包装，调用 reactive 将结果包装成响应式数据并返回
        return isReadonly ? readonly(res) : reactive(res);
      }
      // 返回 res
      return res;
    },
    set(target, key, newVal, receiver) {
      // 如果是只读的，则打印警告信息并返回
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读的`);
        return true;
      }
      const oldVal = target[key];
      // 如果属性不存在，则说明是在添加新属性，否则是设置已有属性
      // 如果代理目标是数组，则检测被设置的索引值是否小于数组长度，如果是，则视作 SET 操作，否则是 ADD 操作
      const type = Array.isArray(target)
        ? Number(key) < target.length
          ? TriggerType.SET
          : TriggerType.ADD
        : Object.prototype.hasOwnProperty.call(target, key)
        ? TriggerType.SET
        : TriggerType.ADD;
      let res = Reflect.set(target, key, newVal, receiver);

      // target === receiver.raw 说明 receiver 就是 target 的代理对象，屏蔽原型引起的多次更新
      if (target === receiver.raw) {
        // 比较新值与旧值，只有当它们不全等，并且不都是 NaN 的时候才触发响应
        if (oldVal !== newVal && (oldVal === oldVal || newVal === newVal)) {
          // 将 type 作为第三个参数传递给 trigger 函数
          trigger(target, key, type);
        }
        return res;
      }
    },
    has(target, key) {
      // "a" in obj相当去读操作，会触发has
      track(target, key);
      return Reflect.has(target, key);
    },
    ownKeys(target) {
      // for...in遍历也属于读操作，会触发ownKeys
      // 将副作用函数与 ITERATE_KEY 关联
      // 如果操作目标 target 是数组，则使用 length 属性作为 key 并建立响应联系
      track(target, Array.isArray(target) ? 'length' : ITERATE_KEY);
      return Reflect.ownKeys(target);
    },
    deleteProperty(target, key) {
      // 如果是只读的，则打印警告信息并返回
      if (isReadonly) {
        console.warn(`属性 ${key} 是只读的`);
        return true;
      }
      // 检查被操作的属性是否是对象自己的属性
      const hadKey = Object.prototype.hasOwnProperty.call(target, key);
      // 使用 Reflect.deleteProperty 完成属性的删除
      const res = Reflect.deleteProperty(target, key);
      if (res && hadKey) {
        // 只有当被删除的属性是对象自己的属性并且成功删除时，才触发更新
        trigger(target, key, TriggerType.DELETE, newVal);
      }
      return res;
    },
  });
}

let bucket = new WeakMap();
// 依赖搜集
function track(target, key) {
  if (!activeEffect || !shouldTrack) {
    return;
  }

  let depsMap = bucket.get(target);
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()));
  }

  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }

  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

// 依赖触发
function trigger(target, key, type, newVal) {
  let depsMap = bucket.get(target);
  if (!depsMap) {
    return;
  }
  // 取得与 key 相关联的副作用函数
  let effects = depsMap.get(key);

  // clone一份，防止cleanup导致死循环
  let effectsToRun = new Set();
  // 将与 key 相关联的副作用函数添加到 effectsToRun
  effects &&
    effects.forEach(effectFn => {
      // 防止无限递归调用
      if (effectFn !== activeEffect) {
        effectsToRun.add(effectFn);
      }
    });
  // 当操作类型为 ADD 或 DELETE 时，需要触发与 ITERATE_KEY 相关联的副作用函数重新执行，个数发生变化for...in的次数会发生变化，需要重新执行
  if (type === TriggerType.ADD || type === TriggerType.DELETE) {
    // 取得与 ITERATE_KEY 相关联的副作用函数
    const iterateEffects = depsMap.get(ITERATE_KEY);
    iterateEffects &&
      iterateEffects.forEach(effectFn => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }

  // 当操作类型为 ADD 并且目标对象是数组时，应该取出并执行那些与 length属性相关联的副作用函数
  if (type === TriggerType.ADD && Array.isArray(target)) {
    // 取出与 length 相关联的副作用函数
    const lengthEffects = depsMap.get('length');
    // 将这些副作用函数添加到 effectsToRun 中，待执行
    lengthEffects &&
      lengthEffects.forEach(effectFn => {
        if (effectFn !== activeEffect) {
          effectsToRun.add(effectFn);
        }
      });
  }

  // 如果操作目标是数组，并且修改了数组的 length 属性
  if (Array.isArray(target) && key === 'length') {
    // 对于索引大于或等于新的 length 值的元素，
    // 需要把所有相关联的副作用函数取出并添加到 effectsToRun 中待执行
    depsMap.forEach((effects, key) => {
      if (key >= newVal) {
        effects.forEach(effectFn => {
          if (effectFn !== activeEffect) {
            effectsToRun.add(effectFn);
          }
        });
      }
    });
  }

  effectsToRun &&
    effectsToRun.forEach(effectFn => {
      // 如果有调度器函数，就转交给调度器，否则直接执行
      if (effectFn.options.scheduler) {
        effectFn.options.scheduler(effectFn);
      } else {
        effectFn();
      }
    });
}

// 用一个全局变量存储当前激活的 effect 函数
let activeEffect;
// effect 栈，解决effect嵌套后activeEffect指向不正确问题
const effectStack = []; // 新增

// 注册副作用函数，options.scheduler调度函数，可以自定义副作用函数执行时机
function effect(fn, options = {}) {
  const effectFn = () => {
    cleanup(effectFn);
    // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
    activeEffect = effectFn;
    // 在调用副作用函数之前将当前副作用函数压入栈中
    effectStack.push(effectFn);
    const res = fn();
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把activeEffect 还原为之前的值
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1];
    return res;
  };

  effectFn.options = options;
  effectFn.deps = [];
  if (!options.lazy) {
    effectFn();
  }
  return effectFn;
}

// 清除函数，如果不清除依赖关系，会导致不必要的副作用执行，比如 effect(()=>{let res = obj.a ? obj.b : 0})，当obj.a为true时会搜集a,b对应的依赖，如果不清除，当a变为false时，修改obj.b会在此触发effect函数
function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    let deps = effectFn.deps[i];
    deps.delete(effectFn);
  }
  effectFn.deps = [];
}

// 多次重复只触发一次，使用调度器完成
const jobList = new Set();
// 是否正在刷新队列
let isFlushing = false;
function flushJob() {
  if (isFlushing) {
    return;
  }
  isFlushing = true;
  // 创建一个promise，让同步代码执行完在执行Promise.then里的代码
  Promise.resolve()
    .then(() => {
      jobList.forEach(job => job());
    })
    .finally(() => {
      isFlushing = false;
    });
}

// 计算属性
function computed(getter) {
  let value;
  let dirty = true;

  const effectFn = effect(getter, {
    lazy: true,
    scheduler() {
      // 有值发生变化，要设脏
      dirty = true;
      // 解决计算属性被effect包裹时，当计算属性依赖的响应式数据变化时，手动调用 trigger 函数触发响应
      trigger(obj, 'value');
    },
  });

  const obj = {
    get value() {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      // 解决计算属性被effect包裹时，当读取 value 时，手动调用 track 函数进行追踪
      track(obj, 'value');

      return value;
    },
  };
  return obj;
}

// watch

function watch(source, cb, options) {
  let getter;
  if (typeof source === 'function') {
    getter = source;
  } else {
    // 对象就递归遍历读取，触发依赖搜集
    getter = () => traverse(source);
  }

  const job = () => {
    newValue = effectFn();
    // 在调用回调函数 cb 之前，先调用过期回调
    if (cleanup) {
      cleanup();
    }
    // 将 onInvalidate 作为回调函数的第三个参数，以便用户使用
    cb(newValue, oldValue, onInvalidate);
    oldValue = newValue;
  };

  let oldValue, newValue;
  // cleanup 用来存储用户注册的过期回调
  let cleanup;
  // 定义 onInvalidate 函数
  function onInvalidate(fn) {
    // 将过期回调存储到 cleanup 中
    cleanup = fn;
  }
  const effectFn = effect(() => getter(), {
    lazy: true,
    scheduler: () => {
      // 默认 flush='sync'，同步执行
      // 'prev'，组件更新前
      // 当 flush 的值为 'post' 时，组件更新后，代表调度函数需要将副作用函数放到一个微任务队列中，并等待 DOM 更新结束后再执行
      if (options.flush === 'post') {
        Promise.resolve().then(job);
      } else {
        job();
      }
    },
  });

  if (options.immediate) {
    job();
  } else {
    oldValue = effectFn();
  }
}

// 递归读取属性
function traverse(value, seen = new Set()) {
  // 如果要读取的数据是原始值，或者已经被读取过了，那么什么都不做
  if (typeof value !== 'object' || value === null || seen.has(value)) return;
  // 将数据添加到 seen 中，代表遍历地读取过了，避免循环引用引起的死循环
  seen.add(value);
  // 暂时不考虑数组等其他结构20 // 假设 value 就是一个对象，使用 for...in 读取对象的每一个值，并递归地调用 traverse 进行处理
  for (const k in value) {
    traverse(value[k], seen);
  }

  return value;
}

// effect嵌套，vue中组件的嵌套就是effect的嵌套
// 原始数据
// const data = { foo: true, bar: true };
// // 代理对象
// const obj = reactive(data);

// // 全局变量
// let temp1, temp2;

// // effectFn1 嵌套了 effectFn2
// effect(function effectFn1() {
//   console.log('effectFn1 执行');

//   effect(function effectFn2() {
//     console.log('effectFn2 执行');
//     // 在 effectFn2 中读取 obj.bar 属性
//     temp2 = obj.bar;
//   });
//   // 在 effectFn1 中读取 obj.foo 属性
//   temp1 = obj.foo;
// });

// // 此处赋值会导致执行effectFn2，使用effectStack解决，activeEffect指向栈顶
// obj.foo = 1000;

// 无限循环调用
// let obj = reactive({ a: 1 });
// effect(() => {
//   console.log(1);
//   obj.a++;
// });

// 自定义调度器
// const obj = reactive({ a: 1 });

// effect(
//   () => {
//     console.log(obj.a);
//   },
//   {
//     scheduler(fn) {
//       setTimeout(fn);
//     },
//   }
// );

// obj.a++;
// console.log('结束了');
// 如果没有调度器执行顺序是1=>2=>结束了，有调度器在不改变代码顺序的前提下就可以输出1=>结束了=>2

// 多次输出。默认1,2,3，使用调度器1,3
// let obj = reactive({ a: 1 });
// effect(
//   () => {
//     console.log(obj.a);
//   },
//   {
//     scheduler(fn) {
//       jobList.add(fn);
//       flushJob();
//     },
//   }
// );
// obj.a++;
// obj.a++;

// let obj = reactive({ a: 1, b: 2 });
// let sum = computed(() => obj.a + obj.b);

// effect(() => {
//   console.log(sum.value);
// });

// obj.a++;
// obj.a++;

// let obj = reactive({ a: 1, b: 2 });
// watch(
//   obj,
//   (cur, prev) => {
//     console.log(cur, prev);
//   },
//   {
//     immediate: true,
//   }
// );

// obj.a = 100;
// obj.b = 200;

// const obj = {
//   foo: 1,
//   get bar() {
//     // 这里的 this 指向的是谁？
//     return this.foo;
//   },
// };

// let p = reactive(obj);
// effect(() => {
//   console.log(p.bar);
// });

// p.foo++;

// const obj = {};
// const proto = { bar: 1 };
// const child = reactive(obj);
// const parent = reactive(proto);
// // 使用 parent 作为 child 的原型
// Object.setPrototypeOf(child, parent);

// effect(() => {
//   console.log(child.bar); // 1
// });
// // 修改 child.bar 的值
// child.bar = 2; // 会导致副作用函数重新执行两次

const obj = {
  a: {
    b: 1,
  },
};
