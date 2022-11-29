<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第12节-sealer-数据存储目录" tabindex="-1"><a class="header-anchor" href="#第12节-sealer-数据存储目录" aria-hidden="true">#</a> 第12节 sealer 数据存储目录</h1>
<div><a href = '11.md' style='float:left'>⬆️上一节🔗  </a><a href = '13.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="对比" tabindex="-1"><a class="header-anchor" href="#对比" aria-hidden="true">#</a> 对比</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>数据存储一般都会选择 <code v-pre>/var/lib/</code> 下面，包括 docker 、<strong>k3s</strong>、<strong>kubernetes</strong> 等等</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos lib<span class="token punctuation">]</span><span class="token comment"># ls rancher/k3s/</span>
agent  data  server

<span class="token punctuation">[</span>root@VM-4-6-centos lib<span class="token punctuation">]</span><span class="token comment"># ls docker/</span>
containers  image  network  overlay2  plugins  swarm  tmp  trust  volumes

<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z lib<span class="token punctuation">]</span><span class="token comment"># ls sealos </span>
data  logs

<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z lib<span class="token punctuation">]</span><span class="token comment"># ls sealer</span>
data  log  metadata  tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h2 id="第一层" tabindex="-1"><a class="header-anchor" href="#第一层" aria-hidden="true">#</a> 第一层</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z sealer<span class="token punctuation">]</span><span class="token comment"># tree -L 3</span>
<span class="token builtin class-name">.</span>
├── data
│   ├── my-cluster
│   │   ├── admin.conf
│   │   ├── certs
│   │   ├── controller-manager.conf
│   │   ├── kubelet.conf
│   │   ├── pki
│   │   ├── rootfs
│   │   └── scheduler.conf
│   └── overlay2
│       ├── 1066d3057<span class="token punctuation">..</span><span class="token punctuation">..</span>
│       ├── 4f57aa0fb<span class="token punctuation">..</span><span class="token punctuation">..</span>
│       ├── 6af04e85d<span class="token punctuation">..</span><span class="token punctuation">..</span>
│       ├── 70b6c7cb2<span class="token punctuation">..</span><span class="token punctuation">..</span>
│       ├── 869b45ef4<span class="token punctuation">..</span><span class="token punctuation">..</span>
│       ├── 907a935ec<span class="token punctuation">..</span><span class="token punctuation">..</span>
│       ├── b66e77105<span class="token punctuation">..</span><span class="token punctuation">..</span>
│       ├── bdfff9613<span class="token punctuation">..</span><span class="token punctuation">..</span>
│       └── ebd0f721b<span class="token punctuation">..</span><span class="token punctuation">..</span>
├── log
│   ├── <span class="token number">2022</span>-11-09.log
│   ├── <span class="token number">2022</span>-11-10.log
│   ├── <span class="token number">2022</span>-11-13.log
│   ├── <span class="token number">2022</span>-11-25.log
│   └── <span class="token number">2022</span>-11-27.log
├── metadata
│   ├── imagedb
│   │   ├── 3de6a23e655a1a6bc683828de2303844c49681c18e7dc410bc569a284e7c8ab0.yaml
│   │   ├── 46f8c423be130a508116f41cda013502094804525c1274bc84296b674fe17618.yaml
│   │   └── deb14be4949d93160ee16ed9c08e5677957e8e727f4f823ce34a2d69b17044c0.yaml
│   ├── images_metadata.json
│   └── layerdb
│       └── sha256
└── tmp

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第二层-data-cluster" tabindex="-1"><a class="header-anchor" href="#第二层-data-cluster" aria-hidden="true">#</a> 第二层 data - cluster</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>记录，data 的cluster 中的 rootfs 目录可以说就是 CloudRootfs 运行 kubernetes 集群所需的所有文件。</p>
</div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z my-cluster<span class="token punctuation">]</span><span class="token comment"># tree -L 2</span>
<span class="token builtin class-name">.</span>
├── admin.conf
├── certs
│   ├── sea.hub.crt
│   └── sea.hub.key
├── controller-manager.conf
├── kubelet.conf
├── pki
│   ├── apiserver.crt
│   ├── apiserver-etcd-client.crt
│   ├── apiserver-etcd-client.key
│   ├── apiserver.key
│   ├── apiserver-kubelet-client.crt
│   ├── apiserver-kubelet-client.key
│   ├── ca.crt
│   ├── ca.key
│   ├── etcd
│   ├── front-proxy-ca.crt
│   ├── front-proxy-ca.key
│   ├── front-proxy-client.crt
│   ├── front-proxy-client.key
│   ├── sa.key
│   └── sa.pub
├── rootfs
│   ├── bin
│   ├── certs
│   ├── cri
│   ├── etc
│   ├── images
│   ├── Kubefile
│   ├── manifests
│   ├── Metadata
│   ├── README.md
│   ├── registry
│   ├── scripts
│   └── statics
└── scheduler.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '11.md' style='float:left'>⬆️上一节🔗  </a><a href = '13.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


