<template><div><div class="language-dataview ext-dataview line-numbers-mode"><pre v-pre class="language-dataview"><code>list
from #kubernetes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第16节-treafik-lb" tabindex="-1"><a class="header-anchor" href="#第16节-treafik-lb" aria-hidden="true">#</a> 第16节 Treafik LB</h1>
<div><a href = '15.md' style='float:left'>⬆️上一节🔗  </a><a href = '17.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#介绍">介绍</router-link></li><li><router-link to="#安装">安装</router-link></li><li><router-link to="#coredns">CoreDNS</router-link><ul><li><router-link to="#如何修改-coredns-参数">如何修改 coredns 参数</router-link></li></ul></li><li><router-link to="#traefik-ingress-controller">Traefik Ingress Controller</router-link><ul><li><router-link to="#如何启用-treafik2-dashboard">如何启用 treafik2 dashboard：</router-link></li></ul></li><li><router-link to="#service-load-balancer">Service Load Balancer</router-link><ul><li><router-link to="#service-lb-如何工作">Service LB 如何工作</router-link></li><li><router-link to="#用法">用法</router-link></li><li><router-link to="#从节点中排除-service-lb">从节点中排除 Service LB</router-link></li><li><router-link to="#禁用-service-lb">禁用 Service LB</router-link></li></ul></li><li><router-link to="#没有主机名的节点">没有主机名的节点</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<ul>
<li><a href="https://github.com/traefik/traefik" target="_blank" rel="noopener noreferrer">开源地址<ExternalLinkIcon/></a></li>
<li><a href="https://traefik.io/" target="_blank" rel="noopener noreferrer">官方<ExternalLinkIcon/></a></li>
</ul>
<p>Treafik 是一个为了让部署微服务更加便捷而诞生的现代HTTP反向代理、负载均衡工具。 它支持多种后台 (<a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker<ExternalLinkIcon/></a>, <a href="https://docs.docker.com/swarm" target="_blank" rel="noopener noreferrer">Swarm<ExternalLinkIcon/></a>, <a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer">Kubernetes<ExternalLinkIcon/></a>, <a href="https://mesosphere.github.io/marathon/" target="_blank" rel="noopener noreferrer">Marathon<ExternalLinkIcon/></a>, <a href="https://github.com/apache/mesos" target="_blank" rel="noopener noreferrer">Mesos<ExternalLinkIcon/></a>, <a href="https://www.consul.io/" target="_blank" rel="noopener noreferrer">Consul<ExternalLinkIcon/></a>, <a href="https://coreos.com/etcd/" target="_blank" rel="noopener noreferrer">Etcd<ExternalLinkIcon/></a>, <a href="https://zookeeper.apache.org/" target="_blank" rel="noopener noreferrer">Zookeeper<ExternalLinkIcon/></a>, <a href="https://github.com/boltdb/bolt" target="_blank" rel="noopener noreferrer">BoltDB<ExternalLinkIcon/></a>, Rest API, file…) 来自动化、动态的应用它的配置文件设置。</p>
<p><img src="http://sm.cubxxw.com/smarchitecture.png" alt="结构"></p>
<details class="custom-container details"><summary>Nginx和Traefik横向对比</summary>
<p><code v-pre>Nginx</code> 和 <code v-pre>Traefik</code> 横向对比：</p>
<p><img src="http://sm.cubxxw.com/smimage-20221031155941634.png" alt="image-20221031155941634"></p>
</details>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<details class="custom-container details"><summary>安装方式</summary>
<p>treafik支持下面几种安装的方式：</p>
<ul>
<li>最简单的方法： 从 <a href="https://github.com/containous/traefik/releases" target="_blank" rel="noopener noreferrer">版本下载<ExternalLinkIcon/></a> 页面下载最新的可执行文件并以这个 <a href="https://raw.githubusercontent.com/containous/traefik/master/traefik.sample.toml" target="_blank" rel="noopener noreferrer">示例配置文件<ExternalLinkIcon/></a> 运行：</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>./traefik <span class="token parameter variable">--configFile</span><span class="token operator">=</span>traefik.toml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>通过Docker镜像：</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">-v</span> <span class="token environment constant">$PWD</span>/traefik.toml:/etc/traefik/traefik.toml traefik
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>通过源码编译：</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/containous/traefik
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h2 id="coredns" tabindex="-1"><a class="header-anchor" href="#coredns" aria-hidden="true">#</a> CoreDNS</h2>
<p>CoreDNS 是在 agent 节点启动时部署的。要禁用，请在每台服务器上运行 <code v-pre>--disable coredns</code> 选项。</p>
<p>如果你不安装 CoreDNS，你将需要自己安装一个集群 DNS 提供商。</p>
<h3 id="如何修改-coredns-参数" tabindex="-1"><a class="header-anchor" href="#如何修改-coredns-参数" aria-hidden="true">#</a> 如何修改 coredns 参数</h3>
<p>通过修改<code v-pre>/var/lib/rancher/k3s/server/manifests/coredns.yaml</code>配置文件会立即生效，但重启 K3s 服务会导致 coredns 配置重新初始化，所以要修改 corends 的参数，可以通过以下步骤修改：</p>
<ol>
<li>将<code v-pre>coredns.yaml</code>保存到其他目录</li>
<li>通过 <code v-pre>--disable coredns</code> 禁用 coredns</li>
<li>将备份的<code v-pre>coredns.yaml</code> 复制到 <code v-pre>/var/lib/rancher/k3s/server/manifests/c.yaml</code>，并修改对应参数</li>
</ol>
<h2 id="traefik-ingress-controller" tabindex="-1"><a class="header-anchor" href="#traefik-ingress-controller" aria-hidden="true">#</a> Traefik Ingress Controller</h2>
<p>启动 server 时，默认情况下会部署 Traefik。默认的配置文件在<code v-pre>/var/lib/rancher/k3s/server/manifests/traefik.yaml</code>中，对该文件的任何修改都会以类似<code v-pre>kubectl apply</code>的方式自动部署到 Kubernetes 中。</p>
<p>Traefik ingress controller 将使用主机上的 80 和 443 端口（即这些端口不能用于 HostPort 或 NodePort）。</p>
<p>Traefik 可以通过编辑 <code v-pre>traefik.yaml</code> 文件进行配置。为了防止 k3s 使用或覆盖修改后的版本，请使用<code v-pre>--disable traefik</code>部署 k3s，并将修改后的副本存储在<code v-pre>k3s/server/manifests</code>目录中。更多信息请参考官方的<a href="https://github.com/helm/charts/tree/master/stable/traefik#configuration" target="_blank" rel="noopener noreferrer">Traefik 配置参数<ExternalLinkIcon/></a>。</p>
<p>要禁用它，请使用<code v-pre>--disable traefik</code>选项启动每个 server。</p>
<h3 id="如何启用-treafik2-dashboard" tabindex="-1"><a class="header-anchor" href="#如何启用-treafik2-dashboard" aria-hidden="true">#</a> 如何启用 treafik2 dashboard：</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Note: in a kubernetes secret the string (e.g. generated by htpasswd) must be base64-encoded first.</span>
<span class="token comment"># To create an encoded user:password pair, the following command can be used:</span>
<span class="token comment"># htpasswd -nb admin admin | openssl base64</span>

apiVersion: v1
kind: Secret
metadata:
  name: authsecret
  namespace: default
data:
  users: <span class="token operator">|</span><span class="token number">2</span>
    YWRtaW46JGFwcjEkLkUweHd1Z0EkUjBmLi85WndJNXZWRFMyR2F2LmtELwoK
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: traefik-dashboard
spec:
  routes:
  - match: Host<span class="token punctuation">(</span><span class="token variable"><span class="token variable">`</span>traefik.example.com<span class="token variable">`</span></span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">(</span>PathPrefix<span class="token punctuation">(</span><span class="token variable"><span class="token variable">`</span>/api<span class="token variable">`</span></span><span class="token punctuation">)</span> <span class="token operator">||</span> PathPrefix<span class="token punctuation">(</span><span class="token variable"><span class="token variable">`</span>/dashboard<span class="token variable">`</span></span><span class="token punctuation">))</span>
    kind: Rule
    services:
    - name: api@internal
      kind: TraefikService
    middlewares:
      - name: auth
---
apiVersion: traefik.containo.us/v1alpha1
kind: Middleware
metadata:
  name: auth
spec:
  basicAuth:
    secret: authsecret <span class="token comment"># Kubernetes secret named "secretName"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后通过 http://traefik.example.com/dashboard/ 访问 traefik dashboard</p>
<p>参考：</p>
<p>https://doc.traefik.io/traefik/operations/dashboard/</p>
<p>https://doc.traefik.io/traefik/middlewares/basicauth/#general</p>
<h2 id="service-load-balancer" tabindex="-1"><a class="header-anchor" href="#service-load-balancer" aria-hidden="true">#</a> Service Load Balancer</h2>
<p>K3s 提供了一个名为<a href="https://github.com/rancher/klipper-lb" target="_blank" rel="noopener noreferrer">Klipper Load Balancer<ExternalLinkIcon/></a>的负载均衡器，它可以使用可用的主机端口。 允许创建 LoadBalancer 类型的 Service，但不包括 LB 的实现。某些 LB 服务需要云提供商，例如 Amazon EC2 或 Microsoft Azure。相比之下，<code v-pre>K3s service LB</code> 使得可以在没有云提供商的情况下使用 LB 服务。</p>
<h3 id="service-lb-如何工作" tabindex="-1"><a class="header-anchor" href="#service-lb-如何工作" aria-hidden="true">#</a> Service LB 如何工作</h3>
<p>K3s 创建了一个控制器，该控制器为 service load balancer 创建了一个 Pod，这个 Pod 是<a href="https://kubernetes.io/docs/concepts/services-networking/service/" target="_blank" rel="noopener noreferrer">Service<ExternalLinkIcon/></a>类型的 Kubernetes 对象。</p>
<p>对于每个 service load balancer，都会创建一个<a href="https://kubernetes.io/docs/concepts/workloads/controllers/daemonset/" target="_blank" rel="noopener noreferrer">DaemonSet<ExternalLinkIcon/></a>。 DaemonSet 在每个节点上创建一个前缀为<code v-pre>svc</code>的 Pod。</p>
<p>Service LB 控制器会监听其他 Kubernetes Services。当它找到一个 Service 后，它会在所有节点上使用 DaemonSet 为该服务创建一个代理 Pod。这个 Pod 成为其他 Service 的代理，例如，来自节点上 8000 端口的请求可以被路由到端口 8888 上的工作负载。</p>
<p>如果创建多个 Services，则为每个 Service 创建一个单独的 DaemonSet。</p>
<p>只要使用不同的端口，就可以在同一节点上运行多个 Services。</p>
<p>如果您尝试创建一个在 80 端口上监听的 Service LB，Service LB 将尝试在集群中找到 80 端口的空闲主机。如果该端口没有可用的主机，LB 将保持 Pending 状态。</p>
<h3 id="用法" tabindex="-1"><a class="header-anchor" href="#用法" aria-hidden="true">#</a> 用法</h3>
<p>在 K3s 中创建一个<a href="https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer" target="_blank" rel="noopener noreferrer">LoadBalancer 类型的 Service<ExternalLinkIcon/></a>。</p>
<h3 id="从节点中排除-service-lb" tabindex="-1"><a class="header-anchor" href="#从节点中排除-service-lb" aria-hidden="true">#</a> 从节点中排除 Service LB</h3>
<p>要排除节点使用 Service LB，请将以下标签添加到不应排除的节点上：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>svccontroller.k3s.cattle.io/enablelb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果使用标签，则 <code v-pre>service load balancer</code> 仅在标记的节点上运行。</p>
<h3 id="禁用-service-lb" tabindex="-1"><a class="header-anchor" href="#禁用-service-lb" aria-hidden="true">#</a> 禁用 Service LB</h3>
<p>要禁用嵌入式 LB，请使用<code v-pre>--disable servicelb</code>选项运行 k3s server。</p>
<p>如果您希望运行其他 LB，例如 MetalLB，这是必需的。</p>
<h2 id="没有主机名的节点" tabindex="-1"><a class="header-anchor" href="#没有主机名的节点" aria-hidden="true">#</a> 没有主机名的节点</h2>
<p>一些云提供商（如 Linode）会以 &quot;localhost &quot;作为主机名创建机器，而其他提供商可能根本没有设置主机名。这可能会导致域名解析的问题。你可以用<code v-pre>--node-name</code>标志或<code v-pre>K3S_NODE_NAME</code>环境变量来运行 K3s，这样就会传递节点名称来解决这个问题。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '15.md' style='float:left'>⬆️上一节🔗  </a><a href = '17.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


