import{_ as s,c as a,o as i,a4 as e}from"./chunks/framework.BRQpjTab.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"tools/vscode.md","filePath":"tools/vscode.md","lastUpdated":1676352846000}'),n={name:"tools/vscode.md"},t=e(`<nav class="table-of-contents"><ul><li><a href="#在-vscode-为配置文件增加语法提示">在 vscode 为配置文件增加语法提示</a></li></ul></nav><h3 id="在-vscode-为配置文件增加语法提示" tabindex="-1">在 vscode 为配置文件增加语法提示 <a class="header-anchor" href="#在-vscode-为配置文件增加语法提示" aria-label="Permalink to &quot;在 vscode 为配置文件增加语法提示&quot;">​</a></h3><ul><li>webpack.config.js</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/**</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * 增加下面一行就能导出webpack文件的语法提示</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> * </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {import(&#39;webpack&#39;).Configuration)}</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">module</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">exports</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><ul><li>vite.config.js</li></ul><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/** </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@type</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> {import(&#39;vite&#39;).UserConfig}</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> */</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {};</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>`,6),l=[t];function p(r,h,d,c,o,k){return i(),a("div",null,l)}const b=s(n,[["render",p]]);export{g as __pageData,b as default};
