<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第68节-深入学习-gin-源码" tabindex="-1"><a class="header-anchor" href="#第68节-深入学习-gin-源码" aria-hidden="true">#</a> 第68节 深入学习 gin 源码</h1>
<div><a href = '67.md' style='float:left'>⬆️上一节🔗  </a><a href = '69.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="why" tabindex="-1"><a class="header-anchor" href="#why" aria-hidden="true">#</a> Why</h2>
<p>Gin 是一个用 Golang编写的 高性能的web 框架, 由于http路由的优化，速度提高了近 40 倍。 Gin的特点就是封装优雅、API友好。</p>
<p><strong>Gin的一些特性：</strong></p>
<ul>
<li><strong>快速</strong>： 基于 Radix 树的路由，小内存占用。没有反射。可预测的 API 性能。</li>
<li><strong>支持中间件</strong>：入的 HTTP 请求可以由一系列中间件和最终操作来处理。 例如：Logger，Authorization，GZIP，最终操作 DB。</li>
<li><strong>Crash 处理</strong>：Gin 可以 catch 一个发生在 HTTP 请求中的 panic 并 recover 它。这样，你的服务器将始终可用。例如，你可以向 Sentry 报告这个 panic！</li>
<li><strong>JSON 验证</strong>：Gin 可以解析并验证请求的 JSON，例如检查所需值的存在。</li>
<li><strong>路由组</strong>：更好地组织路由。是否需要授权，不同的 API 版本…… 此外，这些组可以无限制地嵌套而不会降低性能。</li>
<li><strong>错误管理</strong>：Gin 提供了一种方便的方法来收集 HTTP 请求期间发生的所有错误。最终，中间件可以将它们写入日志文件，数据库并通过网络发送。</li>
<li><strong>内置渲染</strong>：Gin 为 JSON，XML 和 HTML 渲染提供了易于使用的 API。</li>
<li><strong>可扩展性</strong>：新建一个中间件非常简单。</li>
</ul>
<p>下载并安装 gin</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go get -u github.com/gin-gonic/gin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构" aria-hidden="true">#</a> 项目结构</h2>
<p>实际项目业务功能和模块会很多，我们不可能把所有代码都写在一个go文件里面或者写在一个main入口函数里面；我们需要对项目结构做一些规划，方便维护代码以及扩展。</p>
<p><strong>Gin框没有对项目结构做出限制，我们可以根据自己项目需要自行设计。</strong></p>
<p><strong>MVC 架构设计：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>├── conf            <span class="token comment">#项目配置文件目录</span>
│   └── config.toml <span class="token comment">#大家可以选择自己熟悉的配置文件管理工具包例如：toml、xml等等</span>
├── controllers     <span class="token comment">#控制器目录，按模块存放控制器（或者叫控制器函数），必要的时候可以继续划分子目录。</span>
│   ├── food.go
│   └── user.go
├── main.go         <span class="token comment">#项目入口，这里负责Gin框架的初始化，注册路由信息，关联控制器函数等。</span>
├── models          <span class="token comment">#模型目录，负责项目的数据存储部分，例如各个模块的Mysql表的读写模型。</span>
│   ├── food.go
│   └── user.go 
├── static          <span class="token comment">#静态资源目录，包括Js，css，jpg等等，可以通过Gin框架配置，直接让用户访问。</span>
│   ├── css
│   ├── images
│   └── js
├── logs            <span class="token comment">#日志文件目录，主要保存项目运行过程中产生的日志。</span>
└── views           <span class="token comment">#视图模板目录，存放各个模块的视图模板，当然有些项目只有api，是不需要视图部分，可以忽略这个目录</span>
    └── index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gin-框架运行模式" tabindex="-1"><a class="header-anchor" href="#gin-框架运行模式" aria-hidden="true">#</a> Gin 框架运行模式</h3>
<p>为方便调试，Gin 框架在运行的时候默认是debug模式，在控制台默认会打印出很多调试日志，上线的时候我们需要关闭debug模式，改为release模式。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">GIN_MODE</span><span class="token operator">=</span>release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>GIN_MODE</code> 环境变量，可以设置为debug或者release</p>
<p><strong>通过代码设置</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>在main函数，初始化gin框架的时候执行下面代码
<span class="token comment">// 设置 release模式</span>
gin<span class="token punctuation">.</span><span class="token function">SetMode</span><span class="token punctuation">(</span>gin<span class="token punctuation">.</span>ReleaseMode<span class="token punctuation">)</span>
<span class="token comment">// 或者 设置debug模式</span>
gin<span class="token punctuation">.</span><span class="token function">SetMode</span><span class="token punctuation">(</span>gin<span class="token punctuation">.</span>DebugMode<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gin-路由和控制器" tabindex="-1"><a class="header-anchor" href="#gin-路由和控制器" aria-hidden="true">#</a> Gin 路由和控制器</h2>
<p>路由是一个过程，指的是一个<code v-pre>http</code>请求，如何找到对应的处理器函数（也可以叫控制器函数）, <code v-pre>Gin</code>框架的路由是基于<code v-pre>httprouter</code>包实现的。</p>
<p>控制器函数主要负责执行 <code v-pre>http请求-响应任务</code>。</p>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment">// 路由定义post请求, url路径为：/user/login, 绑定doLogin控制器函数</span>
r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/user/login"</span><span class="token punctuation">,</span> doLogin<span class="token punctuation">)</span>

<span class="token comment">// 控制器函数</span>
<span class="token keyword">func</span> <span class="token function">doLogin</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取post请求参数</span>
	username <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">)</span>
	password <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">"password"</span><span class="token punctuation">)</span>

	<span class="token comment">// 通过请求上下文对象Context, 直接往客户端返回一个字符串</span>
	c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">"username=%s,password=%s"</span><span class="token punctuation">,</span> username<span class="token punctuation">,</span>password<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="路由规则" tabindex="-1"><a class="header-anchor" href="#路由规则" aria-hidden="true">#</a> 路由规则</h3>
<p>一条路由规则由三部分组成：</p>
<ul>
<li>http请求方法</li>
<li>url路径</li>
<li>控制器函数</li>
</ul>
<p><strong>http请求方法：</strong></p>
<p>常用的http请求方法有下面4种:</p>
<ul>
<li>GET</li>
<li>POST</li>
<li>PUT</li>
<li>DELETE</li>
</ul>
<p><strong>url路径：</strong></p>
<p>echo框架，url路径有三种写法：</p>
<ul>
<li>静态url路径</li>
<li>带路径参数的url路径</li>
<li>带星号（*）模糊匹配参数的url路径</li>
</ul>
<blockquote>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token operator">/</span> 例子<span class="token number">1</span>， 静态Url路径<span class="token punctuation">,</span> 即不带任何参数的url路径
<span class="token operator">/</span>users<span class="token operator">/</span>center
<span class="token operator">/</span>user<span class="token operator">/</span><span class="token number">111</span>
<span class="token operator">/</span>food<span class="token operator">/</span><span class="token number">12</span>

<span class="token comment">// 例子2，带路径参数的url路径，url路径上面带有参数,参数由冒号（:）跟着一个字符串定义。</span>
<span class="token comment">// 路径参数值可以是数值，也可以是字符串</span>

<span class="token comment">//定义参数:id， 可以匹配/user/1, /user/899 /user/xiaoli 这类Url路径</span>
<span class="token operator">/</span>user<span class="token operator">/</span><span class="token punctuation">:</span>id

<span class="token comment">//定义参数:id， 可以匹配/food/2, /food/100 /food/apple 这类Url路径</span>
<span class="token operator">/</span>food<span class="token operator">/</span><span class="token punctuation">:</span>id

<span class="token comment">//定义参数:type和:page， 可以匹配/foods/2/1, /food/100/25 /food/apple/30 这类Url路径</span>
<span class="token operator">/</span>foods<span class="token operator">/</span><span class="token punctuation">:</span><span class="token keyword">type</span><span class="token operator">/</span><span class="token punctuation">:</span>page

<span class="token comment">// 例子3. 带星号（*）模糊匹配参数的url路径</span>
<span class="token comment">// 星号代表匹配任意路径的意思, 必须在*号后面指定一个参数名，后面可以通过这个参数获取*号匹配的内容。</span>

<span class="token comment">//以/foods/ 开头的所有路径都匹配</span>
<span class="token comment">//匹配：/foods/1， /foods/200, /foods/1/20, /foods/apple/1 </span>
<span class="token operator">/</span>foods<span class="token comment">/*path

//可以通过path参数获取*号匹配的内容。
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p><strong>控制器函数:</strong></p>
<p>控制器函数定义：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">HandlerFunc</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>控制器函数接受一个上下文参数。</p>
<p>可以通过上下文参数，获取http请求参数，响应http请求。</p>
<p><strong>💡简单的一个案例如下：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">//实例化gin实例对象。</span>
r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	
<span class="token comment">//定义post请求, url路径为：/users, 绑定saveUser控制器函数</span>
r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/users"</span><span class="token punctuation">,</span> saveUser<span class="token punctuation">)</span>

<span class="token comment">//定义get请求，url路径为：/users/:id  （:id是参数，例如: /users/10, 会匹配这个url模式），绑定getUser控制器函数</span>
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/users/:id"</span><span class="token punctuation">,</span> getUser<span class="token punctuation">)</span>

<span class="token comment">//定义put请求</span>
r<span class="token punctuation">.</span><span class="token function">PUT</span><span class="token punctuation">(</span><span class="token string">"/users/:id"</span><span class="token punctuation">,</span> updateUser<span class="token punctuation">)</span>

<span class="token comment">//定义delete请求</span>
r<span class="token punctuation">.</span><span class="token function">DELETE</span><span class="token punctuation">(</span><span class="token string">"/users/:id"</span><span class="token punctuation">,</span> deleteUser<span class="token punctuation">)</span>


<span class="token comment">//控制器函数实现</span>
<span class="token keyword">func</span> <span class="token function">saveUser</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>忽略实现<span class="token operator">...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">getUser</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>忽略实现<span class="token operator">...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">updateUser</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>忽略实现<span class="token operator">...</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">deleteUser</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token operator">...</span>忽略实现<span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="分组路由" tabindex="-1"><a class="header-anchor" href="#分组路由" aria-hidden="true">#</a> 分组路由</h3>
<p>在我们做 API 的时候，如果要支持多个 API 的版本，我们可以通过 <strong>分组路由来实现</strong></p>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 创建v1组</span>
	v1 <span class="token operator">:=</span> router<span class="token punctuation">.</span><span class="token function">Group</span><span class="token punctuation">(</span><span class="token string">"/v1"</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
                <span class="token comment">// 在v1这个分组下，注册路由</span>
		v1<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">,</span> loginEndpoint<span class="token punctuation">)</span>
		v1<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/submit"</span><span class="token punctuation">,</span> submitEndpoint<span class="token punctuation">)</span>
		v1<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/read"</span><span class="token punctuation">,</span> readEndpoint<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 创建v2组</span>
	v2 <span class="token operator">:=</span> router<span class="token punctuation">.</span><span class="token function">Group</span><span class="token punctuation">(</span><span class="token string">"/v2"</span><span class="token punctuation">)</span>
	<span class="token punctuation">{</span>
                <span class="token comment">// 在v2这个分组下，注册路由</span>
		v2<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/login"</span><span class="token punctuation">,</span> loginEndpoint<span class="token punctuation">)</span>
		v2<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/submit"</span><span class="token punctuation">,</span> submitEndpoint<span class="token punctuation">)</span>
		v2<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/read"</span><span class="token punctuation">,</span> readEndpoint<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">":8080"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的例子将会注册下面的路由信息：</p>
<ul>
<li>/v1/login</li>
<li>/v1/submit</li>
<li>/v1/read</li>
<li>/v2/login</li>
<li>/v2/submit</li>
<li>/v2/read</li>
</ul>
<blockquote>
<p><strong>Note</strong></p>
<p>一般还是推荐采用合适的目录结构进行分组</p>
</blockquote>
<h3 id="gin如何处理请求参数" tabindex="-1"><a class="header-anchor" href="#gin如何处理请求参数" aria-hidden="true">#</a> Gin如何处理请求参数</h3>
<h4 id="get-请求" tabindex="-1"><a class="header-anchor" href="#get-请求" aria-hidden="true">#</a> Get 请求</h4>
<p>Get请求url例子：*/path?id=1234&amp;name=Manu&amp;value=*111</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code># 获取Get请求参数的常用函数：
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">Query</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">DefaultQuery</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> defaultValue <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">GetQuery</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Handler</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//获取name参数, 通过Query获取的参数值是String类型。</span>
	name <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span>

        <span class="token comment">//获取name参数, 跟Query函数的区别是，可以通过第二个参数设置默认值。</span>
        name <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">DefaultQuery</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"tizi365"</span><span class="token punctuation">)</span>

	<span class="token comment">//获取id参数, 通过GetQuery获取的参数值也是String类型, </span>
	<span class="token comment">// 区别是GetQuery返回两个参数，第一个是参数值，第二个参数是参数是否存在的bool值，可以用来判断参数是否存在。</span>
	id<span class="token punctuation">,</span> ok <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetQuery</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
	   <span class="token comment">// 参数不存在</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="post-请求" tabindex="-1"><a class="header-anchor" href="#post-请求" aria-hidden="true">#</a> Post 请求</h4>
<p>常用的函数：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">PostForm</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">DefaultPostForm</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> defaultValue <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">GetPostForm</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Handler</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//获取name参数, 通过PostForm获取的参数值是String类型。</span>
	name <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">PostForm</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span>

	<span class="token comment">// 跟PostForm的区别是可以通过第二个参数设置参数默认值</span>
	name <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">DefaultPostForm</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"tizi365"</span><span class="token punctuation">)</span>

	<span class="token comment">//获取id参数, 通过GetPostForm获取的参数值也是String类型,</span>
	<span class="token comment">// 区别是GetPostForm返回两个参数，第一个是参数值，第二个参数是参数是否存在的bool值，可以用来判断参数是否存在。</span>
	id<span class="token punctuation">,</span> ok <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">GetPostForm</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
	    <span class="token comment">// 参数不存在</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="获取url路径参数" tabindex="-1"><a class="header-anchor" href="#获取url路径参数" aria-hidden="true">#</a> 获取URL路径参数</h4>
<p>获取URL路径参数，指的是获取 <code v-pre>/user/:id</code>这类型路由绑定的参数，这个例子绑定了一个参数id。</p>
<p>获取url路径参数常用函数：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">Param</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/user/:id"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 获取url参数id</span>
	id <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Param</span><span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="将请求参数绑定到struct对象" tabindex="-1"><a class="header-anchor" href="#将请求参数绑定到struct对象" aria-hidden="true">#</a> 将请求参数绑定到struct对象</h4>
<p>前面获取参数的方式都是一个个参数的读取，比较麻烦，Gin框架支持将请求参数自动绑定到一个struct对象，这种方式支持Get/Post请求，也支持http请求body内容为json/xml格式的参数。</p>
<p>下面例子是将请求参数绑定到User struct对象。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// User 结构体定义</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  Name  <span class="token builtin">string</span> <span class="token string">`json:"name" form:"name"`</span>
  Email <span class="token builtin">string</span> <span class="token string">`json:"email" form:"email"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过定义 <code v-pre>struct</code> 字段的标签，定义请求参数和 <code v-pre>struct</code> 字段的关系。
下面对 <code v-pre>User</code> 的 <code v-pre>Name</code> 字段的标签进行说明。</p>
<p><strong>struct标签说明：</strong></p>
<table>
<thead>
<tr>
<th style="text-align:left">标签</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">json:&quot;name&quot;</td>
<td style="text-align:left">数据格式为json格式，并且json字段名为name</td>
</tr>
<tr>
<td style="text-align:left">form:&quot;name&quot;</td>
<td style="text-align:left">表单参数名为name</td>
</tr>
</tbody>
</table>
<p>下面是控制器代码：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>r<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/user/:id"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 初始化user struct</span>
   u <span class="token operator">:=</span> User<span class="token punctuation">{</span><span class="token punctuation">}</span>
   <span class="token comment">// 通过ShouldBind函数，将请求参数绑定到struct对象， 处理json请求代码是一样的。</span>
   <span class="token comment">// 如果是post请求则根据Content-Type判断，接收的是json数据，还是普通的http请求参数</span>
   <span class="token keyword">if</span> c<span class="token punctuation">.</span><span class="token function">ShouldBind</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>u<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
     <span class="token comment">// 绑定成功， 打印请求参数</span>
     log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>u<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
     log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>u<span class="token punctuation">.</span>Email<span class="token punctuation">)</span>

    <span class="token punctuation">}</span>
    <span class="token comment">// http 请求返回一个字符串 </span>
    c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">"Success"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="gin如何获取客户ip" tabindex="-1"><a class="header-anchor" href="#gin如何获取客户ip" aria-hidden="true">#</a> Gin如何获取客户ip</h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	
r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/ip"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// 获取用户IP</span>
	ip <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">ClientIP</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gin处理请求结果" tabindex="-1"><a class="header-anchor" href="#gin处理请求结果" aria-hidden="true">#</a> Gin处理请求结果</h2>
<p>gin.Context上下文对象支持多种返回处理结果，下面分别介绍不同的响应方式。</p>
<h3 id="以字符串方式响应请求" tabindex="-1"><a class="header-anchor" href="#以字符串方式响应请求" aria-hidden="true">#</a> 以字符串方式响应请求</h3>
<p>通过String函数返回字符串。</p>
<p>函数定义：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (c *Context) String(code int, format string, values ...interface{})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数说明：</p>
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">code</td>
<td style="text-align:left">http状态码</td>
</tr>
<tr>
<td style="text-align:left">format</td>
<td style="text-align:left">返回结果，支持类似Sprintf函数一样的字符串格式定义，例如,%d 代表插入整数，%s代表插入字符串</td>
</tr>
<tr>
<td style="text-align:left">values</td>
<td style="text-align:left">任意个format参数定义的字符串格式参数</td>
</tr>
</tbody>
</table>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Handler</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span>  <span class="token punctuation">{</span>
	<span class="token comment">// 例子1：</span>
	c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token string">"欢迎访问nsddd.top!"</span><span class="token punctuation">)</span>
	
	<span class="token comment">// 例子2： 这里定义了两个字符串参数（两个%s），后面传入的两个字符串参数将会替换对应的%s</span>
	c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token string">"欢迎访问%s, 你是%s"</span><span class="token punctuation">,</span> <span class="token string">"nsddd.top!"</span><span class="token punctuation">,</span><span class="token string">"最靓的仔！"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="以json格式响应请求" tabindex="-1"><a class="header-anchor" href="#以json格式响应请求" aria-hidden="true">#</a> 以json格式响应请求</h3>
<p>我们开发api接口的时候常用的格式就是json，下面是返回json格式数据的例子</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// User 定义</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  Name  <span class="token builtin">string</span> <span class="token string">`json:"name"`</span> <span class="token comment">// 通过json标签定义struct字段转换成json字段的名字。</span>
  Email <span class="token builtin">string</span> <span class="token string">`json:"email"`</span>
<span class="token punctuation">}</span>

<span class="token comment">// Handler 控制器</span>
<span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//初始化user对象</span>
  u <span class="token operator">:=</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span>
    Name<span class="token punctuation">:</span>  <span class="token string">"Xinwei Xiong"</span><span class="token punctuation">,</span>
    Email<span class="token punctuation">:</span> <span class="token string">"3293172751nss@gmail.com"</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>
  <span class="token comment">//返回json数据</span>
  <span class="token comment">//返回结果：{"name":"Xinwei Xiong", "email":"3293172751nss@gmail.com"}</span>
  c<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> u<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="以xml格式响应请求" tabindex="-1"><a class="header-anchor" href="#以xml格式响应请求" aria-hidden="true">#</a> 以xml格式响应请求</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  Name  <span class="token builtin">string</span> <span class="token string">`xml:"name"`</span> <span class="token comment">// 通过xml标签定义struct字段转换成xml字段的名字。</span>
  Email <span class="token builtin">string</span> <span class="token string">`xml:"email"`</span>
<span class="token punctuation">}</span>

c<span class="token punctuation">.</span><span class="token function">XML</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> u<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="以文件格式响应请求" tabindex="-1"><a class="header-anchor" href="#以文件格式响应请求" aria-hidden="true">#</a> 以文件格式响应请求</h3>
<p>下面介绍gin框架如何直接返回一个文件，可以用来做文件下载。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//通过File函数，直接返回本地文件，参数为本地文件地址。</span>
  <span class="token comment">//函数说明：c.File("文件路径")</span>
  c<span class="token punctuation">.</span><span class="token function">File</span><span class="token punctuation">(</span><span class="token string">"/var/www/1.jpg"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

例子<span class="token number">2</span>：
<span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//通过FileAttachment函数，返回本地文件，类似File函数，区别是可以指定下载的文件名。</span>
  <span class="token comment">//函数说明: c.FileAttachment("文件路径", "下载的文件名")</span>
  c<span class="token punctuation">.</span><span class="token function">FileAttachment</span><span class="token punctuation">(</span><span class="token string">"/var/www/1.jpg"</span><span class="token punctuation">,</span> <span class="token string">"1.jpg"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="html模板处理" tabindex="-1"><a class="header-anchor" href="#html模板处理" aria-hidden="true">#</a> html模板处理</h2>
<p>Gin 框架默认封装了golang内置的 <code v-pre>html/template</code> 包用于处理html模版。</p>
<p><strong>使用到了 Go语言 的 template 模板引擎的特性：</strong></p>
<h3 id="go语言模板引擎" tabindex="-1"><a class="header-anchor" href="#go语言模板引擎" aria-hidden="true">#</a> Go语言模板引擎</h3>
<p>Go语言内置了 text/template 和 html/template两个模板库，专门用于处理网页html模板。
html/template 是在 text/template 模板库的基础上增加了对html输出的安全处理，主要目的是为了防止被攻击。</p>
<p><strong>模版引擎使用流程</strong>:</p>
<ol>
<li>编写模版代码</li>
<li>导入包</li>
<li>加载模版代码</li>
<li>根据模版参数渲染模版</li>
</ol>
<p><strong>💡简单的一个案例如下：</strong></p>
<p>将下面模版代码保存至views/demo.tpl文件中， 文件后缀名随意。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">{</span><span class="token punctuation">{</span>define <span class="token string">"demo"</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
昵称： <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">.</span>Name<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token keyword">if</span> <span class="token punctuation">.</span>IsWin<span class="token punctuation">}</span><span class="token punctuation">}</span>
恭喜，大吉大利，今晚吃鸡！
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> <span class="token keyword">else</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
遗憾，鸡被吃光了！
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> end<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token operator">-</span> end<span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>define &quot;模板名&quot; 用于定义子模板，后面渲染模板会用到这个名字。</p>
<p><strong>然后我们导入包</strong>：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">import</span> <span class="token string">"text/template"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>加载模版代码:</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// 加载模版代码，并且创建template对象t</span>
<span class="token comment">// template.ParseGlob 函数加载views目录下的所有tpl为后缀的模版文件</span>
<span class="token comment">// template.Must函数主要用于检测加载的模版有没有错误，有错误输出panic错误，并且结束程序。</span>
t <span class="token operator">:=</span> template<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>template<span class="token punctuation">.</span><span class="token function">ParseGlob</span><span class="token punctuation">(</span><span class="token string">"./views/*.tpl"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>根据模版参数渲染模版</strong></p>
<p>定义模版参数:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">//这里定义一个struct类型的模版参数，实际上模版可以是任意类型数据</span>
<span class="token keyword">type</span> GameStatus <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Name <span class="token builtin">string</span>
    IsWin <span class="token builtin">bool</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>因为只能传入一个模版参数，如果想传入多个模版参数，可以使用map或者struct类型。</p>
</blockquote>
<p>初始化模板参数, 这里初始化一个参数数组，下面用于循环渲染模板。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> userStatus <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>GameStatus<span class="token punctuation">{</span>
    <span class="token punctuation">{</span><span class="token string">"大春"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token string">"NiuBee"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">{</span><span class="token string">"球球"</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是根据userStatus 数组循环渲染模板</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> u <span class="token operator">:=</span> <span class="token keyword">range</span> userStatus <span class="token punctuation">{</span>
    <span class="token comment">//根据参数u, 渲染命名为demo的模板，并且将渲染结果打印到标准输出</span>
    err <span class="token operator">:=</span> t<span class="token punctuation">.</span><span class="token function">ExecuteTemplate</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdout<span class="token punctuation">,</span> <span class="token string">"demo"</span><span class="token punctuation">,</span> u<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"executing template:"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>昵称： 大春<span class="token punctuation">,</span>
恭喜，大吉大利，今晚吃鸡！
昵称： NiuBee<span class="token punctuation">,</span>
遗憾，鸡被吃光了！
昵称： 球球<span class="token punctuation">,</span>
恭喜，大吉大利，今晚吃鸡！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="gin-返回模板的案例" tabindex="-1"><a class="header-anchor" href="#gin-返回模板的案例" aria-hidden="true">#</a> Gin 返回模板的案例</h3>
<p>💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 初始化gin对象</span>
	router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token comment">// 首先加载templates目录下面的所有模版文件，模版文件扩展名随意</span>
	router<span class="token punctuation">.</span><span class="token function">LoadHTMLGlob</span><span class="token punctuation">(</span><span class="token string">"templates/*"</span><span class="token punctuation">)</span>

        <span class="token comment">// 绑定一个url路由 /index</span>
	router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/index"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 通过HTML函数返回html代码</span>
                <span class="token comment">// 第二个参数是模版文件名字</span>
                <span class="token comment">// 第三个参数是map类型，代表模版参数</span>
                <span class="token comment">// gin.H 是map[string]interface{}类型的别名</span>
		c<span class="token punctuation">.</span><span class="token function">HTML</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusOK<span class="token punctuation">,</span> <span class="token string">"index.html"</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
			<span class="token string">"title"</span><span class="token punctuation">:</span> <span class="token string">"Main website"</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token comment">// 启动http服务，并且绑定在8080端口</span>
	router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token string">":8080"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>模版代码</p>
<p>文件名：templates/index.html</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>

    <span class="token string">"github.com/gin-gonic/gin"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/cookie"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token comment">// 设置cookie</span>
       c<span class="token punctuation">.</span><span class="token function">SetCookie</span><span class="token punctuation">(</span><span class="token string">"site_cookie"</span><span class="token punctuation">,</span> <span class="token string">"cookievalue"</span><span class="token punctuation">,</span> <span class="token number">3600</span><span class="token punctuation">,</span> <span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token string">"localhost"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">/</span>h1<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gin框架如何处理cookie" tabindex="-1"><a class="header-anchor" href="#gin框架如何处理cookie" aria-hidden="true">#</a> Gin框架如何处理cookie</h2>
<p>cookie通常用于在浏览器中保存一些小数据，例如客户标识、用户非铭感数据。注意别使用cookie保存隐私数据。</p>
<p>gin框架主要通过上下文对象提供的SetCookie和Cookie两个函数操作cookie</p>
<h3 id="设置cookie" tabindex="-1"><a class="header-anchor" href="#设置cookie" aria-hidden="true">#</a> 设置cookie</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"fmt"</span>

    <span class="token string">"github.com/gin-gonic/gin"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

    router <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    router<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">"/cookie"</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token comment">// 设置cookie</span>
       c<span class="token punctuation">.</span><span class="token function">SetCookie</span><span class="token punctuation">(</span><span class="token string">"site_cookie"</span><span class="token punctuation">,</span> <span class="token string">"cookievalue"</span><span class="token punctuation">,</span> <span class="token number">3600</span><span class="token punctuation">,</span> <span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token string">"localhost"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>

    router<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SetCookie函数定义：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Context<span class="token punctuation">)</span> <span class="token function">SetCookie</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> value <span class="token builtin">string</span><span class="token punctuation">,</span> maxAge <span class="token builtin">int</span><span class="token punctuation">,</span> path<span class="token punctuation">,</span> domain <span class="token builtin">string</span><span class="token punctuation">,</span> secure<span class="token punctuation">,</span> httpOnly <span class="token builtin">bool</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>参数说明：</p>
<table>
<thead>
<tr>
<th>参数名</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>name</td>
<td>string</td>
<td>cookie名字</td>
</tr>
<tr>
<td>value</td>
<td>string</td>
<td>cookie值</td>
</tr>
<tr>
<td>maxAge</td>
<td>int</td>
<td>有效时间，单位是秒，MaxAge=0 忽略MaxAge属性，MaxAge&lt;0 相当于删除cookie, 通常可以设置-1代表删除，MaxAge&gt;0 多少秒后cookie失效</td>
</tr>
<tr>
<td>path</td>
<td>string</td>
<td>cookie路径</td>
</tr>
<tr>
<td>domain</td>
<td>string</td>
<td>cookie作用域</td>
</tr>
<tr>
<td>secure</td>
<td>bool</td>
<td>Secure=true，那么这个cookie只能用https协议发送给服务器</td>
</tr>
<tr>
<td>httpOnly</td>
<td>bool</td>
<td>设置HttpOnly=true的cookie不能被js获取到</td>
</tr>
</tbody>
</table>
<h3 id="读取-cookie" tabindex="-1"><a class="header-anchor" href="#读取-cookie" aria-hidden="true">#</a> 读取 cookie</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Handler</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 根据cookie名字读取cookie值</span>
      data<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">Cookie</span><span class="token punctuation">(</span><span class="token string">"site_cookie"</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	 <span class="token comment">// 直接返回cookie值</span>
	 c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span>data<span class="token punctuation">)</span>
	 <span class="token keyword">return</span>
      <span class="token punctuation">}</span>
      c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token string">"not found!"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="删除-cookie" tabindex="-1"><a class="header-anchor" href="#删除-cookie" aria-hidden="true">#</a> 删除 cookie</h3>
<p>通过将cookie的MaxAge设置为-1, 达到删除cookie的目的。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Handler</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 设置cookie  MaxAge设置为-1，表示删除cookie</span>
       c<span class="token punctuation">.</span><span class="token function">SetCookie</span><span class="token punctuation">(</span><span class="token string">"site_cookie"</span><span class="token punctuation">,</span> <span class="token string">"cookievalue"</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token string">"localhost"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
      c<span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span><span class="token string">"删除cookie演示"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="go-和-gin-开发-restful-api" tabindex="-1"><a class="header-anchor" href="#go-和-gin-开发-restful-api" aria-hidden="true">#</a> Go 和 Gin 开发 RESTful API</h2>
<ul>
<li><a href="https://go.p2hp.com/go.dev/doc/tutorial/web-service-gin" target="_blank" rel="noopener noreferrer">官方案例<ExternalLinkIcon/></a></li>
</ul>
<h2 id="gin-源码学习" tabindex="-1"><a class="header-anchor" href="#gin-源码学习" aria-hidden="true">#</a> Gin 源码学习</h2>
<p>Gin 的源码主要由以下几部分组成:</p>
<ol>
<li>
<p><code v-pre>Engine</code>:代表一个 Gin 实例,维护中间件、路由信息等</p>
</li>
<li>
<p><code v-pre>Router</code>:实现路由查找及分发请求的逻辑</p>
</li>
<li>
<p><code v-pre>Context</code>:封装 Request 和 Response,提供一系列方便的方法访问 request/response</p>
</li>
<li>
<p><code v-pre>Middleware</code>: 中间件相关代码</p>
</li>
<li>
<p><code v-pre>Render</code>: 提供 JSON、XML、YAML、HTML 等响应渲染方法</p>
</li>
<li>
<p><code v-pre>File</code>: 文件上传及服务相关方法</p>
</li>
<li>
<p><code v-pre>ErrorHandler</code>:  错误处理中间件</p>
</li>
</ol>
<p>这些部分组合在一起,构成了 Gin 这个轻量级 Web 框架。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '67.md' style='float:left'>⬆️上一节🔗  </a><a href = '69.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


