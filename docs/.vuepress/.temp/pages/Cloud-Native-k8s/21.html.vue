<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第21节-minikube-和-kind" tabindex="-1"><a class="header-anchor" href="#第21节-minikube-和-kind" aria-hidden="true">#</a> 第21节 Minikube 和 Kind</h1>
<div><a href = '20.md' style='float:left'>⬆️上一节🔗  </a><a href = '22.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="关于-minikube" tabindex="-1"><a class="header-anchor" href="#关于-minikube" aria-hidden="true">#</a> 关于 Minikube</h2>
<ul>
<li><a href="https://github.com/kubernetes/minikube" target="_blank" rel="noopener noreferrer">https://github.com/kubernetes/minikube<ExternalLinkIcon/></a></li>
</ul>
<ol>
<li><code v-pre>minikube</code>  是官方文档中的入门工具，但是功能有限，所以只是尝试一下</li>
<li>minikube 是一个可以本地运行的单机版 <code v-pre>kubernetes</code> ，方便我们学习和调试程序</li>
</ol>
<p>minikube是一个Kubernetes-SIGs项目，已经启动三年多了。它采用的方法是生成一个实质上是单节点K8s集群的VM。由于对一系列管理程序的支持，它可以在所有主要操作系统上使用。这还允许您并行创建多个实例。</p>
<p>从用户的角度来看，minikube是一个非常适合初学者的工具。使用minikube start启动集群，稍等几分钟，kubectl就可以开始了。要指定Kubernetes版本，可以使用--Kubernetes version标志。支持的版本列表可以在这里找到。</p>
<p>如果您是 kubernetes 的新手，minikube提供的对其仪表板的一流支持可能会帮助您。使用一个简单的minikube仪表板，应用程序将打开，让您对集群中发生的所有事情有一个很好的概述。这是通过minikube的插件系统实现的，该系统可以帮助您将诸如Helm、Nvidia gpu和图像注册表之类的东西集成到集群中。</p>
<h3 id="install" tabindex="-1"><a class="header-anchor" href="#install" aria-hidden="true">#</a> install</h3>
<blockquote>
<p>minikube在macOS、Linux和Windows上实现本地Kubernetes群集。minikube的主要目标是成为本地Kubernetes应用程序开发的最佳工具，并支持所有适合的Kubernetes功能。</p>
</blockquote>
<p><strong>安装 minikube 需要使用 docker 或者 虚拟机，我们使用 docker：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone https://github.com/kubernetes/minikube.git 
cd minikube 
make 
cd out
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>安装Kubernetes</strong></p>
<p>从具有管理员访问权限（但未以root用户身份登录）的终端运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>minikube start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果您已经安装了kubectl，现在可以使用它来访问您的新集群：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get po <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者，<code v-pre>minikube</code> 可以下载合适版本的 <code v-pre>kubectl</code>，您应该能够像这样使用它：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>minikube kubectl -- get po <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您还可以通过在shell配置中添加以下内容来简化您的工作：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">alias</span> <span class="token assign-left variable">kubectl</span><span class="token operator">=</span><span class="token string">"minikube kubectl --"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>最初，某些服务（如存储资源调配程序）可能尚未处于“正在运行”状态。这是群集启动过程中的正常情况，将立即自行解决。为了更深入地了解您的群集状态，minikube捆绑了Kubernetes Dashboard，使您能够轻松适应新环境：</p>
</blockquote>
<h2 id="kind" tabindex="-1"><a class="header-anchor" href="#kind" aria-hidden="true">#</a> Kind</h2>
<p>Kind是另一个Kubernetes SIGs项目，但与minikube相比有很大不同。顾名思义，它将集群移动到Docker容器中。与生成VM相比，这将显著加快启动速度。</p>
<p>创建集群与minikube的方法非常相似。执行类创建集群，玩等待游戏，然后你就可以走了。通过使用不同的名称（-name）kind，可以并行创建多个实例。</p>
<p>我个人喜欢的一个特性是能够将本地图像直接加载到集群中。这为我节省了一些额外的步骤来设置注册表和每次尝试更改时推送我的图像。有了一个简单的类型加载docker图像我的应用程序：最新的图像可用于我的集群。很不错的！</p>
<p>如果您正在寻找一种以编程方式创建Kubernetes集群的方法，请友好地（您已经等了很久了，不是吗：P）发布它的Go包，这些包在hood下使用。如果您想了解更多，请查看GoDocs并查看KUDO如何使用kind进行集成测试。</p>
<h3 id="install-1" tabindex="-1"><a class="header-anchor" href="#install-1" aria-hidden="true">#</a> install</h3>
<p>Kubernetes 命令行工具 <a href="https://kubernetes.io/zh-cn/docs/reference/kubectl/kubectl/" target="_blank" rel="noopener noreferrer">kubectl<ExternalLinkIcon/></a>， 让你可以对 Kubernetes 集群运行命令。 你可以使用 kubectl 来部署应用、监测和管理集群资源以及查看日志。</p>
<p><a href="https://kind.sigs.k8s.io/" target="_blank" rel="noopener noreferrer"><code v-pre>kind</code><ExternalLinkIcon/></a> 让你能够在本地计算机上运行 Kubernetes。 <code v-pre>kind</code> 要求你安装并配置好 <a href="https://docs.docker.com/get-docker/" target="_blank" rel="noopener noreferrer">Docker<ExternalLinkIcon/></a>。</p>
<p>下面是使用 make 安装的方法，使用 make 也是适合开发者安装的方案。</p>
<p>你只需要 <code v-pre>make</code> 和标准的用户空间工具就可以运行这个构建，它会自动获得正确的go版本和我们提供的 <code v-pre>gimmee</code> 副本。</p>
<p>然后，您可以调用 <code v-pre>./bin/kind</code> 来使用它，或者将 <code v-pre>bin/kind</code> 复制到系统中的某个目录中 <code v-pre>PATH</code> ，以便从命令行将其用作 <code v-pre>kind</code> 。</p>
<p><code v-pre>make install</code> 将尝试模拟 <code v-pre>go install</code> ，并具有与下面的 <code v-pre>go install</code> 相同的路径要求。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone https://github.com/kubernetes-sigs/kind
cd kind 
make build 
cd bin
./kind
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="use-kind" tabindex="-1"><a class="header-anchor" href="#use-kind" aria-hidden="true">#</a> Use Kind</h3>
<p>要使用 kind，您需要安装 docker .运行 docker 后，您可以使用以下内容创建集群：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kind create cluster
❯ ./kind create cluster <span class="token parameter variable">--name</span> kind-2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>方便测试，我们创建了两个集群</p>
</blockquote>
<p><strong>要删除群集，请使用：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ ./kind delete cluster
Deleting cluster "kind" ...
❯ ./kind delete cluster --name kind-2
Deleting cluster "kind-2" ...

❯ ./kind get clusters
No kind clusters found.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>如果未指定标志 <code v-pre>--name</code> ，则 kind 将使用默认群集上下文名称 <code v-pre>kind</code> 并删除该群集。</p>
</blockquote>
<p><strong>查看集群信息：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubectl cluster-info
Kubernetes control plane is running at https://127.0.0.1:37949
KubeDNS is running at https://127.0.0.1:37949/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>Kind 部署集群的 Kubernetes 端口默认是 37949 端口，而 Kubernetes 默认 master 是 6443</p>
</blockquote>
<p>访问端口：</p>
<p><img src="http://sm.cubxxw.com/sm202303171022581.png" alt="image-20230317102243422"></p>
<p><strong>可以看到Windows浏览器可以打开 WSL 中部署的集群，这正是 WSL2 集成 docker Desktop for Windows 的真正优势。</strong></p>
<p><strong>获取集群</strong>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ ./kind get clusters
kind
kind-2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了与特定集互，您只需在 kubectl 中将集群名称指定为上下文：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubectl cluster-info <span class="token parameter variable">--context</span> kind-kind
Kubernetes control plane is running at https://127.0.0.1:45125
CoreDNS is running at https://127.0.0.1:45125/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use <span class="token string">'kubectl cluster-info dump'</span><span class="token builtin class-name">.</span>

❯ kubectl cluster-info <span class="token parameter variable">--context</span> kind-kind-2

Kubernetes control plane is running at https://127.0.0.1:37653
CoreDNS is running at https://127.0.0.1:37653/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use <span class="token string">'kubectl cluster-info dump'</span><span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kind的多节点集群" tabindex="-1"><a class="header-anchor" href="#kind的多节点集群" aria-hidden="true">#</a> Kind的多节点集群</h3>
<p>下面，我们来尝试创建一个多节点集群：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span> <span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">></span> kind-3nodes.yaml</span>
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
  - role: worker
  - role: worker
EOF</span>

kind create cluster <span class="token parameter variable">--name</span> wslkindmultinodes <span class="token parameter variable">--config</span> ./kind-3nodes.yaml

kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kind-创建仪表板" tabindex="-1"><a class="header-anchor" href="#kind-创建仪表板" aria-hidden="true">#</a> Kind：创建仪表板</h3>
<p>使用命令行工作是一件好事。但是，在处理Kubernetes时，我们有时可能希望有一个直观的概览。</p>
<p>为此，我们需要创建一个<a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes/dashboard" target="_blank" rel="noopener noreferrer">Kubernetes Dashboard<ExternalLinkIcon/></a>项目：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0-rc6/aio/deploy/recommended.yaml

kubectl get all <span class="token parameter variable">-n</span> kubernetes-dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果使用ClusterIP创建服务时，在Windows浏览器中键入URL，则无法访问该服务：</p>
<p>因此，我们需要创建一个临时代理：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl proxy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来可以访问:</p>
<p><a href="http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/" target="_blank" rel="noopener noreferrer">http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/<ExternalLinkIcon/></a></p>
<p>接下来是登录：</p>
<p><strong>我们可以输入一个令牌，也可以输入来自集群的kubeconfig文件。</strong></p>
<p>如果尝试使用kubeconfig登录，则将显示错误“ Internal error (500): Not enough data to create auth info structure ”。这是由于kubeconfig文件中缺少凭据。</p>
<p>因此，为避免出现以上的错误，请使用<a href="https://link.zhihu.com/?target=https%3A//github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md" target="_blank" rel="noopener noreferrer">推荐的RBAC方法<ExternalLinkIcon/></a>。</p>
<p>让我们打开一个新的WSL2会话：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Create a new ServiceAccount</span>
kubectl apply <span class="token parameter variable">-f</span> - <span class="token operator">&lt;&lt;</span><span class="token string">EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
EOF</span>
<span class="token comment"># Create a ClusterRoleBinding for the ServiceAccount</span>
kubectl apply <span class="token parameter variable">-f</span> - <span class="token operator">&lt;&lt;</span><span class="token string">EOF
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard describe secret <span class="token variable"><span class="token variable">$(</span>kubectl <span class="token parameter variable">-n</span> kubernetes-dashboard get secret <span class="token operator">|</span> <span class="token function">grep</span> admin-user <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">'{print $1}'</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/sm202303171034444.png" alt="image-20230317103458214"></p>
<p>再访问：http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/</p>
<p>我们需要的是上面生成的 Token：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>eyJhbGciOiJSUzI1NiIsImtpZCI6ImpOcy1RQ0Rack9QYlJueHQ5YldYM25rVjZWN2VPUkhaUUJJWUl1SDFQaFkifQ.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJrdWJlcm5ldGVzLWRhc2hib2FyZCIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VjcmV0Lm5hbWUiOiJhZG1pbi11c2VyLXRva2VuLXRkOGttIiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZXJ2aWNlLWFjY291bnQubmFtZSI6ImFkbWluLXVzZXIiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiJkYmM3YjJhYi0zZjBhLTRiODItYjJmNC1mODg2OGI3ZjEzNmQiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6a3ViZXJuZXRlcy1kYXNoYm9hcmQ6YWRtaW4tdXNlciJ9.awBu9cBxgphOEc4kNIVCbfHWBhZW7Iz5pgOk0v_YElmGk86mQ5Y-bPwko7pRyGB-d92sbkYoeW3Y5fucUeBtM-jAHRhxaZWs3eP6V_EMKA7olkW73CyXzmuLzhInyv1K23t3pUXDyar8lPBVOO1ZKmD_eP5pCt7wVqPyy4sJy3tvIscKeg76gBG-PG7D9zt7_x_7eHCPS0Zgo1GjV5q3SHWv8JrJX9E11uVafoYLe5y4EZKcFsGBvOcIYKuDkFg4rmz4OMsxKuLmlSpys_wQl5DGg6xAq14kY6qumCx6xYMqAW979tCRp61R3lmW1cuqUEvBlkvCo74EX0PRQ19MNA
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们就进来了：</p>
<p><img src="http://sm.cubxxw.com/sm202303171040950.png" alt="image-20230317104014702"></p>
<h2 id="和k3s比较" tabindex="-1"><a class="header-anchor" href="#和k3s比较" aria-hidden="true">#</a> 和k3s比较</h2>
<p>我做了大量关于 k3s  的文章，甚至详细不亚于官方的文档。</p>
<ul>
<li>https://docker.cubxxw.com/Cloud-Native-k8s/14.html</li>
<li>https://docker.cubxxw.com/Cloud-Native-k8s/15.html</li>
<li>https://docker.cubxxw.com/Cloud-Native-k8s/27.html</li>
</ul>
<p>K3s是由 rancher 实验室开发的Kubernetes的缩小版。通过删除可有可无的特性（传统的、alpha的、非默认的树内插件）和使用轻量级组件（例如sqlite3而不是etcd3），它们实现了显著的精简。这将产生一个大小约为60MB的二进制文件。</p>
<table>
<thead>
<tr>
<th style="text-align:left">minikube</th>
<th style="text-align:left">kind</th>
<th style="text-align:left">k3s</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">runtime</td>
<td style="text-align:left">VM</td>
<td style="text-align:left">container</td>
<td>native</td>
</tr>
<tr>
<td style="text-align:left">supported architectures</td>
<td style="text-align:left">AMD64</td>
<td style="text-align:left">AMD64</td>
<td>AMD64, ARMv7, ARM64</td>
</tr>
<tr>
<td style="text-align:left">supported container runtimes</td>
<td style="text-align:left">Docker,CRI-O,containerd,gvisor</td>
<td style="text-align:left">Docker</td>
<td>Docker, containerd</td>
</tr>
<tr>
<td style="text-align:left">startup time initial/following</td>
<td style="text-align:left">5:19 / 3:15</td>
<td style="text-align:left">2:48 / 1:06</td>
<td>0:15 / 0:15</td>
</tr>
<tr>
<td style="text-align:left">memory requirements</td>
<td style="text-align:left">2GB</td>
<td style="text-align:left">8GB (Windows, MacOS)</td>
<td>512 MB</td>
</tr>
<tr>
<td style="text-align:left">requires root?</td>
<td style="text-align:left">no</td>
<td style="text-align:left">no</td>
<td>yes (rootless is experimental)</td>
</tr>
<tr>
<td style="text-align:left">multi-cluster support</td>
<td style="text-align:left">yes</td>
<td style="text-align:left">yes</td>
<td>no (can be achieved using containers)</td>
</tr>
<tr>
<td style="text-align:left">multi-node support</td>
<td style="text-align:left">no</td>
<td style="text-align:left">yes</td>
<td>yes</td>
</tr>
<tr>
<td style="text-align:left">project page</td>
<td style="text-align:left"><a href="https://minikube.sigs.k8s.io/" target="_blank" rel="noopener noreferrer">minikube<ExternalLinkIcon/></a></td>
<td style="text-align:left"><a href="https://kind.sigs.k8s.io/" target="_blank" rel="noopener noreferrer">kind<ExternalLinkIcon/></a></td>
<td><a href="https://k3s.io/" target="_blank" rel="noopener noreferrer">k3s<ExternalLinkIcon/></a></td>
</tr>
</tbody>
</table>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '20.md' style='float:left'>⬆️上一节🔗  </a><a href = '22.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


