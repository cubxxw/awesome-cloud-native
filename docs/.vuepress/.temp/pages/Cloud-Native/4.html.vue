<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第4节-第一份设计稿" tabindex="-1"><a class="header-anchor" href="#第4节-第一份设计稿" aria-hidden="true">#</a> 第4节 第一份设计稿</h1>
<br>
<div><a href = '3.md' style='float:left'>⬆️上一节🔗  </a><a href = '5.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="before" tabindex="-1"><a class="header-anchor" href="#before" aria-hidden="true">#</a> Before</h2>
<ul>
<li>go test</li>
<li>k3s / helm / K3s rootfs / docs / source codes /</li>
<li>fabric</li>
<li>spring boot  –  dockerfile</li>
</ul>
<h2 id="problem" tabindex="-1"><a class="header-anchor" href="#problem" aria-hidden="true">#</a> problem</h2>
<h3 id="cubxxw-commented-2-days-ago" tabindex="-1"><a class="header-anchor" href="#cubxxw-commented-2-days-ago" aria-hidden="true">#</a> cubxxw commented 2 days ago</h3>
<p><a href="https://github.com/k3s-io/k3s" target="_blank" rel="noopener noreferrer">k3s - github<ExternalLinkIcon/></a>，I wonder if I need a tutorial on <a href="https://k3s.io/" target="_blank" rel="noopener noreferrer">k3s.io<ExternalLinkIcon/></a>，what should I pay attention to when I use it❓ Do I need to write the functions next to k8s to keep them <strong>together,</strong> or <strong>separate❓</strong> <a href="https://github.com/fanux" target="_blank" rel="noopener noreferrer">@fanux<ExternalLinkIcon/></a></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sealos run k0s:latest --masters xxx --nodes xxxx --passwd xxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="cuisongliu-commented-yesterday" tabindex="-1"><a class="header-anchor" href="#cuisongliu-commented-yesterday" aria-hidden="true">#</a> cuisongliu commented yesterday</h3>
<p><a href="https://github.com/k3s-io/k3s" target="_blank" rel="noopener noreferrer">k3s - github<ExternalLinkIcon/></a>，I wonder if I need a tutorial on <a href="https://k3s.io/" target="_blank" rel="noopener noreferrer">k3s.io<ExternalLinkIcon/></a>，what should I pay attention to when I use it❓ Do I need to write the functions next to k8s to keep them <strong>together,</strong> or <strong>separate❓</strong></p>
<ol>
<li>runtime interface need spilt kubeadm and k3s</li>
<li>k3s rootfs</li>
</ol>
<p><strong>controllers：</strong></p>
<blockquote>
<p><code v-pre>controllers</code>   v：go1.18</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cluster <span class="token comment"># 专门管理aws上k8s生命周期</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>ClusterSpec defines the desired state of InfraMetadata</p>
<h3 id="rootfs-runtime-design" tabindex="-1"><a class="header-anchor" href="#rootfs-runtime-design" aria-hidden="true">#</a> rootfs runtime design</h3>
<details class="custom-container details"><summary>k3s rootfs</summary>
<p>goolang 编译时会打包所有的依赖，每个独立的 binary 都会有独立的运行时支持</p>
<p>k3s把所有的依赖都编译在一个 <code v-pre>binary</code> 中，所有的程序 一份运行时</p>
<p>借鉴 rootfs (linux) 基于 <a href="https://github.com/buildroot/buildroot" target="_blank" rel="noopener noreferrer">buildroot<ExternalLinkIcon/></a> 构建的 busybox rootfs</p>
<p>参考 <a href="https://github.com/k3s-io/k3s-root" target="_blank" rel="noopener noreferrer">rancher/k3s-root<ExternalLinkIcon/></a> 所有的k3s 构建的 binary 都放在此处</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>/var/lib/rancher/k3s/data/..../bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<p>make Runtime module more readable</p>
<ol>
<li>k0s runtime</li>
<li>k3s runtime</li>
<li>k8s runtime</li>
</ol>
<p><strong>about：</strong></p>
<ol>
<li><code v-pre>util_test.go</code>  file</li>
<li>implement runtime interface</li>
<li>k3s runtime</li>
</ol>
<p><strong>implement runtime interface：</strong></p>
<ul>
<li>
<p><a href="https://www.sealos.io/zh-Hans/docs/cli/apply" target="_blank" rel="noopener noreferrer">https://www.sealos.io/zh-Hans/docs/cli/apply<ExternalLinkIcon/></a></p>
</li>
<li>
<p>Interface <code v-pre>interface{}</code></p>
</li>
</ul>
<p><strong>runtime module list：</strong></p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> runtime</span>
<span class="token list punctuation">+</span> kubernets
	<span class="token list punctuation">-</span> kubeconfig.go  # 
	<span class="token list punctuation">-</span> master.go
	<span class="token list punctuation">-</span> node.go
	<span class="token list punctuation">-</span> registry.go
	<span class="token list punctuation">-</span> reset.go
	<span class="token list punctuation">-</span> runtime_getter.go
	<span class="token list punctuation">-</span> runtime.go
	<span class="token list punctuation">-</span> static_files.go
	<span class="token list punctuation">-</span> token.go
	<span class="token list punctuation">-</span> update_cert.go
	<span class="token list punctuation">-</span> utils.go
<span class="token list punctuation">+</span> k3s
	<span class="token list punctuation">-</span> add.go
	<span class="token list punctuation">-</span> delete.go
	<span class="token list punctuation">-</span> reset.go 
	<span class="token list punctuation">-</span> update.go
	<span class="token list punctuation">-</span> token.go
<span class="token list punctuation">+</span> k0s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>k3s rootfs design：</strong></p>
<p><code v-pre>init sealos</code>  –&gt; <code v-pre>Clusterfile</code> file</p>
<p>merged：rootfs</p>
<p><em>root directory: <code v-pre>/</code></em></p>
<div class="custom-container tip"><p class="custom-container-title">❓</p>
<ul>
<li>
<p>rootfs make build</p>
</li>
<li>
<p>rootfs interface</p>
</li>
</ul>
<p><strong>construction</strong></p>
<blockquote>
<p>How should rootfs build it?</p>
</blockquote>
<div class="language-test ext-test line-numbers-mode"><pre v-pre class="language-test"><code>bin  cri  etc  images  Kubefile  opt  README.md  registry  scripts  statics
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>+ /bin
+ /etc
+ /images
+ /scripts
+ /tmp
+ /lib
+ /run
+ /var
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>为什么有些 <code v-pre>merged</code> 是空的</p>
</blockquote>
<p><del><code v-pre>k3d</code> ：要使用 Docker，<code v-pre>rancher/k3s</code>还可以使用镜像来运行 K3s 服务器和代理。使用<code v-pre>docker run</code>命令：</del></p>
<blockquote>
<p>sealos run ranchar/k3s</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">docker</span> run <span class="token punctuation">\</span>
  <span class="token parameter variable">-d</span> <span class="token parameter variable">--tmpfs</span> /run <span class="token punctuation">\</span>
  <span class="token parameter variable">--tmpfs</span> /var/run <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span><span class="token variable">${SERVER_URL}</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span><span class="token variable">${NODE_TOKEN}</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">--privileged</span> rancher/k3s:vX.Y.Z
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>the  runtime module of k3s：</strong></p>
<blockquote>
<p>结构体方法：</p>
<ul>
<li>init方法</li>
<li>SyncNodeIPVS 方法</li>
</ul>
</blockquote>
<ul>
<li>Init   ⚠️</li>
<li>SyncNodeIPVS  ⚠️</li>
</ul>
<p><strong>sealos在基本的命令操作上可以理解为代替docker？</strong></p>
<p><strong>使用sealos run docker.io/rancher/k3s?</strong></p>
<p><strong>build k3s images ?</strong></p>
<blockquote>
<p>kubernetes 的构建方式</p>
</blockquote>
<ol>
<li><a href="https://artifacthub.io/packages/search?ts_query_web=k3s&amp;sort=relevance&amp;page=1" target="_blank" rel="noopener noreferrer">helm<ExternalLinkIcon/></a></li>
<li>sealos run ? -&gt;  merged(rootfs)</li>
</ol>
<p><strong>A simple question：</strong></p>
<ol>
<li>
<p>离线环境也需要 sealos ？</p>
</li>
<li>
<p>项目测试环境~（断点、单元测试、测试用例)</p>
<blockquote>
<p>windows11</p>
<p>centos / ubuntu(内存不够)</p>
<p>vscode</p>
</blockquote>
</li>
</ol>
<p><strong>I need solutions：</strong></p>
<p>repeat images（auto cleaning)？</p>
<p><img src="http://sm.cubxxw.com/smimage-20221103200214386.png" alt="image-20221103200214386"></p>
<p><strong>添加镜像列表：</strong></p>
<blockquote>
<p>sealos 会下载镜像列表中的镜像并缓存到 registry 目录。</p>
<p>目录必须形如 <code v-pre>images/shim/[your image list filename]</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">cat</span> images/shim/nginxImages
k8s.gcr.io/ingress-nginx/controller:v1.2.0
k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.1.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sealos 在构建的时候会自动添加镜像列表中的镜像依赖到集群镜像中，通过神奇的方式保存了里面依赖的 Docker 镜像。 并且在到别的环境中运行的时候更神奇的自动检测集群中想是否的 Docker 镜像，有的话自动下载，没有的话才会去 k8s.gcr.io 下载。 用户无需修改 helm chart 中的 docker 镜像地址，这里用到了镜像缓存代理的黑科技。</p>
</blockquote>
<p>web ：https://k8s.gcr.io/v2/ ？</p>
<p>**pull images registry❓ **</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ sealos login docker.io
$ sealos push docker.io/fanux/ingress-nginx:v1.2.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>sealos life cycle</code> ：pod</p>
<p><strong>sealos run == apply (pod / Deployment)</strong></p>
<blockquote>
<p>except  <code v-pre>/var/lib/</code>，anything else？</p>
</blockquote>
<h2 id="my-questions-suggestions" tabindex="-1"><a class="header-anchor" href="#my-questions-suggestions" aria-hidden="true">#</a> My questions, suggestions？</h2>
<p>sealos &amp;&amp; docker  ： Invest time in <code v-pre>docker</code> source code （kubernetes； k3s ….)</p>
<p>linux operating system source code</p>
<h2 id="else" tabindex="-1"><a class="header-anchor" href="#else" aria-hidden="true">#</a> else</h2>
<ul>
<li>Advice to developers (me)</li>
</ul>
<p>…</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '3.md' style='float:left'>⬆️上一节🔗  </a><a href = '5.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


