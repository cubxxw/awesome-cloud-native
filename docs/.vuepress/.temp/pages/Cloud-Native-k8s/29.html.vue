<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第29节-kubernetes-源码解析资源" tabindex="-1"><a class="header-anchor" href="#第29节-kubernetes-源码解析资源" aria-hidden="true">#</a> 第29节 kubernetes 源码解析资源</h1>
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
<p><strong>关于kubernetes：</strong></p>
<ul>
<li><a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/kubernetes" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/kubernetes" target="_blank" rel="noopener noreferrer">cubxxw - pr<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernauts/Kubernetes-Learning-Resources" target="_blank" rel="noopener noreferrer">社区维护的 kubernetes 学习资源合集<ExternalLinkIcon/></a></li>
</ul>
<p><strong>自己的一些资源：</strong></p>
<ul>
<li><a href="https://docker.nsddd.top/" target="_blank" rel="noopener noreferrer">云原生学习<ExternalLinkIcon/></a></li>
<li><a href="https://go.nsddd.top/" target="_blank" rel="noopener noreferrer">golang 学习<ExternalLinkIcon/></a></li>
</ul>
<h2 id="最好需要什么" tabindex="-1"><a class="header-anchor" href="#最好需要什么" aria-hidden="true">#</a> 最好需要什么</h2>
<ol>
<li>先理解理解完架构了，读起来就比较快了。</li>
<li>学会使用它，不会使用，永远无法理解它的设计理念。</li>
<li>读源码还得带着问题去读，不然会很枯燥。一定要带着问题去读，不然就会很枯燥，然后陷入细节中去</li>
<li>读源码还得有一定积累量，比如你已经读过很多基础包的源码比如 net/http grpc-go 等等</li>
<li>要尝试着调试，要尝试着练习，要尝试着理解和分析产品理念，更要学会自己设计。</li>
</ol>
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
</ul>
<h2 id="网站资源" tabindex="-1"><a class="header-anchor" href="#网站资源" aria-hidden="true">#</a> 网站资源</h2>
<ul>
<li><a href="https://mp.weixin.qq.com/s/K6ynL_9nSTLCTy0_2xCobg" target="_blank" rel="noopener noreferrer">从 0 实现一个 k8s 的 CNI 网络插件<ExternalLinkIcon/></a></li>
</ul>
<h2 id="推荐书籍" tabindex="-1"><a class="header-anchor" href="#推荐书籍" aria-hidden="true">#</a> 推荐书籍</h2>
<ul>
<li><a href="">深入剖析kubernetes</a></li>
<li>Kubernetes 源码刨析</li>
</ul>
<h2 id="youtube-精选视频" tabindex="-1"><a class="header-anchor" href="#youtube-精选视频" aria-hidden="true">#</a> youtube 精选视频</h2>
<h2 id="github-精选仓库" tabindex="-1"><a class="header-anchor" href="#github-精选仓库" aria-hidden="true">#</a> GitHub 精选仓库</h2>
<ul>
<li><a href="https://github.com/JackyZhangFuDan/K8sSourceCodeDeepDive/" target="_blank" rel="noopener noreferrer">go 开发之旅<ExternalLinkIcon/></a></li>
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


