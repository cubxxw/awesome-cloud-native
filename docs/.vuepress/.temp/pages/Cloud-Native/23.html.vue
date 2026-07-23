<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第23节-docker-rootless" tabindex="-1"><a class="header-anchor" href="#第23节-docker-rootless" aria-hidden="true">#</a> 第23节 docker rootless</h1>
<div><a href = '22.md' style='float:left'>⬆️上一节🔗  </a><a href = '24.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="docker-rootless" tabindex="-1"><a class="header-anchor" href="#docker-rootless" aria-hidden="true">#</a> docker rootless</h2>
<p>Docker 能够将 <code v-pre>/run/docker.socket</code> 的组所有权更改为具有 660 的组权限， <code v-pre>group</code> 所有权为 docker 组。这将允许添加到 docker 组的用户能够运行 docker 容器，而无需执行 <code v-pre>sudo</code> 或 <code v-pre>su</code> 成为 root。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> <span class="token parameter variable">-l</span> /var/run/docker.sock 
srw-rw----. <span class="token number">1</span> root <span class="token function">docker</span> <span class="token number">0</span> Aug  <span class="token number">3</span> <span class="token number">13</span>:02 /var/run/docker.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>但是很多人更喜欢这样设置它：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> <span class="token parameter variable">-l</span> /var/run/docker.sock 
srw-rw----. <span class="token number">1</span> root root <span class="token number">0</span> Aug  <span class="token number">3</span> <span class="token number">13</span>:02 /var/run/docker.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果用户可以与 <code v-pre>docker</code> 套接字通信，他们可以执行以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-ti</span> <span class="token parameter variable">--privileged</span> <span class="token parameter variable">-v</span> /:/host fedora <span class="token function">chroot</span> /host
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '22.md' style='float:left'>⬆️上一节🔗  </a><a href = '24.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://cubxxw.com/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


