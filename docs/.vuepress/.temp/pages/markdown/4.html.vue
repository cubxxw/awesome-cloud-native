<template><div><h1 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装" aria-hidden="true">#</a> docker安装</h1>
<p>[toc]</p>
<h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker" aria-hidden="true">#</a> 安装docker</h2>
<ul>
<li>
<p>[x] <a href="https://hub.docker.com/" target="_blank" rel="noopener noreferrer">docker镜像仓库<ExternalLinkIcon/></a></p>
</li>
<li>
<p>[x] <a href="https://docs.docker.com/" target="_blank" rel="noopener noreferrer">docker官网文档<ExternalLinkIcon/></a></p>
</li>
</ul>
<hr>
<p><strong>docker依赖于Linux内核，因此其它系统要部署必须要安装一个虚拟Linux环境</strong></p>
<p><strong>注意版本。查看当前linux的内核版本号</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/hyerledgerFabric/fabric-samples/first-network# uname -r
5.13.0-40-generic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker的基本组成" tabindex="-1"><a class="header-anchor" href="#docker的基本组成" aria-hidden="true">#</a> docker的基本组成</h2>
<ul>
<li><strong>镜像（image)</strong></li>
<li><strong>容器（container)</strong></li>
<li><strong>仓库（repository）</strong></li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code>java
<span class="token class-name">Book</span> b1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Book</span> b2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Book</span> b3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>镜像就是上面的Book，java叫类模板</li>
<li>容器就是new Book()是经过同一份镜像new出的不同实例对象</li>
<li>仓库是集中存放镜像的地方，在hub.docker.com中有很多镜像</li>
</ol>
<blockquote>
<ul>
<li>
<p>即一个镜像可以创建出很多个docker容器</p>
</li>
<li>
<p>镜像相当于root文件系统</p>
</li>
<li>
<p>可以把容器想象为一个简易版的linux环境（包括用户权限、进程空间、用户空间和网络空间）和运行在其中的应用程序</p>
</li>
</ul>
</blockquote>
<p><img src="https://s2.loli.net/2022/05/08/jM4BQrA2tPp5NDo.png" alt="image-20220508140536297"><strong>officaial image是官方的镜像</strong></p>
<blockquote>
<p>类似于github，有公开仓库（public）和私有（private）两种形式</p>
</blockquote>
<p>最大的公开仓库是<strong>docker hub(https://hub.docker.com)</strong></p>
<p>国内也有公开仓库如阿里云、网易云。</p>
<p><strong>我们可以把镜像发布到仓库中，需要的时候再从仓库中拉取就可以了</strong></p>
<h2 id="win下安装docker" tabindex="-1"><a class="header-anchor" href="#win下安装docker" aria-hidden="true">#</a> win下安装docker</h2>
<ol>
<li>官网上或者GitHub上选择合适的<code v-pre>docker</code>版本</li>
<li>安装docker</li>
<li>打开docker</li>
</ol>
<p><strong>打开docker有两种方式：</strong></p>
<ul>
<li>你可以选择在docker的应用中打开</li>
<li>或者是对我来说不需要应用直接就在命令行中打开</li>
</ul>
<p><img src="https://sm.nsddd.top//typora/image-20220917104645408.png?mail:3293172751@qq.com" alt="image-20220917104645408"></p>
<h2 id="docker在window下面安装mysql" tabindex="-1"><a class="header-anchor" href="#docker在window下面安装mysql" aria-hidden="true">#</a> docker在window下面安装MySQL</h2>
</div></template>


