<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第54节-kubernetes-生命周期管理和服务发现" tabindex="-1"><a class="header-anchor" href="#第54节-kubernetes-生命周期管理和服务发现" aria-hidden="true">#</a> 第54节 Kubernetes 生命周期管理和服务发现</h1>
<div><a href = '53.md' style='float:left'>⬆️上一节🔗  </a><a href = '55.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="有何优雅的管理pod生命周期" tabindex="-1"><a class="header-anchor" href="#有何优雅的管理pod生命周期" aria-hidden="true">#</a> 有何优雅的管理Pod生命周期</h2>
<p>要优雅地管理Pod的生命周期，可以避免容器进程被终止和Pod被驱逐，设置合理的资源限制和确保数据写入不超过emptyDir的限制，防止OOMKill和Pod被驱逐。此外，还可以设置健康检查探针，包括livenessProbe、readinessProbe和startupProbe，其中readinessProbe可在livenessProbe执行前处理状态。探测方法包括ExecAction、TCPSocketAction和HTTPGetAction。可以通过添加readinessGates condition来引入自定义的就绪条件，除了由k8s内部的探针控制之外，还可以由k8s外部controller来控制。</p>
<p><img src="http://sm.nsddd.top/sm202303091924004.png" alt="image-20230309192447683"></p>
<h3 id="pod-状态机" tabindex="-1"><a class="header-anchor" href="#pod-状态机" aria-hidden="true">#</a> Pod 状态机</h3>
<p>Pod 的状态可以分为以下几种：</p>
<ul>
<li>Pending：Pod 已被创建，但是还未被分配到节点上运行。</li>
<li>Running：Pod 已经被调度到节点上运行，并且至少有一个容器正在运行。</li>
<li>Succeeded：Pod 中所有的容器都已经成功运行结束，且不会再重启。</li>
<li>Failed：Pod 中至少有一个容器已经运行失败，并且处于不能恢复的状态，或者容器因为 OOM 等原因被操作系统强制终止。</li>
<li>Unknown：无法获取 Pod 的状态信息，通常是由于调度器或者控制器组件出现问题导致的。</li>
</ul>
<p>在 Pod 运行过程中，由于各种原因，Pod 的状态可能会发生变化，比如容器意外终止、节点故障等。Kubernetes 会不断地监控 Pod 的状态，确保 Pod 能够保持正常运行。</p>
<p><img src="http://sm.nsddd.top/sm202303171925468.png" alt="image-20230309192455697"></p>
<h3 id="pod-phase" tabindex="-1"><a class="header-anchor" href="#pod-phase" aria-hidden="true">#</a> Pod Phase</h3>
<p><strong>kubectl get pod 显示的状态信息是由 podstatus 的 conditions 和 phase 计算出来的</strong></p>
<h3 id="pod-状态计算细节" tabindex="-1"><a class="header-anchor" href="#pod-状态计算细节" aria-hidden="true">#</a> Pod 状态计算细节</h3>
<p>要查看 Pod 的细节，可以使用 <code v-pre>kubectl get pod $podname -oyaml</code> 命令来查看。此外，可以通过 <code v-pre>kubectl describe pod</code> 命令来查看与该 Pod 相关的事件。</p>
<p>以下是计算 Pod 状态的详细信息：</p>
<table>
<thead>
<tr>
<th>kubectl get pod 返回的状态</th>
<th>Pod Phase</th>
<th>Conditions</th>
</tr>
</thead>
<tbody>
<tr>
<td>Completed</td>
<td>Succeded</td>
<td></td>
</tr>
<tr>
<td>ContainerCreating</td>
<td>Pending</td>
<td></td>
</tr>
<tr>
<td>CrashLoopBackOff</td>
<td>Running</td>
<td>Container exits</td>
</tr>
<tr>
<td>CreateContainerConfigError</td>
<td>Pending</td>
<td>configmap 'xxx' not foundsecret 'xxx' not found</td>
</tr>
<tr>
<td>ErrImagePullI</td>
<td></td>
<td></td>
</tr>
<tr>
<td>magePullBackOff</td>
<td></td>
<td></td>
</tr>
<tr>
<td>Init:ImagePullBackOff</td>
<td></td>
<td></td>
</tr>
<tr>
<td>InvalidImageName</td>
<td>Pending</td>
<td>Back-off pulling image</td>
</tr>
<tr>
<td>Error</td>
<td>Failed</td>
<td>restartPolicy:Nevercontainer exits with error（exit code not 0）</td>
</tr>
<tr>
<td>Evicted</td>
<td>Failed</td>
<td>message: 'Usage of EmptyDir volume 'myworkdir&quot; exceeds the limit &quot;40Gi&quot;. 'reason: Evicted</td>
</tr>
<tr>
<td>Init:0/1</td>
<td>Pending</td>
<td>Init container don't exit</td>
</tr>
<tr>
<td>Init:CrashLoopBackOffInit:Error</td>
<td>Pending</td>
<td>Init container crashed (exit with not 1)</td>
</tr>
<tr>
<td>OOMKilled</td>
<td>Running</td>
<td>Containers are OOMKilled</td>
</tr>
<tr>
<td>StartError</td>
<td>Running</td>
<td>Containers can not be started</td>
</tr>
<tr>
<td>Unknown</td>
<td>Running</td>
<td>Node NotReady</td>
</tr>
<tr>
<td>OutOfCpu / OutOfMemory</td>
<td>Failed</td>
<td>Scheduled, but it cannot pass kubelet admit</td>
</tr>
</tbody>
</table>
<p>要保证 Pod 的高可用性，可以采取以下措施：</p>
<ul>
<li>设置合理的资源限制和确保数据写入不超过 emptyDir 的限制，防止容器进程被终止和 Pod 被驱逐。</li>
<li>定义 Guaranteed 类型的资源需求来保护重要的 Pod。</li>
<li>认真考虑 Pod 的真实需求并设置 <code v-pre>limit</code> 和 <code v-pre>resource</code>，这可以将集群资源利用率控制在合理范围并减少 Pod 被驱逐的现象。</li>
<li>避免将生产 Pod 设置为 BestEffort，但是对于测试环境来说，BestEffort Pod 能确保大多数应用不会因为资源不足而处于 Pending 状态。</li>
<li>Burstable 适用于大多数场景。</li>
</ul>
<p>如果需要避免 Pod 被驱逐，可以增加 tolerationSeconds 的值，特别是对于依赖于本地存储状态的有状态应用来说。</p>
<p>健康检查探针分为 livenessProbe、readinessProbe 和 startupProbe，其中 readinessProbe 可以在 livenessProbe 执行前处理状态，探测方法包括 ExecAction、TCPSocketAction 和 HTTPGetAction。可以通过添加 readinessGates condition 来引入自定义的就绪条件。探针属性包括 initialDelaySeconds、periodSeconds、timeoutSeconds、successThreshold 和 failureThreshold。</p>
<p>查看pod细节：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get pod <span class="token variable">$podname</span> <span class="token parameter variable">-oyaml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看pod相关事件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl describe pod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="如何保证-pod-的高可用" tabindex="-1"><a class="header-anchor" href="#如何保证-pod-的高可用" aria-hidden="true">#</a> 如何保证 Pod 的高可用</h3>
<p>避免容器进程被终止避免Pod被驱逐</p>
<ul>
<li>设置合理的 <code v-pre>resources.memory limits</code> 防止容器进程被 OOMKill</li>
<li>设置合理的 <code v-pre>emptydir.sizeLimit</code> 并且确保数据写入不超过 emptyDir 的限制， 防止 Pod 被驱逐</li>
</ul>
<h3 id="pod-的-qos-分类" tabindex="-1"><a class="header-anchor" href="#pod-的-qos-分类" aria-hidden="true">#</a> Pod 的 Qos 分类</h3>
<p>Kubernetes 中的 QoS（Quality of Service）是用来描述 Pod 对节点资源的需求和请求，以及在节点资源不足时 Kubernetes 如何处理 Pod 的策略。QoS 总共有三种类型：Guaranteed、Burstable 和 BestEffort。</p>
<ul>
<li><code v-pre>Guaranteed</code>：Pod 请求了所有的资源，kubelet 会保证这些资源被分配到 Pod 中，如果资源不足，Pod 会处于 Pending 状态。</li>
<li><code v-pre>Burstable</code>：Pod 请求了最小的资源，但可以加倍使用，直到达到请求的上限。如果资源不足，Pod 会被暂停或者调度到其他节点。</li>
<li><code v-pre>BestEffort</code>：Pod 请求了最小的资源，但不必保证资源分配到 Pod 中。如果资源不足，Pod 会被暂停或者调度到其他节点。</li>
</ul>
<p>QoS 类型的判断依据是 Pod 所请求的 CPU 和内存的 request 和 limit。如果 request 和 limit 相等，那么 Pod 的 QoS 类型就是 Guaranteed；如果 limit 大于 request，那么 Pod 的 QoS 类型就是 Burstable；如果 request 和 limit 都为 0，那么 Pod 的 QoS 类型就是 BestEffort。</p>
<ul>
<li>Guaranteed
<ul>
<li>Pod 的每个容器都设置了资源 CPU 和内存需求</li>
<li>Limits 和 requests 的值完全一 致</li>
</ul>
</li>
<li>Burstable
<ul>
<li>至少一个容器指定了 CPU 或内存 request</li>
<li>Pod 的资源需求不符合 Gauranteed QoS 的条件，也就是 requests 和 limits 不一致</li>
</ul>
</li>
<li>BestEffort
<ul>
<li>Pod中的所有容器都未指定CPU或内存资源需求requests</li>
</ul>
</li>
</ul>
<p>当计算节点检测到内存压力时，Kubernetes 会按 BestEffort-&gt; Burstable-&gt;Guaranteed 的顺序依次驱逐 Pod。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get pod test-vfgg6 <span class="token parameter variable">-oyaml</span> <span class="token operator">|</span><span class="token function">grep</span> qosClass
qosClass: Burstable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>定义 Guaranteed 类型的资源需求来保护你的重要 Pod</li>
<li>认真考量 Pod 需要的真实需求并设置 limit 和 resource,这有利于将集群资源利用率控制在合理范围并减少 Pod 被驱逐的现象。</li>
<li>尽量避免将生产 Pod 设置为 BestEffort,但是对测试环境来讲，BestEffort Pod 能确保大多数应用不会因为资源不足而处于 Pending 状态。</li>
<li>Burstable 适用于大多数场景。
<ul>
<li>思考：为什么?</li>
<li>为了节省资源，Guaranteed 类型 Pod 占用的资源 k8s 会优先保证，不足时就驱逐 Pod， 如果实际 Pod 没有消耗掉申请的资源就会造成浪费。</li>
</ul>
</li>
</ul>
<h3 id="基于taint的evictions" tabindex="-1"><a class="header-anchor" href="#基于taint的evictions" aria-hidden="true">#</a> 基于Taint的Evictions</h3>
<p>基于 Taint 的 Evictions 是 Kubernetes 中的一种节点驱逐机制。当节点临时不可达，比如出现网络分区、kubelet 或 containerd 不工作等情况，或者节点重启超过 15 分钟时，就会触发该机制，从而保证 Pod 的高可用性。为了避免被驱逐，可以增大 tolerationSeconds 的值，特别是对于依赖于本地存储状态的有状态应用来说。</p>
<ul>
<li>节点临时不可达
<ul>
<li>网络分区</li>
<li>kubelet, containerd 不工作</li>
<li>节点重启超过了15 分钟</li>
</ul>
</li>
<li>增大tolerationSeconds 以避免被驱逐
<ul>
<li>特别是依赖于本地存储状态的有状态应用</li>
</ul>
</li>
</ul>
<h2 id="健康检查探针" tabindex="-1"><a class="header-anchor" href="#健康检查探针" aria-hidden="true">#</a> 健康检查探针</h2>
<p>健康检查探针是 Kubernetes 中的一种机制，用于检测 Pod 中容器的运行状态。健康探针类型分为：livenessProbe、readinessProbe 和 startupProbe。其中，livenessProbe 用于探活，当检测到容器不健康时，Kubernetes 会自动重启该容器；readinessProbe 用于探测容器是否已经准备好接收流量，如果容器无法处理流量，Kubernetes 会将其从 Service 中删除，从而避免流量被分配到不健康的容器上；startupProbe 用于在容器启动时检查应用程序是否已经启动成功，如果应用程序没有启动成功，那么 Kubernetes 会认为容器不健康。探测方法包括 ExecAction、TCPSocketAction 和 HTTPGetAction。探针属性包括 initialDelaySeconds、periodSeconds、timeoutSeconds、successThreshold 和 failureThreshold。</p>
<p>健康探针类型分为：</p>
<ul>
<li>livenessProbe
<ul>
<li>探活，当检查失败时，意味着该应用进程已经无法正常提供服务, kubelet 会终止该容器进程并按照 restartPolicy 决定是否重启</li>
<li><strong>在该探针执行前 Pod 默认就是存活状态</strong></li>
</ul>
</li>
<li>readinessProbe
<ul>
<li>就绪状态检查，当检查失败时，意味着应用进程正在运行，但因为某些原因不能提供服务，Pod 状态会被标记为NotReady</li>
<li>默认为 NotReady，Pod 需要通过该检查后才能对外提供服务</li>
</ul>
</li>
<li>startupProbe
<ul>
<li>在初始化阶段(Ready之前)进行的健康检查，通常用来避免过于频繁的监测影响应用启动</li>
<li>有些 Pod 启动比较慢，频繁的 readinessProbe 探针可能反而会影响到该 Pod 的启动</li>
</ul>
</li>
</ul>
<p>探测方法包括</p>
<ul>
<li>ExecAction：在容器内部运行指定命令,当返回码为0时，探测结果为成功</li>
<li>TCPSocketAction：由kubelet发起，通过TCP协议检查容器IP和端口，当端口可达时，探测结果为成功</li>
<li>HTTPGetAction：由 kubelet 发起，对 Pod 的 IP 和指定端口以及路径进行 HTTPGet 操作，当返回码为 200-400 之间时，探测结果为成功</li>
</ul>
<p>小结：<strong>因为 livenessProbe 执行前，Pod 状态默认就是存活，因此需要配置 readinessProbe 来处理 livenessProbe 运行前这段时间的状态，保证用户流量达到时 Pod 一定是能提供服务的。</strong></p>
<p>例如：</p>
<p>livenessProbe 设置为启动后 10s 才执行。</p>
<p>当时 Pod 两秒就启动完成了，剩下这 8 秒就直接以 Ready 状态对外提供服务了。如果此时 Pod 不能正常对外提供服务，这部分请求就会失败。</p>
<p>因此需要设置 readinessProbe，在 readinessProbe 检测通过之前 Pod 都不能对外提供服务。</p>
<p>为了解决上述问题，可以添加 readinessProbe，并且最好在两秒后就开始检测，这样可以让 Pod 能尽快的对外提供服务。readinessProbe 通过后就可以对外提供服务了，然后后续运行过程中可能因为某些 情况又会出现异常，这时就需要 livenessProbe 在检测了，当 livenessProbe 检测到不正常时就会 kill 掉容器进程，如果配置了 正确的 restartPolicy 那么 kubelet 就会重启该 Pod。</p>
<h3 id="探针属性" tabindex="-1"><a class="header-anchor" href="#探针属性" aria-hidden="true">#</a> 探针属性</h3>
<table>
<thead>
<tr>
<th>参数</th>
<th>描述</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>initialDelaySecons</td>
<td>Pod 启动后延迟探测的时间</td>
<td>Defaults to 0 seconds. Minimum value is 0.</td>
</tr>
<tr>
<td>periodSeconds</td>
<td>探测频率</td>
<td>Default to 10 seconds. Minimum value is 1.</td>
</tr>
<tr>
<td>timeoutSeconds</td>
<td>每次探测超时时间</td>
<td>Defaults to 1 second. Minimum value is 1.</td>
</tr>
<tr>
<td>success Threshold</td>
<td>成功阈值，连续成功多少次就算成功</td>
<td>Defaults to 1. Must be 1 for liveness. Minimum value is 1.</td>
</tr>
<tr>
<td>failure' Threshold</td>
<td>失败阈值，连续失败多少次就算失败</td>
<td>Defaults to 3. Minimum value is 1.</td>
</tr>
</tbody>
</table>
<h3 id="readinessgates" tabindex="-1"><a class="header-anchor" href="#readinessgates" aria-hidden="true">#</a> ReadinessGates</h3>
<ul>
<li>Readiness 允许在 Kubernetes 自带的 Pod Conditions 之外引入自定义的就绪条件</li>
<li>新引入的readinessGates condition 需要为 True 状态后，加上内置的 Conditions, Pod 才可以为就绪状态</li>
<li>该状态应该由某控制器修改</li>
</ul>
<p>ReadinessGates 是一个 hook，主要用于进行扩展。</p>
<p>场景：某个 Pod 是否 Ready，除了由 k8s 内部的探针控制之外，可能还需要由某些 k8s 外部 controller 来控制。</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token literal-property property">apiVersion</span><span class="token operator">:</span> v1
<span class="token literal-property property">kind</span><span class="token operator">:</span> Pod
<span class="token literal-property property">metadata</span><span class="token operator">:</span>
  <span class="token literal-property property">labels</span><span class="token operator">:</span>
    <span class="token literal-property property">app</span><span class="token operator">:</span> readiness<span class="token operator">-</span>gate
  <span class="token literal-property property">name</span><span class="token operator">:</span> readiness<span class="token operator">-</span>gate
<span class="token literal-property property">spec</span><span class="token operator">:</span>
  # 配置该属性，指定一个类型即可
  <span class="token literal-property property">readinessGates</span><span class="token operator">:</span>
    <span class="token operator">-</span> conditionType<span class="token operator">:</span> <span class="token string">"www.example.com/feature-1"</span>  <span class="token literal-property property">containers</span><span class="token operator">:</span>
    <span class="token operator">-</span> name<span class="token operator">:</span> readiness<span class="token operator">-</span>gate
      <span class="token literal-property property">image</span><span class="token operator">:</span> nginx
<span class="token operator">--</span><span class="token operator">-</span>
<span class="token literal-property property">apiVersion</span><span class="token operator">:</span> v1
<span class="token literal-property property">kind</span><span class="token operator">:</span> Service
<span class="token literal-property property">metadata</span><span class="token operator">:</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> readiness<span class="token operator">-</span>gate
<span class="token literal-property property">spec</span><span class="token operator">:</span>
  <span class="token literal-property property">ports</span><span class="token operator">:</span>
    <span class="token operator">-</span> port<span class="token operator">:</span> <span class="token number">80</span>
      <span class="token literal-property property">protocol</span><span class="token operator">:</span> <span class="token constant">TCP</span>
      <span class="token literal-property property">targetPort</span><span class="token operator">:</span> <span class="token number">80</span>
  <span class="token literal-property property">selector</span><span class="token operator">:</span>
    <span class="token literal-property property">app</span><span class="token operator">:</span> readiness<span class="token operator">-</span>gate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该 Pod 运行后就会由于 readinessGates Not Ready 导致整个 Pod 进入Not Ready 的状态，直到外部控制器修改了 readinessGates condition 的值为 True。</p>
<h3 id="post-start和pre-stop-hook" tabindex="-1"><a class="header-anchor" href="#post-start和pre-stop-hook" aria-hidden="true">#</a> Post-start和Pre-Stop Hook</h3>
<p>在启动后或者停止前可以执行自定义 hook：</p>
<p><img src="http://sm.nsddd.top/sm202303091925831.png" alt="image-20230309192549695"></p>
<p>注意点：</p>
<ul>
<li>无法保证 postStart 脚本的容器的 Entrypoint 哪个先执行</li>
<li>postStart 结束之前，容器不会被标记为 Running 状态</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202303091925137.png" alt="image-20230309192528965"></p>
<p>注意事项：</p>
<ul>
<li>容器有一个terminationGracePeriodSeconds 时间，默认为 30 秒，如果超过这个时间会被强制 kill
<ul>
<li>一般用于做服务的优化退出，比如 http 服务可以再这段时间把已经进来的请求处理完再退出</li>
</ul>
</li>
<li>只有当 Pod 被终止时，Kubernetes 才会执行 preStop 脚本，这意味着当 Pod 完成或容器退出时，preStop 脚本不会被执行。</li>
</ul>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token literal-property property">apiVersion</span><span class="token operator">:</span> v1
<span class="token literal-property property">kind</span><span class="token operator">:</span> Pod
<span class="token literal-property property">metadata</span><span class="token operator">:</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> prestop
<span class="token literal-property property">spec</span><span class="token operator">:</span>
  <span class="token literal-property property">containers</span><span class="token operator">:</span>
    <span class="token operator">-</span> name<span class="token operator">:</span> lifecycle<span class="token operator">-</span>demo<span class="token operator">-</span>container
      <span class="token literal-property property">image</span><span class="token operator">:</span> nginx
      <span class="token literal-property property">lifecycle</span><span class="token operator">:</span>
        <span class="token literal-property property">preStop</span><span class="token operator">:</span>
          <span class="token literal-property property">exec</span><span class="token operator">:</span>
            <span class="token literal-property property">command</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">"/bin/sh"</span><span class="token punctuation">,</span><span class="token string">"-c"</span><span class="token punctuation">,</span><span class="token string">"nginx -s quit; while killall -0 nginx; do sleep 1; done"</span> <span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="terminationgraceperiodseconds-的分解" tabindex="-1"><a class="header-anchor" href="#terminationgraceperiodseconds-的分解" aria-hidden="true">#</a> terminationGracePeriodSeconds 的分解</h3>
<p>terminationGracePeriodSeconds 定义了 Pod 退出到强制 kill 中间的间隔时间。</p>
<p><img src="http://sm.nsddd.top/sm202303091926192.png" alt="image-20230309192608101"></p>
<p>长连接场景下对 terminationGracePeriodSeconds 依赖比较大，比如一个视频会议的服务，一个视频会议可能一开就是几个小时，甚至更长时间都有可能，这种情况下业务如何做滚动升级呢？</p>
<blockquote>
<p>一升级就会把现有连接 kill 掉，用户体验就很糟糕。</p>
</blockquote>
<p>这种情况下就可以把 terminationGracePeriodSeconds 设置非常长时间，比如设置个 1天，然后业务里实现优化关机逻辑，等所有连接处理完成后程序再退出。</p>
<h3 id="terminating-pod的误用" tabindex="-1"><a class="header-anchor" href="#terminating-pod的误用" aria-hidden="true">#</a> Terminating Pod的误用</h3>
<p>bash/sh 会忽略 SIGTERM 信号量，因此 kill -SIGTERM 会永远超时，若应用使用 bash/sh 作为 Entrypoint, 则应避免过长的 grace period。</p>
<p>根据上图可知，如果 Pod 忽略 SIGTERM 信号量，那么就会一直阻塞在 kill -SIGTERM 这一步，直到整个 grace period 时间耗尽才触发 kill -SIGKILL。</p>
<h3 id="terminating-pod的经验分享" tabindex="-1"><a class="header-anchor" href="#terminating-pod的经验分享" aria-hidden="true">#</a> Terminating Pod的经验分享</h3>
<p>terminationGracePeriodSeconds默认时长30秒</p>
<ul>
<li>如果不关心 Pod 的终止时长，那么无需采取特殊措施</li>
<li>如果希望快速终止应用进程，那么可采取如下方案
<ul>
<li>在 preStop script 中主动退出进程.</li>
<li>在主容器进程中使用特定的初始化进程
<ul>
<li>https://github.com/krallin/tini</li>
</ul>
</li>
</ul>
</li>
<li>优雅的初始化进程应该
<ul>
<li>正确处理系统信号量,将信号量转发给子进程</li>
<li>在主进程退出之前，需要先等待并确保所有子进程退出</li>
<li>监控并清理孤儿子进程</li>
</ul>
</li>
</ul>
<h2 id="在-k8s-上部署应用的挑战" tabindex="-1"><a class="header-anchor" href="#在-k8s-上部署应用的挑战" aria-hidden="true">#</a> 在 k8s 上部署应用的挑战</h2>
<p>资源规划</p>
<ul>
<li>每个实例需要多少计算资源
<ul>
<li>CPU/GPU?</li>
<li>Memory</li>
</ul>
</li>
<li>超售需求</li>
<li>每个实例需要多少存储资源
<ul>
<li>大小</li>
<li>本地还是网盘</li>
<li>读写性能</li>
<li>Disk IO</li>
</ul>
</li>
<li>网络需求
<ul>
<li>整个应用总体QPS和带宽</li>
</ul>
</li>
</ul>
<h3 id="存储带来的挑战" tabindex="-1"><a class="header-anchor" href="#存储带来的挑战" aria-hidden="true">#</a> 存储带来的挑战</h3>
<p>多容器之间共享存储，最简方案是 emptyDir</p>
<p>带来的挑战：</p>
<ul>
<li>emptyDir 需要控制 size limt,否则无限扩张的应用会撑爆主机磁盘导致主机不可用,进而导致大规模集群故障</li>
<li>emptyDir size limit 生效以后, kubelet 会定期对容器目录执行读操作，会导致些许的性能影响.</li>
<li>size limit 达到以后，Pod 会被驱逐，原 Pod 的日志配置等信息会消失</li>
</ul>
<h3 id="应用配置" tabindex="-1"><a class="header-anchor" href="#应用配置" aria-hidden="true">#</a> 应用配置</h3>
<p>传入方式</p>
<ul>
<li>Environment Variables</li>
<li>Volume Mount</li>
</ul>
<p>数据来源</p>
<ul>
<li>ConfigMap</li>
<li>Secret</li>
<li>Downward API</li>
</ul>
<h3 id="数据应该如何保存" tabindex="-1"><a class="header-anchor" href="#数据应该如何保存" aria-hidden="true">#</a> 数据应该如何保存</h3>
<table>
<thead>
<tr>
<th>存储卷类型</th>
<th>容器重启后是否存在</th>
<th>Pod 重建后数据是否存在</th>
<th>是否有大小控制</th>
<th>注意事项</th>
</tr>
</thead>
<tbody>
<tr>
<td>emptyDir</td>
<td>是</td>
<td>否</td>
<td>是</td>
<td></td>
</tr>
<tr>
<td>hostPath</td>
<td>是</td>
<td>否</td>
<td>否</td>
<td>需要额外权限控制</td>
</tr>
<tr>
<td>Local Volume</td>
<td>是</td>
<td>否</td>
<td>是</td>
<td>无备份</td>
</tr>
<tr>
<td>Network Volume</td>
<td>是</td>
<td>是</td>
<td>是</td>
<td></td>
</tr>
<tr>
<td>rootFS</td>
<td>否</td>
<td>否</td>
<td>否</td>
<td>不要写任何数据</td>
</tr>
</tbody>
</table>
<p>注意控制日志写入速度，防止操作系统在配置日志滚动窗口期把硬盘写满。</p>
<h3 id="容器应用可能面临的进程中断" tabindex="-1"><a class="header-anchor" href="#容器应用可能面临的进程中断" aria-hidden="true">#</a> 容器应用可能面临的进程中断</h3>
<table>
<thead>
<tr>
<th>类型</th>
<th>影响</th>
<th>建议</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>kubelet 升级</td>
<td>不重建容器</td>
<td>无影响</td>
<td></td>
</tr>
<tr>
<td>kubelet 升级（某几个版本）</td>
<td>重建容器Pod 进程会被重启</td>
<td>冗余部署跨故障域部署</td>
<td>kubelet 如何判断 Pod 是否启动？计算 hash 值，和 etcd 中的 Pod 进行对比，如果不一致则认为没有启动，会重新拉取 Pod。而有几个版本 k8s 中对计算 hash 值的方法进行了修改，因此升级到该版本后 kubelet 会认为 Pod 没有被启动，又重新创建 Pod，对业务影响比较大</td>
</tr>
<tr>
<td>主机操作系统升级手工节点重启</td>
<td>节点重启Pod 进程会被终止数分钟（10分钟左右）</td>
<td>跨故障域部署增加 liveiness、readiness 探针设置合理的 NotReady node 的 toleration</td>
<td></td>
</tr>
<tr>
<td>节点下架，送修</td>
<td>节点会 drain，重启或从集群中删除Pod 进程会被终止数分钟</td>
<td>跨故障域部署利用 Pod disruption budget 避免节点被 drain 导致 Pod 被意外删除而影响业务利用 preStop script 做数据备份等操作</td>
<td>因此升级 k8s 版本之前需要认真查看每个版本的 changelog。比如Pod有3副本，结果该节点上就有两个，一下子 drain 掉两个 2/3 副本数可能会业务就会有比较大的影响</td>
</tr>
<tr>
<td></td>
<td>pod will</td>
<td>跨故障域部署设置合理的 NotReady node 的 toleration</td>
<td></td>
</tr>
<tr>
<td>节点崩溃</td>
<td>Pod 进程会被终止 15 分钟左右</td>
<td>跨故障域部署</td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="高可用部署方式" tabindex="-1"><a class="header-anchor" href="#高可用部署方式" aria-hidden="true">#</a> 高可用部署方式</h3>
<p>多少实例</p>
<p>更新策略</p>
<ul>
<li>maxSurge</li>
<li>maxUnavalibale（需要考虑 ResourceQuota 的限制）
<ul>
<li>比如当前 Pod 副本数已经把 ResourceQuota 占满了，然后 maxUnavalibale 还配置为 0，滚动更新时势必要启动新 Pod，然后又会被 ResourceQuota 卡住，导致一致无法更新</li>
</ul>
</li>
</ul>
<p>深入理解 PodTemplateHash 导致的应用的易变性</p>
<h2 id="课后作业" tabindex="-1"><a class="header-anchor" href="#课后作业" aria-hidden="true">#</a> 课后作业</h2>
<p>现在你对 Kubernetes 的控制面板的工作机制是否有了深入的了解呢?</p>
<p>是否对如何构建一个优雅的云上应用有了深刻的认识，那么接下来用最近学过的知识把你之前编写的 http 以优雅的方式部署起来吧，你可能需要审视之前代码是否能满足优雅上云的需求。</p>
<p>作业要求：编写 Kubernetes 部署脚本将 httpserver 部署到 kubernetes 集群，以下是你可以思考的维度：</p>
<ul>
<li>优雅启动</li>
<li>优雅终止</li>
<li>资源需求和 QoS 保证</li>
<li>探活</li>
<li>日常运维需求，日志等级</li>
<li>配置和代码分离</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '53.md' style='float:left'>⬆️上一节🔗  </a><a href = '55.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


