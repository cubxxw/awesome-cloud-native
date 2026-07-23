<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第28节-sudo-rootless" tabindex="-1"><a class="header-anchor" href="#第28节-sudo-rootless" aria-hidden="true">#</a> 第28节 sudo rootless</h1>
<div><a href = '27.md' style='float:left'>⬆️上一节🔗  </a><a href = '29.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="comment" tabindex="-1"><a class="header-anchor" href="#comment" aria-hidden="true">#</a> comment</h2>
<ul>
<li>https://github.com/cubxxw/sealer/blob/929ea57233cb1d7dac0564acc3846f2a85fe057d/utils/ssh/connect.go#L195</li>
</ul>
<p><strong>每一台主机：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>echo "sealer ALL=(ALL) NOPASSWD: NOPASSWD: ALL" >> /etc/sudoers.d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>提权：(0600)</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ot@iZuf6h8zz5ck48kisvztrrZ ~<span class="token punctuation">]</span><span class="token comment"># ls -al /etc/ssh/sshd_config</span>
-rw------- <span class="token number">1</span> root root <span class="token number">3797</span> Feb <span class="token number">14</span> <span class="token number">17</span>:10 /etc/ssh/sshd_config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre># override default of no subsystems Subsystem sftp  /usr/libexec/openssh/sftp-server</code></p>
<p><strong>给与权限(node)：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">chmod</span> <span class="token number">644</span> /etc/ssh/sshd_config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>run：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> sealer run docker.io/sealerio/kubernetes:v1.22.15 <span class="token parameter variable">--masters</span> <span class="token number">10.0</span>.0.245 <span class="token parameter variable">--nodes</span> <span class="token number">10.0</span>.0.246 <span class="token parameter variable">--nodes</span> <span class="token number">10.0</span>.0.247 <span class="token parameter variable">--user</span> sealer  <span class="token parameter variable">--passwd</span>  <span class="token number">1234</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '27.md' style='float:left'>⬆️上一节🔗  </a><a href = '29.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


