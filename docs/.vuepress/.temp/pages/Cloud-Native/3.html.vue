<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第3节-学习-sealos-的项目结构" tabindex="-1"><a class="header-anchor" href="#第3节-学习-sealos-的项目结构" aria-hidden="true">#</a> 第3节 学习 sealos 的项目结构</h1>
<br>
<div><a href = '2.md' style='float:left'>⬆️上一节🔗  </a><a href = '4.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<h3 id="controllers" tabindex="-1"><a class="header-anchor" href="#controllers" aria-hidden="true">#</a> <a href="https://github.com/labring/sealos/tree/main/controllers" target="_blank" rel="noopener noreferrer">controllers<ExternalLinkIcon/></a></h3>
<details class="custom-container details"><summary>目录折叠</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token punctuation">\</span>Desktop<span class="token punctuation">\</span>my<span class="token punctuation">\</span>sealos<span class="token punctuation">\</span>controllers<span class="token operator">></span> tree      
卷 系统 的文件夹 <span class="token environment constant">PATH</span> 列表
卷序列号为 DE95-1D97
C:.
├─app  <span class="token comment"># 我们整个应用生命周期</span>
│  ├─api
│  │  └─v1
│  ├─config  
│  │  ├─crd
│  │  │  ├─bases
│  │  │  └─patches
│  │  ├─default
│  │  ├─manager
│  │  ├─prometheus
│  │  ├─rbac
│  │  └─samples
│  ├─controllers
│  ├─deploy
│  │  └─manifests
│  └─hack
├─cluster <span class="token comment"># 专门管理aws上k8s生命周期</span>
│  ├─api
│  │  └─v1
│  ├─applier
│  ├─config
│  │  ├─crd
│  │  │  ├─bases
│  │  │  └─patches
│  │  ├─default
│  │  ├─manager
│  │  ├─prometheus
│  │  ├─rbac
│  │  └─samples
│  ├─controllers
│  ├─deploy
│  │  └─manifests
│  └─hack
├─infra  <span class="token comment"># 管理基础设施，管理虚拟机、容器或者网络、磁盘</span>
│  ├─api
│  │  └─v1
│  ├─common
│  ├─config
│  │  ├─crd
│  │  │  ├─bases
│  │  │  └─patches
│  │  ├─default
│  │  ├─manager
│  │  ├─prometheus
│  │  ├─rbac
│  │  └─samples
│  ├─controllers
│  ├─deploy
│  │  └─manifests
│  ├─drivers
│  │  └─aws
│  └─hack
├─metering  <span class="token comment"># 自定义计量，计费资源</span>
│  ├─api
│  │  └─v1
│  ├─config
│  │  ├─crd
│  │  │  ├─bases
│  │  │  └─patches
│  │  ├─default
│  │  ├─manager
│  │  ├─prometheus
│  │  ├─rbac
│  │  └─samples
│  ├─controllers
│  ├─deploy
│  │  └─manifests
│  └─hack
├─terminal  <span class="token comment"># cmd</span>
│  ├─api
│  │  └─v1
│  ├─config
│  │  ├─crd
│  │  │  ├─bases
│  │  │  └─patches
│  │  ├─default
│  │  ├─manager
│  │  ├─prometheus
│  │  ├─rbac
│  │  └─samples
│  ├─controllers
│  ├─deploy
│  │  └─manifests
│  ├─hack
│  └─scripts
└─user  
    ├─api
    │  └─v1
    ├─config
    │  ├─certmanager
    │  ├─crd
    │  │  ├─bases
    │  │  └─patches
    │  ├─default
    │  ├─manager
    │  ├─prometheus
    │  ├─rbac
    │  ├─samples
    │  └─webhook
    ├─controllers
    │  ├─cache
    │  └─helper
    ├─deploy
    │  └─manifests
    └─hack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><a href="https://github.com/labring/sealos/tree/main/controllers" target="_blank" rel="noopener noreferrer">controllers<ExternalLinkIcon/></a> 控制器用来管理集群（k8s 有一些内置的功能 <code v-pre>pod</code>，deloyment这些，同样可以controllers扩展）：</p>
<blockquote>
<p>这些功能都是 <code v-pre>k8s</code> 没有的功能~</p>
</blockquote>
<p>我们跑了很多服务器都是通过<code v-pre>infra</code>管理他们</p>
<p><code v-pre>metering</code>是用作计量，我们用过多少资源</p>
<p><code v-pre>terminal</code>就是桌面上的终端应用</p>
<p><code v-pre>user</code>就是用户的管理，因为<code v-pre>cloud.sealos</code>是一个多租户的集群</p>
<h3 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd" aria-hidden="true">#</a> cmd</h3>
<p>代码的入口就是在cmd中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos cmd<span class="token punctuation">]</span><span class="token comment"># tree -d</span>
<span class="token builtin class-name">.</span>
├── image-cri-shim  <span class="token comment"># 镜像代理 </span>
│   └── cmd  
├── lvscare  <span class="token comment"># 负载均衡</span>
│   └── cmd
├── sealctl  <span class="token comment"># 封装了一些shell，在服务器上没有shell工具，封装内核打交道命令</span>
│   └── cmd
└── sealos  <span class="token comment"># 核心入口⬇️</span>
    └── cmd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>详细介绍：</strong></p>
<ul>
<li><code v-pre>image-cri-shim</code>：拦截通信，检测已经有的镜像，替换</li>
<li><code v-pre>lvscare</code>：负载均衡器，每个结点都会跑<code v-pre>lvscare</code>，都去跑三个<code v-pre>master</code>，做负载均衡，<code v-pre>master</code> 挂掉就会清掉结点。</li>
<li><code v-pre>sealctl</code>：封装了一些 <code v-pre>shell</code> ，在服务器上没有 <code v-pre>shell</code> 工具，封装内核打交道命令，sealos依赖的命令行。</li>
<li><code v-pre>sealos</code>：<code v-pre>sealos run</code> 类似于 <code v-pre>k8s</code> 实现</li>
</ul>
<details class="custom-container details"><summary>k8s指令式和声明式：</summary>
<p><code v-pre>K8S</code>的架构，其中有一点很重要的是整体架构采用的是 <code v-pre>声明式编程</code>，主要的编程范式有三种：<code v-pre>命令式编程</code>，<code v-pre>声明式编程</code> 和 <code v-pre>函数式编程</code>。</p>
<p><strong>命令式编程：</strong></p>
<p>命令式编程的主要思想是关注 <code v-pre>计算机执行的步骤</code>，即一步一步告诉计算机先做什么再做什么。 比如：如果你想在一个数字集合 <code v-pre>collection</code>(变量名) 中筛选大于 5 的数字，你需要这样告诉计算机： 第一步，创建一个存储结果的集合变量 <code v-pre>results</code>； 第二步，遍历这个数字集合 <code v-pre>collection</code>； 第三步：一个一个地判断每个数字是不是大于 5，如果是就将这个数字添加到结果集合变量 <code v-pre>results</code>中。</p>
<p>代码实现如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">//创建一个存储结果的集合变量，用于存储所有的节点的结果</span>
<span class="token keyword">var</span> results <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token comment">//遍历这个集合，打印出所有节点的结果</span>
<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> results <span class="token punctuation">{</span>
	<span class="token comment">//判断每个数字时候大于5</span>
	<span class="token keyword">if</span> v <span class="token operator">></span> <span class="token number">5</span> <span class="token punctuation">{</span>
		<span class="token comment">//添加到集合results中</span>
		results<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> v
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很明显，这个样子的代码是很常见的一种，不管你用的是<code v-pre>C</code>,<code v-pre>C++</code>还是<code v-pre>C#</code>,<code v-pre>Java</code>,<code v-pre>Javascript</code>,<code v-pre>BASIC</code>,<code v-pre>Python</code>,<code v-pre>Ruby</code>等等，你都可以以这个方式写。</p>
<p><strong>声明式编程：</strong></p>
<p>声明式编程是以数据结构的形式来表达程序执行的逻辑。它的主要思想是告诉计算机<code v-pre>应该做什么，但不指定具体要怎么做</code>。 SQL 语句就是最明显的一种声明式编程的例子，例如：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> collection <span class="token keyword">WHERE</span> num <span class="token operator">></span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>除了<code v-pre>SQL</code>，网页编程中用到的<code v-pre>HTML</code>和<code v-pre>CSS</code>也都属于声明式编程。</p>
<p>通过观察声明式编程的代码我们可以发现它有一个特点是它不需要创建变量用来存储数据。 另一个特点是它不包含循环控制的代码如<code v-pre>for</code>，<code v-pre>while</code>。</p>
<p><strong>函数式编程：</strong></p>
<p>函数式编程和声明式编程是有所关联的，因为他们思想是一致的：即只关注做什么而不是怎么做。但函数式编程不仅仅局限于声明式编程。 函数式编程最重要的特点是**“函数第一位”**，即函数可以出现在任何地方，比如你可以把函数作为参数传递给另一个函数，不仅如此你还可以将函数作为返回值。大部分常见的编程语言一半都已经提供了对这种编程方式的支持，比如 JavaScript，再有 C# 中的 LINQ 和 Java 中的 <code v-pre>Lambda</code> 和闭包的概念。<code v-pre>Java 8</code>最大的一个对函数式编程支持的更新就是<code v-pre>Stream API</code>，感兴趣的可以了解下，官方文档地址：<a href="https://link.zhihu.com/?target=https%3A//link.jianshu.com%3Ft%3Dhttps%3A%2F%2Fdocs.oracle.com%2Fjavase%2F8%2Fdocs%2Fapi%2Fjava%2Futil%2Fstream%2Fpackage-summary.html" target="_blank" rel="noopener noreferrer">https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html<ExternalLinkIcon/></a></p>
<p>相比于以前的命令式编程，在 Java 中我个人现在更倾向于函数式编程的方法，它可以让代码的逻辑更清晰更优雅，比如同样的逻辑用<code v-pre>Java 8</code>的<code v-pre>Stream</code>方式写就是：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>List<span class="token operator">&lt;</span>Number<span class="token operator">></span> results <span class="token operator">=</span> collection.stream<span class="token punctuation">(</span><span class="token punctuation">)</span>
                                 .filter<span class="token punctuation">(</span>n -<span class="token operator">></span> n <span class="token operator">></span> <span class="token number">5</span><span class="token punctuation">)</span>
                                 .collect<span class="token punctuation">(</span>Collectors.toList<span class="token punctuation">(</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><strong>sealos：核心入口：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos cmd<span class="token punctuation">]</span><span class="token comment"># cd sealos/cmd/ &amp;&amp; tree </span>
<span class="token builtin class-name">.</span>
├── add.go
├── apply.go
├── delete.go
├── docs.go
├── exec.go
├── gen.go
├── images.go
├── reset.go
├── root.go
├── run.go  <span class="token comment"># 整个sealos入口</span>
├── scp.go
└── version.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="desktop-前端部分" tabindex="-1"><a class="header-anchor" href="#desktop-前端部分" aria-hidden="true">#</a> <a href="https://github.com/labring/sealos/tree/main/desktop" target="_blank" rel="noopener noreferrer">desktop<ExternalLinkIcon/></a> 前端部分</h2>
<h2 id="cloud是以前写的一些东西-–-不重要" tabindex="-1"><a class="header-anchor" href="#cloud是以前写的一些东西-–-不重要" aria-hidden="true">#</a> cloud是以前写的一些东西 – 不重要</h2>
<h2 id="scripts-一些脚本" tabindex="-1"><a class="header-anchor" href="#scripts-一些脚本" aria-hidden="true">#</a> <a href="https://github.com/labring/sealos/tree/main/scripts" target="_blank" rel="noopener noreferrer">scripts<ExternalLinkIcon/></a> 一些脚本</h2>
<h2 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> <a href="https://github.com/labring/sealos/tree/main/service" target="_blank" rel="noopener noreferrer">service<ExternalLinkIcon/></a></h2>
<p>有一些 <code v-pre>http</code> 服务，<code v-pre>test</code> 就是集群测试。</p>
<p><code v-pre>GitHub</code> 第三方登陆回调~</p>
<h2 id="pkg-大量的实现部分" tabindex="-1"><a class="header-anchor" href="#pkg-大量的实现部分" aria-hidden="true">#</a> <a href="https://github.com/labring/sealos/tree/main/pkg" target="_blank" rel="noopener noreferrer">pkg<ExternalLinkIcon/></a> 大量的实现部分</h2>
<p><strong>在这里，我们需要和<code v-pre>cluster.go</code>结合起来了，这个贯穿始终的，<code v-pre>cluster.go</code>描述整个集群期望状态 -- 几个<code v-pre>master</code>，几个<code v-pre>node</code>，<code v-pre>ssh</code>密码、端口号、集群镜像、贯穿始终，特别特别重要  -- <code v-pre>sealos run</code> 也是渲染成结构体传递给其他模块~</strong></p>
<blockquote>
<p>也是我需要做的主要部分：</p>
<ul>
<li><code v-pre>apply</code>：期望状态和实际状态一致   创建的时候：</li>
<li><code v-pre>ssh</code>：远程访问</li>
<li><code v-pre>types</code>：很重要，整个pkg结构体的定义（贯穿始终）</li>
<li><code v-pre>rountime</code>：结点的实现 — 实现如何去装 <code v-pre>k8s</code></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildimage   <span class="token comment">#镜像构建</span>
cert k8s  <span class="token comment">#证书管理</span>
checker   <span class="token comment">#预处理--检查集群能否装上</span>
client-go   <span class="token comment">#调用k8s接口</span>
cloud   <span class="token comment">#是用rust写的前端模块，写了一半</span>
config   <span class="token comment">#配置文件</span>
filesystem   <span class="token comment">#分发到每个结点</span>
guest   <span class="token comment">#执行镜像的cmd</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h2 id="types-类型" tabindex="-1"><a class="header-anchor" href="#types-类型" aria-hidden="true">#</a> types 类型</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos pkg<span class="token punctuation">]</span><span class="token comment"># cd types/</span>
<span class="token punctuation">[</span>root@VM-4-6-centos types<span class="token punctuation">]</span><span class="token comment"># tree  </span>
├── v1beta1
│   ├── cluster_args.go
│   ├── cluster.go  
<span class="token comment"># cluster.go描述整个集群期望状态 -- 几个master，几个node，ssh密码、端口号、集群镜像、贯穿始终，特别特别重要  -- sealos run也是渲染成结构体传递给其他模块~</span>
│   ├── config.go  
│   ├── constants.go
│   ├── defaults_cluster.go
│   ├── defaults.go
│   ├── defaults_infra.go
│   ├── doc.go
│   ├── helper.go
│   ├── infra.go															
│   ├── register.go 
│   └── zz_generated.deepcopy.go
└── validation
    └── validation_infra.go

<span class="token number">2</span> directories, <span class="token number">13</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>cluster.go</code>描述整个集群期望状态（使用的是命令式） -- 几个<code v-pre>master</code>，几个<code v-pre>node</code>，<code v-pre>ssh</code>密码、端口号、集群镜像、贯穿始终，特别特别重要  -- <code v-pre>sealos run</code>也是渲染成结构体传递给其他模块~</p>
<ul>
<li>集群没有，创建。</li>
<li>集群有，字段挨着比对。</li>
</ul>
<p><strong>现在的写法不是很满意~，对于升级等其他操作需要优化。</strong></p>
</blockquote>
<h3 id="rountime" tabindex="-1"><a class="header-anchor" href="#rountime" aria-hidden="true">#</a> rountime</h3>
<ul>
<li><a href="https://github.com/labring/sealos/blob/main/pkg/runtime/runtime.go" target="_blank" rel="noopener noreferrer">runtime.go<ExternalLinkIcon/></a></li>
</ul>
<p><strong>我们看下 interface：</strong></p>
<blockquote>
<p>各个结点做了什么，我们写了 <code v-pre>*KubeadmRuntime</code> 实现，我们也可以写一个二进制的实现，也可以写一个 <code v-pre>k3s</code> 或者 <code v-pre>k0s</code> 实现。</p>
</blockquote>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Interface <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">JoinNodes</span><span class="token punctuation">(</span>newNodesIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">DeleteNodes</span><span class="token punctuation">(</span>nodeIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">JoinMasters</span><span class="token punctuation">(</span>newMastersIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">DeleteMasters</span><span class="token punctuation">(</span>mastersIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">SyncNodeIPVS</span><span class="token punctuation">(</span>mastersIPList<span class="token punctuation">,</span> nodeIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ssh库" tabindex="-1"><a class="header-anchor" href="#ssh库" aria-hidden="true">#</a> ssh库</h3>
<p><code v-pre>copy</code> 模块到某一个结点，做一些远程执行命令</p>
<h2 id="目的" tabindex="-1"><a class="header-anchor" href="#目的" aria-hidden="true">#</a> 目的</h2>
<ul>
<li><a href="https://github.com/labring/sealos/issues/1943" target="_blank" rel="noopener noreferrer">使用k0s或者k3s实现<ExternalLinkIcon/></a></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealos run k0s:latest <span class="token parameter variable">--masters</span> xxx <span class="token parameter variable">--nodes</span> xxxx <span class="token parameter variable">--passwd</span> xxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="custom-container details"><summary>再创建一个k0s或者k3s，现有一个k8s</summary>
<p><img src="http://sm.cubxxw.com/smimage-20221023230147303.png" alt="image-20221023230147303"></p>
<p><strong>就比如说下面的拉取命令：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Download and install sealos. sealos is a golang binary so you can just download and copy to bin. You may also download it from release page.</span>
$ <span class="token function">wget</span>  https://github.com/labring/sealos/releases/download/v4.1.3/sealos_4.1.3_linux_amd64.tar.gz  <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
    <span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> sealos_4.1.3_linux_amd64.tar.gz sealos <span class="token operator">&amp;&amp;</span>  <span class="token function">chmod</span> +x sealos <span class="token operator">&amp;&amp;</span> <span class="token function">mv</span> sealos /usr/bin 
<span class="token comment"># Create a cluster	</span>
$ sealos run labring/kubernetes:v1.25.0 labring/helm:v3.8.2 labring/calico:v3.24.1 <span class="token punctuation">\</span>
     <span class="token parameter variable">--masters</span> <span class="token number">192.168</span>.64.2,192.168.64.22,192.168.64.20 <span class="token punctuation">\</span>
     <span class="token parameter variable">--nodes</span> <span class="token number">192.168</span>.64.21,192.168.64.19 <span class="token parameter variable">-p</span> <span class="token punctuation">[</span>your-ssh-passwd<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<blockquote>
<p>注意：我们还需要判断输入的是k0s还是k8s，然后根据这个来选择合适的接口接入~</p>
</blockquote>
<h2 id="test" tabindex="-1"><a class="header-anchor" href="#test" aria-hidden="true">#</a> test</h2>
<p>测试，关于 makefile</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/sealos<span class="token comment"># make help</span>

Usage: <span class="token function">make</span> <span class="token operator">&lt;</span>TARGETS<span class="token operator">></span> <span class="token operator">&lt;</span>OPTIONS<span class="token operator">></span> <span class="token punctuation">..</span>.

Targets:
  build                Build <span class="token builtin class-name">source</span> code <span class="token keyword">for</span> <span class="token function">host</span> platform.
  build.multiarch      Build <span class="token builtin class-name">source</span> code <span class="token keyword">for</span> multiple platforms. See option PLATFORMS.
  lint                 Check syntax and styling of go sources.
  <span class="token function">format</span>               Gofmt <span class="token punctuation">(</span>reformat<span class="token punctuation">)</span> package sources.
  coverage             Run unit tests and output <span class="token builtin class-name">test</span> coverage.
  compress             Compress the binaries using upx <span class="token keyword">for</span> <span class="token function">host</span> platform.
  compress.multiarch   Compress the binaries using upx <span class="token keyword">for</span> multiple platforms. See option PLATFORMS.
  verify-license       Verify the license headers <span class="token keyword">for</span> all files.
  add-license          Ensure <span class="token builtin class-name">source</span> code files have license headers.
  gen                  Generate all necessary files.
  tools                Install dependent tools.
  clean                Remove all files that are created by building.
  update-contrib       Update list of contributors.
  <span class="token builtin class-name">help</span>                 Show this <span class="token builtin class-name">help</span> info.

Options:
  DEBUG            Whether or not to generate debug symbols. Default is <span class="token number">0</span>.

  BINS             Binaries to build. Default is all binaries under cmd.
                   This option is available when using: <span class="token function">make</span> <span class="token punctuation">{</span>build/compress<span class="token punctuation">}</span><span class="token punctuation">(</span>.multiarch<span class="token punctuation">)</span>
                   Example: <span class="token function">make</span> build <span class="token assign-left variable">BINS</span><span class="token operator">=</span><span class="token string">"sealos sealctl"</span>

  PLATFORMS        Platform to build for. Default is linux_arm64 and linux_amd64.
                   This option is available when using: <span class="token function">make</span> <span class="token punctuation">{</span>build/compress<span class="token punctuation">}</span>.multiarch
                   Example: <span class="token function">make</span> build.multiarch <span class="token assign-left variable">PLATFORMS</span><span class="token operator">=</span><span class="token string">"linux_arm64 linux_amd64"</span>

  V                Set to <span class="token number">1</span> <span class="token builtin class-name">enable</span> verbose build. Default is <span class="token number">0</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '2.md' style='float:left'>⬆️上一节🔗  </a><a href = '4.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


