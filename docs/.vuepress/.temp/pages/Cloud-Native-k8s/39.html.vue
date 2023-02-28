<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第-39-节-关于-kubernetes-的一些疑问-4" tabindex="-1"><a class="header-anchor" href="#第-39-节-关于-kubernetes-的一些疑问-4" aria-hidden="true">#</a> 第 39 节 关于 Kubernetes 的一些疑问 4</h1>
<div><a href = '38.md' style='float:left'>⬆️上一节🔗  </a><a href = '40.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="pod-api-字段" tabindex="-1"><a class="header-anchor" href="#pod-api-字段" aria-hidden="true">#</a> Pod API 字段</h2>
<p>Pod 是 Kubernetes 中最小的部署单位，它代表一个运行中的容器。Pod API 字段主要包括：</p>
<ul>
<li><code v-pre>apiVersion</code>：Pod API 的版本。</li>
<li><code v-pre>kind</code>：对象类型，这里是 Pod。</li>
<li><code v-pre>metadata</code>：元数据，包括名称、命名空间、标签等。</li>
<li><code v-pre>spec</code>：Pod 规范，描述了 Pod 应如何运行。</li>
<li><code v-pre>status</code>：Pod 状态，包括 IP 地址、容器状态等。</li>
</ul>
<p>下面是一个示例 Pod API 对象：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">codeapiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>pod
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>container
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo Hello Kubernetes! &amp;&amp; sleep 3600'</span><span class="token punctuation">]</span>
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">phase</span><span class="token punctuation">:</span> Running
  <span class="token key atrule">conditions</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> Ready
      <span class="token key atrule">status</span><span class="token punctuation">:</span> <span class="token string">"True"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kubernetes源码的哪个位置" tabindex="-1"><a class="header-anchor" href="#kubernetes源码的哪个位置" aria-hidden="true">#</a> Kubernetes源码的哪个位置</h2>
<p>在 Kubernetes 源码中，Pod 的定义位于 <code v-pre>pkg/api/v1/pod.go</code> 文件中，它是由一个名为 <code v-pre>Pod</code> 的结构体表示的。这个结构体定义了 Pod 的所有字段，包括 <code v-pre>apiVersion</code>、<code v-pre>kind</code>、<code v-pre>metadata</code> 和 <code v-pre>spec</code> 等。</p>
<p>下面是 <code v-pre>Pod</code> 结构体的定义：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>codetype Pod <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        <span class="token comment">// Standard object's metadata.</span>
        <span class="token comment">// More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata</span>
        <span class="token comment">// +optional</span>
        metav1<span class="token punctuation">.</span>ObjectMeta <span class="token string">`json:"metadata,omitempty" protobuf:"bytes,1,opt,name=metadata"`</span>

        <span class="token comment">// Specification of the desired behavior of the pod.</span>
        <span class="token comment">// More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status</span>
        <span class="token comment">// +optional</span>
        Spec PodSpec <span class="token string">`json:"spec,omitempty" protobuf:"bytes,2,opt,name=spec"`</span>

        <span class="token comment">// Most recently observed status of the pod.</span>
        <span class="token comment">// This data may not be up to date.</span>
        <span class="token comment">// Populated by the system.</span>
        <span class="token comment">// Read-only.</span>
        <span class="token comment">// More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status</span>
        <span class="token comment">// +optional</span>
        Status PodStatus <span class="token string">`json:"status,omitempty" protobuf:"bytes,3,opt,name=status"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="deamonset" tabindex="-1"><a class="header-anchor" href="#deamonset" aria-hidden="true">#</a> DeamonSet</h2>
<p>DaemonSet 是 Kubernetes 中的一种调度器，它能保证每个节点上运行一个指定的 Pod。这对于一些全局服务（如日志收集、监控等）很有用。</p>
<p>当节点加入或离开集群时，DaemonSet 会自动在新节点上创建或销毁 Pod。此外，如果某个节点中的 Pod 因故障而退役，DaemonSet 也会在该节点上重新创建一个新的 Pod。</p>
<p>使用 DaemonSet 可以确保集群中的所有节点上都运行着指定的 Pod，这对于提供全局服务很有帮助。</p>
<p>示例 DaemonSet API 对象：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">codeapiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> DaemonSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>daemonset
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>container
        <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo Hello Kubernetes! &amp;&amp; sleep 3600'</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DaemonSet API 对象包含以下几个主要字段：</p>
<ul>
<li><code v-pre>apiVersion</code>：API 的版本。</li>
<li><code v-pre>kind</code>：对象类型，这里是 DaemonSet。</li>
<li><code v-pre>metadata</code>：元数据，包括名称、命名空间、标签等。</li>
<li><code v-pre>spec</code>：DaemonSet 规范，描述了 DaemonSet 应如何运行。它包括了两个字段：
<ul>
<li><code v-pre>selector</code>：选择器，描述了哪些节点应该运行 DaemonSet 中的 Pod。</li>
<li><code v-pre>template</code>：Pod 模板，描述了 DaemonSet 中的 Pod 应该如何运行。</li>
</ul>
</li>
</ul>
<h2 id="声明式-api" tabindex="-1"><a class="header-anchor" href="#声明式-api" aria-hidden="true">#</a> 声明式 API</h2>
<p>在 Kubernetes 中，我们可以使用声明式 API 来描述我们希望集群中运行什么。我们可以使用 YAML 或 JSON 格式来声明我们希望运行的应用程序、服务、部署、调度器等。</p>
<p>例如，我们可以使用以下声明式 API 对象来创建一个 Deployment：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">codeapiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>deployment
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>container
        <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
        <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'sh'</span><span class="token punctuation">,</span> <span class="token string">'-c'</span><span class="token punctuation">,</span> <span class="token string">'echo Hello Kubernetes! &amp;&amp; sleep 3600'</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，我们可以使用 <code v-pre>kubectl</code> 命令来将这个声明式 API 对象发送到 Kubernetes 集群，如下所示：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Copy code
kubectl apply -f deployment.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，Kubernetes 就会根据声明式 API 对象中的描述创建 Deployment 和相应的 Pod。</p>
<p>在 Deployment 中，我们可以使用 <code v-pre>kubectl rollout</code> 命令来进行版本控制。这个命令可以帮助我们轻松地实现滚动升级或回滚。</p>
<p>例如，我们可以使用以下命令来升级 Deployment 中的应用程序：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Copy code
kubectl set image deployment/myapp-deployment myapp-container=myapp:v2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这条命令会将 Deployment 中的所有 Pod 的镜像更新为 <code v-pre>myapp:v2</code>。Kubernetes 会自动在新的 Pod 启动并就绪之前停止旧的 Pod，从而实现滚动升级。</p>
<p>如果我们希望回滚到之前的版本，可以使用以下命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Copy code
kubectl rollout undo deployment/myapp-deployment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这条命令会将 Deployment 滚动回上一个版本。</p>
<p>在背后，Kubernetes 使用了一个名为 <code v-pre>ControllerRevision</code> 的资源来跟踪 Deployment 的每个版本。每当我们使用 <code v-pre>kubectl rollout</code> 命令进行版本控制时，Kubernetes 都会创建一个新的 <code v-pre>ControllerRevision</code> 记录，从而使我们能够轻松地回滚到之前的版本。</p>
<h2 id="kubectl-create-和-kubectl-apply-命令有什么区别" tabindex="-1"><a class="header-anchor" href="#kubectl-create-和-kubectl-apply-命令有什么区别" aria-hidden="true">#</a> kubectl create 和 kubectl apply 命令有什么区别</h2>
<p><code v-pre>kubectl create</code> 和 <code v-pre>kubectl apply</code> 命令都可以用来在 Kubernetes 集群中创建资源。但是，这两个命令的行为略有不同。</p>
<ul>
<li><code v-pre>kubectl create</code> 命令是用来新建资源的。如果在执行该命令时，集群中已经存在同名的资源，则会报错。</li>
<li><code v-pre>kubectl apply</code> 命令是用来更新资源的。如果在执行该命令时，集群中已经存在同名的资源，则会更新资源的配置。如果不存在同名的资源，则会新建资源。</li>
</ul>
<p>所以，如果我们希望新建资源，则可以使用 <code v-pre>kubectl create</code></p>
<p>如果我们希望新建资源，则可以使用 <code v-pre>kubectl create</code> 命令。例如，我们可以使用以下命令来新建 Deployment 资源：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> deployment.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令会从 deployment.yaml 文件中读取 Deployment 配置，并在集群中新建 Deployment。</p>
<p>如果我们希望更新已存在的资源，则可以使用 <code v-pre>kubectl apply</code> 命令。例如，我们可以使用以下命令来更新 Deployment 资源：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl apply -f deployment.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令会从 deployment.yaml 文件中读取 Deployment 配置，如果集群中已经存在同名的 Deployment，则会更新 Deployment 的配置；如果不存在，则会新建 Deployment。</p>
<p>从底层来看，<code v-pre>kubectl create</code> 和 <code v-pre>kubectl apply</code> 命令的实现方式略有不同。</p>
<ul>
<li><code v-pre>kubectl create</code> 命令是通过向 Kubernetes API 服务发送 HTTP POST 请求来创建资源的。在发送请求时，会将资源的配置以 JSON 或 YAML 格式发送给 API 服务。API 服务收到请求后，会解析请求中包含的资源配置，然后在集群中新建资源。</li>
<li><code v-pre>kubectl apply</code> 命令也是通过向 Kubernetes API 服务发送 HTTP POST 请求来创建或更新资源的。但是，它的实现方式略有不同。在发送请求时，会将资源的配置以 JSON 或 YAML 格式发送给 API 服务。API 服务收到请求后，会解析请求中包含的资源配置，然后检查集群中是否已经存在同名的资源。如果存在，则会更新资源的配置；如果不存在，则会在集群中新建资源。</li>
</ul>
<h2 id="patch操作" tabindex="-1"><a class="header-anchor" href="#patch操作" aria-hidden="true">#</a> patch操作</h2>
<p><strong>⚠️ 注意，patch 操作是声明式 API 的关键，<code v-pre>Kubectl apply</code> 可以理解为是执行了一个对原有API 对象的 PATCH cao'zuo</strong></p>
<p>在 Kubernetes 中，patch 操作是用来更新资源的配置的。它可以让我们只修改资源的部分字段，而不是整个资源的配置。</p>
<p>例如，我们可以使用 patch 操作来修改 Deployment 的副本数量，而不需要修改整个 Deployment 的配置。这样做可以节省时间，并且也可以减少网络流量。</p>
<p>我们可以使用 <code v-pre>kubectl patch</code> 命令来执行 patch 操作。例如，我们可以使用以下命令来修改 Deployment 的副本数量：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl patch deployment myapp-deployment <span class="token parameter variable">-p</span> <span class="token string">'{"spec":{"replicas": 3}}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令会将 Deployment 的副本数量修改为 3。</p>
<p>需要注意的是，<strong>patch 操作不会清除资源的字段</strong>。也就是说，如果我们使用 patch 操作修改资源的某个字段，而不指定该字段的值，则该字段的值不会被清除。</p>
<p>例如，如果我们使用以下命令来修改 Deployment 的副本数量：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl patch deployment myapp-deployment <span class="token parameter variable">-p</span> <span class="token string">'{"spec":{"replicas": null}}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令会尝试将 Deployment 的副本数量设置为 null，但是由于 Deployment 的副本数量是必填字段，所以这条命令会失败。</p>
<p>如果我们希望清除资源的某个字段，则可以使用 <code v-pre>kubectl edit</code> 命令。</p>
<p><code v-pre>kubectl edit</code> 命令会打开资源的编辑界面，让我们可以直接修改资源的配置。我们可以将要清除的字段设置为 null，然后保存即可。</p>
<p>例如，我们可以使用以下命令来清除 Deployment 的副本数量字段：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl edit deployment myapp-deployment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这条命令会打开 Deployment 的编辑界面，我们可以将副本数量字段设置为 null，然后保存即可。</p>
<h2 id="声明式-api-的一些工作原理" tabindex="-1"><a class="header-anchor" href="#声明式-api-的一些工作原理" aria-hidden="true">#</a> 声明式 API 的一些工作原理</h2>
<p>在Kubernetes中，API对象存储在etcd数据库中。在etcd中，每个API对象都有一个唯一的路径，用于标识对象所在的位置。这个路径通常包含几个部分：</p>
<ul>
<li>命名空间：API对象所属的命名空间。</li>
<li>资源类型：API对象的类型，例如Pod、Service、Deployment等。</li>
<li>资源名称：API对象的名称。</li>
</ul>
<p>例如，如果要描述一个名为&quot;my-pod&quot;的Pod对象，它位于名为&quot;default&quot;的命名空间中，那么它在etcd中的完整路径可能如下所示：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/registry/pods/default/my-pod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个路径中的各个部分分别表示命名空间（default）、资源类型（pods）和资源名称（my-pod）。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '38.md' style='float:left'>⬆️上一节🔗  </a><a href = '40.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


