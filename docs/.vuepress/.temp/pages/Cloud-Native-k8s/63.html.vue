<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第63节-prometheus-和-grafana-日志收集方案" tabindex="-1"><a class="header-anchor" href="#第63节-prometheus-和-grafana-日志收集方案" aria-hidden="true">#</a> 第63节 Prometheus 和 Grafana 日志收集方案</h1>
<div><a href = '62.md' style='float:left'>⬆️上一节🔗  </a><a href = '64.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="prometheus-和-grafana-日志收集方案" tabindex="-1"><a class="header-anchor" href="#prometheus-和-grafana-日志收集方案" aria-hidden="true">#</a> Prometheus 和 Grafana 日志收集方案</h2>
<p>如果你是一个 DevOps 工程师，那么 Prometheus 和 Grafana 这两个名字肯定不会陌生。它们是目前最受欢迎的开源监控解决方案之一。但是你知道吗？它们不仅仅可以用于监控应用程序的性能，还可以用于收集和可视化日志数据。在本文中，我们将重点介绍 Prometheus 和 Grafana 的日志收集方案，帮助你更好地理解如何利用它们来管理和分析应用程序的日志数据。</p>
<p>Prometheus 和 Grafana 是 Kubernetes 监控方案中最知名的两个。</p>
<ul>
<li>Prometheus 负责收集、存储、查询数据</li>
<li>Grafana 负责将 Prometheus 中的数据可观化展示</li>
</ul>
<h3 id="使用-helm-一键安装-prometheus-和-grafana" tabindex="-1"><a class="header-anchor" href="#使用-helm-一键安装-prometheus-和-grafana" aria-hidden="true">#</a> 使用 Helm 一键安装 Prometheus 和 Grafana</h3>
<p>使用 Helm 一键安装 Prometheus 和 Grafana非常容易。Helm 是 Kubernetes 的一个包管理器，可以帮助我们轻松部署和管理应用程序。如果你还没有安装 Helm，请先按照官方文档进行安装。然后，只需要执行以下命令即可：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ helm repo <span class="token function">add</span> promethues-community <span class="token operator">&lt;</span>https://prometheus-community.github.io/helm-charts<span class="token operator">></span>
<span class="token string">"promethues-community"</span> has been added to your repositories
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>查看当前添加的所有 repo 列表：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ helm repo list
NAME                    URL
horizon                 <span class="token operator">&lt;</span>https://horizoncd.github.io/helm-charts<span class="token operator">></span>
azure                   <span class="token operator">&lt;</span>http://mirror.azure.cn/kubernetes/charts/<span class="token operator">></span>
promethues-community    <span class="token operator">&lt;</span>https://prometheus-community.github.io/helm-charts<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><aside> 💡 在Kubernetes中，Helm是一种包管理器，可以帮助我们轻松部署和管理应用程序。Helm可以通过从不同的存储库中安装软件包（称为charts）来扩展其功能。charts包含了一个应用程序的所有 Kubernetes 配置资源，以及应用程序的依赖关系。Kubernetes社区维护了一个官方chart存储库，称为Helm Hub。除此之外，还有第三方的chart库，可以根据实际情况进行选择安装。</aside>
<p>使用 Helm 更新 Helm Chart 存储库的信息非常简单。只需要使用以下命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ helm repo update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将更新所有已添加的 Helm Chart 存储库的信息。如果有新的 Chart 发布，你就可以使用 Helm 安装它们了。</p>
<p>创建一个单独的 namespace：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubectl create ns monitor
namespace/monitor created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>用来区分、隔离和管理</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ helm <span class="token function">install</span> prometheus-stack prometheus-community/kube-prometheus-stack <span class="token parameter variable">-n</span> monitor
NAME: prometheus-stack
LAST DEPLOYED: Fri Mar <span class="token number">17</span> <span class="token number">17</span>:09:02 <span class="token number">2023</span>
NAMESPACE: monitor
STATUS: deployed
REVISION: <span class="token number">1</span>
NOTES:
kube-prometheus-stack has been installed. Check its status by running:
  kubectl <span class="token parameter variable">--namespace</span> monitor get pods <span class="token parameter variable">-l</span> <span class="token string">"release=prometheus-stack"</span>

Visit <span class="token operator">&lt;</span>https://github.com/prometheus-operator/kube-prometheus<span class="token operator">></span> <span class="token keyword">for</span> instructions on how to create <span class="token operator">&amp;</span> configure Alertmanager and Prometheus instances using the Operator.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将安装 Prometheus 运算符和 Grafana。在安装过程中，Helm 会自动创建 Kubernetes 资源并将它们配置为 Prometheus 和 Grafana 需要的样子。一旦安装完成，你可以使用以下命令检查 Prometheus 和 Grafana 的状态：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ kubectl --namespace monitor get pods -l "release=prometheus-stack"
NAME                                                   READY   STATUS    RESTARTS   AGE
prometheus-stack-kube-prom-operator-55db9ff59f-vkb7r   1/1     Running   0          2m11s
prometheus-stack-kube-state-metrics-69f68c59bf-75jmk   1/1     Running   0          2m11s
prometheus-stack-prometheus-node-exporter-27hxm        1/1     Running   0          2m11s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将列出所有正在运行的 Pod。你应该能够看到 Prometheus 和 Grafana 的 Pod。现在，你可以通过浏览器访问 Grafana，开始创建仪表盘并可视化 Prometheus 的数据了。</p>
<div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> TD<span class="token punctuation">;</span>
A<span class="token text string">[Start]</span> <span class="token arrow operator">--></span> B<span class="token text string">(安装Helm)</span><span class="token punctuation">;</span>
B <span class="token arrow operator">--></span> C<span class="token text string">(添加Helm Chart 存储库)</span><span class="token punctuation">;</span>
C <span class="token arrow operator">--></span> D<span class="token text string">(更新Helm Chart 存储库)</span><span class="token punctuation">;</span>
D <span class="token arrow operator">--></span> E<span class="token text string">(创建namespace)</span><span class="token punctuation">;</span>
E <span class="token arrow operator">--></span> F<span class="token text string">(安装Prometheus和Grafana)</span><span class="token punctuation">;</span>
F <span class="token arrow operator">--></span> G<span class="token text string">(检查状态)</span><span class="token punctuation">;</span>
G <span class="token arrow operator">--></span> H<span class="token text string">(访问Grafana)</span><span class="token punctuation">;</span>
H <span class="token arrow operator">--></span> I<span class="token text string">(创建仪表盘)</span><span class="token punctuation">;</span>
I <span class="token arrow operator">--></span> J<span class="token text string">(可视化Prometheus数据)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查看命名空间中其他依赖组件的状态" tabindex="-1"><a class="header-anchor" href="#查看命名空间中其他依赖组件的状态" aria-hidden="true">#</a> 查看命名空间中其他依赖组件的状态</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubectl get all <span class="token parameter variable">-n</span> monitor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/sm202303171721234.png" alt="http://sm.nsddd.top/sm202303171721234.png"></p>
<aside> 💡 接下来可以本地访问 Prometueus 了
    ,你可以通过以下步骤本地访问 Prometheus：</aside>
<ol>
<li>
<p>确保已经安装了 kubectl 命令行工具。</p>
</li>
<li>
<p>在命令行中执行以下命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl --namespace monitor port-forward svc/prometheus-stack-kube-prom-prometheus 9090:9090
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将在本地主机的 9090 端口上启动一个代理服务，将请求转发到 Prometheus 服务。</p>
</li>
<li>
<p>现在你可以在浏览器中访问 <code v-pre>http://localhost:9090</code> 来访问 Prometheus 的 Web UI 了。</p>
</li>
</ol>
<p>注意：这个代理服务只在当前命令行窗口有效。如果你关闭了该窗口，则代理服务也会停止工作。</p>
<h2 id="可观测性" tabindex="-1"><a class="header-anchor" href="#可观测性" aria-hidden="true">#</a> 可观测性</h2>
<p>我们及时知道了管理 kubernetes, 但是对于调用 pod 和集群管理，或许我们还缺少一个更重要的指标，那就是监控~</p>
<p>在昨天和 opentelemtry 的 FB 交流中， 我了解、关注到了 opentelemtry  可观测的方向，opentelemtry 已经从 CNCF 毕业了， 有望成为续 kubernetes 后最火的项目，或许现在他的知名度并不是很让人满意。</p>
<p>opentelemtry  已经是 可观测方向不争的标准了</p>
<blockquote>
<p>关于 APM trace metrics logs 三个维度</p>
</blockquote>
<h3 id="可观测性-1" tabindex="-1"><a class="header-anchor" href="#可观测性-1" aria-hidden="true">#</a> 可观测性</h3>
<p>集群的可观测性，我们希望给集群也安装上 “检查探针”，观察到集群的资源利用率和其他指标，让集群的整体运行状况对我们 “透明可见”，这样才能更精确的更多的做好集群的运维工作。</p>
<p>对于集群的可观测性，我们还可以使用 Prometheus 和 Grafana 进行监控和可视化。这些工具可以帮助我们更好地了解集群的运行状况和资源使用情况，并帮助我们快速诊断和解决问题。</p>
<p>除了 Metrics Server 和 opentelemetry，我们还可以考虑使用其他可观测性工具，如 Jaeger 和 Fluentd。这些工具可以帮助我们更好地了解应用程序的性能和行为，以及诊断和解决问题。</p>
<p>在实际使用中，我们需要根据自己的需求和情况选择合适的可观测性工具，并合理配置和使用它们，以便更好地监控和管理我们的集群和应用程序。</p>
<h3 id="metrics-server" tabindex="-1"><a class="header-anchor" href="#metrics-server" aria-hidden="true">#</a> Metrics Server</h3>
<p>Metrics Server 是 Kubernetes 中的一个核心组件，它可以收集和聚合关于 pod 和节点资源使用情况的指标数据。使用 Metrics Server，您可以监控和调整您的集群资源，以确保您的应用程序始终具有最佳的性能和可用性。</p>
<p>opentelemetry 是一个可观测性工具，它可以帮助您获得更全面的监控指标。通过使用 opentelemetry，您可以收集更多的数据，包括跟踪、日志和度量。这些数据可以帮助您更好地了解应用程序的性能和行为，并帮助您解决潜在的问题。</p>
<p>opentelemetry 已经成为可观测方向的标准，它是跨语言、跨系统和跨服务的数据收集和分析工具。您可以轻松地集成 opentelemetry 到您的应用程序中，从而获得更完整的监控数据。</p>
<p>如果您想了解更多关于 opentelemetry 的信息，可以访问官方文档，了解如何使用 opentelemetry 来监控您的应用程序。同时，您也可以查看 Metrics Server 的文档，了解如何使用它来监控您的 Kubernetes 集群。</p>
<h3 id="opentelemtry" tabindex="-1"><a class="header-anchor" href="#opentelemtry" aria-hidden="true">#</a> opentelemtry</h3>
<p><a href="https://opentelemetry.io/docs" target="_blank" rel="noopener noreferrer">Documentation<ExternalLinkIcon/></a></p>
<p>opentelemetry 是一个开源项目，它提供了一组工具和库，用于生成、收集和暴露跨语言、跨系统和跨服务的数据。通过使用 opentelemetry，您可以轻松地监控和调试您的应用程序，以及了解其性能和行为。此外，opentelemetry 还支持多种语言和平台，包括 Java、Go 和 Python。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '62.md' style='float:left'>⬆️上一节🔗  </a><a href = '64.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


