<template><div><h3 id="免费代理软件" tabindex="-1"><a class="header-anchor" href="#免费代理软件" aria-hidden="true">#</a> 免费代理软件</h3>
<ul>
<li>windows：<a href="https://github.com/2dust/v2rayN" target="_blank" rel="noopener noreferrer">v2rayN<ExternalLinkIcon/></a></li>
<li>Mac：<a href="https://github.com/yanue/V2rayU/" target="_blank" rel="noopener noreferrer">V2rayU<ExternalLinkIcon/></a></li>
<li>Android: <a href="https://github.com/2dust/v2rayNG" target="_blank" rel="noopener noreferrer">v2rayNG<ExternalLinkIcon/></a></li>
<li><a href="https://nodefree.org/" target="_blank" rel="noopener noreferrer">免费节点<ExternalLinkIcon/></a></li>
</ul>
<h3 id="终端下设置代理" tabindex="-1"><a class="header-anchor" href="#终端下设置代理" aria-hidden="true">#</a> 终端下设置代理</h3>
<ul>
<li>临时更改代理</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token comment"># cmd命令行</span>
<span class="token builtin class-name">set</span> <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>http://127.0.0.1:10809
<span class="token builtin class-name">set</span> <span class="token assign-left variable">https_proxy</span><span class="token operator">=</span>http://127.0.0.1:10809
<span class="token comment"># 取消</span>
<span class="token builtin class-name">set</span> <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>
<span class="token builtin class-name">set</span> <span class="token assign-left variable">https_proxy</span><span class="token operator">=</span>

<span class="token comment"># PowerShell命令行</span>
<span class="token variable">$env</span>:http_proxy<span class="token operator">=</span><span class="token string">"http://127.0.0.1:10809"</span>
<span class="token variable">$env</span>:https_proxy<span class="token operator">=</span><span class="token string">"http://127.0.0.1:10809"</span>
<span class="token comment"># 取消</span>
<span class="token variable">$env</span>:http_proxy<span class="token operator">=</span><span class="token string">""</span>
<span class="token variable">$env</span>:https_proxy<span class="token operator">=</span><span class="token string">""</span>

<span class="token comment"># linux下</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>http://127.0.0.1:10809
<span class="token builtin class-name">export</span> <span class="token assign-left variable">https_proxy</span><span class="token operator">=</span>http://127.0.0.1:10809
<span class="token comment"># 取消</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">https_proxy</span><span class="token operator">=</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>永久有效，把配置放到环境变量中</p>
<ul>
<li>windows 放置到系统环境变量中，变量名分别为 <code v-pre>http_proxy</code>、<code v-pre>https_proxy</code>，值为 <code v-pre>http://127.0.0.1:10809</code></li>
<li>linux 下，写入用户的 shell profile 如果使用的是 bash，写入~/.bashrc，如果是 zsh，写入~/.zshrc 如果不确定，就直接写入~/.bashrc 后，还行 source 命令，让配置生效<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span>http://127.0.0.1:10809
<span class="token builtin class-name">export</span> <span class="token assign-left variable">https_proxy</span><span class="token operator">=</span>http://127.0.0.1:10809
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
<blockquote>
<p>⚠️ 配置中的端口号 10809 根据 v2rayN 中的配置，可能会发生变化</p>
</blockquote>
<h3 id="配置-wsl2-使用本机-v2rayn-代理" tabindex="-1"><a class="header-anchor" href="#配置-wsl2-使用本机-v2rayn-代理" aria-hidden="true">#</a> 配置 WSL2 使用本机 V2rayN 代理</h3>
<ol>
<li>打开 v2rayN 的配置</li>
</ol>
<ul>
<li>勾选允许来自局域网的连接，</li>
<li>勾选开启 Mux 多路复用</li>
<li>记住局域网端口号
<img src="@source/other/images/v2rayN.png" alt="v2rayN"></li>
</ul>
<ol start="2">
<li>
<p>Windows 去访问 WSL2 可以直接通过 localhost 访问的，但是 WSL2 去访问 windows 就不能再用 localhost 了，而 WSL2 在 windows 中是被单独的分配了一个 IP。 想查 windows 当中 WSL2 的 IP，只需要通过下方这条命令来获取 WSL2 的地址即可。在 WSL2 中敲入下面命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /etc/resolv.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>得到如下图所示结果：</p>
<p><img src="@source/other/images/resolv_conf.png" alt="命令行结果"></p>
</li>
<li>
<p>每次启动 WSL2 会重新分配 IP，需要写到环境变量<code v-pre>~/.bashrc</code>中新增如下命令</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">windows_host</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">cat</span> /etc/resolv.conf<span class="token operator">|</span><span class="token function">grep</span> nameserver<span class="token operator">|</span><span class="token function">awk</span> <span class="token string">'{print $2}'</span><span class="token variable">`</span></span>
<span class="token comment"># 此处的端口号就是第一步中的局域网http端口号</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ALL_PROXY</span><span class="token operator">=</span>http://<span class="token variable">$windows_host</span>:10809
<span class="token builtin class-name">export</span> <span class="token assign-left variable">HTTP_PROXY</span><span class="token operator">=</span><span class="token variable">$ALL_PROXY</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">http_proxy</span><span class="token operator">=</span><span class="token variable">$ALL_PROXY</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">HTTPS_PROXY</span><span class="token operator">=</span><span class="token variable">$ALL_PROXY</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">https_proxy</span><span class="token operator">=</span><span class="token variable">$ALL_PROXY</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>执行<code v-pre>source ~/.bashrc</code>让配置立马生效</p>
</li>
<li>
<p>执行<code v-pre>curl -vv www.google.com</code>看下代理是否生效</p>
<blockquote>
<p>⚠️没有开启 v2rayN 时候需要关闭代理才能正常访问网络</p>
</blockquote>
</li>
</ol>
</div></template>


