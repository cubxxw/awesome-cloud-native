<template><div><ul>
<li>[author](http:  //nsddd。top)</li>
</ul>
<h1 id="第48节-深入理解kubernetes控制平面组件-etcd" tabindex="-1"><a class="header-anchor" href="#第48节-深入理解kubernetes控制平面组件-etcd" aria-hidden="true">#</a> 第48节 深入理解Kubernetes控制平面组件：ETCD</h1>
<div><a href = '47.md' style='float:left'>⬆️上一节🔗  </a><a href = '49.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:  [http:  //nsddd。top](http:  //nsddd。top/)</p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="开始前" tabindex="-1"><a class="header-anchor" href="#开始前" aria-hidden="true">#</a> 开始前</h2>
<blockquote>
<p>ETCD 是 Kubernetes 中所有组件中最难的，因为 ETCD 是有状态的，而不是无状态的。</p>
</blockquote>
<p>我在之前做 k3s runtime 设计的时候，了解了一些关于 ETCD 和 Raft 算法相关的概念，作为前奏知识，请分别前往 <a href="https://docker.cubxxw.com/Cloud-Native-k8s/24.html" target="_blank" rel="noopener noreferrer">ETCD<ExternalLinkIcon/></a> 以及 <a href="https://docker.cubxxw.com/Cloud-Native-k8s/25.html" target="_blank" rel="noopener noreferrer">Raft算法<ExternalLinkIcon/></a> 进行前奏学习。</p>
<p><strong>这一篇来深入并且贯穿的讲解 ETCD 和 Raft。并且站在 Kubernetes 的角度来深入 剖析 ETCD。</strong></p>
<h2 id="etcd" tabindex="-1"><a class="header-anchor" href="#etcd" aria-hidden="true">#</a> ETCD</h2>
<h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3>
<p>Etcd是CoreOS基于Raft开发的分布式key-value存储，可用于服务发现、共享配置以及一致性保障（如数据库选主、分布式锁等）。</p>
<p>包含的功能以及特性 前奏 都有学过，看下 Kubernetes 最关心的 存储：</p>
<h3 id="主要功能" tabindex="-1"><a class="header-anchor" href="#主要功能" aria-hidden="true">#</a> 主要功能</h3>
<ul>
<li>基本的key-value存储</li>
<li>监听机制</li>
<li>key的过期及续约机制，用于监控和服务发现</li>
<li>原子Compare And Swap和Compare And Delete，用于分布式锁和leader选举</li>
</ul>
<h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h3>
<ul>
<li>可以用于键值对存储，应用程序可以读取和写入 etcd 中的数据</li>
<li>etcd 比较多的应用场景是用于服务注册与发现</li>
<li>基于监听机制的分布式异步系统</li>
</ul>
<p>etcd 是一个<strong>键值存储</strong>的组件，其他的应用都是基于其键值存储的功能展开。</p>
<ul>
<li>采用kv型数据存储，一般情况下比关系型数据库快。</li>
<li>支持动态存储(内存)以及静态存储(磁盘)。</li>
<li>分布式存储，可集成为多节点集群。</li>
<li>存储方式，采用类似目录结构。（B+tree）
<ul>
<li>只有叶子节点才能真正存储数据，相当于文件。</li>
<li>叶子节点的父节点一定是目录，目录不能存储数据。</li>
</ul>
</li>
</ul>
<p><strong>服务注册与发现：</strong></p>
<ul>
<li>强一致性、高可用的服务存储目录。
<ul>
<li>基于 Raft 算法的 etcd 天生就是这样一个强一致性、高可用的服务存储目录。</li>
</ul>
</li>
<li>一种注册服务和服务健康状况的机制。
<ul>
<li>用户可以在 etcd 中注册服务，并且对注册的服务配置 key TTL，定时保持服务的心跳以达到监控健康状态的效果。</li>
</ul>
</li>
</ul>
<p><strong>消息发布订阅：</strong></p>
<ul>
<li>在分布式系统中，最适用的一种组件间通信方式就是消息发布与订阅。</li>
<li>即构建一个配置共享中心，数据提供者在这个配置中心发布消息，而消息使用者则订阅他们关心的主题，一旦主题有消息发布，就会实时通知订阅者。</li>
<li>通过这种方式可以做到分布式系统配置的集中式管理与动态更新。</li>
<li>应用中用到的一些配置信息放到etcd上进行集中管理。</li>
<li>应用在启动的时候主动从etcd获取一次配置信息，同时，在etcd节点上注册一个Watcher并等待，以后每次配置有更新的时候，etcd都会实时通知订阅者，以此达到获取最新配置信息的目的。</li>
</ul>
<h2 id="install" tabindex="-1"><a class="header-anchor" href="#install" aria-hidden="true">#</a> install</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">ETCD_VER</span><span class="token operator">=</span>v3.4.17
<span class="token assign-left variable">DOWNLOAD_URL</span><span class="token operator">=</span>https://github.com/etcd-io/etcd/releases/download
<span class="token function">rm</span> <span class="token parameter variable">-f</span> /tmp/etcd-<span class="token variable">${ETCD_VER}</span>-linux-amd64.tar.gz
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /tmp/etcd-download-test <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /tmp/etcd-download-test
<span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token variable">${DOWNLOAD_URL}</span>/<span class="token variable">${ETCD_VER}</span>/etcd-<span class="token variable">${ETCD_VER}</span>-linux-amd64.tar.gz <span class="token parameter variable">-o</span> /tmp/etcd-<span class="token variable">${ETCD_VER}</span>-linux-amd64.tar.gz
<span class="token function">tar</span> xzvf /tmp/etcd-<span class="token variable">${ETCD_VER}</span>-linux-amd64.tar.gz <span class="token parameter variable">-C</span> /tmp/etcd-download-test --strip-components<span class="token operator">=</span><span class="token number">1</span>
<span class="token function">rm</span> <span class="token parameter variable">-f</span> /tmp/etcd-<span class="token variable">${ETCD_VER}</span>-linux-amd64.tar.gz
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /tmp/etcd-download-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3>
<p>需要注意的是，我本地因为 安装 Kubernetes 的时候已经安装了 ETCD， 针对这个问题有两种解决方案：</p>
<ul>
<li>使用 标志 指定 端口，换端口</li>
<li>卸载，重装</li>
</ul>
<p>ONE：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>etcd --listen-client-urls <span class="token string">'http://localhost:12379'</span> <span class="token punctuation">\</span>
 --advertise-client-urls <span class="token string">'http://localhost:12379'</span> <span class="token punctuation">\</span>
 --listen-peer-urls <span class="token string">'http://localhost:12380'</span> <span class="token punctuation">\</span>
 --initial-advertise-peer-urls <span class="token string">'http://localhost:12380'</span> <span class="token punctuation">\</span>
 --initial-cluster <span class="token string">'default=http://localhost:12380'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="演示" tabindex="-1"><a class="header-anchor" href="#演示" aria-hidden="true">#</a> 演示</h3>
<p>查看集群 member：</p>
<p><img src="http://sm.cubxxw.com/sm202303041708430.png" alt="image-20230304170809258"></p>
<p><strong>一些简单的操作：</strong></p>
<blockquote>
<p>前言有很多案例，请移步~</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 写入数据</span>
etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 put /key1 val1
<span class="token comment"># 查询数据</span>
etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 get /key1
<span class="token comment"># 查询数据-显示详细信息</span>
etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 get /key1 <span class="token parameter variable">-w</span> json
<span class="token comment"># 按key的前缀查询数据</span>
etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 get <span class="token parameter variable">--prefix</span> /
<span class="token comment"># 只显示键值</span>
etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 get <span class="token parameter variable">--prefix</span> / --keys-only
<span class="token comment"># watch 数据</span>
etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 <span class="token function">watch</span> <span class="token parameter variable">--prefix</span> /
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意的是：</strong></p>
<p>watch 提供了一个长连接，来监听事件的变化，如果发生变化就会收到订阅。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 <span class="token function">watch</span> <span class="token parameter variable">--prefix</span> / <span class="token parameter variable">--rev</span> <span class="token number">0</span>
PUT
/key
val3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="路径规划" tabindex="-1"><a class="header-anchor" href="#路径规划" aria-hidden="true">#</a> 路径规划</h3>
<p><strong>是的，我们在前面讲到 Kubernetes 的源码目录结构的时候，讲解过：Kubernetes 的目录中 API，并且说了 API 符合 RESTful API  标准，以及 通常把版本标识是放在 URL 中的，比如 <code v-pre>/v1/users</code>，这样做的好处是很直观。</strong></p>
<p><strong>GKV 设计就是这样 ~</strong></p>
<p>ETCD 支持路径匹配：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 get a
❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 put a
^C
❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 put a <span class="token number">1</span>
OK
❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 put b <span class="token number">2</span>
OK
❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 put /a <span class="token number">11</span>
OK
❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 put /b <span class="token number">22</span>
OK
❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 put /a/b <span class="token number">1122</span>
OK
❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 get <span class="token parameter variable">--prefix</span> /
/a
<span class="token number">11</span>
/a/b
<span class="token number">1122</span>
/b
<span class="token number">22</span>
/key
val3
/sd
as
❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 get <span class="token parameter variable">--prefix</span> /a
/a
<span class="token number">11</span>
/a/b
<span class="token number">1122</span>
❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 get <span class="token parameter variable">--prefix</span> /b
/b
<span class="token number">22</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上面都是有 value 的，但是我们也知道，Kubernetes 的 Api 的 数据 value 是非常大的，是一个个的 yaml 文件，所以我们可以筛选出 key：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 get <span class="token parameter variable">--prefix</span> / --keys-only
/a

/a/b

/b

/key

/sd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以加入 <code v-pre>debug</code> 参数，看到命令的详细信息和调试信息：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ etcdctl <span class="token parameter variable">--endpoints</span><span class="token operator">=</span>localhost:12379 get <span class="token parameter variable">--prefix</span> / --keys-only <span class="token parameter variable">--debug</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="核心-ttl-cas" tabindex="-1"><a class="header-anchor" href="#核心-ttl-cas" aria-hidden="true">#</a> 核心：TTL &amp; CAS</h3>
<p>TTL（time to live）指的是给一个key设置一个有效期，到期后这个key就会被自动删掉，这在很多分布式锁的实现上都会用到，可以保证锁的实时有效性。</p>
<blockquote>
<p>但是 站在 Kubernetes的角度上来说， 使用到 TTL 的不是很多，所以 ~</p>
</blockquote>
<p>Atomic Compare-and-Swap（CAS）指的是在对key进行赋值的时候，客户端需要提供一些条件，当这些条件满足后，才能赋值成功。这些条件包括：</p>
<ul>
<li><code v-pre>prevExist</code>：key当前赋值前是否存在</li>
<li><code v-pre>prevValue</code>：key当前赋值前的值</li>
<li><code v-pre>prevIndex</code>：key当前赋值前的Index</li>
</ul>
<p>这样的话，key的设置是有前提的，需要知道这个key当前的具体情况才可以对其设置。</p>
<h3 id="kubernetes-与-etcd-交互" tabindex="-1"><a class="header-anchor" href="#kubernetes-与-etcd-交互" aria-hidden="true">#</a> Kubernetes 与 ETCD 交互</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-A</span>
kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> etcd-cadmin <span class="token function">sh</span>   <span class="token comment"># etcd 有 sh 但是没有 bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="raft-协议" tabindex="-1"><a class="header-anchor" href="#raft-协议" aria-hidden="true">#</a> Raft 协议</h2>
<p>Raft协议基于quorum机制，即大多数同意原则，任何的变更都需超过半数的成员确认</p>
<blockquote>
<p>推荐观看：<a href="http://thesecretlivesofdata.com/raft/" target="_blank" rel="noopener noreferrer">Raft协议动画<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="learner" tabindex="-1"><a class="header-anchor" href="#learner" aria-hidden="true">#</a> Learner</h3>
<p>Raft 4.2.1引入的新角色</p>
<p>当出现一个 etcd 集群需要增加节点时，新节点与 Leader 的数据差异较大，需要较多数据同步才能跟上 leader 的最新的数据。</p>
<p>此时Leader的网络带宽很可能被用尽，进而使得leader无法正常保持心跳。进而导致follower重新发起投票。进而可能引发etcd集群不可用。</p>
<blockquote>
<p><strong>即</strong>：etcd 集群中加入成员会对集群稳定性造成很大的影响</p>
</blockquote>
<p>因此增加了 learner 角色，该角色加入集群的节点不参与投票选举，近接收 leader 的 <code v-pre>replication message</code>，直到与 <code v-pre>leader</code> 保持同步为止。</p>
<p><strong>Learner角色只接收数据而不参与投票，也不提供读写服务，因此增加learner节点时，集群的quorum不变。</strong></p>
<p>集群管理员向集群中添加新节点时要尽可能减少不必要的操作项。通过 <code v-pre>member add --learner</code> 命令可以向 etcd 集群中添加 <code v-pre>learner</code> 节点，不参加投票，只接收 <code v-pre>replication message</code>。</p>
<p>当 <code v-pre>Learner</code> 节点与 leader 保持同步之后，可以通过 <code v-pre>member promote</code> 来将该节点的状态提升为 follower，然后将其计入 quorum 的大小之中。</p>
<h3 id="etcd基于raft的一致性" tabindex="-1"><a class="header-anchor" href="#etcd基于raft的一致性" aria-hidden="true">#</a> etcd基于Raft的一致性</h3>
<p><strong>选举方法：</strong></p>
<ul>
<li>初始启动时，节点处于<code v-pre>follower</code>状态并被设定一个election timeout，如果在这一时间周期内没有收到来自 leader 的 heartbeat，节点将发起 <strong>选举</strong>：将自己切换为 candidate 之后，向集群中其它 follower 节点发送请求，询问其是否选举自己成为 leader。</li>
<li>当收到来自集群中 <strong>过半数</strong> 节点的接受投票后，节点即成为 leader，开始接收保存 client 的数据并向其它的 follower 节点同步日志。如果没有达成一致，则candidate随机选择一个等待间隔（150ms ~ 300ms）再次发起投票，得到集群中半数以上follower接受的candidate将成为leader</li>
<li>leader节点依靠定时向 follower 发送heartbeat来保持其地位。</li>
<li>任何时候如果其它 follower 在 election timeout 期间都没有收到来自 leader 的 heartbeat，同样会将自己的状态切换为 candidate 并发起选举。每成功选举一次，<strong>新 leader 的任期（Term）都会比之前leader 的任期大1。</strong></li>
</ul>
<h3 id="日志复制" tabindex="-1"><a class="header-anchor" href="#日志复制" aria-hidden="true">#</a> 日志复制</h3>
<p>当接 <code v-pre>Leader</code> 收到客户端的日志（事务请求）后先把该日志追加到本地的 <code v-pre>Log</code> 中，然后通过 <code v-pre>heartbeat</code> 把该<code v-pre>Entry</code>同步给其他Follower，Follower接收到日志后记录日志然后向Leader发送ACK，当Leader收到大多数（n/2+1）Follower的ACK信息后将该日志设置为已提交并追加到本地磁盘中，通知客户端并在下个<code v-pre>heartbeat</code>中<code v-pre>Leader</code>将通知所有的<code v-pre>Follower</code>将该日志存储在自己的本地磁盘中。</p>
<h3 id="安全性" tabindex="-1"><a class="header-anchor" href="#安全性" aria-hidden="true">#</a> 安全性</h3>
<p>安全性是用于保证每个节点都执行相同序列的安全机制，如当某个Follower在当前Leader commit Log时变得不可用了，稍后可能该Follower又会被选举为Leader，这时新Leader可能会用新的Log覆盖先前已committed的Log，这就是导致节点执行不同序列；Safety就是用于保证选举出来的Leader一定包含先前 committed Log的机制；选举安全性（Election Safety）：每个任期（Term）只能选举出一个LeaderLeader完整性（Leader Completeness）：指Leader日志的完整性，当Log在任期Term1被Commit后，那么以后任期Term2、Term3…等的Leader必须包含该Log；Raft在选举阶段就使用Term的判断用于保证完整性：当请求投票的该Candidate的Term较大或Term相同Index更大则投票，否则拒绝该请求。</p>
<h3 id="失效处理" tabindex="-1"><a class="header-anchor" href="#失效处理" aria-hidden="true">#</a> 失效处理</h3>
<p>1）<strong>Leader失效</strong>：其他没有收到heartbeat的节点会发起新的选举，而当Leader恢复后由于步进数小会自动成为follower（日志也会被新leader的日志覆盖）</p>
<p>2）follower节点不可用：follower 节点不可用的情况相对容易解决。因为集群中的日志内容始终是从 leader 节点同步的，只要这一节点再次加入集群时重新从 leader 节点处复制日志即可。</p>
<p>3）多个candidate：冲突后candidate将随机选择一个等待间隔（150ms ~ 300ms）再次发起投票，得到集群中半数以上follower接受的candidate将成为leader</p>
<h3 id="wal-日志" tabindex="-1"><a class="header-anchor" href="#wal-日志" aria-hidden="true">#</a> wal 日志</h3>
<p>wal日志是二进制的，解析出来后是以上数据结构LogEntry。其中第一个字段type，只有两种，</p>
<ul>
<li>一种是0表示<code v-pre>Normal</code>，1表示ConfChange（ConfChange表示 Etcd 本身的配置变更同步，比如有新的节点加入等）。</li>
<li>第二个字段是<code v-pre>term</code>，每个term代表一个主节点的任期，每次主节点变更term就会变化。</li>
<li>第三个字段是<code v-pre>index</code>，这个序号是严格有序递增的，代表变更序号。</li>
<li>第四个字段是二进制的data，将raft request对象的pb结构整个保存下。</li>
</ul>
<p>etcd 源码下有个tools/etcddump-logs，可以将wal日志dump成文本查看，可以协助分析Raft协议。</p>
<p>Raft协议本身不关心应用数据，也就是data中的部分，一致性都通过同步wal日志来实现，每个节点将从主节点收到的data apply到本地的存储，Raft只关心日志的同步状态，如果本地存储实现的有bug，比如没有正确的将data apply到本地，也可能会导致数据不一致。</p>
<h3 id="存储机制" tabindex="-1"><a class="header-anchor" href="#存储机制" aria-hidden="true">#</a> 存储机制</h3>
<p>etcd v3 store 分为两部分，一部分是内存中的索引，kvindex，是基于Google开源的一个Golang的btree实现的，另外一部分是后端存储。按照它的设计，backend可以对接多种存储，当前使用的boltdb。boltdb是一个单机的支持事务的kv存储，etcd 的事务是基于boltdb的事务实现的。etcd 在boltdb中存储的key是reversion，value是 etcd 自己的key-value组合，也就是说 etcd 会在boltdb中把每个版本都保存下，从而实现了多版本机制。</p>
<p>reversion主要由两部分组成，第一部分main rev，每次事务进行加一，第二部分sub rev，同一个事务中的每次操作加一。</p>
<p>etcd 提供了命令和设置选项来控制compact，同时支持put操作的参数来精确控制某个key的历史版本数。</p>
<p>内存kvindex保存的就是key和reversion之前的映射关系，用来加速查询。</p>
<h3 id="watch-机制" tabindex="-1"><a class="header-anchor" href="#watch-机制" aria-hidden="true">#</a> Watch 机制</h3>
<p>watcherGroup 是 ETCD 中 Watcher 的分组机制，可以用于更有效地管理 Watcher 并避免 Watcher 消耗过多的资源。</p>
<p>使用 watcherGroup 时，可以创建多个 Watcher 并将它们分配到不同的 watcherGroup 中。每个 watcherGroup 内部都有一个 Event loop，负责处理分组中 Watcher 的事件通知。通过分组机制，Watcher 可以更高效地响应存储中的数据更改，从而降低对 ETCD 集群资源的消耗。</p>
<p>watcherGroup 可以通过以下方式创建：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>goCopy code
wg <span class="token operator">:=</span> clientv3<span class="token punctuation">.</span><span class="token function">NewWatcher</span><span class="token punctuation">(</span>watchCli<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Watchers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码创建了一个 WatcherGroup wg，该 WatcherGroup 与 ETCD 客户端 watchCli 相关联。可以使用以下代码将 Watcher 添加到 WatcherGroup 中：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>goCopy code
watcher <span class="token operator">:=</span> wg<span class="token punctuation">.</span><span class="token function">NewWatcher</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这将创建一个新的 Watcher，并将其添加到 WatcherGroup 中。在创建 Watcher 时，可以指定 Watcher 要监视的键或前缀，以及 Watcher 的响应行为（如直接触发或批量触发）。</p>
<p>使用 watcherGroup 时，还可以对 Watcher 进行分组管理。可以使用以下代码将 Watcher 添加到指定的 watcherGroup 中：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>goCopy codewg<span class="token punctuation">.</span><span class="token function">Group</span><span class="token punctuation">(</span><span class="token string">"group1"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>watcher1<span class="token punctuation">)</span>
wg<span class="token punctuation">.</span><span class="token function">Group</span><span class="token punctuation">(</span><span class="token string">"group2"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>watcher2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这将把 watcher1 添加到名为 &quot;group1&quot; 的 WatcherGroup 中，把 watcher2 添加到名为 &quot;group2&quot; 的 WatcherGroup 中。</p>
<p>通过使用 watcherGroup，可以更好地管理 Watcher 并提高 ETCD 集群的性能和可扩展性。</p>
<h3 id="etcd-请求流程图" tabindex="-1"><a class="header-anchor" href="#etcd-请求流程图" aria-hidden="true">#</a> ETCD  请求流程图</h3>
<p><img src="http://sm.cubxxw.com/sm202303041941660.png" alt="image-20230304194117423"></p>
<p><strong>MVCC模块</strong></p>
<blockquote>
<p>Kubernetes的API Server在默认情况下并不提供缓存机制，它总是从etcd中读取最新的数据并返回给客户端。这是因为etcd作为Kubernetes的存储后端，已经具备了高可用性和可靠性等方面的保障，因此API Server可以直接从etcd中读取数据来保证数据的一致性和可靠性。</p>
<p>然而，由于etcd的性能相对较差，而且在高并发情况下容易成为瓶颈，因此在一些场景下需要使用缓存来优化API Server的性能。为此，Kubernetes提供了一种叫做kube-aggregator的组件，可以在API Server前面搭建一层缓存，从而提高API Server的性能和可扩展性。</p>
<p>kube-aggregator实际上是一个API聚合器，它可以将多个API Server的请求聚合到一起，并提供缓存和负载均衡等能。kube-aggregator可以将API Server返回的数据缓存到本地，并根据需要定期更新数据。这样，在高并发情况下，API Server可以直接从本地缓存中读取数据，避免了频繁地访问etcd，从而提高了系统的性能和稳定性。</p>
</blockquote>
<p>客户端向ETCD发送请求。</p>
<blockquote>
<p>客户端可以通过ETCD提供的API向ETCD发送请求，请求可以是读操作，也可以是写操作。</p>
</blockquote>
<p>请求首先被ETCD的网络层接收。</p>
<blockquote>
<p>当请求到达ETCD的服务器时，首先由网络层进行接收处理。ETCD的网络层采用gRPC协议进行通信，可以保证请求的可靠性和高效性。</p>
</blockquote>
<p>接着，ETCD会将请求发送到其内部的Raft层。</p>
<blockquote>
<p>ETCD内部采用Raft算法来实现分布式一致性，所有的数据都存储在Raft层中。当请求到达Raft层后，Raft层会根据当前集群状态进行处理，并将请求转发到合适的节点进行处理。</p>
</blockquote>
<p>Raft层会对请求进行处理，如果是读操作，则会返回数据，如果是写操作，则会将数据写入存储引擎。</p>
<blockquote>
<p>当请求到达目标节点后，Raft层会根据请求的类型进行处理。如果是读操作，Raft层会从存储引擎中读取数据，并返回给客户端；如果是写操作，Raft层会将数据写入存储引擎中，并等待存储引擎返回成功的响应。</p>
</blockquote>
<p>存储引擎将数据写入磁盘，并返回成功的响应。</p>
<blockquote>
<p>存储引擎是ETCD的底层数据存储层，采用的是LSM树的存储引擎。当存储引擎接收到写请求后，会将数据写入内存中的MemTable中，当MemTable满了之后，会生成SSTable文件，并将其写入磁盘中。写入磁盘后，存储引擎会返回成功的响应给Raft层。</p>
</blockquote>
<p>Raft层将响应返回给ETCD的网络层。</p>
<blockquote>
<p>当Raft层收到存储引擎的成功响应后，会将响应返回给ETCD的网络层进行处理。网络层会将响应进行封装，并通过gRPC协议返回给客户端。</p>
</blockquote>
<p>最后，ETCD的网络层将响应发送回客户端。
当网络层收到Raft层返回的响应后，会将其解封并返回给客户端，完成整个请求的处理过程。</p>
<h2 id="相关参数" tabindex="-1"><a class="header-anchor" href="#相关参数" aria-hidden="true">#</a> 相关参数</h2>
<h3 id="etcd-成员重要参数" tabindex="-1"><a class="header-anchor" href="#etcd-成员重要参数" aria-hidden="true">#</a> etcd 成员重要参数</h3>
<p>成员相关参数</p>
<ul>
<li>
<p><code v-pre>--name 'default'</code></p>
<ul>
<li>Human-readable name for this member.</li>
</ul>
</li>
<li>
<p><code v-pre>--data-dir '${name}.etcd'</code></p>
<ul>
<li>Path to the data directory.</li>
</ul>
</li>
<li>
<p><code v-pre>--listen-peer-urls 'http://localhost:2380'</code></p>
<ul>
<li>List of URLs to listen on for peer traffic.</li>
</ul>
</li>
<li>
<p><code v-pre>--listen-client-urls 'http://localhost:2379'</code></p>
<ul>
<li>List of URLs to listen on for client traffic.</li>
</ul>
</li>
</ul>
<h3 id="etcd集群重要参数" tabindex="-1"><a class="header-anchor" href="#etcd集群重要参数" aria-hidden="true">#</a> etcd集群重要参数</h3>
<p>集群相关参数</p>
<ul>
<li>
<p><code v-pre>--initial-advertise-peer-urls 'http://localhost:2380'</code></p>
<ul>
<li>List of this member's peer URLs to advertise to the rest of the cluster.</li>
</ul>
</li>
<li>
<p><code v-pre>--initial-cluster 'default=http://localhost:2380'</code></p>
<ul>
<li>Initial cluster configuration for bootstrapping.</li>
</ul>
</li>
<li>
<p><code v-pre>--initial-cluster-state 'new'</code></p>
<ul>
<li>Initial cluster state ('new' or 'existing').</li>
</ul>
</li>
<li>
<p><code v-pre>--initial-cluster-token 'etcd-cluster'</code></p>
<ul>
<li>Initial cluster token for the etcd cluster during bootstrap.</li>
</ul>
</li>
<li>
<p><code v-pre>--advertise-client-urls 'http://localhost:2379'</code></p>
<ul>
<li>List of this member's client URLs to advertise to the public.</li>
</ul>
</li>
</ul>
<h3 id="etcd安全相关参数" tabindex="-1"><a class="header-anchor" href="#etcd安全相关参数" aria-hidden="true">#</a> etcd安全相关参数</h3>
<ul>
<li>
<p><code v-pre>--cert-file ''</code></p>
<ul>
<li>Path to the client server TLS cert file.</li>
</ul>
</li>
<li>
<p><code v-pre>--key-file ''</code></p>
<ul>
<li>Path to the client server TLS key file.</li>
</ul>
</li>
<li>
<p><code v-pre>--client-crl-file ''</code></p>
<ul>
<li>Path to the client certificate revocation list file.</li>
</ul>
</li>
<li>
<p><code v-pre>--trusted-ca-file ''</code></p>
<ul>
<li>Path to the client server TLS trusted CA cert file.</li>
</ul>
</li>
<li>
<p><code v-pre>--peer-cert-file ''</code></p>
<ul>
<li>Path to the peer server TLS cert file.</li>
</ul>
</li>
<li>
<p><code v-pre>--peer-key-file ''</code></p>
<ul>
<li>Path to the peer server TLS key file.</li>
</ul>
</li>
<li>
<p><code v-pre>--peer-trusted-ca-file ''</code></p>
<ul>
<li>Path to the peer server TLS trusted CA file.</li>
</ul>
</li>
</ul>
<h4 id="灾备" tabindex="-1"><a class="header-anchor" href="#灾备" aria-hidden="true">#</a> 灾备</h4>
<p><strong>创建Snapshot：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>etcdctl <span class="token parameter variable">--endpoints</span> https://127.0.0.1:3379 <span class="token parameter variable">--cert</span> /tmp/etcd-certs/certs/127.0.0.1.pem <span class="token parameter variable">--key</span> /tmp/etcd-certs/certs/127.0.0.1-key.pem <span class="token parameter variable">--cacert</span> /tmp/etcd-certs/certs/ca.pem snapshot save snapshot.db
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>恢复数据：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>etcdctl snapshot restore snapshot.db <span class="token punctuation">\</span>
<span class="token parameter variable">--name</span> infra2 <span class="token punctuation">\</span>
--data-dir<span class="token operator">=</span>/tmp/etcd/infra2 <span class="token punctuation">\</span>
--initial-cluster <span class="token assign-left variable">infra0</span><span class="token operator">=</span>http://127.0.0.1:3380,infra1<span class="token operator">=</span>http://127.0.0.1:4380,infra2<span class="token operator">=</span>http://127.0.0.1:5380 <span class="token punctuation">\</span>
--initial-cluster-token etcd-cluster-1 <span class="token punctuation">\</span>
--initial-advertise-peer-urls http://127.0.0.1:5380
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="容量管理" tabindex="-1"><a class="header-anchor" href="#容量管理" aria-hidden="true">#</a> 容量管理</h3>
<p><strong>存储建议：</strong></p>
<ol>
<li>
<p>单个对象不建议超过1.5M</p>
</li>
<li>
<p>默认容量2G</p>
</li>
<li>
<p>不建议超过8G</p>
</li>
</ol>
<p><strong>Alarm &amp; Disarm Alarm</strong></p>
<blockquote>
<p>etcd 容量写满后会出现 alarm，alarm 存在的时候 etcd 无法处理写请求。</p>
</blockquote>
<p>设置 etcd 存储阈值</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>etcd --quota-backend-bytes<span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span><span class="token number">16</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token variable">))</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>死循环，模拟写爆磁盘</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token keyword">while</span> <span class="token punctuation">[</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token function">dd</span> <span class="token assign-left variable">if</span><span class="token operator">=</span>/dev/urandom <span class="token assign-left variable">bs</span><span class="token operator">=</span><span class="token number">1024</span> <span class="token assign-left variable">count</span><span class="token operator">=</span><span class="token number">1024</span> <span class="token operator">|</span> <span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span> etcdctl put key <span class="token operator">||</span> <span class="token builtin class-name">break</span><span class="token punctuation">;</span> <span class="token keyword">done</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看endpoint状态</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span> etcdctl --write-out<span class="token operator">=</span>table endpoint status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看alarm</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span> etcdctl alarm list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>清理碎片</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span> etcdctl defrag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>清理 alarm</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span> etcdctl alarm disarm 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="碎片整理" tabindex="-1"><a class="header-anchor" href="#碎片整理" aria-hidden="true">#</a> 碎片整理</h3>
<p>设置每小时压缩一次</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>etcd --auto-compaction-retention<span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>compact up to revision 3</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>etcdctl compact <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>碎片整理</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>etcdctl defrag 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="高可用etcd解决方案" tabindex="-1"><a class="header-anchor" href="#高可用etcd解决方案" aria-hidden="true">#</a> 高可用etcd解决方案</h2>
<blockquote>
<p>前面的 ETCD 备灾 都是手动的，任何出事都需要人工介入。所以，这是很麻烦的。</p>
<p>那么有没有自动的方式来实现呢？ <code v-pre>etcd-operator: coreos</code></p>
</blockquote>
<p><code v-pre>etcd-operator: coreos</code>开源的，基于<code v-pre>kubernetes CRD</code>完成etcd集群配置。Archived</p>
<p>kubeadm 是作为初始化，需要手动安装的。</p>
<p>https://github.com/coreos/etcd-operator</p>
<p>Etcd statefulset Helm chart: Bitnami(powered by vmware)</p>
<p>https://bitnami.com/stack/etcd/helm</p>
<p>https://github.com/bitnami/charts/blob/master/bitnami/etcd</p>
<h3 id="etcd-operator" tabindex="-1"><a class="header-anchor" href="#etcd-operator" aria-hidden="true">#</a> Etcd Operator</h3>
<p><img src="http://sm.cubxxw.com/sm202303051230490.png" alt="img"></p>
<h3 id="基于-bitnami-安装etcd高可用集群" tabindex="-1"><a class="header-anchor" href="#基于-bitnami-安装etcd高可用集群" aria-hidden="true">#</a> 基于 Bitnami 安装etcd高可用集群</h3>
<p>安装helm</p>
<p>https://github.com/helm/helm/releases</p>
<p>通过helm安装etcd</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> bitnami https://charts.bitnami.com/bitnami

helm <span class="token function">install</span> my-release bitnami/etcd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过客户端与serve交互</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl run my-release-etcd-client <span class="token parameter variable">--restart</span><span class="token operator">=</span><span class="token string">'Never'</span> <span class="token parameter variable">--image</span> docker.io/bitnami/etcd:3.5.0-debian-10-r94 <span class="token parameter variable">--env</span> <span class="token assign-left variable">ROOT_PASSWORD</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl get secret <span class="token parameter variable">--namespace</span> default my-release-etcd <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.data.etcd-root-password}"</span><span class="token operator">|</span>base64 <span class="token parameter variable">--decode</span><span class="token variable">)</span></span> <span class="token parameter variable">--env</span> <span class="token assign-left variable">ETCDCTL_ENDPOINTS</span><span class="token operator">=</span><span class="token string">"my-release etcd.default.svc.cluster.local:2379"</span> <span class="token parameter variable">--namespace</span> default <span class="token parameter variable">--command</span> -- <span class="token function">sleep</span> infinity
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="kubernetes如何使用etcd" tabindex="-1"><a class="header-anchor" href="#kubernetes如何使用etcd" aria-hidden="true">#</a> Kubernetes如何使用etcd</h2>
<p>etcd是kubernetes的后端存储,对于每一个kubernetes Object，都有对应的 storage.go 负责对象的存储操作。</p>
<blockquote>
<ul>
<li>pkg/registry/core/pod/storage/storage.go</li>
</ul>
</blockquote>
<p>API server 启动脚本中指定etcd servers集群</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>spec:
containers:
  - command:
    - kube-apiserver
    - --advertise-address<span class="token operator">=</span><span class="token number">192.168</span>.34.2
    - --enable-bootstrap-token-auth<span class="token operator">=</span>true
    - --etcd-cafile<span class="token operator">=</span>/etc/kubernetes/pki/etcd/ca.crt
    - --etcd-certfile<span class="token operator">=</span>/etc/kubernetes/pki/apiserver-etcd-client.crt
    - --etcd-keyfile<span class="token operator">=</span>/etc/kubernetes/pki/apiserver-etcd-client.key
    - --etcd-servers<span class="token operator">=</span>https://127.0.0.1:2379 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>早期 API server 对 etcd 做简单的 Ping check 检测端口是否通，现在已经改为真实的 etcd api call。</p>
<blockquote>
<p>端口通不一定代表服务正常。</p>
</blockquote>
<h3 id="kubernets对象在etcd中的存储路径" tabindex="-1"><a class="header-anchor" href="#kubernets对象在etcd中的存储路径" aria-hidden="true">#</a> Kubernets对象在etcd中的存储路径</h3>
<p>进入 etcd pod</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl <span class="token parameter variable">-n</span> kube-system <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> etcd-cadmin <span class="token function">sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用容器内的 etcdctl 发请求</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span>

<span class="token builtin class-name">alias</span> <span class="token assign-left variable">ectl</span><span class="token operator">=</span><span class="token string">'etcdctl --endpoints https://127.0.0.1:2379 \
--cacert /etc/kubernetes/pki/etcd/ca.crt \
--cert /etc/kubernetes/pki/etcd/server.crt \
--key /etc/kubernetes/pki/etcd/server.key'</span>

ectl get <span class="token parameter variable">--prefix</span> --keys-only /
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="etcd-servers-overrides" tabindex="-1"><a class="header-anchor" href="#etcd-servers-overrides" aria-hidden="true">#</a> etcd-servers-overrides</h3>
<p>k8s 集群中某些对象会大量创建删除，比如 event，创建一个 pod 可能会有几十条 event，这样就会对 etcd 造成较大压力，因此 apiserver 提供了 etcd-servers-overrides 参数，运行再主 etcd server 之外再提供一个 etcd 用来存放哪些不是那么重要的对象。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/usr/local/bin/kube-apiserver <span class="token parameter variable">--etcd_servers</span><span class="token operator">=</span>https://localhost:4001 --etcd-cafile<span class="token operator">=</span>/etc/ssl/kubernetes/ca.crt--storage-backend<span class="token operator">=</span>etcd3 --etcd-servers-overrides<span class="token operator">=</span>/events<span class="token comment">#https://localhost:4002</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="堆叠式etcd集群的高可用拓扑" tabindex="-1"><a class="header-anchor" href="#堆叠式etcd集群的高可用拓扑" aria-hidden="true">#</a> 堆叠式etcd集群的高可用拓扑</h3>
<p>这种拓扑将相同节点上的控制平面和etcd成员耦合在一起。</p>
<p>优点在于建立起来非常容易，并且对副本的管理也更容易。但是，堆叠式存在耦合失败的风险。如果一个节点发生故障，则etcd成员和控制平面实例都会丢失，并且集群冗余也会受到损害。可以通过添加更多控制平面节点来减轻这种风险。因此为实现集群高可用应该至少运行三个堆叠的Master节点。</p>
<p><img src="http://sm.cubxxw.com/sm202303051232586.png" alt="img"></p>
<h3 id="外部etcd集群的高可用拓扑" tabindex="-1"><a class="header-anchor" href="#外部etcd集群的高可用拓扑" aria-hidden="true">#</a> 外部etcd集群的高可用拓扑</h3>
<p>该拓扑将控制平面和etcd成员解耦。如果丢失一个Master节点，对etcd成员的影响较小，并且不会像堆叠式拓扑那样对集群冗余产生太大影响。但是，此拓扑所需的主机数量是堆叠式拓扑的两倍。具有此拓扑的群集至少需要三个主机用于控制平面节点，三个主机用于etcd集群。</p>
<p><img src="http://sm.cubxxw.com/sm202303051232839.png" alt="img"></p>
<h3 id="实践-etcd集群高可用" tabindex="-1"><a class="header-anchor" href="#实践-etcd集群高可用" aria-hidden="true">#</a> 实践-etcd集群高可用</h3>
<h4 id="多少个peer最适合" tabindex="-1"><a class="header-anchor" href="#多少个peer最适合" aria-hidden="true">#</a> 多少个peer最适合</h4>
<ul>
<li>
<p>1个？3个？5个？</p>
<ul>
<li>生成环境推荐 3 个或者 5 个</li>
<li>3 个性能较高，请求过来只需要两个节点确认即可返回</li>
<li>3 个的问题就是出问题后需要运维立马处理，如果处理不及时，万一第二个也坏了整个集群就废了</li>
<li>5 个则可以允许坏两个，能给运维多一点缓冲时间</li>
<li><strong>一般生产环境推荐使用 5 个</strong>。</li>
</ul>
</li>
<li>
<p>保证高可用是首要目标、</p>
</li>
<li>
<p>所有写操作都要经过 leader</p>
</li>
<li>
<p>peer多了是否能提升集群并读操作的并发能力？</p>
<ul>
<li>apiserver的配置只连本地的etcd peer</li>
<li>apiserver的配置指定所有etcd peers，但只有当前连接的etcd member异常，apiserver才会换目标</li>
</ul>
</li>
<li>
<p>需要动态flex up吗？</p>
<ul>
<li>一般情况下 etcd 不需要动态扩缩容，规划好只会就不会在去动了。</li>
</ul>
</li>
</ul>
<h4 id="保证apiserver和etcd之间的高效性通讯" tabindex="-1"><a class="header-anchor" href="#保证apiserver和etcd之间的高效性通讯" aria-hidden="true">#</a> 保证apiserver和etcd之间的高效性通讯</h4>
<ul>
<li>apiserver和etcd 部署在同一节点</li>
<li>apiserver和etcd之间的通讯基于gRPC
<ul>
<li>针对每一个object，apiserver和etcd之间的Connection -&gt; stream 共享</li>
<li>http2的特性
<ul>
<li>Stream quota</li>
<li>带来的问题？对于大规模集群，会造成链路阻塞</li>
<li>10000个pod，一次list操作需要返回的数据可能超过100M</li>
</ul>
</li>
</ul>
</li>
</ul>
<h4 id="etcd存储规划" tabindex="-1"><a class="header-anchor" href="#etcd存储规划" aria-hidden="true">#</a> etcd存储规划</h4>
<p>本地 vs 远程？</p>
<ul>
<li>Remote Storage
<ul>
<li>优势是假设永远可用，现实真是如此吗？</li>
<li>劣势是IO效率，可能带来的问题？</li>
</ul>
</li>
<li>最佳实践：
<ul>
<li>Local SSD</li>
<li>利用local volume分配空间</li>
</ul>
</li>
</ul>
<p>多少空间？</p>
<ul>
<li>与集群规模相关</li>
<li>默认 2G，一般不超过 8G。</li>
</ul>
<p>思考：为什么每个member的DB size不一致？</p>
<h4 id="安全性-1" tabindex="-1"><a class="header-anchor" href="#安全性-1" aria-hidden="true">#</a> 安全性</h4>
<p>peer和peer之间的通讯加密</p>
<ul>
<li>是否有需求
<ul>
<li>TLS的额外开销</li>
<li>运营复杂度增加</li>
</ul>
</li>
</ul>
<p>数据加密</p>
<ul>
<li>是否有需求？</li>
<li>Kubernetes提供了针对secret的加密
<ul>
<li>https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/</li>
</ul>
</li>
</ul>
<p><strong>--etcd-servers-overrides</strong></p>
<ul>
<li>对于大规模集群，大量的事件会对etcd造成压力</li>
<li>API server 启动脚本中指定etcd servers集群</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/usr/local/bin/kube-apiserver <span class="token parameter variable">--etcd_servers</span><span class="token operator">=</span>https://localhost:4001 --etcd-cafile<span class="token operator">=</span>/etc/ssl/kubernetes/ca.crt--storage-backend<span class="token operator">=</span>etcd3 --etcd-servers-overrides<span class="token operator">=</span>/events<span class="token comment">#https://localhost:4002</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="减少网络延迟" tabindex="-1"><a class="header-anchor" href="#减少网络延迟" aria-hidden="true">#</a> 减少网络延迟</h4>
<p>数据中心内的RTT大概是数毫秒，国内的典型RTT约为50ms，两大洲之间的RTT可能慢至400ms。因此建议etcd集群尽量同地域部署。</p>
<p>当客户端到Leader的并发连接数量过多，可能会导致其他Follower节点发往Leader的请求因为网络拥塞而被延迟处理。在Follower节点上，可能会看到这样的错误：</p>
<div class="language-console ext-console line-numbers-mode"><pre v-pre class="language-console"><code>dropped MsgProp to 247ae21ff9436b2d since streamMsg's sending buffer is  full
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以在节点上通过流量控制工具（Traffic Control）提高etcd成员之间发送数据的优先级来避免。</p>
<h4 id="减少磁盘i-o延迟" tabindex="-1"><a class="header-anchor" href="#减少磁盘i-o延迟" aria-hidden="true">#</a> 减少磁盘I/O延迟</h4>
<p>对于磁盘延迟，典型的旋转磁盘写延迟约为10毫秒。对于SSD（Solid State Drives，固态硬盘），延迟通常低于1毫秒。HDD（Hard Disk Drive，硬盘驱动器）或者网盘在大量数据读写操作的情况下延时会不稳定。因此<strong>强烈建议使用SSD</strong>。</p>
<p>同时为了降低其他应用程序的I/O操作对etcd的干扰，建议将etcd的数据存放在单独的磁盘内。也可以将不同类型的对象存储在不同的若干个etcd集群中，比如将频繁变更的event对象从主etcd集群中分离出来，以保证主集群的高性能。在APIServer处这是可以通过参数配置的。这些etcd集群最好也分别能有一块单独的存储磁盘。</p>
<p>如果不可避免地，etcd和其他的业务共享存储磁盘，那么就需要通过下面ionice命令对etcd服务设置更高的磁盘I/O优先级，尽可能避免其他进程的影响。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ionice <span class="token parameter variable">-c2</span> <span class="token parameter variable">-n0</span> <span class="token parameter variable">-p</span> <span class="token string">'pgrep etcd'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="保持合理的日志文件大小" tabindex="-1"><a class="header-anchor" href="#保持合理的日志文件大小" aria-hidden="true">#</a> 保持合理的日志文件大小</h4>
<p>etcd以日志的形式保存数据，无论是数据创建还是修改，它都将操作追加到日志文件，因此日志文件大小会随着数据修改次数而线性增长。</p>
<p>当Kubernetes集群规模较大时，其对etcd集群中的数据更改也会很频繁，集群日记文件会迅速增长。</p>
<p>为了有效降低日志文件大小，etcd会以固定周期创建快照保存系统的当前状态，并移除旧日志文件。另外当修改次数累积到一定的数量（默认是10000，通过参数“--snapshot-count”指定），etcd也会创建快照文件。</p>
<p>如果etcd的内存使用和磁盘使用过高，可以先分析是否数据写入频度过大导致快照频度过高，确认后可通过调低快照触发的阈值来降低其对内存和磁盘的使用。</p>
<h4 id="设置合理的存储配额" tabindex="-1"><a class="header-anchor" href="#设置合理的存储配额" aria-hidden="true">#</a> 设置合理的存储配额</h4>
<p>存储空间的配额用于控制etcd数据空间的大小。合理的存储配额可保证集群操作的可靠性。</p>
<blockquote>
<p>推荐 8G。</p>
</blockquote>
<p>如果没有存储配额，也就是etcd可以利用整个磁盘空间，etcd的性能会因为存储空间的持续增长而严重下降，甚至有耗完集群磁盘空间导致不可预测集群行为的风险。如果设置的存储配额太小，一旦其中一个节点的后台数据库的存储空间超出了存储配额，etcd就会触发集群范围的告警，并将集群置于只接受读和删除请求的维护模式。只有在释放足够的空间、消除后端数据库的碎片和清除存储配额告警之后，集群才能恢复正常操作。</p>
<h4 id="自动压缩历史版本" tabindex="-1"><a class="header-anchor" href="#自动压缩历史版本" aria-hidden="true">#</a> 自动压缩历史版本</h4>
<p>etcd会为每个键都保存了历史版本。为了避免出现性能问题或存储空间消耗完导致写不进去的问题，这些历史版本需要进行周期性地压缩。压缩历史版本就是丢弃该键给定版本之前的所有信息，节省出来的空间可以用于后续的写操作。etcd支持自动压缩历史版本。在启动参数中指定参数 <strong>--auto-compaction</strong>，其值以小时为单位。也就是etcd会自动压缩该值设置的时间窗口之前的历史版本。</p>
<h4 id="定期消除碎片化" tabindex="-1"><a class="header-anchor" href="#定期消除碎片化" aria-hidden="true">#</a> 定期消除碎片化</h4>
<p>压缩历史版本，相当于离散地抹去etcd存储空间某些数据，etcd存储空间中将会出现碎片。这些碎片无法被后台存储使用，却仍占据节点的存储空间。因此定期消除存储碎片，将释放碎片化的存储空间，重新调整整个存储空间。</p>
<h4 id="备份方案" tabindex="-1"><a class="header-anchor" href="#备份方案" aria-hidden="true">#</a> 备份方案</h4>
<p>备份方案</p>
<ul>
<li>etcd备份：备份完整的集群信息，灾难恢复
<ul>
<li>etcdctl snapshot save</li>
</ul>
</li>
<li>备份Kubernetes event</li>
</ul>
<p>频度？</p>
<ul>
<li>
<p>时间间隔太长：</p>
<ul>
<li>能否接受user data lost？</li>
<li>如果有外部资源配置，如负载均衡等，能否接受数据丢失导致的leak？</li>
</ul>
</li>
<li>
<p>时间间隔太短：</p>
<ul>
<li>对etcd的影响
<ul>
<li>做snapshot的时候，etcd会锁住当前数据</li>
<li>并发的写操作需要开辟新的空间进行增量写，导致磁盘空间增长</li>
</ul>
</li>
</ul>
</li>
</ul>
<p>如何保证备份的时效性，同时防止磁盘爆掉？</p>
<ul>
<li>Auto defrag</li>
</ul>
<h4 id="优化运行参数" tabindex="-1"><a class="header-anchor" href="#优化运行参数" aria-hidden="true">#</a> 优化运行参数</h4>
<p>当网络延迟和磁盘延迟固定的情况下，可以优化etcd运行参数来提升集群的工作效率。etcd基于Raft协议进行Leader选举，当Leader选定以后才能开始数据读写操作，因此频繁的Leader选举会导致数据读写性能显著降低。可以通过调整心跳周期（Heatbeat Interval）和选举超时时间（Election Timeout），来降低Leader选举的可能性。</p>
<p>心跳周期是控制Leader以何种频度向Follower发起心跳通知。心跳通知除表明Leader活跃状态之外，还带有待写入数据信息，Follower依据心跳信息进行数据写入，默认心跳周期是100ms。选举超时时间定义了当Follower多久没有收到Leader心跳，则重新发起选举，该参数的默认设置是1000ms。</p>
<p>如果etcd集群的不同实例部署在延迟较低的相同数据中心，通常使用默认配置即可。如果不同实例部署在多数据中心或者网络延迟较高的集群环境，则需要对心跳周期和选举超时时间进行调整。建议心跳周期参数推荐设置为接近etcd多个成员之间平均数据往返周期的最大值，一般是平均RTT的0.55-1.5倍。如果心跳周期设置得过低，etcd会发送很多不必要的心跳信息，从而增加CPU和网络的负担。如果设置得过高，则会导致选举频繁超时。选举超时时间也需要根据etcd成员之间的平均RTT时间来设置。选举超时时间最少设置为etcd成员之间RTT时间的10倍，以便对网络波动。</p>
<p>心跳间隔和选举超时时间的值必须对同一个etcd集群的所有节点都生效，如果各个节点配置不同，就会导致集群成员之间协商结果不可预知而不稳定。</p>
<h4 id="etcd备份存储" tabindex="-1"><a class="header-anchor" href="#etcd备份存储" aria-hidden="true">#</a> etcd备份存储</h4>
<p>etcd的默认工作目录下会生成两个子目录：wal和snap。wal是用于存放预写式日志，其最大的作用是记录整个数据变化的全部历程。所有数据的修改在提交前，都要先写入wal中。</p>
<p>snap是用于存放快照数据。为防止wal文件过多，etcd会定期（当wal中数据超过10000条记录时，由参数“--snapshot-count”设置）创建快照。当快照生成后，wal中数据就可以被删除了。</p>
<p>如果数据遭到破坏或错误修改需要回滚到之前某个状态时，方法就有两个：</p>
<ul>
<li>一是从快照中恢复数据主体，但是未被拍入快照的数据会丢失；</li>
<li>二是执行所有WAL中记录的修改操作，从最原始的数据恢复到数据损坏之前的状态，但恢复的时间较长。</li>
</ul>
<h4 id="备份方案实践" tabindex="-1"><a class="header-anchor" href="#备份方案实践" aria-hidden="true">#</a> 备份方案实践</h4>
<p>官方推荐etcd集群的备份方式是<strong>定期创建快照</strong>。和etcd内部定期创建快照的目的不同，该备份方式依赖外部程序定期创建快照，并将快照上传到网络存储设备以实现etcd数据的冗余备份。上传到网络设备的数据，都应进行了加密。即使当所有etcd实例都丢失了数据，也能允许etcd集群从一个已知的良好状态的时间点在任一地方进行恢复。根据集群对etcd备份粒度的要求，可适当调节备份的周期。在生产环境中实测，拍摄快照通常会影响集群当时的性能，因此不建议频繁创建快照。但是备份周期太长，就可能导致大量数据的丢失。</p>
<p>这里可以使用<strong>增量备份</strong>的方式。备份程序每30分钟触发一次快照的拍摄。紧接着它从快照结束的版本（Revision）开始，监听etcd集群的事件，并每10秒钟将事件保存到文件中，并将快照和事件文件上传到网络存储设备中。30分钟的快照周期对集群性能影响甚微。当大灾难来临时，也至多丢失10秒的数据。至于数据修复，首先把数据从网络存储设备中下载下来，然后从快照中恢复大块数据，并在此基础上依次应用存储的所有事件。这样就可以将集群数据恢复到灾难发生前。</p>
<h4 id="resourceversion" tabindex="-1"><a class="header-anchor" href="#resourceversion" aria-hidden="true">#</a> ResourceVersion</h4>
<p>单个对象的resourceVersion</p>
<ul>
<li>对象的最后修改resourceVersion</li>
</ul>
<p>List对象的resourceVersion</p>
<ul>
<li>生成list response时的resourceVersion</li>
</ul>
<p>List行为</p>
<ul>
<li>
<p>List对象时，如果不加resourceVersion，意味着需要Most Recent数据，请求会击穿APIServer 缓存，直接发送至etcd</p>
</li>
<li>
<p>APIServer 通过Label过滤对象查询时，过滤动作是在APIServer端，APIServer需要向etcd发起全量查询请求</p>
</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '47.md' style='float:left'>⬆️上一节🔗  </a><a href = '49.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><a href="%E3%80%82%E3%80%82/README%E3%80%82md">Ⓜ️回到目录🏠</a></p>
</li>
<li>
<p>[<strong>🫵参与贡献💞❤️‍🔥💖</strong>](https:  //nsddd。top/archives/contributors))</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循[CC-BY-SA 3。0协议（署名-相同方式共享）©](http:  //zh。wikipedia。org/wiki/Wikipedia:  CC-by-sa-3。0协议文本)</p>
</li>
</ul>
</div></template>


