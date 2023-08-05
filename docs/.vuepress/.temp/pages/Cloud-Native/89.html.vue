<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第89节-openim-release-维护多分支策略" tabindex="-1"><a class="header-anchor" href="#第89节-openim-release-维护多分支策略" aria-hidden="true">#</a> 第89节 OpenIM Release 维护多分支策略</h1>
<div><a href = '88.md' style='float:left'>⬆️上一节🔗  </a><a href = '90.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<ol>
<li><strong>main 分支</strong>：这个分支是开发人员合并代码的主要分支。新的特性和 bug 修复都会合并到这个分支。这个分支的代码应该始终保持在可部署状态。</li>
<li><strong>release-v3.* 分支</strong>：这个分支是已经稳定并发布的版本。重要的 bug 修复可以直接合并到这个分支，并且这些修复应该同时也合并到 main 分支。此外，每次从 main 分支合并代码到这个分支时，都应该创建一个新的 tag，以记录这个分支的新版本。</li>
<li><strong>bug/* 分支</strong>：这些分支用于修复 bug。如果 bug 非常严重，那么修复应该同时合并到 main 分支和对应的 release 分支。如果 bug 不是很严重，那么修复应该合并到 main 分支，并在下一个版本发布时，合并到 release 分支。</li>
<li><strong>feat/* 分支</strong>：这些分支用于开发新的特性。新的特性应该首先在这些分支上开发和测试，然后在完成后合并到 main 分支。</li>
</ol>
<p><strong>重大 bug:</strong></p>
<p>判断出现重大 bug：维护一个 wiki 来记录重大 bug （参考：https://github.com/kubernetes/release/issues/3099），并且每一个 大 bug 都填上 kind/bug、area/release-eng，sig/release 标签区分</p>
<ul>
<li>创建 bug 分支: 从当前的<code v-pre>release</code> 分支创建一个新的 <code v-pre>bug/*</code> 分支，然后在这个新分支上进行 bug 修复的工作</li>
<li>修复 bug：在新创建的 <code v-pre>bug/*</code> 分支上，对 bug 进行修复，测试</li>
<li>review 代码、自动化测试</li>
<li>经过大量测试以及自动化测试，合并到 release</li>
<li>合并到 main：这里可能会出现冲突，适当解决 ＋ 自动化测试</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '88.md' style='float:left'>⬆️上一节🔗  </a><a href = '90.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


