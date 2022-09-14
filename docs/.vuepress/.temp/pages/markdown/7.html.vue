<template><div><h1 id="镜像配置" tabindex="-1"><a class="header-anchor" href="#镜像配置" aria-hidden="true">#</a> 镜像配置</h1>
<p>[toc]</p>
<ul>
<li>[x] <strong><a href="https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors" target="_blank" rel="noopener noreferrer">阿里云配置镜像加速器<ExternalLinkIcon/></a></strong></li>
</ul>
<p><img src="https://s2.loli.net/2022/05/08/O9JBrubVkPWCqnH.png" alt="image-20220508205850357"></p>
<p><strong>每一个开发者都有一个唯一的加速器地址</strong></p>
<h2 id="安装-升级docker客户端" tabindex="-1"><a class="header-anchor" href="#安装-升级docker客户端" aria-hidden="true">#</a> 安装／升级Docker客户端</h2>
<p>推荐安装1.10.0以上版本的Docker客户端，参考文档<a href="https://yq.aliyun.com/articles/110806" target="_blank" rel="noopener noreferrer">docker-ce<ExternalLinkIcon/></a></p>
<h2 id="配置镜像加速器" tabindex="-1"><a class="header-anchor" href="#配置镜像加速器" aria-hidden="true">#</a> 配置镜像加速器</h2>
<p>针对Docker客户端版本大于 1.10.0 的用户</p>
<p>您可以通过修改daemon配置文件/etc/docker/daemon.json来使用加速器</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json &lt;&lt;-'EOF'
<span class="token punctuation">{</span>
  <span class="token property">"registry-mirrors"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"https://ks0realz.mirror.aliyuncs.com"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>重新启动docker</strong></p>
<blockquote>
<p>验证</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run hello-word
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>如果本地没有hello-word这个镜像，就会下载一个hello-word镜像，并且在本地容器内运行</strong></p>
<p><strong>而且输出提示信息后，hello-word就会停止运行，容器自动终止</strong></p>
<h4 id="run做了些什么" tabindex="-1"><a class="header-anchor" href="#run做了些什么" aria-hidden="true">#</a> run做了些什么</h4>
<ol>
<li>开始docker先在本机中寻找镜像以该镜像为模板生产容器实例运行</li>
<li>如果没有的话就去docker hub上查找镜像，找到就下载到本地<strong>并且以该镜像为模板生产容器实例运行</strong></li>
<li>如果没有找到就报错，返回错误</li>
</ol>
<h4 id="为什么docker比虚拟机快" tabindex="-1"><a class="header-anchor" href="#为什么docker比虚拟机快" aria-hidden="true">#</a> 为什么docker比虚拟机快</h4>
<p>因为docker不需要像hypervisor（虚拟机）实现硬件实例化，运行在docker容器上的程序直接使用的都是实例物理机的硬件资源，因此在CPU、内存利用率上docker更有效率</p>
<h3 id="hello-word案例" tabindex="-1"><a class="header-anchor" href="#hello-word案例" aria-hidden="true">#</a> hello-word案例</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/hyerledgerFabric<span class="token comment"># docker run hello-world</span>
Unable to <span class="token function">find</span> image <span class="token string">'hello-world:latest'</span> locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete 
Digest: sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f
Status: Downloaded newer image <span class="token keyword">for</span> hello-world:latest

Hello from Docker<span class="token operator">!</span>
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 <span class="token number">1</span>. The Docker client contacted the Docker daemon.
 <span class="token number">2</span>. The Docker daemon pulled the <span class="token string">"hello-world"</span> image from the Docker Hub.
    <span class="token punctuation">(</span>amd64<span class="token punctuation">)</span>
 <span class="token number">3</span>. The Docker daemon created a new container from that image <span class="token function">which</span> runs the
    executable that produces the output you are currently reading.
 <span class="token number">4</span>. The Docker daemon streamed that output to the Docker client, <span class="token function">which</span> sent it
    to your terminal.

To try something <span class="token function">more</span> ambitious, you can run an Ubuntu container with:
 $ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> ubuntu <span class="token function">bash</span>

Share images, automate workflows, and <span class="token function">more</span> with a <span class="token function">free</span> Docker ID:
 https://hub.docker.com/

For <span class="token function">more</span> examples and ideas, visit:
 https://docs.docker.com/get-started/

root@ubuntu:/hyerledgerFabric<span class="token comment"># docker run hello-world</span>

Hello from Docker<span class="token operator">!</span>
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 <span class="token number">1</span>. The Docker client contacted the Docker daemon.
 <span class="token number">2</span>. The Docker daemon pulled the <span class="token string">"hello-world"</span> image from the Docker Hub.
    <span class="token punctuation">(</span>amd64<span class="token punctuation">)</span>
 <span class="token number">3</span>. The Docker daemon created a new container from that image <span class="token function">which</span> runs the
    executable that produces the output you are currently reading.
 <span class="token number">4</span>. The Docker daemon streamed that output to the Docker client, <span class="token function">which</span> sent it
    to your terminal.

To try something <span class="token function">more</span> ambitious, you can run an Ubuntu container with:
 $ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> ubuntu <span class="token function">bash</span>

Share images, automate workflows, and <span class="token function">more</span> with a <span class="token function">free</span> Docker ID:
 https://hub.docker.com/

For <span class="token function">more</span> examples and ideas, visit:
 https://docs.docker.com/get-started/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


