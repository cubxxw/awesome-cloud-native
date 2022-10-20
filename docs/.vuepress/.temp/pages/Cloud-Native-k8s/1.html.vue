<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第1节-云平台" tabindex="-1"><a class="header-anchor" href="#第1节-云平台" aria-hidden="true">#</a> 第1节 云平台</h1>
<div><a href = '0.md' style='float:left'>⬆️上一节🔗  </a><a href = '2.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#什么是云平台">什么是云平台</router-link></li><li><router-link to="#安装服务器并且远程登陆">安装服务器并且远程登陆</router-link><ul><li><router-link to="#nginx安装和远程访问">nginx安装和远程访问</router-link></li><li><router-link to="#启动nginx">启动nginx</router-link></li><li><router-link to="#修改nginx配置端口">修改nginx配置端口</router-link></li></ul></li><li><router-link to="#私有网络vpc">私有网络VPC</router-link><ul><li><router-link to="#vpc-私有网络、专用网络-划分网段">VPC（私有网络、专用网络）划分网段</router-link></li></ul></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="什么是云平台" tabindex="-1"><a class="header-anchor" href="#什么是云平台" aria-hidden="true">#</a> 什么是云平台</h2>
<blockquote>
<p>百度百科介绍⬇️</p>
</blockquote>
<p>云计算平台也称为<a href="https://baike.baidu.com/item/%E4%BA%91%E5%B9%B3%E5%8F%B0/3963188?fromModule=lemma_inlink" target="_blank" rel="noopener noreferrer">云平台<ExternalLinkIcon/></a>，是指基于硬件资源和软件资源的服务，提供计算、网络和存储能力。云计算平台可以划分为3类：以<a href="https://baike.baidu.com/item/%E6%95%B0%E6%8D%AE%E5%AD%98%E5%82%A8/9827490?fromModule=lemma_inlink" target="_blank" rel="noopener noreferrer">数据存储<ExternalLinkIcon/></a>为主的存储型云平台，以数据处理为主的计算型云平台以及计算和数据存储处理兼顾的<a href="https://baike.baidu.com/item/%E7%BB%BC%E5%90%88/3374369?fromModule=lemma_inlink" target="_blank" rel="noopener noreferrer">综合<ExternalLinkIcon/></a>云计算<a href="https://baike.baidu.com/item/%E5%B9%B3%E5%8F%B0/1064049?fromModule=lemma_inlink" target="_blank" rel="noopener noreferrer">平台<ExternalLinkIcon/></a>。</p>
<h2 id="安装服务器并且远程登陆" tabindex="-1"><a class="header-anchor" href="#安装服务器并且远程登陆" aria-hidden="true">#</a> 安装服务器并且远程登陆</h2>
<ul>
<li><a href="https://github.com/3293172751/awesome-cs-course/blob/master/linux/README.md" target="_blank" rel="noopener noreferrer">Linux教程<ExternalLinkIcon/></a></li>
</ul>
<h3 id="nginx安装和远程访问" tabindex="-1"><a class="header-anchor" href="#nginx安装和远程访问" aria-hidden="true">#</a> nginx安装和远程访问</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum install nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>本地<a href="https://so.csdn.net/so/search?q=yum&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">yum<ExternalLinkIcon/></a>源中没有我们想要的nginx，那么我们就需要下载新的<strong>CentOS-Base.repo</strong>。</p>
<p><strong>解决步骤</strong>：</p>
<p>备份原来的<strong>CentOS-Base.repo</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mv</span> /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak20200321
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下载新的<strong>CentOS-Base.repo</strong> 到<code v-pre>/etc/yum.repos.d/</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">####centos 6版本</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
 
<span class="token comment">####centos 7版本  --- 我是用的版本，服务器大多数默认是这个~</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
 
<span class="token comment">####centos 8版本</span>
<span class="token function">wget</span> <span class="token parameter variable">-O</span> /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行yum makecache：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum makecache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>作用：就是把服务器的包信息下载到本地电脑缓存起来，makecache建立一个缓存，以后用install时就在缓存中搜索，提高了速度。</p>
</blockquote>
<p><strong>安装epel源：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> epel-release 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>安装NGINX服务：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token parameter variable">-y</span> <span class="token function">install</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="启动nginx" tabindex="-1"><a class="header-anchor" href="#启动nginx" aria-hidden="true">#</a> 启动nginx</h3>
<blockquote>
<p>当前的<code v-pre>ip</code>地址：<em>43.142.124.85</em></p>
</blockquote>
<p><strong>启动nginx服务：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start nginx
<span class="token function">whereis</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>远程访问即可 <code v-pre>43.142.124.85:80</code></p>
</blockquote>
<h3 id="修改nginx配置端口" tabindex="-1"><a class="header-anchor" href="#修改nginx配置端口" aria-hidden="true">#</a> 修改nginx配置端口</h3>
<ol>
<li>修改端口为<code v-pre>88</code></li>
<li>调整安全组，发放<code v-pre>88</code>端口</li>
</ol>
<blockquote>
<p>远程访问即可 <code v-pre>43.142.124.85:88</code></p>
</blockquote>
<h2 id="私有网络vpc" tabindex="-1"><a class="header-anchor" href="#私有网络vpc" aria-hidden="true">#</a> 私有网络VPC</h2>
<p>我们都知道云服务器分为公网IP和私有IP</p>
<p><strong>那么私有IP的存在主要是用于集群，在同一个集群中用私网IP是不会走公网的流量，而且速度更快~</strong></p>
<p>⬇️ 下面就可以引入VPC了</p>
<h3 id="vpc-私有网络、专用网络-划分网段" tabindex="-1"><a class="header-anchor" href="#vpc-私有网络、专用网络-划分网段" aria-hidden="true">#</a> VPC（私有网络、专用网络）划分网段</h3>
<ul>
<li><a href="https://www.sojson.com/convert/subnetmask.html" target="_blank" rel="noopener noreferrer">子网计算<ExternalLinkIcon/></a></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>输入IP <span class="token number">192</span> <span class="token number">168</span> <span class="token number">0</span> <span class="token number">1</span> 掩码位 <span class="token number">16</span> 
点格式十进制 <span class="token number">192</span> <span class="token number">168</span> <span class="token number">0</span> <span class="token number">1</span> 
或 二进制 <span class="token number">11000000</span> <span class="token number">10101000</span> 00000000 00000001
<span class="token comment"># 前面的11000000 10101000不变，后面的00000000 00000000 到11111111 11111111	</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>IP组播地址范围</p>
<ul>
<li>所有的多播地址可以很容易被认出，因为同位模式“1110”开始。</li>
<li>224.0.0.0 - 224.0.0.255知名多播地址，控制通道</li>
<li>224.0.1.0 - 238.255.255.255全球范围的（互联网宽）组播地址</li>
<li>239.0.0.0 - 239.255.255.255本地多播地址</li>
</ul>
<p><img src="http://sm.nsddd.top/smimage-20221018091621531.png" alt="image-20221018091621531"></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '0.md' style='float:left'>⬆️上一节🔗  </a><a href = '2.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://nsddd.top/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


