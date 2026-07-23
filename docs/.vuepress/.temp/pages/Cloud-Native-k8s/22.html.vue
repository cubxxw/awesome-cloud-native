<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第22节-运行有状态应用" tabindex="-1"><a class="header-anchor" href="#第22节-运行有状态应用" aria-hidden="true">#</a> 第22节 运行有状态应用</h1>
<div><a href = '21.md' style='float:left'>⬆️上一节🔗  </a><a href = '23.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="运行有状态应用" tabindex="-1"><a class="header-anchor" href="#运行有状态应用" aria-hidden="true">#</a> 运行有状态应用</h2>
<p>以 <code v-pre>Mysql</code> 为例，在 <code v-pre>kubernetes</code> 集群中运行一个有状态的应用，部署数据库几乎覆盖了 <code v-pre>kubernetes</code> 中常见的对象和概念。</p>
<h2 id="创建mysql数据库" tabindex="-1"><a class="header-anchor" href="#创建mysql数据库" aria-hidden="true">#</a> 创建Mysql数据库</h2>
<h3 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /home/mysql -p<span class="token punctuation">;</span> <span class="token builtin class-name">cd</span> /home/mysql/ <span class="token punctuation">;</span> <span class="token function">touch</span> mysql-pod.yaml <span class="token operator">&amp;&amp;</span> <span class="token function">ls</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>创建命名空间，MySQL放入默认命名空间中：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create namespace dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="创建持久卷pv-用来存储mysql数据文件" tabindex="-1"><a class="header-anchor" href="#创建持久卷pv-用来存储mysql数据文件" aria-hidden="true">#</a> 创建持久卷PV，用来存储mysql数据文件</h3>
<p>定义一个容量大小为1GB的PV，挂载到 <code v-pre>/nfs/data/01</code> 目录，需手动创建该目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /root/mysql/nfs/data/01
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>编写 <code v-pre>mysql-pv.yaml</code> 文件内容，要创建的 <code v-pre>pv</code> 对象名称：pv-1gi</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 定义持久卷信息</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>    <span class="token comment"># pv是没有namespace属性的，它是一种跨namespace的共享资源</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pv<span class="token punctuation">-</span>1gi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany   <span class="token comment"># 存储类，具有相同存储类名称的pv和pvc才能进行绑定</span>
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /nfs/data/01
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.59.110
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建该PV对象：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create <span class="token parameter variable">-f</span> mysql-pv.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="配置环境变量" tabindex="-1"><a class="header-anchor" href="#配置环境变量" aria-hidden="true">#</a> 配置环境变量</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>apiV
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '21.md' style='float:left'>⬆️上一节🔗  </a><a href = '23.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://cubxxw.com/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


