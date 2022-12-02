<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第33节-postman请求server" tabindex="-1"><a class="header-anchor" href="#第33节-postman请求server" aria-hidden="true">#</a> 第33节 Postman请求Server</h1>
<div><a href = '32.md' style='float:left'>⬆️上一节🔗  </a><a href = '34.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="需要" tabindex="-1"><a class="header-anchor" href="#需要" aria-hidden="true">#</a> 需要</h2>
<p><strong>因为我们一般 debug 我们的代码，那么需要这个代码被触发掉。kubernetes 的Informer 会导致许许多多的客户端都有本地的缓存。</strong></p>
<p>Informer 内部实现极其复杂，所以很少有相关的文章，如果需要请谷歌搜索外文。</p>
<p>Informer 是 Client-go 中的一个核心工具包。在 Kubernetes 源码中，如果 Kubernetes 的某个组件，需要 List/Get Kubernetes 中的 Object，在绝大多 数情况下，会直接使用 Informer 实例中的 Lister()方法（该方法包含 了 Get 和 List 方法），而很少直接请求 Kubernetes API。Informer 最基本 的功能就是 List/Get Kubernetes 中的 Object。</p>
<h2 id="postman请求-api-server" tabindex="-1"><a class="header-anchor" href="#postman请求-api-server" aria-hidden="true">#</a> Postman请求 APi Server</h2>
<p><strong>最大的问题：如何登陆和授权。</strong></p>
<h2 id="建立-server-account" tabindex="-1"><a class="header-anchor" href="#建立-server-account" aria-hidden="true">#</a> 建立 Server Account</h2>
<p>Server Account 机制是 Kubernetes 中组件和 API Server 交互的标准方式</p>
<h2 id="建立-secret-1-24" tabindex="-1"><a class="header-anchor" href="#建立-secret-1-24" aria-hidden="true">#</a> 建立 Secret ( &gt;=1.24)</h2>
<p>出于安全考虑，1.24版本和以后版本，不再自动为一个 Server Account 创建 Secret ，需要自己手动创建。</p>
<h2 id="建立-clusterrole" tabindex="-1"><a class="header-anchor" href="#建立-clusterrole" aria-hidden="true">#</a> 建立 ClusterRole</h2>
<p>为 SA 授权，能够操作 API 对象</p>
<h2 id="获取-secret-中的证书" tabindex="-1"><a class="header-anchor" href="#获取-secret-中的证书" aria-hidden="true">#</a> 获取 Secret 中的证书</h2>
<p>Token 将放在http Header 中发送到 API Server 从而进行鉴权</p>
<h2 id="提取-secret-中的证书" tabindex="-1"><a class="header-anchor" href="#提取-secret-中的证书" aria-hidden="true">#</a> 提取 Secret 中的证书</h2>
<p>为了能和 API  Server 建立安全连接，Postman需要 改 SA 对应证书</p>
<h2 id="下载证书并且上传到-postman" tabindex="-1"><a class="header-anchor" href="#下载证书并且上传到-postman" aria-hidden="true">#</a> 下载证书并且上传到 Postman</h2>
<p>把下载好的证书 下载到 Postman 所在机器，并上传到 Postman 设置中</p>
<h2 id="访问" tabindex="-1"><a class="header-anchor" href="#访问" aria-hidden="true">#</a> 访问</h2>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '32.md' style='float:left'>⬆️上一节🔗  </a><a href = '34.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


