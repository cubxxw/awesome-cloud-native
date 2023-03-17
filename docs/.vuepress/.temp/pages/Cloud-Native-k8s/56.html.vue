<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第56节-service" tabindex="-1"><a class="header-anchor" href="#第56节-service" aria-hidden="true">#</a> 第56节 service</h1>
<div><a href = '55.md' style='float:left'>⬆️上一节🔗  </a><a href = '57.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="service-对象" tabindex="-1"><a class="header-anchor" href="#service-对象" aria-hidden="true">#</a> Service 对象</h2>
<h3 id="service-selector" tabindex="-1"><a class="header-anchor" href="#service-selector" aria-hidden="true">#</a> Service Selector</h3>
<p><strong>Kubernetes 允许将 Pod 对象通过标签(Label)进行标记，并通过 Service Selector 定义基于 Pod 标签的过滤规则,以便选择服务的上游应用实例</strong></p>
<p><code v-pre>Service Selector</code> 对象是 Kubernetes 中的一个资源对象，用于定义服务的选择器。选择器是一组用于选择后端 Pod 的标签。当一个 Service 对象被创建时，可以指定相关联的 Selector 对象。这个 Selector 可以是一个简单的标签选择器，也可以是一个更复杂的表达式，如 <code v-pre>matchExpressions</code>。</p>
<p><code v-pre>Service Selector</code> 对象的定义可以在创建 Service 对象时直接指定，也可以使用 <code v-pre>kubectl label</code> 命令进行设置。例如，可以使用以下命令创建一个 Service Selector 对象：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl label pods <span class="token operator">&lt;</span>pod-name<span class="token operator">></span> <span class="token assign-left variable">app</span><span class="token operator">=</span>my-app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令会将 Pod 对象的标签设置为 <code v-pre>app=my-app</code>。然后，可以使用以下命令创建一个 Service 对象，并将其关联到这个 Pod：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl expose pod <span class="token operator">&lt;</span>pod-name<span class="token operator">></span> <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token operator">&lt;</span>port<span class="token operator">></span> --target-port<span class="token operator">=</span><span class="token operator">&lt;</span>target-port<span class="token operator">></span> <span class="token parameter variable">--selector</span><span class="token operator">=</span>app<span class="token operator">=</span>my-app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这个命令中，<code v-pre>--selector</code> 参数指定了一个标签选择器，用于选择与之关联的 Pod。在这个例子中，选择器是 <code v-pre>app=my-app</code>。</p>
<p>要查看 Service Selector 对象的详细信息，可以使用以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl describe <span class="token function">service</span> <span class="token operator">&lt;</span>service-name<span class="token operator">></span> <span class="token parameter variable">--namespace</span><span class="token operator">=</span><span class="token operator">&lt;</span>namespace<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>这个命令会显示与 Service 对象相关联的 Endpoint 和 Selector 对象。其中，Selector 对象列出了与 Service 相关联的 Pod 的标签选择器。</strong></p>
<h3 id="ports" tabindex="-1"><a class="header-anchor" href="#ports" aria-hidden="true">#</a> Ports</h3>
<p><strong>Ports 属性中定义了服务的端口、协议目标端口等信息</strong></p>
<p><code v-pre>Service</code> 对象是 Kubernetes 中的一个资源对象，用于定义一个服务。服务是一组 Pod 的抽象，这些 <code v-pre>Pod</code> 可以被其他容器或外部用户访问。<code v-pre>Service</code> 对象可以定义一个稳定的 DNS 名称和 IP 地址，以及一个负载均衡器，用于将请求分发给后端 Pod。</p>
<p><code v-pre>Service</code> 对象中的 <code v-pre>Ports</code> 对象用于定义服务的端口信息。一个 <code v-pre>Service</code> 对象可以包含多个 <code v-pre>Ports</code> 对象，每个 <code v-pre>Ports</code> 对象定义了一个服务端口和其对应的目标端口。例如，下面的 <code v-pre>Service</code> 对象定义了两个端口：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>service
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>app
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> https
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8443</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的 <code v-pre>Service</code> 对象定义了两个端口：<code v-pre>http</code> 和 <code v-pre>https</code>。<code v-pre>http</code> 端口映射到后端 Pod 的 <code v-pre>8080</code> 端口，<code v-pre>https</code> 端口映射到后端 Pod 的 <code v-pre>8443</code> 端口。</p>
<p>要创建一个 <code v-pre>Service</code> 对象，可以使用以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl expose deployment <span class="token operator">&lt;</span>deployment-name<span class="token operator">></span> <span class="token parameter variable">--type</span><span class="token operator">=</span>ClusterIP <span class="token parameter variable">--name</span><span class="token operator">=</span><span class="token operator">&lt;</span>service-name<span class="token operator">></span> <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token operator">&lt;</span>port<span class="token operator">></span> --target-port<span class="token operator">=</span><span class="token operator">&lt;</span>target-port<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，<code v-pre>&lt;deployment-name&gt;</code> 为部署的名称，<code v-pre>&lt;service-name&gt;</code> 为服务的名称，<code v-pre>&lt;port&gt;</code> 为服务的端口，<code v-pre>&lt;target-port&gt;</code> 为后端 Pod 的端口。</p>
<p>要查看 <code v-pre>Service</code> 和 <code v-pre>Ports</code> 对象的详细信息，可以使用以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl describe <span class="token function">service</span> <span class="token operator">&lt;</span>service-name<span class="token operator">></span> <span class="token parameter variable">--namespace</span><span class="token operator">=</span><span class="token operator">&lt;</span>namespace<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令会显示与 <code v-pre>Service</code> 对象相关联的 <code v-pre>Ports</code> 对象和 <code v-pre>Endpoint</code> 对象。其中，<code v-pre>Ports</code> 对象列出了服务的端口信息，<code v-pre>Endpoint</code> 对象列出了与服务相关联的后端 Pod 的网络地址和端口信息。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token comment">#如果设置了PublishNotReadyAdddress为 true,则无论Pod是否就绪都会被加入endpoint readyAddress list 中</span>
  <span class="token comment">#publishNotReadyAddresses: true</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="endpoint-对象" tabindex="-1"><a class="header-anchor" href="#endpoint-对象" aria-hidden="true">#</a> Endpoint 对象</h3>
<p><code v-pre>Endpoint</code> 对象是 Kubernetes 中的一个资源对象，用于存储一个服务的网络地址和端口信息。这个对象可以通过 <code v-pre>kubectl</code> 命令行工具或 Kubernetes API 进行创建和管理。</p>
<p><strong><code v-pre>Endpoint</code> 对象可以与 <code v-pre>Service</code> 对象关联，表示服务的后端地址和端口信息。</strong><code v-pre>Endpoint</code> 对象中的地址和端口信息可以手动配置，也可以通过 <code v-pre>EndpointSlices</code> 对象自动管理。</p>
<p>在创建 <code v-pre>Service</code> 对象时，Kubernetes 会自动创建相应的 <code v-pre>Endpoint</code> 对象，并将其与 <code v-pre>Service</code> 对象关联。如果需要手动配置 <code v-pre>Endpoint</code> 对象，可以使用以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create endpoint <span class="token operator">&lt;</span>endpoint-name<span class="token operator">></span> <span class="token parameter variable">--namespace</span><span class="token operator">=</span><span class="token operator">&lt;</span>namespace<span class="token operator">></span> <span class="token parameter variable">--addresses</span><span class="token operator">=</span><span class="token operator">&lt;</span>ip<span class="token operator"><span class="token file-descriptor important">1</span>></span>,<span class="token operator">&lt;</span>ip<span class="token operator"><span class="token file-descriptor important">2</span>></span>,<span class="token punctuation">..</span>. <span class="token parameter variable">--ports</span><span class="token operator">=</span><span class="token operator">&lt;</span>port<span class="token operator"><span class="token file-descriptor important">1</span>></span>,<span class="token operator">&lt;</span>port<span class="token operator"><span class="token file-descriptor important">2</span>></span>,<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，<code v-pre>&lt;endpoint-name&gt;</code> 为 <code v-pre>Endpoint</code> 对象的名称，<code v-pre>&lt;namespace&gt;</code> 为命名空间名称，<code v-pre>&lt;ip1&gt;,&lt;ip2&gt;,...</code> 为后端服务的 IP 地址，<code v-pre>&lt;port1&gt;,&lt;port2&gt;,...</code> 为后端服务的端口号。</p>
<p>要查看 <code v-pre>Endpoint</code> 对象的详细信息，可以使用以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl describe endpoints <span class="token operator">&lt;</span>endpoint-name<span class="token operator">></span> <span class="token parameter variable">--namespace</span><span class="token operator">=</span><span class="token operator">&lt;</span>namespace<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当 Service 的 selector 不为空时，Kubernetes Endpoint Controller 会侦听服务创建事件，创建与 Service 同名的 Endpoint 对象</p>
<p>selector 能够选取的所有 <code v-pre>PodIP</code> 都会被配置到 <code v-pre>addresses</code> 属性中</p>
<ul>
<li>如果此时 selector 所对应的 filter 查询不到对应的 Pod,则 addresses 列表为空</li>
<li>默认配置下，如果此时对应的 Pod 为 not ready 状态，则对应的 PodIP 只会出现在 subsets 的<code v-pre>notReadyAddresses</code> 属性中，这意味着对应的 Pod 还没准备好提供服务，不能作为流量转发的目标。</li>
<li>如果设置了 <code v-pre>PublishNotReadyAdddress</code> 为 true,则无论 Pod 是否就绪都会被加入 readyAddress list 中</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Endpoints
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> service<span class="token punctuation">-</span>without<span class="token punctuation">-</span>selector
<span class="token key atrule">subsets</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">addresses</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">ip</span><span class="token punctuation">:</span> 220.181.38.148
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
        <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
        <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>如果 service 对象过多的话， Endpoint 对象不好管理，社区提出了 EndpointSlice 对象。</strong></p>
<h3 id="endpointslice-对象" tabindex="-1"><a class="header-anchor" href="#endpointslice-对象" aria-hidden="true">#</a> EndpointSlice 对象</h3>
<p>EndpointSlice 对象用于管理服务的端点。它们提供了一种比传统的 Endpoint 对象更可扩展和高效的管理端点信息的方式。在 Kubernetes 中，EndpointSlice 对象表示与服务关联的端点的子集。这个子集是由一组选择器定义的，这些选择器根据特定的标签或 IP 地址等标准过滤端点。这允许更细粒度地控制哪些端点包含在 EndpointSlice 中。</p>
<p>Endpoint slices 由 Kubernetes 自动创建和管理，因此无需手动创建它们。可以使用 kubectl 命令行工具或 Kubernetes API 查询 Endpoint slices，就像其他 Kubernetes 资源一样。Endpoint slices 被设计为比传统的 Endpoint 资源更可扩展，因为它们可以处理更多的端点而不影响性能。它们也更高效，因为它们只存储与服务相关的端点信息。</p>
<ul>
<li>当某个 Service 对应的 backend Pod 较多时,Endpoint 对象就会因保存的地址信息过多而变得异常庞大</li>
<li>Pod 状态的变更会引起 Endpoint 的变更,Endpoint 的变更会被推送至所有节点，从而导致持续占用大量网络带宽</li>
<li>EndpointSlice 对象，用于对 Pod 较多的 Endpoint 进行切片,切片大小可以自定义</li>
</ul>
<h3 id="不定义-selector-的-service" tabindex="-1"><a class="header-anchor" href="#不定义-selector-的-service" aria-hidden="true">#</a> 不定义 selector 的 service</h3>
<blockquote>
<p>Service 可以定义 selector，也可以不定义 selector。这个命令会显示与 <code v-pre>Service</code> 对象相关联的 <code v-pre>Ports</code> 对象和 <code v-pre>Endpoint</code> 对象。在 headless 服务中，Endpoint 对象列出了与之关联的 Pod 的网络地址和端口信息，而不是 IP 地址。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>headless<span class="token punctuation">-</span>service
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">clusterIP</span><span class="token punctuation">:</span> None
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> https
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">443</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8443</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个 Service 对象中，clusterIP 属性被设置为 None，表示这个服务没有任何 IP 地址。然后，可以使用这个服务的 DNS 名称来访问与之关联的 Pod。</p>
</blockquote>
<p>用户创建了 <code v-pre>Service</code> 但不定义 <code v-pre>Selector</code></p>
<ul>
<li>Endpoint Controller 不会为该 <code v-pre>Service</code> 自动创建 <code v-pre>Endpoint</code></li>
<li>用户可以手动创建 Endpoint 对象，并设置任意 IP 地址到 <code v-pre>Address</code> 属性</li>
<li>访问该服务的请求会被转发至目标地址</li>
</ul>
<p>通过该类型服务，可以为集群外的一组 Endpoint 创建服务</p>
<h3 id="service-endpoint-pod-的关系" tabindex="-1"><a class="header-anchor" href="#service-endpoint-pod-的关系" aria-hidden="true">#</a> Service Endpoint Pod 的关系</h3>
<p><img src="http://sm.nsddd.top/sm202303101152976.png" alt="img"></p>
<p><strong>📜 对上面的解释：</strong></p>
<blockquote>
<p>可以看到 Endpoint 链接了 Service  和 Pod</p>
</blockquote>
<p><code v-pre>Service</code>、<code v-pre>Endpoint</code> 和 <code v-pre>Pod</code> 是 Kubernetes 中三个重要的概念。<code v-pre>Service</code> 定义了一个服务，可以将请求负载均衡到多个 <code v-pre>Pod</code> 上。<code v-pre>Endpoint</code> 定义了 <code v-pre>Service</code> 的后端 <code v-pre>Pod</code> 的地址和端口信息。<code v-pre>Pod</code> 是 Kubernetes 中最基本的部署单元，是一个或多个容器的集合。在 Kubernetes 中，<code v-pre>Service</code> 和 <code v-pre>Endpoint</code> 对象通常是通过 <code v-pre>Pod</code> 对象来定义的。<code v-pre>Service</code> 和 <code v-pre>Endpoint</code> 对象是通过 <code v-pre>selector</code> 属性与 <code v-pre>Pod</code> 对象关联的，<code v-pre>selector</code> 属性定义了一组标签，这些标签用于选择与 <code v-pre>Service</code> 和 <code v-pre>Endpoint</code> 相关联的 <code v-pre>Pod</code>。</p>
<p>一个 <code v-pre>Service</code> 对象可以与多个 <code v-pre>Endpoint</code> 对象关联，每个 <code v-pre>Endpoint</code> 对象定义了一个后端 <code v-pre>Pod</code> 的地址和端口信息。当一个 <code v-pre>Service</code> 对象收到请求时，它会将请求负载均衡到与之关联的 <code v-pre>Endpoint</code> 对象上。<code v-pre>Endpoint</code> 对象中的地址和端口信息可以手动配置，也可以由 Kubernetes 自动管理。</p>
<p><code v-pre>Service</code>、<code v-pre>Endpoint</code> 和 <code v-pre>Pod</code> 之间的关系如下：</p>
<ul>
<li><code v-pre>Service</code> 对象定义了一个服务，包括服务的 IP 地址和端口信息。</li>
<li><code v-pre>Endpoint</code> 对象定义了一个服务的后端 <code v-pre>Pod</code> 的地址和端口信息。</li>
<li><code v-pre>Pod</code> 对象是 Kubernetes 中最基本的部署单元，是一个或多个容器的集合。</li>
<li><code v-pre>Service</code> 和 <code v-pre>Endpoint</code> 对象通常是通过 <code v-pre>selector</code> 属性与 <code v-pre>Pod</code> 对象关联的，<code v-pre>selector</code> 属性定义了一组标签，这些标签用于选择与 <code v-pre>Service</code> 和 <code v-pre>Endpoint</code> 相关联的 <code v-pre>Pod</code>。</li>
<li>当一个 <code v-pre>Service</code> 对象收到请求时，它会将请求负载均衡到与之关联的 <code v-pre>Endpoint</code> 对象上。</li>
<li><code v-pre>Endpoint</code> 对象中的地址和端口信息可以手动配置，也可以由 Kubernetes 自动管理。</li>
</ul>
<h3 id="service-的类型" tabindex="-1"><a class="header-anchor" href="#service-的类型" aria-hidden="true">#</a> Service 的类型</h3>
<table>
<thead>
<tr>
<th>类型</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>ClusterIP</td>
<td>在集群内部的 IP 地址上暴露服务。这个地址只能在集群内部访问。</td>
</tr>
<tr>
<td>NodePort</td>
<td>在每个节点的 IP 地址上暴露服务。这个地址可以从集群外部访问。</td>
</tr>
<tr>
<td>LoadBalancer</td>
<td>在外部负载均衡器的 IP 地址上暴露服务。这个地址可以从集群外部访问。</td>
</tr>
<tr>
<td>ExternalName</td>
<td>通过 CNAME 记录暴露服务。这个地址可以从集群内部和外部访问。</td>
</tr>
</tbody>
</table>
<ul>
<li>clusterIP
<ul>
<li>Service 的默认类型， 服务被发布至仅集群内部可见的虚拟 IP 地址上。</li>
<li>在 API Server 启动时，需要通过 <code v-pre>service-cluster-ip-range</code> 参数配置虚拟 IP 地址段，<code v-pre>API Server</code> 中有用于分配 IP 地址和端口的组件，当该组件捕获 Service 对象并创建事件时，会从配置的虚拟 IP 地址段中取一个有效的 IP 地址，分配给该 Service 对象。</li>
</ul>
</li>
<li>nodePort
<ul>
<li>在 API Server 启动时，需要通过 node-port-range 参数配置 nodePort 的范围， 同样的，API Server 组件会捕获 Service 对象并创建事件，即从配置好的 nodePort 范围取一个有效端口，分配给该 Service。</li>
<li>每个节点的 kube-proxy 会尝试在服务分配的 nodePort 上建立侦听器接收请求，并转发给服务对应的后端 Pod 实例。</li>
</ul>
</li>
<li>LoadBalancer
<ul>
<li>企业数据中心一 般会采购一些负载均衡器，作为外网请求进入数据中心内部的统一流量入口。</li>
<li>针对不同的基础架构云平台，Kubernertes Cloud Manager 提供支持不同供应商 API 的 Service Controller。如果需要在 Openstack 云平台上搭建 Kubernetes 集群，那么只需提供一份 openstack.rc, Openstack Service Controller 即可通过调用 LBaaS API 完成负载均衡配置。</li>
</ul>
</li>
<li>Headless Service
<ul>
<li>Headless 服务是用户将 clusterIP 显示定义为 None 的服务。</li>
<li>无头的服务意味着 Kubernetes 不会为该服务分配统一入口，包括 clusterIP， nodePort 等</li>
<li>ExternalName：为一个服务创建别名</li>
</ul>
</li>
</ul>
<p><strong>ExternalName demo：</strong></p>
<blockquote>
<p>访问该 service 的情况会被转发到指定域名。</p>
</blockquote>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>service
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> prod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ExternalName
  <span class="token key atrule">externalName</span><span class="token punctuation">:</span> tencent.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>包含关系：</strong></p>
<p>在 Kubernetes 中，<code v-pre>ClusterIP</code> 是一种服务类型，用于在集群内部的 IP 地址上暴露服务。这个地址只能在集群内部访问。<code v-pre>NodePort</code> 和 <code v-pre>LoadBalancer</code> 是 Kubernetes 中的另外两种服务类型，它们都可以在集群外部访问服务。<code v-pre>NodePort</code> 在每个节点的 IP 地址上暴露服务，而 <code v-pre>LoadBalancer</code> 在外部负载均衡器的 IP 地址上暴露服务。</p>
<p>因此，<code v-pre>ClusterIP</code> 是 <code v-pre>NodePort</code> 和 <code v-pre>LoadBalancer</code> 的子集。也就是说，如果你创建了一个 <code v-pre>ClusterIP</code> 服务，那么你可以通过 <code v-pre>NodePort</code> 或 <code v-pre>LoadBalancer</code> 访问这个服务。但是，如果你创建了一个 <code v-pre>NodePort</code> 或 <code v-pre>LoadBalancer</code> 服务，那么你不能通过 <code v-pre>ClusterIP</code> 访问这个服务，因为 <code v-pre>ClusterIP</code> 只在集群内部暴露服务。</p>
<h3 id="service-topology" tabindex="-1"><a class="header-anchor" href="#service-topology" aria-hidden="true">#</a> Service Topology</h3>
<p><code v-pre>Service Topology</code> 是 Kubernetes 中的一个资源对象，用于定义服务的拓扑结构。拓扑结构是一组用于选择后端 Pod 的拓扑域。当一个 Service 对象被创建时，可以指定相关联的 <code v-pre>Service Topology</code> 对象。这个 <code v-pre>Service Topology</code> 可以是一个简单的标签选择器，也可以是一个更复杂的表达式，如 <code v-pre>matchExpressions</code>。<code v-pre>Service Topology</code> 对象定义了服务的拓扑结构，可以实现更高效的负载均衡和故障转移。要使用 <code v-pre>Service Topology</code>，需要将 Kubernetes 版本升级到 <code v-pre>1.16</code> 或更高版本。</p>
<p>要创建一个 <code v-pre>Service Topology</code> 对象，可以使用以下命令：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>service
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>app
  <span class="token key atrule">topologyKeys</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">"kubernetes.io/hostname"</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个 <code v-pre>Service</code> 对象中，<code v-pre>topologyKeys</code> 属性被设置为 <code v-pre>kubernetes.io/hostname</code>，表示使用 <code v-pre>hostname</code> 作为拓扑域。然后，在 <code v-pre>Endpoint</code> 对象中，每个 <code v-pre>Pod</code> 的 <code v-pre>hostname</code> 属性会被用作拓扑域。</p>
<p>要查看 <code v-pre>Service Topology</code> 对象的详细信息，可以使用以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl describe <span class="token function">service</span> <span class="token operator">&lt;</span>service-name<span class="token operator">></span> <span class="token parameter variable">--namespace</span><span class="token operator">=</span><span class="token operator">&lt;</span>namespace<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令会显示与 <code v-pre>Service</code> 对象相关联的 <code v-pre>Service Topology</code> 对象和 <code v-pre>Endpoint</code> 对象。其中，<code v-pre>Service Topology</code> 对象列出了服务的拓扑信息。</p>
<p><strong>细节部分：</strong></p>
<ul>
<li>一个网络调用的延迟受客户端和服务器所处位置的影响，两者是否在同一节点、同一机架、同一可用区、同一数据中心，都会影响参与数据传输的设备数量</li>
<li>在分布式系统中，为保证系统的高可用,往往需要控制应用的错误域(Failure Domain)，比如通过反亲和性配置，将一个应用的多个副本部署在不同机架，甚至不同的数据中心</li>
<li>Kubernetes 提供通用标签来标记节点所处的物理位置，如：
<ul>
<li><code v-pre>topology.kubernetes.io/ zone: us-west2-a</code></li>
<li><code v-pre>failure-domain. beta.kubernetes.io/ region: us-west</code></li>
<li><code v-pre>failure-domain.tess.io/ network-device: us-west05-ra053</code></li>
<li><code v-pre>failure-domain.tess.io/rack: us_westO2_02-314_19_12</code></li>
<li><code v-pre>kubernetes.io/hostname: node-1</code></li>
</ul>
</li>
<li>Service 引入了 topologyKeys 属性，可以通过如下设置来控制流量
<ul>
<li>当 <code v-pre>topologyKeys</code> 设置为<code v-pre>[&quot;kubernetes.io/hostname&quot;]</code>时，调用服务的客户端所在节点上如 果有服务实例正在运行，则该实例处理请求，否则，调用失败。</li>
<li>当<code v-pre>topologyKeys</code>设置为<code v-pre>[&quot;kubernetes.io/hostname&quot; , &quot;topology.kubernetes.io/zone&quot;, &quot;topology. kubernetes.io/region&quot;]</code>时，若同一节点有对应的服务实例，则请求会优先转发至该实例。否则，顺序查找当前 zone 及当前 region 是否有服务实例,并将请求按顺序转发。</li>
<li>当 <code v-pre>topologyKeys</code> 设置为<code v-pre>[&quot;topology.kubernetes.io/ zone&quot;, &quot;*&quot;]</code> 时，请求会被优先转发至当前 zone 的服务实例。如果当前 zone 不存在服务实例，则请求会被转发至任意服务实例。</li>
</ul>
</li>
</ul>
<p><strong>该 Service 的访问只会转发到 client 所在 node 上的 Pod：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nodelocal
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">name</span><span class="token punctuation">:</span> http
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">topologyKeys</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">"kubernetes.io/hostname"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该 Service 的访问会按照优先级转发：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> prefer<span class="token punctuation">-</span>nodelocal
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">name</span><span class="token punctuation">:</span> http
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">topologyKeys</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">"kubernetes.io/hostname"</span>
    <span class="token punctuation">-</span> <span class="token string">"topology.kubernetes.io/zone"</span>
    <span class="token punctuation">-</span> <span class="token string">"topology.kubernetes.io/region"</span>
    <span class="token punctuation">-</span> <span class="token string">"*"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '55.md' style='float:left'>⬆️上一节🔗  </a><a href = '57.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


