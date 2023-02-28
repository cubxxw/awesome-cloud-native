<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第-37-节-一些疑问和解答-2" tabindex="-1"><a class="header-anchor" href="#第-37-节-一些疑问和解答-2" aria-hidden="true">#</a> 第 37 节 一些疑问和解答 2</h1>
<div><a href = '36.md' style='float:left'>⬆️上一节🔗  </a><a href = '38.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="kubernetes-的网络插件是什么意思-为什么需要它" tabindex="-1"><a class="header-anchor" href="#kubernetes-的网络插件是什么意思-为什么需要它" aria-hidden="true">#</a> Kubernetes 的网络插件是什么意思，为什么需要它？</h2>
<p>Kubernetes 的网络插件是用来让容器间的网络通信和容器与外界的网络通信的。</p>
<p>当你使用 Kubernetes 部署应用的时候，你的应用可能由多个容器组成。比如，一个三层的应用可能由一个 Web 服务器容器，一个数据库容器和一个缓存容器组成。这些容器需要相互通信来协同工作，因此需要一个网络插件来提供容器间的网络通信。</p>
<p>此外，这些容器还需要与外界进行网络通信，比如容器可能需要访问互联网上的服务或者允许外界的设备访问容器内的应用。因此，网络插件还需要支持容器与外界的网络通信。</p>
<p>Kubernetes 本身并不提供网络插件，而是允许用户选择适合自己的网络插件。常用的网络插件包括 Cilium、Calico、Flannel 等。</p>
<p>之所以把网络功能称作&quot;插件&quot;，是因为它可以作为一个可插拔的模块来集成到 Kubernetes 的网络层中。</p>
<p>你可以自由选择适合自己的网络插件，并且可以在不重新部署应用的情况下替换网络插件。这使得网络插件具有很大的灵活性，可以根据不同的环境和应用需求来选择最合适的网络插件。</p>
<h2 id="能同时部署多个网络插件吗" tabindex="-1"><a class="header-anchor" href="#能同时部署多个网络插件吗" aria-hidden="true">#</a> 能同时部署多个网络插件吗</h2>
<p>在同一个 Kubernetes 集群中，不能同时部署多个网络插件。</p>
<p>在 Kubernetes 中，网络插件是对整个集群范围内所有节点的网络进行配置的，因此集群内的所有节点都必须使用同一种网络插件。</p>
<p>如果你想要在一个集群内使用不同的网络插件，你可以使用多个集群，每个集群使用一种网络插件。</p>
<p>如果不部署网络插件，Kubernetes 集群中的容器将无法进行网络通信。</p>
<p>在 Kubernetes 中，每个容器都是在一个虚拟网络中运行的，并且容器间的网络通信是通过网络插件实现的。如果没有网络插件，容器之间就无法进行网络通信，也无法与外界进行网络通信。</p>
<p>因此，如果不部署网络插件，Kubernetes 集群将无法正常工作。</p>
<h2 id="kube-system" tabindex="-1"><a class="header-anchor" href="#kube-system" aria-hidden="true">#</a> kube-system</h2>
<p>&quot;[[kube-system]]&quot; 是 [[default/kubernetes]] 系统保留的一个命名空间。</p>
<p>在 Kubernetes 集群中，你可以为你的应用创建多个命名空间，用来组织和管理资源。比如，你可以创建一个 &quot;production&quot; 命名空间用来部署生产环境的应用，另外一个 &quot;staging&quot; 命名空间用来部署测试环境的应用。</p>
<p>&quot;kube-system&quot; 命名空间是 Kubernetes 系统保留的一个命名空间，用来部署 Kubernetes 系统组件，比如 kube-dns、kube-proxy、kube-apiserver 等。这些组件是 Kubernetes 集群必需的，负责实现集群的基础功能。</p>
<p>假设我们有一个应用，由两个容器组成，一个是 Web 服务器容器，另一个是数据库容器。</p>
<p>我们可以使用命名空间来组织这个应用。比如，我们可以创建一个名为 &quot;app1&quot; 的命名空间，然后在这个命名空间内部署 Web 服务器容器和数据库容器。这样，我们就可以通过命名空间来组织和管理这个应用的资源。</p>
<p>同时，我们还可以在其他命名空间中部署其他应用。比如，我们可以创建一个名为 &quot;app2&quot; 的命名空间，然后在这个命名空间中部署另一个应用。这样，我们就可以通过命名空间来对不同的应用进行隔离和管理。</p>
<h2 id="网络插件和-cni-是什么关系" tabindex="-1"><a class="header-anchor" href="#网络插件和-cni-是什么关系" aria-hidden="true">#</a> 网络插件和 CNI 是什么关系</h2>
<p>CNI（Container Network Interface）是 Kubernetes 用来管理容器网络的一套标准。网络插件就是实现了 CNI 标准的网络解决方案。</p>
<p>CNI 标准包含了一组 API，用来控制容器的网络配置和连接情况。网络插件可以通过实现这些 API 来控制容器的网络配置和连接情况，从而实现容器间的网络通信和容器与外界的网络通信。</p>
<p>Kubernetes 本身并不提供网络插件，而是允许用户选择适合自己的网络插件。常用的网络插件包括 Cilium、Calico、Flannel 等，这些网络插件都是通过实现 CNI 标准来控制容器的网络配置和连接情况的。</p>
<p>简单来说，CNI 标准是一套用来管理容器网络的规范，而网络插件则是通过实现这套规范来提供容器网络功能的解决方案。</p>
<h2 id="master-节点会运行-kubelet-组件吗-它是-worker-节点专属的功能吗" tabindex="-1"><a class="header-anchor" href="#master-节点会运行-kubelet-组件吗-它是-worker-节点专属的功能吗" aria-hidden="true">#</a> master 节点会运行 kubelet 组件吗，它是 worker 节点专属的功能吗</h2>
<p>在一般情况下，Master 节点是不会运行 kubelet 组件的。</p>
<p>Kubernetes 集群由 Master 节点和 Worker 节点组成。Master 节点负责管理整个集群，比如调度容器、维护集群状态等。Worker 节点负责运行容器，提供计算和存储资源。</p>
<p>[[Kubelet|kubelet👍 ]] 组件是运行在 Worker 节点上的，负责管理该节点上的容器。它会接收来自 Master 节点的指令，然后根据指令在 Worker 节点上运行、停止或删除容器。它还会将容器的状态信息汇报给 Master 节点，以便 Master 节点可以维护集群的状态。</p>
<p>所以，Kubelet 组件是 Worker 节点专属的功能，通常是运行在 Worker 节点上的。 Master 节点并不会运行 Kubelet 组件，而是运行其他组件来管理集群。</p>
<p>但是，也有一些特殊情况下 Master 节点会运行 [[Kubelet#概要|kubelet]] 组件，比如在较小的测试集群中，Master 节点可能会同时承担 Worker 节点的角色，因此也会运行 [[Kubelet#^ea79c2|kubelet]] 组件。但这种情况并不常见，通常情况下 Master 节点不会运行 Kubelet 组件。</p>
<p>在单节点情况下，该节点既是 Master 节点，又是 Worker 节点。这种情况下，该节点上会同时运行 Master 节点所需的组件和 Worker 节点所需的组件。</p>
<p>在单节点的 Kubernetes 集群中，通常会运行下列组件：</p>
<ul>
<li>etcd：用来存储集群状态的数据库。</li>
<li>kube-apiserver：提供了 Kubernetes API 的服务端。</li>
<li>kube-controller-manager：负责管理集群状态的控制器。</li>
<li>kube-scheduler：负责调度容器的调度器。</li>
<li>[[default/Kubelet|kubelet]]：负责管理容器的组件。</li>
<li>kube-proxy：负责实现容器间的网络隔离和负载均衡的组件。</li>
</ul>
<h2 id="master-节点本身是不能运行-pod-的。" tabindex="-1"><a class="header-anchor" href="#master-节点本身是不能运行-pod-的。" aria-hidden="true">#</a> Master 节点本身是不能运行 Pod 的。</h2>
<p>在 [[default/kubernetes|Kubernetes]] 集群中，Pod 是最小的调度单元，代表一组相关的容器。每个 Pod 都有一个唯一的 Pod IP，用来实现容器间的网络通信。</p>
<p>Master 节点负责管理整个集群，但它本身并不能运行 Pod。它只能将 Pod 调度到 Worker 节点上，然后由 Worker 节点上的 [[default/Kubelet|Kubelet]] 组件来管理这些 Pod。</p>
<p>如果你想在 Master 节点上运行一个 Pod，那么你需要将该 Pod 调度到 Master 节点所在的 Worker 节点上，然后由 [[default/Kubelet|Kubelet]] 组件来管理这个 Pod。但是，这种情况并不常见，通常情况下 Pod 是运行在 Worker 节点上的。</p>
<p>在单节点的 Kubernetes 集群中，该节点既是 Master 节点，又是 Worker 节点。因此，在这种情况下，你可以将 Pod 调度到该节点上运行。</p>
<p>通常，你可以使用 Node 调度策略将 Pod 调度到该节点上运行。Node 调度策略可以指定一个 Pod 应该运行在哪个节点上。你可以使用如下方式将 Pod 调度到单节点的 [[default/kubernetes|Kubernetes]] 集群中：</p>
<ol>
<li>在 Pod 的调度规则中使用 nodeSelector 字段指定节点名称。例如：</li>
</ol>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mypod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mycontainer
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
  <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
    <span class="token key atrule">kubernetes.io/hostname</span><span class="token punctuation">:</span> node1

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>在 Pod 的调度规则中使用 tolerations 字段指定节点的 taints。例如：</li>
</ol>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mypod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mycontainer
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
  <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> <span class="token string">"key"</span>
    <span class="token key atrule">operator</span><span class="token punctuation">:</span>
	<span class="token key atrule">Equals value</span><span class="token punctuation">:</span> <span class="token string">"value"</span> 
	<span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这两种情况下，Pod 都会被调度到单节点的 Kubernetes 集群中运行。当然，你也可以使用其他方法将 Pod 调度到单节点的集群中。在单节点的集群中，你还需要注意一些事项。比如，由于集群中只有一个节点，如果该节点出现故障，整个集群也将不可用。因此，你需要注意节点的健康状况，并确保节点的可用性。</p>
<h2 id="pod-taint-是什么意思" tabindex="-1"><a class="header-anchor" href="#pod-taint-是什么意思" aria-hidden="true">#</a> pod taint 是什么意思</h2>
<p>Pod taint 是 Kubernetes 中的一种调度机制，用来控制 Pod 在哪些 Node 上可以调度。</p>
<p>在 Kubernetes 中，每个 Node 都可以被染上一种特定的标签，称为 taint。Taint 可以用来描述 Node 上的一些限制，例如，Node 上只能调度特定类型的 Pod、Node 上不能调度 Pod 等。</p>
<p>当 Pod 调度时，Kubernetes 会检查 Pod 的调度规则和 Node 的 taints，如果这两者不冲突，那么就会将 Pod 调度到该 Node 上运行。否则，Pod 将无法调度到该 Node 上。</p>
<p>举个例子，假设有一个 Node 上设置了 taint &quot;environment=prod: NoExecute&quot;，这意味着该 Node 上只能调度带有 &quot;environment=prod&quot; 标签的 Pod。假设有一个 Pod 的调度规则如下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mypod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mycontainer
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
  <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> <span class="token string">"environment"</span>
    <span class="token key atrule">operator</span><span class="token punctuation">:</span> Equals
    <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"prod"</span>
    <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这意味着该 Pod 可以在任何带有 &quot;environment=prod&quot; 标签的 Node 上调度。因此，这个 Pod 将会被调度到上述 Node 上运行。</p>
<p>如果有一个 Pod 的调度规则是这样的：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mypod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mycontainer
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
  <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> <span class="token string">"environment"</span>
    <span class="token key atrule">operator</span><span class="token punctuation">:</span> Equals
    <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token string">"dev"</span>
    <span class="token key atrule">effect</span><span class="token punctuation">:</span> NoSchedule

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这意味着该 Pod 只能在带有 &quot;environment=dev&quot; 标签的 Node 上调度。但是，由于上述 Node 上设置了 taint &quot;environment=prod: NoExecute&quot;，所以该 Pod 将无法调度到该 Node 上运行。</p>
<p>总之，Pod taint 是一种用来控制 Pod 在哪些 Node 上可以调度的机制。你可以使用 tolerations 字段在 Pod 的调度规则中指定可以调度的 Node 的 taints，这样就可以确保 Pod 只会被调度到满足条件的 Node 上运行。</p>
<h2 id="kubernetes-松耦合设计" tabindex="-1"><a class="header-anchor" href="#kubernetes-松耦合设计" aria-hidden="true">#</a> Kubernetes 松耦合设计</h2>
<p>Kubernetes 集群中的各个组件之间保持了较松的耦合关系。这意味着，各个组件之间相互独立，互不干扰，可以根据需要进行灵活配置和扩展。</p>
<p>这种设计方式的优点是，可以使各个组件的复杂度降低，并且更容易维护和扩展。同时，松耦合设计也可以使集群的可靠性更高，因为单个组件出现故障时，不会影响整个集群的正常运行。</p>
<p>在 Kubernetes 集群中，常见的松耦合设计体现在下列方面：</p>
<ul>
<li>使用多种后端存储：Kubernetes 集群可以使用多种后端存储，例如 etcd、SQL 数据库等。用户可以根据自己的需求选择合适的后端存储。</li>
<li>多种网络插件：Kubernetes 集群可以使用多种网络插件，例如 Calico、Flannel 等。用户可以根据自己的需求选择合适的网络插件。</li>
<li>多种调度器：Kubernetes 集群可以使用多种调度器，例如 Kube-scheduler、Mesos 等。用户可以根据自己的需求选择合适的调度器。</li>
</ul>
<p>总之，Kubernetes 的松耦合设计使得它的各个组件之间相互独立，可以灵活配置和扩展。这样可以使各个组件的复杂度降低，更容易维护和扩展，并且可以使集群的可靠性更高。</p>
<h2 id="gcr" tabindex="-1"><a class="header-anchor" href="#gcr" aria-hidden="true">#</a> gcr</h2>
<p>GCR 是 Google Container Registry 的缩写，是一个用于存储 Docker 容器映像的私有云存储库。您可以使用 GCR 来托管您自己的 Docker 容器映像，或者将它们与 Google Kubernetes Engine 或其他容器运行时一起使用。</p>
<h2 id="k8s-gcr-io-pause" tabindex="-1"><a class="header-anchor" href="#k8s-gcr-io-pause" aria-hidden="true">#</a> k8s. gcr. io/pause</h2>
<p>k8s. gcr. io/pause 是一个 Docker 镜像，用于在 Kubernetes 中创建&quot;暂停&quot;容器。 &quot;暂停&quot;容器是在 Kubernetes 中的 Pod 中的一个特殊容器，用于提供网络和 IP 地址，但不执行任何操作。它们通常用于占位符目的，并且可以被其他容器共享网络和 IP 地址。</p>
<p>例如，您可能想要使用暂停容器来为您的Pod中的其他容器提供共享的网络和IP地址，而不必担心底层实现细节。暂停容器可以被看作是Pod中的&quot;占位符&quot;容器，可以在Pod中占据您选择的位置，并提供所需的网络和IP地址。</p>
<h2 id="init-container-和-spec-containers-启动顺序区别" tabindex="-1"><a class="header-anchor" href="#init-container-和-spec-containers-启动顺序区别" aria-hidden="true">#</a> init container 和 spec. containers 启动顺序区别</h2>
<blockquote>
<p>我们在写 pod 的 yaml 文件时候</p>
</blockquote>
<p>在 Kubernetes 中，init container 是一种特殊的容器，它在应用程序容器之前运行。Init container 可以执行一些预处理任务，例如在应用程序容器启动之前设置环境、准备所需的数据或者等待其他服务就绪。</p>
<p>spec.containers 则表示 Pod 中的应用程序容器。这些容器在 init container 全部完成后才会启动。</p>
<p>因此，init container 和 spec.containers 的启动顺序是：init container 先启动，然后是 spec.containers 中的容器。</p>
<p>常见用途：</p>
<ul>
<li>在应用程序容器启动之前进行环境准备。</li>
<li>等待其他服务就绪，例如数据库服务。</li>
<li>下载和准备所需的数据。</li>
</ul>
<p>参考文档：</p>
<ul>
<li>Kubernetes - Init Containers： <a href="https://kubernetes.io/docs/concepts/workloads/pods/init-containers/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/docs/concepts/workloads/pods/init-containers/<ExternalLinkIcon/></a></li>
<li>Kubernetes - Containers： <a href="https://kubernetes.io/docs/concepts/containers/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/docs/concepts/containers/<ExternalLinkIcon/></a></li>
</ul>
<h3 id="spec-containers-中容器启动是按照顺序启动还是同时启动" tabindex="-1"><a class="header-anchor" href="#spec-containers-中容器启动是按照顺序启动还是同时启动" aria-hidden="true">#</a> spec . containers 中容器启动是按照顺序启动还是同时启动</h3>
<p>在 Kubernetes 中，spec.containers 中的容器是同时启动的。</p>
<p>Kubernetes 的 Pod 是由一组容器组成的最小调度单位，这些容器共享同一个网络命名空间和存储卷。在默认情况下，所有容器都是在同一个 Pod 中同时启动的，并且在同一个进程组中运行。</p>
<p>在某些情况下，您可能希望一个容器在另一个容器启动后才启动。这可以通过使用 init container 来实现。init container 是一种特殊的容器，它在应用程序容器之前运行，并且在所有 init container 都完成后，应用程序容器才会启动。</p>
<p>总结一下，spec.containers 中的容器是同时启动的，而 init container 则在应用程序容器之前启动。</p>
<p>参考文档：</p>
<ul>
<li>Kubernetes - Init Containers： <a href="https://kubernetes.io/docs/concepts/workloads/pods/init-containers/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/docs/concepts/workloads/pods/init-containers/<ExternalLinkIcon/></a></li>
<li>Kubernetes - Containers： <a href="https://kubernetes.io/docs/concepts/containers/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/docs/concepts/containers/<ExternalLinkIcon/></a></li>
</ul>
<h3 id="init-container-容器启动是按照顺序启动还是同时启动" tabindex="-1"><a class="header-anchor" href="#init-container-容器启动是按照顺序启动还是同时启动" aria-hidden="true">#</a> init container 容器启动是按照顺序启动还是同时启动</h3>
<p>在 Kubernetes 中，init container 是按照定义的顺序依次启动的。</p>
<p>当您在 Pod 中定义了多个 init container 时，Kubernetes 会按照定义的顺序依次启动这些容器。每个 init container 必须完成后，才会启动下一个 init container。所有 init container 都必须完成后，应用程序容器才会启动。</p>
<p>例如，下面是一个使用了两个 init container 的 Pod 的定义示例：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> mypod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">initContainers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> init<span class="token punctuation">-</span>myservice
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo init-myservice &amp;&amp; sleep 5'</span><span class="token punctuation">]</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> init<span class="token punctuation">-</span>mydb
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo init-mydb &amp;&amp; sleep 3'</span><span class="token punctuation">]</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>container
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo The app is running! &amp;&amp; sleep 3600'</span><span class="token punctuation">]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，init-myservice 容器会先启动，然后是 init-mydb 容器，最后是 myapp-container 容器。</p>
<p>总结一下，init container 是按照定义的顺序依次启动的。</p>
<p>参考文档：</p>
<ul>
<li>Kubernetes - Init Containers： <a href="https://kubernetes.io/docs/concepts/workloads/pods/init-containers/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/docs/concepts/workloads/pods/init-containers/<ExternalLinkIcon/></a></li>
<li>Kubernetes - Containers： <a href="https://kubernetes.io/docs/concepts/containers/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/docs/concepts/containers/<ExternalLinkIcon/></a></li>
</ul>
<h2 id="rook-项目" tabindex="-1"><a class="header-anchor" href="#rook-项目" aria-hidden="true">#</a> Rook 项目</h2>
<ul>
<li><a href="https://rook.io/" target="_blank" rel="noopener noreferrer">官方地址<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/rook/rook" target="_blank" rel="noopener noreferrer">GitHub地址<ExternalLinkIcon/></a></li>
</ul>
<p>Rook 是一个基于 Kubernetes 的开源存储系统，旨在使用 Kubernetes 原生技术管理和操作存储。Rook 通过在 Kubernetes 中运行一组组件来管理和操作存储，从而使用户能够轻松地在 Kubernetes 集群中使用和管理存储。</p>
<p>Rook 提供了许多功能，例如：</p>
<ul>
<li>在 Kubernetes 集群中部署和管理 Ceph 存储系统</li>
<li>在 Kubernetes 集群中部署和管理 NFS 共享</li>
<li>支持在 Kubernetes 中使用存储卷</li>
<li>支持在 Kubernetes 中使用存储类</li>
<li>支持在 Kubernetes 中使用存储访问控制列表（ACL）</li>
</ul>
<p>Rook 的架构包括以下组件：</p>
<ul>
<li>Rook Operator：负责部署和管理 Rook 组件的 Kubernetes 应用程序。</li>
<li>Rook Ceph Manager：负责管理和操作 Ceph 存储系统的组件。</li>
<li>Rook NFS Server：负责提供 NFS 共享服务的组件。</li>
</ul>
<p>安装 Rook 需要使用 Kubernetes 的 Helm 包管理器。</p>
<p>要使用 Rook，首先需要在 Kubernetes 集群中安装 Helm 包管理器。然后，你可以使用 Helm 安装 Rook Operator，如下所示：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm repo <span class="token function">add</span> rook-stable https://charts.rook.io/stable $ helm <span class="token function">install</span> rook-stable/rook-ceph <span class="token parameter variable">--namespace</span> rook-ceph
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成后，你就可以在 Kubernetes 集群中使用 Rook 了。要使用 Rook 管理存储，你需要创建一个 Rook 配置文件，然后使用 kubectl 将其部署到集群中。</p>
<p>例如，要使用 Rook 部署 Ceph 存储系统，你可以创建一个如下所示的 Rook Ceph 配置文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> ceph.rook.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CephCluster
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> rook<span class="token punctuation">-</span>ceph
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">cephVersion</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ceph/ceph<span class="token punctuation">:</span>v14.2.5
  <span class="token key atrule">dataDirHostPath</span><span class="token punctuation">:</span> /var/lib/rook
  <span class="token key atrule">mon</span><span class="token punctuation">:</span>
    <span class="token key atrule">count</span><span class="token punctuation">:</span> <span class="token number">3</span>
    <span class="token key atrule">allowMultiplePerNode</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">network</span><span class="token punctuation">:</span>
    <span class="token key atrule">hostNetwork</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">dashboard</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，使用 kubectl 命令将该配置文件部署到集群中，如下所示：</p>
<p><code v-pre>$ kubectl apply -f rook-ceph-config.yaml</code></p>
<p>这样，Rook 就会在集群中部署 Ceph 存储系统。你可以使用 kubectl 命令查看 Ceph 存储系统的状态，如下所示：</p>
<p><code v-pre>$ kubectl -n rook-ceph get pods</code></p>
<p>你也可以使用 Rook 提供的命令行工具 rookctl 来管理 Ceph 存储系统。例如，要查看 Ceph 存储系统的状态，你可以使用如下命令：</p>
<p><code v-pre>$ rookctl status ceph</code></p>
<p>此外，你还可以使用 Rook 部署 NFS 共享服务，并在 Kubernetes 集群中使用存储卷、存储类和存储访问控制列表（ACL）。</p>
<p>总之，Rook 是一个基于 Kubernetes 的存储系统，可以使用 Kubernetes 原生技术管理和操作存储。使用 Rook 可以轻松地在 Kubernetes 集群中使用和管理存储，并且可以提高存储的可靠性和可维护性。</p>
<p>Rook 项目是一个基于 Kubernetes 的存储系统，它通过在 Kubernetes 集群中运行一组组件来管理和操作存储。</p>
<p>Rook 的核心组件是 Rook Operator，它是一个 Kubernetes 应用程序，负责部署和管理其他 Rook 组件。Rook Operator 使用 Kubernetes 的资源描述符（CRD）来定义存储系统的配置和状态，并使用 Kubernetes 的控制器来监视和管理这些资源。</p>
<p>Rook 还包括若干个专用组件，用于管理和操作不同类型的存储。例如，Rook Ceph Manager 组件负责管理和操作 Ceph 存储系统，Rook NFS Server 组件负责提供 NFS 共享服务。这些专用组件也使用 Kubernetes 的资源描述符和控制器来管理和操作存储。</p>
<h2 id="docker-项目源码" tabindex="-1"><a class="header-anchor" href="#docker-项目源码" aria-hidden="true">#</a> docker 项目源码</h2>
<ul>
<li><a href="https://github.com/moby/moby" target="_blank" rel="noopener noreferrer">源码地址https://github.com/moby/moby<ExternalLinkIcon/></a></li>
</ul>
<blockquote>
<p>Docker 是商标，源码放入到 moby 社区</p>
</blockquote>
<h3 id="代码行数统计-moby" tabindex="-1"><a class="header-anchor" href="#代码行数统计-moby" aria-hidden="true">#</a> 代码行数统计 moby</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/moby<span class="token comment"># cd cloc </span>
-bash: cd: cloc: No such <span class="token function">file</span> or directory
root@cubmaster01:/workspces/moby<span class="token comment"># cd ..</span>
root@cubmaster01:/workspces<span class="token comment"># cloc moby/</span>
    <span class="token number">7320</span> text files.
    <span class="token number">7138</span> unique files.                                          
     <span class="token number">472</span> files ignored.

github.com/AlDanial/cloc <span class="token function">v</span> <span class="token number">1.82</span>  <span class="token assign-left variable">T</span><span class="token operator">=</span><span class="token number">26.76</span> s <span class="token punctuation">(</span><span class="token number">256.1</span> files/s, <span class="token number">70404.1</span> lines/s<span class="token punctuation">)</span>
----------------------------------------------------------------------------------
Language                        files          blank        comment           code
----------------------------------------------------------------------------------
Go                               <span class="token number">6136</span>         <span class="token number">160976</span>         <span class="token number">187132</span>        <span class="token number">1242770</span>
YAML                               <span class="token number">94</span>           <span class="token number">6083</span>           <span class="token number">1143</span>         <span class="token number">183788</span>
Markdown                          <span class="token number">274</span>          <span class="token number">13635</span>              <span class="token number">0</span>          <span class="token number">42424</span>
Assembly                           <span class="token number">57</span>           <span class="token number">3420</span>           <span class="token number">1403</span>          <span class="token number">12037</span>
Protocol Buffers                   <span class="token number">82</span>           <span class="token number">2018</span>           <span class="token number">3459</span>           <span class="token number">5850</span>
JSON                               <span class="token number">31</span>              <span class="token number">1</span>              <span class="token number">0</span>           <span class="token number">4377</span>
Bourne Shell                       <span class="token number">53</span>            <span class="token number">669</span>            <span class="token number">910</span>           <span class="token number">3935</span>
Bourne Again Shell                 <span class="token number">47</span>            <span class="token number">255</span>            <span class="token number">204</span>           <span class="token number">1641</span>
<span class="token function">make</span>                               <span class="token number">32</span>            <span class="token number">423</span>            <span class="token number">240</span>           <span class="token number">1442</span>
Dockerfile                         <span class="token number">14</span>            <span class="token number">105</span>            <span class="token number">106</span>            <span class="token number">751</span>
PowerShell                          <span class="token number">3</span>            <span class="token number">103</span>            <span class="token number">157</span>            <span class="token number">472</span>
Groovy                              <span class="token number">1</span>             <span class="token number">26</span>            <span class="token number">108</span>            <span class="token number">434</span>
Python                              <span class="token number">2</span>             <span class="token number">37</span>             <span class="token number">11</span>            <span class="token number">255</span>
HCL                                 <span class="token number">4</span>             <span class="token number">44</span>             <span class="token number">30</span>            <span class="token number">245</span>
C                                  <span class="token number">10</span>             <span class="token number">43</span>             <span class="token number">28</span>            <span class="token number">230</span>
TOML                                <span class="token number">8</span>             <span class="token number">55</span>             <span class="token number">45</span>            <span class="token number">199</span>
Windows Message File                <span class="token number">1</span>              <span class="token number">7</span>              <span class="token number">0</span>             <span class="token number">32</span>
INI                                 <span class="token number">1</span>              <span class="token number">2</span>              <span class="token number">0</span>             <span class="token number">10</span>
SVG                                 <span class="token number">3</span>              <span class="token number">0</span>              <span class="token number">0</span>              <span class="token number">3</span>
----------------------------------------------------------------------------------
SUM:                             <span class="token number">6853</span>         <span class="token number">187902</span>         <span class="token number">194976</span>        <span class="token number">1500895</span>
----------------------------------------------------------------------------------
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '36.md' style='float:left'>⬆️上一节🔗  </a><a href = '38.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


