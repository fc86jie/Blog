<template><div><nav class="table-of-contents"><ul><li><a href="#http-server-启动-https-服务">http-server 启动 https 服务</a></li><li><a href="#在-es-模块-node-js-中导入-json-文件">在 ES 模块（Node.js）中导入 JSON 文件</a></li></ul></nav>
<h3 id="http-server-启动-https-服务" tabindex="-1"><a class="header-anchor" href="#http-server-启动-https-服务" aria-hidden="true">#</a> http-server 启动 https 服务</h3>
<ul>
<li>安装 http-server</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> http-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>安装 openssl，并设置环境变量，保证 openssl 命令可用</li>
<li>使用 openssl 生成 key.pem 和 cert.pem</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>openssl req <span class="token parameter variable">-newkey</span> rsa:2048 <span class="token parameter variable">-new</span> <span class="token parameter variable">-nodes</span> <span class="token parameter variable">-x509</span> <span class="token parameter variable">-days</span> <span class="token number">3650</span> <span class="token parameter variable">-keyout</span> key.pem <span class="token parameter variable">-out</span> cert.pem
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>把生成的 key.pem 和 cert.pem 文件放在服务目录，使用如下命令即可启动 https 服务</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>http-server <span class="token parameter variable">-S</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="在-es-模块-node-js-中导入-json-文件" tabindex="-1"><a class="header-anchor" href="#在-es-模块-node-js-中导入-json-文件" aria-hidden="true">#</a> 在 ES 模块（Node.js）中导入 JSON 文件</h3>
<ol>
<li>使用 fs 模块读取和解析 JSON 文件</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> readFile <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'fs/promises'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> jsonData <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token keyword">await</span> <span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">'./a.json'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>利用 CommonJS require 方法加载 JSON 文件，createRequire 允许您构造 CommonJS require 方法，以便可以使用典型的 CommonJS
功能</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createRequire <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'module'</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> require <span class="token operator">=</span> <span class="token function">createRequire</span><span class="token punctuation">(</span><span class="token keyword">import</span><span class="token punctuation">.</span>meta<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> jsonData <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./a.json'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>import Assertions</li>
</ol>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> jsonData <span class="token keyword">from</span> <span class="token string">'./a.json'</span> <span class="token keyword">assert</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'json'</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


