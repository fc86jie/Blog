<template><div><nav class="table-of-contents"><ul><li><a href="#scss-语法扩展">SCSS 语法扩展</a></li><li><a href="#变量">变量</a></li><li><a href="#import-导入">import 导入</a></li><li><a href="#mixin">mixin</a></li><li><a href="#插值语句">插值语句</a></li><li><a href="#use">@use</a></li></ul></nav>
<h3 id="scss-语法扩展" tabindex="-1"><a class="header-anchor" href="#scss-语法扩展" aria-hidden="true">#</a> SCSS 语法扩展</h3>
<div class="language-scss line-numbers-mode" data-ext="scss"><pre v-pre class="language-scss"><code><span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token comment">// 选择器嵌套</span>
  <span class="token selector">a </span><span class="token punctuation">{</span>
    <span class="token comment">// 父选择器嵌套</span>
    <span class="token selector"><span class="token parent important">&amp;</span>:hover </span><span class="token punctuation">{</span>
      <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token selector"><span class="token parent important">&amp;</span>-left </span><span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 属性选择器嵌套，此处必须有空格`font {`</span>
  <span class="token selector">font </span><span class="token punctuation">{</span>
    <span class="token property">size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
    <span class="token property">weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 占位符选择器</span>
<span class="token selector">.button<span class="token placeholder">%base</span> </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.button-default </span><span class="token punctuation">{</span>
  <span class="token keyword">@extend</span> <span class="token placeholder selector">%base</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.button-success </span><span class="token punctuation">{</span>
  <span class="token keyword">@extend</span> <span class="token placeholder selector">%base</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编译之后</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token property">font-size</span><span class="token punctuation">:</span> 14px<span class="token punctuation">;</span>
  <span class="token property">font-weight</span><span class="token punctuation">:</span> bold<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container a:hover </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token selector">.container-left </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.button.button-default,
.button.button-success </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.button-default </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.button-success </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="变量" tabindex="-1"><a class="header-anchor" href="#变量" aria-hidden="true">#</a> 变量</h3>
<ul>
<li>变量以美元符号($)开头，后面跟变量名</li>
<li>不以数字开头，包含字母、数字、下划线、横线（连接符）</li>
<li>先定义后使用</li>
<li>通过连接符和下划线定义的同名变量是为同一个变量</li>
<li>定义的局部变量只能在选择器范围内使用</li>
</ul>
<div class="language-scss line-numbers-mode" data-ext="scss"><pre v-pre class="language-scss"><code><span class="token comment">// 定义变量</span>
<span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token comment">// $border-color和$border_color是同一个变量，后定义的覆盖先定义的</span>
<span class="token property"><span class="token variable">$border-color</span></span><span class="token punctuation">:</span> #f00<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$border_color</span></span><span class="token punctuation">:</span> #0f0<span class="token punctuation">;</span>

<span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token comment">// 增加!global强制到全局</span>
  <span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 16px !global<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token property"><span class="token variable">$layer-index</span></span><span class="token punctuation">:</span> 10<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$border-width</span></span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$font-base-family</span></span><span class="token punctuation">:</span> <span class="token string">'Open Sans'</span><span class="token punctuation">,</span> Helvetica<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>255<span class="token punctuation">,</span> 177<span class="token punctuation">,</span> 168<span class="token punctuation">,</span> 0.8<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$blank-mode</span></span><span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$var</span></span><span class="token punctuation">:</span> <span class="token null keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// 缺少值，函数返回缺少结果</span>
<span class="token property"><span class="token variable">$color-map</span></span><span class="token punctuation">:</span> <span class="token punctuation">(</span>
  <span class="token property">color1</span><span class="token punctuation">:</span> red<span class="token punctuation">,</span>
  <span class="token property">color2</span><span class="token punctuation">:</span> green<span class="token punctuation">,</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token keyword">@if</span> <span class="token selector"><span class="token variable">$blank-mode</span> </span><span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">@else</span> <span class="token punctuation">{</span>
    <span class="token property">background-color</span><span class="token punctuation">:</span> green<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">type-of</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token function">length</span><span class="token punctuation">(</span><span class="token variable">$var</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">map-get</span><span class="token punctuation">(</span><span class="token variable">$color-map</span><span class="token punctuation">,</span> color2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
<span class="token comment">// 如果之前有定义$color使用定义的$color，没有则使用默认的</span>
<span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> #666 <span class="token statement keyword">!default</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="import-导入" tabindex="-1"><a class="header-anchor" href="#import-导入" aria-hidden="true">#</a> import 导入</h3>
<p>一下几种方式的导入都将作为普通的 css 导入，不会导入其他的 sass 文件</p>
<ol>
<li>文件扩展名是<code v-pre>.css</code>，<code v-pre>@import &quot;public.css&quot;</code></li>
<li>文件名以<code v-pre>http://</code>开头，<code v-pre>import url(public)</code></li>
<li>文件名是 url()，<code v-pre>import &quot;http://xxx.com/xxx&quot;</code></li>
<li>import 包含 media queries，<code v-pre>import 'landscape' screen and (orientation:landscape)</code></li>
</ol>
<p>如果不想导出某个文件，使用下划线开头<code v-pre>_theme.scss</code></p>
<div class="language-scss line-numbers-mode" data-ext="scss"><pre v-pre class="language-scss"><code><span class="token comment">// _theme.scss</span>
<span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>

<span class="token comment">// index.scss</span>
<span class="token keyword">@import</span> <span class="token string">'_theme.scss'</span><span class="token punctuation">;</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编译之后</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="mixin" tabindex="-1"><a class="header-anchor" href="#mixin" aria-hidden="true">#</a> mixin</h3>
<div class="language-scss line-numbers-mode" data-ext="scss"><pre v-pre class="language-scss"><code><span class="token keyword">@mixin</span> <span class="token selector">block </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> block<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编译之后</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">@mixin</span> <span class="token selector">block2 </span><span class="token punctuation">{</span>
  <span class="token selector">.middle </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token selector">.container2 </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> block2<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编译后</span>
<span class="token selector">.container2 </span><span class="token punctuation">{</span>
  <span class="token selector">.middle </span><span class="token punctuation">{</span>
    <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 传递参数</span>
<span class="token comment">// @mixin flex-align($color) {</span>
<span class="token comment">// 带默认参数</span>
<span class="token keyword">@mixin</span> <span class="token function">flex-align</span><span class="token punctuation">(</span><span class="token property"><span class="token variable">$color</span></span><span class="token punctuation">:</span> green<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> <span class="token variable">$color</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.container3 </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> <span class="token function">flex-align</span><span class="token punctuation">(</span>red<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 指定参数名传参，多个参数时不需要顺序一致</span>
  <span class="token comment">// @include flex-align($color: red);</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编译后</span>
<span class="token selector">.container3 </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">background-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//定义线性渐变</span>
<span class="token comment">// @param $direction 方向</span>
<span class="token comment">// @param $gradients 颜色过渡值列表</span>
<span class="token keyword">@mixin</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span><span class="token variable">$direction</span><span class="token punctuation">,</span> <span class="token variable">$gradients</span>...<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// nth从$gradients数组里取第一个</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">nth</span><span class="token punctuation">(</span><span class="token variable">$gradients</span><span class="token punctuation">,</span> 1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span><span class="token variable">$direction</span><span class="token punctuation">,</span> <span class="token variable">$gradients</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token keyword">@include</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to right<span class="token punctuation">,</span> red<span class="token punctuation">,</span> orange<span class="token punctuation">,</span> yellow<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编译后</span>
<span class="token selector">.container </span><span class="token punctuation">{</span>
  <span class="token property">color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
  <span class="token property">background-image</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to right<span class="token punctuation">,</span> red<span class="token punctuation">,</span> orange<span class="token punctuation">,</span> yellow<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="插值语句" tabindex="-1"><a class="header-anchor" href="#插值语句" aria-hidden="true">#</a> 插值语句</h3>
<div class="language-scss line-numbers-mode" data-ext="scss"><pre v-pre class="language-scss"><code><span class="token property"><span class="token variable">$font-size</span></span><span class="token punctuation">:</span> 12px<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$font-height</span></span><span class="token punctuation">:</span> 30px<span class="token punctuation">;</span>
<span class="token selector">p </span><span class="token punctuation">{</span>
  <span class="token property">font</span><span class="token punctuation">:</span> <span class="token variable">#{$font-size}</span>/ <span class="token variable">$font-height</span> Helvetica<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 编译后</span>
<span class="token selector">p </span><span class="token punctuation">{</span>
  <span class="token property">font</span><span class="token punctuation">:</span> 12px/30px <span class="token variable">$font-height</span> Helvetica<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token property"><span class="token variable">$class-name</span></span><span class="token punctuation">:</span> danger<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$attr</span></span><span class="token punctuation">:</span> color<span class="token punctuation">;</span>
a.#<span class="token punctuation">{</span>class-name<span class="token punctuation">}</span> <span class="token punctuation">{</span>
  border-#<span class="token punctuation">{</span>attr<span class="token punctuation">}</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 编译后</span>
<span class="token selector">a.danger </span><span class="token punctuation">{</span>
  <span class="token property">border-color</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="use" tabindex="-1"><a class="header-anchor" href="#use" aria-hidden="true">#</a> @use</h3>
<ul>
<li><code v-pre>@use</code>引入同一个文件多次不会重复，<code v-pre>@import</code>会重复</li>
<li><code v-pre>@use</code>引入的文件都是模块，默认以文件名作为模块名，可以通过<code v-pre>as alias</code>重命名</li>
<li><code v-pre>@use</code>引入多个文件时，每个文件都是单独的模块，相同变量名不会覆盖，通过模块名访问。<code v-pre>@import</code>变量会覆盖</li>
<li><code v-pre>@use</code>可以通过<code v-pre>@use 'xxx' as *</code>取消命名空间</li>
<li><code v-pre>@use</code>内部可以通过<code v-pre>$-</code>或<code v-pre>$_</code>定义私有成员，<code v-pre>-</code>和<code v-pre>_</code>开头的变量、mixin、函数不会被引入</li>
<li><code v-pre>@use</code>内模块变量可以通过<code v-pre>!default</code>定义默认值,引入的通过<code v-pre>with(...)</code>的方式修改</li>
</ul>
</div></template>


