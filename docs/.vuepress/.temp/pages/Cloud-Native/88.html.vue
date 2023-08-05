<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第88节-github-webhook" tabindex="-1"><a class="header-anchor" href="#第88节-github-webhook" aria-hidden="true">#</a> 第88节 Github Webhook</h1>
<div><a href = '87.md' style='float:left'>⬆️上一节🔗  </a><a href = '89.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="什么是-github-webhook" tabindex="-1"><a class="header-anchor" href="#什么是-github-webhook" aria-hidden="true">#</a> 什么是 GitHub webhook</h2>
<p>Webhook 提供了一种在 GitHub 上发生某些事件时将通知传递到外部 Web 服务器的方法。</p>
<p>每当 GitHub 上发生特定事件时，都可以触发 Webhook。例如，您可以将 Webhook 配置为在以下情况下触发：</p>
<ul>
<li>将代码推送到存储库</li>
<li>拉取请求已打开</li>
<li>构建了 GitHub 页面网站</li>
<li>将新成员添加到团队</li>
</ul>
<p>您可以将 Webhook 添加到组织、仓库或 GitHub 应用程序。</p>
<p>添加网络钩子时，您可以选择要订阅的事件。若要限制对服务器的 HTTP 请求数，应仅订阅计划处理的特定事件。默认情况下，安装在组织或仓库上的 Webhook 仅订阅推送事件。默认情况下，GitHub 应用程序上的网络钩子不会订阅任何事件。您可以随时更改订阅 Webhook 的事件。有关 Webhook 事件的完整列表，请参阅“Webhook 事件和有效负载”。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-v</span> <span class="token parameter variable">-X</span> POST https://api.github.com/repos/<span class="token operator">&lt;</span>owner<span class="token operator">></span>/<span class="token operator">&lt;</span>repo<span class="token operator">></span>/hooks <span class="token punctuation">\</span>
  <span class="token parameter variable">-H</span> <span class="token string">"Accept: application/vnd.github.v3+json"</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">-H</span> <span class="token string">"Authorization: token &lt;your-token>"</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">-d</span> <span class="token string">'{
    "name": "web",
    "active": true,
    "events": ["push", "pull_request"],
    "config": {
      "url": "http://example.com/webhook",
      "content_type": "json"
    }
  }'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="关于存储库的-webhook" tabindex="-1"><a class="header-anchor" href="#关于存储库的-webhook" aria-hidden="true">#</a> 关于存储库的 webhook</h2>
<p>存储库 Webhook 允许您在存储库中发生某些事件时接收 HTTP 有效负载。您可以使用 REST API 来管理存储库、组织和应用程序 Webhook。您可以列出 Webhook 的 Webhook 投放，也可以获取并重新投放 webhook 的单个投放，这些投放可以集成到外部应用或服务中。您还可以使用 REST API 更改 Webhook 的配置。例如，您可以修改有效负载 URL、内容类型、SSL 验证和密钥。</p>
<h3 id="pubsubhubbub" tabindex="-1"><a class="header-anchor" href="#pubsubhubbub" aria-hidden="true">#</a> PubSubHubbub</h3>
<p>GitHub 还可以充当所有存储库的 <a href="https://github.com/pubsubhubbub/PubSubHubbub" target="_blank" rel="noopener noreferrer">PubSubHubbub<ExternalLinkIcon/></a> 中心。<a href="https://github.com/pubsubhubbub/PubSubHubbub" target="_blank" rel="noopener noreferrer">PSHB<ExternalLinkIcon/></a> 是一个简单的发布/订阅协议，允许服务器注册以在主题更新时接收更新。更新随 HTTP POST 请求一起发送到回调 URL。GitHub 存储库推送的主题 URL 采用以下格式：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>https://github.com/{owner}/{repo}/events/{event}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="response-format-相应格式" tabindex="-1"><a class="header-anchor" href="#response-format-相应格式" aria-hidden="true">#</a> Response format 相应格式</h4>
<p>默认格式是现有接收后挂钩应期望的格式：作为 POST 中的参数发送的 JSON 正文。还可以指定接收带有标头或扩展的原始 JSON 正文。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Accept: application/json
https://github.com/<span class="token punctuation">{</span>owner<span class="token punctuation">}</span>/<span class="token punctuation">{</span>repo<span class="token punctuation">}</span>/events/push.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="callback-urls" tabindex="-1"><a class="header-anchor" href="#callback-urls" aria-hidden="true">#</a> callback URLs</h3>
<p>回调 URL 可以使用 HTTP 协议。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Send updates to a PostBin bin</span>
https://www.toptal.com/developers/postbin/123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="creating-webhooks" tabindex="-1"><a class="header-anchor" href="#creating-webhooks" aria-hidden="true">#</a> creating webhooks</h2>
<p>创建网络钩子的过程分为两步。您首先需要设置 Webhook 应该侦听哪些事件。之后，您将设置服务器以接收和管理有效负载。</p>
<p>您可以使用 REST API 来管理存储库、组织和应用程序 Webhook。您可以列出 Webhook 的 Webhook 投放，也可以获取并重新投放 webhook 的单个投放，这些投放可以集成到外部应用或服务中。您还可以使用 REST API 更改 Webhook 的配置。例如，您可以修改有效负载 URL、内容类型、SSL 验证和密钥。有关详细信息。</p>
<h3 id="将本地主机暴露给互联网" tabindex="-1"><a class="header-anchor" href="#将本地主机暴露给互联网" aria-hidden="true">#</a> 将本地主机暴露给互联网</h3>
<p>出于本教程的目的，我们将使用本地服务器从 GitHub 接收 Webhook 事件。</p>
<p>首先，我们需要将我们的本地开发环境公开给互联网，以便 GitHub 可以交付事件。我们将用来 <a href="https://ngrok.com/download" target="_blank" rel="noopener noreferrer">ngrok<ExternalLinkIcon/></a> 此操作。</p>
<p>免费提供，适用于所有主要操作系统。有关详细信息，请参阅下载页面。</p>
<p>安装 后，您可以通过在命令行上运行来公开本地主机。 是我们的服务器将侦听消息的端口号。您应该看到如下所示的行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>https://d0bc-113-99-98-99.ngrok-free.app -<span class="token operator">></span> http://localhost:80
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>记下网址。我们将使用它来设置我们的网络钩子。</p>
<h2 id="添加-webhook" tabindex="-1"><a class="header-anchor" href="#添加-webhook" aria-hidden="true">#</a> 添加 webhook</h2>
<p>只有具有组织所有者权限或仓库管理员权限的成员才能管理组织的 Webhook。更多信息请参阅“组织中的角色”。</p>
<p>要设置 Webhook，请转到仓库或组织的设置页面。从那里，单击网络钩子，然后单击添加网络钩子。</p>
<p>或者，您可以选择通过 Webhooks API 构建和管理 Webhook。</p>
<p>Webhook 需要一些配置选项才能使用它们。我们将在下面介绍这些设置中的每一个。</p>
<h3 id="负载网址" tabindex="-1"><a class="header-anchor" href="#负载网址" aria-hidden="true">#</a> 负载网址</h3>
<p>负载 URL 是将接收 Webhook 请求的服务器的 URL <code v-pre>POST</code>。</p>
<p>由于我们正在本地开发教程，因此我们将其设置为<code v-pre>*.ngrok.io</code>URL，后跟<code v-pre>/payload</code>. 例如，<code v-pre>http://7e9ea9dc.ngrok.io/payload</code>.</p>
<h3 id="内容类型" tabindex="-1"><a class="header-anchor" href="#内容类型" aria-hidden="true">#</a> 内容类型</h3>
<p>Webhook 可以使用不同的内容类型进行传递：</p>
<ul>
<li>内容<code v-pre>application/json</code>类型将直接传递 JSON 有效负载作为请求正文<code v-pre>POST</code>。</li>
<li>内容<code v-pre>application/x-www-form-urlencoded</code>类型将发送 JSON 有效负载作为名为 的表单参数<code v-pre>payload</code>。</li>
</ul>
<p>选择最适合您需求的一款。对于本教程，默认内容类型<code v-pre>application/json</code>就可以了。</p>
<h3 id="内容类型-1" tabindex="-1"><a class="header-anchor" href="#内容类型-1" aria-hidden="true">#</a> 内容类型</h3>
<p>Webhook 可以使用不同的内容类型进行传递：</p>
<ul>
<li>内容<code v-pre>application/json</code>类型将直接传递 JSON 有效负载作为请求正文<code v-pre>POST</code>。</li>
<li>内容<code v-pre>application/x-www-form-urlencoded</code>类型将发送 JSON 有效负载作为名为 的表单参数<code v-pre>payload</code>。</li>
</ul>
<p>选择最适合您需求的一款。对于本教程，默认内容类型<code v-pre>application/json</code>就可以了。</p>
<h3 id="秘密" tabindex="-1"><a class="header-anchor" href="#秘密" aria-hidden="true">#</a> 秘密</h3>
<p>设置 Webhook 密钥可让您确保<code v-pre>POST</code>发送到负载 URL 的请求来自 GitHub。设置机密后，您将收到Webhook 请求中的<code v-pre>X-Hub-Signature</code>和标头。有关如何使用带有签名标头的密钥来保护您的 Webhook 负载的更多信息，请参阅“<a href="https://docs.github.com/en/webhooks-and-events/webhooks/securing-your-webhooks" target="_blank" rel="noopener noreferrer">保护您的 Webhook 的安全<ExternalLinkIcon/></a>”。<code v-pre>X-Hub-Signature-256``POST</code></p>
<h3 id="ssh" tabindex="-1"><a class="header-anchor" href="#ssh" aria-hidden="true">#</a> ssh</h3>
<p>如果您的“有效负载 URL”是安全站点 (HTTPS)，您将可以选择配置 SSL 验证设置。如果您的“有效负载 URL”不安全 (HTTP)，GitHub 将不会显示此选项。默认情况下，GitHub 在传送 Webhook 负载时验证您网站的 SSL 证书。SSL 验证有助于确保挂钩有效负载安全地传递到您的 URL 端点。您可以选择禁用 SSL，但我们建议保持选中**“启用 SSL 验证”**。</p>
<p>默认情况下，Webhook 传送处于“活动”状态。您可以通过取消选择“活动”来选择禁用 Webhook 有效负载的传送。</p>
<h3 id="活动" tabindex="-1"><a class="header-anchor" href="#活动" aria-hidden="true">#</a> 活动</h3>
<p>事件是 Webhooks 的核心。每当对存储库执行特定操作时，这些 Webhook 就会触发，您的服务器的有效负载 URL 会拦截该存储库并对其进行操作。</p>
<p>Webhook 事件及其执行时间的完整列表可以在<a href="https://docs.github.com/en/webhooks-and-events/webhooks/about-webhooks#events" target="_blank" rel="noopener noreferrer">webhooks API<ExternalLinkIcon/></a>参考中找到。</p>
<p>由于我们的 webhook 正在处理存储库中的问题，因此我们将单击<strong>Let me select individual events</strong>，然后单击<strong>Issues</strong>。确保选择**“活动”**以接收触发的 Webhook 的问题事件。您还可以使用默认选项选择所有事件。</p>
<p>完成后，点击<strong>添加 webhook</strong>。</p>
<p>现在您已经创建了 Webhook，是时候设置我们的本地服务器来测试 Webhook 了。请前往<a href="https://docs.github.com/en/webhooks-and-events/webhooks/configuring-your-server-to-receive-payloads" target="_blank" rel="noopener noreferrer">配置您的服务器<ExternalLinkIcon/></a>以了解如何执行此操作。</p>
<h2 id="保护-webhook" tabindex="-1"><a class="header-anchor" href="#保护-webhook" aria-hidden="true">#</a> 保护 webhook</h2>
<p>一旦您的服务器配置为接收有效负载，它将侦听发送到您配置的端点的任何有效负载。出于安全原因，您可能希望将请求限制为来自 GitHub 的请求。有几种方法可以解决此问题（例如，您可以选择允许来自 GitHub IP 地址的请求），但更简单的方法是设置秘密令牌并验证信息。</p>
<h2 id="github-crl" tabindex="-1"><a class="header-anchor" href="#github-crl" aria-hidden="true">#</a> Github CRL</h2>
<p>我希望通过 github cli 来解决一个问题：</p>
<ul>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/issues/639" target="_blank" rel="noopener noreferrer">https://github.com/OpenIMSDK/Open-IM-Server/issues/639<ExternalLinkIcon/></a></li>
</ul>
<p>我希望希望获取到后面的那个数字，这个数字得到的一个值就是 issue 的编号</p>
<div class="language-bash' ext-bash' line-numbers-mode"><pre v-pre class="language-bash'"><code>ISSUEID=$(gh pr view 642 --repo OpenIMSDK/Open-IM-Server | grep -oP 'Fixes #\K\d+')
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>拿到 Issue 编号后，我还需要 通过 issue 编号 获取到 对应的 issue 信息：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">ISSUE</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>gh issue view $ISSUEID <span class="token parameter variable">--repo</span> OpenIMSDK/Open-IM-Server <span class="token parameter variable">--json</span> labels,assignees,milestone,title<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>获取到 labels 并且设置 PR 的 labels 和 issue 相同</li>
<li>获取到 Assignees 并且设置 PR 的 Assignees 和 issue 相同</li>
<li>获取到 Milestone 并且设置 PR 的 Milestone 和 issue 相同</li>
<li>获取到 PR 的标题，并且设置为 TABLE</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">LABELS</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> $ISSUE <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> <span class="token string">'.labels[] | select(.name) | .name'</span><span class="token variable">)</span></span>
<span class="token comment"># LABELS=$(echo $ISSUE | jq -r '.labels[] | select(.name) | .name' | jq -R -r -s -c 'split("\n")[:-1] | join(",")')</span>
<span class="token assign-left variable">ASSIGNEES</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> $ISSUE <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> <span class="token string">'.assignees[] | select(.login) | .login'</span> <span class="token operator">|</span> jq <span class="token parameter variable">-R</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-c</span> <span class="token string">'split("\n")[:-1] | join(",")'</span><span class="token variable">)</span></span>
<span class="token assign-left variable">MILESTONE</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> $ISSUE <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> <span class="token string">'.milestone | select(.title) | .title'</span><span class="token variable">)</span></span>
<span class="token assign-left variable">TITLE</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> $ISSUE <span class="token operator">|</span> jq <span class="token parameter variable">-r</span> <span class="token string">'.title'</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>JQ:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@PS2023EVRHNCXG:~/workspaces/openim/Open-IM-Server<span class="token comment"># echo $ISSUE | jq</span>
<span class="token punctuation">{</span>
  <span class="token string">"assignees"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">"id"</span><span class="token builtin class-name">:</span> <span class="token string">"MDQ6VXNlcjg2MTQwOTAz"</span>,
      <span class="token string">"login"</span><span class="token builtin class-name">:</span> <span class="token string">"cubxxw"</span>,
      <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"Xinwei Xiong"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>,
  <span class="token string">"labels"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">"id"</span><span class="token builtin class-name">:</span> <span class="token string">"MDU6TGFiZWwzMDMyNTUxMTc1"</span>,
      <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"enhancement"</span>,
      <span class="token string">"description"</span><span class="token builtin class-name">:</span> <span class="token string">"New feature or request"</span>,
      <span class="token string">"color"</span><span class="token builtin class-name">:</span> <span class="token string">"a2eeef"</span>
    <span class="token punctuation">}</span>,
    <span class="token punctuation">{</span>
      <span class="token string">"id"</span><span class="token builtin class-name">:</span> <span class="token string">"MDU6TGFiZWwzMDMyNTUxMTc3"</span>,
      <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"good first issue"</span>,
      <span class="token string">"description"</span><span class="token builtin class-name">:</span> <span class="token string">"Denotes an issue ready for a new contributor, according to the <span class="token entity" title="\&quot;">\"</span>help wanted<span class="token entity" title="\&quot;">\"</span> guidelines."</span>,
      <span class="token string">"color"</span><span class="token builtin class-name">:</span> <span class="token string">"7057ff"</span>
    <span class="token punctuation">}</span>,
    <span class="token punctuation">{</span>
      <span class="token string">"id"</span><span class="token builtin class-name">:</span> <span class="token string">"LA_kwDOFhyqls8AAAABRELYbA"</span>,
      <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"kind/feature"</span>,
      <span class="token string">"description"</span><span class="token builtin class-name">:</span> <span class="token string">"Categorizes issue or PR as related to a new feature."</span>,
      <span class="token string">"color"</span><span class="token builtin class-name">:</span> <span class="token string">"c7def8"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>,
  <span class="token string">"milestone"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">"number"</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
    <span class="token string">"title"</span><span class="token builtin class-name">:</span> <span class="token string">"v3.1"</span>,
    <span class="token string">"description"</span><span class="token builtin class-name">:</span> <span class="token string">"https://github.com/OpenIMSDK/Open-IM-Server/tree/release-v3.1"</span>,
    <span class="token string">"dueOn"</span><span class="token builtin class-name">:</span> null
  <span class="token punctuation">}</span>,
  <span class="token string">"title"</span><span class="token builtin class-name">:</span> <span class="token string">"OpenIM AI Feature Issue - Web-based Issue Generation and Analysis"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提一个 PR ：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>gh <span class="token function">pr</span> edit <span class="token number">642</span> <span class="token parameter variable">--repo</span> OpenIMSDK/Open-IM-Server --add-label <span class="token string">"<span class="token variable">$LABELS</span>"</span> --add-assignee <span class="token string">"<span class="token variable">$ASSIGNEES</span>"</span> <span class="token parameter variable">--milestone</span> <span class="token string">"<span class="token variable">$MILESTONE</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>更多：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@PS2023EVRHNCXG:~/workspaces/openim/Open-IM-Server<span class="token comment"># echo $ISSUE | jq -r '.labels[] | select(.name) | .name'</span>
enhancement
good first issue
kind/feature
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>受让：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>  push:
    branches:
      - main
      
name: Assign issue to comment author
on:
  issue_comment:
    types: [created]
jobs:
  assign-issue:
    if: |
      contains(github.event.comment.body, '/assign') || contains(github.event.comment.body, '/accept') &amp;&amp;
      !contains(github.event.comment.user.login, 'openimbot') &amp;&amp;
      !contains(github.event.comment.user.login, 'kubbot')
    runs-on: ubuntu-latest
    permissions:
      issues: write
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Assign the issue
        run: |
          export LETASE_MILESTONES=$(curl 'https://api.github.com/repos/$OWNER/$PEPO/milestones' | jq -r 'last(.[]).title')
          gh issue edit ${{ github.event.issue.number }} --add-assignee "${{ github.event.comment.user.login }}"
          gh issue edit ${{ github.event.issue.number }} --add-label "triage/accepted"
          gh issue edit ${{ github.event.issue.number }} --milestone "$LETASE_MILESTONES"
          gh issue comment $ISSUE --body "@${{ github.event.comment.user.login }} Glad to see you accepted this issue🤲, this issue has been assigned to you. I set the milestones for this issue to [$LETASE_MILESTONES](https://github.com/$OWNER/$PEPO/milestones), We are looking forward to your PR!"
        env:
          GH_TOKEN: ${{ secrets.REDBOT_GITHUB_TOKEN }}
          ISSUE: ${{ github.event.issue.html_url }}
          OWNER: ${{ github.repository_owner }}
          REPO: ${{ github.event.repository.name }}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '87.md' style='float:left'>⬆️上一节🔗  </a><a href = '89.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


