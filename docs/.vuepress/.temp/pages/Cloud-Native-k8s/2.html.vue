<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第2节-docker实用操作" tabindex="-1"><a class="header-anchor" href="#第2节-docker实用操作" aria-hidden="true">#</a> 第2节 docker实用操作</h1>
<div><a href = '1.md' style='float:left'>⬆️上一节🔗  </a><a href = '3.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#前言">前言</router-link></li><li><router-link to="#由docker引入k8s">由docker引入k8s</router-link><ul><li><router-link to="#docker容器化技术">docker容器化技术</router-link></li></ul></li><li><router-link to="#dockerfile">dockerfile</router-link></li><li><router-link to="#run命令">run命令</router-link></li><li><router-link to="#镜像压缩和发送">镜像压缩和发送</router-link><ul><li><router-link to="#远程传输scp">远程传输scp</router-link></li><li><router-link to="#新的机器启用镜像">新的机器启用镜像</router-link></li></ul></li><li><router-link to="#推送到远程仓库">推送到远程仓库</router-link></li><li><router-link to="#将应用打包为镜像">将应用打包为镜像</router-link><ul><li><router-link to="#以前的土方法">以前的土方法</router-link></li><li><router-link to="#docker解决方案">docker解决方案</router-link></li></ul></li><li><router-link to="#docker-清理使用的空间">docker 清理使用的空间</router-link><ul><li><router-link to="#dockerinit">Dockerinit</router-link></li></ul></li><li><router-link to="#容器进程和应用进程">容器进程和应用进程</router-link></li><li><router-link to="#linux-绑定挂载机制">Linux 绑定挂载机制</router-link></li><li><router-link to="#end-链接">END 链接</router-link><ul><li><router-link to="#参考">参考</router-link></li></ul></li></ul></nav>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<ul>
<li>[x] <a href="https://docker.nsddd.top" target="_blank" rel="noopener noreferrer">docker学习<ExternalLinkIcon/></a></li>
</ul>
<h2 id="由docker引入k8s" tabindex="-1"><a class="header-anchor" href="#由docker引入k8s" aria-hidden="true">#</a> 由docker引入k8s</h2>
<h3 id="docker容器化技术" tabindex="-1"><a class="header-anchor" href="#docker容器化技术" aria-hidden="true">#</a> docker容器化技术</h3>
<ol>
<li>基础镜像MB级别</li>
<li>创建简单</li>
<li>隔离性强</li>
<li>启动速度秒级</li>
<li>移植和分享方便</li>
</ol>
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
<h2 id="镜像压缩和发送" tabindex="-1"><a class="header-anchor" href="#镜像压缩和发送" aria-hidden="true">#</a> 镜像压缩和发送</h2>
<blockquote>
<p>这个我认为是一个比较有用的技巧，就是把镜像整一个压缩包，然后发送出去</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos ~<span class="token punctuation">]</span><span class="token comment"># docker save -o my_cloudreve.tar docker.io/3293172751/my_cloudreve:1.0</span>
<span class="token punctuation">[</span>root@VM-4-6-centos ~<span class="token punctuation">]</span><span class="token comment"># ls |grep my_cloudreve.tar </span>
my_cloudreve.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h3 id="远程传输scp" tabindex="-1"><a class="header-anchor" href="#远程传输scp" aria-hidden="true">#</a> 远程传输scp</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[root@VM-4-6-centos ~]# scp my_cloudreve.tar root@110.42.175.115:/scp/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221018100209153.png" alt="image-20221018100209153"></p>
<h3 id="新的机器启用镜像" tabindex="-1"><a class="header-anchor" href="#新的机器启用镜像" aria-hidden="true">#</a> 新的机器启用镜像</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> load <span class="token parameter variable">-i</span> 压缩包名称.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="推送到远程仓库" tabindex="-1"><a class="header-anchor" href="#推送到远程仓库" aria-hidden="true">#</a> 推送到远程仓库</h2>
<ul>
<li><a href="https://docker.nsddd.top" target="_blank" rel="noopener noreferrer">docker教程<ExternalLinkIcon/></a></li>
</ul>
<h2 id="将应用打包为镜像" tabindex="-1"><a class="header-anchor" href="#将应用打包为镜像" aria-hidden="true">#</a> 将应用打包为镜像</h2>
<h3 id="以前的土方法" tabindex="-1"><a class="header-anchor" href="#以前的土方法" aria-hidden="true">#</a> 以前的土方法</h3>
<p><strong>Java为例：</strong></p>
<ol>
<li>springboot打包jar</li>
<li>把jar上传服务</li>
<li>服务器运行jar</li>
</ol>
<h3 id="docker解决方案" tabindex="-1"><a class="header-anchor" href="#docker解决方案" aria-hidden="true">#</a> docker解决方案</h3>
<blockquote>
<p>使用dockerfile指定应用如何打包</p>
</blockquote>
<p><strong>创建Java项目</strong></p>
<p><strong>打包dockerfile</strong></p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> openjdk:8-jdk-slim</span>
<span class="token instruction"><span class="token keyword">LABEL</span> maintainer=leifengyang</span>

<span class="token instruction"><span class="token keyword">COPY</span> target/*.jar /app.jar</span>

<span class="token instruction"><span class="token keyword">ENTRYPOINT</span> [<span class="token string">"java"</span>,<span class="token string">"-jar"</span>,<span class="token string">"/app.jar"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>构建：</strong></p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code>docker build -t java-demo:v1.0 .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>重新启动：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d -p 8080:8080 --name myjava java-demo:v1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker-清理使用的空间" tabindex="-1"><a class="header-anchor" href="#docker-清理使用的空间" aria-hidden="true">#</a> docker 清理使用的空间</h2>
<p><strong>清理 Docker 使用的空间：</strong></p>
<p>建议使用 Docker 命令来清理不再使用的容器。可以使用以下命令清理容器、网络文件、镜像和构建缓存：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> system prune <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此外，也可以清除不再使用的卷：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> volumes prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>有时候，它可能很快就把磁盘占满了，所以要经常检查它的根目录（的磁盘占用情况），但是不建议手动删除或编辑 Docker 文件，最好使用 prune 命令来释放磁盘空间。</p>
<h3 id="dockerinit" tabindex="-1"><a class="header-anchor" href="#dockerinit" aria-hidden="true">#</a> Dockerinit</h3>
<p>Dockerinit是Docker容器启动时运行的初始化进程。它负责设置容器的环境，包括设置网络、挂载已指定的任何卷，以及执行Dockerfile的ENTRYPOINT或CMD指令中指定的命令。Dockerinit通常由Docker守护进程启动，并在容器中作为PID 1运行。</p>
<h2 id="容器进程和应用进程" tabindex="-1"><a class="header-anchor" href="#容器进程和应用进程" aria-hidden="true">#</a> 容器进程和应用进程</h2>
<p>在 Docker 容器中，容器进程是运行容器的进程，应用程序进程是在容器内运行应用程序的进程。容器进程负责管理容器的资源和网络，而应用进程负责运行应用。</p>
<p><strong>容器进程和应用程序进程之间的一个关键区别是：</strong></p>
<ul>
<li>容器进程以特殊权限运行，而应用程序进程没有。</li>
<li>容器进程可以访问主机系统的资源，并且可以控制在容器内运行的其他进程。</li>
<li>另一方面，应用进程受限于分配给容器的资源，并且不能访问主机系统的资源或控制在容器中运行的其它进程。</li>
<li>另一个区别是容器进程通常由 Docker 守护进程启动，而应用程序进程由容器进程启动。</li>
<li>容器进程通常是创建容器时启动的第一个进程，它负责启动应用程序进程和可能需要的任何其他进程。</li>
</ul>
<h2 id="linux-绑定挂载机制" tabindex="-1"><a class="header-anchor" href="#linux-绑定挂载机制" aria-hidden="true">#</a> Linux 绑定挂载机制</h2>
<p>Docker 使用的是 Linux 的绑定挂载 (bind mount) 技术，这种挂载方式会把宿主机的文件或目录挂载到容器中。</p>
<p><strong>当你使用 docker run 命令挂载一个目录时，Docker 会把宿主机目录挂载到容器中，并且在容器中对该目录的任何修改会同步到宿主机</strong>。这对于在容器中运行应用程序并将其输出保存到宿主机目录中非常有用。</p>
<p>例如，假设你有一个应用程序在容器中运行，并生成一些输出文件。你可以使用下面的命令将宿主机的目录挂载到容器中，以便将应用程序的输出保存到宿主机目录中：</p>
<p><code v-pre>$ docker run -v /host/dir:/container/dir &lt;image&gt;</code></p>
<p>这将把宿主机的 <code v-pre>/host/dir</code> 目录挂载到容器的 <code v-pre>/container/dir</code> 目录。你也可以使用绝对路径或相对路径来指定源目录和目标目录。</p>
<p><strong>绑定机制中修改文件会发生什么？</strong></p>
<p>在使用绑定挂载时，对容器中的文件进行修改会同步到宿主机目录中。</p>
<p>例如，假设你使用下面的命令将宿主机的 /host/dir 目录挂载到容器的 /container/dir 目录：</p>
<p><code v-pre>$ docker run -v /host/dir:/container/dir &lt;image&gt;</code></p>
<p>然后，你在容器中使用以下命令修改 /container/dir 目录中的文件：</p>
<p><code v-pre>$ echo &quot;new content&quot; &gt; /container/dir/file.txt</code></p>
<p>这将在容器中创建或覆盖文件 /container/dir/file.txt ，并且对文件的修改会同步到宿主机的 /host/dir/file.txt 文件中。</p>
<p>同样的，如果你在宿主机上修改 /host/dir/file.txt 文件，那么这些修改也会反映到容器的 /container/dir/file.txt 文件中。</p>
<p>绑定挂载是一种很有用的功能，可以让你在容器中轻松访问和修改宿主机目录中的文件。</p>
<p><strong>内核角度分析：</strong></p>
<p>在 Linux 内核的角度来看，绑定挂载是一种特殊的文件系统挂载方式。</p>
<p>当你执行 &quot;mount&quot; 命令时，你可以指定一个源路径和一个目标路径。源路径是要挂载的文件系统，目标路径是挂载点，即挂载后文件系统在文件系统树中的位置。</p>
<p>在绑定挂载的情况下，源路径和目标路径都是在同一个文件系统中的路径。因此，在绑定挂载的情况下，你可以将一个目录挂载到另一个目录上，而不是将一个文件系统挂载到另一个文件系统上。</p>
<p>绑定挂载可以通过 &quot;mount&quot; 命令的 &quot;--bind&quot; 选项来实现。例如，你可以使用下面的命令将目录 <code v-pre>/host/dir</code> 绑定挂载到目录 <code v-pre>/container/dir </code> 上：</p>
<p><code v-pre>$ mount --bind /host/dir /container/dir</code></p>
<p>在这种情况下，对 /container/dir 目录的任何修改都会同步到 /host/dir 目录中。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '1.md' style='float:left'>⬆️上一节🔗  </a><a href = '3.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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
<h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h3>
<p>https://www.qikqiak.com/k8s-book/</p>
</div></template>


