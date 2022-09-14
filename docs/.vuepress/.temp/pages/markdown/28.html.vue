<template><div><h1 id="编写自定义镜像myubuntu" tabindex="-1"><a class="header-anchor" href="#编写自定义镜像myubuntu" aria-hidden="true">#</a> 编写自定义镜像myubuntu</h1>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/text# pwd
/text
root@ubuntu:/text# ll
total 12
drwxr-xr-x  2 root root 4096 May 13 06:56 ./
drwxr-xr-x 33 root root 4096 May 13 06:55 ../
-rw-r--r--  1 root root  321 May 13 06:56 Mydockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写文件" tabindex="-1"><a class="header-anchor" href="#编写文件" aria-hidden="true">#</a> 编写文件</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>FROM ubuntu
MAINTAINER zzyy<span class="token operator">&lt;</span>zzyybs@126.com<span class="token operator">></span>
 
ENV MYPATH /usr/local
WORKDIR <span class="token variable">$MYPATH</span>
 
RUN <span class="token function">apt-get</span> update
RUN <span class="token function">apt-get</span> <span class="token function">install</span> net-tools
<span class="token comment">#RUN apt-get install -y iproute2</span>
<span class="token comment">#RUN apt-get install -y inetutils-ping</span>
 
EXPOSE <span class="token number">80</span>
 
CMD <span class="token builtin class-name">echo</span> <span class="token variable">$MYPATH</span>
CMD <span class="token builtin class-name">echo</span> <span class="token string">"install inconfig cmd into ubuntu success--------------ok"</span>
CMD /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>构建</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build -t 新镜像名字:TAG .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>运行</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -it 新镜像名字:TAG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/13/ATxWkaiCdcJwv2g.png" alt="image-20220513221602143"></p>
</div></template>


