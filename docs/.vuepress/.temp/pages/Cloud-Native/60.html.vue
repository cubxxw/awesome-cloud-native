<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第60节-高级的-githook-设计" tabindex="-1"><a class="header-anchor" href="#第60节-高级的-githook-设计" aria-hidden="true">#</a> 第60节 高级的 Githook 设计</h1>
<div><a href = '59.md' style='float:left'>⬆️上一节🔗  </a><a href = '61.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="社区不规范怎么办" tabindex="-1"><a class="header-anchor" href="#社区不规范怎么办" aria-hidden="true">#</a> 社区不规范怎么办</h2>
<p>作为 <a href="https://github.com/OpenIMSDK" target="_blank" rel="noopener noreferrer">OpenIM<ExternalLinkIcon/></a> 社区首席运营官，对整个社区的 <a href="https://github.com/OpenIMSDK/community" target="_blank" rel="noopener noreferrer">communtiy<ExternalLinkIcon/></a> 以及 <a href="https://github.com/OpenIMSDK/.github" target="_blank" rel="noopener noreferrer">GitHub 配置仓库<ExternalLinkIcon/></a> 进行了全面的配置。并且对整个 OpenIM 的 <code v-pre>Makefile</code> 和 <code v-pre>CICD</code> 流，以及整个 OpenIM 使用的日志包 、错误码、协同流、贡献者文档以及 社区文档 进行架构和设计。</p>
<p>在这个时候总会有一些问题，即使你觉得自己的 <a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">贡献者文档<ExternalLinkIcon/></a> 写的很牛逼了，很全面了，但是依旧很少有人愿意花心思去按照你写的规范去学习。这对我打造顶级的开源社区是一个非常大的阻碍，于是就有了今天的这个文档，我会将它记录在 <a href="https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694" target="_blank" rel="noopener noreferrer">GitHub Gists<ExternalLinkIcon/></a> 上，提供拉取和使用的说明、链接，并且定期的维护它。</p>
<p>首先，我提供克隆的链接：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="如何设计" tabindex="-1"><a class="header-anchor" href="#如何设计" aria-hidden="true">#</a> 如何设计</h2>
<p>首先是针对基础的功能，那就是我们熟知的 <code v-pre>commit</code> 信息和 <code v-pre>push</code> 信息。</p>
<ul>
<li>我们可以对 <code v-pre>commit</code> 信息的格式进行设置</li>
<li>我们可以对 <code v-pre>push</code> 的大小进行设置</li>
<li>我们提供了 <code v-pre>actions</code> 的功能</li>
<li>我们提供了 <code v-pre>Makefile</code> 标记和清除 <code v-pre>Hook</code> 的能力</li>
</ul>
<p>我之前在学习 git 的时候写了一篇很全的笔记，并且分享在 GitHub 上面，在这个 <a href="https://github.com/cubxxw/awesome-cs-course/blob/master/Git/README.md" target="_blank" rel="noopener noreferrer">🤖 链接<ExternalLinkIcon/></a> 上可以学习到 git 很多高级用法。</p>
<blockquote>
<p>这篇文章讲解了 git 有哪些规范，寻找合适的 CICD 流：</p>
<p>统一格式：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>统一格式：git commit <span class="token parameter variable">-m</span> <span class="token string">'type(scope): 描述(#issue)'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们在提交的时候带上邮箱信息 <code v-pre>-s</code> 来签证，这是一个很好的习惯。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> commit <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">"..."</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>git commit</code>艺术：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>&lt;类型>[可选 范围]: &lt;描述>
[可选 正文]
[可选 脚注]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>git commit</code>提交类型可以是如下：</p>
<ol>
<li><code v-pre>feat</code>：新功能（feature）</li>
<li><code v-pre>fix</code>：修补bug</li>
<li><code v-pre>docs</code>：文档（documentation）</li>
<li><code v-pre>style</code>： 格式（不影响代码运行的变动）</li>
<li><code v-pre>refactor</code>：重构（即不是新增功能，也不是修改bug的代码变动）</li>
<li><code v-pre>test</code>：增加测试</li>
<li><code v-pre>chore</code>：构建过程或辅助工具的变动</li>
<li><code v-pre>perf</code>：性能优化</li>
<li><code v-pre>revert</code>：回滚</li>
<li><code v-pre>build</code>：构建</li>
<li><code v-pre>ci</code>：持续集成</li>
</ol>
</blockquote>
<p><strong>⚠️ 使用这个 Git hook 应该注意什么？</strong></p>
<ul>
<li>这个 <code v-pre>git hook</code> 会在你不小心上传大文件的时候，阻止你，并且警告你，这是不可逆转的</li>
<li>这个 <code v-pre>git hook</code> 会在你没有办法控制提交格式的时候，让你很痛苦。</li>
</ul>
<h2 id="如何使用" tabindex="-1"><a class="header-anchor" href="#如何使用" aria-hidden="true">#</a> 如何使用</h2>
<p><strong>你可以选择两种方式来使用 Git hook:</strong></p>
<ol>
<li>直接作为 <code v-pre>.git/hooks</code>文件夹中的 <code v-pre>pre-commit</code> 钩子。</li>
<li>使用 Husky 更新您的 <code v-pre>package.json</code>：</li>
</ol>
<p><a href="https://github.com/cubxxw/awesome-cs-course/blob/master/Git/README.md" target="_blank" rel="noopener noreferrer">Husky<ExternalLinkIcon/></a> 使得 git hook 变的更加容易和方便：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"husky"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"hooks"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"pre-commit"</span><span class="token operator">:</span> <span class="token string">"sh ./some-path/pre-commit-prevent-large-files.sh"</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个钩子我是为 <a href="https://github.com/OpenIMSDK/Open-IM-Server/" target="_blank" rel="noopener noreferrer">OpenIM<ExternalLinkIcon/></a> 社区项目设计的，但是转念一想，反正都做成很方便和高端的 <a href="https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694" target="_blank" rel="noopener noreferrer">Github Gist<ExternalLinkIcon/></a> 了，为何不用 Gist 的特性来对 Git Hook 做一个记录和保存，后期提供维护和下载，也提供了一个交流平台，这是非常 perfect 的。</p>
<p>所以我第一步，利用了 <a href="https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694" target="_blank" rel="noopener noreferrer">GitHub Gist<ExternalLinkIcon/></a> 提供了一个下载的通道，这样以后有别的项目也可以直接一键使用脚本来拉取到本地。</p>
<p>不仅仅如此，我针对提交设计了一个<a href="https://gist.githubusercontent.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694/raw/gitsync.sh" target="_blank" rel="noopener noreferrer">脚本<ExternalLinkIcon/></a>，我们使用脚本可以一键并且规范的 push 到远程仓库。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-L</span> https://gist.githubusercontent.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694/raw/gitsync.sh <span class="token operator">|</span><span class="token function">sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>默认限制为每个文件最大5MB。如果你觉得你的提交是一个特例，你可以使用以下命令覆盖这个限制：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">GIT_FILE_SIZE_LIMIT</span><span class="token operator">=</span><span class="token number">50000000</span> <span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">"test: this commit is allowed file sizes up to 50MB"</span>
<span class="token comment"># OR</span>
<span class="token function">git</span> commit --no-verify
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我不关心任何特定的文件，只是限制整个提交本身，这至少应该使开发人员的事情两次之前，他们可能会作出决定 <code v-pre>git commit --no-verify</code></p>
<p><strong>可复用脚本一键安装：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-L</span> https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694/raw/install.sh <span class="token operator">|</span><span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="contents" tabindex="-1"><a class="header-anchor" href="#contents" aria-hidden="true">#</a> Contents</h2>
<ul>
<li><a href="https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694#file-install-sh" target="_blank" rel="noopener noreferrer">使用安装脚本<ExternalLinkIcon/></a></li>
<li><a href="https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694#file-commit-msg" target="_blank" rel="noopener noreferrer">commit 的信息<ExternalLinkIcon/></a></li>
<li><a href="https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694#file-gitsync-sh" target="_blank" rel="noopener noreferrer">自动 push 一键流脚本 gitsync<ExternalLinkIcon/></a></li>
<li><a href="https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694#file-makefile" target="_blank" rel="noopener noreferrer">Makefile<ExternalLinkIcon/></a></li>
<li><a href="https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694#file-pre-commit" target="_blank" rel="noopener noreferrer">预提交：钩子本身: pre-commit<ExternalLinkIcon/></a></li>
<li><a href="https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694#file-pre-push" target="_blank" rel="noopener noreferrer">提交 push 处理<ExternalLinkIcon/></a></li>
</ul>
<blockquote>
<p><strong>Note</strong> 点击右上角 <code v-pre>Raw</code> 进入脚本文件</p>
</blockquote>
<h2 id="可复用的安装脚本" tabindex="-1"><a class="header-anchor" href="#可复用的安装脚本" aria-hidden="true">#</a> 可复用的安装脚本</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>
<span class="token builtin class-name">echo</span> <span class="token string">"Starting install script..."</span>

<span class="token assign-left variable">SET_GIT_TEMPLATE_DIR</span><span class="token operator">=</span>false
<span class="token assign-left variable">EXISTING_TEMPLATE</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> config <span class="token parameter variable">--global</span> init.templateDir <span class="token operator">||</span> <span class="token builtin class-name">echo</span> <span class="token string">""</span><span class="token variable">)</span></span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">"<span class="token variable">$EXISTING_TEMPLATE</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"Creating a new global git template dir at ~/.git_template"</span>
  <span class="token function">mkdir</span> ~/.git_template
  <span class="token assign-left variable">EXISTING_TEMPLATE</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">cd</span> ~<span class="token punctuation">;</span> <span class="token builtin class-name">pwd</span> <span class="token parameter variable">-P</span><span class="token variable">)</span></span>/.git_template"</span>
  <span class="token assign-left variable">SET_GIT_TEMPLATE_DIR</span><span class="token operator">=</span>true
<span class="token keyword">else</span>
  <span class="token assign-left variable">EXISTING_TEMPLATE</span><span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">eval</span> <span class="token builtin class-name">cd</span> <span class="token punctuation">$(</span>dirname <span class="token string">"<span class="token variable">$EXISTING_TEMPLATE</span>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token builtin class-name">pwd</span> <span class="token parameter variable">-P</span><span class="token variable">)</span></span>/<span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> <span class="token string">"<span class="token variable">$EXISTING_TEMPLATE</span>"</span><span class="token variable">)</span></span>"</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"Using existing git template dir: <span class="token variable">$EXISTING_TEMPLATE</span>"</span>
<span class="token keyword">fi</span>

<span class="token assign-left variable">HOOKS_DIR</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$EXISTING_TEMPLATE</span>/hooks"</span>
<span class="token assign-left variable">PRECOMMIT_HOOK</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$HOOKS_DIR</span>/pre-commit"</span>
<span class="token builtin class-name">echo</span> <span class="token string">"Creating hooks dir if it doesn't already exist: <span class="token variable">$HOOKS_DIR</span>"</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token string">"<span class="token variable">$HOOKS_DIR</span>"</span>
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token string">"<span class="token variable">$PRECOMMIT_HOOK</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"Cannot install hook as it's already defined: '<span class="token variable">$PRECOMMIT_HOOK</span>'"</span> <span class="token operator">></span><span class="token file-descriptor important">&amp;2</span>
  <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">echo</span> <span class="token string">"Downloading the hook to <span class="token variable">$PRECOMMIT_HOOK</span>"</span>
<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694/raw/pre-commit <span class="token parameter variable">-o</span> <span class="token string">"<span class="token variable">$PRECOMMIT_HOOK</span>"</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span> /dev/null
<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694/raw/commit-msg <span class="token parameter variable">-o</span> <span class="token string">"<span class="token variable">$PRECOMMIT_HOOK</span>"</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span> /dev/null
<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694/raw/pre-push <span class="token parameter variable">-o</span> <span class="token string">"<span class="token variable">$PRECOMMIT_HOOK</span>"</span> <span class="token operator"><span class="token file-descriptor important">2</span>></span> /dev/null

<span class="token builtin class-name">echo</span> <span class="token string">"Making it executable"</span>
<span class="token function">chmod</span> +x <span class="token string">"<span class="token variable">$PRECOMMIT_HOOK</span>"</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">$SET_GIT_TEMPLATE_DIR</span>"</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  <span class="token builtin class-name">echo</span> <span class="token string">"Defining ~/.git_template as the global git template dir"</span>
  <span class="token function">git</span> config <span class="token parameter variable">--global</span> init.templateDir <span class="token string">'~/.git_template'</span>
<span class="token keyword">fi</span>

<span class="token builtin class-name">echo</span> <span class="token parameter variable">-e</span> <span class="token string">"<span class="token entity" title="\n">\n</span>Done! Any future git repo created in this user profile will contain the hook<span class="token entity" title="\n">\n</span>"</span>


<span class="token comment">##################################################</span>
<span class="token assign-left variable">GIT_PATH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> rev-parse --show-toplevel<span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">"===> Copying hooks to <span class="token variable">$GIT_PATH</span>/.git/hooks/"</span>
<span class="token function">mv</span> ~/.git_template/hooks/* <span class="token variable">$GIT_PATH</span>/.git/hooks/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git-commit-设置" tabindex="-1"><a class="header-anchor" href="#git-commit-设置" aria-hidden="true">#</a> git commit 设置</h2>
<p><strong>pre-commit 文件:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment"># Copyright © 2023 OpenIMSDK.</span>
<span class="token comment">#</span>
<span class="token comment"># Licensed under the Apache License, Version 2.0 (the "License");</span>
<span class="token comment"># you may not use this file except in compliance with the License.</span>
<span class="token comment"># You may obtain a copy of the License at</span>
<span class="token comment">#</span>
<span class="token comment">#     http://www.apache.org/licenses/LICENSE-2.0</span>
<span class="token comment">#</span>
<span class="token comment"># Unless required by applicable law or agreed to in writing, software</span>
<span class="token comment"># distributed under the License is distributed on an "AS IS" BASIS,</span>
<span class="token comment"># WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span>
<span class="token comment"># See the License for the specific language governing permissions and</span>
<span class="token comment"># limitations under the License.</span>
<span class="token comment">#</span>
<span class="token comment"># ==============================================================================</span>
<span class="token comment"># This is a pre-commit hook that ensures attempts to commit files that are</span>
<span class="token comment"># are larger than $limit to your _local_ repo fail, with a helpful error message.</span>

<span class="token comment"># You can override the default limit of 2MB by supplying the environment variable:</span>
<span class="token comment"># GIT_FILE_SIZE_LIMIT=50000000 git commit -m "test: this commit is allowed file sizes up to 50MB"</span>
<span class="token comment">#</span>
<span class="token comment"># ==============================================================================</span>


<span class="token assign-left variable">YELLOW</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[93m"</span>
<span class="token assign-left variable">GREEN</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[32m"</span>
<span class="token assign-left variable">RED</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[31m"</span>
<span class="token assign-left variable">ENDCOLOR</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[0m"</span>

<span class="token function-name function">printMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token builtin class-name">printf</span> <span class="token string">"<span class="token variable">${YELLOW}</span>OpenIM : <span class="token variable">$1</span><span class="token variable">${ENDCOLOR}</span><span class="token entity" title="\n">\n</span>"</span>
<span class="token punctuation">}</span>

<span class="token function-name function">printSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token builtin class-name">printf</span> <span class="token string">"<span class="token variable">${GREEN}</span>OpenIM : <span class="token variable">$1</span><span class="token variable">${ENDCOLOR}</span><span class="token entity" title="\n">\n</span>"</span>
<span class="token punctuation">}</span>

<span class="token function-name function">printError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token builtin class-name">printf</span> <span class="token string">"<span class="token variable">${RED}</span>OpenIM : <span class="token variable">$1</span><span class="token variable">${ENDCOLOR}</span><span class="token entity" title="\n">\n</span>"</span>
<span class="token punctuation">}</span>

printMessage <span class="token string">"Running local OpenIM pre-commit hook."</span>

<span class="token comment"># flutter format .</span>
<span class="token comment"># https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694</span>
<span class="token comment"># TODO! GIT_FILE_SIZE_LIMIT=50000000 git commit -m "test: this commit is allowed file sizes up to 50MB"</span>
<span class="token comment"># Maximum file size limit in bytes</span>
<span class="token assign-left variable">limit</span><span class="token operator">=</span><span class="token variable">${GIT_FILE_SIZE_LIMIT<span class="token operator">:-</span>2000000}</span> <span class="token comment"># Default 2MB</span>
<span class="token assign-left variable">limitInMB</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span> $limit <span class="token operator">/</span> <span class="token number">1000000</span> <span class="token variable">))</span></span>

<span class="token keyword">function</span> <span class="token function-name function">file_too_large</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token assign-left variable">filename</span><span class="token operator">=</span><span class="token variable">$0</span>
	<span class="token assign-left variable">filesize</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span> $<span class="token number">1</span> <span class="token operator">/</span> <span class="token number">2</span><span class="token operator">**</span><span class="token number">20</span> <span class="token variable">))</span></span>

	<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">HEREDOC

	File <span class="token variable">$filename</span> is <span class="token variable">$filesize</span> MB, which is larger than github's maximum
        file size (2 MB). We will not be able to push this file to GitHub.
	Commit aborted

HEREDOC</span>
    <span class="token function">git</span> status

<span class="token punctuation">}</span>

<span class="token comment"># Move to the repo root so git files paths make sense</span>
<span class="token assign-left variable">repo_root</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span> <span class="token function">git</span> rev-parse --show-toplevel <span class="token variable">)</span></span>
<span class="token builtin class-name">cd</span> <span class="token variable">$repo_root</span>

<span class="token assign-left variable">empty_tree</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span> <span class="token function">git</span> hash-object <span class="token parameter variable">-t</span> tree /dev/null <span class="token variable">)</span></span>

<span class="token keyword">if</span> <span class="token function">git</span> rev-parse <span class="token parameter variable">--verify</span> HEAD <span class="token operator">></span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>></span><span class="token file-descriptor important">&amp;1</span>
<span class="token keyword">then</span>
	<span class="token assign-left variable">against</span><span class="token operator">=</span>HEAD
<span class="token keyword">else</span>
	<span class="token assign-left variable">against</span><span class="token operator">=</span><span class="token string">"<span class="token variable">$empty_tree</span>"</span>
<span class="token keyword">fi</span>

<span class="token comment"># Set split so that for loop below can handle spaces in file names by splitting on line breaks</span>
<span class="token assign-left variable"><span class="token environment constant">IFS</span></span><span class="token operator">=</span><span class="token string">'
'</span>

<span class="token assign-left variable">shouldFail</span><span class="token operator">=</span>false
<span class="token keyword">for</span> <span class="token for-or-select variable">file</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span> <span class="token function">git</span> diff-index <span class="token parameter variable">--cached</span> --name-only $against <span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
	<span class="token assign-left variable">file_size</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$((</span>[ <span class="token operator">!</span> <span class="token operator">-</span>f $file ] <span class="token operator">&amp;&amp;</span> echo <span class="token number">0</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token punctuation">(</span>ls <span class="token operator">-</span>la $file <span class="token operator">|</span> awk '{ print $<span class="token number">5</span> }'<span class="token variable">))</span></span>
	<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">$file_size</span>"</span> <span class="token parameter variable">-gt</span>  <span class="token string">"<span class="token variable">$limit</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
	    printError <span class="token string">"File <span class="token variable">$file</span> is <span class="token variable"><span class="token variable">$((</span> $file_size <span class="token operator">/</span> <span class="token number">10</span><span class="token operator">**</span><span class="token number">6</span> <span class="token variable">))</span></span> MB, which is larger than our configured limit of <span class="token variable">$limitInMB</span> MB"</span>
        <span class="token assign-left variable">shouldFail</span><span class="token operator">=</span>true
	<span class="token keyword">fi</span>
<span class="token keyword">done</span>

<span class="token keyword">if</span> <span class="token variable">$shouldFail</span>
<span class="token keyword">then</span>
    printMessage <span class="token string">"If you really need to commit this file, you can override the size limit by setting the GIT_FILE_SIZE_LIMIT environment variable, e.g. GIT_FILE_SIZE_LIMIT=42000000 for 42MB. Or, commit with the --no-verify switch to skip the check entirely."</span>
	  printError <span class="token string">"Commit aborted"</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>commit-msg</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token comment"># Copyright © 2023 OpenIMSDK.</span>
<span class="token comment">#</span>
<span class="token comment"># Licensed under the Apache License, Version 2.0 (the "License");</span>
<span class="token comment"># you may not use this file except in compliance with the License.</span>
<span class="token comment"># You may obtain a copy of the License at</span>
<span class="token comment">#</span>
<span class="token comment">#     http://www.apache.org/licenses/LICENSE-2.0</span>
<span class="token comment">#</span>
<span class="token comment"># Unless required by applicable law or agreed to in writing, software</span>
<span class="token comment"># distributed under the License is distributed on an "AS IS" BASIS,</span>
<span class="token comment"># WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span>
<span class="token comment"># See the License for the specific language governing permissions and</span>
<span class="token comment"># limitations under the License.</span>
<span class="token comment">#</span>
<span class="token comment"># ==============================================================================</span>
<span class="token comment">#</span>
<span class="token comment"># Store this file as .git/hooks/commit-msg in your repository in order to</span>
<span class="token comment"># enforce checking for proper commit message format before actual commits.</span>
<span class="token comment"># You may need to make the script executable by 'chmod +x .git/hooks/commit-msg'.</span>

<span class="token comment"># commit-msg use go-gitlint tool, install go-gitlint via `go get github.com/llorllale/go-gitlint/cmd/go-gitlint`</span>
<span class="token comment"># go-gitlint --msg-file="$1"</span>

<span class="token comment"># An example hook script to check the commit log message.</span>
<span class="token comment"># Called by "git commit" with one argument, the name of the file</span>
<span class="token comment"># that has the commit message.  The hook should exit with non-zero</span>
<span class="token comment"># status after issuing an appropriate message if it wants to stop the</span>
<span class="token comment"># commit.  The hook is allowed to edit the commit message file.</span>

<span class="token assign-left variable">YELLOW</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[93m"</span>
<span class="token assign-left variable">GREEN</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[32m"</span>
<span class="token assign-left variable">RED</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[31m"</span>
<span class="token assign-left variable">ENDCOLOR</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[0m"</span>

<span class="token function-name function">printMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token builtin class-name">printf</span> <span class="token string">"<span class="token variable">${YELLOW}</span>OpenIM : <span class="token variable">$1</span><span class="token variable">${ENDCOLOR}</span><span class="token entity" title="\n">\n</span>"</span>
<span class="token punctuation">}</span>

<span class="token function-name function">printSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token builtin class-name">printf</span> <span class="token string">"<span class="token variable">${GREEN}</span>OpenIM : <span class="token variable">$1</span><span class="token variable">${ENDCOLOR}</span><span class="token entity" title="\n">\n</span>"</span>
<span class="token punctuation">}</span>

<span class="token function-name function">printError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token builtin class-name">printf</span> <span class="token string">"<span class="token variable">${RED}</span>OpenIM : <span class="token variable">$1</span><span class="token variable">${ENDCOLOR}</span><span class="token entity" title="\n">\n</span>"</span>
<span class="token punctuation">}</span>

printMessage <span class="token string">"Running the OpenIM commit-msg hook."</span>

<span class="token comment"># This example catches duplicate Signed-off-by lines.</span>

<span class="token builtin class-name">test</span> <span class="token string">""</span> <span class="token operator">=</span> <span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token function">grep</span> <span class="token string">'^Signed-off-by: '</span> <span class="token string">"<span class="token variable">$1</span>"</span> <span class="token operator">|</span>
	 <span class="token function">sort</span> <span class="token operator">|</span> <span class="token function">uniq</span> <span class="token parameter variable">-c</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">'/^[ 	]*1[ 	]/d'</span><span class="token variable">)</span></span>"</span> <span class="token operator">||</span> <span class="token punctuation">{</span>
	<span class="token builtin class-name">echo</span> <span class="token operator">></span><span class="token file-descriptor important">&amp;2</span> Duplicate Signed-off-by lines.
	<span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

./tools/go-gitlint <span class="token punctuation">\</span>
	 --msg-file<span class="token operator">=</span><span class="token variable">$1</span> <span class="token punctuation">\</span>
	 --subject-regex<span class="token operator">=</span><span class="token string">"^(build|chore|ci|docs|feat|feature|fix|perf|refactor|revert|style|test)(.*)?:\s?.*"</span> <span class="token punctuation">\</span>
    --subject-maxlen<span class="token operator">=</span><span class="token number">150</span> <span class="token punctuation">\</span>
    --subject-minlen<span class="token operator">=</span><span class="token number">10</span> <span class="token punctuation">\</span>
    --body-regex<span class="token operator">=</span><span class="token string">".*"</span> <span class="token punctuation">\</span>
    --max-parents<span class="token operator">=</span><span class="token number">1</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span>
<span class="token keyword">then</span>
    printError <span class="token string">"Please fix your commit message to match OpenIM coding standards"</span>
    printError <span class="token string">"https://gist.github.com/cubxxw/126b72104ac0b0ca484c9db09c3e5694"</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="push" tabindex="-1"><a class="header-anchor" href="#push" aria-hidden="true">#</a> push</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/usr/bin/env bash</span>

<span class="token assign-left variable">YELLOW</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[93m"</span>
<span class="token assign-left variable">GREEN</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[32m"</span>
<span class="token assign-left variable">RED</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[31m"</span>
<span class="token assign-left variable">ENDCOLOR</span><span class="token operator">=</span><span class="token string">"<span class="token entity" title="\e">\e</span>[0m"</span>

<span class="token function-name function">printMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token builtin class-name">printf</span> <span class="token string">"<span class="token variable">${YELLOW}</span>OpenIM : <span class="token variable">$1</span><span class="token variable">${ENDCOLOR}</span><span class="token entity" title="\n">\n</span>"</span>
<span class="token punctuation">}</span>

<span class="token function-name function">printSuccess</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token builtin class-name">printf</span> <span class="token string">"<span class="token variable">${GREEN}</span>OpenIM : <span class="token variable">$1</span><span class="token variable">${ENDCOLOR}</span><span class="token entity" title="\n">\n</span>"</span>
<span class="token punctuation">}</span>

<span class="token function-name function">printError</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token builtin class-name">printf</span> <span class="token string">"<span class="token variable">${RED}</span>OpenIM : <span class="token variable">$1</span><span class="token variable">${ENDCOLOR}</span><span class="token entity" title="\n">\n</span>"</span>
<span class="token punctuation">}</span>

printMessage <span class="token string">"Running local OpenIM pre-push hook."</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> status <span class="token parameter variable">--porcelain</span><span class="token variable">`</span></span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
  printError <span class="token string">"This script needs to run against committed code only. Please commit or stash you changes."</span>
  <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token keyword">fi</span>

<span class="token comment">#</span>
<span class="token comment">#printMessage "Running the Flutter analyzer"</span>
<span class="token comment">#flutter analyze</span>
<span class="token comment">#</span>
<span class="token comment">#if [ $? -ne 0 ]; then</span>
<span class="token comment">#  printError "Flutter analyzer error"</span>
<span class="token comment">#  exit 1</span>
<span class="token comment">#fi</span>
<span class="token comment">#</span>
<span class="token comment">#printMessage "Finished running the Flutter analyzer"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="actions" tabindex="-1"><a class="header-anchor" href="#actions" aria-hidden="true">#</a> actions</h2>
<p><code v-pre>git-warning.yml</code> 文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># This workflow will check for large files being added in PRs</span>
<span class="token comment"># and label the PR if one is found that exceeds the configured limit.</span>
<span class="token comment">#</span>
<span class="token comment"># For more information, see: https://github.com/marketplace/actions/lfs-warning</span>

<span class="token key atrule">name</span><span class="token punctuation">:</span> Large file size warning

<span class="token key atrule">on</span><span class="token punctuation">:</span> 
  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span>
    <span class="token comment"># Ignore some files to avoid consuming Actions minutes unnecessarily </span>
    <span class="token comment"># for file types we're fairly confident we'll never need to worry about</span>
    <span class="token key atrule">paths-ignore</span><span class="token punctuation">:</span> 
      <span class="token punctuation">-</span> <span class="token string">'**.config'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.cs'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.cshtml'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.cs'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.csproj'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.cmd'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.dockerignore'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.gitignore'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.graphql'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.jsx?'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.md'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.props'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.ps1'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.scss'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.sh'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.sln'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.tsx?'</span>
      <span class="token punctuation">-</span> <span class="token string">'**.yml'</span>
      <span class="token punctuation">-</span> <span class="token string">'**/appsettings.*.json'</span>
      <span class="token punctuation">-</span> <span class="token string">'**/Dockerfile'</span>
      
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">run-check</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actionsdesk/lfs<span class="token punctuation">-</span>warning@v2.0
      <span class="token key atrule">with</span><span class="token punctuation">:</span>
        <span class="token comment">#token: ${{ secrets.GITHUB_TOKEN }} # Optional</span>
        <span class="token key atrule">filesizelimit</span><span class="token punctuation">:</span> <span class="token string">'5242880'</span> <span class="token comment"># 5MB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>嵌入到 Makefile 后，整个逻辑就更简单了：</strong></p>
<div class="language-makefile ext-makefile line-numbers-mode"><pre v-pre class="language-makefile"><code><span class="token comment"># Copy githook scripts when execute makefile</span>
COPY_GITHOOK<span class="token operator">:=</span><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> cp -f script/githooks/* .git/hooks/<span class="token punctuation">;</span> chmod +x .git/hooks/*<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '59.md' style='float:left'>⬆️上一节🔗  </a><a href = '61.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


