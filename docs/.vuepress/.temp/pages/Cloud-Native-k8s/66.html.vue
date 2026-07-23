<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第66节-kubernetes-二次开发-crd-学习" tabindex="-1"><a class="header-anchor" href="#第66节-kubernetes-二次开发-crd-学习" aria-hidden="true">#</a> 第66节 Kubernetes 二次开发 CRD 学习</h1>
<div><a href = '65.md' style='float:left'>⬆️上一节🔗  </a><a href = '67.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>sealos 使用了大量的 CRD 对其扩展，我们可以使用 CRD 来 Kubernetes</p>
<ul>
<li><a href="https://github.com/kubernetes-sigs/kubebuilder" target="_blank" rel="noopener noreferrer">kubebuilder<ExternalLinkIcon/></a></li>
<li><a href="https://book.kubebuilder.io/" target="_blank" rel="noopener noreferrer">官方学习文档<ExternalLinkIcon/></a></li>
</ul>
<p>除此之外，这里有一份官方 CRD  <a href="https://github.com/kubernetes/sample-controller" target="_blank" rel="noopener noreferrer">案例 ~<ExternalLinkIcon/></a></p>
<p>CRD是Kubernetes为提高可扩展性，让开发者去自定义资源（如Deployment，StatefulSet等）的一种方法。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Operator=CRD+Controller
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>CRD仅仅是资源的定义，而Controller可以去监听CRD的CRUD事件来添加自定义业务逻辑。</p>
<p>如果说只是对CRD实例进行 <code v-pre>CRUD</code> 的话，不需要 <code v-pre>Controller</code> 也是可以实现的，只是只有数据，没有针对数据的操作。</p>
<p>就拿官方的 CRD 案例（sample-controller）来说，如果没有运行这个程序，也可以使用 examples 案例中的 yaml 文件，创建 CRD，以及 CR。只不过没有办法针对 Pod 和 deployment 等 内置的 API 资源对象进行 CRUD 操作。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k get deployment
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
nginx-deployment   <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           9h
❯ ./ctrl <span class="token parameter variable">-kubeconfig</span> ~/.kube/config  <span class="token parameter variable">-logtostderr</span><span class="token operator">=</span>true
❯ k get deployment
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
example-foo        <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           4s
nginx-deployment   <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           9h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="项目-demo" tabindex="-1"><a class="header-anchor" href="#项目-demo" aria-hidden="true">#</a> 项目 demo</h3>
<p>review：<a href="https://github.com/muzi502" target="_blank" rel="noopener noreferrer">@muzi502<ExternalLinkIcon/></a></p>
<p>author:  <a href="https://github.com/cubxxw" target="_blank" rel="noopener noreferrer">@cubxxw<ExternalLinkIcon/></a></p>
<blockquote>
<p>这篇文章将参考各个博客和 kubebuilder 官方文档 以及 <a href="https://github.com/kubernetes/sample-controller" target="_blank" rel="noopener noreferrer">kubernetes/sample-controller<ExternalLinkIcon/></a>  进行学习，最后实践一个项目的步骤，对静态博客（<a href="https://docker.cubxxw.com/" target="_blank" rel="noopener noreferrer">docker.cubxxw.com<ExternalLinkIcon/></a> 或者 <a href="https://go.cubxxw.com/" target="_blank" rel="noopener noreferrer">go.cubxxw.com<ExternalLinkIcon/></a>) 进行 CRD，形成学习闭环~</p>
<ol>
<li>创建自定义API对象（Custom Resource Definition），名为Blog；</li>
<li>用代码生成工具生成informer和client相关代码；</li>
<li>创建并运行自定义控制器，k8s环境中所有 Blog 相关的&quot;增、删、改&quot;操作都会被此控制器监听到，可以根据实际需求在控制器中编写业务代码；</li>
</ol>
</blockquote>
<h3 id="operator-功能设计" tabindex="-1"><a class="header-anchor" href="#operator-功能设计" aria-hidden="true">#</a> Operator 功能设计</h3>
<p>借助 Operator 完成和企业内部注册中心的打通</p>
<p><strong>Operator 开发 SDK 有 2 个选择：</strong></p>
<ul>
<li>kubebuilder</li>
<li>operator sdk</li>
</ul>
<p>注意：在本质上其实都是在 K8s 控制器运行时上的封装，主要都是脚手架的生成，使用体验相差不大。</p>
<p>但是有意思的是，Kubebuilder 的维护方是：kubernetes-sigs，所以更受人关注。</p>
<p>底层都是基于 k8s 控制器运行时封装，不同的是 kubebuilder 早期包含 CRD和 自定义 Controller 开发。但是 operator-sdk 早期不包含 CRD 开发，但是现在也是融合了。</p>
<p><strong>CRD 允许你定义自己的 Kubernetes API 对象，而自定义控制器可以监听这些对象的事件并执行相应的操作。</strong></p>
<h3 id="kubebuilder-架构图" tabindex="-1"><a class="header-anchor" href="#kubebuilder-架构图" aria-hidden="true">#</a> kubebuilder 架构图</h3>
<p><strong>图片来自官网站：</strong></p>
<p><img src="http://sm.cubxxw.com/sm202304081027380.png" alt="image-20230408102740099"></p>
<h2 id="installation-kubebuilder" tabindex="-1"><a class="header-anchor" href="#installation-kubebuilder" aria-hidden="true">#</a> installation kubebuilder</h2>
<p>安装kubebuilder：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">curl</span> <span class="token parameter variable">-L</span> <span class="token parameter variable">-o</span> kubebuilder https://go.kubebuilder.io/dl/latest/<span class="token variable"><span class="token variable">$(</span>go <span class="token function">env</span> GOOS<span class="token variable">)</span></span>/<span class="token variable"><span class="token variable">$(</span>go <span class="token function">env</span> GOARCH<span class="token variable">)</span></span>

❯ <span class="token function">chmod</span> +x kubebuilder <span class="token operator">&amp;&amp;</span> <span class="token function">mv</span> kubebuilder /usr/local/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>或者，使用 <code v-pre>make build</code> ， 这是我很喜欢的一种方式，方便贡献和阅读源码：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBEBUILDER</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/kubebuilder
❯ <span class="token function">git</span> clone https://github.com/kubernetes-sigs/kubebuilder.git <span class="token variable">$KUBEBUILDER</span>  <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> <span class="token variable">$KUBEBUILDER</span><span class="token punctuation">;</span> <span class="token function">make</span> build <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> bin<span class="token punctuation">;</span> ./kubebuilder<span class="token punctuation">;</span> 
❯ <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$KUBEBUILDER</span>/bin<span class="token punctuation">;</span> kubebuilder
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="create-a-project" tabindex="-1"><a class="header-anchor" href="#create-a-project" aria-hidden="true">#</a> create a project</h2>
<p>很简单的行为，我们只需要创建一个目录，并且使用 命令 初始化就够了，在底层上 kubebuilder 并不希望我们知道实现的细节~</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">mkdir</span> /tmp/guestbook -p<span class="token punctuation">;</span> <span class="token builtin class-name">cd</span> /tmp/guestbook
❯ kubebuilder init <span class="token parameter variable">--domain</span> my.domain <span class="token parameter variable">--repo</span> my.domain/guestbook
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个目录就是很神奇了，就像代码生成器一样生成了一个模板：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ tree <span class="token parameter variable">-L</span> <span class="token number">3</span>
<span class="token builtin class-name">.</span>
├── Dockerfile
├── Makefile
├── PROJECT
├── README.md
├── cmd
│   └── main.go
├── config
│   ├── default
│   │   ├── kustomization.yaml
│   │   ├── manager_auth_proxy_patch.yaml
│   │   └── manager_config_patch.yaml
│   ├── manager
│   │   ├── kustomization.yaml
│   │   └── manager.yaml
│   ├── prometheus
│   │   ├── kustomization.yaml
│   │   └── monitor.yaml
│   └── rbac
│       ├── auth_proxy_client_clusterrole.yaml
│       ├── auth_proxy_role.yaml
│       ├── auth_proxy_role_binding.yaml
│       ├── auth_proxy_service.yaml
│       ├── kustomization.yaml
│       ├── leader_election_role.yaml
│       ├── leader_election_role_binding.yaml
│       ├── role_binding.yaml
│       └── service_account.yaml
├── go.mod
├── go.sum
└── hack
    └── boilerplate.go.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里我借助《Kubernetes operator 开发进阶》这本书（但不推荐）部分解释：</p>
<ul>
<li><code v-pre>Dockerfile</code>: 用于构建 Docker 镜像的文件。</li>
<li><code v-pre>Makefile</code>: 一个 Makefile，其中包含了用于构建和发布 Operator 的常用命令。</li>
<li><code v-pre>PROJECT</code>: 项目名称，以及项目信息，这里是一些 metadata 。</li>
<li><code v-pre>README.md</code>: 项目的说明文档。</li>
<li><code v-pre>cmd/</code>: 包含了 Operator 的入口程序 <code v-pre>main.go</code>。</li>
<li><code v-pre>config/</code>: 包含了 Operator 的配置文件，包括 RBAC 权限相关的 YAML 文件、Prometheus 监控服务发现（ServiceMonitor）相关的 Yaml 文件、控制器（Manager）部分部署的 Yaml 文件。
<ul>
<li><code v-pre>default/</code>: 包含了默认的配置文件。
<ul>
<li><code v-pre>kustomization.yaml</code>: Kustomize 配置文件，指定了需要应用的 k8s 资源类型和名称。</li>
<li><code v-pre>manager_auth_proxy_patch.yaml</code>: 在 manager 容器中添加了 auth-proxy 容器的相关信息。</li>
<li><code v-pre>manager_config_patch.yaml</code>: 在 manager 容器中添加了与 Operator 相关的配置信息。</li>
</ul>
</li>
<li><code v-pre>manager/</code>: 包含了部署 Operator 所需的 k8s 资源文件。
<ul>
<li><code v-pre>kustomization.yaml</code>: Kustomize 配置文件，指定了需要应用的 k8s 资源类型和名称。</li>
<li><code v-pre>manager.yaml</code>: 部署 Operator 所需的 k8s 资源文件。</li>
</ul>
</li>
<li><code v-pre>prometheus/</code>: 包含了 Prometheus 监控 Operator 所需的 k8s 资源文件。
<ul>
<li><code v-pre>kustomization.yaml</code>: Kustomize 配置文件，指定了需要应用的 k8s 资源类型和名称。</li>
<li><code v-pre>monitor.yaml</code>: 部署 Prometheus 监控 Operator 所需的 k8s 资源文件。</li>
</ul>
</li>
<li><code v-pre>rbac/</code>: 包含了 Operator 所需的 RBAC 资源文件。
<ul>
<li><code v-pre>auth_proxy_client_clusterrole.yaml</code>: 配置了与客户端授权相关的 ClusterRole。</li>
<li><code v-pre>auth_proxy_role.yaml</code>: 配置了与 auth-proxy 相关的 Role。</li>
<li><code v-pre>auth_proxy_role_binding.yaml</code>: 配置了与 auth-proxy 相关的 RoleBinding。</li>
<li><code v-pre>auth_proxy_service.yaml</code>: 配置了与 auth-proxy 相关的 Service。</li>
<li><code v-pre>kustomization.yaml</code>: Kustomize 配置文件，指定了需要应用的 k8s 资源类型和名称。</li>
<li><code v-pre>leader_election_role.yaml</code>: 配置了与 leader election 相关的 Role。</li>
<li><code v-pre>leader_election_role_binding.yaml</code>: 配置了与 leader election 相关的 RoleBinding。</li>
<li><code v-pre>role_binding.yaml</code>: 配置了与 Operator 相关的 RoleBinding。</li>
<li><code v-pre>service_account.yaml</code>: 配置了与 Operator 相关的 ServiceAccount。</li>
</ul>
</li>
</ul>
</li>
<li><code v-pre>go.mod</code>: Go 项目的模块文件。</li>
<li><code v-pre>go.sum</code>: Go 项目的模块依赖文件。</li>
<li><code v-pre>hack/</code>: 包含了生成代码和文档等相关的脚本和文件。
<ul>
<li><code v-pre>boilerplate.go.txt</code>: 用于生成 Go 项目文件的代码模板。</li>
</ul>
</li>
</ul>
<p>为了方便我们后面的学习，我这里用 git 进行版本控制，方便观察后面生成了哪些文件</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ git add .
❯ git commit -a -s -m "kubebuilder init"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="create-an-api" tabindex="-1"><a class="header-anchor" href="#create-an-api" aria-hidden="true">#</a> create an API</h2>
<p>运行以下命令，创建一个新的API（组/版本）为 <code v-pre>webapp/v1</code> ，并在其上创建新的Kind（CRD） <code v-pre>Guestbook</code> ：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubebuilder create api <span class="token parameter variable">--group</span> webapp <span class="token parameter variable">--version</span> v1 <span class="token parameter variable">--kind</span> Guestbook
Create Resource <span class="token punctuation">[</span>y/n<span class="token punctuation">]</span>
y
Create Controller <span class="token punctuation">[</span>y/n<span class="token punctuation">]</span>
y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<blockquote>
<p>如果你按下 <code v-pre>y</code> 创建资源[y/n]和创建控制器[y/n]，则这将创建文件 <code v-pre>api/v1/guestbook_types.go</code> （其中定义了API）和 <code v-pre>controllers/guestbook_controller.go</code> （其中实现了此类（CRD）的协调业务逻辑）。</p>
</blockquote>
<p>这个时候 kubebuilder 又偷偷的做了什么？我们看一下 git 的变动：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> status
On branch master
Changes not staged <span class="token keyword">for</span> commit:
  <span class="token punctuation">(</span>use <span class="token string">"git add &lt;file>..."</span> to update what will be committed<span class="token punctuation">)</span>
  <span class="token punctuation">(</span>use <span class="token string">"git restore &lt;file>..."</span> to discard changes <span class="token keyword">in</span> working directory<span class="token punctuation">)</span>
        modified:   PROJECT
        modified:   cmd/main.go
        modified:   go.mod
        modified:   go.sum

Untracked files:
  <span class="token punctuation">(</span>use <span class="token string">"git add &lt;file>..."</span> to include <span class="token keyword">in</span> what will be committed<span class="token punctuation">)</span>
        api/
        config/crd/
        config/rbac/guestbook_editor_role.yaml
        config/rbac/guestbook_viewer_role.yaml
        config/samples/
        internal/

no changes added to commit <span class="token punctuation">(</span>use <span class="token string">"git add"</span> and/or <span class="token string">"git commit -a"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新增目录：</p>
<ul>
<li><code v-pre>api</code>：包含刚刚添加的 API，后面会经常编辑这里的 <code v-pre>guestbook_types.go</code> 文件。这个文件是 CRD 代码的主要定义文件。</li>
<li><code v-pre>config/crd</code>：存放的是 crd 部署相关的 kustomize 文件。</li>
<li><code v-pre>config/rbac/</code>：分别是编辑权限和查询权限的 <code v-pre>ClusterRole</code></li>
<li><code v-pre>samples</code>：很好理解，CR 示例文件</li>
<li><code v-pre>internal</code> ：很好理解，内部核心代码，我们打开看看 <code v-pre>controllers</code></li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>❯ cat internal<span class="token operator">/</span>controller<span class="token operator">/</span>guestbook_controller<span class="token punctuation">.</span><span class="token keyword">go</span>

<span class="token keyword">package</span> controller
<span class="token comment">//...</span>
<span class="token comment">// GuestbookReconciler reconciles a Guestbook object</span>
<span class="token keyword">type</span> GuestbookReconciler <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        client<span class="token punctuation">.</span>Client
        Scheme <span class="token operator">*</span>runtime<span class="token punctuation">.</span>Scheme
<span class="token punctuation">}</span>
<span class="token comment">//...</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>GuestbookReconciler<span class="token punctuation">)</span> <span class="token function">Reconcile</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> req ctrl<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">(</span>ctrl<span class="token punctuation">.</span>Result<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token boolean">_</span> <span class="token operator">=</span> log<span class="token punctuation">.</span><span class="token function">FromContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>

        <span class="token comment">// TODO(user): your logic here</span>

        <span class="token keyword">return</span> ctrl<span class="token punctuation">.</span>Result<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">// SetupWithManager sets up the controller with the Manager.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>GuestbookReconciler<span class="token punctuation">)</span> <span class="token function">SetupWithManager</span><span class="token punctuation">(</span>mgr ctrl<span class="token punctuation">.</span>Manager<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> ctrl<span class="token punctuation">.</span><span class="token function">NewControllerManagedBy</span><span class="token punctuation">(</span>mgr<span class="token punctuation">)</span><span class="token punctuation">.</span>
                <span class="token function">For</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>webappv1<span class="token punctuation">.</span>Guestbook<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
                <span class="token function">Complete</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很明显，上面的 Reconcile 函数是一个调谐函数，这是贯穿始终的一个词语，在 显眼的提示 TODO 中，我们可以补充自己的逻辑。</p>
<p>我们具体观察一下 PROJECT 文件，具体的元数据变化：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> <span class="token function">diff</span> PROJECT
<span class="token function">diff</span> <span class="token parameter variable">--git</span> a/PROJECT b/PROJECT
index a18434c<span class="token punctuation">..</span>3ea38eb <span class="token number">100644</span>
--- a/PROJECT
+++ b/PROJECT
@@ -7,4 +7,14 @@ layout:
 - go.kubebuilder.io/v4
 projectName: guestbook
 repo: my.domain/guestbook
+resources:
+- api:
+    crdVersion: v1
+    namespaced: <span class="token boolean">true</span>
+  controller: <span class="token boolean">true</span>
+  domain: my.domain
+  group: webapp
+  kind: Guestbook
+  path: my.domain/guestbook/api/v1
+  version: v1
 version: <span class="token string">"3"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要编辑API定义，请使用以下命令生成清单，如自定义资源（CR）或自定义资源定义（CRD）</p>
<details class="custom-container details"><summary>CRD 和 CR 区别</summary>
<p>自定义资源（CR）是 Kubernetes 中扩展 API 资源的一种方式，它允许用户自定义 Kubernetes 中的资源类型，并为其创建自己的 API 端点。用户可以使用 kubectl 命令行工具或 Kubernetes API 以编程方式操作 CR。CR 可以用于任何一种 Kubernetes 资源的扩展，例如 Pod、Service 或 Deployment。</p>
<p>自定义资源定义（CRD）用于定义自定义资源（CR）。它定义了 CR 的结构，即它的 API 规范。CRD 用于定义 Kubernetes 中的新 API 资源类型。这些资源类型可以用于扩展 Kubernetes，使其支持更多的资源类型和操作。CRD 本身是一个 Kubernetes 资源，它可以被 kubectl 或 Kubernetes API 用于创建新的 CR 类型。</p>
<p>因此，CR 是用户创建的 Kubernetes 资源类型，而 CRD 是定义和管理这些资源类型的方式。</p>
</details>
<h3 id="api-定义" tabindex="-1"><a class="header-anchor" href="#api-定义" aria-hidden="true">#</a> API 定义</h3>
<p>Kubernetes 的资源本质就是一个 API 对象，不过这个对象的 期望状态 被 API Service 保存在了 ETCD 中（或者是对于 k3s 来说可以保存在其他的有状态数据库，包括 sqlite、dqlite、mysql…)，然后提供 RESTful 接口用于 更新这些对象。</p>
<p>我们在上面讲过，CRD 的代码定义主要在 <code v-pre>api/</code> 目录下面，我们看一下代码结构：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ tree api
api
└── v1
    ├── groupversion_info.go
    ├── guestbook_types.go
    └── zz_generated.deepcopy.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>guestbook_types.go</code> 文件主要的定义，我们看下 spec 结构。</p>
<details class="custom-container details"><summary>Spec 结尾的结构体含义</summary>
<p>在Go语言中，结构体以 spec 结尾表示该结构体是用于特定目的的规范结构体。这种命名约定通常用于描述一个结构体的用途和功能，以便开发人员更好地理解和使用它。例如，<code v-pre>GuestbookSpec</code>定义了所需的 <code v-pre>Guestbook</code> 状态</p>
</details>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// GuestbookSpec defines the desired state of Guestbook</span>
<span class="token keyword">type</span> GuestbookSpec <span class="token keyword">struct</span> <span class="token punctuation">{</span>
        <span class="token comment">// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster</span>
        <span class="token comment">// Important: Run "make" to regenerate code after modifying this file</span>

        <span class="token comment">// Foo is an example field of Guestbook. Edit guestbook_types.go to remove/update</span>
        Foo <span class="token builtin">string</span> <span class="token string">`json:"foo,omitempty"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的注释写的很清楚，Foo 是一个示例，我们可以删除掉，然后添加自己需要的配置。</p>
<p>修改这个文件后利用 Makefile 重新生成代码，💡简单的一个案例如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
	corev1 <span class="token string">"k8s.io/api/core/v1"</span>
    metav1 <span class="token string">"k8s.io/apimachinery/pkg/apis/meta/v1"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> GuestbookSpec <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Replicas <span class="token builtin">int32</span>					<span class="token string">`json:"replicas,omitempty"`</span>
    Template corev1<span class="token punctuation">.</span>PodTemplateSpec	<span class="token string">`json:"template,omitempty"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们分别定义了 用于声明 Pod 副本的数量、和用于生成 Pod 模板的配置。</p>
<p>最后我们也要记录到 git commit 中：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ git add .
❯ git commit -a -s -m "create api"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="crd-部署" tabindex="-1"><a class="header-anchor" href="#crd-部署" aria-hidden="true">#</a> CRD 部署</h3>
<p><strong>接下来我们就可以使用 <code v-pre>make manifests</code> 命令生成 ClusterRole 和 CustomResourceDefinition 配置。</strong></p>
<p><strong>检查 git 的更改信息：</strong></p>
<blockquote>
<p>如果要编辑API定义，请使用以下命令生成清单，如自定义资源（CR）或自定义资源定义（CRD）</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> status
On branch master
Untracked files:
  <span class="token punctuation">(</span>use <span class="token string">"git add &lt;file>..."</span> to include <span class="token keyword">in</span> what will be committed<span class="token punctuation">)</span>
        config/crd/bases/
        config/rbac/role.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可以看到两个目录文件的变化：</p>
<ul>
<li><code v-pre>config/crd/bases/</code> 目录：新增 <code v-pre>webapp.my.domain_guestbooks.yaml</code> 文件，这也是 <code v-pre>guestbook</code> 类型的 CRD 配置文件。</li>
<li><code v-pre>config/rbac/role.yaml</code> 定义的是一个 ClusterRole，从名字 manager-role 上大致也可以猜出这是后面 Controller 部署后将充当的 “<strong>角色</strong>”，定义了对 <code v-pre>guestbook</code> 资源的 CURD 操作。</li>
</ul>
<p>接下来，我们需要一个 Kubernetes 的环境，不管是 Kind &amp; minikube &amp; k3s 作为测试环境也好，我选择了 Kind：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ kind version
kind v0.18.0-alpha+bc0526729cf900 go1.20.1 linux/amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>⚠️ 控制器将自动使用 kubeconfig文件（即集群<code v-pre>kubectl cluster-info</code>显示的任何内容）。如果出现问题按照官方的方法可以自己拷贝 kubeconfig 或者是 设置 环境变量。</p>
<p>我们可以用 <code v-pre>make install</code> 完成 CRD 的部署过程：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>🎯 我们应该检查一个 Makefile 中的 <code v-pre>install target</code>，或许可以看出来 <code v-pre>install target</code> 是包含  <code v-pre>make manifests</code> 命令的，不过我们还是分开操作有助于了解整个过程。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># install   Install CRDs into the K8s cluster specified in ~/.kube/config.</span>
.PHONY: <span class="token function">install</span>
install: manifests kustomize <span class="token comment">## Install CRDs into the K8s cluster specified in ~/.kube/config.</span>
        <span class="token variable"><span class="token variable">$(</span>KUSTOMIZE<span class="token variable">)</span></span> build config/crd <span class="token operator">|</span> kubectl apply <span class="token parameter variable">-f</span> -
      
<span class="token comment"># kustomize Download kustomize locally if necessary. If wrong version is installed, it will be removed before downloading.</span>
.PHONY: kustomize
kustomize: <span class="token variable"><span class="token variable">$(</span>KUSTOMIZE<span class="token variable">)</span></span> <span class="token comment">## Download kustomize locally if necessary. If wrong version is installed, it will be removed before downloading.</span>
<span class="token variable"><span class="token variable">$(</span>KUSTOMIZE<span class="token variable">)</span></span><span class="token builtin class-name">:</span> <span class="token variable"><span class="token variable">$(</span>LOCALBIN<span class="token variable">)</span></span>
        @if <span class="token builtin class-name">test</span> <span class="token parameter variable">-x</span> <span class="token variable"><span class="token variable">$(</span>LOCALBIN<span class="token variable">)</span></span>/kustomize <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span> <span class="token variable"><span class="token variable">$(</span>LOCALBIN<span class="token variable">)</span></span>/kustomize version <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-q</span> <span class="token variable"><span class="token variable">$(</span>KUSTOMIZE_VERSION<span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">then</span> <span class="token punctuation">\</span>
                <span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span>LOCALBIN<span class="token variable">)</span></span>/kustomize version is not expected <span class="token variable"><span class="token variable">$(</span>KUSTOMIZE_VERSION<span class="token variable">)</span></span>. Removing it before installing."</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
                <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable"><span class="token variable">$(</span>LOCALBIN<span class="token variable">)</span></span>/kustomize<span class="token punctuation">;</span> <span class="token punctuation">\</span>
        <span class="token keyword">fi</span>
        <span class="token builtin class-name">test</span> <span class="token parameter variable">-s</span> <span class="token variable"><span class="token variable">$(</span>LOCALBIN<span class="token variable">)</span></span>/kustomize <span class="token operator">||</span> <span class="token punctuation">{</span> <span class="token function">curl</span> <span class="token parameter variable">-Ss</span> <span class="token variable"><span class="token variable">$(</span>KUSTOMIZE_INSTALL_SCRIPT<span class="token variable">)</span></span> <span class="token parameter variable">--output</span> install_kustomize.sh <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> install_kustomize.sh <span class="token variable"><span class="token variable">$(</span>subst v,,<span class="token punctuation">$(</span>KUSTOMIZE_VERSION<span class="token punctuation">)</span><span class="token variable">)</span></span> <span class="token variable"><span class="token variable">$(</span>LOCALBIN<span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token function">rm</span> install_kustomize.sh<span class="token punctuation">;</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>校验</strong>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k get crd <span class="token parameter variable">-A</span>
NAME                          CREATED AT
crontabs.stable.example.com   <span class="token number">2023</span>-04-07T09:17:55Z
guestbooks.webapp.my.domain   <span class="token number">2023</span>-04-07T15:42:22Z
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>guestbooks.webapp.my.domain</code> 已经存在了，这是一个自定义资源，意味着我们可以通过 <code v-pre>k get pod</code> 的方式来 <code v-pre>k get guestbooks</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k get guestbooks.webapp.my.domain <span class="token parameter variable">-A</span>
No resources found
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里并没出出现 error ，说明提示的是 kube-apiserver 已经可以识别这个资源，只不过没有这个资源的具体实例。</p>
<p>运行你的控制器（这将在前台运行，所以切换到一个新的 终端（如果你想让它保持运行）：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装自定义资源的实例" tabindex="-1"><a class="header-anchor" href="#安装自定义资源的实例" aria-hidden="true">#</a> 安装自定义资源的实例</h3>
<p>如果你按了<code v-pre>y</code>创建资源 <strong>[y/n]</strong>，则你在示例中为CRD创建了CR（如果你更改了 API定义）：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> config/samples/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="在集群上运行" tabindex="-1"><a class="header-anchor" href="#在集群上运行" aria-hidden="true">#</a> 在集群上运行</h3>
<p>构建镜像并将其推送到<code v-pre>IMG</code>指定的位置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> docker-build docker-push <span class="token assign-left variable">IMG</span><span class="token operator">=</span><span class="token operator">&lt;</span>some-registry<span class="token operator">></span>/<span class="token operator">&lt;</span>project-name<span class="token operator">></span>:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用<code v-pre>IMG</code>指定的镜像将控制器部署到集群：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> deploy <span class="token assign-left variable">IMG</span><span class="token operator">=</span><span class="token operator">&lt;</span>some-registry<span class="token operator">></span>/<span class="token operator">&lt;</span>project-name<span class="token operator">></span>:tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="卸载crd" tabindex="-1"><a class="header-anchor" href="#卸载crd" aria-hidden="true">#</a> 卸载CRD</h3>
<p>要从群集中删除CRD，请执行以下操作：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> uninstall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="取消部署-controller" tabindex="-1"><a class="header-anchor" href="#取消部署-controller" aria-hidden="true">#</a> 取消部署 controller</h3>
<p>将控制器取消部署到群集：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> undeploy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="cr-部署" tabindex="-1"><a class="header-anchor" href="#cr-部署" aria-hidden="true">#</a> CR 部署</h2>
<p>我们使用 CRD 定义了一个资源，CR 就像写一个 Deployment 一样，创建 <code v-pre>guestbooks</code> 同样需要一个 <code v-pre>yaml</code> 文件，并且符合声明式。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>❯ cat config/samples/webapp_v1_guestbook.yaml
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> webapp.my.domain/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Guestbook
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app.kubernetes.io/name</span><span class="token punctuation">:</span> guestbook
    <span class="token key atrule">app.kubernetes.io/instance</span><span class="token punctuation">:</span> guestbook<span class="token punctuation">-</span>sample
    <span class="token key atrule">app.kubernetes.io/part-of</span><span class="token punctuation">:</span> guestbook
    <span class="token key atrule">app.kubernetes.io/managed-by</span><span class="token punctuation">:</span> kustomize
    <span class="token key atrule">app.kubernetes.io/created-by</span><span class="token punctuation">:</span> guestbook
  <span class="token key atrule">name</span><span class="token punctuation">:</span> guestbook<span class="token punctuation">-</span>sample
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token comment"># TODO(user): Add fields here</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.14.2
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>

❯ k apply <span class="token punctuation">-</span>f webapp_v1_guestbook.yaml
guestbook.webapp.my.domain/guestbook<span class="token punctuation">-</span>sample created

❯ k get guestbooks.webapp.my.domain
NAME               AGE
guestbook<span class="token punctuation">-</span>sample   93s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面表示创建出来了 <code v-pre>guestbook-sample </code> 对象，不过这个时候还不够，因为 Pod 还没有被创建出来，我们继续实现相应的控制器逻辑。</p>
<h2 id="guestbook-生成的代码和结构" tabindex="-1"><a class="header-anchor" href="#guestbook-生成的代码和结构" aria-hidden="true">#</a> guestbook 生成的代码和结构</h2>
<p>我们详细解释一下 kubebuilder 初始化CRD以及相关的控制器框架后，部分的代码结构和源码解析。首先，我们应该从主函数开始： main.go</p>
<h3 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd" aria-hidden="true">#</a> cmd</h3>
<p>main.go 作为入口函数，是我们主要看的。当然，许可证信息省略掉了~ 我们先看一下头文件：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"flag"</span>
	<span class="token string">"os"</span>

	<span class="token comment">// Import all Kubernetes client auth plugins (e.g. Azure, GCP, OIDC, etc.)</span>
	<span class="token comment">// to ensure that exec-entrypoint and run can make use of them.</span>
	<span class="token boolean">_</span> <span class="token string">"k8s.io/client-go/plugin/pkg/client/auth"</span>

	<span class="token string">"k8s.io/apimachinery/pkg/runtime"</span>
	utilruntime <span class="token string">"k8s.io/apimachinery/pkg/util/runtime"</span>
	clientgoscheme <span class="token string">"k8s.io/client-go/kubernetes/scheme"</span>
	ctrl <span class="token string">"sigs.k8s.io/controller-runtime"</span>
	<span class="token string">"sigs.k8s.io/controller-runtime/pkg/healthz"</span>
	<span class="token string">"sigs.k8s.io/controller-runtime/pkg/log/zap"</span>

	webappv1 <span class="token string">"my.domain/guestbook/api/v1"</span>
	<span class="token string">"my.domain/guestbook/internal/controller"</span>
	<span class="token comment">//+kubebuilder:scaffold:imports</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每一组控制器都需要一个Scheme，它提供了Kinds和它们对应的Go类型之间的映射。在编写API定义时，我们将更多地讨论Kinds，所以稍后请记住这一点。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> <span class="token punctuation">(</span>
	scheme   <span class="token operator">=</span> runtime<span class="token punctuation">.</span><span class="token function">NewScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	setupLog <span class="token operator">=</span> ctrl<span class="token punctuation">.</span>Log<span class="token punctuation">.</span><span class="token function">WithName</span><span class="token punctuation">(</span><span class="token string">"setup"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	utilruntime<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>clientgoscheme<span class="token punctuation">.</span><span class="token function">AddToScheme</span><span class="token punctuation">(</span>scheme<span class="token punctuation">)</span><span class="token punctuation">)</span>

	utilruntime<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>webappv1<span class="token punctuation">.</span><span class="token function">AddToScheme</span><span class="token punctuation">(</span>scheme<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">//+kubebuilder:scaffold:scheme</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>runtime.Scheme</code> 是 Kubernetes 中对象的编解码器注册表，用于将对象序列化为字节数组，并将字节数组反序列化为对象。所有 Kubernetes API 对象都必须注册到 <code v-pre>runtime.Scheme</code> 中，以便在存储到 etcd 或发送到 API Server 时进行正确的编解码。</p>
<p>可以通过调用 <code v-pre>scheme.AddKnownTypes()</code> 方法向 <code v-pre>runtime.Scheme</code> 中注册新的 API 对象类型。</p>
<p>我们实例化了两个管理器，它跟踪所有控制器的运行情况，并为API服务器设置共享缓存和客户机。</p>
<p>⚠️ 注意：这里有 <code v-pre>//+kubebuilder:scaffold:scheme</code> ，这是一个比较有意思的事情。</p>
<p>剩下就是最核心的 <code v-pre>main()</code> 函数：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> metricsAddr <span class="token builtin">string</span>
    <span class="token keyword">var</span> enableLeaderElection <span class="token builtin">bool</span>
    <span class="token keyword">var</span> probeAddr <span class="token builtin">string</span>
    flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>metricsAddr<span class="token punctuation">,</span> <span class="token string">"metrics-bind-address"</span><span class="token punctuation">,</span> <span class="token string">":8080"</span><span class="token punctuation">,</span> <span class="token string">"The address the metric endpoint binds to."</span><span class="token punctuation">)</span>
    flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>probeAddr<span class="token punctuation">,</span> <span class="token string">"health-probe-bind-address"</span><span class="token punctuation">,</span> <span class="token string">":8081"</span><span class="token punctuation">,</span> <span class="token string">"The address the probe endpoint binds to."</span><span class="token punctuation">)</span>
    flag<span class="token punctuation">.</span><span class="token function">BoolVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>enableLeaderElection<span class="token punctuation">,</span> <span class="token string">"leader-elect"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token string">"Enable leader election for controller manager. "</span><span class="token operator">+</span>
            <span class="token string">"Enabling this will ensure there is only one active controller manager."</span><span class="token punctuation">)</span>
    opts <span class="token operator">:=</span> zap<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
        Development<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span>
    opts<span class="token punctuation">.</span><span class="token function">BindFlags</span><span class="token punctuation">(</span>flag<span class="token punctuation">.</span>CommandLine<span class="token punctuation">)</span>
    flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    ctrl<span class="token punctuation">.</span><span class="token function">SetLogger</span><span class="token punctuation">(</span>zap<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>zap<span class="token punctuation">.</span><span class="token function">UseFlagOptions</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>opts<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    mgr<span class="token punctuation">,</span> err <span class="token operator">:=</span> ctrl<span class="token punctuation">.</span><span class="token function">NewManager</span><span class="token punctuation">(</span>ctrl<span class="token punctuation">.</span><span class="token function">GetConfigOrDie</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ctrl<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
        Scheme<span class="token punctuation">:</span>                 scheme<span class="token punctuation">,</span>
        MetricsBindAddress<span class="token punctuation">:</span>     metricsAddr<span class="token punctuation">,</span>
        Port<span class="token punctuation">:</span>                   <span class="token number">9443</span><span class="token punctuation">,</span>
        HealthProbeBindAddress<span class="token punctuation">:</span> probeAddr<span class="token punctuation">,</span>
        LeaderElection<span class="token punctuation">:</span>         enableLeaderElection<span class="token punctuation">,</span>
        LeaderElectionID<span class="token punctuation">:</span>       <span class="token string">"80807133.tutorial.kubebuilder.io"</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        setupLog<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to start manager"</span><span class="token punctuation">)</span>
        os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前面无非就是定义了一个 flag 并且初始化。并且交给<code v-pre>Parse</code>解析<code v-pre>os.Args[1:]</code>中的命令行标志。</p>
<p>请注意， <code v-pre>Manager</code> 可以通过以下方式限制所有控制器将监视资源的命名空间：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code> mgr<span class="token punctuation">,</span> err <span class="token operator">:=</span> ctrl<span class="token punctuation">.</span><span class="token function">NewManager</span><span class="token punctuation">(</span>ctrl<span class="token punctuation">.</span><span class="token function">GetConfigOrDie</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ctrl<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
     Scheme<span class="token punctuation">:</span>                 scheme<span class="token punctuation">,</span>
     Namespace<span class="token punctuation">:</span>              namespace<span class="token punctuation">,</span>
     MetricsBindAddress<span class="token punctuation">:</span>     metricsAddr<span class="token punctuation">,</span>
     Port<span class="token punctuation">:</span>                   <span class="token number">9443</span><span class="token punctuation">,</span>
     HealthProbeBindAddress<span class="token punctuation">:</span> probeAddr<span class="token punctuation">,</span>
     LeaderElection<span class="token punctuation">:</span>         enableLeaderElection<span class="token punctuation">,</span>
     LeaderElectionID<span class="token punctuation">:</span>       <span class="token string">"80807133.tutorial.kubebuilder.io"</span><span class="token punctuation">,</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的示例将项目的范围更改为单个 <code v-pre>Namespace</code> 。在这种情况下，我们还建议将默认的 <code v-pre>ClusterRole</code> 和 <code v-pre>ClusterRoleBinding</code> 分别替换为 <code v-pre>Role</code> 和 <code v-pre>RoleBinding</code> ，从而将提供的授权限制在此命名空间。这样来说权限小一些，在 RBAC 中介绍过这部分。</p>
<p>不仅如此，我们还可以使用 <code v-pre>MultiNamespacedCacheBuilder</code> 来监视特性的命名空间子集。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> namespaces <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token comment">// List of Namespaces</span>

mgr<span class="token punctuation">,</span> err <span class="token operator">:=</span> ctrl<span class="token punctuation">.</span><span class="token function">NewManager</span><span class="token punctuation">(</span>ctrl<span class="token punctuation">.</span><span class="token function">GetConfigOrDie</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ctrl<span class="token punctuation">.</span>Options<span class="token punctuation">{</span>
    Scheme<span class="token punctuation">:</span>                 scheme<span class="token punctuation">,</span>
    NewCache<span class="token punctuation">:</span>               cache<span class="token punctuation">.</span><span class="token function">MultiNamespacedCacheBuilder</span><span class="token punctuation">(</span>namespaces<span class="token punctuation">)</span><span class="token punctuation">,</span>
    MetricsBindAddress<span class="token punctuation">:</span>     fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%s:%d"</span><span class="token punctuation">,</span> metricsHost<span class="token punctuation">,</span> metricsPort<span class="token punctuation">)</span><span class="token punctuation">,</span>
    Port<span class="token punctuation">:</span>                   <span class="token number">9443</span><span class="token punctuation">,</span>
    HealthProbeBindAddress<span class="token punctuation">:</span> probeAddr<span class="token punctuation">,</span>
    LeaderElection<span class="token punctuation">:</span>         enableLeaderElection<span class="token punctuation">,</span>
    LeaderElectionID<span class="token punctuation">:</span>       <span class="token string">"80807133.tutorial.kubebuilder.io"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>接下来的部分，就是一些错误处理，和开始搭建我们的API了！</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// +kubebuilder:scaffold:builder</span>

<span class="token keyword">if</span> err <span class="token operator">:=</span> mgr<span class="token punctuation">.</span><span class="token function">AddHealthzCheck</span><span class="token punctuation">(</span><span class="token string">"healthz"</span><span class="token punctuation">,</span> healthz<span class="token punctuation">.</span>Ping<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    setupLog<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to set up health check"</span><span class="token punctuation">)</span>
    os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> err <span class="token operator">:=</span> mgr<span class="token punctuation">.</span><span class="token function">AddReadyzCheck</span><span class="token punctuation">(</span><span class="token string">"readyz"</span><span class="token punctuation">,</span> healthz<span class="token punctuation">.</span>Ping<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    setupLog<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to set up ready check"</span><span class="token punctuation">)</span>
    os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

setupLog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"starting manager"</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">:=</span> mgr<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>ctrl<span class="token punctuation">.</span><span class="token function">SetupSignalHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    setupLog<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"problem running manager"</span><span class="token punctuation">)</span>
    os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="groups-versions-kinds-and-resources" tabindex="-1"><a class="header-anchor" href="#groups-versions-kinds-and-resources" aria-hidden="true">#</a> groups, versions, kinds, and resources</h2>
<p>当我们谈论Kubernetes中的API时，我们经常使用4个术语：组、版本、种类和资源。</p>
<p>没错，我们在 <a href="https://docker.cubxxw.com/Cloud-Native-k8s/" target="_blank" rel="noopener noreferrer">https://docker.cubxxw.com/Cloud-Native-k8s/<ExternalLinkIcon/></a> 中介绍过很多关于 GVK 和 GVR 的介绍，为什么在 Kubebuilder 中尤其需要再提一次。</p>
<p>当我们在一个特定的组版本中引用一个种类时，我们将其称为GroupVersionKind，或简称为GVK。资源和GVR也是如此。我们很快就会看到，每个GVK对应于包中给定的 root Go type。走进源码，体会这种感觉~</p>
<h3 id="create-an-api-1" tabindex="-1"><a class="header-anchor" href="#create-an-api-1" aria-hidden="true">#</a> create an API</h3>
<p>我们在前面创建过 API ，<code v-pre>kubebuilder create api --group webapp --version v1 --kind Guestbook</code> 命令创建了一个 组为 <code v-pre>webapp</code>，版本为 <code v-pre>v1</code>，类型为 <code v-pre>Guestbook</code> 的API 资源对象。</p>
<p>我们使用的命令是 <code v-pre>create api</code>，此命令的目标是为我们的同类创建自定义资源（CR）和自定义资源定义（CRD）。我翻开了 Kubebuilder 的源码部分：</p>
<p>在 <code v-pre>pkg/cli</code> 目录下面，我们找到了入口：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// addSubcommands returns a root command with a subcommand tree reflecting the</span>
<span class="token comment">// current project's state.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>CLI<span class="token punctuation">)</span> <span class="token function">addSubcommands</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// add the alpha command if it has any subcommands enabled</span>
	c<span class="token punctuation">.</span><span class="token function">addAlphaCmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// kubebuilder completion</span>
	<span class="token comment">// Only add completion if requested</span>
	<span class="token keyword">if</span> c<span class="token punctuation">.</span>completionCommand <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span>cmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">newCompletionCmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// kubebuilder create</span>
	createCmd <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">newCreateCmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token comment">// kubebuilder create api</span>
	createCmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">newCreateAPICmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	createCmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">newCreateWebhookCmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> createCmd<span class="token punctuation">.</span><span class="token function">HasSubCommands</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span>cmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>createCmd<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// kubebuilder edit</span>
	c<span class="token punctuation">.</span>cmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">newEditCmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// kubebuilder init</span>
	c<span class="token punctuation">.</span>cmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">newInitCmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// kubebuilder version</span>
	<span class="token comment">// Only add version if a version string was provided</span>
	<span class="token keyword">if</span> c<span class="token punctuation">.</span>version <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		c<span class="token punctuation">.</span>cmd<span class="token punctuation">.</span><span class="token function">AddCommand</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span><span class="token function">newVersionCmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<blockquote>
<p>通过 <code v-pre>newCreateCmd</code> 创建了一个 <code v-pre>create</code> 命令，并且通过 <code v-pre>newCreateAPICmd</code> 和 <code v-pre>newCreateWebhookCmd</code> 绑定了 <code v-pre>api</code> 和 <code v-pre>webhook</code>.</p>
</blockquote>
<p><code v-pre>webhook</code> 是一个钩子，hook 在 Kubernetes 中随处可见，可以使用 Webhook 来验证 CRD 对象的规范是否正确，并设置默认值，以确保 CRD 对象的正确性。</p>
<h3 id="为什么要创建-api" tabindex="-1"><a class="header-anchor" href="#为什么要创建-api" aria-hidden="true">#</a> 为什么要创建 API？</h3>
<p>新的API是我们向Kubernetes教授自定义对象的方式。Go结构体用于生成一个CRD，其中包括数据的模式以及跟踪数据，例如我们的新类型被称为什么。</p>
<p>然后，我们可以创建我们的自定义对象的实例，这些对象将由我们的控制器管理。</p>
<p>我们的API和资源代表我们在集群上的解决方案。基本上，CRD是我们定制对象的定义，而CR是它的实例。就比如说上面 我们 通过 kubebuilder 定义了一个 <code v-pre>guestbooks.webapp.my.domain</code>  的 CRD，然后再通过 声明式 yaml 文件编写 CR，并且创建 CR。</p>
<blockquote>
<p>当然官方有一个更好理解的例子：目标是让应用程序及其数据库在Kubernetes平台上运行。然后，一个CRD可以表示App，而另一个CRD可以表示DB。</p>
<p>通过使用一个CRD描述应用程序，另一个CRD描述数据库，我们不会损害封装、单一责任原则和内聚等概念。</p>
<p>破坏这些概念可能会导致意想不到的副作用，例如难以扩展、重用或维护等。</p>
</blockquote>
<h3 id="single-group-to-multi-group" tabindex="-1"><a class="header-anchor" href="#single-group-to-multi-group" aria-hidden="true">#</a> Single Group to Multi-Group</h3>
<p>在<code v-pre>Kubebuilder v2 scaffolding</code>的初始版本中（从Kubebuilder v2.0.0开始）不存在多组<code v-pre>scaffolding</code>支持。</p>
<p>要更改项目的布局以支持多组，请运行命令 <code v-pre>kubebuilder edit --multigroup=true</code> 。一旦切换到多组布局，新的Kinds将在新布局中生成，但需要额外的手动工作将旧的API组移动到新布局。</p>
<p>然后我们就可以添加一个 <strong>新的 API</strong></p>
<h3 id="add-new-api" tabindex="-1"><a class="header-anchor" href="#add-new-api" aria-hidden="true">#</a> add new api</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubebuilder create api <span class="token parameter variable">--group</span> batch <span class="token parameter variable">--version</span> v1 <span class="token parameter variable">--kind</span> CronJob
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>按下 <code v-pre>y</code> 键，选择“创建资源”和“创建控制器”。</p>
<p>第一次为每个组版本调用此命令时，它将为新的组版本创建一个目录。</p>
<p>在本例中，创建了与 <code v-pre>batch.tutorial.kubebuilder.io/v1</code> 对应的 <code v-pre>api/v1/</code> 目录（还记得我们一开始的 <code v-pre>--domain</code> --domain设置吗？）。</p>
<p>它还为我们的 <code v-pre>CronJob</code> Kind添加了一个文件， <code v-pre>api/v1/cronjob_types.go</code> 。每次我们调用不同类型的命令时，它都会添加一个相应的新文件。</p>
<p>我们的出发点很简单：我们导入 <code v-pre>meta/v1</code> API组，它通常不会自己暴露，而是包含所有Kubernetes Kind通用的元数据。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> v1

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    metav1 <span class="token string">"k8s.io/apimachinery/pkg/apis/meta/v1"</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们为Spec和Status of our Kind定义类型。<strong>Kubernetes的功能是将期望的状态（ <code v-pre>Spec</code> ）与实际的集群状态（其他对象的 <code v-pre>Status</code> ）和外部状态进行协调，然后记录它所观察到的（ <code v-pre>Status</code> ）</strong>。因此，每个函数对象都包括spec和status。一些类型，比如 <code v-pre>ConfigMap</code> ，不遵循这种模式，因为它们不编码所需的状态，但大多数类型都是这样。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// CronJobSpec defines the desired state of CronJob</span>
<span class="token keyword">type</span> CronJobSpec <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster</span>
    <span class="token comment">// Important: Run "make" to regenerate code after modifying this file</span>
<span class="token punctuation">}</span>

<span class="token comment">// CronJobStatus defines the observed state of CronJob</span>
<span class="token keyword">type</span> CronJobStatus <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster</span>
    <span class="token comment">// Important: Run "make" to regenerate code after modifying this file</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们定义对应于实际Kind的类型， <code v-pre>CronJob</code> 和 <code v-pre>CronJobList</code> 。 <code v-pre>CronJob</code> 是我们的根类型，它描述了 <code v-pre>CronJob</code> 类型。像所有Kubernetes对象一样，它包含 <code v-pre>TypeMeta</code> （描述API版本和Kind），还包含 <code v-pre>ObjectMeta</code> ，它包含名称，命名空间和标签等内容。</p>
<p><code v-pre>CronJobList</code> 只是多个 <code v-pre>CronJob</code> 的容器。它是在批量操作中使用的类型，如LIST。</p>
<p>一般来说，我们从不修改这两个属性中的任何一个--所有修改都在Spec或Status中。</p>
<p>这个小小的 <code v-pre>+kubebuilder:object:root</code> 注释被称为标记。我们将在稍后看到更多，但要知道它们作为额外的元数据，告诉控制器工具（我们的代码和YAML生成器）额外的信息。这个特定的类型告诉 <code v-pre>object</code> 生成器这个类型代表一个Kind。然后， <code v-pre>object</code> 生成器为我们生成 <code v-pre>runtime.Object</code> 接口的实现，这是所有表示Kinds的类型都必须实现的标准接口。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">//+kubebuilder:object:root=true</span>
<span class="token comment">//+kubebuilder:subresource:status</span>

<span class="token comment">// CronJob is the Schema for the cronjobs API</span>
<span class="token keyword">type</span> CronJob <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    metav1<span class="token punctuation">.</span>TypeMeta   <span class="token string">`json:",inline"`</span>
    metav1<span class="token punctuation">.</span>ObjectMeta <span class="token string">`json:"metadata,omitempty"`</span>

    Spec   CronJobSpec   <span class="token string">`json:"spec,omitempty"`</span>
    Status CronJobStatus <span class="token string">`json:"status,omitempty"`</span>
<span class="token punctuation">}</span>

<span class="token comment">//+kubebuilder:object:root=true</span>

<span class="token comment">// CronJobList contains a list of CronJob</span>
<span class="token keyword">type</span> CronJobList <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    metav1<span class="token punctuation">.</span>TypeMeta <span class="token string">`json:",inline"`</span>
    metav1<span class="token punctuation">.</span>ListMeta <span class="token string">`json:"metadata,omitempty"`</span>
    Items           <span class="token punctuation">[</span><span class="token punctuation">]</span>CronJob <span class="token string">`json:"items"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，我们将Go类型添加到API组。这允许我们将此API组中的类型添加到任何 Scheme 中。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    SchemeBuilder<span class="token punctuation">.</span><span class="token function">Register</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>CronJob<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>CronJobList<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="controller" tabindex="-1"><a class="header-anchor" href="#controller" aria-hidden="true">#</a> controller</h2>
<p>一句话描述：Controllers are the core of Kubernetes, and of any operator</p>
<p>控制器的工作是确保，对于任何给定的对象，世界的实际状态（包括集群状态，以及潜在的外部状态，如Kubelet的运行容器或云提供商的负载均衡器）与对象中所需的状态相匹配。</p>
<p>每个控制器专注于一个 root Kind，但可以与其他Kind交互。</p>
<p>我们称这个过程为和解（ <em>reconciling</em>）。</p>
<p>在controller-runtime中，实现特定类型协调的逻辑称为Reconciler。reconciler获取对象的名称，并返回是否需要重试（例如，如果出现错误或周期性控制器，如HorizontalPodAutoscaler）。</p>
<p>首先，我们从一些标准的导入开始。和前面一样，我们需要核心控制器运行时库，以及客户端包和API类型的包。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> controllers

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"context"</span>

    <span class="token string">"k8s.io/apimachinery/pkg/runtime"</span>
    ctrl <span class="token string">"sigs.k8s.io/controller-runtime"</span>
    <span class="token string">"sigs.k8s.io/controller-runtime/pkg/client"</span>
    <span class="token string">"sigs.k8s.io/controller-runtime/pkg/log"</span>

    batchv1 <span class="token string">"tutorial.kubebuilder.io/project/api/v1"</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，kubebuilder为我们搭建了一个基本的reconciler结构。几乎每个协调器都需要日志，并且需要能够获取对象，因此这些都是开箱即用的。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// CronJobReconciler reconciles a CronJob object</span>
<span class="token keyword">type</span> CronJobReconciler <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    client<span class="token punctuation">.</span>Client
    Scheme <span class="token operator">*</span>runtime<span class="token punctuation">.</span>Scheme
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大多数控制器最终都在集群上运行，因此它们需要RBAC权限，我们使用controller-tools RBAC标记来指定这些权限。这些是运行所需的最低权限。当我们添加更多功能时，我们将需要重新访问这些。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// +kubebuilder:rbac:groups=batch.tutorial.kubebuilder.io,resources=cronjobs,verbs=get;list;watch;create;update;patch;delete</span>
<span class="token comment">// +kubebuilder:rbac:groups=batch.tutorial.kubebuilder.io,resources=cronjobs/status,verbs=get;update;patch</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用以下命令通过controller-gen从上述标记生成 <code v-pre>config/rbac/role.yaml</code> 处的 <code v-pre>ClusterRole</code> 清单：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> manifests
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="实现-controller" tabindex="-1"><a class="header-anchor" href="#实现-controller" aria-hidden="true">#</a> 实现 Controller</h3>
<p>我们通过实现 Controller 逻辑去创建 Pod，在 <code v-pre>internal/controller/guestbook_controller.go</code></p>
<p>我们的CronJob控制器的基本逻辑是这样的：</p>
<ol>
<li>加载命名的 CronJob</li>
<li>列出所有活动 jobs 并更新状态</li>
<li>根据历史限制清理 history limits</li>
<li>检查我们是否被暂停（如果是，不要做任何其他事情）</li>
<li>获取下一次计划运行</li>
<li>运行一个新的 job，如果它是按计划进行的，没有超过截止日期，也没有被我们的并发策略阻塞</li>
<li>当我们看到一个正在运行的 job（自动完成）或者到了下一个计划运行的时间时，重新排队。</li>
</ol>
<p>我们先从进口开始。下面你会看到，我们需要比那些脚手架更多的进口。我们将在使用时讨论每一个。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> controllers

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"context"</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"sort"</span>
    <span class="token string">"time"</span>

    <span class="token string">"github.com/robfig/cron"</span>
    kbatch <span class="token string">"k8s.io/api/batch/v1"</span>
    corev1 <span class="token string">"k8s.io/api/core/v1"</span>
    metav1 <span class="token string">"k8s.io/apimachinery/pkg/apis/meta/v1"</span>
    <span class="token string">"k8s.io/apimachinery/pkg/runtime"</span>
    ref <span class="token string">"k8s.io/client-go/tools/reference"</span>
    ctrl <span class="token string">"sigs.k8s.io/controller-runtime"</span>
    <span class="token string">"sigs.k8s.io/controller-runtime/pkg/client"</span>
    <span class="token string">"sigs.k8s.io/controller-runtime/pkg/log"</span>

    batchv1 <span class="token string">"tutorial.kubebuilder.io/project/api/v1"</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我们需要一个时钟，这将允许我们在测试中伪造时间。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// CronJobReconciler reconciles a CronJob object</span>
<span class="token keyword">type</span> CronJobReconciler <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    client<span class="token punctuation">.</span>Client
    Scheme <span class="token operator">*</span>runtime<span class="token punctuation">.</span>Scheme
    Clock
<span class="token punctuation">}</span>
<span class="token comment">// Clock</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将模拟时钟，以便在测试时更容易在时间上跳跃，“真实的” 时钟只是调用 <code v-pre>time.Now</code> 。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> realClock <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token boolean">_</span> realClock<span class="token punctuation">)</span> <span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> time<span class="token punctuation">.</span>Time <span class="token punctuation">{</span> <span class="token keyword">return</span> time<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

<span class="token comment">// clock knows how to get the current time.</span>
<span class="token comment">// It can be used to fake out timing for testing.</span>
<span class="token keyword">type</span> Clock <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span> time<span class="token punctuation">.</span>Time
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，我们还需要一些RBAC权限--因为我们现在正在创建和管理作业，所以需要这些权限，这意味着要添加一些标记。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">//+kubebuilder:rbac:groups=batch.tutorial.kubebuilder.io,resources=cronjobs,verbs=get;list;watch;create;update;patch;delete</span>
<span class="token comment">//+kubebuilder:rbac:groups=batch.tutorial.kubebuilder.io,resources=cronjobs/status,verbs=get;update;patch</span>
<span class="token comment">//+kubebuilder:rbac:groups=batch.tutorial.kubebuilder.io,resources=cronjobs/finalizers,verbs=update</span>
<span class="token comment">//+kubebuilder:rbac:groups=batch,resources=jobs,verbs=get;list;watch;create;update;patch;delete</span>
<span class="token comment">//+kubebuilder:rbac:groups=batch,resources=jobs/status,verbs=get</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们进入控制器的核心--协调器逻辑。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> <span class="token punctuation">(</span>
    scheduledTimeAnnotation <span class="token operator">=</span> <span class="token string">"batch.tutorial.kubebuilder.io/scheduled-at"</span>
<span class="token punctuation">)</span>

<span class="token comment">// Reconcile is part of the main kubernetes reconciliation loop which aims to</span>
<span class="token comment">// move the current state of the cluster closer to the desired state.</span>
<span class="token comment">// TODO(user): Modify the Reconcile function to compare the state specified by</span>
<span class="token comment">// the CronJob object against the actual cluster state, and then</span>
<span class="token comment">// perform operations to make the cluster state reflect the state specified by</span>
<span class="token comment">// the user.</span>
<span class="token comment">//</span>
<span class="token comment">// For more details, check Reconcile and its Result here:</span>
<span class="token comment">// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.13.0/pkg/reconcile</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>r <span class="token operator">*</span>CronJobReconciler<span class="token punctuation">)</span> <span class="token function">Reconcile</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> req ctrl<span class="token punctuation">.</span>Request<span class="token punctuation">)</span> <span class="token punctuation">(</span>ctrl<span class="token punctuation">.</span>Result<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    log <span class="token operator">:=</span> log<span class="token punctuation">.</span><span class="token function">FromContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="按名称加载cronjob" tabindex="-1"><a class="header-anchor" href="#按名称加载cronjob" aria-hidden="true">#</a> 按名称加载CronJob</h3>
<p>我们将使用客户端获取CronJob。所有客户端方法都将上下文（以允许取消）作为其第一个参数，并将有问题的对象作为其最后一个参数。Get有点特殊，它将 <code v-pre>NamespacedName</code> 作为中间参数（大多数没有中间参数，我们将在下面看到）。</p>
<p>许多客户端方法也在最后采用可变参数选项。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> cronJob batchv1<span class="token punctuation">.</span>CronJob
<span class="token keyword">if</span> err <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>NamespacedName<span class="token punctuation">,</span> <span class="token operator">&amp;</span>cronJob<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to fetch CronJob"</span><span class="token punctuation">)</span>
    <span class="token comment">// we'll ignore not-found errors, since they can't be fixed by an immediate</span>
    <span class="token comment">// requeue (we'll need to wait for a new notification), and we can get them</span>
    <span class="token comment">// on deleted requests.</span>
    <span class="token keyword">return</span> ctrl<span class="token punctuation">.</span>Result<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">IgnoreNotFound</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="列出所有活动作业-并更新状态" tabindex="-1"><a class="header-anchor" href="#列出所有活动作业-并更新状态" aria-hidden="true">#</a> 列出所有活动作业，并更新状态</h3>
<p>要完全更新状态，我们需要列出此命名空间中属于此CronJob的所有子作业。与Get类似，我们可以使用List方法列出子作业。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>    <span class="token keyword">var</span> childJobs kbatch<span class="token punctuation">.</span>JobList
    <span class="token keyword">if</span> err <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">List</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>childJobs<span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">InNamespace</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>Namespace<span class="token punctuation">)</span><span class="token punctuation">,</span> client<span class="token punctuation">.</span>MatchingFields<span class="token punctuation">{</span>jobOwnerKey<span class="token punctuation">:</span> req<span class="token punctuation">.</span>Name<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to list child Jobs"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> ctrl<span class="token punctuation">.</span>Result<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> err
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们拥有了所有的作业，我们将把它们分成活动的、成功的和失败的作业，跟踪最近的运行，以便我们可以在状态中记录它。</p>
<p>请记住，状态应该能够从世界的状态中重新构建，因此通常从根对象的状态中读取不是一个好主意。相反，你应该在每次运行时重新构建它。这就是我们要做的。</p>
<p>我们可以使用状态条件检查作业是否“完成”以及它是成功还是失败。我们将把这个逻辑放在一个帮助器中，以使我们的代码更清晰。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>    <span class="token comment">// find the active list of jobs</span>
    <span class="token keyword">var</span> activeJobs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>kbatch<span class="token punctuation">.</span>Job
    <span class="token keyword">var</span> successfulJobs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>kbatch<span class="token punctuation">.</span>Job
    <span class="token keyword">var</span> failedJobs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>kbatch<span class="token punctuation">.</span>Job
    <span class="token keyword">var</span> mostRecentTime <span class="token operator">*</span>time<span class="token punctuation">.</span>Time <span class="token comment">// find the last run so we can update the status</span>
<span class="token comment">// isJobFinished</span>
<span class="token comment">// getScheduledTimeForJob</span>
    <span class="token keyword">for</span> i<span class="token punctuation">,</span> job <span class="token operator">:=</span> <span class="token keyword">range</span> childJobs<span class="token punctuation">.</span>Items <span class="token punctuation">{</span>
        <span class="token boolean">_</span><span class="token punctuation">,</span> finishedType <span class="token operator">:=</span> <span class="token function">isJobFinished</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>job<span class="token punctuation">)</span>
        <span class="token keyword">switch</span> finishedType <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token string">""</span><span class="token punctuation">:</span> <span class="token comment">// ongoing</span>
            activeJobs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>activeJobs<span class="token punctuation">,</span> <span class="token operator">&amp;</span>childJobs<span class="token punctuation">.</span>Items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> kbatch<span class="token punctuation">.</span>JobFailed<span class="token punctuation">:</span>
            failedJobs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>failedJobs<span class="token punctuation">,</span> <span class="token operator">&amp;</span>childJobs<span class="token punctuation">.</span>Items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> kbatch<span class="token punctuation">.</span>JobComplete<span class="token punctuation">:</span>
            successfulJobs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>successfulJobs<span class="token punctuation">,</span> <span class="token operator">&amp;</span>childJobs<span class="token punctuation">.</span>Items<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// We'll store the launch time in an annotation, so we'll reconstitute that from</span>
        <span class="token comment">// the active jobs themselves.</span>
        scheduledTimeForJob<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">getScheduledTimeForJob</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>job<span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to parse schedule time for child job"</span><span class="token punctuation">,</span> <span class="token string">"job"</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>job<span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> scheduledTimeForJob <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> mostRecentTime <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                mostRecentTime <span class="token operator">=</span> scheduledTimeForJob
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> mostRecentTime<span class="token punctuation">.</span><span class="token function">Before</span><span class="token punctuation">(</span><span class="token operator">*</span>scheduledTimeForJob<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                mostRecentTime <span class="token operator">=</span> scheduledTimeForJob
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> mostRecentTime <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        cronJob<span class="token punctuation">.</span>Status<span class="token punctuation">.</span>LastScheduleTime <span class="token operator">=</span> <span class="token operator">&amp;</span>metav1<span class="token punctuation">.</span>Time<span class="token punctuation">{</span>Time<span class="token punctuation">:</span> <span class="token operator">*</span>mostRecentTime<span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        cronJob<span class="token punctuation">.</span>Status<span class="token punctuation">.</span>LastScheduleTime <span class="token operator">=</span> <span class="token boolean">nil</span>
    <span class="token punctuation">}</span>
    cronJob<span class="token punctuation">.</span>Status<span class="token punctuation">.</span>Active <span class="token operator">=</span> <span class="token boolean">nil</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> activeJob <span class="token operator">:=</span> <span class="token keyword">range</span> activeJobs <span class="token punctuation">{</span>
        jobRef<span class="token punctuation">,</span> err <span class="token operator">:=</span> ref<span class="token punctuation">.</span><span class="token function">GetReference</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>Scheme<span class="token punctuation">,</span> activeJob<span class="token punctuation">)</span>
        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to make reference to active job"</span><span class="token punctuation">,</span> <span class="token string">"job"</span><span class="token punctuation">,</span> activeJob<span class="token punctuation">)</span>
            <span class="token keyword">continue</span>
        <span class="token punctuation">}</span>
        cronJob<span class="token punctuation">.</span>Status<span class="token punctuation">.</span>Active <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>cronJob<span class="token punctuation">.</span>Status<span class="token punctuation">.</span>Active<span class="token punctuation">,</span> <span class="token operator">*</span>jobRef<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我们将记录我们在稍高的日志级别上观察到的作业数量，以便进行调试。请注意，我们不是使用格式字符串，而是使用固定消息，并附加带有额外信息的键值对。这使得过滤和查询日志行更加容易。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>    log<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"job count"</span><span class="token punctuation">,</span> <span class="token string">"active jobs"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>activeJobs<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"successful jobs"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>successfulJobs<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"failed jobs"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>failedJobs<span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用我们收集的数据，我们将更新CRD的状态。就像以前一样，我们利用我们的客户。为了专门更新状态子资源，我们将使用客户端的 <code v-pre>Status</code> 部分和 <code v-pre>Update</code> 方法。</p>
<p>status子资源忽略对spec的更改，因此它不太可能与任何其他更新冲突，并且可以具有单独的权限。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>    <span class="token keyword">if</span> err <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Status</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>cronJob<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to update CronJob status"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> ctrl<span class="token punctuation">.</span>Result<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> err
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们更新了我们的状态，我们就可以继续确保世界的状态与我们在规范中想要的相匹配。</p>
<h3 id="根据历史限制清理旧作业" tabindex="-1"><a class="header-anchor" href="#根据历史限制清理旧作业" aria-hidden="true">#</a> 根据历史限制清理旧作业</h3>
<p>首先，我们将努力清理旧的工作，这样我们就不会留下太多的闲置工作。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// NB: deleting these are "best effort" -- if we fail on a particular one,</span>
    <span class="token comment">// we won't requeue just to finish the deleting.</span>
    <span class="token keyword">if</span> cronJob<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>FailedJobsHistoryLimit <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        sort<span class="token punctuation">.</span><span class="token function">Slice</span><span class="token punctuation">(</span>failedJobs<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> j <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> failedJobs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Status<span class="token punctuation">.</span>StartTime <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> failedJobs<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span>Status<span class="token punctuation">.</span>StartTime <span class="token operator">!=</span> <span class="token boolean">nil</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> failedJobs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Status<span class="token punctuation">.</span>StartTime<span class="token punctuation">.</span><span class="token function">Before</span><span class="token punctuation">(</span>failedJobs<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span>Status<span class="token punctuation">.</span>StartTime<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> i<span class="token punctuation">,</span> job <span class="token operator">:=</span> <span class="token keyword">range</span> failedJobs <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token function">int32</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token function">int32</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>failedJobs<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">*</span>cronJob<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>FailedJobsHistoryLimit <span class="token punctuation">{</span>
                <span class="token keyword">break</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> err <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> job<span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">PropagationPolicy</span><span class="token punctuation">(</span>metav1<span class="token punctuation">.</span>DeletePropagationBackground<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> client<span class="token punctuation">.</span><span class="token function">IgnoreNotFound</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to delete old failed job"</span><span class="token punctuation">,</span> <span class="token string">"job"</span><span class="token punctuation">,</span> job<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"deleted old failed job"</span><span class="token punctuation">,</span> <span class="token string">"job"</span><span class="token punctuation">,</span> job<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">if</span> cronJob<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>SuccessfulJobsHistoryLimit <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        sort<span class="token punctuation">.</span><span class="token function">Slice</span><span class="token punctuation">(</span>successfulJobs<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i<span class="token punctuation">,</span> j <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> successfulJobs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Status<span class="token punctuation">.</span>StartTime <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> successfulJobs<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span>Status<span class="token punctuation">.</span>StartTime <span class="token operator">!=</span> <span class="token boolean">nil</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> successfulJobs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">.</span>Status<span class="token punctuation">.</span>StartTime<span class="token punctuation">.</span><span class="token function">Before</span><span class="token punctuation">(</span>successfulJobs<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">.</span>Status<span class="token punctuation">.</span>StartTime<span class="token punctuation">)</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span>
        <span class="token keyword">for</span> i<span class="token punctuation">,</span> job <span class="token operator">:=</span> <span class="token keyword">range</span> successfulJobs <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token function">int32</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span> <span class="token operator">>=</span> <span class="token function">int32</span><span class="token punctuation">(</span><span class="token function">len</span><span class="token punctuation">(</span>successfulJobs<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">-</span><span class="token operator">*</span>cronJob<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>SuccessfulJobsHistoryLimit <span class="token punctuation">{</span>
                <span class="token keyword">break</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> err <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> job<span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">PropagationPolicy</span><span class="token punctuation">(</span>metav1<span class="token punctuation">.</span>DeletePropagationBackground<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to delete old successful job"</span><span class="token punctuation">,</span> <span class="token string">"job"</span><span class="token punctuation">,</span> job<span class="token punctuation">)</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"deleted old successful job"</span><span class="token punctuation">,</span> <span class="token string">"job"</span><span class="token punctuation">,</span> job<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="检查是否停止" tabindex="-1"><a class="header-anchor" href="#检查是否停止" aria-hidden="true">#</a> 检查是否停止</h3>
<p>如果这个对象被挂起，我们不想运行任何作业，所以我们现在停止。如果我们正在运行的作业出现故障，并且我们希望暂停运行以进行调查或处理集群，而不删除对象，则此功能非常有用。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> cronJob<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Suspend <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">*</span>cronJob<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Suspend <span class="token punctuation">{</span>
    log<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"cronjob suspended, skipping"</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> ctrl<span class="token punctuation">.</span>Result<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取下一次计划运行" tabindex="-1"><a class="header-anchor" href="#获取下一次计划运行" aria-hidden="true">#</a> 获取下一次计划运行</h3>
<p>如果我们没有暂停，我们将需要计算下一个计划的运行，以及我们是否有一个尚未处理的运行。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// getNextSchedule</span>
    <span class="token comment">// figure out the next times that we need to create</span>
    <span class="token comment">// jobs at (or anything we missed).</span>
    missedRun<span class="token punctuation">,</span> nextRun<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">getNextSchedule</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cronJob<span class="token punctuation">,</span> r<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to figure out CronJob schedule"</span><span class="token punctuation">)</span>
        <span class="token comment">// we don't really care about requeuing until we get an update that</span>
        <span class="token comment">// fixes the schedule, so don't return an error</span>
        <span class="token keyword">return</span> ctrl<span class="token punctuation">.</span>Result<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将准备最终的请求，以便在下一个作业之前重新排队，然后确定我们是否实际需要运行。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>    scheduledResult <span class="token operator">:=</span> ctrl<span class="token punctuation">.</span>Result<span class="token punctuation">{</span>RequeueAfter<span class="token punctuation">:</span> nextRun<span class="token punctuation">.</span><span class="token function">Sub</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span> <span class="token comment">// save this so we can re-use it elsewhere</span>
    log <span class="token operator">=</span> log<span class="token punctuation">.</span><span class="token function">WithValues</span><span class="token punctuation">(</span><span class="token string">"now"</span><span class="token punctuation">,</span> r<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"next run"</span><span class="token punctuation">,</span> nextRun<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="并发策略" tabindex="-1"><a class="header-anchor" href="#并发策略" aria-hidden="true">#</a> 并发策略</h3>
<p><strong>运行一个新的作业，如果它是按计划进行的，没有超过截止日期，也没有被我们的并发策略阻塞</strong></p>
<p>如果我们错过了一个运行，并且我们仍然在开始它的截止日期内，我们将需要运行一个作业。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>    <span class="token keyword">if</span> missedRun<span class="token punctuation">.</span><span class="token function">IsZero</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"no upcoming scheduled times, sleeping until next"</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> scheduledResult<span class="token punctuation">,</span> <span class="token boolean">nil</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// make sure we're not too late to start the run</span>
    log <span class="token operator">=</span> log<span class="token punctuation">.</span><span class="token function">WithValues</span><span class="token punctuation">(</span><span class="token string">"current run"</span><span class="token punctuation">,</span> missedRun<span class="token punctuation">)</span>
    tooLate <span class="token operator">:=</span> <span class="token boolean">false</span>
    <span class="token keyword">if</span> cronJob<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>StartingDeadlineSeconds <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        tooLate <span class="token operator">=</span> missedRun<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span><span class="token function">Duration</span><span class="token punctuation">(</span><span class="token operator">*</span>cronJob<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>StartingDeadlineSeconds<span class="token punctuation">)</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Before</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">Now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> tooLate <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"missed starting deadline for last run, sleeping till next"</span><span class="token punctuation">)</span>
        <span class="token comment">// TODO(directxman12): events</span>
        <span class="token keyword">return</span> scheduledResult<span class="token punctuation">,</span> <span class="token boolean">nil</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果我们实际上必须运行一个作业，我们需要等待现有的作业完成，替换现有的作业，或者只是添加新的作业。如果我们的信息由于缓存延迟而过期，我们将在获得最新信息时重新排队。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>    <span class="token comment">// figure out how to run this job -- concurrency policy might forbid us from running</span>
    <span class="token comment">// multiple at the same time...</span>
    <span class="token keyword">if</span> cronJob<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>ConcurrencyPolicy <span class="token operator">==</span> batchv1<span class="token punctuation">.</span>ForbidConcurrent <span class="token operator">&amp;&amp;</span> <span class="token function">len</span><span class="token punctuation">(</span>activeJobs<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"concurrency policy blocks concurrent runs, skipping"</span><span class="token punctuation">,</span> <span class="token string">"num active"</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>activeJobs<span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> scheduledResult<span class="token punctuation">,</span> <span class="token boolean">nil</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...or instruct us to replace existing ones...</span>
    <span class="token keyword">if</span> cronJob<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>ConcurrencyPolicy <span class="token operator">==</span> batchv1<span class="token punctuation">.</span>ReplaceConcurrent <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> activeJob <span class="token operator">:=</span> <span class="token keyword">range</span> activeJobs <span class="token punctuation">{</span>
            <span class="token comment">// we don't care if the job was already deleted</span>
            <span class="token keyword">if</span> err <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> activeJob<span class="token punctuation">,</span> client<span class="token punctuation">.</span><span class="token function">PropagationPolicy</span><span class="token punctuation">(</span>metav1<span class="token punctuation">.</span>DeletePropagationBackground<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> client<span class="token punctuation">.</span><span class="token function">IgnoreNotFound</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to delete active job"</span><span class="token punctuation">,</span> <span class="token string">"job"</span><span class="token punctuation">,</span> activeJob<span class="token punctuation">)</span>
                <span class="token keyword">return</span> ctrl<span class="token punctuation">.</span>Result<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> err
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一旦我们弄清楚了如何处理现有的工作，我们实际上就会创造出我们想要的工作</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// constructJobForCronJob</span>
    <span class="token comment">// actually make the job...</span>
    job<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">constructJobForCronJob</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>cronJob<span class="token punctuation">,</span> missedRun<span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to construct job from template"</span><span class="token punctuation">)</span>
        <span class="token comment">// don't bother requeuing until we get a change to the spec</span>
        <span class="token keyword">return</span> scheduledResult<span class="token punctuation">,</span> <span class="token boolean">nil</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// ...and create it on the cluster</span>
    <span class="token keyword">if</span> err <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> job<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"unable to create Job for CronJob"</span><span class="token punctuation">,</span> <span class="token string">"job"</span><span class="token punctuation">,</span> job<span class="token punctuation">)</span>
        <span class="token keyword">return</span> ctrl<span class="token punctuation">.</span>Result<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> err
    <span class="token punctuation">}</span>

    log<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"created Job for CronJob run"</span><span class="token punctuation">,</span> <span class="token string">"job"</span><span class="token punctuation">,</span> job<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="当我们看到一个正在运行的作业或者到了下一个计划运行的时间时重新排队" tabindex="-1"><a class="header-anchor" href="#当我们看到一个正在运行的作业或者到了下一个计划运行的时间时重新排队" aria-hidden="true">#</a> 当我们看到一个正在运行的作业或者到了下一个计划运行的时间时重新排队</h3>
<p>最后，我们将返回上面准备的结果，它表示我们希望在下一次运行时重新排队。</p>
<p>这是一个最大的期限--如果在这期间发生了其他变化，比如我们的工作开始或结束，我们被修改，等等，我们可能会更快地再次协调。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>    <span class="token comment">// we'll requeue once we see the running job, and update our status</span>
    <span class="token keyword">return</span> scheduledResult<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动-controller" tabindex="-1"><a class="header-anchor" href="#启动-controller" aria-hidden="true">#</a> 启动 Controller</h3>
<p>接下来我们可以启动这个 Controller 来看一下效果</p>
<p>直接运行 <code v-pre>make run</code> 即可运行代码，再终端中可以看到日志输出。</p>
<p>查看 Pod 是否成功创建出来了：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get pod 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="部署-controller" tabindex="-1"><a class="header-anchor" href="#部署-controller" aria-hidden="true">#</a> 部署 Controller</h3>
<p>我们将其部署了了一个 示例，也运行 Controller 看到了相应的 副本 Pod 被创建出来了，现在我们进一步模拟 Operator 实际使用时的部署方式，把 Controller 打包后以 container 的方式部署到 Kubernetes 集群环境中：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 构建镜像</span>
<span class="token function">make</span> docker-build <span class="token assign-left variable">IMG</span><span class="token operator">=</span>application-operator:v0.0.1

<span class="token comment"># 推送到 Kind 环境</span>
kind load docker-image

<span class="token comment"># 部署 controller </span>
<span class="token function">make</span> deploy <span class="token assign-left variable">IMG</span><span class="token operator">=</span>application-operator:v0.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>补充：我们可以在 dockerfile 中解决Go语言的代理问题：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ENV <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span>https://goproxy.op
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="资源清理" tabindex="-1"><a class="header-anchor" href="#资源清理" aria-hidden="true">#</a> 资源清理</h3>
<p>上面有讲过，用 Makefile 命令清理还是很方便的，我们直接清理就好了：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 卸载 controller</span>
<span class="token function">make</span> undeploy

<span class="token comment"># 卸载 CRD</span>
<span class="token function">make</span> uninstall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="client-go" tabindex="-1"><a class="header-anchor" href="#client-go" aria-hidden="true">#</a> Client-go</h2>
<p>Kubeilder 已经屏蔽了 client-go 的细节，但是如果希望深入掌握 Operator 开发机制，还是需要对 Client-go 熟悉的。</p>
<p>这是一篇还没入门的概念了解笔记：</p>
<ul>
<li><a href="https://docker.cubxxw.com/Cloud-Native-k8s/35.html" target="_blank" rel="noopener noreferrer">笔记部分 ~<ExternalLinkIcon/></a></li>
</ul>
<p>Kubernetes API是一组REST API，用于与Kubernetes集群交互。这些API允许开发人员执行各种操作，包括管理Pod、Deployment、Service、Namespace等。Kubernetes API由一组资源对象表示，例如Pod、Service、ReplicaSet等。这些资源对象由Kubernetes API Server管理，并可以通过kubectl等工具进行查询和修改。</p>
<table>
<thead>
<tr>
<th>方式</th>
<th>特点</th>
<th>支持者</th>
</tr>
</thead>
<tbody>
<tr>
<td>Kubernetes dashboard</td>
<td>直接通过Web UI进行操作，简单直接，可定制化程度低</td>
<td>官方支持</td>
</tr>
<tr>
<td>kubectl</td>
<td>命令行操作，功能最全，但是比较复杂，适合对其进行进一步的分装，定制功能，版本适配最好</td>
<td>官方支持</td>
</tr>
<tr>
<td><a href="https://github.com/kubernetes/client-go" target="_blank" rel="noopener noreferrer">client-go<ExternalLinkIcon/></a></td>
<td>从kubernetes的代码中抽离出来的客户端包，简单易用，但需要小心区分kubernetes的API版本</td>
<td>官方支持</td>
</tr>
</tbody>
</table>
<blockquote>
<p>Kubernetes API Server 提供的是默认的 HTTPS 服务，而且是双向的 TLS 认证，而我们目前的关注点是 API 本身，因此先通过 Kubectl 来代理 API Server 服务。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubectl proxy <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>接下来就可以通过简单的 HTTP 请求来和 API Server 交互了：</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">curl</span> localhost:8080/version
<span class="token punctuation">{</span>
  <span class="token string">"major"</span><span class="token builtin class-name">:</span> <span class="token string">"1"</span>,
  <span class="token string">"minor"</span><span class="token builtin class-name">:</span> <span class="token string">"19"</span>,
  <span class="token string">"gitVersion"</span><span class="token builtin class-name">:</span> <span class="token string">"v1.19.16"</span>,
  <span class="token string">"gitCommit"</span><span class="token builtin class-name">:</span> <span class="token string">"e37e4ab4cc8dcda84f1344dda47a97bb1927d074"</span>,
  <span class="token string">"gitTreeState"</span><span class="token builtin class-name">:</span> <span class="token string">"clean"</span>,
  <span class="token string">"buildDate"</span><span class="token builtin class-name">:</span> <span class="token string">"2022-10-26T15:40:32Z"</span>,
  <span class="token string">"goVersion"</span><span class="token builtin class-name">:</span> <span class="token string">"go1.15.15"</span>,
  <span class="token string">"compiler"</span><span class="token builtin class-name">:</span> <span class="token string">"gc"</span>,
  <span class="token string">"platform"</span><span class="token builtin class-name">:</span> <span class="token string">"linux/amd64"</span>
<span class="token punctuation">}</span><span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们可能还需要一个配置文件来描述 Deployment 资源，在本地创建一个 <code v-pre>nginx-deploy.yaml</code> 文件:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.14.2
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们创建它：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubectl create <span class="token parameter variable">-f</span> nginx-deploy.yaml
deployment.apps/nginx-deployment created
❯ k get deployment
NAME               READY   UP-TO-DATE   AVAILABLE   AGE
my-nginx-app       <span class="token number">0</span>/3     <span class="token number">3</span>            <span class="token number">0</span>           23h
nginx-deployment   <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           19s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Deployment 创建的 API 和 在 Kubernetes 中 API 的路径一样：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>POST /apis/apps/v1/namespace/{namespace}/deployment
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>Kubernetes中使用的 RESTful 接口更新这些对象，包括操作：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token list punctuation">-</span> GET：从服务器读取一个资源。
<span class="token list punctuation">-</span> POST：在服务器上创建一个新的资源。
<span class="token list punctuation">-</span> PUT：在服务器上更新一个资源。
<span class="token list punctuation">-</span> DELETE：从服务器删除一个资源。
<span class="token list punctuation">-</span> HEAD：从服务器读取一个资源的头信息。
<span class="token list punctuation">-</span> PATCH：在服务器上部分更新一个资源。
<span class="token list punctuation">-</span> OPTIONS：列出服务器支持的方法和功能。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p>既然想尝试 kubectl，那么来点新花样：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">curl</span> localhost:8080/apis/apps/v1/namespaces/default/deployments/nginx-deploymen
<span class="token punctuation">{</span>
  <span class="token string">"kind"</span><span class="token builtin class-name">:</span> <span class="token string">"Status"</span>,
  <span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span> <span class="token string">"v1"</span>,
  <span class="token string">"metadata"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>,
  <span class="token string">"status"</span><span class="token builtin class-name">:</span> <span class="token string">"Failure"</span>,
  <span class="token string">"message"</span><span class="token builtin class-name">:</span> <span class="token string">"deployments.apps <span class="token entity" title="\&quot;">\"</span>nginx-deploymen<span class="token entity" title="\&quot;">\"</span> not found"</span>,
  <span class="token string">"reason"</span><span class="token builtin class-name">:</span> <span class="token string">"NotFound"</span>,
  <span class="token string">"details"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"nginx-deploymen"</span>,
    <span class="token string">"group"</span><span class="token builtin class-name">:</span> <span class="token string">"apps"</span>,
    <span class="token string">"kind"</span><span class="token builtin class-name">:</span> <span class="token string">"deployments"</span>
  <span class="token punctuation">}</span>,
  <span class="token string">"code"</span><span class="token builtin class-name">:</span> <span class="token number">404</span>
<span class="token punctuation">}</span><span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>资源创建：</strong></p>
<p>Depolyment 的创建 API 是：<code v-pre>apps/v1</code> 中的 Deployment。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>POST /apis/apps/v1/namespaces/<span class="token punctuation">{</span>namespace<span class="token punctuation">}</span>/deployments
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行以下命令在 default 命名空间下创建一个 deployment：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token parameter variable">--header</span> <span class="token string">'Content-Type: application/yaml'</span> --data-binary @nginx-deploy.yaml http://localhost:8080/apis/apps/v1/namespaces/default/deployments
<span class="token punctuation">{</span>
  <span class="token string">"kind"</span><span class="token builtin class-name">:</span> <span class="token string">"Status"</span>,
  <span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span> <span class="token string">"v1"</span>,
  <span class="token string">"metadata"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>

  <span class="token punctuation">}</span>,
  <span class="token string">"status"</span><span class="token builtin class-name">:</span> <span class="token string">"Failure"</span>,
  <span class="token string">"message"</span><span class="token builtin class-name">:</span> <span class="token string">"deployments.apps <span class="token entity" title="\&quot;">\"</span>nginx-deployment<span class="token entity" title="\&quot;">\"</span> already exists"</span>,
  <span class="token string">"reason"</span><span class="token builtin class-name">:</span> <span class="token string">"AlreadyExists"</span>,
  <span class="token string">"details"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"nginx-deployment"</span>,
    <span class="token string">"group"</span><span class="token builtin class-name">:</span> <span class="token string">"apps"</span>,
    <span class="token string">"kind"</span><span class="token builtin class-name">:</span> <span class="token string">"deployments"</span>
  <span class="token punctuation">}</span>,
  <span class="token string">"code"</span><span class="token builtin class-name">:</span> <span class="token number">409</span>
<span class="token punctuation">}</span><span class="token comment">#</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sample-controller" tabindex="-1"><a class="header-anchor" href="#sample-controller" aria-hidden="true">#</a> sample-controller</h2>
<p>我们将用于实验创建操作符的第一个工具是sample-controller，你可以在这里找到：https://github.com/kubernetes/sample-controller。</p>
<p>这个项目为 <code v-pre>Foo</code> 类型实现了一个简单的操作符，当我们创建一个自定义对象 <code v-pre>foo</code> 时，它将创建一个带有一些公共Docker镜像和特定数量副本的部署。</p>
<p>我们在上面已经下载过，现在我尝试编译它：</p>
<blockquote>
<p>go version: <code v-pre> gvm use go1.20</code></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token builtin class-name">export</span> <span class="token assign-left variable">SAMPLE</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/sample-controller
❯ <span class="token function">git</span> clone https://github.com/cubxxw/sample-controller.git <span class="token variable">$SAMPLE</span>  <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> <span class="token variable">$SAMPLE</span><span class="token punctuation">;</span>
❯ go build <span class="token parameter variable">-o</span> ctrl <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们创建一个 CRD：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubectl apply <span class="token parameter variable">-f</span> artifacts/examples/crd-status-subresource.yaml
customresourcedefinition.apiextensions.k8s.io/foos.samplecontroller.k8s.io created
❯ k get CustomResourceDefinition
NAME                           CREATED AT
crontabs.stable.example.com    <span class="token number">2023</span>-04-07T09:17:55Z
foos.samplecontroller.k8s.io   <span class="token number">2023</span>-04-08T12:09:46Z
guestbooks.webapp.my.domain    <span class="token number">2023</span>-04-07T15:42:22Z
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们运行控制器：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>./ctrl <span class="token parameter variable">-kubeconfig</span> ~/.kube/config  <span class="token parameter variable">-logtostderr</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>-logtostderr=true</code>：将日志记录到标准错误而不是文件(默认为true)</p>
</blockquote>
<p>现在，我们可以在另一个终端上操作 <code v-pre>Foo</code> 对象，看看控制器会发生什么：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubectl apply <span class="token parameter variable">-f</span> artifacts/examples/example-foo.yaml
foo.samplecontroller.k8s.io/example-foo created
❯ k get Foo
NAME          AGE
example-foo   9s

<span class="token comment"># ----- 删除 Foo -------</span>
❯ kubectl delete <span class="token parameter variable">-f</span> artifacts/examples/example-foo.yaml
foo.samplecontroller.k8s.io <span class="token string">"example-foo"</span> deleted
❯ k get pod <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> <span class="token string">"Foo"</span>
❯ k get Foo
No resources found <span class="token keyword">in</span> default namespace.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>在编写和使用Kubernetes 1.11.0时，控制器将在创建部署后更新 <code v-pre>foo</code> 对象的状态时进入无限循环：在 <code v-pre>updateFooStatus</code> 函数中，你必须通过调用 <code v-pre>UpdateStatus(fooCopy)</code> 来更改对 <code v-pre>Update(fooCopy)</code> 的调用。</p>
</blockquote>
<p><strong>很好理解不是吗，apply 声明式在 controller 中也是通过 for 循环不断的进行校验。检查 status 和 spec 的区别，是否达成一致。</strong></p>
<p>我找出官方的最简单的案例拿出来：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">for</span> <span class="token punctuation">{</span>
  desired <span class="token operator">:=</span> <span class="token function">getDesiredState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">// 期望状态</span>
  current <span class="token operator">:=</span> <span class="token function">getCurrentState</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	<span class="token comment">// 实际状态</span>
  <span class="token function">makeChanges</span><span class="token punctuation">(</span>desired<span class="token punctuation">,</span> current<span class="token punctuation">)</span> <span class="token comment">// 调谐过程</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>可以看出本质上就是一个循环，通过 <code v-pre>getDesiredState()</code> 获取到 spec 中的期望状态，通过 <code v-pre>getCurrentState()</code> 获取到 status 当前集群的实际状态，然后进行调谐。</p>
</blockquote>
<p>到目前为止一切顺利，控制器使工作：当我们创建 <code v-pre>foo</code> 对象时，它会创建一个部署，当我们删除该对象时，它会停止部署。</p>
<p>现在我们可以进一步调整CRD和控制器，以使用我们自己的自定义资源定义。</p>
<p>假设我们的目标是编写一个 <code v-pre>operator</code> ，它 将在集群的节点上部署一个守护进程。它将使用 <code v-pre>DaemonSet</code> 对象来部署此守护进程，我们希望能够指定一个标签，以便仅在标记有此标签的节点上部署守护进程。我们还希望能够指定要部署的 Docker 镜像，而不是像<code v-pre>sample-controller</code>那样使用静态镜像。</p>
<p>让我们首先为 <code v-pre>GenericDaemon</code> 类型创建自定义资源定义：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>❯ cat artifacts/generic<span class="token punctuation">-</span>daemon/crd.yaml
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> genericdaemons.mydomain.com
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> mydomain.com
  <span class="token key atrule">version</span><span class="token punctuation">:</span> v1beta1
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Genericdaemon
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> genericdaemons
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
  <span class="token key atrule">validation</span><span class="token punctuation">:</span>
    <span class="token key atrule">openAPIV3Schema</span><span class="token punctuation">:</span>
      <span class="token key atrule">properties</span><span class="token punctuation">:</span>
        <span class="token key atrule">spec</span><span class="token punctuation">:</span>
          <span class="token key atrule">properties</span><span class="token punctuation">:</span>
            <span class="token key atrule">label</span><span class="token punctuation">:</span>
              <span class="token key atrule">type</span><span class="token punctuation">:</span> string
            <span class="token key atrule">image</span><span class="token punctuation">:</span>
              <span class="token key atrule">type</span><span class="token punctuation">:</span> string
          <span class="token key atrule">required</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> image
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是要部署的守护进程的第一个示例：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>// artifacts/generic<span class="token punctuation">-</span>daemon/syslog.yaml
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> mydomain.com/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Genericdaemon
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> syslog
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">label</span><span class="token punctuation">:</span> logs
  <span class="token key atrule">image</span><span class="token punctuation">:</span> mbessler/syslogdocker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在我们必须为API构建go文件，以便从操作符访问这个新的自定义资源定义。为此，让我们创建一个新目录 <code v-pre>pkg/apis/genericdaemon</code> ，我们将在其中复制在 <code v-pre>pkg/apis/samplecontroller</code> 中找到的文件（但不包括 <code v-pre>zz_generated.deepcopy.go</code> ）</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>❯  tree pkg<span class="token operator">/</span>apis<span class="token operator">/</span>genericdaemon<span class="token operator">/</span>
pkg<span class="token operator">/</span>apis<span class="token operator">/</span>genericdaemon<span class="token operator">/</span>
├── register<span class="token punctuation">.</span><span class="token keyword">go</span>
└── v1alpha1
    ├── doc<span class="token punctuation">.</span><span class="token keyword">go</span>
    ├── register<span class="token punctuation">.</span><span class="token keyword">go</span>
    └── types<span class="token punctuation">.</span><span class="token keyword">go</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并调整其内容（更改的部分以粗体显示）：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">////////////////</span>
<span class="token comment">// register.go</span>
<span class="token comment">////////////////</span>
<span class="token keyword">package</span> genericdaemon
<span class="token keyword">const</span> <span class="token punctuation">(</span>
 GroupName <span class="token operator">=</span> <span class="token string">"mydomain.com"</span>
<span class="token punctuation">)</span>
<span class="token comment">/////////////////////</span>
<span class="token comment">// v1beta1/doc.go</span>
<span class="token comment">/////////////////////</span>
<span class="token comment">// +k8s:deepcopy-gen=package</span>
<span class="token comment">// Package v1beta1 is the v1beta1 version of the API.</span>
<span class="token comment">// +groupName=mydomain.com</span>
<span class="token keyword">package</span> v1beta1
<span class="token comment">/////////////////////////</span>
<span class="token comment">// v1beta1/register.go</span>
<span class="token comment">/////////////////////////</span>
<span class="token keyword">package</span> v1beta1
<span class="token keyword">import</span> <span class="token punctuation">(</span>
 metav1 <span class="token string">"k8s.io/apimachinery/pkg/apis/meta/v1"</span>
 <span class="token string">"k8s.io/apimachinery/pkg/runtime"</span>
 <span class="token string">"k8s.io/apimachinery/pkg/runtime/schema"</span>
genericdaemon <span class="token string">"k8s.io/sample-controller/pkg/apis/genericdaemon"</span>
<span class="token punctuation">)</span>
<span class="token comment">// SchemeGroupVersion is group version used to register these objects</span>
<span class="token keyword">var</span> SchemeGroupVersion <span class="token operator">=</span> schema<span class="token punctuation">.</span>GroupVersion<span class="token punctuation">{</span>Group<span class="token punctuation">:</span> genericdaemon<span class="token punctuation">.</span>GroupName<span class="token punctuation">,</span> Version<span class="token punctuation">:</span> <span class="token string">"v1beta1"</span><span class="token punctuation">}</span>
<span class="token comment">// Kind takes an unqualified kind and returns back a Group qualified GroupKind</span>
<span class="token keyword">func</span> <span class="token function">Kind</span><span class="token punctuation">(</span>kind <span class="token builtin">string</span><span class="token punctuation">)</span> schema<span class="token punctuation">.</span>GroupKind <span class="token punctuation">{</span>
 <span class="token keyword">return</span> SchemeGroupVersion<span class="token punctuation">.</span><span class="token function">WithKind</span><span class="token punctuation">(</span>kind<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GroupKind</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// Resource takes an unqualified resource and returns a Group qualified GroupResource</span>
<span class="token keyword">func</span> <span class="token function">Resource</span><span class="token punctuation">(</span>resource <span class="token builtin">string</span><span class="token punctuation">)</span> schema<span class="token punctuation">.</span>GroupResource <span class="token punctuation">{</span>
 <span class="token keyword">return</span> SchemeGroupVersion<span class="token punctuation">.</span><span class="token function">WithResource</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GroupResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> <span class="token punctuation">(</span>
 SchemeBuilder <span class="token operator">=</span> runtime<span class="token punctuation">.</span><span class="token function">NewSchemeBuilder</span><span class="token punctuation">(</span>addKnownTypes<span class="token punctuation">)</span>
 AddToScheme   <span class="token operator">=</span> SchemeBuilder<span class="token punctuation">.</span>AddToScheme
<span class="token punctuation">)</span>
<span class="token comment">// Adds the list of known types to Scheme.</span>
<span class="token keyword">func</span> <span class="token function">addKnownTypes</span><span class="token punctuation">(</span>scheme <span class="token operator">*</span>runtime<span class="token punctuation">.</span>Scheme<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
 scheme<span class="token punctuation">.</span><span class="token function">AddKnownTypes</span><span class="token punctuation">(</span>SchemeGroupVersion<span class="token punctuation">,</span>
  <span class="token operator">&amp;</span>Genericdaemon<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token operator">&amp;</span>GenericdaemonList<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
 <span class="token punctuation">)</span>
 metav1<span class="token punctuation">.</span><span class="token function">AddToGroupVersion</span><span class="token punctuation">(</span>scheme<span class="token punctuation">,</span> SchemeGroupVersion<span class="token punctuation">)</span>
 <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
<span class="token comment">//////////////////////</span>
<span class="token comment">// v1beta1/types.go</span>
<span class="token comment">//////////////////////</span>
<span class="token keyword">package</span> v1beta1
<span class="token keyword">import</span> <span class="token punctuation">(</span>
 metav1 <span class="token string">"k8s.io/apimachinery/pkg/apis/meta/v1"</span>
<span class="token punctuation">)</span>
<span class="token comment">// +genclient</span>
<span class="token comment">// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object</span>
<span class="token comment">// Genericdaemon is a specification for a Generic Daemon resource</span>
<span class="token keyword">type</span> Genericdaemon <span class="token keyword">struct</span> <span class="token punctuation">{</span>
 metav1<span class="token punctuation">.</span>TypeMeta   <span class="token string">`json:",inline"`</span>
 metav1<span class="token punctuation">.</span>ObjectMeta <span class="token string">`json:"metadata,omitempty"`</span>
 Spec   GenericdaemonSpec   <span class="token string">`json:"spec"`</span>
 Status GenericdaemonStatus <span class="token string">`json:"status"`</span>
<span class="token punctuation">}</span>
<span class="token comment">// GenericDaemonSpec is the spec for a GenericDaemon resource</span>
<span class="token keyword">type</span> GenericdaemonSpec <span class="token keyword">struct</span> <span class="token punctuation">{</span>
 Label <span class="token builtin">string</span> <span class="token string">`json:"label"`</span>
 Image <span class="token builtin">string</span> <span class="token string">`json:"image"`</span>
<span class="token punctuation">}</span>
<span class="token comment">// GenericDaemonStatus is the status for a GenericDaemon resource</span>
<span class="token keyword">type</span> GenericdaemonStatus <span class="token keyword">struct</span> <span class="token punctuation">{</span>
 Installed <span class="token builtin">int32</span> <span class="token string">`json:"installed"`</span>
<span class="token punctuation">}</span>
<span class="token comment">// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object</span>
<span class="token comment">// GenericDaemonList is a list of GenericDaemon resources</span>
<span class="token keyword">type</span> GenericdaemonList <span class="token keyword">struct</span> <span class="token punctuation">{</span>
 metav1<span class="token punctuation">.</span>TypeMeta <span class="token string">`json:",inline"`</span>
 metav1<span class="token punctuation">.</span>ListMeta <span class="token string">`json:"metadata"`</span>
Items <span class="token punctuation">[</span><span class="token punctuation">]</span>Genericdaemon <span class="token string">`json:"items"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们再来看看它为我们提供了哪些可用的脚本:</p>
<p>它使用www.example.com中的生成器<a href="https://github.com/kubernetes/code-generator" target="_blank" rel="noopener noreferrer">k8s.io/code-generator<ExternalLinkIcon/></a> 生成一个类型化的客户端、informers、listers和deep-copy函数。你可以使用<code v-pre>./hack/update-codegen.sh</code>脚本自己执行此操作。</p>
<h3 id="代码生成器" tabindex="-1"><a class="header-anchor" href="#代码生成器" aria-hidden="true">#</a> 代码生成器</h3>
<p><code v-pre>k8s.io/client-go</code> 提供了对 k8s 原生资源的informer和clientset等等，但对于自定义资源的操作则相对低效，需要使用 rest api 和 <code v-pre>dynamic client</code> 来操作，并自己实现反序列化等功能。</p>
<p>code-generator 提供了以下工具用于为k8s中的资源生成相关代码，可以更加方便的操作自定义资源：</p>
<p><code v-pre>deepcopy-gen</code>: 生成深度拷贝对象方法 ~</p>
<p><strong>使用方法：</strong></p>
<ul>
<li>在文件中添加注释<code v-pre>// +k8s:deepcopy-gen=package</code></li>
<li>为单个类型添加自动生成<code v-pre>// +k8s:deepcopy-gen=true</code></li>
<li>为单个类型关闭自动生成<code v-pre>// +k8s:deepcopy-gen=false</code></li>
</ul>
<p><code v-pre>client-gen</code>: 为资源生成标准的操作方法(get; list; watch; create; update; patch; delete)</p>
<blockquote>
<p>在 <code v-pre>pkg/apis/${GROUP}/${VERSION}/types.go</code>中使用，使用<code v-pre>// +genclient</code>标记对应类型生成的客户端， 如果与该类型相关联的资源不是命名空间范围的(例如PersistentVolume), 则还需要附加<code v-pre>// + genclient：nonNamespaced</code>标记，</p>
</blockquote>
<ul>
<li>
<p><code v-pre>// +genclient</code> - 生成默认的客户端动作函数（create, update, delete, get, list, update, patch, watch以及 是否生成updateStatus取决于.Status字段是否存在）。</p>
</li>
<li>
<p><code v-pre>// +genclient:nonNamespaced</code> - 所有动作函数都是在没有名称空间的情况下生成</p>
</li>
<li>
<p><code v-pre>// +genclient:onlyVerbs=create,get</code> - 指定的动作函数被生成.</p>
</li>
<li>
<p><code v-pre>// +genclient:skipVerbs=watch</code> - 生成watch以外所有的动作函数.</p>
</li>
<li>
<p><code v-pre>// +genclient:noStatus</code> - 即使.<code v-pre>Status</code>字段存在也不生成<code v-pre>updateStatus</code>动作函数</p>
</li>
</ul>
<p><code v-pre>informer-gen</code>: 生成<code v-pre>informer</code>，提供事件机制(AddFunc,UpdateFunc,DeleteFunc)来响应kubernetes的event</p>
<p><code v-pre>lister-gen</code>: 为 <code v-pre>get</code> 和 <code v-pre>list</code> 方法提供只读缓存层</p>
<p><code v-pre>conversion-gen</code>是用于自动生成在内部和外部类型之间转换的函数的工具</p>
<p>一般的转换代码生成任务涉及三套程序包：</p>
<ul>
<li>一套包含内部类型的程序包。</li>
<li>一套包含外部类型的程序包。</li>
<li>单个目标程序包（即，生成的转换函数所在的位置，以及开发人员授权的转换功能所在的位置）。包含内部类型的包在 <code v-pre>Kubernetes</code> 的常规代码生成框架中扮演着称为<code v-pre>peer package</code>的角色。</li>
</ul>
<p>使用方法：</p>
<ul>
<li>标记转换内部软件包 <code v-pre>// +k8s:conversion-gen=&lt;import-path-of-internal-package&gt;</code></li>
<li>标记转换外部软件包<code v-pre>// +k8s:conversion-gen-external-types=&lt;import-path-of-external-package&gt;</code></li>
<li>标记不转换对应注释或结构 <code v-pre>// +k8s:conversion-gen=false</code></li>
</ul>
<p><code v-pre>defaulter-gen</code> 用于生产Defaulter函数</p>
<ul>
<li>为包含字段的所有类型创建defaulters，<code v-pre>// +k8s:defaulter-gen=&lt;field-name-to-flag&gt;</code></li>
<li>所有都生成<code v-pre>// +k8s:defaulter-gen=true|false</code></li>
</ul>
<p><code v-pre>go-to-protobuf</code> 通过go struct生成 pb idl</p>
<p><code v-pre>import-boss</code> 在给定存储库中强制执行导入限制</p>
<p><code v-pre>openapi-gen</code> 生成openAPI定义</p>
<p>使用方法：</p>
<ul>
<li><code v-pre>+k8s:openapi-gen=true</code> 为指定包或方法开启</li>
<li><code v-pre>+k8s:openapi-gen=false</code> 指定包关闭</li>
</ul>
<p><code v-pre>register-gen</code> 生成<code v-pre>register</code></p>
<p><code v-pre>set-gen</code></p>
<p>code-generator整合了这些gen，使用脚本<a href="https://github.com/kubernetes/code-generator/blob/master/generate-groups.sh" target="_blank" rel="noopener noreferrer">generate-groups.sh<ExternalLinkIcon/></a>和<a href="https://github.com/kubernetes/code-generator/blob/master/generate-internal-groups.sh" target="_blank" rel="noopener noreferrer">generate-internal-groups.sh<ExternalLinkIcon/></a>可以为自定义资源生产相关代码。</p>
<h3 id="脚本自动生成" tabindex="-1"><a class="header-anchor" href="#脚本自动生成" aria-hidden="true">#</a> 脚本自动生成</h3>
<p>脚本 <code v-pre>hack/update-codegen.sh</code> 可用于围绕我们使用这些先前文件定义的新自定义资源定义生成代码。我们将不得不调整这个脚本来为我们的新 <code v-pre>CRD</code> 生成文件：</p>
<p><code v-pre>update-codegen</code>脚本将自动生成以下文件&amp; 目录：</p>
<ul>
<li><code v-pre>pkg/apis/samplecontroller/v1alpha1/zz_generated.deepcopy.go</code></li>
<li><code v-pre>pkg/generated/</code></li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>// hack/update<span class="token punctuation">-</span>codegen.sh
<span class="token comment">#!/usr/bin/env bash</span>
set <span class="token punctuation">-</span>o errexit
set <span class="token punctuation">-</span>o nounset
set <span class="token punctuation">-</span>o pipefail

SCRIPT_ROOT=$(dirname "$<span class="token punctuation">{</span>BASH_SOURCE<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">}</span>")/..
CODEGEN_PKG=$<span class="token punctuation">{</span>CODEGEN_PKG<span class="token punctuation">:</span><span class="token punctuation">-</span>$(cd "$<span class="token punctuation">{</span>SCRIPT_ROOT<span class="token punctuation">}</span>"; ls <span class="token punctuation">-</span>d <span class="token punctuation">-</span>1 ./vendor/k8s.io/code<span class="token punctuation">-</span>generator 2<span class="token punctuation">></span>/dev/null <span class="token punctuation">|</span><span class="token punctuation">|</span> echo ../code<span class="token punctuation">-</span>generator)<span class="token punctuation">}</span>

<span class="token comment"># generate the code with:</span>
<span class="token comment"># --output-base    because this script should also be able to run inside the vendor dir of</span>
<span class="token comment">#                  k8s.io/kubernetes. The output-base is needed for the generators to output into the vendor dir</span>
<span class="token comment">#                  instead of the $GOPATH directly. For normal projects this can be dropped.</span>
echo "===<span class="token punctuation">></span> Generating code<span class="token punctuation">...</span>"
"$<span class="token punctuation">{</span>CODEGEN_PKG<span class="token punctuation">}</span>/generate<span class="token punctuation">-</span>groups.sh" "deepcopy<span class="token punctuation">,</span>client<span class="token punctuation">,</span>informer<span class="token punctuation">,</span>lister" \
  k8s.io/sample<span class="token punctuation">-</span>controller/pkg/generated \
  k8s.io/sample<span class="token punctuation">-</span>controller/pkg/apis \
  samplecontroller<span class="token punctuation">:</span>v1alpha1 \
  <span class="token punctuation">-</span><span class="token punctuation">-</span>output<span class="token punctuation">-</span>base "$(dirname "$<span class="token punctuation">{</span>BASH_SOURCE<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">}</span>")/../../.." \
  <span class="token punctuation">-</span><span class="token punctuation">-</span>go<span class="token punctuation">-</span>header<span class="token punctuation">-</span>file "$<span class="token punctuation">{</span>SCRIPT_ROOT<span class="token punctuation">}</span>"/hack/boilerplate.go.txt
<span class="token comment"># To use your own boilerplate text append:</span>
<span class="token comment">#   --go-header-file "${SCRIPT_ROOT}"/hack/custom-boilerplate.go.txt</span>

echo "===<span class="token punctuation">></span> Generating genericdaemon code"
"$<span class="token punctuation">{</span>CODEGEN_PKG<span class="token punctuation">}</span>/generate<span class="token punctuation">-</span>groups.sh" "deepcopy<span class="token punctuation">,</span>client<span class="token punctuation">,</span>informer<span class="token punctuation">,</span>lister" \
  k8s.io/sample<span class="token punctuation">-</span>controller/pkg/generated \
  k8s.io/sample<span class="token punctuation">-</span>controller/pkg/apis \
  genericdaemon<span class="token punctuation">:</span>v1beta1 \
  <span class="token punctuation">-</span><span class="token punctuation">-</span>output<span class="token punctuation">-</span>base "$(dirname "$<span class="token punctuation">{</span>BASH_SOURCE<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">}</span>")/../../.." \
  <span class="token punctuation">-</span><span class="token punctuation">-</span>go<span class="token punctuation">-</span>header<span class="token punctuation">-</span>file "$<span class="token punctuation">{</span>SCRIPT_ROOT<span class="token punctuation">}</span>"/hack/boilerplate.go.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行它：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ ./hack/update-codegen.sh 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们现在可以调整我们的<code v-pre>operator</code> 。首先，我们必须将所有对前一个 <code v-pre>Foo</code> 类型的引用更改为 <code v-pre>Genericdaemon</code> 类型。第二，当创建新的通用守护进程时，我们必须创建Daemonset而不是部署。</p>
<h3 id="将-operator-部署到kubernetes集群" tabindex="-1"><a class="header-anchor" href="#将-operator-部署到kubernetes集群" aria-hidden="true">#</a> 将 operator 部署到Kubernetes集群</h3>
<p>当我们根据需要修改完sample-controller后，我们需要将其部署到kubernetes集群。事实上，在这个时候，我们已经通过使用我们的凭证从我们的开发系统运行它来测试它。</p>
<p>下面是一个简单的Dockerfile，用于使用<code v-pre>operator</code>构建Docker镜像（你必须从原始的<code v-pre>sample-controller</code>中删除所有代码才能构建镜像）：</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> golang</span>
<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /go/src/k8s.io/sample-controller</span>
<span class="token instruction"><span class="token keyword">ADD</span> . /go/src/k8s.io/sample-controller</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /go</span>
<span class="token instruction"><span class="token keyword">RUN</span> go get ./...</span>
<span class="token instruction"><span class="token keyword">RUN</span> go install -v ./...</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"/go/bin/sample-controller"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以构建镜像并将其推送到Docker Hub：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">docker</span> build <span class="token builtin class-name">.</span> <span class="token parameter variable">-t</span> cubxxw/genericdaemon
❯ <span class="token function">docker</span> push cubxxw/genericdaemon
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>⚠️ 最开始使用 <code v-pre>buildpacks</code> 来构建的，太离谱了，放弃了~</p>
</blockquote>
<p>最后，使用此新映像启动部署：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>// deploy.yaml
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> sample<span class="token punctuation">-</span>controller
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> sample
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> sample
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> sample
        <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">"cubxxw/genericdaemon:latest"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>and <code v-pre>kubectl apply -f deploy.yaml</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k get deployment
NAME                READY   UP-TO-DATE   AVAILABLE   AGE
my-nginx-app        <span class="token number">0</span>/3     <span class="token number">3</span>            <span class="token number">0</span>           29h
nginx-deployment    <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           5h42m
sample-controller   <span class="token number">0</span>/1     <span class="token number">1</span>            <span class="token number">0</span>           34s

❯ k get pod <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> sample-controller
sample-controller-779777db4b-xh74l   <span class="token number">0</span>/1     CrashLoopBackOff   <span class="token number">5</span>          6m20s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>operator</code> 现在正在运行，但是如果我们检查 pod 的日志，我们可以看到授权存在问题;POD不获得对不同资源的访问权限：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubectl logs sample-controller-779777db4b-xh74l
E0721 <span class="token number">14</span>:34:50.499584       <span class="token number">1</span> reflector.go:134<span class="token punctuation">]</span> k8s.io/sample-controller/pkg/client/informers/externalversions/factory.go:117: Failed to list *v1beta1.Genericdaemon: genericdaemons.mydomain.com is forbidden: User <span class="token string">"system:serviceaccount:default:default"</span> cannot list genericdaemons.mydomain.com at the cluster scope
E0721 <span class="token number">14</span>:34:50.500385       <span class="token number">1</span> reflector.go:134<span class="token punctuation">]</span> k8s.io/client-go/informers/factory.go:131: Failed to list *v1.DaemonSet: daemonsets.apps is forbidden: User <span class="token string">"system:serviceaccount:default:default"</span> cannot list daemonsets.apps at the cluster scope
<span class="token punctuation">[</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要创建一个 <code v-pre>ClusterRole</code> 和一个 <code v-pre>ClusterRoleBinding</code> 来给予<code v-pre>operator</code> 必要的权限：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>// rbac_role.yaml
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> operator<span class="token punctuation">-</span>role
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> apps
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> daemonsets
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> get
  <span class="token punctuation">-</span> list
  <span class="token punctuation">-</span> watch
  <span class="token punctuation">-</span> create
  <span class="token punctuation">-</span> update
  <span class="token punctuation">-</span> patch
  <span class="token punctuation">-</span> delete
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> mydomain.com
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> genericdaemons
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> get
  <span class="token punctuation">-</span> list
  <span class="token punctuation">-</span> watch
  <span class="token punctuation">-</span> create
  <span class="token punctuation">-</span> update
  <span class="token punctuation">-</span> patch
  <span class="token punctuation">-</span> delete

// rbac_role_binding.yaml
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> operator<span class="token punctuation">-</span>rolebinding
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
  <span class="token key atrule">name</span><span class="token punctuation">:</span> operator<span class="token punctuation">-</span>role
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> ServiceAccount
  <span class="token key atrule">name</span><span class="token punctuation">:</span> default
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署：</p>
<div class="language-bash' ext-bash' line-numbers-mode"><pre v-pre class="language-bash'"><code>❯ kubectl apply -f rbac_role.yaml
❯ kubectl delete -f deploy.yaml
❯ kubectl apply -f deploy.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sample-controller-crd-资源定义源码" tabindex="-1"><a class="header-anchor" href="#sample-controller-crd-资源定义源码" aria-hidden="true">#</a> sample-controller CRD 资源定义源码</h3>
<p>首先，最开始看的还是 CRD 的资源定义部分（sample-controller/artifacts/examples/crd.yaml）：</p>
<ul>
<li><a href="https://github.com/kubernetes/enhancements/blob/master/keps/sig-api-machinery/2337-k8s.io-group-protection/README.md" target="_blank" rel="noopener noreferrer">官方描述~<ExternalLinkIcon/></a></li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token comment"># 名字必需与下面的 spec 字段匹配，并且格式为 '&lt;名称的复数形式>.&lt;组名>'</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> foos.samplecontroller.k8s.io
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token comment"># 组名称，用于 REST API: /apis/&lt;组>/&lt;版本></span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> samplecontroller.k8s.io
  <span class="token comment"># 列举此 CustomResourceDefinition 所支持的版本</span>
  <span class="token key atrule">version</span><span class="token punctuation">:</span> v1alpha1
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token comment"># kind 通常是单数形式的驼峰编码（CamelCased）形式。你的资源清单会使用这一形式。</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Foo
    <span class="token comment"># 名称的复数形式，用于 URL：/apis/&lt;组>/&lt;版本>/&lt;名称的复数形式></span>
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> foos
    <span class="token comment"># 名称的单数形式，作为命令行使用时和显示时的别名</span>
    <span class="token key atrule">singular</span><span class="token punctuation">:</span> crontab
    <span class="token comment"># shortNames 允许你在命令行使用较短的字符串来匹配资源</span>
    <span class="token key atrule">shortNames</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> f
  <span class="token comment"># 可以是 Namespaced 或 Cluster</span>
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>该定义文件，声明了一种名为 Foo 的资源，告诉 API Server，有一种资源叫做 Foo</li>
<li>该 Foo 资源将被 sample-controller 所监听，并对其相关事件进行处理</li>
<li>CRD 可以是名字空间作用域的，也可以 是集群作用域的，取决于 CRD 的 <code v-pre>scope</code> 字段设置。</li>
<li>自动代码生成工具（上面讲的update-codegen） 将controller之外的事情都做好了，我们只要专注于controller的开发就好。</li>
</ul>
<p><strong>自己编写controller有三步：</strong></p>
<ul>
<li>
<p>定义CRD</p>
</li>
<li>
<p>生成自定义资源的Clientset、Informers、Listers等</p>
<ul>
<li>Clientset 用于和 Kubernetes 进行交互</li>
<li>Informers 机制用于 监听 Kubernetes 中 API Server 的资源变化，一般和 WOrksSqueue 结合使用，一个是监听，一个是缓存到排队队列中（三种接口实现）</li>
<li>Listers 是 Kubernetes 中的另一种机制，用于从 Informers 缓存中获取资源对象的列表。</li>
</ul>
</li>
<li>
<p>编写Controller等代码</p>
</li>
</ul>
<h3 id="foo-资源的-yaml-定义" tabindex="-1"><a class="header-anchor" href="#foo-资源的-yaml-定义" aria-hidden="true">#</a> Foo 资源的 yaml 定义</h3>
<p>源文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>❯ cat  artifacts/examples/example<span class="token punctuation">-</span>foo.yaml
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> samplecontroller.k8s.io/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Foo
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>foo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">deploymentName</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>foo
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<ul>
<li>该文件声明要创建的资源为 Foo 类型，副本数为 1</li>
<li>这个创建事件会被 <code v-pre>sample-controller</code> 拦截和处理</li>
</ul>
<h3 id="分析-controller-的实现逻辑" tabindex="-1"><a class="header-anchor" href="#分析-controller-的实现逻辑" aria-hidden="true">#</a> 分析 Controller 的实现逻辑</h3>
<p>既然是从 <code v-pre>main.go</code> 开始的，那么我们主要的逻辑在这里：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	klog<span class="token punctuation">.</span><span class="token function">InitFlags</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// set up signals so we handle the shutdown signal gracefully</span>
	ctx <span class="token operator">:=</span> signals<span class="token punctuation">.</span><span class="token function">SetupSignalHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	logger <span class="token operator">:=</span> klog<span class="token punctuation">.</span><span class="token function">FromContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>

	cfg<span class="token punctuation">,</span> err <span class="token operator">:=</span> clientcmd<span class="token punctuation">.</span><span class="token function">BuildConfigFromFlags</span><span class="token punctuation">(</span>masterURL<span class="token punctuation">,</span> kubeconfig<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Error building kubeconfig"</span><span class="token punctuation">)</span>
		klog<span class="token punctuation">.</span><span class="token function">FlushAndExit</span><span class="token punctuation">(</span>klog<span class="token punctuation">.</span>ExitFlushTimeout<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	kubeClient<span class="token punctuation">,</span> err <span class="token operator">:=</span> kubernetes<span class="token punctuation">.</span><span class="token function">NewForConfig</span><span class="token punctuation">(</span>cfg<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Error building kubernetes clientset"</span><span class="token punctuation">)</span>
		klog<span class="token punctuation">.</span><span class="token function">FlushAndExit</span><span class="token punctuation">(</span>klog<span class="token punctuation">.</span>ExitFlushTimeout<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	exampleClient<span class="token punctuation">,</span> err <span class="token operator">:=</span> clientset<span class="token punctuation">.</span><span class="token function">NewForConfig</span><span class="token punctuation">(</span>cfg<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Error building kubernetes clientset"</span><span class="token punctuation">)</span>
		klog<span class="token punctuation">.</span><span class="token function">FlushAndExit</span><span class="token punctuation">(</span>klog<span class="token punctuation">.</span>ExitFlushTimeout<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	kubeInformerFactory <span class="token operator">:=</span> kubeinformers<span class="token punctuation">.</span><span class="token function">NewSharedInformerFactory</span><span class="token punctuation">(</span>kubeClient<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">30</span><span class="token punctuation">)</span>
	exampleInformerFactory <span class="token operator">:=</span> informers<span class="token punctuation">.</span><span class="token function">NewSharedInformerFactory</span><span class="token punctuation">(</span>exampleClient<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">30</span><span class="token punctuation">)</span>

	controller <span class="token operator">:=</span> <span class="token function">NewController</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> kubeClient<span class="token punctuation">,</span> exampleClient<span class="token punctuation">,</span>
		kubeInformerFactory<span class="token punctuation">.</span><span class="token function">Apps</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">V1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Deployments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		exampleInformerFactory<span class="token punctuation">.</span><span class="token function">Samplecontroller</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">V1alpha1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Foos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// notice that there is no need to run Start methods in a separate goroutine. (i.e. go kubeInformerFactory.Start(ctx.done())</span>
	<span class="token comment">// Start method is non-blocking and runs all registered informers in a dedicated goroutine.</span>
	kubeInformerFactory<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	exampleInformerFactory<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">=</span> controller<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Error running controller"</span><span class="token punctuation">)</span>
		klog<span class="token punctuation">.</span><span class="token function">FlushAndExit</span><span class="token punctuation">(</span>klog<span class="token punctuation">.</span>ExitFlushTimeout<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>📜 大致流程对上面的解释：</strong></p>
<ul>
<li>
<p>读取 kubeconfig 配置，构造用于事件监听的 <code v-pre>Kubernetes Client</code>。</p>
<blockquote>
<p>这里创建了两个，一个监听普通事件，一个监听 Foo 事件。</p>
</blockquote>
</li>
<li>
<p>基于 <code v-pre>Client</code> 构造监听相关的 <code v-pre>informer</code>。</p>
</li>
<li>
<p>基于 <code v-pre>Client</code>、<code v-pre>Informer</code> 初始化自定义 <code v-pre>Controller</code>，监听 <code v-pre>Deployment</code> 以及 <code v-pre>Foos</code> 资源变化。</p>
</li>
<li>
<p>开启 <code v-pre>Controller</code>。</p>
</li>
</ul>
<p>那么接下来就是最主要的，就是 <code v-pre>controller</code> 的实现逻辑了(controller.go)</p>
<p><code v-pre>Controller</code> 的结构体定义如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Controller is the controller implementation for Foo resources</span>
<span class="token keyword">type</span> Controller <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// kubeclientset is a standard kubernetes clientset</span>
	kubeclientset kubernetes<span class="token punctuation">.</span>Interface
	<span class="token comment">// sampleclientset is a clientset for our own API group</span>
	sampleclientset clientset<span class="token punctuation">.</span>Interface

	deploymentsLister appslisters<span class="token punctuation">.</span>DeploymentLister
	deploymentsSynced cache<span class="token punctuation">.</span>InformerSynced
	foosLister        listers<span class="token punctuation">.</span>FooLister
	foosSynced        cache<span class="token punctuation">.</span>InformerSynced

	<span class="token comment">// workqueue is a rate limited work queue. This is used to queue work to be</span>
	<span class="token comment">// processed instead of performing it as soon as a change happens. This</span>
	<span class="token comment">// means we can ensure we only process a fixed amount of resources at a</span>
	<span class="token comment">// time, and makes it easy to ensure we are never processing the same item</span>
	<span class="token comment">// simultaneously in two different workers.</span>
	workqueue workqueue<span class="token punctuation">.</span>RateLimitingInterface
	<span class="token comment">// recorder is an event recorder for recording Event resources to the</span>
	<span class="token comment">// Kubernetes API.</span>
	recorder record<span class="token punctuation">.</span>EventRecorder
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<ul>
<li>Controller 的关键成员即两个事件的 Listener（<code v-pre>appslisters.DeploymentLister</code>、<code v-pre>listers.FooLister</code>）这两个成员将由 main 函数传入参数进行初始化</li>
<li>此外，为了缓冲事件处理，这里使用队列暂存事件，相关成员即为 <code v-pre>workqueue.RateLimitingInterface</code></li>
<li><code v-pre>kubeclientset</code>是一个标准的 Kubernetes 客户端集，用于与 Kubernetes API 进行交互。</li>
<li><code v-pre>sampleclientset</code>是我们自己的 API 组的客户端集，用于与我们的自定义API资源进行交互。</li>
<li><code v-pre>deploymentsLister</code>是一个 Deployment 的 Lister 接口，用于获取Deployment资源的列表信息。</li>
<li><code v-pre>deploymentsSynced</code>是一个 Deployment 的 InformerSynced 接口，用于确定Deployment资源是否已经同步完毕。</li>
<li><code v-pre>foosLister</code>是一个 Foo 的<code v-pre>Lister</code>接口，用于获取Foo资源的列表信息。</li>
<li><code v-pre>foosSynced</code>是一个 Foo 的<code v-pre>InformerSynced</code>接口，用于确定Foo资源是否已经同步完毕。</li>
<li><code v-pre>workqueue</code>是一个速率限制的工作队列，用于处理工作项。通过使用工作队列，我们可以确保一次只处理一定数量的资源，并且可以轻松确保我们不会同时在两个不同的工作者中处理同一项资源。</li>
<li><code v-pre>recorder</code>是事件记录器，用于记录 Event 资源到 Kubernetes API 中。</li>
</ul>
<blockquote>
<p>控制器的实现过程中，使用了 informer 和 workqueue 两个重要的组件，它们分别用于监听资源的变化和处理任务。当某个资源发生变化时，informer 会将该资源加入 workqueue 中等待处理。处理任务时，syncHandler 函数会获取任务对应的 Foo 和 Deployment 资源，并比较它们的状态是否一致，如果不一致则进行同步，同步成功后更新状态。整个过程中，使用了 Kubernetes 中的事件记录器将事件记录到 Kubernetes API 中，以便于调试和监控。</p>
</blockquote>
<p><strong>接着</strong>，分析 Controller 的构造过程，代码如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewController</span><span class="token punctuation">(</span>
	kubeclientset kubernetes<span class="token punctuation">.</span>Interface<span class="token punctuation">,</span>
	sampleclientset clientset<span class="token punctuation">.</span>Interface<span class="token punctuation">,</span>
	deploymentInformer appsinformers<span class="token punctuation">.</span>DeploymentInformer<span class="token punctuation">,</span>
	fooInformer informers<span class="token punctuation">.</span>FooInformer<span class="token punctuation">)</span> <span class="token operator">*</span>Controller <span class="token punctuation">{</span>
 
	<span class="token comment">// Create event broadcaster</span>
	<span class="token comment">// Add sample-controller types to the default Kubernetes Scheme so Events can be</span>
	<span class="token comment">// logged for sample-controller types.</span>
	utilruntime<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>samplescheme<span class="token punctuation">.</span><span class="token function">AddToScheme</span><span class="token punctuation">(</span>scheme<span class="token punctuation">.</span>Scheme<span class="token punctuation">)</span><span class="token punctuation">)</span>
	klog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Creating event broadcaster"</span><span class="token punctuation">)</span>
	eventBroadcaster <span class="token operator">:=</span> record<span class="token punctuation">.</span><span class="token function">NewBroadcaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	eventBroadcaster<span class="token punctuation">.</span><span class="token function">StartLogging</span><span class="token punctuation">(</span>klog<span class="token punctuation">.</span>Infof<span class="token punctuation">)</span>
	eventBroadcaster<span class="token punctuation">.</span><span class="token function">StartRecordingToSink</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>typedcorev1<span class="token punctuation">.</span>EventSinkImpl<span class="token punctuation">{</span>Interface<span class="token punctuation">:</span> kubeclientset<span class="token punctuation">.</span><span class="token function">CoreV1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Events</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	recorder <span class="token operator">:=</span> eventBroadcaster<span class="token punctuation">.</span><span class="token function">NewRecorder</span><span class="token punctuation">(</span>scheme<span class="token punctuation">.</span>Scheme<span class="token punctuation">,</span> corev1<span class="token punctuation">.</span>EventSource<span class="token punctuation">{</span>Component<span class="token punctuation">:</span> controllerAgentName<span class="token punctuation">}</span><span class="token punctuation">)</span>
 
	controller <span class="token operator">:=</span> <span class="token operator">&amp;</span>Controller<span class="token punctuation">{</span>
		kubeclientset<span class="token punctuation">:</span>     kubeclientset<span class="token punctuation">,</span>
		sampleclientset<span class="token punctuation">:</span>   sampleclientset<span class="token punctuation">,</span>
		deploymentsLister<span class="token punctuation">:</span> deploymentInformer<span class="token punctuation">.</span><span class="token function">Lister</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		deploymentsSynced<span class="token punctuation">:</span> deploymentInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>HasSynced<span class="token punctuation">,</span>
		foosLister<span class="token punctuation">:</span>        fooInformer<span class="token punctuation">.</span><span class="token function">Lister</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		foosSynced<span class="token punctuation">:</span>        fooInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>HasSynced<span class="token punctuation">,</span>
		workqueue<span class="token punctuation">:</span>         workqueue<span class="token punctuation">.</span><span class="token function">NewNamedRateLimitingQueue</span><span class="token punctuation">(</span>workqueue<span class="token punctuation">.</span><span class="token function">DefaultControllerRateLimiter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"Foos"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		recorder<span class="token punctuation">:</span>          recorder<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
 
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Setting up event handlers"</span><span class="token punctuation">)</span>
	<span class="token comment">// Set up an event handler for when Foo resources change</span>
	fooInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">AddEventHandler</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span>ResourceEventHandlerFuncs<span class="token punctuation">{</span>
		AddFunc<span class="token punctuation">:</span> controller<span class="token punctuation">.</span>enqueueFoo<span class="token punctuation">,</span>
		UpdateFunc<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>old<span class="token punctuation">,</span> <span class="token builtin">new</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			controller<span class="token punctuation">.</span><span class="token function">enqueueFoo</span><span class="token punctuation">(</span><span class="token builtin">new</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">// Set up an event handler for when Deployment resources change. This</span>
	<span class="token comment">// handler will lookup the owner of the given Deployment, and if it is</span>
	<span class="token comment">// owned by a Foo resource will enqueue that Foo resource for</span>
	<span class="token comment">// processing. This way, we don't need to implement custom logic for</span>
	<span class="token comment">// handling Deployment resources. More info on this pattern:</span>
	<span class="token comment">// https://github.com/kubernetes/community/blob/8cafef897a22026d42f5e5bb3f104febe7e29830/contributors/devel/controllers.md</span>
	deploymentInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">AddEventHandler</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span>ResourceEventHandlerFuncs<span class="token punctuation">{</span>
		AddFunc<span class="token punctuation">:</span> controller<span class="token punctuation">.</span>handleObject<span class="token punctuation">,</span>
		UpdateFunc<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>old<span class="token punctuation">,</span> <span class="token builtin">new</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			newDepl <span class="token operator">:=</span> <span class="token builtin">new</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>appsv1<span class="token punctuation">.</span>Deployment<span class="token punctuation">)</span>
			oldDepl <span class="token operator">:=</span> old<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>appsv1<span class="token punctuation">.</span>Deployment<span class="token punctuation">)</span>
			<span class="token keyword">if</span> newDepl<span class="token punctuation">.</span>ResourceVersion <span class="token operator">==</span> oldDepl<span class="token punctuation">.</span>ResourceVersion <span class="token punctuation">{</span>
				<span class="token comment">// Periodic resync will send update events for all known Deployments.</span>
				<span class="token comment">// Two different versions of the same Deployment will always have different RVs.</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>
			controller<span class="token punctuation">.</span><span class="token function">handleObject</span><span class="token punctuation">(</span><span class="token builtin">new</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		DeleteFunc<span class="token punctuation">:</span> controller<span class="token punctuation">.</span>handleObject<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
 
	<span class="token keyword">return</span> controller
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个初始化的过程，也是在 <code v-pre>main.go</code> 中调用的。</p>
<ul>
<li>
<p>将 <code v-pre>sample-controller</code> 的类型信息（Foo）添加到默认 Kubernetes Scheme，以便能够记录到其事件。</p>
</li>
<li>
<p>基于新 <code v-pre>Scheme</code> 创建一个事件记录 <code v-pre>recorder</code> ，用于记录来自 “sample-controller” 的事件。</p>
</li>
<li>
<p>基于函数入参及刚刚构造的 <code v-pre>recorder</code>，初始化 Controller。</p>
</li>
<li>
<p>设置对 <code v-pre>Foo</code> 资源变化的事件处理函数（Add、Update 均通过 enqueueFoo 处理）</p>
</li>
<li>
<p>设置对 <code v-pre>Deployment</code> 资源变化的事件处理函数（Add、Update、Delete 均通过 handleObject 处理）</p>
</li>
<li>
<p>返回初始化的 <code v-pre>Controller</code>。</p>
</li>
</ul>
<p><strong>进一步</strong>，分析 <code v-pre>enqueueFoo</code> 以及 <code v-pre>handleObject</code> 的实现</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// enqueueFoo takes a Foo resource and converts it into a namespace/name</span>
<span class="token comment">// string which is then put onto the work queue. This method should *not* be</span>
<span class="token comment">// passed resources of any type other than Foo.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Controller<span class="token punctuation">)</span> <span class="token function">enqueueFoo</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> key <span class="token builtin">string</span>
	<span class="token keyword">var</span> err <span class="token builtin">error</span>
	<span class="token keyword">if</span> key<span class="token punctuation">,</span> err <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">MetaNamespaceKeyFunc</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">AddRateLimited</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
 
<span class="token comment">// handleObject will take any resource implementing metav1.Object and attempt</span>
<span class="token comment">// to find the Foo resource that 'owns' it. It does this by looking at the</span>
<span class="token comment">// objects metadata.ownerReferences field for an appropriate OwnerReference.</span>
<span class="token comment">// It then enqueues that Foo resource to be processed. If the object does not</span>
<span class="token comment">// have an appropriate OwnerReference, it will simply be skipped.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Controller<span class="token punctuation">)</span> <span class="token function">handleObject</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> object metav1<span class="token punctuation">.</span>Object
	<span class="token keyword">var</span> ok <span class="token builtin">bool</span>
	<span class="token keyword">if</span> object<span class="token punctuation">,</span> ok <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token punctuation">(</span>metav1<span class="token punctuation">.</span>Object<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
		tombstone<span class="token punctuation">,</span> ok <span class="token operator">:=</span> obj<span class="token punctuation">.</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span>DeletedFinalStateUnknown<span class="token punctuation">)</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
			utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"error decoding object, invalid type"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		object<span class="token punctuation">,</span> ok <span class="token operator">=</span> tombstone<span class="token punctuation">.</span>Obj<span class="token punctuation">.</span><span class="token punctuation">(</span>metav1<span class="token punctuation">.</span>Object<span class="token punctuation">)</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
			utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"error decoding object tombstone, invalid type"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		klog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"Recovered deleted object '%s' from tombstone"</span><span class="token punctuation">,</span> object<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	klog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"Processing object: %s"</span><span class="token punctuation">,</span> object<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> ownerRef <span class="token operator">:=</span> metav1<span class="token punctuation">.</span><span class="token function">GetControllerOf</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token punctuation">;</span> ownerRef <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// If this object is not owned by a Foo, we should not do anything more</span>
		<span class="token comment">// with it.</span>
		<span class="token keyword">if</span> ownerRef<span class="token punctuation">.</span>Kind <span class="token operator">!=</span> <span class="token string">"Foo"</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
 
		foo<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>foosLister<span class="token punctuation">.</span><span class="token function">Foos</span><span class="token punctuation">(</span>object<span class="token punctuation">.</span><span class="token function">GetNamespace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>ownerRef<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			klog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"ignoring orphaned object '%s' of foo '%s'"</span><span class="token punctuation">,</span> object<span class="token punctuation">.</span><span class="token function">GetSelfLink</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ownerRef<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
 
		c<span class="token punctuation">.</span><span class="token function">enqueueFoo</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<ul>
<li>enqueueFoo 就是解析 Foo 资源为 <code v-pre>namespace/name</code> 形式的字符串，然后入队</li>
<li>handleObject 监听了所有实现了 <code v-pre>metav1</code> 的资源，但只过滤出 <code v-pre>owner</code> 是 <code v-pre>Foo</code> 的，将其解析为 <code v-pre>namespace/name</code> 入队</li>
</ul>
<p>在构造 Controller 时就已经初始化好事件收集这部分的工作了, 那如何处理队列里的这些事件呢？那就是 Run 函数的操作过程：</p>
<p><strong>Run 函数操作：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Run will set up the event handlers for types we are interested in, as well</span>
<span class="token comment">// as syncing informer caches and starting workers. It will block until stopCh</span>
<span class="token comment">// is closed, at which point it will shutdown the workqueue and wait for</span>
<span class="token comment">// workers to finish processing their current work items.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Controller<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span>threadiness <span class="token builtin">int</span><span class="token punctuation">,</span> stopCh <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> utilruntime<span class="token punctuation">.</span><span class="token function">HandleCrash</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">ShutDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 
	<span class="token comment">// Start the informer factories to begin populating the informer caches</span>
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Starting Foo controller"</span><span class="token punctuation">)</span>
 
	<span class="token comment">// Wait for the caches to be synced before starting workers</span>
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Waiting for informer caches to sync"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> ok <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">WaitForCacheSync</span><span class="token punctuation">(</span>stopCh<span class="token punctuation">,</span> c<span class="token punctuation">.</span>deploymentsSynced<span class="token punctuation">,</span> c<span class="token punctuation">.</span>foosSynced<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"failed to wait for caches to sync"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
 
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Starting workers"</span><span class="token punctuation">)</span>
	<span class="token comment">// Launch two workers to process Foo resources</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> threadiness<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> wait<span class="token punctuation">.</span><span class="token function">Until</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>runWorker<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span> stopCh<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
 
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Started workers"</span><span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span>stopCh
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Shutting down workers"</span><span class="token punctuation">)</span>
 
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span><span class="token comment">// Run will set up the event handlers for types we are interested in, as well</span>
<span class="token comment">// as syncing informer caches and starting workers. It will block until stopCh</span>
<span class="token comment">// is closed, at which point it will shutdown the workqueue and wait for</span>
<span class="token comment">// workers to finish processing their current work items.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Controller<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span>threadiness <span class="token builtin">int</span><span class="token punctuation">,</span> stopCh <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> utilruntime<span class="token punctuation">.</span><span class="token function">HandleCrash</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">ShutDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 
	<span class="token comment">// Start the informer factories to begin populating the informer caches</span>
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Starting Foo controller"</span><span class="token punctuation">)</span>
 
	<span class="token comment">// Wait for the caches to be synced before starting workers</span>
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Waiting for informer caches to sync"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> ok <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">WaitForCacheSync</span><span class="token punctuation">(</span>stopCh<span class="token punctuation">,</span> c<span class="token punctuation">.</span>deploymentsSynced<span class="token punctuation">,</span> c<span class="token punctuation">.</span>foosSynced<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"failed to wait for caches to sync"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
 
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Starting workers"</span><span class="token punctuation">)</span>
	<span class="token comment">// Launch two workers to process Foo resources</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> threadiness<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> wait<span class="token punctuation">.</span><span class="token function">Until</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>runWorker<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span> stopCh<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
 
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Started workers"</span><span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span>stopCh
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Shutting down workers"</span><span class="token punctuation">)</span>
 
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Run 函数的执行过程大体如下：</strong></p>
<ul>
<li>等待 Informer 同步完成，</li>
<li>并发 runWorker，处理队列内事件</li>
</ul>
<p><strong>runWorker 的定义</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// runWorker is a long-running function that will continually call the</span>
<span class="token comment">// processNextWorkItem function in order to read and process a message on the</span>
<span class="token comment">// workqueue.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Controller<span class="token punctuation">)</span> <span class="token function">runWorker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> c<span class="token punctuation">.</span><span class="token function">processNextWorkItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// processNextWorkItem will read a single work item off the workqueue and</span>
<span class="token comment">// attempt to process it, by calling the syncHandler.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Controller<span class="token punctuation">)</span> <span class="token function">processNextWorkItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	obj<span class="token punctuation">,</span> shutdown <span class="token operator">:=</span> c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 
	<span class="token keyword">if</span> shutdown <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
 
	<span class="token comment">// We wrap this block in a func so we can defer c.workqueue.Done.</span>
	err <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
		<span class="token comment">// We call Done here so the workqueue knows we have finished</span>
		<span class="token comment">// processing this item. We also must remember to call Forget if we</span>
		<span class="token comment">// do not want this work item being re-queued. For example, we do</span>
		<span class="token comment">// not call Forget if a transient error occurs, instead the item is</span>
		<span class="token comment">// put back on the workqueue and attempted again after a back-off</span>
		<span class="token comment">// period.</span>
		<span class="token keyword">defer</span> c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
		<span class="token keyword">var</span> key <span class="token builtin">string</span>
		<span class="token keyword">var</span> ok <span class="token builtin">bool</span>
		<span class="token comment">// We expect strings to come off the workqueue. These are of the</span>
		<span class="token comment">// form namespace/name. We do this as the delayed nature of the</span>
		<span class="token comment">// workqueue means the items in the informer cache may actually be</span>
		<span class="token comment">// more up to date that when the item was initially put onto the</span>
		<span class="token comment">// workqueue.</span>
		<span class="token keyword">if</span> key<span class="token punctuation">,</span> ok <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
			<span class="token comment">// As the item in the workqueue is actually invalid, we call</span>
			<span class="token comment">// Forget here else we'd go into a loop of attempting to</span>
			<span class="token comment">// process a work item that is invalid.</span>
			c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">Forget</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
			utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"expected string in workqueue but got %#v"</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// Run the syncHandler, passing it the namespace/name string of the</span>
		<span class="token comment">// Foo resource to be synced.</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">syncHandler</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token comment">// Put the item back on the workqueue to handle any transient errors.</span>
			c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">AddRateLimited</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
			<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"error syncing '%s': %s, requeuing"</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// Finally, if no error occurs we Forget this item so it does not</span>
		<span class="token comment">// get queued again until another change happens.</span>
		c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">Forget</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
		klog<span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"Successfully synced '%s'"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
 
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>
 
	<span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>processNextWorkItem 的处理流程大体如下：</strong></p>
<ul>
<li>从队列取出待处理对象</li>
<li>调用 <code v-pre>syncHandler</code> 处理</li>
</ul>
<p><strong>再来分析 syncHandler 的处理细节:</strong></p>
<p><code v-pre>syncHandler</code> 就是一个最核心的实现了，这个实现也是比较有意思的，该函数比较实际状态和期望状态，并尝试将两者融合。然后，它更新 Foo 资源的 Status 块以反映资源的当前状态。所以核心步骤就是两个步骤</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// syncHandler compares the actual state with the desired, and attempts to</span>
<span class="token comment">// converge the two. It then updates the Status block of the Foo resource</span>
<span class="token comment">// with the current status of the resource.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Controller<span class="token punctuation">)</span> <span class="token function">syncHandler</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token comment">// Convert the namespace/name string into a distinct namespace and name</span>
	namespace<span class="token punctuation">,</span> name<span class="token punctuation">,</span> err <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">SplitMetaNamespaceKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"invalid resource key: %s"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
 
	<span class="token comment">// Get the Foo resource with this namespace/name</span>
	foo<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>foosLister<span class="token punctuation">.</span><span class="token function">Foos</span><span class="token punctuation">(</span>namespace<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// The Foo resource may no longer exist, in which case we stop</span>
		<span class="token comment">// processing.</span>
		<span class="token keyword">if</span> errors<span class="token punctuation">.</span><span class="token function">IsNotFound</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"foo '%s' in work queue no longer exists"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span>
		<span class="token punctuation">}</span>
 
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
 
	deploymentName <span class="token operator">:=</span> foo<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>DeploymentName
	<span class="token keyword">if</span> deploymentName <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		<span class="token comment">// We choose to absorb the error here as the worker would requeue the</span>
		<span class="token comment">// resource otherwise. Instead, the next time the resource is updated</span>
		<span class="token comment">// the resource will be queued again.</span>
		utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"%s: deployment name must be specified"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
 
	<span class="token comment">// Get the deployment with the name specified in Foo.spec</span>
	deployment<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>deploymentsLister<span class="token punctuation">.</span><span class="token function">Deployments</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>Namespace<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>deploymentName<span class="token punctuation">)</span>
	<span class="token comment">// If the resource doesn't exist, we'll create it</span>
	<span class="token keyword">if</span> errors<span class="token punctuation">.</span><span class="token function">IsNotFound</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		deployment<span class="token punctuation">,</span> err <span class="token operator">=</span> c<span class="token punctuation">.</span>kubeclientset<span class="token punctuation">.</span><span class="token function">AppsV1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Deployments</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>Namespace<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token function">newDeployment</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
 
	<span class="token comment">// If an error occurs during Get/Create, we'll requeue the item so we can</span>
	<span class="token comment">// attempt processing again later. This could have been caused by a</span>
	<span class="token comment">// temporary network failure, or any other transient reason.</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
 
	<span class="token comment">// If the Deployment is not controlled by this Foo resource, we should log</span>
	<span class="token comment">// a warning to the event recorder and ret</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>metav1<span class="token punctuation">.</span><span class="token function">IsControlledBy</span><span class="token punctuation">(</span>deployment<span class="token punctuation">,</span> foo<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span>MessageResourceExists<span class="token punctuation">,</span> deployment<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span>recorder<span class="token punctuation">.</span><span class="token function">Event</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> corev1<span class="token punctuation">.</span>EventTypeWarning<span class="token punctuation">,</span> ErrResourceExists<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
 
	<span class="token comment">// If this number of the replicas on the Foo resource is specified, and the</span>
	<span class="token comment">// number does not equal the current desired replicas on the Deployment, we</span>
	<span class="token comment">// should update the Deployment resource.</span>
	<span class="token keyword">if</span> foo<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">*</span>foo<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas <span class="token operator">!=</span> <span class="token operator">*</span>deployment<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas <span class="token punctuation">{</span>
		klog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"Foo %s replicas: %d, deployment replicas: %d"</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> <span class="token operator">*</span>foo<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas<span class="token punctuation">,</span> <span class="token operator">*</span>deployment<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas<span class="token punctuation">)</span>
		deployment<span class="token punctuation">,</span> err <span class="token operator">=</span> c<span class="token punctuation">.</span>kubeclientset<span class="token punctuation">.</span><span class="token function">AppsV1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Deployments</span><span class="token punctuation">(</span>foo<span class="token punctuation">.</span>Namespace<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token function">newDeployment</span><span class="token punctuation">(</span>foo<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
 
	<span class="token comment">// If an error occurs during Update, we'll requeue the item so we can</span>
	<span class="token comment">// attempt processing again later. THis could have been caused by a</span>
	<span class="token comment">// temporary network failure, or any other transient reason.</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
 
	<span class="token comment">// Finally, we update the status block of the Foo resource to reflect the</span>
	<span class="token comment">// current state of the world</span>
	err <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">updateFooStatus</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> deployment<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
 
	c<span class="token punctuation">.</span>recorder<span class="token punctuation">.</span><span class="token function">Event</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> corev1<span class="token punctuation">.</span>EventTypeNormal<span class="token punctuation">,</span> SuccessSynced<span class="token punctuation">,</span> MessageResourceSynced<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>syncHandler 的处理逻辑大体如下：</p>
<ul>
<li>
<p>根据 <code v-pre>namespace/name</code> 获取 foo 资源</p>
</li>
<li>
<p>根据 <code v-pre>foo</code>，获取其 <code v-pre>Deployment</code> 名称，进而获取 deployment 资源（没有就为其创建）</p>
</li>
<li>
<p>根据 <code v-pre>foo</code> 的 <code v-pre>Replicas</code> 更新 <code v-pre>deployment</code> 的 <code v-pre>Replicas</code>（如果不匹配）</p>
</li>
<li>
<p>更新 <code v-pre>foo</code> 资源的状态为最新 <code v-pre>deployment</code> 的状态（其实就是 <code v-pre>AvailableReplicas</code>）</p>
</li>
</ul>
<p>由此，可知 foo 的实现实体其实就是 <code v-pre>deployment</code></p>
<blockquote>
<p>这里也有一个比较有意思的现象，我们学习 Kubernetes 的时候也知道 Deployment 控制 Pod 是通过两层控制器来实现的，Deployment 控制器使用 ReplicaSet 控制器来确保指定数量的 Pod 始终在运行。当 Deployment 控制器检测到 Pod 数量不足或 Pod 不存在时，它会启动一个新的 ReplicaSet，以便确保指定数量的 Pod 始终在运行。然后，它逐步将新的 ReplicaSet 中的 Pod 替换为旧的 ReplicaSet 中的 Pod，直到旧的 ReplicaSet 中的所有 Pod 都被替换为止。这样，Deployment 控制器就可以实现无宕机更新和回滚操作，从而确保应用程序的高可用性和可靠性。</p>
</blockquote>
<p><strong>看下 <code v-pre>deployment</code> 的实现代码：</strong></p>
<blockquote>
<p>这里也就是 controller 的最终部分了，创建了一个 Deployment 对象，当然在后面会更新实际状态。</p>
</blockquote>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// newDeployment creates a new Deployment for a Foo resource. It also sets</span>
<span class="token comment">// the appropriate OwnerReferences on the resource so handleObject can discover</span>
<span class="token comment">// the Foo resource that 'owns' it.</span>
<span class="token keyword">func</span> <span class="token function">newDeployment</span><span class="token punctuation">(</span>foo <span class="token operator">*</span>samplev1alpha1<span class="token punctuation">.</span>Foo<span class="token punctuation">)</span> <span class="token operator">*</span>appsv1<span class="token punctuation">.</span>Deployment <span class="token punctuation">{</span>
	labels <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">"app"</span><span class="token punctuation">:</span>        <span class="token string">"nginx"</span><span class="token punctuation">,</span>
		<span class="token string">"controller"</span><span class="token punctuation">:</span> foo<span class="token punctuation">.</span>Name<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>appsv1<span class="token punctuation">.</span>Deployment<span class="token punctuation">{</span>
		ObjectMeta<span class="token punctuation">:</span> metav1<span class="token punctuation">.</span>ObjectMeta<span class="token punctuation">{</span>
			Name<span class="token punctuation">:</span>      foo<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>DeploymentName<span class="token punctuation">,</span>
			Namespace<span class="token punctuation">:</span> foo<span class="token punctuation">.</span>Namespace<span class="token punctuation">,</span>
			OwnerReferences<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>metav1<span class="token punctuation">.</span>OwnerReference<span class="token punctuation">{</span>
				<span class="token operator">*</span>metav1<span class="token punctuation">.</span><span class="token function">NewControllerRef</span><span class="token punctuation">(</span>foo<span class="token punctuation">,</span> schema<span class="token punctuation">.</span>GroupVersionKind<span class="token punctuation">{</span>
					Group<span class="token punctuation">:</span>   samplev1alpha1<span class="token punctuation">.</span>SchemeGroupVersion<span class="token punctuation">.</span>Group<span class="token punctuation">,</span>
					Version<span class="token punctuation">:</span> samplev1alpha1<span class="token punctuation">.</span>SchemeGroupVersion<span class="token punctuation">.</span>Version<span class="token punctuation">,</span>
					Kind<span class="token punctuation">:</span>    <span class="token string">"Foo"</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		Spec<span class="token punctuation">:</span> appsv1<span class="token punctuation">.</span>DeploymentSpec<span class="token punctuation">{</span>
			Replicas<span class="token punctuation">:</span> foo<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas<span class="token punctuation">,</span>
			Selector<span class="token punctuation">:</span> <span class="token operator">&amp;</span>metav1<span class="token punctuation">.</span>LabelSelector<span class="token punctuation">{</span>
				MatchLabels<span class="token punctuation">:</span> labels<span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
			Template<span class="token punctuation">:</span> corev1<span class="token punctuation">.</span>PodTemplateSpec<span class="token punctuation">{</span>
				ObjectMeta<span class="token punctuation">:</span> metav1<span class="token punctuation">.</span>ObjectMeta<span class="token punctuation">{</span>
					Labels<span class="token punctuation">:</span> labels<span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
				Spec<span class="token punctuation">:</span> corev1<span class="token punctuation">.</span>PodSpec<span class="token punctuation">{</span>
					Containers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>corev1<span class="token punctuation">.</span>Container<span class="token punctuation">{</span>
						<span class="token punctuation">{</span>
							Name<span class="token punctuation">:</span>  <span class="token string">"nginx"</span><span class="token punctuation">,</span>
							Image<span class="token punctuation">:</span> <span class="token string">"nginx:latest"</span><span class="token punctuation">,</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
					<span class="token punctuation">}</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>简单逻辑就是根据 foo 资源的 namespace、name、deploymentname、replicas 信息</strong></p>
<p>创建 <code v-pre>nginx deployment</code> 而已。</p>
<p>需要注意的是 OwnerReferences 里需要与 Foo 类型绑定（Group、Version、Kind），主要是要与采集处匹配，因为 handleObject 中的筛选 Foo 资源代码是根据 Kind 值做的</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> ownerRef<span class="token punctuation">.</span>Kind <span class="token operator">!=</span> <span class="token string">"Foo"</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自定义 Controller 是如何与 crd.yaml 定义关联的？</strong></p>
<p>我们知道，一开始是通过 <code v-pre>crd.yaml</code> 来通告 kubernetes 我们自定义资源的 scheme 的，这里在补充一点，虽然代码生成器的逻辑实现一直有问题，但是太底层的功能，大部分时候都不会直接去用。适当的理解底层实现（informer）的巧妙之后，看一下 controller-runtime的代码，知道怎么用它封装的cache。然后就是关注在 应用要做的事情上，做这部分的实现就够了。有一个特殊情况就是，在这个过程中，你的代码要用另外的CRD，这个时候会麻烦一点。早期的时候，需要搞几步生成代码的操作。但是现在只要是kubebuilder框架生成的CRD，框架生成的代码里会有 addtoscheme 的实现，只需要import 之后，registry一下，就完事儿了。</p>
<ul>
<li>那是如何与 Controller 关联的呢？其实就在于 <code v-pre>pkg/apis</code> 目录下，满满也都是 Kubernetes 的味道，在资源定义中，不管是 k3s、k0s、还是 Kubernetes，总是不可忽视的是 pkg/apis 目录。</li>
<li><code v-pre>pkg/apis</code> 下定义了自定义资源的相关属性信息，我们简单看下：</li>
<li><code v-pre>pkg/samplecontroller/v1alpha1/register.go</code>（处理类型 Schema）</li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// SchemeGroupVersion is group version used to register these objects</span>
<span class="token keyword">var</span> SchemeGroupVersion <span class="token operator">=</span> schema<span class="token punctuation">.</span>GroupVersion<span class="token punctuation">{</span>Group<span class="token punctuation">:</span> samplecontroller<span class="token punctuation">.</span>GroupName<span class="token punctuation">,</span> Version<span class="token punctuation">:</span> <span class="token string">"v1alpha1"</span><span class="token punctuation">}</span>
 
<span class="token comment">// Kind takes an unqualified kind and returns back a Group qualified GroupKind</span>
<span class="token keyword">func</span> <span class="token function">Kind</span><span class="token punctuation">(</span>kind <span class="token builtin">string</span><span class="token punctuation">)</span> schema<span class="token punctuation">.</span>GroupKind <span class="token punctuation">{</span>
	<span class="token keyword">return</span> SchemeGroupVersion<span class="token punctuation">.</span><span class="token function">WithKind</span><span class="token punctuation">(</span>kind<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GroupKind</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
 
<span class="token comment">// Resource takes an unqualified resource and returns a Group qualified GroupResource</span>
<span class="token keyword">func</span> <span class="token function">Resource</span><span class="token punctuation">(</span>resource <span class="token builtin">string</span><span class="token punctuation">)</span> schema<span class="token punctuation">.</span>GroupResource <span class="token punctuation">{</span>
	<span class="token keyword">return</span> SchemeGroupVersion<span class="token punctuation">.</span><span class="token function">WithResource</span><span class="token punctuation">(</span>resource<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GroupResource</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
 
<span class="token keyword">var</span> <span class="token punctuation">(</span>
	SchemeBuilder <span class="token operator">=</span> runtime<span class="token punctuation">.</span><span class="token function">NewSchemeBuilder</span><span class="token punctuation">(</span>addKnownTypes<span class="token punctuation">)</span>
	AddToScheme   <span class="token operator">=</span> SchemeBuilder<span class="token punctuation">.</span>AddToScheme
<span class="token punctuation">)</span>
 
<span class="token comment">// Adds the list of known types to Scheme.</span>
<span class="token keyword">func</span> <span class="token function">addKnownTypes</span><span class="token punctuation">(</span>scheme <span class="token operator">*</span>runtime<span class="token punctuation">.</span>Scheme<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	scheme<span class="token punctuation">.</span><span class="token function">AddKnownTypes</span><span class="token punctuation">(</span>SchemeGroupVersion<span class="token punctuation">,</span>
		<span class="token operator">&amp;</span>Foo<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token operator">&amp;</span>FooList<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>
	metav1<span class="token punctuation">.</span><span class="token function">AddToGroupVersion</span><span class="token punctuation">(</span>scheme<span class="token punctuation">,</span> SchemeGroupVersion<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>与之前的 crd 定义对比下:</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> foos.samplecontroller.k8s.io
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> samplecontroller.k8s.io
  <span class="token key atrule">version</span><span class="token punctuation">:</span> v1alpha1
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Foo
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> foos
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>会发现 controller 与 crd 两者的 group、version 都是一致的，这意味着什么？</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>var SchemeGroupVersion <span class="token operator">=</span> schema.GroupVersion<span class="token punctuation">{</span>Group: samplecontroller.GroupName, Version: <span class="token string">"v1alpha1"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 Kubernetes 中，namespace 和 name 可以唯一标识一个资源，通过 group 和 version，可以唯一标识 Kubernetes API 中的一个 API 资源。</p>
<p>而且 metadata 的 name 是符合 <code v-pre>&lt;plural&gt;.&lt;group&gt;</code> 规范的，那么回到开头的解释，在 k8s 系统中，一旦创建了 CRD，对该 CRD 的增删改查其实就已经被支持了，我们的 Controller 只是监听自己感兴趣的资源事件，做出真实的部署、更新、移除等动作。</p>
<p>在最后，我们也会扩展自己的 类型 blog。</p>
<h2 id="kubebuilder" tabindex="-1"><a class="header-anchor" href="#kubebuilder" aria-hidden="true">#</a> Kubebuilder</h2>
<p>快速创建一个 mydemo:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ go mod init mydemo
go: creating new go.mod: module mydemo
❯ kubebuilder init <span class="token parameter variable">--domain</span> mydomain.com
❯ tree <span class="token parameter variable">-L</span> <span class="token number">2</span>
<span class="token builtin class-name">.</span>
├── Dockerfile
├── Makefile
├── PROJECT
├── README.md
├── cmd
│   └── main.go
├── config
│   ├── default
│   ├── manager
│   ├── prometheus
│   └── rbac
├── go.mod
├── go.sum
└── hack
    └── boilerplate.go.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>最后创建CRD：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubebuilder create api <span class="token parameter variable">--group</span> mygroup <span class="token parameter variable">--version</span> v1beta1 <span class="token parameter variable">--kind</span> GenericDaemon
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>kubebuilder</code> 为我们创建了API的源，以访问 <code v-pre>api/v1beta1</code> 下的CRD。您可以看到创建的文件与我们之前在 sample-controller 中编辑的文件类似。</p>
<p><strong>写一些代码:</strong></p>
<p>我们需要修改 <code v-pre>GenericDaemon</code> 的结构，为我们的对象添加必要的字段。不要忘记记录字段，以便文档生成器可以创建良好的文档：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// api/v1beta1/genericdaemon_types.go</span>
<span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span>
<span class="token comment">// GenericDaemonSpec defines the desired state of GenericDaemon</span>
<span class="token keyword">type</span> GenericDaemonSpec <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  <span class="token comment">// Label is the value of the 'daemon=' label to set on a node that should run the daemon</span>
  Label <span class="token builtin">string</span> <span class="token string">`json:"label"`</span>
  <span class="token comment">// Image is the Docker image to run for the daemon</span>
  Image <span class="token builtin">string</span> <span class="token string">`json:"image"`</span>
<span class="token punctuation">}</span>
<span class="token comment">// GenericDaemonStatus defines the observed state of GenericDaemon</span>
<span class="token keyword">type</span> GenericDaemonStatus <span class="token keyword">struct</span> <span class="token punctuation">{</span>
  <span class="token comment">// Count is the number of nodes the daemon is deployed to</span>
  Count <span class="token builtin">int32</span> <span class="token string">`json:"count"`</span>
<span class="token punctuation">}</span>
<span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后让我们按照 <code v-pre>genericdaemon_controller.go</code> 文件中的TODO说明进行操作。首先在 <code v-pre>add</code> 函数中，让我们听 <code v-pre>DaemonSet</code> 而不是 <code v-pre>Deployment</code> ：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// pkg/controller/genericdaemon/genericdaemon_controller.go</span>
<span class="token keyword">func</span> <span class="token function">add</span><span class="token punctuation">(</span>mgr manager<span class="token punctuation">.</span>Manager<span class="token punctuation">,</span> r reconcile<span class="token punctuation">.</span>Reconciler<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
  <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span>
  <span class="token comment">// watch a Daemonset created by GenericDaemon</span>
  err <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">Watch</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>source<span class="token punctuation">.</span>Kind<span class="token punctuation">{</span>Type<span class="token punctuation">:</span> <span class="token operator">&amp;</span>appsv1<span class="token punctuation">.</span>DaemonSet<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>handler<span class="token punctuation">.</span>EnqueueRequestForOwner<span class="token punctuation">{</span>
    IsController<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    OwnerType<span class="token punctuation">:</span>    <span class="token operator">&amp;</span>mygroupv1beta1<span class="token punctuation">.</span>GenericDaemon<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第二，让我们编写 <code v-pre>Reconcile</code> 函数的代码。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>部署和 play</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ make
❯ make docker-build IMG=cubxxw/genericdaemon
❯ make docker-push IMG=cubxxw/genericdaemon
❯ make deploy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果您检查 <code v-pre>make deploy</code> 命令的输出，您可以看到该命令为<code v-pre>operator</code> 部署了CRD、RBAC角色和角色绑定以访问必要的对象，为<code v-pre>operator</code> 创建了命名空间，为<code v-pre>operator</code> 创建了服务和statefulset。</p>
<p>此时，<code v-pre>operator</code> 应运行：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ kubectl get pods --namespace=mygroup-system
❯ kubectl logs mygroup-controller-manager-6bdb7f7f88-vnhhb --namespace=mygroup-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们现在可以个性化生成的 <code v-pre>GenericDaemon</code> 样本：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>❯ cat config/samples/mygroup_v1beta1_genericdaemon.yaml
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> mygroup.mydomain.com/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> GenericDaemon
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app.kubernetes.io/name</span><span class="token punctuation">:</span> genericdaemon
    <span class="token key atrule">app.kubernetes.io/instance</span><span class="token punctuation">:</span> genericdaemon<span class="token punctuation">-</span>sample
    <span class="token key atrule">app.kubernetes.io/part-of</span><span class="token punctuation">:</span> mygroup
    <span class="token key atrule">app.kubernetes.io/managed-by</span><span class="token punctuation">:</span> kustomize
    <span class="token key atrule">app.kubernetes.io/created-by</span><span class="token punctuation">:</span> mygroup
  <span class="token key atrule">name</span><span class="token punctuation">:</span> genericdaemon<span class="token punctuation">-</span>sample
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> httpd
  <span class="token key atrule">label</span><span class="token punctuation">:</span> http
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并创建它：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ kubectl apply -f config/samples/mygroup_v1beta1_genericdaemon.yaml
genericdaemon.mygroup.mydomain.com/genericdaemon-sample created
❯ kubectl get genericdaemon
NAME                   AGE
genericdaemon-sample   11s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="博客元数据" tabindex="-1"><a class="header-anchor" href="#博客元数据" aria-hidden="true">#</a> 博客元数据</h2>
<p>可以将Sample-Controller用于管理 我的博客（<a href="https://docker.cubxxw.com/" target="_blank" rel="noopener noreferrer">docker.cubxxw.com<ExternalLinkIcon/></a> OR  <a href="https://go.cubxxw.com/" target="_blank" rel="noopener noreferrer">go.cubxxw.com<ExternalLinkIcon/></a>） 的元数据。</p>
<ul>
<li><a href="https://github.com/cubxxw/sample-controller/pull/7" target="_blank" rel="noopener noreferrer">对应的 PR 请求<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/sample-controller/" target="_blank" rel="noopener noreferrer">仓库地址<ExternalLinkIcon/></a></li>
</ul>
<p>按照上面学习编写 controller 的逻辑，我把步骤分为三步（针对 kubebuilder ）：</p>
<ol>
<li>Create CRD and CR object</li>
<li>Write  controller code</li>
<li>Deploy controller</li>
</ol>
<p>不仅如此，我希望将 Kubebuilder 和 code-generator 相结合，使用Kubebuilder生成CRD和一整套控制器架构，再使用 code-generator 生成 <code v-pre>informers</code>、<code v-pre>listers</code>、<code v-pre>clientsets</code>等。</p>
<p>针对通过代码生成器写 controller:</p>
<ul>
<li>定义CRD</li>
<li>生成自定义资源的Clientset、Informers、Listers等</li>
<li>编写Controller等代码</li>
</ul>
<h3 id="定义自定义描述" tabindex="-1"><a class="header-anchor" href="#定义自定义描述" aria-hidden="true">#</a> 定义自定义描述</h3>
<p>取名为：<code v-pre>cat crd-blog.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>❯ cat artifacts/examples/crd<span class="token punctuation">-</span>blog.yaml
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> blogs.controller.cubxxw.com
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> controller.cubxxw.com
  <span class="token key atrule">version</span><span class="token punctuation">:</span> v1beta1
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> Blog
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> blogs
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>部署该资源定义:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k apply <span class="token parameter variable">-f</span>  artifacts/examples/crd-blog.yaml
customresourcedefinition.apiextensions.k8s.io/blogs.controller.cubxxw.com created
❯ k get crd
NAME                                  CREATED AT
blogs.controller.cubxxw.com            <span class="token number">2023</span>-04-09T04:13:15Z
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>构建 examples <code v-pre>example-blog.yaml</code>：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">cat</span> example-blog.yaml
apiVersion: controller.cubxxw.com/v1beta1
kind: Blog
metadata:
  name: example-blog
spec:
  deploymentName: example-blog
  replicas: <span class="token number">1</span>
  title: <span class="token string">"example blog"</span>
  author: <span class="token string">"Xinwei Xiong"</span>
  content: <span class="token string">"blog content"</span>
  lastUpdate: <span class="token string">"2023-04-09"</span>
  prev: <span class="token string">""</span>
  next: <span class="token string">""</span>

❯ k apply <span class="token parameter variable">-f</span>  artifacts/examples/example-blog.yaml
blog.controller.cubxxw.com/example-blog created

❯ k get Blog
NAME           AGE
example-blog   61s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然这还远远不够，没有 controller。</p>
<h3 id="开发关于-blog-资源操控的-controller-端代码" tabindex="-1"><a class="header-anchor" href="#开发关于-blog-资源操控的-controller-端代码" aria-hidden="true">#</a> 开发关于 blog 资源操控的 controller 端代码</h3>
<p>首先在 <code v-pre>pkg/apis</code> 下创建目录 <code v-pre>nsdddcontroller</code>，然后将 <code v-pre>samplecontroller</code> 里的所有文件复制到 <code v-pre>nsdddcontroller</code>，我们在学习 <code v-pre>sample-controller</code> 的时候演示过案例<code v-pre>genericdaemon</code>。</p>
<blockquote>
<p>为了 符合 Kubernetes 的版本规范，我们将其作为 bate 版本，可以对外提供~</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ tree nsdddcontroller
nsdddcontroller
├── register.go
└── v1beta1
    ├── doc.go
    ├── register.go
    └── types.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改注册表的配置：</p>
<ul>
<li><code v-pre>pkg/apis/nsdddcontroller/register.go</code></li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> nsdddcontroller

<span class="token comment">// GroupName is the group name used in this package</span>
<span class="token keyword">const</span> <span class="token punctuation">(</span>
	GroupName <span class="token operator">=</span> <span class="token string">"nsdddcontroller.k8s.io"</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 type 文件：</p>
<ul>
<li><code v-pre>pkg/apis/nsdddcontroller/v1bate1/types.go</code></li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> v1beta1

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	metav1 <span class="token string">"k8s.io/apimachinery/pkg/apis/meta/v1"</span>
<span class="token punctuation">)</span>

<span class="token comment">// +genclient</span>
<span class="token comment">// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object</span>

<span class="token comment">// Blog is a specification for a Blog resource</span>
<span class="token keyword">type</span> Blog <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	metav1<span class="token punctuation">.</span>TypeMeta   <span class="token string">`json:",inline"`</span>
	metav1<span class="token punctuation">.</span>ObjectMeta <span class="token string">`json:"metadata,omitempty"`</span>

	Spec   BlogSpec   <span class="token string">`json:"spec"`</span>
	Status BlogStatus <span class="token string">`json:"status"`</span>
<span class="token punctuation">}</span>

<span class="token comment">// BlogSpec is the spec for a Blog resource</span>
<span class="token keyword">type</span> BlogSpec <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	DeploymentName <span class="token builtin">string</span> <span class="token string">`json:"deploymentName"`</span>
	Replicas       <span class="token operator">*</span><span class="token builtin">int32</span> <span class="token string">`json:"replicas"`</span>
	Title          <span class="token builtin">string</span> <span class="token string">`json:"title"`</span>
	Author         <span class="token builtin">string</span> <span class="token string">`json:"author"`</span>
	Content        <span class="token builtin">string</span> <span class="token string">`json:"content"`</span>
	LastUpdate     <span class="token builtin">string</span> <span class="token string">`json:"lastUpdate"`</span>
	Prev           <span class="token builtin">string</span> <span class="token string">`json:"prev"`</span>
	Next           <span class="token builtin">string</span> <span class="token string">`json:"next"`</span>
<span class="token punctuation">}</span>

<span class="token comment">// BlogStatus is the status for a Blog resource</span>
<span class="token keyword">type</span> BlogStatus <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	AvailableReplicas <span class="token builtin">int32</span> <span class="token string">`json:"availableReplicas"`</span>
<span class="token punctuation">}</span>

<span class="token comment">// +k8s:deepcopy-gen:interfaces=k8s.io/apimachinery/pkg/runtime.Object</span>

<span class="token comment">// BlogList is a list of Blog resources</span>
<span class="token keyword">type</span> BlogList <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	metav1<span class="token punctuation">.</span>TypeMeta <span class="token string">`json:",inline"`</span>
	metav1<span class="token punctuation">.</span>ListMeta <span class="token string">`json:"metadata"`</span>

	Items <span class="token punctuation">[</span><span class="token punctuation">]</span>Blog <span class="token string">`json:"items"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="代码生成器-1" tabindex="-1"><a class="header-anchor" href="#代码生成器-1" aria-hidden="true">#</a> 代码生成器</h3>
<p>修改 <code v-pre>hack/update-codegen.sh</code>，增加对 Blog 的代码生成命令（对 nsdddcontroller 包的代码生成）</p>
<blockquote>
<p>在此之前你应该用 git 备份一下，并且准备代码生成器脚本或者二进制 <code v-pre>code-generator</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ go mod vendor
❯ <span class="token function">chmod</span> +x vendor/k8s.io/code-generator/generate-groups.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">"===> Generating genericdaemon code for Blog"</span>
<span class="token string">"<span class="token variable">${CODEGEN_PKG}</span>"</span>/generate-groups.sh <span class="token string">"deepcopy,client,informer,lister"</span> <span class="token punctuation">\</span>
  k8s.io/sample-controller/pkg/client_Blog <span class="token punctuation">\</span> 
  k8s.io/sample-controller/pkg/apis <span class="token punctuation">\</span>
  nsdddcontroller:v1Bate1 <span class="token punctuation">\</span>
  --output-base <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">dirname</span> <span class="token string">"<span class="token variable">${<span class="token environment constant">BASH_SOURCE</span><span class="token punctuation">[</span>0<span class="token punctuation">]</span>}</span>"</span><span class="token variable">)</span></span>/../../.."</span> <span class="token punctuation">\</span>
  --go-header-file <span class="token string">"<span class="token variable">${SCRIPT_ROOT}</span>"</span>/hack/boilerplate.go.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⚠️ 这里有个坑记录下，我用代码生成器生成的一直有问题，使用的是 <code v-pre>GO111MODULE=on</code> 模块。修改后的脚本如下：</p>
<ul>
<li><a href="https://github.com/kubernetes/kubernetes/issues/117181" target="_blank" rel="noopener noreferrer">这里我在 Kubernetes 中提 issue 的记录，会记录所有 代码生成器 出现的问题，这个文章就不补充了。<ExternalLinkIcon/></a></li>
</ul>
<p>获取 许可证头文件的变量和 获取包的路径：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">SCRIPT_ROOT</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">dirname</span> <span class="token string">"<span class="token variable">${<span class="token environment constant">BASH_SOURCE</span><span class="token punctuation">[</span>0<span class="token punctuation">]</span>}</span>"</span><span class="token variable">)</span></span>/<span class="token punctuation">..</span>
<span class="token assign-left variable">CODEGEN_PKG</span><span class="token operator">=</span><span class="token variable">${CODEGEN_PKG<span class="token operator">:-</span>$(cd "${SCRIPT_ROOT}</span>"<span class="token punctuation">;</span> <span class="token function">ls</span> <span class="token parameter variable">-d</span> <span class="token parameter variable">-1</span> ./vendor/k8s.io/code-generator <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token punctuation">..</span>/code-generator<span class="token punctuation">)</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>脚本将<code v-pre>SCRIPT_ROOT</code>变量设置为脚本文件的目录名称，然后将<code v-pre>CODEGEN_PKG</code>变量设置为<code v-pre>code-generator</code>软件包的路径。如果未设置<code v-pre>CODEGEN_PKG</code>环境变量，则脚本会检查<code v-pre>SCRIPT_ROOT</code>路径的vendor目录中是否安装了<code v-pre>code-generator</code>软件包，并相应地设置<code v-pre>CODEGEN_PKG</code>变量。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token builtin class-name">pwd</span>
/root/workspaces/sample-controller

❯ vendor/k8s.io/code-generator/generate-groups.sh <span class="token punctuation">\</span>
<span class="token string">"deepcopy,client,informer,lister"</span> <span class="token punctuation">\</span>
  k8s.io/sample-controller/pkg/generated_blog <span class="token punctuation">\</span>
  k8s.io/sample-controller/pkg/apis <span class="token punctuation">\</span>
  nsdddcontroller:v1Bate1 <span class="token punctuation">\</span>
  --output-base <span class="token string">"/root/workspaces"</span> <span class="token punctuation">\</span>
  --go-header-file <span class="token string">"hack/boilerplate.go.txt"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="写-controller" tabindex="-1"><a class="header-anchor" href="#写-controller" aria-hidden="true">#</a> 写 controller</h3>
<p>规范性的将 controller 放入到 <code v-pre>pkg</code> 中，而不是 <code v-pre>rootfs</code>，取名为 <code v-pre>pkg/blog_controller.go</code></p>
<p>整个控制器逻辑都写出来会有些混乱，为了有助于理解，我们继承第一次阅读 controller.go 的时候的逻辑，再对 controller 进行一次深入阅读和编写。</p>
<p>Controller 结构体的定义：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// BlogController is the controller implementation for Blog resources</span>
<span class="token keyword">type</span> BlogController <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// kubeclientset is a standard kubernetes clientset</span>
	kubeclientset kubernetes<span class="token punctuation">.</span>Interface
	<span class="token comment">// shidaclientset is a clientset for our own API group</span>
	nsdddclientset clientset<span class="token punctuation">.</span>Interface
	deploymentsLister appslisters<span class="token punctuation">.</span>DeploymentLister
	deploymentsSynced cache<span class="token punctuation">.</span>InformerSynced
	blogsLister        listers<span class="token punctuation">.</span>BlogLister
	blogsSynced        cache<span class="token punctuation">.</span>InformerSynced
	workqueue workqueue<span class="token punctuation">.</span>RateLimitingInterface
	recorder record<span class="token punctuation">.</span>EventRecorder
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里定义了一些 Clientset，用来对 Kubernetes 的 API Server 进行交互，这里也定义了一些 Lister，用来获取 Kubernetes 的 API 的信息，在 Lister 中利用缓存也能减少对 API Server 的访问压力。</p>
<p>workqueue 和 Informer 共同完成 Kubernetes controller 的核心：调谐的步骤</p>
<p>继续，找到初始化 Controller 的地方(<code v-pre>NewBlogController</code>)，这个逻辑作为入口供 main.go 初始化，所以和 <code v-pre>Run()</code> 用大写调用。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewBlogController</span><span class="token punctuation">(</span>
	kubeclientset kubernetes<span class="token punctuation">.</span>Interface<span class="token punctuation">,</span>
	nsdddcclientset clientset<span class="token punctuation">.</span>Interface<span class="token punctuation">,</span>
	deploymentInformer appsinformers<span class="token punctuation">.</span>DeploymentInformer<span class="token punctuation">,</span>
	blogInformer informers<span class="token punctuation">.</span>BlogInformer<span class="token punctuation">)</span> <span class="token operator">*</span>BlogController <span class="token punctuation">{</span>
	klog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Creating event broadcaster"</span><span class="token punctuation">)</span>
	eventBroadcaster <span class="token operator">:=</span> record<span class="token punctuation">.</span><span class="token function">NewBroadcaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	eventBroadcaster<span class="token punctuation">.</span><span class="token function">StartLogging</span><span class="token punctuation">(</span>klog<span class="token punctuation">.</span>Infof<span class="token punctuation">)</span>
	eventBroadcaster<span class="token punctuation">.</span><span class="token function">StartRecordingToSink</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>typedcorev1<span class="token punctuation">.</span>EventSinkImpl<span class="token punctuation">{</span>Interface<span class="token punctuation">:</span> kubeclientset<span class="token punctuation">.</span><span class="token function">CoreV1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Events</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	recorder <span class="token operator">:=</span> eventBroadcaster<span class="token punctuation">.</span><span class="token function">NewRecorder</span><span class="token punctuation">(</span>scheme<span class="token punctuation">.</span>Scheme<span class="token punctuation">,</span> corev1<span class="token punctuation">.</span>EventSource<span class="token punctuation">{</span>Component<span class="token punctuation">:</span> blogControllerAgentName<span class="token punctuation">}</span><span class="token punctuation">)</span>

	controller <span class="token operator">:=</span> <span class="token operator">&amp;</span>BlogController<span class="token punctuation">{</span>
		kubeclientset<span class="token punctuation">:</span>     kubeclientset<span class="token punctuation">,</span>
		nsdddcclientset<span class="token punctuation">:</span>   nsdddcclientset<span class="token punctuation">,</span>
		deploymentsLister<span class="token punctuation">:</span> deploymentInformer<span class="token punctuation">.</span><span class="token function">Lister</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		deploymentsSynced<span class="token punctuation">:</span> deploymentInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>HasSynced<span class="token punctuation">,</span>
		blogsLister<span class="token punctuation">:</span>        blogInformer<span class="token punctuation">.</span><span class="token function">Lister</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		blogsSynced<span class="token punctuation">:</span>        blogInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>HasSynced<span class="token punctuation">,</span>
		workqueue<span class="token punctuation">:</span>         workqueue<span class="token punctuation">.</span><span class="token function">NewNamedRateLimitingQueue</span><span class="token punctuation">(</span>workqueue<span class="token punctuation">.</span><span class="token function">DefaultControllerRateLimiter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"Blogs"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		recorder<span class="token punctuation">:</span>          recorder<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Setting up event handlers"</span><span class="token punctuation">)</span>
	blogInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">AddEventHandler</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span>ResourceEventHandlerFuncs<span class="token punctuation">{</span>
		AddFunc<span class="token punctuation">:</span> controller<span class="token punctuation">.</span>enqueueBlog<span class="token punctuation">,</span>
		UpdateFunc<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>old<span class="token punctuation">,</span> <span class="token builtin">new</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			controller<span class="token punctuation">.</span><span class="token function">enqueueBlog</span><span class="token punctuation">(</span><span class="token builtin">new</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	deploymentInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">AddEventHandler</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span>ResourceEventHandlerFuncs<span class="token punctuation">{</span>
		AddFunc<span class="token punctuation">:</span> controller<span class="token punctuation">.</span>handleObject<span class="token punctuation">,</span>
		UpdateFunc<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>old<span class="token punctuation">,</span> <span class="token builtin">new</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			newDepl <span class="token operator">:=</span> <span class="token builtin">new</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>appsv1<span class="token punctuation">.</span>Deployment<span class="token punctuation">)</span>
			oldDepl <span class="token operator">:=</span> old<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>appsv1<span class="token punctuation">.</span>Deployment<span class="token punctuation">)</span>
			<span class="token keyword">if</span> newDepl<span class="token punctuation">.</span>ResourceVersion <span class="token operator">==</span> oldDepl<span class="token punctuation">.</span>ResourceVersion <span class="token punctuation">{</span>
				<span class="token comment">// Periodic resync will send update events for all known Deployments.</span>
				<span class="token comment">// Two different versions of the same Deployment will always have different RVs.</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>
			controller<span class="token punctuation">.</span><span class="token function">handleObject</span><span class="token punctuation">(</span><span class="token builtin">new</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		DeleteFunc<span class="token punctuation">:</span> controller<span class="token punctuation">.</span>handleObject<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">return</span> controller
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>AddToScheme</code> 用于向 <code v-pre>runtime.Scheme</code> 中添加新的 API 对象。<code v-pre>runtime.Scheme</code> 是一个存储 Kubernetes API 对象 Schema 的对象，用于跨 API 版本和 API 组共享类型信息。通过使用 AddToScheme 方法，您可以将自定义 API 对象添加到 <code v-pre>runtime.Scheme</code> 中，以便在 Kubernetes API 中使用自定义 API 对象。</p>
<blockquote>
<p>Scheme 是一个用于存储 Kubernetes API 对象 Schema 的对象，它是 Kubernetes API 的一部分，用于跨 API 版本和 API 组共享类型信息。它允许注册和管理自定义 API 对象，并且还提供了一些辅助方法，例如序列化和反序列化 Kubernetes 对象。</p>
</blockquote>
<p>我们知道了 <code v-pre>Informer</code> 是用于Informer 监视某些资源的对象，它会在资源发生变化时通知控制器。那么 定义的 <code v-pre>HasSynced</code> 是什么，我们可以看下定义：</p>
<blockquote>
<p>HasSynced 是一个函数，用于检查 Informer 是否已经完成了资源的同步。当调用 Informer 的 HasSynced 函数时，如果所有监控的资源都已经同步完成，函数将返回 true。</p>
</blockquote>
<p><code v-pre>AddEventHandler</code> 是一个为 Informer 注册事件处理函数。</p>
<p>其他的定义部分：</p>
<details class="custom-container details"><summary>展开代码块</summary>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
Copyright 2017 The Kubernetes Authors.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/</span>

<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"time"</span>

	appsv1 <span class="token string">"k8s.io/api/apps/v1"</span>
	corev1 <span class="token string">"k8s.io/api/core/v1"</span>
	<span class="token string">"k8s.io/apimachinery/pkg/api/errors"</span>
	metav1 <span class="token string">"k8s.io/apimachinery/pkg/apis/meta/v1"</span>
	<span class="token string">"k8s.io/apimachinery/pkg/runtime/schema"</span>
	utilruntime <span class="token string">"k8s.io/apimachinery/pkg/util/runtime"</span>
	<span class="token string">"k8s.io/apimachinery/pkg/util/wait"</span>
	appsinformers <span class="token string">"k8s.io/client-go/informers/apps/v1"</span>
	<span class="token string">"k8s.io/client-go/kubernetes"</span>
	<span class="token string">"k8s.io/client-go/kubernetes/scheme"</span>
	typedcorev1 <span class="token string">"k8s.io/client-go/kubernetes/typed/core/v1"</span>
	appslisters <span class="token string">"k8s.io/client-go/listers/apps/v1"</span>
	<span class="token string">"k8s.io/client-go/tools/cache"</span>
	<span class="token string">"k8s.io/client-go/tools/record"</span>
	<span class="token string">"k8s.io/client-go/util/workqueue"</span>
	<span class="token string">"k8s.io/klog/v2"</span>

	nsdddv1beta1 <span class="token string">"k8s.io/sample-controller/pkg/apis/nsdddcontroller/v1beta1"</span>
	clientset <span class="token string">"k8s.io/sample-controller/pkg/generated_blog/clientset/versioned"</span>
	samplescheme <span class="token string">"k8s.io/sample-controller/pkg/generated_blog/clientset/versioned/scheme"</span>
	informers <span class="token string">"k8s.io/sample-controller/pkg/generated_blog/informers/externalversions/nsdddcontroller/v1beta1"</span>
	listers <span class="token string">"k8s.io/sample-controller/pkg/generated_blog/listers/nsdddcontroller/v1beta1"</span>
<span class="token punctuation">)</span>

<span class="token keyword">const</span> blogControllerAgentName <span class="token operator">=</span> <span class="token string">"nsddd-controller"</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	<span class="token comment">// BlogSuccessSynced is used as part of the Event 'reason' when a Blog is synced</span>
	BlogSuccessSynced <span class="token operator">=</span> <span class="token string">"Synced"</span>
	<span class="token comment">// BlogErrResourceExists is used as part of the Event 'reason' when a Blog fails</span>
	<span class="token comment">// to sync due to a Deployment of the same name already existing.</span>
	BlogErrResourceExists <span class="token operator">=</span> <span class="token string">"ErrResourceExists"</span>

	<span class="token comment">// BlogMessageResourceExists is the message used for Events when a resource</span>
	<span class="token comment">// fails to sync due to a Deployment already existing</span>
	BlogMessageResourceExists <span class="token operator">=</span> <span class="token string">"Resource %q already exists and is not managed by Blog"</span>
	<span class="token comment">// BlogMessageResourceSynced is the message used for an Event fired when a Blog</span>
	<span class="token comment">// is synced successfully</span>
	BlogMessageResourceSynced <span class="token operator">=</span> <span class="token string">"Blog synced successfully"</span>
<span class="token punctuation">)</span>

<span class="token comment">// BlogController is the controller implementation for Blog resources</span>
<span class="token keyword">type</span> BlogController <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// kubeclientset is a standard kubernetes clientset</span>
	kubeclientset kubernetes<span class="token punctuation">.</span>Interface
	<span class="token comment">// nsdddclientset is a clientset for our own API group</span>
	nsdddclientset clientset<span class="token punctuation">.</span>Interface

	deploymentsLister appslisters<span class="token punctuation">.</span>DeploymentLister
	deploymentsSynced cache<span class="token punctuation">.</span>InformerSynced
	blogsLister       listers<span class="token punctuation">.</span>BlogLister
	blogsSynced       cache<span class="token punctuation">.</span>InformerSynced

	<span class="token comment">// workqueue is a rate limited work queue. This is used to queue work to be</span>
	<span class="token comment">// processed instead of performing it as soon as a change happens. This</span>
	<span class="token comment">// means we can ensure we only process a fixed amount of resources at a</span>
	<span class="token comment">// time, and makes it easy to ensure we are never processing the same item</span>
	<span class="token comment">// simultaneously in two different workers.</span>
	workqueue workqueue<span class="token punctuation">.</span>RateLimitingInterface
	<span class="token comment">// recorder is an event recorder for recording Event resources to the</span>
	<span class="token comment">// Kubernetes API.</span>
	recorder record<span class="token punctuation">.</span>EventRecorder
<span class="token punctuation">}</span>

<span class="token comment">// NewBlogController returns a new sample controller</span>
<span class="token keyword">func</span> <span class="token function">NewBlogController</span><span class="token punctuation">(</span>
	kubeclientset kubernetes<span class="token punctuation">.</span>Interface<span class="token punctuation">,</span>
	nsdddclientset clientset<span class="token punctuation">.</span>Interface<span class="token punctuation">,</span>
	deploymentInformer appsinformers<span class="token punctuation">.</span>DeploymentInformer<span class="token punctuation">,</span>
	blogInformer informers<span class="token punctuation">.</span>BlogInformer<span class="token punctuation">)</span> <span class="token operator">*</span>BlogController <span class="token punctuation">{</span>

	<span class="token comment">// Create event broadcaster</span>
	<span class="token comment">// Add sample-controller types to the default Kubernetes Scheme so Events can be</span>
	<span class="token comment">// logged for sample-controller types.</span>
	utilruntime<span class="token punctuation">.</span><span class="token function">Must</span><span class="token punctuation">(</span>samplescheme<span class="token punctuation">.</span><span class="token function">AddToScheme</span><span class="token punctuation">(</span>scheme<span class="token punctuation">.</span>Scheme<span class="token punctuation">)</span><span class="token punctuation">)</span>
	klog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Creating event broadcaster"</span><span class="token punctuation">)</span>
	eventBroadcaster <span class="token operator">:=</span> record<span class="token punctuation">.</span><span class="token function">NewBroadcaster</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	eventBroadcaster<span class="token punctuation">.</span><span class="token function">StartLogging</span><span class="token punctuation">(</span>klog<span class="token punctuation">.</span>Infof<span class="token punctuation">)</span>
	eventBroadcaster<span class="token punctuation">.</span><span class="token function">StartRecordingToSink</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>typedcorev1<span class="token punctuation">.</span>EventSinkImpl<span class="token punctuation">{</span>Interface<span class="token punctuation">:</span> kubeclientset<span class="token punctuation">.</span><span class="token function">CoreV1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Events</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	recorder <span class="token operator">:=</span> eventBroadcaster<span class="token punctuation">.</span><span class="token function">NewRecorder</span><span class="token punctuation">(</span>scheme<span class="token punctuation">.</span>Scheme<span class="token punctuation">,</span> corev1<span class="token punctuation">.</span>EventSource<span class="token punctuation">{</span>Component<span class="token punctuation">:</span> blogControllerAgentName<span class="token punctuation">}</span><span class="token punctuation">)</span>

	controller <span class="token operator">:=</span> <span class="token operator">&amp;</span>BlogController<span class="token punctuation">{</span>
		kubeclientset<span class="token punctuation">:</span>     kubeclientset<span class="token punctuation">,</span>
		nsdddclientset<span class="token punctuation">:</span>    nsdddclientset<span class="token punctuation">,</span>
		deploymentsLister<span class="token punctuation">:</span> deploymentInformer<span class="token punctuation">.</span><span class="token function">Lister</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		deploymentsSynced<span class="token punctuation">:</span> deploymentInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>HasSynced<span class="token punctuation">,</span>
		blogsLister<span class="token punctuation">:</span>       blogInformer<span class="token punctuation">.</span><span class="token function">Lister</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		blogsSynced<span class="token punctuation">:</span>       blogInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>HasSynced<span class="token punctuation">,</span>
		workqueue<span class="token punctuation">:</span>         workqueue<span class="token punctuation">.</span><span class="token function">NewNamedRateLimitingQueue</span><span class="token punctuation">(</span>workqueue<span class="token punctuation">.</span><span class="token function">DefaultControllerRateLimiter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"Blogs"</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		recorder<span class="token punctuation">:</span>          recorder<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Setting up event handlers"</span><span class="token punctuation">)</span>
	<span class="token comment">// Set up an event handler for when Blog resources change</span>
	blogInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">AddEventHandler</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span>ResourceEventHandlerFuncs<span class="token punctuation">{</span>
		AddFunc<span class="token punctuation">:</span> controller<span class="token punctuation">.</span>enqueueBlog<span class="token punctuation">,</span>
		UpdateFunc<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>old<span class="token punctuation">,</span> <span class="token builtin">new</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			controller<span class="token punctuation">.</span><span class="token function">enqueueBlog</span><span class="token punctuation">(</span><span class="token builtin">new</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token comment">// Set up an event handler for when Deployment resources change. This</span>
	<span class="token comment">// handler will lookup the owner of the given Deployment, and if it is</span>
	<span class="token comment">// owned by a Blog resource will enqueue that Blog resource for</span>
	<span class="token comment">// processing. This way, we don't need to implement custom logic for</span>
	<span class="token comment">// handling Deployment resources. More info on this pattern:</span>
	<span class="token comment">// https://github.com/kubernetes/community/blob/8cafef897a22026d42f5e5bb3f104febe7e29830/contributors/devel/controllers.md</span>
	deploymentInformer<span class="token punctuation">.</span><span class="token function">Informer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">AddEventHandler</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span>ResourceEventHandlerFuncs<span class="token punctuation">{</span>
		AddFunc<span class="token punctuation">:</span> controller<span class="token punctuation">.</span>handleObject<span class="token punctuation">,</span>
		UpdateFunc<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>old<span class="token punctuation">,</span> <span class="token builtin">new</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
			newDepl <span class="token operator">:=</span> <span class="token builtin">new</span><span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>appsv1<span class="token punctuation">.</span>Deployment<span class="token punctuation">)</span>
			oldDepl <span class="token operator">:=</span> old<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>appsv1<span class="token punctuation">.</span>Deployment<span class="token punctuation">)</span>
			<span class="token keyword">if</span> newDepl<span class="token punctuation">.</span>ResourceVersion <span class="token operator">==</span> oldDepl<span class="token punctuation">.</span>ResourceVersion <span class="token punctuation">{</span>
				<span class="token comment">// Periodic resync will send update events for all known Deployments.</span>
				<span class="token comment">// Two different versions of the same Deployment will always have different RVs.</span>
				<span class="token keyword">return</span>
			<span class="token punctuation">}</span>
			controller<span class="token punctuation">.</span><span class="token function">handleObject</span><span class="token punctuation">(</span><span class="token builtin">new</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		DeleteFunc<span class="token punctuation">:</span> controller<span class="token punctuation">.</span>handleObject<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">return</span> controller
<span class="token punctuation">}</span>

<span class="token comment">// Run will set up the event handlers for types we are interested in, as well</span>
<span class="token comment">// as syncing informer caches and starting workers. It will block until stopCh</span>
<span class="token comment">// is closed, at which point it will shutdown the workqueue and wait for</span>
<span class="token comment">// workers to finish processing their current work items.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>BlogController<span class="token punctuation">)</span> <span class="token function">Run</span><span class="token punctuation">(</span>threadiness <span class="token builtin">int</span><span class="token punctuation">,</span> stopCh <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> utilruntime<span class="token punctuation">.</span><span class="token function">HandleCrash</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">ShutDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// Start the informer factories to begin populating the informer caches</span>
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Starting Blog controller"</span><span class="token punctuation">)</span>

	<span class="token comment">// Wait for the caches to be synced before starting workers</span>
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Waiting for informer caches to sync"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> ok <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">WaitForCacheSync</span><span class="token punctuation">(</span>stopCh<span class="token punctuation">,</span> c<span class="token punctuation">.</span>deploymentsSynced<span class="token punctuation">,</span> c<span class="token punctuation">.</span>blogsSynced<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"failed to wait for caches to sync"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Starting workers"</span><span class="token punctuation">)</span>
	<span class="token comment">// Launch two workers to process Blog resources</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> threadiness<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		<span class="token keyword">go</span> wait<span class="token punctuation">.</span><span class="token function">Until</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>runWorker<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">,</span> stopCh<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Started workers"</span><span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span>stopCh
	klog<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span><span class="token string">"Shutting down workers"</span><span class="token punctuation">)</span>

	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token comment">// runWorker is a long-running function that will continually call the</span>
<span class="token comment">// processNextWorkItem function in order to read and process a message on the</span>
<span class="token comment">// workqueue.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>BlogController<span class="token punctuation">)</span> <span class="token function">runWorker</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> c<span class="token punctuation">.</span><span class="token function">processNextWorkItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// processNextWorkItem will read a single work item off the workqueue and</span>
<span class="token comment">// attempt to process it, by calling the syncHandler.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>BlogController<span class="token punctuation">)</span> <span class="token function">processNextWorkItem</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	obj<span class="token punctuation">,</span> shutdown <span class="token operator">:=</span> c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> shutdown <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// We wrap this block in a func so we can defer c.workqueue.Done.</span>
	err <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
		<span class="token comment">// We call Done here so the workqueue knows we have finished</span>
		<span class="token comment">// processing this item. We also must remember to call Forget if we</span>
		<span class="token comment">// do not want this work item being re-queued. For example, we do</span>
		<span class="token comment">// not call Forget if a transient error occurs, instead the item is</span>
		<span class="token comment">// put back on the workqueue and attempted again after a back-off</span>
		<span class="token comment">// period.</span>
		<span class="token keyword">defer</span> c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
		<span class="token keyword">var</span> key <span class="token builtin">string</span>
		<span class="token keyword">var</span> ok <span class="token builtin">bool</span>
		<span class="token comment">// We expect strings to come off the workqueue. These are of the</span>
		<span class="token comment">// form namespace/name. We do this as the delayed nature of the</span>
		<span class="token comment">// workqueue means the items in the informer cache may actually be</span>
		<span class="token comment">// more up to date that when the item was initially put onto the</span>
		<span class="token comment">// workqueue.</span>
		<span class="token keyword">if</span> key<span class="token punctuation">,</span> ok <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
			<span class="token comment">// As the item in the workqueue is actually invalid, we call</span>
			<span class="token comment">// Forget here else we'd go into a loop of attempting to</span>
			<span class="token comment">// process a work item that is invalid.</span>
			c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">Forget</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
			utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"expected string in workqueue but got %#v"</span><span class="token punctuation">,</span> obj<span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// Run the syncHandler, passing it the namespace/name string of the</span>
		<span class="token comment">// Blog resource to be synced.</span>
		<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">syncHandler</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token comment">// Put the item back on the workqueue to handle any transient errors.</span>
			c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">AddRateLimited</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
			<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"error syncing '%s': %s, requeuing"</span><span class="token punctuation">,</span> key<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// Finally, if no error occurs we Forget this item so it does not</span>
		<span class="token comment">// get queued again until another change happens.</span>
		c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">Forget</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>
		klog<span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"Successfully synced '%s'"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">true</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment">// syncHandler compares the actual state with the desired, and attempts to</span>
<span class="token comment">// converge the two. It then updates the Status block of the Blog resource</span>
<span class="token comment">// with the current status of the resource.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>BlogController<span class="token punctuation">)</span> <span class="token function">syncHandler</span><span class="token punctuation">(</span>key <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token comment">// Convert the namespace/name string into a distinct namespace and name</span>
	namespace<span class="token punctuation">,</span> name<span class="token punctuation">,</span> err <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">SplitMetaNamespaceKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"invalid resource key: %s"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Get the Blog resource with this namespace/name</span>
	blog<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>blogsLister<span class="token punctuation">.</span><span class="token function">Blogs</span><span class="token punctuation">(</span>namespace<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// The Blog resource may no longer exist, in which case we stop</span>
		<span class="token comment">// processing.</span>
		<span class="token keyword">if</span> errors<span class="token punctuation">.</span><span class="token function">IsNotFound</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"blog '%s' in work queue no longer exists"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	deploymentName <span class="token operator">:=</span> blog<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>DeploymentName
	<span class="token keyword">if</span> deploymentName <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		<span class="token comment">// We choose to absorb the error here as the worker would requeue the</span>
		<span class="token comment">// resource otherwise. Instead, the next time the resource is updated</span>
		<span class="token comment">// the resource will be queued again.</span>
		utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"%s: deployment name must be specified"</span><span class="token punctuation">,</span> key<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// Get the deployment with the name specified in Blog.spec</span>
	deployment<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>deploymentsLister<span class="token punctuation">.</span><span class="token function">Deployments</span><span class="token punctuation">(</span>blog<span class="token punctuation">.</span>Namespace<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>deploymentName<span class="token punctuation">)</span>
	<span class="token comment">// If the resource doesn't exist, we'll create it</span>
	<span class="token keyword">if</span> errors<span class="token punctuation">.</span><span class="token function">IsNotFound</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		deployment<span class="token punctuation">,</span> err <span class="token operator">=</span> c<span class="token punctuation">.</span>kubeclientset<span class="token punctuation">.</span><span class="token function">AppsV1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Deployments</span><span class="token punctuation">(</span>blog<span class="token punctuation">.</span>Namespace<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">TODO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">newBlogDeployment</span><span class="token punctuation">(</span>blog<span class="token punctuation">)</span><span class="token punctuation">,</span> metav1<span class="token punctuation">.</span>CreateOptions<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// If an error occurs during Get/Create, we'll requeue the item so we can</span>
	<span class="token comment">// attempt processing again later. This could have been caused by a</span>
	<span class="token comment">// temporary network failure, or any other transient reason.</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	<span class="token comment">// If the Deployment is not controlled by this Blog resource, we should log</span>
	<span class="token comment">// a warning to the event recorder and ret</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>metav1<span class="token punctuation">.</span><span class="token function">IsControlledBy</span><span class="token punctuation">(</span>deployment<span class="token punctuation">,</span> blog<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		msg <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span>BlogMessageResourceExists<span class="token punctuation">,</span> deployment<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
		c<span class="token punctuation">.</span>recorder<span class="token punctuation">.</span><span class="token function">Event</span><span class="token punctuation">(</span>blog<span class="token punctuation">,</span> corev1<span class="token punctuation">.</span>EventTypeWarning<span class="token punctuation">,</span> BlogErrResourceExists<span class="token punctuation">,</span> msg<span class="token punctuation">)</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// If this number of the replicas on the Blog resource is specified, and the</span>
	<span class="token comment">// number does not equal the current desired replicas on the Deployment, we</span>
	<span class="token comment">// should update the Deployment resource.</span>
	<span class="token keyword">if</span> blog<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">*</span>blog<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas <span class="token operator">!=</span> <span class="token operator">*</span>deployment<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas <span class="token punctuation">{</span>
		klog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"Blog %s replicas: %d, deployment replicas: %d"</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> <span class="token operator">*</span>blog<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas<span class="token punctuation">,</span> <span class="token operator">*</span>deployment<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas<span class="token punctuation">)</span>
		deployment<span class="token punctuation">,</span> err <span class="token operator">=</span> c<span class="token punctuation">.</span>kubeclientset<span class="token punctuation">.</span><span class="token function">AppsV1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Deployments</span><span class="token punctuation">(</span>blog<span class="token punctuation">.</span>Namespace<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">TODO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">newBlogDeployment</span><span class="token punctuation">(</span>blog<span class="token punctuation">)</span><span class="token punctuation">,</span> metav1<span class="token punctuation">.</span>UpdateOptions<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// If an error occurs during Update, we'll requeue the item so we can</span>
	<span class="token comment">// attempt processing again later. THis could have been caused by a</span>
	<span class="token comment">// temporary network failure, or any other transient reason.</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	<span class="token comment">// Finally, we update the status block of the Blog resource to reflect the</span>
	<span class="token comment">// current state of the world</span>
	err <span class="token operator">=</span> c<span class="token punctuation">.</span><span class="token function">updateBlogStatus</span><span class="token punctuation">(</span>blog<span class="token punctuation">,</span> deployment<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	c<span class="token punctuation">.</span>recorder<span class="token punctuation">.</span><span class="token function">Event</span><span class="token punctuation">(</span>blog<span class="token punctuation">,</span> corev1<span class="token punctuation">.</span>EventTypeNormal<span class="token punctuation">,</span> BlogSuccessSynced<span class="token punctuation">,</span> BlogMessageResourceSynced<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>BlogController<span class="token punctuation">)</span> <span class="token function">updateBlogStatus</span><span class="token punctuation">(</span>blog <span class="token operator">*</span>nsdddv1beta1<span class="token punctuation">.</span>Blog<span class="token punctuation">,</span> deployment <span class="token operator">*</span>appsv1<span class="token punctuation">.</span>Deployment<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token comment">// NEVER modify objects from the store. It's a read-only, local cache.</span>
	<span class="token comment">// You can use DeepCopy() to make a deep copy of original object and modify this copy</span>
	<span class="token comment">// Or create a copy manually for better performance</span>
	blogCopy <span class="token operator">:=</span> blog<span class="token punctuation">.</span><span class="token function">DeepCopy</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	blogCopy<span class="token punctuation">.</span>Status<span class="token punctuation">.</span>AvailableReplicas <span class="token operator">=</span> deployment<span class="token punctuation">.</span>Status<span class="token punctuation">.</span>AvailableReplicas
	<span class="token comment">// If the CustomResourceSubresources feature gate is not enabled,</span>
	<span class="token comment">// we must use Update instead of UpdateStatus to update the Status block of the Blog resource.</span>
	<span class="token comment">// UpdateStatus will not allow changes to the Spec of the resource,</span>
	<span class="token comment">// which is ideal for ensuring nothing other than resource status has been updated.</span>
	<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>nsdddclientset<span class="token punctuation">.</span><span class="token function">ControllerV1beta1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Blogs</span><span class="token punctuation">(</span>blog<span class="token punctuation">.</span>Namespace<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">UpdateStatus</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">TODO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> blogCopy<span class="token punctuation">,</span> metav1<span class="token punctuation">.</span>UpdateOptions<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> err
<span class="token punctuation">}</span>

<span class="token comment">// enqueueBlog takes a Blog resource and converts it into a namespace/name</span>
<span class="token comment">// string which is then put onto the work queue. This method should *not* be</span>
<span class="token comment">// passed resources of any type other than Blog.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>BlogController<span class="token punctuation">)</span> <span class="token function">enqueueBlog</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> key <span class="token builtin">string</span>
	<span class="token keyword">var</span> err <span class="token builtin">error</span>
	<span class="token keyword">if</span> key<span class="token punctuation">,</span> err <span class="token operator">=</span> cache<span class="token punctuation">.</span><span class="token function">MetaNamespaceKeyFunc</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	c<span class="token punctuation">.</span>workqueue<span class="token punctuation">.</span><span class="token function">AddRateLimited</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// handleObject will take any resource implementing metav1.Object and attempt</span>
<span class="token comment">// to find the Blog resource that 'owns' it. It does this by looking at the</span>
<span class="token comment">// objects metadata.ownerReferences field for an appropriate OwnerReference.</span>
<span class="token comment">// It then enqueues that Blog resource to be processed. If the object does not</span>
<span class="token comment">// have an appropriate OwnerReference, it will simply be skipped.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>BlogController<span class="token punctuation">)</span> <span class="token function">handleObject</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> object metav1<span class="token punctuation">.</span>Object
	<span class="token keyword">var</span> ok <span class="token builtin">bool</span>
	<span class="token keyword">if</span> object<span class="token punctuation">,</span> ok <span class="token operator">=</span> obj<span class="token punctuation">.</span><span class="token punctuation">(</span>metav1<span class="token punctuation">.</span>Object<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
		tombstone<span class="token punctuation">,</span> ok <span class="token operator">:=</span> obj<span class="token punctuation">.</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span>DeletedFinalStateUnknown<span class="token punctuation">)</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
			utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"error decoding object, invalid type"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		object<span class="token punctuation">,</span> ok <span class="token operator">=</span> tombstone<span class="token punctuation">.</span>Obj<span class="token punctuation">.</span><span class="token punctuation">(</span>metav1<span class="token punctuation">.</span>Object<span class="token punctuation">)</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
			utilruntime<span class="token punctuation">.</span><span class="token function">HandleError</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"error decoding object tombstone, invalid type"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		klog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"Recovered deleted object '%s' from tombstone"</span><span class="token punctuation">,</span> object<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	klog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"Processing object: %s"</span><span class="token punctuation">,</span> object<span class="token punctuation">.</span><span class="token function">GetName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> ownerRef <span class="token operator">:=</span> metav1<span class="token punctuation">.</span><span class="token function">GetControllerOf</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token punctuation">;</span> ownerRef <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token comment">// If this object is not owned by a Blog, we should not do anything more</span>
		<span class="token comment">// with it.</span>
		<span class="token keyword">if</span> ownerRef<span class="token punctuation">.</span>Kind <span class="token operator">!=</span> <span class="token string">"Blog"</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		blog<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>blogsLister<span class="token punctuation">.</span><span class="token function">Blogs</span><span class="token punctuation">(</span>object<span class="token punctuation">.</span><span class="token function">GetNamespace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>ownerRef<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			klog<span class="token punctuation">.</span><span class="token function">V</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"ignoring orphaned object '%s' of blog '%s'"</span><span class="token punctuation">,</span> object<span class="token punctuation">.</span><span class="token function">GetSelfLink</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ownerRef<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>

		c<span class="token punctuation">.</span><span class="token function">enqueueBlog</span><span class="token punctuation">(</span>blog<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// newBlogDeployment creates a new Deployment for a Blog resource. It also sets</span>
<span class="token comment">// the appropriate OwnerReferences on the resource so handleObject can discover</span>
<span class="token comment">// the Blog resource that 'owns' it.</span>
<span class="token keyword">func</span> <span class="token function">newBlogDeployment</span><span class="token punctuation">(</span>blog <span class="token operator">*</span>nsdddv1beta1<span class="token punctuation">.</span>Blog<span class="token punctuation">)</span> <span class="token operator">*</span>appsv1<span class="token punctuation">.</span>Deployment <span class="token punctuation">{</span>
	labels <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>
		<span class="token string">"app"</span><span class="token punctuation">:</span>        <span class="token string">"nginx"</span><span class="token punctuation">,</span>
		<span class="token string">"controller"</span><span class="token punctuation">:</span> blog<span class="token punctuation">.</span>Name<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>appsv1<span class="token punctuation">.</span>Deployment<span class="token punctuation">{</span>
		ObjectMeta<span class="token punctuation">:</span> metav1<span class="token punctuation">.</span>ObjectMeta<span class="token punctuation">{</span>
			Name<span class="token punctuation">:</span>      blog<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>DeploymentName<span class="token punctuation">,</span>
			Namespace<span class="token punctuation">:</span> blog<span class="token punctuation">.</span>Namespace<span class="token punctuation">,</span>
			OwnerReferences<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>metav1<span class="token punctuation">.</span>OwnerReference<span class="token punctuation">{</span>
				<span class="token operator">*</span>metav1<span class="token punctuation">.</span><span class="token function">NewControllerRef</span><span class="token punctuation">(</span>blog<span class="token punctuation">,</span> schema<span class="token punctuation">.</span>GroupVersionKind<span class="token punctuation">{</span>
					Group<span class="token punctuation">:</span>   nsdddv1beta1<span class="token punctuation">.</span>SchemeGroupVersion<span class="token punctuation">.</span>Group<span class="token punctuation">,</span>
					Version<span class="token punctuation">:</span> nsdddv1beta1<span class="token punctuation">.</span>SchemeGroupVersion<span class="token punctuation">.</span>Version<span class="token punctuation">,</span>
					Kind<span class="token punctuation">:</span>    <span class="token string">"Blog"</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		Spec<span class="token punctuation">:</span> appsv1<span class="token punctuation">.</span>DeploymentSpec<span class="token punctuation">{</span>
			Replicas<span class="token punctuation">:</span> blog<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Replicas<span class="token punctuation">,</span>
			Selector<span class="token punctuation">:</span> <span class="token operator">&amp;</span>metav1<span class="token punctuation">.</span>LabelSelector<span class="token punctuation">{</span>
				MatchLabels<span class="token punctuation">:</span> labels<span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
			Template<span class="token punctuation">:</span> corev1<span class="token punctuation">.</span>PodTemplateSpec<span class="token punctuation">{</span>
				ObjectMeta<span class="token punctuation">:</span> metav1<span class="token punctuation">.</span>ObjectMeta<span class="token punctuation">{</span>
					Labels<span class="token punctuation">:</span> labels<span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
				Spec<span class="token punctuation">:</span> corev1<span class="token punctuation">.</span>PodSpec<span class="token punctuation">{</span>
					Containers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>corev1<span class="token punctuation">.</span>Container<span class="token punctuation">{</span>
						<span class="token punctuation">{</span>
							Name<span class="token punctuation">:</span>  <span class="token string">"nginx"</span><span class="token punctuation">,</span>
							Image<span class="token punctuation">:</span> <span class="token string">"nginx:latest"</span><span class="token punctuation">,</span>
						<span class="token punctuation">}</span><span class="token punctuation">,</span>
					<span class="token punctuation">}</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="启动控制器" tabindex="-1"><a class="header-anchor" href="#启动控制器" aria-hidden="true">#</a> 启动控制器</h3>
<p>最后，在 <code v-pre>pkg/main.go</code> 里创建我们的 Blog Controller，并启动控制器</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
Copyright 2017 The Kubernetes Authors.
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/</span>

<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"flag"</span>
	<span class="token string">"time"</span>

	kubeinformers <span class="token string">"k8s.io/client-go/informers"</span>
	<span class="token string">"k8s.io/client-go/kubernetes"</span>
	<span class="token string">"k8s.io/client-go/tools/clientcmd"</span>
	<span class="token string">"k8s.io/klog/v2"</span>

	<span class="token comment">// Uncomment the following line to load the gcp plugin (only required to authenticate against GKE clusters).</span>
	<span class="token comment">// _ "k8s.io/client-go/plugin/pkg/client/auth/gcp"</span>

	clientset <span class="token string">"k8s.io/sample-controller/pkg/generated/clientset/versioned"</span>
	informers <span class="token string">"k8s.io/sample-controller/pkg/generated/informers/externalversions"</span>

	blogclientset <span class="token string">"k8s.io/sample-controller/pkg/generated_blog/clientset/versioned"</span>
	bloginformers <span class="token string">"k8s.io/sample-controller/pkg/generated_blog/informers/externalversions"</span>
	<span class="token string">"k8s.io/sample-controller/pkg/signals"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	masterURL  <span class="token builtin">string</span>
	kubeconfig <span class="token builtin">string</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// set up signals so we handle the shutdown signal gracefully</span>
	ctx <span class="token operator">:=</span> signals<span class="token punctuation">.</span><span class="token function">SetupSignalHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	logger <span class="token operator">:=</span> klog<span class="token punctuation">.</span><span class="token function">FromContext</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>

	cfg<span class="token punctuation">,</span> err <span class="token operator">:=</span> clientcmd<span class="token punctuation">.</span><span class="token function">BuildConfigFromFlags</span><span class="token punctuation">(</span>masterURL<span class="token punctuation">,</span> kubeconfig<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Error building kubeconfig"</span><span class="token punctuation">)</span>
		klog<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Error building kubeconfig: %s"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	kubeClient<span class="token punctuation">,</span> err <span class="token operator">:=</span> kubernetes<span class="token punctuation">.</span><span class="token function">NewForConfig</span><span class="token punctuation">(</span>cfg<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Error building kubernetes clientset"</span><span class="token punctuation">)</span>
		klog<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Error building kubernetes clientset: %s"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	exampleClient<span class="token punctuation">,</span> err <span class="token operator">:=</span> clientset<span class="token punctuation">.</span><span class="token function">NewForConfig</span><span class="token punctuation">(</span>cfg<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Error building exampleClient is clientset"</span><span class="token punctuation">)</span>
		klog<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Error building example clientset: %s"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	blogClient<span class="token punctuation">,</span> err <span class="token operator">:=</span> blogclientset<span class="token punctuation">.</span><span class="token function">NewForConfig</span><span class="token punctuation">(</span>cfg<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logger<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Error building blogClient is clientset"</span><span class="token punctuation">)</span>
		klog<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Error building blog clientset: %s"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	kubeInformerFactory <span class="token operator">:=</span> kubeinformers<span class="token punctuation">.</span><span class="token function">NewSharedInformerFactory</span><span class="token punctuation">(</span>kubeClient<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">30</span><span class="token punctuation">)</span>
	exampleInformerFactory <span class="token operator">:=</span> informers<span class="token punctuation">.</span><span class="token function">NewSharedInformerFactory</span><span class="token punctuation">(</span>exampleClient<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">30</span><span class="token punctuation">)</span>
	blogInformerFactory <span class="token operator">:=</span> bloginformers<span class="token punctuation">.</span><span class="token function">NewSharedInformerFactory</span><span class="token punctuation">(</span>blogClient<span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">30</span><span class="token punctuation">)</span>

	blogController <span class="token operator">:=</span> <span class="token function">NewBlogController</span><span class="token punctuation">(</span>kubeClient<span class="token punctuation">,</span> blogClient<span class="token punctuation">,</span>
		kubeInformerFactory<span class="token punctuation">.</span><span class="token function">Apps</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">V1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Deployments</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		blogInformerFactory<span class="token punctuation">.</span><span class="token function">Controller</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">V1beta1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Blogs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token comment">// notice that there is no need to run Start methods in a separate goroutine. (i.e. go kubeInformerFactory.Start(ctx.Done())</span>
	<span class="token comment">// Start method is non-blocking and runs all registered informers in a dedicated goroutine.</span>
	kubeInformerFactory<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	exampleInformerFactory<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	blogInformerFactory<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		err <span class="token operator">=</span> blogController<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			klog<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Error running controller: %s"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">if</span> err <span class="token operator">=</span> blogController<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		klog<span class="token punctuation">.</span><span class="token function">Fatalf</span><span class="token punctuation">(</span><span class="token string">"Error running controller: %s"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>kubeconfig<span class="token punctuation">,</span> <span class="token string">"kubeconfig"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"Path to a kubeconfig. Only required if out-of-cluster."</span><span class="token punctuation">)</span>
	flag<span class="token punctuation">.</span><span class="token function">StringVar</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>masterURL<span class="token punctuation">,</span> <span class="token string">"master"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> <span class="token string">"The address of the Kubernetes API server. Overrides any value in kubeconfig. Only required if out-of-cluster."</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="验证" tabindex="-1"><a class="header-anchor" href="#验证" aria-hidden="true">#</a> 验证</h3>
<p><strong>重新编译 sample-controller 项目，并运行 sample-controller CRD 控制器</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># assumes you have a working kubeconfig, not required if operating in-cluster</span>
go build <span class="token parameter variable">-o</span> sample-controller <span class="token builtin class-name">.</span>
./sample-controller <span class="token parameter variable">-kubeconfig</span><span class="token operator">=</span><span class="token environment constant">$HOME</span>/.kube/config

<span class="token comment"># create a CustomResourceDefinition</span>
kubectl create <span class="token parameter variable">-f</span> artifacts/examples/crd-status-subresource.yaml

<span class="token comment"># create a custom resource of type Foo</span>
kubectl create <span class="token parameter variable">-f</span> artifacts/examples/example-foo.yaml

<span class="token comment"># check deployments created through the custom resource</span>
kubectl get deployments
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-kubebuilder-构建" tabindex="-1"><a class="header-anchor" href="#使用-kubebuilder-构建" aria-hidden="true">#</a> 使用 Kubebuilder 构建</h2>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '65.md' style='float:left'>⬆️上一节🔗  </a><a href = '67.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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
<p><strong>关于CRD有一些链接:</strong></p>
<ul>
<li>官方文档：https://kubernetes.io/docs/tasks/access-kubernetes-api/custom-resources/custom-resource-definitions/</li>
<li>官方解释：https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/#create-a-customresourcedefinition</li>
<li>CRD Yaml的Schema：https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#customresourcedefinition-v1beta1-apiextensions-k8s-io</li>
<li>https://kubernetes.feisky.xyz/cha-jian-kuo-zhan/api/customresourcedefinition</li>
<li>https://book.kubebuilder.io/</li>
<li><a href="https://github.com/kubernetes/community/blob/8cafef897a22026d42f5e5bb3f104febe7e29830/contributors/devel/controllers.md" target="_blank" rel="noopener noreferrer">kubernetes write controller<ExternalLinkIcon/></a></li>
<li>书籍：《Kubernetes Operator 开发进阶 - 胡涛》 但不推荐购买~</li>
</ul>
<p><strong>这篇文章参考的博客连接：</strong></p>
<ul>
<li>
<p><a href="https://xieys.club/code-generator-crd/" target="_blank" rel="noopener noreferrer">使用code-generator生成crd的clientset、informer、listers<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://sq.163yun.com/blog/article/174980128954048512" target="_blank" rel="noopener noreferrer">kubernetes1.9管中窥豹-CRD概念、使用场景及实例<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://segmentfault.com/a/1190000039706356" target="_blank" rel="noopener noreferrer">结合Kubebuilder与code-generator开发Operator<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://lailin.xyz/post/operator-kubebuilder-clientset.html" target="_blank" rel="noopener noreferrer">kubebuilder 能否生成类似 client-go 的 sdk?<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://blog.csdn.net/boling_cavalry/article/details/88917818" target="_blank" rel="noopener noreferrer">k8s自定义controller三部曲之一:创建CRD（Custom Resource Definition）<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="http://www.asznl.com/post/43" target="_blank" rel="noopener noreferrer">sample-controller 实现自定义 CRD<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://itnext.io/building-an-operator-for-kubernetes-with-the-sample-controller-b4204be9ad56" target="_blank" rel="noopener noreferrer">sample-controller<ExternalLinkIcon/></a></p>
</li>
</ul>
<blockquote>
<ul>
<li>这是第一篇文章，将探讨sample-controller。</li>
<li><a href="https://medium.com/p/17cbd3f07761" target="_blank" rel="noopener noreferrer">本系列的第二篇文章<ExternalLinkIcon/></a>将探索kubebuilder。</li>
<li><a href="https://medium.com/p/40a029ea056" target="_blank" rel="noopener noreferrer">本系列的第三篇文章<ExternalLinkIcon/></a>将探讨operator-sdk。</li>
</ul>
</blockquote>
</div></template>


