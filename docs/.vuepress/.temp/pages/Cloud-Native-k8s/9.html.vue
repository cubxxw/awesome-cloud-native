<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第9节-pod" tabindex="-1"><a class="header-anchor" href="#第9节-pod" aria-hidden="true">#</a> 第9节 Pod</h1>
<div><a href = '8.md' style='float:left'>⬆️上一节🔗  </a><a href = '10.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#理解pod">理解Pod</router-link></li><li><router-link to="#删除pod">删除pod</router-link></li><li><router-link to="#管理对象的两种方式">管理对象的两种方式</router-link><ul><li><router-link to="#命令行指令">命令行指令</router-link></li><li><router-link to="#声明式配置">声明式配置</router-link></li></ul></li><li><router-link to="#yaml-语法">yaml 语法</router-link></li><li><router-link to="#配置对象">配置对象</router-link></li><li><router-link to="#配置文件创建pod">配置文件创建pod</router-link></li><li><router-link to="#可视化界面创建pod">可视化界面创建pod</router-link></li><li><router-link to="#pod日志">pod日志</router-link></li><li><router-link to="#pod-ip">pod - IP</router-link></li><li><router-link to="#进入pod并修改pod">进入pod并修改pod</router-link></li><li><router-link to="#多容器pod细节">多容器pod细节</router-link></li><li><router-link to="#更多命令">更多命令</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="理解pod" tabindex="-1"><a class="header-anchor" href="#理解pod" aria-hidden="true">#</a> 理解Pod</h2>
<blockquote>
<p>什么是pod？</p>
<p><img src="http://sm.nsddd.top/sm981878-20181221191353859-412884495.png" alt="img"></p>
</blockquote>
<p>pod是<strong>运行中的一组容器</strong>，pod是kubernetes中应用的最小单位。</p>
<blockquote>
<p>什么是CRI？（container runtime interface）</p>
</blockquote>
<p>或许你可以理解是docker，<strong>CRI就是容器运行时的环境</strong>。我们开发的应用就能以容器化的方式运行~</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>💡 那么k8s为了管理方便，又封装了pod，所以说pod是容器运行的最小单位~</p>
<ul>
<li>每一个容器封装成一个pod</li>
<li>每个pod可能有一个或者多个容器，但是也称之为一组容器</li>
</ul>
<blockquote>
<p>pod是可以有多个容器的，而且组成原子，这个是和容器的区别~</p>
</blockquote>
</div>
<p>⚡ 描述某一个pod是如何运行的</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl describe pod my-nginx-7fb96c846b-m9rjp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="custom-container details"><summary>展开查看详情💡</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master03 ~<span class="token punctuation">]</span><span class="token comment"># kubectl get pod</span>
NAME                        READY   STATUS    RESTARTS      AGE
my-nginx-7fb96c846b-cnhbz   <span class="token number">1</span>/1     Running   <span class="token number">2</span> <span class="token punctuation">(</span>92m ago<span class="token punctuation">)</span>   38h
my-nginx-7fb96c846b-g55km   <span class="token number">1</span>/1     Running   <span class="token number">2</span> <span class="token punctuation">(</span>92m ago<span class="token punctuation">)</span>   38h
my-nginx-7fb96c846b-m9rjp   <span class="token number">1</span>/1     Running   <span class="token number">2</span> <span class="token punctuation">(</span>92m ago<span class="token punctuation">)</span>   38h
<span class="token punctuation">[</span>root@k8s-master03 ~<span class="token punctuation">]</span><span class="token comment"># kubectl describe pod my-nginx-7fb96c846b-m9rjp</span>
Name:             my-nginx-7fb96c846b-m9rjp
Namespace:        default
Priority:         <span class="token number">0</span>
Service Account:  default
Node:             k8s-master03/192.168.0.4
Start Time:       Thu, <span class="token number">20</span> Oct <span class="token number">2022</span> <span class="token number">22</span>:05:22 +0800
Labels:           <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
                  pod-template-hash<span class="token operator">=</span>7fb96c846b
Annotations:      cni.projectcalico.org/containerID: 66626e89ebcb580eeef3f2e75d7d860fe14ee213458642f7b25a860e164ea9a3
                  cni.projectcalico.org/podIP: <span class="token number">100.66</span>.195.18/32
                  cni.projectcalico.org/podIPs: <span class="token number">100.66</span>.195.18/32
Status:           Running
IP:               <span class="token number">100.66</span>.195.18
IPs:
  IP:           <span class="token number">100.66</span>.195.18
Controlled By:  ReplicaSet/my-nginx-7fb96c846b
Containers:
  nginx:
    Container ID:   containerd://85c401a1bca6531519ad09b539ee57bb2b508b370d71053926a1df0b5421597e
    Image:          nginx:1.14.2
    Image ID:       docker.io/library/nginx@sha256:f7988fb6c02e0ce69257d9bd9cf37ae20a60f1df7563c3a2a6abe24160306b8d
    Port:           <span class="token number">80</span>/TCP
    Host Port:      <span class="token number">0</span>/TCP
    State:          Running
      Started:      Sat, <span class="token number">22</span> Oct <span class="token number">2022</span> <span class="token number">11</span>:27:59 +0800
    Last State:     Terminated
      Reason:       Unknown
      Exit Code:    <span class="token number">255</span>
      Started:      Fri, <span class="token number">21</span> Oct <span class="token number">2022</span> <span class="token number">11</span>:10:13 +0800
      Finished:     Sat, <span class="token number">22</span> Oct <span class="token number">2022</span> <span class="token number">11</span>:27:01 +0800
    Ready:          True
    Restart Count:  <span class="token number">2</span>
    Environment:    <span class="token operator">&lt;</span>none<span class="token operator">></span>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-x77br <span class="token punctuation">(</span>ro<span class="token punctuation">)</span>
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-x77br:
    Type:                    Projected <span class="token punctuation">(</span>a volume that contains injected data from multiple sources<span class="token punctuation">)</span>
    TokenExpirationSeconds:  <span class="token number">3607</span>
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <span class="token operator">&lt;</span>nil<span class="token operator">></span>
    DownwardAPI:             <span class="token boolean">true</span>
QoS Class:                   BestEffort
Node-Selectors:              <span class="token operator">&lt;</span>none<span class="token operator">></span>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute <span class="token assign-left variable">op</span><span class="token operator">=</span>Exists <span class="token keyword">for</span> 300s
                             node.kubernetes.io/unreachable:NoExecute <span class="token assign-left variable">op</span><span class="token operator">=</span>Exists <span class="token keyword">for</span> 300s
Events:                      <span class="token operator">&lt;</span>none<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><strong>我们只要看<code v-pre>Events</code>就好了~</strong></p>
<p>可以查看状态和原因，可以去排查事故原因</p>
<h2 id="删除pod" tabindex="-1"><a class="header-anchor" href="#删除pod" aria-hidden="true">#</a> 删除pod</h2>
<div class="custom-container tip"><p class="custom-container-title">由于k8s的概念很多，删除需要指定概念</p>
<ul>
<li>指定命名空间，不指定是默认</li>
<li>指定删除<code v-pre>pod</code></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl delete pod mypodName <span class="token parameter variable">-n</span> xxxNamespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<h2 id="管理对象的两种方式" tabindex="-1"><a class="header-anchor" href="#管理对象的两种方式" aria-hidden="true">#</a> 管理对象的两种方式</h2>
<h3 id="命令行指令" tabindex="-1"><a class="header-anchor" href="#命令行指令" aria-hidden="true">#</a> 命令行指令</h3>
<p>使用 <code v-pre>kubectl</code> 命令来创建和管理 <code v-pre>kubernetes</code> 对象</p>
<p>简单、高效快速但是功能有限，操作不容易追溯，多用于开发和调试。</p>
<h3 id="声明式配置" tabindex="-1"><a class="header-anchor" href="#声明式配置" aria-hidden="true">#</a> 声明式配置</h3>
<p><code v-pre>kubernetes</code> 使用 <code v-pre>yaml</code> 文件来描述 <code v-pre>kubernetes</code> 对象</p>
<p>声明式配置就好比申请表，学习难度大而且配置麻烦</p>
<p>好处是操作留痕迹，适合操作复杂的对象，多用于生产</p>
<h2 id="yaml-语法" tabindex="-1"><a class="header-anchor" href="#yaml-语法" aria-hidden="true">#</a> yaml 语法</h2>
<ul>
<li>缩进代表上下级关系</li>
<li>缩进时使用空格，不要使用tab，通常使用2个空格</li>
<li>使用双引号，不要使用单引号</li>
<li><code v-pre>:</code> 键值对的分隔符，前面不要有空格，后面要有空格</li>
<li><code v-pre>-</code> 数组的分隔符，前后都要有空格</li>
<li><code v-pre>#</code> 注释，后面要有空格</li>
<li><code v-pre>|</code> 多行文本，后面要有空格，后面可以有换行</li>
<li><code v-pre>&gt;</code> 多行文本，后面要有空格</li>
<li><code v-pre>---</code> yaml文件的分隔符，前后都要有空格</li>
</ul>
<h2 id="配置对象" tabindex="-1"><a class="header-anchor" href="#配置对象" aria-hidden="true">#</a> 配置对象</h2>
<p><strong>在创建 Kubernetes 对象所对应的 <code v-pre>yaml</code> 文件中，需要配置的字段：</strong></p>
<ul>
<li><code v-pre>apiVersion</code> ：Kubernetes API 版本</li>
<li><code v-pre>Kind</code> ：对象类别，例如 <code v-pre>Pod</code> 、<code v-pre>Deployment</code></li>
<li><code v-pre>metadata</code> ：描述对象的元数据，包括一个 name 字符串、UID 和 可选的<code v-pre>namespace</code></li>
<li><code v-pre>spec</code> ：对象的配置</li>
</ul>
<h2 id="配置文件创建pod" tabindex="-1"><a class="header-anchor" href="#配置文件创建pod" aria-hidden="true">#</a> 配置文件创建pod</h2>
<p>我们或许可以用配置文件的方式去创建一个pod~</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># vim pod.yaml </span>
<span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl apply -f pod.yaml </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">yaml创建pod格式</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod  <span class="token comment"># 资源类型</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>  
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">run</span><span class="token punctuation">:</span> myapp
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp  <span class="token comment"># pod名称</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment"># pod详细配置信息</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span> <span class="token comment"># 启动一个容器</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx <span class="token comment"># 启动nginx</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> mynginx
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">:</span>8.5.68
    <span class="token key atrule">name</span><span class="token punctuation">:</span> mytomcat
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">name</span><span class="token punctuation">:</span> myredis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022153945150.png" alt="image-20221022153945150"></p>
<blockquote>
<p>可能会出现pod状态处于ContainerCreating的情况，常见的原因之一是镜像拉取失败。</p>
</blockquote>
</div>
<p>💡容器的创建详情查看如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl describe pod mynginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="custom-container details"><summary>⚡ 展开查看详情</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl describe pod mynginx</span>
Name:             mynginx
Namespace:        default
Priority:         <span class="token number">0</span>
Service Account:  default
Node:             k8s-master03/192.168.0.4
Start Time:       Sat, <span class="token number">22</span> Oct <span class="token number">2022</span> <span class="token number">13</span>:20:17 +0800
Labels:           <span class="token assign-left variable">run</span><span class="token operator">=</span>mynginx
Annotations:      cni.projectcalico.org/containerID: 9fc6db4dd24c4816b28be43c1f2907c89adea8fadb36fb49844fea42142671e7
                  cni.projectcalico.org/podIP: <span class="token number">100.66</span>.195.25/32
                  cni.projectcalico.org/podIPs: <span class="token number">100.66</span>.195.25/32
Status:           Running
IP:               <span class="token number">100.66</span>.195.25
IPs:
  IP:  <span class="token number">100.66</span>.195.25
Containers:
  mynginx:
    Container ID:   containerd://69b25d59d551f94e8f7cc659ef3b740765e23673b60f45de7353cfbc13d52420
    Image:          nginx
    Image ID:       docker.io/library/nginx@sha256:5ffb682b98b0362b66754387e86b0cd31a5cb7123e49e7f6f6617690900d20b2
    Port:           <span class="token operator">&lt;</span>none<span class="token operator">></span>
    Host Port:      <span class="token operator">&lt;</span>none<span class="token operator">></span>
    State:          Running
      Started:      Sat, <span class="token number">22</span> Oct <span class="token number">2022</span> <span class="token number">13</span>:21:13 +0800
    Ready:          True
    Restart Count:  <span class="token number">0</span>
    Environment:    <span class="token operator">&lt;</span>none<span class="token operator">></span>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-m6rqn <span class="token punctuation">(</span>ro<span class="token punctuation">)</span>
  myredis:
    Container ID:   containerd://e72e35e2f7dda8d6108a89e98c41da32b4678eab31cf26c8406eeaee5e3ecc3c
    Image:          redis
    Image ID:       docker.io/library/redis@sha256:c95835a74c37b3a784fb55f7b2c211bd20c650d5e55dae422c3caa9c01eb39fa
    Port:           <span class="token operator">&lt;</span>none<span class="token operator">></span>
    Host Port:      <span class="token operator">&lt;</span>none<span class="token operator">></span>
    State:          Running
      Started:      Sat, <span class="token number">22</span> Oct <span class="token number">2022</span> <span class="token number">13</span>:21:47 +0800
    Ready:          True
    Restart Count:  <span class="token number">0</span>
    Environment:    <span class="token operator">&lt;</span>none<span class="token operator">></span>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-m6rqn <span class="token punctuation">(</span>ro<span class="token punctuation">)</span>
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-m6rqn:
    Type:                    Projected <span class="token punctuation">(</span>a volume that contains injected data from multiple sources<span class="token punctuation">)</span>
    TokenExpirationSeconds:  <span class="token number">3607</span>
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <span class="token operator">&lt;</span>nil<span class="token operator">></span>
    DownwardAPI:             <span class="token boolean">true</span>
QoS Class:                   BestEffort
Node-Selectors:              <span class="token operator">&lt;</span>none<span class="token operator">></span>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute <span class="token assign-left variable">op</span><span class="token operator">=</span>Exists <span class="token keyword">for</span> 300s
                             node.kubernetes.io/unreachable:NoExecute <span class="token assign-left variable">op</span><span class="token operator">=</span>Exists <span class="token keyword">for</span> 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  113s  default-scheduler  Successfully assigned default/mynginx to k8s-master03
  Normal  Pulling    112s  kubelet            Pulling image <span class="token string">"nginx"</span>
  Normal  Pulled     58s   kubelet            Successfully pulled image <span class="token string">"nginx"</span> <span class="token keyword">in</span> <span class="token number">54</span>.707721222s
  Normal  Created    57s   kubelet            Created container mynginx
  Normal  Started    57s   kubelet            Started container mynginx
  Normal  Pulling    57s   kubelet            Pulling image <span class="token string">"redis"</span>
  Normal  Pulled     23s   kubelet            Successfully pulled image <span class="token string">"redis"</span> <span class="token keyword">in</span> <span class="token number">33</span>.819467112s
  Normal  Created    23s   kubelet            Created container myredis
  Normal  Started    23s   kubelet            Started container myredis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><img src="http://sm.nsddd.top/smimage-20221022132504701.png" alt="image-20221022132504701"></p>
<h2 id="可视化界面创建pod" tabindex="-1"><a class="header-anchor" href="#可视化界面创建pod" aria-hidden="true">#</a> 可视化界面创建pod</h2>
<div class="custom-container danger"><p class="custom-container-title">注意</p>
<p>这个板块待补充~ 欢迎pr</p>
</div>
<h2 id="pod日志" tabindex="-1"><a class="header-anchor" href="#pod日志" aria-hidden="true">#</a> pod日志</h2>
<p>好像只有pod有日志把？</p>
<blockquote>
<p>和docker的日志一样用法</p>
</blockquote>
<p>我们查看pod日志：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl logs mynginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022133031267.png" alt="image-20221022133031267"></p>
<p>⚡ 可以加上 <code v-pre>-f</code> 追踪式日志</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl logs -f  mynginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022133159587.png" alt="image-20221022133159587"></p>
<h2 id="pod-ip" tabindex="-1"><a class="header-anchor" href="#pod-ip" aria-hidden="true">#</a> pod - IP</h2>
<p>⚡ 每个pod – k8s都会分配一个ip，使用下面命令查看：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-owide</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://sm.nsddd.top/smimage-20221022150442624.png" alt="image-20221022150442624"></p>
<h2 id="进入pod并修改pod" tabindex="-1"><a class="header-anchor" href="#进入pod并修改pod" aria-hidden="true">#</a> 进入pod并修改pod</h2>
<p>🗓️ 回忆我们docker修改容器内部</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> idName <span class="token comment">#/bin/bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>使用K8s进入pod命令：</strong></p>
<blockquote>
<p>和docker命令大致一样，注意后面有 <code v-pre>–</code></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mynginx -- /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022151001187.png" alt="image-20221022151001187"></p>
<div class="custom-container tip"><p class="custom-container-title">可视化界面</p>
<p>可以直接进去k8s的可视化界面进行修改~</p>
</div>
<h2 id="多容器pod细节" tabindex="-1"><a class="header-anchor" href="#多容器pod细节" aria-hidden="true">#</a> 多容器pod细节</h2>
<div class="custom-container warning"><p class="custom-container-title">提醒⚠️</p>
<p>在<code v-pre>Kubernetes</code>中部署应用时，都是以<code v-pre>pod</code>进行调度的，它们基本上是单个容器的包装或房子。从某种意义上说，容器的容器。 <code v-pre>pod</code>是一个逻辑包装实体，用于在<code v-pre>K8s</code>集群上执行容器。可以把每个<code v-pre>pod</code>想象成一个透明的包装，为容器提供一个插槽。<code v-pre>pod</code>是<code v-pre>Kubernetes</code>最小的可部署单位。<code v-pre>pod</code>是一组一个或多个容器，具有共享的存储/网络资源，以及如何运行容器的规范。因此，最简单地说，<code v-pre>pod</code>是一个容器如何在<code v-pre>Kubernetes</code>中“用起来”的机制。</p>
<ul>
<li>
<p>pod是k8s的最小单元，容器包含在pod中，一个pod中有一个pause容器和若干个业务容器，而容器是单独的一个容器，简而言之，pod是一组容器的集合。</p>
</li>
<li>
<p>pod相当于逻辑主机，每个pod都有自己的ip地址</p>
</li>
<li>
<p><strong>pod内的容器共享相同的ip和端口</strong></p>
</li>
<li>
<p>默认情况下，每个容器的文件系统与其他容器完全隔离</p>
</li>
<li>
<p><strong>pod是一组容器，一个pod也是可以部署两个甚至是多个容器</strong></p>
</li>
</ul>
</div>
<h2 id="更多命令" tabindex="-1"><a class="header-anchor" href="#更多命令" aria-hidden="true">#</a> 更多命令</h2>
<p><strong>更多命令：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看全部</span>
kubectl get all

<span class="token comment"># 重新部署</span>
kubectl rollout restart deployment test-k8s

<span class="token comment"># 命令修改镜像，--record 表示把这个命令记录到操作历史中</span>
kubectl <span class="token builtin class-name">set</span> image deployment test-k8s test-k8s<span class="token operator">=</span>ccr.ccs.tencentyun.com/k8s-tutorial/test-k8s:v2-with-error <span class="token parameter variable">--record</span>

<span class="token comment"># 暂停运行，暂停后，对 deployment 的修改不会立刻生效，恢复后才应用设置</span>
kubectl rollout pause deployment test-k8s

<span class="token comment"># 恢复</span>
kubectl rollout resume deployment test-k8s

<span class="token comment"># 输出到文件</span>
kubectl get deployment test-k8s <span class="token parameter variable">-o</span> yaml <span class="token operator">>></span> app2.yaml

<span class="token comment"># 删除全部资源</span>
kubectl delete all <span class="token parameter variable">--all</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>遗留问题：</summary>
<ul>
<li>每次只能访问一个 pod，没有负载均衡自动转发到不同 pod</li>
<li>访问还需要端口转发</li>
<li>Pod 重创后 IP 变了，名字也变了</li>
</ul>
</details>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '8.md' style='float:left'>⬆️上一节🔗  </a><a href = '10.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


