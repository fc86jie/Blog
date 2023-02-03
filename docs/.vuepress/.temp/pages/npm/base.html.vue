<template><div><nav class="table-of-contents"><ul><li><a href="#npm-init">npm init</a></li><li><a href="#npx">npx</a></li><li><a href="#package-json-中包的版本控制">package.json 中包的版本控制</a></li></ul></nav>
<h3 id="npm-init" tabindex="-1"><a class="header-anchor" href="#npm-init" aria-hidden="true">#</a> npm init</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init 包名 等效于 npx create-包名
<span class="token function">npm</span> init @命名空间 等效于 npx @命名空间/create
<span class="token function">npm</span> init @命名空间/包名 等效于 npx @命名空间/create-包名
<span class="token function">npm</span> init <span class="token parameter variable">-y</span> 生成默认的package.json

<span class="token function">npm</span> create vite my-vue-app <span class="token parameter variable">--template</span> vue <span class="token operator">==</span><span class="token operator">=</span> npx create-vite my-vue-app <span class="token parameter variable">--template</span> vue
使用npx安装create-vite,执行create-vite命令使用vue模板创建my-vue-app项目
<span class="token function">npm</span> create是 <span class="token function">npm</span> init 的别名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="npx" tabindex="-1"><a class="header-anchor" href="#npx" aria-hidden="true">#</a> npx</h3>
<ul>
<li>npx 非常智能的识别模块，如果模块存在，就使用。如果不存在，就临时下载，用完就删除</li>
<li>先检查当前项目 node_modules/下，是否存在。不存在的话，就检查全局是否已经安装对应的模块。如果还没有的话，就去仓库里面去
下载对应的模块，下载完毕就执行。执行完毕就删除</li>
</ul>
<h3 id="package-json-中包的版本控制" tabindex="-1"><a class="header-anchor" href="#package-json-中包的版本控制" aria-hidden="true">#</a> package.json 中包的版本控制</h3>
<ol>
<li>版本说明：
<blockquote>
<p>主版本号.次版本号.修补版本号 major.minor.patch</p>
</blockquote>
</li>
</ol>
<ul>
<li>
<p><strong>major</strong>：主要版本，新的架构调整，不兼容老版本</p>
</li>
<li>
<p><strong>minor</strong>：次要版本，新增功能，兼容老版本</p>
</li>
<li>
<p><strong>patch</strong>：修复 bug，兼容老版本</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token string-property property">"dependencies"</span><span class="token operator">:</span><span class="token punctuation">{</span>
  <span class="token comment">// 主要版本是3，次要版本是2，补丁版本是11</span>
   <span class="token string-property property">"vue"</span><span class="token operator">:</span><span class="token string">"3.2.11"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<ol start="2">
<li>
<p>符号说明：</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code>    <span class="token string-property property">"dependencies"</span><span class="token operator">:</span><span class="token punctuation">{</span>
      <span class="token string-property property">"jquery"</span><span class="token operator">:</span><span class="token string">"^2.0.0"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"underscore"</span><span class="token operator">:</span><span class="token string">"~1.12.0"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"vue-cli"</span><span class="token operator">:</span><span class="token string">"3.4.0"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"vite"</span><span class="token operator">:</span><span class="token string">"_2.1.0"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"vue"</span><span class="token operator">:</span><span class="token string">"_"</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<ul>
<li>
<p><strong>^</strong>：表示只锁定主版本号，主版本号确定后，后面获取最新的版本，以上面的 jquery 为例，主版本号 2 确定后，后面会获取在主版本号下最新的版本 2.2.4。</p>
</li>
<li>
<p><strong>~</strong>：表示锁定主版本号和次版本号，后面获取最新的版本，以上面的 underscore 为例，主版本号 1 和次版本号 12 确定后，后面会获取在主次版本号下最新的版本 1.12.4。</p>
</li>
<li>
<p><strong>空</strong>：没有任何符号表示版本锁死了，就是指定的这个版本。以上面的 vue-cli 为例，主版本号、次版本号、补丁号都确定了。</p>
</li>
<li>
<p><strong>*</strong>：表示最新的版本，以上面的 vite 和 vue 为例，它们都是去获取最新的版本。</p>
</li>
</ul>
</div></template>


