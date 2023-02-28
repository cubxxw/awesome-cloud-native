<template><div><h1 id="docker安装redis" tabindex="-1"><a class="header-anchor" href="#docker安装redis" aria-hidden="true">#</a> docker安装redis</h1>
<p>[toc]</p>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/<span class="token comment"># docker run -d -P redis</span>
cdf1868c4e5eb285c152d06637aec9a02e5ffdefe0772e615546c93655e52aff
root@ubuntu:/<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE                   COMMAND                  CREATED             STATUS                         PORTS                                                  NAMES
cdf1868c4e5e   redis                   <span class="token string">"docker-entrypoint.s…"</span>   <span class="token number">13</span> seconds ago      Up <span class="token number">12</span> seconds                  <span class="token number">0.0</span>.0.0:49157-<span class="token operator">></span><span class="token number">6379</span>/tcp, :::49157-<span class="token operator">></span><span class="token number">6379</span>/tcp            wonderful_noyce
1ff6de0064bd   mysql:5.7               <span class="token string">"docker-entrypoint.s…"</span>   <span class="token number">3</span> minutes ago       Up <span class="token number">3</span> minutes                   <span class="token number">0.0</span>.0.0:3306-<span class="token operator">></span><span class="token number">3306</span>/tcp, :::3306-<span class="token operator">></span><span class="token number">3306</span>/tcp, <span class="token number">33060</span>/tcp   mysql_beifen
22e49c33a330   billygoo/tomcat8-jdk8   <span class="token string">"catalina.sh run"</span>        <span class="token number">50</span> minutes ago      Up <span class="token number">50</span> minutes                  <span class="token number">0.0</span>.0.0:8080-<span class="token operator">></span><span class="token number">8080</span>/tcp, :::8080-<span class="token operator">></span><span class="token number">8080</span>/tcp              tomcat03
9e194dbf7eca   tomcat                  <span class="token string">"catalina.sh run"</span>        About an hour ago   Up About an hour               <span class="token number">0.0</span>.0.0:49153-<span class="token operator">></span><span class="token number">8080</span>/tcp, :::49153-<span class="token operator">></span><span class="token number">8080</span>/tcp            tomcat02
c6b2169449f4   ubuntu                  <span class="token string">"bash"</span>                   <span class="token number">2</span> hours ago         Up <span class="token number">2</span> hours                                                                            ubuntu2
37d9f24e95a3   ubuntu                  <span class="token string">"bash"</span>                   <span class="token number">2</span> hours ago         Up <span class="token number">2</span> hours                                                                            u1
f19e7fbc3d18   v2fly/v2fly-core        <span class="token string">"/usr/bin/v2ray -con…"</span>   <span class="token number">2</span> hours ago         Restarting <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">9</span> seconds ago                                                          tcp
root@ubuntu:/<span class="token comment"># docker exec -it cdf1868c4e5e /bin/bash </span>
root@cdf1868c4e5e:/data<span class="token comment"># redis-cli </span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> k1 v1
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get k1
<span class="token string">"v1"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="同样的redis需要容器卷进行同步" tabindex="-1"><a class="header-anchor" href="#同样的redis需要容器卷进行同步" aria-hidden="true">#</a> 同样的redis需要容器卷进行同步</h3>
<h5 id="指定配置文件" tabindex="-1"><a class="header-anchor" href="#指定配置文件" aria-hidden="true">#</a> 指定配置文件</h5>
<p><strong>1. 在宿主机上面先新建目录redis</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mkdir -p /redis/redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>2. 将一个redis.conf文件模板拷贝到/app/redis目录下</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>apt-get install redis
rz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看我的redis配置文件路径</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/etc/redis# ls
redis.conf
root@ubuntu:/etc/redis# pwd
/etc/redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>操作</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mkdir -p /redis/redis
cp /etc/redis/redis.conf /redis/redis/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="修改配置文件" tabindex="-1"><a class="header-anchor" href="#修改配置文件" aria-hidden="true">#</a> 修改配置文件</h5>
<ul>
<li>
<p>开启redis验证(服务器强烈建议)</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>requirepass 123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>允许redis外地链接（必须）</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># bind 127.0.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>将<code v-pre>daemonize yes</code>改为<code v-pre>no</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>protected-mode no
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>开启redis数据持久化<code v-pre>appendonly yes</code>可选</p>
</li>
</ul>
<h3 id="创建redis实例" tabindex="-1"><a class="header-anchor" href="#创建redis实例" aria-hidden="true">#</a> 创建redis实例</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -p 6379:6379 --name myredi01 \
--privileged=true \
-v /redis/redis/redis.conf:/etc/redis/redis.conf \
-v /redis/redis/data:/data \
-d redis \
redis-server /etc/redis/redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>docker run -p 6379:6379 --name myredi01 --priviledged=true  -v /redis/redis/redis.conf:/etc/redis/redis.conf  -v /redis/redis/data:/data  -d redis redis-server /etc/redis/redis.conf</p>
</blockquote>
<p><strong>以前是<code v-pre>/bin/bash</code></strong> 现在是<code v-pre>redis-server</code></p>
</div></template>


