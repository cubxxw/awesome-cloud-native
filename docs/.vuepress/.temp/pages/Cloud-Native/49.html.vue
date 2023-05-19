<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第49节-在-sealos-上开发一款-ai-自动云原生化项目自动上线工具" tabindex="-1"><a class="header-anchor" href="#第49节-在-sealos-上开发一款-ai-自动云原生化项目自动上线工具" aria-hidden="true">#</a> 第49节 在 Sealos 上开发一款 AI 自动云原生化项目自动上线工具</h1>
<div><a href = '48.md' style='float:left'>⬆️上一节🔗  </a><a href = '50.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<ul>
<li><a href="https://summer-ospp.ac.cn/org/prodetail/23ab80139?lang=zh&amp;list=pro" target="_blank" rel="noopener noreferrer">项目主页<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/labring/sealos" target="_blank" rel="noopener noreferrer">GitHub 地址<ExternalLinkIcon/></a></li>
</ul>
<h3 id="技术领域" tabindex="-1"><a class="header-anchor" href="#技术领域" aria-hidden="true">#</a> 技术领域：</h3>
<p>熟悉 golang、Docker、kubernetes 等技术，了解 chatGPT、autoGPT 等AI技术的使用</p>
<h3 id="开源协议" tabindex="-1"><a class="header-anchor" href="#开源协议" aria-hidden="true">#</a> 开源协议：</h3>
<ul>
<li>apache-2</li>
</ul>
<h3 id="项目简述" tabindex="-1"><a class="header-anchor" href="#项目简述" aria-hidden="true">#</a> 项目简述：</h3>
<p><strong>项目背景:</strong></p>
<p>不论懂不懂云原生，写 Dockerfile 以及 yaml 文件都是一件非常痛苦的事，如果 AI 能自动帮我们解决这个问题将会价值巨大。</p>
<p><strong>项目描述:</strong></p>
<p>输入一个任意的 github 仓库地址，通过 AI 能力自动为其生成 Dockerfile 和 kubernetes 编排配置文件，并自动在 sealos 上运行。</p>
<p>AI 生成的不一定第一次就能生成非常准确的配置，首先需要可以把自动构建的错误信息返回给 AI 并让 AI 自动修复，也需要人给 AI 一些反馈信息把没有期望发生的现象反馈给 AI 让 AI 来调整。</p>
<p>最终把生成的内容 PR 回仓库，后续就可以实现完全自动化上线了。</p>
<h2 id="产出要求" tabindex="-1"><a class="header-anchor" href="#产出要求" aria-hidden="true">#</a> 产出要求</h2>
<ol>
<li>源代码，技术文档，线上服务以及测试报告</li>
<li>提供能力的源码与文档并合并到主仓库</li>
<li>功能可以正常在 sealos 上线并运行</li>
<li>提供测试报告</li>
</ol>
<h2 id="什么是-auto-gpt" tabindex="-1"><a class="header-anchor" href="#什么是-auto-gpt" aria-hidden="true">#</a> 什么是 Auto-GPT</h2>
<ul>
<li><RouterLink to="/Cloud-Native/50.html">详细介绍</RouterLink></li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '48.md' style='float:left'>⬆️上一节🔗  </a><a href = '50.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


