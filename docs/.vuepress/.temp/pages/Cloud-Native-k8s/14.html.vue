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
<nav class="table-of-contents"><ul><li><router-link to="#k3s介绍">k3s介绍</router-link></li><li><router-link to="#k3s和k8s区别">k3s和k8s区别</router-link></li><li><router-link to="#架构">架构</router-link></li><li><router-link to="#sqlite-和-dqlite">Sqlite 和 Dqlite</router-link></li><li><router-link to="#目录结构">目录结构</router-link></li><li><router-link to="#新版本默认支持-etcd">新版本默认支持 etcd</router-link></li><li><router-link to="#安装-卸载-k3s">安装（卸载）k3s</router-link></li><li><router-link to="#在线安装的解析">在线安装的解析</router-link><ul><li><router-link to="#指定版本">指定版本</router-link></li><li><router-link to="#指定数据库">指定数据库</router-link></li><li><router-link to="#指定容器运行时">指定容器运行时</router-link></li></ul></li><li><router-link to="#离线安装解释">离线安装解释</router-link><ul><li><router-link to="#步骤">步骤</router-link></li><li><router-link to="#前提条件">前提条件</router-link></li><li><router-link to="#containerd-手动部署镜像方式">Containerd + 手动部署镜像方式</router-link></li><li><router-link to="#docker-手动部署镜像方式">Docker + 手动部署镜像方式</router-link></li><li><router-link to="#containerd-手动部署镜像方式-1">Containerd + 手动部署镜像方式</router-link></li><li><router-link to="#containerd-私有镜像仓库方式">Containerd + 私有镜像仓库方式</router-link></li></ul></li><li><router-link to="#docker-私有镜像仓库方式">Docker + 私有镜像仓库方式</router-link><ul><li><router-link to="#单结点高可用离线安装">单结点高可用离线安装</router-link></li></ul></li><li><router-link to="#扩展work节点">扩展work节点</router-link></li><li><router-link to="#嵌入式数据库高可用">嵌入式数据库高可用</router-link></li><li><router-link to="#卸载k3s">卸载k3s</router-link></li><li><router-link to="#镜像加速">镜像加速</router-link></li><li><router-link to="#containerd">containerd</router-link><ul><li><router-link to="#架构图">架构图</router-link></li><li><router-link to="#命令">命令</router-link></li><li><router-link to="#containerd的配置管理">containerd的配置管理</router-link></li></ul></li><li><router-link to="#二进制工具">二进制工具</router-link></li><li><router-link to="#边缘计算">边缘计算</router-link></li><li><router-link to="#单节点-sqlite-扩展为-etcd-高可用">单节点 SQLite 扩展为 etcd 高可用</router-link></li><li><router-link to="#安装脚本">安装脚本</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[toc]</p>
<h2 id="k3s介绍" tabindex="-1"><a class="header-anchor" href="#k3s介绍" aria-hidden="true">#</a> k3s介绍</h2>
<div class="custom-container tip"><p class="custom-container-title">k3s — 微型kubernets发行版</p>
<p>k3s是经CNCF一致性认证的Kubernetes发行版，专为物联网及边缘计算设计。</p>
<ul>
<li><a href="https://www.rancher.cn/k3s/" target="_blank" rel="noopener noreferrer">官方<ExternalLinkIcon/></a></li>
<li><a href="https://docs.rancher.cn/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/k3s-io/k3s/" target="_blank" rel="noopener noreferrer">开源地址<ExternalLinkIcon/></a></li>
</ul>
<p><strong>技术亮点：</strong></p>
<ul>
<li>单进程架构简化部署</li>
<li>移除各种非必要的代码，减少资源占用</li>
<li><code v-pre>TLS</code> 证书管理</li>
<li>内置 <code v-pre>Containerd</code></li>
<li>内置自运行 <code v-pre>rootfs</code></li>
<li>内置 <code v-pre>Helm Chart</code> 管理机制</li>
<li>内置 <code v-pre>L4/L7 LB</code> 支持</li>
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
<h2 id="k3s和k8s区别" tabindex="-1"><a class="header-anchor" href="#k3s和k8s区别" aria-hidden="true">#</a> k3s和k8s区别</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>K3s是一个独立的服务器，与K8s不同，它是Kubernetes集群的一部分。K8s依靠CRI-O来整合Kubernetes与CRI（容器运行时接口），而K3s使用CRI-O与所有支持的容器运行时兼容。K8s使用kubelet来调度容器，但K3s使用主机的调度机制来调度容器。</p>
</div>
<p>k3s有比k8s更严格的安全部署，因为其攻击面小。k3s的另一个优势是，它可以减少安装、运行或更新Kubernetes集群所需的依赖性和步骤。</p>
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
<li><strong>外部数据库</strong> ：与单节点 k3s 设置中使用的嵌入式 <code v-pre>SQLite</code> 数据存储相反，高可用 K3s 需要挂载一个 <code v-pre>external database</code> 外部数据库作为数据存储的媒介。</li>
</ul>
<p><strong>K3s高可用架构：</strong></p>
<p><img src="http://sm.nsddd.top/sm1660616476551520.png" alt="img"></p>
<blockquote>
<p>注意：高可用结构同样可以使用<strong>嵌入式数据库</strong></p>
<p>⚠️ 区别：</p>
<p><strong>嵌入数据库是指数据在内存中数据库，英文称为–embedded</strong>，又称in-memory embedded database，如H2, HSQL and Derby databases。</p>
<p><strong>非嵌入式数据库是指数据在磁盘中的数据库</strong>，如MariaDB, MySQL and Oracle。</p>
</blockquote>
<p><img src="http://sm.nsddd.top/smimage-20221117173105788.png" alt="image-20221117173105788"></p>
<p><strong>固定  <code v-pre>agent</code> 节点的注册地址：</strong></p>
<p>在高可用   <code v-pre>K3s server</code>  配置中，每个节点还必须使用固定的注册地址向 Kubernetes API 注册，注册后， <code v-pre>agent</code> 节点直接与其中一个  <code v-pre>server</code> 节点建立连接，如下图所示：</p>
<p><img src="http://sm.nsddd.top/sm1660616545857393.svg" alt="k3s-production-setup"></p>
<p><strong>注册  <code v-pre>agent</code> 节点：</strong></p>
<p><code v-pre>agent</code> 节点用<code v-pre>k3s agent</code>进程发起的 websocket 连接注册，连接由作为代理进程一部分运行的客户端负载均衡器维护。</p>
<p><code v-pre>agent</code> 将使用节点集群 secret 以及随机生成的节点密码向   <code v-pre>K3s server</code>  注册，密码存储在 <code v-pre>/etc/rancher/node/password</code>路径下。 <code v-pre>K3s server</code> 将把各个节点的密码存储为 Kubernetes secrets，随后的任何尝试都必须使用相同的密码。节点密码秘密存储在<code v-pre>kube-system</code>命名空间中，名称使用模板<code v-pre>&lt;host&gt;.node-password.k3s</code>。</p>
<blockquote>
<p><strong>注意：</strong></p>
<ul>
<li>在 K3s v1.20.2 之前，<code v-pre> K3s  server</code> 将密码存储在<code v-pre>/var/lib/rancher/k3s/server/cred/node-passwd</code>的磁盘上。</li>
<li>如果您删除了  <code v-pre>agent</code> 的<code v-pre>/etc/rancher/node</code>目录，则需要为该  <code v-pre>agent</code> 重新创建密码文件，或者从  <code v-pre>server</code> 中删除该条目。</li>
<li>通过使用<code v-pre>--with-node-id</code>标志启动 <code v-pre>  K3s server</code> 或 agent，可以将唯一的节点 ID 附加到主机名中。</li>
</ul>
</blockquote>
<p><strong>自动部署的清单：</strong></p>
<p>位于目录路径<code v-pre>/var/lib/rancher/k3s/server/manifests</code> 的清单在构建时被捆绑到 K3s 二进制文件中，将由<a href="https://github.com/k3s-io/helm-controller#helm-controller" target="_blank" rel="noopener noreferrer">rancher/helm-controller<ExternalLinkIcon/></a>在运行时安装。</p>
</details>
<h2 id="sqlite-和-dqlite" tabindex="-1"><a class="header-anchor" href="#sqlite-和-dqlite" aria-hidden="true">#</a> Sqlite 和 Dqlite</h2>
<p>我认为我在这里遇到了很多疑惑，关于 Sqlite 和 <a href="https://github.com/canonical/dqlite/blob/master/README_CH.md" target="_blank" rel="noopener noreferrer">Dqlite<ExternalLinkIcon/></a></p>
<div class="custom-container tip"><p class="custom-container-title">dqlite</p>
<p>“dqlite”是“distributed SQLite”的简写，即分布式SQLite。意味着 dqlite 通过网络协议扩展 SQLite ，将应用程序的各个实例连接在一起，让它们作为一个高可用的集群，而不依赖外部数据库。</p>
</div>
<p>我希望 runtime 可以实现 multi-master ，同样支持的嵌入式和外部DB</p>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>关于 单结点 扩展为 高可用 状态，或许这并不是一个很容器实现的地方，我们在前面 details 中看到单结点架构和高可用架构的区别，或许我们应该在制作 <code v-pre>runtime</code> 模块 和 <code v-pre>rootfs</code> 的时候更倾向于实现 高可用。</p>
</div>
<p><strong>架构图：</strong></p>
<p><img src="http://sm.nsddd.top/smhow-it-works-k3s.svg" alt="k3s下载"></p>
<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<ul>
<li>位于目录路径 /var/lib/<code v-pre>/var/lib/rancher/k3s/server/manifests</code> 的<a href="https://github.com/rancher/k3s/tree/master/manifests" target="_blank" rel="noopener noreferrer">清单<ExternalLinkIcon/></a>在构建时捆绑到 K3s 二进制文件中。这些将由<a href="https://github.com/rancher/helm-controller#helm-controller" target="_blank" rel="noopener noreferrer">rancher/helm-controller.<ExternalLinkIcon/></a>在运行的时候自动安装</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/var/lib/rancher/k3s/server<span class="token comment"># cd manifests/;ls;pwd</span>
ccm.yaml      local-storage.yaml  rolebindings.yaml
coredns.yaml  metrics-server      traefik.yaml
/var/lib/rancher/k3s/server/manifests
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>可以将主要的 k3s 二进制文件放在任何您想要的地方。它会将内容写入 /var/lib/rancher/k3s 和 /etc/rancher，以及 containerd 和 kubelet 用于非持久文件的正常位置 /var/run 下。</li>
</ul>
<h2 id="新版本默认支持-etcd" tabindex="-1"><a class="header-anchor" href="#新版本默认支持-etcd" aria-hidden="true">#</a> 新版本默认支持 etcd</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>从 <code v-pre>v1.19.5+k3s1</code> 版本开始，K3s 已添加了对嵌入式 etcd 的完全支持。从 v1.19.1 到 v1.19.4 版本只提供了对嵌入式 etcd 的实验性支持。在 K3s v1.19.1 版本中，嵌入式 etcd 取代了实验性的 Dqlite。这是一个突破性的变化。请注意，不支持从实验性 Dqlite 升级到嵌入式 etcd。如果你尝试升级，升级将不会成功，并且数据将会丢失。</p>
<p>嵌入式 etcd (HA) 在速度较慢的磁盘上可能会出现性能问题，例如使用 SD 卡运行的 Raspberry Pi。</p>
<p>⚠️ 注意，如果你使用 docker 作为runtime，请小心 docker 是不认识 <code v-pre>+</code> ，如果你希望的到指定版本，请使用 ： <code v-pre>v1.19.5-k3s1</code></p>
</div>
<h2 id="安装-卸载-k3s" tabindex="-1"><a class="header-anchor" href="#安装-卸载-k3s" aria-hidden="true">#</a> 安装（卸载）k3s</h2>
<div class="custom-container warning"><p class="custom-container-title">启动k3s有多快？</p>
<p>一行代码搞定 — 仅需30秒，即可启动k3s：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> -
<span class="token comment"># Check for Ready node, takes maybe 30 seconds</span>
k3s kubectl get <span class="token function">node</span>

<span class="token comment"># if u in china, u can speed up the installation in the following ways</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token function">sh</span> -
<span class="token comment"># -s 不输出任何东西  &amp;  -f 连接失败时不显示http错误  &amp; -L参数会让 HTTP 请求跟随服务器的重定向。curl 默认不跟随重定向。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>同样你可以选择把k3s部署在docker中，这样你就可以很方便的管理k3s</strong></p>
<p><code v-pre>curl -sfL https://get.k3s.io | sh -</code> 将其 <code v-pre>server</code> 和 <code v-pre>agent</code> 都安装上了。</p>
<p><strong>如何扩充结点</strong></p>
</blockquote>
<p><strong>安装选项：</strong></p>
<ul>
<li><a href="https://docs.rancher.cn/docs/k3s/installation/install-options/_index#%E4%BD%BF%E7%94%A8%E8%84%9A%E6%9C%AC%E5%AE%89%E8%A3%85%E7%9A%84%E9%80%89%E9%A1%B9" target="_blank" rel="noopener noreferrer">使用脚本安装的选项<ExternalLinkIcon/></a></li>
<li><a href="https://docs.rancher.cn/docs/k3s/installation/install-options/_index#%E4%BB%8E%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%AE%89%E8%A3%85%E7%9A%84%E9%80%89%E9%A1%B9" target="_blank" rel="noopener noreferrer">从二进制中安装的选项<ExternalLinkIcon/></a></li>
<li><a href="https://docs.rancher.cn/docs/k3s/installation/install-options/_index#k3s-server-%E7%9A%84%E6%B3%A8%E5%86%8C%E9%80%89%E9%A1%B9" target="_blank" rel="noopener noreferrer">K3s server 的注册选项<ExternalLinkIcon/></a></li>
<li><a href="https://docs.rancher.cn/docs/k3s/installation/install-options/_index#k3s-agent-%E7%9A%84%E6%B3%A8%E5%86%8C%E9%80%89%E9%A1%B9" target="_blank" rel="noopener noreferrer">K3s agent 的注册选项<ExternalLinkIcon/></a></li>
<li><a href="https://docs.rancher.cn/docs/k3s/installation/install-options/_index#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6" target="_blank" rel="noopener noreferrer">配置文件<ExternalLinkIcon/></a></li>
</ul>
<p><strong>离线安装：</strong></p>
<ul>
<li><a href="https://docs.rancher.cn/docs/k3s/installation/airgap/_index/" target="_blank" rel="noopener noreferrer">https://docs.rancher.cn/docs/k3s/installation/airgap/_index/<ExternalLinkIcon/></a></li>
</ul>
<p>日志查看k3s启动信息：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/syslog
<span class="token comment"># 或者</span>
kubectl get all <span class="token parameter variable">-n</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h2 id="在线安装的解析" tabindex="-1"><a class="header-anchor" href="#在线安装的解析" aria-hidden="true">#</a> 在线安装的解析</h2>
<h3 id="指定版本" tabindex="-1"><a class="header-anchor" href="#指定版本" aria-hidden="true">#</a> 指定版本</h3>
<p><strong>我们前面默认安装最新版，或许我们可以指定版本安装：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_VERSION</span><span class="token operator">=</span>v1.25.3 <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="指定数据库" tabindex="-1"><a class="header-anchor" href="#指定数据库" aria-hidden="true">#</a> 指定数据库</h3>
<div class="custom-container tip"><p class="custom-container-title">场景</p>
<p><img src="http://sm.nsddd.top/smimage-20221124193104746.png" alt="image-20221124193104746"></p>
</div>
<p><strong>以MySQL为例：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> - server --datastore-endpoint<span class="token operator">=</span><span class="token string">'mysql://admin:Rancher2019k3s@tcp(k3s-mysql.csrskwupj33i.ca-central-1.rds.amazonaws.com:3306)/k3sdb'</span>
<span class="token comment"># 注意database name不要加特殊字符</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>任意节点查看node：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get no
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="指定容器运行时" tabindex="-1"><a class="header-anchor" href="#指定容器运行时" aria-hidden="true">#</a> 指定容器运行时</h3>
<p><strong>运行时：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--docker"</span> <span class="token function">sh</span> -

<span class="token comment"># Domestic mirror acceleration</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--docker"</span>  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>这样我们可以使用 docker 来管理 k3s</p>
</blockquote>
<table>
<thead>
<tr>
<th>Flag</th>
<th>默认值</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>--docker</code></td>
<td>N/A</td>
<td>用 docker 代替 containerd</td>
</tr>
<tr>
<td><code v-pre>--container-runtime-endpoint</code> value</td>
<td>N/A</td>
<td>禁用嵌入式 containerd，使用替代的 CRI 实现。</td>
</tr>
<tr>
<td><code v-pre>--pause-image</code> value</td>
<td>&quot;docker.io/rancher/pause:3.1&quot;</td>
<td>针对 containerd 或 Docker 的自定义 pause 镜像</td>
</tr>
<tr>
<td><code v-pre>--snapshotter</code> value</td>
<td>N/A</td>
<td>覆盖默认的 containerd 快照程序 (默认: &quot;overlayfs&quot;)</td>
</tr>
<tr>
<td><code v-pre>--private-registry</code> value</td>
<td>&quot;/etc/rancher/k3s/registries.yaml&quot;</td>
<td>私有镜像仓库配置文件</td>
</tr>
</tbody>
</table>
<details class="custom-container details"><summary>k3s安装动态</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/sealos<span class="token comment"># curl -fL https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -</span>
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
<span class="token number">100</span> <span class="token number">29713</span>  <span class="token number">100</span> <span class="token number">29713</span>    <span class="token number">0</span>     <span class="token number">0</span>   148k      <span class="token number">0</span> --:--:-- --:--:-- --:--:--  149k
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Finding release <span class="token keyword">for</span> channel stable
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Using v1.25.3+k3s1 as release
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Downloading <span class="token builtin class-name">hash</span> rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/v1.25.3-k3s1/sha256sum-amd64.txt
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Downloading binary rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/v1.25.3-k3s1/k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Verifying binary download
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Installing k3s to /usr/local/bin/k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping installation of SELinux RPM
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating /usr/local/bin/kubectl symlink to k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating /usr/local/bin/crictl symlink to k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping /usr/local/bin/ctr symlink to k3s, <span class="token builtin class-name">command</span> exists <span class="token keyword">in</span> <span class="token environment constant">PATH</span> at /usr/bin/ctr
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating <span class="token function">killall</span> script /usr/local/bin/k3s-killall.sh
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating uninstall script /usr/local/bin/k3s-uninstall.sh
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  env: Creating environment <span class="token function">file</span> /etc/systemd/system/k3s.service.env
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Creating <span class="token function">service</span> <span class="token function">file</span> /etc/systemd/system/k3s.service
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Enabling k3s unit
Created symlink /etc/systemd/system/multi-user.target.wants/k3s.service → /etc/systemd/system/k3s.service.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Starting k3s
<span class="token comment">################################################################################</span>
root@ubuntu:/sealos<span class="token comment"># k3s</span>
NAME:
   k3s - Kubernetes, but small and simple

USAGE:
   k3s <span class="token punctuation">[</span>global options<span class="token punctuation">]</span> <span class="token builtin class-name">command</span> <span class="token punctuation">[</span>command options<span class="token punctuation">]</span> <span class="token punctuation">[</span>arguments<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

VERSION:
   v1.25.3+k3s1 <span class="token punctuation">(</span>f2585c16<span class="token punctuation">)</span>

COMMANDS:
   server           Run management server
   agent            Run <span class="token function">node</span> agent
   kubectl          Run kubectl
   crictl           Run crictl
   ctr              Run ctr
   check-config     Run config check
   etcd-snapshot    Trigger an immediate etcd snapshot
   secrets-encrypt  Control secrets encryption and keys rotation
   certificate      Certificates management
   completion       Install shell completion script
   help, h          Shows a list of commands or <span class="token builtin class-name">help</span> <span class="token keyword">for</span> one <span class="token builtin class-name">command</span>

GLOBAL OPTIONS:
   <span class="token parameter variable">--debug</span>                     <span class="token punctuation">(</span>logging<span class="token punctuation">)</span> Turn on debug logs <span class="token punctuation">[</span><span class="token variable">$K3S_DEBUG</span><span class="token punctuation">]</span>
   --data-dir value, <span class="token parameter variable">-d</span> value  <span class="token punctuation">(</span>data<span class="token punctuation">)</span> Folder to hold state <span class="token punctuation">(</span>default: /var/lib/rancher/k3s or <span class="token variable">${<span class="token environment constant">HOME</span>}</span>/.rancher/k3s <span class="token keyword">if</span> not root<span class="token punctuation">)</span>
   --help, <span class="token parameter variable">-h</span>                  show <span class="token builtin class-name">help</span>
   --version, <span class="token parameter variable">-v</span>               print the version

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h2 id="离线安装解释" tabindex="-1"><a class="header-anchor" href="#离线安装解释" aria-hidden="true">#</a> 离线安装解释</h2>
<div class="custom-container tip"><p class="custom-container-title">提醒</p>
<p>下载离线安装脚本：https://get.k3s.io</p>
<p>下载<strong>k3s</strong>二进制文件：k3s</p>
<p>下载必要的<code v-pre>images</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://ghproxy.com/https://github.com/k3s-io/k3s/releases/download/v1.25.3%2Bk3s1/k3s-airgap-images-amd64.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p><strong>These files are available in the <a href="https://github.com/k3s-io/k3s/" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a> repository</strong></p>
<p><img src="http://sm.nsddd.top/smimage-20221109164523589.png" alt="image-20221109164523589"></p>
</blockquote>
</div>
<h3 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h3>
<p><strong>步骤 1</strong>：部署镜像，本文提供了两种部署方式，分别是<strong>部署私有镜像仓库</strong>和<strong>手动部署镜像</strong>。请在这两种方式中选择一种执行。</p>
<p><strong>步骤 2</strong>：安装 K3s，本文提供了两种安装方式，分别是<strong>单节点安装</strong>和<strong>高可用安装</strong>。完成镜像部署后，请在这两种方式中选择一种执行。</p>
<p><strong>离线升级 K3s 版本</strong>：完成离线安装 K3s 后，您还可以通过脚本升级 K3s 版本，或启用自动升级功能，以保持离线环境中的 K3s 版本与最新的 K3s 版本同步。</p>
<p><strong>请按照以下步骤准备镜像目录和 K3s 二进制文件：</strong></p>
<blockquote>
<p>我认为离线安装的重点在于<strong>K3s 依赖的镜像</strong>部分，因为 K3s 的&quot;安装脚本&quot;和&quot;二进制文件&quot;只需要下载到对应目录，然后赋予相应的权限即可，非常简单。但K3s 依赖的镜像的安装方式取决于你使用的是手动部署镜像还是私有镜像仓库，也取决于容器运行时使用的是 <code v-pre>containerd</code> 还是<code v-pre>docker</code>。</p>
<p>针对不同的组合形式，可以分为以下几种形式来实现离线安装：</p>
<ul>
<li>Containerd + 手动部署镜像方式</li>
<li>Docker + 手动部署镜像方式</li>
<li>Containerd + 私有镜像仓库方式</li>
<li>Docker + 私有镜像仓库方式</li>
</ul>
</blockquote>
<ol>
<li>
<p>从<a href="https://github.com/rancher/k3s/releases" target="_blank" rel="noopener noreferrer">K3s GitHub Release<ExternalLinkIcon/></a>页面获取你所运行的 K3s 版本的镜像 tar 文件。(<strong>airgap-images</strong>)</p>
</li>
<li>
<p>将 tar 文件放在<code v-pre>images</code>目录下，例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/lib/rancher/k3s/agent/images/
<span class="token function">sudo</span> <span class="token function">cp</span> ./k3s-airgap-images-<span class="token variable">$ARCH</span>.tar /var/lib/rancher/k3s/agent/images/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>将 k3s 二进制文件放在 <code v-pre>/usr/local/bin/k3s</code>路径下，并确保拥有可执行权限。完成后，现在可以转到下面的<a href="https://docs.rancher.cn/docs/k3s/installation/airgap/_index#%E5%AE%89%E8%A3%85-k3s" target="_blank" rel="noopener noreferrer">安装 K3s<ExternalLinkIcon/></a>部分，开始安装 K3s。</p>
</li>
</ol>
<h3 id="前提条件" tabindex="-1"><a class="header-anchor" href="#前提条件" aria-hidden="true">#</a> 前提条件</h3>
<ul>
<li>在安装 K3s 之前，完成上面的<a href="https://docs.rancher.cn/docs/k3s/installation/airgap/_index#%E9%83%A8%E7%BD%B2%E7%A7%81%E6%9C%89%E9%95%9C%E5%83%8F%E4%BB%93%E5%BA%93" target="_blank" rel="noopener noreferrer">部署私有镜像仓库<ExternalLinkIcon/></a>或<a href="https://docs.rancher.cn/docs/k3s/installation/airgap/_index#%E6%89%8B%E5%8A%A8%E9%83%A8%E7%BD%B2%E9%95%9C%E5%83%8F" target="_blank" rel="noopener noreferrer">手动部署镜像<ExternalLinkIcon/></a>，导入安装 K3s 所需要的镜像。</li>
<li>从 <a href="https://github.com/rancher/k3s/releases" target="_blank" rel="noopener noreferrer">release<ExternalLinkIcon/></a> 页面下载 K3s 二进制文件，K3s 二进制文件需要与离线镜像的版本匹配。将二进制文件放在每个离线节点的 <code v-pre>/usr/local/bin</code> 中，并确保这个二进制文件是可执行的。</li>
<li>下载 K3s 安装脚本：<a href="https://get.k3s.io/" target="_blank" rel="noopener noreferrer">https://get.k3s.io<ExternalLinkIcon/></a> 。将安装脚本放在每个离线节点的任意地方，并命名为 <code v-pre>install.sh</code>。</li>
</ul>
<p>当使用 <code v-pre>INSTALL_K3S_SKIP_DOWNLOAD</code> 环境变量运行 K3s 脚本时，K3s 将使用本地的脚本和二进制。</p>
<div class="custom-container warning"><p class="custom-container-title">提醒 u</p>
<p>您可以在离线环境中执行单节点安装，在一个 server（节点）上安装 K3s，或高可用安装，在多个 server（节点）上安装 K3s。</p>
<p>对安装脚本进行简单的修改（ghproxy），在最后可以看到 安装脚本~</p>
</div>
<h3 id="containerd-手动部署镜像方式" tabindex="-1"><a class="header-anchor" href="#containerd-手动部署镜像方式" aria-hidden="true">#</a> Containerd + 手动部署镜像方式</h3>
<details class="custom-container details"><summary>展开查看步骤</summary>
<p>假设你已经将同一版本的 K3s 的安装脚本(<code v-pre>k3s-install.sh</code>)、K3s 的二进制文件(<code v-pre>k3s</code>)、K3s 依赖的镜像(<code v-pre>k3s-airgap-images-amd64.tar</code>)下载到了<code v-pre>/root</code>目录下。</p>
<p>如果你使用的容器运行时为containerd，在启动 K3s 时，它会检查<code v-pre>/var/lib/rancher/k3s/agent/images/</code>是否存在可用的镜像压缩包，如果存在，就将该镜像导入到 <code v-pre>containerd</code> 镜像列表中。所以我们只需要下载 <code v-pre>K3s</code> 依赖的镜像到<code v-pre>/var/lib/rancher/k3s/agent/images/</code>目录，然后启动 <code v-pre>K3s</code> 即可。</p>
<p><strong>1. 导入镜像到 <code v-pre>containerd</code> 的镜像列表：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/lib/rancher/k3s/agent/images/
<span class="token function">sudo</span> <span class="token function">cp</span> /root/k3s-airgap-images-amd64.tar /var/lib/rancher/k3s/agent/images/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 将 K3s 安装脚本和 K3s 二进制文件移动到对应目录并授予可执行权限</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> a+x /root/k3s /root/k3s-install.sh
<span class="token function">sudo</span> <span class="token function">cp</span> /root/k3s /usr/local/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 安装 K3s</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true /root/k3s-install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<details class="custom-container details"><summary>演示</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z k3s-offline<span class="token punctuation">]</span><span class="token comment"># cp k3s-install.sh /root/k3s-install.sh</span>
<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z k3s-offline<span class="token punctuation">]</span><span class="token comment"># ls </span>
images  k3s  k3s-install.sh  Kubefile  sealer-runtime-demo
<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z k3s-offline<span class="token punctuation">]</span><span class="token comment"># cp k3s  /root/k3s</span>
<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z k3s-offline<span class="token punctuation">]</span><span class="token comment"># sudo chmod a+x /root/k3s /root/k3s-install.sh</span>
<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z k3s-offline<span class="token punctuation">]</span><span class="token comment"># sudo cp /root/k3s /usr/local/bin/</span>
<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z k3s-offline<span class="token punctuation">]</span><span class="token comment"># INSTALL_K3S_SKIP_DOWNLOAD=true /root/k3s-install.sh</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping k3s download and verify
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping installation of SELinux RPM
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping /usr/local/bin/kubectl symlink to k3s, <span class="token builtin class-name">command</span> exists <span class="token keyword">in</span> <span class="token environment constant">PATH</span> at /usr/bin/kubectl
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping /usr/local/bin/crictl symlink to k3s, <span class="token builtin class-name">command</span> exists <span class="token keyword">in</span> <span class="token environment constant">PATH</span> at /usr/bin/crictl
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping /usr/local/bin/ctr symlink to k3s, <span class="token builtin class-name">command</span> exists <span class="token keyword">in</span> <span class="token environment constant">PATH</span> at /usr/bin/ctr
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating <span class="token function">killall</span> script /usr/local/bin/k3s-killall.sh
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating uninstall script /usr/local/bin/k3s-uninstall.sh
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  env: Creating environment <span class="token function">file</span> /etc/systemd/system/k3s.service.env
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Creating <span class="token function">service</span> <span class="token function">file</span> /etc/systemd/system/k3s.service
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Enabling k3s unit
Created symlink from /etc/systemd/system/multi-user.target.wants/k3s.service to /etc/systemd/system/k3s.service.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Starting k3s
Failed to restart k3s.service: Unit is not loaded properly: Invalid argument.
See system logs and <span class="token string">'systemctl status k3s.service'</span> <span class="token keyword">for</span> details.
<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z k3s-offline<span class="token punctuation">]</span><span class="token comment"># k3s</span>
NAME:
   k3s - Kubernetes, but small and simple

USAGE:
   k3s <span class="token punctuation">[</span>global options<span class="token punctuation">]</span> <span class="token builtin class-name">command</span> <span class="token punctuation">[</span>command options<span class="token punctuation">]</span> <span class="token punctuation">[</span>arguments<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

VERSION:
   v1.25.3+k3s1 <span class="token punctuation">(</span>f2585c16<span class="token punctuation">)</span>

COMMANDS:
   server           Run management server
   agent            Run <span class="token function">node</span> agent
   kubectl          Run kubectl
   crictl           Run crictl
   ctr              Run ctr
   check-config     Run config check
   etcd-snapshot    Trigger an immediate etcd snapshot
   secrets-encrypt  Control secrets encryption and keys rotation
   certificate      Certificates management
   completion       Install shell completion script
   help, h          Shows a list of commands or <span class="token builtin class-name">help</span> <span class="token keyword">for</span> one <span class="token builtin class-name">command</span>

GLOBAL OPTIONS:
   <span class="token parameter variable">--debug</span>                     <span class="token punctuation">(</span>logging<span class="token punctuation">)</span> Turn on debug logs <span class="token punctuation">[</span><span class="token variable">$K3S_DEBUG</span><span class="token punctuation">]</span>
   --data-dir value, <span class="token parameter variable">-d</span> value  <span class="token punctuation">(</span>data<span class="token punctuation">)</span> Folder to hold state <span class="token punctuation">(</span>default: /var/lib/rancher/k3s or <span class="token variable">${<span class="token environment constant">HOME</span>}</span>/.rancher/k3s <span class="token keyword">if</span> not root<span class="token punctuation">)</span>
   --help, <span class="token parameter variable">-h</span>                  show <span class="token builtin class-name">help</span>
   --version, <span class="token parameter variable">-v</span>               print the version

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>验证：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z k3s-offline<span class="token punctuation">]</span><span class="token comment"># crictl images</span>
WARN<span class="token punctuation">[</span>0000<span class="token punctuation">]</span> image connect using default endpoints: <span class="token punctuation">[</span>unix:///var/run/dockershim.sock unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock<span class="token punctuation">]</span>. As the default settings are now deprecated, you should <span class="token builtin class-name">set</span> the endpoint instead. 
IMAGE                                    TAG                 IMAGE ID            SIZE
k0sproject/k0s                           latest              6adc65a599f7a       253MB
nginx                                    latest              76c69feac34e8       142MB
registry                                 <span class="token number">2.7</span>.1               0d0107588605f       <span class="token number">25</span>.7MB
sea.hub:5000/calico/apiserver            v3.22.1             b7dd079a4ed76       129MB
sea.hub:5000/calico/cni                  v3.22.1             2a8ef6985a3e5       236MB
sea.hub:5000/calico/kube-controllers     v3.22.1             c0c6672a66a59       132MB
sea.hub:5000/calico/node                 v3.22.1             7a71aca7b60fc       198MB
sea.hub:5000/calico/pod2daemon-flexvol   v3.22.1             17300d20daf93       <span class="token number">19</span>.7MB
sea.hub:5000/calico/typha                v3.22.1             f822f80398b9a       127MB
sea.hub:5000/coredns                     <span class="token number">1.7</span>.0               bfe3a36ebd252       <span class="token number">45</span>.2MB
sea.hub:5000/etcd                        <span class="token number">3.4</span>.13-0            0369cf4303ffd       253MB
sea.hub:5000/kube-apiserver              v1.19.8             9ba91a90b7d1b       119MB
sea.hub:5000/kube-controller-manager     v1.19.8             213ae7795128d       111MB
sea.hub:5000/kube-proxy                  v1.19.8             ea03182b84a23       118MB
sea.hub:5000/kube-scheduler              v1.19.8             919a3f36437dc       <span class="token number">46</span>.5MB
sea.hub:5000/pause                       <span class="token number">3.2</span>                 80d28bedfe5de       683kB
sea.hub:5000/tigera/operator             v1.25.3             648350e58702c       128MB
<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z k3s-offline<span class="token punctuation">]</span><span class="token comment"># kubectl get pods -A</span>
NAMESPACE          NAME                                              READY   STATUS    RESTARTS   AGE
calico-apiserver   calico-apiserver-64f668766b-dv2xk                 <span class="token number">1</span>/1     Running   <span class="token number">2</span>          4d17h
calico-apiserver   calico-apiserver-64f668766b-k49gx                 <span class="token number">1</span>/1     Running   <span class="token number">2</span>          4d17h
calico-system      calico-kube-controllers-69dfd59986-mq7cv          <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4d17h
calico-system      calico-node-pg47k                                 <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4d17h
calico-system      calico-typha-84f56b949f-t95jk                     <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4d17h
default            myapp                                             <span class="token number">0</span>/3     Pending   <span class="token number">0</span>          4d14h
kube-system        coredns-55bcc669d7-74xb2                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4d17h
kube-system        coredns-55bcc669d7-jdkj2                          <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4d17h
kube-system        etcd-izbp1evo5cnwagauz3w188z                      <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4d17h
kube-system        kube-apiserver-izbp1evo5cnwagauz3w188z            <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4d17h
kube-system        kube-controller-manager-izbp1evo5cnwagauz3w188z   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4d17h
kube-system        kube-proxy-ssr6t                                  <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4d17h
kube-system        kube-scheduler-izbp1evo5cnwagauz3w188z            <span class="token number">1</span>/1     Running   <span class="token number">0</span>          4d17h
tigera-operator    tigera-operator-7cdb76dd8b-ltbbs                  <span class="token number">1</span>/1     Running   <span class="token number">10</span>         4d17h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="docker-手动部署镜像方式" tabindex="-1"><a class="header-anchor" href="#docker-手动部署镜像方式" aria-hidden="true">#</a> Docker + 手动部署镜像方式</h3>
<details class="custom-container details"><summary>展开查看步骤</summary>
<p>假设你已经将同一版本的 K3s 的安装脚本(<code v-pre>k3s-install.sh</code>)、K3s 的二进制文件(<code v-pre>k3s</code>)、K3s 依赖的镜像(<code v-pre>k3s-airgap-images-amd64.tar</code>)下载到了<code v-pre>/root</code>目录下。</p>
<p>与 <code v-pre>containerd</code> 不同，使用 docker 作为容器运行时，启动 <code v-pre>K3s</code> 不会导入 <code v-pre>/var/lib/rancher/k3s/agent/images/</code>目录下的镜像。所以在启动 <code v-pre>K3s</code> 之前我们需要将 <code v-pre>K3s</code> 依赖的镜像手动导入到 <code v-pre>docker</code> 镜像列表中。</p>
<p><strong>1. 导入镜像到 <code v-pre>docker</code> 的镜像列表：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">docker</span> load <span class="token parameter variable">-i</span> /root/k3s-airgap-images-amd64.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2. 将 K3s 安装脚本和 K3s 二进制文件移动到对应目录并授予可执行权限</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> a+x /root/k3s /root/k3s-install.sh
<span class="token function">sudo</span> <span class="token function">cp</span> /root/k3s /usr/local/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 安装 K3s</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--docker'</span> /root/k3s-install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h3 id="containerd-手动部署镜像方式-1" tabindex="-1"><a class="header-anchor" href="#containerd-手动部署镜像方式-1" aria-hidden="true">#</a> Containerd + 手动部署镜像方式</h3>
<details class="custom-container details"><summary>展开查看步骤</summary>
<p>假设你已经将同一版本的 K3s 的安装脚本(<code v-pre>k3s-install.sh</code>)、K3s 的二进制文件(<code v-pre>k3s</code>)、K3s 依赖的镜像(<code v-pre>k3s-airgap-images-amd64.tar</code>)下载到了<code v-pre>/root</code>目录下。</p>
<p>如果你使用的容器运行时为containerd，在启动 K3s 时，它会检查<code v-pre>/var/lib/rancher/k3s/agent/images/</code>是否存在可用的镜像压缩包，如果存在，就将该镜像导入到 <code v-pre>containerd</code> 镜像列表中。所以我们只需要下载 <code v-pre>K3s</code> 依赖的镜像到<code v-pre>/var/lib/rancher/k3s/agent/images/</code>目录，然后启动 <code v-pre>K3s</code> 即可。</p>
<p><strong>1. 导入镜像到 <code v-pre>containerd</code> 的镜像列表：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/lib/rancher/k3s/agent/images/
<span class="token function">sudo</span> <span class="token function">cp</span> /root/k3s-airgap-images-amd64.tar /var/lib/rancher/k3s/agent/images/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 将 K3s 安装脚本和 K3s 二进制文件移动到对应目录并授予可执行权限</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> a+x /root/k3s /root/k3s-install.sh
<span class="token function">sudo</span> <span class="token function">cp</span> /root/k3s /usr/local/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 安装 K3s</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true /root/k3s-install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h3 id="containerd-私有镜像仓库方式" tabindex="-1"><a class="header-anchor" href="#containerd-私有镜像仓库方式" aria-hidden="true">#</a> Containerd + 私有镜像仓库方式</h3>
<details class="custom-container details"><summary>展开查看详细</summary>
<p>假设你已经将同一版本的 K3s 的安装脚本(<code v-pre>k3s-install.sh</code>)、K3s 的二进制文件(k3s)下载到了<code v-pre>/root</code>目录下。并且 <code v-pre>K3s</code> 所需要的镜像已经上传到了镜像仓库（本例的镜像仓库地址为：http://192.168.64.44:5000）。K3s 所需的镜像列表可以从 <code v-pre>K3s Release</code>页面的<code v-pre>k3s-images.txt</code>获得。</p>
<p><strong>1. 配置 K3s 镜像仓库</strong></p>
<p>启动 K3s 默认会从docker.io拉取镜像。使用containerd容器运行时在离线安装时，我们只需要将镜像仓库地址配置到docker.io下的endpoint即可，更多配置说明请参考配置 containerd 镜像仓库完全攻略或<a href="https://docs.rancher.cn/docs/k3s/installation/private-registry/_index/" target="_blank" rel="noopener noreferrer">K3s 官方文档<ExternalLinkIcon/></a>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/rancher/k3s
<span class="token function">sudo</span> <span class="token function">cat</span> <span class="token operator">>></span> /etc/rancher/k3s/registries.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
"docker.io":
endpoint:
- "http://192.168.64.44:5000"
- "https://registry-1.docker.io"
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 将 K3s 安装脚本和 K3s 二进制文件移动到对应目录并授予可执行权限</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> a+x /root/k3s /root/k3s-install.sh
<span class="token function">sudo</span> <span class="token function">cp</span> /root/k3s /usr/local/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 安装 K3s</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true /root/k3s-install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>稍等片刻，即可查看到 K3s 已经成功启动：</p>
</blockquote>
</details>
<h2 id="docker-私有镜像仓库方式" tabindex="-1"><a class="header-anchor" href="#docker-私有镜像仓库方式" aria-hidden="true">#</a> Docker + 私有镜像仓库方式</h2>
<details class="custom-container details"><summary>展开查看详细</summary>
<p>假设你已经将同一版本的 K3s 的安装脚本(k3s-install.sh)、K3s 的二进制文件(k3s)下载到了/root目录下。并且 K3s 所需要的镜像已经上传到了镜像仓库（本例的镜像仓库地址为：http://192.168.64.44:5000）。K3s 所需的镜像列表可以从 K3s Release页面的k3s-images.txt获得。</p>
<p><strong>1. 配置 K3s 镜像仓库</strong></p>
<p>Docker 不支持像 containerd 那样可以通过修改 docker.io 对应的 endpoint（默认为 https://registry-1.docker.io）来间接修改默认镜像仓库的地址。但在Docker中可以通过配置registry-mirrors来实现从其他镜像仓库中获取K3s镜像。这样配置之后，会先从registry-mirrors配置的地址拉取镜像，如果获取不到才会从默认的docker.io获取镜像，从而满足了我们的需求。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;</span><span class="token string">EOF
{
"registry-mirrors": ["http://192.168.64.44:5000"]
}
EOF</span>
<span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2、将 K3s 安装脚本和 K3s 二进制文件移动到对应目录并授予可执行权限</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chmod</span> a+x /root/k3s /root/k3s-install.sh
<span class="token function">sudo</span> <span class="token function">cp</span> /root/k3s /usr/local/bin/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 安装k3s：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--docker'</span> /root/k3s-install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h3 id="单结点高可用离线安装" tabindex="-1"><a class="header-anchor" href="#单结点高可用离线安装" aria-hidden="true">#</a> 单结点高可用离线安装</h3>
<p><strong>提供要从 server 节点卸载 K3s，和需要从agent结点卸载K3s，推荐使用高可用安装，关于单结点迁移到高可用状态可参考 <a href="https://mp.weixin.qq.com/s/Yax2m2uFw2d4lo5sybHsCw" target="_blank" rel="noopener noreferrer">🧷 这篇文章<ExternalLinkIcon/></a>：</strong></p>
<CodeGroup>
<CodeGroupItem title="单结点安装">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true ./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，要选择添加其他 agent，请在每个 agent 节点上执行以下操作。注意将 <code v-pre>myserver</code> 替换为 server 的 IP 或有效的 DNS，并将 <code v-pre>mynodetoken</code> 替换 server 节点的 token，通常在<code v-pre>/var/lib/rancher/k3s/server/node-token</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span>https://myserver:6443 <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>mynodetoken ./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="高可用安装">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> - server <span class="token punctuation">\</span>
  --datastore-endpoint<span class="token operator">=</span><span class="token string">'mysql://username:password@tcp(hostname:3306)/database-name'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>您需要调整安装命令，以便指定<code v-pre>INSTALL_K3S_SKIP_DOWNLOAD=true</code>并在本地运行安装脚本。您还将利用<code v-pre>INSTALL_K3S_EXEC='args'</code>为 k3s 提供其他参数。</p>
<p>由于在离线环境中无法使用<code v-pre>curl</code>命令进行安装，所以您需要参考以下示例，将这条命令行修改为离线安装：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'server'</span> <span class="token assign-left variable">K3S_DATASTORE_ENDPOINT</span><span class="token operator">=</span><span class="token string">'mysql://username:password@tcp(hostname:3306)/database-name'</span> ./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<h2 id="扩展work节点" tabindex="-1"><a class="header-anchor" href="#扩展work节点" aria-hidden="true">#</a> 扩展work节点</h2>
<p>K3s 提供了一个安装脚本，可以方便地将其作为服务安装在基于 systemd 或 openrc 的系统上。该脚本可在 <a href="https://get.k3s.io/" target="_blank" rel="noopener noreferrer">https://get.k3s.io<ExternalLinkIcon/></a> 获得。要使用这种方法安装 K3s，只需运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行此安装后：</p>
<ul>
<li>K3s 服务将被配置为在节点重启后或进程崩溃或被杀死时自动重启。</li>
<li>将安装其他实用程序，包括 <code v-pre>kubectl</code>、<code v-pre>crictl</code>、<code v-pre>ctr</code>、<code v-pre>k3s-killall.sh</code> 和 <code v-pre>k3s-uninstall.sh</code>。</li>
<li><a href="https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/" target="_blank" rel="noopener noreferrer">kubeconfig<ExternalLinkIcon/></a> 文件将写入到 <code v-pre>/etc/rancher/k3s/k3s.yaml</code>，由 K3s 安装的 kubectl 将自动使用该文件。</li>
</ul>
<p>要在 Worker 节点上安装并将它们添加到集群，请使用 <code v-pre>K3S_URL</code> 和 <code v-pre>K3S_TOKEN</code> 环境变量运行安装脚本。以下示例演示了如何加入 Worker 节点：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span>https://myserver:6443 <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>mynodetoken <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>设置 <code v-pre>K3S_URL</code> 参数会使 K3s 以 Worker 模式运行。K3s Agent 将注册到在 URL 上监听的 K3s Server。<code v-pre>K3S_TOKEN</code> 使用的值存储在 Server 节点上的 <code v-pre>/var/lib/rancher/k3s/server/node-token</code> 中。</p>
<p>注意：每台主机必须具有唯一的主机名。如果你的计算机没有唯一的主机名，请传递 <code v-pre>K3S_NODE_NAME</code> 环境变量，并为每个节点提供一个有效且唯一的主机名。</p>
<h2 id="嵌入式数据库高可用" tabindex="-1"><a class="header-anchor" href="#嵌入式数据库高可用" aria-hidden="true">#</a> 嵌入式数据库高可用</h2>
<blockquote>
<p>在 K3s v1.19.1 中，嵌入式 etcd 取代了实验性的 <code v-pre>Dqlite</code>。这是一个突破性的变化。请注意，不支持从实验性 Dqlite 升级到嵌入式 etcd。如果你尝试升级，升级将不会成功，并且数据将会丢失。</p>
</blockquote>
<p>etcd 使用的共识算法是 raft，HA模式下保证三个node开始~</p>
<p>首先，启动一个带有 <code v-pre>cluster-init</code> 标志的 Server 节点来启用集群和一个令牌，该令牌将作为共享 secret，用于将其他服务器加入集群。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>SECRET <span class="token function">sh</span> <span class="token parameter variable">-s</span> - server --cluster-init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动第一台服务器后，使用共享 secret 将第二台和第三台服务器加入集群：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>SECRET <span class="token function">sh</span> <span class="token parameter variable">-s</span> - server <span class="token parameter variable">--server</span> https://<span class="token operator">&lt;</span>ip or <span class="token function">hostname</span> of server<span class="token operator"><span class="token file-descriptor important">1</span>></span>:6443
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="卸载k3s" tabindex="-1"><a class="header-anchor" href="#卸载k3s" aria-hidden="true">#</a> 卸载k3s</h2>
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
<h2 id="containerd" tabindex="-1"><a class="header-anchor" href="#containerd" aria-hidden="true">#</a> containerd</h2>
<ul>
<li><a href="https://containerd.io/" target="_blank" rel="noopener noreferrer">https://containerd.io/<ExternalLinkIcon/></a></li>
</ul>
<h3 id="架构图" tabindex="-1"><a class="header-anchor" href="#架构图" aria-hidden="true">#</a> 架构图</h3>
<p><img src="http://sm.nsddd.top/smimage-20221110202936935.png" alt="image-20221110202936935"></p>
<details class="custom-container details"><summary>补充containerd</summary>
<p>containerd从docker就开始熟悉的，那么自然从docker开始介绍：</p>
<p><img src="https://sm.nsddd.top/sm952033-20180520115357747-1796034956.png" alt="img"></p>
<blockquote>
<p>在docker1.8之前可以使用 <code v-pre>docker -d</code>。在后面就是 <code v-pre>docker daemon</code> 。1.11以后：<code v-pre>docker</code>、<code v-pre>dockerd</code>。2015年后 OCI 成立，<code v-pre>runtime-spec</code> 制定</p>
<p><code v-pre>libcotainer –&gt;  runC</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>dockerd <span class="token operator">=</span> <span class="token function">docker</span> engine + containerd + containerd - shim + runC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>…….</p>
<p>后面 <code v-pre>kubelet</code> 不支持 <code v-pre>docker</code> （因为 <code v-pre>docker</code> 不支持 <code v-pre>CRI</code>），<code v-pre>kubernetes</code>使用 <code v-pre>containerd</code>。<code v-pre>containerd v1.1</code>后面也支持 <code v-pre>cri</code> ，</p>
</blockquote>
<p>从图中可以看出，docker 对容器的管理和操作基本都是通过 containerd 完成的。 那么，containerd 是什么呢？</p>
<blockquote>
<p><strong>containerd</strong> 可用作 Linux 和 Windows 的守护进程。它管理其主机系统的整个容器生命周期，从映像传输和存储到容器执行和监督，再到低级存储，再到网络附件等。</p>
</blockquote>
<p><strong>Containerd 是一个工业级标准的容器运行时，它强调简单性、健壮性和可移植性。Containerd 可以在宿主机中管理完整的容器生命周期：容器镜像的传输和存储、容器的执行和管理、存储和网络等。</strong> 详细点说，Containerd 负责干下面这些事情：</p>
<ul>
<li>管理容器的生命周期(从创建容器到销毁容器)</li>
<li>拉取 / 推送容器镜像</li>
<li>存储管理(管理镜像及容器数据的存储)</li>
<li>调用 <code v-pre>runC</code> 运行容器(与 <code v-pre>runC</code> 等容器运行时交互)</li>
<li>管理容器网络接口及网络</li>
</ul>
<p>⚠️ 注意：<strong>Containerd 被设计成嵌入到一个更大的系统中，而不是直接由开发人员或终端用户使用。</strong></p>
<p><img src="http://sm.nsddd.top/smimage-20221031142456840.png" alt="image-20221031142456840"></p>
</details>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>在上面的安装我们知道了可以选择默认的docker安装。</p>
</div>
<h3 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h3>
<p><img src="http://sm.nsddd.top/smcontainerd-docker-k8s-images" alt="查看源图像"></p>
<h3 id="containerd的配置管理" tabindex="-1"><a class="header-anchor" href="#containerd的配置管理" aria-hidden="true">#</a> containerd的配置管理</h3>
<div class="custom-container warning"><p class="custom-container-title">总结</p>
<p>k3s 安装后内置以下 containerd 客户端</p>
<ul>
<li>ctr ： 单纯的容器管理</li>
<li>crictl：从 kubernetes 视角触发，对 POD，容器进行管理。</li>
</ul>
<p><strong>k3s 内修改 containerd 的配置步骤：</strong></p>
<ul>
<li>复制 <code v-pre>/var/lib/rancher/k3s/agent/containerd/config.toml</code> 为同目录下的新模板</li>
<li>修改 config.toml.tmpl</li>
<li>重启 k3s （systemctl restart k3s) 或者 k3s-agent（systemctl restart k3s-agent）</li>
<li>检查 <code v-pre>/var/lib/rancher/k3s/agent/containerd/config.toml</code></li>
</ul>
</div>
<p><strong>日志：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/lib/rancher/k3s/agent/containerd/containerd.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="二进制工具" tabindex="-1"><a class="header-anchor" href="#二进制工具" aria-hidden="true">#</a> 二进制工具</h2>
<p>K3s 二进制文件包含许多帮助您管理集群的附加工具。</p>
<table>
<thead>
<tr>
<th>命令</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>k3s server</code></td>
<td>运行 K3s 管理服务器，它还将启动 Kubernetes 控制平面组件，例如 API 服务器、控制器管理器和调度程序。</td>
</tr>
<tr>
<td><code v-pre>k3s agent</code></td>
<td>运行 K3s 节点代理。这将导致 K3s 作为工作节点运行，启动 Kubernetes 节点服务<code v-pre>kubelet</code>和<code v-pre>kube-proxy</code>.</td>
</tr>
<tr>
<td><code v-pre>k3s kubectl</code></td>
<td>运行嵌入式<a href="https://kubernetes.io/docs/docs/reference/kubectl/overview/" target="_blank" rel="noopener noreferrer">kubectl<ExternalLinkIcon/></a> CLI。如果<code v-pre>KUBECONFIG</code>未设置环境变量，这将自动尝试使用在<code v-pre>/etc/rancher/k3s/k3s.yaml</code>启动 K3s 服务器节点时创建的配置文件。</td>
</tr>
<tr>
<td><code v-pre>k3s crictl</code></td>
<td>运行嵌入式<a href="https://github.com/kubernetes-sigs/cri-tools/blob/master/docs/crictl.md" target="_blank" rel="noopener noreferrer">crictl<ExternalLinkIcon/></a>。这是一个用于与 Kubernetes 的容器运行时接口 (CRI) 交互的 CLI。对调试很有用。</td>
</tr>
<tr>
<td><code v-pre>k3s ctr</code></td>
<td>运行嵌入式<a href="https://github.com/projectatomic/containerd/blob/master/docs/cli.md" target="_blank" rel="noopener noreferrer">ctr<ExternalLinkIcon/></a>。这是 containerd 的 CLI，K3s 使用的容器守护进程。对调试很有用。</td>
</tr>
<tr>
<td><code v-pre>k3s etcd-snapshot</code></td>
<td>对 K3s 集群数据进行按需备份并上传到 S3。有关详细信息，请参阅<a href="https://docs.k3s.io/backup-restore#backup-and-restore-with-embedded-etcd-datastore-experimental" target="_blank" rel="noopener noreferrer">备份和还原<ExternalLinkIcon/></a>。</td>
</tr>
<tr>
<td><code v-pre>k3s secrets-encrypt</code></td>
<td>将 K3s 配置为在将机密存储在集群中时对其进行加密。有关详细信息，请参阅<a href="https://docs.k3s.io/security/secrets-encryption" target="_blank" rel="noopener noreferrer">秘密加密<ExternalLinkIcon/></a>。</td>
</tr>
<tr>
<td><code v-pre>k3s certificate</code></td>
<td>证书管理</td>
</tr>
<tr>
<td><code v-pre>k3s completion</code></td>
<td>为 k3s 生成 shell 完成脚本</td>
</tr>
<tr>
<td><code v-pre>k3s help</code></td>
<td>显示命令列表或一个命令的帮助</td>
</tr>
</tbody>
</table>
<h2 id="边缘计算" tabindex="-1"><a class="header-anchor" href="#边缘计算" aria-hidden="true">#</a> 边缘计算</h2>
<p>k3s 非常支持边缘计算，CICD 的部署，可以给我们带来更好的体验。</p>
<div class="custom-container tip"><p class="custom-container-title">边缘计算是什么？</p>
<p>边缘计算是为应用开发者和服务提供商在网络的边缘侧提供云服务和IT环境服务；目标是在靠近数据输入或用户的地方提供计算、存储和网络带宽。</p>
<p>通俗地说：边缘计算本质上是一种服务，就类似于云计算、大数据服务，但这种服务非常靠近用户；为什么要这么近？目的是为了让用户感觉到刷什么内容都特别快。</p>
</div>
<p><strong>提升了Quick start成功率：</strong></p>
<p>我们在交付软件的时候，从以前的给一个Java环境到现在需要一个k8s 环境，k3s则集成了，提供开箱即用的交互体验，降低软件的资源占用，并且使运维部署更方便。</p>
<h2 id="单节点-sqlite-扩展为-etcd-高可用" tabindex="-1"><a class="header-anchor" href="#单节点-sqlite-扩展为-etcd-高可用" aria-hidden="true">#</a> 单节点 SQLite 扩展为 etcd 高可用</h2>
<blockquote>
<p>注意：k3s v1.22.2 及更新版本才支持从单节点 k3s 集群转换为内置 etcd 集群</p>
</blockquote>
<h2 id="安装脚本" tabindex="-1"><a class="header-anchor" href="#安装脚本" aria-hidden="true">#</a> 安装脚本</h2>
<details class="custom-container details"><summary>k3s 安装脚本</summary>
<p>https://get.k3s.io</p>
<p>Maybe you can try my plan, if you don't choose the domestic route, but you are affected by the firewall. Then you can use <code v-pre>https://ghproxy.com/{github-url}</code></p>
</details>
<details class="custom-container details"><summary>国内镜像加速~</summary>
<p>https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -sfL https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
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


