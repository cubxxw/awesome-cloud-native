<template><div><h1 id="docker-swarm-集群管理" tabindex="-1"><a class="header-anchor" href="#docker-swarm-集群管理" aria-hidden="true">#</a> Docker Swarm 集群管理</h1>
<nav class="table-of-contents"><ul><li><router-link to="#swarm">swarm</router-link></li><li><router-link to="#原理">原理</router-link><ul><li><router-link to="#共识算法">共识算法</router-link></li></ul></li><li><router-link to="#命令">命令</router-link><ul><li><router-link to="#初始化集群">初始化集群</router-link></li><li><router-link to="#服务">服务</router-link></li></ul></li><li><router-link to="#其他常用命令">其他常用命令</router-link><ul><li><router-link to="#查看集群信息">查看集群信息</router-link></li><li><router-link to="#部署服务到集群中">部署服务到集群中</router-link></li></ul></li></ul></nav>
<p>[toc]</p>
<h2 id="swarm" tabindex="-1"><a class="header-anchor" href="#swarm" aria-hidden="true">#</a> swarm</h2>
<div class="custom-container warning"><p class="custom-container-title">是什么</p>
<p>Docker Swarm 是 Docker 的集群管理工具。它将 Docker 主机池转变为单个虚拟 Docker 主机。 Docker Swarm 提供了标准的 Docker API，所有任何已经与 Docker 守护程序通信的工具都可以使用 Swarm 轻松地扩展到多个主机。</p>
</div>
<h2 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h2>
<p>如下图所示，swarm 集群由管理节点（manager）和工作节点（work node）构成。</p>
<ul>
<li><strong>swarm mananger</strong>：负责整个集群的管理工作包括集群配置、服务管理等所有跟集群有关的工作。</li>
<li><strong>work node</strong>：即图中的 available node，主要负责运行相应的服务来执行任务（task）。</li>
</ul>
<p><img src="http://sm.nsddd.top/smimage-20221122204223589.png" alt="image-20221122204223589"></p>
<h3 id="共识算法" tabindex="-1"><a class="header-anchor" href="#共识算法" aria-hidden="true">#</a> 共识算法</h3>
<p><strong>swarm 的共识算法和 etcd 共识算法是类似的，使用的是 raft 共识算法，来保证集群的稳定性。</strong></p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>在 CloudNative 中我们可以看到关于 etcd &amp; raft 教程。</p>
</div>
<p>raft 需要保证大部分节点一致性，所以不要心存侥幸~</p>
<p><strong>我们应该尽可能的使用 奇数 作为集群数量。</strong></p>
<blockquote>
<p>1 1 0   0 leader</p>
<p>2 2 0	0 leader</p>
<p>3 2 1	1 leader</p>
<p>5 3 2	2 leader</p>
<p>6 4 2	2 leader</p>
</blockquote>
<p><strong>奇数和偶数一样的~</strong></p>
<h2 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z /<span class="token punctuation">]</span><span class="token comment"># docker swarm -h</span>
Flag shorthand <span class="token parameter variable">-h</span> has been deprecated, please use <span class="token parameter variable">--help</span>

Usage:  <span class="token function">docker</span> swarm COMMAND

Manage Swarm

Commands:
  ca          Display and rotate the root CA
  init        Initialize a swarm
  <span class="token function">join</span>        Join a swarm as a <span class="token function">node</span> and/or manager
  join-token  Manage <span class="token function">join</span> tokens
  leave       Leave the swarm
  unlock      Unlock swarm
  unlock-key  Manage the unlock key
  update      Update the swarm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>init</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Usage:  <span class="token function">docker</span> swarm init <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span>

Initialize a swarm

Options:
      --advertise-addr string                  Advertised address <span class="token punctuation">(</span>format: <span class="token operator">&lt;</span>ip<span class="token operator">|</span>interface<span class="token operator">></span><span class="token punctuation">[</span>:port<span class="token punctuation">]</span><span class="token punctuation">)</span>
      <span class="token parameter variable">--autolock</span>                               Enable manager autolocking <span class="token punctuation">(</span>requiring an unlock key to start a stopped manager<span class="token punctuation">)</span>
      <span class="token parameter variable">--availability</span> string                    Availability of the <span class="token function">node</span> <span class="token punctuation">(</span><span class="token string">"active"</span><span class="token operator">|</span><span class="token string">"pause"</span><span class="token operator">|</span><span class="token string">"drain"</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>default <span class="token string">"active"</span><span class="token punctuation">)</span>
      --cert-expiry duration                   Validity period <span class="token keyword">for</span> <span class="token function">node</span> certificates <span class="token punctuation">(</span>ns<span class="token operator">|</span>us<span class="token operator">|</span>ms<span class="token operator">|</span>s<span class="token operator">|</span>m<span class="token operator">|</span>h<span class="token punctuation">)</span> <span class="token punctuation">(</span>default 2160h0m0s<span class="token punctuation">)</span>
      --data-path-addr string                  Address or interface to use <span class="token keyword">for</span> data path traffic <span class="token punctuation">(</span>format: <span class="token operator">&lt;</span>ip<span class="token operator">|</span>interface<span class="token operator">></span><span class="token punctuation">)</span>
      --data-path-port uint32                  Port number to use <span class="token keyword">for</span> data path traffic <span class="token punctuation">(</span><span class="token number">1024</span> - <span class="token number">49151</span><span class="token punctuation">)</span>. If no value is <span class="token builtin class-name">set</span>
                                               or is <span class="token builtin class-name">set</span> to <span class="token number">0</span>, the default port <span class="token punctuation">(</span><span class="token number">4789</span><span class="token punctuation">)</span> is used.
      --default-addr-pool ipNetSlice           default address pool <span class="token keyword">in</span> CIDR <span class="token function">format</span> <span class="token punctuation">(</span>default <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
      --default-addr-pool-mask-length uint32   default address pool subnet mask length <span class="token punctuation">(</span>default <span class="token number">24</span><span class="token punctuation">)</span>
      --dispatcher-heartbeat duration          Dispatcher heartbeat period <span class="token punctuation">(</span>ns<span class="token operator">|</span>us<span class="token operator">|</span>ms<span class="token operator">|</span>s<span class="token operator">|</span>m<span class="token operator">|</span>h<span class="token punctuation">)</span> <span class="token punctuation">(</span>default 5s<span class="token punctuation">)</span>
      --external-ca external-ca                Specifications of one or <span class="token function">more</span> certificate signing endpoints
      --force-new-cluster                      Force create a new cluster from current state
      --listen-addr node-addr                  Listen address <span class="token punctuation">(</span>format: <span class="token operator">&lt;</span>ip<span class="token operator">|</span>interface<span class="token operator">></span><span class="token punctuation">[</span>:port<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>default <span class="token number">0.0</span>.0.0:2377<span class="token punctuation">)</span>
      --max-snapshots uint                     Number of additional Raft snapshots to retain
      --snapshot-interval uint                 Number of log entries between Raft snapshots <span class="token punctuation">(</span>default <span class="token number">10000</span><span class="token punctuation">)</span>
      --task-history-limit int                 Task <span class="token function">history</span> retention limit <span class="token punctuation">(</span>default <span class="token number">5</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="初始化集群" tabindex="-1"><a class="header-anchor" href="#初始化集群" aria-hidden="true">#</a> 初始化集群</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z /<span class="token punctuation">]</span><span class="token comment"># docker swarm init</span>
Swarm initialized: current <span class="token function">node</span> <span class="token punctuation">(</span>an0oq2uwu0qv2xkfcwwazhjx5<span class="token punctuation">)</span> is now a manager.

To <span class="token function">add</span> a worker to this swarm, run the following command:

    <span class="token function">docker</span> swarm <span class="token function">join</span> <span class="token parameter variable">--token</span> SWMTKN-1-2vqziogty31uuxyw58fwbbvji4323uz24v1hhgusnw0dve7k12-0q89bbp3g4st04eij30x7ob2i <span class="token number">10.0</span>.0.188:2377

To <span class="token function">add</span> a manager to this swarm, run <span class="token string">'docker swarm join-token manager'</span> and follow the instructions.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>生成了一个用于其他节点加入主节点的命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> swarm <span class="token function">join</span> <span class="token parameter variable">--token</span> SWMTKN-1-2vqziogty31uuxyw58fwbbvji4323uz24v1hhgusnw0dve7k12-0q89bbp3g4st04eij30x7ob2i <span class="token number">10.0</span>.0.188:2377
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<p><strong>移除节点（离开集群）：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> swarm leave
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>更新集群：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> swarm update 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="服务" tabindex="-1"><a class="header-anchor" href="#服务" aria-hidden="true">#</a> 服务</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z /<span class="token punctuation">]</span><span class="token comment"># docker service</span>
Usage:  <span class="token function">docker</span> <span class="token function">service</span> COMMAND

Manage services

Commands:
  create      Create a new <span class="token function">service</span>
  inspect     Display detailed information on one or <span class="token function">more</span> services
  logs        Fetch the logs of a <span class="token function">service</span> or task
  <span class="token function">ls</span>          List services
  <span class="token function">ps</span>          List the tasks of one or <span class="token function">more</span> services
  <span class="token function">rm</span>          Remove one or <span class="token function">more</span> services
  rollback    Revert changes to a <span class="token function">service</span><span class="token string">'s configuration
  scale       Scale one or multiple replicated services
  update      Update a service

Run '</span><span class="token function">docker</span> <span class="token function">service</span> COMMAND --help' <span class="token keyword">for</span> <span class="token function">more</span> information on a command.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他常用命令" tabindex="-1"><a class="header-anchor" href="#其他常用命令" aria-hidden="true">#</a> 其他常用命令</h2>
<p>初始化 swarm 集群，进行初始化的这台机器，就是集群的管理节点。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker-machine <span class="token function">ssh</span> swarm-manager
<span class="token function">docker</span> swarm init --advertise-addr <span class="token number">192.168</span>.99.107 <span class="token comment">#这里的 IP 为创建机器时分配的 ip。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看集群信息" tabindex="-1"><a class="header-anchor" href="#查看集群信息" aria-hidden="true">#</a> 查看集群信息</h3>
<p>进入管理节点，执行：docker info 可以查看当前集群的信息。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="部署服务到集群中" tabindex="-1"><a class="header-anchor" href="#部署服务到集群中" aria-hidden="true">#</a> 部署服务到集群中</h3>
<p><strong>注意</strong>：跟集群管理有关的任何操作，都是在管理节点上操作的。</p>
<p>以下例子，在一个工作节点上创建一个名为 helloworld 的服务，这里是随机指派给一个工作节点：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker service create --replicas 1 --name helloworld alpine ping docker.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


