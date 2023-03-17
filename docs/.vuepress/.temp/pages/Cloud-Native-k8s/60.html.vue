<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第60节-生产化集群的管理" tabindex="-1"><a class="header-anchor" href="#第60节-生产化集群的管理" aria-hidden="true">#</a> 第60节 生产化集群的管理</h1>
<div><a href = '59.md' style='float:left'>⬆️上一节🔗  </a><a href = '61.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p>包括以下几个部分：</p>
<ul>
<li>计算节点相关</li>
<li>操作系统选择</li>
<li>节点资源管理</li>
<li>节点异常检测</li>
<li>常用节点问题排查手段</li>
<li>基于 extended resource 扩展节点资源</li>
<li>构建和管理高可用集群</li>
<li>Cluster Autoscaler</li>
<li>集群管理实践案例分享</li>
<li>多租户集群管理</li>
</ul>
<h2 id="计算节点相关" tabindex="-1"><a class="header-anchor" href="#计算节点相关" aria-hidden="true">#</a> 计算节点相关</h2>
<p><strong>计算节点:</strong></p>
<ul>
<li>如何批量安装和升级计算节点的操作系统?</li>
<li>如何管理配置计算节点的网络信息?</li>
<li>如何管理不同 SKU ( Stock Keeping Unit)的计算节点?</li>
<li>如何快速下架故障的计算节点?</li>
<li>如何快速扩缩集群的规模?</li>
</ul>
<p><strong>控制平面:</strong></p>
<ul>
<li>如何在主节点上下载、安装和升级控制平面组件及其所需的配置文件?</li>
<li>如何确保集群所需的其他插件，例如 CoreDNS、监控系统等部署完成?</li>
<li>如何准备控制平面组件的各种安全证书?</li>
<li>如何快速升级或回滚控制平面组件的版本?</li>
</ul>
<p><strong>SKU📜 对上面的解释：</strong></p>
<blockquote>
<p>SKU (Stock Keeping Unit) 是一个常见的概念，用于表示不同配置的 Kubernetes 节点。每个 SKU 都包含了不同的硬件配置和软件配置，例如 CPU、内存、存储、操作系统、Kubernetes 版本等等。不同的 SKU 适用于不同的场景和应用程序，可以根据需要选择合适的 SKU 进行部署。对于大规模的 Kubernetes 集群，通常需要同时部署多个 SKU，以便满足不同应用程序的需求和要求。</p>
</blockquote>
<h2 id="操作系统的选择" tabindex="-1"><a class="header-anchor" href="#操作系统的选择" aria-hidden="true">#</a> 操作系统的选择</h2>
<p><strong>通用操作系统</strong></p>
<ul>
<li>Ubuntu</li>
<li>CentOS</li>
<li>Fedora</li>
</ul>
<p><strong>专为容器优化的操作系统</strong></p>
<blockquote>
<p>容器化技术出现之后，就有一些专门面对容器化的操作系统 ~</p>
</blockquote>
<p>最小化操作系统</p>
<ul>
<li>CoreOS</li>
<li>RedHat Atomic</li>
<li>Snappy Ubuntu Core</li>
<li>RancherOS</li>
</ul>
<p>我们再在筛选操作系统的时候该怎么选择，这是一个问题 ~</p>
<p><strong>操作系统评估和选型的标准</strong></p>
<ul>
<li>是否有生态系统</li>
<li>成熟度</li>
<li>内核版本</li>
<li>对运行时的支持</li>
<li>Init System</li>
<li>包管理和系统升级</li>
<li>安全</li>
</ul>
<p><strong>容器优化操作系统的优势</strong></p>
<ul>
<li>小</li>
<li>原子级升级和回退</li>
<li>更高的安全性</li>
</ul>
<table>
<thead>
<tr>
<th>操作系统</th>
<th>CentOS</th>
<th>Ubuntu</th>
<th>CoreOS</th>
<th>Atomic*</th>
<th>Snappy</th>
<th>RancherOS</th>
</tr>
</thead>
<tbody>
<tr>
<td>分类</td>
<td>通用操作系统</td>
<td>通用操作系统</td>
<td>容器优化</td>
<td>容器优化</td>
<td>容器优化</td>
<td>容器优化</td>
</tr>
<tr>
<td>生态系统和成熟度</td>
<td>成熟</td>
<td>成熟</td>
<td>最早的容器优化操作系统，不过公司体量小，目前已被收购。</td>
<td>RedHat 出品，品质保证</td>
<td>Canonical出品,最初为移动设备设计</td>
<td>相对较新,RancherOS中运行的所有服务都是docker容器。</td>
</tr>
</tbody>
</table>
<p>CoreOS 相当于是一个操作系统，而 CentOS 则是一种基于 RPM 包管理的 Linux 发行版。CoreOS 采用了容器化的方式来部署应用程序和服务，并且支持自动化部署、升级和管理。由于 CoreOS 可以通过 Docker 镜像来部署应用程序和服务，因此它非常适合作为云原生应用程序的基础平台。与此相比，CentOS 则是一种传统的操作系统，需要通过 RPM 包来安装和管理应用程序和服务。在云原生应用程序的场景下，使用 CoreOS 可以更加方便、灵活和高效地部署和管理应用程序和服务。</p>
<h3 id="云原生的原则" tabindex="-1"><a class="header-anchor" href="#云原生的原则" aria-hidden="true">#</a> 云原生的原则</h3>
<blockquote>
<p>云原生语境下追求的是不可变基础设施。所谓不可变基础设施，即指所有的基础设施组件都是不可修改的，任何对基础设施的更改都要通过创建新的组件来实现。</p>
</blockquote>
<p><strong>可变基础设施的风险</strong></p>
<ul>
<li>在灾难发生的时候，难以重新构建服务。持续过多的手工操作，缺乏记录，会导致很难由标准初始化后的服务器来重新构建起等效的服务。</li>
<li>在服务运行过程中，持续的修改服务器，就犹如程序中的可变变量的值发生变化而引入的状态不一致的并发风险。这些对于服务器的修改，同样会引入中间状态，从而导致不可预知的问题。</li>
</ul>
<p><strong>不可变基础设施(immutable infrastructure)</strong></p>
<ul>
<li>不可变的容器镜像（只读，一层层叠加）</li>
<li>不可变的主机操作系统</li>
</ul>
<blockquote>
<p>不可变的操作系统只允许修改<code v-pre>/etc</code>和<code v-pre>/var</code>目录，其他目录均为只读。</p>
</blockquote>
<h3 id="atomic" tabindex="-1"><a class="header-anchor" href="#atomic" aria-hidden="true">#</a> Atomic*</h3>
<p>Atomic是由Red Hat支持的软件包安装系统，可在多种发行版上使用，包括Fedora、CentOS和RHEL。Atomic采用不可变的操作系统，面向容器优化的基础设施，灵活且安全。它还支持操作系统升级和回滚的原子操作，使用起来非常方便。</p>
<p><strong>多种 Distro：</strong></p>
<ul>
<li>Fedora</li>
<li>CentOS</li>
<li>RHEL</li>
</ul>
<p><strong>优势：</strong></p>
<ul>
<li>不可变操作系统，面向容器优化的基础设施
<ul>
<li>灵活和安全性较好</li>
<li>只有/etc和/var可以修改，其他目录均为只读</li>
</ul>
</li>
<li>基于 rpm-ostree 管理系统包
<ul>
<li>rpm-ostree是一个开源项目，使得生产系统中构建镜像非常简单</li>
<li>支持操作系统升级和回滚的原子操作</li>
</ul>
</li>
</ul>
<h3 id="最小化主机操作系统" tabindex="-1"><a class="header-anchor" href="#最小化主机操作系统" aria-hidden="true">#</a> 最小化主机操作系统</h3>
<p>在云原生环境下，最小化主机操作系统是很重要的。只安装必要的工具，如支持系统运行的最小工具集，可以提高性能、稳定性和安全保障。任何调试工具，如性能排查和网络排查工具，均可以后期以容器形式运行。</p>
<p>以上是云原生基础设施的基本框架，只有通过不断的实践和总结，才能实现云原生的理想状态。</p>
<p><strong>原则：</strong></p>
<ul>
<li>最小化主机操作系统</li>
<li>只安装必要的工具
<ul>
<li>必要：支持系统运行的最小工具集</li>
<li>任何调试工具，比如性能排查，网络排查工具,均可以后期以容器形式运行</li>
</ul>
</li>
<li>意义
<ul>
<li>性能</li>
<li>稳定性</li>
<li>安全保障</li>
</ul>
</li>
</ul>
<h3 id="操作系统构建流程" tabindex="-1"><a class="header-anchor" href="#操作系统构建流程" aria-hidden="true">#</a> 操作系统构建流程</h3>
<p><img src="http://sm.nsddd.top/sm202303132027164.png" alt="image-20230313202733661"></p>
<h3 id="ostree" tabindex="-1"><a class="header-anchor" href="#ostree" aria-hidden="true">#</a> ostree</h3>
<p>提供一-个共享库( libostree)和一些列命令行 提供与 git 命令行一致的体验，可以提交或者下载一个完整的可启动的文件系统树 提供将 ostree 部署进 bootloader 的机制</p>
<ul>
<li>https://github.com/ostreedev/ostree/blob/main/src/boot/dracut/module-setup.sh</li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token function">install</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dracut_install <span class="token operator">/</span>usr<span class="token operator">/</span>lib<span class="token operator">/</span>ostree<span class="token operator">/</span>ostree<span class="token operator">-</span>prepare<span class="token operator">-</span>root
    inst_simple <span class="token string">"${systemdsystemunitdir}/ostree-prepare-root.service"</span>
    mkdir <span class="token operator">-</span>p <span class="token string">"${initdir}${systemdsystemconfdir}/initrd-root-fs.target.wants"</span>
    ln_r <span class="token string">"${systemdsystemunitdir}/ostree-prepare-root.service"</span> \
        <span class="token string">"${systemdsystemconfdir}/initrd-root-fs.target.wants/ostree-prepare-root.service"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="构建-ostree" tabindex="-1"><a class="header-anchor" href="#构建-ostree" aria-hidden="true">#</a> 构建 ostree</h4>
<p>rpm-ostree</p>
<ul>
<li>基于 treefile 将 rpm 包构建成为 ostree</li>
<li>管理 ostree 以及 bootloader 配置</li>
</ul>
<p>treefile</p>
<ul>
<li>refer：分支名(版本，cpu架构)</li>
<li>repo：rpm package repositories</li>
<li>packages：待安装组件</li>
</ul>
<p>将 rpm 构建成 ostree</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>rpm-ostree compose tree --unified-core <span class="token parameter variable">--cachedir</span><span class="token operator">=</span>cache <span class="token parameter variable">--repo</span><span class="token operator">=</span>. /build-repo/path/to/treefile.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="加载-ostree" tabindex="-1"><a class="header-anchor" href="#加载-ostree" aria-hidden="true">#</a> 加载 ostree</h4>
<p>初始化项目</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ostree admin os-init centos-atomic-host
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>导入 ostree repo</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ostree remote <span class="token function">add</span> atomic http://ostree.svr/ostree
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>拉取 ostree</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ostree pull atomic centos-atomic-host/8/x86_64/standard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>部署 OS</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ostree admin deploy <span class="token parameter variable">--os</span><span class="token operator">=</span>centos-atomic-hostcentos-atomic-host/8/x86_64/standard <span class="token parameter variable">--karg</span><span class="token operator">=</span><span class="token string">' root=/dev/atomicos/root'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="操作系统加载" tabindex="-1"><a class="header-anchor" href="#操作系统加载" aria-hidden="true">#</a> 操作系统加载</h4>
<p><strong>物理机</strong>:</p>
<ul>
<li>物理机通常需要通过 <code v-pre>foreman</code> 启动，<code v-pre>foreman</code> 通过 <code v-pre>pxe boot</code>,并加载 <code v-pre>kickstart</code></li>
<li><code v-pre>kickstart</code> 通过<code v-pre>ostree deploy</code> 即可完成操作系统的部署</li>
</ul>
<p><strong>虚拟机</strong>:</p>
<ul>
<li>需要通过镜像工具将 ostree 构建成 qcow2 格式，vhd, raw 等模式</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '59.md' style='float:left'>⬆️上一节🔗  </a><a href = '61.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


