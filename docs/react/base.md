[[toc]]

### jsx 语法规则

1. 定义虚拟 DOM 时，不要写引号
2. 标签中混入 JS 表达式是要用{}，
   1. js 表达式包含变量/值、数学运算、三元运算符、数组迭代方法 map 等
   2. {}中放入 number/string 时，值是什么就渲染成什么
   3. {}中放入 boolean/null/undefined/Symbol/BigInt,渲染内容是空
   4. {}中放入数组，会把每一项分别拿出来渲染
   5. 除了数组对象外，一般对象都不支持渲染。（虚拟 dom 对象和 style 除外）
3. 样式的类名指定使用 className，不要用 class
4. 内联样式，要用 style={ {key:value} }写法<!--遇到双花括号要在中间加入空格，否则会报错-->
5. 虚拟 DOM 只有一个根标签
6. 标签必须闭合
7. 标签首字符
   1. 若小写字母开头，则将该标签转化为 html 中同名元素，若 html 中无对应的同名元素，则报错
   2. 若大写字符开头，react 就去渲染对应的组件，若组件没定义，则报错
8. `ReactDOM.createRoot()` 不能使用 HTML/BODY 根容器作为 root
9. vscode 对 jsx 语法的支持，把 js 文件后缀名变更为 jsx 即可

```jsx
const Id = 'container';
const data = 'Hello';
const vDom = (
  <div>
    <h1 className="title" id={Id.toLowerCase()}>
      <span style={{ color: 'white', fontSize: '30px' }}>{data.toLocaleLowerCase()}</span>
    </h1>
    <h1 className="title" id={Id.toUpperCase()}>
      <span style={{ color: 'white', fontSize: '30px' }}>{data.toUpperCase()}</span>
    </h1>
    <input type="text" />
    {/* 没有数组，单独指定循环次数 */}
    {new Array(5).fill(null).map((_, index) => (
      <p key={index}>{index}</p>
    ))}
  </div>
);
const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(vDom);
```

### JSX 底层渲染机制

1. 把 JSX 语法编译成虚拟 DOM

   1. webpack 打包时候基于 babel-preset-react-app 把 JSX 编译为 `React.createElement(...)` 的格式。元素节点使用 `React.createElement(ele, props, ...children)`。ele：元素标签名或组件名，props：元素属性集合（对象），没有属性则为 null，children：第三个及以后的参数都是当前元素的子节点
   2. 执行 `React.createElement(...)` 生成虚拟 DOM（也叫 JSX 元素、JSX 对象、ReactChild 对象...）

   ```jsx
   const virtualDom = {
     $$typeof: Symbol(react.element),
     ref: null,
     key: null,
     type: 标签名 / 组件名,
     // 元素的相关属性和子节点信息,
     props: {
       元素相关属性,
       children: 子节点信息（没有子节点则没有该属性，有可能是一个值（文本子节点），数组（多个子节点））,
     },
   };
   ```

2. 把虚拟 DOM 渲染成真实 DOM

   ```jsx
   // v16
   ReactDOM.render(<App />, document.getElementById('root'));

   // v18
   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(<App />);
   ```

第一次直接是虚拟 DOM 渲染成真实 DOM，更新时通过 diff 算法比较更新前后的虚拟 DOM，生成 Patch，更新 Patch

### 插槽

通过`props.children`获取插槽，然后使用`React.Children.toArray(children)`格式化`children`（props.children 拿到的可能是 undefined、一个元素对象，需要统一转化成数组），传入组件内的 children 都是虚拟 DOM

```jsx
{
  /* 通过数组下表的方式使用插槽 */
}
{
  /* 父组件调用 */
}
<>
  <Count></Count>
  <Count>1</Count>
  <Count>
    <span>1</span>
    <span>2</span>
  </Count>
</>;
{
  /* 子组件处理 */
}
function Count(props) {
  let children = React.Children.toArray(props.children);
  return (
    <>
      {children[0]}
      <div>count</div>
      {children[1]}
    </>
  );
}

{
  /* 具名插槽通过给插槽定义名称的方式使用插槽 */
  <>
    <Count>
      <span slot="header">header</span>
      <span>default</span>
      <span slot="footer">footer</span>
    </Count>
  </>;

  function Count(props) {
    let children = React.Children.toArray(props.children);
    let headerSlots = [],
      defaultSlots = [],
      footerSlots = [];
    children.forEach(child => {
      // 此处如果是文本节点child='text'，需要单独处理一下
      let { slot } = child.props;
      if (slot === 'header') {
        headerSlots.push(child);
      } else if (slot === 'footer') {
        footerSlots.push(child);
      } else {
        defaultSlots.push(child);
      }
    });

    return (
      <>
        {headerSlots}
        {defaultSlots}
        {footerSlots}
      </>
    );
  }
}
```

### 组件的分类

- 函数式组件：静态组件

  - 不具备状态、生命周期、ref 等
  - 第一次渲染完，除非父组件控制重新渲染，否则内容不在更新
  - 优点：渲染速度快
  - 缺点：静态组件，无法实现组件动态更新

  ```jsx
  // 点击的时候count会发生变化，但视图不会重新渲染
  function Count() {
    let count = 0;

    return (
      <>
        当前是：{count}
        <button
          onClick={() => {
            count++;
          }}>
          增加
        </button>
      </>
    );
  }
  ```

- 类组件：动态组件，继承`React.Component/React.PureComponent`，基于`render`返回 JSX 视图
  - 具备属性、规则校验
  - 具备状态，修改状态控制视图更新
    - `setState`
    - `forceUpdate`
  - 具备周期函数
    - 严格模式下，不安全的周期函数禁止使用

```jsx
class Vote extends React.Component {
  // props默认值
  static defaultProps = {
    num: 0,
  };
  // 规则
  static propTypes = {
    title: PropTypes.string.isRequired,
    num: PropTypes.number,
  };
  // 不在constructor中初始化，可以直接在此初始化
  // state = {
  //   supNum: 2,
  //   noSupNum: 8,
  // };
  constructor(props) {
    // 把传递过来的属性挂载到this上，在constructor中就可使用this.props。如果此处不手动挂载，constructor中无法使用this.props，在constructor后依旧会自动把props挂载到this上，所以即使此处不挂载,render中可以访问到this.props
    super(props);
    this.state = {
      supNum: 2,
      noSupNum: 8,
    };
  }
  render() {
    let { supNum, noSupNum } = this.state;

    return (
      <div className="vote-box">
        <div className="header">
          {this.props.num}
          <h2 className="title">{this.props.title}</h2>
          <span>{supNum + noSupNum}人</span>
        </div>
        <div className="main">
          <p>支持人数：{supNum}人</p>
          <p>反对人数：{noSupNum}人</p>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              this.setState({ supNum: supNum + 1 });
            }}>
            支持
          </button>
          <button
            onClick={() => {
              this.setState({ noSupNum: noSupNum + 1 });
            }}>
            反对
          </button>
        </div>
      </div>
    );
  }
}
```

### PureComponent 和 Component 区别

`PureComponent`默认加了`shouldComponentUpdate `周期函数，在该周期函数内，对新老`props`和`state`做浅比较，有变化返回 true，无变化返回 false

### ref 使用

- 受控组件：基于数据驱动视图更新，推荐
- 非受控组件：基于 ref 获取 DOM，直接操作 DOM
- ref 原理：在 render 时候，获取虚拟 DOM 的 ref 属性
  - 属性是字符串，则给 this.refs 增加一个成员，成员值就是当前的 DOM 对象，不推荐使用
  - 属性是函数，把函数执行，把当前 DOM 对象作为参数传递给该函数
  - 属性是 Ref 对象，把当前 DOM 对象给到对象的 current 属性
- 给元素设置 ref，获取对应的 DOM 元素
- 给类组件设置 ref，获取组件的实例
- 给函数式组件设置 ref，会报错。可以通过`React.forwardRef`进行转发，获取函数式组件内的某个 DOM 元素

```jsx
class Box extends React.Component {
  p3 = React.createRef();
  render() {
    return (
      <div>
        <p ref="p1"></p>
        <p ref={ele => (this.p2 = ele)}></p>
        <p ref={p3}></p>
      </div>
    );
  }
  componentDidMount() {
    console.log(this.refs.p1);
    console.log(this.p2);
    console.log(this.p3.current);
  }
}

{
  /* 函数式组件的ref */
}
const Child1 = React.forwardRef(function (props, ref) {
  // 此处传递的ref是父组件中设置的ref的值（函数）
  return (
    <div>
      <button ref={ref}>按钮</button>
    </div>
  );
});
class Demo extends React.Component {
  render() {
    return (
      <div>
        {/* this.child1获取的是Child中的button */}
        <Child ref={ele => (this.child1 = ele)}></Child>
      </div>
    );
  }
}
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
  // 如果把 nextProps 传入 render 方法的返回结果与将 prevProps 传入 render 方法的返回结果一致则返回 true，不更新myComponent 否则返回 false，更新myComponent
}
export default React.memo(MyComponent, areEqual);
```
