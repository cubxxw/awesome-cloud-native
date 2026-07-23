<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第5节-sealer-runtime-设计" tabindex="-1"><a class="header-anchor" href="#第5节-sealer-runtime-设计" aria-hidden="true">#</a> 第5节 sealer runtime 设计</h1>
<br>
<div><a href = '4.md' style='float:left'>⬆️上一节🔗  </a><a href = '6.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<p>[TOC]</p>
<h2 id="项目规范" tabindex="-1"><a class="header-anchor" href="#项目规范" aria-hidden="true">#</a> 项目规范</h2>
<p>Here is my clusterfile: 下面是我的集群文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> sealer.cloud/v2
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Cluster
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>test<span class="token punctuation">-</span>cluster
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/sealerio/k0s<span class="token punctuation">:</span>v1<span class="token punctuation">-</span>24<span class="token punctuation">-</span>10<span class="token punctuation">-</span>seaerio<span class="token punctuation">-</span><span class="token number">1</span>
  <span class="token key atrule">containerRuntime</span><span class="token punctuation">:</span> 
    <span class="token key atrule">type</span><span class="token punctuation">:</span> containerd
  <span class="token key atrule">ssh</span><span class="token punctuation">:</span>
    <span class="token key atrule">passwd</span><span class="token punctuation">:</span> Sealer123
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">ips</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> xxx.xxx.xxx.xxx <span class="token punctuation">]</span>
      <span class="token key atrule">roles</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> master <span class="token punctuation">]</span>
    <span class="token punctuation">-</span> <span class="token key atrule">ips</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> xxx.xxx.xxx.xxx <span class="token punctuation">]</span>
      <span class="token key atrule">roles</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> node <span class="token punctuation">]</span>
  <span class="token key atrule">registry</span><span class="token punctuation">:</span>
    <span class="token key atrule">localRegistry</span><span class="token punctuation">:</span>
      <span class="token key atrule">ha</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Test cases: 测试用例：
我们需要保证所有操作都处于节点就绪状态。</p>
<ul>
<li>run: sealer run docker.io/sealerio/k0s:v1-24-10-seaerio-1 -m 10.1.0.218 -n 10.1.0.215 -p Sealer123
运行：封口机运行docker.io/sealerio/k0s:v1-24-10-seaerio-1-m10.1.0.218-n10.1.0.215-p封口机123</li>
<li>scale-up: sealer scale-up -m 10.1.0.216-10.1.0.217 -n 10.1.0.219 -p Sealer123
按比例放大：封口机按比例放大-m 10.1.0.216-10.1.0.217 -n10.1.0.219-p封口机123
failed in Registry HA mode. (seautil not found)
在注册表HA模式下失败。（未找到seautil）
successed in Registry not HA mode.
在非HA模式下注册成功。</li>
<li>delete: sealer delete -m 10.1.0.216
删除：封口机删除-m10.1.0.216</li>
<li>delete -a 删除-a</li>
<li>1master + 3 node install and delete.
1主节点+ 3节点安装和删除。</li>
<li>3master + 1 node install and delete.
3主节点+ 1节点安装和删除。</li>
</ul>
<h2 id="for-k0s" tabindex="-1"><a class="header-anchor" href="#for-k0s" aria-hidden="true">#</a> For k0s</h2>
<p>The build content all your need, following is an x86_64 arch case:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── amd64
│   ├── bin
│   │   ├── conntrack
│   │   ├── containerd-rootless-setuptool.sh
│   │   ├── containerd-rootless.sh
│   │   ├── crictl
│   │   ├── k0s
│   │   ├── kubectl
│   │   ├── nerdctl
│   │   └── seautil
│   ├── cri
│   │   └── containerd.tar.gz
│   └── images
│       └── nerdctl-amd64-registry-image.tar.gz
├── imageList
├── Kubefile
└── rootfs
    ├── etc
    │   ├── containerd-config.toml
    │   ├── containerd.service
    │   └── registry_config.yml
    ├── lib
    ├── manifests
    └── scripts
        ├── containerd.sh
        ├── init-kube.sh
        ├── init-registry.sh
        └── uninstall-containerd.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Kubefile:</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> scratch</span>
<span class="token instruction"><span class="token keyword">COPY</span> rootfs .</span>
<span class="token instruction"><span class="token keyword">COPY</span> amd64 .</span>
<span class="token instruction"><span class="token keyword">COPY</span> imageList manifests</span>
<span class="token instruction"><span class="token keyword">LABEL</span> <span class="token string">"cluster.alpha.sealer.io/cluster-runtime-version"</span>=<span class="token string">"v1.24.10"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> <span class="token string">"cluster.alpha.sealer.io/cluster-runtime-type"</span>=<span class="token string">"k0s"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> <span class="token string">"cluster.alpha.sealer.io/container-runtime-type"</span>=<span class="token string">"containerd"</span></span>
<span class="token instruction"><span class="token keyword">LABEL</span> <span class="token string">"cluster.alpha.sealer.io/container-runtime-version"</span>=<span class="token string">"1.5.12"</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>imageList:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>quay.io/k0sproject/apiserver-network-proxy-agent:0.0.32-k0s1
docker.io/coredns/coredns:1.7.1
registry.k8s.io/kube-proxy:v1.24.10
registry.k8s.io/metrics-server/metrics-server:v0.5.2
registry.k8s.io/pause:3.6
docker.io/cloudnativelabs/kube-router:v1.4.0
quay.io/k0sproject/cni-node:1.1.1-k0s.0
docker.io/calico/cni:v3.23.5
docker.io/calico/kube-controllers:v3.23.5
docker.io/calico/node:v3.23.5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>build:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealer build <span class="token parameter variable">-f</span> Kubefile <span class="token parameter variable">-t</span> my-k0s:1.24.10 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>k8s 从 v1.24 开始，kubernetes 默认容器运行时使用 <code v-pre>containerd</code> ，不再使用 <code v-pre>docker</code>。</p>
<p>k3s 将所有 kubernetes 控制层面组件都封装到 单个二进制中 ，占用资源小，且包含了 kubernetes 运行时所需要的外部依赖和本地存储提供程序。</p>
<p>k3s 提供离线安装包，可以避免网络资源访问问题。</p>
</div>
<h2 id="运行时" tabindex="-1"><a class="header-anchor" href="#运行时" aria-hidden="true">#</a> 运行时</h2>
<div class="custom-container warning"><p class="custom-container-title">什么是 运行时</p>
<p>我们分为广义和侠义</p>
<ul>
<li>广义：程序跑起来的时候</li>
<li>侠义：辅助程序跑起来的代码和环境</li>
</ul>
<p>我们或许可以把 runtime 和 compile-time 对比：</p>
<p>我们都希望编译器发现错误，而不是测试跑的时候发现错误，而且排查很难。</p>
<ul>
<li>runtime：内存错误、数字错误</li>
<li>compile-time：语法错误，语义错误</li>
</ul>
<p><strong>侠义上的运行时：</strong></p>
<ul>
<li>运行时库（runtime library）<code v-pre>stdio.h</code></li>
<li>运行时环境（runtime environment）</li>
</ul>
<p><strong>运行时环境：</strong></p>
<ul>
<li>&quot;无&quot; 运行时 – 依赖 os
<ul>
<li>c/c++</li>
<li>rust</li>
</ul>
</li>
<li>轻运行时
<ul>
<li>Golang</li>
</ul>
</li>
<li>重运行时
<ul>
<li>java（JVM）</li>
<li>python（CPython）</li>
<li>C#（.NET runtime）</li>
</ul>
</li>
</ul>
</div>
<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<details class="custom-container details"><summary>目录结构</summary>
<ul>
<li>
<p><strong>/bin</strong>：</p>
<ul>
<li><code v-pre>bin</code> 是 <code v-pre>Binaries</code> (二进制文件) 的缩写, 这个目录存放着最经常使用的命令。</li>
</ul>
</li>
<li>
<p><strong>/boot</strong>：</p>
<ul>
<li>这里存放的是启动 Linux 时使用的一些核心文件，包括一些连接文件以及镜像文件。</li>
</ul>
</li>
<li>
<p><strong>/dev</strong> ：</p>
<ul>
<li><code v-pre>dev</code> 是 <code v-pre>Device</code>(设备) 的缩写, 该目录下存放的是 Linux 的外部设备，在 Linux 中访问设备的方式和访问文件的方式是相同的。</li>
</ul>
</li>
<li>
<p><strong>/etc</strong>：</p>
<ul>
<li><code v-pre>etc</code> <strong>是</strong> <code v-pre>Etcetera</code>(等等**) **的缩写，这个目录用来存放所有的系统管理所需要的配置文件和子目录。</li>
</ul>
</li>
<li>
<p><strong>/home</strong>：</p>
<ul>
<li>用户的主目录，在 Linux 中，每个用户都有一个自己的目录，一般该目录名是以用户的账号命名的，如上图中的 alice、bob 和 eve。</li>
</ul>
</li>
<li>
<p><strong>/lib</strong>：</p>
<ul>
<li><code v-pre>lib</code> 是Library(库) 的缩写这个目录里存放着系统最基本的动态连接共享库，其作用类似于 Windows 里的 DLL 文件。几乎所有的应用程序都需要用到这些共享库。</li>
</ul>
</li>
<li>
<p><strong>/lost+found</strong>：</p>
<ul>
<li>这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。</li>
</ul>
</li>
<li>
<p><strong>/media</strong>：</p>
<ul>
<li>linux 系统会自动识别一些设备，例如U盘、光驱等等，当识别后，Linux 会把识别的设备挂载到这个目录下。</li>
</ul>
</li>
<li>
<p><strong>/mnt</strong></p>
<ul>
<li>系统提供该目录是为了让用户临时挂载别的文件系统的，我们可以将光驱挂载在 /mnt/ 上，然后进入该目录就可以查看光驱里的内容了。</li>
</ul>
</li>
<li>
<p><strong>/opt</strong>：</p>
<ul>
<li>opt 是optional(可选) 的缩写，这是给主机额外安装软件所摆放的目录。比如你安装一个ORACLE数据库则就可以放到这个目录下。默认是空的。</li>
</ul>
</li>
<li>
<p><strong>/proc</strong>：</p>
<ul>
<li><code v-pre>proc</code> 是<code v-pre>Processes</code>(进程) 的缩写，<code v-pre>/proc</code>是一种伪文件系统（也即虚拟文件系统），存储的是当前内核运行状态的一系列特殊文件，这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。</li>
</ul>
<p>这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件，比如可以通过下面的命令来屏蔽主机的 <code v-pre>ping</code> 命令，使别人无法 <code v-pre>ping</code> 你的机器：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token number">1</span> <span class="token operator">></span> /proc/sys/net/ipv4/icmp_echo_ignore_all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>/root</strong>：</p>
<ul>
<li>该目录为系统管理员，也称作超级权限者的用户主目录。</li>
</ul>
</li>
<li>
<p><strong>/sbin</strong>：</p>
<ul>
<li><code v-pre>s</code> 就是 <code v-pre>Super User</code> 的意思，是 Superuser Binaries (超级用户的二进制文件) 的缩写，这里存放的是系统管理员使用的系统管理程序。</li>
</ul>
</li>
<li>
<p><strong>/selinux</strong>：</p>
<ul>
<li>这个目录是 <code v-pre>Redhat/CentOS</code> 所特有的目录，<code v-pre>Selinux</code>是一个安全机制，类似于 windows 的防火墙，但是这套机制比较复杂，这个目录就是存放<code v-pre>selinux</code>相关的文件的。</li>
</ul>
</li>
<li>
<p><strong>/srv</strong>：</p>
<ul>
<li>该目录存放一些服务启动之后需要提取的数据。</li>
</ul>
</li>
<li>
<p><strong>/sys</strong>：</p>
<ul>
<li>这是 Linux2.6 内核的一个很大的变化。该目录下安装了 2.6 内核中新出现的一个文件系统 sysfs sysfs 文件系统集成了下面3种文件系统的信息：针对进程信息的 proc 文件系统、针对设备的 devfs 文件系统以及针对伪终端的 devpts 文件系统。 该文件系统是内核设备树的一个直观反映。 当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统中被创建。</li>
</ul>
</li>
<li>
<p><strong>/tmp</strong>：</p>
<ul>
<li><code v-pre>tmp</code> 是<code v-pre>temporary</code>(临时) 的缩写这个目录是用来存放一些临时文件的。</li>
</ul>
</li>
<li>
<p><strong>/usr</strong>：</p>
<ul>
<li>usr 是 unix shared resources(共享资源) 的缩写，这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于 windows 下的 program files 目录。</li>
</ul>
</li>
<li>
<p><strong>/usr/bin</strong>：</p>
<ul>
<li>系统用户使用的应用程序。</li>
</ul>
</li>
<li>
<p><strong>/usr/sbin</strong>：</p>
<ul>
<li>超级用户使用的比较高级的管理程序和系统守护程序。</li>
</ul>
</li>
<li>
<p><strong>/usr/src</strong>：</p>
<ul>
<li>内核源代码默认的放置目录。</li>
</ul>
</li>
<li>
<p><strong>/var</strong>：</p>
<ul>
<li>var 是 variable(变量) 的缩写，这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。</li>
</ul>
</li>
<li>
<p><strong>/run</strong>：</p>
<ul>
<li>是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。如果你的系统上有 <code v-pre>/var/run</code> 目录，应该让它指向 <code v-pre>run</code>。</li>
</ul>
</li>
</ul>
<p><strong>💡 重要的目录结构：</strong></p>
<p><strong>在 Linux 系统中，有几个目录是比较重要的，平时需要注意不要误删除或者随意更改内部文件。</strong></p>
<p><code v-pre>-/etc</code>： 上边也提到了，这个是系统中的配置文件，如果你更改了该目录下的某个文件可能会导致系统不能启动。</p>
<p><code v-pre>-/bin, /sbin, /usr/bin, /usr/sbin:</code> 这是系统预设的执行文件的放置目录，比如 ls 就是在 <code v-pre>/bin/ls</code> 目录下的。</p>
<p><strong>值得提出的是，/bin, /usr/bin 是给系统用户使用的指令（除root外的通用户），而/sbin, /usr/sbin 则是给 root 使用的指令。</strong></p>
<p><code v-pre>-/var</code>： 这是一个非常重要的目录，系统上跑了很多程序，那么每个程序都会有相应的日志产生，而这些日志就被记录到这个目录下，具体在 <code v-pre>/var/log</code> 目录下，另外 <code v-pre>mail</code> 的预设放置也是在这里。</p>
</details>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p><strong>议题：</strong></p>
<ul>
<li><a href="https://github.com/sealerio/sealer/issues/1839" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/sealer/issues/1839<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/sealerio/sealer/issues/1770" target="_blank" rel="noopener noreferrer">https://github.com/sealerio/sealer/issues/1770<ExternalLinkIcon/></a></li>
</ul>
<h3 id="what-is-the-problem-this-feature-will-solve" tabindex="-1"><a class="header-anchor" href="#what-is-the-problem-this-feature-will-solve" aria-hidden="true">#</a> What is the problem this feature will solve?</h3>
<ul>
<li>Brings all the benefits of k3s. @https://www.rancher.cn/k3s/</li>
<li>No k3s no sealos.</li>
</ul>
<blockquote>
<p>Sealos wants to hit the mass market, which is consistent with the direction of k3s. The lightweight k3s is more popular with mass developers.</p>
</blockquote>
<p>我们在路线图中对 k8s、k0s、k3s 运行时支持的工作应该有一个进度记录，应该是让工作进度更加清晰，并吸引更多的参与者加入这个核心工作。这里简单介绍一下部分工作：</p>
<p>阅读 Sealer 主分支代码，理解 runtime 模块中的代码，掌握从 cmd 模块到 runtime 模块的代码调用逻辑。</p>
<p>通过k8s、k0s、k3s官网阅读并设计运行时接口实现方法。</p>
<p>为指定的运行时读取和设计 clusterImage。主要参考： <a href="http://sealer.cool/docs/advanced/define-cloudimage.html#customize-the-cloudrootfs" target="_blank" rel="noopener noreferrer">ClusterImage<ExternalLinkIcon/></a>、<a href="https://github.com/sealerio/basefs" target="_blank" rel="noopener noreferrer">basefs<ExternalLinkIcon/></a>。</p>
<p>类型：功能请求</p>
<ul>
<li>单结点成为高可用~</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker~ run cmd 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="clusterlmage" tabindex="-1"><a class="header-anchor" href="#clusterlmage" aria-hidden="true">#</a> Clusterlmage</h2>
<div class="custom-container tip"><p class="custom-container-title">location</p>
<p>https://github.com/sealerio/basefs</p>
</div>
<h3 id="cluster" tabindex="-1"><a class="header-anchor" href="#cluster" aria-hidden="true">#</a> cluster</h3>
<ul>
<li><code v-pre>Bin file</code>，如 docker、containerd、crictl、kubeadm、kubectl...</li>
<li><code v-pre>config file</code> ，如 kubelet systemd config、docker systemd config、docker daemon.json...</li>
<li><code v-pre>registry</code> images。</li>
<li><code v-pre>Some metadata</code>，例如 Kubernetes 版本信息。</li>
<li><code v-pre>registry file</code>，包含所有的docker镜像，比如kubernetes核心组件docker镜像...</li>
<li><code v-pre>Script</code>，一些用于安装 docker 和 kubelet 的 shell 脚本... sealer 将调用 <code v-pre>init.sh</code> 和 <code v-pre>clean.sh</code>。</li>
<li><code v-pre>Other static files</code> ：其他静态文件</li>
</ul>
<p>使用 Kubernetes 仪表板构建 ClusterImage：</p>
<p>FileName：<code v-pre>Kubefile</code></p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code><span class="token comment"># base ClusterImage contains all the files that run a kubernetes cluster needed.</span>
<span class="token comment">#    1. kubernetes components like kubectl kubeadm kubelet and apiserver images ...</span>
<span class="token comment">#    2. docker engine, and a private registry</span>
<span class="token comment">#    3. config files, yaml, static files, scripts ...</span>
<span class="token instruction"><span class="token keyword">FROM</span> registry.cn-qingdao.aliyuncs.com/sealer-io/kubernetes:v1.19.8</span>
<span class="token comment"># download kubernetes dashboard yaml file</span>
<span class="token instruction"><span class="token keyword">RUN</span> wget https://raw.githubusercontent.com/kubernetes/dashboard/v2.2.0/aio/deploy/recommended.yaml</span>
<span class="token comment"># when run this ClusterImage, will apply a dashboard manifests</span>
<span class="token instruction"><span class="token keyword">CMD</span> kubectl apply -f recommended.yaml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Build it：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealer build <span class="token parameter variable">-t</span> registry.cn-qingdao.aliyuncs.com/sealer-io/dashboard:latest <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Make it run：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># sealer will install a kubernetes on host 192.168.0.2 then apply the dashboard manifests</span>
sealer run registry.cn-qingdao.aliyuncs.com/sealer-io/dashboard:latest <span class="token parameter variable">--masters</span> <span class="token number">192.168</span>.0.2 <span class="token parameter variable">--passwd</span> xxx
<span class="token comment"># check the pod</span>

kubectl get pod -A<span class="token operator">|</span><span class="token function">grep</span> dashboard
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="调研" tabindex="-1"><a class="header-anchor" href="#调研" aria-hidden="true">#</a> 调研</h2>
<p>首先需要调研，然后出一个设计稿，比如 <code v-pre>install</code> 模块怎么和 k3s 结合</p>
<p><code v-pre>apply</code> 会对比一下新旧集群的差别，然后再确定是否调用  <code v-pre>runtime</code>  来扩缩容集群</p>
<blockquote>
<p>目前k3s还没有实现，<code v-pre>k0s</code> 在最新代码中还没有适配起来，上面这个文档是在0.8.6版本，也就是9月下旬发布的那个版本代码前设计的，现在的话大体思路一致，如果需要实现k3s的话，首先需要熟读k3s的官方安装文档，其次阅读<code v-pre>sealer runtime</code>的接口逻辑，<code v-pre>install/scaleup</code>等接口干些什么事儿。最后还需要看一下如何与<code v-pre>rootfs</code>进行交互，也就是集群镜像那个部分。</p>
<p>切换到9月30号的那次<code v-pre>starcomingup</code>的提交，基于那次<code v-pre>commit</code>进行编译，k0s镜像的话可以体验一下。</p>
<ul>
<li>scaledown 作用于 master 节点，删除master节点前需要先删除master节点上的pod</li>
</ul>
</blockquote>
<p><strong>install 模块和 k3s 的结合：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
Install a new cluster.

:param infra: 基础结构对象。
:param kubeadmConfig: The kubeadm configuration.
:param masters: The list of master IPs.
:param workers: The list of worker IPs.
:returns: None
:raises: None
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><em>infradriver</em>:</strong></p>
<blockquote>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// infracontrol将整个集群视为一个操作系统内核，</span>
<span class="token comment">// 这里的interface函数是目标系统调用。</span>
<span class="token keyword">type</span> InfraDriver <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">GetHostIPList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>net<span class="token punctuation">.</span>IP

	<span class="token function">GetHostIPListByRole</span><span class="token punctuation">(</span>role <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>net<span class="token punctuation">.</span>IP
	<span class="token comment">//获取指定角色的ip列表，比如master，node，</span>
    
	<span class="token function">GetHostsPlatform</span><span class="token punctuation">(</span>hosts <span class="token punctuation">[</span><span class="token punctuation">]</span>net<span class="token punctuation">.</span>IP<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span>v1<span class="token punctuation">.</span>Platform<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span>net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>

	<span class="token comment">//GetHostEnv return merged env with host env and cluster env.</span>
	<span class="token function">GetHostEnv</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">)</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">//GetClusterEnv return cluster.spec.env as map[string]interface{}</span>
	<span class="token function">GetClusterEnv</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token comment">//GetClusterName ${clusterName}</span>
	<span class="token function">GetClusterName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>

	<span class="token comment">//GetClusterImageName ${cluster image Name}</span>
	<span class="token function">GetClusterImageName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>

	<span class="token comment">//GetClusterLaunchCmds ${user-defined launch command}</span>
	<span class="token function">GetClusterLaunchCmds</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>

	<span class="token comment">//GetClusterRootfsPath /var/lib/sealer/data/${clusterName}/rootfs</span>
	<span class="token function">GetClusterRootfsPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>

	<span class="token comment">// GetClusterBasePath /var/lib/sealer/data/${clusterName}</span>
	<span class="token function">GetClusterBasePath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>

	<span class="token comment">// Execute use eg.Go to execute shell cmd concurrently</span>
	<span class="token function">Execute</span><span class="token punctuation">(</span>hosts <span class="token punctuation">[</span><span class="token punctuation">]</span>net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> f <span class="token keyword">func</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">)</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token builtin">error</span>

	<span class="token comment">// Copy local files to remote host</span>
	<span class="token comment">// scp -r /tmp root@192.168.0.2:/root/tmp => Copy("192.168.0.2","tmp","/root/tmp")</span>
	<span class="token comment">// need check md5sum</span>
	<span class="token function">Copy</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> localFilePath<span class="token punctuation">,</span> remoteFilePath <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token comment">// CopyR copy remote host files to localhost</span>
	<span class="token function">CopyR</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> remoteFilePath<span class="token punctuation">,</span> localFilePath <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token comment">// CmdAsync exec command on remote host, and asynchronous return logs</span>
	<span class="token function">CmdAsync</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> cmd <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token comment">// Cmd exec command on remote host, and return combined standard output and standard error</span>
	<span class="token function">Cmd</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> cmd <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token comment">// CmdToString exec command on remote host, and return spilt standard output and standard error</span>
	<span class="token function">CmdToString</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> cmd<span class="token punctuation">,</span> spilt <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>

	<span class="token comment">// IsFileExist check remote file exist or not</span>
	<span class="token function">IsFileExist</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> remoteFilePath <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token comment">// IsDirExist Remote file existence returns true, nil</span>
	<span class="token function">IsDirExist</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> remoteDirPath <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">bool</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>

	<span class="token comment">// GetPlatform Get remote platform</span>
	<span class="token function">GetPlatform</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">)</span> <span class="token punctuation">(</span>v1<span class="token punctuation">.</span>Platform<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>

	<span class="token function">GetHostName</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token comment">// Ping Ping remote host</span>
	<span class="token function">Ping</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token comment">// SetHostName add or update host name on host</span>
	<span class="token function">SetHostName</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> hostName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>

	<span class="token comment">//SetClusterHostAliases set additional HostAliases</span>
	<span class="token function">SetClusterHostAliases</span><span class="token punctuation">(</span>hosts <span class="token punctuation">[</span><span class="token punctuation">]</span>net<span class="token punctuation">.</span>IP<span class="token punctuation">)</span> <span class="token builtin">error</span>

	<span class="token comment">//DeleteClusterHostAliases delete additional HostAliases</span>
	<span class="token function">DeleteClusterHostAliases</span><span class="token punctuation">(</span>hosts <span class="token punctuation">[</span><span class="token punctuation">]</span>net<span class="token punctuation">.</span>IP<span class="token punctuation">)</span> <span class="token builtin">error</span>

	<span class="token comment">// SetLvsRule add or update host name on host</span>
	<span class="token comment">//SetLvsRule(host net.IP, hostName string) error</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<blockquote>
<p>定义了一个名为<code v-pre>Infracontrol</code>的接口，该接口包含了一系列函数，这些函数用于实现对整个集群的控制。具体而言，它提供了一些函数，用于获取集群中主机的 IP 列表，获取指定角色的 IP 列表，获取主机环境变量，获取集群名称和镜像名称，还提供了一些函数用于执行命令，检查文件和目录是否存在，获取远程主机的平台，获取主机名称，以及一些其他功能。这些函数可以用来操作整个集群，从而实现对集群的控制。</p>
</blockquote>
<div class="custom-container tip"><p class="custom-container-title">字段📜 对上面的解释</p>
<ul>
<li><code v-pre>GetHostIPList</code>函数用于获取集群中主机的 IP 列表。</li>
<li><code v-pre>GetHostIPListByRole</code>函数用于获取指定角色的 IP 列表，比如<code v-pre>master</code>或<code v-pre>node</code>。</li>
<li><code v-pre>GetHostsPlatform</code>函数用于获取主机的平台信息，并返回一个映射，其中键表示平台信息，值表示与该平台对应的 IP 列表。</li>
<li><code v-pre>GetHostEnv</code>函数用于获取主机的环境变量，并返回一个映射，其中键表示变量名称，值表示变量值。</li>
</ul>
</div>
<h2 id="runtime-types" tabindex="-1"><a class="header-anchor" href="#runtime-types" aria-hidden="true">#</a> runtime/types</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>// Metadata use <span class="token function">file</span> Metadata <span class="token keyword">in</span> rootfs to <span class="token builtin class-name">help</span> cluster install.
<span class="token builtin class-name">type</span> Metadata struct <span class="token punctuation">{</span>
	Version string <span class="token variable"><span class="token variable">`</span>json:<span class="token string">"version"</span><span class="token variable">`</span></span>
	Arch    string <span class="token variable"><span class="token variable">`</span>json:<span class="token string">"arch"</span><span class="token variable">`</span></span>
	Variant string <span class="token variable"><span class="token variable">`</span>json:<span class="token string">"variant"</span><span class="token variable">`</span></span>
	// KubeVersion is a SemVer constraint specifying the version of Kubernetes required.
	KubeVersion string <span class="token variable"><span class="token variable">`</span>json:<span class="token string">"kubeVersion"</span><span class="token variable">`</span></span>
	NydusFlag   bool   <span class="token variable"><span class="token variable">`</span>json:<span class="token string">"NydusFlag"</span><span class="token variable">`</span></span>
	// ClusterRuntime is a flag to distinguish the runtime <span class="token keyword">for</span> k0s、k8s、k3s
	ClusterRuntime ClusterRuntime <span class="token variable"><span class="token variable">`</span>json:<span class="token string">"ClusterRuntime"</span><span class="token variable">`</span></span>
<span class="token punctuation">}</span>

<span class="token builtin class-name">type</span> ClusterRuntime string

const <span class="token punctuation">(</span>
	K0s ClusterRuntime <span class="token operator">=</span> <span class="token string">"k0s"</span>
	K3s ClusterRuntime <span class="token operator">=</span> <span class="token string">"k3s"</span>
	K8s ClusterRuntime <span class="token operator">=</span> <span class="token string">"k8s"</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>metadata:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z rootfs<span class="token punctuation">]</span><span class="token comment"># pwd;cat Metadata </span>
/var/lib/sealer/data/my-cluster/rootfs
<span class="token punctuation">{</span>
  <span class="token string">"version"</span><span class="token builtin class-name">:</span> <span class="token string">"v1.19.8"</span>,
  <span class="token string">"arch"</span><span class="token builtin class-name">:</span> <span class="token string">"amd64"</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rootfs-module" tabindex="-1"><a class="header-anchor" href="#rootfs-module" aria-hidden="true">#</a> rootfs module</h2>
<p><strong>interface：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Manager <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> App   <span class="token comment">// App returns the application manager.</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> App <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Root</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span>  <span class="token comment">// Root returns the root path of the application.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="data" tabindex="-1"><a class="header-anchor" href="#data" aria-hidden="true">#</a> data</h2>
<p><img src="http://sm.cubxxw.com/smetcd&amp;sqlite" alt="在这里插入图片描述"></p>
<blockquote>
<p>📜 对上面的解释：</p>
<p>etcd &amp; DQLite 使用的都是 raft 共识算法。</p>
</blockquote>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>我需要注意的模块：</p>
<ul>
<li>apply/driver/</li>
<li>apply/processor/</li>
<li><a href="https://github.com/sealerio/sealer/pull/1686/files#diff-ad043994ee0ef6e350ef3520fbab469423b41d1abb8cdb3527b230eb3416d4de" target="_blank" rel="noopener noreferrer">cmd/sealer/cmd/cluster<ExternalLinkIcon/></a></li>
<li>runtime</li>
</ul>
</div>
<h2 id="安装-放大-缩小-重置-升级" tabindex="-1"><a class="header-anchor" href="#安装-放大-缩小-重置-升级" aria-hidden="true">#</a> 安装/放大/缩小/重置/升级</h2>
<ul>
<li>删除注册表交互逻辑</li>
<li>更改为 <code v-pre>infra-driver</code> 命令</li>
</ul>
<h2 id="更改-basefs-脚本" tabindex="-1"><a class="header-anchor" href="#更改-basefs-脚本" aria-hidden="true">#</a> 更改 basefs 脚本</h2>
<ul>
<li>容器 <code v-pre>d.sh</code></li>
<li>有些东西需要遵循 <code v-pre>k8s</code> 领先的逻辑</li>
</ul>
<h2 id="入口函数" tabindex="-1"><a class="header-anchor" href="#入口函数" aria-hidden="true">#</a> 入口函数</h2>
<ul>
<li><code v-pre>ChooseClusterRuntime()</code>：使用 <code v-pre>Metadata</code> 来区分集群 <code v-pre>Runtime</code>，需要添加一个字段来区分k0s、k3s、k8s</li>
</ul>
<h3 id="附加上下文" tabindex="-1"><a class="header-anchor" href="#附加上下文" aria-hidden="true">#</a> 附加上下文</h3>
<p>在此处添加有关功能请求的任何其他上下文或屏幕截图。</p>
<h3 id="sealos-主议题" tabindex="-1"><a class="header-anchor" href="#sealos-主议题" aria-hidden="true">#</a> sealos 主议题</h3>
<ul>
<li>
<p><a href="https://github.com/sealerio/sealer/issues?q=is%3Aissue+is%3Aopen+k3s" target="_blank" rel="noopener noreferrer">k3s 所有议题<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/labring/sealos/issues/1943" target="_blank" rel="noopener noreferrer">https://github.com/labring/sealos/issues/1943<ExternalLinkIcon/></a></p>
</li>
<li>
<p>https://github.com/sealerio/sealer/issues/1399</p>
</li>
</ul>
<h3 id="策划文档" tabindex="-1"><a class="header-anchor" href="#策划文档" aria-hidden="true">#</a> 策划文档</h3>
<ul>
<li>https://www.yuque.com/zhouxinyuan-6woia/nodno9/iswdqd</li>
</ul>
<h2 id="计划" tabindex="-1"><a class="header-anchor" href="#计划" aria-hidden="true">#</a> 计划</h2>
<ul>
<li>[x] 熟读k3s官方文档</li>
<li>[x] 熟悉 k3s 的安装脚本</li>
<li>[x] 阅读 sealer runtime 的接口逻辑   install / scaleup 接口</li>
<li>[x] 如何和 rootfs 交互</li>
</ul>
<h2 id="issues" tabindex="-1"><a class="header-anchor" href="#issues" aria-hidden="true">#</a> issues</h2>
<p>我们在路线图中对 k8s、k0s、k3s 运行时支持的工作应该有一个进度记录，应该是让工作进度更加清晰，并吸引更多的参与者加入这个核心工作。这里简单介绍一下部分工作：
阅读Sealer主分支代码，理解 <code v-pre>runtime</code> 模块中的代码，掌握从 cmd 模块到 runtime 模块的代码调用逻辑。
通过k8s、k0s、k3s官网阅读并设计运行时接口实现方法。
为指定的运行时读取和设计 clusterImage。主要参考： <a href="http://sealer.cool/docs/advanced/define-cloudimage.html#customize-the-cloudrootfs" target="_blank" rel="noopener noreferrer">ClusterImage<ExternalLinkIcon/></a>、<a href="https://github.com/sealerio/basefs" target="_blank" rel="noopener noreferrer">basefs<ExternalLinkIcon/></a>。
类型：<em>功能请求</em></p>
<ul>
<li><a href="https://github.com/sealerio/sealer/pull/1686" target="_blank" rel="noopener noreferrer">k0s 跟进文档<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/sealerio/sealer/pull/1686/files" target="_blank" rel="noopener noreferrer">1686议题跟进代码<ExternalLinkIcon/></a></li>
</ul>
<h3 id="cluster-1" tabindex="-1"><a class="header-anchor" href="#cluster-1" aria-hidden="true">#</a> cluster</h3>
<p><code v-pre>cluster.go</code> 描述整个集群期望状态 -- 几个<code v-pre>master</code>，几个<code v-pre>node</code>，<code v-pre>ssh</code>密码、端口号、集群镜像、贯穿始终，特别特别重要  -- <code v-pre>sealos run</code> 也是渲染成结构体传递给其他模块~</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>---
apply.go
cert.go
cluster.go
delete.go
join.go
run-app.go
run.go
scale-up.go
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="k0s-runtime-design-readme" tabindex="-1"><a class="header-anchor" href="#k0s-runtime-design-readme" aria-hidden="true">#</a> k0s runtime design readme</h2>
<details class="custom-container details"><summary>install.sh</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#$ curl https://get.k0s.sh/</span>
<span class="token comment">#!/bin/sh</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${DEBUG}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>
<span class="token keyword">fi</span>

<span class="token function-name function">_k0s_latest</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">curl</span> <span class="token parameter variable">-sSLf</span> <span class="token string">"https://docs.k0sproject.io/stable.txt"</span>
<span class="token punctuation">}</span>

<span class="token function-name function">_detect_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token assign-left variable">os</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span><span class="token variable">)</span></span>"</span>
  <span class="token keyword">case</span> <span class="token string">"<span class="token variable">$os</span>"</span> <span class="token keyword">in</span>
    Linux<span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">"k0s"</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
    *<span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">"Unsupported operating system: <span class="token variable">$os</span>"</span> <span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token file-descriptor important">&amp;2</span><span class="token punctuation">;</span> <span class="token builtin class-name">return</span> <span class="token number">1</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token keyword">esac</span>
  <span class="token builtin class-name">unset</span> os
<span class="token punctuation">}</span>

<span class="token function-name function">_detect_arch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token assign-left variable">arch</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>"</span>
  <span class="token keyword">case</span> <span class="token string">"<span class="token variable">$arch</span>"</span> <span class="token keyword">in</span>
    amd64<span class="token operator">|</span>x86_64<span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">"amd64"</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
    arm64<span class="token operator">|</span>aarch64<span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">"arm64"</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
    armv7l<span class="token operator">|</span>armv8l<span class="token operator">|</span>arm<span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">"arm"</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
    *<span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">"Unsupported processor architecture: <span class="token variable">$arch</span>"</span> <span class="token operator"><span class="token file-descriptor important">1</span>></span><span class="token file-descriptor important">&amp;2</span><span class="token punctuation">;</span> <span class="token builtin class-name">return</span> <span class="token number">1</span> <span class="token punctuation">;</span><span class="token punctuation">;</span>
  <span class="token keyword">esac</span>
  <span class="token builtin class-name">unset</span> arch
<span class="token punctuation">}</span>

<span class="token function-name function">_download_url</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"https://ghproxy.com/https://github.com/k0sproject/k0s/releases/download/<span class="token variable">$K0S_VERSION</span>/<span class="token variable">$k0sBinary</span>-<span class="token variable">$K0S_VERSION</span>-<span class="token variable">$k0sArch</span>"</span>
<span class="token punctuation">}</span>

<span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">${K0S_VERSION}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token assign-left variable">K0S_VERSION</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>_k0s_latest<span class="token variable">)</span></span>
  <span class="token keyword">fi</span>

  <span class="token assign-left variable">k0sInstallPath</span><span class="token operator">=</span>/usr/local/bin
  <span class="token assign-left variable">k0sBinary</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span>_detect_binary<span class="token variable">)</span></span>"</span>
  <span class="token assign-left variable">k0sArch</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span>_detect_arch<span class="token variable">)</span></span>"</span>
  <span class="token assign-left variable">k0sDownloadUrl</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span>_download_url<span class="token variable">)</span></span>"</span>

  <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> -- <span class="token string">"<span class="token variable">$k0sInstallPath</span>"</span>

  <span class="token builtin class-name">echo</span> <span class="token string">"Downloading k0s from URL: <span class="token variable">$k0sDownloadUrl</span>"</span>

  <span class="token function">curl</span> <span class="token parameter variable">-sSLf</span> <span class="token string">"<span class="token variable">$k0sDownloadUrl</span>"</span> <span class="token operator">></span><span class="token string">"<span class="token variable">$k0sInstallPath</span>/<span class="token variable">$k0sBinary</span>"</span>
  <span class="token function">chmod</span> <span class="token number">755</span> -- <span class="token string">"<span class="token variable">$k0sInstallPath</span>/<span class="token variable">$k0sBinary</span>"</span>

  <span class="token builtin class-name">echo</span> <span class="token string">"k0s is now executable in <span class="token variable">$k0sInstallPath</span>"</span>
<span class="token punctuation">}</span>

main

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><strong>about k0s runtime readme：</strong></p>
<ul>
<li>https://github.com/sealerio/sealer/blob/main/pkg/runtime/k0s/README.md</li>
</ul>
<h3 id="basics-directory-structure" tabindex="-1"><a class="header-anchor" href="#basics-directory-structure" aria-hidden="true">#</a> basics directory structure</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>├── amd64
│   ├── bin
│   │   ├── k0s
│   │   ├── kubectl
│   │   ├── nerdctl
│   │   └── seautil
│   ├── images
│   │   └── registry.tar.gz
│   └── Metadata
├── imageList
├── Kubefile
└── rootfs
    ├── etc
    │   ├── dump-config.toml
    │   └── registry.yml
    └── scripts
        ├── containerd.sh
        ├── init-registry.sh
        └── init.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="重构相对运行时的列表" tabindex="-1"><a class="header-anchor" href="#重构相对运行时的列表" aria-hidden="true">#</a> 重构相对运行时的列表</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>runtime
├── interface.go <span class="token comment"># runtime interface</span>
└── kubernets
    ├── join_masters.go     <span class="token comment"># add master nodes/controlplanes</span>
    ├── join_worker.go      <span class="token comment"># add worker nodes</span>
    ├── common.go           <span class="token comment"># Enum relative Kubeadm</span>
    ├── init.go             <span class="token comment"># create cluster</span>
    ├── delete_masters.go   <span class="token comment"># delete master nodes/controlplanes</span>
    ├── delete_nodes.go     <span class="token comment"># delete worker nodes</span>
    ├── kubeadm_runtime.go  <span class="token comment"># runtime implement</span>
    ├── kubeadm_type        <span class="token comment"># kubeadm version type</span>
    │   └── v1beta1
    │       └── type.go
    ├── registry_service.go  <span class="token comment"># get and set some registry info</span>
    ├── reset.go             <span class="token comment"># reset a kubernetes cluster</span>
    ├── static_file.go       <span class="token comment"># AuditPolicyYml type</span>
    ├── update_cert.go       <span class="token comment"># update certs about kubernetes</span>
    └── util.go              <span class="token comment"># util of kubernetes runtime</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cloud镜像" tabindex="-1"><a class="header-anchor" href="#cloud镜像" aria-hidden="true">#</a> cloud镜像</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>COPY rootfs/* <span class="token builtin class-name">.</span>
COPY <span class="token variable">${ARCH}</span> <span class="token builtin class-name">.</span>
COPY ImageList manifests
BASE rootfs cache
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="目录设计" tabindex="-1"><a class="header-anchor" href="#目录设计" aria-hidden="true">#</a> 目录设计</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>├── bin
│   ├── conntrack
│   ├── containerd-rootless-setuptool.sh
│   ├── containerd-rootless.sh
│   ├── crictl
│   ├── k0s
│   ├── kubectl
│   ├── <span class="token punctuation">..</span>.
│   └── seautil
├── etc
│   ├── admin.conf
│   ├── Clusterfile  <span class="token comment"># 镜像默认集群文件</span>
│   ├── daemon.json <span class="token comment"># docker 守护进程配置文件。</span>
│   ├── docker.service
│   ├── k0s.yaml <span class="token comment"># k0s config</span>
│   ├── kubelet.service
│   └── registry.yml <span class="token comment"># 如果用户想自定义用户名和密码，可以覆盖这个文件。</span>
├── images
│   └── registry.tar  <span class="token comment"># 注册docker镜像，将加载此镜像并在集群中运行本地注册表</span>
├── Metadata
├── registry <span class="token comment">#是否将此目录挂载到本地注册表</span>
│   └── <span class="token function">docker</span>
│       └── registry
├── scripts
│   ├── script-wait-for-develop
└── statics <span class="token comment"># yaml文件, sealer 将渲染这些文件中的值</span>
    └── audit-policy.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="clusterfile-和-kubeadmconfig" tabindex="-1"><a class="header-anchor" href="#clusterfile-和-kubeadmconfig" aria-hidden="true">#</a> Clusterfile 和 KubeadmConfig</h3>
<p>KubeadmConfig 根据集群文件生成，如何从集群文件中加载：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// LoadFromClusterfile: Load KubeadmConfig from Clusterfile.</span>
<span class="token comment">// If it has `KubeadmConfig` in Clusterfile, load every field to each configuration.</span>
<span class="token comment">// If Kubeadm raw config in Clusterfile, just load it.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>k <span class="token operator">*</span>KubeadmConfig<span class="token punctuation">)</span> <span class="token function">LoadFromClusterfile</span><span class="token punctuation">(</span>kubeadmConfig KubeadmConfig<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	k<span class="token punctuation">.</span>APIServer<span class="token punctuation">.</span>CertSANs <span class="token operator">=</span> strUtils<span class="token punctuation">.</span><span class="token function">RemoveDuplicate</span><span class="token punctuation">(</span><span class="token function">append</span><span class="token punctuation">(</span>k<span class="token punctuation">.</span>APIServer<span class="token punctuation">.</span>CertSANs<span class="token punctuation">,</span> kubeadmConfig<span class="token punctuation">.</span>APIServer<span class="token punctuation">.</span>CertSANs<span class="token operator">...</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

	<span class="token keyword">return</span> mergo<span class="token punctuation">.</span><span class="token function">Merge</span><span class="token punctuation">(</span>k<span class="token punctuation">,</span> kubeadmConfig<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3>
<p>我们定义 k0s 运行时有 5 个阶段来安装/扩展/重置集群。</p>
<p>basefs 包含二进制、shell 脚本、配置文件和镜像。了解有关<a href="https://github.com/sealerio/basefs" target="_blank" rel="noopener noreferrer">sealerio/basefs 的更多信息<ExternalLinkIcon/></a></p>
<p><a href="https://github.com/k0sproject/k0s" target="_blank" rel="noopener noreferrer">通过执行k0s<ExternalLinkIcon/></a> 命令安装文件系统引导集群之前的运行时。</p>
<ul>
<li>init
<ul>
<li>当 sealer 导致先安装集群时，<code v-pre>init</code> 阶段将 <code v-pre>rootfs/bin</code> 复制到 <code v-pre>init.sh</code> 脚本中的 <code v-pre>/usr/bin</code></li>
<li>创建引导配置 <code v-pre>/etc/k0s/k0s.yaml</code> 以引导控制器初始化</li>
<li>生成 <code v-pre>k0s</code> 加入令牌 <code v-pre>/etc/k0s/worker-token</code> 和 <code v-pre>/etc/k0s/controller-token</code>，也是私有注册表证书</li>
<li>初始化控制器节点</li>
<li>获取  <code v-pre>~/.kube/config</code>  的配置以管理集群。</li>
</ul>
</li>
<li>join
<ul>
<li>加入阶段准备注册表证书，并用于 <code v-pre>k0s join</code> 扩展集群。</li>
</ul>
</li>
<li>delete
<ul>
<li>删除与加入相同，但它回收加入阶段安装的任何内容。</li>
</ul>
</li>
<li>reset
<ul>
<li>通过 <code v-pre>k0s</code> 重置以移除该集群并移除由 <code v-pre>sealer</code> 生成的集群的任何相关内容。</li>
</ul>
</li>
<li>Upgrade
<ul>
<li><code v-pre>upgrade</code> 可以升级 <code v-pre>k0s</code> 集群。</li>
</ul>
</li>
</ul>
<h2 id="表格-cn" tabindex="-1"><a class="header-anchor" href="#表格-cn" aria-hidden="true">#</a> 表格（CN）</h2>
<p><img src="http://sm.cubxxw.com/smimage-20221113000126421.png" alt="image-20221113000126421"></p>
<h2 id="code-runtime-module" tabindex="-1"><a class="header-anchor" href="#code-runtime-module" aria-hidden="true">#</a> code runtime module</h2>
<p><strong>util.go：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">/*
Loads the metadata file from the given rootfs.
从给定的rootfs加载元数据文件。

Args:
	rootfs: The rootfs path.

Returns:
	The metadata object.
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>metaverse 元宇宙</li>
<li>metadata 元数据</li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">what is metadata</p>
<p>描述数据的数据，它是数据的描述和上下文。有助于组织、发现和理解数据。</p>
<ul>
<li>业务 metadata</li>
<li>操作 metadata
<ul>
<li>数据所有者、使用者</li>
<li>数据的访问方式、访问时间、访问限制</li>
<li>数据的访问权限、组和角色等</li>
<li>数据处理作业的结果、系统执行日志等等</li>
<li>数据备份、归档人、归档时间等</li>
</ul>
</li>
</ul>
</div>
<h2 id="k3s-rootfs" tabindex="-1"><a class="header-anchor" href="#k3s-rootfs" aria-hidden="true">#</a> k3s rootfs</h2>
<details class="custom-container details">
<p><strong>bin:</strong></p>
<p><strong>主要的二进制：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/var/lib/rancher/k3s/data/2ef87ff954adbb390309ce4dc07500f29c319f84feec1719bfb5059c8808ec6a/bin<span class="token comment"># ls -al |grep "^-"</span>
-rwxr-xr-x <span class="token number">1</span> root root    <span class="token number">268480</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> blkid
-rwxr-xr-x <span class="token number">1</span> root root    <span class="token number">816728</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> busybox
-rwxr-xr-x <span class="token number">1</span> root root   <span class="token number">2874560</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> charon
-rwxr-xr-x <span class="token number">1</span> root root     <span class="token number">13476</span> Oct <span class="token number">25</span> <span class="token number">12</span>:59 check-config
-rwxr-xr-x <span class="token number">1</span> root root   <span class="token number">3158016</span> Oct <span class="token number">25</span> <span class="token number">12</span>:59 cni
-rwxr-xr-x <span class="token number">1</span> root root    <span class="token number">186672</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> conntrack
-rwxr-xr-x <span class="token number">1</span> root root  <span class="token number">53494904</span> Oct <span class="token number">25</span> <span class="token number">12</span>:59 containerd
-rwxr-xr-x <span class="token number">1</span> root root   <span class="token number">9482240</span> Oct <span class="token number">25</span> <span class="token number">12</span>:59 containerd-shim-runc-v2
-rwxr-xr-x <span class="token number">1</span> root root   <span class="token number">1388752</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> coreutils
-rwxr-xr-x <span class="token number">1</span> root root    <span class="token number">215000</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> <span class="token function">ethtool</span>
-rwxr-xr-x <span class="token number">1</span> root root    <span class="token number">303088</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> <span class="token function">find</span>
-rwxr-xr-x <span class="token number">1</span> root root    <span class="token number">444520</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> fuse-overlayfs
-rwxr-xr-x <span class="token number">1</span> root root    <span class="token number">533648</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> <span class="token function">ip</span>
-rwxr-xr-x <span class="token number">1</span> root root    <span class="token number">186432</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> ipset
-rwxr-xr-x <span class="token number">1</span> root root <span class="token number">130760056</span> Oct <span class="token number">25</span> <span class="token number">12</span>:59 k3s
-rw-r--r-- <span class="token number">1</span> root root      <span class="token number">6046</span> Oct <span class="token number">25</span> <span class="token number">12</span>:59 .links
-rwxr-xr-x <span class="token number">1</span> root root    <span class="token number">193952</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> losetup
-rwxr-xr-x <span class="token number">1</span> root root     <span class="token number">63040</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> nsenter
-rwxr-xr-x <span class="token number">1</span> root root    <span class="token number">181944</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> pigz
-rwxr-xr-x <span class="token number">1</span> root root   <span class="token number">8887624</span> Oct <span class="token number">25</span> <span class="token number">12</span>:59 runc
-rw-r--r-- <span class="token number">1</span> root root      <span class="token number">2335</span> Oct <span class="token number">25</span> <span class="token number">12</span>:59 .sha256sums
-rwxr-xr-x <span class="token number">1</span> root root   <span class="token number">1129336</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> slirp4netns
-rwxr-xr-x <span class="token number">1</span> root root    <span class="token number">934304</span> Dec <span class="token number">18</span>  <span class="token number">2021</span> swanctl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>其他的链接文件：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/var/lib/rancher/k3s/data/2ef87ff954adbb390309ce4dc07500f29c319f84feec1719bfb5059c8808ec6a/bin<span class="token comment"># ls -al  |grep "^l"</span>
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token punctuation">[</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token punctuation">[</span><span class="token punctuation">[</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 addgroup -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 adduser -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 ar -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 arch -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 arp -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 arping -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 ash -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">awk</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 b2sum -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 base32 -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 base64 -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">basename</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 basenc -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">bc</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 bridge -<span class="token operator">></span> cni
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 bunzip2 -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 bzcat -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">cat</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 chattr -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 chcon -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">chgrp</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">chmod</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">chown</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">chroot</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 chrt -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 chvt -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">cksum</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">clear</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">cmp</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">comm</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">cp</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 cpio -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 crictl -<span class="token operator">></span> k3s
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 crond -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">crontab</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">csplit</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 ctr -<span class="token operator">></span> k3s
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">cut</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">date</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">dc</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">dd</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 deallocvt -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 delgroup -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 deluser -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 devmem -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">df</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">diff</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">dir</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">dircolors</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">dirname</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 dnsd -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 dnsdomainname -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 dos2unix -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">du</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 dumpkmap -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token builtin class-name">echo</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">egrep</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">eject</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">env</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 ether-wake -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">expand</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">expr</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 factor -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 fallocate -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token boolean">false</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 fbset -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 fdflush -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">fdformat</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">fgrep</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 flannel -<span class="token operator">></span> cni
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">fmt</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">fold</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">free</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 freeramdisk -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">fsck</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 fsfreeze -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">fuser</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 getopt -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 getty -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">grep</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">groups</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 gunzip -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">gzip</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">halt</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 hdparm -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">head</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 hexedit -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 hostid -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 host-local -<span class="token operator">></span> cni
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">hostname</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 hwclock -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 i2cdetect -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 i2cdump -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 i2cget -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 i2cset -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 i2ctransfer -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">id</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">ifconfig</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">ifdown</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">ifup</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 inetd -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 init -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 insmod -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">install</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 ipaddr -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 ipcrm -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 ipcs -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 iplink -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 ipneigh -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 iproute -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 iprule -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 iptunnel -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">join</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 k3s-agent -<span class="token operator">></span> k3s
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 k3s-certificate -<span class="token operator">></span> k3s
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 k3s-completion -<span class="token operator">></span> k3s
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 k3s-etcd-snapshot -<span class="token operator">></span> k3s
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 k3s-secrets-encrypt -<span class="token operator">></span> k3s
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 k3s-server -<span class="token operator">></span> k3s
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">kill</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">killall</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 killall5 -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 klogd -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 kubectl -<span class="token operator">></span> k3s
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 last -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">less</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">link</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 linux32 -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 linux64 -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 linuxrc -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">ln</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 loadfont -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 loadkmap -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 logger -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 login -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">logname</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 loopback -<span class="token operator">></span> cni
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">ls</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 lsattr -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 lsmod -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">lsof</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 lspci -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 lsscsi -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 lsusb -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 lzcat -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 lzma -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 lzopcat -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 makedevs -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 md5sum -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 mdev -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 mesg -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 microcom -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 mim -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">mkdir</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 mkdosfs -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">mke2fs</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">mkfifo</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">mknod</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 mkpasswd -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 mktemp -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">more</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 mountpoint -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 mt -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">mv</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 nameif -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">netstat</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">nice</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">nl</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">nohup</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 nologin -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 nproc -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">nslookup</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 nuke -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 numfmt -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 od -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 openvt -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 partprobe -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">passwd</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">paste</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 patch -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">pathchk</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 pidof -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">ping</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 pinky -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 pipe_progress -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 pivot_root -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">3</span> Nov  <span class="token number">8</span> 05:23 portmap -<span class="token operator">></span> cni
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 poweroff -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">pr</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">printenv</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token builtin class-name">printf</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">ps</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 ptx -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token builtin class-name">pwd</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 rdate -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 readlink -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 realpath -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">reboot</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 reset -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 resize -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 resume -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">rm</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">rmdir</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 rmmod -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 route -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 runcon -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 run-init -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 runlevel -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 run-parts -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">sed</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">seq</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 setarch -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 setconsole -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 setfattr -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 setkeycodes -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 setlogcons -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 setpriv -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 setserial -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">sh</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 sha1sum -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 sha224sum -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 sha256sum -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 sha384sum -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 sha3sum -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 sha512sum -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 shred -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">shuf</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">sleep</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">sort</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">split</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 start-stop-daemon -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">stat</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 strings -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 stty -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">su</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 sulogin -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">sum</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 svc -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 svok -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 switch_root -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">sync</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">sysctl</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 syslogd -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">tac</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">tail</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">tar</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">tee</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 telnet -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token builtin class-name">test</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 tftp -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">time</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">timeout</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">top</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">touch</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">tr</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">traceroute</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token boolean">true</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 truncate -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 ts -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">tsort</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">tty</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 ubirename -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 udhcpc -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 uevent -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">umount</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">uname</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">unexpand</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">uniq</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 unix2dos -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 unlink -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 unlzma -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 unlzop -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">4</span> Nov  <span class="token number">8</span> 05:23 unpigz -<span class="token operator">></span> pigz
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 unxz -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">unzip</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">uptime</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">users</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 usleep -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">uudecode</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">uuencode</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 vconfig -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">vdir</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">vi</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 vlock -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 w -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">watch</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 watchdog -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">wc</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">wget</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">which</span> -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">who</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">whoami</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 xxd -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 xz -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 xzcat -<span class="token operator">></span> busybox
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">9</span> Nov  <span class="token number">8</span> 05:23 <span class="token function">yes</span> -<span class="token operator">></span> coreutils
lrwxrwxrwx <span class="token number">1</span> root root         <span class="token number">7</span> Nov  <span class="token number">8</span> 05:23 zcat -<span class="token operator">></span> busybox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h2 id="cloudrootfs" tabindex="-1"><a class="header-anchor" href="#cloudrootfs" aria-hidden="true">#</a> CloudRootfs</h2>
<h3 id="我怎样才能得到-cloudrootfs" tabindex="-1"><a class="header-anchor" href="#我怎样才能得到-cloudrootfs" aria-hidden="true">#</a> 我怎样才能得到 CloudRootfs</h3>
<ol>
<li>拉一个BaseImage<code v-pre>sealer pull kubernetes:v1.19.8-alpine</code></li>
<li>查看镜像层信息<code v-pre>sealer inspect kubernetes:v1.19.8-alpine</code></li>
<li>进入BaseImage层<code v-pre>ls /var/lib/sealer/data/overlay2/{layer-id}</code></li>
</ol>
<p>您会找到 CloudRootfs 层。</p>
<div class="custom-container warning"><p class="custom-container-title">overlay2</p>
<p>在 docker 中或许能经常看见它，在 CloudRootfs 我又遇见了ta</p>
<p>docker作为一个容器平台，它有一套自己的存储系统。它支持的driver有overlay,overlay2, aufs等等。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/var/lib/docker<span class="token comment"># ls</span>
buildkit  containers  image  network  overlay2  plugins  runtimes  swarm  tmp  trust  volumes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我们需要学会ta，因为这个也和 镜像的 构建 息息相关~</p>
</div>
<details class="custom-container details"><summary>💡简单的一个案例如下</summary>
<p>启动docker，删除本地所有的镜像。进入 <code v-pre>/var/lib/docker/overlay</code> 目录，可以看到此时这个目录下面什么都没有，是空的。</p>
<p><em>dockerfile：</em></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[root@iZbp1evo5cnwagauz3w188Z tmp]# ls; cat >> Dockerfile &lt;&lt;-EOF
FROM ubuntu
COPY aa /
COPY bb /
COPY cc /
EOF
aa  bb  cc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译：</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code>docker build -t aabbcc .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221125191615259.png" alt="image-20221125191615259"></p>
<p>上面的一系列操作制作了一个名字为aabbcc的image。此时可以在/var/lib/docker/overlay 下面观察到新的层已经生成了。这里每copy一个文件就会生成新的一层。</p>
<p>观察一下/var/lib/docker/overlay/目录。aa文件出现了三次，bb文件出现了两次，cc文件只出现了一次，这也与我们拷贝它们的顺序相吻合。</p>
<p>层级结构一目了然。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z tmp<span class="token punctuation">]</span><span class="token comment"># ls cfd414e52a3b25dade86fb2333d5cd84bb0632e55872914e42c0510cf7c211ea/root/</span>
aa  bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z tmp<span class="token punctuation">]</span><span class="token comment">#  ls 5b42d020f1bc93d2643e67c6fe7d86f3a20efd80767bf505853dd743d8b51a31/root/</span>
aa  bb  bin  boot  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z tmp<span class="token punctuation">]</span><span class="token comment">#  ls 00e5e192b42ad8923eda7d43016c56864fdb0c22c239cb141140c9959d138400/root/</span>
aa  bb  bin  boot  cc  dev  etc  home  lib  lib64  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里aa实际上是通过硬链接的方式链到不同的层里的。下面，我们尝试使用aabbcc运行一个容器。从中我们可以观察到，多出了一个aa文件，这实际上就是容器真正运行的<code v-pre>rootfs(bfa602b98523bcc9d311e39729f1b4fd8a5046d5856b3d153886a67373a0f9f9/merged)</code>。</p>
<p>通过mount指令，我们可以观察到内核将镜像和upper挂载到了指定的rootfs中了。</p>
<p>总结一下，overlay 对于每一层都会构筑一个完整的镜像，镜像和镜像之间通过硬链接共享文件。当启动一个容器时，内核会union mount这个容器所使用的镜像所对应的layer(lowerdir)和一个读写层(upperdir)，并且lowerdir只有一层。</p>
<p><strong>overlay2:</strong></p>
<p>用同样的<code v-pre>Dockerfile</code>构建一个叫<code v-pre>aabbcc</code>的<code v-pre>image</code>，观察<code v-pre>/var/lib/docker/overlay2</code>下面的文件，我们可以看到各个文件只有一个。</p>
</details>
<h3 id="overlay-overlay2" tabindex="-1"><a class="header-anchor" href="#overlay-overlay2" aria-hidden="true">#</a> overlay &amp;&amp; overlay2</h3>
<div class="custom-container warning"><p class="custom-container-title">总结</p>
<p>overlay实际上通过硬链接在层和层之间共享文件，而 <code v-pre>overlay2</code> 的每一层都是完全独立的。如果容器启动的话，它会将多层<code v-pre>lowerdir</code> 挂载到它的<code v-pre>rootfs</code>。</p>
<p>这种设计就会带来一个问题，那就是linux系统会限制系统中硬链接的数量，如果用户下载了很多容器，那么<code v-pre>docker</code>就会在系统中到处创建硬链接，达到最大值后将无法创建新容器。</p>
<p>因此，我们应该使用<code v-pre>overlay2</code>作为<code v-pre>docker</code>的 graph driver 而不是overlay</p>
</div>
<h3 id="构建自己的-cloudrootfs" tabindex="-1"><a class="header-anchor" href="#构建自己的-cloudrootfs" aria-hidden="true">#</a> 构建自己的 CloudRootfs</h3>
<p>您可以根据需要编辑 CloudRootfs 中的任何文件，例如您想要定义自己的 docker daemon.json，只需编辑它并构建一个新的 CloudImage。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>FROM scratch
COPY <span class="token builtin class-name">.</span> <span class="token builtin class-name">.</span>
sealer build <span class="token parameter variable">-t</span> user-defined-kubernetes:v1.19.8 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后您可以将此图像用作 BaseImage。</p>
<h2 id="卸载" tabindex="-1"><a class="header-anchor" href="#卸载" aria-hidden="true">#</a> 卸载</h2>
<h3 id="k0s" tabindex="-1"><a class="header-anchor" href="#k0s" aria-hidden="true">#</a> k0s</h3>
<p>要卸载k0s，您需要执行以下步骤：</p>
<ol>
<li>进入k0s的安装目录，通常为 <code v-pre>/usr/local/k0s</code> ，执行以下命令来停止k0s服务：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Copy code
./k0s-stop.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>执行以下命令来删除k0s安装目录及其相关文件：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Copy code
rm -rf /usr/local/k0s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>执行以下命令来删除k0s所安装的系统服务：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Copy coderm /etc/systemd/system/k0s.service
systemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>执行以下命令来删除k0s相关的用户和组：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Copy codeuserdel -r k0s
groupdel k0s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>执行上述步骤后，k0s就已经被卸载完成了。如果您还有其他问题，可以参考k0s的文档或者提交问题到k0s的官方论坛。</p>
<h3 id="k3s" tabindex="-1"><a class="header-anchor" href="#k3s" aria-hidden="true">#</a> k3s</h3>
<p>要卸载k3s，您需要执行以下步骤：</p>
<ol>
<li>使用<code v-pre>k3s-killall.sh</code>脚本停止k3s服务。这个脚本可以在k3s安装目录下找到，通常是<code v-pre>/usr/local/bin</code>。当然你也可以找到删除脚本直接删除即可。</li>
<li>删除k3s相关的所有文件和目录。这些文件包括安装目录下的所有文件，以及<code v-pre>/etc/rancher/k3s</code>目录。</li>
<li>删除k3s相关的系统服务。要删除这些服务，您可以使用以下命令：</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Copy codesystemctl disable k3s
systemctl stop k3s
<span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/systemd
/system/k3s.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些步骤应该可以帮助您完成k3s的卸载。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '4.md' style='float:left'>⬆️上一节🔗  </a><a href = '6.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://cubxxw.com/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


