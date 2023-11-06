<template><div><h1 id="openim-jssdk-一" tabindex="-1"><a class="header-anchor" href="#openim-jssdk-一" aria-hidden="true">#</a> OpenIM JSSDK (一)</h1>
<h2 id="wobsockets-学习" tabindex="-1"><a class="header-anchor" href="#wobsockets-学习" aria-hidden="true">#</a> WobSockets 学习</h2>
<ol>
<li>
<p><strong>导入包</strong> 你导入了各种包，其中有一些关于 OpenIM SDK 的包、websocket、日志和HTTP相关的包。</p>
</li>
<li>
<p><strong>主函数</strong> 在 <code v-pre>main()</code> 函数中，你的代码首先启动了一个 HTTP 服务，主要用于支持 <code v-pre>pprof</code> （一个 Go 语言内建的性能分析工具）。</p>
</li>
<li>
<p><strong>命令行参数解析</strong> 使用 <code v-pre>flag</code> 包，你解析了以下命令行参数：</p>
<ul>
<li><code v-pre>openIM_api_address</code>：OpenIM 的 API 服务器地址。</li>
<li><code v-pre>msgParseopenIM_ws_address</code>：OpenIM 的 websocket 服务器地址。</li>
<li><code v-pre>sdk_ws_port</code>：SDK websocket 的监听端口。</li>
<li><code v-pre>openIM_log_level</code>：OpenIM 的日志输出级别。</li>
<li><code v-pre>openIMDbDir</code>：OpenIM 的数据库目录。</li>
</ul>
<p>这些参数允许你在启动应用程序时进行自定义配置。</p>
</li>
<li>
<p><strong>日志初始化</strong> 使用 <code v-pre>log.NewPrivateLog</code> 初始化了日志系统，其中参数 <code v-pre>constant.LogFileName</code> 是日志文件名，第二个参数是日志的输出级别。</p>
</li>
<li>
<p><strong>判断操作系统类型</strong> 使用 <code v-pre>runtime.GOOS</code> 判断操作系统类型。根据系统类型，代码选择性地调用 <code v-pre>ws_local_server.InitServer</code>。但在此代码中，不论系统类型如何，都执行了相同的逻辑。</p>
<ol>
<li>如果是 Windows:</li>
</ol>
<blockquote>
<ol>
<li>
<p><strong>函数定义</strong></p>
<p><code v-pre>InitServer</code> 函数接受一个指向 <code v-pre>sdk_struct.IMConfig</code> 的指针参数，名为 <code v-pre>config</code>。这个结构体可能包含了 OpenIM SDK 的初始化配置信息。</p>
</li>
<li>
<p><strong>序列化配置</strong></p>
<p>使用 <code v-pre>json.Marshal</code> 将 <code v-pre>config</code> 结构体序列化成 JSON 格式。这样可以方便地将配置信息转化为字符串，用于日志输出或其他目的。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>data, _ :<span class="token operator">=</span> json.Marshal<span class="token punctuation">(</span>config<span class="token punctuation">)</span>
ConfigSvr <span class="token operator">=</span> string<span class="token punctuation">(</span>data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：在这里，错误被忽略了（用 <code v-pre>_</code> 表示）。在实际的生产环境中，错误处理是很重要的，应该检查 <code v-pre>json.Marshal</code> 是否返回了一个错误，并相应地处理。</p>
</li>
<li>
<p><strong>初始化用户路由映射</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>UserRouteMap <span class="token operator">=</span> make<span class="token punctuation">(</span>map<span class="token punctuation">[</span>string<span class="token punctuation">]</span>RefRouter, <span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>初始化了一个名为 <code v-pre>UserRouteMap</code> 的映射（map）。这个映射可能是用来记录用户的路由信息。其中，键（key）是字符串类型（可能是用户的 ID 或用户名），值（value）是 <code v-pre>RefRouter</code> 类型（该类型在这段代码中没有给出定义，但它可能是一个引用到路由或会话的结构或接口）。</p>
</li>
<li>
<p><strong>初始化 OpenIM SDK</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>open_im_sdk.InitOnce<span class="token punctuation">(</span>config<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>调用 <code v-pre>open_im_sdk.InitOnce</code> 函数来初始化 OpenIM SDK，并传入前面提到的 <code v-pre>config</code> 作为参数。</p>
</li>
<li>
<p><strong>日志输出</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"InitServer "</span><span class="token punctuation">,</span> ConfigSvr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用日志库输出一条信息，表示服务器已初始化，并附带了序列化后的配置信息 <code v-pre>ConfigSvr</code>。</p>
</li>
</ol>
</blockquote>
</li>
<li>
<p><strong>Websocket 服务器初始化和启动</strong> 调用了 <code v-pre>ws_local_server.WS.OnInit</code> 和 <code v-pre>ws_local_server.WS.Run</code> 来初始化并运行websocket服务器。</p>
</li>
</ol>
<p>关于你的问题：</p>
<p><strong>1. 登录和退出登录的问题</strong> 代码中并没有涉及具体的登录和退出登录的逻辑。但一般来说，使用WebSockets进行登录的流程大致是：</p>
<ul>
<li>客户端向服务器发送一个包含登录信息（如用户名和密码或token）的websocket消息。</li>
<li>服务器验证这些信息，并回复一个确认消息，告诉客户端是否成功登录。</li>
</ul>
<p>转换为网络调用并使用 <code v-pre>WebSockets</code> ，你需要确保客户端和服务器之间的消息格式和逻辑都明确并且一致。对于登录和退出登录，你可能需要定义不同的消息类型，并在服务器端进行相应的处理。</p>
<p><strong>Run 代码：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">go</span> ws<span class="token punctuation">.</span><span class="token function">getMsgAndSend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">"0.0.0.0:45000"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> ws<span class="token punctuation">.</span>wsHandler<span class="token punctuation">)</span>         <span class="token comment">//Get request from client to handle by wsHandler</span>
	err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>ws<span class="token punctuation">.</span>wsAddr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span> <span class="token comment">//Start listening</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"Ws listening err"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"err"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>开启协程处理消息发送</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">go</span> ws<span class="token punctuation">.</span><span class="token function">getMsgAndSend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里开启了一个新的协程（goroutine）来运行 <code v-pre>ws.getMsgAndSend()</code> 方法。在 Go 语言中，使用 <code v-pre>go</code> 关键字可以异步运行一个函数，使其在单独的协程中执行。这意味着 <code v-pre>getMsgAndSend</code> 方法是并行执行的，可能用于持续地从某个通道或队列中获取消息并发送它们。</p>
</li>
<li>
<p><strong>开启另一个 HTTP 服务器监听特定端口</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span><span class="token string">"0.0.0.0:45000"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码在一个新的协程中启动了一个 HTTP 服务器，监听 <code v-pre>0.0.0.0:45000</code> 地址。这可能是为了特定的目的，例如监控或其他服务，但在此代码片段中没有详细说明。</p>
</li>
<li>
<p><strong>为 websocket 连接设置请求处理器</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>http<span class="token punctuation">.</span><span class="token function">HandleFunc</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> ws<span class="token punctuation">.</span>wsHandler<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 <code v-pre>http.HandleFunc</code> 方法为 root path（即“/”）设置了一个处理函数 <code v-pre>ws.wsHandler</code>。当 HTTP 服务器收到一个针对这个路径的请求时，它将由 <code v-pre>ws.wsHandler</code> 方法处理。很可能，这个方法用于处理来自客户端的 websocket 连接请求。</p>
</li>
<li>
<p><strong>启动 websocket 服务器</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">ListenAndServe</span><span class="token punctuation">(</span>ws<span class="token punctuation">.</span>wsAddr<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行代码启动了一个 HTTP 服务器，监听在之前定义的 <code v-pre>ws.wsAddr</code> 地址上（例如 <code v-pre>:10003</code>）。由于它不在协程中，所以这是一个阻塞性调用，意味着它会阻塞直到服务器停止或发生错误。</p>
</li>
<li>
<p><strong>错误处理</strong>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
    log.Info<span class="token punctuation">(</span><span class="token string">""</span>, <span class="token string">"Ws listening err"</span>, <span class="token string">""</span>, <span class="token string">"err"</span>, err.Error<span class="token punctuation">(</span><span class="token punctuation">))</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果 <code v-pre>http.ListenAndServe</code> 返回一个错误，这段代码会记录该错误。在这里，它使用了 <code v-pre>log.Info</code> 方法来输出错误信息。</p>
</li>
</ol>
<p><strong>继续：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">getMsgAndSend</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"getMsgAndSend panic"</span><span class="token punctuation">,</span> <span class="token string">" panic is "</span><span class="token punctuation">,</span> r<span class="token punctuation">,</span> debug<span class="token punctuation">.</span><span class="token function">Stack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			ws<span class="token punctuation">.</span><span class="token function">getMsgAndSend</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"goroutine getMsgAndSend restart"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> r <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ws<span class="token punctuation">.</span>ch<span class="token punctuation">:</span>
			<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				operationID <span class="token operator">:=</span> utils2<span class="token punctuation">.</span><span class="token function">OperationIDGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
				log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"getMsgAndSend channel: "</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span>uid<span class="token punctuation">)</span>

				<span class="token comment">//		conns := ws.getUserConn(r.uid + " " + "Web")</span>
				conns <span class="token operator">:=</span> ws<span class="token punctuation">.</span><span class="token function">getUserConn</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>uid <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> utils<span class="token punctuation">.</span><span class="token function">PlatformIDToName</span><span class="token punctuation">(</span>sdk_struct<span class="token punctuation">.</span>SvrConf<span class="token punctuation">.</span>Platform<span class="token punctuation">)</span><span class="token punctuation">)</span>
				<span class="token keyword">if</span> conns <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
					log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"uid no conn, failed "</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span>uid<span class="token operator">+</span><span class="token string">" "</span><span class="token operator">+</span>utils<span class="token punctuation">.</span><span class="token function">PlatformIDToName</span><span class="token punctuation">(</span>sdk_struct<span class="token punctuation">.</span>SvrConf<span class="token punctuation">.</span>Platform<span class="token punctuation">)</span><span class="token punctuation">)</span>
					r<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token boolean">nil</span>
				<span class="token punctuation">}</span>
				log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"conns  "</span><span class="token punctuation">,</span> conns<span class="token punctuation">,</span> r<span class="token punctuation">.</span>uid<span class="token operator">+</span><span class="token string">" "</span><span class="token operator">+</span>utils<span class="token punctuation">.</span><span class="token function">PlatformIDToName</span><span class="token punctuation">(</span>sdk_struct<span class="token punctuation">.</span>SvrConf<span class="token punctuation">.</span>Platform<span class="token punctuation">)</span><span class="token punctuation">)</span>
				<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> conn <span class="token operator">:=</span> <span class="token keyword">range</span> conns <span class="token punctuation">{</span>
					<span class="token keyword">if</span> conn <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
						err <span class="token operator">:=</span> WS<span class="token punctuation">.</span><span class="token function">writeMsg</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> websocket<span class="token punctuation">.</span>TextMessage<span class="token punctuation">,</span> r<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
						<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
							log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"WS WriteMsg error"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"userIP"</span><span class="token punctuation">,</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"userUid"</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span>uid<span class="token punctuation">,</span> <span class="token string">"error"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
						<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
							log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"writeMsg  "</span><span class="token punctuation">,</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span>uid<span class="token punctuation">)</span>
						<span class="token punctuation">}</span>
					<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
						log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"Conn is nil, failed"</span><span class="token punctuation">)</span>
					<span class="token punctuation">}</span>
				<span class="token punctuation">}</span>
				r<span class="token punctuation">.</span>data <span class="token operator">=</span> <span class="token boolean">nil</span>
			<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>异常恢复</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token comment">// logging and restarting the goroutine</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个<code v-pre>defer</code>语句中的匿名函数，它会在<code v-pre>getMsgAndSend</code>方法结束时执行。这里的目的是捕获和处理任何在该方法中产生的panic，防止程序崩溃。如果发生panic，该函数将记录错误并尝试重新启动<code v-pre>getMsgAndSend</code>方法。</p>
</li>
<li>
<p><strong>无限循环获取消息</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">for</span> <span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用一个无限循环确保方法持续地从通道获取消息。</p>
</li>
<li>
<p><strong>从通道获取消息</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">select</span> <span class="token punctuation">{</span>
<span class="token keyword">case</span> r <span class="token operator">:=</span> <span class="token operator">&lt;-</span>ws<span class="token punctuation">.</span>ch<span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用<code v-pre>select</code>语句从<code v-pre>ws.ch</code>通道中读取消息。在这个例子中，<code v-pre>select</code>只有一个<code v-pre>case</code>，所以它将阻塞直到从<code v-pre>ws.ch</code>通道中接收到一个消息。</p>
</li>
<li>
<p><strong>处理和发送消息</strong>:</p>
<ul>
<li>为每个消息生成一个唯一的<code v-pre>operationID</code>。</li>
<li>从<code v-pre>ws.getUserConn</code>方法获取与消息相关的所有websocket连接。果<code v-pre>r.uid</code>是&quot;12345&quot;，<code v-pre>sdk_struct.SvrConf.Platform</code>是iOS的平台ID，那么最终传递给<code v-pre>ws.getUserConn</code>的字符串可能是&quot;12345 iOS&quot;。</li>
<li>对于每个websocket连接，使用<code v-pre>WS.writeMsg</code>方法发送消息。</li>
<li>如果发送消息时出现错误，记录错误信息。</li>
<li>如果连接为nil，记录错误信息。</li>
</ul>
</li>
</ol>
<p>注意几个点：</p>
<ul>
<li>使用了一个内部的goroutine（<code v-pre>go func() {...}</code>）来处理和发送每个消息。这意味着消息的发送是并行执行的，不会阻塞其他消息的处理。</li>
<li>这个函数关心的主要是将消息分发到正确的websocket连接，而不是消息的内容或格式。</li>
<li><code v-pre>r.data</code>是消息的内容，它是一个字节切片。在发送完消息后，将其设为nil，可能是为了帮助垃圾收集器回收内存。</li>
</ul>
<p><strong>继续：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">PlatformIDToName</span><span class="token punctuation">(</span>num <span class="token builtin">int32</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> PlatformID2Name<span class="token punctuation">[</span>num<span class="token punctuation">]</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> PlatformID2Name <span class="token operator">=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int32</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
	IOSPlatformID<span class="token punctuation">:</span>     IOSPlatformStr<span class="token punctuation">,</span>
	AndroidPlatformID<span class="token punctuation">:</span> AndroidPlatformStr<span class="token punctuation">,</span>
	WindowsPlatformID<span class="token punctuation">:</span> WindowsPlatformStr<span class="token punctuation">,</span>
	OSXPlatformID<span class="token punctuation">:</span>     OSXPlatformStr<span class="token punctuation">,</span>
	WebPlatformID<span class="token punctuation">:</span>     WebPlatformStr<span class="token punctuation">,</span>
	MiniWebPlatformID<span class="token punctuation">:</span> MiniWebPlatformStr<span class="token punctuation">,</span>
	LinuxPlatformID<span class="token punctuation">:</span>   LinuxPlatformStr<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>PlatformIDToName 函数</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">PlatformIDToName</span><span class="token punctuation">(</span>num <span class="token builtin">int32</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> PlatformID2Name<span class="token punctuation">[</span>num<span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个简单的辅助函数，其接受一个<code v-pre>int32</code>类型的平台ID作为输入参数，并返回与之对应的平台名称。这个函数通过查找<code v-pre>PlatformID2Name</code>映射（map）来获取相应的平台名称。</p>
</li>
<li>
<p><strong>PlatformID2Name 映射</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> PlatformID2Name <span class="token operator">=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int32</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
    IOSPlatformID<span class="token punctuation">:</span>     IOSPlatformStr<span class="token punctuation">,</span>
    AndroidPlatformID<span class="token punctuation">:</span> AndroidPlatformStr<span class="token punctuation">,</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个全局映射变量，其中的键是<code v-pre>int32</code>类型的平台ID，值是相应的平台名称字符串。在代码片段中，具体的ID和名称的值没有给出，但从变量命名可以推测它们分别代表不同的平台（如iOS、Android、Windows等）。</p>
</li>
</ol>
<h2 id="wshandler" tabindex="-1"><a class="header-anchor" href="#wshandler" aria-hidden="true">#</a> wsHandler</h2>
<p>继续从  wsHandler 开始：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">wsHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	operationID <span class="token operator">:=</span> utils2<span class="token punctuation">.</span><span class="token function">OperationIDGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"wsHandler panic recover"</span><span class="token punctuation">,</span> <span class="token string">" panic is "</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span>
			buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">&lt;&lt;</span><span class="token number">20</span><span class="token punctuation">)</span>
			runtime<span class="token punctuation">.</span><span class="token function">Stack</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"panic"</span><span class="token punctuation">,</span> <span class="token string">"call"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//var mem runtime.MemStats</span>
	<span class="token comment">//runtime.ReadMemStats(&amp;mem)</span>
	<span class="token comment">//if mem.Alloc > 2*1024*1024*1024 {</span>
	<span class="token comment">//	panic("Memory leak " + int64ToString(int64(mem.Alloc)))</span>
	<span class="token comment">//}</span>
	<span class="token comment">//log.Info(operationID, "wsHandler ", r.URL.Query(), "js sdk svr mem: ", mem.Alloc, mem.TotalAlloc, "all: ", mem)</span>

	<span class="token keyword">if</span> ws<span class="token punctuation">.</span><span class="token function">headerCheck</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> operationID<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		query <span class="token operator">:=</span> r<span class="token punctuation">.</span>URL<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> ws<span class="token punctuation">.</span>wsUpGrader<span class="token punctuation">.</span><span class="token function">Upgrade</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span> <span class="token comment">//Conn is obtained through the upgraded escalator</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"upgrade http conn err"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"err"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>

			sendIDAndPlatformID <span class="token operator">:=</span> query<span class="token punctuation">[</span><span class="token string">"sendID"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> utils<span class="token punctuation">.</span><span class="token function">PlatformIDToName</span><span class="token punctuation">(</span><span class="token function">int32</span><span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">StringToInt64</span><span class="token punctuation">(</span>query<span class="token punctuation">[</span><span class="token string">"platformID"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			newConn <span class="token operator">:=</span> <span class="token operator">&amp;</span>UserConn<span class="token punctuation">{</span>conn<span class="token punctuation">,</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>Mutex<span class="token punctuation">)</span><span class="token punctuation">}</span>
			ws<span class="token punctuation">.</span><span class="token function">addUserConn</span><span class="token punctuation">(</span>sendIDAndPlatformID<span class="token punctuation">,</span> newConn<span class="token punctuation">,</span> operationID<span class="token punctuation">)</span>
			<span class="token keyword">go</span> ws<span class="token punctuation">.</span><span class="token function">readMsg</span><span class="token punctuation">(</span>newConn<span class="token punctuation">,</span> sendIDAndPlatformID<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">NewError</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"headerCheck failed"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>函数定义</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">wsHandler</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是一个属于<code v-pre>WServer</code>结构体的方法。该方法有两个参数：HTTP响应写入器<code v-pre>w</code>和HTTP请求<code v-pre>r</code>。</p>
</li>
<li>
<p><strong>处理panic</strong>: 这里的<code v-pre>defer</code>函数与<code v-pre>recover</code>配合，用于捕获并记录函数内部的任何panic，确保服务的正常运行。</p>
</li>
<li>
<p><strong>头部检查(headerCheck)</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> ws<span class="token punctuation">.</span><span class="token function">headerCheck</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> operationID<span class="token punctuation">)</span> <span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>之前，<code v-pre>headerCheck</code>函数可能用于验证来自客户端的请求头部是否满足某些要求或包含有效的令牌。只有当此检查通过时，代码才会继续执行后续逻辑。</p>
</li>
<li>
<p><strong>升级HTTP连接为WebSocket</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> ws<span class="token punctuation">.</span>wsUpGrader<span class="token punctuation">.</span><span class="token function">Upgrade</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用<code v-pre>wsUpGrader</code>，该代码尝试将HTTP请求升级为WebSocket连接。</p>
</li>
<li>
<p><strong>处理WebSocket连接</strong>:</p>
<ul>
<li>如果升级失败，则记录错误并返回。</li>
<li>如果成功，它将获取<code v-pre>sendID</code>和<code v-pre>platformID</code>来识别用户，并组合它们以创建一个唯一标识符<code v-pre>sendIDAndPlatformID</code>。</li>
<li>创建一个新的<code v-pre>UserConn</code>结构体实例，表示用户的WebSocket连接。</li>
<li>使用<code v-pre>addUserConn</code>方法将新的WebSocket连接添加到内部数据结构中。</li>
<li>使用<code v-pre>readMsg</code>方法在新的goroutine中异步读取来自该WebSocket连接的消息。</li>
</ul>
</li>
<li>
<p><strong>如果头部检查失败</strong>: 如果<code v-pre>headerCheck</code>失败，它将记录一条错误消息。</p>
</li>
</ol>
<p><strong>继续进行 headerCheck:</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">headerCheck</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> operationID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>

	status <span class="token operator">:=</span> http<span class="token punctuation">.</span>StatusUnauthorized
	query <span class="token operator">:=</span> r<span class="token punctuation">.</span>URL<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"headerCheck: "</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"token"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"platformID"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"sendID"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span>RemoteAddr<span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>query<span class="token punctuation">[</span><span class="token string">"token"</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>query<span class="token punctuation">[</span><span class="token string">"sendID"</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>query<span class="token punctuation">[</span><span class="token string">"platformID"</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		SendID <span class="token operator">:=</span> query<span class="token punctuation">[</span><span class="token string">"sendID"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> utils<span class="token punctuation">.</span><span class="token function">PlatformIDToName</span><span class="token punctuation">(</span><span class="token function">int32</span><span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">StringToInt64</span><span class="token punctuation">(</span>query<span class="token punctuation">[</span><span class="token string">"platformID"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> ws<span class="token punctuation">.</span><span class="token function">getConnNum</span><span class="token punctuation">(</span>SendID<span class="token punctuation">)</span> <span class="token operator">>=</span> POINTNUM <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"Over quantity failed"</span><span class="token punctuation">,</span> query<span class="token punctuation">,</span> ws<span class="token punctuation">.</span><span class="token function">getConnNum</span><span class="token punctuation">(</span>SendID<span class="token punctuation">)</span><span class="token punctuation">,</span> SendID<span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Sec-Websocket-Version"</span><span class="token punctuation">,</span> <span class="token string">"13"</span><span class="token punctuation">)</span>
			http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> <span class="token string">"Over quantity"</span><span class="token punctuation">,</span> status<span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//if utils.StringToInt(query["platformID"][0]) != utils.WebPlatformID {</span>
		<span class="token comment">//	log.Info("check platform id failed", query["sendID"][0], query["platformID"][0])</span>
		<span class="token comment">//	w.Header().Set("Sec-Websocket-Version", "13")</span>
		<span class="token comment">//	http.Error(w, http.StatusText(status), StatusBadRequest)</span>
		<span class="token comment">//	return false</span>
		<span class="token comment">//}</span>
		checkFlag <span class="token operator">:=</span> open_im_sdk<span class="token punctuation">.</span><span class="token function">CheckToken</span><span class="token punctuation">(</span>query<span class="token punctuation">[</span><span class="token string">"sendID"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"token"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> operationID<span class="token punctuation">)</span>
		<span class="token keyword">if</span> checkFlag <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"check token failed"</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"sendID"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"token"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> checkFlag<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Sec-Websocket-Version"</span><span class="token punctuation">,</span> <span class="token string">"13"</span><span class="token punctuation">)</span>
			http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> http<span class="token punctuation">.</span><span class="token function">StatusText</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">,</span> status<span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span>
		<span class="token punctuation">}</span>
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"Connection Authentication Success"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"token"</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"token"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">"userID"</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"sendID"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string">"platformID"</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"platformID"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>

	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"Args err"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"query"</span><span class="token punctuation">,</span> query<span class="token punctuation">)</span>
		w<span class="token punctuation">.</span><span class="token function">Header</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"Sec-Websocket-Version"</span><span class="token punctuation">,</span> <span class="token string">"13"</span><span class="token punctuation">)</span>
		http<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>w<span class="token punctuation">,</span> http<span class="token punctuation">.</span><span class="token function">StatusText</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">,</span> StatusBadRequest<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>函数定义</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">headerCheck</span><span class="token punctuation">(</span>w http<span class="token punctuation">.</span>ResponseWriter<span class="token punctuation">,</span> r <span class="token operator">*</span>http<span class="token punctuation">.</span>Request<span class="token punctuation">,</span> operationID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是一个属于<code v-pre>WServer</code>结构体的方法。该方法有三个参数：HTTP响应写入器<code v-pre>w</code>、HTTP请求<code v-pre>r</code>，以及<code v-pre>operationID</code>，一个用于日志记录的标识符。</p>
</li>
<li>
<p><strong>日志记录</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"headerCheck: "</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"token"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"platformID"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"sendID"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span>RemoteAddr<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了方便跟踪和调试，该方法首先记录了传入请求的一些参数。</p>
</li>
<li>
<p><strong>验证查询参数</strong>: 该方法检查请求URL的查询参数中是否存在<code v-pre>token</code>, <code v-pre>sendID</code>和<code v-pre>platformID</code>。这些参数是WebSocket连接的必需参数。</p>
</li>
<li>
<p><strong>检查连接数量</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> ws<span class="token punctuation">.</span><span class="token function">getConnNum</span><span class="token punctuation">(</span>SendID<span class="token punctuation">)</span> <span class="token operator">>=</span> POINTNUM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此处限制了与特定用户关联的WebSocket连接数。如果超过了限制(<code v-pre>POINTNUM</code>)，则返回错误。</p>
</li>
<li>
<p><strong>验证平台ID</strong>: 虽然代码中注释掉了此部分，但原来的意图是检查<code v-pre>platformID</code>是否等于特定的平台ID，例如Web。</p>
</li>
<li>
<p><strong>Token验证</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>checkFlag <span class="token operator">:=</span> open_im_sdk<span class="token punctuation">.</span><span class="token function">CheckToken</span><span class="token punctuation">(</span>query<span class="token punctuation">[</span><span class="token string">"sendID"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> query<span class="token punctuation">[</span><span class="token string">"token"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> operationID<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用提供的SDK函数<code v-pre>CheckToken</code>来验证用户的<code v-pre>token</code>。</p>
</li>
<li>
<p><strong>处理失败的请求</strong>: 如果验证失败，该方法将在响应头部设置<code v-pre>Sec-Websocket-Version</code>并发送一个错误消息。</p>
</li>
<li>
<p><strong>返回值</strong>: 方法最后返回一个布尔值，表示请求是否已成功验证。</p>
</li>
</ol>
<p>总结：<code v-pre>headerCheck</code>方法的主要目的是验证WebSocket连接请求。它确保请求具有所有必要的查询参数，并且这些参数都是有效的。如果所有检查都通过，则该请求被认为是有效的，方法将返回<code v-pre>true</code>；否则返回<code v-pre>false</code>。</p>
<p>继续看看检查 token：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">CheckToken</span><span class="token punctuation">(</span>userID<span class="token punctuation">,</span> token <span class="token builtin">string</span><span class="token punctuation">,</span> operationID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">error</span><span class="token punctuation">,</span> <span class="token builtin">uint32</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> operationID <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		operationID <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">OperationIDGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> utils<span class="token punctuation">.</span><span class="token function">GetSelfFuncName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> userID<span class="token punctuation">,</span> token<span class="token punctuation">)</span>
	p <span class="token operator">:=</span> ws<span class="token punctuation">.</span><span class="token function">NewPostApi</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> sdk_struct<span class="token punctuation">.</span>SvrConf<span class="token punctuation">.</span>ApiAddr<span class="token punctuation">)</span>
	user <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">NewUser</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">,</span> p<span class="token punctuation">,</span> userID<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	<span class="token comment">//_, err := user.GetSelfUserInfoFromSvr(operationID)</span>
	<span class="token comment">//if err != nil {</span>
	<span class="token comment">//	return utils.Wrap(err, "GetSelfUserInfoFromSvr failed "+operationID), 0</span>
	<span class="token comment">//}</span>
	exp<span class="token punctuation">,</span> err <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">ParseTokenFromSvr</span><span class="token punctuation">(</span>operationID<span class="token punctuation">)</span>
	<span class="token keyword">return</span> err<span class="token punctuation">,</span> exp
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>函数定义</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">CheckToken</span><span class="token punctuation">(</span>userID<span class="token punctuation">,</span> token <span class="token builtin">string</span><span class="token punctuation">,</span> operationID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">error</span><span class="token punctuation">,</span> <span class="token builtin">uint32</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此函数接受三个参数：用户ID(<code v-pre>userID</code>)、token(<code v-pre>token</code>)和用于日志记录的操作ID(<code v-pre>operationID</code>)。它返回一个错误对象和一个无符号的32位整数。</p>
</li>
<li>
<p><strong>生成操作ID</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> operationID <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span>
    operationID <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">OperationIDGenerator</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果传入的操作ID是空的，则会生成一个新的操作ID。</p>
</li>
<li>
<p><strong>日志记录</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>log<span class="token punctuation">.</span><span class="token function">Debug</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> utils<span class="token punctuation">.</span><span class="token function">GetSelfFuncName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> userID<span class="token punctuation">,</span> token<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>记录调试信息，包括函数名和传入的参数。</p>
</li>
<li>
<p><strong>创建Post API和用户对象</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>p <span class="token operator">:=</span> ws<span class="token punctuation">.</span><span class="token function">NewPostApi</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> sdk_struct<span class="token punctuation">.</span>SvrConf<span class="token punctuation">.</span>ApiAddr<span class="token punctuation">)</span>
user <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">NewUser</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">,</span> p<span class="token punctuation">,</span> userID<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>为了进一步与服务器通信，这里首先创建了一个新的Post API对象。然后，使用该API对象创建了一个新的用户对象。</p>
<blockquote>
<p>API请求的一种常见方式是使用HTTP POST请求。这种请求可以发送数据（例如用户名和密码）到服务器，并期望返回某些数据（例如用户的详细信息）。</p>
<p>在给定的代码中，<code v-pre>ws.NewPostApi(token, sdk_struct.SvrConf.ApiAddr)</code>很可能是创建一个新的API客户端的方法，用于向地址<code v-pre>sdk_struct.SvrConf.ApiAddr</code>发送POST请求，并使用<code v-pre>token</code>进行身份验证。</p>
</blockquote>
</li>
<li>
<p><strong>Token验证</strong>: 虽然已经注释掉了这部分代码，但原意是通过<code v-pre>GetSelfUserInfoFromSvr</code>方法从服务器获取用户信息来验证token。此验证已被新的<code v-pre>ParseTokenFromSvr</code>方法替代。</p>
</li>
<li>
<p><strong>解析Token</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>exp<span class="token punctuation">,</span> err <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">ParseTokenFromSvr</span><span class="token punctuation">(</span>operationID<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用<code v-pre>ParseTokenFromSvr</code>方法解析token。这可能是为了检查token是否还有效或是否与给定的用户ID匹配。</p>
</li>
<li>
<p><strong>返回值</strong>: 函数最后返回由<code v-pre>ParseTokenFromSvr</code>方法产生的错误和无符号的32位整数值。</p>
</li>
</ol>
<p><strong>继续看 Parse Token 部分：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">ParseTokenFromSvr</span><span class="token punctuation">(</span>operationID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">uint32</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	apiReq <span class="token operator">:=</span> api<span class="token punctuation">.</span>ParseTokenReq<span class="token punctuation">{</span><span class="token punctuation">}</span>
	apiReq<span class="token punctuation">.</span>OperationID <span class="token operator">=</span> operationID
	apiResp <span class="token operator">:=</span> api<span class="token punctuation">.</span>ParseTokenResp<span class="token punctuation">{</span><span class="token punctuation">}</span>
	err <span class="token operator">:=</span> u<span class="token punctuation">.</span>p<span class="token punctuation">.</span><span class="token function">PostReturn</span><span class="token punctuation">(</span>constant<span class="token punctuation">.</span>ParseTokenRouter<span class="token punctuation">,</span> apiReq<span class="token punctuation">,</span> <span class="token operator">&amp;</span>apiResp<span class="token punctuation">.</span>ExpireTime<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> utils<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> apiReq<span class="token punctuation">.</span>OperationID<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"apiResp.ExpireTime.ExpireTimeSeconds "</span><span class="token punctuation">,</span> apiResp<span class="token punctuation">.</span>ExpireTime<span class="token punctuation">)</span>
	<span class="token keyword">return</span> apiResp<span class="token punctuation">.</span>ExpireTime<span class="token punctuation">.</span>ExpireTimeSeconds<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此代码片段定义了<code v-pre>User</code>结构的方法<code v-pre>ParseTokenFromSvr</code>，它旨在与服务器通信以解析（或验证）令牌。下面是该函数的详细步骤及解释：</p>
<ol>
<li>
<p><strong>函数签名</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">ParseTokenFromSvr</span><span class="token punctuation">(</span>operationID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">uint32</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是一个<code v-pre>User</code>结构的方法。它接受一个名为<code v-pre>operationID</code>的字符串参数，并返回一个<code v-pre>uint32</code>类型的值和一个<code v-pre>error</code>。</p>
</li>
<li>
<p><strong>创建请求对象</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>apiReq <span class="token operator">:=</span> api<span class="token punctuation">.</span>ParseTokenReq<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该代码初始化一个名为<code v-pre>apiReq</code>的<code v-pre>ParseTokenReq</code>类型的对象。这个对象很可能是用于API调用的请求体。</p>
</li>
<li>
<p><strong>设置操作ID</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>apiReq<span class="token punctuation">.</span>OperationID <span class="token operator">=</span> operationID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将传递给函数的<code v-pre>operationID</code>分配给<code v-pre>apiReq</code>的<code v-pre>OperationID</code>字段。</p>
</li>
<li>
<p><strong>创建响应对象</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>apiResp <span class="token operator">:=</span> api<span class="token punctuation">.</span>ParseTokenResp<span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此代码初始化一个预期的API响应对象。此对象将被填充，当服务器响应API请求时。</p>
</li>
<li>
<p><strong>API请求</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>err <span class="token operator">:=</span> u<span class="token punctuation">.</span>p<span class="token punctuation">.</span><span class="token function">PostReturn</span><span class="token punctuation">(</span>constant<span class="token punctuation">.</span>ParseTokenRouter<span class="token punctuation">,</span> apiReq<span class="token punctuation">,</span> <span class="token operator">&amp;</span>apiResp<span class="token punctuation">.</span>ExpireTime<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用<code v-pre>PostReturn</code>方法，该方法发送一个POST请求到服务器。它需要三个参数：</p>
<ul>
<li><code v-pre>constant.ParseTokenRouter</code>：API的路由或端点。</li>
<li><code v-pre>apiReq</code>：请求的数据。</li>
<li><code v-pre>&amp;apiResp.ExpireTime</code>：响应的数据应被填充在这里。</li>
</ul>
</li>
<li>
<p><strong>错误检查</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> utils<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> apiReq<span class="token punctuation">.</span>OperationID<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果在API请求中出现错误，将错误包装（使用<code v-pre>utils.Wrap</code>函数）并返回。</p>
</li>
<li>
<p><strong>记录响应</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"apiResp.ExpireTime.ExpireTimeSeconds "</span><span class="token punctuation">,</span> apiResp<span class="token punctuation">.</span>ExpireTime<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将API响应记录到日志中。</p>
</li>
<li>
<p><strong>返回结果</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">return</span> apiResp<span class="token punctuation">.</span>ExpireTime<span class="token punctuation">.</span>ExpireTimeSeconds<span class="token punctuation">,</span> <span class="token boolean">nil</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>返回从服务器获取的到期时间。如果没有错误，第二个返回值将为<code v-pre>nil</code>。</p>
</li>
</ol>
<p>这个函数的目的是与服务器通信，验证（或解析）令牌，并从服务器获取令牌的到期时间。</p>
<p><strong>OperationID;</strong></p>
<p><code v-pre>operationID</code> 是一个通常在日志、监控、调试和跟踪中使用的标识符。它的目的是在分布式系统中提供一个独特的、可识别的标记，使得特定的操作或请求可以跨多个组件、服务或日志条目进行追踪。</p>
<p>在给定的代码中，<code v-pre>operationID</code> 被用作一个标识符，其值随请求被传递，并可能被用于日志记录或错误处理。这种方式使得开发人员和运维人员能够轻松地跟踪或查找与特定请求或操作相关的所有活动或问题。</p>
<p>使用 <code v-pre>operationID</code> 的优势包括：</p>
<ol>
<li><strong>跟踪能力</strong>：在分布式系统中，一个请求可能会穿越多个服务或组件。使用唯一的 <code v-pre>operationID</code> 可以帮助你跟踪整个请求的生命周期。</li>
<li><strong>简化问题诊断</strong>：当问题发生时，可以使用 <code v-pre>operationID</code> 快速定位所有与特定请求或操作相关的日志条目，从而更容易地确定问题的根源。</li>
<li><strong>提高日志的有用性</strong>：<code v-pre>operationID</code> 可以帮助将相关的日志条目分组，使其更容易分析。</li>
</ol>
<p>在给定的代码中，似乎 <code v-pre>operationID</code> 被用于日志记录，从而能够跟踪请求、操作或特定的</p>
<p><strong>继续看 headcheck 检查成功部分：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>sendIDAndPlatformID <span class="token operator">:=</span> query<span class="token punctuation">[</span><span class="token string">"sendID"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> utils<span class="token punctuation">.</span><span class="token function">PlatformIDToName</span><span class="token punctuation">(</span><span class="token function">int32</span><span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">StringToInt64</span><span class="token punctuation">(</span>query<span class="token punctuation">[</span><span class="token string">"platformID"</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
newConn <span class="token operator">:=</span> <span class="token operator">&amp;</span>UserConn<span class="token punctuation">{</span>conn<span class="token punctuation">,</span> <span class="token function">new</span><span class="token punctuation">(</span>sync<span class="token punctuation">.</span>Mutex<span class="token punctuation">)</span><span class="token punctuation">}</span>
ws<span class="token punctuation">.</span><span class="token function">addUserConn</span><span class="token punctuation">(</span>sendIDAndPlatformID<span class="token punctuation">,</span> newConn<span class="token punctuation">,</span> operationID<span class="token punctuation">)</span>
<span class="token keyword">go</span> ws<span class="token punctuation">.</span><span class="token function">readMsg</span><span class="token punctuation">(</span>newConn<span class="token punctuation">,</span> sendIDAndPlatformID<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>添加用户链接：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">addUserConn</span><span class="token punctuation">(</span>uid <span class="token builtin">string</span><span class="token punctuation">,</span> conn <span class="token operator">*</span>UserConn<span class="token punctuation">,</span> operationID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	rwLock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">var</span> flag <span class="token builtin">int32</span>
	<span class="token keyword">if</span> oldConnMap<span class="token punctuation">,</span> ok <span class="token operator">:=</span> ws<span class="token punctuation">.</span>wsUserToConn<span class="token punctuation">[</span>uid<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		flag <span class="token operator">=</span> <span class="token number">1</span>
		oldConnMap<span class="token punctuation">[</span>conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> conn
		ws<span class="token punctuation">.</span>wsUserToConn<span class="token punctuation">[</span>uid<span class="token punctuation">]</span> <span class="token operator">=</span> oldConnMap
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"this user is not first login"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
		<span class="token comment">//err := oldConn.Close()</span>
		<span class="token comment">//delete(ws.wsConnToUser, oldConn)</span>
		<span class="token comment">//if err != nil {</span>
		<span class="token comment">//	log.Info("", "close err", "", "uid", uid, "conn", conn)</span>
		<span class="token comment">//}</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		i <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">*</span>UserConn<span class="token punctuation">)</span>
		i<span class="token punctuation">[</span>conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> conn
		ws<span class="token punctuation">.</span>wsUserToConn<span class="token punctuation">[</span>uid<span class="token punctuation">]</span> <span class="token operator">=</span> i
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"this user is first login"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> oldStringMap<span class="token punctuation">,</span> ok <span class="token operator">:=</span> ws<span class="token punctuation">.</span>wsConnToUser<span class="token punctuation">[</span>conn<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		oldStringMap<span class="token punctuation">[</span>conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> uid
		ws<span class="token punctuation">.</span>wsConnToUser<span class="token punctuation">[</span>conn<span class="token punctuation">]</span> <span class="token operator">=</span> oldStringMap
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"find failed"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
		<span class="token comment">//err := oldConn.Close()</span>
		<span class="token comment">//delete(ws.wsConnToUser, oldConn)</span>
		<span class="token comment">//if err != nil {</span>
		<span class="token comment">//	log.Info("", "close err", "", "uid", uid, "conn", conn)</span>
		<span class="token comment">//}</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		i <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>
		i<span class="token punctuation">[</span>conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> uid
		ws<span class="token punctuation">.</span>wsConnToUser<span class="token punctuation">[</span>conn<span class="token punctuation">]</span> <span class="token operator">=</span> i
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"this user is first login"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"WS Add operation"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"wsUser added"</span><span class="token punctuation">,</span> ws<span class="token punctuation">.</span>wsUserToConn<span class="token punctuation">,</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> uid<span class="token punctuation">,</span> <span class="token string">"online_num"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>ws<span class="token punctuation">.</span>wsUserToConn<span class="token punctuation">)</span><span class="token punctuation">)</span>
	rwLock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">//log.Info("", "after add, wsConnToUser map ", ws.wsConnToUser)</span>
	<span class="token comment">//	log.Info("", "after add, wsUserToConn  map ", ws.wsUserToConn)</span>

	<span class="token keyword">if</span> flag <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token comment">//	DelUserRouter(uid)</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个函数，主要用于处理 WebSocket 服务器中用户连接的添加逻辑。我们来逐行解析它。</p>
<p>首先，声明函数：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">addUserConn</span><span class="token punctuation">(</span>uid <span class="token builtin">string</span><span class="token punctuation">,</span> conn <span class="token operator">*</span>UserConn<span class="token punctuation">,</span> operationID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是一个方法，其接收者类型为 <code v-pre>*WServer</code>，方法名为 <code v-pre>addUserConn</code>。该方法接受三个参数：<code v-pre>uid</code>（用户ID），<code v-pre>conn</code>（用户连接信息）和<code v-pre>operationID</code>（操作ID，可能用于日志记录）。</p>
<p>接下来：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>rwLock<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>它用一个读写锁（<code v-pre>rwLock</code>）来加锁，保证在对数据结构进行修改时不会发生并发冲突。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> flag <span class="token builtin">int32</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>定义了一个 <code v-pre>flag</code> 变量，初始化为0。此变量稍后用于标记某些情况。</p>
<p>接下来检查用户是否已经存在：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> oldConnMap<span class="token punctuation">,</span> ok <span class="token operator">:=</span> ws<span class="token punctuation">.</span>wsUserToConn<span class="token punctuation">[</span>uid<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果用户 <code v-pre>uid</code> 已经在 <code v-pre>wsUserToConn</code> 映射中，则 <code v-pre>ok</code> 为 <code v-pre>true</code>。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>flag <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将 <code v-pre>flag</code> 设为1，表示用户不是首次登录。</p>
<p>接着，函数更新该用户的连接映射，并记录日志：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>oldConnMap<span class="token punctuation">[</span>conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> conn
ws<span class="token punctuation">.</span>wsUserToConn<span class="token punctuation">[</span>uid<span class="token punctuation">]</span> <span class="token operator">=</span> oldConnMap
log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"this user is not first login"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注释部分似乎是之前的一些逻辑，现在已被注释掉：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">//err := oldConn.Close()</span>
<span class="token comment">//delete(ws.wsConnToUser, oldConn)</span>
<span class="token comment">//if err != nil {</span>
<span class="token comment">//	log.Info("", "close err", "", "uid", uid, "conn", conn)</span>
<span class="token comment">//}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果用户 <code v-pre>uid</code> 不在 <code v-pre>wsUserToConn</code> 映射中，那么将创建新的映射，并记录日志：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
	i <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">*</span>UserConn<span class="token punctuation">)</span>
	i<span class="token punctuation">[</span>conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> conn
	ws<span class="token punctuation">.</span>wsUserToConn<span class="token punctuation">[</span>uid<span class="token punctuation">]</span> <span class="token operator">=</span> i
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"this user is first login"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着，检查当前连接是否已存在：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> oldStringMap<span class="token punctuation">,</span> ok <span class="token operator">:=</span> ws<span class="token punctuation">.</span>wsConnToUser<span class="token punctuation">[</span>conn<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果存在，更新映射并记录日志：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>oldStringMap<span class="token punctuation">[</span>conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> uid
ws<span class="token punctuation">.</span>wsConnToUser<span class="token punctuation">[</span>conn<span class="token punctuation">]</span> <span class="token operator">=</span> oldStringMap
log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"find failed"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，注释部分是一些之前的逻辑。</p>
<p>如果连接不存在，创建新的映射并记录日志：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
	i <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>
	i<span class="token punctuation">[</span>conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">=</span> uid
	ws<span class="token punctuation">.</span>wsConnToUser<span class="token punctuation">[</span>conn<span class="token punctuation">]</span> <span class="token operator">=</span> i
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"this user is first login"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后，记录一条总体的日志信息：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"WS Add operation"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"wsUser added"</span><span class="token punctuation">,</span> ws<span class="token punctuation">.</span>wsUserToConn<span class="token punctuation">,</span> <span class="token string">"uid"</span><span class="token punctuation">,</span> uid<span class="token punctuation">,</span> <span class="token string">"online_num"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>ws<span class="token punctuation">.</span>wsUserToConn<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后解锁：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>rwLock<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，根据之前的 <code v-pre>flag</code> 判断，如果用户不是首次登录，可能需要执行一些额外的操作（这里也被注释掉了）：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> flag <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
	<span class="token comment">//	DelUserRouter(uid)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整体上，这个函数的目的是在 WebSocket 服务器中添加或更新用户连接。</p>
<p><strong>从 WebSockets 不断读取链接：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">readMsg</span><span class="token punctuation">(</span>conn <span class="token operator">*</span>UserConn<span class="token punctuation">,</span> sendIDAndPlatformID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		msgType<span class="token punctuation">,</span> msg<span class="token punctuation">,</span> err <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">ReadMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"ReadMessage error"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"userIP"</span><span class="token punctuation">,</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"userUid"</span><span class="token punctuation">,</span> sendIDAndPlatformID<span class="token punctuation">,</span> <span class="token string">"error"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

			<span class="token comment">//log.Info("debug memory delUserConn begin ")</span>
			<span class="token comment">//time.Sleep(1 * time.Second)</span>

			ws<span class="token punctuation">.</span><span class="token function">delUserConn</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
			<span class="token comment">//log.Info("debug memory delUserConn end  ")</span>
			<span class="token comment">//time.Sleep(1 * time.Second)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"ReadMessage ok "</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"msgType"</span><span class="token punctuation">,</span> msgType<span class="token punctuation">,</span> <span class="token string">"userIP"</span><span class="token punctuation">,</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"userUid"</span><span class="token punctuation">,</span> sendIDAndPlatformID<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		m <span class="token operator">:=</span> Req<span class="token punctuation">{</span><span class="token punctuation">}</span>
		json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>msg<span class="token punctuation">,</span> <span class="token operator">&amp;</span>m<span class="token punctuation">)</span>

		<span class="token comment">//log.Info("debug memory msgParse begin ", m)</span>
		<span class="token comment">//time.Sleep(1 * time.Second)</span>

		ws<span class="token punctuation">.</span><span class="token function">msgParse</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
		<span class="token comment">//log.Info("debug memory msgParse end ", m)</span>
		<span class="token comment">//time.Sleep(1 * time.Second)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码定义了一个方法 <code v-pre>readMsg</code>，其接收者类型为 <code v-pre>*WServer</code>。这个方法的主要目的是从一个 <code v-pre>UserConn</code>（似乎是一个 WebSocket 连接）中不断地读取消息。</p>
<p>让我们继续逐行分析：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (ws *WServer) readMsg(conn *UserConn, sendIDAndPlatformID string) {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该方法接受两个参数：<code v-pre>conn</code>（用户连接信息）和 <code v-pre>sendIDAndPlatformID</code>（一个字符串，可能包含发送者ID和平台ID，但从这个名称来看，具体含义不太明确）。</p>
<p>开始无限循环，意味着它会持续地读取消息，直到发生错误或其他退出条件：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>for {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>尝试从 <code v-pre>conn</code> 读取消息：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>msgType, msg, err := conn.ReadMessage()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检查是否出现读取错误：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if err != nil {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果出现错误，记录错误日志：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"ReadMessage error"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"userIP"</span><span class="token punctuation">,</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"userUid"</span><span class="token punctuation">,</span> sendIDAndPlatformID<span class="token punctuation">,</span> <span class="token string">"error"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着，删除该用户连接：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ws.delUserConn(conn)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此处还有一些被注释掉的代码，看起来像是之前用于调试内存问题的：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//log.Info("debug memory delUserConn begin ")
//time.Sleep(1 * time.Second)
//...
//log.Info("debug memory delUserConn end  ")
//time.Sleep(1 * time.Second)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因为读取消息出错，所以直接返回，结束函数：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>return
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果没有错误，则记录日志：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>} else {
	log.Info("", "ReadMessage ok ", "", "msgType", msgType, "userIP", conn.RemoteAddr().String(), "userUid", sendIDAndPlatformID)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将读取到的消息解析为 <code v-pre>Req</code> 结构：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>m := Req{}
json.Unmarshal(msg, &amp;m)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此处假设消息是JSON格式的，并尝试将其反序列化到 <code v-pre>Req</code> 类型的变量中。</p>
<p>然后，解析该消息：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ws.msgParse(conn, msg)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>同样，有一些被注释掉的代码，可能用于调试：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>//log.Info("debug memory msgParse begin ", m)
//time.Sleep(1 * time.Second)
//...
//log.Info("debug memory msgParse end ", m)
//time.Sleep(1 * time.Second)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>整个循环结束后，它将回到开始，继续读取下一个消息。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">msgParse</span><span class="token punctuation">(</span>conn <span class="token operator">*</span>UserConn<span class="token punctuation">,</span> jsonMsg <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	m <span class="token operator">:=</span> Req<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span>jsonMsg<span class="token punctuation">,</span> <span class="token operator">&amp;</span>m<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">SendOneConnMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span><span class="token string">"error"</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token string">"Unmarshal failed"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">}</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token function">SendOneConnMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span>m<span class="token punctuation">.</span>ReqFuncName<span class="token punctuation">,</span> StatusBadParameter<span class="token punctuation">,</span> <span class="token function">StatusText</span><span class="token punctuation">(</span>StatusBadParameter<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>OperationID<span class="token punctuation">}</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"msgParse"</span><span class="token punctuation">,</span> <span class="token string">"bad request, panic is "</span><span class="token punctuation">,</span> r<span class="token punctuation">)</span>
			buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token operator">&lt;&lt;</span><span class="token number">16</span><span class="token punctuation">)</span>
			runtime<span class="token punctuation">.</span><span class="token function">Stack</span><span class="token punctuation">(</span>buf<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"msgParse"</span><span class="token punctuation">,</span> <span class="token string">"call"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"msgParse"</span><span class="token punctuation">,</span> <span class="token string">"recv request from web: "</span><span class="token punctuation">,</span> <span class="token string">"reqFuncName "</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>ReqFuncName<span class="token punctuation">,</span> <span class="token string">"data "</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>Data<span class="token punctuation">,</span> <span class="token string">"recv jsonMsg: "</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>jsonMsg<span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> m<span class="token punctuation">.</span>ReqFuncName <span class="token operator">==</span> <span class="token string">"Login"</span> <span class="token punctuation">{</span>
		<span class="token comment">//	rwLock.Lock()</span>
		ws<span class="token punctuation">.</span><span class="token function">DoLogin</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>OperationID<span class="token punctuation">,</span> <span class="token string">"msgParse"</span><span class="token punctuation">,</span> m<span class="token punctuation">)</span>
		<span class="token comment">//	rwLock.Unlock()</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	UserRouteRwLock<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> UserRouteRwLock<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">//	rwLock.RLock()</span>
	<span class="token comment">//	defer rwLock.RUnlock()</span>
	urm<span class="token punctuation">,</span> ok <span class="token operator">:=</span> UserRouteMap<span class="token punctuation">[</span>m<span class="token punctuation">.</span>UserID<span class="token punctuation">]</span>

	<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"msgParse"</span><span class="token punctuation">,</span> <span class="token string">"user not login failed, must login first: "</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>UserID<span class="token punctuation">)</span>
		<span class="token function">SendOneConnMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span><span class="token string">"Login"</span><span class="token punctuation">,</span> StatusNoLogin<span class="token punctuation">,</span> <span class="token function">StatusText</span><span class="token punctuation">(</span>StatusNoLogin<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>OperationID<span class="token punctuation">}</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	parms <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Value<span class="token punctuation">{</span>reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>Data<span class="token punctuation">)</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>OperationID<span class="token punctuation">)</span><span class="token punctuation">}</span>
	vf<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token punctuation">(</span>urm<span class="token punctuation">.</span>refName<span class="token punctuation">)</span><span class="token punctuation">[</span>m<span class="token punctuation">.</span>ReqFuncName<span class="token punctuation">]</span>
	<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
		vf<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>parms<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"msgParse"</span><span class="token punctuation">,</span> <span class="token string">"no func "</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>ReqFuncName<span class="token punctuation">)</span>
		<span class="token function">SendOneConnMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span>m<span class="token punctuation">.</span>ReqFuncName<span class="token punctuation">,</span> StatusBadParameter<span class="token punctuation">,</span> <span class="token function">StatusText</span><span class="token punctuation">(</span>StatusBadParameter<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>OperationID<span class="token punctuation">}</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码定义了一个方法 <code v-pre>msgParse</code>，它的主要任务是对传入的JSON消息进行解析，并根据解析出的请求函数名称 (<code v-pre>ReqFuncName</code>) 执行相应的操作。让我们再进行逐行解析。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">msgParse</span><span class="token punctuation">(</span>conn <span class="token operator">*</span>UserConn<span class="token punctuation">,</span> jsonMsg <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这是 <code v-pre>*WServer</code> 的方法，名为 <code v-pre>msgParse</code>。它接收一个 <code v-pre>UserConn</code> 类型的 <code v-pre>conn</code> 和一个字节切片 <code v-pre>jsonMsg</code>（包含JSON消息内容）。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>m := Req{}
if err := json.Unmarshal(jsonMsg, &amp;m); err != nil {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>尝试将 <code v-pre>jsonMsg</code> 反序列化为 <code v-pre>Req</code> 类型的变量 <code v-pre>m</code>。如果出错，向连接发送一个错误消息，并退出函数。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token function">SendOneConnMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span><span class="token string">"error"</span><span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">,</span> <span class="token string">"Unmarshal failed"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">}</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
<span class="token keyword">return</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，有一个延迟执行的函数来捕获可能的 panic：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>defer func() {
	if r := recover(); r != nil {
		...
	}
}()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个常见的Go错误处理模式，用于捕获函数中的任何panic，并对其进行处理。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"msgParse"</span><span class="token punctuation">,</span> <span class="token string">"recv request from web: "</span><span class="token punctuation">,</span> <span class="token string">"reqFuncName "</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>ReqFuncName<span class="token punctuation">,</span> <span class="token string">"data "</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>Data<span class="token punctuation">,</span> <span class="token string">"recv jsonMsg: "</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>jsonMsg<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>记录从Web接收到的请求日志。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> m<span class="token punctuation">.</span>ReqFuncName <span class="token operator">==</span> <span class="token string">"Login"</span> <span class="token punctuation">{</span>
	ws<span class="token punctuation">.</span><span class="token function">DoLogin</span><span class="token punctuation">(</span>m<span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>OperationID<span class="token punctuation">,</span> <span class="token string">"msgParse"</span><span class="token punctuation">,</span> m<span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果请求的函数名称是“Login”，则调用 <code v-pre>DoLogin</code> 方法，并记录日志。</p>
<p>接下来，锁定 <code v-pre>UserRouteRwLock</code>：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>UserRouteRwLock<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">defer</span> UserRouteRwLock<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个读写锁，用于保护可能由多个goroutine并发访问的数据。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>urm, ok := UserRouteMap[m.UserID]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>尝试从 <code v-pre>UserRouteMap</code> 中获取用户的路由信息。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
	<span class="token operator">...</span>
	<span class="token function">SendOneConnMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span><span class="token string">"Login"</span><span class="token punctuation">,</span> StatusNoLogin<span class="token punctuation">,</span> <span class="token function">StatusText</span><span class="token punctuation">(</span>StatusNoLogin<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>OperationID<span class="token punctuation">}</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果用户不在<code v-pre>UserRouteMap</code>中，发送一个需要登录的消息。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>parms <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Value<span class="token punctuation">{</span>reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>Data<span class="token punctuation">)</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>OperationID<span class="token punctuation">)</span><span class="token punctuation">}</span>
vf<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token punctuation">(</span>urm<span class="token punctuation">.</span>refName<span class="token punctuation">)</span><span class="token punctuation">[</span>m<span class="token punctuation">.</span>ReqFuncName<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里使用了Go的 <code v-pre>reflect</code> 包。根据请求的函数名称从用户的路由信息中查找函数。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> ok <span class="token punctuation">{</span>
	vf<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>parms<span class="token punctuation">)</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
	<span class="token operator">...</span>
	<span class="token function">SendOneConnMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span>m<span class="token punctuation">.</span>ReqFuncName<span class="token punctuation">,</span> StatusBadParameter<span class="token punctuation">,</span> <span class="token function">StatusText</span><span class="token punctuation">(</span>StatusBadParameter<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>OperationID<span class="token punctuation">}</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果函数存在，则调用它。否则，发送一个错误消息。</p>
<p>总体来说，这个 <code v-pre>msgParse</code> 方法是一个中心处理点，它基于传入的JSON消息内容决定应执行哪些操作。这个模式允许您在不更改服务器代码的情况下，通过向客户端发送不同的JSON请求来扩展或更改行为。</p>
<p><strong>继续解析 Dologin 代码</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>ws <span class="token operator">*</span>WServer<span class="token punctuation">)</span> <span class="token function">DoLogin</span><span class="token punctuation">(</span>m Req<span class="token punctuation">,</span> conn <span class="token operator">*</span>UserConn<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	UserRouteRwLock<span class="token punctuation">.</span><span class="token function">RLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> UserRouteRwLock<span class="token punctuation">.</span><span class="token function">RUnlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	urm<span class="token punctuation">,</span> ok <span class="token operator">:=</span> UserRouteMap<span class="token punctuation">[</span>m<span class="token punctuation">.</span>UserID<span class="token punctuation">]</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>OperationID<span class="token punctuation">,</span> <span class="token string">"login"</span><span class="token punctuation">,</span> <span class="token string">"user first login: "</span><span class="token punctuation">,</span> m<span class="token punctuation">)</span>
		refR <span class="token operator">:=</span> <span class="token function">GenUserRouterNoLock</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> m<span class="token punctuation">.</span>Batch<span class="token punctuation">,</span> m<span class="token punctuation">.</span>OperationID<span class="token punctuation">)</span>
		params <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Value<span class="token punctuation">{</span>reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>Data<span class="token punctuation">)</span><span class="token punctuation">,</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span>m<span class="token punctuation">.</span>OperationID<span class="token punctuation">)</span><span class="token punctuation">}</span>
		vf<span class="token punctuation">,</span> ok <span class="token operator">:=</span> refR<span class="token punctuation">.</span>refName<span class="token punctuation">[</span>m<span class="token punctuation">.</span>ReqFuncName<span class="token punctuation">]</span>
		<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
			vf<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>params<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"login"</span><span class="token punctuation">,</span> <span class="token string">"no func name: "</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>ReqFuncName<span class="token punctuation">,</span> m<span class="token punctuation">)</span>
			<span class="token function">SendOneConnMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span>m<span class="token punctuation">.</span>ReqFuncName<span class="token punctuation">,</span> StatusBadParameter<span class="token punctuation">,</span> <span class="token function">StatusText</span><span class="token punctuation">(</span>StatusBadParameter<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>OperationID<span class="token punctuation">}</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> urm<span class="token punctuation">.</span>wsRouter<span class="token punctuation">.</span><span class="token function">getMyLoginStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> constant<span class="token punctuation">.</span>LoginSuccess <span class="token punctuation">{</span>
			<span class="token comment">//send ok</span>
			<span class="token function">SendOneConnMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span><span class="token string">"Login"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">"ok"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>OperationID<span class="token punctuation">}</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"login"</span><span class="token punctuation">,</span> <span class="token string">"login status pending, try after 5 second "</span><span class="token punctuation">,</span> urm<span class="token punctuation">.</span>wsRouter<span class="token punctuation">.</span><span class="token function">getMyLoginStatus</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>UserID<span class="token punctuation">)</span>
			<span class="token function">SendOneConnMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span><span class="token string">"Login"</span><span class="token punctuation">,</span> StatusLoginPending<span class="token punctuation">,</span> <span class="token function">StatusText</span><span class="token punctuation">(</span>StatusLoginPending<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>OperationID<span class="token punctuation">}</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>定义 <code v-pre>DoLogin</code> 方法：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (ws *WServer) DoLogin(m Req, conn *UserConn) {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此方法接受两个参数：一个 <code v-pre>Req</code> 类型的 <code v-pre>m</code>（表示请求）和一个 <code v-pre>UserConn</code> 类型的 <code v-pre>conn</code>（表示用户连接）。</p>
<ol>
<li>锁定 <code v-pre>UserRouteRwLock</code>（读锁）：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>UserRouteRwLock.RLock()
defer UserRouteRwLock.RUnlock()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个读写锁，用于保护可能由多个 goroutine 并发访问的 <code v-pre>UserRouteMap</code> 数据。</p>
<ol>
<li>检查用户是否已在 <code v-pre>UserRouteMap</code> 中：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>urm, ok := UserRouteMap[m.UserID]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>尝试从 <code v-pre>UserRouteMap</code> 中获取用户的路由信息。</p>
<ol>
<li>如果用户不在 <code v-pre>UserRouteMap</code> 中，即他们是首次登录：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if !ok {
	log.Info(m.OperationID, "login", "user first login: ", m)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>记录用户首次登录的日志。</p>
<ol>
<li>使用 <code v-pre>GenUserRouterNoLock</code> 函数生成用户的路由信息：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>refR := GenUserRouterNoLock(m.UserID, m.Batch, m.OperationID)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>使用 <code v-pre>reflect</code> 包来调用相应的函数：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>params := []reflect.Value{reflect.ValueOf(m.Data), reflect.ValueOf(m.OperationID)}
vf, ok := refR.refName[m.ReqFuncName]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>基于请求中的函数名称，从用户的路由信息中查找函数。</p>
<ol>
<li>如果函数存在，调用它：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if ok {
	vf.Call(params)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>如果函数不存在，发送一个错误消息：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>else {
	log.Info("", "login", "no func name: ", m.ReqFuncName, m)
	SendOneConnMessage(EventData{m.ReqFuncName, StatusBadParameter, StatusText(StatusBadParameter), "", m.OperationID}, conn)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>如果用户已经在 <code v-pre>UserRouteMap</code> 中，即他们之前已经登录过：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>} else {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>检查用户的登录状态。如果登录成功，则发送一个成功的消息：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if urm.wsRouter.getMyLoginStatus() == constant.LoginSuccess {
	SendOneConnMessage(EventData{"Login", 0, "ok", "", m.OperationID}, conn)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>如果登录状态是待定的，发送一个消息告知用户稍后重试：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>else {
	log.Info("", "login", "login status pending, try after 5 second ", urm.wsRouter.getMyLoginStatus(), m.UserID)
	SendOneConnMessage(EventData{"Login", StatusLoginPending, StatusText(StatusLoginPending), "", m.OperationID}, conn)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总结：这个 <code v-pre>DoLogin</code> 方法处理登录请求，根据用户是否已经登录以及他们的登录状态来执行不同的操作。如果用户是首次登录，会为其生成路由信息并尝试调用相关的函数。如果用户已经登录，会根据其登录状态返回相应的消息。</p>
<p><strong>GenUserRouterNoLock:</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">GenUserRouterNoLock</span><span class="token punctuation">(</span>uid <span class="token builtin">string</span><span class="token punctuation">,</span> batchMsg <span class="token builtin">int</span><span class="token punctuation">,</span> operationID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>RefRouter <span class="token punctuation">{</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> UserRouteMap<span class="token punctuation">[</span>uid<span class="token punctuation">]</span>
	<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	RouteMap1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Value<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> wsRouter1 WsFuncRouter
	wsRouter1<span class="token punctuation">.</span>uId <span class="token operator">=</span> uid

	vf <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>wsRouter1<span class="token punctuation">)</span>
	vft <span class="token operator">:=</span> vf<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	mNum <span class="token operator">:=</span> vf<span class="token punctuation">.</span><span class="token function">NumMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> mNum<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		mName <span class="token operator">:=</span> vft<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>Name
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"index:"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token string">" MethodName:"</span><span class="token punctuation">,</span> mName<span class="token punctuation">)</span>
		RouteMap1<span class="token punctuation">[</span>mName<span class="token punctuation">]</span> <span class="token operator">=</span> vf<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wsRouter1<span class="token punctuation">.</span><span class="token function">InitSDK</span><span class="token punctuation">(</span>ConfigSvr<span class="token punctuation">,</span> operationID<span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"SetAdvancedMsgListener() "</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
	wsRouter1<span class="token punctuation">.</span><span class="token function">SetAdvancedMsgListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> batchMsg <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"SetBatchMsgListener() "</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
		wsRouter1<span class="token punctuation">.</span><span class="token function">SetBatchMsgListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	wsRouter1<span class="token punctuation">.</span><span class="token function">SetConversationListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"SetFriendListener() "</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
	wsRouter1<span class="token punctuation">.</span><span class="token function">SetFriendListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"SetGroupListener() "</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
	wsRouter1<span class="token punctuation">.</span><span class="token function">SetGroupListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"SetUserListener() "</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
	wsRouter1<span class="token punctuation">.</span><span class="token function">SetUserListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"SetSignalingListener() "</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
	wsRouter1<span class="token punctuation">.</span><span class="token function">SetSignalingListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"setWorkMomentsListener()"</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
	wsRouter1<span class="token punctuation">.</span><span class="token function">SetWorkMomentsListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"SetOrganizationListener()"</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
	wsRouter1<span class="token punctuation">.</span><span class="token function">SetOrganizationListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> rr RefRouter
	rr<span class="token punctuation">.</span>refName <span class="token operator">=</span> RouteMap1
	rr<span class="token punctuation">.</span>wsRouter <span class="token operator">=</span> <span class="token operator">&amp;</span>wsRouter1
	UserRouteMap<span class="token punctuation">[</span>uid<span class="token punctuation">]</span> <span class="token operator">=</span> rr
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"insert UserRouteMap: "</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>rr
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码定义了一个名为 <code v-pre>GenUserRouterNoLock</code> 的函数，它的任务是为特定的用户生成路由信息。具体来说，它为用户的WebSocket功能生成了一个路由映射。这里是详细的步骤和代码分析：</p>
<ol>
<li>定义 <code v-pre>GenUserRouterNoLock</code> 函数：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func GenUserRouterNoLock(uid string, batchMsg int, operationID string) *RefRouter {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此函数接收三个参数：<code v-pre>uid</code>（用户ID）、<code v-pre>batchMsg</code>（批处理消息标识符）和<code v-pre>operationID</code>（操作ID）。</p>
<ol>
<li>检查用户是否已经存在于 <code v-pre>UserRouteMap</code> 中：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> UserRouteMap<span class="token punctuation">[</span>uid<span class="token punctuation">]</span>
<span class="token keyword">if</span> ok <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果用户已经存在，则返回 <code v-pre>nil</code>。</p>
<ol>
<li>初始化本地路由映射和WebSocket函数路由器实例：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>RouteMap1 <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Value<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> wsRouter1 WsFuncRouter
wsRouter1<span class="token punctuation">.</span>uId <span class="token operator">=</span> uid
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>使用 <code v-pre>reflect</code> 包获取 <code v-pre>wsRouter1</code> 的所有方法，并将其名称和方法值添加到 <code v-pre>RouteMap1</code> 中：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>vf <span class="token operator">:=</span> reflect<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>wsRouter1<span class="token punctuation">)</span>
vft <span class="token operator">:=</span> vf<span class="token punctuation">.</span><span class="token function">Type</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

mNum <span class="token operator">:=</span> vf<span class="token punctuation">.</span><span class="token function">NumMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> mNum<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
	mName <span class="token operator">:=</span> vft<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">.</span>Name
	log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"index:"</span><span class="token punctuation">,</span> i<span class="token punctuation">,</span> <span class="token string">" MethodName:"</span><span class="token punctuation">,</span> mName<span class="token punctuation">)</span>
	RouteMap1<span class="token punctuation">[</span>mName<span class="token punctuation">]</span> <span class="token operator">=</span> vf<span class="token punctuation">.</span><span class="token function">Method</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>初始化SDK并设置不同的监听器。这些监听器可能用于处理各种WebSocket消息或事件：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>wsRouter1<span class="token punctuation">.</span><span class="token function">InitSDK</span><span class="token punctuation">(</span>ConfigSvr<span class="token punctuation">,</span> operationID<span class="token punctuation">)</span>
<span class="token operator">...</span>
wsRouter1<span class="token punctuation">.</span><span class="token function">SetAdvancedMsgListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">...</span>
wsRouter1<span class="token punctuation">.</span><span class="token function">SetBatchMsgListener</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>为用户创建一个新的 <code v-pre>RefRouter</code> 实例，其中包含了路由映射和WebSocket路由器的引用：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> rr RefRouter
rr<span class="token punctuation">.</span>refName <span class="token operator">=</span> RouteMap1
rr<span class="token punctuation">.</span>wsRouter <span class="token operator">=</span> <span class="token operator">&amp;</span>wsRouter1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>将新的 <code v-pre>RefRouter</code> 实例添加到 <code v-pre>UserRouteMap</code> 中，以用户ID为键：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>UserRouteMap<span class="token punctuation">[</span>uid<span class="token punctuation">]</span> <span class="token operator">=</span> rr
log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"insert UserRouteMap: "</span><span class="token punctuation">,</span> uid<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>最后，返回新创建的 <code v-pre>RefRouter</code> 实例的引用：</li>
</ol>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">return</span> <span class="token operator">&amp;</span>rr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>总体说，此函数的目的是为用户生成一个WebSocket函数的路由信息。如果用户已经有路由信息，函数将返回nil。否则，它将为用户的每个WebSocket功能方法创建一个路由映射，并将其添加到全局的<code v-pre>UserRouteMap</code>中。</p>
</div></template>


