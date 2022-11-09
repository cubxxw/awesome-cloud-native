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
<p>docker~ run cmd</p>
<p>init</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>进展</p>
</div>
<h2 id="clusterlmage" tabindex="-1"><a class="header-anchor" href="#clusterlmage" aria-hidden="true">#</a> Clusterlmage</h2>
<ul>
<li>Bin 文件，如 docker、containerd、crictl、kubeadm、kubectl...</li>
<li>配置文件，如 kubelet systemd config、docker systemd config、docker daemon.json...</li>
<li>注册表泊坞窗图像。</li>
<li>一些元数据，例如 Kubernetes 版本。</li>
<li>注册表文件，包含所有的docker镜像，比如kubernetes核心组件docker镜像...</li>
<li>脚本，一些用于安装 docker 和 kubelet 的 shell 脚本... sealer 将调用 init.sh 和 clean.sh。</li>
<li>其他静态文件</li>
</ul>
<h2 id="问题描述" tabindex="-1"><a class="header-anchor" href="#问题描述" aria-hidden="true">#</a> 问题描述</h2>
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
<li>ChooseClusterRuntime()：使用Metadata来区分集群Runtime，需要添加一个字段来区分k0s、k3s、k8s</li>
</ul>
<h3 id="附加上下文" tabindex="-1"><a class="header-anchor" href="#附加上下文" aria-hidden="true">#</a> 附加上下文</h3>
<p>在此处添加有关功能请求的任何其他上下文或屏幕截图。</p>
<p>sealos 主议题</p>
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
<p>策划文档</p>
<ul>
<li>https://www.yuque.com/zhouxinyuan-6woia/nodno9/iswdqd</li>
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
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
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


