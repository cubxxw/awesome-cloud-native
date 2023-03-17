<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第57节-kube-proxy" tabindex="-1"><a class="header-anchor" href="#第57节-kube-proxy" aria-hidden="true">#</a> 第57节 kube-proxy</h1>
<div><a href = '56.md' style='float:left'>⬆️上一节🔗  </a><a href = '58.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="什么是-kube-proxy" tabindex="-1"><a class="header-anchor" href="#什么是-kube-proxy" aria-hidden="true">#</a> 什么是 kube-proxy</h2>
<p>台机器上都运行一个 kube-proxy 服务，它监听 API server 中 service 和 endpoint 的变化情况，并通过 iptables等来为服务配置负载均衡(仅支持TCP和UDP)。</p>
<blockquote>
<p>service 和 kube-proxy 之间的关系：</p>
<p>service 是一个对象， kube-proxy 是一个一直运行的组件，运行在每个节点上。</p>
<p>当然 kube-proxy 和其他 组件一样，不同于 kubeadm，也是被容器化 ~</p>
</blockquote>
<p>kube-proxy 可以直接运行在物理机上，也可以以 static pod 或者 DaemonSet 的方式运行。</p>
<p>kube-proxy 是 Kubernetes 的一个核心组件，它充当着负责为 Service 对象提供负载均衡功能的角色。在 Kubernetes 中，Service 是一种抽象的概念，它提供了一种访问一组 Pod 的方式，而不需要直接暴露 Pod 的 IP 地址。Service 可以通过 ClusterIP、NodePort 和 LoadBalancer 三种类型之一来定义，而 kube-proxy 则是负责管理这些 Service 的负载均衡。</p>
<p>kube-proxy 运行在每个节点上，<strong>并在 iptables 中维护了一组规则，这些规则实现了 Service 的负载均衡</strong>。kube-proxy 通过监视 API server 中 Service 和 Endpoint 的变化，自动更新 iptables 规则，从而确保负载均衡的正确性。</p>
<p><strong>kube-proxy 的核心实现是一个死循环，它会不断地检测 iptables 规则是否正确，并根据需要进行更新。</strong> 在每次循环中，kube-proxy 会分为两个阶段来处理 iptables 规则。</p>
<ul>
<li><strong>第一阶段</strong> 是 <code v-pre>sync</code> 阶段，它会检查当前的 iptables 规则是否正确，并根据需要更新规则。</li>
<li><strong>第二阶段</strong> 是 <code v-pre>watch</code> 阶段，它会监听 API server 中 Service 和 Endpoint 的变化，并在变化发生时更新 iptables 规则。</li>
</ul>
<p><strong>kube-proxy当前支持以下几种实现：</strong></p>
<ul>
<li><code v-pre>userspace</code>：最早的负载均衡方案，它在用户空间监听一个端口，所有服务通过 iptables 转发到这个端口，然后在其内部负载均衡到实际的 Pod。该方式最主要的问题是效率低,有明显的性能瓶颈。</li>
<li><code v-pre>iptables</code>：目前推荐的方案，<strong>完全以 iptables 规则的方式来实现 service 负载均衡。该方式最主要的问题是在服务多的时候产生太多的 iptables 规则，非增量式更新会引入一定的时延，大规模情况下有明显的性能问题。</strong></li>
<li><code v-pre>ipvs</code>：为解决 iptables 模式的性能问题，v1 .8 新增了 ipvs 模式，采用增量式更新，并可以保证 service 更新期间连接保持不断开</li>
<li><code v-pre>winuserspace</code>：同 userspace，但仅工作在 windows 上</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">提醒</p>
<p>除了 iptables 之外，kube-proxy 还支持 ipvs 和 userspace 两种模式来实现负载均衡。ipvs 模式是指使用 Linux 内核的 ipvs 模块来实现负载均衡，它比 iptables 模式更加高效，但需要额外安装 ipvsadm 工具和内核模块。userspace 模式则是指使用 kube-proxy 内置的负载均衡算法来实现负载均衡，它比 iptables 模式更加灵活，但相对来说性能较差。</p>
<p>当然，kube-proxy 并不是唯一实现 Kubernetes 负载均衡的方式。除了 kube-proxy 之外，还有一些第三方的负载均衡器，比如 haproxy、NGINX 等，它们可以通过 Kubernetes 的 Ingress API 来实现负载均衡。相比于 kube-proxy，这些第三方负载均衡器通常具有更加强大的负载均衡功能和调度策略，但需要额外安装和配置。</p>
</div>
<h2 id="linux-内核处理数据包-netfilter框架" tabindex="-1"><a class="header-anchor" href="#linux-内核处理数据包-netfilter框架" aria-hidden="true">#</a> Linux 内核处理数据包：Netfilter框架</h2>
<p>Netfilter 框架在 Linux 内核中的作用非常重要，它是一个用于对网络数据包进行过滤、修改和重定向等操作的网络处理框架。<strong>Netfilter 框架中的 iptables 子系统是其中最为常用的子系统之一，它可以通过配置 iptables 规则来控制网络数据包的流向</strong>。在 Kubernetes 中，kube-proxy 利用 <code v-pre>iptables</code> 规则来实现 Service 的负载均衡功能，而这些规则的实现正是基于 <code v-pre>Netfilter</code> 框架的。</p>
<p>除了 iptables 之外，Netfilter 框架还支持一些其他的子系统，比如 <code v-pre>ip6tables</code>（IPv6）、<code v-pre>ebtables</code>（Ethernet）等，它们可以分别用于处理不同类型的网络数据包。Netfilter 框架也支持一些扩展模块，比如 <code v-pre>conntrack</code>、<code v-pre>nat</code> 等，它们可以用于实现一些高级的网络功能，比如连接跟踪、端口映射等。</p>
<p>除了 iptables 之外，kube-proxy 还支持 ipvs 和 userspace 两种模式来实现负载均衡。ipvs 模式是指使用 Linux 内核的 ipvs 模块来实现负载均衡，它比 iptables 模式更加高效，但需要额外安装 <code v-pre>ipvsadm</code> 工具和内核模块。<code v-pre>userspace</code> 模式则是指使用 kube-proxy 内置的负载均衡算法来实现负载均衡，它比 iptables 模式更加灵活，但相对来说性能较差。</p>
<p><strong>在 Kubernetes 中，负载均衡是一个非常重要的主题。除了 kube-proxy 之外，还有一些第三方的负载均衡器，比如 haproxy、Nginx 等，它们可以通过 Kubernetes 的 Ingress API 来实现负载均衡。</strong> 相比于 kube-proxy，这些第三方负载均衡器通常具有更加强大的负载均衡功能和调度策略，但需要额外安装和配置。</p>
<p><img src="http://sm.nsddd.top/sm202303101236503.png" alt="image-20230310123653298"></p>
<h2 id="netfilter-iptables" tabindex="-1"><a class="header-anchor" href="#netfilter-iptables" aria-hidden="true">#</a> netfilter &amp; iptables</h2>
<p>在 Linux 系统中，网络数据包的处理流程通常可以分为用户空间和内核空间两个阶段。</p>
<ul>
<li>用户空间的网络处理程序通常是一些应用程序，比如 Web 服务器、负载均衡器等，它们负责处理网络请求、生成网络响应等操作，iptables 在用户空间。</li>
<li>而内核空间的网络处理程序则通常是一些驱动程序和内核模块，它们负责各种网络协议的实现、网络数据包的转发和过滤等操作，netfilter 是内核空间。</li>
</ul>
<p>Linux 系统中的 netfilter 框架是一个用于对网络数据包进行过滤、修改和重定向等操作的框架。该框架中的 iptables 子系统是其中最为常用的子系统之一，它可以通过配置 iptables 规则来控制网络数据包的流向。在 Kubernetes 中，kube-proxy 利用 iptables 规则来实现 Service 的负载均衡功能，而这些规则的实现正是基于 netfilter 框架的。</p>
<blockquote>
<p>在 Linux 系统中，网络协议栈通常由多个网络协议层组成，比如物理层、数据链路层、网络层、传输层、应用层等。每个网络协议层都负责处理不同的网络数据包，并将其传递给下一个网络协议层进行处理。其中，物理层和数据链路层主要负责传输数据包，网络层主要负责路由和 IP 地址的转换，传输层主要负责数据的分段和重组，应用层则负责具体的应用协议的实现。</p>
<p>在 Linux 系统中，用户空间的网络处理程序通常是通过套接字（socket）接口与内核空间的网络协议栈进行通信的。套接字是一种抽象的网络接口，它提供了一种简单而通用的编程接口，用于在应用程序和网络协议栈之间传递网络数据包。应用程序通过套接字接口向内核空间发送网络数据包，并通过该接口接收来自内核空间的网络数据包。</p>
<p>在 Linux 系统中，网络数据包的处理通常需要经过不同的网络协议栈处理。具体来说，当一个数据包到达网卡时，<strong>它会首先被传递到内核空间的网络协议栈中，经过各种协议的处理后，最终到达用户空间的网络处理程序。</strong> 而当一个数据包从用户空间返回时，它也需要经过相同的处理流程，最终到达网卡并被发送到网络中。</p>
</blockquote>
<p><img src="http://sm.nsddd.top/sm202303101255094.png" alt="image-20230310125525179"></p>
<h2 id="iptables-支持的锚点" tabindex="-1"><a class="header-anchor" href="#iptables-支持的锚点" aria-hidden="true">#</a> iptables 支持的锚点</h2>
<ul>
<li><strong>INPUT</strong> - 控制进入系统的流量和数据包。通过此链可以拒绝不必要的数据包以保证安全。</li>
<li><strong>OUTPUT</strong> - 控制从系统流出的流量和数据包。可以限制外部流量以保护数据。</li>
<li><strong>FORWARD</strong> - 控制流经系统的流量和数据包。可以控制系统作为路由器的流量。</li>
<li><strong>PREROUTING</strong> - 在数据包到达任何其他规则之前应用 NAT。</li>
<li><strong>POSTROUTING</strong> - 在数据包离开系统之前应用 NAT。</li>
<li><strong>BINPUT</strong> - 控制进入系统的流量和数据包。但此链在 <code v-pre>mangle</code> 表中，允许在数据包进入网络栈之前修改数据包。</li>
<li><strong>BOUTPUT</strong> - 控制从系统流出的流量和数据包。但此链在 <code v-pre>mangle</code> 表中，允许在数据包离开网络栈之前修改数据包。</li>
<li><strong>BPREROUTING</strong> - 在数据包到达任何其他规则之前应用 NAT。但此链在 <code v-pre>mangle</code> 表中，允许在数据包进入网络栈之前修改数据包。</li>
<li><strong>BPOSTROUTING</strong> - 在数据包离开系统之前应用 NAT。但此链在 <code v-pre>mangle</code> 表中，允许在数据包离开网络栈之前修改数据包。</li>
</ul>
<table>
<thead>
<tr>
<th>table/chain</th>
<th>PREROUTING</th>
<th>INPUT</th>
<th>FORWARD</th>
<th>OUTPUT</th>
<th>POSTROUTING</th>
</tr>
</thead>
<tbody>
<tr>
<td>raw</td>
<td>支持</td>
<td></td>
<td></td>
<td>支持</td>
<td></td>
</tr>
<tr>
<td>mangle</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>dnat</td>
<td>支持</td>
<td></td>
<td></td>
<td>支持</td>
<td></td>
</tr>
<tr>
<td>filter</td>
<td></td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
<td></td>
</tr>
<tr>
<td>snat</td>
<td></td>
<td>支持</td>
<td></td>
<td>支持</td>
<td>支持</td>
</tr>
</tbody>
</table>
<p>上面表格中的 <code v-pre>table/chain</code> 字段表示 <code v-pre>iptables</code> 中的表和链。其中：</p>
<ul>
<li><code v-pre>raw</code> 表：主要用于配置连接追踪和连接跟踪的规则</li>
<li><code v-pre>mangle</code> 表：主要用于修改数据包头部的信息</li>
<li><code v-pre>dnat</code> 表：主要用于网络地址转换，将目标地址转换为本地地址</li>
<li><code v-pre>filter</code> 表：主要用于过滤数据包，控制数据包的流动</li>
<li><code v-pre>snat</code> 表：主要用于网络地址转换，将源地址转换为本地地址</li>
</ul>
<p>在每个表中，都包含了不同的链，分别用于控制不同的数据包流向。其中：</p>
<ul>
<li><code v-pre>PREROUTING</code> 链：数据包进入路由前的处理</li>
<li><code v-pre>INPUT</code> 链：数据包到达本地主机后的处理</li>
<li><code v-pre>FORWARD</code> 链：数据包经过本机后的处理</li>
<li><code v-pre>OUTPUT</code> 链：数据包从本地主机出去后的处理</li>
<li><code v-pre>POSTROUTING</code> 链：数据包离开路由后的处理</li>
</ul>
<p>注意，<code v-pre>BINPUT</code>、<code v-pre>BOUTPUT</code>、<code v-pre>BPREROUTING</code> 和 <code v-pre>BPOSTROUTING</code> 链是在 <code v-pre>mangle</code> 表中的，它们在数据包进入/离开网络栈之前可以修改数据包。</p>
<p><strong>iptables：</strong></p>
<p><img src="http://sm.nsddd.top/sm202303101304089.png" alt="image-20230310130403937"></p>
<h2 id="kube-proxy-工作原理" tabindex="-1"><a class="header-anchor" href="#kube-proxy-工作原理" aria-hidden="true">#</a> kube-proxy 工作原理</h2>
<p><img src="http://sm.nsddd.top/sm202303101318439.png" alt="image-20230310131852316"></p>
<p><strong>查看 iptables 规则：</strong></p>
<ul>
<li>
<p><strong>iptables -L -t nat</strong>：查看 nat 表所有规则</p>
</li>
<li>
<p>iptables-save -t nat</p>
<p>：打印出 nat 表所有规则添加时的原始命令，更容易理解</p>
<ul>
<li>推荐使用该方式查看</li>
<li>和 iptables-restore 配合可以做备份用</li>
</ul>
</li>
</ul>
<p>如何快速找到 service 对应的 iptables 规则？</p>
<ul>
<li>ClusterIP 类型的 svc 直接使用 ip 去 <code v-pre>iptables-save</code> 的结果中搜索</li>
<li>NodePort 类型的 svc 则使用 port 去搜索</li>
</ul>
<p><strong>注意：</strong></p>
<ul>
<li>如果一个服务被配置为 ClusterIP 类型，那么他只有一个虚拟的 ClusterIP 可以在集群内部访问</li>
<li>如果是 NodePort 类型的 Service，则同时有 NodePort 以及 ClusterIP</li>
<li>如果是 LB 类型的 Service，则同时有 NodePort 以及 LB IP</li>
</ul>
<p><strong>原因？</strong></p>
<h2 id="nodeport-svc" tabindex="-1"><a class="header-anchor" href="#nodeport-svc" aria-hidden="true">#</a> NodePort SVC</h2>
<p>NodePort是一种Service类型，是ClusterIP Service的扩展。它在每个节点上打开一个端口，可以通过节点的IP地址和端口号访问Service。它通常用于需要从集群外部访问Service的情况，如测试和开发环境。</p>
<p>使用NodePort时，可以在Service定义中指定端口号，也可以让Kubernetes自动分配端口号。为了安全起见，建议指定NodePort的端口号，而不是使用自动分配的端口号。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>service
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>app
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了把集群中的服务，对外暴露，就可以使用 NodePort 类型的 Service。</p>
<p>在创建出 NodePort SVC 时，kube-proxy 就会监听对应的端口，这样客户端直接访问节点的该端口即可访问到对应服务。</p>
<blockquote>
<p>所有节点都有 <code v-pre>kube-proxy</code>，因此随便访问哪个节点都可以</p>
</blockquote>
<h2 id="lb-svc" tabindex="-1"><a class="header-anchor" href="#lb-svc" aria-hidden="true">#</a> LB SVC</h2>
<p>NodePort SVC 以及可以对外暴露服务了，但是节点可能会坏，为了保证高可用，一般会再接一个 LB。</p>
<p><strong>社区的 LB 方案：</strong> 客户端访问 LB，LB 再访问 NodePort，然后就进入 NodePort 的流程，根据 <code v-pre>iptables</code> 进行转发，最终进入 Pod。</p>
<p><strong>问题</strong>：这里存在两次转发，LB 这里已经负载均衡一次了，访问 NodePort 的时候 iptables 又会负载均衡一次，对性能有一定影响。</p>
<p><strong>云厂商改造：</strong></p>
<p>如果 node 有公网 IP 能全局路由的话，LB 直接通过公网IP访问到Pod，从而跳过 iptables。</p>
<p>因此很多云厂商都会改造社区方案，直接把 Pod IP 配置在 LB。</p>
<p><strong>问题：</strong></p>
<p>云厂商直接把 PodIP 配置在 LB 上也会引入其他问题，比如 Pod 挂了重启后 IP 变了，LB 那边需要同步更新，然后 Pod 变得不 Ready 了，LB 那边也要移除对应 IP。</p>
<p>因此 LB 压力会非常大，这部分需要做很多优化。</p>
<h2 id="真实场景-iptables-规则分析" tabindex="-1"><a class="header-anchor" href="#真实场景-iptables-规则分析" aria-hidden="true">#</a> 真实场景 iptables 规则分析</h2>
<p>svc ip 为 <code v-pre>10.97.35.60</code>，port 为 80，svc 代理的 pod 为 3个 nginx pod，IP分别如下：</p>
<p><img src="http://sm.nsddd.top/sm202303101329007.png" alt="img"></p>
<p>该 <code v-pre>svc</code> 对应的 <code v-pre>iptables</code> 规则为：</p>
<p><img src="http://sm.nsddd.top/sm202303101329310.png" alt="img"></p>
<ul>
<li>其中带箭头的第一条 <code v-pre>--dprot 30207</code> 是NodePort 类型的 svc 生成的规则</li>
<li>带箭头的第二条 <code v-pre>-d 10.97.356.60/32 -p tcp --dport 80</code> 是 ClusterIP 类型 svc 生成的规则</li>
</ul>
<p>然后后续的 <code v-pre>KUBE-SVC-XXX</code> 这些 chain，不同类型的 SVC 也是一样的，也就是说，<strong>不同类型的 <code v-pre>SVC</code> 的 <code v-pre>iptables</code> 规则只有入口部分不同</strong>。</p>
<p>另外如果是一个 <code v-pre>LB</code> 类型的 <code v-pre>SVC</code>，那么生成的规则和 <code v-pre>ClusterIP</code> 类型的 <code v-pre>SVC</code> 差不多，把目标 IP 替换成 LB IP 即可。</p>
<p>这些 iptables 规则会在所有节点上存在，也就是说，在 Pod 中访问 LB 类型的 svc，实际上流量根本不会真的从宿主机走到 LB，然后再转发会宿主机。从 Pod 中出去，到宿主机的时候检测到目标IP是 LB的时候就直接被 iptables 拦截了，然后就转发到对应 Pod。</p>
<p>另外 SVC IP 是 ping 不通的，因为该 IP 没有对应任何设备，只存在于 iptables 规则里，之所以能访问是被 iptables 进行了转发。</p>
<blockquote>
<p>因为 iptables 中该 svc 对应的规则中指定的是 目标IP+目标端口+ tcp 协议才处理，而 ping 是 icmp 协议。</p>
</blockquote>
<h2 id="k8s-的-iptables-规则" tabindex="-1"><a class="header-anchor" href="#k8s-的-iptables-规则" aria-hidden="true">#</a> k8s 的 iptables 规则</h2>
<p><img src="http://sm.nsddd.top/sm202303101327113.png" alt="img"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> KUBE-MARK-DROP <span class="token parameter variable">-j</span> MARK --set-xmark 0x8000/0x8000

<span class="token parameter variable">-A</span> KUBE-MARK-MASQ <span class="token parameter variable">-j</span> MARK --set-xmark 0x4000/0x4000

<span class="token parameter variable">-A</span> KUBE-POSTROUTING <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"kubernetes service traffic requiring SNAT"</span> <span class="token parameter variable">-m</span> mark <span class="token parameter variable">--mark</span> 

0x4000/0x4000 <span class="token parameter variable">-j</span> MASQUERADE

<span class="token parameter variable">-A</span> KUBE-SEP-55QZ6T7MF3AHPOOB <span class="token parameter variable">-s</span> <span class="token number">10.244</span>.1.6/32 <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"default/http:"</span> <span class="token parameter variable">-j</span> KUBE-MARK-MASQ

<span class="token parameter variable">-A</span> KUBE-SEP-55QZ6T7MF3AHPOOB <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"default/http:"</span> <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">-j</span> DNAT --to-destination 

<span class="token number">10.244</span>.1.6:80

<span class="token parameter variable">-A</span> KUBE-SEP-KJZJRL2KRWMXNR3J <span class="token parameter variable">-s</span> <span class="token number">10.244</span>.1.5/32 <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"default/http:"</span> <span class="token parameter variable">-j</span> KUBE-MARK-MASQ

<span class="token parameter variable">-A</span> KUBE-SEP-KJZJRL2KRWMXNR3J <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"default/http:"</span> <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">-j</span> DNAT --to-destination 

<span class="token number">10.244</span>.1.5:80

<span class="token parameter variable">-A</span> KUBE-SERVICES <span class="token parameter variable">-d</span> <span class="token number">10.101</span>.85.234/32 <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"default/http: cluster IP"</span> <span class="token parameter variable">-m</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">80</span> <span class="token parameter variable">-j</span> 

KUBE-SVC-7IMAZDGB2ONQNK4Z

<span class="token parameter variable">-A</span> KUBE-SVC-7IMAZDGB2ONQNK4Z <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"default/http:"</span> <span class="token parameter variable">-m</span> statistic <span class="token parameter variable">--mode</span> random --

probability <span class="token number">0.50000000000</span> <span class="token parameter variable">-j</span> KUBE-SEP-KJZJRL2KRWMXNR3J

<span class="token parameter variable">-A</span> KUBE-SVC-7IMAZDGB2ONQNK4Z <span class="token parameter variable">-m</span> comment <span class="token parameter variable">--comment</span> <span class="token string">"default/http:"</span> <span class="token parameter variable">-j</span> KUBE-SEP-55QZ6T7MF3AHPOOB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="iptables-的问题" tabindex="-1"><a class="header-anchor" href="#iptables-的问题" aria-hidden="true">#</a> iptables 的问题</h2>
<p>在大规模时 iptables 存在性能问题。</p>
<p>iptables 最初设计出来就是为了防火墙，一般也就几十上百条的规模。</p>
<p>在 k8s 集群中 iptables 几千上万条规则都是很常见的，而且 kube-proxy 更新 iptables 规则是全量更新，如果一个 svc 后面挂了 1000 个 Pod，其中一个 Pod 挂了，kube-proxy 就会重新生成一个包含 999 pod 的规则并进行替换，然后等 deploy 把一个新的 pod 拉起来的时候，又要生成一个 1000 pod 的规则来替换掉这个 999 pod 的规则。</p>
<p>因此大规模场景下，光是更新 iptables 规则都会消耗很多资源和时间。</p>
<h2 id="ipvs" tabindex="-1"><a class="header-anchor" href="#ipvs" aria-hidden="true">#</a> IPVS</h2>
<p>IPVS（IP Virtual Server）是Linux内核中的一种高性能的负载均衡技术，可以用于实现基于IP地址和端口号的流量分发。IPVS支持多种负载均衡算法，包括RR（Round Robin）、WRR（Weighted Round Robin）、LC（Least Connection）等，可以根据实际情况选择不同的算法。IPVS还支持会话保持（Session Persistence）、健康检查（Health Check）等高级功能，可以提高服务的可靠性和稳定性。</p>
<p>在Kubernetes中，IPVS可以用于实现Service的负载均衡和服务发现。当一个Service被创建时，Kubernetes会自动创建一个对应的IPVS虚拟服务器（Virtual Server），并将其配置为监听Service的ClusterIP地址和端口号。当有流量到达虚拟服务器时，IPVS会根据负载均衡算法选择一个或多个后端Pod，并将流量转发给它们。如果后端Pod发生故障或下线，IPVS会及时检测并自动从负载均衡池中删除它。</p>
<p>使用 IPVS 作为 Service 代理有多个优点。首先，IPVS 具有极高的性能和吞吐量，可以处理大量的并发请求。其次，IPVS支持多种负载均衡算法，可以根据实际情况选择最适合的算法。最后，IPVS支持会话保持和健康检查等高级功能，可以提高服务的可靠性和稳定性。</p>
<p>ipvs 和 iptables 类似，都是 netfilter 插件，但是钩子点不一样。</p>
<p><img src="http://sm.nsddd.top/sm202303101327722.png" alt="img"></p>
<p>ipvs 只有 <code v-pre>LOCAL_IN</code>、<code v-pre>FORWARD</code>、<code v-pre>LOCAL_OUT</code> 这 3 个地方有钩子，<code v-pre>PREROUTING</code> 这里是没有的，因此不能在路由之前做一些操作。</p>
<p>因此，如果按照 <code v-pre>iptables</code> 的逻辑在走的话，访问 <code v-pre>svc</code> 的流量过来后，在 PREROUTING 由于不能修改，因此会拿着 真实的 <code v-pre>clusterIP</code> 去路由，然后一看发现这个 IP 根本就达到不了，数据包直接就被丢弃了，或者能网络上这个IP能达到，就转发出去了。</p>
<blockquote>
<p>在 k8s 里的网段都是我们自己可以随便配置的，很可能就是外界的一个真实IP，能访问的话就走 FORWARD 这一步，不能访问就直接丢弃了。</p>
</blockquote>
<p><strong>因此在开启 ipvs 模式时，会在机器上创建一个叫做 ipvs0 的虚拟网卡</strong>，他会把所有 ClusterIP 绑定在这个网卡上，同时这个网卡不会接收 arp 请求，这样就是我们 ping svc ip 还是 ping 不通，但是可以访问。</p>
<p>通过这个 ipvs0 虚拟网卡就解决了路由这一步的问题，路由时发现这个 ip 是本机的 ip，因此就可以进入下一步了，下一步就是 LOCAL_IN，在这里 ipvs 就开始操作了。</p>
<p>小结：<strong>iptables 在 PREROUTING 处进行处理，ipvs 在 LOCAL_IN 处进行处理</strong>。</p>
<h2 id="ipvs-支持的锚点和核心函数" tabindex="-1"><a class="header-anchor" href="#ipvs-支持的锚点和核心函数" aria-hidden="true">#</a> IPVS 支持的锚点和核心函数</h2>
<table>
<thead>
<tr>
<th>HOOK</th>
<th>函数</th>
<th>核心函数</th>
<th>Priority</th>
</tr>
</thead>
<tbody>
<tr>
<td>NF_INET_LOCAL_IN</td>
<td>ip_vs_reply4</td>
<td>ip_vs_out</td>
<td>NF_IP_PRI_NAT_SRC - 2</td>
</tr>
<tr>
<td>NF_INET_LOCAL_IN</td>
<td>ip_vs_remote_request4</td>
<td>ip_vs_in</td>
<td>NF_IP_PRI_NAT_SRC - 1</td>
</tr>
<tr>
<td>NF_INET_LOCAL_OUT</td>
<td>ip_vs_local_reply4</td>
<td>ip_vs_out</td>
<td>NF_IP_PRI_NAT_DST + 1</td>
</tr>
<tr>
<td>NF_INET_LOCAL_OUT</td>
<td>ip_vs_local_request4</td>
<td>ip_vs_in</td>
<td>NF_IP_PRI_NAT_DST + 2</td>
</tr>
<tr>
<td>NF_INET_FORWARD</td>
<td>ip_vs_forward_icmp</td>
<td>ip_vs_in_icmp</td>
<td>99</td>
</tr>
<tr>
<td>NF_INET_FORWARD</td>
<td>ip_vs_reply4</td>
<td>ip_vs_out</td>
<td>100</td>
</tr>
</tbody>
</table>
<h2 id="k8s-切换-ipvs-或者-iptables" tabindex="-1"><a class="header-anchor" href="#k8s-切换-ipvs-或者-iptables" aria-hidden="true">#</a> k8s 切换 ipvs 或者 iptables</h2>
<p>kube-proxy 配置文件中有一个 mode 字段，用于指定使用 iptables 还是 ipvs。</p>
<blockquote>
<p>为空时默认为 iptables</p>
</blockquote>
<p>切换后需要删除 kube-proxy 使其重新加载配置，iptables 切换为 ipvs 还需要使用<code v-pre>iptables -F -t nat</code>命令手动把 iptables 规则刷掉。</p>
<p><strong>如果节点没有 ipvs 相关模块则会降级到 iptables。</strong></p>
<h2 id="ipvs-查询" tabindex="-1"><a class="header-anchor" href="#ipvs-查询" aria-hidden="true">#</a> ipvs 查询</h2>
<p>可以使用 ipvsadm -L 命令进行查询</p>
<p>相比之下 ipvs 的规则看起来会比较清晰，但是对于新手来说 iptables 中能比较清晰的看到具体的流转过程，ipvs 就没有这些细节。</p>
<h2 id="ip伪装" tabindex="-1"><a class="header-anchor" href="#ip伪装" aria-hidden="true">#</a> IP伪装</h2>
<p>某些情况下可能需要把数据包伪装成从Node发出去的，而不是Pod发出去的，一般是在 POSTROUTING 这里进行处理，但是 ipvs 没有这个能力，因此这种场景下还是需要使用 iptables 进行配合。</p>
<p>但是这种场景的 iptables 规则比较少，就不用担心性能问题了。</p>
<p>同时还可以使用 ipset 进一步提升性能。</p>
<h2 id="faq" tabindex="-1"><a class="header-anchor" href="#faq" aria-hidden="true">#</a> FAQ</h2>
<p><strong>为什么每个节点都需要全量的 iptables 规则，不能专门几台节点做这个吗？</strong></p>
<p>k8s 要实现的是在任意一个节点的请求负载均衡都能直接在本地就完成，而不是先跳转到某个节点在进行转发，因此每个节点都需要全量的 iptables 规则。</p>
<p><strong>iptables 和 ipvs 都配置了，那么请求进来会都走一遍吗？先后顺序呢?</strong></p>
<p>先走 iptables，如果 iptables 走完了还能满足 ipvs 的条件就会在走 ipvs，不过一般 iptables 处理完（比如 DNAT）之后就不满足 ipvs 的条件了，因此两个都配置也不会影响正常使用。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '56.md' style='float:left'>⬆️上一节🔗  </a><a href = '58.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


