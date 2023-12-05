<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第89节-gitops-实践理论-上部分" tabindex="-1"><a class="header-anchor" href="#第89节-gitops-实践理论-上部分" aria-hidden="true">#</a> 第89节 GitOps 实践理论（上部分）</h1>
<div><a href = '88.md' style='float:left'>⬆️上一节🔗  </a><a href = '90.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<p>今天我们来看看 kubernetes 和 gitops 的理论实践</p>
<h2 id="命令介绍" tabindex="-1"><a class="header-anchor" href="#命令介绍" aria-hidden="true">#</a> 命令介绍</h2>
<p>首先我们来看看 kubectl 支持的子命名，方便我们使用：</p>
<ol>
<li><strong><code v-pre>kubectl apply</code></strong> - 应用一个或多个资源的定义。通常用于部署应用程序或更新资源。</li>
<li><strong><code v-pre>kubectl get</code></strong> - 显示一个或多个资源的信息。这是查看 Kubernetes 集群中资源状态的常用命令。</li>
<li><strong><code v-pre>kubectl describe</code></strong> - 显示一个或多个资源的详细信息，如事件、状态和配置。</li>
<li><strong><code v-pre>kubectl delete</code></strong> - 删除 Kubernetes 集群中的资源。</li>
<li><strong><code v-pre>kubectl exec</code></strong> - 在集群中的容器里执行命令。</li>
<li><strong><code v-pre>kubectl logs</code></strong> - 打印容器的日志。</li>
<li><strong><code v-pre>kubectl create</code></strong> - 从文件或标准输入中创建一个或多个资源。</li>
<li><strong><code v-pre>kubectl edit</code></strong> - 编辑集群中的资源。这将打开一个编辑器来修改资源的配置。</li>
<li><strong><code v-pre>kubectl port-forward</code></strong> - 将本地端口转发到集群中的 Pod。</li>
<li><strong><code v-pre>kubectl run</code></strong> - 在集群中运行一个指定的镜像。</li>
<li><strong><code v-pre>kubectl scale</code></strong> - 调整资源（如 Deployment、ReplicaSet）的副本数量。</li>
<li><strong><code v-pre>kubectl rollout</code></strong> - 管理资源的部署，如查看状态、暂停、恢复或回滚更新。</li>
</ol>
<p><strong>除了上面的命令，Kubernetes 中的 kubectl 还支持注解：</strong></p>
<p><code v-pre>kubectl annotate</code> 命令用于给 Kubernetes 集群中的资源添加或更新注解（annotations）。注解是一种附加信息，可以用于存储非识别性的元数据。它们通常用于管理工具、库和客户端以存储辅助信息，例如描述、版本信息等。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl annotate <span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token punctuation">[</span>name<span class="token punctuation">]</span> <span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token operator">=</span><span class="token punctuation">[</span>value<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="operator" tabindex="-1"><a class="header-anchor" href="#operator" aria-hidden="true">#</a> Operator</h2>
<p>optrator 和 controller 是经常混淆的两个术语，kubernetes operator 是一个应用特定的控制器，它扩展 Kubernetes API 来代表 Kubernetes 的实际用户去创建、配置和管理复杂的有状态应用实例，它在基础的 Kubernetes 资源和控制器概念上去建立的。</p>
<p><strong>所有的 Operator 都使用 Controller 的模式，但并非所有的 Controller 都是 Operator。</strong></p>
<p>首先，<strong>Controller</strong> 是 Kubernetes 中的一个核心概念。它是一个循环，不断监视集群的状态，并在必要时采取行动以将当前状态转变为所需状态。Controller 通过与 Kubernetes API 交互来实现这一点。例如，一个 Deployment Controller 负责确保指定数量的 Pod 副本正在运行。</p>
<p>相比之下，<strong>Operator</strong> 是一种更特定的控制器类型。Kubernetes Operator 是为了管理复杂、有状态的应用程序而设计的。它不仅包含标准的控制器功能，还扩展了 Kubernetes API，以便更好地管理特定应用程序的生命周期。例如，一个数据库 Operator 可以负责部署数据库、备份数据、恢复数据等。</p>
<p>关键区别在于：</p>
<ul>
<li><strong>Controller</strong> 通常是更通用的，负责管理 Kubernetes 中的标准资源，如 Pods、Deployments 等。</li>
<li><strong>Operator</strong> 是一种特殊类型的 Controller，专门用于管理特定的、通常是复杂的应用程序。它们使用自定义资源（Custom Resources）来表示应用程序的状态，并实现特定于该应用程序的业务逻辑。</li>
</ul>
<p>因此，<strong>所有的 Operator 都使用 Controller 的模式，但并非所有的 Controller 都是 Operator</strong>。这是因为所有 Operator 都是构建在控制器模式之上的，但控制器不一定需要具有管理特定应用程序生命周期的复杂逻辑和扩展 API 的能力，这是 Operator 特有的。</p>
<h3 id="实现一个-operator" tabindex="-1"><a class="header-anchor" href="#实现一个-operator" aria-hidden="true">#</a> 实现一个 Operator</h3>
<p>我们了解了 Controller 的基础知识以及 Controller 和 Operator 之间的区别之后，我们准备实现一个 Operator 。示例 Operator 将解决实际环境中的任务：管理一组带有预配置静态资源内容的 Nginx 服务器。改 Operator 支持 用户 指定 Nginx 服务器列表，并且配置安装在每一个服务上的静态文件。</p>
<p>很容易想到的是，ConfigMap 是我们用来做环境变量，命令行参数或者卷轴的配置使用的。</p>
<p>Kubernetes 的控制器是可以使用任何一种语言来实现的，我们用 bash 来简单介绍一下</p>
<p>创建一个完整的 Kubernetes Operator 案例，尤其是涉及到 Nginx 服务器管理的 Operator，可以分为几个主要部分：定义 CRD（Custom Resource Definition），编写 Operator 控制器代码，以及部署和测试 Operator。在这个示例中，我们会使用一种更常用的语言如 Go，因为它提供了更强大的工具和库来与 Kubernetes API 交互。我们将通过以下步骤创建一个简单的 Operator：</p>
<h3 id="定义-crd" tabindex="-1"><a class="header-anchor" href="#定义-crd" aria-hidden="true">#</a> 定义 CRD</h3>
<p>首先，定义一个 CRD 来表示 Nginx 的配置。这个 CRD 将描述 Nginx 实例的属性，如版本、配置文件内容和相关的静态资源。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiextensions.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> CustomResourceDefinition
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginxconfigs.example.com
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> example.com
  <span class="token key atrule">versions</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> v1
      <span class="token key atrule">served</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">scope</span><span class="token punctuation">:</span> Namespaced
  <span class="token key atrule">names</span><span class="token punctuation">:</span>
    <span class="token key atrule">plural</span><span class="token punctuation">:</span> nginxconfigs
    <span class="token key atrule">singular</span><span class="token punctuation">:</span> nginxconfig
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> NginxConfig
    <span class="token key atrule">shortNames</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ngxconf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-编写-operator-控制器" tabindex="-1"><a class="header-anchor" href="#_2-编写-operator-控制器" aria-hidden="true">#</a> 2. 编写 Operator 控制器</h3>
<p>使用 Go 语言编写 Operator 控制器。Operator 控制器将监听 NginxConfig 资源的创建、更新和删除事件，并执行相应的操作。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token comment">// 引入必要的库</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 初始化客户端、监听 NginxConfig 资源的变化</span>
    <span class="token comment">// 实现业务逻辑：创建/更新/删除 Nginx 实例</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-处理-nginx-实例" tabindex="-1"><a class="header-anchor" href="#_3-处理-nginx-实例" aria-hidden="true">#</a> 3. 处理 Nginx 实例</h3>
<p>在控制器中，处理 Nginx 实例的创建和更新。当一个 NginxConfig 资源被创建或更新时，控制器会根据定义的规格来设置 Nginx Pod，包括所需的配置和静态文件。</p>
<h3 id="_4-创建-docker-镜像和部署-operator" tabindex="-1"><a class="header-anchor" href="#_4-创建-docker-镜像和部署-operator" aria-hidden="true">#</a> 4. 创建 Docker 镜像和部署 Operator</h3>
<p>将 Operator 打包成 Docker 镜像，然后在 Kubernetes 集群中部署这个镜像。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 使用合适的基础镜像</span>
FROM golang:1.15

<span class="token comment"># 添加 Operator 代码</span>
ADD <span class="token builtin class-name">.</span> /operator
WORKDIR /operator

<span class="token comment"># 编译 Operator</span>
RUN go build <span class="token parameter variable">-o</span> operator <span class="token builtin class-name">.</span>

<span class="token comment"># 设置启动命令</span>
CMD <span class="token punctuation">[</span><span class="token string">"./operator"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署到 Kubernetes：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>operator
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>operator
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>operator
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> operator
        <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>operator<span class="token punctuation">:</span>latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-测试-operator" tabindex="-1"><a class="header-anchor" href="#_5-测试-operator" aria-hidden="true">#</a> 5. 测试 Operator</h3>
<p>创建一个 NginxConfig 实例来测试 Operator：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> <span class="token string">"example.com/v1"</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> NginxConfig
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>nginx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"latest"</span>
  <span class="token key atrule">staticContent</span><span class="token punctuation">:</span> <span class="token string">"Welcome to Nginx!"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>监视 Kubernetes 集群，确保 Operator 正确响应了这个 NginxConfig 实例的创建。</p>
<h3 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h3>
<ul>
<li><strong>错误处理和资源清理</strong>：确保 Operator 能够优雅地处理错误和资源的生命周期。</li>
<li><strong>权限和安全</strong>：确保 Operator 有适当的权限来管理 Kubernetes 资源，并考虑安全性。</li>
<li><strong>测试和验证</strong>：在生产环境部署前，充分测试 Operator 的行为。</li>
</ul>
<h2 id="简单的-cicd-入门" tabindex="-1"><a class="header-anchor" href="#简单的-cicd-入门" aria-hidden="true">#</a> 简单的 CICD 入门</h2>
<p>接下来，我们首先创建一个 GitOps Operator 来驱动持续交付。</p>
<p>GitOps 是一种用于持续部署的实践，它将 Git 作为真实状态的源。在 GitOps 模型中，所有的部署和环境配置都存储在 Git 仓库中，这样做可以提供版本控制、审计跟踪和回滚能力。为了实现 GitOps，我们可以创建一个 GitOps Operator，它将自动化从 Git 仓库到 Kubernetes 集群的部署过程。</p>
<h3 id="创建-gitops-operator-的步骤" tabindex="-1"><a class="header-anchor" href="#创建-gitops-operator-的步骤" aria-hidden="true">#</a> 创建 GitOps Operator 的步骤</h3>
<ol>
<li><strong>定义 GitOps Operator 的职责</strong>：
<ul>
<li>监听 Git 仓库的变化。</li>
<li>当仓库中的定义（如 Kubernetes 部署文件）发生变化时，自动应用这些变化到 Kubernetes 集群。</li>
<li>确保集群状态与 Git 仓库中定义的状态保持一致。</li>
</ul>
</li>
<li><strong>选择工具和框架</strong>：
<ul>
<li>使用如 Operator SDK 或 Kubebuilder 等工具可以简化 Operator 的创建和管理过程。</li>
<li>对于 Git 交互，可以使用 Git 客户端库，例如 Go-git（对于 Go 语言）。</li>
</ul>
</li>
<li><strong>实现 GitOps Operator</strong>：
<ul>
<li>使用 CRD 定义 GitOps 配置，包括 Git 仓库的 URL、分支、路径等。</li>
<li>编写 Operator 控制器逻辑来处理这些自定义资源，包括从 Git 仓库克隆代码、解析 Kubernetes 配置文件，并将其应用到集群中。</li>
</ul>
</li>
<li><strong>部署和测试 Operator</strong>：
<ul>
<li>将 Operator 容器化，部署到 Kubernetes 集群。</li>
<li>创建 GitOps 配置资源来测试 Operator，确保它能正确地从 Git 仓库拉取和部署配置。</li>
</ul>
</li>
<li><strong>整合持续集成流程</strong>：
<ul>
<li>将 GitOps Operator 集成到 CI 流程中，以自动触发集群的更新。</li>
<li>在代码提交到 Git 仓库后，CI 工具（如 Jenkins、GitLab CI 或 GitHub Actions）可以运行测试，合并代码，触发 Operator 应用更新。</li>
</ul>
</li>
</ol>
<h3 id="实现-gitops-operator" tabindex="-1"><a class="header-anchor" href="#实现-gitops-operator" aria-hidden="true">#</a> 实现 GitOps Operator</h3>
<ol>
<li>
<p><strong>定义 GitOps CRD</strong>：</p>
<ul>
<li>创建一个 Custom Resource Definition（CRD），用于表示 GitOps 配置。这个 CRD 应该包括 Git 仓库的地址、分支、以及路径。</li>
</ul>
<div class="language-yanl ext-yanl line-numbers-mode"><pre v-pre class="language-yanl"><code>apiVersion: apiextensions.k8s.io/v1
kind: CustomResourceDefinition
metadata:
  name: gitopsconfigs.gitops.example.com
spec:
  group: gitops.example.com
  versions:
    - name: v1
      served: true
      storage: true
  scope: Namespaced
  names:
    plural: gitopsconfigs
    singular: gitopsconfig
    kind: GitOpsConfig
    shortNames:
    - goc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>编写 Operator 控制器</strong>：</p>
<ul>
<li>使用 Go、Python 或其他编程语言编写 Operator 控制器。</li>
<li>控制器应当监听 GitOpsConfig 资源的变化，并根据其定义的 Git 仓库信息同步配置。</li>
<li>控制器应当能够从 Git 仓库克隆配置文件，解析 Kubernetes 部署文件，并将其应用到集群中。</li>
</ul>
</li>
<li>
<p><strong>构建和部署 Operator</strong>：</p>
<ul>
<li>创建 Docker 镜像并将 Operator 部署到 Kubernetes 集群。</li>
</ul>
</li>
<li>
<p><strong>测试 Operator</strong>：</p>
<ul>
<li>在 Git 仓库中更新 Nginx 的配置或版本。</li>
<li>观察 Operator 是否自动将更新应用到 Kubernetes 集群。</li>
</ul>
</li>
</ol>
<h3 id="持续集成-ci-集成" tabindex="-1"><a class="header-anchor" href="#持续集成-ci-集成" aria-hidden="true">#</a> 持续集成 (CI) 集成</h3>
<ol>
<li><strong>设置 CI 工具</strong>：
<ul>
<li>选择一个 CI 工具（如 Jenkins、Travis CI、GitHub Actions）。</li>
<li>在 Git 仓库中设置 CI 流程，以在代码提交时运行测试。</li>
</ul>
</li>
<li><strong>自动化触发</strong>：
<ul>
<li>配置 CI 工具在代码变更被合并到主分支后自动通知 Kubernetes 集群，触发 GitOps Operator 应用更新。</li>
</ul>
</li>
</ol>
<h3 id="完整的-gitops-流程" tabindex="-1"><a class="header-anchor" href="#完整的-gitops-流程" aria-hidden="true">#</a> 完整的 GitOps 流程</h3>
<ul>
<li>开发人员提交代码到 Git 仓库。</li>
<li>CI 工具在代码合并到主分支时运行测试。</li>
<li>GitOps Operator 监听到 Git 仓库的变化，自动同步更新到 Kubernetes 集群。</li>
</ul>
<h2 id="环境管理" tabindex="-1"><a class="header-anchor" href="#环境管理" aria-hidden="true">#</a> 环境管理</h2>
<p>不同的运行时环境，以及 Kubernetes 命名空间是如何定义环境边界的。</p>
<p>一个环境是由三个同样重要的部分组成的：</p>
<ul>
<li>代码</li>
<li>满足先决条件的运行时</li>
<li>配置</li>
</ul>
<p><strong>代码：</strong></p>
<p>代码是应用程序执行特定任务的机器指令。要执行代码，可能还需要运行时依赖项。例如，Node.js代码需要Node.js二进制包和其他NPM包才能成功地执行。对于Kubernetes，所有运行时依赖项和代码都打包为一个可部署单元（又名Docker映像），并通过Docker守护进程进行编排。应用程序的Docker映像可以放心地在任何环境中运行，从开发人员的笔记本电脑到在云中运行的生产集群，因为映像封装了代码和所有依赖关系，消除了环境之间潜在的不兼容性。</p>
<p>在软件部署中，环境是部署和执行代码的地方。在软件开发的生存周期中，不同的环境服务于不同的目的。例如，本地开发环境（又名笔记本电脑）是工程师可以创建、测试和调试新代码版本的地方。在工程师完成代码开发后，下一步是将更改提交到Git，并开始部署到不同的环境中进行集成测试和最终的产品发布。这个过程被称为持续集成/持续部署（CI/CD），通常由以下环境组成：</p>
<ul>
<li>QA</li>
<li>E2E</li>
<li>阶段和产品</li>
</ul>
<p>在QA环境中，新代码将根据硬件、数据和其他类似于生产的依赖项进行测试，以确保服务的正确性。如果所有的测试都通过了QA，新的代码将被提升到E2E环境，作为其他预发布服务测试/集成的稳定环境。QA和E2E环境也称为预生产（preprod）环境，因为它们不承载生产流量或使用生产数据。当一个新版本的代码准备好用于生产发布时，代码通常会首先部署在Stage环境中（它可以访问实际的生产依赖），以确保在代码进入Prod环境之前，所有的生产依赖都已到位。例如，新代码可能需要一个新的数据库模式更新，而Stage环境可以用来验证新模式是否正确。配置只将测试流量定向到Stage环境，这样新代码引入的任何问题都不会影响实际客户。但是，Stage环境通常配置为使用“真实的”生产数据库操作。在Stage环境中进行的测试必须经过仔细的审查，以确保它们在生产中是安全的。所有测试在Stage中通过后，新代码将最终部署到Prod中，用于实时生产流量。因为Stage和Prod都可以访问生产数据，所以它们都被认为是生产环境。</p>
<p><strong>命名空间管理</strong></p>
<p>命名空间是Kubernetes中支持环境的自然构造。它们允许在多个团队或项目之间划分群集资源。命名空间为唯一资源命名、资源配额、RBAC、硬件隔离和网络配置提供了范围：</p>
<p><code v-pre>Kubernetes 命名空间~=环境</code></p>
<p>在每个命名空间中，应用程序实例（又名Pod）是一个或多个Docker容器，在部署过程中注入了环境特定的应用程序属性。这些应用程序属性定义了环境应该如何运行（比如feature flag）以及应该使用哪些外部依赖（比如数据库连接字符串）。除了应用程序Pod之外，Namespace还可以包含提供环境所需的附加功能的其他Pod。</p>
<p>Namespace相当于Kubernetes中的环境。命名空间可以由Pods（应用程序实例）、网络策略（入口/出口）和RBAC（访问控制），以及在单独的Pod中运行的应用程序依赖。</p>
<p>RBAC是一种根据企业内各个用户的角色来管理对计算机或网络资源的访问的方法。在Kubernetes中，角色包含表示一组权限的规则。权限纯粹是加性的（没有否定规则）。角色可以使用角色在命名空间中定义，也可以使用Cluster Role在集群范围内定义。命名空间还可以具有专用的硬件和网络策略，以便根据应用程序需求对其配置进行优化。例如，CPU密集型应用程序可以部署在具有专用多核硬件的命名空间中。另一个需要重磁盘的服务我/O可以部署在具有高速SSD的单独命名空间中。每个名称空间还可以定义自己的网络策略（入口/出口），以限制跨名称空间流量或使用非限定DNS名称访问集群中的其他名称空间。</p>
<h3 id="环境模拟" tabindex="-1"><a class="header-anchor" href="#环境模拟" aria-hidden="true">#</a> 环境模拟</h3>
<p>模拟两个环境，分别是 测试环境（qa) 以及非生产 e2e 环境（e2e)</p>
<p>首先，为您的每个来宾簿环境创建guestbook-qa和guestbook-e2e命名空间:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl create namespace guestbook-qa
$ kubectl create namespace guestbook-e2
$ kubectl get namespaces
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，您可以使用以下命令将留言簿应用程序部署到留言簿-qa环境:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">K8S_GUESTBOOK_URL</span><span class="token operator">=</span>https://raw.githubusercontent.com/kubernetes/website/main/content/zh-cn/examples/application/guestbook/redis-leader-deployment.yaml
$ kubectl apply <span class="token parameter variable">-n</span> guestbook-qa <span class="token parameter variable">-f</span> <span class="token variable">${K8S_GUESTBOOK_URL}</span>/redis-master-deployment.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查询 Pod 列表以验证 Redis Pod 是否正在运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get pods <span class="token parameter variable">-n</span> guestbook-qa
NAME                            READY   STATUS    RESTARTS   AGE
redis-leader-5596fc7b68-wxjvp   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          77s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行以下命令查看 Redis Deployment 中的日志：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl logs <span class="token parameter variable">-f</span> deployment/redis-leader <span class="token parameter variable">-n</span> guestbook-qa 
<span class="token number">1</span>:C <span class="token number">26</span> Nov <span class="token number">2023</span> 05:57:07.309 <span class="token comment"># oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo</span>
<span class="token number">1</span>:C <span class="token number">26</span> Nov <span class="token number">2023</span> 05:57:07.309 <span class="token comment"># Redis version=6.0.5, bits=64, commit=00000000, modified=0, pid=1, just started</span>
<span class="token number">1</span>:C <span class="token number">26</span> Nov <span class="token number">2023</span> 05:57:07.309 <span class="token comment"># Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf</span>
<span class="token number">1</span>:M <span class="token number">26</span> Nov <span class="token number">2023</span> 05:57:07.311 * Running <span class="token assign-left variable">mode</span><span class="token operator">=</span>standalone, <span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">6379</span>.
<span class="token number">1</span>:M <span class="token number">26</span> Nov <span class="token number">2023</span> 05:57:07.311 <span class="token comment"># Server initialized</span>
<span class="token number">1</span>:M <span class="token number">26</span> Nov <span class="token number">2023</span> 05:57:07.311 <span class="token comment"># WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.</span>
<span class="token number">1</span>:M <span class="token number">26</span> Nov <span class="token number">2023</span> 05:57:07.311 * Ready to accept connections
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建-redis-领导者服务" tabindex="-1"><a class="header-anchor" href="#创建-redis-领导者服务" aria-hidden="true">#</a> 创建 Redis 领导者服务</h3>
<p>留言板应用需要往 Redis 中写数据。因此，需要创建 <a href="https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/" target="_blank" rel="noopener noreferrer">Service<ExternalLinkIcon/></a> 来转发 Redis Pod 的流量。Service 定义了访问 Pod 的策略。</p>
<p>留言板应用需要往 Redis 中写数据。因此，需要创建 <a href="https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/" target="_blank" rel="noopener noreferrer">Service<ExternalLinkIcon/></a> 来转发 Redis Pod 的流量。Service 定义了访问 Pod 的策略。</p>
<p><a href="https://raw.githubusercontent.com/kubernetes/website/main/content/zh-cn/examples/application/guestbook/redis-leader-service.yaml" target="_blank" rel="noopener noreferrer"><code v-pre>application/guestbook/redis-leader-service.yaml</code><ExternalLinkIcon/></a></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 来源：https://cloud.google.com/kubernetes-engine/docs/tutorials/guestbook</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>leader
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">role</span><span class="token punctuation">:</span> leader
    <span class="token key atrule">tier</span><span class="token punctuation">:</span> backend
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">6379</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">role</span><span class="token punctuation">:</span> leader
    <span class="token key atrule">tier</span><span class="token punctuation">:</span> backend
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p>使用下面的 <code v-pre>redis-leader-service.yaml</code> 文件创建 Redis 的服务：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> ./guestbook/redis-leader-service.yaml  <span class="token parameter variable">-n</span> guestbook-qa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查询服务列表验证 Redis 服务是否正在运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get <span class="token parameter variable">-n</span> guestbook-qa <span class="token function">service</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>响应应该与此类似：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>NAME           TYPE        CLUSTER-IP    EXTERNAL-IP   PORT(S)    AGE
redis-leader   ClusterIP   10.68.10.77   &lt;none>        6379/TCP   3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p><strong>说明：</strong></p>
<p>这个清单文件创建了一个名为 <code v-pre>redis-leader</code> 的 Service， 其中包含一组与前面定义的标签匹配的标签，因此服务将网络流量路由到 Redis Pod 上。</p>
<h3 id="设置-redis-跟随者" tabindex="-1"><a class="header-anchor" href="#设置-redis-跟随者" aria-hidden="true">#</a> 设置 Redis 跟随者</h3>
<p>尽管 Redis 领导者只有一个 Pod，你可以通过添加若干 Redis 跟随者来将其配置为高可用状态， 以满足流量需求。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 来源：https://cloud.google.com/kubernetes-engine/docs/tutorials/guestbook</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>follower
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">role</span><span class="token punctuation">:</span> follower
    <span class="token key atrule">tier</span><span class="token punctuation">:</span> backend
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> redis
        <span class="token key atrule">role</span><span class="token punctuation">:</span> follower
        <span class="token key atrule">tier</span><span class="token punctuation">:</span> backend
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> follower
        <span class="token key atrule">image</span><span class="token punctuation">:</span> gcr.io/google_samples/gb<span class="token punctuation">-</span>redis<span class="token punctuation">-</span>follower<span class="token punctuation">:</span>v2
        <span class="token key atrule">resources</span><span class="token punctuation">:</span>
          <span class="token key atrule">requests</span><span class="token punctuation">:</span>
            <span class="token key atrule">cpu</span><span class="token punctuation">:</span> 100m
            <span class="token key atrule">memory</span><span class="token punctuation">:</span> 100Mi
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">6379</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p>应用下面的 <code v-pre>redis-follower-deployment.yaml</code> 文件创建 Redis Deployment：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> ./guestbook/redis-follower-deployment.yaml <span class="token parameter variable">-n</span> guestbook-qa
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>通过查询 Pods 列表，验证两个 Redis 跟随者副本在运行：</p>
</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get  <span class="token parameter variable">-n</span> guestbook-qa pods
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来同样也是测试 guestbook-qa 的环境是否是符合我们的预期。</p>
<p>然后同样是吧 guestbook-qa 晋级到 guestbook-e2e 环境，</p>
<p>然后同样的测试 guestbook-e2e 环境是否正常工作。</p>
<h3 id="网络隔离" tabindex="-1"><a class="header-anchor" href="#网络隔离" aria-hidden="true">#</a> 网络隔离</h3>
<p>定义部署应用程序的环境的一个关键方面是确保只有目标客户端可以访问特定的环境。默认情况下，所有命名空间都可以连接到在所有其他命名空间中运行的服务。但是对于两个不同的环境，比如QA和Prod，您不希望这些环境之间发生串扰。幸运的是，可以应用命名空间网络策略来限制命名空间之间的网络通信。让我们看看如何将应用程序部署到两个不同的名称空间，并使用网络策略控制访问。我们将介绍在两个不同的命名空间中部署服务的步骤。您还将修改网络策略并观察其效果。</p>
<blockquote>
<p>Egress traffic is network traffic that begins inside a network and pro-EGRESSceeds through its routers to a destination somewhere outside the network.</p>
</blockquote>
<p>出口流量是从网络内部开始，经过路由器到达网络外部某个目的地的网络流量。</p>
<blockquote>
<p>Ingress traffic is composed of all the data communications and net-INGRESSwork traffic originating from external networks.</p>
</blockquote>
<p>入口流量由来自外部网络的所有数据通信和网络-INGRESS工作流量组成。</p>
<blockquote>
<p>Before you begin, verify thatVERIFY KUBERNETES CLUSTER CONNECTIONyou have correctly configured your KUBECONFIG environment variable topoint to the desired Kubernetes cluster. Please refer to appendix A for more information.</p>
</blockquote>
<p>开始之前，请验证您是否已正确配置KUBERNETES CLUSTER CONNECTION环境变量以指向所需的Kubernetes群集。详情请参阅附录A。</p>
<p>并且默认情况下，在一个命名空间中运行的 Pod 可以往不同的命名空间中运行的其他 Pod 发送网络流量，我们下面通过从 qa 命名空间的 Pod 到 prod 命名空间的 Nginx pod 执行一条 url 命令来证明这一点：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl describe pod web <span class="token parameter variable">-n</span> prod <span class="token operator">|</span> <span class="token function">grep</span> IPz
$ kubectl <span class="token parameter variable">-n</span> qa <span class="token builtin class-name">exec</span> curl-pod -- <span class="token function">curl</span> <span class="token parameter variable">-I</span> http://<span class="token operator">&lt;</span>web pod ip<span class="token operator">></span>
$ kubectl <span class="token parameter variable">-n</span> prod <span class="token builtin class-name">exec</span> curl-pod -- <span class="token function">curl</span> <span class="token parameter variable">-I</span> http://<span class="token operator">&lt;</span>web pod ip<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通常，您永远不希望qa和prod环境之间存在相互依赖性。如果应用程序的两个实例都被正确配置，那么qa和prod之间就不会有依赖关系，但是如果qa的配置中有一个bug，它意外地向prod发送了流量，那该怎么办呢？您可能会损坏生产数据。甚至在生产环境中，如果一个环境承载您的营销站点，而另一个环境承载包含敏感数据的HR应用程序，该怎么办？在这些情况下，阻止名称空间之间的网络流量或者只允许特定名称空间之间的流量可能是合适的。这可以通过向名称空间添加网络策略来完成。让我们在每个名称空间中为我们的Pods添加一个网络策略:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> block-other-namespace.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="git-策略" tabindex="-1"><a class="header-anchor" href="#git-策略" aria-hidden="true">#</a> Git 策略</h3>
<p>GitOps 中针对 Git 的三种情况，分别是单分支（多目录），多分支，多代码库与单一代码库</p>
<ol>
<li><strong>单分支（多目录）策略</strong>：这种策略使用单一的Git分支来管理所有的配置文件，但将不同的环境（如开发、测试和生产）的配置放置在不同的目录中。这种方法的优点是简单易管理，因为所有环境的配置都在一个地方。但缺点是可能会因为配置的紧密耦合而导致问题的传播，例如，错误的配置可能会影响到多个环境。</li>
<li><strong>多分支策略</strong>：在这种策略中，为不同的环境（如开发、测试和生产）创建不同的Git分支。这样做的优点是可以更好地隔离不同环境的配置，减少错误配置对其他环境的影响。缺点是需要更多的分支管理工作，并且在分支之间同步更改可能会变得复杂。</li>
<li><strong>多代码库与单一代码库</strong>：这里的区别在于是将所有的配置集中存储在一个代码库中，还是将它们分散在多个代码库中。单一代码库的优点是集中管理和一致性，而多代码库的优点则是提供了更高的灵活性和可维护性，尤其是在大型或复杂的项目中。</li>
</ol>
<p>每种策略都有其优点和缺点，选择哪一种取决于组织的需求、团队的大小、项目的复杂性以及对风险管理的态度。通常，这些策略可能会结合使用，以适应不同的项目和组织结构。</p>
<h3 id="配置管理" tabindex="-1"><a class="header-anchor" href="#配置管理" aria-hidden="true">#</a> 配置管理</h3>
<p>环境的配置管理可以到每一个环境中创建一个目录，其中包含所有的应该部署的资源的 YAML 清单，这些 YAML 清单中所有值都可以硬编码为该环境所需的特定值。</p>
<p>需要进行部署，那么运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl apply <span class="token operator">&lt;</span>directory<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>一个 SaaS 的应用程序开发者将其定制的应用程序部署到一个或者多个环境（dev, test)</p>
<p>这些环境可能分布在不同的账户，集群或者命名空间。它们之间有细微的区别，因此配置重用是最重要的。</p>
<h3 id="helm" tabindex="-1"><a class="header-anchor" href="#helm" aria-hidden="true">#</a> helm</h3>
<p>helm 作为出场的第一个配置工具，是 Kubernetes 生态中不可或缺的一部分。</p>
<p>以下是Helm的主要特点和它在Kubernetes生态中的作用：</p>
<ol>
<li><strong>应用程序包管理</strong>：Helm可以被看作是Kubernetes的包管理器。它允许开发者和运维人员将应用程序及其依赖项打包成一个称为&quot;chart&quot;的单元。这些chart是预配置的Kubernetes资源集合，可以在Kubernetes集群上轻松部署和管理。</li>
<li><strong>简化复杂部署</strong>：Helm使得部署复杂的应用程序变得简单。它可以管理复杂的依赖关系，并确保所有Kubernetes组件以正确的顺序和配置部署。这对于那些需要多个服务和配置的大型应用程序来说尤其重要。</li>
<li><strong>易于版本控制和回滚</strong>：Helm charts易于版本控制，这意味着你可以追踪到每次部署的变化，并在需要时轻松地回滚到旧版本。</li>
<li><strong>共享和重用</strong>：通过Helm仓库，用户可以共享他们的charts，使得重用配置变得简单。这促进了最佳实践的共享和社区协作。</li>
<li><strong>配置灵活性</strong>：Helm允许用户自定义chart的配置，以适应不同的环境和需求。这种灵活性是通过使用模板和配置文件实现的，这些文件可以在部署时修改。</li>
<li><strong>集成和扩展性</strong>：Helm可以与其他Kubernetes工具和插件无缝集成，增加了它的扩展性。这使得它可以适应各种不同的部署需求和环境。</li>
</ol>
<h3 id="jsonnet" tabindex="-1"><a class="header-anchor" href="#jsonnet" aria-hidden="true">#</a> Jsonnet</h3>
<p>Jsonnet，作为一种编程语言，主要被设计来增强和简化JSON数据的声明和处理。虽然它并非专门为Kubernetes设计，但在Kubernetes社区中确实获得了广泛的应用和普及。以下是Jsonnet的关键特性和它在数据处理中的作用：</p>
<ol>
<li><strong>增强的JSON</strong>：Jsonnet可以被看作是JSON的一个超集，它在JSON的基础上添加了变量、条件表达式、函数、算术运算和其他编程语言的特性。这些扩展使得Jsonnet非常适合处理复杂的数据描述和配置文件。</li>
<li><strong>模板和抽象</strong>：Jsonnet支持高级别的抽象和模板化，这对于管理大量的、结构相似的数据特别有用。用户可以定义通用的模式和结构，然后在不同的上下文中重复使用它们，减少重复和错误。</li>
<li><strong>灵活性和可维护性</strong>：通过提供变量和函数，Jsonnet使得数据文件的维护变得更加灵活和易于管理。这对于需要频繁更新或修改的配置尤其重要。</li>
<li><strong>清晰的逻辑结构</strong>：Jsonnet的编程语言特性允许用户以更清晰、逻辑化的方式编写和理解复杂的数据结构，这对于复杂的配置管理来说是一个巨大的优势。</li>
<li><strong>在Kubernetes中的应用</strong>：虽然Jsonnet并非专门为Kubernetes设计，但它在管理Kubernetes的配置文件方面显示出了巨大的潜力。它可以生成复杂的Kubernetes资源定义，如部署、服务和pod配置，并支持高级的配置模式。</li>
<li><strong>社区支持和工具集成</strong>：由于Jsonnet在Kubernetes社区中的流行，许多工具和库已经开发出来支持Jsonnet文件的生成和管理。这进一步增强了它在现代云原生架构中的应用。</li>
</ol>
<h2 id="流水线" tabindex="-1"><a class="header-anchor" href="#流水线" aria-hidden="true">#</a> 流水线</h2>
<p>CICD 流水线中的阶段</p>
<p>持续集成 （CI）是一种软件开发的实践，在这种实践中，所有的开发人员都会在一个中央仓库（GIT）中合并变更，通过 CI ，每一次代码变更（提交）都会触发给定仓库的自动构建和测试阶段，并向做出变更的开发者提供反馈。与传统的 CI 相比，GitOps 的主要区别在于，在构建和测试阶段成功完成后，CI 流水线还会在应用程序清单中更新新的镜像版本。</p>
<p>持续交付（CD） 是将整个软件发布过程自动化。</p>
<p>与传统的 CICD 不同，使用 GitOps Operator 来监控清单的变化并协调部署，只要 CI 构建完成，并且清单更新，GitOps Operator 就会</p>
<h3 id="持续集成" tabindex="-1"><a class="header-anchor" href="#持续集成" aria-hidden="true">#</a> 持续集成</h3>
<p><strong>步骤如下：</strong></p>
<p>流程将从“拉取请求”开始，经过多个阶段，如“代码审核”、“漏洞扫描”、“代码分析”、“构建”、“单元测试”、“代码覆盖”、“Docker构建”、“Docker推送”、“Git克隆配置仓库”、“更新配置清单”、“Git提交和推送”、“发布CI指标”，最后到达“构建通知”。</p>
<p><img src="http://sm.nsddd.top/sm202311261925321.webp" alt="544991a1-6499-4de0-acef-bb43af85fdb3"></p>
<p>集成 Go 语言和其他的一些工具：</p>
<ol>
<li><strong>GitHub Actions 集成</strong>：在流程图中的各个阶段，如“代码审核”、“漏洞扫描”、“代码分析”等，可以通过 GitHub Actions 自动化执行。这意味着每个步骤可以被配置为 GitHub Actions 的一个工作流，从而实现自动化和流程控制。</li>
<li><strong>Go 语言相关工具</strong>：
<ul>
<li><strong>代码审核</strong>：集成如 <code v-pre>golint</code> 或 <code v-pre>gometalinter</code> 的 Go 语言代码审查工具。</li>
<li><strong>漏洞扫描</strong>：使用针对 Go 语言的漏洞扫描工具，如 <code v-pre>gosec</code>。</li>
<li><strong>代码分析</strong>：应用如 <code v-pre>staticcheck</code> 的静态分析工具。</li>
<li><strong>单元测试</strong>：利用 Go 自带的测试框架和 <code v-pre>go test</code> 命令。</li>
<li><strong>代码覆盖</strong>：使用 Go 的 <code v-pre>cover</code> 工具来检查测试覆盖率。</li>
</ul>
</li>
<li><strong>Docker 与 Go</strong>：在 Docker 构建阶段，可以使用针对 Go 应用的 Dockerfile，确保应用被正确打包。</li>
<li><strong>配置管理</strong>：对于“Git 克隆配置仓库”和“更新配置清单”阶段，可以考虑使用如 <code v-pre>Viper</code> 或 <code v-pre>Consul</code> 等 Go 语言配置管理工具，以便更好地管理和维护配置。</li>
</ol>
<p><img src="http://sm.nsddd.top/sm202311261938086.png" alt="chatp"></p>
<h3 id="持续交付" tabindex="-1"><a class="header-anchor" href="#持续交付" aria-hidden="true">#</a> 持续交付</h3>
<p>持续集成后，就进入到持续交付的环节了，</p>
<p>建立在 GitOps CICD 基础上的完整的 CD 流水线</p>
<ol>
<li><strong>Git 克隆配置仓库</strong>：这一步骤保持不变，作为配置管理的一部分。</li>
<li><strong>发现清单</strong>：这可能涉及自动化脚本或工具，用于检测和整理应用的配置项和依赖。</li>
<li><strong>kubectl apply</strong>：在 Kubernetes 环境中应用配置更改或部署新的服务。</li>
<li><strong>功能测试</strong>：执行自动化的功能测试，以验证应用的功能和性能。</li>
<li><strong>运行时漏洞扫描</strong>：使用适合 Kubernetes 环境的工具来检测运行时的安全漏洞。</li>
<li><strong>发布 CD 指标</strong>：收集和发布部署相关的指标，可能通过集成的监控工具或定制脚本实现。</li>
</ol>
<p><img src="http://sm.nsddd.top/sm202311261945127.webp" alt="50629a41-bded-4f36-abfe-b3dfadd7c9d3"></p>
<h3 id="推动晋级工作" tabindex="-1"><a class="header-anchor" href="#推动晋级工作" aria-hidden="true">#</a> 推动晋级工作</h3>
<p>我们知道，Kubernetes 清单和代码一般不放在同一个仓库，这样可以获取到更灵活的部署选择，更好的访问控制和审计能力。那么我们应该在哪里维护特定的环境依赖的应用配置，如数据库链接和分布式缓存。</p>
<ol>
<li><strong>单独的配置仓库</strong>：创建一个独立的仓库来存储环境特定的配置文件。这种方法可以提供清晰的分离，确保代码和配置的独立管理，同时便于追踪和审计。</li>
<li><strong>配置管理工具</strong>：使用配置管理工具，如 Helm、Kustomize 或 Terraform，来管理和应用不同环境的配置。这些工具可以帮助你根据环境差异（如开发、测试、生产）调整配置。</li>
<li><strong>秘密管理</strong>：对于敏感信息（如数据库密码和访问密钥），使用 Kubernetes 的秘密（Secrets）管理功能来存储。这些秘密可以在部署时动态挂载到容器中。</li>
<li><strong>配置映射（ConfigMaps）</strong>：对于非敏感的配置信息，如数据库链接和应用参数，可以使用 Kubernetes 的 ConfigMap 来存储。ConfigMap 可以在容器启动时作为环境变量或挂载的卷提供给应用程序。</li>
<li><strong>环境变量</strong>：在某些情况下，直接在 Kubernetes 的部署配置中使用环境变量来传递配置信息是有用的。这种方法适用于不需要频繁更改的简单配置。</li>
<li><strong>GitOps 实践</strong>：采用 GitOps 的方式来管理 Kubernetes 配置。在这种模式下，所有配置更改都通过 Git 仓库来进行，通过自动化流程应用到 Kubernetes 环境中。这有助于确保配置的一致性和可追溯性。</li>
</ol>
<p>在 GitOps 实践中，<code v-pre>git reset</code> 和 <code v-pre>git revert</code> 是两个重要的 Git 命令，它们用于处理配置变更和维护历史记录。理解这两个命令的差异和适用场景对于有效地管理 Kubernetes 配置至关重要。</p>
<ol>
<li><strong>git reset</strong>：
<ul>
<li><code v-pre>git reset</code> 命令用于撤销某些提交，它可以将 HEAD 指针移动到指定的提交。</li>
<li>在 GitOps 中，如果你需要撤销一系列最近的提交，并将仓库状态回滚到以前的某个特定提交，可以使用 <code v-pre>git reset</code>。</li>
<li>需要注意的是，<code v-pre>git reset</code> 会更改历史记录，这在共享仓库中可能会导致问题。其他开发者需要用 <code v-pre>git pull --force</code> 来同步更改，这可能导致混乱。</li>
</ul>
</li>
<li><strong>git revert</strong>：
<ul>
<li><code v-pre>git revert</code> 命令用于撤销某个特定的提交，但它不会改变历史记录。相反，它会创建一个新的提交，这个新提交的状态与要撤销的提交相反。</li>
<li>在 GitOps 中，如果需要撤销一个特定的更改，同时保留后续的更改，并且不想修改历史记录，<code v-pre>git revert</code> 是一个更好的选择。</li>
<li><code v-pre>git revert</code> 更适合公共仓库或团队环境，因为它不会影响其他开发者的历史记录。</li>
</ul>
</li>
</ol>
<blockquote>
<p>我的个人开发经验总结出来的是，个人不使用 <code v-pre>revert</code>，而是使用 <code v-pre>reset</code> 在本地，前提是自己对自己提交的树状图很清晰，不过生产中还是使用 <code v-pre>revert</code>，这是一个非常保险和安装的做法。</p>
</blockquote>
<p>这和 git rebase 和 git merge 的理解一样的。</p>
<p><strong>merge 和 rebase</strong>
merge 是合并的意思，rebase是复位基底的意思。
现在我们有这样的两个分支,test和master，提交如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>     D---E test
    /
A---B---C---F master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在master执行<code v-pre>git merge test</code>然后会得到如下结果：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>     D--------E
    /          \
A---B---C---F---G    test , master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在master执行<code v-pre>git rebase test</code>,然后得到如下结果：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> A---C---D---E---C `---F` test , master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以看到merge操作会生成一个新的节点，之前提交分开显示。而rebase操作不会生成新的节点，是将两个分支融合成一个线性的操作。</p>
<h2 id="部署策略" tabindex="-1"><a class="header-anchor" href="#部署策略" aria-hidden="true">#</a> 部署策略</h2>
<p>在 Kubernetes 中，你可以只用带有 PodSpec 的清单来部署一个 Pod，并且保证其可用性。在这种情况下，你可以自定义 ReplocaSet 清单，以保持在任何特定时间运行一组稳定的 Pod 副本集合。ReplicaSet 是通过指定用于识别 Pod 的选择器。</p>
<p>ReplicaSet 不是声明式的，因此不适合 GitOps</p>
<p>我没知道 Deployment 是一个更高层的抽象，虽然可以使用带有 <code v-pre>PodSpec</code> 的清单直接部署单个 Pod，但这种方式通常不适用于保证 Pod 的可用性和可管理性。</p>
<h3 id="replicaset" tabindex="-1"><a class="header-anchor" href="#replicaset" aria-hidden="true">#</a> ReplicaSet</h3>
<ul>
<li><strong>作用</strong>：<code v-pre>ReplicaSet</code> 的主要目的是确保在任何时候都有指定数量的 Pod 副本正在运行。</li>
<li><strong>选择器</strong>：它通过使用标签选择器来识别要管理的 Pod。这些标签在 Pod 的定义中指定。</li>
<li><strong>缺点</strong>：尽管 <code v-pre>ReplicaSet</code> 可以确保指定数量的 Pod 实例始终运行，但它本身并不支持滚动更新。如果你需要更新 Pod 的定义（例如，更新使用的容器镜像），就需要手动更新 <code v-pre>ReplicaSet</code>，或者删除并重新创建它。</li>
</ul>
<h3 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> Deployment</h3>
<ul>
<li><strong>更高级的抽象</strong>：<code v-pre>Deployment</code> 是一个更高级别的抽象，它在 <code v-pre>ReplicaSet</code> 的基础上提供了更多功能。它不仅确保 Pod 数量，还支持声明式地更新 Pod 和 <code v-pre>ReplicaSet</code>。</li>
<li><strong>滚动更新</strong>：<code v-pre>Deployment</code> 支持滚动更新，允许你逐渐替换旧版本的 Pod 为新版本，而不会导致停机。</li>
<li><strong>适用于 GitOps</strong>：由于其声明式的特性，<code v-pre>Deployment</code> 非常适合 GitOps 的工作流。你可以在 Git 仓库中声明应用的期望状态，然后使用自动化工具（如 Argocd 或 Flux）来监视仓库并将更改应用到 Kubernetes 集群。</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202311262010756.png" alt="gitops-deployment-replicaset"></p>
<h3 id="流量路由-traffic-routing" tabindex="-1"><a class="header-anchor" href="#流量路由-traffic-routing" aria-hidden="true">#</a> 流量路由 Traffic Routing</h3>
<p>在Kubernetes中，Service 是一种抽象，它定义了一组逻辑的Pods和访问它们的策略。服务所针对的豆 Pod targeted由以下选择器确定</p>
<p>Service minifest 中的字段。然后，服务将流量转发到带有选择器指定的匹配标签的Pods。如果底层的Pods是无状态和向后兼容的，那么Service可以进行循环负载平衡，并且非常适合滚动更新。如果需要为部署定制负载平衡，则需要探索其他路由替代方案。</p>
<p>当Service收到流量时，它会根据定义的选择器将流量转发到拥有相应匹配标签的Pods。例如，如果Service的选择器被设置为匹配标签“color: blue”，那么所有带有此标签的Pods将接收到由该Service转发的流量。这种方法使得流量管理既灵活又高效。</p>
<h4 id="无状态pods和负载平衡" tabindex="-1"><a class="header-anchor" href="#无状态pods和负载平衡" aria-hidden="true">#</a> 无状态Pods和负载平衡</h4>
<p>如果底层的Pods是无状态的（Stateless）并且保持向后兼容性，那么Service可以实现有效的循环负载平衡。这对于实施滚动更新尤为重要，因为它允许在不中断服务的情况下逐步替换旧的Pods。</p>
<h4 id="定制负载平衡与路由策略" tabindex="-1"><a class="header-anchor" href="#定制负载平衡与路由策略" aria-hidden="true">#</a> 定制负载平衡与路由策略</h4>
<p>对于需要更复杂路由逻辑或定制负载平衡的部署，可能需要探索Kubernetes提供的其他路由替代方案。例如，使用Ingress Controllers和Ingress Resources可以提供更高级的路由能力，比如基于URL的路由、SSL/TLS终端加密和负载均衡策略。</p>
<h4 id="标签驱动的路由" tabindex="-1"><a class="header-anchor" href="#标签驱动的路由" aria-hidden="true">#</a> 标签驱动的路由</h4>
<p>Kubernetes中的服务路由是完全基于标签的。这意味着，例如，一个标记为“blue”的Service只会将流量路由到带有“blue”标签的Pods，而一个标记为“green”的Service则只路由到带有“green”标签的Pods。这种设计允许简单而直观的流量分配和管理。</p>
<p><img src="http://sm.nsddd.top/sm202311262110507.png" alt="ingree-istio"></p>
<h4 id="nginx-ingress-controller" tabindex="-1"><a class="header-anchor" href="#nginx-ingress-controller" aria-hidden="true">#</a> NGINX Ingress Controller</h4>
<p>NGINX Ingress Controller是一个功能强大的工具，用于在Kubernetes环境中管理进入集群的流量。它支持多种负载平衡和路由规则，适用于广泛的用例。关键特点包括：</p>
<ul>
<li><strong>前端负载均衡器</strong>：它可以配置为前端负载均衡器，负责处理进入集群的所有流量。</li>
<li><strong>自定义路由</strong>：支持各种自定义路由功能，如TLS终端加密、URL重写，以及基于自定义规则的流量路由。</li>
<li><strong>流量分配</strong>：可以配置规则来分配流量，例如将40%的流量路由到带有特定标签（如“blue”）的服务，而60%路由到另一个标签（如“green”）的服务。</li>
</ul>
<p>通过这些功能，NGINX Ingress Controller能够有效地管理和优化进入Kubernetes集群的流量。</p>
<h4 id="istio-gateway" tabindex="-1"><a class="header-anchor" href="#istio-gateway" aria-hidden="true">#</a> Istio Gateway</h4>
<p>Istio Gateway是另一个关键组件，用于在Kubernetes集群的边缘管理流量。它主要负责处理进入和离开集群的HTTP和TCP连接。Istio Gateway的主要特点包括：</p>
<ul>
<li><strong>边缘负载平衡器</strong>：作为集群边缘的负载平衡器，它处理所有进入和离开集群的流量。</li>
<li><strong>端口和协议规范</strong>：Istio Gateway允许定义一组要公开的端口，以及相关的协议类型，确保流量按照既定的规则和协议流动。</li>
<li><strong>集成与Istio服务网格</strong>：作为Istio生态系统的一部分，它与Istio的服务网格功能紧密集成，提供高级的流量管理和安全性功能。</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202311262115919.png" alt="istio-ingress"></p>
<blockquote>
<p>说明通过Kubernetes中的Ingress控制器的流量流和Istio服务网格中的流量流的图表已经准备好了。这些图表清晰地比较了每个系统在Kubernetes环境中如何处理流量路由和管理，包括入口控制器和Istio网关的角色。</p>
</blockquote>
<h3 id="argo-rollouts" tabindex="-1"><a class="header-anchor" href="#argo-rollouts" aria-hidden="true">#</a> Argo Rollouts</h3>
<h4 id="什么是argo-rollouts" tabindex="-1"><a class="header-anchor" href="#什么是argo-rollouts" aria-hidden="true">#</a> 什么是Argo Rollouts？</h4>
<p>Argo Rollouts 是一个Kubernetes控制器，用于更复杂、更强大的部署策略，如蓝绿部署（Blue-Green Deployments）和金丝雀部署（Canary Deployments）。它通过扩展Kubernetes自身的部署能力，使得在不中断服务的情况下更新和管理应用程序变得更加容易。</p>
<h4 id="安装-使用-argo-rollouts" tabindex="-1"><a class="header-anchor" href="#安装-使用-argo-rollouts" aria-hidden="true">#</a> 安装 &amp; 使用 Argo Rollouts</h4>
<ol>
<li>
<p><strong>先决条件</strong>：</p>
<ul>
<li>确保您有一个运行中的 Kubernetes 集群。</li>
<li>您需要有足够的权限来部署新的 Kubernetes 资源。</li>
</ul>
</li>
<li>
<p><strong>安装命令</strong>：</p>
<ul>
<li>
<p>Argo Rollouts 可以通过其 Helm 图表或使用 kubectl 直接从其 GitHub 仓库安装。</p>
</li>
<li>
<p>使用 Helm 安装（如果您使用 Helm）:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> argo https://argoproj.github.io/argo-helm
helm <span class="token function">install</span> argo-rollouts argo/argo-rollouts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>或者，使用 kubectl 从其 GitHub 仓库安装：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create namespace argo-rollouts
kubectl apply <span class="token parameter variable">-n</span> argo-rollouts <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/argoproj/argo-rollouts/stable/manifests/install.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ol>
<h3 id="定义-rollout-资源" tabindex="-1"><a class="header-anchor" href="#定义-rollout-资源" aria-hidden="true">#</a> 定义 Rollout 资源</h3>
<ol>
<li>
<p><strong>创建 Rollout 资源定义</strong>：</p>
<ul>
<li>Rollout 资源类似于 Kubernetes 的 Deployment 资源，但它包含额外的字段来指定部署策略（例如金丝雀或蓝绿部署）。</li>
<li>创建一个 YAML 文件，定义您的 Rollout，包括镜像、副本数、更新策略等。</li>
</ul>
</li>
<li>
<p><strong>示例 Rollout 定义</strong>：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> argoproj.io/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Rollout
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>rollout
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> example
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> example
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> app
        <span class="token key atrule">image</span><span class="token punctuation">:</span> your<span class="token punctuation">-</span>image<span class="token punctuation">:</span>latest
        <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">canary</span><span class="token punctuation">:</span> 
      <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">setWeight</span><span class="token punctuation">:</span> <span class="token number">20</span>
      <span class="token punctuation">-</span> <span class="token key atrule">pause</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token key atrule">duration</span><span class="token punctuation">:</span> 1h<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="触发和管理部署" tabindex="-1"><a class="header-anchor" href="#触发和管理部署" aria-hidden="true">#</a> 触发和管理部署</h3>
<ol>
<li>
<p><strong>应用 Rollout 资源</strong>：</p>
<ul>
<li>
<p>使用 kubectl 应用您的 Rollout 定义：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> your-rollout-definition.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><strong>监控 Rollout 状态</strong>：</p>
<ul>
<li>
<p>使用 kubectl 检查 Rollout 状态：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl argo rollouts get rollout example-rollout <span class="token parameter variable">--watch</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><strong>管理 Rollout</strong>：</p>
<ul>
<li>可以通过更新 Rollout 资源的定义（例如，更改镜像标签）来触发新的部署。</li>
<li>使用 Argo Rollouts 的 CLI 工具，您可以管理 Rollout 的暂停、恢复和中止等操作。</li>
</ul>
</li>
</ol>
<h4 id="argo-rollouts的核心功能" tabindex="-1"><a class="header-anchor" href="#argo-rollouts的核心功能" aria-hidden="true">#</a> Argo Rollouts的核心功能</h4>
<ul>
<li><strong>高级部署策略</strong>：支持蓝绿部署和金丝雀部署等。</li>
<li><strong>自动化回滚</strong>：如果新版本出现问题，它能自动回滚到上一个稳定版本。</li>
<li><strong>权重式流量分配</strong>：可以控制新版本和旧版本之间的流量分配比例。</li>
<li><strong>集成度高</strong>：与Istio、NGINX Ingress等服务网格和Ingress控制器紧密集成。</li>
</ul>
<ol>
<li><strong>蓝绿部署</strong>：
<ul>
<li>首先，您部署了新版本（绿色版本）而不会影响到当前运行的旧版本（蓝色版本）。</li>
<li>一旦绿色版本就绪并且经过了测试验证其稳定性，流量将从蓝色版本平滑转移到绿色版本。</li>
<li>如果绿色版本运行良好，则完成部署；如果有问题，则可以立即切换回蓝色版本。</li>
</ul>
</li>
<li><strong>金丝雀部署</strong>：
<ul>
<li>在这种策略中，您会逐渐向新版本（金丝雀版本）引入一小部分用户流量。</li>
<li>初始阶段，只有少量的流量被路由到新版本，同时监控其性能和稳定性。</li>
<li>如果新版本表现良好，您可以逐渐增加流量比例，直到全部流量都转移到新版本。</li>
<li>如果新版本出现问题，可以立即停止流量的转移，并将其路由回旧版本。</li>
</ul>
</li>
</ol>
<h3 id="蓝绿发布" tabindex="-1"><a class="header-anchor" href="#蓝绿发布" aria-hidden="true">#</a> 蓝绿发布</h3>
<p>我们已经知道，支持声明式的 Deployment 的滚动更新是更新应用的绝佳方式，因为你的应用在部署期间将使用大致相同数量的资源，且停机时间为零，对性能的影响最小。然而，由于向后不兼容性或有状态性，有许多遗留应用程序不能很好地与滚动更新一起工作。有些应用程序可能还需要部署新版本并立即切换到该版本，或者在出现问题时快速回滚。对于这些用例，蓝绿色部署将是适当的部署策略。蓝绿部署通过让两个部署同时完全扩展，但只将传入流量定向到两个部署中的一个来实现这些。</p>
<blockquote>
<p>这里我们使用 Nginx Ingress 控制器将 100% 的流量路由到 blue 或者 green deployment，因为内置的 kubernetes service 只支持 iptables，并不重置与 pod 的现有链接，因此不适合蓝绿发布。</p>
</blockquote>
<p>在 Kubernetes 环境中，虽然声明式的 Deployment 通过滚动更新（Rolling Update）提供了零停机时间和最小化对性能的影响，但确实存在某些情况和应用程序类型，其中这种方法可能不是最佳选择。特别是对于那些有状态性（Stateful）应用或因向后不兼容性而难以进行滚动更新的遗留应用程序，蓝绿部署（Blue-Green Deployment）可能更适合。</p>
<h3 id="iptable" tabindex="-1"><a class="header-anchor" href="#iptable" aria-hidden="true">#</a> Iptable</h3>
<p>Iptables 是 Linux 上一种强大的防火墙工具，用于控制进出 Linux 系统的网络流量。它是基于 Netfilter 提供的网络包过滤框架，允许系统管理员配置规则集，以过滤流量并提供 NAT 功能。</p>
<h4 id="主要特点和功能" tabindex="-1"><a class="header-anchor" href="#主要特点和功能" aria-hidden="true">#</a> 主要特点和功能</h4>
<ol>
<li><strong>包过滤</strong>：
<ul>
<li>Iptables 可以过滤进出系统的数据包，包括源地址、目的地址、传输协议等。</li>
<li>它可以接受、拒绝或丢弃数据包，根据定义的规则对网络流量进行精确控制。</li>
</ul>
</li>
<li><strong>链和表</strong>：
<ul>
<li>Iptables 使用链（Chains）和表（Tables）来组织规则。</li>
<li>常见的链有 INPUT、OUTPUT 和 FORWARD，分别控制进入系统、离开系统和穿过系统的流量。</li>
<li>表如 <code v-pre>filter</code>、<code v-pre>nat</code> 和 <code v-pre>mangle</code> 表用于不同类型的流量处理。</li>
</ul>
</li>
<li><strong>NAT（网络地址转换）</strong>：
<ul>
<li><code v-pre>Iptables</code> 支持 NAT 功能，包括源地址转换（SNAT）和目的地址转换（DNAT）。</li>
<li>这对于路由和转发流量至内部网络中的私有地址非常重要。</li>
</ul>
</li>
<li><strong>状态跟踪</strong>：
<ul>
<li>Iptables 能够跟踪网络连接的状态，如新建、已建立、相关联和无效连接。</li>
<li>这允许基于连接状态应用规则，提高过滤的灵活性和效果。</li>
</ul>
</li>
</ol>
<h4 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h4>
<ol>
<li><strong>安全防护</strong>：
<ul>
<li>在服务器和网络设备上实施防火墙规则，防止未授权访问和攻击。</li>
</ul>
</li>
<li><strong>流量管理</strong>：
<ul>
<li>管理和限制特定类型的流量，优化网络使用。</li>
</ul>
</li>
<li><strong>网络调试</strong>：
<ul>
<li>跟踪和监控网络流量，帮助诊断网络问题。</li>
</ul>
</li>
</ol>
<h4 id="使用示例" tabindex="-1"><a class="header-anchor" href="#使用示例" aria-hidden="true">#</a> 使用示例</h4>
<ul>
<li>
<p>阻止来自特定 IP 地址的流量：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-s</span> <span class="token number">123.456</span>.789.0 <span class="token parameter variable">-j</span> DROP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>允许特定端口的流量：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>iptables <span class="token parameter variable">-A</span> INPUT <span class="token parameter variable">-p</span> tcp <span class="token parameter variable">--dport</span> <span class="token number">22</span> <span class="token parameter variable">-j</span> ACCEPT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p>Iptables 的灵活性和强大功能使其成为 Linux 系统中管理网络流量和实施安全策略的关键工具。然而，由于其复杂性，建议在生产环境中谨慎使用，并且在应用任何规则之前进行充分的测试。</p>
<h3 id="蓝绿部署的工作原理" tabindex="-1"><a class="header-anchor" href="#蓝绿部署的工作原理" aria-hidden="true">#</a> 蓝绿部署的工作原理</h3>
<p>蓝绿部署的核心思想是同时维护两个生产环境（或部署）的完全不同版本：一个蓝色（Blue）版本和一个绿色（Green）版本。</p>
<ul>
<li><strong>蓝色部署</strong>：当前运行的旧版本。</li>
<li><strong>绿色部署</strong>：新版本，与蓝色部署相同但包含更新。</li>
</ul>
<p>这两个部署都会完全扩展，但在任何时刻，只有一个部署（蓝色或绿色）会接收到所有传入流量。</p>
<h3 id="使用-nginx-ingress-控制器实现蓝绿部署" tabindex="-1"><a class="header-anchor" href="#使用-nginx-ingress-控制器实现蓝绿部署" aria-hidden="true">#</a> 使用 Nginx Ingress 控制器实现蓝绿部署</h3>
<ol>
<li>
<p><strong>流量路由</strong>：</p>
<ul>
<li>
<p>在蓝绿部署中，Nginx Ingress 控制器可以用于将100%的流量路由到蓝色或绿色部署。或者是将部分的流量路由到蓝色部署，部分的流量路由到绿色部署。</p>
<blockquote>
<p>哈哈哈但是这样貌似就不是蓝绿部署了，有点像是金丝雀部署：</p>
<p>如果您的需求是同时向蓝色和绿色部署分配流量，那么您可能需要考虑使用金丝雀部署（Canary Deployment）。在金丝雀部署中，新版本（金丝雀）最初只接收一小部分流量，而主要流量仍然路由到旧版本。根据新版本的性能和稳定性，逐渐增加流向新版本的流量比例。</p>
</blockquote>
</li>
<li>
<p>这是通过更新 Ingress 资源来实现的，该资源决定了哪个服务（蓝色还是绿色）将接收流量。</p>
</li>
</ul>
</li>
<li>
<p><strong>Kubernetes Service 的局限性</strong>：</p>
<ul>
<li>Kubernetes Service 基于 iptables 实现，不会重置与Pod的现有连接。</li>
<li>这意味着在进行版本切换时，一些现有的连接可能仍然指向旧版本的Pod，这对于需要立即切换和快速回滚的应用不是最佳选择。</li>
<li>因此，对于蓝绿部署，使用像 Nginx 这样的 Ingress 控制器可以更好地管理流量切换，因为它能更精确地控制流量的路由。</li>
</ul>
</li>
</ol>
<h3 id="使用-deployment-实现蓝绿部署" tabindex="-1"><a class="header-anchor" href="#使用-deployment-实现蓝绿部署" aria-hidden="true">#</a> 使用 Deployment 实现蓝绿部署</h3>
<p><img src="http://sm.nsddd.top/sm202311270932090.png" alt="deployment-blue-green"></p>
<blockquote>
<p>The diagram illustrating the concept of Blue-Green Deployment in a Kubernetes environment using NGINX Ingress and Deployments is ready. It visually explains how traffic is directed to either the Blue or Green Deployments, showcasing the clear separation and traffic management between these two deployments.</p>
</blockquote>
<p>要使用 Ingress 实现 Kubernetes 中的蓝绿部署，您需要准备两套完全一样但不同版本的应用部署（Deployment），一个 Ingress 控制器（例如 NGINX），以及一个 Ingress 资源来控制流量的路由。以下是实现这一策略的步骤和示例代码。</p>
<h3 id="设计方案" tabindex="-1"><a class="header-anchor" href="#设计方案" aria-hidden="true">#</a> 设计方案</h3>
<ol>
<li><strong>准备两个 Deployment</strong>：
<ul>
<li>一个“蓝色”Deployment，运行当前版本的应用。</li>
<li>一个“绿色”Deployment，运行新版本的应用。</li>
</ul>
</li>
<li><strong>配置 Service</strong>：
<ul>
<li>为每个 Deployment 创建一个 Service。这些 Service 将作为流量的入口点。</li>
</ul>
</li>
<li><strong>设置 Ingress 控制器</strong>：
<ul>
<li>确保您的 Kubernetes 集群中已安装并运行了 Ingress 控制器，例如 NGINX。</li>
</ul>
</li>
<li><strong>编写 Ingress 资源</strong>：
<ul>
<li>创建一个 Ingress 资源来定义流量路由规则。开始时，将所有流量路由到蓝色 Deployment。</li>
<li>当准备将流量切换到绿色 Deployment 时，更新 Ingress 资源。</li>
</ul>
</li>
<li><strong>监控和切换</strong>：
<ul>
<li>在切换流量之前，确保绿色 Deployment 完全就绪且测试无误。</li>
<li>通过更新 Ingress 规则，将流量从蓝色切换到绿色 Deployment。</li>
<li>如果新版本运行正常，继续将流量路由到绿色 Deployment；如果有问题，可以快速切回蓝色 Deployment。</li>
</ul>
</li>
</ol>
<p><strong>示例代码：</strong></p>
<p><strong>蓝色 Deployment</strong> (<code v-pre>blue-deployment.yaml</code>):</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> blue<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
      <span class="token key atrule">version</span><span class="token punctuation">:</span> blue
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
        <span class="token key atrule">version</span><span class="token punctuation">:</span> blue
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp
        <span class="token key atrule">image</span><span class="token punctuation">:</span> myapp<span class="token punctuation">:</span>blue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>绿色 Deployment</strong> (<code v-pre>green-deployment.yaml</code>):</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> green<span class="token punctuation">-</span>deployment
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
      <span class="token key atrule">version</span><span class="token punctuation">:</span> green
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
        <span class="token key atrule">version</span><span class="token punctuation">:</span> green
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp
        <span class="token key atrule">image</span><span class="token punctuation">:</span> myapp<span class="token punctuation">:</span>green

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结合argo Rollouts</strong></p>
<p>要将 Argo Rollouts 与蓝绿部署结合起来，您可以通过 Argo Rollouts 定义和管理蓝绿部署过程，同时利用其强大的流量控制和自动化回滚功能。这需要您在 Kubernetes 集群中安装 Argo Rollouts 控制器，并定义相应的 Rollout 资源来代替标准的 Deployment 资源。</p>
<h3 id="结合argo-rollouts设计方案" tabindex="-1"><a class="header-anchor" href="#结合argo-rollouts设计方案" aria-hidden="true">#</a> 结合argo Rollouts设计方案</h3>
<ol>
<li><strong>安装 Argo Rollouts 控制器</strong>：
<ul>
<li>确保您的 Kubernetes 集群中已经安装了 Argo Rollouts。</li>
</ul>
</li>
<li><strong>定义 Rollout 资源</strong>：
<ul>
<li>替代传统的 Deployment 资源，使用 Rollout 资源来定义您的应用部署。</li>
<li>在 Rollout 配置中指定蓝绿部署策略。</li>
</ul>
</li>
<li><strong>配置 Service</strong>：
<ul>
<li>定义 Service 来指向 Rollout 管理的 Pods。</li>
</ul>
</li>
<li><strong>配置 Ingress</strong>：
<ul>
<li>使用 Ingress 资源来控制外部流量进入您的服务。</li>
</ul>
</li>
<li><strong>流量转移</strong>：
<ul>
<li>利用 Argo Rollouts 的能力来管理从蓝色到绿色的流量转移。</li>
</ul>
</li>
</ol>
<h3 id="示例代码" tabindex="-1"><a class="header-anchor" href="#示例代码" aria-hidden="true">#</a> 示例代码</h3>
<ol>
<li>
<p><strong>Rollout 资源</strong> (<code v-pre>blue-green-rollout.yaml</code>):</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> argoproj.io/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Rollout
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> bluegreen<span class="token punctuation">-</span>rollout
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp
        <span class="token key atrule">image</span><span class="token punctuation">:</span> myapp<span class="token punctuation">:</span>latest
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">blueGreen</span><span class="token punctuation">:</span> 
      <span class="token key atrule">activeService</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>active
      <span class="token key atrule">previewService</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>preview
      <span class="token key atrule">autoPromotionEnabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Active Service</strong> (<code v-pre>active-service.yaml</code>):</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>active
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Preview Service</strong> (<code v-pre>preview-service.yaml</code>):</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>preview
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
    <span class="token key atrule">rollouts-pod-template-hash</span><span class="token punctuation">:</span> &lt;HASH<span class="token punctuation">></span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>
    <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Ingress 资源</strong> (<code v-pre>ingress.yaml</code>):</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>ingress
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>active
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>在这个方案中，<code v-pre>activeService</code> 和 <code v-pre>previewService</code> 分别代表当前活跃版本和预览（新版本）的服务。Argo Rollouts 会根据配置自动管理蓝绿部署过程，包括流量的转移。您可以通过更新 Rollout 资源中的镜像版本来触发新的部署，并使用 Argo Rollouts 的命令行工具来控制流量转移和促进新版本的发布。</p>
<h2 id="金丝雀部署" tabindex="-1"><a class="header-anchor" href="#金丝雀部署" aria-hidden="true">#</a> 金丝雀部署</h2>
<p>金丝雀部署是一种技术：</p>
<blockquote>
<p>金丝雀部署（Canary Deployment）是一种软件发布技术，它在更新应用程序时采取逐步的方法，以最小化风险。这种策略的命名源于矿工使用金丝雀作为一种安全预警系统的历史。在软件部署的语境中，它代表了逐渐引入新版本应用程序的过程，以便在全面部署前对其进行测试和验证。</p>
</blockquote>
<h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3>
<ol>
<li><strong>逐步推出</strong>：
<ul>
<li>新版本初始只向一小部分用户或环境发布，而大部分用户仍然使用旧版本。</li>
</ul>
</li>
<li><strong>风险控制</strong>：
<ul>
<li>如果新版本表现不佳（如出现错误或性能问题），则影响的用户范围有限，且可以迅速回滚。</li>
</ul>
</li>
<li><strong>实时反馈</strong>：
<ul>
<li>提供机会观察新版本在实际环境中的表现，收集实时反馈和性能数据。</li>
</ul>
</li>
</ol>
<h3 id="实施步骤" tabindex="-1"><a class="header-anchor" href="#实施步骤" aria-hidden="true">#</a> 实施步骤</h3>
<ol>
<li><strong>初始发布</strong>：
<ul>
<li>新版本最初只对一小组用户或一部分流量可见。</li>
</ul>
</li>
<li><strong>监控和评估</strong>：
<ul>
<li>对新版本的性能、稳定性和用户反馈进行持续监控。</li>
</ul>
</li>
<li><strong>逐步增加覆盖率</strong>：
<ul>
<li>如果新版本表现良好，逐步增加其对用户或流量的覆盖范围。</li>
</ul>
</li>
<li><strong>全面部署或回滚</strong>：
<ul>
<li>根据反馈和监控结果，决定是全面部署新版本还是回滚到旧版本。</li>
</ul>
</li>
</ol>
<h3 id="应用场景-1" tabindex="-1"><a class="header-anchor" href="#应用场景-1" aria-hidden="true">#</a> 应用场景</h3>
<ul>
<li><strong>高风险更新</strong>：对于可能对系统稳定性或用户体验有重大影响的更新。</li>
<li><strong>大型应用</strong>：在大型或复杂的应用中，不同用户群可能对更新有不同的反应。</li>
<li><strong>连续部署环境</strong>：在敏捷开发和持续集成/持续部署 (CI/CD) 环境中，金丝雀部署可以作为一种有效的风险管理工具。</li>
</ul>
<h3 id="使用-ingress-和-deployment-实现金丝雀部署" tabindex="-1"><a class="header-anchor" href="#使用-ingress-和-deployment-实现金丝雀部署" aria-hidden="true">#</a> 使用 Ingress 和 Deployment 实现金丝雀部署</h3>
<h4 id="设计方案-1" tabindex="-1"><a class="header-anchor" href="#设计方案-1" aria-hidden="true">#</a> 设计方案</h4>
<ol>
<li><strong>准备两个 Deployment</strong>：
<ul>
<li>一个为当前版本（例如，标记为 <code v-pre>version: stable</code>）。</li>
<li>另一个为新版本（例如，标记为 <code v-pre>version: canary</code>）。</li>
</ul>
</li>
<li><strong>配置 Service</strong>：
<ul>
<li>为每个 Deployment 创建一个 Service。</li>
</ul>
</li>
<li><strong>配置 Ingress</strong>：
<ul>
<li>使用 Ingress 资源定义流量的分配策略，指定一部分流量到新版本。</li>
</ul>
</li>
</ol>
<h4 id="示例代码-1" tabindex="-1"><a class="header-anchor" href="#示例代码-1" aria-hidden="true">#</a> 示例代码</h4>
<ol>
<li>
<p><strong>Stable Deployment</strong> (<code v-pre>stable-deployment.yaml</code>):</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>stable
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">3</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
      <span class="token key atrule">version</span><span class="token punctuation">:</span> stable
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
        <span class="token key atrule">version</span><span class="token punctuation">:</span> stable
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp
        <span class="token key atrule">image</span><span class="token punctuation">:</span> myapp<span class="token punctuation">:</span>stable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Canary Deployment</strong> (<code v-pre>canary-deployment.yaml</code>):</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>canary
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">1</span>  <span class="token comment"># Lesser replicas as it's a canary release</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
      <span class="token key atrule">version</span><span class="token punctuation">:</span> canary
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
        <span class="token key atrule">version</span><span class="token punctuation">:</span> canary
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp
        <span class="token key atrule">image</span><span class="token punctuation">:</span> myapp<span class="token punctuation">:</span>canary
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Service</strong> (<code v-pre>service.yaml</code>):</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yamlCopy codeapiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Ingress 资源</strong> (<code v-pre>ingress.yaml</code>):</p>
<ul>
<li>在这里，您需要使用 Ingress 控制器的特定功能来分配流量（例如，NGINX Ingress 的权重分配）。</li>
</ul>
</li>
</ol>
<h3 id="使用-argo-rollouts-实现金丝雀部署" tabindex="-1"><a class="header-anchor" href="#使用-argo-rollouts-实现金丝雀部署" aria-hidden="true">#</a> 使用 Argo Rollouts 实现金丝雀部署</h3>
<h4 id="设计方案-2" tabindex="-1"><a class="header-anchor" href="#设计方案-2" aria-hidden="true">#</a> 设计方案</h4>
<ol>
<li><strong>安装 Argo Rollouts</strong>：
<ul>
<li>确保您的 Kubernetes 集群中已经安装了 Argo Rollouts。</li>
</ul>
</li>
<li><strong>定义 Rollout 资源</strong>：
<ul>
<li>使用 Rollout 资源来定义应用部署，并指定金丝雀策略。</li>
</ul>
</li>
<li><strong>配置 Service</strong>：
<ul>
<li>定义 Service 来指向 Rollout 管理的 Pods。</li>
</ul>
</li>
<li><strong>监控和管理部署</strong>：
<ul>
<li>利用 Argo Rollouts 提供的工具来监控和管理部署过程。</li>
</ul>
</li>
</ol>
<h4 id="示例代码-2" tabindex="-1"><a class="header-anchor" href="#示例代码-2" aria-hidden="true">#</a> 示例代码</h4>
<ol>
<li>
<p><strong>Rollout 资源</strong> (<code v-pre>canary-rollout.yaml</code>):</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> argoproj.io/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Rollout
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp<span class="token punctuation">-</span>rollout
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">4</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> myapp
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp
        <span class="token key atrule">image</span><span class="token punctuation">:</span> myapp<span class="token punctuation">:</span>new<span class="token punctuation">-</span>version
  <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
    <span class="token key atrule">canary</span><span class="token punctuation">:</span>
      <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">setWeight</span><span class="token punctuation">:</span> <span class="token number">20</span>
      <span class="token punctuation">-</span> <span class="token key atrule">pause</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token key atrule">duration</span><span class="token punctuation">:</span> 48h<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> <span class="token key atrule">setWeight</span><span class="token punctuation">:</span> <span class="token number">50</span>
      <span class="token punctuation">-</span> <span class="token key atrule">pause</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token key atrule">duration</span><span class="token punctuation">:</span> 48h<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Service</strong> (<code v-pre>service.yaml</code>):</p>
<ul>
<li>同上面的 Ingress 和 Deployment 方法中的 Service。</li>
</ul>
</li>
</ol>
<p>在使用 Argo Rollouts 的情况下，部署的管理和流量分配变得更加简单和直观。您可以更精确地控制新版本的流量比例，并利用 Rollouts 的自动化特性来监控部署的健康状况和自动回滚</p>
<h3 id="渐进式部署" tabindex="-1"><a class="header-anchor" href="#渐进式部署" aria-hidden="true">#</a> 渐进式部署</h3>
<p>渐进式部署是金丝雀部署的一个完全的自动化版本。渐进式交互不是在扩大金丝雀部署之前检测一个固定的时间段，而是持续监测 Pod 的健康状态，并且不断扩大规模，直到完全扩展。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '88.md' style='float:left'>⬆️上一节🔗  </a><a href = '90.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


