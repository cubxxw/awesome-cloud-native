<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第42节-rfc-对-horizon-工程和代码细节上部分改进策略" tabindex="-1"><a class="header-anchor" href="#第42节-rfc-对-horizon-工程和代码细节上部分改进策略" aria-hidden="true">#</a> 第42节 RFC: 对 horizon 工程和代码细节上部分改进策略</h1>
<div><a href = '41.md' style='float:left'>⬆️上一节🔗  </a><a href = '43.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="horizon-目前存在的问题" tabindex="-1"><a class="header-anchor" href="#horizon-目前存在的问题" aria-hidden="true">#</a> horizon 目前存在的问题</h2>
<ul>
<li>Makefile 功能太单一，可扩展性弱，不支持交叉编译和容器编译，不支持其他扩展能力</li>
<li>并没有对日志做出很好的处理</li>
<li>没有对版权做很好的处理</li>
<li>没有一个完美的 CICD 流程</li>
<li>没有一套合适的错误码设计方案</li>
<li>虽然有 Swagger 但是并没有生成 API 文档</li>
<li>没有优雅的 tag、branch、release，以及 commit 规范</li>
</ul>
<h2 id="makefile-设计" tabindex="-1"><a class="header-anchor" href="#makefile-设计" aria-hidden="true">#</a> Makefile 设计</h2>
<p>makefile 设计是工程设计很大的一个模块，将其抽出基本的子模块，各司其职。</p>
<ul>
<li>支持交叉编译(arm, amd)</li>
<li>支持 docker 二进制编译</li>
<li>并行编译</li>
</ul>
<p>The current project has the following shortcomings:</p>
<ul>
<li>[ ] The Makefile has too simple functionality, weak extensibility, does not support cross-compilation and container compilation, and does not support other extension capabilities.</li>
<li>[ ] There is no good handling of logs (can be encapsulated with zap).</li>
<li>[ ] There is no good handling of copyright.</li>
<li>[ ] There is no perfect CICD process.</li>
<li>[ ] The robot setting is unreasonable.</li>
<li>[ ] There is no suitable error code design solution.</li>
<li>[ ] Although there is Swagger, API documentation is not generated.</li>
<li>[ ] There is no elegant tag, branch, release, and commit specification.</li>
<li>[ ] The documentation is not elegant enough.</li>
<li>[ ] Unit coverage should be used, embedded in actions and Makefiles</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '41.md' style='float:left'>⬆️上一节🔗  </a><a href = '43.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


