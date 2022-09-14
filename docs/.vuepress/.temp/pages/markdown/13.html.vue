<template><div><h1 id="使用hub-docker" tabindex="-1"><a class="header-anchor" href="#使用hub-docker" aria-hidden="true">#</a> 使用hub.docker</h1>
<h2 id="地址" tabindex="-1"><a class="header-anchor" href="#地址" aria-hidden="true">#</a> <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">地址<ExternalLinkIcon/></a></h2>
<p>[toc]</p>
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
</div></template>


