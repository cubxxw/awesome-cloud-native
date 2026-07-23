<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第35节-client-go-写-k8s-控制器" tabindex="-1"><a class="header-anchor" href="#第35节-client-go-写-k8s-控制器" aria-hidden="true">#</a> 第35节 client-go 写 k8s 控制器</h1>
<div><a href = '34.md' style='float:left'>⬆️上一节🔗  </a><a href = '36.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="控制器" tabindex="-1"><a class="header-anchor" href="#控制器" aria-hidden="true">#</a> 控制器</h2>
<p>Contaoller 至少追踪一种类型的 Kubernetes 资源。这些 对象 有一个代表期望状态的 spec 字段，该资源的控制器负责确保当前状态接近期望状态。</p>
<p>kubernetes 官方一个 <a href="https://github.com/kubernetes/sample-controller" target="_blank" rel="noopener noreferrer">实现简单的 sample-controller<ExternalLinkIcon/></a> 案例</p>
<p>kubernetes 官方一个 <a href="https://github.com/rootsongjc/kubernetes-client-go-sample" target="_blank" rel="noopener noreferrer">简单的实现 client-go-sample<ExternalLinkIcon/></a> 案例</p>
<h2 id="client-go" tabindex="-1"><a class="header-anchor" href="#client-go" aria-hidden="true">#</a> client-go</h2>
<ul>
<li><a href="https://github.com/kubernetes/client-go" target="_blank" rel="noopener noreferrer">GitHub 地址<ExternalLinkIcon/></a></li>
</ul>
<p>我们如何和 Kubernetes 对话，是的，使用 kubectl 可以以 CRL 方式和 Kubernetes 交互。</p>
<p>如何使用 code 实现，是的，可以使用 client-go，这很重要！！！</p>
<h3 id="访问-kubernetes-集群的方式" tabindex="-1"><a class="header-anchor" href="#访问-kubernetes-集群的方式" aria-hidden="true">#</a> 访问 Kubernetes 集群的方式</h3>
<p>访问kubernetes集群有以下几种方式：</p>
<table>
<thead>
<tr>
<th>方式</th>
<th>特点</th>
<th>支持者</th>
</tr>
</thead>
<tbody>
<tr>
<td>Kubernetes dashboard</td>
<td>直接通过Web UI进行操作，简单直接，可定制化程度低</td>
<td>官方支持</td>
</tr>
<tr>
<td>kubectl</td>
<td>命令行操作，功能最全，但是比较复杂，适合对其进行进一步的分装，定制功能，版本适配最好</td>
<td>官方支持</td>
</tr>
<tr>
<td><a href="https://github.com/kubernetes/client-go" target="_blank" rel="noopener noreferrer">client-go<ExternalLinkIcon/></a></td>
<td>从kubernetes的代码中抽离出来的客户端包，简单易用，但需要小心区分kubernetes的API版本</td>
<td>官方支持</td>
</tr>
<tr>
<td><a href="https://github.com/kubernetes-incubator/client-python" target="_blank" rel="noopener noreferrer">client-python<ExternalLinkIcon/></a></td>
<td>python客户端，kubernetes-incubator</td>
<td>官方支持</td>
</tr>
<tr>
<td><a href="https://github.com/fabric8io/kubernetes-client" target="_blank" rel="noopener noreferrer">Java client<ExternalLinkIcon/></a></td>
<td>fabric8中的一部分，kubernetes的java客户端</td>
<td>Red Hat</td>
</tr>
</tbody>
</table>
<h2 id="简单的实现-client-go-sample" tabindex="-1"><a class="header-anchor" href="#简单的实现-client-go-sample" aria-hidden="true">#</a> 简单的实现 client-go-sample</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ go get github.com/rootsongjc/kubernetes-client-go-sample
$ <span class="token builtin class-name">cd</span> <span class="token variable">$GOPATH</span>/src/github.com/rootsongjc/kubernetes-client-go-sample
$ go build main.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该命令的用法如下。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> $ ./main
  <span class="token parameter variable">-app</span> string
        application name <span class="token punctuation">(</span>default <span class="token string">"app"</span><span class="token punctuation">)</span>
  <span class="token parameter variable">-deployment</span> string
        deployment name
  <span class="token parameter variable">-image</span> string
        new image name
  <span class="token parameter variable">-kubeconfig</span> string
        <span class="token punctuation">(</span>optional<span class="token punctuation">)</span> absolute path to the kubeconfig <span class="token function">file</span> <span class="token punctuation">(</span>default <span class="token string">"/Users/jimmy/.kube/config"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用不存在的image更新</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> $ ./main <span class="token parameter variable">-deployment</span> filebeat-test <span class="token parameter variable">-image</span> harbor-001.jimmysong.io/library/analytics-docker-test:Build_9 
Found deployment
name -<span class="token operator">></span> filebeat-test
Old image -<span class="token operator">></span> harbor-001.jimmysong.io/library/analytics-docker-test:Build_8
New image -<span class="token operator">></span> harbor-001.jimmysong.io/library/analytics-docker-test:Build_9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看Deployment的event。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl describe deployment filebeat-test   
Name:            filebeat-test
Namespace:        default
CreationTimestamp:    Fri, <span class="token number">19</span> May <span class="token number">2017</span> <span class="token number">15</span>:12:28 +0800
Labels:            k8s-app<span class="token operator">=</span>filebeat-test
Selector:        k8s-app<span class="token operator">=</span>filebeat-test
Replicas:        <span class="token number">2</span> updated <span class="token operator">|</span> <span class="token number">3</span> total <span class="token operator">|</span> <span class="token number">2</span> available <span class="token operator">|</span> <span class="token number">2</span> unavailable
StrategyType:        RollingUpdate
MinReadySeconds:    <span class="token number">0</span>
RollingUpdateStrategy:    <span class="token number">1</span> max unavailable, <span class="token number">1</span> max surge
Conditions:
  Type        Status    Reason
  ----        ------    ------
  Available     True    MinimumReplicasAvailable
  Progressing     True    ReplicaSetUpdated
OldReplicaSets:    filebeat-test-2365467882 <span class="token punctuation">(</span><span class="token number">2</span>/2 replicas created<span class="token punctuation">)</span>
NewReplicaSet:    filebeat-test-2470325483 <span class="token punctuation">(</span><span class="token number">2</span>/2 replicas created<span class="token punctuation">)</span>
Events:
  FirstSeen    LastSeen    Count    From                SubObjectPath    Type        ReasoMessage
  ---------    --------    -----    ----                -------------    --------    ------------
  2h        1m        <span class="token number">3</span>    <span class="token punctuation">{</span>deployment-controller <span class="token punctuation">}</span>            Normal        ScalingReplicaSet    Scaled down replica <span class="token builtin class-name">set</span> filebeat-test-2365467882 to <span class="token number">2</span>
  1m        1m        <span class="token number">1</span>    <span class="token punctuation">{</span>deployment-controller <span class="token punctuation">}</span>            Normal        ScalingReplicaSet    Scaled up replica <span class="token builtin class-name">set</span> filebeat-test-2470325483 to <span class="token number">1</span>
  1m        1m        <span class="token number">1</span>    <span class="token punctuation">{</span>deployment-controller <span class="token punctuation">}</span>            Normal        ScalingReplicaSet    Scaled up replica <span class="token builtin class-name">set</span> filebeat-test-2470325483 to <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到老的ReplicaSet从3个replica减少到了2个，有2个使用新配置的replica不可用，目前可用的replica是2个。</p>
<p>这是因为我们指定的镜像不存在，查看Deployment的pod的状态。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get pods <span class="token parameter variable">-l</span> k8s-app<span class="token operator">=</span>filebeat-test
NAME                             READY     STATUS             RESTARTS   AGE
filebeat-test-2365467882-4zwx8   <span class="token number">2</span>/2       Running            <span class="token number">0</span>          33d
filebeat-test-2365467882-rqskl   <span class="token number">2</span>/2       Running            <span class="token number">0</span>          33d
filebeat-test-2470325483-6vjbw   <span class="token number">1</span>/2       ImagePullBackOff   <span class="token number">0</span>          4m
filebeat-test-2470325483-gc14k   <span class="token number">1</span>/2       ImagePullBackOff   <span class="token number">0</span>          4m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到有两个pod正在拉取image。</p>
<p><strong>还原为原先的镜像</strong></p>
<p>将image设置为原来的镜像。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ./main <span class="token parameter variable">-deployment</span> filebeat-test <span class="token parameter variable">-image</span> harbor-001.jimmysong.io/library/analytics-docker-test:Build_8
Found deployment
name -<span class="token operator">></span> filebeat-test
Old image -<span class="token operator">></span> harbor-001.jimmysong.io/library/analytics-docker-test:Build_9
New image -<span class="token operator">></span> harbor-001.jimmysong.io/library/analytics-docker-test:Build_8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在再查看Deployment的状态。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl describe deployment filebeat-test   
Name:            filebeat-test
Namespace:        default
CreationTimestamp:    Fri, <span class="token number">19</span> May <span class="token number">2017</span> <span class="token number">15</span>:12:28 +0800
Labels:            k8s-app<span class="token operator">=</span>filebeat-test
Selector:        k8s-app<span class="token operator">=</span>filebeat-test
Replicas:        <span class="token number">3</span> updated <span class="token operator">|</span> <span class="token number">3</span> total <span class="token operator">|</span> <span class="token number">3</span> available <span class="token operator">|</span> <span class="token number">0</span> unavailable
StrategyType:        RollingUpdate
MinReadySeconds:    <span class="token number">0</span>
RollingUpdateStrategy:    <span class="token number">1</span> max unavailable, <span class="token number">1</span> max surge
Conditions:
  Type        Status    Reason
  ----        ------    ------
  Available     True    MinimumReplicasAvailable
  Progressing     True    NewReplicaSetAvailable
OldReplicaSets:    <span class="token operator">&lt;</span>none<span class="token operator">></span>
NewReplicaSet:    filebeat-test-2365467882 <span class="token punctuation">(</span><span class="token number">3</span>/3 replicas created<span class="token punctuation">)</span>
Events:
  FirstSeen    LastSeen    Count    From                SubObjectPath    Type        ReasoMessage
  ---------    --------    -----    ----                -------------    --------    ------------
  2h        8m        <span class="token number">3</span>    <span class="token punctuation">{</span>deployment-controller <span class="token punctuation">}</span>            Normal        ScalingReplicaSet    Scaled down replica <span class="token builtin class-name">set</span> filebeat-test-2365467882 to <span class="token number">2</span>
  8m        8m        <span class="token number">1</span>    <span class="token punctuation">{</span>deployment-controller <span class="token punctuation">}</span>            Normal        ScalingReplicaSet    Scaled up replica <span class="token builtin class-name">set</span> filebeat-test-2470325483 to <span class="token number">1</span>
  8m        8m        <span class="token number">1</span>    <span class="token punctuation">{</span>deployment-controller <span class="token punctuation">}</span>            Normal        ScalingReplicaSet    Scaled up replica <span class="token builtin class-name">set</span> filebeat-test-2470325483 to <span class="token number">2</span>
  2h        1m        <span class="token number">3</span>    <span class="token punctuation">{</span>deployment-controller <span class="token punctuation">}</span>            Normal        ScalingReplicaSet    Scaled up replica <span class="token builtin class-name">set</span> filebeat-test-2365467882 to <span class="token number">3</span>
  1m        1m        <span class="token number">1</span>    <span class="token punctuation">{</span>deployment-controller <span class="token punctuation">}</span>            Normal        ScalingReplicaSet    Scaled down replica <span class="token builtin class-name">set</span> filebeat-test-2470325483 to <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到available的replica个数恢复成3了。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '34.md' style='float:left'>⬆️上一节🔗  </a><a href = '36.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


