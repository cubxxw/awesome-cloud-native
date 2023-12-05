<template><div><h1 id="kubeblocks-学习和调研报告" tabindex="-1"><a class="header-anchor" href="#kubeblocks-学习和调研报告" aria-hidden="true">#</a> KubeBlocks 学习和调研报告</h1>
<h2 id="服务" tabindex="-1"><a class="header-anchor" href="#服务" aria-hidden="true">#</a> 服务</h2>
<p>非常专业，非常热情</p>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<p>非常方便</p>
<p>基于 Kubernetes ，https://console.apecloud.cn 选择下面这个 KubeBlocks Anywhere</p>
<p>Kubeblock 会 询问你一些问题，然后引导你下载 YAML</p>
<p>运行<code v-pre>kubectl apply -f [path to file]/openim-bootstrap.yaml</code>在你的kubernetes集群上。</p>
<p>一旦安装了引导YAML文件，目标的状态将反映在状态面板中。一般需要1-2分钟完成注册。</p>
<p>速度非常快，没有障碍。</p>
<p><strong>安装的步骤：</strong></p>
<ul>
<li>[x] Kubernetes 的链接</li>
<li>[ ] Kubeblocks 的链接</li>
<li>[ ] 签入成功</li>
</ul>
<h2 id="为什么需要" tabindex="-1"><a class="header-anchor" href="#为什么需要" aria-hidden="true">#</a> 为什么需要</h2>
<p>我们知道，因为 OpenIM 的数据库非常多，现在为止，用到了 Mysql，Redis，Mongo</p>
<p>Kubernetes 最开始是并不合适做有状态数据库管理的。</p>
<p>Deployment 中滚动更新和升级中哪个 Pod 能下线是不能随便选择的，可能数据库有主从模式，这种场景下光靠 Deployment 自己就很难应对了。</p>
<p>虽然 Kubernetes 提供了另一个抽象方式，帮助我们应对其他一些用 Deployment 无法处理的应用编排场景，这个设计就是对有状态应用的管理，<strong>StatefulSet</strong></p>
<p>Deployment 不足以颠覆所有的应用问题，deployment 对应用做了一个简单的假设，所有的应用 pod 都是一样的，相互之间没有顺序，也无所谓在哪台宿主机上运行。需要时 Deployment 就可以通过 Pod 模板创建新的 Pod 。不需要的时候可以随时终结一个 Pod。</p>
<p>但是分布式应用中，它的多个实例往往有多种关系，比如说 主从关系，主备关系；还有数据库存储类应用。它的多个实例往往会在本地磁盘上保存一份数据，而这些实例一旦被结束，即使重建出来，实例和数据之间对应的关系也已经丢失，导致应用失败。</p>
<p>所以说，实例之间有一种不平等的关系，以及实例对外部数据有依赖的应用，就称之为有状态应用。</p>
<p>Kubernetes 对 Deployment 基础上扩展了对有状态应用的基本支持，编排功能就是 StatefluSet</p>
<p>它抽象出来了两种情况：</p>
<ul>
<li>拓扑结构：应用的多个实例之间不是完全对等的，这些实例必须要按照一定的优先级顺序启动，比如说 主节点A 要依赖 从节点 B 启动。</li>
<li>存储状态：应用的多个实例分别绑定了不同的存储数据。对于这些应用实例来说，Pod  A 第一次读取到的数据和隔了 10 分钟之后再次读取到的数据应该是同一份，哪怕在此期间 Pod A 被重新创建过。</li>
</ul>
<p>与云提供商集成的困难，缺乏可靠的运营商，以及学习的难度</p>
<p>K8S曲线KubeBlocks提供了一个开源选项，可以帮助应用程序开发人员和平台</p>
<p>工程师为RDBMS、NoSQL、流媒体和分析系统设置了功能丰富的服务。</p>
<p>不需要成为K8的专业人士，任何人都可以建立一个完整的堆栈，生产就绪型数据基础架构。</p>
<h2 id="enhanced-stateful-workloads" tabindex="-1"><a class="header-anchor" href="#enhanced-stateful-workloads" aria-hidden="true">#</a> Enhanced stateful workloads</h2>
<p>KubeBlocks扩展了K8的StatefulSet功能，支持ReplicationSet和PocksusSet工作负载。</p>
<p>他们知道数据库集群中的不同角色，并选择对业务连续性影响最小的最佳更新策略，监控数据复制状态并自动修复错误和延迟。</p>
<p>KubeBlocks处理复杂性，并为MySQL，PostgreSQL，Redis和MongoDB提供最先进的管理体验。</p>
<p>它提供了按需配置、扩展、监控、备份和恢复，降低了数据库管理的风险和从开发到生产所需的时间。</p>
<p><strong>强大而直观的CLI</strong></p>
<p>ClickOps以耗时和容易出错而闻名。KubeBlocks为生产力提供了kblog。您可以安装KubeBlocks，并使用单个命令在桌面或云端上启动游乐场环境。kbstrike简化了在Kubernetes中使用data infra的学习曲线。</p>
<h2 id="kubeblocks-解决了哪些问题-参考官方文档" tabindex="-1"><a class="header-anchor" href="#kubeblocks-解决了哪些问题-参考官方文档" aria-hidden="true">#</a> KubeBlocks 解决了哪些问题（参考官方文档）</h2>
<ul>
<li>https://kubeblocks.io/docs/preview/user_docs/overview/introduction</li>
</ul>
<p>Kubernetes已经成为容器编排的事实标准。它通过ReplicaSet提供的可扩展性和可用性以及Deployment提供的推出和回滚功能来管理数量不断增加的无状态工作负载。</p>
<p>然而，管理有状态工作负载对Kubernetes提出了巨大的挑战。虽然StatefulSet提供了稳定的持久存储和唯一的网络标识符，但这些能力对于复杂的有状态工作负载来说还远远不够。</p>
<p>为了应对这些挑战，并解决复杂性问题，KubeBlocks引入了ReplicationSet和ReplicsusSet，具有以下功能：</p>
<ul>
<li>基于角色的更新顺序可减少因升级版本、扩展和重新启动而导致的停机时间。</li>
<li>维护数据复制的状态并自动修复复制错误或延迟。</li>
</ul>
<h2 id="关键特征" tabindex="-1"><a class="header-anchor" href="#关键特征" aria-hidden="true">#</a> 关键特征</h2>
<ul>
<li>兼容AWS、GCP、Azure和阿里云。</li>
<li>支持MySQL、PostgreSQL、Redis、MongoDB、Kafka等。</li>
<li>提供生产级性能、恢复能力、可扩展性和可观察性。</li>
<li>简化第2天的操作，如升级、扩展、监控、备份和恢复。</li>
<li>包含一个强大而直观的命令行工具。</li>
</ul>
<h2 id="安装-kbcup" tabindex="-1"><a class="header-anchor" href="#安装-kbcup" aria-hidden="true">#</a> 安装 kbcup</h2>
<p>只需要一条命令部署：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://kubeblocks.io/installer/install_cli.sh <span class="token operator">|</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>尝试KubeBlocks的最快方法是创建一个新的Kubernetes集群，并使用playground安装KubeBlocks。但是，生产环境更加复杂，应用程序运行在不同的命名空间中，并且具有资源或权限限制。</p>
<p>命令 <code v-pre>kbcli kubeblocks install</code> 在 <code v-pre>kb-system</code> 命名空间中安装KubeBlocks，或者您可以使用 <code v-pre>--namespace</code> 标志指定一个。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli kubeblocks <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看可用版本。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli kubeblocks list-versions
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 <code v-pre>--version</code> 指定一个版本并运行下面的命令。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli kubeblocks <span class="token function">install</span> <span class="token parameter variable">--version</span><span class="token operator">=</span>x.x.x
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>验证：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli kubeblocks status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>除此之外，还可以 使用Helm安装KubeBlocks</strong></p>
<p>如果你用Helm安装KubeBlocks，要卸载它，你也必须使用Helm。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> kubeblocks https://apecloud.github.io/helm-charts
helm repo update
helm <span class="token function">install</span> kubeblocks kubeblocks/kubeblocks <span class="token punctuation">\</span>
    <span class="token parameter variable">--namespace</span> kb-system --create-namespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行以下命令，检查KubeBlocks是否安装成功。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli kubeblocks status
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="升级" tabindex="-1"><a class="header-anchor" href="#升级" aria-hidden="true">#</a> 升级</h2>
<p>升级对于用户来说是尤为重要的，我们来看下 kubeblocks 如何升级</p>
<p>KubeBlocks 0.6版本与0.5版本相比有许多图像更改。升级过程中，如果集群中有多个数据库实例，同时拉取镜像可能会导致实例长时间不可用。</p>
<h2 id="链接数据库" tabindex="-1"><a class="header-anchor" href="#链接数据库" aria-hidden="true">#</a> 链接数据库</h2>
<p>在部署KubeBlocks并创建集群之后，数据库将作为Pod在Kubernetes上运行。您可以通过客户端接口或 <code v-pre>kbcli</code> 连接到数据库。如下图所示，您必须清楚连接数据库的目的。</p>
<ul>
<li>要试用KubeBlocks并测试数据库功能，或使用低流测试进行基准测试，请参阅在测试环境中连接数据库。</li>
<li>若要在生产环境中连接数据库，或进行高流量压力测试，请参见在生产环境中连接数据库。</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202311152112253.png" alt="Connect database"></p>
<h3 id="在测试环境中连接数据库" tabindex="-1"><a class="header-anchor" href="#在测试环境中连接数据库" aria-hidden="true">#</a> 在测试环境中连接数据库</h3>
<p><strong>程序1.使用kblog cluster connect命令</strong></p>
<p>您可以使用 <code v-pre>kbcli cluster connect</code> 命令并指定要连接的群集名称。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli cluster connect <span class="token variable">${cluster-name}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面的命令实际上是 <code v-pre>kubectl exec</code> 。只要可以访问K8s API服务器，该命令就可以正常工作。</p>
<p><strong>程序2.使用CLI或SDK客户端连接数据库</strong></p>
<p>执行以下命令，获取目标数据库的网络信息，并使用打印的IP地址进行连接。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli cluster connect --show-example <span class="token variable">${cluster-name}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>打印的信息包括数据库地址，端口号，用户名密码下图是MySQL数据库网络信息示例。</p>
<ul>
<li>地址：-h指定服务器地址。在下面的示例中，它是127.0.0.1</li>
<li>Port：-P指定端口号，在下面的示例中为3306。</li>
<li>用户名：-u是用户名。</li>
<li>密码：-p显示密码。在下面的例子中，它是hQBCKZLI。</li>
</ul>
<blockquote>
<p>密码不包括-p。</p>
</blockquote>
<h3 id="在生产环境中连接数据库" tabindex="-1"><a class="header-anchor" href="#在生产环境中连接数据库" aria-hidden="true">#</a> 在生产环境中连接数据库</h3>
<p>在生产环境中，通常使用CLI和SDK客户端连接数据库。有三种情况。</p>
<ul>
<li>场景1：客户端1和数据库在同一个Kubernetes集群中。要连接client1和数据库，请参见过程3。</li>
<li>场景2：客户端2在Kubernetes集群之外，但与数据库在同一个VPC中。要连接client2和数据库，请参见过程5。</li>
<li>场景3：Client 3和数据库位于不同的私有网络中，例如其他私有网络或公网。要连接client3和数据库，请参见过程4。</li>
</ul>
<p>请参阅下图以获得网络位置的清晰图像。</p>
<p><img src="http://sm.nsddd.top/sm202311152130380.png" alt="image-20231115213009244"></p>
<p><strong>步骤3.连接同一Kubernetes集群中的数据库</strong></p>
<p>您可以使用数据库连接的域名或网址。要检查数据库端点，请使用 <code v-pre>kbcli cluster describe ${cluster-name}</code> 。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli cluster describe x
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="可观测性" tabindex="-1"><a class="header-anchor" href="#可观测性" aria-hidden="true">#</a> 可观测性</h2>
<p>通过内置的数据库可观察性，您可以观察数据库的健康状态，并实时跟踪和测量数据库，以优化数据库性能。本节向您展示数据库监控工具如何与KubeBlocks一起工作以及如何使用该函数。</p>
<p>KubeBlocks通过插件的方式集成了Prometheus、AlertManager、Grafana等开源监控组件，并采用自定义的 <code v-pre>apecloud-otel-collector</code> 来收集数据库和主机的监控指标。部署KubeBlocks Playground时，将启用所有监控附加组件。</p>
<p>KubeBlock Playground支持以下内置监控插件：</p>
<ul>
<li><code v-pre>prometheus</code> ：它包括Prometheus和AlertManager附加组件。</li>
<li><code v-pre>grafana</code> ：它包括Grafana监控插件。</li>
<li><code v-pre>alertmanager-webhook-adaptor</code> ：它包含通知扩展插件，用于扩展AlertManager的通知功能。目前支持飞书、鼎Talk、WeChat企业号等自定义机器人。</li>
<li><code v-pre>apecloud-otel-collector</code> ：用于收集数据库和主机的指标。</li>
</ul>
<p>查看所有内置加载项并确保已启用监视加载项。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># View all add-ons supported</span>
kbcli addon list
<span class="token punctuation">..</span>.
grafana                        Helm   Enabled                   <span class="token boolean">true</span>                                                                                    
alertmanager-webhook-adaptor   Helm   Enabled                   <span class="token boolean">true</span>                                                                                    
prometheus                     Helm   Enabled    alertmanager   <span class="token boolean">true</span> 
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看仪表板列表。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli dashboard list
<span class="token operator">></span>
NAME                                 NAMESPACE   PORT    CREATED-TIME
kubeblocks-grafana                   kb-system   <span class="token number">13000</span>   Jul <span class="token number">24,2023</span> <span class="token number">11</span>:38 UTC+0800
kubeblocks-prometheus-alertmanager   kb-system   <span class="token number">19093</span>   Jul <span class="token number">24,2023</span> <span class="token number">11</span>:38 UTC+0800
kubeblocks-prometheus-server         kb-system   <span class="token number">19090</span>   Jul <span class="token number">24,2023</span> <span class="token number">11</span>:38 UTC+0800
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开并查看监控仪表板的Web控制台。比如说，</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli dashboard <span class="token function">open</span> kubeblocks-grafana
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="启用监控功能" tabindex="-1"><a class="header-anchor" href="#启用监控功能" aria-hidden="true">#</a> 启用监控功能</h3>
<p>KubeBlocks提供了一个插件 <code v-pre>victoria-metrics-agent</code> ，用于将监控数据推送到与Prometheus远程写入协议兼容的第三方监控系统。与原生的Prometheus相比，vmgent更轻，支持水平扩展。</p>
<ol>
<li>
<p>启用数据推送。</p>
<p>您只需提供支持Prometheus远程写入协议的端点，即可支持多个端点。有关如何获取端点的信息，请参阅第三方监控系统的教程。</p>
<p>下面的示例显示了如何通过不同的选项启用数据推送。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># The default option. You only need to provide an endpoint with no verification.</span>
<span class="token comment"># Endpoint example: http://localhost:8428/api/v1/write</span>
kbcli addon <span class="token builtin class-name">enable</span> victoria-metrics-agent <span class="token parameter variable">--set</span> <span class="token assign-left variable">remoteWriteUrls</span><span class="token operator">=</span><span class="token punctuation">{</span>http://<span class="token operator">&lt;</span>remoteWriteUrl<span class="token operator">></span>:<span class="token operator">&lt;</span>port<span class="token operator">></span>/<span class="token operator">&lt;</span>remote <span class="token function">write</span> path<span class="token operator">></span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>(可选）水平缩放 <code v-pre>victoria-metrics-agent</code> 附加组件。</p>
<p>当数据库实例数量持续增加时，单节点虚拟机成为瓶颈。这个问题可以通过缩放vmagent来解决。多节点虚拟机根据Hash策略自动划分数据采集任务。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli addon <span class="token builtin class-name">enable</span> victoria-metrics-agent <span class="token parameter variable">--replicas</span> <span class="token operator">&lt;</span>replica count<span class="token operator">></span> <span class="token parameter variable">--set</span> <span class="token assign-left variable">remoteWriteUrls</span><span class="token operator">=</span><span class="token punctuation">{</span>http://<span class="token operator">&lt;</span>remoteWriteUrl<span class="token operator">></span>:<span class="token operator">&lt;</span>port<span class="token operator">></span>/<span class="token operator">&lt;</span>remote <span class="token function">write</span> path<span class="token operator">></span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>（可选）禁用 <code v-pre>victoria-metrics-agent</code> 加载项。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kbcli addon disable victoria-metrics-agent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<h3 id="观察mysql集群" tabindex="-1"><a class="header-anchor" href="#观察mysql集群" aria-hidden="true">#</a> 观察MySQL集群</h3>
<p>KubeBlocks支持完整的可观察性功能。本节演示KubeBlocks的监控功能。</p>
<p><strong>步骤：</strong></p>
<p>打开grafana仪表板。</p>
</div></template>


