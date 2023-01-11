[[toc]]

### 浏览器渲染原理

#### 浏览器内核

<img src="./images/render.jpg" alt="render.jpg" width="80%" />

- GUI 渲染线程：GUI 渲染线程负责渲染浏览器界面，解析 HTML，CSS，构建 DOM 树和 RenderObject 树，布局和绘制等。当界面需要
  重绘（Repaint）或由于某种操作引发回流（Reflow）时，该线程就会执行。
- JavaScript 引擎线程: JavaScript 引擎线程主要负责解析 JavaScript 脚本并运行相关代码。 JavaScript 引擎在一个 Tab 页
  （Renderer 进程）中无论什么时候都只有一个 JavaScript 线程在运行 JavaScript 程序。需要提起一点就是，GUI 线程与
  JavaScript 引擎线程是互斥的，这也是就是为什么 JavaScript 操作时间过长，会造成页面渲染不连贯，导致页面出现阻塞的原理。
- 事件触发线程：当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待 JavaScript 引擎的处理。 通常 JavaScript 引
  擎是单线程的，所以这些事件都会排队等待 JS 执行。
- 定时器触发器： 我们日常使用的 setInterval 和 setTimeout 就在该线程中，原因可能就是：由于 JS 引擎是单线程的，如果处于阻
  塞线程状态就会影响记时的准确，所以需要通过单独的线程来记时并触发响应的事件这样子更为合理。
- Http 请求线程： 在 XMLHttpRequest 在连接后是通过浏览器新开一个线程请求，这个线程就 Http 请求线程，它将检测到状态变更时
  ，如果设置有回调函数，异步线程就产生状态变更事件放到 JavaScript 引擎的处理队列中等待处理。

#### 渲染机制

1. 处理 HTML 并构建 DOM 树。
2. 处理 CSS 构建 CSSOM 树。
3. 将 DOM 与 CSSOM 合并成一个渲染树。
4. 根据渲染树来布局，计算每个节点的位置。
5. 调用 GPU 绘制，合成图层，显示在屏幕上。

webkit 内核浏览器渲染流程如下图所示：

![](./images/render.png)

在构建 CSSOM 树时，会阻塞渲染，直至 CSSOM 树构建完成。并且构建 CSSOM 树是一个十分消耗性能的过程，所以应该尽量保证层级扁
平，减少过度层叠，越是具体的 CSS 选择器，执行速度越慢。

当 HTML 解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始。也就是说，如果你想首屏渲染的越快，就越不应
该在首屏就加载 JS 文件。并且 CSS 也会影响 JS 的执行，只有当解析完样式表才会执行 JS，所以也可以认为这种情况下，CSS 也会暂
停构建 DOM。

#### Load 和 DOMContentLoaded 区别

- Load 事件触发代表页面中的 DOM，CSS，JS，图片已经全部加载完毕。
- DOMContentLoaded 事件触发代表初始的 HTML 被完全加载和解析，不需要等待 CSS，JS，图片加载。

#### 图层

一般来说，可以把普通文档流看成一个图层。特定的属性可以生成一个新的图层。不同的图层渲染互不影响，所以对于某些频繁需要渲染
的建议单独生成一个新图层，提高性能。但也不能生成过多的图层，会引起反作用。

通过以下几个常用属性可以生成新图层：

- 3D 变换：translate3d、translateZ
- will-change
- video、iframe 标签
- 通过动画实现的 opacity 动画转换
- position: fixed

#### 重绘（Repaint）和回流（Reflow）

- 当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility 等），浏览器会将新样式赋
  予给元素并重新绘制它，这个过程称为重绘。
- 对 DOM 结构的修改引发 DOM 几何尺寸变化的时候,会发生回流过程。

导致回流的属性和方法：
clientWidth、clientHeight、clientTop、clientLeft、offsetWidth、offsetHeight、offsetTop、offsetLeft、scrollWidth、scrollHeight、scrollTop、scrollLeft、scrollIntoView()、scrollIntoViewIfNeeded()、getComputedStyle()、getBoundingClientRect()、scrollTo()

::: tip 总结

1. 浏览器工作流程：构建 DOM -> 构建 CSSOM -> 构建渲染树 -> 布局 -> 绘制。
2. CSSOM 会阻塞渲染，只有当 CSSOM 构建完毕后才会进入下一个阶段构建渲染树。
3. 通常情况下 DOM 和 CSSOM 是并行构建的，但是当浏览器遇到一个不带 defer 或 async 属性的 script 标签时，DOM 构建将暂停，
   如果此时又恰巧浏览器尚未完成 CSSOM 的下载和构建，由于 JavaScript 可以修改 CSSOM，所以需要等 CSSOM 构建完毕后再执行
   JS，最后才重新 DOM 构建。
4. [参考链接](https://juejin.cn/post/6847902222349500430)

:::

### 获取 URL 中的参数

```javascript
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
    {}
  );

//Examples

getURLParameters('google.com');
// {}

getURLParameters('http://url.com/page?name=Adam&surname=Smith');
// {name: 'Adam', surname: 'Smith'}
```

- [参考链接](https://www.30secondsofcode.org/js/s/get-url-parameters)
