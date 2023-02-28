<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第22节-sealer-1-9-1新年规划" tabindex="-1"><a class="header-anchor" href="#第22节-sealer-1-9-1新年规划" aria-hidden="true">#</a> 第22节 sealer 1.9.1新年规划</h1>
<div><a href = '21.md' style='float:left'>⬆️上一节🔗  </a><a href = '23.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="准备" tabindex="-1"><a class="header-anchor" href="#准备" aria-hidden="true">#</a> 准备</h2>
<ul>
<li><a href="https://github.com/sealerio/sealer/discussions/1997" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/sealer/discussions/1997<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/sealerio/sealer/issues/2001" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/sealer/issues/2001<ExternalLinkIcon/></a></li>
</ul>
<p><strong>时间限制：</strong></p>
<p>0.9.2 发布 - 20230228</p>
<p>截止到 2 月 28 号，两周为期限实现需求，最后一周检查。</p>
<blockquote>
<p>所有命令必须以<code v-pre>root</code>用户身份运行，目前不支持运行为<code v-pre>sudoers</code>或<code v-pre>rootless</code></p>
<p>sealer 支持 <code v-pre>sudoers</code></p>
</blockquote>
<p><strong>添加一些 e2e 测试案例：</strong></p>
<ul>
<li><a href="https://github.com/sealerio/sealer/issues/1966" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/sealer/issues/1966<ExternalLinkIcon/></a></li>
</ul>
<h2 id="我的任务" tabindex="-1"><a class="header-anchor" href="#我的任务" aria-hidden="true">#</a> 我的任务</h2>
<ul>
<li>https://github.com/sealerio/sealer/issues/1999</li>
</ul>
<p>AFAK，安装 k8s 不一定需要 root 用户，而是具有 root 权限的用户。有些情况下用户不想提供 root 用户，所以我认为 sealer 需要支持这个功能。</p>
<blockquote>
<p>sealer不支持没有sudo权限的普通用户安装运行。</p>
</blockquote>
<p>目前，sealer 仍然不支持具有 sudo 权限的普通用户。而在未来对sealer进行一些重构之后，我们肯定会支持具有sudo权限的普通用户。</p>
<p><strong>步骤</strong>：</p>
<ol>
<li>确定用户权限要求：需要确定 k8s 安装过程中需要哪些权限，并且需要知道如何在非 root 用户下授予这些权限。</li>
<li>修改安装脚本和代码：根据用户权限要求，修改安装脚本以确保它能在非 root 用户下正常运行。</li>
<li>测试安装：在非 root 用户下测试 k8s 安装是否正常。</li>
<li>更新用户文档：更新 Sealer 用户文档，提供关于非 root 用户安装 k8s 的说明。</li>
</ol>
<h2 id="解决的问题" tabindex="-1"><a class="header-anchor" href="#解决的问题" aria-hidden="true">#</a> 解决的问题</h2>
<ul>
<li><a href="https://github.com/sealerio/sealer/issues/1591" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/sealer/issues/1591<ExternalLinkIcon/></a></li>
</ul>
<h2 id="文档支持" tabindex="-1"><a class="header-anchor" href="#文档支持" aria-hidden="true">#</a> 文档支持</h2>
<ul>
<li><a href="https://kubernetes.io/docs/tasks/administer-cluster/kubelet-in-userns/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/docs/tasks/administer-cluster/kubelet-in-userns/<ExternalLinkIcon/></a></li>
</ul>
<p>本文档描述了如何在没有 root 权限的情况下运行 Kubernetes Node 组件，例如 kubelet、CRI、OCI 和 CNI，使用<a href="https://man7.org/linux/man-pages/man7/user_namespaces.7.html" target="_blank" rel="noopener noreferrer">用户命名空间<ExternalLinkIcon/></a>.</p>
<p>这种技术也称为 <em><strong>rootless mode</strong></em>。</p>
<ul>
<li><a href="https://rancher.com/docs/k3s/latest/en/advanced/#running-k3s-with-rootless-mode-experimental" target="_blank" rel="noopener noreferrer">k3s实验性支持 rootless<ExternalLinkIcon/></a></li>
</ul>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2>
<p>两种方案 <strong>异步开始</strong> ：</p>
<ul>
<li>跑程序，快速使用非 root 用户过一遍，找出问题所在，跑通就实现了。</li>
<li>过代码，快速过一遍构建部分的代码，找出解决的方案。</li>
</ul>
<h3 id="跑程序" tabindex="-1"><a class="header-anchor" href="#跑程序" aria-hidden="true">#</a> 跑程序</h3>
<ul>
<li>
<p>三台虚拟机</p>
</li>
<li>
<p>环境：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/workspces/sealer/_output/bin/sealer/linux_amd64<span class="token comment"># source /etc/profile;sealer version</span>
<span class="token punctuation">{</span><span class="token string">"gitVersion"</span><span class="token builtin class-name">:</span><span class="token string">"unknown"</span>,<span class="token string">"gitCommit"</span><span class="token builtin class-name">:</span><span class="token string">"2cd5bb8af"</span>,<span class="token string">"buildDate"</span><span class="token builtin class-name">:</span><span class="token string">"2023-02-03 13:11:59"</span>,<span class="token string">"goVersion"</span><span class="token builtin class-name">:</span><span class="token string">"go1.19.3"</span>,<span class="token string">"compiler"</span><span class="token builtin class-name">:</span><span class="token string">"gc"</span>,<span class="token string">"platform"</span><span class="token builtin class-name">:</span><span class="token string">"linux/amd64"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>主机：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">192.168</span>.71.134 node01
<span class="token number">192.168</span>.71.133 node02
<span class="token number">192.168</span>.71.131 master01
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p><strong>运行：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealer run docker.io/sealerio/kubernetes:v1.22.15 <span class="token punctuation">\</span>
  <span class="token parameter variable">--masters</span> <span class="token number">192.168</span>.71.131 <span class="token punctuation">\</span>
  <span class="token parameter variable">--nodes</span> <span class="token number">192.168</span>.71.133,192.168.71.134 <span class="token parameter variable">--passwd</span> <span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="test" tabindex="-1"><a class="header-anchor" href="#test" aria-hidden="true">#</a> test</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/workspces<span class="token comment"># sealer run docker.io/sealerio/kubernetes:v1.22.15   --masters 192.168.71.131   --nodes 192.168.71.133,192.168.71.134 --passwd 123456</span>
Trying to pull docker.io/sealerio/kubernetes:v1.22.15<span class="token punctuation">..</span>.
Getting image <span class="token builtin class-name">source</span> signatures
Copying blob f5947d538452 skipped: already exists  
Copying blob 570ae92500e2 <span class="token keyword">done</span>  
Copying blob 55f8dfb1b045 <span class="token keyword">done</span>  
Copying blob 8b638286c448 <span class="token keyword">done</span>  
Copying blob 20d88a7b893f <span class="token keyword">done</span>  
Copying blob 7193b0539042 <span class="token keyword">done</span>  
Copying blob 2e3ef0681087 <span class="token keyword">done</span>  
Copying blob c738739a1608 <span class="token keyword">done</span>  
Copying blob bac05865934b <span class="token keyword">done</span>  
Copying config bb75382891 <span class="token keyword">done</span>  
Writing manifest to image destination
Storing signatures
<span class="token number">2023</span>-02-03 <span class="token number">15</span>:16:25 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token punctuation">[</span>pull.go:79<span class="token punctuation">]</span> bb75382891e7f04f192f1baeab18ef9c9f5503f4de8ac6dfc2a4d94f2164dde6

<span class="token number">2023</span>-02-03 <span class="token number">15</span>:16:25 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token punctuation">[</span>run.go:229<span class="token punctuation">]</span> start to create new cluster with image: docker.io/sealerio/kubernetes:v1.22.15

<span class="token number">2023</span>-02-03 <span class="token number">15</span>:16:36 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token punctuation">[</span>pull.go:79<span class="token punctuation">]</span> bb75382891e7f04f192f1baeab18ef9c9f5503f4de8ac6dfc2a4d94f2164dde6

copying files to <span class="token number">192.168</span>.71.134: <span class="token number">31</span>/31 
copying files to <span class="token number">192.168</span>.71.133: <span class="token number">31</span>/31 
+ <span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>
+++ <span class="token function">dirname</span> /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh
++ <span class="token builtin class-name">cd</span> /var/lib/sealer/data/my-cluster/rootfs/scripts
++ <span class="token builtin class-name">pwd</span>
+ <span class="token assign-left variable">scripts_path</span><span class="token operator">=</span>/var/lib/sealer/data/my-cluster/rootfs/scripts
+ <span class="token assign-left variable">image_dir</span><span class="token operator">=</span>/var/lib/sealer/data/my-cluster/rootfs/scripts/<span class="token punctuation">..</span>/images
+ <span class="token assign-left variable">DOCKER_VERSION</span><span class="token operator">=</span><span class="token number">19.03</span>.15
+ <span class="token assign-left variable">storage</span><span class="token operator">=</span>/var/lib/docker
+ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/lib/docker
+ utils_command_exists <span class="token function">docker</span>
+ <span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> <span class="token function">docker</span>
+ disable_selinux
+ <span class="token string">'['</span> <span class="token parameter variable">-s</span> /etc/selinux/config <span class="token string">']'</span>
+ systemctl daemon-reload
+ systemctl restart docker.service
+ check_docker_valid
+ <span class="token function">docker</span> info
Client:
 Context:    default
 Debug Mode: <span class="token boolean">false</span>
 Plugins:
  app: Docker App <span class="token punctuation">(</span>Docker Inc., v0.9.1-beta3<span class="token punctuation">)</span>
  buildx: Docker Buildx <span class="token punctuation">(</span>Docker Inc., v0.9.1-docker<span class="token punctuation">)</span>
  compose: Docker Compose <span class="token punctuation">(</span>Docker Inc., v2.14.1<span class="token punctuation">)</span>
  scan: Docker Scan <span class="token punctuation">(</span>Docker Inc., v0.23.0<span class="token punctuation">)</span>

Server:
 Containers: <span class="token number">34</span>
  Running: <span class="token number">0</span>
  Paused: <span class="token number">0</span>
  Stopped: <span class="token number">34</span>
 Images: <span class="token number">19</span>
 Server Version: <span class="token number">20.10</span>.22
 Storage Driver: overlay2
  Backing Filesystem: extfs
  Supports d_type: <span class="token boolean">true</span>
  Native Overlay Diff: <span class="token boolean">true</span>
  userxattr: <span class="token boolean">false</span>
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Cgroup Version: <span class="token number">1</span>
 Plugins:
  Volume: <span class="token builtin class-name">local</span>
  Network: bridge <span class="token function">host</span> ipvlan macvlan null overlay
  Log: awslogs fluentd gcplogs gelf journald json-file <span class="token builtin class-name">local</span> logentries splunk syslog
 Swarm: inactive
 Runtimes: io.containerd.runc.v2 io.containerd.runtime.v1.linux runc
 Default Runtime: runc
 Init Binary: docker-init
 containerd version: 5b842e528e99d4d4c1686467debf2bd4b88ecd86
 runc version: v1.1.4-0-g5fd4c4d
 init version: de40ad0
 Security Options:
  apparmor
  seccomp
   Profile: default
 Kernel Version: <span class="token number">5.4</span>.0-137-generic
 Operating System: Ubuntu <span class="token number">20.04</span>.5 LTS
 OSType: linux
 Architecture: x86_64
 CPUs: <span class="token number">2</span>
 Total Memory: <span class="token number">3</span>.81GiB
 Name: cubmaster01
 ID: YROS:6C7Z:JISN:TGQP:AAGJ:JAOZ:A7XO:3LBP:YJWN:AQIR:TRPC:5ASC
 Docker Root Dir: /var/lib/docker
 Debug Mode: <span class="token boolean">false</span>
 Registry: https://index.docker.io/v1/
 Labels:
 Experimental: <span class="token boolean">false</span>
 Insecure Registries:
  <span class="token number">127.0</span>.0.0/8
 Live Restore Enabled: <span class="token boolean">false</span>

WARNING: No swap limit support
++ <span class="token function">docker</span> info <span class="token parameter variable">--format</span> <span class="token string">'{{json .ServerVersion}}'</span>
++ <span class="token function">tr</span> <span class="token parameter variable">-d</span> <span class="token string">'"'</span>
+ <span class="token assign-left variable">dockerVersion</span><span class="token operator">=</span><span class="token number">20.10</span>.22
+ <span class="token string">'['</span> <span class="token number">20.10</span>.22 <span class="token string">'!='</span> <span class="token number">19.03</span>.15 <span class="token string">']'</span>
+ panic <span class="token string">'docker version is 20.10.22, should be 19.03.15, please check'</span>
/var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh: line <span class="token number">64</span>: panic: <span class="token builtin class-name">command</span> not found
<span class="token number">2023</span>-02-03 <span class="token number">15</span>:17:25 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> <span class="token punctuation">[</span>remove_container.go:66<span class="token punctuation">]</span> d400abc92de5308584e6a6e5b06a098698220124ec096b6bbeb3654c2e49bf28

Usage:
  sealer run <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>

Examples:

run cluster by Clusterfile: 
  sealer run <span class="token parameter variable">-f</span> Clusterfile

run cluster by CLI flags:
  sealer run docker.io/sealerio/kubernetes:v1.22.15 <span class="token parameter variable">-m</span> <span class="token number">172.28</span>.80.01 <span class="token parameter variable">-n</span> <span class="token number">172.28</span>.80.02 <span class="token parameter variable">-p</span> Sealer123

run app image:
  sealer run localhost/nginx:v1


Flags:
  -f, <span class="token parameter variable">--Clusterfile</span> string   Clusterfile path to run a Kubernetes cluster
      <span class="token parameter variable">--apps</span> strings         override default AppNames of clusterimage
      <span class="token parameter variable">--cmds</span> strings         override default LaunchCmds of clusterimage
  -e, <span class="token parameter variable">--env</span> strings          <span class="token builtin class-name">set</span> custom environment variables
  -h, <span class="token parameter variable">--help</span>                 <span class="token builtin class-name">help</span> <span class="token keyword">for</span> run
  -m, <span class="token parameter variable">--masters</span> string       <span class="token builtin class-name">set</span> count or IPList to masters
      <span class="token parameter variable">--mode</span> string          load images to the specified registry <span class="token keyword">in</span> advance <span class="token punctuation">(</span>default <span class="token string">"apply"</span><span class="token punctuation">)</span>
  -n, <span class="token parameter variable">--nodes</span> string         <span class="token builtin class-name">set</span> count or IPList to nodes
  -p, <span class="token parameter variable">--passwd</span> string        <span class="token builtin class-name">set</span> cloud provider or baremetal server password
      <span class="token parameter variable">--pk</span> string            <span class="token builtin class-name">set</span> baremetal server private key <span class="token punctuation">(</span>default <span class="token string">"/root/.ssh/id_rsa"</span><span class="token punctuation">)</span>
      --pk-passwd string     <span class="token builtin class-name">set</span> baremetal server private key password
      <span class="token parameter variable">--port</span> uint16          <span class="token builtin class-name">set</span> the sshd <span class="token function">service</span> port number <span class="token keyword">for</span> the server <span class="token punctuation">(</span>default port: <span class="token number">22</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>default <span class="token number">22</span><span class="token punctuation">)</span>
  -u, <span class="token parameter variable">--user</span> string          <span class="token builtin class-name">set</span> baremetal server username <span class="token punctuation">(</span>default <span class="token string">"root"</span><span class="token punctuation">)</span>

Global Flags:
      <span class="token parameter variable">--color</span> string               <span class="token builtin class-name">set</span> the log color mode, the possible values can be <span class="token punctuation">[</span>never always<span class="token punctuation">]</span> <span class="token punctuation">(</span>default <span class="token string">"always"</span><span class="token punctuation">)</span>      <span class="token parameter variable">--config</span> string              config <span class="token function">file</span> of sealer tool <span class="token punctuation">(</span>default is <span class="token environment constant">$HOME</span>/.sealer.json<span class="token punctuation">)</span>
  -d, <span class="token parameter variable">--debug</span>                      turn on debug mode
      --hide-path                  hide the log path
      --hide-time                  hide the log <span class="token function">time</span>
      --log-to-file                <span class="token function">write</span> log message to disk
  -q, <span class="token parameter variable">--quiet</span>                      silence the usage when fail
      --remote-logger-url string   remote logger url, <span class="token keyword">if</span> not empty, will send log to this url
      --task-name string           task name <span class="token function">which</span> will embedded <span class="token keyword">in</span> the remote logger header, only valid when --remote-logger-url is <span class="token builtin class-name">set</span>

<span class="token number">2023</span>-02-03 <span class="token number">15</span>:17:25 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-unknown: failed to <span class="token function">install</span> docker: execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on <span class="token function">host</span> <span class="token punctuation">(</span><span class="token number">192.168</span>.71.131<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>failed to execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on host<span class="token punctuation">(</span><span class="token number">192.168</span>.71.131<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>exit status <span class="token number">127</span><span class="token punctuation">))</span>

root@cubmaster01:~/workspces<span class="token comment"># sealer images</span>
REPOSITORY                           TAG        IMAGE ID       CREATED        SIZE
docker.io/sealerio/kubernetes        v1.22.15   bb75382891e7   <span class="token number">4</span> weeks ago    <span class="token number">963</span> MB
docker.io/fanux/ingress-nginx        v1.2.0     d32b3c0b33a8   <span class="token number">2</span> months ago   <span class="token number">58.6</span> KB
localhost/3293172751/ingress-nginx   v1.2.0     d32b3c0b33a8   <span class="token number">2</span> months ago   <span class="token number">58.6</span> KB
root@cubmaster01:~/workspces<span class="token comment"># kubectl get node</span>
The connection to the server <span class="token number">127.0</span>.0.1:6443 was refused - did you specify the right <span class="token function">host</span> or port?
root@cubmaster01:~/workspces<span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>遇到的问题，docker版本不符合</strong></p>
<p>也有其他的问题，其他节点不够干净，docker版本不符合，还有docker所有权问题。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chown</span> root:docker /var/run/docker.sock
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Ubuntu 22.04 是我的操作系统。在进行广泛研究并浏览大量网站后，我发现以非 root 用户身份运行 Docker 会创建不同的上下文。使用下面列出的命令解决了我的问题。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker context ls 
docker context use default 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>用户可能没有与 docker 守护进程通信的访问权限</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
<span class="token number">2023</span>-02-04 08:51:00 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-unknown: failed to init master0: failed to execute command<span class="token punctuation">(</span>kubeadm init <span class="token parameter variable">--config</span><span class="token operator">=</span>/etc/kubernetes/kubeadm.yaml --upload-certs <span class="token parameter variable">-v</span> <span class="token number">0</span> --ignore-preflight-errors<span class="token operator">=</span>SystemVerification,Port-10250,DirAvailable--etc-kubernetes-manifests<span class="token punctuation">)</span> on host<span class="token punctuation">(</span><span class="token number">192.168</span>.71.131<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>W0204 08:50:55.248878   <span class="token number">36042</span> strict.go:55<span class="token punctuation">]</span> error unmarshaling configuration schema.GroupVersionKind<span class="token punctuation">{</span>Group:<span class="token string">"kubelet.config.k8s.io"</span>, Version:<span class="token string">"v1beta1"</span>, Kind:<span class="token string">"KubeletConfiguration"</span><span class="token punctuation">}</span>: error unmarshaling JSON: <span class="token keyword">while</span> decoding JSON: json: unknown field <span class="token string">"flushFrequency"</span>
        <span class="token punctuation">[</span>WARNING FileExisting-socat<span class="token punctuation">]</span>: socat not found <span class="token keyword">in</span> system path
        <span class="token punctuation">[</span>WARNING Port-10250<span class="token punctuation">]</span>: Port <span class="token number">10250</span> is <span class="token keyword">in</span> use
error execution phase preflight: <span class="token punctuation">[</span>preflight<span class="token punctuation">]</span> Some fatal errors occurred:
        <span class="token punctuation">[</span>ERROR Port-6443<span class="token punctuation">]</span>: Port <span class="token number">6443</span> is <span class="token keyword">in</span> use
        <span class="token punctuation">[</span>ERROR Port-10259<span class="token punctuation">]</span>: Port <span class="token number">10259</span> is <span class="token keyword">in</span> use
        <span class="token punctuation">[</span>ERROR Port-10257<span class="token punctuation">]</span>: Port <span class="token number">10257</span> is <span class="token keyword">in</span> use
        <span class="token punctuation">[</span>ERROR FileAvailable--etc-kubernetes-manifests-kube-apiserver.yaml<span class="token punctuation">]</span>: /etc/kubernetes/manifests/kube-apiserver.yaml already exists
        <span class="token punctuation">[</span>ERROR FileAvailable--etc-kubernetes-manifests-kube-controller-manager.yaml<span class="token punctuation">]</span>: /etc/kubernetes/manifests/kube-controller-manager.yaml already exists
        <span class="token punctuation">[</span>ERROR FileAvailable--etc-kubernetes-manifests-kube-scheduler.yaml<span class="token punctuation">]</span>: /etc/kubernetes/manifests/kube-scheduler.yaml already exists
        <span class="token punctuation">[</span>ERROR FileAvailable--etc-kubernetes-manifests-etcd.yaml<span class="token punctuation">]</span>: /etc/kubernetes/manifests/etcd.yaml already exists
        <span class="token punctuation">[</span>ERROR Port-2379<span class="token punctuation">]</span>: Port <span class="token number">2379</span> is <span class="token keyword">in</span> use
        <span class="token punctuation">[</span>ERROR Port-2380<span class="token punctuation">]</span>: Port <span class="token number">2380</span> is <span class="token keyword">in</span> use
        <span class="token punctuation">[</span>ERROR DirAvailable--var-lib-etcd<span class="token punctuation">]</span>: /var/lib/etcd is not empty
<span class="token punctuation">[</span>preflight<span class="token punctuation">]</span> If you know what you are doing, you can <span class="token function">make</span> a check non-fatal with <span class="token variable"><span class="token variable">`</span>--ignore-preflight-errors<span class="token operator">=</span><span class="token punctuation">..</span>.<span class="token variable">`</span></span>
To see the stack trace of this error execute with <span class="token parameter variable">--v</span><span class="token operator">=</span><span class="token number">5</span> or higher
<span class="token punctuation">)</span>. Please clean and reinstall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>清理集群：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealer delete <span class="token parameter variable">-a</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="rootless" tabindex="-1"><a class="header-anchor" href="#rootless" aria-hidden="true">#</a> rootless</h2>
<p><strong>主机：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>192.168.71.130 node01
192.168.71.134 node02
192.168.71.133 master01
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>运行：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealer run docker.io/sealerio/kubernetes:v1.22.15   <span class="token parameter variable">--masters</span> <span class="token number">192.168</span>.71.133   <span class="token parameter variable">--nodes</span> <span class="token number">192.168</span>.71.130,192.168.71.134 <span class="token parameter variable">--passwd</span> <span class="token number">123456</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>遇到的问题：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">2023</span>-02-04 <span class="token number">11</span>:58:21 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-unknown: <span class="token function">open</span> /etc/containers/policy.json: permission denied
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>root.go：75 context</strong></p>
<p>Execute 将所有子命令添加到root命令并适当设置标志。会被 main.main() 调用一次。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// rootCmd represents the base command when called without any subcommands</span>
<span class="token keyword">var</span> rootCmd <span class="token operator">=</span> <span class="token operator">&amp;</span>cobra<span class="token punctuation">.</span>Command<span class="token punctuation">{</span>
	Use<span class="token punctuation">:</span>           <span class="token string">"sealer"</span><span class="token punctuation">,</span>
	Short<span class="token punctuation">:</span>         <span class="token string">"A tool to build, share and run any distributed applications."</span><span class="token punctuation">,</span>
	Long<span class="token punctuation">:</span>          longRootCmdDescription<span class="token punctuation">,</span>
	SilenceUsage<span class="token punctuation">:</span>  <span class="token boolean">true</span><span class="token punctuation">,</span>
	SilenceErrors<span class="token punctuation">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>

<span class="token comment">// Execute adds all child commands to the root command and sets flags appropriately.</span>
<span class="token comment">// This is called by main.main(). It only needs to happen once to the rootCmd.</span>
<span class="token keyword">func</span> <span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> rootCmd<span class="token punctuation">.</span><span class="token function">Execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logrus<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"sealer-%s: %v"</span><span class="token punctuation">,</span> version<span class="token punctuation">.</span><span class="token function">GetSingleVersion</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>rootCmd</code> 是一个 cobra 应用程序的根命令，它代表整个应用程序的命令行界面。调用 <code v-pre>rootCmd.Execute()</code> 函数将执行整个命令行程序，并执行其中定义的命令和子命令。</p>
<h3 id="安装时候没有权限打开目录" tabindex="-1"><a class="header-anchor" href="#安装时候没有权限打开目录" aria-hidden="true">#</a> 安装时候没有权限打开目录</h3>
<p><strong>没有权限，我就用权限打开：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h3>
<table>
<thead>
<tr>
<th style="text-align:center">文件</th>
<th style="text-align:center">目的</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"><code v-pre>/etc/shadow</code></td>
<td style="text-align:center">保护用户帐户信息</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>/etc/passwd</code></td>
<td style="text-align:center">用户账户信息</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>/etc/gshadow</code></td>
<td style="text-align:center">包含组帐户的阴影信息</td>
</tr>
<tr>
<td style="text-align:center"><code v-pre>/etc/group</code></td>
<td style="text-align:center">定义用户所属的组</td>
</tr>
</tbody>
</table>
<h3 id="sudo" tabindex="-1"><a class="header-anchor" href="#sudo" aria-hidden="true">#</a> sudo</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>test@cubmaster01:/var/lib/dpkg$ <span class="token function">sudo</span> sealer run docker.io/sealerio/kubernetes:v1.22.15   <span class="token parameter variable">--masters</span> <span class="token number">192.168</span>.71.133   <span class="token parameter variable">--nodes</span> <span class="token number">192.168</span>.71.130,192.168.71.134 <span class="token parameter variable">--passwd</span> <span class="token number">123456</span>
<span class="token punctuation">[</span>sudo<span class="token punctuation">]</span> password <span class="token keyword">for</span> test: 
<span class="token builtin class-name">test</span> is not <span class="token keyword">in</span> the sudoers file.  This incident will be reported.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>编辑sudoers文件：</strong></p>
<p>即执行：<code v-pre>vi /etc/sudoers</code></p>
<p>找到这行 root ALL=(ALL) ALL,在他下面添加xxx ALL=(ALL) ALL (这里的xxx是你的用户名)</p>
<p>ps：这里说下你可以sudoers添加下面四行中任意一条</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>youuser <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL<span class="token punctuation">)</span> ALL
%youuser <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL<span class="token punctuation">)</span> ALL
youuser <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL<span class="token punctuation">)</span> NOPASSWD: ALL
%youuser <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>ALL<span class="token punctuation">)</span> NOPASSWD: ALL
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>第一行:允许用户youuser执行sudo命令(需要输入密码).</li>
<li>第二行:允许用户组youuser里面的用户执行sudo命令(需要输入密码).</li>
<li>第三行:允许用户youuser执行sudo命令,并且在执行的时候不输入密码.</li>
<li>第四行:允许用户组youuser里面的用户执行sudo命令,并且在执行的时候不输入密码.</li>
</ol>
<p><strong>passwd 文件</strong></p>
<p>本地用户信息存储在纯文本<code v-pre>/etc/passwd</code>文件中：它的每一行代表一个用户帐户，并且有七个由冒号分隔的字段。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>帐户：密码：UID：GID：GECOS：目录：shell
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在哪里：</p>
<ul>
<li>
<p><code v-pre>*account*</code>是用户名。此字段不能为空。标准 *NIX 命名规则适用。</p>
</li>
<li>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>是用户密码。</p>
<p><strong>警告：<strong>该<code v-pre>passwd</code>文件是全球可读的，因此在此文件中存储密码（散列或其他方式）是不安全的。相反，Arch Linux 使用<a href="https://wiki.archlinux.org/title/Security#Password_hashes" target="_blank" rel="noopener noreferrer">阴影密码<ExternalLinkIcon/></a>：该<code v-pre>password</code>字段将包含一个占位符字符 ( <code v-pre>x</code>)，表示哈希密码保存在访问受限文件<code v-pre>/etc/shadow</code>中。因此，建议始终使用</strong>passwd</strong>命令更改密码。</p>
</li>
<li>
<p><code v-pre>*UID*</code>是数字用户 ID。在 Arch 中，与服务相对的所谓普通用户的第一个登录名（在 root 之后）默认为 UID 1000；用户的后续 UID 条目应大于 1000。</p>
</li>
<li>
<p><code v-pre>*GID*</code>是用户的数字主要组 ID。GID 的数值列在<a href="https://wiki.archlinux.org/title/users_and_groups#Group_management" target="_blank" rel="noopener noreferrer">/etc/group<ExternalLinkIcon/></a>中。</p>
</li>
<li>
<p><code v-pre>*GECOS*</code>是用于信息目的的可选字段；通常它包含完整的用户名，但它也可以由<em>finger</em>等服务使用，并通过<a href="https://wiki.archlinux.org/title/users_and_groups#Other_examples_of_user_management" target="_blank" rel="noopener noreferrer">chfn<ExternalLinkIcon/></a>命令进行管理。此字段是可选的，可以留空。</p>
</li>
<li>
<p><code v-pre>*directory*</code>由登录命令用来设置<code v-pre>$HOME</code>环境变量。几个服务用自己的用户使用<code v-pre>/</code>，但普通用户一般都设置在一个目录下<code v-pre>/home</code>。</p>
</li>
<li>
<p><code v-pre>*shell*</code>是用户默认<a href="https://wiki.archlinux.org/title/Command_shell" target="_blank" rel="noopener noreferrer">命令 shell<ExternalLinkIcon/></a>的路径。该字段是可选的，默认为<code v-pre>/bin/bash</code>。</p>
</li>
</ul>
<h2 id="myidea" tabindex="-1"><a class="header-anchor" href="#myidea" aria-hidden="true">#</a> myidea</h2>
<p>创建一个名为 sealer 的组向其中添加用户。 当 sealer 守护进程(docker daemon)启动时，它会创建一个可由 sealer 组成员访问的 <code v-pre>Unix</code> 套接字(Unix socket)。</p>
<p><strong>Warning</strong> : <code v-pre>docker</code>组拥有和根用户（root user）同等权限。</p>
<p><strong>kk的解决方案：</strong></p>
<ul>
<li><a href="https://sourcegraph.com/github.com/kubesphere/kubekey@1f3d7c6f05b84802d5f68bdb0032edd102a5a515/-/blob/pkg/kubernetes/tasks.go" target="_blank" rel="noopener noreferrer">https://sourcegraph.com/github.com/kubesphere/kubekey@1f3d7c6f05b84802d5f68bdb0032edd102a5a515/-/blob/pkg/kubernetes/tasks.go<ExternalLinkIcon/></a></li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>SyncKubeConfigToWorker<span class="token punctuation">)</span> <span class="token function">Execute</span><span class="token punctuation">(</span>runtime connector<span class="token punctuation">.</span>Runtime<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> s<span class="token punctuation">.</span>PipelineCache<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>common<span class="token punctuation">.</span>ClusterStatus<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		cluster <span class="token operator">:=</span> v<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token operator">*</span>KubernetesStatus<span class="token punctuation">)</span>
		createConfigDirCmd <span class="token operator">:=</span> <span class="token string">"mkdir -p /root/.kube"</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">GetRunner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SudoCmd</span><span class="token punctuation">(</span>createConfigDirCmd<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">WithStack</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"create .kube dir failed"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		syncKubeConfigForRootCmd <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"echo '%s' > %s"</span><span class="token punctuation">,</span> cluster<span class="token punctuation">.</span>KubeConfig<span class="token punctuation">,</span> <span class="token string">"/root/.kube/config"</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">GetRunner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SudoCmd</span><span class="token punctuation">(</span>syncKubeConfigForRootCmd<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">WithStack</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"sync kube config for root failed"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		userConfigDirCmd <span class="token operator">:=</span> <span class="token string">"mkdir -p $HOME/.kube"</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">GetRunner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Cmd</span><span class="token punctuation">(</span>userConfigDirCmd<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">WithStack</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"user mkdir $HOME/.kube failed"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		syncKubeConfigForUserCmd <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"echo '%s' > %s"</span><span class="token punctuation">,</span> cluster<span class="token punctuation">.</span>KubeConfig<span class="token punctuation">,</span> <span class="token string">"$HOME/.kube/config"</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">GetRunner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Cmd</span><span class="token punctuation">(</span>syncKubeConfigForUserCmd<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">WithStack</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"sync kube config for normal user failed"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		chownKubeConfig <span class="token operator">:=</span> <span class="token string">"chown -R (id−u):(id -g) -R $HOME/.kube"</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">GetRunner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Cmd</span><span class="token punctuation">(</span>chownKubeConfig<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		userId<span class="token punctuation">,</span> err <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">GetRunner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Cmd</span><span class="token punctuation">(</span><span class="token string">"echo $(id -u)"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">WithStack</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"get user id failed"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		userGroupId<span class="token punctuation">,</span> err <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">GetRunner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Cmd</span><span class="token punctuation">(</span><span class="token string">"echo $(id -g)"</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">WithStack</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"get user group id failed"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		chownKubeConfig <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"chown -R %s:%s -R $HOME/.kube"</span><span class="token punctuation">,</span> userId<span class="token punctuation">,</span> userGroupId<span class="token punctuation">)</span>
		<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">GetRunner</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SudoCmd</span><span class="token punctuation">(</span>chownKubeConfig<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>errors<span class="token punctuation">.</span><span class="token function">WithStack</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"chown user kube config failed"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>针对问题：sealer version 的版本号问题的解决方案</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>chown -R 用户名:用户组  目录 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>修改用户，使其属于root组：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 然后修改用户，使其属于root组（wheel），命令如下:</span>
 <span class="token function">usermod</span> <span class="token parameter variable">-g</span> root <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/sm202302051127027.png" alt="image-20230205112748803"></p>
<p>我的思路是安装 sealer  的</p>
<h3 id="sealer-组" tabindex="-1"><a class="header-anchor" href="#sealer-组" aria-hidden="true">#</a> sealer 组</h3>
<p>Docker 设定一个 docker 组是为了提供一种简便的方法来控制对 Docker 的访问。</p>
<p>通常，使用 Docker 需要 root 权限。但是，开放 root 权限带来的安全风险很大，因此 Docker 引入了一个 docker 组来提高安全性。</p>
<p>这意味着，只有加入 docker 组的用户才能够使用 Docker。可以使用以下命令将用户添加到 docker 组中：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo usermod -aG docker $USER
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li>
<p>创建 Sealer 组：使用以下命令创建一个名为 Sealer 的组：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo groupadd Sealer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>添加用户：将所有希望具有访问 Kubernetes 集群和镜像的用户添加到 Sealer 组中。使用以下命令添加用户：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo usermod -aG Sealer &lt;username>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>设置目录访问权限：将 Kubernetes 集群和镜像的目录的访问权限设置为 Sealer 组，以便 Sealer 组中的用户可以访问。使用以下命令设置目录访问权限：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">chown</span> <span class="token parameter variable">-R</span> :Sealer <span class="token operator">&lt;</span>directory<span class="token operator">></span>
<span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token parameter variable">-R</span> g+rwx <span class="token operator">&lt;</span>directory<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>&lt;directory&gt;</code> 是要访问的目录，<code v-pre>&lt;username&gt;</code> 是要添加到 Sealer 组中的用户的用户名。</p>
</li>
</ol>
<p>如果系统用户需要特定的用户和组 ID，请在创建用户时 使用<code v-pre>-u</code>/<code v-pre>--uid</code>和<code v-pre>-g</code>/选项指定它们：<code v-pre>--gid</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># useradd -r -u 850 -g 850 -s /usr/bin/nologin 用户名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="新服务器测试" tabindex="-1"><a class="header-anchor" href="#新服务器测试" aria-hidden="true">#</a> 新服务器测试</h2>
<blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://github.com/sealerio/sealer/releases/download/v0.9.0/sealer-v0.9.0-linux-amd64.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
<span class="token function">tar</span> zxvf sealer-v0.9.0-linux-amd64.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">mv</span> sealer /usr/bin <span class="token punctuation">;</span> sealer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p><strong>bug：单节点也需要IP问题</strong></p>
<p>单节点安装提醒：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#sudo sealer run docker.io/sealerio/kubernetes:v1.22.15 </span>
<span class="token number">2023</span>-02-05 <span class="token number">16</span>:32:44 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: you must input master <span class="token function">ip</span> Or use Clusterfile

<span class="token comment">#sudo sealer run docker.io/sealerio/kubernetes:v1.22.15 --masters 10.160.25.43</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>root用户安装单节点：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealer run docker.io/sealerio/kubernetes:v1.22.15 <span class="token parameter variable">--masters</span> <span class="token number">10.160</span>.25.43
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>EEROR：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">2023</span>-02-05 <span class="token number">16</span>:51:36 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: failed to execute command<span class="token punctuation">(</span>RegistryDomain<span class="token operator">=</span><span class="token string">"sea.hub"</span> <span class="token assign-left variable">RegistryPort</span><span class="token operator">=</span><span class="token string">"5000"</span> <span class="token assign-left variable">RegistryURL</span><span class="token operator">=</span><span class="token string">"sea.hub:5000"</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /var/lib/sealer/data/my-cluster/rootfs/scripts <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> init-registry.sh <span class="token number">5000</span> /var/lib/sealer/data/my-cluster/rootfs/registry sea.hub<span class="token punctuation">)</span> on host<span class="token punctuation">(</span><span class="token number">10.160</span>.25.43<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>exit status <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<p><strong>给目录和用户权限后：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">2023</span>-02-05 <span class="token number">21</span>:19:02 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: cannot <span class="token function">mount</span> using driver overlay <span class="token keyword">in</span> rootless mode. You need to run it <span class="token keyword">in</span> a <span class="token variable"><span class="token variable">`</span>buildah unshare<span class="token variable">`</span></span> session
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>请给入权限：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token builtin class-name">echo</span> <span class="token string">"sealer ALL=(ALL) ALL"</span> <span class="token operator">>></span> /etc/sudoers 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>ssh:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> sudo cat >> /etc/hosts &lt;&lt;EOF            
10.0.0.235 master01
10.0.0.236 node01
10.0.0.237 node02
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>sealer三台服务器测试：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealer run docker.io/sealerio/kubernetes:v1.22.15 <span class="token punctuation">\</span>
  <span class="token parameter variable">--masters</span> <span class="token number">10.0</span>.0.235 <span class="token punctuation">\</span>
  <span class="token parameter variable">--nodes</span> <span class="token number">10.0</span>.0.236 <span class="token number">10.0</span>.0.237 <span class="token parameter variable">--passwd</span> Sealer.io@123
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>error：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>2023-02-07 20:08:47 [ERROR] [root.go:75] sealer-v0.9.0: [ssh][110.0.0.236] failed to create ssh session: dial tcp 110.0.0.236:22: i/o timeout
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '21.md' style='float:left'>⬆️上一节🔗  </a><a href = '23.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


