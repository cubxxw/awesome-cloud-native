<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第83节-jenkins-x" tabindex="-1"><a class="header-anchor" href="#第83节-jenkins-x" aria-hidden="true">#</a> 第83节 Jenkins X</h1>
<div><a href = '82.md' style='float:left'>⬆️上一节🔗  </a><a href = '84.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p>之前讨论过 Prow 的实现，以及 prow 的部署方式，相比较而言，prow 的部署是非常非常难的。</p>
<ul>
<li>官网地址：https://jenkins-x.io/</li>
<li>GitHub 地址：https://github.com/jenkins-x/jx</li>
</ul>
<p><strong>描述：</strong></p>
<p>你只需要处理你的代码，让Jenkins X自动化其他一切</p>
<ul>
<li>基于GitOps的Tekton管道：Jenkins X不需要深入了解Kubernetes、容器或Tekton，它将为您的项目自动化令人敬畏的Tekton管道，这些项目完全实现了CI和CD，您可以通过GitOps进行管理</li>
<li>通过GitOps促进变革：每个团队都有一套环境。然后，Jenkins X通过GitOps和Pull Request自动化环境管理和环境之间应用程序新版本的推广</li>
<li>合并请求预览环境：Jenkins X会自动为你的Pull Request启动预览环境，这样你就可以在更改合并到主分支之前获得快速反馈。</li>
<li>关于问题和合并请求的反馈和聊天： Jenkins X会自动对您的提交、问题和合并请求进行评论，并在代码准备预览、升级到环境或自动生成合并请求以升级版本时提供反馈</li>
</ul>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<ol>
<li>
<p><strong>设置 Kubernetes 集群</strong></p>
<p>在开始之前，请确保你有一个运行的 Kubernetes 集群并配置了 <code v-pre>kubectl</code> 来与其交互。</p>
</li>
<li>
<p><strong>安装 <code v-pre>jx</code> CLI 工具</strong></p>
<p>Jenkins X 提供了一个命令行工具 <code v-pre>jx</code>，用于安装和管理 Jenkins X。你可以从 Jenkins X 的 GitHub 仓库或其官方网站下载并安装这个工具。</p>
</li>
<li>
<p><strong>使用 <code v-pre>jx</code> 安装 Jenkins X</strong></p>
<p>执行以下命令以安装 Jenkins X：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>jx boot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令将启动 Jenkins X 的安装过程，并会安装所需的所有资源和 CRDs。</p>
<p><strong>注意</strong>：根据 Jenkins X 的版本和你的选择，安装过程可能会稍有不同。例如，早期版本的 Jenkins X 使用 <code v-pre>jx install</code> 命令进行安装，而后来的版本使用 <code v-pre>jx boot</code>。请根据你使用的版本和官方文档进行相应的操作。</p>
</li>
<li>
<p><strong>验证 CRD 安装</strong></p>
</li>
</ol>
<p>安装完成后，你可以使用 <code v-pre>kubectl</code> 验证 Jenkins X 的 CRDs 是否已成功安装。例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get crd <span class="token operator">|</span> <span class="token function">grep</span> jenkins.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会列出 Jenkins X 创建的所有 CRDs。</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍：</h2>
<p>Jenkins X采用流行的开源项目，自动化设置和管理，提供集成的Cloud Native解决方案，团队可以使用它来开发更好的软件，比传统的非云解决方案更快，更可靠。</p>
<p><strong>Jenkins X集成的开源项目：</strong></p>
<ul>
<li>Kubernetes目标平台Jenkins X安装到，可选地部署和运行使用Jenkins X构建的应用程序</li>
<li>Tekton Cloud Native管道编排</li>
<li>Kuberhealthy系统的定期健康检查</li>
<li>Grafana [可选] 集中式日志和可观察性</li>
<li>Jenkins [可选]传统管道编排</li>
<li>Nexus [可选]工件存储库</li>
</ul>
<h3 id="infra" tabindex="-1"><a class="header-anchor" href="#infra" aria-hidden="true">#</a> infra</h3>
<p>Jenkins X的目标是很好地使用云，Kubernetes托管核心服务，长期存储的存储桶，容器注册表和托管服务，如秘密管理器。所有这些都需要创建和管理。Jenkins X遵从Terraform来设置和管理Jenkins X所需的云基础设施。</p>
<ul>
<li>https://www.terraform.io/</li>
</ul>
<p><strong>Terraform</strong> 是由 HashiCorp 开发的开源“基础设施即代码”（IaC）工具。它允许用户使用声明式配置语言定义、提供和管理云资源。以下是 Terraform 的主要特点和应用场景：</p>
<ol>
<li><strong>声明式语言</strong>：Terraform 使用其自己的声明式配置语言——HCL (HashiCorp Configuration Language)。用户只需要描述他们想要的资源状态，而 Terraform 将确定如何达到这个状态。</li>
<li><strong>提供器模型</strong>：Terraform 通过提供者来支持各种云服务和平台。这些提供者（例如 AWS、Azure、GCP 等）允许 Terraform 与不同的云服务交互。</li>
<li><strong>状态管理</strong>：Terraform 跟踪资源的当前状态，并将其与用户定义的目标状态进行比较。这确保了基础设施的一致性和可预测性。</li>
<li><strong>模块化</strong>：Terraform 代码可以组织成模块，使其易于重用和共享。</li>
<li><strong>安全计划和更改</strong>：在应用更改之前，Terraform 允许用户预览计划中的更改，确保只有预期的更改被应用。</li>
</ol>
<p><strong>有什么用？</strong></p>
<ol>
<li><strong>基础设施自动化</strong>：Terraform 可以自动化创建、更新和删除云资源。</li>
<li><strong>版本控制和协作</strong>：由于 Terraform 配置是代码，所以可以使用版本控制工具（如 Git）进行管理。这还允许团队协同工作和审查基础设施更改。</li>
<li><strong>多云和混合云策略</strong>：Terraform 支持多个云提供者，使得多云和混合云部署成为可能。</li>
</ol>
<h3 id="gitops" tabindex="-1"><a class="header-anchor" href="#gitops" aria-hidden="true">#</a> GitOps</h3>
<p>整个Jenkins X体验都基于Git。您开发的安装，扩展和应用程序通过集群Git存储库进行管理，这是Kubernetes集群的理想状态。</p>
<p>Kubernetes操作员在集群内运行，并轮询Git存储库中的更改，应用经过验证和批准的更新。集群Git仓库使用<code v-pre>Helmfile</code>来描述安装软件时应该使用的helm charts。Jenkins X生成Helmfiles中定义的Kubernetes资源，并将其提交回Git，以便始终可以通过Git看到确切的状态。</p>
<ul>
<li><a href="https://github.com/helmfile/helmfile" target="_blank" rel="noopener noreferrer">helm file<ExternalLinkIcon/></a></li>
</ul>
<p>helmfile 声明地将Kubernetes manifest、Kustomize configs和Charts部署为Helm版本。生成用于 ArgoCD 的一体化清单。</p>
<p>Helmfile是一个用于部署helm charts的声明性规范。它能让你...</p>
<ul>
<li>保留图表值文件的目录，并在版本控制中维护更改。</li>
<li>将CI/CD应用于配置更改。</li>
<li>定期同步以避免环境中的偏差。</li>
</ul>
<p>为了避免对 <code v-pre>helm</code> 的每次迭代进行升级， <code v-pre>helmfile</code> 可执行文件委托给 <code v-pre>helm</code> -因此，必须安装 <code v-pre>helm</code> 。</p>
<p>使用GitOps意味着在对集群进行任何更改时可以遵循熟悉的流程，使用审查，自动化，可追溯性和回滚来给予对消费更改的更好控制。</p>
<p>Jenkins X还使用GitOps作为升级的方式，包括新版本的图像，Helm Charts和包。</p>
<h3 id="helmfile-入门" tabindex="-1"><a class="header-anchor" href="#helmfile-入门" aria-hidden="true">#</a> helmfile 入门</h3>
<p>假设表示您的头盔释放的期望状态的 <code v-pre>helmfile.yaml</code> 看起来像：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">repositories</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> prometheus<span class="token punctuation">-</span>community
  <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//prometheus<span class="token punctuation">-</span>community.github.io/helm<span class="token punctuation">-</span>charts

<span class="token key atrule">releases</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> prom<span class="token punctuation">-</span>norbac<span class="token punctuation">-</span>ubuntu
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> prometheus
  <span class="token key atrule">chart</span><span class="token punctuation">:</span> prometheus<span class="token punctuation">-</span>community/prometheus
  <span class="token key atrule">set</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> rbac.create
    <span class="token key atrule">value</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过运行以下命令将Kubernetes集群状态同步到所需状态：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>helmfile apply
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>恭喜你！现在，您的第一个Prometheus部署已经在集群中运行。</p>
<p>通过引用在 <code v-pre>helmfile.yaml</code> 上迭代：</p>
<ul>
<li><a href="https://helmfile.readthedocs.io/en/latest/#configuration" target="_blank" rel="noopener noreferrer">Configuration 配置<ExternalLinkIcon/></a></li>
<li><a href="https://helmfile.readthedocs.io/en/latest/#cli-reference" target="_blank" rel="noopener noreferrer">CLI reference CLI参考<ExternalLinkIcon/></a></li>
<li><a href="https://helmfile.readthedocs.io/en/latest/writing-helmfile/" target="_blank" rel="noopener noreferrer">Helmfile Best Practices Guide<ExternalLinkIcon/></a></li>
</ul>
<h3 id="secret-management" tabindex="-1"><a class="header-anchor" href="#secret-management" aria-hidden="true">#</a> Secret Management</h3>
<p>如上所述使用GitOps确实存在一个挑战，即在哪里存储集群的秘密，因为将它们保存在Git中是不安全的。有一种方法可以加密秘密并将其存储在Git中，但存在一个可用性问题，这使得该方法使用起来并不容易。Jenkins X更喜欢使用真实的秘密提供商解决方案，如Vault或可能的云托管解决方案，如Google，Azure或Amazon Secrets管理器。</p>
<p>Jenkins X GitOps与External Secrets一起提供集成的体验，因此您的秘密的真实来源是秘密管理器，并且在需要时将值复制到集群中。</p>
<h3 id="pipelines" tabindex="-1"><a class="header-anchor" href="#pipelines" aria-hidden="true">#</a> Pipelines</h3>
<p>默认情况下，Jenkins X与Tekton一起提供了一种干净的声明性云原生方式来描述管道。结合Lighthouse Jenkins X，可以通过Git轻松继承版本化的共享管道步骤，简单的语法提供了灵活性和易于维护。</p>
<p>Jenkins X也可以很好地与Jenkins一起工作，为具有传统工作负载的用户提供支持。这不是默认安装，但与Jenkins X很容易安装任何掌舵图，所以设计与我们的鼓舞人心的项目Jenkins伟大。</p>
<h3 id="chatops" tabindex="-1"><a class="header-anchor" href="#chatops" aria-hidden="true">#</a> ChatOps</h3>
<p>随着越来越多的微服务需要自动化，Jenkins X提供了通过对pull request的注释与pipeline进行交互的能力。Lighthouse是从Prow演变而来的，Prow在Kubernetes生态系统中被大量使用，为触发测试、批准、保持和开发人员在日常活动中使用的其他常见命令提供一致的开发人员工作流程。</p>
<h3 id="developer-experience" tabindex="-1"><a class="header-anchor" href="#developer-experience" aria-hidden="true">#</a> Developer experience</h3>
<p>沿着上面提到的ChatOps，Jenkins X旨在帮助开发人员以一致的方式使用他们的微服务，使用CLI或GUI开发人员可以利用加速书推荐的经过验证的方法。</p>
<p>无论是创建还是导入新项目，都可以自动设置CI和CD，打包应用程序，以便它们可以在Kubernetes上部署和运行，或者只是作为库发布供下游应用程序使用。</p>
<p>Jenkins X帮助团队在构建、开发和改进的方式上保持一致性。</p>
<p><code v-pre>jx</code> CLI帮助开发人员使用他们的终端与Jenkins X交互。</p>
<p>对于GUI，Jenkins X有一个Octant插件。Octant在集群外部运行，并使用用户必须与Kubernetes资源交互的身份验证和权限。</p>
<p><strong>Tekton 介绍：</strong></p>
<p>Tekton 是一个强大而灵活的 Kubernetes 原生开源框架，可用于创建持续集成和交付 (CI/CD) 系统。该框架可让您跨多个云服务商或本地系统进行构建、测试和部署，无需操心基础实现细节。</p>
<p>Tekton 提供开源组件来帮助您标准化 CI/CD 工具和跨不同供应商、语言和部署环境的流程。Tekton 提供的流水线、版本、工作流和其他 CI/CD 组件所遵循的行业规范均适用于 Jenkins、Jenkins X、Skaffold、Knative 等现有的 CI/CD 工具。</p>
<p>Tekton 提供的内置最佳做法可让您快速创建云原生 CI/CD 流水线。其目标是让开发者创建和部署不可变映像、管理基础架构的版本控制机制，或者更轻松地执行回滚。借助 Tekton，您还可以利用高级部署模式，例如滚动部署、蓝/绿部署、Canary 部署或 GitOps 工作流。</p>
<p>Tekton 可让您跨多个环境（例如虚拟机、无服务器、Kubernetes 或 Firebase 环境）进行构建、测试和部署。您还可以使用 Tekton 流水线跨多个云服务商或混合环境进行部署。</p>
<p>Tekton 赋予您充分的灵活性，您可以使用自己偏好的 CI/CD 工具创建功能强大的流水线。Tekton 让您无需操心基础实现，只需根据团队的要求选择构建、测试和部署工作流即可。</p>
<h2 id="source-repositories" tabindex="-1"><a class="header-anchor" href="#source-repositories" aria-hidden="true">#</a> Source Repositories</h2>
<p>源代码控制管理（SCM）已配置为使用Jenkins X运行CI/CD管道的存储库表示为源代码存储库。Source Repositories是Kubernetes自定义资源（CR），作用域为命名空间，并在开发命名空间/环境中创建。</p>
<p>💡简单的一个案例如下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> jenkins.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> SourceRepository
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">gitops.jenkins-x.io/pipeline</span><span class="token punctuation">:</span> namespaces
    <span class="token key atrule">owner</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>x
    <span class="token key atrule">provider</span><span class="token punctuation">:</span> github
    <span class="token key atrule">repository</span><span class="token punctuation">:</span> jx
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>x<span class="token punctuation">-</span>jx
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> jx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">httpCloneURL</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/jenkins<span class="token punctuation">-</span>x/jx.git
  <span class="token key atrule">org</span><span class="token punctuation">:</span> jenkins<span class="token punctuation">-</span>x
  <span class="token key atrule">provider</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com
  <span class="token key atrule">providerKind</span><span class="token punctuation">:</span> github
  <span class="token key atrule">providerName</span><span class="token punctuation">:</span> github
  <span class="token key atrule">repo</span><span class="token punctuation">:</span> jx
  <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/jenkins<span class="token punctuation">-</span>x/jx

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这显示了命名空间 <code v-pre>jx</code> 中名为 <code v-pre>jenkins-x-jx</code> 的源存储库。它表示 <code v-pre>jenkins-x</code> 组织中名为 <code v-pre>jx</code> 的存储库，该存储库托管在 <code v-pre>github</code> 中。</p>
<p>您可以通过运行以下命令查看集群中的所有源资料库：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl get sourcerepositories -A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="environments" tabindex="-1"><a class="header-anchor" href="#environments" aria-hidden="true">#</a> Environments</h3>
<p>Environment是Jenkins X中的Kubernetes自定义资源（CR），应用程序代码位于其中。环境的例子包括开发、测试、试运行和生产。环境的范围是kubernetes命名空间，本质上是用额外的Jenkins X相关元数据扩展命名空间。</p>
<p>安装Jenkins X后，将创建一个开发环境。这是安装所有Jenkins X相关资源的环境，如灯塔，构建控制器，nexus，图表博物馆。默认情况下，开发环境位于 <code v-pre>jx</code> 命名空间中，但它是可配置的。这也是所有管道运行的环境。</p>
<p>其他环境（如登台和生产环境）可以与开发环境位于同一个集群中，也可以位于远程集群中。</p>
<p>环境可以是不同的类型：</p>
<ul>
<li>Permanent 永久</li>
<li>Preview 预览</li>
<li>Test 测试</li>
<li>Edit 编辑</li>
<li>Development 发展</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> jenkins.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Environment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span> dev
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dev
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> jx
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Development
  <span class="token key atrule">label</span><span class="token punctuation">:</span> Development
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> jx
  <span class="token key atrule">promotionStrategy</span><span class="token punctuation">:</span> Never
  <span class="token key atrule">source</span><span class="token punctuation">:</span>
    <span class="token key atrule">ref</span><span class="token punctuation">:</span> master
    <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/jenkins<span class="token punctuation">-</span>x/jx3<span class="token punctuation">-</span>eks<span class="token punctuation">-</span>vault.git
  <span class="token key atrule">webHookEngine</span><span class="token punctuation">:</span> Lighthouse

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个类型为 <code v-pre>Development</code> 的环境，位于命名空间 <code v-pre>jx</code> 中。它的提升策略设置为 <code v-pre>never</code> ，不允许在此开发命名空间中部署应用程序特定的代码。</p>
<p>您可以通过运行以下命令查看群集中的所有环境：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get environments <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="pipeline-activites" tabindex="-1"><a class="header-anchor" href="#pipeline-activites" aria-hidden="true">#</a> Pipeline activites</h3>
<p>Jenkins X为作业创建管道活动。它是一个Kubernetes自定义资源（CR），作用域为命名空间。</p>
<ul>
<li>只需修改 <code v-pre>.lighthouse/jenkins-x</code> 文件夹中的Task、Pipeline或PipelineRun文件，即可轻松编辑任何git仓库中的任何管道</li>
<li>在任何git仓库中添加新的pipeline，以重用从仓库中的tekton目录等地方找到的任何任务文件</li>
</ul>
<h3 id="catalog-目录" tabindex="-1"><a class="header-anchor" href="#catalog-目录" aria-hidden="true">#</a> Catalog 目录</h3>
<p>随着我们创建越来越多的软件，我们往往会看到Git存储库和微服务的数量爆炸式增长。</p>
<p>每个存储库都需要自动化的CI和CD;但是我们如何管理我们需要的数百个管道-同时还可以轻松地跨存储库共享管道并允许每个存储库在需要时进行自定义？</p>
<p><strong>Jenkins X解决了这个问题：</strong></p>
<ul>
<li>管道、任务和步骤通过Tekton YAML定义，允许您使用任何Tekton工具，如IDE完成和验证</li>
<li>我们支持一个 <code v-pre>image: uses:sourceURI</code> 符号，它允许你从git仓库中继承步骤，而不必将源代码复制/粘贴到仓库中。</li>
</ul>
<p>比如说，你创建一个新的 channel：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">tasks</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> from<span class="token punctuation">-</span>build<span class="token punctuation">-</span>pack
  <span class="token key atrule">taskSpec</span><span class="token punctuation">:</span>
    <span class="token key atrule">stepTemplate</span><span class="token punctuation">:</span>
      <span class="token key atrule">image</span><span class="token punctuation">:</span> uses<span class="token punctuation">:</span>jenkins<span class="token punctuation">-</span>x/jx3<span class="token punctuation">-</span>pipeline<span class="token punctuation">-</span>catalog/tasks/javascript/release.yaml@versionStream
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> uses<span class="token punctuation">:</span>jenkins<span class="token punctuation">-</span>x/jx3<span class="token punctuation">-</span>pipeline<span class="token punctuation">-</span>catalog/tasks/git<span class="token punctuation">-</span>clone/git<span class="token punctuation">-</span>clone.yaml@versionStream
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> next<span class="token punctuation">-</span>version
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> jx<span class="token punctuation">-</span>variables
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> build<span class="token punctuation">-</span>npm<span class="token punctuation">-</span>install
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> build<span class="token punctuation">-</span>npm<span class="token punctuation">-</span>test
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> build<span class="token punctuation">-</span>container<span class="token punctuation">-</span>build
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> promote<span class="token punctuation">-</span>changelog
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> promote<span class="token punctuation">-</span>helm<span class="token punctuation">-</span>release
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> promote<span class="token punctuation">-</span>jx<span class="token punctuation">-</span>promote
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可能想知道这些 <code v-pre>uses:</code> 字符串是什么意思。</p>
<h3 id="引用任务或步骤" tabindex="-1"><a class="header-anchor" href="#引用任务或步骤" aria-hidden="true">#</a> 引用任务或步骤</h3>
<p>我们可以在任务中引用 <code v-pre>Task</code> 或 <code v-pre>Step</code> ，而不是在存储库之间复制粘贴任务和步骤YAML，如下所示：</p>
<ul>
<li>引用任务中的所有步骤</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">taskSpec</span><span class="token punctuation">:</span>
  <span class="token key atrule">steps</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> uses<span class="token punctuation">:</span>sourceURI

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>引用任务中的单个命名步骤</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">taskSpec</span><span class="token punctuation">:</span>
    <span class="token key atrule">stepTemplate</span><span class="token punctuation">:</span>
      <span class="token key atrule">image</span><span class="token punctuation">:</span> uses<span class="token punctuation">:</span>sourceURI
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mystep
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sourceuri表示法" tabindex="-1"><a class="header-anchor" href="#sourceuri表示法" aria-hidden="true">#</a> SourceURI表示法</h3>
<p>源URI表示法通过特殊的 <code v-pre>image</code> 前缀uses：on step启用，或者如果步骤上的图像为空，则 <code v-pre>stepTemplate:</code> 具有 <code v-pre>image</code> 前缀uses：</p>
<p>我们从ko和mink那里借鉴了这个想法;在图像URI上使用自定义前缀的想法。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> uses<span class="token punctuation">:</span>owner/repository/pathToFile@version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这引用了https://github.com存储库中的 <code v-pre>owner/repository</code> 和<code v-pre>@version</code>，可以是git标签、分支或SHA。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>- image: uses:lighthouse:owner/repository/pathToFile@version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="environments-1" tabindex="-1"><a class="header-anchor" href="#environments-1" aria-hidden="true">#</a> Environments</h2>
<p>Jenkins X支持多种环境来托管应用程序，例如 <code v-pre>Development</code> ， <code v-pre>Staging</code> 和 <code v-pre>Production</code> 。</p>
<ol>
<li>Development (开发环境)
<ul>
<li><strong>目的</strong>：这是开发者用来编写、测试和调试代码的环境。在这里，新的功能、bug修复和代码更新首先被实现和验证。</li>
<li><strong>稳定性</strong>：由于它是一个实验性的环境，所以可能相对不稳定。开发者可能会频繁地更改和更新代码。</li>
<li><strong>数据</strong>：通常使用模拟数据或者复制的生产数据（但是经过脱敏处理）。</li>
<li><strong>访问</strong>：通常只有开发团队可以访问。</li>
</ul>
</li>
<li>Staging (预生产或者测试环境)
<ul>
<li><strong>目的</strong>：这是一个模拟生产环境的地方，主要用于在上线到真正的生产环境之前进行测试和验证。它帮助确保应用程序在生产环境中的行为与预期相符。</li>
<li><strong>稳定性</strong>：应该尽量与生产环境保持一致，以便进行真实的测试。</li>
<li><strong>数据</strong>：可能使用与生产环境相似的数据来进行测试，确保测试的真实性。但在使用真实数据之前，通常会进行脱敏处理。</li>
<li><strong>访问</strong>：测试团队、质量保证(QA)团队和部分开发团队成员可以访问。</li>
</ul>
</li>
<li>Production (生产环境)
<ul>
<li><strong>目的</strong>：这是真正的运行环境，用于为最终用户提供应用程序或服务。所有的功能和更新，在经过开发和预生产测试后，最终会部署到这里。</li>
<li><strong>稳定性</strong>：这是所有环境中最重要和最稳定的。任何在此环境中的变更都需要经过严格的测试和验证。</li>
<li><strong>数据</strong>：包含真实和实时的数据。</li>
<li><strong>访问</strong>：最终用户、运营团队、部分开发团队和IT支持团队可以访问。</li>
</ul>
</li>
</ol>
<p>您还可以使用不同类型的测试环境：系统、集成、负载、浸泡或回归测试。</p>
<p>默认配置是单个集群设置，其中 <code v-pre>Staging</code> 和 <code v-pre>Production</code> 环境映射到同一集群内的本地命名空间 <code v-pre>jx-staging</code> 和 <code v-pre>jx-production</code> 。</p>
<p>但是，对于真实的企业设置，我们建议使用多集群设置，其中您的 <code v-pre>Production</code> 和 <code v-pre>Staging</code> 环境设置在单独的集群中;理想情况下，使用单独的云提供商帐户，以便它们可以彼此完全隔离。</p>
<h3 id="git" tabindex="-1"><a class="header-anchor" href="#git" aria-hidden="true">#</a> Git</h3>
<p>每个kubernetes集群都有一个git仓库，这样所有命名空间中的所有kubernetes资源都可以由GitOps管理。每个集群还可以有一个单独的基础设施git存储库（例如，用于Terraform）来定义云资源（存储桶、IAM角色、kubernetes集群、节点池、VPN、防火墙等）。</p>
<p>因此，如果您使用多集群设置，则每个集群都有git repository来定义该集群中所有命名空间中的kubernetes资源。</p>
<p>例如如果将 <code v-pre>Dev</code> 、 <code v-pre>Staging</code> 和 <code v-pre>Production</code> 放在单独的集群中，那么你将有3个包含 <code v-pre>helmfile.yaml</code> 文件的git仓库。如果你使用一个集群，你将有一个git仓库。</p>
<h3 id="configuration-配置" tabindex="-1"><a class="header-anchor" href="#configuration-配置" aria-hidden="true">#</a> Configuration 配置</h3>
<p>在你的开发集群git仓库中，<code v-pre>jx-requirements.yml</code>文件被用来定义哪些是默认环境，用于在你的仓库上进行升级。</p>
<p>环境的默认配置如下所示：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> core.jenkins<span class="token punctuation">-</span>x.io/v4beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Requirements
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token punctuation">...</span>
  <span class="token key atrule">environments</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> dev
  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> staging
  <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> production
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这默认意味着 <code v-pre>Staging</code> 和 <code v-pre>Production</code> 是本地集群中的命名空间（ <code v-pre>jx-staging</code> 和 <code v-pre>jx-production</code> ）。 <code v-pre>Staging</code> 将使用 <code v-pre>Auto</code> 促销， <code v-pre>Production</code> 将使用 <code v-pre>Manual</code> 促销（稍后将详细介绍）。</p>
<h3 id="multi-cluster-多集群" tabindex="-1"><a class="header-anchor" href="#multi-cluster-多集群" aria-hidden="true">#</a> Multi cluster 多集群</h3>
<p>当您为 <code v-pre>Staging</code> 或 <code v-pre>Production</code> 设置远程群集时，可以删除这些环境的上述条目。</p>
<p>然后，当您将远程集群存储库导入到开发环境中时（在拉取请求上设置CI/CD并启用升级），生成的拉取请求将修改您的 <code v-pre>jx-requirements.yml</code> 以添加远程集群的远程条目。</p>
<p>例如在通过jx项目导入和pull请求合并导入远程 <code v-pre>production</code> 环境之后，它应该看起来像：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> core.jenkins<span class="token punctuation">-</span>x.io/v4beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Requirements
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token punctuation">...</span>
  <span class="token key atrule">environments</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> dev
      <span class="token key atrule">repository</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dev<span class="token punctuation">-</span>environment
    <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> staging
    <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> production
      <span class="token key atrule">owner</span><span class="token punctuation">:</span> myowner
      <span class="token key atrule">repository</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>prod<span class="token punctuation">-</span>repo
      <span class="token key atrule">remoteCluster</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="每个存储库的自定义环境" tabindex="-1"><a class="header-anchor" href="#每个存储库的自定义环境" aria-hidden="true">#</a> 每个存储库的自定义环境</h2>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '82.md' style='float:left'>⬆️上一节🔗  </a><a href = '84.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


