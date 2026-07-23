<template><div><h1 id="docker-联合文件系统-深入解读" tabindex="-1"><a class="header-anchor" href="#docker-联合文件系统-深入解读" aria-hidden="true">#</a> docker 联合文件系统 深入解读</h1>
<nav class="table-of-contents"><ul><li><router-link to="#作用">作用</router-link></li><li><router-link to="#命令格式">命令格式</router-link></li><li><router-link to="#筛选">筛选</router-link></li><li><router-link to="#docker-graphdriver">docker GraphDriver</router-link><ul><li><router-link to="#容器内">容器内</router-link></li><li><router-link to="#lower">lower</router-link></li><li><router-link to="#upperdir">UpperDir</router-link></li></ul></li><li><router-link to="#proc-pid-root">/proc/&lt;pid&gt;/root</router-link><ul><li><router-link to="#获取命名空间">获取命名空间</router-link></li><li><router-link to="#获取-pid">获取 PID</router-link></li><li><router-link to="#查看-proc-pid-root">查看/proc/&lt;pid&gt;/root</router-link></li><li><router-link to="#容器进程目录下有什么">容器进程目录下有什么？</router-link></li></ul></li><li><router-link to="#最后">最后</router-link></li></ul></nav>
<p>[toc]</p>
<h2 id="作用" tabindex="-1"><a class="header-anchor" href="#作用" aria-hidden="true">#</a> 作用</h2>
<p>获取<a href="https://cloud.tencent.com/product/tke?from=10680" target="_blank" rel="noopener noreferrer">容器<ExternalLinkIcon/></a>/镜像的元数据（JSON格式）</p>
<h2 id="命令格式" tabindex="-1"><a class="header-anchor" href="#命令格式" aria-hidden="true">#</a> 命令格式</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> inspect <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> NAME<span class="token operator">|</span>ID <span class="token punctuation">[</span>NAME<span class="token operator">|</span>ID<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">options 说明</p>
<table>
<thead>
<tr>
<th style="text-align:left">option</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">-f</td>
<td style="text-align:left">指定返回值的模板文件</td>
</tr>
<tr>
<td style="text-align:left">-s</td>
<td style="text-align:left">如果类型为容器，则显示文件总大小</td>
</tr>
<tr>
<td style="text-align:left">--type</td>
<td style="text-align:left">返回指定类型的JSON</td>
</tr>
</tbody>
</table>
</div>
<h2 id="筛选" tabindex="-1"><a class="header-anchor" href="#筛选" aria-hidden="true">#</a> 筛选</h2>
<p><strong>获取 IP 地址：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> inspect tomcat7 <span class="token operator">|</span> <span class="token function">grep</span> IPAddress
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>获取 Dir ：</strong></p>
<blockquote>
<p>我主要是希望很熟悉 Data 字段，所以后面重点说明~</p>
</blockquote>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">[</span>root@VM<span class="token punctuation">-</span>4<span class="token punctuation">-</span>6<span class="token punctuation">-</span>centos 123<span class="token punctuation">]</span><span class="token comment"># docker  inspect -s 40da9cff87a0 |grep "Dir"</span>
                <span class="token key atrule">"LowerDir"</span><span class="token punctuation">:</span> <span class="token string">"/var/lib/docker/overlay2/0a0abda0165a1342ddac4ba3263352d79564e9a56dfdb497ac66e25030bb5b57-init/diff:/var/lib/docker/overlay2/2e6f81e45b3db01494296c925185d77831443eca0dd3cbf119f8d32190f90d5c/diff:/var/lib/docker/overlay2/ebf60447144fb679348fc4534bc30b68ce19618aac23b39ee93e5f941d6b13bc/diff:/var/lib/docker/overlay2/eb6694dc2ad08ab91f8f4e3f00bf7481d2c59df52c3a1553f0b7f3c3512179ed/diff:/var/lib/docker/overlay2/c4acacb9aa7f0e60af79eeb6cb7506d736df1789710da7f7e53747feffaead95/diff:/var/lib/docker/overlay2/29165236db2b92b69ae83bc679d17cf7237880dde09e5d3c1f5890ca6e907861/diff:/var/lib/docker/overlay2/3b17651312652668a9c2ef61df2a957ca7ceeb6307166a23a5726ca8dbaf1c23/diff:/var/lib/docker/overlay2/23a2a19d74c1945307e606a0df77496e2bdca76b85ea9058bd76a1cb9e1be205/diff:/var/lib/docker/overlay2/2916a80e9370af849f411871cad64cbb13d04617c91e66f45a16cbe979ffe88f/diff:/var/lib/docker/overlay2/d78b6c08a6749d7b88e7eb4fac33de1355cb1d926fcb01a8b1c72361d1867cbc/diff:/var/lib/docker/overlay2/be49972d15fe94755593cfd846c231d2a18e625a256fa86fe62e131e711f200a/diff"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"MergedDir"</span><span class="token punctuation">:</span> <span class="token string">"/var/lib/docker/overlay2/0a0abda0165a1342ddac4ba3263352d79564e9a56dfdb497ac66e25030bb5b57/merged"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"UpperDir"</span><span class="token punctuation">:</span> <span class="token string">"/var/lib/docker/overlay2/0a0abda0165a1342ddac4ba3263352d79564e9a56dfdb497ac66e25030bb5b57/diff"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"WorkDir"</span><span class="token punctuation">:</span> <span class="token string">"/var/lib/docker/overlay2/0a0abda0165a1342ddac4ba3263352d79564e9a56dfdb497ac66e25030bb5b57/work"</span>
            <span class="token key atrule">"WorkingDir"</span><span class="token punctuation">:</span> <span class="token string">"/application"</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-graphdriver" tabindex="-1"><a class="header-anchor" href="#docker-graphdriver" aria-hidden="true">#</a> docker GraphDriver</h2>
<p>这里我们了解一下 docker 的镜像存储，在Docker中，一个很重要的概念就是 <code v-pre>GraphDriver</code>，它主要用于管理和维护镜像，包括把镜像从仓库下载下来，到运行时把镜像挂载起来可以被容器访问等，都是<code v-pre>GraphDriver</code>去完成的。</p>
<p><strong>我们以 Golang 镜像为准：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span>  inspect <span class="token parameter variable">-s</span> golang 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>字段 GraphDriver：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code> <span class="token key atrule">"GraphDriver"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
            <span class="token key atrule">"Name"</span><span class="token punctuation">:</span> <span class="token string">"overlay2"</span><span class="token punctuation">,</span>
            <span class="token key atrule">"Data"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
                <span class="token key atrule">"LowerDir"</span><span class="token punctuation">:</span> <span class="token string">"/var/lib/docker/overlay2/0a0abda0165a1342ddac4ba3263352d79564e9a56dfdb497ac66e25030bb5b57-init/diff:/var/lib/docker/overlay2/2e6f81e45b3db01494296c925185d77831443eca0dd3cbf119f8d32190f90d5c/diff:/var/lib/docker/overlay2/ebf60447144fb679348fc4534bc30b68ce19618aac23b39ee93e5f941d6b13bc/diff:/var/lib/docker/overlay2/eb6694dc2ad08ab91f8f4e3f00bf7481d2c59df52c3a1553f0b7f3c3512179ed/diff:/var/lib/docker/overlay2/c4acacb9aa7f0e60af79eeb6cb7506d736df1789710da7f7e53747feffaead95/diff:/var/lib/docker/overlay2/29165236db2b92b69ae83bc679d17cf7237880dde09e5d3c1f5890ca6e907861/diff:/var/lib/docker/overlay2/3b17651312652668a9c2ef61df2a957ca7ceeb6307166a23a5726ca8dbaf1c23/diff:/var/lib/docker/overlay2/23a2a19d74c1945307e606a0df77496e2bdca76b85ea9058bd76a1cb9e1be205/diff:/var/lib/docker/overlay2/2916a80e9370af849f411871cad64cbb13d04617c91e66f45a16cbe979ffe88f/diff:/var/lib/docker/overlay2/d78b6c08a6749d7b88e7eb4fac33de1355cb1d926fcb01a8b1c72361d1867cbc/diff:/var/lib/docker/overlay2/be49972d15fe94755593cfd846c231d2a18e625a256fa86fe62e131e711f200a/diff"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"MergedDir"</span><span class="token punctuation">:</span> <span class="token string">"/var/lib/docker/overlay2/0a0abda0165a1342ddac4ba3263352d79564e9a56dfdb497ac66e25030bb5b57/merged"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"UpperDir"</span><span class="token punctuation">:</span> <span class="token string">"/var/lib/docker/overlay2/0a0abda0165a1342ddac4ba3263352d79564e9a56dfdb497ac66e25030bb5b57/diff"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"WorkDir"</span><span class="token punctuation">:</span> <span class="token string">"/var/lib/docker/overlay2/0a0abda0165a1342ddac4ba3263352d79564e9a56dfdb497ac66e25030bb5b57/work"</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">📜 对上面的解释</p>
<p><img src="http://sm.cubxxw.com/smimage-20221125163549549.png" alt="image-20221125163549549"></p>
<ul>
<li>LowerDir：包含容器内所有层的文件系统，最后一层除外</li>
<li>UpperDir：容器最上层的文件系统。这也是反映任何运行时修改的地方。</li>
<li>MergedDir：文件系统所有层的组合视图。</li>
<li>WorkDir：用于管理文件系统的内部工作目录。</li>
</ul>
</div>
<h3 id="容器内" tabindex="-1"><a class="header-anchor" href="#容器内" aria-hidden="true">#</a> 容器内</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> golang:latest /bin/bash 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>根目录：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cbd9c47e79e3:/<span class="token comment"># cd /; mkdir 111;cd 111; echo "this a test file" >> test.txt; ls</span>
test.txt
go version go1.19.3 linux/amd64
root@cbd9c47e79e3:/111<span class="token comment"># whereis go</span>
go: /usr/local/go /usr/local/go/bin/go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Go语言工作目录：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cbd9c47e79e3:/usr/local/go/bin<span class="token comment"># ls -al go</span>
-rwxr-xr-x <span class="token number">1</span> root root <span class="token number">15301490</span> Oct <span class="token number">31</span> <span class="token number">20</span>:20 go
root@cbd9c47e79e3:/usr/local/go/bin<span class="token comment"># pwd </span>
/usr/local/go/bin
root@cbd9c47e79e3:/usr/local/go/bin<span class="token comment"># ./go version</span>
go version go1.19.3 linux/amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lower" tabindex="-1"><a class="header-anchor" href="#lower" aria-hidden="true">#</a> lower</h3>
<p><code v-pre>最后一层除外</code>：这个意思就是我们的可写层，我们对容器的修改，都是在这层上面进行的，即我们容器里面的 <code v-pre>cd /; mkdir 111;cd 111; echo &quot;this a test file&quot; &gt;&gt; test.txt;</code> 这个文件在LowerDir里看不到。</p>
<p><strong>MergedDir</strong></p>
<p>在这里我们可以看到整个容器里面的文件系统，包括修改的(<strong>注意是容器</strong>)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos merged<span class="token punctuation">]</span><span class="token comment"># cd /var/lib/docker/overlay2/4ff3e2faabfa51f38c884c1321e20609352f5e009239d146161ec75bc806c3c5/merged</span>
<span class="token punctuation">[</span>root@VM-4-6-centos merged<span class="token punctuation">]</span><span class="token comment"># ls</span>
<span class="token number">111</span>  bin  boot  dev  etc  go  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">测试里面的环境变量</p>
<p>是不是可以将里面的 Go语言 环境变量位置配置到主机中？？？我觉得这样好玩</p>
</div>
<p><strong>当前位置：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos bin<span class="token punctuation">]</span><span class="token comment"># ls</span>
go  gofmt
<span class="token punctuation">[</span>root@VM-4-6-centos bin<span class="token punctuation">]</span><span class="token comment"># pwd</span>
/var/lib/docker/overlay2/4ff3e2faabfa51f38c884c1321e20609352f5e009239d146161ec75bc806c3c5/merged/usr/local/go/bin
<span class="token punctuation">[</span>root@VM-4-6-centos bin<span class="token punctuation">]</span><span class="token comment"># cp go golangtext</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>加入环境变量：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos bin<span class="token punctuation">]</span><span class="token comment"># cp go golangtext</span>

<span class="token comment"># 加入环境变量</span>
<span class="token punctuation">[</span>root@VM-4-6-centos root<span class="token punctuation">]</span><span class="token comment"># cat /etc/profile.d/mypath </span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GO_TEST</span><span class="token operator">=</span>$<span class="token string">"/var/lib/docker/overlay2/4ff3e2faabfa51f38c884c1321e20609352f5e009239d146161ec75bc806c3c5/merged/usr/local/go"</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$GO_TEST</span>/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>测试：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos root<span class="token punctuation">]</span><span class="token comment"># golangtext version</span>
go: cannot <span class="token function">find</span> GOROOT directory: /root/.g/go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="upperdir" tabindex="-1"><a class="header-anchor" href="#upperdir" aria-hidden="true">#</a> UpperDir</h3>
<p><code v-pre>WorkDir</code>：用于管理文件系统的内部工作目录</p>
<p>我们在 Dockerfile 中可指定 workspaces，即使在 GitHub 的 codespaces 中，workspaces 也是非常重要的。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[root@VM-4-6-centos root]# cd /var/lib/docker/overlay2/4ff3e2faabfa51f38c884c1321e20609352f5e009239d146161ec75bc806c3c5/work
[root@VM-4-6-centos work]# ls
work
[root@VM-4-6-centos work]# cd work/
[root@VM-4-6-centos work]# ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">推荐文章</p>
<ul>
<li><a href="https://martinheinz.dev/blog/44" target="_blank" rel="noopener noreferrer">关于文件系统如何工作的-<ExternalLinkIcon/></a></li>
</ul>
</div>
<h2 id="proc-pid-root" tabindex="-1"><a class="header-anchor" href="#proc-pid-root" aria-hidden="true">#</a> <code v-pre>/proc/&lt;pid&gt;/root</code></h2>
<p>我们到现在知道了 <code v-pre>Pid</code> 在 docker 中起到了多么重要的作用，这个关乎着我们未来构建 docker 的计划~</p>
<p>有一种更简单的方法可以从主机找到容器的文件系统。使用容器内进程的主机 PID，您可以简单地运行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">ls</span> /proc/<span class="token operator">&lt;</span>pid<span class="token operator">></span>/root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Linux 已经负责为您提供进程的挂载命名空间视图。</p>
<h3 id="获取命名空间" tabindex="-1"><a class="header-anchor" href="#获取命名空间" aria-hidden="true">#</a> 获取命名空间</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>容器进程就像 Linux 主机上的其他进程一样，只在命名空间内运行，以使它们与系统的其余部分隔离。</p>
</div>
<p>因此，您可以使用 <a href="https://man7.org/linux/man-pages/man1/nsenter.1.html" target="_blank" rel="noopener noreferrer"><code v-pre>nsenter</code><ExternalLinkIcon/></a> 命令输入目标容器的命名空间</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Get the host PID of the process in the container</span>
<span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> container inspect mycontainer <span class="token operator">|</span> jq <span class="token string">'.[0].State.Pid'</span><span class="token variable">)</span></span>

<span class="token comment"># Use nsenter to go into the container’s mount namespace.</span>
<span class="token function">sudo</span> nsenter <span class="token parameter variable">-m</span> <span class="token parameter variable">-t</span> <span class="token variable">$PID</span> /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="获取-pid" tabindex="-1"><a class="header-anchor" href="#获取-pid" aria-hidden="true">#</a> 获取 PID</h3>
<p>前提：我们知道了 容器 ID</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker inspect -f '{{.State.Pid}}'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>💡简单的一个案例如下：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos work<span class="token punctuation">]</span><span class="token comment"># docker ps</span>
CONTAINER ID        IMAGE                          COMMAND                  CREATED             STATUS                      PORTS                    NAMES
cbd9c47e79e3        golang                         <span class="token string">"bash"</span>                   About an hour ago   Up About an hour                                     jolly_chandrasekhar
40da9cff87a0        docker.io/halohub/halo:1.6.0   <span class="token string">"/bin/sh -c 'java ..."</span>   <span class="token number">11</span> days ago         Restarting <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token number">2</span> days ago                            halo-next
0b35d2dcb578        <span class="token number">3293172751</span>/halo_myblog:2.0     <span class="token string">"/bin/sh -c 'java ..."</span>   <span class="token number">3</span> weeks ago         Up <span class="token number">11</span> days                  <span class="token number">0.0</span>.0.0:8090-<span class="token operator">></span><span class="token number">8090</span>/tcp   halo2
<span class="token punctuation">[</span>root@VM-4-6-centos work<span class="token punctuation">]</span><span class="token comment"># docker inspect -f '{{.State.Pid}}' cbd9c47e79e3</span>
<span class="token number">1050</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">或者你还可以通过container 获取</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker container top
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<h3 id="查看-proc-pid-root" tabindex="-1"><a class="header-anchor" href="#查看-proc-pid-root" aria-hidden="true">#</a> 查看<code v-pre>/proc/&lt;pid&gt;/root</code></h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos work<span class="token punctuation">]</span><span class="token comment"># ll /proc/1050/root/</span>
total <span class="token number">76</span>
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Nov <span class="token number">25</span> <span class="token number">16</span>:10 <span class="token number">111</span>
drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov <span class="token number">15</span> <span class="token number">18</span>:23 bin
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Sep  <span class="token number">3</span> <span class="token number">20</span>:10 boot
drwxr-xr-x   <span class="token number">5</span> root root  <span class="token number">360</span> Nov <span class="token number">25</span> <span class="token number">15</span>:28 dev
drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov <span class="token number">25</span> <span class="token number">15</span>:28 etc
drwxrwxrwx   <span class="token number">4</span> root root <span class="token number">4096</span> Nov <span class="token number">16</span> <span class="token number">12</span>:16 go
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Sep  <span class="token number">3</span> <span class="token number">20</span>:10 home
drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov <span class="token number">16</span> <span class="token number">12</span>:16 lib
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Nov <span class="token number">14</span> 08:00 lib64
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Nov <span class="token number">14</span> 08:00 media
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Nov <span class="token number">14</span> 08:00 mnt
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Nov <span class="token number">14</span> 08:00 opt
dr-xr-xr-x <span class="token number">159</span> root root    <span class="token number">0</span> Nov <span class="token number">25</span> <span class="token number">15</span>:28 proc
drwx------   <span class="token number">2</span> root root <span class="token number">4096</span> Nov <span class="token number">14</span> 08:00 root
drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov <span class="token number">25</span> <span class="token number">15</span>:28 run
drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov <span class="token number">15</span> <span class="token number">18</span>:23 sbin
drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Nov <span class="token number">14</span> 08:00 srv
dr-xr-xr-x  <span class="token number">13</span> root root    <span class="token number">0</span> Nov <span class="token number">25</span> <span class="token number">15</span>:28 sys
drwxrwxrwt   <span class="token number">1</span> root root <span class="token number">4096</span> Nov <span class="token number">16</span> <span class="token number">12</span>:16 tmp
drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov <span class="token number">14</span> 08:00 usr
drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov <span class="token number">14</span> 08:00 var
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="容器进程目录下有什么" tabindex="-1"><a class="header-anchor" href="#容器进程目录下有什么" aria-hidden="true">#</a> 容器进程目录下有什么？</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos work<span class="token punctuation">]</span><span class="token comment"># cd /proc/1050/</span>
<span class="token punctuation">[</span>root@VM-4-6-centos <span class="token number">1050</span><span class="token punctuation">]</span><span class="token comment"># ls</span>
attr        <span class="token function">comm</span>             fd        map_files   net            pagemap      schedstat  statm    wchan
autogroup   coredump_filter  fdinfo    maps        ns             patch_state  sessionid  status
auxv        cpuset           gid_map   mem         numa_maps      personality  setgroups  syscall
cgroup      cwd              io        mountinfo   oom_adj        projid_map   smaps      task
clear_refs  environ          limits    mounts      oom_score      root         stack      timers
cmdline     exe              loginuid  mountstats  oom_score_adj  sched        <span class="token function">stat</span>       uid_map
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看 <code v-pre>/mountinfo</code></strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos <span class="token number">1050</span><span class="token punctuation">]</span><span class="token comment"># cat mountinfo | head -n 10</span>
<span class="token number">659</span> <span class="token number">493</span> <span class="token number">0</span>:157 / / rw,relatime - overlay overlay rw,lowerdir<span class="token operator">=</span>/var/lib/docker/overlay2/l/PIDEMVBEIEE3VONRURI4Z4EUJX:/var/lib/docker/overlay2/l/BWR7ZEPY4UYAKRS3ZCHZZ6EGTP:/var/lib/docker/overlay2/l/34HR5PAPLZ5473EG5FNPRQLLYQ:/var/lib/docker/overlay2/l/AGIW6BJEBXJNUEBZI67DHV73UC:/var/lib/docker/overlay2/l/6XDUP6AULW7Z4AT5NPHVTGD4SH:/var/lib/docker/overlay2/l/WRKLDD6PZE5FYTSPKPED7F3N7L:/var/lib/docker/overlay2/l/PLPE7MKV5TXKVZFBCSK7ZPA7FD:/var/lib/docker/overlay2/l/BT7MBYLOPX66TO6QWWYBELSZN2,upperdir<span class="token operator">=</span>/var/lib/docker/overlay2/4ff3e2faabfa51f38c884c1321e20609352f5e009239d146161ec75bc806c3c5/diff,workdir<span class="token operator">=</span>/var/lib/docker/overlay2/4ff3e2faabfa51f38c884c1321e20609352f5e009239d146161ec75bc806c3c5/work
<span class="token number">660</span> <span class="token number">659</span> <span class="token number">0</span>:160 / /proc rw,nosuid,nodev,noexec,relatime - proc proc rw
<span class="token number">661</span> <span class="token number">659</span> <span class="token number">0</span>:161 / /dev rw,nosuid - tmpfs tmpfs rw,mode<span class="token operator">=</span><span class="token number">755</span>
<span class="token number">662</span> <span class="token number">661</span> <span class="token number">0</span>:162 / /dev/pts rw,nosuid,noexec,relatime - devpts devpts rw,gid<span class="token operator">=</span><span class="token number">5</span>,mode<span class="token operator">=</span><span class="token number">620</span>,ptmxmode<span class="token operator">=</span><span class="token number">666</span>
<span class="token number">663</span> <span class="token number">659</span> <span class="token number">0</span>:163 / /sys ro,nosuid,nodev,noexec,relatime - sysfs sysfs ro
<span class="token number">664</span> <span class="token number">663</span> <span class="token number">0</span>:164 / /sys/fs/cgroup ro,nosuid,nodev,noexec,relatime - tmpfs tmpfs rw,mode<span class="token operator">=</span><span class="token number">755</span>
<span class="token number">665</span> <span class="token number">664</span> <span class="token number">0</span>:22 /system.slice/docker-cbd9c47e79e39457d638b8d0552aeb2c646dbd7ade72f41f8ffc48ea91188322.scope /sys/fs/cgroup/systemd ro,nosuid,nodev,noexec,relatime - cgroup cgroup rw,xattr,release_agent<span class="token operator">=</span>/usr/lib/systemd/systemd-cgroups-agent,name<span class="token operator">=</span>systemd
<span class="token number">666</span> <span class="token number">664</span> <span class="token number">0</span>:24 /system.slice/docker-cbd9c47e79e39457d638b8d0552aeb2c646dbd7ade72f41f8ffc48ea91188322.scope /sys/fs/cgroup/blkio ro,nosuid,nodev,noexec,relatime - cgroup cgroup rw,blkio
<span class="token number">667</span> <span class="token number">664</span> <span class="token number">0</span>:25 /system.slice/docker-cbd9c47e79e39457d638b8d0552aeb2c646dbd7ade72f41f8ffc48ea91188322.scope /sys/fs/cgroup/hugetlb ro,nosuid,nodev,noexec,relatime - cgroup cgroup rw,hugetlb
<span class="token number">668</span> <span class="token number">664</span> <span class="token number">0</span>:26 /system.slice/docker-cbd9c47e79e39457d638b8d0552aeb2c646dbd7ade72f41f8ffc48ea91188322.scope /sys/fs/cgroup/net_prio,net_cls ro,nosuid,nodev,noexec,relatime - cgroup cgroup rw,net_prio,net_cls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到容器已挂载了一个覆盖文件系统作为其根。它还报告与 <code v-pre>docker inspect</code>报告相同类型的信息，包括容器文件系统的 <code v-pre>LowerDir</code> 和 <code v-pre>UpperDir</code>。它不直接显示 <code v-pre>MergedDir</code>，但您只需使用 <code v-pre>UpperDir</code> 并将 <code v-pre>diff</code> 更改为<code v-pre>merged</code>，您就可以查看容器的文件系统。</p>
<h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后" aria-hidden="true">#</a> 最后</h2>
<p>希望我们都可以深入理解容器，能尝试其中的一些技术。一旦你体验到不再受容器代码限制的自由，你可能再也回不去了。它所需要的只是简单地访问 /<code v-pre>/proc/&lt;pid&gt;/root</code>~</p>
</div></template>


