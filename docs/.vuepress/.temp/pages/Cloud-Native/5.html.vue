<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第5节-sealer-runtime" tabindex="-1"><a class="header-anchor" href="#第5节-sealer-runtime" aria-hidden="true">#</a> 第5节 sealer runtime</h1>
<br>
<div><a href = '4.md' style='float:left'>⬆️上一节🔗  </a><a href = '6.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="注意" tabindex="-1"><a class="header-anchor" href="#注意" aria-hidden="true">#</a> 注意</h2>
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
<li>proc 是Processes(进程) 的缩写，/proc是一种伪文件系统（也即虚拟文件系统），存储的是当前内核运行状态的一系列特殊文件，这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。</li>
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
<li><strong>超级用户使用的比较高级的管理程序和系统守护程序。</strong></li>
</ul>
</li>
<li>
<p><strong>/usr/src</strong>：</p>
<ul>
<li><strong>内核源代码默认的放置目录。</strong></li>
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
<p>-<strong>/var</strong>： 这是一个非常重要的目录，系统上跑了很多程序，那么每个程序都会有相应的日志产生，而这些日志就被记录到这个目录下，具体在 <code v-pre>/var/log</code> 目录下，另外 <code v-pre>mail</code> 的预设放置也是在这里。</p>
</details>
<h2 id="离线安装" tabindex="-1"><a class="header-anchor" href="#离线安装" aria-hidden="true">#</a> 离线安装</h2>
<p>下载离线安装脚本：https://get.k3s.io</p>
<p>下载<strong>k3s</strong>二进制文件：k3s</p>
<p>下载必要的<code v-pre>images</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://ghproxy.com/https://github.com/k3s-io/k3s/releases/download/v1.25.3%2Bk3s1/k3s-airgap-images-amd64.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p><strong>These files are available in the <a href="https://github.com/k3s-io/k3s/" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a> repository</strong></p>
<p><img src="http://sm.nsddd.top/smimage-20221109164523589.png" alt="image-20221109164523589"></p>
</blockquote>
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
<p>我们在路线图中对 k8s、k0s、k3s 运行时支持的工作应该有一个进度记录，应该是让工作进度更加清晰，并吸引更多的参与者加入这个核心工作。这里简单介绍一下部分工作：
阅读 Sealer 主分支代码，理解 runtime 模块中的代码，掌握从 cmd 模块到 runtime 模块的代码调用逻辑。
通过k8s、k0s、k3s官网阅读并设计运行时接口实现方法。</p>
<p>为指定的运行时读取和设计 clusterImage。主要参考： <a href="http://sealer.cool/docs/advanced/define-cloudimage.html#customize-the-cloudrootfs" target="_blank" rel="noopener noreferrer">ClusterImage<ExternalLinkIcon/></a>、<a href="https://github.com/sealerio/basefs" target="_blank" rel="noopener noreferrer">basefs<ExternalLinkIcon/></a>。</p>
<p>类型：功能请求</p>
<ul>
<li>单结点成为高可用~</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker~ run cmd 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>init：</strong></p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>进展</p>
</div>
<h2 id="clusterlmage" tabindex="-1"><a class="header-anchor" href="#clusterlmage" aria-hidden="true">#</a> Clusterlmage</h2>
<ul>
<li>Bin 文件，如 docker、containerd、crictl、kubeadm、kubectl...</li>
<li>配置文件，如 kubelet systemd config、docker systemd config、docker daemon.json...</li>
<li>registry images。</li>
<li>一些元数据，例如 Kubernetes 版本。</li>
<li>registry file，包含所有的docker镜像，比如kubernetes核心组件docker镜像...</li>
<li>Script，一些用于安装 docker 和 kubelet 的 shell 脚本... sealer 将调用 init.sh 和 clean.sh。</li>
<li>其他静态文件</li>
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题描述" tabindex="-1"><a class="header-anchor" href="#问题描述" aria-hidden="true">#</a> 问题描述</h2>
<p>我们需要更新 k0s 运行时代码以适应新结构。
类型：功能请求</p>
<h3 id="描述你想要什么功能" tabindex="-1"><a class="header-anchor" href="#描述你想要什么功能" aria-hidden="true">#</a> 描述你想要什么功能</h3>
<h2 id="调研" tabindex="-1"><a class="header-anchor" href="#调研" aria-hidden="true">#</a> 调研</h2>
<p>首先需要调研，然后出一个设计稿，比如install模块怎么和k3s结合</p>
<p>apply会对比一下新旧集群的差别，然后再确定是否调用runtime来扩缩容集群</p>
<blockquote>
<p>目前k3s还没有实现，k0s在最新代码中还没有适配起来，上面这个文档是在0.8.6版本，也就是9月下旬发布的那个版本代码前设计的，现在的话大体思路一致，如果需要实现k3s的话，首先需要熟读k3s的官方安装文档，其次阅读sealer runtime的接口逻辑，install/scaleup等接口干些什么事儿。最后还需要看一下如何与rootfs进行交互，也就是集群镜像那个部分。如果有兴趣的话，欢迎对sealer进行贡献。k0s、k3s runtime部分的代码会是由我主要负责。</p>
<p>这个不好说，目前新架构下的cri还没有支持containerd，k0s部分修改起来很快并且已经推动了，预计1个月就可以了，可以期待sealer下个大版本的更新哦如果现在想体验k0s的话，可以切换到9月30号的那次starcomingup的提交，基于那次commit进行编译，k0s镜像的话可以体验一下</p>
<p>但是不建议上生产哦</p>
</blockquote>
<h2 id="先决条件" tabindex="-1"><a class="header-anchor" href="#先决条件" aria-hidden="true">#</a> 先决条件</h2>
<ul>
<li>容器化为基于 CRI<a href="https://github.com/YTGhost" target="_blank" rel="noopener noreferrer">@YTGhost<ExternalLinkIcon/></a>请帮我跟踪这项工作</li>
</ul>
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
<p><strong>sealos 主议题：</strong></p>
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
<p><strong>策划文档：</strong></p>
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
阅读Sealer主分支代码，理解 <code v-pre>runtime</code> 模块中的代码，掌握从cmd模块到runtime模块的代码调用逻辑。
通过k8s、k0s、k3s官网阅读并设计运行时接口实现方法。
为指定的运行时读取和设计 clusterImage。主要参考： <a href="http://sealer.cool/docs/advanced/define-cloudimage.html#customize-the-cloudrootfs" target="_blank" rel="noopener noreferrer">ClusterImage<ExternalLinkIcon/></a>、<a href="https://github.com/sealerio/basefs" target="_blank" rel="noopener noreferrer">basefs<ExternalLinkIcon/></a>。
类型：<em>功能请求</em></p>
<ul>
<li><a href="https://github.com/sealerio/sealer/pull/1686" target="_blank" rel="noopener noreferrer">k0s 跟进文档<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/sealerio/sealer/pull/1686/files" target="_blank" rel="noopener noreferrer">1686议题跟进代码<ExternalLinkIcon/></a></li>
</ul>
<h2 id="k0s-runtime-设计-readme" tabindex="-1"><a class="header-anchor" href="#k0s-runtime-设计-readme" aria-hidden="true">#</a> k0s runtime 设计 readme</h2>
<ul>
<li>https://github.com/sealerio/sealer/blob/main/pkg/runtime/k0s/README.md</li>
</ul>
<h3 id="基础文件" tabindex="-1"><a class="header-anchor" href="#基础文件" aria-hidden="true">#</a> 基础文件</h3>
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
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>COPY rootfs/* .
COPY ${ARCH} .
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h3>
<p>我们定义 k0s 运行时有 5 个阶段来安装/扩展/重置集群。</p>
<p>basefs 包含二进制、shell 脚本、配置文件和镜像。了解有关<a href="https://github.com/sealerio/basefs" target="_blank" rel="noopener noreferrer">sealerio/basefs 的更多信息<ExternalLinkIcon/></a></p>
<p><a href="https://github.com/k0sproject/k0s" target="_blank" rel="noopener noreferrer">通过执行k0s<ExternalLinkIcon/></a> 命令安装文件系统引导集群之前的运行时。</p>
<ul>
<li>init
<ul>
<li>当 sealer 导致先安装集群时，init 阶段将 rootfs/bin 复制到 <code v-pre>init.sh</code> 脚本中的 <code v-pre>/usr/bin</code></li>
<li>创建引导配置 /etc/k0s/k0s.yaml 以引导控制器初始化</li>
<li>生成 k0s 加入令牌 <code v-pre>/etc/k0s/worker-token</code> 和 /etc/k0s/controller-token，也是私有注册表证书</li>
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
<li>通过 k0s 重置以移除该集群并移除由 sealer 生成的集群的任何相关内容。</li>
</ul>
</li>
<li>Upgrade
<ul>
<li>upgrade 可以升级 k0s 集群。</li>
</ul>
</li>
</ul>
<h2 id="表格-cn" tabindex="-1"><a class="header-anchor" href="#表格-cn" aria-hidden="true">#</a> 表格（CN）</h2>
<p><img src="http://sm.nsddd.top/smimage-20221113000126421.png" alt="image-20221113000126421"></p>
<h2 id="code-runtime-module" tabindex="-1"><a class="header-anchor" href="#code-runtime-module" aria-hidden="true">#</a> code runtime module</h2>
<p><strong>util.go：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>/*
Loads the metadata file from the given rootfs.
从给定的rootfs加载元数据文件。

Args:
	rootfs: The rootfs path.

Returns:
	The metadata object.
*/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '4.md' style='float:left'>⬆️上一节🔗  </a><a href = '6.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


