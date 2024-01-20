import{_ as n,p as a,q as s,a1 as t}from"./framework-99e72292.js";const e="/Blog/assets/rail-ed3e23dc.avif",o={},i=t('<nav class="table-of-contents"><ul><li><a href="#rail-模型">RAIL 模型</a></li><li><a href="#性能测量工具">性能测量工具</a></li><li><a href="#性能监测的-apis">性能监测的 APIS</a></li></ul></nav><h3 id="rail-模型" tabindex="-1"><a class="header-anchor" href="#rail-模型" aria-hidden="true">#</a> RAIL 模型</h3><p>RAIL 是一种以用户为中心的性能模型，它提供了一种考虑性能的结构。该模型将用户体验分解到按键操作（例如，点击、滚动、加载）中，帮助您为每个操作定义性能目标。 <img src="'+e+`" alt=""></p><ul><li>响应：在 50 毫秒内处理事件</li><li>动画：在 10 毫秒内生成一帧</li><li>空闲：最大限度增加空闲时间</li><li>加载：在 5 秒内交付内容并实现可交互</li></ul><h3 id="性能测量工具" tabindex="-1"><a class="header-anchor" href="#性能测量工具" aria-hidden="true">#</a> 性能测量工具</h3><ul><li><strong>Chrome DevTools</strong>：开发调试、性能评测</li><li><strong>Lighthouse</strong>：网站整体质量评估</li><li><strong>WebPageTest</strong>：多测试地点、全面性能报告</li></ul><h3 id="性能监测的-apis" tabindex="-1"><a class="header-anchor" href="#性能监测的-apis" aria-hidden="true">#</a> 性能监测的 APIS</h3><ul><li>window.performance.timing <ul><li>DNS 解析耗时：domainLookupEnd - domainLookupStart</li><li>TCP 连接耗时：connectEnd - connectStart</li><li>SSL 安全连接耗时：connectEnd - secureConnectionStart</li><li>网络请求耗时（TTFB）：responseStart - requestStart</li><li>DOM 解析耗时：domInteractive - responseEnd</li><li>资源加载耗时：loadEventStart - domContentLoadedEventEnd</li><li>First Byte 时间：responseStart - domainLookupStart</li><li>白屏时间：responseEnd - fetchStart</li><li>首次可交互时间（TTI）：domInteractive - fetchStart</li><li>DOM Ready 时间：domContentLoadedEventEnd - fetchStart</li><li>页面完全加载时间：loadEventStart - fetchStart</li><li>重定向次数：window.performance.navigation.redirectCount</li><li>重定向耗时：redirectEnd - redirectStart</li></ul></li><li>PerformanceObserver<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 长任务</span>
<span class="token keyword">var</span> observer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">PerformanceObserver</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">list<span class="token punctuation">,</span> obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> entries <span class="token operator">=</span> list<span class="token punctuation">.</span><span class="token function">getEntries</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> entries<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Process &quot;longtask&quot; events</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
observer<span class="token punctuation">.</span><span class="token function">observe</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token comment">// 此处多个</span>
  <span class="token literal-property property">entryTypes</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;longtask&#39;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,8),l=[i];function p(c,r){return a(),s("div",null,l)}const d=n(o,[["render",p],["__file","performance.html.vue"]]);export{d as default};