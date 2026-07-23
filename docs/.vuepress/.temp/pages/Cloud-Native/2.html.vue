<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第2节-使用-sealos-搭建-k8s-helm学习" tabindex="-1"><a class="header-anchor" href="#第2节-使用-sealos-搭建-k8s-helm学习" aria-hidden="true">#</a> 第2节 使用 sealos 搭建 k8s，helm学习</h1>
<br>
<div><a href = '1.md' style='float:left'>⬆️上一节🔗  </a><a href = '3.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="关于sealos搭建k8s" tabindex="-1"><a class="header-anchor" href="#关于sealos搭建k8s" aria-hidden="true">#</a> 关于sealos搭建k8s</h2>
<ul>
<li>[x] <a href="https://docker.cubxxw.com/Cloud-Native-k8s/6.html" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a></li>
</ul>
<h2 id="关于sealos" tabindex="-1"><a class="header-anchor" href="#关于sealos" aria-hidden="true">#</a> 关于sealos</h2>
<p><img src="http://sm.cubxxw.com/smimage-20221023205145184.png" alt="image-20221023205145184"></p>
<div class="custom-container tip"><p class="custom-container-title">sealos就是？</p>
<p>sealos 是用来管理数据中心所有机器的云操作系统，kubernetes 就是这个操作系统的内核，sealos上 面会跑各种各样的分布式应用。</p>
<ul>
<li>早期单机操作系统也是分层架构，后面才演化成今天的宏内核微内核架构，云操作系统也一定会有类似发展趋势。</li>
<li>以前都是单机应用，而现代应用几乎都是分布式应用，kubernetes 已经成为事实上的“云操作系统内核”，能让内核普及的发型版呼之欲出。</li>
<li>sealos 抛弃了 IaaS, 基于云内核的高内聚设计，决定了 sealos 可以让云更简单，更便宜，从而像 linux 发行版一样普及。</li>
</ul>
</div>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2>
<p><img src="http://sm.cubxxw.com/smimage-20221023205623196.png" alt="image-20221023205623196"></p>
<blockquote>
<p>提供一个开源开放的云操作系统，利用云原生的能力做一个目前云厂商的可替代品</p>
</blockquote>
<ul>
<li>开源 sealos，提供出一个抽象的云操作系统，一切皆应用的设计理念。</li>
<li>sealos cloud - 环界自己运行的 sealos 公有云版本，服务能力对标 aws 阿里云等公有云</li>
<li>用户自由下载社区版或商业版本 sealos，在任意地方启动一个属于自己的 <code v-pre>sealos cloud</code></li>
</ul>
<blockquote>
<p>分布式应用生态构建</p>
</blockquote>
<ul>
<li>广度，常用分布式软件如 <code v-pre>mysql</code> 集群，<code v-pre>redis</code> 集群，消息队列等逐步覆盖，不断扩展常用分布式应用数量</li>
<li>深度，<code v-pre>基本安装 -&gt; 高可用 -&gt; 可监控 -&gt; 自运维 -&gt; 高性能 / 安全性 -&gt; GUI管控</code>，六个阶段衡量一个分布式应用成熟度</li>
</ul>
<p>应用包含三个来源：环界自研应用如函数计算，开源二次封装应用，第三方应用如与讯飞合作的 AI 能力应用与 <code v-pre>sealos</code> 结合。</p>
<h2 id="运行之后" tabindex="-1"><a class="header-anchor" href="#运行之后" aria-hidden="true">#</a> 运行之后</h2>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>你运行起来的可以不是<code v-pre>kubernetes</code>，可以是个 <code v-pre>k0s</code> 或者是 <code v-pre>k3s</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#单主机</span>
$ sealos run labring/kubernetes:v1.25.0 labring/helm:v3.8.2 labring/calico:v3.24.1 <span class="token parameter variable">--single</span>
<span class="token comment"># remove taint</span>
$ kubectl taint <span class="token function">node</span> <span class="token parameter variable">--all</span> node-role.kubernetes.io/control-plane-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<div class="custom-container danger"><p class="custom-container-title">使用 docker 作为 run labring</p>
<p>默认是使用<code v-pre>kubernetes</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealos run labring/kubernetes-docker:v1.20.5-4.1.3 labring/calico:v3.24.1 <span class="token punctuation">\</span>
     <span class="token parameter variable">--masters</span> <span class="token number">192.168</span>.64.2,192.168.64.22,192.168.64.20 <span class="token punctuation">\</span>
     <span class="token parameter variable">--nodes</span> <span class="token number">192.168</span>.64.21,192.168.64.19 <span class="token parameter variable">-p</span> <span class="token punctuation">[</span>your-ssh-passwd<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p>我们可以在 <code v-pre>sealos</code> 上面运行对象存储、网关、数据库等等东西，都可以通过<code v-pre>sealos run</code> 一键在云操作系统上面<code v-pre>run</code>起来。</p>
<blockquote>
<p>docker 镜像本质是一堆文件组成，通过 <code v-pre>commit</code> 或者 <code v-pre>dockerfile</code> 一层层叠加，而 <code v-pre>sealos run</code> 可以 <code v-pre>run</code> 整个集群镜像，不管是 <code v-pre>Kubernetes</code> 集群， <code v-pre>Mysql</code> 集群， 还是 <code v-pre>Redis</code> 集群。<code v-pre>sealos build</code> 可以 build 整个集群。</p>
<ul>
<li><code v-pre>docker</code> 数据中心作为整体（run单机操作系统）</li>
<li><code v-pre>kubernetes</code> 作为操作系统</li>
<li><code v-pre>sealos run</code> 出来的都是集群的，运行在 <code v-pre>kubernetes</code> 上</li>
</ul>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealos run labring/helm:v3.8.2 <span class="token comment"># install helm</span>
sealos run labring/openebs:v1.9.0 <span class="token comment"># install openebs</span>
sealos run labring/minio-operator:v4.4.16 labring/ingress-nginx:4.1.0 <span class="token punctuation">\</span>
   labring/mysql-operator:8.0.23-14.1 labring/redis-operator:3.1.4 <span class="token comment"># oneliner</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>labring/ingress-nginx</code>：表示的是集群镜像，他们是如何被打包的呢？</p>
<p>这个时候涉及到了 <a href="https://www.sealos.io/docs/getting-started/build-example-cloudimage" target="_blank" rel="noopener noreferrer">build an Exmple Cloudmage<ExternalLinkIcon/></a></p>
</blockquote>
<details class="custom-container details"><summary>什么时候需要集群镜像</summary>
<p>用户希望得到一个集群</p>
<p>sealos 不会记录启动的实例名称，我们可以通过传参数来记录下来。</p>
</details>
<h3 id="构建镜像" tabindex="-1"><a class="header-anchor" href="#构建镜像" aria-hidden="true">#</a> 构建镜像</h3>
<p>下面介绍如何使用 <code v-pre>helm</code> 构建 <code v-pre>nginx</code>-入口群集映像。</p>
<blockquote>
<p><code v-pre>helm</code> 最核心的问题是：模板渲染，<code v-pre>sealos</code> 可以选择 <code v-pre>helm</code> 。</p>
</blockquote>
<details class="custom-container details"><summary>helm介绍</summary>
<p>helm的官网文档地址：</p>
<ul>
<li><a href="https://docker.cubxxw.com/Cloud-Native-k8s/15.html" target="_blank" rel="noopener noreferrer">文档地址<ExternalLinkIcon/></a></li>
</ul>
<p><strong>Helm 是什么？？</strong></p>
<p>Helm 是 Kubernetes 的包管理器。包管理器类似于我们在 Ubuntu 中使用的apt、Centos中使用的yum 或者Python中的 pip 一样，能快速查找、下载和安装软件包。Helm 由客户端组件 helm 和服务端组件 Tiller 组成, 能够将一组K8S资源打包统一管理, 是查找、共享和使用为Kubernetes构建的软件的最佳方式。</p>
<p><strong>Helm 解决了什么痛点？</strong></p>
<p>在 Kubernetes中部署一个可以使用的应用，需要涉及到很多的 Kubernetes 资源的共同协作。比如你安装一个 WordPress 博客，用到了一些 Kubernetes (下面全部简称k8s)的一些资源对象，包括 Deployment 用于部署应用、Service 提供服务发现、Secret 配置 WordPress 的用户名和密码，可能还需要 pv 和 pvc 来提供持久化服务。并且 WordPress 数据是存储在mariadb里面的，所以需要 mariadb 启动就绪后才能启动 WordPress。这些 k8s 资源过于分散，不方便进行管理，直接通过 kubectl 来管理一个应用，你会发现这十分蛋疼。</p>
<p>所以总结以上，我们在 <code v-pre>k8s</code> 中部署一个应用，通常面临以下几个问题：</p>
<ul>
<li>如何统一管理、配置和更新这些分散的 <code v-pre>k8s</code> 的应用资源文件</li>
<li>如何分发和复用一套应用模板</li>
<li>如何将应用的一系列资源当做一个软件包管理</li>
</ul>
<p><strong>Helm 相关组件及概念：</strong></p>
<p>Helm 包含两个组件，分别是 helm 客户端 和 Tiller 服务器：</p>
<ul>
<li><strong>helm</strong> 是一个命令行工具，用于本地开发及管理<code v-pre>chart</code>，<code v-pre>chart</code>仓库管理等</li>
<li><strong>Tiller</strong> 是 <code v-pre>Helm</code> 的服务端。<code v-pre>Tiller</code> 负责接收 <code v-pre>Helm</code> 的请求，与 <code v-pre>k8s</code> 的 <code v-pre>apiserver</code> 交互，根据<code v-pre>chart</code> 来生成一个 <code v-pre>release</code> 并管理 <code v-pre>release</code></li>
<li><strong>chart</strong> Helm的打包格式叫做<code v-pre>chart</code>，所谓 <code v-pre>chart</code> 就是一系列文件, 它描述了一组相关的 <code v-pre>k8s</code> 集群资源</li>
<li><strong>release</strong> 使用 <code v-pre>helm install</code> 命令在 <code v-pre>Kubernetes</code> 集群中部署的 <code v-pre>Chart</code> 称为 <code v-pre>Release</code></li>
<li><code v-pre>Repoistory Helm chart</code> 的仓库，<code v-pre>Helm</code> 客户端通过 <code v-pre>HTTP</code> 协议来访问存储库中 <code v-pre>chart</code> 的索引文件和压缩包</li>
</ul>
</details>
<p><strong>Helm 原理：</strong></p>
<p>下面两张图描述了 Helm 的几个关键组件 Helm（客户端）、Tiller（服务器）、Repository（Chart 软件仓库）、Chart（软件包）之间的关系以及它们之间如何通信。</p>
<p><img src="http://sm.cubxxw.com/smimage-20221023214555169.png" alt="image-20221023214555169"></p>
<p><strong>helm 组件通信：</strong></p>
<p><img src="http://sm.cubxxw.com/smimage-20221023214604275.png" alt="image-20221023214604275"></p>
<p><strong>helm 架构</strong></p>
<p><strong>创建release：</strong></p>
<ul>
<li><code v-pre>helm</code> 客户端从指定的目录或本地 <code v-pre>tar</code> 文件或远程 <code v-pre>repo</code> 仓库解析出 <code v-pre>chart</code> 的结构信息</li>
<li><code v-pre>helm</code> 客户端指定的 <code v-pre>chart</code> 结构和 <code v-pre>values</code> 信息通过 <code v-pre>gRPC</code> 传递给 <code v-pre>Tiller</code></li>
<li><code v-pre>Tiller</code> 服务端根据 <code v-pre>chart</code> 和 <code v-pre>values</code> 生成一个 <code v-pre>release</code></li>
<li><code v-pre>Tiller</code> 将 <code v-pre>install release</code> 请求直接传递给 <code v-pre>kube-apiserver</code></li>
</ul>
<p><strong>删除release：</strong></p>
<ul>
<li><code v-pre>helm</code> 客户端从指定的目录或本地 <code v-pre>tar</code> 文件或远程 <code v-pre>repo</code> 仓库解析出 <code v-pre>chart</code> 的结构信息</li>
<li><code v-pre>helm</code> 客户端指定的 <code v-pre>chart</code> 结构和 <code v-pre>values</code> 信息通过 gRPC 传递给 Tiller</li>
<li><code v-pre>Tiller</code> 服务端根据 <code v-pre>chart</code> 和 <code v-pre>values</code> 生成一个 <code v-pre>release</code></li>
<li><code v-pre>Tiller</code> 将 <code v-pre>delete release</code> 请求直接传递给 <code v-pre>kube-apiserver</code></li>
</ul>
<p><strong>更新release：</strong></p>
<ul>
<li><code v-pre>helm</code> 客户端将需要更新的 <code v-pre>chart</code> 的 <code v-pre>release</code> 名称 <code v-pre>chart</code> 结构和 <code v-pre>value</code> 信息传给 <code v-pre>Tiller</code></li>
<li><code v-pre>Tiller</code> 将收到的信息生成新的 <code v-pre>release</code>，并同时更新这个 <code v-pre>release</code> 的 <code v-pre>history</code></li>
<li><code v-pre>Tiller</code> 将新的 <code v-pre>release</code> 传递给 <code v-pre>kube-apiserver</code> 进行更新</li>
</ul>
<h3 id="chart-的基本结构" tabindex="-1"><a class="header-anchor" href="#chart-的基本结构" aria-hidden="true">#</a> chart 的基本结构</h3>
<p>Helm的打包格式叫做chart，所谓<code v-pre>chart</code>就是一系列文件, 它描述了一组相关的 k8s 集群资源。Chart中的文件安装特定的目录结构组织, 最简单的 <code v-pre>chart</code> 目录如下所示：</p>
<p><img src="http://sm.cubxxw.com/smimage-20221023214623073.png" alt="image-20221023214623073"></p>
<p>chart 结构</p>
<ul>
<li><code v-pre>charts</code> 目录存放依赖的chart</li>
<li><code v-pre>Chart.yaml</code> 包含Chart的基本信息，包括chart版本，名称等</li>
<li><code v-pre>templates</code> 目录下存放应用一系列 k8s 资源的 yaml 模板</li>
<li><code v-pre>_helpers.tpl</code> 此文件中定义一些可重用的模板片断，此文件中的定义在任何资源定义模板中可用</li>
<li><code v-pre>NOTES.txt</code> 介绍chart 部署后的帮助信息，如何使用chart等</li>
<li><code v-pre>values.yaml</code> 包含了必要的值定义（默认值）, 用于存储 templates 目录中模板文件中用到变量的值</li>
</ul>
<p><strong>安装Helm：</strong></p>
<p>Helm 提供了几种安装方式，本文提供两种安装方式，想要查看更多安装方式，请阅读 Helm 的<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fdocs.helm.sh%2Fusing_helm%2F%23installing-helm" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a>：</p>
<ul>
<li>手动安装方式</li>
</ul>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>$ 下载 Helm 二进制文件
$ wget https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>storage<span class="token punctuation">.</span>googleapis<span class="token punctuation">.</span>com<span class="token operator">/</span>kubernetes<span class="token operator">-</span>helm<span class="token operator">/</span>helm<span class="token operator">-</span>v2<span class="token punctuation">.</span><span class="token number">9.1</span><span class="token operator">-</span>linux<span class="token operator">-</span>amd64<span class="token punctuation">.</span>tar<span class="token punctuation">.</span>gz
$ 解压缩
$ tar <span class="token operator">-</span>zxvf helm<span class="token operator">-</span>v2<span class="token punctuation">.</span><span class="token number">9.1</span><span class="token operator">-</span>linux<span class="token operator">-</span>amd64<span class="token punctuation">.</span>tar<span class="token punctuation">.</span>gz
$ 复制 helm 二进制 到bin目录下
<span class="token variable">$cp</span> linux<span class="token operator">-</span>amd64<span class="token operator">/</span>helm <span class="token operator">/</span>usr<span class="token operator">/</span>local<span class="token regex-literal"><span class="token regex">/bin/</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>使用官方提供的脚本一键安装</li>
</ul>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>$ curl https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>raw<span class="token punctuation">.</span>githubusercontent<span class="token punctuation">.</span>com<span class="token operator">/</span>kubernetes<span class="token operator">/</span>helm<span class="token operator">/</span>master<span class="token operator">/</span>scripts<span class="token operator">/</span>get <span class="token operator">></span> get_helm<span class="token punctuation">.</span>sh
$ chmod <span class="token number">700</span> get_helm<span class="token punctuation">.</span>sh
$ <span class="token punctuation">.</span><span class="token operator">/</span>get_helm<span class="token punctuation">.</span>sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>你还可以通过 Helm 的 <a href="https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fhelm%2Fhelm%2Freleases" target="_blank" rel="noopener noreferrer">github<ExternalLinkIcon/></a> 项目下找到你想要的 Helm 版本的二进制，然后通过手动安装方式一样安装即可</p>
<p><strong>国内镜像加速下载：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://mirrors.huaweicloud.com/helm/v3.9.2/helm-v3.9.2-linux-386.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> helm-v3.9.2-linux-386.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token function">cp</span>  linux-386/helm /usr/local/bin/ <span class="token operator">&amp;&amp;</span> helm version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<p><strong>安装 Tiller：</strong></p>
<p>安装好 helm 客户端后，就可以通过以下命令将 Tiller 安装在 kubernetes 集群中：</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>helm <span class="token keyword">init</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个地方默认使用 “<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fkubernetes-charts.storage.googleapis.com" target="_blank" rel="noopener noreferrer">https://kubernetes-charts.storage.googleapis.com<ExternalLinkIcon/></a>” 作为缺省的 stable repository 的地址，但由于国内有一张无形的墙的存在，<a href="https://links.jianshu.com/go?to=http%3A%2F%2Fgoogleapis.com" target="_blank" rel="noopener noreferrer">googleapis.com<ExternalLinkIcon/></a> 是不能访问的。可以使用阿里云的源来配置：</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>helm <span class="token keyword">init</span> <span class="token operator">--</span>upgrade <span class="token operator">-</span>i registry<span class="token punctuation">.</span>cn<span class="token operator">-</span>hangzhou<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>com<span class="token operator">/</span>google_containers<span class="token operator">/</span>tiller<span class="token operator">:</span>v2<span class="token punctuation">.</span><span class="token number">9.1</span>  <span class="token operator">--</span>stable<span class="token operator">-</span>repo<span class="token operator">-</span>url https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>kubernetes<span class="token punctuation">.</span>oss<span class="token operator">-</span>cn<span class="token operator">-</span>hangzhou<span class="token punctuation">.</span>aliyuncs<span class="token punctuation">.</span>com<span class="token operator">/</span>charts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行上面命令后，可以通过 <code v-pre>kubectl get po -n kube-system</code> 来查看 <code v-pre>tiller</code> 的安装情况。</p>
<p>由于 <code v-pre>kubernetes</code> 从1.6 版本开始加入了 <code v-pre>RBAC</code> 授权。当前的 <code v-pre>Tiller</code> 没有定义用于授权的 <code v-pre>ServiceAccount</code>， 访问 <code v-pre>API Server</code> 时会被拒绝，需要给 <code v-pre>Tiller</code> 加入授权。</p>
<ul>
<li>创建 <code v-pre>Kubernetes</code> 的服务帐号和绑定角色</li>
</ul>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>$ kubectl create serviceaccount <span class="token operator">-</span><span class="token operator">-</span>namespace kube<span class="token operator">-</span>system tiller                               
serviceaccount <span class="token string-literal"><span class="token string">"tiller"</span></span> created

$ kubectl create clusterrolebinding tiller<span class="token operator">-</span>cluster<span class="token operator">-</span>rule <span class="token operator">-</span><span class="token operator">-</span>clusterrole<span class="token operator">=</span>cluster<span class="token operator">-</span>admin <span class="token operator">-</span><span class="token operator">-</span>serviceaccount<span class="token operator">=</span>kube<span class="token operator">-</span>system<span class="token symbol">:tiller</span>
clusterrolebinding<span class="token punctuation">.</span>rbac<span class="token punctuation">.</span>authorization<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io <span class="token string-literal"><span class="token string">"tiller-cluster-rule"</span></span> created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>给 <code v-pre>Tiller</code> 的 <code v-pre>deployments</code> 添加刚才创建的 <code v-pre>ServiceAccount</code></li>
</ul>
<div class="language-rust ext-rs line-numbers-mode"><pre v-pre class="language-rust"><code># 给 <span class="token class-name">Tiller</span> 的 deployments 添加刚才创建的 <span class="token class-name">ServiceAccount</span>
$ kubectl patch deploy <span class="token operator">-</span><span class="token operator">-</span>namespace kube<span class="token operator">-</span>system tiller<span class="token operator">-</span>deploy <span class="token operator">-</span>p '<span class="token punctuation">{</span><span class="token string">"spec"</span><span class="token punctuation">:</span><span class="token punctuation">{</span><span class="token string">"template"</span><span class="token punctuation">:</span><span class="token punctuation">{</span><span class="token string">"spec"</span><span class="token punctuation">:</span><span class="token punctuation">{</span><span class="token string">"serviceAccount"</span><span class="token punctuation">:</span><span class="token string">"tiller"</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>'
deployment<span class="token punctuation">.</span>extensions <span class="token string">"tiller-deploy"</span> patched
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查看 <code v-pre>Tiller deployments</code> 资源是否绑定 <code v-pre>ServiceAccount</code></li>
</ul>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code>$ kubectl <span class="token keyword">get</span> deploy <span class="token operator">-</span>n kube<span class="token operator">-</span>system tiller<span class="token operator">-</span>deploy <span class="token operator">-</span>o yaml <span class="token operator">|</span> grep <span class="token class-name">serviceAccount</span>
serviceAccount<span class="token punctuation">:</span> <span class="token class-name">tiller</span>
serviceAccountName<span class="token punctuation">:</span> tiller
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>查看 <code v-pre>Tiller</code> 是否安装成功</li>
</ul>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>$ helm version 
<span class="token symbol">Client</span><span class="token operator">:</span> <span class="token operator">&amp;</span>version<span class="token punctuation">.</span>Version<span class="token punctuation">{</span><span class="token symbol">SemVer</span><span class="token symbol">:"v2.9.1"</span><span class="token punctuation">,</span> <span class="token symbol">GitCommit</span><span class="token symbol">:"20adb27c7c5868466912eebdf6664e7390ebe710"</span><span class="token punctuation">,</span> <span class="token symbol">GitTreeState</span><span class="token symbol">:"clean"</span><span class="token punctuation">}</span>
<span class="token symbol">Server</span><span class="token operator">:</span> <span class="token operator">&amp;</span>version<span class="token punctuation">.</span>Version<span class="token punctuation">{</span><span class="token symbol">SemVer</span><span class="token symbol">:"v2.9.1"</span><span class="token punctuation">,</span> <span class="token symbol">GitCommit</span><span class="token symbol">:"20adb27c7c5868466912eebdf6664e7390ebe710"</span><span class="token punctuation">,</span> <span class="token symbol">GitTreeState</span><span class="token symbol">:"clean"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装成功后，即可使用 <code v-pre>helm install xxx</code> 来安装 <code v-pre>helm</code> 应用。如果需要删除 <code v-pre>Tiller</code>，可以通过 <code v-pre>kubectl delete deployment tiller-deploy --namespace kube-system</code>  来删除 <code v-pre>Tiller</code> 的 <code v-pre>deployment</code> 或者使用 <code v-pre>helm reset</code> 来删除。</p>
<p><strong>使用 Helm 操作 Chart：</strong></p>
<p>这一节将介绍如何使用 helm 来操作 chart，包括创建、删除、打包、安装等使用。</p>
<p>先介绍一下 Helm 的核心命令：</p>
<ul>
<li>helm create 创建一个 Chart 模板</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm create <span class="token builtin class-name">test</span>
Creating <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>helm package 打包一个 Chart 模板</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm package <span class="token builtin class-name">test</span>                                                                          
Successfully packaged chart and saved it to: /root/test-0.1.0.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>helm search</code> 查找可用的 Chart 模板</li>
</ul>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>$ helm search nginx                                  
<span class="token constant">NAME</span>                    <span class="token constant">CHART</span> <span class="token constant">VERSION</span>   <span class="token constant">APP</span> <span class="token constant">VERSION</span> <span class="token constant">DESCRIPTION</span>
stable<span class="token operator">/</span>nginx<span class="token operator">-</span>ingress    <span class="token number">0.9</span><span class="token number">.5</span>           <span class="token number">0.10</span><span class="token number">.2</span>      An nginx Ingress controller that uses ConfigMap<span class="token operator">...</span>
stable<span class="token operator">/</span>nginx<span class="token operator">-</span>lego       <span class="token number">0.3</span><span class="token number">.1</span>                       Chart <span class="token keyword">for</span> nginx<span class="token operator">-</span>ingress<span class="token operator">-</span>controller <span class="token keyword">and</span> kube<span class="token operator">-</span>lego
stable<span class="token operator">/</span>gcloud<span class="token operator">-</span>endpoints <span class="token number">0.1</span><span class="token number">.0</span>                       Develop<span class="token punctuation">,</span> deploy<span class="token punctuation">,</span> protect <span class="token keyword">and</span> monitor your APIs <span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>helm inspect</code> 查看指定 Chart 的基本信息</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">appVersion</span><span class="token punctuation">:</span> <span class="token string">"1.0"</span>
<span class="token key atrule">description</span><span class="token punctuation">:</span> A Helm chart for Kubernetes
<span class="token key atrule">name</span><span class="token punctuation">:</span> test
<span class="token key atrule">version</span><span class="token punctuation">:</span> 0.1.0

略<span class="token punctuation">...</span>(省略一大段信息）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>helm install</code> 根据指定的 Chart 部署一个 Release 到 Kubernetes 集群</li>
</ul>
<p><strong>Chart 文件结构：</strong></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>wordpress
├── charts
├── Chart.yaml
├── README.md
├── requirements.lock
├── requirements.yaml
├── templates
│   ├── deployment.yaml
│   ├── externaldb-secrets.yaml
│   ├── _helpers.tpl
│   ├── ingress.yaml
│   ├── NOTES.txt
│   ├── pvc.yaml
│   ├── secrets.yaml
│   ├── svc.yaml
│   └── tls-secrets.yaml
└── values.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个 wordpress chart 如上（去除部分 test 和 charts 依赖）， 基本结构由以下几个部分组成：</p>
<ul>
<li>charts 存放子Chart (Subchart) 的定义，Subchart 指的是当前 Chart 依赖的 Chart ， 在 requirements.yaml 中定义</li>
<li>Chart.yaml 包含 Chart 信息的 YAML 文件， 包括 Chart 的版本、名称等，在 DCE Helm 插件中还包含 Chart 的 <strong>团队授权</strong> 信息 和 <strong>是否公开</strong> 的信息</li>
<li>README.md 可选：Chart 的介绍信息等（该文件对于一个大型 Chart 来说十分重要）</li>
<li><code v-pre>Requirements.yaml</code> 可选：列举当前 Chart 的需要依赖的 Chart</li>
<li><code v-pre>templates</code>：
<ul>
<li>该目录下存放 Chart 所有的 K8s 资源定义模板，通常不同的资源放在不同的文件中，DCE Helm 插件中自定义模板的 K8s 资源统一放在 all_sources.yaml 文件中</li>
<li>_helpers.tpl ， 通常这个文件存放可重用的模板片段，该文件中的定义可以在 Chart 其它资源定义模板中使用</li>
<li>NOTES.txt，可选：一段简短使用说明的文本文件，用于安装 Release 后提示用户使用</li>
</ul>
</li>
<li>values.yaml 当前 Chart 的默认配置的值</li>
</ul>
<h3 id="编写一个简单的-chart-示例" tabindex="-1"><a class="header-anchor" href="#编写一个简单的-chart-示例" aria-hidden="true">#</a> 编写一个简单的 Chart 示例</h3>
<p>本节以构建一个名称为 <code v-pre>nginx-test Chart</code> 为示例，来描述一个 <code v-pre>chart</code> 必要条件。
1、<code v-pre>Chart.yaml</code> 文件是 一个 <code v-pre>chart</code> 必要文件， 该文件可以简单包括以下字段（具体字段请参考<a href="https://links.jianshu.com/go?to=https%3A%2F%2Fhelm.sh%2F" target="_blank" rel="noopener noreferrer">Helm官网<ExternalLinkIcon/></a>)</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1  (chart 的API版本<span class="token punctuation">,</span> 总是"v1"<span class="token punctuation">,</span> 必要)
<span class="token key atrule">name</span><span class="token punctuation">:</span> hello     (chart 的名称<span class="token punctuation">,</span> 必要)
<span class="token key atrule">version</span><span class="token punctuation">:</span> 0.0.1  (chart 的版本，这个版本必须必要遵循 SemVer 2标准)
<span class="token key atrule">description</span><span class="token punctuation">:</span> A Helm chart for Kubernetes   (chart 模板的简介描述)
<span class="token punctuation">...</span>
下面省略一些字段，默认情况下有这几个字段定义就可以了
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、values.yaml 文件是 chart 的必要文件，以 nginx 为示例：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># Default values for test.</span>
<span class="token comment"># This is a YAML-formatted file.</span>
<span class="token comment"># Declare variables to be passed into your templates.</span>
<span class="token key atrule">replicaCount</span><span class="token punctuation">:</span> <span class="token number">1</span>

<span class="token key atrule">image</span><span class="token punctuation">:</span>
  <span class="token key atrule">repository</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">tag</span><span class="token punctuation">:</span> stable
  <span class="token key atrule">pullPolicy</span><span class="token punctuation">:</span> IfNotPresent
<span class="token key atrule">service</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ClusterIP
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">80</span>

<span class="token key atrule">ingress</span><span class="token punctuation">:</span>
  <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token comment"># kubernetes.io/ingress.class: nginx</span>
    <span class="token comment"># kubernetes.io/tls-acme: "true"</span>
  <span class="token key atrule">path</span><span class="token punctuation">:</span> /
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> chart<span class="token punctuation">-</span>example.local
  <span class="token key atrule">tls</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token comment">#  - secretName: chart-example-tls</span>
  <span class="token comment">#    hosts:</span>
  <span class="token comment">#      - chart-example.local</span>

<span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token comment"># We usually recommend not to specify default resources and to leave this as a conscious</span>
  <span class="token comment"># choice for the user. This also increases chances charts run on environments with little</span>
  <span class="token comment"># resources, such as Minikube. If you do want to specify resources, uncomment the following</span>
  <span class="token comment"># lines, adjust them as necessary, and remove the curly braces after 'resources:'.</span>
  <span class="token comment"># limits:</span>
  <span class="token comment">#  cpu: 100m</span>
  <span class="token comment">#  memory: 128Mi</span>
  <span class="token comment"># requests:</span>
  <span class="token comment">#  cpu: 100m</span>
  <span class="token comment">#  memory: 128Mi</span>

<span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token key atrule">tolerations</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

<span class="token key atrule">affinity</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从示例中可以看出，<code v-pre>values.yaml</code> 中定义了一些当前<code v-pre>chart</code> 的一些默认值，用于 <code v-pre>templates</code> 下的 K8s 资源 yaml 渲染时填充默认值。不过需要注意的是，如果使用 helm install 来部署一个 Release , 可以通过下面命令指定一份yaml 文件作为填充值：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm <span class="token function">install</span> <span class="token parameter variable">--values</span><span class="token operator">=</span>myvals.yaml nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3、创建 templates 下的模板文件， 用于生成 <code v-pre>Kubernetes</code> 资源清单(manifests) 如下所示:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># nginx-test/templates/deployments.yaml </span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1beta2
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> template "nginx<span class="token punctuation">-</span>test.fullname" . <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> template "nginx<span class="token punctuation">-</span>test.name" . <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">chart</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> template "nginx<span class="token punctuation">-</span>test.chart" . <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">release</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">heritage</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Service <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.replicaCount <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> template "nginx<span class="token punctuation">-</span>test.name" . <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">release</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> template "nginx<span class="token punctuation">-</span>test.name" . <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">release</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Chart.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">"{{ .Values.image.repository }}:{{ .Values.image.tag }}"</span>
          <span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.image.pullPolicy <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">ports</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> http
              <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
              <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
          <span class="token key atrule">livenessProbe</span><span class="token punctuation">:</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /
              <span class="token key atrule">port</span><span class="token punctuation">:</span> http
          <span class="token key atrule">readinessProbe</span><span class="token punctuation">:</span>
            <span class="token key atrule">httpGet</span><span class="token punctuation">:</span>
              <span class="token key atrule">path</span><span class="token punctuation">:</span> /
              <span class="token key atrule">port</span><span class="token punctuation">:</span> http
          <span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> toYaml .Values.resources <span class="token punctuation">|</span> indent 12 <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> with .Values.nodeSelector <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">nodeSelector</span><span class="token punctuation">:</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> toYaml . <span class="token punctuation">|</span> indent 8 <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> with .Values.affinity <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">affinity</span><span class="token punctuation">:</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> toYaml . <span class="token punctuation">|</span> indent 8 <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> with .Values.tolerations <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">tolerations</span><span class="token punctuation">:</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> toYaml . <span class="token punctuation">|</span> indent 8 <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
    
<span class="token comment"># nginx-test/templates/service.yaml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> template "nginx<span class="token punctuation">-</span>test.fullname" . <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> template "nginx<span class="token punctuation">-</span>test.name" . <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">chart</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> template "nginx<span class="token punctuation">-</span>test.chart" . <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">release</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">heritage</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Service <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.service.type <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Values.service.port <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> http 
      <span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
      <span class="token key atrule">name</span><span class="token punctuation">:</span> http
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> template "nginx<span class="token punctuation">-</span>test.name" . <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">release</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> .Release.Name <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面定义了 一个 <code v-pre>deployments.yaml</code> 和 <code v-pre>service.yaml</code> 资源文件，里面使用 <code v-pre>{{ }}</code> 符号的是 <code v-pre>Go</code> 模板语言的标准。其中可以通过：</p>
<ul>
<li><code v-pre>.Values</code> 对象访问 <code v-pre>values.yaml</code> 文件的内容， 前面的dot(.) 表示从顶层命名空间开始，找到 Values 对象(下同)</li>
<li><code v-pre>.Release</code>、<code v-pre>.Chart</code> 开头的预定义值可用于任何的模板中</li>
<li><code v-pre>.Chart</code> 对象用来访问 <code v-pre>Chart.yaml</code> 文件的内容</li>
<li><code v-pre>.Release</code> 对象是 Helm的内置对象之一， 使用 Helm 安装一个 release 时，由 Tiller 分配 release 的名称</li>
</ul>
<p>4、命名模板(_helper.tpl) ：可以从上面看到有 <code v-pre>{{ template &quot;nginx-test.fullname&quot; . }}</code> 定义。该定义由 <code v-pre>_helper.tpl</code> 文件定义的字段来实现，比如下面一个 <code v-pre>_helper.tpl</code>：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token key atrule">/* vim</span><span class="token punctuation">:</span> <span class="token key atrule">set filetype=mustache</span><span class="token punctuation">:</span> <span class="token important">*/</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span>/*
Expand the name of the chart.
<span class="token important">*/</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> define "nginx<span class="token punctuation">-</span>test.name" <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> default .Chart.Name .Values.nameOverride <span class="token punctuation">|</span> trunc 63 <span class="token punctuation">|</span> trimSuffix "<span class="token punctuation">-</span>" <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token punctuation">{</span><span class="token punctuation">{</span>/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
<span class="token important">*/</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> define "nginx<span class="token punctuation">-</span>test.fullname" <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if .Values.fullnameOverride <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> .Values.fullnameOverride <span class="token punctuation">|</span> trunc 63 <span class="token punctuation">|</span> trimSuffix "<span class="token punctuation">-</span>" <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> else <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> $name <span class="token punctuation">:</span>= default .Chart.Name .Values.nameOverride <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if contains $name .Release.Name <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> .Release.Name <span class="token punctuation">|</span> trunc 63 <span class="token punctuation">|</span> trimSuffix "<span class="token punctuation">-</span>" <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> else <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> printf "%s<span class="token punctuation">-</span>%s" .Release.Name $name <span class="token punctuation">|</span> trunc 63 <span class="token punctuation">|</span> trimSuffix "<span class="token punctuation">-</span>" <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token punctuation">{</span><span class="token punctuation">{</span>/*
Create chart name and version as used by the chart label.
<span class="token important">*/</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> define "nginx<span class="token punctuation">-</span>test.chart" <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> printf "%s<span class="token punctuation">-</span>%s" .Chart.Name .Chart.Version <span class="token punctuation">|</span> replace "+" "_" <span class="token punctuation">|</span> trunc 63 <span class="token punctuation">|</span> trimSuffix "<span class="token punctuation">-</span>" <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该模板定义了 &quot;nginx-test.name&quot;、&quot;nginx-test.fullname&quot;、&quot;nginx-test.chart&quot; 等可重用模板部分，当模板引擎读取该文件时，它存储对 nginx-test.name等的引用， 直到调用 template &quot;nginx-test.name&quot; 为止。然后把值渲染到模板中。</p>
<p>注意 <code v-pre>{{ template &quot;nginx-test.chart&quot; . }}</code> 后面有个<code v-pre>dot(.)</code>，这是因为一个已命名的模板（用于创建 <code v-pre>define</code>) 被渲染时，它将接收由该 <code v-pre>template</code> 调用传入的范围<code v-pre>（scope)</code>。没有范围传入，在模板中无法访问任何内容，因此在：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> define "nginx<span class="token punctuation">-</span>test.chart" <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
这里面的 .Chart 将无法访问，导致在模板中无法看到内容，因为这里值为空
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">-</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此在模板中将 范围(scope) 传入即可正常使用：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># nginx-test/templates/service.yaml</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> template "nginx<span class="token punctuation">-</span>test.fullname" . <span class="token punctuation">}</span><span class="token punctuation">}</span>
  在末尾传递了 . 这样就可以使用 .Values 或者 .Chart 或其它范围(scope)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>5、Chart 依赖（requirements.yaml)：比如 <code v-pre>WordPress Chart</code> 依赖于 mariadb Chart， 下面是 WordPress 的依赖(requirements.yaml)：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">dependencies</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mariadb
  <span class="token key atrule">version</span><span class="token punctuation">:</span> 5.x.x
  <span class="token key atrule">repository</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//kubernetes<span class="token punctuation">-</span>charts.storage.googleapis.com/
  <span class="token key atrule">condition</span><span class="token punctuation">:</span> mariadb.enabled
  <span class="token key atrule">tags</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> wordpress<span class="token punctuation">-</span>database
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该文件列举当前 Chart 所有的 依赖（subchart)。有几个字段是必要的：</p>
<ul>
<li>name: 依赖 Chart 的名称（必要）</li>
<li>version: 依赖 Chart 的版本号（必要）</li>
<li>repository: 依赖 Chart 的存储库完整URL，必须通过 helm repo add 添加 repository（存储库）到本地</li>
</ul>
<h2 id="clusterfile文件" tabindex="-1"><a class="header-anchor" href="#clusterfile文件" aria-hidden="true">#</a> Clusterfile文件</h2>
<blockquote>
<p>当我们使用 <code v-pre>sealos</code> 启动一个集群镜像的时候我们会有一个 <code v-pre>Clusterfile</code> 文件。</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@VM-4-3-ubuntu:~/.sealos/default# cat Clusterfile 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="custom-container details"><summary>展开</summary>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>root@VM<span class="token punctuation">-</span>4<span class="token punctuation">-</span>3<span class="token punctuation">-</span>ubuntu<span class="token punctuation">:</span>~/.sealos/default<span class="token comment"># cat Clusterfile </span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps.sealos.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Cluster
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token string">"2022-10-20T13:12:33Z"</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">ips</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> 10.0.4.3<span class="token punctuation">:</span><span class="token number">22</span>
    <span class="token key atrule">roles</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
    <span class="token punctuation">-</span> amd64
  <span class="token key atrule">image</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> labring/kubernetes<span class="token punctuation">:</span>v1.25.0
  <span class="token punctuation">-</span> labring/helm<span class="token punctuation">:</span>v3.8.2
  <span class="token punctuation">-</span> labring/calico<span class="token punctuation">:</span>v3.24.1
  <span class="token punctuation">-</span> labring/kubernetes<span class="token punctuation">:</span>v1.25.0
  <span class="token punctuation">-</span> labring/helm<span class="token punctuation">:</span>v3.8.2
  <span class="token punctuation">-</span> labring/calico<span class="token punctuation">:</span>v3.24.1
  <span class="token punctuation">-</span> labring/kubernetes<span class="token punctuation">-</span>docker<span class="token punctuation">:</span>v1.20.5<span class="token punctuation">-</span>4.1.3
  <span class="token punctuation">-</span> labring/calico<span class="token punctuation">:</span>v3.24.1
  <span class="token punctuation">-</span> labring/kubernetes<span class="token punctuation">-</span>docker<span class="token punctuation">:</span>v1.20.5<span class="token punctuation">-</span>4.1.3
  <span class="token key atrule">ssh</span><span class="token punctuation">:</span>
    <span class="token key atrule">passwd</span><span class="token punctuation">:</span> <span class="token string">'[your-ssh-passwd]'</span>
    <span class="token key atrule">pk</span><span class="token punctuation">:</span> /root/.ssh/id_rsa
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
    <span class="token key atrule">user</span><span class="token punctuation">:</span> root
<span class="token key atrule">status</span><span class="token punctuation">:</span>
  <span class="token key atrule">conditions</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">lastHeartbeatTime</span><span class="token punctuation">:</span> <span class="token string">"2022-11-03T11:10:06Z"</span>
    <span class="token key atrule">message</span><span class="token punctuation">:</span> Applied to cluster successfully
    <span class="token key atrule">reason</span><span class="token punctuation">:</span> Ready
    <span class="token key atrule">status</span><span class="token punctuation">:</span> <span class="token string">"True"</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> ApplyClusterSuccess
  <span class="token key atrule">mounts</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token key atrule">criData</span><span class="token punctuation">:</span> /var/lib/containerd
      <span class="token key atrule">registryConfig</span><span class="token punctuation">:</span> /etc/registry
      <span class="token key atrule">registryData</span><span class="token punctuation">:</span> /var/lib/registry
      <span class="token key atrule">registryDomain</span><span class="token punctuation">:</span> sealos.hub
      <span class="token key atrule">registryPassword</span><span class="token punctuation">:</span> passw0rd
      <span class="token key atrule">registryPort</span><span class="token punctuation">:</span> <span class="token string">"5000"</span>
      <span class="token key atrule">registryUsername</span><span class="token punctuation">:</span> admin
    <span class="token key atrule">imageName</span><span class="token punctuation">:</span> labring/kubernetes<span class="token punctuation">:</span>v1.25.0
    <span class="token key atrule">labels</span><span class="token punctuation">:</span>
      <span class="token key atrule">auth</span><span class="token punctuation">:</span> auth.sh
      <span class="token key atrule">check</span><span class="token punctuation">:</span> check.sh $registryData
      <span class="token key atrule">clean</span><span class="token punctuation">:</span> clean.sh $criData
      <span class="token key atrule">clean-registry</span><span class="token punctuation">:</span> clean<span class="token punctuation">-</span>registry.sh $registryData $registryConfig
      <span class="token key atrule">image</span><span class="token punctuation">:</span> ghcr.io/labring/lvscare<span class="token punctuation">:</span>v4.1.3
      <span class="token key atrule">init</span><span class="token punctuation">:</span> init.sh $registryDomain $registryPort
      <span class="token key atrule">init-registry</span><span class="token punctuation">:</span> init<span class="token punctuation">-</span>registry.sh $registryData $registryConfig
      <span class="token key atrule">io.buildah.version</span><span class="token punctuation">:</span> 1.25.0<span class="token punctuation">-</span>dev
      <span class="token key atrule">sealos.io.type</span><span class="token punctuation">:</span> rootfs
      <span class="token key atrule">version</span><span class="token punctuation">:</span> v1.25.0
    <span class="token key atrule">mountPoint</span><span class="token punctuation">:</span> /var/lib/containers/storage/overlay/d6743e52e7bd4635107a4e7b586892dd505c9f5e4c5d040f16004f571934bb33/merged
    <span class="token key atrule">name</span><span class="token punctuation">:</span> default<span class="token punctuation">-</span>a26bij8e
    <span class="token key atrule">type</span><span class="token punctuation">:</span> rootfs
  <span class="token punctuation">-</span> <span class="token key atrule">cmd</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> cp opt/helm /usr/bin/
    <span class="token key atrule">imageName</span><span class="token punctuation">:</span> labring/helm<span class="token punctuation">:</span>v3.8.2
    <span class="token key atrule">labels</span><span class="token punctuation">:</span>
      <span class="token key atrule">io.buildah.version</span><span class="token punctuation">:</span> 1.25.0<span class="token punctuation">-</span>dev
    <span class="token key atrule">mountPoint</span><span class="token punctuation">:</span> /var/lib/containers/storage/overlay/a673232bd58b472065d8741c307394e0371b0b8e5e4c199e7e1c3f5df05285d0/merged
    <span class="token key atrule">name</span><span class="token punctuation">:</span> default<span class="token punctuation">-</span>7bztc4cy
    <span class="token key atrule">type</span><span class="token punctuation">:</span> application
  <span class="token punctuation">-</span> <span class="token key atrule">cmd</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> kubectl create namespace tigera<span class="token punctuation">-</span>operator
    <span class="token punctuation">-</span> helm install calico charts/calico <span class="token punctuation">-</span><span class="token punctuation">-</span>namespace tigera<span class="token punctuation">-</span>operator
    <span class="token key atrule">imageName</span><span class="token punctuation">:</span> labring/calico<span class="token punctuation">:</span>v3.24.1
    <span class="token key atrule">labels</span><span class="token punctuation">:</span>
      <span class="token key atrule">io.buildah.version</span><span class="token punctuation">:</span> 1.25.0<span class="token punctuation">-</span>dev
    <span class="token key atrule">mountPoint</span><span class="token punctuation">:</span> /var/lib/containers/storage/overlay/89823056d3a1c3d2daaa7d4c90e3a50c03ff82cb70dfed0ec22b06307a875411/merged
    <span class="token key atrule">name</span><span class="token punctuation">:</span> default<span class="token punctuation">-</span>orerq6tp
    <span class="token key atrule">type</span><span class="token punctuation">:</span> application
  <span class="token punctuation">-</span> <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token key atrule">criData</span><span class="token punctuation">:</span> /var/lib/docker
      <span class="token key atrule">criDockerdData</span><span class="token punctuation">:</span> /var/lib/cri<span class="token punctuation">-</span>dockerd
      <span class="token key atrule">registryConfig</span><span class="token punctuation">:</span> /etc/registry
      <span class="token key atrule">registryData</span><span class="token punctuation">:</span> /var/lib/registry
      <span class="token key atrule">registryDomain</span><span class="token punctuation">:</span> sealos.hub
      <span class="token key atrule">registryPassword</span><span class="token punctuation">:</span> passw0rd
      <span class="token key atrule">registryPort</span><span class="token punctuation">:</span> <span class="token string">"5000"</span>
      <span class="token key atrule">registryUsername</span><span class="token punctuation">:</span> admin
    <span class="token key atrule">imageName</span><span class="token punctuation">:</span> labring/kubernetes<span class="token punctuation">-</span>docker<span class="token punctuation">:</span>v1.20.5<span class="token punctuation">-</span>4.1.3
    <span class="token key atrule">labels</span><span class="token punctuation">:</span>
      <span class="token key atrule">auth</span><span class="token punctuation">:</span> auth.sh $registryDomain $registryPort $registryUsername $registryPassword
      <span class="token key atrule">check</span><span class="token punctuation">:</span> check.sh $registryData
      <span class="token key atrule">clean</span><span class="token punctuation">:</span> clean.sh $criData $criDockerdData
      <span class="token key atrule">clean-registry</span><span class="token punctuation">:</span> clean<span class="token punctuation">-</span>registry.sh $registryData $registryConfig
      <span class="token key atrule">image</span><span class="token punctuation">:</span> ghcr.io/labring/lvscare<span class="token punctuation">:</span>v4.1.3
      <span class="token key atrule">init</span><span class="token punctuation">:</span> init.sh
      <span class="token key atrule">init-registry</span><span class="token punctuation">:</span> init<span class="token punctuation">-</span>registry.sh $registryData $registryConfig
      <span class="token key atrule">io.buildah.version</span><span class="token punctuation">:</span> 1.25.0<span class="token punctuation">-</span>dev
      <span class="token key atrule">sealos.io.type</span><span class="token punctuation">:</span> rootfs
      <span class="token key atrule">sealos.io.version</span><span class="token punctuation">:</span> v1beta1
      <span class="token key atrule">version</span><span class="token punctuation">:</span> v1.20.5
    <span class="token key atrule">mountPoint</span><span class="token punctuation">:</span> /var/lib/containers/storage/overlay/4af662552ff4c7c5b2fa7ca9995664911e72528ad964f0c181a7f5d718716e2d/merged
    <span class="token key atrule">name</span><span class="token punctuation">:</span> default<span class="token punctuation">-</span>km12aep7
    <span class="token key atrule">type</span><span class="token punctuation">:</span> rootfs
  <span class="token key atrule">phase</span><span class="token punctuation">:</span> ClusterSuccess
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>我们进入 <code v-pre>/var/lib/containers/storage/overlay/4af662552ff4c7c5b2fa7ca9995664911e72528ad964f0c181a7f5d718716e2d/</code> 目录（这里面就是 rootfs）：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /var/lib/containers/storage/overlay/4af662552ff4c7c5b2fa7ca9995664911e72528ad964f0c181a7f5d718716e2d/merged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**这个里面就有所有文件，文件里面有安装 <code v-pre>k8s</code> 所有的依赖 **</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ca9995664911e72528ad964f0c181a7f5d718716e2d/merged<span class="token comment"># ls</span>
bin  cri  etc  images  Kubefile  opt  README.md  registry  scripts  statics
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>bin</code> 带着一些集群需要的 <code v-pre>kubeadm</code> 、<code v-pre>kubelet</code></li>
<li><code v-pre>images</code> 里面文件中有 <code v-pre>docker</code> 镜像列表和地址（转k8s集群需要的，会自动拉取下面的~）</li>
<li><code v-pre>etcd</code> 各种配置文件</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/merged<span class="token comment"># cat images/shim/DefaultI</span>
mageList 
k8s.gcr.io/kube-apiserver:v1.20.5
k8s.gcr.io/kube-controller-manager:v1.20.5
k8s.gcr.io/kube-scheduler:v1.20.5
k8s.gcr.io/kube-proxy:v1.20.5
k8s.gcr.io/pause:3.2
k8s.gcr.io/etcd:3.4.13-0
k8s.gcr.io/coredns:1.7.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>所以 <code v-pre>sealos run</code> 的时候先找<code v-pre>sealos</code> 镜像仓库中的。</strong></p>
<p><strong>构建当前集群镜像：</strong></p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code>ca9995664911e72528ad964f0c181a7f5d718716e2d/merged# cat Kubefile 
<span class="token instruction"><span class="token keyword">FROM</span> scratch</span>
<span class="token instruction"><span class="token keyword">MAINTAINER</span> sealos</span>
<span class="token instruction"><span class="token keyword">LABEL</span> init=<span class="token string">"init.sh"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> version=<span class="token string">"v1.20.5"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> image=<span class="token string">"ghcr.io/labring/lvscare:v4.1.3"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> clean=<span class="token string">"clean.sh \$criData \$criDockerdData"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> check=<span class="token string">"check.sh \$registryData"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> init-registry=<span class="token string">"init-registry.sh \$registryData \$registryConfig"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> clean-registry=<span class="token string">"clean-registry.sh \$registryData \$registryConfig"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> auth=<span class="token string">"auth.sh \$registryDomain \$registryPort \$registryUsername \$registryPassword"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> sealos.io.type=<span class="token string">"rootfs"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> sealos.io.version=<span class="token string">"v1beta1"</span></span>
<span class="token instruction"><span class="token keyword">ENV</span> criData=/var/lib/docker</span>
<span class="token instruction"><span class="token keyword">ENV</span> criDockerdData=/var/lib/cri-dockerd</span>
<span class="token instruction"><span class="token keyword">ENV</span> registryData=/var/lib/registry</span>
<span class="token instruction"><span class="token keyword">ENV</span> registryConfig=/etc/registry</span>
<span class="token instruction"><span class="token keyword">ENV</span> registryDomain=sealos.hub</span>
<span class="token instruction"><span class="token keyword">ENV</span> registryPort=5000</span>
<span class="token instruction"><span class="token keyword">ENV</span> registryUsername=admin</span>
<span class="token instruction"><span class="token keyword">ENV</span> registryPassword=passw0rd</span>
<span class="token instruction"><span class="token keyword">COPY</span> . .</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们可以直接 build 出一个镜像：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealos build <span class="token parameter variable">-t</span> calico:latest <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们会把 <code v-pre>calica</code> 依赖的所有镜像拉取下来，放到 <code v-pre>registry</code> 目录下面。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '1.md' style='float:left'>⬆️上一节🔗  </a><a href = '3.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


