<template><div><h1 id="_131-openim-的集群化方案讨论-总结" tabindex="-1"><a class="header-anchor" href="#_131-openim-的集群化方案讨论-总结" aria-hidden="true">#</a> 131: OpenIM 的集群化方案讨论 / 总结</h1>
<h2 id="会议和参考链接" tabindex="-1"><a class="header-anchor" href="#会议和参考链接" aria-hidden="true">#</a> 会议和参考链接</h2>
<ul>
<li>会议参考文档：https://nsddd.notion.site/2899028707604b8090b36677c031cdf8?pvs=4</li>
<li>视频回放：Bilibili: https://www.bilibili.com/video/BV1s8411q7Um/?spm_id_from=333.999.0.0</li>
</ul>
<p><strong>评论：</strong></p>
<ul>
<li>那个中间件我觉得可以换成 https://kubeblocks.io 可以帮你管理多个数据库中间件</li>
<li>im 读取配置信息，读取的是 config/ 目录，代码中硬编码补充的 config.yaml，是否可以自动化来对 不同 服务的 rpc 划分，然后统一目录，默认读取的是二进制运行路径的上两层</li>
<li>openim version: https://github.com/openimsdk/open-im-server/blob/main/docs/conversions/version.md</li>
<li>存储可以考虑使用 ：
<ul>
<li>https://github.com/openebs/openebs</li>
<li>https://github.com/rook/rook</li>
</ul>
</li>
</ul>
<p><strong>核心目标：</strong></p>
<p>开源项目和非开源项目的最大的区别，就是一套完整的解决方案。</p>
<ul>
<li>非开源项目的 集群化部署方案的设计，比较在乎稳定，以及高效，快速，最好一键部署。</li>
<li>开源项目的 集群化部署方案的设计，比较在乎通用性，上手的难度，后期的维护难度，基础架构的稳定性。后面的开发者或者是贡献者，使用者，可以基于此创建自己的集群化部署方案，以及解决方案，并且成为 OpenIM 的集群化部署方案的使用案例。</li>
</ul>
<h2 id="openim-集群化部署讨论会记录" tabindex="-1"><a class="header-anchor" href="#openim-集群化部署讨论会记录" aria-hidden="true">#</a> OpenIM 集群化部署讨论会记录</h2>
<p>先总结，后详细解读  ~</p>
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
<h2 id="openim-集群通用设计思路" tabindex="-1"><a class="header-anchor" href="#openim-集群通用设计思路" aria-hidden="true">#</a> OpenIM 集群通用设计思路</h2>
<h3 id="整体思想" tabindex="-1"><a class="header-anchor" href="#整体思想" aria-hidden="true">#</a> 整体思想</h3>
<ul>
<li><strong>部署方式</strong>：
<ul>
<li>二进制（已实现）</li>
<li>docker-compose（已实现）</li>
<li>k8s部署（目标为一键部署，配合 sealos）</li>
<li><a href="https://github.com/openimsdk/openim-docker" target="_blank" rel="noopener noreferrer">openim-docker GitHub地址<ExternalLinkIcon/></a></li>
</ul>
</li>
<li><strong>代码与部署适配</strong>：同一份业务代码应适配三种部署方式，差异仅在部署脚本。具体可通过<code v-pre>install.sh</code>的传参和环境变量进行扩展性设计。</li>
<li><strong>服务进程独立化</strong>：考虑将<code v-pre>openim-server</code>和<code v-pre>openim-chat</code>容器内的多个进程进行独立成容器，目的为简化日志收集、容易追踪服务重启与panic、便捷的监控以及精细化的扩容。这也更契合微服务的思想。</li>
<li><strong>CICD流程</strong>：开发阶段和正式发布阶段的镜像<code v-pre>tag</code>需要有所区别。开发阶段编译的镜像<code v-pre>tag</code>为分支名；正式发布的<code v-pre>tag</code>为<code v-pre>release</code>加版本号；提测阶段<code v-pre>tag</code>名称为<code v-pre>rc0</code>,<code v-pre>rc1</code>,<code v-pre>rc2</code>...。这样便于开发阶段进行速度更新。</li>
<li><strong>服务配置策略</strong>：全部服务的配置信息都应通过<code v-pre>yaml</code>配置文件传递，具体的启动命令为 <code v-pre>openim -c /data/openim/config.yaml</code>。默认配置为从<code v-pre>/data/服务名称/config.yaml</code>读配置文件。配置文件应涵盖全部运行所需的配置信息。</li>
<li><strong>部署脚本细节</strong>：
<ul>
<li><code v-pre>docker-compose</code>：继续使用<code v-pre>shell+compose.yaml</code>策略，为每个服务抽取一个<code v-pre>config.yaml</code>配置文件，并映射进容器的<code v-pre>/data/openim/</code>目录。</li>
<li><code v-pre>k8s</code>：采用<code v-pre>shell+helm chart</code>策略。基础架构组件在我们自己的helm repo中维护一个开源稳定版本和默认配置<code v-pre>value.yaml</code>。所有的基础服务配置应维护在一个全局配置文件<code v-pre>openim.yaml</code>内，用于覆盖默认<code v-pre>value.yaml</code>。</li>
</ul>
</li>
</ul>
<h3 id="各helm-chart编写" tabindex="-1"><a class="header-anchor" href="#各helm-chart编写" aria-hidden="true">#</a> 各helm chart编写</h3>
<p>| <strong>分类</strong>                | <strong>包含</strong>                                                     | <strong>说明</strong>                                                     | <strong>备注</strong>                                        |
| ----- |  |  | ----- |
| ingress-controller      | nginx-ingress                                                | 目前主流的ingress-controller有三个：istio，traefik，nginx。推荐后期过度到traefik。 | 配置http和ws走相同端口。                        |
| 业务服务模块            | openim-api, openimmsg-gateway, openim-push, openim-msgtransfer, openim-rpc-*, 前端模块 | 建议对轻量级负责数据库存储的rpc服务进行合并到openim-api。    | 服务分太细会增加维护性。                        |
| 基础架构模块            | mysql, redis, mongodb, kafka, loki, Prometheus, grafana, zookeeper | 维护一个稳定的开源helm chart和默认value。                    | 推送到我们自己的helm repo，便于管理和用户安装。 |
| 全局配置文件openim.yaml | 覆盖所有业务模块helm的value.yaml                             | 抽象全局相同的配置信息。                                     | 如：基础架构账户，url信息，pvc路径映射信息等。  |
| shell脚本               | 对服务选择性进行Installation，restart，delete。              | 脚本需捕获helm安装成功或失败的返回值。                       | 完成基础的模板化和自动化功能。                  |</p>
<p><strong>Helm chart目录结构</strong>：<a href="https://wdcdn.qpic.cn/MTY4ODg1NDc5OTQ3MTMwMw_344519_vqHmjF7xlPMUz1ht_1694910900?sign=1694915159-592367056-0-b8360271e7d98a1b531eb3a5713ceb85" target="_blank" rel="noopener noreferrer">查看链接<ExternalLinkIcon/></a></p>
<h3 id="应用配置文件适配" tabindex="-1"><a class="header-anchor" href="#应用配置文件适配" aria-hidden="true">#</a> 应用配置文件适配</h3>
<ul>
<li>二进制部署：通过<code v-pre>-c /data/openim/config.yaml</code>命令行参数传递。</li>
<li>docker-compose：映射配置文件进容器的<code v-pre>/data/服务名称/</code>目录。</li>
<li>k8s：创建configmap，并在deployment中映射至容器内。</li>
</ul>
<h3 id="应用服务发现与服务注册的适配" tabindex="-1"><a class="header-anchor" href="#应用服务发现与服务注册的适配" aria-hidden="true">#</a> 应用服务发现与服务注册的适配</h3>
<p>由于k8s自带服务发现和服务注册机制，考虑进行适配以简化部署。具体做法是在<code v-pre>discoveryregistry.SvcDiscoveryRegistry</code>上再封装一层，对于docker-compose和二进制部署，维持原来流程。若为k8s部署，则使用服务名的内部域名进行通信。</p>
<h3 id="修改点" tabindex="-1"><a class="header-anchor" href="#修改点" aria-hidden="true">#</a> 修改点</h3>
<ul>
<li><strong>CICD</strong>：使用github actions实现。构建流程要使得在<code v-pre>dev</code>,<code v-pre>test</code>,<code v-pre>release</code>三种环境中生成对应的镜像tag。</li>
<li><strong>部署功能</strong>：维护三套部署脚本和对应的yaml配置文件。</li>
<li><strong>开发建议</strong>：微服务划分不宜过多。建议选择轻量级的云原生模块，并对公共模块进行独立维护。</li>
</ul>
<h2 id="设计步骤" tabindex="-1"><a class="header-anchor" href="#设计步骤" aria-hidden="true">#</a> 设计步骤</h2>
<p><strong>OpenIM</strong> 是一个开源的即时通讯解决方案。为了保障其在大规模应用场景下的高可用性和高性能，集群化的部署设计，侧重于为OpenIM提供一个专业、完整的集群化设计指南，涵盖从基础架构、持续集成/部署到微服务化优化的所有关键步骤。</p>
<h3 id="基础架构设计" tabindex="-1"><a class="header-anchor" href="#基础架构设计" aria-hidden="true">#</a> 基础架构设计</h3>
<h4 id="网络设计" tabindex="-1"><a class="header-anchor" href="#网络设计" aria-hidden="true">#</a> 网络设计</h4>
<ul>
<li><strong>子网规划</strong>：确保每个可用区(AZ)有其独立的子网，并保证其之间的隔离性。</li>
<li><strong>Load Balancer</strong>：使用云提供商或开源负载均衡器（如 Nginx、HAProxy）以保障高可用性和流量分发。</li>
</ul>
<h4 id="存储设计" tabindex="-1"><a class="header-anchor" href="#存储设计" aria-hidden="true">#</a> 存储设计</h4>
<ul>
<li><strong>持久化存储</strong>：利用云原生的持久化解决方案，如 AWS EBS、GCE Persistent Disk 或开源的 Rook。</li>
<li><strong>日志与监控</strong>：集成ELK (Elasticsearch, Logstash, Kibana) 或 EFK (Elasticsearch, Fluentd, Kibana) 堆栈，确保日志的实时收集、分析和展示。</li>
</ul>
<h3 id="ci-cd-gitops" tabindex="-1"><a class="header-anchor" href="#ci-cd-gitops" aria-hidden="true">#</a> CI/CD &amp; GitOps</h3>
<h4 id="持续集成" tabindex="-1"><a class="header-anchor" href="#持续集成" aria-hidden="true">#</a> 持续集成</h4>
<ul>
<li><strong>编译与测试</strong>：集成 Jenkins、GitLab CI 或 GitHub Actions，确保每次代码提交后进行自动化的单元测试和构建。</li>
</ul>
<h4 id="持续部署" tabindex="-1"><a class="header-anchor" href="#持续部署" aria-hidden="true">#</a> 持续部署</h4>
<ul>
<li><strong>部署流程</strong>：确保每次成功的构建可以自动推送到测试环境，并有流程支持自动或半自动推送到生产环境。</li>
<li><strong>配置管理</strong>：利用 Helm 或 Kustomize，实现应用配置的版本化管理与自动部署。</li>
</ul>
<h4 id="gitops" tabindex="-1"><a class="header-anchor" href="#gitops" aria-hidden="true">#</a> GitOps</h4>
<ul>
<li>采用 ArgoCD 或 Flux，实现声明式的应用部署。确保所有集群的变更都可以通过 Git 追踪。</li>
</ul>
<h3 id="容器化与服务编排" tabindex="-1"><a class="header-anchor" href="#容器化与服务编排" aria-hidden="true">#</a> 容器化与服务编排</h3>
<h4 id="容器设计" tabindex="-1"><a class="header-anchor" href="#容器设计" aria-hidden="true">#</a> 容器设计</h4>
<ul>
<li>使用 Docker 作为容器解决方案，确保服务的隔离性和一致性。</li>
<li>镜像存储在私有或公开的容器仓库中，如 Docker Hub、Quay.io 或云提供商的容器仓库。</li>
</ul>
<h4 id="kubernetes-作为服务编排工具" tabindex="-1"><a class="header-anchor" href="#kubernetes-作为服务编排工具" aria-hidden="true">#</a> Kubernetes 作为服务编排工具</h4>
<ul>
<li><strong>多集群管理</strong>：考虑使用 Rancher 或 Kubefed，实现跨多个集群的统一管理。</li>
<li><strong>网络策略</strong>：利用 Calico 或 Cilium，为 Pod 间通信实现网络策略和安全。</li>
</ul>
<h3 id="微服务化优化" tabindex="-1"><a class="header-anchor" href="#微服务化优化" aria-hidden="true">#</a> 微服务化优化</h3>
<h4 id="服务划分" tabindex="-1"><a class="header-anchor" href="#服务划分" aria-hidden="true">#</a> 服务划分</h4>
<ul>
<li><strong>功能分离</strong>：确保每个微服务只做一件事，并做好它。</li>
<li><strong>通信</strong>：采用 gRPC 或 RESTful API 作为微服务间的通信方式。</li>
</ul>
<h4 id="服务发现与负载均衡" tabindex="-1"><a class="header-anchor" href="#服务发现与负载均衡" aria-hidden="true">#</a> 服务发现与负载均衡</h4>
<ul>
<li>利用 Istio 或 Linkerd，为微服务提供服务网格功能，实现服务发现、负载均衡、灰度发布等高级功能。</li>
</ul>
<h4 id="限流与熔断" tabindex="-1"><a class="header-anchor" href="#限流与熔断" aria-hidden="true">#</a> 限流与熔断</h4>
<ul>
<li>使用 Hystrix 或 Sentinel，为微服务提供限流、熔断和降级策略。</li>
</ul>
<h3 id="监控与告警" tabindex="-1"><a class="header-anchor" href="#监控与告警" aria-hidden="true">#</a> 监控与告警</h3>
<h4 id="监控" tabindex="-1"><a class="header-anchor" href="#监控" aria-hidden="true">#</a> 监控</h4>
<ul>
<li>使用 Prometheus 和 Grafana，提供实时的监控数据展示。</li>
</ul>
<h4 id="日志" tabindex="-1"><a class="header-anchor" href="#日志" aria-hidden="true">#</a> 日志</h4>
<ul>
<li>利用 Loki 或 Fluentd，为集群提供日志聚合功能。</li>
</ul>
<h4 id="告警" tabindex="-1"><a class="header-anchor" href="#告警" aria-hidden="true">#</a> 告警</h4>
<ul>
<li>结合 Alertmanager 或 ElastAlert，确保在关键问题发生时能及时通知相关团队。</li>
</ul>
<h3 id="安全" tabindex="-1"><a class="header-anchor" href="#安全" aria-hidden="true">#</a> 安全</h3>
<h4 id="网络安全" tabindex="-1"><a class="header-anchor" href="#网络安全" aria-hidden="true">#</a> 网络安全</h4>
<ul>
<li><strong>Pod 网络策略</strong>：利用 NetworkPolicies 限制 Pod 之间的不必要通信。</li>
<li><strong>入口/出口流量</strong>：使用 Istio 的 egress 和 ingress gateway 控制集群的流入和流出流量。</li>
</ul>
<h4 id="iam" tabindex="-1"><a class="header-anchor" href="#iam" aria-hidden="true">#</a> IAM</h4>
<ul>
<li>使用 OpenID Connect 或 Dex，为 Kubernetes 提供统一身份验证。</li>
</ul>
</div></template>


