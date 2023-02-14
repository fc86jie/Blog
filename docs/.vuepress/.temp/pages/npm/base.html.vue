<template><div><nav class="table-of-contents"><ul><li><a href="#npx">npx</a></li><li><a href="#npm-init">npm init</a></li><li><a href="#npm-pack">npm pack</a></li><li><a href="#package-json-中包的版本控制">package.json 中包的版本控制</a></li><li><a href="#package-json-部分字段">package.json 部分字段</a></li><li><a href="#使用-verdaccio搭建自己的-npm-私服">使用 verdaccio搭建自己的 npm 私服</a></li></ul></nav>
<h3 id="npx" tabindex="-1"><a class="header-anchor" href="#npx" aria-hidden="true">#</a> npx</h3>
<ul>
<li>npx 非常智能的识别模块，如果模块存在，就使用。如果不存在，就临时下载，用完就删除</li>
<li>先检查当前项目 node_modules/下，是否存在。不存在的话，就检查全局是否已经安装对应的模块。如果还没有的话，就去仓库里面去
下载对应的模块，下载完毕就执行。执行完毕就删除</li>
</ul>
<h3 id="npm-init" tabindex="-1"><a class="header-anchor" href="#npm-init" aria-hidden="true">#</a> npm init</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init 包名 等效于 npx create-包名
<span class="token function">npm</span> init @命名空间 等效于 npx @命名空间/create
<span class="token function">npm</span> init @命名空间/包名 等效于 npx @命名空间/create-包名
<span class="token function">npm</span> init <span class="token parameter variable">-y</span> 生成默认的package.json

<span class="token function">npm</span> create vite my-vue-app <span class="token parameter variable">--template</span> vue <span class="token operator">==</span><span class="token operator">=</span> npx create-vite my-vue-app <span class="token parameter variable">--template</span> vue
使用npx安装create-vite,执行create-vite命令使用vue模板创建my-vue-app项目
<span class="token function">npm</span> create是 <span class="token function">npm</span> init 的别名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="npm-pack" tabindex="-1"><a class="header-anchor" href="#npm-pack" aria-hidden="true">#</a> npm pack</h3>
<p>执行命令会在当前目录下生成一个 x.tgz 的压缩包（x-nrm-1.0.0.tgz）,该包可以通过<code v-pre>npm install -g ./x.tgz</code>安装到全局，<code v-pre>package.json</code>中的 bin 配置中的命令就会变成命令行工具的命令，执行命令会执行相应的代码</p>
<h3 id="package-json-中包的版本控制" tabindex="-1"><a class="header-anchor" href="#package-json-中包的版本控制" aria-hidden="true">#</a> package.json 中包的版本控制</h3>
<ol>
<li>版本说明：
<blockquote>
<p>主版本号.次版本号.修补版本号-预发号 major.minor.patch-pre</p>
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
<ol start="3">
<li>更新版本号，使用<code v-pre>npm version</code>命令，执行该命令会同时执行 commit 操作
<ul>
<li><code v-pre>npm version major -m &quot;description&quot;</code>：变更主版本，例如<code v-pre>1.0.0</code>-&gt;<code v-pre>2.0.0</code></li>
<li><code v-pre>npm version minor -m &quot;description&quot;</code>：变更次版本，例如<code v-pre>1.0.0</code>-&gt;<code v-pre>1.1.0</code></li>
<li><code v-pre>npm version patch -m &quot;description&quot;</code>：变更补丁版本，例如<code v-pre>1.0.0</code>-&gt;<code v-pre>1.0.1</code></li>
</ul>
</li>
</ol>
<h3 id="package-json-部分字段" tabindex="-1"><a class="header-anchor" href="#package-json-部分字段" aria-hidden="true">#</a> package.json 部分字段</h3>
<ul>
<li><code v-pre>peerDependencies</code>：在开发插件时，你的插件需要某些依赖的支持，但是你又没必要去安装，因为插件的宿主回去安装这些依赖。此时就可以用 peerDependencies 去声明一下需要依赖的插件和版本。如果出问题的话，npm 会有警告来提示使用者去解决版本中的冲突。比如 element-ui 组件库依赖 vue，本身组件库不会包含 vue 核心代码，需要宿主安装</li>
<li><code v-pre>files</code>：是一个数组，用来描述当把 npm 包作为依赖包安装时需要说明的文件列表。当 npm 包发布时，files 指定的文件会被推送到 npm 服务器中，如果指定的是文件夹，那么该文件夹下面所有的文件都会被提交</li>
</ul>
<h3 id="使用-verdaccio搭建自己的-npm-私服" tabindex="-1"><a class="header-anchor" href="#使用-verdaccio搭建自己的-npm-私服" aria-hidden="true">#</a> 使用 <a href="https://github.com/verdaccio/verdaccio" target="_blank" rel="noopener noreferrer">verdaccio<ExternalLinkIcon/></a>搭建自己的 npm 私服</h3>
</div></template>


