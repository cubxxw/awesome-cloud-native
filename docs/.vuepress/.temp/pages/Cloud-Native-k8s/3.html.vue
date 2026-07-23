<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第3节-docker三驾马车" tabindex="-1"><a class="header-anchor" href="#第3节-docker三驾马车" aria-hidden="true">#</a> 第3节 docker三驾马车</h1>
<div><a href = '2.md' style='float:left'>⬆️上一节🔗  </a><a href = '4.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#docker-compose">Docker Compose</router-link><ul><li><router-link to="#使用">使用</router-link></li></ul></li><li><router-link to="#docker-machine">Docker Machine</router-link></li><li><router-link to="#docker-swarm">Docker Swarm</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> Docker Compose</h2>
<p><code v-pre>Docker Compose</code>是<code v-pre>Docker</code>官方编排（Orchestration）项目之一，负责快速的部署分布式应用。其代码目前在https://github.com/docker/compose上开源。</p>
<p>Compose 中有两个重要的概念：</p>
<ul>
<li>服务 (service)：一个应用的容器，实际上可以包括若干运行相同镜像的容器实例。</li>
<li>项目 (project)：由一组关联的应用容器组成的一个完整业务单元，在 docker-compose.yml 文件中定义。</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token operator">></span>docker-compose <span class="token parameter variable">--version</span>
<span class="token function">docker-compose</span> version <span class="token number">1.29</span>.2, build 5becea4c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>卸载请你自行卸载。</p>
</blockquote>
<h3 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h3>
<p>下面我们用 Python 来建立一个能够记录页面访问次数的 web 网站。 新建文件夹，在该目录中编写<code v-pre>app.py</code>文件。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> time
<span class="token keyword">import</span> redis
<span class="token keyword">from</span> flask <span class="token keyword">import</span> Flask

app <span class="token operator">=</span> Flask<span class="token punctuation">(</span>__name__<span class="token punctuation">)</span>
cache <span class="token operator">=</span> redis<span class="token punctuation">.</span>Redis<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">'redis'</span><span class="token punctuation">,</span> port<span class="token operator">=</span><span class="token number">6379</span><span class="token punctuation">)</span>
<span class="token comment"># cache是一个redis实例，我们可以使用它来存储和获取数据</span>

<span class="token keyword">def</span> <span class="token function">get_hit_count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    retries <span class="token operator">=</span> <span class="token number">5</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token keyword">try</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> cache<span class="token punctuation">.</span>incr<span class="token punctuation">(</span><span class="token string">'hits'</span><span class="token punctuation">)</span>
        <span class="token keyword">except</span> redis<span class="token punctuation">.</span>exceptions<span class="token punctuation">.</span>ConnectionError <span class="token keyword">as</span> exc<span class="token punctuation">:</span>
            <span class="token keyword">if</span> retries <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">:</span>
                <span class="token keyword">raise</span> exc
            retries <span class="token operator">-=</span> <span class="token number">1</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">)</span>
<span class="token comment"># 一个简单的路由，用来返回一个字符串</span>
<span class="token keyword">def</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    count <span class="token operator">=</span> get_hit_count<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">'Hello World! I have been seen {} times.\n'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">"__main__"</span><span class="token punctuation">:</span>
    app<span class="token punctuation">.</span>run<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">"0.0.0.0"</span><span class="token punctuation">,</span> debug<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接着编写<code v-pre>Dockerfile</code>文件，内容为:</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> python:3.6-alpine</span>
<span class="token instruction"><span class="token keyword">ADD</span> . /code</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /code</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip install redis flask</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"python"</span>, <span class="token string">"app.py"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后是编写<code v-pre>docker-compose.yml</code>文件，这个是 Compose 使用的主模板文件。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web</span><span class="token punctuation">:</span>    
  <span class="token key atrule">build</span><span class="token punctuation">:</span> .    
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>    
  <span class="token punctuation">-</span> <span class="token string">"5000:5000"</span>
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
       <span class="token punctuation">-</span> .<span class="token punctuation">:</span>/code
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>    
  <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">"redis:alpine"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行compose项目</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker-compose up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>此时访问本地 5000 端口，每次刷新页面，计数就会加 1。</p>
</blockquote>
<h2 id="docker-machine" tabindex="-1"><a class="header-anchor" href="#docker-machine" aria-hidden="true">#</a> Docker Machine</h2>
<p><a href="https://docs.docker.com/machine/overview/" target="_blank" rel="noopener noreferrer"><code v-pre>Docker Machine</code><ExternalLinkIcon/></a>是<code v-pre>Docker</code>官方编排（Orchestration）项目之一，负责在多种平台上快速安装 Docker 环境。</p>
<p><code v-pre>Docker Machine</code>项目基于<code v-pre>Go</code>语言实现，目前在<a href="https://github.com/docker/machine" target="_blank" rel="noopener noreferrer">Github<ExternalLinkIcon/></a>上进行维护。</p>
<p><code v-pre>Docker Machine</code>是 Docker 官方提供的一个工具，它可以帮助我们在远程的机器上安装 Docker，或者在虚拟机 host 上直接安装虚拟机并在虚拟机中安装 Docker。我们还可以通过 <code v-pre>docker-machine</code>命令来管理这些虚拟机和 Docker。</p>
<h2 id="docker-swarm" tabindex="-1"><a class="header-anchor" href="#docker-swarm" aria-hidden="true">#</a> Docker Swarm</h2>
<p><code v-pre>Swarm</code>是使用<a href="https://github.com/docker/swarmkit/" target="_blank" rel="noopener noreferrer">SwarmKit<ExternalLinkIcon/></a>构建的 Docker 引擎内置（原生）的集群管理和编排工具。<code v-pre>Docker Swarm</code>是 Docker 官方三剑客项目之一，提供 Docker 容器集群服务，是 Docker 官方对容器云生态进行支持的核心方案。</p>
<p>使用它，用户可以将多个 Docker 主机封装为单个大型的虚拟 Docker 主机，快速打造一套容器云平台。Swarm mode 内置 kv 存储功能，提供了众多的新特性，比如：具有容错能力的去中心化设计、内置服务发现、负载均衡、路由网格、动态伸缩、滚动更新、安全传输等。使得 Docker 原生的 Swarm 集群具备与<code v-pre>Mesos</code>、<code v-pre>Kubernetes</code>竞争的实力。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '2.md' style='float:left'>⬆️上一节🔗  </a><a href = '4.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


