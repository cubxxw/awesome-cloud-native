<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第17节-service-lb" tabindex="-1"><a class="header-anchor" href="#第17节-service-lb" aria-hidden="true">#</a> 第17节 Service LB</h1>
<div><a href = '16.md' style='float:left'>⬆️上一节🔗  </a><a href = '18.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="loadbalance" tabindex="-1"><a class="header-anchor" href="#loadbalance" aria-hidden="true">#</a> LoadBalance</h2>
<p>LoadBalance 通常分成两种类型：Client Side 和 Server side。</p>
<p><strong>通常的配置如下：</strong></p>
<ul>
<li>Round robin：这种方法持续地循环连接到它的服务列表。当虚拟服务器收到请求时，它会将连接分配给列表中的第一个服务，然后将该服务移动到列表的底部。</li>
<li>最少连接：默认方法，当虚拟服务器配置为使用最少连接时，它会选择活动连接最少的服务。</li>
<li>最小响应时间：此方法选择活动连接最少、平均响应时间最低的服务。</li>
</ul>
<h2 id="k3s功能拓展——service-lb-controller" tabindex="-1"><a class="header-anchor" href="#k3s功能拓展——service-lb-controller" aria-hidden="true">#</a> k3s功能拓展——Service LB Controller</h2>
<p><code v-pre>Service LB Controller</code>借用类型为 <code v-pre>LoadBalancer</code> 的 <code v-pre>Service API</code><img src="http://sm.nsddd.top/smwebp22" alt="img"></p>
<p><strong>工作原理如下：</strong></p>
<p>1、<code v-pre>svc-controller watch</code>到service类型为<code v-pre>LoadBalancer</code>时，自动创建一个<code v-pre>Daemonset</code>；</p>
<p>2、默认Daemonset会部署到每个节点，如果任意Node设定了<code v-pre>label svccontroller.k3s.cattle.io/enablelb=true</code>，则只在拥有这个label的node上创建DS的pod;</p>
<p>3、对于某个部署的节点，一个<code v-pre>LB port</code>只会对应一个POD， 端口不能重复使用;</p>
<p>4、若创建失败或无可用端口时，service的状态为<code v-pre>Pending</code></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '16.md' style='float:left'>⬆️上一节🔗  </a><a href = '18.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


