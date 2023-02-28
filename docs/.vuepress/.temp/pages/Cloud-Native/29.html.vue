<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第29节-feat-support-nvidia-docker-and-nonroot-2048" tabindex="-1"><a class="header-anchor" href="#第29节-feat-support-nvidia-docker-and-nonroot-2048" aria-hidden="true">#</a> 第29节 Feat/support nvidia docker and nonroot #2048</h1>
<div><a href = '28.md' style='float:left'>⬆️上一节🔗  </a><a href = '30.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="proposal" tabindex="-1"><a class="header-anchor" href="#proposal" aria-hidden="true">#</a> Proposal</h2>
<ul>
<li>https://github.com/sealerio/sealer/pull/2048/</li>
</ul>
<p><strong>This PR support two feature:</strong></p>
<ol>
<li>Detect nvidia gpu, if exist, should force use docker sock for kubelet</li>
<li>Support install cluster using non root sudoer.</li>
</ol>
<p><strong>Resolved Issue：</strong></p>
<ul>
<li><a href="https://github.com/sealerio/sealer/issues/2001" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/sealer/issues/2001<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/sealerio/sealer/issues/1591" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/sealer/issues/1591<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/sealerio/sealer/issues/1999" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/sealer/issues/1999<ExternalLinkIcon/></a></li>
</ul>
<h2 id="learn-github-modify-someone-else-s-pull-request-and-commit" tabindex="-1"><a class="header-anchor" href="#learn-github-modify-someone-else-s-pull-request-and-commit" aria-hidden="true">#</a> Learn  GitHub modify someone else's pull request and commit</h2>
<p>Sometimes we need to make some changes to the pull request that community developers submit to our project, such as some configuration files and resource files. In this case we can respond directly to the request to make the change, but instead we can use a simpler solution: <strong>we can directly commit to the pull request.</strong></p>
<p>I'll take this warehouse as an example~</p>
<p>As a classic example, this pr and tutorial is very helpful in regulating the development process.</p>
<p>**First, **Find the pull request branch name that needs to be modified:</p>
<ul>
<li>VinceCui:feat/support-nvidia-docker-and-nonroot</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202302181813288.png" alt="image-20230218181350175"></p>
<h3 id="add-remote-repository" tabindex="-1"><a class="header-anchor" href="#add-remote-repository" aria-hidden="true">#</a> Add remote repository</h3>
<p>**First you need to add the <code v-pre>pull request</code> author's repository locally as another remote repository: **</p>
<ul>
<li>https://github.com/VinceCui/sealer/tree/feat/support-nvidia-docker-and-nonroot</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202302181837003.png" alt="image-20230218183733938"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> remote set-url VinceCui https://ghproxy.com/https://github.com/VinceCui/sealer/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**Synchronize warehouse and update remote warehouse content: **</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> fetch VinceCui feat/support-nvidia-docker-and-nonroot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**After the synchronization is complete, we need to switch to the branch from which the other party initiated the pull request, which is the branch from which we want to commit the new commit: **</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> VinceCui VinceCui/feat/support-nvidia-docker-and-nonroot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**Submitted and modified: **</p>
<p>After switching to <code v-pre>VinceCui/feat</code> branch, the file changes can be made, and the commit process is the same as usual:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">"feat: something"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Once you've made sure the changes are complete and committed, push them to the other repository. Pay attention to the push target branch here, git may prompt inconsistent branch name, just push as prompted:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> push VinceCui HEAD:main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Once the push is complete, you should be able to see the change on the GitHub pull request page.</p>
<h2 id="pr-site-solutions" tabindex="-1"><a class="header-anchor" href="#pr-site-solutions" aria-hidden="true">#</a> PR Site Solutions</h2>
<p>关于 PR 信息：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// InfraDriver treat the entire cluster as an operating system kernel,</span>
<span class="token comment">// interface function here is the target system call.</span>
<span class="token keyword">type</span> InfraDriver <span class="token keyword">interface</span> <span class="token punctuation">{</span>
        <span class="token comment">// CmdAsync exec command on remote host, and asynchronous return logs</span>
<span class="token operator">-</span>        <span class="token function">CmdAsync</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> cmd <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token operator">+</span>        <span class="token function">CmdAsync</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> env <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> cmd <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
        <span class="token comment">// Cmd exec command on remote host, and return combined standard output and standard error</span>
<span class="token operator">-</span>        <span class="token function">Cmd</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> cmd <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token operator">+</span>        <span class="token function">Cmd</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> env <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> cmd <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
        <span class="token comment">// CmdToString exec command on remote host, and return spilt standard output and standard error</span>
<span class="token operator">-</span>        <span class="token function">CmdToString</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> cmd<span class="token punctuation">,</span> spilt <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token operator">+</span>        <span class="token function">CmdToString</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> env <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> cmd<span class="token punctuation">,</span> spilt <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="resolve" tabindex="-1"><a class="header-anchor" href="#resolve" aria-hidden="true">#</a> resolve</h4>
<p>Resolved issue: <a href="https://github.com/sealerio/sealer/issues/1491" target="_blank" rel="noopener noreferrer">#1491<ExternalLinkIcon/></a>、<a href="https://github.com/sealerio/sealer/issues/1999" target="_blank" rel="noopener noreferrer">#1999<ExternalLinkIcon/></a></p>
<p><strong>Resolved remote read permission to <code v-pre>sshd_config</code> file:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ls</span> <span class="token parameter variable">-al</span> /etc/ssh/sshd_config
-rw------- <span class="token number">1</span> root root <span class="token number">3797</span> Feb <span class="token number">15</span> <span class="token number">16</span>:35 /etc/ssh/sshd_config
$ <span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">644</span> /etc/ssh/sshd_config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="existing-problem" tabindex="-1"><a class="header-anchor" href="#existing-problem" aria-hidden="true">#</a> existing problem</h4>
<ul>
<li><strong>Still needs to assign non-secret permissions to user sudo(Every node except master0):</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># echo "sealer ALL=(ALL) NOPASSWD: NOPASSWD: ALL" >> /etc/sudoers</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>The rootless feature of <a href="https://github.com/containers/buildah" target="_blank" rel="noopener noreferrer">buildah<ExternalLinkIcon/></a> is not addressed:</strong></li>
</ul>
<h2 id="end-links" tabindex="-1"><a class="header-anchor" href="#end-links" aria-hidden="true">#</a> END Links</h2>
<ul><li><div><a href = '28.md' style='float:left'>⬆️上一节🔗  </a><a href = '30.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://nsddd.top/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


