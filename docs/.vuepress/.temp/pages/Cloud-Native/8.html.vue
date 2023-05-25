<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第8节-microk8s" tabindex="-1"><a class="header-anchor" href="#第8节-microk8s" aria-hidden="true">#</a> 第8节 MicroK8s</h1>
<div><a href = '7.md' style='float:left'>⬆️上一节🔗  </a><a href = '9.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p><strong>MicroK8s</strong>是一个低操作、最小生产的 Kubernetes。</p>
<p>MicroK8s 是一个开源系统，用于自动部署、扩展和管理容器化应用程序。它提供核心 Kubernetes 组件的功能，占用空间小，可从单个节点扩展到高可用性生产集群。</p>
<p>通过减少运行 Kubernetes 所需的资源承诺，MicroK8s 使将 Kubernetes 带入新环境成为可能，例如：</p>
<ul>
<li>将 Kubernetes 变成轻量级开发工具</li>
<li>使 Kubernetes 可用于最小环境，例如 GitHub CI</li>
<li>使 Kubernetes 适应小型设备 IoT 应用程序</li>
</ul>
<p>开发人员使用 MicroK8s 作为新想法的廉价试验场。在生产中，ISV 受益于更低的开销和资源需求以及更短的开发周期，使他们能够比以往更快地交付设备。</p>
<div class="custom-container tip"><p class="custom-container-title">非常适合</p>
<ul>
<li>开发人员工作站</li>
<li>物联网</li>
<li>边缘</li>
<li>集成/光盘</li>
</ul>
</div>
<h2 id="insatll" tabindex="-1"><a class="header-anchor" href="#insatll" aria-hidden="true">#</a> insatll</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>希望你MicroK8s 运行内存低至 540MB，但为了适应工作负载，我们建议使用至少 20G 磁盘空间和 4G 内存的系统。</p>
<p>希望你使用 Ubuntu 新的发行版或者是选择 带有 <code v-pre>snap</code> 的机器</p>
</div>
<p><strong>安装 MicroK8s</strong></p>
<p>MicroK8s 将安装一个最小的、轻量级的 Kubernetes，您可以在几乎任何机器上运行和使用。它可以快速安装：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> snap <span class="token function">install</span> microk8s <span class="token parameter variable">--classic</span> <span class="token parameter variable">--channel</span><span class="token operator">=</span><span class="token number">1.25</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>加入群组：</strong></p>
<p>MicroK8s 创建了一个组来无缝使用需要管理员权限的命令。要将当前用户添加到组并获得对 .kube 缓存目录的访问权限，请运行以下两个命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-a</span> <span class="token parameter variable">-G</span> microk8s <span class="token environment constant">$USER</span>
<span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-f</span> <span class="token parameter variable">-R</span> <span class="token environment constant">$USER</span> ~/.kube
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>您还需要重新进入会话才能进行组更新：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">su</span> - <span class="token environment constant">$USER</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '7.md' style='float:left'>⬆️上一节🔗  </a><a href = '9.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


