<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第40节-速读-sealos-源码" tabindex="-1"><a class="header-anchor" href="#第40节-速读-sealos-源码" aria-hidden="true">#</a> 第40节 速读 sealos 源码</h1>
<div><a href = '39.md' style='float:left'>⬆️上一节🔗  </a><a href = '41.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h2>
<p>这篇文章等的太久了，大致 四个月了把，也是自己经历 docker 跨越到 Kubernetes 以及 CloudNative 生态的过程。</p>
<p>反过来再去理解开源、理解 sealos、 理解 Kubernetes，有种豁然开朗的视角。</p>
<p>这篇文章和其他文章不一样的是，这篇是按照自己现在的思路来写的，具体为什么，在以前的文章中能找到答案~</p>
<p><strong>从 CMD 角度上对接源码，从最开始出发：</strong></p>
<p>不管是 sealer 还是 sealctl，都离不开 镜像的构建核心》 buildah：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/containers/buildah"</span>

	<span class="token string">"github.com/labring/sealos/cmd/sealctl/cmd"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> buildah<span class="token punctuation">.</span><span class="token function">InitReexec</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	cmd<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从 <code v-pre>InitReexec</code> 调用 buildah 初始化开始，进行走进 sealos 的大门：<code v-pre>Execute</code></p>
<p>在 cobra 中，<code v-pre>Execute</code> 只会执行一次，不管是正确的还是失败的~</p>
<p>在调用的时候，会先执行  <code v-pre>init</code> 初始化函数，它 定义了一些初始化工作以及标志：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cobra<span class="token punctuation">.</span><span class="token function">OnInitialize</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">CfgConsoleLogger</span><span class="token punctuation">(</span>debug<span class="token punctuation">,</span> showPath<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	rootCmd<span class="token punctuation">.</span><span class="token function">PersistentFlags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BoolVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>debug<span class="token punctuation">,</span> <span class="token string">"debug"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">"enable debug logger"</span><span class="token punctuation">)</span>
	rootCmd<span class="token punctuation">.</span><span class="token function">PersistentFlags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">BoolVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>showPath<span class="token punctuation">,</span> <span class="token string">"show-path"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token string">"enable show code path"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>哈哈，sealos 对于日志包的封装，还是很让我惊喜的，使用了 <code v-pre>zap</code> 进行二次开发和封装，用于适合自己的业务需要，这对我是有参考意义的，包括 horizon，未来可能需要在 日志包和 错误码设计上进行改进，这是成就一个优秀的开源项目的必要条件~</p>
<p>后面对 <code v-pre>rootCmd</code> 进行了标志绑定，这就是我们 <code v-pre>sealos</code> 的根命令：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// rootCmd represents the base command when called without any subcommands</span>
<span class="token keyword">var</span> rootCmd <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
	Use<span class="token punctuation">:</span>   <span class="token string">"sealos"</span><span class="token punctuation">,</span>
	Short<span class="token punctuation">:</span> <span class="token string">"sealos is a Kubernetes distribution, a unified OS to manage cloud native applications."</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>作为 sealos 成就 Kubernetes 集群最主要的命令，我们来尝试一下 <code v-pre>sealos run</code></p>
<ul>
<li><a href="https://docker.nsddd.top/Cloud-Native-k8s/6.html" target="_blank" rel="noopener noreferrer">使用 sealos 快速搭建 HA cluster<ExternalLinkIcon/></a></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealos run labring/kubernetes:v1.25.0 labring/helm:v3.8.2 labring/calico:v3.24.1 <span class="token punctuation">\</span>
     <span class="token parameter variable">--masters</span> <span class="token number">192.168</span>.0.2,192.168.0.3<span class="token punctuation">\</span>
     <span class="token parameter variable">--nodes</span> <span class="token number">192.168</span>.0.4 <span class="token parameter variable">-p</span> <span class="token punctuation">[</span>your-ssh-passwd<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很高兴的一点，相比较 sealer，sealos 将 run.go 逻辑中的大部分都放在了 pkg 中实现，让其看上去并不是那么臃肿，但是对于 sealos 的架构来说，因为没有 cluster-runtime 作为抽象层，所以 sealos 的依赖过于严重，这也是我目前正在设计 k3s runtime 所必须解决的思路。</p>
<h2 id="原理实现" tabindex="-1"><a class="header-anchor" href="#原理实现" aria-hidden="true">#</a> 原理实现</h2>
<p>run 简简单单的一个命名是高度抽象的：我们 run 的时候 cmd 将 <code v-pre>applier, err := apply.NewApplierFromArgs(images, runArgs)</code> 传递给 <code v-pre>NewApplierFromArgs</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewApplierFromArgs</span><span class="token punctuation">(</span>imageName <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> args <span class="token operator">*</span>RunArgs<span class="token punctuation">)</span> <span class="token punctuation">(</span>applydrivers<span class="token punctuation">.</span>Interface<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	clusterPath <span class="token operator">:=</span> constants<span class="token punctuation">.</span><span class="token function">Clusterfile</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>ClusterName<span class="token punctuation">)</span>
	cf <span class="token operator">:=</span> clusterfile<span class="token punctuation">.</span><span class="token function">NewClusterFile</span><span class="token punctuation">(</span>clusterPath<span class="token punctuation">,</span>
		clusterfile<span class="token punctuation">.</span><span class="token function">WithCustomConfigFiles</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>CustomConfigFiles<span class="token punctuation">)</span><span class="token punctuation">,</span>
		clusterfile<span class="token punctuation">.</span><span class="token function">WithCustomEnvs</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>CustomEnv<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>
	err <span class="token operator">:=</span> cf<span class="token punctuation">.</span><span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> err <span class="token operator">!=</span> clusterfile<span class="token punctuation">.</span>ErrClusterFileNotExists <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">=</span> cf<span class="token punctuation">.</span><span class="token function">SetSingleMode</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>Single<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>

	cluster <span class="token operator">:=</span> cf<span class="token punctuation">.</span><span class="token function">GetCluster</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> cluster <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span><span class="token string">"creating new cluster"</span><span class="token punctuation">)</span>
		cluster <span class="token operator">=</span> <span class="token function">initCluster</span><span class="token punctuation">(</span>args<span class="token punctuation">.</span>ClusterName<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		cluster <span class="token operator">=</span> cluster<span class="token punctuation">.</span><span class="token function">DeepCopy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	c <span class="token operator">:=</span> <span class="token operator">&amp;</span>ClusterArgs<span class="token punctuation">{</span>
		clusterName<span class="token punctuation">:</span> cluster<span class="token punctuation">.</span>Name<span class="token punctuation">,</span>
		cluster<span class="token punctuation">:</span>     cluster<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">runArgs</span><span class="token punctuation">(</span>imageName<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> applydrivers<span class="token punctuation">.</span><span class="token function">NewDefaultApplier</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>cluster<span class="token punctuation">,</span> cf<span class="token punctuation">,</span> imageName<span class="token punctuation">)</span>
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>NewApplierFromArgs</code> 用于创建一个 <code v-pre>Applier</code> 实例对象。它接收两个参数：一个是镜像名称数组 <code v-pre>imageName</code>，另一个是运行参数 args。在这个函数中，它实现了从参数中获取 <code v-pre>ClusterName</code>，然后根据 <code v-pre>ClusterName</code> 获取对应的 <code v-pre>ClusterFile</code>，如果获取不到，则创建一个新的。接着，它根据用户输入的参数，更新集群状态 Cluster 中的 spec，最后通过 Cluster 对象和 ClusterFile 对象，创建一个 Applier 对象返回。</p>
<h2 id="applier" tabindex="-1"><a class="header-anchor" href="#applier" aria-hidden="true">#</a> Applier</h2>
<p>首先，Sealos 会创建一个 Applier 结构体，负责了部署集群的核心逻辑。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewDefaultApplier</span><span class="token punctuation">(</span>cluster <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster<span class="token punctuation">,</span> cf clusterfile<span class="token punctuation">.</span>Interface<span class="token punctuation">,</span> images <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>Interface<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> cluster<span class="token punctuation">.</span>Name <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"cluster name cannot be empty"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> cf <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		cf <span class="token operator">=</span> clusterfile<span class="token punctuation">.</span><span class="token function">NewClusterFile</span><span class="token punctuation">(</span>constants<span class="token punctuation">.</span><span class="token function">Clusterfile</span><span class="token punctuation">(</span>cluster<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	err <span class="token operator">:=</span> cf<span class="token punctuation">.</span><span class="token function">Process</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>cluster<span class="token punctuation">.</span>CreationTimestamp<span class="token punctuation">.</span><span class="token function">IsZero</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Applier<span class="token punctuation">{</span>
		ClusterDesired<span class="token punctuation">:</span> cluster<span class="token punctuation">,</span>
		ClusterFile<span class="token punctuation">:</span>    cf<span class="token punctuation">,</span>
		ClusterCurrent<span class="token punctuation">:</span> cf<span class="token punctuation">.</span><span class="token function">GetCluster</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		RunNewImages<span class="token punctuation">:</span>   images<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>NewDefaultApplier</code> 函数是用于创建一个 <code v-pre>Applier</code> 实例对象的。它接收三个参数：</p>
<ul>
<li>一个是 <code v-pre>Cluster</code> 对象</li>
<li>一个是 <code v-pre>ClusterFile</code> 对象</li>
<li>还有一个是镜像名称数组 <code v-pre>images</code></li>
</ul>
<p>在这个函数中，它实现了从参数中获取集群名称，然后根据集群名称获取对应的 <code v-pre>ClusterFile</code>，如果不存在，则返回一个错误。接着，它根据用户输入的参数，更新集群状态 <code v-pre>ClusterDesired</code> 中的 <code v-pre>Spec</code>，最后通过 <code v-pre>ClusterDesired</code> 对象和 <code v-pre>ClusterFile</code> 对象，创建一个 <code v-pre>Applier</code> 对象返回。</p>
<p><strong>具体步骤如下：</strong></p>
<ol>
<li>判断集群名称是否为空，如果为空则返回一个错误。</li>
<li>判断 <code v-pre>ClusterFile</code> 是否为空，如果为空则创建一个新的 <code v-pre>ClusterFile</code>。</li>
<li>如果 <code v-pre>ClusterDesired</code> 的创建时间戳为空且 <code v-pre>ClusterCurrent</code> 为 <code v-pre>nil</code> 或 <code v-pre>ClusterCurrent</code> 的创建时间戳为空，则初始化创建一个新的集群，<code v-pre>ClusterDesired</code> 的创建时间戳设置为当前时间。</li>
<li>如果 <code v-pre>ClusterDesired</code> 和 <code v-pre>ClusterCurrent</code> 的创建时间戳都不为空，则更新集群状态 <code v-pre>ClusterDesired</code> 中的 <code v-pre>Spec</code>。</li>
</ol>
<p><code v-pre>Applier</code> 采用了 k8s 的 <strong>声明式</strong> 的设计思想，用户声明一个期望的集群状态，而 Applier 负责将集群现在的状态转换成用户期望的状态。</p>
<h2 id="applier-struct" tabindex="-1"><a class="header-anchor" href="#applier-struct" aria-hidden="true">#</a> Applier struct</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Applier <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ClusterDesired     <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster <span class="token comment">// 用户期望的集群状态</span>
    ClusterCurrent     <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster <span class="token comment">// 集群当前状态</span>
    ClusterFile        clusterfile<span class="token punctuation">.</span>Interface <span class="token comment">// 当前集群接口</span>
    Client             kubernetes<span class="token punctuation">.</span>Client
    CurrentClusterInfo <span class="token operator">*</span>version<span class="token punctuation">.</span>Info
    RunNewImages       <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>              <span class="token comment">// run 命令新增的镜像名称</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>clusterfile.Interface</code> 是一个接口类型，Sealos 中通过 <code v-pre>ClusterFile</code> 实现了这一接口。因此，<code v-pre>Applier</code> 结构体中最重要的就是 <code v-pre>Cluster</code> 和 <code v-pre>ClusterFile</code> 这两个类型，它们定义了集群的状态和配置。</p>
<ol>
<li>ClusterDesired：用户期望的集群状态</li>
<li>ClusterCurrent：集群当前状态</li>
<li>ClusterFile：当前集群接口</li>
<li>Client：Kubernetes 客户端</li>
<li>CurrentClusterInfo：集群当前信息</li>
<li>RunNewImages：run 命令新增的镜像名称</li>
</ol>
<h2 id="深挖集群的-cluster-结构体" tabindex="-1"><a class="header-anchor" href="#深挖集群的-cluster-结构体" aria-hidden="true">#</a> 深挖集群的 Cluster 结构体</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Cluster <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    metav1<span class="token punctuation">.</span>TypeMeta   <span class="token string">`json:",inline"`</span>
    metav1<span class="token punctuation">.</span>ObjectMeta <span class="token string">`json:"metadata,omitempty"`</span>

    Spec   ClusterSpec   <span class="token string">`json:"spec,omitempty"`</span>
    Status ClusterStatus <span class="token string">`json:"status,omitempty"`</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> ClusterSpec <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Image ImageList <span class="token string">`json:"image,omitempty"`</span>
    SSH   SSH       <span class="token string">`json:"ssh"`</span>
    Hosts <span class="token punctuation">[</span><span class="token punctuation">]</span>Host    <span class="token string">`json:"hosts,omitempty"`</span>
    Env <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`json:"env,omitempty"`</span>
    Command <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`json:"command,omitempty"`</span>
<span class="token punctuation">}</span>
<span class="token keyword">type</span> ClusterStatus <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Phase      ClusterPhase       <span class="token string">`json:"phase,omitempty"`</span>
    Mounts     <span class="token punctuation">[</span><span class="token punctuation">]</span>MountImage       <span class="token string">`json:"mounts,omitempty"`</span>
    Conditions <span class="token punctuation">[</span><span class="token punctuation">]</span>ClusterCondition <span class="token string">`json:"conditions,omitempty" `</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Cluster 的内容按照 K8s Resource 的格式进行了设计，可以看到是将结构体都拆分出来了，而不是使用的结构体嵌套，这样更加规范、更加整洁。在 ClusterSpec 中，定义了一系列用于部署 K8s 集群的参数，例如，镜像、SSH 参数、节点等等。</p>
<p>而在 ClusterStatus 中，<code v-pre>Phase</code> 定义了当前集群的状态，<code v-pre>Mounts</code> 定义了集群使用的镜像，<code v-pre>Conditions</code> 保存了集群中所发生的一系列事件。</p>
<h2 id="clusterfile" tabindex="-1"><a class="header-anchor" href="#clusterfile" aria-hidden="true">#</a> ClusterFile</h2>
<p><code v-pre>ClusterFile</code> 是真正被 <code v-pre>Applier</code> 操作的对象，以及持久化到文件中的内容。这里包含了所有集群的当前状态信息，同时还包含了 <code v-pre>kubeconfig</code>。这里的 kubeconfig 并不是我们平时操作 k8s 时所用的 config 文件，而是一系列用于搭建集群所需的配置项。在使用 <code v-pre>kubeadm</code> 时，这些配置项往往需要我们手动配置，而 Sealos 在这里会自动帮我们填写并应用于集群中。可以看出，<code v-pre>Cluster</code> 更像是 <code v-pre>ClusterFile</code> 的一个实例，记录了集群实时的状态。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Interface <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	PreProcessor
	<span class="token function">GetCluster</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster
	<span class="token function">GetConfigs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>v2<span class="token punctuation">.</span>Config
	<span class="token function">GetKubeadmConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>runtime<span class="token punctuation">.</span>KubeadmConfig
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建-applier" tabindex="-1"><a class="header-anchor" href="#创建-applier" aria-hidden="true">#</a> 创建 Applier</h2>
<p>创建 Applier 的逻辑：</p>
<p><code v-pre>buildah mount</code> 命令是用于将容器镜像挂载到本地文件系统上的工具。通过该命令可以方便地查看、编辑容器镜像中的文件。具体用法可以参考 <a href="https://buildah.io/commands/mount/" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>。</p>
<p><img src="http://sm.nsddd.top/sm202304152156333.png" alt="Untitled"></p>
<p><strong>创建一个 <code v-pre>Applier</code> 会经过以下步骤：</strong></p>
<ol>
<li>判断是否已经存在 <code v-pre>ClusterFile</code> ，如果存在，那么直接读取，构建出集群状态 <code v-pre>Cluster</code>。否则，初始化创建一个空的集群状态 <code v-pre>Cluster</code>。</li>
<li>根据用户本次的参数，更新集群状态 <code v-pre>Cluster</code> 中的 spec，此时，<code v-pre>Cluster</code> 即为目标的集群状态。</li>
<li>再次从文件中构建 <code v-pre>ClusterFile</code>，作为集群当前的状态和对象。</li>
<li>构建 <code v-pre>Applier</code> 结构体返回。</li>
</ol>
<p>这个时候我们就回到了 run 的逻辑：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>RunE<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>cmd <span class="token operator">*</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> runSingle <span class="token punctuation">{</span>
				addr<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> iputils<span class="token punctuation">.</span><span class="token function">ListLocalHostAddrs</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				runArgs<span class="token punctuation">.</span>Masters <span class="token operator">=</span> iputils<span class="token punctuation">.</span><span class="token function">LocalIP</span><span class="token punctuation">(</span>addr<span class="token punctuation">)</span>
				runArgs<span class="token punctuation">.</span>Single <span class="token operator">=</span> <span class="token boolean">true</span>
			<span class="token punctuation">}</span>

			images<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">args2Images</span><span class="token punctuation">(</span>args<span class="token punctuation">,</span> transport<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> err
			<span class="token punctuation">}</span>

			applier<span class="token punctuation">,</span> err <span class="token operator">:=</span> apply<span class="token punctuation">.</span><span class="token function">NewApplierFromArgs</span><span class="token punctuation">(</span>images<span class="token punctuation">,</span> runArgs<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> err
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> applier<span class="token punctuation">.</span><span class="token function">Apply</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>applier</code> 就是构建出的结构体：构建 <code v-pre>applier</code> 的目的是为了将集群的当前状态转换成用户期望的状态。通过初始化创建一个 <code v-pre>Applier</code>，可以根据用户本次的参数，更新集群状态 <code v-pre>Cluster</code> 中的 spec，最终构建出一个 <code v-pre>Applier</code> 结构体。这个结构体可以将用户期望的集群状态转换成实际的集群状态，实现了 K8s 的声明式的设计思想。接下来到了 <code v-pre>Apply()</code> 操作了。</p>
<h2 id="开始-apply" tabindex="-1"><a class="header-anchor" href="#开始-apply" aria-hidden="true">#</a> 开始 Apply</h2>
<p>接下来，通过 <code v-pre>Applier.Apply()</code>，Sealos 开始正式的部署集群，使集群状态向目标靠近。首先，Sealos 会将当前集群的状态置为 <code v-pre>ClusterInProcess</code>。接下来，根据集群创建或是更新，分别进入两个分支。</p>
<blockquote>
<p>这里有一点需要说明得，之前有一次面试的时候面试官问我，<code v-pre>apply</code> 和 <code v-pre>create</code> 实现的逻辑，这两个实现的逻辑区别就是，很明显的，create 并不会进行 控制器 的 观察、分析阶段，而是直接执行和更新，这样的是符合的是命令式特点，而并非是声明式的 特征。</p>
</blockquote>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Applier<span class="token punctuation">)</span> <span class="token function">Apply</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	clusterPath <span class="token operator">:=</span> constants<span class="token punctuation">.</span><span class="token function">Clusterfile</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>ClusterDesired<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
	<span class="token comment">// clusterErr and appErr should not appear in the same time</span>
	<span class="token keyword">var</span> clusterErr<span class="token punctuation">,</span> appErr <span class="token builtin">error</span>
	<span class="token comment">// save cluster to file after apply</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">switch</span> clusterErr<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token operator">*</span>processor<span class="token punctuation">.</span>CheckError<span class="token punctuation">,</span> <span class="token operator">*</span>processor<span class="token punctuation">.</span>PreProcessError<span class="token punctuation">:</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		logger<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span><span class="token string">"write cluster file to local storage: %s"</span><span class="token punctuation">,</span> clusterPath<span class="token punctuation">)</span>
		saveErr <span class="token operator">:=</span> yaml<span class="token punctuation">.</span><span class="token function">MarshalYamlToFile</span><span class="token punctuation">(</span>clusterPath<span class="token punctuation">,</span> c<span class="token punctuation">.</span><span class="token function">getWriteBackObjects</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">...</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> saveErr <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			logger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">"write cluster file to local storage: %s error, %s"</span><span class="token punctuation">,</span> clusterPath<span class="token punctuation">,</span> saveErr<span class="token punctuation">)</span>
			logger<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span><span class="token string">"complete write back file: \n %v"</span><span class="token punctuation">,</span> c<span class="token punctuation">.</span><span class="token function">getWriteBackObjects</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	c<span class="token punctuation">.</span><span class="token function">initStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> c<span class="token punctuation">.</span>ClusterDesired<span class="token punctuation">.</span>CreationTimestamp<span class="token punctuation">.</span><span class="token function">IsZero</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>c<span class="token punctuation">.</span>ClusterCurrent <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token operator">||</span> c<span class="token punctuation">.</span>ClusterCurrent<span class="token punctuation">.</span>CreationTimestamp<span class="token punctuation">.</span><span class="token function">IsZero</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		clusterErr <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">initCluster</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span>ClusterDesired<span class="token punctuation">.</span>CreationTimestamp <span class="token operator">=</span> metav1<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		clusterErr<span class="token punctuation">,</span> appErr <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">reconcileCluster</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		c<span class="token punctuation">.</span>ClusterDesired<span class="token punctuation">.</span>CreationTimestamp <span class="token operator">=</span> c<span class="token punctuation">.</span>ClusterCurrent<span class="token punctuation">.</span>CreationTimestamp
	<span class="token punctuation">}</span>
	c<span class="token punctuation">.</span><span class="token function">updateStatus</span><span class="token punctuation">(</span>clusterErr<span class="token punctuation">,</span> appErr<span class="token punctuation">)</span>

	<span class="token comment">// return app error if not nil</span>
	<span class="token keyword">if</span> appErr <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>errors<span class="token punctuation">.</span><span class="token function">Is</span><span class="token punctuation">(</span>appErr<span class="token punctuation">,</span> processor<span class="token punctuation">.</span>ErrCancelled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> appErr
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> clusterErr
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Apply()</code> 函数是 Sealos 中负责部署集群的核心函数。该函数通过传入的 <code v-pre>Applier</code> 实例的 <code v-pre>ClusterDesired</code> 和 <code v-pre>ClusterCurrent</code> 的值来判断集群是否已经存在。在函数执行时，首先会将当前集群状态置为 <code v-pre>ClusterInProcess</code>，然后分别调用 <code v-pre>initCluster()</code> 和 <code v-pre>reconcileCluster()</code> 来 <strong>创建和更新集群</strong>。最后，函数会根据 <code v-pre>appErr</code> 和 <code v-pre>clusterErr</code> 的值来更新集群（或者 APP）的状态，因为上面讲过 <code v-pre>EXECUTE</code> 只会执行一次，无论对错，所以 cluster 和 app 只能有一个存在。</p>
<p>为什么需要 <code v-pre>c.initStatus()</code>:</p>
<p>initStatus 函数的作用是初始化集群状态，即为集群状态 Cluster 中的 Status 字段赋初值：将 Phase 设为 ClusterInProcess，如果 Conditions 为空，则创建一个空数组。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Applier<span class="token punctuation">)</span> <span class="token function">initStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>ClusterDesired<span class="token punctuation">.</span>Status<span class="token punctuation">.</span>Phase <span class="token operator">=</span> v2<span class="token punctuation">.</span>ClusterInProcess
	<span class="token keyword">if</span> c<span class="token punctuation">.</span>ClusterDesired<span class="token punctuation">.</span>Status<span class="token punctuation">.</span>Conditions <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span>ClusterDesired<span class="token punctuation">.</span>Status<span class="token punctuation">.</span>Conditions <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>v2<span class="token punctuation">.</span>ClusterCondition<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数实现很简单，先将 <code v-pre>Phase</code> 设为 <code v-pre>ClusterInProcess</code>，表示集群正在部署中。然后，判断 <code v-pre>Conditions</code> 是否为空，如果为空，则将 <code v-pre>Conditions</code> 设为一个空数组。</p>
<p>这段代码是在判断集群是否已经存在，具体解释如下：</p>
<ul>
<li><code v-pre>c.ClusterDesired.CreationTimestamp.IsZero()</code> 判断期望状态的 <code v-pre>CreationTimestamp</code> 是否为空，如果为空则说明集群不存在或者还没有创建。</li>
<li><code v-pre>(c.ClusterCurrent == nil || c.ClusterCurrent.CreationTimestamp.IsZero())</code> 判断当前状态的 <code v-pre>ClusterCurrent</code> 是否为空或者 <code v-pre>CreationTimestamp</code> 是否为空，如果为空则说明集群不存在或者还没有创建。</li>
</ul>
<p>如果以上两个条件都满足，说明集群还没有创建，可以调用 <code v-pre>initCluster()</code> 函数来创建一个新的集群。否则，说明集群已经存在，可以调用 <code v-pre>reconcileCluster()</code> 函数来更新集群。</p>
<p><code v-pre>yaml.MarshalYamlToFile</code> 的作用是将一个或多个对象序列化为 YAML 格式，并将序列化后的字符串写入指定的文件。在 Sealos 中，<code v-pre>yaml.MarshalYamlToFile</code> 用于将 <code v-pre>ClusterFile</code> 对象序列化为 YAML 格式，并将其写入指定的文件中。这个文件用于持久化集群的状态。</p>
<p><code v-pre>initCluster()</code> 函数会从零开始创建一个集群，会使用 <code v-pre>CreateProcessor</code> 对象来部署期望状态的集群。<code v-pre>CreateProcessor.Execute()</code> 函数接收期望的集群状态 <code v-pre>ClusterDesired</code>，然后执行一系列 pipeline，正式进入实际的集群部署过程中。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>InstallProcessor<span class="token punctuation">)</span> <span class="token function">GetPipeLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">func</span><span class="token punctuation">(</span>cluster <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster<span class="token punctuation">)</span> <span class="token builtin">error</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> todoList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">func</span><span class="token punctuation">(</span>cluster <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster<span class="token punctuation">)</span> <span class="token builtin">error</span>
	todoList <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>todoList<span class="token punctuation">,</span>
		c<span class="token punctuation">.</span>SyncStatusAndCheck<span class="token punctuation">,</span>
		c<span class="token punctuation">.</span>ConfirmOverrideApps<span class="token punctuation">,</span>
		c<span class="token punctuation">.</span>PreProcess<span class="token punctuation">,</span>
		c<span class="token punctuation">.</span>RunConfig<span class="token punctuation">,</span>
		c<span class="token punctuation">.</span>MountRootfs<span class="token punctuation">,</span>
		c<span class="token punctuation">.</span>MirrorRegistry<span class="token punctuation">,</span>
		c<span class="token punctuation">.</span>UpgradeIfNeed<span class="token punctuation">,</span>
		<span class="token comment">// i.GetPhasePluginFunc(plugin.PhasePreGuest),</span>
		c<span class="token punctuation">.</span>RunGuest<span class="token punctuation">,</span>
		c<span class="token punctuation">.</span>PostProcess<span class="token punctuation">,</span>
		<span class="token comment">// i.GetPhasePluginFunc(plugin.PhasePostInstall),</span>
	<span class="token punctuation">)</span>
	<span class="token keyword">return</span> todoList<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 Sealos 中，<code v-pre>CreateProcessor</code> 和 <code v-pre>InstallProcessor</code> 是两个不同的 Processor，分别用于创建集群和安装集群。它们实现了 <code v-pre>processor.Processor</code> 接口，该接口定义了执行集群部署所需的基本方法。每个 Processor 中都包含了一系列的 Pipeline，每个 Pipeline 中又包含了一系列的函数，这些函数用于执行具体的部署操作。</p>
<p>在 <code v-pre>CreateProcessor</code> 中，<code v-pre>GetPipeLine()</code> 函数返回一个包含了创建集群所需 Pipeline 的列表。这个列表中包含了一些基本操作，例如检查集群是否已经存在、运行配置、检查并挂载 rootfs、启动 bootstrap 等等。这些操作会被依次执行，最终完成集群的创建过程。</p>
<p>而在 <code v-pre>InstallProcessor</code> 中，<code v-pre>GetPipeLine()</code> 函数返回一个包含了安装集群所需 Pipeline 的列表。这个列表中包含了与创建集群类似的操作，但也包含了一些额外的操作，如升级、运行 guest、后处理等等。这些操作会被依次执行，最终完成集群的安装过程。</p>
<p>从功能上来看，<code v-pre>CreateProcessor</code> 更侧重于创建集群，而 <code v-pre>InstallProcessor</code> 更侧重于安装集群。实际上，在 Sealos 中，这两个 Processor 之间并没有太大的区别，它们都包含了相同的 Pipeline 和操作。唯一的区别在于它们被用于不同的场景。</p>
<p><code v-pre>pipeline</code> 主要分为以下几个步骤：</p>
<ol>
<li>
<p>Check：检查集群的主机，包括 IP 是否能够访问，主机是否为 Linux 系统，用户是否为 root 等。</p>
</li>
<li>
<p>PreProcess：负责集群部署前的镜像预处理操作，主要是使用 <code v-pre>image.Manager</code> 对象来处理镜像。在这里会拉取镜像，并对镜像进行格式检查、挂载到 rootfs 上等操作。</p>
</li>
<li>
<p>RunConfig：将集群状态中的 <code v-pre>working container</code> 导出成 yaml 格式的配置并持久化到宿主机的文件系统中。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>InstallProcessor<span class="token punctuation">)</span> <span class="token function">RunConfig</span><span class="token punctuation">(</span><span class="token boolean">_</span> <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>NewMounts<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	eg<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> errgroup<span class="token punctuation">.</span><span class="token function">WithContext</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> cManifest <span class="token operator">:=</span> <span class="token keyword">range</span> c<span class="token punctuation">.</span>NewMounts <span class="token punctuation">{</span>
		manifest <span class="token operator">:=</span> cManifest
		eg<span class="token punctuation">.</span><span class="token function">Go</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			cfg <span class="token operator">:=</span> config<span class="token punctuation">.</span><span class="token function">NewConfiguration</span><span class="token punctuation">(</span>manifest<span class="token punctuation">.</span>ImageName<span class="token punctuation">,</span> manifest<span class="token punctuation">.</span>MountPoint<span class="token punctuation">,</span> c<span class="token punctuation">.</span>ClusterFile<span class="token punctuation">.</span><span class="token function">GetConfigs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> cfg<span class="token punctuation">.</span><span class="token function">Dump</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> eg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>RunConfig</code> 函数的作用是将集群状态中的 <code v-pre>working container</code> 导出成 yaml 格式的配置并持久化到宿主机的文件系统中。在函数执行时，会将 <code v-pre>working container</code> 的配置导出成 Config 对象，然后使用 <code v-pre>config.Dump()</code> 函数将 Config 对象序列化为 YAML 格式，并将其写入指定的文件中。在 Sealos 中，<code v-pre>RunConfig</code> 函数主要用于生成 Kubernetes 集群的配置文件，这些配置文件用于持久化集群的状态。</p>
<p><code v-pre>rootfs → Clusterfile</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Dumper<span class="token punctuation">)</span> <span class="token function">Dump</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Configs<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span><span class="token string">"clusterfile config is empty!"</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">WriteFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"failed to write config files %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Dumper<span class="token punctuation">)</span> <span class="token function">WriteFiles</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> config <span class="token operator">:=</span> <span class="token keyword">range</span> c<span class="token punctuation">.</span>Configs <span class="token punctuation">{</span>
		<span class="token keyword">if</span> config<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Match <span class="token operator">!=</span> <span class="token string">""</span> <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Match <span class="token operator">!=</span> c<span class="token punctuation">.</span>name <span class="token punctuation">{</span>
			<span class="token keyword">continue</span>
		<span class="token punctuation">}</span>
		configData <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Data<span class="token punctuation">)</span>
		configPath <span class="token operator">:=</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>RootPath<span class="token punctuation">,</span> config<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Path<span class="token punctuation">)</span>
		<span class="token comment">//only the YAML format is supported</span>
		<span class="token keyword">switch</span> config<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Strategy <span class="token punctuation">{</span>
		<span class="token keyword">case</span> v1beta1<span class="token punctuation">.</span>Merge<span class="token punctuation">:</span>
			configData<span class="token punctuation">,</span> err <span class="token operator">=</span> <span class="token function">getMergeConfigData</span><span class="token punctuation">(</span>configPath<span class="token punctuation">,</span> configData<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> err
			<span class="token punctuation">}</span>
		<span class="token keyword">case</span> v1beta1<span class="token punctuation">.</span>Insert<span class="token punctuation">:</span>
			configData<span class="token punctuation">,</span> err <span class="token operator">=</span> <span class="token function">getAppendOrInsertConfigData</span><span class="token punctuation">(</span>configPath<span class="token punctuation">,</span> configData<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> err
			<span class="token punctuation">}</span>
		<span class="token keyword">case</span> v1beta1<span class="token punctuation">.</span>Append<span class="token punctuation">:</span>
			configData<span class="token punctuation">,</span> err <span class="token operator">=</span> <span class="token function">getAppendOrInsertConfigData</span><span class="token punctuation">(</span>configPath<span class="token punctuation">,</span> configData<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> err
			<span class="token punctuation">}</span>
		<span class="token keyword">case</span> v1beta1<span class="token punctuation">.</span>Override<span class="token punctuation">:</span>
		<span class="token punctuation">}</span>
		err <span class="token operator">=</span> file<span class="token punctuation">.</span><span class="token function">WriteFile</span><span class="token punctuation">(</span>configPath<span class="token punctuation">,</span> configData<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"write config file failed %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Dump()</code> 函数是一个将集群配置写入文件的方法。该函数首先检查配置是否为空。如果不为空，它将调用 <code v-pre>WriteFiles()</code> 方法，该方法将为每个配置文件写入文件。如果没有发生错误，则返回 <code v-pre>nil</code>。如果出现错误，则返回错误。</p>
<p><code v-pre>WriteFiles()</code> 方法是将集群配置写入文件的实际方法。该方法遍历所有配置并检查与当前名称匹配的配置。如果找到符合条件的配置，则使用该配置中的数据将其写入文件。在写入到文件之前，还需要检查配置中的策略并进行相应的处理。最后，该方法将返回 <code v-pre>nil</code> 或错误。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
	Merge    StrategyType <span class="token operator">=</span> <span class="token string">"merge"</span>
	Override StrategyType <span class="token operator">=</span> <span class="token string">"override"</span>
	Insert   StrategyType <span class="token operator">=</span> <span class="token string">"insert"</span>
	Append   StrategyType <span class="token operator">=</span> <span class="token string">"append"</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些常量定义了 <code v-pre>StrategyType</code> 类型的枚举值，用于指定在更新配置文件时使用的策略。其中，<code v-pre>Merge</code> 表示将新配置合并到旧配置中，<code v-pre>Override</code> 表示使用新配置覆盖旧配置，<code v-pre>Insert</code> 表示在旧配置文件的指定位置插入新配置，<code v-pre>Append</code> 表示将新配置追加到旧配置文件的末尾。</p>
</li>
<li>
<p><code v-pre>MountRootfs</code>：将挂载的镜像内容按照类别分发到每台机器上。这里需要介绍一下 sealos 的镜像结构，以最基础的 k8s 镜像为例：</p>
</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>labring/kubernetes
   - etc # 配置项
   - scripts # 脚本
       - init-containerd.sh
       - init-kube.sh
       - init-shim.sh
       - init-registry.sh
       - init.sh
   - Kubefile # dockerfile 语法，定义了镜像的执行逻辑
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>这个过程对我们制作 k3s 的镜像来说非常重要，我在下一个标题详细解释这个步骤，或许我们应该好好的理解这个步骤~</p>
</blockquote>
<h2 id="mount" tabindex="-1"><a class="header-anchor" href="#mount" aria-hidden="true">#</a> mount</h2>
<p>上面有一部分是 mount 的基础镜像，看到了 <code v-pre>init.sh</code> 是最开始执行的。这个时候会用 <code v-pre>init</code> 初始化一些 kubeadm 和 kubectl 一些东西，我们在学习 Kubernetes 中也知道了，Kubernetes 的一些初始化问题，是没有办法使用容器化部署的，因为 kubeadm 是和 容器和 宿主机打交道的。</p>
<p>Sealos 的镜像结构中包含了 addons 文件夹，其中存放了一些额外的组件，比如 dashboard 和 metrics-server。在 MountRootfs 这步中，会执行 addons 类型的 init.sh 脚本，将 addons 中的组件安装到集群中</p>
<p>K8s 作为整个集群的基础，虽然最终镜像内的目录结构与其他一致，但其构建过程稍微有所不同。在 CI 中，我们可以看到，k8s 镜像其实是合并了多个文件夹，containerd，rootfs 和 registry。这些独立的文件夹中包含有安装对应组件的脚本。在 MountRootfs 这步中，只会执行 rootfs 和 addons 类型的 init.sh 脚本。这也很好理解，因为到目前为止，Sealos 仅仅在每台机器上安装成功了 kubelet，整个 k8s 集群还未可用。</p>
<p>先通过一个 构造函数 ：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>f <span class="token operator">*</span>defaultRootfs<span class="token punctuation">)</span> <span class="token function">MountRootfs</span><span class="token punctuation">(</span>cluster <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster<span class="token punctuation">,</span> hosts <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> f<span class="token punctuation">.</span><span class="token function">mountRootfs</span><span class="token punctuation">(</span>cluster<span class="token punctuation">,</span> hosts<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然我也不知道这个有啥用，不过也算是实现了结构体方法把：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>f <span class="token operator">*</span>defaultRootfs<span class="token punctuation">)</span> <span class="token function">mountRootfs</span><span class="token punctuation">(</span>cluster <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster<span class="token punctuation">,</span> ipList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	target <span class="token operator">:=</span> constants<span class="token punctuation">.</span><span class="token function">NewData</span><span class="token punctuation">(</span>f<span class="token punctuation">.</span><span class="token function">getClusterName</span><span class="token punctuation">(</span>cluster<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">RootFSPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	eg<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> errgroup<span class="token punctuation">.</span><span class="token function">WithContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
	envProcessor <span class="token operator">:=</span> env<span class="token punctuation">.</span><span class="token function">NewEnvProcessor</span><span class="token punctuation">(</span>cluster<span class="token punctuation">,</span> f<span class="token punctuation">.</span>mounts<span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> mount <span class="token operator">:=</span> <span class="token keyword">range</span> f<span class="token punctuation">.</span>mounts <span class="token punctuation">{</span>
		src <span class="token operator">:=</span> mount
		eg<span class="token punctuation">.</span><span class="token function">Go</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token operator">!</span>file<span class="token punctuation">.</span><span class="token function">IsExist</span><span class="token punctuation">(</span>src<span class="token punctuation">.</span>MountPoint<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				logger<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span><span class="token string">"Image %s not exist, render env continue"</span><span class="token punctuation">,</span> src<span class="token punctuation">.</span>ImageName<span class="token punctuation">)</span>
				<span class="token keyword">return</span> <span class="token boolean">nil</span>
			<span class="token punctuation">}</span>
			<span class="token comment">// TODO: if we are planing to support rendering templates for each host,</span>
			<span class="token comment">// then move this rendering process before ssh.CopyDir and do it one by one.</span>
			err <span class="token operator">:=</span> <span class="token function">renderTemplatesWithEnv</span><span class="token punctuation">(</span>src<span class="token punctuation">.</span>MountPoint<span class="token punctuation">,</span> ipList<span class="token punctuation">,</span> envProcessor<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"failed to render env: %w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			dirs<span class="token punctuation">,</span> err <span class="token operator">:=</span> file<span class="token punctuation">.</span><span class="token function">StatDir</span><span class="token punctuation">(</span>src<span class="token punctuation">.</span>MountPoint<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"failed to stat files: %w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>dirs<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
				<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> exec<span class="token punctuation">.</span><span class="token function">RunBashCmd</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span>constants<span class="token punctuation">.</span>DefaultChmodBash<span class="token punctuation">,</span> src<span class="token punctuation">.</span>MountPoint<span class="token punctuation">)</span><span class="token punctuation">)</span>
				<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
					<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"run chmod to rootfs failed: %w"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> eg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	sshClient <span class="token operator">:=</span> f<span class="token punctuation">.</span><span class="token function">getSSH</span><span class="token punctuation">(</span>cluster<span class="token punctuation">)</span>
	notRegistryDirFilter <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>entry fs<span class="token punctuation">.</span>DirEntry<span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> <span class="token operator">!</span>constants<span class="token punctuation">.</span><span class="token function">IsRegistryDir</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span> <span class="token punctuation">}</span>

	<span class="token keyword">for</span> idx <span class="token operator">:=</span> <span class="token keyword">range</span> ipList <span class="token punctuation">{</span>
		ip <span class="token operator">:=</span> ipList<span class="token punctuation">[</span>idx<span class="token punctuation">]</span>
		eg<span class="token punctuation">.</span><span class="token function">Go</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			egg<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> errgroup<span class="token punctuation">.</span><span class="token function">WithContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
			<span class="token keyword">for</span> idj <span class="token operator">:=</span> <span class="token keyword">range</span> f<span class="token punctuation">.</span>mounts <span class="token punctuation">{</span>
				mount <span class="token operator">:=</span> f<span class="token punctuation">.</span>mounts<span class="token punctuation">[</span>idj<span class="token punctuation">]</span>
				egg<span class="token punctuation">.</span><span class="token function">Go</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
					<span class="token keyword">switch</span> mount<span class="token punctuation">.</span>Type <span class="token punctuation">{</span>
					<span class="token keyword">case</span> v2<span class="token punctuation">.</span>RootfsImage<span class="token punctuation">,</span> v2<span class="token punctuation">.</span>PatchImage<span class="token punctuation">:</span>
						logger<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span><span class="token string">"send mount image, ip: %s, image name: %s, image type: %s"</span><span class="token punctuation">,</span> ip<span class="token punctuation">,</span> mount<span class="token punctuation">.</span>ImageName<span class="token punctuation">,</span> mount<span class="token punctuation">.</span>Type<span class="token punctuation">)</span>
						err <span class="token operator">:=</span> ssh<span class="token punctuation">.</span><span class="token function">CopyDir</span><span class="token punctuation">(</span>sshClient<span class="token punctuation">,</span> ip<span class="token punctuation">,</span> mount<span class="token punctuation">.</span>MountPoint<span class="token punctuation">,</span> target<span class="token punctuation">,</span> notRegistryDirFilter<span class="token punctuation">)</span>
						<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
							<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"failed to copy %s %s: %v"</span><span class="token punctuation">,</span> mount<span class="token punctuation">.</span>Type<span class="token punctuation">,</span> mount<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span>
					<span class="token keyword">return</span> <span class="token boolean">nil</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> egg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	err <span class="token operator">:=</span> eg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	endEg<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> errgroup<span class="token punctuation">.</span><span class="token function">WithContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
	master0 <span class="token operator">:=</span> cluster<span class="token punctuation">.</span><span class="token function">GetMaster0IPAndPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> idx <span class="token operator">:=</span> <span class="token keyword">range</span> f<span class="token punctuation">.</span>mounts <span class="token punctuation">{</span>
		mountInfo <span class="token operator">:=</span> f<span class="token punctuation">.</span>mounts<span class="token punctuation">[</span>idx<span class="token punctuation">]</span>
		endEg<span class="token punctuation">.</span><span class="token function">Go</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> mountInfo<span class="token punctuation">.</span>Type <span class="token operator">==</span> v2<span class="token punctuation">.</span>AppImage <span class="token punctuation">{</span>
				logger<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span><span class="token string">"send app mount images, ip: %s, image name: %s, image type: %s"</span><span class="token punctuation">,</span> master0<span class="token punctuation">,</span> mountInfo<span class="token punctuation">.</span>ImageName<span class="token punctuation">,</span> mountInfo<span class="token punctuation">.</span>Type<span class="token punctuation">)</span>
				err <span class="token operator">=</span> ssh<span class="token punctuation">.</span><span class="token function">CopyDir</span><span class="token punctuation">(</span>sshClient<span class="token punctuation">,</span> master0<span class="token punctuation">,</span> mountInfo<span class="token punctuation">.</span>MountPoint<span class="token punctuation">,</span> constants<span class="token punctuation">.</span><span class="token function">GetAppWorkDir</span><span class="token punctuation">(</span>cluster<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> mountInfo<span class="token punctuation">.</span>Name<span class="token punctuation">)</span><span class="token punctuation">,</span> notRegistryDirFilter<span class="token punctuation">)</span>
				<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
					<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"failed to copy %s %s: %v"</span><span class="token punctuation">,</span> mountInfo<span class="token punctuation">.</span>Type<span class="token punctuation">,</span> mountInfo<span class="token punctuation">.</span>Name<span class="token punctuation">,</span> err<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> endEg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>mountRootfs</code> 函数是 Sealos 中的一个核心函数，它主要用于将挂载的镜像内容按照类别分发到每台机器上。该函数中的步骤分为以下几个部分：</p>
<ol>
<li><strong>环境变量处理</strong>：该函数会根据传入的集群和挂载点信息处理环境变量。具体来说，它会创建一个 <code v-pre>envProcessor</code> 对象，该对象包含了集群的信息以及挂载点的信息，用于处理环境变量。</li>
<li>遍历挂载点：该函数会遍历所有的挂载点，对每个挂载点执行以下操作：
<ol>
<li>判断挂载点是否存在。如果不存在，则直接跳过该挂载点。</li>
<li>渲染环境变量。该函数会将环境变量注入到挂载点中。具体来说，它会调用 <code v-pre>renderTemplatesWithEnv</code> 函数，该函数会将环境变量注入到挂载点中的模板文件中。</li>
<li>修改目录权限。如果挂载点中包含子目录，则会将其权限更改为默认权限。具体来说，它会调用 <code v-pre>exec.RunBashCmd</code> 函数，该函数会执行 <code v-pre>chmod</code> 命令，将挂载点中的所有目录的权限更改为默认权限。</li>
</ol>
</li>
<li><strong>复制镜像到每个节点</strong>：该函数会将镜像文件夹复制到每个节点上。具体来说，它会遍历每个节点，对于每个节点，它会遍历每个挂载点，将挂载点中的镜像文件夹复制到节点上。具体来说，它会调用 <code v-pre>ssh.CopyDir</code> 函数，该函数会通过 SSH 将挂载点中的镜像文件夹复制到节点上。</li>
<li><strong>复制应用程序镜像到主节点</strong>：如果存在应用程序镜像，则将其复制到主节点上。具体来说，它会遍历每个挂载点，如果挂载点的类型是应用程序镜像类型，则将其复制到主节点上。具体来说，它会调用 <code v-pre>ssh.CopyDir</code> 函数，该函数会通过 SSH 将应用程序镜像文件夹复制到主节点上。</li>
</ol>
<h2 id="mirrorregistry-和-bootstrap-步骤" tabindex="-1"><a class="header-anchor" href="#mirrorregistry-和-bootstrap-步骤" aria-hidden="true">#</a> MirrorRegistry 和 Bootstrap 步骤</h2>
<h3 id="mirrorregistry" tabindex="-1"><a class="header-anchor" href="#mirrorregistry" aria-hidden="true">#</a> MirrorRegistry</h3>
<p>当然，在到 init 的步骤中还有两个阶段：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>c.MirrorRegistry,
c.Bootstrap,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>MirrorRegistry</code> 阶段是 Sealos 部署集群的一个重要步骤。在这个步骤中，Sealos 会将所需的 Docker 镜像从公共镜像仓库中拉取到本地，并将其推送到本地的 Docker 镜像仓库中。这个步骤的作用是将 Docker 镜像缓存到本地，以避免在集群部署过程中频繁地下载镜像，从而加快集群部署的速度。<code v-pre>MirrorRegistry</code> 阶段通常是在 <code v-pre>MountRootfs</code> 阶段之后执行的。</p>
<p><strong>这个步骤就相当于是 sealos 的核心逻辑，镜像处理的核心逻辑，算是一种黑科技把，就是把 remote docker registery 中的 images pull 到 localhost，然后缓存，后面就可以用缓存的文件了。</strong></p>
<h3 id="bootstrap" tabindex="-1"><a class="header-anchor" href="#bootstrap" aria-hidden="true">#</a> Bootstrap</h3>
<p><code v-pre>Bootstrap</code> 阶段是 Sealos 部署集群的最后一个阶段。在这个阶段中，Sealos 会启动 Kubernetes 的初始化程序，对集群进行初始化操作。在初始化过程中，Sealos 会使用 kubeadm 工具来创建 Kubernetes 集群的控制平面和节点，启动各种 Kubernetes 组件，并将它们配置为正常运行。当初始化程序成功完成后，Kubernetes 集群就可以正常使用了。<code v-pre>Bootstrap</code> 阶段通常是在 <code v-pre>MountRootfs</code> 和 <code v-pre>MirrorRegistry</code> 阶段之后执行的。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>CreateProcessor<span class="token punctuation">)</span> <span class="token function">Bootstrap</span><span class="token punctuation">(</span>cluster <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	logger<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Executing pipeline Bootstrap in CreateProcessor"</span><span class="token punctuation">)</span>
	hosts <span class="token operator">:=</span> <span class="token function">append</span><span class="token punctuation">(</span>cluster<span class="token punctuation">.</span><span class="token function">GetMasterIPAndPortList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> cluster<span class="token punctuation">.</span><span class="token function">GetNodeIPAndPortList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">...</span><span class="token punctuation">)</span>
	bs <span class="token operator">:=</span> bootstrap<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>cluster<span class="token punctuation">)</span>
	<span class="token keyword">return</span> bs<span class="token punctuation">.</span><span class="token function">Apply</span><span class="token punctuation">(</span>hosts<span class="token operator">...</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数的主要作用是创建 bootstrap 实例，并调用其 Apply 函数。其中，cluster 表示 Kubernetes 集群的配置信息，hosts 包含了集群的所有节点的 IP 地址和端口号。</p>
<p>接下来看一下 Sealos 中的 <code v-pre>bootstrap.New</code> 函数，其代码如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">New</span><span class="token punctuation">(</span>cluster <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster<span class="token punctuation">)</span> Interface <span class="token punctuation">{</span>
	ctx <span class="token operator">:=</span> <span class="token function">NewContextFrom</span><span class="token punctuation">(</span>cluster<span class="token punctuation">)</span>
	bs <span class="token operator">:=</span> <span class="token operator">&amp;</span>realBootstrap<span class="token punctuation">{</span>
		ctx<span class="token punctuation">:</span>          ctx<span class="token punctuation">,</span>
		preflights<span class="token punctuation">:</span>   <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Applier<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		initializers<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Applier<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		postflights<span class="token punctuation">:</span>  <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Applier<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// register builtin appliers</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">RegisterApplier</span><span class="token punctuation">(</span>Preflight<span class="token punctuation">,</span> defaultPreflights<span class="token operator">...</span><span class="token punctuation">)</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">RegisterApplier</span><span class="token punctuation">(</span>Init<span class="token punctuation">,</span> defaultInitializers<span class="token operator">...</span><span class="token punctuation">)</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> bs<span class="token punctuation">.</span><span class="token function">RegisterApplier</span><span class="token punctuation">(</span>Postflight<span class="token punctuation">,</span> defaultPostflights<span class="token operator">...</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> bs
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数的主要作用是创建 bootstrap 实例，并初始化其各个字段的值。其中，cluster 表示 Kubernetes 集群的配置信息，ctx 表示上下文信息，<code v-pre>preflights</code>、<code v-pre>initializers</code>、<code v-pre>postflights</code> 分别表示预检查、初始化、后处理函数的列表。此外，该函数还会调用 <code v-pre>RegisterApplier</code> 函数，注册默认的预检查、初始化、后处理函数。</p>
<h3 id="registerapplier-函数" tabindex="-1"><a class="header-anchor" href="#registerapplier-函数" aria-hidden="true">#</a> RegisterApplier 函数</h3>
<p>接下来看一下 Sealos 中的 RegisterApplier 函数，其代码如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>bs <span class="token operator">*</span>realBootstrap<span class="token punctuation">)</span> <span class="token function">RegisterApplier</span><span class="token punctuation">(</span>phase Phase<span class="token punctuation">,</span> appliers <span class="token operator">...</span>Applier<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> phase <span class="token punctuation">{</span>
	<span class="token keyword">case</span> Preflight<span class="token punctuation">:</span>
		bs<span class="token punctuation">.</span>preflights <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>bs<span class="token punctuation">.</span>preflights<span class="token punctuation">,</span> appliers<span class="token operator">...</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> Init<span class="token punctuation">:</span>
		bs<span class="token punctuation">.</span>initializers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>bs<span class="token punctuation">.</span>initializers<span class="token punctuation">,</span> appliers<span class="token operator">...</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> Postflight<span class="token punctuation">:</span>
		bs<span class="token punctuation">.</span>postflights <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>bs<span class="token punctuation">.</span>postflights<span class="token punctuation">,</span> appliers<span class="token operator">...</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"unknown phase %s"</span><span class="token punctuation">,</span> phase<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数的主要作用是注册预检查、初始化、后处理函数。其中，phase 表示函数的类型，appliers 表示函数列表。该函数会根据 phase 的不同，将函数列表添加到相应的列表中。</p>
<h3 id="apply-函数" tabindex="-1"><a class="header-anchor" href="#apply-函数" aria-hidden="true">#</a> Apply 函数</h3>
<p>最后看一下 Sealos 中的 Apply 函数，其代码如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>bs <span class="token operator">*</span>realBootstrap<span class="token punctuation">)</span> <span class="token function">Apply</span><span class="token punctuation">(</span>hosts <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	appliers <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>Applier<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	appliers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>appliers<span class="token punctuation">,</span> bs<span class="token punctuation">.</span>preflights<span class="token operator">...</span><span class="token punctuation">)</span>
	appliers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>appliers<span class="token punctuation">,</span> bs<span class="token punctuation">.</span>initializers<span class="token operator">...</span><span class="token punctuation">)</span>
	appliers <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>appliers<span class="token punctuation">,</span> bs<span class="token punctuation">.</span>postflights<span class="token operator">...</span><span class="token punctuation">)</span>
	logger<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span><span class="token string">"apply %+v on hosts %+v"</span><span class="token punctuation">,</span> appliers<span class="token punctuation">,</span> hosts<span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> appliers <span class="token punctuation">{</span>
		applier <span class="token operator">:=</span> appliers<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">runParallel</span><span class="token punctuation">(</span>hosts<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>host <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token operator">!</span>applier<span class="token punctuation">.</span><span class="token function">Filter</span><span class="token punctuation">(</span>bs<span class="token punctuation">.</span>ctx<span class="token punctuation">,</span> host<span class="token punctuation">)</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> <span class="token boolean">nil</span>
			<span class="token punctuation">}</span>
			logger<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span><span class="token string">"apply %s on host %s"</span><span class="token punctuation">,</span> applier<span class="token punctuation">,</span> host<span class="token punctuation">)</span>
			<span class="token keyword">return</span> applier<span class="token punctuation">.</span><span class="token function">Apply</span><span class="token punctuation">(</span>bs<span class="token punctuation">.</span>ctx<span class="token punctuation">,</span> host<span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> err
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该函数的主要作用是依次执行预检查、初始化、后处理函数。其中，<code v-pre>hosts</code> 表示要执行函数的节点列表，<code v-pre>appliers</code> 表示要执行的函数列表。该函数会将预检查、初始化、后处理函数分别添加到 <code v-pre>appliers</code> 列表中，并按照顺序依次执行。在执行过程中，会调用 <code v-pre>Filter</code> 函数来判断该函数是否需要在该节点上执行。如果需要执行，则会调用 <code v-pre>Apply</code> 函数来执行该函数。最后，若执行过程中出现错误，则该函数会返回错误信息。</p>
<p>通过对 <code v-pre>Sealos</code> 的 <code v-pre>Bootstrap</code> 阶段代码进行分析，我们了解了其调用流程和各个函数的功能。在该阶段中，<code v-pre>Sealos</code> 会启动 Kubernetes 的初始化程序，对集群进行初始化操作，使 Kubernetes 集群可以正常使用。同时，该阶段也会执行预检查、初始化、后处理函数，以保证集群的正常运行。</p>
<blockquote>
<p>这里或许可以参考 Linux 内核启动的一个过程，Linux 中的 bootfs 会启动一个 Kernel Boot Process，引导 kernel 的启动，启动后 boot 就会被销毁，生命周期结束。</p>
</blockquote>
<h2 id="init-阶段" tabindex="-1"><a class="header-anchor" href="#init-阶段" aria-hidden="true">#</a> init 阶段</h2>
<p>Init：初始化 k8s 集群。在这步中，其实也是执行了一系列的子操作。首先，将集群状态写入集群文件中。</p>
<h3 id="initcluster" tabindex="-1"><a class="header-anchor" href="#initcluster" aria-hidden="true">#</a> <strong>initCluster</strong></h3>
<p><code v-pre>initCluster</code> 负责从零开始创建一个集群。函数中会通过 <code v-pre>CreateProcessor</code> 去部署期望状态的集群。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> CreateProcessor <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    ClusterFile     clusterfile<span class="token punctuation">.</span>Interface <span class="token comment">// 当前集群对象</span>
    ImageManager    types<span class="token punctuation">.</span>ImageService <span class="token comment">// 处理镜像</span>
    ClusterManager  types<span class="token punctuation">.</span>ClusterService <span class="token comment">// 管理 clusterfile</span>
    RegistryManager types<span class="token punctuation">.</span>RegistryService <span class="token comment">// 管理镜像 registry</span>
    Runtime         runtime<span class="token punctuation">.</span>Interface   <span class="token comment">// kubeadm 对象</span>
    Guest           guest<span class="token punctuation">.</span>Interface   <span class="token comment">// 基于 sealos 的应用对象</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>CreateProcessor.Execute</code> 接收期望的集群状态 <code v-pre>ClusterDesired</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>func <span class="token punctuation">(</span>c *CreateProcessor<span class="token punctuation">)</span> Execute<span class="token punctuation">(</span>cluster *v2.Cluster<span class="token punctuation">)</span> error <span class="token punctuation">{</span>
	pipeLine, err :<span class="token operator">=</span> c.GetPipeLine<span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> _, f :<span class="token operator">=</span> range pipeLine <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> f<span class="token punctuation">(</span>cluster<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
			<span class="token builtin class-name">return</span> err
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token builtin class-name">return</span> nil
<span class="token punctuation">}</span>

func <span class="token punctuation">(</span>c *CreateProcessor<span class="token punctuation">)</span> GetPipeLine<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>func<span class="token punctuation">(</span>cluster *v2.Cluster<span class="token punctuation">)</span> error, error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	var todoList <span class="token punctuation">[</span><span class="token punctuation">]</span>func<span class="token punctuation">(</span>cluster *v2.Cluster<span class="token punctuation">)</span> error
	todoList <span class="token operator">=</span> append<span class="token punctuation">(</span>todoList,
		// c.GetPhasePluginFunc<span class="token punctuation">(</span>plugin.PhaseOriginally<span class="token punctuation">)</span>,
		c.Check,
		c.PreProcess,
		c.RunConfig,
		c.MountRootfs,
		c.MirrorRegistry,
		c.Bootstrap,
		// c.GetPhasePluginFunc<span class="token punctuation">(</span>plugin.PhasePreInit<span class="token punctuation">)</span>,
		c.Init,
		c.Join,
		// c.GetPhasePluginFunc<span class="token punctuation">(</span>plugin.PhasePreGuest<span class="token punctuation">)</span>,
		c.RunGuest,
		// c.GetPhasePluginFunc<span class="token punctuation">(</span>plugin.PhasePostInstall<span class="token punctuation">)</span>,
	<span class="token punctuation">)</span>
	<span class="token builtin class-name">return</span> todoList, nil
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>方便理解，这里盗用 sealer 图</p>
<p><img src="http://sm.nsddd.top/sm202304152338621.png" alt="sdUntitled"></p>
</li>
</ul>
<p>接下来会执行一系列 pipeline，正式进入实际的集群部署过程中：</p>
<ol>
<li>Check：检查集群的 host</li>
<li>PreProcess：负责集群部署前的镜像预处理操作，在这里就会利用 <code v-pre>CreateProcessor</code> 中的各个 Manager。</li>
<li>拉取镜像</li>
<li>检查镜像格式</li>
<li>使用 <code v-pre>buildah</code> 从 OCI 格式的镜像中创建 working container，并将容器挂载到 rootfs 上</li>
<li>将容器的 manifest 添加到集群状态中</li>
<li>RunConfig：将集群状态中的 working container 导出成 yaml 格式的配置并持久化到宿主机的文件系统中</li>
<li>MountRootfs：将挂载的镜像内容按照类别，以 <code v-pre>rootfs</code>，<code v-pre>addons</code>，<code v-pre>app</code> 的顺序分发到每台机器上。 这里需要介绍一下 sealos 镜像的一般结构，以最基础的 k8s 镜像为例：</li>
</ol>
<p>K8s 作为整个集群的基础，虽然最终镜像内的目录结构与其他一致，但其构建过程稍微有所不同。在 CI <strong>https://github.com/labring/cluster-image/blob/faca63809e7a3eae512100a1eb8f9b7384973175/.github/scripts/kubernetes.sh#L35</strong> 中，我们可以看到，k8s 镜像其实是合并了 cluster-image 仓库下的多个文件夹，<code v-pre>containerd</code>，<code v-pre>rootfs</code> 和 <code v-pre>registry</code>。这些独立的文件夹中包含有安装对应组件的脚本。 Sealos 在挂载一个镜像后，会首先执行 <code v-pre>init.sh</code> 脚本。例如，以下是 k8s 镜像的脚本中，分别按顺序执行了 <code v-pre>init-containerd.sh</code> 安装 containerd，<code v-pre>init-shim.sh</code> 安装 image-cri-shim 和 <code v-pre>init-kube.sh</code> 安装 kubelet。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">source</span> common.sh
<span class="token assign-left variable">REGISTRY_DOMAIN</span><span class="token operator">=</span><span class="token variable">${1<span class="token operator">:-</span>sealos.hub}</span>
<span class="token assign-left variable">REGISTRY_PORT</span><span class="token operator">=</span><span class="token variable">${2<span class="token operator">:-</span>5000}</span>

<span class="token comment"># Install containerd</span>
<span class="token function">chmod</span> a+x init-containerd.sh
<span class="token function">bash</span> init-containerd.sh <span class="token variable">${REGISTRY_DOMAIN}</span> <span class="token variable">${REGISTRY_PORT}</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   error <span class="token string">"====init containerd failed!===="</span>
<span class="token keyword">fi</span>

<span class="token function">chmod</span> a+x init-shim.sh
<span class="token function">bash</span> init-shim.sh

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
   error <span class="token string">"====init image-cri-shim failed!===="</span>
<span class="token keyword">fi</span>

<span class="token function">chmod</span> a+x init-kube.sh
<span class="token function">bash</span> init-kube.sh

logger <span class="token string">"init containerd rootfs success"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 MountRootfs 这步中，只会执行 <code v-pre>rootfs</code> 和 <code v-pre>addons</code> 类型的 <code v-pre>init.sh</code> 脚本。这也很好理解，因为到目前为止，Sealos 仅仅在每台机器上安装成功了 kubelet，整个 k8s 集群还未可用。</p>
<ol>
<li>Init：初始化 k8s 集群。在这步中，其实也是执行了一系列的子操作。</li>
<li>Sealos 会从 <code v-pre>ClusterFile</code> 中加载 <code v-pre>kubeadm</code> 的配置，然后拷贝到 master0 上。</li>
<li>根据 master0 的 hostname 生成证书以及 k8s 配置文件，例如 <code v-pre>admin.conf</code>，<code v-pre>controller-manager.conf</code>，<code v-pre>scheduler.conf</code>，<code v-pre>kubelet.conf</code>。</li>
<li>Sealos 将这些配置以及 rootfs 中的静态文件（主要是一些 policy 的配置）拷贝到 master0 上。</li>
<li>Sealos 通过 link 的方式将 rootfs 中的 registry 链接到宿主机的目录上，然后执行脚本 <code v-pre>init-registry.sh</code>，启动 registry 守护进程。</li>
<li>最后也是最重要的，初始化 master0。首先，将 registry 的域名，api server 的域名（IP 为 master0 的 IP）添加到 master0 宿主机上。然后，调用 <code v-pre>kubeadm init</code> 创建 k8s 集群。最后，将生成的管理员 kubeconfig 拷贝到 <code v-pre>.kube/config</code>。</li>
<li>Join：使用 kubeadm 将其余 master 和 node 加入现有的集群，然后更新 <code v-pre>ClusterFile</code>。此时，整个 k8s 集群就已经搭建完毕了。</li>
<li>RunGuest: 运行所有类型为 <code v-pre>app</code> 的镜像的 CMD，安装所有应用。</li>
</ol>
<p>至此一个 k8s 集群以及基于这个集群的所有应用都被安装完毕。</p>
<h2 id="controller" tabindex="-1"><a class="header-anchor" href="#controller" aria-hidden="true">#</a> controller</h2>
<ul>
<li><a href="https://github.com/labring/sealos/tree/main/controllers" target="_blank" rel="noopener noreferrer">https://github.com/labring/sealos/tree/main/controllers<ExternalLinkIcon/></a></li>
</ul>
<p>如果说 sealos 最核心的部分是什么，我觉得是 controller 的实现，<a href="https://github.com/labring/sealos/tree/main/controllers" target="_blank" rel="noopener noreferrer">controllers<ExternalLinkIcon/></a> 控制器用来管理集群（k8s 有一些内置的功能 <code v-pre>pod</code>，deloyment这些，同样可以controllers扩展）：</p>
<p>controllers 使用 Go语言 1.8 +  的新特性：工作区</p>
<blockquote>
<p>这些功能都是 <code v-pre>k8s</code> 没有的功能~</p>
</blockquote>
<ol>
<li>
<p>我们跑了很多服务器都是通过<code v-pre>infra</code>管理他们</p>
</li>
<li>
<p><code v-pre>metering</code>是用作计量，我们用过多少资源</p>
</li>
<li>
<p><code v-pre>terminal</code>就是桌面上的终端应用</p>
</li>
<li>
<p><code v-pre>user</code>就是用户的管理，因为<code v-pre>cloud.sealos</code>是一个多租户的集群</p>
</li>
<li>
<p><code v-pre>app</code>: 负责管理用户创建的所有应用，包括创建、删除、更新、查看应用的状态以及部署应用。</p>
</li>
<li>
<p><code v-pre>cluster</code>: 负责管理 Kubernetes 集群，包括创建、删除、更新、查看集群的状态以及部署集群。</p>
</li>
<li>
<p><code v-pre>imagehub</code>: 负责管理镜像仓库，包括创建、删除、更新、查看镜像仓库的状态以及部署镜像仓库。</p>
</li>
</ol>
<p>我认为这里是  sealos 的核心部分。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '39.md' style='float:left'>⬆️上一节🔗  </a><a href = '41.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


