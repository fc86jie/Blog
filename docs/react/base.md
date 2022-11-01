### jsx 语法规则

1. 定义虚拟 DOM 时，不要写引号
2. 标签中混入 JS 表达式是要用{}
3. 样式的类名指定使用 className，不要用 class
4. 内联样式，要用 style={{key:value}}写法
5. 虚拟 DOM 只有一个根标签
6. 标签必须闭合
7. 标签首字符
   (1). 若小写字母开头，则将该标签转化为 html 中同名元素，若 html 中无对应的同名元素，则报错
   (2). 若大写字符开头，react 就去渲染对应的组件，若组件没定义，则报错

```javascript
const Id = 'container';
const data = 'Hello';
const VDOM = (
  <div>
    <h1 className="title" id={Id.toLowerCase()}>
      <span style={{ color: 'white', fontSize: '30px' }}>{data.toLocaleLowerCase()}</span>
    </h1>
    <h1 className="title" id={Id.toUpperCase()}>
      <span style={{ color: 'white', fontSize: '30px' }}>{data.toUpperCase()}</span>
    </h1>
    <input type="text" />
  </div>
);
const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(VDOM);
```

### React 的生命周期（旧的）

1. 初始化阶段：由 ReactDOM.render()触发---初次渲染
   1. constructor()
   2. componentWillMount()
   3. render()
   4. componentDidMount() ====== 初始化，开启定时器、发送网络请求、订阅消息
2. 更新阶段：由组件内部 this.setState()或父组件 render 触发
   1. shouldComponentUpdate()
   2. componentWillUpdate()
   3. render()
   4. componentDidUpdate()
3. 卸载组件：由 ReactDOM.unmountComponentAtNode()触发
   1. componentWillUnmount() ====== 关闭定时器、取消订阅消息

### React 的生命周期（新的）
 
1. 初始化阶段：由 ReactDOM.render()触发---初次渲染
   1. constructor()
   2. getDerivedStateFromProps() === 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。state 的值在任何时候都取决于 props
   3. render()
   4. componentDidMount() ====== 初始化，开启定时器、发送网络请求、订阅消息
2. 更新阶段：由组件内部 this.setState()或父组件 render 触发
   1. getDerivedStateFromProps()
   2. shouldComponentUpdate()
   3. render()
   4. getSnapshotBeforeUpdate()
   5. componentDidUpdate()
3. 卸载组件：由 ReactDOM.unmountComponentAtNode()触发
   1. componentWillUnmount() ====== 关闭定时器、取消订阅消息
