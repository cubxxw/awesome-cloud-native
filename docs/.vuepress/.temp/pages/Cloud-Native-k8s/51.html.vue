<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第51节-controller-manager" tabindex="-1"><a class="header-anchor" href="#第51节-controller-manager" aria-hidden="true">#</a> 第51节  Controller Manager</h1>
<div><a href = '50.md' style='float:left'>⬆️上一节🔗  </a><a href = '52.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h3 id="控制器处理流程" tabindex="-1"><a class="header-anchor" href="#控制器处理流程" aria-hidden="true">#</a> 控制器处理流程</h3>
<p><img src="http://sm.cubxxw.com/sm202303081726112.png" alt="img"></p>
<h3 id="informer-的内部工作机制" tabindex="-1"><a class="header-anchor" href="#informer-的内部工作机制" aria-hidden="true">#</a> informer 的内部工作机制</h3>
<p><img src="http://sm.cubxxw.com/sm202303081727144.png" alt="image-20230308172739991"></p>
<h3 id="控制器的协同流程" tabindex="-1"><a class="header-anchor" href="#控制器的协同流程" aria-hidden="true">#</a> 控制器的协同流程</h3>
<p><img src="http://sm.cubxxw.com/sm202303081726666.jpeg" alt="img"></p>
<h3 id="通用-controller" tabindex="-1"><a class="header-anchor" href="#通用-controller" aria-hidden="true">#</a> 通用 controller</h3>
<p>进入到 kube-controller-manager pod 中执行 <code v-pre>kube-controller-manager -h</code> 命令来查询默认启用的 controller。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl -n kube-system exec -it kube-controller-manager-cadmin -- kube-controller-manager -h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>常见 controller 如下：</p>
<ul>
<li>Job Controller：处理 job</li>
<li>Pod AutoScaler：处理 pod 的自动缩容/扩容。</li>
<li>RelicaSet：依据 Replicaset Spec 创建 Pod。</li>
<li>Service Controller：为 LoadBalancer type 的 service 创建 LB VIP。</li>
<li>ServiceAccount Controller：确保 serviceaccount 在当前 namespace 存在。</li>
<li>StatefulSet Controller：处理 statefulse t中的 pod。</li>
<li>Volume Controller: 依据 PV spec 创建 volume。</li>
<li>Resource quota Controller：在用户使用资源之后，更新状态。</li>
<li>Namespace Controller：保证 namespace 删除时，该 namespace 下的所有资源都先被删除</li>
<li>Replication Controller：创建 RC 后，负责创建 pod。</li>
<li>Node Controller：维护 node 状态，处理 evict 请求等。</li>
<li>Daemon Controller：依据 damonset 创建 pod。</li>
<li>Deployment Controller：依据 deployment spec 创建 replicaset。</li>
<li>Endpoint Controller：依据 service spec 创建 endpoint,依据 podip 更新 endpoint。</li>
<li>Garbage Collector：处理级联删除，比如删除 deployment 的同时删除 replicaset 以及 pod。</li>
<li>CronJob Controller：处理cronjob。</li>
</ul>
<h3 id="cloud-controller-manager" tabindex="-1"><a class="header-anchor" href="#cloud-controller-manager" aria-hidden="true">#</a> cloud controller manager</h3>
<p><strong>什么时候需要cloud controller manager?</strong></p>
<p>Cloud Controller Manager 自 Kubernetes1.6 开始，从 kube-controller-manager 中分离出来，主要因为 Cloud Controller Manager 往往需要跟企业 cloud 做深度集成，release cycle 跟 Kubernetes 相对独立。 与 Kubernetes 核心管理组件一起升级是一件费时费力的事。</p>
<p>通常 cloud controller manager 需要:</p>
<ul>
<li>认证授权：企业 cloud 往往需要认证信息，Kubernetes 要与 Cloud API 通信，需要获取 cloud 系统里的 ServiceAccount;</li>
<li>Cloud controller manager 本身作为一个用户态的 component, 需要在 Kubernetes 中有正确的 RBAC 设置，获得资源操作权限;</li>
<li>高可用：需要通过 leader election 来确保 cloud controller manger 高可用。</li>
</ul>
<p>cloud controller manager 是从老版本的 APIServer 分离出来的。 Kube-APIServer 和 kube-controller-manager 中一定不能指定 cloud-provider,否则会加载内置的 cloud controller manager。</p>
<p>Kubelet 要配置 --cloud-provider=external。</p>
<p>Cloud Controller Manage r主要支持:</p>
<ul>
<li>Node controller：
<ul>
<li>访问 cloud API,来更新 node 状态;</li>
<li>在 cloud 删除该节点以后，从 kubernetes 删除 node;</li>
</ul>
</li>
<li>Service controller：负责配置为 loadbalancer 类型的服务配置LB VIP;</li>
<li>Route Controller：在 cloud 环境配置路由;</li>
</ul>
<p>可以自定义任何需要的 Cloud Controller。</p>
<p>需要定制的 Cloud Controller</p>
<ul>
<li>Ingress controller;</li>
<li>Service Controller;</li>
<li>自主研发的controller ,比如之前提到的:
<ul>
<li>RBAC controller;</li>
<li>Account controller。</li>
</ul>
</li>
</ul>
<h4 id="来自生产的经验" tabindex="-1"><a class="header-anchor" href="#来自生产的经验" aria-hidden="true">#</a> 来自生产的经验</h4>
<p>保护好 controller manager 的 kubeconfig:</p>
<ul>
<li>此 kubeconfig 拥有所有资源的所有操作权限，防止普通用户通过 <code v-pre>kubectl exec kube-controller-manager ca</code>t 获取该文件。</li>
<li>用户可能做任何你想象不到的操作，然后来找你 support.</li>
</ul>
<p>Pod evict 后 IP 发生变化，但 endpoint 中的 address 更新失败:</p>
<ul>
<li>分析 stacktrace 发现 endpoint 在更新 LoadBalancer 时调用 gophercloud 连接 hang 住，导致 endpoint worker 线程全部卡死。</li>
</ul>
<h3 id="确保-scheduler-和-controller-的高可用" tabindex="-1"><a class="header-anchor" href="#确保-scheduler-和-controller-的高可用" aria-hidden="true">#</a> 确保 scheduler 和 controller 的高可用</h3>
<p>Leader Election Kubenetes 提供基于 configmap 和 endpoint 的 leader election类库。</p>
<blockquote>
<p>新版本提供了更轻量级的 lease 对象。</p>
</blockquote>
<p>Kubernetes 采用 leader election 模式启动 component 后，会创建对应 endpoint,并把当前的 leader 信息 annotate 到 endponit 上。</p>
<blockquote>
<p>和基于 etcd 的分布式锁差不多，很类似。</p>
</blockquote>
<p><img src="http://sm.cubxxw.com/sm202303081727954.png" alt="image-20230308172716820"></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '50.md' style='float:left'>⬆️上一节🔗  </a><a href = '52.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


