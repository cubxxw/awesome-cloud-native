<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第9节-sealer-runtime-stage-2-including-biweekly-meetings" tabindex="-1"><a class="header-anchor" href="#第9节-sealer-runtime-stage-2-including-biweekly-meetings" aria-hidden="true">#</a> 第9节 sealer runtime Stage 2 (including biweekly meetings)</h1>
<div><a href = '8.md' style='float:left'>⬆️上一节🔗  </a><a href = '10.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="code-module" tabindex="-1"><a class="header-anchor" href="#code-module" aria-hidden="true">#</a> code module</h2>
<div class="custom-container tip"><p class="custom-container-title">ISSUES 1859</p>
<p><a href="https://github.com/sealerio/sealer/issues/1859#top" target="_blank" rel="noopener noreferrer">feature] want to implement the k3s runtime module<ExternalLinkIcon/></a>#1859</p>
<p><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">3293172751<ExternalLinkIcon/></a> opened this issue 前天 · 4 comments</p>
<p>What a good start <a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">@3293172751<ExternalLinkIcon/></a>! Now i have some suggestions maybe make you more understand about sealer runtime.
the Achieve Interface step is definitely correct. but it would be some misunderstand about k3s's cluterimage rootfs in your chapter <em><strong>k3s - rootfs</strong></em>, i think we do not need to care too much about k3s install package distribution in this stage. I propose a step which is my learning path of sealer,FYI <a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">@3293172751<ExternalLinkIcon/></a> .
What is k8s runtime install interface logic in latest main branch?
How and when sealer install a private registry?
How does the runtime module interact with scripts in rootfs?</p>
</div>
<h2 id="k3s-module" tabindex="-1"><a class="header-anchor" href="#k3s-module" aria-hidden="true">#</a> k3s module</h2>
<div class="custom-container tip"><p class="custom-container-title">ISSUE</p>
<p>And you mentioned about the k3s installation [online\offline]. I have little confusions.
If sqlite couldn't support cluster HA installation? How to specify the database?
Another question is about install step. AFAIK, k3s support join node by <code v-pre>k3s agent</code> <code v-pre>k3s server</code>, so whether you tried this method?
Last, k3s support custom private registry, how to config this? and whether k3s could support external CRI? <a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">@3293172751<ExternalLinkIcon/></a></p>
<p>🎉about [online\offline]</p>
<p>🎉 about HA install and  single node</p>
</div>
<p>⚠️ k3s <a href="https://github.com/k3s-io/k3s/discussions/6478" target="_blank" rel="noopener noreferrer">discussions 6478<ExternalLinkIcon/></a> 一些答疑和讨论~</p>
<h2 id="关于设计统一的interface" tabindex="-1"><a class="header-anchor" href="#关于设计统一的interface" aria-hidden="true">#</a> 关于设计统一的interface</h2>
<p><strong>希望在接口 <code v-pre>interface</code>层实现各个模块的功能，统一暴露出去：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>seal run k3s~
seal run k0s~
seal run kuberntes~
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '8.md' style='float:left'>⬆️上一节🔗  </a><a href = '10.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


