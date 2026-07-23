<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第25节-raft-算法" tabindex="-1"><a class="header-anchor" href="#第25节-raft-算法" aria-hidden="true">#</a> 第25节 raft 算法</h1>
<div><a href = '24.md' style='float:left'>⬆️上一节🔗  </a><a href = '26.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#为什么raft出现">为什么raft出现</router-link></li><li><router-link to="#raft-特性">raft 特性</router-link></li><li><router-link to="#结构">结构</router-link><ul><li><router-link to="#角色转化">角色转化</router-link></li></ul></li><li><router-link to="#不同节点的状态参数">不同节点的状态参数</router-link></li><li><router-link to="#raft-rpc">raft RPC</router-link><ul><li><router-link to="#模式">模式</router-link></li><li><router-link to="#日志和心跳">日志和心跳</router-link></li><li><router-link to="#appendentries-rpc">AppendEntries RPC</router-link></li><li><router-link to="#requestvote-rpc">RequestVote RPC</router-link></li><li><router-link to="#follower-处理循环">Follower 处理循环</router-link></li><li><router-link to="#candidate-处理循环">Candidate 处理循环</router-link></li><li><router-link to="#leader-处理循环">Leader 处理循环</router-link></li></ul></li><li><router-link to="#raft-特性-1">raft 特性</router-link><ul><li><router-link to="#选举限制">选举限制</router-link></li><li><router-link to="#节点之间通信-rpc">节点之间通信：RPC</router-link></li></ul></li><li><router-link to="#leader-选举">Leader 选举</router-link><ul><li><router-link to="#heartbeat-和选举触发流程">Heartbeat 和选举触发流程</router-link></li><li><router-link to="#选举过程">选举过程</router-link></li><li><router-link to="#获胜的判断条件">获胜的判断条件</router-link></li><li><router-link to="#避免无限循环的投票分裂-随机选举超时">避免无限循环的投票分裂：随机选举超时</router-link></li></ul></li><li><router-link to="#leader-向其他节点复制日志-log">Leader 向其他节点复制日志（log）</router-link><ul><li><router-link to="#复制流程">复制流程</router-link></li><li><router-link to="#log-文件组织结构">Log 文件组织结构</router-link></li><li><router-link to="#提交-commit-的定义">提交（commit）的定义</router-link></li><li><router-link to="#log-matching-特性-保证-log-内容一致">Log matching 特性（保证 log 内容一致）</router-link></li><li><router-link to="#log-不一致场景">Log 不一致场景</router-link></li><li><router-link to="#避免-log-不一致-appendentries-中的一致性检查">避免 log 不一致：AppendEntries 中的一致性检查</router-link></li><li><router-link to="#优化">优化</router-link></li></ul></li><li><router-link to="#安全-确保状态机以相同顺序执行相同命令流">安全：确保状态机以相同顺序执行相同命令流</router-link><ul><li><router-link to="#限制一-包含所有已提交-entry-的节点才能被选为-leader">限制一：包含所有已提交 entry 的节点才能被选为 leader</router-link></li><li><router-link to="#限制二-当前任期-副本数量过半-entry-才能提交">限制二：当前任期+副本数量过半，entry 才能提交</router-link></li><li><router-link to="#安全性的简要证明">安全性的简要证明</router-link></li></ul></li><li><router-link to="#follower-candidate-故障-无限重试-请求幂等">Follower/candidate 故障：无限重试 + 请求幂等</router-link></li><li><router-link to="#时序和可用性">时序和可用性</router-link></li><li><router-link to="#集群节点数量变化-membership-changes">集群节点数量变化（membership changes）</router-link></li><li><router-link to="#增删节点可能导致集群分裂">增删节点可能导致集群分裂</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<h2 id="为什么raft出现" tabindex="-1"><a class="header-anchor" href="#为什么raft出现" aria-hidden="true">#</a> 为什么raft出现</h2>
<p>在 Raft 之前，Paxos 几乎是共识算法的代名词，但它有两个严重缺点：</p>
<ol>
<li><strong>很难准确理解</strong>（即使对专业研究者和该领域的教授）</li>
<li><strong>很难正确实现</strong>（复杂 + 某些理论描述比较模糊）</li>
</ol>
<p>🏄‍♂️ 简单来说，paxos 算法太麻烦了，开发很久~</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ul>
<li><a href="https://github.com/cubxxw/cs-awesome-Block_Chain/blob/master/blockchain/README.md" target="_blank" rel="noopener noreferrer">一些共识算法<ExternalLinkIcon/></a></li>
</ul>
</div>
<h2 id="raft-特性" tabindex="-1"><a class="header-anchor" href="#raft-特性" aria-hidden="true">#</a> raft 特性</h2>
<p>Raft 在很多方面与现有的共识算法（例如 Viewstamped Replication）类似，但也有几个新特征：</p>
<ol>
<li><strong>Strong leader</strong>（强领导者）: 使用更强的 leadership 模型。例如， <strong>log entries 只会从 leader 往其他节点同步</strong>。这简化了 replicated log 的管理，使 Raft 理解上更简单。</li>
<li><strong>Leader election</strong>（领导选举）: 使用<strong>随机定时器</strong>来选举 leader，并复用了 任何共识算法本来就都有 heartbeat 机制（只是在 heartbeat 里增加了一点新东西），还能简单、快速地解决冲突。</li>
<li><strong>Membership changes</strong>（节点变更）: 使用一种新的<strong>联合共识</strong> （joint consensus）方式，特点是新老配置所覆盖的两个大多数（majorities）子集 在变更期间是有重叠的，并且集群还能正常工作。</li>
</ol>
<p>Raft 将系统中的角色分为领导者（Leader）、跟从者（Follower）和候选人（Candidate）：</p>
<ul>
<li><strong>Leader</strong>：接受客户端请求，并向 Follower 同步请求日志，当日志同步到大多数节点上后告诉 Follower 提交日志。</li>
<li><strong>Follower</strong>：接受并持久化 Leader 同步的日志，在 Leader 告之日志可以提交之后，提交日志。</li>
<li><strong>Candidate</strong>：Leader 选举过程中的临时角色。</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>或许应该提醒一下，candidate 是follower选举过程中的临时角色，那么你可以想象：</p>
<ul>
<li>或许在选举的时候没有成功，退回到 follower</li>
<li>或许选举成功，成为 leader</li>
<li>或许选举的时候接收到了 leader 的信息（TM好不容器来到股东大会，结果新老板选出来了还骂我迟到）</li>
</ul>
</div>
<p><strong>在很多情况下，Raft 都比 Paxos 和其他共识算法更好，它的优点包括：</strong></p>
<ul>
<li>更简单、更易理解；</li>
<li>描述足够详细，易于工业界实现（已经有几种开源实现并在一些公司落地）；</li>
<li>安全性（无冲突）有规范化描述并经过了证明；</li>
<li>效率与其他算法相当。</li>
</ul>
<p>Raft 实现了和 Paxos 相同的功能，它将一致性分解为多个子问题：Leader 选举（Leader election）、日志同步（Log replication）、安全性（Safety）、日志压缩（Log compaction）、成员变更（Membership change）等。同时，Raft 算法使用了更强的假设来减少了需要考虑的状态，使之变的易于理解和实现。</p>
<h2 id="结构" tabindex="-1"><a class="header-anchor" href="#结构" aria-hidden="true">#</a> 结构</h2>
<p>Raft 要求系统在任意时刻最多只有一个 Leader，正常工作期间只有 Leader 和 Followers。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>Raft 使用心跳（heartbeat）触发 Leader 选举。当服务器启动时，初始化为 Follower。Leader 向所有 Followers 周期性发送 heartbeat。如果 Follower 在选举超时时间内没有收到 Leader 的 heartbeat，就会等待一段随机的时间后发起一次 Leader 选举。</p>
<p>Follower 将其当前 term 加一然后转换为 Candidate。它首先给自己投票并且给集群中的其他服务器发送 RequestVote RPC 。结果有以下三种情况（上面说过，这里规范一下）：</p>
<ul>
<li>赢得了多数的选票，成功选举为 Leader；</li>
<li>收到了 Leader 的消息，表示有其它服务器已经抢先当选了 Leader；</li>
<li>没有服务器赢得多数的选票，Leader 选举失败，<strong>等待选举时间超时后发起下一次选举。</strong></li>
</ul>
</div>
<h3 id="角色转化" tabindex="-1"><a class="header-anchor" href="#角色转化" aria-hidden="true">#</a> 角色转化</h3>
<p><img src="http://sm.cubxxw.com/smraft-124.png" alt="img"></p>
<p>Follower 只响应其他服务器的请求。如果 Follower 超时没有收到 Leader 的消息，它会成为一个 Candidate 并且开始一次 Leader 选举。收到大多数服务器投票的 Candidate 会成为新的 Leader。Leader 在宕机之前会一直保持 Leader 的状态。</p>
<p><img src="http://sm.cubxxw.com/smimage-20221117200855825.png" alt="image-20221117200855825"></p>
<p>Raft 算法将时间分为一个个的任期（term），每一个 term 的开始都是 Leader 选举。在成功选举 Leader 之后，Leader 会在整个 term 内管理整个集群。如果 Leader 选举失败，该 term 就会因为没有 Leader 而结束。</p>
<p><img src="http://sm.cubxxw.com/smimage-20221117201221179.png" alt="image-20221117201221179"></p>
<p>**选举出 Leader 后，Leader 通过定期向所有 Followers 发送心跳信息维持其统治。**若 Follower 一段时间未收到 Leader 的心跳则认为 Leader 可能已经挂了，<strong>再次发起 Leader 选举过程。</strong></p>
<p>Leader 可能会挂掉（fail）或从集群中失联（disconnected），这种情况下会选举一个新 leader。</p>
<div class="custom-container tip"><p class="custom-container-title">leader</p>
<p>leader是每一个任期内只有一个，发送心跳和同步日志是他的功能</p>
<ol>
<li>给予这个 leader 管理 replicated log 的完全职责，</li>
<li><strong>Leader 接受来自客户端的 log entries</strong>，然后复制给其他节点， 并在安全（不会导致冲突）时，告诉这些节点将这些 entries 应用到它们各自的状态机。</li>
</ol>
<p>可能因为网络的原因不可能说是一帆风顺的，所以有一个进度来表示的。</p>
<p>所以我们后面还需要讨论可用性（availability）问题，以及时序（timing）在系统中的角色。</p>
</div>
<h2 id="不同节点的状态参数" tabindex="-1"><a class="header-anchor" href="#不同节点的状态参数" aria-hidden="true">#</a> 不同节点的状态参数</h2>
<p>所有节点上的 <strong>持久状态</strong> ：处理客户端请求时，需要 <strong>先更新这些持久状态（存储在稳定介质上），再响应请求</strong>。</p>
<ol>
<li>
<p><code v-pre>currentTerm</code>：<strong>该节点已知的当前任期</strong>。节点启动时初始化为 0，然后单调递增。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code> <span class="token comment">// https://github.com/etcd-io/etcd/blob/release-0.4/third_party/github.com/goraft/raft/log.go#L112</span>

 <span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>Log<span class="token punctuation">)</span> <span class="token function">currentTerm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">uint64</span> <span class="token punctuation">{</span>
     <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>entries<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
         <span class="token keyword">return</span> l<span class="token punctuation">.</span>startTerm
     <span class="token punctuation">}</span>
        
     <span class="token keyword">return</span> l<span class="token punctuation">.</span>entries<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>entries<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Term <span class="token comment">// 最后一个已提交 entry 所属的任期</span>
 <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>votedFor</code>：<strong>投票给谁</strong>（candidateId）；如果没有就是 none；</p>
</li>
<li>
<p><code v-pre>log[]</code>：log entries，索引从 1 开始；每个 entry 包含了状态机命令和 leader 收到这个 entry 时的 term 信息。</p>
</li>
</ol>
<p>所有节点上的 <strong>易失状态</strong>：</p>
<ol>
<li><code v-pre>commitIndex</code>：最后<strong>提交的 entry 的 index</strong>；初始化为 0，然后单调递增；</li>
<li><code v-pre>lastAppliedIndex</code>：最后 <strong>apply 到状态机的 index</strong> ；初始化为 0，单调递增；</li>
</ol>
<p><strong>Leader</strong> 节点上的 <strong>易失状态</strong> ：选举之后重新初始化</p>
<ol>
<li><code v-pre>nextIndex[]</code>，<strong>为每个节点分别维护的编号，下次 replicate entry 时用</strong>；初始化为 <code v-pre>leader_last_log_index + 1</code></li>
<li><code v-pre>matchIndex[]</code> ，为每个节点分别维护的编号，表示<strong>已知的、复制成功的最大 index</strong>；初始化为 0，单调递增。</li>
</ol>
<h2 id="raft-rpc" tabindex="-1"><a class="header-anchor" href="#raft-rpc" aria-hidden="true">#</a> raft RPC</h2>
<div class="custom-container tip"><p class="custom-container-title">理解 RPC</p>
<p>RPC可以想象为HTTP，准确来说是HTTP的不同模式，gRPC 是可用 HTTP2.0 的，那么此时我认为需要说明通信方式：</p>
<ul>
<li><strong>单工</strong>：永远只有一方可以给另外一方发送消息</li>
<li><strong>半双工</strong>：在同一时间段中，只有一方能给另外一方发送消息，只有当消息发送完毕之后，另外一方才可以发送消息。（HTTP1.1)</li>
<li><strong>全双工</strong> ：两方都可以随时向对方发送消息。（HTTP2.0）</li>
</ul>
<p><strong>RPC 使用 TCP 支持上面三种方式~</strong></p>
<p>RPC 使用 二进制进行通信，而不是 HTTP ，优势在于：</p>
<ol>
<li>更小的数据包体积（二进制数据而非文本数据）</li>
<li>更快的编解码速度（计算机对二进制数据的编解码速度很明显高于对文本数据的编解码速度！）</li>
</ol>
</div>
<h3 id="模式" tabindex="-1"><a class="header-anchor" href="#模式" aria-hidden="true">#</a> 模式</h3>
<p><strong>候选人发起 选举投票RPC 到leader 或者 candidate</strong>：</p>
<ol>
<li>leader  变成 candidate 立即投票</li>
<li>选举超时</li>
</ol>
<p><strong>领导者发起 RPC 到 leader</strong>：</p>
<ol>
<li>日志追加</li>
<li>心跳通知</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ul>
<li>收到大部分投票，变成 leader</li>
<li>接收到来自 new leader 的附加 log RPC，变成follower</li>
<li>over time ，another election</li>
</ul>
</div>
<h3 id="日志和心跳" tabindex="-1"><a class="header-anchor" href="#日志和心跳" aria-hidden="true">#</a> 日志和心跳</h3>
<p>心跳证明 leader 还活着</p>
<p>如果追加的 log 为 nil ，那么说这个就是 心跳</p>
<div class="custom-container tip"><p class="custom-container-title">什么时候激发出日志</p>
<ol>
<li>客户端发起 write command</li>
<li>发起 心跳</li>
<li>log err</li>
</ol>
</div>
<div class="custom-container tip"><p class="custom-container-title">日志同步</p>
<p>Leader 选出后，就开始接收客户端的请求。Leader 把请求作为日志条目（Log entries）加入到它的日志中，然后并行的向其他服务器发起 AppendEntries RPC 、复制日志条目。当这条日志被复制到大多数服务器上，Leader 将这条日志应用到它的状态机并向客户端返回执行结果。</p>
<p><img src="http://sm.cubxxw.com/smimage-20221117211226288.png" alt="image-20221117211226288"></p>
<p>某些 Followers 可能没有成功的复制日志，Leader 会无限的重试 AppendEntries RPC 直到所有的 Followers 最终存储了所有的日志条目。</p>
<p>日志由有序编号（log index）的日志条目组成。每个日志条目包含它被创建时的任期号（term），和用于状态机执行的命令。如果一个日志条目被复制到大多数服务器上，就被认为可以提交（commit）了。</p>
</div>
<h3 id="appendentries-rpc" tabindex="-1"><a class="header-anchor" href="#appendentries-rpc" aria-hidden="true">#</a> <code v-pre>AppendEntries</code> RPC</h3>
<p>用途：由 leader 发起，用于 replicate log entries (§5.3)，<strong>也用作心跳</strong> §5.2；</p>
<p>参数：</p>
<ol>
<li><code v-pre>term</code>：leader 的任期编号；</li>
<li><code v-pre>leaderId</code>：<strong>follower 重定向客户端</strong>时会用到；</li>
<li><code v-pre>prevLogIndex</code>：上一个 log entry 的 index；</li>
<li><code v-pre>prevLogTerm</code>：prevLogIndex entry 的 term；</li>
<li><code v-pre>entries[]</code>：需要追加到 log 的新 entry（如果是 heartbeat，那数组为空；否则出于效率考虑可能会有多个）；</li>
<li><code v-pre>leaderCommit</code>：leader 的 commitIndex；</li>
</ol>
<p>返回结果</p>
<ol>
<li><code v-pre>term</code>：currentTerm，leader 用来更新它自己；</li>
<li><code v-pre>success</code>：如果 follower 包含了匹配 prevLogIndex and prevLogTerm 的 entry，则返回 <code v-pre>true</code>。</li>
</ol>
<p>看一段代码就比较清楚了：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// https://github.com/etcd-io/etcd/blob/release-0.4/third_party/github.com/goraft/raft/log.go#L467</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>Log<span class="token punctuation">)</span> <span class="token function">appendEntries</span><span class="token punctuation">(</span>entries <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>protobuf<span class="token punctuation">.</span>LogEntry<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    startPosition<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> l<span class="token punctuation">.</span>file<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>SEEK_CUR<span class="token punctuation">)</span> <span class="token comment">// 定位到起始写入位置</span>

    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token keyword">range</span> entries <span class="token punctuation">{</span> <span class="token comment">// Append each entry util hit an error.</span>
        logEntry <span class="token operator">:=</span> <span class="token operator">&amp;</span>LogEntry<span class="token punctuation">{</span>
            log<span class="token punctuation">:</span>       l<span class="token punctuation">,</span>             <span class="token comment">// 日志文件</span>
            Position<span class="token punctuation">:</span>  startPosition<span class="token punctuation">,</span> <span class="token comment">// 起始写入位置</span>
            pb<span class="token punctuation">:</span>        entries<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span>    <span class="token comment">// 待写入 log entry</span>
        <span class="token punctuation">}</span>

        size <span class="token operator">=</span> l<span class="token punctuation">.</span><span class="token function">writeEntry</span><span class="token punctuation">(</span>logEntry<span class="token punctuation">,</span> w<span class="token punctuation">)</span>
        startPosition <span class="token operator">+=</span> size
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>Log<span class="token punctuation">)</span> <span class="token function">writeEntry</span><span class="token punctuation">(</span>entry <span class="token operator">*</span>LogEntry<span class="token punctuation">,</span> w io<span class="token punctuation">.</span>Writer<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int64</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>entries<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
        lastEntry <span class="token operator">:=</span> l<span class="token punctuation">.</span>entries<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>entries<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token comment">// 上一个已经写入日志的 entry</span>

        <span class="token keyword">if</span> entry<span class="token punctuation">.</span>Term <span class="token operator">&lt;</span> lastEntry<span class="token punctuation">.</span>Term           <span class="token comment">// 待写入 entry 所带的任期号不能小于前一 entry 所带的任期号</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"raft.Log: Cannot append entry with earlier term"</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> entry<span class="token punctuation">.</span>Term <span class="token operator">==</span> lastEntry<span class="token punctuation">.</span>Term <span class="token operator">&amp;&amp;</span> entry<span class="token punctuation">.</span>Index <span class="token operator">&lt;=</span> lastEntry<span class="token punctuation">.</span>Index <span class="token comment">// 写入位置必须在前一个 entry 之后</span>
            <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"raft.Log: Cannot append entry with earlier index in the same term"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    size <span class="token operator">:=</span> entry<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span> <span class="token comment">// 写到持久存储，然后就可以 append 到 entries list 了</span>
    l<span class="token punctuation">.</span>entries<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>entry<span class="token punctuation">)</span>

    <span class="token keyword">return</span> <span class="token function">int64</span><span class="token punctuation">(</span>size<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="requestvote-rpc" tabindex="-1"><a class="header-anchor" href="#requestvote-rpc" aria-hidden="true">#</a> <code v-pre>RequestVote</code> RPC</h3>
<p>用途：由 candidate 发起，用于收集选票（gather votes）；</p>
<p>参数：</p>
<ul>
<li><code v-pre>term</code> candidate’s term</li>
<li><code v-pre>candidateId</code> candidate requesting vote</li>
<li><code v-pre>lastLogIndex</code> index of candidate’s last log entry (§5.4)</li>
<li><code v-pre>lastLogTerm</code> term of candidate’s last log entry (§5.4)</li>
</ul>
<p>返回结果</p>
<ul>
<li><code v-pre>term</code> currentTerm, for candidate to update itself</li>
<li><code v-pre>voteGranted</code> true means candidate received vote</li>
</ul>
<p>同样，看一段代码就很清楚了：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// https://github.com/etcd-io/etcd/blob/release-0.4/third_party/github.com/goraft/raft/server.go#L1071</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>server<span class="token punctuation">)</span> <span class="token function">processRequestVoteRequest</span><span class="token punctuation">(</span>req <span class="token operator">*</span>RequestVoteRequest<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>RequestVoteResponse<span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> s<span class="token punctuation">.</span>peers<span class="token punctuation">[</span>req<span class="token punctuation">.</span>CandidateName<span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token operator">!</span>ok <span class="token comment">// Candidate 节点不在本集群，直接 deny</span>
        <span class="token keyword">return</span> <span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">false</span>

    <span class="token keyword">if</span> req<span class="token punctuation">.</span>Term <span class="token operator">&lt;</span> s<span class="token punctuation">.</span>Term   <span class="token comment">// 请求来自更早的任期（old term），直接拒绝</span>
        <span class="token keyword">return</span> <span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">false</span>

    <span class="token keyword">if</span> req<span class="token punctuation">.</span>Term <span class="token operator">></span> s<span class="token punctuation">.</span>Term <span class="token punctuation">{</span> <span class="token comment">// 看到了比本节点还要新的任期号（term number），update 到本节点</span>
        s<span class="token punctuation">.</span><span class="token function">updateCurrentTerm</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>Term<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> s<span class="token punctuation">.</span>votedFor <span class="token operator">!=</span> <span class="token string">""</span> <span class="token operator">&amp;&amp;</span> s<span class="token punctuation">.</span>votedFor <span class="token operator">!=</span> req<span class="token punctuation">.</span>CandidateName <span class="token punctuation">{</span> <span class="token comment">// 当前节点已经投给了其他 candidate</span>
        <span class="token keyword">return</span> <span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>

    lastIndex<span class="token punctuation">,</span> lastTerm <span class="token operator">:=</span> s<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">lastInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> lastIndex <span class="token operator">></span> req<span class="token punctuation">.</span>LastLogIndex <span class="token operator">||</span> lastTerm <span class="token operator">></span> req<span class="token punctuation">.</span>LastLogTerm <span class="token comment">// 如果 candidate 的 log 比我们的要老，则不投给它</span>
        <span class="token keyword">return</span> <span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">false</span>

    <span class="token comment">// 投票给该 candidate，然后重置本节点的 election timeout</span>
    s<span class="token punctuation">.</span>votedFor <span class="token operator">=</span> req<span class="token punctuation">.</span>CandidateName
    <span class="token keyword">return</span> <span class="token function">newRequestVoteResponse</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>currentTerm<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="follower-处理循环" tabindex="-1"><a class="header-anchor" href="#follower-处理循环" aria-hidden="true">#</a> Follower 处理循环</h3>
<ul>
<li>对来自 candidate 和 leader 的 RPC 请求做出响应；</li>
<li>如果<strong>直到 election timeout</strong> 都没从当前 leader 收到 <code v-pre>AppendEntries</code> RPC，也没有投票给某个 candidate，则<strong>转入 candidate 状态</strong>。</li>
</ul>
<p><strong>状态机：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// https://github.com/etcd-io/etcd/blob/release-0.4/third_party/github.com/goraft/raft/server.go#L664</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>server<span class="token punctuation">)</span> <span class="token function">followerLoop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> s<span class="token punctuation">.</span><span class="token function">State</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> Follower <span class="token punctuation">{</span>
        <span class="token keyword">select</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> e <span class="token operator">:=</span> <span class="token operator">&lt;-</span>s<span class="token punctuation">.</span>c<span class="token punctuation">:</span>
            <span class="token keyword">switch</span> req <span class="token operator">:=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> JoinCommand<span class="token punctuation">:</span>
                <span class="token comment">//If no log entries exist and a self-join command is issued then immediately become leader and commit entry.</span>
                <span class="token keyword">if</span> s<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">currentIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> req<span class="token punctuation">.</span><span class="token function">NodeName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> s<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    s<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>Leader<span class="token punctuation">)</span>
                    s<span class="token punctuation">.</span><span class="token function">processCommand</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> e<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
            <span class="token keyword">case</span> <span class="token operator">*</span>AppendEntriesRequest<span class="token punctuation">:</span>
                <span class="token comment">// If heartbeats get too close to the election timeout then send an event.</span>
                <span class="token keyword">if</span> elapsedTime <span class="token operator">></span> electionTimeout<span class="token operator">*</span>ElectionTimeoutThresholdPercent <span class="token punctuation">{</span>
                    s<span class="token punctuation">.</span><span class="token function">DispatchEvent</span><span class="token punctuation">(</span>ElectionTimeoutThresholdEventType<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                s<span class="token punctuation">.</span><span class="token function">processAppendEntriesRequest</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
            <span class="token keyword">case</span> <span class="token operator">*</span>RequestVoteRequest<span class="token punctuation">:</span>
                s<span class="token punctuation">.</span><span class="token function">processRequestVoteRequest</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
            <span class="token keyword">case</span> <span class="token operator">*</span>SnapshotRequest<span class="token punctuation">:</span>
                s<span class="token punctuation">.</span><span class="token function">processSnapshotRequest</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>

        <span class="token keyword">case</span> <span class="token operator">&lt;-</span>timeoutChan<span class="token punctuation">:</span>
            s<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>Candidate<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        timeoutChan <span class="token operator">=</span> <span class="token function">afterBetween</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">ElectionTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span><span class="token function">ElectionTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="candidate-处理循环" tabindex="-1"><a class="header-anchor" href="#candidate-处理循环" aria-hidden="true">#</a> Candidate 处理循环</h3>
<p>转成 candidate 角色之后，立即<strong>开始选举</strong>，</p>
<ol>
<li>增大 <code v-pre>currentTerm</code></li>
<li><strong>投票给自己</strong></li>
<li>重置选举定时器</li>
<li>发送 <code v-pre>RequestVote</code> RPCs 给其他所有节点</li>
</ol>
<p>根据结果，</p>
<ul>
<li>如果收到了大多数节点的赞成票，则成为 leader；</li>
<li>如果从新 leader 收到了 <code v-pre>AppendEntries</code> RPC，则转入 follower 角色；</li>
<li>如果 election timeout，再次开始选举。</li>
</ul>
<p>状态机：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// https://github.com/etcd-io/etcd/blob/release-0.4/third_party/github.com/goraft/raft/server.go#L730</span>

<span class="token comment">// The event loop that is run when the server is in a Candidate state.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>server<span class="token punctuation">)</span> <span class="token function">candidateLoop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    prevLeader <span class="token operator">:=</span> s<span class="token punctuation">.</span>leader
    s<span class="token punctuation">.</span>leader <span class="token operator">=</span> <span class="token string">""</span>

    lastLogIndex<span class="token punctuation">,</span> lastLogTerm <span class="token operator">:=</span> s<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">lastInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    doVote <span class="token operator">:=</span> <span class="token boolean">true</span>
    votesGranted <span class="token operator">:=</span> <span class="token number">0</span>

    <span class="token keyword">for</span> s<span class="token punctuation">.</span><span class="token function">State</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> Candidate <span class="token punctuation">{</span>
        <span class="token keyword">if</span> doVote <span class="token punctuation">{</span>
            s<span class="token punctuation">.</span>currentTerm<span class="token operator">++</span>      <span class="token comment">// Increment current term, vote for self.</span>
            s<span class="token punctuation">.</span>votedFor <span class="token operator">=</span> s<span class="token punctuation">.</span>name

            <span class="token comment">// Send RequestVote RPCs to all other servers.</span>
            respChan <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>RequestVoteResponse<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>peers<span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> peer <span class="token operator">:=</span> <span class="token keyword">range</span> s<span class="token punctuation">.</span>peers <span class="token punctuation">{</span>
                 <span class="token function">sendVoteRequest</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>currentTerm<span class="token punctuation">,</span> s<span class="token punctuation">.</span>name<span class="token punctuation">,</span> lastLogIndex<span class="token punctuation">,</span> lastLogTerm<span class="token punctuation">,</span> respChan<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// Wait for either:</span>
            <span class="token comment">//   * Votes received from majority of servers: become leader</span>
            <span class="token comment">//   * AppendEntries RPC received from new leader: step down.</span>
            <span class="token comment">//   * Election timeout elapses without election resolution: increment term, start new election</span>
            <span class="token comment">//   * Discover higher term: step down (§5.1)</span>
            votesGranted <span class="token operator">=</span> <span class="token number">1</span>
            timeoutChan <span class="token operator">=</span> <span class="token function">afterBetween</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">ElectionTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span><span class="token function">ElectionTimeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">*</span><span class="token number">2</span><span class="token punctuation">)</span>
            doVote <span class="token operator">=</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// If we received enough votes then stop waiting for more votes.</span>
        <span class="token keyword">if</span> votesGranted <span class="token operator">==</span> s<span class="token punctuation">.</span><span class="token function">QuorumSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            s<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>Leader<span class="token punctuation">)</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Collect votes from peers.</span>
        <span class="token keyword">select</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> resp <span class="token operator">:=</span> <span class="token operator">&lt;-</span>respChan<span class="token punctuation">:</span>
            <span class="token keyword">if</span> success <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">processVoteResponse</span><span class="token punctuation">(</span>resp<span class="token punctuation">)</span><span class="token punctuation">;</span> success
                votesGranted<span class="token operator">++</span>

        <span class="token keyword">case</span> e <span class="token operator">:=</span> <span class="token operator">&lt;-</span>s<span class="token punctuation">.</span>c<span class="token punctuation">:</span>
            <span class="token keyword">var</span> err <span class="token builtin">error</span>
            <span class="token keyword">switch</span> req <span class="token operator">:=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> Command<span class="token punctuation">:</span>
                err <span class="token operator">=</span> NotLeaderError
            <span class="token keyword">case</span> <span class="token operator">*</span>AppendEntriesRequest<span class="token punctuation">:</span>
                s<span class="token punctuation">.</span><span class="token function">processAppendEntriesRequest</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
            <span class="token keyword">case</span> <span class="token operator">*</span>RequestVoteRequest<span class="token punctuation">:</span>
                s<span class="token punctuation">.</span><span class="token function">processRequestVoteRequest</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>

            <span class="token comment">// Callback to event.</span>
            e<span class="token punctuation">.</span>c <span class="token operator">&lt;-</span> err

        <span class="token keyword">case</span> <span class="token operator">&lt;-</span>timeoutChan<span class="token punctuation">:</span>
            doVote <span class="token operator">=</span> <span class="token boolean">true</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="leader-处理循环" tabindex="-1"><a class="header-anchor" href="#leader-处理循环" aria-hidden="true">#</a> Leader 处理循环</h3>
<p>定期发送心跳（空的 AppendEntries）给其他节点，防止它们 election timeout (§5.2)</p>
<p>从客户端接受请求，将 entry 追加到 local log，<strong>等 entry 应用到状态机之后再发送响应</strong> (§5.3)</p>
<p>对于 <code v-pre>follower  i</code>，如果 <code v-pre>lastLogIndex ≥ nextIndex[i] </code>：将从<code v-pre>nextIndex[i]</code>开始的所有 log entry 发送给节点 i</p>
<ul>
<li>如果成功：更新 nextIndex[i] 和 matchIndex[i] (§5.3)</li>
<li>如果因为 log inconsistency 失败：<code v-pre>nextIndex[i]--</code> 然后重试以上过程 (§5.3)</li>
</ul>
<p>如果存在 N 满足 <code v-pre>N &gt; commitIndex</code>、<code v-pre>matchIndex[i] ≥ N</code> 对大部分 i 成立、<code v-pre>log[N].term == currentTerm</code>：设置 <code v-pre>commitIndex = N</code></p>
<p>状态机：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// https://github.com/etcd-io/etcd/blob/release-0.4/third_party/github.com/goraft/raft/server.go#L811</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>server<span class="token punctuation">)</span> <span class="token function">leaderLoop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    logIndex<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> s<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">lastInfo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// Update the peers prevLogIndex to leader's lastLogIndex and start heartbeat.</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> peer <span class="token operator">:=</span> <span class="token keyword">range</span> s<span class="token punctuation">.</span>peers <span class="token punctuation">{</span>
        peer<span class="token punctuation">.</span><span class="token function">setPrevLogIndex</span><span class="token punctuation">(</span>logIndex<span class="token punctuation">)</span>
        peer<span class="token punctuation">.</span><span class="token function">startHeartbeat</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 定期发送心跳</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Commit a NOP after the server becomes leader.</span>
    <span class="token comment">// "Upon election: send initial empty AppendEntries RPCs (heartbeat) to each server."</span>
    s<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>NOPCommand<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    <span class="token comment">// Begin to collect response from followers</span>
    <span class="token keyword">for</span> s<span class="token punctuation">.</span><span class="token function">State</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> Leader <span class="token punctuation">{</span>
        <span class="token keyword">select</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> e <span class="token operator">:=</span> <span class="token operator">&lt;-</span>s<span class="token punctuation">.</span>c<span class="token punctuation">:</span>
            <span class="token keyword">switch</span> req <span class="token operator">:=</span> e<span class="token punctuation">.</span>target<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> Command<span class="token punctuation">:</span>
                s<span class="token punctuation">.</span><span class="token function">processCommand</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> e<span class="token punctuation">)</span>
                <span class="token keyword">continue</span>
            <span class="token keyword">case</span> <span class="token operator">*</span>AppendEntriesRequest<span class="token punctuation">:</span>
                s<span class="token punctuation">.</span><span class="token function">processAppendEntriesRequest</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
            <span class="token keyword">case</span> <span class="token operator">*</span>AppendEntriesResponse<span class="token punctuation">:</span>
                s<span class="token punctuation">.</span><span class="token function">processAppendEntriesResponse</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
            <span class="token keyword">case</span> <span class="token operator">*</span>RequestVoteRequest<span class="token punctuation">:</span>
                s<span class="token punctuation">.</span><span class="token function">processRequestVoteRequest</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    s<span class="token punctuation">.</span>syncedPeer <span class="token operator">=</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="raft-特性-1" tabindex="-1"><a class="header-anchor" href="#raft-特性-1" aria-hidden="true">#</a> raft 特性</h2>
<ol>
<li><strong>Election Safety</strong>（选举安全）：在任意 term（任期）内，<strong>最多只会有一个</strong> leader 被选出来</li>
<li><strong>Leader Append-Only</strong>（只追加）：leader 从不覆盖或删除它的日志中的 entry；只会追加（append）。</li>
<li><strong>Log Matching</strong>（日志匹配）：如果两个日志包含了 <strong>index 和 term 完全相同的 entry</strong>， 那<strong>从这个 index 往前的那些 entry</strong> 也都是完全相同的。</li>
<li><strong>Leader Completeness</strong>：如果一个 entry 在某个 term 被提交，那它将出现在所有 term 更大的 leaders 的 log 中。</li>
<li><strong>State Machine Safety</strong>（状态机安全）：如果一个节点在特定 index 应用了一个 entry 到它的状态机，那其他节点不会在相同 idnex 应用另一个不同的 entry。</li>
</ol>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<ul>
<li>每个人给自己投票，没有选择出 leader ，都在等待选举超时，所以此时没有 leader</li>
<li>日志只能 append， 不可 checkout</li>
<li>选民只会投给任期比自己大，最后一条日志比自己新（任期大于或者等于时索引更大）候选人。</li>
</ul>
<p><strong>这个真的正确嘛？</strong></p>
<p>一个 Raft cluster 包括若干台节点，例如典型的 5 台，这样一个集群能容忍 2 台节点发生故障。</p>
<p><strong>再一次理解任期：</strong></p>
<p>Raft 将时间划分为<strong>长度不固定的任期</strong>，任期用连续的整数表示</p>
<p><img src="http://sm.cubxxw.com/smimage-20221117214044046.png" alt="image-20221117214044046"></p>
<ol>
<li><strong>每个任期都是从选举开始的</strong>，此时多个 candidate 都试图成为 leader。</li>
<li>某个 candidate 赢得选举后，就会成为该任期内的 leader。 <strong>Raft 保证了在任意一个任期内，最多只会有一个 leader</strong>。</li>
<li><strong>有时选举会失败（投票结果会分裂），这种情况下该任期内就没有 leader</strong>。 但问题不大，因为很快将开始新一轮选举（产生一个新任期）。</li>
<li><strong>不同节点上看到的任期转换时刻可能会不同</strong>。 在某些情况下，一个节点<strong>可能观察不到某次选举甚至整个任期</strong>。</li>
</ol>
<p><strong>⚠️ 另外：</strong></p>
<ul>
<li>Raft 中，任期是一个<strong>逻辑时钟</strong> [14]，用来让各节点<strong>检测过期信息</strong>，例如过期的 leader。</li>
<li>每个节点都<strong>记录了当前任期号</strong> currentTerm，这个编号随着时间单调递增。</li>
<li>节点之间通信时，会带上它们各自的 currentTerm 信息；
<ul>
<li>如果一个节点<strong>发现自己的 currentTerm 小于其他节点的，要立即更新自己的</strong>；</li>
<li>如果一个 candidate 或 leader <strong>发现自己的任期过期了，要立即切换到 follower 状态</strong>。</li>
<li>如果一个节点接收到携带了过期任期编号（stale term）的请求，会拒绝这个请求。</li>
</ul>
</li>
</ul>
</div>
<h3 id="选举限制" tabindex="-1"><a class="header-anchor" href="#选举限制" aria-hidden="true">#</a> 选举限制</h3>
<p>我们再解释一下选举限制</p>
<p><img src="http://sm.cubxxw.com/smimage-20221117214551553.png" alt="image-20221117214551553"></p>
<div class="custom-container tip"><p class="custom-container-title">我们必须要📜 对上面的解释</p>
<p>在阶段 a，term 为 2，S1 是 Leader，且 S1 写入日志（term, index）为 (2, 2)，并且日志被同步写入了 S2；</p>
<p>在阶段 b，S1 离线，触发一次新的选主，此时 S5 被选为新的 Leader，此时系统 term 为 3，且写入了日志（term, index）为（3， 2）;</p>
<p>S5 尚未将日志推送到 Followers 就离线了，进而触发了一次新的选主，而之前离线的 S1 经过重新上线后被选中变成 Leader，此时系统 term 为 4，此时 S1 会将自己的日志同步到 Followers，按照上图就是将日志（2， 2）同步到了 S3，而此时由于该日志已经被同步到了多数节点（S1, S2, S3），因此，此时日志（2，2）可以被提交了。；</p>
<p>在阶段 d，S1 又下线了，触发一次选主，而 S5 有可能被选为新的 Leader（这是因为 S5 可以满足作为主的一切条件：1. term = 5 &gt; 4，2. 最新的日志为（3，2），比大多数节点（如 S2/S3/S4 的日志都新），然后 S5 会将自己的日志更新到 Followers，于是 S2、S3 中已经被提交的日志（2，2）被截断了。</p>
<p>增加上述限制后，即使日志（2，2）已经被大多数节点（S1、S2、S3）确认了，但是它不能被提交，因为它是来自之前 term（2）的日志，直到 S1 在当前 term（4）产生的日志（4， 4）被大多数 Followers 确认，S1 方可提交日志（4，4）这条日志，当然，根据 Raft 定义，（4，4）之前的所有日志也会被提交。此时即使 S1 再下线，重新选主时 S5 不可能成为 Leader，因为它没有包含大多数节点已经拥有的日志（4，4）。</p>
<p>⚠️ <strong>所有新上任的领导者在接收客户端写入命令之前，需要提交一个 空 （no-op) 命令，携带自己的任期号的日志复制到大多数集群节点上才能真正的保证选举限制的成立。</strong></p>
<blockquote>
<p><strong>无论领导者如何切换，必须要保证日志的连续。</strong></p>
</blockquote>
</div>
<h3 id="节点之间通信-rpc" tabindex="-1"><a class="header-anchor" href="#节点之间通信-rpc" aria-hidden="true">#</a> 节点之间通信：RPC</h3>
<p>Raft 服务器之间通过 RPC 通信，基础的共识算法只需要两种 RPC：</p>
<ol>
<li><strong><code v-pre>RequestVote</code></strong>：由 candidates 在选举期间发起 ；</li>
<li><strong><code v-pre>AppendEntries</code></strong>：由 leader 发起，用于 replicate log entries 并作为一种 heartbeat 方式 .</li>
</ol>
<p>另外，Section 7 还会看到一种在服务器之间传输 snapshot 用的 RPC。</p>
<p>如果在一段时间内没有收到响应，服务器会对 RPC 进行重试；另外，为了最佳性能，服务器会并发执行 RPC。</p>
<h2 id="leader-选举" tabindex="-1"><a class="header-anchor" href="#leader-选举" aria-hidden="true">#</a> Leader 选举</h2>
<h3 id="heartbeat-和选举触发流程" tabindex="-1"><a class="header-anchor" href="#heartbeat-和选举触发流程" aria-hidden="true">#</a> Heartbeat 和选举触发流程</h3>
<p>Raft <strong>使用一种 heartbeat 机制来触发 leader 选举</strong>。</p>
<ol>
<li><strong>节点启动时是 follower 状态</strong>；只要能持续从 leader 或 candidate 收到合法的 RPC 请求，就会一直保持在 follower 状态；</li>
<li>Leaders 定期<strong>发送心跳</strong>给（空的 <strong><code v-pre>AppendEntries</code></strong> 消息）所有的 follower，以保持它的权威；</li>
<li>如果一个 follower 在 <strong>election timeout</strong> 时间段内都没有收到来 自 leader/candidate 的通信，就认为当前已经没有有效 leader 了，然后发起一次选举。</li>
</ol>
<h3 id="选举过程" tabindex="-1"><a class="header-anchor" href="#选举过程" aria-hidden="true">#</a> 选举过程</h3>
<p>对于一个 follower，当开始选举时，<strong>首先增大自己当前的 term</strong>，然后切换到 candidate 状态，然后选举自己作为 leader，同时并发地向集群其他节点发送 RequestVote RPC，</p>
<p>然后它将处于 candidate 状态，直到发生以下三种情况之一，下文会分别讨论：</p>
<ol>
<li>该 follower 赢得此次选举，成为 leader；</li>
<li>另一个节点赢得此次选举，成为 leader；</li>
<li>选举超时，没有产生有效 leader。</li>
</ol>
<h3 id="获胜的判断条件" tabindex="-1"><a class="header-anchor" href="#获胜的判断条件" aria-hidden="true">#</a> 获胜的判断条件</h3>
<p>如果一个 candidate 获得了<strong>集群大多数节点针对同一任期（term）的投票</strong>， 那它就赢得了这个任期内的选举。</p>
<p>针对给定的任期，每个节点最多只能投一票，<strong>投票的标准是先到先得</strong>（ first-come-first-served）。“期得获该任期的大 多数选票”这一限制条件，决定了最多只会有一个 candidate 赢得选举 （也就是图 3 中 的选举安全特性）。一个 candidate 赢得选举之后，就会为 leader，然后发生心跳消息 给所有其他节点来建立它的权威，防止新的选举发生。</p>
<p>在等待投票期间，一个 candidate 可能会从其他服务器收到一个 AppendEntries RPC 声称自己是 leader。如果这个 leader 的任期 term （包含在 RPC 消息中），</p>
<ol>
<li><strong>大于等于这个 candidate 的 currentTerm</strong>：那该 candidate 就承认 这个 leader 是合法的，然后回归到 follower 状态。</li>
<li>小于这个 candidate 的 currentTerm：拒绝这个 RPC ，仍然留在 candidate 状态。</li>
</ol>
<p>第 3 种可能的结果是：该 candidate 既没有赢得也没有输掉这次选举。 如果多个 followers 在同一时间成为 candidates，投票就会很分散，最终没有谁能赢得大多数选票。 当发生这种情况时，每个 candidate 都会超时，然后各自增大 term 并给其他节点发送 RequestVote 请求，开始一轮新选举， 但<strong>如果没有额外的预防措施，这种投票分裂的情况看可能会无限持续下去</strong>。</p>
<h3 id="避免无限循环的投票分裂-随机选举超时" tabindex="-1"><a class="header-anchor" href="#避免无限循环的投票分裂-随机选举超时" aria-hidden="true">#</a> 避免无限循环的投票分裂：随机选举超时</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>Raft 使用<strong>随机选举超时</strong>来确保投票分裂 <strong>只会非常偶然地发生，并且发生之后能很快恢复正常</strong>。</p>
<p>首先是从一些固定时长（例如 <code v-pre>150-300ms</code>）中随机选择一个选举超时时间，这使得节点的 超时时刻比较分散，在大部分情况下<strong>同一时刻最多只有一台会超时</strong>； 这台超时的节点会<strong>在其他节点超时之前赢得选举</strong>（因为它的 term 更大，其他节点都会投票给它）。</p>
<p>随机化机制也同样用于<strong>处理投票分裂</strong>。每个 candidate 在一轮选举开始时， 会随机重置它的 election timeout，等到 timeout 之后才开始发起新一轮选举；这减少 了新一轮选举也发生投票分裂的可能性 会看到，这种方式<strong>很快就能选出 leader</strong>。</p>
</div>
<h2 id="leader-向其他节点复制日志-log" tabindex="-1"><a class="header-anchor" href="#leader-向其他节点复制日志-log" aria-hidden="true">#</a> Leader 向其他节点复制日志（log）</h2>
<h3 id="复制流程" tabindex="-1"><a class="header-anchor" href="#复制流程" aria-hidden="true">#</a> 复制流程</h3>
<p>选出一个 leader 之后，它就开始服务客户端请求。</p>
<ul>
<li>每个客户端请求中都包含一条<strong>命令</strong>，将由 <strong>replicated state machine 执行</strong>。</li>
<li>leader 会将这个命令追加到它自己的 log，然后并发地通过 AppendEntries RPC 复制给其他节点。</li>
<li><strong>复制成功</strong>（无冲突）之后，<strong>leader 才会将这个 entry 应用到自己的状态机，然后将执行结果返回给客户端</strong>。</li>
<li>如果 follower 挂掉了或很慢，或者发生了丢包，leader 会<strong>无限重试 AppendEntries 请求（即使它已经给客户端发送了响应）</strong>， 直到所有 follower 最终都存储了所有的 log entries。</li>
</ul>
<h3 id="log-文件组织结构" tabindex="-1"><a class="header-anchor" href="#log-文件组织结构" aria-hidden="true">#</a> Log 文件组织结构</h3>
<p>如下图所示：</p>
<p><img src="http://sm.cubxxw.com/smimage-20221117215504215.png" alt="image-20221117215504215"></p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>Log 由 log entry 组成，每个 entry 都是<strong>顺序编号</strong>的，这个整数索引标识了该 entry 在 log 中的位置。</p>
<p>每个 entry 包含了</p>
<ol>
<li>Leader <strong>创建该 entry 时的任期</strong>（term，每个框中的数字），用于检测 logs 之间的不一致及确保图 3 中的某些特性；</li>
<li><strong>需要执行的命令</strong>。</li>
</ol>
<p>当一条 entry 被<strong>安全地应用到状态机</strong>之后，就认为这个 entry 已经<strong>提交</strong>了（committed）。</p>
<p>Leader 来判断何时将一个 log entry 应用到状态机是安全的。</p>
</div>
<h3 id="提交-commit-的定义" tabindex="-1"><a class="header-anchor" href="#提交-commit-的定义" aria-hidden="true">#</a> 提交（commit）的定义</h3>
<p>Raft 保证 <strong>已提交的记录都是持久的</strong>，并且最终会被所有可用的状态机执行。</p>
<ul>
<li>只要创建这个 entry 的 leader 将它成功<strong>复制到大多数节点</strong>，这个 entry 就算提交了。</li>
<li>这<strong>也提交了</strong> leader log 中的<strong>所有前面的 entry</strong>，包括那些之前由其他 leader 创建的 entry。</li>
</ul>
<p>讨论 ldeader 变更之后应用这个规则时的情况，那时将会看到这种对于 commit 的定义也是安全的。 <strong>follower 一旦确定某个 entry 被提交了，就将这个 entry 应用到它自己的状态机</strong>（in log order）。</p>
<h3 id="log-matching-特性-保证-log-内容一致" tabindex="-1"><a class="header-anchor" href="#log-matching-特性-保证-log-内容一致" aria-hidden="true">#</a> Log matching 特性（保证 log 内容一致）</h3>
<p>Raft 这种 log 机制的设计是为了保持 <strong>各节点 log 的高度一致性</strong>（coherency）。 它不仅简化了系统行为，使系统更加可预测，而且是保证安全（无冲突）的重要组件。</p>
<p>如果不同 log 中的两个 entry 有完全相同的 index 和 term，那么</p>
<ol>
<li>这两个 entry 一定<strong>包含了相同的命令</strong>； 这来源于如下事实：leader 在任意给定 term 和 log index 的情况下，最多只会创建 一个 entry，并且其在 log 中的位置永远不会发生变化。</li>
<li>这两个 log 中，<strong>从该 index 往前的所有 entry 都分别相同</strong>。 这一点是通过 AppendEntries 中简单的<strong>一致性检查</strong>来保证的：
<ul>
<li><code v-pre>AppendEntries</code> 请求中，leader 会带上 log 中<strong>前一个紧邻 entry 的 index 和 term 信息</strong>。</li>
<li>如果 follower log 中以相同的 index 位置没有 entry，或者有 entry 但 term 不同，follower 就会拒绝新的 entry。</li>
</ul>
</li>
</ol>
<p>以上两个条件组合起来，用归纳法可以证明图 3 中的 Log Matching Property：</p>
<ol>
<li>新加一个 entry 时，简单一致性检查会确保这个 entry 之前的所有 entry 都是满足 Log Matching 特性的；因此只要初始状态也满足这个特性就行了；</li>
<li>初始状态：各 log 文件都是空的，满足 Log Matching 特性；</li>
</ol>
<h3 id="log-不一致场景" tabindex="-1"><a class="header-anchor" href="#log-不一致场景" aria-hidden="true">#</a> Log 不一致场景</h3>
<p>正常情况下，leader 和 follower 的 log 能保持一致，但 leader 挂掉会导致 log 不一致 （leader 还未将其 log 中的 entry 都复制到其他节点就挂了）。 这些不一致会导致一系列复杂的 leader 和 follower crash。 Figure 7 展示了 follower log 与新的 leader log 的几种可能不同</p>
<p><img src="http://sm.cubxxw.com/smimage-20221117215917742.png" alt="image-20221117215917742"></p>
<p>图中每个方框表示一个 log entry，其中的数字表示它的 term。可能的情况包括：</p>
<ul>
<li>丢失记录(a–b) ；</li>
<li>有额外的未提交记录 (c–d)；</li>
<li>或者以上两种情况发生 (e–f)。</li>
<li>log 中丢失或多出来的记录可能会跨多个 term。</li>
</ul>
<p>例如，scenario (f) 可能是如下情况：从 term 2 开始成为 leader，然后向自己的 log 添加了一些 entry， 但还没来得及提交就挂了；然后重启后迅速又成为 term 3 期间的 leader，然后又加了一些 entry 到自己的 log， 在提交 term 2&amp; 3 期间的 entry 之前，又挂了；随后持续挂了几个 term。</p>
<h3 id="避免-log-不一致-appendentries-中的一致性检查" tabindex="-1"><a class="header-anchor" href="#避免-log-不一致-appendentries-中的一致性检查" aria-hidden="true">#</a> 避免 log 不一致：<code v-pre>AppendEntries</code> 中的一致性检查</h3>
<p>Raft 处理不一致的方式是<strong>强制 follower 复制一份 leader 的 log</strong>， 这意味着 follower log 中<strong>冲突的 entry 会被 leader log 中的 entry 覆盖</strong>。 Section 5.4 将会看到再加上另一个限制条件后，这个日志复制机制就是安全的。</p>
<p>解决冲突的具体流程：</p>
<ol>
<li>找到 leader 和 follower 的<strong>最后一个共同认可的 entry</strong>，</li>
<li>将 follower log 中从这条 entry 开始<strong>往后的 entries 全部删掉</strong>，</li>
<li>将 leader log 中从这条记录开始往后的所有 entries 同步给 follower。</li>
</ol>
<p>整个过程都发生在 <strong>AppendEntries RPC 中的一致性检查</strong>环节。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// https://github.com/etcd-io/etcd/blob/release-0.4/third_party/github.com/goraft/raft/server.go#L939</span>

<span class="token comment">// Processes the "append entries" request.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>server<span class="token punctuation">)</span> <span class="token function">processAppendEntriesRequest</span><span class="token punctuation">(</span>req <span class="token operator">*</span>AppendEntriesRequest<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>AppendEntriesResponse<span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> req<span class="token punctuation">.</span>Term <span class="token operator">&lt;</span> s<span class="token punctuation">.</span>currentTerm
        <span class="token keyword">return</span> <span class="token boolean">_</span><span class="token punctuation">,</span> <span class="token boolean">false</span>

    <span class="token keyword">if</span> req<span class="token punctuation">.</span>Term <span class="token operator">==</span> s<span class="token punctuation">.</span>currentTerm <span class="token punctuation">{</span>
        <span class="token keyword">if</span> s<span class="token punctuation">.</span>state <span class="token operator">==</span> Candidate  <span class="token comment">// step-down to follower when it is a candidate</span>
            s<span class="token punctuation">.</span><span class="token function">setState</span><span class="token punctuation">(</span>Follower<span class="token punctuation">)</span>
        s<span class="token punctuation">.</span>leader <span class="token operator">=</span> req<span class="token punctuation">.</span>LeaderName
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        s<span class="token punctuation">.</span><span class="token function">updateCurrentTerm</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>Term<span class="token punctuation">,</span> req<span class="token punctuation">.</span>LeaderName<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Reject if log doesn't contain a matching previous entry.</span>
    <span class="token keyword">if</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">truncate</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>PrevLogIndex<span class="token punctuation">,</span> req<span class="token punctuation">.</span>PrevLogTerm<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">newAppendEntriesResponse</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>currentTerm<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">currentIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">CommitIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>

    s<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">appendEntries</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>Entries<span class="token punctuation">)</span>      <span class="token comment">// Append entries to the log.</span>
    s<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">setCommitIndex</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>CommitIndex<span class="token punctuation">)</span> <span class="token comment">// Commit up to the commit index.</span>

    <span class="token comment">// once the server appended and committed all the log entries from the leader</span>
    <span class="token keyword">return</span> <span class="token function">newAppendEntriesResponse</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>currentTerm<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">currentIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> s<span class="token punctuation">.</span>log<span class="token punctuation">.</span><span class="token function">CommitIndex</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment">// https://github.com/etcd-io/etcd/blob/release-0.4/third_party/github.com/goraft/raft/log.go#L399</span>
<span class="token comment">// Truncates the log to the given index and term. This only works if the log</span>
<span class="token comment">// at the index has not been committed.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>l <span class="token operator">*</span>Log<span class="token punctuation">)</span> <span class="token function">truncate</span><span class="token punctuation">(</span>index <span class="token builtin">uint64</span><span class="token punctuation">,</span> term <span class="token builtin">uint64</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> index <span class="token operator">&lt;</span> l<span class="token punctuation">.</span>commitIndex <span class="token comment">// Do not allow committed entries to be truncated.</span>
        <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"raft.Log: Index is already committed (%v): (IDX=%v, TERM=%v)"</span><span class="token punctuation">,</span> l<span class="token punctuation">.</span>commitIndex<span class="token punctuation">,</span> index<span class="token punctuation">,</span> term<span class="token punctuation">)</span>

    <span class="token keyword">if</span> index <span class="token operator">></span> l<span class="token punctuation">.</span>startIndex <span class="token operator">+</span> <span class="token function">len</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>entries<span class="token punctuation">)</span> <span class="token comment">// Do not truncate past end of entries.</span>
        <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"raft.Log: Entry index does not exist (MAX=%v): (IDX=%v, TERM=%v)"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>entries<span class="token punctuation">)</span><span class="token punctuation">,</span> index<span class="token punctuation">,</span> term<span class="token punctuation">)</span>

    <span class="token comment">// If we're truncating everything then just clear the entries.</span>
    <span class="token keyword">if</span> index <span class="token operator">==</span> l<span class="token punctuation">.</span>startIndex <span class="token punctuation">{</span>
        l<span class="token punctuation">.</span>file<span class="token punctuation">.</span><span class="token function">Truncate</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
        l<span class="token punctuation">.</span>file<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>SEEK_SET<span class="token punctuation">)</span>
        l<span class="token punctuation">.</span>entries <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>LogEntry<span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// Do not truncate if the entry at index does not have the matching term.</span>
        entry <span class="token operator">:=</span> l<span class="token punctuation">.</span>entries<span class="token punctuation">[</span>index<span class="token operator">-</span>l<span class="token punctuation">.</span>startIndex<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
        <span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>entries<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> entry<span class="token punctuation">.</span>Term <span class="token operator">!=</span> term
            <span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"raft.Log: Entry at index does not have matching term (%v): (IDX=%v, TERM=%v)"</span><span class="token punctuation">,</span> entry<span class="token punctuation">.</span>Term<span class="token punctuation">,</span> index<span class="token punctuation">,</span> term<span class="token punctuation">)</span>

        <span class="token comment">// Otherwise truncate up to the desired entry.</span>
        <span class="token keyword">if</span> index <span class="token operator">&lt;</span> l<span class="token punctuation">.</span>startIndex<span class="token operator">+</span><span class="token function">uint64</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>l<span class="token punctuation">.</span>entries<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            position <span class="token operator">:=</span> l<span class="token punctuation">.</span>entries<span class="token punctuation">[</span>index<span class="token operator">-</span>l<span class="token punctuation">.</span>startIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>Position
            l<span class="token punctuation">.</span>file<span class="token punctuation">.</span><span class="token function">Truncate</span><span class="token punctuation">(</span>position<span class="token punctuation">)</span>
            l<span class="token punctuation">.</span>file<span class="token punctuation">.</span><span class="token function">Seek</span><span class="token punctuation">(</span>position<span class="token punctuation">,</span> os<span class="token punctuation">.</span>SEEK_SET<span class="token punctuation">)</span>
            l<span class="token punctuation">.</span>entries <span class="token operator">=</span> l<span class="token punctuation">.</span>entries<span class="token punctuation">[</span><span class="token number">0</span> <span class="token punctuation">:</span> index<span class="token operator">-</span>l<span class="token punctuation">.</span>startIndex<span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Leader 为每个 follower 维护了后者下一个要使用的 log entry index，即 <code v-pre>nextIndex[followerID]</code> 变量；</li>
<li>一个节点成为 leader 时，会将整个 <code v-pre>nextIndex[]</code> 都初始化为它自己的 log 文件的下一个 index （图 7 中就是 <code v-pre>11</code>）。</li>
<li>如果一个 follower log 与 leader 的不一致，AppendEntries 一致性检查会失败，从 而拒绝这个请求；leader 收到拒绝之后，将减小 <code v-pre>nextIndex[followerID]</code> 然后重试这个 AppendEntries RPC 请求；如此下去，直到某个 index 时成功，这说明此时 leader log 和 follower logs 已经匹配了。</li>
<li>然后 follower log 会删掉 index 之后的所有 entry，并将 leader 中的 entry 应用到 follower log 中（如果有）。 此时 <code v-pre>follower log</code> 就与 <code v-pre>leader</code> 一致了，在之后的整个 term 中都会保持一致。</li>
</ul>
<h3 id="优化" tabindex="-1"><a class="header-anchor" href="#优化" aria-hidden="true">#</a> 优化</h3>
<p>还可以对协议进行优化，来减小被拒的 AppendEntries RPC 数量。 例如，当拒绝一个 AppendEntries 请求时，follower 可以将冲突 entry 的 term 以及 log 中相同 term 的最小 index 信息包含到响应中。 有了这个信息，leader 就可以直接跳过这个 term 中的所有冲突记录，将 <code v-pre>nextIndex[followerID]</code> 降低到一个合理值；这样每个 term 内所有的冲突记录只需要一次触发 AppendEntries RPC ， 而不是每个记录一个 RPC。</p>
<p>但实际中，我们怀疑是否有必要做这种优化，因为故障很少发生，不太可能有很多的不一致记录。 <strong>有了这个机制，新 leader 上台之后无需执行任何特殊操作来恢复 log 一致性</strong>。 它只需要执行正常操作，logs 会通过 AppendEntries 一致性检查来收敛。 <strong>leader 永远不会覆盖或删除自己 log 中的记录</strong>（Leader Append-Only Property in Figure 3）。</p>
<p>这种 log replication 机制展示了第二节中描述的理想共识特性：</p>
<ol>
<li>只要集群的大多数节点都是健康的，Raft 就能接受、复制和应用新的 log entry；</li>
<li>正常情况下<strong>只需一轮 RPC</strong> 就能将一个新 entry 复制到集群的大多数节点；</li>
<li><strong>个别比较慢的 follower 不影响集群性能</strong>。</li>
</ol>
<h2 id="安全-确保状态机以相同顺序执行相同命令流" tabindex="-1"><a class="header-anchor" href="#安全-确保状态机以相同顺序执行相同命令流" aria-hidden="true">#</a> 安全：确保状态机以相同顺序执行相同命令流</h2>
<p>前面几节介绍了 Raft 如何选举 leader 及如何 replicate log entry 的。但是，到目前为止 我们<strong>已经描述的那些机制，还不足以确保每个状态机以相同的顺序执行完全相同的命令流</strong>。 例如，考虑下面这个例子：</p>
<ol>
<li>一个 follower 挂了，</li>
<li>故障期间，leader 提交了几个 log entry，</li>
<li>leader 挂了，然后</li>
<li>这个 follower 恢复之后被选为了新 leader，然后用新的 entries 覆盖了老 leader 提交的那些。</li>
</ol>
<p>导致的结果是，不同的状态机可能会执行不同的命令流。</p>
<p>为了解决这个问题，本节将给 leader election 添加一个限制条件，这也是 <strong>Raft 算法的最后一块拼图</strong>。 具体来说，这个限制条件确保了<strong>任何 term 内的 leader 都包含了前面所有 term 内提交的 entries</strong>， 也就是图 3 中提到的 Leader Completeness 特性。本节还将给出简要的证明过程。</p>
<h3 id="限制一-包含所有已提交-entry-的节点才能被选为-leader" tabindex="-1"><a class="header-anchor" href="#限制一-包含所有已提交-entry-的节点才能被选为-leader" aria-hidden="true">#</a> 限制一：包含所有已提交 entry 的节点才能被选为 leader</h3>
<p>在任何基于 leader 的共识算法中，leader 最终都必须存储了所有的已提交 entry。</p>
<p>在某些共识算法中，例如 Viewstamped Replication [22]，一个节点即使并未包含全部的 已提交 entries 也仍然能被选为 leader。这些算法有特殊的机制来识别缺失 entries， 并在选举期间或选举结束后立即发送给新 leader。不幸的是，这会导致额外的复杂性。</p>
<p>Raft 采取了一种更简单的方式：<strong>除非前面所有 term 内的已提交 entry 都已经 在某个节点上了，否则这个节点不能被选为 leader</strong>（后面将介绍如何保证这一点）。 这意味着<strong>无需从 non-leader 节点向 leader 节点同步数据</strong>，换句话说 <strong>log entries 只会从 leader 到 follower 单向流动</strong>。</p>
<p>那这个是怎么做到的呢？通过投票过程。</p>
<ul>
<li>首先，刚才已经提到，除非 log 中已经包含了集群的<strong>所有已提交 entries</strong>，否则一个 candidate 是不能被选为 leader 的。</li>
<li>其次，<strong>还活着的（即参与选举的）节点中，至少有一个节点保存了集群的所有已提交 entries</strong> （因为覆盖大多数节点的 entry，才算是提交成功的）。</li>
<li>那么，只要一个 candidate 的 log 与大多数节点相比<strong>至少不落后</strong>（at least as up-to-date，这个词下文会有精确定义），<strong>那它就持有了集群的所有已提交记录</strong>。</li>
</ul>
<p>因此，只要能确保这里提到的“至少不落后”语意，就能确保选出来的 leader 拥有集群的所有已提交 entries。 <strong>RequestVote RPC 实现了这个过程</strong>：请求中包含了发送方的 log 信息，如果当前 节点自己的 log 比对方的更新，会拒绝对方成为 leader 的请求。具体到实现上， <strong>判断哪个 log 更加新，依据的是最后一个 entry 的 index 和 term</strong>：</p>
<ul>
<li>如果 term 不同，那 term 新的那个 log 胜出；</li>
<li>如果 term 相同，那 index 更大（即更长）的那个 log 胜出。</li>
</ul>
<h3 id="限制二-当前任期-副本数量过半-entry-才能提交" tabindex="-1"><a class="header-anchor" href="#限制二-当前任期-副本数量过半-entry-才能提交" aria-hidden="true">#</a> 限制二：当前任期+副本数量过半，entry 才能提交</h3>
<p>新 leader 如何提交之前任期内遗留下来的、副本数量过集群半数的 entries？</p>
<p>5.3 小节提到，如果一个 entry 已经存储到了集群中的大多数节点上，leader 就认为这个 entry（在这个 term 内）提交成功了。 如果 leader 在提交这个 entry 之前挂了（即没有同步到大多数节点上），那下一个 leader 将承担这个 entry 的同步和提交任务。 但这里有一些新的问题，图 8 是一个例子：<strong>即使某个 entry 已经存储到了大多数节点，它仍然可能被新 leader 覆盖掉</strong>：</p>
<p><img src="http://sm.cubxxw.com/smimage-20221117221132134.png" alt="image-20221117221132134"></p>
<blockquote>
<p><em>Fig 8. 时序图：举例说明为什么一个新 leader 上任之后，无法判断是否要提交前任 leader 遗留下来的未提交 entries</em></p>
</blockquote>
<p>最上面一行数字是 log entry index，每个框中的数字是 term，</p>
<ul>
<li>时刻 (a)：S1 是当前 leader，并将 <code v-pre>index=2</code> 的 entry 复制到了 S2；</li>
<li>时刻 (b)：<strong>S1 挂了，S5 被 S3/S4/S5 选为新 leader</strong>，任期 <code v-pre>term=3</code>；然后 S5 在 <code v-pre>index=2</code> 的位置接受了一个<strong>来自客户端的新 entry</strong>；</li>
<li>时刻 (c)：<strong>S5 挂了；S1 被选为了下一任 leader</strong>，任期 <code v-pre>term=4</code>； 然后 <strong>S1 继续同步挂掉之前的那个 entry</strong>（<code v-pre>index=2</code>），它被<strong>成功同步到大部分节点上（S1/S2/S3），但还未提交</strong>；</li>
</ul>
<p>接下来分两种情况：</p>
<ol>
<li>时刻 (d)：<strong>S1 又挂了，S5 被 S2/S3/S4 选为下一任 leader</strong>， 这种情况下，<code v-pre>index=2,term=2</code> 的 entry 会被 <code v-pre>index=2,term=3</code> 的 entry <strong>覆盖掉</strong>。</li>
<li>时刻 (e)：S1 在挂掉之前将 <code v-pre>index=3,term=4</code> 的一条新记录也成功复制到了大部分节点上， 这种情况下，<strong>即使 S1 之后挂掉了，S5 还是无法赢得选举</strong>。 因此，<code v-pre>index=3,term=4</code> 的 entry 将会被（不管是 S1 还是其他新 leader）提交，log 中所有之前的记录（例如这里的 <code v-pre>index=2,term=2</code> 的 entry）也都会被提交。</li>
</ol>
<p>这里的问题在于：<strong>判断是否要提交的唯一标准是“已同步的副本数量”</strong>：数量超过了集群半数，则认为 应该提交，<strong>没有考虑到任期信息，“任期不同但副本数量都超过集群半数”的情况是可能的</strong>，即上面的 (d) 情况。 因此，为了避免这个问题，Raft 做了一个限制：<strong>只有提交当前任期内的记录时， 才能用这种计算副本数量（counting replicas）的方式</strong>。对应到图 8 中就是 (d) 时刻， <code v-pre>index=2,term=2</code> 的三个副本可以被合理覆盖，因为此时已经是 <code v-pre>term=3</code> 了。 一旦当前任期内的一个 entry 已这种方式被提交了，那所有之前的 entries 都会被 Log Matching Property 间接提交，对应图 8 中的 (e) 场景。</p>
<p>解决这个问题还有其他方式，但 Raft 这种方式更简单保守，在提交规则中进行处理，因为 <strong>entries 中保留了它们原始的 term 信息</strong>。</p>
<ul>
<li>在其他共识算法中，如果一个新 leader 再次复制（rereplicates）之前任期的记录，它们必须用新的任期号。</li>
<li>Raft 的方式使得判断 entry 更加容易，因为 <strong>term 号是不会随着时间或 log 文件变的</strong>。</li>
</ul>
<p>此外，相比于其他算法，Raft 中的新 leader 发送的 entry 数量更少。(other algorithms must send redundant log entries to renumber them before they can be committed).</p>
<h3 id="安全性的简要证明" tabindex="-1"><a class="header-anchor" href="#安全性的简要证明" aria-hidden="true">#</a> 安全性的简要证明</h3>
<p>有了以上基础，现在能更准确地证明 Leader Completeness 特性（需要用到 9.2 小节的 safety proof）。 我们用<strong>反证法</strong>，先假设它不成立。</p>
<p>假设任期 T 内的 leader leaderT 在它的任期内提交了一个 entry，但这个 entry 没有被后面任期内的 leader 存储。 考虑没有存储这个 entry 的最小的任期 U，<code v-pre>U &gt; T</code>，</p>
<ol>
<li>leaderU 当选为 leader 的时刻，这个 entry 一定不在其 log 中，因为 leader 不会删除或覆盖 entries；</li>
<li>leaderT 已经将这个 entry 同步到大部分节点上，而 leaderU 已经收到了大部 分节点的投票。因此，<strong>至少一个节点（“某个特定的投票者”）既接受了 leaderT 复制过来的记录，又投票给了 leaderU</strong>， 如图 9 所示。这个特殊的投票者是导致矛盾关键。</li>
</ol>
<p><img src="http://sm.cubxxw.com/smimage-20221117221225902.png" alt="image-20221117221225902"></p>
<p>这个投票者一定是在投票给 leaderU 之前接受的这个 entry，否则它会拒绝那次来自 leaderT 的 AppendEntries 请求（它当前的 term 会被 T 更大）；</p>
<p>这个投票者在投票给 leaderU 之前仍然存储着这个 entry，因为每个 后面的 leader 都会包含这个记录 (by assumption), leaders 从不删除记录， 而 followers 只会在与 leader 冲突时才会删除记录。</p>
<p>这个投票者将选票给了 leaderU，这<strong>说明 leaderU 的 log 至少与该投票者是一样新的</strong> （as up-to-date as the voter’s）。这会导致如下两个矛盾：</p>
<ol>
<li>如果 voter 和 leaderU 的最后一个 log term 是一样的，那 leaderU 的 log 至 少与投票者的 log 一样长，因此它包含了投票者 log 中的所有记录 —— 这与前面的 假设矛盾：前面假设了投票者包含了这个记录，而 leader U 没有。因此， leaderU 的最后一个 log term 必须比该投票者的要大。不仅如此，它还要比 T 大，因为投票者的最后一个 log term 至少是 T（它包含了 term T 内的已提交记录）。</li>
<li>最早创建了 leaderU 的最后一个 entry 的 leader，一定在它的 log 中包含了这个已提交的 entry（根据假设）。 那么，根据 Log Matching Property，leaderU’s log 一定也包含了这个已提交的 entry，导出矛盾。</li>
</ol>
<h2 id="follower-candidate-故障-无限重试-请求幂等" tabindex="-1"><a class="header-anchor" href="#follower-candidate-故障-无限重试-请求幂等" aria-hidden="true">#</a> Follower/candidate 故障：无限重试 + 请求幂等</h2>
<p>到目前为止讨论的都是 leader 挂掉的情况。 这一节讨论下 follower 和 candidate 挂掉的情况，这种其实更简单，而且处理方式是一样的。</p>
<p>如果一个 follower 或 canditate 挂掉了，那后面来的 RequestVote 和 AppendEntries 请求都会失败。</p>
<ul>
<li>Raft 处理这种场景的方式是<strong>无限重试</strong>，因此只要这个节点能起来，这个 RPC 请求就一定会成功完成。</li>
<li>如果一个节点在完成了 RPC 之后、响应之前挂了，那它会在重启之后收到完全相同的 RPC 。<strong>Raft RPC 是幂等的</strong>，因此这不会导致问题。 例如，如果一个 follower 收到了一个 AppendEntries 请求，而它的 log 中已经包含了待 append 的 entry， 那它会<strong>直接忽略</strong>这个请求。</li>
</ul>
<h2 id="时序和可用性" tabindex="-1"><a class="header-anchor" href="#时序和可用性" aria-hidden="true">#</a> 时序和可用性</h2>
<p>Raft 的一个设计要求是<strong>安全性（无冲突）绝对不能依赖时序</strong>（safety must not depend on timing）： 绝对不能因为某些事件发生的快或慢了，就导致系统产生不正确的结果。</p>
<p>但另一方面，<strong>可用性</strong>（系统及时对客户端作出响应）<strong>对时序的依赖是不可避免的</strong>。 例如，有节点挂掉时，消息交换过程肯定会耗时更长，任何一个 candidate 可能都无法等到一个选举结果； 而没有一个稳定 leader 的话，Raft 就无法处理任何请求。</p>
<p>Raft 中<strong>最依赖时序的就是 leader 选举部分</strong>。 只要系统满足如下时序条件，Raft 就能选出和保持一个稳定的 leader：
$$
broadcastTime ≪ electionTimeout ≪ MTBF$$
$$</p>
<ul>
<li>broadcastTime：一个节点并发给其他节点发送请求并收到响应的平均时间；</li>
<li>electionTimeout： 5.2 小节定义的选举超时时间；</li>
<li>MTBF：单个节点的平均故障时间（average time between failures）</li>
</ul>
<p>这个不等式表达的意思很好理解：</p>
<ol>
<li>广播耗时要比选举超时低一个数量级，这样 <strong>leader 才能可靠地发送心跳消息给 follower，避免它们发起来新的选举</strong>。 考虑到选举超时是随机化的，这个不等式也使得投票分裂不太可能发生。</li>
<li>选举超时要比 MTBF 低几个数量级，这样系统才能稳步前进。 当 <strong>leader 挂掉后，系统大致会经历一个 election timeout 时间段的不可用</strong>，我们希望这个时间段只占到总时间段的很小一部分。</li>
</ol>
<p>broadcastTime 和 MTBF 都是底层系统的特性，而 electionTimeout 是我们需要设置的。</p>
<ul>
<li>Raft 一般要求接收方将请求<strong>持久化</strong>到稳定存储中，因此取决于存储技术，broadcastTime 可能需要 <strong><code v-pre>0.5ms ~ 20ms</code></strong>。</li>
<li>因此，electionTimeout 通常选择 <strong><code v-pre>10ms ~ 500ms</code></strong>。</li>
<li>典型的节点 <strong>MTBF 是几个月或更长时间</strong>，因此很容易满足时序要求。</li>
</ul>
<h2 id="集群节点数量变化-membership-changes" tabindex="-1"><a class="header-anchor" href="#集群节点数量变化-membership-changes" aria-hidden="true">#</a> 集群节点数量变化（membership changes）</h2>
<p>到目前为止，我们都是假设了<strong>集群配置（节点集合）是不变的</strong>。 但在实际场景中，有时需要增加或删除节点，例如节点故障时用新节点替换某个老节点，或者直接添加或删除节点。 显然，<code v-pre>关闭集群 -&gt; 更新配置文件 -&gt; 重庆开启集群</code> 的方式可以工作，但问题是操作期间集群不可用， 而且还可能因为其中的手动操作引发故障。为避免这些问题，我们决定<strong>自动化配置变更，并将其包含到共识算法中</strong>。</p>
<h2 id="增删节点可能导致集群分裂" tabindex="-1"><a class="header-anchor" href="#增删节点可能导致集群分裂" aria-hidden="true">#</a> 增删节点可能导致集群分裂</h2>
<p>这里的本质问题就是<strong>避免在增删节点期间同时出现两个及以上 leader</strong>。 不幸的是，<strong>不管用什么方式，这个过程都是不安全的</strong>（unsafe）：我们 无法在同一时刻原子地切换所有节点，因此在变更时，集群可能会分裂为两个独立的大多数 （two independent majorities）</p>
<p><img src="http://sm.cubxxw.com/smimage-20221117221447782.png" alt="image-20221117221447782"></p>
<p>节点数量从 3 个增加到 5 个。 这个过程是不安全的，因为不同节点的切换发生在不同时刻：例如 箭头指向的时刻，集群分裂成了两个大多数，分别用的老配置 Cold（server 1/2）和新配置 Cnew（server 3/4/5）， 各自选出了一个 leader。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '24.md' style='float:left'>⬆️上一节🔗  </a><a href = '26.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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
<p><strong>🧷 参考文章：</strong></p>
<ul>
<li><a href="https://arthurchiao.art/blog/raft-paper-zh/" target="_blank" rel="noopener noreferrer">https://arthurchiao.art/blog/raft-paper-zh/<ExternalLinkIcon/></a></li>
<li><a href="https://sineyuan.github.io/post/etcd-raft-source-guide/" target="_blank" rel="noopener noreferrer">https://sineyuan.github.io/post/etcd-raft-source-guide/<ExternalLinkIcon/></a></li>
<li><a href="https://www.usenix.org/conference/atc14/technical-sessions/presentation/ongaro" target="_blank" rel="noopener noreferrer">In Search of an Understandable Consensus Algorithm (Extended Version)<ExternalLinkIcon/></a></li>
<li><a href="http://thesecretlivesofdata.com/raft/" target="_blank" rel="noopener noreferrer">http://thesecretlivesofdata.com/raft/<ExternalLinkIcon/></a></li>
<li><a href="https://www.cnblogs.com/mindwind/p/5231986.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/mindwind/p/5231986.html<ExternalLinkIcon/></a></li>
<li><a href="https://blog.csdn.net/s15738841819/article/details/84286276" target="_blank" rel="noopener noreferrer">https://blog.csdn.net/s15738841819/article/details/84286276<ExternalLinkIcon/></a></li>
</ul>
</div></template>


