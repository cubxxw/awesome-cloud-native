<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第27节-unshare-和-newuidmap" tabindex="-1"><a class="header-anchor" href="#第27节-unshare-和-newuidmap" aria-hidden="true">#</a> 第27节 unshare 和 newuidmap</h1>
<div><a href = '26.md' style='float:left'>⬆️上一节🔗  </a><a href = '28.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="对比" tabindex="-1"><a class="header-anchor" href="#对比" aria-hidden="true">#</a> 对比</h2>
<p>unshare 和 newuidmap 是 Linux 的系统调用，它们主要用于实现命名空间隔离。</p>
<ul>
<li>
<p><code v-pre>unshare</code>: unshare 允许进程在运行时创建和隔离新的命名空间。例如，可以使用 unshare 创建一个新的 PID 命名空间，从而使一个进程在新的命名空间中运行，并且与原来的命名空间隔离。</p>
</li>
<li>
<p><code v-pre>newuidmap</code>: newuidmap 工具用于在容器中控制用户 ID 映射，这是实现容器的必要步骤。在容器中，需要在主机和容器间进行用户 ID 的映射，以便使容器中的进程具有访问文件系统的权限。</p>
</li>
</ul>
<p>总体来说，unshare 可以创建命名空间隔离，而 newuidmap 则用于实现容器隔离中的用户 ID 映射。</p>
<blockquote>
<p><strong>实现 sealer 对 buildah 得调用，sealer 在 root less 模式下的正常挂载；buildah是如何启动rootless容器的。</strong></p>
</blockquote>
<h2 id="about-newuidmap" tabindex="-1"><a class="header-anchor" href="#about-newuidmap" aria-hidden="true">#</a> about newuidmap</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> newuidmap - 设置用户命名空间的 uid 映射
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="about-unshare" tabindex="-1"><a class="header-anchor" href="#about-unshare" aria-hidden="true">#</a> about unshare</h2>
<p><strong>create a new PID:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>unshare <span class="token parameter variable">-U</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="runuseer" tabindex="-1"><a class="header-anchor" href="#runuseer" aria-hidden="true">#</a> runuseer</h2>
<p><strong>runuser - 使用替代用户和组 ID 运行命令</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> runuser <span class="token punctuation">[</span>选项<span class="token punctuation">]</span> -u用户<span class="token punctuation">[</span><span class="token punctuation">[</span>--<span class="token punctuation">]</span>命令<span class="token punctuation">[</span>参数<span class="token punctuation">..</span>.<span class="token punctuation">]</span><span class="token punctuation">]</span>
 runuser <span class="token punctuation">[</span>选项<span class="token punctuation">]</span> <span class="token punctuation">[</span> - <span class="token punctuation">]</span> <span class="token punctuation">[</span>用户<span class="token punctuation">[</span>参数<span class="token punctuation">..</span>.<span class="token punctuation">]</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>命令<em>runuser</em>更改运行命令的用户。<em>runuser</em>类似于<a href="https://www.baeldung.com/linux/run-as-another-user#using-su" target="_blank" rel="noopener noreferrer"><em>su</em>命令<ExternalLinkIcon/></a>，但略有不同。</p>
<p>只有<em>root</em>用户可以调用<em>runuser</em>。因此，它不会提示输入密码。这种行为非常适合脚本编写，在本文的后面部分，我们将研究如何将它与<a href="https://man7.org/linux/man-pages/man8/sudo.8.html" target="_blank" rel="noopener noreferrer"><em>sudo</em><ExternalLinkIcon/></a>一起使用，以便为非特权用户提供对特定命令的访问权限。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>sealer@iZuf68xky083mr0yy6q37lZ ~<span class="token punctuation">]</span>$ runuser 
runuser: may not be used by non-root <span class="token function">users</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="权限管理" tabindex="-1"><a class="header-anchor" href="#权限管理" aria-hidden="true">#</a> 权限管理</h3>
<p>将 <em>runuser</em>与 <a href="https://www.baeldung.com/linux/sudo-privileges-user" target="_blank" rel="noopener noreferrer"><em>sudo</em><ExternalLinkIcon/></a>结合可以提供对用户权限的更精细控制。</p>
<p>接下来，让<em>baeldung</em>以<em>root</em>身份运行脚本。我们将使用<em>sudo</em>，但我们也<a href="https://www.baeldung.com/linux/run-as-another-user" target="_blank" rel="noopener noreferrer">可以使用<em>su</em><ExternalLinkIcon/></a>。让我们通过使用<a href="https://www.baeldung.com/linux/sudo-privileges-user#giving-limited-sudo-access-to-a-user" target="_blank" rel="noopener noreferrer"><em>visudo</em>命令<ExternalLinkIcon/></a>将此行添加到<em>sudoers</em>文件来添加权限：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>baeldung <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> NOPASSWD: /home/baeldung/script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="关于-rootless-的配置问题" tabindex="-1"><a class="header-anchor" href="#关于-rootless-的配置问题" aria-hidden="true">#</a> 关于 rootless 的配置问题</h3>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '26.md' style='float:left'>⬆️上一节🔗  </a><a href = '28.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


