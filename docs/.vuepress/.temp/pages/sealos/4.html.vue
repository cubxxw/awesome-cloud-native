<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第4节-第二阶段-第二部分" tabindex="-1"><a class="header-anchor" href="#第4节-第二阶段-第二部分" aria-hidden="true">#</a> 第4节 第二阶段 第二部分</h1>
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
<li>k3s / helm / rootfs / docs / source codes /</li>
<li>fabric</li>
<li>spring boot  –  dockerfile</li>
</ul>
<h2 id="problem" tabindex="-1"><a class="header-anchor" href="#problem" aria-hidden="true">#</a> problem</h2>
<h3 id="_3293172751-commented-2-days-ago" tabindex="-1"><a class="header-anchor" href="#_3293172751-commented-2-days-ago" aria-hidden="true">#</a> <strong><a href="https://github.com/cubxxw" target="_blank" rel="noopener noreferrer">3293172751<ExternalLinkIcon/></a></strong> commented <a href="https://github.com/labring/sealos/issues/1943#issuecomment-1295060720" target="_blank" rel="noopener noreferrer">2 days ago<ExternalLinkIcon/></a></h3>
<p><a href="https://github.com/k3s-io/k3s" target="_blank" rel="noopener noreferrer">k3s - github<ExternalLinkIcon/></a>，I wonder if I need a tutorial on <a href="https://k3s.io/" target="_blank" rel="noopener noreferrer">k3s.io<ExternalLinkIcon/></a>，what should I pay attention to when I use it❓ Do I need to write the functions next to k8s to keep them <strong>together,</strong> or <strong>separate❓</strong> <a href="https://github.com/fanux" target="_blank" rel="noopener noreferrer">@fanux<ExternalLinkIcon/></a></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sealos run k0s:latest --masters xxx --nodes xxxx --passwd xxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="cuisongliu-commented-yesterday" tabindex="-1"><a class="header-anchor" href="#cuisongliu-commented-yesterday" aria-hidden="true">#</a> <strong><a href="https://github.com/cuisongliu" target="_blank" rel="noopener noreferrer">cuisongliu<ExternalLinkIcon/></a></strong> commented <a href="https://github.com/labring/sealos/issues/1943#issuecomment-1295680848" target="_blank" rel="noopener noreferrer">yesterday<ExternalLinkIcon/></a></h3>
<p><a href="https://github.com/k3s-io/k3s" target="_blank" rel="noopener noreferrer">k3s - github<ExternalLinkIcon/></a>，I wonder if I need a tutorial on <a href="https://k3s.io/" target="_blank" rel="noopener noreferrer">k3s.io<ExternalLinkIcon/></a>，what should I pay attention to when I use it❓ Do I need to write the functions next to k8s to keep them <strong>together,</strong> or <strong>separate❓</strong></p>
<ol>
<li>runtime interface need spilt kubeadm and k3s</li>
<li>k3s rootfs</li>
</ol>
<p><strong>design：</strong></p>
<p><code v-pre>init sealos</code>  –&gt; <code v-pre>Clusterfile</code> file</p>
<p>merged：rootfs</p>
<p><code v-pre>k3d</code> ：要使用 Docker，<code v-pre>rancher/k3s</code>还可以使用镜像来运行 K3s 服务器和代理。使用<code v-pre>docker run</code>命令：</p>
<blockquote>
<p>sealos run ranchar/k3s</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">docker</span> run <span class="token punctuation">\</span>
  <span class="token parameter variable">-d</span> <span class="token parameter variable">--tmpfs</span> /run <span class="token punctuation">\</span>
  <span class="token parameter variable">--tmpfs</span> /var/run <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span><span class="token variable">${SERVER_URL}</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">-e</span> <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span><span class="token variable">${NODE_TOKEN}</span> <span class="token punctuation">\</span>
  <span class="token parameter variable">--privileged</span> rancher/k3s:vX.Y.Z
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结构</strong>：</p>
<blockquote>
<p>How should rootfs build it?</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bin  cri  etc  images  Kubefile  opt  README.md  registry  scripts  statics
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>controllers：</strong></p>
<blockquote>
<p><code v-pre>controllers</code>   v：go1.18</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cluster <span class="token comment"># 专门管理aws上k8s生命周期</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>the  runtime module of k3s：</strong></p>
<ul>
<li>Init
<ul>
<li>当 sealer 导致先安装集群时，init 阶段将 rootfs/bin 复制到 init.sh 脚本中的 /usr/bin</li>
<li>创建引导配置 /etc/k0s/k0s.yaml 以引导控制器初始化</li>
<li>生成 k0s 加入令牌 /etc/k0s/worker-token 和 /etc/k0s/controller-token，也是私有注册表证书</li>
<li>初始化控制器节点</li>
<li>获取 ~/.kube/config 的配置以管理集群。</li>
</ul>
</li>
<li>Join：加入阶段准备注册表证书，并用于<code v-pre>k0s join</code>扩展集群。</li>
<li>Delete：删除与加入相同，但它回收加入阶段安装的任何内容。</li>
<li>Reset：移除该集群</li>
<li>Upgrade：upgrade可以升级k3s集群。</li>
</ul>
<p><strong>sealos在基本的命令操作上可以理解为代替docker？</strong></p>
<p><strong>使用sealos run docker.io/rancher/k3s?</strong></p>
<p><strong>build k3s images ?</strong></p>
<ol>
<li>helm</li>
<li>sealos run ? -&gt;  merged(rootfs)</li>
</ol>
<p><strong>A simple question：</strong></p>
<ol>
<li>离线环境也需要 sealos ？</li>
<li>项目测试环境~（断点、单元测试、测试用例)</li>
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
<p>网站 ：https://k8s.gcr.io/v2/ ？</p>
<p>**推送到镜像 registry **</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ sealos login docker.io
$ sealos push docker.io/fanux/ingress-nginx:v1.2.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>sealos</code> 生命周期：<code v-pre>pod</code></p>
<p><strong>sealos run == apply (pod / Deployment)</strong></p>
<h2 id="idea" tabindex="-1"><a class="header-anchor" href="#idea" aria-hidden="true">#</a> idea</h2>
<p>我们或许可以参考 https://hyperledger-fabric.readthedocs.io/ 的文档，以及它们的 <a href="https://wiki.hyperledger.org/display/fabric" target="_blank" rel="noopener noreferrer">社区<ExternalLinkIcon/></a></p>
<ul>
<li>对不同版本有着明确的划分，新的功能</li>
</ul>
<p><img src="http://sm.cubxxw.com/smimage-20221103181641807.png" alt="image-20221103181641807"></p>
<p>我们或许可以取消 文档贡献（Docs）关于 <code v-pre>-m</code> 邮箱的限定</p>
<p>新人 –&gt; 内部的技术文档，开发者会议~</p>
<h2 id="else" tabindex="-1"><a class="header-anchor" href="#else" aria-hidden="true">#</a> else</h2>
<h2 id="my-questions-suggestions" tabindex="-1"><a class="header-anchor" href="#my-questions-suggestions" aria-hidden="true">#</a> My questions, suggestions？</h2>
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
