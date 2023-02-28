<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第40节-istio" tabindex="-1"><a class="header-anchor" href="#第40节-istio" aria-hidden="true">#</a> 第40节 Istio</h1>
<div><a href = '39.md' style='float:left'>⬆️上一节🔗  </a><a href = '41.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="项目地址" tabindex="-1"><a class="header-anchor" href="#项目地址" aria-hidden="true">#</a> 项目地址</h2>
<ul>
<li><a href="https://github.com/istio/istio" target="_blank" rel="noopener noreferrer">Github地址<ExternalLinkIcon/></a></li>
<li><a href="https://istio.io/latest" target="_blank" rel="noopener noreferrer">official website<ExternalLinkIcon/></a></li>
<li><a href="https://istio.io/latest/zh/docs/concepts/traffic-management/" target="_blank" rel="noopener noreferrer">oddicial docs<ExternalLinkIcon/></a></li>
</ul>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<blockquote>
<p><a href="https://istio.io/" target="_blank" rel="noopener noreferrer">Istio<ExternalLinkIcon/></a> 是由 Google、IBM 和 Lyft 开源的微服务管理、保护和监控框架。Istio 为希腊语，意思是”起航“。</p>
</blockquote>
<p>Istio 是一个开源服务网格平台，它提供了许多功能，包括负载均衡、服务网格、监控、安全等。</p>
<p>Istio 的目标是使得部署、连接、管理微服务变得简单。它提供了一种方法来连接、管理和保护服务的运行，无需修改服务本身。</p>
<p>Istio 运行在 Kubernetes 环境中，可以简化部署、连接、管理微服务的过程。它通过使用代理服务器（例如 Envoy）来控制流量、验证和授权服务间的通信。</p>
<p>Istio 主要由三个组件组成：</p>
<ul>
<li>Pilot：负责管理代理的配置，并提供服务发现功能。</li>
<li>Mixer：负责收集和发送网络流量数据。</li>
<li>Citadel：负责身份验证和授权。</li>
</ul>
<p>Istio 还提供了许多其他功能，如：</p>
<ul>
<li>请求路由</li>
<li>运行时配置</li>
<li>服务间身份验证</li>
<li>熔断和重试</li>
<li>监控和报告</li>
</ul>
<p>Istio 可以帮助你管理服务之间的流量，保护你的服务不被滥用，并提供可观察性来帮助你快速诊断问题。</p>
<p><img src="https://jimmysong.io/kubernetes-handbook/images/istio-mindmap.png" alt="Istio的mindmap"></p>
<h2 id="架构" tabindex="-1"><a class="header-anchor" href="#架构" aria-hidden="true">#</a> 架构</h2>
<p>Istio 服务网格从逻辑上分为数据平面和控制平面。</p>
<ul>
<li><strong>数据平面</strong>由一组智能代理（<a href="https://www.envoyproxy.io/" target="_blank" rel="noopener noreferrer">Envoy<ExternalLinkIcon/></a>）组成，被部署为 <a href="https://jimmysong.io/kubernetes-handbook/GLOSSARY.html#sidecar" target="_blank" rel="noopener noreferrer">sidecar<ExternalLinkIcon/></a>。</li>
<li><strong>控制平面</strong>管理并配置代理来进行流量路由。</li>
</ul>
<p>Istio 的核心架构由三个组件组成：</p>
<ul>
<li><strong>Envoy</strong>：一种高性能代理服务器，负责处理服务之间的流量。它运行在每个服务的边界，并提供负载均衡、监控、安全等功能。</li>
<li><strong>Pilot</strong>：负责管理 Envoy 代理的配置，并提供服务发现功能。</li>
<li><strong>Mixer</strong>：负责收集和发送网络流量数据。</li>
</ul>
<p>以下是 Istio 架构的高级概述：</p>
<ol>
<li>应用程序服务部署在一组节点上，并使用 Envoy 代理进行通信。</li>
<li>Envoy 代理运行在每个服务的边界，控制流量、监控和保护服务间的通信。</li>
<li>Pilot 管理 Envoy 代理的配置，并向 Envoy 发送服务发现信息。</li>
<li>Mixer 收集网络流量数据，并与其他组件集成来提供访问控制、计费、监控等功能。</li>
</ol>
<p><img src="http://sm.nsddd.top/sm202301061530498.png" alt="image-20230106153033404"></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '39.md' style='float:left'>⬆️上一节🔗  </a><a href = '41.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


