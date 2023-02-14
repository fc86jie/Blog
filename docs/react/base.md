[[toc]]

### jsx 语法规则

1. 定义虚拟 DOM 时，不要写引号
2. 标签中混入 JS 表达式是要用{}
3. 样式的类名指定使用 className，不要用 class
4. 内联样式，要用 style={ {key:value} }写法<!--遇到双花括号要在中间加入空格，否则会报错-->
5. 虚拟 DOM 只有一个根标签
6. 标签必须闭合
7. 标签首字符
   1. 若小写字母开头，则将该标签转化为 html 中同名元素，若 html 中无对应的同名元素，则报错
   2. 若大写字符开头，react 就去渲染对应的组件，若组件没定义，则报错

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

### 组件间通信

1. 父级向子级通信：把数据添加到子组件的属性中，然后组件从 props 属性中获取父级传递过来的数据
2. 子级向父级通信：在父级中定义回调方法，然后将回调方法传递给子级，子级调用父级的回调进行通信
3. 祖先和后代通信：通过 Context 完成

   ```javascript
   const MyContext = React.createContext(defaultValue);

   <MyContext.Provider value="dark">
     <Toolbar />
   </MyContext.Provider>;

   // 中间的组件再也不必指明往下传递 theme 了。
   function Toolbar() {
     return (
       <div>
         <ThemedButton />
       </div>
     );
   }

   // contextType方式
   class ThemedButton extends React.Component {
     // 指定 contextType 读取当前的 theme context。
     // React 会往上找到最近的 theme Provider，然后使用它的值。
     // 在这个例子中，当前的 theme 值为 “dark”。
     static contextType = MyContext;
     render() {
       return <Button theme={this.context} />;
     }
   }

   // Context.Consumer方式
   function ThemedButton() {
     return (
       <MyContext.Consumer>
         {theme => (
          <Button theme={theme} />;
         )}
       </MyContext.Consumer>
     );
   }
   ```

   ##### Class.contextType 和 Context.Consumer 的区别

   - Class.contextType 使用时会自动在组件上添加一个属性 context，存储离当前组件最近的 Provider 提供的数据，不能写多个

   - Context.Consumer 可以写多个，能获取到所有 Provider 提供数据

   - 动态的数据，还可以传递方法

### setState 异步 or 同步

在 React 可以控制的方法中（React 生命周期函数、React 事件中）表现为异步，在原生 js 控制（setTimeout、Promise.then 等）及
DOM 事件中表现为同步

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
   2. static getDerivedStateFromProps(props, state) ====== 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会
      被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。state 的值在任何时候都取决于 props。
   3. render()
   4. componentDidMount() ====== 初始化，开启定时器、发送网络请求、订阅消息
2. 更新阶段：由组件内部 this.setState()或父组件 render 触发
   1. static getDerivedStateFromProps(props, state)
   2. shouldComponentUpdate(nextProps, nextState)
   3. render()
   4. getSnapshotBeforeUpdate(prevProps, prevState)
   5. componentDidUpdate(prevProps, prevState, snapshot)
3. 卸载组件：由 ReactDOM.unmountComponentAtNode()触发
   1. componentWillUnmount() ====== 关闭定时器、取消订阅消息

### 高阶组件

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性
而形成的设计模式。

```javascript
// 高阶组件是参数为组件，返回值为新组件的函数
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

### memo

```javascript
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，不更新myComponent
  否则返回 false，更新myComponent
  */
}
export default React.memo(MyComponent, areEqual);
```
