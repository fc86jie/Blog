<template><div><nav class="table-of-contents"><ul><li><a href="#浏览器渲染原理">浏览器渲染原理</a></li><li><a href="#获取-url-中的参数">获取 URL 中的参数</a></li></ul></nav>
<h3 id="浏览器渲染原理" tabindex="-1"><a class="header-anchor" href="#浏览器渲染原理" aria-hidden="true">#</a> 浏览器渲染原理</h3>
<h4 id="浏览器内核" tabindex="-1"><a class="header-anchor" href="#浏览器内核" aria-hidden="true">#</a> 浏览器内核</h4>
<img src="@source/browser/images/render.jpg" alt="render.jpg" width="80%" />
<ul>
<li>GUI 渲染线程：GUI 渲染线程负责渲染浏览器界面，解析 HTML，CSS，构建 DOM 树和 RenderObject 树，布局和绘制等。当界面需要
重绘（Repaint）或由于某种操作引发回流（Reflow）时，该线程就会执行。</li>
<li>JavaScript 引擎线程: JavaScript 引擎线程主要负责解析 JavaScript 脚本并运行相关代码。 JavaScript 引擎在一个 Tab 页
（Renderer 进程）中无论什么时候都只有一个 JavaScript 线程在运行 JavaScript 程序。需要提起一点就是，GUI 线程与
JavaScript 引擎线程是互斥的，这也是就是为什么 JavaScript 操作时间过长，会造成页面渲染不连贯，导致页面出现阻塞的原理。</li>
<li>事件触发线程：当一个事件被触发时该线程会把事件添加到待处理队列的队尾，等待 JavaScript 引擎的处理。 通常 JavaScript 引
擎是单线程的，所以这些事件都会排队等待 JS 执行。</li>
<li>定时器触发器： 我们日常使用的 setInterval 和 setTimeout 就在该线程中，原因可能就是：由于 JS 引擎是单线程的，如果处于阻
塞线程状态就会影响记时的准确，所以需要通过单独的线程来记时并触发响应的事件这样子更为合理。</li>
<li>Http 请求线程： 在 XMLHttpRequest 在连接后是通过浏览器新开一个线程请求，这个线程就 Http 请求线程，它将检测到状态变更时
，如果设置有回调函数，异步线程就产生状态变更事件放到 JavaScript 引擎的处理队列中等待处理。</li>
</ul>
<h4 id="渲染机制" tabindex="-1"><a class="header-anchor" href="#渲染机制" aria-hidden="true">#</a> 渲染机制</h4>
<ol>
<li>处理 HTML 并构建 DOM 树。</li>
<li>处理 CSS 构建 CSSOM 树。</li>
<li>将 DOM 与 CSSOM 合并成一个渲染树。</li>
<li>根据渲染树来布局，计算每个节点的位置。</li>
<li>调用 GPU 绘制，合成图层，显示在屏幕上。</li>
</ol>
<p>webkit 内核浏览器渲染流程如下图所示：</p>
<p><img src="@source/browser/images/render.png" alt=""></p>
<p>在构建 CSSOM 树时，会阻塞渲染，直至 CSSOM 树构建完成。并且构建 CSSOM 树是一个十分消耗性能的过程，所以应该尽量保证层级扁
平，减少过度层叠，越是具体的 CSS 选择器，执行速度越慢。</p>
<p>当 HTML 解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始。也就是说，如果你想首屏渲染的越快，就越不应
该在首屏就加载 JS 文件。并且 CSS 也会影响 JS 的执行，只有当解析完样式表才会执行 JS，所以也可以认为这种情况下，CSS 也会暂
停构建 DOM。</p>
<h4 id="load-和-domcontentloaded-区别" tabindex="-1"><a class="header-anchor" href="#load-和-domcontentloaded-区别" aria-hidden="true">#</a> Load 和 DOMContentLoaded 区别</h4>
<ul>
<li>Load 事件触发代表页面中的 DOM，CSS，JS，图片已经全部加载完毕。</li>
<li>DOMContentLoaded 事件触发代表初始的 HTML 被完全加载和解析，不需要等待 CSS，JS，图片加载。</li>
</ul>
<h4 id="图层" tabindex="-1"><a class="header-anchor" href="#图层" aria-hidden="true">#</a> 图层</h4>
<p>一般来说，可以把普通文档流看成一个图层。特定的属性可以生成一个新的图层。不同的图层渲染互不影响，所以对于某些频繁需要渲染
的建议单独生成一个新图层，提高性能。但也不能生成过多的图层，会引起反作用。</p>
<p>通过以下几个常用属性可以生成新图层：</p>
<ul>
<li>3D 变换：translate3d、translateZ</li>
<li>will-change</li>
<li>video、iframe 标签</li>
<li>通过动画实现的 opacity 动画转换</li>
<li>position: fixed</li>
</ul>
<h4 id="重绘-repaint-和回流-reflow" tabindex="-1"><a class="header-anchor" href="#重绘-repaint-和回流-reflow" aria-hidden="true">#</a> 重绘（Repaint）和回流（Reflow）</h4>
<ul>
<li>当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility 等），浏览器会将新样式赋
予给元素并重新绘制它，这个过程称为重绘。</li>
<li>对 DOM 结构的修改引发 DOM 几何尺寸变化的时候,会发生回流过程。</li>
</ul>
<p>导致回流的属性和方法：
clientWidth、clientHeight、clientTop、clientLeft、offsetWidth、offsetHeight、offsetTop、offsetLeft、scrollWidth、scrollHeight、scrollTop、scrollLeft、scrollIntoView()、scrollIntoViewIfNeeded()、getComputedStyle()、getBoundingClientRect()、scrollTo()</p>
<div class="custom-container tip"><p class="custom-container-title">总结</p>
<ol>
<li>浏览器工作流程：构建 DOM -&gt; 构建 CSSOM -&gt; 构建渲染树 -&gt; 布局 -&gt; 绘制。</li>
<li>CSSOM 会阻塞渲染，只有当 CSSOM 构建完毕后才会进入下一个阶段构建渲染树。</li>
<li>通常情况下 DOM 和 CSSOM 是并行构建的，但是当浏览器遇到一个不带 defer 或 async 属性的 script 标签时，DOM 构建将暂停，
如果此时又恰巧浏览器尚未完成 CSSOM 的下载和构建，由于 JavaScript 可以修改 CSSOM，所以需要等 CSSOM 构建完毕后再执行
JS，最后才重新 DOM 构建。</li>
<li><a href="https://juejin.cn/post/6847902222349500430" target="_blank" rel="noopener noreferrer">参考链接<ExternalLinkIcon/></a></li>
</ol>
</div>
<h3 id="获取-url-中的参数" tabindex="-1"><a class="header-anchor" href="#获取-url-中的参数" aria-hidden="true">#</a> 获取 URL 中的参数</h3>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">getURLParameters</span> <span class="token operator">=</span> <span class="token parameter">url</span> <span class="token operator">=></span>
  <span class="token punctuation">(</span>url<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">([^?=&amp;]+)(=([^&amp;]*))</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> v</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">(</span>a<span class="token punctuation">[</span>v<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> v<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'='</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> v<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">indexOf</span><span class="token punctuation">(</span><span class="token string">'='</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> a<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//Examples</span>

<span class="token function">getURLParameters</span><span class="token punctuation">(</span><span class="token string">'google.com'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// {}</span>

<span class="token function">getURLParameters</span><span class="token punctuation">(</span><span class="token string">'http://url.com/page?name=Adam&amp;surname=Smith'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// {name: 'Adam', surname: 'Smith'}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><a href="https://www.30secondsofcode.org/js/s/get-url-parameters" target="_blank" rel="noopener noreferrer">参考链接<ExternalLinkIcon/></a></li>
</ul>
</div></template>


