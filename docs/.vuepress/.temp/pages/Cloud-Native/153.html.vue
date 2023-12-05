<template><div><h1 id="openim-关于-管理后台-和-监控-的部署和设计" tabindex="-1"><a class="header-anchor" href="#openim-关于-管理后台-和-监控-的部署和设计" aria-hidden="true">#</a> OpenIM 关于 管理后台 和 监控 的部署和设计</h1>
<p>OpenIM 提供了多种灵活的部署选项，适用于不同的环境和需求。以下是这些部署方案的简化和优化描述：</p>
<ol>
<li><strong>源码部署</strong>:
<ul>
<li><strong>普通源码部署</strong>：使用 nohup 方式进行部署。这是一种基础的部署方法，适合于开发和测试环境。详情参见：<a href="https://docs.openim.io/guides/gettingStarted/imSourceCodeDeployment" target="_blank" rel="noopener noreferrer">普通源码部署指南<ExternalLinkIcon/></a>。</li>
<li><strong>生产级部署</strong>：采用 system 方式，更适合于生产环境。这种方法提供了更高的稳定性和可靠性。详情参见：<a href="https://docs.openim.io/guides/gettingStarted/install-openim-linux-system" target="_blank" rel="noopener noreferrer">生产级部署指南<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><strong>集群部署</strong>:
<ul>
<li><strong>Kubernetes 部署</strong>：提供两种方式，包括通过 helm 和 sealos 进行部署。这适用于需要高可用性和可扩展性的环境。具体方法请参考：<a href="https://docs.openim.io/guides/gettingStarted/k8s-deployment" target="_blank" rel="noopener noreferrer">Kubernetes 部署指南<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><strong>Docker 部署</strong>:
<ul>
<li><strong>普通 Docker 方式</strong>：适用于快速部署和小型项目。详细信息请见：<a href="https://docs.openim.io/guides/gettingStarted/dockerCompose" target="_blank" rel="noopener noreferrer">Docker 部署指南<ExternalLinkIcon/></a>。</li>
<li><strong>Docker Compose 方式</strong>：提供了更便捷的服务管理和配置，适合于复杂的多容器应用。</li>
</ul>
</li>
</ol>
<p>接下来，我们将逐一介绍这些部署方法的具体步骤、监控和管理后台的配置，以及使用技巧，帮助您根据自己的需求选择最合适的部署方案。</p>
<h2 id="源码-docker" tabindex="-1"><a class="header-anchor" href="#源码-docker" aria-hidden="true">#</a> 源码 &amp; Docker</h2>
<h3 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h3>
<p>源码部署 openim-server 和 openim-chat ，其他的组件都是通过 Docker 部署。</p>
<p>docker 部署则通过 https://github.com/openimsdk/openim-docker 仓库一键部署所有的组件。</p>
<p>部署的配置文件，可以阅读 https://github.com/openimsdk/open-im-server/blob/main/scripts/install/environment.sh 文档了解如何学习以及熟悉各个环境变量。</p>
<p>对于 Prometheus 来说，默认是没有开启 Prometheus 的，如果需要开启的话，需要在 make init 之前设置环境变量：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">PROMETHEUS_ENABLE</span><span class="token operator">=</span>true   <span class="token comment"># 默认是 false </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后执行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> init
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3>
<p>要在 Grafana 中配置 Prometheus 数据源，请遵循以下步骤：</p>
<ol>
<li>
<p><strong>登录 Grafana</strong>: 首先，打开浏览器并访问 Grafana 的网址。如果您未更改端口，则地址通常为 <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000<ExternalLinkIcon/></a></p>
</li>
<li>
<p><strong>使用默认凭据登录</strong>: Grafana 的默认用户名和密码都是 <code v-pre>admin</code>。首次登录时，系统将提示您更改密码。</p>
</li>
<li>
<p><strong>进入数据源设置（DATA SOURCES)</strong>:</p>
<ul>
<li>在 Grafana 的左侧菜单中，寻找并点击“齿轮”图标，代表“配置”。</li>
<li>在配置菜单中，选择“数据源”。</li>
</ul>
</li>
<li>
<p><strong>添加新的数据源</strong>:</p>
<ul>
<li>在数据源页面，点击“添加数据源”按钮。</li>
<li>在列表中找到并选择“Prometheus”。</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202311141751692.png" alt="image-20231114175117374"></p>
<p>点击 <code v-pre>Add New connection</code> 可以添加更多的数据源，比如说 Loki (负责日志存储和处理查询)</p>
</li>
<li>
<p><strong>配置 Prometheus 数据源</strong>:</p>
<ul>
<li>
<p>在配置页面，填写 Prometheus 服务器的详细信息。这通常包括 Prometheus 服务的 URL（例如 OpenIM 默认部署的是 <code v-pre>http://172.28.0.1:19090</code>，如果 Prometheus 在同一台机器上运行）。</p>
<p>地址是和 和 <code v-pre>cat .env| grep DOCKER_BRIDGE_GATEWAY</code>  变量地址一致。OpenIM 和 组件之间通过 getway 链接的。端口 OpenIM 默认使用的 <code v-pre>19090</code></p>
</li>
<li>
<p>根据需要调整其他设置，例如认证、TLS 设置等。</p>
</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202311141803076.png" alt="image-20231114180351923"></p>
</li>
<li>
<p><strong>保存并测试</strong>:</p>
<ul>
<li>完成配置后，点击“保存&amp;测试”按钮以确保 Grafana 能够成功连接到 Prometheus。</li>
</ul>
</li>
</ol>
<p><strong>Grafana 中的 Dashboard 导入指南</strong></p>
<p>导入 Grafana Dashboard 是一个简洁的过程，适用于 OpenIM Server 应用服务和 Node Exporter。以下是详细步骤和必要的注意事项：</p>
<p><strong>关键指标概览与部署步骤</strong></p>
<p>在 Grafana 中监控 OpenIM，您需要关注以下三类关键指标，每个类别都有其特定的部署和配置步骤：</p>
<ol>
<li><strong>OpenIM 指标</strong> (<code v-pre>prometheus-dashboard.yaml</code>):
<ul>
<li><strong>配置文件路径</strong>：在 <code v-pre>config/prometheus-dashboard.yaml</code>。</li>
<li><strong>启用监控</strong>：设置环境变量 <code v-pre>export PROMETHEUS_ENABLE=true</code> 以启用 Prometheus 监控。</li>
<li><strong>更多信息</strong>：查看 <a href="https://docs.openim.io/configurations/prometheus-integration" target="_blank" rel="noopener noreferrer">OpenIM 配置指南<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><strong>Node Exporter</strong>:
<ul>
<li><strong>部署容器</strong>：部署 <code v-pre>quay.io/prometheus/node-exporter</code> 容器实现节点监控。</li>
<li><strong>获取 Dashboard</strong>：访问 <a href="https://grafana.com/grafana/dashboards/1860-node-exporter-full/" target="_blank" rel="noopener noreferrer">Node Exporter 全功能 Dashboard<ExternalLinkIcon/></a>，可以通过下载 YAML 文件或使用 ID 导入。</li>
<li><strong>部署指南</strong>：参阅 <a href="https://prometheus.io/docs/guides/node-exporter/" target="_blank" rel="noopener noreferrer">Node Exporter 部署文档<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><strong>中间件指标</strong>: 每种中间件都需要特定的步骤和配置以实现监控。以下是常见中间件的列表及其相关操作指南链接：
<ul>
<li><strong>MySQL</strong>:
<ul>
<li><strong>配置</strong>：确保 MySQL 开启了性能监控。</li>
<li><strong>链接</strong>：查看 <a href="https://grafana.com/docs/grafana/latest/datasources/mysql/" target="_blank" rel="noopener noreferrer">MySQL 监控配置指南<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><strong>Redis</strong>:
<ul>
<li><strong>配置</strong>：配置 Redis 以允许监控数据导出。</li>
<li><strong>链接</strong>：参考 <a href="https://grafana.com/docs/grafana/latest/datasources/redis/" target="_blank" rel="noopener noreferrer">Redis 监控指南<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><strong>MongoDB</strong>:
<ul>
<li><strong>配置</strong>：设置 MongoDB 的监控指标。</li>
<li><strong>链接</strong>：查看 <a href="https://grafana.com/grafana/plugins/grafana-mongodb-datasource/" target="_blank" rel="noopener noreferrer">MongoDB 监控指南<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><strong>Kafka</strong>:
<ul>
<li><strong>配置</strong>：整合 Kafka 与 Prometheus 监控。</li>
<li><strong>链接</strong>：参考 <a href="https://grafana.com/grafana/plugins/grafana-kafka-datasource/" target="_blank" rel="noopener noreferrer">Kafka 监控指南<ExternalLinkIcon/></a>。</li>
</ul>
</li>
<li><strong>Zookeeper</strong>:
<ul>
<li><strong>配置</strong>：确保 Zookeeper 可以被 Prometheus 监控。</li>
<li><strong>链接</strong>：查看 <a href="https://grafana.com/docs/grafana/latest/datasources/zookeeper/" target="_blank" rel="noopener noreferrer">Zookeeper 监控配置<ExternalLinkIcon/></a>。</li>
</ul>
</li>
</ul>
</li>
</ol>
<p><strong>导入步骤</strong>:</p>
<ol>
<li>
<p><strong>访问 Dashboard 导入界面</strong>:</p>
<ul>
<li>在 Grafana 的左侧菜单或右上角点击 <code v-pre>+</code> 图标，选择“创建”。</li>
<li>选择“导入”（Import dashboard）。</li>
</ul>
</li>
<li>
<p><strong>进行 Dashboard 导入</strong>:</p>
<ul>
<li><strong>通过文件上传</strong>：直接上传您的 YAML 文件。</li>
<li><strong>通过粘贴内容</strong>：打开 YAML 文件，复制内容，然后粘贴到导入界面。</li>
<li><strong>通过 Grafana.com Dashboard</strong>：访问 <a href="https://grafana.com/grafana/dashboards/" target="_blank" rel="noopener noreferrer">Grafana Dashboards<ExternalLinkIcon/></a>，搜索并通过 ID 导入所需 Dashboard。</li>
</ul>
<blockquote>
<p>Json model 也可以是你自定义的 Dashboard，需要对自己的业务进行调整，然后配置出来的，在 Dashboard 设置页面中，你可以找到一个 &quot;JSON Model&quot; 或 &quot;Export&quot;（导出）选项。点击这个选项将会显示 Dashboard 的 JSON 配置。你可以复制这个 JSON 配置以便后续导入。</p>
</blockquote>
</li>
<li>
<p><strong>配置 Dashboard</strong>:</p>
<ul>
<li>选择适当的数据源，例如之前设置的 Prometheus。</li>
<li>调整其他设置，如 Dashboard 名称或存放文件夹。</li>
</ul>
</li>
<li>
<p><strong>保存并查看 Dashboard</strong>:</p>
<ul>
<li>完成配置后，点击“导入”以完成操作。</li>
<li>导入成功后立即查看新 Dashboard。</li>
</ul>
</li>
</ol>
<p><strong>图示例：</strong></p>
<p><img src="http://sm.nsddd.top/sm202311141944953.png" alt="image-20231114194451673"></p>
<h3 id="docker-中监控运行指南" tabindex="-1"><a class="header-anchor" href="#docker-中监控运行指南" aria-hidden="true">#</a> Docker 中监控运行指南</h3>
<h4 id="简介" tabindex="-1"><a class="header-anchor" href="#简介" aria-hidden="true">#</a> 简介</h4>
<p>本指南提供了如何使用 Docker 运行 OpenIM 的步骤。OpenIM 是一款开源的即时通讯解决方案，可以通过 Docker 快速部署。更多信息请参考 <a href="https://github.com/openimsdk/openim-docker" target="_blank" rel="noopener noreferrer">OpenIM Docker GitHub<ExternalLinkIcon/></a>。</p>
<h4 id="前置条件" tabindex="-1"><a class="header-anchor" href="#前置条件" aria-hidden="true">#</a> 前置条件</h4>
<ul>
<li>确保已安装 Docker 和 Docker Compose。</li>
<li>基本了解 Docker 和容器化技术。</li>
</ul>
<h4 id="步骤-1-克隆仓库" tabindex="-1"><a class="header-anchor" href="#步骤-1-克隆仓库" aria-hidden="true">#</a> 步骤 1: 克隆仓库</h4>
<p>首先，克隆 OpenIM Docker 仓库:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/openimsdk/openim-docker.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>进入仓库目录并查看 <code v-pre>README</code> 文件，以获取更多信息和配置选项。</p>
<h4 id="步骤-2-启动-docker-compose" tabindex="-1"><a class="header-anchor" href="#步骤-2-启动-docker-compose" aria-hidden="true">#</a> 步骤 2: 启动 Docker Compose</h4>
<p>在仓库目录中，运行以下命令启动服务:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这会下载所需的 Docker 镜像并启动 OpenIM 服务。</p>
<h4 id="步骤-3-使用-openim-web-端" tabindex="-1"><a class="header-anchor" href="#步骤-3-使用-openim-web-端" aria-hidden="true">#</a> 步骤 3: 使用 OpenIM Web 端</h4>
<ul>
<li>打开浏览器的隐私模式，访问 <a href="http://localhost:11001/" target="_blank" rel="noopener noreferrer">OpenIM Web<ExternalLinkIcon/></a>。</li>
<li>注册两个用户，并尝试添加好友。</li>
<li>测试发送消息和图片。</li>
</ul>
<h4 id="运行效果" tabindex="-1"><a class="header-anchor" href="#运行效果" aria-hidden="true">#</a> 运行效果</h4>
<p><img src="http://sm.nsddd.top/sm202311151008639.png" alt="image-20231115100811208"></p>
<h4 id="步骤-4-访问管理后台" tabindex="-1"><a class="header-anchor" href="#步骤-4-访问管理后台" aria-hidden="true">#</a> 步骤 4: 访问管理后台</h4>
<ul>
<li>访问 <a href="http://localhost:11002/" target="_blank" rel="noopener noreferrer">OpenIM 管理后台<ExternalLinkIcon/></a>。</li>
<li>使用默认的用户名和密码 (<code v-pre>admin1:admin1</code>) 登录。</li>
</ul>
<p>运行效果图：</p>
<p><img src="http://sm.nsddd.top/sm202311151010116.png" alt="image-20231115101039837"></p>
<h4 id="步骤-5-进入监控界面" tabindex="-1"><a class="header-anchor" href="#步骤-5-进入监控界面" aria-hidden="true">#</a> 步骤 5: 进入监控界面</h4>
<ul>
<li>通过上续图片的 <a href="http://localhost:3000/login" target="_blank" rel="noopener noreferrer">监控界面<ExternalLinkIcon/></a> 登录。</li>
<li>使用默认的用户名和密码 (<code v-pre>admin:admin</code>)。</li>
</ul>
<h4 id="后续步骤" tabindex="-1"><a class="header-anchor" href="#后续步骤" aria-hidden="true">#</a> 后续步骤</h4>
<ul>
<li>按照 OpenIM 源码提供的步骤配置和管理服务。</li>
<li>参考 <code v-pre>README</code> 文件进行高级配置和管理。</li>
</ul>
<h4 id="常见问题解决" tabindex="-1"><a class="header-anchor" href="#常见问题解决" aria-hidden="true">#</a> 常见问题解决</h4>
<ul>
<li>如果遇到任何问题，请查阅 <a href="https://github.com/openimsdk/openim-docker" target="_blank" rel="noopener noreferrer">OpenIM Docker GitHub<ExternalLinkIcon/></a> 上的文档，或在 Issues 部分搜索相关问题。</li>
<li>如果问题还是没有解决，那么请你提一个 issue 到 <a href="https://github.com/openimsdk/openim-docker/issues/new/choose" target="_blank" rel="noopener noreferrer">openim-docker<ExternalLinkIcon/></a> 仓库或者是 <a href="https://github.com/openimsdk/open-im-server/issues/new/choose" target="_blank" rel="noopener noreferrer">openim-server<ExternalLinkIcon/></a> 仓库</li>
</ul>
<h2 id="kubernetes" tabindex="-1"><a class="header-anchor" href="#kubernetes" aria-hidden="true">#</a> Kubernetes</h2>
<p>参考 https://github.com/openimsdk/helm-charts</p>
<p>在 Kubernetes 环境下部署和监控 OpenIM 时，您将专注于三个主要指标：中间件、OpenIM 自定义指标，以及 Node Exporter。以下是详细的步骤和指南：</p>
<h3 id="中间件监控" tabindex="-1"><a class="header-anchor" href="#中间件监控" aria-hidden="true">#</a> 中间件监控</h3>
<p>中间件监控是确保整个系统稳定运行的关键。通常，这包括对以下组件的监控：</p>
<ul>
<li><strong>MySQL</strong>：监控数据库性能、查询延时等。</li>
<li><strong>Redis</strong>：追踪操作延时、内存使用等。</li>
<li><strong>MongoDB</strong>：观察数据库操作、资源使用等。</li>
<li><strong>Kafka</strong>：监控消息吞吐量、延时等。</li>
<li><strong>Zookeeper</strong>：关注集群状态、性能指标等。</li>
</ul>
<p>对于 Kubernetes 环境，您可以使用相应的 Prometheus Exporters 来收集这些中间件的监控数据。</p>
<h3 id="openim-自定义指标" tabindex="-1"><a class="header-anchor" href="#openim-自定义指标" aria-hidden="true">#</a> OpenIM 自定义指标</h3>
<p>OpenIM 自定义指标为您提供了关于 OpenIM 应用本身的重要信息，例如用户活跃度、消息流量、系统性能等。要在 Kubernetes 中监控这些指标：</p>
<ul>
<li>确保 OpenIM 应用配置以暴露 Prometheus 指标。</li>
<li>使用 Helm chart（参考 <a href="https://github.com/openimsdk/helm-charts" target="_blank" rel="noopener noreferrer">OpenIM Helm Charts<ExternalLinkIcon/></a>）进行部署时，注意配置相关的监控设置。</li>
</ul>
<h3 id="node-exporter" tabindex="-1"><a class="header-anchor" href="#node-exporter" aria-hidden="true">#</a> Node Exporter</h3>
<p>Node Exporter 用于收集 Kubernetes 节点的硬件和操作系统级别的指标，如 CPU、内存、磁盘使用情况等。在 Kubernetes 中集成 Node Exporter：</p>
<ul>
<li>通过相应的 Helm chart 部署 Node Exporter。您可以在 <a href="https://prometheus.io/docs/guides/node-exporter/" target="_blank" rel="noopener noreferrer">Prometheus 社区<ExternalLinkIcon/></a> 找到相关信息和指南。</li>
<li>确保 Node Exporter 的数据能被集群中的 Prometheus 实例采集。</li>
</ul>
<h1 id="deployment-and-design-of-openim-s-management-backend-and-monitoring" tabindex="-1"><a class="header-anchor" href="#deployment-and-design-of-openim-s-management-backend-and-monitoring" aria-hidden="true">#</a> Deployment and Design of OpenIM's Management Backend and Monitoring</h1>
<p>OpenIM offers various flexible deployment options to suit different environments and requirements. Here is a simplified and optimized description of these deployment options:</p>
<ol>
<li>Source Code Deployment:
<ul>
<li><strong>Regular Source Code Deployment</strong>: Deployment using the <code v-pre>nohup</code> method. This is a basic deployment method suitable for development and testing environments. For details, refer to the <a href="https://docs.openim.io/guides/gettingStarted/imSourceCodeDeployment" target="_blank" rel="noopener noreferrer">Regular Source Code Deployment Guide<ExternalLinkIcon/></a>.</li>
<li><strong>Production-Level Deployment</strong>: Deployment using the <code v-pre>system</code> method, more suitable for production environments. This method provides higher stability and reliability. For details, refer to the <a href="https://docs.openim.io/guides/gettingStarted/install-openim-linux-system" target="_blank" rel="noopener noreferrer">Production-Level Deployment Guide<ExternalLinkIcon/></a>.</li>
</ul>
</li>
<li>Cluster Deployment:
<ul>
<li><strong>Kubernetes Deployment</strong>: Provides two deployment methods, including deployment through Helm and sealos. This is suitable for environments that require high availability and scalability. Specific methods can be found in the <a href="https://docs.openim.io/guides/gettingStarted/k8s-deployment" target="_blank" rel="noopener noreferrer">Kubernetes Deployment Guide<ExternalLinkIcon/></a>.</li>
</ul>
</li>
<li>Docker Deployment:
<ul>
<li><strong>Regular Docker Deployment</strong>: Suitable for quick deployments and small projects. For detailed information, refer to the <a href="https://docs.openim.io/guides/gettingStarted/dockerCompose" target="_blank" rel="noopener noreferrer">Docker Deployment Guide<ExternalLinkIcon/></a>.</li>
<li><strong>Docker Compose Deployment</strong>: Provides more convenient service management and configuration, suitable for complex multi-container applications.</li>
</ul>
</li>
</ol>
<p>Next, we will introduce the specific steps, monitoring, and management backend configuration for each of these deployment methods, as well as usage tips to help you choose the most suitable deployment option according to your needs.</p>
<h2 id="source-code-docker" tabindex="-1"><a class="header-anchor" href="#source-code-docker" aria-hidden="true">#</a> Source Code &amp; Docker</h2>
<h3 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> Deployment</h3>
<p>OpenIM deploys openim-server and openim-chat from source code, while other components are deployed via Docker.</p>
<p>For Docker deployment, you can deploy all components with a single command using the <a href="https://github.com/openimsdk/openim-docker" target="_blank" rel="noopener noreferrer">openimsdk/openim-docker<ExternalLinkIcon/></a> repository. The deployment configuration can be found in the <a href="https://github.com/openimsdk/open-im-server/blob/main/scripts/install/environment.sh" target="_blank" rel="noopener noreferrer">environment.sh<ExternalLinkIcon/></a> document, which provides information on how to learn and familiarize yourself with various environment variables.</p>
<p>For Prometheus, it is not enabled by default. To enable it, set the environment variable before executing <code v-pre>make init</code>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">PROMETHEUS_ENABLE</span><span class="token operator">=</span>true   <span class="token comment"># Default is false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Then, execute:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> init
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration" aria-hidden="true">#</a> Configuration</h3>
<p>To configure Prometheus data sources in Grafana, follow these steps:</p>
<ol>
<li>
<p><strong>Log in to Grafana</strong>: First, open your web browser and access the Grafana URL. If you haven't changed the port, the address is typically <a href="http://localhost:3000/" target="_blank" rel="noopener noreferrer">http://localhost:3000<ExternalLinkIcon/></a>.</p>
</li>
<li>
<p><strong>Log in with default credentials</strong>: Grafana's default username and password are both <code v-pre>admin</code>. You will be prompted to change the password on your first login.</p>
</li>
<li>
<p><strong>Access Data Sources Settings</strong>:</p>
<ul>
<li>In the left menu of Grafana, look for and click the &quot;gear&quot; icon representing &quot;Configuration.&quot;</li>
<li>In the configuration menu, select &quot;Data Sources.&quot;</li>
</ul>
</li>
<li>
<p><strong>Add a New Data Source</strong>:</p>
<ul>
<li>On the Data Sources page, click the &quot;Add data source&quot; button.</li>
<li>In the list, find and select &quot;Prometheus.&quot;</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202311141751692.png" alt="image-20231114175117374"></p>
<p>Click <code v-pre>Add New connection</code> to add more data sources, such as Loki (responsible for log storage and query processing).</p>
</li>
<li>
<p><strong>Configure the Prometheus Data Source</strong>:</p>
<ul>
<li>On the configuration page, fill in the details of the Prometheus server. This typically includes the URL of the Prometheus service (e.g., if Prometheus is running on the same machine as OpenIM, the URL might be <code v-pre>http://172.28.0.1:19090</code>, with the address matching the <code v-pre>DOCKER_BRIDGE_GATEWAY</code> variable address). OpenIM and the components are linked via a gateway. The default port used by OpenIM is <code v-pre>19090</code>.</li>
<li>Adjust other settings as needed, such as authentication and TLS settings.</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202311141803076.png" alt="image-20231114180351923"></p>
</li>
<li>
<p><strong>Save and Test</strong>:</p>
<ul>
<li>After completing the configuration, click the &quot;Save &amp; Test&quot; button to ensure that Grafana can successfully connect to Prometheus.</li>
</ul>
</li>
</ol>
<p><strong>Importing Dashboards in Grafana</strong></p>
<p>Importing Grafana Dashboards is a straightforward process and is applicable to OpenIM Server application services and Node Exporter. Here are detailed steps and necessary considerations:</p>
<p><strong>Key Metrics Overview and Deployment Steps</strong></p>
<p>To monitor OpenIM in Grafana, you need to focus on three categories of key metrics, each with its specific deployment and configuration steps:</p>
<ol>
<li><strong>OpenIM Metrics (<code v-pre>prometheus-dashboard.yaml</code>)</strong>:
<ul>
<li><strong>Configuration File Path</strong>: Located at <code v-pre>config/prometheus-dashboard.yaml</code>.</li>
<li><strong>Enabling Monitoring</strong>: Set the environment variable <code v-pre>export PROMETHEUS_ENABLE=true</code> to enable Prometheus monitoring.</li>
<li><strong>More Information</strong>: Refer to the <a href="https://docs.openim.io/configurations/prometheus-integration" target="_blank" rel="noopener noreferrer">OpenIM Configuration Guide<ExternalLinkIcon/></a>.</li>
</ul>
</li>
<li><strong>Node Exporter</strong>:
<ul>
<li><strong>Container Deployment</strong>: Deploy the <code v-pre>quay.io/prometheus/node-exporter</code> container for node monitoring.</li>
<li><strong>Get Dashboard</strong>: Access the <a href="https://grafana.com/grafana/dashboards/1860-node-exporter-full/" target="_blank" rel="noopener noreferrer">Node Exporter Full Feature Dashboard<ExternalLinkIcon/></a> and import it using YAML file download or ID import.</li>
<li><strong>Deployment Guide</strong>: Refer to the <a href="https://prometheus.io/docs/guides/node-exporter/" target="_blank" rel="noopener noreferrer">Node Exporter Deployment Documentation<ExternalLinkIcon/></a>.</li>
</ul>
</li>
<li><strong>Middleware Metrics</strong>: Each middleware requires specific steps and configurations to enable monitoring. Here is a list of common middleware and links to their respective setup guides:
<ul>
<li>MySQL:
<ul>
<li><strong>Configuration</strong>: Ensure MySQL has performance monitoring enabled.</li>
<li><strong>Link</strong>: Refer to the <a href="https://grafana.com/docs/grafana/latest/datasources/mysql/" target="_blank" rel="noopener noreferrer">MySQL Monitoring Configuration Guide<ExternalLinkIcon/></a>.</li>
</ul>
</li>
<li>Redis:
<ul>
<li><strong>Configuration</strong>: Configure Redis to allow monitoring data export.</li>
<li><strong>Link</strong>: Refer to the <a href="https://grafana.com/docs/grafana/latest/datasources/redis/" target="_blank" rel="noopener noreferrer">Redis Monitoring Guide<ExternalLinkIcon/></a>.</li>
</ul>
</li>
<li>MongoDB:
<ul>
<li><strong>Configuration</strong>: Set up monitoring metrics for MongoDB.</li>
<li><strong>Link</strong>: Refer to the <a href="https://grafana.com/grafana/plugins/grafana-mongodb-datasource/" target="_blank" rel="noopener noreferrer">MongoDB Monitoring Guide<ExternalLinkIcon/></a>.</li>
</ul>
</li>
<li>Kafka:
<ul>
<li><strong>Configuration</strong>: Integrate Kafka with Prometheus monitoring.</li>
<li><strong>Link</strong>: Refer to the <a href="https://grafana.com/grafana/plugins/grafana-kafka-datasource/" target="_blank" rel="noopener noreferrer">Kafka Monitoring Guide<ExternalLinkIcon/></a>.</li>
</ul>
</li>
<li>Zookeeper:
<ul>
<li><strong>Configuration</strong>: Ensure Zookeeper can be monitored by Prometheus.</li>
<li><strong>Link</strong>: Refer to the <a href="https://grafana.com/docs/grafana/latest/datasources/zookeeper/" target="_blank" rel="noopener noreferrer">Zookeeper Monitoring Configuration<ExternalLinkIcon/></a>.</li>
</ul>
</li>
</ul>
</li>
</ol>
<p><strong>Importing Steps</strong>:</p>
<ol>
<li>
<p>Access the Dashboard Import Interface:</p>
<ul>
<li>Click the <code v-pre>+</code> icon on the left menu or in the top right corner of Grafana, then select &quot;Create.&quot;</li>
<li>Choose &quot;Import&quot; to access the dashboard import interface.</li>
</ul>
</li>
<li>
<p><strong>Perform Dashboard Import</strong>:</p>
<ul>
<li><strong>Upload via File</strong>: Directly upload your YAML file.</li>
<li><strong>Paste Content</strong>: Open the YAML file, copy its content, and paste it into the import interface.</li>
<li><strong>Import via Grafana.com Dashboard</strong>: Visit <a href="https://grafana.com/grafana/dashboards/" target="_blank" rel="noopener noreferrer">Grafana Dashboards<ExternalLinkIcon/></a>, search for the desired dashboard, and import it using its ID.</li>
</ul>
</li>
<li>
<p><strong>Configure the Dashboard</strong>:</p>
<ul>
<li>Select the appropriate data source, such as the previously configured Prometheus.</li>
<li>Adjust other settings, such as the dashboard name or folder.</li>
</ul>
</li>
<li>
<p><strong>Save and View the Dashboard</strong>:</p>
<ul>
<li>After configuring, click &quot;Import&quot; to complete the process.</li>
<li>Immediately view the new dashboard after successful import.</li>
</ul>
</li>
</ol>
<p><strong>Graph Examples:</strong></p>
<p><img src="http://sm.nsddd.top/sm202311141944953.png" alt="image-20231114194451673"></p>
<h3 id="monitoring-running-in-docker-guide" tabindex="-1"><a class="header-anchor" href="#monitoring-running-in-docker-guide" aria-hidden="true">#</a> Monitoring Running in Docker Guide</h3>
<h4 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h4>
<p>This guide provides the steps to run OpenIM using Docker. OpenIM is an open-source instant messaging solution that can be quickly deployed using Docker. For more information, please refer to the <a href="https://github.com/openimsdk/openim-docker" target="_blank" rel="noopener noreferrer">OpenIM Docker GitHub<ExternalLinkIcon/></a>.</p>
<h4 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a> Prerequisites</h4>
<ul>
<li>Ensure that Docker and Docker Compose are installed.</li>
<li>Basic understanding of Docker and containerization technology.</li>
</ul>
<h4 id="step-1-clone-the-repository" tabindex="-1"><a class="header-anchor" href="#step-1-clone-the-repository" aria-hidden="true">#</a> Step 1: Clone the Repository</h4>
<p>First, clone the OpenIM Docker repository:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/openimsdk/openim-docker.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Navigate to the repository directory and check the <code v-pre>README</code> file for more information and configuration options.</p>
<h4 id="step-2-start-docker-compose" tabindex="-1"><a class="header-anchor" href="#step-2-start-docker-compose" aria-hidden="true">#</a> Step 2: Start Docker Compose</h4>
<p>In the repository directory, run the following command to start the service:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This will download the required Docker images and start the OpenIM service.</p>
<h4 id="step-3-use-the-openim-web-interface" tabindex="-1"><a class="header-anchor" href="#step-3-use-the-openim-web-interface" aria-hidden="true">#</a> Step 3: Use the OpenIM Web Interface</h4>
<ul>
<li>Open a browser in private mode and access <a href="http://localhost:11001/" target="_blank" rel="noopener noreferrer">OpenIM Web<ExternalLinkIcon/></a>.</li>
<li>Register two users and try adding friends.</li>
<li>Test sending messages and pictures.</li>
</ul>
<h4 id="running-effect" tabindex="-1"><a class="header-anchor" href="#running-effect" aria-hidden="true">#</a> Running Effect</h4>
<p><img src="http://sm.nsddd.top/sm202311151008639.png" alt="image-20231115100811208"></p>
<h4 id="step-4-access-the-admin-panel" tabindex="-1"><a class="header-anchor" href="#step-4-access-the-admin-panel" aria-hidden="true">#</a> Step 4: Access the Admin Panel</h4>
<ul>
<li>Access the <a href="http://localhost:11002/" target="_blank" rel="noopener noreferrer">OpenIM Admin Panel<ExternalLinkIcon/></a>.</li>
<li>Log in using the default username and password (<code v-pre>admin1:admin1</code>).</li>
</ul>
<p>Running Effect Image:</p>
<p><img src="http://sm.nsddd.top/sm202311151010116.png" alt="image-20231115101039837"></p>
<h4 id="step-5-access-the-monitoring-interface" tabindex="-1"><a class="header-anchor" href="#step-5-access-the-monitoring-interface" aria-hidden="true">#</a> Step 5: Access the Monitoring Interface</h4>
<ul>
<li>Log in to the <a href="http://localhost:3000/login" target="_blank" rel="noopener noreferrer">Monitoring Interface<ExternalLinkIcon/></a> using the credentials (<code v-pre>admin:admin</code>).</li>
</ul>
<h4 id="next-steps" tabindex="-1"><a class="header-anchor" href="#next-steps" aria-hidden="true">#</a> Next Steps</h4>
<ul>
<li>Configure and manage the services following the steps provided in the OpenIM source code.</li>
<li>Refer to the <code v-pre>README</code> file for advanced configuration and management.</li>
</ul>
<h4 id="troubleshooting" tabindex="-1"><a class="header-anchor" href="#troubleshooting" aria-hidden="true">#</a> Troubleshooting</h4>
<ul>
<li>If you encounter any issues, please check the documentation on <a href="https://github.com/openimsdk/openim-docker" target="_blank" rel="noopener noreferrer">OpenIM Docker GitHub<ExternalLinkIcon/></a> or search for related issues in the Issues section.</li>
<li>If the problem persists, you can create an issue on the <a href="https://github.com/openimsdk/openim-docker/issues/new/choose" target="_blank" rel="noopener noreferrer">openim-docker<ExternalLinkIcon/></a> repository or the <a href="https://github.com/openimsdk/open-im-server/issues/new/choose" target="_blank" rel="noopener noreferrer">openim-server<ExternalLinkIcon/></a> repository.</li>
</ul>
<h2 id="kubernetes-1" tabindex="-1"><a class="header-anchor" href="#kubernetes-1" aria-hidden="true">#</a> Kubernetes</h2>
<p>Refer to <a href="https://github.com/openimsdk/helm-charts" target="_blank" rel="noopener noreferrer">openimsdk/helm-charts<ExternalLinkIcon/></a>.</p>
<p>When deploying and monitoring OpenIM in a Kubernetes environment, you will focus on three main metrics: middleware, custom OpenIM metrics, and Node Exporter. Here are detailed steps and guidelines:</p>
<h3 id="middleware-monitoring" tabindex="-1"><a class="header-anchor" href="#middleware-monitoring" aria-hidden="true">#</a> Middleware Monitoring</h3>
<p>Middleware monitoring is crucial to ensure the overall system's stability. Typically, this includes monitoring the following components:</p>
<ul>
<li><strong>MySQL</strong>: Monitor database performance, query latency, and more.</li>
<li><strong>Redis</strong>: Track operation latency, memory usage, and more.</li>
<li><strong>MongoDB</strong>: Observe database operations, resource usage, and more.</li>
<li><strong>Kafka</strong>: Monitor message throughput, latency, and more.</li>
<li><strong>Zookeeper</strong>: Keep an eye on cluster status, performance metrics, and more.</li>
</ul>
<p>For Kubernetes environments, you can use the corresponding Prometheus Exporters to collect monitoring data for these middleware components.</p>
<h3 id="custom-openim-metrics" tabindex="-1"><a class="header-anchor" href="#custom-openim-metrics" aria-hidden="true">#</a> Custom OpenIM Metrics</h3>
<p>Custom OpenIM metrics provide essential information about the OpenIM application itself, such as user activity, message traffic, system performance, and more. To monitor these metrics in Kubernetes:</p>
<ul>
<li>Ensure OpenIM application configurations expose Prometheus metrics.</li>
<li>When deploying using Helm charts (refer to <a href="https://github.com/openimsdk/helm-charts" target="_blank" rel="noopener noreferrer">OpenIM Helm Charts<ExternalLinkIcon/></a>), pay attention to configuring relevant monitoring settings.</li>
</ul>
<h3 id="node-exporter-1" tabindex="-1"><a class="header-anchor" href="#node-exporter-1" aria-hidden="true">#</a> Node Exporter</h3>
<p>Node Exporter is used to collect hardware and operating system-level metrics for Kubernetes nodes, such as CPU, memory, disk usage, and more. To integrate Node Exporter in Kubernetes:</p>
<ul>
<li>Deploy Node Exporter using the appropriate Helm chart. You can find information and guides on <a href="https://prometheus.io/docs/guides/node-exporter/" target="_blank" rel="noopener noreferrer">Prometheus Community<ExternalLinkIcon/></a>.</li>
<li>Ensure Node Exporter's data is collected by Prometheus instances within your cluster.</li>
</ul>
<h2 id="setting-up-and-configuring-alertmanager-using-environment-variables-and-make-init" tabindex="-1"><a class="header-anchor" href="#setting-up-and-configuring-alertmanager-using-environment-variables-and-make-init" aria-hidden="true">#</a> Setting Up and Configuring AlertManager Using Environment Variables and <code v-pre>make init</code></h2>
<h3 id="introduction-1" tabindex="-1"><a class="header-anchor" href="#introduction-1" aria-hidden="true">#</a> Introduction</h3>
<p>AlertManager, a component of the Prometheus monitoring system, handles alerts sent by client applications such as the Prometheus server. It takes care of deduplicating, grouping, and routing them to the correct receiver. This document outlines how to set up and configure AlertManager using environment variables and the <code v-pre>make init</code> command. We will focus on configuring key fields like the sender's email, SMTP settings, and SMTP authentication password.</p>
<h3 id="prerequisites-1" tabindex="-1"><a class="header-anchor" href="#prerequisites-1" aria-hidden="true">#</a> Prerequisites</h3>
<ul>
<li>Basic knowledge of terminal and command-line operations.</li>
<li>AlertManager installed on your system.</li>
<li>Access to an SMTP server for sending emails.</li>
</ul>
<h3 id="configuration-steps" tabindex="-1"><a class="header-anchor" href="#configuration-steps" aria-hidden="true">#</a> Configuration Steps</h3>
<h4 id="exporting-environment-variables" tabindex="-1"><a class="header-anchor" href="#exporting-environment-variables" aria-hidden="true">#</a> Exporting Environment Variables</h4>
<p>Before initializing AlertManager, you need to set environment variables. These variables are used to configure the AlertManager settings without altering the code. Use the <code v-pre>export</code> command in your terminal. Here are some key variables you might set:</p>
<ul>
<li><code v-pre>export ALERTMANAGER_RESOLVE_TIMEOUT='5m'</code></li>
<li><code v-pre>export ALERTMANAGER_SMTP_FROM='alert@example.com'</code></li>
<li><code v-pre>export ALERTMANAGER_SMTP_SMARTHOST='smtp.example.com:465'</code></li>
<li><code v-pre>export ALERTMANAGER_SMTP_AUTH_USERNAME='alert@example.com'</code></li>
<li><code v-pre>export ALERTMANAGER_SMTP_AUTH_PASSWORD='your_password'</code></li>
<li><code v-pre>export ALERTMANAGER_SMTP_REQUIRE_TLS='false'</code></li>
</ul>
<h4 id="initializing-alertmanager" tabindex="-1"><a class="header-anchor" href="#initializing-alertmanager" aria-hidden="true">#</a> Initializing AlertManager</h4>
<p>After setting the necessary environment variables, you can initialize AlertManager by running the <code v-pre>make init</code> command. This command typically runs a script that prepares AlertManager with the provided configuration.</p>
<h4 id="key-configuration-fields" tabindex="-1"><a class="header-anchor" href="#key-configuration-fields" aria-hidden="true">#</a> Key Configuration Fields</h4>
<h5 id="a-sender-s-email-alertmanager-smtp-from" tabindex="-1"><a class="header-anchor" href="#a-sender-s-email-alertmanager-smtp-from" aria-hidden="true">#</a> a. Sender's Email (<code v-pre>ALERTMANAGER_SMTP_FROM</code>)</h5>
<p>This variable sets the email address that will appear as the sender in the notifications sent by AlertManager.</p>
<h5 id="b-smtp-configuration" tabindex="-1"><a class="header-anchor" href="#b-smtp-configuration" aria-hidden="true">#</a> b. SMTP Configuration</h5>
<ul>
<li><strong>SMTP Server (<code v-pre>ALERTMANAGER_SMTP_SMARTHOST</code>):</strong> Specifies the address and port of the SMTP server used for sending emails.</li>
<li><strong>SMTP Authentication Username (<code v-pre>ALERTMANAGER_SMTP_AUTH_USERNAME</code>):</strong> The username for authenticating with the SMTP server.</li>
<li><strong>SMTP Authentication Password (<code v-pre>ALERTMANAGER_SMTP_AUTH_PASSWORD</code>):</strong> The password for SMTP server authentication. It's crucial to keep this value secure.</li>
</ul>
<h4 id="configuring-smtp-authentication-password" tabindex="-1"><a class="header-anchor" href="#configuring-smtp-authentication-password" aria-hidden="true">#</a> Configuring SMTP Authentication Password</h4>
<p>The SMTP authentication password can be set using the <code v-pre>ALERTMANAGER_SMTP_AUTH_PASSWORD</code> environment variable. It's recommended to use a secure method to set this variable to avoid exposing sensitive information. For instance, you might read the password from a secure file or a secret management tool.</p>
<h4 id="useful-links-for-common-email-servers" tabindex="-1"><a class="header-anchor" href="#useful-links-for-common-email-servers" aria-hidden="true">#</a> Useful Links for Common Email Servers</h4>
<p>For specific configurations related to common email servers, you may refer to their respective documentation:</p>
<ul>
<li>Gmail SMTP Settings:
<ul>
<li><a href="https://support.google.com/mail/answer/7126229?hl=en" target="_blank" rel="noopener noreferrer">Gmail SMTP Configuration<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>Microsoft Outlook SMTP Settings:
<ul>
<li><a href="https://support.microsoft.com/en-us/office/pop-imap-and-smtp-settings-8361e398-8af4-4e97-b147-6c6c4ac95353" target="_blank" rel="noopener noreferrer">Outlook Email Settings<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>Yahoo Mail SMTP Settings:
<ul>
<li><a href="https://help.yahoo.com/kb/SLN4724.html" target="_blank" rel="noopener noreferrer">Yahoo SMTP Configuration<ExternalLinkIcon/></a></li>
</ul>
</li>
</ul>
<h3 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h3>
<p>Setting up and configuring AlertManager with environment variables provides a flexible and secure way to manage alert settings. By following the above steps, you can easily configure AlertManager for your monitoring needs. Always ensure to secure sensitive information, especially when dealing with SMTP authentication credentials.</p>
</div></template>


