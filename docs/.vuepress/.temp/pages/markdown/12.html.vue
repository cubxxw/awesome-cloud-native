<template><div><h1 id="docker提交以及命名空间" tabindex="-1"><a class="header-anchor" href="#docker提交以及命名空间" aria-hidden="true">#</a> docker提交以及命名空间</h1>
<p>[toc]</p>
<h2 id="commit" tabindex="-1"><a class="header-anchor" href="#commit" aria-hidden="true">#</a> commit</h2>
<p>**<code v-pre>docker commit</code> **：从容器创建一个新的镜像。</p>
<p><strong>语法</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> commit <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> CONTAINER <span class="token punctuation">[</span>REPOSITORY<span class="token punctuation">[</span>:TAG<span class="token punctuation">]</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS说明：</p>
<ul>
<li>
<p><strong><code v-pre>-a</code>：</strong> 提交的镜像作者；</p>
</li>
<li>
<p><strong><code v-pre>-c</code> ：</strong> 使用<code v-pre>Dockerfile</code>指令来创建镜像；</p>
</li>
<li>
<p><strong><code v-pre>-m</code> ：</strong> 提交时的说明文字；</p>
</li>
<li>
<p><strong><code v-pre>-p</code> ：</strong> 在<code v-pre>commit</code>时，将容器暂停。</p>
</li>
</ul>
<p><strong>实例 – 在Ubuntu中安装vim</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker exec -it abce9bcaf87c /bin/bash
apt-get update
apt-get install -y vim
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>此时可以使用vim命令了</p>
</blockquote>
<p><strong>此时我们可以理解分层的好处了，就是共享资源，方便复制迁移，就是为了复用</strong></p>
<p><strong>多个镜像都从相同的镜像base镜像架构而来，那么docker host只需要在磁盘上保存一份base镜像，而且内存中每一层镜像都可以被共享。</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> commit <span class="token parameter variable">-m</span><span class="token operator">=</span><span class="token string">"vim cmd add ok"</span> <span class="token parameter variable">-a</span><span class="token operator">=</span><span class="token string">"nsddd"</span> 08d1e4ac02f2  smile/myubuntu：版本号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/10/BnLtjb1EIRClfDy.png" alt="image-20220510211036779"></p>
<p><strong>docker中镜像分层，支持通过扩展现有镜像，创建新的镜像，类似于java继承与一个base基础类，自己再按需扩展，新的镜像就是从base镜像一层层的叠加生成的，每安装一个软件，就在现有的镜像的基础上增加一层镜像。</strong></p>
<p>将容器<code v-pre>a404c6c174a2</code> 保存为新的镜像,并添加提交人信息和说明信息。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>runoob@runoob:~$ docker commit -a "runoob.com" -m "my apache" a404c6c174a2  mymysql:v1 
sha256:37af1236adef1544e8886be23010b66577647a40bc02c0885a6600b33ee28057
runoob@runoob:~$ docker images mymysql:v1
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
mymysql             v1                  37af1236adef        15 seconds ago      329 MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命名空间" tabindex="-1"><a class="header-anchor" href="#命名空间" aria-hidden="true">#</a> 命名空间</h2>
<blockquote>
<p>因为如果我们使用hub.docker 的话可能访问太慢了。所以选择hub可能不是很明治的选择，所以使用aliyun是一个很好的选择。</p>
</blockquote>
<p><img src="https://s2.loli.net/2022/05/10/b6IzWuvLEXNCTPF.png" alt="image-20220510210523765"></p>
<p><strong>添加个人仓库</strong></p>
<p><img src="https://s2.loli.net/2022/05/10/AOEd814ryYS5mXC.png" alt="image-20220510210831886"></p>
<p><strong>注意欸，要在下面的访问凭证设置密码</strong></p>
<h2 id="完整的阿里云推送和拉取过程" tabindex="-1"><a class="header-anchor" href="#完整的阿里云推送和拉取过程" aria-hidden="true">#</a> 完整的阿里云推送和拉取过程</h2>
<p><strong>关键过程</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span>
<span class="token function">docker</span> commit <span class="token parameter variable">-m</span><span class="token operator">=</span><span class="token string">"vim cmd add ok"</span> <span class="token parameter variable">-a</span><span class="token operator">=</span><span class="token string">"nsddd"</span> 08d1e4ac02f2  smile/myubuntu
<span class="token function">docker</span> images
<span class="token function">docker</span> login <span class="token parameter variable">--username</span><span class="token operator">=</span>3293172751nss registry.cn-hangzhou.aliyuncs.com
<span class="token function">docker</span> tag 6962da3091d1 registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu
<span class="token function">docker</span> push registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu
<span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> 6962da3091d1
<span class="token function">docker</span> images
<span class="token function">docker</span> rmi <span class="token parameter variable">-f</span> ba6acccedd29   4b9109b3e917 c717164f2c33  717164f2c33
<span class="token function">docker</span> pull registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu
<span class="token function">docker</span> images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>全过程</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS      NAMES
08d1e4ac02f2   ubuntu    <span class="token string">"bash"</span>                   <span class="token number">18</span> minutes ago   Up <span class="token number">18</span> minutes              cranky_babbage
a22dd4f7caf4   redis     <span class="token string">"docker-entrypoint.s…"</span>   <span class="token number">24</span> hours ago     Up <span class="token number">24</span> hours     <span class="token number">6379</span>/tcp   strange_elgamal
root@ubuntu:/<span class="token comment"># ls</span>
bin   c      chain  <span class="token function">docker</span>  home              lib    lib64   lost+found  mnt    opt   proc  run   snap  swapfile  tmp  var
boot  cdrom  dev    etc     hyerledgerFabric  lib32  libx32  media       nginx  pbft  root  sbin  srv   sys       usr  vpn
root@ubuntu:/<span class="token comment"># docker commit -m="vim cmd add ok" -a="nsddd" 08d1e4ac02f2  smile/myubuntu</span>
sha256:6962da3091d10456d52b8771f35d94dc01520e1ec661103438c77d6bb87d5d6f
root@ubuntu:/<span class="token comment"># docker images</span>
REPOSITORY       TAG       IMAGE ID       CREATED          SIZE
smile/myubuntu   latest    6962da3091d1   <span class="token number">20</span> seconds ago   108MB
smile/ubuntu     <span class="token number">3.7</span>       4b9109b3e917   <span class="token number">23</span> hours ago     0B
<span class="token operator">&lt;</span>none<span class="token operator">></span>           <span class="token operator">&lt;</span>none<span class="token operator">></span>    c717164f2c33   <span class="token number">23</span> hours ago     0B
smile/ubuntu     <span class="token number">1</span>         ebc64f915192   <span class="token number">23</span> hours ago     0B
tomcat           latest    fb5657adc892   <span class="token number">4</span> months ago     680MB
redis            latest    7614ae9453d1   <span class="token number">4</span> months ago     113MB
python           latest    a5d7930b60cc   <span class="token number">4</span> months ago     917MB
ubuntu           latest    ba6acccedd29   <span class="token number">6</span> months ago     <span class="token number">72</span>.8MB
root@ubuntu:/<span class="token comment"># docker login --username=3293172751nss registry.cn-hangzhou.aliyuncs.com</span>
Password: 
WARNING<span class="token operator">!</span> Your password will be stored unencrypted <span class="token keyword">in</span> /root/.docker/config.json.
Configure a credential helper to remove this warning. See
https://docs.docker.com/engine/reference/commandline/login/<span class="token comment">#credentials-store</span>

Login Succeeded
root@ubuntu:/<span class="token comment"># docker tag 6962da3091d1 registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu</span>
root@ubuntu:/<span class="token comment"># docker push registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu</span>
Using default tag: latest
The push refers to repository <span class="token punctuation">[</span>registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu<span class="token punctuation">]</span>
57fc73d61f9a: Pushed 
9f54eef41275: Pushed latest: digest: sha256:08bb12c0c5d3a3449c3b1e06381a2eb9e3e43bc252237b4ba5e79f917adbcd6b size: <span class="token number">741</span>
root@ubuntu:/<span class="token comment"># docker rmi -f 6962da3091d1</span>
Untagged: smile/myubuntu:latest
Untagged: registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu:latest
Untagged: registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu@sha256:08bb12c0c5d3a3449c3b1e06381a2eb9e3e43bc252237b4ba5e79f917adbcd6b
Deleted: sha256:6962da3091d10456d52b8771f35d94dc01520e1ec661103438c77d6bb87d5d6f
Deleted: sha256:d442f4d51ca04c56cec20bc9dfda5e7ceb7e227145fe7cbfe89fafd36e022fc0
root@ubuntu:/<span class="token comment"># docker images</span>
REPOSITORY     TAG       IMAGE ID       CREATED        SIZE
smile/ubuntu   <span class="token number">3.7</span>       4b9109b3e917   <span class="token number">24</span> hours ago   0B
<span class="token operator">&lt;</span>none<span class="token operator">></span>         <span class="token operator">&lt;</span>none<span class="token operator">></span>    c717164f2c33   <span class="token number">24</span> hours ago   0B
smile/ubuntu   <span class="token number">1</span>         ebc64f915192   <span class="token number">24</span> hours ago   0B
tomcat         latest    fb5657adc892   <span class="token number">4</span> months ago   680MB
redis          latest    7614ae9453d1   <span class="token number">4</span> months ago   113MB
python         latest    a5d7930b60cc   <span class="token number">4</span> months ago   917MB
ubuntu         latest    ba6acccedd29   <span class="token number">6</span> months ago   <span class="token number">72</span>.8MB
root@ubuntu:/<span class="token comment"># docker rmi -f ba6acccedd29   4b9109b3e917 c717164f2c33  717164f2c33 </span>
Untagged: smile/ubuntu:3.7
Deleted: sha256:4b9109b3e9172fbbfc797578772925f78bcb0007cf9c5204ee9e3820075284c2
Deleted: sha256:c717164f2c33d6edea7055110293bb2f65c1bb5ba97b5a43b9c9202d312b5942
Error response from daemon: conflict: unable to delete ba6acccedd29 <span class="token punctuation">(</span>cannot be forced<span class="token punctuation">)</span> - image is being used by running container 08d1e4ac02f2
Error: No such image: 717164f2c33
root@ubuntu:/<span class="token comment"># docker images</span>
REPOSITORY     TAG       IMAGE ID       CREATED        SIZE
smile/ubuntu   <span class="token number">1</span>         ebc64f915192   <span class="token number">24</span> hours ago   0B
tomcat         latest    fb5657adc892   <span class="token number">4</span> months ago   680MB
redis          latest    7614ae9453d1   <span class="token number">4</span> months ago   113MB
python         latest    a5d7930b60cc   <span class="token number">4</span> months ago   917MB
ubuntu         latest    ba6acccedd29   <span class="token number">6</span> months ago   <span class="token number">72</span>.8MB
root@ubuntu:/<span class="token comment"># docker pull registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu</span>
Using default tag: latest
latest: Pulling from nsddd/myubuntu
7b1a6ab2e44d: Already exists 
bc5f4eb531d0: Pull complete 
Digest: sha256:08bb12c0c5d3a3449c3b1e06381a2eb9e3e43bc252237b4ba5e79f917adbcd6b
Status: Downloaded newer image <span class="token keyword">for</span> registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu:latest
registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu:latest
root@ubuntu:/<span class="token comment"># docker images</span>
REPOSITORY                                         TAG       IMAGE ID       CREATED          SIZE
registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu   latest    6962da3091d1   <span class="token number">12</span> minutes ago   108MB
smile/ubuntu                                       <span class="token number">1</span>         ebc64f915192   <span class="token number">24</span> hours ago     0B
tomcat                                             latest    fb5657adc892   <span class="token number">4</span> months ago     680MB
redis                                              latest    7614ae9453d1   <span class="token number">4</span> months ago     113MB
python                                             latest    a5d7930b60cc   <span class="token number">4</span> months ago     917MB
ubuntu                                             latest    ba6acccedd29   <span class="token number">6</span> months ago     <span class="token number">72</span>.8MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


