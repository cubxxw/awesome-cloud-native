<template><div><h1 id="docker底层的内核" tabindex="-1"><a class="header-anchor" href="#docker底层的内核" aria-hidden="true">#</a> docker底层的内核</h1>
<nav class="table-of-contents"><ul><li><router-link to="#底层结构">底层结构</router-link><ul><li><router-link to="#经典云计算架构">经典云计算架构</router-link></li><li><router-link to="#介绍">介绍</router-link></li><li><router-link to="#baas-区块链即服务">BaaS：区块链即服务</router-link></li></ul></li><li><router-link to="#docker">docker</router-link></li><li><router-link to="#rootfs">rootfs</router-link></li><li><router-link to="#namespace">Namespace</router-link></li><li><router-link to="#control-groups">control groups</router-link></li></ul></nav>
<p>[toc]</p>
<h2 id="底层结构" tabindex="-1"><a class="header-anchor" href="#底层结构" aria-hidden="true">#</a> 底层结构</h2>
<div class="custom-container warning"><p class="custom-container-title">docker底层</p>
<p>docker底层的内核：（rootfs / linux namespace / control groups）</p>
</div>
<h3 id="经典云计算架构" tabindex="-1"><a class="header-anchor" href="#经典云计算架构" aria-hidden="true">#</a> 经典云计算架构</h3>
<p>基础云计算架构包括 IaaS （基础即服务）， SaaS（软件即服务）， PaaS（平台即服务）三层服务。</p>
<p><img src="http://sm.nsddd.top/smiaas-paas-saas-comparison-1024x759.jpg" alt="img"></p>
<h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3>
<ol>
<li>
<p><code v-pre>IaaS</code> 基础架构即服务</p>
<blockquote>
<p>云基础架构服务称为基础架构即服务（IaaS），由高度可扩展和自动化的计算资源组成。 IaaS是完全自助服务，用于访问和监控计算、网络，存储和其他服务等内容，它允许企业按需求和需要购买资源，而不必购买全部硬件。</p>
</blockquote>
</li>
<li>
<p><code v-pre>SaaS</code> 软件即服务（也称为云应用程序服务）</p>
<blockquote>
<p>代表了云市场中企业最常用的选项。 SaaS利用互联网向其用户提供应用程序，这些应用程序由第三方供应商管理。 大多数SaaS应用程序直接通过Web浏览器运行，不需要在客户端进行任何下载或安装。</p>
</blockquote>
</li>
<li>
<p><code v-pre>PaaS</code> 平台即服务</p>
<blockquote>
<p>云平台服务或平台即服务（PaaS）为某些软件提供云组件，这些组件主要用于应用程序。 PaaS为开发人员提供了一个框架，使他们可以基于它创建自定义应用程序。所有服务器，存储和网络都可以由企业或第三方提供商进行管理，而开发人员可以负责应用程序的管理。</p>
</blockquote>
</li>
</ol>
<p><img src="http://sm.nsddd.top/sm123141231" alt="查看源图像"></p>
<div class="custom-container tip"><p class="custom-container-title">SaaS vs PaaS vs IaaS</p>
<p>总体而言，每种云模型都提供了自己的特定功能和特性，因此您的解组织了解这些差异至关重要。 无论您是在寻找云存储软件，还是一个能创建定自定义应用程序的平滑平台，，或者希望完全控制整个基础架构而无需对其进行物理维护，您可以使用云服务。 无论您选择哪个选项，迁移到云都是业务和技术的未来，并且很必要让大家正确的了解这一点。</p>
</div>
<h3 id="baas-区块链即服务" tabindex="-1"><a class="header-anchor" href="#baas-区块链即服务" aria-hidden="true">#</a> BaaS：区块链即服务</h3>
<details class="custom-container details"><summary>Baas 区块链即服务什么是区块链即服务（BaaS）？</summary>
<p>区块链即服务（BaaS）是为从事构建区块链应用程序业务的公司创建和管理的基于云的网络的第三方创建和管理。这些第三方服务是不断发展的区块链技术领域中相对较新的发展。区块链技术的应用已经远远超出了其在加密货币交易中最广为人知的用途，并已扩展到解决各种安全交易。因此，对托管服务有需求。</p>
<p><img src="http://sm.nsddd.top/smimage-20221031173356050.png" alt="image-20221031173356050"></p>
<p>现在区块链不光是各个IT巨头，金融机构，咨询公司等也都参与其中，创业型区块链公司也存在不少，随着技术的不断发展，竞争也相当激烈。Hyperledger之前也发布了fabric1.0正式版，改进了架构更适合应用落地。区块链是一个分布式的应用，去中心化多节点，即使有spv认证模式，还是要求有一部分节点下载完整的数据记录，以比特币为例，目前几百G的数据，随着数据量的不断增长，对本地计算资源和存储资源都是一种挑战，之前有人这样说过：本地资源永远是有限的，只有云资源可以不断扩展，理解云资源可以不断扩展。先不论这种说法的正确性，区块链结合云计算存储平台必然是一种发展趋势。云平台目前最为广泛的就是iaas、paas、saas，那么区块链结合云平台我们称为BaaS，理解区块链即服务。</p>
<p>那么区块链切入云平台，根据这个BaaS中的“B”，blockchain，应该怎么理解。或者应该区分BaaS和btaas，BaaS和btaas根据网络上一些说法baas是指区块链即服务btaas是指区块链技术即服务。各种观念的提出都有自己的理论基础，这里不做定义，只是对两个理解做一个笔者自己的简单理解，如有不对希望及时指正。</p>
<p>上图很好的说明的这两种概念定义。</p>
<p><strong>区块链服务</strong>：广义理解，把区块链的应用，比如比特币、以太坊等这类型公链，节点直接部署在云平台，节点提供查询，交易、区块生成等操作，底层使用云计算资源和云存储空间，这种简单理解为区块链服务，当然上图也说到了公链的延伸应用-存证型-Factom，数字身份型-uPort等，云平台的容错、网络的多链路负载、计算资源的动态调整，其实针对区块链中的节点能够更好的实现他的服务，从一定角度来讲也节省了节点的运行成本，提高了整个系统之间交互的效率。当然从区块链服务这个词汇来理解就是云平台上搭建区块应用，业务直接访问在云平台之上的区块链应用平台，结合图上，区块链浏览器、数字货币交易平台以及一些现有的区块链系统提供开放的服务。</p>
<p><strong>区块链技术服务</strong>：区块链技术，这个词汇包含的东西比较多，通俗来说区块链技术就是：加密技术、共识机制、P2P的网络、分布式系统等一些技术的结合，那么在云平台的区块链技术多指这些技术的结合后区块链架构框架或者区块链操作系统，主要是HyperLedger，multichain，以太坊私有链等多个框架，使用这些框架去结合应用业务需求，开发出适合业务的应用，甚至这些应用要求优于现有的互联网技术，这种方式称为区块链技术服务。</p>
<p>在网上查资料的时候看到有位大神对这两个区块链服务/技术服务概念提出了一个很好的比喻：www. 8btc.com/talk-about-baas（有兴趣看看，笔者也是看了这个想到这概念的）。阿里云提供云服务，他提供的是云资源的实例，阿里不会告诉你如何去搭建云，他提供是云的服务，付费即可享受服务。上面讨论的BaaS可以认为是提供公链的实例服务，btaas提供的是区块链架构框架，你需要开发部署你的区块链应用服务。</p>
<p>BaaS 基于软件即服务 （SaaS） 模型，并以类似的方式工作。它允许客户利用基于云的解决方案在区块链上构建、托管和操作自己的<strong>区块链</strong>应用程序和相关功能。同时，基于云的服务提供商保持基础架构的敏捷性和可操作性。</p>
<p>作为更大的区块链生态系统的发展，BaaS被视为促进区块链在企业中的采用。</p>
<p>BaaS领域的主要参与者包括：</p>
<ul>
<li>微软，与ConsenSys合作，于2015年在Microsoft Azure上推出以太坊区块链即服务。</li>
<li>亚马逊推出了Amazon Managed Blockchain，该服务使用包括Ethereum和Hyperledger Fabric在内的开源框架“可以轻松创建和管理可扩展的区块链网络”。</li>
<li>R3，一个由全球金融机构组成的联盟，制作了一个名为Corda的分布式金融账本。</li>
<li>PayStand，专门从事公司之间的付款和收款。</li>
</ul>
<p>消费者和企业越来越愿意适应区块链技术。然而，创建、配置和运营区块链以及维护其基础设施所涉及的技术复杂性和运营开销通常会成为障碍。</p>
<p>BaaS提供了一个外部服务提供商来设置所有必要的区块链技术和基础设施，但需要付费。创建后，提供程序将继续处理客户端的复杂后端操作。</p>
<p>BaaS 运营商通常提供支持活动，例如带宽管理、适当的资源分配、托管要求和数据安全功能。BaaS运营商使客户能够专注于核心工作：区块链的功能。</p>
<p><strong>区块链即服务（BaaS）示例：</strong></p>
<p>下图展示了区块链即服务Hyperledger Cello的工作模型，这是一个类似BaaS的区块链模块工具包和<a href="https://www.investopedia.com/terms/b/blockchain.asp" target="_blank" rel="noopener noreferrer">Hyperledger<ExternalLinkIcon/></a>项目下的实用程序系统。</p>
<p><img src="http://sm.nsddd.top/smBlockchain-as-a-ServiceBaaS2-baedb4b071464c7cbaa71f7ef13c0c83.png" alt="Cello"></p>
<p>实际上，BaaS提供商的角色类似于网络托管提供商的角色。网站创建者在自己的个人计算机上创建和运行所有网站内容。他们可能会雇用支持人员或与亚马逊网络服务或 HostGator 等外部托管服务提供商签约。这些第三方公司负责基础设施和维护问题。</p>
<p>BaaS可能是导致区块链技术在各个行业部门和业务中更广泛和更深入渗透的催化剂。无论大小，企业现在都可以简单地外包技术复杂的工作并专注于其核心活动，而不是创建和运行自己的区块链。</p>
</details>
<h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h2>
<p>docker将每个应用做成一个沙盒，各个应用都运行在容器中（namespace）</p>
<ol>
<li>docker是一个开源的应用容器引擎，开发者可以打包他们的应用以及依赖到一个容器中，发布到流行的liunx系统上，或者实现虚拟化。</li>
<li>k8s是一个开源的容器集群管理系统，可以实现容器集群的自动化部署、自动扩缩容、维护等。</li>
</ol>
<blockquote>
<p><code v-pre>docker</code> 如今是容器的代名词，我们知道 <code v-pre>docker</code> 中最小的单位是容器，但是在 <code v-pre>k8s</code> 中最小的单位是 <code v-pre>pod</code> 。</p>
<p><strong>打包方式的区别：</strong></p>
<ul>
<li>docker 通过镜像分发</li>
<li>k8s – helm</li>
</ul>
</blockquote>
<details class="custom-container details"><summary>虚拟化角度：</summary>
<p>传统的虚拟技术，在将物理硬件虚拟成多套硬件后，需要再每套硬件上都部署一个操作系统，接着在这些操作系统上运行相应的应用程序。</p>
<p>Docker容器内的应用程序进程直接运行在宿主机(真实物理机)的内核上，Docker引擎将一些各自独立的应用程序和它们各自的依赖打包，相互独立直接运行于未经虚拟化的宿主机硬件上，同时各个容器也没有自己的内核，显然比传统虚拟机更轻便。每个集群有多个节点，每个节点可，我们的kuberbete就是管理这些应用程序所在的小运行环境（container）而生。</p>
</details>
<details class="custom-container details"><summary>部署角度：</summary>
<p>传统方式是将所有应用直接部署在同一个物理机器节点上，这样每个App的依赖都是完全相同的，无法做到App之间隔离，当然，为了隔离，我们也可以通过创建虚拟机的方式来将App部署到其中，但这样太过繁重，故比虚拟机更轻便的Docker技术出现，现在我们通过部署Container容器的技术来部署应用，全部Container运行在容器引擎上即可。以kubernetes为代表的容器集群管理系统，我们用kubernetes去管理Docker集群，即可以将Docker看成Kubernetes内部使用的低级别组件。另外，kubernetes不仅仅支持Docker，还支持Rocket，这是另一种容器技术。</p>
</details>
<div class="custom-container danger"><p class="custom-container-title">我们在之前知道了虚拟机和容器的区别</p>
<p>虚拟机的内核和文件系统存在不同的位置，系统加载的时候去启动内核，没有加载就是文件</p>
<p>容器就是把文件系统打包出去，应用所在的依赖全部保存起来。</p>
<img src="http://sm.nsddd.top//typora/spaces_-M5xTVjmK7ax94c8ZQcm_uploads_git-blob-6e94771ad01da3cb20e2190b01dfa54e3a69d0b2_virtualization.png?mail:3293172751@qq.com" alt="a" style="zoom:80%;" />
<img src="http://sm.nsddd.top//typora/spaces_-M5xTVjmK7ax94c8ZQcm_uploads_git-blob-5c1a41d44b8602c8f746e8929f484a701869ca25_docker.png?mail:3293172751@qq.com" alt="b" style="zoom:80%;" />
<ul>
<li>虚拟机通过 <code v-pre>Hypervisor</code> 仅进行虚拟化，在这上面去运行操作系统 <code v-pre>Centos</code></li>
<li>容器通过 <code v-pre>Docker Engine</code> ，基于此实现的容器并不是虚拟化，没有客户机的操作系统，是共享内核的。</li>
</ul>
</div>
<h2 id="rootfs" tabindex="-1"><a class="header-anchor" href="#rootfs" aria-hidden="true">#</a> rootfs</h2>
<ul>
<li><RouterLink to="/markdown/41.html">浅谈 linux 中的根文件系统（rootfs 的原理和介绍）</RouterLink></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">什么是 rootfs ？</p>
<p>我们在每个 <code v-pre>Linux</code> 系统一定有一个根目录，这个根目录就是 <code v-pre>rootfs</code> ：</p>
<blockquote>
<p><strong><code v-pre>docker</code> 也依旧是这样，我们进去容器的内部根文件系统。</strong></p>
</blockquote>
<p><img src="http://sm.nsddd.top/smimage-20221031192452458.png" alt="image-20221031192452458"></p>
</div>
<p><strong><code v-pre>rootfs</code> 是 <code v-pre>docker</code> 容器在启动时内部进程可见的文件系统，即 <code v-pre>docker</code> 容器根目录， <code v-pre>rootfs</code> 通常包含一个操作系统运行所需的文件系统。</strong></p>
<p>在传统的 <code v-pre>linux</code> 启动的时候，首先挂载一个只读的 <code v-pre>rootfs</code> ，当系统检测器完整性后，再切换为读写模式； 而在 <code v-pre>docker</code> 架构中，当 <code v-pre>docekr daemon</code> 为 <code v-pre>docker</code> 容器挂载 <code v-pre>rootfs</code> 时，沿用的 <code v-pre>linux</code> 内核启动时的方法，即将 <code v-pre>rootfs</code> 设置为只读模式， 挂载完毕后，<strong>利用联合文件系统技术</strong> 在已有的只读 <code v-pre>rootfs</code> 上再挂载一个读写层，这样，读写层位于 <code v-pre>docker</code> 容器文件系统的最顶层，其下可能联合挂载了多个只读层。</p>
<p><code v-pre>rootfs</code> 只是一个操作系统包含的文件、配置、目录，并不包括操作系统，在Linux中，这两个部分是分开存放的。</p>
<blockquote>
<p><code v-pre>linux</code> 内核默认存放到 <code v-pre>/boot</code> 下，而 <code v-pre>/usr/src</code> 中可查看内核的信息。有个 <code v-pre>.img</code> 的文件，这就是系统内核映像文件。</p>
<p><img src="http://sm.nsddd.top/smimage-20221031195613278.png" alt="image-20221031195613278"></p>
</blockquote>
<h2 id="namespace" tabindex="-1"><a class="header-anchor" href="#namespace" aria-hidden="true">#</a> Namespace</h2>
<div class="custom-container tip"><p class="custom-container-title">什么是 Namespace ？</p>
<p>我们的docker是共享同一个内核的，使用 <code v-pre>Namespace</code> 可以创建隔离，决定进程可以看到或者使用哪些资源。</p>
</div>
<p><code v-pre>namespace</code> 是 Linux 内核用来隔离内核资源的方式，通过 namespace 可以让一些进程只能看到与自己相关的一部分资源，而另外一些进程也只能看到与它们自己相关的资源。</p>
<p><img src="http://sm.nsddd.top/smformat12344" alt="img"></p>
<div class="custom-container warning"><p class="custom-container-title">进程命名空间查看</p>
<p>进程命名空间查看：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> /proc/<span class="token punctuation">{</span>PD<span class="token punctuation">}</span>/ns
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221031201635589.png" alt="image-20221031201635589"></p>
</div>
<h2 id="control-groups" tabindex="-1"><a class="header-anchor" href="#control-groups" aria-hidden="true">#</a> control groups</h2>
<blockquote>
<p>从 <strong>2.6.24</strong> 版本开始，<code v-pre>linux</code> 内核提供了一个叫做 <code v-pre>cgroups</code>（控制组）的特性。<code v-pre>cgroups</code> 就是 <code v-pre>control groups</code> 的缩写，用来对一组进程所占用的资源做限制、统计、隔离。也是目前轻量级虚拟化技术 <code v-pre>lxc</code> （linux container）的基础之一。每一组进程就是一个控制组，也就是一个 <code v-pre>cgroup</code>。<code v-pre>cgroups</code> 分为几个子系统，每个子系统代表一种设施或者说是资源控制器，用来调度某一类资源的使用，如 <code v-pre>cpu</code> 时钟、内存、块设备 等。</p>
</blockquote>
<div class="custom-container tip"><p class="custom-container-title">什么是 control groups ?</p>
<p>我们通过 <code v-pre>control groups</code> 技术来约束进程对资源的使用。</p>
</div>
<blockquote>
<p><strong><code v-pre>rootfs</code> 就像是房间的地板，<code v-pre>Namespace</code> 就像是一个墙，隔离每个房间，<code v-pre>control groups</code> 更像一个房顶，防止你跑出去了。</strong></p>
</blockquote>
<p><strong>什么是特定：</strong></p>
<p><code v-pre>cgroups</code> 适用于多种应用场景，从单个进程的资源控制，到实现操作系统层次的虚拟化（OS Level Virtualization）。</p>
<ol>
<li>
<p>限制进程组可以使用的资源数量（Resource limiting ）。比如：memory子系统可以为进程组设定一个memory使用上限，一旦进程组使用的内存达到限额再申请内存，就会出发OOM（out of memory）。</p>
</li>
<li>
<p>进程组的优先级控制（Prioritization ）。比如：可以使用cpu子系统为某个进程组分配特定cpu share。</p>
</li>
<li>
<p>记录进程组使用的资源数量（Accounting ）。比如：可以使用cpuacct子系统记录某个进程组使用的cpu时间</p>
</li>
<li>
<p>进程组隔离（Isolation）。比如：使用ns子系统可以使不同的进程组使用不同的namespace，以达到隔离的目的，不同的进程组有各自的进程、网络、文件系统挂载空间。</p>
</li>
</ol>
<p><strong>Cgroups子系统介绍：</strong></p>
<ul>
<li><code v-pre>blkio</code> — 这个子系统为块设备设定输入/输出限制，比如物理设备（磁盘，固态硬盘，USB 等等）。</li>
<li><code v-pre>cpu</code> — 这个子系统使用调度程序提供对 CPU 的 cgroup 任务访问。</li>
<li><code v-pre>cpuacct</code> — 这个子系统自动生成 cgroup 中任务所使用的 CPU 报告。</li>
<li><code v-pre>cpuset</code> — 这个子系统为 cgroup 中的任务分配独立 CPU（在多核系统）和内存节点。</li>
<li><code v-pre>devices</code> — 这个子系统可允许或者拒绝 cgroup 中的任务访问设备。</li>
<li><code v-pre>freezer</code> — 这个子系统挂起或者恢复 cgroup 中的任务。</li>
<li><code v-pre>memory</code> — 这个子系统设定 cgroup 中任务使用的内存限制，并自动生成由那些任务使用的内存资源报告。</li>
<li><code v-pre>net_cls</code> — 这个子系统使用等级识别符（classid）标记网络数据包，可允许 Linux 流量控制程序（tc）识别从具体 cgroup 中生成的数据包。</li>
<li><code v-pre>ns</code> — 名称空间子系统。</li>
</ul>
</div></template>
