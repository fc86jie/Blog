<template><div><nav class="table-of-contents"><ul><li><a href="#浏览器渲染原理">浏览器渲染原理</a></li><li><a href="#获取-url-中的参数">获取 URL 中的参数</a></li></ul></nav>
<h3 id="浏览器渲染原理" tabindex="-1"><a class="header-anchor" href="#浏览器渲染原理" aria-hidden="true">#</a> 浏览器渲染原理</h3>
<ul>
<li>浏览器工作流程：构建 DOM -&gt; 构建 CSSOM -&gt; 构建渲染树 -&gt; 布局 -&gt; 绘制。</li>
<li>CSSOM 会阻塞渲染，只有当 CSSOM 构建完毕后才会进入下一个阶段构建渲染树。</li>
<li>通常情况下 DOM 和 CSSOM 是并行构建的，但是当浏览器遇到一个不带 defer 或 async 属性的 script 标签时，DOM 构建将暂停，如
果此时又恰巧浏览器尚未完成 CSSOM 的下载和构建，由于 JavaScript 可以修改 CSSOM，所以需要等 CSSOM 构建完毕后再执行 JS，
最后才重新 DOM 构建。</li>
</ul>
<h3 id="获取-url-中的参数" tabindex="-1"><a class="header-anchor" href="#获取-url-中的参数" aria-hidden="true">#</a> 获取 URL 中的参数</h3>
<ul>
<li>来源：https://www.30secondsofcode.org/js/s/get-url-parameters</li>
</ul>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


