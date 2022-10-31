<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第15节-helm" tabindex="-1"><a class="header-anchor" href="#第15节-helm" aria-hidden="true">#</a> 第15节 helm</h1>
<div><a href = '14.md' style='float:left'>⬆️上一节🔗  </a><a href = '16.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#helm介绍">helm介绍</router-link></li><li><router-link to="#v2-vs-v3">v2 vs v3</router-link><ul><li><router-link to="#区别对比">区别对比</router-link></li></ul></li><li><router-link to="#helm-controller">Helm Controller</router-link></li><li><router-link to="#helm安装">helm安装</router-link><ul><li><router-link to="#用二进制版本安装">用二进制版本安装</router-link></li><li><router-link to="#使用脚本安装">使用脚本安装</router-link></li></ul></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="helm介绍" tabindex="-1"><a class="header-anchor" href="#helm介绍" aria-hidden="true">#</a> helm介绍</h2>
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
<p><img src="http://sm.nsddd.top/smwebp" alt="img">在 Helm v3 中，Tiller 被移除了。新的 Helm 客户端会像 kubectl 命令一样，读取本地的 kubeconfig 文件，使用我们在 kubeconfig 中预先定义好的SA权限来进行一系列操作。这样做法即简单，又安全。</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果想直接执行安装，运行</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 <span class="token operator">|</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '14.md' style='float:left'>⬆️上一节🔗  </a><a href = '16.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


