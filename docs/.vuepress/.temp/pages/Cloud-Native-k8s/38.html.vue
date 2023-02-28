<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第38节-一些疑问和解答3" tabindex="-1"><a class="header-anchor" href="#第38节-一些疑问和解答3" aria-hidden="true">#</a> 第38节 一些疑问和解答3</h1>
<div><a href = '37.md' style='float:left'>⬆️上一节🔗  </a><a href = '39.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="tty-和-stdin和docker关系" tabindex="-1"><a class="header-anchor" href="#tty-和-stdin和docker关系" aria-hidden="true">#</a> tty 和 stdin和docker关系</h2>
<p>[[tty]] 和 [[stdin]] 是与终端和标准输入相关的概念，而 Docker 是一种容器虚拟化平台。</p>
<p>在Docker中，你可以使用Docker命令行工具来连接到一个正在运行的容器，从而获得一个类似于终端的环境。在这种情况下，你可以使用tty来描述这个连接到容器的终端。</p>
<p>同时，在连接到容器的终端中，你可以使用stdin来输入命令或者数据，并通过标准输出流（stdout）和标准错误流（stderr）获得命令的输出结果。这种情况下，你可以将stdin看作是连接到容器的终端的输入流，stdout 和 stderr 则是输出流。</p>
<p>简单来说，tty和stdin是与终端和标准输入相关的概念，而Docker则提供了一种在容器中连接到终端的方法，并通过标准输入和输出流与容器进行交互。</p>
<p><strong>🐭 docker 的 -it含义：</strong></p>
<p>可以使用<code v-pre>-it</code>参数来连接到容器并打开一个交互式终端。</p>
<p><code v-pre>-i</code>参数表示你希望保留容器的标准输入流（stdin），并使用交互式的方式与容器交互。</p>
<p><code v-pre>-t</code>参数表示你希望分配一个伪 tty 设备（pseudo-tty）给容器，这样你就可以在容器内使用类似于终端的界面进行交互。</p>
<p>例如，你可以使用以下命令来连接到一个正在运行的容器：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> <span class="token operator">&lt;</span>container_name<span class="token operator">></span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这条命令会使用<code v-pre>-i</code>和<code v-pre>-t</code>参数连接到容器，并在容器内打开一个bash</p>
<h2 id="ownerreference-字段" tabindex="-1"><a class="header-anchor" href="#ownerreference-字段" aria-hidden="true">#</a> ownerReference 字段</h2>
<p><code v-pre>ownerReference</code> 字段是 Kubernetes 中的一个重要字段，它用于记录对象的所有者信息。</p>
<p>在 Kubernetes 中，每个对象都可以有一个所有者，并且所有者可以是另一个对象。例如，一个 Deployment 可以是一个 Pod 的所有者，而一个 Pod 可以是一个 [[docs/Cloud-Native-k8s/38#ReplicaSet|ReplicaSet]] 的所有者。<code v-pre>ownerReference</code> 字段用于记录这种所有关系，以便在 Kubernetes 集群中更好地管理对象。</p>
<p><code v-pre>ownerReference</code> 字段包含以下信息：</p>
<ul>
<li><code v-pre>apiVersion</code>：所有者对象的 API 版本。</li>
<li><code v-pre>kind</code>：所有者对象的类型。</li>
<li><code v-pre>name</code>：所有者对象的名称。</li>
<li><code v-pre>uid</code>：所有者对象的唯一 ID。</li>
</ul>
<p>通过使用 <code v-pre>ownerReference</code> 字段，你可以更好地了解对象之间的关系，并可以更方便地管理这些对象。</p>
<h2 id="replicaset" tabindex="-1"><a class="header-anchor" href="#replicaset" aria-hidden="true">#</a> ReplicaSet</h2>
<p>[[ReplicaSet]] 是 Kubernetes 中的一种调度器，用于确保在集群中有指定数量的 Pod 处于运行状态。</p>
<p>ReplicaSet 会为你维护一组 Pod，并通过创建、删除或更新 Pod 来维护指定的副本数。例如，如果你创建了一个 ReplicaSet，并指定副本数为 3，那么 ReplicaSet 会确保在集群中有 3 个运行的 Pod。如果有任何 Pod 失败或退出，ReplicaSet 会自动创建新的 Pod 来替换它。</p>
<p>ReplicaSet 也可以用于更新 Pod。例如，如果你修改了 ReplicaSet 中的 Pod 模板，ReplicaSet 会自动更新所有 Pod 以使其匹配新的模板。</p>
<p>总的来说，ReplicaSet 是一种非常强大的 Kubernetes 工具，可以帮助你维护集群中的 Pod 副本数量，并提供一种方便的方式来更新 Pod。</p>
<h2 id="replicaset-对象和-deployment-对象对比" tabindex="-1"><a class="header-anchor" href="#replicaset-对象和-deployment-对象对比" aria-hidden="true">#</a> ReplicaSet 对象和 Deployment 对象对比</h2>
<p>[[ReplicaSet]] 和 Deployment 都是 Kubernetes 中的资源对象，都可以用来管理 pod 的副本数量。但是它们之间有一些区别：</p>
<ul>
<li>
<p>ReplicaSet只关注于维护指定数量的pod副本，并不关心如何更新这些副本。如果你想要更新ReplicaSet中的pod，就必须手动删除旧的副本，然后创建新的副本来代替它。</p>
</li>
<li>
<p>Deployment则在维护指定数量的pod副本的同时，还可以帮助你管理pod的更新过程。当你更新Deployment中的pod时，它会自动创建新的副本，然后慢慢将流量从旧的副本转移到新的副本上。这样就可以实现在不中断服务的情况下更新应用程序。</p>
</li>
</ul>
<p>总的来说，Deployment提供了更多的功能，更方便你管理应用程序的生命周期。而ReplicaSet则更加简单，只关注于维护副本数量，不提供更新功能。</p>
<h2 id="statefluset-如何保证有状态的" tabindex="-1"><a class="header-anchor" href="#statefluset-如何保证有状态的" aria-hidden="true">#</a> StatefluSet 如何保证有状态的</h2>
<p>StatefulSet 是 Kubernetes 中用于管理有状态应用的资源类型。它与副本控制器（比如 ReplicaSet 和 Deployment）不同，因为它为每个 Pod 提供了一个唯一的标识符，并保证了每个 Pod 在其他 Pod 启动之前启动。</p>
<p>例如，如果你有一个有状态的数据库应用，你可以使用 StatefulSet 来管理它。StatefulSet 会为每个数据库实例分配一个唯一的名称和 DNS 名称，并保证在启动新实例之前，旧实例已经启动并就绪。这样，你就可以放心地将新实例加入到集群中，并且不会对其他实例造成影响。</p>
<p>你可以通过设置 <code v-pre>spec.serviceName</code> 字段来为 StatefulSet 创建一个 Headless Service，以便为每个 Pod 提供独立的 DNS 记录。这样，其他组件就可以通过这些记录进行服务发现，而不必依赖于负载均衡器。</p>
<p>例如，以下是创建一个 StatefulSet 的示例：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>stateful<span class="token punctuation">-</span>set
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>stateful<span class="token punctuation">-</span>set
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>app
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>app
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>app
        <span class="token key atrule">image</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>app<span class="token punctuation">:</span>latest
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
          <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
          <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，StatefulSet 会创建三个 Pod，分别命名为 <code v-pre>my-stateful-set-0</code>，<code v-pre>my-stateful-set-1</code>，<code v-pre>my-stateful-set-2</code>。它还会为每个 Pod 创建一个独立的 DNS 记录，名称分别为
<code v-pre>my-stateful-set-0.my-stateful-set.default.svc.cluster.local</code>，
<code v-pre>my-stateful-set-1.my-stateful-set.default.svc.cluster.local</code>，
<code v-pre>my-stateful-set-2.my-stateful-set.default.svc.cluster.local</code>。</p>
<p>此外，StatefulSet 还提供了其他功能来帮助管理有状态应用，比如：</p>
<ul>
<li>当更新应用时，StatefulSet 可以逐个地更新每个 Pod，以保证服务的可用性</li>
<li>当某个 Pod 失败时，StatefulSet 会自动重新创建一个新的 Pod 来替换它</li>
<li>当删除 StatefulSet 时，你可以选择保留或删除其所有的存储卷，以便在重新创建 StatefulSet 时使用相同的数据</li>
</ul>
<p><code v-pre>serviceName</code> 字段是 StatefulSet 中的一个可选字段，它指定了 StatefulSet 使用的 Headless Service 的名称。当你在 StatefulSet 中设置了 <code v-pre>serviceName</code> 字段时，Kubernetes 会自动为 StatefulSet 中的每个 Pod 创建一个独立的 DNS 记录。</p>
<p>例如，如果你在 StatefulSet 中设置了 <code v-pre>serviceName</code> 字段为 <code v-pre>my-service</code>，那么 StatefulSet 中的每个 Pod 都会有一个独立的 DNS 记录，名称分别为 <code v-pre>&lt;pod-name&gt;.my-service.default.svc.cluster.local</code>。</p>
<p>你可以在 StatefulSet 的 <code v-pre>spec</code> 字段中写入 <code v-pre>serviceName</code> 字段，如下所示：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> StatefulSet
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>stateful<span class="token punctuation">-</span>set
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>service
  <span class="token comment"># Other fields omitted for brevity</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>可以说 StatefulSet 是 deployment 的改良版，当然：</strong></p>
<ul>
<li>StatefulSet 用于管理有状态应用，它为每个 Pod 分配一个唯一的名称和 DNS 名称，并保证在启动新 Pod 之前，旧 Pod 已经启动并就绪。</li>
<li>Deployment 用于管理无状态应用，它可以自动地帮助你执行应用更新，并在某个 Pod 失败时自动重新创建一个新的 Pod。</li>
</ul>
<p><strong>也是支持滚动更新的：</strong></p>
<p>滚动更新是指，在不中断服务的情况下，逐个地更新 StatefulSet 中的每个 Pod。
可以使用 <code v-pre>kubectl rollout restart</code> 命令来重启 StatefulSet 中的所有 Pod，例如：
<code v-pre>kubectl rollout restart statefulset my-stateful-set</code>
这条命令会按照 StatefulSet 的启动顺序依次重启每个 Pod，以保证服务的可用性。
你也可以使用 <code v-pre>kubectl rollout status</code> 命令来查看滚动更新的进度，例如：
<code v-pre>kubectl rollout status statefulset my-stateful-set</code>
此外，你还可以使用 <code v-pre>kubectl rollout history</code> 命令来查看 StatefulSet 的滚动更新历史记录。</p>
<h2 id="statefulset-控制器" tabindex="-1"><a class="header-anchor" href="#statefulset-控制器" aria-hidden="true">#</a> StatefulSet 控制器</h2>
<p><strong>StatefulSet 控制器是直接控制 Pod 的。这一点和 deployment 不一样的。</strong></p>
<p>StatefulSet 是 Kubernetes 中的一种资源类型，它维护一组有序的、有状态的 Pod。StatefulSet 控制器会根据声明的策略创建、销毁和重启这些 Pod，并确保这些 Pod 的状态与声明的状态保持一致。</p>
<p>例如，你可以使用 StatefulSet 控制器来维护一组有序的数据库 Pod，其中每个 Pod 包含一个数据库副本。当你需要增加或者减少数据库副本时，只需要修改 StatefulSet 的定义即可。StatefulSet 控制器会自动创建或者销毁相应数量的 Pod，并确保这些 Pod 的状态与声明的。</p>
<p>除了创建、销毁和重启 Pod 之外，StatefulSet 还提供了许多其他功能。例如：</p>
<ul>
<li>保证 Pod 启动的顺序：StatefulSet 控制器会按照声明的顺序启动 Pod，从而确保 Pod 之间的依赖关系。</li>
<li>维护 Pod 的状态：StatefulSet 控制器会维护每个 Pod 的状态，并在出现故障时自动重启 Pod。</li>
<li>保证 Pod 名称的唯一性：StatefulSet 控制器会为每个 Pod 分配一个唯一的名称，这对于使用 DNS 服务发现等功能很有用。</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '37.md' style='float:left'>⬆️上一节🔗  </a><a href = '39.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


