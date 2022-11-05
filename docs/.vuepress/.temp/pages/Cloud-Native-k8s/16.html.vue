<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第16节-treafik-lb" tabindex="-1"><a class="header-anchor" href="#第16节-treafik-lb" aria-hidden="true">#</a> 第16节 Treafik LB</h1>
<div><a href = '15.md' style='float:left'>⬆️上一节🔗  </a><a href = '17.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#介绍">介绍</router-link></li><li><router-link to="#安装">安装</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<ul>
<li><a href="https://github.com/traefik/traefik" target="_blank" rel="noopener noreferrer">开源地址<ExternalLinkIcon/></a></li>
<li><a href="https://traefik.io/" target="_blank" rel="noopener noreferrer">官方<ExternalLinkIcon/></a></li>
</ul>
<p>Treafik 是一个为了让部署微服务更加便捷而诞生的现代HTTP反向代理、负载均衡工具。 它支持多种后台 (<a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer">Docker<ExternalLinkIcon/></a>, <a href="https://docs.docker.com/swarm" target="_blank" rel="noopener noreferrer">Swarm<ExternalLinkIcon/></a>, <a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer">Kubernetes<ExternalLinkIcon/></a>, <a href="https://mesosphere.github.io/marathon/" target="_blank" rel="noopener noreferrer">Marathon<ExternalLinkIcon/></a>, <a href="https://github.com/apache/mesos" target="_blank" rel="noopener noreferrer">Mesos<ExternalLinkIcon/></a>, <a href="https://www.consul.io/" target="_blank" rel="noopener noreferrer">Consul<ExternalLinkIcon/></a>, <a href="https://coreos.com/etcd/" target="_blank" rel="noopener noreferrer">Etcd<ExternalLinkIcon/></a>, <a href="https://zookeeper.apache.org/" target="_blank" rel="noopener noreferrer">Zookeeper<ExternalLinkIcon/></a>, <a href="https://github.com/boltdb/bolt" target="_blank" rel="noopener noreferrer">BoltDB<ExternalLinkIcon/></a>, Rest API, file…) 来自动化、动态的应用它的配置文件设置。</p>
<p><img src="http://sm.nsddd.top/smarchitecture.png" alt="结构"></p>
<details class="custom-container details"><summary>Nginx和Traefik横向对比</summary>
<p><code v-pre>Nginx</code> 和 <code v-pre>Traefik</code> 横向对比：</p>
<p><img src="http://sm.nsddd.top/smimage-20221031155941634.png" alt="image-20221031155941634"></p>
</details>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<details class="custom-container details"><summary>安装方式</summary>
<p>treafik支持下面几种安装的方式：</p>
<ul>
<li>最简单的方法： 从 <a href="https://github.com/containous/traefik/releases" target="_blank" rel="noopener noreferrer">版本下载<ExternalLinkIcon/></a> 页面下载最新的可执行文件并以这个 <a href="https://raw.githubusercontent.com/containous/traefik/master/traefik.sample.toml" target="_blank" rel="noopener noreferrer">示例配置文件<ExternalLinkIcon/></a> 运行：</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>./traefik <span class="token parameter variable">--configFile</span><span class="token operator">=</span>traefik.toml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>通过Docker镜像：</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 <span class="token parameter variable">-p</span> <span class="token number">80</span>:80 <span class="token parameter variable">-v</span> <span class="token environment constant">$PWD</span>/traefik.toml:/etc/traefik/traefik.toml traefik
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>通过源码编译：</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/containous/traefik
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '15.md' style='float:left'>⬆️上一节🔗  </a><a href = '17.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


