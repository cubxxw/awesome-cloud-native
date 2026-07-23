<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第81节-openim-的-gitops-的设计" tabindex="-1"><a class="header-anchor" href="#第81节-openim-的-gitops-的设计" aria-hidden="true">#</a> 第81节 OpenIM 的 GitOps 的设计</h1>
<div><a href = '80.md' style='float:left'>⬆️上一节🔗  </a><a href = '82.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h2>
<p>最近OpenIM 线上出现一些故障，在 https://web-enterprise.rentsoft.cn/ 环境中，我们有一个同学因为使用修复 <code v-pre>make lint</code> 的错误，所以就有一个很大的 PR, 但是这个 PR 针对一些错误的处理没有包裹，所以就出现问题了，结果导致我们的 IM 很长时间没办法用。</p>
<p>思考这一现象到底是什么问题导致的，很明显，我们确实是可以回滚的，但是更多的是回滚后，我们也会有很多的问题，代码总归是要继续提交的，无非就是延迟了进度。还有我们对外部的测试环境和体验环节中，可能会带来一些不好的体验，这总归不是我们想要的。</p>
<p>既然我们自己在做部署方案，集群化方案，我们应该是把这套方案完美的应用到自己的身上，这样才能更多的在生产中发现问题并且解决问题，这才是我们想要去做的。</p>
<blockquote>
<p><strong>Note</strong></p>
<p>If the OpenIM cluster is deployed in the <code v-pre>openim</code> namespace, use the <code v-pre>-n</code> argument to specify the namespace. If the namespace does not exist, you can use <code v-pre>--create-namespace</code> to create a new namespace. Please do not modify the following chart names: <code v-pre>im-mysql</code>, <code v-pre>im-kafka</code>, <code v-pre>im-minio</code>, <code v-pre>im-mongodb</code>, <code v-pre>im-redis</code>, otherwise, you will need to synchronize the <code v-pre>serviceName</code> information to <code v-pre>config-imserver.yaml</code> and <code v-pre>config-chatserver.yaml</code>. Please do not modify the account information in these five configuration files, otherwise, you will need to synchronize the middleware account information to <code v-pre>config-imserver.yaml</code> and <code v-pre>config-chatserver.yaml</code>.</p>
<p>These configuration files include account information, for example, <code v-pre>minio-config.yaml</code> also includes domain information.</p>
</blockquote>
<h2 id="install-openim-server-service" tabindex="-1"><a class="header-anchor" href="#install-openim-server-service" aria-hidden="true">#</a> Install OpenIM Server Service</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> openimserver <span class="token parameter variable">-f</span> k8s-open-im-server-config.yaml <span class="token parameter variable">-f</span> config-imserver.yaml <span class="token parameter variable">-f</span> notification.yaml  ./openim/openim-server/ <span class="token parameter variable">-n</span> openim
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Ensure that the domain information is configured in <code v-pre>open-im-server-config.yaml</code>. Account information defaults to sync with the middleware (<code v-pre>infra/</code>) <code v-pre>-config.yaml</code> files. If <code v-pre>config.yaml</code> was modified when installing the middleware, please sync modify <code v-pre>open-im-server-config.yaml</code>.</p>
<h2 id="install-openim-chat-service" tabindex="-1"><a class="header-anchor" href="#install-openim-chat-service" aria-hidden="true">#</a> Install OpenIM Chat Service</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> openim-chat <span class="token parameter variable">-f</span> k8s-chat-server-config.yaml ./openim/openim-chat/ <span class="token parameter variable">-n</span> openim
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Ensure that the domain information is configured in <code v-pre>k8s-chat-server-config.yaml</code>. Account information defaults to sync with the middleware <code v-pre>-config.yaml</code> files. If <code v-pre>config.yaml</code> was modified when installing the middleware, please sync modify <code v-pre>k8s-chat-server-config.yaml</code>.</p>
<h2 id="install-web-frontend" tabindex="-1"><a class="header-anchor" href="#install-web-frontend" aria-hidden="true">#</a> Install Web Frontend</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> imwebfront <span class="token parameter variable">-f</span> k8s-webfront-config.yaml ./webfront/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Note</strong>: Please configure the domain information in <code v-pre>k8s-webfront-config.yaml</code>, and modify it to your actual domain and TLS name.</p>
<h2 id="install-admin-frontend" tabindex="-1"><a class="header-anchor" href="#install-admin-frontend" aria-hidden="true">#</a> Install Admin Frontend</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> imadminfront <span class="token parameter variable">-f</span> k8s-adminfront-config.yaml ./adminfront/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Note</strong>: Please configure the domain information in <code v-pre>k8s-adminfront-config.yaml</code>, and modify it to your actual domain and TLS name.</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '80.md' style='float:left'>⬆️上一节🔗  </a><a href = '82.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://cubxxw.com/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


