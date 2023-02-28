<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第32节-kubernetes-目录结构" tabindex="-1"><a class="header-anchor" href="#第32节-kubernetes-目录结构" aria-hidden="true">#</a> 第32节 kubernetes 目录结构</h1>
<div><a href = '31.md' style='float:left'>⬆️上一节🔗  </a><a href = '33.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类</h2>
<p>Kubernetes的代码都在kubernetes目录下，如图，根据功能主要分成以下几类：
1、<code v-pre>文档类</code>（api、docs、logo）
2、<code v-pre>工具类</code>（build、cluster、Godeps、hack、staging、translations）
3、<code v-pre>代码类</code>（cmd、pkg、plugin、test、third_party）</p>
<p>工具类主要用到的build目录下的文件，自己动手编译的时候会用到；</p>
<p><strong>核心代码集中在cmd和pkg中。</strong></p>
<p>cmd内部包含各个组件的入口，具体核心的实现部分在pkg目录下。</p>
<p>我们每一个 可执行文件都对应 cmd</p>
<p><strong>关于其他目录：</strong></p>
<p><code v-pre>plugin</code> 目录之前的版本包括 <code v-pre>scheduler</code> 部分的代码，当前版本（应该是在1.10之后）已经将scheduler部分代码移到和其他组件一致的 <code v-pre>pkg</code> 目录，所以目前 <code v-pre>plugin</code> 主要包含的是<code v-pre>认证</code>与<code v-pre>鉴权</code>部分的代码。</p>
<h2 id="根目录" tabindex="-1"><a class="header-anchor" href="#根目录" aria-hidden="true">#</a> 根目录</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1</span>
<span class="token builtin class-name">.</span>
├── api
├── build
├── CHANGELOG
├── CHANGELOG.md -<span class="token operator">></span> CHANGELOG/README.md
├── cluster
├── cmd
├── code-of-conduct.md
├── CONTRIBUTING.md
├── docs
├── go.mod
├── go.sum
├── hack
├── LICENSE
├── LICENSES
├── logo
├── Makefile -<span class="token operator">></span> build/root/Makefile
├── Makefile.generated_files -<span class="token operator">></span> build/root/Makefile.generated_files
├── _output
├── OWNERS
├── OWNERS_ALIASES
├── pkg
├── plugin
├── README.md
├── SECURITY_CONTACTS
├── staging
├── SUPPORT.md
├── <span class="token builtin class-name">test</span>
├── third_party
└── vendor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pkg" tabindex="-1"><a class="header-anchor" href="#pkg" aria-hidden="true">#</a> pkg</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>大量的 kubernetes 的源码所在，除了被抽离为单独组件的部分，例如 api server 的代码，proxy 组件的代码，kubelet 组件的代码。</p>
<ul>
<li>业务逻辑都在 pkg</li>
<li>命令行参数都在 cmd</li>
</ul>
</div>
<p><strong>关于两个组件： <code v-pre>./pkg/api</code> 和 <code v-pre>./pkg/apis</code></strong></p>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>Api 文件夹下包含和Open API 相关的模型定义等内容。</p>
<p><strong>名称不一样，作用是完全不一样的。</strong></p>
<ul>
<li>
<p>用于根据 OpenAPI 规范形成符合其规定的 API</p>
</li>
<li>
<p>apis 是包含内建 API Groups 和 API Objects 的，而 scheme 相关的代码大部分在这里。</p>
</li>
</ul>
</div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 pkg</span>
pkg
├── api
├── apis
├── auth
├── capabilities
├── client
├── cloudprovider
├── cluster
├── controller
├── controlplane
├── credentialprovider
├── features
├── fieldpath
├── generated
├── kubeapiserver
├── kubectl
├── kubelet
├── kubemark
├── OWNERS
├── printers
├── probe
├── proxy
├── <span class="token function">quota</span>
├── registry
├── routes
├── scheduler
├── security
├── securitycontext
├── serviceaccount
├── util
├── volume
└── windows
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="apis-目录的详解" tabindex="-1"><a class="header-anchor" href="#apis-目录的详解" aria-hidden="true">#</a> apis 目录的详解</h3>
<p><strong>目录结构：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes/pkg/apis<span class="token comment"># tree -L 1</span>
<span class="token builtin class-name">.</span>
├── abac
├── admission
├── admissionregistration
├── apidiscovery
├── apiserverinternal
├── apps
├── authentication
├── authorization
├── autoscaling
├── batch
├── certificates
├── coordination
├── core
├── discovery
├── events
├── extensions
├── flowcontrol
├── imagepolicy
├── networking
├── <span class="token function">node</span>
├── OWNERS
├── policy
├── rbac
├── resource
├── scheduling
└── storage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在Kubernetes源码中，<code v-pre>core</code>目录和<code v-pre>apps</code>目录是两个不同的目录，用于存放不同的API对象。</p>
<ul>
<li><code v-pre>core</code>目录下存放的是基础的API对象，例如 Pod、Service、ReplicationController 等。这些API对象是Kubernetes的核心功能，提供了基本的调度、管理和监控功能。</li>
<li><code v-pre>apps</code>目录下存放的是扩展的API对象，例如 Deployment、StatefulSet 等。这些API对象是对基础功能的扩展，提供了更多的调度、管理和监控功能。</li>
</ul>
<p>总之，<code v-pre>core</code>目录和<code v-pre>apps</code>目录是用来存放不同类型的API对象的。如果你想了解某个特定的API对象的详细信息，可以在相应的目录下找到对应的文件。</p>
<p><strong>主要目录的解释：</strong></p>
<p><code v-pre>pkg/apis</code>目录是Kubernetes源码中用于存放API对象的目录。这个目录中包含了很多子目录，每个子目录存放了不同类型的API对象。</p>
<p>这些子目录的名称通常由两部分组成，例如 <code v-pre>core/v1</code>、<code v-pre>apps/v1</code> 等。前面的部分表示API对象的类型，后面的部分表示API对象的版本。</p>
<p>下面是一些常见的子目录及其含义：</p>
<ul>
<li>
<p><code v-pre>core/v1</code>：这个目录下存放的是基础的API对象，例如 Pod、Service、ReplicationController 等。这些API对象是Kubernetes的核心功能，提供了基本的调度、管理和监控功能。</p>
</li>
<li>
<p><code v-pre>apps/v1</code>：这个目录下存放的是扩展的API对象，例如 Deployment、StatefulSet 等</p>
</li>
<li>
<p><code v-pre>batch/v1</code>：这个目录下存放的是批处理相关的API对象，例如 Job、CronJob 等。这些API对象主要用于执行批量任务，支持周期性执行、失败重试等功能。</p>
</li>
<li>
<p><code v-pre>networking.k8s.io/v1</code>：这个目录下存放的是网络相关的API对象，例如 Ingress、Service 负载均衡器等。这些API对象主要用于提供集群内部及外部的网络访问能力。</p>
</li>
<li>
<p><code v-pre>extensions/v1beta1</code>：这个目录下存放的是扩展的API对象，例如 Deployment、Ingress 等。这些API对象是对基础功能的扩展，提供了更多的调度、管理和监控功能。</p>
</li>
</ul>
<p>这些子目录只是部分目录，Kubernetes中还有许多其他子目录，每个子目录存放的是不同类型的API对象。如果你想了解更多信息，可以在Kubernetes源码仓库中查看。</p>
<blockquote>
<p>在Kubernetes源码中，API对象的定义一般都位于<code v-pre>pkg/apis</code>目录下。例如，Deployment对象的定义就位于<code v-pre>pkg/apis/apps/v1/deployment.go</code>文件中。</p>
<p>具体的位置可能会有所不同，但通常都在这个目录或其子目录下。如果你想查看某个特定的API对象的定义，你可以在Kubernetes源码仓库中搜索关键字，找到对应的文件。</p>
<p>Pod对象的定义位于Kubernetes源码中的<code v-pre>pkg/apis/core/v1/pod.go</code>文件中。</p>
<p>这个文件中定义了Pod对象的所有字段，包括名称、命名空间、状态、容器列表等。如果你想了解Pod对象的更多细节，可以在这个文件中查看。</p>
</blockquote>
<h3 id="其他目录解释" tabindex="-1"><a class="header-anchor" href="#其他目录解释" aria-hidden="true">#</a> 其他目录解释</h3>
<p><code v-pre>pkg/apis</code>目录下的这些子目录都是用于存放不同类型的API对象的。</p>
<ul>
<li><code v-pre>abac</code>目录存放的是授权和认证相关的API对象，例如 AttributePolicies、Policy 等。</li>
<li><code v-pre>admission</code>目录存放的是入门相关的API对象，例如 AdmissionConfiguration、Webhook 等。</li>
<li><code v-pre>admissionregistration</code>目录存放的是入门注册相关的API对象，例如 InitializerConfiguration、ValidatingWebhookConfiguration 等。</li>
<li><code v-pre>apidiscovery</code>目录存放的是API发现相关的API对象，例如 APIGroup、APIResourceList 等。</li>
<li><code v-pre>apiserverinternal</code>目录存放的是API服务器内部相关的API对象，例如 GroupResources、ServerResources 等。</li>
<li><code v-pre>authentication</code>目录存放的是身份验证相关的API对象，例如 TokenReview、UserInfo 等。</li>
<li><code v-pre>authorization</code>目录存放的是授权相关的API对象，例如 SelfSubjectAccessReview、SubjectAccessReview 等。</li>
<li><code v-pre>autoscaling</code>目录存放的是自动伸缩相关的API对象，例如 HorizontalPodAutoscaler、Scale 等。</li>
<li><code v-pre>certificates</code>目录存放的是证书相关的API对象，例如 CertificateSigningRequest、CertificateSigningRequestList 等。</li>
<li><code v-pre>coordination</code>目录存放的是协调相关的API对象，例如 Lease、Lock 等。</li>
<li><code v-pre>core</code>目录存放的是基础的API对象，例如 Pod、Service、ReplicationController</li>
<li><code v-pre>discovery</code>目录存放的是发现相关的API对象，例如 EndpointSlice、ServiceAccountToken 等。</li>
<li><code v-pre>events</code>目录存放的是事件相关的API对象，例如 Event、EventList 等。</li>
<li><code v-pre>extensions</code>目录存放的是扩展的API对象，例如 Deployment、Ingress 等。</li>
<li><code v-pre>flowcontrol</code>目录存放的是流量控制相关的API对象，例如 FlowSchema、FlowSchemaList 等。</li>
<li><code v-pre>imagepolicy</code>目录存放的是镜像策略相关的API对象，例如 ImageReview、ImageReviewStatus 等。</li>
<li><code v-pre>networking</code>目录存放的是网络相关的API对象，例如 Ingress、Service 负载均衡器等。</li>
<li><code v-pre>node</code>目录存放的是节点相关的API对象，例如 Node、NodeList 等。</li>
<li><code v-pre>OWNERS</code>目录存放的是OWNERS文件</li>
<li><code v-pre>policy</code>目录存放的是策略相关的API对象，例如 PodDisruptionBudget、PodSecurityPolicy 等。</li>
<li><code v-pre>rbac</code>目录存放的是基于角色的访问控制（RBAC）相关的API对象，例如 ClusterRole、RoleBinding 等。</li>
<li><code v-pre>resource</code>目录存放的是资源相关的API对象，例如 ConfigMap、PersistentVolume 等。</li>
<li><code v-pre>scheduling</code>目录存放的是调度相关的API对象，例如 PriorityClass、Scheduling 等。</li>
<li><code v-pre>storage</code>目录存放的是存储相关的API对象，例如 StorageClass、VolumeAttachment 等。</li>
<li><code v-pre>pkg/apis/apps</code>目录存放的是Kubernetes的扩展API对象。这些API对象是对基础功能的扩展，提供了更多的调度、管理和监控功能。这些API对象主要用于支持应用的部署、扩展和管理。</li>
</ul>
<blockquote>
<p>例如，<code v-pre>pkg/apis/apps/v1</code>目录下存放的是Deployment、StatefulSet、DaemonSet等API对象。这些API对象主要用于支持应用的部署、扩展和管理。</p>
<p>在<code v-pre>pkg/apis/apps</code>目录下，你会发现有许多子目录，每个子目录存放的是不同版本的API对象。例如，<code v-pre>pkg/apis/apps/v1</code>目录下存放的是Deployment、StatefulSet、DaemonSet等API对象的v1版本，<code v-pre>pkg/apis/apps/v1beta1</code>目录下存在<code v-pre>pkg/apis/apps</code>目录下，你会发现有许多子目录，每个子目录存放的是不同版本的API对象。例如，<code v-pre>pkg/apis/apps/v1</code>目录下存放的是Deployment、StatefulSet、DaemonSet等API对象的v1版本，<code v-pre>pkg/apis/apps/v1beta1</code>目录下存放的是Deployment、StatefulSet、DaemonSet等API对象的v1beta1版本。</p>
<p>这些子目录是为了支持Kubernetes的多版本特性而设计的。在Kubernetes中，API对象可以有多个版本，这样就可以在不破坏现有代码的情况下，提供新的功能和改进。这使得Kubernetes更加灵活，也使得Kubernetes的更新和升级变得更加容易。</p>
<p>在<code v-pre>pkg/apis/apps</code>目录下，你还会发现有很多文件，这些文件是Kubernetes的代码生成器使用的。Kubernetes的代码生成器是一种工具，可以根据用户的输入生成Kubernetes的API对象代码。这使得Kubernetes的API对象可以更加快速、简单地开发，也使得Kubernetes的API对象可以更加一致、统一地管理。</p>
<p>除了<code v-pre>pkg/apis/apps</code>目录，Kubernetes还有许多其他目录，这些目录也是Kubernetes的代码生成器使用的。例如，<code v-pre>pkg/apis/authorization</code>目录存放的是认证和授权相关的API对象，<code v-pre>pkg/apis/batch</code>目录存放的是批处理相关的API对象，<code v-pre>pkg/apis/coordination</code>目录存放的是协调相关的API对象等。</p>
</blockquote>
<hr>
<h3 id="rbac" tabindex="-1"><a class="header-anchor" href="#rbac" aria-hidden="true">#</a> RBAC</h3>
<details class="custom-container details"><summary>about RBAC</summary>
<p>在上面我们看到，<code v-pre>rbac</code>目录存放的是基于角色的访问控制（RBAC）相关的API对象，例如 ClusterRole、RoleBinding 等。</p>
<p>那么 RBAC 是什么呢，它是一基于角色的权限控制，或许下面的一句话能帮助你理解它：</p>
<p><strong>我们都知道 Kubernetes 中所有的 API对象都保存在 etcd 中，可是，对于这些 API 对象的操作一定是通过访问 kube-apiServer 实现的。其中一个非常重要的原因就是，需要 API Server 来帮忙左授权工作。而在 Kubernetes 的项目中，负责完成授权工作的机制是 RBAC。⚠️</strong></p>
<p>so，directory structure：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/kubernetes/pkg/apis/rbac<span class="token comment"># ls -al</span>
total <span class="token number">92</span>
drwxr-xr-x  <span class="token number">8</span> root root  <span class="token number">4096</span> Jan  <span class="token number">4</span> 06:58 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">27</span> root root  <span class="token number">4096</span> Jan  <span class="token number">4</span> 06:58 <span class="token punctuation">..</span>
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">698</span> Nov <span class="token number">30</span> 03:40 doc.go
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Nov <span class="token number">30</span> 03:40 fuzzer
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">12362</span> Nov <span class="token number">30</span> 03:40 helpers.go
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">9453</span> Nov <span class="token number">30</span> 03:40 helpers_test.go
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Nov <span class="token number">30</span> 03:40 <span class="token function">install</span>
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">205</span> Nov <span class="token number">30</span> 03:40 OWNERS
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">1811</span> Nov <span class="token number">30</span> 03:40 register.go
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">7897</span> Jan  <span class="token number">4</span> 06:58 types.go
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Nov <span class="token number">30</span> 03:40 v1
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Nov <span class="token number">30</span> 03:40 v1alpha1
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Nov <span class="token number">30</span> 03:40 v1beta1
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Jan  <span class="token number">4</span> 06:58 validation
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">11402</span> Dec  <span class="token number">9</span> 09:16 zz_generated.deepcopy.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<blockquote>
<ul>
<li><code v-pre>doc.go</code> 文件包含对整个包的文档的引用。</li>
<li><code v-pre>helpers.go</code> 文件包含用于实现 RBAC 功能的帮助程序函数的代码。</li>
<li><code v-pre>helpers_test.go</code> 文件包含用于测试 <code v-pre>helpers.go</code> 中的函数的代码。</li>
<li><code v-pre>install</code> 目录包含用于安装 RBAC API 的代码。</li>
<li><code v-pre>OWNERS</code> 文件包含对这个目录的维护者的列表。</li>
<li><code v-pre>register.go</code> 文件包含用于注册 RBAC API 的代码。</li>
<li><code v-pre>types.go</code> 文件包含用于定义 RBAC API 对象的代码。</li>
<li><code v-pre>validation</code> 目录包含用于验证 RBAC API 对象的代码。</li>
<li><code v-pre>v1</code> 目录包含 v1 版本的 RBAC API 对象的定义。</li>
<li><code v-pre>v1alpha1</code> 目录包含 v1alpha1 版本的 RBAC API 对象的定义。</li>
<li><code v-pre>v1beta1</code> 目录包含 v1beta1 版本的 RBAC API 对象的定义。</li>
<li><code v-pre>fuzzer</code> 文件包含用于执行模糊测试的代码。</li>
<li><code v-pre>zz_generated.deepcopy.go</code> 文件包含用于生成深拷贝函数的代码。</li>
</ul>
</blockquote>
<p>可以使用 <code v-pre>types.go</code> 文件中定义的 <code v-pre>Role</code> 和 <code v-pre>RoleBinding</code> 对象来创建和管理角色。您可以使用 <code v-pre>register.go</code> 中的代码来注册 RBAC API，从而使其可以在集群中使用。您可以使用 <code v-pre>validation</code> 目录中的代码来验证 RBAC API 对象，以确保它们符合要求。</p>
<p>这些文件和目录共同构成了 Kubernetes 中的 RBAC 功能。RBAC 功能使您可以在集群中创建和管理角色，并将角色分配给用户和组，从而控制对资源的访问。</p>
</details>
<h3 id="oweners-维护者的列表" tabindex="-1"><a class="header-anchor" href="#oweners-维护者的列表" aria-hidden="true">#</a> OWENERS 维护者的列表</h3>
<ul>
<li><a href="https://github.com/kubernetes/community/blob/master/contributors/guide/owners.md" target="_blank" rel="noopener noreferrer">🔍 GitHub md<ExternalLinkIcon/></a></li>
</ul>
<p>在 <code v-pre>details</code> 内容中，我们看到了 <code v-pre>OWNERS</code> 文件，针对 Kubernetes 的项目对维护者的列表文件做出分析，这个文件，不简单！ ⭕</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># See the OWNERS docs at https://go.k8s.io/owners</span>

<span class="token comment"># approval on api packages bubbles to api-approvers</span>
<span class="token key atrule">reviewers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> sig<span class="token punctuation">-</span>auth<span class="token punctuation">-</span>authorizers<span class="token punctuation">-</span>approvers
  <span class="token punctuation">-</span> sig<span class="token punctuation">-</span>auth<span class="token punctuation">-</span>authorizers<span class="token punctuation">-</span>reviewers
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> sig/auth
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<p>OWNERS 文件通常包含有关目录的维护人员的信息。在这种情况下，OWNERS 文件包含有关 <code v-pre>pkg/apis/rbac</code> 目录的维护人员的信息。</p>
<p>OWNERS 文件中的 <code v-pre>reviewers</code> 字段包含一个用户名列表，表示在该目录中所有代码更改提交之前必须提供批准的用户。这些用户被称为审核员。例如，在本例中，所有代码更改都必须在 <code v-pre>sig-auth-authorizers-approvers</code> 和 <code v-pre>sig-auth-authorizers-reviewers</code> 两个用户中的一个批准之后才能提交。</p>
<p>OWNERS 文件中的 <code v-pre>labels</code> 字段包含一个标签列表，表示与该目录相关的主题或关注点。这些标签可以帮助您快速了解该目录所关注的内容。例如，在本例中，该目录与 <code v-pre>sig/auth</code> 主题有关。</p>
<p>OWNERS 文件是用于描述与目录相关的信息的文件，例如审核员和关注点。这些信息有助于协调和管理该目录中的代码。</p>
<p>❓ 我们提到了代码生成器，其实再 《深入解析Kubernetes的源码》 这本书中，我们了解到了代码生成器，但是书中写的逻辑不是很清晰，导致对 代码生成器 的理解不是很透彻~</p>
<h3 id="代码生成器" tabindex="-1"><a class="header-anchor" href="#代码生成器" aria-hidden="true">#</a> 代码生成器</h3>
<p>Kubernetes的代码生成器是一种工具，用于生成Kubernetes的API对象代码。它可以根据用户的输入，自动生成Kubernetes API对象的 Go 代码。Kubernetes的代码生成器使用了一种叫做 OpenAPI 的技术，可以通过定义 API 对象的模型来生成代码。</p>
<p>Kubernetes的代码生成器有许多优点，例如：</p>
<ul>
<li>减少重复工作：使用代码生成器，可以减少手写代码的工作量。</li>
<li>提高代码质量：使用代码生成器，可以保证生成的代码质量更高，因为它是根据模板生成的。</li>
<li>保证代码一致性：使用代码生成器，可以保证生成的代码风格一致，因为它是根据模板生成的。</li>
</ul>
<p>Kubernetes的代码生成器对Kubernetes的作用非常重要，它使得Kubernetes的API对象可以更加快速、简单地开发，也使得Kubernetes的API对象可以更加一致、统一地管理。</p>
<p>通过使用代码生成器，Kubernetes的开发人员可以专注于API对象的业务逻辑，而不必担心底层实现细节。这大大降低了开发难度，也提高了开发效率。</p>
<p>此外，使用代码生成器还可以保证Kubernetes的API对象代码质量更高，因为它是根据模板生成的。这能够避免人为疏忽导致的代码错误，使得Kubernetes的API对象更加可靠。</p>
<p>总的来说，Kubernetes的代码生成器是一种非常有用的工具，它为Kubernetes的API对象的开发和管理带来了很多便利。</p>
<p><code v-pre>Kubernetes</code>源码中的代码生成器例子，以及它们所在的地址目录：</p>
<ul>
<li>Deployment代码生成器：<code v-pre>pkg/apis/apps/v1/codegen</code></li>
<li>Service代码生成器：<code v-pre>pkg/apis/core/v1/codegen</code></li>
<li>Pod代码生成器：<code v-pre>pkg/apis/core/v1/codegen</code></li>
<li>ReplicationController代码生成器：<code v-pre>pkg/apis/core/v1/codegen</code></li>
<li>Job代码生成器：<code v-pre>pkg/apis/batch/v1/codegen</code></li>
<li>CronJob代码生成器：<code v-pre>pkg/apis/batch/v1beta1/codegen</code></li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">提醒</p>
<p>更多关于代码生成器的知识，推荐阅读：</p>
<ul>
<li><a href="https://cloud.redhat.com/blog/kubernetes-deep-dive-code-generation-customresources" target="_blank" rel="noopener noreferrer">Kubernetes Deep Dive：CustomResources 的代码生成<ExternalLinkIcon/></a></li>
</ul>
<h2 id="staging" tabindex="-1"><a class="header-anchor" href="#staging" aria-hidden="true">#</a> staging</h2>
<p>这个目录准确来说是存放核心组件的，但是是临时存储的，我们可以参考 <a href="https://github.com/kubernetes/kubernetes/tree/master/staging" target="_blank" rel="noopener noreferrer">README.md<ExternalLinkIcon/></a> 文件</p>
<p>此目录是已拆分到自己的存储库的包的暂存区。这里的内容将定期发布到各自的顶级 k8s.io 存储库。</p>
<p>目前在此处暂存的存储库：</p>
<ul>
<li><a href="https://github.com/kubernetes/api" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/api</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/apiextensions-apiserver" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/apiextensions-apiserver</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/apimachinery" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/apimachinery</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/apiserver" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/apiserver</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/cli-runtime" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/cli-runtime</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/client-go" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/client-go</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/cloud-provider" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/cloud-provider</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/cluster-bootstrap" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/cluster-bootstrap</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/code-generator" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/code-generator</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/component-base" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/component-base</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/component-helpers" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/component-helpers</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/controller-manager" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/controller-manager</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/cri-api" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/cri-api</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/csi-translation-lib" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/csi-translation-lib</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kms" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/kms</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kube-aggregator" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/kube-aggregator</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kube-controller-manager" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/kube-controller-manager</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kube-proxy" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/kube-proxy</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kube-scheduler" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/kube-scheduler</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kubectl" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/kubectl</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kubelet" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/kubelet</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/legacy-cloud-providers" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/legacy-cloud-providers</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/metrics" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/metrics</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/mount-utils" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/mount-utils</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/noderesourcetopology-api" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/noderesourcetopology-api</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/pod-security-admission" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/pod-security-admission</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/sample-apiserver" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/sample-apiserver</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/sample-cli-plugin" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/sample-cli-plugin</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/sample-controller" target="_blank" rel="noopener noreferrer"><code v-pre>k8s.io/sample-controller</code><ExternalLinkIcon/></a></li>
</ul>
<p><code v-pre>staging/</code> 目录中的代码是权威的，即代码的唯一副本。您可以直接修改此类代码。</p>
<h3 id="使用-kubernetes-代码中的暂存存储库" tabindex="-1"><a class="header-anchor" href="#使用-kubernetes-代码中的暂存存储库" aria-hidden="true">#</a> 使用 Kubernetes 代码中的暂存存储库</h3>
<p>Kubernetes 代码通过目录中的符号链接使用此目录中的存储库 <code v-pre>vendor/k8s.io</code>到此暂存区域。例如，当 Kubernetes 代码从<code v-pre>k8s.io/client-go</code>存储库导入一个包时，该导入被解析为<code v-pre>staging/src/k8s.io/client-go</code>相对于项目根目录：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// pkg/example/some_code.go</span>
<span class="token keyword">package</span> example

<span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">"k8s.io/client-go/dynamic"</span> <span class="token comment">// resolves to staging/src/k8s.io/client-go/dynamic</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦完成向外部存储库的转换，这些存储库实际上将由<code v-pre>k8s.io/&lt;package-name&gt;</code>.</p>
<h2 id="src-k8s" tabindex="-1"><a class="header-anchor" href="#src-k8s" aria-hidden="true">#</a> src/k8s</h2>
<p>src/k8s.io/目录是Kubernetes项目的根目录，包含了Kubernetes系统的所有源代码。这是src/k8s.io/目录的高层结构：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/kubernetes/staging/src/k8s.io<span class="token comment"># tree -L 1</span>
<span class="token builtin class-name">.</span>
├── api
├── apiextensions-apiserver
├── apimachinery
├── apiserver
├── client-go
├── cli-runtime
├── cloud-provider
├── cluster-bootstrap
├── code-generator
├── component-base
├── component-helpers
├── controller-manager
├── cri-api
├── csi-translation-lib
├── dynamic-resource-allocation
├── kms
├── kube-aggregator
├── kube-controller-manager
├── kubectl
├── kubelet
├── kube-proxy
├── kube-scheduler
├── legacy-cloud-providers
├── metrics
├── mount-utils
├── noderesourcetopology-api
├── pod-security-admission
├── sample-apiserver
├── sample-cli-plugin
└── sample-controller
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>目录功能：</strong></p>
<ul>
<li><code v-pre>api/</code>目录包含Kubernetes API的定义。</li>
<li><code v-pre>apiextensions-apiserver/</code>目录包含用于扩展Kubernetes API的代码。</li>
<li><code v-pre>apimachinery/</code>目录包含用于构建Kubernetes API的工具。</li>
<li><code v-pre>apiserver/</code>目录包含Kubernetes API服务器的源代码。</li>
<li><code v-pre>client-go/</code>目录包含用于访问Kubernetes API的客户端库。</li>
<li><code v-pre>cli-runtime/</code>目录包含用于扩展kubectl的库。</li>
<li><code v-pre>cloud-provider/</code>目录包含用于支持云平台的代码。</li>
<li><code v-pre>cluster-bootstrap/</code>目录包含用于引导新集群的工具。</li>
<li><code v-pre>code-generator/</code>目录包含用于生成Kubernetes代码的工具。</li>
<li><code v-pre>component-base/</code>目录包含Kubernetes组件的基础库。</li>
<li><code v-pre>component-helpers/</code>目录包含用于帮助构建Kubernetes组件的库。</li>
<li><code v-pre>controller-manager/</code>目录包含Kubernetes控制器管理器的代码。</li>
<li><code v-pre>csi-translation-lib/</code>目录包含用于在Kubernetes和容器存储接口(CSI)之间进行转换的库。</li>
<li><code v-pre>cri-api/</code>目录包含用于运行容器的代码。</li>
<li><code v-pre>dynamic-resource-allocation/</code>目录包含用于动态分配资源的代码。</li>
<li><code v-pre>kms/</code>目录包含用于管理加密密钥的代码。</li>
<li><code v-pre>kube-aggregator/</code>目录包含用于提供聚合API服务器的代码。</li>
<li><code v-pre>kube-controller-manager/</code>目录包含Kubernetes控制器管理器的代码。</li>
<li><code v-pre>kubectl/</code>目录包含kubectl命令行工具的源代码。</li>
<li><code v-pre>kubelet/</code>目录包含kubelet的源代码。</li>
<li><code v-pre>kube-proxy/</code>目录包含Kubernetes代理的代码。</li>
<li><code v-pre>kube-scheduler/</code>目录包含Kubernetes调度程序的代码。</li>
<li><code v-pre>legacy-cloud-providers/</code>目录包含已废弃的云提供商代码。</li>
<li><code v-pre>metrics/</code>目录包含用于收集Kubernetes度量指标的代码。</li>
<li><code v-pre>mount-utils/</code>目录包含用于挂载文件系统的工具。</li>
<li><code v-pre>noderesourcetopology-api/</code>目录包含用于描述节点资源拓扑结构的API。</li>
<li><code v-pre>pod-security-admission/</code>目录包含用于控制pod安全性的代码。</li>
<li><code v-pre>sample-apiserver/</code>目录包含Kubernetes示例API服务器的代码。</li>
<li><code v-pre>sample-cli-plugin/</code>目录包含用于扩展kubectl的示例插件的代码。</li>
<li><code v-pre>sample-controller/</code>目录包含Kubernetes示例控制器的代码。</li>
</ul>
<h3 id="staging-src-k8s-io-api" tabindex="-1"><a class="header-anchor" href="#staging-src-k8s-io-api" aria-hidden="true">#</a> staging/src/k8s.io/api/</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/kubernetes/staging/src/k8s.io<span class="token comment"># ls api</span>
admission              authorization       coordination  flowcontrol  <span class="token function">node</span>       roundtrip_test.go
admissionregistration  autoscaling         core          go.mod       OWNERS     scheduling
apidiscovery           batch               discovery     go.sum       policy     SECURITY_CONTACTS
apiserverinternal      certificates        doc.go        imagepolicy  rbac       storage
apps                   code-of-conduct.md  events        LICENSE      README.md  testdata
authentication         CONTRIBUTING.md     extensions    networking   resource
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>功能：</strong></p>
<ul>
<li><code v-pre>admission/</code>目录包含代码，用于控制对资源的访问。</li>
<li><code v-pre>admissionregistration/</code>目录包含代码，用于注册资源访问控制组件。</li>
<li><code v-pre>apidiscovery/</code>目录包含代码，用于描述Kubernetes API的发现机制。</li>
<li><code v-pre>apiserverinternal/</code>目录包含代码，用于实现Kubernetes API服务器的内部功能。</li>
<li><code v-pre>apps/</code>目录包含代码，用于管理应用程序资源。</li>
<li><code v-pre>authentication/</code>目录包含代码，用于控制身份验证。</li>
<li><code v-pre>authorization/</code>目录包含代码，用于控制授权。</li>
<li><code v-pre>autoscaling/</code>目录包含代码，用于控制资源的自动扩展。</li>
<li><code v-pre>batch/</code>目录包含代码，用于管理批处理资源。</li>
<li><code v-pre>certificates/</code>目录包含代码，用于管理证书资源。</li>
<li><code v-pre>coordination/</code>目录包含代码，用于管理分布式协调资源。</li>
<li><code v-pre>core/</code>目录包含代码，用于管理核心资源。</li>
<li><code v-pre>rbac/</code>目录包含代码，用于管理角色基本访问控制(RBAC)资源。</li>
<li><code v-pre>scheduling/</code>目录包含代码，用于管理调度资源。</li>
<li><code v-pre>storage/</code>目录包含代码，用于管理存储资源。</li>
</ul>
<p>除了这些目录之外，还有一些文件，它们也是重要的部分：</p>
<ul>
<li><code v-pre>doc.go</code>是文档的入口文件。</li>
<li><code v-pre>go.mod</code>和<code v-pre>go.sum</code>是Go的依赖管理文件。</li>
<li><code v-pre>LICENSE</code>文件包含Kubernetes使用的许可证。</li>
<li><code v-pre>OWNERS</code>文件包含负责维护目录的人员列表。</li>
<li><code v-pre>README.md</code>文件包含有关目录的信息。</li>
<li><code v-pre>SECURITY_CONTACTS</code>文件包含有关安全问题的联系人列表。</li>
<li><code v-pre>testdata/</code>目录包含测试数据。</li>
<li><code v-pre>code-of-conduct.md</code>文件包含有关Kubernetes社区行为准则的信息。</li>
<li><code v-pre>CONTRIBUTING.md</code>文件包含有关如何为Kubernetes贡献代码的信息。</li>
<li><code v-pre>roundtrip_test.go</code>文件包含用于测试的代码。</li>
</ul>
<p><strong>⚠️ 📜 对上面的解释：</strong></p>
<blockquote>
<p>我们可以进一步再观察 <code v-pre>apps</code> 目录，这个名称很眼熟，pkg/apis/apps/ 目录和 staging/src/k8s.io/api/apps/ 它们的目录结构很接近，请问它们有什么不一样，我想了解它们的对比而加深对它们的理解</p>
</blockquote>
<h2 id="pkg-apis-apps-目录和-staging-src-k8s-io-api-apps-目录" tabindex="-1"><a class="header-anchor" href="#pkg-apis-apps-目录和-staging-src-k8s-io-api-apps-目录" aria-hidden="true">#</a> pkg/apis/apps/ 目录和 staging/src/k8s.io/api/apps/目录</h2>
<p>pkg/apis/和staging/src/k8s.io/api/目录都是Kubernetes源码的一部分。它们之间的主要区别是，pkg/apis/目录下的代码更加抽象，通常是由staging/src/k8s.io/api/目录下的代码实现的。</p>
<p>在Kubernetes中，pkg/apis/目录下的代码定义了API资源的抽象接口。这些接口描述了资源的类型、字段和操作，但没有实现具体的逻辑。相反，staging/src/k8s.io/api/目录下的代码实现了这些接口。这些实现提供了资源的具体功能，并将其与Kubernetes系统的其他部分集成在一起。</p>
<p>例如，pkg/apis/apps/目录下定义了一组接口，用于表示应用程序资源。 staging/src/k8s.io/api/apps/目录下的代码实现了这些接口，并提供了应用程序资源的具体功能。</p>
<p><strong>为了跟清楚的了解，我截取了它们的目录结构：</strong></p>
<p><img src="http://sm.nsddd.top/sm202301071411550.png" alt="image-20230107141113159"></p>
<p><strong>总结：</strong></p>
<ol>
<li>pkg/apis/apps/目录和staging/src/k8s.io/api/apps/目录都是Kubernetes源码的一部分。它们都是用于管理应用程序资源的代码。</li>
<li>pkg/apis/apps/目录中的代码定义了抽象的API接口，用于描述应用程序资源的类型、字段和操作。它并没有提供资源的具体功能。</li>
<li>staging/src/k8s.io/api/apps/目录中的代码实现了pkg/apis/apps/目录中的接口。它提供了应用程序资源的具体功能，并将其与Kubernetes系统的其他部分集成在一起。</li>
<li>总的来说，pkg/apis/目录中的代码是Kubernetes中API资源的抽象接口，而staging/src/k8s.io/api/目录中的代码则是这些接口的具体实现。</li>
</ol>
<h2 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd" aria-hidden="true">#</a> cmd</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 cmd</span>
cmd
├── clicheck
├── cloud-controller-manager
├── dependencycheck
├── dependencyverifier
├── gendocs
├── genkubedocs
├── genman
├── genswaggertypedocs
├── genutils
├── genyaml
├── importverifier
├── kubeadm
├── kube-apiserver
├── kube-controller-manager
├── kubectl
├── kubectl-convert
├── kubelet
├── kubemark
├── kube-proxy
├── kube-scheduler
├── linkcheck
├── OWNERS
├── preferredimports
├── prune-junit-xml
└── yamlfmt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p><code v-pre>kube-apiserver</code> 中有 <code v-pre>apiserver.go</code> 文件，就是 <code v-pre>apiserver</code> 启动入口</p>
</div>
</div>
<h2 id="build" tabindex="-1"><a class="header-anchor" href="#build" aria-hidden="true">#</a> build</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 build</span>
build
├── build-image
├── common.sh
├── copy-output.sh
├── dependencies.yaml
├── lib
├── make-build-image.sh
├── make-clean.sh
├── nsswitch.conf
├── OWNERS
├── package-tarballs.sh
├── pause
├── README.md
├── release-images.sh
├── release-in-a-container.sh
├── release.sh
├── root
├── run.sh
├── server-image
├── shell.sh
├── tools.go
└── util.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vendor" tabindex="-1"><a class="header-anchor" href="#vendor" aria-hidden="true">#</a> vendor</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 vendor/</span>
vendor/
├── bitbucket.org
├── cloud.google.com
├── github.com
├── go.etcd.io
├── golang.org
├── gonum.org
├── google.golang.org
├── go.opencensus.io
├── go.opentelemetry.io
├── gopkg.in
├── go.starlark.net
├── go.uber.org
├── k8s.io
├── modules.txt
├── OWNERS
└── sigs.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hack" tabindex="-1"><a class="header-anchor" href="#hack" aria-hidden="true">#</a> hack</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 hack/</span>
hack/
├── benchmark-go.sh
├── boilerplate
├── build-cross.sh
├── build-go.sh
├── cherry_pick_pull.sh
├── conformance
├── dev-build-and-push.sh
├── dev-build-and-up.sh
├── dev-push-conformance.sh
├── e2e-internal
├── e2e-node-test.sh
├── generate-docs.sh
├── gen-swagger-doc
├── get-build.sh
├── ginkgo-e2e.sh
├── grab-profiles.sh
├── install-etcd.sh
├── jenkins
├── lib
├── lint-dependencies.sh
├── list-feature-tests.sh
├── local-up-cluster.sh
├── logcheck.conf
├── make-rules
├── module-graph.sh
├── OWNERS
├── pin-dependency.sh
├── print-workspace-status.sh
├── README.md
├── run-in-gopath.sh
├── run-prometheus-on-etcd-scrapes.sh
├── serve-prom-scrapes.sh
├── testdata
├── test-go.sh
├── test-integration.sh
├── tools
├── unwanted-dependencies.json
├── update-all.sh
├── update-codegen.sh
├── update-conformance-yaml.sh
├── update-generated-api-compatibility-data.sh
├── update-generated-device-plugin-dockerized.sh
├── update-generated-device-plugin.sh
├── update-generated-docs.sh
├── update-generated-kms-dockerized.sh
├── update-generated-kms.sh
├── update-generated-kubelet-plugin-registration-dockerized.sh
├── update-generated-kubelet-plugin-registration.sh
├── update-generated-pod-resources-dockerized.sh
├── update-generated-pod-resources.sh
├── update-generated-protobuf-dockerized.sh
├── update-generated-protobuf.sh
├── update-generated-runtime-dockerized.sh
├── update-generated-runtime.sh
├── update-generated-stable-metrics.sh
├── update-generated-swagger-docs.sh
├── update-gofmt.sh
├── update-import-aliases.sh
├── update-internal-modules.sh
├── update-kustomize.sh
├── update-mocks.sh
├── update-netparse-cve.sh
├── update-openapi-spec.sh
├── update-translations.sh
├── update-vendor-licenses.sh
├── update-vendor.sh
├── update-yamlfmt.sh
├── verify-all.sh
├── verify-api-groups.sh
├── verify-boilerplate.sh
├── verify-cli-conventions.sh
├── verify-codegen.sh
├── verify-conformance-requirements.sh
├── verify-conformance-yaml.sh
├── verify-description.sh
├── verify-e2e-test-ownership.sh
├── verify-external-dependencies-version.sh
├── verify-flags
├── verify-flags-underscore.py
├── verify-generated-device-plugin.sh
├── verify-generated-docs.sh
├── verify-generated-files-remake.sh
├── verify-generated-files.sh
├── verify-generated-kms.sh
├── verify-generated-kubelet-plugin-registration.sh
├── verify-generated-pod-resources.sh
├── verify-generated-protobuf.sh
├── verify-generated-runtime.sh
├── verify-generated-stable-metrics.sh
├── verify-generated-swagger-docs.sh
├── verify-gofmt.sh
├── verify-golangci-lint.sh
├── verify-govet-levee.sh
├── verify-govet.sh
├── verify-import-aliases.sh
├── verify-import-boss.sh
├── verify-imports.sh
├── verify-internal-modules.sh
├── verify-linkcheck.sh
├── verify-mocks.sh
├── verify-netparse-cve.sh
├── verify-non-mutating-validation.sh
├── verify-no-vendor-cycles.sh
├── verify-openapi-spec.sh
├── verify-pkg-names.sh
├── verify-prerelease-lifecycle-tags.sh
├── verify-prometheus-imports.sh
├── verify-publishing-bot.py
├── verify-readonly-packages.sh
├── verify-shellcheck.sh
├── verify-spelling.sh
├── verify-staging-meta-files.sh
├── verify-test-code.sh
├── verify-test-featuregates.sh
├── verify-test-images.sh
├── verify-typecheck-providerless.sh
├── verify-typecheck.sh
├── verify-vendor-licenses.sh
├── verify-vendor.sh
└── verify-yamlfmt.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="plugin" tabindex="-1"><a class="header-anchor" href="#plugin" aria-hidden="true">#</a> plugin</h2>
<p><code v-pre>plugin</code>目录之前的版本包括 <code v-pre>scheduler</code> 部分的代码，当前版本（应该是在1.10之后）已经将scheduler部分代码移到和其他组件一致的pkg目录，所以目前 <code v-pre>plugin</code> 主要包含的是<code v-pre>认证</code>与<code v-pre>鉴权</code>部分的代码。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree plugin/ -L 4</span>
plugin/
├── OWNERS
└── pkg
    ├── admission
    │   ├── admit
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── alwayspullimages
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── antiaffinity
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   └── doc.go
    │   ├── certificates
    │   │   ├── approval
    │   │   ├── OWNERS
    │   │   ├── signing
    │   │   ├── subjectrestriction
    │   │   └── util.go
    │   ├── defaulttolerationseconds
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── deny
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── eventratelimit
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   ├── apis
    │   │   ├── cache.go
    │   │   ├── cache_test.go
    │   │   ├── config.go
    │   │   ├── doc.go
    │   │   └── limitenforcer.go
    │   ├── extendedresourcetoleration
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── gc
    │   │   ├── gc_admission.go
    │   │   └── gc_admission_test.go
    │   ├── imagepolicy
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   ├── certs_test.go
    │   │   ├── config.go
    │   │   ├── config_test.go
    │   │   ├── doc.go
    │   │   ├── gencerts.sh
    │   │   └── OWNERS
    │   ├── limitranger
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   └── interfaces.go
    │   ├── namespace
    │   │   ├── autoprovision
    │   │   └── exists
    │   ├── network
    │   │   ├── defaultingressclass
    │   │   └── denyserviceexternalips
    │   ├── noderestriction
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   └── OWNERS
    │   ├── nodetaint
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── OWNERS
    │   ├── podnodeselector
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── podtolerationrestriction
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   ├── apis
    │   │   ├── config.go
    │   │   └── doc.go
    │   ├── priority
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── resourcequota
    │   │   └── admission_test.go
    │   ├── runtimeclass
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   └── OWNERS
    │   ├── security
    │   │   ├── doc.go
    │   │   ├── podsecurity
    │   │   └── podsecuritypolicy
    │   ├── securitycontext
    │   │   └── scdeny
    │   ├── serviceaccount
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   ├── doc.go
    │   │   └── OWNERS
    │   └── storage
    │       ├── persistentvolume
    │       ├── storageclass
    │       └── storageobjectinuseprotection
    └── auth
        ├── authenticator
        │   ├── OWNERS
        │   └── token
        ├── authorizer
        │   ├── doc.go
        │   ├── <span class="token function">node</span>
        │   ├── OWNERS
        │   └── rbac
        ├── doc.go
        └── OWNERS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '31.md' style='float:left'>⬆️上一节🔗  </a><a href = '33.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


