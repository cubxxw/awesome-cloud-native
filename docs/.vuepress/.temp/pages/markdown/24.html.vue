<template><div><h1 id="dockerfile解析" tabindex="-1"><a class="header-anchor" href="#dockerfile解析" aria-hidden="true">#</a> DockerFile解析</h1>
<nav class="table-of-contents"><ul><li><router-link to="#需求">需求</router-link></li><li><router-link to="#dockerfile">DockerFile</router-link></li><li><router-link to="#应用软件的角度">应用软件的角度</router-link></li><li><router-link to="#dockerfile内容基础">dockerfile内容基础</router-link></li><li><router-link to="#docker执行dockerfile的流程">docker执行dockerfile的流程</router-link></li><li><router-link to="#构建步骤">构建步骤</router-link></li></ul></nav>
<p>[toc]</p>
<h2 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h2>
<p><strong>我们在前面学习镜像的时候，不含有<code v-pre>vim/ifconfig</code>等命令，所以我们需要重新按照那些命令</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>对于简单的可能会是一个很好的选择，但是对于随时变化的镜像来说，特别麻烦</p>
</blockquote>
<p><strong>可不可以一次性搞定？</strong></p>
<blockquote>
<p>某种镜像的增强，给我<code v-pre>list</code>做个清单，后续我加入任何功能，直接在list单子里面run，相当于多次提交</p>
<p><strong>一次性添加，一次性成型</strong></p>
</blockquote>
<h2 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> DockerFile</h2>
<p><strong>dockerfile是用来构建docker镜像的文本文件，是由一条条构建镜像所需要的指令和参数构成的脚本</strong></p>
<h2 id="应用软件的角度" tabindex="-1"><a class="header-anchor" href="#应用软件的角度" aria-hidden="true">#</a> 应用软件的角度</h2>
<ul>
<li>dockerfile是软件原材料（写需要的东西）</li>
<li>docker镜像是软件的交付品</li>
<li>docker容器则可以认为是镜像的运行态，也即依照镜像运行的容器实例</li>
</ul>
<p><img src="@source/markdown/images/JqBckovlsptOPSE.jpg" alt="graphic"></p>
<h2 id="dockerfile内容基础" tabindex="-1"><a class="header-anchor" href="#dockerfile内容基础" aria-hidden="true">#</a> dockerfile内容基础</h2>
<ul>
<li>每条指令必须为<strong>大写字母</strong>并且后至少有一个参数</li>
<li>指令按照从上到下，顺序执行</li>
<li><code v-pre>#</code>表示注释</li>
<li>每条指令都会创建一个新的镜像层并对镜像进行提交</li>
</ul>
<h2 id="docker执行dockerfile的流程" tabindex="-1"><a class="header-anchor" href="#docker执行dockerfile的流程" aria-hidden="true">#</a> docker执行dockerfile的流程</h2>
<ol>
<li>docker从基础镜像中运行一个容器</li>
<li>执行一条指令并对容器做出修改</li>
<li>执行类似docker commit的操作提交一个新的镜像层</li>
<li>docker再基于刚提交的镜像运行一个新的容器</li>
<li>执行dockerfile中的下一条指令直到所有指令都执行完毕</li>
</ol>
<h2 id="构建步骤" tabindex="-1"><a class="header-anchor" href="#构建步骤" aria-hidden="true">#</a> 构建步骤</h2>
<ol>
<li>
<p>编写dockerfile文件</p>
</li>
<li>
<p>docker build创建镜像</p>
</li>
<li>
<p>docker run依照镜像运行容器实例</p>
</li>
</ol>
</div></template>


