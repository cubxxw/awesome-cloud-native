<template><div><h1 id="docker镜像命令" tabindex="-1"><a class="header-anchor" href="#docker镜像命令" aria-hidden="true">#</a> docker镜像命令</h1>
<nav class="table-of-contents"><ul><li><router-link to="#镜像仓库">镜像仓库</router-link><ul><li><router-link to="#docker-login-logout-命令">Docker login/logout 命令</router-link></li><li><router-link to="#docker-pull-命令">Docker pull 命令</router-link></li><li><router-link to="#docker-push-命令">Docker push 命令</router-link></li><li><router-link to="#docker-search-命令">Docker search 命令</router-link></li></ul></li><li><router-link to="#本地镜像">本地镜像</router-link><ul><li><router-link to="#docker-images-命令">Docker images 命令</router-link></li><li><router-link to="#docker-rmi-命令">Docker rmi 命令</router-link></li><li><router-link to="#docker-tag-命令">Docker tag 命令</router-link></li><li><router-link to="#docker-build-命令">Docker build 命令</router-link></li><li><router-link to="#docker-history-命令">Docker history 命令</router-link></li><li><router-link to="#docker-save-命令">Docker save 命令</router-link></li></ul></li><li><router-link to="#_2-篇笔记">2 篇笔记</router-link></li></ul></nav>
<p>[toc]</p>
<h2 id="镜像仓库" tabindex="-1"><a class="header-anchor" href="#镜像仓库" aria-hidden="true">#</a> 镜像仓库</h2>
<h3 id="docker-login-logout-命令" tabindex="-1"><a class="header-anchor" href="#docker-login-logout-命令" aria-hidden="true">#</a> Docker login/logout 命令</h3>
<hr>
<p><strong>docker login :</strong>  登陆到一个Docker镜像仓库，如果未指定镜像仓库地址，默认为官方仓库 Docker Hub</p>
<p><strong>docker logout :</strong>  登出一个Docker镜像仓库，如果未指定镜像仓库地址，默认为官方仓库 Docker Hub</p>
<p><strong>语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker login [OPTIONS] [SERVER]
docker logout [OPTIONS] [SERVER]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>OPTIONS说明：</p>
<ul>
<li><strong>-u :</strong>  登陆的用户名</li>
<li><strong>-p :</strong>   登陆的密码</li>
</ul>
<p><strong>实例</strong></p>
<p>登陆到Docker Hub</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker login -u 用户名 -p 密码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>登出Docker Hub</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker logout
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="docker-pull-命令" tabindex="-1"><a class="header-anchor" href="#docker-pull-命令" aria-hidden="true">#</a> Docker pull 命令</h3>
<p><strong>docker pull :</strong>  从镜像仓库中拉取或者更新指定镜像</p>
<p><strong>语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull [OPTIONS] NAME[:TAG|@DIGEST]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS说明：</p>
<ul>
<li><strong>-a :</strong> 拉取所有 <code v-pre>tagged</code> 镜像</li>
<li><strong>--disable-content-trust :</strong> 忽略镜像的校验,默认开启</li>
</ul>
<p><strong>实例</strong></p>
<p>从Docker Hub下载java最新版镜像。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从Docker Hub下载REPOSITORY为java的所有镜像。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull -a java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="docker-push-命令" tabindex="-1"><a class="header-anchor" href="#docker-push-命令" aria-hidden="true">#</a> Docker push 命令</h3>
<p><strong>docker push :</strong>  将本地的镜像上传到镜像仓库,要先登陆到镜像仓库</p>
<p><strong>语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker push [OPTIONS] NAME[:TAG]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS说明：</p>
<ul>
<li><strong>--disable-content-trust :</strong> 忽略镜像的校验,默认开启</li>
</ul>
<p><strong>实例</strong></p>
<p>上传本地镜像myapache:v1到镜像仓库中。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker push myapache:v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="docker-search-命令" tabindex="-1"><a class="header-anchor" href="#docker-search-命令" aria-hidden="true">#</a> Docker search 命令</h3>
<p><strong>docker search :</strong>  从Docker Hub查找镜像(一般使用<code v-pre>-f</code>筛选)</p>
<p><strong>语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker search [OPTIONS] TERM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS说明：</p>
<ul>
<li><strong>--automated :</strong> 只列出 automated build类型的镜像；</li>
<li><strong>--no-trunc :</strong> 显示完整的镜像描述；</li>
<li><strong>-f &lt;过滤条件&gt;:</strong> 列出收藏数不小于指定值的镜像。</li>
</ul>
<p><strong>实例</strong></p>
<p>从 Docker Hub 查找所有镜像名包含 java，并且收藏数大于 10 的镜像</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>runoob@runoob:~$ docker search -f stars=10 java
NAME                  DESCRIPTION                           STARS   OFFICIAL   AUTOMATED
java                  Java is a concurrent, class-based...   1037    [OK]       
anapsix/alpine-java   Oracle Java 8 (and 7) with GLIBC ...   115                [OK]
develar/java                                                 46                 [OK]
isuper/java-oracle    This repository contains all java...   38                 [OK]
lwieske/java-8        Oracle Java 8 Container - Full + ...   27                 [OK]
nimmis/java-centos    This is docker images of CentOS 7...   13                 [OK]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>参数说明：</p>
<p><strong>NAME:</strong>  镜像仓库源的名称</p>
<p><strong>DESCRIPTION:</strong>  镜像的描述</p>
<p><strong>OFFICIAL:</strong>  是否 docker 官方发布</p>
<p><strong>stars:</strong>  类似 Github 里面的 star，表示点赞、喜欢的意思。</p>
<p><strong>AUTOMATED:</strong>  自动构建。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>smile@ubuntu:~$ <span class="token function">sudo</span> <span class="token function">docker</span> search <span class="token parameter variable">-f</span> <span class="token assign-left variable">stars</span><span class="token operator">=</span><span class="token number">1</span> <span class="token parameter variable">--limit</span> <span class="token number">5</span> redis
NAME                     DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
redis                    Redis is an <span class="token function">open</span> <span class="token builtin class-name">source</span> key-value store that…   <span class="token number">10891</span>     <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>       
bitnami/redis            Bitnami Redis Docker Image                      <span class="token number">214</span>                  <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>
bitnami/redis-sentinel   Bitnami Docker Image <span class="token keyword">for</span> Redis Sentinel         <span class="token number">36</span>                   <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>
circleci/redis           CircleCI images <span class="token keyword">for</span> Redis                       <span class="token number">12</span>                   <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>
bitnami/redis-exporter 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="本地镜像" tabindex="-1"><a class="header-anchor" href="#本地镜像" aria-hidden="true">#</a> 本地镜像</h2>
<h3 id="docker-images-命令" tabindex="-1"><a class="header-anchor" href="#docker-images-命令" aria-hidden="true">#</a> Docker images 命令</h3>
<p><strong>docker images :</strong>  列出本地镜像。</p>
<p><strong>语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker images [OPTIONS] [REPOSITORY[:TAG]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS说明：</p>
<ul>
<li><strong>-a :</strong> 列出本地所有的镜像（含中间映像层，默认情况下，过滤掉中间映像层）；</li>
<li><strong>--digests :</strong> 显示镜像的摘要信息；</li>
<li><strong>-f :</strong> 显示满足条件的镜像；</li>
<li><strong>--format :</strong> 指定返回值的模板文件；</li>
<li><strong>--no-trunc :</strong> 显示完整的镜像信息；</li>
<li><strong>-q :</strong> 只显示镜像ID。</li>
</ul>
<p><strong>实例</strong></p>
<p>查看本地镜像列表。</p>
<ul>
<li><strong>pepository:仓库</strong></li>
<li><strong>tag:标签</strong></li>
<li><strong>image id:镜像id（使用hash，是唯一的）</strong></li>
<li><strong>created:时间</strong></li>
<li><strong>size:镜像大小</strong></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>runoob@runoob:~$ <span class="token function">docker</span> images
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
mymysql                 v1                  37af1236adef        <span class="token number">5</span> minutes ago       <span class="token number">329</span> MB
runoob/ubuntu           v4                  1c06aa18edee        <span class="token number">2</span> days ago          <span class="token number">142.1</span> MB
<span class="token operator">&lt;</span>none<span class="token operator">></span>                  <span class="token operator">&lt;</span>none<span class="token operator">></span>              5c6e1090e771        <span class="token number">2</span> days ago          <span class="token number">165.9</span> MB
httpd                   latest              ed38aaffef30        <span class="token number">11</span> days ago         <span class="token number">195.1</span> MB
alpine                  latest              4e38e38c8ce0        <span class="token number">2</span> weeks ago         <span class="token number">4.799</span> MB
mongo                   <span class="token number">3.2</span>                 282fd552add6        <span class="token number">3</span> weeks ago         <span class="token number">336.1</span> MB
redis                   latest              4465e4bcad80        <span class="token number">3</span> weeks ago         <span class="token number">185.7</span> MB
php                     <span class="token number">5.6</span>-fpm             025041cd3aa5        <span class="token number">3</span> weeks ago         <span class="token number">456.3</span> MB
python                  <span class="token number">3.5</span>                 045767ddf24a        <span class="token number">3</span> weeks ago         <span class="token number">684.1</span> MB
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>列出本地镜像中REPOSITORY为ubuntu的镜像列表。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@runoob:~# docker images  ubuntu
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              14.04               90d5884b1ee0        9 weeks ago         188 MB
ubuntu              15.10               4e3b13c8a266        3 months ago        136.3 MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>同一仓库源（mysql5.6\5.7)可以有多个tag版本，代表这个仓库源的不同个版本，我们使用repository：tag来定义不同的镜像</p>
</blockquote>
<h3 id="docker-rmi-命令" tabindex="-1"><a class="header-anchor" href="#docker-rmi-命令" aria-hidden="true">#</a> Docker rmi 命令</h3>
<hr>
<p><strong>docker rmi :</strong>  删除本地一个或多个镜像。</p>
<p><strong>语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker rmi [OPTIONS] IMAGE [IMAGE...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS说明：</p>
<ul>
<li><strong>-f :</strong> 强制删除；</li>
<li><strong>--no-prune :</strong> 不移除该镜像的过程镜像，默认移除；</li>
</ul>
<p><strong>实例</strong></p>
<p>强制删除本地镜像 runoob/ubuntu:v4。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@runoob:~# docker rmi -f runoob/ubuntu:v4
Untagged: runoob/ubuntu:v4
Deleted: sha256:1c06aa18edee44230f93a90a7d88139235de12cd4c089d41eed8419b503072be
Deleted: sha256:85feb446e89a28d58ee7d80ea5ce367eebb7cec70f0ec18aa4faa874cbd97c73
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-tag-命令" tabindex="-1"><a class="header-anchor" href="#docker-tag-命令" aria-hidden="true">#</a> Docker tag 命令</h3>
<hr>
<p><strong>docker tag :</strong>  标记本地镜像，将其归入某一仓库。</p>
<p><strong>语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>实例</strong></p>
<p>将镜像ubuntu:15.10标记为 runoob/ubuntu:v3 镜像。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@runoob:~# docker tag ubuntu:15.10 runoob/ubuntu:v3
root@runoob:~# docker images   runoob/ubuntu:v3
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
runoob/ubuntu       v3                  4e3b13c8a266        3 months ago        136.3 MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-build-命令" tabindex="-1"><a class="header-anchor" href="#docker-build-命令" aria-hidden="true">#</a> Docker build 命令</h3>
<p><strong>docker build</strong> 命令用于使用 Dockerfile 创建镜像。</p>
<p><strong>语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build [OPTIONS] PATH | URL | -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS说明：</p>
<ul>
<li><strong>--build-arg=[] :</strong> 设置镜像创建时的变量；</li>
<li><strong>--cpu-shares :</strong> 设置 cpu 使用权重；</li>
<li><strong>--cpu-period :</strong> 限制 CPU CFS周期；</li>
<li><strong>--cpu-quota :</strong> 限制 CPU CFS配额；</li>
<li><strong>--cpuset-cpus :</strong> 指定使用的CPU id；</li>
<li><strong>--cpuset-mems :</strong>  指定使用的内存 id；</li>
<li><strong>--disable-content-trust :</strong> 忽略校验，默认开启；</li>
<li><strong>-f :</strong> 指定要使用的Dockerfile路径；</li>
<li><strong>--force-rm :</strong> 设置镜像过程中删除中间容器；</li>
<li><strong>--isolation :</strong> 使用容器隔离技术；</li>
<li><strong>--label=[] :</strong> 设置镜像使用的元数据；</li>
<li><strong>-m :</strong> 设置内存最大值；</li>
<li><strong>--memory-swap :</strong> 设置Swap的最大值为内存+swap，&quot;-1&quot;表示不限swap；</li>
<li><strong>--no-cache :</strong> 创建镜像的过程不使用缓存；</li>
<li><strong>--pull :</strong> 尝试去更新镜像的新版本；</li>
<li><strong>--quiet, -q :</strong> 安静模式，成功后只输出镜像 ID；</li>
<li><strong>--rm :</strong> 设置镜像成功后删除中间容器；</li>
<li><strong>--shm-size :</strong> 设置/dev/shm的大小，默认值是64M；</li>
<li><strong>--ulimit :</strong> Ulimit配置。</li>
<li><strong>--squash :</strong> 将 Dockerfile 中所有的操作压缩为一层。</li>
<li><strong>--tag, -t:</strong>  镜像的名字及标签，通常 name:tag 或者 name 格式；可以在一次构建中为一个镜像设置多个标签。</li>
<li><strong>--network:</strong>  默认 default。在构建期间设置RUN指令的网络模式</li>
</ul>
<p><strong>实例</strong></p>
<p>使用当前目录的 <code v-pre>Dockerfile</code> 创建镜像，标签为 runoob/ubuntu:v1。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build -t runoob/ubuntu:v1 . 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用URL <strong>github.com/creack/docker-firefox</strong> 的 Dockerfile 创建镜像。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build github.com/creack/docker-firefox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>也可以通过 -f Dockerfile 文件的位置：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ docker build -f /path/to/a/Dockerfile .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 Docker 守护进程执行 <code v-pre>Dockerfile</code> 中的指令前，首先会对 Dockerfile 进行语法检查，有语法错误时会返回：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ docker build -t test/myapp .
Sending build context to Docker daemon 2.048 kB
Error response from daemon: Unknown instruction: RUNCMD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-history-命令" tabindex="-1"><a class="header-anchor" href="#docker-history-命令" aria-hidden="true">#</a> Docker history 命令</h3>
<hr>
<p><strong>docker history :</strong>  查看指定镜像的创建历史。</p>
<p><strong>语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker history [OPTIONS] IMAGE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS说明：</p>
<ul>
<li><strong>-H :</strong> 以可读的格式打印镜像大小和日期，默认为true；</li>
<li><strong>--no-trunc :</strong> 显示完整的提交记录；</li>
<li><strong>-q :</strong> 仅列出提交记录ID。</li>
</ul>
<p><strong>实例</strong></p>
<p>查看本地镜像runoob/ubuntu:v3的创建历史。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@runoob:~# docker history runoob/ubuntu:v3
IMAGE             CREATED           CREATED BY                                      SIZE      COMMENT
4e3b13c8a266      3 months ago      /bin/sh -c #(nop) CMD ["/bin/bash"]             0 B                 
&lt;missing>         3 months ago      /bin/sh -c sed -i 's/^#\s*\(deb.*universe\)$/   1.863 kB            
&lt;missing>         3 months ago      /bin/sh -c set -xe   &amp;&amp; echo '#!/bin/sh' > /u   701 B               
&lt;missing>         3 months ago      /bin/sh -c #(nop) ADD file:43cb048516c6b80f22   136.3 MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-save-命令" tabindex="-1"><a class="header-anchor" href="#docker-save-命令" aria-hidden="true">#</a> Docker save 命令</h3>
<p><strong>docker save :</strong>  将指定镜像保存成 tar 归档文件。</p>
<p><strong>语法</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker save [OPTIONS] IMAGE [IMAGE...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS 说明：</p>
<ul>
<li><strong>-o :</strong> 输出到的文件。</li>
</ul>
<p><strong>实例</strong></p>
<p>将镜像 runoob/ubuntu:v3 生成 my_ubuntu_v3.tar 文档</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>runoob@runoob:~$ docker save -o my_ubuntu_v3.tar runoob/ubuntu:v3
runoob@runoob:~$ ll my_ubuntu_v3.tar
-rw------- 1 runoob runoob 142102016 Jul 11 01:37 my_ubuntu_v3.ta
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-篇笔记" tabindex="-1"><a class="header-anchor" href="#_2-篇笔记" aria-hidden="true">#</a> 2 篇笔记</h2>
<p><strong>docker prune 命令</strong></p>
<p>prune 命令用来``删除不再使用的 docker 对象。</p>
<p>删除所有未被 tag 标记和未被容器使用的镜像:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ docker image prune
WARNING! This will remove all dangling images.
Are you sure you want to continue? [y/N] y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>删除所有未被容器使用的镜像:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ docker image prune -a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除所有停止运行的容器:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ docker container prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除所有未被挂载的卷:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ docker volume prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除所有网络:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ docker network prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>删除 docker 所有资源:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ docker system prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>docker system prune</strong> 命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - all dangling build cache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>翻译：删除停止的容器、删除所有未被容器使用的网络、删除所有none的镜像。</p>
</div></template>


