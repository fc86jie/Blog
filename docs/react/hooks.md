[[toc]]

### 函数式组件

- 本质是一个普通函数，接收一个参数 props，返回一个 reactNodes
- 函数式组件没有 this 和生命周期，不能使用 string ref
- 使用函数式组件时，应尽量减少在函数中声明子函数，否则每次更新时都会创建这个函数
- 函数式组件会重新执行整个函数

### React Hooks

- 在不编写 class 的情况下使用 state 以及其他的 React 特性
- hooks 在使用时必须保证调用顺序，不能将 hooks 的调用放在 if/for 等控制流程语句中，也不能放在子函数中
- hooks 只能放在函数组件（或自定义 hook）的最外层
- 调用顺序：每次执行时 hook 的顺序一致

### State Hook

```javascript
// const [状态, 更改状态的方法] =  useState(初始值)
const [state, setState] = useState(initialState);
```

- 同一组件定义多个 useState
- 返回的 setState 方法不会进行对象合并
- 返回的 setState 是异步方法（会被批处理）

### Effect Hook

```javascript
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
}
```

- 挂载阶段：从上到下执行函数组件，如果碰到 useEffect 就将其中的 effect 存储到一个队列中，当组件挂载完成之后，按照队列顺
  序执行 effect 函数，并获取 cleanup 函数存储到一个新的队列中
- 更新阶段：从上到下执行函数组件，如果碰到 useEffect 就将其中的 effect 存储到一个队列中，当组件更新完成之后，会将之前存
  储的 cleanup 函数队列按顺序执行下，然后执行 effect 函数队列，并获取 cleanup 函数存储到一个新的队列中。在更新阶段会观察
  依赖依赖参数的值有没有发生变化，如果没有变化就不执行对应的 cleanup 和 effect
- 卸载阶段：找到之前存储的 cleanup 函数队列，依次执行

### Ref hook

```javascript
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

- 类似于 createRef
- 除了可以保存实例外，还可以保存组件更新前的数据
- 当 ref 存储的是数据时，数据不会随着组件更新而自动更新

### Memo hook

```javascript
// 类似于vue的computed，当依赖值发生变化时，才会重新计算，避免在每次渲染时都进行高开销的计算
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

const [count, setCount] = useState(1);
const [count2, setCount2] = useState(1);
// 只有当count发生变化的时候才会重新计算total。count2发生变化时会重新render，但total不会发生变化
const total = useMemo(() => {
  return count * 100;
}, [count]);
```

### Callback hook

```javascript
// useCallback(fn, deps) 相当于 useMemo(() => fn, deps)，useMemo返回一个值，useCallback返回一个函数
const [count, setCount] = useState(1);
const total = useMemo(() => {
  return () => {
    return count * 100;
  };
}, [count]);

const total2 = useCallback(() => {
  return count * 100;
});

return (
  <>
    <p>{total()}</p>
    <p>{total2()}</p>
  </>
);
```
