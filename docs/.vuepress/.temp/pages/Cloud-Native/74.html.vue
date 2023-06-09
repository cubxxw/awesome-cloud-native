<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第74节-kubecub-readme" tabindex="-1"><a class="header-anchor" href="#第74节-kubecub-readme" aria-hidden="true">#</a> 第74节 kubecub README</h1>
<div><a href = '73.md' style='float:left'>⬆️上一节🔗  </a><a href = '75.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h1 id="什么是-kubecub" tabindex="-1"><a class="header-anchor" href="#什么是-kubecub" aria-hidden="true">#</a> 什么是 kubecub ？</h1>
<p>kubecub 是一种基于 Kubernetes 的开源生态项目，提供了链的能力，将所有的开源生态整合起来，形成了一种可参考和可复现的体系与规范。它不仅包括基于 Kubernetes 的分布式应用，还包括开源工具的开发、整理，以及基于 kubecub 的所有开源项目的管理和规范设计。</p>
<h2 id="为什么创建-kubecub" tabindex="-1"><a class="header-anchor" href="#为什么创建-kubecub" aria-hidden="true">#</a> 为什么创建 kubecub</h2>
<p>和其他的开源社区不一样，kubecub 并非是 kubecub 的某一个产品，或者就叫 kubecub 的仓库，它的功能远不止如此，听我慢慢道来……</p>
<p><strong>为什么叫做 kubecub？</strong></p>
<blockquote>
<p>🔥 kubecub provides the capability of k8s chains.</p>
</blockquote>
<p>我认为 kubecub 为 Kubernetes 提供了链的能力，什么是链的能力？</p>
<p>在 Kubernetes 发展迅速的同时，在 cncf 基金会的引导下，云原生整个领域蓬勃发展，整个云原生中的工具数不胜数，带动了整个开源届的发展和繁荣，kubecub 应运而生~</p>
<p>kubecub 就如同 区块链这个超级账本将所有的区块打包记录起来一样，kubecub 将所有的 开源生态都 <strong>链起来</strong> 了，形成了一种可参考和可复现的体系与规范。</p>
<p>包括但不仅仅是：</p>
<ul>
<li>基于 Kubernetes 的分布式应用，Kubernetes 现有的解决方案整合。</li>
<li>开源工具的开发，整理。</li>
<li>基于 kubecub 的所有开源项目的管理和规范设计。</li>
</ul>
<h2 id="当下开源社区存在的问题" tabindex="-1"><a class="header-anchor" href="#当下开源社区存在的问题" aria-hidden="true">#</a> 当下开源社区存在的问题</h2>
<p>我们知道任何一个顶级的开源项目都离不开一个顶级的运营模式，包括 Kubernetes 来说也是这样，对于 Kubernetes 来说，管理运营和开发是互不干涉的，这也是为什么 Kubernetes 社区至今仍然是整个开源界的霸主。</p>
<p>但是并非是 所有的 项目都有去 运营 和 自动化管理的成本和精力，所以导致很多社区缺乏甚至是很少有成熟的自动化 和 CICD 以及体系的社区规范。</p>
<p>Kubecub 杂糅了 各种 DevOps 的手段，使用  robot 和 actions 融合的手段去管理自动化和社区部分运营工作。</p>
<h2 id="哪些人可以参与-kubecub" tabindex="-1"><a class="header-anchor" href="#哪些人可以参与-kubecub" aria-hidden="true">#</a> 哪些人可以参与 kubecub ?</h2>
<p>kubecub 没有门槛！</p>
<p>kubecub 不需要钱 ！</p>
<p>kubecub 也没有任何约束 ！</p>
<p>你可以自己提一个创意并且实现它，你可以根据现有的 projects 中的提案去实现它，你也可以参与任何一个仓库，去提出或者解决 feature、bug….</p>
<p>甚至，你可以什么都不用干 ~ 随便进入一个 项目的 pull requests 中，看到哪段代码不舒服吐槽两句~</p>
<h2 id="从哪里开始" tabindex="-1"><a class="header-anchor" href="#从哪里开始" aria-hidden="true">#</a> 从哪里开始</h2>
<p>我们有一个 https://github.com/kubecub/community 仓库，定义了社区的规范，以及各种模板。</p>
<p><img src="http://sm.nsddd.top/sm202306012140301.png" alt="yangzi"></p>
<p><strong><a href="http://0000-template.md/" target="_blank" rel="noopener noreferrer">0000-template.md<ExternalLinkIcon/></a></strong>  是模板，我们可以用这个模板，然后可以写一个 markdown 格式的 proposal 到 PRC 目录中，以 PR 的形式~ 也算是走了一遍完整的PR。并且做好了开启一个项目前的策划工作。</p>
<p>阅读我们的 <a href="https://github.com/kubecub/community/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">贡献者指南<ExternalLinkIcon/></a>，在里面，你能学习到为一个开源项目贡献代码的最佳规范和实践。</p>
<h2 id="后期方向" tabindex="-1"><a class="header-anchor" href="#后期方向" aria-hidden="true">#</a> 后期方向</h2>
<p>一个人的力量是有限的，后面的开源氛围肯定是越来越繁荣，越来越多希望加入开源的伙伴或者团队都渴望有一套现有的解决方案。</p>
<p>我们会坚持 kubecub 的运营，并且带动开源爱好者成长，交流。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '73.md' style='float:left'>⬆️上一节🔗  </a><a href = '75.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


