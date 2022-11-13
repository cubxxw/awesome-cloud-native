<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第7节-k3s-vs-k0s" tabindex="-1"><a class="header-anchor" href="#第7节-k3s-vs-k0s" aria-hidden="true">#</a> 第7节 k3s vs k0s</h1>
<div><a href = '6.md' style='float:left'>⬆️上一节🔗  </a><a href = '8.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="k3s" tabindex="-1"><a class="header-anchor" href="#k3s" aria-hidden="true">#</a> k3s</h2>
<p><em>::: tip</em>
<em>Mirantis k0s  <strong>vs</strong>  Rancher k3s</em>
<em>:::</em></p>
<p>该怎么样选择 k3s 或者 k0s ？ 我想这是一个很令人疑惑的问题。</p>
<p>使用 kubernetes 或许需要你将机器提高到 2-4 ，但是这并不是很令人满意的，这个要求太高了~</p>
<p>工作节点 1GB 的内存限制是所有 Kubernetes 集群部署的挑战，也是许多人无法克服的障碍。部署表明，与 K3s 相比，k0s 不一定适用于使用 Traefik 和 Longhorn 的 OCI 上始终空闲的集群。出于这个原因，我目前只能推荐 K3s 作为 Kubernetes 集群部署在 OCI 上，作为一个始终免费的解决方案。</p>
<p><em>k0s：</em><a href="https://k0sproject.io/" target="_blank" rel="noopener noreferrer">https 😕/k0sproject.io<ExternalLinkIcon/></a></p>
<p><em>K3s：</em><a href="https://k3s.io/" target="_blank" rel="noopener noreferrer">https 😕/k3s.io<ExternalLinkIcon/></a></p>
<h2 id="mirantis-k0s" tabindex="-1"><a class="header-anchor" href="#mirantis-k0s" aria-hidden="true">#</a> Mirantis k0s</h2>
<p>K0s 的核心是设计为最轻和最小的，这降低了典型 Kubernetes 发行版的安装和维护复杂性。用户可以在几分钟内部署集群，只需最少的资源和零专业知识即可开始。</p>
<p>K0s 发行版作为单个库分发和打包，除了内核之外不需要任何主机操作系统依赖项或安装包即可正常运行和运行。任何类型的性能问题都可以在发行版中直接解决，使开发人员可以完全控制库以使环境更加安全。</p>
<p>K0s 还可以自动执行集群生命周期管理以执行集群升级，从而减少在应用程序运行时升级集群的停机时间和负担。</p>
<h3 id="单二进制" tabindex="-1"><a class="header-anchor" href="#单二进制" aria-hidden="true">#</a> 单二进制</h3>
<p>K0s 构建为单个大小的二进制包（大约 165 Mb），这意味着所有必要的库都嵌入到一个自解压存档中，可以在没有任何依赖关系的情况下执行。</p>
<p>作为单个二进制 k0s 包含核心组件、操作系统依赖项和组件，这些组件打包为符合 FIPS 的发行版，以便在高度机密的测试环境中安全使用。</p>
<h3 id="支持各种容器运行时、网络和存储接口" tabindex="-1"><a class="header-anchor" href="#支持各种容器运行时、网络和存储接口" aria-hidden="true">#</a> 支持各种容器运行时、网络和存储接口</h3>
<p>K0s 是一个可交换的 Kubernetes 发行版，支持各种容器运行时 (CRI)、容器网络 (CNI) 和容器存储接口 (CSI)。</p>
<p>默认情况下，k0s 实现了管理整个容器生命周期的 containerd 运行时。但是，如果您的组织使用特定的容器运行时来满足其特定需求。K0s 包括对 CRI 的支持，例如符合 FIPS 的 Mirantis Container Runtime。</p>
<p>对于容器网络，K0s 使用 Calico，但它很容易与 Flannel、Canal 和 Weave 等其他流行的 CNI 提供程序兼容。开发人员还可以通过使用任何 CSI 存储驱动程序将块和文件存储系统暴露给容器化应用程序来实现容器存储。</p>
<h3 id="它选择隔离控制平面" tabindex="-1"><a class="header-anchor" href="#它选择隔离控制平面" aria-hidden="true">#</a> 它选择隔离控制平面</h3>
<p>默认情况下，在 k0s 中，控制平面保持完全隔离，不直接成为集群的一部分，这降低了在控制器节点上运行典型工作负载的机会。K0s 没有容器运行时或 kubelet 运行，在控制平面和集群工作人员之间创建了直接连接。</p>
<h3 id="适用于各种数据存储后端的-kine" tabindex="-1"><a class="header-anchor" href="#适用于各种数据存储后端的-kine" aria-hidden="true">#</a> 适用于各种数据存储后端的 Kine</h3>
<p>默认情况下，K0s 使用 Etcd 作为 Kubernetes API 的默认数据存储，并根据存储需求提供 etcd 集群的自动扩展。但是，有许多部署场景需要不同类型的数据存储机制。</p>
<p>使用 Kubernetes 支持各种数据存储后端。K0s 嵌入了 Kine，它使 MySQL、Postgres 和 SQLite 能够管理和配置集群数据存储。Kine 实现了一个 etcd API，它将 etcd 调用转换为所需的 API，以实现无限的存储架构变化。</p>
<h3 id="控制平面节点通信的连接性" tabindex="-1"><a class="header-anchor" href="#控制平面节点通信的连接性" aria-hidden="true">#</a> 控制平面节点通信的连接性</h3>
<p>默认情况下，K0s 使用 Konnectivity 服务负责控制平面和工作节点之间的间接通信。连接服务实现反向隧道，为集群和控制平面之间的通信提供 TCP 级别代理。</p>
<p>Konnectivity 服务分为两部分：Konnectivity 服务器和代理。Konnectivity 代理负责维护和启动与 Konnectivity 服务器的连接，而 Konnectivity 服务器与 API 服务器一起运行，代理通过双向隧道调用。在 K0s 中启用 Konnectivity 服务后，从控制平面到节点的所有流量都经过这些连接。</p>
<h2 id="rancher-k3s" tabindex="-1"><a class="header-anchor" href="#rancher-k3s" aria-hidden="true">#</a> Rancher k3s</h2>
<p>k3s 由 Rancher Labs 开发，是一个高度可用且可用于生产的 Kubernetes 发行版，专为资源受限的 Edge、ARM 和 IoT 环境中的生产工作流程而设计。</p>
<p>Rancher Labs 已经成为 Kubernetes 领域的重要参与者，因为他们的旗舰 Kubernetes GUI 提供了 Rancher。借助 k3s，他们发布了一个投诉分发版，为 Kubernetes 提供了各种增强功能。</p>
<p>K3s 是经过 CNCF（云原生计算基金会）认证的 Kubernetes 发行版，可确保所有其他 Kubernetes 版本都支持所需的 API，就像开源产品一样。</p>
<p>K3s 具有非常轻量级的设计，其二进制大小很小。Rancher 通过删除许多可以通过附加组件轻松实现的组件来实现这一点。</p>
<p>K3s 对资源的要求非常低，这意味着它可以很容易地在集群上运行或部署。k0s 的采用和增长也在迅速发生，自 2019 年推出以来已有 1800 多名贡献者，k3s 已成为小型 Kubernetes 的主要选择之一</p>
<p><img src="http://sm.nsddd.top/smimage-20221113132824829.png" alt="image-20221113132824829"></p>
<h2 id="k3s-与-k0s" tabindex="-1"><a class="header-anchor" href="#k3s-与-k0s" aria-hidden="true">#</a> k3s 与 k0s</h2>
<p>在开始比较之前，需要指出的是，K3s 和 K0s 发行版的核心是相同的上游开源版本 Kubernetes。这些发行版可能有不同的发布期，但它们都利用了上游 Kubernetes 并将其与其他技术相结合，以满足市场的期望需求。</p>
<p>k3s 和 k0s 发行版都具有简单的设计，打包和部署为单个二进制文件。与 k0s(~150Mb) 相比，用户可能会使用 k3s(50Mb) 获得更轻的版本，但他们都可以在几秒钟内获得一个完整的 Kubernetes 集群。通过在集群节点上运行脚本，安装也非常简单。</p>
<p>k0s 和 k3s 的单个二进制包是自包含的。它们几乎拥有运行 Kubernetes 集群所需的所有必要组件，包括 API 服务器、操作系统依赖项和控制器。</p>
<p>默认情况下，k3s 和 k0s 包含 containerd 运行时，它提供了足够的功能来管理 pod 生命周期。也可以用各种 CRI 替换容器、存储和网络。k0s 和 k3s 中的 CSI 和 CNI 提供商，因为他们的电池包括但可更换的方法。</p>
<p>与 k0s 集群相比，控制平面和工作节点在 k3s 中的通信方式是有区别的。在 k3s 集群中，控制器组件与节点中的 kubelet 服务器一起运行。kubelet 服务器具有容器运行时和管理跨网络的集群流量的代理。另一方面，K0s 不公开控制器组件，而是使用 Konnectivity 服务器而不是隧道代理来处理集群流量。</p>
<p>比较它们的二进制大小时，典型的 k3s 环境的占用空间是 K0s 的三分之一（50Mb vs150Mb）。<strong>K3s 已经摆脱了运行最小集群所不需要的所有不必要的组件，只添加了一些必要的附加组件，包括开箱即用的 Traefik 入口控制器、负载均衡器和 Helm 图表。</strong></p>
<p>K0s 不包括任何这些附加组件，但包含所有上游 Kubernetes 库，如存储卷插件和云提供商 API，作为自解压存档，有助于其更大的大小。</p>
<p>K3s 和 K0s 都使用 Core DNS 和 Metrics 服务器。CoreDNS 为 Kubernetes 提供了一个可扩展的 DNS 服务器，用于将域名转换为 IP 地址。Metrics 服务器从每个节点上的容器运行时公开的 API 中收集资源使用数据。</p>
<p>k0s 和 k3s 之间的另一个关键区别是如何管理集群状态。默认情况下，K0s 分发依赖于 Kine 作为 etcd（分布式键值数据库）的数据存储，而 k3s 已将 etcd 替换为 SQLite（K3s v1.19.1 版本以后就是默认安装使用的是 etcd ）。</p>
<p>使用 Kine 的 K0s 服务器可以轻松地将 etcd 与 MySQL、Postgres、SQLite、dqlite 等各种其他数据库交换，以实现集群的高可用性。另一方面，K0s 服务器必须与支持的数据库（如 MySQL 和 PostgreSQL）集成，以支持多个实例并使集群具有高可用性。</p>
<h2 id="选择哪一个-k3s-还是-k0s" tabindex="-1"><a class="header-anchor" href="#选择哪一个-k3s-还是-k0s" aria-hidden="true">#</a> 选择哪一个，k3s 还是 k0s？</h2>
<p>如果您想要为轻量级环境提供稳定的生产就绪 Kubernetes 发行版，我们仍然会推荐 k3s。默认情况下，K3s 对于轻量级环境是安全的，并且消除了上游 Kubernetes 所排除的膨胀软件。K3s 还将所有 Kubernetes 组件包装到一个简单的启动器中，它支持各种存储后端，并且需要最少的操作系统依赖。</p>
<p>相比之下，如果您想要一个用于开发或暂存集群的 Kubernetes 发行版，k0s 值得一试。尽管 k0s 是一个年轻的项目并且是一个早期版本，但它正在迅速发展成为一种在任何地方运行 Kubernetes 的强大且通用的方式。当然，有一些粗糙的边缘需要修复，比如支持开箱即用的附加组件和大二进制大小（与 k3s 相比），但我们希望随着项目的成熟，这些障碍能够得到克服。</p>
<h2 id="比较-tables" tabindex="-1"><a class="header-anchor" href="#比较-tables" aria-hidden="true">#</a> 比较 tables</h2>
<table>
<thead>
<tr>
<th></th>
<th>K0s</th>
<th>K3s</th>
</tr>
</thead>
<tbody>
<tr>
<td>二进制大小</td>
<td>~160 MB</td>
<td>~50 MB</td>
</tr>
<tr>
<td>控制平面节点通信</td>
<td>连接性</td>
<td>隧道代理</td>
</tr>
<tr>
<td>数据存储</td>
<td>默认使用 etcd</td>
<td>SQLite (K3s v1.19.1：etcd)</td>
</tr>
<tr>
<td>控制平面上的工作负载</td>
<td>不，控制平面是隔离的</td>
<td>yes</td>
</tr>
<tr>
<td>集群 DNS 和指标</td>
<td>核心 DNS 和指标服务器</td>
<td>核心 DNS 和 Metric Server</td>
</tr>
<tr>
<td>附加组件</td>
<td>no~</td>
<td>Helm、Traefik 和 Loadbalancer</td>
</tr>
<tr>
<td>默认 CNI</td>
<td>Calico</td>
<td>Flannel</td>
</tr>
<tr>
<td>操作系统依赖</td>
<td>无操作系统依赖</td>
<td>最小到没有操作系统依赖</td>
</tr>
<tr>
<td>支持的架构</td>
<td>AMD64、ARM64</td>
<td>AMD64、ARM64、ARMHF</td>
</tr>
</tbody>
</table>
<h2 id="或许还可以带上microk8s" tabindex="-1"><a class="header-anchor" href="#或许还可以带上microk8s" aria-hidden="true">#</a> 或许还可以带上microk8s</h2>
<p>源自MicroK8s 主文档网页，MicroK8s 是最小、最快、完全符合标准的 Kubernetes，它跟踪上游版本并使集群变得简单。</p>
<p>MicroK8s 非常适合离线开发、原型设计和测试。</p>
<p>在 VM 上使用它作为 CI/CD 的小型、便宜、可靠的 k8s。它也是用于设备的最佳生产级 Kubernetes。</p>
<p>为 k8s 开发 IoT 应用程序并将它们部署到 Linux 机器上的 MicroK8s。</p>
<h2 id="mirantis-k0s-未来" tabindex="-1"><a class="header-anchor" href="#mirantis-k0s-未来" aria-hidden="true">#</a> Mirantis k0s 未来</h2>
<p>Kubernetes 发行版市场中的 K0s 直接与 Rancher 的 k3s 和 Canonical 的 microk8s 竞争。K3s 是 CNCF 认证的项目，已经得到了社区的大力支持，并且已经成为来自不同领域的各种嵌入式计算组织的一部分。Canonical 的 Microk8s 最近添加了一些功能，使其更适合生产，但与 k3s 相比；它不是用于大规模部署的成熟发行版。</p>
<p>K0s 有许多突出的特性，例如，Kine 允许集成 MySQL 和 PostgreSQL 等外部数据库，单一的二进制安装和架构支持也与 k3s 非常相似。k0s 社区也期待在 Linux 的控制平面上增加对基于 Microsoft Windows Server 2019 的工作节点的支持，从而允许运行混合工作负载。</p>
<p>Mirantis 与 k0s 融合了 Pharos 和 Docker 的最佳创意，创建了一个非常现代的 100% 上游 Kubernetes 发行版。Mirantis 还收购了 Docker Enterprise 和 Lens 项目，以完善其云原生产品组合并在市场上积极竞争。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '6.md' style='float:left'>⬆️上一节🔗  </a><a href = '8.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


