<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第62节-对日志的处理-—-自动生成-changelog" tabindex="-1"><a class="header-anchor" href="#第62节-对日志的处理-—-自动生成-changelog" aria-hidden="true">#</a> 第62节 对日志的处理 — 自动生成 CHANGELOG</h1>
<div><a href = '61.md' style='float:left'>⬆️上一节🔗  </a><a href = '63.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="why" tabindex="-1"><a class="header-anchor" href="#why" aria-hidden="true">#</a> why</h2>
<p>首先，先谈一谈为什么需要 CHANGELOG：</p>
<p>我们在上一节说明了如何设计 Release，那么在这里，我们谈一谈如何针对每一次的 Release 设计优秀的 CHANGELOG。</p>
<p>一个项目最好有 CHANGELOG 用来展示每个版本之间的变更内容，作为 <code v-pre>Release Note</code> 的一部分。但是，如果每次都要手动编写 CHANGELOG，会很麻烦，也不容易坚持，所以这里我们可以借助<a href="https://github.com/git-chglog/git-chglog" target="_blank" rel="noopener noreferrer">git-chglogopen in new window<ExternalLinkIcon/></a></p>
<h2 id="版本号" tabindex="-1"><a class="header-anchor" href="#版本号" aria-hidden="true">#</a> 版本号</h2>
<p>我们知道一个 release 需要一个版本号，即使在贡献者文档有一个体系的 版本号设计方案，但是依旧让我们不满意，如果靠开发者手动打版本号，工作效率低不说，经常还会出现漏打、打的版本号不规范等问题。所以最好的办法是，版本号也通过工具自动生成。采用了<a href="https://github.com/arnaud-deprez/gsemver" target="_blank" rel="noopener noreferrer">gsemveropen in new window<ExternalLinkIcon/></a>工具来自动生成版本号。</p>
<p>我们可以编写一个脚本，来控制 整个 项目的版本号</p>
<p><code v-pre>scripts/ensure_tag.sh</code>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">version</span><span class="token operator">=</span>v<span class="token variable"><span class="token variable">`</span>gsemver bump<span class="token variable">`</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable"><span class="token variable">`</span><span class="token function">git</span> tag <span class="token parameter variable">-l</span> $version<span class="token variable">`</span></span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
  <span class="token function">git</span> tag <span class="token parameter variable">-a</span> <span class="token parameter variable">-m</span> <span class="token string">"release version <span class="token variable">$version</span>"</span> <span class="token variable">$version</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>scripts/ensure_tag.sh</code> 脚本中，通过 <code v-pre>gsemver bump</code> 命令来自动化生成语义化的版本号，并执行 <code v-pre>git tag -a</code> 给仓库打上版本号标签，gsemver 命令会根据 Commit Message 自动生成版本号。</p>
<p>之后，Makefile 和 Shell 脚本用到的所有版本号均统一使用<code v-pre>scripts/make-rules/common.mk</code>文件中的 VERSION 变量：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>VERSION :<span class="token operator">=</span> <span class="token variable"><span class="token variable">$(</span>shell <span class="token function">git</span> describe <span class="token parameter variable">--tags</span> <span class="token parameter variable">--always</span> <span class="token parameter variable">--match</span><span class="token operator">=</span><span class="token string">'v*'</span><span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者是：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> describe <span class="token parameter variable">--tags</span> <span class="token parameter variable">--always</span> <span class="token parameter variable">--match</span><span class="token operator">=</span><span class="token string">'v*'</span><span class="token variable">)</span></span>
v2.3.3-630-gb11bc2f7
❯ <span class="token builtin class-name">echo</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> describe <span class="token parameter variable">--abbrev</span><span class="token operator">=</span><span class="token number">0</span> <span class="token parameter variable">--dirty</span> <span class="token parameter variable">--always</span> <span class="token parameter variable">--tags</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">'s/-/./g'</span><span class="token variable">)</span></span>
v2.3.3.dirty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述的 Shell 命令通过 git describe 来获取离当前提交最近的 tag（版本号）。</p>
<p>在执行 <code v-pre>git describe</code> 时，如果符合条件的 tag 指向最新提交，则只显示 tag 的名字，否则会有相关的后缀，来描述该 tag 之后有多少次提交，以及最新的提交 <code v-pre>commit id</code>。例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> describe <span class="token parameter variable">--tags</span> <span class="token parameter variable">--always</span> <span class="token parameter variable">--match</span><span class="token operator">=</span><span class="token string">'v*'</span>
v1.0.0-3-g1909e47
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这里解释下版本号中各字符的含义</strong>：</p>
<ul>
<li><code v-pre>3</code>：表示自打 <code v-pre>tag v1.0.0</code> 以来有 3 次提交。</li>
<li><code v-pre>g1909e47</code>：<code v-pre>g</code> 为 git 的缩写，在多种管理工具并存的环境中很有用处。</li>
<li><code v-pre>1909e47</code>：<code v-pre>7</code> 位字符表示为最新提交的 commit id 前 7 位。</li>
</ul>
<p><strong>最后解释下参数：</strong></p>
<ul>
<li><code v-pre>–tags</code>，使用所有的标签，而不是只使用带注释的标签（annotated tag）。</li>
<li><code v-pre>git tag</code> 生成一个 unannotated tag，git tag -a <code v-pre>&lt;tagname&gt;</code> -m <code v-pre>&lt;massage&gt;</code>'' 生成一个 annotated tag。</li>
<li><code v-pre>–always</code>，如果仓库没有可用的标签，那么使用 commit 缩写来替代标签。</li>
<li><code v-pre>–match</code>，只考虑与给定模式相匹配的标签。</li>
</ul>
<h2 id="保持行为的一致性" tabindex="-1"><a class="header-anchor" href="#保持行为的一致性" aria-hidden="true">#</a> 保持行为的一致性</h2>
<p><strong>手动操作：</strong></p>
<p>检查 IAM 的所有 Commit 是否符合 Angular Commit Message 规范：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go-gitlint
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>也可以通过以下命令，手动来生成 CHANGELOG：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git-chglog v1.0.0 CHANGELOG/CHANGELOG-1.0.0.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>还可以执行 gsemver 来生成版本号：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>gsemver bump
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>我们应该注意的是</strong>：</p>
<p>这里要强调的是，我们要保证不管使用手动操作，还是通过 Makefile 操作，都要确保 git commit message 规范检查结果、生成的 CHANGELOG、生成的版本号是一致的。这需要我们采用同一种操作方式。</p>
<h2 id="git-chglog" tabindex="-1"><a class="header-anchor" href="#git-chglog" aria-hidden="true">#</a> git chglog</h2>
<p>CHANGELOG生成器在Go（Golang）中实现。随时随地，写你的更新日志。</p>
<p><code v-pre>git-chglog</code> 在内部使用 <code v-pre>git</code> 命令获取要包含在CHANGELOG中的数据。基本步骤如下。</p>
<ol>
<li>获取到所有的标签 tag</li>
<li>获取包含在 <code v-pre>tagA</code> 和 <code v-pre>tagB</code> 之间的提交。</li>
<li>使用与步骤1和2中指定的标记查询对应的所有标记执行。</li>
</ol>
<h3 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h3>
<p><code v-pre>git-chglog</code> 需要配置文件和模板来生成CHANGELOG。</p>
<p>但是，从头开始创建配置文件和模板是浪费时间。</p>
<p>因此，我们建议使用 <code v-pre>--init</code> 选项，它将以交互方式创建它们 👍</p>
<p>然后我们就创建好了模板和配置文件。</p>
<p>接下来，我们就可以快速的生成让我们项目的CHANGELOG。通过执行以下简单命令，您的CHANGELOG的Markdown将显示在stdout上。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git-chglog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你想输出到一个文件而不是stdout，使用 <code v-pre>-o</code> （ <code v-pre>--output</code> ）选项。</p>
<p>由于我的配置文件在 <code v-pre>CHANGELOG/</code> 目录下面：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>git-chglog <span class="token parameter variable">--config</span> CHANGELOG/.chglog/config.yml <span class="token parameter variable">-o</span> CHANGELOG/CHANGELOG-0.0.0.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="使用帮助" tabindex="-1"><a class="header-anchor" href="#使用帮助" aria-hidden="true">#</a> 使用帮助</h3>
<p>直接 <code v-pre>git-chglog --help</code> 就好了</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '61.md' style='float:left'>⬆️上一节🔗  </a><a href = '63.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


