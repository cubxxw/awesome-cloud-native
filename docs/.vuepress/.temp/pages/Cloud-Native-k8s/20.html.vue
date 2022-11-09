<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第20节-补充kubernetes的开放接口" tabindex="-1"><a class="header-anchor" href="#第20节-补充kubernetes的开放接口" aria-hidden="true">#</a> 第20节 补充kubernetes的开放接口</h1>
<div><a href = '19.md' style='float:left'>⬆️上一节🔗  </a><a href = '21.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p><code v-pre>Kubernetes</code> 作为云原生应用的最佳部署平台，已经开放了容器运行时接口（CRI）、容器网络接口（CNI）和容器存储接口（CSI），这些接口让Kubernetes的开放性变得最大化，而Kubernetes本身则专注于容器调度。</p>
</div>
<p>🧷 参考：https://zhuanlan.zhihu.com/p/33390023</p>
<h2 id="开放接口" tabindex="-1"><a class="header-anchor" href="#开放接口" aria-hidden="true">#</a> 开放接口</h2>
<p><code v-pre>Kubernetes</code> 作为云原生应用的的基础调度平台，相当于云原生的操作系统，为了便于系统的扩展，<code v-pre>Kubernetes</code> 中开放的以下接口，可以分别对接不同的后端，来实现自己的业务逻辑：</p>
<ul>
<li><strong>CRI（Container Runtime Interface）</strong> ：容器运行时接口，提供计算资源</li>
<li><strong>CNI（Container Network Interface）</strong> ：容器网络接口，提供网络资源</li>
<li><strong>CSI（Container Storage Interface）</strong> ：容器存储接口，提供存储资源</li>
</ul>
<p>以上三种资源相当于一个分布式操作系统的最基础的几种资源类型，而Kuberentes是将他们粘合在一起的纽带。</p>
<p><img src="http://sm.nsddd.top/smv2-7b93f7d22be7fb1644b4564721dda06d_b.jpg" alt="img"></p>
<h2 id="cri-container-runtime-interface-容器运行时接口" tabindex="-1"><a class="header-anchor" href="#cri-container-runtime-interface-容器运行时接口" aria-hidden="true">#</a> CRI - Container Runtime Interface（容器运行时接口）</h2>
<p>CRI中定义了<strong>容器</strong>和<strong>镜像</strong>的服务的接口，因为容器运行时与镜像的生命周期是彼此隔离的，因此需要定义两个服务。该接口使用<a href="https://link.zhihu.com/?target=https%3A//developers.google.com/protocol-buffers/" target="_blank" rel="noopener noreferrer">Protocol Buffer<ExternalLinkIcon/></a>，基于<a href="https://link.zhihu.com/?target=https%3A//grpc.io/" target="_blank" rel="noopener noreferrer">gRPC<ExternalLinkIcon/></a>，在kubernetes v1.7+版本中是在<a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes/kubernetes/tree/master/pkg/kubelet/apis/cri/v1alpha1/runtime" target="_blank" rel="noopener noreferrer">pkg/kubelet/apis/cri/v1alpha1/runtime<ExternalLinkIcon/></a>的<code v-pre>api.proto</code>中定义的。</p>
<div class="custom-container tip"><p class="custom-container-title">CRI</p>
<p>容器运行时接口（CRI） 是<code v-pre>kubelet</code> 和容器运行时之间通信的主要协议，它将 Kubelet 与容器运行时解耦，理论上，实现了 CRI 接口的容器引擎，都可作为 kubernetes 的容器运行时。</p>
<p><strong>docker 没有实现 CRI 接口，kuebernetes使用 <code v-pre>dockershim</code> 来兼容docker。（v1.24版本移除）</strong></p>
</div>
<h3 id="镜像的导入导出-ctr" tabindex="-1"><a class="header-anchor" href="#镜像的导入导出-ctr" aria-hidden="true">#</a> 镜像的导入导出 ctr</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z /<span class="token punctuation">]</span><span class="token comment"># docker ps | grep "nginx"</span>
<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z /<span class="token punctuation">]</span><span class="token comment"># docker images| grep "nginx"</span>
nginx                                    latest     76c69feac34e   <span class="token number">2</span> weeks ago     142MB
<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z docker<span class="token punctuation">]</span><span class="token comment"># scp nginx-1.0.tar root@43.142.124.85:/tmp</span>

<span class="token comment">##### 进入 另一台服务器 ###########################</span>

<span class="token punctuation">[</span>root@VM-4-6-centos tmp<span class="token punctuation">]</span><span class="token comment">#  ctr -n k8s.io images import nginx-1.0.tar --platform=linux/amd64</span>
unpacking docker.io/library/nginx:latest <span class="token punctuation">(</span>sha256:f32fc6316bf00e3792c5796cebd6b30a7616b151c28034132628de06bedd3af7<span class="token punctuation">)</span><span class="token punctuation">..</span>.done
<span class="token punctuation">[</span>root@VM-4-6-centos tmp<span class="token punctuation">]</span><span class="token comment"># crictl images</span>
IMAGE                                        TAG                    IMAGE ID            SIZE
docker.io/library/nginx                      latest                 76c69feac34e8       146MB
docker.io/rancher/klipper-helm               v0.7.3-build20220613   38b3b9ad736af       83MB
docker.io/rancher/klipper-lb                 v0.3.5                 dbd43b6716a08       <span class="token number">3</span>.33MB
docker.io/rancher/local-path-provisioner     v0.0.21                fb9b574e03c34       <span class="token number">11</span>.4MB
docker.io/rancher/mirrored-coredns-coredns   <span class="token number">1.9</span>.1                  99376d8f35e0a       <span class="token number">14</span>.1MB
docker.io/rancher/mirrored-library-traefik   <span class="token number">2.9</span>.1                  e6de8578b2384       <span class="token number">33</span>.4MB
docker.io/rancher/mirrored-metrics-server    v0.6.1                 e57a417f15d36       <span class="token number">28</span>.1MB
docker.io/rancher/mirrored-pause             <span class="token number">3.6</span>                    6270bb605e12e       301kB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cri架构" tabindex="-1"><a class="header-anchor" href="#cri架构" aria-hidden="true">#</a> CRI架构</h2>
<p>Container Runtime实现了CRI gRPC Server，包括<code v-pre>RuntimeService</code>和<code v-pre>ImageService</code>。该gRPC Server需要监听本地的Unix socket，而kubelet则作为gRPC Client运行。</p>
<p><img src="http://sm.nsddd.top/smv2-ab209f7c32ceb17ed43dcf6b66056cea_b.jpg" alt="img"></p>
<h2 id="启用cri" tabindex="-1"><a class="header-anchor" href="#启用cri" aria-hidden="true">#</a> 启用CRI</h2>
<p>除非集成了<code v-pre>rktnetes</code>，否则CRI都是被默认启用了，<code v-pre>kubernetes1.7</code>版本开始旧的预集成的docker CRI已经被移除。</p>
<p>要想启用CRI只需要在kubelet的启动参数重传入此参数：<code v-pre>--container-runtime-endpoint</code>远程运行时服务的端点。当前Linux上支持unix socket，windows上支持tcp。例如：<code v-pre>unix:///var/run/dockershim.sock</code>、 <code v-pre>tcp://localhost:373</code>，默认是<code v-pre>unix:///var/run/dockershim.sock</code>，即默认使用本地的docker作为容器运行时。</p>
<p>关于CRI的详细进展请参考<a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes/community/blob/master/contributors/devel/container-runtime-interface.md" target="_blank" rel="noopener noreferrer">CRI: the Container Runtime Interface<ExternalLinkIcon/></a>。</p>
<h2 id="cri接口" tabindex="-1"><a class="header-anchor" href="#cri接口" aria-hidden="true">#</a> CRI接口</h2>
<p>Kubernetes1.9中的CRI接口在<code v-pre>api.proto</code>中的定义如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Runtime service defines the public APIs for remote container runtimes</span>
service RuntimeService <span class="token punctuation">{</span>
    <span class="token comment">// Version returns the runtime name, runtime version, and runtime API version.</span>
    rpc <span class="token function">Version</span><span class="token punctuation">(</span>VersionRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>VersionResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// RunPodSandbox creates and starts a pod-level sandbox. Runtimes must ensure</span>
    <span class="token comment">// the sandbox is in the ready state on success.</span>
    rpc <span class="token function">RunPodSandbox</span><span class="token punctuation">(</span>RunPodSandboxRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>RunPodSandboxResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// StopPodSandbox stops any running process that is part of the sandbox and</span>
    <span class="token comment">// reclaims network resources (e.g., IP addresses) allocated to the sandbox.</span>
    <span class="token comment">// If there are any running containers in the sandbox, they must be forcibly</span>
    <span class="token comment">// terminated.</span>
    <span class="token comment">// This call is idempotent, and must not return an error if all relevant</span>
    <span class="token comment">// resources have already been reclaimed. kubelet will call StopPodSandbox</span>
    <span class="token comment">// at least once before calling RemovePodSandbox. It will also attempt to</span>
    <span class="token comment">// reclaim resources eagerly, as soon as a sandbox is not needed. Hence,</span>
    <span class="token comment">// multiple StopPodSandbox calls are expected.</span>
    rpc <span class="token function">StopPodSandbox</span><span class="token punctuation">(</span>StopPodSandboxRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>StopPodSandboxResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// RemovePodSandbox removes the sandbox. If there are any running containers</span>
    <span class="token comment">// in the sandbox, they must be forcibly terminated and removed.</span>
    <span class="token comment">// This call is idempotent, and must not return an error if the sandbox has</span>
    <span class="token comment">// already been removed.</span>
    rpc <span class="token function">RemovePodSandbox</span><span class="token punctuation">(</span>RemovePodSandboxRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>RemovePodSandboxResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// PodSandboxStatus returns the status of the PodSandbox. If the PodSandbox is not</span>
    <span class="token comment">// present, returns an error.</span>
    rpc <span class="token function">PodSandboxStatus</span><span class="token punctuation">(</span>PodSandboxStatusRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>PodSandboxStatusResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// ListPodSandbox returns a list of PodSandboxes.</span>
    rpc <span class="token function">ListPodSandbox</span><span class="token punctuation">(</span>ListPodSandboxRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>ListPodSandboxResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// CreateContainer creates a new container in specified PodSandbox</span>
    rpc <span class="token function">CreateContainer</span><span class="token punctuation">(</span>CreateContainerRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>CreateContainerResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// StartContainer starts the container.</span>
    rpc <span class="token function">StartContainer</span><span class="token punctuation">(</span>StartContainerRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>StartContainerResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// StopContainer stops a running container with a grace period (i.e., timeout).</span>
    <span class="token comment">// This call is idempotent, and must not return an error if the container has</span>
    <span class="token comment">// already been stopped.</span>
    <span class="token comment">// TODO: what must the runtime do after the grace period is reached?</span>
    rpc <span class="token function">StopContainer</span><span class="token punctuation">(</span>StopContainerRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>StopContainerResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// RemoveContainer removes the container. If the container is running, the</span>
    <span class="token comment">// container must be forcibly removed.</span>
    <span class="token comment">// This call is idempotent, and must not return an error if the container has</span>
    <span class="token comment">// already been removed.</span>
    rpc <span class="token function">RemoveContainer</span><span class="token punctuation">(</span>RemoveContainerRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>RemoveContainerResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// ListContainers lists all containers by filters.</span>
    rpc <span class="token function">ListContainers</span><span class="token punctuation">(</span>ListContainersRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>ListContainersResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// ContainerStatus returns status of the container. If the container is not</span>
    <span class="token comment">// present, returns an error.</span>
    rpc <span class="token function">ContainerStatus</span><span class="token punctuation">(</span>ContainerStatusRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>ContainerStatusResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// UpdateContainerResources updates ContainerConfig of the container.</span>
    rpc <span class="token function">UpdateContainerResources</span><span class="token punctuation">(</span>UpdateContainerResourcesRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>UpdateContainerResourcesResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// ExecSync runs a command in a container synchronously.</span>
    rpc <span class="token function">ExecSync</span><span class="token punctuation">(</span>ExecSyncRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>ExecSyncResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// Exec prepares a streaming endpoint to execute a command in the container.</span>
    rpc <span class="token function">Exec</span><span class="token punctuation">(</span>ExecRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>ExecResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// Attach prepares a streaming endpoint to attach to a running container.</span>
    rpc <span class="token function">Attach</span><span class="token punctuation">(</span>AttachRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>AttachResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// PortForward prepares a streaming endpoint to forward ports from a PodSandbox.</span>
    rpc <span class="token function">PortForward</span><span class="token punctuation">(</span>PortForwardRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>PortForwardResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// ContainerStats returns stats of the container. If the container does not</span>
    <span class="token comment">// exist, the call returns an error.</span>
    rpc <span class="token function">ContainerStats</span><span class="token punctuation">(</span>ContainerStatsRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>ContainerStatsResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// ListContainerStats returns stats of all running containers.</span>
    rpc <span class="token function">ListContainerStats</span><span class="token punctuation">(</span>ListContainerStatsRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>ListContainerStatsResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// UpdateRuntimeConfig updates the runtime configuration based on the given request.</span>
    rpc <span class="token function">UpdateRuntimeConfig</span><span class="token punctuation">(</span>UpdateRuntimeConfigRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>UpdateRuntimeConfigResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// Status returns the status of the runtime.</span>
    rpc <span class="token function">Status</span><span class="token punctuation">(</span>StatusRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>StatusResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// ImageService defines the public APIs for managing images.</span>
service ImageService <span class="token punctuation">{</span>
    <span class="token comment">// ListImages lists existing images.</span>
    rpc <span class="token function">ListImages</span><span class="token punctuation">(</span>ListImagesRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>ListImagesResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// ImageStatus returns the status of the image. If the image is not</span>
    <span class="token comment">// present, returns a response with ImageStatusResponse.Image set to</span>
    <span class="token comment">// nil.</span>
    rpc <span class="token function">ImageStatus</span><span class="token punctuation">(</span>ImageStatusRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>ImageStatusResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// PullImage pulls an image with authentication config.</span>
    rpc <span class="token function">PullImage</span><span class="token punctuation">(</span>PullImageRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>PullImageResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// RemoveImage removes the image.</span>
    <span class="token comment">// This call is idempotent, and must not return an error if the image has</span>
    <span class="token comment">// already been removed.</span>
    rpc <span class="token function">RemoveImage</span><span class="token punctuation">(</span>RemoveImageRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>RemoveImageResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment">// ImageFSInfo returns information of the filesystem that is used to store images.</span>
    rpc <span class="token function">ImageFsInfo</span><span class="token punctuation">(</span>ImageFsInfoRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>ImageFsInfoResponse<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这其中包含了两个gRPC服务：</p>
<ul>
<li><strong>RuntimeService</strong>：容器和Sandbox运行时管理</li>
<li><strong>ImageService</strong>：提供了从镜像仓库拉取、查看、和移除镜像的RPC。</li>
</ul>
<h2 id="当前支持的cri后端" tabindex="-1"><a class="header-anchor" href="#当前支持的cri后端" aria-hidden="true">#</a> 当前支持的CRI后端</h2>
<p>我们最初在使用Kubernetes时通常会默认使用Docker作为容器运行时，其实从Kubernetes1.5开始已经开始支持CRI，目前是处于Alpha版本，通过CRI接口可以指定使用其它容器运行时作为Pod的后端，目前支持CNI的后端有：</p>
<ul>
<li><a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes-incubator/cri-o" target="_blank" rel="noopener noreferrer">cri-o<ExternalLinkIcon/></a>：同时兼容OCI和CRI的容器运行时</li>
<li><a href="https://link.zhihu.com/?target=https%3A//github.com/containerd/cri-containerd" target="_blank" rel="noopener noreferrer">cri-containerd<ExternalLinkIcon/></a>：基于<a href="https://link.zhihu.com/?target=https%3A//github.com/containerd/containerd" target="_blank" rel="noopener noreferrer">Containerd<ExternalLinkIcon/></a>的Kubernetes CNI实现</li>
<li><a href="https://link.zhihu.com/?target=https%3A//coreos.com/rkt/" target="_blank" rel="noopener noreferrer">rkt<ExternalLinkIcon/></a>：由于CoreOS主推的用来跟docker抗衡的容器运行时</li>
<li><a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes/frakti" target="_blank" rel="noopener noreferrer">frakti<ExternalLinkIcon/></a>：基于hypervisor的CRI</li>
<li><a href="https://link.zhihu.com/?target=https%3A//www.docker.com/" target="_blank" rel="noopener noreferrer">docker<ExternalLinkIcon/></a>：kuberentes最初就开始支持的容器运行时，目前还没完全从kubelet中解耦，docker公司同时推广了<a href="https://link.zhihu.com/?target=https%3A//www.opencontainers.org/" target="_blank" rel="noopener noreferrer">OCI<ExternalLinkIcon/></a>标准</li>
<li><a href="https://link.zhihu.com/?target=https%3A//github.com/clearcontainers" target="_blank" rel="noopener noreferrer">clear-containers<ExternalLinkIcon/></a>：由Intel推出的同时兼容OCI和CRI的容器运行时</li>
<li><a href="https://link.zhihu.com/?target=https%3A//katacontainers.io/" target="_blank" rel="noopener noreferrer">kata-containers<ExternalLinkIcon/></a>：符合OCI规范同时兼容CRI</li>
</ul>
<p>CRI是由<a href="https://link.zhihu.com/?target=https%3A//kubernetes.slack.com/archives/sig-node" target="_blank" rel="noopener noreferrer">SIG-Node<ExternalLinkIcon/></a>来维护的。</p>
<h2 id="cni-container-network-interface-容器网络接口" tabindex="-1"><a class="header-anchor" href="#cni-container-network-interface-容器网络接口" aria-hidden="true">#</a> CNI - Container Network Interface（容器网络接口）</h2>
<p>CNI（Container Network Interface）是CNCF旗下的一个项目，由一组用于配置Linux容器的网络接口的规范和库组成，同时还包含了一些插件。CNI仅关心容器创建时的网络分配，和当容器被删除时释放网络资源。通过此链接浏览该项目：<a href="https://link.zhihu.com/?target=https%3A//github.com/containernetworking/cni" target="_blank" rel="noopener noreferrer">https://github.com/containernetworking/cni<ExternalLinkIcon/></a>。</p>
<p>Kubernetes源码的<code v-pre>vendor/github.com/containernetworking/cni/libcni</code>目录中已经包含了CNI的代码，也就是说kubernetes中已经内置了CNI。</p>
<h2 id="接口定义" tabindex="-1"><a class="header-anchor" href="#接口定义" aria-hidden="true">#</a> 接口定义</h2>
<p>CNI的接口中包括以下几个方法：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> CNI <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">AddNetworkList</span><span class="token punctuation">(</span>net <span class="token operator">*</span>NetworkConfigList<span class="token punctuation">,</span> rt <span class="token operator">*</span>RuntimeConf<span class="token punctuation">)</span> <span class="token punctuation">(</span>types<span class="token punctuation">.</span>Result<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
    <span class="token function">DelNetworkList</span><span class="token punctuation">(</span>net <span class="token operator">*</span>NetworkConfigList<span class="token punctuation">,</span> rt <span class="token operator">*</span>RuntimeConf<span class="token punctuation">)</span> <span class="token builtin">error</span>

    <span class="token function">AddNetwork</span><span class="token punctuation">(</span>net <span class="token operator">*</span>NetworkConfig<span class="token punctuation">,</span> rt <span class="token operator">*</span>RuntimeConf<span class="token punctuation">)</span> <span class="token punctuation">(</span>types<span class="token punctuation">.</span>Result<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
    <span class="token function">DelNetwork</span><span class="token punctuation">(</span>net <span class="token operator">*</span>NetworkConfig<span class="token punctuation">,</span> rt <span class="token operator">*</span>RuntimeConf<span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该接口只有四个方法，添加网络、删除网络、添加网络列表、删除网络列表。</p>
<h2 id="设计考量" tabindex="-1"><a class="header-anchor" href="#设计考量" aria-hidden="true">#</a> 设计考量</h2>
<p>CNI设计的时候考虑了以下问题：</p>
<ul>
<li>容器运行时必须在调用任何插件之前为容器创建一个新的网络命名空间。</li>
<li>然后，运行时必须确定这个容器应属于哪个网络，并为每个网络确定哪些插件必须被执行。</li>
<li>网络配置采用JSON格式，可以很容易地存储在文件中。网络配置包括必填字段，如<code v-pre>name</code>和<code v-pre>type</code>以及插件（类型）。网络配置允许字段在调用之间改变值。为此，有一个可选的字段<code v-pre>args</code>，必须包含不同的信息。</li>
<li>容器运行时必须按顺序为每个网络执行相应的插件，将容器添加到每个网络中。</li>
<li>在完成容器生命周期后，运行时必须以相反的顺序执行插件（相对于执行添加容器的顺序）以将容器与网络断开连接。</li>
<li>容器运行时不能为同一容器调用并行操作，但可以为不同的容器调用并行操作。</li>
<li>容器运行时必须为容器订阅ADD和DEL操作，这样ADD后面总是跟着相应的DEL。 DEL可能跟着额外的DEL，但是，插件应该允许处理多个DEL（即插件DEL应该是幂等的）。</li>
<li>容器必须由ContainerID唯一标识。存储状态的插件应该使用（网络名称，容器ID）的主键来完成。</li>
<li>运行时不能调用同一个网络名称或容器ID执行两次ADD（没有相应的DEL）。换句话说，给定的容器ID必须只能添加到特定的网络一次。</li>
</ul>
<h2 id="cni插件" tabindex="-1"><a class="header-anchor" href="#cni插件" aria-hidden="true">#</a> CNI插件</h2>
<p>CNI插件必须实现一个可执行文件，这个文件可以被容器管理系统（例如rkt或Kubernetes）调用。</p>
<p>CNI插件负责将网络接口插入容器网络命名空间（例如，veth对的一端），并在主机上进行任何必要的改变（例如将veth的另一端连接到网桥）。然后将IP分配给接口，并通过调用适当的IPAM插件来设置与“IP地址管理”部分一致的路由。</p>
<h2 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数</h2>
<p>CNI插件必须支持以下操作：</p>
<h2 id="将容器添加到网络" tabindex="-1"><a class="header-anchor" href="#将容器添加到网络" aria-hidden="true">#</a> 将容器添加到网络</h2>
<p>参数：</p>
<ul>
<li><strong>版本</strong>。调用者正在使用的CNI规范（容器管理系统或调用插件）的版本。</li>
<li><strong>容器ID</strong> 。由运行时分配的容器的唯一明文标识符。一定不能是空的。</li>
<li><strong>网络命名空间路径</strong>。要添加的网络名称空间的路径，即<code v-pre>/proc/[pid]/ns/net</code>或绑定挂载/链接。</li>
<li><strong>网络配置</strong>。描述容器可以加入的网络的JSON文档。架构如下所述。</li>
<li><strong>额外的参数</strong>。这提供了一个替代机制，允许在每个容器上简单配置CNI插件。</li>
<li><strong>容器内接口的名称</strong>。这是应该分配给容器（网络命名空间）内创建的接口的名称；因此它必须符合Linux接口名称上的标准限制。</li>
</ul>
<p>结果：</p>
<ul>
<li><strong>接口列表</strong>。根据插件的不同，这可以包括沙箱（例如容器或管理程序）接口名称和/或主机接口名称，每个接口的硬件地址以及接口所在的沙箱（如果有的话）的详细信息。</li>
<li><strong>分配给每个接口的IP配置</strong>。分配给沙箱和/或主机接口的IPv4和/或IPv6地址，网关和路由。</li>
<li><strong>DNS信息</strong>。包含nameserver、domain、search domain和option的DNS信息的字典。</li>
</ul>
<h2 id="从网络中删除容器" tabindex="-1"><a class="header-anchor" href="#从网络中删除容器" aria-hidden="true">#</a> 从网络中删除容器</h2>
<p>参数：</p>
<ul>
<li><strong>版本</strong>。调用者正在使用的CNI规范（容器管理系统或调用插件）的版本。</li>
<li><strong>容器ID</strong> ，如上所述。</li>
<li><strong>网络命名空间路径</strong>，如上定义。</li>
<li><strong>网络配置</strong>，如上所述。</li>
<li><strong>额外的参数</strong>，如上所述。</li>
<li><strong>上面定义的容器</strong>内的接口的名称。</li>
<li>所有参数应与传递给相应的添加操作的参数相同。</li>
<li>删除操作应释放配置的网络中提供的containerid拥有的所有资源。</li>
</ul>
<p>报告版本</p>
<ul>
<li>参数：无。</li>
<li>结果：插件支持的CNI规范版本信息。</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{
“cniVersion”：“0.3.1”，//此输出使用的CNI规范的版本
“supportedVersions”：[“0.1.0”，“0.2.0”，“0.3.0”，“0.3.1”] //此插件支持的CNI规范版本列表
} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>CNI插件的详细说明请参考：<a href="https://link.zhihu.com/?target=https%3A//github.com/containernetworking/cni/blob/master/SPEC.md" target="_blank" rel="noopener noreferrer">CNI SPEC<ExternalLinkIcon/></a>。</p>
<h2 id="ip分配" tabindex="-1"><a class="header-anchor" href="#ip分配" aria-hidden="true">#</a> IP分配</h2>
<p>作为容器网络管理的一部分，CNI插件需要为接口分配（并维护）IP地址，并安装与该接口相关的所有必要路由。这给了CNI插件很大的灵活性，但也给它带来了很大的负担。众多的CNI插件需要编写相同的代码来支持用户需要的多种IP管理方案（例如dhcp、host-local）。</p>
<p>为了减轻负担，使IP管理策略与CNI插件类型解耦，我们定义了IP地址管理插件（IPAM插件）。CNI插件的职责是在执行时恰当地调用IPAM插件。 IPAM插件必须确定接口IP/subnet，网关和路由，并将此信息返回到“主”插件来应用配置。 IPAM插件可以通过协议（例如dhcp）、存储在本地文件系统上的数据、网络配置文件的“ipam”部分或上述的组合来获得信息。</p>
<h2 id="ipam插件" tabindex="-1"><a class="header-anchor" href="#ipam插件" aria-hidden="true">#</a> IPAM插件</h2>
<p>像CNI插件一样，调用IPAM插件的可执行文件。可执行文件位于预定义的路径列表中，通过<code v-pre>CNI_PATH</code>指示给CNI插件。 IPAM插件必须接收所有传入CNI插件的相同环境变量。就像CNI插件一样，IPAM插件通过stdin接收网络配置。</p>
<h2 id="可用插件" tabindex="-1"><a class="header-anchor" href="#可用插件" aria-hidden="true">#</a> 可用插件</h2>
<h2 id="main-接口创建" tabindex="-1"><a class="header-anchor" href="#main-接口创建" aria-hidden="true">#</a> Main：接口创建</h2>
<ul>
<li><strong>bridge</strong>：创建网桥，并添加主机和容器到该往桥</li>
<li><strong>ipvlan</strong>：在容器中添加一个<a href="https://link.zhihu.com/?target=https%3A//www.kernel.org/doc/Documentation/networking/ipvlan.txt" target="_blank" rel="noopener noreferrer">ipvlan<ExternalLinkIcon/></a>接口</li>
<li><strong>loopback</strong>：创建一个回环接口</li>
<li><strong>macvlan</strong>：创建一个新的MAC地址，将所有的流量转发到容器</li>
<li><strong>ptp</strong>：创建veth对</li>
<li><strong>vlan</strong>：分配一个vlan设备</li>
</ul>
<h2 id="ipam-ip地址分配" tabindex="-1"><a class="header-anchor" href="#ipam-ip地址分配" aria-hidden="true">#</a> IPAM：IP地址分配</h2>
<ul>
<li><strong>dhcp</strong>：在主机上运行守护程序，代表容器发出DHCP请求</li>
<li><strong>host-local</strong>：维护分配IP的本地数据库</li>
</ul>
<h2 id="meta-其它插件" tabindex="-1"><a class="header-anchor" href="#meta-其它插件" aria-hidden="true">#</a> Meta：其它插件</h2>
<ul>
<li><strong>flannel</strong>：根据flannel的配置文件创建接口</li>
<li><strong>tuning</strong>：调整现有接口的sysctl参数</li>
<li><strong>portmap</strong>：一个基于iptables的portmapping插件。将端口从主机的地址空间映射到容器。</li>
</ul>
<h2 id="csi-container-storage-interface-容器存储接口" tabindex="-1"><a class="header-anchor" href="#csi-container-storage-interface-容器存储接口" aria-hidden="true">#</a> CSI - Container Storage Interface（容器存储接口）</h2>
<p>CSI 代表<a href="https://link.zhihu.com/?target=https%3A//github.com/container-storage-interface/spec/blob/master/spec.md" target="_blank" rel="noopener noreferrer">容器存储接口<ExternalLinkIcon/></a>，CSI 试图建立一个行业标准接口的规范，借助 CSI 容器编排系统（CO）可以将任意存储系统暴露给自己的容器工作负载。有关详细信息，请查看<a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes/community/blob/master/contributors/design-proposals/storage/container-storage-interface.md" target="_blank" rel="noopener noreferrer">设计方案<ExternalLinkIcon/></a>。</p>
<p><code v-pre>csi</code> 卷类型是一种 in-tree（即跟其它存储插件在同一个代码路径下，随 Kubernetes 的代码同时编译的） 的 CSI 卷插件，用于 Pod 与在同一节点上运行的外部 CSI 卷驱动程序交互。部署 CSI 兼容卷驱动后，用户可以使用 <code v-pre>csi</code> 作为卷类型来挂载驱动提供的存储。</p>
<p>CSI 持久化卷支持是在 Kubernetes v1.9 中引入的，作为一个 alpha 特性，必须由集群管理员明确启用。换句话说，集群管理员需要在 apiserver、controller-manager 和 kubelet 组件的 “<code v-pre>--feature-gates =</code>” 标志中加上 “<code v-pre>CSIPersistentVolume = true</code>”。</p>
<p>CSI 持久化卷具有以下字段可供用户指定：</p>
<ul>
<li><code v-pre>driver</code>：一个字符串值，指定要使用的卷驱动程序的名称。必须少于 63 个字符，并以一个字符开头。驱动程序名称可以包含 “.”、“-”、“_” 或数字。</li>
<li><code v-pre>volumeHandle</code>：一个字符串值，唯一标识从 CSI 卷插件的 <code v-pre>CreateVolume</code> 调用返回的卷名。随后在卷驱动程序的所有后续调用中使用卷句柄来引用该卷。</li>
<li><code v-pre>readOnly</code>：一个可选的布尔值，指示卷是否被发布为只读。默认是 false。</li>
</ul>
<h2 id="使用说明" tabindex="-1"><a class="header-anchor" href="#使用说明" aria-hidden="true">#</a> 使用说明</h2>
<p>下面将介绍如何使用 CSI。</p>
<h2 id="动态配置" tabindex="-1"><a class="header-anchor" href="#动态配置" aria-hidden="true">#</a> 动态配置</h2>
<p>可以通过为 CSI 创建插件 <code v-pre>StorageClass</code> 来支持动态配置的 CSI Storage 插件启用自动创建/删除 。</p>
<p>例如，以下 <code v-pre>StorageClass</code> 允许通过名为 <code v-pre>com.example.team/csi-driver</code> 的 CSI Volume Plugin 动态创建 “fast-storage” Volume。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kind: StorageClass
apiVersion: storage.k8s.io/v1
metadata:
  name: fast-storage
provisioner: com.example.team/csi-driver
parameters:
  type: pd-ssd 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要触发动态配置，请创建一个 <code v-pre>PersistentVolumeClaim</code> 对象。例如，下面的 PersistentVolumeClaim 可以使用上面的 StorageClass 触发动态配置。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: my-request-for-storage
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
  storageClassName: fast-storage 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当动态创建 Volume 时，通过 CreateVolume 调用，将参数 <code v-pre>type：pd-ssd</code> 传递给 CSI 插件 <code v-pre>com.example.team/csi-driver</code> 。作为响应，外部 Volume 插件会创建一个新 Volume，然后自动创建一个 <code v-pre>PersistentVolume</code> 对象来对应前面的 PVC 。然后，Kubernetes 会将新的 <code v-pre>PersistentVolume</code> 对象绑定到 <code v-pre>PersistentVolumeClaim</code>，使其可以使用。</p>
<p>如果 <code v-pre>fast-storage</code> StorageClass 被标记为默认值，则不需要在 <code v-pre>PersistentVolumeClaim</code> 中包含 StorageClassName，它将被默认使用。</p>
<h2 id="预配置-volume" tabindex="-1"><a class="header-anchor" href="#预配置-volume" aria-hidden="true">#</a> 预配置 Volume</h2>
<p>您可以通过手动创建一个 <code v-pre>PersistentVolume</code> 对象来展示现有 Volumes，从而在 Kubernetes 中暴露预先存在的 Volume。例如，暴露属于 <code v-pre>com.example.team/csi-driver</code> 这个 CSI 插件的 <code v-pre>existingVolumeName Volume</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>apiVersion: v1
kind: PersistentVolume
metadata:
  name: my-manually-created-pv
spec:
  capacity:
    storage: 5Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  csi:
    driver: com.example.team/csi-driver
    volumeHandle: existingVolumeName
    readOnly: false 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="附着和挂载" tabindex="-1"><a class="header-anchor" href="#附着和挂载" aria-hidden="true">#</a> 附着和挂载</h2>
<p>您可以在任何的 pod 或者 pod 的 template 中引用绑定到 CSI volume 上的 <code v-pre>PersistentVolumeClaim</code>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kind: Pod
apiVersion: v1
metadata:
  name: my-pod
spec:
  containers:
    - name: my-frontend
      image: dockerfile/nginx
      volumeMounts:
      - mountPath: "/var/www/html"
        name: my-csi-volume
  volumes:
    - name: my-csi-volume
      persistentVolumeClaim:
        claimName: my-request-for-storage 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当一个引用了 CSI Volume 的 pod 被调度时， Kubernetes 将针对外部 CSI 插件进行相应的操作，以确保特定的 Volume 被 attached、mounted， 并且能被 pod 中的容器使用。</p>
<p>关于 CSI 实现的详细信息请参考<a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes/community/blob/master/contributors/design-proposals/storage/container-storage-interface.md" target="_blank" rel="noopener noreferrer">设计文档<ExternalLinkIcon/></a>。</p>
<h2 id="创建-csi-驱动" tabindex="-1"><a class="header-anchor" href="#创建-csi-驱动" aria-hidden="true">#</a> 创建 CSI 驱动</h2>
<p>Kubernetes 尽可能少地指定 CSI Volume 驱动程序的打包和部署规范。<a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes/community/blob/master/contributors/design-proposals/storage/container-storage-interface.md%23third-party-csi-volume-drivers" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>记录了在 Kubernetes 上部署 CSI Volume 驱动程序的最低要求。</p>
<p>最低要求文件还包含<a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes/community/blob/master/contributors/design-proposals/storage/container-storage-interface.md%23recommended-mechanism-for-deploying-csi-drivers-on-kubernetes" target="_blank" rel="noopener noreferrer">概述部分<ExternalLinkIcon/></a>，提供了在 Kubernetes 上部署任意容器化 CSI 驱动程序的建议机制。存储提供商可以运用这个机制来简化 Kubernetes 上容器式 CSI 兼容 Volume 驱动程序的部署。</p>
<p>作为推荐部署的一部分，Kubernetes 团队提供以下 sidecar（辅助）容器：</p>
<ul>
<li><a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes-csi/external-attacher" target="_blank" rel="noopener noreferrer">External-attacher<ExternalLinkIcon/></a></li>
</ul>
<p>可监听 Kubernetes VolumeAttachment 对象并触发 ControllerPublish 和 ControllerUnPublish 操作的 sidecar 容器，通过 CSI endpoint 触发 ；</p>
<ul>
<li><a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes-csi/external-provisioner" target="_blank" rel="noopener noreferrer">External-provisioner<ExternalLinkIcon/></a></li>
</ul>
<p>监听 Kubernetes PersistentVolumeClaim 对象的 sidecar 容器，并触发对 CSI 端点的 CreateVolume 和DeleteVolume 操作；</p>
<ul>
<li><a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes-csi/driver-registrar" target="_blank" rel="noopener noreferrer">Driver-registrar<ExternalLinkIcon/></a></li>
</ul>
<p>使用 Kubelet（将来）注册 CSI 驱动程序的 sidecar 容器，并将 <code v-pre>NodeId</code> （通过 <code v-pre>GetNodeID</code> 调用检索到 CSI endpoint）添加到 Kubernetes Node API 对象的 annotation 里面。</p>
<p>存储供应商完全可以使用这些组件来为其插件构建 Kubernetes Deployment，同时让它们的 CSI 驱动程序完全意识不到 Kubernetes 的存在。</p>
<p>另外 CSI 驱动完全是由第三方存储供应商自己维护的，在 kubernetes 1.9 版本中 CSI 还处于 alpha 版本。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '19.md' style='float:left'>⬆️上一节🔗  </a><a href = '21.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


