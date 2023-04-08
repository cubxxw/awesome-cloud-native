<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第29节-cloudnative-kubernetes-学习资源整理" tabindex="-1"><a class="header-anchor" href="#第29节-cloudnative-kubernetes-学习资源整理" aria-hidden="true">#</a> 第29节 CloudNative / Kubernetes 学习资源整理</h1>
<div><a href = '28.md' style='float:left'>⬆️上一节🔗  </a><a href = '30.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>我们需要对 kubernetes 进一步的学习和深造，看源码是必须的道路。</p>
<p>与其重要的，是对 kubernetes 资源的收集。</p>
<p><em><strong>⚠️ 所有资源均是采用外链连接，书本资源或不放连接，其他均为自己感受和总结。如有侵权请联系删除。</strong></em></p>
</div>
<p>⚠️ **注意，这篇文章将永久保存在 notion，将会不断地更新下去，提供了可写通道，如果你有更好的资源，欢迎补充在notion上，地址是：<a href="https://nsddd.notion.site/CloudNative-2f278e98ed274999829333272415c72d" target="_blank" rel="noopener noreferrer">https://nsddd.notion.site/CloudNative-2f278e98ed274999829333272415c72d<ExternalLinkIcon/></a> **</p>
<p><strong>关于kubernetes：</strong></p>
<ul>
<li><a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kubernetes" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/kubernetes" target="_blank" rel="noopener noreferrer">cubxxw - pr<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernauts/Kubernetes-Learning-Resources" target="_blank" rel="noopener noreferrer">社区维护的 kubernetes 学习资源合集<ExternalLinkIcon/></a></li>
<li><a href="https://blog.opskumu.com/borg.html" target="_blank" rel="noopener noreferrer">Kubernetes源码必读的 Google 大规模集群管理器 Borg<ExternalLinkIcon/></a></li>
<li><a href="https://www.cnblogs.com/sunsky303/p/14371768.html" target="_blank" rel="noopener noreferrer">etcd：从应用场景到实现原理的全方位解读<ExternalLinkIcon/></a> 和 <a href="https://blog.51cto.com/nileader/1040007" target="_blank" rel="noopener noreferrer">ZooKeeper典型应用场景一览<ExternalLinkIcon/></a></li>
</ul>
<p>**关于 CNCF 的贡献，你需要签署 CLA **</p>
<ul>
<li>
<p><a href="https://github.com/kubernetes/community/blob/master/CLA.md" target="_blank" rel="noopener noreferrer">Kubernetes CLA  的签署流程<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/kubernetes/community/tree/master/contributors/devel" target="_blank" rel="noopener noreferrer">官方开发者向导 markdown 文件<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://github.com/kubernetes/community/blob/master/contributors/guide/owners.md" target="_blank" rel="noopener noreferrer">Kubernetes ownes 所有者md介绍<ExternalLinkIcon/></a></p>
</li>
</ul>
<p><strong>自己写作的一些资源：</strong></p>
<ul>
<li><a href="https://docker.nsddd.top/" target="_blank" rel="noopener noreferrer">云原生学习<ExternalLinkIcon/></a></li>
<li><a href="https://go.nsddd.top/" target="_blank" rel="noopener noreferrer">golang 学习<ExternalLinkIcon/></a></li>
</ul>
<blockquote>
<p>都收纳到 awesome 仓库中，覆盖 📚 菜鸟成长手册🚀 CS系列 、云原生系列、区块链系列、web3系列🔥、Golang系列💡...... 访问 GitHub👀 https://github.com/cubxxw/awesome-cs-cloudnative-blockchain</p>
</blockquote>
<h2 id="最好需要什么" tabindex="-1"><a class="header-anchor" href="#最好需要什么" aria-hidden="true">#</a> 最好需要什么</h2>
<ol>
<li>如果说第一步的话，那必须要了解 docker 容器底层原理和 Linux 内核基础相关。</li>
<li>先理解理解完架构了，读起来就比较快了。</li>
<li>学会使用它，不会使用，永远无法理解它的设计理念。</li>
<li>读源码还得带着问题去读，不然会很枯燥。一定要带着问题去读，不然就会很枯燥，然后陷入细节中去</li>
<li>读源码还得有一定积累量，比如你已经读过很多基础包的源码比如 net/http grpc-go 等等</li>
<li>要尝试着调试，要尝试着练习，要尝试着理解和分析产品理念，更要学会自己设计。</li>
</ol>
<h2 id="基础知识" tabindex="-1"><a class="header-anchor" href="#基础知识" aria-hidden="true">#</a> 基础知识</h2>
<p><strong>基础概念：</strong></p>
<p>我们需要知道 kubernetes 的基础概念，我们或许在前面有讲解过。</p>
<p>比如 Build-in 的 API Groups 和 API Objects 有什么，做什么用；</p>
<p><strong>有一些很重要的工具库：</strong>
如 <strong>gengo</strong> ，包括 informer 机制；</p>
<ul>
<li>Cobra：命令行阿，docker、Kubernetes、sealos、sealer、ks 都具备的~</li>
<li><a href="https://github.com/emicklei/go-restful" target="_blank" rel="noopener noreferrer">go-restful<ExternalLinkIcon/></a>：REST 要求开发人员以与协议定义一致的方式显式使用 HTTP 方法。这个基本的 REST 设计原则在创建、读取、更新和删除 (CRUD) 操作和 HTTP 方法之间建立了一对一的映射。</li>
<li>etcd：和 fabric 一样采用 raft 共识机制的数据库，在 k3s 中很深的讲解和应用。</li>
</ul>
<p><strong>Restful 基础：</strong></p>
<p>简单了解 Restful 概念，如果做过 Restful Service 那么最好了</p>
<p><strong>熟悉一些常见的设计模式：</strong></p>
<ul>
<li>参考：https://www.yuque.com/aceld/lfhu8y/rg6nsf</li>
</ul>
<p><strong>熟悉常用的算法，熟悉操作系统（尤其是 Linux 的基础知识），熟悉网络的一些协议和原理。</strong></p>
<blockquote>
<p>Kubernetes 有很多复杂的地方，尤其是网络和存储，希望以后可以成为 ×</p>
</blockquote>
<h2 id="阅读方法-其他开源项目类似" tabindex="-1"><a class="header-anchor" href="#阅读方法-其他开源项目类似" aria-hidden="true">#</a> 阅读方法（其他开源项目类似）</h2>
<ul>
<li>先整体，后局部（不钻牛角尖）</li>
<li>深入局部中的学习中去</li>
<li>耐心，多看代码~</li>
</ul>
<h2 id="学习方法" tabindex="-1"><a class="header-anchor" href="#学习方法" aria-hidden="true">#</a> 学习方法</h2>
<blockquote>
<p>参考2022GSoC 谷歌开源之夏活动，对于学院的解答。</p>
<p>我是opensuse组织的GSoC'22贡献者，我想知道我可以如何学习和贡献k8s社区。我知道k8s的基础知识，但现在我想学习一些中级和高级概念，以便我可以在未来为k8s做出贡献。非常需要帮助</p>
</blockquote>
<ol>
<li>Start learning each part of k8s.</li>
<li>For example, start with Scheduler part.</li>
<li>Go to k8s github and look into the code https://github.com/kubernetes/kubernetes</li>
<li>It will be the best place to start</li>
<li>Read about scheduler and find described logic in the source code.</li>
<li>But first i think that you need to learn how each part is communicating and for what it is responsible.</li>
<li>It is great that you wish to contribute.</li>
<li>after that, learn everything about different Workloads (StatefulSet, ReplicaSet, DaemonSet etc.)</li>
<li>then services and ingress</li>
<li>then pv/pvc</li>
<li>then go deeper and learn about Container Runtime Interface (CRI)</li>
<li>and about Network Interface (CNI)</li>
<li>and how they are communicating</li>
<li>between themselves and with the host machine</li>
<li>i guess that should give you a good grasp of how everything is working internally</li>
<li>you can always check kubernetes api specification if you are looking for something what you have not learned yet</li>
</ol>
<h3 id="阶段型方法" tabindex="-1"><a class="header-anchor" href="#阶段型方法" aria-hidden="true">#</a> 阶段型方法</h3>
<ol>
<li><strong>第一阶段</strong> 先了解k8s，是什么，能做什么，架构，核心资源对象，设计理念，发展历程等等</li>
<li><strong>第二阶段</strong> 开始使用k8s, 自己创建pod, deploy, job等资源。能够基于k8s开发一下组件，比如实现一个controller监听pod的创建删除等。【看山是山】</li>
<li><strong>第三阶段</strong> 开始阅读源码，了解底层实现。这个过程会对k8s有一个更深的理解。比如创建一个pod的完成历程是什么样的，k8s gc 机制到底是怎么实现的。namespaces删除的时候怎么做到删除所有资源后在删除的。【看山不是山】 这里推荐源码阅读方式：理论+实践结合。
<ol>
<li>理论：通过 ide 之间各种跳转阅读源码</li>
<li>实践：自己动手在[关键代码]处增加日志，通过查看日志输出理解源码 （repo也介绍了如何二进制搭建一套K8s集群）</li>
</ol>
</li>
<li><strong>第四阶段</strong> 再排查问题中进一步深入k8s的理解</li>
</ol>
<h2 id="书籍推荐" tabindex="-1"><a class="header-anchor" href="#书籍推荐" aria-hidden="true">#</a> 书籍推荐</h2>
<ul>
<li>Go语言程序设计语言 （买了，建议有一些其他语言基础 &amp;&amp; Go语言基础再看最好）</li>
<li>深入解刨 Kubernetes （这个我也买了，emmm，特别完美的一本书，作者有自己的讲解，是个大佬）</li>
<li>kubernetes 编程</li>
<li>kubernetes 源码刨析（这个我买了！！！！！！，不推荐，copy 多干货少）</li>
<li>第一本 docker 书</li>
<li>深入理解计算机系统 / 现代操作系统</li>
<li>docker 容器与容器云 （还没开始看）</li>
<li>Kubernetes 权威指南（熟练使用、贯穿场景）</li>
<li>docker 开发指南 （还没开始看）</li>
<li><a href="https://golang.coding3min.com/" target="_blank" rel="noopener noreferrer">Go语言精进之路<ExternalLinkIcon/></a></li>
<li>Istio （服务网格 推荐 https://academy.tetrate.io/courses/take/istio-fundamentals-zh/lessons/26470007-1-0）</li>
<li><a href="https://lib.jimmysong.io/what-is-ebpf/" target="_blank" rel="noopener noreferrer">eBPF<ExternalLinkIcon/></a></li>
<li><a href="https://lib.jimmysong.io/kubernetes-hardening-guidance/" target="_blank" rel="noopener noreferrer">Kubernetes 加固指南<ExternalLinkIcon/></a></li>
<li><a href="https://lib.jimmysong.io/cloud-native-infra/" target="_blank" rel="noopener noreferrer">云原生基础架构<ExternalLinkIcon/></a></li>
<li><a href="https://lib.jimmysong.io/kubernetes-handbook/" target="_blank" rel="noopener noreferrer">Kubernetes 基础教程<ExternalLinkIcon/></a></li>
<li><a href="https://lib.jimmysong.io/migrating-to-cloud-native-application-architectures/the-rise-of-cloud-native/" target="_blank" rel="noopener noreferrer">迁移到云原生应用程序<ExternalLinkIcon/></a></li>
<li><a href="https://jimmysong.io/kubernetes-handbook/" target="_blank" rel="noopener noreferrer">Kubernetes 中文指南/云原生应用架构实战手册<ExternalLinkIcon/></a></li>
</ul>
<h2 id="视频资源" tabindex="-1"><a class="header-anchor" href="#视频资源" aria-hidden="true">#</a> 视频资源</h2>
<ul>
<li>
<p><a href="https://space.bilibili.com/1748865719?share_from=space&amp;share_medium=iphone&amp;share_plat=ios&amp;share_session_id=160FA9F0-624A-411F-AD29-CE83BBBA3D35&amp;share_source=WEIXIN&amp;share_tag=s_i&amp;timestamp=1669727398&amp;unique_k=ulDpC8O" target="_blank" rel="noopener noreferrer">张海龙 kubernetes 开发之旅<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://search.bilibili.com/all?keyword=client-go&amp;from_source=webtop_search&amp;spm_id_from=333.999&amp;search_source=5" target="_blank" rel="noopener noreferrer">bilibili 搜索 client-go kubernetes必会<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://space.bilibili.com/547971176?share_from=space&amp;share_medium=iphone&amp;share_plat=ios&amp;share_session_id=DE3B8DC0-6E79-4FCC-A128-21D5FB84D251&amp;share_source=WEIXIN&amp;share_tag=s_i&amp;timestamp=1669727447&amp;unique_k=TjDCl4U" target="_blank" rel="noopener noreferrer">插座煤电 深入理解 k8s 网络<ExternalLinkIcon/></a></p>
</li>
<li>
<p>极客时间 云原生 训练营课程（十五节）</p>
</li>
</ul>
<h2 id="网站资源" tabindex="-1"><a class="header-anchor" href="#网站资源" aria-hidden="true">#</a> 网站资源</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/s/K6ynL_9nSTLCTy0_2xCobg" target="_blank" rel="noopener noreferrer">从 0 实现一个 k8s 的 CNI 网络插件<ExternalLinkIcon/></a></li>
<li><a href="https://cloud.redhat.com/blog/kubernetes-deep-dive-code-generation-customresources" target="_blank" rel="noopener noreferrer">Kubernetes Deep Dive：CustomResources 的代码生成<ExternalLinkIcon/></a></li>
</ul>
<h2 id="推荐书籍" tabindex="-1"><a class="header-anchor" href="#推荐书籍" aria-hidden="true">#</a> 推荐书籍</h2>
<ul>
<li><a href="">深入剖析kubernetes</a></li>
<li>Kubernetes 源码解析</li>
</ul>
<h2 id="youtube-精选视频" tabindex="-1"><a class="header-anchor" href="#youtube-精选视频" aria-hidden="true">#</a> youtube 精选视频</h2>
<ul>
<li>
<p><a href="https://www.youtube.com/watch?v=Q91iZywBzew" target="_blank" rel="noopener noreferrer">教程：从源代码构建和运行 Kubernetes 并提交您的第一个 PR<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.youtube.com/watch?v=Jbm0W9Dd4k4" target="_blank" rel="noopener noreferrer">Kubernetes源码解读: APIServer之server chain by Daniel Guo<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.youtube.com/watch?v=ytbEmcxM4yQ" target="_blank" rel="noopener noreferrer">如何理解开源中的大型代码库<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.youtube.com/watch?v=kA1T0zDPtQo" target="_blank" rel="noopener noreferrer">如何理解开源中的大型代码库？<ExternalLinkIcon/></a></p>
</li>
<li>
<p><a href="https://www.youtube.com/watch?v=toIncOqOBTA" target="_blank" rel="noopener noreferrer">Kubernetes 源码阅读<ExternalLinkIcon/></a></p>
</li>
</ul>
<h2 id="github-精选仓库" tabindex="-1"><a class="header-anchor" href="#github-精选仓库" aria-hidden="true">#</a> GitHub 精选仓库</h2>
<ul>
<li><a href="https://github.com/JackyZhangFuDan/K8sSourceCodeDeepDive/" target="_blank" rel="noopener noreferrer">go 开发之旅<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/derekguo001/understanding-kubernetes" target="_blank" rel="noopener noreferrer">kubernetes 源码解读<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/dtsola/best-practices-for-cloud-native" target="_blank" rel="noopener noreferrer">云原生（Cloud Native）、容器化（Docker）、容器编排（k8s）、服务网格（Istio）、无服务器（Serverless）、微服务、CI/CD、DevOps相关内容总结。<ExternalLinkIcon/></a></li>
<li><a href="https://jimmysong.io/kubernetes-handbook/" target="_blank" rel="noopener noreferrer">Kubernetes 中文指南/云原生应用架构实战手册<ExternalLinkIcon/></a></li>
</ul>
<h2 id="数据统计和收集" tabindex="-1"><a class="header-anchor" href="#数据统计和收集" aria-hidden="true">#</a> 数据统计和收集</h2>
<h3 id="cncf-数据" tabindex="-1"><a class="header-anchor" href="#cncf-数据" aria-hidden="true">#</a> CNCF 数据</h3>
<ul>
<li>
<p>网站：<a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer">kubernetes.io<ExternalLinkIcon/></a></p>
</li>
<li>
<p>资料库：<a href="https://github.com/kubernetes/kubernetes" target="_blank" rel="noopener noreferrer">github.com/kubernetes/kubernetes<ExternalLinkIcon/></a> 94,767</p>
</li>
<li>
<p>Crunchbase：<a href="https://www.crunchbase.com/organization/cloud-native-computing-foundation" target="_blank" rel="noopener noreferrer">crunchbase.com/organization/cloud-native-computing-foundation<ExternalLinkIcon/></a></p>
</li>
<li>
<p>领英：<a href="https://www.linkedin.com/company/cloud-native-computing-foundation" target="_blank" rel="noopener noreferrer">linkedin.com/company/cloud-native-computing-foundation<ExternalLinkIcon/></a></p>
</li>
<li>
<p>推特：<a href="https://twitter.com/kubernetesio" target="_blank" rel="noopener noreferrer">@kubernetesio<ExternalLinkIcon/></a></p>
</li>
<li>
<p>第一次提交：<a href="https://github.com/kubernetes/kubernetes/commit/2c4b3a562ce34cddc3f8218a2c4d11c7310e6d56%22" target="_blank" rel="noopener noreferrer">9年前<ExternalLinkIcon/></a></p>
</li>
<li>
<p>贡献者：<a href="https://github.com/kubernetes/kubernetes/graphs/contributors" target="_blank" rel="noopener noreferrer">500+<ExternalLinkIcon/></a></p>
</li>
<li>
<p>最新推文：<a href="https://twitter.com/kubernetesio" target="_blank" rel="noopener noreferrer">2个月前<ExternalLinkIcon/></a></p>
</li>
<li>
<p>公认: 2016-03-10</p>
</li>
<li>
<p>已毕业：2018-03-06</p>
</li>
<li>
<p>总部：<a href="https://landscape.cncf.io/?grouping=headquarters&amp;headquarters=san-francisco-california" target="_blank" rel="noopener noreferrer">加利福尼亚州旧金山<ExternalLinkIcon/></a></p>
</li>
<li>
<p>孵化：7 年前</p>
</li>
<li>
<p>开发统计：<a href="https://k8s.devstats.cncf.io/" target="_blank" rel="noopener noreferrer">https://k8s.devstats.cncf.io/<ExternalLinkIcon/></a></p>
</li>
<li>
<p>艺术品： <a href="https://github.com/cncf/artwork/blob/master/examples/graduated.md#kubernetes-logos" target="_blank" rel="noopener noreferrer">https://github.com/cncf/artwork/blob/master/examples/graduated.md#kubernetes-logos<ExternalLinkIcon/></a></p>
</li>
<li>
<p>stackoverflow：<a href="https://stackoverflow.com/questions/tagged/kubernetes" target="_blank" rel="noopener noreferrer">https://stackoverflow.com/questions/tagged/kubernetes<ExternalLinkIcon/></a></p>
</li>
<li>
<p>博客：<a href="http://blog.kubernetes.io/" target="_blank" rel="noopener noreferrer">http://blog.kubernetes.io/<ExternalLinkIcon/></a></p>
</li>
<li>
<p>邮件列表：<a href="https://groups.google.com/forum/#!forum/kubernetes-dev" target="_blank" rel="noopener noreferrer">https://groups.google.com/forum/#!forum/kubernetes-dev<ExternalLinkIcon/></a></p>
</li>
<li>
<p>slack：<a href="http://slack.k8s.io/" target="_blank" rel="noopener noreferrer">http://slack.k8s.io/<ExternalLinkIcon/></a></p>
</li>
<li>
<p>YouTube： <a href="https://www.youtube.com/channel/UCZ2bu0qutTOM0tHYa_jkIwg" target="_blank" rel="noopener noreferrer">https://www.youtube.com/channel/UCZ2bu0qutTOM0tHYa_jkIwg<ExternalLinkIcon/></a></p>
</li>
</ul>
<h3 id="源码统计" tabindex="-1"><a class="header-anchor" href="#源码统计" aria-hidden="true">#</a> 源码统计</h3>
<p><code v-pre>Kubernetes</code> 代码特别庞大，使用 cloc 统计 <strong>（⏱️ 2023-03-17）</strong>：</p>
<p><img src="http://sm.nsddd.top/sm202303172221221.png" alt="image-20230317222140890"></p>
<h3 id="其他源码统计" tabindex="-1"><a class="header-anchor" href="#其他源码统计" aria-hidden="true">#</a> 其他源码统计</h3>
<p><strong>⚠️ 数据截止到 2023 年 3 月 17 日</strong></p>
<ul>
<li>Istio :  SUN：514910 （GO：339739）</li>
<li>Kind : 21060</li>
<li>Minikube:  178446</li>
<li>sealos: 116277</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '28.md' style='float:left'>⬆️上一节🔗  </a><a href = '30.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


