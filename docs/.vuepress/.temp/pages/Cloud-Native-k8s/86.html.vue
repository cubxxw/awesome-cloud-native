<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第86节-openim-部署指南" tabindex="-1"><a class="header-anchor" href="#第86节-openim-部署指南" aria-hidden="true">#</a> 第86节 OpenIM 部署指南</h1>
<div><a href = '85.md' style='float:left'>⬆️上一节🔗  </a><a href = '87.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="部署的文档" tabindex="-1"><a class="header-anchor" href="#部署的文档" aria-hidden="true">#</a> 部署的文档</h2>
<p>可以选择多种方式部署：</p>
<ul>
<li><strong><a href="https://docs.openim.io/guides/gettingStarted/imSourceCodeDeployment" target="_blank" rel="noopener noreferrer">Source Code Deployment Guide<ExternalLinkIcon/></a></strong></li>
<li><strong><a href="https://github.com/openimsdk/open-im-server/blob/main/docs/contrib/install-openim-linux-system.md" target="_blank" rel="noopener noreferrer">Production deployment of Linux systems<ExternalLinkIcon/></a></strong></li>
<li><strong><a href="https://docs.openim.io/guides/gettingStarted/dockerCompose" target="_blank" rel="noopener noreferrer">Docker Deployment Guide<ExternalLinkIcon/></a></strong></li>
<li><strong><a href="https://github.com/openimsdk/open-im-server/tree/main/deployments" target="_blank" rel="noopener noreferrer">Kubernetes Deployment Guide<ExternalLinkIcon/></a></strong></li>
</ul>
<p>源码部署中，<strong><a href="https://docs.openim.io/guides/gettingStarted/imSourceCodeDeployment" target="_blank" rel="noopener noreferrer">Source Code Deployment Guide<ExternalLinkIcon/></a></strong> 部署 和 <strong><a href="https://github.com/openimsdk/open-im-server/blob/main/docs/contrib/install-openim-linux-system.md" target="_blank" rel="noopener noreferrer">Production deployment of Linux systems<ExternalLinkIcon/></a></strong> 选择一个部署即可。</p>
<p>首先要判断是否已经有对应的 OpenIM 已经启动过：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> openim
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这些部署都是有视频介绍了，如果要杀死所有关于 openim 进程，使用：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ps</span> aux <span class="token operator">|</span> <span class="token function">grep</span> openim <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $2}'</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">kill</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，如果是 system 部署，需要使用脚本卸载所有的  system：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>./scripts/install/install.sh <span class="token parameter variable">-u</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '85.md' style='float:left'>⬆️上一节🔗  </a><a href = '87.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


