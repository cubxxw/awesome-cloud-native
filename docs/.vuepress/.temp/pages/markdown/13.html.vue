<template><div><h1 id="使用hub-docker推送到远程" tabindex="-1"><a class="header-anchor" href="#使用hub-docker推送到远程" aria-hidden="true">#</a> 使用hub.docker推送到远程</h1>
<nav class="table-of-contents"><ul><li><router-link to="#前言">前言</router-link></li><li><router-link to="#使用commit">使用commit</router-link></li><li><router-link to="#设定端口映射">设定端口映射</router-link></li><li><router-link to="#修改配置文件使docker支持http">修改配置文件使docker支持http</router-link></li><li><router-link to="#推送mysql到hub-docker">推送mysql到hub.docker</router-link><ul><li><router-link to="#先到hub上面搞一个开源的仓库">先到hub上面搞一个开源的仓库</router-link></li><li><router-link to="#docker-desktop上面推送">docker desktop上面推送</router-link></li></ul></li><li><router-link to="#在ubuntu上面推送">在Ubuntu上面推送</router-link><ul><li><router-link to="#登陆">登陆</router-link></li></ul></li><li><router-link to="#mysql我们可以提交到同一个仓库-但是换个tag">mysql我们可以提交到同一个仓库，但是换个tag</router-link></li></ul></nav>
<p>[toc]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<ul>
<li>[x] <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">地址<ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">高低说两句</p>
<p>📖 现在的hub好像并没有因为网路原因导致…….</p>
<p>🔦 所以目前我认为hub比阿里云更加合适当仓库</p>
<p>❗下面有分别推送windowns和Linux中的镜像到docker，请耐心看完</p>
</div>
<h2 id="使用commit" tabindex="-1"><a class="header-anchor" href="#使用commit" aria-hidden="true">#</a> 使用commit</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker commit -m="vim cmd add ok" -a="nsddd" 08d1e4ac02f2  smile/myubuntu:1.0.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="设定端口映射" tabindex="-1"><a class="header-anchor" href="#设定端口映射" aria-hidden="true">#</a> 设定端口映射</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d -p 5000:5000 -v/zzyyuse/myregistry/:/tmp/registry --privileged=true registry
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>默认情况下，仓库被创建在容器的<code v-pre>/var/lib/registry</code>目录下面。建议自行用容器卷映射，方便宿主机联调</p>
<p>上面写的容器卷/zzyyuse/myregistry/ <strong>不写的话就用默认目录</strong></p>
<p>--privileged=ture 开启权限，开启动拥有真正的root权限</p>
</blockquote>
<h2 id="修改配置文件使docker支持http" tabindex="-1"><a class="header-anchor" href="#修改配置文件使docker支持http" aria-hidden="true">#</a> 修改配置文件使docker支持http</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat /etc/docker/daemon.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>使用vim修改</strong></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"registry-mirrors"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"https://ks0realz.mirror.aliyuncs.com"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"insecure-registries"</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">"192.168.111.167:5000"</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>docker默认不支持http方式推送镜像，通过配置选项来取消这个限制 ===&gt; 修改完如果不生效，重启docker</strong></p>
</blockquote>
<h2 id="推送mysql到hub-docker" tabindex="-1"><a class="header-anchor" href="#推送mysql到hub-docker" aria-hidden="true">#</a> 推送mysql到hub.docker</h2>
<blockquote>
<p>😄 windown下推送MySQL到win</p>
</blockquote>
<h3 id="先到hub上面搞一个开源的仓库" tabindex="-1"><a class="header-anchor" href="#先到hub上面搞一个开源的仓库" aria-hidden="true">#</a> 先到hub上面搞一个开源的仓库</h3>
<p><img src="http://sm.nsddd.top//typora/image-20220923201147595.png?mail:3293172751@qq.com" alt="image-20220923201147595"></p>
<p><strong>注意右边的推送，我们打标签的时候要按照这个来打</strong></p>
<p>❗❗ <code v-pre>commit</code>提交是给我们自己在本地看的</p>
<ul>
<li><code v-pre>-a</code> ：作者</li>
<li><code v-pre>-m</code>：提交信息</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker commit -m "docker提交mysql" 55624332ddc6 smile/mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>❗❗ <code v-pre>tag</code>打标签是提交hub的标志，一定要和远程的仓库对应，否则提交不上去</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> tag smile/mysql:5.7 <span class="token number">3293172751</span>/mysql5.7:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>3293172751/mysql5.7:5.7</code>：分别对应我自己的账户还有仓库名，以及<code v-pre>tag</code></li>
</ul>
<p>❗❗ 最后是<code v-pre>push</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> push <span class="token number">3293172751</span>/mysql5.7:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>❗❗ 远程记录</p>
<p><img src="https://sm.nsddd.top//typora/image-20220923201741572.png?mail:3293172751@qq.com" alt="image-20220923201741572"></p>
<h3 id="docker-desktop上面推送" tabindex="-1"><a class="header-anchor" href="#docker-desktop上面推送" aria-hidden="true">#</a> docker desktop上面推送</h3>
<p><img src="https://sm.nsddd.top//typora/image-20220923201633725.png?mail:3293172751@qq.com" alt="image-20220923201633725"></p>
<p><strong>在desktop上面没有标签标志，还是需要打标签的！！！</strong></p>
<blockquote>
<p>如果有标签可以直接推送</p>
</blockquote>
<h2 id="在ubuntu上面推送" tabindex="-1"><a class="header-anchor" href="#在ubuntu上面推送" aria-hidden="true">#</a> 在Ubuntu上面推送</h2>
<p>🐧 因为最近需要把电脑刷机，然后docker里面的数据都需要保存下来，一方面觉得映射到本地的文件好麻烦，可以选择<code v-pre>push</code>到远程仓库。</p>
<p>❗ 需要提交的镜像如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:~<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE              COMMAND                  CREATED        STATUS          PORTS                                              NAMES
84b04bbb5c02   nginx              <span class="token string">"/docker-entrypoint.…"</span>   <span class="token number">6</span> days ago     Up <span class="token number">39</span> seconds   <span class="token number">0.0</span>.0.0:3344-<span class="token operator">></span><span class="token number">80</span>/tcp, :::3344-<span class="token operator">></span><span class="token number">80</span>/tcp              nginx
846fec372f81   mysql:5.7          <span class="token string">"docker-entrypoint.s…"</span>   <span class="token number">7</span> days ago     Up <span class="token number">39</span> seconds   <span class="token number">0</span>/tcp, <span class="token number">0.0</span>.0.0:3307-<span class="token operator">></span><span class="token number">3306</span>/tcp, :::3307-<span class="token operator">></span><span class="token number">3306</span>/tcp   mysql_beifena
f19e7fbc3d18   v2fly/v2fly-core   <span class="token string">"/usr/bin/v2ray -con…"</span>   <span class="token number">4</span> months ago   Up <span class="token number">40</span> seconds     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://sm.nsddd.top//typora/image-20220923202155083.png?mail:3293172751@qq.com" alt="image-20220923202155083"></p>
<h3 id="登陆" tabindex="-1"><a class="header-anchor" href="#登陆" aria-hidden="true">#</a> 登陆</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker login
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="mysql我们可以提交到同一个仓库-但是换个tag" tabindex="-1"><a class="header-anchor" href="#mysql我们可以提交到同一个仓库-但是换个tag" aria-hidden="true">#</a> mysql我们可以提交到同一个仓库，但是换个tag</h2>
<p>❗❗ <code v-pre>push</code> 到本地</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker commit -m "commit mysql:5.7 ubuntu" -a "xiongxinwei" 846fec372f81 xiongxinwei/mysql:5.7 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>❗❗ <code v-pre>tag</code>打标签</p>
<blockquote>
<p>我们把标签改为ubuntu，这样的话辨识度高，而且不需要创建多个仓库</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>tag xiongxinwei/mysql:5.7 3293172751/mysql5.7:ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>❗❗ <code v-pre>push</code>推送</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker push  3293172751/mysql5.7:ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


