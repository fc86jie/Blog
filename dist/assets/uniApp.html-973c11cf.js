import{_ as s,p as n,q as a,a1 as e}from"./framework-96b046e1.js";const i={},p=e(`<nav class="table-of-contents"><ul><li><a href="#uni-app-中-swiper-组件遇到的问题">uni-app 中 swiper 组件遇到的问题</a></li></ul></nav><h3 id="uni-app-中-swiper-组件遇到的问题" tabindex="-1"><a class="header-anchor" href="#uni-app-中-swiper-组件遇到的问题" aria-hidden="true">#</a> uni-app 中 swiper 组件遇到的问题</h3><ul><li>组件名称是 swiper.vue 或者 Swiper.vue，传递数据时图片可能不见了</li><li>改变图片大小要用 rpx 单位</li><li>本身 swiper 有默认的 150px 的默认高度，app 中需要改变默认高度<div class="language-css line-numbers-mode" data-ext="css"><pre class="language-css"><code><span class="token selector">swiper</span> <span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 400rpx<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,3),t=[p];function l(c,r){return n(),a("div",null,t)}const o=s(i,[["render",l],["__file","uniApp.html.vue"]]);export{o as default};
