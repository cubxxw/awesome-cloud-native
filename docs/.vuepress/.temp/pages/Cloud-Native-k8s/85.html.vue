<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第85节-argocd-vs-fluxcd-vs-jenkins-x-哪个gitops实现工具最适合你" tabindex="-1"><a class="header-anchor" href="#第85节-argocd-vs-fluxcd-vs-jenkins-x-哪个gitops实现工具最适合你" aria-hidden="true">#</a> 第85节 ArgoCD vs FluxCD vs Jenkins X：哪个GitOps实现工具最适合你？</h1>
<div><a href = '84.md' style='float:left'>⬆️上一节🔗  </a><a href = '86.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<p>随着GitOps实践的发展势头，一些玩家带着新的工具、计划和理念进入了游戏。</p>
<p>GitOps是一个分布式版本控制范例，其中所有资源和清单都在git中定义。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>
<ul>
<li>Flux: https://github.com/fluxcd/flux2</li>
<li>argo CD: https://github.com/argoproj/argo-cd</li>
<li>Prow: https://prow.k8s.io/</li>
<li>JX: https://github.com/jenkins-x/jx</li>
</ul>
<p><strong>具体介绍：</strong></p>
<ol>
<li><strong>ArgoCD vs FluxCD</strong>:
<ul>
<li>这两个都是Kubernetes的GitOps工具，它们可以自动化Kubernetes集群的部署。</li>
<li><strong>ArgoCD</strong> 强在其UI界面和应用依赖关系的可视化。</li>
<li><strong>FluxCD</strong> 则在集成和扩展性方面表现更好，比如与Helm和Kustomize的集成。</li>
<li>对于OpenIM这样的即时通讯项目，选择哪个更多取决于您的团队对UI的需求和对集成的偏好。</li>
</ul>
</li>
<li><strong>Jenkins X</strong>:
<ul>
<li>Jenkins X是为Kubernetes优化的CI/CD解决方案，支持云原生应用的持续集成和持续部署。</li>
<li>它提供了一套完整的开发工作流程，包括构建、测试和部署。</li>
<li>如果OpenIM项目需要复杂的构建管道和定制化CI/CD流程，Jenkins X可能是一个不错的选择。</li>
</ul>
</li>
<li><strong>Prow</strong>:
<ul>
<li>Prow是Kubernetes的CI/CD系统，常用于Kubernetes项目本身。</li>
<li>它适用于对GitHub仓库进行自动化管理，特别适合大型、分布式的开发项目。</li>
<li>如果OpenIM项目与Kubernetes密切相关，或者您希望实现与GitHub深度集成的自动化，Prow是个好选择。</li>
</ul>
</li>
</ol>
<h2 id="gitops-tooling" tabindex="-1"><a class="header-anchor" href="#gitops-tooling" aria-hidden="true">#</a> GitOps Tooling</h2>
<p>到目前为止，Jenkins X、ArgoCD和Flux等开源项目一直在推动GitOps的发展。由于GitOps空间仍处于起步阶段，这些开源项目已经开发了实现GitOps的本地方法。</p>
<p>让我们详细讨论这些工具 ：</p>
<h2 id="argocd" tabindex="-1"><a class="header-anchor" href="#argocd" aria-hidden="true">#</a> ArgoCD</h2>
<p>我认为 ArgoCD 是 gitops 中最有代表性的项目。</p>
<p>ArgoCD是Kubernetes的声明式CD工具。作为Argo家族的一部分，ArgoCD已在CNCF内孵化。所有资源都在Git repo中定义，因为Argo可以直接与部署交互。</p>
<p>CLI和相应的UI提供了一个全面的工具集，便于将git定义的资源部署到Kubernetes集群。</p>
<p>它专注于管理应用程序部署，具有出色的功能集，包括几个同步选项，用户访问控制，状态检查等。</p>
<p>此外，ArgoCD还具有友好的现代Web UI，用户可以在其中检查其应用程序部署的状态。同时，管理员可以管理项目和用户访问。</p>
<p><img src="http://sm.nsddd.top/sm202311131003498.png" alt="image-20231113100313215"></p>
<h3 id="argo-cd-介绍" tabindex="-1"><a class="header-anchor" href="#argo-cd-介绍" aria-hidden="true">#</a> Argo CD 介绍</h3>
<p>Argo CD以原生Kubernetes方式安装和管理。它在Kubernetes上运行在自己的命名空间中，所有配置都保存在 Config Maps，Secrets 和 Custom Resources 中。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create namespace argocd
kubectl apply <span class="token parameter variable">-n</span> argocd <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后继续：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>kubectl create namespace argocd kubectl apply <span class="token operator">-</span>n argocd <span class="token operator">-</span>f https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>argoproj<span class="token operator">/</span>argo<span class="token operator">-</span>cd<span class="token operator">/</span>stable<span class="token operator">/</span>manifests<span class="token operator">/</span>install<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>介绍：</strong></p>
<ul>
<li>
<p>它通过称为项目的概念提供多租户。</p>
</li>
<li>
<p>它可以同步Kubernetes集群，同时也能够处理外部集群。</p>
</li>
<li>
<p>它解决了GitOps的资源从配置漂移的挑战。就像Flux一样，ArgoCD也检测漂移的资源。</p>
</li>
<li>
<p>ArgoCD可以在同步过程中删除过时的资源。</p>
</li>
</ul>
<h2 id="flux-cd" tabindex="-1"><a class="header-anchor" href="#flux-cd" aria-hidden="true">#</a> Flux CD</h2>
<p>虽然Weaveworks开发了Flux，但它目前是CNCF项目。与ArgoCD类似，Flux也是Kubernetes的持续交付工具。</p>
<p>Flux CD是Kubernetes的GitOps操作符，它将Git存储库中的清单状态转换为集群中正在运行的状态。Flux CD在应用更新的集群中运行。</p>
<p>虽然在Git中定义部署资源的原则与ArgoCD相似，但部署是基于拉取请求，而不是与Kubernetes集群直接交互。</p>
<p><img src="http://sm.nsddd.top/sm202311131017040.png" alt="image-20231113101701001"></p>
<h3 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-s</span>  <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">bash</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用flux bootstrap命令，您可以在Kubernetes集群上安装Flux，并将其配置为从Git存储库管理自身。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>flux bootstrap git
<span class="token punctuation">-</span><span class="token punctuation">-</span>url=ssh<span class="token punctuation">:</span>//git@//
<span class="token punctuation">-</span><span class="token punctuation">-</span>branch=
<span class="token punctuation">-</span><span class="token punctuation">-</span>path=clusters/my<span class="token punctuation">-</span>cluster
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="features" tabindex="-1"><a class="header-anchor" href="#features" aria-hidden="true">#</a> Features</h3>
<ul>
<li>它会自动部署新版本的容器镜像。</li>
<li>它允许重新应用漂移的资源。</li>
<li>它维护垃圾回收并删除在前一阶段中未同步的对象。</li>
</ul>
<p>Flux有一个简单的设计，只支持一个仓库--这既是优点也是缺点。虽然它使其易于理解和使用，但当存在多个集群时，它会变成一个限制。</p>
<h2 id="jenkins-x" tabindex="-1"><a class="header-anchor" href="#jenkins-x" aria-hidden="true">#</a> Jenkins X</h2>
<p>Jenkins X抛弃了主工作节点的架构，被开发为Kubernetes原生CI/CD引擎。这个开源的完整CI/CD解决方案是围绕GitOps构建的，并使用Tekton。</p>
<p>虽然这个名字可能会给给予暗示，Jenkins X可能是Jenkins的下一个版本，但Jenkins X与Jenkins几乎没有相似之处，并且有不同的方向。</p>
<p>值得注意的是，除了基于GitOps的部署功能外，Jenkins X还涵盖了更广泛的开发周期，包括CI管道的构建和测试阶段以及构建和存储容器映像。</p>
<p>Jenkins X设置Kaniko和Skaffold来构建容器镜像，Helm charts用于打包Kubernetes清单。‍</p>
<h2 id="对比" tabindex="-1"><a class="header-anchor" href="#对比" aria-hidden="true">#</a> 对比</h2>
<p>Argo CD和Flux CD基本上都是CD（Continues Delivery）工具。另一方面，Jenkins X是一个完整的CI/CD（持续集成和持续交付）工具。</p>
<p>由于Jenkins X是一个CI/CD工具，因此您不必设置CI管道。但是，在使用其他工具时，必须单独设置CI管道。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '84.md' style='float:left'>⬆️上一节🔗  </a><a href = '86.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


