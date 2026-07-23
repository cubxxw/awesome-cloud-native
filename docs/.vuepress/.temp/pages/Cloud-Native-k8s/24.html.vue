<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第24节-etcd" tabindex="-1"><a class="header-anchor" href="#第24节-etcd" aria-hidden="true">#</a> 第24节 ETCD</h1>
<div><a href = '23.md' style='float:left'>⬆️上一节🔗  </a><a href = '25.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<nav class="table-of-contents"><ul><li><router-link to="#etcd-介绍">ETCD 介绍</router-link><ul><li><router-link to="#分布式-cap-理论">分布式 CAP 理论</router-link></li><li><router-link to="#etcd-常用术语">etcd 常用术语</router-link></li><li><router-link to="#架构">架构</router-link></li></ul></li><li><router-link to="#搭建-etcd">搭建 etcd</router-link><ul><li><router-link to="#高可用安装-–-避免单点故障">高可用安装 – 避免单点故障</router-link></li></ul></li><li><router-link to="#docker部署">docker部署</router-link><ul><li><router-link to="#构建思路">构建思路</router-link></li><li><router-link to="#下载etcd镜像">下载Etcd镜像</router-link></li><li><router-link to="#创建自定义docker网络">创建自定义Docker网络</router-link></li><li><router-link to="#创建并启动etcd镜像节点">创建并启动Etcd镜像节点</router-link></li><li><router-link to="#verification">verification</router-link></li></ul></li><li><router-link to="#动态发现启动-etcd">动态发现启动 etcd</router-link></li><li><router-link to="#etcd-操作">etcd 操作</router-link><ul><li><router-link to="#常用命令">常用命令</router-link></li><li><router-link to="#非数据库操作命令">非数据库操作命令</router-link></li><li><router-link to="#常用配置参数">常用配置参数</router-link></li></ul></li><li><router-link to="#go-和-etcd-交互">Go 和 etcd 交互</router-link></li><li><router-link to="#gprc-代理模式">gPRC 代理模式</router-link></li><li><router-link to="#直接访问etcd的数据">直接访问etcd的数据</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<h2 id="etcd-介绍" tabindex="-1"><a class="header-anchor" href="#etcd-介绍" aria-hidden="true">#</a> ETCD 介绍</h2>
<div class="custom-container tip"><p class="custom-container-title">etcd address</p>
<ul>
<li><a href="https://github.com/etcd-io/etcd" target="_blank" rel="noopener noreferrer">github<ExternalLinkIcon/></a></li>
<li><a href="https://etcd.io/" target="_blank" rel="noopener noreferrer">official websize<ExternalLinkIcon/></a></li>
</ul>
</div>
<p>etcd (aid) 是分布式系统最关键数据的分布式可靠键值存储，重点是：</p>
<ul>
<li><em>简单</em>：定义明确、面向用户的 API (gRPC)</li>
<li><em>安全</em>：具有可选客户端证书身份验证的自动 TLS</li>
<li><em>快速</em>：基准测试 10,000 次写入/秒</li>
<li><em>可靠</em>：使用 Raft 正确分布</li>
</ul>
<blockquote>
<p><strong>etcd</strong>是一种高度一致的分布式键值存储，它提供了一种可靠的方式来存储需要由分布式系统或机器集群访问的数据。它在网络分区期间优雅地处理领导选举，并且可以容忍机器故障，即使在 <code v-pre>leader node</code> 中也是如此。</p>
</blockquote>
<p>不管是 kubernetes 的深入学习中，遇到了很多关于 etcd 的知识，又或者是本身关于 k3s runtime 支持，关于 etcd 作为内嵌 DB 也遇到了很多疑惑，所以有了这篇。</p>
<p>etcd 是用 Go 编写的，使用<a href="https://raft.github.io/" target="_blank" rel="noopener noreferrer">Raft<ExternalLinkIcon/></a>共识算法来管理一个高可用的复制日志。</p>
<div class="custom-container warning"><p class="custom-container-title">提醒</p>
<p>etcd 是一款分布式存储的中间件，使用 Go语言 编写并通过 Raft 一致性算法处理和确保分布式一致性。<strong>解决数据一致性问题，用于微服务架构中的服务注册与发现中心。</strong></p>
<p>一些关于 Raft 的问题，我想在<RouterLink to="/Cloud-Native-k8s/25.html">下一篇</RouterLink>你能找到答案</p>
<p>如果你需要看到关于 <a href="https://github.com/etcd-io/etcd/tree/release-0.4/third_party/github.com/goraft/raft" target="_blank" rel="noopener noreferrer">etcd - raft 算法的 Go语言<ExternalLinkIcon/></a> 实现。</p>
</div>
<blockquote>
<p>是不是可以理解我们之前无论是部署 hedoop 还是 kubernetes ，都是存在一个问题：尽量选择奇数的节点，真是因为 raft。</p>
</blockquote>
<p>etcd是CoreOS基于Raft开发的分布式key-value存储，可用于服务发现、共享配置以及一致性保障(如数据库选主、分布式锁等)</p>
<ul>
<li>基本的key-value存储</li>
<li>监听机制（分布式消息队列，查询数据，返回结果同时数据变化需要主动告诉）</li>
<li>key的过期以及续约机制，用于监控和服务发现</li>
<li>原子CAS和CAD，用于分布式锁和leader选举</li>
</ul>
<h3 id="分布式-cap-理论" tabindex="-1"><a class="header-anchor" href="#分布式-cap-理论" aria-hidden="true">#</a> 分布式 CAP 理论</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>consistency(一致性)、Availability(可用性)、Partition tolerance(分区容错性)</p>
<blockquote>
<p>ETCD是一个高可用的键值存储系统，它选择了CP理论。在CAP理论中，C表示一致性（Consistency），P表示分区容错性（Partition tolerance），A表示可用性（Availability）。ETCD选择了CP理论，这意味着在网络出现分区（Partition）的情况下，ETCD会保持一致性（Consistency）而牺牲可用性（Availability）。这是因为在分区发生时，节点之间的通信会被中断，为了确保数据一致，ETCD会停止接受新的写请求，直到网络分区被处理好并且所有节点之间的数据达成一致。</p>
</blockquote>
<p>CAP理论指的是分布式系统的三个核心属性：一致性（Consistency）、可用性（Availability）和分区容错性（Partition Tolerance）。这三个属性的具体含义如下：</p>
<ul>
<li>C ➡️ <strong>一致性</strong>：在分布式系统中的所有节点中，具有相同数据的所有节点在任何时间点都可以读取到相同的数据。</li>
<li>A ➡️ <strong>可用性</strong>：在分布式系统中的节点可以在任何时间点对外提供服务和响应请求。</li>
<li>P ➡️ <strong>分区容错性</strong>：在分布式系统中的节点可以在任何时间点保持相互连接并维护系统的正常运行，即使节点之间出现网络分区或者其他故障。</li>
</ul>
<p>这三个特性只能同时实现两点，不能三点同时兼顾~</p>
<p>分布式系统的基本特性：<strong>Partition tolerance(分区容错性) 必须要满足</strong></p>
<blockquote>
<p><strong>⚠️ 为什么一定要保证 Partitiion tolerance？</strong></p>
<blockquote>
<p>分区容错性，代表当分布式节点发生分区（A、B节点互相连接不上）此时的分布式系统是否还提供服务（是否容错），如果没有了P，代表发生分区之后整个分布式集群不能使用，这显然是不行的。</p>
</blockquote>
<p>下面看看保证P与不保证P的集群是什么样的：</p>
<ul>
<li>如果没了P，理论上集群不容许任何一个节点发生分区，当<strong>没有分区</strong>发生时确实可以保证AC（谁能保证集群系统的节点百分百不会出问题呢？能保证也不需要讨论AC问题了），当发生分区时整个集群不可用，没有现实意义</li>
<li>如果保证P，说明集群就只能从A和C选择其一</li>
</ul>
</blockquote>
<p>consistency(一致性)、Availability(可用性) 二选一：</p>
<ul>
<li>银行选择数据一致性</li>
<li>大众网页选择服务可用性</li>
</ul>
<p><strong>etcd 归根结底是一个存储组件，可以实现配置共享和服务发现~</strong></p>
<blockquote>
<p>不一定需要强一致性（其实可以Raft、Zab协议可以做到基本可用+强一致性（线性一致性），基本可以算是分布式一致性算法，非要归类的话我认为其属于CP模型），或许可以最终一致性</p>
</blockquote>
</div>
<p>其实同样的，关于 k3s 自己内置的轻量 SQLite，即使选择 HA 模式的 Dqlite，它主要做了这些事情：</p>
<ol>
<li>提供一个 raft 的解决方案，基于一个叫 c-raft 的 raft 轻量级实现。</li>
<li>sqlite 封装起来，把它存储层注册一个定制 driver 来操作数据。</li>
<li>CAP 理论中，和大多数 <strong>分布式数据库</strong> 一样，dqlite 选择了 CP。</li>
<li>保证了数据一致性</li>
<li>保证了强一致性，用户请求需要在服务器中所有的分区里面完成了一致性才返回</li>
<li>但是，不保证每一个请求都能得到没有报错的响应一般。</li>
</ol>
<h3 id="etcd-常用术语" tabindex="-1"><a class="header-anchor" href="#etcd-常用术语" aria-hidden="true">#</a> etcd 常用术语</h3>
<table>
<thead>
<tr>
<th>术语</th>
<th>描述</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>Raft</td>
<td>Raft算法,etcd实现一致性的核心</td>
<td>etcd有<a href="https://github.com/etcd-io/etcd/tree/release-0.4/third_party/github.com/goraft/raft" target="_blank" rel="noopener noreferrer">etcd-raft<ExternalLinkIcon/></a>模块</td>
</tr>
<tr>
<td>Follower</td>
<td>Raft中的从属节点</td>
<td>竞争Leader失败</td>
</tr>
<tr>
<td>Leader</td>
<td>Raft中的领导协调节点,用于处理数据提交</td>
<td>Leader节点协调整个集群</td>
</tr>
<tr>
<td>Candidate</td>
<td>候选节点</td>
<td>当Follower接收Leader节点的消息超时会转变为candidate</td>
</tr>
<tr>
<td>Node</td>
<td>Raft状态机的实例</td>
<td>Raft中设计多个节点</td>
</tr>
<tr>
<td>Member</td>
<td>etcd实例,管理对应的Node节点</td>
<td>可处理客户端请求</td>
</tr>
<tr>
<td>Peer</td>
<td>同一个集群中的另一个Member</td>
<td>其他成员</td>
</tr>
<tr>
<td>Cluster</td>
<td>etcd集群</td>
<td>拥有多个etcd memeber</td>
</tr>
<tr>
<td>Lease</td>
<td>租期</td>
<td>关键设置的租期,过期删除</td>
</tr>
<tr>
<td>Watch</td>
<td>检测机制</td>
<td>监控简直对的变化</td>
</tr>
<tr>
<td>Term</td>
<td>任期</td>
<td>某个节点成为Leader,到下一次竞选的事件</td>
</tr>
<tr>
<td>WAL</td>
<td>预写式日志</td>
<td>用于持久化存储的日志格式</td>
</tr>
<tr>
<td>client</td>
<td>客户端</td>
<td>向etcd发起请求的客户端</td>
</tr>
</tbody>
</table>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>在分布式系统和 kubernetes 集群中，etcd 可以作为服务注册与发现和键值对存储组件。</p>
<ul>
<li>键值对存储：etcd 是一个用于键值对的存储，kubernetes 元数据存储</li>
<li>服务注册与发现：raft 算法保证分布式场景一致性。</li>
<li>消息订阅与发现</li>
<li>分布式锁：基于 raft 算法，很容易实现</li>
</ul>
</div>
<h3 id="架构" tabindex="-1"><a class="header-anchor" href="#架构" aria-hidden="true">#</a> 架构</h3>
<p><img src="http://sm.cubxxw.com/smwebp123" alt="img"></p>
<h2 id="搭建-etcd" tabindex="-1"><a class="header-anchor" href="#搭建-etcd" aria-hidden="true">#</a> 搭建 etcd</h2>
<p>可以使用：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum install etcd 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>yaml 安装的二进制文件：</p>
<table>
<thead>
<tr>
<th style="text-align:left">名称</th>
<th style="text-align:left">位置</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">etcd</td>
<td style="text-align:left">/usr/bin/etcd</td>
</tr>
<tr>
<td style="text-align:left">etcdctl</td>
<td style="text-align:left">/usr/bin/etcdctl</td>
</tr>
<tr>
<td style="text-align:left">etcd.service</td>
<td style="text-align:left">/lib/systemd/system/etcd.service</td>
</tr>
<tr>
<td style="text-align:left">etcd.conf</td>
<td style="text-align:left">/etc/etcd/etcd.conf</td>
</tr>
</tbody>
</table>
</blockquote>
<p><strong>推荐使用 二进制 、 源码编译、docker安装：</strong></p>
<h3 id="高可用安装-–-避免单点故障" tabindex="-1"><a class="header-anchor" href="#高可用安装-–-避免单点故障" aria-hidden="true">#</a> 高可用安装 – 避免单点故障</h3>
<div class="custom-container tip"><p class="custom-container-title">启动方式</p>
<ul>
<li>静态启动</li>
<li>etcd 动态发现</li>
<li>DNS 发现</li>
</ul>
</div>
<p>goreman 是一个 Go语言 编写的多进程管理工具，是对 ruby 下广泛使用的 Foreman 的重写~</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go get github.com/mattn/goreman
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>安装：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go <span class="token function">install</span> github.com/mattn/goreman@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>使用goreman 启动 etcd 集群</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>goreman <span class="token parameter variable">-f</span> /opt/procfile start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker部署" tabindex="-1"><a class="header-anchor" href="#docker部署" aria-hidden="true">#</a> docker部署</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>个人比较倾向于这种方式，个人电脑配置不行~</p>
</div>
<h3 id="构建思路" tabindex="-1"><a class="header-anchor" href="#构建思路" aria-hidden="true">#</a> 构建思路</h3>
<table>
<thead>
<tr>
<th>节点名</th>
<th>IP地址</th>
</tr>
</thead>
<tbody>
<tr>
<td>node1</td>
<td>10.2.36.1</td>
</tr>
<tr>
<td>node2</td>
<td>10.2.36.2</td>
</tr>
<tr>
<td>node3</td>
<td>10.2.36.3</td>
</tr>
</tbody>
</table>
<p>我们需要三个节点，这三个节点可以分布在不同服务器，本案例中，以一台服务器基于Docker运行多个容器来做演示。</p>
<h3 id="下载etcd镜像" tabindex="-1"><a class="header-anchor" href="#下载etcd镜像" aria-hidden="true">#</a> 下载Etcd镜像</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:~<span class="token comment"># docker pull quay.io/coreos/etcd</span>
root@ubuntu:~<span class="token comment"># docker images | grep "etcd"</span>
quay.io/coreos/etcd                                latest                           61ad63875109   <span class="token number">4</span> years ago     <span class="token number">39</span>.5MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建自定义docker网络" tabindex="-1"><a class="header-anchor" href="#创建自定义docker网络" aria-hidden="true">#</a> 创建自定义Docker网络</h3>
<blockquote>
<p><a href="https://docker.cubxxw.com" target="_blank" rel="noopener noreferrer">docker 基础篇<ExternalLinkIcon/></a> 我们知道啦docker网络模式，我们选择<a href="https://docker.cubxxw.com/markdown/31.html#%E6%80%BB%E4%BD%93%E4%BB%8B%E7%BB%8D" target="_blank" rel="noopener noreferrer">自定义网络<ExternalLinkIcon/></a>。</p>
</blockquote>
<p>首先构建个自定义网络，因为我们要给各个节点分配IP地址，Docker容器默认网络只能自动配IP无法手动分配。</p>
<blockquote>
<p>⚠️ 注意：即使是自定义网络，我选择的也是默认的网桥模式（<em>创建一个新的bridge网络</em>）</p>
<ol>
<li><code v-pre>--driver</code>：驱动程序类型</li>
<li><code v-pre>--subnet</code>：代表网段的 <code v-pre>CIDR</code> 格式的子网</li>
<li><code v-pre>--gateway</code>：主子网的 <code v-pre>IPV4</code> 和 <code v-pre>IPV6</code> 的网关</li>
<li><code v-pre>mynet2</code>：是自定义网络名称</li>
</ol>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:~<span class="token comment"># docker network create --driver bridge --subnet=10.2.36.0/16 --gateway=10.2.1.1 mynet2</span>
be11fe7f1fc8ea9fe30e018297295b8c61a823bb31f647aa4da777fa3eee63a7

root@ubuntu:~<span class="token comment"># docker network ls |grep "mynet2"</span>
be11fe7f1fc8   mynet2                     bridge    <span class="token builtin class-name">local</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建并启动etcd镜像节点" tabindex="-1"><a class="header-anchor" href="#创建并启动etcd镜像节点" aria-hidden="true">#</a> 创建并启动Etcd镜像节点</h3>
<div class="custom-container tip"><p class="custom-container-title">参数📜 对下面的解释</p>
<p>如图表：</p>
<p><img src="http://sm.cubxxw.com/smimage-20221118192826609.png" alt="image-20221118192826609"></p>
</div>
<details class="custom-container details"><summary>节点 1 🔽</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\</span>
<span class="token parameter variable">-p</span> <span class="token number">2479</span>:2379 <span class="token punctuation">\</span>
<span class="token parameter variable">-p</span> <span class="token number">2381</span>:2380 <span class="token punctuation">\</span>
<span class="token parameter variable">--name</span> node1 <span class="token punctuation">\</span>
<span class="token parameter variable">--network</span><span class="token operator">=</span>mynet2 <span class="token punctuation">\</span>
<span class="token parameter variable">--ip</span> <span class="token number">10.2</span>.36.1 <span class="token punctuation">\</span>
quay.io/coreos/etcd:latest <span class="token punctuation">\</span>
etcd <span class="token punctuation">\</span>
<span class="token parameter variable">-name</span> node1 <span class="token punctuation">\</span>
-advertise-client-urls http://10.2.36.1:2379 <span class="token punctuation">\</span>
-initial-advertise-peer-urls http://10.2.36.1:2380 <span class="token punctuation">\</span>
-listen-client-urls http://0.0.0.0:2379 -listen-peer-urls http://0.0.0.0:2380 <span class="token punctuation">\</span>
-initial-cluster-token etcd-cluster <span class="token punctuation">\</span>
-initial-cluster <span class="token string">"node1=http://10.2.36.1:2380,node2=http://10.2.36.2:2380,node3=http://10.2.36.3:2380"</span> <span class="token punctuation">\</span>
-initial-cluster-state new
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<details class="custom-container details"><summary>节点 2 🔽</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\</span>
<span class="token parameter variable">-p</span> <span class="token number">2579</span>:2379 <span class="token punctuation">\</span>
<span class="token parameter variable">-p</span> <span class="token number">2382</span>:2380 <span class="token punctuation">\</span>
<span class="token parameter variable">--name</span> node2 <span class="token punctuation">\</span>
<span class="token parameter variable">--network</span><span class="token operator">=</span>mynet2 <span class="token punctuation">\</span>
<span class="token parameter variable">--ip</span> <span class="token number">10.2</span>.36.2 <span class="token punctuation">\</span>
quay.io/coreos/etcd:latest <span class="token punctuation">\</span>
etcd <span class="token punctuation">\</span>
<span class="token parameter variable">-name</span> node2 <span class="token punctuation">\</span>
-advertise-client-urls http://10.2.36.2:2379 <span class="token punctuation">\</span>
-initial-advertise-peer-urls http://10.2.36.2:2380 <span class="token punctuation">\</span>
-listen-client-urls http://0.0.0.0:2379 -listen-peer-urls http://0.0.0.0:2380 <span class="token punctuation">\</span>
-initial-cluster-token etcd-cluster <span class="token punctuation">\</span>
-initial-cluster <span class="token string">"node1=http://10.2.36.1:2380,node2=http://10.2.36.2:2380,node3=http://10.2.36.3:2380"</span> <span class="token punctuation">\</span>
-initial-cluster-state new
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<details class="custom-container details"><summary>节点 3 🔽</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token punctuation">\</span>
<span class="token parameter variable">-p</span> <span class="token number">2679</span>:2379 <span class="token punctuation">\</span>
<span class="token parameter variable">-p</span> <span class="token number">2383</span>:2380 <span class="token punctuation">\</span>
<span class="token parameter variable">--name</span> node3 <span class="token punctuation">\</span>
<span class="token parameter variable">--network</span><span class="token operator">=</span>mynet2 <span class="token punctuation">\</span>
<span class="token parameter variable">--ip</span> <span class="token number">10.2</span>.36.3 <span class="token punctuation">\</span>
quay.io/coreos/etcd:latest <span class="token punctuation">\</span>
etcd <span class="token punctuation">\</span>
<span class="token parameter variable">-name</span> node3 <span class="token punctuation">\</span>
-advertise-client-urls http://10.2.36.3:2379 <span class="token punctuation">\</span>
-initial-advertise-peer-urls http://10.2.36.3:2380 <span class="token punctuation">\</span>
-listen-client-urls http://0.0.0.0:2379 -listen-peer-urls http://0.0.0.0:2380 <span class="token punctuation">\</span>
-initial-cluster-token etcd-cluster <span class="token punctuation">\</span>
-initial-cluster <span class="token string">"node1=http://10.2.36.1:2380,node2=http://10.2.36.2:2380,node3=http://10.2.36.3:2380"</span> <span class="token punctuation">\</span>
-initial-cluster-state new
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="verification" tabindex="-1"><a class="header-anchor" href="#verification" aria-hidden="true">#</a> verification</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:~<span class="token comment"># docker ps | grep "node"</span>
2986d95eedd4   quay.io/coreos/etcd:latest   <span class="token string">"etcd -name node3 -a…"</span>   <span class="token number">50</span> seconds ago       Up <span class="token number">49</span> seconds   <span class="token number">0.0</span>.0.0:2679-<span class="token operator">></span><span class="token number">2379</span>/tcp, :::2679-<span class="token operator">></span><span class="token number">2379</span>/tcp, <span class="token number">0.0</span>
93e41bb72642   quay.io/coreos/etcd:latest   <span class="token string">"etcd -name node2 -a…"</span>   <span class="token number">54</span> seconds ago       Up <span class="token number">53</span> seconds   <span class="token number">0.0</span>.0.0:2579-<span class="token operator">></span><span class="token number">2379</span>/tcp, :::2579-<span class="token operator">></span><span class="token number">2379</span>/tcp, <span class="token number">0.0</span>
bae0df00930c   quay.io/coreos/etcd:latest   <span class="token string">"etcd -name node1 -a…"</span>   About a minute ago   Up <span class="token number">59</span> seconds   <span class="token number">0.0</span>.0.0:2479-<span class="token operator">></span><span class="token number">2379</span>/tcp, :::2479-<span class="token operator">></span><span class="token number">2379</span>/tcp, <span class="token number">0.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221118193208499.png" alt="image-20221118193208499"></p>
<div class="custom-container tip"><p class="custom-container-title">succeed</p>
<p>通过etcdctl member list命令可以查询出所有集群节点的列表即为成功</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker exec -it node1 etcdctl member list
docker exec -it node2 etcdctl member list
docker exec -it node3 etcdctl member list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221118193514366.png" alt="image-20221118193514366"></p>
</div>
<p><strong>自定义网络本身就维护好了主机名和ip的对应关系（ip和域名都能通）</strong></p>
<h2 id="动态发现启动-etcd" tabindex="-1"><a class="header-anchor" href="#动态发现启动-etcd" aria-hidden="true">#</a> 动态发现启动 etcd</h2>
<h2 id="etcd-操作" tabindex="-1"><a class="header-anchor" href="#etcd-操作" aria-hidden="true">#</a> etcd 操作</h2>
<p>基于 etcd 自带的客户端工具 – etcdctl 来进行一些列操作，同样的 v2 和 v3 的版本也是不一样会的</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>etcdctl 是一个命令行，便于我们进行服务测试或者手动修改数据</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">2</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查询：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/c# docker exec -it node2 etcdctl -v
etcdctl version: 3.3.8
API version: 2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h3 id="常用命令" tabindex="-1"><a class="header-anchor" href="#常用命令" aria-hidden="true">#</a> 常用命令</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>常用命令分为 <strong>数据库操作</strong> 和 <strong>非数据库操作</strong> 两种类型。</p>
</div>
<p><strong>帮助信息：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>etcdctl <span class="token parameter variable">-h</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>etcd 在键的组织上采用了层次化的空间结构（类似于文件系统中目录的概念），数据库操作围绕对键值和目录的 CRUD [增删改查]（符合 REST 风格的一套操作：Create, Read, Update, Delete）完整生命周期的管理。</p>
<p><strong>查看集群状态：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ETCDCTL_API=3 etcdctl endpoint status --cluster -w table
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>常用命令：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 列表</span>
etcdctl <span class="token function">ls</span> /kube-centos/network/config
 
<span class="token comment"># 查看</span>
etcdctl get /kube-centos/network/config
 
<span class="token comment"># v2移除</span>
etcdctl <span class="token function">rm</span> /kube-centos/network/config
 
<span class="token comment"># v3移除</span>
<span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span> etcdctl del /kube-centos/network/config
 
<span class="token comment"># 递归移除</span>
etcdctl <span class="token function">rm</span> <span class="token parameter variable">--recursive</span> registry
 
<span class="token comment"># 修改</span>
etcdctl mk /kube-centos/network/config <span class="token string">"{ <span class="token entity" title="\&quot;">\"</span>Network<span class="token entity" title="\&quot;">\"</span>: <span class="token entity" title="\&quot;">\"</span>172.30.0.0/16<span class="token entity" title="\&quot;">\"</span>, <span class="token entity" title="\&quot;">\"</span>Backend<span class="token entity" title="\&quot;">\"</span>: { <span class="token entity" title="\&quot;">\"</span>Type<span class="token entity" title="\&quot;">\"</span>: <span class="token entity" title="\&quot;">\"</span>vxlan<span class="token entity" title="\&quot;">\"</span> } }"</span>
 
<span class="token comment"># 命令将数据存到指定位置。这部分数据可以用来灾难恢复</span>
etcdctl backup
 
<span class="token comment"># 健康检查</span>
etcdctl endpoint health
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>命令合集：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#存储:</span>
    <span class="token function">curl</span> http://127.0.0.1:4001/v2/keys/testkey <span class="token parameter variable">-XPUT</span> <span class="token parameter variable">-d</span> <span class="token assign-left variable">value</span><span class="token operator">=</span><span class="token string">'testvalue'</span>
    <span class="token function">curl</span> <span class="token parameter variable">-s</span> http://127.0.0.1:4001/v2/keys/message2 <span class="token parameter variable">-XPUT</span> <span class="token parameter variable">-d</span> <span class="token assign-left variable">value</span><span class="token operator">=</span><span class="token string">'hello etcd'</span> <span class="token parameter variable">-d</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">5</span>
 
<span class="token comment">#获取:</span>
    <span class="token function">curl</span> http://127.0.0.1:4001/v2/keys/testkey
 
<span class="token comment">#查看版本:</span>
    <span class="token function">curl</span>  http://127.0.0.1:4001/version
 
<span class="token comment">#删除:</span>
    <span class="token function">curl</span> <span class="token parameter variable">-s</span> http://127.0.0.1:4001/v2/keys/testkey <span class="token parameter variable">-XDELETE</span>
 
<span class="token comment">#监视:</span>
    窗口1：curl <span class="token parameter variable">-s</span> http://127.0.0.1:4001/v2/keys/message2 <span class="token parameter variable">-XPUT</span> <span class="token parameter variable">-d</span> <span class="token assign-left variable">value</span><span class="token operator">=</span><span class="token string">'hello etcd 1'</span>
          <span class="token function">curl</span> <span class="token parameter variable">-s</span> http://127.0.0.1:4001/v2/keys/message2?wait<span class="token operator">=</span>true
    窗口2：
          <span class="token function">curl</span> <span class="token parameter variable">-s</span> http://127.0.0.1:4001/v2/keys/message2 <span class="token parameter variable">-XPUT</span> <span class="token parameter variable">-d</span> <span class="token assign-left variable">value</span><span class="token operator">=</span><span class="token string">'hello etcd 2'</span>
 
自动创建key:
    <span class="token function">curl</span> <span class="token parameter variable">-s</span> http://127.0.0.1:4001/v2/keys/message3 <span class="token parameter variable">-XPOST</span> <span class="token parameter variable">-d</span> <span class="token assign-left variable">value</span><span class="token operator">=</span><span class="token string">'hello etcd 1'</span>
    <span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token string">'http://127.0.0.1:4001/v2/keys/message3?recursive=true&amp;sorted=true'</span>
 
<span class="token comment">#创建目录：</span>
    <span class="token function">curl</span> <span class="token parameter variable">-s</span> http://127.0.0.1:4001/v2/keys/message8 <span class="token parameter variable">-XPUT</span> <span class="token parameter variable">-d</span> <span class="token assign-left variable">dir</span><span class="token operator">=</span>true
 
<span class="token comment">#删除目录：</span>
    <span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token string">'http://127.0.0.1:4001/v2/keys/message7?dir=true'</span> <span class="token parameter variable">-XDELETE</span>
    <span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token string">'http://127.0.0.1:4001/v2/keys/message7?recursive=true'</span> <span class="token parameter variable">-XDELETE</span>
 
<span class="token comment">#查看所有key:</span>
    <span class="token function">curl</span> <span class="token parameter variable">-s</span> http://127.0.0.1:4001/v2/keys/?recursive<span class="token operator">=</span>true
 
<span class="token comment">#存储数据：</span>
    <span class="token function">curl</span> <span class="token parameter variable">-s</span> http://127.0.0.1:4001/v2/keys/file <span class="token parameter variable">-XPUT</span> --data-urlencode value@upfile
 
 
<span class="token comment">#使用etcdctl客户端：</span>
 
<span class="token comment">#存储:</span>
    etcdctl <span class="token builtin class-name">set</span> /liuyiling/testkey <span class="token string">"610"</span> <span class="token parameter variable">--ttl</span> <span class="token string">'100'</span>
                                         --swap-with-value value
 
<span class="token comment">#获取：</span>
    etcdctl get /liuyiling/testkey
 
<span class="token comment">#更新：</span>
    etcdctl update /liuyiling/testkey <span class="token string">"world"</span> <span class="token parameter variable">--ttl</span> <span class="token string">'100'</span>
 
<span class="token comment">#删除：</span>
    etcdctl <span class="token function">rm</span> /liuyiling/testkey
 
<span class="token comment">#使用ca获取：</span>
etcdctl --cert-file<span class="token operator">=</span>/etc/etcd/ssl/etcd.pem   --key-file<span class="token operator">=</span>/etc/etcd/ssl/etcd-key.pem  --ca-file<span class="token operator">=</span>/etc/etcd/ssl/ca.pem get /message
 
<span class="token comment">#目录管理：</span>
 
    etcdctl mk /liuyiling/testkey <span class="token string">"hello"</span>    类似set,但是如果key已经存在，报错
 
    etcdctl <span class="token function">mkdir</span> /liuyiling 
 
    etcdctl setdir /liuyiling  
 
    etcdctl updatedir /liuyiling      
 
    etcdctl <span class="token function">rmdir</span> /liuyiling    
 
<span class="token comment">#查看：</span>
    etcdctl <span class="token function">ls</span> <span class="token parameter variable">--recursive</span>
 
<span class="token comment">#监视：</span>
    etcdctl <span class="token function">watch</span> mykey  <span class="token parameter variable">--forever</span>         +    etcdctl update mykey <span class="token string">"hehe"</span>
 
    <span class="token comment">#监视目录下所有节点的改变</span>
 
    etcdctl exec-watch <span class="token parameter variable">--recursive</span> /foo -- <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">"echo hi"</span>
 
    etcdctl exec-watch mykey -- <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">'ls -al'</span>    +    etcdctl update mykey <span class="token string">"hehe"</span>
 
    etcdctl member list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="对象为键值" tabindex="-1"><a class="header-anchor" href="#对象为键值" aria-hidden="true">#</a> 对象为键值</h4>
<ol>
<li>
<p>set[增:无论是否存在]:<code v-pre>etcdctl set key value</code></p>
</li>
<li>
<p>mk[增:必须不存在]:<code v-pre>etcdctl mk key value</code></p>
</li>
<li>
<p>rm[删]:<code v-pre>etcdctl rm key</code></p>
</li>
<li>
<p>update[改]:<code v-pre>etcdctl update key value</code></p>
</li>
<li>
<p>get[查]:<code v-pre>etcdctl get key</code></p>
</li>
</ol>
<h4 id="对象为目录" tabindex="-1"><a class="header-anchor" href="#对象为目录" aria-hidden="true">#</a> 对象为目录</h4>
<ol>
<li>
<p>setdir[增:无论是否存在]:<code v-pre>etcdctl setdir dir</code></p>
</li>
<li>
<p>mkdir[增:必须不存在]: <code v-pre>etcdctl mkdir dir</code></p>
</li>
<li>
<p>rmdir[删]:<code v-pre>etcdctl rmdir dir</code></p>
</li>
<li>
<p>updatedir[改]:<code v-pre>etcdctl updatedir dir</code></p>
</li>
<li>
<p>ls[查]:<code v-pre>etcdclt ls</code></p>
</li>
</ol>
<h3 id="非数据库操作命令" tabindex="-1"><a class="header-anchor" href="#非数据库操作命令" aria-hidden="true">#</a> 非数据库操作命令</h3>
<ol>
<li>
<p>backup[备份 etcd 的数据]</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>etcdctl backup
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>watch[监测一个键值的变化，一旦键值发生更新，就会输出最新的值并退出]</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>etcdctl watch key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>exec-watch[监测一个键值的变化，一旦键值发生更新，就执行给定命令]</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>etcdctl exec-watch key <span class="token parameter variable">--sh</span> <span class="token parameter variable">-c</span> <span class="token string">"ls"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>member[通过 list、add、remove、update 命令列出、添加、删除 、更新etcd 实例到 etcd 集群中]</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>etcdctl member list；etcdctl member add 实例；etcdctl member remove 实例；etcdctl member update 实例。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>etcdctl cluster-health[检查集群健康状态]</p>
</li>
</ol>
<h3 id="常用配置参数" tabindex="-1"><a class="header-anchor" href="#常用配置参数" aria-hidden="true">#</a> 常用配置参数</h3>
<p>设置配置文件，默认为<code v-pre>/etc/etcd/etcd.conf</code>。</p>
<table>
<thead>
<tr>
<th style="text-align:left">配置参数</th>
<th style="text-align:left">参数说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">配置参数</td>
<td style="text-align:left">参数说明</td>
</tr>
<tr>
<td style="text-align:left">-name</td>
<td style="text-align:left">节点名称</td>
</tr>
<tr>
<td style="text-align:left">-data-dir</td>
<td style="text-align:left">保存日志和快照的目录，默认为当前工作目录，指定节点的数据存储目录</td>
</tr>
<tr>
<td style="text-align:left">-addr</td>
<td style="text-align:left">公布的ip地址和端口。 默认为127.0.0.1:2379</td>
</tr>
<tr>
<td style="text-align:left">-bind-addr</td>
<td style="text-align:left">用于客户端连接的监听地址，默认为-addr配置</td>
</tr>
<tr>
<td style="text-align:left">-peers</td>
<td style="text-align:left">集群成员逗号分隔的列表，例如 127.0.0.1:2380,127.0.0.1:2381</td>
</tr>
<tr>
<td style="text-align:left">-peer-addr</td>
<td style="text-align:left">集群服务通讯的公布的IP地址，默认为 127.0.0.1:2380.</td>
</tr>
<tr>
<td style="text-align:left">-peer-bind-addr</td>
<td style="text-align:left">集群服务通讯的监听地址，默认为-peer-addr配置</td>
</tr>
<tr>
<td style="text-align:left">-wal-dir</td>
<td style="text-align:left">指定节点的was文件的存储目录，若指定了该参数，wal文件会和其他数据文件分开存储</td>
</tr>
<tr>
<td style="text-align:left">-listen-client-urls</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left">-listen-peer-urls</td>
<td style="text-align:left">监听URL，用于与其他节点通讯</td>
</tr>
<tr>
<td style="text-align:left">-initial-advertise-peer-urls</td>
<td style="text-align:left">告知集群其他节点url.</td>
</tr>
<tr>
<td style="text-align:left">-advertise-client-urls</td>
<td style="text-align:left">告知客户端url, 也就是服务的url</td>
</tr>
<tr>
<td style="text-align:left">-initial-cluster-token</td>
<td style="text-align:left">集群的ID</td>
</tr>
<tr>
<td style="text-align:left">-initial-cluster</td>
<td style="text-align:left">集群中所有节点</td>
</tr>
<tr>
<td style="text-align:left">-initial-cluster-state</td>
<td style="text-align:left">-initial-cluster-state=new 表示从无到有搭建etcd集群</td>
</tr>
<tr>
<td style="text-align:left">-discovery-srv</td>
<td style="text-align:left">用于DNS动态服务发现，指定DNS SRV域名</td>
</tr>
<tr>
<td style="text-align:left">-discovery</td>
<td style="text-align:left">用于etcd动态发现，指定etcd发现服务的URL [https://discovery.etcd.io/],用环境变量表示</td>
</tr>
</tbody>
</table>
<h2 id="go-和-etcd-交互" tabindex="-1"><a class="header-anchor" href="#go-和-etcd-交互" aria-hidden="true">#</a> Go 和 etcd 交互</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"log"</span>
	<span class="token string">"time"</span>

	<span class="token string">"go.etcd.io/etcd/client/v3"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cli<span class="token punctuation">,</span> err <span class="token operator">:=</span> clientv3<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>clientv3<span class="token punctuation">.</span>Config<span class="token punctuation">{</span>
		Endpoints<span class="token punctuation">:</span>   <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"http://10.2.36.1:2479"</span><span class="token punctuation">,</span> <span class="token string">"http://10.2.36.2:2579"</span><span class="token punctuation">,</span> <span class="token string">"http://10.2.36.3:2679"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		DialTimeout<span class="token punctuation">:</span> <span class="token number">5</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">defer</span> cli<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	testKey <span class="token operator">:=</span> <span class="token string">"/test/key"</span>	<span class="token comment">//设置 key</span>
	testValue <span class="token operator">:=</span> <span class="token string">"I love docker"</span>  <span class="token comment">//设置 value</span>

	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> cli<span class="token punctuation">.</span><span class="token function">Put</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> testKey<span class="token punctuation">,</span> testValue<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"Put failed:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	res<span class="token punctuation">,</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> testKey<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"Get failed:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	kvs <span class="token operator">:=</span> res<span class="token punctuation">.</span>Kvs
	val <span class="token operator">:=</span> <span class="token function">string</span><span class="token punctuation">(</span>kvs<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Value<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"result:"</span><span class="token punctuation">,</span> val <span class="token operator">==</span> testValue<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gprc-代理模式" tabindex="-1"><a class="header-anchor" href="#gprc-代理模式" aria-hidden="true">#</a> gPRC 代理模式</h2>
<div class="custom-container tip"><p class="custom-container-title">gPRC 代理模式 – 实现可伸缩的 etcd API</p>
<p>gRPC proxy 是在 gRPC 层 运行的无状态 etcd 反向代理</p>
<p>旨在减少 etcd 集群上的总处理负载</p>
</div>
<h2 id="直接访问etcd的数据" tabindex="-1"><a class="header-anchor" href="#直接访问etcd的数据" aria-hidden="true">#</a> 直接访问etcd的数据</h2>
<p>先用 sealer 快速安装一个 Kubernetes 的测试单节点：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev ~<span class="token punctuation">]</span><span class="token comment"># /root/workspces/sealer/_output/bin/sealer/linux_amd64/sealer run docker.io/sealerio/kubernetes:v1.22.15 --masters  192.168.137.133</span>
<span class="token punctuation">[</span>root@dev ~<span class="token punctuation">]</span><span class="token comment"># kubectl get nodes</span>
NAME          STATUS     ROLES                  AGE   VERSION
cubmaster01   NotReady   control-plane,master   47s   v1.22.15
<span class="token punctuation">[</span>root@dev ~<span class="token punctuation">]</span><span class="token comment"># kubectl get node -A</span>
NAME          STATUS     ROLES                  AGE   VERSION
cubmaster01   NotReady   control-plane,master   49s   v1.22.15
<span class="token punctuation">[</span>root@dev ~<span class="token punctuation">]</span><span class="token comment"># kubectl get pod -A</span>
NAMESPACE     NAME                                  READY   STATUS    RESTARTS   AGE
kube-system   coredns-697ddfb55c-49jss              <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          38s
kube-system   coredns-697ddfb55c-spknp              <span class="token number">0</span>/1     Pending   <span class="token number">0</span>          38s
kube-system   etcd-cubmaster01                      <span class="token number">1</span>/1     Running   <span class="token number">0</span>          53s
kube-system   kube-apiserver-cubmaster01            <span class="token number">1</span>/1     Running   <span class="token number">0</span>          51s
kube-system   kube-controller-manager-cubmaster01   <span class="token number">1</span>/1     Running   <span class="token number">49</span>         54s
kube-system   kube-proxy-mcxwj                      <span class="token number">1</span>/1     Running   <span class="token number">0</span>          39s
kube-system   kube-scheduler-cubmaster01            <span class="token number">1</span>/1     Running   <span class="token number">49</span>         51s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在Master节点上指定查看命名空间kube-system下的Pod信息</strong></p>
<p>可以看到有一个名为<code v-pre>etcd-cubmaster01</code>的Pod</p>
<p><strong>在Master节点上进入运行etcd的容器内部</strong></p>
<blockquote>
<p>⚠️ 注意，貌似不支持 本地 bash 进入：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev ~<span class="token punctuation">]</span><span class="token comment"># kubectl -n kube-system exec -it etcd-cubmaster01 -- bash</span>
OCI runtime <span class="token builtin class-name">exec</span> failed: <span class="token builtin class-name">exec</span> failed: container_linux.go:349: starting container process caused <span class="token string">"exec: <span class="token entity" title="\&quot;">\"</span>bash<span class="token entity" title="\&quot;">\"</span>: executable file not found in <span class="token environment constant">$PATH</span>"</span><span class="token builtin class-name">:</span> unknown
<span class="token builtin class-name">command</span> terminated with <span class="token builtin class-name">exit</span> code <span class="token number">126</span>
<span class="token punctuation">[</span>root@dev ~<span class="token punctuation">]</span><span class="token comment"># kubectl -n kube-system exec -it etcd-cubmaster01 -- sh</span>
sh-5.0<span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p><strong>查询数据：</strong></p>
<p>查询所有以<code v-pre>/</code>开头的key的名称</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> etcdctl <span class="token parameter variable">--endpoints</span> https://localhost:2379 <span class="token parameter variable">--cert</span> /etc/kubernetes/pki/etcd/server.crt <span class="token parameter variable">--key</span> /etc/kubernetes/pki/etcd/server.key <span class="token parameter variable">--cacert</span> /etc/kubernetes/pki/etcd/ca.crt get --keys-only <span class="token parameter variable">--prefix</span> /
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>这样的话，我就能知道新建的 registry 的记录</strong></p>
<ul>
<li><code v-pre>--keys-only</code>:表示只列出key，不查看具体的键值对信息.</li>
<li><code v-pre>--prefix /</code>:表示查询所有key名以<code v-pre>/</code>开头的键值对</li>
</ul>
<p><strong>查看key为<code v-pre>/registry/services/specs/default/kubernetes</code>的value</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>etcdctl <span class="token parameter variable">--endpoints</span> https://localhost:2379 <span class="token parameter variable">--cert</span> /etc/kubernetes/pki/etcd/server.crt <span class="token parameter variable">--key</span> /etc/kubernetes/pki/etcd/server.key <span class="token parameter variable">--cacert</span> /etc/kubernetes/pki/etcd/ca.crt get <span class="token parameter variable">--prefix</span> /registry/services/specs/default/kubernetes
 /registry/services/specs/default/kubernetes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到有一些乱码。这是因为 <strong>这个value是GRPC协议的存储，因此该value时以Protobuf的形式存储的</strong>。因此有一些乱码。</p>
<blockquote>
<p>etcd还支持监听的功能，这使得etcd有了消息机制。</p>
</blockquote>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '23.md' style='float:left'>⬆️上一节🔗  </a><a href = '25.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


