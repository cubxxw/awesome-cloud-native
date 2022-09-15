<template><div><h1 id="docker帮助启动类命令" tabindex="-1"><a class="header-anchor" href="#docker帮助启动类命令" aria-hidden="true">#</a> docker帮助启动类命令</h1>
<p>[toc]</p>
<h3 id="帮助启动类命令" tabindex="-1"><a class="header-anchor" href="#帮助启动类命令" aria-hidden="true">#</a> 帮助启动类命令</h3>
<ol>
<li>
<p>启动docker</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemcl start docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>停止docker</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl stop docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>重启docker</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查看docker状态</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl status docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>开机启动（没有配置的话，每次都要手动开机）</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl enable docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查看docker概要信息</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查看docker整体帮助文档</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查看docker命令帮助文档</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker 具体命令 --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<p><strong>统计容器信息–参考Linux统计磁盘</strong></p>
<ul>
<li>Linux</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>df -h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>Docker</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker system df
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/09/3zZaQufpxAGB4hl.png" alt="image-20220509183105087"></p>
<h3 id="docker面试题" tabindex="-1"><a class="header-anchor" href="#docker面试题" aria-hidden="true">#</a> docker面试题</h3>
<p><strong>谈谈docker虚悬镜像是什么</strong></p>
<blockquote>
<p>仓库名、标签都是<code v-pre>&lt;none&gt;</code>镜像，俗称虚玄镜像dangling image,这样的仓库没什么用，有时候docker构建时候出问题，建议删除</p>
</blockquote>
</div></template>


