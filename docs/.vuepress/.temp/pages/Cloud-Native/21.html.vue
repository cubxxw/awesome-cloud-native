<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第21节-用于本地实验的小型-kubernetes-k0s、microk8s、kind、k3s-和-minikube" tabindex="-1"><a class="header-anchor" href="#第21节-用于本地实验的小型-kubernetes-k0s、microk8s、kind、k3s-和-minikube" aria-hidden="true">#</a> 第21节 用于本地实验的小型 Kubernetes：k0s、MicroK8s、kind、k3s 和 Minikube</h1>
<div><a href = '20.md' style='float:left'>⬆️上一节🔗  </a><a href = '22.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<ul>
<li><a href="https://blog.palark.com/small-local-kubernetes-comparison/" target="_blank" rel="noopener noreferrer">本章为摘选，截取<ExternalLinkIcon/></a></li>
</ul>
<p>因此，您已经提出了一个自动化、统一或转换集群中某些内容的想法，但您不想冒破坏集群的风险。大多数有过 Kubernetes 经验的人都熟悉这种情况。为此，您需要的是一个易于设置的沙盒来测试您的想法，而不会冒太大风险。</p>
<p>在这种情况下，Kubernetes 迷你集群会派上用场。您可以在台式机或笔记本电脑上运行它们，修补基元，构建新结构，然后在实验结束时毫不犹豫地删除它们。</p>
<p>世界各地的开发人员通过发明各种解决方案来满足这一需求，这些解决方案使您能够快速轻松地启动轻量级 Kubernetes 环境。所有这些解决方案都具有不同的设计和功能。您选择的那个将取决于您的需求和偏好。本文回顾了一些最受欢迎的工具，帮助您更好地了解它们并选择正确的工具。幸运的是，它们都有相对完善的文档记录（无论是在官方网站上还是在 CLI 中），这大大加快了学习过程并使它们易于使用。在本文的最后，我们提供了一个比较表，详细介绍了解决方案的主要功能。</p>
<h2 id="工具" tabindex="-1"><a class="header-anchor" href="#工具" aria-hidden="true">#</a> 工具</h2>
<h3 id="_1-k0s" tabindex="-1"><a class="header-anchor" href="#_1-k0s" aria-hidden="true">#</a> 1. K0s</h3>
<ul>
<li>网站： <a href="https://k0sproject.io/" target="_blank" rel="noopener noreferrer">k0sproject.io<ExternalLinkIcon/></a></li>
<li>GitHub 存储库：<a href="https://github.com/k0sproject/k0s" target="_blank" rel="noopener noreferrer">k0sproject/k0s<ExternalLinkIcon/></a></li>
<li>GitHub 明星： 4，000+</li>
<li>贡献者： 30+</li>
<li>首次提交：2020 年 6 月</li>
<li>主要开发商：米兰蒂斯</li>
<li>支持的 K8s 版本：1.20 和 1.21</li>
</ul>
<p>该项目的名称不言自明：很难想象一个系统更轻量级，因为它基于单个自给自足（静态构建）的文件。您需要做的就是从项目存储库下载它的当前版本，然后您可以继续配置和使用集群。该文件是为 Linux 编译的。因此，群集只能在该系统上运行（有关支持的主机系统的详细信息，请参阅本文末尾）。请注意，只有根用户才能运行它。</p>
<p><a href="https://github.com/k0sproject/k0s/blob/main/docs/install.md" target="_blank" rel="noopener noreferrer">安装<ExternalLinkIcon/></a>完成后（您需要做的就是将文件复制到<code v-pre>/usr/local/bin</code>），使用帮助程序脚本将 K0s 作为服务启动。现在，您可以将其作为群集节点（默认为主节点）访问：</p>
<div class="language-undefined ext-undefined line-numbers-mode"><pre v-pre class="language-undefined"><code>k0s install controller ; systemctl start k0scontroller.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>k0s 包含用于连接到 Kubernetes API 的 kubectl CLI 工具：</p>
<div class="language-undefined ext-undefined line-numbers-mode"><pre v-pre class="language-undefined"><code>k0s kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您可以使用<code v-pre>k0s kubectl</code>创建其他 Kubernetes 对象：命名空间、部署等。要将节点添加到 k0s 群集，请在要用作工作器节点的服务器上下载并安装 k0s 二进制文件。接下来，生成身份验证令牌，该令牌将用于将节点加入群集。其他服务器可以在容器或 VM 上运行：您所要做的就是确保 API 服务器的网络可用性，以便在群集中注册节点。</p>
<p>要卸载 k0s 群集，首先需要停止服务 （<code v-pre>k0s stop</code>），然后调用 reset 命令从主机中删除所有与 k0s 相关的文件。</p>
<p>containerd 守护进程在 Pod 中管理和运行容器。此外，您还可以将 hostPath 卷挂载到 Pod。Calico作为默认的CNI，而kube-router也可用。从本质上讲，你可以使用任何你喜欢的 CNI，因为 k0s 不会以任何方式限制 Kubernetes 配置。</p>
<p>为了方便用户，k0s 为各种 shell 提供了自动完成脚本：Bash、zsh、fish 和 PowerShell（使用 WSL）。</p>
<p>k0s 尽可能简约：它是一个没有任何模块或插件的普通 Kubernetes。默认情况下，它不支持云提供商（但是，您可以在启动期间 <a href="https://github.com/k0sproject/k0s/blob/main/docs/cloud-providers.md" target="_blank" rel="noopener noreferrer">添加它<ExternalLinkIcon/></a>）。该软件的安装方式与常规 Kubernetes 集群中的安装方式相同——通过声明必要的原语（您可以使用 Helm 和其他此类工具）。</p>
<h3 id="_2-microk8s型-k8s" tabindex="-1"><a class="header-anchor" href="#_2-microk8s型-k8s" aria-hidden="true">#</a> 2. MicroK8s型 K8s</h3>
<ul>
<li>网站： <a href="https://microk8s.io/" target="_blank" rel="noopener noreferrer">microk8s.io<ExternalLinkIcon/></a></li>
<li>GitHub 存储库：<a href="https://github.com/ubuntu/microk8s" target="_blank" rel="noopener noreferrer">ubuntu/microk8s<ExternalLinkIcon/></a></li>
<li>GitHub 星数： ~5，700</li>
<li>贡献者： 120+</li>
<li>首次提交：2018 年 5 月</li>
<li>主要开发商：佳能</li>
<li>支持的 K8s 版本：1.19—1.21</li>
</ul>
<p>Canonical 的这个迷你集群与前一个类似：集群节点需要手动设置，它们可以在通过 TCP/IP 连接到第一个（主）节点的任何 Linux 实例上运行。同样，添加新节点需要令牌，而内置的 kubectl 工具处理 API 交互。</p>
<p>印花布也用作默认的 CNI。您需要 root 权限才能安装它。MicroK8s 以快照包的形式提供，支持 42 个 Linux 发行版：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># snap install microk8s --classic</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成后，您可以启动群集：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># microk8s start</span>
<span class="token comment"># microk8s kubectl get nodes</span>
NAME            STATUS   ROLES    AGE    VERSION
thinkpad        Ready       2m     v1.20.7<span class="token punctuation">-</span>34+df7df22a741dbc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，MicroK8s 附带 <a href="https://microk8s.io/docs/addons" target="_blank" rel="noopener noreferrer">一组插件<ExternalLinkIcon/></a>。您可以随时启用和禁用它们。例如，以下内容将启用 Kubernetes 仪表板：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># microk8s enable dashboard</span>
<span class="token comment"># microk8s status</span>
microk8s is running
<span class="token key atrule">high-availability</span><span class="token punctuation">:</span> no
  <span class="token key atrule">datastore master nodes</span><span class="token punctuation">:</span> 127.0.0.1<span class="token punctuation">:</span><span class="token number">19001</span>
  <span class="token key atrule">datastore standby nodes</span><span class="token punctuation">:</span> none
<span class="token key atrule">addons</span><span class="token punctuation">:</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span>
    dashboard            <span class="token comment"># The Kubernetes dashboard</span>
    <span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与k0s类似，MicroK8s带有一个用于存储容器映像的内部注册表。</p>
<p>另一个令人兴奋的功能是 <code v-pre>microk8s inspect</code> 命令。它的作用是分析集群并编译有关其组件的完整报告（作为 tar.gz 文件）以供进一步研究：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ls</span> inspection-report/
apparmor
args
juju
k8s
kubeflow
network
snap.microk8s.daemon-apiserver
snap.microk8s.daemon-apiserver-kicker
snap.microk8s.daemon-cluster-agent
snap.microk8s.daemon-containerd
snap.microk8s.daemon-controller-manager
snap.microk8s.daemon-control-plane-kicker
snap.microk8s.daemon-kubelet
snap.microk8s.daemon-proxy
snap.microk8s.daemon-scheduler
sys
$ <span class="token function">ls</span> inspection-report/k8s/
cluster-info
cluster-info-dump
get-all
get-pv
get-pvc
version
$ <span class="token function">cat</span> inspection-report/k8s/version 
Client Version: version.Info<span class="token punctuation">{</span>Major:<span class="token string">"1"</span>, Minor:<span class="token string">"20+"</span>, GitVersion:<span class="token string">"v1.20.7-34+df7df22a741dbc"</span>, GitCommit:<span class="token string">"df7df22a741dbc18dc3de3000b2393a1e3c32d36"</span>, GitTreeState:<span class="token string">"clean"</span>, BuildDate:<span class="token string">"2021-05-12T21:08:20Z"</span>, GoVersion:<span class="token string">"go1.15.10"</span>, Compiler:<span class="token string">"gc"</span>, Platform:<span class="token string">"linux/amd64"</span><span class="token punctuation">}</span>
Server Version: version.Info<span class="token punctuation">{</span>Major:<span class="token string">"1"</span>, Minor:<span class="token string">"20+"</span>, GitVersion:<span class="token string">"v1.20.7-34+df7df22a741dbc"</span>, GitCommit:<span class="token string">"df7df22a741dbc18dc3de3000b2393a1e3c32d36"</span>, GitTreeState:<span class="token string">"clean"</span>, BuildDate:<span class="token string">"2021-05-12T21:09:51Z"</span>, GoVersion:<span class="token string">"go1.15.10"</span>, Compiler:<span class="token string">"gc"</span>, Platform:<span class="token string">"linux/amd64"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-kind" tabindex="-1"><a class="header-anchor" href="#_3-kind" aria-hidden="true">#</a> 3. kind</h3>
<ul>
<li>网站： <a href="https://kind.sigs.k8s.io/" target="_blank" rel="noopener noreferrer">kind.sigs.k8s.io<ExternalLinkIcon/></a></li>
<li>GitHub repository： <a href="https://github.com/kubernetes-sigs/kind" target="_blank" rel="noopener noreferrer">kubernetes-sigs/kind<ExternalLinkIcon/></a></li>
<li>GitHub 星级： ~8，500</li>
<li>贡献者： 200+</li>
<li>首次提交：2018 年 9 月</li>
<li>关键开发人员：Kubernetes SIG</li>
<li>支持的 K8s 版本：1.21</li>
</ul>
<p>kind（Docker中的Kubernetes）是另一个用于运行本地 K8s 集群的轻量级工具。安装非常简单：您所要做的就是<a href="https://kind.sigs.k8s.io/docs/user/quick-start/#installation" target="_blank" rel="noopener noreferrer">下载<ExternalLinkIcon/></a>可执行文件。</p>
<p>要创建集群，您首先需要创建 Docker 容器和网络的权限。创建集群就像运行一样简单<code v-pre>kind create cluster</code>.这将启动一个节点 — 一个用于运行其他容器的 Docker 容器：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> <span class="token function">ps</span>
CONTAINER ID        IMAGE                  COMMAND                  CREATED             STATUS              PORTS                       NAMES
fee30f6d4b73        kindest/node:v1.21.1   <span class="token string">"/usr/local/bin/entr…"</span>   <span class="token number">2</span> minutes ago       Up About a minute   <span class="token number">127.0</span>.0.1:45331-<span class="token operator">></span><span class="token number">6443</span>/tcp   kind-control-plane
$ kind get nodes
kind-control-plane
$ kubectl get nodes
NAME                 STATUS   ROLES                  AGE   VERSION
kind-control-plane   Ready    control-plane,master   2m    v1.21.1
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> kind-control-plane <span class="token function">bash</span>
root@kind-control-plane:/<span class="token comment"># crictl ps</span>
CONTAINER           IMAGE               CREATED             STATE               NAME                      ATTEMPT             POD ID
2a0dfe12a5810       296a6d5035e2d       <span class="token number">2</span> minutes ago       Running             coredns                   <span class="token number">0</span>                   e13acbf529288
38ef0ad97090a       296a6d5035e2d       <span class="token number">2</span> minutes ago       Running             coredns                   <span class="token number">0</span>                   3460cf0419c19
ec11cbc0e9795       e422121c9c5f9       <span class="token number">2</span> minutes ago       Running             local-path-provisioner    <span class="token number">0</span>                   a9ffa60dcc12d
fa8057bbf0df6       6de166512aa22       <span class="token number">3</span> minutes ago       Running             kindnet-cni               <span class="token number">0</span>                   4f8481acba5fc
e341ce4c5cdfd       ebd41ad8710f9       <span class="token number">3</span> minutes ago       Running             kube-proxy                <span class="token number">0</span>                   1b1755819c40a
88c6185beb5c5       0369cf4303ffd       <span class="token number">3</span> minutes ago       Running             etcd                      <span class="token number">0</span>                   da01c1b2b0cdc
5cdf1b4ce6deb       d0d10a483067a       <span class="token number">3</span> minutes ago       Running             kube-controller-manager   <span class="token number">0</span>                   a0b2651c06136
b704a102409e1       6401e478dcc01       <span class="token number">3</span> minutes ago       Running             kube-apiserver            <span class="token number">0</span>                   c2119c740fff2
a5da036de5d10       7813cf876a0d4       <span class="token number">3</span> minutes ago       Running             kube-scheduler            <span class="token number">0</span>                   92a22aa99ad29
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>** 这也将创建一个 Docker 网络。如果安装由于以下错误而失败：*</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">ERROR</span><span class="token punctuation">:</span> <span class="token key atrule">failed to create cluster</span><span class="token punctuation">:</span> <span class="token key atrule">failed to ensure docker network</span><span class="token punctuation">:</span> <span class="token key atrule">command "docker network create -d=bridge -o com.docker.network.bridge.enable_ip_masquerade=true -o com.docker.network.driver.mtu=1500 --ipv6 --subnet fc00:f853:ccd:e793::/64 kind" failed with error</span><span class="token punctuation">:</span> exit status 1
<span class="token key atrule">Command Output</span><span class="token punctuation">:</span> <span class="token key atrule">Error response from daemon</span><span class="token punctuation">:</span> could not find an available<span class="token punctuation">,</span> non<span class="token punctuation">-</span>overlapping IPv4 address pool among the defaults to assign to the network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><em>...检查  OpenVPN  进程是否在系统中运行，并在安装过程中停止它。安装完成后，您可以恢复其操作。</em></p>
<p>此外，在创建群集时，<code v-pre>kubectl</code>配置为访问 API。要创建更复杂的集群，您需要在设置集群时指定配置文件（使用 <code v-pre>--config</code> 旗）。下面是如何创建由三个节点组成的群集的示例：</p>
<div class="language-undefined ext-undefined line-numbers-mode"><pre v-pre class="language-undefined"><code>kind create cluster --config=three-node-conf.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>...哪里<code v-pre>three-node-conf.yaml</code>具有以下内容：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Cluster
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kind.x<span class="token punctuation">-</span>k8s.io/v1alpha4
<span class="token key atrule">nodes</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">role</span><span class="token punctuation">:</span> control<span class="token punctuation">-</span>plane
<span class="token punctuation">-</span> <span class="token key atrule">role</span><span class="token punctuation">:</span> worker
<span class="token punctuation">-</span> <span class="token key atrule">role</span><span class="token punctuation">:</span> worker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除同样简单：调用<code v-pre>kind delete cluster</code>从<code v-pre>kubectl</code>配置。作为旁注，还支持 Bash、zsh 和 fish 的自动完成脚本。</p>
<p>由于节点是 Docker 容器，因此在 Pod 中挂载 HostPath 卷会使用容器文件系统。这样，您可以将容器的目录转发到主机操作系统的文件系统。您可以将 Docker 镜像从主主机上传到群集节点。但是，它不附带任何插件或插件。</p>
<p>kind 附带了一个基本的 <em>kindnetd</em> 插件作为默认CNI，但您也可以使用其他插件。虽然对自定义 CNI 的支持被描述为有限，但许多流行的 CNI 清单（例如 Calico）工作得很好。</p>
<p>进一步配置通过<code v-pre>kubectl</code>.例如，您可以使用以下命令安装 Ingress NGINX：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-k3s-和k3d" tabindex="-1"><a class="header-anchor" href="#_4-k3s-和k3d" aria-hidden="true">#</a> 4. K3S（和K3D）</h3>
<ul>
<li>网站：<a href="https://k3s.io/" target="_blank" rel="noopener noreferrer">k3s.io<ExternalLinkIcon/></a>（和 <a href="https://k3d.io/" target="_blank" rel="noopener noreferrer">k3d.io<ExternalLinkIcon/></a>)</li>
<li>GitHub repository： k3s-io/k3s （<a href="https://github.com/rancher/k3d" target="_blank" rel="noopener noreferrer">rancher/k3d<ExternalLinkIcon/></a> )</li>
<li>GitHub 星： ~17，800 （~2800）</li>
<li>贡献者： 1，750+ （50+）</li>
<li>首次提交：2019 年 1 月（2019 年 4 月）</li>
<li>主要开发商：CNCF（牧场主）</li>
<li>支持的 K8s 版本：1.17—1.21</li>
</ul>
<p>K3s 是 Rancher 的一个 Kubernetes 发行版，其名称类似于 K8s，但“只有一半大”，以强调其轻量级和简单性（尽管功能较少）。它的总体思路与k0s和MicroK8s没有太大区别。启动后，k3s 会创建具有以下两个角色之一的群集节点：</p>
<ul>
<li>作为主服务器运行的服务器：API 服务器、调度程序和控制器管理器（带有 SQLite 数据库）;</li>
<li>运行普通 Kubernetes 节点的代理：管理 <a href="https://cri-o.io/" target="_blank" rel="noopener noreferrer">CRI-O<ExternalLinkIcon/></a> 容器的 kubelet 和 containerd。</li>
</ul>
<p>大多数磁盘驱动程序和云提供程序驱动程序已从构建中排除，以使可执行文件更小。由于它结合了几个标准的 Kubernetes 组件，因此减少了内存使用量。</p>
<p>在最简单的情况下，您可以使用 Docker Desktop 将群集作为单个节点的一部分运行（不需要成熟的虚拟化系统）。</p>
<p>除了发行版之外，还有一个 <strong>k3d</strong> 实用程序，用于管理 Docker 容器中运行的 k3s 节点。它在Linux中运行，可以使用<a href="https://k3d.io/#install-script" target="_blank" rel="noopener noreferrer">Bash脚本<ExternalLinkIcon/></a>进行安装.</p>
<p>要启动集群，您只需要创建 Docker 容器和网络的权限。</p>
<p>以下命令可用于创建群集：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ k3d cluster create mycluster <span class="token parameter variable">--servers</span> <span class="token number">1</span> <span class="token parameter variable">--agents</span> <span class="token number">2</span>
$ kubectl get nodes
NAME                  STATUS   ROLES                  AGE   VERSION
k3d-mycluster-agent-0    Ready                     30s   v1.20.6+k3s1
k3d-mycluster-agent-1    Ready                     22s   v1.20.6+k3s1
k3d-mycluster-server-0   Ready    control-plane,master   39s   v1.20.6+k3s1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请参阅上面有关在安装期间创建 Docker 网络以及运行 OpenVPN 进程导致的错误的说明。但是，在这种情况下，错误消息将有所不同：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">Failed Cluster Preparation</span><span class="token punctuation">:</span> <span class="token key atrule">Failed Network Preparation</span><span class="token punctuation">:</span> <span class="token key atrule">Error response from daemon</span><span class="token punctuation">:</span> could not find an available<span class="token punctuation">,</span> non<span class="token punctuation">-</span>overlapping IPv4 address pool among the defaults to assign to the network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>每个群集节点都在自己的容器中运行，以及充当负载均衡器的 nginx 容器。Flannel 用作 CNI 插件，而 <a href="https://traefik.io/traefik/" target="_blank" rel="noopener noreferrer">Traefik<ExternalLinkIcon/></a> 用作入口代理。您也可以选择其他 CNI;例如，您可以在文档中找到有关印花布和运河<a href="https://rancher.com/docs/k3s/latest/en/installation/network-options/#custom-cni" target="_blank" rel="noopener noreferrer">的具体说明<ExternalLinkIcon/></a>。还支持 Bash、zsh、fish 和 PowerShell 的自动完成脚本。</p>
<p>此外，您还可以管理映像存储库：在群集中创建自定义存储库并从主系统导入映像。如果您在本地构建 Docker 映像，这会派上用场，因为它们将在构建后立即在集群中可用。</p>
<h3 id="_5-minikube" tabindex="-1"><a class="header-anchor" href="#_5-minikube" aria-hidden="true">#</a> 5. minikube</h3>
<ul>
<li>网站： <a href="https://minikube.sigs.k8s.io/" target="_blank" rel="noopener noreferrer">minikube.sigs.k8s.io<ExternalLinkIcon/></a></li>
<li>GitHub repository： <a href="https://github.com/kubernetes/minikube" target="_blank" rel="noopener noreferrer">kubernetes/minikube<ExternalLinkIcon/></a></li>
<li>GitHub 星级： ~25，300</li>
<li>贡献者： 650+</li>
<li>首次提交：2016 年 4 月</li>
<li>关键开发人员：Kubernetes SIG</li>
<li>支持的 K8s 版本：1.11—1.22</li>
</ul>
<p>对于基于 Debian 和 Red Hat 的 Linux 发行版，您需要做的就是<a href="https://minikube.sigs.k8s.io/docs/start/" target="_blank" rel="noopener noreferrer">安装<ExternalLinkIcon/></a>适当的软件包以使用 Minikube。您可以使用以下命令创建集群（不需要 root 权限;但是，用户必须具有足够的权限才能设置虚拟化系统）：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$ minikube start
* minikube v1.20.0 on Ubuntu 18.04
* Automatically selected the docker driver. Other choices<span class="token punctuation">:</span> kvm2<span class="token punctuation">,</span> ssh
…
* Preparing Kubernetes v1.20.2 on Docker 20.10.6 <span class="token punctuation">...</span>
…
* Enabled addons<span class="token punctuation">:</span> storage<span class="token punctuation">-</span>provisioner<span class="token punctuation">,</span> default<span class="token punctuation">-</span>storageclass
* Done<span class="token tag">!</span> kubectl is now configured to use "minikube" cluster and "default" namespace by default
$ kubectl get nodes
NAME       STATUS   ROLES                  AGE    VERSION
minikube   Ready    control<span class="token punctuation">-</span>plane<span class="token punctuation">,</span>master   48s    v1.20.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在您可以使用 kubectl 配置（它使用新集群的访问数据进行更新）。还支持 Bash、zsh 和 fish 的自动完成脚本。</p>
<p>对于本地操作系统，Minikube实现了<em>smth1-in-smth2</em>系统，其中：</p>
<ul>
<li>SMTH1 是以下之一：<em>docker</em>、<em>cri-o</em> 或 <em>containerd</em>;</li>
<li>SMTH2 是以下之一：<em>VirtualBox</em>、VMwareFusion、<em>KVM2</em>、<em>VMware</em>、<em>None</em>、<em>Docker</em>、<em>Podman</em> 或 <em>SSH</em> .</li>
</ul>
<p>您还可以选择使用哪个 CNI 插件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>minikube <span class="token builtin class-name">help</span> start
Starts a <span class="token builtin class-name">local</span> Kubernetes cluster

Options:
<span class="token punctuation">..</span>.    
      <span class="token parameter variable">--cni</span><span class="token operator">=</span><span class="token string">''</span><span class="token builtin class-name">:</span> CNI plug-in to use. Valid options: auto, bridge, calico, cilium, flannel, kindnet, or path to a CNI manifest <span class="token punctuation">(</span>default: auto<span class="token punctuation">)</span>
      --container-runtime<span class="token operator">=</span><span class="token string">'docker'</span><span class="token builtin class-name">:</span> The container runtime to be used <span class="token punctuation">(</span>docker, cri-o, containerd<span class="token punctuation">)</span>.
<span class="token punctuation">..</span>.
      <span class="token parameter variable">--driver</span><span class="token operator">=</span><span class="token string">''</span><span class="token builtin class-name">:</span> Driver is one of: virtualbox, vmwarefusion, kvm2, vmware, none, docker, podman, <span class="token function">ssh</span> <span class="token punctuation">(</span>defaults to auto-detect<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用以下命令将节点添加到群集：</p>
<div class="language-undefined ext-undefined line-numbers-mode"><pre v-pre class="language-undefined"><code>$ minikube node add
* Adding node m02 to cluster minikube
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>要查看群集的当前状态，请使用以下命令<code v-pre>minikube status</code>命令：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>minikube
<span class="token key atrule">type</span><span class="token punctuation">:</span> Control Plane
<span class="token key atrule">host</span><span class="token punctuation">:</span> Running
<span class="token key atrule">kubelet</span><span class="token punctuation">:</span> Running
<span class="token key atrule">apiserver</span><span class="token punctuation">:</span> Running
<span class="token key atrule">kubeconfig</span><span class="token punctuation">:</span> Configured

minikube<span class="token punctuation">-</span>m02
<span class="token key atrule">type</span><span class="token punctuation">:</span> Worker
<span class="token key atrule">host</span><span class="token punctuation">:</span> Running
<span class="token key atrule">kubelet</span><span class="token punctuation">:</span> Running
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这<code v-pre>minikube mount</code> <a href="https://minikube.sigs.k8s.io/docs/handbook/mount/#9p-mounts" target="_blank" rel="noopener noreferrer">命令<ExternalLinkIcon/></a>将主机目录挂载到 VM 中（请注意，<a href="https://en.wikipedia.org/wiki/9P_(protocol)" target="_blank" rel="noopener noreferrer">9P<ExternalLinkIcon/></a> 协议用于挂载）。因此，您可以通过将 HostPath 卷挂载到 Pod 中来直接编辑主机文件（否<code v-pre>docker cp</code>是需要的;但是，如果您愿意，可以使用该命令）。</p>
<p>请注意，如果 9P 与大量文件一起使用，则会出现性能和可靠性问题。虚拟化系统的（VirtualBox，KVM，VMware）文件系统选项可以帮助您解决这个问题。</p>
<p>Minikube提供了一组插件，您可以在集群中轻松激活它们：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ minikube addons <span class="token builtin class-name">enable</span> dashboard
…
* The <span class="token string">'dashboard'</span> addon is enabled
$ minikube addons list
…
<span class="token operator">|</span> dashboard                   <span class="token operator">|</span> minikube <span class="token operator">|</span> enabled    <span class="token operator">|</span>
…
$ kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get pod
NAME                                        READY   STATUS    RESTARTS   AGE
dashboard-metrics-scraper-f6647bd8c-rrxq6   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          29s
kubernetes-dashboard-968bcb79-tk5qt         <span class="token number">1</span>/1     Running   <span class="token number">0</span>          29s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同样，您可以启用注册表，入口，Istio 和许多其他<a href="https://minikube.sigs.k8s.io/docs/handbook/addons/" target="_blank" rel="noopener noreferrer">组件<ExternalLinkIcon/></a>。.</p>
<p>Minikube 还可以同时处理具有不同配置文件的多个集群：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$ minikube start <span class="token punctuation">-</span>p minik2
* <span class="token punctuation">[</span>minik2<span class="token punctuation">]</span> minikube v1.20.0 on Ubuntu 18.04
* Automatically selected the docker driver. Other choices<span class="token punctuation">:</span> kvm2<span class="token punctuation">,</span> ssh
* Starting control plane node minik2 in cluster minik2
…
$ minikube profile list
<span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">-</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">-</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">|</span>
<span class="token punctuation">|</span> Profile  <span class="token punctuation">|</span> VM Driver <span class="token punctuation">|</span> Runtime <span class="token punctuation">|</span>      IP      <span class="token punctuation">|</span> Port <span class="token punctuation">|</span> Version <span class="token punctuation">|</span> Status  <span class="token punctuation">|</span> Nodes <span class="token punctuation">|</span>
<span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">-</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">-</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">|</span>
<span class="token punctuation">|</span> minik2   <span class="token punctuation">|</span> docker    <span class="token punctuation">|</span> docker  <span class="token punctuation">|</span> 192.168.58.2 <span class="token punctuation">|</span> 8443 <span class="token punctuation">|</span> v1.20.2 <span class="token punctuation">|</span> Running <span class="token punctuation">|</span>     1 <span class="token punctuation">|</span>
<span class="token punctuation">|</span> minikube <span class="token punctuation">|</span> docker    <span class="token punctuation">|</span> docker  <span class="token punctuation">|</span> 192.168.49.2 <span class="token punctuation">|</span> 8443 <span class="token punctuation">|</span> v1.20.2 <span class="token punctuation">|</span> Running <span class="token punctuation">|</span>     2 <span class="token punctuation">|</span>
<span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">-</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">-</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">|</span><span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span><span class="token punctuation">|</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-替代解决方案" tabindex="-1"><a class="header-anchor" href="#_6-替代解决方案" aria-hidden="true">#</a> 6. 替代解决方案</h3>
<p>有些项目没有被纳入本综述，因为它们不太受欢迎或出于其他原因。例如：</p>
<ul>
<li><a href="https://github.com/code-ready/crc" target="_blank" rel="noopener noreferrer">Red Hat CRC<ExternalLinkIcon/></a> 工具（CodeReady Containers;750+ GitHub stars）取代<a href="https://github.com/minishift/minishift" target="_blank" rel="noopener noreferrer">了 Minishift<ExternalLinkIcon/></a>，在笔记本电脑/台式机上运行最小的 OpenShift 4.x 集群。</li>
<li>Weaveworks的<a href="https://github.com/weaveworks/wks-quickstart-firekube" target="_blank" rel="noopener noreferrer">Firekube<ExternalLinkIcon/></a>（~300 GitHub星）是一个在<a href="https://github.com/firecracker-microvm/firecracker" target="_blank" rel="noopener noreferrer">Firecracker<ExternalLinkIcon/></a>虚拟机中运行的Kubernetes集群，也值得一提。但是，它似乎并不活跃。</li>
</ul>
<h2 id="支持的操作系统" tabindex="-1"><a class="header-anchor" href="#支持的操作系统" aria-hidden="true">#</a> 支持的操作系统</h2>
<p>上述所有发行版都在 Linux 上运行。但是，即使您的主机具有不同的操作系统（借助虚拟化工具），您也可以使用它们：</p>
<ul>
<li><a href="https://multipass.run/" target="_blank" rel="noopener noreferrer">Multipass<ExternalLinkIcon/></a> 和 <a href="https://www.virtualbox.org/" target="_blank" rel="noopener noreferrer">VirtualBox<ExternalLinkIcon/></a> 适用于大多数情况;</li>
<li>在其他情况下，可能需要使用特殊的虚拟化工具，例如 Windows 上的 <a href="https://docs.microsoft.com/en-us/windows/wsl/about" target="_blank" rel="noopener noreferrer">WSL<ExternalLinkIcon/></a>。</li>
</ul>
<p>对于kind，k3d和Minikube，您可以使用一个Linux VM（用于基本集群），而在k0s，Microk8s和k3s的情况下，您将需要创建多个与集群节点数量相等的VM。</p>
<h2 id="比较表" tabindex="-1"><a class="header-anchor" href="#比较表" aria-hidden="true">#</a> 比较表</h2>
<p>以下是基本功能的摘要：</p>
<table>
<thead>
<tr>
<th></th>
<th>K0s</th>
<th>MicroK8s</th>
<th>kind</th>
<th>K3S + K3D</th>
<th>minikube</th>
</tr>
</thead>
<tbody>
<tr>
<td>管理节点创建/删除</td>
<td>✗</td>
<td>✗</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td>节点管理系统</td>
<td>✗</td>
<td>✗</td>
<td>docker</td>
<td>docker</td>
<td>virtualbox， vmwarefusion， kvm2， vmware， none， docker， podman， ssh</td>
</tr>
<tr>
<td>容器运行时</td>
<td>containerd</td>
<td>containerd</td>
<td>containerd, CRI-O</td>
<td>CRI-O</td>
<td>Docker, CRI-O, containerd</td>
</tr>
<tr>
<td>默认 CNI</td>
<td>Calico</td>
<td>Calico</td>
<td>kindnet</td>
<td>Flannel</td>
<td>bridge</td>
</tr>
<tr>
<td>挂载主机操作系统的文件系统</td>
<td>HostPath</td>
<td>HostPath</td>
<td>HostPath + docker mount</td>
<td>HostPath + docker mount</td>
<td>HostPath + … (depends on the virtualization system)</td>
</tr>
<tr>
<td>插件</td>
<td>✗</td>
<td>✓</td>
<td>✗</td>
<td>✗</td>
<td>✓</td>
</tr>
<tr>
<td>非特权用户创建群集的能力</td>
<td>✗</td>
<td>✗</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td>Vanilla Kubernetes</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✗</td>
<td>✓</td>
</tr>
</tbody>
</table>
<div class="custom-container tip"><p class="custom-container-title">Vanilla Kubernetes</p>
<p>Vanilla Kubernetes 指纯净、原生的 Kubernetes，一般还有 Vanilla JavaScript/Vanilla Linux 等用法，指原生 JavaScript 或 Linux，而不是它们的方言版或发行版本。</p>
<p>原生 Kubernetes 指的是 Kubernetes 的原生未修改版本，提供源代码下载。</p>
<p>之所以称为原生版，是因为在软件界有一个长达几十年的传统，即打上 “Vanilla” 原生标签的软件被部署到任何应用程序或平台上时，表示这是没有修改过的官方版本。类似于，我们还会听到“原生 Linux” ，这是指使用纯粹的、官方的 Linux 内核源代码构建 Linux 内核，而不像在 Linux 发行版本中，会修改 Linux 内核程序。</p>
<p>与原生 Kubernetes 相对的是 Kubernetes 发行版，例如 Rancher，Red Hat OpenShift，或基于云的 Kubernetes 服务，例如 Amazon EKS。这些发行版采用了开源 Kubernets 代码，并将其集成到更广泛的平台中，而这些平台通常包含不属于 Kubernetes 本身的管理、监视和安全工具。这些平台中的很多平台还提供安装程序，简化 Kubernetes 安装程序。</p>
<p>当然，最近也有人提出了不适用发行版本的 Kubernets 的5个理由，具体可以参考：<a href="https://www.itprotoday.com/devops/5-reasons-not-use-kubernetes-distributions" target="_blank" rel="noopener noreferrer">5 Reasons Not to Use Kubernetes Distributions<ExternalLinkIcon/></a></p>
</div>
<h2 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h2>
<p>比较是在特定任务（本地运行的沙盒）的上下文中进行的，但上面的一些发行版是为利基使用场景设计的。例如，Canonical 的 MicroK8s 和 Rancher 的 K3s 针对物联网和边缘计算。因此，我应该重申，最终的选择 <strong>将在很大程度上取决于手头的任务</strong>、资源考虑和网络基础设施要求。我希望以上信息对您做出正确的选择有所帮助。</p>
<h2 id="有用的外部链接" tabindex="-1"><a class="header-anchor" href="#有用的外部链接" aria-hidden="true">#</a> 有用的外部链接</h2>
<ul>
<li><a href="https://en.sokube.ch/post/k3s-k3d-k8s-a-new-perfect-match-for-dev-and-test-1" target="_blank" rel="noopener noreferrer">K3S + K3D = K8S：开发和测试的新完美匹配<ExternalLinkIcon/></a></li>
<li><a href="https://habd.as/post/kubernetes-macos-k3s-k3d-rancher/" target="_blank" rel="noopener noreferrer">带有 K3s、K3d 和 Rancher 的 macOS 上的 K8s<ExternalLinkIcon/></a></li>
<li><a href="https://www.reddit.com/r/kubernetes/comments/n2bsrz/k3s_vs_microk8s_vs_k0s_and_thoughts_about_their/" target="_blank" rel="noopener noreferrer">K3S vs Microk8S vs K0s 以及对未来的想法<ExternalLinkIcon/></a></li>
<li><a href="https://www.reddit.com/r/kubernetes/comments/be0415/k3s_minikube_or_microk8s/" target="_blank" rel="noopener noreferrer">K3s，minikube还是microk8s？<ExternalLinkIcon/></a></li>
<li><a href="https://faun.pub/environment-for-comparing-several-on-premise-kubernetes-distributions-k3s-kind-kubeadm-a53675a80a00" target="_blank" rel="noopener noreferrer">用于比较几个内部部署 Kubernetes 发行版（K3s、MicroK8s、KinD、kubeadm）的环境<ExternalLinkIcon/></a></li>
<li><a href="https://www.padok.fr/en/blog/minikube-kubeadm-kind-k3s" target="_blank" rel="noopener noreferrer">MiniKube， Kubeadm， Kind， K3S， 如何开始使用 Kubernetes？<ExternalLinkIcon/></a></li>
<li><a href="http://ceur-ws.org/Vol-2839/paper11.pdf" target="_blank" rel="noopener noreferrer">分析轻量级容器平台：MicroK8s 和 K3s 与 Kubernetes 的比较<ExternalLinkIcon/></a><em>（性能测试）</em></li>
<li><a href="https://brennerm.github.io/posts/minikube-vs-kind-vs-k3s.html" target="_blank" rel="noopener noreferrer">Minikube vs. kind vs. k3s – 我应该使用什么？<ExternalLinkIcon/></a><em>（总结）</em></li>
<li><a href="https://searchitoperations.techtarget.com/answer/Evaluate-3-ways-to-run-Kubernetes-locally" target="_blank" rel="noopener noreferrer">评估在本地运行 Kubernetes 的 3 种方法<ExternalLinkIcon/></a></li>
<li><a href="https://docs.tilt.dev/choosing_clusters.html" target="_blank" rel="noopener noreferrer">选择本地开发群集<ExternalLinkIcon/></a></li>
<li><a href="https://kubevious.io/blog/post/what-is-mirantis-k0s-and-how-it-compares-with-rancher-k3s" target="_blank" rel="noopener noreferrer">什么是米兰蒂斯k0s，它与牧场主k3s有何不同<ExternalLinkIcon/></a></li>
<li><a href="https://www.cncf.io/wp-content/uploads/2020/08/CNCF-Webinar-Navigating-the-Sea-of-Local-Clusters-.pdf" target="_blank" rel="noopener noreferrer">驾驭 Kubernetes 本地集群的海洋<ExternalLinkIcon/></a></li>
</ul>
<h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章" aria-hidden="true">#</a> 相关文章</h2>
<ul>
<li><a href="https://blog.palark.com/comparing-ingress-controllers-for-kubernetes/" target="_blank" rel="noopener noreferrer">比较 Kubernetes 的入口控制器<ExternalLinkIcon/></a></li>
<li><a href="https://blog.palark.com/open-source-self-hosted-serverless-frameworks-for-kubernetes/" target="_blank" rel="noopener noreferrer">Kubernetes 自托管无服务器框架概述：OpenFaaS、Knative、OpenWhisk、Fission<ExternalLinkIcon/></a></li>
<li><a href="https://blog.palark.com/logs-in-kubernetes-expectations-vs-reality/" target="_blank" rel="noopener noreferrer">Kubernetes 中的日志：期望与现实<ExternalLinkIcon/></a></li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '20.md' style='float:left'>⬆️上一节🔗  </a><a href = '22.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


