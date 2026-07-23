<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第54节-openim-重构确定协议" tabindex="-1"><a class="header-anchor" href="#第54节-openim-重构确定协议" aria-hidden="true">#</a> 第54节 OpenIM 重构确定协议</h1>
<div><a href = '53.md' style='float:left'>⬆️上一节🔗  </a><a href = '55.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="确定协议" tabindex="-1"><a class="header-anchor" href="#确定协议" aria-hidden="true">#</a> 确定协议</h2>
<p><strong>客户端和服务端之间的协议</strong>
（1）心跳
（2）消息拉取
（3）推送
（4）消息发送</p>
<p><strong>客户端内部的</strong>
（1）消息同步协程和会话协程之间</p>
<p>消息； 2.同步开始；3.同步结束；
（2）ws协程和消息同步协程之间</p>
<p>心跳响应（最大seq）；2.推送消息；3.连接成功
（3）任何发送ws请求协程和ws协程之间；
1.通过SendReqWaitResp封装</p>
<p><strong>我们需要拿到数据：</strong></p>
<p>（2）ws协程和消息同步协程之间
1.心跳响应（最大seq）；2.推送消息；3.连接成功</p>
<p>先判断 cmd，然后做逻辑部分：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>CmdMaxSeq       <span class="token operator">=</span> <span class="token string">"maxSeq"</span>	<span class="token comment">//心跳响应（最大seq）</span>
CmdPushMsg      <span class="token operator">=</span> <span class="token string">"pushMsg"</span>	<span class="token comment">//推送信息</span>
CmdConnSuccesss <span class="token operator">=</span> <span class="token string">"connSuccess"</span>	<span class="token comment">//连接成功</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>第一个你会接受到推送过来的消息</p>
<p>第二就是在服务器定时的去获取到每一个群，或者是每一个会话里的所有的就是每一个绘画的最新的最大的也是最大的seq。这样我们这个模块就知道我们缺了哪些消息</p>
<p>第三个如果同年成功或者就连接成功，然后也有ws那个模块会丢一重庆成功的 Cmd给你，就是说你现在会接受三种类型的消息，像是那些通知在c群里面，这个有没有问题。</p>
<p>重连成功后就要通知你开始同步信息了。</p>
</blockquote>
<p>结构体：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// The callback synchronization starts. The reconnection endsc</span>
<span class="token keyword">type</span> MsgSyncer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	loginUserID        <span class="token builtin">string</span>                <span class="token comment">// login user ID</span>
	longConnMgr        <span class="token operator">*</span>LongConnMgr          <span class="token comment">// long connection manager</span>
	PushMsgAndMaxSeqCh <span class="token keyword">chan</span> common<span class="token punctuation">.</span>Cmd2Value <span class="token comment">// channel for receiving push messages and the maximum SEQ number</span>
	conversationCh     <span class="token keyword">chan</span> common<span class="token punctuation">.</span>Cmd2Value <span class="token comment">// storage and session triggering</span>
	syncedMaxSeqs      <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>SyncedSeq  <span class="token comment">// map of the maximum synced SEQ numbers for all group IDs</span>
	db                 db_interface<span class="token punctuation">.</span>DataBase <span class="token comment">// data store</span>
	syncTimes          <span class="token builtin">int</span>                   <span class="token comment">// times of sync</span>
	ctx                context<span class="token punctuation">.</span>Context       <span class="token comment">// context</span>
	cancel             context<span class="token punctuation">.</span>CancelFunc    <span class="token comment">// cancel function</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>conversationCh 是干嘛的？实际上这就是消息模块的一个切入，就是你刚才就是说会一些把某些数据给到这个东西就给到嵌入里面，它有哪些东西呢？这里面两种消息，就一种是消息，就是你同步的消息，刚才不是说同步一条或者同步10条是不是给到他，对吧？他来做存储，他自己要做存储和会话的触发。</p>
<p>所以说这里的 channel 收到的是三种信息：</p>
<ul>
<li>第一种是真正同步的消息</li>
<li>第二种是同步开始、同步结束的一种通知，他要给客户端进行显示</li>
</ul>
<p>loadSeq函数：</p>
<p>就是说你初始化的时候，实际上初始化的时候实际上你的就已经同步，但是你是不知道的，所以到时候DB那边可能要提供一些函数能告诉你，就是说比如说我有了我这个用户有哪有哪些会话，然后每个会话最大的一个是什么情况，我要在DB本地读出来寄到内存里面，可能是一个类似 Map的东西，在初始化的时候执行一次，这个时候就能确定 <code v-pre>seqs </code></p>
<p>使用 switch：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">case</span> cmd <span class="token operator">:=</span> <span class="token operator">&lt;-</span>m<span class="token punctuation">.</span>PushMsgAndMaxSegCh<span class="token punctuation">:</span>
	m<span class="token punctuation">.</span><span class="token function">handleRecvMsgAndSyncSeqs</span><span class="token punctuation">(</span>cmd<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>定义部分：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Cmd2Value <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   Cmd   <span class="token builtin">string</span>
   Value <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
   Ctx   context<span class="token punctuation">.</span>Context
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>value不一定是<code v-pre>msgdata</code></strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">TriggerCmdPushMsg</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> msg <span class="token operator">*</span>sdkws<span class="token punctuation">.</span>MsgData<span class="token punctuation">,</span> ch <span class="token keyword">chan</span> Cmd2Value<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> ch <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> utils<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"ch == nil"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>

   c2v <span class="token operator">:=</span> Cmd2Value<span class="token punctuation">{</span>Cmd<span class="token punctuation">:</span> constant<span class="token punctuation">.</span>CmdPushMsg<span class="token punctuation">,</span> Value<span class="token punctuation">:</span> msg<span class="token punctuation">,</span> Ctx<span class="token punctuation">:</span> ctx<span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token function">sendCmd</span><span class="token punctuation">(</span>ch<span class="token punctuation">,</span> c2v<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TriggerCmdMaxSeq</span><span class="token punctuation">(</span>seq sdk_struct<span class="token punctuation">.</span>CmdMaxSeqToMsgSync<span class="token punctuation">,</span> ch <span class="token keyword">chan</span> Cmd2Value<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> ch <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> utils<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"ch == nil"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   c2v <span class="token operator">:=</span> Cmd2Value<span class="token punctuation">{</span>Cmd<span class="token punctuation">:</span> constant<span class="token punctuation">.</span>CmdMaxSeq<span class="token punctuation">,</span> Value<span class="token punctuation">:</span> seq<span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token function">sendCmd</span><span class="token punctuation">(</span>ch<span class="token punctuation">,</span> c2v<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TriggerCmdConnected</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> ch <span class="token keyword">chan</span> Cmd2Value<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span> ch <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> utils<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"ch == nil"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
   c2v <span class="token operator">:=</span> Cmd2Value<span class="token punctuation">{</span>Cmd<span class="token punctuation">:</span> constant<span class="token punctuation">.</span>CmdConnSuccesss<span class="token punctuation">,</span> Value<span class="token punctuation">:</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> Ctx<span class="token punctuation">:</span> ctx<span class="token punctuation">}</span>
   <span class="token keyword">return</span> <span class="token function">sendCmd</span><span class="token punctuation">(</span>ch<span class="token punctuation">,</span> c2v<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分别是这三个 <code v-pre>Cmd2Value</code></p>
<p><strong>调整：</strong></p>
<ul>
<li><code v-pre>ws *Ws</code> 这个换掉</li>
<li><code v-pre>msgCache</code> 可以删除</li>
<li><code v-pre>handleRecvMsgAndSyncSeqs</code>要对<code v-pre>cmd</code>解析一下</li>
</ul>
<h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例</h2>
<p>就拿我们的一个案例来说：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Protocol <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    heartbeat  <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>   <span class="token comment">// 心跳</span>
    pullMsg    <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>   <span class="token comment">// 消息拉取</span>
    pushMsg    <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>   <span class="token comment">// 推送消息</span>
    sendMsg    <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>   <span class="token comment">// 消息发送</span>
    syncMsg    <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>   <span class="token comment">// 消息同步</span>
    syncStart  <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>   <span class="token comment">// 同步开始</span>
    syncFinish <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>   <span class="token comment">// 同步结束</span>
    wsResp     <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>   <span class="token comment">// WS响应</span>
    wsPush     <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>   <span class="token comment">// WS推送</span>
    wsConn     <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>   <span class="token comment">// WS连接成功</span>
    wsReq      <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>   <span class="token comment">// 任何发送WS请求</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>p <span class="token operator">*</span>Protocol<span class="token punctuation">)</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    p<span class="token punctuation">.</span>heartbeat <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span>  <span class="token comment">// 初始化心跳协议</span>
    p<span class="token punctuation">.</span>pullMsg <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span>    <span class="token comment">// 初始化消息拉取协议</span>
    p<span class="token punctuation">.</span>pushMsg <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span>    <span class="token comment">// 初始化推送消息协议</span>
    p<span class="token punctuation">.</span>sendMsg <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span>    <span class="token comment">// 初始化消息发送协议</span>
    p<span class="token punctuation">.</span>syncMsg <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span>    <span class="token comment">// 初始化消息同步协议</span>
    p<span class="token punctuation">.</span>syncStart <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span>  <span class="token comment">// 初始化同步开始协议</span>
    p<span class="token punctuation">.</span>syncFinish <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token comment">// 初始化同步结束协议</span>
    p<span class="token punctuation">.</span>wsResp <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span>     <span class="token comment">// 初始化WS响应协议</span>
    p<span class="token punctuation">.</span>wsPush <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span>     <span class="token comment">// 初始化WS推送协议</span>
    p<span class="token punctuation">.</span>wsConn <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span>     <span class="token comment">// 初始化WS连接成功协议</span>
    p<span class="token punctuation">.</span>wsReq <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span>      <span class="token comment">// 初始化任何WS请求协议</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="internal-interaction-结构" tabindex="-1"><a class="header-anchor" href="#internal-interaction-结构" aria-hidden="true">#</a> internal/interaction 结构</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">ls</span> internal/interaction <span class="token parameter variable">-al</span>
total <span class="token number">100</span>
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> May  <span class="token number">4</span> <span class="token number">17</span>:32 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">19</span> root root  <span class="token number">4096</span> Apr <span class="token number">28</span> 06:30 <span class="token punctuation">..</span>
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">1073</span> May  <span class="token number">4</span> 00:57 compressor.go
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">678</span> May  <span class="token number">4</span> 00:57 constant.go
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">574</span> May  <span class="token number">4</span> 00:57 context.go
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">745</span> May  <span class="token number">4</span> 00:57 encoder.go
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">14090</span> May  <span class="token number">4</span> <span class="token number">17</span>:32 long_conn_mgr.go
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">1550</span> May  <span class="token number">4</span> 00:57 long_connection.go
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">3130</span> May  <span class="token number">4</span> <span class="token number">17</span>:07 msg_sync.go
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">8878</span> May  <span class="token number">4</span> <span class="token number">17</span>:32 msg_sync2.go
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">9472</span> May  <span class="token number">4</span> <span class="token number">17</span>:32 msg_sync_self.go
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">12857</span> May  <span class="token number">4</span> 08:13 msy_sync_read_diffusion_group.go
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">2046</span> May  <span class="token number">4</span> 07:18 ws_default.go
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">1637</span> May  <span class="token number">4</span> 00:57 ws_js.go
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">3811</span> May  <span class="token number">4</span> <span class="token number">17</span>:32 ws_resp_asyn.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>compressor.go</code>: 压缩工具</li>
<li><code v-pre>context.go</code>: 处理上下文</li>
<li><code v-pre>long_conn_mgr.go</code>: 长连接管理器</li>
<li><code v-pre>msg_sync.go</code>: 消息同步</li>
<li><code v-pre>msg_sync_self.go</code>: 消息同步（自身）</li>
<li><code v-pre>ws_default.go</code>: WebSocket 的默认实现</li>
<li><code v-pre>ws_resp_asyn.go</code>: 异步的 WebSocket 响应</li>
<li><code v-pre>constant.go</code>: 常量</li>
<li><code v-pre>encoder.go</code>: 编码器</li>
<li><code v-pre>long_connection.go</code>: 长连接</li>
<li><code v-pre>msg_sync2.go</code>: 消息同步</li>
<li><code v-pre>msy_sync_read_diffusion_group.go</code>: 消息同步（读取扩散群组）</li>
<li><code v-pre>ws_js.go</code>: WebSocket 的 JavaScript 实现</li>
</ul>
<h2 id="新协议" tabindex="-1"><a class="header-anchor" href="#新协议" aria-hidden="true">#</a> 新协议</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> SeqRange <span class="token keyword">struct</span> <span class="token punctuation">{</span>
   state         protoimpl<span class="token punctuation">.</span>MessageState
   sizeCache     protoimpl<span class="token punctuation">.</span>SizeCache
   unknownFields protoimpl<span class="token punctuation">.</span>UnknownFields

   ConversationID <span class="token builtin">string</span> <span class="token string">`protobuf:"bytes,1,opt,name=conversationID,proto3" json:"conversationID"`</span>
   Begin          <span class="token builtin">int64</span>  <span class="token string">`protobuf:"varint,2,opt,name=begin,proto3" json:"begin"`</span>
   End            <span class="token builtin">int64</span>  <span class="token string">`protobuf:"varint,3,opt,name=end,proto3" json:"end"`</span>
   IsNotification <span class="token builtin">bool</span>   <span class="token string">`protobuf:"varint,4,opt,name=isNotification,proto3" json:"isNotification"`</span>
   Num            <span class="token builtin">int64</span>  <span class="token string">`protobuf:"varint,5,opt,name=num,proto3" json:"num"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="向信息同步协程发送数据" tabindex="-1"><a class="header-anchor" href="#向信息同步协程发送数据" aria-hidden="true">#</a> 向信息同步协程发送数据</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// -- // 长连接协程向消息同步协程下发的数据：</span>
<span class="token comment">// 1、推送消息，msg为msgData切片</span>
<span class="token keyword">func</span> <span class="token function">TriggerCmdPushMsg</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> msg <span class="token operator">*</span>sdkws<span class="token punctuation">.</span>PushMessages<span class="token punctuation">,</span> ch <span class="token keyword">chan</span> Cmd2Value<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> ch <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> utils<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"ch == nil"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    c2v <span class="token operator">:=</span> Cmd2Value<span class="token punctuation">{</span>Cmd<span class="token punctuation">:</span> constant<span class="token punctuation">.</span>CmdPushMsg<span class="token punctuation">,</span> Value<span class="token punctuation">:</span> msg<span class="token punctuation">,</span> Ctx<span class="token punctuation">:</span> ctx<span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">sendCmd</span><span class="token punctuation">(</span>ch<span class="token punctuation">,</span> c2v<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 2、seq触发</span>
<span class="token keyword">func</span> <span class="token function">TriggerCmdMaxSeq</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span>seq sdk_struct<span class="token punctuation">.</span>CmdMaxSeqToMsgSync<span class="token punctuation">,</span> ch <span class="token keyword">chan</span> Cmd2Value<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> ch <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> utils<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"ch == nil"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    c2v <span class="token operator">:=</span> Cmd2Value<span class="token punctuation">{</span>Cmd<span class="token punctuation">:</span> constant<span class="token punctuation">.</span>CmdMaxSeq<span class="token punctuation">,</span> Value<span class="token punctuation">:</span> seq<span class="token punctuation">,</span>Ctx<span class="token punctuation">:</span> ctx<span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">sendCmd</span><span class="token punctuation">(</span>ch<span class="token punctuation">,</span> c2v<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 3、连接成功触发</span>
<span class="token keyword">func</span> <span class="token function">TriggerCmdConnected</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> ch <span class="token keyword">chan</span> Cmd2Value<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> ch <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> utils<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"ch == nil"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    c2v <span class="token operator">:=</span> Cmd2Value<span class="token punctuation">{</span>Cmd<span class="token punctuation">:</span> constant<span class="token punctuation">.</span>CmdConnSuccesss<span class="token punctuation">,</span> Value<span class="token punctuation">:</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> Ctx<span class="token punctuation">:</span> ctx<span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token function">sendCmd</span><span class="token punctuation">(</span>ch<span class="token punctuation">,</span> c2v<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">const</span><span class="token punctuation">(</span>
    MsgSyncBegin      <span class="token operator">=</span> <span class="token number">1001</span> <span class="token comment">//</span>
    MsgSyncProcessing <span class="token operator">=</span> <span class="token number">1002</span> <span class="token comment">//</span>
    MsgSyncEnd        <span class="token operator">=</span> <span class="token number">1003</span> <span class="token comment">//</span>
    MsgSyncFailed     <span class="token operator">=</span> <span class="token number">1004</span>
<span class="token punctuation">)</span>
    
<span class="token keyword">type</span> CmdNewMsgComeToConversation <span class="token keyword">struct</span> <span class="token punctuation">{</span>

    MsgList  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>sdkws<span class="token punctuation">.</span>MsgData
    SyncFlag <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这个是ws协程丢给ch的三种类型的数据：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> CmdNewMsgComeToConversation <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    MsgList  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>sdkws<span class="token punctuation">.</span>MsgData
    SyncFlag <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个是你丢给 <code v-pre>conversationch</code> 的</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '53.md' style='float:left'>⬆️上一节🔗  </a><a href = '55.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


