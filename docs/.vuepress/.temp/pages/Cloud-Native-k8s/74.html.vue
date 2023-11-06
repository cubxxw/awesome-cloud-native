<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第74节-prow-bot" tabindex="-1"><a class="header-anchor" href="#第74节-prow-bot" aria-hidden="true">#</a> 第74节 Prow Bot</h1>
<div><a href = '73.md' style='float:left'>⬆️上一节🔗  </a><a href = '75.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="关于" tabindex="-1"><a class="header-anchor" href="#关于" aria-hidden="true">#</a> 关于</h2>
<p>谷歌 OSS Prow 介绍：https://github.com/apps/google-oss-prow</p>
<p>安装此应用程序是安装此应用程序后加入<a href="https://github.com/googlecloudplatform/oss-test-infra#oss-prow" target="_blank" rel="noopener noreferrer">Google OSS Prow<ExternalLinkIcon/></a>的推荐方式：</p>
<ul>
<li>来自此组织/存储库的 Webhook 事件将发送到 Google OSS Prow</li>
<li>Google OSS Prow 将能够报告 GitHub 状态上下文，并对问题/拉取请求发表评论。</li>
<li>Prow 还不会对您的组织/存储库中的 webhook 进行操作，请访问<a href="https://github.com/GoogleCloudPlatform/oss-test-infra/blob/master/prow/oss/onboarding.md" target="_blank" rel="noopener noreferrer">入职指南<ExternalLinkIcon/></a>以了解如何根据您的需求进行入职</li>
</ul>
<p>欲了解更多信息：</p>
<ul>
<li>什么是 prow：https: <a href="https://github.com/kubernetes/test-infra/prow" target="_blank" rel="noopener noreferrer">//github.com/kubernetes/test-infra/prow<ExternalLinkIcon/></a></li>
<li>配置您的组织/存储库：https://github.com/GoogleCloudPlatform/oss-test-infra/tree/master/prow/oss</li>
</ul>
<h2 id="加入指南" tabindex="-1"><a class="header-anchor" href="#加入指南" aria-hidden="true">#</a> 加入指南</h2>
<p>如果您要加入由 OSS Prow 实例提供服务的 GitHub 组织或存储库，请参阅<a href="https://github.com/GoogleCloudPlatform/oss-test-infra/blob/master/prow/oss/onboarding.md" target="_blank" rel="noopener noreferrer">加入指南<ExternalLinkIcon/></a>。</p>
<p>使用 . 创建一个构建集群来托管您的 prow 作业<a href="https://github.com/GoogleCloudPlatform/oss-test-infra/blob/master/prow/oss/create-build-cluster.sh" target="_blank" rel="noopener noreferrer"><code v-pre>create_build_cluster.sh</code><ExternalLinkIcon/></a>。</p>
<p>没有必要为每个单独的存储库使用单独的构建集群，但每个团队应该使用自己的集群来进行工作负载/计费隔离和管理。</p>
<p><strong>prow的配置权限</strong></p>
<p><a href="https://github.com/apps/google-oss-prow/installations/new" target="_blank" rel="noopener noreferrer">在https://github.com/apps/google-oss-prow/installations/new<ExternalLinkIcon/></a>安装 prow GitHub 应用程序。安装完成后，org/repo 将开始向 prow 发送 webhook，但在执行以下步骤之前不会发生任何情况。</p>
<p><strong>配置 prow 以作用于 github 上的 webhook</strong></p>
<p>创建一个 PullRequest，包含：</p>
<ul>
<li>设置tide来帮助自动合并PR。</li>
<li>启用<code v-pre>trigger</code>插件以允许触发提交前和提交后 ProwJobs。</li>
<li>启用其他有用的插件。</li>
</ul>
<p>我们有可用<a href="https://oss.gprow.dev/plugins" target="_blank" rel="noopener noreferrer">插件<ExternalLinkIcon/></a>和<a href="https://oss.gprow.dev/command-help" target="_blank" rel="noopener noreferrer">命令<ExternalLinkIcon/></a>的目录可供浏览。<a href="https://github.com/GoogleCloudPlatform/oss-test-infra/pull/376" target="_blank" rel="noopener noreferrer">如果不确定要使用什么设置或哪些插件，请随意从Prow 配置示例 PR<ExternalLinkIcon/></a><code v-pre>google/exposure-notification-server</code>中的 相同设置开始。记录<a href="https://github.com/kubernetes/test-infra/blob/master/prow/config/prow-config-documented.yaml" target="_blank" rel="noopener noreferrer">的 Prow 配置<ExternalLinkIcon/></a>是配置字段的有用参考。</p>
<p>完成此步骤后，prow 能够对<code v-pre>/</code>样式命令做出反应，例如：</p>
<ul>
<li><code v-pre>/lgtm``lgtm</code>：在 PR 上添加标签。</li>
<li><code v-pre>/hold``do-not-merge/hold</code>：在 PR 上添加标签。</li>
<li><code v-pre>/retest</code>：重新运行失败的预提交作业。</li>
</ul>
<p>当满足条件时，Tide 还将开始自动合并您的组织/存储库中的 PR，在<code v-pre>google/exposure-notification-server</code>上面的示例中，这些条件是：</p>
<ul>
<li>CLA 签署。</li>
<li>PR 包含<code v-pre>lgtm</code>和<code v-pre>approve</code>标签。</li>
</ul>
<p>要使船头/潮汐要求预提交测试才能通过，请继续执行<code v-pre>Adding Prow jobs</code>以下操作。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '73.md' style='float:left'>⬆️上一节🔗  </a><a href = '75.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


