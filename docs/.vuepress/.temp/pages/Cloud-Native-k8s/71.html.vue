<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第71节-prow及其生态系统" tabindex="-1"><a class="header-anchor" href="#第71节-prow及其生态系统" aria-hidden="true">#</a> 第71节 Prow及其生态系统</h1>
<div><a href = '70.md' style='float:left'>⬆️上一节🔗  </a><a href = '72.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="why" tabindex="-1"><a class="header-anchor" href="#why" aria-hidden="true">#</a> why?</h2>
<p><strong>故事是从这个 proposal 开始idea~</strong></p>
<p>🤖 <a href="https://github.com/OpenIMSDK/Open-IM-Server/issues/398" target="_blank" rel="noopener noreferrer">OpenIM cicd robot machine proposal<ExternalLinkIcon/></a></p>
<p>Prow是基于Kubernetes的CI/CD系统。作业可以由各种类型的事件触发，并将其状态报告给许多不同的服务。除了作业执行，Prow还以策略执行、通过 <code v-pre>/foo</code> 风格命令的聊天操作和自动PR合并的形式提供GitHub自动化。</p>
<p>有关 Golang 文档，请参阅 <a href="https://pkg.go.dev/k8s.io/test-infra/prow" target="_blank" rel="noopener noreferrer">GoDoc<ExternalLinkIcon/></a>。请注意，这些库仅供prow使用，我们不会尝试保留向后兼容性。</p>
<p><strong>Kubernetes 专门为 Prow 提供了网页命令查询：</strong></p>
<ul>
<li><a href="https://prow.k8s.io/command-help" target="_blank" rel="noopener noreferrer">https://prow.k8s.io/command-help<ExternalLinkIcon/></a></li>
</ul>
<p>关于Prow如何运行作业的简要概述，请参阅 <a href="https://docs.prow.k8s.io/docs/life-of-a-prow-job/" target="_blank" rel="noopener noreferrer">Prow作业的生命周期<ExternalLinkIcon/></a>。</p>
<p>要查看Prow的常用用法和交互流，请参见拉取请求交互序列图。</p>
<h3 id="hello-world" tabindex="-1"><a class="header-anchor" href="#hello-world" aria-hidden="true">#</a> hello world</h3>
<p>最简单的一个上手案例莫过于 <a href="https://help.github.com/articles/about-pull-requests/" target="_blank" rel="noopener noreferrer">pull request<ExternalLinkIcon/></a> 。</p>
<p>提出一个拉取请求（以下简称PR）。在PR正文中，可以随意添加区域标签（如果合适），例如 <code v-pre>/area &lt;AREA&gt;</code> 。标签列表<a href="https://github.com/kubernetes/test-infra/labels" target="_blank" rel="noopener noreferrer">在这里<ExternalLinkIcon/></a>。也可以随意推荐一位评论者 <code v-pre>/assign @theirname</code> 。</p>
<p>一旦您的审阅者满意，他们会说 <code v-pre>/lgtm</code> ，这将应用 <code v-pre>lgtm</code> 标签，如果他们是OWNER，将应用 <code v-pre>approved</code> 标签。 <code v-pre>approved</code> 标签也将自动应用于所有者打开的PR。如果您和您的审阅者都不是OWNER，请 <code v-pre>/assign</code> 某个所有者。如果您的PR有 <code v-pre>lgtm</code> 和 <code v-pre>approved</code> 标签，没有任何 <code v-pre>do-not-merge/*</code> 标签，并且所有测试均通过，则PR将自动合并。</p>
<h3 id="查看测试结果" tabindex="-1"><a class="header-anchor" href="#查看测试结果" aria-hidden="true">#</a> 查看测试结果</h3>
<ul>
<li>Kubernetes TestGrid 显示历史测试结果
<ul>
<li>在 <a href="https://github.com/k8s-ci-robot/test-infra/blob/master/testgrid/config.yaml" target="_blank" rel="noopener noreferrer">testgrid/config.yaml<ExternalLinkIcon/></a> 配置自己的 testgrid 仪表盘</li>
<li><a href="https://gubernator.k8s.io/" target="_blank" rel="noopener noreferrer">Gubernator<ExternalLinkIcon/></a> 格式化每次运行的输出</li>
</ul>
</li>
<li><a href="https://gubernator.k8s.io/pr" target="_blank" rel="noopener noreferrer">PR Dashboard<ExternalLinkIcon/></a> 查找需要注意的 PR</li>
<li>Prow 安排测试并更新问题
<ul>
<li>Prow 响应 GitHub 事件、定时器和在 GitHub 评论中给出的<a href="https://go.k8s.io/bot-commands" target="_blank" rel="noopener noreferrer">手动命令<ExternalLinkIcon/></a>。</li>
<li><a href="https://prow.k8s.io/" target="_blank" rel="noopener noreferrer">prow dashboard<ExternalLinkIcon/></a> 显示当前正在测试什么</li>
<li>在 <a href="https://github.com/k8s-ci-robot/test-infra/blob/master/config/jobs" target="_blank" rel="noopener noreferrer">config/jobs<ExternalLinkIcon/></a> 配置 prow 运行新测试</li>
</ul>
</li>
<li>Triage Dashboard 汇总故障
<ul>
<li>将故障集群在一起</li>
<li>搜索跨作业的测试失败</li>
<li>在特定的测试和/或作业的 regex 中过滤失败</li>
</ul>
</li>
<li>Velodrome 指标跟踪作业和测试健康状况。
<ul>
<li><a href="https://github.com/k8s-ci-robot/test-infra/blob/master/kettle" target="_blank" rel="noopener noreferrer">Kettle<ExternalLinkIcon/></a> 进行收集，<a href="https://github.com/k8s-ci-robot/test-infra/blob/master/metrics" target="_blank" rel="noopener noreferrer">metrics<ExternalLinkIcon/></a> 进行报告，<a href="https://github.com/k8s-ci-robot/test-infra/blob/master/velodrome" target="_blank" rel="noopener noreferrer">velodrome<ExternalLinkIcon/></a> 是前端。</li>
</ul>
</li>
</ul>
<h2 id="功能和特性" tabindex="-1"><a class="header-anchor" href="#功能和特性" aria-hidden="true">#</a> 功能和特性</h2>
<p><strong>prow 的功能很强大，甚至是比 actions 更加出众。可以测试、批处理、工件发布的作业执行。</strong></p>
<ul>
<li>GitHub事件用于触发post-PR-merge（postsubmit）作业和on-PR-update（presubmit）作业。</li>
<li>支持多个执行平台和源代码审查站点。</li>
</ul>
<p><strong>可插拔的GitHub bot自动化，实现 <code v-pre>/foo</code> 风格的命令并强制执行配置的策略/流程。</strong></p>
<details class="custom-container details"><summary>什么是 foo 风格</summary>
<p><code v-pre>/foo</code> 风格通常指的是在聊天应用程序（如Slack）中使用的命令格式。这种格式的命令以斜杠 <code v-pre>/</code> 开头，后跟一个关键字或短语，例如 <code v-pre>/help</code> 或 <code v-pre>/status</code>。GitHub bot自动化可以使用此格式来实现特定功能，例如在GitHub上自动创建问题或拉取请求，并强制执行特定的工作流程或策略。</p>
</details>
<p><strong>其他的功能：</strong></p>
<ul>
<li>GitHub将自动化与批量测试逻辑合并。</li>
<li>用于查看作业、合并队列状态、动态生成的帮助信息等的前端。</li>
<li>基于配置的源代码管理的自动部署。</li>
<li>在源代码控制中配置的自动 <code v-pre>GitHub org/repo</code> 管理。</li>
<li>专为具有数十个存储库的多组织规模而设计。(The Kubernetes Prow实例仅使用1个GitHub bot令牌！）</li>
<li>高可用性是在Kubernetes上运行的好处。（复制、负载平衡、滚动更新...）</li>
<li>JSON结构化日志。</li>
<li>支持 普罗米修斯指标。</li>
</ul>
<h2 id="documentation" tabindex="-1"><a class="header-anchor" href="#documentation" aria-hidden="true">#</a> Documentation</h2>
<p>任何一个大型的工程第一个考虑的应该是稳定性，prow的稳定性很大程度上依赖于单元测试和集成测试。</p>
<ul>
<li>单元测试与prow源代码位于同一位置</li>
<li><a href="https://docs.prow.k8s.io/docs/test/integration/" target="_blank" rel="noopener noreferrer">Integration tests<ExternalLinkIcon/></a> utilizes <a href="https://kind.sigs.k8s.io/" target="_blank" rel="noopener noreferrer">kind<ExternalLinkIcon/></a> with hermetic integration tests. See <a href="https://docs.prow.k8s.io/docs/test/integration/#adding-new-integration-tests" target="_blank" rel="noopener noreferrer">instructions for adding new integration tests<ExternalLinkIcon/></a> for more details</li>
</ul>
<p><strong>Getting started：我们分为三个大的板块</strong></p>
<ul>
<li>使用自己的 Prow 部署</li>
<li>为 Prow 开发</li>
<li>As a job author: <a href="https://docs.prow.k8s.io/docs/jobs/" target="_blank" rel="noopener noreferrer">ProwJobs<ExternalLinkIcon/></a></li>
</ul>
<h2 id="使用自己的prow部署" tabindex="-1"><a class="header-anchor" href="#使用自己的prow部署" aria-hidden="true">#</a> 使用自己的Prow部署</h2>
<p>这里我们应该学会的是如何将你自己的 Prow 实例部署到 Kubernetes 的集群。</p>
<p>Prow可以在任何<code v-pre>Kubernetes</code>集群中运行。下面的指南专注于Google Kubernetes Engine，但应该适用于任何Kubernetes发行版，<strong>无需/只需</strong> 很少的更改。</p>
<p>Prow 是使用 webhook 做的，webhook 相对来说比较复杂一些。</p>
<p>就是当你创建 robot 的时候，先创建 webhook，然后写入 webhook 链接。</p>
<p>k8s有自己的服务，prew 需要单独搭建出来。</p>
<blockquote>
<p>webhook的地址是你写的服务的公网地址。相当于github要调用webhook</p>
</blockquote>
<p>其实你写个webhook然后把webhook搭建到cloud上，就串起来了。然后你自动发布就直接改镜像完事。主要就是把webhook写一下，解析指令就行了。</p>
<p>如果你没有自己的服务器，也可以借助 actions 自己跑，参考：<a href="https://github.com/labring/sealos/blob/main/.github/workflows/bot.yml" target="_blank" rel="noopener noreferrer">https://github.com/labring/sealos/blob/main/.github/workflows/bot.yml<ExternalLinkIcon/></a></p>
<h3 id="github-app" tabindex="-1"><a class="header-anchor" href="#github-app" aria-hidden="true">#</a> GitHub APP</h3>
<p>首先，您需要 <a href="https://docs.github.com/en/apps/creating-github-apps/setting-up-a-github-app/creating-a-github-app" target="_blank" rel="noopener noreferrer">创建一个GitHub应用程序<ExternalLinkIcon/></a>。GitHub本身也记录了这一点。 最初，为Webhook设置一个虚拟URL就足够了。所需的确切权限集因您使用的功能而异。下面是所需的最低权限集。</p>
<blockquote>
<p>⚠️ 一个用户或者组织最多只能有 100 个 robot</p>
</blockquote>
<p><strong>存储库权限</strong>：</p>
<ul>
<li>Actions：只读（仅在使用合并自动化 <code v-pre>tide</code> 时需要）</li>
<li>Administration：只读（获取团队和协作者时必需）</li>
<li>Checks：只读（仅在使用合并自动化 <code v-pre>tide</code> 时需要）</li>
<li>Contents：读取（使用合并自动化时需要读取和写入 <code v-pre>tide</code> ）</li>
<li>Issues: Read &amp; write</li>
<li>Metadata: Read-Only</li>
<li>Pull Requests: Read &amp; write</li>
<li>projects：使用 <code v-pre>projects</code> 插件时为Admin，否则为none</li>
<li>Commit statuses: Read &amp; write</li>
</ul>
<p><strong>组织权限：</strong></p>
<ul>
<li>Members：只读（使用 <code v-pre>peribolos</code> 时读写）</li>
<li>projects：使用 <code v-pre>projects</code> 插件时为Admin，否则为none</li>
</ul>
<p>在 <code v-pre>Subscribe to events</code> 中选择所有事件。</p>
<p>保存应用程序后，单击底部的“生成私钥”，并将私钥与页面顶部的 <code v-pre>App ID</code> 一起保存。</p>
<p>sealos 也集成了自己的 robot，可以作为发行版或者是解决平常的 PR</p>
<ul>
<li><strong><a href="https://github.com/sealos-release-rebot" target="_blank" rel="noopener noreferrer">sealos-release-rebot<ExternalLinkIcon/></a></strong></li>
<li><strong><a href="https://github.com/k8s-release-robot" target="_blank" rel="noopener noreferrer">k8s-release-robot<ExternalLinkIcon/></a></strong></li>
</ul>
<p>关于 <code v-pre>sealos</code> 的 bot 仓库地址，藏在了<a href="https://github.com/labring/gh-rebot" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a></p>
<h2 id="如何做一个-github-bot" tabindex="-1"><a class="header-anchor" href="#如何做一个-github-bot" aria-hidden="true">#</a> 如何做一个 github-bot</h2>
<p>GitHub机器人是一种自动化工具，它可以在服务端上启动一个基于 <a href="https://github.com/koajs/koa/" target="_blank" rel="noopener noreferrer">Koa.js<ExternalLinkIcon/></a> 的HTTP服务器，并建立一些项目规范，例如规定issue格式、pull request格式、配置指定标签的所有者、统一git commit log格式等。通过使用 <a href="https://github.com/labring/sealos/blob/main/.github/workflows/bot.yml" target="_blank" rel="noopener noreferrer">GitHub Webhooks<ExternalLinkIcon/></a> 和 <a href="https://docs.github.com/en/rest" target="_blank" rel="noopener noreferrer">GitHub API<ExternalLinkIcon/></a>，机器人可以自动处理一些事情，例如自动回复issue、自动合并pull request等。通常情况下，机器人是一个单独的账号，例如 <a href="https://github.com/kubbot" target="_blank" rel="noopener noreferrer">@kubbot<ExternalLinkIcon/></a>。使用GitHub机器人可以实现快速响应、自动化和解放人力的效果，从而提高项目的效率和质量。</p>
<h3 id="actions-关闭和操作-issue" tabindex="-1"><a class="header-anchor" href="#actions-关闭和操作-issue" aria-hidden="true">#</a> actions 关闭和操作 issue</h3>
<p>其实 robot 最基本的权限就是对 issue 和 PR 的权限。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>name: Invite <span class="token function">users</span> to <span class="token function">join</span> our group
on:
  issue_comment:
    types:
      - created
jobs:
  issue_comment:
    name: Invite <span class="token function">users</span> to <span class="token function">join</span> our group
    if: <span class="token variable">${{ github.event.comment.body == '<span class="token operator">/</span>invite' }</span><span class="token punctuation">}</span>
    runs-on: ubuntu-latest
    permissions:
      issues: <span class="token function">write</span>
    steps:

      - name: Invite user to <span class="token function">join</span> our group
        uses: peter-evans/create-or-update-comment@v1
        with:
          issue-number: <span class="token variable">${{ github.event.issue.number }</span><span class="token punctuation">}</span>
          body: <span class="token operator">|</span>
			<span class="token comment">#......</span>

      - name: Close Issue
        uses: peter-evans/close-issue@v3
        with:
          issue-number: <span class="token variable">${{ github.event.issue.number }</span><span class="token punctuation">}</span>
          comment: auto-closing issue, <span class="token keyword">if</span> you still need <span class="token builtin class-name">help</span> please reopen the issue or ask <span class="token keyword">for</span> <span class="token for-or-select variable">help</span> <span class="token keyword">in</span> the community above
          labels: <span class="token operator">|</span>
            triage/accepted
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>github 地址：</strong></p>
<ul>
<li><a href="https://github.com/peter-evans/close-issue" target="_blank" rel="noopener noreferrer">https://github.com/peter-evans/close-issue<ExternalLinkIcon/></a></li>
</ul>
<p>最后还贴心的加上 labels</p>
<h3 id="再来一个-issues-translate-chinese-action" tabindex="-1"><a class="header-anchor" href="#再来一个-issues-translate-chinese-action" aria-hidden="true">#</a> 再来一个：Issues Translate Chinese Action</h3>
<p>将包含中文 issue 实时翻译成英文 issue 的 action。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">'issue translator'</span>
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">issue_comment</span><span class="token punctuation">:</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>created<span class="token punctuation">]</span>
  <span class="token key atrule">issues</span><span class="token punctuation">:</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>opened<span class="token punctuation">]</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> usthe/issues<span class="token punctuation">-</span>translate<span class="token punctuation">-</span>action@v2.7
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># it is not necessary to decide whether you need to modify the issue header content</span>
          <span class="token key atrule">IS_MODIFY_TITLE</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">BOT_GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.BOT_GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token comment"># Required, input your bot github token这里有一点很神奇，就是我们不需要去指定 GitHub 中 BOT 的用户 @kubbot ，GitHub在环境密钥中就可以知道、解析出来。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>用了上面的模板后，GitHub就能自动的去分析 issue 并且翻译。</p>
<p><strong>还有一个是用的 chatgpt 翻译的：</strong></p>
<ul>
<li><a href="https://github.com/marketplace/actions/gpt-translate" target="_blank" rel="noopener noreferrer">https://github.com/marketplace/actions/gpt-translate<ExternalLinkIcon/></a></li>
</ul>
<p>在问题或拉取请求中创建带有 <code v-pre>/gpt-translate</code> 或 <code v-pre>/gt</code> 的评论。</p>
<p>[On issue]转换后的文件将作为拉取请求创建。</p>
<p>[On pull request]转换后的文件将通过新提交添加到pull request中。</p>
<p>换句话说，如果你继续评论一个问题，新的PR将不断被创建。如果你一直在PR上评论，新的提交将不断地被添加到该PR中。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/gpt-translate README.md README_zh-CN.md traditional-chinese
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>actions 文件：</p>
<p><a href="https://github.com/kubbot" target="_blank" rel="noopener noreferrer">@kubbot<ExternalLinkIcon/></a></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># .github/workflows/gpt-translate.yml</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> GPT Translate

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">issue_comment</span><span class="token punctuation">:</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> created <span class="token punctuation">]</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">gpt_translate</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run GPT Translate
        <span class="token key atrule">if</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          contains(github.event.comment.body, '/gpt-translate') || 
          contains(github.event.comment.body, '/gt')</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> 3ru/gpt<span class="token punctuation">-</span>translate@v1.0
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">apikey</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.OPENAI_API_KEY <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">token</span><span class="token punctuation">:</span> <span class="token string">"${{ secrets.BOT_GITHUB_TOKEN }}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如何使用指定的github-robot-代替-github-actions" tabindex="-1"><a class="header-anchor" href="#如何使用指定的github-robot-代替-github-actions" aria-hidden="true">#</a> 如何使用指定的GitHub robot 代替 GitHub actions</h3>
<p>每一次看到 GitHub actions，感觉看着不顺眼，还不如搞一个自己的 robot。</p>
<p>但是一不小心搞了两个 😒</p>
<ul>
<li>https://github.com/kubbot: I am a member bot of <a href="https://github.com/OpenIMSDK" target="_blank" rel="noopener noreferrer">@OpenIMSDK<ExternalLinkIcon/></a> and the older brother of <a href="https://github.com/openimbot" target="_blank" rel="noopener noreferrer">@openimbot<ExternalLinkIcon/></a></li>
<li>https://github.com/openimbot: I am a member bot of <a href="https://github.com/OpenIMSDK" target="_blank" rel="noopener noreferrer">@OpenIMSDK<ExternalLinkIcon/></a> openim and a sister of <a href="https://github.com/kubbot" target="_blank" rel="noopener noreferrer">@kubbot<ExternalLinkIcon/></a></li>
</ul>
<h3 id="lighthouse" tabindex="-1"><a class="header-anchor" href="#lighthouse" aria-hidden="true">#</a> Lighthouse</h3>
<ul>
<li>https://github.com/jenkins-x/lighthouse</li>
</ul>
<p>Lighthouse是一个轻量级的基于 ChatOps 的 webhook 处理程序，可以基于来自多个git提供商（如GitHub，GitHub Enterprise，BitBucket Server和GitLab）的webhook触发Jenkins X Pipelines，Tekton Pipelines或Jenkins Jobs。</p>
<p>Lighthouse 最开始的时候也是基于 prow 的，并且是从他们的基础代码的副本开始。</p>
<p>目前，Lighthouse支持标准的Prow插件，并处理将webhook推送到分支，然后在您选择的代理上触发管道执行。</p>
<p>Lighthouse使用与Prow相同的 <code v-pre>config.yaml</code> 和 <code v-pre>plugins.yaml</code> 进行配置。</p>
<h2 id="test-infra-介绍" tabindex="-1"><a class="header-anchor" href="#test-infra-介绍" aria-hidden="true">#</a> Test-Infra 介绍</h2>
<p>作为 kubernetes 基础保障，test-infra 功能非常的强大。</p>
<p><img src="https://raw.githubusercontent.com/kubernetes/test-infra/9771710c13868bddd1476170a77ddab36941c512/docs/architecture.svg" alt="img"></p>
<p><strong>架构解释：</strong></p>
<p>对于 test-infra 的架构，我们首先可以发现，其相对复杂，并且包含许多微服务组件。值得注意的一点是，test-infra 中的微服务与其他微服务之间的交互并不采用我们熟知的传统方式，例如，它并不通过 grpc 进行调用，这与 OpenIM 等传统微服务有所区别。</p>
<p>test-infra 的架构的核心组成部分是 Hooks，它负责接收不同类型的事件。然后，test-infra 会通过一套插件系统，根据事件类型将其分发给不同的插件进行处理。例如，如果我们考虑一个实例，那么在 kubernetes test-infra 仓库的 prow 目录下，我们可以找到一个名为 plugins 的插件集合，其中一个插件名为 <code v-pre>transfer-issue</code>。此插件负责处理 PR 请求。</p>
<p>另一方面，对于单元请求，它将进行单元测试，对于合并请求，它将进行合并测试。在这个系统中，我们还有一个称为 <code v-pre>prowjob</code> 的CRD资源，它提供了一种高层次的抽象，以及一个自定义的控制器。</p>
<p>所有的测试结果会被回传到 GitHub 的测试面板上。状态更新会通过 crier 进行，然后传入到对应的组织和仓库地址。</p>
<p>在可视化方面，test-infra 提供了一个名为 deck 的组件。对应的网站是 prow.k8s.io，它提供了前端视图，使得用户可以更直观地理解和掌控整个测试流程。</p>
<p>这样的设计让 test-infra 的架构显得既复杂又灵活，但也带来了极高的定制性和扩展性。</p>
<p><strong>基本组件：</strong></p>
<ol>
<li>Prow Controller Manager：Prow控制器管理器是Prow的核心组件，负责协调Prow的各个子系统。它监控Git存储库中的事件，并根据配置触发相应的操作。</li>
<li>Prow Job：Prow Job定义了CI/CD系统中的一个任务或作业。它描述了要运行的代码、测试和部署步骤，并指定了触发该作业的条件。</li>
<li>Prow Plugin：Prow插件是一种扩展机制，允许开发人员为Prow系统添加自定义功能。插件可以监听事件并执行相应的操作，例如自动化代码审查、生成报告等。</li>
<li>Prow Dashboard：Prow仪表板是一个Web界面，用于监视和管理Prow系统的运行状态。它提供了对作业、插件和事件的可视化界面，方便用户查看和操作。</li>
<li>Plank：Plank是Prow的任务调度器，负责将Prow Job分配给可用的工作节点进行执行。它会监控作业队列，并将作业分发给合适的工作节点，以便并行执行作业。</li>
<li>Hook：Hook是Prow的事件处理器，用于接收和处理来自Git存储库的事件。它会监听Git存储库中的事件，并将这些事件转发给Prow的Controller Manager进行处理。</li>
<li>Deck：Deck是Prow的用户界面，提供了一个Web界面，用于查看Prow系统中的作业、插件和事件等信息。开发人员可以使用Deck来监视和管理CI/CD流程，查看作业的状态和日志等。</li>
<li>Sinker：Sinker是Prow的清理器，负责清理过期的作业和资源。它会定期检查作业的状态，并清理已完成或过期的作业，以释放资源并保持系统的整洁。</li>
<li>Tide：Tide是Prow的自动合并管理器，用于管理代码合并流程。它会监视Git存储库中的Pull Request，并根据配置的规则自动合并符合条件的Pull Request。</li>
</ol>
<h3 id="k8s-prow-能支持哪些日志存储" tabindex="-1"><a class="header-anchor" href="#k8s-prow-能支持哪些日志存储" aria-hidden="true">#</a> k8s prow 能支持哪些日志存储</h3>
<p><strong>之前 kubesphere 中听过两句话：</strong></p>
<p>Prow  目前只是支持 Github ，Gerrit，对于 gitlab 的支持短期难以看到。</p>
<blockquote>
<p>但是我们可以通过 <code v-pre>Lighthouse</code> 去支持</p>
</blockquote>
<p><s>prow 的持久化存储只支持 GCP，但是可以使用 Jenkins X，它使用了 Knative 来跑 Job</s></p>
<blockquote>
<p>这句话不对，我们可以通过 prow 找到，是可以支持其他的云的。Prow 并不仅用 GCP，只要是兼容 s3 的 sdk ，就可以。</p>
</blockquote>
<h3 id="基础满足" tabindex="-1"><a class="header-anchor" href="#基础满足" aria-hidden="true">#</a> 基础满足</h3>
<h3 id="创建-access-tokens" tabindex="-1"><a class="header-anchor" href="#创建-access-tokens" aria-hidden="true">#</a> 创建 access tokens</h3>
<p>https://github.com/settings/tokens （<em>需要在 <code v-pre>.env</code> 里配置</em>）</p>
<h3 id="创建-webhook" tabindex="-1"><a class="header-anchor" href="#创建-webhook" aria-hidden="true">#</a> 创建 webhook</h3>
<p>仓库的所有事件，都需要通过 webhook 去监听使用的。</p>
<p>https://github.com/用户名/项目名/settings/hooks/new</p>
<ul>
<li>Payload URL: <a href="http://www.example.com:8000/" target="_blank" rel="noopener noreferrer">www.example.com:8000<ExternalLinkIcon/></a></li>
<li>Content type: application/json</li>
<li>trigger: Send me everything.</li>
<li>Secret: xxx （<em>需要在 .env 里配置</em>）</li>
</ul>
<h3 id="开发运行" tabindex="-1"><a class="header-anchor" href="#开发运行" aria-hidden="true">#</a> 开发运行</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install
cp env .env
vim .env
npm start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h3>
<p>本项目使用 <a href="https://github.com/Unitech/pm2" target="_blank" rel="noopener noreferrer">pm2<ExternalLinkIcon/></a> 进行服务管理，发布前请先全局安装 <a href="https://github.com/Unitech/pm2" target="_blank" rel="noopener noreferrer">pm2<ExternalLinkIcon/></a></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm install pm2 -g
npm run deploy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>后台启动该服务后，可以通过 <code v-pre>pm2 ls</code> 来查看服务名称为 <code v-pre>github-bot</code> 的运行状态。具体 <a href="https://github.com/Unitech/pm2" target="_blank" rel="noopener noreferrer">pm2<ExternalLinkIcon/></a> 使用，请访问：https://github.com/Unitech/pm2</p>
<h3 id="日志系统说明" tabindex="-1"><a class="header-anchor" href="#日志系统说明" aria-hidden="true">#</a> 日志系统说明</h3>
<p>本系统 <code v-pre>logger</code> 服务基于 <a href="https://github.com/log4js-node/log4js-node" target="_blank" rel="noopener noreferrer">log4js<ExternalLinkIcon/></a>。 在根目录的 <code v-pre>.env</code> 文件中有个参数 <code v-pre>LOG_TYPE</code> 默认为 <code v-pre>console</code>，参数值说明：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>console - 通过 console 输出log。
file - 将所有相关log输出到更根目录的 `log` 文件夹中。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<h3 id="link" tabindex="-1"><a class="header-anchor" href="#link" aria-hidden="true">#</a> Link</h3>
<ul>
<li><a href="https://docs.prow.k8s.io/docs/overview/" target="_blank" rel="noopener noreferrer">prow docs<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/test-infra/blob/master/prow/cron/cron.go?rgh-link-date=2023-05-13T15%3A35%3A30Z" target="_blank" rel="noopener noreferrer">github kubernetes/test-infra/prow/cron<ExternalLinkIcon/></a></li>
<li><a href="https://prow.k8s.io/command-help" target="_blank" rel="noopener noreferrer">using commond<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/k8s-ci-robot" target="_blank" rel="noopener noreferrer">@k8s-ci-robot<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/ks-ci-bot" target="_blank" rel="noopener noreferrer">@ks-ci-bot<ExternalLinkIcon/></a></li>
</ul>
<h3 id="参考文章" tabindex="-1"><a class="header-anchor" href="#参考文章" aria-hidden="true">#</a> 参考文章</h3>
<ul>
<li><a href="https://github.com/xuexb/github-bot" target="_blank" rel="noopener noreferrer">xuexb GitHub<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/labring/gh-rebot" target="_blank" rel="noopener noreferrer">sealos gh rebot<ExternalLinkIcon/></a></li>
<li>https://www.amoyw.com/2020/10/22/Prow/</li>
</ul>
<h3 id="test-infra" tabindex="-1"><a class="header-anchor" href="#test-infra" aria-hidden="true">#</a> Test Infra</h3>
<p>包含 prow：</p>
<ul>
<li>Istio: https://github.com/istio/test-infra</li>
<li>Kubernetes: https://github.com/kubernetes/test-infra</li>
<li>Knative: https://github.com/knative/test-infra</li>
</ul>
<p>不含有 prow：</p>
<ul>
<li>prometheus： https://github.com/prometheus/test-infra</li>
<li>kyma-project： https://github.com/kyma-project/test-infra</li>
<li>Grpc: https://github.com/grpc/test-infra</li>
</ul>
<h3 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h3>
<p><a href="https://kurtmadel.com/posts/native-kubernetes-continuous-delivery/prow/" target="_blank" rel="noopener noreferrer">Prow: Keeping Kubernetes CI/CD Above Water - Kurt Madel<ExternalLinkIcon/></a></p>
<p><a href="https://www.alldaydevops.com/blog/prow-jenkins-x-pipeline-operator-and-tekton-going-serverless-with-jenkins-x" target="_blank" rel="noopener noreferrer">Prow, Jenkins X Pipeline Operator, and Tekton: Going Serverless With Jenkins X<ExternalLinkIcon/></a></p>
<p><a href="https://devclass.com/2020/06/18/jenkins-x-cloudbees-may-update/" target="_blank" rel="noopener noreferrer">Jenkins X replaces Prow with Lighthouse for better source control compatibility • DEVCLASS<ExternalLinkIcon/></a></p>
<p><a href="https://www.velotio.com/engineering-blog/prow-for-native-kubernetes-ci-cd" target="_blank" rel="noopener noreferrer">Prow + Kubernetes - A Perfect Combination To Execute CI/CD At Scale<ExternalLinkIcon/></a></p>
<h4 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h4>
<p><a href="https://docs.prow.k8s.io/docs/overview/" target="_blank" rel="noopener noreferrer">Overview<ExternalLinkIcon/></a></p>
<h4 id="代码部分" tabindex="-1"><a class="header-anchor" href="#代码部分" aria-hidden="true">#</a> 代码部分：</h4>
<p><a href="https://github.com/kubernetes/test-infra/tree/master/prow#bots-home" target="_blank" rel="noopener noreferrer">test-infra/prow at master · kubernetes/test-infra<ExternalLinkIcon/></a></p>
<h3 id="导航" tabindex="-1"><a class="header-anchor" href="#导航" aria-hidden="true">#</a> 导航</h3>
<ul><li><div><a href = '70.md' style='float:left'>⬆️上一节🔗  </a><a href = '72.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


