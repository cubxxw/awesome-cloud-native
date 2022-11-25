<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第10节-scratch构建runtime-linux" tabindex="-1"><a class="header-anchor" href="#第10节-scratch构建runtime-linux" aria-hidden="true">#</a> 第10节 scratch构建runtime(linux)</h1>
<div><a href = '9.md' style='float:left'>⬆️上一节🔗  </a><a href = '11.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<h3 id="rootfs" tabindex="-1"><a class="header-anchor" href="#rootfs" aria-hidden="true">#</a> rootfs</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-O</span> rootfs.tar.xz https://ghproxy.com/https://github.com/debuerreotype/docker-debian-artifacts/raw/b024a792c752a5c6ccc422152ab0fd7197ae8860/jessie/rootfs.tar.xz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> nginx</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> <span class="token parameter variable">-O</span> nginx.conf https://ghproxy.com/https://github.diablo.corp/raw/slvi/docker-k8s-training/master/docker/res/nginx.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> dockerfile</h2>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> scratch</span>

<span class="token comment"># set the environment to honour SAP's proxy servers</span>
<span class="token instruction"><span class="token keyword">ENV</span> http_proxy http://sap:8080</span>
<span class="token instruction"><span class="token keyword">ENV</span> https_proxy http://sap:8080</span>
<span class="token instruction"><span class="token keyword">ENV</span> no_proxy .sap</span>

<span class="token comment"># add and unpack an archive that contains a Debian root filesystem</span>
<span class="token instruction"><span class="token keyword">ADD</span> rootfs.tar.xz /</span>

<span class="token comment"># use the apt-get package manager to install nginx and wget</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get update &amp;&amp; <span class="token operator">\</span>
apt-get -y install nginx wget</span>

<span class="token comment"># use wget to download a custom website into the image</span>
<span class="token instruction"><span class="token keyword">RUN</span> wget --no-check-certificate -O /usr/share/nginx/html/cheers.jpg https://ghproxy.com/https://github.diablo.corp/raw/slvi/docker-k8s-training/master/docker/res/cheers.jpg &amp;&amp; <span class="token operator">\</span>
wget --no-check-certificate -O /usr/share/nginx/html/index.html https://ghproxy.com/https://github.diablo.corp/raw/slvi/docker-k8s-training/master/docker/res/cheers.html</span>

<span class="token comment"># copy the custom nginx configuration into the image</span>
<span class="token instruction"><span class="token keyword">COPY</span> nginx.conf /etc/nginx/nginx.conf</span>

<span class="token comment"># link nginx log files to Docker log collection facility</span>
<span class="token instruction"><span class="token keyword">RUN</span> ln -sf /dev/stdout /var/log/nginx/access.log &amp;&amp; <span class="token operator">\</span>
ln -sf /dev/stderr /var/log/nginx/error.log</span>

<span class="token comment"># expose port 80 - the standard port for webservers</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span>

<span class="token comment"># and make sure that nginx runs when a container is created</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"nginx"</span>, <span class="token string">"-g"</span>, <span class="token string">"daemon off;"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构建" tabindex="-1"><a class="header-anchor" href="#构建" aria-hidden="true">#</a> 构建</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-t</span> mylinux:1.0 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="效果" tabindex="-1"><a class="header-anchor" href="#效果" aria-hidden="true">#</a> 效果</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/c/rootfs-linux<span class="token comment"># docker run -it a53ceeb37a0b /bin/bash</span>
root@74533e6a5638:/<span class="token comment"># ls</span>
bin   dev  home  lib64	mnt  proc  run	 srv  tmp  var
boot  etc  lib	 media	opt  root  sbin  sys  usr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>profile:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@74533e6a5638:/bin<span class="token comment"># cat /etc/profile</span>
<span class="token comment"># /etc/profile: system-wide .profile file for the Bourne shell (sh(1))</span>
<span class="token comment"># and Bourne compatible shells (bash(1), ksh(1), ash(1), ...).</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable"><span class="token variable">`</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">`</span></span>"</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"</span>
<span class="token keyword">else</span>
  <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">"/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games"</span>
<span class="token keyword">fi</span>
<span class="token builtin class-name">export</span> <span class="token environment constant">PATH</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token environment constant">$PS1</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token environment constant">$BASH</span>"</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token environment constant">$BASH</span>"</span> <span class="token operator">!=</span> <span class="token string">"/bin/sh"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token comment"># The file bash.bashrc already sets the default PS1.</span>
    <span class="token comment"># PS1='\h:\w\$ '</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> /etc/bash.bashrc <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">.</span> /etc/bash.bashrc
    <span class="token keyword">fi</span>
  <span class="token keyword">else</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable"><span class="token variable">`</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">`</span></span>"</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token assign-left variable"><span class="token environment constant">PS1</span></span><span class="token operator">=</span><span class="token string">'# '</span>
    <span class="token keyword">else</span>
      <span class="token assign-left variable"><span class="token environment constant">PS1</span></span><span class="token operator">=</span><span class="token string">'$ '</span>
    <span class="token keyword">fi</span>
  <span class="token keyword">fi</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /etc/profile.d <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token keyword">for</span> <span class="token for-or-select variable">i</span> <span class="token keyword">in</span> /etc/profile.d/*.sh<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> <span class="token variable">$i</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
      <span class="token builtin class-name">.</span> <span class="token variable">$i</span>
    <span class="token keyword">fi</span>
  <span class="token keyword">done</span>
  <span class="token builtin class-name">unset</span> i
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="dockerfile-ubuntu-构建方式" tabindex="-1"><a class="header-anchor" href="#dockerfile-ubuntu-构建方式" aria-hidden="true">#</a> dockerfile-ubuntu 构建方式</h2>
<ul>
<li><a href="https://github.com/dockerfile/ubuntu" target="_blank" rel="noopener noreferrer">GitHub仓库地址<ExternalLinkIcon/></a></li>
</ul>
<h3 id="readme" tabindex="-1"><a class="header-anchor" href="#readme" aria-hidden="true">#</a> README</h3>
<p>This repository contains <strong>Dockerfile</strong> of <a href="http://www.ubuntu.com/" target="_blank" rel="noopener noreferrer">Ubuntu<ExternalLinkIcon/></a> for <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker<ExternalLinkIcon/></a>'s <a href="https://registry.hub.docker.com/u/dockerfile/ubuntu/" target="_blank" rel="noopener noreferrer">automated build<ExternalLinkIcon/></a> published to the public <a href="https://registry.hub.docker.com/" target="_blank" rel="noopener noreferrer">Docker Hub Registry<ExternalLinkIcon/></a>.</p>
<h3 id="base-docker-image" tabindex="-1"><a class="header-anchor" href="#base-docker-image" aria-hidden="true">#</a> Base Docker Image</h3>
<ul>
<li><a href="https://registry.hub.docker.com/u/library/ubuntu/" target="_blank" rel="noopener noreferrer">ubuntu:14.04<ExternalLinkIcon/></a></li>
</ul>
<h3 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h3>
<ol>
<li>
<p>Install <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker<ExternalLinkIcon/></a>.</p>
</li>
<li>
<p>Download <a href="https://registry.hub.docker.com/u/dockerfile/ubuntu/" target="_blank" rel="noopener noreferrer">automated build<ExternalLinkIcon/></a> from public <a href="https://registry.hub.docker.com/" target="_blank" rel="noopener noreferrer">Docker Hub Registry<ExternalLinkIcon/></a>: <code v-pre>docker pull dockerfile/ubuntu</code></p>
<p>(alternatively, you can build an image from Dockerfile: <code v-pre>docker build -t=&quot;dockerfile/ubuntu&quot; github.com/dockerfile/ubuntu</code>)</p>
</li>
</ol>
<h3 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--rm</span> dockerfile/ubuntu 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="dockerfile-1" tabindex="-1"><a class="header-anchor" href="#dockerfile-1" aria-hidden="true">#</a> dockerfile</h3>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment">#</span>
<span class="token comment"># Ubuntu Dockerfile</span>
<span class="token comment">#</span>
<span class="token comment"># https://github.com/dockerfile/ubuntu</span>
<span class="token comment">#</span>

<span class="token comment"># Pull base image.</span>
<span class="token instruction"><span class="token keyword">FROM</span> ubuntu:14.04</span>

<span class="token comment"># Install.</span>
<span class="token instruction"><span class="token keyword">RUN</span> <span class="token operator">\</span>
  sed -i <span class="token string">'s/# \(.*multiverse$\)/\1/g'</span> /etc/apt/sources.list &amp;&amp; <span class="token operator">\</span>
  apt-get update &amp;&amp; <span class="token operator">\</span>
  apt-get -y upgrade &amp;&amp; <span class="token operator">\</span>
  apt-get install -y build-essential &amp;&amp; <span class="token operator">\</span>
  apt-get install -y software-properties-common &amp;&amp; <span class="token operator">\</span>
  apt-get install -y byobu curl git htop man unzip vim wget &amp;&amp; <span class="token operator">\</span>
  rm -rf /var/lib/apt/lists/*</span>

<span class="token comment"># Add files.</span>
<span class="token instruction"><span class="token keyword">ADD</span> root/.bashrc /root/.bashrc</span>
<span class="token instruction"><span class="token keyword">ADD</span> root/.gitconfig /root/.gitconfig</span>
<span class="token instruction"><span class="token keyword">ADD</span> root/.scripts /root/.scripts</span>

<span class="token comment"># Set environment variables.</span>
<span class="token instruction"><span class="token keyword">ENV</span> HOME /root</span>

<span class="token comment"># Define working directory.</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /root</span>

<span class="token comment"># Define default command.</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"bash"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="user" tabindex="-1"><a class="header-anchor" href="#user" aria-hidden="true">#</a> user</h2>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>官网的构建方式往往最值得参考和学习，构建的语法也是非常good</p>
</div>
<h3 id="pull" tabindex="-1"><a class="header-anchor" href="#pull" aria-hidden="true">#</a> pull</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://ghproxy.com/https://github.com/dockerfile/ubuntu.git<span class="token punctuation">;</span> <span class="token builtin class-name">cd</span> ubuntu
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> dockerfile/ubuntu:1.0 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
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


