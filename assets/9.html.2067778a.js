import{_ as e,o as n,c as s,e as a}from"./app.2ebcb929.js";const i={},r=a(`<h1 id="docker\u955C\u50CF\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker\u955C\u50CF\u547D\u4EE4" aria-hidden="true">#</a> docker\u955C\u50CF\u547D\u4EE4</h1><p>[toc]</p><h2 id="\u955C\u50CF\u4ED3\u5E93" tabindex="-1"><a class="header-anchor" href="#\u955C\u50CF\u4ED3\u5E93" aria-hidden="true">#</a> \u955C\u50CF\u4ED3\u5E93</h2><h3 id="docker-login-logout-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker-login-logout-\u547D\u4EE4" aria-hidden="true">#</a> Docker login/logout \u547D\u4EE4</h3><hr><p><strong>docker login :</strong> \u767B\u9646\u5230\u4E00\u4E2ADocker\u955C\u50CF\u4ED3\u5E93\uFF0C\u5982\u679C\u672A\u6307\u5B9A\u955C\u50CF\u4ED3\u5E93\u5730\u5740\uFF0C\u9ED8\u8BA4\u4E3A\u5B98\u65B9\u4ED3\u5E93 Docker Hub</p><p><strong>docker logout :</strong> \u767B\u51FA\u4E00\u4E2ADocker\u955C\u50CF\u4ED3\u5E93\uFF0C\u5982\u679C\u672A\u6307\u5B9A\u955C\u50CF\u4ED3\u5E93\u5730\u5740\uFF0C\u9ED8\u8BA4\u4E3A\u5B98\u65B9\u4ED3\u5E93 Docker Hub</p><p><strong>\u8BED\u6CD5</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker login [OPTIONS] [SERVER]
docker logout [OPTIONS] [SERVER]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>OPTIONS\u8BF4\u660E\uFF1A</p><ul><li><strong>-u :</strong> \u767B\u9646\u7684\u7528\u6237\u540D</li><li><strong>-p :</strong> \u767B\u9646\u7684\u5BC6\u7801</li></ul><p><strong>\u5B9E\u4F8B</strong></p><p>\u767B\u9646\u5230Docker Hub</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker login -u \u7528\u6237\u540D -p \u5BC6\u7801
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u767B\u51FADocker Hub</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker logout
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="docker-pull-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker-pull-\u547D\u4EE4" aria-hidden="true">#</a> Docker pull \u547D\u4EE4</h3><p><strong>docker pull :</strong> \u4ECE\u955C\u50CF\u4ED3\u5E93\u4E2D\u62C9\u53D6\u6216\u8005\u66F4\u65B0\u6307\u5B9A\u955C\u50CF</p><p><strong>\u8BED\u6CD5</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker pull [OPTIONS] NAME[:TAG|@DIGEST]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS\u8BF4\u660E\uFF1A</p><ul><li><strong>-a :</strong> \u62C9\u53D6\u6240\u6709 <code>tagged</code> \u955C\u50CF</li><li><strong>--disable-content-trust :</strong> \u5FFD\u7565\u955C\u50CF\u7684\u6821\u9A8C,\u9ED8\u8BA4\u5F00\u542F</li></ul><p><strong>\u5B9E\u4F8B</strong></p><p>\u4ECEDocker Hub\u4E0B\u8F7Djava\u6700\u65B0\u7248\u955C\u50CF\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker pull java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4ECEDocker Hub\u4E0B\u8F7DREPOSITORY\u4E3Ajava\u7684\u6240\u6709\u955C\u50CF\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker pull -a java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="docker-push-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker-push-\u547D\u4EE4" aria-hidden="true">#</a> Docker push \u547D\u4EE4</h3><p><strong>docker push :</strong> \u5C06\u672C\u5730\u7684\u955C\u50CF\u4E0A\u4F20\u5230\u955C\u50CF\u4ED3\u5E93,\u8981\u5148\u767B\u9646\u5230\u955C\u50CF\u4ED3\u5E93</p><p><strong>\u8BED\u6CD5</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker push [OPTIONS] NAME[:TAG]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS\u8BF4\u660E\uFF1A</p><ul><li><strong>--disable-content-trust :</strong> \u5FFD\u7565\u955C\u50CF\u7684\u6821\u9A8C,\u9ED8\u8BA4\u5F00\u542F</li></ul><p><strong>\u5B9E\u4F8B</strong></p><p>\u4E0A\u4F20\u672C\u5730\u955C\u50CFmyapache:v1\u5230\u955C\u50CF\u4ED3\u5E93\u4E2D\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker push myapache:v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="docker-search-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker-search-\u547D\u4EE4" aria-hidden="true">#</a> Docker search \u547D\u4EE4</h3><p><strong>docker search :</strong> \u4ECEDocker Hub\u67E5\u627E\u955C\u50CF(\u4E00\u822C\u4F7F\u7528<code>-f</code>\u7B5B\u9009)</p><p><strong>\u8BED\u6CD5</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker search [OPTIONS] TERM
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS\u8BF4\u660E\uFF1A</p><ul><li><strong>--automated :</strong> \u53EA\u5217\u51FA automated build\u7C7B\u578B\u7684\u955C\u50CF\uFF1B</li><li><strong>--no-trunc :</strong> \u663E\u793A\u5B8C\u6574\u7684\u955C\u50CF\u63CF\u8FF0\uFF1B</li><li><strong>-f &lt;\u8FC7\u6EE4\u6761\u4EF6&gt;:</strong> \u5217\u51FA\u6536\u85CF\u6570\u4E0D\u5C0F\u4E8E\u6307\u5B9A\u503C\u7684\u955C\u50CF\u3002</li></ul><p><strong>\u5B9E\u4F8B</strong></p><p>\u4ECE Docker Hub \u67E5\u627E\u6240\u6709\u955C\u50CF\u540D\u5305\u542B java\uFF0C\u5E76\u4E14\u6536\u85CF\u6570\u5927\u4E8E 10 \u7684\u955C\u50CF</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>runoob@runoob:~$ docker search -f stars=10 java
NAME                  DESCRIPTION                           STARS   OFFICIAL   AUTOMATED
java                  Java is a concurrent, class-based...   1037    [OK]       
anapsix/alpine-java   Oracle Java 8 (and 7) with GLIBC ...   115                [OK]
develar/java                                                 46                 [OK]
isuper/java-oracle    This repository contains all java...   38                 [OK]
lwieske/java-8        Oracle Java 8 Container - Full + ...   27                 [OK]
nimmis/java-centos    This is docker images of CentOS 7...   13                 [OK]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53C2\u6570\u8BF4\u660E\uFF1A</p><p><strong>NAME:</strong> \u955C\u50CF\u4ED3\u5E93\u6E90\u7684\u540D\u79F0</p><p><strong>DESCRIPTION:</strong> \u955C\u50CF\u7684\u63CF\u8FF0</p><p><strong>OFFICIAL:</strong> \u662F\u5426 docker \u5B98\u65B9\u53D1\u5E03</p><p><strong>stars:</strong> \u7C7B\u4F3C Github \u91CC\u9762\u7684 star\uFF0C\u8868\u793A\u70B9\u8D5E\u3001\u559C\u6B22\u7684\u610F\u601D\u3002</p><p><strong>AUTOMATED:</strong> \u81EA\u52A8\u6784\u5EFA\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>smile@ubuntu:~$ <span class="token function">sudo</span> <span class="token function">docker</span> search <span class="token parameter variable">-f</span> <span class="token assign-left variable">stars</span><span class="token operator">=</span><span class="token number">1</span> <span class="token parameter variable">--limit</span> <span class="token number">5</span> redis
NAME                     DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
redis                    Redis is an <span class="token function">open</span> <span class="token builtin class-name">source</span> key-value store that\u2026   <span class="token number">10891</span>     <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>       
bitnami/redis            Bitnami Redis Docker Image                      <span class="token number">214</span>                  <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>
bitnami/redis-sentinel   Bitnami Docker Image <span class="token keyword">for</span> Redis Sentinel         <span class="token number">36</span>                   <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>
circleci/redis           CircleCI images <span class="token keyword">for</span> Redis                       <span class="token number">12</span>                   <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>
bitnami/redis-exporter 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="\u672C\u5730\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#\u672C\u5730\u955C\u50CF" aria-hidden="true">#</a> \u672C\u5730\u955C\u50CF</h2><h3 id="docker-images-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker-images-\u547D\u4EE4" aria-hidden="true">#</a> Docker images \u547D\u4EE4</h3><p><strong>docker images :</strong> \u5217\u51FA\u672C\u5730\u955C\u50CF\u3002</p><p><strong>\u8BED\u6CD5</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker images [OPTIONS] [REPOSITORY[:TAG]]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS\u8BF4\u660E\uFF1A</p><ul><li><strong>-a :</strong> \u5217\u51FA\u672C\u5730\u6240\u6709\u7684\u955C\u50CF\uFF08\u542B\u4E2D\u95F4\u6620\u50CF\u5C42\uFF0C\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u8FC7\u6EE4\u6389\u4E2D\u95F4\u6620\u50CF\u5C42\uFF09\uFF1B</li><li><strong>--digests :</strong> \u663E\u793A\u955C\u50CF\u7684\u6458\u8981\u4FE1\u606F\uFF1B</li><li><strong>-f :</strong> \u663E\u793A\u6EE1\u8DB3\u6761\u4EF6\u7684\u955C\u50CF\uFF1B</li><li><strong>--format :</strong> \u6307\u5B9A\u8FD4\u56DE\u503C\u7684\u6A21\u677F\u6587\u4EF6\uFF1B</li><li><strong>--no-trunc :</strong> \u663E\u793A\u5B8C\u6574\u7684\u955C\u50CF\u4FE1\u606F\uFF1B</li><li><strong>-q :</strong> \u53EA\u663E\u793A\u955C\u50CFID\u3002</li></ul><p><strong>\u5B9E\u4F8B</strong></p><p>\u67E5\u770B\u672C\u5730\u955C\u50CF\u5217\u8868\u3002</p><ul><li><strong>pepository:\u4ED3\u5E93</strong></li><li><strong>tag:\u6807\u7B7E</strong></li><li><strong>image id:\u955C\u50CFid\uFF08\u4F7F\u7528hash\uFF0C\u662F\u552F\u4E00\u7684\uFF09</strong></li><li><strong>created:\u65F6\u95F4</strong></li><li><strong>size:\u955C\u50CF\u5927\u5C0F</strong></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>runoob@runoob:~$ <span class="token function">docker</span> images
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
mymysql                 v1                  37af1236adef        <span class="token number">5</span> minutes ago       <span class="token number">329</span> MB
runoob/ubuntu           v4                  1c06aa18edee        <span class="token number">2</span> days ago          <span class="token number">142.1</span> MB
<span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>                  <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>              5c6e1090e771        <span class="token number">2</span> days ago          <span class="token number">165.9</span> MB
httpd                   latest              ed38aaffef30        <span class="token number">11</span> days ago         <span class="token number">195.1</span> MB
alpine                  latest              4e38e38c8ce0        <span class="token number">2</span> weeks ago         <span class="token number">4.799</span> MB
mongo                   <span class="token number">3.2</span>                 282fd552add6        <span class="token number">3</span> weeks ago         <span class="token number">336.1</span> MB
redis                   latest              4465e4bcad80        <span class="token number">3</span> weeks ago         <span class="token number">185.7</span> MB
php                     <span class="token number">5.6</span>-fpm             025041cd3aa5        <span class="token number">3</span> weeks ago         <span class="token number">456.3</span> MB
python                  <span class="token number">3.5</span>                 045767ddf24a        <span class="token number">3</span> weeks ago         <span class="token number">684.1</span> MB
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5217\u51FA\u672C\u5730\u955C\u50CF\u4E2DREPOSITORY\u4E3Aubuntu\u7684\u955C\u50CF\u5217\u8868\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@runoob:~# docker images  ubuntu
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              14.04               90d5884b1ee0        9 weeks ago         188 MB
ubuntu              15.10               4e3b13c8a266        3 months ago        136.3 MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u540C\u4E00\u4ED3\u5E93\u6E90\uFF08mysql5.6\\5.7)\u53EF\u4EE5\u6709\u591A\u4E2Atag\u7248\u672C\uFF0C\u4EE3\u8868\u8FD9\u4E2A\u4ED3\u5E93\u6E90\u7684\u4E0D\u540C\u4E2A\u7248\u672C\uFF0C\u6211\u4EEC\u4F7F\u7528repository\uFF1Atag\u6765\u5B9A\u4E49\u4E0D\u540C\u7684\u955C\u50CF</p></blockquote><h3 id="docker-rmi-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker-rmi-\u547D\u4EE4" aria-hidden="true">#</a> Docker rmi \u547D\u4EE4</h3><hr><p><strong>docker rmi :</strong> \u5220\u9664\u672C\u5730\u4E00\u4E2A\u6216\u591A\u4E2A\u955C\u50CF\u3002</p><p><strong>\u8BED\u6CD5</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker rmi [OPTIONS] IMAGE [IMAGE...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS\u8BF4\u660E\uFF1A</p><ul><li><strong>-f :</strong> \u5F3A\u5236\u5220\u9664\uFF1B</li><li><strong>--no-prune :</strong> \u4E0D\u79FB\u9664\u8BE5\u955C\u50CF\u7684\u8FC7\u7A0B\u955C\u50CF\uFF0C\u9ED8\u8BA4\u79FB\u9664\uFF1B</li></ul><p><strong>\u5B9E\u4F8B</strong></p><p>\u5F3A\u5236\u5220\u9664\u672C\u5730\u955C\u50CF runoob/ubuntu:v4\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@runoob:~# docker rmi -f runoob/ubuntu:v4
Untagged: runoob/ubuntu:v4
Deleted: sha256:1c06aa18edee44230f93a90a7d88139235de12cd4c089d41eed8419b503072be
Deleted: sha256:85feb446e89a28d58ee7d80ea5ce367eebb7cec70f0ec18aa4faa874cbd97c73
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-tag-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker-tag-\u547D\u4EE4" aria-hidden="true">#</a> Docker tag \u547D\u4EE4</h3><hr><p><strong>docker tag :</strong> \u6807\u8BB0\u672C\u5730\u955C\u50CF\uFF0C\u5C06\u5176\u5F52\u5165\u67D0\u4E00\u4ED3\u5E93\u3002</p><p><strong>\u8BED\u6CD5</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker tag [OPTIONS] IMAGE[:TAG] [REGISTRYHOST/][USERNAME/]NAME[:TAG]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u5B9E\u4F8B</strong></p><p>\u5C06\u955C\u50CFubuntu:15.10\u6807\u8BB0\u4E3A runoob/ubuntu:v3 \u955C\u50CF\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@runoob:~# docker tag ubuntu:15.10 runoob/ubuntu:v3
root@runoob:~# docker images   runoob/ubuntu:v3
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
runoob/ubuntu       v3                  4e3b13c8a266        3 months ago        136.3 MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-build-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker-build-\u547D\u4EE4" aria-hidden="true">#</a> Docker build \u547D\u4EE4</h3><p><strong>docker build</strong> \u547D\u4EE4\u7528\u4E8E\u4F7F\u7528 Dockerfile \u521B\u5EFA\u955C\u50CF\u3002</p><p><strong>\u8BED\u6CD5</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker build [OPTIONS] PATH | URL | -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS\u8BF4\u660E\uFF1A</p><ul><li><strong>--build-arg=[] :</strong> \u8BBE\u7F6E\u955C\u50CF\u521B\u5EFA\u65F6\u7684\u53D8\u91CF\uFF1B</li><li><strong>--cpu-shares :</strong> \u8BBE\u7F6E cpu \u4F7F\u7528\u6743\u91CD\uFF1B</li><li><strong>--cpu-period :</strong> \u9650\u5236 CPU CFS\u5468\u671F\uFF1B</li><li><strong>--cpu-quota :</strong> \u9650\u5236 CPU CFS\u914D\u989D\uFF1B</li><li><strong>--cpuset-cpus :</strong> \u6307\u5B9A\u4F7F\u7528\u7684CPU id\uFF1B</li><li><strong>--cpuset-mems :</strong> \u6307\u5B9A\u4F7F\u7528\u7684\u5185\u5B58 id\uFF1B</li><li><strong>--disable-content-trust :</strong> \u5FFD\u7565\u6821\u9A8C\uFF0C\u9ED8\u8BA4\u5F00\u542F\uFF1B</li><li><strong>-f :</strong> \u6307\u5B9A\u8981\u4F7F\u7528\u7684Dockerfile\u8DEF\u5F84\uFF1B</li><li><strong>--force-rm :</strong> \u8BBE\u7F6E\u955C\u50CF\u8FC7\u7A0B\u4E2D\u5220\u9664\u4E2D\u95F4\u5BB9\u5668\uFF1B</li><li><strong>--isolation :</strong> \u4F7F\u7528\u5BB9\u5668\u9694\u79BB\u6280\u672F\uFF1B</li><li><strong>--label=[] :</strong> \u8BBE\u7F6E\u955C\u50CF\u4F7F\u7528\u7684\u5143\u6570\u636E\uFF1B</li><li><strong>-m :</strong> \u8BBE\u7F6E\u5185\u5B58\u6700\u5927\u503C\uFF1B</li><li><strong>--memory-swap :</strong> \u8BBE\u7F6ESwap\u7684\u6700\u5927\u503C\u4E3A\u5185\u5B58+swap\uFF0C&quot;-1&quot;\u8868\u793A\u4E0D\u9650swap\uFF1B</li><li><strong>--no-cache :</strong> \u521B\u5EFA\u955C\u50CF\u7684\u8FC7\u7A0B\u4E0D\u4F7F\u7528\u7F13\u5B58\uFF1B</li><li><strong>--pull :</strong> \u5C1D\u8BD5\u53BB\u66F4\u65B0\u955C\u50CF\u7684\u65B0\u7248\u672C\uFF1B</li><li><strong>--quiet, -q :</strong> \u5B89\u9759\u6A21\u5F0F\uFF0C\u6210\u529F\u540E\u53EA\u8F93\u51FA\u955C\u50CF ID\uFF1B</li><li><strong>--rm :</strong> \u8BBE\u7F6E\u955C\u50CF\u6210\u529F\u540E\u5220\u9664\u4E2D\u95F4\u5BB9\u5668\uFF1B</li><li><strong>--shm-size :</strong> \u8BBE\u7F6E/dev/shm\u7684\u5927\u5C0F\uFF0C\u9ED8\u8BA4\u503C\u662F64M\uFF1B</li><li><strong>--ulimit :</strong> Ulimit\u914D\u7F6E\u3002</li><li><strong>--squash :</strong> \u5C06 Dockerfile \u4E2D\u6240\u6709\u7684\u64CD\u4F5C\u538B\u7F29\u4E3A\u4E00\u5C42\u3002</li><li><strong>--tag, -t:</strong> \u955C\u50CF\u7684\u540D\u5B57\u53CA\u6807\u7B7E\uFF0C\u901A\u5E38 name:tag \u6216\u8005 name \u683C\u5F0F\uFF1B\u53EF\u4EE5\u5728\u4E00\u6B21\u6784\u5EFA\u4E2D\u4E3A\u4E00\u4E2A\u955C\u50CF\u8BBE\u7F6E\u591A\u4E2A\u6807\u7B7E\u3002</li><li><strong>--network:</strong> \u9ED8\u8BA4 default\u3002\u5728\u6784\u5EFA\u671F\u95F4\u8BBE\u7F6ERUN\u6307\u4EE4\u7684\u7F51\u7EDC\u6A21\u5F0F</li></ul><p><strong>\u5B9E\u4F8B</strong></p><p>\u4F7F\u7528\u5F53\u524D\u76EE\u5F55\u7684 <code>Dockerfile</code> \u521B\u5EFA\u955C\u50CF\uFF0C\u6807\u7B7E\u4E3A runoob/ubuntu:v1\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker build -t runoob/ubuntu:v1 . 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4F7F\u7528URL <strong>github.com/creack/docker-firefox</strong> \u7684 Dockerfile \u521B\u5EFA\u955C\u50CF\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker build github.com/creack/docker-firefox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4E5F\u53EF\u4EE5\u901A\u8FC7 -f Dockerfile \u6587\u4EF6\u7684\u4F4D\u7F6E\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ docker build -f /path/to/a/Dockerfile .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5728 Docker \u5B88\u62A4\u8FDB\u7A0B\u6267\u884C <code>Dockerfile</code> \u4E2D\u7684\u6307\u4EE4\u524D\uFF0C\u9996\u5148\u4F1A\u5BF9 Dockerfile \u8FDB\u884C\u8BED\u6CD5\u68C0\u67E5\uFF0C\u6709\u8BED\u6CD5\u9519\u8BEF\u65F6\u4F1A\u8FD4\u56DE\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ docker build -t test/myapp .
Sending build context to Docker daemon 2.048 kB
Error response from daemon: Unknown instruction: RUNCMD
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-history-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker-history-\u547D\u4EE4" aria-hidden="true">#</a> Docker history \u547D\u4EE4</h3><hr><p><strong>docker history :</strong> \u67E5\u770B\u6307\u5B9A\u955C\u50CF\u7684\u521B\u5EFA\u5386\u53F2\u3002</p><p><strong>\u8BED\u6CD5</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker history [OPTIONS] IMAGE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS\u8BF4\u660E\uFF1A</p><ul><li><strong>-H :</strong> \u4EE5\u53EF\u8BFB\u7684\u683C\u5F0F\u6253\u5370\u955C\u50CF\u5927\u5C0F\u548C\u65E5\u671F\uFF0C\u9ED8\u8BA4\u4E3Atrue\uFF1B</li><li><strong>--no-trunc :</strong> \u663E\u793A\u5B8C\u6574\u7684\u63D0\u4EA4\u8BB0\u5F55\uFF1B</li><li><strong>-q :</strong> \u4EC5\u5217\u51FA\u63D0\u4EA4\u8BB0\u5F55ID\u3002</li></ul><p><strong>\u5B9E\u4F8B</strong></p><p>\u67E5\u770B\u672C\u5730\u955C\u50CFrunoob/ubuntu:v3\u7684\u521B\u5EFA\u5386\u53F2\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@runoob:~# docker history runoob/ubuntu:v3
IMAGE             CREATED           CREATED BY                                      SIZE      COMMENT
4e3b13c8a266      3 months ago      /bin/sh -c #(nop) CMD [&quot;/bin/bash&quot;]             0 B                 
&lt;missing&gt;         3 months ago      /bin/sh -c sed -i &#39;s/^#\\s*\\(deb.*universe\\)$/   1.863 kB            
&lt;missing&gt;         3 months ago      /bin/sh -c set -xe   &amp;&amp; echo &#39;#!/bin/sh&#39; &gt; /u   701 B               
&lt;missing&gt;         3 months ago      /bin/sh -c #(nop) ADD file:43cb048516c6b80f22   136.3 MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-save-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker-save-\u547D\u4EE4" aria-hidden="true">#</a> Docker save \u547D\u4EE4</h3><p><strong>docker save :</strong> \u5C06\u6307\u5B9A\u955C\u50CF\u4FDD\u5B58\u6210 tar \u5F52\u6863\u6587\u4EF6\u3002</p><p><strong>\u8BED\u6CD5</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker save [OPTIONS] IMAGE [IMAGE...]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>OPTIONS \u8BF4\u660E\uFF1A</p><ul><li><strong>-o :</strong> \u8F93\u51FA\u5230\u7684\u6587\u4EF6\u3002</li></ul><p><strong>\u5B9E\u4F8B</strong></p><p>\u5C06\u955C\u50CF runoob/ubuntu:v3 \u751F\u6210 my_ubuntu_v3.tar \u6587\u6863</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>runoob@runoob:~$ docker save -o my_ubuntu_v3.tar runoob/ubuntu:v3
runoob@runoob:~$ ll my_ubuntu_v3.tar
-rw------- 1 runoob runoob 142102016 Jul 11 01:37 my_ubuntu_v3.ta
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-\u7BC7\u7B14\u8BB0" tabindex="-1"><a class="header-anchor" href="#_2-\u7BC7\u7B14\u8BB0" aria-hidden="true">#</a> 2 \u7BC7\u7B14\u8BB0</h2><p><strong>docker prune \u547D\u4EE4</strong></p><p>prune \u547D\u4EE4\u7528\u6765\u5220\u9664\u4E0D\u518D\u4F7F\u7528\u7684 docker \u5BF9\u8C61\u3002</p><p>\u5220\u9664\u6240\u6709\u672A\u88AB tag \u6807\u8BB0\u548C\u672A\u88AB\u5BB9\u5668\u4F7F\u7528\u7684\u955C\u50CF:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ docker image prune
WARNING! This will remove all dangling images.
Are you sure you want to continue? [y/N] y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5220\u9664\u6240\u6709\u672A\u88AB\u5BB9\u5668\u4F7F\u7528\u7684\u955C\u50CF:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ docker image prune -a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5220\u9664\u6240\u6709\u505C\u6B62\u8FD0\u884C\u7684\u5BB9\u5668:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ docker container prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5220\u9664\u6240\u6709\u672A\u88AB\u6302\u8F7D\u7684\u5377:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ docker volume prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5220\u9664\u6240\u6709\u7F51\u7EDC:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ docker network prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5220\u9664 docker \u6240\u6709\u8D44\u6E90:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ docker system prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>docker system prune</strong> \u547D\u4EE4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all dangling images
        - all dangling build cache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7FFB\u8BD1\uFF1A\u5220\u9664\u505C\u6B62\u7684\u5BB9\u5668\u3001\u5220\u9664\u6240\u6709\u672A\u88AB\u5BB9\u5668\u4F7F\u7528\u7684\u7F51\u7EDC\u3001\u5220\u9664\u6240\u6709none\u7684\u955C\u50CF\u3002</p>`,137),t=[r];function d(l,o){return n(),s("div",null,t)}const u=e(i,[["render",d],["__file","9.html.vue"]]);export{u as default};
