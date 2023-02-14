import{_ as n,p as s,q as a,a1 as e}from"./framework-96b046e1.js";const t={},p=e(`<nav class="table-of-contents"><ul><li><a href="#正则表达式小结">正则表达式小结</a></li></ul></nav><h3 id="正则表达式小结" tabindex="-1"><a class="header-anchor" href="#正则表达式小结" aria-hidden="true">#</a> 正则表达式小结</h3><ul><li><p>正则对象下的方法：test、exec</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 字面量创建</span>
<span class="token keyword">let</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\d+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token comment">// 构造函数创建（1、\\需要转移，2、支持变量）</span>
<span class="token keyword">let</span> reg2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">&#39;\\\\d+&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;g&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">&#39;123abc456&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> arr <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// [&quot;123&quot;, &quot;456&quot;]</span>
<span class="token comment">// 一、正则对象下的方法：test、exec</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token comment">// exec 执行一次返回一次直到返回 null，基于 lastIndex，执行一次会更新 lastIndex，</span>
<span class="token comment">// 下次执行基于 lastIndex 查找;</span>
reg<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;123&#39;, index: 0, input: &#39;123abc456&#39;, groups: undefined]</span>
reg<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;456&#39;, index: 6, input: &#39;123abc456&#39;, groups: undefined]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>字符串方法：split、search、match、replace</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> str2 <span class="token operator">=</span> <span class="token string">&#39;abc123fda1234rt&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> arr2 <span class="token operator">=</span> str2<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;abc&#39;, &#39;23fda&#39;, &#39;234rt&#39;]</span>
<span class="token keyword">let</span> arr2_1 <span class="token operator">=</span> str2<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\d+</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;abc&#39;, &#39;fda&#39;, &#39;rt&#39;]</span>

<span class="token keyword">let</span> arr3 <span class="token operator">=</span> str2<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0 返回第一次匹配的下标</span>
<span class="token keyword">let</span> arr3_1 <span class="token operator">=</span> str2<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">a</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0 返回第一次匹配的下标，忽略全局匹配</span>
<span class="token keyword">let</span> arr3_2 <span class="token operator">=</span> str2<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">z</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -1 找不到返回-1</span>

<span class="token comment">// match单个和exec返回结果类似，全局返回数组</span>

str2<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\d</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">&#39;*&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// abc***fda****rt</span>
str2<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\d</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token parameter">arg</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token comment">// abc1*2*3*fda1*2*3*4*rt</span>
  <span class="token keyword">return</span> arg <span class="token operator">+</span> <span class="token string">&#39;*&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>元字符</p><ul><li>字符相关 <ul><li><code>\\w</code> ：数字、字母、下划线</li><li><code>\\W</code> ：非（数字、字母、下划线）</li><li><code>\\d</code> ：数字</li><li><code>\\D</code> ：非（数字）</li><li><code>\\s</code> ：空格</li><li><code>\\S</code> ：非（空格）</li><li><code>.</code> ：非（换行\\n、回车\\r、\\u2028(行分隔符)、\\u2029（段落分隔符））</li></ul></li><li>数量相关 <ul><li><code>{}</code> ：匹配次数 e{5}：5 次，e{3,6}：3~6 次，e{3,}：3 次以上</li><li><code>?</code> ：{0,1}</li><li><code>\\*</code> ：{0,}</li><li><code>\\+</code> ：{1,}</li></ul></li><li>3、位置相关 <ul><li><code>^</code> ：开始</li><li><code>$</code> ：结尾</li><li><code>\\b</code> ：边界符（非\\w 的都是边界符）</li><li><code>\\B</code> ：非（边界符）</li></ul></li><li>4、括号相关 <ul><li><code>()</code> ：分组、提取值、替换、反向引用</li><li><code>[]</code> ：字符集合</li><li><code>{}</code> ：</li></ul></li><li>5、匹配模式 <ul><li><code>g</code> ：全局匹配</li><li><code>i</code> ：忽略大小写</li><li><code>m</code> ：多行模式</li><li><code>s</code> ：让“.”匹配到换行</li><li><code>u</code> ：匹配 unicode</li><li><code>y</code> ：粘性模式</li></ul></li></ul></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">let</span> str4 <span class="token operator">=</span> <span class="token string">&#39;123456789&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg4 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\d{2,4}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// 贪婪匹配，最多的匹配</span>
<span class="token keyword">let</span> reg4_1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\d{2,4}?</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// 增加?，惰性匹配，最少的匹配</span>
<span class="token keyword">let</span> res4 <span class="token operator">=</span> str4<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg4<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  [&#39;1234&#39;, &#39;5678&#39;]</span>
<span class="token keyword">let</span> res4_1 <span class="token operator">=</span> str4<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg4_1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  [&#39;12&#39;, &#39;34&#39;, &#39;56&#39;, &#39;78&#39;]</span>

<span class="token keyword">let</span> str5 <span class="token operator">=</span> <span class="token string">&#39;this is a book&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg5 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\bis\\b</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// 匹配 is</span>
<span class="token keyword">let</span> res5 <span class="token operator">=</span> str5<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg5<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&quot;is&quot;]</span>

<span class="token comment">// 分组</span>
<span class="token keyword">let</span> str6 <span class="token operator">=</span> <span class="token string">&#39;abababcdef&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg6 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(ab){3}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// 匹配 ababab</span>
reg6<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str6<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 提取值</span>
<span class="token keyword">let</span> str7 <span class="token operator">=</span> <span class="token string">&#39;2022-10-20&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg7 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\d{4}-\\d{2}-\\d{2}</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg7<span class="token operator">*</span><span class="token number">1</span> <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\\d{4})-(\\d{2})-(\\d{2})</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res7 <span class="token operator">=</span> str7<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg7<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;2022-10-20&#39;, index: 0, input: &#39;2022-10-20&#39;, groups: undefined]</span>
<span class="token keyword">let</span> res7_1 <span class="token operator">=</span> str7<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg7_1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;2022-10-20&#39;, &#39;2022&#39;, &#39;10&#39;, &#39;20&#39;, index: 0, input: &#39;2022-10-20&#39;, groups: undefined]</span>
<span class="token keyword">let</span> year <span class="token operator">=</span> RegExp<span class="token punctuation">.</span>$1<span class="token punctuation">;</span> <span class="token comment">// &quot;2022&quot;</span>
<span class="token keyword">let</span> month <span class="token operator">=</span> RegExp<span class="token punctuation">.</span>$2<span class="token punctuation">;</span> <span class="token comment">// &quot;10&quot;</span>
<span class="token keyword">let</span> day <span class="token operator">=</span> RegExp<span class="token punctuation">.</span>$3<span class="token punctuation">;</span> <span class="token comment">// &quot;20&quot;</span>
<span class="token comment">// 替换</span>
<span class="token keyword">let</span> res7_2 <span class="token operator">=</span> str7<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg7_1<span class="token punctuation">,</span> <span class="token string">&#39;$1/$2/$3&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;2022/10/20&quot;</span>
<span class="token keyword">let</span> res7_3 <span class="token operator">=</span> str7<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg7_1<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">arg<span class="token punctuation">,</span> year<span class="token punctuation">,</span> month<span class="token punctuation">,</span> day</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>year<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>month<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>day<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;2022/10/20&quot;</span>
<span class="token comment">// 反向引用</span>
<span class="token keyword">let</span> str8 <span class="token operator">=</span> <span class="token string">&#39;news-container-nav&#39;</span><span class="token punctuation">;</span> <span class="token comment">// &quot;news_container_nav&quot; // res8 true</span>
<span class="token comment">// let str8 = &quot;news_container_nav&quot;; // res8 true</span>
<span class="token comment">// let str8 = &quot;news-container_nav&quot;; // res8 false</span>
<span class="token keyword">let</span> reg8 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\w{4}(-|*)\\w{9}(\\1)\\w{3}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// (\\1)第一个()内的值，保证匹配一致</span>
<span class="token keyword">let</span> res8 <span class="token operator">=</span> reg8<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str8<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 字符集合</span>
<span class="token keyword">let</span> str9 <span class="token operator">=</span> <span class="token string">&#39;My name is LiLei&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// let str9 = &quot;My name is Lilei&quot;;</span>
<span class="token keyword">let</span> reg9 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Li[Ll]ei</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// LiLei |Lilei</span>
<span class="token keyword">let</span> reg9_1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Li[^ll]ei</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// LiLei |Lilei</span>
<span class="token keyword">let</span> res9 <span class="token operator">=</span> reg9<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str9<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 多行模式</span>
<span class="token keyword">let</span> str10 <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">abc
          def
          ghi</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg10 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\b\\w</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gm</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res10 <span class="token operator">=</span> str10<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg10<span class="token punctuation">,</span> <span class="token string">&#39;*&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &#39;*bc\\n *ef\\n *hi&#39;</span>

<span class="token comment">// 匹配模式 s 使用</span>
<span class="token keyword">let</span> str11 <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">abc
          def</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg11 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^a.\\*f$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gs</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res11 <span class="token operator">=</span> reg11<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str11<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token comment">// unicode 匹配</span>
<span class="token keyword">let</span> str12 <span class="token operator">=</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg12 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\u{61}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gu</span></span><span class="token punctuation">;</span> <span class="token comment">// unicode 编码是 61 的字符</span>
<span class="token keyword">let</span> res12 <span class="token operator">=</span> reg12<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str12<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token comment">// y 模式,必须是连续的</span>
<span class="token keyword">let</span> str13 <span class="token operator">=</span> <span class="token string">&#39;123abc456&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg13 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\d</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gy</span></span><span class="token punctuation">;</span>
reg13<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str13<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;1&#39;, index: 6, input: &#39;123abc456&#39;, groups: undefined]</span>
reg13<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str13<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;2&#39;, index: 6, input: &#39;123abc456&#39;, groups: undefined]</span>
reg13<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str13<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;3&#39;, index: 6, input: &#39;123abc456&#39;, groups: undefined]</span>
reg13<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str13<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null，非 y 模式[&#39;4&#39;, index: 6, input: &#39;123abc456&#39;, groups: undefined]，</span>

<span class="token comment">// 命名分组</span>
<span class="token keyword">let</span> str14 <span class="token operator">=</span> <span class="token string">&#39;2022-10-20&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg14 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\\d{4})-(\\d{2})-(\\d{2})</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg14_1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;year&gt;\\d{4})-(?&lt;month&gt;\\d{2})-(?&lt;day&gt;\\d{2})</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res14 <span class="token operator">=</span> str14<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg14<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [&#39;2022-10-20&#39;, &#39;2022&#39;, &#39;10&#39;, &#39;20&#39;, index: 0, input: &#39;2022-10-20&#39;, groups: undefined]</span>
<span class="token keyword">let</span> res14_1 <span class="token operator">=</span> str14<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg14_1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  [&#39;2022-10-20&#39;, &#39;2022&#39;, &#39;10&#39;, &#39;20&#39;, index: 0, input: &#39;2022-10-20&#39;, groups: {year: &#39;2022&#39;, month: &#39;10&#39;, day: &#39;20&#39;}]</span>

<span class="token comment">// 正向零宽断言</span>
<span class="token keyword">let</span> str15 <span class="token operator">=</span> <span class="token string">&#39;iphone7iphone8iphone9iphonenumber&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// 肯定</span>
<span class="token keyword">let</span> reg15 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">iphone(?=\\d)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token comment">// 否定</span>
<span class="token keyword">let</span> reg15_1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">iphone(?!\\d)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res15 <span class="token operator">=</span> str15<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg15<span class="token punctuation">,</span> <span class="token string">&#39;苹果&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;苹果 7 苹果 8 苹果 9iphonenumber&quot;</span>
<span class="token keyword">let</span> res15_1 <span class="token operator">=</span> str15<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg15_1<span class="token punctuation">,</span> <span class="token string">&#39;苹果&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;iphone7iphone8iphone9 苹果 number&quot;</span>

<span class="token comment">// 负向零宽断言</span>
<span class="token keyword">let</span> str16 <span class="token operator">=</span> <span class="token string">&#39;10px11px12pxipx&#39;</span><span class="token punctuation">;</span>
<span class="token comment">// 肯定</span>
<span class="token keyword">let</span> reg16 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;=\\d+)px</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token comment">// 否定</span>
<span class="token keyword">let</span> reg16_1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;!\\d+)px</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res16 <span class="token operator">=</span> str16<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg16<span class="token punctuation">,</span> <span class="token string">&#39;像素&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;10 像素 11 像素 12 像素 ipx&quot;</span>
<span class="token keyword">let</span> res16_1 <span class="token operator">=</span> str16<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg16_1<span class="token punctuation">,</span> <span class="token string">&#39;像素&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// &quot;10px11px12pxi 像素&quot;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),o=[p];function c(l,i){return s(),a("div",null,o)}const u=n(t,[["render",c],["__file","reg.html.vue"]]);export{u as default};
