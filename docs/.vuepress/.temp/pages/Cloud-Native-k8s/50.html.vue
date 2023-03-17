<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第50节-kubernetes-控制平面-调度器" tabindex="-1"><a class="header-anchor" href="#第50节-kubernetes-控制平面-调度器" aria-hidden="true">#</a> 第50节 Kubernetes 控制平面：调度器</h1>
<div><a href = '49.md' style='float:left'>⬆️上一节🔗  </a><a href = '51.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="调度器" tabindex="-1"><a class="header-anchor" href="#调度器" aria-hidden="true">#</a> 调度器</h2>
<p><strong>kube-scheduler 负责分配调度 Pod 到集群内的节点上,它监听 kube-apiserver,查询还未分配 Node 的 Pod,然后根据调度策略为这些 Pod 分配节点(更新 Pod 的 NodeName 字段)。</strong></p>
<p>调度器需要充分考虑诸多的因素：</p>
<ul>
<li>公平调度;</li>
<li>资源高效利用;</li>
<li>QoS;</li>
<li>affinity 和 anti-affinity;</li>
<li>数据本地化(data locality) ;</li>
<li>内部负载干扰(inter-workload interference) ;</li>
<li>deadlines。</li>
</ul>
<p>kube-scheduler 调度分为两个阶段, predicate 和 priority:</p>
<ul>
<li>predicate: 过滤不符合条件的节点;</li>
<li>priority:优先级排序，选择优先级最高的节点。.</li>
</ul>
<h3 id="predicate-策略" tabindex="-1"><a class="header-anchor" href="#predicate-策略" aria-hidden="true">#</a> predicate 策略</h3>
<ul>
<li>PodFitsHostPorts：检查是否有 Host Ports 冲突。</li>
<li>PodFitsPorts：同P odFitsHostPorts。</li>
<li>PodFitsResources：检查 Node 的资源是否充足，包括允许的Pod数量、CPU、内存、GPU个数以及其他的OpaqueIntResources。</li>
<li>HostName：检查 pod.Spec.NodeName 是否与候选节点一致。</li>
<li>MatchNodeSelector：检查候选节点的 pod.Spec.NodeSelector 是否匹配</li>
<li>NoVolumeZoneConflict：检查 volume zone 是否冲突。</li>
<li>MatchInterPodAffinity：检查是否匹配 Pod 的亲和性要求。</li>
<li>NoDiskConflict：检查是否存在 Volume 冲突，仅限于 GCE PD、AWS EBS、Ceph RBD以及 iSCSI。</li>
<li>PodToleratesNodeTaints：检查 Pod 是否容忍 Node Taints。</li>
<li>CheckNodeMemoryPressure：检查 Pod 是否可以调度到 MemoryPressure 的节点上。</li>
<li>CheckNodeDiskPressure：检查 Pod 是否可以调度到 DiskPressure 的节点上。</li>
<li>NoVolumeNodeConflict：检查节点是否满足 Pod 所引用的 Volume 的条件。</li>
</ul>
<h3 id="priority-策略" tabindex="-1"><a class="header-anchor" href="#priority-策略" aria-hidden="true">#</a> priority 策略</h3>
<ul>
<li>SelectorSpreadPriority：优先减少节点上属于同一个 Service 或 Replication Controller 的 Pod 数量。
<ul>
<li>尽量将同一个 rc 下的多个副本分散到不同节点，增加可用性</li>
</ul>
</li>
<li>InterPodAffinityPriority：优先将Pod调度到相同的拓扑上(如同一个节点、Rack、Zone等)。</li>
<li>LeastRequestedPriority：优先调度到请求资源少的节点上。</li>
<li>BalancedResourceAllocation：优先平衡各节点的资源使用。</li>
<li>NodePreferAvoidPodsPriority：alpha.kubernetes.io/preferAvoidPods字段判断，权重为10000，避免其他优先级策略的影响</li>
<li>NodeAffinityPriority：优先调度到匹配NodeAffinity的节点上。</li>
<li>TaintTolerationPriority：优先调度到匹配TaintToleration的节点上。</li>
<li>ServiceSpreadingPriority：尽量将同一个service的Pod分布到不同节点上，已经被SelectorSpreadPriority替代( 默认未使用)。</li>
<li>EqualPriority：将所有节点的优先级设置为1 (默认未使用)</li>
<li>ImageLocalityPriority：尽量将使用大镜像的容器调度到已经下拉了该镜像的节点上(默认未使用)</li>
<li>MostRequestedPriority：尽量调度到已经使用过的Node.上，特别适用于cluster-autoscaler (默认未使用)</li>
</ul>
<h3 id="资源需求" tabindex="-1"><a class="header-anchor" href="#资源需求" aria-hidden="true">#</a> 资源需求</h3>
<p>CPU</p>
<ul>
<li>requests
<ul>
<li>Kubernetes 调度 Pod 时，会判断当前节点正在运行的 Pod 的 CPU Request 的总和，再加上当前调度Pod 的 CPU request,计算其是否超过节点的 CPU 的可分配资源</li>
</ul>
</li>
<li>limits
<ul>
<li>配置 cgroup 以限制资源上限</li>
</ul>
</li>
</ul>
<p>内存</p>
<ul>
<li>requests
<ul>
<li>判断节点的剩余内存是否满足 Pod 的内存请求量，以确定是否可以将 Pod 调度到该节点</li>
</ul>
</li>
<li>limits
<ul>
<li>配置 cgroup 以限制资源上限</li>
</ul>
</li>
</ul>
<h3 id="request-limit-和-cgroups" tabindex="-1"><a class="header-anchor" href="#request-limit-和-cgroups" aria-hidden="true">#</a> request &amp; limit 和 cgroups</h3>
<p>k8s 中 request 作为调度用，节点剩余资源满足 request 值即可调度，limit 在 k8s 系统中没有作用，只是会传递给 cri。</p>
<p>在 cri 中，使用 cgroup 限制资源时，是如何对应的呢？</p>
<p>以 cpu 资源为例：</p>
<ul>
<li>1）request 中的值会体现在 cpu.shares 中
<ul>
<li>比如 cpu request 为 0.5，那么 cgroups 中的 cpu.shares 就是 0.5*1024 = 512</li>
<li>如果是 2 那么 cpu.shares 就是 2048</li>
</ul>
</li>
<li>2）limits 中的值会体现在 cpu.cfs_period_us 和 cpu.cfs_quota_us 中
<ul>
<li>二者是绝对值，因此可以用于做硬限制</li>
</ul>
</li>
</ul>
<h3 id="磁盘资源需求" tabindex="-1"><a class="header-anchor" href="#磁盘资源需求" aria-hidden="true">#</a> 磁盘资源需求</h3>
<p>容器临时存储(ephemeral storage)包含日志和可写层数据，可以通过定义 Pod Spec 中的 limits.ephemeral-storage 和 requests.ephemeral-storage来申请。 Pod 调度完成后，<strong>计算节点对临时存储的限制不是基于 CGroup的，而是由 kubelet 定时获取容器的日志 和容器可写层的磁盘使用情况，如果超过限制，则会对 Pod 进行驱逐</strong>。</p>
<h3 id="init-container-资源需求" tabindex="-1"><a class="header-anchor" href="#init-container-资源需求" aria-hidden="true">#</a> init container 资源需求</h3>
<p>当 kube-scheduler 调度带有多个 init 容器的 Pod 时，<strong>只计算 cpu.request 最多的 init 容器</strong>，而不是计 算所有的 init 容器总和。 <strong>由于多个 init 容器按顺序执行，并且执行完成立即退出，所以申请最多的资源 init 容器中的所需资源即可满足所有 init 容器需求。</strong> kube-scheduler 在计算该节点被占用的资源时，init 容器的资源依然会被纳入计算。因为 init 容器在 特定情况下可能会被再次执行，比如由于更换镜像而引起 Sandbox 重建时。</p>
<h3 id="把-pod-调度到指定-node-上" tabindex="-1"><a class="header-anchor" href="#把-pod-调度到指定-node-上" aria-hidden="true">#</a> 把 Pod 调度到指定 Node 上</h3>
<p>可以通过 nodeSelector、nodeAffinity、 podAffinity 以及 Taints 和 tolerations 等来将 Pod 调度到需要的 Node上。也可以通过设置 nodeName 参数，将 Pod 调度到指定 node 节点上。</p>
<p>比如，使用 nodeSelector,首先给 Node 加上标签</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl label nodes &lt;your-node-name> disktype=ssd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着，指定该 Pod 只想运行在带有 disktype=ssd 标签的 Node 上。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
        <span class="token key atrule">disktype</span><span class="token punctuation">:</span> ssd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="nodeselector" tabindex="-1"><a class="header-anchor" href="#nodeselector" aria-hidden="true">#</a> nodeSelector</h4>
<p>首先给Node打上标签:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl label nodes node-01 <span class="token assign-left variable">disktype</span><span class="token operator">=</span>ssd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在daemonset中指定nodeSelector为disktype: =ssd:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
    <span class="token key atrule">disktype</span><span class="token punctuation">:</span> ssd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="nodeaffinity" tabindex="-1"><a class="header-anchor" href="#nodeaffinity" aria-hidden="true">#</a> NodeAffinity</h4>
<p>NodeAffinity 目前支持两种: <code v-pre>requiredDuringSchedulinglgnoredDuringExecution</code> 和 <code v-pre>preferredDuringSchedulinglgnoredDuringExecution</code>。</p>
<p>分别代表必须满足条件和优选条件。 比如下面的例子代表<strong>优先</strong>调度到包含标签 disktype=ssd 的 node 上。</p>
<blockquote>
<p>如果所有节点都不满足该条件，也可以调度。</p>
</blockquote>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
        <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
          <span class="token key atrule">preferredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">1</span>
            <span class="token key atrule">preference</span><span class="token punctuation">:</span>
              <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
                <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> disktype
                  <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                  <span class="token key atrule">values</span><span class="token punctuation">:</span>
                    <span class="token punctuation">-</span> ssd
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如下面的例子代表<strong>只能</strong>调度到包含标签 disktype=ssd 的 node 上。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
        <span class="token key atrule">nodeAffinity</span><span class="token punctuation">:</span>
          <span class="token key atrule">requiredDuringSchedulingIgnoredDuringExecution</span><span class="token punctuation">:</span>
            <span class="token key atrule">nodeSelectorTerms</span><span class="token punctuation">:</span>
              <span class="token punctuation">-</span> <span class="token key atrule">matchExpressions</span><span class="token punctuation">:</span>
                  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> disktype
                    <span class="token key atrule">operator</span><span class="token punctuation">:</span> In
                    <span class="token key atrule">values</span><span class="token punctuation">:</span>
                      <span class="token punctuation">-</span> ssd
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
          <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="podaffinity" tabindex="-1"><a class="header-anchor" href="#podaffinity" aria-hidden="true">#</a> podAffinity</h4>
<p><strong>podAffinity 基于 Pod 的标签来选择 Node</strong>,仅调度到满足条件 Pod 所在的 Node上，支持 podAffinity 和 podAntiAffinity。</p>
<p>这个功能比较绕，以下面的例子为例:</p>
<p>如果一个&quot;Node 上运行的 pod 中包含至少一个带有 a=b 标签&quot;，那么可以调到该 Node,同时还不能调度到“包含至少一个带有 app=anti-nginx 标签且运行中 Pod&quot;的 Node 上。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-anti
spec:
  replicas: 2
  selector:
    matchLabels:
      app: anti-nginx
  template:
    metadata:
      labels:
        app: anti-nginx
    spec:
      affinity:
        podAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
                - key: a
                  operator: In
                  values:
                    - b
            topologyKey: kubernetes.io/hostname
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
                - key: app
                  operator: In
                  values:
                    - anti-nginx
            topologyKey: kubernetes.io/hostname
      containers:
        - name: with-pod-affinity
          image: nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="taints-tolerations" tabindex="-1"><a class="header-anchor" href="#taints-tolerations" aria-hidden="true">#</a> Taints &amp; Tolerations</h4>
<p>Taints 和 Tolerations 用于保证 Pod 不被调度到不合适的 Node上，其中 Taint 应用于 Node 上，而 Toleration 则应用于Pod 上。</p>
<p>目前支持的Taint类型:</p>
<ul>
<li><strong>NoSchedule</strong>: 新的 Pod 不调度到该Node.上，不影响正在运行的 Pod;</li>
<li><strong>PreferNoSchedule</strong>: soft 版的 NoSchedule,尽量不调度到该 Node 上;</li>
<li><strong>NoExecute</strong>：新的 Pod 不调度到该 Node 上，并且删除(evict) 已在运行的 Pod。Pod可以增加一个时间(tolerationSeconds) ，在该时间到之后才被移除掉</li>
</ul>
<p>然而，当 Pod 的 Tolerations 匹配 Node 的所有 Taints 的时候可以调度到该 Node 上;当 Pod 是已经运行的时候，也不会被删除(evicted) 。另外对于NoExecute,如果Pod增加了一个 tolerationSeconds,则会在该时间之后才删除Pod。</p>
<h3 id="多租户kubernetes集群-计算资源隔离" tabindex="-1"><a class="header-anchor" href="#多租户kubernetes集群-计算资源隔离" aria-hidden="true">#</a> 多租户Kubernetes集群-计算资源隔离</h3>
<p>Kubernete s集群一般是通用集群，可被所有用户共享，用户无需关心计算节点细节。 但往往某些自带计算资源的客户要求:</p>
<ul>
<li>带着计算资源加入Kubernetes集群;</li>
<li>要求资源隔离。</li>
</ul>
<p>实现方案:</p>
<ul>
<li>将要隔离的计算节点打上Taints;</li>
<li>在用户创建创建Pod时，定义tolerations来指定要调度到node taints。</li>
</ul>
<p>该方案有漏洞吗?如何堵住?</p>
<ul>
<li>其他用户如果可以 get nodes 或者 pods,可以看到 taints 信息， 也可以用相同的 tolerations 占用资源。</li>
<li>不让用户get node detail?</li>
<li>不让用户get别人的pod detail?</li>
<li>企业内部，也可以通过规范管理，通过统计数据看谁占用了哪些node;</li>
<li>数据平面上的隔离还需要其他方案配合。</li>
</ul>
<p>来自生产系统的经验</p>
<ul>
<li>用户会忘记打tolerance,导致pod无法调度, pending;</li>
<li>新员工常犯的错误，通过聊天机器人的Q&amp;A解决;</li>
<li>其他用户会get node detail,查到Taints,偷用资源。</li>
<li>通过dashboard,能看到哪些用户的什么应用跑在哪些节点上;</li>
<li>对于违规用户，批评教育为主。</li>
</ul>
<h3 id="优先级调度" tabindex="-1"><a class="header-anchor" href="#优先级调度" aria-hidden="true">#</a> 优先级调度</h3>
<p>从v1.8开始，kube-scheduler 支持定义 Pod 的优先级，从而保证高优先级的 Pod 优先调度。开启方 法为:</p>
<ul>
<li>apiserver 配置--feature-gates=PodPriority=true和--runtime-config=scheduling.k8s.io/v1alpha1=true</li>
<li>kube-scheduler 配置--feature-gates=PodPriority=true</li>
</ul>
<h3 id="priorityclass" tabindex="-1"><a class="header-anchor" href="#priorityclass" aria-hidden="true">#</a> priorityClass</h3>
<p>在指定 Pod 的优先级之前需要先定义一个 PriorityClass (非namespace资源) ,如:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>apiVersion: v1
kind: PriorityClass
metadata:
  name: high-priority
value: 1000000
globalDefault: false
description: "This priority class should be used for XYZ service pods only.'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后为 pod 设置 priorityClass：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>apiVersion: v1
kind: Pod
metadata :
  name: nginx
  labels:
    env: test
spec :
  containers :
  - name: nginx
    image: nginx
    imagePullPolicy: IfNotPresent
  priorityClassName: high-priority
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多调度器" tabindex="-1"><a class="header-anchor" href="#多调度器" aria-hidden="true">#</a> 多调度器</h3>
<p>如果默认的调度器不满足要求，还可以部署自定义的调度器。并且，在整个集群中还可以同时运行多个调度器实例，通过 <strong>podSpec.schedulerName</strong> 来选择使用哪一个调度器( 默认使用内置的调度器)。</p>
<h3 id="来自生产的经验" tabindex="-1"><a class="header-anchor" href="#来自生产的经验" aria-hidden="true">#</a> 来自生产的经验</h3>
<p>小集群:</p>
<ul>
<li>100 个 node,并发创建 8000 个 Pod 的最大调度耗时大概是 2 分钟左右，发生过 node 删除后，scheduler cache 还有信息的情况，导致 Pod 调度失败。</li>
</ul>
<p>放大效应:</p>
<ul>
<li>当一个 node 出现问题所以 load 较小时，通常用户的 Pod 都会优先调度到该 node 上，导致用户所有创建的新 Pod 都失败的情况。</li>
</ul>
<p>应用炸弹:</p>
<ul>
<li>存在危险的用户 Pod (比如fork bomb)，在调度到某个 node 上以后，会因为打开文件句柄过多导致 node 宕机，Pod 会被 evict 到其他节点，再对其他节点造成伤害，依次循环会导致整个 cluster 所有节点不可用。</li>
</ul>
<p><strong>调度器可以说是运营过程中稳定性最好的组件之一, 基本没有太大的维护 effort。</strong></p>
<h2 id="faq" tabindex="-1"><a class="header-anchor" href="#faq" aria-hidden="true">#</a> FAQ</h2>
<h3 id="init-container-资源回收" tabindex="-1"><a class="header-anchor" href="#init-container-资源回收" aria-hidden="true">#</a> init container 资源回收</h3>
<p>根据 init container 资源需求章节可知，pod 启动后，init container 的资源还是不会回收。</p>
<p>场景：<strong>init container 初始化时需要大量资源，等初始化完成后就降下去了，这种情况如何进行优化？</strong></p>
<blockquote>
<p>CPU 资源可以进行压缩，大不了初始化慢一点，但是内存资源则不行，少了直接 OOM。</p>
</blockquote>
<p>原生 k8s 对这种情况没有优化，社区有一个<strong>纵向扩容</strong>的 feature，可以动态调整 pod 需要的资源，不过支持度不如横向扩容。</p>
<h3 id="计算密集型pod如何锁死-cpu" tabindex="-1"><a class="header-anchor" href="#计算密集型pod如何锁死-cpu" aria-hidden="true">#</a> 计算密集型Pod如何锁死 CPU</h3>
<p>cpuset，将 Pod 和某个 CPU 核进行绑定，kubelet 支持 static cpu config</p>
<ul>
<li>将 pod 的 request 和 limits 配置为一样的，该 pod 在 k8s 中的 Qos 等级就是 BestEffort，对应该等级的 Pod，如果 kubelet 配置了 static cpu config，就会自动绑定</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '49.md' style='float:left'>⬆️上一节🔗  </a><a href = '51.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


