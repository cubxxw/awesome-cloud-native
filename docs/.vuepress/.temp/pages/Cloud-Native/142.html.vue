<template><div><h1 id="websocket" tabindex="-1"><a class="header-anchor" href="#websocket" aria-hidden="true">#</a> WebSocket</h1>
<p>websocket 的GitHub地址：https://github.com/gorilla/websocket</p>
<p><strong>对于 Chat</strong></p>
<p>https://github.com/gorilla/websocket/blob/main/examples/chat/</p>
<p>是一个简单的在线聊天应用的实现，旨在展示如何使用<code v-pre>gorilla/websocket</code>库来构建一个基于WebSocket的应用。WebSocket是一个协议，允许客户端和服务器之间建立持久的连接并进行双向的实时通信。这种特性使其非常适合用于聊天应用、实时数据推送等场景。</p>
<p>使用这个<code v-pre>chat</code>示例，你可以学习如何：</p>
<ol>
<li>设置和使用WebSocket服务器。</li>
<li>处理客户端连接和断开。</li>
<li>接收和发送WebSocket消息。</li>
<li>如何在聊天应用场景中管理用户、消息等。</li>
</ol>
<h2 id="server" tabindex="-1"><a class="header-anchor" href="#server" aria-hidden="true">#</a> Server</h2>
<p>服务器应用程序定义了两种类型， <code v-pre>Client</code> 和 <code v-pre>Hub</code> 。服务器为每个WebSocket连接创建一个 <code v-pre>Client</code> 类型的实例。 <code v-pre>Client</code> 充当WebSocket连接和 <code v-pre>Hub</code> 类型的单个实例之间的中介。 <code v-pre>Hub</code> 维护一组已注册的客户端，并向客户端广播消息。</p>
<p>应用程序为 <code v-pre>Hub</code> 运行一个goroutine，为每个 <code v-pre>Client</code> 运行两个goroutine。goroutine之间使用通道进行通信。 <code v-pre>Hub</code> 具有用于注册客户端、取消注册客户端和广播消息的通道。 <code v-pre>Client</code> 具有出站消息的缓冲通道。客户端的一个goroutine从这个通道读取消息并将消息写入WebSocket。另一个客户端goroutine从WebSocket读取消息并将其发送到集线器。</p>
<h2 id="hub" tabindex="-1"><a class="header-anchor" href="#hub" aria-hidden="true">#</a> Hub</h2>
<p><code v-pre>Hub</code> 类型的代码在hub.go中。应用程序的 <code v-pre>main</code> 函数将hub的 <code v-pre>run</code> 方法作为一个goroutine启动。客户端使用 <code v-pre>register</code> 、 <code v-pre>unregister</code> 和 <code v-pre>broadcast</code> 通道向集线器发送请求。</p>
<p>集线器通过在 <code v-pre>clients</code> 映射中添加客户端指针作为键来注册客户端。map值始终为true。</p>
<p>注销代码稍微复杂一点。除了从 <code v-pre>clients</code> 映射中删除客户端指针之外，集线器还关闭客户端的 <code v-pre>send</code> 通道，以向客户端发出不再向客户端发送消息的信号。</p>
<p>集线器通过循环已注册的客户端并将消息发送到客户端的 <code v-pre>send</code> 通道来处理消息。如果客户端的 <code v-pre>send</code> 缓冲区已满，则集线器假定客户端已死亡或卡住。在这种情况下，集线器注销客户端并关闭WebSocket。</p>
<p>这个<code v-pre>Hub</code>充当WebSocket聊天服务的中心，负责管理所有活跃的客户端和广播消息给这些客户端。以下是对代码的逐段解释：</p>
<ol>
<li><strong>Hub的定义</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Hub <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	clients    <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token operator">*</span>Client<span class="token punctuation">]</span><span class="token builtin">bool</span>
	broadcast  <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
	register   <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Client<span class="token punctuation">)</span>
	unregister <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Client<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>clients</code>: 一个map，使用<code v-pre>Client</code>指针作为键，用于跟踪注册的客户端。</li>
<li><code v-pre>broadcast</code>: 一个通道，用于从客户端接收消息并将其广播给所有其他客户端。</li>
<li><code v-pre>register</code>: 一个通道，用于注册新的客户端。</li>
<li><code v-pre>unregister</code>: 一个通道，用于注销客户端。</li>
</ul>
<ol>
<li><strong>newHub函数</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">newHub</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span>Hub <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>Hub<span class="token punctuation">{</span>
		broadcast<span class="token punctuation">:</span>  <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		register<span class="token punctuation">:</span>   <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Client<span class="token punctuation">)</span><span class="token punctuation">,</span>
		unregister<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Client<span class="token punctuation">)</span><span class="token punctuation">,</span>
		clients<span class="token punctuation">:</span>    <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token operator">*</span>Client<span class="token punctuation">]</span><span class="token builtin">bool</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数初始化并返回一个新的<code v-pre>Hub</code>实例。</p>
<ol>
<li><strong>Hub的run方法</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>h <span class="token operator">*</span>Hub<span class="token punctuation">)</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> client <span class="token operator">:=</span> <span class="token operator">&lt;-</span>h<span class="token punctuation">.</span>register<span class="token punctuation">:</span>
			h<span class="token punctuation">.</span>clients<span class="token punctuation">[</span>client<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span>
		<span class="token keyword">case</span> client <span class="token operator">:=</span> <span class="token operator">&lt;-</span>h<span class="token punctuation">.</span>unregister<span class="token punctuation">:</span>
			<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> h<span class="token punctuation">.</span>clients<span class="token punctuation">[</span>client<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
				<span class="token function">delete</span><span class="token punctuation">(</span>h<span class="token punctuation">.</span>clients<span class="token punctuation">,</span> client<span class="token punctuation">)</span>
				<span class="token function">close</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>send<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token keyword">case</span> message <span class="token operator">:=</span> <span class="token operator">&lt;-</span>h<span class="token punctuation">.</span>broadcast<span class="token punctuation">:</span>
			<span class="token keyword">for</span> client <span class="token operator">:=</span> <span class="token keyword">range</span> h<span class="token punctuation">.</span>clients <span class="token punctuation">{</span>
				<span class="token keyword">select</span> <span class="token punctuation">{</span>
				<span class="token keyword">case</span> client<span class="token punctuation">.</span>send <span class="token operator">&lt;-</span> message<span class="token punctuation">:</span>
				<span class="token keyword">default</span><span class="token punctuation">:</span>
					<span class="token function">close</span><span class="token punctuation">(</span>client<span class="token punctuation">.</span>send<span class="token punctuation">)</span>
					<span class="token function">delete</span><span class="token punctuation">(</span>h<span class="token punctuation">.</span>clients<span class="token punctuation">,</span> client<span class="token punctuation">)</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法是Hub的核心，它不断地监听四个通道（register, unregister, broadcast）以及对应的操作：</p>
<ul>
<li>当有客户端要注册时，它将会从<code v-pre>register</code>通道接收到这个客户端并将其添加到<code v-pre>clients</code> map中。</li>
<li>当有客户端要注销时，它会从<code v-pre>unregister</code>通道接收到这个客户端并从<code v-pre>clients</code> map中移除。</li>
<li>当有消息需要广播时，它会从<code v-pre>broadcast</code>通道接收到这条消息，并尝试将这条消息发送给每一个在<code v-pre>clients</code> map中的客户端。如果发送失败（可能由于客户端的发送通道已满或其他原因），它将关闭那个客户端的发送通道并从<code v-pre>clients</code> map中移除该客户端。</li>
</ul>
<h2 id="client" tabindex="-1"><a class="header-anchor" href="#client" aria-hidden="true">#</a> Client</h2>
<p><code v-pre>Client</code> 类型的代码在client.go中。</p>
<p><code v-pre>serveWs</code> 函数由应用程序的 <code v-pre>main</code> 函数注册为HTTP处理程序。处理程序将HTTP连接升级到WebSocket协议，创建一个客户端，向集线器注册该客户端，并使用defer语句将该客户端调度为未注册。</p>
<p>接下来，HTTP处理程序将客户端的 <code v-pre>writePump</code> 方法作为一个goroutine启动。此方法将消息从客户端的发送通道传输到WebSocket连接。当hub关闭通道或写入WebSocket连接时，writer方法退出。</p>
<p>最后，HTTP处理程序调用客户端的 <code v-pre>readPump</code> 方法。此方法将入站消息从WebSocket传输到集线器。</p>
<p>WebSocket连接支持一个并发读取器和一个并发写入器。应用程序通过执行来自 <code v-pre>readPump</code> goroutine的所有读操作和来自 <code v-pre>writePump</code> goroutine的所有写操作来确保这些并发需求得到满足。</p>
<p>为了提高高负载下的效率， <code v-pre>writePump</code> 函数将 <code v-pre>send</code> 通道中的未决聊天消息合并为单个WebSocket消息。这减少了系统调用的数量和通过网络发送的数据量。</p>
<p>这段代码描述了<code v-pre>Client</code>结构，它是WebSocket聊天服务的核心组件，用于管理与每个客户端的WebSocket连接。以下是代码的逐段解释：</p>
<ol>
<li><strong>常量和变量定义</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
	<span class="token operator">...</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	newline <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token char">'\n'</span><span class="token punctuation">}</span>
	space   <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token char">' '</span><span class="token punctuation">}</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> upgrader <span class="token operator">=</span> websocket<span class="token punctuation">.</span>Upgrader<span class="token punctuation">{</span>
	ReadBufferSize<span class="token punctuation">:</span>  <span class="token number">1024</span><span class="token punctuation">,</span>
	WriteBufferSize<span class="token punctuation">:</span> <span class="token number">1024</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里定义了一些全局常量和变量。其中，<code v-pre>upgrader</code>是用于升级HTTP请求到WebSocket的工具。</p>
<blockquote>
<ol>
<li><strong>建立握手</strong>：当客户端想要建立一个 WebSocket 连接时，它首先发送一个标准的 HTTP GET 请求，但其中包含了一些特定的头信息（如：<code v-pre>Upgrade: websocket</code> 和 <code v-pre>Connection: Upgrade</code>），这些头信息表明客户端希望升级这个连接到 WebSocket。如果服务器支持 WebSocket，并且满足了一定的条件，它就会回应一个状态码为 101 的响应，表示连接已经升级。</li>
<li><strong>WebSocket 不是纯 HTTP</strong>：尽管 WebSocket 的握手使用 HTTP，但一旦握手完成，连接就完全脱离了 HTTP 协议，并转为 WebSocket 协议。WebSocket 协议更为轻量，适用于长时间运行的连接，可以双向发送数据，并且没有冗长的头信息。</li>
<li><strong>复用已有的端口</strong>：由于 WebSocket 连接的建立是基于 HTTP 的，因此它可以复用 HTTP 和 HTTPS 使用的标准端口（例如 80 和 443），这有助于避免防火墙和其他网络设备的限制。</li>
</ol>
</blockquote>
<ol>
<li><strong>Client的定义</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Client <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	hub <span class="token operator">*</span>Hub
	conn <span class="token operator">*</span>websocket<span class="token punctuation">.</span>Conn
	send <span class="token keyword">chan</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>hub</code>: 客户端关联的<code v-pre>Hub</code>实例。</li>
<li><code v-pre>conn</code>: 客户端的WebSocket连接。</li>
<li><code v-pre>send</code>: 一个通道，用于发送出站消息到WebSocket。</li>
</ul>
<ol start="2">
<li><strong>readPump方法</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Client<span class="token punctuation">)</span> <span class="token function">readPump</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法处理从WebSocket连接中读取的消息并发送给<code v-pre>Hub</code>。当连接关闭或发生错误时，它将注销客户端并关闭连接。</p>
<ol start="3">
<li><strong>writePump方法</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Client<span class="token punctuation">)</span> <span class="token function">writePump</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法处理从<code v-pre>Hub</code>接收的消息并发送给WebSocket连接。它还定期发送ping消息以确保连接的活跃性。</p>
<ol start="4">
<li><strong>serveWs函数</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">serveWs</span><span class="token punctuation">(</span>hub <span class="token operator">*</span>Hub<span class="token punctuation">,</span> w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数处理WebSocket请求。它首先使用<code v-pre>upgrader</code>升级HTTP请求，然后为每个新的WebSocket连接创建一个<code v-pre>Client</code>实例并注册到<code v-pre>Hub</code>。接着，它为每个连接启动<code v-pre>writePump</code>和<code v-pre>readPump</code>的goroutines。</p>
<p>总结： 这段代码通过使用<code v-pre>gorilla/websocket</code>库实现了WebSocket的客户端管理。每个<code v-pre>Client</code>都有一个对应的WebSocket连接，它使用<code v-pre>readPump</code>方法读取消息并使用<code v-pre>writePump</code>方法写入消息。这两个方法都在它们自己的goroutine中运行，确保了高并发性和性能。</p>
<p>在实际应用中，使用此种模式可以轻松地实现高性能的WebSocket服务器，这得益于Go的并发模型和<code v-pre>gorilla/websocket</code>库提供的功能。</p>
<h2 id="frontend" tabindex="-1"><a class="header-anchor" href="#frontend" aria-hidden="true">#</a> Frontend</h2>
<p>前端代码在home.html中。</p>
<p>在加载文档时，脚本检查浏览器中的WebSocket功能。如果WebSocket功能可用，则脚本将打开到服务器的连接，并注册一个回调来处理来自服务器的消息。</p>
<p>回调函数使用appendLog函数将消息附加到聊天记录中。</p>
<p>为了允许用户手动滚动聊天记录而不受新消息的干扰， <code v-pre>appendLog</code> 功能在添加新内容之前检查滚动位置。如果聊天记录滚动到底部，则该功能在添加内容后将新内容滚动到视图中。否则，滚动位置不会改变。</p>
<p>表单处理程序将用户输入写入WebSocket并清除输入字段。</p>
<h2 id="main" tabindex="-1"><a class="header-anchor" href="#main" aria-hidden="true">#</a> main</h2>
<p>这段代码是一个简单的Go语言Web服务器的主程序。它使用了<code v-pre>net/http</code>标准库来处理HTTP请求。让我们逐段分析这段代码：</p>
<ol>
<li><strong>导入库和包声明</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"flag"</span>
	<span class="token string">"log"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码导入了所需的库：<code v-pre>flag</code>用于解析命令行参数，<code v-pre>log</code>用于记录日志，<code v-pre>net/http</code>用于处理HTTP请求，<code v-pre>time</code>用于时间相关操作。</p>
<ol>
<li><strong>命令行参数解析</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> addr <span class="token operator">=</span> flag<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token string">"addr"</span><span class="token punctuation">,</span> <span class="token string">":8080"</span><span class="token punctuation">,</span> <span class="token string">"http service address"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行代码定义了一个命令行参数<code v-pre>addr</code>，它指定了HTTP服务的监听地址，默认为<code v-pre>:8080</code>。</p>
<ol>
<li><strong>定义首页处理函数</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">serveHome</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>URL<span class="token punctuation">)</span>
	<span class="token keyword">if</span> r<span class="token punctuation">.</span>URL<span class="token punctuation">.</span>Path <span class="token operator">!=</span> <span class="token string">"/"</span> <span class="token punctuation">{</span>
		http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Not found"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusNotFound<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> r<span class="token punctuation">.</span>Method <span class="token operator">!=</span> http<span class="token punctuation">.</span>MethodGet <span class="token punctuation">{</span>
		http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Method not allowed"</span><span class="token punctuation">,</span> http<span class="token punctuation">.</span>StatusMethodNotAllowed<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	http<span class="token punctuation">.</span><span class="token function">ServeFile</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token string">"home.html"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>serveHome</code>函数是一个HTTP处理器函数，用于处理对<code v-pre>/</code>路径的请求。它先检查请求路径，只有路径为<code v-pre>/</code>时才继续处理。然后，它确保请求方法为GET。最后，它发送<code v-pre>home.html</code>文件作为响应。</p>
<ol>
<li><strong>主函数</strong>：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	hub <span class="token operator">:=</span> <span class="token function">newHub</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> hub<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> serveHome<span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/ws"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token function">serveWs</span><span class="token punctuation">(</span>hub<span class="token punctuation">,</span> w<span class="token punctuation">,</span> r<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	server <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Server<span class="token punctuation">{</span>
		Addr<span class="token punctuation">:</span>              <span class="token operator">*</span>addr<span class="token punctuation">,</span>
		ReadHeaderTimeout<span class="token punctuation">:</span> <span class="token number">3</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	err <span class="token operator">:=</span> server<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span><span class="token string">"ListenAndServe: "</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是程序的主函数，步骤如下：</p>
<ul>
<li><code v-pre>flag.Parse()</code>：解析命令行参数。</li>
<li><code v-pre>hub := newHub()</code>：创建一个新的<code v-pre>hub</code>实例，这可能是用于WebSocket连接管理的结构。</li>
<li><code v-pre>go hub.run()</code>：在一个新的goroutine中运行<code v-pre>hub.run()</code>，可能是为了处理WebSocket连接和消息。</li>
<li><code v-pre>http.HandleFunc()</code>：注册HTTP处理函数。对<code v-pre>/</code>的请求交给<code v-pre>serveHome</code>处理，对<code v-pre>/ws</code>的请求使用匿名函数处理，它调用<code v-pre>serveWs</code>来处理WebSocket连接请求。</li>
<li>接下来的代码设置并启动一个HTTP服务器，监听指定的地址，并设置一个3秒的读取请求头超时。如果服务器出错，将记录错误并退出。</li>
</ul>
<p>总的来说，这是一个简单的HTTP服务器程序，它为<code v-pre>/</code>路径提供静态页面，并为<code v-pre>/ws</code>路径提供WebSocket服务。</p>
<h2 id="关系图" tabindex="-1"><a class="header-anchor" href="#关系图" aria-hidden="true">#</a> 关系图</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>       +------------+
       <span class="token operator">|</span>    Web     <span class="token operator">|</span>
       +------------+
            <span class="token operator">|</span>
            <span class="token operator">|</span> HTTP Request <span class="token punctuation">(</span>for WebSocket connection<span class="token punctuation">)</span>
            <span class="token function">v</span>
       +------------+     +-------+
       <span class="token operator">|</span> 服务端<span class="token punctuation">(</span>Server<span class="token punctuation">)</span>  <span class="token operator">|</span><span class="token operator">&lt;</span>----<span class="token operator">|</span> Hub <span class="token operator">|</span>
       +------------+     +-------+
            <span class="token operator">|</span>
            <span class="token operator">|</span> Creates <span class="token operator">&amp;</span> Registers
            <span class="token function">v</span>
       +------------+
       <span class="token operator">|</span>   Client   <span class="token operator">|</span>
       +------------+
            <span class="token operator">|</span>
            <span class="token operator">|</span> Uses
            <span class="token function">v</span>
       +------------+
       <span class="token operator">|</span> WebSocket <span class="token operator">|</span>
       +------------+

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>用户使用Web客户端发起HTTP请求尝试建立WebSocket连接。</li>
<li>服务端接收这些请求，并基于这些请求创建<code v-pre>Client</code>实例。</li>
<li>每个<code v-pre>Client</code>实例都与一个WebSocket连接关联。</li>
<li><code v-pre>Hub</code>是所有<code v-pre>Client</code>实例的中心，它知道所有活跃的<code v-pre>Client</code>并负责消息的广播。</li>
</ul>
<h2 id="信息发送和接受" tabindex="-1"><a class="header-anchor" href="#信息发送和接受" aria-hidden="true">#</a> 信息发送和接受</h2>
<p>在这个<code v-pre>gorilla/websocket</code>的示例代码中，消息的发送和接收是通过WebSocket协议进行的，这是一个基于TCP的全双工通信协议。下面是如何发送和接收消息的详细描述：</p>
<h3 id="服务端发送信息给客户端" tabindex="-1"><a class="header-anchor" href="#服务端发送信息给客户端" aria-hidden="true">#</a> 服务端发送信息给客户端：</h3>
<ol>
<li><strong>通过<code v-pre>Hub</code>向<code v-pre>Client</code>广播消息</strong>：
<ul>
<li>当<code v-pre>Hub</code>收到<code v-pre>broadcast</code>通道中的消息时，它会尝试将消息发送给所有注册的<code v-pre>Client</code>。</li>
<li>这是通过<code v-pre>Client</code>的<code v-pre>send</code>通道完成的，即通过将消息放入每个<code v-pre>Client</code>的<code v-pre>send</code>通道。</li>
</ul>
</li>
<li><strong><code v-pre>Client</code>的<code v-pre>writePump</code>方法监听其<code v-pre>send</code>通道</strong>：
<ul>
<li>当<code v-pre>send</code>通道收到消息时，<code v-pre>writePump</code>方法会将它写入WebSocket连接。</li>
<li>如果有多个消息在队列中，它们会被连续地写入WebSocket连接。</li>
</ul>
</li>
</ol>
<h3 id="客户端发送信息给服务端" tabindex="-1"><a class="header-anchor" href="#客户端发送信息给服务端" aria-hidden="true">#</a> 客户端发送信息给服务端：</h3>
<ol>
<li><strong><code v-pre>Client</code>的<code v-pre>readPump</code>方法监听来自WebSocket的入站消息</strong>：
<ul>
<li>当从WebSocket收到消息时，这个方法首先对消息进行处理（如删除新行和空格）。</li>
<li>然后，它将处理后的消息放入<code v-pre>Hub</code>的<code v-pre>broadcast</code>通道。</li>
</ul>
</li>
<li><strong><code v-pre>Hub</code>监听其<code v-pre>broadcast</code>通道中的消息</strong>：
<ul>
<li>当收到<code v-pre>broadcast</code>通道中的消息时，<code v-pre>Hub</code>会尝试将这个消息发送给所有注册的<code v-pre>Client</code>（包括发送这个消息的原始<code v-pre>Client</code>）。</li>
</ul>
</li>
</ol>
</div></template>


