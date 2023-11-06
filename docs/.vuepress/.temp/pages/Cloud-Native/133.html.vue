<template><div><h1 id="_133-openim-的集群化实施方案" tabindex="-1"><a class="header-anchor" href="#_133-openim-的集群化实施方案" aria-hidden="true">#</a> 133: OpenIM 的集群化实施方案</h1>
<p>关于 OpenIM 的集群化实施方案：</p>
<p>昨天我们基于 OpenIM 的集群化设计，做出了一些讨论，并且整个会议的视频回放，议题文章，以及总结都记录在了 <a href="https://nsddd.top/zh/posts/openim-cluster-deployment-scheme-of/" target="_blank" rel="noopener noreferrer">https://nsddd.top/zh/posts/openim-cluster-deployment-scheme-of/<ExternalLinkIcon/></a></p>
<p>然后本周，从今天，我们开始对整个集群化做出详细的实施方案：</p>
<h2 id="设置变量" tabindex="-1"><a class="header-anchor" href="#设置变量" aria-hidden="true">#</a> 设置变量</h2>
<p>通过设置 alias 来定义变量的别名：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">alias</span> <span class="token assign-left variable">ks</span><span class="token operator">=</span><span class="token string">'kubectl -n kube-system'</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">kim</span><span class="token operator">=</span><span class="token string">'kubectl -n openim'</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">k</span><span class="token operator">=</span><span class="token string">'kubectl'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="devops-基于-kubernetes-能做些什么" tabindex="-1"><a class="header-anchor" href="#devops-基于-kubernetes-能做些什么" aria-hidden="true">#</a> DevOps 基于 Kubernetes 能做些什么</h2>
<p>我们都有代码仓库，比如说 gitee，GitHub，gitlab。</p>
<p>那么对于 Github ，可以配一个 webhooks 做一个自动化的工具，去构建一个镜像。</p>
<p>CICD：云原生中所有的部署都是一些 helm ，specs 定义要部署的代码以及环境。</p>
<h2 id="镜像脚本优化" tabindex="-1"><a class="header-anchor" href="#镜像脚本优化" aria-hidden="true">#</a> 镜像脚本优化</h2>
<p>脚本支持单服务的编译、启动、杀死、以及查询</p>
<p>支持 make 构建以及推送镜像</p>
<h2 id="社区-kubernetes-的管理" tabindex="-1"><a class="header-anchor" href="#社区-kubernetes-的管理" aria-hidden="true">#</a> 社区 Kubernetes 的管理</h2>
</div></template>


