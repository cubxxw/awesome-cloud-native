<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第52节-kubectl" tabindex="-1"><a class="header-anchor" href="#第52节-kubectl" aria-hidden="true">#</a> 第52节 kubectl</h1>
<div><a href = '51.md' style='float:left'>⬆️上一节🔗  </a><a href = '53.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<p>kubelet 架构kubelet 管理 Pod 的核心流程kubelet 节点管理Pod 管理Pod 启动流程END 链接</p>
<p><a href="https://blog.csdn.net/jettery/article/details/78891733" target="_blank" rel="noopener noreferrer">Kubelet组件解析<ExternalLinkIcon/></a></p>
<h2 id="理解-kubelet" tabindex="-1"><a class="header-anchor" href="#理解-kubelet" aria-hidden="true">#</a> 理解 kubelet</h2>
<p>Kubelet组件运行在Node节点上，维持运行中的Pods以及提供kuberntes运行时环境，主要完成以下使命：</p>
<p>１．监视分配给该Node节点的pods</p>
<p>２．挂载pod所需要的volumes</p>
<p>３．下载pod的secret</p>
<p>４．通过docker/rkt来运行pod中的容器</p>
<p>５．周期的执行pod中为容器定义的liveness探针</p>
<p>６．上报pod的状态给系统的其他组件</p>
<p>７．上报Node的状态</p>
<p>kubelet 管理Pod的核心流程主要包括三个步骤。首先，kubelet获取Pod清单，可以通过文件、HTTP endpoint、API Server和HTTP server等方式获取。其次，节点管理主要是节点自注册和节点状态更新，Kubelet在启动时通过API Server注册节点信息，并定时向API Server发送节点新消息，API Server在接收到新消息后，将信息写入etcd。最后，Pod启动流程主要包括镜像拉取、容器启动、探针监控以及状态汇报等步骤。</p>
<p>kubelet是Kubernetes中的一个节点代理程序，负责维护本节点上Pod的生命周期。kubelet是Kubernetes中非常重要的组件之一，它在Kubernetes集群中扮演着非常重要的角色。kubelet可以在每个节点上运行，它监视分配给该Node节点的pods，并执行各种管理容器的操作，如挂载pod所需要的volumes、下载pod的secret等。</p>
<p>kubelet的核心流程主要包括获取Pod清单、节点管理和Pod启动流程。其中，获取Pod清单的方式包括文件、HTTP endpoint、API Server和HTTP server等方式。节点管理主要包括节点自注册和节点状态更新，而Pod启动流程主要包括镜像拉取、容器启动、探针监控以及状态汇报等步骤。</p>
<ul>
<li>在节点管理方面，kubelet可以通过设置启动参数-register-node来确定是否向API Server注册自己。如果kubelet没有选择自注册模式，则需要用户自己配置Node资源信息，同时需要告知kubelet集群上的API Server的位置。在启动时，kubelet会通过API Server注册节点信息，并定时向API Server发送节点新消息，API Server在接收到新消息后，将信息写入etcd。</li>
<li>在Pod管理方面，kubelet可以通过文件、HTTP endpoint、API Server和HTTP server等方式获取Pod清单。文件方式主要用于static pod，而HTTP和API Server方式则是Kubernetes中常用的方式。HTTP server主要用于kubelet侦听HTTP请求，并响应简单的API以提交新的Pod清单。</li>
<li>在Pod启动流程方面，kubelet会执行各种管理容器的操作，包括镜像拉取、容器启动、探针监控以及状态汇报等步骤。镜像拉取是Pod启动过程中的一项重要工作，kubelet可以通过imageManager模块来管理镜像。容器启动是Pod启动过程的下一步，kubelet通过container runtime来启动容器。探针监控是Pod启动过程中一项非常重要的工作，kubelet会周期性地执行pod中为容器定义的liveness探针，并将结果上报给系统的其他组件。状态汇报是kubelet的一个重要功能，它会上报pod和Node的状态给系统的其他组件，以及上报节点自身的状态和资源使用情况给API Server。</li>
</ul>
<p>总之，kubelet是Kubernetes中非常重要的组件之一，它负责维护本节点上Pod的生命周期，并执行各种管理容器的操作。kubelet的核心流程包括获取Pod清单、节点管理和Pod启动流程。在节点管理方面，kubelet通过设置启动参数-register-node来确定是否向API Server注册自己。在Pod管理方面，kubelet可以通过文件、HTTP endpoint、API Server和HTTP server等方式获取Pod清单。在Pod启动流程方面，kubelet会执行各种管理容器的操作，包括镜像拉取、容器启动、探针监控以及状态汇报等步骤。</p>
<h2 id="kubelet-架构" tabindex="-1"><a class="header-anchor" href="#kubelet-架构" aria-hidden="true">#</a> <strong>kubelet 架构</strong></h2>
<p>每个节点上都运行一一个 kubelet 服务进程，默认监听 10250 端口。</p>
<ul>
<li>接收并执行 master 发来的指令;</li>
<li>管理 Pod 及 Pod 中的容器;</li>
<li>每个 kubelet 进程会在 API Server上注册节点自身信息，定期向 master 节点汇报节点的资源使用情况，并通过 cAdvisor 监控节点和容器的资源。</li>
</ul>
<p>kubelet 架构如下图所示：</p>
<p><img src="http://sm.nsddd.top/sm202303081731495.png" alt="http://sm.nsddd.top/sm202303081731495.png"></p>
<p>kubelet 默认会监听 4 个端口：</p>
<ul>
<li><strong>10250（kubelet API）</strong>：<strong>kubelet server 与 apiserver 通信的端口，定期请求 apiserver 获取自己所应当处理的任务</strong>，通过该端口可以访问获取 node 资源以及状态。<strong>kubectl查看pod的日志和cmd命令，都是通过kubelet端口 10250 访问。</strong></li>
<li><strong>10248（健康检查端口)</strong>： kubelet 是否正常工作, 通过 kubelet 的启动参数 –healthz-port 和 –healthz-bind-address 来指定监听的地址和端口。</li>
<li><strong>4194（cAdvisor 监听）</strong>：kublet 通过该端口可以获取到该节点的环境信息以及 node 上运行的容器状态等内容，访问 <code v-pre>http://localhost:4194</code> 可以看到 cAdvisor 的管理界面, 通过 kubelet 的启动参数 –cadvisor-port 可以指定 启动的端口。</li>
<li><strong>10255 （readonly API）</strong>：提供了 pod 和 node 的信息，接口以只读形式暴露出去，访问该端口不需要认证和鉴权。 获取 pod 的接口，与 apiserver 的 <code v-pre>http://127.0.0.1:8080/api/v1/pods?fieldSelector=spec.nodeName=xxx</code> 接口类似</li>
<li>ProbeManager：实现 k8s 中的探针功能，在 pod 中配置了各个探针后，由 ProbeManager 来管理并执行</li>
<li>OOMWatcher：系统OOM的监听器，将会与cadvisor模块之间建立SystemOOM,通过Watch方式从cadvisor那里收到的OOM信号，并记录到节点的 Event</li>
<li>GPUManager：对于Node上可使用的GPU的管理，当前版本需要在kubelet启动参数中指定feature-gates中添加Accelerators=true，并且需要才用runtime=Docker的情况下才能支持使用GPU,并且当前只支持NvidiaGPU,GPUManager主要需要实现interface定义的Start()/Capacity()/AllocateGPU()三个函数</li>
<li>cAdvisor：cAdvisor集成在kubelet中，起到收集本Node的节点和启动的容器的监控的信息，启动一个Http Server服务器，对外接收rest api请求．cAvisor模块对外提供了interface接口，可以通过interface接口获取到node节点信息，本地文件系统的状态等信息，该接口被imageManager，OOMWatcher，containerManager等所使用</li>
<li>PLEG：PLEG全称为PodLifecycleEvent,PLEG会一直调用container runtime获取本节点的pods,之后比较本模块中之前缓存的pods信息，比较最新的pods中的容器的状态是否发生改变，当状态发生切换的时候，生成一个eventRecord事件，输出到eventChannel中．　syncPod模块会接收到eventChannel中的event事件，来触发pod同步处理过程，调用contaiener runtime来重建pod，保证pod工作正常．</li>
<li>StatusManager：该模块负责pod里面的容器的状态，接受从其它模块发送过来的pod状态改变的事件，进行处理，并更新到kube-apiserver中．</li>
<li>EvictionManager：当node的节点资源不足的时候，达到了配置的evict的策略，将会从node上驱赶pod，来保证node节点的稳定性．可以通过kubelet启动参数来决定evict的策略．另外当node的内存以及disk资源达到evict的策略的时候会生成对应的node状态记录</li>
<li>VolumeManager：负责node节点上pod所使用的ｖolume的管理．主要涉及如下功能 Volume状态的同步，模块中会启动gorountine去获取当前node上volume的状态信息以及期望的volume的状态信息，会去周期性的sync　volume的状态，另外volume与pod的生命周期关联，pod的创建删除过程中volume的attach/detach流程．更重要的是kubernetes支持多种存储的插件</li>
<li>ImageGC：负责Node节点的镜像回收，当本地的存放镜像的本地磁盘空间达到某阈值的时候，会触发镜像的回收，删除掉不被pod所使用的镜像．回收镜像的阈值可以通过kubelet的启动参数来设置．</li>
<li>ContainerGC：负责NOde节点上的dead状态的container,自动清理掉node上残留的容器．具体的GC操作由runtime来实现</li>
<li>ImageManager：调用kubecontainer.ImageService提供的PullImage/GetImageRef/ListImages/RemoveImage/ImageStates的方法来保证pod运行所需要的镜像，主要是为了kubelet支持cni．</li>
</ul>
<h2 id="kubelet-管理-pod-的核心流程" tabindex="-1"><a class="header-anchor" href="#kubelet-管理-pod-的核心流程" aria-hidden="true">#</a> <strong>kubelet 管理 Pod 的核心流程</strong></h2>
<p><img src="http://sm.nsddd.top/sm202303081730574.png" alt="http://sm.nsddd.top/sm202303081730574.png"></p>
<p>来源包括 file 和 http 两种类型：</p>
<ul>
<li>file 主要是用于 static pod</li>
<li>http 则是 apiserver 进行调用</li>
</ul>
<h3 id="kubelet-节点管理" tabindex="-1"><a class="header-anchor" href="#kubelet-节点管理" aria-hidden="true">#</a> <strong>kubelet 节点管理</strong></h3>
<p>节点管理主要是节点自注册和节点状态更新:</p>
<ul>
<li>Kubelet 可以通过设置启动参数**-register-node**来确定是否向 API Server 注册自己;</li>
<li>如果 Kubelet 没有选择自注册模式，则需要用户自己配置 Node 资源信息，同时需要告知 Kubelet 集群上的API Server 的位置;</li>
<li>Kubelet 在启动时通过 API Server 注册节点信息,并定时向 API Server 发送节点新消息，API Server 在接收到新消息后，将信息写入etcd。</li>
</ul>
<h3 id="pod-管理" tabindex="-1"><a class="header-anchor" href="#pod-管理" aria-hidden="true">#</a> <strong>Pod 管理</strong></h3>
<p>获取Pod清单:</p>
<ul>
<li>
<p>文件：启动参数**-config**指定的配置目录下的文件(默认 <code v-pre>/etc/ Kubernetes/manifests/</code> )。该文件每20秒重新检查一次( 可配置)</p>
</li>
<li>
<p>配置方法</p>
<p>kubelet 可以通过启动参数 <code v-pre>-config</code> 指定配置文件的目录，默认为 <code v-pre>/etc/kubernetes/manifests/</code>。该目录下的文件每20秒重新检查一次，可以在启动时使用参数 <code v-pre>-sync-frequency</code> 来更改检查频率。</p>
</li>
<li>
<p>HTTP endpoint (URL) ：启动参数**-manifest-url**设置。每20秒检查一次这个端点(可配置）</p>
</li>
<li>
<p>API Server：通过 API Server 监听 etcd 目录，同步 Pod 清单。</p>
</li>
<li>
<p>HTTP server: kubelet 侦听 HTTP 请求，并响应简单的 API 以提交新的 Pod 清单。</p>
</li>
</ul>
<h3 id="pod-启动流程" tabindex="-1"><a class="header-anchor" href="#pod-启动流程" aria-hidden="true">#</a> <strong>Pod 启动流程</strong></h3>
<p><img src="http://sm.nsddd.top/sm202303081731318.png" alt="http://sm.nsddd.top/sm202303081731318.png"></p>
<p>kubelet 管理 Pod 的核心流程如下：</p>
<ol>
<li>kubelet 通过 API Server 或文件等方式获取 Pod 清单。</li>
<li>kubelet 通过 CRI（Container Runtime Interface）接口创建 Pod 的容器。</li>
<li>kubelet 通过镜像管理器检查容器所需的镜像是否存在，如果不存在就从镜像仓库中拉取。</li>
<li>kubelet 通过容器运行时（如Docker）启动容器。</li>
<li>kubelet 定期执行容器的探针监测，包括 liveness 探针和 readiness 探针。</li>
<li>kubelet 定期向 API Server 汇报 Pod 状态，包括容器状态和节点资源使用情况。</li>
</ol>
<p>其中，kubelet 通过获取 Pod 清单、节点管理和 Pod 启动流程来管理 Pod。</p>
<p>我们知道每一个 pod 都有一个 底座，叫做 pause：</p>
<p>在 Kubernetes 中，容器是最小的调度单位，但它们通常不是独立运行的，而是与其他容器组合在一起形成一个完整的应用程序部署单元——Pod。在 Pod 中，所有容器共享相同的网络空间和存储卷，它们之间可以通过 localhost 相互通信。</p>
<p>每个 Pod 内部都有一个 pause 容器，它是一个仅仅存在于网络中的容器。它在 Pod 创建时作为第一个容器启动，在 Pod 中不承担任何的业务功能，仅仅是用来占用一个网络端口，以便其他容器可以与之通信。pause 容器启动后，就会进入暂停状态，但是它仍然在运行中，以保持容器进程的持续性。当容器内的所有应用程序都停止执行时，pause 容器仍然在运行，从而保留了容器的网络和存储配置。pause 容器很小，只有几十兆字节，因此创建和销毁非常快，不会占用多余的资源。</p>
<p>可以把 pause 容器看作是 Pod 的“底座”，它负责维护 Pod 的生命周期，当 Pod 中的其他容器停止运行时，pause 容器仍然在运行，以保证 Pod 的网络和存储配置不会丢失。因此，如果 pause 容器停止运行，整个 Pod 将会被删除，同时也会删除 Pod 中的所有容器。同时 pause 容器也是 kubelet 的一个重要组成部分，kubelet 会通过监视 pause 容器的状态来判断 Pod 的状态是否正常。</p>
<p>总之，pause 容器是 Kubernetes 中一个非常重要的概念，可以说是整个容器编排的基础。理解 pause 容器的作用和原理，对于深入理解 Kubernetes 的运行机制和调度策略都是非常必要的。</p>
<p>pause容器的源代码地址是：https://github.com/kubernetes/kubernetes/blob/master/cmd/kubelet/app/pods/pause.go</p>
<p>更加详细的流程：</p>
<blockquote>
<p>按组件分类，细致到方法级别。</p>
<p><img src="http://sm.nsddd.top/sm202303081908979.png" alt="http://sm.nsddd.top/sm202303081908979.png"></p>
</blockquote>
<p>可以看到 CNI、CRI、CSI 的调用过程，这里有个清晰的认识。</p>
<h2 id="kubelet-启动-pod-流程" tabindex="-1"><a class="header-anchor" href="#kubelet-启动-pod-流程" aria-hidden="true">#</a> kubelet 启动 Pod 流程</h2>
<ol>
<li>通过 API Server 或文件等方式获取 Pod 清单。</li>
<li>通过 CRI（Container Runtime Interface）接口创建 Pod 的容器。</li>
<li>通过镜像管理器检查容器所需的镜像是否存在，如果不存在就从镜像仓库中拉取。</li>
<li>通过容器运行时（如 Docker）启动容器。</li>
<li>定期执行容器的探针监测，包括 liveness 探针和 readiness 探针。</li>
<li>定期向 API Server 汇报 Pod 状态，包括容器状态和节点资源使用情况。</li>
</ol>
<p>其中，kubelet 通过获取 Pod 清单、节点管理和 Pod 启动流程来管理 Pod。</p>
<h2 id="cni、cri、csi-调用步骤和调用过程" tabindex="-1"><a class="header-anchor" href="#cni、cri、csi-调用步骤和调用过程" aria-hidden="true">#</a> CNI、CRI、CSI 调用步骤和调用过程</h2>
<p>以下为调用过程：</p>
<ol>
<li>kubelet 中的 kube-container-runtime 调用 CRI runtime 进行容器管理。</li>
<li>CRI runtime 负责与容器运行时进行通信，如 Docker 或 containerd。</li>
<li>CRI runtime 通过 CNI plugin 调用 CNI 进行网络管理。</li>
<li>CNI 负责调用网络插件，如 flannel 或 Calico。</li>
<li>CSI 则负责与存储插件进行通信，如 Ceph 或 NFS。</li>
</ol>
<p>以上是 kubelet 启动 Pod 流程以及 CNI、CRI、CSI 调用步骤和调用过程。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '51.md' style='float:left'>⬆️上一节🔗  </a><a href = '53.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


