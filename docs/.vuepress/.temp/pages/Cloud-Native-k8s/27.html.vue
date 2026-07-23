<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第27节-k3s-补充-高级" tabindex="-1"><a class="header-anchor" href="#第27节-k3s-补充-高级" aria-hidden="true">#</a> 第27节 k3s 补充（高级）</h1>
<div><a href = '26.md' style='float:left'>⬆️上一节🔗  </a><a href = '28.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#k3s-vs-k3d">k3s vs k3d</router-link></li><li><router-link to="#证书轮换">证书轮换</router-link></li><li><router-link to="#自动部署清单">自动部署清单</router-link></li><li><router-link to="#使用-docker-作为容器运行时">使用 Docker 作为容器运行时</router-link><ul><li><router-link to="#可选-将-crictl-与-docker-一起使用">可选：将 crictl 与 Docker 一起使用</router-link></li></ul></li><li><router-link to="#配置-containerd">配置 containerd</router-link></li><li><router-link to="#节点标签和污点">节点标签和污点</router-link></li><li><router-link to="#使用安装脚本启动-server-节点">使用安装脚本启动 Server 节点</router-link></li><li><router-link to="#alpine-linux-安装的额外准备工作">Alpine Linux 安装的额外准备工作</router-link></li><li><router-link to="#运行-k3d-docker-中的-k3s-和-docker-compose">运行 K3d（Docker 中的 K3s）和 docker-compose</router-link></li><li><router-link to="#在-raspbian-buster-上启用旧版的-iptables">在 Raspbian Buster 上启用旧版的 iptables</router-link></li><li><router-link to="#为-raspbian-buster-启用-cgroup">为 Raspbian Buster 启用 cgroup</router-link><ul><li><router-link to="#boot-cmdline-txt-的示例">/boot/cmdline.txt 的示例</router-link></li></ul></li><li><router-link to="#selinux-支持">SELinux 支持</router-link><ul><li><router-link to="#自动安装">自动安装</router-link></li><li><router-link to="#手动安装">手动安装</router-link></li></ul></li><li><router-link to="#red-hat-和-centos-的额外准备">Red Hat 和 CentOS 的额外准备</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<h2 id="k3s-vs-k3d" tabindex="-1"><a class="header-anchor" href="#k3s-vs-k3d" aria-hidden="true">#</a> k3s vs k3d</h2>
<p><a href="https://rancher.com/docs/k3s/latest/en/" target="_blank" rel="noopener noreferrer">k3s<ExternalLinkIcon/></a>是一个非常高效和轻量级的完全兼容的 Kubernetes 发行版。</p>
<p><a href="https://k3d.io/" target="_blank" rel="noopener noreferrer">k3d<ExternalLinkIcon/></a>是一个旨在在 Docker 中轻松运行 k3s 的实用程序，它提供了一个简单的 CLI 来创建、运行、删除具有 1 到 n 个节点的完全合规的 Kubernetes 集群。</p>
<p><strong>K3s 包括：</strong></p>
<ul>
<li><a href="https://github.com/coreos/flannel#flannel" target="_blank" rel="noopener noreferrer">Flannel<ExternalLinkIcon/></a>：一个非常简单的 L2 overlay 网络，满足 Kubernetes 的要求。这是一个<a href="https://github.com/containernetworking/cni#3rd-party-plugins" target="_blank" rel="noopener noreferrer">CNI 插件<ExternalLinkIcon/></a>（Container Network Interface），如<a href="http://docs.projectcalico.org/" target="_blank" rel="noopener noreferrer">Calico<ExternalLinkIcon/></a>、<a href="http://romana.io/" target="_blank" rel="noopener noreferrer">Romana<ExternalLinkIcon/></a>、<a href="https://www.weave.works/products/weave-net/" target="_blank" rel="noopener noreferrer">Weave-net<ExternalLinkIcon/></a>  Flannel 不支持 Kubernetes Network Policy，但可以用 Calico 代替（见下一节）。</li>
<li><a href="https://coredns.io/" target="_blank" rel="noopener noreferrer">CoreDNS<ExternalLinkIcon/></a>：一个灵活的、可扩展的 DNS 服务器，可以作为 Kubernetes 集群的 DNS</li>
<li><a href="https://docs.traefik.io/" target="_blank" rel="noopener noreferrer">Traefik<ExternalLinkIcon/></a>是一个现代的 HTTP 反向代理和负载均衡器。在下一节中，我还将展示如何用 Traefik v2 或 Nginx 替换它</li>
<li><a href="https://github.com/rancher/klipper-lb" target="_blank" rel="noopener noreferrer">Klipper 负载均衡<ExternalLinkIcon/></a>器：使用可用主机端口的服务负载均衡器。</li>
<li><a href="https://sqlite.org/" target="_blank" rel="noopener noreferrer">SQLite3<ExternalLinkIcon/></a> : 默认使用的存储后端（也支持 MySQL、Postgres 和 etcd3）</li>
<li><a href="https://containerd.io/" target="_blank" rel="noopener noreferrer">Containerd<ExternalLinkIcon/></a>是一个像 Docker 一样的运行时容器，没有镜像构建部分</li>
</ul>
<p>这些组件的选择是为了拥有最轻量级的分布。但正如我们稍后将在本博客中看到的那样，k3s 是一个模块化发行版，其中的组件可以轻松更换。</p>
<p>最近，k3s作为第一个 Kubernetes 发行版在<a href="https://www.cncf.io/sandbox-projects/" target="_blank" rel="noopener noreferrer">沙箱级别加入了<ExternalLinkIcon/></a><a href="https://sokube.atlassian.net/wiki/spaces/TEC/pages/218234881/NewsRoom" target="_blank" rel="noopener noreferrer">云原生计算基金会<ExternalLinkIcon/></a>(CNCF) （引发了很多<a href="https://github.com/cncf/toc/pull/447" target="_blank" rel="noopener noreferrer">关于 k3s 是否应该成为 kubernetes 子项目的争论<ExternalLinkIcon/></a>）。</p>
<h2 id="证书轮换" tabindex="-1"><a class="header-anchor" href="#证书轮换" aria-hidden="true">#</a> 证书轮换</h2>
<p>默认情况下，K3s 的证书在 12 个月内过期。</p>
<p>如果证书已经过期或剩余的时间不足 90 天，则在 K3s 重启时轮换证书。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查询K3s证书过期时间</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">`</span><span class="token function">ls</span> /var/lib/rancher/k3s/server/tls/*.crt<span class="token variable">`</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$i</span><span class="token punctuation">;</span> openssl x509 <span class="token parameter variable">-enddate</span> <span class="token parameter variable">-noout</span> <span class="token parameter variable">-in</span> <span class="token variable">$i</span><span class="token punctuation">;</span> <span class="token keyword">done</span>

<span class="token comment"># 修改系统时间为证书过期前90天或证书过期后</span>
timedatectl set-ntp no
<span class="token function">date</span> <span class="token parameter variable">-s</span> <span class="token number">20220807</span>

<span class="token comment"># 重启K3s服务</span>
<span class="token function">service</span> k3s restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自动部署清单" tabindex="-1"><a class="header-anchor" href="#自动部署清单" aria-hidden="true">#</a> 自动部署清单</h2>
<p>在<code v-pre>/var/lib/rancher/k3s/server/manifests</code>中找到的任何文件都会以类似<code v-pre>kubectl apply</code>的方式自动部署到 Kubernetes。</p>
<p>关于部署 Helm charts 的信息，请参阅<a href="../helm/_index">Helm</a>章节。</p>
<h2 id="使用-docker-作为容器运行时" tabindex="-1"><a class="header-anchor" href="#使用-docker-作为容器运行时" aria-hidden="true">#</a> 使用 Docker 作为容器运行时</h2>
<p>K3s 包含并默认为<a href="https://containerd.io/" target="_blank" rel="noopener noreferrer">containerd<ExternalLinkIcon/></a>， 一个行业标准的容器运行时。</p>
<p>要使用 Docker 而不是 <code v-pre>containerd</code>。</p>
<ol>
<li>
<p>在 K3s 节点上安装 <code v-pre>Docker</code>。可以使用 <code v-pre>Rancher</code> 的一个<a href="https://github.com/rancher/install-docker" target="_blank" rel="noopener noreferrer">Docker 安装脚本<ExternalLinkIcon/></a>来安装 Docker：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> https://releases.rancher.com/install-docker/19.03.sh <span class="token operator">|</span> <span class="token function">sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>使用<code v-pre>--docker</code>选项安装 K3s：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> - <span class="token parameter variable">--docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>国内用户，可以使用以下方法加速安装：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token function">sh</span> <span class="token parameter variable">-s</span> - <span class="token parameter variable">--docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>确认集群可用：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> k3s kubectl get pods --all-namespaces
NAMESPACE     NAME                                     READY   STATUS      RESTARTS   AGE
kube-system   local-path-provisioner-6d59f47c7-lncxn   <span class="token number">1</span>/1     Running     <span class="token number">0</span>          51s
kube-system   metrics-server-7566d596c8-9tnck          <span class="token number">1</span>/1     Running     <span class="token number">0</span>          51s
kube-system   helm-install-traefik-mbkn9               <span class="token number">0</span>/1     Completed   <span class="token number">1</span>          51s
kube-system   coredns-8655855d6-rtbnb                  <span class="token number">1</span>/1     Running     <span class="token number">0</span>          51s
kube-system   svclb-traefik-jbmvl                      <span class="token number">2</span>/2     Running     <span class="token number">0</span>          43s
kube-system   traefik-758cd5fc85-2wz97                 <span class="token number">1</span>/1     Running     <span class="token number">0</span>          43s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>确认 Docker 容器正在运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">docker</span> <span class="token function">ps</span>
CONTAINER ID        IMAGE                     COMMAND                  CREATED              STATUS              PORTS               NAMES
3e4d34729602        897ce3c5fc8f              <span class="token string">"entry"</span>                  About a minute ago   Up About a minute                       k8s_lb-port-443_svclb-traefik-jbmvl_kube-system_d46f10c6-073f-4c7e-8d7a-8e7ac18f9cb0_0
bffdc9d7a65f        rancher/klipper-lb        <span class="token string">"entry"</span>                  About a minute ago   Up About a minute                       k8s_lb-port-80_svclb-traefik-jbmvl_kube-system_d46f10c6-073f-4c7e-8d7a-8e7ac18f9cb0_0
436b85c5e38d        rancher/library-traefik   <span class="token string">"/traefik --configfi…"</span>   About a minute ago   Up About a minute                       k8s_traefik_traefik-758cd5fc85-2wz97_kube-system_07abe831-ffd6-4206-bfa1-7c9ca4fb39e7_0
de8fded06188        rancher/pause:3.1         <span class="token string">"/pause"</span>                 About a minute ago   Up About a minute                       k8s_POD_svclb-traefik-jbmvl_kube-system_d46f10c6-073f-4c7e-8d7a-8e7ac18f9cb0_0
7c6a30aeeb2f        rancher/pause:3.1         <span class="token string">"/pause"</span>                 About a minute ago   Up About a minute                       k8s_POD_traefik-758cd5fc85-2wz97_kube-system_07abe831-ffd6-4206-bfa1-7c9ca4fb39e7_0
ae6c58cab4a7        9d12f9848b99              <span class="token string">"local-path-provisio…"</span>   About a minute ago   Up About a minute                       k8s_local-path-provisioner_local-path-provisioner-6d59f47c7-lncxn_kube-system_2dbd22bf-6ad9-4bea-a73d-620c90a6c1c1_0
be1450e1a11e        9dd718864ce6              <span class="token string">"/metrics-server"</span>        About a minute ago   Up About a minute                       k8s_metrics-server_metrics-server-7566d596c8-9tnck_kube-system_031e74b5-e9ef-47ef-a88d-fbf3f726cbc6_0
4454d14e4d3f        c4d3d16fe508              <span class="token string">"/coredns -conf /etc…"</span>   About a minute ago   Up About a minute                       k8s_coredns_coredns-8655855d6-rtbnb_kube-system_d05725df-4fb1-410a-8e82-2b1c8278a6a1_0
c3675b87f96c        rancher/pause:3.1         <span class="token string">"/pause"</span>                 About a minute ago   Up About a minute                       k8s_POD_coredns-8655855d6-rtbnb_kube-system_d05725df-4fb1-410a-8e82-2b1c8278a6a1_0
4b1fddbe6ca6        rancher/pause:3.1         <span class="token string">"/pause"</span>                 About a minute ago   Up About a minute                       k8s_POD_local-path-provisioner-6d59f47c7-lncxn_kube-system_2dbd22bf-6ad9-4bea-a73d-620c90a6c1c1_0
64d3517d4a95        rancher/pause:3.1         <span class="token string">"/pause"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="可选-将-crictl-与-docker-一起使用" tabindex="-1"><a class="header-anchor" href="#可选-将-crictl-与-docker-一起使用" aria-hidden="true">#</a> 可选：将 crictl 与 Docker 一起使用</h3>
<p><code v-pre>crictl</code> 为兼容 <code v-pre>CRI</code> 的容器运行时提供了 <code v-pre>CLI</code></p>
<p>如果你想在使用<code v-pre>--docker</code>选项安装 K3s 后使用 crictl，请参考<a href="https://github.com/kubernetes-sigs/cri-tools/blob/master/docs/crictl.md" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>来安装 crictl。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">VERSION</span><span class="token operator">=</span><span class="token string">"v1.17.0"</span>
$ <span class="token function">curl</span> <span class="token parameter variable">-L</span> https://github.com/kubernetes-sigs/cri-tools/releases/download/<span class="token variable">$VERSION</span>/crictl-<span class="token variable">${VERSION}</span>-linux-amd64.tar.gz <span class="token parameter variable">--output</span> crictl-<span class="token variable">${VERSION}</span>-linux-amd64.tar.gz
$ <span class="token function">sudo</span> <span class="token function">tar</span> zxvf crictl-<span class="token variable">$VERSION</span>-linux-amd64.tar.gz <span class="token parameter variable">-C</span> /usr/local/bin
crictl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后开始使用 <code v-pre>crictl</code> 命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> crictl version
Version:  <span class="token number">0.1</span>.0
RuntimeName:  <span class="token function">docker</span>
RuntimeVersion:  <span class="token number">19.03</span>.9
RuntimeApiVersion:  <span class="token number">1.40</span>.0
$ <span class="token function">sudo</span> crictl images
IMAGE                            TAG                 IMAGE ID            SIZE
rancher/coredns-coredns          <span class="token number">1.6</span>.3               c4d3d16fe508b       <span class="token number">44</span>.3MB
rancher/klipper-helm             v0.2.5              6207e2a3f5225       136MB
rancher/klipper-lb               v0.1.2              897ce3c5fc8ff       <span class="token number">6</span>.1MB
rancher/library-traefik          <span class="token number">1.7</span>.19              aa764f7db3051       <span class="token number">85</span>.7MB
rancher/local-path-provisioner   v0.0.11             9d12f9848b99f       <span class="token number">36</span>.2MB
rancher/metrics-server           v0.3.6              9dd718864ce61       <span class="token number">39</span>.9MB
rancher/pause                    <span class="token number">3.1</span>                 da86e6ba6ca19       742kB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置-containerd" tabindex="-1"><a class="header-anchor" href="#配置-containerd" aria-hidden="true">#</a> 配置 containerd</h2>
<p>K3s 将会在<code v-pre>/var/lib/rancher/k3s/agent/etc/containerd/config.toml</code>中为 <code v-pre>containerd</code> 生成 <code v-pre>config.toml</code>。</p>
<p>如果要对这个文件进行高级定制，你可以在同一目录中创建另一个名为 <code v-pre>config.toml.tmpl</code> 的文件，此文件将会代替默认设置。</p>
<p><code v-pre>config.toml.tmpl</code>将被视为  Go 模板文件，并且<code v-pre>config.Node</code>结构被传递给模板。<a href="https://github.com/rancher/k3s/blob/master/pkg/agent/templates/templates.go#L16-L32" target="_blank" rel="noopener noreferrer">此模板<ExternalLinkIcon/></a>示例介绍了如何使用结构来自定义配置文件。</p>
<h2 id="节点标签和污点" tabindex="-1"><a class="header-anchor" href="#节点标签和污点" aria-hidden="true">#</a> 节点标签和污点</h2>
<p>K3s agents 可以通过<code v-pre>--node-label</code>和<code v-pre>--node-taint</code>选项进行配置，这两个选项可以给 kubelet 添加标签和污点。这两个选项只能<a href="https://docs.rancher.cn/docs/k3s/installation/install-options/_index#k3s-agent%E7%9A%84%E6%B3%A8%E5%86%8C%E9%80%89%E9%A1%B9" target="_blank" rel="noopener noreferrer">在注册时<ExternalLinkIcon/></a>添加标签和/或污点，所以它们只能被添加一次，之后不能再通过运行 K3s 命令来改变。</p>
<p>如果你想在节点注册后更改节点标签和污点，你应该使用<code v-pre>kubectl</code>。关于如何添加<a href="https://kubernetes.io/docs/concepts/configuration/taint-and-toleration/" target="_blank" rel="noopener noreferrer">污点<ExternalLinkIcon/></a>和<a href="https://kubernetes.io/docs/tasks/configure-pod-container/assign-pods-nodes/#add-a-label-to-a-node" target="_blank" rel="noopener noreferrer">节点标签<ExternalLinkIcon/></a>，请参考 Kubernetes 官方文档。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 添加label和taint</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> - --node-label <span class="token assign-left variable">app</span><span class="token operator">=</span>k3s --node-taint <span class="token assign-left variable">special</span><span class="token operator">=</span>true:NoSchedule

<span class="token comment"># 查询label和taint</span>
kubectl get nodes --show-labels
kubectl describe nodes <span class="token operator">|</span> <span class="token function">grep</span> Taints
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用安装脚本启动-server-节点" tabindex="-1"><a class="header-anchor" href="#使用安装脚本启动-server-节点" aria-hidden="true">#</a> 使用安装脚本启动 Server 节点</h2>
<p>安装脚本将自动检测您的操作系统是使用 systemd 还是 openrc 并启动服务。当使用 openrc 运行时，日志将在<code v-pre>/var/log/k3s.log</code>中创建。</p>
<p>当使用 systemd 运行时，日志将在<code v-pre>/var/log/syslog</code>中创建，并使用<code v-pre>journalctl -u k3s</code>查看。</p>
<p>使用安装脚本进行安装和自动启动的示例：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>国内用户，可以使用以下方法加速安装：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当手动运行 server 时，你应该得到一个类似于下面的输出：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ k3s server
INFO<span class="token punctuation">[</span><span class="token number">2019</span>-01-22T15:16:19.908493986-07:00<span class="token punctuation">]</span> Starting k3s dev
INFO<span class="token punctuation">[</span><span class="token number">2019</span>-01-22T15:16:19.908934479-07:00<span class="token punctuation">]</span> Running kube-apiserver --allow-privileged<span class="token operator">=</span>true --authorization-mode Node,RBAC --service-account-signing-key-file /var/lib/rancher/k3s/server/tls/service.key --service-cluster-ip-range <span class="token number">10.43</span>.0.0/16 --advertise-port <span class="token number">6445</span> --advertise-address <span class="token number">127.0</span>.0.1 --insecure-port <span class="token number">0</span> --secure-port <span class="token number">6444</span> --bind-address <span class="token number">127.0</span>.0.1 --tls-cert-file /var/lib/rancher/k3s/server/tls/localhost.crt --tls-private-key-file /var/lib/rancher/k3s/server/tls/localhost.key --service-account-key-file /var/lib/rancher/k3s/server/tls/service.key --service-account-issuer k3s --api-audiences unknown --basic-auth-file /var/lib/rancher/k3s/server/cred/passwd --kubelet-client-certificate /var/lib/rancher/k3s/server/tls/token-node.crt --kubelet-client-key /var/lib/rancher/k3s/server/tls/token-node.key
Flag --insecure-port has been deprecated, This flag will be removed <span class="token keyword">in</span> a future version.
INFO<span class="token punctuation">[</span><span class="token number">2019</span>-01-22T15:16:20.196766005-07:00<span class="token punctuation">]</span> Running kube-scheduler <span class="token parameter variable">--kubeconfig</span> /var/lib/rancher/k3s/server/cred/kubeconfig-system.yaml <span class="token parameter variable">--port</span> <span class="token number">0</span> --secure-port <span class="token number">0</span> --leader-elect<span class="token operator">=</span>false
INFO<span class="token punctuation">[</span><span class="token number">2019</span>-01-22T15:16:20.196880841-07:00<span class="token punctuation">]</span> Running kube-controller-manager <span class="token parameter variable">--kubeconfig</span> /var/lib/rancher/k3s/server/cred/kubeconfig-system.yaml --service-account-private-key-file /var/lib/rancher/k3s/server/tls/service.key --allocate-node-cidrs --cluster-cidr <span class="token number">10.42</span>.0.0/16 --root-ca-file /var/lib/rancher/k3s/server/tls/token-ca.crt <span class="token parameter variable">--port</span> <span class="token number">0</span> --secure-port <span class="token number">0</span> --leader-elect<span class="token operator">=</span>false
Flag <span class="token parameter variable">--port</span> has been deprecated, see --secure-port instead.
INFO<span class="token punctuation">[</span><span class="token number">2019</span>-01-22T15:16:20.273441984-07:00<span class="token punctuation">]</span> Listening on :6443
INFO<span class="token punctuation">[</span><span class="token number">2019</span>-01-22T15:16:20.278383446-07:00<span class="token punctuation">]</span> Writing manifest: /var/lib/rancher/k3s/server/manifests/coredns.yaml
INFO<span class="token punctuation">[</span><span class="token number">2019</span>-01-22T15:16:20.474454524-07:00<span class="token punctuation">]</span> Node token is available at /var/lib/rancher/k3s/server/node-token
INFO<span class="token punctuation">[</span><span class="token number">2019</span>-01-22T15:16:20.474471391-07:00<span class="token punctuation">]</span> To <span class="token function">join</span> <span class="token function">node</span> to cluster: k3s agent <span class="token parameter variable">-s</span> https://10.20.0.3:6443 <span class="token parameter variable">-t</span> <span class="token variable">${NODE_TOKEN}</span>
INFO<span class="token punctuation">[</span><span class="token number">2019</span>-01-22T15:16:20.541027133-07:00<span class="token punctuation">]</span> Wrote kubeconfig /etc/rancher/k3s/k3s.yaml
INFO<span class="token punctuation">[</span><span class="token number">2019</span>-01-22T15:16:20.541049100-07:00<span class="token punctuation">]</span> Run: k3s kubectl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 <code v-pre>agent</code> 将创建大量的日志，输出可能会更长。默认情况下，<code v-pre>server</code> 会将自身注册为一个节点（运行 <code v-pre>agent</code>）。</p>
<h2 id="alpine-linux-安装的额外准备工作" tabindex="-1"><a class="header-anchor" href="#alpine-linux-安装的额外准备工作" aria-hidden="true">#</a> Alpine Linux 安装的额外准备工作</h2>
<p>设置 Alpine Linux 前，您需要进行以下准备工作：</p>
<ol>
<li>
<p>更新 <strong><code v-pre>/etc/update-extlinux.conf</code></strong> 添加：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">default_kernel_opts</span><span class="token operator">=</span><span class="token string">"...  cgroup_enable=cpuset cgroup_memory=1 cgroup_enable=memory"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>更新配置并重启：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>update-extlinux
<span class="token function">reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="运行-k3d-docker-中的-k3s-和-docker-compose" tabindex="-1"><a class="header-anchor" href="#运行-k3d-docker-中的-k3s-和-docker-compose" aria-hidden="true">#</a> 运行 K3d（Docker 中的 K3s）和 docker-compose</h2>
<p><a href="https://github.com/rancher/k3d" target="_blank" rel="noopener noreferrer">k3d<ExternalLinkIcon/></a>是一个设计用于在 Docker 中轻松运行 K3s 的工具。</p>
<p>它可以通过 MacOS 上的<a href="https://brew.sh/" target="_blank" rel="noopener noreferrer">brew<ExternalLinkIcon/></a>工具安装：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>brew <span class="token function">install</span> k3d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>rancher/k3s</code>镜像也可用于在 Docker 运行的 K3s server 和 agent。</p>
<p>在 K3s repo 的根目录下有一个<code v-pre>docker-compose.yml</code>，作为如何从 Docker 运行 K3s 的示例。要从这个 repo 中运行<code v-pre>docker-compose</code>，请运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">--scale</span> <span class="token assign-left variable">agent</span><span class="token operator">=</span><span class="token number">3</span>
    <span class="token comment"># kubeconfig is written to current dir</span>

kubectl <span class="token parameter variable">--kubeconfig</span> kubeconfig.yaml get <span class="token function">node</span>

    NAME           STATUS   ROLES    AGE   VERSION
    497278a2d6a2   Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>   11s   v1.13.2-k3s2
    d54c8b17c055   Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>   11s   v1.13.2-k3s2
    db7a5a5a5bdd   Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>   12s   v1.13.2-k3s2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要只在 Docker 中运行 agent，使用<code v-pre>docker-compose up agent</code>。</p>
<p>或者，也可以使用<code v-pre>docker run</code>命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">docker</span> run <span class="token punctuation">\</span>
  <span class="token parameter variable">-d</span> <span class="token parameter variable">--tmpfs</span> /run <span class="token punctuation">\</span>
  <span class="token parameter variable">--tmpfs</span> /var/run <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span><span class="token variable">${SERVER_URL}</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span><span class="token variable">${NODE_TOKEN}</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">--privileged</span> rancher/k3s:vX.Y.Z
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="在-raspbian-buster-上启用旧版的-iptables" tabindex="-1"><a class="header-anchor" href="#在-raspbian-buster-上启用旧版的-iptables" aria-hidden="true">#</a> 在 Raspbian Buster 上启用旧版的 iptables</h2>
<p>Raspbian Buster 默认使用<code v-pre>nftables</code>而不是<code v-pre>iptables</code>。 <strong>K3S</strong> 网络功能需要使用<code v-pre>iptables</code>，而不能使用<code v-pre>nftables</code>。 按照以下步骤切换配置<strong>Buster</strong>使用<code v-pre>legacy iptables</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> iptables <span class="token parameter variable">-F</span>
<span class="token function">sudo</span> update-alternatives <span class="token parameter variable">--set</span> iptables /usr/sbin/iptables-legacy
<span class="token function">sudo</span> update-alternatives <span class="token parameter variable">--set</span> ip6tables /usr/sbin/ip6tables-legacy
<span class="token function">sudo</span> <span class="token function">reboot</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="为-raspbian-buster-启用-cgroup" tabindex="-1"><a class="header-anchor" href="#为-raspbian-buster-启用-cgroup" aria-hidden="true">#</a> 为 Raspbian Buster 启用 cgroup</h2>
<p>标准的 Raspbian Buster 安装没有启用 <code v-pre>cgroups</code>。<strong>K3S</strong> 需要<code v-pre>cgroups</code>来启动 systemd 服务。在<code v-pre>/boot/cmdline.txt</code>中添加<code v-pre>cgroup_memory=1 cgroup_enable=memory</code>就可以启用<code v-pre>cgroups</code>。</p>
<h3 id="boot-cmdline-txt-的示例" tabindex="-1"><a class="header-anchor" href="#boot-cmdline-txt-的示例" aria-hidden="true">#</a> /boot/cmdline.txt 的示例</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">console</span><span class="token operator">=</span>serial0,115200 <span class="token assign-left variable">console</span><span class="token operator">=</span>tty1 <span class="token assign-left variable">root</span><span class="token operator">=</span>PARTUUID<span class="token operator">=</span>58b06195-02 <span class="token assign-left variable">rootfstype</span><span class="token operator">=</span>ext4 <span class="token assign-left variable">elevator</span><span class="token operator">=</span>deadline <span class="token assign-left variable">fsck.repair</span><span class="token operator">=</span>yes rootwait <span class="token assign-left variable">cgroup_memory</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">cgroup_enable</span><span class="token operator">=</span>memory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="selinux-支持" tabindex="-1"><a class="header-anchor" href="#selinux-支持" aria-hidden="true">#</a> SELinux 支持</h2>
<p><em>从 v1.19.4+k3s1 开始支持。从 v1.17.4+k3s1 开始是试验性的。</em></p>
<p>如果您在默认启用 SELinux 的系统（如 CentOS）上安装 K3s，您必须确保安装了正确的 SELinux 策略。</p>
<h3 id="自动安装" tabindex="-1"><a class="header-anchor" href="#自动安装" aria-hidden="true">#</a> 自动安装</h3>
<p><em>从 v1.19.3+k3s2 开始可用</em>。</p>
<p>如果在兼容的系统上，如果不执行离线安装，则<a href="https://docs.rancher.cn/docs/k3s/installation/install-options/_index#%E4%BD%BF%E7%94%A8%E8%84%9A%E6%9C%AC%E5%AE%89%E8%A3%85%E7%9A%84%E9%80%89%E9%A1%B9" target="_blank" rel="noopener noreferrer">安装脚本<ExternalLinkIcon/></a>将从 Rancher RPM 存储库自动安装 SELinux RPM。可以通过设置 <code v-pre>INSTALL_K3S_SKIP_SELINUX_RPM=true</code> 来跳过自动安装。</p>
<h3 id="手动安装" tabindex="-1"><a class="header-anchor" href="#手动安装" aria-hidden="true">#</a> 手动安装</h3>
<p>可以使用以下命令安装必要的策略：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> container-selinux selinux-policy-base
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> https://rpm.rancher.io/k3s/latest/common/centos/7/noarch/k3s-selinux-0.2-1.el7_8.noarch.rpm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>要强制安装脚本记录警告而不是失败，您可以设置以下环境变量： <code v-pre>INSTALL_K3S_SELINUX_WARN=true</code>。</p>
<h2 id="red-hat-和-centos-的额外准备" tabindex="-1"><a class="header-anchor" href="#red-hat-和-centos-的额外准备" aria-hidden="true">#</a> Red Hat 和 CentOS 的额外准备</h2>
<p>建议运行以下命令，关闭 <code v-pre>firewalld</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl disable firewalld <span class="token parameter variable">--now</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '26.md' style='float:left'>⬆️上一节🔗  </a><a href = '28.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


