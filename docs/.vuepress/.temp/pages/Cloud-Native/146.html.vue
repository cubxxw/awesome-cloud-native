<template><div><h1 id="openim-jssdk-四-wasm" tabindex="-1"><a class="header-anchor" href="#openim-jssdk-四-wasm" aria-hidden="true">#</a> OpenIM JSSDK (四) Wasm</h1>
<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ tree wasm ws_wrapper
wasm
├── cmd
│   ├── Makefile
│   ├── main.go
│   └── static
│       └── wasm_exec.js
├── event_listener
│   ├── callback_writer.go
│   ├── caller.go
│   └── listener.go
├── exec
│   └── executor.go
├── indexdb
│   ├── black_model.go
│   ├── cache_message.go
│   ├── chat_log_model.go
│   ├── chat_log_reaction_extension_model.go
│   ├── conversation_model.go
│   ├── conversation_unread_message_model.go
│   ├── friend_model.go
│   ├── friend_request_model.go
│   ├── group_member_model.go
│   ├── group_model.go
│   ├── group_request.model.go
│   ├── init.go
│   ├── notification_model.go
│   ├── stranger_model.go
│   ├── super_group_chat_log_model.go
│   ├── super_group_model.go
│   ├── temp_struct
│   │   └── struct.go
│   ├── upload_model.go
│   └── user_model.go
└── wasm_wrapper
    ├── wasm_conversation_msg.go
    ├── wasm_friend.go
    ├── wasm_group.go
    ├── wasm_init_login.go
    ├── wasm_signaling.go
    ├── wasm_third.go
    └── wasm_user.go
ws_wrapper
├── cmd
│   ├── Makefile
│   ├── open_im_sdk_electron.go
│   ├── open_im_sdk_my.go
│   └── open_im_sdk_server.go
├── logs
│   └── sdk.all.2023-10-30
├── test
│   ├── client
│   │   └── client.go
│   ├── cmd
│   │   └── main.go
│   └── simulationClient.go
├── utils
│   ├── platform_number_id_to_name.go
│   └── strings.go
└── ws_local_server
    ├── constant.go
    ├── handle_func.go
    ├── ws_conversation_msg.go
    ├── ws_friend.go
    ├── ws_group.go
    ├── ws_handle.go
    ├── ws_init_login.go
    ├── ws_organization.go
    ├── ws_server.go
    ├── ws_signaling.go
    ├── ws_user.go
    └── ws_work_moments.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码模块解析" tabindex="-1"><a class="header-anchor" href="#代码模块解析" aria-hidden="true">#</a> 代码模块解析</h3>
<h4 id="_1-wasm" tabindex="-1"><a class="header-anchor" href="#_1-wasm" aria-hidden="true">#</a> 1. <strong>wasm</strong></h4>
<p>看起来这是一个WebAssembly (WASM)相关的代码库。WebAssembly是一种为Web设计的新的代码格式，能够以接近于本地速度在浏览器中运行。</p>
<ul>
<li><code v-pre>cmd</code>: 命令行工具或应用程序的主要文件。
<ul>
<li><code v-pre>Makefile</code>: 构建脚本，通常用于编译和打包代码。</li>
<li><code v-pre>main.go</code>: Go应用程序的入口点。</li>
<li><code v-pre>static/wasm_exec.js</code>: WebAssembly的Go运行时所需的JavaScript代码。</li>
</ul>
</li>
<li><code v-pre>event_listener</code>: 监听并处理特定的事件或回调。
<ul>
<li><code v-pre>callback_writer.go</code>, <code v-pre>caller.go</code>, <code v-pre>listener.go</code>: 这些文件可能与事件监听和回调执行相关。</li>
</ul>
</li>
<li><code v-pre>exec</code>: 执行或运行代码的模块。
<ul>
<li><code v-pre>executor.go</code>: 可能用于执行某些操作或函数的代码。</li>
</ul>
</li>
<li><code v-pre>indexdb</code>: 看起来是与IndexedDB相关的模块，IndexedDB是一种在浏览器中存储结构化数据的方式。
<ul>
<li>各种<code v-pre>_model.go</code>文件：定义数据库模型或结构的地方。</li>
<li><code v-pre>init.go</code>: 初始化数据库或模型的地方。</li>
<li><code v-pre>temp_struct/struct.go</code>: 临时的结构或模型定义。</li>
</ul>
</li>
<li><code v-pre>wasm_wrapper</code>: 提供了与WebAssembly交互的方法或函数。
<ul>
<li>各种<code v-pre>wasm_*.go</code>文件：可能为不同的功能提供WASM封装或接口。</li>
</ul>
</li>
</ul>
<h4 id="_2-ws-wrapper" tabindex="-1"><a class="header-anchor" href="#_2-ws-wrapper" aria-hidden="true">#</a> 2. <strong>ws_wrapper</strong></h4>
<p>这似乎是一个WebSocket的封装或库，用于实现实时通信。</p>
<ul>
<li><code v-pre>cmd</code>: 命令行工具或应用程序的主要文件。
<ul>
<li><code v-pre>Makefile</code>: 构建脚本。</li>
<li><code v-pre>open_im_sdk_*.go</code>文件：各种版本的SDK的实现。</li>
</ul>
</li>
<li><code v-pre>logs</code>: 存储日志文件。</li>
<li><code v-pre>test</code>: 包含测试客户端和模拟客户端的测试代码。</li>
<li><code v-pre>utils</code>: 工具或帮助函数。</li>
<li><code v-pre>ws_local_server</code>: WebSocket的本地服务器实现。
<ul>
<li>各种<code v-pre>ws_*.go</code>文件：为不同的功能或模块提供WebSocket实现。</li>
</ul>
</li>
</ul>
<h3 id="学习建议" tabindex="-1"><a class="header-anchor" href="#学习建议" aria-hidden="true">#</a> 学习建议：</h3>
<ol>
<li><strong>了解背景知识</strong>：首先，您需要对WebAssembly, Go, WebSocket, IndexedDB有一定的了解。这将帮助您更好地理解代码的意图。</li>
<li><strong>开始于“main.go”</strong>：通常，<code v-pre>main.go</code>是应用程序的入口点，从这里开始可以帮助您了解代码的执行流程。</li>
<li><strong>深入研究核心模块</strong>：<code v-pre>wasm</code> 和 <code v-pre>ws_wrapper</code> 是两个核心模块。您应该重点关注这两个模块，尤其是与数据交互和通信的部分。</li>
<li><strong>阅读测试代码</strong>：<code v-pre>test</code>目录通常包含了如何使用该库或模块的示例。这可以帮助您了解如何实际使用它。</li>
<li><strong>实践</strong>：尝试运行代码，进行一些基本的操作，如发送WebSocket消息，或使用WASM函数。实践是最好的学习方法。</li>
<li><strong>编写文档和注释</strong>：当您对某个部分的代码有了理解后，尝试编写或完善文档和注释。这不仅可以帮助您巩固所学，还可以为其他开发者提供帮助。</li>
</ol>
<h2 id="执行-wasm" tabindex="-1"><a class="header-anchor" href="#执行-wasm" aria-hidden="true">#</a> 执行 wasm</h2>
<p>运行一个 <code v-pre>.wasm</code> 文件通常需要 WebAssembly 的环境和相应的 JavaScript 调用。下面是一个简单的方法，用于在浏览器中执行您的 <code v-pre>openIM.wasm</code> 文件：</p>
<h3 id="_1-准备-javascript-代码" tabindex="-1"><a class="header-anchor" href="#_1-准备-javascript-代码" aria-hidden="true">#</a> 1. 准备 JavaScript 代码</h3>
<p>确保您有 <code v-pre>wasm_exec.js</code>，这是 Go 提供的用于在 WebAssembly 环境中与 Go 代码交互的 JavaScript 文件。</p>
<p>然后，编写一个简单的 HTML 文件 <code v-pre>index.html</code> 来加载并执行您的 <code v-pre>.wasm</code> 文件：</p>
<div class="language-heml ext-heml line-numbers-mode"><pre v-pre class="language-heml"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;title&gt;OpenIM WASM Demo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;script src=&quot;wasm_exec.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
        async function runWasm() {
            const go = new Go();
            const result = await WebAssembly.instantiateStreaming(fetch(&quot;openIM.wasm.wasm&quot;), go.importObject);
            go.run(result.instance);
        }
        runWasm();
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-运行一个本地服务器" tabindex="-1"><a class="header-anchor" href="#_2-运行一个本地服务器" aria-hidden="true">#</a> 2. 运行一个本地服务器</h3>
<p>由于跨域限制，您通常需要在本地服务器上运行此HTML文件。您可以使用各种工具来快速启动一个本地服务器。例如，使用 Python 的简单HTTP服务器：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>python3 <span class="token parameter variable">-m</span> http.server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者，如果您有安装 Node.js 和 npm，可以使用 <code v-pre>http-server</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> http-server
http-server <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>启动服务器后，打开浏览器并导航到 <code v-pre>http://localhost:8000/</code>（或您选择的其他端口），然后查看 <code v-pre>openIM.wasm</code> 的运行结果。</p>
<h3 id="_3-调试" tabindex="-1"><a class="header-anchor" href="#_3-调试" aria-hidden="true">#</a> 3. 调试</h3>
<p>打开浏览器的开发者工具，查看控制台输出。这有助于您捕获和调试可能遇到的任何错误。</p>
<p><strong>注意</strong>：由于 WebAssembly 的异步加载和执行性质，确保您的 Go 代码能够与此种方式兼容，并且您的 HTML 和 JS 能够正确调用 <code v-pre>.wasm</code> 文件中的函数或方法。</p>
<h2 id="main-代码" tabindex="-1"><a class="header-anchor" href="#main-代码" aria-hidden="true">#</a> main 代码</h2>
<p>继续开始 main 的代码：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">"MAIN"</span><span class="token punctuation">,</span> <span class="token string">"panic info is:"</span><span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>debug<span class="token punctuation">.</span><span class="token function">Stack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"runtime env"</span><span class="token punctuation">,</span> runtime<span class="token punctuation">.</span>GOARCH<span class="token punctuation">,</span> runtime<span class="token punctuation">.</span>GOOS<span class="token punctuation">)</span>
	<span class="token function">registerFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span><span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">registerFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//register global listener function</span>
	globalFuc <span class="token operator">:=</span> wasm_wrapper<span class="token punctuation">.</span><span class="token function">NewWrapperCommon</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>wasm_wrapper<span class="token punctuation">.</span>COMMONEVENTFUNC<span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>globalFuc<span class="token punctuation">.</span>CommonEventFunc<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">//register init login function</span>
	wrapperInitLogin <span class="token operator">:=</span> wasm_wrapper<span class="token punctuation">.</span><span class="token function">NewWrapperInitLogin</span><span class="token punctuation">(</span>globalFuc<span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"initSDK"</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>InitSDK<span class="token punctuation">)</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"login"</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>Login<span class="token punctuation">)</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"logout"</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>Logout<span class="token punctuation">)</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"getLoginStatus"</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>GetLoginStatus<span class="token punctuation">)</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"setAppBackgroundStatus"</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>SetAppBackgroundStatus<span class="token punctuation">)</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"networkStatusChanged"</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>NetworkStatusChanged<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码是用 Go 编写的，并用于与 WebAssembly (Wasm) 进行交互。它基于 OpenIM SDK，旨在提供各种即时消息（IM）功能。以下是代码的简要解释：</p>
<ol>
<li><strong>构建标记</strong>:
<ul>
<li><code v-pre>//go:build js &amp;&amp; wasm</code> 和 <code v-pre>// +build js,wasm</code> 是构建约束，确保此代码仅在 Go 与 JavaScript 和 WebAssembly 目标构建时使用。</li>
</ul>
</li>
<li><strong>引入包</strong>:
<ul>
<li>导入了多个 Go 标准库和 OpenIM SDK 的库。</li>
</ul>
</li>
<li><strong>主函数</strong>:
<ul>
<li><code v-pre>main</code> 函数首先设置了一个 panic 恢复机制，用于捕获和记录任何运行时的恐慌。</li>
<li>打印出当前运行的架构和操作系统。</li>
<li>调用 <code v-pre>registerFunc</code> 来注册各种功能。</li>
<li>最后，使用 <code v-pre>&lt;-make(chan bool)</code> 无限等待，确保主函数不会退出。</li>
</ul>
</li>
<li><strong>注册函数</strong>:
<ul>
<li><code v-pre>registerFunc</code> 函数是此代码的核心，它将各种即时消息（IM）功能与 JavaScript 全局对象进行绑定，使得在浏览器环境中可以通过 JavaScript 调用它们。</li>
<li>使用 <code v-pre>wasm_wrapper</code> 包创建了不同的函数“包装器”实例，如 <code v-pre>NewWrapperCommon</code>, <code v-pre>NewWrapperInitLogin</code>, <code v-pre>NewWrapperConMsg</code> 等。</li>
<li>对于每个包装器，都将其方法注册为 JavaScript 可调用的函数。例如，<code v-pre>js.Global().Set(&quot;initSDK&quot;, js.FuncOf(wrapperInitLogin.InitSDK))</code> 会将 <code v-pre>initSDK</code> 函数添加到全局 JavaScript 对象，允许 JS 调用该功能。</li>
</ul>
</li>
<li><strong>功能注册</strong>:
<ul>
<li>代码中注册了大量的功能，如登录、消息创建、消息发送、获取会话列表、处理群组、用户、好友等。</li>
</ul>
</li>
</ol>
<p>由于代码过长，我无法解释每个函数的详细内容，但大体上，它涵盖了 IM SDK 提供的大部分功能，并允许在浏览器环境中使用 WebAssembly 调用这些功能。</p>
<h3 id="结构体-wrappercommon" tabindex="-1"><a class="header-anchor" href="#结构体-wrappercommon" aria-hidden="true">#</a> 结构体：WrapperCommon</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>type WrapperCommon struct {
	commonFunc *js.Value
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><code v-pre>type WrapperCommon struct {...}</code>: 定义了一个名为<code v-pre>WrapperCommon</code>的结构体。</li>
<li><code v-pre>commonFunc *js.Value</code>: 在这个结构体内，有一个名为<code v-pre>commonFunc</code>的字段，它的类型是一个指向<code v-pre>js.Value</code>的指针。这里，<code v-pre>js.Value</code>很可能来自于Go的WebAssembly绑定包，通常用于与JavaScript代码互操作。</li>
</ol>
<h3 id="函数-newwrappercommon" tabindex="-1"><a class="header-anchor" href="#函数-newwrappercommon" aria-hidden="true">#</a> 函数：NewWrapperCommon</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func NewWrapperCommon() *WrapperCommon {
	return &amp;WrapperCommon{}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><code v-pre>func NewWrapperCommon() *WrapperCommon</code>: 定义了一个名为<code v-pre>NewWrapperCommon</code>的函数，这个函数没有接受任何参数并返回一个指向<code v-pre>WrapperCommon</code>类型的指针。</li>
<li><code v-pre>return &amp;WrapperCommon{}</code>: 这里，函数创建了一个新的<code v-pre>WrapperCommon</code>实例，并返回了该实例的指针。这是一个常见的做法，称为工厂方法或构造函数，用于创建和初始化一个新的对象实例。</li>
</ol>
<p>这段代码简单的展示了如何定义一个结构体和如何为该结构体提供一个构造函数。但从这段代码中，我们还看不出<code v-pre>WrapperCommon</code>的实际用途，以及<code v-pre>commonFunc</code>字段的具体用法。要完全理解这部分代码，可能需要更多上下文或相关代码。</p>
<h2 id="继续-listener-代码解释" tabindex="-1"><a class="header-anchor" href="#继续-listener-代码解释" aria-hidden="true">#</a> 继续 listener 代码解释</h2>
<p>这段代码定义了一个<code v-pre>ConnCallback</code>结构体和一系列相关的方法。我们从头开始逐一解释。</p>
<h3 id="结构体定义" tabindex="-1"><a class="header-anchor" href="#结构体定义" aria-hidden="true">#</a> 结构体定义</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>type ConnCallback struct {
	uid string
	CallbackWriter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里定义了一个叫<code v-pre>ConnCallback</code>的结构体。它有两个成员变量：<code v-pre>uid</code>（字符串类型）和一个匿名的<code v-pre>CallbackWriter</code>成员（这意味着<code v-pre>ConnCallback</code>继承了<code v-pre>CallbackWriter</code>的所有字段和方法）。</p>
<h3 id="构造函数" tabindex="-1"><a class="header-anchor" href="#构造函数" aria-hidden="true">#</a> 构造函数</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func NewConnCallback(funcName string, callback *js.Value) *ConnCallback {
	return &amp;ConnCallback{CallbackWriter: NewEventData(callback).SetEvent(funcName)}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数是<code v-pre>ConnCallback</code>的构造函数，用于创建<code v-pre>ConnCallback</code>的新实例。它接收一个函数名<code v-pre>funcName</code>和一个<code v-pre>callback</code>（可能是一个JavaScript的回调函数），然后它初始化<code v-pre>CallbackWriter</code>字段并返回新的<code v-pre>ConnCallback</code>实例。</p>
<h3 id="方法定义" tabindex="-1"><a class="header-anchor" href="#方法定义" aria-hidden="true">#</a> 方法定义</h3>
<p>以下是<code v-pre>ConnCallback</code>的方法，这些方法通常会在不同的连接状态下被调用，如成功连接、连接失败等。</p>
<ol>
<li><strong>OnConnecting()</strong>：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (i *ConnCallback) OnConnecting() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当开始连接时，此方法会被调用。它使用<code v-pre>utils.GetSelfFuncName()</code>来获取当前函数的名称，并设置为事件名，然后发送消息。</p>
<ol>
<li><strong>OnConnectSuccess()</strong>：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (i *ConnCallback) OnConnectSuccess() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当连接成功时，此方法会被调用。同样的，它也设置当前函数的名称为事件名并发送消息。</p>
<ol>
<li><strong>OnConnectFailed(errCode int32, errMsg string)</strong>：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (i *ConnCallback) OnConnectFailed(errCode int32, errMsg string) {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetErrCode(errCode).SetErrMsg(errMsg).SendMessage()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当连接失败时，此方法会被调用。除了设置事件名，它还设置错误码和错误消息，然后发送。</p>
<ol>
<li><strong>OnKickedOffline()</strong> 和 <strong>OnUserTokenExpired()</strong>： 这两个方法与前面的方法类似，它们在特定的事件发生时被调用，并设置对应的事件名发送消息。</li>
<li><strong>OnSelfInfoUpdated(userInfo string)</strong>：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (i *ConnCallback) OnSelfInfoUpdated(userInfo string) {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(userInfo).SendMessage()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当用户信息更新时，此方法被调用。它设置事件名，并将更新的用户信息作为数据发送。</p>
<p><strong>继续：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>你好，我正在学习这块的逻辑，请详细帮我解析代码的设计，功能，以及作用：
```
type OnConnListener interface {
	OnConnecting()
	OnConnectSuccess()
	OnConnectFailed(errCode int32, errMsg string)
	OnKickedOffline()
	OnUserTokenExpired()
}

下面是 ws_wrapper/ws_local_server/ws_init_login.go
func (i *InitCallback) OnConnectFailed(ErrCode int32, ErrMsg string) {
	var ed EventData
	ed.Event = cleanUpfuncName(runFuncName())
	ed.ErrCode = ErrCode
	ed.ErrMsg = ErrMsg
	SendOneUserMessage(ed, i.uid)
}

下面是 wasm/event_listener/listener.go
func (i *ConnCallback) OnConnectFailed(errCode int32, errMsg string) {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetErrCode(errCode).SetErrMsg(errMsg).SendMessage()
}
type EventData struct {
	Event       string `json:"event"`
	ErrCode     int32  `json:"errCode"`
	ErrMsg      string `json:"errMsg"`
	Data        string `json:"data"`
	OperationID string `json:"operationID"`
}
func cleanUpfuncName(funcName string) string {
	end := strings.LastIndex(funcName, ".")
	if end == -1 {
		log.Info("", "funcName not include.", funcName)
		return ""
	}
	return funcName[end+1:]
}
func SendOneUserMessage(data interface{}, uid string) {
	var chMsg ChanMsg
	chMsg.data, _ = json.Marshal(data)
	chMsg.uid = uid
	err := send2Ch(WS.ch, &amp;chMsg, 2)
	if err != nil {
		log.Info("", "send2ch failed, ", err, string(chMsg.data), uid)
		return
	}
	log.Info("", "send response to web: ", string(chMsg.data))
}
func send2Ch(ch chan ChanMsg, value *ChanMsg, timeout int64) error {
	var flag = 0
	select {
	case ch &lt;- *value:
		flag = 1
	case &lt;-time.After(time.Second * time.Duration(timeout)):
		flag = 2
	}
	if flag == 1 {
		return nil
	} else {
		log.Info("", "send cmd timeout, ", timeout, value)
		return errors.New("send cmd timeout")
	}
}


```
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你提供的代码是用Go语言编写的，涉及到WebSocket连接事件监听和处理的逻辑。我将逐一解释每个部分的设计、功能和作用。</p>
<p>首先，定义了一个名为 <code v-pre>OnConnListener</code> 的接口，包含几个方法：</p>
<ul>
<li><code v-pre>OnConnecting()</code>：当WebSocket开始连接时调用。</li>
<li><code v-pre>OnConnectSuccess()</code>：当WebSocket成功连接时调用。</li>
<li><code v-pre>OnConnectFailed(errCode int32, errMsg string)</code>：当WebSocket连接失败时调用，传递错误代码和消息。</li>
<li><code v-pre>OnKickedOffline()</code>：当用户被踢下线时调用。</li>
<li><code v-pre>OnUserTokenExpired()</code>：当用户的token过期时调用。</li>
</ul>
<p>这个接口定义了WebSocket连接生命周期中可能发生的事件。任何实现这个接口的类型都必须实现这些方法。</p>
<p>接下来，我们看到 <code v-pre>InitCallback</code> 和 <code v-pre>ConnCallback</code> 类型分别实现了 <code v-pre>OnConnListener</code> 接口中的 <code v-pre>OnConnectFailed</code> 方法。不同的实现说明了在不同的上下文中处理连接失败事件的多样性：</p>
<ul>
<li><code v-pre>InitCallback</code> 会构建一个 <code v-pre>EventData</code> 结构体，设置相应的事件名称、错误代码和错误消息，然后通过 <code v-pre>SendOneUserMessage</code> 发送给特定的用户。</li>
<li><code v-pre>ConnCallback</code> 则是通过一系列链式调用设置事件名称、错误代码和错误消息，并通过 <code v-pre>SendMessage()</code> 方法来发送这些信息。</li>
</ul>
<p>这显示了不同对象可能会以不同的方式处理相同的事件。</p>
<p><code v-pre>EventData</code> 结构体用于封装发送的事件数据，包含事件名、错误代码、错误消息、数据和操作ID。它是一个简单的数据容器。</p>
<p><code v-pre>cleanUpfuncName</code> 函数用于处理函数名字符串，它找到最后一个点号（<code v-pre>.</code>）并截取它之后的字符串作为事件名。如果没有找到点号，则记录一条信息日志，并返回空字符串。</p>
<p><code v-pre>SendOneUserMessage</code> 函数用于将 <code v-pre>EventData</code> 结构体序列化为JSON格式，并通过WebSocket通道发送给指定用户。如果发送过程中出现错误，会记录日志信息。</p>
<p><code v-pre>send2Ch</code> 函数是一个辅助函数，它负责将消息发送到一个Go通道，如果在指定的超时时间内发送失败，则记录错误并返回一个超时错误。</p>
<p>在这段代码中，事件监听和消息发送是异步的，使用了Go的并发特性（通过goroutines和channels）。这种设计模式可以高效地处理并发事件和消息传递，适用于高并发的网络服务，例如WebSocket服务器。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>你现在是一个优秀的程序员工程师，可能编写优雅的代码以及清晰的注释

我现在希望你基于 现有的 wasm 的函数编写新的函数，我会给你一个案例，然后你来根据我给你的案例去模拟写一个高质量的代码和注释

首先，我要告诉你的是结构体：
<span class="token string">``</span><span class="token string">`go
type EventData struct {
	Event       string `</span>json<span class="token punctuation">:</span><span class="token string">"event"</span><span class="token string">`
	ErrCode     int32  `</span>json<span class="token punctuation">:</span><span class="token string">"errCode"</span><span class="token string">`
	ErrMsg      string `</span>json<span class="token punctuation">:</span><span class="token string">"errMsg"</span><span class="token string">`
	Data        string `</span>json<span class="token punctuation">:</span><span class="token string">"data"</span><span class="token string">`
	OperationID string `</span>json<span class="token punctuation">:</span><span class="token string">"operationID"</span><span class="token string">`
}
`</span><span class="token string">``</span>

我参考 wasm 模块的代码：
<span class="token string">``</span><span class="token string">`go
type ConnCallback struct {
	uid string
	CallbackWriter
}

func NewConnCallback(funcName string, callback *js.Value) *ConnCallback {
	return &amp;ConnCallback{CallbackWriter: NewEventData(callback).SetEvent(funcName)}
}

func (i *ConnCallback) OnConnecting() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()
}

func (i *ConnCallback) OnConnectSuccess() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()

}
func (i *ConnCallback) OnConnectFailed(errCode int32, errMsg string) {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetErrCode(errCode).SetErrMsg(errMsg).SendMessage()
}

func (i *ConnCallback) OnKickedOffline() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()
}

func (i *ConnCallback) OnUserTokenExpired() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()
}

func (i *ConnCallback) OnSelfInfoUpdated(userInfo string) {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(userInfo).SendMessage()
}
`</span><span class="token string">``</span>

然后重构后的代码如下：

ws listener 中的函数：

<span class="token string">``</span><span class="token string">`go
type ConnCallback struct {
	respMessage *RespMessage
}

func NewConnCallback(respMessage *RespMessage) *ConnCallback {
	return &amp;ConnCallback{respMessage: respMessage}
}

func (c ConnCallback) OnConnecting() {
	c.respMessage.sendEventSuccessRespNoData(getSelfFuncName())
}

func (c ConnCallback) OnConnectSuccess() {
	c.respMessage.sendEventSuccessRespNoData(getSelfFuncName())
}

func (c ConnCallback) OnConnectFailed(errCode int32, errMsg string) {
	c.respMessage.sendEventFailedRespNoData(getSelfFuncName(), errCode, errMsg)
}

func (c ConnCallback) OnKickedOffline() {
	c.respMessage.sendEventSuccessRespNoData(getSelfFuncName())
}

func (c ConnCallback) OnUserTokenExpired() {
	c.respMessage.sendEventSuccessRespNoData(getSelfFuncName())
}
`</span><span class="token string">``</span>

以及 reponder 函数：

<span class="token string">``</span><span class="token string">`
func (r *RespMessage) sendEventSuccessRespNoData(event string) {
	r.respMessagesChan &lt;- &amp;EventData{
		Event: event,
	}
}

func (r *RespMessage) sendEventSuccessRespWithData(event string, data string) {
	r.respMessagesChan &lt;- &amp;EventData{
		Event: event,
		Data:  data,
	}
}

func (r *RespMessage) sendEventFailedRespNoData(event string, errCode int32, errMsg string) {
	r.respMessagesChan &lt;- &amp;EventData{
		Event:   event,
		ErrCode: errCode,
		ErrMsg:  errMsg,
	}
}

func (r *RespMessage) sendEventFailedREspNoErr(event string) {
	r.respMessagesChan &lt;- &amp;EventData{
		Event: event,
	}
}
`</span><span class="token string">``</span>

我现在想让你，根据下面的重构前的代码如下：
<span class="token string">``</span><span class="token string">`go

type GroupCallback struct {
	CallbackWriter
}

func NewGroupCallback(callback *js.Value) *GroupCallback {
	return &amp;GroupCallback{CallbackWriter: NewEventData(callback)}
}

func (f *GroupCallback) OnJoinedGroupAdded(groupInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupInfo).SendMessage()
}
func (f *GroupCallback) OnJoinedGroupDeleted(groupInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupInfo).SendMessage()
}
func (f *GroupCallback) OnGroupMemberAdded(groupMemberInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupMemberInfo).SendMessage()
}
func (f *GroupCallback) OnGroupMemberDeleted(groupMemberInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupMemberInfo).SendMessage()
}
func (f *GroupCallback) OnGroupApplicationAdded(groupApplication string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupApplication).SendMessage()
}
func (f *GroupCallback) OnGroupApplicationDeleted(groupApplication string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupApplication).SendMessage()
}
func (f *GroupCallback) OnGroupInfoChanged(groupInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupInfo).SendMessage()
}
func (f *GroupCallback) OnGroupMemberInfoChanged(groupMemberInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupMemberInfo).SendMessage()
}
func (f *GroupCallback) OnGroupApplicationAccepted(groupApplication string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupApplication).SendMessage()
}
func (f *GroupCallback) OnGroupApplicationRejected(groupApplication string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupApplication).SendMessage()
}
func (f *GroupCallback) OnGroupDismissed(groupInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupInfo).SendMessage()
}
`</span><span class="token string">``</span>

请你基于上面重构前的代码模仿写出重构后的代码 ws listener 中的函数，以及必要的 以及 reponder 中不存在的函数（如果存在的不用写），以及必要的专业的函数注释，请直接给出代码：
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


