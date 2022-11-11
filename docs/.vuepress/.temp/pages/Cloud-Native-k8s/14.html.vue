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
<nav class="table-of-contents"><ul><li><router-link to="#k3s介绍">k3s介绍</router-link></li><li><router-link to="#k3s和k8s区别">k3s和k8s区别</router-link></li><li><router-link to="#架构">架构</router-link></li><li><router-link to="#新版本默认支持-etcd">新版本默认支持 etcd</router-link></li><li><router-link to="#安装-卸载-k3s">安装（卸载）k3s</router-link></li><li><router-link to="#在线安装的解析">在线安装的解析</router-link><ul><li><router-link to="#指定版本">指定版本</router-link></li><li><router-link to="#指定容器运行时">指定容器运行时</router-link></li></ul></li><li><router-link to="#离线安装解释">离线安装解释</router-link><ul><li><router-link to="#步骤">步骤</router-link></li><li><router-link to="#前提条件">前提条件</router-link></li><li><router-link to="#单结点高可用离线安装">单结点高可用离线安装</router-link></li></ul></li><li><router-link to="#卸载k3s">卸载k3s</router-link></li><li><router-link to="#镜像加速">镜像加速</router-link></li><li><router-link to="#containerd">containerd</router-link><ul><li><router-link to="#架构图">架构图</router-link></li><li><router-link to="#命令">命令</router-link></li><li><router-link to="#containerd的配置管理">containerd的配置管理</router-link></li></ul></li><li><router-link to="#边缘计算">边缘计算</router-link></li><li><router-link to="#安装脚本">安装脚本</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
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
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>关于 单结点 扩展为 高可用 状态，或许这并不是一个很容器实现的地方，我们在前面 details 中看到单结点架构和高可用架构的区别，或许我们应该在制作 <code v-pre>runtime</code> 模块 和 <code v-pre>rootfs</code> 的时候更倾向于实现 高可用。</p>
</div>
<p><strong>架构图：</strong></p>
<p><img src="http://sm.nsddd.top/smhow-it-works-k3s.svg" alt="k3s下载"></p>
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
<p><strong>如何扩充结点</strong>：</p>
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
<h3 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h3>
<p><strong>步骤 1</strong>：部署镜像，本文提供了两种部署方式，分别是<strong>部署私有镜像仓库</strong>和<strong>手动部署镜像</strong>。请在这两种方式中选择一种执行。</p>
<p><strong>步骤 2</strong>：安装 K3s，本文提供了两种安装方式，分别是<strong>单节点安装</strong>和<strong>高可用安装</strong>。完成镜像部署后，请在这两种方式中选择一种执行。</p>
<p><strong>离线升级 K3s 版本</strong>：完成离线安装 K3s 后，您还可以通过脚本升级 K3s 版本，或启用自动升级功能，以保持离线环境中的 K3s 版本与最新的 K3s 版本同步。</p>
<p><strong>请按照以下步骤准备镜像目录和 K3s 二进制文件：</strong></p>
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
</div>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="边缘计算" tabindex="-1"><a class="header-anchor" href="#边缘计算" aria-hidden="true">#</a> 边缘计算</h2>
<p>k3s 非常支持边缘计算，CICD 的部署，可以给我们带来更好的体验。</p>
<div class="custom-container tip"><p class="custom-container-title">边缘计算是什么？</p>
<p>边缘计算是为应用开发者和服务提供商在网络的边缘侧提供云服务和IT环境服务；目标是在靠近数据输入或用户的地方提供计算、存储和网络带宽。</p>
<p>通俗地说：边缘计算本质上是一种服务，就类似于云计算、大数据服务，但这种服务非常靠近用户；为什么要这么近？目的是为了让用户感觉到刷什么内容都特别快。</p>
</div>
<p><strong>提升了Quick start成功率：</strong></p>
<p>我们在交付软件的时候，从以前的给一个Java环境到现在需要一个k8s 环境，k3s则集成了，提供开箱即用的交互体验，降低软件的资源占用，并且使运维部署更方便。</p>
<h2 id="安装脚本" tabindex="-1"><a class="header-anchor" href="#安装脚本" aria-hidden="true">#</a> 安装脚本</h2>
<details class="custom-container details"><summary>k3s 安装脚本</summary>
<p>https://get.k3s.io</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-o</span> noglob

<span class="token comment"># Usage:</span>
<span class="token comment">#   curl ... | ENV_VAR=... sh -</span>
<span class="token comment">#       or</span>
<span class="token comment">#   ENV_VAR=... ./install.sh</span>
<span class="token comment">#</span>
<span class="token comment"># Example:</span>
<span class="token comment">#   Installing a server without traefik:</span>
<span class="token comment">#     curl ... | INSTALL_K3S_EXEC="--disable=traefik" sh -</span>
<span class="token comment">#   Installing an agent to point at a server:</span>
<span class="token comment">#     curl ... | K3S_TOKEN=xxx K3S_URL=https://server-url:6443 sh -</span>
<span class="token comment">#</span>
<span class="token comment"># Environment variables:</span>
<span class="token comment">#   - K3S_*</span>
<span class="token comment">#     Environment variables which begin with K3S_ will be preserved for the</span>
<span class="token comment">#     systemd service to use. Setting K3S_URL without explicitly setting</span>
<span class="token comment">#     a systemd exec command will default the command to "agent", and we</span>
<span class="token comment">#     enforce that K3S_TOKEN or K3S_CLUSTER_SECRET is also set.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_DOWNLOAD</span>
<span class="token comment">#     If set to true will not download k3s hash or binary.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_FORCE_RESTART</span>
<span class="token comment">#     If set to true will always restart the K3s service</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SYMLINK</span>
<span class="token comment">#     If set to 'skip' will not create symlinks, 'force' will overwrite,</span>
<span class="token comment">#     default will symlink if command does not exist in path.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_ENABLE</span>
<span class="token comment">#     If set to true will not enable or start k3s service.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_START</span>
<span class="token comment">#     If set to true will not start k3s service.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_VERSION</span>
<span class="token comment">#     Version of k3s to download from github. Will attempt to download from the</span>
<span class="token comment">#     stable channel if not specified.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_COMMIT</span>
<span class="token comment">#     Commit of k3s to download from temporary cloud storage.</span>
<span class="token comment">#     * (for developer &amp; QA use)</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_BIN_DIR</span>
<span class="token comment">#     Directory to install k3s binary, links, and uninstall script to, or use</span>
<span class="token comment">#     /usr/local/bin as the default</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_BIN_DIR_READ_ONLY</span>
<span class="token comment">#     If set to true will not write files to INSTALL_K3S_BIN_DIR, forces</span>
<span class="token comment">#     setting INSTALL_K3S_SKIP_DOWNLOAD=true</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SYSTEMD_DIR</span>
<span class="token comment">#     Directory to install systemd service and environment files to, or use</span>
<span class="token comment">#     /etc/systemd/system as the default</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_EXEC or script arguments</span>
<span class="token comment">#     Command with flags to use for launching k3s in the systemd service, if</span>
<span class="token comment">#     the command is not specified will default to "agent" if K3S_URL is set</span>
<span class="token comment">#     or "server" if not. The final systemd command resolves to a combination</span>
<span class="token comment">#     of EXEC and script args ($@).</span>
<span class="token comment">#</span>
<span class="token comment">#     The following commands result in the same behavior:</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC="--disable=traefik" sh -s -</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC="server --disable=traefik" sh -s -</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC="server" sh -s - --disable=traefik</span>
<span class="token comment">#       curl ... | sh -s - server --disable=traefik</span>
<span class="token comment">#       curl ... | sh -s - --disable=traefik</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_NAME</span>
<span class="token comment">#     Name of systemd service to create, will default from the k3s exec command</span>
<span class="token comment">#     if not specified. If specified the name will be prefixed with 'k3s-'.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_TYPE</span>
<span class="token comment">#     Type of systemd service to create, will default from the k3s exec command</span>
<span class="token comment">#     if not specified.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SELINUX_WARN</span>
<span class="token comment">#     If set to true will continue if k3s-selinux policy is not found.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_SELINUX_RPM</span>
<span class="token comment">#     If set to true will skip automatic installation of the k3s RPM.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_CHANNEL_URL</span>
<span class="token comment">#     Channel URL for fetching k3s download URL.</span>
<span class="token comment">#     Defaults to 'https://update.k3s.io/v1-release/channels'.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_CHANNEL</span>
<span class="token comment">#     Channel to use for fetching k3s download URL.</span>
<span class="token comment">#     Defaults to 'stable'.</span>

<span class="token assign-left variable">GITHUB_URL</span><span class="token operator">=</span>https://github.com/k3s-io/k3s/releases
<span class="token assign-left variable">STORAGE_URL</span><span class="token operator">=</span>https://storage.googleapis.com/k3s-ci-builds
<span class="token assign-left variable">DOWNLOADER</span><span class="token operator">=</span>

<span class="token comment"># --- helper functions for logs ---</span>
<span class="token function-name function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">'[INFO] '</span> <span class="token string">"<span class="token variable">$@</span>"</span>
<span class="token punctuation">}</span>
<span class="token function-name function">warn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">'[WARN] '</span> <span class="token string">"<span class="token variable">$@</span>"</span> <span class="token operator">></span><span class="token file-descriptor important">&amp;2</span>
<span class="token punctuation">}</span>
<span class="token function-name function">fatal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">'[ERROR] '</span> <span class="token string">"<span class="token variable">$@</span>"</span> <span class="token operator">></span><span class="token file-descriptor important">&amp;2</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- fatal if no systemd or openrc ---</span>
<span class="token function-name function">verify_system</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /sbin/openrc-run <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HAS_OPENRC</span><span class="token operator">=</span>true
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /bin/systemctl <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">type</span> systemctl <span class="token operator">></span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HAS_SYSTEMD</span><span class="token operator">=</span>true
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>
    fatal <span class="token string">'Can not find systemd or openrc to use as a process supervisor for k3s'</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- add quotes to command arguments ---</span>
<span class="token function-name function">quote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">arg</span> <span class="token keyword">in</span> <span class="token string">"<span class="token variable">$@</span>"</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">printf</span> <span class="token string">'%s\n'</span> <span class="token string">"<span class="token variable">$arg</span>"</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">"s/'/'<span class="token entity" title="\\">\\</span><span class="token entity" title="\\">\\</span>''/g;1s/^/'/;\<span class="token variable">$s</span>/\$/'/"</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- add indentation and trailing slash to quoted args ---</span>
<span class="token function-name function">quote_indent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">' \\\n'</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">arg</span> <span class="token keyword">in</span> <span class="token string">"<span class="token variable">$@</span>"</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">printf</span> <span class="token string">'\t%s \\\n'</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span>quote <span class="token string">"<span class="token variable">$arg</span>"</span><span class="token variable">)</span></span>"</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- escape most punctuation characters, except quotes, forward slash, and space ---</span>
<span class="token function-name function">escape</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">'%s'</span> <span class="token string">"<span class="token variable">$@</span>"</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/\([][!#$%&amp;()*;&lt;=>?\_`{|}]\)/\\\1/g;'</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- escape double quotes ---</span>
<span class="token function-name function">escape_dq</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">'%s'</span> <span class="token string">"<span class="token variable">$@</span>"</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/"/\\"/g'</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- ensures $K3S_URL is empty or begins with https://, exiting fatally otherwise ---</span>
<span class="token function-name function">verify_k3s_url</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">"<span class="token variable">${K3S_URL}</span>"</span> <span class="token keyword">in</span>
        <span class="token string">""</span><span class="token punctuation">)</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        https://*<span class="token punctuation">)</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">"Only https:// URLs are supported for K3S_URL (have <span class="token variable">${K3S_URL}</span>)"</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- define needed environment variables ---</span>
<span class="token function-name function">setup_env</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment"># --- use command args if passed or create default ---</span>
    <span class="token keyword">case</span> <span class="token string">"<span class="token variable">$1</span>"</span> <span class="token keyword">in</span>
        <span class="token comment"># --- if we only have flags discover if command should be server or agent ---</span>
        <span class="token punctuation">(</span>-*<span class="token operator">|</span><span class="token string">""</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">${K3S_URL}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span>server
            <span class="token keyword">else</span>
                <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">${K3S_TOKEN}</span>"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">${K3S_TOKEN_FILE}</span>"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">${K3S_CLUSTER_SECRET}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                    fatal <span class="token string">"Defaulted k3s exec command to 'agent' because K3S_URL is defined, but K3S_TOKEN, K3S_TOKEN_FILE or K3S_CLUSTER_SECRET is not defined."</span>
                <span class="token keyword">fi</span>
                <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span>agent
            <span class="token keyword">fi</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token comment"># --- command is provided ---</span>
        <span class="token punctuation">(</span>*<span class="token punctuation">)</span>
            <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span><span class="token variable">$1</span>
            <span class="token builtin class-name">shift</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    verify_k3s_url

    <span class="token assign-left variable">CMD_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${CMD_K3S}</span><span class="token variable"><span class="token variable">$(</span>quote_indent <span class="token string">"<span class="token variable">$@</span>"</span><span class="token variable">)</span></span>"</span>

    <span class="token comment"># --- use systemd name if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_NAME}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s-<span class="token variable">${INSTALL_K3S_NAME}</span>
    <span class="token keyword">else</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${CMD_K3S}</span>"</span> <span class="token operator">=</span> server <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s
        <span class="token keyword">else</span>
            <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s-<span class="token variable">${CMD_K3S}</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- check for invalid characters in system name ---</span>
    <span class="token assign-left variable">valid_chars</span><span class="token operator">=</span><span class="token punctuation">$(</span>printf <span class="token string">'%s'</span> <span class="token string">"<span class="token variable">${SYSTEM_NAME}</span>"</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/[][!#$%&amp;()*;&lt;=>?\_`{|}/[:space:]]/^/g;'</span> <span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${SYSTEM_NAME}</span>"</span> <span class="token operator">!=</span> <span class="token string">"<span class="token variable">${valid_chars}</span>"</span>  <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">invalid_chars</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">printf</span> <span class="token string">'%s'</span> <span class="token string">"<span class="token variable">${valid_chars}</span>"</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/[^^]/ /g'</span><span class="token variable">)</span></span>
        fatal <span class="token string">"Invalid characters for system name:
            <span class="token variable">${SYSTEM_NAME}</span>
            <span class="token variable">${invalid_chars}</span>"</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use sudo if we are not already root ---</span>
    <span class="token assign-left variable">SUDO</span><span class="token operator">=</span>sudo
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SUDO</span><span class="token operator">=</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use systemd type if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_TYPE}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEMD_TYPE</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_TYPE}</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">SYSTEMD_TYPE</span><span class="token operator">=</span>notify
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use binary install directory if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_BIN_DIR}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_BIN_DIR}</span>
    <span class="token keyword">else</span>
        <span class="token comment"># --- use /usr/local/bin if root can write to it, otherwise use /opt/bin if it exists</span>
        <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span>/usr/local/bin
        <span class="token keyword">if</span> <span class="token operator">!</span> <span class="token variable">$SUDO</span> <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">"touch <span class="token variable">${BIN_DIR}</span>/k3s-ro-test &amp;&amp; rm -rf <span class="token variable">${BIN_DIR}</span>/k3s-ro-test"</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /opt/bin <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span>/opt/bin
            <span class="token keyword">fi</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use systemd directory if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SYSTEMD_DIR}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEMD_DIR</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${INSTALL_K3S_SYSTEMD_DIR}</span>"</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">SYSTEMD_DIR</span><span class="token operator">=</span>/etc/systemd/system
    <span class="token keyword">fi</span>

    <span class="token comment"># --- set related files from system name ---</span>
    <span class="token assign-left variable">SERVICE_K3S</span><span class="token operator">=</span><span class="token variable">${SYSTEM_NAME}</span>.service
    <span class="token assign-left variable">UNINSTALL_K3S_SH</span><span class="token operator">=</span><span class="token variable">${UNINSTALL_K3S_SH<span class="token operator">:-</span>${BIN_DIR}</span>/<span class="token variable">${SYSTEM_NAME}</span>-uninstall.sh<span class="token punctuation">}</span>
    <span class="token assign-left variable">KILLALL_K3S_SH</span><span class="token operator">=</span><span class="token variable">${KILLALL_K3S_SH<span class="token operator">:-</span>${BIN_DIR}</span>/k3s-killall.sh<span class="token punctuation">}</span>

    <span class="token comment"># --- use service or environment location depending on systemd/openrc ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_SYSTEMD}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">FILE_K3S_SERVICE</span><span class="token operator">=</span><span class="token variable">${SYSTEMD_DIR}</span>/<span class="token variable">${SERVICE_K3S}</span>
        <span class="token assign-left variable">FILE_K3S_ENV</span><span class="token operator">=</span><span class="token variable">${SYSTEMD_DIR}</span>/<span class="token variable">${SERVICE_K3S}</span>.env
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_OPENRC}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token variable">$SUDO</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/rancher/k3s
        <span class="token assign-left variable">FILE_K3S_SERVICE</span><span class="token operator">=</span>/etc/init.d/<span class="token variable">${SYSTEM_NAME}</span>
        <span class="token assign-left variable">FILE_K3S_ENV</span><span class="token operator">=</span>/etc/rancher/k3s/<span class="token variable">${SYSTEM_NAME}</span>.env
    <span class="token keyword">fi</span>

    <span class="token comment"># --- get hash of config &amp; exec for currently installed k3s ---</span>
    <span class="token assign-left variable">PRE_INSTALL_HASHES</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_installed_hashes<span class="token variable">)</span></span>

    <span class="token comment"># --- if bin directory is read only skip download ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true
    <span class="token keyword">fi</span>

    <span class="token comment"># --- setup channel values</span>
    <span class="token assign-left variable">INSTALL_K3S_CHANNEL_URL</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_CHANNEL_URL<span class="token operator">:-</span>'https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>update.k3s.io<span class="token operator">/</span>v1-release<span class="token operator">/</span>channels'}</span>
    <span class="token assign-left variable">INSTALL_K3S_CHANNEL</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_CHANNEL<span class="token operator">:-</span>'stable'}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- check if skip download environment variable set ---</span>
<span class="token function-name function">can_skip_download_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_DOWNLOAD}</span>"</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_DOWNLOAD}</span>"</span> <span class="token operator">!=</span> binary <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">return</span> <span class="token number">1</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">can_skip_download_selinux</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>                                                        
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_DOWNLOAD}</span>"</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_DOWNLOAD}</span>"</span> <span class="token operator">!=</span> selinux <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span> 
        <span class="token builtin class-name">return</span> <span class="token number">1</span>                                                                     
    <span class="token keyword">fi</span>                                                                               
<span class="token punctuation">}</span>  

<span class="token comment"># --- verify an executable k3s binary is installed ---</span>
<span class="token function-name function">verify_k3s_is_executable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-x</span> <span class="token variable">${BIN_DIR}</span>/k3s <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        fatal <span class="token string">"Executable k3s binary not found at <span class="token variable">${BIN_DIR}</span>/k3s"</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- set arch and suffix, fatal if architecture not supported ---</span>
<span class="token function-name function">setup_verify_arch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">$ARCH</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">ARCH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>
    <span class="token keyword">fi</span>
    <span class="token keyword">case</span> <span class="token variable">$ARCH</span> <span class="token keyword">in</span>
        amd64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>amd64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        x86_64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>amd64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        arm64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        s390x<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>s390x
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        aarch64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        arm*<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">${ARCH}</span>hf
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">"Unsupported architecture <span class="token variable">$ARCH</span>"</span>
    <span class="token keyword">esac</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- verify existence of network downloader executable ---</span>
<span class="token function-name function">verify_downloader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment"># Return failure if it doesn't exist or is no executable</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> $1<span class="token variable">)</span></span>"</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">return</span> <span class="token number">1</span>

    <span class="token comment"># Set verified executable as our downloader program and return success</span>
    <span class="token assign-left variable">DOWNLOADER</span><span class="token operator">=</span><span class="token variable">$1</span>
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create temporary directory and cleanup when done ---</span>
<span class="token function-name function">setup_tmp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">TMP_DIR</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>mktemp <span class="token parameter variable">-d</span> <span class="token parameter variable">-t</span> k3s-install.XXXXXXXXXX<span class="token variable">)</span></span>
    <span class="token assign-left variable">TMP_HASH</span><span class="token operator">=</span><span class="token variable">${TMP_DIR}</span>/k3s.hash
    <span class="token assign-left variable">TMP_BIN</span><span class="token operator">=</span><span class="token variable">${TMP_DIR}</span>/k3s.bin
    <span class="token function-name function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token assign-left variable">code</span><span class="token operator">=</span><span class="token variable">$?</span>
        <span class="token builtin class-name">set</span> +e
        <span class="token builtin class-name">trap</span> - EXIT
        <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">${TMP_DIR}</span>
        <span class="token builtin class-name">exit</span> <span class="token variable">$code</span>
    <span class="token punctuation">}</span>
    <span class="token builtin class-name">trap</span> cleanup INT EXIT
<span class="token punctuation">}</span>

<span class="token comment"># --- use desired k3s version if defined or find version from channel ---</span>
<span class="token function-name function">get_release_version</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_COMMIT}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token string">"commit <span class="token variable">${INSTALL_K3S_COMMIT}</span>"</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_VERSION}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_VERSION}</span>
    <span class="token keyword">else</span>
        info <span class="token string">"Finding release for channel <span class="token variable">${INSTALL_K3S_CHANNEL}</span>"</span>
        <span class="token assign-left variable">version_url</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${INSTALL_K3S_CHANNEL_URL}</span>/<span class="token variable">${INSTALL_K3S_CHANNEL}</span>"</span>
        <span class="token keyword">case</span> <span class="token variable">$DOWNLOADER</span> <span class="token keyword">in</span>
            <span class="token function">curl</span><span class="token punctuation">)</span>
                <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-w</span> <span class="token string">'%{url_effective}'</span> <span class="token parameter variable">-L</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span> <span class="token parameter variable">-o</span> /dev/null <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s|.*/||'</span><span class="token variable">)</span></span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
            <span class="token function">wget</span><span class="token punctuation">)</span>
                <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">wget</span> <span class="token parameter variable">-SqO</span> /dev/null $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> Location <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s|.*/||'</span><span class="token variable">)</span></span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
            *<span class="token punctuation">)</span>
                fatal <span class="token string">"Incorrect downloader executable '<span class="token variable">$DOWNLOADER</span>'"</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
    <span class="token keyword">fi</span>
    info <span class="token string">"Using <span class="token variable">${VERSION_K3S}</span> as release"</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download from github url ---</span>
<span class="token function-name function">download</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token variable">$#</span> <span class="token parameter variable">-eq</span> <span class="token number">2</span> <span class="token punctuation">]</span> <span class="token operator">||</span> fatal <span class="token string">'download needs exactly 2 arguments'</span>

    <span class="token keyword">case</span> <span class="token variable">$DOWNLOADER</span> <span class="token keyword">in</span>
        <span class="token function">curl</span><span class="token punctuation">)</span>
            <span class="token function">curl</span> <span class="token parameter variable">-o</span> <span class="token variable">$1</span> <span class="token parameter variable">-sfL</span> <span class="token variable">$2</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token function">wget</span><span class="token punctuation">)</span>
            <span class="token function">wget</span> <span class="token parameter variable">-qO</span> <span class="token variable">$1</span> <span class="token variable">$2</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">"Incorrect executable '<span class="token variable">$DOWNLOADER</span>'"</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    <span class="token comment"># Abort if download command failed</span>
    <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">||</span> fatal <span class="token string">'Download failed'</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download hash from github url ---</span>
<span class="token function-name function">download_hash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_COMMIT}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HASH_URL</span><span class="token operator">=</span><span class="token variable">${STORAGE_URL}</span>/k3s<span class="token variable">${SUFFIX}</span>-<span class="token variable">${INSTALL_K3S_COMMIT}</span>.sha256sum
    <span class="token keyword">else</span>
        <span class="token assign-left variable">HASH_URL</span><span class="token operator">=</span><span class="token variable">${GITHUB_URL}</span>/download/<span class="token variable">${VERSION_K3S}</span>/sha256sum-<span class="token variable">${ARCH}</span>.txt
    <span class="token keyword">fi</span>
    info <span class="token string">"Downloading hash <span class="token variable">${HASH_URL}</span>"</span>
    download <span class="token variable">${TMP_HASH}</span> <span class="token variable">${HASH_URL}</span>
    <span class="token assign-left variable">HASH_EXPECTED</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">grep</span> <span class="token string">" k3s<span class="token variable">${SUFFIX}</span>$"</span> $<span class="token punctuation">{</span>TMP_HASH<span class="token punctuation">}</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">HASH_EXPECTED</span><span class="token operator">=</span><span class="token variable">${HASH_EXPECTED<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- check hash against installed version ---</span>
<span class="token function-name function">installed_hash_matches</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">${BIN_DIR}</span>/k3s <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HASH_INSTALLED</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>sha256sum $<span class="token punctuation">{</span>BIN_DIR<span class="token punctuation">}</span>/k3s<span class="token variable">)</span></span>
        <span class="token assign-left variable">HASH_INSTALLED</span><span class="token operator">=</span><span class="token variable">${HASH_INSTALLED<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HASH_EXPECTED}</span>"</span> <span class="token operator">=</span> <span class="token string">"<span class="token variable">${HASH_INSTALLED}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token builtin class-name">return</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">return</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download binary from github url ---</span>
<span class="token function-name function">download_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_COMMIT}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">BIN_URL</span><span class="token operator">=</span><span class="token variable">${STORAGE_URL}</span>/k3s<span class="token variable">${SUFFIX}</span>-<span class="token variable">${INSTALL_K3S_COMMIT}</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">BIN_URL</span><span class="token operator">=</span><span class="token variable">${GITHUB_URL}</span>/download/<span class="token variable">${VERSION_K3S}</span>/k3s<span class="token variable">${SUFFIX}</span>
    <span class="token keyword">fi</span>
    info <span class="token string">"Downloading binary <span class="token variable">${BIN_URL}</span>"</span>
    download <span class="token variable">${TMP_BIN}</span> <span class="token variable">${BIN_URL}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- verify downloaded binary hash ---</span>
<span class="token function-name function">verify_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"Verifying binary download"</span>
    <span class="token assign-left variable">HASH_BIN</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>sha256sum $<span class="token punctuation">{</span>TMP_BIN<span class="token punctuation">}</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">HASH_BIN</span><span class="token operator">=</span><span class="token variable">${HASH_BIN<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HASH_EXPECTED}</span>"</span> <span class="token operator">!=</span> <span class="token string">"<span class="token variable">${HASH_BIN}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        fatal <span class="token string">"Download sha256 does not match <span class="token variable">${HASH_EXPECTED}</span>, got <span class="token variable">${HASH_BIN}</span>"</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- setup permissions and move binary to system directory ---</span>
<span class="token function-name function">setup_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">${TMP_BIN}</span>
    info <span class="token string">"Installing k3s to <span class="token variable">${BIN_DIR}</span>/k3s"</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">${TMP_BIN}</span>
    <span class="token variable">$SUDO</span> <span class="token function">mv</span> <span class="token parameter variable">-f</span> <span class="token variable">${TMP_BIN}</span> <span class="token variable">${BIN_DIR}</span>/k3s
<span class="token punctuation">}</span>

<span class="token comment"># --- setup selinux policy ---</span>
<span class="token function-name function">setup_selinux</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token variable">${INSTALL_K3S_CHANNEL}</span> <span class="token keyword">in</span> 
        *testing<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>testing
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *latest<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>latest
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>stable
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    <span class="token assign-left variable">rpm_site</span><span class="token operator">=</span><span class="token string">"rpm.rancher.io"</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${rpm_channel}</span>"</span> <span class="token operator">=</span> <span class="token string">"testing"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_site</span><span class="token operator">=</span><span class="token string">"rpm-testing.rancher.io"</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/os-release <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">.</span> /etc/os-release
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${ID_LIKE<span class="token operator">%%</span><span class="token punctuation">[</span> <span class="token punctuation">]</span>*}</span>"</span> <span class="token operator">=</span> <span class="token string">"suse"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>sle
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>microos
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>zypper
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${VERSION_ID<span class="token operator">%%</span>.*}</span>"</span> <span class="token operator">=</span> <span class="token string">"7"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>el7
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>centos/7
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>yum
    <span class="token keyword">else</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>el8
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>centos/8
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>yum
    <span class="token keyword">fi</span>

    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${package_installer}</span>"</span> <span class="token operator">=</span> <span class="token string">"yum"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/bin/dnf <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>dnf
    <span class="token keyword">fi</span>

    <span class="token assign-left variable">policy_hint</span><span class="token operator">=</span><span class="token string">"please install:
    <span class="token variable">${package_installer}</span> install -y container-selinux
    <span class="token variable">${package_installer}</span> install -y https://<span class="token variable">${rpm_site}</span>/k3s/<span class="token variable">${rpm_channel}</span>/common/<span class="token variable">${rpm_site_infix}</span>/noarch/k3s-selinux-0.4-1.<span class="token variable">${rpm_target}</span>.noarch.rpm
"</span>

    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">$INSTALL_K3S_SKIP_SELINUX_RPM</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">||</span> can_skip_download_selinux <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-d</span> /usr/share/selinux <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">"Skipping installation of SELinux RPM"</span>
    <span class="token keyword">elif</span>  <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${ID_LIKE<span class="token operator">:-</span>}</span>"</span> <span class="token operator">!=</span> coreos <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${VARIANT_ID<span class="token operator">:-</span>}</span>"</span> <span class="token operator">!=</span> coreos <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        install_selinux_rpm <span class="token variable">${rpm_site}</span> <span class="token variable">${rpm_channel}</span> <span class="token variable">${rpm_target}</span> <span class="token variable">${rpm_site_infix}</span>
    <span class="token keyword">fi</span>

    <span class="token assign-left variable">policy_error</span><span class="token operator">=</span>fatal
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">$INSTALL_K3S_SELINUX_WARN</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${ID_LIKE<span class="token operator">:-</span>}</span>"</span> <span class="token operator">=</span> coreos <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${VARIANT_ID<span class="token operator">:-</span>}</span>"</span> <span class="token operator">=</span> coreos <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">policy_error</span><span class="token operator">=</span>warn
    <span class="token keyword">fi</span>

    <span class="token keyword">if</span> <span class="token operator">!</span> <span class="token variable">$SUDO</span> chcon <span class="token parameter variable">-u</span> system_u <span class="token parameter variable">-r</span> object_r <span class="token parameter variable">-t</span> container_runtime_exec_t <span class="token variable">${BIN_DIR}</span>/k3s <span class="token operator">></span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token keyword">if</span> <span class="token variable">$SUDO</span> <span class="token function">grep</span> <span class="token string">'^\s*SELINUX=enforcing'</span> /etc/selinux/config <span class="token operator">></span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token variable">$policy_error</span> <span class="token string">"Failed to apply container_runtime_exec_t to <span class="token variable">${BIN_DIR}</span>/k3s, <span class="token variable">${policy_hint}</span>"</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> /usr/share/selinux/packages/k3s.pp <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/sbin/transactional-update <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            warn <span class="token string">"Please reboot your machine to activate the changes and avoid data loss."</span>
        <span class="token keyword">else</span>
            <span class="token variable">$policy_error</span> <span class="token string">"Failed to find the k3s-selinux policy, <span class="token variable">${policy_hint}</span>"</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">install_selinux_rpm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/redhat-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/centos-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/oracle-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${ID_LIKE<span class="token operator">%%</span><span class="token punctuation">[</span> <span class="token punctuation">]</span>*}</span>"</span> <span class="token operator">=</span> <span class="token string">"suse"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">repodir</span><span class="token operator">=</span>/etc/yum.repos.d
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /etc/zypp/repos.d <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">repodir</span><span class="token operator">=</span>/etc/zypp/repos.d
        <span class="token keyword">fi</span>
        <span class="token builtin class-name">set</span> +o noglob
        <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable">${repodir}</span>/rancher-k3s-common*.repo
        <span class="token builtin class-name">set</span> <span class="token parameter variable">-o</span> noglob
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/redhat-release <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${3}</span>"</span> <span class="token operator">=</span> <span class="token string">"el7"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token variable">$SUDO</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils
            <span class="token variable">$SUDO</span> yum-config-manager <span class="token parameter variable">--enable</span> rhel-7-server-extras-rpms
        <span class="token keyword">fi</span>
        <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${repodir}</span>/rancher-k3s-common.repo <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[rancher-k3s-common-<span class="token variable">${2}</span>]
name=Rancher K3s Common (<span class="token variable">${2}</span>)
baseurl=https://<span class="token variable">${1}</span>/k3s/<span class="token variable">${2}</span>/common/<span class="token variable">${4}</span>/noarch
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://<span class="token variable">${1}</span>/public.key
EOF</span>
        <span class="token keyword">case</span> <span class="token variable">${3}</span> <span class="token keyword">in</span>
        sle<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">"zypper --gpg-auto-import-keys"</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${TRANSACTIONAL_UPDATE=false}</span>"</span> <span class="token operator">!=</span> <span class="token string">"true"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/sbin/transactional-update <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">"transactional-update --no-selfupdate -d run <span class="token variable">${rpm_installer}</span>"</span>
                <span class="token builtin class-name">:</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_START<span class="token operator">:=</span>true}</span>"</span>
            <span class="token keyword">fi</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">"yum"</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${rpm_installer}</span>"</span> <span class="token operator">=</span> <span class="token string">"yum"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/bin/dnf <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span>dnf
        <span class="token keyword">fi</span>
        <span class="token comment"># shellcheck disable=SC2086</span>
        <span class="token variable">$SUDO</span> <span class="token variable">${rpm_installer}</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token string">"k3s-selinux"</span>
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">return</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download and verify k3s ---</span>
<span class="token function-name function">download_and_verify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> can_skip_download_binary<span class="token punctuation">;</span> <span class="token keyword">then</span>
       info <span class="token string">'Skipping k3s download and verify'</span>
       verify_k3s_is_executable
       <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    setup_verify_arch
    verify_downloader <span class="token function">curl</span> <span class="token operator">||</span> verify_downloader <span class="token function">wget</span> <span class="token operator">||</span> fatal <span class="token string">'Can not find curl or wget for downloading files'</span>
    setup_tmp
    get_release_version
    download_hash

    <span class="token keyword">if</span> installed_hash_matches<span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">'Skipping binary downloaded, installed k3s matches hash'</span>
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    download_binary
    verify_binary
    setup_binary
<span class="token punctuation">}</span>

<span class="token comment"># --- add additional utility links ---</span>
<span class="token function-name function">create_symlinks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SYMLINK}</span>"</span> <span class="token operator">=</span> skip <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token keyword">for</span> <span class="token for-or-select variable">cmd</span> <span class="token keyword">in</span> kubectl crictl ctr<span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-e</span> <span class="token variable">${BIN_DIR}</span>/<span class="token variable">${cmd}</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SYMLINK}</span>"</span> <span class="token operator">=</span> force <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">which_cmd</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> $<span class="token punctuation">{</span>cmd<span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null <span class="token operator">||</span> <span class="token boolean">true</span><span class="token variable">)</span></span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">${which_cmd}</span>"</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SYMLINK}</span>"</span> <span class="token operator">=</span> force <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                info <span class="token string">"Creating <span class="token variable">${BIN_DIR}</span>/<span class="token variable">${cmd}</span> symlink to k3s"</span>
                <span class="token variable">$SUDO</span> <span class="token function">ln</span> <span class="token parameter variable">-sf</span> k3s <span class="token variable">${BIN_DIR}</span>/<span class="token variable">${cmd}</span>
            <span class="token keyword">else</span>
                info <span class="token string">"Skipping <span class="token variable">${BIN_DIR}</span>/<span class="token variable">${cmd}</span> symlink to k3s, command exists in PATH at <span class="token variable">${which_cmd}</span>"</span>
            <span class="token keyword">fi</span>
        <span class="token keyword">else</span>
            info <span class="token string">"Skipping <span class="token variable">${BIN_DIR}</span>/<span class="token variable">${cmd}</span> symlink to k3s, already exists"</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create killall script ---</span>
<span class="token function-name function">create_killall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    info <span class="token string">"Creating killall script <span class="token variable">${KILLALL_K3S_SH}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${KILLALL_K3S_SH}</span> <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token punctuation">\</span>EOF
<span class="token comment">#!/bin/sh</span>
<span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">exec</span> <span class="token function">sudo</span> <span class="token variable">$0</span> <span class="token variable">$@</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">bin</span> <span class="token keyword">in</span> /var/lib/rancher/k3s/data/**/bin/<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable">$bin</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$bin</span><span class="token builtin class-name">:</span><span class="token variable">$bin</span>/aux
<span class="token keyword">done</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">service</span> <span class="token keyword">in</span> /etc/systemd/system/k3s*.service<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-s</span> <span class="token variable">$service</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemctl stop <span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $service<span class="token variable">)</span></span>
<span class="token keyword">done</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">service</span> <span class="token keyword">in</span> /etc/init.d/k3s*<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">$service</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$service</span> stop
<span class="token keyword">done</span>

<span class="token function-name function">pschildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">ps</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">ppid</span><span class="token operator">=</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">pid</span><span class="token operator">=</span> <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/^\s*//g; s/\s\s*/\t/g;'</span> <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token function">grep</span> <span class="token parameter variable">-w</span> <span class="token string">"^<span class="token variable">$1</span>"</span> <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token function">cut</span> <span class="token parameter variable">-f2</span>
<span class="token punctuation">}</span>

<span class="token function-name function">pstree</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">pid</span> <span class="token keyword">in</span> <span class="token variable">$@</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">echo</span> <span class="token variable">$pid</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">child</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span>pschildren $pid<span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
            pstree <span class="token variable">$child</span>
        <span class="token keyword">done</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token function-name function">killtree</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable"><span class="token variable">$(</span>
        <span class="token punctuation">{</span> <span class="token builtin class-name">set</span> +x<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null<span class="token punctuation">;</span>
        pstree $@<span class="token punctuation">;</span>
        <span class="token builtin class-name">set</span> -x<span class="token punctuation">;</span>
    <span class="token variable">)</span></span> <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">getshims</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">ps</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">pid</span><span class="token operator">=</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">args</span><span class="token operator">=</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/^ *//; s/\s\s*/\t/;'</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-w</span> <span class="token string">'k3s/data/[^/]*/bin/containerd-shim'</span> <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f1</span>
<span class="token punctuation">}</span>

killtree <span class="token variable"><span class="token variable">$(</span><span class="token punctuation">{</span> <span class="token builtin class-name">set</span> +x<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null<span class="token punctuation">;</span> getshims<span class="token punctuation">;</span> <span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span><span class="token variable">)</span></span>

<span class="token function-name function">do_unmount_and_remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">set</span> +x
    <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> _ path _<span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token keyword">case</span> <span class="token string">"<span class="token variable">$path</span>"</span> <span class="token keyword">in</span> <span class="token variable">$1</span>*<span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$path</span>"</span> <span class="token punctuation">;</span><span class="token punctuation">;</span> <span class="token keyword">esac</span>
    <span class="token keyword">done</span> <span class="token operator">&lt;</span> /proc/self/mounts <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">'umount "$0" &amp;&amp; rm -rf "$0"'</span>
    <span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>
<span class="token punctuation">}</span>

do_unmount_and_remove <span class="token string">'/run/k3s'</span>
do_unmount_and_remove <span class="token string">'/var/lib/rancher/k3s'</span>
do_unmount_and_remove <span class="token string">'/var/lib/kubelet/pods'</span>
do_unmount_and_remove <span class="token string">'/var/lib/kubelet/plugins'</span>
do_unmount_and_remove <span class="token string">'/run/netns/cni-'</span>

<span class="token comment"># Remove CNI namespaces</span>
<span class="token function">ip</span> netns show <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null <span class="token operator">|</span> <span class="token function">grep</span> cni- <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token function">ip</span> netns delete

<span class="token comment"># Delete network interface(s) that match 'master cni0'</span>
<span class="token function">ip</span> <span class="token function">link</span> show <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">'master cni0'</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> ignore iface ignore<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token assign-left variable">iface</span><span class="token operator">=</span><span class="token variable">${iface<span class="token operator">%%</span>@*}</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">$iface</span>"</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token function">ip</span> <span class="token function">link</span> delete <span class="token variable">$iface</span>
<span class="token keyword">done</span>
<span class="token function">ip</span> <span class="token function">link</span> delete cni0
<span class="token function">ip</span> <span class="token function">link</span> delete flannel.1
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-v6.1
<span class="token function">ip</span> <span class="token function">link</span> delete kube-ipvs0
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-wg
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-wg-v6
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/cni/
iptables-save <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> KUBE- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> CNI- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-iv</span> flannel <span class="token operator">|</span> iptables-restore
ip6tables-save <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> KUBE- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> CNI- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-iv</span> flannel <span class="token operator">|</span> ip6tables-restore
EOF
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">${KILLALL_K3S_SH}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">${KILLALL_K3S_SH}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create uninstall script ---</span>
<span class="token function-name function">create_uninstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    info <span class="token string">"Creating uninstall script <span class="token variable">${UNINSTALL_K3S_SH}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${UNINSTALL_K3S_SH}</span> <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/sh
set -x
[ \<span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> -eq 0 ] || exec sudo \<span class="token variable">$0</span> \<span class="token variable">$@</span>

<span class="token variable">${KILLALL_K3S_SH}</span>

if command -v systemctl; then
    systemctl disable <span class="token variable">${SYSTEM_NAME}</span>
    systemctl reset-failed <span class="token variable">${SYSTEM_NAME}</span>
    systemctl daemon-reload
fi
if command -v rc-update; then
    rc-update delete <span class="token variable">${SYSTEM_NAME}</span> default
fi

rm -f <span class="token variable">${FILE_K3S_SERVICE}</span>
rm -f <span class="token variable">${FILE_K3S_ENV}</span>

remove_uninstall() {
    rm -f <span class="token variable">${UNINSTALL_K3S_SH}</span>
}
trap remove_uninstall EXIT

if (ls <span class="token variable">${SYSTEMD_DIR}</span>/k3s*.service || ls /etc/init.d/k3s*) >/dev/null 2>&amp;1; then
    set +x; echo 'Additional k3s services installed, skipping uninstall of k3s'; set -x
    exit
fi

for cmd in kubectl crictl ctr; do
    if [ -L <span class="token variable">${BIN_DIR}</span>/\<span class="token variable">$cmd</span> ]; then
        rm -f <span class="token variable">${BIN_DIR}</span>/\<span class="token variable">$cmd</span>
    fi
done

rm -rf /etc/rancher/k3s
rm -rf /run/k3s
rm -rf /run/flannel
rm -rf /var/lib/rancher/k3s
rm -rf /var/lib/kubelet
rm -f <span class="token variable">${BIN_DIR}</span>/k3s
rm -f <span class="token variable">${KILLALL_K3S_SH}</span>

if type yum >/dev/null 2>&amp;1; then
    yum remove -y k3s-selinux
    rm -f /etc/yum.repos.d/rancher-k3s-common*.repo
elif type zypper >/dev/null 2>&amp;1; then
    uninstall_cmd="zypper remove -y k3s-selinux"
    if [ "\<span class="token variable">${TRANSACTIONAL_UPDATE=false}</span>" != "true" ] &amp;&amp; [ -x /usr/sbin/transactional-update ]; then
        uninstall_cmd="transactional-update --no-selfupdate -d run \<span class="token variable">$uninstall_cmd</span>"
    fi
    \<span class="token variable">$uninstall_cmd</span>
    rm -f /etc/zypp/repos.d/rancher-k3s-common*.repo
fi
EOF</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">${UNINSTALL_K3S_SH}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">${UNINSTALL_K3S_SH}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- disable current service if loaded --</span>
<span class="token function-name function">systemd_disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$SUDO</span> systemctl disable <span class="token variable">${SYSTEM_NAME}</span> <span class="token operator">></span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">||</span> <span class="token boolean">true</span>
    <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/systemd/system/<span class="token variable">${SERVICE_K3S}</span> <span class="token operator">||</span> <span class="token boolean">true</span>
    <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/systemd/system/<span class="token variable">${SERVICE_K3S}</span>.env <span class="token operator">||</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- capture current env and create file containing k3s_ variables ---</span>
<span class="token function-name function">create_env_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"env: Creating environment file <span class="token variable">${FILE_K3S_ENV}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token function">touch</span> <span class="token variable">${FILE_K3S_ENV}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> 0600 <span class="token variable">${FILE_K3S_ENV}</span>
    <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token builtin class-name">export</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> x <span class="token function">v</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$v</span><span class="token punctuation">;</span> <span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">'^(K3S|CONTAINERD)_'</span> <span class="token operator">|</span> <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${FILE_K3S_ENV}</span> <span class="token operator">></span>/dev/null
    <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token builtin class-name">export</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> x <span class="token function">v</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$v</span><span class="token punctuation">;</span> <span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-Ei</span> <span class="token string">'^(NO|HTTP|HTTPS)_PROXY'</span> <span class="token operator">|</span> <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> <span class="token variable">${FILE_K3S_ENV}</span> <span class="token operator">></span>/dev/null
<span class="token punctuation">}</span>

<span class="token comment"># --- write systemd service file ---</span>
<span class="token function-name function">create_systemd_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"systemd: Creating service file <span class="token variable">${FILE_K3S_SERVICE}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${FILE_K3S_SERVICE}</span> <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[Unit]
Description=Lightweight Kubernetes
Documentation=https://k3s.io
Wants=network-online.target
After=network-online.target

[Install]
WantedBy=multi-user.target

[Service]
Type=<span class="token variable">${SYSTEMD_TYPE}</span>
EnvironmentFile=-/etc/default/%N
EnvironmentFile=-/etc/sysconfig/%N
EnvironmentFile=-<span class="token variable">${FILE_K3S_ENV}</span>
KillMode=process
Delegate=yes
# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNOFILE=1048576
LimitNPROC=infinity
LimitCORE=infinity
TasksMax=infinity
TimeoutStartSec=0
Restart=always
RestartSec=5s
ExecStartPre=/bin/sh -xc '! /usr/bin/systemctl is-enabled --quiet nm-cloud-setup.service'
ExecStartPre=-/sbin/modprobe br_netfilter
ExecStartPre=-/sbin/modprobe overlay
ExecStart=<span class="token variable">${BIN_DIR}</span>/k3s <span class="token entity" title="\\">\\</span>
    <span class="token variable">${CMD_K3S_EXEC}</span>

EOF</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- write openrc service file ---</span>
<span class="token function-name function">create_openrc_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">LOG_FILE</span><span class="token operator">=</span>/var/log/<span class="token variable">${SYSTEM_NAME}</span>.log

    info <span class="token string">"openrc: Creating service file <span class="token variable">${FILE_K3S_SERVICE}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${FILE_K3S_SERVICE}</span> <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/sbin/openrc-run

depend() {
    after network-online
    want cgroups
}

start_pre() {
    rm -f /tmp/k3s.*
}

supervisor=supervise-daemon
name=<span class="token variable">${SYSTEM_NAME}</span>
command="<span class="token variable">${BIN_DIR}</span>/k3s"
command_args="<span class="token variable"><span class="token variable">$(</span>escape_dq <span class="token string">"<span class="token variable">${CMD_K3S_EXEC}</span>"</span><span class="token variable">)</span></span>
    >><span class="token variable">${LOG_FILE}</span> 2>&amp;1"

output_log=<span class="token variable">${LOG_FILE}</span>
error_log=<span class="token variable">${LOG_FILE}</span>

pidfile="/var/run/<span class="token variable">${SYSTEM_NAME}</span>.pid"
respawn_delay=5
respawn_max=0

set -o allexport
if [ -f /etc/environment ]; then source /etc/environment; fi
if [ -f <span class="token variable">${FILE_K3S_ENV}</span> ]; then source <span class="token variable">${FILE_K3S_ENV}</span>; fi
set +o allexport
EOF</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> 0755 <span class="token variable">${FILE_K3S_SERVICE}</span>

    <span class="token variable">$SUDO</span> <span class="token function">tee</span> /etc/logrotate.d/<span class="token variable">${SYSTEM_NAME}</span> <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
<span class="token variable">${LOG_FILE}</span> {
	missingok
	notifempty
	copytruncate
}
EOF</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- write systemd or openrc service file ---</span>
<span class="token function-name function">create_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_SYSTEMD}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> create_systemd_service_file
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_OPENRC}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> create_openrc_service_file
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- get hashes of the current k3s bin and service files</span>
<span class="token function-name function">get_installed_hashes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$SUDO</span> sha256sum <span class="token variable">${BIN_DIR}</span>/k3s <span class="token variable">${FILE_K3S_SERVICE}</span> <span class="token variable">${FILE_K3S_ENV}</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">||</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- enable and start systemd service ---</span>
<span class="token function-name function">systemd_enable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"systemd: Enabling <span class="token variable">${SYSTEM_NAME}</span> unit"</span>
    <span class="token variable">$SUDO</span> systemctl <span class="token builtin class-name">enable</span> <span class="token variable">${FILE_K3S_SERVICE}</span> <span class="token operator">></span>/dev/null
    <span class="token variable">$SUDO</span> systemctl daemon-reload <span class="token operator">></span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">systemd_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"systemd: Starting <span class="token variable">${SYSTEM_NAME}</span>"</span>
    <span class="token variable">$SUDO</span> systemctl restart <span class="token variable">${SYSTEM_NAME}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- enable and start openrc service ---</span>
<span class="token function-name function">openrc_enable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"openrc: Enabling <span class="token variable">${SYSTEM_NAME}</span> service for default runlevel"</span>
    <span class="token variable">$SUDO</span> rc-update <span class="token function">add</span> <span class="token variable">${SYSTEM_NAME}</span> default <span class="token operator">></span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">openrc_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"openrc: Starting <span class="token variable">${SYSTEM_NAME}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token variable">${FILE_K3S_SERVICE}</span> restart
<span class="token punctuation">}</span>

<span class="token comment"># --- startup systemd or openrc service ---</span>
<span class="token function-name function">service_enable_and_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token string">"/proc/cgroups"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">grep</span> memory /proc/cgroups <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> n n n enabled<span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> $enabled<span class="token punctuation">;</span> <span class="token keyword">done</span><span class="token variable">)</span></span>"</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">then</span>
        info <span class="token string">'Failed to find memory cgroup, you may need to add "cgroup_memory=1 cgroup_enable=memory" to your linux cmdline (/boot/cmdline.txt on a Raspberry Pi)'</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_ENABLE}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_SYSTEMD}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemd_enable
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_OPENRC}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> openrc_enable

    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_START}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token assign-left variable">POST_INSTALL_HASHES</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_installed_hashes<span class="token variable">)</span></span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${PRE_INSTALL_HASHES}</span>"</span> <span class="token operator">=</span> <span class="token string">"<span class="token variable">${POST_INSTALL_HASHES}</span>"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_FORCE_RESTART}</span>"</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">'No change detected so skipping service start'</span>
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_SYSTEMD}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemd_start
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_OPENRC}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> openrc_start
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- re-evaluate args to include env command ---</span>
<span class="token builtin class-name">eval</span> <span class="token builtin class-name">set</span> -- <span class="token variable"><span class="token variable">$(</span>escape <span class="token string">"<span class="token variable">${INSTALL_K3S_EXEC}</span>"</span><span class="token variable">)</span></span> <span class="token variable"><span class="token variable">$(</span>quote <span class="token string">"<span class="token variable">$@</span>"</span><span class="token variable">)</span></span>

<span class="token comment"># --- run the install process --</span>
<span class="token punctuation">{</span>
    verify_system
    setup_env <span class="token string">"<span class="token variable">$@</span>"</span>
    download_and_verify
    setup_selinux
    create_symlinks
    create_killall
    create_uninstall
    systemd_disable
    create_env_file
    create_service_file
    service_enable_and_start
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<details class="custom-container details"><summary>国内镜像加速~</summary>
<p>https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-o</span> noglob

<span class="token comment"># Usage:</span>
<span class="token comment">#   curl ... | ENV_VAR=... sh -</span>
<span class="token comment">#       or</span>
<span class="token comment">#   ENV_VAR=... ./install.sh</span>
<span class="token comment">#</span>
<span class="token comment"># Example:</span>
<span class="token comment">#   Installing a server without traefik:</span>
<span class="token comment">#     curl ... | INSTALL_K3S_EXEC="--disable=traefik" sh -</span>
<span class="token comment">#   Installing an agent to point at a server:</span>
<span class="token comment">#     curl ... | K3S_TOKEN=xxx K3S_URL=https://server-url:6443 sh -</span>
<span class="token comment">#</span>
<span class="token comment"># Environment variables:</span>
<span class="token comment">#   - K3S_*</span>
<span class="token comment">#     Environment variables which begin with K3S_ will be preserved for the</span>
<span class="token comment">#     systemd service to use. Setting K3S_URL without explicitly setting</span>
<span class="token comment">#     a systemd exec command will default the command to "agent", and we</span>
<span class="token comment">#     enforce that K3S_TOKEN or K3S_CLUSTER_SECRET is also set.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_DOWNLOAD</span>
<span class="token comment">#     If set to true will not download k3s hash or binary.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_FORCE_RESTART</span>
<span class="token comment">#     If set to true will always restart the K3s service</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SYMLINK</span>
<span class="token comment">#     If set to 'skip' will not create symlinks, 'force' will overwrite,</span>
<span class="token comment">#     default will symlink if command does not exist in path.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_ENABLE</span>
<span class="token comment">#     If set to true will not enable or start k3s service.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_START</span>
<span class="token comment">#     If set to true will not start k3s service.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_VERSION</span>
<span class="token comment">#     Version of k3s to download from github. Will attempt to download from the</span>
<span class="token comment">#     stable channel if not specified.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_COMMIT</span>
<span class="token comment">#     Commit of k3s to download from temporary cloud storage.</span>
<span class="token comment">#     * (for developer &amp; QA use)</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_BIN_DIR</span>
<span class="token comment">#     Directory to install k3s binary, links, and uninstall script to, or use</span>
<span class="token comment">#     /usr/local/bin as the default</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_BIN_DIR_READ_ONLY</span>
<span class="token comment">#     If set to true will not write files to INSTALL_K3S_BIN_DIR, forces</span>
<span class="token comment">#     setting INSTALL_K3S_SKIP_DOWNLOAD=true</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SYSTEMD_DIR</span>
<span class="token comment">#     Directory to install systemd service and environment files to, or use</span>
<span class="token comment">#     /etc/systemd/system as the default</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_EXEC or script arguments</span>
<span class="token comment">#     Command with flags to use for launching k3s in the systemd service, if</span>
<span class="token comment">#     the command is not specified will default to "agent" if K3S_URL is set</span>
<span class="token comment">#     or "server" if not. The final systemd command resolves to a combination</span>
<span class="token comment">#     of EXEC and script args ($@).</span>
<span class="token comment">#</span>
<span class="token comment">#     The following commands result in the same behavior:</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC="--disable=traefik" sh -s -</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC="server --disable=traefik" sh -s -</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC="server" sh -s - --disable=traefik</span>
<span class="token comment">#       curl ... | sh -s - server --disable=traefik</span>
<span class="token comment">#       curl ... | sh -s - --disable=traefik</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_NAME</span>
<span class="token comment">#     Name of systemd service to create, will default from the k3s exec command</span>
<span class="token comment">#     if not specified. If specified the name will be prefixed with 'k3s-'.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_TYPE</span>
<span class="token comment">#     Type of systemd service to create, will default from the k3s exec command</span>
<span class="token comment">#     if not specified.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_MIRROR</span>
<span class="token comment">#     For Chinese users, set INSTALL_K3S_MIRROR=cn to use the mirror address to accelerate</span>
<span class="token comment">#     k3s binary file download, and the default mirror address is mirror_k3s.rancher.cn</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SELINUX_WARN</span>
<span class="token comment">#     If set to true will continue if k3s-selinux policy is not found.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_SELINUX_RPM</span>
<span class="token comment">#     If set to true will skip automatic installation of the k3s RPM.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_CHANNEL_URL</span>
<span class="token comment">#     Channel URL for fetching k3s download URL.</span>
<span class="token comment">#     Defaults to 'https://update.k3s.io/v1-release/channels'.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_CHANNEL</span>
<span class="token comment">#     Channel to use for fetching k3s download URL.</span>
<span class="token comment">#     Defaults to 'stable'.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_REGISTRIES</span>
<span class="token comment">#     Setup a custom Registry or Mirror</span>
<span class="token comment">#     Defaults to null.</span>

<span class="token assign-left variable">GITHUB_URL</span><span class="token operator">=</span>https://github.com/k3s-io/k3s/releases
<span class="token assign-left variable">STORAGE_URL</span><span class="token operator">=</span>https://storage.googleapis.com/k3s-ci-builds
<span class="token assign-left variable">DOWNLOADER</span><span class="token operator">=</span>
<span class="token assign-left variable">INSTALL_K3S_MIRROR_URL</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_MIRROR_URL<span class="token operator">:-</span>'rancher-mirror.oss-cn-beijing.aliyuncs.com'}</span>

<span class="token comment"># --- helper functions for logs ---</span>
<span class="token function-name function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">'[INFO] '</span> <span class="token string">"<span class="token variable">$@</span>"</span>
<span class="token punctuation">}</span>
<span class="token function-name function">warn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">'[WARN] '</span> <span class="token string">"<span class="token variable">$@</span>"</span> <span class="token operator">></span><span class="token file-descriptor important">&amp;2</span>
<span class="token punctuation">}</span>
<span class="token function-name function">fatal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">'[ERROR] '</span> <span class="token string">"<span class="token variable">$@</span>"</span> <span class="token operator">></span><span class="token file-descriptor important">&amp;2</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- fatal if no systemd or openrc ---</span>
<span class="token function-name function">verify_system</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /sbin/openrc-run <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HAS_OPENRC</span><span class="token operator">=</span>true
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /bin/systemctl <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">type</span> systemctl <span class="token operator">></span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HAS_SYSTEMD</span><span class="token operator">=</span>true
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>
    fatal <span class="token string">'Can not find systemd or openrc to use as a process supervisor for k3s'</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- add quotes to command arguments ---</span>
<span class="token function-name function">quote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">arg</span> <span class="token keyword">in</span> <span class="token string">"<span class="token variable">$@</span>"</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">printf</span> <span class="token string">'%s\n'</span> <span class="token string">"<span class="token variable">$arg</span>"</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">"s/'/'<span class="token entity" title="\\">\\</span><span class="token entity" title="\\">\\</span>''/g;1s/^/'/;\<span class="token variable">$s</span>/\$/'/"</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- add indentation and trailing slash to quoted args ---</span>
<span class="token function-name function">quote_indent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">' \\\n'</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">arg</span> <span class="token keyword">in</span> <span class="token string">"<span class="token variable">$@</span>"</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">printf</span> <span class="token string">'\t%s \\\n'</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span>quote <span class="token string">"<span class="token variable">$arg</span>"</span><span class="token variable">)</span></span>"</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- escape most punctuation characters, except quotes, forward slash, and space ---</span>
<span class="token function-name function">escape</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">'%s'</span> <span class="token string">"<span class="token variable">$@</span>"</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/\([][!#$%&amp;()*;&lt;=>?\_`{|}]\)/\\\1/g;'</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- escape double quotes ---</span>
<span class="token function-name function">escape_dq</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">'%s'</span> <span class="token string">"<span class="token variable">$@</span>"</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/"/\\"/g'</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- ensures $K3S_URL is empty or begins with https://, exiting fatally otherwise ---</span>
<span class="token function-name function">verify_k3s_url</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">"<span class="token variable">${K3S_URL}</span>"</span> <span class="token keyword">in</span>
        <span class="token string">""</span><span class="token punctuation">)</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        https://*<span class="token punctuation">)</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">"Only https:// URLs are supported for K3S_URL (have <span class="token variable">${K3S_URL}</span>)"</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- Setup a custom Registry or Mirror</span>
<span class="token function-name function">setup_registry</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">REGISTRIES_FILE</span><span class="token operator">=</span><span class="token string">"/etc/rancher/k3s/registries.yaml"</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_REGISTRIES}</span>"</span> <span class="token parameter variable">-a</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">"<span class="token variable">$REGISTRIES_FILE</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">INSTALL_K3S_REGISTRIES</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">echo</span> $<span class="token punctuation">{</span>INSTALL_K3S_REGISTRIES<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{gsub(/,/," "); print $0}'</span><span class="token variable">`</span></span>
        <span class="token variable">$SUDO</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable"><span class="token variable">`</span><span class="token function">dirname</span> $REGISTRIES_FILE<span class="token variable">`</span></span>
        <span class="token variable">$SUDO</span> <span class="token function">cat</span> <span class="token operator">>></span> <span class="token variable">$REGISTRIES_FILE</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  "docker.io":
    endpoint:
EOF</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">registry</span> <span class="token keyword">in</span> <span class="token variable">${INSTALL_K3S_REGISTRIES}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
            <span class="token builtin class-name">echo</span> <span class="token string">"      - <span class="token variable">$registry</span>"</span> <span class="token operator">>></span> <span class="token string">"<span class="token variable">$REGISTRIES_FILE</span>"</span>
        <span class="token keyword">done</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- define needed environment variables ---</span>
<span class="token function-name function">setup_env</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment"># --- use command args if passed or create default ---</span>
    <span class="token keyword">case</span> <span class="token string">"<span class="token variable">$1</span>"</span> <span class="token keyword">in</span>
        <span class="token comment"># --- if we only have flags discover if command should be server or agent ---</span>
        <span class="token punctuation">(</span>-*<span class="token operator">|</span><span class="token string">""</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">${K3S_URL}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span>server
            <span class="token keyword">else</span>
                <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">${K3S_TOKEN}</span>"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">${K3S_TOKEN_FILE}</span>"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">${K3S_CLUSTER_SECRET}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                    fatal <span class="token string">"Defaulted k3s exec command to 'agent' because K3S_URL is defined, but K3S_TOKEN, K3S_TOKEN_FILE or K3S_CLUSTER_SECRET is not defined."</span>
                <span class="token keyword">fi</span>
                <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span>agent
            <span class="token keyword">fi</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token comment"># --- command is provided ---</span>
        <span class="token punctuation">(</span>*<span class="token punctuation">)</span>
            <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span><span class="token variable">$1</span>
            <span class="token builtin class-name">shift</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    verify_k3s_url

    <span class="token assign-left variable">CMD_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${CMD_K3S}</span><span class="token variable"><span class="token variable">$(</span>quote_indent <span class="token string">"<span class="token variable">$@</span>"</span><span class="token variable">)</span></span>"</span>

    <span class="token comment"># --- use systemd name if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_NAME}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s-<span class="token variable">${INSTALL_K3S_NAME}</span>
    <span class="token keyword">else</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${CMD_K3S}</span>"</span> <span class="token operator">=</span> server <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s
        <span class="token keyword">else</span>
            <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s-<span class="token variable">${CMD_K3S}</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- check for invalid characters in system name ---</span>
    <span class="token assign-left variable">valid_chars</span><span class="token operator">=</span><span class="token punctuation">$(</span>printf <span class="token string">'%s'</span> <span class="token string">"<span class="token variable">${SYSTEM_NAME}</span>"</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/[][!#$%&amp;()*;&lt;=>?\_`{|}/[:space:]]/^/g;'</span> <span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${SYSTEM_NAME}</span>"</span> <span class="token operator">!=</span> <span class="token string">"<span class="token variable">${valid_chars}</span>"</span>  <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">invalid_chars</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">printf</span> <span class="token string">'%s'</span> <span class="token string">"<span class="token variable">${valid_chars}</span>"</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/[^^]/ /g'</span><span class="token variable">)</span></span>
        fatal <span class="token string">"Invalid characters for system name:
            <span class="token variable">${SYSTEM_NAME}</span>
            <span class="token variable">${invalid_chars}</span>"</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use sudo if we are not already root ---</span>
    <span class="token assign-left variable">SUDO</span><span class="token operator">=</span>sudo
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SUDO</span><span class="token operator">=</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use systemd type if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_TYPE}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEMD_TYPE</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_TYPE}</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">SYSTEMD_TYPE</span><span class="token operator">=</span>notify
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use binary install directory if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_BIN_DIR}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_BIN_DIR}</span>
    <span class="token keyword">else</span>
        <span class="token comment"># --- use /usr/local/bin if root can write to it, otherwise use /opt/bin if it exists</span>
        <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span>/usr/local/bin
        <span class="token keyword">if</span> <span class="token operator">!</span> <span class="token variable">$SUDO</span> <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">"touch <span class="token variable">${BIN_DIR}</span>/k3s-ro-test &amp;&amp; rm -rf <span class="token variable">${BIN_DIR}</span>/k3s-ro-test"</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /opt/bin <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span>/opt/bin
            <span class="token keyword">fi</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use systemd directory if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SYSTEMD_DIR}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEMD_DIR</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${INSTALL_K3S_SYSTEMD_DIR}</span>"</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">SYSTEMD_DIR</span><span class="token operator">=</span>/etc/systemd/system
    <span class="token keyword">fi</span>

    <span class="token comment"># --- set related files from system name ---</span>
    <span class="token assign-left variable">SERVICE_K3S</span><span class="token operator">=</span><span class="token variable">${SYSTEM_NAME}</span>.service
    <span class="token assign-left variable">UNINSTALL_K3S_SH</span><span class="token operator">=</span><span class="token variable">${UNINSTALL_K3S_SH<span class="token operator">:-</span>${BIN_DIR}</span>/<span class="token variable">${SYSTEM_NAME}</span>-uninstall.sh<span class="token punctuation">}</span>
    <span class="token assign-left variable">KILLALL_K3S_SH</span><span class="token operator">=</span><span class="token variable">${KILLALL_K3S_SH<span class="token operator">:-</span>${BIN_DIR}</span>/k3s-killall.sh<span class="token punctuation">}</span>

    <span class="token comment"># --- use service or environment location depending on systemd/openrc ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_SYSTEMD}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">FILE_K3S_SERVICE</span><span class="token operator">=</span><span class="token variable">${SYSTEMD_DIR}</span>/<span class="token variable">${SERVICE_K3S}</span>
        <span class="token assign-left variable">FILE_K3S_ENV</span><span class="token operator">=</span><span class="token variable">${SYSTEMD_DIR}</span>/<span class="token variable">${SERVICE_K3S}</span>.env
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_OPENRC}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token variable">$SUDO</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/rancher/k3s
        <span class="token assign-left variable">FILE_K3S_SERVICE</span><span class="token operator">=</span>/etc/init.d/<span class="token variable">${SYSTEM_NAME}</span>
        <span class="token assign-left variable">FILE_K3S_ENV</span><span class="token operator">=</span>/etc/rancher/k3s/<span class="token variable">${SYSTEM_NAME}</span>.env
    <span class="token keyword">fi</span>

    <span class="token comment"># --- get hash of config &amp; exec for currently installed k3s ---</span>
    <span class="token assign-left variable">PRE_INSTALL_HASHES</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_installed_hashes<span class="token variable">)</span></span>

    <span class="token comment"># --- if bin directory is read only skip download ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true
    <span class="token keyword">fi</span>

    <span class="token comment"># --- setup channel values</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_MIRROR}</span>"</span> <span class="token operator">=</span> cn <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">INSTALL_K3S_CHANNEL_URL</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${INSTALL_K3S_MIRROR_URL}</span>/k3s/channels"</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">INSTALL_K3S_CHANNEL_URL</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_CHANNEL_URL<span class="token operator">:-</span>'https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>update.k3s.io<span class="token operator">/</span>v1-release<span class="token operator">/</span>channels'}</span>
    <span class="token keyword">fi</span>
    <span class="token assign-left variable">INSTALL_K3S_CHANNEL</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_CHANNEL<span class="token operator">:-</span>'stable'}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- check if skip download environment variable set ---</span>
<span class="token function-name function">can_skip_download_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_DOWNLOAD}</span>"</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_DOWNLOAD}</span>"</span> <span class="token operator">!=</span> binary <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">return</span> <span class="token number">1</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">can_skip_download_selinux</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>                                                        
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_DOWNLOAD}</span>"</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_DOWNLOAD}</span>"</span> <span class="token operator">!=</span> selinux <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span> 
        <span class="token builtin class-name">return</span> <span class="token number">1</span>                                                                     
    <span class="token keyword">fi</span>                                                                               
<span class="token punctuation">}</span>  

<span class="token comment"># --- verify an executable k3s binary is installed ---</span>
<span class="token function-name function">verify_k3s_is_executable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-x</span> <span class="token variable">${BIN_DIR}</span>/k3s <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        fatal <span class="token string">"Executable k3s binary not found at <span class="token variable">${BIN_DIR}</span>/k3s"</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- set arch and suffix, fatal if architecture not supported ---</span>
<span class="token function-name function">setup_verify_arch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">$ARCH</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">ARCH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>
    <span class="token keyword">fi</span>
    <span class="token keyword">case</span> <span class="token variable">$ARCH</span> <span class="token keyword">in</span>
        amd64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>amd64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        x86_64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>amd64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        arm64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        s390x<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>s390x
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        aarch64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        arm*<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">${ARCH}</span>hf
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">"Unsupported architecture <span class="token variable">$ARCH</span>"</span>
    <span class="token keyword">esac</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- verify existence of network downloader executable ---</span>
<span class="token function-name function">verify_downloader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment"># Return failure if it doesn't exist or is no executable</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> $1<span class="token variable">)</span></span>"</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">return</span> <span class="token number">1</span>

    <span class="token comment"># Set verified executable as our downloader program and return success</span>
    <span class="token assign-left variable">DOWNLOADER</span><span class="token operator">=</span><span class="token variable">$1</span>
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create temporary directory and cleanup when done ---</span>
<span class="token function-name function">setup_tmp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">TMP_DIR</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>mktemp <span class="token parameter variable">-d</span> <span class="token parameter variable">-t</span> k3s-install.XXXXXXXXXX<span class="token variable">)</span></span>
    <span class="token assign-left variable">TMP_HASH</span><span class="token operator">=</span><span class="token variable">${TMP_DIR}</span>/k3s.hash
    <span class="token assign-left variable">TMP_BIN</span><span class="token operator">=</span><span class="token variable">${TMP_DIR}</span>/k3s.bin
    <span class="token function-name function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token assign-left variable">code</span><span class="token operator">=</span><span class="token variable">$?</span>
        <span class="token builtin class-name">set</span> +e
        <span class="token builtin class-name">trap</span> - EXIT
        <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">${TMP_DIR}</span>
        <span class="token builtin class-name">exit</span> <span class="token variable">$code</span>
    <span class="token punctuation">}</span>
    <span class="token builtin class-name">trap</span> cleanup INT EXIT
<span class="token punctuation">}</span>

<span class="token comment"># --- use desired k3s version if defined or find version from channel ---</span>
<span class="token function-name function">get_release_version</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_COMMIT}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token string">"commit <span class="token variable">${INSTALL_K3S_COMMIT}</span>"</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_VERSION}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_VERSION}</span>
    <span class="token keyword">else</span>
        info <span class="token string">"Finding release for channel <span class="token variable">${INSTALL_K3S_CHANNEL}</span>"</span>
        <span class="token assign-left variable">version_url</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${INSTALL_K3S_CHANNEL_URL}</span>/<span class="token variable">${INSTALL_K3S_CHANNEL}</span>"</span>
        <span class="token keyword">case</span> <span class="token variable">$DOWNLOADER</span> <span class="token keyword">in</span>
            <span class="token function">curl</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_MIRROR}</span>"</span> <span class="token operator">=</span> cn <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                    <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span><span class="token variable">)</span></span>
                <span class="token keyword">else</span>
                    <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-w</span> <span class="token string">'%{url_effective}'</span> <span class="token parameter variable">-L</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span> <span class="token parameter variable">-o</span> /dev/null <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s|.*/||'</span><span class="token variable">)</span></span>
                <span class="token keyword">fi</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
            <span class="token function">wget</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_MIRROR}</span>"</span> <span class="token operator">=</span> cn <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                    <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">wget</span> <span class="token parameter variable">-qO</span> - $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span><span class="token variable">)</span></span>
                <span class="token keyword">else</span>
                    <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">wget</span> <span class="token parameter variable">-SqO</span> /dev/null $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> Location <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s|.*/||'</span><span class="token variable">)</span></span>
                <span class="token keyword">fi</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
            *<span class="token punctuation">)</span>
                fatal <span class="token string">"Incorrect downloader executable '<span class="token variable">$DOWNLOADER</span>'"</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
    <span class="token keyword">fi</span>
    info <span class="token string">"Using <span class="token variable">${VERSION_K3S}</span> as release"</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download from github url ---</span>
<span class="token function-name function">download</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token variable">$#</span> <span class="token parameter variable">-eq</span> <span class="token number">2</span> <span class="token punctuation">]</span> <span class="token operator">||</span> fatal <span class="token string">'download needs exactly 2 arguments'</span>

    <span class="token keyword">case</span> <span class="token variable">$DOWNLOADER</span> <span class="token keyword">in</span>
        <span class="token function">curl</span><span class="token punctuation">)</span>
            <span class="token function">curl</span> <span class="token parameter variable">-o</span> <span class="token variable">$1</span> <span class="token parameter variable">-sfL</span> <span class="token variable">$2</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token function">wget</span><span class="token punctuation">)</span>
            <span class="token function">wget</span> <span class="token parameter variable">-qO</span> <span class="token variable">$1</span> <span class="token variable">$2</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">"Incorrect executable '<span class="token variable">$DOWNLOADER</span>'"</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    <span class="token comment"># Abort if download command failed</span>
    <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">||</span> fatal <span class="token string">'Download failed'</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download hash from github url ---</span>
<span class="token function-name function">download_hash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_COMMIT}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HASH_URL</span><span class="token operator">=</span><span class="token variable">${STORAGE_URL}</span>/k3s<span class="token variable">${SUFFIX}</span>-<span class="token variable">${INSTALL_K3S_COMMIT}</span>.sha256sum
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_MIRROR}</span>"</span> <span class="token operator">=</span> cn <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span> <span class="token builtin class-name">echo</span> $<span class="token punctuation">{</span>VERSION_K3S<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">'s/+/-/g'</span> <span class="token variable">)</span></span>
        <span class="token assign-left variable">HASH_URL</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_MIRROR_URL}</span>/k3s/<span class="token variable">${VERSION_K3S}</span>/sha256sum-<span class="token variable">${ARCH}</span>.txt
    <span class="token keyword">else</span>
        <span class="token assign-left variable">HASH_URL</span><span class="token operator">=</span><span class="token variable">${GITHUB_URL}</span>/download/<span class="token variable">${VERSION_K3S}</span>/sha256sum-<span class="token variable">${ARCH}</span>.txt
    <span class="token keyword">fi</span>
    info <span class="token string">"Downloading hash <span class="token variable">${HASH_URL}</span>"</span>
    download <span class="token variable">${TMP_HASH}</span> <span class="token variable">${HASH_URL}</span>
    <span class="token assign-left variable">HASH_EXPECTED</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">grep</span> <span class="token string">" k3s<span class="token variable">${SUFFIX}</span>$"</span> $<span class="token punctuation">{</span>TMP_HASH<span class="token punctuation">}</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">HASH_EXPECTED</span><span class="token operator">=</span><span class="token variable">${HASH_EXPECTED<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- check hash against installed version ---</span>
<span class="token function-name function">installed_hash_matches</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">${BIN_DIR}</span>/k3s <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HASH_INSTALLED</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>sha256sum $<span class="token punctuation">{</span>BIN_DIR<span class="token punctuation">}</span>/k3s<span class="token variable">)</span></span>
        <span class="token assign-left variable">HASH_INSTALLED</span><span class="token operator">=</span><span class="token variable">${HASH_INSTALLED<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HASH_EXPECTED}</span>"</span> <span class="token operator">=</span> <span class="token string">"<span class="token variable">${HASH_INSTALLED}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token builtin class-name">return</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">return</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download binary from github url ---</span>
<span class="token function-name function">download_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_COMMIT}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">BIN_URL</span><span class="token operator">=</span><span class="token variable">${STORAGE_URL}</span>/k3s<span class="token variable">${SUFFIX}</span>-<span class="token variable">${INSTALL_K3S_COMMIT}</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_MIRROR}</span>"</span> <span class="token operator">=</span> cn <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span> <span class="token builtin class-name">echo</span> $<span class="token punctuation">{</span>VERSION_K3S<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">'s/+/-/g'</span> <span class="token variable">)</span></span>
        <span class="token assign-left variable">BIN_URL</span><span class="token operator">=</span><span class="token variable">${INSTALL_K3S_MIRROR_URL}</span>/k3s/<span class="token variable">${VERSION_K3S}</span>/k3s<span class="token variable">${SUFFIX}</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">BIN_URL</span><span class="token operator">=</span><span class="token variable">${GITHUB_URL}</span>/download/<span class="token variable">${VERSION_K3S}</span>/k3s<span class="token variable">${SUFFIX}</span>
    <span class="token keyword">fi</span>
    info <span class="token string">"Downloading binary <span class="token variable">${BIN_URL}</span>"</span>
    download <span class="token variable">${TMP_BIN}</span> <span class="token variable">${BIN_URL}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- verify downloaded binary hash ---</span>
<span class="token function-name function">verify_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"Verifying binary download"</span>
    <span class="token assign-left variable">HASH_BIN</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>sha256sum $<span class="token punctuation">{</span>TMP_BIN<span class="token punctuation">}</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">HASH_BIN</span><span class="token operator">=</span><span class="token variable">${HASH_BIN<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HASH_EXPECTED}</span>"</span> <span class="token operator">!=</span> <span class="token string">"<span class="token variable">${HASH_BIN}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        fatal <span class="token string">"Download sha256 does not match <span class="token variable">${HASH_EXPECTED}</span>, got <span class="token variable">${HASH_BIN}</span>"</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- setup permissions and move binary to system directory ---</span>
<span class="token function-name function">setup_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">${TMP_BIN}</span>
    info <span class="token string">"Installing k3s to <span class="token variable">${BIN_DIR}</span>/k3s"</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">${TMP_BIN}</span>
    <span class="token variable">$SUDO</span> <span class="token function">mv</span> <span class="token parameter variable">-f</span> <span class="token variable">${TMP_BIN}</span> <span class="token variable">${BIN_DIR}</span>/k3s
<span class="token punctuation">}</span>

<span class="token comment"># --- setup selinux policy ---</span>
<span class="token function-name function">setup_selinux</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token variable">${INSTALL_K3S_CHANNEL}</span> <span class="token keyword">in</span> 
        *testing<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>testing
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *latest<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>latest
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>stable
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    <span class="token assign-left variable">rpm_site</span><span class="token operator">=</span><span class="token string">"rpm.rancher.io"</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${rpm_channel}</span>"</span> <span class="token operator">=</span> <span class="token string">"testing"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_site</span><span class="token operator">=</span><span class="token string">"rpm-testing.rancher.io"</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/os-release <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">.</span> /etc/os-release
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${ID_LIKE<span class="token operator">%%</span><span class="token punctuation">[</span> <span class="token punctuation">]</span>*}</span>"</span> <span class="token operator">=</span> <span class="token string">"suse"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>sle
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>microos
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>zypper
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${VERSION_ID<span class="token operator">%%</span>.*}</span>"</span> <span class="token operator">=</span> <span class="token string">"7"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>el7
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>centos/7
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>yum
    <span class="token keyword">else</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>el8
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>centos/8
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>yum
    <span class="token keyword">fi</span>

    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${package_installer}</span>"</span> <span class="token operator">=</span> <span class="token string">"yum"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/bin/dnf <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>dnf
    <span class="token keyword">fi</span>

    <span class="token assign-left variable">policy_hint</span><span class="token operator">=</span><span class="token string">"please install:
    <span class="token variable">${package_installer}</span> install -y container-selinux
    <span class="token variable">${package_installer}</span> install -y https://<span class="token variable">${rpm_site}</span>/k3s/<span class="token variable">${rpm_channel}</span>/common/<span class="token variable">${rpm_site_infix}</span>/noarch/k3s-selinux-0.4-1.<span class="token variable">${rpm_target}</span>.noarch.rpm
"</span>

    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">$INSTALL_K3S_SKIP_SELINUX_RPM</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">||</span> can_skip_download_selinux <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-d</span> /usr/share/selinux <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">"Skipping installation of SELinux RPM"</span>
    <span class="token keyword">elif</span>  <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${ID_LIKE<span class="token operator">:-</span>}</span>"</span> <span class="token operator">!=</span> coreos <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${VARIANT_ID<span class="token operator">:-</span>}</span>"</span> <span class="token operator">!=</span> coreos <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        install_selinux_rpm <span class="token variable">${rpm_site}</span> <span class="token variable">${rpm_channel}</span> <span class="token variable">${rpm_target}</span> <span class="token variable">${rpm_site_infix}</span>
    <span class="token keyword">fi</span>

    <span class="token assign-left variable">policy_error</span><span class="token operator">=</span>fatal
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">$INSTALL_K3S_SELINUX_WARN</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${ID_LIKE<span class="token operator">:-</span>}</span>"</span> <span class="token operator">=</span> coreos <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${VARIANT_ID<span class="token operator">:-</span>}</span>"</span> <span class="token operator">=</span> coreos <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">policy_error</span><span class="token operator">=</span>warn
    <span class="token keyword">fi</span>

    <span class="token keyword">if</span> <span class="token operator">!</span> <span class="token variable">$SUDO</span> chcon <span class="token parameter variable">-u</span> system_u <span class="token parameter variable">-r</span> object_r <span class="token parameter variable">-t</span> container_runtime_exec_t <span class="token variable">${BIN_DIR}</span>/k3s <span class="token operator">></span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token keyword">if</span> <span class="token variable">$SUDO</span> <span class="token function">grep</span> <span class="token string">'^\s*SELINUX=enforcing'</span> /etc/selinux/config <span class="token operator">></span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token variable">$policy_error</span> <span class="token string">"Failed to apply container_runtime_exec_t to <span class="token variable">${BIN_DIR}</span>/k3s, <span class="token variable">${policy_hint}</span>"</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> /usr/share/selinux/packages/k3s.pp <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/sbin/transactional-update <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            warn <span class="token string">"Please reboot your machine to activate the changes and avoid data loss."</span>
        <span class="token keyword">else</span>
            <span class="token variable">$policy_error</span> <span class="token string">"Failed to find the k3s-selinux policy, <span class="token variable">${policy_hint}</span>"</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">install_selinux_rpm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/redhat-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/centos-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/oracle-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${ID_LIKE<span class="token operator">%%</span><span class="token punctuation">[</span> <span class="token punctuation">]</span>*}</span>"</span> <span class="token operator">=</span> <span class="token string">"suse"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">repodir</span><span class="token operator">=</span>/etc/yum.repos.d
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /etc/zypp/repos.d <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">repodir</span><span class="token operator">=</span>/etc/zypp/repos.d
        <span class="token keyword">fi</span>
        <span class="token builtin class-name">set</span> +o noglob
        <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable">${repodir}</span>/rancher-k3s-common*.repo
        <span class="token builtin class-name">set</span> <span class="token parameter variable">-o</span> noglob
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/redhat-release <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${3}</span>"</span> <span class="token operator">=</span> <span class="token string">"el7"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token variable">$SUDO</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils
            <span class="token variable">$SUDO</span> yum-config-manager <span class="token parameter variable">--enable</span> rhel-7-server-extras-rpms
        <span class="token keyword">fi</span>
        <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${repodir}</span>/rancher-k3s-common.repo <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[rancher-k3s-common-<span class="token variable">${2}</span>]
name=Rancher K3s Common (<span class="token variable">${2}</span>)
baseurl=https://<span class="token variable">${1}</span>/k3s/<span class="token variable">${2}</span>/common/<span class="token variable">${4}</span>/noarch
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://<span class="token variable">${1}</span>/public.key
EOF</span>
        <span class="token keyword">case</span> <span class="token variable">${3}</span> <span class="token keyword">in</span>
        sle<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">"zypper --gpg-auto-import-keys"</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${TRANSACTIONAL_UPDATE=false}</span>"</span> <span class="token operator">!=</span> <span class="token string">"true"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/sbin/transactional-update <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">"transactional-update --no-selfupdate -d run <span class="token variable">${rpm_installer}</span>"</span>
                <span class="token builtin class-name">:</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_START<span class="token operator">:=</span>true}</span>"</span>
            <span class="token keyword">fi</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">"yum"</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${rpm_installer}</span>"</span> <span class="token operator">=</span> <span class="token string">"yum"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/bin/dnf <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span>dnf
        <span class="token keyword">fi</span>
        <span class="token comment"># shellcheck disable=SC2086</span>
        <span class="token variable">$SUDO</span> <span class="token variable">${rpm_installer}</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token string">"k3s-selinux"</span>
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">return</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download and verify k3s ---</span>
<span class="token function-name function">download_and_verify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> can_skip_download_binary<span class="token punctuation">;</span> <span class="token keyword">then</span>
       info <span class="token string">'Skipping k3s download and verify'</span>
       verify_k3s_is_executable
       <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    setup_verify_arch
    verify_downloader <span class="token function">curl</span> <span class="token operator">||</span> verify_downloader <span class="token function">wget</span> <span class="token operator">||</span> fatal <span class="token string">'Can not find curl or wget for downloading files'</span>
    setup_tmp
    get_release_version
    download_hash

    <span class="token keyword">if</span> installed_hash_matches<span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">'Skipping binary downloaded, installed k3s matches hash'</span>
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    download_binary
    verify_binary
    setup_binary
<span class="token punctuation">}</span>

<span class="token comment"># --- add additional utility links ---</span>
<span class="token function-name function">create_symlinks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SYMLINK}</span>"</span> <span class="token operator">=</span> skip <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token keyword">for</span> <span class="token for-or-select variable">cmd</span> <span class="token keyword">in</span> kubectl crictl ctr<span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-e</span> <span class="token variable">${BIN_DIR}</span>/<span class="token variable">${cmd}</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SYMLINK}</span>"</span> <span class="token operator">=</span> force <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">which_cmd</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> $<span class="token punctuation">{</span>cmd<span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null <span class="token operator">||</span> <span class="token boolean">true</span><span class="token variable">)</span></span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">${which_cmd}</span>"</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SYMLINK}</span>"</span> <span class="token operator">=</span> force <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                info <span class="token string">"Creating <span class="token variable">${BIN_DIR}</span>/<span class="token variable">${cmd}</span> symlink to k3s"</span>
                <span class="token variable">$SUDO</span> <span class="token function">ln</span> <span class="token parameter variable">-sf</span> k3s <span class="token variable">${BIN_DIR}</span>/<span class="token variable">${cmd}</span>
            <span class="token keyword">else</span>
                info <span class="token string">"Skipping <span class="token variable">${BIN_DIR}</span>/<span class="token variable">${cmd}</span> symlink to k3s, command exists in PATH at <span class="token variable">${which_cmd}</span>"</span>
            <span class="token keyword">fi</span>
        <span class="token keyword">else</span>
            info <span class="token string">"Skipping <span class="token variable">${BIN_DIR}</span>/<span class="token variable">${cmd}</span> symlink to k3s, already exists"</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create killall script ---</span>
<span class="token function-name function">create_killall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    info <span class="token string">"Creating killall script <span class="token variable">${KILLALL_K3S_SH}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${KILLALL_K3S_SH}</span> <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token punctuation">\</span>EOF
<span class="token comment">#!/bin/sh</span>
<span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">exec</span> <span class="token function">sudo</span> <span class="token variable">$0</span> <span class="token variable">$@</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">bin</span> <span class="token keyword">in</span> /var/lib/rancher/k3s/data/**/bin/<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable">$bin</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$bin</span><span class="token builtin class-name">:</span><span class="token variable">$bin</span>/aux
<span class="token keyword">done</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">service</span> <span class="token keyword">in</span> /etc/systemd/system/k3s*.service<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-s</span> <span class="token variable">$service</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemctl stop <span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $service<span class="token variable">)</span></span>
<span class="token keyword">done</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">service</span> <span class="token keyword">in</span> /etc/init.d/k3s*<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">$service</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$service</span> stop
<span class="token keyword">done</span>

<span class="token function-name function">pschildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">ps</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">ppid</span><span class="token operator">=</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">pid</span><span class="token operator">=</span> <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/^\s*//g; s/\s\s*/\t/g;'</span> <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token function">grep</span> <span class="token parameter variable">-w</span> <span class="token string">"^<span class="token variable">$1</span>"</span> <span class="token operator">|</span> <span class="token punctuation">\</span>
    <span class="token function">cut</span> <span class="token parameter variable">-f2</span>
<span class="token punctuation">}</span>

<span class="token function-name function">pstree</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">pid</span> <span class="token keyword">in</span> <span class="token variable">$@</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">echo</span> <span class="token variable">$pid</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">child</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span>pschildren $pid<span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
            pstree <span class="token variable">$child</span>
        <span class="token keyword">done</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token function-name function">killtree</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable"><span class="token variable">$(</span>
        <span class="token punctuation">{</span> <span class="token builtin class-name">set</span> +x<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null<span class="token punctuation">;</span>
        pstree $@<span class="token punctuation">;</span>
        <span class="token builtin class-name">set</span> -x<span class="token punctuation">;</span>
    <span class="token variable">)</span></span> <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">getshims</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">ps</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">pid</span><span class="token operator">=</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">args</span><span class="token operator">=</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'s/^ *//; s/\s\s*/\t/;'</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-w</span> <span class="token string">'k3s/data/[^/]*/bin/containerd-shim'</span> <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f1</span>
<span class="token punctuation">}</span>

killtree <span class="token variable"><span class="token variable">$(</span><span class="token punctuation">{</span> <span class="token builtin class-name">set</span> +x<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null<span class="token punctuation">;</span> getshims<span class="token punctuation">;</span> <span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span><span class="token variable">)</span></span>

<span class="token function-name function">do_unmount_and_remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">set</span> +x
    <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> _ path _<span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token keyword">case</span> <span class="token string">"<span class="token variable">$path</span>"</span> <span class="token keyword">in</span> <span class="token variable">$1</span>*<span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$path</span>"</span> <span class="token punctuation">;</span><span class="token punctuation">;</span> <span class="token keyword">esac</span>
    <span class="token keyword">done</span> <span class="token operator">&lt;</span> /proc/self/mounts <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">'umount "$0" &amp;&amp; rm -rf "$0"'</span>
    <span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>
<span class="token punctuation">}</span>

do_unmount_and_remove <span class="token string">'/run/k3s'</span>
do_unmount_and_remove <span class="token string">'/var/lib/rancher/k3s'</span>
do_unmount_and_remove <span class="token string">'/var/lib/kubelet/pods'</span>
do_unmount_and_remove <span class="token string">'/var/lib/kubelet/plugins'</span>
do_unmount_and_remove <span class="token string">'/run/netns/cni-'</span>

<span class="token comment"># Remove CNI namespaces</span>
<span class="token function">ip</span> netns show <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null <span class="token operator">|</span> <span class="token function">grep</span> cni- <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token function">ip</span> netns delete

<span class="token comment"># Delete network interface(s) that match 'master cni0'</span>
<span class="token function">ip</span> <span class="token function">link</span> show <span class="token operator"><span class="token file-descriptor important">2</span>></span>/dev/null <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">'master cni0'</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> ignore iface ignore<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token assign-left variable">iface</span><span class="token operator">=</span><span class="token variable">${iface<span class="token operator">%%</span>@*}</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">$iface</span>"</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token function">ip</span> <span class="token function">link</span> delete <span class="token variable">$iface</span>
<span class="token keyword">done</span>
<span class="token function">ip</span> <span class="token function">link</span> delete cni0
<span class="token function">ip</span> <span class="token function">link</span> delete flannel.1
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-v6.1
<span class="token function">ip</span> <span class="token function">link</span> delete kube-ipvs0
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-wg
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-wg-v6
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/cni/
iptables-save <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> KUBE- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> CNI- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> flannel <span class="token operator">|</span> iptables-restore
ip6tables-save <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> KUBE- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> CNI- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> flannel <span class="token operator">|</span> ip6tables-restore
EOF
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">${KILLALL_K3S_SH}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">${KILLALL_K3S_SH}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create uninstall script ---</span>
<span class="token function-name function">create_uninstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    info <span class="token string">"Creating uninstall script <span class="token variable">${UNINSTALL_K3S_SH}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${UNINSTALL_K3S_SH}</span> <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/sh
set -x
[ \<span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> -eq 0 ] || exec sudo \<span class="token variable">$0</span> \<span class="token variable">$@</span>

<span class="token variable">${KILLALL_K3S_SH}</span>

if command -v systemctl; then
    systemctl disable <span class="token variable">${SYSTEM_NAME}</span>
    systemctl reset-failed <span class="token variable">${SYSTEM_NAME}</span>
    systemctl daemon-reload
fi
if command -v rc-update; then
    rc-update delete <span class="token variable">${SYSTEM_NAME}</span> default
fi

rm -f <span class="token variable">${FILE_K3S_SERVICE}</span>
rm -f <span class="token variable">${FILE_K3S_ENV}</span>

remove_uninstall() {
    rm -f <span class="token variable">${UNINSTALL_K3S_SH}</span>
}
trap remove_uninstall EXIT

if (ls <span class="token variable">${SYSTEMD_DIR}</span>/k3s*.service || ls /etc/init.d/k3s*) >/dev/null 2>&amp;1; then
    set +x; echo 'Additional k3s services installed, skipping uninstall of k3s'; set -x
    exit
fi

for cmd in kubectl crictl ctr; do
    if [ -L <span class="token variable">${BIN_DIR}</span>/\<span class="token variable">$cmd</span> ]; then
        rm -f <span class="token variable">${BIN_DIR}</span>/\<span class="token variable">$cmd</span>
    fi
done

rm -rf /etc/rancher/k3s
rm -rf /run/k3s
rm -rf /run/flannel
rm -rf /var/lib/rancher/k3s
rm -rf /var/lib/kubelet
rm -f <span class="token variable">${BIN_DIR}</span>/k3s
rm -f <span class="token variable">${KILLALL_K3S_SH}</span>

if type yum >/dev/null 2>&amp;1; then
    yum remove -y k3s-selinux
    rm -f /etc/yum.repos.d/rancher-k3s-common*.repo
elif type zypper >/dev/null 2>&amp;1; then
    uninstall_cmd="zypper remove -y k3s-selinux"
    if [ "\<span class="token variable">${TRANSACTIONAL_UPDATE=false}</span>" != "true" ] &amp;&amp; [ -x /usr/sbin/transactional-update ]; then
        uninstall_cmd="transactional-update --no-selfupdate -d run \<span class="token variable">$uninstall_cmd</span>"
    fi
    \<span class="token variable">$uninstall_cmd</span>
    rm -f /etc/zypp/repos.d/rancher-k3s-common*.repo
fi
EOF</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">${UNINSTALL_K3S_SH}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">${UNINSTALL_K3S_SH}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- disable current service if loaded --</span>
<span class="token function-name function">systemd_disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$SUDO</span> systemctl disable <span class="token variable">${SYSTEM_NAME}</span> <span class="token operator">></span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">||</span> <span class="token boolean">true</span>
    <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/systemd/system/<span class="token variable">${SERVICE_K3S}</span> <span class="token operator">||</span> <span class="token boolean">true</span>
    <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/systemd/system/<span class="token variable">${SERVICE_K3S}</span>.env <span class="token operator">||</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- capture current env and create file containing k3s_ variables ---</span>
<span class="token function-name function">create_env_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"env: Creating environment file <span class="token variable">${FILE_K3S_ENV}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token function">touch</span> <span class="token variable">${FILE_K3S_ENV}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> 0600 <span class="token variable">${FILE_K3S_ENV}</span>
    <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token builtin class-name">export</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> x <span class="token function">v</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$v</span><span class="token punctuation">;</span> <span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">'^(K3S|CONTAINERD)_'</span> <span class="token operator">|</span> <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${FILE_K3S_ENV}</span> <span class="token operator">></span>/dev/null
    <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token builtin class-name">export</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> x <span class="token function">v</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$v</span><span class="token punctuation">;</span> <span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-Ei</span> <span class="token string">'^(NO|HTTP|HTTPS)_PROXY'</span> <span class="token operator">|</span> <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> <span class="token variable">${FILE_K3S_ENV}</span> <span class="token operator">></span>/dev/null
<span class="token punctuation">}</span>

<span class="token comment"># --- write systemd service file ---</span>
<span class="token function-name function">create_systemd_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"systemd: Creating service file <span class="token variable">${FILE_K3S_SERVICE}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${FILE_K3S_SERVICE}</span> <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[Unit]
Description=Lightweight Kubernetes
Documentation=https://k3s.io
Wants=network-online.target
After=network-online.target

[Install]
WantedBy=multi-user.target

[Service]
Type=<span class="token variable">${SYSTEMD_TYPE}</span>
EnvironmentFile=-/etc/default/%N
EnvironmentFile=-/etc/sysconfig/%N
EnvironmentFile=-<span class="token variable">${FILE_K3S_ENV}</span>
KillMode=process
Delegate=yes
# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNOFILE=1048576
LimitNPROC=infinity
LimitCORE=infinity
TasksMax=infinity
TimeoutStartSec=0
Restart=always
RestartSec=5s
ExecStartPre=/bin/sh -xc '! /usr/bin/systemctl is-enabled --quiet nm-cloud-setup.service'
ExecStartPre=-/sbin/modprobe br_netfilter
ExecStartPre=-/sbin/modprobe overlay
ExecStart=<span class="token variable">${BIN_DIR}</span>/k3s <span class="token entity" title="\\">\\</span>
    <span class="token variable">${CMD_K3S_EXEC}</span>

EOF</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- write openrc service file ---</span>
<span class="token function-name function">create_openrc_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">LOG_FILE</span><span class="token operator">=</span>/var/log/<span class="token variable">${SYSTEM_NAME}</span>.log

    info <span class="token string">"openrc: Creating service file <span class="token variable">${FILE_K3S_SERVICE}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">${FILE_K3S_SERVICE}</span> <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/sbin/openrc-run

depend() {
    after network-online
    want cgroups
}

start_pre() {
    rm -f /tmp/k3s.*
}

supervisor=supervise-daemon
name=<span class="token variable">${SYSTEM_NAME}</span>
command="<span class="token variable">${BIN_DIR}</span>/k3s"
command_args="<span class="token variable"><span class="token variable">$(</span>escape_dq <span class="token string">"<span class="token variable">${CMD_K3S_EXEC}</span>"</span><span class="token variable">)</span></span>
    >><span class="token variable">${LOG_FILE}</span> 2>&amp;1"

output_log=<span class="token variable">${LOG_FILE}</span>
error_log=<span class="token variable">${LOG_FILE}</span>

pidfile="/var/run/<span class="token variable">${SYSTEM_NAME}</span>.pid"
respawn_delay=5
respawn_max=0

set -o allexport
if [ -f /etc/environment ]; then source /etc/environment; fi
if [ -f <span class="token variable">${FILE_K3S_ENV}</span> ]; then source <span class="token variable">${FILE_K3S_ENV}</span>; fi
set +o allexport
EOF</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> 0755 <span class="token variable">${FILE_K3S_SERVICE}</span>

    <span class="token variable">$SUDO</span> <span class="token function">tee</span> /etc/logrotate.d/<span class="token variable">${SYSTEM_NAME}</span> <span class="token operator">></span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
<span class="token variable">${LOG_FILE}</span> {
	missingok
	notifempty
	copytruncate
}
EOF</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- write systemd or openrc service file ---</span>
<span class="token function-name function">create_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_SYSTEMD}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> create_systemd_service_file
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_OPENRC}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> create_openrc_service_file
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- get hashes of the current k3s bin and service files</span>
<span class="token function-name function">get_installed_hashes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$SUDO</span> sha256sum <span class="token variable">${BIN_DIR}</span>/k3s <span class="token variable">${FILE_K3S_SERVICE}</span> <span class="token variable">${FILE_K3S_ENV}</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">||</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- enable and start systemd service ---</span>
<span class="token function-name function">systemd_enable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"systemd: Enabling <span class="token variable">${SYSTEM_NAME}</span> unit"</span>
    <span class="token variable">$SUDO</span> systemctl <span class="token builtin class-name">enable</span> <span class="token variable">${FILE_K3S_SERVICE}</span> <span class="token operator">></span>/dev/null
    <span class="token variable">$SUDO</span> systemctl daemon-reload <span class="token operator">></span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">systemd_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"systemd: Starting <span class="token variable">${SYSTEM_NAME}</span>"</span>
    <span class="token variable">$SUDO</span> systemctl restart <span class="token variable">${SYSTEM_NAME}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- enable and start openrc service ---</span>
<span class="token function-name function">openrc_enable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"openrc: Enabling <span class="token variable">${SYSTEM_NAME}</span> service for default runlevel"</span>
    <span class="token variable">$SUDO</span> rc-update <span class="token function">add</span> <span class="token variable">${SYSTEM_NAME}</span> default <span class="token operator">></span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">openrc_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">"openrc: Starting <span class="token variable">${SYSTEM_NAME}</span>"</span>
    <span class="token variable">$SUDO</span> <span class="token variable">${FILE_K3S_SERVICE}</span> restart
<span class="token punctuation">}</span>

<span class="token comment"># --- startup systemd or openrc service ---</span>
<span class="token function-name function">service_enable_and_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token string">"/proc/cgroups"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">grep</span> memory /proc/cgroups <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> n n n enabled<span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> $enabled<span class="token punctuation">;</span> <span class="token keyword">done</span><span class="token variable">)</span></span>"</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">then</span>
        info <span class="token string">'Failed to find memory cgroup, you may need to add "cgroup_memory=1 cgroup_enable=memory" to your linux cmdline (/boot/cmdline.txt on a Raspberry Pi)'</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_ENABLE}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_SYSTEMD}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemd_enable
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_OPENRC}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> openrc_enable

    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_SKIP_START}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token assign-left variable">POST_INSTALL_HASHES</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_installed_hashes<span class="token variable">)</span></span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${PRE_INSTALL_HASHES}</span>"</span> <span class="token operator">=</span> <span class="token string">"<span class="token variable">${POST_INSTALL_HASHES}</span>"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${INSTALL_K3S_FORCE_RESTART}</span>"</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">'No change detected so skipping service start'</span>
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_SYSTEMD}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemd_start
    <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${HAS_OPENRC}</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> openrc_start
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- re-evaluate args to include env command ---</span>
<span class="token builtin class-name">eval</span> <span class="token builtin class-name">set</span> -- <span class="token variable"><span class="token variable">$(</span>escape <span class="token string">"<span class="token variable">${INSTALL_K3S_EXEC}</span>"</span><span class="token variable">)</span></span> <span class="token variable"><span class="token variable">$(</span>quote <span class="token string">"<span class="token variable">$@</span>"</span><span class="token variable">)</span></span>

<span class="token comment"># --- run the install process --</span>
<span class="token punctuation">{</span>
    verify_system
    setup_env <span class="token string">"<span class="token variable">$@</span>"</span>
    download_and_verify
    setup_selinux
    create_symlinks
    create_killall
    create_uninstall
    systemd_disable
    create_env_file
    create_service_file
    service_enable_and_start
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
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


