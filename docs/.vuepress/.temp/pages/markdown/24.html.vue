<template><div><h1 id="dockerfile解析" tabindex="-1"><a class="header-anchor" href="#dockerfile解析" aria-hidden="true">#</a> DockerFile解析</h1>
<nav class="table-of-contents"><ul><li><router-link to="#需求">需求</router-link></li><li><router-link to="#dockerfile">DockerFile</router-link></li><li><router-link to="#应用软件的角度">应用软件的角度</router-link></li><li><router-link to="#dockerfile内容基础">dockerfile内容基础</router-link></li><li><router-link to="#docker执行dockerfile的流程">docker执行dockerfile的流程</router-link></li><li><router-link to="#构建步骤">构建步骤</router-link></li><li><router-link to="#run-执行命令">RUN 执行命令</router-link></li><li><router-link to="#构建镜像">构建镜像</router-link></li><li><router-link to="#镜像构建上下文-context">镜像构建上下文（Context）</router-link></li><li><router-link to="#其它-docker-build-的用法">其它 docker build 的用法</router-link><ul><li><router-link to="#直接用-git-repo-进行构建">直接用 Git repo 进行构建</router-link></li><li><router-link to="#用给定的-tar-压缩包构建">用给定的 tar 压缩包构建</router-link></li><li><router-link to="#从标准输入中读取-dockerfile-进行构建">从标准输入中读取 Dockerfile 进行构建</router-link></li><li><router-link to="#从标准输入中读取上下文压缩包进行构建">从标准输入中读取上下文压缩包进行构建</router-link></li></ul></li></ul></nav>
<p>[toc]</p>
<h2 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h2>
<p><strong>我们在前面学习镜像的时候，不含有<code v-pre>vim/ifconfig</code>等命令，所以我们需要重新按照那些命令</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker commit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>对于简单的可能会是一个很好的选择，但是对于随时变化的镜像来说，特别麻烦</p>
</blockquote>
<p><strong>可不可以一次性搞定？</strong></p>
<blockquote>
<p>某种镜像的增强，给我<code v-pre>list</code>做个清单，后续我加入任何功能，直接在list单子里面run，相当于多次提交</p>
<p><strong>一次性添加，一次性成型</strong></p>
</blockquote>
<h2 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> DockerFile</h2>
<p><strong>dockerfile是用来构建docker镜像的文本文件，是由一条条构建镜像所需要的指令和参数构成的脚本</strong></p>
<h2 id="应用软件的角度" tabindex="-1"><a class="header-anchor" href="#应用软件的角度" aria-hidden="true">#</a> 应用软件的角度</h2>
<ul>
<li>dockerfile是软件原材料（写需要的东西）</li>
<li>docker镜像是软件的交付品</li>
<li>docker容器则可以认为是镜像的运行态，也即依照镜像运行的容器实例</li>
</ul>
<p><img src="https://sm.nsddd.top/smJqBckovlsptOPSE.jpg?xxw@nsddd.top" alt="docker-graphic"></p>
<h2 id="dockerfile内容基础" tabindex="-1"><a class="header-anchor" href="#dockerfile内容基础" aria-hidden="true">#</a> dockerfile内容基础</h2>
<ul>
<li>每条指令必须为<strong>大写字母</strong>并且后至少有一个参数</li>
<li>指令按照从上到下，顺序执行</li>
<li><code v-pre>#</code>表示注释</li>
<li>每条指令都会创建一个新的镜像层并对镜像进行提交</li>
</ul>
<h2 id="docker执行dockerfile的流程" tabindex="-1"><a class="header-anchor" href="#docker执行dockerfile的流程" aria-hidden="true">#</a> docker执行dockerfile的流程</h2>
<ol>
<li><code v-pre>docker</code>从基础镜像中运行一个容器</li>
<li>执行一条指令并对容器做出修改</li>
<li>执行类似<code v-pre>docker commit</code>的操作提交一个新的镜像层</li>
<li><code v-pre>docker</code>再基于刚提交的镜像运行一个新的容器</li>
<li>执行<code v-pre>dockerfile</code>中的下一条指令直到所有指令都执行完毕</li>
</ol>
<h2 id="构建步骤" tabindex="-1"><a class="header-anchor" href="#构建步骤" aria-hidden="true">#</a> 构建步骤</h2>
<ol>
<li>
<p>编写<code v-pre>dockerfile</code>文件</p>
</li>
<li>
<p><code v-pre>docker build</code>创建镜像</p>
</li>
<li>
<p><code v-pre>docker run</code> 依照镜像运行容器实例</p>
</li>
</ol>
<h2 id="run-执行命令" tabindex="-1"><a class="header-anchor" href="#run-执行命令" aria-hidden="true">#</a> RUN 执行命令</h2>
<p><code v-pre>RUN</code> 指令是用来执行命令行命令的。由于命令行的强大能力，<code v-pre>RUN</code> 指令在定制镜像时是最常用的指令之一。其格式有两种：</p>
<ul>
<li><code v-pre>shell</code> 格式：<code v-pre>RUN &lt;命令&gt;</code>，就像直接在命令行中输入的命令一样。刚才写的 Dockerfile 中的 <code v-pre>RUN</code> 指令就是这种格式。</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>RUN <span class="token builtin class-name">echo</span> <span class="token string">'&lt;h1>Hello, Docker!&lt;/h1>'</span> <span class="token operator">></span> /usr/share/nginx/html/index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>exec</code> 格式：<code v-pre>RUN [&quot;可执行文件&quot;, &quot;参数1&quot;, &quot;参数2&quot;]</code>，这更像是函数调用中的格式。</li>
</ul>
<p>既然 <code v-pre>RUN</code> 就像 Shell 脚本一样可以执行命令，那么我们是否就可以像 Shell 脚本一样把每个命令对应一个 RUN 呢？比如这样：</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> debian:stretch</span>

<span class="token instruction"><span class="token keyword">RUN</span> apt-get update</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get install -y gcc libc6-dev make wget</span>
<span class="token instruction"><span class="token keyword">RUN</span> wget -O redis.tar.gz <span class="token string">"http://download.redis.io/releases/redis-5.0.3.tar.gz"</span></span>
<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /usr/src/redis</span>
<span class="token instruction"><span class="token keyword">RUN</span> tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1</span>
<span class="token instruction"><span class="token keyword">RUN</span> make -C /usr/src/redis</span>
<span class="token instruction"><span class="token keyword">RUN</span> make -C /usr/src/redis install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之前说过，Dockerfile 中每一个指令都会建立一层，<code v-pre>RUN</code> 也不例外。每一个 <code v-pre>RUN</code> 的行为，就和刚才我们手工建立镜像的过程一样：新建立一层，在其上执行这些命令，执行结束后，<code v-pre>commit</code> 这一层的修改，构成新的镜像。</p>
<p>而上面的这种写法，创建了 7 层镜像。这是完全没有意义的，而且很多运行时不需要的东西，都被装进了镜像里，比如编译环境、更新的软件包等等。结果就是产生非常臃肿、非常多层的镜像，不仅仅增加了构建部署的时间，也很容易出错。 这是很多初学 Docker 的人常犯的一个错误。</p>
<blockquote>
<p><em>Union FS 是有最大层数限制的，比如 AUFS，曾经是最大不得超过 42 层，现在是不得超过 127 层。</em></p>
</blockquote>
<p>上面的 <code v-pre>Dockerfile</code> 正确的写法应该是这样：</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> debian:stretch</span>

<span class="token instruction"><span class="token keyword">RUN</span> set -x; buildDeps=<span class="token string">'gcc libc6-dev make wget'</span> <span class="token operator">\</span>
    &amp;&amp; apt-get update <span class="token operator">\</span>
    &amp;&amp; apt-get install -y <span class="token variable">$buildDeps</span> <span class="token operator">\</span>
    &amp;&amp; wget -O redis.tar.gz <span class="token string">"http://download.redis.io/releases/redis-5.0.3.tar.gz"</span> <span class="token operator">\</span>
    &amp;&amp; mkdir -p /usr/src/redis <span class="token operator">\</span>
    &amp;&amp; tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1 <span class="token operator">\</span>
    &amp;&amp; make -C /usr/src/redis <span class="token operator">\</span>
    &amp;&amp; make -C /usr/src/redis install <span class="token operator">\</span>
    &amp;&amp; rm -rf /var/lib/apt/lists/* <span class="token operator">\</span>
    &amp;&amp; rm redis.tar.gz <span class="token operator">\</span>
    &amp;&amp; rm -r /usr/src/redis <span class="token operator">\</span>
    &amp;&amp; apt-get purge -y --auto-remove <span class="token variable">$buildDeps</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>首先，之前所有的命令只有一个目的，就是编译、安装 redis 可执行文件。因此没有必要建立很多层，这只是一层的事情。因此，这里没有使用很多个 <code v-pre>RUN</code> 一一对应不同的命令，而是仅仅使用一个 <code v-pre>RUN</code> 指令，并使用 <code v-pre>&amp;&amp;</code> 将各个所需命令串联起来。将之前的 7 层，简化为了 1 层。在撰写 <code v-pre>Dockerfile</code> 的时候，要经常提醒自己，这并不是在写 <code v-pre>Shell</code> 脚本，而是在定义每一层该如何构建。</p>
<p>并且，这里为了格式化还进行了换行。<code v-pre>Dockerfile</code> 支持 <code v-pre>Shell</code> 类的行尾添加 <code v-pre>\</code> 的命令换行方式，以及行首 <code v-pre>#</code> 进行注释的格式。良好的格式，比如换行、缩进、注释等，会让维护、排障更为容易，这是一个比较好的习惯。</p>
<p>此外，还可以看到这一组命令的最后添加了清理工作的命令，删除了为了编译构建所需要的软件，清理了所有下载、展开的文件，并且还清理了 <code v-pre>apt</code> 缓存文件。这是很重要的一步，我们之前说过，镜像是多层存储，每一层的东西并不会在下一层被删除，会一直跟随着镜像。因此镜像构建时，一定要确保每一层只添加真正需要添加的东西，任何无关的东西都应该清理掉。</p>
<p>很多人初学 <code v-pre>Docker</code> 制作出了很臃肿的镜像的原因之一，就是忘记了每一层构建的最后一定要清理掉无关文件。</p>
<h2 id="构建镜像" tabindex="-1"><a class="header-anchor" href="#构建镜像" aria-hidden="true">#</a> 构建镜像</h2>
<p>好了，让我们再回到之前定制的 <code v-pre>nginx</code> 镜像的 <code v-pre>Dockerfile</code> 来。现在我们明白了这个 <code v-pre>Dockerfile</code> 的内容，那么让我们来构建这个镜像吧。</p>
<p>在 <code v-pre>Dockerfile</code> 文件所在目录执行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> build <span class="token parameter variable">-t</span> nginx:v3 <span class="token builtin class-name">.</span>
Sending build context to Docker daemon <span class="token number">2.048</span> kB
Step <span class="token number">1</span> <span class="token builtin class-name">:</span> FROM nginx
 ---<span class="token operator">></span> e43d811ce2f4
Step <span class="token number">2</span> <span class="token builtin class-name">:</span> RUN <span class="token builtin class-name">echo</span> <span class="token string">'&lt;h1>Hello, Docker!&lt;/h1>'</span> <span class="token operator">></span> /usr/share/nginx/html/index.html
 ---<span class="token operator">></span> Running <span class="token keyword">in</span> 9cdc27646c7b
 ---<span class="token operator">></span> 44aa4490ce2c
Removing intermediate container 9cdc27646c7b
Successfully built 44aa4490ce2c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从命令的输出结果中，我们可以清晰的看到镜像的构建过程。在 <code v-pre>Step 2</code> 中，如同我们之前所说的那样，<code v-pre>RUN</code> 指令启动了一个容器 <code v-pre>9cdc27646c7b</code>，执行了所要求的命令，并最后提交了这一层 <code v-pre>44aa4490ce2c</code>，随后删除了所用到的这个容器 <code v-pre>9cdc27646c7b</code>。</p>
<p>这里我们使用了 <code v-pre>docker build</code> 命令进行镜像构建。其格式为：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build <span class="token punctuation">[</span>选项<span class="token punctuation">]</span> <span class="token operator">&lt;</span>上下文路径/URL/-<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在这里我们指定了最终镜像的名称 <code v-pre>-t nginx:v3</code>，构建成功后，我们可以像之前运行 <code v-pre>nginx:v2</code> 那样来运行这个镜像，其结果会和 <code v-pre>nginx:v2</code> 一样。</p>
<h2 id="镜像构建上下文-context" tabindex="-1"><a class="header-anchor" href="#镜像构建上下文-context" aria-hidden="true">#</a> 镜像构建上下文（Context）</h2>
<p>如果注意，会看到 <code v-pre>docker build</code> 命令最后有一个 <code v-pre>.</code>。<code v-pre>.</code> 表示当前目录，而 <code v-pre>Dockerfile</code> 就在当前目录，因此不少初学者以为这个路径是在指定 <code v-pre>Dockerfile</code> 所在路径，这么理解其实是不准确的。如果对应上面的命令格式，你可能会发现，这是在指定 <strong>上下文路径</strong>。那么什么是上下文呢？</p>
<p>首先我们要理解 <code v-pre>docker build</code> 的工作原理。Docker 在运行时分为 Docker 引擎（也就是服务端守护进程）和客户端工具。Docker 的引擎提供了一组 REST API，被称为 <a href="https://docs.docker.com/develop/sdk/" target="_blank" rel="noopener noreferrer">Docker Remote API<ExternalLinkIcon/></a>，而如 <code v-pre>docker</code> 命令这样的客户端工具，则是通过这组 API 与 Docker 引擎交互，从而完成各种功能。因此，虽然表面上我们好像是在本机执行各种 <code v-pre>docker</code> 功能，但实际上，一切都是使用的远程调用形式在服务端（Docker 引擎）完成。也因为这种 <code v-pre>C/S</code> 设计，让我们操作远程服务器的 Docker 引擎变得轻而易举。</p>
<p>当我们进行镜像构建的时候，并非所有定制都会通过 <code v-pre>RUN</code> 指令完成，经常会需要将一些本地文件复制进镜像，比如通过 <code v-pre>COPY</code> 指令、<code v-pre>ADD</code> 指令等。而 <code v-pre>docker build</code> 命令构建镜像，其实并非在本地构建，而是在服务端，也就是 Docker 引擎中构建的。那么在这种客户端/服务端的架构中，如何才能让服务端获得本地文件呢？</p>
<p>这就引入了上下文的概念。当构建的时候，用户会指定构建镜像上下文的路径，<code v-pre>docker build</code> 命令得知这个路径后，会将路径下的所有内容打包，然后上传给 Docker 引擎。这样 Docker 引擎收到这个上下文包后，展开就会获得构建镜像所需的一切文件。</p>
<p>如果在 <code v-pre>Dockerfile</code> 中这么写：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>COPY ./package.json /app/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这并不是要复制执行 <code v-pre>docker build</code> 命令所在的目录下的 <code v-pre>package.json</code>，也不是复制 <code v-pre>Dockerfile</code> 所在目录下的 <code v-pre>package.json</code>，而是复制 <strong>上下文（context）</strong> 目录下的 <code v-pre>package.json</code>。</p>
<p>因此，<code v-pre>COPY</code> 这类指令中的源文件的路径都是<em>相对路径</em>。这也是初学者经常会问的为什么 <code v-pre>COPY ../package.json /app</code> 或者 <code v-pre>COPY /opt/xxxx /app</code> 无法工作的原因，因为这些路径已经超出了上下文的范围，Docker 引擎无法获得这些位置的文件。如果真的需要那些文件，应该将它们复制到上下文目录中去。</p>
<p>现在就可以理解刚才的命令 <code v-pre>docker build -t nginx:v3 .</code> 中的这个 <code v-pre>.</code>，实际上是在指定上下文的目录，<code v-pre>docker build</code> 命令会将该目录下的内容打包交给 Docker 引擎以帮助构建镜像。</p>
<p>如果观察 <code v-pre>docker build</code> 输出，我们其实已经看到了这个发送上下文的过程：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> build <span class="token parameter variable">-t</span> nginx:v3 <span class="token builtin class-name">.</span>

Sending build context to Docker daemon <span class="token number">2.048</span> kB

<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>理解构建上下文对于镜像构建是很重要的，避免犯一些不应该的错误。比如有些初学者在发现 <code v-pre>COPY /opt/xxxx /app</code> 不工作后，于是干脆将 <code v-pre>Dockerfile</code> 放到了硬盘根目录去构建，结果发现 <code v-pre>docker build</code> 执行后，在发送一个几十 GB 的东西，极为缓慢而且很容易构建失败。那是因为这种做法是在让 <code v-pre>docker build</code> 打包整个硬盘，这显然是使用错误。</p>
<p>一般来说，应该会将 <code v-pre>Dockerfile</code> 置于一个空目录下，或者项目根目录下。如果该目录下没有所需文件，那么应该把所需文件复制一份过来。如果目录下有些东西确实不希望构建时传给 Docker 引擎，那么可以用 <code v-pre>.gitignore</code> 一样的语法写一个 <code v-pre>.dockerignore</code>，该文件是用于剔除不需要作为上下文传递给 Docker 引擎的。</p>
<p>那么为什么会有人误以为 <code v-pre>.</code> 是指定 <code v-pre>Dockerfile</code> 所在目录呢？这是因为在默认情况下，如果不额外指定 <code v-pre>Dockerfile</code> 的话，会将上下文目录下的名为 <code v-pre>Dockerfile</code> 的文件作为 Dockerfile。</p>
<p>这只是默认行为，实际上 <code v-pre>Dockerfile</code> 的文件名并不要求必须为 <code v-pre>Dockerfile</code>，而且并不要求必须位于上下文目录中，比如可以用 <code v-pre>-f ../Dockerfile.php</code> 参数指定某个文件作为 <code v-pre>Dockerfile</code>。</p>
<p>当然，一般大家习惯性的会使用默认的文件名 <code v-pre>Dockerfile</code>，以及会将其置于镜像构建上下文目录中。</p>
<h2 id="其它-docker-build-的用法" tabindex="-1"><a class="header-anchor" href="#其它-docker-build-的用法" aria-hidden="true">#</a> 其它 <code v-pre>docker build</code> 的用法</h2>
<h3 id="直接用-git-repo-进行构建" tabindex="-1"><a class="header-anchor" href="#直接用-git-repo-进行构建" aria-hidden="true">#</a> 直接用 Git repo 进行构建</h3>
<p>或许你已经注意到了，<code v-pre>docker build</code> 还支持从 URL 构建，比如可以直接从 Git repo 中构建：</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment"># $env:DOCKER_BUILDKIT=0</span>

<span class="token comment"># export DOCKER_BUILDKIT=0</span>

$ docker build -t hello-world https://github.com/docker-library/hello-world.git#master:amd64/hello-world

Step 1/3 : FROM scratch

 --->

Step 2/3 : COPY hello /

 ---> ac779757d46e

Step 3/3 : CMD ["/hello"]

 ---> Running in d2a513a760ed

Removing intermediate container d2a513a760ed

 ---> 038ad4142d2b

Successfully built 038ad4142d2b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这行命令指定了构建所需的 Git repo，并且指定分支为 <code v-pre>master</code>，构建目录为 <code v-pre>/amd64/hello-world/</code>，然后 Docker 就会自己去 <code v-pre>git clone</code> 这个项目、切换到指定分支、并进入到指定目录后开始构建。</p>
<h3 id="用给定的-tar-压缩包构建" tabindex="-1"><a class="header-anchor" href="#用给定的-tar-压缩包构建" aria-hidden="true">#</a> 用给定的 tar 压缩包构建</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ docker build http://server/context.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果所给出的 URL 不是个 Git repo，而是个 <code v-pre>tar</code> 压缩包，那么 Docker 引擎会下载这个包，并自动解压缩，以其作为上下文，开始构建。</p>
<h3 id="从标准输入中读取-dockerfile-进行构建" tabindex="-1"><a class="header-anchor" href="#从标准输入中读取-dockerfile-进行构建" aria-hidden="true">#</a> 从标准输入中读取 Dockerfile 进行构建</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build - &lt; Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat Dockerfile | docker build -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果标准输入传入的是文本文件，则将其视为 <code v-pre>Dockerfile</code>，并开始构建。这种形式由于直接从标准输入中读取 Dockerfile 的内容，它没有上下文，因此不可以像其他方法那样可以将本地文件 <code v-pre>COPY</code> 进镜像之类的事情。</p>
<h3 id="从标准输入中读取上下文压缩包进行构建" tabindex="-1"><a class="header-anchor" href="#从标准输入中读取上下文压缩包进行构建" aria-hidden="true">#</a> 从标准输入中读取上下文压缩包进行构建</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ docker build - &lt; context.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果发现标准输入的文件格式是 <code v-pre>gzip</code>、<code v-pre>bzip2</code> 以及 <code v-pre>xz</code> 的话，将会使其为上下文压缩包，直接将其展开，将里面视为上下文，并开始构建。</p>
</div></template>


