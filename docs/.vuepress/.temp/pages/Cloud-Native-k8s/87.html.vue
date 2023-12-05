<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第87节-openim-使用-argocd-生产级部署" tabindex="-1"><a class="header-anchor" href="#第87节-openim-使用-argocd-生产级部署" aria-hidden="true">#</a> 第87节 OpenIM 使用 ArgoCD 生产级部署</h1>
<div><a href = '86.md' style='float:left'>⬆️上一节🔗  </a><a href = '88.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p><strong>这一期是一个简单的实战，实践。下一期深入学习 GitOps 的设计理念，流程和工具。</strong></p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p>ArgoCD 之前也介绍过很多。我们直接开始部署：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>kubectl create namespace argocd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>安装清单包括引用 <code v-pre>argocd</code> 命名空间的 <code v-pre>ClusterRoleBinding</code> 资源。如果您要将Argo CD安装到不同的名称空间中，请确保更新名称空间引用。</p>
</blockquote>
<p>然后，部署 ArgoCD。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-n</span> argocd <span class="token parameter variable">-f</span> https://ghproxy.com/https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>https://ghproxy.com</code> 是一个代理加速</p>
</blockquote>
<p>最后，等待 argocd 命名空间所有的工作负载处于就绪状态。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl <span class="token function">wait</span> <span class="token parameter variable">--for</span><span class="token operator">=</span>condition<span class="token operator">=</span>Ready pods <span class="token parameter variable">--all</span> <span class="token parameter variable">-n</span> argocd <span class="token parameter variable">--timeout</span> 300s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请注意，由于云厂商 Kubernetes 版本存在差异，所以如果你在安装过程中发现 argocd-repo-server 工作负载一直无法启动，可以尝试删除 argocd-repo-server Deployment seccompProfile 节点的内容。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> argocd<span class="token punctuation">-</span>repo<span class="token punctuation">-</span>server
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">securityContext</span><span class="token punctuation">:</span>
        <span class="token key atrule">seccompProfile</span><span class="token punctuation">:</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> RuntimeDefault
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>安装 ArgoCD CLI</strong></p>
<p>为了更加方便地配置 ArgoCD，官方还为我们提供了 CLI 工具。不同操作系统的安装方法有所差异，使用 BIN 安装</p>
<ul>
<li>https://github.com/argoproj/argo-cd/releases</li>
</ul>
<p>应用程序定义、配置和环境应该是声明性的，并受版本控制。应用程序部署和生命周期管理应该是自动化的、可审计的和易于理解的。</p>
<p>如果您对UI、SSO、多集群功能不感兴趣，那么您可以只安装核心Argo CD组件：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>kubectl create namespace argocd
kubectl apply <span class="token operator">-</span>n argocd <span class="token operator">-</span>f https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>argoproj<span class="token operator">/</span>argo<span class="token operator">-</span>cd<span class="token operator">/</span>stable<span class="token operator">/</span>manifests<span class="token operator">/</span>core<span class="token operator">-</span>install<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个默认安装将有一个自签名证书，如果没有一些额外的工作，就无法访问。执行以下操作之一：</p>
<ul>
<li>按照说明配置证书（并确保客户端操作系统信任它）。</li>
<li>将客户端操作系统配置为信任自签名证书。</li>
<li>在本指南的所有Argo CD CLI操作中使用 <code v-pre>--insecure</code> 标志。</li>
</ul>
<h2 id="下载argo-cd-cli" tabindex="-1"><a class="header-anchor" href="#下载argo-cd-cli" aria-hidden="true">#</a> 下载Argo CD CLI</h2>
<p>从https://github.com/argoproj/argo-cd/releases/latest下载最新的Argo CD版本。更详细的安装说明可以通过CLI安装文档找到。</p>
<h2 id="本地访问-argocd" tabindex="-1"><a class="header-anchor" href="#本地访问-argocd" aria-hidden="true">#</a> 本地访问 ArgoCD</h2>
<p>要在本地访问 ArgoCD，最简单的方式是通过端口转发来完成。你可以使用下面的命令来进行端口转发。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>kubectl port<span class="token operator">-</span>forward service<span class="token operator">/</span>argocd<span class="token operator">-</span>server <span class="token number">8080</span><span class="token punctuation">:</span><span class="token number">80</span> <span class="token operator">-</span>n argocd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，使用浏览器打开：http://127.0.0.1:8080，这样就可以访问 ArgoCD 控制台了，如下图所示。</p>
<p>ArgoCD 的默认账号为 admin，密码可以通过下面的命令来获取。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token parameter variable">-n</span> argocd get secret argocd-initial-admin-secret <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">"{.data.password}"</span> <span class="token operator">|</span> base64 <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Argo CD是作为一个kubernetes控制器实现的，它可以持续监控正在运行的应用程序，并将当前的实时状态与所需的目标状态（如Git repo中所指定的）进行比较。活动状态偏离目标状态的已部署应用程序被视为 <code v-pre>OutOfSync</code> 。Argo CD报告并可视化差异，同时提供自动或手动将实时状态同步回所需目标状态的工具。</p>
<p>在Git存储库中对目标状态所做的任何修改都可以自动应用并反映在指定的目标环境中。</p>
<h2 id="gitops-工作流总览" tabindex="-1"><a class="header-anchor" href="#gitops-工作流总览" aria-hidden="true">#</a> GitOps 工作流总览</h2>
<p>到这里，你是不是已经迫不及待想要构建工作流了？别急，在创建 GitOps 工作流之前，我们先来认识一下一个完整 GitOps 工作流都需要哪些关键步骤。</p>
<p><img src="http://sm.nsddd.top/sm202311131520639.png" alt="image-20231113152036458"></p>
<p>我们可以把这个完整的 GitOps 工作流分成三个部分来看。</p>
<ul>
<li>第一部分是开发者推送代码到 GitHub 仓库，然后触发 GitHub Action 自动构建。</li>
<li>第二部分是 GitHub Action 自动构建，它包括下面三个步骤。</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">1</span>. 构建示例应用的镜像。
<span class="token number">2</span>. 将示例应用的镜像推送到 Docker Registry 镜像仓库。
<span class="token number">3</span>. 更新代码仓库中 Helm Chart values.yaml 文件的镜像版本。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第三部分的核心是 ArgoCD，它包括下面两个步骤。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">4</span>. 通过定期 Poll 的方式持续拉取 Git 仓库，并判断是否有新的 commit。
<span class="token number">5</span>. 从 Git 仓库获取 Kubernetes 对象，与集群对象进行实时比较，自动更新集群内有差异的资源。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在之前的课程中，我们已经为示例应用创建好了 GitHub Action 来自动构建镜像，但还缺少自动更新 Helm Chart values.yaml 文件的镜像版本逻辑，我会在稍后进行配置。</p>
<p>现在，我们开始创建 GitOps 工作流中的第三部分，也就是创建 ArgoCD 应用，实现 Kubernetes 资源的自动同步。</p>
<h2 id="创建-argocd-应用" tabindex="-1"><a class="header-anchor" href="#创建-argocd-应用" aria-hidden="true">#</a> 创建 ArgoCD 应用</h2>
<p>我们以示例应用为例子来创建 ArgoCD 应用，这里主要分成两个步骤。</p>
<ul>
<li>配置仓库访问权限。(需要注意的是，OpenIM 项目是公开的，所以没必要配置仓库的访问权限)</li>
<li>创建 ArgoCD 应用。</li>
</ul>
<h3 id="配置-argocd-仓库访问权限-可选" tabindex="-1"><a class="header-anchor" href="#配置-argocd-仓库访问权限-可选" aria-hidden="true">#</a> 配置 ArgoCD 仓库访问权限（可选）</h3>
<p>在实际场景下，我们存放应用定义的仓库一般都是私有仓库，这就需要为 ArgoCD 配置仓库访问权限。</p>
<p>你可以通过下面的 ArgoCD CLI 工具来为 ArgoCD 添加仓库访问权限。</p>
<p>在使用 ArgoCD CLI 工具之前，你需要先执行 argocd login 命令登录。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>argocd login <span class="token number">127.0</span>.0.1:8080 <span class="token parameter variable">--insecure</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意，这里我们指定了 ArgoCD 的服务端地址为 127.0.0.1:8080，并且使用了 --insecur 参数来跳过 SSL 认证，你需要保持在上面运行的端口转发命令才能够顺利登录。</p>
<p>登录成功后，通过 argocd repo add 命令添加你的示例应用仓库。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ argocd repo <span class="token function">add</span> https://github.com/lyzhang1999/kubernetes-example.git <span class="token parameter variable">--username</span> <span class="token variable">$USERNAME</span> <span class="token parameter variable">--password</span> <span class="token variable">$PASSWORD</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里要注意将仓库地址修改为你实际的 GitHub 仓库地址，并将 <code v-pre>$USERNAME</code> 替换为 GitHub 账户 ID，将 <code v-pre>$PASSWORD</code> 替换为 GitHub Personal Token。你可以在这个页面创建 GitHub Personal Token，并赋予仓库相关权限，如下图所示。</p>
<p><img src="http://sm.nsddd.top/sm202311131558750.png" alt="image-20231113155844653"></p>
<p>接下来，就可以创建 ArgoCD 应用了。ArgoCD 同时支持使用 Helm Chart、Kustomize 和 Manifest 来创建应用，这里我们以示例应用的 Helm Chart 为例。</p>
<p>你可以通过 argocd app create 命令来创建应用。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>$ argocd app create example <span class="token operator">--</span>sync<span class="token operator">-</span>policy automated <span class="token operator">--</span>repo https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>lyzhang1999<span class="token operator">/</span>kubernetes<span class="token operator">-</span>example<span class="token punctuation">.</span>git <span class="token operator">--</span>revision main <span class="token operator">--</span>path helm <span class="token operator">--</span>dest<span class="token operator">-</span>namespace gitops<span class="token operator">-</span>example <span class="token operator">--</span>dest<span class="token operator">-</span>server https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>kubernetes<span class="token punctuation">.</span><span class="token keyword">default</span><span class="token punctuation">.</span>svc <span class="token operator">--</span>sync<span class="token operator">-</span>option CreateNamespace<span class="token operator">=</span><span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里我简单解释一下每个参数的作用。</p>
<ul>
<li><code v-pre>–sync-policy</code> 参数代表设置自动同步策略。automated 的含义是自动同步，也就是说当集群内的资源和 Git 仓库 Helm Chart 定义的资源有差异时，ArgoCD 会自动执行同步操作，实时确保集群资源和 Helm Chart 的一致性。</li>
<li><code v-pre>–repo</code> 参数表示 Helm Chart 的仓库地址。这里的值是示例应用的仓库地址，注意需要替换成你实际的 Git 仓库地址。</li>
<li><code v-pre>–revision</code> 参数表示需要跟踪的分支或者 Tag，这里我们让 ArgoCD 跟踪 main 分支的改动。</li>
<li><code v-pre>–path</code> 参数表示 Helm Chart 的路径。在示例应用中，存放 Helm Chart 的目录是 helm 目录。</li>
<li><code v-pre>–dest-namespace</code> 参数表示命名空间。这里指定了 gitops-example 命名空间，注意，这是一个不存在的命名空间，所以我们额外通过 --sync-option 参数来让 ArgoCD 自动创建这个命名空间。</li>
<li><code v-pre>–dest-server</code> 参数表示要部署的集群，https://kubernetes.default.svc 表示 ArgoCD 所在的集群。</li>
</ul>
<h2 id="查看-argocd-同步状态" tabindex="-1"><a class="header-anchor" href="#查看-argocd-同步状态" aria-hidden="true">#</a> 查看 ArgoCD 同步状态</h2>
<p>创建好应用之后，GitOps 工作流中的自动同步部分也就建立起来了。现在，你可以打开 ArgoCD 控制台，进入左侧的“Application”菜单来查看示例应用详情。</p>
<p><img src="http://sm.nsddd.top/sm202311131615541.png" alt="image-20231113161506439"></p>
<p>在应用详情页面，我们需要重点关注三个状态。</p>
<p><strong>APP HEALTH：应用整体的健康状态，它包含下面三个值。</strong></p>
<ul>
<li>Progressing：处理中</li>
<li>Healthy：健康状态</li>
<li>Degraded：宕机</li>
</ul>
<p><strong>CURRENT SYNC STATUS： 应用定义和集群对象的差异状态，也包含下面三个值。</strong></p>
<ul>
<li>Synced：完全同步</li>
<li>OutOfSync：存在差异</li>
<li>Unknown：未知</li>
</ul>
<p><strong>LAST SYNC RESULT：最后一次同步到 Git 仓库的信息，包括 Commit ID 和提交者信息。</strong></p>
<p><strong>访问应用</strong></p>
<p>当应用健康状态变为 Healthy 之后，我们就可以访问应用了。</p>
<p>在这之前，如果你已经在 example 命名空间下手动部署了示例应用，为了避免 Ingress 策略冲突，你需要先删除这个命名空间。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl delete ns example
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，使用浏览器访问 http://127.0.0.1，你应该能看到示例应用的界面，如下图所示。</p>
<h2 id="连接-gitops-工作流" tabindex="-1"><a class="header-anchor" href="#连接-gitops-工作流" aria-hidden="true">#</a> 连接 GitOps 工作流</h2>
<p>在完成 ArgoCD 的应用配置之后，我们就已经将示例应用的 Helm Chart 定义和集群资源关联起来了，但整个 GitOps 工作流还缺少非常重要的一部分，就是我在上面提到的自动更新 Helm Chart values.yaml 文件镜像版本的部分，我在下面这张示意图中用“❌”把这个环节标记了出来。</p>
<p><img src="http://sm.nsddd.top/sm202311131619876.png" alt="image-20231113161933798"></p>
<p>在这部分工作流没有打通之前，提交的新代码虽然会构建出新的镜像，但是 Helm Chart 定义的镜像版本并不会产生变化，这会导致 ArgoCD 不能自动更新集群内工作负载的镜像版本。</p>
<p>要解决这个问题，我们还需要在 GitHub Action 中添加自动修改 Helm Chart 并重新推送到仓库操作。</p>
<p>接下来，我们修改示例应用的 <code v-pre>.github/workflows/build.yaml</code> 文件，在“Build frontend and push”阶段后面添加一个新的阶段，代码如下。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>- name: Update helm values.yaml
  uses: fjogeleit/yaml-update-action@main
  with:
    valueFile: <span class="token string">'helm/values.yaml'</span>
    commitChange: <span class="token boolean">true</span>
    branch: main
    message: <span class="token string">'Update Image Version to ${{ steps.vars.outputs.sha_short }}'</span>
    changes: <span class="token operator">|</span>
      <span class="token punctuation">{</span>
        <span class="token string">"backend.tag"</span><span class="token builtin class-name">:</span> <span class="token string">"<span class="token variable">${{ steps.vars.outputs.sha_short }</span>}"</span>,
        <span class="token string">"frontend.tag"</span><span class="token builtin class-name">:</span> <span class="token string">"<span class="token variable">${{ steps.vars.outputs.sha_short }</span>}"</span>
      <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，我使用了 GitHub Action 中 yaml-update-action 插件来修改 values.yaml 文件并把它推送到仓库。如果你是使用 GitLab 或者 Tekton 构建镜像，可以调用 yq 命令行工具来修改 YAML 文件，再使用 git 命令行将变更推送到仓库。</p>
<p>到这里，一个完整的 GitOps 工作流就建立好了。</p>
<h2 id="体验-gitops-工作流" tabindex="-1"><a class="header-anchor" href="#体验-gitops-工作流" aria-hidden="true">#</a> 体验 GitOps 工作流</h2>
<p>接下来，你可以尝试修改 frontend/src/App.js 文件，例如修改文件第 49 行的“Hi! I am a geekbang”。修改完成后，将代码推送到 GitHub 仓库 main 分支，此时，GitHub Action 会自动构建镜像，并且还会更新代码仓库中 Helm <code v-pre>values.yaml</code> 文件的镜像版本。</p>
<p><img src="http://sm.nsddd.top/sm202311131620038.png" alt="image-20231113162058980"></p>
<p>ArgoCD 默认每 3 分钟会拉取仓库检查是否有新的提交，你也可以在 ArgoCD 控制台手动点击 Sync 按钮来触发同步。</p>
<p><img src="http://sm.nsddd.top/sm202311131621365.png" alt="image-20231113162159315"></p>
<p>ArgoCD 同步完成后，我们可以在“LAST SYNC RESULT”一栏中看到 GitHub Action 修改 values.yaml 的提交记录，当应用状态为 Healthy 时，我们就可以访问新的应用版本了。</p>
<p><img src="http://sm.nsddd.top/sm202311131622578.png" alt="image-20231113162210506"></p>
<p>从截图可以看出，前端界面输出内容为“Hi, I am GitOps workflow”，说明 ArgoCD 已经将新版本的应用部署到集群中了。</p>
<h2 id="监听镜像" tabindex="-1"><a class="header-anchor" href="#监听镜像" aria-hidden="true">#</a> 监听镜像</h2>
<p>在开发和发布分工明确的团队中，我更推荐你将源码和应用定义分离，考虑到安全性和发布的严谨性，也尽量不要通过 CI 直接修改应用定义。</p>
<p>更合理的研发规范设计应该是这样的：开发负责编写代码，并通过 CI 生成制品，也就是 Docker 镜像，并对生成的制品负责。而基础架构部门或者 SRE 团队则对应用定义负责。在发布环节，开发可以随时控制要发布的镜像版本，而无需关注其他的应用细节，他们之间的工作流程图如下。</p>
<p><img src="http://sm.nsddd.top/sm202311131637652.png" alt="image-20231113163746574"></p>
<p>从上面这张工作流程图我们可以看出，开发和 SRE 团队各司其职，只操作和自己相关的 Git 仓库，互不干扰。但 SRE 团队要怎么知道开发团队什么时候发布以及发布什么版本的镜像呢？</p>
<p>最原始的办法是：开发在需要发布的时候将镜像版本告诉 SRE 团队，SRE 团队手动修改 Helm Chart 镜像版本并推送到 Git 仓库，等待 ArgoCD 同步完成。</p>
<p>借助 ArgoCD Image Updater，我们可以让 ArgoCD 自动监控镜像仓库的更新情况，一旦工作负载的镜像版本有更新，ArgoCD 就会自动将工作负载升级为新的镜像版本，并且还可以自动将镜像的版本号回写到 Helm Chart 仓库中，保持应用定义和集群状态的一致性。</p>
<p>这节课，我会进一步改造在上一节课创建的 GitOps 工作流，并加入 ArgoCD Image Updater，实现自动监听镜像变更以及回写 Helm Chart。</p>
<p><img src="http://sm.nsddd.top/sm202311131638364.png" alt="image-20231113163823286"></p>
<p>此外，由于在日常开发中，我们一般会采用多分支进行开发，这就随时可能产生新的镜像版本。为了将开发过程和需要发布到生产环境的镜像区分开，我们会为 Main 分支构建出来的镜像增加一个 Prefix 标识，例如 <code v-pre>main-${commit_Id}</code>，并配置 ArgoCD Image Updater 只监控包含特定标识的镜像版本。</p>
<p>最终实现的效果是，当开发将代码提交到 Git 仓库 Main 分支后，将触发自动构建，并将新的镜像版本推送到镜像仓库。ArgoCD Image Updater 会以 Poll 的方式每 2 分钟检查一次工作负载的镜像是否有新的版本，如果有，那么就将工作负载的镜像更新为最新版本，并将镜像版本号写入到存放 Helm Chart 的仓库中。</p>
<p><strong>安装：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-n</span> argocd <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/stable/manifests/install.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="创建-image-pull-secret-可选" tabindex="-1"><a class="header-anchor" href="#创建-image-pull-secret-可选" aria-hidden="true">#</a> 创建 Image Pull Secret（可选）</h2>
<p>由于 ArgoCD 会主动 Poll 镜像仓库来检查是否存在新版本，如果你使用的是私有镜像仓库，那么你需要创建 Secret 对象，以便为 ArgoCD 提供访问镜像仓库的权限。</p>
<p>以 DockerHub 仓库为例，执行下面的命令来创建 Secret 对象。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl create <span class="token parameter variable">-n</span> argocd secret docker-registry dockerhub-secret <span class="token punctuation">\</span>
  --docker-username <span class="token variable">$DOCKER_USERNAME</span> <span class="token punctuation">\</span>
  --docker-password <span class="token variable">$DOCKER_PERSONAL_TOKEN</span> <span class="token punctuation">\</span>
  --docker-server <span class="token string">"https://registry-1.docker.io"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意将 <code v-pre>$DOCKER_USERNAME</code> 和 <code v-pre>$DOCKER_PERSONAL_TOKEN</code> 替换为 Docker Hub 用户名和个人凭据。如果你忘记如何创建 Docker Personal Token 了，可以查看第 16 讲的内容。另外关于如何为其他镜像仓库类型配置凭据，你可以查看这份文档。</p>
<h2 id="创建-helm-chart-仓库" tabindex="-1"><a class="header-anchor" href="#创建-helm-chart-仓库" aria-hidden="true">#</a> 创建 Helm Chart 仓库</h2>
<p>接下来，我们需要为示例应用的 helm 目录单独创建一个 Git 仓库，在将 kubernetes-example克隆到本地后，执行下面的命令。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> $ cp -r ./kubernetes-example/helm ./kubernetes-example-helm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，进入 kubernetes-example-helm 目录并初始化 Git。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">cd</span> kubernetes-example-helm <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>前往 GitHub 创建一个新的仓库，将其命名为 kubernetes-example-helm。</p>
<p>将 kubernetes-example-helm 提交到远端仓库中。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ git add .
$ git commit -m "first commit"
$ git branch -M main
$ git remote add origin https://github.com/lyzhang1999/kubernetes-example-helm.git
$ git push -u origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="创建-argocd-application" tabindex="-1"><a class="header-anchor" href="#创建-argocd-application" aria-hidden="true">#</a> 创建 ArgoCD Application</h2>
<p>创建好 kubernetes-example-helm 仓库之后，接下来我们需要使用它创建一个新的应用。</p>
<h2 id="删除旧应用-可选" tabindex="-1"><a class="header-anchor" href="#删除旧应用-可选" aria-hidden="true">#</a> 删除旧应用（可选）</h2>
<p>在正式创建新的应用之前，为了避免 Ingress 策略冲突，如果你已经按照上节课的内容创建了 ArgoCD example 应用，需要先删除应用及其资源，你可以使用下面的命令来删除应用。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ argocd app delete example <span class="token parameter variable">--cascade</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="配置仓库访问权限" tabindex="-1"><a class="header-anchor" href="#配置仓库访问权限" aria-hidden="true">#</a> 配置仓库访问权限</h2>
<p>此外，上节课我们创建 ArgoCD 应用时，虽然同样配置了仓库访问权限，但这里的步骤额外还实现了一个重要的功能：为 ArgoCD Image Updater 提供回写 kubernetes-example-helm 仓库的权限。</p>
<p>要配置仓库访问权限，你可以使用 argocd repo add 命令。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>$ argocd repo add https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>lyzhang1999<span class="token operator">/</span>kubernetes<span class="token operator">-</span>example<span class="token operator">-</span>helm<span class="token punctuation">.</span>git <span class="token operator">--</span>username $USERNAME <span class="token operator">--</span>password $PASSWORD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意要将仓库地址修改为你新创建的用于存放 Helm Chart 的 GitHub 仓库地址，并将 <code v-pre>$USERNAME</code> 替换为 GitHub 账户 ID，将 <code v-pre>$PASSWORD</code> 替换为 GitHub Personal Token。你可以在这个页面创建 GitHub Personal Token，并赋予仓库相关权限。</p>
<h2 id="创建-argocd-应用-1" tabindex="-1"><a class="header-anchor" href="#创建-argocd-应用-1" aria-hidden="true">#</a> 创建 ArgoCD 应用</h2>
<p>接下来我们正式创建 ArgoCD 应用。在上一节课中，我们是使用 argocd app create 命令创建的 ArgoCD 应用 。实际上，它会创建一个特殊类型的资源，也就是 ArgoCD Application，它和 K8s 其他标准的资源对象一样，也是使用 YAML 来定义的。</p>
<p>在这里，我们直接使用 YAML 来创建新的 Application，将下面的文件内容保存为 application.yaml。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: example
  annotations:
    argocd-image-updater.argoproj.io/backend.allow-tags: regexp:^main
    argocd-image-updater.argoproj.io/backend.helm.image-name: backend.image
    argocd-image-updater.argoproj.io/backend.helm.image-tag: backend.tag
    argocd-image-updater.argoproj.io/backend.pull-secret: pullsecret:argocd/dockerhub-secret
    argocd-image-updater.argoproj.io/frontend.allow-tags: regexp:^main
    argocd-image-updater.argoproj.io/frontend.helm.image-name: frontend.image
    argocd-image-updater.argoproj.io/frontend.helm.image-tag: frontend.tag
    argocd-image-updater.argoproj.io/frontend.pull-secret: pullsecret:argocd/dockerhub-secret
    argocd-image-updater.argoproj.io/image-list: <span class="token assign-left variable">frontend</span><span class="token operator">=</span>lyzhang1999/frontend, <span class="token assign-left variable">backend</span><span class="token operator">=</span>lyzhang1999/backend
    argocd-image-updater.argoproj.io/update-strategy: latest
    argocd-image-updater.argoproj.io/write-back-method: <span class="token function">git</span>
spec:
  destination:
    namespace: gitops-example-updater
    server: https://kubernetes.default.svc
  project: default
  source:
    path: <span class="token builtin class-name">.</span>
    repoURL: https://github.com/lyzhang1999/kubernetes-example-helm.git
    targetRevision: main
  syncPolicy:
    automated: <span class="token punctuation">{</span><span class="token punctuation">}</span>
    syncOptions:
      - <span class="token assign-left variable">CreateNamespace</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，使用 kubectl apply 命令创建 ArgoCD Application，效果等同于使用 argocd app create 命令创建应用。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-n</span> argocd <span class="token parameter variable">-f</span> application.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>ArgoCD Image Updater 通过 Application Annotations 标签来实现对应的功能，我简单解释一下每一个标签的作用。</p>
<ul>
<li><code v-pre>argocd-image-updater.argoproj.io/image-list</code>：指定需要监听的镜像，这里我们指定示例应用的前后端镜像 lyzhang1999/frontend 和 lyzhang1999/backend，同时为前后端镜像法指定了别名，分别为 frontend 和 backend。这里的别名非常重要，会影响下面所有的设置。</li>
<li><code v-pre>argocd-image-updater.argoproj.io/update-strategy</code>：指定镜像更新策略。注意，latest 并不代表监听 latest 镜像版本，而是以最新推送的镜像作为更新策略。此外，semver 策略可以识别最高语义化版本的标签，digest 策略可以用来区分同一 Tag 下不同镜像 digest 的变更。</li>
<li><code v-pre>argocd-image-updater.argoproj.io/write-back-method</code>：表示将镜像版本回写到镜像仓库。注意，这里对仓库的写权限来源于使用 argocd repo add 命令为 ArgoCD 配置的仓库访问权限。</li>
<li><code v-pre>argocd-image-updater.argoproj.io/&lt; 镜像别名 &gt;.pull-secret</code>：为不同的镜像别名指定镜像拉取凭据。</li>
<li><code v-pre>argocd-image-updater.argoproj.io/&lt; 镜像别名 &gt;.allow-tags</code>：配置符合更新条件的镜像 Tag，在这里我们使用正则表达式匹配那些镜像 Tag 以 main 开头的镜像版本，其他镜像版本则忽略。</li>
<li><code v-pre>argocd-image-updater.argoproj.io/&lt; 镜像别名 &gt;.helm.image-tag</code>：配置 Helm Chart values.yaml 镜像版本所在的节点，在示例应用中，backend.tag 和 frontend.tag 是 values.yaml 配置镜像版本的节点，ArgoCD 在回写仓库时将会覆盖这个值。</li>
</ul>
<h2 id="体验-gitops-工作流-1" tabindex="-1"><a class="header-anchor" href="#体验-gitops-工作流-1" aria-hidden="true">#</a> 体验 GitOps 工作流</h2>
<p>接下来，你可以尝试修改 <code v-pre>frontend/src/App.js</code> 文件，例如修改文件第 49 行的“Hi! I am a geekbang”内容。修改完成后，将代码推送到 GitHub 的 main 分支。</p>
<p>此时会触发两个 GitHub Action 工作流。其中，当 build-every-branch 工作流被触发时，它将构建 Tag 为 main 开头的镜像版本，并将其推送到镜像仓库中，如下图所示。</p>
<p><img src="http://sm.nsddd.top/sm202311131655333.png" alt="image-20231113165517265"></p>
<p>和我们上一节课介绍的另一个 GitHub Action 工作流不同的是，它也不会去主动修改 kubernetes-example-helm 仓库的 values.yaml 文件，在完成镜像推送后工作流也就结束了。</p>
<p>与此同时，ArgoCD Image Updater 将会每 2 分钟从镜像仓库检索 frontend 和 backend 的镜像版本，一旦发现有新的并且以 main 开头的镜像版本，它将自动使用新版本来更新集群内工作负载的镜像，并将镜像版本回写到 kubernetes-example-helm 仓库。</p>
<p>在回写时，ArgoCD Image Updater 并不会直接修改仓库的 values.yaml 文件，而是会创建一个专门用于覆盖 Helm Chart values.yaml 的 <code v-pre>.argocd-source-example.yaml</code> 文件。</p>
<p><img src="http://sm.nsddd.top/sm202311131656906.png" alt="image-20231113165601860"></p>
<p>当我们看到这个文件时，说明 ArgoCD Image Updater 已经触发了镜像更新，并且成功将镜像版本回写到了镜像仓库。同时，这个文件记录了详细的覆盖 values.yaml 值的策略。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>helm<span class="token punctuation">:</span>
  parameters<span class="token punctuation">:</span>
  <span class="token operator">-</span> name<span class="token punctuation">:</span> frontend<span class="token punctuation">.</span>image
    value<span class="token punctuation">:</span> lyzhang1999<span class="token operator">/</span>frontend
    forcestring<span class="token punctuation">:</span> <span class="token boolean">true</span>
  <span class="token operator">-</span> name<span class="token punctuation">:</span> frontend<span class="token punctuation">.</span>tag
    value<span class="token punctuation">:</span> main<span class="token operator">-</span>b99bc73
    forcestring<span class="token punctuation">:</span> <span class="token boolean">true</span>
  <span class="token operator">-</span> name<span class="token punctuation">:</span> backend<span class="token punctuation">.</span>image
    value<span class="token punctuation">:</span> lyzhang1999<span class="token operator">/</span>backend
    forcestring<span class="token punctuation">:</span> <span class="token boolean">true</span>
  <span class="token operator">-</span> name<span class="token punctuation">:</span> backend<span class="token punctuation">.</span>tag
    value<span class="token punctuation">:</span> main<span class="token operator">-</span>b99bc73
    forcestring<span class="token punctuation">:</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样，当 ArgoCD 在做自动同步时，会将这份文件的内容覆盖 values.yaml 对应的值，比如 frontend.tag 的值会被覆盖为 main-b99bc73，这样，回写后的 Helm Chart 和集群内资源对象就仍然能够保持一致性。</p>
<p>到这里，我们就完成了通过监听新镜像版本来触发 GitOps 工作流的整个过程。</p>
<p>值得注意的是，在实际的业务场景中，我们一般会使用多分支的模式来开发。这意味着每个分支的每个提交都会产生新的镜像版本，所以，为了区分开发过程的镜像和需要被发布到生产环境的镜像，我在这个例子中约定了以 main 开头的镜像版本即为需要发布到生产环境的镜像版本。你可以根据项目的实际情况做调整，例如使用诸如 v1.0.0 的版本号来区分，同时更新 <code v-pre>argocd-image-updater.argoproj.io/&lt; 镜像别名 &gt;.allow-tags</code> 字段的正则表达式。</p>
<h2 id="features" tabindex="-1"><a class="header-anchor" href="#features" aria-hidden="true">#</a> Features</h2>
<ul>
<li>将应用程序自动部署到指定的目标环境</li>
<li>支持多种配置管理/模板工具（Kustomize、Helm、Jsonnet、plain-YAML）</li>
<li>能够管理和部署到多个群集</li>
<li>SSO集成（OIDC，OAuth2，LDAP，SAML 2.0，GitHub，GitLab，Microsoft，LinkedIn）</li>
<li>用于授权的多租户和RBAC策略</li>
<li>Rollback/Roll-anywhere到Git存储库中提交的任何应用程序配置</li>
<li>应用程序资源的健康状况分析</li>
<li>自动配置漂移检测和可视化</li>
<li>自动或手动将应用程序同步到所需状态</li>
<li>提供应用程序活动实时视图的Web UI</li>
<li>Webhook集成（GitHub，BitBucket，GitLab）</li>
<li>用于自动化的访问令牌</li>
<li>应用程序事件和API调用的审计跟踪</li>
<li>参数覆盖用于覆盖Git中的helm参数</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
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


