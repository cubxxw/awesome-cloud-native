<template><div><h1 id="k8s介绍" tabindex="-1"><a class="header-anchor" href="#k8s介绍" aria-hidden="true">#</a> k8s介绍</h1>
<nav class="table-of-contents"><ul><li><router-link to="#介绍">介绍</router-link></li><li><router-link to="#dockerfile">dockerfile</router-link></li><li><router-link to="#run命令">run命令</router-link></li><li><router-link to="#参考">参考</router-link></li></ul></nav>
<p>[toc]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p><a href="http://kubernetes.io/" target="_blank" rel="noopener noreferrer">Kubernetes<ExternalLinkIcon/></a>是Google基于Borg开源的容器编排调度引擎，作为<a href="http://cncf.io/" target="_blank" rel="noopener noreferrer">CNCF<ExternalLinkIcon/></a>（Cloud Native Computing Foundation）最重要的组件之一，它的目标不仅仅是一个编排系统，而是提供一个规范，可以让你来描述集群的架构，定义服务的最终状态，<code v-pre>Kubernetes</code> 可以帮你将系统自动地达到和维持在这个状态。<code v-pre>Kubernetes</code> 作为云原生应用的基石，相当于一个云操作系统，其重要性不言而喻。</p>
<div class="custom-container tip"><p class="custom-container-title">sealos 是什么</p>
<p><strong><a href="https://www.sealos.io/zh-Hans/docs/Intro" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a> 是以 kubernetes 为内核的云操作系统发行版</strong></p>
<p>早期单机操作系统也是分层架构，后来才演变成 linux windows 这种内核架构，云操作系统从容器诞生之日起分层架构被击穿，未来也会朝着高内聚的&quot;云内核&quot;架构迁移</p>
<p><img src="http://sm.nsddd.top/smimage-20221017222736688.png" alt="image-20221017222736688"></p>
<ul>
<li>从现在开始，把你数据中心所有机器想象成一台&quot;抽象&quot;的超级计算机，sealos 就是用来管理这台超级计算机的操作系统，kubernetes 就是这个操作系统的内核！</li>
<li>云计算从此刻起再无 IaaS PaaS SaaS 之分，只有云操作系统驱动(CSI CNI CRI 实现) 云操作系统内核(kubernetes) 和 分布式应用组成</li>
</ul>
</div>
<blockquote>
<p>在这里，我将会从docker到k8s全部遍历一遍</p>
<ul>
<li><code v-pre>Docker</code> 的一些常用方法，当然我们的重点会在 Kubernetes 上面</li>
<li>会用 <code v-pre>kubeadm</code> 来搭建一套 <code v-pre>Kubernetes</code> 的集群</li>
<li>理解 <code v-pre>Kubernetes</code> 集群的运行原理</li>
<li>常用的一些控制器使用方法</li>
<li>还有 <code v-pre>Kubernetes</code> 的一些调度策略</li>
<li><code v-pre>Kubernetes</code>的运维</li>
<li>包管理工具 <code v-pre>Helm</code> 的使用</li>
<li>最后我们会实现基于 Kubernetes 的 CI/CD</li>
</ul>
</blockquote>
<h2 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> dockerfile</h2>
<p>💡前面我们都知道了用<code v-pre>commit</code>提交镜像，用<code v-pre>tag</code>打包镜像，但是其实<code v-pre>commit</code>命令是在镜像的每一层每一层上面进行添加。所以此时就有了<code v-pre>dockerfile</code>，<code v-pre>dockerfile</code>就是一条条的指令，每一条指令代表的一层。</p>
<blockquote>
<p>可以想象<code v-pre>c</code>语言的<code v-pre>makefile</code>、Linux的<code v-pre>bash</code>脚本</p>
</blockquote>
<p><strong>目录选择：</strong></p>
<p>其实对于我个人喜欢在Linux的根目录下创建专门存放docker的镜像，喜欢在win的<code v-pre>D</code>盘根目录下创建docker镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /docker/nginx <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /docker/tomcat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>FROM指定镜像：</strong></p>
<p><code v-pre>FROM</code>就是指定基础镜像，因此一个 Dockerfile 中 FROM 是必备的指令，并且必须是第一条指令。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>FROM nginx
RUN <span class="token builtin class-name">echo</span> <span class="token string">'&lt;h1>Hello, Docker!&lt;/h1>'</span> <span class="token operator">></span> /usr/share/nginx/html/index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在<a href="https://store.docker.com/" target="_blank" rel="noopener noreferrer">Docker Store<ExternalLinkIcon/></a>上有非常多的高质量的官方镜像，有可以直接拿来使用的服务类的镜像，如 nginx、redis、mongo、mysql、httpd、php、tomcat 等；也有一些方便开发、构建、运行各种语言应用的镜像，如 node、openjdk、python、ruby、golang 等。可以在其中寻找一个最符合我们最终目标的镜像为基础镜像进行定制。</p>
<blockquote>
<p>除了选择现有镜像为基础镜像外，Docker 还存在一个特殊的镜像，名为<code v-pre>scratch</code>。这个镜像是虚拟的概念，并不实际存在，它表示一个空白的镜像。</p>
<p><strong>⚠️其实这一点我很疑惑的，就是创建一个空白的镜像后面该怎么样运行呢</strong></p>
</blockquote>
<div class="custom-container tip"><p class="custom-container-title">scratch空白镜像</p>
<p>如果你以<code v-pre>scratch</code>为基础镜像的话，意味着你不以任何镜像为基础，接下来所写的指令将作为镜像第一层开始存在。没有任何基础镜像，我怎么去执行我的程序呢，其实对于 Linux 下静态编译的程序来说，并不需要有操作系统提供运行时支持，所需的一切库都已经在可执行文件里了，因此直接<code v-pre>FROM scratch</code>会让镜像体积更加小巧。使用 Go 语言 开发的应用很多会使用这种方式来制作镜像，这也是为什么有人认为 Go 是特别适合容器微服务架构的语言的原因之一。</p>
<ul>
<li>[x] <a href="https://go.nsddd.top" target="_blank" rel="noopener noreferrer">Go语言的学习（CUB打造的Go语言学习docs）<ExternalLinkIcon/></a></li>
</ul>
</div>
<h2 id="run命令" tabindex="-1"><a class="header-anchor" href="#run命令" aria-hidden="true">#</a> run命令</h2>
<p><code v-pre>RUN</code>指令是用来执行命令行命令的。由于命令行的强大能力，<code v-pre>RUN</code>指令在定制镜像时是最常用的指令之一。其格式有两种：</p>
<ul>
<li>
<p><code v-pre>shell</code> 格式：RUN &lt;命令&gt;，就像直接在命令行中输入的命令一样。刚才写的 Dockerfile 中的 RUN 指令就是这种格式。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>RUN <span class="token builtin class-name">echo</span> <span class="token string">'&lt;h1>Hello, Docker!&lt;/h1>'</span> <span class="token operator">></span> /usr/share/nginx/html/index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>exec</code> 格式：RUN [&quot;可执行文件&quot;, &quot;参数1&quot;, &quot;参数2&quot;]，这更像是函数调用中的格式。 既然 RUN 就像 Shell 脚本一样可以执行命令，那么我们是否就可以像 Shell 脚本一样把每个命令对应一个 RUN 呢？比如这样：</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> debian:jessie</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get update</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get install -y gcc libc6-dev make</span>
<span class="token instruction"><span class="token keyword">RUN</span> wget -O redis.tar.gz <span class="token string">"http://download.redis.io/releases/redis-3.2.5.tar.gz"</span></span>
<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /usr/src/redis</span>
<span class="token instruction"><span class="token keyword">RUN</span> tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1</span>
<span class="token instruction"><span class="token keyword">RUN</span> make -C /usr/src/redis</span>
<span class="token instruction"><span class="token keyword">RUN</span> make -C /usr/src/redis install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p>之前说过，Dockerfile 中每一个指令都会建立一层，RUN 也不例外。每一个 RUN 的行为，就和刚才我们手工建立镜像的过程一样：新建立一层，在其上执行这些命令，执行结束后，commit 这一层的修改，构成新的镜像。</p>
<blockquote>
<p><code v-pre>Union FS</code> 是有最大层数限制的，比如 <code v-pre>AUFS</code>，曾经是最大不得超过 42 层，现在是不得超过 127 层。</p>
</blockquote>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<p>https://www.qikqiak.com/k8s-book/</p>
</div></template>


