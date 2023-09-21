<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第58节-kubernetes-网络" tabindex="-1"><a class="header-anchor" href="#第58节-kubernetes-网络" aria-hidden="true">#</a> 第58节 Kubernetes 网络</h1>
<div><a href = '57.md' style='float:left'>⬆️上一节🔗  </a><a href = '59.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="kubernetes-网络基础" tabindex="-1"><a class="header-anchor" href="#kubernetes-网络基础" aria-hidden="true">#</a> Kubernetes 网络基础</h2>
<p>网络很难，Kubernetes 的网络更难，后面更是有复杂的网络分治，要理解实现，必须对Kubernetes的网络有着深入的了解。</p>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>Kubernetes 往深处挖必须要打好网络的基础，这个很重要 ~</p>
<p>从使用交换机、路由器和以太网电缆的物理网络迁移到使用软件定义网络（SDN）和虚拟接口的虚拟网络需要一段时间。当然，原则是相同的，但有不同的规范和最佳实践。Kubernetes有自己的一套规则，如果您要处理容器和云，了解Kubernetes网络的工作原理会有所帮助。</p>
<p>&quot;网络栈&quot; 包括了网卡（network interface)、回环设备（loopback device）、路由表（routing table） 和 iptables 的规则，这些是构成了网络的发起和响应的基本要素。</p>
<blockquote>
<p>网卡工作在 OSI 模型的第二层（数据链路层）和第一层（物理层），负责处理物理网络的数据流。网卡通常由网卡驱动程序控制，网卡驱动程序是运行在内核态的程序。用户态的应用程序可以通过套接字（socket）接口与内核空间的网络协议栈进行通信，从而通过网卡发送和接收网络数据包。在 Linux 系统中，用户态的应用程序通过套接字接口向内核空间发送网络数据包，并通过该接口接收来自内核空间的网络数据包。</p>
</blockquote>
</div>
<p><strong>这篇文章，我将收集 以下 资料进行整理、说明 💡：</strong></p>
<ul>
<li>《深入剖析Kubernetes》：Kubernetes 网络原理</li>
<li>刘超老师的 《趣谈<em>网络</em>协议》</li>
<li>https://opensource.com/article/22/6/kubernetes-networking-fundamentals</li>
<li>https://kubernetes.io/docs/concepts/cluster-administration/networking/</li>
<li>https://dramasamy.medium.com/life-of-a-packet-in-kubernetes-part-1-f9bc0909e051</li>
</ul>
<p><strong>这篇文章，最终会归纳到 docs: <a href="https://docker.nsddd.top" target="_blank" rel="noopener noreferrer">https://docker.nsddd.top<ExternalLinkIcon/></a></strong> Kubernetes / CloudNative</p>
<p>Kubernetes网络模型有几条一般规则需要牢记：</p>
<ol>
<li><strong>每个Pod都有自己的IP地址</strong>：不需要在Pod之间创建链接，也不需要将容器端口映射到主机端口。</li>
<li><strong>不需要NAT</strong>：节点上的Pod应能够与所有节点上的所有Pod通信，而无需NAT。</li>
<li><strong>Agents 获得所有访问权限</strong>：node 上的 agent（system daemons、Kubelet）可以与该节点中的所有Pod通信。</li>
<li><strong>共享命名空间</strong>：Pod中的容器共享网络名称空间（IP和MAC地址），因此它们可以使用环回地址相互通信。</li>
</ol>
<h3 id="kubernetes-中网络的解决方案" tabindex="-1"><a class="header-anchor" href="#kubernetes-中网络的解决方案" aria-hidden="true">#</a> Kubernetes 中网络的解决方案</h3>
<p>Kubernetes网络设计用于确保Kubernetes中的不同实体类型可以通信。Kubernetes基础设施的布局在设计上有很大的分离度。名称空间、容器和Pod旨在保持组件之间的区别，因此高度结构化的通信计划非常重要。</p>
<p><img src="http://sm.nsddd.top/sm202303101350246.png" alt="image-20230310135053049" title="Kubernetes网络方案图"></p>
<p><strong>网络是Kubernetes的核心部分，但要准确了解它的工作方式可能会很有挑战性。有4个不同的网络问题需要解决：</strong></p>
<ul>
<li>高度耦合的容器间通信：这个已经被 <a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/pods/" target="_blank" rel="noopener noreferrer">Pod<ExternalLinkIcon/></a> 和 <code v-pre>localhost</code> 通信解决了。</li>
<li>Pod 间通信：这是本文档讲述的重点。</li>
<li>Pod 与 Service 间通信：涵盖在 <a href="https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/" target="_blank" rel="noopener noreferrer">Service<ExternalLinkIcon/></a> 中。</li>
<li>外部与 Service 间通信：也涵盖在 Service 中。</li>
</ul>
<p>Kubernetes完全是为了在应用程序之间共享机器。通常，共享计算机需要确保两个应用程序不会尝试使用相同的端口。跨多个开发人员协调端口非常难以大规模进行，并且会使用户面临超出其控制范围的群集级问题。</p>
<h3 id="container-to-container-networking" tabindex="-1"><a class="header-anchor" href="#container-to-container-networking" aria-hidden="true">#</a> Container-to-container networking</h3>
<p>容器到容器的网络连接通过Pod namespace 进行。<strong>namespace空间允许您拥有独立的网络接口和路由表，它们与系统的其余部分隔离并独立运行。</strong> 每个Pod都有自己的网络名称空间，Pod内的容器共享相同的IP地址和端口。<strong>这些容器之间的所有通信都通过localhost进行，因为它们都是同一名称空间的一部分。</strong>（上图中以绿色线表示。）</p>
<p>我们在前面某一节有学过 docker 的网络知识，这很重要不是嘛👀 。我们尝试启动 container:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-net</span><span class="token operator">=</span>host <span class="token parameter variable">--name</span> nginx-host nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>我们尝试启动 nginx，但是这种情况下我们知道启动的默认端口是宿主机的 80 端口。</p>
</blockquote>
<p><strong>这种方式，虽然和主机使用同一个 网络栈，可以为容器提供良好的网络性能，但是可能会带来共享网络资源带来的一系列问题，如网络隔离性、网络的端口冲突，记得我们的解决方案就是 ： Network Namespece.</strong></p>
<p>docker 中在宿主机创建一个 叫 <code v-pre>docker0</code> 的网桥，凡是和 <code v-pre>docker0</code> 链接的容器，都可以用它来通信，而容器链接到 <code v-pre>docker0</code> 的方式，就更加微妙了，使用的方式是 <code v-pre>Veth Pair</code> 的虚拟设备。</p>
<blockquote>
<p>在 Docker 中，Veth Pair（或称 Veth 对）是一种虚拟网络设备，它由一对虚拟网卡组成，一端连接到 Docker 容器中的网络命名空间，另一端连接到宿主机的网络命名空间。Veth Pair 提供了一种简单而高效的方式，让容器和宿主机之间可以进行网络通信。</p>
<p>Veth Pair 的一个重要特点是，它们是成对出现的，一端连接到 Docker 容器中，另一端连接到宿主机中。由于 Veth Pair 是虚拟设备，所以它们不会占用宿主机中的物理网络接口，从而可以避免网络资源的浪费。</p>
</blockquote>
<h3 id="pod-to-pod-networking" tabindex="-1"><a class="header-anchor" href="#pod-to-pod-networking" aria-hidden="true">#</a> Pod-to-Pod networking</h3>
<p>使用Kubernetes时，每个节点都有指定的Pod IP CIDR范围。这可确保每个Pod都收到群集中其他Pod可以看到的唯一IP地址。创建新Pod时，IP地址决不会重叠。与容器到容器网络不同，Pod到Pod通信使用真实的IP，无论您将Pod部署在群集中的同一节点还是不同节点上。</p>
<p>上图中显示，<strong>Pod要相互通信，流量必须在 Pod 网络命名空间和根网络命名空间（root network namespace）之间流动</strong>。这是通过虚拟以太网设备或veth对（图中veth0到Pod命名空间1，veth1到Pod命名空间2）连接Pod命名空间和根命名空间来实现的。虚拟网桥连接这些虚拟接口，允许流量使用地址解析协议（ARP） 在它们之间流动。</p>
<p><strong>当数据从Pod 1发送到Pod 2时，事件流为：</strong></p>
<ol>
<li>Pod 1流量通过eth0流向根网络命名空间的虚拟接口veth0。</li>
<li>然后，流量通过veth0到达连接到veth1的虚拟网桥。</li>
<li>流量通过虚拟网桥到达veth1。</li>
<li>最后，流量通过veth1到达Pod 2的eth0接口。</li>
</ol>
<h3 id="pod-to-service-networking" tabindex="-1"><a class="header-anchor" href="#pod-to-service-networking" aria-hidden="true">#</a> Pod-to-Service networking</h3>
<p>虽然 pod 的 address 是唯一的，但是pod 是非常动态的。它们可能需要根据需求进行扩展或缩减。在应用程序崩溃或节点故障的情况下，可以重新创建它们。这些事件会导致Pod的IP地址发生变化，这将使联网成为一个挑战。</p>
<p><img src="http://sm.nsddd.top/sm202303101432580.png" alt="image-20230310143159337"></p>
<p><strong>我们要解决 pod 的动态问题，那么就需要：</strong></p>
<ol>
<li>在前端分配静态虚拟IP地址（virtual IP：VIP），以连接与服务关联的任何后端Pod。</li>
<li>将寻址到此虚拟IP的任何流量负载平衡到后端Pod集。</li>
<li>跟踪Pod的IP地址，这样即使Pod IP地址发生变化，客户端也不会在连接Pod时遇到任何问题，因为它们只直接连接到服务本身的静态虚拟IP地址。</li>
</ol>
<p><strong>群集内负载平衡以两种方式进行：</strong></p>
<ol>
<li><code v-pre>Iptables</code>：在此模式下，kube-proxy监视API服务器中的更改。对于每个新服务，它都安装iptables规则，这些规则捕获到服务的clusterIP和端口的流量，然后将流量重定向到服务的后端Pod。Pod是随机选择的。这种模式很可靠，而且系统开销较低，因为Linux Netfilter无需在用户空间和内核空间之间切换即可处理流量。</li>
<li><code v-pre>IPVS</code>：<strong>IPVS构建在Netfilter之上，实现传输层负载平衡</strong>。IPVS使用<code v-pre>Netfilter Hook</code>  函数，使用 <code v-pre>hash tables</code> 作为底层数据结构，并在内核空间中工作。这意味着IPVS模式下的 <code v-pre>kube-proxy</code> 重定向流量比iptables模式下的kube-proxy具有更低的延迟、更高的吞吐量和更好的性能。</li>
</ol>
<blockquote>
<p>上图显示了从Pod 1到Pod 3，通过服务到不同节点（用红色标记）的包流。由于网桥上运行的 RPC 无法理解服务，因此传输到虚拟网桥的包必须使用默认路由（eth0)。稍后，必须通过iptables过滤这些包，iptables使用kube-proxy在节点中定义的规则。因此，图中显示的是路径。</p>
</blockquote>
<h3 id="internet-to-service-networking" tabindex="-1"><a class="header-anchor" href="#internet-to-service-networking" aria-hidden="true">#</a> Internet-to-Service networking</h3>
<p>到目前为止，我已经讨论了如何在集群中路由流量。不过，Kubernetes网络还有另一面，那就是将应用程序暴露给外部网络。</p>
<p><img src="http://sm.nsddd.top/sm202303101441314.png" alt="image-20230310144018105"></p>
<p><strong>可以通过两种不同的方式将应用程序公开给外部网络:</strong></p>
<ol>
<li>Egress：当您希望将流量从Kubernetes服务路由到Internet时，请使用此选项。在本例中，iptables执行源NAT，因此流量似乎来自节点而不是Pod。</li>
<li>Ingress：这是从外部世界到服务的传入流量。入口还使用连接规则允许和阻止与服务的特定通信。通常，存在两种在不同网络堆栈区域上起作用的入口解决方案：服务负载均衡器和入口控制器。</li>
</ol>
<h2 id="服务发现-discovering-services" tabindex="-1"><a class="header-anchor" href="#服务发现-discovering-services" aria-hidden="true">#</a> 服务发现（Discovering Services ）</h2>
<p>Kubernetes提供了一种机制来自动管理容器和服务之间的网络连接，这被称为服务发现。服务发现允许容器和服务互相发现彼此的存在和位置，从而使它们可以进行通信。</p>
<p><strong>Kubernetes 服务发现的方式有两种：</strong></p>
<ul>
<li><strong>环境变量</strong>：Pod所在节点上运行 的<code v-pre>kubelet</code>服务负责为每个活动服务设置<code v-pre>{SVCNAME}_SERVICE_HOST</code>和<code v-pre>{SVCNAME}_SERVICE_PORT</code>格式的环境变量。必须在客户端Pod出现之前创建服务。否则，这些客户机Pod将不会填充其环境变量。</li>
<li><strong>DNS</strong>：DNS服务作为映射到一个或多个DNS服务器Pod的Kubernetes服务实现，这些Pod的调度与任何其他Pod一样。群集中的Pod配置为使用DNS服务，DNS搜索列表包括Pod自己的命名空间和群集的默认域。支持群集的DNS服务器（如CoreDNS）会监视Kubernetes API中的新服务，并为每个服务创建一组DNS记录。如果在整个群集中启用了DNS，则所有Pod都可以通过其DNS名称自动解析服务。Kubernetes DNS服务器是访问ExternalName服务的唯一途径。</li>
</ul>
<p>此外，Kubernetes还提供了一些特殊的服务发现机制，以便更好地管理服务。例如，可以使用Kubernetes服务对象来定义一组相关的Pod，并为它们分配一个唯一的名称和IP地址。这使得其他服务可以使用该名称来访问这组Pod，而不必担心它们的IP地址会发生变化。</p>
<p>Kubernetes还支持在服务发现过程中使用负载均衡器，以便更好地管理流量。负载均衡器可以根据特定的规则将流量分发到多个容器或服务中，从而确保它们之间的负载均衡和高可用性。</p>
<p>另外，Kubernetes还支持自定义服务发现插件，以便更好地满足特定应用程序的需求。例如，可以使用自定义插件来实现跨多个Kubernetes集群的服务发现。</p>
<h3 id="kubernetes-服务发布" tabindex="-1"><a class="header-anchor" href="#kubernetes-服务发布" aria-hidden="true">#</a> Kubernetes 服务发布</h3>
<p>Kubernetes服务为你提供了一种访问Pod组的方法，通常使用标签选择器进行定义。这可能是试图访问集群中其他应用程序的应用程序，也可能允许您将集群中运行的应用程序公开给外部世界。Kubernetes 服务类型允许您指定所需的服务类型。</p>
<p><img src="http://sm.nsddd.top/sm202303101453168.png" alt="image-20230310145316045"></p>
<p><strong>不同的服务类型包括：</strong></p>
<ol>
<li><strong>ClusterIP</strong>：这是默认的服务类型。它使服务只能从集群内访问，并允许集群内的应用程序相互通信。没有外部访问。</li>
<li><strong>LoadBalancer（负载均衡器）</strong>：此ServiceType使用云提供商的负载平衡器向外部公开服务。来自外部负载平衡器的流量被定向到后端Pod。云提供商决定如何进行负载平衡。</li>
<li><strong>NodePort</strong>：这允许外部流量通过打开所有节点上的特定端口来访问服务。发送到该端口的任何流量随后将转发到服务。</li>
<li><strong>ExternalName（外部名称）</strong>：此类型的服务通过使用externalName字段的内容将服务映射到DNS名称，方法是返回CNAME记录及其值。不设置任何类型的代理。</li>
</ol>
<h2 id="cni" tabindex="-1"><a class="header-anchor" href="#cni" aria-hidden="true">#</a> CNI</h2>
<ul>
<li><RouterLink to="/Cloud-Native-k8s/53.html#CNI">在前面我们讲过 namespces</RouterLink></li>
<li><a href="https://github.com/containernetworking/cni" target="_blank" rel="noopener noreferrer">CNI  github<ExternalLinkIcon/></a></li>
</ul>
<p>在任何Linux操作系统中，使用 <code v-pre>ip</code> 命令创建网络名称空间都非常容易。让我们创建两个不同的网络名称空间，并将它们命名为client和server。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">ip</span> netns <span class="token function">add</span> client
❯ <span class="token function">ip</span> netns <span class="token function">add</span> server
❯ <span class="token function">ip</span> netns list
server
client
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>删除 namespace 命令：<code v-pre>ip netns delete &lt;namespace_name&gt;</code></p>
</blockquote>
<p><img src="http://sm.nsddd.top/sm202303101516295.png" alt="image-20230310151650219"></p>
<p>创建 <code v-pre>veth</code> 对以连接这些网络命名空间。将 <code v-pre>veth</code> 线对视为两端都有连接器的网线（我们在前面讲过 veth)。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">ip</span> <span class="token function">link</span> <span class="token function">add</span> veth-client <span class="token builtin class-name">type</span> veth peer name veth-server
❯ <span class="token function">ip</span> <span class="token function">link</span> list <span class="token operator">|</span> <span class="token function">grep</span> veth
<span class="token number">12</span>: veth-server@veth-client: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,M-DOWN<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc noop state DOWN mode DEFAULT group default qlen <span class="token number">1000</span>
<span class="token number">13</span>: veth-client@veth-server: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,M-DOWN<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc noop state DOWN mode DEFAULT group default qlen <span class="token number">1000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/sm202303101517622.png" alt="image-20230310151749562"></p>
<p><code v-pre>veth</code> 对（电缆）存在于主机网络命名空间中，现在，让我们将 <code v-pre>veth</code> 对的两端移到前面创建的它们各自的名称空间中。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> veth-client netns client
❯ <span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> veth-server netns server
❯ <span class="token function">ip</span> <span class="token function">link</span> list <span class="token operator">|</span> <span class="token function">grep</span> veth <span class="token comment"># doesn’t exist on the host network namespace now</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/sm202303101518387.png" alt="image-20230310151854318"></p>
<p>让我们验证 <code v-pre>veth</code> 结束实际上存在于名称空间中。我们将从 <code v-pre>client</code> 名称空间开始</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">ip</span> netns <span class="token builtin class-name">exec</span> client <span class="token function">ip</span> <span class="token function">link</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK<span class="token operator">></span> mtu <span class="token number">65536</span> qdisc noop state DOWN mode DEFAULT group default qlen <span class="token number">1000</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
<span class="token number">13</span>: veth-client@if12: <span class="token operator">&lt;</span>BROADCAST,MULTICAST<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc noop state DOWN mode DEFAULT group default qlen <span class="token number">1000</span>
    link/ether <span class="token number">16</span>:8c:9a:f4:34:5d brd ff:ff:ff:ff:ff:ff link-netns server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们检查 <code v-pre>server</code> 名称空间</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">ip</span> netns <span class="token builtin class-name">exec</span> server <span class="token function">ip</span> <span class="token function">link</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK<span class="token operator">></span> mtu <span class="token number">65536</span> qdisc noop state DOWN mode DEFAULT group default qlen <span class="token number">1000</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
<span class="token number">12</span>: veth-server@if13: <span class="token operator">&lt;</span>BROADCAST,MULTICAST<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc noop state DOWN mode DEFAULT group default qlen <span class="token number">1000</span>
    link/ether 4a:36:cf:93:eb:d3 brd ff:ff:ff:ff:ff:ff link-netns client
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，让我们为这些接口分配IP地址并将其设置为启用状态</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">ip</span> netns <span class="token builtin class-name">exec</span> client <span class="token function">ip</span> address <span class="token function">add</span> <span class="token number">10.0</span>.0.11/24 dev veth-client
❯ <span class="token function">ip</span> netns <span class="token builtin class-name">exec</span> client <span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> veth-client up
❯ <span class="token function">ip</span> netns <span class="token builtin class-name">exec</span> server <span class="token function">ip</span> <span class="token function">link</span> <span class="token builtin class-name">set</span> veth-server up
❯ <span class="token function">ip</span> netns <span class="token builtin class-name">exec</span> server <span class="token function">ip</span> address <span class="token function">add</span> <span class="token number">10.0</span>.0.12/24 dev veth-server
❯ <span class="token function">ip</span> netns <span class="token builtin class-name">exec</span> client <span class="token function">ip</span> addr
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK<span class="token operator">></span> mtu <span class="token number">65536</span> qdisc noop state DOWN group default qlen <span class="token number">1000</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
<span class="token number">13</span>: veth-client@if12: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc noqueue state UP group default qlen <span class="token number">1000</span>
    link/ether <span class="token number">16</span>:8c:9a:f4:34:5d brd ff:ff:ff:ff:ff:ff link-netns server
    inet <span class="token number">10.0</span>.0.11/24 scope global veth-client
       valid_lft forever preferred_lft forever
    inet6 fe80::148c:9aff:fef4:345d/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>继续看服务端 IP：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">ip</span> netns <span class="token builtin class-name">exec</span> server <span class="token function">ip</span> addr
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK<span class="token operator">></span> mtu <span class="token number">65536</span> qdisc noop state DOWN group default qlen <span class="token number">1000</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
<span class="token number">12</span>: veth-server@if13: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc noqueue state UP group default qlen <span class="token number">1000</span>
    link/ether 4a:36:cf:93:eb:d3 brd ff:ff:ff:ff:ff:ff link-netns client
    inet <span class="token number">10.0</span>.0.12/24 scope global veth-server
       valid_lft forever preferred_lft forever
    inet6 fe80::4836:cfff:fe93:ebd3/64 scope <span class="token function">link</span> 
       valid_lft forever preferred_lft forever
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/sm202303101522150.png" alt="image-20230310152215060"></p>
<p>使用ping命令，我们可以验证两个网络名称空间已经连接并且可以访问，</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">ip</span> netns <span class="token builtin class-name">exec</span> client <span class="token function">ping</span> <span class="token number">10.0</span>.0.12
PING <span class="token number">10.0</span>.0.12 <span class="token punctuation">(</span><span class="token number">10.0</span>.0.12<span class="token punctuation">)</span> <span class="token number">56</span><span class="token punctuation">(</span><span class="token number">84</span><span class="token punctuation">)</span> bytes of data.
<span class="token number">64</span> bytes from <span class="token number">10.0</span>.0.12: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.102</span> ms
<span class="token number">64</span> bytes from <span class="token number">10.0</span>.0.12: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.036</span> ms
<span class="token number">64</span> bytes from <span class="token number">10.0</span>.0.12: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">3</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.038</span> ms
<span class="token number">64</span> bytes from <span class="token number">10.0</span>.0.12: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">4</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.037</span> ms
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们想创建更多的网络名称空间并将它们连接在一起，为名称空间的每个组合创建 <code v-pre>veth</code> 对可能不是一个可伸缩的解决方案。相反，可以创建一个Linux桥，并将这些网络名称空间连接到桥以获得连接。这正是Docker在同一主机上运行的容器之间建立网络的方式！</p>
<p>让我们创建名称空间并将其附加到 bridge。</p>
<p><img src="http://sm.nsddd.top/sm202303101523717.png" alt="image-20230310152321642"></p>
<h3 id="如何从外部服务器访问专用网络" tabindex="-1"><a class="header-anchor" href="#如何从外部服务器访问专用网络" aria-hidden="true">#</a> 如何从外部服务器访问专用网络？</h3>
<p>让我们使用Docker来模拟该场景。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> web <span class="token parameter variable">--rm</span> nginx
$ <span class="token assign-left variable">WEB_IP</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">docker</span> inspect <span class="token parameter variable">-f</span> <span class="token string">"{{ .NetworkSettings.IPAddress }}"</span> web<span class="token variable">`</span></span>
$ <span class="token function">docker</span> inspect web <span class="token parameter variable">--format</span> <span class="token string">'{{ .NetworkSettings.SandboxKey }}'</span>
/var/run/docker/netns/c009f2a4be71
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于Docker不会在默认位置创建 <code v-pre>**netns**</code> ，因此 <code v-pre>**ip netns list**</code> 不会显示此网络名称空间。我们可以创建一个指向预期位置的符号链接来克服这个限制。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>client$ <span class="token assign-left variable">container_id</span><span class="token operator">=</span>web
client$ <span class="token assign-left variable">container_netns</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> inspect $<span class="token punctuation">{</span>container_id<span class="token punctuation">}</span> <span class="token parameter variable">--format</span> <span class="token string">'{{ .NetworkSettings.SandboxKey }}'</span><span class="token variable">)</span></span>
client$ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/run/netns
client$ <span class="token function">rm</span> <span class="token parameter variable">-f</span> /var/run/netns/<span class="token variable">${container_id}</span>
client$ <span class="token function">ln</span> <span class="token parameter variable">-sv</span> <span class="token variable">${container_netns}</span> /var/run/netns/<span class="token variable">${container_id}</span>
<span class="token string">'/var/run/netns/web'</span> -<span class="token operator">></span> <span class="token string">'/var/run/docker/netns/c009f2a4be71'</span>
client$ <span class="token function">ip</span> netns list
web <span class="token punctuation">(</span>id: <span class="token number">3</span><span class="token punctuation">)</span>
server1 <span class="token punctuation">(</span>id: <span class="token number">1</span><span class="token punctuation">)</span>
client1 <span class="token punctuation">(</span>id: <span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>检查Web名称空间中的IP地址</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ip</span> netns <span class="token builtin class-name">exec</span> web <span class="token function">ip</span> addr
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">></span> mtu <span class="token number">65536</span> qdisc noqueue state UNKNOWN group default qlen <span class="token number">1</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
<span class="token number">11</span>: eth0@if12: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc noqueue state UP group default
    link/ether 02:42:ac:12:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid <span class="token number">0</span>
    inet <span class="token number">172.18</span>.0.3/24 brd <span class="token number">172.18</span>.0.255 scope global eth0
       valid_lft forever preferred_lft forever
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们来检查一下Docker容器中的IP地址</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">WEB_IP</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">docker</span> inspect <span class="token parameter variable">-f</span> <span class="token string">"{{ .NetworkSettings.IPAddress }}"</span> web<span class="token variable">`</span></span>
client$ <span class="token builtin class-name">echo</span> <span class="token variable">$WEB_IP</span>
<span class="token number">172.18</span>.0.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很明显，Docker使用所有Linux名称空间，并将内容与主机隔离。让我们尝试从HOST服务器访问在web网络名称空间中运行的WebApp。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>client$ <span class="token function">curl</span> <span class="token variable">$WEB_IP</span>
<span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">></span>
<span class="token operator">&lt;</span>html<span class="token operator">></span>
<span class="token operator">&lt;</span>head<span class="token operator">></span>
<span class="token operator">&lt;</span>title<span class="token operator">></span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/title<span class="token operator">></span>
<span class="token operator">&lt;</span>style<span class="token operator">></span>
    body <span class="token punctuation">{</span>
        width: 35em<span class="token punctuation">;</span>
        margin: <span class="token number">0</span> auto<span class="token punctuation">;</span>
        font-family: Tahoma, Verdana, Arial, sans-serif<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span>/style<span class="token operator">></span>
<span class="token operator">&lt;</span>/head<span class="token operator">></span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span>h<span class="token operator"><span class="token file-descriptor important">1</span>></span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/h<span class="token operator"><span class="token file-descriptor important">1</span>></span>
<span class="token operator">&lt;</span>p<span class="token operator">></span>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.<span class="token operator">&lt;</span>/p<span class="token operator">></span>
<span class="token operator">&lt;</span>p<span class="token operator">></span>For online documentation and support please refer to
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">"http://nginx.org/"</span><span class="token operator">></span>nginx.org<span class="token operator">&lt;</span>/a<span class="token operator">></span>.<span class="token operator">&lt;</span>br/<span class="token operator">></span>
Commercial support is available at
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">"http://nginx.com/"</span><span class="token operator">></span>nginx.com<span class="token operator">&lt;</span>/a<span class="token operator">></span>.<span class="token operator">&lt;</span>/p<span class="token operator">></span>
<span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token operator">&lt;</span>em<span class="token operator">></span>Thank you <span class="token keyword">for</span> using nginx.<span class="token operator">&lt;</span>/em<span class="token operator">></span><span class="token operator">&lt;</span>/p<span class="token operator">></span>
<span class="token operator">&lt;</span>/body<span class="token operator">></span>
<span class="token operator">&lt;</span>/html<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>是否可以从外部网络访问此Web服务器？是的，通过添加端口转发。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ iptables <span class="token parameter variable">-t</span> nat <span class="token parameter variable">-A</span> PREROUTING <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> 
$ <span class="token builtin class-name">echo</span> <span class="token variable">$HOST_IP</span>
<span class="token number">172.17</span>.0.23
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>让我们尝试使用主机IP地址访问Web服务器。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token number">172.17</span>.0.23
<span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">></span>
<span class="token operator">&lt;</span>html<span class="token operator">></span>
<span class="token operator">&lt;</span>head<span class="token operator">></span>
<span class="token operator">&lt;</span>title<span class="token operator">></span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/title<span class="token operator">></span>
<span class="token operator">&lt;</span>style<span class="token operator">></span>
    body <span class="token punctuation">{</span>
        width: 35em<span class="token punctuation">;</span>
        margin: <span class="token number">0</span> auto<span class="token punctuation">;</span>
        font-family: Tahoma, Verdana, Arial, sans-serif<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">&lt;</span>/style<span class="token operator">></span>
<span class="token operator">&lt;</span>/head<span class="token operator">></span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span>h<span class="token operator"><span class="token file-descriptor important">1</span>></span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/h<span class="token operator"><span class="token file-descriptor important">1</span>></span>
<span class="token operator">&lt;</span>p<span class="token operator">></span>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.<span class="token operator">&lt;</span>/p<span class="token operator">></span>
<span class="token operator">&lt;</span>p<span class="token operator">></span>For online documentation and support please refer to
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">"http://nginx.org/"</span><span class="token operator">></span>nginx.org<span class="token operator">&lt;</span>/a<span class="token operator">></span>.<span class="token operator">&lt;</span>br/<span class="token operator">></span>
Commercial support is available at
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">"http://nginx.com/"</span><span class="token operator">></span>nginx.com<span class="token operator">&lt;</span>/a<span class="token operator">></span>.<span class="token operator">&lt;</span>/p<span class="token operator">></span>
<span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token operator">&lt;</span>em<span class="token operator">></span>Thank you <span class="token keyword">for</span> using nginx.<span class="token operator">&lt;</span>/em<span class="token operator">></span><span class="token operator">&lt;</span>/p<span class="token operator">></span>
<span class="token operator">&lt;</span>/body<span class="token operator">></span>
<span class="token operator">&lt;</span>/html<span class="token operator">></span>
node01 $
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/sm202303101623625.png" alt="image-20230310162317474"></p>
<h3 id="cni-1" tabindex="-1"><a class="header-anchor" href="#cni-1" aria-hidden="true">#</a> CNI</h3>
<p>“CNI插件负责将网络接口插入容器网络名称空间（例如，veth对的一端），并在主机上进行任何必要的更改（例如，将veth的另一端连接到网桥）。然后，它应将IP分配给接口，并通过调用相应的IPAM插件设置与IP地址管理部分一致的路由。”</p>
<p>CNI（容器网络接口）是云原生计算基金会的一个项目，由一个规范和库组成，用于编写插件来配置Linux容器中的网络接口，沿着许多受支持的插件。CNI只关心容器的网络连通性，并在删除容器时移除分配的资源。由于这一重点，CNI得到了广泛的支持，并且规范易于实现。</p>
<p><img src="http://sm.nsddd.top/sm202303101624384.png" alt="image-20230310162410292"></p>
<p>注意：运行时可以是任何东西-例如 Kubernetes, PodMan, cloud foundry, etc</p>
<h3 id="创建-cni" tabindex="-1"><a class="header-anchor" href="#创建-cni" aria-hidden="true">#</a> 创建 CNI</h3>
<p><strong>步骤1：下载CNI插件</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>client$ <span class="token function">mkdir</span> cni
client$ <span class="token builtin class-name">cd</span> cni
client$ <span class="token function">curl</span> <span class="token parameter variable">-O</span> <span class="token parameter variable">-L</span> https://github.com/containernetworking/cni/releases/download/v0.4.0/cni-amd64-v0.4.0.tgz
client$ <span class="token function">tar</span> <span class="token parameter variable">-xvf</span> cni-amd64-v0.4.0.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤2：创建JSON格式的CNI配置</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>cat <span class="token punctuation">></span> /tmp/00<span class="token punctuation">-</span>demo.conf &lt;&lt;"EOF"
<span class="token punctuation">{</span>
    <span class="token key atrule">"cniVersion"</span><span class="token punctuation">:</span> <span class="token string">"0.2.0"</span><span class="token punctuation">,</span>
    <span class="token key atrule">"name"</span><span class="token punctuation">:</span> <span class="token string">"demo_br"</span><span class="token punctuation">,</span>
    <span class="token key atrule">"type"</span><span class="token punctuation">:</span> <span class="token string">"bridge"</span><span class="token punctuation">,</span>
    <span class="token key atrule">"bridge"</span><span class="token punctuation">:</span> <span class="token string">"cni_net0"</span><span class="token punctuation">,</span>
    <span class="token key atrule">"isGateway"</span><span class="token punctuation">:</span> <span class="token boolean important">true</span><span class="token punctuation">,</span>
    <span class="token key atrule">"ipMasq"</span><span class="token punctuation">:</span> <span class="token boolean important">true</span><span class="token punctuation">,</span>
    <span class="token key atrule">"ipam"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token key atrule">"type"</span><span class="token punctuation">:</span> <span class="token string">"host-local"</span><span class="token punctuation">,</span>
        <span class="token key atrule">"subnet"</span><span class="token punctuation">:</span> <span class="token string">"10.0.10.0/24"</span><span class="token punctuation">,</span>
        <span class="token key atrule">"routes"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span> <span class="token key atrule">"dst"</span><span class="token punctuation">:</span> <span class="token string">"0.0.0.0/0"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span> <span class="token key atrule">"dst"</span><span class="token punctuation">:</span> <span class="token string">"1.1.1.1/32"</span><span class="token punctuation">,</span> "gw"<span class="token punctuation">:</span><span class="token string">"10.0.10.1"</span><span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>CNI配置参数</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>-:CNI generic parameters:-
cniVersion: The version of the CNI spec in which the definition works with
name: The network name
type: The name of the plugin you wish to use.  In this case, the actual name of the plugin executable
args: Optional additional parameters
ipMasq: Configure outbound masquerade (source NAT) for this network
ipam:
    type: The name of the IPAM plugin executable
    subnet: The subnet to allocate out of (this is actually part of the IPAM plugin)
    routes:
        dst: The subnet you wish to reach
        gw: The IP address of the next hop to reach the dst.  If not specified the default gateway for the subnet is assumed
dns:
    nameservers: A list of nameservers you wish to use with this network
    domain: The search domain to use for DNS requests
    search: A list of search domains
    options: A list of options to be passed to the receiver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>步骤3：创建一个网络为“<strong>none</strong>”的容器，这样容器就不会有任何IP地址可供使用。您可以为这个容器使用任何图像，但是，我使用'<strong>pause</strong>'容器来模拟Kubernetes。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>controlplane $ <span class="token function">docker</span> run <span class="token parameter variable">--name</span> pause_demo <span class="token parameter variable">-d</span> <span class="token parameter variable">--rm</span> <span class="token parameter variable">--network</span> none kubernetes/pause
controlplane $ <span class="token assign-left variable">container_id</span><span class="token operator">=</span>pause_demo
controlplane $ <span class="token assign-left variable">container_netns</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> inspect $<span class="token punctuation">{</span>container_id<span class="token punctuation">}</span> <span class="token parameter variable">--format</span> <span class="token string">'{{ .NetworkSettings.SandboxKey }}'</span><span class="token variable">)</span></span>
controlplane $ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/run/netns
controlplane $ <span class="token function">rm</span> <span class="token parameter variable">-f</span> /var/run/netns/<span class="token variable">${container_id}</span>
controlplane $ <span class="token function">ln</span> <span class="token parameter variable">-sv</span> <span class="token variable">${container_netns}</span> /var/run/netns/<span class="token variable">${container_id}</span>
<span class="token string">'/var/run/netns/pause_demo'</span> -<span class="token operator">></span> <span class="token string">'/var/run/docker/netns/0297681f79b5'</span>
controlplane $ <span class="token function">ip</span> netns list
pause_demo
controlplane $ <span class="token function">ip</span> netns <span class="token builtin class-name">exec</span> <span class="token variable">$container_id</span> <span class="token function">ifconfig</span>
lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:0 erbashrors:0 dropped:0 overruns:0 frame:0
          TX packets:0 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1
          RX bytes:0 <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>  TX bytes:0 <span class="token punctuation">(</span><span class="token number">0.0</span> B<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>步骤4：使用CNI配置文件调用CNI插件</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">CNI_CONTAINERID</span><span class="token operator">=</span><span class="token variable">$container_id</span> <span class="token assign-left variable">CNI_IFNAME</span><span class="token operator">=</span>eth10 <span class="token assign-left variable">CNI_COMMAND</span><span class="token operator">=</span>ADD <span class="token assign-left variable">CNI_NETNS</span><span class="token operator">=</span>/var/run/netns/<span class="token variable">$container_id</span> <span class="token assign-left variable">CNI_PATH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">pwd</span><span class="token variable">`</span></span> ./bridge <span class="token operator">&lt;</span>/tmp/00-demo.conf
<span class="token number">2020</span>/10/17 <span class="token number">17</span>:32:37 Error retriving last reserved ip: Failed to retrieve last reserved ip: <span class="token function">open</span> /var/lib/cni/networks/demo_br/last_reserved_ip: no such <span class="token function">file</span> or directory
<span class="token punctuation">{</span>
    <span class="token string">"ip4"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">"ip"</span><span class="token builtin class-name">:</span> <span class="token string">"10.0.10.2/24"</span>,
        <span class="token string">"gateway"</span><span class="token builtin class-name">:</span> <span class="token string">"10.0.10.1"</span>,
        <span class="token string">"routes"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token string">"dst"</span><span class="token builtin class-name">:</span> <span class="token string">"0.0.0.0/0"</span>
            <span class="token punctuation">}</span>,
            <span class="token punctuation">{</span>
                <span class="token string">"dst"</span><span class="token builtin class-name">:</span> <span class="token string">"1.1.1.1/32"</span>,
                <span class="token string">"gw"</span><span class="token builtin class-name">:</span> <span class="token string">"10.0.10.1"</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>,
    <span class="token string">"dns"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '57.md' style='float:left'>⬆️上一节🔗  </a><a href = '59.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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
