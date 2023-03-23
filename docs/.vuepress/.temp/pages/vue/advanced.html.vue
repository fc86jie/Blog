<template><div><nav class="table-of-contents"><ul><li><a href="#命令式和声明式">命令式和声明式</a></li><li><a href="#运行时和编译时">运行时和编译时</a></li><li><a href="#tree-shaking">Tree-Shaking</a></li></ul></nav>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


