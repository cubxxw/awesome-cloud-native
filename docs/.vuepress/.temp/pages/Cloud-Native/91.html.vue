<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第91节-openim-集群化构建" tabindex="-1"><a class="header-anchor" href="#第91节-openim-集群化构建" aria-hidden="true">#</a> 第91节 OpenIM 集群化构建</h1>
<div><a href = '90.md' style='float:left'>⬆️上一节🔗  </a><a href = '92.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="拆分微服务" tabindex="-1"><a class="header-anchor" href="#拆分微服务" aria-hidden="true">#</a> 拆分微服务</h2>
<h2 id="kubernetes-集群设计方案" tabindex="-1"><a class="header-anchor" href="#kubernetes-集群设计方案" aria-hidden="true">#</a> Kubernetes 集群设计方案</h2>
<h3 id="ingress-controller-的选择" tabindex="-1"><a class="header-anchor" href="#ingress-controller-的选择" aria-hidden="true">#</a> Ingress-Controller 的选择</h3>
<p>为了提供一个可伸缩和灵活的环境，我们打算使用以下Ingress-Controller：</p>
<ul>
<li>
<p><strong>开发和初期阶段</strong>： 使用<code v-pre>nginx-controller</code>。</p>
<p><em>理由</em>：简单，快速，易于配置，适合早期开发和测试。</p>
</li>
<li>
<p><strong>生产和扩展阶段</strong>：考虑使用<code v-pre>traefik</code>或<code v-pre>istio</code>。</p>
<p><em>理由</em>：为了满足生产环境的复杂性和可扩展性需求。</p>
</li>
</ul>
<h3 id="基础组件层的部署" tabindex="-1"><a class="header-anchor" href="#基础组件层的部署" aria-hidden="true">#</a> 基础组件层的部署</h3>
<p>我们将使用<code v-pre>Helm charts</code>来部署以下基础组件：</p>
<ul>
<li>MySQL</li>
<li>Redis</li>
<li>MongoDB</li>
<li>Kafka</li>
<li>Loki</li>
<li>Prometheus</li>
<li>Grafana</li>
</ul>
<p><em>理由</em>：<code v-pre>Helm</code>能够简化 Kubernetes 应用程序的部署、升级和管理，使得基础组件的部署更加简洁。</p>
<h3 id="应用层的设计" tabindex="-1"><a class="header-anchor" href="#应用层的设计" aria-hidden="true">#</a> 应用层的设计</h3>
<p>对于<code v-pre>openim-server</code>和<code v-pre>openim-chat</code>，考虑以下策略：</p>
<ul>
<li>
<p>为<code v-pre>openim-server</code>和<code v-pre>openim-chat</code>的每一个模块都建立单独的<code v-pre>Helm chart</code>。</p>
<p><em>理由</em>：这样可以方便地收集日志、监控以及重启的状态管理。</p>
</li>
</ul>
<h3 id="openim-server-和-openim-chat-的-k8s-适配" tabindex="-1"><a class="header-anchor" href="#openim-server-和-openim-chat-的-k8s-适配" aria-hidden="true">#</a> openim-server 和 openim-chat 的 K8s 适配</h3>
<ul>
<li>
<p>现有的通过 zookeep 服务发现将被替换，改为通过K8s的<code v-pre>servicename</code>域名通信。</p>
<p><em>理由</em>：在Kubernetes环境中，使用servicename进行服务发现更加直观，且易于管理和扩展。</p>
</li>
</ul>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结：</h3>
<p>此设计方案的核心是使用Kubernetes和Helm来简化和标准化应用的部署和管理。通过合理选择Ingress-Controller和利用Kubernetes的服务发现功能，我们可以确保系统的可扩展性和稳定性。</p>
<p>希望这个设计方案能满足您的需求。如果有进一步的细节或考虑需要加入请告诉我，我会很乐意帮助您完善设计方案。</p>
<h2 id="openim-集群化部署讨论会记录" tabindex="-1"><a class="header-anchor" href="#openim-集群化部署讨论会记录" aria-hidden="true">#</a> OpenIM 集群化部署讨论会记录</h2>
<h3 id="关于开源部署环境的演变与变化" tabindex="-1"><a class="header-anchor" href="#关于开源部署环境的演变与变化" aria-hidden="true">#</a> 关于开源部署环境的演变与变化</h3>
<ul>
<li><strong>新部署方法</strong>：一种集二进制和部署于一体的一键操作。</li>
<li><strong>Kubernetes 部署</strong>：在 Kubernetes 环境中实现一键部署的新型方案。</li>
<li><strong>现存问题</strong>：涉及日志收集、服务重启追踪等，将在后续对这些问题进行改进并寻求解决方案。</li>
</ul>
<h3 id="cicd的开发与维护策略" tabindex="-1"><a class="header-anchor" href="#cicd的开发与维护策略" aria-hidden="true">#</a> CICD的开发与维护策略</h3>
<ul>
<li><strong>CICD 概念</strong>：通过CICD实现Code Streaming。</li>
<li><strong>开发阶段</strong>：需要编写出镜像文件。<strong>GitHub的CSD功能</strong>：已实现但尚待深入研究。</li>
<li><strong>版本标记策略</strong>：推荐使用local branch而非直接标签。</li>
</ul>
<h3 id="关于软件开发与测试的实践经验分享" tabindex="-1"><a class="header-anchor" href="#关于软件开发与测试的实践经验分享" aria-hidden="true">#</a> 关于软件开发与测试的实践经验分享</h3>
<ul>
<li><strong>本地开发</strong>：推荐使用“auto-compile”工具快速生成稳定版本的镜像。</li>
<li><strong>团队协作</strong>：介绍了各团队间如何协同进行开发、测试和发布。</li>
<li><strong>代码重用</strong>：提及将库中的函数或方法封装为组件，实现跨项目调用。</li>
</ul>
<h3 id="docker-deployment与service-configuration" tabindex="-1"><a class="header-anchor" href="#docker-deployment与service-configuration" aria-hidden="true">#</a> Docker Deployment与Service Configuration</h3>
<ul>
<li><strong>配置传递</strong>：主要通过如K8S中的配置文件。</li>
<li><strong>部署方式</strong>：介绍了二进制部署和可部署两种策略，并讨论了各自的优缺点。</li>
</ul>
<h3 id="关于容器化部署和代码优化的探讨" tabindex="-1"><a class="header-anchor" href="#关于容器化部署和代码优化的探讨" aria-hidden="true">#</a> 关于容器化部署和代码优化的探讨</h3>
<ul>
<li><strong>容器化</strong>：提议将多个进程合并为一个容器进行管理。</li>
<li><strong>部署方式兼容性</strong>：讨论了如何实现并进行微调。</li>
<li><strong>技术架构和组件</strong>：如Helm chat、OpenM等，及其在系统中的作用和重要性。</li>
</ul>
<h3 id="关于一键部署的技术问题与解决方案" tabindex="-1"><a class="header-anchor" href="#关于一键部署的技术问题与解决方案" aria-hidden="true">#</a> 关于一键部署的技术问题与解决方案</h3>
<ul>
<li><strong>一键部署问题</strong>：可能的问题有无法翻墙、无法安装等。</li>
<li><strong>解决方案</strong>：1) 将现有方案通用化；2) 采用第三方服务实现一键部署。</li>
</ul>
<h3 id="k8s部署与自动化的优化策略" tabindex="-1"><a class="header-anchor" href="#k8s部署与自动化的优化策略" aria-hidden="true">#</a> K8S部署与自动化的优化策略</h3>
<ul>
<li><strong>部署工具</strong>：如使用Shell实现一键部署、K ks部署等。</li>
<li><strong>组件整合</strong>：考虑如何将不同组件组合成完整解决方案，并保持不同环境中的一致性。</li>
</ul>
<h3 id="微服务架构中的最佳实践" tabindex="-1"><a class="header-anchor" href="#微服务架构中的最佳实践" aria-hidden="true">#</a> 微服务架构中的最佳实践</h3>
<ul>
<li><strong>应用程序部署</strong>：建议将应用程序划分为不同的容器，每个容器内运行一个业务进程。</li>
<li><strong>代码整合</strong>：提议将相关代码整合为一个文件进行管理。</li>
</ul>
<h3 id="微服务的优化与部署策略" tabindex="-1"><a class="header-anchor" href="#微服务的优化与部署策略" aria-hidden="true">#</a> 微服务的优化与部署策略</h3>
<ul>
<li><strong>微服务划分</strong>：强调避免过于细致的模块分割。</li>
<li><strong>自动化</strong>：部署时不增加额外维护工作量，采用自动化策略。</li>
</ul>
<h3 id="关于存储方式和编排工具的选择" tabindex="-1"><a class="header-anchor" href="#关于存储方式和编排工具的选择" aria-hidden="true">#</a> 关于存储方式和编排工具的选择</h3>
<ul>
<li><strong>文件存储</strong>：如使用NFS作为本地分布式文件存储。</li>
<li><strong>编排工具</strong>：推荐使用 rook 进行对象存储编排，数据库使用专用编排器。</li>
</ul>
<h3 id="nfs与flexible-file-system的应用" tabindex="-1"><a class="header-anchor" href="#nfs与flexible-file-system的应用" aria-hidden="true">#</a> NFS与Flexible File System的应用</h3>
<ul>
<li><strong>苹果手机上的MFS</strong>：讨论了其使用情况和如何同步全局配置文件到各业务模块。</li>
<li><strong>PV/PVC管理数据</strong>：示例讲解如何使用此文件系统进行数据管理。</li>
</ul>
<h3 id="二进制代码与配置文件的应用" tabindex="-1"><a class="header-anchor" href="#二进制代码与配置文件的应用" aria-hidden="true">#</a> 二进制代码与配置文件的应用</h3>
<ul>
<li><strong>代码适配</strong>：通过配置文件进行，涉及传递配置路径、文件映射等细节。</li>
</ul>
<h3 id="关于软件开发中的优化与改进" tabindex="-1"><a class="header-anchor" href="#关于软件开发中的优化与改进" aria-hidden="true">#</a> 关于软件开发中的优化与改进</h3>
<ul>
<li><strong>项目脚本编写</strong>：讨论了性能瓶颈、部署统一处理、服务发现模块的优化建议。</li>
</ul>
<h3 id="关于web应用配置文件的编写与优化" tabindex="-1"><a class="header-anchor" href="#关于web应用配置文件的编写与优化" aria-hidden="true">#</a> 关于Web应用配置文件的编写与优化</h3>
<ul>
<li><strong>IP分配</strong>：配置文件用于IP分配和模块间分段处理。</li>
<li><strong>接口应用</strong>：如在不同环境使用不同的接口实现心跳等功能。</li>
<li><strong>技术架构改进</strong>：优化轻量化、提高开发效率和维护效果等。</li>
</ul>
<p><strong>结论</strong>：本次讨论会涉及了开源部署环境的多个方面，从软件开发、部署、测试到微服务架构和存储方式等多个领域。希望通过此次讨论，可以为OpenIM的集群化部署提供有力的参考和指导。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '90.md' style='float:left'>⬆️上一节🔗  </a><a href = '92.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


