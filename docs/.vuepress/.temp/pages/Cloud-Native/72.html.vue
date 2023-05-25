<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第72节-go-flutter" tabindex="-1"><a class="header-anchor" href="#第72节-go-flutter" aria-hidden="true">#</a> 第72节 go-flutter</h1>
<div><a href = '71.md' style='float:left'>⬆️上一节🔗  </a><a href = '73.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>此存储库包含一些可以使用go-flutter构建的示例应用程序。</p>
<p>预编译的示例可用作 Github 操作工件。</p>
<h3 id="安装依赖项" tabindex="-1"><a class="header-anchor" href="#安装依赖项" aria-hidden="true">#</a> 安装依赖项</h3>
<ul>
<li><a href="https://flutter.dev/" target="_blank" rel="noopener noreferrer">flutter<ExternalLinkIcon/></a></li>
<li><a href="https://golang.org/" target="_blank" rel="noopener noreferrer">go<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/go-flutter-desktop/hover" target="_blank" rel="noopener noreferrer">hover<ExternalLinkIcon/></a></li>
</ul>
<p><strong>Quick install flutter:</strong></p>
<ul>
<li><a href="https://docs.flutter.dev/get-started/install/linux" target="_blank" rel="noopener noreferrer">https://docs.flutter.dev/get-started/install/linux<ExternalLinkIcon/></a></li>
</ul>
<h3 id="什么是-hover" tabindex="-1"><a class="header-anchor" href="#什么是-hover" aria-hidden="true">#</a> 什么是 hover</h3>
<p>Hover 是一款 Flutter 应用开发工具,用于在桌面平台上运行 Flutter 应用,并提供热重载支持。</p>
<p>主要特性:</p>
<ul>
<li>支持 Linux、 macOS 和 Windows</li>
<li>提供 Flutter 应用的热重载</li>
<li>可以打包成独立的应用(不需要 Flutter SDK)</li>
<li>支持不同的打包格式,如 AppImage、snap 包等</li>
<li>可以制作不同应用版本(flavors)</li>
<li>集成了诸如 VS Code、Emacs 等 IDE</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go get github.com/go-flutter-desktop/hover
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>初始化 Flutter 项目:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>hover init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这会在项目根目录下生成 go 文件夹。4. 运行应用并启用热重载:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>hover run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5">
<li>构建发行版本:</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>hover build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输出文件位于 <code v-pre>go/build/outputs</code> 下。6. 打包应用:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>hover package
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>支持 AppImage、snap 包等多种格式。输出位于 <code v-pre>go/build/outputs</code> 下相应的文件夹内。</p>
<h3 id="quick-start" tabindex="-1"><a class="header-anchor" href="#quick-start" aria-hidden="true">#</a> quick start</h3>
<p>💡简单的一个案例如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/go-flutter-desktop/examples.git
<span class="token builtin class-name">cd</span> examples/<span class="token punctuation">[</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token comment"># select an example project</span>
hover run
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '71.md' style='float:left'>⬆️上一节🔗  </a><a href = '73.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


