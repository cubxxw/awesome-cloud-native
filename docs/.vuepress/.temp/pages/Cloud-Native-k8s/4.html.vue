<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第4节-kubernetes-k8s-教程" tabindex="-1"><a class="header-anchor" href="#第4节-kubernetes-k8s-教程" aria-hidden="true">#</a> 第4节 kubernetes(k8s)教程</h1>
<div><a href = '3.md' style='float:left'>⬆️上一节🔗  </a><a href = '5.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#正片开始">正片开始~</router-link></li><li><router-link to="#为什么-kubernetes-弃用了-docker">为什么 kubernetes 弃用了 docker</router-link></li><li><router-link to="#kubernetes-k8s">kubernetes(k8s)</router-link></li><li><router-link to="#k8s架构">k8s架构</router-link><ul><li><router-link to="#工作方式">工作方式</router-link></li><li><router-link to="#组织架构">组织架构</router-link></li></ul></li><li><router-link to="#集群架构与组件">集群架构与组件</router-link><ul><li><router-link to="#master节点">Master节点</router-link></li><li><router-link to="#work-node节点">Work Node节点</router-link></li><li><router-link to="#etcd数据存储">etcd数据存储</router-link></li><li><router-link to="#核心附件">核心附件</router-link></li><li><router-link to="#网络插件">网络插件</router-link></li></ul></li><li><router-link to="#kubernetes基本概念">Kubernetes基本概念</router-link><ul><li><router-link to="#label-资源标签">Label 资源标签</router-link></li><li><router-link to="#labe-selector标签选择器">Labe Selector标签选择器</router-link></li><li><router-link to="#pod资源对象">Pod资源对象</router-link></li><li><router-link to="#pod控制器-controller">Pod控制器（Controller）</router-link></li><li><router-link to="#service服务资源">Service服务资源</router-link></li><li><router-link to="#ingress">Ingress</router-link></li><li><router-link to="#volume存储卷">Volume存储卷</router-link></li><li><router-link to="#name和namespace">Name和Namespace</router-link></li><li><router-link to="#annotation注解">Annotation注解</router-link></li></ul></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="正片开始" tabindex="-1"><a class="header-anchor" href="#正片开始" aria-hidden="true">#</a> 正片开始~</h2>
<p>Kubernetes 是 Google 团队发起的一个开源项目，它的目标是管理跨多个主机的容器，用于自动部署、扩展和管理容器化的应用程序，主要实现语言为 Go 语言。Kubernetes 的组件和架构还是相对较复杂的。要慢慢学习~</p>
<blockquote>
<p>我们急需编排一个容器~</p>
</blockquote>
<h2 id="为什么-kubernetes-弃用了-docker" tabindex="-1"><a class="header-anchor" href="#为什么-kubernetes-弃用了-docker" aria-hidden="true">#</a> 为什么 kubernetes 弃用了 docker</h2>
<div class="custom-container tip"><p class="custom-container-title">很意外</p>
<p>听到 Kubernetes 从 Kubernetes 版本 1.20 开始弃用对 Docker 作为容器运行时的支持，这似乎有点令人震惊。</p>
<p>Kubernetes 正在删除对 Docker 作为<strong>容器运行时</strong>的支持。Kubernetes 实际上并不处理在机器上运行容器的过程。相反，它依赖于另一个称为<strong>容器运行时</strong>的软件。.</p>
</div>
<p>docker 比 kubernetes 发行的早</p>
<p>docker本身不兼容 CRI 接口。Kubernetes 适用于所有实现称为容器运行时<strong>接口 （CRI） 标准的容器运行时</strong>。这本质上是 Kubernetes 和容器运行时之间通信的标准方式，任何支持此标准的运行时都会自动与 Kubernetes 配合使用。</p>
<p>Docker 不实现容器运行时接口 （CRI）。过去，容器运行时没有那么多好的选择，Kubernetes 实现了 Docker shim，这是一个额外的层，用作 Kubernetes 和 Docker 之间的接口。然而，现在有很多运行时可以实现 CRI，Kubernetes 维护对 Docker 的特殊支持不再有意义。</p>
<div class="custom-container warning"><p class="custom-container-title">弃用的意义</p>
<p>虽然移除了 docker ，但是还是保留了以前的 dockershim，如果你愿意，你依旧可以使用 docker 容器化引擎提供容器化支持。</p>
<p>除了docker，还有 containerd、CRI-O</p>
<p>我会告诉你一个秘密：<strong>Docker实际上不是一个容器运行时</strong>！它实际上是一个工具集合，位于称为<strong>containerd</strong>的容器运行时之上。.</p>
<p>没错！Docker 不直接运行容器。它只是在单独的底层容器运行时之上创建一个更易于访问且功能更丰富的界面。当它被用作 Kubernetes 的容器运行时时，Docker 只是 Kubernetes 和容器之间的中间人。</p>
<p>但是，Kubernetes可以直接使用containerd作为容器运行时，这意味着在这个中间人角色中不再需要Docker。Docker仍然有很多东西可以提供，即使在Kubernetes生态系统中也是如此。只是不需要专门用作容器运行时。</p>
</div>
<p><strong>Podman 横空出世：</strong></p>
<p>podman 的定位也是与 docker 兼容，因此也在使用上尽量接近 docker。在使用方面，可以分为两个方面，一是系统构建者的角度，二是系统使用者的角度。</p>
<h2 id="kubernetes-k8s" tabindex="-1"><a class="header-anchor" href="#kubernetes-k8s" aria-hidden="true">#</a> kubernetes(k8s)</h2>
<p><a href="http://kubernetes.io/" target="_blank" rel="noopener noreferrer">Kubernetes<ExternalLinkIcon/></a>是Google基于Borg开源的容器编排调度引擎，作为<a href="http://cncf.io/" target="_blank" rel="noopener noreferrer">CNCF<ExternalLinkIcon/></a>（Cloud Native Computing Foundation）最重要的组件之一，它的目标不仅仅是一个编排系统，而是提供一个规范，可以让你来描述集群的架构，定义服务的最终状态，<code v-pre>Kubernetes</code> 可以帮你将系统自动地达到和维持在这个状态。<code v-pre>Kubernetes</code> 作为云原生应用的基石，相当于一个云操作系统，其重要性不言而喻。</p>
<blockquote>
<p><strong>一句话介绍说：k8s就是为我们提供了可弹性运行分布式系统框架，k8s满足我的扩展要求、故障转移、部署模式等等，例如：k8s可以轻松管理系统的Canary部署。</strong></p>
</blockquote>
<div class="custom-container tip"><p class="custom-container-title">sealos 是什么</p>
<p><strong><a href="https://www.sealos.io/zh-Hans/docs/Intro" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a> 是以 kubernetes 为内核的云操作系统发行版</strong></p>
<p>早期单机操作系统也是分层架构，后来才演变成 linux windows 这种内核架构，云操作系统从容器诞生之日起分层架构被击穿，未来也会朝着高内聚的&quot;云内核&quot;架构迁移</p>
<p><img src="http://sm.nsddd.top/smimage-20221017222736688.png" alt="image-20221017222736688"></p>
<ul>
<li>从现在开始，把你数据中心所有机器想象成一台&quot;抽象&quot;的超级计算机，sealos 就是用来管理这台超级计算机的操作系统，kubernetes 就是</li>
<li>.这个操作系统的内核！</li>
<li>云计算从此刻起再无 IaaS PaaS SaaS 之分，只有云操作系统驱动(CSI CNI CRI 实现) 云操作系统内核(kubernetes) 和 分布式应用组成</li>
</ul>
</div>
<blockquote>
<p>在这里，我将会从docker到k8s全部遍历一遍</p>
<ul>
<li><code v-pre>Docker</code> 的一些常用方法，当然我们的重点会在 Kubernetes 上面</li>
<li>会用 <code v-pre>kubeadm</code> 来搭建一套 <code v-pre>Kubernetes</code> 的集群</li>
<li>理解 <code v-pre>Kubernetes</code> 集群的运行原理</li>
<li>常用的一些控制器使用方法</li>
<li>还有 <code v-pre>Kubernetes</code> 的一些调度策略</li>
<li><code v-pre>Kubernetes</code>的运维</li>
<li>包管理工具 <code v-pre>Helm</code> 的使用</li>
<li>最后我们会实现基于 Kubernetes 的 CI/CD</li>
</ul>
</blockquote>
<h2 id="k8s架构" tabindex="-1"><a class="header-anchor" href="#k8s架构" aria-hidden="true">#</a> k8s架构</h2>
<p>容器编排系统需要满足的条件：</p>
<ul>
<li>服务注册，服务发现</li>
<li>负载均衡</li>
<li>配置、存储管理</li>
<li>健康检查</li>
<li>自动扩缩容</li>
<li>零宕机</li>
</ul>
<h3 id="工作方式" tabindex="-1"><a class="header-anchor" href="#工作方式" aria-hidden="true">#</a> 工作方式</h3>
<p>Kubernetes采用主从分布式架构，包括Master（主节点）、Worker（从节点或工作节点），以及客户端命令行工具kubectl和其它附加项。</p>
<h3 id="组织架构" tabindex="-1"><a class="header-anchor" href="#组织架构" aria-hidden="true">#</a> 组织架构</h3>
<blockquote>
<p>我觉得尚硅谷的例子可以让我们很好的理解：</p>
</blockquote>
<p><img src="http://sm.nsddd.top/smimage-20221018110649854.png" alt="image-20221018110649854"></p>
<div class="custom-container warning"><p class="custom-container-title">Kubernetes Control Plane</p>
<p>Kubernetes control Plane 负责维护集群中任何对象的 Desire State。它还管理工作节点和 Pod。它由 Kube-api-server 等五个组件组成，即 <code v-pre>Kube-scheduler</code>、<code v-pre>Kube-controller-manager</code> 和 <code v-pre>cloud-controller-manager</code>。运行这些组件的节点称为“主节点”。这些组件可以在单个节点或多个节点上运行，但建议在生产中在多个节点上运行以提供高可用性和容错性。每个控制平面的组件都有自己的职责，但是它们一起对集群做出全局决策，检测和响应由用户或任何集成的第三方应用程序生成的集群事件。</p>
<p><img src="http://sm.nsddd.top/smimage-20221126204020843.png" alt="image-20221126204020843"></p>
<p>让我们了解 Kubernetes Control Plane的不同组件。Kubernetes Control Plane有以下五个组件：</p>
<ul>
<li>Kube-api-server</li>
<li>Kube-scheduler</li>
<li>Kube-controller-manager</li>
<li>etcd</li>
<li>cloud-controller-manager</li>
</ul>
<p><strong>Kube-API-server：</strong></p>
<p>Kube-api-server 是控制平面的主要组件，因为所有流量都通过 api-server，如果控制平面的其他组件必须与 ‘etcd’ 数据存储通信，则它们也连接到 api-server，因为只有 Kube-api-server可以与“etcd”通信。它为 REST 操作提供服务，并为 Kubernetes Control Plane提供前端，该控制平面公开 Kubernetes API，其他组件可以通过该 API 与集群通信。有多个 api-server 可以水平部署以使用负载均衡器来平衡流量。</p>
<p><strong>Kube-scheduler：</strong></p>
<p>Kube-scheduler 负责将新创建的 Pod 调度到最佳可用节点以在集群中运行。但是，可以在部署 Pod 或部署 Pod 之前，通过在 YAML 文件中指定关联性、反规范或约束，在特定节点、特定区域或根据节点标签等安排 Pod 或一组 Pod。部署。如果没有满足指定要求的可用节点，则不会部署 Pod 并保持未调度状态，直到 Kube-scheduler 找不到可行的节点。可行节点是满足 Pod 调度所有要求的节点。</p>
<p>Kube-scheduler 使用 2 步过程为集群中的 pod 选择节点、过滤和评分。在过滤过程中，Kube-scheduler 通过运行检查来找到一个可行的节点，比如节点是否有足够的可用资源来为这个 pod 提到。过滤掉所有可行节点后，它会根据活动得分规则为每个可行节点分配一个分数，并在得分最高的节点上运行 Pod。如果多个节点具有相同的分数，则它随机选择一个。</p>
<p><strong>Kube-controller-manager：</strong></p>
<p>Kube-controller-manager 负责运行控制器进程。它实际上由四个进程组成，并作为一个进程运行以降低复杂性。它确保当前状态与期望状态匹配，如果当前状态与期望状态不匹配，则对集群进行适当的更改以达到期望状态。</p>
<p>它包括节点控制器、复制控制器、端点控制器以及服务帐户和令牌控制器。</p>
<ul>
<li><strong>节点控制器：</strong> – 它管理节点并密切关注集群中的可用节点，并在任何节点出现故障时做出响应。</li>
<li><strong>复制控制器：</strong> – 它确保为集群中的每个复制控制器对象运行正确数量的 Pod。</li>
<li><strong>Endpoints 控制器：</strong> – 它创建 Endpoints 对象，例如，为了向外部公开 pod，我们需要将其加入服务。</li>
<li><strong>服务帐户和令牌控制器：</strong> – 负责创建默认帐户和 API 访问令牌。例如，每当我们创建一个新命名空间时，我们需要一个服务帐户和访问令牌来访问它，因此这些控制器负责为新命名空间创建默认帐户和 API 访问令牌。</li>
</ul>
<p><strong>etcd</strong></p>
<p>etcd 是 Kubernetes 的默认数据存储，用于存储所有集群数据。它是一个一致的、分布式的、高度可用的键值存储。etcd 只能通过 Kube-api-server 访问。如果其他控制平面的组件必须访问 etcd，则必须通过 kube-api-server。etcd 不是 Kubernetes 的一部分。它是由云原生计算基金会支持的完全不同的开源产品。我们需要为 etcd 设置一个适当的备份计划，这样如果集群出现问题，我们可以恢复备份并快速恢复业务。</p>
<p><strong>cloud-controller-manager</strong></p>
<p>cloud-controller-manager 允许我们将本地 Kubernetes 集群连接到云托管的 Kubernetes 集群。它是一个单独的组件，仅与云平台交互。云控制器管理器的控制器取决于我们运行工作负载的云提供商。如果我们有本地 Kubernetes 集群，或者我们为了学习目的在自己的 PC 上安装了 Kubernetes，则它不可用。cloud-controller-manager 还在单个进程中包含三个控制器，它们是节点控制器、路由控制器和服务控制器。</p>
<ul>
<li><strong>节点控制器：</strong> – 它不断检查托管在云提供商中的节点的状态。例如，如果任何节点没有响应，则它会检查该节点是否已在云中删除。</li>
<li><strong>路由控制器：</strong> – 它在底层云基础设施中控制和设置路由。</li>
<li><strong>服务控制器：</strong> – 创建、更新和删除云提供商负载均衡器。</li>
</ul>
</div>
<h2 id="集群架构与组件" tabindex="-1"><a class="header-anchor" href="#集群架构与组件" aria-hidden="true">#</a> 集群架构与组件</h2>
<p><img src="http://sm.nsddd.top/sm1363565-20200523175956216-940931564.png" alt="img"></p>
<h3 id="master节点" tabindex="-1"><a class="header-anchor" href="#master节点" aria-hidden="true">#</a> Master节点</h3>
<p>Master是集群的网关和中枢枢纽，主要作用：暴露API接口，跟踪其他服务器的健康状态、以最优方式调度负载，以及编排其他组件之间的通信。单个的Master节点可以完成所有的功能，但是考虑单点故障的痛点，生产环境中通常要部署多个Master节点，组成Cluster。</p>
<table>
<thead>
<tr>
<th>master</th>
<th>概述</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>APIServer</strong></td>
<td>Kubernetes API，集群的统一入口，各组件协调者，以RESTful API提供接口服务，所有对象资源的增删改查和监听操作都交给APIServer处理后再提交给Etcd存储。</td>
</tr>
<tr>
<td><strong>Scheduler</strong></td>
<td>根据调度算法为新创建的Pod选择一个Node节点，可以任意部署,可以部署在同一个节点上,也可以部署在不同的节点上。</td>
</tr>
<tr>
<td><strong>Controller-Manager</strong></td>
<td>处理集群中常规后台任务，一个资源对应一个控制器，而ControllerManager就是负责管理这些控制器的。</td>
</tr>
</tbody>
</table>
<h3 id="work-node节点" tabindex="-1"><a class="header-anchor" href="#work-node节点" aria-hidden="true">#</a> Work Node节点</h3>
<p>是Kubernetes的工作节点，负责接收来自Master的工作指令，并根据指令相应地创建和销毁Pod对象，以及调整网络规则进行合理路由和流量转发。生产环境中，Node节点可以有N个。</p>
<table>
<thead>
<tr>
<th>Node</th>
<th>概述</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>kubelet</strong></td>
<td>kubelet是Master在Node节点上的Agent，管理本机运行容器的生命周期，比如创建容器、Pod挂载数据卷、下载secret、获取容器和节点状态等工作。kubelet将每个Pod转换成一组容器。</td>
</tr>
<tr>
<td><strong>Pod（Docker or rocket）</strong></td>
<td>容器引擎，运行容器。</td>
</tr>
<tr>
<td><strong>kube-proxy</strong></td>
<td>在Node节点上实现Pod网络代理，维护网络规则和四层负载均衡工作。</td>
</tr>
</tbody>
</table>
<h3 id="etcd数据存储" tabindex="-1"><a class="header-anchor" href="#etcd数据存储" aria-hidden="true">#</a> <strong>etcd</strong>数据存储</h3>
<p>分布式键值存储系统。用于保存集群状态数据，比如Pod、Service、网络等对象信息。</p>
<h3 id="核心附件" tabindex="-1"><a class="header-anchor" href="#核心附件" aria-hidden="true">#</a> 核心附件</h3>
<p>K8S集群还依赖一组附件组件，通常是由第三方提供的特定应用程序</p>
<table>
<thead>
<tr>
<th>核心插件</th>
<th>概述</th>
</tr>
</thead>
<tbody>
<tr>
<td>KubeDNS</td>
<td>在K8S集群中调度并运行提供DNS服务的Pod，同一集群内的其他Pod可以使用该DNS服务来解决主机名。K8S自1.11版本开始默认使用CoreDNS项目来为集群提供服务注册和服务发现的动态名称解析服务。</td>
</tr>
<tr>
<td>Dashboard</td>
<td>K8S集群的全部功能都要基于Web的UI，来管理集群中的应用和集群自身。</td>
</tr>
<tr>
<td>Heapster</td>
<td>容器和节点的性能监控与分析系统，它收集并解析多种指标数据，如资源利用率、生命周期时间，在最新的版本当中，其主要功能逐渐由Prometheus结合其他的组件进行代替。从 v1.8 开始，资源使用情况的监控可以通过 Metrics API的形式获取，具体的组件为Metrics Server，用来替换之前的heapster，该组件1.11开始逐渐被废弃。</td>
</tr>
<tr>
<td>Metric-Server</td>
<td>Metrics-Server是集群核心监控数据的聚合器，从 Kubernetes1.8 开始，它作为一个 Deployment对象默认部署在由kube-up.sh脚本创建的集群中，如果是其他部署方式需要单独安装。</td>
</tr>
<tr>
<td>Ingress Controller</td>
<td>Ingress是在应用层实现的HTTP(S)的负载均衡。不过，Ingress资源自身并不能进行流量的穿透，它仅仅是一组路由规则的集合，这些规则需要通过Ingress控制器（Ingress Controller）发挥作用。目前该功能项目大概有：Nginx-ingress、Traefik、Envoy和HAproxy等。</td>
</tr>
</tbody>
</table>
<h3 id="网络插件" tabindex="-1"><a class="header-anchor" href="#网络插件" aria-hidden="true">#</a> 网络插件</h3>
<table>
<thead>
<tr>
<th>网络查件</th>
<th>概述</th>
</tr>
</thead>
<tbody>
<tr>
<td>Container Network Interface （CNI）</td>
<td>容器网络接口</td>
</tr>
<tr>
<td>flunnal</td>
<td>实现网络配置，overlay network叠加网络</td>
</tr>
<tr>
<td>calico</td>
<td>网络配置，网络策略；BGp协议，隧道协议</td>
</tr>
<tr>
<td>canal（calico + flunnal）</td>
<td>供网络策略，配合flannel使用。</td>
</tr>
<tr>
<td><img src="http://sm.nsddd.top/sm1363565-20200523180136695-2145890184.png" alt="img"></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="kubernetes基本概念" tabindex="-1"><a class="header-anchor" href="#kubernetes基本概念" aria-hidden="true">#</a> Kubernetes基本概念</h2>
<table>
<thead>
<tr>
<th>基本概念</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Label资源标签</strong></td>
<td>标签（key/value），附加到某个资源上，用于关联对象、查询和筛选；</td>
</tr>
<tr>
<td><strong>Labe Selector标签选择器</strong></td>
<td>根据Label进行过滤符合条件的资源对象的一种机制</td>
</tr>
<tr>
<td><strong>Pod资源对象</strong></td>
<td>Pod资源对象是一种集合了一个或多个应用容器、存储资源、专用ip、以及支撑运行的其他选项的逻辑组件</td>
</tr>
<tr>
<td><strong>Pod控制器（Controller）</strong></td>
<td>管理Pod生命周期的资源抽象，并且它是一类对象，并非单个的资源对象，其中常见的包括：ReplicaSet、Deployment、StatefulSet、DaemonSet、Job&amp;Cronjob等等</td>
</tr>
<tr>
<td><strong>Service服务资源</strong></td>
<td>Service是建立在一组Pod对象之上的资源对象，通常用作防止Pod失联、定义一组Pod的访问策略，代理Pod</td>
</tr>
<tr>
<td><strong>Ingress</strong></td>
<td>如果需要将某些Pod对象提供给外部用户访问，则需要给这些Pod对象打开一个端口进行引入外部流量，除了Service以外，Ingress也是实现提供外部访问的一种方式。</td>
</tr>
<tr>
<td><strong>Volume存储卷</strong></td>
<td>保证数据的持久化存储</td>
</tr>
<tr>
<td><strong>Name&amp;&amp;Namespace</strong></td>
<td>Name是K8S集群中资源对象的标识符，通常作用于Namespace（名称空间），因此名称空间是名称的额外的限定机制。在同一个名称空间中，同一类型资源对象的名称必须具有唯一性。</td>
</tr>
<tr>
<td>Annotation注解</td>
<td>另一种附加在对象上的一种键值类型的数据；方便工具或用户阅读及查找。</td>
</tr>
</tbody>
</table>
<h3 id="label-资源标签" tabindex="-1"><a class="header-anchor" href="#label-资源标签" aria-hidden="true">#</a> Label 资源标签</h3>
<p>资源标签具体化的就是一个键值型（key/values)数据；使用标签是为了对指定对象进行辨识，比如Pod对象。标签可以在对象创建时进行附加，也可以创建后进行添加或修改。值得注意的是<strong>一个对象可以有多个标签，一个标签页可以附加到多个对象</strong>。</p>
<p><img src="http://sm.nsddd.top/sm1363565-20200523180226573-1554114165.png" alt="img"></p>
<h3 id="labe-selector标签选择器" tabindex="-1"><a class="header-anchor" href="#labe-selector标签选择器" aria-hidden="true">#</a> Labe Selector标签选择器</h3>
<p>有标签，当然就有标签选择器；例如将含有标签<code v-pre>role: backend</code>的所有Pod对象挑选出来归并为一组。通常在使用过程中，会通过标签对资源对象进行分类，然后再通过标签选择器进行筛选，最常见的应用就是为一组同样标签的Pod资源对象创建某个Service的端点。</p>
<p><img src="http://sm.nsddd.top/sm1363565-20200523180332039-330736525.png" alt="img"></p>
<h3 id="pod资源对象" tabindex="-1"><a class="header-anchor" href="#pod资源对象" aria-hidden="true">#</a> Pod资源对象</h3>
<p>Pod是kubernetes的最小调度单元；是一组容器的集合</p>
<blockquote>
<p>Pod可以封装一个活多个容器！同一个Pod中共享网络名称空间和存储资源，而容器之间可以通过本地回环接口：lo 直接通信，但是彼此之间又在Mount、User和Pid等名称空间上保持了隔离。</p>
</blockquote>
<p>Pod其实就是一个应用程序运行的单一实例，它通常由共享资源且关系紧密的一个或2多个应用容器组成。</p>
<p><img src="http://sm.nsddd.top/sm1363565-20200523180259373-1808638376.png" alt="img"></p>
<p>我们将每一个Pod对象类比为一个物理主机，那么运行在同一个Pod对象中的多个进程，也就类似于物理主机上的独立进程，而不同的是Pod对象中的各个进程都运行在彼此隔离的容器当中，而各个容器之间共享两种关键性资源;</p>
<p>网络&amp;&amp;存储卷。</p>
<ul>
<li>网络：每一个Pod对象都会分配到一个Pod IP地址，同一个Pod内部的所有容器共享Pod对象的Network和UTS名称空间，其中包括主机名、IP地址和端口等。因此，这些容器可以通过本地的回环接口lo进行通信，而在Pod之外的其他组件的通信，则需要使用Service资源对象的Cluster IP+端口完成。</li>
<li>存储卷：用户可以给Pod对象配置一组存储卷资源，这些资源可以共享给同一个Pod中的所有容器使用，从而完成容器间的数据共享。存储卷还可以确保在容器终止后被重启，或者是被删除后也能确保数据的持久化存储。</li>
</ul>
<p>一个Pod代表着一个应用程序的实例，现在我们需要去扩展这个应用程序；那么就意味着需要创建多个Pod实例，每个实例都代表着应用程序的一个运行副本。</p>
<p>而管理这些副本化的Pod对象的工具，都是由一组称为Controller的对象实现；例如Deployment控制器对象。</p>
<p>当创建Pod时，我们还可以使用Pod Preset对象为Pod注入特定的信息，比如Configmap、Secret、存储卷、卷挂载、环境变量等。有了Pod Preset对象，Pod模板的创建就不需要为每个模板显示提供所有信息。</p>
<p>基于预定的期望状态和每个Node节点的资源可用性；Master会把Pod对象调度至选定的工作节点上运行，工作节点从指向的镜像仓库进行下载镜像，并在本地的容器运行时环境中启动容器。Master会将整个集群的状态保存在etcd中，并通过API Server共享给集群的各个组件和客户端</p>
<h3 id="pod控制器-controller" tabindex="-1"><a class="header-anchor" href="#pod控制器-controller" aria-hidden="true">#</a> Pod控制器（Controller）</h3>
<p>在介绍Pod时我们提到，Pod是K8S的最小调度单位；但是Kubernetes并不会直接地部署和管理Pod对象，而是要借助于另外一个抽象资源——Controller进行管理。</p>
<p>常见的Pod控制器：</p>
<table>
<thead>
<tr>
<th>Pod Controller</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Replication Controller</strong></td>
<td>使用副本控制器，早起仅支持此Pod控制器；完成Pod增减、总数控制、滚动更新、回滚等操作，已停止使用</td>
</tr>
<tr>
<td><strong>ReplicaSet Controller</strong></td>
<td>版本更新后使用副本集控制器，并对使用方法进行声明；是Replication Controller的升级版</td>
</tr>
<tr>
<td><strong>Deployment</strong></td>
<td>用于无状态应用部署，例如nginx等；后续我们会提到HPA Controller（Horizontal Pod Autosaler）：用于水平Pod自动伸缩控制器，对rs&amp;deployment进行控制</td>
</tr>
<tr>
<td><strong>StatefulSet</strong></td>
<td>用于有状态应用部署，例如mysql，zookeeper等</td>
</tr>
<tr>
<td><strong>DaemonSet</strong></td>
<td>确保所有Node运行同一个Pod，例如网络查件flannel，zabbix_agent等</td>
</tr>
<tr>
<td>Job</td>
<td>一次性任务</td>
</tr>
<tr>
<td>Cronjob</td>
<td>定时任务</td>
</tr>
</tbody>
</table>
<p>控制器是更高级层次对象，用于部署和管理Pod。</p>
<p>以Deployment为例，它负责确保定义的Pod对象的副本数量符合预期的设置，这样用户只需要声明应用的期望状态，控制器就会自动地对其进行管理。</p>
<p><img src="http://sm.nsddd.top/sm1363565-20200523180401866-1621029241.png" alt="img"></p>
<p>用户通过手工创建或者通过Controller直接创建的Pod对象会被调度器（Scheduler）调度到集群中的某个工作节点上运行，等到容器应用进程运行结束之后正常终止，随后就会被删除。</p>
<blockquote>
<p>当节点的资源耗尽或者故障，也会导致Pod对象的回收。</p>
</blockquote>
<p>在K8S的集群设计中，Pod是一个有生命周期的对象。那么使用了控制器实现对一次性的Pod对象进行管理操作。</p>
<blockquote>
<p>例如，要确保部署的应用程序的Pod副本数达到用户预期的数目，以及基于Pod模板来重建Pod对象等，从而实现Pod对象的扩容、缩容、滚动更新和自愈能力。</p>
<p>例如，在某个节点故障，相关的控制器会将运行在该节点上的Pod对象重新调度到其他节点上进行重建。</p>
</blockquote>
<p>控制器本身也是一种资源类型，它们都统称为Pod控制器。如下图的Deployment就是这类控制器的代表实现，是目前用于管理无状态应用的Pod控制器。</p>
<p><img src="http://sm.nsddd.top/sm1363565-20200523180431487-339597555.png" alt="img"></p>
<p>Pod Controller的定义通常由期望的副本数量、Pod模板、标签选择器组成。Pod Controller会根据Labe Selector来对Pod对象的标签进行匹配筛选，所有满足选择条件的Pod都会被当前Controller进行管理并计入副本总数，确保数目能够达到预期的状态副本数。</p>
<blockquote>
<p>在实际的应用场景中，在接收到的请求流量负载低于或接近当前已有Pod副本的承载能力时，需要我们手动修改Pod控制器中的期望副本数量以实现应用规模的扩容和缩容。而在集群中部署了HeapSet或者Prometheus的这一类资源监控组件时，用户还可以通过HPA（HorizontalPodAutoscaler）来计算出合适的Pod副本数量，并自动地修改Pod控制器中期望的副本数，从而实现应用规模的动态伸缩，提高集群资源的利用率。</p>
</blockquote>
<p>K8S集群中的每个节点上都运行着<code v-pre>cAdvisor</code>，用于收集容器和节点的CPU、内存以及磁盘资源的利用率直播数据，这些统计数据由Metrics聚合之后可以通过API server访问。而<code v-pre>HorizontalPodAutoscaler</code>基于这些统计数据监控容器的健康状态并作出扩展决策。</p>
<h3 id="service服务资源" tabindex="-1"><a class="header-anchor" href="#service服务资源" aria-hidden="true">#</a> Service服务资源</h3>
<table>
<thead>
<tr>
<th>主要作用or功能</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>防止Pod失联</td>
<td>Service是建立在一组Pod对象之上的资源对象，在前面提过，它是通过Labe Selector选择一组Pod对象，并为这组Pod对象定义一个统一的固定访问入口（通常是一个IP地址），如果K8S存在DNS附件（如coredns）它就会在Service创建时为它自动配置一个DNS名称，用于客户端进行服务发现。</td>
</tr>
<tr>
<td>定义一组Pod的访问策略，代理Pod</td>
<td>通常我们直接请求Service IP，该请求就会被负载均衡到后端的端点，即各个Pod对象，即负载均衡器；因此Service本质上是一个4层的代理服务，另外Service还可以将集群外部流量引入至集群，这就需要节点对Service的端口进行映射了。</td>
</tr>
</tbody>
</table>
<p>Pod对象有Pod IP地址，但是该地址在对象重启或者重建之后随之改变，Pod IP地址的随机性给应用系统依赖关系维护创造了不小的麻烦。</p>
<blockquote>
<p>例如：前端Pod应用<code v-pre>Nginx</code>无法基于固定的IP地址负载后端的Pod应用<code v-pre>Tomcat</code>。</p>
</blockquote>
<p>Service资源就是在被访问的Pod对象中添加一个有着固定IP地址的中间层，客户端向该地址发起访问请求后，由相关的Service资源进行调度并代理到后端的Pod对象。</p>
<p>Service并不是一个具体的组件，而是一个通过规则定义出由多个Pod对象组成而成的逻辑集合，并附带着访问这组Pod对象的策略。Service对象挑选和关联Pod对象的方式和Pod控制器是一样的，都是通过标签选择器进行定义。</p>
<p><img src="http://sm.nsddd.top/sm1363565-20200523180459175-924096694.png" alt="img"></p>
<hr>
<p>Service IP是一种虚拟IP，也称为<code v-pre>Cluster IP</code>，专用于集群内通信</p>
<blockquote>
<p>通常使用专有的地址段，如：10.96.0.0/12网络，各Service对象的IP地址在该范围内由系统动态分配。</p>
</blockquote>
<p>集群内的Pod对象可直接请求这类<code v-pre>Cluster IP</code>，比如上图中来自Pod client的访问请求，可以通过Service的<code v-pre>Cluster IP</code>作为目标地址进行访问，但是在集群网络中是属于私有的网络地址，<strong>只能在集群内部访问</strong>。</p>
<p>通常我们需要的是外部的访问；将引入集群内部的常用方法是通过节点网络进行，其实现方法如下：</p>
<blockquote>
<ul>
<li>通过工作节点的IP地址+端口（Node Port）接入请求。</li>
<li>将该请求代理到相应的Service对象的Cluster IP的服务端口上，通俗地说：就是工作节点上的端口映射了Service的端口。</li>
<li>由Service对象将该请求转发到后端的Pod对象的Pod IP和 应用程序的监听端口。</li>
</ul>
</blockquote>
<p>因此，类似于上图来自External Client的集群外部客户端，是无法直接请求该Service的Cluster IP，而是需要实现经过某一工作节点Node的IP地址，此时请求需要2次转发才能到目标Pod对象。这一类访问的缺点就是在通信效率上有一定的延时。</p>
<h3 id="ingress" tabindex="-1"><a class="header-anchor" href="#ingress" aria-hidden="true">#</a> Ingress</h3>
<p>K8S将Pod对象和外部的网络环境进行了隔离，Pod和Service等对象之间的通信需要通过内部的专用地址进行</p>
<p>例如果需要将某些Pod对象提供给外部用户访问，则需要给这些Pod对象打开一个端口进行引入外部流量，除了Service以外，Ingress也是实现提供外部访问的一种方式。</p>
<h3 id="volume存储卷" tabindex="-1"><a class="header-anchor" href="#volume存储卷" aria-hidden="true">#</a> Volume存储卷</h3>
<p>存储卷（Volume）是独立于容器文件系统之外的存储空间，常用于扩展容器的存储空间并为其提供持久存储能力。</p>
<blockquote>
<p>存储卷在K8S中的分类为：</p>
<ol>
<li>临时卷</li>
<li>本地卷</li>
<li>网络卷</li>
</ol>
</blockquote>
<p>临时卷和本地卷都位于Node本地，一旦Pod被调度至其他Node节点，此类型的存储卷将无法被访问，因为临时卷和本地卷通常用于数据缓存，持久化的数据通常放置于持久卷（persistent volume）之中。</p>
<h3 id="name和namespace" tabindex="-1"><a class="header-anchor" href="#name和namespace" aria-hidden="true">#</a> Name和Namespace</h3>
<p>名称空间通常用于实现租户或项目的资源隔离，从而形成逻辑分组。关于此概念可以参考Docker文档中的概念https://www.jb51.net/article/136411.htm</p>
<p>如图：创建的Pod和Service等资源对象都属于名称空间级别，未指定时，都属于默认的名称空间<code v-pre>default</code></p>
<p><img src="http://sm.nsddd.top/sm1363565-20200523180512841-2018842328.png" alt="这个图片挂了⚠️ ~"></p>
<h3 id="annotation注解" tabindex="-1"><a class="header-anchor" href="#annotation注解" aria-hidden="true">#</a> Annotation注解</h3>
<p>Annotation是另一种附加在对象上的一种键值类型的数据，常用于将各种非标识型元数据（metadata）附加到对象上，但它并不能用于标识和选择对象。其作用是方便工具或用户阅读及查找。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '3.md' style='float:left'>⬆️上一节🔗  </a><a href = '5.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


