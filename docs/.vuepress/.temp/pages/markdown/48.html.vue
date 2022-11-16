<template><div><h1 id="构建镜像" tabindex="-1"><a class="header-anchor" href="#构建镜像" aria-hidden="true">#</a> 构建镜像</h1>
<p>[toc]</p>
<h2 id="镜像" tabindex="-1"><a class="header-anchor" href="#镜像" aria-hidden="true">#</a> 镜像</h2>
<p>是打包好的软件，由程序代码、基础系统、<a href="https://so.csdn.net/so/search?q=%E4%BE%9D%E8%B5%96%E5%85%B3%E7%B3%BB&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">依赖关系<ExternalLinkIcon/></a>的软件包、系统库和工具组成 。</p>
<ul>
<li>Dockerfile：是制作镜像的文件</li>
</ul>
<h2 id="base-镜像" tabindex="-1"><a class="header-anchor" href="#base-镜像" aria-hidden="true">#</a> base 镜像</h2>
<p><strong>base 镜像有两层含义：</strong></p>
<p>不依赖其他镜像，从 <code v-pre>scratch</code> 构建。</p>
<ul>
<li><code v-pre>scratch</code>：是最基础的docker镜像，相当于一个地基。</li>
</ul>
<p>其他镜像可以在此基础上进行扩展。</p>
<p><strong>用别的镜像做基础镜像   ➡️  站在巨人的肩膀</strong></p>
<h2 id="rootfs和bootfs" tabindex="-1"><a class="header-anchor" href="#rootfs和bootfs" aria-hidden="true">#</a> rootfs和bootfs</h2>
<p><strong>bootfs和rootfs里面就是一些程序和文件</strong></p>
<p>bootfs：容器启动的时候需要的内容，是 <code v-pre>linux kernel</code> 提供了<code v-pre>bootfs</code></p>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>内核空间是 kernel，Linux 刚启动时会加载 bootfs 文件系统，之后 bootfs 会被卸载掉。用户空间的文件系统是 rootfs，包含我们熟悉的 /dev, /proc, /bin 等目录。对于 base 镜像来说，底层直接用 Host 的 kernel，自己只需要提供 rootfs 就行了。而对于一个精简的 OS，rootfs 可以很小，只需要包括最基本的命令、工具和程序库就可以了。相比其他 Linux 发行版，CentOS 的 rootfs 已经算臃肿的了，alpine 还不到 10MB。我们平时安装的 CentOS 除了 rootfs 还会选装很多软件、服务、图形桌面等，需要好几个 GB 就不足为奇了。</p>
<p>即我们的容器全部用宿主机的内核kernel，而容器提供的只是不同的系统文件。bootfs，容器启动的时候需要的内容；rootfs，容器内部的操作系统</p>
</div>
<h2 id="base-镜像提供的是最小安装的-linux-发行版" tabindex="-1"><a class="header-anchor" href="#base-镜像提供的是最小安装的-linux-发行版" aria-hidden="true">#</a> base 镜像提供的是最小安装的 Linux 发行版</h2>
<p>下面是 CentOS 镜像的 Dockerfile 的内容：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>FROM scratch
ADD centos-7-docker.tar.xz /
CMD <span class="token punctuation">[</span><span class="token string">"bin/bash"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="镜像分层" tabindex="-1"><a class="header-anchor" href="#镜像分层" aria-hidden="true">#</a> 镜像分层</h2>
<p>Docker 支持通过扩展现有镜像，创建新的镜像。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull debian  <span class="token comment"># 下载一个debian的镜像</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编写 dockerfile：</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code>FORM debian
<span class="token instruction"><span class="token keyword">RUN</span> apt-get install emacs</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get install apache2</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"bin/bash"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>① 新镜像不再是从 scratch 开始，而是直接在 Debian base 镜像上构建。
② 安装 emacs 编辑器。
③ 安装 apache2。
④ 容器启动时运行 bash。</p>
<p><strong>编译：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build -t mydebian .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="制作镜像过程" tabindex="-1"><a class="header-anchor" href="#制作镜像过程" aria-hidden="true">#</a> 制作镜像过程</h2>
<blockquote>
<p>使用 <code v-pre>sealer</code> 制作一个集群镜像，和 <code v-pre>dockerfile</code> 同也不同。</p>
</blockquote>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> python</span>
<span class="token comment"># 我们在docker容器的工作目录。即进入docker容器的时候，所在的目录</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app </span>
 
<span class="token comment"># 复制当前目录下的所有内容到容器里边/app目录下</span>
<span class="token instruction"><span class="token keyword">ADD</span> . /app </span>
 
<span class="token comment"># 定义一个数据卷</span>
<span class="token instruction"><span class="token keyword">VOLUME</span> [<span class="token string">"/data_flask"</span>]</span>
 
<span class="token comment"># requirements.txt会写明我这个项目会需要一些什么python库；\</span>
<span class="token comment"># 这条命令是告诉容器把requirements.txt里需要的库到pypi.python.org这个网站里边下载</span>
<span class="token comment"># 这条命令是在制作镜像的时候要运行的，而不是在启动容器的时候运行的，这个要记住很容易混淆</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip install  --trusted-host pypi.python.org -r requirements.txt</span>
 
<span class="token comment"># 暴露我们的端口号，即容器对外开放哪个端口</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span>
 
<span class="token comment"># 定义环境变量</span>
<span class="token instruction"><span class="token keyword">ENV</span> NAME World</span>
<span class="token instruction"><span class="token keyword">ENV</span> AUTHOR fan</span>
 
<span class="token comment"># 容器起来之后运行的第一个程序，这个是容器启动的时候运行，要和上边区分开来</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>构建生成：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># -t，打个标记，等于给这个镜像取个名字</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> friendlyhello_1 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>生成镜像的时候，背后会自动生成临时的容器去执行Dockerfile里的命令，检测这个命令是否可以运行</p>
<p><strong>运行：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d -p 5080:80 --name hello-1 friendlyhello_1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


