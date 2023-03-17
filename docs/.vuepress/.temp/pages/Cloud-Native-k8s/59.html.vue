<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第59节-coredns-和-ingress" tabindex="-1"><a class="header-anchor" href="#第59节-coredns-和-ingress" aria-hidden="true">#</a> 第59节 CoreDNS 和 Ingress</h1>
<div><a href = '58.md' style='float:left'>⬆️上一节🔗  </a><a href = '60.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="域名服务" tabindex="-1"><a class="header-anchor" href="#域名服务" aria-hidden="true">#</a> 域名服务</h2>
<p>在 Kubernetes 中，每个节点都有一个或多个 Pod 运行。每个 Pod 都有一个唯一的 IP 地址，但是由于 Pod 的生命周期是不确定的，因此使用这些 IP 地址来访问 Pod 不是一个好的选择。相反，Kubernetes 通过使用服务（service）来解决这个问题。</p>
<p>服务是一种抽象，它定义了一组逻辑上相似的 Pod，并为它们提供了一个稳定的 IP 地址和端口。这使得客户端可以直接访问服务，而无需了解服务后面的具体 Pod。但是，服务的 IP 地址仍然可能会发生变化。为了解决这个问题，Kubernetes 引入了域名服务（DNS）。</p>
<blockquote>
<p>我们如果删除一个 Service 的话，这个 IP 可能也会变更的，而且我们访问网站并不是访问 IP 的，一定是去访问域名的，所以 IP 是没有意义的。</p>
<p>我们再创建一个service 的时候，可以通过 <code v-pre>name</code> 和 <code v-pre>namespace</code> 唯一标识一种资源。</p>
</blockquote>
<p>Kubernetes 的 DNS 服务提供了一个 DNS 域名 <code v-pre>kube-system.svc.cluster.local</code>，它将解析为所有服务的 IP 地址。每个服务都有一个 DNS 域名，该域名由服务名称和名称空间组成。例如，名称空间为 <code v-pre>default</code>，名称为 <code v-pre>my-service</code> 的服务的 DNS 域名为 <code v-pre>my-service.default.svc.cluster.local</code>。</p>
<p>当客户端向服务发送请求时，它们将使用 DNS 解析服务的 DNS 域名来获取服务的 IP 地址。然后，客户端可以使用该 IP 地址和服务的端口来访问服务。</p>
<p>Kubernetes 已经在 DNS 服务上做出了很大的努力，以提供可扩展性和灵活性。通过使用 DNS 服务，Kubernetes 用户可以轻松地访问其服务，同时还可以保持域名的稳定性，而无需担心服务的底层 Pod IP 地址发生变化。</p>
<ul>
<li><code v-pre>Kubernetes Service</code> 通过虚拟 IP 地址或者节点端口为用户应用提供访问入口</li>
<li>然而这些 IP 地址和端口是动态分配的，如果用户重建一个服务，其分配的 <code v-pre>clusterIP</code> 和 <code v-pre>nodePort</code>，以及<code v-pre>LoadBalancerIP</code> 都是会变化的，我们不能把一个可变的入口发布出去供他人访问</li>
<li>Kubernetes 提供了内置的域名服务，用户定义的服务会自动获得域名，而无论服务重建多少次，只要服务名不改变，其对应的域名就不会改变</li>
</ul>
<h2 id="coredns" tabindex="-1"><a class="header-anchor" href="#coredns" aria-hidden="true">#</a> CoreDNS</h2>
<p>在 Kubernetes 中，DNS 服务是非常重要的一部分，它为 Kubernetes 用户提供了一个简单的方式来访问服务，并为 Kubernetes 提供了可扩展性和灵活性。<strong><code v-pre>CoreDNS</code> 是 Kubernetes 中默认的 DNS 服务器，它是一个高度可配置的 DNS 服务器，支持插件化架构。CoreDNS 可以与 Kubernetes API 一起使用，以自动发现服务和端点，从而提供可伸缩的 DNS 服务。</strong></p>
<p><code v-pre>CoreDNS</code> 支持多个插件，包括 Kubernetes 插件、文件插件、重定向插件和缓存插件等。<strong>Kubernetes 插件是 <code v-pre>CoreDNS</code> 中最重要的插件之一，它可以自动发现 Kubernetes 中的服务和端点，并将其映射到域名。</strong> 这使得 Kubernetes 用户可以轻松地访问其服务，而无需了解服务的底层 IP 地址。</p>
<p>另一个重要的插件是文件插件，它可以从文件中读取 DNS 记录。这使得用户可以使用文件来管理其 DNS 记录，而无需使用其他工具或服务。重定向插件和缓存插件则可以帮助提高 CoreDNS 的性能和可靠性。</p>
<p>在 Kubernetes 中，CoreDNS 通常作为 Kubernetes 集群中的默认 DNS 服务器。为了使用 CoreDNS，<strong>管理员需要在 Kubernetes 中创建一个 ConfigMap，其中包含 CoreDNS 的配置信息。</strong> 然后，管理员可以使用 <code v-pre>kubectl apply</code> 命令将此 ConfigMap 应用到 Kubernetes 集群中。一旦 CoreDNS 配置完成，<strong>Kubernetes 用户可以使用 DNS 解析服务的 DNS 域名来访问其服务，而无需了解服务的底层 IP 地址。</strong></p>
<p>CoreDNS 包含一个内存态 DNS，以及与其他 controller 类似的控制器。</p>
<p><strong>CoreDNS 的实现原理是：控制器监听 Service 和 Endpoint 的变化并配置 DNS，客户端 Pod 在进行域名解析时，从CoreDNS 中查询服务对应的地址记录。</strong></p>
<p><img src="http://sm.nsddd.top/sm202303121718455.png" alt="img"></p>
<h3 id="不同类型服务的解析记录" tabindex="-1"><a class="header-anchor" href="#不同类型服务的解析记录" aria-hidden="true">#</a> 不同类型服务的解析记录</h3>
<p><strong>普通 Service：</strong></p>
<p>Service DNS 记录是用于服务发现的记录。每个 Kubernetes Service 都会被分配一个唯一的 DNS 名称，这个 DNS 名称将会被映射到 Service 的 Cluster IP。这个 DNS 名称的格式为：<code v-pre>&lt;service-name&gt;.&lt;namespace-name&gt;.svc.cluster.local</code>。</p>
<ul>
<li>ClusterIP、 nodePort、 LoadBalancer 类型的 Service 都拥有 API Server 分配的 ClusterIP, CoreDNS 会为这些Service 创建 FQDN 格式为 <code v-pre>$svcname.$namespace.svc.$clusterdomain: clusterIP</code> 的 A 记录及 PTR 记录，并为端口创建 SRV 记录。</li>
</ul>
<p><strong>Headless Service:</strong></p>
<p>Pod DNS 记录是用于在集群内部进行通信的记录。每个 Pod 都会被分配一个唯一的 DNS 名称，这个 DNS 名称将会被映射到 Pod 的 IP 地址。这个 DNS 名称的格式为：<code v-pre>&lt;pod-ip-address&gt;.&lt;namespace-name&gt;.pod.cluster.local</code>。</p>
<ul>
<li>顾名思义，无头,是用户在 Spec 显式指定 ClusterIP 为 None 的 Service,对于这类 Service,API Server 不会为其分配 ClusterlP。CoreDNS 为此类 Service 创建多条 A 记录，并且目标为每个就绪的 PodIP。另外，每个 Pod 会拥有一个FQDN格式为 <code v-pre>$podname. $svcname. $namespace.svc.$clusterdomain</code>的 A 记录指向 PodIP。</li>
</ul>
<p><strong>ExternalName Service:</strong></p>
<p>ExternalName DNS 记录是用于将 Kubernetes Service 映射到集群外部的记录。这种记录允许将 Service 映射到一个外部的 DNS 名称上，而不是映射到 Service 的 Cluster IP。这个 DNS 记录的格式为：<code v-pre>&lt;external-name&gt;.&lt;namespace-name&gt;.svc.cluster.local</code>。</p>
<ul>
<li>此类 Service 用来引用一个已经存在的域名，CoreDNS 会为该 Service 创建一 个 CName 记录指向目标域名。</li>
</ul>
<h3 id="k8s-中的域名解析" tabindex="-1"><a class="header-anchor" href="#k8s-中的域名解析" aria-hidden="true">#</a> k8s 中的域名解析</h3>
<p>Kubernetes 中的域名解析规则如下：</p>
<ul>
<li>Pod 可以通过自己的 hostname 直接访问自己；</li>
<li>Pod 可以通过其他 Pod 的 hostname 直接访问其他 Pod；</li>
<li>Pod 可以通过 Service 的名称访问 Service。</li>
</ul>
<p>其中，Pod 的 hostname 是 Pod 名称加上 Namespace 名称，例如：<code v-pre>podname.namespacename.svc.cluster.local</code>。这个域名可以在 Pod 内部直接使用，也可以在其他 Pod 中使用。Service 的名称是 Service 名称加上 Namespace 名称，例如：<code v-pre>servicename.namespacename.svc.cluster.local</code>。通过这个域名可以访问 Service。</p>
<p>Kubernetes 内置的 DNS 服务会自动为每个 Namespace 创建一个 DNS 子域名 <code v-pre>svc.cluster.local</code>，用来存储该 Namespace 中所有的 Service。在这个子域名下，每个 Service 都会被解析为其对应的 Cluster IP 地址。此外，Kubernetes 还支持将 Service 解析为对应的 Pod IP 地址，只需要使用 Service 的名称加上一个后缀 <code v-pre>.pod</code> 即可，例如：<code v-pre>servicename.namespacename.svc.cluster.local.pod</code>。</p>
<ul>
<li>Kubernetes Pod 有一个与 DNS 策略相关的属性 <code v-pre>DNSPolicy</code>，默认值是 <code v-pre>ClusterFirst</code></li>
<li>Pod 启动后的 <code v-pre>/etc/resolv.conf</code> 会被改写，所有的地址解析优先发送至 <code v-pre>CoreDNS</code></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">cat</span> /etc/resolv.conf
search ns1.svc.cluster.local sVC.cluster.local cluster.local
nameserver <span class="token number">192.168</span>.0.10
options ndots:4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>我们查看 pod 的细节发现：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k get pod  kube-scheduler-cubmaster01 <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-oyaml</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> dns
  dnsPolicy: ClusterFirst
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>ClusterFirst</code>：使用 Kubernetes 集群内部的 DNS 服务解析域名。如果 DNS 解析失败，则继续尝试使用 Pod 的 hosts 文件解析。这是默认策略。</li>
<li><code v-pre>ClusterFirstWithHostNet</code>：同样使用 Kubernetes 集群内部的 DNS 服务解析域名，但是还将主机网络命名空间中的 /etc/resolv.conf 文件复制到 Pod 中，以便 Pod 中的进程可以使用主机网络中的 DNS 服务解析域名。</li>
<li><code v-pre>Default</code>：使用主机上的 DNS 解析器解析域名。这个策略通常用于需要访问主机网络中的资源的 Pod。</li>
<li><code v-pre>None</code>：禁用 DNS 解析。这个策略通常用于需要手动配置 hosts 文件的 Pod。</li>
</ul>
</blockquote>
<p><strong>上面又出现了一个新的问题，没错，在默认情况下如果解析失败的话使用 Pod 的 hosts 文件解析，那么这个有什么用？</strong></p>
<blockquote>
<p>Pod 的 hosts 文件可以用于在容器中解析其他 Pod 的 IP 和 hostname，以及解析 Service 的名称。通过 hosts 文件，容器中的进程可以直接使用其他 Pod 和 Service 的域名来访问它们，而不需要进行额外的配置。这样可以简化应用程序的开发和部署，并且可以提高应用程序的可移植性。</p>
<p>可以看出 host 文件内容和宿主机的内容一样；</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span>   kube-proxy-995ck  <span class="token parameter variable">-n</span> kube-system -- <span class="token function">sh</span>
<span class="token comment"># cat /etc/hosts</span>
<span class="token comment"># Kubernetes-managed hosts file (host network).</span>
<span class="token number">127.0</span>.0.1 localhost
<span class="token number">127.0</span>.1.1 smile
<span class="token comment"># The following lines are desirable for IPv6 capable hosts</span>
::1 ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
<span class="token number">192.168</span>.71.130 cubmaster01
<span class="token number">192.168</span>.71.131 cubnode01
<span class="token number">192.168</span>.71.132 cubnode02
<span class="token number">192.168</span>.71.130 node01
<span class="token number">192.168</span>.71.134 node02
<span class="token number">192.168</span>.71.133 master01
<span class="token comment"># GitHub520 Host Start</span>
<span class="token number">140.82</span>.113.3 github.com
<span class="token number">192.168</span>.137.133 sea.hub <span class="token comment">#hostalias-set-by-sealer</span>
<span class="token number">192.168</span>.137.133 apiserver.cluster.local <span class="token comment">#hostalias-set-by-sealer</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>介绍 <code v-pre>/etc/resolv.conf</code> 文件， 它的作用是什么？</strong></p>
<p><strong><code v-pre>/etc/resolv.conf</code> 文件包含了域名解析器的配置信息。</strong> 在 Kubernetes 中，每个 Pod 启动后都会自动生成一个 <code v-pre>/etc/resolv.conf</code> 文件，其中包含了一个或多个 DNS 服务器的地址。这些 DNS 服务器用于解析 Pod 中使用的域名。默认情况下，<code v-pre>/etc/resolv.conf</code> 文件会指向 Kubernetes 集群中的 DNS 服务器。如果需要使用其他的 DNS 服务器，可以通过 Pod 的 <code v-pre>dnsConfig</code> 字段来进行配置。</p>
<p>在 <code v-pre>/etc/resolv.conf</code> 文件中，可以指定多个 DNS 服务器的地址。这些地址可以是 IP 地址，也可以是域名。如果指定的是域名，那么系统会首先使用 <code v-pre>/etc/hosts</code> 文件中的信息来解析这个域名，如果找不到对应的 IP 地址，那么就会将 DNS 请求发送到指定的 DNS 服务器上进行解析。</p>
<p>下面是一个示例的 <code v-pre>/etc/resolv.conf</code> 文件的内容：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>nameserver <span class="token number">10.96</span>.0.10
search default.svc.cluster.local svc.cluster.local cluster.local
options ndots:5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，<code v-pre>nameserver</code> 指定了 DNS 服务器的地址，<code v-pre>search</code> 指定了搜索域名的顺序，<code v-pre>options</code> 指定了一些选项，例如最大重试次数、超时时间等等。</p>
<p>需要注意的是，<code v-pre>/etc/resolv.conf</code> 文件是一个动态生成的文件，每次 Pod 重启时都会重新生成。如果需要在 <code v-pre>/etc/resolv.conf</code> 文件中添加自定义的配置信息，可以使用 Kubernetes 的 ConfigMap 对象来进行配置，然后在 Pod 中使用 Volume 将 ConfigMap 挂载到 <code v-pre>/etc/resolv.conf</code> 文件所在的目录中。</p>
<blockquote>
<p>疑问：当 Pod 启动时，同一 Namespace 的所有 Service 都会以环境变量的形式设置到容器内，影响?</p>
</blockquote>
<h3 id="关于-dns-的落地实践" tabindex="-1"><a class="header-anchor" href="#关于-dns-的落地实践" aria-hidden="true">#</a> 关于 DNS 的落地实践</h3>
<p>Kubernetes 作为企业基础架构的一部分，Kubernetes 服务也需要发布到企业 DNS,需要定制企业 DNS 控制器</p>
<ul>
<li>对于 Kubernetes 中的服务,在企业 DNS 同样创建 <code v-pre>A/PTR/SRV records</code> (通常解析地址是 <code v-pre>LoadBalancer VIP</code> )</li>
<li>针对 <code v-pre>headless service</code>，在 PodIP 可全局路由的前提下，按需创建 DNS records</li>
<li><code v-pre>Headless service</code> 的 DNS 记录，应该按需创建，否则对企业 DNS 冲击过大</li>
</ul>
<p>服务在集群内通过 <code v-pre>CoreDNS</code> 寻址，在集群外通过企业 <code v-pre>DNS</code> 寻址，服务在集群内外有统一标识。</p>
<h2 id="ingress" tabindex="-1"><a class="header-anchor" href="#ingress" aria-hidden="true">#</a> Ingress</h2>
<ul>
<li><a href="https://kubernetes.io/zh-cn/docs/concepts/services-networking/ingress/" target="_blank" rel="noopener noreferrer">Kubernetes ingress<ExternalLinkIcon/></a></li>
</ul>
<p>Kubernetes的Service对象提供了基于L4的负载均衡功能，它通过使用ClusterIP、NodePort等机制将外部流量路由到后端Pod中。与基于L4的服务不同，基于L7的服务可以根据HTTP请求的URL路径、主机名等信息进行负载均衡。Kubernetes的Ingress对象就是一种基于L7的服务，它可以提供更加灵活和强大的负载均衡机制。</p>
<p>Ingress是一种Kubernetes对象，它充当着从外部到Kubernetes集群中服务的入口。它最主要的功能是将外部流量路由到集群内的不同服务中。Ingress可以通过不同的规则来将不同的URL路径路由到不同的服务中，从而提供负载均衡和基于名称的虚拟托管。</p>
<h3 id="k8s-中的负载均衡技术" tabindex="-1"><a class="header-anchor" href="#k8s-中的负载均衡技术" aria-hidden="true">#</a> k8s 中的负载均衡技术</h3>
<p><strong>基于L4 的服务：</strong></p>
<ul>
<li>基于 <code v-pre>iptables/ipvs</code> 的分布式四层（传输层）负载均衡技术</li>
<li>多种 Load Balancer Provider 提供与企业现有 ELB 的整合</li>
<li>kube- proxy 基于 iptables rules 为 Kubernetes 形成全局统一的 distributed load balancer</li>
<li>kube- proxy 是一种 mesh, Internal Client 无论通过 podip, nodeport还 是 LB VIP 都经由 kube-proxy 跳转至 pod</li>
<li>属于 Kubernetes core</li>
</ul>
<p><strong>基于L7 的 Ingress：</strong></p>
<ul>
<li>基于七层应用层，提供更多功能</li>
<li>TLS termination</li>
<li>L7 path forwarding</li>
<li>URL/http header rewrite</li>
<li>与采用 7 层软件紧密相关</li>
</ul>
<p><strong>📜 对上面的解释：</strong></p>
<blockquote>
<p>总之，虽然<code v-pre>Service</code>是Kubernetes中的一种基本对象，但是在一些场景中可能无法满足需求。如果需要更加灵活和强大的负载均衡机制，就需要使用Ingress。使用Ingress可以根据HTTP请求的URL路径、主机名等信息进行负载均衡，提供SSL终止和基于名称的虚拟托管等功能，从而更加灵活地控制服务的流量。因此，在一些需要强大负载均衡机制的场景中，<code v-pre>Ingress</code>是必不可少的。</p>
</blockquote>
<h3 id="service-和-ingress-对比" tabindex="-1"><a class="header-anchor" href="#service-和-ingress-对比" aria-hidden="true">#</a> Service 和 Ingress 对比</h3>
<p><img src="http://sm.nsddd.top/sm202303131655593.png" alt="test"></p>
<p><strong>网络七层也称为OSI参考模型：</strong> 物理层、数据链路层、网络层、传输层、会话层、表示层和应用层。</p>
<p><strong>基于 L4（传输层） 的服务</strong></p>
<ul>
<li>每个应用独占 ELB，浪费资源</li>
<li>为每个服务动态创建 DNS 记录，频繁的 DNS 更新</li>
<li>支持 TCP 和 UDP，业务部门需要启动 HTTPS 服务，自己管理证书</li>
</ul>
<p><strong>基于 L7 （应用层）的 <code v-pre>Ingress</code></strong></p>
<ul>
<li>多个应用共享 ELB，节省资源</li>
<li>多个应用共享一个<code v-pre>Domain</code>，可采用静态 DNS 配置</li>
<li>TLS termination 发生在 Ingress 层，可集中管理证书</li>
<li>更多复杂性，更多的网络 hop</li>
</ul>
<h3 id="ingress如何工作" tabindex="-1"><a class="header-anchor" href="#ingress如何工作" aria-hidden="true">#</a> Ingress如何工作？</h3>
<p>Ingress通过使用HTTP和HTTPS协议将外部流量路由到集群内部的服务中。它通过将外部请求映射到后端服务的方式来实现这一目的。Ingress对于外部流量的路由是通过使用不同的规则来实现的。每个规则都定义了一个URL路径以及应该将请求路由到哪个后端服务。在Kubernetes集群中，Ingress Controller负责实现这些规则，并将请求路由到正确的后端服务。</p>
<p><strong>ingress 安装完成后，我们查看就需要：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ kubectl get pod -n ingress-nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>所以安装完成后本质上还是一个pod，pod 中有两个进程，一个是 nginx、一个是 ingress controller。</strong></p>
<blockquote>
<p>需要注意的是，Pod 不是一个进程，而是一个或多个容器的集合。每个容器都是一个独立的进程，但它们共享相同的主机和网络空间。因此，在 Pod 内运行的容器可以通过本地主机名进行通信，而无需公开 Pod 的 IP 地址。</p>
</blockquote>
<h2 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> nginx</h2>
<p>nginx 是一款高性能的 Web 服务器，也是一个反向代理服务器和负载均衡器。在 ingress 中，nginx 用于处理来自外部的请求并将它们路由到正确的服务上。此外，nginx 还可以提供 SSL 加密和解密以及 HTTP 缓存等功能。</p>
<h3 id="ingress-controller" tabindex="-1"><a class="header-anchor" href="#ingress-controller" aria-hidden="true">#</a> Ingress Controller</h3>
<p><strong>Ingress Controller是一个运行在Kubernetes集群中的Pod，它负责读取Ingress对象中的规则，并将请求路由到正确的后端服务中。</strong> Kubernetes并没有提供自带的Ingress Controller实现，但是有很多第三方的Ingress Controller可以选择使用。<strong>常见的Ingress Controller包括Nginx Ingress Controller，Traefik Ingress Controller和HAProxy Ingress Controller等。</strong></p>
<blockquote>
<p><strong>为什么要做成插件？</strong></p>
<p>因为没有一通的局面，需要根据自己的需要去配置，比如说 Treafik 在某些地方可以代替 Ingress。就比如 k3s 就是用的 Treafik</p>
</blockquote>
<table>
<thead>
<tr>
<th>Ingress Controller</th>
<th>GitHub地址</th>
<th>功能</th>
<th>优点</th>
<th>缺点</th>
</tr>
</thead>
<tbody>
<tr>
<td>Nginx Ingress Controller</td>
<td>https://github.com/kubernetes/ingress-nginx</td>
<td>Nginx Ingress Controller是目前最受欢迎的Ingress Controller之一，为Kubernetes集群中的服务提供L7负载均衡。它是一个官方维护的开源项目，因此得到了广泛的开源社区支持。Nginx Ingress Controller的配置灵活，支持多种负载均衡算法，包括轮询、IP哈希、最少连接、会话保持和权重等。此外，Nginx Ingress Controller还支持SSL终止、基于主机名的路由、基于URI的路由、限制连接速率等高级功能。</td>
<td>开源社区支持广泛，配置灵活，支持多种负载均衡算法</td>
<td>配置复杂，安装和部署相对较麻烦</td>
</tr>
<tr>
<td>Traefik Ingress Controller</td>
<td>https://github.com/containous/traefik</td>
<td>Traefik Ingress Controller是一个动态配置路由规则并将请求转发到不同的后端服务的Ingress Controller。它支持多种后端服务，包括Kubernetes、Docker Swarm、Mesos、Rancher、Consul、Etcd等，可以自动化配置，具有可视化面板。Traefik Ingress Controller还支持基于主机名、基于路径、基于头文件等多种路由规则，支持限速、负载均衡、SSL终止等功能。</td>
<td>支持多种后端服务，自动化配置，可视化面板</td>
<td>性能较差，不支持长连接</td>
</tr>
<tr>
<td>HAProxy Ingress Controller</td>
<td>https://github.com/haproxytech/haproxy-ingress</td>
<td>HAProxy Ingress Controller是一个通过L4/L7负载平衡来实现服务的管理的Ingress Controller。它是一个高性能的负载均衡器，支持长连接和高并发。HAProxy Ingress Controller具有可定制性强的特点，可以根据业务需求进行配置。此外，它支持基于路径、基于主机名、基于头文件等多种路由规则，支持SSL终止、限速、基于IP的访问控制、基于HTTP响应代码的健康检查等高级功能。</td>
<td>性能卓越，支持长连接，可定制性强</td>
<td>部署相对较麻烦，处理复杂请求时性能较差</td>
</tr>
</tbody>
</table>
<h3 id="ingress规则" tabindex="-1"><a class="header-anchor" href="#ingress规则" aria-hidden="true">#</a> Ingress规则</h3>
<p><img src="http://sm.nsddd.top/sm202303131740631.png" alt="image-20230313174006575"></p>
<p>Ingress规则通过定义不同的 URL 路径以及应该将请求路由到哪个后端服务来实现外部流量的路由。每个规则都包含了一个或多个 HTTP 路径以及对应的后端服务。下面是一个例子：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>ingress
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /app1
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> service1
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /app2
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> service2
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子定义了一个Ingress规则，它将URL路径 <code v-pre>/app1</code> 路由到service1服务中，将URL路径 <code v-pre>/app2</code> 路由到service2服务中。</p>
<h3 id="ingress资源" tabindex="-1"><a class="header-anchor" href="#ingress资源" aria-hidden="true">#</a> Ingress资源</h3>
<p>在Kubernetes中，Ingress是一种API对象，<a href="http://xn--networking-n22pu56fdsmhjal180d.k8s.io/v1beta1%E7%89%88%E6%9C%AC%E7%9A%84API%E7%BB%84%E4%B8%AD%E3%80%82%E8%A6%81%E4%BD%BF%E7%94%A8Ingress%EF%BC%8C%E5%BF%85%E9%A1%BB%E5%85%88%E9%83%A8%E7%BD%B2%E4%B8%80%E4%B8%AAIngress" target="_blank" rel="noopener noreferrer">它被定义在networking.k8s.io/v1beta1版本的API组中，要使用Ingress，必须先部署一个Ingress Controller<ExternalLinkIcon/></a>  ，并创建一个或多个Ingress对象。下面是一个例子：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>ingress
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> example.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /app1
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> service1
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子定义了一个Ingress对象，它将URL路径 <code v-pre>/app1</code> 路由到service1服务中，并将主机名<code v-pre>example.com</code>映射到该服务中。</p>
<h3 id="ingress-annotations" tabindex="-1"><a class="header-anchor" href="#ingress-annotations" aria-hidden="true">#</a> Ingress Annotations</h3>
<p><code v-pre>Ingress Annotations</code> 是一种机制，可以向Ingress Controller提供额外的配置信息。Ingress Annotations以键值对的形式定义在<code v-pre>Ingress</code>对象的 <code v-pre>metadata.annotations</code>字段中。下面是一个例子：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>ingress
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/rewrite-target</span><span class="token punctuation">:</span> /
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> example.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /app1
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> service1
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子向Nginx Ingress Controller提供了一个Annotation，它将URL路径中的<code v-pre>/app1</code>重写为<code v-pre>/</code>。</p>
<h3 id="ingress-tls" tabindex="-1"><a class="header-anchor" href="#ingress-tls" aria-hidden="true">#</a> Ingress TLS</h3>
<p>Ingress TLS是一种机制，可以向<code v-pre>Ingress</code>对象添加SSL终止功能。要使用 <code v-pre>Ingress TLS</code>，必须先为要使用的域名创建一个TLS证书，并将其存储在Kubernetes Secrets中。下面是一个例子：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>ingress
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> example.com
    <span class="token key atrule">secretName</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>tls
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> example.com
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /app1
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> service1
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子向Ingress对象添加了一个TLS证书，它将主机名example.com映射到service1服务中，并使用名为 <code v-pre>example-tls</code> 的证书进行SSL终止。</p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p><strong>Ingress：</strong></p>
<ul>
<li>Ingress 是一层代理</li>
<li>负责根据 hostname 和 path 将流量转发到不同的服务上，使得一个负载均衡器用于多个后台应</li>
<li>Kubernetes Ingress Spe c是转发规则的集合</li>
</ul>
<p><strong>Ingress Controller：</strong></p>
<ul>
<li>确保实际状态( Actual)与期望状态(Desired) 一致的Control Loop</li>
<li>Ingress Controller确保
<ul>
<li>负载均衡配置</li>
<li>边缘路由配置</li>
<li>DNS配置</li>
</ul>
</li>
</ul>
<p>拿 Nginx Ingress 举例。</p>
<p>Ingress Controller 的作用就是监听集群中的 ingress 对象配置，并生成 nginx.conf 配置文件，然后调用 nginx reload 命令重新加载配置文件。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '58.md' style='float:left'>⬆️上一节🔗  </a><a href = '60.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


