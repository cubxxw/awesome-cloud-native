<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第75节-openim-离线安装设计" tabindex="-1"><a class="header-anchor" href="#第75节-openim-离线安装设计" aria-hidden="true">#</a> 第75节 OpenIM 离线安装设计</h1>
<div><a href = '74.md' style='float:left'>⬆️上一节🔗  </a><a href = '76.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h1 id="离线安装" tabindex="-1"><a class="header-anchor" href="#离线安装" aria-hidden="true">#</a> 离线安装</h1>
<h3 id="测试环境" tabindex="-1"><a class="header-anchor" href="#测试环境" aria-hidden="true">#</a> 测试环境</h3>
<p>验证离线安装的环境是否正确：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ubuntu@VM-0-14-ubuntu:~/workspaces$ <span class="token function">docker</span> version
Client: Docker Engine - Community
 Version:           <span class="token number">20.10</span>.14
 API version:       <span class="token number">1.41</span>
 Go version:        go1.16.15
 Git commit:        a224086
 Built:             Thu Mar <span class="token number">24</span> 01:47:57 <span class="token number">2022</span>
 OS/Arch:           linux/amd64
 Context:           default
 Experimental:      <span class="token boolean">true</span>

Server: Docker Engine - Community
 Engine:
  Version:          <span class="token number">20.10</span>.14
  API version:      <span class="token number">1.41</span> <span class="token punctuation">(</span>minimum version <span class="token number">1.12</span><span class="token punctuation">)</span>
  Go version:       go1.16.15
  Git commit:       87a90dc
  Built:            Thu Mar <span class="token number">24</span> 01:45:46 <span class="token number">2022</span>
  OS/Arch:          linux/amd64
  Experimental:     <span class="token boolean">false</span>
 containerd:
  Version:          <span class="token number">1.5</span>.11
  GitCommit:        3df54a852345ae127d1fa3092b95168e4a88e2f8
 runc:
  Version:          <span class="token number">1.0</span>.3
  GitCommit:        v1.0.3-0-gf46b6ba
 docker-init:
  Version:          <span class="token number">0.19</span>.0
  GitCommit:        de40ad0
ubuntu@VM-0-14-ubuntu:~/workspaces$ <span class="token function">docker-compose</span> version
<span class="token function">docker-compose</span> version <span class="token number">1.24</span>.1, build 4667896b
docker-py version: <span class="token number">3.7</span>.3
CPython version: <span class="token number">3.6</span>.8
OpenSSL version: OpenSSL <span class="token number">1.1</span>.0j  <span class="token number">20</span> Nov <span class="token number">2018</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装包准备" tabindex="-1"><a class="header-anchor" href="#安装包准备" aria-hidden="true">#</a> 安装包准备</h3>
<p>镜像下载：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> <span class="token operator">&lt;</span>http://59.36.173.89:9090/api/v1/buckets/app/objects/download?prefix<span class="token operator">=</span>ZG9ja2Vy56a757q/5a6J6KOFLnJhcg<span class="token operator">==</span><span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>安装的逻辑：</strong> 1. 可以使用 docker 安装 2. 使用 docker-compopse</p>
<h3 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> docker-compose</h3>
<ol>
<li>先把im的docker-compose配置注释掉，用docker安装组件。</li>
<li>再源码编译im server，启动im</li>
</ol>
<h2 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h2>
<h3 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> mysql</h3>
<blockquote>
<p>在线的环境准备</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token parameter variable">--name</span> mysql <span class="token parameter variable">-v</span> /my/own/datadir:/var/lib/mysql <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>password <span class="token parameter variable">-d</span> mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装mongodb" tabindex="-1"><a class="header-anchor" href="#安装mongodb" aria-hidden="true">#</a> 安装MongoDB</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">27017</span>:27017 <span class="token parameter variable">--name</span> mongo <span class="token parameter variable">-v</span> /my/own/datadir:/data/db <span class="token parameter variable">-e</span> <span class="token assign-left variable">MONGO_INITDB_ROOT_USERNAME</span><span class="token operator">=</span>root <span class="token parameter variable">-e</span> <span class="token assign-left variable">MONGO_INITDB_ROOT_PASSWORD</span><span class="token operator">=</span>password <span class="token punctuation">\</span><span class="token punctuation">\</span>-d mongo:4.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装-redis" tabindex="-1"><a class="header-anchor" href="#安装-redis" aria-hidden="true">#</a> 安装 redis</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token parameter variable">--name</span> redis <span class="token parameter variable">-v</span> /my/own/datadir:/data <span class="token parameter variable">-e</span> <span class="token assign-left variable">REDIS_PASSWORD</span><span class="token operator">=</span>password <span class="token parameter variable">-d</span> redis:5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装zookeeper" tabindex="-1"><a class="header-anchor" href="#安装zookeeper" aria-hidden="true">#</a> 安装Zookeeper:</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run  <span class="token parameter variable">-p</span> <span class="token number">2181</span>:2181 <span class="token parameter variable">--name</span> zookeeper <span class="token parameter variable">-d</span> wombat/zookeeper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装kafka" tabindex="-1"><a class="header-anchor" href="#安装kafka" aria-hidden="true">#</a> 安装Kafka:</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">9092</span>:9092 <span class="token parameter variable">--name</span> kafka <span class="token parameter variable">--link</span> zookeeper <span class="token parameter variable">-e</span> <span class="token assign-left variable">KAFKA_ADVERTISED_LISTENERS</span><span class="token operator">=</span>PLAINTEXT://:9092 <span class="token parameter variable">-e</span> <span class="token assign-left variable">KAFKA_ZOOKEEPER_CONNECT</span><span class="token operator">=</span>zookeeper:2181 <span class="token parameter variable">-e</span> <span class="token assign-left variable">KAFKA_LISTENERS</span><span class="token operator">=</span>PLAINTEXT://:9092 <span class="token parameter variable">-d</span> wurstmeister/kafka
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装etcd" tabindex="-1"><a class="header-anchor" href="#安装etcd" aria-hidden="true">#</a> 安装Etcd:</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">2379</span>:2379 <span class="token parameter variable">-p</span> <span class="token number">2380</span>:2380 <span class="token parameter variable">--name</span> etcd <span class="token parameter variable">-d</span> quay.io/coreos/etcd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装minio" tabindex="-1"><a class="header-anchor" href="#安装minio" aria-hidden="true">#</a> 安装MinIO:</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token parameter variable">--name</span> minio <span class="token parameter variable">-v</span> /mnt/data:/data <span class="token parameter variable">-e</span> <span class="token string">"MINIO_ROOT_USER=<span class="token variable">${<span class="token environment constant">USER</span>}</span>"</span> <span class="token parameter variable">-e</span> <span class="token string">"MINIO_ROOT_PASSWORD=<span class="token variable">${PASSWORD}</span>"</span> <span class="token parameter variable">-d</span> minio/minio server /data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="离线安装中间件" tabindex="-1"><a class="header-anchor" href="#离线安装中间件" aria-hidden="true">#</a> <strong>离线安装中间件</strong></h2>
<ol>
<li>scp images.tar.gz到服务器， 并且解压文件</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> ./images.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>加载每个镜像到docker里面</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> etcd.tar  grafana.tar  kafka.tar  minio.tar  mongo.tar  mysql.tar  node-exporter.tar  promethues.tar  redis.tar  zookeeper.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>docker 本地镜像导入：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./etcd.tar<span class="token punctuation">;</span>
 <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./grafana.tar<span class="token punctuation">;</span>
 <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./kafka.tar<span class="token punctuation">;</span>
 <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./minio.tar<span class="token punctuation">;</span>
 <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./mongo.tar<span class="token punctuation">;</span>
 <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./mysql.tar<span class="token punctuation">;</span>
 <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./node-exporter.tar<span class="token punctuation">;</span>
 <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./promethues.tar<span class="token punctuation">;</span>
 <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./redis.tar<span class="token punctuation">;</span>
 <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./zookeeper.tar<span class="token punctuation">;</span>
<span class="token comment"># ---</span>
<span class="token comment"># OR -</span>
<span class="token keyword">for</span> <span class="token for-or-select variable">img</span> <span class="token keyword">in</span> etcd.tar grafana.tar kafka.tar minio.tar mongo.tar mysql.tar node-exporter.tar promethues.tar redis.tar zookeeper.tar<span class="token punctuation">;</span> 
<span class="token keyword">do</span>
    <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./<span class="token variable">$img</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>验证导入</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">image</span> <span class="token keyword">in</span> etcd grafana kafka minio mongo mysql node-exporter prometheus redis zookeeper<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token function">docker</span> images <span class="token operator">|</span> <span class="token function">grep</span> <span class="token variable">$image</span> <span class="token operator">></span> /dev/null
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$image</span> 镜像导入失败!"</span>
    <span class="token keyword">else</span>
        <span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">$image</span> 镜像导入成功!"</span>
    <span class="token keyword">fi</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="编译" tabindex="-1"><a class="header-anchor" href="#编译" aria-hidden="true">#</a> 编译</h2>
<p>https://github.com/OpenIMSDK/Open-IM-Server-Enterprise.git</p>
<p><strong>中间件数据库启动</strong></p>
<ol>
<li>
<p>进入 <code v-pre>Open-IM-Server-Enterprise</code> 目录下把 <code v-pre>docker-compose.yaml</code> 替换成该文档目录下的 <code v-pre>docker-compose.yaml</code></p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>git clone <span class="token operator">-</span>b v2<span class="token punctuation">.</span><span class="token number">3</span><span class="token punctuation">.</span>0release <span class="token operator">&lt;</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>OpenIMSDK<span class="token operator">/</span>Open<span class="token operator">-</span><span class="token constant">IM</span><span class="token operator">-</span>Server<span class="token operator">-</span>Enterprise<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>启动中间件数据库</p>
</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker-compose</span> up -d<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="启动im本体" tabindex="-1"><a class="header-anchor" href="#启动im本体" aria-hidden="true">#</a> <strong>启动IM本体</strong></h3>
<ol>
<li>启动</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> ./start_all.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>检查是否成功</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> ./check_all.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="启动其他组件" tabindex="-1"><a class="header-anchor" href="#启动其他组件" aria-hidden="true">#</a> <strong>启动其他组件</strong></h3>
<ol>
<li>启动其他组件如加密，open-im-enterprise，按之前文档来启停。</li>
</ol>
<h2 id="音视频二进制" tabindex="-1"><a class="header-anchor" href="#音视频二进制" aria-hidden="true">#</a> 音视频二进制</h2>
<h2 id="demo-安装下载" tabindex="-1"><a class="header-anchor" href="#demo-安装下载" aria-hidden="true">#</a> demo 安装下载</h2>
<p><strong>Edit on github</strong></p>
<h3 id="直接下载app" tabindex="-1"><a class="header-anchor" href="#直接下载app" aria-hidden="true">#</a> <strong><a href="https://doc.rentsoft.cn/#/flutter_v2/sdk_integrate/development?id=%E7%9B%B4%E6%8E%A5%E4%B8%8B%E8%BD%BDapp" target="_blank" rel="noopener noreferrer">直接下载app<ExternalLinkIcon/></a></strong></h3>
<p>https://www.pgyer.com/app/qrcode/OpenIM</p>
<p>可选择替换服务器地址为自己搭建的服务器地址，默认地址为官方服务器地址</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '74.md' style='float:left'>⬆️上一节🔗  </a><a href = '76.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


