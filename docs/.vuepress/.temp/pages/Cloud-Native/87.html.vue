<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第87节-openim-wasm-任务" tabindex="-1"><a class="header-anchor" href="#第87节-openim-wasm-任务" aria-hidden="true">#</a> 第87节 OpenIM wasm 任务</h1>
<div><a href = '86.md' style='float:left'>⬆️上一节🔗  </a><a href = '88.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<p><strong>前提知识：</strong></p>
<ol>
<li>Golang 的基本语法和常用库的使用；</li>
<li>WebAssembly 的基本概念和使用方法；</li>
<li>索引数据库的基本原理和使用方法。</li>
</ol>
<h2 id="wasm-学习" tabindex="-1"><a class="header-anchor" href="#wasm-学习" aria-hidden="true">#</a> wasm 学习</h2>
<p>一般提到 WebAssembly 技术我们最先想到的是最近比较火的 rust 语言，其实 WebAssembly 是一种二进制的编码格式，其他语言可以通过编译器支持，而写出能够在浏览器前端运行的代码。</p>
<p>💡 <strong>介绍：</strong></p>
<p>WebAssembly是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如C / C ++等语言提供一个编译目标，以便它们可以在Web上运行。它也被设计为可以与JavaScript共存，允许两者一起工作。 —— <a href="https://developer.mozilla.org/zh-CN/docs/WebAssembly" target="_blank" rel="noopener noreferrer">MDN web docs - mozilla.org<ExternalLinkIcon/></a></p>
<p><strong>我们来谈谈 Go 语言：</strong></p>
<p>Go 语言在 1.11 版本(2018年8月) 加入了对 WebAssembly (Wasm) 的原生支持，使用 Go 语言开发 <code v-pre>WebAssembly</code> 相关的应用变得更加地简单。Go 语言的内建支持是 Go 语言进军前端的一个重要的里程碑。在这之前，如果想使用 Go 语言开发前端，需要使用 <a href="https://github.com/gopherjs/gopherjs" target="_blank" rel="noopener noreferrer">GopherJS<ExternalLinkIcon/></a>，GopherJS 是一个编译器，可以将 Go 语言转换成可以在浏览器中运行的 JavaScript 代码。新版本的 Go 则直接将 Go 代码编译为 wasm 二进制文件，而不再需要转为 JavaScript 代码。更巧的是，实现 GopherJS 和在 Go 语言中内建支持 WebAssembly 的是同一拨人。</p>
<p><strong>最开始，hello world:</strong></p>
<p>第一步，新建文件 <code v-pre>main.go</code>，使用 <code v-pre>js.Global().get('alert')</code> 获取全局的 alert 对象，通过 Invoke 方法调用。等价于在 js 中调用 <code v-pre>window.alert(&quot;Hello World&quot;)</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>// main.go
package main

<span class="token function">import</span> <span class="token string">"syscall/js"</span>

func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	alert :<span class="token operator">=</span> js.Global<span class="token punctuation">(</span><span class="token punctuation">)</span>.Get<span class="token punctuation">(</span><span class="token string">"alert"</span><span class="token punctuation">)</span>
	alert.Invoke<span class="token punctuation">(</span><span class="token string">"Hello World!"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二步，将 main.go 编译为 <code v-pre>static/main.wasm</code></p>
<blockquote>
<p>如果启用了 <code v-pre>GO MODULES</code>，则需要使用 <code v-pre>go mod init</code> 初始化模块，或设置 <code v-pre>GO111MODULE=auto</code>。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">GOOS</span><span class="token operator">=</span>js <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>wasm go build <span class="token parameter variable">-o</span> static/main.wasm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第三步，拷贝 <code v-pre>wasm_exec.js</code> (JavaScript 支持文件，加载 wasm 文件时需要) 到 static 文件夹</p>
<p>第三步，拷贝 wasm_exec.js (JavaScript 支持文件，加载 wasm 文件时需要) 到 static 文件夹</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cp</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span>go <span class="token function">env</span> GOROOT<span class="token variable">)</span></span>/misc/wasm/wasm_exec.js"</span> static
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第四步，创建 index.html，引用 <code v-pre>static/main.wasm</code> 和 <code v-pre>static/wasm_exec.js</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token operator">&lt;</span>html<span class="token operator">></span>
<span class="token operator">&lt;</span>script <span class="token assign-left variable">src</span><span class="token operator">=</span><span class="token string">"static/wasm_exec.js"</span><span class="token operator">></span><span class="token operator">&lt;</span>/script<span class="token operator">></span>
<span class="token operator">&lt;</span>script<span class="token operator">></span>
	const go <span class="token operator">=</span> new Go<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	WebAssembly.instantiateStreaming<span class="token punctuation">(</span>fetch<span class="token punctuation">(</span><span class="token string">"static/main.wasm"</span><span class="token punctuation">)</span>, go.importObject<span class="token punctuation">)</span>
		.then<span class="token variable"><span class="token punctuation">((</span>result<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> go.run<span class="token punctuation">(</span>result.instance<span class="token punctuation">))</span></span><span class="token punctuation">;</span>
<span class="token operator">&lt;</span>/script<span class="token operator">></span>

<span class="token operator">&lt;</span>/html<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第五步，使用 goexec 启动 Web 服务</p>
<blockquote>
<p>如果没有安装 goexec，可用 <code v-pre>go get -u github.com/shurcooL/goexec</code> 安装，需要将 <code v-pre>$GOBIN</code> 或 <code v-pre>$GOPATH/bin</code> 加入环境变量</p>
</blockquote>
<p>当前的目录结构如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># tree</span>
<span class="token builtin class-name">.</span>
├── go.mod
├── index.html
├── main.go
└── static
    ├── main.wasm
    └── wasm_exec.js
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器访问 <code v-pre>localhost:9999</code>，则会有一个弹出窗口，上面写着 <code v-pre>*Hello World!*</code></p>
<p>为了避免每次编译都需要输入繁琐的命令，可将这个过程写在 <code v-pre>Makefile</code> 中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>all: static/main.wasm static/wasm_exec.js
	goexec <span class="token string">'http.ListenAndServe(`:9999`, http.FileServer(http.Dir(`.`)))'</span>

static/wasm_exec.js:
	<span class="token function">cp</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span>shell go <span class="token function">env</span> GOROOT<span class="token variable">)</span></span>/misc/wasm/wasm_exec.js"</span> static

static/main.wasm <span class="token builtin class-name">:</span> main.go
	<span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>auto <span class="token assign-left variable">GOOS</span><span class="token operator">=</span>js <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span>wasm go build <span class="token parameter variable">-o</span> static/main.wasm <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样一个敲一下 make 就够了，代码已经上传到 <a href="https://github.com/geektutu/7days-golang/tree/master/demo-wasm" target="_blank" rel="noopener noreferrer">7days-golang - github.com<ExternalLinkIcon/></a>。</p>
<h3 id="注册函数-register-functions" tabindex="-1"><a class="header-anchor" href="#注册函数-register-functions" aria-hidden="true">#</a> 注册函数(Register Functions)</h3>
<p>在 Go 语言中调用 JavaScript 函数是一方面，另一方面，如果仅仅是使用 WebAssembly 替代性能要求高的模块，那么就需要注册函数，以便其他 JavaScript 代码调用。</p>
<p>假设我们需要注册一个计算斐波那契数列的函数，可以这么实现。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>// main.go
package main

<span class="token function">import</span> <span class="token string">"syscall/js"</span>

func fib<span class="token punctuation">(</span>i int<span class="token punctuation">)</span> int <span class="token punctuation">{</span>
	<span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> i <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> <span class="token number">1</span>
	<span class="token punctuation">}</span>
	<span class="token builtin class-name">return</span> fib<span class="token punctuation">(</span>i-1<span class="token punctuation">)</span> + fib<span class="token punctuation">(</span>i-2<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

func fibFunc<span class="token punctuation">(</span>this js.Value, args <span class="token punctuation">[</span><span class="token punctuation">]</span>js.Value<span class="token punctuation">)</span> interface<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">return</span> js.ValueOf<span class="token punctuation">(</span>fib<span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>.Int<span class="token punctuation">(</span><span class="token punctuation">))</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">done</span> :<span class="token operator">=</span> make<span class="token punctuation">(</span>chan int, <span class="token number">0</span><span class="token punctuation">)</span>
	js.Global<span class="token punctuation">(</span><span class="token punctuation">)</span>.Set<span class="token punctuation">(</span><span class="token string">"fibFunc"</span>, js.FuncOf<span class="token punctuation">(</span>fibFunc<span class="token punctuation">))</span>
	<span class="token operator">&lt;</span>-done
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>fib 是一个普通的 Go 函数，通过递归计算第 i 个斐波那契数，接收一个 int 入参，返回值也是 int。</li>
<li>定义了 <code v-pre>fibFunc</code> 函数，为 fib 函数套了一个壳，从 <code v-pre>args[0]</code> 获取入参，计算结果用 <code v-pre>js.ValueOf</code> 包装，并返回。</li>
<li>使用 <code v-pre>js.Global().Set()</code> 方法，将注册函数 fibFunc 到全局，以便在浏览器中能够调用。</li>
</ul>
<p><code v-pre>js.Value</code> 可以将 Js 的值转换为 Go 的值，比如 <code v-pre>args[0].Int()</code>，则是转换为 Go 语言中的整型。<code v-pre>js.ValueOf</code>，则用来将 Go 的值，转换为 Js 的值。另外，注册函数的时候，使用 <code v-pre>js.FuncOf</code> 将函数转换为 <code v-pre>Func</code> 类型(<code v-pre>js.FuncOf()</code>方法则将Go语言中的<code v-pre>fibFunc</code>函数转换为JavaScript中的函数对象，以便在JavaScript中调用。)，只有 <code v-pre>Func</code> 类型的函数，才能在 <code v-pre>JavaScript</code> 中调用。可以认为这是 Go 与 <code v-pre>JavaScript</code> 之间的 <code v-pre>接口/约定</code>。</p>
<p><code v-pre>js.Func()</code> 接受一个函数类型作为其参数，该函数的定义必须是：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span><span class="token punctuation">(</span>this Value<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span>Value<span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token comment">// this 即 JavaScript 中的 this</span>
<span class="token comment">// args 是在 JavaScript 中调用该函数的参数列表。</span>
<span class="token comment">// 返回值需用 js.ValueOf 映射成 JavaScript 的值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 main 函数中，创建了信道(chan) done，阻塞主协程(goroutine)。fibFunc 如果在 JavaScript 中被调用，会开启一个新的子协程执行。</p>
<p>💡 注意这个管道，因为最开始设置的是 0，所以是一个非缓冲的管道，非缓冲的管道只能在发送和接收操作都准备好时才能进行通信。通过<code v-pre>&lt;-done</code>语句，主goroutine会一直阻塞，直到从<code v-pre>done</code>通道中接收到一个值为止。这个语句的作用是等待其他goroutine的执行完成，以保证程序不会在主goroutine退出之前终止。</p>
<p>接下来，修改之前的 <code v-pre>index.html</code>，在其中添加一个输入框(num)，一个按钮(btn) 和一个文本框(ans，用来显示计算结果)，并给按钮添加了一个点击事件，调用 fibFunc，并将计算结果显示在文本框(ans)中。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token operator">&lt;</span>html<span class="token operator">></span>
<span class="token operator">...</span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
	<span class="token operator">&lt;</span>input id<span class="token operator">=</span><span class="token string">"num"</span> <span class="token keyword">type</span><span class="token operator">=</span><span class="token string">"number"</span> <span class="token operator">/</span><span class="token operator">></span>
	<span class="token operator">&lt;</span>button id<span class="token operator">=</span><span class="token string">"btn"</span> onclick<span class="token operator">=</span><span class="token string">"ans.innerHTML=fibFunc(num.value * 1)"</span><span class="token operator">></span>Click<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
	<span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">"ans"</span><span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="操作-dom" tabindex="-1"><a class="header-anchor" href="#操作-dom" aria-hidden="true">#</a> 操作 DOM</h3>
<p>在上一个例子中，仅仅是注册了全局函数 fibFunc，事件注册，调用，对 DOM 元素的操作都是在 HTML 中通过原生的 JavaScript 函数实现的。这些事情，能不能全部在 Go 语言中完成呢？答案可以。</p>
<p>首先修改 <code v-pre>index.html</code>，删除事件注册部分和 对 DOM 元素的操作部分。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token operator">&lt;</span>html<span class="token operator">></span>
<span class="token operator">...</span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
	<span class="token operator">&lt;</span>input id<span class="token operator">=</span><span class="token string">"num"</span> <span class="token keyword">type</span><span class="token operator">=</span><span class="token string">"number"</span> <span class="token operator">/</span><span class="token operator">></span>
	<span class="token operator">&lt;</span>button id<span class="token operator">=</span><span class="token string">"btn"</span><span class="token operator">></span>Click<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
	<span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">"ans"</span><span class="token operator">></span><span class="token number">1</span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修改 main.go：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"strconv"</span>
	<span class="token string">"syscall/js"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">fib</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> i <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">1</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token function">fib</span><span class="token punctuation">(</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">fib</span><span class="token punctuation">(</span>i<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	document <span class="token operator">=</span> js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"document"</span><span class="token punctuation">)</span>
	numEle   <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token string">"getElementById"</span><span class="token punctuation">,</span> <span class="token string">"num"</span><span class="token punctuation">)</span>
	ansEle   <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token string">"getElementById"</span><span class="token punctuation">,</span> <span class="token string">"ans"</span><span class="token punctuation">)</span>
	btnEle   <span class="token operator">=</span> js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"btn"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">fibFunc</span><span class="token punctuation">(</span>this js<span class="token punctuation">.</span>Value<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span>js<span class="token punctuation">.</span>Value<span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	v <span class="token operator">:=</span> numEle<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"value"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> num<span class="token punctuation">,</span> err <span class="token operator">:=</span> strconv<span class="token punctuation">.</span><span class="token function">Atoi</span><span class="token punctuation">(</span>v<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		ansEle<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"innerHTML"</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">ValueOf</span><span class="token punctuation">(</span><span class="token function">fib</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	done <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	btnEle<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span><span class="token string">"addEventListener"</span><span class="token punctuation">,</span> <span class="token string">"click"</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>fibFunc<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span>done
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>通过 <code v-pre>js.Global().Get(&quot;btn&quot;)</code> 或 <code v-pre>document.Call(&quot;getElementById&quot;, &quot;num&quot;)</code> 两种方式获取到 DOM 元素。</li>
<li>btnEle 调用 <code v-pre>addEventListener</code> 为 btn 绑定点击事件 fibFunc。</li>
<li>在 fibFunc 中使用 <code v-pre>numEle.Get(&quot;value&quot;)</code> 获取到 numEle 的值（字符串），转为整型并调用 fib 计算出结果。</li>
<li>ansEle 调用 <code v-pre>Set(&quot;innerHTML&quot;, ...)</code> 渲染计算结果。</li>
</ul>
<p>重新编译 main.go，访问 <code v-pre>localhost:9999</code>，效果与之前是一致的。</p>
<h2 id="回调函数-callback-functions" tabindex="-1"><a class="header-anchor" href="#回调函数-callback-functions" aria-hidden="true">#</a> <strong>回调函数(Callback Functions)</strong></h2>
<p>在 JavaScript 中，异步+回调是非常常见的，比如请求一个 Restful API，注册一个回调函数，待数据获取到，再执行回调函数的逻辑，这个期间程序可以继续做其他的事情。Go 语言可以通过协程实现异步。</p>
<p>假设 fib 的计算非常耗时，那么可以启动注册一个回调函数，待 fib 计算完成后，再把计算结果显示出来。</p>
<p>我们先修改 <code v-pre>main.go</code>，使得 <code v-pre>fibFunc</code> 支持传入回调函数。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"syscall/js"</span>
	<span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">fib</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">||</span> i <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">1</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token function">fib</span><span class="token punctuation">(</span>i<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">fib</span><span class="token punctuation">(</span>i<span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">fibFunc</span><span class="token punctuation">(</span>this js<span class="token punctuation">.</span>Value<span class="token punctuation">,</span> args <span class="token punctuation">[</span><span class="token punctuation">]</span>js<span class="token punctuation">.</span>Value<span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
	callback <span class="token operator">:=</span> args<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>args<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
		v <span class="token operator">:=</span> <span class="token function">fib</span><span class="token punctuation">(</span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">Int</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		callback<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token string">"ans"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"innerHTML"</span><span class="token punctuation">,</span> <span class="token string">"Waiting 3s..."</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	done <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"fibFunc"</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>fibFunc<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span>done
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>假设调用 fibFunc 时，回调函数作为最后一个参数，那么通过 args[len(args)-1] 便可以获取到该函数。这与其他类型参数的传递并无区别。</li>
<li>使用 <code v-pre>go func()</code> 启动子协程，调用 fib 计算结果，计算结束后，调用回调函数 <code v-pre>callback</code>，并将计算结果传递给回调函数，使用 time.Sleep() 模拟 3s 的耗时操作。</li>
<li>计算结果出来前，先在界面上显示 <code v-pre>Waiting 3s...</code></li>
</ul>
<p>接下来我们修改 index.html，为按钮添加点击事件，调用 fibFunc</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token operator">&lt;</span>html<span class="token operator">></span>
<span class="token operator">...</span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
	<span class="token operator">&lt;</span>input id<span class="token operator">=</span><span class="token string">"num"</span> <span class="token keyword">type</span><span class="token operator">=</span><span class="token string">"number"</span> <span class="token operator">/</span><span class="token operator">></span>
	<span class="token operator">&lt;</span>button id<span class="token operator">=</span><span class="token string">"btn"</span> onclick<span class="token operator">=</span><span class="token string">"fibFunc(num.value * 1, (v)=> ans.innerHTML=v)"</span><span class="token operator">></span>Click<span class="token operator">&lt;</span><span class="token operator">/</span>button<span class="token operator">></span>
	<span class="token operator">&lt;</span>p id<span class="token operator">=</span><span class="token string">"ans"</span><span class="token operator">></span><span class="token operator">&lt;</span><span class="token operator">/</span>p<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>为 btn 注册了点击事件，第一个参数是待计算的数字，从 num 输入框获取。</li>
<li>第二个参数是一个回调函数，将参数 v 显示在 ans 文本框中。</li>
</ul>
<p>接下来，重新编译 main.go，访问 localhost:9999，随便输入一个数字，点击 Click。页面会先显示 <code v-pre>Waiting 3s...</code>，3s过后显示计算结果。</p>
<h3 id="工具框架" tabindex="-1"><a class="header-anchor" href="#工具框架" aria-hidden="true">#</a> <strong>工具框架</strong></h3>
<ul>
<li>WebAssembly 的二进制分析工具 <a href="https://wasdk.github.io/wasmcodeexplorer/" target="_blank" rel="noopener noreferrer">WebAssembly Code Explorer<ExternalLinkIcon/></a></li>
<li>使用NodeJs 或浏览器测试 Go Wasm 代码 <a href="https://github.com/golang/go/wiki/WebAssembly#executing-webassembly-with-nodejs" target="_blank" rel="noopener noreferrer">Github Wiki<ExternalLinkIcon/></a></li>
<li>借鉴 Vue 实现的 Golang WebAssembly 前端框架 <a href="https://www.vugu.org/doc/start" target="_blank" rel="noopener noreferrer">Vugu<ExternalLinkIcon/></a>，完全使用 Go，不用写任何的 JavaScript 代码。</li>
</ul>
<h2 id="gorm-学习教程" tabindex="-1"><a class="header-anchor" href="#gorm-学习教程" aria-hidden="true">#</a> Gorm 学习教程</h2>
<h3 id="结构体标记-tags" tabindex="-1"><a class="header-anchor" href="#结构体标记-tags" aria-hidden="true">#</a> 结构体标记（tags）</h3>
<p>使用结构体声明模型时，标记（tags）是可选项。gorm支持以下标记:</p>
<h3 id="支持的结构体标记-struct-tags" tabindex="-1"><a class="header-anchor" href="#支持的结构体标记-struct-tags" aria-hidden="true">#</a> 支持的结构体标记（Struct tags）</h3>
<table>
<thead>
<tr>
<th>结构体标记（Tag）</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>Column</td>
<td>指定列名</td>
</tr>
<tr>
<td>Type</td>
<td>指定列数据类型</td>
</tr>
<tr>
<td>Size</td>
<td>指定列大小, 默认值255</td>
</tr>
<tr>
<td>PRIMARY_KEY</td>
<td>将列指定为主键</td>
</tr>
<tr>
<td>UNIQUE</td>
<td>将列指定为唯一</td>
</tr>
<tr>
<td>DEFAULT</td>
<td>指定列默认值</td>
</tr>
<tr>
<td>PRECISION</td>
<td>指定列精度</td>
</tr>
<tr>
<td>NOT NULL</td>
<td>将列指定为非 NULL</td>
</tr>
<tr>
<td>AUTO_INCREMENT</td>
<td>指定列是否为自增类型</td>
</tr>
<tr>
<td>INDEX</td>
<td>创建具有或不带名称的索引, 如果多个索引同名则创建复合索引</td>
</tr>
<tr>
<td>UNIQUE_INDEX</td>
<td>和 INDEX 类似，只不过创建的是唯一索引</td>
</tr>
<tr>
<td>EMBEDDED</td>
<td>将结构设置为嵌入</td>
</tr>
<tr>
<td>EMBEDDED_PREFIX</td>
<td>设置嵌入结构的前缀</td>
</tr>
<tr>
<td>-</td>
<td>忽略此字段</td>
</tr>
</tbody>
</table>
<h3 id="关联相关标记-tags" tabindex="-1"><a class="header-anchor" href="#关联相关标记-tags" aria-hidden="true">#</a> 关联相关标记（tags）</h3>
<table>
<thead>
<tr>
<th>结构体标记（Tag）</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>MANY2MANY</td>
<td>指定连接表</td>
</tr>
<tr>
<td>FOREIGNKEY</td>
<td>设置外键</td>
</tr>
<tr>
<td>ASSOCIATION_FOREIGNKEY</td>
<td>设置关联外键</td>
</tr>
<tr>
<td>POLYMORPHIC</td>
<td>指定多态类型</td>
</tr>
<tr>
<td>POLYMORPHIC_VALUE</td>
<td>指定多态值</td>
</tr>
<tr>
<td>JOINTABLE_FOREIGNKEY</td>
<td>指定连接表的外键</td>
</tr>
<tr>
<td>ASSOCIATION_JOINTABLE_FOREIGNKEY</td>
<td>指定连接表的关联外键</td>
</tr>
<tr>
<td>SAVE_ASSOCIATIONS</td>
<td>是否自动完成 save 的相关操作</td>
</tr>
<tr>
<td>ASSOCIATION_AUTOUPDATE</td>
<td>是否自动完成 update 的相关操作</td>
</tr>
<tr>
<td>ASSOCIATION_AUTOCREATE</td>
<td>是否自动完成 create 的相关操作</td>
</tr>
<tr>
<td>ASSOCIATION_SAVE_REFERENCE</td>
<td>是否自动完成引用的 save 的相关操作</td>
</tr>
<tr>
<td>PRELOAD</td>
<td>是否自动完成预加载的相关操作</td>
</tr>
</tbody>
</table>
<h2 id="openim-客服端的-wasm-设计" tabindex="-1"><a class="header-anchor" href="#openim-客服端的-wasm-设计" aria-hidden="true">#</a> OpenIM 客服端的 Wasm 设计</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@PS2023EVRHNCXG:~/workspaces/openim/openim-sdk-core/wasm<span class="token comment"># tree</span>
<span class="token builtin class-name">.</span>
├── cmd
│   ├── Makefile                    <span class="token comment"># 构建 wasm 包的 Makefile 文件</span>
│   └── main.go                     <span class="token comment"># wasm 包的入口文件</span>
├── event_listener
│   ├── callback_writer.go          <span class="token comment"># 回调函数写入器，用于将事件监听器的回调函数写入到 wasm 包中</span>
│   ├── caller.go                   <span class="token comment"># 调用器，用于调用 wasm 包中的函数</span>
│   └── listener.go                 <span class="token comment"># 事件监听器，用于监听 wasm 包中的事件</span>
├── indexdb
│   ├── black_model.go              <span class="token comment"># 黑名单模型，用于定义黑名单数据表结构</span>
│   ├── cache_message.go            <span class="token comment"># 缓存消息模型，用于定义缓存消息数据表结构</span>
│   ├── chat_log_model.go           <span class="token comment"># 聊天记录模型，用于定义聊天记录数据表结构</span>
│   ├── chat_log_reaction_extension_model.go  <span class="token comment"># 聊天记录反应扩展模型，用于定义聊天记录反应扩展数据表结构</span>
│   ├── conversation_model.go       <span class="token comment"># 会话模型，用于定义会话数据表结构</span>
│   ├── conversation_unread_message_model.go  <span class="token comment"># 未读消息模型，用于定义未读消息数据表结构</span>
│   ├── friend_model.go             <span class="token comment"># 好友模型，用于定义好友数据表结构</span>
│   ├── friend_request_model.go     <span class="token comment"># 好友请求模型，用于定义好友请求数据表结构</span>
│   ├── group_member_model.go       <span class="token comment"># 群成员模型，用于定义群成员数据表结构</span>
│   ├── group_model.go              <span class="token comment"># 群组模型，用于定义群组数据表结构</span>
│   ├── group_request.model.go      <span class="token comment"># 群组请求模型，用于定义群组请求数据表结构</span>
│   ├── indexdb.go                  <span class="token comment"># 索引数据库，用于定义索引数据库的接口和实现</span>
│   ├── notification_model.go       <span class="token comment"># 通知模型，用于定义通知数据表结构</span>
│   ├── super_group_chat_log_model.go  <span class="token comment"># 超级群聊天记录模型，用于定义超级群聊天记录数据表结构</span>
│   ├── super_group_model.go        <span class="token comment"># 超级群模型，用于定义超级群数据表结构</span>
│   ├── temp_struct                 <span class="token comment"># 临时结构体文件夹，用于存放一些临时的结构体定义</span>
│   │   └── struct.go
│   └── user_model.go               <span class="token comment"># 用户模型，用于定义用户数据表结构</span>
└── wasm_wrapper
    ├── wasm_conversation_msg.go    <span class="token comment"># wasm 包中的会话消息相关函数</span>
    ├── wasm_friend.go              <span class="token comment"># wasm 包中的好友相关函数</span>
    ├── wasm_group.go               <span class="token comment"># wasm 包中的群组相关函数</span>
    ├── wasm_init_login.go          <span class="token comment"># wasm 包中的初始化和登录相关函数</span>
    ├── wasm_signaling.go           <span class="token comment"># wasm 包中的信令相关函数</span>
    ├── wasm_third.go               <span class="token comment"># wasm 包中的第三方相关函数</span>
    └── wasm_user.go                <span class="token comment"># wasm 包中的用户相关函数</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>wasm 中负责的模块：</p>
<ul>
<li><code v-pre>wasm/indexdb/chat_log_model.go</code></li>
<li><code v-pre>wasm/indexdb/black_model.go</code></li>
<li><code v-pre>wasm/indexdb/conversation_model.go</code></li>
</ul>
<p><strong>测试模块的代码：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>testv2<span class="token operator">/</span>
├── callback<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 回调函数</span>
├── config<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 配置文件</span>
├── conversation_test<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 对话测试</span>
├── create_msg_test<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 创建消息测试</span>
├── empty_test<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 空测试</span>
├── file_test<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 文件测试</span>
├── friend_test<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 好友测试</span>
├── group_test<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 群组测试</span>
├── init<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 初始化</span>
├── listener<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 监听器</span>
├── signaling_test<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 信令测试</span>
├── sync_test<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 同步测试</span>
├── user_test<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 用户测试</span>
└── work_moment_test<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 工作时刻测试</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="chat-log-model" tabindex="-1"><a class="header-anchor" href="#chat-log-model" aria-hidden="true">#</a> chat_log_model</h3>
<p>获取到 messge:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>i <span class="token operator">*</span>LocalChatLogs<span class="token punctuation">)</span> <span class="token function">GetMessage</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> conversationID<span class="token punctuation">,</span> clientMsgID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>model_struct<span class="token punctuation">.</span>LocalChatLog<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	msg<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">Exec</span><span class="token punctuation">(</span>conversationID<span class="token punctuation">,</span> clientMsgID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> msg<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
			result <span class="token operator">:=</span> model_struct<span class="token punctuation">.</span>LocalChatLog<span class="token punctuation">{</span><span class="token punctuation">}</span>
			err <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">JsonStringToStruct</span><span class="token punctuation">(</span>v<span class="token punctuation">,</span> <span class="token operator">&amp;</span>result<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
			<span class="token punctuation">}</span>
			<span class="token keyword">return</span> <span class="token operator">&amp;</span>result<span class="token punctuation">,</span> err
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> ErrType
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对应的 db message:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>d <span class="token operator">*</span>DataBase<span class="token punctuation">)</span> <span class="token function">GetMessage</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> conversationID <span class="token builtin">string</span><span class="token punctuation">,</span> clientMsgID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>model_struct<span class="token punctuation">.</span>LocalChatLog<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	d<span class="token punctuation">.</span><span class="token function">initChatLog</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> conversationID<span class="token punctuation">)</span>
	<span class="token keyword">var</span> c model_struct<span class="token punctuation">.</span>LocalChatLog
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>c<span class="token punctuation">,</span> utils<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>d<span class="token punctuation">.</span>conn<span class="token punctuation">.</span><span class="token function">WithContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Table</span><span class="token punctuation">(</span>utils<span class="token punctuation">.</span><span class="token function">GetTableName</span><span class="token punctuation">(</span>conversationID<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Where</span><span class="token punctuation">(</span><span class="token string">"client_msg_id = ?"</span><span class="token punctuation">,</span>
		clientMsgID<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Take</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>c<span class="token punctuation">)</span><span class="token punctuation">.</span>Error<span class="token punctuation">,</span> <span class="token string">"GetMessage failed"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>getMessage</li>
</ul>
<table>
<thead>
<tr>
<th>输入参数</th>
<th>类型</th>
<th>说明</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>clientMsgID</td>
<td>string</td>
<td>消息ID</td>
<td></td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>返回参数</th>
<th>类型</th>
<th>说明</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>errCode</td>
<td>number</td>
<td>自定义即可，0成功，非0失败</td>
<td>如果获取不到消息也需要返回错误</td>
</tr>
<tr>
<td>errMsg</td>
<td>string</td>
<td>详细的err信息</td>
<td></td>
</tr>
<tr>
<td>data</td>
<td>string</td>
<td>LocalChatLog（消息表对象数据）</td>
<td>对象转换成string</td>
</tr>
</tbody>
</table>
<p><strong>参考sql语句说明：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>SELECT * FROM `local_chat_logs` WHERE client_msg_id = "063031b86f8e503c6038efb2b835f216" LIMIT 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="chat-log-model-1" tabindex="-1"><a class="header-anchor" href="#chat-log-model-1" aria-hidden="true">#</a> <strong>chat_log_model</strong></h3>
<h3 id="wasm-模块获取到-messgae-实现" tabindex="-1"><a class="header-anchor" href="#wasm-模块获取到-messgae-实现" aria-hidden="true">#</a> <strong>wasm 模块获取到 messgae 实现</strong></h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (i *LocalChatLogs) GetMessage(ctx context.Context, conversationID, clientMsgID string) (*model_struct.LocalChatLog, error) {
    msg, err := Exec(conversationID, clientMsgID)
    if err != nil {
        return nil, err
    } else {
        if v, ok := msg.(string); ok {
            result := model_struct.LocalChatLog{}
            err := utils.JsonStringToStruct(v, &amp;result)
            if err != nil {
                return nil, err
            }
            return &amp;result, err
        } else {
            return nil, ErrType
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对应的-db-模块-message实现" tabindex="-1"><a class="header-anchor" href="#对应的-db-模块-message实现" aria-hidden="true">#</a> <strong>对应的 db 模块 message实现:</strong></h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (d *DataBase) GetMessage(ctx context.Context, conversationID string, clientMsgID string) (*model_struct.LocalChatLog, error) {
    d.initChatLog(ctx, conversationID)
    var c model_struct.LocalChatLog
    return &amp;c, utils.Wrap(d.conn.WithContext(ctx).Table(utils.GetTableName(conversationID)).Where("client_msg_id = ?",
        clientMsgID).Take(&amp;c).Error, "GetMessage failed")
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文档的实现-给前端同学看的-只需要修改-data-的备注-是对象转化为什么类型" tabindex="-1"><a class="header-anchor" href="#文档的实现-给前端同学看的-只需要修改-data-的备注-是对象转化为什么类型" aria-hidden="true">#</a> <strong>文档的实现（给前端同学看的，只需要修改 data 的备注，是对象转化为什么类型）</strong></h3>
<ul>
<li>getMessage</li>
</ul>
<table>
<thead>
<tr>
<th>输入参数</th>
<th>类型</th>
<th>说明</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>clientMsgID</td>
<td>string</td>
<td>消息ID</td>
<td></td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>返回参数</th>
<th>类型</th>
<th>说明</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>errCode</td>
<td>number</td>
<td>自定义即可，0成功，非0失败</td>
<td>如果获取不到消息也需要返回错误</td>
</tr>
<tr>
<td>errMsg</td>
<td>string</td>
<td>详细的err信息</td>
<td></td>
</tr>
<tr>
<td>data</td>
<td>string</td>
<td>LocalChatLog（消息表对象数据）</td>
<td>对象转换成string</td>
</tr>
</tbody>
</table>
<p><strong>参考sql语句说明：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>SELECT * FROM `local_chat_logs` WHERE client_msg_id = "063031b86f8e503c6038efb2b835f216" LIMIT 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="wasm-的getmessagelist-的实现" tabindex="-1"><a class="header-anchor" href="#wasm-的getmessagelist-的实现" aria-hidden="true">#</a> <strong>wasm 的getMessageList 的实现</strong></h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (i *LocalChatLogs) GetMessageList(ctx context.Context, conversationID string, count int, startTime int64, isReverse bool) (result []*model_struct.LocalChatLog, err error) {
    msgList, err := Exec(conversationID, count, startTime, isReverse, i.loginUserID)
    if err != nil {
        return nil, err
    } else {
        if v, ok := msgList.(string); ok {
            var temp []model_struct.LocalChatLog
            err := utils.JsonStringToStruct(v, &amp;temp)
            if err != nil {
                return nil, err
            }
            for _, v := range temp {
                v1 := v
                result = append(result, &amp;v1)
            }
            return result, err
        } else {
            return nil, ErrType
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="对应的-db-模块-message实现-1" tabindex="-1"><a class="header-anchor" href="#对应的-db-模块-message实现-1" aria-hidden="true">#</a> <strong>对应的 db 模块 message实现</strong></h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (d *DataBase) GetMessageList(ctx context.Context, conversationID string, count int, startTime int64, isReverse bool) (result []*model_struct.LocalChatLog, err error) {
    d.mRWMutex.Lock()
    defer d.mRWMutex.Unlock()
    var condition, timeOrder, timeSymbol string
    if isReverse {
        timeOrder = "send_time ASC"
        timeSymbol = ">"
    } else {
        timeOrder = "send_time DESC"
        timeSymbol = "&lt;"
    }
    condition = "send_time " + timeSymbol + " ?"

    err = utils.Wrap(d.conn.WithContext(ctx).Table(utils.GetTableName(conversationID)).Where(condition, startTime).
        Order(timeOrder).Offset(0).Limit(count).Find(&amp;result).Error, "GetMessageList failed")
    if err != nil {
        return nil, err
    }
    return result, err
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文档的实现-给前端同学看的-只需要修改-data-的备注-是对象转化为什么类型-1" tabindex="-1"><a class="header-anchor" href="#文档的实现-给前端同学看的-只需要修改-data-的备注-是对象转化为什么类型-1" aria-hidden="true">#</a> <strong>文档的实现（给前端同学看的，只需要修改 data 的备注，是对象转化为什么类型）</strong></h3>
<ul>
<li>getMessageList</li>
</ul>
<table>
<thead>
<tr>
<th>输入参数</th>
<th>类型</th>
<th>说明</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>sourceID</td>
<td>string</td>
<td>关于某人的ID也可能是写扩散模式下群ID</td>
<td></td>
</tr>
<tr>
<td>sessionType</td>
<td>number</td>
<td>会话类型，单聊1、读扩散群2、大群为3</td>
<td></td>
</tr>
<tr>
<td>count</td>
<td>number</td>
<td>获取消息的数量</td>
<td></td>
</tr>
<tr>
<td>startTime</td>
<td>number</td>
<td>消息发送时间，毫秒</td>
<td></td>
</tr>
<tr>
<td>isReverse</td>
<td>boolean</td>
<td>消息为正向拉取还是反向拉取</td>
<td>默认情况为false，即为正向拉取（从新消息到老消息），order by 后面的排序规则为send_time DESC 降序排列，send_time为 &lt;;当为true的情况，即为反向拉取，order by 后面的排序规则为send_time ASC 升序排列,send_time为 &gt;</td>
</tr>
<tr>
<td>loginUserID</td>
<td>string</td>
<td>用户登录ID</td>
<td>需要根据会话的类型和sourceID判断，当sessionType为1并且sourceID为登录者ID时候，搜索sql为 AND</td>
</tr>
</tbody>
</table>
<table>
<thead>
<tr>
<th>返回参数</th>
<th>类型</th>
<th>说明</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>errCode</td>
<td>number</td>
<td>自定义即可，0成功，非0失败</td>
<td>获取不到的时候返回空数组不需要返回错误</td>
</tr>
<tr>
<td>errMsg</td>
<td>string</td>
<td>详细的err信息</td>
<td></td>
</tr>
<tr>
<td>data</td>
<td>string</td>
<td>[]LocalChatLog（消息表对象数组数据）</td>
<td>对象转换成string</td>
</tr>
</tbody>
</table>
<p><strong>参考sql语句说明：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>-- 1、sessionType == 1 &amp;&amp; sourceID == d.loginUserID
SELECT * FROM `local_chat_logs` WHERE send_id = "812146266" And  recv_id = "812146266" AND status &lt;=1 And session_type = 3 And send_time &lt; 1664357584025 ORDER BY send_time DESC LIMIT 30;
-- 注：其中status固定为3
-- 2、其他场景
SELECT * FROM `local_chat_logs` WHERE send_id = "812146266" OR  recv_id = "812146266" AND status &lt;=1 And session_type = 3 And send_time &lt; 1664357584025 ORDER BY send_time DESC LIMIT 30;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '86.md' style='float:left'>⬆️上一节🔗  </a><a href = '88.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


