<template><div><nav class="table-of-contents"><ul><li><a href="#jsx-语法规则">jsx 语法规则</a></li><li><a href="#jsx-底层渲染机制">JSX 底层渲染机制</a></li><li><a href="#组件间通信">组件间通信</a></li><li><a href="#setstate-异步-or-同步">setState 异步 or 同步</a></li><li><a href="#react-的生命周期-旧的">React 的生命周期（旧的）</a></li><li><a href="#react-的生命周期-新的">React 的生命周期（新的）</a></li><li><a href="#高阶组件">高阶组件</a></li><li><a href="#memo">memo</a></li></ul></nav>
<h3 id="jsx-语法规则" tabindex="-1"><a class="header-anchor" href="#jsx-语法规则" aria-hidden="true">#</a> jsx 语法规则</h3>
<ol>
<li>定义虚拟 DOM 时，不要写引号</li>
<li>标签中混入 JS 表达式是要用{}，
<ol>
<li>js 表达式包含变量/值、数学运算、三元运算符、数组迭代方法 map 等</li>
<li>{}中放入 number/string 时，值是什么就渲染成什么</li>
<li>{}中放入 boolean/null/undefined/Symbol/BigInt,渲染内容是空</li>
<li>{}中放入数组，会把每一项分别拿出来渲染</li>
<li>除了数组对象外，一般对象都不支持渲染。（虚拟 dom 对象和 style 除外）</li>
</ol>
</li>
<li>样式的类名指定使用 className，不要用 class</li>
<li>内联样式，要用 style={ {key:value} }写法<!--遇到双花括号要在中间加入空格，否则会报错--></li>
<li>虚拟 DOM 只有一个根标签</li>
<li>标签必须闭合</li>
<li>标签首字符
<ol>
<li>若小写字母开头，则将该标签转化为 html 中同名元素，若 html 中无对应的同名元素，则报错</li>
<li>若大写字符开头，react 就去渲染对应的组件，若组件没定义，则报错</li>
</ol>
</li>
<li><code v-pre>ReactDOM.createRoot()</code> 不能使用 HTML/BODY 根容器作为 root</li>
<li>vscode 对 jsx 语法的支持，把 js 文件后缀名变更为 jsx 即可</li>
</ol>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">const</span> Id <span class="token operator">=</span> <span class="token string">'container'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> data <span class="token operator">=</span> <span class="token string">'Hello'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> vDom <span class="token operator">=</span> <span class="token punctuation">(</span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>Id<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'white'</span><span class="token punctuation">,</span> <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token string">'30px'</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>data<span class="token punctuation">.</span><span class="token function">toLocaleLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">className</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span> <span class="token attr-name">id</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>Id<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">style</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">'white'</span><span class="token punctuation">,</span> <span class="token literal-property property">fontSize</span><span class="token operator">:</span> <span class="token string">'30px'</span> <span class="token punctuation">}</span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>data<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
    </span><span class="token punctuation">{</span><span class="token comment">/* 没有数组，单独指定循环次数 */</span><span class="token punctuation">}</span><span class="token plain-text">
    </span><span class="token punctuation">{</span><span class="token keyword">new</span> <span class="token class-name">Array</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">fill</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">_<span class="token punctuation">,</span> index</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">key</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span>index<span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token punctuation">{</span>index<span class="token punctuation">}</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
    <span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token plain-text">
  </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> root <span class="token operator">=</span> ReactDOM<span class="token punctuation">.</span><span class="token function">createRoot</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>vDom<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jsx-底层渲染机制" tabindex="-1"><a class="header-anchor" href="#jsx-底层渲染机制" aria-hidden="true">#</a> JSX 底层渲染机制</h3>
<ol>
<li>
<p>把 JSX 语法编译成虚拟 DOM</p>
<ol>
<li>webpack 打包时候基于 babel-preset-react-app 把 JSX 编译为 <code v-pre>React.createElement(...)</code> 的格式。元素节点使用 <code v-pre>React.createElement(ele, props, ...children)</code>。ele：元素标签名或组件名，props：元素属性集合（对象），没有属性则为 null，children：第三个及以后的参数都是当前元素的子节点</li>
<li>执行 <code v-pre>React.createElement(...)</code> 生成虚拟 DOM（也叫 JSX 元素、JSX 对象、ReactChild 对象...）</li>
</ol>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token keyword">const</span> virtualDom <span class="token operator">=</span> <span class="token punctuation">{</span>
  $$<span class="token keyword">typeof</span><span class="token operator">:</span> <span class="token function">Symbol</span><span class="token punctuation">(</span>react<span class="token punctuation">.</span>element<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token literal-property property">ref</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">key</span><span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">,</span>
  <span class="token literal-property property">type</span><span class="token operator">:</span> 标签名 <span class="token operator">/</span> 组件名<span class="token punctuation">,</span>
  <span class="token comment">// 元素的相关属性和子节点信息,</span>
  <span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    元素相关属性<span class="token punctuation">,</span>
    <span class="token literal-property property">children</span><span class="token operator">:</span> 子节点信息（没有子节点则没有该属性，有可能是一个值（文本子节点），数组（多个子节点））<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>把虚拟 DOM 渲染成真实 DOM</p>
<div class="language-jsx line-numbers-mode" data-ext="jsx"><pre v-pre class="language-jsx"><code><span class="token comment">// v16</span>
ReactDOM<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">App</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// v18</span>
<span class="token keyword">const</span> root <span class="token operator">=</span> ReactDOM<span class="token punctuation">.</span><span class="token function">createRoot</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">'root'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
root<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">App</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>第一次直接是虚拟 DOM 渲染成真实 DOM，更新时通过 diff 算法比较更新前后的虚拟 DOM，生成 Patch，更新 Patch</p>
<h3 id="组件间通信" tabindex="-1"><a class="header-anchor" href="#组件间通信" aria-hidden="true">#</a> 组件间通信</h3>
<ol>
<li>
<p>父级向子级通信：把数据添加到子组件的属性中，然后组件从 props 属性中获取父级传递过来的数据</p>
</li>
<li>
<p>子级向父级通信：在父级中定义回调方法，然后将回调方法传递给子级，子级调用父级的回调进行通信</p>
</li>
<li>
<p>祖先和后代通信：通过 Context 完成</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> MyContext <span class="token operator">=</span> React<span class="token punctuation">.</span><span class="token function">createContext</span><span class="token punctuation">(</span>defaultValue<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token operator">&lt;</span>MyContext<span class="token punctuation">.</span>Provider value<span class="token operator">=</span><span class="token string">"dark"</span><span class="token operator">></span>
  <span class="token operator">&lt;</span>Toolbar <span class="token operator">/</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>MyContext<span class="token punctuation">.</span>Provider<span class="token operator">></span><span class="token punctuation">;</span>

<span class="token comment">// 中间的组件再也不必指明往下传递 theme 了。</span>
<span class="token keyword">function</span> <span class="token function">Toolbar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>div<span class="token operator">></span>
      <span class="token operator">&lt;</span>ThemedButton <span class="token operator">/</span><span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// contextType方式</span>
<span class="token keyword">class</span> <span class="token class-name">ThemedButton</span> <span class="token keyword">extends</span> <span class="token class-name">React<span class="token punctuation">.</span>Component</span> <span class="token punctuation">{</span>
  <span class="token comment">// 指定 contextType 读取当前的 theme context。</span>
  <span class="token comment">// React 会往上找到最近的 theme Provider，然后使用它的值。</span>
  <span class="token comment">// 在这个例子中，当前的 theme 值为 “dark”。</span>
  <span class="token keyword">static</span> contextType <span class="token operator">=</span> MyContext<span class="token punctuation">;</span>
  <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;</span>Button theme<span class="token operator">=</span><span class="token punctuation">{</span><span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Context.Consumer方式</span>
<span class="token keyword">function</span> <span class="token function">ThemedButton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token operator">&lt;</span>MyContext<span class="token punctuation">.</span>Consumer<span class="token operator">></span>
      <span class="token punctuation">{</span><span class="token parameter">theme</span> <span class="token operator">=></span> <span class="token punctuation">(</span>
       <span class="token operator">&lt;</span>Button theme<span class="token operator">=</span><span class="token punctuation">{</span>theme<span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">></span><span class="token punctuation">;</span>
      <span class="token punctuation">)</span><span class="token punctuation">}</span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>MyContext<span class="token punctuation">.</span>Consumer<span class="token operator">></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="class-contexttype-和-context-consumer-的区别" tabindex="-1"><a class="header-anchor" href="#class-contexttype-和-context-consumer-的区别" aria-hidden="true">#</a> Class.contextType 和 Context.Consumer 的区别</h5>
<ul>
<li>
<p>Class.contextType 使用时会自动在组件上添加一个属性 context，存储离当前组件最近的 Provider 提供的数据，不能写多个</p>
</li>
<li>
<p>Context.Consumer 可以写多个，能获取到所有 Provider 提供数据</p>
</li>
<li>
<p>动态的数据，还可以传递方法</p>
</li>
</ul>
</li>
</ol>
<h3 id="setstate-异步-or-同步" tabindex="-1"><a class="header-anchor" href="#setstate-异步-or-同步" aria-hidden="true">#</a> setState 异步 or 同步</h3>
<p>在 React 可以控制的方法中（React 生命周期函数、React 事件中）表现为异步，在原生 js 控制（setTimeout、Promise.then 等）及
DOM 事件中表现为同步</p>
<h3 id="react-的生命周期-旧的" tabindex="-1"><a class="header-anchor" href="#react-的生命周期-旧的" aria-hidden="true">#</a> React 的生命周期（旧的）</h3>
<ol>
<li>初始化阶段：由 ReactDOM.render()触发---初次渲染
<ol>
<li>constructor()</li>
<li>componentWillMount()</li>
<li>render()</li>
<li>componentDidMount() ====== 初始化，开启定时器、发送网络请求、订阅消息</li>
</ol>
</li>
<li>更新阶段：由组件内部 this.setState()或父组件 render 触发
<ol>
<li>shouldComponentUpdate()</li>
<li>componentWillUpdate()</li>
<li>render()</li>
<li>componentDidUpdate()</li>
</ol>
</li>
<li>卸载组件：由 ReactDOM.unmountComponentAtNode()触发
<ol>
<li>componentWillUnmount() ====== 关闭定时器、取消订阅消息</li>
</ol>
</li>
</ol>
<h3 id="react-的生命周期-新的" tabindex="-1"><a class="header-anchor" href="#react-的生命周期-新的" aria-hidden="true">#</a> React 的生命周期（新的）</h3>
<ol>
<li>初始化阶段：由 ReactDOM.render()触发---初次渲染
<ol>
<li>constructor()</li>
<li>static getDerivedStateFromProps(props, state) ====== 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会
被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。state 的值在任何时候都取决于 props。</li>
<li>render()</li>
<li>componentDidMount() ====== 初始化，开启定时器、发送网络请求、订阅消息</li>
</ol>
</li>
<li>更新阶段：由组件内部 this.setState()或父组件 render 触发
<ol>
<li>static getDerivedStateFromProps(props, state)</li>
<li>shouldComponentUpdate(nextProps, nextState)</li>
<li>render()</li>
<li>getSnapshotBeforeUpdate(prevProps, prevState)</li>
<li>componentDidUpdate(prevProps, prevState, snapshot)</li>
</ol>
</li>
<li>卸载组件：由 ReactDOM.unmountComponentAtNode()触发
<ol>
<li>componentWillUnmount() ====== 关闭定时器、取消订阅消息</li>
</ol>
</li>
</ol>
<h3 id="高阶组件" tabindex="-1"><a class="header-anchor" href="#高阶组件" aria-hidden="true">#</a> 高阶组件</h3>
<p>高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性
而形成的设计模式。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 高阶组件是参数为组件，返回值为新组件的函数</span>
<span class="token keyword">const</span> EnhancedComponent <span class="token operator">=</span> <span class="token function">higherOrderComponent</span><span class="token punctuation">(</span>WrappedComponent<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="memo" tabindex="-1"><a class="header-anchor" href="#memo" aria-hidden="true">#</a> memo</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">MyComponent</span><span class="token punctuation">(</span><span class="token parameter">props</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">/* 使用 props 渲染 */</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">areEqual</span><span class="token punctuation">(</span><span class="token parameter">prevProps<span class="token punctuation">,</span> nextProps</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 如果把 nextProps 传入 render 方法的返回结果与将 prevProps 传入 render 方法的返回结果一致则返回 true，不更新myComponent 否则返回 false，更新myComponent</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> React<span class="token punctuation">.</span><span class="token function">memo</span><span class="token punctuation">(</span>MyComponent<span class="token punctuation">,</span> areEqual<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


