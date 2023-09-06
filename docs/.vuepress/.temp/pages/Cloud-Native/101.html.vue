<template><div><h1 id="_101-nacos" tabindex="-1"><a class="header-anchor" href="#_101-nacos" aria-hidden="true">#</a> 101: nacos</h1>
<p>[toc]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>一句话介绍 nacos: 一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。</p>
<p><strong>GITHUB 地址：</strong></p>
<ul>
<li>https://github.com/alibaba/nacos</li>
</ul>
<p>Nacos <code v-pre>/nɑ:kəʊs/</code> 是 Dynamic Naming and Configuration Service的首字母简称，一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。</p>
<p>Nacos 致力于帮助您发现、配置和管理微服务。Nacos 提供了一组简单易用的特性集，帮助您快速实现动态服务发现、服务配置、服务元数据及流量管理。</p>
<p>Nacos 帮助您更敏捷和容易地构建、交付和管理微服务平台。 Nacos 是构建以“服务”为中心的现代应用架构 (例如微服务范式、云原生范式) 的服务基础设施。</p>
<p>服务（Service）是 Nacos 世界的一等公民。Nacos 支持几乎所有主流类型的“服务”的发现、配置和管理：</p>
<ul>
<li><a href="https://kubernetes.io/docs/concepts/services-networking/service/" target="_blank" rel="noopener noreferrer">Kubernetes Service<ExternalLinkIcon/></a></li>
<li><a href="https://grpc.io/docs/guides/concepts.html#service-definition" target="_blank" rel="noopener noreferrer">gRPC<ExternalLinkIcon/></a> &amp; <a href="https://dubbo.incubator.apache.org/" target="_blank" rel="noopener noreferrer">Dubbo RPC Service<ExternalLinkIcon/></a></li>
<li><a href="https://spring.io/projects/spring-restdocs" target="_blank" rel="noopener noreferrer">Spring Cloud RESTful Service<ExternalLinkIcon/></a></li>
</ul>
<p>Nacos 的关键特性包括:</p>
<ul>
<li>
<p><strong>服务发现和服务健康监测</strong></p>
<p>Nacos 支持基于 DNS 和基于 RPC 的服务发现。服务提供者使用 <a href="https://nacos.io/zh-cn/docs/sdk.html" target="_blank" rel="noopener noreferrer">原生SDK<ExternalLinkIcon/></a>、<a href="https://nacos.io/zh-cn/docs/open-api.html" target="_blank" rel="noopener noreferrer">OpenAPI<ExternalLinkIcon/></a>、或一个<a href="https://nacos.io/zh-cn/docs/other-language.html" target="_blank" rel="noopener noreferrer">独立的Agent TODO<ExternalLinkIcon/></a>注册 Service 后，服务消费者可以使用<a href="https://nacos.io/zh-cn/docs/xx" target="_blank" rel="noopener noreferrer">DNS TODO<ExternalLinkIcon/></a> 或<a href="https://nacos.io/zh-cn/docs/open-api.html" target="_blank" rel="noopener noreferrer">HTTP&amp;API<ExternalLinkIcon/></a>查找和发现服务。</p>
<p>Nacos 提供对服务的实时的健康检查，阻止向不健康的主机或服务实例发送请求。Nacos 支持传输层 (PING 或 TCP)和应用层 (如 HTTP、MySQL、用户自定义）的健康检查。 对于复杂的云环境和网络拓扑环境中（如 VPC、边缘网络等）服务的健康检查，Nacos 提供了 agent 上报模式和服务端主动检测2种健康检查模式。Nacos 还提供了统一的健康检查仪表盘，帮助您根据健康状态管理服务的可用性及流量。</p>
</li>
<li>
<p><strong>动态配置服务</strong></p>
<p>动态配置服务可以让您以中心化、外部化和动态化的方式管理所有环境的应用配置和服务配置。</p>
<p>动态配置消除了配置变更时重新部署应用和服务的需要，让配置管理变得更加高效和敏捷。</p>
<p>配置中心化管理让实现无状态服务变得更简单，让服务按需弹性扩展变得更容易。</p>
<p>Nacos 提供了一个简洁易用的UI (<a href="http://console.nacos.io/nacos/index.html" target="_blank" rel="noopener noreferrer">控制台样例 Demo<ExternalLinkIcon/></a>) 帮助您管理所有的服务和应用的配置。Nacos 还提供包括配置版本跟踪、金丝雀发布、一键回滚配置以及客户端配置更新状态跟踪在内的一系列开箱即用的配置管理特性，帮助您更安全地在生产环境中管理配置变更和降低配置变更带来的风险。</p>
</li>
<li>
<p><strong>动态 DNS 服务</strong></p>
<p>动态 DNS 服务支持权重路由，让您更容易地实现中间层负载均衡、更灵活的路由策略、流量控制以及数据中心内网的简单DNS解析服务。动态DNS服务还能让您更容易地实现以 DNS 协议为基础的服务发现，以帮助您消除耦合到厂商私有服务发现 API 上的风险。</p>
<p>Nacos 提供了一些简单的 <a href="https://nacos.io/zh-cn/docs/xx" target="_blank" rel="noopener noreferrer">DNS APIs TODO<ExternalLinkIcon/></a> 帮助您管理服务的关联域名和可用的 IP:PORT 列表.</p>
</li>
<li>
<p><strong>服务及其元数据管理</strong></p>
<p>Nacos 能让您从微服务平台建设的视角管理数据中心的所有服务及元数据，包括管理服务的描述、生命周期、服务的静态依赖分析、服务的健康状态、服务的流量管理、路由及安全策略、服务的 SLA 以及最首要的 metrics 统计数据。</p>
</li>
<li>
<p><a href="https://nacos.io/zh-cn/docs/docs/zh-cn/archive/roadmap.html" target="_blank" rel="noopener noreferrer">更多的特性列表 ...<ExternalLinkIcon/></a></p>
</li>
</ul>
<h3 id="功能" tabindex="-1"><a class="header-anchor" href="#功能" aria-hidden="true">#</a> 功能</h3>
<p><strong>动态配置服务：</strong> 动态配置服务让您能够以中心化、外部化和动态化的方式管理所有环境的配置。动态配置消除了配置变更时重新部署应用和服务的需要。配置中心化管理让实现无状态服务更简单，也让按需弹性扩展服务更容易。</p>
<p><strong>服务发现以及管理：</strong> 动态服务发现对以服务为中心的（例如微服务和云原生）应用架构方式非常关键。Nacos支持DNS-Based和RPC-Based（Dubbo、gRPC）模式的服务发现。Nacos也提供实时健康检查，以防止将请求发往不健康的主机或服务实例。借助Nacos，您可以更容易地为您的服务实现断路器。</p>
<p><strong>动态 DNS 服务：</strong> 通过支持权重路由，动态DNS服务能让您轻松实现中间层负载均衡、更灵活的路由策略、流量控制以及简单数据中心内网的简单DNS解析服务。动态DNS服务还能让您更容易地实现以DNS协议为基础的服务发现，以消除耦合到厂商私有服务发现API上的风险。</p>
<h2 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h2>
<p><strong>源码启动：</strong></p>
<p>Nacos 依赖 <a href="https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/" target="_blank" rel="noopener noreferrer">Java<ExternalLinkIcon/></a> 环境来运行。如果您是从代码开始构建并运行Nacos，还需要为此配置 <a href="https://maven.apache.org/index.html" target="_blank" rel="noopener noreferrer">Maven<ExternalLinkIcon/></a>环境，请确保是在以下版本环境中安装使用:</p>
<ol>
<li>64 bit OS，支持 Linux/Unix/Mac/Windows，推荐选用 Linux/Unix/Mac。</li>
<li>64 bit JDK 1.8+；<a href="http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html" target="_blank" rel="noopener noreferrer">下载<ExternalLinkIcon/></a> &amp; <a href="https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/" target="_blank" rel="noopener noreferrer">配置<ExternalLinkIcon/></a>。</li>
<li>Maven 3.2.x+；<a href="https://maven.apache.org/download.cgi" target="_blank" rel="noopener noreferrer">下载<ExternalLinkIcon/></a> &amp; <a href="https://maven.apache.org/settings.html" target="_blank" rel="noopener noreferrer">配置<ExternalLinkIcon/></a>。</li>
</ol>
<blockquote>
<p>在2.2.0.1和2.2.1版本时，必须执行此变更，否则无法启动；其他版本为建议设置。</p>
</blockquote>
<p>修改<code v-pre>conf</code>目录下的<code v-pre>application.properties</code>文件。</p>
<p>设置其中的<code v-pre>nacos.core.auth.plugin.nacos.token.secret.key</code>值，详情可查看<a href="https://nacos.io/zh-cn/docs/v2/plugin/auth-plugin.html" target="_blank" rel="noopener noreferrer">鉴权-自定义密钥<ExternalLinkIcon/></a>.</p>
<blockquote>
<p>注意，文档中的默认值<code v-pre>SecretKey012345678901234567890123456789012345678901234567890123456789</code>和<code v-pre>VGhpc0lzTXlDdXN0b21TZWNyZXRLZXkwMTIzNDU2Nzg=</code>为公开默认值，可用于临时测试，实际使用时请<strong>务必</strong>更换为自定义的其他有效值。</p>
</blockquote>
<p><strong>启动：</strong></p>
<ul>
<li>注：Nacos的运行建议至少在2C4G 60G的机器配置下运行。</li>
</ul>
<h4 id="linux-unix-mac" tabindex="-1"><a class="header-anchor" href="#linux-unix-mac" aria-hidden="true">#</a> Linux/Unix/Mac</h4>
<p>启动命令(standalone代表着单机模式运行，非集群模式):</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sh startup.sh -m standalone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果您使用的是ubuntu系统，或者运行脚本报错提示[[符号找不到，可尝试如下运行：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bash startup.sh -m standalone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="windows" tabindex="-1"><a class="header-anchor" href="#windows" aria-hidden="true">#</a> Windows</h4>
<p>启动命令(standalone代表着单机模式运行，非集群模式):</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>startup.cmd -m standalone
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="服务注册-发现和配置管理" tabindex="-1"><a class="header-anchor" href="#服务注册-发现和配置管理" aria-hidden="true">#</a> 服务注册&amp;发现和配置管理</h3>
<h4 id="服务注册" tabindex="-1"><a class="header-anchor" href="#服务注册" aria-hidden="true">#</a> 服务注册</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -X POST 'http://127.0.0.1:8848/nacos/v1/ns/instance?serviceName=nacos.naming.serviceName&amp;ip=20.18.7.10&amp;port=8080'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="服务发现" tabindex="-1"><a class="header-anchor" href="#服务发现" aria-hidden="true">#</a> 服务发现</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -X GET 'http://127.0.0.1:8848/nacos/v1/ns/instance/list?serviceName=nacos.naming.serviceName'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="发布配置" tabindex="-1"><a class="header-anchor" href="#发布配置" aria-hidden="true">#</a> 发布配置</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -X POST "http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&amp;group=test&amp;content=HelloWorld"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="获取配置" tabindex="-1"><a class="header-anchor" href="#获取配置" aria-hidden="true">#</a> 获取配置</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -X GET "http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&amp;group=test"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="关闭服务器" tabindex="-1"><a class="header-anchor" href="#关闭服务器" aria-hidden="true">#</a> 关闭服务器</h3>
<h4 id="linux-unix-mac-1" tabindex="-1"><a class="header-anchor" href="#linux-unix-mac-1" aria-hidden="true">#</a> Linux/Unix/Mac</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sh shutdown.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="windows-1" tabindex="-1"><a class="header-anchor" href="#windows-1" aria-hidden="true">#</a> Windows</h4>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>shutdown.cmd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者双击shutdown.cmd运行文件。</p>
<h2 id="docker-部署" tabindex="-1"><a class="header-anchor" href="#docker-部署" aria-hidden="true">#</a> docker 部署</h2>
<ul>
<li>
<p>Clone 项目</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>git clone https:<span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com/nacos-<span class="token function">group</span><span class="token operator">/</span>nacos-docker<span class="token punctuation">.</span>git
cd nacos-docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>单机模式 Derby</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>docker-compose <span class="token operator">-</span>f example/standalone-derby<span class="token punctuation">.</span>yaml up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>服务注册</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>curl <span class="token operator">-</span>X POST <span class="token string">'http://127.0.0.1:8848/nacos/v1/ns/instance?serviceName=nacos.naming.serviceName&amp;ip=20.18.7.10&amp;port=8080'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>服务发现</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>curl <span class="token operator">-</span>X GET <span class="token string">'http://127.0.0.1:8848/nacos/v1/ns/instance/list?serviceName=nacos.naming.serviceName'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>发布配置</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>curl <span class="token operator">-</span>X POST <span class="token string">"http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&amp;group=test&amp;content=helloWorld"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>获取配置</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>  curl <span class="token operator">-</span>X GET <span class="token string">"http://127.0.0.1:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&amp;group=test"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>Nacos 控制台</p>
<p>link：http://127.0.0.1:8848/nacos/</p>
</li>
</ul>
<h2 id="kubernetes-nacos" tabindex="-1"><a class="header-anchor" href="#kubernetes-nacos" aria-hidden="true">#</a> Kubernetes Nacos</h2>
<ul>
<li>
<p>推荐使用<a href="https://github.com/nacos-group/nacos-k8s/blob/master/operator/README-CN.md" target="_blank" rel="noopener noreferrer">Nacos Operator<ExternalLinkIcon/></a>在Kubernetes部署Nacos Server.</p>
</li>
<li>
<p><strong>Clone 项目</strong></p>
</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/nacos-group/nacos-k8s.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>简单例子</strong></li>
</ul>
<blockquote>
<p>如果你使用简单方式快速启动,请注意这是没有使用持久化卷的,可能存在数据丢失风险:</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> nacos-k8s
<span class="token function">chmod</span> +x quick-startup.sh
./quick-startup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><strong>测试</strong></p>
<ul>
<li><strong>服务注册</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">'http://cluster-ip:8848/nacos/v1/ns/instance?serviceName=nacos.naming.serviceName&amp;ip=20.18.7.10&amp;port=8080'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>服务发现</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token string">'http://cluster-ip:8848/nacos/v1/ns/instance/list?serviceName=nacos.naming.serviceName'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>发布配置</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> POST <span class="token string">"http://cluster-ip:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&amp;group=test&amp;content=helloWorld"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><strong>获取配置</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token string">"http://cluster-ip:8848/nacos/v1/cs/configs?dataId=nacos.cfg.dataId&amp;group=test"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h3 id="高级使用" tabindex="-1"><a class="header-anchor" href="#高级使用" aria-hidden="true">#</a> 高级使用</h3>
<blockquote>
<p>在高级使用中,Nacos在K8S拥有自动扩容缩容和数据持久特性,请注意如果需要使用这部分功能请使用PVC持久卷,Nacos的自动扩容缩容需要依赖持久卷,以及数据持久化也是一样,本例中使用的是NFS来使用PVC.</p>
</blockquote>
<h3 id="部署-nfs" tabindex="-1"><a class="header-anchor" href="#部署-nfs" aria-hidden="true">#</a> 部署 NFS</h3>
<ul>
<li>创建角色</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> deploy/nfs/rbac.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>如果的K8S命名空间不是<strong>default</strong>，请在部署RBAC之前执行以下脚本:</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Set the subject of the RBAC objects to the current namespace where the provisioner is being deployed</span>
$ <span class="token assign-left variable">NS</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>kubectl config get-contexts<span class="token operator">|</span><span class="token function">grep</span> <span class="token parameter variable">-e</span> <span class="token string">"^\*"</span> <span class="token operator">|</span><span class="token function">awk</span> <span class="token string">'{print $5}'</span><span class="token variable">)</span></span>
$ <span class="token assign-left variable">NAMESPACE</span><span class="token operator">=</span><span class="token variable">${NS<span class="token operator">:-</span>default}</span>
$ <span class="token function">sed</span> -i<span class="token string">''</span> <span class="token string">"s/namespace:.*/namespace: <span class="token variable">$NAMESPACE</span>/g"</span> ./deploy/nfs/rbac.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>创建 <code v-pre>ServiceAccount</code> 和部署 <code v-pre>NFS-Client Provisioner</code></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> deploy/nfs/deployment.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>创建 NFS StorageClass</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> deploy/nfs/class.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>验证NFS部署成功</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>nfs-client-provisioner
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="部署数据库" tabindex="-1"><a class="header-anchor" href="#部署数据库" aria-hidden="true">#</a> 部署数据库</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> nacos-k8s

kubectl create <span class="token parameter variable">-f</span> deploy/mysql/mysql-nfs.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>验证数据库是否正常工作</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get pod 
NAME                         READY   STATUS    RESTARTS   AGE
mysql-gf2vd                        <span class="token number">1</span>/1     Running   <span class="token number">0</span>          111m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行数据库初始化语句" tabindex="-1"><a class="header-anchor" href="#执行数据库初始化语句" aria-hidden="true">#</a> 执行数据库初始化语句</h3>
<p>数据库初始化语句位置 https://github.com/alibaba/nacos/blob/develop/distribution/conf/nacos-mysql.sql</p>
<h4 id="部署nacos" tabindex="-1"><a class="header-anchor" href="#部署nacos" aria-hidden="true">#</a> 部署Nacos</h4>
<ul>
<li>修改 <strong>deploy/nacos/nacos-pvc-nfs.yaml</strong></li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">mysql.host</span><span class="token punctuation">:</span> <span class="token string">"数据库地址"</span>
  <span class="token key atrule">mysql.db.name</span><span class="token punctuation">:</span> <span class="token string">"数据库名称"</span>
  <span class="token key atrule">mysql.port</span><span class="token punctuation">:</span> <span class="token string">"端口"</span>
  <span class="token key atrule">mysql.user</span><span class="token punctuation">:</span> <span class="token string">"用户名"</span>
  <span class="token key atrule">mysql.password</span><span class="token punctuation">:</span> <span class="token string">"密码"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>创建 Nacos</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> nacos-k8s/deploy/nacos/nacos-pvc-nfs.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>验证Nacos节点启动成功</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-l</span> <span class="token assign-left variable">app</span><span class="token operator">=</span>nacos


NAME      READY   STATUS    RESTARTS   AGE
nacos-0   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          19h
nacos-1   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          19h
nacos-2   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          19h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩容测试" tabindex="-1"><a class="header-anchor" href="#扩容测试" aria-hidden="true">#</a> 扩容测试</h3>
<ul>
<li>在扩容前，使用 <a href="https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands/#exec" target="_blank" rel="noopener noreferrer"><code v-pre>kubectl exec</code><ExternalLinkIcon/></a>获取在pod中的Nacos集群配置文件信息</li>
</ul>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code><span class="token keyword">for</span> i in 0 1<span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token function">echo</span> nacos-<span class="token variable">$i</span><span class="token punctuation">;</span> kubectl exec nacos-<span class="token variable">$i</span> <span class="token function">cat</span> conf/cluster<span class="token punctuation">.</span>conf<span class="token punctuation">;</span> done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>StatefulSet控制器根据其序数索引为每个Pod提供唯一的主机名。 主机名采用 - 的形式。 因为nacos StatefulSet的副本字段设置为2，所以当前集群文件中只有两个Nacos节点地址</p>
<p><img src="https://cdn.nlark.com/yuque/0/2019/gif/338441/1562846123635-e361d2b5-4bbe-4347-acad-8f11f75e6d38.gif" alt="k8s"></p>
<ul>
<li>使用kubectl scale 对Nacos动态扩容</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl scale sts nacos <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://cdn.nlark.com/yuque/0/2019/gif/338441/1562846139093-7a79b709-9afa-448a-b7d6-f57571d3a902.gif" alt="scale"></p>
<ul>
<li>在扩容后，使用 <a href="https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands/#exec" target="_blank" rel="noopener noreferrer"><code v-pre>kubectl exec</code><ExternalLinkIcon/></a>获取在pod中的Nacos集群配置文件信息</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token number">0</span> <span class="token number">1</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> nacos-<span class="token variable">$i</span><span class="token punctuation">;</span> kubectl <span class="token builtin class-name">exec</span> nacos-<span class="token variable">$i</span> <span class="token function">cat</span> conf/cluster.conf<span class="token punctuation">;</span> <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://cdn.nlark.com/yuque/0/2019/gif/338441/1562846177553-c1c7f379-1b41-4026-9f0b-23e15dde02a8.gif" alt="get_cluster_after"></p>
<ul>
<li>使用 <a href="https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands/#exec" target="_blank" rel="noopener noreferrer"><code v-pre>kubectl exec</code><ExternalLinkIcon/></a>执行Nacos API 在每台节点上获取当前<strong>Leader</strong>是否一致</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token number">0</span> <span class="token number">1</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> nacos-<span class="token variable">$i</span><span class="token punctuation">;</span> kubectl <span class="token builtin class-name">exec</span> nacos-<span class="token variable">$i</span> <span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token string">"http://localhost:8848/nacos/v1/ns/raft/state"</span><span class="token punctuation">;</span> <span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>到这里你可以发现新节点已经正常加入Nacos集群当中</p>
<p><strong>注意：</strong></p>
<ul>
<li>Nacos是一个内部微服务组件，需要在可信的内部网络中运行，不可暴露在公网环境，防止带来安全风险。</li>
<li>Nacos提供简单的鉴权实现，为防止业务错用的弱鉴权体系，不是防止恶意攻击的强鉴权体系。</li>
<li>如果运行在不可信的网络环境或者有强鉴权诉求，请参考官方简单实现做进行<a href="https://nacos.io/zh-cn/docs/v2/plugin/auth-plugin.html" target="_blank" rel="noopener noreferrer">自定义插件开发<ExternalLinkIcon/></a>。</li>
</ul>
<h2 id="插件" tabindex="-1"><a class="header-anchor" href="#插件" aria-hidden="true">#</a> 插件</h2>
<p>Nacos从2.1.0版本开始，支持通过<a href="https://docs.oracle.com/javase/tutorial/sound/SPI-intro.html" target="_blank" rel="noopener noreferrer">SPI<ExternalLinkIcon/></a>的方式注入鉴权相关插件，并在<code v-pre>application.properties</code>配置文件中选择某一种插件实现作为实际鉴权服务。本文档会详细介绍如何实现一个鉴权插件和如何使其生效。</p>
<blockquote>
<p>注意： 目前鉴权插件还处于Beta测试的阶段，其API及接口定义可能会随后续版本升级而有所修改，请注意您的插件适用版本。</p>
</blockquote>
<h3 id="鉴权插件中的概念" tabindex="-1"><a class="header-anchor" href="#鉴权插件中的概念" aria-hidden="true">#</a> 鉴权插件中的概念</h3>
<p>鉴权，通俗的表达就是，验证 <strong>谁</strong> 是否能够对 <strong>某个东西</strong> 进行 <strong>某种操作</strong> ，因此Nacos在设计鉴权插件时，将鉴权信息主要抽象为<code v-pre>身份信息</code>，<code v-pre>资源</code>和<code v-pre>操作类型</code>3类主要概念。</p>
<h3 id="身份信息-identitycontext" tabindex="-1"><a class="header-anchor" href="#身份信息-identitycontext" aria-hidden="true">#</a> 身份信息 IdentityContext</h3>
<p>身份信息(IdentityContext)是请求发起主体在Nacos鉴权插件中的抽象。由于不同的插件实现，身份信息可能不同，较为灵活；比如用户名和密码是一种身份信息，accessToken又是另一种身份信息。因此身份信息(IdentityContext)并没有限制具体的个数和名字，插件实现可以自定义任意个数和身份关键字，Nacos将会从请求中自动获取插件实现定义的身份关键字及其对应的值注入到身份信息(IdentityContext)中，供插件使用。</p>
<p>其中必定会包含的内容有：</p>
<table>
<thead>
<tr>
<th>字段名</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>remote_ip</td>
<td>请求来源ip</td>
</tr>
</tbody>
</table>
<h3 id="资源-resource" tabindex="-1"><a class="header-anchor" href="#资源-resource" aria-hidden="true">#</a> 资源 Resource</h3>
<p>资源(Resource)是请求所操作对象在Nacos鉴权插件中的抽象。它主要由Nacos来定义，具体可以是某个配置，某个服务，或者某个分组。</p>
<p>资源(Resource)主要由以下内容组成：</p>
<table>
<thead>
<tr>
<th>字段名</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>namespaceId</td>
<td>请求资源的命名空间ID，部分接口可能没有该值</td>
</tr>
<tr>
<td>group</td>
<td>请求资源的分组名，部分接口可能没有该值</td>
</tr>
<tr>
<td>name</td>
<td>请求资源的资源名，如服务名或配置的dataId，部分接口可能是定义的特殊值，如<code v-pre>nacos/admin</code></td>
</tr>
<tr>
<td>type</td>
<td>请求资源的类型，可能取值为<code v-pre>SignType</code>中的枚举值，主要表示该资源所相关的模块</td>
</tr>
<tr>
<td>properties</td>
<td>请求资源的扩展配置，不属于上述的资源相关信息，会被放如properties中，比如Grpc请求的Request名称或<code v-pre>@Secured</code>注解上的tags等</td>
</tr>
</tbody>
</table>
<h3 id="操作类型-action" tabindex="-1"><a class="header-anchor" href="#操作类型-action" aria-hidden="true">#</a> 操作类型 Action</h3>
<p>操作类型(Action)是请求操作在Nacos鉴权插件中的抽象，主要有读操作<code v-pre>R</code>和写操作<code v-pre>W</code>，详情查看<code v-pre>ActionTypes</code>枚举。</p>
<h2 id="服务端插件" tabindex="-1"><a class="header-anchor" href="#服务端插件" aria-hidden="true">#</a> 服务端插件</h2>
<p>开发Nacos服务端鉴权插件，首先需要依赖鉴权插件的相关API</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.nacos<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>nacos-auth-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${project.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>${project.version}</code> 为您开发插件所对应的Nacos版本</p>
<p>随后实现<code v-pre>com.alibaba.nacos.plugin.auth.spi.server.AuthPluginService</code>接口， 并将您的实现添加到SPI的services当中。</p>
<p>接口中需要实现的方法如下：</p>
<table>
<thead>
<tr>
<th>方法名</th>
<th>入参内容</th>
<th>返回内容</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>getAuthServiceName</td>
<td>void</td>
<td>String</td>
<td>插件的名称，当名字相同时，后加载的插件会覆盖先加载的插件。</td>
</tr>
<tr>
<td>identityNames</td>
<td>void</td>
<td>Collection</td>
<td>插件的身份信息关键字，Nacos会从请求中获取以这些关键字为key的参数，并注入到IdentityContext中。</td>
</tr>
<tr>
<td>enableAuth</td>
<td>ActionTypes,SignType</td>
<td>boolean</td>
<td>在调用<code v-pre>validateIdentity</code>和<code v-pre>validateAuthority</code>前调用，插件可自行判断是否对此类型的操作或此类型的模块进行鉴权。</td>
</tr>
<tr>
<td>validateIdentity</td>
<td>IdentityContext, Resource</td>
<td>boolean</td>
<td>对身份信息进行验证，在<code v-pre>validateAuthority</code>前调用</td>
</tr>
<tr>
<td>validateAuthority</td>
<td>IdentityContext, Permission</td>
<td>boolean</td>
<td>对权限进行验证，在<code v-pre>validateIdentity</code>返回为<code v-pre>true</code>时调用</td>
</tr>
</tbody>
</table>
<h3 id="加载服务端插件" tabindex="-1"><a class="header-anchor" href="#加载服务端插件" aria-hidden="true">#</a> 加载服务端插件</h3>
<p>插件开发完成后，需要打包成jar/zip，放置到nacos服务端的classpath中，如果您不知道如何修改classpath，请直接放置到<code v-pre>${nacos-server.path}/plugins</code>下</p>
<p>放置后，需要修改<code v-pre>${nacos-server.path}/conf/application.properties</code>中的以下配置</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token comment">### 所启用的Nacos的鉴权插件的名称，与`com.alibaba.nacos.plugin.auth.spi.server.AuthPluginService`的`getAuthServiceName`返回值对应</span>
<span class="token key attr-name">nacos.core.auth.system.type</span><span class="token punctuation">=</span><span class="token value attr-value">${authServiceName}</span>

<span class="token comment">### 开启鉴权功能</span>
<span class="token key attr-name">nacos.core.auth.enabled</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>随后重启nacos集群，在有请求访问到nacos节点后，可以从<code v-pre>${nacos-server.path}/logs/nacos.log</code>中看到如下日志：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[AuthPluginManager] Load AuthPluginService(xxxx) AuthServiceName(xxx) successfully.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="使用nacos自带的鉴权插件" tabindex="-1"><a class="header-anchor" href="#使用nacos自带的鉴权插件" aria-hidden="true">#</a> 使用Nacos自带的鉴权插件</h3>
<p>Nacos默认带有一个鉴权的简易实现，主要是为防止业务错用的弱鉴权体系，不是防止恶意攻击的强鉴权体系。开启和使用方式请查看文档<a href="https://nacos.io/zh-cn/docs/v2/guide/user/auth.html" target="_blank" rel="noopener noreferrer">用户指南-权限认证<ExternalLinkIcon/></a>.</p>
<h2 id="客户端插件" tabindex="-1"><a class="header-anchor" href="#客户端插件" aria-hidden="true">#</a> 客户端插件</h2>
<p>Nacos的客户端鉴权插件主要工作为将鉴权相关的身份信息，注入到请求中，让每个请求都能够被对应的服务端鉴权插件识别。</p>
<p>在Nacos的Java客户端默认自带两个实现：</p>
<ul>
<li>使用<code v-pre>username</code>，<code v-pre>password</code>和<code v-pre>accessToken</code>的简易鉴权实现；</li>
<li>使用<code v-pre>accessKey</code>和<code v-pre>secretKey</code>的阿里云鉴权实现；</li>
</ul>
<h3 id="nacos简易鉴权实现" tabindex="-1"><a class="header-anchor" href="#nacos简易鉴权实现" aria-hidden="true">#</a> Nacos简易鉴权实现</h3>
<p>当构造客户端实例时传入的properties中带有<code v-pre>username</code>，<code v-pre>password</code>时，客户端会使用简易鉴权实现插件注入身份信息； 如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">PropertyKeyConst</span><span class="token punctuation">.</span><span class="token constant">SERVER_ADDR</span><span class="token punctuation">,</span> <span class="token string">"localhost:8848"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">PropertyKeyConst</span><span class="token punctuation">.</span><span class="token constant">USERNAME</span><span class="token punctuation">,</span> <span class="token string">"nacos"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">PropertyKeyConst</span><span class="token punctuation">.</span><span class="token constant">PASSWORD</span><span class="token punctuation">,</span> <span class="token string">"nacos"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">NamingFactory</span><span class="token punctuation">.</span><span class="token function">createNamingService</span><span class="token punctuation">(</span>properties<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ConfigFactory</span><span class="token punctuation">.</span><span class="token function">createConfigService</span><span class="token punctuation">(</span>properties<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该插件会异步地通过<code v-pre>username</code>，<code v-pre>password</code>进行登录，获取登录成功后的<code v-pre>accessToken</code>，并将<code v-pre>accessToken</code>注入到所有客户端请求中，开发者可以根据<code v-pre>accessToken</code>在实现的服务端插件中进行身份验证及后续的权限验证。</p>
<h3 id="阿里云鉴权实现" tabindex="-1"><a class="header-anchor" href="#阿里云鉴权实现" aria-hidden="true">#</a> 阿里云鉴权实现</h3>
<p>当properties中带有<code v-pre>accessKey</code>和<code v-pre>secretKey</code>时，则会使用阿里云鉴权实现注入身份信息，如：</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Properties</span> properties <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Properties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">PropertyKeyConst</span><span class="token punctuation">.</span><span class="token constant">SERVER_ADDR</span><span class="token punctuation">,</span> <span class="token string">"localhost:8848"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">PropertyKeyConst</span><span class="token punctuation">.</span><span class="token constant">ACCESS_KEY</span><span class="token punctuation">,</span> <span class="token string">"nacos"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
properties<span class="token punctuation">.</span><span class="token function">setProperty</span><span class="token punctuation">(</span><span class="token class-name">PropertyKeyConst</span><span class="token punctuation">.</span><span class="token constant">SECRET_KEY</span><span class="token punctuation">,</span> <span class="token string">"nacos"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">NamingFactory</span><span class="token punctuation">.</span><span class="token function">createNamingService</span><span class="token punctuation">(</span>properties<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">ConfigFactory</span><span class="token punctuation">.</span><span class="token function">createConfigService</span><span class="token punctuation">(</span>properties<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该插件会根据<code v-pre>accessKey</code>和<code v-pre>secretKey</code>以及请求的资源内容，自动生成对应的请求签名，并注入到请求中，根据资源类型的不同，请求中的身份信息关键字可能不同：</p>
<table>
<thead>
<tr>
<th>类型</th>
<th>身份关键字</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>NamingService</td>
<td>ak</td>
<td>accessKey</td>
</tr>
<tr>
<td>NamingService</td>
<td>signature</td>
<td>注册中心模块的签名信息</td>
</tr>
<tr>
<td>NamingService</td>
<td>data</td>
<td>签名数据，主要是时间戳</td>
</tr>
<tr>
<td>ConfigService</td>
<td>Spas-AccessKey</td>
<td>accessKey</td>
</tr>
<tr>
<td>ConfigService</td>
<td>Spas-Signature</td>
<td>配置中心模块的签名信息</td>
</tr>
<tr>
<td>ConfigService</td>
<td>Timestamp</td>
<td>请求的时间戳</td>
</tr>
<tr>
<td>ConfigService</td>
<td>Spas-SecurityToken</td>
<td>临时token（启用阿里云STS功能时使用）</td>
</tr>
</tbody>
</table>
<p>开发者可以根据以上信息，在实现的服务端插件中进行身份验证及后续的权限验证。</p>
<h3 id="其他自定义插件" tabindex="-1"><a class="header-anchor" href="#其他自定义插件" aria-hidden="true">#</a> 其他自定义插件</h3>
<p>考虑到开发者的鉴权插件可能有自定义的身份信息关键字，因此Nacos的Java客户端同样可以使用SPI方式注入对应的插件实现。</p>
<p>开发Nacos客户端鉴权插件，首先需要依赖鉴权插件的相关API</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code>        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba.nacos<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>nacos-auth-plugin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>${project.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>${project.version}</code> 为您开发插件所对应的Nacos版本</p>
<p>随后实现<code v-pre>com.alibaba.nacos.plugin.auth.spi.client.ClientAuthService</code>接口， 并将您的实现添加到SPI的services当中。</p>
<p>接口中需要实现的方法如下：</p>
<table>
<thead>
<tr>
<th>方法名</th>
<th>入参内容</th>
<th>返回内容</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>setServerList</td>
<td>List，Nacos服务端地址列表</td>
<td>void</td>
<td>初始化时会调用此接口注入Nacos的服务列表，方便插件访问nacos服务端，如调用登录接口等</td>
</tr>
<tr>
<td>setNacosRestTemplate</td>
<td>NacosRestTemplate，Nacos的http客户端</td>
<td>void</td>
<td>初始化时会调用此接口注入Nacos的http客户端，方便插件访问nacos服务端，如调用登录接口等</td>
</tr>
<tr>
<td>login</td>
<td>Properties，即初始化Nacos客户端时传入的参数</td>
<td>boolean</td>
<td>登录接口，主要执行的是身份信息的转换工作，如<code v-pre>username</code>，<code v-pre>password</code>转换为<code v-pre>accessToken</code></td>
</tr>
<tr>
<td>getLoginIdentityContext</td>
<td>Resource</td>
<td>IdentityContext</td>
<td>获取经过登录接口转换后的身份信息，客户端会将该返回对象的内容全部注入到请求中</td>
</tr>
</tbody>
</table>
<p>您也可以选择继承<code v-pre>com.alibaba.nacos.plugin.auth.spi.client.AbstractClientAuthService</code>，该父类默认实现了<code v-pre>setServerList</code>和<code v-pre>setNacosRestTemplate</code>。</p>
<p>将开发完成的客户端插件打包成jar/zip，放入到您应用的classpath中即可自动生效。</p>
</div></template>


