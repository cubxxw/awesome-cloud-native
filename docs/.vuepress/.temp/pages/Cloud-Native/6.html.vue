<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第6节-k3s-runtime-design" tabindex="-1"><a class="header-anchor" href="#第6节-k3s-runtime-design" aria-hidden="true">#</a> 第6节 k3s Runtime Design</h1>
<br>
<div><a href = '5.md' style='float:left'>⬆️上一节🔗  </a><a href = '7.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="idea" tabindex="-1"><a class="header-anchor" href="#idea" aria-hidden="true">#</a> Idea</h2>
<blockquote>
<p>The community has great expectations for k3s.  we need a more lightweight runtime (<a href="https://github.com/sealerio/sealer/issues?q=is%3Aissue+is%3Aopen+k3s" target="_blank" rel="noopener noreferrer">#issue<ExternalLinkIcon/></a>)</p>
</blockquote>
<ul>
<li>With high availability, reduce installation cost</li>
<li>high availability etcd</li>
<li>runtime interface need spilt kubeadm and k3s and k0s，Interface layer exposure, alignment</li>
<li><code v-pre>new_runtime.go</code> determines which <code v-pre>runtime.go</code> to call based on the parameters passed in</li>
<li>k3s rootfs</li>
<li>Add a corresponding test function</li>
<li>Minimum resource test <a href="https://docker.cubxxw.com/Cloud-Native/7.html" target="_blank" rel="noopener noreferrer">k3s vs k0s<ExternalLinkIcon/></a></li>
</ul>
<h2 id="module-list" tabindex="-1"><a class="header-anchor" href="#module-list" aria-hidden="true">#</a> module list</h2>
<div class="language-ABAP ext-ABAP line-numbers-mode"><pre v-pre class="language-ABAP"><code>#runtime
|____interface.go
|____types.go
|____utils.go
|____utils_test.go
|____new_runtime.go # new_runtime determines which runtime.go to call based on the parameters passed in
|____k0s
| |____common.go
| |____delete_masters.go
| |____delete_nodes.go
| |____init.go
| |____join_masters.go
| |____join_nodes.go
| |____README.md
| |____registry.go
| |____reset.go
| |____runtime.go
| |____upgrade.go
| |____utils.go
| |____v1beta1
| | |____types.go
|____kubernetes
| |____clean.go
| |____driver.go
| |____init.go
| |____join_masters.go
| |____join_nodes.go
| |____kubeadm
| | |____common.go
| | |____kubeadm_config.go
| | |____kubeadm_config_test.go
| |____runtime.go
| |____utils.go

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="interface-☕in-preparation" tabindex="-1"><a class="header-anchor" href="#interface-☕in-preparation" aria-hidden="true">#</a> interface(☕in preparation…)</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Interface <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token comment">// Init exec kubeadm init</span>
	<span class="token function">Init</span><span class="token punctuation">(</span>cluster <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster<span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">Upgrade</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">JoinMasters</span><span class="token punctuation">(</span>newMastersIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">JoinNodes</span><span class="token punctuation">(</span>newNodesIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">DeleteMasters</span><span class="token punctuation">(</span>mastersIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">DeleteNodes</span><span class="token punctuation">(</span>nodesIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token comment">//UpdateCert(certs []string) error</span>
    <span class="token function">NewK0sRuntime</span><span class="token punctuation">(</span>cluster <span class="token operator">*</span>v2<span class="token punctuation">.</span>Cluster<span class="token punctuation">)</span><span class="token punctuation">(</span>runtime<span class="token punctuation">.</span>Installer<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em><strong>demo:</strong> <a href="https://github.com/cubxxw/sealer-runtime-demo" target="_blank" rel="noopener noreferrer">🧷 Runtime interface demonstration<ExternalLinkIcon/></a></em></p>
<h2 id="achieve-interface" tabindex="-1"><a class="header-anchor" href="#achieve-interface" aria-hidden="true">#</a> achieve interface</h2>
<ol>
<li>Support k3s to init、join、upgrade、reset k3s cluster</li>
<li>Support docker as runtime</li>
<li>Pakage the CloudImage</li>
</ol>
<h2 id="cloudrootfs" tabindex="-1"><a class="header-anchor" href="#cloudrootfs" aria-hidden="true">#</a> CloudRootfs</h2>
<p><em>kubernetes:</em></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>/var/lib/sealer/data/overlay2/ebd0f721b47d5f7f3ea287fe0882613960deef376e5556b34baab95330aa6bad
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em>Kuberfile - k8s:</em></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>FROM scratch
COPY <span class="token builtin class-name">.</span> <span class="token builtin class-name">.</span>
COPY imageList manifests
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>Kuberfile - k0s:</em></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>COPY rootfs/* <span class="token builtin class-name">.</span>
COPY <span class="token variable">${ARCH}</span> <span class="token builtin class-name">.</span>
COPY ImageList manifests
BASE rootfs cache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>Kuberfile - k3s:</em></p>
<blockquote>
<p>My talking about packaging up a minimal Linux distribution to run K3s, similar to https://github.com/rancher/k3os? Or mean just the root filesystem, such as we provide with k3s via https://github.com/k3s-io/k3s-root ?⚠️</p>
</blockquote>
<ol>
<li><a href="https://docker.cubxxw.com/Cloud-Native-k8s/14.html#%E5%9C%A8%E7%BA%BF%E5%AE%89%E8%A3%85%E7%9A%84%E8%A7%A3%E6%9E%90" target="_blank" rel="noopener noreferrer">Online<ExternalLinkIcon/></a> Installation</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>FROM scratch
COPY imageList manifests
RUN <span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_VERSION</span><span class="token operator">=</span>v1.25.3 <span class="token function">sh</span> -
COPY <span class="token builtin class-name">.</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li><a href="https://docker.cubxxw.com/Cloud-Native-k8s/14.html#%E7%A6%BB%E7%BA%BF%E5%AE%89%E8%A3%85%E8%A7%A3%E9%87%8A" target="_blank" rel="noopener noreferrer">Offline<ExternalLinkIcon/></a> installation</li>
</ol>
<blockquote>
<p><code v-pre>k3s-insatll.sh</code> 、<code v-pre>k3s-airgap-images-$ARCH.tar</code>、<code v-pre>k3s</code>binary system</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>FROM scratch
COPY imageList manifests
COPY . .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="k3s-rootfs" tabindex="-1"><a class="header-anchor" href="#k3s-rootfs" aria-hidden="true">#</a> k3s - rootfs</h3>
<blockquote>
<p><code v-pre>sh install.sh</code> There are a number of link types from bin</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">.</span><span class="token comment"># k3s rootfs</span>
├── bin
│  ├── k3s
├── etc
│  ├── k3s
│  │   └── k3s.yaml
│  └── <span class="token function">node</span>
│      └── password
├── images
├── k3s-install.sh
├── Kuberfile
├── Metadata
└── README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="about-the-k3s-difference" tabindex="-1"><a class="header-anchor" href="#about-the-k3s-difference" aria-hidden="true">#</a> About the k3s difference</h2>
<ul>
<li>Comparison of <a href="https://docker.cubxxw.com/Cloud-Native/7.html" target="_blank" rel="noopener noreferrer">k3s vs k0s<ExternalLinkIcon/></a></li>
<li>Comparison of <a href="https://docker.cubxxw.com/Cloud-Native-k8s/14.html#containerd" target="_blank" rel="noopener noreferrer">containerd vs docker<ExternalLinkIcon/></a></li>
</ul>
<p>**The installation script is k3s-insatll.sh. **</p>
<p><strong>cluster role:</strong></p>
<ul>
<li>k3s server</li>
<li>k3s agents(worker nodes)</li>
</ul>
<p><strong>uninstalling a node:</strong></p>
<p><strong>k3s : <code v-pre>k3s-uninstall.sh</code></strong></p>
<ul>
<li>k3s server : <code v-pre>/usr/local/bin/k3s-uninstall.sh</code></li>
<li>k3s agent : <code v-pre>/usr/local/bin/k3s-agent-uninstall.sh</code></li>
</ul>
<h2 id="version" tabindex="-1"><a class="header-anchor" href="#version" aria-hidden="true">#</a> version</h2>
<h2 id="embedded-component-versions" tabindex="-1"><a class="header-anchor" href="#embedded-component-versions" aria-hidden="true">#</a> Embedded Component Versions</h2>
<table>
<thead>
<tr>
<th>Component</th>
<th>Version</th>
</tr>
</thead>
<tbody>
<tr>
<td>Kubernetes</td>
<td><a href="https://github.com/kubernetes/kubernetes/blob/master/CHANGELOG/CHANGELOG-1.25.md#v1253" target="_blank" rel="noopener noreferrer">v1.25.3<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Kine</td>
<td><a href="https://github.com/k3s-io/kine/releases/tag/v0.9.3" target="_blank" rel="noopener noreferrer">v0.9.3<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>SQLite</td>
<td><a href="https://sqlite.org/releaselog/3_36_0.html" target="_blank" rel="noopener noreferrer">3.36.0<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Etcd</td>
<td><a href="https://github.com/k3s-io/etcd/releases/tag/v3.5.3-k3s1" target="_blank" rel="noopener noreferrer">v3.5.3-k3s1<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Containerd</td>
<td><a href="https://github.com/k3s-io/containerd/releases/tag/v1.6.8-k3s1" target="_blank" rel="noopener noreferrer">v1.6.8-k3s1<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Runc</td>
<td><a href="https://github.com/opencontainers/runc/releases/tag/v1.1.4" target="_blank" rel="noopener noreferrer">v1.1.4<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Flannel</td>
<td><a href="https://github.com/flannel-io/flannel/releases/tag/v0.19.2" target="_blank" rel="noopener noreferrer">v0.19.2<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Metrics-server</td>
<td><a href="https://github.com/kubernetes-sigs/metrics-server/releases/tag/v0.6.1" target="_blank" rel="noopener noreferrer">v0.6.1<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Traefik</td>
<td><a href="https://github.com/traefik/traefik/releases/tag/v2.9.1" target="_blank" rel="noopener noreferrer">v2.9.1<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>CoreDNS</td>
<td><a href="https://github.com/coredns/coredns/releases/tag/v1.9.1" target="_blank" rel="noopener noreferrer">v1.9.1<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Helm-controller</td>
<td><a href="https://github.com/k3s-io/helm-controller/releases/tag/v0.12.3" target="_blank" rel="noopener noreferrer">v0.12.3<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>Local-path-provisioner</td>
<td><a href="https://github.com/rancher/local-path-provisioner/releases/tag/v0.0.21" target="_blank" rel="noopener noreferrer">v0.0.21<ExternalLinkIcon/></a></td>
</tr>
</tbody>
</table>
<h2 id="newest" tabindex="-1"><a class="header-anchor" href="#newest" aria-hidden="true">#</a> newest</h2>
<ul>
<li><a href="https://github.com/sealerio/sealer/issues/1978" target="_blank" rel="noopener noreferrer">issue 1978<ExternalLinkIcon/></a></li>
</ul>
<h3 id="issue-description" tabindex="-1"><a class="header-anchor" href="#issue-description" aria-hidden="true">#</a> Issue Description</h3>
<p>Support k3s cluster installation.
Type: <em>feature request</em></p>
<h3 id="describe-what-feature-you-want" tabindex="-1"><a class="header-anchor" href="#describe-what-feature-you-want" aria-hidden="true">#</a> Describe what feature you want</h3>
<h4 id="step" tabindex="-1"><a class="header-anchor" href="#step" aria-hidden="true">#</a> step</h4>
<ol>
<li>Deploy the private mirror registry (ref: https://docs.rancher.cn/docs/k3s/installation/airgap/_index)
a. Distribute the k3s configuration to connect to private registry. (ref: https://docs.rancher.cn/docs/k3s/installation/private-registry/_index)</li>
<li>Get k3s binary and move to /usr/local/bin or /usr/bin.</li>
<li>Get k3s-install script from https://get.k3s.io/ (this would be contained by rootfs).</li>
<li>Install k3s offline on master0 as a server (not HA cluster).</li>
<li>Joining k3s agent and sever use k3s-install script.</li>
<li>Using scripts to delete node (ref: https://docs.rancher.cn/docs/k3s/installation/uninstall/_index). To force delete need to exec k3s-killall.sh. (ref: https://docs.rancher.cn/docs/k3s/upgrades/killall/_index)</li>
<li>Upgrades need to follow basic upgrade, upgrade from sever node one by one! (ref: https://docs.rancher.cn/docs/k3s/upgrades/basic/_index)</li>
</ol>
<h4 id="rootfs" tabindex="-1"><a class="header-anchor" href="#rootfs" aria-hidden="true">#</a> rootfs</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── bin
│   ├── conntrack
│   ├── containerd-rootless-setuptool.sh
│   ├── containerd-rootless.sh
│   ├── crictl
│   ├── k3s
│   ├── kubectl
│   ├── nerdctl
│   └── seautil
├── cri
│   └── docker.tar.gz
├── custom-resources.yaml
├── etc
│   ├── registries.yaml
│   ├── daemon.json
│   ├── docker.service
│   ├── k3s.yaml
│   └── registry_config.yml
├── images
│   └── docker-amd64-registry-image.tar.gz
├── Kubefile
├── lib
│   ├── gperf-3.1.tar.gz
│   ├── install_libseccomp.sh
│   └── libseccomp-2.5.4.tar.gz
├── manifests
│   └── imageList
└── scripts
    ├── docker.sh
    ├── k3s-install.sh
    ├── init-registry.sh
    └── uninstall-docker.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="additional-context" tabindex="-1"><a class="header-anchor" href="#additional-context" aria-hidden="true">#</a> Additional context</h3>
<p>Add any other context or screenshots about the feature request here.</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '5.md' style='float:left'>⬆️上一节🔗  </a><a href = '7.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


