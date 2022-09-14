<template><div><h1 id="tomcat安装挂载" tabindex="-1"><a class="header-anchor" href="#tomcat安装挂载" aria-hidden="true">#</a> tomcat安装挂载</h1>
<p>[toc]</p>
<h2 id="查找tomcat并且下载" tabindex="-1"><a class="header-anchor" href="#查找tomcat并且下载" aria-hidden="true">#</a> 查找tomcat并且下载</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker search --help </span>

Usage:  <span class="token function">docker</span> search <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> <span class="token environment constant">TERM</span>

Search the Docker Hub <span class="token keyword">for</span> images

Options:
  -f, <span class="token parameter variable">--filter</span> filter   Filter output based on conditions provided
      <span class="token parameter variable">--format</span> string   Pretty-print search using a Go template
      <span class="token parameter variable">--limit</span> int       Max number of search results <span class="token punctuation">(</span>default <span class="token number">25</span><span class="token punctuation">)</span>
      --no-trunc        Don't truncate output
root@ubuntu:/tmp/host_data<span class="token comment"># docker search --limit 3  tomcat </span>
NAME             DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
tomcat           Apache Tomcat is an <span class="token function">open</span> <span class="token builtin class-name">source</span> implementati…   <span class="token number">3319</span>      <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>       
tomee            Apache TomEE is an all-Apache Java EE certif…   <span class="token number">96</span>        <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>       
bitnami/tomcat   Bitnami Tomcat Docker Image                     <span class="token number">44</span>                   <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>
root@ubuntu:/tmp/host_data<span class="token comment"># docker run -it tomcat /bin/bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d -p 8080:8080 --name tomcat01 tomcat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>可以使用<code v-pre>-P</code>随机分配端口，此时内部和外部端口会不一样</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/tmp/host_data# docker run -d -P --name tomcat02 tomcat
9e194dbf7ecade3e1261bb836067e6f27c54ef4733ab38a036c1c3a526be5586
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们使用docker ps查看端口号</strong></p>
<p><img src="https://s2.loli.net/2022/05/11/tVC5Df4Aks8uhZ9.png" alt="image-20220511165418337"></p>
<h2 id="访问猫首页" tabindex="-1"><a class="header-anchor" href="#访问猫首页" aria-hidden="true">#</a> 访问猫首页</h2>
<p><strong>为什么上面的tomcat上面啥没有猫猫？</strong></p>
<blockquote>
<p>因为这是新版，我们进入tomcat看一下</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE              COMMAND                  CREATED             STATUS                          PORTS                                         NAMES
9e194dbf7eca   tomcat             <span class="token string">"catalina.sh run"</span>        <span class="token number">4</span> minutes ago       Up <span class="token number">4</span> minutes                    <span class="token number">0.0</span>.0.0:49153-<span class="token operator">></span><span class="token number">8080</span>/tcp, :::49153-<span class="token operator">></span><span class="token number">8080</span>/tcp   tomcat02
c6b2169449f4   ubuntu             <span class="token string">"bash"</span>                   <span class="token number">30</span> minutes ago      Up <span class="token number">30</span> minutes                                                                 ubuntu2
37d9f24e95a3   ubuntu             <span class="token string">"bash"</span>                   About an hour ago   Up About an hour                                                              u1
f19e7fbc3d18   v2fly/v2fly-core   <span class="token string">"/usr/bin/v2ray -con…"</span>   About an hour ago   Restarting <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">21</span> seconds ago                                                 tcp
root@ubuntu:/tmp/host_data<span class="token comment"># docker exec -it 9e194dbf7eca /bin/bash</span>
root@9e194dbf7eca:/usr/local/tomcat<span class="token comment"># ls -l</span>
total <span class="token number">160</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">18994</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 BUILDING.txt
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">6210</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 CONTRIBUTING.md
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">60269</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 LICENSE
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">2333</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 NOTICE
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">3378</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 README.md
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">6905</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 RELEASE-NOTES
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">16517</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 RUNNING.txt
drwxr-xr-x <span class="token number">2</span> root root  <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:07 bin
drwxr-xr-x <span class="token number">1</span> root root  <span class="token number">4096</span> May <span class="token number">11</span> 09:00 conf
drwxr-xr-x <span class="token number">2</span> root root  <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 lib
drwxrwxrwx <span class="token number">1</span> root root  <span class="token number">4096</span> May <span class="token number">11</span> 09:00 logs
drwxr-xr-x <span class="token number">2</span> root root  <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:07 native-jni-lib
drwxrwxrwx <span class="token number">2</span> root root  <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 temp
drwxr-xr-x <span class="token number">2</span> root root  <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 webapps
drwxr-xr-x <span class="token number">7</span> root root  <span class="token number">4096</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 webapps.dist
drwxrwxrwx <span class="token number">2</span> root root  <span class="token number">4096</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 work
root@9e194dbf7eca:/usr/local/tomcat<span class="token comment"># cd webapps &amp;&amp; ls -al</span>
total <span class="token number">12</span>
drwxr-xr-x <span class="token number">2</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">1</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:07 <span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这是因为真正有货的是webapps.dist，而web apps里面是空的，此时我们删除并且改名</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@9e194dbf7eca:/usr/local/tomcat/webapps<span class="token comment"># cd .. &amp;&amp;rm -r webapps</span>
root@9e194dbf7eca:/usr/local/tomcat<span class="token comment"># mv webapps.dist/ webapps &amp;&amp;cd webapps &amp;&amp;ls -al</span>
total <span class="token number">32</span>
drwxr-xr-x  <span class="token number">7</span> root root <span class="token number">4096</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 <span class="token builtin class-name">.</span>
drwxr-xr-x  <span class="token number">1</span> root root <span class="token number">4096</span> May <span class="token number">11</span> 09:09 <span class="token punctuation">..</span>
drwxr-xr-x  <span class="token number">3</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 ROOT
drwxr-xr-x <span class="token number">15</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 docs
drwxr-xr-x  <span class="token number">7</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 examples
drwxr-xr-x  <span class="token number">6</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 host-manager
drwxr-xr-x  <span class="token number">6</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 manager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/11/MvQHpWcql2d4OzI.png" alt="image-20220511170245755"></p>
<p>如上图，成功了（我设置了映射）</p>
<hr>
<h2 id="推荐使用的版本" tabindex="-1"><a class="header-anchor" href="#推荐使用的版本" aria-hidden="true">#</a> 推荐使用的版本</h2>
<p><strong>我们的版本是最新的tomcat，其实用不到这么新的，可以删除后重新安装一个旧的</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d -p 8080:8080 --name tomcat03 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看端口</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE                   COMMAND                  CREATED             STATUS                         PORTS                                         NAMES
22e49c33a330   billygoo/tomcat8-jdk8   <span class="token string">"catalina.sh run"</span>        <span class="token number">15</span> seconds ago      Up <span class="token number">14</span> seconds                  <span class="token number">0.0</span>.0.0:8080-<span class="token operator">></span><span class="token number">8080</span>/tcp, :::8080-<span class="token operator">></span><span class="token number">8080</span>/tcp     tomcat03
9e194dbf7eca   tomcat                  <span class="token string">"catalina.sh run"</span>        <span class="token number">14</span> minutes ago      Up <span class="token number">14</span> minutes                  <span class="token number">0.0</span>.0.0:49153-<span class="token operator">></span><span class="token number">8080</span>/tcp, :::49153-<span class="token operator">></span><span class="token number">8080</span>/tcp   tomcat02
c6b2169449f4   ubuntu                  <span class="token string">"bash"</span>                   <span class="token number">40</span> minutes ago      Up <span class="token number">40</span> minutes                                                                ubuntu2
37d9f24e95a3   ubuntu                  <span class="token string">"bash"</span>                   About an hour ago   Up About an hour                                                             u1
f19e7fbc3d18   v2fly/v2fly-core        <span class="token string">"/usr/bin/v2ray -con…"</span>   <span class="token number">2</span> hours ago         Restarting <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">2</span> seconds ago                                                 tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/11/dpaNZvRrhIXbSc4.png" alt="image-20220511170816781"></p>
<blockquote>
<p>建议初学者使用后面的方法就行</p>
</blockquote>
</div></template>


