<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第7节-k8s在线实验学习平台" tabindex="-1"><a class="header-anchor" href="#第7节-k8s在线实验学习平台" aria-hidden="true">#</a> 第7节 k8s在线实验学习平台</h1>
<div><a href = '6.md' style='float:left'>⬆️上一节🔗  </a><a href = '8.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#play-with-kubernetes-介绍">Play with Kubernetes 介绍</router-link></li><li><router-link to="#搭建-kubernetes-集群">搭建 Kubernetes 集群</router-link></li><li><router-link to="#kubernetes-集群的使用">Kubernetes 集群的使用</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="play-with-kubernetes-介绍" tabindex="-1"><a class="header-anchor" href="#play-with-kubernetes-介绍" aria-hidden="true">#</a> Play with Kubernetes 介绍</h2>
<p>（1）<code v-pre>Play with Kubernetes</code> 一个提供了在浏览器中使用免费 <strong>CentOS Linux</strong> 虚拟机的体验平台，其内部实际上是 <strong>Docker-in-Docker</strong>（<strong>DinD</strong>）技术模拟了多虚拟机/<strong>PC</strong> 的效果。
（2）<code v-pre>Play with Kubernetes</code> 平台有如下几个特色：</p>
<ul>
<li>允许我们使用 <strong>github</strong> 或 <strong>dockerhub</strong> 账号登录</li>
<li>在登录后会开始倒计时，让我们有 <strong>4</strong> 小时的时间去实践</li>
<li><strong>K8s</strong> 环境使用 <strong>kubeadm</strong> 来部署（使用用 <strong>weave</strong> 网络）</li>
<li>平台共提供 <strong>5</strong> 台 <strong>centos7</strong> 设备供我们使用（<strong>docker</strong> 版本为 <strong>17.09.0-ce</strong>）</li>
</ul>
<h2 id="搭建-kubernetes-集群" tabindex="-1"><a class="header-anchor" href="#搭建-kubernetes-集群" aria-hidden="true">#</a> 搭建 Kubernetes 集群</h2>
<p>（1）首先访问其网站，并使用 <strong>github</strong> 或 <strong>dockerhub</strong> 账号进行登录。</p>
<ul>
<li><strong>PWK</strong> 官网地址：https://labs.play-with-k8s.com/</li>
</ul>
<p>（2）登录后点击页面上的 <strong>Start</strong> 按钮，我们便拥有一个自己的实验室环境。</p>
<p><img src="http://sm.nsddd.top/smimage-20221019215214900.png" alt="image-20221019215214900"></p>
<p>（3）单击左侧的“<strong>Add New Instance</strong>” 来创建第一个 <strong>Kubernetes</strong> 集群节点。它会自动将其命名为“<strong>node1</strong>”，这个将作为我们群集的主节点。</p>
<p><img src="http://sm.nsddd.top/smimage-20221019215413938.png" alt="image-20221019215413938"></p>
<p>（4）由于刚创建的主节点 <strong>IP</strong> 是 <code v-pre>192.168.0.5</code>，因此我们执行如下命令进行初始化：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm init --apiserver-advertise-address <span class="token number">192.168</span>.0.5 --pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（5）初始化完毕完成之后，界面上会显示 <code v-pre>kubeadm join</code> 命令，这个用于后续 <strong>node</strong> 节点加入集群使用，需要牢记。</p>
<p><img src="http://sm.nsddd.top/smimage-20221019215641859.png" alt="image-20221019215641859"></p>
<p>（6）接着还需要执行如下命令安装 <code v-pre>Pod</code> 网络（这里我们使用 <code v-pre>flannel</code>），否则 <code v-pre>Pod</code> 之间无法通信。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（7）最后我们执行 <code v-pre>kubectl get nodes</code> 查看节点状态，可以看到目前只有一个 <strong>Master</strong> 节点。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221019221408948.png" alt="image-20221019221408948"></p>
<p>（8）我们单击左侧的“<strong>Add New Instance</strong>”按钮继续创建 <strong>4</strong> 个节点作为 <strong>node</strong> 节点</p>
<p><img src="http://sm.nsddd.top/smimage-20221019221428071.png" alt="image-20221019221428071"></p>
<p>（9）这 <code v-pre>4</code> 个节点都执行类似如下的 <code v-pre>kubeadm join</code> 命令加入集群（即之前 <code v-pre>master</code> 节点初始化完成后红框部分内容）</p>
<p><img src="http://sm.nsddd.top/smimage-20221019222217349.png" alt="image-20221019222217349"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.0.18:6443 <span class="token parameter variable">--token</span> mb680t.mue309o4jo5gjfyb --discovery-token-ca-cert-hash sha256:714f1794efcf23flec7f2dc6eae029466022d7c74c991cf91decf8ff22be61ab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221019222531962.png" alt="image-20221019222531962"></p>
<p>（10）最后我们在主节点执行 <code v-pre>kubectl get nodes</code> 查看节点状态，可以看到一个包含有 <code v-pre>5</code> 个节点集群已经部署成功了。</p>
<p><img src="http://sm.nsddd.top/smimage-20221019222932955.png" alt="image-20221019222932955"></p>
<h2 id="kubernetes-集群的使用" tabindex="-1"><a class="header-anchor" href="#kubernetes-集群的使用" aria-hidden="true">#</a> Kubernetes 集群的使用</h2>
<p>（1）执行如下命令通过 <strong>yaml</strong> 文件部署运行 <strong>nginx</strong> 服务（该 <strong>yaml</strong> 文件中指明了副本数量为 <strong>3</strong>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/kubernetes/website/master/content/en/examples/application/nginx-app.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>（2）执行如下命令查看副本（<strong>pod</strong>）情况，可以看到确实有三个副本分别部署在三个 <strong>node</strong> 节点上。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl get pods -o wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221020220601596.png" alt="image-20221020220601596"></p>
<p>（3）执行如下命令则可以查看 <strong>services</strong> 状态。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl get service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221020220633446.png" alt="image-20221020220633446"></p>
<p>（4）当部署完毕后，页面上方会出现一个带有数字的蓝色按钮，按钮数字即为 <strong>Services</strong> 随机配置的外部 <strong>port</strong>。点击蓝色按钮，即可看到 <strong>Nginx</strong> 服务的欢迎页面。（但我测试时一直没有出现，不清楚是什么原因，你如果清楚可以<code v-pre>pr</code>）</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '6.md' style='float:left'>⬆️上一节🔗  </a><a href = '8.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


