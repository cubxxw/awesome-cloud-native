<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第55节-服务发现" tabindex="-1"><a class="header-anchor" href="#第55节-服务发现" aria-hidden="true">#</a> 第55节 服务发现</h1>
<div><a href = '54.md' style='float:left'>⬆️上一节🔗  </a><a href = '56.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="服务发布" tabindex="-1"><a class="header-anchor" href="#服务发布" aria-hidden="true">#</a> 服务发布</h2>
<p>需要把服务发布至集群内部或者外部，服务的不同类型</p>
<ul>
<li>ClusterIP ( Headless)</li>
<li>NodePort</li>
<li>LoadBa lancer</li>
<li>ExternalName</li>
</ul>
<p>证书管理和七层负载均衡的需求 需要gRPC负载均衡如何做? DNS需求 与上下游服务的关系</p>
<h3 id="服务发布的挑战" tabindex="-1"><a class="header-anchor" href="#服务发布的挑战" aria-hidden="true">#</a> 服务发布的挑战</h3>
<p>kube-dns</p>
<ul>
<li>DNS TTL 问题</li>
</ul>
<p>Service</p>
<ul>
<li>ClusterIP 只能对内</li>
<li>kube-proxy 支持的 iptables/ipvs 规模有限</li>
<li>IPVS 的性能和生产化问题</li>
<li>kube- proxy 的 drift 问题</li>
<li>频繁的 Pod 变动(spec change, failover, crashloop) 导致 LB 频繁变更</li>
<li>对外发布的 Service 需要与企业 ELB 即成</li>
<li>不支持 gRPC</li>
<li>不支持自定义 DNS 和高级路由功能</li>
</ul>
<p>Ingress</p>
<ul>
<li>Spec 的成熟度?</li>
</ul>
<p>其他可选方案?</p>
<h3 id="跨地域部署" tabindex="-1"><a class="header-anchor" href="#跨地域部署" aria-hidden="true">#</a> 跨地域部署</h3>
<ul>
<li>需要多少实例</li>
<li>如何控制失败域，部署在几个地区，AZ,集群?</li>
<li>如何进行精细的流量控制</li>
<li>如何做按地域的顺序更新</li>
<li>如何回滚</li>
</ul>
<h2 id="微服务架构下的高可用挑战" tabindex="-1"><a class="header-anchor" href="#微服务架构下的高可用挑战" aria-hidden="true">#</a> 微服务架构下的高可用挑战</h2>
<h3 id="服务发现" tabindex="-1"><a class="header-anchor" href="#服务发现" aria-hidden="true">#</a> 服务发现</h3>
<ul>
<li>微服务架构是由一系列职责单一的细粒度服务构成的分布式网状结构,服务之间通过轻量机制进行通信，这时候必然引入一个<strong>服务注册发现问题</strong>，也就是说服务提供方要注册通告服务地址，服务的调用方要能发现目标服务。</li>
<li>同时服务提供方一般以集群方式提供服务,也就引入了负载均衡和健康检查问题。</li>
</ul>
<h3 id="理解网络包格式" tabindex="-1"><a class="header-anchor" href="#理解网络包格式" aria-hidden="true">#</a> 理解网络包格式</h3>
<p><a href="https://github.com/lixd/daily-notes/blob/master/CloudNative/camp/08-pod%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%AE%A1%E7%90%86%E5%92%8C%E6%9C%8D%E5%8A%A1%E5%8F%91%E7%8E%B0/assets/network-package-spec.png" target="_blank" rel="noopener noreferrer"><img src="https://github.com/lixd/daily-notes/raw/master/CloudNative/camp/08-pod生命周期管理和服务发现/assets/network-package-spec.png" alt="img"><ExternalLinkIcon/></a></p>
<h3 id="集中式负载均衡" tabindex="-1"><a class="header-anchor" href="#集中式负载均衡" aria-hidden="true">#</a> 集中式负载均衡</h3>
<ul>
<li>在服务消费者和服务提供者之间有一个独立的LB。</li>
<li>LB 上有所有服务的地址映射表，通常由运维配置注册。</li>
<li>当服务消费方调用某个目标服务时，它向 LB 发起请求，由 LB 以某种策略(比如Round-Robin )做负载均衡后将请求转发到目标服务。</li>
<li>LB 一般具备健康检查能力，能自动摘除不健康的服务实例。</li>
<li>服务消费方通过 DNS 发现 LB,运维人员为服务配置一个 DNS 域名,这个域名指向 LB。</li>
</ul>
<p><a href="https://github.com/lixd/daily-notes/blob/master/CloudNative/camp/08-pod%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%AE%A1%E7%90%86%E5%92%8C%E6%9C%8D%E5%8A%A1%E5%8F%91%E7%8E%B0/assets/concentrated-lb.png" target="_blank" rel="noopener noreferrer"><img src="https://github.com/lixd/daily-notes/raw/master/CloudNative/camp/08-pod生命周期管理和服务发现/assets/concentrated-lb.png" alt="img"><ExternalLinkIcon/></a></p>
<p><strong>优缺点</strong></p>
<ul>
<li>集中式 LB 方案实现简单，在 LB 上也容易做集中式的访问控制，这一方案目前还是业界主流。</li>
<li>集中式 LB 的主要问题是单点问题，所有服务调用流量都经过 LB，当服务数量和调用量大的时候，LB 容易成为瓶颈，且一旦 LB 发生故障对整个系统的影响是灾难性的。</li>
<li>LB 在服务消费方和服务提供方之间增加了一跳(hop),有一定性能开销。</li>
</ul>
<h3 id="进程内-lb-服务发现" tabindex="-1"><a class="header-anchor" href="#进程内-lb-服务发现" aria-hidden="true">#</a> 进程内 LB 服务发现</h3>
<ul>
<li>进程内 LB 方案将 LB 的功能以库的形式集成到服务消费方进程里头,该方案也被称为客户端负载方案。</li>
<li>服务注册表(Service Registry)配合支持服务自注册和自发现，服务提供方启动时，首先将服务地址注册到 服务注册表( 同时定期报心跳到服务注册表以表明服务的存活状态)。</li>
<li>服务消费方要访问某个服务时，它通过内置的 LB 组件向服务注册表查询(同时缓存并定期刷新)目标服务 地址列表，然后以某种负载均衡策略选择一个 目标服务地址，最后向目标服务发起请求。</li>
<li>这一方案对服务注册表的可用性(Availability)要求很高，一般采用能满足高可用分布式一致的组件(例如 ZooKeeper, Consul, etcd等)来实现。</li>
</ul>
<p><a href="https://github.com/lixd/daily-notes/blob/master/CloudNative/camp/08-pod%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%AE%A1%E7%90%86%E5%92%8C%E6%9C%8D%E5%8A%A1%E5%8F%91%E7%8E%B0/assets/in-process-lb.png" target="_blank" rel="noopener noreferrer"><img src="https://github.com/lixd/daily-notes/raw/master/CloudNative/camp/08-pod生命周期管理和服务发现/assets/in-process-lb.png" alt="img"><ExternalLinkIcon/></a></p>
<blockquote>
<p>微服务架构下比较常见的一种服务发现机制。</p>
</blockquote>
<p><strong>优缺点</strong></p>
<ul>
<li>进程内 LB 是一种分布式模式，LB 和服务发现能力被分散到每一个服务消费者的进程内部，同时服务消费方和服务提供方之间是直接调用，没有额外开销，性能比较好。该方案以客户库(Client Library)的方式集成到服务调用方进程里头，如果企业内有多种不同的语言栈，就要配合开发多种不同的客户端，有一定的研发和维护成本。</li>
<li>一旦客户端跟随服务调用方发布到生产环境中，后续如果要对客户库进行升级,势必要求服务调用方修改代码并重新发布，所以该方案的升级推广有不小的阻力。</li>
</ul>
<h3 id="独立-lb-进程服务发现" tabindex="-1"><a class="header-anchor" href="#独立-lb-进程服务发现" aria-hidden="true">#</a> 独立 LB 进程服务发现</h3>
<ul>
<li>针对进程内 LB 模式的不足而提出的一种折中方案,原理和第二种方案基本类似。</li>
<li>不同之处是，将 LB 和服务发现功能从进程内移出来，变成主机上的一个独立进程，主机上的一个或者多个服务要访问目标服务时，他们都通过同一主机上的独立 LB 进程做服务发现和负载均衡。</li>
<li>LB 独立进程可以进一步与服务消费方进行解耦，以独立集群的形式提供高可用的负载均衡服务。</li>
<li>这种模式可以称之为真正的“软负载(Soft Load Balancing)”。</li>
</ul>
<p><a href="https://github.com/lixd/daily-notes/blob/master/CloudNative/camp/08-pod%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%AE%A1%E7%90%86%E5%92%8C%E6%9C%8D%E5%8A%A1%E5%8F%91%E7%8E%B0/assets/alone-in-porocess-lb.png" target="_blank" rel="noopener noreferrer"><img src="https://github.com/lixd/daily-notes/raw/master/CloudNative/camp/08-pod生命周期管理和服务发现/assets/alone-in-porocess-lb.png" alt="img"><ExternalLinkIcon/></a></p>
<p><strong>优缺点</strong></p>
<ul>
<li>独立 LB 进程也是一种分布式方案，没有单点问题，一个LB进程挂了只影响该主机上的服务调用方。</li>
<li>服务调用方和 LB 之间是进程间调用，性能好。</li>
<li>简化了服务调用方，不需要为不同语言开发客户库，LB 的升级不需要服务调用方改代码。</li>
<li>不足是部署较复杂，环节多，出错调试排查问题不方便。</li>
</ul>
<h3 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h3>
<p>系统的扩展可分为纵向(垂直)扩展和横向(水平)扩展。</p>
<ul>
<li>纵向扩展，是从单机的角度通过增加硬件处理能力，比如 CPU 处理能力，内存容量,磁盘等方面,实现 服务器处理能力的提升，不能满足大型分布式系统(网站)，大流量，高并发，海量数据的问题;</li>
<li>横向扩展,通过添加机器来满足大型网站服务的处理能力。比如:一台机器不能满足，则增加两台或者 多台机器，共同承担访问压力，这就是典型的集群和负载均衡架构。</li>
</ul>
<p>负载均衡的作用( 解决的问题) :</p>
<ul>
<li>解决并发压力，提高应用处理性能,增加吞吐量，加强网络处理能力;</li>
<li>提供故障转移,实现高可用;
<ul>
<li>通过添加或减少服务器数量,提供网站伸缩性,扩展性;</li>
<li>安全防护，负载均衡设备上做一些过滤，黑白名单等处理。</li>
</ul>
</li>
</ul>
<h4 id="dns-负载均衡" tabindex="-1"><a class="header-anchor" href="#dns-负载均衡" aria-hidden="true">#</a> DNS 负载均衡</h4>
<p>最早的负载均衡技术，利用域名解析实现负载均衡，在 DNS 服务器，配置多个 A 记录，这些 A 记录 对应的服务器构成集群。</p>
<p>优点：</p>
<ul>
<li>使用简单：负载均衡工作，交给 DNS 服务器处理，省掉了负载均衡服务器维护的麻烦;</li>
<li>提高性能：可以支持基于地址的域名解析，解析成距离用户最近的服务器地址，可以加快访问速度，改善性能。</li>
</ul>
<p>缺点：</p>
<ul>
<li>可用性差：DNS解析是多级解析，新增/修改DNS后，解析时间较长;解析过程中，用户访问网站将失败;</li>
<li>扩展性低：DNS负载均衡的控制权在域名商那里，无法对其做更多的改善和扩展;</li>
<li>维护性差：也不能反映服务器的当前运行状态;支持的算法少;不能区分服务器的差异。(不能根据 系统与服务的状态来判断负载)</li>
</ul>
<h3 id="负载均衡技术概览" tabindex="-1"><a class="header-anchor" href="#负载均衡技术概览" aria-hidden="true">#</a> 负载均衡技术概览</h3>
<p><a href="https://github.com/lixd/daily-notes/blob/master/CloudNative/camp/08-pod%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E7%AE%A1%E7%90%86%E5%92%8C%E6%9C%8D%E5%8A%A1%E5%8F%91%E7%8E%B0/assets/lb-component-overview.png" target="_blank" rel="noopener noreferrer"><img src="https://github.com/lixd/daily-notes/raw/master/CloudNative/camp/08-pod生命周期管理和服务发现/assets/lb-component-overview.png" alt="img"><ExternalLinkIcon/></a></p>
<h3 id="nat" tabindex="-1"><a class="header-anchor" href="#nat" aria-hidden="true">#</a> NAT</h3>
<p>网络地址转换(Network Address Translation, NAT) 通常通过修改数据包的源地址(Source NAT)或目标地址(Destination NAT)来控制数据包的转发行为。</p>
<h3 id="新建-tcp-连接" tabindex="-1"><a class="header-anchor" href="#新建-tcp-连接" aria-hidden="true">#</a> 新建 TCP 连接</h3>
<p>为记录原始客户端 IP 地址,负载均衡功能不仅需要进行数据包的源目标地址修改,同时要记录原始客户端 IP 地址，基于简单的 NAT 无法满足此需求，于是衍生出了基于传输层协议的负载均衡的另一种方案一TCP/UDP Termination 方案。</p>
<h3 id="链路层负载均衡" tabindex="-1"><a class="header-anchor" href="#链路层负载均衡" aria-hidden="true">#</a> 链路层负载均衡</h3>
<ul>
<li>在通信协议的数据链路层修改 MAC 地址进行负载均衡。</li>
<li>数据分发时，不修改 IP 地址，指修改目标 MAC 地址，配置真实物理服务器集群所有机器虚拟 IP 和负载均衡服务器IP地址一致,达到不修改数据包的源地址和目标地址,进行数据分发的目的。</li>
<li>实际处理服务器 IP 和数据请求目的 IP 一致,不需要经过负载均衡服务器进行地址转换，可将响应数据包直接返回给用户浏览器，避免负载均衡服务器网卡带宽成为瓶颈。也称为直接路由模式(DR模式)。</li>
</ul>
<h3 id="隧道技术" tabindex="-1"><a class="header-anchor" href="#隧道技术" aria-hidden="true">#</a> 隧道技术</h3>
<p>负载均衡中常用的隧道技术是 IP over IP，其原理是保持原始数据包 IP 头不变,在 IP 头外层增加额外的 IP 包头后转发给上游服务器。</p>
<p>上游服务器接收 IP 数据包，解开外层 IP 包头后,剩下的是原始数据包。</p>
<p>同样的，原始数据包中的目标 IP 地址要配置在上游服务器中，.上游服务器处理完数据请求以后,响应包通过网关直接返回给客户端。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '54.md' style='float:left'>⬆️上一节🔗  </a><a href = '56.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


