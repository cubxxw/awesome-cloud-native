<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第70节-kubernetes-社区规范" tabindex="-1"><a class="header-anchor" href="#第70节-kubernetes-社区规范" aria-hidden="true">#</a> 第70节 Kubernetes 社区规范</h1>
<div><a href = '69.md' style='float:left'>⬆️上一节🔗  </a><a href = '71.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>一个顶级的社区，必然有着最全面和最规范的章程值得我们学习和借鉴，对于 Kubernetes 来说也是如此，如果想要做好一个顶级的社区，Kubernetes 必然值得我们去借鉴的。</p>
<p>用官方的一句话来描述：Kubernetes builds upon a decade and a half of experience at Google running production workloads at scale using a system called <a href="https://research.google.com/pubs/pub43438.html" target="_blank" rel="noopener noreferrer">Borg<ExternalLinkIcon/></a>, combined with best-of-breed ideas and practices from the community.</p>
<h2 id="community" tabindex="-1"><a class="header-anchor" href="#community" aria-hidden="true">#</a> Community</h2>
<p>Community 的地址在 <a href="https://github.com/kubernetes/community" target="_blank" rel="noopener noreferrer">https://github.com/kubernetes/community<ExternalLinkIcon/></a> 。很多社区的社区都是这样设计的。</p>
<p>Kubernetes具有以下类型的官方支持的组（greps）：</p>
<ul>
<li>
<p><strong>Committees</strong>：委员会是一批被授权处理敏感话题的人。鼓励该小组在完成其使命时尽可能开放，但由于所讨论主题的性质，允许私下交流。委员会的例子包括指导委员会和安全或行为准则等。</p>
</li>
<li>
<p><strong>Special Interest Groups (SIGs)</strong>  特殊兴趣小组（SIG）是专注于项目某个部分的持续性开放小组。特别政府必须有公开和透明的程序。欢迎任何人参与和贡献，只要他们遵守Kubernetes行为准则。SIG的目的是拥有和开发一组子项目。</p>
<p>子项目每个SIG可以有一组子项目。这些是可以独立工作的小团体。一些子项目将是Kubernetes主要交付成果的一部分，而其他子项目则更具推测性，位于 <code v-pre>kubernetes-sigs</code> <a href="https://github.com/kubernetes-sigs" target="_blank" rel="noopener noreferrer">github org<ExternalLinkIcon/></a> 中（例如 <a href="https://github.com/kubernetes-sigs/kind" target="_blank" rel="noopener noreferrer">kind<ExternalLinkIcon/></a> 和 <a href="https://github.com/kubernetes-sigs/kubebuilder" target="_blank" rel="noopener noreferrer">kubebuilder<ExternalLinkIcon/></a> 就是在这里）。</p>
</li>
<li>
<p><strong>Working Groups</strong> 工作组是为解决跨越SIG边界的问题而成立的临时小组。工作组不拥有任何代码或其他长期工件。工作组可以通过参与的SIG进行汇报和采取行动。</p>
</li>
<li>
<p><strong>User Groups</strong> 用户组是用于促进交流和发现与Kubernetes大用户组具有长期相关性的主题相关的信息的组。他们没有Kubernetes代码库的部分所有权。</p>
</li>
</ul>
<p>SIG可以有自己的贡献策略（在此存储库的SIG文件夹中的 <code v-pre>README</code> 或 <code v-pre>CONTRIBUTING</code> 文件中描述）（例如<a href="https://github.com/kubernetes/community/blob/master/sig-cli/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">sig-cli/CONTRIBUTING.md<ExternalLinkIcon/></a>），以及自己的邮件列表、空闲通道等。</p>
<p>所以是独立出去的，不过依旧是为 kubernetes 服务的。</p>
<p>Kubernetes-sig 社区提供了 Kubernetes 的开发学习实验，在 <a href="https://github.com/kubernetes/community/blob/master/contributors/devel/development.md" target="_blank" rel="noopener noreferrer">https://github.com/kubernetes/community/blob/master/contributors/devel/development.md<ExternalLinkIcon/></a> 中</p>
<p>告诉了我们如何构建出一个开发环境，并且需要哪些工具。其实和我们在前面二进制搭建是差不多类似的。</p>
<p>Kubernetes 为贡献 git CICD 流程有一个帮助文档在这里: <a href="https://github.com/kubernetes/community/blob/master/contributors/guide/github-workflow.md" target="_blank" rel="noopener noreferrer">https://github.com/kubernetes/community/blob/master/contributors/guide/github-workflow.md<ExternalLinkIcon/></a></p>
<p>要测试Kubernetes，你需要安装最新版本的etcd，这是一个一致且高度可用的键值存储。要安装本地版本的etcd，请在Kubernetes工作目录中运行以下命令。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>./hack/install-etcd.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此脚本将指示你对 <code v-pre>PATH</code> 进行更改。要使其永久化，请将其添加到你的 <code v-pre>.bashrc</code> 或登录脚本中：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">"<span class="token variable">$GOPATH</span>/src/k8s.io/kubernetes/third_party/etcd:<span class="token variable">${<span class="token environment constant">PATH</span>}</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="makefile" tabindex="-1"><a class="header-anchor" href="#makefile" aria-hidden="true">#</a> Makefile</h3>
<p>我们即使知道了对于一个开发者来说，一个 Makefile 文档带来的帮助是巨大的。</p>
<p>要构建Kubernetes的特定部分，请使用 <code v-pre>WHAT</code> 环境变量。在Kubernetes项目目录 <code v-pre>$GOPATH/src/k8s.io/kubernetes/</code> 中，运行以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> <span class="token assign-left variable">WHAT</span><span class="token operator">=</span>cmd/<span class="token operator">&lt;</span>subsystem<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将 <code v-pre>&lt;subsystem&gt;</code> 替换为 <code v-pre>cmd/</code> 目录下的命令文件夹之一。例如，要构建 <code v-pre>kubectl</code> CLI，请运行以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> <span class="token assign-left variable">WHAT</span><span class="token operator">=</span>cmd/kubectl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果此命令成功，你现在将在Kubernetes项目目录的 <code v-pre>_output/bin/kubectl</code> 处拥有一个可执行文件。</p>
<p>要构建整个Kubernetes项目，请运行以下命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>make all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：你可以省略 <code v-pre>all</code> ，只运行 <code v-pre>make</code> 。</p>
<p>Kubernetes构建系统默认将报告的Go编译器错误数量限制为10。如果你想删除此限制，请在命令行中添加 <code v-pre>GOGCFLAGS=&quot;-e&quot;</code> 。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> <span class="token assign-left variable">WHAT</span><span class="token operator">=</span><span class="token string">"cmd/kubectl"</span> <span class="token assign-left variable">GOGCFLAGS</span><span class="token operator">=</span><span class="token string">"-e"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你需要在已编译的Kubernetes可执行文件上使用调试检查工具，请设置DBG=1。例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> <span class="token assign-left variable">WHAT</span><span class="token operator">=</span><span class="token string">"cmd/kubectl"</span> <span class="token assign-left variable">DBG</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要为所有平台交叉编译Kubernetes，请运行以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> cross
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要为特定平台构建二进制文件，请添加 <code v-pre>KUBE_BUILD_PLATFORMS=&lt;os&gt;/&lt;arch&gt;</code> 。例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> cross <span class="token assign-left variable">KUBE_BUILD_PLATFORMS</span><span class="token operator">=</span>windows/amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要运行所有提交前验证测试，请使用以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> verify
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果某个特定的验证测试失败，可能会有一个更新脚本来帮助解决问题。它们位于 <code v-pre>hack/update-*.sh</code> 。例如， <code v-pre>hack/update-gofmt.sh</code> 确保所有源代码文件的格式正确。向项目中添加新文件时通常需要此选项。</p>
<p>可以使用此命令运行所有更新脚本：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>ull request需要通过所有单元测试。要运行每个单元测试，请使用以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你还可以使用 <code v-pre>WHAT</code> 选项来控制要测试的包和子系统，并使用 <code v-pre>GOFLAGS</code> 来更改测试的运行方式。例如，要对一个包详细运行单元测试，请使用以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> <span class="token builtin class-name">test</span> <span class="token assign-left variable">WHAT</span><span class="token operator">=</span>./pkg/apis/core/helper <span class="token assign-left variable">GOFLAGS</span><span class="token operator">=</span>-v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要运行集成测试，请使用以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> test-integration
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="kubernetes增强建议-kep" tabindex="-1"><a class="header-anchor" href="#kubernetes增强建议-kep" aria-hidden="true">#</a> Kubernetes增强建议（KEP）</h2>
<blockquote>
<p>Kubernetes Enhancement Proposals (KEPs)</p>
</blockquote>
<p>Kubernetes增强提案（KEP）是一种为Kubernetes项目提出，沟通和协调新工作的方式。你可以在KEP-0000中阅读该项目的全部细节。</p>
<p>什么是 KEP？</p>
<p><strong>提出了Kubernetes的标准化开发流程，以便：</strong></p>
<ul>
<li>
<p>为Kubernetes的变更建议提供一个通用的结构</p>
</li>
<li>
<p>确保变更的动机明确</p>
</li>
<li>
<p>允许列举稳定性里程碑和稳定性分级标准</p>
</li>
<li>
<p>在版本控制系统（VCS）中持久保存项目信息，以便将来使用Kubernetes</p>
</li>
<li>
<p>支持创建面向用户的高价值信息，例如：</p>
<ul>
<li>总体项目开发路线图</li>
<li>有影响力的面向用户的变更的动机</li>
</ul>
</li>
<li>
<p>保留GitHub问题用于跟踪正在进行的工作，而不是创建  &quot;umbrella&quot; issues</p>
</li>
<li>
<p>确保社区参与者能够成功地推动一个或多个版本的变更完成，同时在整个过程中充分代表利益相关者</p>
</li>
</ul>
<p><strong>这个过程由一个名为  Kubernetes Enhancement Proposals (KEPs)  或KEP的工作单元支持。KEP尝试将以下方面结合起来</strong></p>
<ul>
<li>功能和工作跟踪文档</li>
<li>产品需求文档</li>
<li>设计文件</li>
</ul>
<p>一个文件，该文件是与一个或多个特殊兴趣组（SIG）协作逐步创建的。</p>
<h2 id="第一次参与-kubernetes" tabindex="-1"><a class="header-anchor" href="#第一次参与-kubernetes" aria-hidden="true">#</a> 第一次参与 Kubernetes</h2>
<ul>
<li><a href="https://github.com/kubernetes/community/blob/master/contributors/guide/first-contribution.md#find-something-to-work-on" target="_blank" rel="noopener noreferrer">这篇文档告诉了我们贡献的一些方法<ExternalLinkIcon/></a></li>
</ul>
<p>以下是你今天可以做的一些事情，以开始贡献：</p>
<ul>
<li>帮助改进Kubernetes文档</li>
<li>阐明可以重命名或注释的代码、变量或函数</li>
<li>写测试覆盖率</li>
<li>帮助分类问题（并不一定需要权限，而是通过命令和机器人）</li>
</ul>
<p>如果上面的建议对你没有吸引力，你可以浏览被标记为 <a href="https://go.k8s.io/good-first-issue" target="_blank" rel="noopener noreferrer">好的第一个问题<ExternalLinkIcon/></a> 的问题，看看谁在寻求帮助。那些有兴趣在不编写代码的情况下进行贡献的人也可以在非代码贡献指南中找到想法。</p>
<h3 id="修改自己的-kubectl-fork" tabindex="-1"><a class="header-anchor" href="#修改自己的-kubectl-fork" aria-hidden="true">#</a> 修改自己的 <code v-pre>kubectl</code> fork</h3>
<p>确保你准备好立即开始之前，你声称任何一块的工作。</p>
<ul>
<li>设置开发环境。</li>
<li>熟悉代码：
<ul>
<li><a href="https://git.k8s.io/kubernetes/cmd/kubectl" target="_blank" rel="noopener noreferrer">kubernetes/cmd/kubectl<ExternalLinkIcon/></a> is the entry point</li>
<li><a href="https://git.k8s.io/kubernetes/pkg/kubectl" target="_blank" rel="noopener noreferrer">kubernetes/pkg/kubectl<ExternalLinkIcon/></a> is the implementation</li>
<li>Look at how some of the other commands are implemented</li>
<li><a href="https://youtu.be/eZeCFRh2uGg?t=538" target="_blank" rel="noopener noreferrer">Codebase Tour<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>尝试添加一个新命令来执行一些简单的操作：
<ul>
<li>添加 <code v-pre>kubectl hello-world</code> ：打印“Hello World”</li>
<li>添加 <code v-pre>kubectl hello-kubernetes -f file</code> ：打印 <code v-pre>Hello&lt;kind of resource&gt;&lt;name of resource&gt;</code></li>
<li>添加 <code v-pre>kubectl hello-kubernetes type/name</code> ：打印 <code v-pre>Hello&lt;kind of resource&gt;&lt;name of resource&gt;&lt;creation time&gt;</code></li>
</ul>
</li>
</ul>
<p>注意：考虑将你的命令发布到一个fork上，这样维护人员就可以查看它。</p>
<h3 id="find-a-good-first-topic" tabindex="-1"><a class="header-anchor" href="#find-a-good-first-topic" aria-hidden="true">#</a> Find a good first topic</h3>
<p>Kubernetes组织中有多个存储库。每个存储库都有初学者友好的问题，这是开始你的贡献者之旅的好地方。例如，kubernetes/kubernetes对于不需要高级Kubernetes知识来贡献的问题有<a href="https://github.com/issues?q=org%3Akubernetes+org%3Akubernetes-sigs+org%3Akubernetes-csi+org%3Akubernetes-client+is%3Aopen+is%3Aissue+label%3A%22help+wanted%22+no%3Aassignee" target="_blank" rel="noopener noreferrer">help wanted<ExternalLinkIcon/></a>和 good first issue标签。 <code v-pre>good first issue</code> 标签还表示Kubernetes成员已承诺为新贡献者提供额外帮助。另一种开始的方法是找到一个文档改进，比如一个丢失/断开的链接，这将给予你接触到代码提交/审查过程，而不会增加技术深度的复杂性。</p>
<h3 id="github中的问题分配" tabindex="-1"><a class="header-anchor" href="#github中的问题分配" aria-hidden="true">#</a> Github中的问题分配</h3>
<blockquote>
<p>Issue Assignment in Github</p>
</blockquote>
<p>当你发现一个问题要解决时，你可以将它分配给自己。</p>
<ul>
<li>就你希望解决的问题回复 <code v-pre>/assign</code> 或 <code v-pre>/assign @yourself</code></li>
<li><a href="https://github.com/k8s-ci-robot" target="_blank" rel="noopener noreferrer">K8s-ci-robot<ExternalLinkIcon/></a> 会自动将问题分配给你。</li>
<li>你的姓名将列在 <code v-pre>Assignees</code> 下。</li>
</ul>
<h3 id="选择合适的-sig" tabindex="-1"><a class="header-anchor" href="#选择合适的-sig" aria-hidden="true">#</a> 选择合适的 sig</h3>
<blockquote>
<p>Find a SIG that is related to your contribution</p>
</blockquote>
<p>为你的贡献找到合适的SIG并添加SIG标签将有助于你在正确的位置提出问题，并给予你的贡献具有更高的可见性和更快的社区响应。</p>
<p>对于合并请求，自动分配的审阅者将添加SIG标签（如果你尚未添加）。</p>
<p>对于问题，请注意，社区正在开发一个更加自动化的工作流程。由于SIG不直接映射到Kubernetes子存储库，因此可能很难找到你的贡献属于哪个SIG。查看 <a href="https://github.com/kubernetes/community/blob/master/sig-list.md" target="_blank" rel="noopener noreferrer">SIG列表<ExternalLinkIcon/></a> 以确定哪个SIG最有可能与你的贡献相关。</p>
<p>例如：如果你正在提交一个CNI问题（即容器网络接口），你将选择<a href="https://github.com/kubernetes/community/tree/master/sig-network" target="_blank" rel="noopener noreferrer">网络SIG<ExternalLinkIcon/></a>。在GitHub上的新评论中添加SIG标签，方法是键入以下内容：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>/sig network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>按照SIG名称列中的链接访问每个SIG的README。</p>
<p>大多数SIG都有一组GitHub团队，这些团队的标签可以在问题评论和拉取请求中提及，以获得更高的可见性。如果你不确定问题的正确SIG，可以尝试  <a href="https://github.com/kubernetes/community/blob/master/sig-contributor-experience/README.md" target="_blank" rel="noopener noreferrer">SIG-contributor-experience<ExternalLinkIcon/></a>, or <a href="http://slack.k8s.io/" target="_blank" rel="noopener noreferrer">ask in Slack<ExternalLinkIcon/></a>。</p>
<h3 id="sig专用贡献指南" tabindex="-1"><a class="header-anchor" href="#sig专用贡献指南" aria-hidden="true">#</a> SIG专用贡献指南</h3>
<p>一些SIG有自己的 <code v-pre>CONTRIBUTING.md</code> 文件，其中可能包含除了这些一般信息或指南之外的额外信息或指南。这些位于SIG特定的社区目录中：</p>
<ul>
<li><a href="https://github.com/kubernetes/community/blob/master/sig-apps/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer"><code v-pre>/sig-apps/CONTRIBUTING.md</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/community/blob/master/sig-cli/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer"><code v-pre>/sig-cli/CONTRIBUTING.md</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/community/blob/master/sig-multicluster/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer"><code v-pre>/sig-multicluster/CONTRIBUTING.md</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/community/blob/master/sig-storage/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer"><code v-pre>/sig-storage/CONTRIBUTING.md</code><ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/community/blob/master/sig-windows/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer"><code v-pre>/sig-windows/CONTRIBUTING.md</code><ExternalLinkIcon/></a></li>
</ul>
<h2 id="kubernetes-分类指南" tabindex="-1"><a class="header-anchor" href="#kubernetes-分类指南" aria-hidden="true">#</a> Kubernetes 分类指南</h2>
<ul>
<li><a href="https://github.com/kubernetes/community/blob/master/contributors/guide/issue-triage.md" target="_blank" rel="noopener noreferrer">https://github.com/kubernetes/community/blob/master/contributors/guide/issue-triage.md<ExternalLinkIcon/></a></li>
</ul>
<p>Issue triage是一个SIG接收和审查新的GitHub问题和请求的过程，并将其组织起来，由自己的成员或其他SIG采取行动。</p>
<p>分类涉及根据优先级/紧急程度、问题的SIG所有权和问题类型（错误、功能等）等因素对问题和拉取请求进行分类。</p>
<h3 id="权限和机器人" tabindex="-1"><a class="header-anchor" href="#权限和机器人" aria-hidden="true">#</a> 权限和机器人</h3>
<p>所有贡献者都可以打开新问题并对其他人的问题发表评论。但是，分配特定标签（如 <code v-pre>triage</code> ）、更改里程碑或关闭其他贡献者问题的权限仅授予问题的作者、受让人和组织成员。出于这个原因，我们使用机器人来管理标签和分类。有关bot的命令和权限的完整列表，请<a href="https://prow.k8s.io/command-help" target="_blank" rel="noopener noreferrer">参阅Prow命令参考页面<ExternalLinkIcon/></a>。</p>
<ul>
<li><a href="https://prow.k8s.io/command-help" target="_blank" rel="noopener noreferrer">https://prow.k8s.io/command-help<ExternalLinkIcon/></a></li>
</ul>
<p>除了机器人，Kubernetes 还有一个特别有意思的工具，可以显示你当前哪些pull requests正在等待你的反馈，哪些PR正在等待贡献者响应。请注意，Gubernator只显示pull requests。你将看不到分配给你的问题。</p>
<ul>
<li><a href="https://gubernator.k8s.io/pr/cubxxw" target="_blank" rel="noopener noreferrer">https://gubernator.k8s.io/pr/cubxxw<ExternalLinkIcon/></a></li>
</ul>
<h3 id="标签分类" tabindex="-1"><a class="header-anchor" href="#标签分类" aria-hidden="true">#</a> 标签分类</h3>
<p>对于 Kubernetes 来说，标签分类很复杂，但是确实很有必要，能够帮助 member 快速的去定位和解决问题。</p>
<p>在 Kubernetes 中的标签列表定义在 ：<a href="https://github.com/kubernetes/kubernetes/labels" target="_blank" rel="noopener noreferrer">https://github.com/kubernetes/kubernetes/labels<ExternalLinkIcon/></a></p>
<p>新问题将自动分配 <code v-pre>needs-triage</code> 标签，指示这些问题当前正在等待分类。在对问题进行分类后，拥有SIG的问题将使用bot命令 <code v-pre>/triage accepted</code> 。此命令删除 <code v-pre>needs-triage</code> 标签并添加 <code v-pre>triage/accepted</code> 标签。</p>
<p>请注意，添加标签需要Kubernetes GitHub org成员资格。如果你不是组织成员，你应该添加你的分类结果作为评论。</p>
<h3 id="进行搜索" tabindex="-1"><a class="header-anchor" href="#进行搜索" aria-hidden="true">#</a> 进行搜索</h3>
<p>GitHub允许你过滤出问题类型和拉取请求，这有助于你发现需要分类的项目。为方便起见，此表包括一些预定的搜索：</p>
<table>
<thead>
<tr>
<th>Search</th>
<th>What it sorts 它的分类</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aissue+is%3Aopen+sort%3Acreated-asc" target="_blank" rel="noopener noreferrer">created-asc<ExternalLinkIcon/></a></td>
<td>按年龄分类的未分类问题</td>
</tr>
<tr>
<td><a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aissue+is%3Aopen+label%3Aneeds-sig+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">needs-sig<ExternalLinkIcon/></a></td>
<td>需要分配给SIG的问题</td>
</tr>
<tr>
<td><a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aopen+is%3Aissue+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer"><code v-pre>is:open is:issue</code><ExternalLinkIcon/></a></td>
<td>最新收到的问题</td>
</tr>
<tr>
<td><a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aissue+is%3Aopen+sort%3Acomments-desc" target="_blank" rel="noopener noreferrer">comments-desc<ExternalLinkIcon/></a></td>
<td>最繁忙的未分类问题，按评论数排序</td>
</tr>
<tr>
<td><a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aissue+is%3Aopen+sort%3Acomments-asc" target="_blank" rel="noopener noreferrer">comments-asc<ExternalLinkIcon/></a></td>
<td>需要更多关注的问题，基于评论数</td>
</tr>
</tbody>
</table>
<p>我们建议你先过滤掉最老的、未标记的问题和pull requests。</p>
<h3 id="按类型分类问题" tabindex="-1"><a class="header-anchor" href="#按类型分类问题" aria-hidden="true">#</a> 按类型分类问题</h3>
<p>使用这些 <code v-pre>triage/</code> 和 <code v-pre>kind/support</code> 标签查找可以快速关闭的未决问题。分类工程师可以添加适当的标签。</p>
<p><code v-pre>triage/needs-information</code> 标签表示问题需要更多信息才能继续工作;评论或关闭它。</p>
<h3 id="help-wanted-good-first-issues" tabindex="-1"><a class="header-anchor" href="#help-wanted-good-first-issues" aria-hidden="true">#</a> Help Wanted/Good First Issues</h3>
<p>为了识别专门为新贡献者准备的问题，我们使用了 <a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">help wanted<ExternalLinkIcon/></a> and <a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">good first issue<ExternalLinkIcon/></a> 标签。要使用这些标签，请执行以下操作：</p>
<ul>
<li>如果问题满足这些准则，你可以使用 <code v-pre>/help</code> 命令添加 <code v-pre>help wanted</code> 标签。使用 <code v-pre>/good-first-issue</code> 命令创建 <code v-pre>good first issue</code> 标签。请注意，添加 <code v-pre>good first issue</code> 标签也会自动添加 <code v-pre>help wanted</code> 标签。</li>
<li>如果某个问题有这些标签，但不符合指导原则，请询问要添加到该问题的更多详细信息，或使用 <code v-pre>/remove-help</code> 或 <code v-pre>/remove-good-first-issue</code> 命令删除标签。</li>
</ul>
<h3 id="kind-labels" tabindex="-1"><a class="header-anchor" href="#kind-labels" aria-hidden="true">#</a> Kind Labels</h3>
<p>GitHub 默认是没有 <code v-pre>Kind</code> 类型的，也就是说，为了方便管理， Kubernetes 对问题使用了 <code v-pre>Kind</code> 类型标签：</p>
<ul>
<li><a href="https://github.com/kubernetes/kubernetes/labels?q=kind" target="_blank" rel="noopener noreferrer">https://github.com/kubernetes/kubernetes/labels?q=kind<ExternalLinkIcon/></a></li>
</ul>
<p>通常 <code v-pre>kind</code> 标签由提交问题的人应用。错误的 <code v-pre>kind</code> 问题（例如，标记为bug的支持请求）可以由分类的人纠正;反复检查是个好办法。我们的问题模板旨在引导人们选择正确的类型。</p>
<ul>
<li><a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aopen+label%3Akind%2Fdocumentation+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">kind/documentation<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aopen+label%3Akind%2Ffeature+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">kind/feature<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aopen+label%3Akind%2Fbug+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">kind/bug<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aopen+label%3Akind%2Fsupport+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">kind/support<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kubernetes/issues?q=is%3Aopen+label%3Akind%2Fcleanup+sort%3Aupdated-desc" target="_blank" rel="noopener noreferrer">kind/cleanup<ExternalLinkIcon/></a>: Categorizes issue or PR as related to cleaning up code, process, or technical debt.</li>
</ul>
<h3 id="define-priority" tabindex="-1"><a class="header-anchor" href="#define-priority" aria-hidden="true">#</a> Define Priority</h3>
<p>我们使用GitHub标签进行优先级排序。如果问题缺少 <code v-pre>priority</code> 标签，则意味着尚未对其进行评审和优先级排序。</p>
<p>我们的目标是整个项目的一致性。但是，如果你发现你认为优先级不正确的问题，请留下评论，提供你的反建议，我们将对其进行评估。</p>
<h3 id="找到并设置正确的sig来拥有问题" tabindex="-1"><a class="header-anchor" href="#找到并设置正确的sig来拥有问题" aria-hidden="true">#</a> 找到并设置正确的SIG来拥有问题</h3>
<p>各组成部分在特殊兴趣小组（SIG）之间进行划分。 机器人帮助找到合适的SIG来拥有问题。</p>
<p>如果你认为可以解决此问题，请仅使用 <code v-pre>/assign</code> 命令将其分配给自己。如果你由于权限相关的原因无法自行分配，请留下你想要声明的评论并开始处理PR。</p>
<p>如果问题已经有受理人，请不要将其分配给你自己，也不要在未与现有受理人交谈或未完成本文档中所述的后续步骤之前创建PR。当其他人已经在处理一个问题时创建PR不是一个好的做法，不鼓励这样做。</p>
<p>如果你发现分配了SIG标签的问题，但在30天内没有移动或讨论的证据，那么请轻轻地戳SIG关于此未决问题。另外，考虑参加他们的一次会议，提出这个问题。</p>
<p>当问题90天没有活动时，k8s-triage-robot会将 <code v-pre>lifecycle/stale</code> 标签添加到该问题。你可以通过抢先应用 <code v-pre>/lifecycle frozen</code> 标签来阻止bot，或者使用 <code v-pre>/remove-lifecycle stale</code> 命令删除标签。k8s-triage-robot在问题中添加了评论，包括其他细节。如果你不采取任何步骤，问题最终将自动关闭。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '69.md' style='float:left'>⬆️上一节🔗  </a><a href = '71.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


