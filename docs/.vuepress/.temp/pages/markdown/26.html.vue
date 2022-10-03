<template><div><h1 id="dockerfile案例" tabindex="-1"><a class="header-anchor" href="#dockerfile案例" aria-hidden="true">#</a> dockerfile案例</h1>
<nav class="table-of-contents"><ul><li><router-link to="#自定义镜像mycentosjava8">自定义镜像mycentosjava8</router-link><ul><li><router-link to="#要求">要求：</router-link></li><li><router-link to="#拉取镜像">拉取镜像</router-link></li><li><router-link to="#验证环境">验证环境</router-link></li><li><router-link to="#构建一些增强型功能–编写dockerfile文件">构建一些增强型功能–编写dockerfile文件</router-link></li><li><router-link to="#构建编写的dockerfile-生成新的镜像">构建编写的dockerfile，生成新的镜像</router-link></li><li><router-link to="#运行">运行</router-link></li></ul></li><li><router-link to="#最后再体会下unionfs-联合文件系统">最后再体会下UnionFS（联合文件系统）</router-link></li></ul></nav>
<p>[toc]</p>
<h2 id="自定义镜像mycentosjava8" tabindex="-1"><a class="header-anchor" href="#自定义镜像mycentosjava8" aria-hidden="true">#</a> 自定义镜像mycentosjava8</h2>
<h3 id="要求" tabindex="-1"><a class="header-anchor" href="#要求" aria-hidden="true">#</a> 要求：</h3>
<p>·     自定义镜像mycentosjava8</p>
<p>·     要求</p>
<p>·     Centos7镜像具备vim+ifconfig+jdk8</p>
<p>·     JDK的下载镜像地址</p>
<p>·     官网</p>
<p><a href="https://www.oracle.com/java/technologies/downloads/#java8" target="_blank" rel="noopener noreferrer">下载地址：https://www.oracle.com/java/technologies/downloads/#java8<ExternalLinkIcon/></a></p>
<p><img src="@source/markdown/images/LRMtS6w2PDBTxfQ.jpg" alt="graphic"></p>
<p>·     https://mirrors.yangxingzhen.com/jdk/</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>wget https://mirrors.yangxingzhen.com/jdk/jdk-8u20-linux-x64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>·     编写</p>
<p>·     准备编写Dockerfile文件</p>
<h3 id="拉取镜像" tabindex="-1"><a class="header-anchor" href="#拉取镜像" aria-hidden="true">#</a> 拉取镜像</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d centos /bin/bash
docker ps
docker exec -it  7f569561ca8b /bin/bash 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="验证环境" tabindex="-1"><a class="header-anchor" href="#验证环境" aria-hidden="true">#</a> 验证环境</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mkdir /myfile
cd /myfile &amp;&amp; mkdir Dockerfile
# root@ubuntu:/myfile# ls
# Dockerfile  index.html  jdk-8u171-linux-x64.tar.gz
# https://mirrors.yangxingzhen.com/jdk/jdk-8u171-linux-x64.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构建一些增强型功能–编写dockerfile文件" tabindex="-1"><a class="header-anchor" href="#构建一些增强型功能–编写dockerfile文件" aria-hidden="true">#</a> 构建一些增强型功能–编写dockerfile文件</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>from centos
MAINTAINER xiongxinwei<span class="token operator">&lt;</span>3293172751nss@gmail.com<span class="token operator">></span>

ENV mypath /usr/local
WORKDIR <span class="token variable">$mypath</span>

<span class="token comment"># 安装vim</span>
RUN yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">vim</span>

<span class="token comment"># 安装ifconfig命令查看网络</span>
RUN yum <span class="token parameter variable">-y</span> <span class="token function">install</span> net-tools

<span class="token comment"># 安装java8以及lib库</span>
RUN <span class="token function">mkdir</span> /usr/local/java

<span class="token comment"># ADD 是把相对路径jar，把jdk添加到容器中，安装包必须要和dockerfile文件在同一位置</span>
ADD jdk-8u171-linux-x64.tar.gz /usr/local/java/

<span class="token comment">#配置java环境变量</span>
ENV JAVA_HOME /usr/local/java/jdk1.8.0_171
ENV JRE_HOME <span class="token variable">$JAVA_HOME</span>/jre
ENV CLASSPATH <span class="token variable">$JAVA_HOME</span>/lib/dt.jar:<span class="token variable">$JAVA_HOME</span>/lib/tools.jar:<span class="token variable">$JRE_HOME</span>/lib:<span class="token variable">$CLASSPATH</span>
ENV <span class="token environment constant">PATH</span> <span class="token variable">$JAVA_HOME</span>/bin:<span class="token environment constant">$PATH</span>

<span class="token comment"># 端口</span>
EXPOSE <span class="token number">80</span>

CMD <span class="token builtin class-name">echo</span> <span class="token variable">$MYPATH</span>
CMD <span class="token builtin class-name">echo</span> <span class="token string">"success--------------ok"</span>
CMD /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong></p>
<ul>
<li>
<p>大写字母D</p>
</li>
<li>
<p>构建</p>
</li>
<li>
<p>docker build -t 新镜像名字:TAG .</p>
</li>
</ul>
<h3 id="构建编写的dockerfile-生成新的镜像" tabindex="-1"><a class="header-anchor" href="#构建编写的dockerfile-生成新的镜像" aria-hidden="true">#</a> 构建编写的dockerfile，生成新的镜像</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vim Dockerfile
docker build -t centosjava8:1.5 .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>公式：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build -f dockerfile文件 -t 新镜像名称:TAG .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>注意，上面TAG后面有个空格，有个点</strong></p>
<h3 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -it 新镜像名字:TAG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="最后再体会下unionfs-联合文件系统" tabindex="-1"><a class="header-anchor" href="#最后再体会下unionfs-联合文件系统" aria-hidden="true">#</a> 最后再体会下UnionFS（联合文件系统）</h2>
<p><strong>UnionFS（联合文件系统）：Union文件系统（UnionFS）是一种分层、轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文件系统下(unite several directories into a single virtual filesystem)。Union 文件系统是 Docker 镜像的基础。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。</strong></p>
<p><img src="https://s2.loli.net/2022/05/13/agpGsZwy8PCoBLU.jpg" alt="graphic"></p>
<p><strong>特性：一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录</strong></p>
</div></template>


