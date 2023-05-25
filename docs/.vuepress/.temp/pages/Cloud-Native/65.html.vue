<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第65节-slack-api-开发" tabindex="-1"><a class="header-anchor" href="#第65节-slack-api-开发" aria-hidden="true">#</a> 第65节 slack API 开发</h1>
<div><a href = '64.md' style='float:left'>⬆️上一节🔗  </a><a href = '66.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>我正在 优化 OpenIM 的 规范，不可避免地 和 slack 打交道，发现 slack 太好用了，但是，当触及 slack 的高级功能的时候，不得不系统的去学习一下 slack</p>
<p>最常见的 slack 高级应用：webhook。</p>
<p><code v-pre>Webhook</code>实质上是一个私有的URL，接受外部应用程序的调用。当你按照规定的方式成功调用一个 <code v-pre>Webhook</code> 以后，相应的行为就会体现在服务程序里面（对于Slack而言通常是发送一条消息）。</p>
<blockquote>
<p>比如：一个邮件收发程序可以在有新的邮件到达服务器时，调用Slack的某个Webhook，通知用户他有一封新的邮件；一个博客程序可以在文章有新的评论时，调用某个Webhook，通知作者和管理员该文章有新的评论，诸如此类。而这些通知都会以机器人的口气发送到Slack的聊天窗口中。</p>
</blockquote>
<h2 id="实战-一个简单的slack-webhook应用" tabindex="-1"><a class="header-anchor" href="#实战-一个简单的slack-webhook应用" aria-hidden="true">#</a> 实战：一个简单的Slack Webhook应用</h2>
<p>接下来我就以上面的“办公室主任”问题来具体演示一下一个简单的Slack Webhook应用的实现方法。</p>
<p>首先，我们需要一台可以运行Web程序的服务器，这台服务器上运行我们的主程序：包括值日逻辑的实现，后台设置界面等；这台服务器还需要支持计划任务以便我们的程序可以自动执行而不需要手工操作。为了减少开发工作量，我使用了我们擅长的drupal作为框架来开发。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '64.md' style='float:left'>⬆️上一节🔗  </a><a href = '66.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


