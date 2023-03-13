[[toc]]

### 函数式组件

- 本质是一个普通函数，接收一个参数 props，返回一个 reactNodes
- 函数式组件没有 this 和生命周期，不能使用 string ref
- 使用函数式组件时，应尽量减少在函数中声明子函数，否则每次更新时都会创建这个函数
- 函数式组件会重新执行整个函数

### React Hooks

- React16.8 引入 hooks
- 在不编写 class 的情况下使用 state 以及其他的 React 特性
- hooks 在使用时必须保证调用顺序，不能将 hooks 的调用放在 if/for 等控制流程语句中，也不能放在子函数中
- hooks 只能放在函数组件（或自定义 hook）的最外层
- 调用顺序：每次执行时 hook 的顺序一致

### useState

在函数式组件中使用`state`，基于`state`的变化更新视图

```jsx
// const [状态, 更改状态的方法] =  useState(初始值)
// initialState可以是值、函数
const [state, setState] = useState(initialState);

// 多次变更，一次更新
const Demo2 = () => {
  // const [num, setNum] = useState(0);
  // 当初始值依赖props等复杂计算时，为了防止每次更新都重新执行一遍，可放入函数中返回，让其惰性执行
  const [num, setNum] = useState(() => {
    let { x = 1, y = 2 } = props;
    return x + y;
  });
  const handler = () => {
    for (let i = 0; i < 10; i++) {
      // 直接传值的方式会循环多次，最终的值是11
      // setNum(num + 1);
      // 使用函数方式会在原有的结果上累加，最终结果会变成20
      setNum(prev => prev + 1);
    }
  };

  return (
    <Row justify="center" align="middle">
      <Tag color="magenta" style={{ fontSize: '20px' }}>
        {num}
      </Tag>
      <Divider></Divider>
      <Button type="primary" onClick={handler}>
        新增
      </Button>
    </Row>
  );
};
```

- 同一组件定义多个 useState
- 返回的 setState 方法不会进行对象合并
- 返回的 setState 是异步方法（会被批处理）
- 自带性能优化，每一次修改状态值会基于 Object.is 方法比较当前值和之前的值，如果一致则不会修改状态也不会触发视图更新【类似于 PureComponent 中，shouldComponentUpdate 中做钱比较优化】

:::warning 注意
函数组件的每一次渲染（或更新），都是把函数（重新）执行一遍，产生一个全新的“私有上下文”

- 内部代码也要重新执行
- 涉及到的函数需要重新构建
- 每一次的`useState`重新执行，只有在第一次的时候初始值才会生效，后面都是最新的状态值。返回的修改方法是全新的
  :::

```jsx
// useState大概的处理机制
let _state;
function useState(initialValue) {
  if (typeof _state === 'undefined') {
    if (typeof initialValue === 'function') {
      _state = initialValue();
    } else {
      _state = initialValue;
    }
  }
  let setState = newValue => {
    if (Object.is(_state, newValue)) {
      return;
    }
    _state = newValue;
    // 通知视图更新
  };
  return [_state, setState];
}
```

### useEffect 和 useLayoutEffect

在函数式组件中使用生命周期

- `useEffect(callback)`
  - 等价于`componentDidMount`，第一次渲染完后执行 callback
  - 等价于`componentDidUpdate`，每次更新完后执行 callback
- `useEffect(callback, [])`
  - 等价于`componentDidMount`，第一次渲染完后执行 callback
- `useEffect(callback, [依赖的状态（多个）])`
  - 等价于`componentDidMount`，第一次渲染完后执行 callback
  - 当依赖的状态发生变化会再次执行 callback
- `useEffect(()=>{return()=>{}})`
  - 等价于`componentWillUnmount`，在组件更新时、卸载的时候执行 return 的函数

```jsx
// useEffect Hook 看做 componentDidMount，componentDidUpdate 和 componentWillUnmount 这三个函数的组合。类似于vue中的watch
// useEffect(() => {
//   effect: 副作用函数
//   return ()=>{
//     cleanup 清理函数
//   }
// }, [input]) input 依赖参数
// 依赖参数：1.null，组件每次更新都执行，2：[]，组件更新时不执行，3：[参数1, 参数2, ...]有一个参数发生变化执行

function Child(props) {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(0);
  const isMount = useRef(false);
  useEffect(() => {
    console.log('挂载及更新完成调用---componentDidMount，componentDidUpdate');
  });
  useEffect(() => {
    if (isMount.current) {
      console.log('组件更新完成');
    } else {
      isMount.current = true;
    }
  });
  useEffect(() => {
    console.log('挂载完成调用---componentDidMount');
    return () => {
      console.log('组件即将卸载---componentWillUnmount');
    };
  }, []);

  // 1. 条件语句使用
  // 1.1 错误示例
  if (num > 5) {
    useEffect(() => {
      console.log('do something');
    });
  }
  // 1.2 正确示例
  useEffect(() => {
    if (num > 5) {
      console.log('do something');
    }
  });

  // 从服务端异步请求数据
  // 1.1 错误示例，async默认会返回promise，但是useEffect要求要有返回值必须是函数
  useEffect(async () => {
    let data = await queryData();
    console.log(data);
  });
  // 1.2 正确示例
  useEffect(() => {
    queryData().then(data => {
      console.log(data);
    });
  });
  // 1.3 正确示例
  useEffect(() => {
    let next = async () => {
      let data = await queryData();
      console.log(data);
    };
    next();
  });
}
```

- 挂载阶段：从上到下执行函数组件，如果碰到 useEffect 就将其中的 effect 存储到一个队列中，当组件挂载完成之后，按照队列顺
  序执行 effect 函数，并获取 cleanup 函数存储到一个新的队列中
- 更新阶段：从上到下执行函数组件，如果碰到 useEffect 就将其中的 effect 存储到一个队列中，当组件更新完成之后，会将之前存
  储的 cleanup 函数队列按顺序执行下，然后执行 effect 函数队列，并获取 cleanup 函数存储到一个新的队列中。在更新阶段会观察
  依赖依赖参数的值有没有发生变化，如果没有变化就不执行对应的 cleanup 和 effect
- 卸载阶段：找到之前存储的 cleanup 函数队列，依次执行
- useEffect：不会阻塞浏览器渲染真实 DOM，在渲染真实 DOM 的同时，去还行 Effect 链表中的 callback
- useLayoutEffect：会阻塞浏览器渲染真实 DOM，优先执行 Effect 中的 callback

  :::warning 注意
  在两者的 callback 中都能获取 DOM 元素【真实 DOM 已经创建，区别是浏览器是否渲染】，如果在 callback 中更改了状态值【视图又要更新】

  - useEffect：；浏览器把第一次的真实 DOM 绘制了，又去渲染第二次的真实 DOM
  - useLayoutEffect：浏览器把两次的真实 DOM 合并渲染
    :::

### useRef 和 useImperativeHandle

```jsx
function Child(props) {
  const [count, setCount] = useState(0);
  const ele = useRef();
  const prevCount = useRef(count);
  useEffect(() => {
    console.log(ele.current.innerHTML);
    console.log(prevCount.current);
    // 手动调用更新，否则每次输出都是0
    prevCount.current = count;
  }, [count]);
  return (
    <div>
      <p ref={ele}>count:{count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}></button>
    </div>
  );
}
```

- 函数式组件中每次更新时， createRef 会返回一个新的对象，而 useRef 返回的是同一个对象
- 除了可以保存实例外，还可以保存组件更新前的数据
- 当 ref 存储的是数据时，数据不会随着组件更新而自动更新

基于`forwardRef`实现 ref 转发，结合`useImperativeHandle`同时获取子组件内部的状态和方法

```jsx
const Child = React.forwardRef((props, ref) => {
  let [text, setText] = useState('Hello World!');
  const submit = () => {};

  useImperativeHandle(ref, () => {
    // 返回的对象暴露给父元素
    return {
      text,
      submit,
    };
  });

  return (
    <div>
      <span>哈哈哈</span>
    </div>
  );
});

const UseRefDemo = props => {
  let tagRef = useRef(null);
  let childRef = useRef(null);
  let [num, setNum] = useState(0);

  const handler = () => {
    setNum(num++);
  };

  useEffect(() => {
    console.log('=======', tagRef.current);
    //{text:xxx,submit:function(){}}
    console.log('------------', childRef.current);
  });

  return (
    <Row justify="center" align="middle">
      <h1>useState</h1>
      <Divider></Divider>
      <Tag color="magenta" ref={tagRef} style={{ fontSize: '20px' }}>
        {num}
      </Tag>
      <Divider></Divider>
      <Child ref={childRef} />
      <Button type="primary" onClick={handler}>
        新增
      </Button>
    </Row>
  );
};
```

### useMemo

```jsx
// 类似于vue的computed，当依赖值发生变化时，才会重新计算，避免在每次渲染时都进行高开销的计算
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

const [count, setCount] = useState(1);
const [count2, setCount2] = useState(1);
// 只有当count发生变化的时候才会重新计算total。count2发生变化时会重新render，但total不会发生变化
const total = useMemo(() => {
  return count * 100;
}, [count]);
```

### useCallback

```jsx
// useCallback(fn, deps) 相当于 useMemo(() => fn, deps)，useMemo返回一个值，useCallback返回一个函数
const [count, setCount] = useState(1);
const total = useMemo(() => {
  return () => {
    return count * 100;
  };
}, [count]);

const total2 = useCallback(() => {
  return count * 100;
}, [count]);

return (
  <>
    <p>{total()}</p>
    <p>{total2()}</p>
  </>
);
```

使用场景：例如父组件给子组件传递一个函数，当父组件更新时，子组件不需要更新。类组件结合 React.PureComponent，函数组件结合 React.memo，配合 useCallback 解决此类问题

```jsx
// 类组件
class Child1 extends React.PureComponent {
  render() {
    console.log('child1 render');
    return <div>Child1</div>;
  }
}

// 函数式组件
const Child2 = React.memo(() => {
  console.log('child2 render');
  return <div>Child2</div>;
});

const UseMemoDemo = props => {
  let [num, setNum] = useState(0);

  const handler2 = () => {
    setNum(num + 1);
  };

  // 此方法会触发Child1、Child2更新
  // const handler = () => {
  //   console.log('Parent handler');
  // };

  // 此方法不会触发Child1、Child2更新，需要配合React.PureComponent/React.memo使用
  const handler = useCallback(() => {
    console.log('Parent handler');
  }, []);

  return (
    <>
      <Child1 handler={handler}></Child1>
      <Child2 handler={handler}></Child2>
      num：{num}
      <Button onClick={handler2}>加一</Button>
    </>
  );
};
```

### 自定义 HOOK

组件逻辑提取到可重用的函数

```jsx
// 自定义hook，支持局部更新
const usePartialState = initialState => {
  let [state, setState] = useState(initialState);
  const setPartialState = partialState => {
    setState({
      ...state,
      ...partialState,
    });
  };
  return [state, setPartialState];
};

const UsePartialStateDemo = () => {
  let [state, setPartialState] = usePartialState({
    num1: 0,
    num2: 0,
  });

  const ratio = useMemo(() => {
    let sum = state.num1 + state.num2;
    return sum > 0 ? (state.num1 * 100) / sum + '%' : '-';
  }, [state.num1, state.num2]);

  const handler = type => {
    if (type === 'add') {
      setPartialState({
        num1: state.num1 + 1,
      });
    } else {
      setPartialState({
        num2: state.num2 + 1,
      });
    }
  };

  return (
    <Row justify="center" align="middle">
      <h1>自定义hook</h1>
      <Divider></Divider>
      <Tag color="magenta" style={{ fontSize: '20px' }}>
        {state.num1}
      </Tag>
      <Tag color="magenta" style={{ fontSize: '20px' }}>
        {state.num2}
      </Tag>
      <Tag color="magenta" style={{ fontSize: '20px' }}>
        {ratio}
      </Tag>
      <Divider></Divider>
      <Button type="primary" onClick={() => handler('add')}>
        同意
      </Button>
      <Button type="primary" onClick={handler.bind(null, 'del')}>
        反对
      </Button>
    </Row>
  );
};
```
