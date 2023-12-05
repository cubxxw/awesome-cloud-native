<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第90节-gitops-进阶理论" tabindex="-1"><a class="header-anchor" href="#第90节-gitops-进阶理论" aria-hidden="true">#</a> 第90节 GitOps 进阶理论</h1>
<div><a href = '89.md' style='float:left'>⬆️上一节🔗  </a><a href = '91.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>前面我们介绍了 GitOps 的基础理论。阅读GitOps 实践理论：Kubernetes 部署策略深入解析：https://nsddd.top/zh/posts/gitops-practice-theory-part/</p>
<p>这一节我们来看看 GitOps 的进阶部分，包括访问控制与安全处理，Secret ，以及 可观测性表现。</p>
<p>话不多说，我们立马开始  ~</p>
<h2 id="访问控制" tabindex="-1"><a class="header-anchor" href="#访问控制" aria-hidden="true">#</a> 访问控制</h2>
<p>安全主题既关键又复杂。通常，它是由一个安全专家甚至是一个专门的安全团队来处理的。那么，为什么我们在谈论它的同时，指责GitOps呢？GitOps改变安全责任的方式与改变操作责任边界的方式相同。借助GitOps和Kubernetes，工程团队可以编写Kubernetes访问配置并使用Git强制执行正确的配置更改流程，从而提高安全性。考虑到安全团队不再是一个瓶颈，它可以将一些责任卸给开发人员，专注于提供安全基础设施。GitOps促进了安全工程师和DevOps工程师之间更紧密、更高效的协作，允许任何影响环境安全的拟议更改在影响生产之前经过适当的安全审查和批准。</p>
<p><strong>我继续来解释一下什么是访问控制：</strong></p>
<blockquote>
<p>为了更好地结合GitOps理解访问控制的细微差别，我们先来了解一下什么是访问控制。访问控制是限制对系统或物理或虚拟资源的访问的一种方式。它规定了允许谁访问受保护的资源以及允许执行哪些操作。访问控制由两部分组成：身份验证，确保用户是他们所说的那个人；授权，确保他们有适当的访问权来对指定的资源执行所请求的操作。不管在哪个领域，访问控制包括三个主要组成部分：主体、客体和引用监视器。访问控制系统最直接的演示是一个物理世界的例子：一个人试图通过门进入建筑物。人是一个试图接近客体的主体，客体是一个建筑物。门是一个参考监视器，只有当试图进入的人拥有门钥匙时，它才会授权访问请求。</p>
</blockquote>
<p>就比如说对于我们 OpenIM 团队来说，可能每个人都需要一套环境，需要一套 namespace，如何做到隔离性和访问控制对于我们来说尤为重要。</p>
<p><img src="http://sm.nsddd.top/sm202311282113848.png" alt="image-20231128211345647"></p>
<p><strong>要保护什么？</strong></p>
<p>将应用程序交付流程端到端地保护到Kubernetes集群时，需要保护许多不同的组件。其中包括（但不限于）</p>
<ul>
<li>CICD 管道</li>
<li>Container registry</li>
<li>Git 仓库</li>
<li>Kubernetes 集群</li>
<li>云提供商和数据中心</li>
<li>应用程序本身</li>
<li>GitOps Operator（如果需要）</li>
</ul>
<p>这些组件中的每一个都有其独特的安全问题、身份验证机制和基于角色的访问控制（RBAC）模型，并且将根据许多因素和考虑进行不同的配置。由于安全性取决于最薄弱的环节，因此所有组件在集群的整体安全性中扮演着同等重要的角色。一般来说，安全性的选择往往是安全性和便利性之间的平衡行为。可能非常安全的系统可能非常不方便以至于从用户的角度来看它变得不可用。作为运营商，目标是在不影响安全性的前提下，尽可能合理地提供方便的用户体验。影响组件安全性的一些考虑因素包括</p>
<h2 id="gitops操作员" tabindex="-1"><a class="header-anchor" href="#gitops操作员" aria-hidden="true">#</a> GitOps操作员</h2>
<p>这些组件中的每一个都有其独特的安全问题、身份验证机制和基于角色的访问控制（RBAC）模型，并且将根据许多因素和考虑进行不同的配置。由于安全性取决于最薄弱的环节，因此所有组件在集群的整体安全性中扮演着同等重要的角色。一般来说，安全性的选择往往是安全性和便利性之间的平衡行为。可能非常安全的系统可能非常不方便以至于从用户的角度来看它变得不可用。作为运营商，目标是在不影响安全性的前提下，尽可能合理地提供方便的用户体验。影响组件安全性的一些考虑因素包括:</p>
<ul>
<li>潜在的攻击向量</li>
<li>如果组件受损，最坏的后果是</li>
<li>谁应该被允许访问该服务</li>
<li>什么权限（RBAC）各种用户都有</li>
<li>可以采取哪些保护措施来减轻风险</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '89.md' style='float:left'>⬆️上一节🔗  </a><a href = '91.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


