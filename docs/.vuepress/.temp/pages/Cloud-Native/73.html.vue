<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第73节-一次大型的-review-现场-generic-event-mechanism" tabindex="-1"><a class="header-anchor" href="#第73节-一次大型的-review-现场-generic-event-mechanism" aria-hidden="true">#</a> 第73节 一次大型的 review 现场：Generic event mechanism</h1>
<div><a href = '72.md' style='float:left'>⬆️上一节🔗  </a><a href = '74.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="why" tabindex="-1"><a class="header-anchor" href="#why" aria-hidden="true">#</a> why</h2>
<p>最近网易 森哥 花了一个月多的时间终于把 Generic event mechanism 设计出来了，我赶紧去 review 了一下设计方案和代码，希望从中学习到设计精髓。</p>
<ul>
<li>issue：https://github.com/horizoncd/horizon/issues/147</li>
<li>Google docs：https://docs.google.com/document/d/1kE_BMVr4sYucQiSOT8LdEObAsoOtkhL5TL0NhvsML4I/edit?usp=sharing</li>
<li>PR：https://github.com/horizoncd/horizon/pull/155</li>
</ul>
<h2 id="设计思路" tabindex="-1"><a class="header-anchor" href="#设计思路" aria-hidden="true">#</a> 设计思路</h2>
<p><strong>文档思路：</strong></p>
<ul>
<li>Horizon发布下一批和发布完成时需要发送通知给用户</li>
<li>外部用户也需要更多的事件</li>
</ul>
<p><strong>需求分析:</strong></p>
<ol>
<li>用户使用自动发布功能，自动发布下一批和发布完成或者失败时，需要发送通知给发布的触发者。</li>
<li>外部需要Horizon提供更多的Webhook，比如上下线，重启等事件</li>
</ol>
<p><strong>事件分析:</strong></p>
<h3 id="rollout" tabindex="-1"><a class="header-anchor" href="#rollout" aria-hidden="true">#</a> Rollout</h3>
<p>当rollouts发布下一批时，发送SetStepIndex事件</p>
<table>
<thead>
<tr>
<th>4h39m</th>
<th>Normal</th>
<th>SetStepIndex</th>
<th>rollout/bad2good-setweight-onlycheck-newrs</th>
<th>Set Step Index to 1</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<ol>
<li>当rollouts发布完成后，将发送SettingStableRS事件</li>
</ol>
<table>
<thead>
<tr>
<th>4h39m</th>
<th>Normal</th>
<th>SettingStableRS</th>
<th>rollout/bad2good-setweight-onlycheck-newrs</th>
<th>Completed all steps</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>​</p>
<h3 id="argo-application" tabindex="-1"><a class="header-anchor" href="#argo-application" aria-hidden="true">#</a> Argo Application</h3>
<p>发布成功时，状态由Progressing转变为Healthy</p>
<table>
<thead>
<tr>
<th>17h</th>
<th>Normal</th>
<th>ResourceUpdated</th>
<th>application/horizon-cs-4-regression</th>
<th>Updated health status: Progressing -&gt; Healthy</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>​</p>
<p>发布失败时，状态由Progressing变为Degraded</p>
<table>
<thead>
<tr>
<th>18h</th>
<th>Normal</th>
<th>ResourceUpdated</th>
<th>application/horizon-cs-4-regression</th>
<th>Updated health status: Progressing -&gt; Degraded</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p>​</p>
<p>发布下一批时，状态由Suspended转变为Progressing</p>
<table>
<thead>
<tr>
<th>15h</th>
<th>Normal</th>
<th>ResourceUpdated</th>
<th>application/for-argocd-dfldsflsj</th>
<th>Updated health status: Suspended -&gt; Progressing</th>
</tr>
</thead>
<tbody>
<tr>
<td></td>
<td></td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<p><strong>整体设计:</strong></p>
<ol>
<li>Horizon中添加监听Event的逻辑，监听配置资源的Event，Horizon应该监听region表中所有启用的集群</li>
<li>将监听资源产生的Event写入数据库中</li>
<li>Webhook job取出event，发送相应的Webhook</li>
<li>开发<code v-pre>ReleaseAdapter</code>组件，监听webhook，并发送通知给相关用户</li>
</ol>
<table>
<thead>
<tr>
<th>Event</th>
<th>Description</th>
<th>Status</th>
</tr>
</thead>
<tbody>
<tr>
<td>Generic event mechanism</td>
<td>Horizon listens to events on Kubernetes and supports sending related events through Webhooks</td>
<td>Designing</td>
</tr>
</tbody>
</table>
<p><strong>PR 思路：</strong></p>
<p><strong>大致做了三件事:</strong></p>
<ul>
<li>添加 k8s  event package 以 侦听 k8s 事件并将其写入数据库。</li>
<li>使用 informer 列出资源树中的所有 pod，大大减轻了 kube API 服务器的压力。</li>
<li>添加清理作业以定期清理 Webhook 日志和事件。</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '72.md' style='float:left'>⬆️上一节🔗  </a><a href = '74.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


