<template><div><h1 id="openim-的-api-接口设计" tabindex="-1"><a class="header-anchor" href="#openim-的-api-接口设计" aria-hidden="true">#</a> OpenIM 的 API 接口设计</h1>
<h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2>
<p>我们目前使用类似 http restful 的方式进行对外对内提供服务，但是我们之前的 API 管理其实是比较混乱的，分为以下几种情况:</p>
<ol>
<li>暴露给 web 的 api：有使用 swagger 的，有在文档平台上写文档的，还有没有写文档的</li>
<li>暴露给其他服务调用的 api: 有注册到内部的接口网关的，但是内部的接口网关上有的有参数，有的没有，没有返回值定义</li>
</ol>
<p>所以就存在很多问题:</p>
<ol>
<li>想要接口不知道从哪儿找，只能到处问人</li>
<li>有时候从内部网关平台上找到接口但是不知道怎么调用，没有写任何参数，有的写了还有可能是错的</li>
<li>有的压根没有接口文档，对接的同学也没有时间写，然后让你直接看代码</li>
<li>有的对接同学扔给你一个接口文档，然后试了半天发现，有问题，沟通排查之后发现文档很久没有更新了 ！！！</li>
</ol>
<h2 id="方法" tabindex="-1"><a class="header-anchor" href="#方法" aria-hidden="true">#</a> 方法</h2>
<p>利用 protobuf 来定义接口的方式非常令人心动，因为 protobuf 当中包含了接口的函数签名，入参和返回值同时还支持注释，就是一份天然的文档，同时也不用担心出现代码更新了但是文档没有更新的情况，因为它既是文档也是代码，服务端也需要使用，所以代码更新之后文档也一定会更新。自然而然的就少了很多沟通的成本。</p>
<p><img src="http://sm.nsddd.top/sm202311081708323.jpeg" alt="api 定义方式 (1).jpg"></p>
<p>如上图所示于此同时我们还可以利用 protobuf 文件生成对应语言的客户端代码，就不用每个项目都去维护一套 sdk 了，同时我们使用接口生成代码，在 go 当中可以使用 gomock 非常方便的对代码进行 mock。</p>
<p>参考项目：</p>
<ul>
<li><a href="https://github.com/googleapis/googleapis" target="_blank" rel="noopener noreferrer">googleapis/googleapis<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/istio/api" target="_blank" rel="noopener noreferrer">istio/api<ExternalLinkIcon/></a></li>
</ul>
<h3 id="api-project" tabindex="-1"><a class="header-anchor" href="#api-project" aria-hidden="true">#</a> API Project</h3>
<p>使用 protobuf 定义接口可以解决我们找到 api 文档之后，文档不准确，缺失的问题，但是我们应该如何找到我们的 api 呢？我们生成出的 api 文件调用方应该如何引用呢？难道我们给每个调用方都去开一个项目的权限么？那明显是不太行的，接下来我们就看看我们 api 该如何管理和组织。</p>
<p>统一存放 api 定义文档，然后通过 ci/cd 生成对应的客户端代码放到各个语言的子仓库当中</p>
<p><img src="http://sm.nsddd.top/sm202311081717157.png" alt="image-20231108171738096"></p>
<p>工作流程如上图所示</p>
<ul>
<li>开发同学修改了 proto 文件定义之后 push 到对应的业务应用仓库当中</li>
<li>然后触发 cicd 流程将 proto 文件复制到 api project 当中
<ul>
<li>首先会对 proto 文件进行静态代码分析，查看是否符合规范</li>
<li>然后 clone api project 创建一个新的分支</li>
<li>然后 push 代码，创建一个 merge request 请求</li>
</ul>
</li>
<li>然后我们对应负责的同学收到 code review 的通知之后进行 code review，没有问题就会合并到 api project 的主分支当中了</li>
<li>然后就会触发 cicd 生成对应语言的客户端代码，push 到对应的各个子仓库当中了</li>
</ul>
<h3 id="api-project-layout" tabindex="-1"><a class="header-anchor" href="#api-project-layout" aria-hidden="true">#</a> API Project Layout</h3>
<p>我们的 api 项目是如何定义的呢？看下图
<img src="http://sm.nsddd.top/sm202311081726561.jpeg" alt="Frame 1 (2).jpg"></p>
<ul>
<li>首先是在业务项目当中，我们顶层会有一个 api 目录
<ul>
<li>在 api 目录当中我们会按照 product <code v-pre>name/app name/版本号/app.proto</code> 的方式进行组织</li>
<li>具体怎么组织可能每个公司都不太一样，但是总的来说就是应用的 唯一名称+版本号 来进行一个区分</li>
</ul>
</li>
<li>在 api project 当中和业务应用类似，也有一个 api 目录，通过上图的两个框就可以发现这是一模一样的
<ul>
<li>除此之外 <code v-pre>api project</code> 还有用于注解的 <code v-pre>annotations</code> 文件夹</li>
<li>有一些第三方的引用，例如 <code v-pre>googleapis</code> 当中的一些 <code v-pre>proto</code> 文件</li>
</ul>
</li>
</ul>
<h2 id="api-兼容性开发" tabindex="-1"><a class="header-anchor" href="#api-兼容性开发" aria-hidden="true">#</a> API 兼容性开发</h2>
<p>随着应用的不断开发，业务的不断发展我们的 api 肯定会不断的进行修改，在修改 api 的时候考虑 api 的兼容性就会很重要了，如果我们做了一些破坏性的变更就有可能会导致依赖我们的服务或者是客户端报错，这样就会带来事故。</p>
<h4 id="向下兼容的变更" tabindex="-1"><a class="header-anchor" href="#向下兼容的变更" aria-hidden="true">#</a> 向下兼容的变更</h4>
<ul>
<li>新增接口</li>
<li>新增参数字段</li>
<li>新增返回字段
<ul>
<li>在不改变其他响应字段的行为的前提下，非资源（例如，ListBooksResponse）的响应消息可以扩展而不必破坏客户端的兼容性。即使会引入冗余，先前在响应中填充的任何字段应继续使用相同的语义填充。</li>
</ul>
</li>
</ul>
<p>一般而言新增都是相对安全的，但是我们要注意的是新增字段不能改变我们原本的逻辑，如果改变了 api 的逻辑，那就不一定安全了</p>
<h4 id="向下不兼容的变更-破坏性变更" tabindex="-1"><a class="header-anchor" href="#向下不兼容的变更-破坏性变更" aria-hidden="true">#</a> 向下不兼容的变更（破坏性变更）</h4>
<ul>
<li>删除或重命名服务，字段，方法或枚举值
<ul>
<li>在做这种修改的时候需要修改我们 api 的版本号，常见有两种方式</li>
<li>如果只有很少的 api 变动可以创建一个 <code v-pre>XXXV2</code> 的方法</li>
<li>如果变动的 api 比较多，可以直接新启一个 <code v-pre>v2</code> 的包</li>
</ul>
</li>
<li>修改字段的类型
<ul>
<li>严禁修改字段的类型，修改字段的类型可能会导致客户端崩溃</li>
</ul>
</li>
<li>修改现有请求的可见行为</li>
<li>给资源消息添加 读取/写入 字段</li>
</ul>
<h3 id="api-命名规范" tabindex="-1"><a class="header-anchor" href="#api-命名规范" aria-hidden="true">#</a> API 命名规范</h3>
<h4 id="包名" tabindex="-1"><a class="header-anchor" href="#包名" aria-hidden="true">#</a> 包名</h4>
<table>
<thead>
<tr>
<th>产品名</th>
<th>product</th>
</tr>
</thead>
<tbody>
<tr>
<td>应用名</td>
<td>app</td>
</tr>
<tr>
<td>版本号</td>
<td>v1</td>
</tr>
<tr>
<td>包名</td>
<td><code v-pre>product.app.v1</code></td>
</tr>
<tr>
<td>目录结构</td>
<td><code v-pre>api/product/app/v1/xx.proto</code></td>
</tr>
</tbody>
</table>
<h4 id="api-定义" tabindex="-1"><a class="header-anchor" href="#api-定义" aria-hidden="true">#</a> API 定义</h4>
<ul>
<li>命名规则：方法 + 资源</li>
<li>标准方法：参考 Google API 设计指南</li>
</ul>
<table>
<thead>
<tr>
<th><strong>标准方法</strong></th>
<th><strong>HTTP 映射</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>List</td>
<td>GET</td>
</tr>
<tr>
<td>Get</td>
<td>GET</td>
</tr>
<tr>
<td>Update</td>
<td>PUT 或者 PATCH</td>
</tr>
<tr>
<td>Create</td>
<td>POST</td>
</tr>
<tr>
<td>Delete</td>
<td>DELETE</td>
</tr>
</tbody>
</table>
<p>除了标准的也有一些非标准的，例如同步数据可能会用 <code v-pre>Sync</code> 等，不过大部分的 api 应该都是标准的</p>
<h4 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// api/product/app/v1/blog.proto</span>

syntax <span class="token operator">=</span> <span class="token string">"proto3"</span><span class="token punctuation">;</span>

<span class="token keyword">package</span> product<span class="token punctuation">.</span>app<span class="token punctuation">.</span>v1<span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string">"google/api/annotations.proto"</span><span class="token punctuation">;</span>

<span class="token comment">// blog service is a blog demo</span>
service BlogService <span class="token punctuation">{</span>

	rpc <span class="token function">GetArticles</span><span class="token punctuation">(</span>GetArticlesReq<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>GetArticlesResp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		option <span class="token punctuation">(</span>google<span class="token punctuation">.</span>api<span class="token punctuation">.</span>http<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
			get<span class="token punctuation">:</span> <span class="token string">"/v1/articles"</span>
			additional_bindings <span class="token punctuation">{</span>
				get<span class="token punctuation">:</span> <span class="token string">"/v1/author/{author_id}/articles"</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，一般而言我们应该为每个接口都创建一个自定义的 message，为了后面扩展，如果我们用 Empty 的话后续就没有办法新增字段了</p>
<h3 id="api-error" tabindex="-1"><a class="header-anchor" href="#api-error" aria-hidden="true">#</a> API Error</h3>
<p>先说我们当前的问题，我们一直用的 http 然后我们返回是使用的下面这种格式，然后 http code 统一返回 200</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">{</span>
  <span class="token key atrule">"code"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token key atrule">"msg"</span><span class="token punctuation">:</span> <span class="token string">"xxx"</span><span class="token punctuation">,</span>
  <span class="token key atrule">"data"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种做法就存在一个比较大的问题，做监控的时候不太好做，很多现成的东西没有办法直接使用，因为我们都返回的成功。</p>
<p>参照 google 的错误定义，将 http code 和 grpc 错误码进行映射，返回对应的错误信息</p>
<p>但是这样还是不行，因为这样很多业务错误信息无法区分，毛老师他们的 kratos v2 的做法是做了两层，使用下面的方式进行定义</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>message Status <span class="token punctuation">{</span>
  <span class="token comment">// 错误码，跟 grpc-status 一致，并且在HTTP中可映射成 http-status</span>
  <span class="token builtin">int32</span> code <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token comment">// 错误原因，定义为业务判定错误码</span>
  <span class="token builtin">string</span> reason <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token comment">// 错误信息，为用户可读的信息，可作为用户提示内容</span>
  <span class="token builtin">string</span> message <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token comment">// 错误详细信息，可以附加自定义的信息列表</span>
  repeated google<span class="token punctuation">.</span>protobuf<span class="token punctuation">.</span>Any details <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和我们当前的方式差不太多，但是我们是在原来的基础上返回了 http code，剩下的字段还是和原来保持一致</p>
<h2 id="gin-路由注册" tabindex="-1"><a class="header-anchor" href="#gin-路由注册" aria-hidden="true">#</a> Gin 路由注册</h2>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"github.com/gin-gonic/gin"</span>

<span class="token keyword">func</span> <span class="token function">handler</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// get params</span>
	params <span class="token operator">:=</span> <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Msg <span class="token builtin">string</span> <span class="token string">`json:"msg"`</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	ctx<span class="token punctuation">.</span><span class="token function">BindQuery</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>params<span class="token punctuation">)</span>

	<span class="token comment">// 业务逻辑</span>

	<span class="token comment">// 返回数据</span>
	ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
		<span class="token string">"message"</span><span class="token punctuation">:</span> params<span class="token punctuation">.</span>Msg<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/ping"</span><span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 监听并在 0.0.0.0:8080 上启动服务</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个简单的示例，可以发现 gin 注册路由需要一个 <code v-pre>func (ctx *gin.Context)</code> 签名的函数，这个函数一般做三件事，获取参数，调用业务逻辑，调用 gin 的方法返回 http response</p>
<h4 id="grpc-server-interface" tabindex="-1"><a class="header-anchor" href="#grpc-server-interface" aria-hidden="true">#</a> grpc server interface</h4>
<p>先看一下 proto 文件中的 rpc 定义，一般就是包含一个参数和一个返回值的函数</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// The greeting service definition.</span>
service Greeter <span class="token punctuation">{</span>
  <span class="token comment">// Sends a greeting</span>
  rpc SayHello <span class="token punctuation">(</span>HelloRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>HelloReply<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后看 grpc 生成的接口，其实和 proto 文件一一对应，只是多了一个 context 和 error</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> GreeterServer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token comment">// Sends a greeting</span>
	<span class="token function">SayHello</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> <span class="token operator">*</span>HelloRequest<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>HelloReply<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token function">mustEmbedUnimplementedGreeterServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以问题来了，我们让 service 层实现类似 <code v-pre>GreeterServer</code> 接口就行了，那我们代码生成器要怎么写才能够应用到 http 上呢？</p>
<h4 id="概要方案" tabindex="-1"><a class="header-anchor" href="#概要方案" aria-hidden="true">#</a> 概要方案</h4>
<ol>
<li>
<p>我们需要从 proto 文件中得知 http method，http path 的信息，这样我们才知道要注册到哪个路由上</p>
<ol>
<li>这个可以通过 <code v-pre>google/api/annotations.proto</code> 为 rpc 方法添加 Option 实现</li>
<li>或者是通过函数签名来约定，我们约定方法名使用驼峰方式命名，首个单词是 http method 或者是 http method 的映射，如果都不是默认采用 post
<ol>
<li><code v-pre>&quot;GET&quot;, &quot;FIND&quot;, &quot;QUERY&quot;, &quot;LIST&quot;, &quot;SEARCH&quot;</code> –&gt; <code v-pre>GET</code></li>
<li><code v-pre>&quot;POST&quot;, &quot;CREATE&quot;</code> –&gt; <code v-pre>POST</code></li>
<li><code v-pre>&quot;PUT&quot;, &quot;UPDATE&quot;</code> –&gt; <code v-pre>PUT</code></li>
<li><code v-pre>&quot;DELETE&quot;</code> –&gt; <code v-pre>DELETE</code></li>
</ol>
</li>
</ol>
</li>
<li>
<p>我们需要构建</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func handler(ctx *gin.Context)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>函数用于注册路由</p>
<ol>
<li>函数内需要处理参数，用于调用 service 层的代码</li>
<li>调用 service 层的代码结束之后，将返回值调用 gin 相关方法返回</li>
</ol>
</li>
</ol>
<p>所以我们最后生成的代码大概应该是这样的：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>type GreeterService struct {
	server GreeterHTTPServer
	router gin.IRouter
}

// 生成的 gin.HandlerFunc
// 由于 HandlerFunc 签名的限制，不能从参数传递 service 接口进来
// 所以我们使用一个 Struct 托管 service 数据
func (s *GreeterService) SayHello(ctx *gin.Context) {
	var in HelloRequest

	if err := ctx.ShouldBindJSON(∈); err != nil {
		// 返回参数错误
		return
	}

	// 调用业务逻辑
	out, err := s.server.(GreeterHTTPServer).SayHello(ctx, ∈)
	if err != nil {
		// 返回错误结果
		return
	}

	// 返回成功结果
	ctx.JSON(200, out)
	return
}

// 路由注册，首先需要 gin.IRouter 接口用于注册
// 其次需要获取到 SayHello 方法对应的 http method 和 path
func (s *GreeterService) RegisterService() {
	s.router.Handle("GET", "/hello", s.SayHello)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


