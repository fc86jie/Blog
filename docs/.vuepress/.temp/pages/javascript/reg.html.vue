<template><div><nav class="table-of-contents"><ul><li><a href="#正则表达式小结">正则表达式小结</a></li></ul></nav>
<h3 id="正则表达式小结" tabindex="-1"><a class="header-anchor" href="#正则表达式小结" aria-hidden="true">#</a> 正则表达式小结</h3>
<ul>
<li>
<p>正则对象下的方法：test、exec</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token comment">// 字面量创建</span>
<span class="token keyword">let</span> reg <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d+</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token comment">// 构造函数创建（1、\需要转移，2、支持变量）</span>
<span class="token keyword">let</span> reg2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">'\\d+'</span><span class="token punctuation">,</span> <span class="token string">'g'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> str <span class="token operator">=</span> <span class="token string">'123abc456'</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> arr <span class="token operator">=</span> str<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg2<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// ["123", "456"]</span>
<span class="token comment">// 一、正则对象下的方法：test、exec</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
<span class="token comment">// exec 执行一次返回一次直到返回 null，基于 lastIndex，执行一次会更新 lastIndex，</span>
<span class="token comment">// 下次执行基于 lastIndex 查找;</span>
reg<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['123', index: 0, input: '123abc456', groups: undefined]</span>
reg<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['456', index: 6, input: '123abc456', groups: undefined]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>字符串方法：split、search、match、replace</p>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> str2 <span class="token operator">=</span> <span class="token string">'abc123fda1234rt'</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> arr2 <span class="token operator">=</span> str2<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['abc', '23fda', '234rt']</span>
<span class="token keyword">let</span> arr2_1 <span class="token operator">=</span> str2<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d+</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['abc', 'fda', 'rt']</span>

<span class="token keyword">let</span> arr3 <span class="token operator">=</span> str2<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token string">'a'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0 返回第一次匹配的下标</span>
<span class="token keyword">let</span> arr3_1 <span class="token operator">=</span> str2<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">a</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 0 返回第一次匹配的下标，忽略全局匹配</span>
<span class="token keyword">let</span> arr3_2 <span class="token operator">=</span> str2<span class="token punctuation">.</span><span class="token function">search</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">z</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -1 找不到返回-1</span>

<span class="token comment">// match单个和exec返回结果类似，全局返回数组</span>

str2<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token string">'*'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// abc***fda****rt</span>
str2<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">,</span> <span class="token parameter">arg</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// abc1*2*3*fda1*2*3*4*rt</span>
  <span class="token keyword">return</span> arg <span class="token operator">+</span> <span class="token string">'*'</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>元字符</p>
<ul>
<li>字符相关
<ul>
<li><code v-pre>\w</code> ：数字、字母、下划线</li>
<li><code v-pre>\W</code> ：非（数字、字母、下划线）</li>
<li><code v-pre>\d</code> ：数字</li>
<li><code v-pre>\D</code> ：非（数字）</li>
<li><code v-pre>\s</code> ：空格</li>
<li><code v-pre>\S</code> ：非（空格）</li>
<li><code v-pre>.</code> ：非（换行\n、回车\r、\u2028(行分隔符)、\u2029（段落分隔符））</li>
</ul>
</li>
<li>数量相关
<ul>
<li><code v-pre>{}</code> ：匹配次数 e{5}：5 次，e{3,6}：3~6 次，e{3,}：3 次以上</li>
<li><code v-pre>?</code> ：{0,1}</li>
<li><code v-pre>\*</code> ：{0,}</li>
<li><code v-pre>\+</code> ：{1,}</li>
</ul>
</li>
<li>3、位置相关
<ul>
<li><code v-pre>^</code> ：开始</li>
<li><code v-pre>$</code> ：结尾</li>
<li><code v-pre>\b</code> ：边界符（非\w 的都是边界符）</li>
<li><code v-pre>\B</code> ：非（边界符）</li>
</ul>
</li>
<li>4、括号相关
<ul>
<li><code v-pre>()</code> ：分组、提取值、替换、反向引用</li>
<li><code v-pre>[]</code> ：字符集合</li>
<li><code v-pre>{}</code> ：</li>
</ul>
</li>
<li>5、匹配模式
<ul>
<li><code v-pre>g</code> ：全局匹配</li>
<li><code v-pre>i</code> ：忽略大小写</li>
<li><code v-pre>m</code> ：多行模式</li>
<li><code v-pre>s</code> ：让“.”匹配到换行</li>
<li><code v-pre>u</code> ：匹配 unicode</li>
<li><code v-pre>y</code> ：粘性模式</li>
</ul>
</li>
</ul>
</li>
</ul>
<div class="language-javascript line-numbers-mode" data-ext="js"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> str4 <span class="token operator">=</span> <span class="token string">'123456789'</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg4 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d{2,4}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// 贪婪匹配，最多的匹配</span>
<span class="token keyword">let</span> reg4_1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d{2,4}?</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// 增加?，惰性匹配，最少的匹配</span>
<span class="token keyword">let</span> res4 <span class="token operator">=</span> str4<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg4<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  ['1234', '5678']</span>
<span class="token keyword">let</span> res4_1 <span class="token operator">=</span> str4<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg4_1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  ['12', '34', '56', '78']</span>

<span class="token keyword">let</span> str5 <span class="token operator">=</span> <span class="token string">'this is a book'</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg5 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\bis\b</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// 匹配 is</span>
<span class="token keyword">let</span> res5 <span class="token operator">=</span> str5<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg5<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ["is"]</span>

<span class="token comment">// 分组</span>
<span class="token keyword">let</span> str6 <span class="token operator">=</span> <span class="token string">'abababcdef'</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg6 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(ab){3}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// 匹配 ababab</span>
reg6<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str6<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 提取值</span>
<span class="token keyword">let</span> str7 <span class="token operator">=</span> <span class="token string">'2022-10-20'</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg7 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d{4}-\d{2}-\d{2}</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg7<span class="token operator">*</span><span class="token number">1</span> <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\d{4})-(\d{2})-(\d{2})</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res7 <span class="token operator">=</span> str7<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg7<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['2022-10-20', index: 0, input: '2022-10-20', groups: undefined]</span>
<span class="token keyword">let</span> res7_1 <span class="token operator">=</span> str7<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg7_1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['2022-10-20', '2022', '10', '20', index: 0, input: '2022-10-20', groups: undefined]</span>
<span class="token keyword">let</span> year <span class="token operator">=</span> RegExp<span class="token punctuation">.</span>$1<span class="token punctuation">;</span> <span class="token comment">// "2022"</span>
<span class="token keyword">let</span> month <span class="token operator">=</span> RegExp<span class="token punctuation">.</span>$2<span class="token punctuation">;</span> <span class="token comment">// "10"</span>
<span class="token keyword">let</span> day <span class="token operator">=</span> RegExp<span class="token punctuation">.</span>$3<span class="token punctuation">;</span> <span class="token comment">// "20"</span>
<span class="token comment">// 替换</span>
<span class="token keyword">let</span> res7_2 <span class="token operator">=</span> str7<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg7_1<span class="token punctuation">,</span> <span class="token string">'$1/$2/$3'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "2022/10/20"</span>
<span class="token keyword">let</span> res7_3 <span class="token operator">=</span> str7<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg7_1<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token parameter">arg<span class="token punctuation">,</span> year<span class="token punctuation">,</span> month<span class="token punctuation">,</span> day</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>year<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>month<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>day<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "2022/10/20"</span>
<span class="token comment">// 反向引用</span>
<span class="token keyword">let</span> str8 <span class="token operator">=</span> <span class="token string">'news-container-nav'</span><span class="token punctuation">;</span> <span class="token comment">// "news_container_nav" // res8 true</span>
<span class="token comment">// let str8 = "news_container_nav"; // res8 true</span>
<span class="token comment">// let str8 = "news-container_nav"; // res8 false</span>
<span class="token keyword">let</span> reg8 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\w{4}(-|*)\w{9}(\1)\w{3}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// (\1)第一个()内的值，保证匹配一致</span>
<span class="token keyword">let</span> res8 <span class="token operator">=</span> reg8<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str8<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 字符集合</span>
<span class="token keyword">let</span> str9 <span class="token operator">=</span> <span class="token string">'My name is LiLei'</span><span class="token punctuation">;</span>
<span class="token comment">// let str9 = "My name is Lilei";</span>
<span class="token keyword">let</span> reg9 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Li[Ll]ei</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// LiLei |Lilei</span>
<span class="token keyword">let</span> reg9_1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">Li[^ll]ei</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span> <span class="token comment">// LiLei |Lilei</span>
<span class="token keyword">let</span> res9 <span class="token operator">=</span> reg9<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str9<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 多行模式</span>
<span class="token keyword">let</span> str10 <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">abc
          def
          ghi</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg10 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\b\w</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gm</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res10 <span class="token operator">=</span> str10<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg10<span class="token punctuation">,</span> <span class="token string">'*'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// '*bc\n *ef\n *hi'</span>

<span class="token comment">// 匹配模式 s 使用</span>
<span class="token keyword">let</span> str11 <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">abc
          def</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg11 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">^a.\*f$</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gs</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res11 <span class="token operator">=</span> reg11<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str11<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token comment">// unicode 匹配</span>
<span class="token keyword">let</span> str12 <span class="token operator">=</span> <span class="token string">'a'</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg12 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\u{61}</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gu</span></span><span class="token punctuation">;</span> <span class="token comment">// unicode 编码是 61 的字符</span>
<span class="token keyword">let</span> res12 <span class="token operator">=</span> reg12<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>str12<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>

<span class="token comment">// y 模式,必须是连续的</span>
<span class="token keyword">let</span> str13 <span class="token operator">=</span> <span class="token string">'123abc456'</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg13 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d</span><span class="token regex-delimiter">/</span><span class="token regex-flags">gy</span></span><span class="token punctuation">;</span>
reg13<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str13<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['1', index: 6, input: '123abc456', groups: undefined]</span>
reg13<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str13<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['2', index: 6, input: '123abc456', groups: undefined]</span>
reg13<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str13<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['3', index: 6, input: '123abc456', groups: undefined]</span>
reg13<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span>str13<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// null，非 y 模式['4', index: 6, input: '123abc456', groups: undefined]，</span>

<span class="token comment">// 命名分组</span>
<span class="token keyword">let</span> str14 <span class="token operator">=</span> <span class="token string">'2022-10-20'</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg14 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(\d{4})-(\d{2})-(\d{2})</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> reg14_1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;year>\d{4})-(?&lt;month>\d{2})-(?&lt;day>\d{2})</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res14 <span class="token operator">=</span> str14<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg14<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ['2022-10-20', '2022', '10', '20', index: 0, input: '2022-10-20', groups: undefined]</span>
<span class="token keyword">let</span> res14_1 <span class="token operator">=</span> str14<span class="token punctuation">.</span><span class="token function">match</span><span class="token punctuation">(</span>reg14_1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  ['2022-10-20', '2022', '10', '20', index: 0, input: '2022-10-20', groups: {year: '2022', month: '10', day: '20'}]</span>

<span class="token comment">// 正向零宽断言</span>
<span class="token keyword">let</span> str15 <span class="token operator">=</span> <span class="token string">'iphone7iphone8iphone9iphonenumber'</span><span class="token punctuation">;</span>
<span class="token comment">// 肯定</span>
<span class="token keyword">let</span> reg15 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">iphone(?=\d)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token comment">// 否定</span>
<span class="token keyword">let</span> reg15_1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">iphone(?!\d)</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res15 <span class="token operator">=</span> str15<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg15<span class="token punctuation">,</span> <span class="token string">'苹果'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "苹果 7 苹果 8 苹果 9iphonenumber"</span>
<span class="token keyword">let</span> res15_1 <span class="token operator">=</span> str15<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg15_1<span class="token punctuation">,</span> <span class="token string">'苹果'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "iphone7iphone8iphone9 苹果 number"</span>

<span class="token comment">// 负向零宽断言</span>
<span class="token keyword">let</span> str16 <span class="token operator">=</span> <span class="token string">'10px11px12pxipx'</span><span class="token punctuation">;</span>
<span class="token comment">// 肯定</span>
<span class="token keyword">let</span> reg16 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;=\d+)px</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token comment">// 否定</span>
<span class="token keyword">let</span> reg16_1 <span class="token operator">=</span> <span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">(?&lt;!\d+)px</span><span class="token regex-delimiter">/</span><span class="token regex-flags">g</span></span><span class="token punctuation">;</span>
<span class="token keyword">let</span> res16 <span class="token operator">=</span> str16<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg16<span class="token punctuation">,</span> <span class="token string">'像素'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "10 像素 11 像素 12 像素 ipx"</span>
<span class="token keyword">let</span> res16_1 <span class="token operator">=</span> str16<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg16_1<span class="token punctuation">,</span> <span class="token string">'像素'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// "10px11px12pxi 像素"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


