<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第67节-深入学习-beego-源码" tabindex="-1"><a class="header-anchor" href="#第67节-深入学习-beego-源码" aria-hidden="true">#</a> 第67节 深入学习 beego 源码</h1>
<div><a href = '66.md' style='float:left'>⬆️上一节🔗  </a><a href = '68.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s，docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>Beego 用于快速开发 Go 中的企业应用程序，包括 RESTful API、Web 应用程序和后端服务。</p>
<p><strong>GitHub地址：</strong></p>
<ul>
<li><a href="https://github.com/beego/beego/" target="_blank" rel="noopener noreferrer">https://github.com/beego/beego/<ExternalLinkIcon/></a></li>
</ul>
<hr>
<p><img src="http://sm.nsddd.top/sm202305191917988.png" alt="architecture"></p>
<p><strong>Beego由四个部分组成：</strong></p>
<ol>
<li>基础模块：包括日志模块、配置模块、调速器模块;</li>
<li>任务：用于运行定时任务或周期性任务;</li>
<li>客户端：包括ORM模块、httplib模块、缓存模块;</li>
<li>服务器：包括网络模块。我们将来支持 gRPC;</li>
</ol>
<p>Beego 就相当于是一个 <strong>积木式集合</strong>，将每一个模块都集成在项目中，比如说 cache 的缓存模块。</p>
<h3 id="mvc-架构" tabindex="-1"><a class="header-anchor" href="#mvc-架构" aria-hidden="true">#</a> MVC 架构</h3>
<p>这里使用markdown Draw.io的mermaid扩展来画MVC架构图:</p>
<div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
    client<span class="token text string">(Client)</span> <span class="token arrow operator">--></span> view<span class="token text string">(View)</span>
    view <span class="token arrow operator">--></span> controller<span class="token text string">(Controller)</span>
    controller <span class="token arrow operator">--></span> model<span class="token text string">(Model)</span>
    model <span class="token arrow operator">--></span> database<span class="token text string">(Database)</span>

    <span class="token keyword">classDef</span> blue <span class="token style"><span class="token property">fill</span><span class="token operator">:</span>#bbf<span class="token punctuation">,</span><span class="token property">stroke</span><span class="token operator">:</span>#f66<span class="token punctuation">,</span><span class="token property">stroke-width</span><span class="token operator">:</span>2px</span><span class="token punctuation">;</span>
    <span class="token keyword">classDef</span> orange <span class="token style"><span class="token property">fill</span><span class="token operator">:</span>#f96<span class="token punctuation">,</span><span class="token property">stroke</span><span class="token operator">:</span>#f66<span class="token punctuation">,</span><span class="token property">stroke-width</span><span class="token operator">:</span>2px</span><span class="token punctuation">;</span>
    <span class="token keyword">classDef</span> green <span class="token style"><span class="token property">fill</span><span class="token operator">:</span>#9f9<span class="token punctuation">,</span><span class="token property">stroke</span><span class="token operator">:</span>#0f0<span class="token punctuation">,</span><span class="token property">stroke-width</span><span class="token operator">:</span>2px</span><span class="token punctuation">;</span>

    <span class="token keyword">class</span> Client blue
    <span class="token keyword">class</span> View blue
    <span class="token keyword">class</span> Controller orange
    <span class="token keyword">class</span> Model orange
    <span class="token keyword">class</span> Database green
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个图展示了一个基本的MVC架构:- 客户端(Client)调用View层</p>
<ul>
<li>客户端(Client)调用View层</li>
<li>View层接收客户端请求，委托给Controller层</li>
<li>Controller层调用Model层获取数据或业务逻辑</li>
<li>Model层将请求转发给数据库</li>
<li>数据库查询响应，Model层将结果返回给Controller</li>
<li>Controller层将Model层结果返回给View层</li>
<li>View层将结果呈现给客户端</li>
</ul>
<p>beego 使用的架构是 MVC 架构：</p>
<p><img src="http://sm.nsddd.top/sm202305191932281.png" alt="Http Request"></p>
<p>流程图说明：</p>
<ol>
<li>http请求从左侧main入口函数开始进入框架</li>
<li>UrL路由解析然后确定执行那个控制器(controller)</li>
<li>执行请求前的过滤器 （过滤器一般用来拦截请求，例如做api签名校验，session处理，安全验证等等）</li>
<li>执行控制器 （控制器根据需要调用model，session, 日志等模块）</li>
<li>执行请求后的过滤器</li>
<li>视图输出返回给用户</li>
</ol>
<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<p>beego 是一个 Go 语言开发的 Web 框架，它的目录结构如下:</p>
<ul>
<li>
<p><code v-pre>app</code>: 用于放置应用程序的控制器、模型、视图等。</p>
</li>
<li>
<p><code v-pre>conf</code>: 用于放置配置文件，如 app.conf。</p>
</li>
<li>
<p><code v-pre>controllers</code>: 用于放置控制器代码，控制器负责解析用户的输入，处理后返回相应的结果。</p>
</li>
<li>
<p><code v-pre>models</code>: 用于放置模型代码，模型是与数据库交互的部分。</p>
</li>
<li>
<p><code v-pre>routers</code>: 用于设置 URL 路由映射，比如将 /user 映射到 controllers/user.go。</p>
</li>
<li>
<p><code v-pre>static</code>: 用于放置静态资源，如 JS、CSS、图片等。</p>
</li>
<li>
<p><code v-pre>tests</code>: 用于放置测试代码。</p>
</li>
<li>
<p><code v-pre>views</code>: 用于放置模板文件，beego 支持多种模板，如 goTemplate、fastTemplate 等。</p>
</li>
<li>
<p><code v-pre>main.go</code>: 程序入口文件，用于初始化 Beego。</p>
</li>
<li>
<p><code v-pre>conf/</code>: 用于存放配置文件</p>
</li>
<li>
<p><code v-pre>logs/</code>: 用于存放日志文件</p>
</li>
</ul>
<p>除此之外，还有:</p>
<ul>
<li><code v-pre>cache</code>: 用于设置缓存，如 redis、memcached 等。</li>
<li><code v-pre>toolbox</code>: 用于放置工具函数。</li>
<li><code v-pre>docs</code>: 用于放置文档。</li>
<li><code v-pre>plugins</code>: beego 的插件机制允许开发者扩展更多功能。</li>
</ul>
<h3 id="beego-安装" tabindex="-1"><a class="header-anchor" href="#beego-安装" aria-hidden="true">#</a> Beego 安装</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go get github.com/beego/beego/v2@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>命令：</strong></p>
<ul>
<li>new：基于网站开发</li>
<li>api：手机接口开发</li>
<li>run：运行</li>
</ul>
<h2 id="beego-使用" tabindex="-1"><a class="header-anchor" href="#beego-使用" aria-hidden="true">#</a> Beego 使用</h2>
<h3 id="new" tabindex="-1"><a class="header-anchor" href="#new" aria-hidden="true">#</a> new</h3>
<p><code v-pre>new</code>: 用于创建一个 beego 项目的脚手架</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>beego new PROJECT_NAME
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令会创建一个文件夹 PROJECT_NAME,并在里面初始化 beego 项目的基本目录结构和文件。</p>
<h3 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> api</h3>
<p><code v-pre>api</code>:用于快速创建 RESTful API 服务。格式为:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>beego api <span class="token punctuation">[</span>name<span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令会自动在 controllers 目录下创建名为 name 的 API 控制器,并在 <code v-pre>conf/app.conf</code> 里注册该 API。</p>
<h3 id="run" tabindex="-1"><a class="header-anchor" href="#run" aria-hidden="true">#</a> run</h3>
<p><code v-pre>run</code>: 用于运行和编译 beego 项目。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>beego run   <span class="token comment"># 运行项目</span>
beego build <span class="token comment"># 编译项目</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>run 命令会监听文件变化并自动编译和重载,方便开发调试。build 命令会编译生成可执行文件,用于部署上线。</p>
<p>所以,如果你要开发一个 beego Web应用,通常的流程是:</p>
<ol>
<li>
<p>使用 beego new myproject 初始化项目</p>
</li>
<li>
<p>编写代码(控制器、模型、路由等)</p>
</li>
<li>
<p>使用 beego run 运行项目进行开发调试</p>
</li>
<li>
<p>使用 beego build 编译发布可执行文件</p>
</li>
<li>
<p>部署可执行文件到生产环境</p>
</li>
</ol>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<h3 id="控制器的逻辑" tabindex="-1"><a class="header-anchor" href="#控制器的逻辑" aria-hidden="true">#</a> 控制器的逻辑</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> controllers

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	beego <span class="token string">"github.com/beego/beego/v2/server/web"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义一个控制器结构体</span>
<span class="token comment">// 我们一般一个模块定义一个控制器</span>
<span class="token keyword">type</span> MainController <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// 嵌套beego基础控制器，在go语言中嵌套struct，就类似继承的概念。</span>
    <span class="token comment">// 这里就相当于，继承了beego.Controller的方法和属性。</span>
	beego<span class="token punctuation">.</span>Controller 
<span class="token punctuation">}</span>

<span class="token comment">// 覆盖beego.Controller的Get方法，用于处理RESTful请求中的get请求</span>
<span class="token comment">// beego.Controller默认支持多种RESTful方法，例如：Post、Put、Delete等等</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>MainController<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Data是继承过来的属性，是map类型，可以保存任意类型数据，主要用于保存请求响应数据</span>
    <span class="token comment">// 我们可以通过Data将参数，传入视图模板文件。</span>
	<span class="token comment">// 这里设置了两个参数</span>
	c<span class="token punctuation">.</span>Data<span class="token punctuation">[</span><span class="token string">"Website"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"nsddd.com"</span>
	c<span class="token punctuation">.</span>Data<span class="token punctuation">[</span><span class="token string">"Email"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"nsddd@demo.com"</span>
	
	<span class="token comment">// 设置需要渲染的模板文件，框架会去views目录查找这个模板文件</span>
	c<span class="token punctuation">.</span>TplName <span class="token operator">=</span> <span class="token string">"index.tpl"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="设置url路由" tabindex="-1"><a class="header-anchor" href="#设置url路由" aria-hidden="true">#</a> 设置Url路由</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> routers

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"nsddd/controllers"</span>
	beego <span class="token string">"github.com/beego/beego/v2/server/web"</span>
<span class="token punctuation">)</span>

<span class="token comment">// go 包初始化函数，go语言中在导入一个包的时候，如果被导入包存在init函数，会执行init函数</span>
<span class="token comment">// 因此这里可以使用init函数初始化路由设置</span>
<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 使用beego.Router函数，注册路由规则。</span>
    <span class="token comment">// 第一个参数是url路由，第二个参数是控制器</span>
    <span class="token comment">// 这里的意思就是将访问 / 这个url的请求，交给controllers.MainController控制器处理。</span>
    beego<span class="token punctuation">.</span><span class="token function">Router</span><span class="token punctuation">(</span><span class="token string">"/"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>controllers<span class="token punctuation">.</span>MainController<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们增加下面路由设置:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>beego<span class="token punctuation">.</span><span class="token function">Router</span><span class="token punctuation">(</span><span class="token string">"/nsddd"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>controllers<span class="token punctuation">.</span>MainController<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>访问:http://localhost:8080/nsddd 和 http://localhost:8080/ 得到的结果一样，因为这两个url地址都是由同一个控制器处理。</p>
<p><code v-pre>beego RESTful</code>路由规则，默认是通过 <strong>请求方法</strong> 确认由那个控制器方法执行，例如get请求，由Get方法执行，POST请求由Post方法执行。</p>
<h3 id="编写model逻辑" tabindex="-1"><a class="header-anchor" href="#编写model逻辑" aria-hidden="true">#</a> 编写model逻辑</h3>
<p>这里我们看一个mysql数据库操作的例子。</p>
<p><em>定义表的结构：</em></p>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '自增ID',
  `username` varchar(30) NOT NULL COMMENT '账号',
  `password` varchar(100) NOT NULL COMMENT '密码',
   PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="初始化数据库连接" tabindex="-1"><a class="header-anchor" href="#初始化数据库连接" aria-hidden="true">#</a> 初始化数据库连接</h3>
<p>一般初始化数据库连接都是在main.go入口的地方设置一次就行，下面看下main.go文件改成什么样了。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	beego <span class="token string">"github.com/beego/beego/v2/server/web"</span>
	<span class="token string">"github.com/beego/beego/v2/client/orm"</span>
	<span class="token boolean">_</span> <span class="token string">"nsddd/routers"</span>
	<span class="token comment">//导入mysql驱动，这是必须的</span>
	<span class="token boolean">_</span> <span class="token string">"github.com/go-sql-driver/mysql"</span>
<span class="token punctuation">)</span>

<span class="token comment">//初始化应用设置， 我们通过init函数初始化数据库连接，go语言中这个函数会优先执行</span>
<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里注册一个default默认数据库，数据库驱动是mysql.</span>
    <span class="token comment">// 第三个参数是数据库dsn, 配置数据库的账号密码，数据库名等参数</span>
    <span class="token comment">//  dsn参数说明：</span>
    <span class="token comment">//      username    - mysql账号</span>
    <span class="token comment">//      password    - mysql密码</span>
    <span class="token comment">//      db_name     - 数据库名</span>
    <span class="token comment">//      127.0.0.1:3306 - 数据库的地址和端口</span>
	orm<span class="token punctuation">.</span><span class="token function">RegisterDataBase</span><span class="token punctuation">(</span><span class="token string">"default"</span><span class="token punctuation">,</span> <span class="token string">"mysql"</span><span class="token punctuation">,</span> <span class="token string">"username:password@tcp(127.0.0.1:3306)/db_name?charset=utf8"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	beego<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="初始化数据库连接-1" tabindex="-1"><a class="header-anchor" href="#初始化数据库连接-1" aria-hidden="true">#</a> 初始化数据库连接</h3>
<blockquote>
<p>一般初始化数据库连接都是在main.go入口的地方设置一次就行，下面看下main.go文件改成什么样了。</p>
</blockquote>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	beego <span class="token string">"github.com/beego/beego/v2/server/web"</span>
	<span class="token string">"github.com/beego/beego/v2/client/orm"</span>
	<span class="token boolean">_</span> <span class="token string">"nsddd/routers"</span>
	<span class="token comment">//导入mysql驱动，这是必须的</span>
	<span class="token boolean">_</span> <span class="token string">"github.com/go-sql-driver/mysql"</span>
<span class="token punctuation">)</span>

<span class="token comment">//初始化应用设置， 我们通过init函数初始化数据库连接，go语言中这个函数会优先执行</span>
<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里注册一个default默认数据库，数据库驱动是mysql.</span>
    <span class="token comment">// 第三个参数是数据库dsn, 配置数据库的账号密码，数据库名等参数</span>
    <span class="token comment">//  dsn参数说明：</span>
    <span class="token comment">//      username    - mysql账号</span>
    <span class="token comment">//      password    - mysql密码</span>
    <span class="token comment">//      db_name     - 数据库名</span>
    <span class="token comment">//      127.0.0.1:3306 - 数据库的地址和端口</span>
	orm<span class="token punctuation">.</span><span class="token function">RegisterDataBase</span><span class="token punctuation">(</span><span class="token string">"default"</span><span class="token punctuation">,</span> <span class="token string">"mysql"</span><span class="token punctuation">,</span> <span class="token string">"username:password@tcp(127.0.0.1:3306)/db_name?charset=utf8"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	beego<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了初始化mysql连接，在入口main.go文件，增加init函数初始化数据库设置。</p>
<h3 id="创建model" tabindex="-1"><a class="header-anchor" href="#创建model" aria-hidden="true">#</a> 创建model</h3>
<p>然后创建一个user model, 文件路径：nsddd/models/user.go , 代码如下</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> models

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/beego/beego/v2/client/orm"</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义User模型，绑定users表结构, 其实就是用来保存sql查询结果。</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id <span class="token builtin">int</span>
	Username <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// 定义User 模型绑定那个表？</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">TableName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token comment">// 返回mysql表名</span>
	<span class="token keyword">return</span> <span class="token string">"users"</span>
<span class="token punctuation">}</span>

<span class="token comment">//初始化函数，可以用来向orm注册model</span>
<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 向orm注册user模型</span>
	orm<span class="token punctuation">.</span><span class="token function">RegisterModel</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>User<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// 根据id查询用户信息</span>
<span class="token keyword">func</span> <span class="token function">GetUserById</span><span class="token punctuation">(</span>id <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>User <span class="token punctuation">{</span>
	<span class="token keyword">if</span>  id <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>  <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 创建orm对象, 后面都是通过orm对象操作数据库</span>
	o <span class="token operator">:=</span> orm<span class="token punctuation">.</span><span class="token function">NewOrm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	
	<span class="token comment">// 初始化一个User模型对象</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">// 设置查询参数</span>
	user<span class="token punctuation">.</span>Id <span class="token operator">=</span> id
	
	<span class="token comment">// 调用Read方法，根据user设置的参数，查询一条记录，结果保存到user结构体变量中</span>
	<span class="token comment">// 默认是根据主键进行查询</span>
	<span class="token comment">// 等价sql： SELECT `id`, `username`, `password` FROM `users` WHERE `id` = 1</span>
	err <span class="token operator">:=</span> o<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
	
	<span class="token comment">// 检测查询结果，</span>
	<span class="token keyword">if</span> err <span class="token operator">==</span> orm<span class="token punctuation">.</span>ErrNoRows <span class="token punctuation">{</span>
		<span class="token comment">// 找不到记录</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> err <span class="token operator">==</span> orm<span class="token punctuation">.</span>ErrMissPK <span class="token punctuation">{</span>
		<span class="token comment">// 找不到住建</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>user
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过控制器调用model" tabindex="-1"><a class="header-anchor" href="#通过控制器调用model" aria-hidden="true">#</a> 通过控制器调用model</h3>
<p>修改 控制器的代码，事实上 控制器也是最后去操作的，我们第一步应该处理数据库的一些操作。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>MainController<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>Data<span class="token punctuation">[</span><span class="token string">"Website"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"nsddd.com"</span>
	c<span class="token punctuation">.</span>Data<span class="token punctuation">[</span><span class="token string">"Email"</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">"nsddd@demo.com"</span>
	
	<span class="token comment">// 调用model，查询用户id为1 的用户信息</span>
    user <span class="token operator">:=</span> models<span class="token punctuation">.</span><span class="token function">GetUserById</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	
	<span class="token comment">// 然后将user数据保存到Data中, 将参数传给后面的views视图模板处理</span>
	c<span class="token punctuation">.</span>Data<span class="token punctuation">[</span><span class="token string">"user"</span><span class="token punctuation">]</span> <span class="token operator">=</span> user
	
	<span class="token comment">// 使用新的视图模板user.tpl</span>
	c<span class="token punctuation">.</span>TplName <span class="token operator">=</span> <span class="token string">"user.tpl"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写view视图逻辑" tabindex="-1"><a class="header-anchor" href="#编写view视图逻辑" aria-hidden="true">#</a> 编写view视图逻辑</h3>
<p>这里编写一个新的视图模板, 代码如下:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">></span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string">"zh-CN"</span><span class="token operator">></span>
<span class="token operator">&lt;</span>head<span class="token operator">></span>
	<span class="token operator">&lt;</span>title<span class="token operator">></span>Demo<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">></span>
	<span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string">"utf-8"</span><span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">></span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span>h1<span class="token operator">></span>网站<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">.</span>Website<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">></span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token keyword">if</span> <span class="token punctuation">.</span>user <span class="token punctuation">}</span><span class="token punctuation">}</span>
用户名<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">.</span>user<span class="token punctuation">.</span>Username<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token keyword">else</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
查找不到用户
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问url: <a href="http://localhost:8080/" target="_blank" rel="noopener noreferrer">http://localhost:8080<ExternalLinkIcon/></a>, 如果查询的用户存在，则显示用户名，否则显示查找不到用户。</p>
<h3 id="项目打包" tabindex="-1"><a class="header-anchor" href="#项目打包" aria-hidden="true">#</a> 项目打包</h3>
<p>项目完成后需要将代码打包发布到线上，这里依然推荐使用bee工具打包，bee工具可以一键将项目需要的相关文件一起打包成一个压缩包，只需要到线上解压即可。</p>
<p>下面是bee打包的例子， 首先将命令窗口的目录切换到 &quot;项目根目录&quot;, 然后执行下面命令</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>bee pack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打包成功后再项目根目录下生成一个 <code v-pre>nsddd.tar.gz</code> 的压缩包，命名格式: <code v-pre>${项目名}.tar.gz</code></p>
<p>我们可以解压缩，看看压缩包包含什么内容：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>nsddd.tar.gz
├── conf            - 配置文件存放目录,这里包含我们的配置文件
├── static          - 静态资源目录，包含我们静态资源文件
├── views           - 视图模板目录，包含模板文件
└── nsddd         - 这个就是我们的项目打包后的可执行程序，按我们项目命名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="beego-源码" tabindex="-1"><a class="header-anchor" href="#beego-源码" aria-hidden="true">#</a> beego 源码</h2>
<p>官方提供的示例非常简单：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">"github.com/astaxie/beego"</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    beego<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么，从<code v-pre>Run()</code>方法开始，在<a href="https://github.com/astaxie/beego/blob/master/beego.go#L179" target="_blank" rel="noopener noreferrer">beego.go#179<ExternalLinkIcon/></a>：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initBeforeHTTPRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> EnableAdmin <span class="token punctuation">{</span>
        <span class="token keyword">go</span> beeAdminApp<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    BeeApp<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在最里面的看看 <code v-pre>initBeforeHTTPRun()</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// TODO move to module init function</span>
<span class="token keyword">func</span> <span class="token function">initBeforeHTTPRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	initHttpOnce<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// init hooks</span>
		<span class="token function">AddAPPStartHook</span><span class="token punctuation">(</span>
			registerMime<span class="token punctuation">,</span>
			registerDefaultErrorHandler<span class="token punctuation">,</span>
			registerSession<span class="token punctuation">,</span>
			registerTemplate<span class="token punctuation">,</span>
			registerAdmin<span class="token punctuation">,</span>
			registerGzip<span class="token punctuation">,</span>
			<span class="token comment">// registerCommentRouter,</span>
		<span class="token punctuation">)</span>

		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> hk <span class="token operator">:=</span> <span class="token keyword">range</span> hooks <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">hk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从代码看到在<code v-pre>Run()</code>的第一步，初始化<code v-pre>AppConfig</code>，调用<code v-pre>hooks</code>，初始化<code v-pre>GlobalSessions</code>，编译模板<code v-pre>BuildTemplate()</code>，和加载中间件<code v-pre>middleware.RegisterErrorHandler()</code>，分别简单叙述。</p>
<h3 id="加载配置" tabindex="-1"><a class="header-anchor" href="#加载配置" aria-hidden="true">#</a> 加载配置</h3>
<p>加载配置的代码是：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> AppConfigPath <span class="token operator">!=</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>AppPath<span class="token punctuation">,</span> <span class="token string">"conf"</span><span class="token punctuation">,</span> <span class="token string">"app.conf"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    err <span class="token operator">:=</span> <span class="token function">ParseConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> AppConfigPath <span class="token operator">!=</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>workPath<span class="token punctuation">,</span> <span class="token string">"conf"</span><span class="token punctuation">,</span> <span class="token string">"app.conf"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// configuration is critical to app, panic here if parse failed</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>判断配置文件是不是<code v-pre>AppPath/conf/app.conf</code>，如果不是就<code v-pre>ParseConfig()</code>。显然他之前就已经加载过一次了。找了一下，在<a href="https://github.com/astaxie/beego/blob/master/config.go#L152" target="_blank" rel="noopener noreferrer">config.go#L152<ExternalLinkIcon/></a>，具体加载什么就不说明了。需要说明的是<code v-pre>AppPath</code>和<code v-pre>workPath</code>这俩变量。找到定义<a href="https://github.com/astaxie/beego/blob/master/config.go#L72" target="_blank" rel="noopener noreferrer">config.go#72<ExternalLinkIcon/></a>：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>workPath<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> os<span class="token punctuation">.</span><span class="token function">Getwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
workPath<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> filepath<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span>workPath<span class="token punctuation">)</span>
<span class="token comment">// initialize default configurations</span>
AppPath<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> filepath<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span>filepath<span class="token punctuation">.</span><span class="token function">Dir</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

AppConfigPath <span class="token operator">=</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>AppPath<span class="token punctuation">,</span> <span class="token string">"conf"</span><span class="token punctuation">,</span> <span class="token string">"app.conf"</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> workPath <span class="token operator">!=</span> AppPath <span class="token punctuation">{</span>
    <span class="token keyword">if</span> utils<span class="token punctuation">.</span><span class="token function">FileExists</span><span class="token punctuation">(</span>AppConfigPath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        os<span class="token punctuation">.</span><span class="token function">Chdir</span><span class="token punctuation">(</span>AppPath<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        AppConfigPath <span class="token operator">=</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>workPath<span class="token punctuation">,</span> <span class="token string">"conf"</span><span class="token punctuation">,</span> <span class="token string">"app.conf"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>workPath</code>是<code v-pre>os.Getwd()</code>，即当前的目录；<code v-pre>AppPath</code>是<code v-pre>os.Args[0]</code>，即二进制文件所在目录。有些情况下这两个是不同的。比如把命令加到<code v-pre>PATH</code>中，然后cd到别的目录执行。<code v-pre>beego</code>以二进制文件所在目录为优先。如果二进制文件所在目录没有发现<code v-pre>conf/app.conf</code>，再去<code v-pre>workPath</code>里找。</p>
<h3 id="hooks" tabindex="-1"><a class="header-anchor" href="#hooks" aria-hidden="true">#</a> Hooks</h3>
<p><code v-pre>hooks</code>就是钩子，在加载配置后就执行，这是要做啥呢？在 <a href="https://github.com/astaxie/beego/blob/master/beego.go#L173" target="_blank" rel="noopener noreferrer">beego.go#L173<ExternalLinkIcon/></a> 添加新的hook：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// The hookfunc will run in beego.Run()</span>
<span class="token comment">// such as sessionInit, middlerware start, buildtemplate, admin start</span>
<span class="token keyword">func</span> <span class="token function">AddAPPStartHook</span><span class="token punctuation">(</span>hf hookfunc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    hooks <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>hooks<span class="token punctuation">,</span> hf<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>hooks</code>的定义在<a href="https://github.com/astaxie/beego/blob/master/beego.go#L19" target="_blank" rel="noopener noreferrer">beego.go#L19<ExternalLinkIcon/></a>：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> hookfunc <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token comment">//hook function to run</span>
<span class="token keyword">var</span> hooks <span class="token punctuation">[</span><span class="token punctuation">]</span>hookfunc       <span class="token comment">//hook function slice to store the hookfunc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>hook</code>就是<code v-pre>func() error</code>类型的函数。那么为什么调用<code v-pre>hooks</code>可以实现代码注释中的如<code v-pre>middleware start, build template</code>呢？因为<code v-pre>beego</code>使用的是单实例的模式。</p>
<h3 id="单实例" tabindex="-1"><a class="header-anchor" href="#单实例" aria-hidden="true">#</a> 单实例</h3>
<p><code v-pre>beego</code>的核心结构是<code v-pre>beego.APP</code>，保存路由调度结构<code v-pre>*beego.ControllerRegistor</code>。从<code v-pre>beego.Run()</code>方法的代码<code v-pre>BeeApp.Run()</code>发现，<code v-pre>beego</code>有一个全局变量<code v-pre>BeeApp</code>是实际调用的<code v-pre>*beego.APP</code>实例。也就是说整个<code v-pre>beego</code>就是一个实例，不需要类似<code v-pre>NewApp()</code>这样的写法。</p>
<p>因此，很多结构都作为全局变量如<code v-pre>beego.BeeApp</code>暴露在外。详细的定义在 <a href="https://github.com/astaxie/beego/blob/master/config.go#L18" target="_blank" rel="noopener noreferrer">config.go#L18<ExternalLinkIcon/></a>，特别注意一下<code v-pre>SessionProvider(string)</code>，马上就要提到。</p>
<h3 id="会话-globalsessions" tabindex="-1"><a class="header-anchor" href="#会话-globalsessions" aria-hidden="true">#</a> 会话 <code v-pre>GlobalSessions</code></h3>
<p>继续<code v-pre>beego.Run()</code>的阅读，<code v-pre>hooks</code>调用完毕后，初始化会话<code v-pre>GlobalSessions</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if SessionOn {
    var err error
    sessionConfig := AppConfig.String("sessionConfig")
    if sessionConfig == "" {
        sessionConfig = `{"cookieName":"` + SessionName + `",` +
            `"gclifetime":` + strconv.FormatInt(SessionGCMaxLifetime, 10) + `,` +
            `"providerConfig":"` + SessionSavePath + `",` +
            `"secure":` + strconv.FormatBool(HttpTLS) + `,` +
            `"sessionIDHashFunc":"` + SessionHashFunc + `",` +
            `"sessionIDHashKey":"` + SessionHashKey + `",` +
            `"enableSetCookie":` + strconv.FormatBool(SessionAutoSetCookie) + `,` +
            `"cookieLifeTime":` + strconv.Itoa(SessionCookieLifeTime) + `}`
    }
    GlobalSessions, err = session.NewManager(SessionProvider,
        sessionConfig)
    if err != nil {
        panic(err)
    }
    go GlobalSessions.GC()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>beego.SessionOn</code>定义是否启动Session功能，然后<code v-pre>sessionConfig</code>是Session的配置，如果配置为空，就使用拼接的默认配置。<code v-pre>sessionConfig</code>是json格式。</p>
<p><code v-pre>session.NewManager()</code>返回<code v-pre>*session.Manager</code>，session的数据存储引擎是<code v-pre>beego.SessionProvider</code>定义，比如&quot;file”，文件存储。</p>
<p><code v-pre>go GlobalSessions.GC()</code>开启一个goroutine来处理session的回收。阅读一下<code v-pre>GC()</code>的代码，在 <a href="https://github.com/astaxie/beego/blob/master/session/session.go#L183" target="_blank" rel="noopener noreferrer">session/session.go#L183<ExternalLinkIcon/></a>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (manager *Manager) GC() {
    manager.provider.SessionGC()
    time.AfterFunc(time.Duration(manager.config.Gclifetime)*time.Second, func() { manager.GC() })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是个<strong>无限循环</strong>。<code v-pre>time.AfterFunc()</code>在经过一段时间间隔<code v-pre>time.Duration(...)</code>之后，又调用自己，相当于又开始启动<code v-pre>time.AfterFunc()</code>等待下一次到期。<code v-pre>manager.provider.SessionGC()</code>是不同session存储引擎的回收方法（其实是<code v-pre>session.Provider</code>接口的）。</p>
<h3 id="模板构建" tabindex="-1"><a class="header-anchor" href="#模板构建" aria-hidden="true">#</a> 模板构建</h3>
<p>继续<code v-pre>beego.Run()</code>，session初始化后，构建模板：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>err := BuildTemplate(ViewsPath)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>beego.ViewsPath</code>是模板的目录啦，不多说。仔细来看看<code v-pre>BuildTemplate()</code>函数，<a href="https://github.com/astaxie/beego/blob/master/template.go#L114" target="_blank" rel="noopener noreferrer">template.goL#114<ExternalLinkIcon/></a>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// build all template files in a directory.
// it makes beego can render any template file in view directory.
func BuildTemplate(dir string) error {
    if _, err := os.Stat(dir); err != nil {
        if os.IsNotExist(err) {
            return nil
        } else {
            return errors.New("dir open err")
        }
    }
    self := &amp;templatefile{
        root:  dir,
        files: make(map[string][]string),
    }
    err := filepath.Walk(dir, func(path string, f os.FileInfo, err error) error {
        return self.visit(path, f, err)
    })
    if err != nil {
        fmt.Printf("filepath.Walk() returned %v\n", err)
        return err
    }
    for _, v := range self.files {
        for _, file := range v {
            t, err := getTemplate(self.root, file, v...)
            if err != nil {
                Trace("parse template err:", file, err)
            } else {
                BeeTemplates[file] = t
            }
        }
    }
    return nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比较复杂。一点点来看，<code v-pre>os.Stat(dir)</code>判断目录是否存在。<code v-pre>filepath.Walk()</code>走一边目录里的文件，记录在<code v-pre>self.files</code>里面。循环<code v-pre>self.files</code>中的<code v-pre>file</code>（map[dir][]file])，用<code v-pre>getTemplate</code>获取<code v-pre>*template.Template</code>实例，保存在<code v-pre>beego.BeeTemplates</code>（map[string]*template.Template）。</p>
<p>为什么要<strong>预先编译</strong>模板？想像一下，如果每次请求，都去寻找模板再编译一遍。这显然是个浪费的。而且如果模板复杂，嵌套众多，编译速度会是很大的问题。因此存下编译好的<code v-pre>*template.Template</code>是必然的选择。但是，编译后模板的修改不能立即响应了，怎么办呢？先继续看下去。</p>
<h3 id="中间件" tabindex="-1"><a class="header-anchor" href="#中间件" aria-hidden="true">#</a> 中间件</h3>
<p><code v-pre>middleware</code>包目前似乎只有错误处理的功能。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>middleware.RegisterErrorHandler()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>只是注册默认的错误处理方法 <code v-pre>middleware.NotFound</code> 等几个。</p>
<h3 id="beeadminapp" tabindex="-1"><a class="header-anchor" href="#beeadminapp" aria-hidden="true">#</a> beeAdminApp</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if EnableAdmin {
    go beeAdminApp.Run()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>beeAdminApp</code>也是一个<code v-pre>*beego.adminApp</code>，负责系统监控、性能检测、访问统计和健康检查等。具体的介绍和使用可以访问<a href="http://www.oschina.net/#" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>。</p>
<h2 id="http服务" tabindex="-1"><a class="header-anchor" href="#http服务" aria-hidden="true">#</a> HTTP服务</h2>
<p>写了这么多，终于要开始讲核心结构<code v-pre>beego.BeeApp</code>的启动：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>BeeApp.Run()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>Run()</code>的实现代码在<a href="https://github.com/astaxie/beego/blob/master/app.go#L29" target="_blank" rel="noopener noreferrer">app.go#L29<ExternalLinkIcon/></a>。代码较长，看看最重要的一段：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if UseFcgi {
    if HttpPort == 0 {
        l, err = net.Listen("unix", addr)
    } else {
        l, err = net.Listen("tcp", addr)
    }
    if err != nil {
        BeeLogger.Critical("Listen: ", err)
    }
    err = fcgi.Serve(l, app.Handlers)
} else {
    if EnableHotUpdate {
        server := &amp;http.Server{
            Handler:      app.Handlers,
            ReadTimeout:  time.Duration(HttpServerTimeOut) * time.Second,
            WriteTimeout: time.Duration(HttpServerTimeOut) * time.Second,
        }
        laddr, err := net.ResolveTCPAddr("tcp", addr)
        if nil != err {
            BeeLogger.Critical("ResolveTCPAddr:", err)
        }
        l, err = GetInitListener(laddr)
        theStoppable = newStoppable(l)
        err = server.Serve(theStoppable)
        theStoppable.wg.Wait()
        CloseSelf()
    } else {
        s := &amp;http.Server{
            Addr:         addr,
            Handler:      app.Handlers,
            ReadTimeout:  time.Duration(HttpServerTimeOut) * time.Second,
            WriteTimeout: time.Duration(HttpServerTimeOut) * time.Second,
        }
        if HttpTLS {
            err = s.ListenAndServeTLS(HttpCertFile, HttpKeyFile)
        } else {
            err = s.ListenAndServe()
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>beego.UseFcgi</code>定义是否使用<code v-pre>fast-cgi</code>服务，而不是HTTP。另一部分是启动HTTP。里面有个重要功能<code v-pre>EnableHotUpdate</code>————<strong>热更新</strong>。对他的描述，可以看看官方<a href="http://beego.me/docs/advantage/reload.md" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>。</p>
<h3 id="_2-1-http过程总览" tabindex="-1"><a class="header-anchor" href="#_2-1-http过程总览" aria-hidden="true">#</a> 2.1 HTTP过程总览</h3>
<p>上面的代码看得到<code v-pre>*http.Server.Handler</code>是<code v-pre>app.Handlers</code>，即<code v-pre>*beego.ControllerRegistor</code>，<code v-pre>ServeHTTP</code>就定义在代码<a href="https://github.com/astaxie/beego/blob/master/router.go#L431" target="_blank" rel="noopener noreferrer">router.go#L431<ExternalLinkIcon/></a>。非常长，我们检出重要的部分来说说。</p>
<p>首先是要创建当前请求的上下文：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// init context
context := &amp;beecontext.Context{
    ResponseWriter: w,
    Request:        r,
    Input:          beecontext.NewInput(r),
    Output:         beecontext.NewOutput(),
}
context.Output.Context = context
context.Output.EnableGzip = EnableGzip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>context</code>的类型是<code v-pre>*context.Context</code>，把当前的<code v-pre>w(http.ResponseWriter)</code>和<code v-pre>r(*http.Request)</code>写在<code v-pre>context</code>的字段中。</p>
<p>然后，定义了过滤器<code v-pre>filter</code>的调用方法，把<code v-pre>context</code>传递给过滤器操作：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>do_filter := func(pos int) (started bool) {
    if p.enableFilter {
        if l, ok := p.filters[pos]; ok {
            for _, filterR := range l {
                if ok, p := filterR.ValidRouter(r.URL.Path); ok {
                    context.Input.Params = p
                    filterR.filterFunc(context)
                    if w.started {
                        return true
                    }
                }
            }
        }
    }
    return false
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，加载Session：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if SessionOn {
    context.Input.CruSession = GlobalSessions.SessionStart(w, r)
    defer func() {
        context.Input.CruSession.SessionRelease(w)
    }()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>defer</code>中的<code v-pre>SessionRelease()</code>是将session持久化到存储引擎中，比如写入文件保存。</p>
<p>然后，判断请求方式是否支持：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if !utils.InSlice(strings.ToLower(r.Method), HTTPMETHOD) {
    http.Error(w, "Method Not Allowed", 405)
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里看一看到 <code v-pre>goto Admin</code>，就是执行<code v-pre>AdminApp</code>的监控操作，记录这次请求的相关信息。<code v-pre>Admin</code>定义在整个HTTP执行的最后：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Admin:
    //admin module record QPS
    if EnableAdmin {
        timeend := time.Since(starttime)
        if FilterMonitorFunc(r.Method, requestPath, timeend) {
            if runrouter != nil {
                go toolbox.StatisticsMap.AddStatistics(r.Method, requestPath, runrouter.Name(), timeend)
            } else {
                go toolbox.StatisticsMap.AddStatistics(r.Method, requestPath, "", timeend)
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以<code v-pre>goto Admin</code>直接就跳过中间过程，走到HTTP执行的最后了。显然，当请求方式不支持的时候，直接跳到HTTP执行最后。如果不启用<code v-pre>AdminApp</code>，那就是HTTP执行过程结束。</p>
<p>继续阅读，开始处理静态文件了：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if serverStaticRouter(context) {
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后处理POST请求的内容体：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if context.Input.IsPost() {
    if CopyRequestBody &amp;&amp; !context.Input.IsUpload() {
        context.Input.CopyBody()
    }
    context.Input.ParseFormOrMulitForm(MaxMemory)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行两个前置的过滤器：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if do_filter(BeforeRouter) {
    goto Admin
}

if do_filter(AfterStatic) {
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过我觉得这俩顺序怪怪的，应该先<code v-pre>AfterStatic</code>后<code v-pre>BeforeRouter</code>。需要注意，过滤器如果返回<code v-pre>false</code>，整个执行就结束（跳到最后）。</p>
<p>继续阅读，然后判断有没有指定执行的控制器和方法：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if context.Input.RunController != nil &amp;&amp; context.Input.RunMethod != "" {
    findrouter = true
    runMethod = context.Input.RunMethod
    runrouter = context.Input.RunController
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果过滤器执行后，对<code v-pre>context</code>指定了执行的控制器和方法，就用指定的。</p>
<p>继续，路由的寻找开始，有三种路由：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if !findrouter {
    for _, route := range p.fixrouters {
        n := len(requestPath)
        if requestPath == route.pattern {
            runMethod = p.getRunMethod(r.Method, context, route)
            if runMethod != "" {
                runrouter = route.controllerType
                findrouter = true
                break
            }
        }
        //......
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>p.fixrouters</code>就是不带正则的路由，比如<code v-pre>/user</code>。<code v-pre>route.controllerType</code>的类型是<code v-pre>reflect.Type</code>，后面会用来创建控制器实例。<code v-pre>p.getRunMethod()</code>获取实际请求方式。为了满足浏览器无法发送表单<code v-pre>PUT</code>和<code v-pre>DELETE</code>方法，可以用表单域<code v-pre>_method</code>值代替。（注明一下<code v-pre>p</code>就是<code v-pre>*beego.ControllerRegistor</code>。</p>
<p>接下来当然是正则的路由：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if !findrouter {
    //find a matching Route
    for _, route := range p.routers {

        //check if Route pattern matches url
        if !route.regex.MatchString(requestPath) {
            continue
        }
        // ......
        runMethod = p.getRunMethod(r.Method, context, route)
        if runMethod != "" {
            runrouter = route.controllerType
            context.Input.Params = params
            findrouter = true
            break
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>正则路由比如<code v-pre>/user/:id:int</code>，这种带参数的。匹配后的参数会记录在<code v-pre>context.Input.Params</code>中。</p>
<p>还没找到，就看看是否需要自动路由：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if !findrouter &amp;&amp; p.enableAuto {
    // ......
    for cName, methodmap := range p.autoRouter {
        // ......
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>把所有路由规则走完，还是没有找到匹配的规则：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if !findrouter {
    middleware.Exception("404", rw, r, "")
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另一种情况就是找到路由规则咯，且看下文。</p>
<h3 id="_2-2-路由调用" tabindex="-1"><a class="header-anchor" href="#_2-2-路由调用" aria-hidden="true">#</a> 2.2 路由调用</h3>
<p>上面的代码发现路由的调用依赖<code v-pre>runrouter</code>和<code v-pre>runmethod</code>变量。他们值觉得了到底调用什么控制器和方法。来看看具体实现：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if findrouter {
    //execute middleware filters
    if do_filter(BeforeExec) {
        goto Admin
    }

    //Invoke the request handler
    vc := reflect.New(runrouter)
    execController, ok := vc.Interface().(ControllerInterface)
    if !ok {
        panic("controller is not ControllerInterface")
    }

    //call the controller init function
    execController.Init(context, runrouter.Name(), runMethod, vc.Interface())

    //if XSRF is Enable then check cookie where there has any cookie in the  request's cookie _csrf
    if EnableXSRF {
        execController.XsrfToken()
        if r.Method == "POST" || r.Method == "DELETE" || r.Method == "PUT" ||
            (r.Method == "POST" &amp;&amp; (r.Form.Get("_method") == "delete" || r.Form.Get("_method") == "put")) {
            execController.CheckXsrfCookie()
        }
    }

    //call prepare function
    execController.Prepare()

    if !w.started {
        //exec main logic
        switch runMethod {
        case "Get":
            execController.Get()
        case "Post":
            execController.Post()
        case "Delete":
            execController.Delete()
        case "Put":
            execController.Put()
        case "Head":
            execController.Head()
        case "Patch":
            execController.Patch()
        case "Options":
            execController.Options()
        default:
            in := make([]reflect.Value, 0)
            method := vc.MethodByName(runMethod)
            method.Call(in)
        }

        //render template
        if !w.started &amp;&amp; !context.Input.IsWebsocket() {
            if AutoRender {
                if err := execController.Render(); err != nil {
                    panic(err)
                }

            }
        }
    }

    // finish all runrouter. release resource
    execController.Finish()

    //execute middleware filters
    if do_filter(AfterExec) {
        goto Admin
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>研读一下，最开始的又是过滤器：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if do_filter(BeforeExec) {
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>BeforeExec</code>执行控制器方法前的过滤。</p>
<p>然后，创建一个新的控制器实例：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vc := reflect.New(runrouter)
execController, ok := vc.Interface().(ControllerInterface)
if !ok {
    panic("controller is not ControllerInterface")
}

//call the controller init function
execController.Init(context, runrouter.Name(), runMethod, vc.Interface())
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>reflect.New()</code>创建新的实例，用<code v-pre>vc.Interface().(ControllerInterface)</code>取出，调用接口的<code v-pre>Init</code>方法，将请求的上下文等传递进去。
这里就说明为什么不能存下控制器实例给每次请求使用，因为每次请求的上下文是<strong>不同的</strong>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>execController.Prepare()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>控制器的准备工作，这里可以写用户登录验证等。</p>
<p>然后根据<code v-pre>runmethod</code>执行控制器对应的方法，非接口定义的方法，用<code v-pre>reflect.Call</code>调用。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if !w.started &amp;&amp; !context.Input.IsWebsocket() {
    if AutoRender {
        if err := execController.Render(); err != nil {
            panic(err)
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果自动渲染<code v-pre>AutoRender</code>，就调用<code v-pre>Render()</code>方法渲染页面。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>execController.Finish()

//execute middleware filters
if do_filter(AfterExec) {
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>控制器最后一刀<code v-pre>Finish</code>搞定，然后过滤器<code v-pre>AfterExec</code>使用。</p>
<p>总结起来，<code v-pre>beego.ControllerInterface</code>接口方法的<code v-pre>Init</code>,<code v-pre>Prepare</code>,<code v-pre>Render</code>和<code v-pre>Finish</code>发挥很大作用。那就来研究一下。</p>
<h2 id="控制器和视图" tabindex="-1"><a class="header-anchor" href="#控制器和视图" aria-hidden="true">#</a> 控制器和视图</h2>
<h3 id="控制器接口" tabindex="-1"><a class="header-anchor" href="#控制器接口" aria-hidden="true">#</a> 控制器接口</h3>
<p>控制器接口<code v-pre>beego.ControllerInterface</code>的定义在<a href="https://github.com/astaxie/beego/blob/master/controller.go#L47" target="_blank" rel="noopener noreferrer">controller.go#L47<ExternalLinkIcon/></a>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>type ControllerInterface interface {
    Init(ct *context.Context, controllerName, actionName string, app interface{})
    Prepare()
    Get()
    Post()
    Delete()
    Put()
    Head()
    Patch()
    Options()
    Finish()
    Render() error
    XsrfToken() string
    CheckXsrfCookie() bool
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>官方的实现<code v-pre>beego.Controller</code>定义在<a href="https://github.com/astaxie/beego/blob/master/controller.go#L29" target="_blank" rel="noopener noreferrer">controller.go#L29<ExternalLinkIcon/></a>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>type Controller struct {
    Ctx            *context.Context
    Data           map[interface{}]interface{}
    controllerName string
    actionName     string
    TplNames       string
    Layout         string
    LayoutSections map[string]string // the key is the section name and the value is the template name
    TplExt         string
    _xsrf_token    string
    gotofunc       string
    CruSession     session.SessionStore
    XSRFExpire     int
    AppController  interface{}
    EnableReander  bool
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>内容好多，没必要全部都看看，重点在<code v-pre>Init</code>,<code v-pre>Prepare</code>,<code v-pre>Render</code>和<code v-pre>Finish</code>这四个。</p>
<h3 id="控制器的实" tabindex="-1"><a class="header-anchor" href="#控制器的实" aria-hidden="true">#</a> 控制器的实</h3>
<p><code v-pre>Init</code>方法：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Init generates default values of controller operations.
func (c *Controller) Init(ctx *context.Context, controllerName, actionName string, app interface{}) {
    c.Layout = ""
    c.TplNames = ""
    c.controllerName = controllerName
    c.actionName = actionName
    c.Ctx = ctx
    c.TplExt = "tpl"
    c.AppController = app
    c.EnableReander = true
    c.Data = ctx.Input.Data
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>没什么话说，一堆赋值。唯一要谈的是<code v-pre>c.EnableReander</code>，这种拼写错误实在是，掉阴沟里。实际的意思是<code v-pre>EnableRender</code>。</p>
<p><code v-pre>Prepare</code>和<code v-pre>Finish</code>方法：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Prepare runs after Init before request function execution.
func (c *Controller) Prepare() {

}

// Finish runs after request function execution.
func (c *Controller) Finish() {

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>空的！原来我要自己填内容啊。</p>
<p><code v-pre>Render</code>方法：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// Render sends the response with rendered template bytes as text/html type.
func (c *Controller) Render() error {
    if !c.EnableReander {
        return nil
    }
    rb, err := c.RenderBytes()

    if err != nil {
        return err
    } else {
        c.Ctx.Output.Header("Content-Type", "text/html; charset=utf-8")
        c.Ctx.Output.Body(rb)
    }
    return nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="视图渲染" tabindex="-1"><a class="header-anchor" href="#视图渲染" aria-hidden="true">#</a> 视图渲染</h3>
<p>渲染的核心方法是<code v-pre>c.RenderBytes()</code>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>// RenderBytes returns the bytes of rendered template string. Do not send out response.
func (c *Controller) RenderBytes() ([]byte, error) {
    //if the controller has set layout, then first get the tplname's content set the content to the layout
    if c.Layout != "" {
        if c.TplNames == "" {
            c.TplNames = strings.ToLower(c.controllerName) + "/" + strings.ToLower(c.actionName) + "." + c.TplExt
        }
        if RunMode == "dev" {
            BuildTemplate(ViewsPath)
        }
        newbytes := bytes.NewBufferString("")
        if _, ok := BeeTemplates[c.TplNames]; !ok {
            panic("can't find templatefile in the path:" + c.TplNames)
            return []byte{}, errors.New("can't find templatefile in the path:" + c.TplNames)
        }
        err := BeeTemplates[c.TplNames].ExecuteTemplate(newbytes, c.TplNames, c.Data)
        if err != nil {
            Trace("template Execute err:", err)
            return nil, err
        }
        tplcontent, _ := ioutil.ReadAll(newbytes)
        c.Data["LayoutContent"] = template.HTML(string(tplcontent))

        if c.LayoutSections != nil {
            for sectionName, sectionTpl := range c.LayoutSections {
                if sectionTpl == "" {
                    c.Data[sectionName] = ""
                    continue
                }

                sectionBytes := bytes.NewBufferString("")
                err = BeeTemplates[sectionTpl].ExecuteTemplate(sectionBytes, sectionTpl, c.Data)
                if err != nil {
                    Trace("template Execute err:", err)
                    return nil, err
                }
                sectionContent, _ := ioutil.ReadAll(sectionBytes)
                c.Data[sectionName] = template.HTML(string(sectionContent))
            }
        }

        ibytes := bytes.NewBufferString("")
        err = BeeTemplates[c.Layout].ExecuteTemplate(ibytes, c.Layout, c.Data)
        if err != nil {
            Trace("template Execute err:", err)
            return nil, err
        }
        icontent, _ := ioutil.ReadAll(ibytes)
        return icontent, nil
    } else {
        //......
    }
    return []byte{}, nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看起来很复杂，主要是两种情况，有没有Layout。如果有Layout：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>err := BeeTemplates[c.TplNames].ExecuteTemplate(newbytes, c.TplNames, c.Data)
// ......
tplcontent, _ := ioutil.ReadAll(newbytes)
c.Data["LayoutContent"] = template.HTML(string(tplcontent))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>渲染模板文件，就是布局的主内容。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>for sectionName, sectionTpl := range c.LayoutSections {
    if sectionTpl == "" {
        c.Data[sectionName] = ""
        continue
    }

    sectionBytes := bytes.NewBufferString("")
    err = BeeTemplates[sectionTpl].ExecuteTemplate(sectionBytes, sectionTpl, c.Data)
    // ......
    sectionContent, _ := ioutil.ReadAll(sectionBytes)
    c.Data[sectionName] = template.HTML(string(sectionContent))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>渲染布局里的别的区块<code v-pre>c.LayoutSections</code>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ibytes := bytes.NewBufferString("")
err = BeeTemplates[c.Layout].ExecuteTemplate(ibytes, c.Layout, c.Data)
// ......
icontent, _ := ioutil.ReadAll(ibytes)
return icontent, nil
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后是渲染布局文件，<code v-pre>c.Data</code>里带有所有布局的主内容和区块，可以直接赋值在布局里。</p>
<p>渲染过程有趣的代码：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if RunMode == "dev" {
    BuildTemplate(ViewsPath)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>开发状态下，每次渲染都会重新<code v-pre>BuildTemplate()</code>。这样就可以理解，最初渲染模板并存下<code v-pre>*template.Template</code>，生产模式下，是不会响应即时的模版修改。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '66.md' style='float:left'>⬆️上一节🔗  </a><a href = '68.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


