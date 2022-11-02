<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第18节kubernetes-api-访问控制" tabindex="-1"><a class="header-anchor" href="#第18节kubernetes-api-访问控制" aria-hidden="true">#</a> 第18节kubernetes API 访问控制</h1>
<div><a href = '17.md' style='float:left'>⬆️上一节🔗  </a><a href = '19.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念" aria-hidden="true">#</a> 基本概念</h2>
<div class="custom-container tip"><p class="custom-container-title">基本概念</p>
<ul>
<li>
<p><code v-pre>CRD</code> (Custom Resource Definition)：自定义资源定义，用于定义自定义资源，允许用户在不更改API服务器的情况下定义新的资源类型。</p>
</li>
<li>
<p><code v-pre>CR</code> (Custom Resource)：自定义资源，是一种Kubernetes原生资源，用CRD定义后，Kubernetes集群便识别该种资源。</p>
</li>
<li>
<p><code v-pre>CRD Controller</code>：自定义资源控制器，用于实现CRD的自动化管理，例如自动备份、自动恢复等。</p>
</li>
<li>
<p><code v-pre>webhook</code>：一种HTTP回调，当特定事件发生时，由Kubernetes集群调用指定的URL。webhook可用于实现自定义资源的自动化管理。</p>
</li>
<li>
<p><code v-pre>工作队列</code> (work queue)：一种消息队列，用于存储待处理的事件。工作队列中的事件由控制器处理，确保集群状态与预期状态一致。</p>
</li>
<li>
<p><code v-pre>Informer</code>：一种机制，用于监听Kubernetes集群中资源对象的变化，当资源对象发生变化时，触发相应的事件。</p>
</li>
<li>
<p><code v-pre>Lister</code>：一种机制，用于缓存Kubernetes集群中的资源对象，加快资源对象的查询速度。</p>
</li>
<li>
<p><code v-pre>controller</code>：控制器，用于实现自动化管理，例如自动备份、自动恢复等。监测资源对象的变化，当资源对象发生变化时，触发相应的事件。</p>
</li>
<li>
<p><code v-pre>Operator</code>：操作员，是一种Kubernetes应用，用于实现自动化管理，例如自动备份、自动恢复等。监测资源对象的变化，当资源对象发生变化时，触发相应的事件。</p>
<blockquote>
<p>从实现上来说，<code v-pre>operator = CRD + webhook + controller</code></p>
</blockquote>
</li>
</ul>
</div>
<h2 id="kubernetes-扩展" tabindex="-1"><a class="header-anchor" href="#kubernetes-扩展" aria-hidden="true">#</a> kubernetes 扩展</h2>
<div class="custom-container tip"><p class="custom-container-title">扩展</p>
<p>Kubernetes 是一个可移植的、可扩展的开源平台，用于管理容器化的工作负载和服务，可促进声明式配置和自动化。 Kubernetes 拥有一个庞大且快速增长的生态系统。Kubernetes 的服务、支持和工具广泛可用。</p>
<p>虽然现在 Kubernetes 已经是容器编排的事实标准，其本身的功能也非常丰富并且灵活，但是也不能满足所有人的需求，在遇到 Kubernetes 提供的能力无法满足我们需求的时候，我们就可以利用其强大的扩展能力进行定制。</p>
</div>
<p>在sealos上就显而易见了，<a href="https://github.com/labring/sealos/tree/main/controllers" target="_blank" rel="noopener noreferrer">controllers<ExternalLinkIcon/></a> 控制器中实现了大量的扩展，从而达到满足我们的需求。</p>
<p><img src="http://sm.nsddd.top/smimage-20221102144550488.png" alt="image-20221102144550488"></p>
<h3 id="_1-kubectl" tabindex="-1"><a class="header-anchor" href="#_1-kubectl" aria-hidden="true">#</a> 1. kubectl</h3>
<p>kubectl 是我们平时和 Kubernetes 交互使用的最多的客户端工具，常见的运维操作都会通过 kubectl 来完成，kubectl 为我们提供了插件机制来方便扩展。</p>
<p>kubectl 插件其实就是以<code v-pre>kubectl-</code>为前缀的任意可执行文件 ，执行 kubectl 插件的时候可以通过 <code v-pre>kubectl 插件名 参数</code> 的方式运行插件。</p>
<p>就像 <code v-pre>Ubuntu</code> 使用 <code v-pre>apt</code> 管理软件，<code v-pre>mac</code> 可以使用 <code v-pre>brew</code> 一样，<code v-pre>kubectl</code> 也有类似的插件管理工具 <code v-pre>krew</code>，同时我们可以从 <a href="https://krew.sigs.kubernetes.io/plugins/" target="_blank" rel="noopener noreferrer">https://krew.sigs.Kubernetes.io/plugins/<ExternalLinkIcon/></a> 查找是否已经存在我们需要的插件</p>
<h3 id="_2-apiserver" tabindex="-1"><a class="header-anchor" href="#_2-apiserver" aria-hidden="true">#</a> 2. APIServer</h3>
<h4 id="聚合层" tabindex="-1"><a class="header-anchor" href="#聚合层" aria-hidden="true">#</a> 聚合层</h4>
<p>从 Kubernetes v1.7 版本之后 APIServer 引入了聚合层的功能，这个功能可以让每个开发者都能够实现聚合 API 服务暴露它们需要的接口，这个过程不需要重新编译 Kubernetes 的任何代码。</p>
<p>如果我们将下面这个资源提交给 Kubernetes 之后，用户在访问 API 服务器的 <code v-pre>/apis/metrics.Kubernetes.io/v1beta1</code> 路径时，会被转发到集群中的 <code v-pre>metrics-server.kube-system.svc</code> 服务上</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiregistration.Kubernetes.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> APIService
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> v1beta1.metrics.Kubernetes.io
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
  <span class="token key atrule">group</span><span class="token punctuation">:</span> metrics.Kubernetes.io
  <span class="token key atrule">version</span><span class="token punctuation">:</span> v1beta1
  <span class="token key atrule">insecureSkipTLSVerify</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">groupPriorityMinimum</span><span class="token punctuation">:</span> <span class="token number">100</span>
  <span class="token key atrule">versionPriority</span><span class="token punctuation">:</span> <span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="准入控制" tabindex="-1"><a class="header-anchor" href="#准入控制" aria-hidden="true">#</a> 准入控制</h4>
<p>除此之外无论是从 kubectl 还是 client-go 等其他客户端发起的请求都会发送到 APIServer 经过 认证 -&gt; 鉴权 -&gt; 准入控制 的步骤，这其中的每一步我们都可以对其进行扩展，而这其中用的最多的就是准入控制的扩展，这一块后续会一篇文章详细讲到。</p>
<p>准入控制当中又会先经过，变更准入控制 MutatingAdmissionWebhook，然后再经过验证准入控制 ValidatingAdmissionWebhook，任何一个准入控制器返回了错误这个请求都会失败，例如这两个准入控制器我们可以做很多事情，例如注入 sidecar，验证资源，调整 pod 的配额等等。</p>
<h3 id="_3-kubernetes-资源" tabindex="-1"><a class="header-anchor" href="#_3-kubernetes-资源" aria-hidden="true">#</a> 3. Kubernetes 资源</h3>
<p>我们常用的 Deployment、Pod、Node 等都是 Kubernetes 官方提供的内置资源，但是有的时候内置的资源无法满足我们的需求的时候，就可以使用 CustomResource 也就是自定义资源。自定义资源常常会和 Controller 一起配合使用，不过需要注意的是使用自定义资源的时候需要思考一下如果只是一些配置可能 ConfigMap 会更加适合，不要滥用这个特性。</p>
<h3 id="_4-controller-控制器" tabindex="-1"><a class="header-anchor" href="#_4-controller-控制器" aria-hidden="true">#</a> 4. Controller 控制器</h3>
<p>Kubernetes 中资源的状态的维护都是 Controller 来实现的，Controller 会不断的尝试将一个资源调整为我们描述的状态，这其实也就是我们常说的声明式 api，声明式 api 背后具体的活都是 Controller 干的。Controller 一般会配合着 CRD 一起使用。</p>
<h3 id="_5-schedule-调度器" tabindex="-1"><a class="header-anchor" href="#_5-schedule-调度器" aria-hidden="true">#</a> 5. Schedule 调度器</h3>
<p>调度器是一种特殊的控制器，负责监视 Pod 变化并将 Pod 分派给节点，调度器可以被直接替换掉或者是使用多个调度器，除此之外官方默认的调度器也支持 WebHook。[<a href="https://lailin.xyz/post/operator-01-overview.html#fn:5" target="_blank" rel="noopener noreferrer">5]<ExternalLinkIcon/></a></p>
<h3 id="_6-cni-网络插件" tabindex="-1"><a class="header-anchor" href="#_6-cni-网络插件" aria-hidden="true">#</a> 6. CNI 网络插件</h3>
<p>CNI 网络插件，全称 Container Network Interface（容器网络接口）包含一组用于开发插件去配置 Linux 容器中网卡的接口和框架。一般我们不会去对网络插件做定制开发，而是采用开源的组件，例如 Flannel、Cilium，如果使用云服务的 Kubernetes 还会遇到一些定制的网络插件， 例如阿里云有 Terway。</p>
<h3 id="_7-csi-存储插件" tabindex="-1"><a class="header-anchor" href="#_7-csi-存储插件" aria-hidden="true">#</a> 7. CSI 存储插件</h3>
<p>CSI 存储插件，全称 Container Storage Interface，可以通过 CSI 接口支持不同的存储类型</p>
<h3 id="_8-cri-容器运行时" tabindex="-1"><a class="header-anchor" href="#_8-cri-容器运行时" aria-hidden="true">#</a> 8. CRI 容器运行时</h3>
<p>CRI 容器运行时，全称 Container Runtime Interface，是一组用于管理容器运行时和镜像的 gRPC 接口，利用这个接口可以支持 docker、containerd 等不同的容器运行时</p>
<h2 id="operator" tabindex="-1"><a class="header-anchor" href="#operator" aria-hidden="true">#</a> Operator</h2>
<p>Kubernetes 是一个高度可扩展的系统，虽然它的扩展点这么多，但是一般来说我们接触的比较多的还是 自定义资源，控制器，准入控制，有些还会对 kubectl 和 调度器做一些扩展，其他的大部分使用成熟的开源组件就可以了。而我们这个系列关注的 Operator 就会涉及到 自定义资源，控制器和准入控制。</p>
<p>Operator 遵循 Kubernetes 的理念，它利用自定义资源管理应用及其组件， Operator 模式会封装你编写的任务自动化代码。</p>
<p>Operator 常见使用范围包括：</p>
<ul>
<li>按需部署应用</li>
<li>获取/还原应用状态的备份</li>
<li>处理应用代码的升级以及相关改动。例如，数据库 schema 或额外的配置设置</li>
<li>发布一个 service，要求不支持 Kubernetes API 的应用也能发现它</li>
<li>模拟整个或部分集群中的故障以测试其稳定性</li>
<li>在没有内部成员选举程序的情况下，为分布式应用选择首领角色</li>
</ul>
<p>从 Operator 理念的提出到现在已经有了很多工具可以帮助我们快速低成本的开发，其中最常用的就是 CoreOS 开源的 operator-sdk 和 k8s sig 小组维护的 kubebuilder，我们这个系列选用 kubebuilder。</p>
<p>除了我们自己开发之外还可以在 https://operatorhub.io/ 上找到别人开发的现成的 Operator 进行使用</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '17.md' style='float:left'>⬆️上一节🔗  </a><a href = '19.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


