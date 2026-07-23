<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第16节-sealer-code" tabindex="-1"><a class="header-anchor" href="#第16节-sealer-code" aria-hidden="true">#</a> 第16节 sealer code</h1>
<div><a href = '15.md' style='float:left'>⬆️上一节🔗  </a><a href = '17.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="filepath-join" tabindex="-1"><a class="header-anchor" href="#filepath-join" aria-hidden="true">#</a> filepath.Join</h2>
<p>Go语言中的路径包，用于通过正斜杠分隔的路径，例如URL中的路径。 Go语言中的 <code v-pre>filepath.Join()</code> 函数用于将 <strong>任意数量的指定路径元素连接到单个路径中，并在必要时添加分隔符</strong> 。此函数对结果调用 <code v-pre>Clean</code>，所有空字符串都将被忽略。此外，此函数在路径包下定义。在这里，您需要导入<code v-pre>“path/filepath”</code> 包才能使用这些函数。</p>
<p><strong>用法：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Join</span><span class="token punctuation">(</span>elem <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在此，<strong>elem</strong> 是指定的路径元素。</p>
<p>**返回值：**它返回加入的单路径。</p>
<p><strong>💡简单的一个案例如下：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Golang program to illustrate the usage of </span>
<span class="token comment">// filepath.Join() function </span>
  
<span class="token comment">// Including the main package </span>
<span class="token keyword">package</span> main 
  
<span class="token comment">// Importing fmt and path/filepath </span>
<span class="token keyword">import</span> <span class="token punctuation">(</span> 
    <span class="token string">"fmt"</span>
    <span class="token string">"path/filepath"</span>
<span class="token punctuation">)</span> 
  
<span class="token comment">// Calling main </span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
  
    <span class="token comment">// Calling the Join() function </span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token string">"G"</span><span class="token punctuation">,</span> <span class="token string">"F"</span><span class="token punctuation">,</span> <span class="token string">"G"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token string">"G/F"</span><span class="token punctuation">,</span> <span class="token string">"G"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token string">"gfg"</span><span class="token punctuation">,</span> <span class="token string">"GFG"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token string">"Geeks"</span><span class="token punctuation">,</span> <span class="token string">"for"</span><span class="token punctuation">,</span> <span class="token string">"Geeks"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**🚀 编译结果如下： **</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>G/F/G
G/F/G
gfg/GFG
Geeks/for/Geeks
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="join-master-and-join-node" tabindex="-1"><a class="header-anchor" href="#join-master-and-join-node" aria-hidden="true">#</a> join master and join node</h2>
<blockquote>
<p>分别对应的是加入 <code v-pre>master</code> 节点和 <code v-pre>node</code> 节点</p>
</blockquote>
<p><strong>加入node节点：</strong></p>
<p>这段 Go 代码主要用来执行 <code v-pre>Kubernetes</code> 节点加入集群操作。它定义了一个名为 <code v-pre>joinNodes</code> 的函数，该函数接收两个参数：一个字符串数组 <code v-pre>newNodes</code> 和一个 <code v-pre>kubeadmConfig</code> 结构体，并返回一个错误值。在函数体中，它会判断 <code v-pre>newNodes</code> 数组的长度是否为 0，如果是，就返回 <code v-pre>nil</code>。否则，它会执行 <code v-pre>initKube</code> 函数并传入 <code v-pre>newNodes</code> 数组，然后为每个主节点创建一个 <code v-pre>--rs</code> 字符串，并使用 <code v-pre>JoinHostPort</code> 函数将主节点的 <code v-pre>IP</code> 地址和端口 6433 结合在一起。然后它会创建一个 <code v-pre>ipvs</code> 命令并调用 <code v-pre>joinNode</code> 函数，最后返回这个函数的结果。</p>
<p><strong>加入master节点：</strong></p>
<p>该代码是实现了一个对 Kubernetes 的安装和管理的接口。它包含了一个配置结构体 <code v-pre>Config</code> 和一个实现了 <code v-pre>runtime.Installer</code> 接口的结构体 <code v-pre>Runtime</code>。 <code v-pre>Runtime</code> 结构体定义了安装 Kubernetes 的函数 <code v-pre>Install</code>，以及其他管理 Kubernetes 集群的函数。</p>
<p>这个 <code v-pre>joinMasters</code> 函数似乎是一个定制的 <code v-pre>kubernetes</code> 运行时的一部分。它似乎是一种用于将一个或多个新的主节点添加到现有的 Kubernetes 集群中的方法。它通过首先使用 <code v-pre>initKube</code> 方法初始化新的主节点，然后使用 <code v-pre>copyStaticFiles</code> 方法将一些静态文件复制到新节点，来实现这一点。然后，它使用 <code v-pre>sendKubeConfigFilesToMaster</code> 方法将 kube 配置文件发送到新的主节点。它还使用 <code v-pre>sendClusterCert</code> 方法将集群证书发送到新的主节点。最后，它使用 <code v-pre>Command</code> 方法生成新的主节点的加入命令，然后在新节点上执行该命令。</p>
<p><strong>init初始化：</strong></p>
<p><strong>思路：</strong></p>
<ul>
<li>当sealer先引导cluster install时，init阶段将rootfs/bin复制到init.sh脚本中的/usr/bin</li>
<li>创建引导程序配置 /etc/k0s/k0s.yaml 以引导控制器初始化</li>
<li>生成 k0s 连接令牌 /etc/k0s/worker-token 和 /etc/k0s/controller-token，也是私有注册表证书</li>
<li>初始化控制器节点</li>
<li>获取 ~/.kube/config 的配置以管理集群。</li>
</ul>
<p>该代码是在初始化 <code v-pre>Kubernetes</code> 集群，并完成相关配置和初始化工作。具体来说，它会完成以下工作：</p>
<ul>
<li>配置主机环境</li>
<li>初始化 <code v-pre>kubeadm</code> 服务</li>
<li>生成证书</li>
<li>初始化集群</li>
<li>拷贝静态文件到远程主机</li>
<li>获取集群信息</li>
<li>获取 <code v-pre>kubeadm</code> 配置文件</li>
<li>序列化 <code v-pre>kubeadm</code> 配置文件</li>
<li>将序列化后的 <code v-pre>kubeadm</code> 配置文件拷贝到远程主机</li>
<li>清理临时文件</li>
</ul>
<p>此外，这段代码中还用到了一些第三方库，例如：</p>
<ul>
<li><code v-pre>k8s.io/kubernetes/cmd/kubeadm/app/apis/kubeadm/v1beta2</code></li>
<li><code v-pre>github.com/sealerio/sealer/pkg/runtime/kubernetes/kubeadm</code></li>
<li><code v-pre>github.com/sealerio/sealer/utils/shellcommand</code></li>
<li><code v-pre>github.com/sealerio/sealer/pkg/clustercert</code> 和 <code v-pre>github.com/sirupsen/logrus</code>。</li>
</ul>
<p><strong>utils：</strong></p>
<p>这段代码实现了一个自定义的 Kubernetes 运行时。它定义了一些常量，然后定义了一个 <code v-pre>Runtime</code> 类型，该类型具有用于管理 Kubernetes 集群的方法。例如，它定义了 <code v-pre>cleanK8s</code> 方法，用于在节点上清除所有 Kubernetes 相关的配置和数据，以及 <code v-pre>joinMasters</code> 方法，用于将新的主节点添加到现有的 Kubernetes 集群中。它还定义了一些其他方法，如 <code v-pre>initKube</code>，用于初始化新的节点，以及 <code v-pre>sendClusterCert</code>，用于将集群证书发送到新节点。此外，该代码还定义了一些变量，用于存储有关 Kubernetes 集群和节点的信息。</p>
<h2 id="k0s-types" tabindex="-1"><a class="header-anchor" href="#k0s-types" aria-hidden="true">#</a> k0s types</h2>
<p>定义了一个名为 <code v-pre>ClusterConfig</code> 的类型，它包含了一个 <code v-pre>ClusterSpec</code> 类型的字段 <code v-pre>Spec</code>，和一个 <code v-pre>ClusterConfigStatus</code> 类型的字段 <code v-pre>Status</code>。 <code v-pre>ClusterSpec</code> 包含了一些用来配置集群的参数，例如 API 服务器的地址，存储配置，网络配置，安全策略等。 <code v-pre>ClusterConfigStatus</code> 则用来记录集群的当前状态。</p>
<p><code v-pre>Spec</code> 字段用于存储该集群的配置信息，包括 API 服务器的地址、控制器管理器、调度器、存储、网络、Pod 安全策略、工作节点配置、监控和安装等。</p>
<p><code v-pre>Status</code> 字段用于存储集群的状态信息，例如运行中的节点数量、集群资源使用情况等。</p>
<p>这段代码	声明了一个名为 <code v-pre>ClusterConfig</code> 的结构体，它用于描述 Kubernetes 集群配置。该结构体包含了 <code v-pre>metav1.ObjectMeta</code> 和 <code v-pre>metav1.TypeMeta</code> 两个字段，用于描述元数据信息。它还包含了 <code v-pre>Spec</code> 和 <code v-pre>Status</code> 两个字段，<code v-pre>Spec</code> 用于描述集群的期望状态，<code v-pre>Status</code> 用于描述集群的实际状态。 <code v-pre>Spec</code> 字段又包含了多个子字段，用于描述集群中不同组件的配置。此外，该结构体还实现了 <code v-pre>kubebuilder</code> 生成的一些方法，用于管理和操作 Kubernetes 集群配置。</p>
<p>此外，代码还定义了一些接口和方法，用于处理该类型的对象，例如 <strong>创建、删除、查询、更新</strong> 等。</p>
<p><strong>字段：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// ClusterSpec defines the desired state of ClusterConfig</span>
<span class="token keyword">type</span> ClusterSpec <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	API               <span class="token operator">*</span>APISpec               <span class="token string">`json:"api"`</span>
	ControllerManager <span class="token operator">*</span>ControllerManagerSpec <span class="token string">`json:"controllerManager,omitempty"`</span>
	Scheduler         <span class="token operator">*</span>SchedulerSpec         <span class="token string">`json:"scheduler,omitempty"`</span>
	Storage           <span class="token operator">*</span>StorageSpec           <span class="token string">`json:"storage"`</span>
	Network           <span class="token operator">*</span>Network               <span class="token string">`json:"network"`</span>
	PodSecurityPolicy <span class="token operator">*</span>PodSecurityPolicy     <span class="token string">`json:"podSecurityPolicy"`</span>
	WorkerProfiles    WorkerProfiles         <span class="token string">`json:"workerProfiles,omitempty"`</span>
	Telemetry         <span class="token operator">*</span>ClusterTelemetry      <span class="token string">`json:"telemetry"`</span>
	Install           <span class="token operator">*</span>InstallSpec           <span class="token string">`json:"installConfig,omitempty"`</span>
	Images            <span class="token operator">*</span>ClusterImages         <span class="token string">`json:"images"`</span>
	Extensions        <span class="token operator">*</span>ClusterExtensions     <span class="token string">`json:"extensions,omitempty"`</span>
	Konnectivity      <span class="token operator">*</span>KonnectivitySpec      <span class="token string">`json:"konnectivity,omitempty"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>ClusterSpec</code> 是一个结构体类型，定义了集群配置信息所包含的字段。它包含了以下字段：</p>
<ul>
<li><code v-pre>API</code>：存储 API 服务器的相关配置信息。</li>
<li><code v-pre>ControllerManager</code>：存储控制器管理器的相关配置信息。</li>
<li><code v-pre>Scheduler</code>：存储调度器的相关配置信息。</li>
<li><code v-pre>Storage</code>：存储存储相关的配置信息。</li>
<li><code v-pre>Network</code>：存储网络相关的配置信息。</li>
<li><code v-pre>PodSecurityPolicy</code>：存储 Pod 安全策略相关的配置信息。</li>
<li><code v-pre>WorkerProfiles</code>：存储工作节点配置相关的信息。</li>
<li><code v-pre>Telemetry</code>：存储监控相关的配置信息。</li>
<li><code v-pre>Install</code>：存储安装相关的配置信息。</li>
<li><code v-pre>Images</code>：存储镜像相关的配置信息。</li>
<li><code v-pre>Extensions</code>：存储扩展相关的配置信息。</li>
<li><code v-pre>Konnectivity</code>：存储连接性相关的配置信息。</li>
</ul>
<p><strong>ClusterConfig：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// ClusterConfig is the Schema for the clusterconfigs API</span>
<span class="token keyword">type</span> ClusterConfig <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	metav1<span class="token punctuation">.</span>ObjectMeta <span class="token string">`json:"metadata,omitempty"`</span>
	metav1<span class="token punctuation">.</span>TypeMeta   <span class="token string">`json:",omitempty,inline"`</span>

	Spec   <span class="token operator">*</span>ClusterSpec        <span class="token string">`json:"spec,omitempty"`</span>
	Status ClusterConfigStatus <span class="token string">`json:"status,omitempty"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>ClusterConfig</code> 是一个结构体类型，定义了 Kubernetes 集群的配置信息。它包含了以下字段：</p>
<ul>
<li><code v-pre>ObjectMeta</code>：存储元数据信息。</li>
<li><code v-pre>TypeMeta</code>：存储类型元数据信息。</li>
<li><code v-pre>Spec</code>：存储集群配置信息。</li>
<li><code v-pre>Status</code>：存储集群状态信息。</li>
</ul>
<p><strong>APISpec:</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// APISpec defines the settings for the K0s API</span>
<span class="token keyword">type</span> APISpec <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// Local address on which to bind an API</span>
	Address <span class="token builtin">string</span> <span class="token string">`json:"address"`</span>

	<span class="token comment">// The loadbalancer address (for k0s controllers running behind a loadbalancer)</span>
	ExternalAddress <span class="token builtin">string</span> <span class="token string">`json:"externalAddress,omitempty"`</span>
	<span class="token comment">// TunneledNetworkingMode indicates if we access to KAS through konnectivity tunnel</span>
	TunneledNetworkingMode <span class="token builtin">bool</span> <span class="token string">`json:"tunneledNetworkingMode"`</span>
	<span class="token comment">// Map of key-values (strings) for any extra arguments to pass down to Kubernetes api-server process</span>
	ExtraArgs <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`json:"extraArgs,omitempty"`</span>
	<span class="token comment">// Custom port for k0s-api server to listen on (default: 9443)</span>
	K0sAPIPort <span class="token builtin">int</span> <span class="token string">`json:"k0sApiPort,omitempty"`</span>

	<span class="token comment">// Custom port for kube-api server to listen on (default: 6443)</span>
	Port <span class="token builtin">int</span> <span class="token string">`json:"port"`</span>

	<span class="token comment">// List of additional addresses to push to API servers serving the certificate</span>
	SANs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`json:"sans"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>APISpec</code> 是一个结构体类型，定义了 API 服务器的配置信息。它包含了以下字段：</p>
<ul>
<li><code v-pre>Address</code>：存储 API 服务器绑定的本地地址。</li>
<li><code v-pre>ExternalAddress</code>：存储 API 服务器负载均衡器的地址。</li>
<li><code v-pre>TunneledNetworkingMode</code>：指示是否通过连接性隧道来访问 KAS。</li>
<li><code v-pre>ExtraArgs</code>：存储传递给 Kubernetes API 服务器进程的额外参数的键值映射。</li>
<li><code v-pre>K0sAPIPort</code>：存储 k0s-api 服务器监听的自定义端口。</li>
<li><code v-pre>Port</code>：存储 kube-api 服务器监听的自定义端口。</li>
<li><code v-pre>APISpec</code> 还包含一个名为 <code v-pre>SANs</code> 的字段，用于存储推送到证书服务器的额外地址的列表。</li>
</ul>
<p><strong>💡简单的一个案例如下：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>api <span class="token operator">:=</span> APISpec<span class="token punctuation">{</span>
    Address<span class="token punctuation">:</span> <span class="token string">"192.168.1.100"</span><span class="token punctuation">,</span>
    ExternalAddress<span class="token punctuation">:</span> <span class="token string">"172.16.1.1"</span><span class="token punctuation">,</span>
    TunneledNetworkingMode<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    ExtraArgs<span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
        <span class="token string">"max-requests-inflight"</span><span class="token punctuation">:</span> <span class="token string">"500"</span><span class="token punctuation">,</span>
        <span class="token string">"v"</span><span class="token punctuation">:</span> <span class="token string">"4"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    K0sAPIPort<span class="token punctuation">:</span> <span class="token number">9443</span><span class="token punctuation">,</span>
    Port<span class="token punctuation">:</span> <span class="token number">6443</span><span class="token punctuation">,</span>
    SANs<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"192.168.1.100"</span><span class="token punctuation">,</span> <span class="token string">"172.16.1.1"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

spec <span class="token operator">:=</span> ClusterSpec<span class="token punctuation">{</span>
    API<span class="token punctuation">:</span> <span class="token operator">&amp;</span>api<span class="token punctuation">,</span>
<span class="token punctuation">}</span>

config <span class="token operator">:=</span> ClusterConfig<span class="token punctuation">{</span>
    Spec<span class="token punctuation">:</span> <span class="token operator">&amp;</span>spec<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="runtime-cluster-runtime" tabindex="-1"><a class="header-anchor" href="#runtime-cluster-runtime" aria-hidden="true">#</a> runtime/cluster-runtime</h2>
<h2 id="clusterfile" tabindex="-1"><a class="header-anchor" href="#clusterfile" aria-hidden="true">#</a> clusterfile</h2>
<h2 id="checker" tabindex="-1"><a class="header-anchor" href="#checker" aria-hidden="true">#</a> checker</h2>
<h2 id="client" tabindex="-1"><a class="header-anchor" href="#client" aria-hidden="true">#</a> client</h2>
<h3 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h3>
<h3 id="kubernetes" tabindex="-1"><a class="header-anchor" href="#kubernetes" aria-hidden="true">#</a> Kubernetes</h3>
<p>这段代码定义了一个 <code v-pre>Client</code> 结构体，它封装了一个 Kubernetes 客户端，并提供了一些方法来操作 Kubernetes 集群中的节点、名称空间、服务和 pod。例如，<code v-pre>ListNodes</code> 方法用于获取集群中的所有节点，<code v-pre>UpdateNode</code> 方法用于更新指定的节点，<code v-pre>ListAllNamespacesPods</code> 方法用于获取所有名称空间的所有 pod 的列表。</p>
<ul>
<li><code v-pre>Client</code> 结构体由一个 <code v-pre>*kubernetes.Clientset</code> 字段组成。<code v-pre>kubernetes.Clientset</code> 是 Kubernetes API 客户端的主要入口点，包含了用于操作各种 Kubernetes 资源的各种方法。</li>
<li><code v-pre>NamespacePod</code> 结构体包含了一个名称空间的信息和该名称空间中的所有 pod 的列表。</li>
<li><code v-pre>NamespaceSvc</code> 结构体包含了一个名称空间的信息和该名称空间中的所有服务的列表</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '15.md' style='float:left'>⬆️上一节🔗  </a><a href = '17.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


