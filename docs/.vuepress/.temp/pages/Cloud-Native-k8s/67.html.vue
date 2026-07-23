<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第67节-k8s-深入理解-operator-client-详解" tabindex="-1"><a class="header-anchor" href="#第67节-k8s-深入理解-operator-client-详解" aria-hidden="true">#</a> 第67节 K8s 深入理解 Operator-client 详解</h1>
<div><a href = '66.md' style='float:left'>⬆️上一节🔗  </a><a href = '68.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>在上一个对于 client-go 学习中，通过 sample-controller 的项目了解到 Kubernetes 的 部分 client-go 的学习。继续深入学习 client-go</p>
<h3 id="client-go" tabindex="-1"><a class="header-anchor" href="#client-go" aria-hidden="true">#</a> Client-go</h3>
<p>kubectl 并不适合 Kubernetes 的二次开发者来和 k8s 打交道，Go语言提供了一个专门和 Kubernetes API 交互的 库 Client-go。</p>
<p>Kubernetes 也提供了一个编写控制器<a href="https://github.com/kubernetes/sample-controller/" target="_blank" rel="noopener noreferrer">的小案例<ExternalLinkIcon/></a>，可以作为 client-go 的入门</p>
<p>Client-go是一个用于与 Kubernetes API 交互的Go库。它提供了广泛的功能，用于与Kubernetes API交互，包括强类型 API、资源客户端、Watch API 和动态客户端。使用 client-go，开发人员可以轻松地在 Kubernetes 中创建、读取、更新和删除资源对象。</p>
<blockquote>
<p>从这个<code v-pre>package</code>的名称来看，这应该是跟<code v-pre>k8s</code>打交道的客户端<code v-pre>client</code>的<code v-pre>go</code>实现，这一点没错，它定义了诸多资源的客户端<code v-pre>client</code>。</p>
</blockquote>
<ul>
<li><a href="https://github.com/kubernetes/client-go" target="_blank" rel="noopener noreferrer">Client-go GitHub Address<ExternalLinkIcon/></a></li>
<li>https://github.com/cubxxw/client-go</li>
</ul>
<p>上面是 client-go 的 GitHub 仓库，不过这个库是 actions 以每天一次的频率从 Kubernetes/Kubernetes 主仓库中自动同步过来的。所以如果我们想贡献的话找好位置去 Kubernetes 贡献（kubernetes/stagin/src/k8s.io）。</p>
<h3 id="client-go目录结构" tabindex="-1"><a class="header-anchor" href="#client-go目录结构" aria-hidden="true">#</a> Client-go目录结构</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>├── discovery   <span class="token comment"># DsicoveryClient客户端,用于发现k8s所支持GVR。</span>
├── dynamic     <span class="token comment"># DynamicClient客户端, 用于访问k8s Resources，也可以访问CRD。</span>
├── informers   <span class="token comment"># k8s中各种Resources的Informer机制的实现。</span>
├── kubernetes  <span class="token comment"># 对RestClient进行了封装，定义多种Client的客户端集合，俗称clientset。</span>
├── listers     <span class="token comment"># 提供对Resources的获取功能。对于Get()和List()而言，listers提供给二者的数据都是从缓存中读取的。</span>
├── pkg
├── plugin      <span class="token comment"># 提供第三方插件。</span>
├── scale       <span class="token comment"># 定义用于Deploy, RS, RC等资源进行的扩、缩容的客户端ScaleClient。</span>
├── tools       <span class="token comment"># 实现client查询和缓存机制，以及定义诸如SharedInformer、Reflector、DealtFIFO和Indexer等常用工具。</span>
├── transport
└── util        <span class="token comment"># 提供诸如WorkQueue、Certificate等常用方法。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<ul>
<li><code v-pre>/discovery</code>：该目录包含用于发现和获取Kubernetes API资源的代码。这些资源包括Pod、Service、ReplicationController等。<code v-pre>discovery</code>目录中的代码可以帮助开发人员发现和使用这些资源。</li>
<li><code v-pre>/dynamic</code>：该目录包含动态客户端库，用于与Kubernetes API交互，而无需生成代码。这对于构建需要与任意Kubernetes资源交互的通用工具和实用程序非常有用。</li>
<li><code v-pre>/kubernetes</code>：这个包中方的是用 client-gen 自动生成的用来访问 Kubernetes API 的 ClientSet，后面会经常看到 ClientSet 这个工具。</li>
<li><code v-pre>/informers</code>：该目录包含用于监视Kubernetes资源变化的代码。这些变化可以包括资源的创建、更新和删除。<code v-pre>informers</code>目录中的代码可以帮助开发人员构建控制器和其他需要对Kubernetes环境中的变化做出反应的应用程序。</li>
<li><code v-pre>/listers</code>：该目录包含用于从Kubernetes服务器获取资源列表的代码。这些资源列表包括Pod、Service、Namespace等。<code v-pre>listers</code>目录中的代码可以帮助开发人员更轻松地获取有关Kubernetes资源的信息。</li>
<li><code v-pre>/rest</code>：该目录包含用于与Kubernetes API交互的代码。这些API包括Pod、Service、Namespace等。<code v-pre>rest</code>目录中的代码可以帮助开发人员执行各种操作，包括管理Pod、Deployment、Service、Namespace等。</li>
<li><code v-pre>/scale</code>：该目录包含用于与Kubernetes资源的自动缩放相关的代码。这些资源包括Deployment、ReplicaSet、StatefulSet等。<code v-pre>scale</code>目录中的代码可以帮助开发人员自动缩放与Kubernetes资源相关的组件。</li>
<li><code v-pre>transport</code>：这个包用于设置认证和建立连接</li>
<li><code v-pre>/tools</code>：该目录包含用于测试和其他实用程序的代码。这些实用程序包括代码生成器、测试工具等。<code v-pre>tools</code>目录中的代码可以帮助开发人员更轻松地测试和使用client-go库。</li>
<li><code v-pre>/util</code>：该目录包含用于客户端库的辅助功能的代码。这些功能包括对Kubernetes API对象的类型转换、对象比较等。<code v-pre>util</code>目录中的代码可以帮助开发人员更轻松地使用client-go库。</li>
</ul>
<h3 id="获取-client-go" tabindex="-1"><a class="header-anchor" href="#获取-client-go" aria-hidden="true">#</a> 获取 Client-go</h3>
<p>可以通过 go get 命令获取 client-go，不过我直接克隆最新源代码，然后构建为可执行文件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/kubernetes/client-go.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>他们给了一些样例的文件，我找出来：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">find</span> <span class="token parameter variable">-name</span> main.go
./examples/workqueue/main.go
./examples/in-cluster-client-configuration/main.go
./examples/out-of-cluster-client-configuration/main.go
./examples/dynamic-create-update-delete-deployment/main.go
./examples/create-update-delete-deployment/main.go
./examples/leader-election/main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些文件可以帮助我们快速上手 client-go：</p>
<ul>
<li><code v-pre>./examples/workqueue/main.go</code>：演示如何使用 Kubernetes 的工作队列（Workqueue）实现资源控制器（Controller）。</li>
<li><code v-pre>./examples/in-cluster-client-configuration/main.go</code>：演示如何在 Kubernetes 集群内部使用 <code v-pre>client-go</code> 访问 Kubernetes API Server。</li>
<li><code v-pre>./examples/out-of-cluster-client-configuration/main.go</code>：演示如何在 Kubernetes 集群外部使用 <code v-pre>client-go</code> 访问 Kubernetes API Server。</li>
<li><code v-pre>./examples/dynamic-create-update-delete-deployment/main.go</code>：演示如何使用 Kubernetes 的动态客户端库（Dynamic Client）实现对 Deployment 资源对象的增删改查等操作。</li>
<li><code v-pre>./examples/create-update-delete-deployment/main.go</code>：演示如何使用 <code v-pre>client-go</code> 实现对 Deployment 资源对象的增删改查等操作。</li>
<li><code v-pre>./examples/leader-election/main.go</code>：演示如何使用 Kubernetes 的 Leader Election 机制，实现资源控制器的高可用性和故障转移。</li>
</ul>
<p>在 <code v-pre>/root/workspaces/client-go/examples/workqueue</code> 目录中：</p>
<p>我们是不能直接编译的，看一下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ ./main <span class="token parameter variable">--help</span>
Usage of ./main:
  <span class="token parameter variable">-kubeconfig</span> string
        absolute path to the kubeconfig <span class="token function">file</span>
  <span class="token parameter variable">-master</span> string
        master url
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>指定 kubeconfig （也可以通过设置环境变量  <code v-pre>export KUBECONFIG</code> ）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ ./main <span class="token parameter variable">-kubeconfig</span> ~/.kube/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>举例：使用 kubectl 命令行工具创建一个名为 myresource 的自定义资源，并将其保存到 YAML 文件中。然后，运行 <code v-pre>go run ./examples/workqueue/main.go</code> 命令启动控制器。此时，控制器会开始监听 myresource 资源，并在该资源被创建或更新时，异步地处理一些任务。</p>
</blockquote>
<p><strong>继续演示 对 Deployment CURD 操作：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token builtin class-name">cd</span> dynamic-create-update-delete-deployment/
❯ <span class="token function">ls</span>
README.md  main.go
❯ go build main.go
❯ ./main 
Creating deployment<span class="token punctuation">..</span>.
Created deployment <span class="token string">"demo-deployment"</span><span class="token builtin class-name">.</span>
-<span class="token operator">></span> Press Return key to continue.

Updating deployment<span class="token punctuation">..</span>.
Updated deployment<span class="token punctuation">..</span>.
-<span class="token operator">></span> Press Return key to continue.

Listing deployments <span class="token keyword">in</span> namespace <span class="token string">"default"</span><span class="token builtin class-name">:</span>
 * demo-deployment <span class="token punctuation">(</span><span class="token number">1</span> replicas<span class="token punctuation">)</span>
 * my-nginx-app <span class="token punctuation">(</span><span class="token number">3</span> replicas<span class="token punctuation">)</span>
 * nginx-deployment <span class="token punctuation">(</span><span class="token number">3</span> replicas<span class="token punctuation">)</span>
-<span class="token operator">></span> Press Return key to continue.

Deleting deployment<span class="token punctuation">..</span>.
Deleted deployment.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>./examples/dynamic-create-update-delete-deployment/main.go</code>：这个示例文件演示如何使用 Kubernetes 的动态客户端库（Dynamic Client）实现对 Deployment 资源对象的增删改查等操作。使用动态客户端库，开发人员可以更加灵活地操作 Kubernetes 资源对象，而不需要手动编写复杂的代码。例如，在这个示例中，开发人员可以使用 DynamicClient 对象，动态地创建、更新和删除 Deployment 资源对象。</p>
<blockquote>
<p>举例：使用 kubectl 命令行工具创建一个名为 my-deployment 的 Deployment 对象，并将其保存到 YAML 文件中。然后，运行 <code v-pre>go run ./examples/dynamic-create-update-delete-deployment/main.go</code> 命令，使用 DynamicClient 对象，动态地创建、更新和删除 my-deployment Deployment 对象。</p>
</blockquote>
<p>测试：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k get deployment
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
demo-deployment    <span class="token number">0</span>/1     <span class="token number">0</span>            <span class="token number">0</span>           4s
my-nginx-app       <span class="token number">0</span>/3     <span class="token number">3</span>            <span class="token number">0</span>           26h
nginx-deployment   <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           165m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="workqueue-源码分析" tabindex="-1"><a class="header-anchor" href="#workqueue-源码分析" aria-hidden="true">#</a> WorkQueue 源码分析</h3>
<p>WorkQueue 一般使用的说就是延迟队列的实现，在 Resopurce Event Handlers 中会完成将对象的 key 放入 WorkQueue 的过程，然后再自己的逻辑代码中从 WorkQueue 中消费这些 Key。</p>
<p>Client-go 的 <code v-pre>utile/Workqueue</code> 包中有三个队列：</p>
<p>分别对应的是 普通队列、延时队列和限速队列。对应的源文件分别是：</p>
<ul>
<li>queue.go</li>
<li>delaying_queue.go</li>
<li>rate_limiting_queue.go</li>
</ul>
<p><strong>我们先看看 普通队列，这个对应的文件就是 queue.go：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Interface <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Add</span><span class="token punctuation">(</span>item <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token function">Len</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
	<span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>item <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> shutdown <span class="token builtin">bool</span><span class="token punctuation">)</span>
	<span class="token function">Done</span><span class="token punctuation">(</span>item <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token function">ShutDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">ShutDownWithDrain</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token function">ShuttingDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看接口就知道了实现了哪些方法，分别是添加元素，元素个数、获取第一个元素、第二个返回值和 channel 类似，标记了队列是否关闭。</p>
<p>Done 标记一个元素是否已经处理完，ShutDown 关闭队列，ShowDownWithDrain 关闭队列，但是等待队列中的元素处理完。ShuttingDown 标记当前的 channel 是否正在关闭。</p>
<p><strong>我们再看延迟队列，对应的文件在delaying_queue.go</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// DelayingInterface is an Interface that can Add an item at a later time. This makes it easier to</span>
<span class="token comment">// requeue items after failures without ending up in a hot-loop.</span>
<span class="token keyword">type</span> DelayingInterface <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	Interface
	<span class="token comment">// AddAfter adds an item to the workqueue after the indicated duration has passed</span>
	<span class="token function">AddAfter</span><span class="token punctuation">(</span>item <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> duration time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接口就很简单，定义 DelayingInterface 接口在 delaying_queue.go 源文件，名字和 Queue 所使用的interface对称，叫做 DelayingInterface。</p>
<p>这里有一个 Interface，对此我感觉到有一些疑惑，Interface 是普通队列命名的接口，这个设计模式的接口设计的思路蛮有意思的，先别激动，后面有你激动的，看到 Controller 的接口设计，那简直就是 6 ~</p>
<p><strong>最后我们看一下限速队列，这个有意思很多了，同样今天的项目 <code v-pre>sample-controller</code> 也用到了这个队列，我们看一下 controller 部分：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Controller <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">//...</span>
	workqueue workqueue<span class="token punctuation">.</span>RateLimitingInterface
<span class="token punctuation">}</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到了 限速队列包含了延迟队列的所有接口实现，也包含了 基本队列的所有接口实现。</p>
<p><strong>分析这个队列的接口：</strong></p>
<ul>
<li>AddRateLimited：在速率限制器认可的情况下将项目添加到工作队列中。</li>
<li>Forget：表示项目已经完成重试。无论是永久性失败还是成功，我们都会停止速率限制器对其进行跟踪。这仅清除了<code v-pre>rateLimiter</code>，您仍然需要在队列上调用<code v-pre>Done</code>方法。</li>
<li>NumRequeues：返回项目被重新排队的次数。</li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// RateLimitingInterface is an interface that rate limits items being added to the queue.</span>
<span class="token keyword">type</span> RateLimitingInterface <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	DelayingInterface

	<span class="token comment">// AddRateLimited adds an item to the workqueue after the rate limiter says it's ok</span>
	<span class="token function">AddRateLimited</span><span class="token punctuation">(</span>item <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// Forget indicates that an item is finished being retried.  Doesn't matter whether it's for perm failing</span>
	<span class="token comment">// or for success, we'll stop the rate limiter from tracking it.  This only clears the `rateLimiter`, you</span>
	<span class="token comment">// still have to call `Done` on the queue.</span>
	<span class="token function">Forget</span><span class="token punctuation">(</span>item <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// NumRequeues returns back how many times the item was requeued</span>
	<span class="token function">NumRequeues</span><span class="token punctuation">(</span>item <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在后面的学习中，我们再深入探索这些 WorkQueue 的实现。</p>
<h3 id="deltafifo-源码分析" tabindex="-1"><a class="header-anchor" href="#deltafifo-源码分析" aria-hidden="true">#</a> DeltaFIFO 源码分析</h3>
<p>DeltaFIFO 也是一个特别重要的组件，在 <code v-pre>k8s.io/client-go/tools/cache</code> 包中，用于存储对象的增量更新。</p>
<ul>
<li>存储对象的增量更新，包括添加、删除和更新操作。</li>
<li>能够按顺序处理更新，以确保它们被正确地应用。</li>
<li>支持阻塞式同步，以便在应用所有更新之前等待。</li>
</ul>
<p>在 fifo.go 中定义了一个 Queue 的接口，我们看一下接口代码：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Queue <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	Store
	<span class="token function">Pop</span><span class="token punctuation">(</span>PopProcessFunc<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token function">AddIfNotPresent</span><span class="token punctuation">(</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">HasSynced</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
	<span class="token comment">// Close the queue</span>
	<span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>嵌入了一个 Store 接口：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>Store <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Add</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">Update</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">Delete</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">List</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token function">ListKeys</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
	<span class="token function">Get</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>item <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> exists <span class="token builtin">bool</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token function">GetByKey</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>item <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> exists <span class="token builtin">bool</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token function">Replace</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">Resync</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>都是表面的意思了，CURD 操作，各种 Get、List 操作。</p>
<p><strong>除此之外，还有其他的，阅读源码即可，后面慢慢深入讲解。</strong></p>
<h3 id="informer-机制" tabindex="-1"><a class="header-anchor" href="#informer-机制" aria-hidden="true">#</a> Informer 机制</h3>
<p>Informar 这个单词出镜率很高，我们在很多文章中都可以看到这个 Informer，包括 Kubernetes 源码讲解的 ETCD 和 API Server 中。</p>
<p>Informer 从 DeltaFIFO 中 Pop 相对应的对象，会通过 Indexer 将对象和索引都丢在本地的 cache 中，再触发相应的事件处理函数（Resource Event Handlers) 的运行。</p>
<p>源码位置： <code v-pre>k8s.io/client-go/tools/cache</code></p>
<p>Informar 是通过一个 Controller 对象来进行定义的，我们先看看对象接口：</p>
<p>在 <code v-pre>controller.go</code> 文件中能看到 Controller 的定义：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Controller <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Run</span><span class="token punctuation">(</span>stopCh <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token function">HasSynced</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
	<span class="token function">LastSyncResourceVersion</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看出，最核心的方法是 <code v-pre>Run(stopCh &lt;-chan struct{})</code> Run 这个函数我们点击进去会发现，主要做了两个事情：</p>
<ul>
<li>构造 Reflector 利用 ListerWatcher 的能力将对象事件更新到 DeltaFIFO</li>
<li>从 DeltaFIFO 中 Pop 对象后调用 ProcessFunc 来处理。</li>
</ul>
<p>初始化是什么样的？</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// New makes a new Controller from the given Config.</span>
<span class="token keyword">func</span> <span class="token function">New</span><span class="token punctuation">(</span>c <span class="token operator">*</span>Config<span class="token punctuation">)</span> Controller <span class="token punctuation">{</span>
	ctlr <span class="token operator">:=</span> <span class="token operator">&amp;</span>controller<span class="token punctuation">{</span>
		config<span class="token punctuation">:</span> <span class="token operator">*</span>c<span class="token punctuation">,</span>
		clock<span class="token punctuation">:</span>  <span class="token operator">&amp;</span>clock<span class="token punctuation">.</span>RealClock<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> ctlr
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传入了一个 Config 过来，然后初始化，核心逻辑那就在 Config 中了：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Config contains all the settings for one of these low-level controllers.</span>
<span class="token keyword">type</span> Config <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Queue
	<span class="token comment">// Something that can list and watch your objects.</span>
	ListerWatcher
	<span class="token comment">// Something that can process a popped Deltas.</span>
	Process ProcessFunc
	<span class="token comment">// ObjectType is an example object of the type this controller is</span>
	<span class="token comment">// expected to handle.</span>
	ObjectType runtime<span class="token punctuation">.</span>Object
	<span class="token comment">// ObjectDescription is the description to use when logging type-specific information about this controller.</span>
	ObjectDescription <span class="token builtin">string</span>
	<span class="token comment">// FullResyncPeriod is the period at which ShouldResync is considered.</span>
	FullResyncPeriod time<span class="token punctuation">.</span>Duration
	ShouldResync ShouldResyncFunc
	RetryOnError <span class="token builtin">bool</span>
	<span class="token comment">// Called whenever the ListAndWatch drops the connection with an error.</span>
	WatchErrorHandler WatchErrorHandler
	<span class="token comment">// WatchListPageSize is the requested chunk size of initial and relist watch lists.</span>
	WatchListPageSize <span class="token builtin">int64</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sharedinformer-对象源码" tabindex="-1"><a class="header-anchor" href="#sharedinformer-对象源码" aria-hidden="true">#</a> SharedInformer 对象源码</h3>
<p>SharedInformer 和 Informer 之间的名字就差一个 Shared，在 Operator 开发中，如果不适用 controller-runtime 库（kubebuilder controller-runtime 子项目的Repo），也就是不用 Kubebuilder 等工具生成脚手架，那么应该用到的是 SharedInformerFactory，比如今天主要做的 sample-controller 的 <code v-pre>main()</code>  函数，在下面的 sample-controller 源码介绍中会讲解~</p>
<p>我们能看到这两行代码：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>kubeInformerFactory <span class="token operator">:=</span> kubeinformers<span class="token punctuation">.</span><span class="token function">NewSharedInformerFactory</span><span class="token punctuation">(</span>kubeClient<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">30</span><span class="token punctuation">)</span>
	
exampleInformerFactory <span class="token operator">:=</span> informers<span class="token punctuation">.</span><span class="token function">NewSharedInformerFactory</span><span class="token punctuation">(</span>exampleClient<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">30</span><span class="token punctuation">)</span>

controller <span class="token operator">:=</span> <span class="token function">NewController</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> kubeClient<span class="token punctuation">,</span> exampleClient<span class="token punctuation">,</span>
	kubeInformerFactory<span class="token punctuation">.</span><span class="token function">Apps</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">V1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Deployments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> exampleInformerFactory<span class="token punctuation">.</span><span class="token function">Samplecontroller</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">V1alpha1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Foos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制器的初始化后面会讲 <code v-pre>controller.go</code> 的时候重点讲解，先看看初始化过程和 SharedInformer 的关系。</p>
<p>controller 依赖于 <code v-pre>kubeInformerFactory.Apps().V1().Deployments()</code> 和 <code v-pre>exampleInformerFactory.Samplecontroller().V1alpha1().Foos()</code></p>
<p>后者是 <code v-pre>sample-controller</code> 自己 pkg 包提供的，前者是 client-go 提供的，那么看看前者：</p>
<p>这里的 Deployment 依赖的是：<code v-pre>Deployments() DeploymentInformer</code></p>
<p>而 <code v-pre>DeploymentInformer</code> 是一个接口类型，看一看：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// DeploymentInformer provides access to a shared informer and lister for</span>
<span class="token comment">// Deployments.</span>
<span class="token keyword">type</span> DeploymentInformer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span> cache<span class="token punctuation">.</span>SharedIndexInformer
	<span class="token function">Lister</span><span class="token punctuation">(</span><span class="token punctuation">)</span> v1<span class="token punctuation">.</span>DeploymentLister
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现了 <code v-pre>Informer</code>  和 <code v-pre>Lister</code>，<code v-pre>Informer</code> 本质上就是一个 <code v-pre>ShareIndexInformer</code></p>
<hr>
<p><strong>接下来的三个部分，我将详细介绍 sample-controller、kubebuilder、operator-sdk 以及它们之间那微妙的关系。</strong></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '66.md' style='float:left'>⬆️上一节🔗  </a><a href = '68.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


