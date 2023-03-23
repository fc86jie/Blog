<template><div><nav class="table-of-contents"><ul><li><a href="#命令式和声明式">命令式和声明式</a></li><li><a href="#运行时和编译时">运行时和编译时</a></li><li><a href="#tree-shaking">Tree-Shaking</a></li><li><a href="#vue3-编译优化">vue3 编译优化</a></li></ul></nav>
<h3 id="命令式和声明式" tabindex="-1"><a class="header-anchor" href="#命令式和声明式" aria-hidden="true">#</a> 命令式和声明式</h3>
<ul>
<li>命令式：关注过程，命令式代码的更新性能消耗 = 直接修改的性能消耗</li>
<li>声明式：关注结果，声明式代码的更新性能消耗 = 找出差异的性能消耗 + 直接修改的性能消耗</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 命令式</span>
<span class="token keyword">const</span> div <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'#app'</span><span class="token punctuation">)</span> <span class="token comment">// 获取 div</span>
<span class="token number">02</span> div<span class="token punctuation">.</span>innerText <span class="token operator">=</span> <span class="token string">'hello world'</span> <span class="token comment">// 设置文本内容</span>
<span class="token number">03</span> div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> <span class="token function">alert</span><span class="token punctuation">(</span><span class="token string">'ok'</span><span class="token punctuation">)</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token comment">// 绑定点击事件</span>

<span class="token comment">// 声明式</span>
<span class="token operator">&lt;</span>div @click<span class="token operator">=</span><span class="token string">"() => alert('ok')"</span><span class="token operator">></span>hello world<span class="token operator">&lt;</span><span class="token operator">/</span>div<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>声明式代码的性能不优于命令式代码的性能，框架本身就是封装了命令式代码才实现了面向用户的声明式</p>
<table>
<thead>
<tr>
<th>原生 JavaScript</th>
<th>虚拟 DOM</th>
<th>innerHTML</th>
</tr>
</thead>
<tbody>
<tr>
<td>纯 JavaScript 运算</td>
<td>创建新的 JavaScript 对象 + Diff</td>
<td>渲染 HTML 字符串</td>
</tr>
<tr>
<td>DOM 运算</td>
<td>必要的 DOM 更新</td>
<td>销毁所有旧 DOM，新建所有新 DOM</td>
</tr>
<tr>
<td>性能因素</td>
<td>与数据变化量相关</td>
<td>与模板大小相关</td>
</tr>
<tr>
<td>心智负担大，可维护性差</td>
<td>心智负担小，可维护性强</td>
<td>心智负担中等</td>
</tr>
<tr>
<td>性能高</td>
<td>性能中等</td>
<td>性能低</td>
</tr>
</tbody>
</table>
<h3 id="运行时和编译时" tabindex="-1"><a class="header-anchor" href="#运行时和编译时" aria-hidden="true">#</a> 运行时和编译时</h3>
<ul>
<li>运行时：能够直接运行，没办法分析用户提供的内容</li>
<li>编译时：需要通过编译器编译之后在运行的，编译的时候可以分析用户提供的内容（比如，哪些是变化的，哪些是不变的），做优化</li>
</ul>
<p>vue3 是编译时+运行时</p>
<h3 id="tree-shaking" tabindex="-1"><a class="header-anchor" href="#tree-shaking" aria-hidden="true">#</a> Tree-Shaking</h3>
<p>消除那些永远不会被执行的代码，模块必须是 ESM（ES Module），因为 Tree-Shaking 依赖 ESM 的静态结构。可以使用注释代码 <code v-pre>/_#**PURE**_/</code>告诉工具（rollup 等），可以移除。</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'./utils'</span><span class="token punctuation">;</span>
<span class="token comment">/*#__PURE__*/</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="vue3-编译优化" tabindex="-1"><a class="header-anchor" href="#vue3-编译优化" aria-hidden="true">#</a> vue3 编译优化</h3>
<p>编译优化指的是通过编译的手段提取关键信息，并以此指导生成最优代码的过程。核心在于，区分动态节点与静态节点。vue3 中做了如下优化：</p>
<ul>
<li>Block Tree：一个 Block 本质上也是一个虚拟节点，但与普通虚拟节点相比，会多出一个 <code v-pre>dynamicChildren</code> 数组。该数组用来收集所有动态子代节点。<code v-pre>dynamicChildren</code> 数组中收集的动态节点是忽略虚拟 DOM 树层级的。换句话说，结构化指令会导致更新前后模板的结构发生变化，即模板结构不稳定。所谓结构不稳定，从结果上看，指的是更新前后一个 block 的 <code v-pre>dynamicChildren</code> 数组中收集的动态节点的数量或顺序不一致。Block 会搜集子 Block 形成 Block Tree
<ul>
<li>组件模板的根节点必须作为 Block</li>
<li>带有结构化指令的节点，如带有 <code v-pre>v-if</code> 和 <code v-pre>v-for</code> 等指令的节点，都应该作为 Block</li>
</ul>
</li>
<li>patchFlag：为动态节点打上补丁标志，标记节点类型</li>
<li>静态提升：静态节点只创建一次，下次更新直接获取，能够减少更新时创建虚拟 DOM 带来的性能开销和内存占用。</li>
<li>预字符串化：在静态提升的基础上，对静态节点进行字符串化。这样做能够减少创建虚拟节点产生的性能开销以及内存占用。</li>
<li>缓存内联事件处理函数：避免造成不必要的组件更新。</li>
<li>v-once 指令：缓存全部或部分虚拟节点，能够避免组件更新时重新创建虚拟 DOM 带来的性能开销，也可以避免无用的 Diff 操
作。</li>
</ul>
</div></template>


