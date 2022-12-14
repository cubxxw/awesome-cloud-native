<template><div><h1 id="容器数据卷读写规则和继承" tabindex="-1"><a class="header-anchor" href="#容器数据卷读写规则和继承" aria-hidden="true">#</a> 容器数据卷读写规则和继承</h1>
<nav class="table-of-contents"><ul><li><router-link to="#什么是卷">什么是卷？</router-link></li><li><router-link to="#有点类似于redis中的rdb和aof文件">有点类似于redis中的rdb和aof文件</router-link></li><li><router-link to="#运行一个带容器卷存储功能的容器实例">运行一个带容器卷存储功能的容器实例</router-link></li><li><router-link to="#容器卷和主机互联互通">容器卷和主机互联互通</router-link></li><li><router-link to="#如何运行">如何运行</router-link></li><li><router-link to="#查看容器卷是否挂载成功">查看容器卷是否挂载成功</router-link></li><li><router-link to="#特殊情况下的互联互通">特殊情况下的互联互通</router-link></li><li><router-link to="#了解容器卷的读写规则和映射的添加说明">了解容器卷的读写规则和映射的添加说明</router-link><ul><li><router-link to="#设置为只读">设置为只读</router-link></li><li><router-link to="#设置为只写">设置为只写</router-link></li></ul></li><li><router-link to="#卷的继承和共享">卷的继承和共享</router-link></li></ul></nav>
<p>[toc]</p>
<h2 id="什么是卷" tabindex="-1"><a class="header-anchor" href="#什么是卷" aria-hidden="true">#</a> 什么是卷？</h2>
<blockquote>
<p>卷就是目录或者文件，存在于一个或者多个容器中，有docker挂载到容器，但不属于联合文件系统，因此能逃过Union file system 提供的一些持续存储或者共享数据的特性</p>
<p><strong>卷的设计目的就是数据持久化，完全独立于容器的生存周期，因此docker不会在容器删除时删除其挂载的数据卷</strong></p>
</blockquote>
<h2 id="有点类似于redis中的rdb和aof文件" tabindex="-1"><a class="header-anchor" href="#有点类似于redis中的rdb和aof文件" aria-hidden="true">#</a> 有点类似于redis中的rdb和aof文件</h2>
<details class="custom-container details"><summary>RDB文件和aof文件</summary>
<p>1、RDB文件用于保存和还原Redis服务器所有数据库中的所有键值对数据
2、SAVE命令由服务器进程直接执行保存操作，该命令会阻塞服务器
3、BGSAVE命令由子进程执行保存操作，不会阻塞服务器
注意此时服务器的状态：在处理BGSAVE命令时，服务器处理SAVE、BGSAVE、BGREWRITEAOF三个命令方式与平时不同。</p>
<p>客户端发送的SAVE命令会被服务器拒绝，服务器禁止SAVE命令与BGSAVE同时执行，是为了避免父进程与子进程同时执行rdbSave调用，产生竞争条件。
客户端发送的BGSAVE命令也会被服务器拒绝，因为同时执行两个BGSAVE也会产生竞争条件。
最后：BGSAVE和BGREWRITEAOF不能同时执行：因为两个命令实际工作都是由子进程执行，所以两个命令在操作方面没有冲突，但是并发出两个子进程，并且两个子进程都是同时执行大量的磁盘写入操作的话不是个好主意。
4、服务器状态中会保存所有用save选项设置的保存条件，当任意一个保存条件被满足，服务器自动执行BGSAVE
5、RDB文件时一个经过压缩的二进制文件，由多个部分组成
6、对于不同类型的键值对，RDB文件会使用不同方式保存</p>
<p>AOF文件
1、APF文件通过保存所有修改数据库的写命令请求来记录服务器的数据库状态
2、AOF文件中的所有命令都是以Redis命令请求协议的格式保存的
3、命令请求会先保存到AOF缓冲区中，之后再定期写入并同步到AOF文件
4、appendfsync选项的不同值对于AOF持久化功能的安全性以及Redis服务器的性能有很大影响</p>
<p>当appendfsync的值为always时，服务器在每个事件循环都要将aof_buf缓冲区中的所有内容写到AOF文件中，并且同步AOF文件，所以always的效率最慢，但安全性最强，出现故障，AOF持久化也只会丢失一个事件循环中所产生的命令数据
当appendfsync的值为everysec时，服务器在每个事件循环都要将aof_buf缓冲区中的所有内容写入到AOF文件，并且每隔一秒就要在子线程中对AOF文件进行一次同步。效率足够快，出现故障也只会丢失一秒钟的命令数据
当appendfsync的值为no时，服务器在每个事件循环都要将aof_buf缓冲区中的所有内容写入到AOF文件中，何是同步由操作系统控制。该模式下的AOF文件写入速度最快，因为缓存了足够多的数据，但是出现故障会丢失上次同步AOF之后的所有写命令数据
5、服务器只要载入并重新执行保存在AOF文件中的命令，就可以还原数据库本来的状态（通过创建一个不带网络连接的伪客户端）
6、AOF重写可以产生一个新的AOF文件，新文件与原有文件所保存的数据库状态一样，但是体积更小
7、AOF重写的功能时通过读取数据库中的键值对来实现的，程序无须对现有AOF文件进行任何读入、分析或者写入操作
8、执行BGREWRITEAOF命令时，Redis服务器会维护一个AOF重写缓冲区，该缓冲区会在子进程创建新AOF文件期间，记录服务器执行的所有写命令。当子进程完成创建新AOF文件的工作之后，服务器会将重写缓冲区中的所有内容追加到新AOF文件的末尾，使得新旧两个AOF文件所保存的数据库状态一致。最后，服务器用新的AOF文件替换掉旧AOF文件，完成文件重写操作</p>
</details>
<div class="custom-container warning"><p class="custom-container-title">提醒</p>
<p>⚠️ 可以将docker容器中的数据保存到宿主机的磁盘中</p>
</div>
<h2 id="运行一个带容器卷存储功能的容器实例" tabindex="-1"><a class="header-anchor" href="#运行一个带容器卷存储功能的容器实例" aria-hidden="true">#</a> 运行一个带容器卷存储功能的容器实例</h2>
<p><strong>特点：</strong></p>
<ul>
<li>数据卷可在容器之间共享或重用数据</li>
<li>卷中的更改可以直接生效。爽（实时）</li>
<li>数据卷中的更改不会包含在镜像的更新中</li>
<li>数据卷的生命周期一直此需要没有容器使用它为止</li>
</ul>
<blockquote>
<p>cp需要手动拷贝，而容器卷可以实时拷贝</p>
</blockquote>
<h2 id="容器卷和主机互联互通" tabindex="-1"><a class="header-anchor" href="#容器卷和主机互联互通" aria-hidden="true">#</a> 容器卷和主机互联互通</h2>
<h2 id="如何运行" tabindex="-1"><a class="header-anchor" href="#如何运行" aria-hidden="true">#</a> 如何运行</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -it --privileged=true -v /宿主机绝对路径目录：/容器内目录   镜像名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>宿主机的绝对路径映射到容器类的目录</p>
</blockquote>
<p><strong><code v-pre>-v</code>：可以指定多个路径</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/etc/v2ray<span class="token comment"># docker images</span>
REPOSITORY                                         TAG       IMAGE ID       CREATED        SIZE
smile/myubuntu                                     <span class="token number">1.0</span>.0     b52dbe11bca0   <span class="token number">18</span> hours ago   231MB
registry.cn-hangzhou.aliyuncs.com/nsddd/myubuntu   latest    6962da3091d1   <span class="token number">19</span> hours ago   108MB
tomcat                                             latest    fb5657adc892   <span class="token number">4</span> months ago   680MB
redis                                              latest    7614ae9453d1   <span class="token number">4</span> months ago   113MB
python                                             latest    a5d7930b60cc   <span class="token number">4</span> months ago   917MB
v2fly/v2fly-core                                   latest    9fb39a47a148   <span class="token number">5</span> months ago   <span class="token number">53</span>.4MB
registry                                           latest    b8604a3fe854   <span class="token number">5</span> months ago   <span class="token number">26</span>.2MB
ubuntu                                             latest    ba6acccedd29   <span class="token number">6</span> months ago   <span class="token number">72</span>.8MB
root@ubuntu:/etc/v2ray<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE              COMMAND                  CREATED         STATUS                         PORTS     NAMES
f19e7fbc3d18   v2fly/v2fly-core   <span class="token string">"/usr/bin/v2ray -con…"</span>   <span class="token number">8</span> minutes ago   Restarting <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">3</span> seconds ago             tcp
root@ubuntu:/etc/v2ray<span class="token comment"># docker run -it --privileged=true -v /tmp/host_data:/tmp/docker_data --name=u1 ubuntu</span>
root@37d9f24e95a3:/<span class="token comment"># cd /tmp/docker_data/</span>
root@37d9f24e95a3:/tmp/docker_data<span class="token comment"># ls</span>
root@37d9f24e95a3:/tmp/docker_data<span class="token comment"># mkdir a &amp;&amp; touch a.txt b.txt</span>
root@37d9f24e95a3:/tmp/docker_data<span class="token comment"># ls</span>
a  a.txt  b.txt
root@37d9f24e95a3:/tmp/docker_data<span class="token comment"># root@ubuntu:/etc/v2ray# cd /tmp/host_data/ &amp;&amp; ls</span>
a  a.txt  b.txt
root@ubuntu:/tmp/host_data<span class="token comment"># touch zhuji.txt &amp;&amp; ls</span>
a  a.txt  b.txt  zhuji.txt
root@ubuntu:/tmp/host_data<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE              COMMAND                  CREATED          STATUS                          PORTS     NAMES
37d9f24e95a3   ubuntu             <span class="token string">"bash"</span>                   <span class="token number">2</span> minutes ago    Up <span class="token number">2</span> minutes                              u1
f19e7fbc3d18   v2fly/v2fly-core   <span class="token string">"/usr/bin/v2ray -con…"</span>   <span class="token number">13</span> minutes ago   Restarting <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">14</span> seconds ago             tcp
root@ubuntu:/tmp/host_data<span class="token comment"># docker exec -it 37d9f24e95a3 /bin/bash</span>
root@37d9f24e95a3:/<span class="token comment"># cd /tmp/docker_data/ &amp;&amp; ls</span>
a  a.txt  b.txt  zhuji.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>由此可见，同步回来了，这样对于开发者来说特别方便</strong></p>
<h2 id="查看容器卷是否挂载成功" tabindex="-1"><a class="header-anchor" href="#查看容器卷是否挂载成功" aria-hidden="true">#</a> 查看容器卷是否挂载成功</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker inspect 容器id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>我们看mounts（挂载)下面的json字符串</strong></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>        <span class="token property">"Mounts"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token property">"Type"</span><span class="token operator">:</span> <span class="token string">"bind"</span><span class="token punctuation">,</span>
                <span class="token property">"Source"</span><span class="token operator">:</span> <span class="token string">"/tmp/host_data"</span><span class="token punctuation">,</span>
                <span class="token property">"Destination"</span><span class="token operator">:</span> <span class="token string">"/tmp/docker_data"</span><span class="token punctuation">,</span>
                <span class="token property">"Mode"</span><span class="token operator">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                <span class="token property">"RW"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
                <span class="token property">"Propagation"</span><span class="token operator">:</span> <span class="token string">"rprivate"</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>source使指宿主机路径</li>
<li>destination是指目的容器的路径</li>
</ul>
<h2 id="特殊情况下的互联互通" tabindex="-1"><a class="header-anchor" href="#特殊情况下的互联互通" aria-hidden="true">#</a> 特殊情况下的互联互通</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker stop 容器id
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>我们停止容器id后，此时在主机上创建一个文件，如果此时恢复容器后，会不会同步</strong></p>
<p><strong>答案：会</strong></p>
<blockquote>
<p>因为是双线的同步</p>
</blockquote>
<h2 id="了解容器卷的读写规则和映射的添加说明" tabindex="-1"><a class="header-anchor" href="#了解容器卷的读写规则和映射的添加说明" aria-hidden="true">#</a> 了解容器卷的读写规则和映射的添加说明</h2>
<ul>
<li>只读（默认）</li>
<li>只写</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -it --privileged=true -v /宿主机绝对路径目录：/容器内目录   镜像名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>上面的命令相当于是在容器后面加了<code v-pre>:rw</code>，是可以读可以写的，我们可以设置为只读或者只写</strong></p>
<h3 id="设置为只读" tabindex="-1"><a class="header-anchor" href="#设置为只读" aria-hidden="true">#</a> 设置为只读</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -it --privileged=true -v /宿主机绝对路径目录：/容器内目录:ro   镜像名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong><code v-pre>ro</code>:read only</strong></p>
<p><strong>此时如果宿主机写入内容，可以同步给容器，容器自己只能读入不能写</strong></p>
<h3 id="设置为只写" tabindex="-1"><a class="header-anchor" href="#设置为只写" aria-hidden="true">#</a> 设置为只写</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -it --privileged=true -v /宿主机绝对路径目录：/容器内目录:wo   镜像名称
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="卷的继承和共享" tabindex="-1"><a class="header-anchor" href="#卷的继承和共享" aria-hidden="true">#</a> 卷的继承和共享</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -it --privileged=true --volumes-from u1 --name u2 ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>u2继承u1</strong></p>
<p><strong>此时如果u1没了，那么u2依旧可以和主机数据共享</strong></p>
<blockquote>
<p>薪火相传&gt;&gt;&gt;&gt;</p>
</blockquote>
<p><strong>1. 新建Ubuntu2继承ubuntu1</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE              COMMAND                  CREATED          STATUS                          PORTS     NAMES
37d9f24e95a3   ubuntu             <span class="token string">"bash"</span>                   <span class="token number">31</span> minutes ago   Up <span class="token number">31</span> minutes                             u1
f19e7fbc3d18   v2fly/v2fly-core   <span class="token string">"/usr/bin/v2ray -con…"</span>   <span class="token number">41</span> minutes ago   Restarting <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">54</span> seconds ago             tcp
root@ubuntu:/tmp/host_data<span class="token comment"># docker run -it --privileged=true --volumes-from 37d9f24e95a3  --name ubuntu2 ubuntu</span>
root@c6b2169449f4:/<span class="token comment"># cd /tmp/docker_data/</span>
root@c6b2169449f4:/tmp/docker_data<span class="token comment"># ls</span>
a  a.txt  aa.txt  b.txt  zhuji.txt
root@c6b2169449f4:/tmp/docker_data<span class="token comment"># touch ubuntu2.txt &amp;&amp; mkdir ubuntu2</span>
root@c6b2169449f4:/tmp/docker_data<span class="token comment"># ls</span>
a  a.txt  aa.txt  b.txt  ubuntu2  ubuntu2.txt  zhuji.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2. 查看ubuntu1</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@37d9f24e95a3:/tmp/docker_data<span class="token comment"># ls</span>
a  a.txt  aa.txt  b.txt  ubuntu2  ubuntu2.txt  zhuji.txt
root@37d9f24e95a3:/tmp/docker_data<span class="token comment"># mkdir ubuntu1 &amp;&amp; touch ubuntu2.t</span>
root@37d9f24e95a3:/tmp/docker_data<span class="token comment"># ls</span>
a  a.txt  aa.txt  b.txt  ubuntu1  ubuntu2  ubuntu2.txt  zhuji.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>3. 查看主机</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@c6b2169449f4:/tmp/docker_data<span class="token comment"># ls</span>
a  a.txt  aa.txt  b.txt  ubuntu1  ubuntu2  ubuntu2.txt  zhuji.txt
root@c6b2169449f4:/tmp/docker_data<span class="token comment"># root@ubuntu:/tmp/host_data# </span>
root@ubuntu:/tmp/host_data<span class="token comment"># ls</span>
a  aa.txt  a.txt  b.txt  ubuntu1  ubuntu2  ubuntu2.txt  zhuji.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


