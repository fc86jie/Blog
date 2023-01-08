import{_ as n,o as e,c as a,d as s}from"./app.60df5af5.js";const i={},t=s(`<h3 id="npm-init" tabindex="-1"><a class="header-anchor" href="#npm-init" aria-hidden="true">#</a> npm init</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> init 包名 等效于 npx create-包名
<span class="token function">npm</span> init @命名空间 等效于 npx @命名空间/create
<span class="token function">npm</span> init @命名空间/包名 等效于 npx @命名空间/create-包名
<span class="token function">npm</span> init <span class="token parameter variable">-y</span> 生成默认的package.json

<span class="token function">npm</span> create vite my-vue-app <span class="token parameter variable">--template</span> vue <span class="token operator">==</span><span class="token operator">=</span> npx create-vite my-vue-app <span class="token parameter variable">--template</span> vue
使用npx安装create-vite,执行create-vite命令使用vue模板创建my-vue-app项目
<span class="token function">npm</span> create是 <span class="token function">npm</span> init 的别名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="npx" tabindex="-1"><a class="header-anchor" href="#npx" aria-hidden="true">#</a> npx</h3><ul><li>npx 非常智能的识别模块，如果模块存在，就使用。如果不存在，就临时下载，用完就删除</li><li>先检查当前项目 node_modules/下，是否存在。不存在的话，就检查全局是否已经安装对应的模块。如果还没有的话，就去仓库里面去下载对应的模块，下载完毕就执行。执行完毕就删除</li></ul>`,4),p=[t];function c(l,r){return e(),a("div",null,p)}const d=n(i,[["render",c],["__file","base.html.vue"]]);export{d as default};
