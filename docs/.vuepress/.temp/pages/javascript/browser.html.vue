<template><div><nav class="table-of-contents"><ul><li><a href="#获取-url-中的参数">获取 URL 中的参数</a></li></ul></nav>
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


