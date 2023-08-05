import{_ as o,r,o as l,c as t,a,b as s,w as p,e as n,d}from"./app.ee8200d6.js";const c={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},m=n("author"),v=a("h1",{id:"\u7B2C75\u8282-openim-\u79BB\u7EBF\u5B89\u88C5\u8BBE\u8BA1",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#\u7B2C75\u8282-openim-\u79BB\u7EBF\u5B89\u88C5\u8BBE\u8BA1","aria-hidden":"true"},"#"),n(" \u7B2C75\u8282 OpenIM \u79BB\u7EBF\u5B89\u88C5\u8BBE\u8BA1")],-1),b=a("div",null,[a("a",{href:"74.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),a("a",{href:"76.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),k=a("br",null,null,-1),h=n("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),g={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},f=n("sealos"),_=n("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),x={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},E=n("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),y=n("\u3002Myblog:"),O={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},S=n("http://nsddd.top"),w=d(`<hr><p>[TOC]</p><h1 id="\u79BB\u7EBF\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u79BB\u7EBF\u5B89\u88C5" aria-hidden="true">#</a> \u79BB\u7EBF\u5B89\u88C5</h1><h3 id="\u6D4B\u8BD5\u73AF\u5883" tabindex="-1"><a class="header-anchor" href="#\u6D4B\u8BD5\u73AF\u5883" aria-hidden="true">#</a> \u6D4B\u8BD5\u73AF\u5883</h3><p>\u9A8C\u8BC1\u79BB\u7EBF\u5B89\u88C5\u7684\u73AF\u5883\u662F\u5426\u6B63\u786E\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ubuntu@VM-0-14-ubuntu:~/workspaces$ <span class="token function">docker</span> version
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5B89\u88C5\u5305\u51C6\u5907" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5\u5305\u51C6\u5907" aria-hidden="true">#</a> \u5B89\u88C5\u5305\u51C6\u5907</h3><p>\u955C\u50CF\u4E0B\u8F7D\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">wget</span> <span class="token operator">&lt;</span>http://59.36.173.89:9090/api/v1/buckets/app/objects/download?prefix<span class="token operator">=</span>ZG9ja2Vy56a757q/5a6J6KOFLnJhcg<span class="token operator">==</span><span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u5B89\u88C5\u7684\u903B\u8F91\uFF1A</strong> 1. \u53EF\u4EE5\u4F7F\u7528 docker \u5B89\u88C5 2. \u4F7F\u7528 docker-compopse</p><h3 id="docker-compose" tabindex="-1"><a class="header-anchor" href="#docker-compose" aria-hidden="true">#</a> docker-compose</h3><ol><li>\u5148\u628Aim\u7684docker-compose\u914D\u7F6E\u6CE8\u91CA\u6389\uFF0C\u7528docker\u5B89\u88C5\u7EC4\u4EF6\u3002</li><li>\u518D\u6E90\u7801\u7F16\u8BD1im server\uFF0C\u542F\u52A8im</li></ol><h2 id="\u73AF\u5883\u51C6\u5907" tabindex="-1"><a class="header-anchor" href="#\u73AF\u5883\u51C6\u5907" aria-hidden="true">#</a> \u73AF\u5883\u51C6\u5907</h2><h3 id="mysql" tabindex="-1"><a class="header-anchor" href="#mysql" aria-hidden="true">#</a> mysql</h3><blockquote><p>\u5728\u7EBF\u7684\u73AF\u5883\u51C6\u5907</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token parameter variable">--name</span> mysql <span class="token parameter variable">-v</span> /my/own/datadir:/var/lib/mysql <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>password <span class="token parameter variable">-d</span> mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u5B89\u88C5mongodb" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5mongodb" aria-hidden="true">#</a> \u5B89\u88C5MongoDB</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">27017</span>:27017 <span class="token parameter variable">--name</span> mongo <span class="token parameter variable">-v</span> /my/own/datadir:/data/db <span class="token parameter variable">-e</span> <span class="token assign-left variable">MONGO_INITDB_ROOT_USERNAME</span><span class="token operator">=</span>root <span class="token parameter variable">-e</span> <span class="token assign-left variable">MONGO_INITDB_ROOT_PASSWORD</span><span class="token operator">=</span>password <span class="token punctuation">\\</span><span class="token punctuation">\\</span>-d mongo:4.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u5B89\u88C5-redis" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-redis" aria-hidden="true">#</a> \u5B89\u88C5 redis</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">6379</span>:6379 <span class="token parameter variable">--name</span> redis <span class="token parameter variable">-v</span> /my/own/datadir:/data <span class="token parameter variable">-e</span> <span class="token assign-left variable">REDIS_PASSWORD</span><span class="token operator">=</span>password <span class="token parameter variable">-d</span> redis:5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u5B89\u88C5zookeeper" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5zookeeper" aria-hidden="true">#</a> \u5B89\u88C5Zookeeper:</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run  <span class="token parameter variable">-p</span> <span class="token number">2181</span>:2181 <span class="token parameter variable">--name</span> zookeeper <span class="token parameter variable">-d</span> wombat/zookeeper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u5B89\u88C5kafka" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5kafka" aria-hidden="true">#</a> \u5B89\u88C5Kafka:</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">9092</span>:9092 <span class="token parameter variable">--name</span> kafka <span class="token parameter variable">--link</span> zookeeper <span class="token parameter variable">-e</span> <span class="token assign-left variable">KAFKA_ADVERTISED_LISTENERS</span><span class="token operator">=</span>PLAINTEXT://:9092 <span class="token parameter variable">-e</span> <span class="token assign-left variable">KAFKA_ZOOKEEPER_CONNECT</span><span class="token operator">=</span>zookeeper:2181 <span class="token parameter variable">-e</span> <span class="token assign-left variable">KAFKA_LISTENERS</span><span class="token operator">=</span>PLAINTEXT://:9092 <span class="token parameter variable">-d</span> wurstmeister/kafka
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u5B89\u88C5etcd" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5etcd" aria-hidden="true">#</a> \u5B89\u88C5Etcd:</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">2379</span>:2379 <span class="token parameter variable">-p</span> <span class="token number">2380</span>:2380 <span class="token parameter variable">--name</span> etcd <span class="token parameter variable">-d</span> quay.io/coreos/etcd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u5B89\u88C5minio" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5minio" aria-hidden="true">#</a> \u5B89\u88C5MinIO:</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">9000</span>:9000 <span class="token parameter variable">--name</span> minio <span class="token parameter variable">-v</span> /mnt/data:/data <span class="token parameter variable">-e</span> <span class="token string">&quot;MINIO_ROOT_USER=<span class="token variable">\${<span class="token environment constant">USER</span>}</span>&quot;</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;MINIO_ROOT_PASSWORD=<span class="token variable">\${PASSWORD}</span>&quot;</span> <span class="token parameter variable">-d</span> minio/minio server /data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u79BB\u7EBF\u5B89\u88C5\u4E2D\u95F4\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u79BB\u7EBF\u5B89\u88C5\u4E2D\u95F4\u4EF6" aria-hidden="true">#</a> <strong>\u79BB\u7EBF\u5B89\u88C5\u4E2D\u95F4\u4EF6</strong></h2><ol><li>scp images.tar.gz\u5230\u670D\u52A1\u5668\uFF0C \u5E76\u4E14\u89E3\u538B\u6587\u4EF6</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> <span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> ./images.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li>\u52A0\u8F7D\u6BCF\u4E2A\u955C\u50CF\u5230docker\u91CC\u9762</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> etcd.tar  grafana.tar  kafka.tar  minio.tar  mongo.tar  mysql.tar  node-exporter.tar  promethues.tar  redis.tar  zookeeper.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>docker \u672C\u5730\u955C\u50CF\u5BFC\u5165\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> <span class="token function">docker</span> load <span class="token parameter variable">-i</span> ./etcd.tar<span class="token punctuation">;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>\u9A8C\u8BC1\u5BFC\u5165</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token keyword">for</span> <span class="token for-or-select variable">image</span> <span class="token keyword">in</span> etcd grafana kafka minio mongo mysql node-exporter prometheus redis zookeeper<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token function">docker</span> images <span class="token operator">|</span> <span class="token function">grep</span> <span class="token variable">$image</span> <span class="token operator">&gt;</span> /dev/null
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$image</span> \u955C\u50CF\u5BFC\u5165\u5931\u8D25!&quot;</span>
    <span class="token keyword">else</span>
        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$image</span> \u955C\u50CF\u5BFC\u5165\u6210\u529F!&quot;</span>
    <span class="token keyword">fi</span>
<span class="token keyword">done</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7F16\u8BD1" tabindex="-1"><a class="header-anchor" href="#\u7F16\u8BD1" aria-hidden="true">#</a> \u7F16\u8BD1</h2><p>https://github.com/OpenIMSDK/Open-IM-Server-Enterprise.git</p><p><strong>\u4E2D\u95F4\u4EF6\u6570\u636E\u5E93\u542F\u52A8</strong></p><ol><li><p>\u8FDB\u5165 <code>Open-IM-Server-Enterprise</code> \u76EE\u5F55\u4E0B\u628A <code>docker-compose.yaml</code> \u66FF\u6362\u6210\u8BE5\u6587\u6863\u76EE\u5F55\u4E0B\u7684 <code>docker-compose.yaml</code></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>git clone <span class="token operator">-</span>b v2<span class="token punctuation">.</span><span class="token number">3</span><span class="token punctuation">.</span>0release <span class="token operator">&lt;</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>OpenIMSDK<span class="token operator">/</span>Open<span class="token operator">-</span><span class="token constant">IM</span><span class="token operator">-</span>Server<span class="token operator">-</span>Enterprise<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u542F\u52A8\u4E2D\u95F4\u4EF6\u6570\u636E\u5E93</p></li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> <span class="token function">docker-compose</span> up -d<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u542F\u52A8im\u672C\u4F53" tabindex="-1"><a class="header-anchor" href="#\u542F\u52A8im\u672C\u4F53" aria-hidden="true">#</a> <strong>\u542F\u52A8IM\u672C\u4F53</strong></h3><ol><li>\u542F\u52A8</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> ./start_all.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol><li>\u68C0\u67E5\u662F\u5426\u6210\u529F</li></ol><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> ./check_all.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u542F\u52A8\u5176\u4ED6\u7EC4\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u542F\u52A8\u5176\u4ED6\u7EC4\u4EF6" aria-hidden="true">#</a> <strong>\u542F\u52A8\u5176\u4ED6\u7EC4\u4EF6</strong></h3><ol><li>\u542F\u52A8\u5176\u4ED6\u7EC4\u4EF6\u5982\u52A0\u5BC6\uFF0Copen-im-enterprise\uFF0C\u6309\u4E4B\u524D\u6587\u6863\u6765\u542F\u505C\u3002</li></ol><h2 id="\u97F3\u89C6\u9891\u4E8C\u8FDB\u5236" tabindex="-1"><a class="header-anchor" href="#\u97F3\u89C6\u9891\u4E8C\u8FDB\u5236" aria-hidden="true">#</a> \u97F3\u89C6\u9891\u4E8C\u8FDB\u5236</h2><h2 id="demo-\u5B89\u88C5\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#demo-\u5B89\u88C5\u4E0B\u8F7D" aria-hidden="true">#</a> demo \u5B89\u88C5\u4E0B\u8F7D</h2><p><strong>Edit on github</strong></p>`,52),I={id:"\u76F4\u63A5\u4E0B\u8F7Dapp",tabindex:"-1"},q=a("a",{class:"header-anchor",href:"#\u76F4\u63A5\u4E0B\u8F7Dapp","aria-hidden":"true"},"#",-1),A=n(),M={href:"https://doc.rentsoft.cn/#/flutter_v2/sdk_integrate/development?id=%E7%9B%B4%E6%8E%A5%E4%B8%8B%E8%BD%BDapp",target:"_blank",rel:"noopener noreferrer"},R=n("\u76F4\u63A5\u4E0B\u8F7Dapp"),C=a("p",null,"https://www.pgyer.com/app/qrcode/OpenIM",-1),D=a("p",null,"\u53EF\u9009\u62E9\u66FF\u6362\u670D\u52A1\u5668\u5730\u5740\u4E3A\u81EA\u5DF1\u642D\u5EFA\u7684\u670D\u52A1\u5668\u5730\u5740\uFF0C\u9ED8\u8BA4\u5730\u5740\u4E3A\u5B98\u65B9\u670D\u52A1\u5668\u5730\u5740",-1),N=a("h2",{id:"end-\u94FE\u63A5",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#end-\u94FE\u63A5","aria-hidden":"true"},"#"),n(" END \u94FE\u63A5")],-1),T=a("ul",null,[a("li",null,[a("div",null,[a("a",{href:"74.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),a("a",{href:"76.md",style:{float:"right"}}," \uFE0F\u4E0B\u4E00\u8282\u{1F517}")])])],-1),B=n("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),z={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},V=a("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),L=n(")"),K=n("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),P={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},G=n("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function $(j,W){const e=r("ExternalLinkIcon"),i=r("RouterLink");return l(),t("div",null,[a("ul",null,[a("li",null,[a("a",u,[m,s(e)])])]),v,b,k,a("blockquote",null,[a("p",null,[h,a("a",g,[f,s(e)]),_,a("a",x,[E,s(e)]),y,a("a",O,[S,s(e)])])]),w,a("h3",I,[q,A,a("strong",null,[a("a",M,[R,s(e)])])]),C,D,N,T,a("ul",null,[a("li",null,[a("p",null,[s(i,{to:"/"},{default:p(()=>[B]),_:1})])]),a("li",null,[a("p",null,[a("a",z,[V,s(e)]),L])]),a("li",null,[a("p",null,[K,a("a",P,[G,s(e)])])])])])}const U=o(c,[["render",$],["__file","75.html.vue"]]);export{U as default};