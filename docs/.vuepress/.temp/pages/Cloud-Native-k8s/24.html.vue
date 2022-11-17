<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第24节-etcd" tabindex="-1"><a class="header-anchor" href="#第24节-etcd" aria-hidden="true">#</a> 第24节 ETCD</h1>
<div><a href = '23.md' style='float:left'>⬆️上一节🔗  </a><a href = '25.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="etcd-介绍" tabindex="-1"><a class="header-anchor" href="#etcd-介绍" aria-hidden="true">#</a> ETCD 介绍</h2>
<div class="custom-container tip"><p class="custom-container-title">etcd address</p>
<ul>
<li><a href="https://github.com/etcd-io/etcd" target="_blank" rel="noopener noreferrer">github<ExternalLinkIcon/></a></li>
<li><a href="https://etcd.io/" target="_blank" rel="noopener noreferrer">official websize<ExternalLinkIcon/></a></li>
</ul>
</div>
<p>etcd 是分布式系统最关键数据的分布式可靠键值存储，重点是：</p>
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
<h3 id="分布式-cap-理论" tabindex="-1"><a class="header-anchor" href="#分布式-cap-理论" aria-hidden="true">#</a> 分布式 CAP 理论</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>consistency(一致性)、Availability(可用性)、Partition tolerance(分区容错性)</p>
<p>这三个特性只能同时实现两点，不能三点同时兼顾~</p>
<p>分布式系统的基本特性：<strong>Partition tolerance(分区容错性) 必须要满足</strong></p>
<p>consistency(一致性)、Availability(可用性) 二选一：</p>
<ul>
<li>银行选择数据一致性</li>
<li>大众网页选择服务可用性</li>
</ul>
<p><strong>etcd 归根结底是一个存储组件，可以实现配置共享和服务发现~</strong></p>
</div>
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
<p><img src="http://sm.nsddd.top/smwebp123" alt="img"></p>
<h2 id="搭建-etcd" tabindex="-1"><a class="header-anchor" href="#搭建-etcd" aria-hidden="true">#</a> 搭建 etcd</h2>
<p>可以使用：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum install etcd 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>推荐使用 二进制 、 源码编译、docker安装：</strong></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '23.md' style='float:left'>⬆️上一节🔗  </a><a href = '25.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


