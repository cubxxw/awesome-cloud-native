<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第80节-openim-helm-charts-设计" tabindex="-1"><a class="header-anchor" href="#第80节-openim-helm-charts-设计" aria-hidden="true">#</a> 第80节 OpenIM Helm Charts 设计</h1>
<div><a href = '79.md' style='float:left'>⬆️上一节🔗  </a><a href = '81.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h1 id="openim-helm-charts" tabindex="-1"><a class="header-anchor" href="#openim-helm-charts" aria-hidden="true">#</a> OpenIM Helm Charts</h1>
<p>OpenIM Helm Charts 用于在 Kubernetes 集群上轻松部署和管理 OpenIM 即时消息通信平台及其相关中间件。</p>
<h2 id="前提条件" tabindex="-1"><a class="header-anchor" href="#前提条件" aria-hidden="true">#</a> 前提条件</h2>
<ul>
<li>已安装并配置好的 Kubernetes（K8s）环境。</li>
<li>至少有两个可用的域名：一个用于 MinIO API 访问，另一个用于 OpenIM Server API 访问。</li>
<li>已配置的 StorageClass（此示例使用 NFS-Client）。</li>
<li>（可选）如果您的 K8s 系统的 Ingress Controller 节点配置了 LoadBalancer，所有 <code v-pre>-config.yaml</code> 文件中的域名信息无需配置 TLS 项。</li>
</ul>
<blockquote>
<p><strong>注意</strong>：下个版本将推出基于单一域名访问和基于 IP 的 URL 访问功能。</p>
</blockquote>
<h2 id="用户指南" tabindex="-1"><a class="header-anchor" href="#用户指南" aria-hidden="true">#</a> 用户指南</h2>
<p>要使用这些 Helm Charts，您需要先安装 <a href="https://helm.sh/" target="_blank" rel="noopener noreferrer">Helm<ExternalLinkIcon/></a>。请参考 Helm 的 <a href="https://helm.sh/docs/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a> 来开始使用 Helm。</p>
<p>一旦 Helm 安装完毕，请按如下方式添加 Helm 仓库：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm repo add openim https://openim.github.io/helm-charts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，您可以运行 <code v-pre>helm search repo openim</code> 来查看可用的 Charts。</p>
<h3 id="安装-chart" tabindex="-1"><a class="header-anchor" href="#安装-chart" aria-hidden="true">#</a> 安装 Chart</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm install [RELEASE_NAME] openim/openim-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>查看下面的<a href="https://github.com/openim/helm-charts/tree/main/charts/" target="_blank" rel="noopener noreferrer">配置<ExternalLinkIcon/></a>信息。</em></p>
<p><em>有关命令文档，请参考 <a href="https://helm.sh/docs/helm/helm_install/" target="_blank" rel="noopener noreferrer">helm install<ExternalLinkIcon/></a>。</em></p>
<h3 id="卸载-chart" tabindex="-1"><a class="header-anchor" href="#卸载-chart" aria-hidden="true">#</a> 卸载 Chart</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm uninstall [RELEASE_NAME]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将删除与 Chart 相关的所有 Kubernetes 组件并卸载发布。</p>
<p><em>有关命令文档，请参考 <a href="https://helm.sh/docs/helm/helm_uninstall/" target="_blank" rel="noopener noreferrer">helm uninstall<ExternalLinkIcon/></a>。</em></p>
<h3 id="升级-chart" tabindex="-1"><a class="header-anchor" href="#升级-chart" aria-hidden="true">#</a> 升级 Chart</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm upgrade [RELEASE_NAME] [CHART] --install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>有关命令文档，请参考 <a href="https://helm.sh/docs/helm/helm_upgrade/" target="_blank" rel="noopener noreferrer">helm upgrade<ExternalLinkIcon/></a>。</em></p>
<h3 id="列出发布" tabindex="-1"><a class="header-anchor" href="#列出发布" aria-hidden="true">#</a> 列出发布</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<h3 id="adminfront" tabindex="-1"><a class="header-anchor" href="#adminfront" aria-hidden="true">#</a> adminfront</h3>
<p>这个目录包含了 &quot;adminfront&quot; 服务的 Helm Chart。</p>
<ul>
<li><code v-pre>Chart.yaml</code>: 包含了 Chart 的基本信息和版本。</li>
<li><code v-pre>templates/</code>: 包含了 Kubernetes 模板文件。</li>
<li><code v-pre>values.yaml</code>: 默认配置文件。</li>
</ul>
<h3 id="adminfront-config-yaml" tabindex="-1"><a class="header-anchor" href="#adminfront-config-yaml" aria-hidden="true">#</a> adminfront-config.yaml</h3>
<p>包含了 &quot;adminfront&quot; 服务的自定义配置信息。</p>
<h3 id="chat-server" tabindex="-1"><a class="header-anchor" href="#chat-server" aria-hidden="true">#</a> chat-server</h3>
<p>这个目录包含了 &quot;chat-server&quot; 服务的 Helm Chart。</p>
<ul>
<li><code v-pre>Chart.yaml</code>: 包含了 Chart 的基本信息和版本。</li>
<li><code v-pre>charts/</code>: (可选) 如果 Chart 依赖其他 Chart，可以将它们放在这个目录下。</li>
<li><code v-pre>templates/</code>: 包含了 Kubernetes 模板文件。</li>
<li><code v-pre>values.yaml</code>: 默认配置文件。</li>
</ul>
<h3 id="infra" tabindex="-1"><a class="header-anchor" href="#infra" aria-hidden="true">#</a> infra</h3>
<p>这个目录包含了 OpenIM 所依赖的所有中间件的 Helm Charts 或相关配置。</p>
<ul>
<li><code v-pre>ingress-nginx</code>, <code v-pre>kafka</code>, <code v-pre>minio</code>, <code v-pre>mongodb</code>, <code v-pre>mysql</code>, <code v-pre>nfs-subdir-external-provisioner</code>, <code v-pre>redis</code>: 这些目录可能包含了对应中间件的 Helm Charts。</li>
<li><code v-pre>kafka-config.yaml</code>, <code v-pre>minio-config.yaml</code>, <code v-pre>mongodb-config.yaml</code>, <code v-pre>mysql-config.yaml</code>, <code v-pre>redis-config.yaml</code>: 这些文件包含了对应中间件的自定义配置。</li>
</ul>
<h2 id="前提条件-1" tabindex="-1"><a class="header-anchor" href="#前提条件-1" aria-hidden="true">#</a> 前提条件</h2>
<ul>
<li>已安装并配置好的 Kubernetes（K8s）环境。</li>
<li>至少有两个可用的域名：一个用于 MinIO API 访问，另一个用于 OpenIM Server API 访问。</li>
<li>已配置的 StorageClass（此示例使用 NFS-Client）。</li>
<li>（可选）如果您的 K8s 系统的 Ingress Controller 节点配置了 LoadBalancer，所有 <code v-pre>-config.yaml</code> 文件中的域名信息无需配置 TLS 项。</li>
</ul>
<blockquote>
<p>注意：下个版本将推出基于单一域名访问和基于 IP 的 URL 访问功能。</p>
</blockquote>
<h2 id="安装中间件" tabindex="-1"><a class="header-anchor" href="#安装中间件" aria-hidden="true">#</a> 安装中间件</h2>
<p>在部署 OpenIM 服务之前，我们需要部署一些依赖的中间件服务。</p>
<p>为了方便部署和管理，我们为这些中间件提供了一套 Helm Charts，它们位于 infra 目录下。</p>
<p>以下命令将分别安装 MySQL、Kafka、MinIO、MongoDB 和 Redis 中间件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> openim-infra https://xxxxx.xxx
helm <span class="token function">install</span> im-mysql im-infra/mysql <span class="token parameter variable">-f</span> mysql-config.yaml
helm <span class="token function">install</span> im-kafka im-infra/kafka <span class="token parameter variable">-f</span> kafka-config.yaml
helm <span class="token function">install</span> im-minio im-infra/minio <span class="token parameter variable">-f</span> minio-config.yaml
helm <span class="token function">install</span> im-mongodb im-infra/mongodb <span class="token parameter variable">-f</span> mongodb-config.yaml
helm <span class="token function">install</span> im-redis im-infra/redis <span class="token parameter variable">-f</span> redis-config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>注意</strong></p>
<p>如果 OpenIM 集群部署在 <code v-pre>openim</code> 命名空间中，则需要使用 <code v-pre>-n</code> 参数指定命名空间。如果命名空间不存在，可以使用 <code v-pre>--create-namespace</code> 创建一个新的命名空间。</p>
</blockquote>
<p>这些配置文件包括账户信息，例如 <code v-pre>minio-config.yaml</code> 还包括域名信息。</p>
<h2 id="安装-openim-server-服务" tabindex="-1"><a class="header-anchor" href="#安装-openim-server-服务" aria-hidden="true">#</a> 安装 OpenIM Server 服务</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> openim-server <span class="token parameter variable">-f</span> open-im-server-config.yaml <span class="token parameter variable">-f</span> notification.yaml ./openim/open-im-server/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请确保在 <code v-pre>open-im-server-config.yaml</code> 中配置域名信息。账户信息默认与中间件（infra/）的 <code v-pre>-config.yaml</code> 文件同步。如果在安装中间件时修改了 <code v-pre>config.yaml</code>，请同步修改 <code v-pre>open-im-server-config.yaml</code>。</p>
<h2 id="安装-openim-chat-服务" tabindex="-1"><a class="header-anchor" href="#安装-openim-chat-服务" aria-hidden="true">#</a> 安装 OpenIM Chat 服务</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bashCopy code
helm install openim-chat -f chat-server-config.yaml ./openim/openim-chat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>请确保在 <code v-pre>chat-server-config.yaml</code> 中配置域名信息。账户信息默认与中间件的 <code v-pre>-config.yaml</code> 文件同步。如果在安装中间件时修改了 <code v-pre>config.yaml</code>，请同步修改 <code v-pre>chat-server-config.yaml</code>。</p>
<h2 id="安装-webfront" tabindex="-1"><a class="header-anchor" href="#安装-webfront" aria-hidden="true">#</a> 安装 Webfront</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> imwebfront <span class="token parameter variable">-f</span> webfront-config.yaml ./webfront/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请确保在 <code v-pre>webfront-config.yaml</code> 中配置了域名信息。</p>
<h2 id="安装-adminfront" tabindex="-1"><a class="header-anchor" href="#安装-adminfront" aria-hidden="true">#</a> 安装 Adminfront</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm install imadminfront -f adminfront-config.yaml ./adminfront/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请确保在 <code v-pre>adminfront-config.yaml</code> 中配置了域名信息。</p>
<h2 id="卸载方法" tabindex="-1"><a class="header-anchor" href="#卸载方法" aria-hidden="true">#</a> 卸载方法</h2>
<p>如果您需要卸载 OpenIM 及其相关组件，可以使用以下 Helm 命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm uninstall [RELEASE_NAME]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中 <code v-pre>[RELEASE_NAME]</code> 是您在安装时指定的名称，例如 <code v-pre>openimserver</code>。</p>
<h2 id="调试-helm-charts" tabindex="-1"><a class="header-anchor" href="#调试-helm-charts" aria-hidden="true">#</a> 调试 Helm Charts</h2>
<p>如果您需要调试 Helm Charts，可以使用以下命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm install [RELEASE_NAME] [CHART] --dry-run --debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者使用 <code v-pre>helm template</code> 命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm template [CHART] --name [RELEASE_NAME] --debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="更多信息" tabindex="-1"><a class="header-anchor" href="#更多信息" aria-hidden="true">#</a> 更多信息</h2>
<p>要了解有关 OpenIM 和各个组件的配置和使用的详细信息，请访问<a href="https://docs.openim.io/" target="_blank" rel="noopener noreferrer">OpenIM官方文档<ExternalLinkIcon/></a>。</p>
<h1 id="response-and-translation-into-english" tabindex="-1"><a class="header-anchor" href="#response-and-translation-into-english" aria-hidden="true">#</a> Response and Translation into English:</h1>
<h2 id="openim-helm-charts-1" tabindex="-1"><a class="header-anchor" href="#openim-helm-charts-1" aria-hidden="true">#</a> OpenIM Helm Charts</h2>
<p>OpenIM Helm Charts are utilized for easy deployment and management of the OpenIM instant messaging platform and its related middleware on Kubernetes clusters.</p>
<h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a> Prerequisites</h2>
<ul>
<li>Installed and configured Kubernetes (K8s) environment.</li>
<li>At least two available domain names: one for MinIO API access, and another for OpenIM Server API access.</li>
<li>Configured StorageClass (this example uses NFS-Client).</li>
<li>(Optional) If your K8s system’s Ingress Controller nodes are configured with LoadBalancer, all domain information in <code v-pre>-config.yaml</code> files do not need to configure TLS items.</li>
</ul>
<blockquote>
<p><strong>Note</strong>: The next version will introduce single domain access and IP-based URL access features.</p>
</blockquote>
<h2 id="user-guide" tabindex="-1"><a class="header-anchor" href="#user-guide" aria-hidden="true">#</a> User Guide</h2>
<p>To use these Helm Charts, you first need to install <a href="https://helm.sh/" target="_blank" rel="noopener noreferrer">Helm<ExternalLinkIcon/></a>. Please refer to Helm's <a href="https://helm.sh/docs/" target="_blank" rel="noopener noreferrer">documentation<ExternalLinkIcon/></a> to get started with Helm.</p>
<p>Once Helm is installed, add the Helm repository as follows:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm repo add openim https://openim.github.io/helm-charts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Next, you can run <code v-pre>helm search repo openim</code> to view the available Charts.</p>
<h3 id="install-chart" tabindex="-1"><a class="header-anchor" href="#install-chart" aria-hidden="true">#</a> Install Chart</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm install [RELEASE_NAME] openim/openim-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>See the <a href="https://github.com/openim/helm-charts/tree/main/charts/" target="_blank" rel="noopener noreferrer">configuration<ExternalLinkIcon/></a> information below.</em></p>
<p><em>For command documentation, refer to <a href="https://helm.sh/docs/helm/helm_install/" target="_blank" rel="noopener noreferrer">helm install<ExternalLinkIcon/></a>.</em></p>
<h3 id="uninstall-chart" tabindex="-1"><a class="header-anchor" href="#uninstall-chart" aria-hidden="true">#</a> Uninstall Chart</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm uninstall [RELEASE_NAME]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This will delete all Kubernetes components related to the Chart and uninstall the release.</p>
<p><em>For command documentation, refer to <a href="https://helm.sh/docs/helm/helm_uninstall/" target="_blank" rel="noopener noreferrer">helm uninstall<ExternalLinkIcon/></a>.</em></p>
<h3 id="upgrade-chart" tabindex="-1"><a class="header-anchor" href="#upgrade-chart" aria-hidden="true">#</a> Upgrade Chart</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm upgrade [RELEASE_NAME] [CHART] --install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>For command documentation, refer to <a href="https://helm.sh/docs/helm/helm_upgrade/" target="_blank" rel="noopener noreferrer">helm upgrade<ExternalLinkIcon/></a>.</em></p>
<h3 id="list-releases" tabindex="-1"><a class="header-anchor" href="#list-releases" aria-hidden="true">#</a> List Releases</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="directory-structure" tabindex="-1"><a class="header-anchor" href="#directory-structure" aria-hidden="true">#</a> Directory Structure</h2>
<h3 id="adminfront-1" tabindex="-1"><a class="header-anchor" href="#adminfront-1" aria-hidden="true">#</a> adminfront</h3>
<p>This directory contains the Helm Chart for the &quot;adminfront&quot; service.</p>
<ul>
<li><code v-pre>Chart.yaml</code>: Contains basic information and version of the Chart.</li>
<li><code v-pre>templates/</code>: Contains Kubernetes template files.</li>
<li><code v-pre>values.yaml</code>: Default configuration file.</li>
</ul>
<h3 id="adminfront-config-yaml-1" tabindex="-1"><a class="header-anchor" href="#adminfront-config-yaml-1" aria-hidden="true">#</a> adminfront-config.yaml</h3>
<p>Contains custom configuration information for the &quot;adminfront&quot; service.</p>
<h3 id="chat-server-1" tabindex="-1"><a class="header-anchor" href="#chat-server-1" aria-hidden="true">#</a> chat-server</h3>
<p>This directory contains the Helm Chart for the &quot;chat-server&quot; service.</p>
<ul>
<li><code v-pre>Chart.yaml</code>: Contains basic information and version of the Chart.</li>
<li><code v-pre>charts/</code>: (Optional) If the Chart depends on other Charts, they can be placed in this directory.</li>
<li><code v-pre>templates/</code>: Contains Kubernetes template files.</li>
<li><code v-pre>values.yaml</code>: Default configuration file.</li>
</ul>
<h3 id="infra-1" tabindex="-1"><a class="header-anchor" href="#infra-1" aria-hidden="true">#</a> infra</h3>
<p>This directory contains all Helm Charts or related configurations for the middleware that OpenIM depends on.</p>
<ul>
<li><code v-pre>ingress-nginx</code>, <code v-pre>kafka</code>, <code v-pre>minio</code>, <code v-pre>mongodb</code>, <code v-pre>mysql</code>, <code v-pre>nfs-subdir-external-provisioner</code>, <code v-pre>redis</code>: These directories may contain Helm Charts for the corresponding middleware.</li>
<li><code v-pre>kafka-config.yaml</code>, <code v-pre>minio-config.yaml</code>, <code v-pre>mongodb-config.yaml</code>, <code v-pre>mysql-config.yaml</code>, <code v-pre>redis-config.yaml</code>: These files contain custom configurations for the corresponding middleware.</li>
</ul>
<h2 id="prerequisites-1" tabindex="-1"><a class="header-anchor" href="#prerequisites-1" aria-hidden="true">#</a> Prerequisites</h2>
<ul>
<li>Installed and configured Kubernetes (K8s) environment.</li>
<li>At least two available domain names: one for MinIO API access, and another for OpenIM Server API access.</li>
<li>Configured StorageClass (this example uses NFS-Client).</li>
<li>(Optional) If your K8s system’s Ingress Controller nodes are configured with LoadBalancer, all domain information in <code v-pre>-config.yaml</code> files do not need to configure TLS items.</li>
</ul>
<blockquote>
<p>Note: The next version will introduce single domain access and IP-based URL access features.</p>
</blockquote>
<h2 id="install-middleware" tabindex="-1"><a class="header-anchor" href="#install-middleware" aria-hidden="true">#</a> Install Middleware</h2>
<p>Before deploying the OpenIM services, we need to deploy some dependent middleware services.</p>
<p>For easy deployment and management, we provide a set of Helm Charts for these middleware, located in the infra directory.</p>
<p>The following commands will respectively install MySQL, Kafka, MinIO, MongoDB, and Redis middleware:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> openim-infra https://xxxxx.xxx
helm <span class="token function">install</span> im-mysql im-infra/mysql <span class="token parameter variable">-f</span> mysql-config.yaml
helm <span class="token function">install</span> im-kafka im-infra/kafka <span class="token parameter variable">-f</span> kafka-config.yaml
helm <span class="token function">install</span> im-minio im-infra/minio <span class="token parameter variable">-f</span> minio-config.yaml
helm <span class="token function">install</span> im-mongodb im-infra/mongodb <span class="token parameter variable">-f</span> mongodb-config.yaml
helm <span class="token function">install</span> im-redis im-infra/redis <span class="token parameter variable">-f</span> redis-config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>Note</strong></p>
<p>If the OpenIM cluster is deployed in the <code v-pre>openim</code> namespace, use the <code v-pre>-n</code> argument to specify the namespace. If the namespace does not exist, you can use <code v-pre>--create-namespace</code> to create a new namespace.</p>
</blockquote>
<p>These configuration files include account information, for example, <code v-pre>minio-config.yaml</code> also includes domain information.</p>
<h2 id="install-openim-server-service" tabindex="-1"><a class="header-anchor" href="#install-openim-server-service" aria-hidden="true">#</a> Install OpenIM Server Service</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> openim-server <span class="token parameter variable">-f</span> open-im-server-config.yaml <span class="token parameter variable">-f</span> notification.yaml ./openim/open-im-server/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Ensure that the domain information is configured in <code v-pre>open-im-server-config.yaml</code>. Account information defaults to sync with the middleware (<code v-pre>infra/</code>) <code v-pre>-config.yaml</code> files. If <code v-pre>config.yaml</code> was modified when installing the middleware, please sync modify <code v-pre>open-im-server-config.yaml</code>.</p>
<h2 id="install-openim-chat-service" tabindex="-1"><a class="header-anchor" href="#install-openim-chat-service" aria-hidden="true">#</a> Install OpenIM Chat Service</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> openim-chat <span class="token parameter variable">-f</span> chat-server-config.yaml ./openim/openim-chat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Ensure that the domain information is configured in <code v-pre>chat-server-config.yaml</code>. Account information defaults to sync with the middleware <code v-pre>-config.yaml</code> files. If <code v-pre>config.yaml</code> was modified when installing the middleware, please sync modify <code v-pre>chat-server-config.yaml</code>.</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '79.md' style='float:left'>⬆️上一节🔗  </a><a href = '81.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://cubxxw.com/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


