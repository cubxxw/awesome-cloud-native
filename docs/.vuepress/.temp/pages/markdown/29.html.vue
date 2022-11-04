<template><div><h1 id="docker微服务实战" tabindex="-1"><a class="header-anchor" href="#docker微服务实战" aria-hidden="true">#</a> Docker微服务实战</h1>
<p>[toc]</p>
<h2 id="云原生" tabindex="-1"><a class="header-anchor" href="#云原生" aria-hidden="true">#</a> 云原生</h2>
<ul>
<li><a href="https://docker.nsddd.top/Cloud-Native-k8s/" target="_blank" rel="noopener noreferrer">云原生<ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>本地的微服务项目我们如何将其部署并且运行到 <code v-pre>docker</code> 上面，这或许就是 <code v-pre>docker</code> 的核心</p>
</div>
<p>我们本地有一个微服务项目，需要将其打包成镜像（使用<code v-pre>dockerfile</code>）</p>
<p>接下来我们就需要来进行 微服务实战操作了</p>
<blockquote>
<p>其实一些简单的案例不需要上 k8s ，后面的复杂的案例或许会用到 ~</p>
</blockquote>
<p><strong>步骤：</strong></p>
<ol>
<li>建 Module</li>
<li>改 Pom</li>
<li>写 yml</li>
<li>主启动</li>
<li>业务类</li>
</ol>
<h2 id="编写dockerfile" tabindex="-1"><a class="header-anchor" href="#编写dockerfile" aria-hidden="true">#</a> 编写dockerfile</h2>
<p>打包 <code v-pre>jar</code> 包，我们写一个 <code v-pre>dockerfile</code> ，最好两者在同一个目录下面，</p>
<details class="custom-container details"><summary>dockerfile内容</summary>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment"># 基础镜像使用 Java</span>
<span class="token instruction"><span class="token keyword">FROM</span> java:8</span>
<span class="token comment"># 作者</span>

<span class="token comment"># VOLUME 指定临时文件目录为 /tmp, 在主机 /var/lib/docker 目录下面创建临时文件并且连接容器的 /tmp</span>
<span class="token instruction"><span class="token keyword">VOLUME</span> /tmp</span>
<span class="token comment"># 将jar包添加到容器并改名 cub.jar</span>
<span class="token instruction"><span class="token keyword">ADD</span> maven-wrapper.jar cub.jar</span>
<span class="token comment"># 运行jar包</span>
<span class="token instruction"><span class="token keyword">RUN</span> bash -c <span class="token string">'touch /cub.jar'</span>]</span>
<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">"java"</span>,<span class="token string">"-jar"</span>,<span class="token string">"cub.jar"</span>]</span>
<span class="token comment"># 暴露6001端口作为微服务</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 6001</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>打包镜像：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build -t cub:1.0 .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>查看镜像：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221104123834352.png" alt="image-20221104123834352"></p>
<p>运行镜像就ok</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">-P</span> 57a3473097df
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="后期推送" tabindex="-1"><a class="header-anchor" href="#后期推送" aria-hidden="true">#</a> 后期推送~</h2>
<p>使用 <code v-pre>scp</code>或者 <code v-pre>push</code></p>
</div></template>


