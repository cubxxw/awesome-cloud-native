<template><div><h1 id="虚悬镜像" tabindex="-1"><a class="header-anchor" href="#虚悬镜像" aria-hidden="true">#</a> 虚悬镜像</h1>
<p>[toc]</p>
<p><strong>前面讲过什么是虚悬镜像·仓库名、标签都是<none>的镜像，俗称dangling image</strong></p>
<h3 id="dockerfile写一个" tabindex="-1"><a class="header-anchor" href="#dockerfile写一个" aria-hidden="true">#</a> Dockerfile写一个</h3>
<h5 id="vim-dockerfile" tabindex="-1"><a class="header-anchor" href="#vim-dockerfile" aria-hidden="true">#</a> vim Dockerfile</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>from ubuntu
CMD echo 'action is success'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>测试，没什么</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/myfile/test# docker build .
Sending build context to Docker daemon  2.048kB
Step 1/2 : from ubuntu
 ---> ba6acccedd29
Step 2/2 : CMD echo 'action is success'
 ---> Running in 5e5d12d28ce2
Removing intermediate container 5e5d12d28ce2
 ---> 5c2d858f45c0
Successfully built 5c2d858f45c0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/13/rW3IABKVTEPyXsw.png" alt="image-20220513215042630"></p>
<p><strong>已经出现</strong></p>
<h3 id="查看所有虚悬镜像" tabindex="-1"><a class="header-anchor" href="#查看所有虚悬镜像" aria-hidden="true">#</a> 查看所有虚悬镜像</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/myfile/test# docker image ls -f dangling=true
REPOSITORY   TAG       IMAGE ID       CREATED              SIZE
&lt;none>       &lt;none>    5c2d858f45c0   About a minute ago   72.8MB
&lt;none>       &lt;none>    3f26da6b3168   9 minutes ago        231MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虚悬镜像已经失去存在价值，可以删除</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker image prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


