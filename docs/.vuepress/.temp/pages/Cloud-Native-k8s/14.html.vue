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
<nav class="table-of-contents"><ul><li><router-link to="#k3s介绍">k3s介绍</router-link></li><li><router-link to="#k3s和k8s区别">k3s和k8s区别</router-link></li><li><router-link to="#架构">架构</router-link></li><li><router-link to="#sqlite-和-dqlite">Sqlite 和 Dqlite</router-link></li><li><router-link to="#新版本默认支持-etcd">新版本默认支持 etcd</router-link></li><li><router-link to="#在线脚本安装k3s">在线脚本安装k3s</router-link></li><li><router-link to="#在线安装的解析">在线安装的解析</router-link><ul><li><router-link to="#安装内容">安装内容</router-link></li><li><router-link to="#执行操作">执行操作</router-link></li><li><router-link to="#指定版本">指定版本</router-link></li><li><router-link to="#指定数据库">指定数据库</router-link></li><li><router-link to="#指定容器运行时">指定容器运行时</router-link></li></ul></li><li><router-link to="#离线安装解释">离线安装解释</router-link><ul><li><router-link to="#步骤">步骤</router-link></li><li><router-link to="#前提条件">前提条件</router-link></li><li><router-link to="#containerd-手动部署镜像方式">Containerd + 手动部署镜像方式</router-link></li><li><router-link to="#docker-手动部署镜像方式">Docker + 手动部署镜像方式</router-link></li><li><router-link to="#containerd-手动部署镜像方式-1">Containerd + 手动部署镜像方式</router-link></li><li><router-link to="#containerd-私有镜像仓库方式">Containerd + 私有镜像仓库方式</router-link></li><li><router-link to="#docker-私有镜像仓库方式">Docker + 私有镜像仓库方式</router-link></li><li><router-link to="#单结点高可用离线安装">单结点高可用离线安装</router-link></li></ul></li><li><router-link to="#为kubelet-设置别名">为kubelet 设置别名</router-link></li><li><router-link to="#扩展work节点">扩展work节点</router-link></li><li><router-link to="#cri-cni-csi">CRI CNI  CSI</router-link></li><li><router-link to="#嵌入式数据库高可用">嵌入式数据库高可用</router-link></li><li><router-link to="#ha-部署实验">HA 部署实验</router-link></li><li><router-link to="#卸载k3s">卸载k3s</router-link><ul><li><router-link to="#针对-docker-cri">针对 docker CRI</router-link></li></ul></li><li><router-link to="#k3s-的一些重要目录">k3s 的一些重要目录</router-link><ul><li><router-link to="#var-lib-rancher-k3s">/var/lib/rancher/k3s</router-link></li><li><router-link to="#etc-rancher">/etc/rancher</router-link></li><li><router-link to="#var-run">/var/run</router-link></li></ul></li><li><router-link to="#镜像加速">镜像加速</router-link></li><li><router-link to="#containerd">containerd</router-link><ul><li><router-link to="#架构图">架构图</router-link></li><li><router-link to="#命令">命令</router-link></li><li><router-link to="#containerd的配置管理">containerd的配置管理</router-link></li></ul></li><li><router-link to="#二进制工具">二进制工具</router-link></li><li><router-link to="#边缘计算">边缘计算</router-link></li><li><router-link to="#单节点-sqlite-扩展为-etcd-高可用">单节点 SQLite 扩展为 etcd 高可用</router-link></li><li><router-link to="#安装脚本">安装脚本</router-link><ul><li><router-link to="#理解安装的步骤">理解安装的步骤</router-link></li><li><router-link to="#标志和环境变量">标志和环境变量</router-link></li><li><router-link to="#k3s-server-agent-常用配置">K3s Server/Agent - 常用配置</router-link></li><li><router-link to="#k3s-server-agent-数据库选项">K3s Server/Agent - 数据库选项</router-link></li><li><router-link to="#k3s-安装事项-网络选项">K3s 安装事项 - 网络选项</router-link></li><li><router-link to="#外部数据库">外部数据库</router-link></li><li><router-link to="#集群数据存储选项">集群数据存储选项</router-link></li><li><router-link to="#私有镜像仓库">私有镜像仓库</router-link></li></ul></li><li><router-link to="#安装事项-注意事项">安装事项 - 注意事项</router-link></li><li><router-link to="#k3s-集群升级">K3s 集群升级</router-link></li><li><router-link to="#k3s-备份恢复">K3s 备份恢复</router-link><ul><li><router-link to="#k3s-卷和存储">K3s 卷和存储</router-link></li></ul></li><li><router-link to="#k3s-网络相关">K3s 网络相关</router-link></li><li><router-link to="#helm-k3s">helm(k3s)</router-link></li><li><router-link to="#k3s-高级选项">K3s 高级选项</router-link></li><li><router-link to="#所遇到的问题">所遇到的问题</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
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
<p><strong>架构图：</strong></p>
<p><img src="http://sm.nsddd.top/smhow-it-works-k3s.svg" alt="k3s下载"></p>
<h2 id="k3s和k8s区别" tabindex="-1"><a class="header-anchor" href="#k3s和k8s区别" aria-hidden="true">#</a> k3s和k8s区别</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>K3s是一个独立的服务器，与K8s不同，它是Kubernetes集群的一部分。K8s依靠CRI-O来整合Kubernetes与CRI（容器运行时接口），而K3s使用CRI-O与所有支持的容器运行时兼容。K8s使用kubelet来调度容器，但K3s使用主机的调度机制来调度容器。</p>
</div>
<p>k3s有比k8s更严格的安全部署，因为其攻击面小。k3s的另一个优势是，它可以减少安装、运行或更新Kubernetes集群所需的依赖性和步骤。</p>
<div class="custom-container warning"><p class="custom-container-title">如何封装 k8s –> k3s 中</p>
<p>原理就是，将 <code v-pre>K8S</code> 的相关组件封装到 <code v-pre>K3s</code> 的二进制文件中去，然后启动这二进制文件就可以启动一个成熟的 <code v-pre>K8S</code> 集群。在下面🔽 我们可以看到 <code v-pre>K3s</code> 和 <code v-pre>K8S</code> 的架构基本差不多，其中 <code v-pre>k3s-server</code> 对应这个 <code v-pre>control-plane</code>，而 <code v-pre>k3s-agent</code> 对应着 <code v-pre>node</code> 节点。</p>
<p>可以看到 <code v-pre>k3s</code> 中使用的默认存储是 <code v-pre>SQLite</code>(自带)，且默认的网络使用的是 <code v-pre>Flannel</code>(自带)。当服务端和客户端都启动之后，通过 <code v-pre>Tunnel-Proxy</code> 这个组件进行通信，通过这个通道去管理网络流量。在 <code v-pre>agent</code> 节点中，通过 <code v-pre>kubelet</code> 操作 <code v-pre>contaninerd</code> 来创建对应 <code v-pre>Pod</code>。</p>
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
<p><strong>单节点 <code v-pre>K3s server</code> 的架构：</strong></p>
<p><img src="http://sm.nsddd.top/sm1660616402558126.png" alt="img"></p>
<p><strong>高可用架构：</strong></p>
<p>虽然单节点 k3s 集群可以满足各种用例，但对于 Kubernetes control-plane 的正常运行至关重要的环境，您可以在高可用配置中运行 K3s。一个高可用 K3s 集群由以下几个部分组成：</p>
<ul>
<li><strong><code v-pre>K3s server</code> 节点</strong> ：两个或更多的<code v-pre>server</code>节点将为 Kubernetes API 提供服务并运行其他 control-plane 服务</li>
<li><strong>外部数据库</strong> ：与单节点 k3s 设置中使用的嵌入式 <code v-pre>SQLite</code> 数据存储相反，高可用 K3s 需要挂载一个 <code v-pre>external database</code> 外部数据库作为数据存储的媒介。</li>
</ul>
<p><strong>K3s高可用架构（非嵌入式架构图）：</strong></p>
<p><img src="http://sm.nsddd.top/sm1660616476551520.png" alt="img"></p>
<p><strong>高可用架构（嵌入式架构）：</strong></p>
<blockquote>
<p>注意：高可用结构同样可以使用<strong>嵌入式数据库</strong></p>
<p>⚠️ 区别：</p>
<p><strong>嵌入数据库是指数据在内存中数据库，英文称为–embedded</strong>，又称in-memory embedded database，如H2, HSQL and Derby databases。</p>
<p><strong>非嵌入式数据库是指数据在磁盘中的数据库</strong>，如MariaDB, MySQL and Oracle。</p>
</blockquote>
<p><img src="http://sm.nsddd.top/smimage-20221117173105788.png" alt="image-20221117173105788"></p>
<p><strong>固定  <code v-pre>agent</code> 节点的注册地址：</strong></p>
<p>在高可用   <code v-pre>K3s server</code>  配置中，每个节点还必须使用固定的注册地址向 Kubernetes API 注册，注册后， <code v-pre>agent</code> 节点直接与其中一个  <code v-pre>server</code> 节点建立连接：</p>
<img src="http://sm.nsddd.top/sm1660616545857393.svg" alt="k3s-production-setup" style="zoom: 25%;" />
<p><strong>注册  <code v-pre>agent</code> 节点：</strong></p>
<p><code v-pre>agent</code> 节点用<code v-pre>k3s agent</code>进程发起的 websocket 连接注册，连接由作为代理进程一部分运行的客户端负载均衡器维护。</p>
<p><code v-pre>agent</code> 将使用节点集群 <code v-pre>secret</code> 以及随机生成的节点密码向   <code v-pre>K3s server</code>  注册，密码存储在 <code v-pre>/etc/rancher/node/password</code>路径下。 <code v-pre>K3s server</code> 将把各个节点的密码存储为 <code v-pre>Kubernetes secrets</code>，随后的任何尝试都必须使用相同的密码。节点密码秘密存储在<code v-pre>kube-system</code>命名空间中，名称使用模板<code v-pre>&lt;host&gt;.node-password.k3s</code>。</p>
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
<h2 id="新版本默认支持-etcd" tabindex="-1"><a class="header-anchor" href="#新版本默认支持-etcd" aria-hidden="true">#</a> 新版本默认支持 etcd</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>从 <code v-pre>v1.19.5+k3s1</code> 版本开始，K3s 已添加了对嵌入式 etcd 的完全支持。从 v1.19.1 到 v1.19.4 版本只提供了对嵌入式 etcd 的实验性支持。在 K3s v1.19.1 版本中，嵌入式 etcd 取代了实验性的 Dqlite。这是一个突破性的变化。请注意，不支持从实验性 Dqlite 升级到嵌入式 etcd。如果你尝试升级，升级将不会成功，并且数据将会丢失。</p>
<p>嵌入式 etcd (HA) 在速度较慢的磁盘上可能会出现性能问题，例如使用 SD 卡运行的 Raspberry Pi。</p>
<p>⚠️ 注意，如果你使用 docker 作为runtime，请小心 docker 是不认识 <code v-pre>+</code> ，如果你希望的到指定版本，请使用 ： <code v-pre>v1.19.5-k3s1</code></p>
</div>
<h2 id="在线脚本安装k3s" tabindex="-1"><a class="header-anchor" href="#在线脚本安装k3s" aria-hidden="true">#</a> 在线脚本安装k3s</h2>
<p><strong>安装之前请保证 k3s 的目录干净：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/rancher /var/lib/rancher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">启动k3s有多快？</p>
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
<div class="custom-container danger"><p class="custom-container-title">相比较二进制，推荐脚本安装</p>
<p>虽然可以通过下载二进制文件进行服务端和工作节点的运行(<code v-pre>./k3s server</code>)，但是一旦我们退出进程，之前创建的节点也就立即销毁了，所以还是建议使用脚本进行安装。</p>
<p>⚠️ 多说几句：之前不是很理解，xian'z</p>
</div>
<h2 id="在线安装的解析" tabindex="-1"><a class="header-anchor" href="#在线安装的解析" aria-hidden="true">#</a> 在线安装的解析</h2>
<h3 id="安装内容" tabindex="-1"><a class="header-anchor" href="#安装内容" aria-hidden="true">#</a> 安装内容</h3>
<ul>
<li><code v-pre>kubectl</code>、<code v-pre>crictl</code>、<code v-pre>ctr</code></li>
<li><code v-pre>k3s-killall.sh</code>、<code v-pre>k3s-uninstall.sh</code></li>
</ul>
<h3 id="执行操作" tabindex="-1"><a class="header-anchor" href="#执行操作" aria-hidden="true">#</a> 执行操作</h3>
<ul>
<li>将 <code v-pre>kubeconfig</code> 文件写入到 <code v-pre>/etc/rancher/k3s/k3s.yaml</code> 里面</li>
<li>由 <code v-pre>K3s</code> 安装的 <code v-pre>kubectl</code> 工具将自动使用该文件的配置来运行</li>
<li>其他机器可以通过复制这个配置文件并修改 <code v-pre>server</code> 地址来操作 <code v-pre>K3s</code> 集群</li>
</ul>
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
<h3 id="docker-私有镜像仓库方式" tabindex="-1"><a class="header-anchor" href="#docker-私有镜像仓库方式" aria-hidden="true">#</a> Docker + 私有镜像仓库方式</h3>
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
<h2 id="为kubelet-设置别名" tabindex="-1"><a class="header-anchor" href="#为kubelet-设置别名" aria-hidden="true">#</a> 为kubelet 设置别名</h2>
<p><code v-pre>k3s</code> 安装之后内置了一个 <code v-pre>kubectl</code> 的子命令，我们通过执行 <code v-pre>k3s kubectl</code> 命令来调用它，其功能和使用方式都和 <code v-pre>k8s</code> 的 <code v-pre>kubectl</code> 命令是一致。为了我们更加方便的使用，可以设置一个 <code v-pre>alias</code> 别名或者创建一个软连接达到命令的无缝使用。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建alias别名</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">kubectl</span><span class="token operator">=</span><span class="token string">'k3s kubectl'</span>

<span class="token comment"># 创建软连接</span>
<span class="token function">ln</span> <span class="token parameter variable">-sf</span> /usr/bin/kubectl /usr/local/bin/k3s

<span class="token comment"># 配置kubectl命令补全</span>
<span class="token builtin class-name">source</span> <span class="token operator">&lt;</span><span class="token punctuation">(</span>kubectl completion <span class="token function">bash</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成之后，就可以使用 <code v-pre>kubectl</code> 来操作集群机器了。通过运行如下命令，可以查看 <code v-pre>kube-system</code> 名称空间中运行的 <code v-pre>pod</code> 列表。我们发现并没有运行 <code v-pre>apiserver</code>、<code v-pre>scheduler</code>、<code v-pre>kube-proxy</code> 以及 <code v-pre>flannel</code> 等组件，因为这些都已经内嵌到了 <code v-pre>k3s</code> 进程中了。另外 <code v-pre>k3s</code> 已经给我们默认部署运行了 <code v-pre>traefik ingress</code>、<code v-pre>metrics-server</code> 等服务，不需要再额外安装了。</p>
<div class="custom-container tip"><p class="custom-container-title">一个很不成熟的想法</p>
<p>或许你也可以将 docker 作为 CRI ， 我不建议那么做，或许有一个折中的方法（也是设置别名）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建alias别名</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">docker</span><span class="token operator">=</span><span class="token string">'k3s crictl'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div>
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
<h2 id="cri-cni-csi" tabindex="-1"><a class="header-anchor" href="#cri-cni-csi" aria-hidden="true">#</a> CRI CNI  CSI</h2>
<p><strong>网络</strong>：</p>
<ul>
<li>因为 <code v-pre>k3s</code> 已经内置了 <code v-pre>Traefik</code> 组件，不需要再单独安装 <code v-pre>ingress controller</code> 了，直接创建 <code v-pre>Ingress</code> 即可。其中 <code v-pre>192.168.xxx.xxx</code> 为 <code v-pre>master</code> 节点的 <code v-pre>IP</code>，由于我们没有 <code v-pre>DNS</code> 解析，因此可以通过配置 <code v-pre>/etc/hosts</code> 文件进行静态配置，之后就可以通过域名来访问我们的服务了。</li>
</ul>
<p><strong>网络：</strong></p>
<ul>
<li>因为 <code v-pre>k3s</code> 已经内置了 <code v-pre>Flannel</code> 网络插件，默认使用 <code v-pre>VXLAN</code> 后端，默认 <code v-pre>IP</code> 段为 <code v-pre>10.42.0.0/16</code>。内置的 <code v-pre>Flannel</code> 除了 <code v-pre>VXLAN</code> 还支持 <code v-pre>ipsec</code>、<code v-pre>host-gw</code> 以及 <code v-pre>wireguard</code>。当然除了默认的 <code v-pre>Flannel</code>，<code v-pre>k3s</code> 还支持其他 <code v-pre>CNI</code>，如 <code v-pre>Canal</code>、<code v-pre>Calico</code> 等。</li>
</ul>
<p><strong>存储：</strong></p>
<ul>
<li><code v-pre>k3s</code> 删除了 <code v-pre>k8s</code> 内置 <code v-pre>cloud provider</code> 以及 <code v-pre>storage</code> 插件，内置了 <code v-pre>Local Path Provider</code> 来提供存储。而内置 <code v-pre>local path</code> 存储，只能单机使用，不支持跨主机使用，也不支持存储的高可用。可以通过使用外部的存储插件解决 k3s 存储问题，比如 <code v-pre>Longhorn</code> 云原生分布式块存储系统。</li>
</ul>
<h2 id="嵌入式数据库高可用" tabindex="-1"><a class="header-anchor" href="#嵌入式数据库高可用" aria-hidden="true">#</a> 嵌入式数据库高可用</h2>
<blockquote>
<p>在 K3s v1.19.1 中，嵌入式 etcd 取代了实验性的 <code v-pre>Dqlite</code>。这是一个突破性的变化。请注意，不支持从实验性 Dqlite 升级到嵌入式 etcd。如果你尝试升级，升级将不会成功，并且数据将会丢失。</p>
</blockquote>
<p>etcd 使用的共识算法是 <code v-pre>raft</code>，HA模式下保证三个node开始~</p>
<p>首先，启动一个带有 <code v-pre>cluster-init</code> 标志的 Server 节点来启用集群和一个令牌，该令牌将作为共享 secret，用于将其他服务器加入集群。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>SECRET <span class="token function">sh</span> <span class="token parameter variable">-s</span> - server --cluster-init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>启动第一台服务器后，使用共享 secret 将第二台和第三台服务器加入集群：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>SECRET <span class="token function">sh</span> <span class="token parameter variable">-s</span> - server <span class="token parameter variable">--server</span> https://<span class="token operator">&lt;</span>ip or <span class="token function">hostname</span> of server<span class="token operator"><span class="token file-descriptor important">1</span>></span>:6443
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="ha-部署实验" tabindex="-1"><a class="header-anchor" href="#ha-部署实验" aria-hidden="true">#</a> HA 部署实验</h2>
<ul>
<li><code v-pre>192.168.71.130</code>  server node</li>
<li><code v-pre>192.168.71.131</code>   agent node</li>
<li><code v-pre>192.168.71.132</code>   agent node</li>
</ul>
<p><strong>环境：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces<span class="token comment"># uname -a</span>
Linux cubmaster01 <span class="token number">5.4</span>.0-132-generic <span class="token comment">#148-Ubuntu SMP Mon Oct 17 16:02:06 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux</span>

root@etcnode01:/current<span class="token comment"># uname -a</span>
Linux etcnode01 <span class="token number">5.4</span>.0-132-generic <span class="token comment">#148-Ubuntu SMP Mon Oct 17 16:02:06 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux</span>

root@cubnode02:/tmp<span class="token comment"># uname -a</span>
Linux cubnode02 <span class="token number">5.4</span>.0-132-generic <span class="token comment">#148-Ubuntu SMP Mon Oct 17 16:02:06 UTC 2022 x86_64 x86_64 x86_64 GNU/Linux</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>master节点(192.168.71.130)：</strong></p>
<blockquote>
<p>如果网络原因，可以直接复制脚本在本地 <code v-pre>install.sh</code> 文件，然后运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 替换文件中的 https://github.com --> https://ghproxy.com/https://github.com</span>
<span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token assign-left variable">K3S_NODE_NAME</span><span class="token operator">=</span>cubmaster01     <span class="token assign-left variable">K3S_KUBECONFIG_OUTPUT</span><span class="token operator">=</span>/home/escape/.kube/config     <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--docker"</span> <span class="token operator">|</span> <span class="token function">sh</span> install.sh 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 指定了 kubeconfig 的位置</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io  <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token assign-left variable">K3S_NODE_NAME</span><span class="token operator">=</span>cubmaster01 <span class="token punctuation">\</span>
    <span class="token assign-left variable">K3S_KUBECONFIG_OUTPUT</span><span class="token operator">=</span>/home/escape/.kube/config <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--docker"</span> <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>server 详细安装解释</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查找stable分支版本信息</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Finding release <span class="token keyword">for</span> channel stable
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Using v1.23.6+k3s1 as release

<span class="token comment"># 获取国内镜像版本地址</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Downloading <span class="token builtin class-name">hash</span> https://rancher-mirror.rancher.cn/k3s/v1.23.6-k3s1/sha256sum-amd64.txt
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Downloading binary https://rancher-mirror.rancher.cn/k3s/v1.23.6-k3s1/k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Verifying binary download

<span class="token comment"># 安装k3s二进制工具并链接相关工具(内置)</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Installing k3s to /usr/local/bin/k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping installation of SELinux RPM
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating /usr/local/bin/kubectl symlink to k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating /usr/local/bin/crictl symlink to k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping /usr/local/bin/ctr symlink to k3s, <span class="token builtin class-name">command</span> exists <span class="token keyword">in</span> <span class="token environment constant">PATH</span> at /usr/bin/ctr

<span class="token comment"># 安装清除和卸载k3s生成的配置和工具</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating <span class="token function">killall</span> script /usr/local/bin/k3s-killall.sh
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating uninstall script /usr/local/bin/k3s-uninstall.sh

<span class="token comment"># 常见了两个systemd的配置</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  env: Creating environment <span class="token function">file</span> /etc/systemd/system/k3s.service.env
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Creating <span class="token function">service</span> <span class="token function">file</span> /etc/systemd/system/k3s.service
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Enabling k3s unit
Created symlink /etc/systemd/system/multi-user.target.wants/k3s.service → /etc/systemd/system/k3s.service.

<span class="token comment"># 启动k3s服务</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Starting k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><strong>node1节点(192.168.71.131)：</strong></p>
<ul>
<li><a href="https://docs.rancher.cn/docs/k3s/architecture/_index/#%E6%B3%A8%E5%86%8C-agent-%E8%8A%82%E7%82%B9" target="_blank" rel="noopener noreferrer">注册 node 节点<ExternalLinkIcon/></a></li>
</ul>
<blockquote>
<p><strong>查看server的token：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># mynodetoken</span>
<span class="token function">sudo</span> <span class="token function">cat</span> /var/lib/rancher/k3s/server/token
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>本地加速：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token assign-left variable">K3S_NODE_NAME</span><span class="token operator">=</span>cubnode01     <span class="token assign-left variable">K3S_KUBECONFIG_OUTPUT</span><span class="token operator">=</span>/home/escape/.kube/config     <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span>https://192.168.71.130:6443     <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>K100be446b6ae6fb8f9a551061516fcc2dac8196de80e747026626b9baab34d57be::server:6cf0d1c8342f340cf5e8344e19493cb7  <span class="token function">sh</span> install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 建议使用这个安装命令(国内化了)</span>
<span class="token comment"># K3S_URL: 会使K3s以worker模式运行</span>
<span class="token comment"># K3S_TOKEN: 使用的值存储在你的服务器节点上</span>
<span class="token comment"># K3S_NODE_NAME: 为每个节点提供一个有效且唯一的主机名</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token assign-left variable">K3S_NODE_NAME</span><span class="token operator">=</span>cubnode01 <span class="token punctuation">\</span>
    <span class="token assign-left variable">K3S_KUBECONFIG_OUTPUT</span><span class="token operator">=</span>/home/escape/.kube/config <span class="token punctuation">\</span>
    <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span>https://192.168.71.130:6443 <span class="token punctuation">\</span>
    <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>mynodetoken <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>agent 节点安装详细说明</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查找stable分支版本信息</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Finding release <span class="token keyword">for</span> channel stable
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Using v1.23.6+k3s1 as release

<span class="token comment"># 获取国内镜像版本地址</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Downloading <span class="token builtin class-name">hash</span> https://rancher-mirror.rancher.cn/k3s/v1.23.6-k3s1/sha256sum-amd64.txt
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Downloading binary https://rancher-mirror.rancher.cn/k3s/v1.23.6-k3s1/k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Verifying binary download

<span class="token comment"># 安装k3s二进制工具并链接相关工具(内置)</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Installing k3s to /usr/local/bin/k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating /usr/local/bin/kubectl symlink to k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating /usr/local/bin/crictl symlink to k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping /usr/local/bin/ctr symlink to k3s

<span class="token comment"># 安装清除和卸载k3s生成的配置和工具</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating <span class="token function">killall</span> script /usr/local/bin/k3s-agent-killall.sh
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating uninstall script /usr/local/bin/k3s-agent-uninstall.sh

<span class="token comment"># 常见了两个systemd的配置</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  env: Creating environment <span class="token function">file</span> /etc/systemd/system/k3s-agent.service.env
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Creating <span class="token function">service</span> <span class="token function">file</span> /etc/systemd/system/k3s-agent.service
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Enabling k3s-agent unit
Created symlink /etc/systemd/system/multi-user.target.wants/k3s-agent.service → /etc/systemd/system/k3s-agent.service.

<span class="token comment"># 启动k3s服务</span>
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Starting k3s-agent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><strong>node2节点：</strong></p>
<blockquote>
<p>node1节点类似操作</p>
</blockquote>
<h2 id="卸载k3s" tabindex="-1"><a class="header-anchor" href="#卸载k3s" aria-hidden="true">#</a> 卸载k3s</h2>
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
<p><strong>优秀的你肯定会将他清除干净的：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 清除垃圾文件</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/rancher /var/lib/rancher
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="针对-docker-cri" tabindex="-1"><a class="header-anchor" href="#针对-docker-cri" aria-hidden="true">#</a> 针对 docker CRI</h3>
<details class="custom-container details"><summary>括docker等信息一并清理</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 包括docker等信息一并清理</span>
<span class="token comment">#!/bin/bash</span>

<span class="token assign-left variable">KUBE_SVC</span><span class="token operator">=</span><span class="token string">'
kubelet
kube-scheduler
kube-proxy
kube-controller-manager
kube-apiserver
'</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">kube_svc</span> <span class="token keyword">in</span> <span class="token variable">${KUBE_SVC}</span><span class="token punctuation">;</span>
<span class="token keyword">do</span>
  <span class="token comment"># 停止服务</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable"><span class="token variable">`</span>systemctl is-active $<span class="token punctuation">{</span>kube_svc<span class="token punctuation">}</span><span class="token variable">`</span></span> <span class="token operator">==</span> <span class="token string">'active'</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    systemctl stop <span class="token variable">${kube_svc}</span>
  <span class="token keyword">fi</span>
  <span class="token comment"># 禁止服务开机启动</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable"><span class="token variable">`</span>systemctl is-enabled $<span class="token punctuation">{</span>kube_svc<span class="token punctuation">}</span><span class="token variable">`</span></span> <span class="token operator">==</span> <span class="token string">'enabled'</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    systemctl disable <span class="token variable">${kube_svc}</span>
  <span class="token keyword">fi</span>
<span class="token keyword">done</span>

<span class="token comment"># 停止所有容器</span>
<span class="token function">docker</span> stop <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-aq</span><span class="token variable">)</span></span>

<span class="token comment"># 删除所有容器</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-qa</span><span class="token variable">)</span></span>

<span class="token comment"># 删除所有容器卷</span>
<span class="token function">docker</span> volume <span class="token function">rm</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> volume <span class="token function">ls</span> <span class="token parameter variable">-q</span><span class="token variable">)</span></span>

<span class="token comment"># 卸载mount目录</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">mount</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">mount</span> <span class="token operator">|</span> <span class="token function">grep</span> tmpfs <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">'/var/lib/kubelet'</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{ print $3 }'</span><span class="token variable">)</span></span> /var/lib/kubelet /var/lib/rancher<span class="token punctuation">;</span>
<span class="token keyword">do</span>
  <span class="token function">umount</span> <span class="token variable">$mount</span><span class="token punctuation">;</span>
<span class="token keyword">done</span>

<span class="token comment"># 备份目录</span>
<span class="token function">mv</span> /etc/kubernetes /etc/kubernetes-bak-<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">"%Y%m%d%H%M"</span><span class="token variable">)</span></span>
<span class="token function">mv</span> /var/lib/etcd /var/lib/etcd-bak-<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">"%Y%m%d%H%M"</span><span class="token variable">)</span></span>
<span class="token function">mv</span> /var/lib/rancher /var/lib/rancher-bak-<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">"%Y%m%d%H%M"</span><span class="token variable">)</span></span>
<span class="token function">mv</span> /opt/rke /opt/rke-bak-<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">"%Y%m%d%H%M"</span><span class="token variable">)</span></span>

<span class="token comment"># 删除残留路径</span>
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /etc/ceph <span class="token punctuation">\</span>
    /etc/cni <span class="token punctuation">\</span>
    /opt/cni <span class="token punctuation">\</span>
    /run/secrets/kubernetes.io <span class="token punctuation">\</span>
    /run/calico <span class="token punctuation">\</span>
    /run/flannel <span class="token punctuation">\</span>
    /var/lib/calico <span class="token punctuation">\</span>
    /var/lib/cni <span class="token punctuation">\</span>
    /var/lib/kubelet <span class="token punctuation">\</span>
    /var/log/containers <span class="token punctuation">\</span>
    /var/log/kube-audit <span class="token punctuation">\</span>
    /var/log/pods <span class="token punctuation">\</span>
    /var/run/calico <span class="token punctuation">\</span>
    /usr/libexec/kubernetes

<span class="token comment"># 清理网络接口</span>
<span class="token assign-left variable">no_del_net_inter</span><span class="token operator">=</span><span class="token string">'
lo
docker0
eth
ens
bond
'</span>

<span class="token assign-left variable">network_interface</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">ls</span> /sys/class/net<span class="token variable">`</span></span>

<span class="token keyword">for</span> <span class="token for-or-select variable">net_inter</span> <span class="token keyword">in</span> <span class="token variable">$network_interface</span><span class="token punctuation">;</span>
<span class="token keyword">do</span>
  <span class="token keyword">if</span> <span class="token operator">!</span> <span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${no_del_net_inter}</span>"</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-qE</span> <span class="token variable">${net_inter<span class="token operator">:</span>0<span class="token operator">:</span>3}</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">ip</span> <span class="token function">link</span> delete <span class="token variable">$net_inter</span>
  <span class="token keyword">fi</span>
<span class="token keyword">done</span>

<span class="token comment"># 清理残留进程</span>
<span class="token assign-left variable">port_list</span><span class="token operator">=</span><span class="token string">'
80
443
6443
2376
2379
2380
8472
9099
10250
10254
'</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">port</span> <span class="token keyword">in</span> <span class="token variable">$port_list</span><span class="token punctuation">;</span>
<span class="token keyword">do</span>
  <span class="token assign-left variable">pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">netstat</span> <span class="token parameter variable">-atlnup</span> <span class="token operator">|</span> <span class="token function">grep</span> $port <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $7}'</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token parameter variable">-F</span> <span class="token string">'/'</span> <span class="token string">'{print $1}'</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> - <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-rnk2</span> <span class="token operator">|</span> <span class="token function">uniq</span><span class="token variable">`</span></span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token variable">$pid</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable">$pid</span>
  <span class="token keyword">fi</span>
<span class="token keyword">done</span>

<span class="token assign-left variable">kube_pid</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">grep</span> kube <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $2}'</span><span class="token variable">`</span></span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token variable">$kube_pid</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable">$kube_pid</span>
<span class="token keyword">fi</span>

<span class="token comment"># 清理Iptables表</span>
<span class="token comment">## 注意：如果节点Iptables有特殊配置，以下命令请谨慎操作</span>
<span class="token function">sudo</span> iptables <span class="token parameter variable">--flush</span>
<span class="token function">sudo</span> iptables <span class="token parameter variable">--flush</span> <span class="token parameter variable">--table</span> nat
<span class="token function">sudo</span> iptables <span class="token parameter variable">--flush</span> <span class="token parameter variable">--table</span> filter
<span class="token function">sudo</span> iptables <span class="token parameter variable">--table</span> nat --delete-chain
<span class="token function">sudo</span> iptables <span class="token parameter variable">--table</span> filter --delete-chain
systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h2 id="k3s-的一些重要目录" tabindex="-1"><a class="header-anchor" href="#k3s-的一些重要目录" aria-hidden="true">#</a> k3s 的一些重要目录</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>您可以将主要的 k3s 二进制文件放在任何您想要的地方。它会将内容写入 <code v-pre>/var/lib/rancher/k3s</code> 和 <code v-pre>/etc/rancher</code>，以及 <code v-pre>containerd</code> 和 <code v-pre>kubelet</code> 用于非持久文件的正常位置 <code v-pre>/var/run</code> 下。</p>
<p>可以在 <code v-pre>/var/lib/rancher/k3s</code> 路径中找到 <code v-pre>db</code> 目录（SQLite）。</p>
</div>
<p><code v-pre>/usr/local/bin</code> 目录中有 k3s 的一些关键目录：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@etcnode01:/usr/local/bin<span class="token comment"># ls -al</span>
total <span class="token number">66164</span>
drwxr-xr-x  <span class="token number">2</span> root root     <span class="token number">4096</span> Nov <span class="token number">25</span> 04:31 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">10</span> root root     <span class="token number">4096</span> Aug <span class="token number">31</span> 06:52 <span class="token punctuation">..</span>
lrwxrwxrwx  <span class="token number">1</span> root root        <span class="token number">3</span> Nov <span class="token number">25</span> 04:31 crictl -<span class="token operator">></span> k3s
-rwxr-xr-x  <span class="token number">1</span> root root <span class="token number">67735552</span> Nov <span class="token number">25</span> 04:31 k3s
-rwxr-xr-x  <span class="token number">1</span> root root     <span class="token number">1433</span> Nov <span class="token number">25</span> 04:31 k3s-agent-uninstall.sh
-rwxr-xr-x  <span class="token number">1</span> root root     <span class="token number">2026</span> Nov <span class="token number">25</span> 04:31 k3s-killall.sh
lrwxrwxrwx  <span class="token number">1</span> root root        <span class="token number">3</span> Nov <span class="token number">25</span> 04:31 kubectl -<span class="token operator">></span> k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Linux 系统下提供 ln 指令来进行文件链接</p>
<p>我们可以看到这里面有很多的连接文件，同样的，其实在 k3s 的 rootfs bin目录下也是这样的</p>
<p>::: detatils 软连接 &amp; 硬连接
<code v-pre>ln</code> 指令默认创建的是硬链接，如果加入了<code v-pre>-s</code>参数，则会生成一个软链接。</p>
<p><strong>硬连接：</strong></p>
<p>在 Linux 中，多个文件名指向同一索引节点是存在的，所以硬连接指通过索引节点来进行的连接，即每一个硬链接都是一个指向对应区域的文件。</p>
<p>硬链接的作用是允许一个文件<strong>拥有多个有效路径名</strong>，这样用户就可以建立硬链接到重要文件,以防止“误删”的功能。</p>
<p>只删除一个连接并不影响索引节点本身和其它的连接，只有当最后一个链接被删除后，文件的数据块及目录的连接才会被释放，也就是说，文件才会被真正删除。</p>
<p>⚠️ 注意这并不是 <code v-pre>cp</code> ，这不是重复文件，注意！！！它们只是指向同一个文件的索引。</p>
<p><strong>软连接：</strong></p>
<p><img src="http://sm.nsddd.top/smimage-20221125211941734.png" alt="image-20221125211941734"></p>
<p>软链接又叫符号链接，这个文件包含了另一个文件的路径名，例如在上图中，<code v-pre>foo.txt</code> 就是 <code v-pre>bar.txt</code> 的软连接，<code v-pre>bar.txt</code> 是实际的文件，<code v-pre>foo.txt</code>包含的是对于 <code v-pre>bar.txt</code> 的 inode 的记录。</p>
<p>软连接可以是任意文件或目录，可以链接不同文件系统的文件，在对符号文件进行读或写操作的时候，系统会自动把该操作转换为对源文件的操作，但删除链接文件时，系统仅仅删除链接文件，而不删除源文件本身，这一点类似于 Windows 操作系统下的快捷方式。</p>
<blockquote>
<p>软链接以 <code v-pre>l</code> 开头：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>lrwxrwxrwx  <span class="token number">1</span> root root    <span class="token number">1</span> Nov <span class="token number">25</span> <span class="token number">13</span>:21 x1 -<span class="token operator">></span> x
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<p>:::</p>
<h3 id="var-lib-rancher-k3s" tabindex="-1"><a class="header-anchor" href="#var-lib-rancher-k3s" aria-hidden="true">#</a> <code v-pre>/var/lib/rancher/k3s</code></h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[root@VM-4-6-centos k3s]# pwd;ls
/var/lib/rancher/k3s
agent  data  server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">目录解释</p>
<p><strong>agent中：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/var/lib/rancher/k3s/agent<span class="token comment"># ls</span>
client-ca.crt              client-kube-proxy.key     pod-manifests
client-k3s-controller.crt  containerd                server-ca.crt
client-k3s-controller.key  etc                       serving-kubelet.crt
client-kubelet.crt         k3scontroller.kubeconfig  serving-kubelet.key
client-kubelet.key         kubelet.kubeconfig
client-kube-proxy.crt      kubeproxy.kubeconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>data中：</strong></p>
<p>运行的工作目录：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/var/lib/rancher/k3s/data<span class="token comment"># ls</span>
7c994f47fd344e1637da337b92c51433c255b387d207b30b3e0262779457afe4
current
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>server中：</strong></p>
<ul>
<li>
<p><code v-pre>manifests</code>：位于目录路径<code v-pre>/var/lib/rancher/k3s/server/manifests</code> 的清单在构建时被捆绑到 K3s 二进制文件中，将由<a href="https://github.com/rancher/helm-controller#helm-controller" target="_blank" rel="noopener noreferrer">rancher/helm-controller<ExternalLinkIcon/></a>在运行时安装。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/var/lib/rancher/k3s/server<span class="token comment"># cd manifests/;ls;pwd</span>
ccm.yaml      local-storage.yaml  rolebindings.yaml
coredns.yaml  metrics-server      traefik.yaml
/var/lib/rancher/k3s/server/manifests
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>tls</code>：tls证书，k3s证书默认是一年</p>
</li>
<li>
<p><code v-pre>db</code>：数据库</p>
</li>
<li>
<p><code v-pre>token、node-token、agent-token</code>：token</p>
</li>
<li>
<p>主节点的密码存储：<code v-pre>/var/lib/rancher/k3s/server/cred/node-passwd</code></p>
</li>
</ul>
</div>
<h3 id="etc-rancher" tabindex="-1"><a class="header-anchor" href="#etc-rancher" aria-hidden="true">#</a> <code v-pre>/etc/rancher</code></h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[root@VM-4-6-centos rancher]# pwd;ls
/etc/rancher
k3s  node
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">目录解释</p>
<p><strong>k3s中：</strong></p>
<ul>
<li>
<p>k3s.yaml：k3s 集群的一些元数据</p>
</li>
<li>
<p>registries.yaml：注册表一些信息，镜像加速</p>
</li>
</ul>
<p><strong>node：</strong></p>
<ul>
<li><code v-pre>password</code>：Agent 将使用节点集群 secret 以及随机生成的节点密码向 k3s server 注册存储密码路径</li>
</ul>
<blockquote>
<p>K3s server 将把各个节点的密码存储为 Kubernetes secrets，随后的任何尝试都必须使用相同的密码。节点密码秘密存储在<code v-pre>kube-system</code>命名空间中，名称使用模板<code v-pre>&lt;host&gt;.node-password.k3s</code></p>
</blockquote>
</div>
<h3 id="var-run" tabindex="-1"><a class="header-anchor" href="#var-run" aria-hidden="true">#</a> <code v-pre>/var/run</code></h3>
<ul>
<li>
<p><code v-pre>k3s</code>：CRI（containerd or docker)</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@cubmaster01:/var/run/k3s/containerd# ls
containerd.sock            io.containerd.runtime.v1.linux
containerd.sock.ttrpc      io.containerd.runtime.v2.task
io.containerd.grpc.v1.cri
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>containerd</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/var/run/containerd<span class="token comment"># ls</span>
containerd.sock        io.containerd.runtime.v1.linux  runc
containerd.sock.ttrpc  io.containerd.runtime.v2.task   s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<h2 id="镜像加速" tabindex="-1"><a class="header-anchor" href="#镜像加速" aria-hidden="true">#</a> 镜像加速</h2>
<p>镜像加速配置后，重启服务</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/rancher/k3s/registries.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  "docker.io":
    endpoint:
      - "https://fogjl973.mirror.aliyuncs.com"
      - "https://registry-1.docker.io"
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启k3s使配置生效</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 重启服务</span>
<span class="token function">sudo</span> systemctl restart k3s

<span class="token comment"># 是否生效</span>
<span class="token function">sudo</span> crictl info <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-A</span> <span class="token number">2</span> <span class="token string">"endpoint"</span>

crictl info<span class="token operator">|</span><span class="token function">grep</span>  <span class="token parameter variable">-A</span> <span class="token number">5</span> registry
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221031112848849.png" alt="image-20221031112848849"></p>
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
<li><code v-pre>ctr</code> ： 单纯的容器管理</li>
<li><code v-pre>crictl</code>：从 kubernetes 视角触发，对 POD，容器进行管理。</li>
</ul>
<p><strong>k3s 内修改 containerd 的配置步骤：</strong></p>
<ul>
<li>复制 <code v-pre>/var/lib/rancher/k3s/agent/containerd/config.toml</code> 为同目录下的新模板</li>
<li>修改 <code v-pre>config.toml.tmpl</code></li>
<li>重启 <code v-pre>k3s</code> （systemctl restart k3s) 或者 <code v-pre>k3s-agent</code>（systemctl restart k3s-agent）</li>
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
<p>首先你需要有一个单节点的 k3s 集群，本例使用 1 master 节点、1 worker 节点的 k3s 集群。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/.kube<span class="token comment"># kubectl get node</span>
NAME          STATUS   ROLES                  AGE    VERSION
cubnode01     Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>                 96m    v1.25.4+k3s1
cubmaster01   Ready    control-plane,master   142m   v1.25.4+k3s1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>验证集群：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/.kube<span class="token comment"># kubectl get deployment,svc</span>
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT<span class="token punctuation">(</span>S<span class="token punctuation">)</span>   AGE
service/kubernetes   ClusterIP   <span class="token number">10.43</span>.0.1    <span class="token operator">&lt;</span>none<span class="token operator">></span>        <span class="token number">443</span>/TCP   145m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>将单节点 K3s 集群转换为内置 etcd 高可用集群</strong></p>
<p>首先，先停止 k3s 服务：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/.kube<span class="token comment"># systemctl stop k3s</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过使用 <code v-pre>--cluster-init</code> 标志重新启动你的 <code v-pre>k3s server</code> 来将其转换为 etcd 集群</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/runtime<span class="token comment">#  curl -sfL https://get.k3s.io | sh -s - --cluster-init</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看 master 节点的角色，来确认是否转换成功：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/runtime<span class="token comment"># kubectl get nodes</span>
NAME          STATUS   ROLES                       AGE    VERSION
cubmaster01   Ready    control-plane,etcd,master   151m   v1.25.4+k3s1
cubnode01     Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>                      105m   v1.25.4+k3s1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面 ROLES 列可以看到，master 节点的角色增加了 etcd，证明已经通过内置 etcd 数据库重新启动了 k3s 集群。</p>
<p><strong>验证集群：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@cubmaster01:/workspces/runtime# kubectl get deployment,svc
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.43.0.1    &lt;none>        443/TCP   159m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>数据库文件：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@cubmaster01:/workspces/runtime# ls /var/lib/rancher/k3s/server/db/
etcd  state.db.migrated  state.db-shm  state.db-wal
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装脚本" tabindex="-1"><a class="header-anchor" href="#安装脚本" aria-hidden="true">#</a> 安装脚本</h2>
<details class="custom-container details"><summary>k3s 安装脚本</summary>
<p>https://get.k3s.io</p>
<p>Maybe you can try my plan, if you don't choose the domestic route, but you are affected by the firewall. Then you can use <code v-pre>https://ghproxy.com/{github-url}</code></p>
</details>
<details class="custom-container details"><summary>国内镜像加速~</summary>
<p>https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -sfL https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h3 id="理解安装的步骤" tabindex="-1"><a class="header-anchor" href="#理解安装的步骤" aria-hidden="true">#</a> 理解安装的步骤</h3>
<p><strong>先决条件：</strong></p>
<ul>
<li>选择上，两个节点不能有相同的主机名</li>
<li>不修改主机名可以通过添加随机后缀或指定主机名</li>
</ul>
<p><strong>硬件信息：</strong></p>
<ul>
<li>操作系统：可以在大多数现代 Linux 系统上运行（我希望可以有一个测试，我们不用再依赖于 kubernetes 的沉重标配了（不低于4 核）</li>
<li>磁盘设备：K3s 的性能取决于数据库的性能(建议使用 SSD 硬盘)</li>
<li>网络相关：K3s Server 节点的入站规则，所有出站流量都是允许的</li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:left">协议</th>
<th style="text-align:left">端口</th>
<th style="text-align:left">源</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">TCP</td>
<td style="text-align:left">6443</td>
<td style="text-align:left">K3s agent 节点</td>
<td style="text-align:left">Kubernetes API Server</td>
</tr>
<tr>
<td style="text-align:left">UDP</td>
<td style="text-align:left">8472</td>
<td style="text-align:left">K3s server 和 agent 节点</td>
<td style="text-align:left">仅对 Flannel VXLAN 需要</td>
</tr>
<tr>
<td style="text-align:left">TCP</td>
<td style="text-align:left">10250</td>
<td style="text-align:left">K3s server 和 agent 节点</td>
<td style="text-align:left">Kubelet metrics</td>
</tr>
<tr>
<td style="text-align:left">TCP</td>
<td style="text-align:left">2379-2380</td>
<td style="text-align:left">K3s server 节点</td>
<td style="text-align:left">只有嵌入式 etcd 高可用才需要</td>
</tr>
</tbody>
</table>
<p><strong>安装选项：</strong></p>
<ul>
<li><a href="https://docs.rancher.cn/docs/k3s/autok3s/_index/" target="_blank" rel="noopener noreferrer">官方安装参数文档<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kingsd041/k3s-tutorial/blob/main/03-%E5%AE%89%E8%A3%85-%E8%A6%81%E6%B1%82%E5%8F%8A%E9%80%89%E9%A1%B9/README.md" target="_blank" rel="noopener noreferrer">安装选项示例演示<ExternalLinkIcon/></a></li>
</ul>
<table>
<thead>
<tr>
<th style="text-align:left">Environment Variable</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>INSTALL_K3S_EXEC</code></td>
<td style="text-align:left">用于在服务中启动 <code v-pre>K3s</code> 的后续子命令</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>K3S_CONFIG_FILE</code></td>
<td style="text-align:left">指定配置文件的位置</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>K3S_TOKEN</code></td>
<td style="text-align:left">用于将 <code v-pre>server/agent</code> 加入集群的共享 <code v-pre>secret</code> 值</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>K3S_TOKEN_FILE</code></td>
<td style="text-align:left">用于将 <code v-pre>server/agent</code> 加入集群的共享 <code v-pre>secret</code> 文件</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>INSTALL_K3S_VERSION</code></td>
<td style="text-align:left">指定下载 <code v-pre>K3s</code> 的版本</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>K3S_TOKEN_FILE</code></td>
<td style="text-align:left">指定  <code v-pre>cluster-secret</code>/<code v-pre>token</code> 的文件目录</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>INSTALL_K3S_SKIP_START</code></td>
<td style="text-align:left">将不会启动 <code v-pre>K3s</code> 服务</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>INSTALL_K3S_SKIP_DOWNLOAD</code></td>
<td style="text-align:left">用于离线安装；设置之后不会下载远程工具</td>
</tr>
</tbody>
</table>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 其实就把对应参数加到systemd配置文件里面去了</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--docker"</span> <span class="token function">sh</span> -

<span class="token comment"># 自动化部署(不用获取token值了)</span>
<span class="token comment"># 主节点和工作节点使用我们指定的key来通信</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>rancher-k3s <span class="token function">sh</span> -
<span class="token function">sudo</span> <span class="token function">cat</span> /var/lib/rancher/k3s/server/token
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>其他说明</strong></p>
<ul>
<li>运行 <code v-pre>agent</code> 时还必须设置 <code v-pre>K3S_TOKEN</code></li>
<li>以 <code v-pre>K3S_</code> 开头的环境变量将被保留，供 <code v-pre>systemd/openrc</code> 使用</li>
<li>没有明确设置 <code v-pre>exec</code> 并设置 <code v-pre>K3S_URL</code> 的话会将命令默认为工作节点</li>
</ul>
<h3 id="标志和环境变量" tabindex="-1"><a class="header-anchor" href="#标志和环境变量" aria-hidden="true">#</a> 标志和环境变量</h3>
<p>在整个 k3s 文档学习中，会看到一些选项可以作为命令标志和环境变量传递进来，那该如何使用标志和环境变量呢？</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 使用标志</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">K3S_KUBECONFIG_MODE</span><span class="token operator">=</span><span class="token string">"644"</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> -
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> - --write-kubeconfig-mode <span class="token number">644</span>

<span class="token comment"># 环境变量</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--flannel-backend none"</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> -
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> <span class="token parameter variable">-s</span> - server --flannel-backend none
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="k3s-server-agent-常用配置" tabindex="-1"><a class="header-anchor" href="#k3s-server-agent-常用配置" aria-hidden="true">#</a> K3s Server/Agent - 常用配置</h3>
<details class="custom-container details"><summary>展开查看</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># write-kubeconfig</span>
<span class="token comment"># 将管理客户端的kubeconfig写入这个文件</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">K3S_KUBECONFIG_OUTPUT</span><span class="token operator">=</span>/root/.kube/config <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># 使用docker作为容器运行时</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--docker"</span> <span class="token function">sh</span> -

<span class="token comment"># 指定运行时工具</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--container-runtime-endpoint containerd"</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -


<span class="token comment"># 设置私有镜像仓库配置文件</span>
<span class="token comment"># 默认配置文件: /etc/rancher/k3s/registries.yaml</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--private-registry xxx"</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># 针对多网卡主机安装K3s集群</span>
<span class="token comment"># 默认多网卡会使用默认网关的那个卡</span>
route <span class="token parameter variable">-n</span>

<span class="token comment"># K3s server</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--node-ip=192.168.100.100"</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># K3s agent  K3S_URL=https:?</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span>https://192.168.71.130:6443 <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>xxx <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--node-ip=192.168.71.131"</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># --tls-san</span>
<span class="token comment"># 在TLS证书中添加其他主机名或IP作为主机备用名称</span>
<span class="token comment"># 即在公网环境下允许通过公网IP访问控制、操作远程集群</span>
<span class="token comment"># 或者部署多个Server并使用LB进行负责，就需要保留公网地址</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--tls-san 1.1.1.1"</span>  <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># 获取配置</span>
kubectl get secret k3s-serving <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-o</span> yaml

<span class="token comment"># 然后本机复制公网主节点对应的yaml文件即可本地操作了</span>
<span class="token function">scp</span> ci@1.1.1.1:/etc/rancher/k3s/k3s.yaml ~/.kube/config

<span class="token comment"># 修改启动的服务对应配置(调整节点的启动的最大Pod数量)</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--kubelet-arg=max-pods=200'</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># 修改启动的服务对应配置(使用ipvs作为服务调度工具)</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--kube-proxy-arg=proxy-mode=ipvs'</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># 修改启动的服务对应配置(调整服务启动的端口范围)</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--kube-apiserver-arg=service-node-port-range=40000-50000'</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># kubelet-arg     --kubelet-arg</span>
<span class="token comment"># kube-apiserver  --kube-apiserver-arg</span>
<span class="token comment"># kube-proxy-arg  --kube-proxy-arg</span>
<span class="token comment"># kube-proxy-arg  --kube-proxy-arg=proxy-mode=ipvs</span>
<span class="token comment"># --data-dir</span>
<span class="token comment"># 修改K3s数据存储目录</span>
$ <span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--data-dir=/opt/k3s-data'</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># 禁用组件</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--disable traefik'</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># 自己加自己需要的服务</span>
<span class="token function">ls</span> /var/lib/rancher/k3s/server/manifests
kubectl get pods <span class="token parameter variable">-A</span> <span class="token operator">|</span> <span class="token function">grep</span> traefik

<span class="token comment"># 添加label和taint标识</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--node-label foo=bar,hello=world \
        --node-taint key1=value1:NoExecute'</span>
    <span class="token function">sh</span> -

<span class="token comment"># 查看一下</span>
kubectl describe nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="k3s-server-agent-数据库选项" tabindex="-1"><a class="header-anchor" href="#k3s-server-agent-数据库选项" aria-hidden="true">#</a> K3s Server/Agent - 数据库选项</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 指定数据源名称</span>
<span class="token comment"># 标志位: --datastore-endpoint&amp;nbsp;value</span>
<span class="token comment"># 环境变量: K3S_DATASTORE_ENDPOINT</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--datastore-endpoint&amp;nbsp;etcd'</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -
    
 
<span class="token comment"># cron规范中的快照间隔时间</span>
<span class="token comment"># --etcd-snapshot-schedule-cron&amp;nbsp;value</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--etcd-snapshot-schedule-cron *&amp;nbsp;*/5&amp;nbsp;*&amp;nbsp;*&amp;nbsp;*'</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="k3s-安装事项-网络选项" tabindex="-1"><a class="header-anchor" href="#k3s-安装事项-网络选项" aria-hidden="true">#</a> K3s 安装事项 - 网络选项</h3>
<p>默认情况下，<code v-pre>K3s</code> 将以 <code v-pre>flannel</code> 作为 <code v-pre>CNI</code> 运行，使用 <code v-pre>VXLAN</code> 作为默认后端，<code v-pre>CNI</code> 和默认后端都可以通过参数修改。要启用加密，请使用下面的 <code v-pre>IPSec</code> 或 <code v-pre>WireGuard</code> 选项。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 默认安装K3s之后的网络配置</span>
<span class="token function">sudo</span> <span class="token function">cat</span> /var/lib/rancher/k3s/agent/etc/flannel/net-conf.json
<span class="token punctuation">{</span>
    <span class="token string">"Network"</span><span class="token builtin class-name">:</span> <span class="token string">"10.42.0.0/16"</span>,
    <span class="token string">"EnableIPv6"</span><span class="token builtin class-name">:</span> false,
    <span class="token string">"EnableIPv4"</span><span class="token builtin class-name">:</span> true,
    <span class="token string">"IPv6Network"</span><span class="token builtin class-name">:</span> <span class="token string">"::/0"</span>,
    <span class="token string">"Backend"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">"Type"</span><span class="token builtin class-name">:</span> <span class="token string">"vxlan"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><table>
<thead>
<tr>
<th style="text-align:left">CLI Flag 和 Value</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>--flannel-backend=vxlan</code></td>
<td style="text-align:left">使用 <code v-pre>VXLAN</code> 后端(默认)</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--flannel-backend=host-gw</code></td>
<td style="text-align:left">使用 <code v-pre>host-gw</code> 后端</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--flannel-backend=ipsec</code></td>
<td style="text-align:left">使用 <code v-pre>IPSEC</code> 后端；对网络流量进行加密</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--flannel-backend=wireguard</code></td>
<td style="text-align:left">使用 <code v-pre>WireGuard</code> 后端；对网络流量进行加密</td>
</tr>
</tbody>
</table>
<p><strong>配置 Flannel 选项</strong></p>
<p>这样，我就可以在安装 <code v-pre>K3s</code> 或者之后修改对应配置文件，来修改 <code v-pre>Flannel</code> 默认的后端网络配置选项(重启会覆盖不生效)了。下面，我们演示下，如何修改为 <code v-pre>host-gw</code> 模式。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 主节点</span>
<span class="token comment"># flannel-backend使用host-gw</span>
<span class="token comment"># 该模式会把对端主机的IP当做默认网管(多Server情况)</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--flannel-backend=host-gw'</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># 工作节点</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span>https://192.168.100.100:6443 <span class="token punctuation">\</span>
    <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>xxx <span class="token function">sh</span> -

<span class="token comment"># 默认的路由信息</span>
route <span class="token parameter variable">-n</span>
<span class="token number">0.0</span>.0.0         <span class="token number">172.16</span>.64.1     <span class="token number">0.0</span>.0.0         UG    <span class="token number">100</span>    <span class="token number">0</span>        <span class="token number">0</span> enp0s2
<span class="token number">10.42</span>.1.0       <span class="token number">172.16</span>.64.9     <span class="token number">255.255</span>.255.0   UG    <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> enp0s2

<span class="token comment"># 查看配置之后的网络配置</span>
<span class="token function">sudo</span> <span class="token function">cat</span> /var/lib/rancher/k3s/agent/etc/flannel/net-conf.json
<span class="token punctuation">{</span>
    <span class="token string">"Network"</span><span class="token builtin class-name">:</span> <span class="token string">"10.42.0.0/16"</span>,
    <span class="token string">"Backend"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">"Type"</span><span class="token builtin class-name">:</span> <span class="token string">"host-gw"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启用 Directrouting 特性</strong></p>
<p><strong>Flannel 自身的特性</strong>：当主机在同一子网时，启用 <code v-pre>direct routes</code>(如 <code v-pre>host-gw</code>)。<code v-pre>vxlan</code> 只用于将数据包封装到不同子网的主机上，同子网的主机之间使用  <code v-pre>host-gw</code>，默认值为 <code v-pre>false</code>。</p>
<p>要添加我们就不能修改其对应的网络配置文件，因为重新安装或者重启都会把这个配置冲掉(变成默认配置)，所以需要折中下。我们自建一个网络配置文件，然后在启动的时候执行从哪个配置文件里面加载对应配置。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># k3s的master和agent</span>
<span class="token function">sudo</span> <span class="token function">cat</span> /etc/flannel/net-conf.json
<span class="token punctuation">{</span>
    <span class="token string">"Network"</span><span class="token builtin class-name">:</span> <span class="token string">"10.42.0.0/16"</span>,
    <span class="token string">"Backend"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">"Type"</span><span class="token builtin class-name">:</span> <span class="token string">"vxlan"</span>,
        <span class="token string">"Directrouting"</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># k3s master</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--flannel-backend=host-gw'</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自定义 CNI</strong></p>
<p>使用  <code v-pre>--flannel-backend=none</code>(禁用) 运行 <code v-pre>K3s</code>，然后在安装你选择的 <code v-pre>CNI</code>。按照 Calico CNI 插件指南 来修改 <code v-pre>Calico</code> 的 <code v-pre>YAML</code> 配置文件，在 <code v-pre>container_settings</code> 部分中允许 <code v-pre>IP</code> 转发。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 加到Calico的YAML文件中</span>
<span class="token comment"># 允许IP转发(这个是K3s的一个限制；需要开启)</span>
<span class="token string">"container_settings"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">"allow_ip_forwarding"</span><span class="token builtin class-name">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

- name: CALICO_IPV4POOL_CIDR
  value: <span class="token string">"192.168.200.0/24"</span>

<span class="token comment"># 通过在主机上运行以下命令，确保设置已被应用(true)</span>
<span class="token function">sudo</span> <span class="token function">cat</span> /etc/cni/net.d/10-canal.conflist

<span class="token comment"># calico</span>
<span class="token comment"># 其中--cluster-cidr可不设置</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--flannel-backend=none \
        --cluster-cidr=192.168.200.0/24"'</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># 启动网络服务</span>
kubectl apply <span class="token parameter variable">-f</span> ./calico.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="外部数据库" tabindex="-1"><a class="header-anchor" href="#外部数据库" aria-hidden="true">#</a> 外部数据库</h3>
<blockquote>
<p><strong>理解 Server 节点的安装，以及注册 Agent 节点的步骤！</strong></p>
</blockquote>
<p><strong>使用外部数据库实现高可用安装</strong></p>
<ul>
<li>两个或多个<code v-pre>server</code> 节点</li>
<li>零个或多个<code v-pre>agent</code> 节点</li>
<li>外部数据存储(<code v-pre>Etcd/MySQL/PostgRES</code>)</li>
<li>固定的注册地址(<code v-pre>LB</code>)</li>
<li>这应该是最适合国内用户的 <strong>K3s HA</strong> 方案： https://mp.weixin.qq.com/s/0Wk2MzfWqMqt8DfUK_2ICA</li>
</ul>
<p>虽然单节点 <code v-pre>k3s server</code> 集群可以满足各种用例，但是对于需要稳定运行的重要环境，可以在 <code v-pre>HA</code> 配置中运行 <code v-pre>K3s</code>，如何使用外部数据库安装一个高可用的 <code v-pre>K3s</code> 集群？</p>
<table>
<thead>
<tr>
<th style="text-align:left">主机名</th>
<th style="text-align:left">角色</th>
<th style="text-align:left">IP</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">k3s-server-1</td>
<td style="text-align:left">k3s master</td>
<td style="text-align:left">172.31.2.134</td>
</tr>
<tr>
<td style="text-align:left">k3s-server-2</td>
<td style="text-align:left">k3s master</td>
<td style="text-align:left">172.31.2.42</td>
</tr>
<tr>
<td style="text-align:left">k3s-db</td>
<td style="text-align:left">DB</td>
<td style="text-align:left">172.31.10.251</td>
</tr>
<tr>
<td style="text-align:left">k3s-lb</td>
<td style="text-align:left">LB</td>
<td style="text-align:left">172.31.13.97</td>
</tr>
<tr>
<td style="text-align:left">k3s-agent</td>
<td style="text-align:left">k3s agent</td>
<td style="text-align:left">172.31.15.130</td>
</tr>
</tbody>
</table>
<details class="custom-container details"><summary>展开查看安装过程</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 1.创建一个外部数据存储</span>
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> some-mysql <span class="token punctuation">\</span>
    <span class="token parameter variable">--restart</span><span class="token operator">=</span>unless-stopped <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token punctuation">\</span>
    <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>password <span class="token parameter variable">-d</span> mysql:5.7

<span class="token comment"># 2.启动k3s-server节点(有读写权限不用加库名)</span>
<span class="token comment"># mysql://username:password@tcp(hostname:3306)/database-name</span>
<span class="token comment"># 可加污点 --node-taint CriticalAddonsOnly=true:NoExecute</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token function">sh</span> - server <span class="token punctuation">\</span>
    --datastore-endpoint<span class="token operator">=</span><span class="token string">"mysql://root:password@ip:3306/k3s"</span> <span class="token punctuation">\</span>
    --tls-san <span class="token number">172.31</span>.13.97

<span class="token comment"># 3.配置固定的注册地址(k3s-lb节点)</span>
<span class="token comment"># Agent节点需要一个URL来注册(LB)</span>
<span class="token function">cat</span> <span class="token operator">>></span> /etc/nginx.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
worker_processes 4;
worker_rlimit_nofile 40000;

events {
    worker_connections 8192;
}

stream {
    upstream k3s_api {
        least_conn;
        server 172.31.2.134:6443 max_fails=3 fail_timeout=5s;
        server 172.31.2.42:6443 max_fails=3 fail_timeout=5s;
    }
    server {
        listen     6443;
        proxy_pass k3s_api;
    }
}
EOF</span>

<span class="token comment"># 启动服务</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--restart</span><span class="token operator">=</span>unless-stopped <span class="token punctuation">\</span>
  <span class="token parameter variable">-p</span> <span class="token number">6443</span>:6443 <span class="token punctuation">\</span>
  <span class="token parameter variable">-v</span> /etc/nginx.conf:/etc/nginx/nginx.conf <span class="token punctuation">\</span>
  nginx:1.14

<span class="token comment"># 4.加入Agent节点</span>
<span class="token comment"># Agent会保存LB节点和每个Server节点的IP信息</span>
<span class="token comment"># cat /var/lib/rancher/k3s/agent/etc/k3s-agent-load-balancer.json</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn
    <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span>https://172.31.13.97:6443 <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>mynodetoken <span class="token punctuation">\</span>
    <span class="token function">sh</span> -

<span class="token comment"># 5.通过kubeconfig访问K3s集群</span>
kubectl get nodes
NAME           STATUS   ROLES                  AGE   VERSION
k3s-server-1   Ready    control-plane,master   68s   v1.20.7+k3s1
k3s-server-2   Ready    control-plane,master   66s   v1.20.7+k3s1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>嵌入式 DB 的高可用</strong></p>
<p>要在这种模式下运行 <code v-pre>K3s</code>，你必须有<strong>奇数的服务器节点</strong>（raft)，建议从三个节点开始。在嵌入式中，默认使用 <code v-pre>Etcd</code> 作为高可用的数据库。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 服务器节点(启动etcd集群)</span>
<span class="token comment"># SECRET我们预定一个key值</span>
<span class="token comment"># 使用cluster-init标志来启用集群</span>
<span class="token comment"># 并使用一个标记作为共享的密钥来加入其他服务器到集群中</span>
root@cubnode02:/workspces<span class="token comment"># curl -sfL https://get.k3s.io | \</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>SECRET <span class="token punctuation">\</span>
    <span class="token function">sh</span> <span class="token parameter variable">-s</span> - --cluster-init

<span class="token comment"># 查看类型</span>
root@cubnode02:/workspces<span class="token comment"># sudo  kubectl get nodes</span>
NAME    STATUS  ROLES                      AGE  VERSION
ip-xxx  Ready   control-plane,etcd,master  19h  v1.23.6+k3s1

<span class="token comment"># 其他服务器节点(2/3)</span>
root@cubnode02:/workspces<span class="token comment"># curl -sfL https://get.k3s.io | \</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>SECRET <span class="token punctuation">\</span>
    <span class="token function">sh</span> <span class="token parameter variable">-s</span> - <span class="token parameter variable">--server</span> https://<span class="token operator">&lt;</span>ip-or-host-server<span class="token operator">></span>:6443

<span class="token comment"># 查询ETCD集群状态</span>
<span class="token comment"># etcd证书默认目录：/var/lib/rancher/k3s/server/tls/etcd</span>
<span class="token comment"># etcd数据默认目录：/var/lib/rancher/k3s/server/db/etcd</span>
root@cubnode02:/workspces<span class="token comment"># ETCDCTL_ENDPOINTS='https://172.31.12.136:2379,\</span>
    https://172.31.4.43:2379,<span class="token punctuation">\</span>
    https://172.31.4.190:2379<span class="token string">' \
ETCDCTL_CACERT='</span>/var/lib/rancher/k3s/server/tls/etcd/server-ca.crt<span class="token string">' \
ETCDCTL_CERT='</span>/var/lib/rancher/k3s/server/tls/etcd/server-client.crt<span class="token string">'\
ETCDCTL_KEY='</span>/var/lib/rancher/k3s/server/tls/etcd/server-client.key' <span class="token punctuation">\</span>
<span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span> etcdctl endpoint status --write-out<span class="token operator">=</span>table
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="集群数据存储选项" tabindex="-1"><a class="header-anchor" href="#集群数据存储选项" aria-hidden="true">#</a> 集群数据存储选项</h3>
<p>使用 <code v-pre>etcd</code> 以外的数据存储运行 <code v-pre>K8S</code> 的能力使 <code v-pre>K3s</code> 区别于其他 <code v-pre>K8S</code> 发行版。该功能为 <code v-pre>K8S</code> 操作者提供了灵活性，可用的数据存储选项允许你选择一个最适合用例的数据存储。</p>
<p>如果你的团队没有操作 <code v-pre>etcd</code> 的专业知识，可以选择 <code v-pre>MySQL</code> 或 <code v-pre>PostgreSQL</code> 等企业级 <code v-pre>SQL</code> 数据库。如果您需要在 <code v-pre>CI/CD</code> 环境中运行一个简单的、短暂的集群，可以使用嵌入式 <code v-pre>SQLite</code> 数据库</p>
<p>如果你想使用外部数据存储，如 <code v-pre>PostgreSQL</code>、<code v-pre>MySQL</code> 或 <code v-pre>etcd</code>，你必须设置 <code v-pre>datastore-endpoint</code> 参数，以便 <code v-pre>K3s</code> 知道如何连接到它，也可以指定参数来配置连接的认证和加密。下表总结了这些参数，它们可以作为 <code v-pre>CLI</code> 标志或环境变量传递。</p>
<table>
<thead>
<tr>
<th style="text-align:left">CLI Flag</th>
<th style="text-align:left">环境变量</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>--datastore-endpoint</code></td>
<td style="text-align:left"><code v-pre>K3S_DATASTORE_ENDPOINT</code></td>
<td style="text-align:left">指定一个 PostgresSQL、MySQL 或 etcd 连接字符串。用于描述与数据存储的连接。这个字符串的结构是特定于每个后端的，详情如下。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--datastore-cafile</code></td>
<td style="text-align:left"><code v-pre>K3S_DATASTORE_CAFILE</code></td>
<td style="text-align:left">TLS 证书颁发机构（CA）文件，用于帮助确保与数据存储的通信安全。如果你的数据存储通过 TLS 服务请求，使用由自定义证书颁发机构签署的证书，你可以使用这个参数指定该 CA，这样 K3s 客户端就可以正确验证证书。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--datastore-certfile</code></td>
<td style="text-align:left"><code v-pre>K3S_DATASTORE_CERTFILE</code></td>
<td style="text-align:left">TLS 证书文件，用于对数据存储进行基于客户端证书的验证。要使用这个功能，你的数据存储必须被配置为支持基于客户端证书的认证。如果你指定了这个参数，你还必须指定<code v-pre>datastore-keyfile</code>参数。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--datastore-keyfile</code></td>
<td style="text-align:left"><code v-pre>K3S_DATASTORE_KEYFILE</code></td>
<td style="text-align:left">TLS 密钥文件，用于对数据存储进行基于客户端证书的认证。更多细节请参见前面的<code v-pre>datastore-certfile</code>参数。</td>
</tr>
</tbody>
</table>
<p>作为最佳实践，我们建议将这些参数设置为环境变量，而不是命令行参数，这样你的数据库证书或其他敏感信息就不会作为进程信息的一部分暴露出来。</p>
<h3 id="私有镜像仓库" tabindex="-1"><a class="header-anchor" href="#私有镜像仓库" aria-hidden="true">#</a> 私有镜像仓库</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>业务板块应该有自己的仓库，了解下</p>
</div>
</details>
<p><code v-pre>K3s</code> 默认使用 <code v-pre>containerd</code> 作为容器运行时，所以在 <code v-pre>docker</code> 上配置镜像仓库是不生效的。<code v-pre>K3s</code> 镜像仓库配置文件由两大部分组成：<code v-pre>mirrors</code> 和  <code v-pre>configs</code>。</p>
<ul>
<li><code v-pre>Mirrors</code> 是一个用于定义专用镜像仓库的名称和 <code v-pre>endpoint</code> 的指令</li>
<li><code v-pre>Configs</code> 部分定义了每个 <code v-pre>mirror</code> 的 <code v-pre>TLS</code> 和证书配置</li>
<li>对于每个 <code v-pre>mirror</code>，你可以定义 <code v-pre>auth</code> 和 <code v-pre>/</code> 或 <code v-pre>tls</code></li>
</ul>
<p><code v-pre>K3s registry</code> 配置目录为： <code v-pre>/etc/rancher/k3s/registries.yaml</code>。<code v-pre>K3s</code> 启动时会检查 <code v-pre>/etc/rancher/k3s/</code> 中是否存在  <code v-pre>registries.yaml</code> 文件，并指示 <code v-pre>containerd</code> 使用文件中定义的镜像仓库。如果你想使用一个私有的镜像仓库，那么你需要在每个使用镜像仓库的节点上以 <code v-pre>root</code> 身份创建这个文件。</p>
<p>请注意，<code v-pre>server</code> 节点默认是可以调度的。如果你没有在 <code v-pre>server</code> 节点上设置污点，那么将在它们上运行工作负载，请确保在每个 <code v-pre>server</code> 节点上创建  <code v-pre>registries.yaml</code> 文件。</p>
<p><code v-pre>containerd</code> 使用了类似 <code v-pre>K8S</code> 中 <code v-pre>svc</code> 与 <code v-pre>endpoint</code> 的概念，<code v-pre>svc</code> 可以理解为访问名称，这个名称会解析到对应的 <code v-pre>endpoint</code> 上。也可以理解 <code v-pre>mirror</code> 配置就是一个反向代理，它把客户端的请求代理到 <code v-pre>endpoint</code> 配置的后端镜像仓库。<code v-pre>mirror</code> 名称可以随意填写，但是必须符合 <code v-pre>IP</code> 或域名的定义规则。并且可以配置多个 <code v-pre>endpoint</code>，默认解析到第一个 <code v-pre>endpoint</code>，如果第一个 <code v-pre>endpoint</code> 没有返回数据，则自动切换到第二个 <code v-pre>endpoint</code>，以此类推。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># /etc/rancher/k3s/registries.yaml</span>
<span class="token comment"># 同时可以设置多个mirrors地址</span>
<span class="token comment"># 可以对mirrors设置权限和证书</span>
mirrors:
  <span class="token string">"172.31.6.200:5000"</span><span class="token builtin class-name">:</span>
    endpoint:
      - <span class="token string">"http://172.31.6.200:5000"</span>
      - <span class="token string">"http://x.x.x.x:5000"</span>
      - <span class="token string">"http://y.y.y.y:5000"</span>
  <span class="token string">"rancher.ksd.top:5000"</span><span class="token builtin class-name">:</span>
    endpoint:
      - <span class="token string">"http://172.31.6.200:5000"</span>
  <span class="token string">"docker.io"</span><span class="token builtin class-name">:</span>
    endpoint:
      - <span class="token string">"https://fogjl973.mirror.aliyuncs.com"</span>
      - <span class="token string">"https://registry-1.docker.io"</span>

configs:
  <span class="token string">"172.31.6.200:5000"</span><span class="token builtin class-name">:</span>
    auth:
      username: admin
      password: Harbor@12345
    tls:
      cert_file: /home/ubuntu/harbor2.escapelife.site.cert
      key_file: /home/ubuntu/harbor2.escapelife.site.key
      ca_file: /home/ubuntu/ca.crt
<span class="token comment"># 镜像都是从同一个仓库获取到的</span>
$ <span class="token function">sudo</span> systemctl restart k3s.service
$ <span class="token function">sudo</span> crictl pull <span class="token number">172.31</span>.6.200:5000/library/alpine
$ <span class="token function">sudo</span> crictl pull rancher.ksd.top:5000/library/alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们介绍下，如何使用 <code v-pre>TLS</code> 配置。</p>
<details class="custom-container details"><summary>展开</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
<span class="token comment"># 证书颁发机构颁发的证书</span>
<span class="token function">cat</span> <span class="token operator">>></span> /etc/rancher/k3s/registries.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  "harbor.escapelife.site":
    endpoint:
      - "https://harbor.escapelife.site"
configs:
  "harbor.escapelife.site":
    auth:
      username: admin
      password: Harbor@12345
EOF</span>

<span class="token function">sudo</span> systemctl restart k3s

<span class="token comment"># 自签名证书</span>
<span class="token function">cat</span> <span class="token operator">>></span> /etc/rancher/k3s/registries.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  "harbor2.escapelife.site":
    endpoint:
      - "https://harbor2.escapelife.site"
configs:
  "harbor2.escapelife.site":
    auth:
      username: admin
      password: Harbor@12345
    tls:
      cert_file: /home/ubuntu/harbor2.escapelife.site.cert
      key_file:  /home/ubuntu/harbor2.escapelife.site.key
      ca_file:   /home/ubuntu/ca.crt
EOF</span>

<span class="token function">sudo</span> systemctl restart k3s

<span class="token comment"># 不使用TLS证书</span>
<span class="token function">cat</span> <span class="token operator">>></span> /etc/rancher/k3s/registries.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  "docker.io":
    endpoint:
      - "https://fogjl973.mirror.aliyuncs.com"
      - "https://registry-1.docker.io"
EOF</span>

<span class="token function">sudo</span> systemctl restart k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><code v-pre>K3s</code> 将会在 <code v-pre>/var/lib/rancher/k3s/agent/etc/containerd/config.toml</code> 中为 <code v-pre>containerd</code> 生成 <code v-pre>config.toml</code>。如果要对这个文件进行高级设置，你可以在同一目录中创建另一个名为  <code v-pre>config.toml.tmpl</code> 的文件，此文件将会代替默认设置。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
<span class="token comment"># 完整示例</span>
<span class="token function">cat</span> <span class="token operator">>></span> /etc/rancher/k3s/registries.yaml
mirrors:
  <span class="token string">"harbor.escapelife.site"</span><span class="token builtin class-name">:</span>
     endpoint:
     - <span class="token string">"https://harbor.escapelife.site"</span>
  <span class="token string">"harbor2.escapelife.site"</span><span class="token builtin class-name">:</span>
     endpoint:
     - <span class="token string">"https://harbor2.escapelife.site"</span>
  <span class="token string">"172.31.19.227:5000"</span><span class="token builtin class-name">:</span>
     endpoint:
     - <span class="token string">"http://172.31.19.227:5000"</span>
  <span class="token string">"docker.io"</span><span class="token builtin class-name">:</span>
     endpoint:
     - <span class="token string">"https://fogjl973.mirror.aliyuncs.com"</span>
     - <span class="token string">"https://registry-1.docker.io"</span>

configs:
  <span class="token string">"harbor.escapelife.site"</span><span class="token builtin class-name">:</span>
     auth:
       username: admin
       password: Harbor@12345

  <span class="token string">"harbor2.escapelife.site"</span><span class="token builtin class-name">:</span>
     auth:
       username: admin
       password: Harbor@12345
     tls:
       cert_file: /home/ubuntu/harbor2.escapelife.site.cert
       key_file:  /home/ubuntu/harbor2.escapelife.site.key
       ca_file:   /home/ubuntu/ca.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装事项-注意事项" tabindex="-1"><a class="header-anchor" href="#安装事项-注意事项" aria-hidden="true">#</a> 安装事项 - 注意事项</h2>
<p><strong>Helm</strong></p>
<ul>
<li>如果需要使用 <code v-pre>helm</code> 操作 <code v-pre>K3s</code> 集群，需要创建 <code v-pre>~/.kube/conf</code> 目录</li>
<li>需要执行 <code v-pre>cp /etc/rancher/k3s/k3s.yaml ~/.kube/config</code> 命令</li>
</ul>
<p><strong>自动部署的清单</strong></p>
<ul>
<li>将由 <code v-pre>rancher/helm-controller</code> 在运行时安装</li>
<li>目录路径：<code v-pre>/var/lib/rancher/k3s/server/manifests</code></li>
<li>目录下面的每个 <code v-pre>yaml</code> 就代表这个一个需要启动的服务</li>
</ul>
<p>对于我们希望使用的组件，可以在启动的时候禁用默认组件，在手动部署你需要的一些组件(通常是放到一个指定目录下面，随着服务启动自动拉起)，从而达到灵活使用的目的。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看所有Pod服务</span>
<span class="token comment"># 比如helm/coredns也不是自带的就是通过这个方式创建的</span>
<span class="token function">sudo</span> kubectl get pods <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注册 Agent 节点</strong></p>
<ol>
<li>工作节点密码存储：<code v-pre>/etc/rancher/node/password</code></li>
<li>主节点的密码存储：<code v-pre>/var/lib/rancher/k3s/server/cred/node-passwd</code></li>
</ol>
<p>在 <code v-pre>agent</code> 节点运行注册命令，会和 <code v-pre>server</code> 节点发起 <code v-pre>websocket</code> 连接，然后会在工作节点上面创建一个随机的密码。然后会拿着这个密码和工作节点的主机名，发送给主节点。然后主节点会将这个信息在保存(<code v-pre>k8s secrets</code>)起来，随后的任何尝试都必须使用相同的密码。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 工作节点的密码信息(password+hostname)</span>
<span class="token function">sudo</span> <span class="token function">cat</span> /etc/rancher/node/password

<span class="token comment"># 查看主节点的密码信息</span>
<span class="token comment"># https://docs.rancher.cn/docs/k3s/architecture/_index#注册-agent-节点</span>
<span class="token function">sudo</span> kubectl get secret k3s2.node-password.k3s <span class="token parameter variable">-o</span> yaml <span class="token parameter variable">-n</span> kube-system

<span class="token comment"># 可以查看日志信息验证这个信息的存在</span>
<span class="token function">sudo</span> <span class="token function">tail</span> <span class="token parameter variable">-200f</span> /var/log/syslog <span class="token operator">|</span> <span class="token function">grep</span> k3s

<span class="token comment"># 发现节点信息提示NotReady状态</span>
<span class="token comment"># 可以尝试删除节点的密码存储信息，之后会自动获取新的</span>
<span class="token function">sudo</span> kubectl delete secret k3s2.node-password.k3s <span class="token parameter variable">-n</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自定义存储类型</strong></p>
<p>集群启动之后，默认会启动一个 <code v-pre>local-path</code> 的组件，用于提供服务挂载存储使用，其默认以 <code v-pre>PVC</code> 的形式。之后，将其存储在 <code v-pre>/var/lib/rancher/k3s/server/storageclass</code> 目录下面。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看组件</span>
<span class="token function">sudo</span> kubectl get pods <span class="token parameter variable">-A</span>

<span class="token comment"># 查看对应存储</span>
<span class="token function">sudo</span> kubectl get storageclass

<span class="token comment"># 可以使用参数修改默认存储地址</span>
<span class="token comment"># --default-local-storage-path&amp;nbsp;value</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--etcd-snapshot-schedule-cron *&amp;nbsp;*/5&amp;nbsp;*&amp;nbsp;*&amp;nbsp;*'</span> <span class="token punctuation">\</span>
    <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="k3s-集群升级" tabindex="-1"><a class="header-anchor" href="#k3s-集群升级" aria-hidden="true">#</a> K3s 集群升级</h2>
<blockquote>
<p><strong>手动升级 + 自动升级</strong></p>
</blockquote>
<p>当升级 <code v-pre>K3s</code> 时，<code v-pre>K3s</code> 服务会重启或停止，但 <code v-pre>K3s</code> 容器会继续运行。要停止所有的 <code v-pre>K3s</code> 容器并重置容器的状态，可以使用  <code v-pre>k3s-killall.sh</code> 脚本。 <code v-pre>killall</code> 脚本清理容器、<code v-pre>K3s</code> 目录和网络组件，同时也删除了 <code v-pre>iptables</code> 链和所有相关规则。集群数据不会被删除。</p>
<p><strong>手动升级 - 使用安装脚本升级 K3s</strong></p>
<p>你可以通过使用安装脚本升级 <code v-pre>K3s</code>，或者手动安装所需版本的二进制文件。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 升级到最新stable版本</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> -

<span class="token comment"># 升级到latest版本</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_CHANNEL</span><span class="token operator">=</span>latest <span class="token function">sh</span> -

<span class="token comment"># 升级到v1.20的最新版本</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_CHANNEL</span><span class="token operator">=</span><span class="token string">"v1.20"</span> <span class="token function">sh</span> -

<span class="token comment"># 升级到指定版本</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_VERSION</span><span class="token operator">=</span>vX.Y.Z-rc1 <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意和docker的区别，关于版本是 <code v-pre>+</code> 还是 <code v-pre>-</code></p>
</blockquote>
<p><strong>手动升级 - 使用二进制文件手动升级 K3s</strong></p>
<p>你可以通过使用安装脚本升级 <code v-pre>K3s</code>，或者手动安装所需版本的二进制文件。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
<span class="token comment"># 从发布下载所需版本的K3s二进制文件</span>
https://github.com/rancher/k3s/releases

<span class="token comment"># 将下载的二进制文件复制到/usr/local/bin/k3s</span>
$ <span class="token function">mv</span> ./k3s /usr/local/bin/k3s

<span class="token comment"># 停止旧的K3s二进制文件</span>
$ <span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_CHANNEL</span><span class="token operator">=</span><span class="token string">"v1.20"</span> <span class="token function">sh</span> -

<span class="token comment"># 启动新的K3s二进制文件</span>
$ <span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_VERSION</span><span class="token operator">=</span>vX.Y.Z-rc1 <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以使用 <code v-pre>Rancher</code> 的 <code v-pre>system-upgrad-controller</code> 来管理 <code v-pre>K3s</code> 集群升级。这是一种 <code v-pre>Kubernetes</code> 原生的集群升级方法。它利用自定义资源定义(<code v-pre>CRD</code>)、计划和控制器，根据配置的计划安排升级。</p>
<p>控制器通过监控计划和选择要在其上运行升级 <code v-pre>job</code> 的节点来调度升级，计划通过标签选择器定义哪些节点应该升级。当一个 <code v-pre>job</code> 成功运行完成后，控制器会给它运行的节点打上相应的标签。</p>
<p><strong>自动升级 - 使用二进制文件手动升级 K3s</strong></p>
<ul>
<li>k3s-upgrade：https://github.com/k3s-io/k3s-upgrade</li>
<li>system-upgrade-controller：https://github.com/rancher/system-upgrade-controller</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 将system-upgrade-controller安装到您的集群中</span>
kubectl apply <span class="token parameter variable">-f</span> https://github.com/rancher/system-upgrade-controller/releases/download/v0.6.2/system-upgrade-controller.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>配置计划</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 配置计划</span>
<span class="token comment"># 建议您最少创建两个计划</span>
<span class="token comment"># 升级server节点的计划和升级agent节点的计划</span>

<span class="token comment"># Server plan</span>
apiVersion: upgrade.cattle.io/v1
kind: Plan
metadata:
  name: server-plan
  namespace: system-upgrade
spec:
  concurrency: <span class="token number">1</span>
  cordon: <span class="token boolean">true</span>
  nodeSelector:
    matchExpressions:
    - key: node-role.kubernetes.io/master <span class="token comment"># 选择主节点</span>
      operator: In
      values:
      - <span class="token string">"true"</span>
  serviceAccountName: system-upgrade
  upgrade:
    image: rancher/k3s-upgrade
  version: v1.20.4+k3s1

<span class="token comment"># Agent plan</span>
apiVersion: upgrade.cattle.io/v1
kind: Plan
metadata:
  name: agent-plan
  namespace: system-upgrade
spec:
  concurrency: <span class="token number">1</span>
  cordon: <span class="token boolean">true</span>
  nodeSelector:
    matchExpressions:
    - key: node-role.kubernetes.io/master <span class="token comment"># 选择工作节点</span>
      operator: DoesNotExist
  prepare:
    args:
    - prepare
    - server-plan
    image: rancher/k3s-upgrade
  serviceAccountName: system-upgrade
  upgrade:
    image: rancher/k3s-upgrade
  version: v1.20.4+k3s1
<span class="token comment"># 自动升级到最新版本(不指定版本)</span>
apiVersion: upgrade.cattle.io/v1
kind: Plan
<span class="token punctuation">..</span>.
spec:
  <span class="token punctuation">..</span>.
  upgrade:
    image: rancher/k3s-upgrade
  channel: https://update.k3s.io/v1-release/channels/stable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><img src="http://sm.nsddd.top/smimage-20221126000754469.png" alt="image-20221126000754469"></p>
<h2 id="k3s-备份恢复" tabindex="-1"><a class="header-anchor" href="#k3s-备份恢复" aria-hidden="true">#</a> K3s 备份恢复</h2>
<blockquote>
<p><strong>SQLite + etcd + 外部数据存储</strong></p>
</blockquote>
<p><strong>使用嵌入式 SQLite 数据存储进行备份和恢复</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 方式1：备份/恢复数据目录</span>

<span class="token comment"># 备份</span>
<span class="token function">cp</span> <span class="token parameter variable">-rf</span> /var/lib/rancher/k3s/server/db /opt/db

<span class="token comment"># 恢复</span>
systemctl stop k3s
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/rancher/k3s/server/db
<span class="token function">cp</span> <span class="token parameter variable">-rf</span> /opt/db /var/lib/rancher/k3s/server/db
systemctl start k3s


<span class="token comment"># 方式2：通过 SQLite cli</span>

<span class="token comment"># 备份</span>
sqlite3 /var/lib/rancher/k3s/server/db/state.db
SQLite version <span class="token number">3.22</span>.0 <span class="token number">2018</span>-01-22 <span class="token number">18</span>:45:57
Enter <span class="token string">".help"</span> <span class="token keyword">for</span> usage hints.
sqlite<span class="token operator">></span> .backup <span class="token string">"/opt/kine.db"</span>
sqlite<span class="token operator">></span> .exit

<span class="token comment"># 恢复</span>
<span class="token function">sudo</span> systemctl stop k3s

sqlite3 /var/lib/rancher/k3s/server/db/state.db
SQLite version <span class="token number">3.22</span>.0 <span class="token number">2018</span>-01-22 <span class="token number">18</span>:45:57
Enter <span class="token string">".help"</span> <span class="token keyword">for</span> usage hints.
sqlite<span class="token operator">></span> .restore <span class="token string">'/opt/kine.db'</span>
sqlite<span class="token operator">></span> .exit

<span class="token function">sudo</span> systemctl start k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当使用外部数据存储时，备份和恢复操作是在 <code v-pre>K3s</code> 之外处理的。数据库管理员需要对外部数据库进行备份，或者从快照或转储中进行恢复。我们建议将数据库配置为执行定期快照。</p>
<p><strong>使用外部数据存储进行备份和恢复</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 备份</span>
mysqldump <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p</span> --all-databases --master-data <span class="token operator">></span> k3s-dbdump.db

<span class="token comment"># 恢复</span>
systemctl stop k3s
mysql <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-p</span>  <span class="token operator">&lt;</span> k3s-dbdump.db
systemctl start k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用嵌入式 etcd 数据存储进行备份和恢复</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 创建快照(K3s默认启用快照)</span>
<span class="token comment"># 快照目录默认: /var/lib/rancher/k3s/server/db/snapshots</span>

<span class="token comment"># 要配置快照间隔或保留的快照数量</span>
--etcd-disable-snapshots       禁用自动etcd快照
--etcd-snapshot-schedule-cron  定时快照的时间点；认值为每12小时触发一次
--etcd-snapshot-retention      保留的快照数量；默认值为5
--etcd-snapshot-dir            保存数据库快照的目录路径
--cluster-reset                忘记所有的对等体；成为新集群的唯一成员
--cluster-reset-restore-path   要恢复的快照文件的路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 <code v-pre>K3s</code> 从备份中恢复时，旧的数据目录将被移动到<code v-pre>/var/lib/rancher/k3s/server/db/etcd-old/</code>。然后 <code v-pre>K3s</code> 会尝试通过创建一个新的数据目录来恢复快照，然后从一个带有一个 <code v-pre>etcd</code> 成员的新 <code v-pre>K3s</code> 集群启动 <code v-pre>etcd</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 从快照恢复集群</span>
<span class="token comment"># 使用--cluster-reset选项运行K3s</span>
<span class="token comment"># 同时给出--cluster-reset-restore-path</span>
./k3s server <span class="token punctuation">\</span>
    --cluster-reset <span class="token punctuation">\</span>
    --cluster-reset-restore-path<span class="token operator">=</span><span class="token operator">&lt;</span><span class="token environment constant">PATH</span>-TO-SNAPSHOT<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="k3s-卷和存储" tabindex="-1"><a class="header-anchor" href="#k3s-卷和存储" aria-hidden="true">#</a> K3s 卷和存储</h3>
<blockquote>
<p><strong>介绍了如何通过 local storage provider 或 Longhorn 来设置持久存储。</strong></p>
</blockquote>
<p>当部署一个需要保留数据的应用程序时，你需要创建持久存储。持久存储允许您从运行应用程序的 <code v-pre>pod</code> 外部存储应用程序数据。即使应用程序的 <code v-pre>pod</code> 发生故障，这种存储方式也可以使您维护应用程序数据。</p>
<p><strong>设置 Local Storage Provider 支持</strong></p>
<p><code v-pre>K3s</code> 自带 <code v-pre>Rancher</code> 的 <code v-pre>Local Path Provisioner</code>(<code v-pre>LPP</code>)，这使得能够使用各自节点上的本地存储来开箱即用地创建 <code v-pre>pvc</code>。根据用户配置，<code v-pre>LPP</code> 将自动在节点上创建基于 <code v-pre>hostPath</code> 的持久卷。它利用了 <code v-pre>K8s</code> 的 <code v-pre>Local Persistent Volume</code> 特性引入的特性，但它比 <code v-pre>K8s</code> 中内置的  <code v-pre>local pv</code> 特性更简单的解决方案。</p>
<details class="custom-container details"><summary>pvc.yaml</summary>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> local<span class="token punctuation">-</span>path<span class="token punctuation">-</span>pvc
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> local<span class="token punctuation">-</span>path
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 2Gi

<span class="token comment"># pod.yaml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>test
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>test
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>stable<span class="token punctuation">-</span>alpine
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volv
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volv
    <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
      <span class="token key atrule">claimName</span><span class="token punctuation">:</span> local<span class="token punctuation">-</span>path<span class="token punctuation">-</span>pvc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 应用yaml服务</span>
kubectl create <span class="token parameter variable">-f</span> pvc.yaml pod.yaml

<span class="token comment"># 确认PV和PVC已创建</span>
kubectl get <span class="token function">pv</span>
kubectl get pvc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>设置 Longhorn 支持</strong></p>
<p><code v-pre>K3s</code> 支持 <code v-pre>Longhorn</code>(是 <code v-pre>K8s</code> 的一个开源分布式块存储系统)。</p>
<details class="custom-container details"><summary>pvc.yaml</summary>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>
<span class="token comment"># 安装Longhorn</span>
<span class="token comment"># 将被安装在命名空间longhorn-system中</span>
$ kubectl apply <span class="token punctuation">-</span>f https<span class="token punctuation">:</span>//raw.githubusercontent.com/longhorn/longhorn/master/deploy/longhorn.yaml

<span class="token comment"># pvc.yaml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> longhorn<span class="token punctuation">-</span>volv<span class="token punctuation">-</span>pvc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteOnce
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> longhorn
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 2Gi

<span class="token comment"># pod.yaml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>test
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volume<span class="token punctuation">-</span>test
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>stable<span class="token punctuation">-</span>alpine
    <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volv
      <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> volv
    <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
      <span class="token key atrule">claimName</span><span class="token punctuation">:</span> longhorn<span class="token punctuation">-</span>volv<span class="token punctuation">-</span>pvc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 应用yaml服务</span>
kubectl create <span class="token parameter variable">-f</span> pvc.yaml pod.yaml

<span class="token comment"># 确认PV和PVC已创建</span>
kubectl get <span class="token function">pv</span>
kubectl get pvc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="k3s-网络相关" tabindex="-1"><a class="header-anchor" href="#k3s-网络相关" aria-hidden="true">#</a> K3s 网络相关</h2>
<p><strong>CoreDNS</strong></p>
<p><code v-pre>CoreDNS</code> 是在 <code v-pre>agent</code> 节点启动时部署的。要禁用，请在每台服务器上运行 <code v-pre>--``disable coredns</code> 选项。如果你不安装 <code v-pre>CoreDNS</code>，你将需要自己安装一个集群 <code v-pre>DNS</code> 提供商。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 如何修改coredns参数</span>
<span class="token comment"># /var/lib/rancher/k3s/server/manifests/coredns.yaml</span>
<span class="token comment"># 该文件重启K3s服务的话会导致coredns配置重新初始化</span>
<span class="token number">1</span>.将coredns.yaml保存到其他目录
<span class="token number">2</span>.通过 <span class="token parameter variable">--disable</span> coredns 禁用coredns
<span class="token number">3</span>.复制coredns.yaml到/var/lib/rancher/k3s/server/manifests/目录并修改参数
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Traefik Ingress Controller</strong></p>
<p>启动 <code v-pre>server</code> 时，默认情况下会部署 <code v-pre>Traefik</code>，对该文件的任何修改都会以类似 <code v-pre>kubectl apply</code> 的方式自动部署到 <code v-pre>Kubernetes</code> 中，将使用主机上的 <code v-pre>80</code> 和 <code v-pre>443</code> 端口。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 操作和上面基本是一致的</span>
<span class="token comment"># 请使用 --disable traefik 选项启动每个server</span>
<span class="token comment"># /var/lib/rancher/k3s/server/manifests/traefik.yaml</span>
<span class="token comment"># 如何启用 treafik2 dashboard</span>
<span class="token comment"># http://traefik.example.com/dashboard</span>

<span class="token comment"># Note: in a kubernetes secret the string (e.g. generated by htpasswd) must be base64-encoded first.</span>
<span class="token comment"># To create an encoded user:password pair, the following command can be used:</span>
<span class="token comment"># htpasswd -nb admin admin | openssl base64</span>

<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> authsecret
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">users</span><span class="token punctuation">:</span> <span class="token punctuation">|</span>2
    YWRtaW46JGFwcjEkLkUweHd1Z0EkUjBmLi85WndJNXZWRFMyR2F2LmtELwoK

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> traefik.containo.us/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> IngressRoute
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> traefik<span class="token punctuation">-</span>dashboard
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">routes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">match</span><span class="token punctuation">:</span> Host(`traefik.example.com`) <span class="token important">&amp;&amp;</span> (PathPrefix(`/api`) <span class="token punctuation">|</span><span class="token punctuation">|</span> PathPrefix(`/dashboard`))
      <span class="token key atrule">kind</span><span class="token punctuation">:</span> Rule
      <span class="token key atrule">services</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> api@internal
          <span class="token key atrule">kind</span><span class="token punctuation">:</span> TraefikService
      <span class="token key atrule">middlewares</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> auth

<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> traefik.containo.us/v1alpha1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Middleware
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> auth
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">basicAuth</span><span class="token punctuation">:</span>
    <span class="token key atrule">secret</span><span class="token punctuation">:</span> authsecret <span class="token comment"># Kubernetes secret named "secretName"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Service Load Balancer</strong></p>
<p><code v-pre>K3s</code> 提供了一个名为 <code v-pre>Klipper Load Balancer</code> 的负载均衡器，它可以使用可用的主机端口。允许创建 <code v-pre>LoadBalancer</code> 类型的 <code v-pre>Service</code>，但不包括 <code v-pre>LB</code> 的实现。某些 <code v-pre>LB</code> 服务需要云提供商，例如 <code v-pre>Amazon EC2</code>。相比之下，<code v-pre>K3s service LB</code> 使得可以在没有云提供商的情况下使用 <code v-pre>LB</code> 服务。</p>
<h2 id="helm-k3s" tabindex="-1"><a class="header-anchor" href="#helm-k3s" aria-hidden="true">#</a> helm(k3s)</h2>
<p><strong>K3s 与 Helm</strong></p>
<blockquote>
<p><strong><code v-pre>Helm</code></strong> <strong>是</strong> <strong><code v-pre>Kubernetes</code></strong> <strong>的包管理工具！</strong></p>
</blockquote>
<p><code v-pre>Helm</code> 是 <code v-pre>Kubernetes</code> 的包管理工具。<code v-pre>Helm Chart</code> 为 <code v-pre>Kubernetes YAML</code> 清单文件提供了模板化语法，可以通过 <code v-pre>Helm</code> 安装对应的 <code v-pre>chart</code>。<code v-pre>K3s</code> 不需要任何特殊的配置就可以使用 <code v-pre>Helm</code> 命令行工具。</p>
<p><strong>自动部署 Helm charts</strong></p>
<p>在 <code v-pre>/var/lib/rancher/k3s/server/manifests</code> 中找到的任何 <code v-pre>Kubernetes</code> 清单将以类似 <code v-pre>kubectl apply</code> 的方式自动部署到 <code v-pre>K3s</code>。以这种方式部署的 <code v-pre>manifests</code> 是作为 <code v-pre>AddOn</code> 自定义资源来管理的。你会发现打包组件的 <code v-pre>AddOns</code>，如 <code v-pre>CoreDNS</code>、<code v-pre>Local-Storage</code> 等。<code v-pre>AddOns</code> 是由部署控制器自动创建的，并根据它们在 <code v-pre>manifests</code> 目录下的文件名命名。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看运行AddOn资源</span>
$ kubectl get addon <span class="token parameter variable">-A</span>

<span class="token comment"># 也可以将Helm-Chart作为AddOns部署</span>
https://github.com/rancher/helm-controller/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221126114506014.png" alt="image-20221126114506014"></p>
<p><strong>使用 Helm CRD</strong></p>
<p><code v-pre>HelmChart CRD</code> 捕获了大多数你通常会传递给 <code v-pre>helm</code> 命令行工具的选项。下面是一个例子，说明如何从默认的 <code v-pre>Chart</code> 资源库中部署 <code v-pre>Grafana</code>，覆盖一些默认的 <code v-pre>Chart</code> 值。请注意，<code v-pre>HelmChart</code> 资源本身在 <code v-pre>kube-system</code> 命名空间，但 <code v-pre>Chart</code> 资源将被部署到 <code v-pre>monitoring</code> 命名空间。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> helm.cattle.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> HelmChart
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> grafana
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">chart</span><span class="token punctuation">:</span> stable/grafana
  <span class="token key atrule">targetNamespace</span><span class="token punctuation">:</span> monitoring
  <span class="token key atrule">set</span><span class="token punctuation">:</span>
    <span class="token key atrule">adminPassword</span><span class="token punctuation">:</span> <span class="token string">"NotVerySafePassword"</span>
  <span class="token key atrule">valuesContent</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span>
      <span class="token key atrule">tag</span><span class="token punctuation">:</span> master
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token key atrule">GF_EXPLORE_ENABLED</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">adminUser</span><span class="token punctuation">:</span> admin
    <span class="token key atrule">sidecar</span><span class="token punctuation">:</span>
      <span class="token key atrule">datasources</span><span class="token punctuation">:</span>
        <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="k3s-高级选项" tabindex="-1"><a class="header-anchor" href="#k3s-高级选项" aria-hidden="true">#</a> K3s 高级选项</h2>
<p><strong>证书轮换</strong></p>
<p>默认情况下，<code v-pre>K3s</code> 的证书在 <code v-pre>12</code> 个月内过期。如果证书已经过期或剩余的时间不足 <code v-pre>90</code> 天，则在 <code v-pre>K3s</code> 重启时轮换证书。</p>
<p><strong>查询 k3s 证书过期时间：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/var/lib/rancher/k3s/server/manifests<span class="token comment">#  for i in `ls /var/lib/rancher/k3s/server/tls/*.crt`; \</span>
<span class="token operator">></span>   <span class="token keyword">do</span> <span class="token punctuation">\</span>
<span class="token operator">></span>     <span class="token builtin class-name">echo</span> <span class="token variable">$i</span><span class="token punctuation">;</span><span class="token punctuation">\</span>
<span class="token operator">></span>     openssl x509 <span class="token parameter variable">-enddate</span> <span class="token parameter variable">-noout</span> <span class="token parameter variable">-in</span> <span class="token variable">$i</span><span class="token punctuation">;</span> <span class="token punctuation">\</span>
<span class="token operator">></span>   <span class="token keyword">done</span>
/var/lib/rancher/k3s/server/tls/client-admin.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">25</span> <span class="token number">14</span>:31:20 <span class="token number">2023</span> GMT
/var/lib/rancher/k3s/server/tls/client-auth-proxy.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">25</span> <span class="token number">14</span>:31:20 <span class="token number">2023</span> GMT
/var/lib/rancher/k3s/server/tls/client-ca.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">22</span> <span class="token number">14</span>:31:20 <span class="token number">2032</span> GMT
/var/lib/rancher/k3s/server/tls/client-controller.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">25</span> <span class="token number">14</span>:31:20 <span class="token number">2023</span> GMT
/var/lib/rancher/k3s/server/tls/client-k3s-cloud-controller.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">25</span> <span class="token number">14</span>:31:20 <span class="token number">2023</span> GMT
/var/lib/rancher/k3s/server/tls/client-k3s-controller.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">25</span> <span class="token number">14</span>:31:20 <span class="token number">2023</span> GMT
/var/lib/rancher/k3s/server/tls/client-kube-apiserver.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">25</span> <span class="token number">14</span>:31:20 <span class="token number">2023</span> GMT
/var/lib/rancher/k3s/server/tls/client-kube-proxy.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">25</span> <span class="token number">14</span>:31:20 <span class="token number">2023</span> GMT
/var/lib/rancher/k3s/server/tls/client-scheduler.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">25</span> <span class="token number">14</span>:31:20 <span class="token number">2023</span> GMT
/var/lib/rancher/k3s/server/tls/request-header-ca.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">22</span> <span class="token number">14</span>:31:20 <span class="token number">2032</span> GMT
/var/lib/rancher/k3s/server/tls/server-ca.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">22</span> <span class="token number">14</span>:31:20 <span class="token number">2032</span> GMT
/var/lib/rancher/k3s/server/tls/serving-kube-apiserver.crt
<span class="token assign-left variable">notAfter</span><span class="token operator">=</span>Nov <span class="token number">25</span> <span class="token number">14</span>:31:20 <span class="token number">2023</span> GMT
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>修改和重启：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 修改系统时间为证书过期前90天或证书过期后</span>
timedatectl set-ntp no
<span class="token function">date</span> <span class="token parameter variable">-s</span> <span class="token number">20220807</span>

<span class="token comment"># 重启K3s服务</span>
<span class="token function">service</span> k3s restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Red Hat 和 CentOS 的额外准备</strong></p>
<p>建议运行以下命令，关闭 <code v-pre>firewalld</code> 防火墙。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> systemctl disable firewalld <span class="token parameter variable">--now</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="所遇到的问题" tabindex="-1"><a class="header-anchor" href="#所遇到的问题" aria-hidden="true">#</a> 所遇到的问题</h2>
<ul>
<li>关于 k3s issue</li>
<li>关于 讨论</li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>更多的节点和安装选择问题看下半部分（下一节）</p>
<blockquote>
<p>1.master节点的防火墙全部关掉，要不然worker可能连不上master</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># systemctl stop firewalld &amp;&amp; systemctl disable firewalld &amp;&amp; iptables -F &amp;&amp; iptables -t nat -F &amp;&amp; iptables -t mangle -F &amp;&amp; iptables -X
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>2.有些.worker可能连不上master，可能有些worker的iptables表混乱了</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># systemctl stop k3s-agent
# systemctl stop docker
# iptables -F &amp;&amp; iptables -t nat -F  &amp;&amp; iptables -t mangle -F
# systemctl start docker
# systemctl stop k3s-agent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>3.有些主机无法根据上面的命令下载docker，提示证书过期</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>adding repo from: https://mydream.ink/utils/container/docker-ce.repo
grabbing file https://mydream.ink/utils/container/docker-ce.repo to /etc/yum.repos.d/docker-ce.repo
Could not fetch/save url https://mydream.ink/utils/container/docker-ce.repo to file /etc/yum.repos.d/docker-ce.repo: [Errno 14] curl#60 - "Peer's Certificate has expired."

因为这些主机的时间不正确，用ntp同步时间即可
# 安装ntp服务器
# yum install -y ntp
# 与一个已知的时间服务器同步
# ntpdate time.nist.gov
# 删除本地时间并设置时区为上海
# rm -rf /etc/localtime
# ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>4.master 配置 --write-kubeconfig</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>--write-kubeconfig ~/.kube/config效果为将配置文件写到k8s默认会用的位置，而不是k3s默认的位置/etc/rancher/k3s/k3s.yaml。后者会导致istio、helm需要额外设置或无法运行。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>5.命令补全</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># yum install -y bash-completion
# source /usr/share/bash-completion/bash_completion
# source &lt;(kubectl completion bash)
# echo "source &lt;(kubectl completion bash)" >> ~/.bashrc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>6.提示需要安装相关软件，根据提示进行安装</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># yum install -y k3s-selinux-0.1.1-rc1.el7.noarch.rpm
# yum install -y container-selinux selinux-policy-base
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<div class="custom-container tip"><p class="custom-container-title">about k3s</p>
<ul>
<li>
<p>K3s 中文文档 - 国外：https://mirror.rancher.cn/</p>
</li>
<li>
<p>K3s 中文文档 - 国内：https://docs.rancher.cn/k3s/</p>
</li>
<li>
<p>K3s 国内镜像站 - 加速：https://mirror.rancher.cn/</p>
</li>
<li>
<p>K3s 系列教程 - 官方制作：https://github.com/kingsd041/k3s-tutorial</p>
</li>
</ul>
<p><strong>代码地址：</strong></p>
<ul>
<li>K3s 仓库地址 - Github：https://github.com/k3s-io</li>
</ul>
<p><strong>扩展(k3d)：</strong></p>
<ul>
<li><a href="https://github.com/inercia/vscode-k3d/" target="_blank" rel="noopener noreferrer">vscode-k3d<ExternalLinkIcon/></a>：VSCode 扩展，用于处理 VSCode 中的 k3d 集群</li>
<li><a href="https://github.com/inercia/k3x" target="_blank" rel="noopener noreferrer">k3x<ExternalLinkIcon/></a>：k3d 的图形接口（用于 Linux）。</li>
<li><a href="https://github.com/AbsaOSS/k3d-action" target="_blank" rel="noopener noreferrer">AbsaOSS/k3d-action<ExternalLinkIcon/></a>：完全可定制的 GitHub Action 来运行轻量级 Kubernetes 集群。</li>
<li><a href="https://github.com/cnrancher/autok3s" target="_blank" rel="noopener noreferrer">AutoK3s<ExternalLinkIcon/></a>：一个轻量级工具，可以帮助在任何地方运行 K3s，包括 k3d provider。</li>
<li><a href="https://github.com/nolar/setup-k3d-k3s" target="_blank" rel="noopener noreferrer">nolar/setup-k3d-k3s<ExternalLinkIcon/></a>：为 GitHub Actions 设置 K3d/K3s。</li>
</ul>
<p><strong>周边项目：</strong></p>
<ul>
<li>
<p><strong>K3s 周边项目 - k3os</strong>：https://github.com/rancher/k3os</p>
<p>完全基于 <code v-pre>K8S</code> 管理的轻量级操作系统</p>
</li>
<li>
<p><strong>K3s 周边项目 - autok3s</strong>：https://github.com/cnrancher/autok3s</p>
<p>用于简化 <code v-pre>K3s</code> 集群部署和管理的轻量级工具</p>
<p>即在阿里云和 <code v-pre>aws</code> 等云服务器上面部署 <code v-pre>k3s</code></p>
</li>
<li>
<p><strong>K3s 周边项目 - k3d</strong>：https://github.com/cnrancher/autok3s</p>
<p>可以在 <code v-pre>k3d</code> 创建容器化的 <code v-pre>k3s</code> 集群  k3d 是一个轻量级包装器，用于在 docker 中运行<a href="https://github.com/rancher/k3s" target="_blank" rel="noopener noreferrer">k3s<ExternalLinkIcon/></a>（Rancher Lab 的最小 Kubernetes 发行版）</p>
<p>可以使用容器在单台计算机上启动多节点 <code v-pre>k3s</code> 集群</p>
</li>
<li>
<p><strong>K3s 周边项目 - harvester</strong>：https://github.com/harvester/harvester</p>
<p>基于 <code v-pre>K8S</code> 构建的开源超融合基础架构(<code v-pre>HCI</code>)软件</p>
<p>旨在替换 <code v-pre>vSphere</code> 和 <code v-pre>Nutanix</code> 的开源替代方案</p>
</li>
<li>
<p><strong>K3s 周边项目 - octopus</strong>：https://github.com/cnrancher/octopus</p>
<p>主要用于边缘计算相关</p>
<p>用于 <code v-pre>K8S</code> 和 <code v-pre>k3s</code> 的轻量级云原生设备管理系统</p>
<p>集群可以将边缘设备作为自定义 <code v-pre>k8s</code> 资源进行管理</p>
</li>
</ul>
</div>
<p><strong>about：</strong></p>
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


