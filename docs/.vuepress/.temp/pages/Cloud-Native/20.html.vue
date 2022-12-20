<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第20节-新会议改变basefs" tabindex="-1"><a class="header-anchor" href="#第20节-新会议改变basefs" aria-hidden="true">#</a> 第20节 新会议改变basefs</h1>
<div><a href = '19.md' style='float:left'>⬆️上一节🔗  </a><a href = '21.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<ul>
<li>add image spec definition <a href="https://github.com/sealerio/sealer/pull/1915" target="_blank" rel="noopener noreferrer">#1915<ExternalLinkIcon/></a></li>
<li>New design for basefs <a href="https://github.com/sealerio/sealer/pull/1909" target="_blank" rel="noopener noreferrer">#1909<ExternalLinkIcon/></a></li>
<li>sealer new doc <a href="https://github.com/sealerio/sealer.cool/issues/15" target="_blank" rel="noopener noreferrer">sealerio/sealer.cool#15<ExternalLinkIcon/></a></li>
<li>More detail about How to implement image policy for sealer using Kyverno <a href="https://github.com/sealerio/sealer/issues/1899" target="_blank" rel="noopener noreferrer">#1899<ExternalLinkIcon/></a></li>
<li>sealer CI e2e-test by using github action <a href="https://github.com/sealerio/sealer/issues/1633" target="_blank" rel="noopener noreferrer">#1633<ExternalLinkIcon/></a></li>
</ul>
<hr>
<p><strong>关于basefs 的设计：</strong></p>
<ul>
<li><a href="https://github.com/sealerio/basefs" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/basefs<ExternalLinkIcon/></a></li>
</ul>
<h2 id="关于rootfs的安排" tabindex="-1"><a class="header-anchor" href="#关于rootfs的安排" aria-hidden="true">#</a> 关于rootfs的安排</h2>
<ul>
<li><a href="https://github.com/sealerio/sealer/pull/1909" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/sealer/pull/1909<ExternalLinkIcon/></a></li>
</ul>
<h3 id="描述" tabindex="-1"><a class="header-anchor" href="#描述" aria-hidden="true">#</a> 描述</h3>
<p>签字人：huaiyou <a href="https://mail.google.com/mail/?view=cm&amp;fs=1&amp;tf=1&amp;to=huaiyou.cyz@alibaba-inc.com" target="_blank" rel="noopener noreferrer">huaiyou.cyz@alibaba-inc.com<ExternalLinkIcon/></a></p>
<p>为了方便基础镜像制作者的使用，我们需要对 sealer 的 rootfs 定义进行规范。</p>
<p><strong>我主要做了以下设计：</strong></p>
<ol>
<li>bin 等和 plugins 的用途基本相同，只是明确了使用方法。</li>
<li>阐明 Metadata、README.md 和 imageList 的用途。</li>
<li>新增 yamls 和 charts 两个目录，为用户提供更灵活扩展基础镜像的能力。</li>
<li>最后明确了scripts下不同脚本的用途。</li>
</ol>
<p>为了方便基础镜像制作者的使用，我们需要标准化 sealer 的 rootfs 的定义。</p>
<p>我主要做了以下设计：</p>
<ol>
<li><code v-pre>bin</code>，<code v-pre>etc</code>，<code v-pre>plugins</code> 这几个目录的使用基本不变，只是明确了使用方式。</li>
<li>明确定 <code v-pre>scripts</code> 下的不同脚本的用途。</li>
</ol>
<h3 id="设计规范" tabindex="-1"><a class="header-anchor" href="#设计规范" aria-hidden="true">#</a> 设计规范</h3>
<ul>
<li><a href="https://github.com/sealerio/sealer/blob/ec9d2b561eaa20ff59bea28303669b3da0d7c4dd/docs/api/cloudrootfs.md" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/sealer/blob/ec9d2b561eaa20ff59bea28303669b3da0d7c4dd/docs/api/cloudrootfs.md<ExternalLinkIcon/></a></li>
</ul>
<h2 id="cloud-rootfs" tabindex="-1"><a class="header-anchor" href="#cloud-rootfs" aria-hidden="true">#</a> cloud rootfs</h2>
<p>cloud rootfs will package all the dependencies refers to the kubernetes cluster requirements</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">.</span>
├── bin # binaries will be installed at all nodes' <span class="token operator">/</span>usr<span class="token operator">/</span>local<span class="token operator">/</span>bin
│   ├── conntrack
│   ├── containerd<span class="token operator">-</span>rootless<span class="token operator">-</span>setuptool<span class="token punctuation">.</span>sh
│   ├── containerd<span class="token operator">-</span>rootless<span class="token punctuation">.</span>sh
│   ├── crictl
│   ├── kubeadm
│   ├── kubectl
│   ├── kubelet
│   ├── nerdctl
│   ├── kubelet<span class="token operator">-</span>pre<span class="token operator">-</span>start<span class="token punctuation">.</span>sh
│   ├── helm
│   └── seautil
├── etc # configs will be put into all nodes' sealer<span class="token operator">-</span>rootfs
│   ├── <span class="token number">10</span><span class="token operator">-</span>kubeadm<span class="token punctuation">.</span>conf
│   ├── daemon<span class="token punctuation">.</span>json
│   ├── docker<span class="token punctuation">.</span>service
│   ├── audit<span class="token operator">-</span>policy<span class="token punctuation">.</span>yml
│   ├── kubeadm<span class="token operator">-</span>config<span class="token punctuation">.</span>yaml
│   ├── kubeadm<span class="token operator">-</span>config<span class="token punctuation">.</span>yaml<span class="token punctuation">.</span>tmpl # a<span class="token punctuation">.</span>b<span class="token punctuation">.</span>c<span class="token punctuation">.</span>tmpl will be rendered using envs and rename to a<span class="token punctuation">.</span>b<span class="token punctuation">.</span>c
│   └── kubelet<span class="token punctuation">.</span>service
├── plugins # plugins can run on some hooks<span class="token punctuation">,</span> such as pre<span class="token operator">-</span>init<span class="token operator">-</span>host<span class="token punctuation">,</span> post<span class="token operator">-</span>install<span class="token punctuation">,</span> see more in the plugins documentation
│   └── disk_init_shell_plugin<span class="token punctuation">.</span>yaml
├── scripts # scripts can use all ClusterFile's env as Linux env variables
│   ├── init<span class="token operator">-</span>kube<span class="token punctuation">.</span>sh # initialize kube<span class="token operator">*</span> binaries on target hosts
│   ├── clean<span class="token operator">-</span>kube<span class="token punctuation">.</span>sh # remove kube<span class="token operator">*</span> binaries from target hosts
│   ├── init<span class="token operator">-</span>container<span class="token operator">-</span>runtime<span class="token punctuation">.</span>sh # initialize container runtime binaries on target hosts
│   ├── clean<span class="token operator">-</span>container<span class="token operator">-</span>runtime<span class="token punctuation">.</span>sh # remove container runtime binaries on target hosts
│   └── init<span class="token operator">-</span>registry<span class="token punctuation">.</span>sh # initialize registry on local registry's deploy<span class="token operator">-</span>hosts
└── applications # applications put here
│   ├── redis
│   └── mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Using cloud rootfs to build a base cloudImage:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>FROM scratch
COPY <span class="token builtin class-name">.</span> <span class="token builtin class-name">.</span>
sealer build <span class="token parameter variable">-t</span> kuberntes:v1.18.3 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hooks" tabindex="-1"><a class="header-anchor" href="#hooks" aria-hidden="true">#</a> Hooks</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>FROM kubernetes:1.18.3
COPY preHook.sh /scripts/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>preHook.sh will execute after init.sh before kubeadm init master0</p>
<h2 id="registry" tabindex="-1"><a class="header-anchor" href="#registry" aria-hidden="true">#</a> Registry</h2>
<p>registry container name must be 'sealer-registry'</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '19.md' style='float:left'>⬆️上一节🔗  </a><a href = '21.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


