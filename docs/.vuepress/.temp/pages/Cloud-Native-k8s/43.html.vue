<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第43节-kubernetes-的贡献学习" tabindex="-1"><a class="header-anchor" href="#第43节-kubernetes-的贡献学习" aria-hidden="true">#</a> 第43节 kubernetes 的贡献学习</h1>
<div><a href = '42.md' style='float:left'>⬆️上一节🔗  </a><a href = '44.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="kubernetes的共享指南" tabindex="-1"><a class="header-anchor" href="#kubernetes的共享指南" aria-hidden="true">#</a> Kubernetes的共享指南</h2>
<ul>
<li><a href="https://kubernetes.io/zh-cn/docs/contribute/suggesting-improvements/" target="_blank" rel="noopener noreferrer">Kubernetes的中文贡献参考文章<ExternalLinkIcon/></a></li>
</ul>
<blockquote>
<p>注意使用 git 过程中的一系列的问题和操作，关于我们使用 Kubernetes ，我们或许写了很多的控制器，或者是写了Kubernetes的官方文档，我们该怎么样把这个官方文档贡献到Kubernetes的社区。</p>
</blockquote>
<p>⚠️ 请注意，无论是 Kubernetes 还是 CNCF（下一个标题有介绍），它们的代码和贡献都是大同小异的，我们参考 CNCF 的贡献也可，但是对于 Kubernetes 这个庞大的社区（Slack社群里面user有165k 的成员）来说，贡献者分为管理层和技术层，是互不干涉的，这也是 Kubernetes 这麽多年依旧保持 GitHub 活跃度顶级的项目。</p>
<blockquote>
<p>tip⚠️:</p>
<p>和普通的开源项目也有区别，Kubernetes 不仅仅要求你对每一次 PR 提交 CA 证书。同时，如果不是完成一个小的漏洞或者修复，那么要求你提前给出 feature 设计， issue 的方案。</p>
<p>或者 Kubernetes 社区不会对你的 PR 进行审核。</p>
</blockquote>
<h2 id="cncf-2023" tabindex="-1"><a class="header-anchor" href="#cncf-2023" aria-hidden="true">#</a> CNCF 2023</h2>
<p><strong>当我回顾 2022 年时，我对我们共同克服和取得的成就深感自豪。尽管我们已经面临并将继续应对的集体挑战，但云原生生态系统已经飙升。我们欢迎新的行业、项目，并将我们的社区扩大到 710 万云原生开发人员，超过了丹麦的人口！</strong></p>
<p>贡献者和成员的成长：</p>
<p><img src="http://sm.nsddd.top/sm202301081550482.png" alt="image-20230108154959742"></p>
<p>我们可以看到，今年我们迎来了 220 多名新成员加入 CNCF。</p>
<blockquote>
<p>云原生生态越来越大，越来越好；最终用户对开源的信任正在引导它向前发展！</p>
<p>​					——阿帕娜·苏伯拉曼尼安</p>
<p>​					——Shopify 生产工程总监</p>
</blockquote>
<h2 id="kubernetes-的贡献手册" tabindex="-1"><a class="header-anchor" href="#kubernetes-的贡献手册" aria-hidden="true">#</a> Kubernetes 的贡献手册</h2>
<p><strong>Kubernetes的贡献相对平常的项目有更严格的标准，他的审核也是分批流的。</strong></p>
<p>贡献的方式也是多种多样：</p>
<ul>
<li>你可以发现代码的 bug 并且修改它（但其实现在 Kubernetes 的维护者非常多，bug也很难发现了）</li>
<li>出现一些问题或者给出一些建议，请提交一个 issue</li>
<li>你需要去完善文档，比如说 Kubernetes 的中文翻译，或者是英文文档改善和补充</li>
<li>贡献新的内容、模块或者功能（注意，这个需要你的设计稿并且通过例会同意）</li>
</ul>
<h3 id="贡献" tabindex="-1"><a class="header-anchor" href="#贡献" aria-hidden="true">#</a> 贡献</h3>
<p><img src="http://sm.nsddd.top/sm202301081642932.png" alt="image-20230108164211805"></p>
<h3 id="基本知识" tabindex="-1"><a class="header-anchor" href="#基本知识" aria-hidden="true">#</a> 基本知识</h3>
<ul>
<li>
<p>使用 Markdown 编写 Kubernetes 文档并使用 <a href="https://gohugo.io/" target="_blank" rel="noopener noreferrer">Hugo<ExternalLinkIcon/></a> 构建网站。</p>
</li>
<li>
<p>Kubernetes 文档使用 <a href="https://commonmark.org/" target="_blank" rel="noopener noreferrer">CommonMark<ExternalLinkIcon/></a> 作为 Markdown 的风格。</p>
</li>
<li>
<p>源代码位于 <a href="https://github.com/kubernetes/website" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a> 仓库中。 你可以在 <code v-pre>/content/zh-cn/docs/</code> 目录下找到 Kubernetes 文档。 某些参考文档是使用位于 <code v-pre>update-imported-docs/</code> 目录下的脚本自动生成的。</p>
</li>
<li>
<p><a href="https://kubernetes.io/zh-cn/docs/contribute/style/page-content-types/" target="_blank" rel="noopener noreferrer">页面内容类型<ExternalLinkIcon/></a>使用 Hugo 描述文档内容的呈现。</p>
</li>
<li>
<p>你可以使用 <a href="https://www.docsy.dev/docs/adding-content/shortcodes/" target="_blank" rel="noopener noreferrer">Docsy 短代码<ExternalLinkIcon/></a> 或<a href="https://kubernetes.io/zh-cn/docs/contribute/style/hugo-shortcodes/" target="_blank" rel="noopener noreferrer">定制的 Hugo 短代码<ExternalLinkIcon/></a>贡献 Kubernetes 文档。</p>
</li>
<li>
<p>除了标准的 Hugo 短代码外， 我们还在文档中使用一些<a href="https://kubernetes.io/zh-cn/docs/contribute/style/hugo-shortcodes/" target="_blank" rel="noopener noreferrer">定制的 Hugo 短代码<ExternalLinkIcon/></a>来控制内容的呈现。</p>
</li>
<li>
<p>文档的源代码有多种语言形式，位于 <code v-pre>/content/</code> 目录下。 每种语言都有一个自己的目录，用两个字母表示，这两个字母是基于 <a href="https://www.loc.gov/standards/iso639-2/php/code_list.php" target="_blank" rel="noopener noreferrer">ISO 639-1 标准<ExternalLinkIcon/></a>来确定的。 例如，英语文档的源代码位于 <code v-pre>/content/en/docs/</code> 目录下。</p>
</li>
<li>
<p>关于为多语言文档做贡献以及如何开始新翻译的详细信息， 可参考<a href="https://kubernetes.io/zh-cn/docs/contribute/localization" target="_blank" rel="noopener noreferrer">本地化文档<ExternalLinkIcon/></a>。</p>
</li>
</ul>
<h3 id="开始之前" tabindex="-1"><a class="header-anchor" href="#开始之前" aria-hidden="true">#</a> 开始之前<a href="https://kubernetes.io/zh-cn/docs/contribute/new-content/#before-you-begin" target="_blank" rel="noopener noreferrer"> <ExternalLinkIcon/></a></h3>
<p>作为开源社区，很担心 contributor copy 代码引起官司，所以所有 Kubernetes 贡献者<strong>必须</strong>阅读<a href="https://github.com/kubernetes/community/blob/master/contributors/guide/README.md" target="_blank" rel="noopener noreferrer">贡献者指南<ExternalLinkIcon/></a> 并<a href="https://github.com/kubernetes/community/blob/master/CLA.md" target="_blank" rel="noopener noreferrer">签署贡献者授权同意书 (Contributor License Agreement, CLA)<ExternalLinkIcon/></a>。</p>
<p>若贡献者尚未签署 CLA，其发起的 PR 将无法通过自动化测试。 你所提供的姓名和邮件地址必须与 <code v-pre>git config</code> 中配置的完全相同， 而且你的 git 用户名和邮件地址必须与用来签署 CNCF CLA 的信息一致。</p>
<blockquote>
<p>比如我的 git 分支：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/kubernetes/docs<span class="token comment"># git config --list</span>
<span class="token assign-left variable">user.name</span><span class="token operator">=</span>Xinwei Xiong
<span class="token assign-left variable">user.email</span><span class="token operator">=</span>3293172751nss@gmail.com
<span class="token assign-left variable">core.repositoryformatversion</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token assign-left variable">core.filemode</span><span class="token operator">=</span>true
<span class="token assign-left variable">core.bare</span><span class="token operator">=</span>false
<span class="token assign-left variable">core.logallrefupdates</span><span class="token operator">=</span>true
<span class="token assign-left variable">remote.origin.url</span><span class="token operator">=</span>https://ghproxy.com/https://github.com/kubernetes/kubernetes.git
<span class="token assign-left variable">remote.origin.fetch</span><span class="token operator">=</span>+refs/heads/*:refs/remotes/origin/*
<span class="token assign-left variable">branch.master.remote</span><span class="token operator">=</span>origin
<span class="token assign-left variable">branch.master.merge</span><span class="token operator">=</span>refs/heads/master
<span class="token assign-left variable">remote.upstream.url</span><span class="token operator">=</span>https://github.com/cubxxw/kubernetes.git
<span class="token assign-left variable">remote.upstream.fetch</span><span class="token operator">=</span>+refs/heads/*:refs/remotes/upstream/*
<span class="token assign-left variable">remote.kubernetes.url</span><span class="token operator">=</span>https://github.com/kubernetes/kubernetes.git
<span class="token assign-left variable">remote.kubernetes.fetch</span><span class="token operator">=</span>+refs/heads/*:refs/remotes/kubernetes/*
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p><strong>在发起 pr 之前，你需要选择合适的分支：</strong></p>
<p>在发起 PR 时，你需要预先知道基于哪个分支来开展工作。</p>
<table>
<thead>
<tr>
<th style="text-align:left">场景</th>
<th style="text-align:left">分支</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">针对当前发行版本的，对现有英文内容的修改或新的英文内容</td>
<td style="text-align:left"><code v-pre>main</code></td>
</tr>
<tr>
<td style="text-align:left">针对功能特性变更的内容</td>
<td style="text-align:left">分支对应于功能特性变更的主要和次要版本，分支名称采用 <code v-pre>dev-&lt;version&gt;</code> 的模式。例如，如果某功能特性在 <code v-pre>v1.27</code> 版本发生变化，则对应的文档变化要添加到 <code v-pre>dev-1.27</code> 分支。</td>
</tr>
<tr>
<td style="text-align:left">其他语言的内容（本地化）</td>
<td style="text-align:left">基于本地化团队的约定。参见<a href="https://kubernetes.io/zh-cn/docs/contribute/localization/#branching-strategy" target="_blank" rel="noopener noreferrer">本地化分支策略<ExternalLinkIcon/></a>了解更多信息。</td>
</tr>
</tbody>
</table>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '42.md' style='float:left'>⬆️上一节🔗  </a><a href = '44.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


