<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第12节-ingress" tabindex="-1"><a class="header-anchor" href="#第12节-ingress" aria-hidden="true">#</a> 第12节 Ingress</h1>
<div><a href = '11.md' style='float:left'>⬆️上一节🔗  </a><a href = '13.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="ingress" tabindex="-1"><a class="header-anchor" href="#ingress" aria-hidden="true">#</a> Ingress</h2>
<p><strong>Ingress：service的统一网关入口（nginx实现）</strong></p>
<div class="custom-container tip"><p class="custom-container-title">解释</p>
<ul>
<li>Ingress 是对集群中服务的外部访问进行管理的 API 对象，典型的访问方式是 HTTP。</li>
<li>Ingress 可以提供负载均衡、SSL 终结和基于名称的虚拟托管。</li>
</ul>
</div>
<div class="custom-container warning"><p class="custom-container-title">作用</p>
<ol>
<li>
<p>帮助位于集群中的<code v-pre>Service</code>能够有一个对外可达的<code v-pre>url</code>，即让集群外的客户端也可以访问到自己。(wxy：对于这一点，<code v-pre>NodePort</code>类型的<code v-pre>Service</code>也可以，后面会说到)</p>
</li>
<li>
<p>做专业的负载均衡，毕竟<code v-pre>Service</code>的负载均衡还是很初级的</p>
</li>
<li>
<p>终结<code v-pre>ssl/tls</code>。意思是说对于那些业务不提供<code v-pre>https</code>的，为了安全，可以有专门机构帮我们做安全方面的事，业务只需要专注业务就行了，所以可以说是&quot;过滤&quot;<code v-pre>ssl/tls</code></p>
</li>
<li>
<p>基于名称的虚拟<code v-pre>hosting</code>。这个我理解就是我们常说的Ingress是一个基于应用层提供服务的，因为<code v-pre>Ingress</code>不仅负责一个业务/Service, 而是可以根据名称区分不同的&quot;hosting&quot;....（wxy: 继续看看可能就理解了）</p>
</li>
</ol>
</div>
<div class="custom-container tip"><p class="custom-container-title">ingress解决了什么问题？</p>
<ol>
<li>
<p><strong>动态配置服务</strong></p>
<blockquote>
<p>如果按照传统方式, 当新增加一个服务时, 我们可能需要在流量入口加一个反向代理指向我们新的k8s服务. 而如果用了Ingress, 只需要配置好这个服务, 当服务启动时, 会自动注册到Ingress的中, 不需要而外的操作.</p>
</blockquote>
</li>
<li>
<p><strong>减少不必要的端口暴露</strong></p>
<blockquote>
<p>配置过k8s的都清楚, 第一步是要关闭防火墙的, 主要原因是k8s的很多服务会以NodePort方式映射出去, 这样就相当于给宿主机打了很多孔, 既不安全也不优雅. 而Ingress可以避免这个问题, 除了Ingress自身服务可能需要映射出去, 其他服务都不要用NodePort方式</p>
</blockquote>
</li>
</ol>
</div>
<p>Ingress 公开从集群外部到集群内服务的 HTTP 和 HTTPS 路由。 流量路由由 Ingress 资源上定义的规则控制。</p>
<p><img src="http://sm.nsddd.top/smimage-20221022201520335.png" alt="image-20221022201520335"></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '11.md' style='float:left'>⬆️上一节🔗  </a><a href = '13.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


