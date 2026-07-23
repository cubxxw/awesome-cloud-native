<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第34节-api-server" tabindex="-1"><a class="header-anchor" href="#第34节-api-server" aria-hidden="true">#</a> 第34节 API Server</h1>
<div><a href = '33.md' style='float:left'>⬆️上一节🔗  </a><a href = '35.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="💡api-server-它很重要" tabindex="-1"><a class="header-anchor" href="#💡api-server-它很重要" aria-hidden="true">#</a> 💡API Server 它很重要</h2>
<p>它就像是数据库一样重要，缺了它，我们什么都没办法实现，但是相比较控制器，它又不是我们核心。</p>
<p>但是我们作为第一步，我希望可以从它开始学习~</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>我们知道 kubernetes 控制层面的核心组件包括 API-Server、 Controller Manager、Scheduler，其中 API-Server 对内与分布式存储系统 etcd 交互实现 kubernetes 资源（例如 pod、namespace、configMap、service 等）的持久化，对外提供通过 RESTFul 的形式提供 kubernetes API 的访问接口，除此之外，它还负责 API 请求的认证(authN)、授权(authZ)以及验证。刚提到的“对外”是相对的概念，因为除了像 kubectl 之类的命令行工具之外，kubernetes 的其他组件也会通过各种客户端库来访问 kubernetes API，关于官方提供的各种客户端库请查看 client-libraries 列表，其中最典型的是 Go 语言的客户端库 client-go。</p>
</div>
<p><img src="http://sm.cubxxw.com/smimage-20221203150413748.png" alt="image-20221203150413748"></p>
<p>⚠️ 前面知道：<strong>apis 是包含内建 API Groups 和 API Objects 的，而 scheme 相关的代码大部分在这里。</strong></p>
<h2 id="三个重要的-api-名词" tabindex="-1"><a class="header-anchor" href="#三个重要的-api-名词" aria-hidden="true">#</a> 三个重要的 API 名词</h2>
<h3 id="api-object" tabindex="-1"><a class="header-anchor" href="#api-object" aria-hidden="true">#</a> API Object</h3>
<p>是 Kubernetes 内部管理的基本元素，是 Kubernetes 在 ETCD 中信息存储单元。</p>
<p>例如 Deployment，Pod，Service，都是 API Object。内部代码常用 <code v-pre>API</code> 称呼。</p>
<h3 id="api-group" tabindex="-1"><a class="header-anchor" href="#api-group" aria-hidden="true">#</a> API  Group</h3>
<p>一组 API Object 组成的一个具有共有性质的对象集合。</p>
<p>例如：apps 这个 group ，它由 Deployment，ReplicaSet，StatefulSet。</p>
<h3 id="legacy-api-object" tabindex="-1"><a class="header-anchor" href="#legacy-api-object" aria-hidden="true">#</a> Legacy API Object</h3>
<p>绝大多数的 API Object 都被归在 API Group 下面，特别是新版中引入的一定非遵从这一原则。</p>
<p>但是在 Kubernetes 项目项目初始化阶段所引入的 API Object 没有显示定义在 API Group 下面，例如 Pod，Event，Node等等，在代码中有时也称呼他们为 <code v-pre>core</code> 、API Object</p>
<h2 id="gvk与gvr" tabindex="-1"><a class="header-anchor" href="#gvk与gvr" aria-hidden="true">#</a> GVK与GVR</h2>
<p>Kubernetes API 通过 HTTP 协议以 RESTful 的形式提供，API 资源的序列化方式主要是以 JSON 格式进行，但为了内部通信也支持 Protocol Buffer 格式。为了方便扩展与演进，kubernetes API 支持分组与多版本，这体现在不同的 API 访问路径上。有了分组与多版本支持，即使要在新版本中去掉 API 资源的特定字段或者重构 API 资源的展现形式，也可以保证版本之间的兼容性。</p>
<ul>
<li>GVK 就是 group、verison、kind</li>
<li>GVR 就是 group、version、resource</li>
</ul>
<details class="custom-container details"><summary>为什么会有 Kind resource 两个相似的概念</summary>
<ul>
<li>
<p>首先我们要明确几个概念：</p>
<ul>
<li>
<p>在编码过程中，资源数据的存储都是</p>
<p>以结构体存储</p>
<p>(称为 Go type)</p>
<ul>
<li>由于多版本version的存在（alpha1，beta1，v1等），<strong>不同版本中存储结构体的存在着差异</strong>，但是我们都会给其相同的 Kind 名字（比如 Deployment）</li>
<li>因此，我们编码中<strong>只用 Kind 名（如 Deployment），并不能准确获取到其使用哪个版本结构体</strong></li>
<li>所以，采用 GVK 获取到一个具体的 存储结构体，也就是 GVK 的三个信息（group/verion/kind) 确定一个 Go type（结构体）
<ul>
<li>如何获取呢？ —— 通过 Scheme, <strong>Scheme 存储了 GVK 和 Go type 的映射关系</strong></li>
</ul>
</li>
</ul>
</li>
<li>
<p>在创建资源过程中，我们编写 yaml，提交请求：</p>
<ul>
<li>编写 yaml 过程中，我们会写 apiversion 和 kind，其实就是 GVK</li>
<li>而客户端（也就是我们）与 apiserver 通信是 http 形式，就是将请求发送到某一 http path</li>
<li>发送到哪个 http path 呢？
<ul>
<li>这个 http path 其实就是 GVR
<ul>
<li><code v-pre>/apis/batch/v1/namespaces/default/job</code> 这个就是表示 default 命名空间的 job 资源</li>
<li>我们 kubectl get po 时 也是请求的路径 也可以称之为 GVR</li>
</ul>
</li>
<li>其实 GVR 是由 GVK 转化而来 —— <strong>通过REST映射的RESTMappers实现</strong></li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</details>
<p><strong>总结：</strong></p>
<ul>
<li>同 Kind 由于多版本会存在 多个数据结构（Go type）</li>
<li>GVK 可以确定一个具体的 Go Type（映射关系由 Scheme 维护）</li>
<li>GVK 可以转换 http path 请求路径（也就是 GVR）（映射由RESTMappers实现）</li>
<li>GVK和GVR是相关的。GVK在GVR标识的HTTP路径下提供服务。将GVK映射到GVR的过程称为REST映射。我们将在“ REST Mapping”中看到在Golang中实现REST映射的RESTMappers。</li>
</ul>
<h3 id="api-group-1" tabindex="-1"><a class="header-anchor" href="#api-group-1" aria-hidden="true">#</a> API-group</h3>
<p>将整个 kubernetes API 资源分成各个组，可以带来很多好处：</p>
<ul>
<li>各组可以单独打开或者关闭</li>
<li>各组可以有独立的版本，在不影响其他组的情况下单独向前衍化</li>
<li>同一个资源可以同时存在于多个不同组中，这样就可以同时支持某个特定资源稳定版本与实验版本</li>
</ul>
<p>关于 kubernetes API 资源的分组信息可以在序列化的资源定义中有所体现，例如：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>deploy
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 apiVersion 字段中 <code v-pre>apps</code> 即为 <code v-pre>Deployment</code> 资源的分组，实际上，<code v-pre>Deployment</code> 不止出现在 <code v-pre>apps</code> 分组里，也出现在 <code v-pre>extensions</code> 分组中，不同的分组可以实验不同的特性；另外，<code v-pre>kubernetes</code> 中的核心资源如 <code v-pre>pod</code>、<code v-pre>namespace</code>、<code v-pre>configmap</code>、<code v-pre>node</code>、<code v-pre>service</code> 等存在于 <code v-pre>core</code> 分组中，但是由于历史的原因，<code v-pre>core</code> 不出现在 <code v-pre>apiVersion</code> 字段中，例如以下定义一个 <code v-pre>pod</code> 资源的序列化对象：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>pod
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> exp
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>API 分组也体现在访问资源的 <code v-pre>RESTful API</code> 路径上，<strong>core 组</strong> 中的资源访问路径一般为 <code v-pre>/api/$VERSION</code>，其他命名组的资源访问路径则是 <code v-pre>/apis/$GROUP_NAME/$VERSION</code>，此外还有一些系统级别的资源，如集群指标信息 <code v-pre>/metrics</code>，以上这些就基本构成了 kubernetes API 的树结构：</p>
<p><img src="http://sm.cubxxw.com/smimage-20221203150759615.png" alt="image-20221203150759615"></p>
<h3 id="api-version" tabindex="-1"><a class="header-anchor" href="#api-version" aria-hidden="true">#</a> API-version</h3>
<p>为了支持独立的演进，kubernetes API 也支持不同的版本，不同的版本代表不同的成熟度。注意，这里说的是 <strong>API 而非资源</strong>支持多版本。因为多版本支持是针对 API 级别，而不是特定的资源或者资源的字段。一般来说，我们根据 API 分组、资源类型、namespace 以及 name 来区分不同的资源对象，对于同一个资源对象的不同版本，API-Server 负责不同版本之间的无损切换，这点对于客户端来说是完全透明的。事实上，不同版本的同类型的资源在持久化层的数据可能是相同的。<em>例如，对于同一种资源类型支持 <code v-pre>v1</code> 和 <code v-pre>v1beta1</code> 两个 API 版本，以 <code v-pre>v1beta1</code> 版本创建该资源的对象，后续可以以<code v-pre>v1</code> 或者 <code v-pre>v1beta1</code> 来更新或者删除该资源对象。</em></p>
<p>API 多版本支持一般通过将资源分组置于不同的版本中来实现，例如，<code v-pre>batch</code> 同时存在 <code v-pre>v2alph1</code> 与 <code v-pre>v1</code> 版本。一般来说，新的资源分组先出现 <code v-pre>v1alpha1</code> 版本，随着稳定性的提高被推进到 <code v-pre>v1beta1</code> ，最后从 <code v-pre>v1</code> 版本毕业。</p>
<p>随着新的用户场景出现，kubernetes API 需要不断变化，可能是新增一个字段，也可能是删除旧的字段，甚至是改变资源的展现形式。为了保证兼容性，kubernetes 制定了一系列的策略。总的来说，对于已经 GA 的 API，API，kubernetes 严格维护其兼容性，终端用户可以放心食用，beta 版本的 API 则尽量维护，保证不打破版本跨版本之间的交互，而对于 alpha 版本的 API 则很难保证兼容性，不太推荐生产环境使用。</p>
<h3 id="gvk-与-gvr-映射" tabindex="-1"><a class="header-anchor" href="#gvk-与-gvr-映射" aria-hidden="true">#</a> GVK 与 GVR 映射</h3>
<p>在 kubernetes API 宇宙中，我们经常使用属于 GVK 或者 GVR 来区分特定的 kubernetes 资源。其中 GVK 是 Group Version Kind 的简称，而 GVR 则是 Group Version Resource 的简称。</p>
<p>通过上面对于 kubernetes API 分组和多版本的介绍中我们已经了解了 Group 与 Version，那么 Kind 与 Resource 又分别是指什么呢？</p>
<p><strong>Kind</strong> 是 API “顶级”资源对象的类型，每个资源对象都需要 Kind 来区分它自身代表的资源类型，例如，对于一个 pod 的例子：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>pod
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> exp
<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 kind 字段即代表该资源对象的类型。一般来说，在 kubernetes API 中有三种不同的 Kind：</p>
<ol>
<li>单个资源对象的类型，最典型的就是刚才例子中提到的 Pod</li>
<li>资源对象的列表类型，例如 PodList 以及 NodeList 等</li>
<li>特殊类型以及非持久化操作的类型，很多这种类型的资源是 subresource， 例如用于绑定资源的 <code v-pre>/binding</code>、更新资源状态的 <code v-pre>/status</code> 以及读写资源实例数量的 <code v-pre>/scale</code></li>
</ol>
<p>需要注意的是，同 Kind 不止可以出现在同一分组的不同版本中，如 <code v-pre>apps/v1beta1</code> 与 <code v-pre>apps/v1</code>，它还可能出现在不同的分组中，例如 Deployment 开始以 alpha 的特性出现在 <code v-pre>extensions</code> 分组，GA 之后被推进到 <code v-pre>apps</code> 组，所以为了严格区分不同的 Kind，需要组合 API Group、API Version 与 Kind 成为 <strong>GVK</strong>。</p>
<p><strong>Resource</strong> 则是通过 HTTP 协议以 JSON 格式发送或者读取的资源展现形式，可以以单个资源对象展现，例如 <code v-pre>.../namespaces/default</code>，也可以以列表的形式展现，例如 <code v-pre>.../jobs</code>。要正确的请求资源对象，API-Server 必须知道 <code v-pre>apiVersion</code> 与请求的资源，这样 API-Server 才能正确地解码请求信息，这些信息正是处于请求的资源路径中。一般来说，把 API Group、API Version 以及 Resource 组合成为 GVR 可以区分特定的资源请求路径，例如 <code v-pre>/apis/batch/v1/jobs</code> 就是请求所有的 jobs 信息。</p>
<p>GVR 常用于组合成 RESTful API 请求路径。例如，针对应用程序 v1 部署的 RESTful API 请求如下所示：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>GET <span class="token operator">/</span>apis<span class="token operator">/</span>apps<span class="token operator">/</span>v1<span class="token operator">/</span>namespaces<span class="token operator">/</span><span class="token punctuation">{</span>namespace<span class="token punctuation">}</span><span class="token operator">/</span>deployments<span class="token operator">/</span><span class="token punctuation">{</span>name<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过获取资源的 JSON 或 YAML 格式的序列化对象，进而从资源的类型信息中可以获得该资源的 GVK；相反，通过 GVK 信息则可以获取要读取的资源对象的 GVR，进而构建 RESTful API 请求获取对应的资源。这种 GVK 与 GVR 的映射叫做 RESTMapper。Kubernetes 定义了 RESTMapper 接口[9]并带默认带有实现 DefaultRESTMapper。</p>
<h2 id="api-server-在-cobra-的实现" tabindex="-1"><a class="header-anchor" href="#api-server-在-cobra-的实现" aria-hidden="true">#</a> API Server 在 cobra 的实现</h2>
<p><code v-pre>API Server</code>：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	command <span class="token operator">:=</span> app<span class="token punctuation">.</span><span class="token function">NewAPIServerCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	
	code <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span>	<span class="token comment">//跑 command</span>
	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span>	<span class="token comment">//一直跑，除非调用 code </span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>很简洁的主程序~</p>
</blockquote>
<h2 id="server-chain" tabindex="-1"><a class="header-anchor" href="#server-chain" aria-hidden="true">#</a> server chain</h2>
<p><strong>构建过程 从右向左； 请求流向 从左向右：</strong></p>
<h2 id="master-中转载-api" tabindex="-1"><a class="header-anchor" href="#master-中转载-api" aria-hidden="true">#</a> Master 中转载 API</h2>
<p>API Server 的内容 是 API Object</p>
<p>通过 Restful 服务对外提供操作 API Object 的能力。</p>
<h2 id="详解-scheme-机制" tabindex="-1"><a class="header-anchor" href="#详解-scheme-机制" aria-hidden="true">#</a> 详解 Scheme 机制</h2>
<div class="custom-container warning"><p class="custom-container-title">定义</p>
<p>Scheme 是一个接口体，内含处理外部 Version 之间的转换， <strong>GVK 和 Go Type之间的转换之用的数据和方法。</strong></p>
<blockquote>
<p>Scheme 内部有两张 map，分别对应到 gvk 到 type （ <code v-pre>gvkToTypeype</code> ）和 type 到 gvk（ <code v-pre>typeToGVK</code> ）；</p>
<p>使得两者可以相互找到。</p>
</blockquote>
<ul>
<li>内部和外部版本转换。</li>
</ul>
<p>或许你可以立即为 Windows 上的注册表，存储当前 API Server 所知道的所有 api 服务。</p>
</div>
<p>如果说<code v-pre>RESTMapper</code>管理的是<code v-pre>GVR</code>和<code v-pre>GVK</code>的关系，那么Scheme管理的就是<code v-pre>GVK</code>和<code v-pre>Type</code>的关系。系统中所有的<code v-pre>Type</code>都要注册到<code v-pre>Scheme</code>中，当然目前系统只有一个<code v-pre>Scheme</code>，即 <code v-pre>api.Scheme</code>，</p>
<p>定义在<code v-pre>/pkg/api/register.go</code>中：</p>
<p>Scheme 定义了资源序列化和反序列化的方法以及资源类型和版本的对应关系；这里我们可以理解成一张纪录表。定义在 <a href="https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apimachinery/pkg/runtime/scheme.go" target="_blank" rel="noopener noreferrer">k8s.io/apimachinery/pkg/runtime/scheme.go<ExternalLinkIcon/></a> 中。需要关注的 <code v-pre>gvkToTypeype</code> 和 <code v-pre>typeToGVK</code> 字段</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Schemes are not expected to change at runtime and are only threadsafe after</span>
<span class="token comment">// registration is complete.</span>
<span class="token keyword">type</span> Scheme <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// gvkToType allows one to figure out the go type of an object with</span>
	<span class="token comment">// the given version and name.</span>
	gvkToType <span class="token keyword">map</span><span class="token punctuation">[</span>schema<span class="token punctuation">.</span>GroupVersionKind<span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Type

	<span class="token comment">// typeToGVK allows one to find metadata for a given go object.</span>
	<span class="token comment">// The reflect.Type we index by should *not* be a pointer.</span>
	typeToGVK <span class="token keyword">map</span><span class="token punctuation">[</span>reflect<span class="token punctuation">.</span>Type<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span>schema<span class="token punctuation">.</span>GroupVersionKind

	<span class="token comment">// unversionedTypes are transformed without conversion in ConvertToVersion.</span>
	unversionedTypes <span class="token keyword">map</span><span class="token punctuation">[</span>reflect<span class="token punctuation">.</span>Type<span class="token punctuation">]</span>schema<span class="token punctuation">.</span>GroupVersionKind

	<span class="token comment">// unversionedKinds are the names of kinds that can be created in the context of any group</span>
	<span class="token comment">// or version</span>
	<span class="token comment">// TODO: resolve the status of unversioned types.</span>
	unversionedKinds <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Type

	<span class="token comment">// Map from version and resource to the corresponding func to convert</span>
	<span class="token comment">// resource field labels in that version to internal version.</span>
	fieldLabelConversionFuncs <span class="token keyword">map</span><span class="token punctuation">[</span>schema<span class="token punctuation">.</span>GroupVersionKind<span class="token punctuation">]</span>FieldLabelConversionFunc

	<span class="token comment">// defaulterFuncs is a map to funcs to be called with an object to provide defaulting</span>
	<span class="token comment">// the provided object must be a pointer.</span>
	defaulterFuncs <span class="token keyword">map</span><span class="token punctuation">[</span>reflect<span class="token punctuation">.</span>Type<span class="token punctuation">]</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// converter stores all registered conversion functions. It also has</span>
	<span class="token comment">// default converting behavior.</span>
	converter <span class="token operator">*</span>conversion<span class="token punctuation">.</span>Converter

	<span class="token comment">// versionPriority is a map of groups to ordered lists of versions for those groups indicating the</span>
	<span class="token comment">// default priorities of these versions as registered in the scheme</span>
	versionPriority <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>

	<span class="token comment">// observedVersions keeps track of the order we've seen versions during type registration</span>
	observedVersions <span class="token punctuation">[</span><span class="token punctuation">]</span>schema<span class="token punctuation">.</span>GroupVersion

	<span class="token comment">// schemeName is the name of this scheme.  If you don't specify a name, the stack of the NewScheme caller will be used.</span>
	<span class="token comment">// This is useful for error reporting to indicate the origin of the scheme.</span>
	schemeName <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和 API Server 通信的时候能够处理新的 <code v-pre>types</code> 类型就需要知道有新的 <code v-pre>types</code> 类型，<code v-pre>AddToScheme</code> 会利用到反射，新定义的 <code v-pre>types</code> 类型的结构体的命名必须和自定义的 <code v-pre>Kind</code> 的命名一致，否则找不到对应的<code v-pre>kind</code>。</p>
<h2 id="converter-和-defaulter-代码生成" tabindex="-1"><a class="header-anchor" href="#converter-和-defaulter-代码生成" aria-hidden="true">#</a> converter 和 defaulter 代码生成</h2>
<p>目录：pkg/apis/</p>
<ul>
<li>注册：register.go</li>
</ul>
<h3 id="为什么需要代码生成" tabindex="-1"><a class="header-anchor" href="#为什么需要代码生成" aria-hidden="true">#</a> 为什么需要代码生成？</h3>
<ol>
<li>Go语言没有继承机制，所以代码的冗余必然发生。</li>
<li>External Version 和 Internal Version 的转换</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>version 会越来越多，每一个 version 出现都需要进行转换，如果都需要手写太累了。</p>
<p>我们也没办法通过继承，通过父类写方法，然后子类继承它。</p>
</div>
<h2 id="version" tabindex="-1"><a class="header-anchor" href="#version" aria-hidden="true">#</a> Version</h2>
<p>每一个 API Group 都会有很多 version，每一个 version 包含很多个 kind （一个 KInd会出现在多个 version 下）</p>
<p>这些 Version 又称为 External Version ，它们面向 API Server 外部，Internal Version 是 API Server 在内部程序中处理数据时 API Object 的实际类型。</p>
<h2 id="gvk" tabindex="-1"><a class="header-anchor" href="#gvk" aria-hidden="true">#</a> GVK</h2>
<p>Group，Version，Kind 。这三元组确定了一个 Kind，当然并不是缺一不可。GVK 理解为一个字符串，是三者拼接的结果。</p>
<h2 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> Type</h2>
<p>代码中常见 &quot;TYPE&quot; 。</p>
<h2 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h2>
<ul>
<li><a href="https://blog.csdn.net/alex_yangchuansheng/article/details/114254004" target="_blank" rel="noopener noreferrer">初识 Kubernetes 组织结构<ExternalLinkIcon/></a></li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '33.md' style='float:left'>⬆️上一节🔗  </a><a href = '35.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


