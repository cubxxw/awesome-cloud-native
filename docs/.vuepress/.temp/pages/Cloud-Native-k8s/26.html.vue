<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第26节-helm-教程" tabindex="-1"><a class="header-anchor" href="#第26节-helm-教程" aria-hidden="true">#</a> 第26节 helm 教程</h1>
<div><a href = '25.md' style='float:left'>⬆️上一节🔗  </a><a href = '27.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#helm介绍">helm介绍</router-link></li><li><router-link to="#k3s-helm">k3s helm</router-link><ul><li><router-link to="#自动部署-helm-charts">自动部署 Helm charts</router-link></li><li><router-link to="#使用-helm-crd">使用 Helm CRD</router-link></li><li><router-link to="#helmchart-字段定义">HelmChart 字段定义</router-link></li><li><router-link to="#使用-helmchartconfig-自定义打包的组件">使用 HelmChartConfig 自定义打包的组件</router-link></li></ul></li><li><router-link to="#v2-vs-v3">v2 vs v3</router-link><ul><li><router-link to="#区别对比">区别对比</router-link></li></ul></li><li><router-link to="#helm-controller">Helm Controller</router-link></li><li><router-link to="#helm安装">helm安装</router-link><ul><li><router-link to="#用二进制版本安装">用二进制版本安装</router-link></li><li><router-link to="#使用脚本安装">使用脚本安装</router-link></li></ul></li><li><router-link to="#配置helm源">配置helm源</router-link></li><li><router-link to="#快速上手">快速上手</router-link><ul><li><router-link to="#和docker一样-搜索可用的包">和docker一样，搜索可用的包：</router-link></li><li><router-link to="#helm包拉取">helm包拉取</router-link></li><li><router-link to="#安装集群镜像">安装集群镜像</router-link></li></ul></li><li><router-link to="#helm-配置安装集群">helm 配置安装集群</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<h2 id="helm介绍" tabindex="-1"><a class="header-anchor" href="#helm介绍" aria-hidden="true">#</a> helm介绍</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>使用 <code v-pre>Helm</code> 我们可以非常方便的就搭建出来 <code v-pre>MongoDB</code> / <code v-pre>MySQL</code> 副本集群，<code v-pre>YAML</code> 文件别人都给我们写好了，直接使用。</p>
<p><code v-pre>helm</code>的作用就是把许多的资源定义 比如<code v-pre>svc</code>，<code v-pre>deployment</code>，一次性通过全部定义好，放在源里统一管理，这样很容易在其他机器上部署，个人理解这个类似于自动化运维中<code v-pre>ansible</code>中的角色概念，前端项目中的<code v-pre>npm</code>包管理工具,后端项目中的<code v-pre>maven</code>等构建工具一样，类比<code v-pre>Ansible</code>使用角色来整合<code v-pre>playbook.yaml</code>达到复用性。同样的，使用<code v-pre>helm</code>用于整合k8s中的资源对象<code v-pre>yaml</code>文件，实现复用性,同时讲资源文件的参数，和参数值通过<code v-pre>temple</code>和<code v-pre>value</code>进行了分离。</p>
<ul>
<li><a href="https://helm.sh/zh/" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a></li>
<li><a href="https://artifacthub.io/" target="_blank" rel="noopener noreferrer">应用中心<ExternalLinkIcon/></a></li>
</ul>
</div>
<h2 id="k3s-helm" tabindex="-1"><a class="header-anchor" href="#k3s-helm" aria-hidden="true">#</a> k3s helm</h2>
<p>K3s 不需要任何特殊的配置就可以使用 Helm 命令行工具。只要确保你已经按照<a href="http://docs.rancher.cn/docs/k3s/cluster-access/_index/" target="_blank" rel="noopener noreferrer">集群访问<ExternalLinkIcon/></a>一节正确设置了你的 kubeconfig。 K3s 通过 rancher/helm-release CRD 使传统的 Kubernetes 资源清单和 Helm Charts 部署更加容易。</p>
<h3 id="自动部署-helm-charts" tabindex="-1"><a class="header-anchor" href="#自动部署-helm-charts" aria-hidden="true">#</a> 自动部署 Helm charts</h3>
<p>在<code v-pre>/var/lib/rancher/k3s/server/manifests</code>中找到的任何 Kubernetes 清单将以类似<code v-pre>kubectl apply</code>的方式自动部署到 K3s。以这种方式部署的 manifests 是作为 AddOn 自定义资源来管理的，可以通过运行<code v-pre>kubectl get addon -A</code>来查看。你会发现打包组件的 AddOns，如 CoreDNS、Local-Storage、Traefik 等。AddOns 是由部署控制器自动创建的，并根据它们在 manifests 目录下的文件名命名。</p>
<p>也可以将 Helm Chart 作为 AddOns 部署。K3s 包括一个<a href="https://github.com/rancher/helm-controller/" target="_blank" rel="noopener noreferrer">Helm Controller<ExternalLinkIcon/></a>，它使用 HelmChart Custom Resource Definition(CRD)管理 Helm Chart。</p>
<h3 id="使用-helm-crd" tabindex="-1"><a class="header-anchor" href="#使用-helm-crd" aria-hidden="true">#</a> 使用 Helm CRD</h3>
<p><a href="https://github.com/rancher/helm-controller#helm-controller" target="_blank" rel="noopener noreferrer">HelmChart CRD<ExternalLinkIcon/></a>捕获了大多数你通常会传递给<code v-pre>helm</code>命令行工具的选项。下面是一个例子，说明如何从默认的 Chart 资源库中部署 Grafana，覆盖一些默认的 Chart 值。请注意，HelmChart 资源本身在 <code v-pre>kube-system</code> 命名空间，但 Chart 资源将被部署到 <code v-pre>monitoring</code> 命名空间。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> helm.cattle.io/v1
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="helmchart-字段定义" tabindex="-1"><a class="header-anchor" href="#helmchart-字段定义" aria-hidden="true">#</a> HelmChart 字段定义</h3>
<table>
<thead>
<tr>
<th style="text-align:left">字段</th>
<th style="text-align:left">默认值</th>
<th style="text-align:left">描述</th>
<th style="text-align:left">Helm Argument / Flag Equivalent</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">name</td>
<td style="text-align:left">N/A</td>
<td style="text-align:left">Helm Chart 名称</td>
<td style="text-align:left">NAME</td>
</tr>
<tr>
<td style="text-align:left">spec.chart</td>
<td style="text-align:left">N/A</td>
<td style="text-align:left">仓库中的 Helm Chart 名称，或完整的 HTTPS URL（.tgz）。</td>
<td style="text-align:left">CHART</td>
</tr>
<tr>
<td style="text-align:left">spec.targetNamespace</td>
<td style="text-align:left">default</td>
<td style="text-align:left">Helm Chart 目标命名空间</td>
<td style="text-align:left"><code v-pre>--namespace</code></td>
</tr>
<tr>
<td style="text-align:left">spec.version</td>
<td style="text-align:left">N/A</td>
<td style="text-align:left">Helm Chart 版本(从版本库安装时使用的版本号)</td>
<td style="text-align:left"><code v-pre>--version</code></td>
</tr>
<tr>
<td style="text-align:left">spec.repo</td>
<td style="text-align:left">N/A</td>
<td style="text-align:left">Helm Chart 版本库 URL 地址</td>
<td style="text-align:left"><code v-pre>--repo</code></td>
</tr>
<tr>
<td style="text-align:left">spec.helmVersion</td>
<td style="text-align:left">v3</td>
<td style="text-align:left">Helm 的版本号，可选值为 <code v-pre>v2</code> 和<code v-pre>v3</code>，默认值为 <code v-pre>v3</code></td>
<td style="text-align:left">N/A</td>
</tr>
<tr>
<td style="text-align:left">spec.set</td>
<td style="text-align:left">N/A</td>
<td style="text-align:left">覆盖简单的默认 Chart 值。这些值优先于通过 valuesContent 设置的选项。</td>
<td style="text-align:left"><code v-pre>--set</code> / <code v-pre>--set-string</code></td>
</tr>
<tr>
<td style="text-align:left">spec.jobImage</td>
<td style="text-align:left"></td>
<td style="text-align:left">指定安装 helm chart 时要使用的镜像。如：rancher/klipper-helm:v0.3.0。</td>
<td style="text-align:left"></td>
</tr>
<tr>
<td style="text-align:left">spec.valuesContent</td>
<td style="text-align:left">N/A</td>
<td style="text-align:left">通过 YAML 文件内容覆盖复杂的默认 Chart 值。</td>
<td style="text-align:left"><code v-pre>--values</code></td>
</tr>
<tr>
<td style="text-align:left">spec.chartContent</td>
<td style="text-align:left">N/A</td>
<td style="text-align:left">Base64 编码的 Chart 存档.tgz - 覆盖 spec.chart。</td>
<td style="text-align:left">CHART</td>
</tr>
</tbody>
</table>
<p>放在<code v-pre>/var/lib/rancher/k3s/server/static/</code>中的内容可以通过 Kubernetes APIServer 从集群内匿名访问。这个 URL 可以使用<code v-pre>spec.chart</code>字段中的特殊变量<code v-pre>%{KUBERNETES_API}%</code>进行模板化。例如，打包后的 Traefik 组件从<code v-pre>https://%{KUBERNETES_API}%/static/charts/traefik-1.81.0.tgz</code>加载其 Chart。</p>
<h3 id="使用-helmchartconfig-自定义打包的组件" tabindex="-1"><a class="header-anchor" href="#使用-helmchartconfig-自定义打包的组件" aria-hidden="true">#</a> 使用 HelmChartConfig 自定义打包的组件</h3>
<p>为了允许覆盖作为 HelmCharts（如 Traefik或其他通过helm crd 部署的应用）部署的打包组件的值，从 v1.19.0+k3s1 开始的 K3s 版本支持通过 HelmChartConfig CRD 部署。HelmChartConfig 资源必须与其对应的 HelmChart 的名称和命名空间相匹配，并支持提供额外的 &quot;valuesContent&quot;，它作为一个额外的值文件传递给<code v-pre>helm</code>命令。</p>
<blockquote>
<p><strong>注意：</strong> HelmChart 的<code v-pre>spec.set</code>值覆盖了 HelmChart 和 HelmChartConfig 的<code v-pre>spec.valuesContent</code>设置。</p>
</blockquote>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> helm.cattle.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> HelmChartConfig
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> grafana
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">valuesContent</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token punctuation">-</span>
    <span class="token key atrule">service</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果要自定义打包后的 Traefik 入口配置，你可以创建一个名为<code v-pre>/var/lib/rancher/k3s/server/manifests/traefik-config.yaml</code>的文件，并将其填充为以下内容。</p>
<details class="custom-container details"><summary>命令速查</summary>
<p>helm常用命令：</p>
<p>1、查看服务状态</p>
<p><code v-pre>service httpd status</code></p>
<p>2、启动服务</p>
<p><code v-pre>service httpd start</code></p>
<p>3、停止服务</p>
<p><code v-pre>service httpd stop</code></p>
<p>4、重启服务</p>
<p><code v-pre>service httpd restart</code></p>
<p>5、重载配置文件</p>
<p><code v-pre>service httpd reload</code></p>
<p>6、查看端口占用情况</p>
<p><code v-pre>netstat -tunlp</code></p>
<p>7、查看httpd进程</p>
<p><code v-pre>ps -ef | grep httpd</code></p>
<p>8、查看httpd版本</p>
<p><code v-pre>httpd -v</code></p>
<p>9、查看httpd配置文件</p>
<p><code v-pre>httpd -V</code></p>
<p>10、查看httpd模块</p>
<p><code v-pre>httpd -l</code></p>
<p>11、查看httpd模块详细信息</p>
<p><code v-pre>httpd -M</code></p>
<p>12、查看httpd安装路径</p>
<p><code v-pre>httpd -V | grep SERVER_CONFIG_FILE</code></p>
<p>13、查看httpd错误日志</p>
<p><code v-pre>cat /var/log/httpd/error_log</code></p>
<p>14、查看httpd访问日志</p>
<p><code v-pre>cat /var/log/httpd/access_log</code></p>
<p>15、查看httpd配置文件</p>
<p><code v-pre>cat /etc/httpd/conf/httpd.conf</code></p>
<p>16、查看httpd配置文件中的模块</p>
<p><code v-pre>cat /etc/httpd/conf/httpd.conf | grep LoadModule</code></p>
<p>17、查看httpd配置文件中的虚拟主机</p>
<p><code v-pre>cat /etc/httpd/conf/httpd.conf | grep VirtualHost</code></p>
<p>18、查看httpd配置文件中的监听端口</p>
<p><code v-pre>cat /etc/httpd/conf/httpd.conf | grep Listen</code></p>
</details>
<div class="custom-container danger"><p class="custom-container-title">heml解决了什么问题？</p>
<p>我们部署应用？</p>
<p><code v-pre>k8s</code> 上的应用对象，都是由特定的资源描述组成， 包括 <code v-pre>deployment</code>、<code v-pre>service</code> 等，都保存在各自文件中或者集成到一个配置文件，然后通过 <code v-pre>kubectl apply -f</code> 部署</p>
<blockquote>
<p><strong>我们部署小的应用程序肯定是没有问题的，但是部署一个复杂的应用管理 <code v-pre>yaml</code> 文件，可能就有些麻烦。</strong></p>
</blockquote>
<p><strong>我们需要：</strong></p>
<ol>
<li>如何将这些服务作为一个整体管理</li>
<li>这些资源文件如何高效复用</li>
<li>不支持应用级别的版本管理</li>
</ol>
</div>
<p>helm就能解决这些问题，它就类似于Linux中的<code v-pre>yum</code>包或者<code v-pre>apt</code>包。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ul>
<li><a href="https://github.com/helm/helm" target="_blank" rel="noopener noreferrer">开源项目地址<ExternalLinkIcon/></a></li>
</ul>
<p>Helm 是 Kubernetes 的首选包管理工具。Helm Chart 为 Kubernetes YAML 清单文件提供了模板化语法。通过 Helm，我们可以创建可配置的部署，而不仅仅是使用静态文件。有关创建自己的部署目录的更多信息，请查看<a href="https://helm.sh/docs/intro/quickstart/" target="_blank" rel="noopener noreferrer">Helm 快速入门<ExternalLinkIcon/></a>。</p>
<p>K3s 不需要任何特殊的配置就可以使用 Helm 命令行工具。只要确保你已经按照<a href="https://docs.rancher.cn/docs/k3s/cluster-access/_index" target="_blank" rel="noopener noreferrer">集群访问<ExternalLinkIcon/></a>一节正确设置了你的 kubeconfig。 K3s 包含了一些额外的功能，通过<a href="https://docs.rancher.cn/docs/k3s/helm/_index#%E4%BD%BF%E7%94%A8-helm-crd" target="_blank" rel="noopener noreferrer">rancher/helm-release CRD<ExternalLinkIcon/></a>，使传统的 Kubernetes 资源清单和 Helm Charts 部署更加容易。</p>
</div>
<h2 id="v2-vs-v3" tabindex="-1"><a class="header-anchor" href="#v2-vs-v3" aria-hidden="true">#</a> v2 vs v3</h2>
<p><strong>简单来说，Helm就是一个第三方部署k8s应用的工具</strong></p>
<div class="custom-container tip"><p class="custom-container-title">helm v3 vs v2特性</p>
<p>另外，常用的Helm版本有v2跟v3，Helm v3区别于v2主要有以下特性：</p>
<ul>
<li>移除了Tiller(from SA to kubeconfig)</li>
<li>三方会谈 (Three-way Strategic merge patch)</li>
<li>使用Secret作为默认存储</li>
</ul>
</div>
<h3 id="区别对比" tabindex="-1"><a class="header-anchor" href="#区别对比" aria-hidden="true">#</a> 区别对比</h3>
<p><strong>1、移除了Tiller(from SA to kubeconfig)</strong></p>
<p>原来Helm v2需要在 Kubernetes 集群中部署<code v-pre>Tiller</code>（<code v-pre>Tiller</code> 用于接收 Helm 的请求，并根据 <code v-pre>Chart</code> 生成 Kubernetes 的部署文件），<code v-pre>Tiller pod</code> 根据自身SA权限部署应用。并且在多租户环境下，为了进行权限管理需要部署多个<code v-pre>Tiller</code>。</p>
<p><img src="http://sm.nsddd.top/smwebp" alt="img">在 Helm v3 中，Tiller 被移除了。<strong>新的 Helm 客户端会像 kubectl 命令一样，读取本地的 kubeconfig 文件，使用我们在 kubeconfig 中预先定义好的SA权限来进行一系列操作。这样做法即简单，又安全。</strong></p>
<p><strong>2、三方会谈 (Three-way Strategic merge patch)</strong></p>
<p>会兼容通过第三方修改的属性（如通过kubectl edit修改的属性，在helm upgrade时会考虑进去）</p>
<p><img src="http://sm.nsddd.top/smwebp2" alt="img"></p>
<p><strong>3、使用Secret作为默认存储</strong></p>
<p><strong>4、crd-install hook迁移到了crds/路径等</strong></p>
<details class="custom-container details"><summary>什么是CRD？</summary>
<p>CRD(Custom Resource Define) 自定义资源定义，是在k8s高版本（v1.7+）上新增加的新特性，为了提高拓展性，让开发者可以自己去定义k8s资源对象。</p>
<p>实际运行时是以CR（Custom Resourse自定义资源）具体实例进行呈现。</p>
<p><strong>当前已经存在的官方资源：</strong></p>
<ul>
<li><code v-pre>Pod</code>：是一种集合了多个应用容器、存储资源、专用IP及支撑容器运行其他配置选项的逻辑组件，是k8s部署单元和原子运行单元，简单来说就是一个运行多个应用程序的单一运行实例，通过共享资源相互联系的应用容器。通俗的讲，pod是一个物理主机或VM主机，pod中的应用容器就是主机上的进程，彼此隔离。</li>
<li><code v-pre>ReplicaSet</code>：定义一组任何时候都处于运行状态的pod副本的稳定集合资源，保证运行指定数量的、完全相同的pod的可用性。</li>
<li><code v-pre>ReplicationController</code>：跟ReplicaSet是一样的，确保在任何时候都有特定数量的 Pod 副本处于运行状态。 换句话说，ReplicationController 确保一个 Pod 或一组同类的 Pod 总是可用的。但是更推荐使用ReplicaSet的Deployment去建立副本。</li>
<li><code v-pre>Deployment</code>：该对象是用来描述pod和ReplicaSet副本的目标状态，并更新他们不符合期望时的状态。</li>
<li><code v-pre>StatefulSet</code>：该资源对象用来管理有状态应用pod的工作负载，支持pod集合的部署和扩容、缩容。</li>
<li><code v-pre>DaemonSet</code>：该对象用来确保全部或者部分节点都运行一个pod副本，就是我们所说的守护进程。</li>
<li><code v-pre>Job</code>：该对象用来执行目标状态的pod副本的一个任务，相当于一个监听任务，实时控制pod副本达到期望状态。</li>
<li><code v-pre>CronJob</code>：这是一个有时间周期的Job。</li>
<li><code v-pre>HorizontalPodAutoscaling</code>：该对象为pod水平自动扩缩，自动更新工作负载资源（Deployment和StatefulSet），目的是自动扩缩工作负载以满足需求。</li>
<li><code v-pre>Node</code>：节点是一个虚拟机或者物理机，节点上运行pod所需的容器。</li>
<li><code v-pre>Namespace</code>：命名空间，是一种机制，将同一集群的资源划分一个相互隔离的组。</li>
<li><code v-pre>Service</code>：就是运行在pod上的提供服务的组件，如微服务组件。</li>
<li><code v-pre>Ingress</code>：是各个服务service相互访问的一个中间路由管理器，可以实现流量控制等。</li>
<li><code v-pre>Label</code>：为每个对象定义标签，用于标签选择器可以高效地查询和监听k8s对象。</li>
<li><code v-pre>CustomResourceDefinition</code>：用于开发者自定义的资源对象。</li>
</ul>
</details>
<p><strong>如何使用CRD：</strong></p>
<p>CRD 资源可以动态注册到集群中，注册完毕后，用户可以通过 kubectl 来创建访问这个自定义的资源对象，类似于操作 Pod 一样。</p>
<h2 id="helm-controller" tabindex="-1"><a class="header-anchor" href="#helm-controller" aria-hidden="true">#</a> Helm Controller</h2>
<p>Helm Controller实际上就是一个CRD Controller，管理的是HelmChart类型的CRD API</p>
<p><img src="http://sm.nsddd.top/sm23094781.png" alt="img"></p>
<p><strong>设计原理：</strong></p>
<p>1、<code v-pre>Helm-controller</code> 运行在<code v-pre>master</code>节点并<code v-pre>list/watch HelmChart CRD</code>对象</p>
<p>2、<code v-pre>CRD onChange</code>时执行<code v-pre>Job</code>更新</p>
<p>3、<code v-pre>Job Container</code>使用<code v-pre>rancher/kilipper-helm</code>为<code v-pre>entrypoint</code></p>
<p>4、<code v-pre>Killper-helm</code>内置<code v-pre>helm cli</code>，可以安装/升级/删除对应的<code v-pre>chart</code></p>
<h2 id="helm安装" tabindex="-1"><a class="header-anchor" href="#helm安装" aria-hidden="true">#</a> helm安装</h2>
<h3 id="用二进制版本安装" tabindex="-1"><a class="header-anchor" href="#用二进制版本安装" aria-hidden="true">#</a> 用二进制版本安装</h3>
<p>每个Helm <a href="https://github.com/helm/helm/releases" target="_blank" rel="noopener noreferrer">版本<ExternalLinkIcon/></a>都提供了各种操作系统的二进制版本，这些版本可以手动下载和安装。</p>
<ol>
<li>下载 <a href="https://github.com/helm/helm/releases" target="_blank" rel="noopener noreferrer">需要的版本<ExternalLinkIcon/></a></li>
<li>解压(<code v-pre>tar -zxvf helm-v3.0.0-linux-amd64.tar.gz</code>)</li>
<li>在解压目中找到<code v-pre>helm</code>程序，移动到需要的目录中(<code v-pre>mv linux-amd64/helm /usr/local/bin/helm</code>)</li>
</ol>
<p>然后就可以执行客户端程序并 <a href="https://helm.sh/zh/docs/intro/quickstart/#%E5%88%9D%E5%A7%8B%E5%8C%96" target="_blank" rel="noopener noreferrer">添加稳定仓库<ExternalLinkIcon/></a>: <code v-pre>helm help</code>.</p>
<p><strong>注意</strong> 针对Linux AMD64，Helm的自动测试只有在CircleCi构建和发布时才会执行。测试其他操作系统是社区针对系统问题请求Helm的责任。</p>
<h3 id="使用脚本安装" tabindex="-1"><a class="header-anchor" href="#使用脚本安装" aria-hidden="true">#</a> 使用脚本安装</h3>
<p>Helm现在有个安装脚本可以自动拉取最新的Helm版本并在 <a href="https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3" target="_blank" rel="noopener noreferrer">本地安装<ExternalLinkIcon/></a>。</p>
<p>您可以获取这个脚本并在本地执行。它良好的文档会让您在执行之前知道脚本都做了什么。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> <span class="token parameter variable">-o</span> get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
$ <span class="token function">chmod</span> <span class="token number">700</span> get_helm.sh
$ ./get_helm.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/runtime/ingress-nginx<span class="token comment"># ./helm.sh </span>
Downloading https://get.helm.sh/helm-v3.10.2-linux-amd64.tar.gz
Verifying checksum<span class="token punctuation">..</span>. Done.
Preparing to <span class="token function">install</span> helm into /usr/local/bin
helm installed into /usr/local/bin/helm
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>如果想直接执行安装，运行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 <span class="token operator">|</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="配置helm源" tabindex="-1"><a class="header-anchor" href="#配置helm源" aria-hidden="true">#</a> 配置helm源</h2>
<p><strong>使用helm需要配置yaml源,常见的有阿里。微软，和Github上的源</strong></p>
<ul>
<li>阿里云的源 https://apphub.aliyuncs.com</li>
<li>微软<code v-pre>azure</code>的源 http://mirror.azure.cn/kubernetes/charts/</li>
</ul>
<p><strong>查看所有的源：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm repo list  <span class="token comment">#查看所以的源</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>添加指定的源：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> azure http://mirror.azure.cn/kubernetes/charts/

helm repo <span class="token function">add</span> aliyun https://apphub.aliyuncs.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看配置的存储库：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm search repo stable
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>删除;</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm repo remove aliyun
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">搜索</p>
<p>它会搜索当前仓库所匹配的所有镜像源：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm search 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<h2 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h2>
<div class="custom-container warning"><p class="custom-container-title">helm常见用法：</p>
<p>Helm的常见用法，包括搜索Chart、安装Chart、自定义Chart配置、更新或回滚Release、删除Release、创建自定义Chart、搭建私有仓库等</p>
</div>
<p><strong>检测版本的安装：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@VM-4-3-ubuntu:~<span class="token comment"># helm version</span>
version.BuildInfo<span class="token punctuation">{</span>Version:<span class="token string">"v3.9.2"</span>, GitCommit:<span class="token string">"1addefbfe665c350f4daf868a9adc5600cc064fd"</span>, GitTreeState:<span class="token string">"clean"</span>, GoVersion:<span class="token string">"go1.17.12"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="和docker一样-搜索可用的包" tabindex="-1"><a class="header-anchor" href="#和docker一样-搜索可用的包" aria-hidden="true">#</a> 和docker一样，搜索可用的包：</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm search  repo mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="helm包拉取" tabindex="-1"><a class="header-anchor" href="#helm包拉取" aria-hidden="true">#</a> helm包拉取</h3>
<p>安装chart可以直接使用命令安装，也可以拉取到本地之后安装，也可以直接通过命名行安装</p>
<ul>
<li>本地的Chart压缩包(helm install mysql-1.6.4.tgz)</li>
<li>一个Chart目录(helm install mysql/)</li>
<li>一个完整的URL(helm install https://example.com/charts/mysql-1.6.4.tgz)</li>
</ul>
<p><strong>chart包拉取：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm pull azure/mysql --version=1.6.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221104202213778.png" alt="image-20221104202213778"></p>
<p><strong>helm install：安装Chart：</strong></p>
<blockquote>
<p>这个命令是直接拉取安装，而上面的是可以实现离线安装的~</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> db azure/mysql <span class="token parameter variable">--version</span><span class="token operator">=</span><span class="token number">1.6</span>.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>拉取的chart包详细信息，通过解压之后查看：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tar -zxvf mysql-1.6.4.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221104203359659.png" alt="image-20221104203359659"></p>
<p><strong>关键文件：</strong></p>
<p><img src="http://sm.nsddd.top/smimage-20221104203553063.png" alt="image-20221104203553063"></p>
<p><strong>对于下载好的<code v-pre>yaml</code>文件，我们可以修改后使用<code v-pre>helm package</code>重新打包</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-rf</span> mysql-1.6.4.tgz <span class="token operator">&amp;&amp;</span> helm package  mysql/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>此时 <code v-pre>mysql</code> 会被重新打包成 <code v-pre>tar</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@VM-4-3-ubuntu:~/helm<span class="token comment"># ls</span>
mysql  mysql-1.6.4.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p><strong>下面我们修改chart中的对应镜像为已经下载好的mysql和busybox镜像：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ansible <span class="token number">192.168</span>.26.82 <span class="token parameter variable">-m</span> shell <span class="token parameter variable">-a</span> <span class="token string">"docker images | grep mysql"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>通过修好的yaml文件创建chart</strong>， <strong>使用<code v-pre>helm ls</code>查看当前运行的chart</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>helm ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>使用<code v-pre>helm install</code>运行Chart</strong></p>
<blockquote>
<p><strong>这里我们使用之前的那个mysq chart来安装一个mysql</strong></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> mysql/ <span class="token operator">&amp;&amp;</span> helm <span class="token function">install</span> mydb <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看是否是否运行成功mydb的pod和SVC</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl  get pods
kubectl  get svc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>安装一个mysql客户端测试OK：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span>  mariadb <span class="token parameter variable">-y</span>
mysql <span class="token parameter variable">-h10.107.17.103</span> <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-ptesting</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装集群镜像" tabindex="-1"><a class="header-anchor" href="#安装集群镜像" aria-hidden="true">#</a> 安装集群镜像</h3>
<p><strong>Add repository：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> redis https://spy86.github.io/redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Install chart：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm <span class="token function">install</span> my-redis redis/redis <span class="token parameter variable">--version</span> <span class="token number">0.1</span>.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>使用：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>helm repo <span class="token function">add</span> bitnami https://charts.bitnami.com/bitnami
helm <span class="token function">install</span> my-mongo bitnami/mongodb

<span class="token comment"># 指定密码和架构</span>
helm <span class="token function">install</span> my-mongo bitnami/mongodb <span class="token parameter variable">--set</span> <span class="token assign-left variable">architecture</span><span class="token operator">=</span><span class="token string">"replicaset"</span>,auth.rootPassword<span class="token operator">=</span><span class="token string">"mongopass"</span>

<span class="token comment"># 删除</span>
helm <span class="token function">ls</span>
helm delete my-mongo

<span class="token comment"># 查看密码</span>
kubectl get secret my-mongo-mongodb <span class="token parameter variable">-o</span> json
kubectl get secret my-mongo-mongodb <span class="token parameter variable">-o</span> yaml <span class="token operator">></span> secret.yaml

<span class="token comment"># 临时运行一个包含 mongo client 的 debian 系统</span>
kubectl run mongodb-client <span class="token parameter variable">--rm</span> <span class="token parameter variable">--tty</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">--restart</span><span class="token operator">=</span><span class="token string">'Never'</span> <span class="token parameter variable">--image</span> docker.io/bitnami/mongodb:4.4.10-debian-10-r20 <span class="token parameter variable">--command</span> -- <span class="token function">bash</span>

<span class="token comment"># 进去 mongodb</span>
mongo <span class="token parameter variable">--host</span> <span class="token string">"my-mongo-mongodb"</span> <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> mongopass

<span class="token comment"># 也可以转发集群里的端口到宿主机访问 mongodb</span>
kubectl port-forward svc/my-mongo-mongodb <span class="token number">27017</span>:27018
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="helm-配置安装集群" tabindex="-1"><a class="header-anchor" href="#helm-配置安装集群" aria-hidden="true">#</a> helm 配置安装集群</h2>
<p><strong>helm 安装过程中有两种方式传递数据：</strong></p>
<ul>
<li><code v-pre>-f(或--values)</code>：使用 YAML 文件覆盖默认配置。可以指定多次，优先使用最右边的文件。</li>
<li><code v-pre>--set</code> ：通过命令行的方式对指定项进行覆盖</li>
</ul>
<div class="custom-container danger"><p class="custom-container-title">注意</p>
<p>如果同时使用两种方式，则 <code v-pre>--set</code> 中的值会被合并到 <code v-pre>-f</code> 中，但是 <code v-pre>–set</code> 中的值优先级更高</p>
</div>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '25.md' style='float:left'>⬆️上一节🔗  </a><a href = '27.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


