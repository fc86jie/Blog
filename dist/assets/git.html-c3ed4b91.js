import{_ as a,p as n,q as s,a1 as e}from"./framework-96b046e1.js";const i={},r=e(`<nav class="table-of-contents"><ul><li><a href="#删除文件及历史记">删除文件及历史记</a></li></ul></nav><h3 id="删除文件及历史记" tabindex="-1"><a class="header-anchor" href="#删除文件及历史记" aria-hidden="true">#</a> 删除文件及历史记</h3><p><code>filter-branch</code>：修改历史提交记录，把不需要的文件永久从历史记录中删除</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
<span class="token comment"># 在根目录执行以下命令</span>
<span class="token function">git</span> filter-branch <span class="token parameter variable">-f</span> --prune-empty --index-filter <span class="token string">&#39;git rm -rf --cached --ignore-unmatch 文件名&#39;</span> --tag-name-filter <span class="token function">cat</span> -- <span class="token parameter variable">--all</span>

<span class="token comment"># 推送我们修改后的repo</span>
<span class="token function">git</span> push origin main <span class="token parameter variable">--force</span> <span class="token parameter variable">--all</span>

<span class="token comment"># 清理和回收空间</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> .git/refs/original/
<span class="token function">git</span> reflog expire <span class="token parameter variable">--expire</span><span class="token operator">=</span>now <span class="token parameter variable">--all</span>
<span class="token function">git</span> gc <span class="token parameter variable">--prune</span><span class="token operator">=</span>now
<span class="token function">git</span> gc <span class="token parameter variable">--aggressive</span> <span class="token parameter variable">--prune</span><span class="token operator">=</span>now

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4),l=[r];function t(c,p){return n(),s("div",null,l)}const d=a(i,[["render",t],["__file","git.html.vue"]]);export{d as default};
