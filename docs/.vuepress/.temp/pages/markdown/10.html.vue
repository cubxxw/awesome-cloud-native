<template><div><h1 id="容器说明-—-容器的启动和运行" tabindex="-1"><a class="header-anchor" href="#容器说明-—-容器的启动和运行" aria-hidden="true">#</a> 容器说明 — 容器的启动和运行</h1>
<nav class="table-of-contents"><ul><li><router-link to="#前言">前言</router-link></li><li><router-link to="#启动交互式容器-前台命令行">启动交互式容器（前台命令行）</router-link></li><li><router-link to="#启动、重启和删除容器">启动、重启和删除容器</router-link></li><li><router-link to="#后台交互式运行">后台交互式运行</router-link></li><li><router-link to="#查看容器日志">查看容器日志</router-link></li><li><router-link to="#查看容器内运行的进程">查看容器内运行的进程</router-link></li><li><router-link to="#查看容器内部细节">查看容器内部细节</router-link></li><li><router-link to="#进入正在运行的容器并且以命令行交互">进入正在运行的容器并且以命令行交互</router-link></li><li><router-link to="#用redis案例实操">用redis案例实操</router-link></li><li><router-link to="#从容器中拷贝文件到主机上">从容器中拷贝文件到主机上</router-link></li><li><router-link to="#导入和导出容器">导入和导出容器</router-link><ul><li><router-link to="#导出">导出</router-link></li><li><router-link to="#导入">导入</router-link></li></ul></li></ul></nav>
<p>[toc]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p><strong>有镜像才能创建容器，这是根本前提（下载一个Ubuntu或者centos镜像演示）</strong></p>
<p><strong>docker并非是一个通用的容器，它依赖已存在并运行的Linux内核环境</strong></p>
<p><strong>docker实质是在运行的Linux下制造了一个隔离的文件环境，必须要部署在Linux内核上</strong></p>
<blockquote>
<p>我们使用笔记本，搭建win11系统，系统上用VMware软件搭建Ubuntu环境，Ubuntu上下载docker，在docker上面再模拟一个Ubuntu</p>
</blockquote>
<h2 id="启动交互式容器-前台命令行" tabindex="-1"><a class="header-anchor" href="#启动交互式容器-前台命令行" aria-hidden="true">#</a> 启动交互式容器（前台命令行）</h2>
<ul>
<li>
<p><code v-pre>--name</code>：为容器指定一个新的name</p>
</li>
<li>
<p><code v-pre>-i</code>：以交互式模式运行容器，通常与<code v-pre>-t</code>同时使用(interactive)</p>
</li>
<li>
<p><code v-pre>-t</code>：为容器重新分配一个伪输入终端，通常与<code v-pre>-i</code>同时使用(tyy)</p>
<p><strong>也即启动交互式容器（前端有伪终端，等待交互）</strong></p>
</li>
<li>
<p><code v-pre>-P</code>：随机端口映射，大写</p>
</li>
<li>
<p><code v-pre>-p</code>：指定端口映射，小写</p>
</li>
</ul>
<blockquote>
<p>我们普通启动</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/hyerledgerFabric# docker run ubuntu 
root@ubuntu:/hyerledgerFabric# 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>没效果。此时需要用到交互式容器</p>
<h2 id="启动、重启和删除容器" tabindex="-1"><a class="header-anchor" href="#启动、重启和删除容器" aria-hidden="true">#</a> 启动、重启和删除容器</h2>
<ol>
<li>新建+启动容器，ubuntu要有bash/shell作为交互式接口。</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -it ubuntu /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>如果要退出终端，直接输入exit，此时容器停止</strong></p>
<p><strong>可以run进去容器，ctrl+p+q退出，容器不停止，此时可以启动已经停止的容器</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker start 容器ID或者容器名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>重启容器</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker restart ID或者name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>停止容器</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker stop ID或者name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>强行停止容器</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker kill 容器ID或者容器名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>删除已经停止的容器</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker rm ID或者name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="后台交互式运行" tabindex="-1"><a class="header-anchor" href="#后台交互式运行" aria-hidden="true">#</a> 后台交互式运行</h2>
<p><strong>1. 有镜像才能创建容器，这是根本前提（下载一个redis6.0.8镜像演示）</strong></p>
<p><strong>2. 启动守护式容器（后台服务器）</strong></p>
<ul>
<li>
<p><strong>在大部分场景下，我们希望docker的服务是在后台运行的，我们可以通过<code v-pre>-d</code>指定容器的后台运行模式</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d docker_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>redis前后台启动演示case</p>
</li>
</ul>
<p><strong>很重要一点：docker容器后台运行，==必须有一个前台进程==，否则会立即是自杀，所以对于ubuntu来说必须要用<code v-pre>-it</code></strong></p>
<p>容器的命令如果不是那种一直挂起的命令（top.tail）,就是会自动退出，这个是docker的机制问题</p>
<p><img src="@source/markdown/images/dsXLwc4beYiZNlv.png" alt="image-20220509205710035"></p>
<p><strong>一般对于数据库都是使用<code v-pre>-d</code>后台默默启动</strong></p>
<ul>
<li>前台交互式<code v-pre>-it</code></li>
<li>后台守护式<code v-pre>-d</code></li>
</ul>
<blockquote>
<p>想起我们以前学redis的时候，到处都是坑，安装环境啥的配置config啥的，麻烦死了。现在有了docker一条命令解决问题</p>
</blockquote>
<h2 id="查看容器日志" tabindex="-1"><a class="header-anchor" href="#查看容器日志" aria-hidden="true">#</a> 查看容器日志</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker logs 容器ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>当redis出错</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/home/smile<span class="token comment"># docker logs a22dd4f7caf4 </span>
<span class="token number">1</span>:C 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.442 <span class="token comment"># oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo</span>
<span class="token number">1</span>:C 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.442 <span class="token comment"># Redis version=6.2.6, bits=64, commit=00000000, modified=0, pid=1, just started</span>
<span class="token number">1</span>:C 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.442 <span class="token comment"># Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf</span>
<span class="token number">1</span>:M 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.443 * monotonic clock: POSIX clock_gettime
<span class="token number">1</span>:M 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.445 * Running <span class="token assign-left variable">mode</span><span class="token operator">=</span>standalone, <span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">6379</span>.
<span class="token number">1</span>:M 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.446 <span class="token comment"># Server initialized</span>
<span class="token number">1</span>:M 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.446 <span class="token comment"># WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.</span>
<span class="token number">1</span>:M 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.447 * Ready to accept connections
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>后面还有图形化监控哈哈哈哈</p>
<p>一般有些情况下，用到<code v-pre>logs</code>很有必要，比如说我之前做一个云盘cloud，由于云盘用docker后台启动，所以出现的问题是初始化<code v-pre>init</code>时候的信息都没有显示出来，这个时候我们用<code v-pre>docker logs …</code>很有必要了</p>
</blockquote>
<h2 id="查看容器内运行的进程" tabindex="-1"><a class="header-anchor" href="#查看容器内运行的进程" aria-hidden="true">#</a> 查看容器内运行的进程</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker top 容器ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="@source/markdown/images/Xe76W8HZut2SsVo.png" alt="image-20220509210625854"></p>
<h2 id="查看容器内部细节" tabindex="-1"><a class="header-anchor" href="#查看容器内部细节" aria-hidden="true">#</a> 查看容器内部细节</h2>
<blockquote>
<p>可以把容器看作一个简易版的Linux环境和运行在其中的应用程序</p>
</blockquote>
<p><strong>以json形式保存</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker inspect 容器ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/09/M57CORzx3qw9EYl.png" alt="image-20220509210901032"></p>
<h2 id="进入正在运行的容器并且以命令行交互" tabindex="-1"><a class="header-anchor" href="#进入正在运行的容器并且以命令行交互" aria-hidden="true">#</a> 进入正在运行的容器并且以命令行交互</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker exec -it 容器ID bashShell
#或者
docker attach 容器ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/home/smile<span class="token comment"># docker exec -it 7672921e03e4 /bin/bash</span>
root@7672921e03e4:/<span class="token comment"># uname </span>
Linux
root@ubuntu:/home/smile<span class="token comment"># docker attach 7672921e03e4</span>
root@7672921e03e4:/<span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意区别：</strong></p>
<ul>
<li><strong>attach直接进入容器启动命令的终端，用exit退出不会产生新的进程</strong></li>
<li><strong>exec是在容器中打开新的终端，并且可以启动新的进程，用exit退出不会导致容器的停止</strong></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>推荐使用exec，保证容器不会退出</p>
</div>
<h2 id="用redis案例实操" tabindex="-1"><a class="header-anchor" href="#用redis案例实操" aria-hidden="true">#</a> 用redis案例实操</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/home/smile<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS      NAMES
a22dd4f7caf4   redis     <span class="token string">"docker-entrypoint.s…"</span>   <span class="token number">25</span> minutes ago   Up <span class="token number">25</span> minutes   <span class="token number">6379</span>/tcp   strange_elgamal
root@ubuntu:/home/smile<span class="token comment"># docker exec -it a22dd4f7caf4 /bin/bash    </span>
root@a22dd4f7caf4:/data<span class="token comment"># redis-cli -p 6379</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token function">ping</span>
PONG
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> k1 v1
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get k1
<span class="token string">"v1"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="从容器中拷贝文件到主机上" tabindex="-1"><a class="header-anchor" href="#从容器中拷贝文件到主机上" aria-hidden="true">#</a> 从容器中拷贝文件到主机上</h2>
<blockquote>
<p>如果我们在一家公司，我们在容器中的Ubuntu中新创建了一个文件，怎么把容器中的内容文件拷贝到主机上，用来备份<strong>下面是备份halo博客到本地</strong></p>
<p><img src="https://sm.nsddd.top//typora/image-20220912191258516.png?mail:3293172751@qq.com" alt="image-20220912191258516"></p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker cp 容器ID：容器内路径 目的主机路径
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="@source/markdown/images/hzrfSYwLy3E5lJq.png" alt="image-20220509213628075"></p>
<h2 id="导入和导出容器" tabindex="-1"><a class="header-anchor" href="#导入和导出容器" aria-hidden="true">#</a> 导入和导出容器</h2>
<blockquote>
<p>上一个只能把容器中的资料拷贝出来，这个可以把整个镜像或者容器进行备份,<strong>默认导出到当前路径下面</strong></p>
</blockquote>
<h3 id="导出" tabindex="-1"><a class="header-anchor" href="#导出" aria-hidden="true">#</a> 导出</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker export 容器ID > abcd.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="导入" tabindex="-1"><a class="header-anchor" href="#导入" aria-hidden="true">#</a> 导入</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat 文件名.tar | docker import - 镜像用户/镜像名：镜像版本号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/09/mipHGXC5eAakcoL.png" alt="image-20220509214436456"></p>
<div class="custom-container warning"><p class="custom-container-title">导出和拷贝</p>
<p>我们根据上面的命令看出导出可以选择文件夹的压缩方式，类似于数据库的导出，可以指定容器的版本号，但是拷贝就是<code v-pre>Ctrl + v</code>了，可以指定路径，毕竟docker机制很顽强。个人比较喜欢拷贝。</p>
<p>导出我一般喜欢提交到远程仓库~</p>
</div>
</div></template>


