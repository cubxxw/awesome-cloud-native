<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第14节-k3s" tabindex="-1"><a class="header-anchor" href="#第14节-k3s" aria-hidden="true">#</a> 第14节 k3s</h1>
<div><a href = '13.md' style='float:left'>⬆️上一节🔗  </a><a href = '15.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#k3s介绍">k3s介绍</router-link></li><li><router-link to="#架构">架构</router-link></li><li><router-link to="#安装-卸载-k3s">安装（卸载）k3s</router-link></li><li><router-link to="#镜像加速">镜像加速</router-link></li><li><router-link to="#边缘计算">边缘计算</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[toc]</p>
<h2 id="k3s介绍" tabindex="-1"><a class="header-anchor" href="#k3s介绍" aria-hidden="true">#</a> k3s介绍</h2>
<div class="custom-container tip"><p class="custom-container-title">k3s — 微型kubernets发行版</p>
<p>k3s是经CNCF一致性认证的Kubernetes发行版，专为物联网及边缘计算设计。</p>
<ul>
<li>[x] <a href="https://www.rancher.cn/k3s/" target="_blank" rel="noopener noreferrer">官方<ExternalLinkIcon/></a></li>
<li>[x] <a href="https://docs.rancher.cn/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></li>
<li>[x] <a href="https://github.com/k3s-io/k3s/" target="_blank" rel="noopener noreferrer">开源地址<ExternalLinkIcon/></a></li>
</ul>
<p><strong>技术亮点：</strong></p>
<ul>
<li>单进程架构简化部署</li>
<li>移除各种非必要的代码，减少资源占用</li>
<li>TLS证书管理</li>
<li>内置Containerd</li>
<li>内置自运行rootfs</li>
<li>内置Helm Chart管理机制</li>
<li>内置L4/L7 LB 支持</li>
</ul>
<p><strong>适合场景：</strong></p>
<ul>
<li>边缘计算-Edge</li>
<li>物联网-IoT</li>
<li>CI</li>
<li>Development</li>
<li>ARM</li>
<li>嵌入 K8s</li>
</ul>
</div>
<h2 id="架构" tabindex="-1"><a class="header-anchor" href="#架构" aria-hidden="true">#</a> 架构</h2>
<p>k3s架构就是把k8s核心组件封装成二进制~</p>
<p>k3s分为<code v-pre>k3s server</code> 和 <code v-pre> k3s agent</code>：</p>
<ul>
<li>k3s server 只有一个进程体</li>
<li>k3s agent 分为两个进程体，其中一个是 Contrainerd，负责管理运行容器</li>
</ul>
<blockquote>
<p>在下面也可以深刻理解到</p>
</blockquote>
<p><strong>架构详解：</strong></p>
<details class="custom-container details"><summary>架构讲解：</summary>
<p>k3s算是对k8s的架构和生态进行一部分精华和缩进</p>
<p><strong>单节点架构：</strong></p>
<p>K3s 单节点集群的架构如下图所示，该集群有一个内嵌 SQLite 数据库的单节点  <code v-pre>K3s server</code> 。</p>
<p>在这种配置中，每个  <code v-pre>agent</code> 节点都注册到同一个  <code v-pre>server</code> 节点。K3s 用户可以通过调用  <code v-pre>server</code> 节点上的 K3s API 来操作 Kubernetes 资源。</p>
<p>单节点 <code v-pre>K3s server</code> 的架构</p>
<p><img src="http://sm.nsddd.top/sm1660616402558126.png" alt="img"></p>
<p><strong>高可用架构：</strong></p>
<p>虽然单节点 k3s 集群可以满足各种用例，但对于 Kubernetes control-plane 的正常运行至关重要的环境，您可以在高可用配置中运行 K3s。一个高可用 K3s 集群由以下几个部分组成：</p>
<ul>
<li><strong><code v-pre>K3s server</code> 节点</strong> ：两个或更多的<code v-pre>server</code>节点将为 Kubernetes API 提供服务并运行其他 control-plane 服务</li>
<li><strong>外部数据库</strong> ：与单节点 k3s 设置中使用的嵌入式 SQLite 数据存储相反，高可用 K3s 需要挂载一个<code v-pre>external database</code>外部数据库作为数据存储的媒介。</li>
</ul>
<p>K3s高可用架构</p>
<p><img src="http://sm.nsddd.top/sm1660616476551520.png" alt="img"></p>
<p><strong>固定  <code v-pre>agent</code> 节点的注册地址：</strong></p>
<p>在高可用   <code v-pre>K3s server</code>  配置中，每个节点还必须使用固定的注册地址向 Kubernetes API 注册，注册后， <code v-pre>agent</code> 节点直接与其中一个  <code v-pre>server</code> 节点建立连接，如下图所示：</p>
<p><img src="http://sm.nsddd.top/sm1660616545857393.svg" alt="k3s-production-setup"></p>
<p><strong>注册  <code v-pre>agent</code> 节点：</strong></p>
<p><code v-pre>agent</code> 节点用<code v-pre>k3s agent</code>进程发起的 websocket 连接注册，连接由作为代理进程一部分运行的客户端负载均衡器维护。</p>
<p><code v-pre>agent</code> 将使用节点集群 secret 以及随机生成的节点密码向   <code v-pre>K3s server</code>  注册，密码存储在 <code v-pre>/etc/rancher/node/password</code>路径下。 <code v-pre>K3s server</code> 将把各个节点的密码存储为 Kubernetes secrets，随后的任何尝试都必须使用相同的密码。节点密码秘密存储在<code v-pre>kube-system</code>命名空间中，名称使用模板<code v-pre>&lt;host&gt;.node-password.k3s</code>。</p>
<blockquote>
<p>注意</p>
<ul>
<li>在 K3s v1.20.2 之前，<code v-pre> K3s  server</code> 将密码存储在<code v-pre>/var/lib/rancher/k3s/server/cred/node-passwd</code>的磁盘上。</li>
<li>如果您删除了  <code v-pre>agent</code> 的<code v-pre>/etc/rancher/node</code>目录，则需要为该  <code v-pre>agent</code> 重新创建密码文件，或者从  <code v-pre>server</code> 中删除该条目。</li>
<li>通过使用<code v-pre>--with-node-id</code>标志启动 <code v-pre>  K3s server</code> 或 agent，可以将唯一的节点 ID 附加到主机名中。</li>
</ul>
</blockquote>
<p><strong>自动部署的清单：</strong></p>
<p>位于目录路径<code v-pre>/var/lib/rancher/k3s/server/manifests</code> 的清单在构建时被捆绑到 K3s 二进制文件中，将由<a href="https://github.com/k3s-io/helm-controller#helm-controller" target="_blank" rel="noopener noreferrer">rancher/helm-controller<ExternalLinkIcon/></a>在运行时安装。</p>
</details>
<p><strong>架构图：</strong></p>
<p><img src="http://sm.nsddd.top/smhow-it-works-k3s.svg" alt="k3s下载"></p>
<details class="custom-container details"><summary>补充containerd</summary>
<p>containerd从docker就开始熟悉的，那么自然从docker开始介绍：</p>
<p><img src="https://sm.nsddd.top/sm952033-20180520115357747-1796034956.png" alt="img"></p>
<p>从图中可以看出，docker 对容器的管理和操作基本都是通过 containerd 完成的。 那么，containerd 是什么呢？
<strong>Containerd 是一个工业级标准的容器运行时，它强调简单性、健壮性和可移植性。Containerd 可以在宿主机中管理完整的容器生命周期：容器镜像的传输和存储、容器的执行和管理、存储和网络等。</strong> 详细点说，Containerd 负责干下面这些事情：</p>
<ul>
<li>管理容器的生命周期(从创建容器到销毁容器)</li>
<li>拉取/推送容器镜像</li>
<li>存储管理(管理镜像及容器数据的存储)</li>
<li>调用 runC 运行容器(与 runC 等容器运行时交互)</li>
<li>管理容器网络接口及网络</li>
</ul>
<p>⚠️ 注意：<strong>Containerd 被设计成嵌入到一个更大的系统中，而不是直接由开发人员或终端用户使用。</strong></p>
<p><img src="http://sm.nsddd.top/smimage-20221031142456840.png" alt="image-20221031142456840"></p>
</details>
<h2 id="安装-卸载-k3s" tabindex="-1"><a class="header-anchor" href="#安装-卸载-k3s" aria-hidden="true">#</a> 安装（卸载）k3s</h2>
<div class="custom-container warning"><p class="custom-container-title">启动k3s有多快？</p>
<p>一行代码搞定 — 仅需30秒，即可启动k3s：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> -
<span class="token comment"># Check for Ready node, takes maybe 30 seconds</span>
k3s kubectl get <span class="token function">node</span>

<span class="token comment"># if u in china, u can speed up the installation in the following ways</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>同样你可以选择把k3s部署在docker中，这样你就可以很方便的管理k3s</strong></p>
</blockquote>
<p>离线安装：</p>
<ul>
<li><a href="https://docs.rancher.cn/docs/k3s/installation/airgap/_index/" target="_blank" rel="noopener noreferrer">https://docs.rancher.cn/docs/k3s/installation/airgap/_index/<ExternalLinkIcon/></a></li>
</ul>
<p>日志查看k3s启动信息：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/syslog
<span class="token comment"># 或者</span>
kubectl get all <span class="token parameter variable">-n</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p><strong>卸载k3s：</strong></p>
<details class="custom-container details"><summary>卸载k3s</summary>
<p>如果您使用安装脚本安装了 K3s，那么在安装过程中会生成一个卸载 K3s 的脚本。</p>
<blockquote>
<p>卸载 K3s 会删除集群数据和所有脚本。要使用不同的安装选项重新启动集群，请使用不同的标志重新运行安装脚本。</p>
</blockquote>
</details>
<p>提供要从 server 节点卸载 K3s，和需要从agent结点卸载K3s：</p>
<CodeGroup>
<CodeGroupItem title="server结点">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/usr/local/bin/k3s-uninstall.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="agent结点">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/usr/local/bin/k3s-agent-uninstall.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<h2 id="镜像加速" tabindex="-1"><a class="header-anchor" href="#镜像加速" aria-hidden="true">#</a> 镜像加速</h2>
<p>镜像加速配置后，重启服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /etc/rancher/k3s/registries.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  docker.io:
    endpoint:
      - "https://fogjl973.mirror.aliyuncs.com"
      - "http://hub-mirror.c.163.com"
      - "https://docker.mirrors.ustc.edu.cn"
      - "https://registry.docker-cn.com"
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启k3s使配置生效</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>crictl info<span class="token operator">|</span><span class="token function">grep</span>  <span class="token parameter variable">-A</span> <span class="token number">5</span> registry
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221031112848849.png" alt="image-20221031112848849"></p>
<h2 id="边缘计算" tabindex="-1"><a class="header-anchor" href="#边缘计算" aria-hidden="true">#</a> 边缘计算</h2>
<p>k3s 非常支持边缘计算，CICD 的部署，可以给我们带来更好的体验。</p>
<div class="custom-container tip"><p class="custom-container-title">边缘计算是什么？</p>
<p><em>边缘计算是为应用开发者和服务提供商在网络的边缘侧提供云服务和IT环境服务；目标是在靠近数据输入或用户的地方提供计算、存储和网络带宽</em>。</p>
<p>通俗地说：边缘计算本质上是一种服务，就类似于云计算、大数据服务，但这种服务非常靠近用户；为什么要这么近？目的是为了让用户感觉到刷什么内容都特别快。</p>
</div>
<p><strong>提升了Quick start成功率：</strong></p>
<p>我们在交付软件的时候，从以前的给一个Java环境到现在需要一个k8s 环境，k3s则集成了，提供开箱即用的交互体验，降低软件的资源占用，并且使运维部署更方便。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '13.md' style='float:left'>⬆️上一节🔗  </a><a href = '15.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


