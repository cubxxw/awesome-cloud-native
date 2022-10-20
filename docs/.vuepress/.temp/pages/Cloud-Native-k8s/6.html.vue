<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第6节-sealos" tabindex="-1"><a class="header-anchor" href="#第6节-sealos" aria-hidden="true">#</a> 第6节 sealos</h1>
<div><a href = '5.md' style='float:left'>⬆️上一节🔗  </a><a href = '7.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#开始">开始</router-link><ul><li><router-link to="#什么是sealos">什么是sealos?</router-link></li></ul></li><li><router-link to="#sealos-特性与优势">Sealos 特性与优势</router-link></li><li><router-link to="#选择rancher还是sealos">选择rancher还是sealos</router-link><ul><li><router-link to="#为什么不用-keepalived-和-haproxy-实现集群高可用">为什么不用 KeepAlived 和 HAProxy 实现集群高可用</router-link></li></ul></li><li><router-link to="#使用-sealos-快速构建-kubernetes">使用 sealos 快速构建 kubernetes</router-link><ul><li><router-link to="#构建项目">构建项目</router-link></li></ul></li><li><router-link to="#核心服务快速启动">核心服务快速启动</router-link><ul><li><router-link to="#环境准备">环境准备</router-link></li><li><router-link to="#查看内核版本">查看内核版本</router-link></li></ul></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<h3 id="什么是sealos" tabindex="-1"><a class="header-anchor" href="#什么是sealos" aria-hidden="true">#</a> 什么是sealos?</h3>
<blockquote>
<p>💡 标准自己以k8s为内核的操作系统。</p>
</blockquote>
<p>sealos是一个Go语言开发的简单干净且KUbernetes集群部署工具。</p>
<p>sealos是能够很好的支持，在生产环境中部署高可用的kubernetes集群。</p>
<h2 id="sealos-特性与优势" tabindex="-1"><a class="header-anchor" href="#sealos-特性与优势" aria-hidden="true">#</a> Sealos 特性与优势</h2>
<ol>
<li>支持离线安装，工具与部署资源包分离，方便不同版本间快速升级。</li>
<li>100年证书。</li>
<li>工具使用非常简单。</li>
<li>支持使用自定义配置文件，可灵活完成集群环境定制。</li>
<li>使用内核进行本地负载，稳定性极高，故障排查也极其简单。</li>
<li>最主要的优势是不需要翻墙出去</li>
</ol>
<h2 id="选择rancher还是sealos" tabindex="-1"><a class="header-anchor" href="#选择rancher还是sealos" aria-hidden="true">#</a> 选择rancher还是sealos</h2>
<ul>
<li>[x] <a href="https://www.rancher.cn/" target="_blank" rel="noopener noreferrer">rancher<ExternalLinkIcon/></a></li>
<li>[x] <a href="https://github.com/rancher/rancher" target="_blank" rel="noopener noreferrer">GitHub项目地址<ExternalLinkIcon/></a></li>
</ul>
<blockquote>
<p>同样的还有 <a href="https://kubesphere.com.cn/docs/v3.3/installing-on-linux/introduction/kubekey/" target="_blank" rel="noopener noreferrer">kubekey<ExternalLinkIcon/></a> ，sealos是二次优化</p>
</blockquote>
<p><a href="https://github.com/kubesphere/kubekey" target="_blank" rel="noopener noreferrer">KubeKey<ExternalLinkIcon/></a>（由 Go 语言开发）是一种全新的安装工具，替代了以前使用的基于 ansible 的安装程序。KubeKey 为您提供灵活的安装选择，您可以仅安装 Kubernetes，也可以同时安装 Kubernetes 和 KubeSphere。</p>
<h3 id="为什么不用-keepalived-和-haproxy-实现集群高可用" tabindex="-1"><a class="header-anchor" href="#为什么不用-keepalived-和-haproxy-实现集群高可用" aria-hidden="true">#</a> 为什么不用 KeepAlived 和 HAProxy 实现集群高可用</h3>
<p>无论是通过 KeepAlived 还是 HAProxy 进行高可用集群调度都会存在以下一些劣势。</p>
<ol>
<li>软件源不一致可能导致容器中安装的软件版本也不一致，进而会引起相应检查脚本不生效等故障。</li>
<li>可能因为系统依赖库问题，在某些特定环境下就直接无法完成安装。</li>
<li>只依靠检测 HAProxy 进程是否存活是无法保证集群高可用的，正确的检测方式应该是判断ApiServer 是否 healthz 状态。</li>
<li>Keepalived 可能存在 Cpu 占满的情况。</li>
</ol>
<h2 id="使用-sealos-快速构建-kubernetes" tabindex="-1"><a class="header-anchor" href="#使用-sealos-快速构建-kubernetes" aria-hidden="true">#</a> 使用 sealos 快速构建 kubernetes</h2>
<ul>
<li>[x] <a href="https://github.com/labring/sealos#quickstart" target="_blank" rel="noopener noreferrer">快速搭建指南<ExternalLinkIcon/></a></li>
</ul>
<p>sealos现在只支持linux，需要linux服务器来测试。</p>
<p>一些工具可以非常方便地帮助您启动虚拟机，例如<a href="https://multipass.run/" target="_blank" rel="noopener noreferrer">multipass<ExternalLinkIcon/></a></p>
<h3 id="构建项目" tabindex="-1"><a class="header-anchor" href="#构建项目" aria-hidden="true">#</a> 构建项目</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /sealos <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /sealos <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> clone https://github.com/labring/sealos <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> sealos <span class="token operator">&amp;&amp;</span> <span class="token function">ls</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> build  <span class="token comment"># 大概可能因为网络原因需要等一段时间~</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您可以将 <code v-pre>bin</code> 文件 <code v-pre>scp</code> 到您的 <code v-pre>linux</code> 主机。</p>
<p>如果你使用 <code v-pre>multipaas</code>，你可以将 <code v-pre>bin</code> 目录挂载到 <code v-pre>vm</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>multipass <span class="token function">mount</span> /your-bin-dir <span class="token operator">&lt;</span>name<span class="token operator">></span><span class="token punctuation">[</span>:<span class="token operator">&lt;</span>path<span class="token operator">></span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在本地测试。</p>
<blockquote>
<p><strong>⚠️ 注意：</strong></p>
<p>所有二进制文件都<code v-pre>sealos</code>可以在任何地方构建，因为它们有<code v-pre>CGO_ENABLED=0</code>. 但是，在运行一些依赖于 CGO 的<code v-pre>sealos</code>子命令时，需要支持覆盖驱动程序。<code v-pre>images</code>因此，在构建时会打开 CGO <code v-pre>sealos</code>，从而无法<code v-pre>sealos</code>在 Linux 以外的平台上构建二进制文件。</p>
<ul>
<li>本项目中的 <code v-pre>Makefile</code> 和 <code v-pre>GoReleaser</code> 都有这个设置。</li>
</ul>
</blockquote>
<hr>
<p>😂 让我很喜欢的一点是：<code v-pre>sealos</code>能一次性把环境搭建好，想当年，我真是废了九牛二虎之力才搭建~失败的。</p>
<p><img src="http://sm.nsddd.top/smimage-20221019194939030.png" alt="image-20221019194939030"></p>
<h2 id="核心服务快速启动" tabindex="-1"><a class="header-anchor" href="#核心服务快速启动" aria-hidden="true">#</a> 核心服务快速启动</h2>
<p><strong>💡 重新把昨天集群全部删除，新开三台服务器，纯新~</strong></p>
<p><img src="https://sm.nsddd.top/smimage-20221020103019907.png" alt="image-20221020103019907"></p>
<h3 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h3>
<blockquote>
<p>⚠️ 注意：环境一定很重要，不然都跑不起来~</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>hostnamectl set-hostname k8s-master01
hostnamectl set-hostname k8s-master02
hostnamectl set-hostname k8s-master03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>虚拟机需要配置静态IP</strong></p>
</blockquote>
<h3 id="查看内核版本" tabindex="-1"><a class="header-anchor" href="#查看内核版本" aria-hidden="true">#</a> 查看内核版本</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下载并安装 sealos, sealos 是个 golang 的二进制工具，直接下载拷贝到 bin 目录即可, release 页面也可下载 </span>
yum <span class="token function">install</span> <span class="token function">wget</span> <span class="token operator">&amp;&amp;</span> yum <span class="token function">install</span> <span class="token function">tar</span> <span class="token operator">&amp;&amp;</span><span class="token punctuation">\</span>
<span class="token function">wget</span>  https://github.com/labring/sealos/releases/download/v4.1.3/sealos_4.1.3_linux_amd64.tar.gz  <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> sealos_4.1.3_linux_amd64.tar.gz sealos <span class="token operator">&amp;&amp;</span>  <span class="token function">chmod</span> +x sealos <span class="token operator">&amp;&amp;</span> <span class="token function">mv</span> sealos /usr/bin 
<span class="token comment"># 创建一个集群</span>
sealos run labring/kubernetes:v1.25.0 labring/helm:v3.8.2 labring/calico:v3.24.1 <span class="token punctuation">\</span>
     <span class="token parameter variable">--masters</span> <span class="token number">192.168</span>.0.2,192.168.0.3<span class="token punctuation">\</span>
     <span class="token parameter variable">--nodes</span> <span class="token number">192.168</span>.0.4 <span class="token parameter variable">-p</span> <span class="token punctuation">[</span>your-ssh-passwd<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>-p</code>：passwd密码</p>
<p>开启ssh免密不需要些密码了，在这里就实现了。</p>
<p><img src="https://sm.nsddd.top/smimage-20221020111912006.png" alt="image-20221020111912006"></p>
</blockquote>
<p><img src="https://sm.nsddd.top/smimage-20221020105230320.png" alt="image-20221020105230320"></p>
<p><strong>验证集群：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://sm.nsddd.top/smimage-20221020113615770.png" alt="image-20221020113615770"></p>
<p><strong>查看版本：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># sealos version</span>
<span class="token punctuation">{</span><span class="token string">"gitVersion"</span><span class="token builtin class-name">:</span><span class="token string">"4.1.3"</span>,<span class="token string">"gitCommit"</span><span class="token builtin class-name">:</span><span class="token string">"b2ba9705"</span>,<span class="token string">"buildDate"</span><span class="token builtin class-name">:</span><span class="token string">"2022-09-06T06:04:14Z"</span>,<span class="token string">"goVersion"</span><span class="token builtin class-name">:</span><span class="token string">"go1.19"</span>,<span class="token string">"compiler"</span><span class="token builtin class-name">:</span><span class="token string">"gc"</span>,<span class="token string">"platform"</span><span class="token builtin class-name">:</span><span class="token string">"linux/amd64"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用 docker 作为 runtime：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealos run labring/kubernetes-docker:v1.20.5-4.1.3 labring/calico:v3.24.1 <span class="token punctuation">\</span>
     <span class="token parameter variable">--masters</span> <span class="token number">192.168</span>.64.2,192.168.64.22,192.168.64.20 <span class="token punctuation">\</span>
     <span class="token parameter variable">--nodes</span> <span class="token number">192.168</span>.64.21,192.168.64.19 <span class="token parameter variable">-p</span> <span class="token punctuation">[</span>your-ssh-passwd<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>已支持的 kubernetes 版本列表: <a href="https://hub.docker.com/r/labring/kubernetes/tags" target="_blank" rel="noopener noreferrer">kuberentes 使用 containerd 运行时<ExternalLinkIcon/></a> <a href="https://hub.docker.com/r/labring/kubernetes-docker/tags" target="_blank" rel="noopener noreferrer">kubernetes 使用 cri-docker<ExternalLinkIcon/></a></li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '5.md' style='float:left'>⬆️上一节🔗  </a><a href = '7.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


