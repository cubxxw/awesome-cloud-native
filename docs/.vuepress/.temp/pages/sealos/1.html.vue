<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第1节-第一阶段" tabindex="-1"><a class="header-anchor" href="#第1节-第一阶段" aria-hidden="true">#</a> 第1节 第一阶段</h1>
<div><a href = '../README.md' style='float:left'>⬆️主目录🔗  </a><a href = '2.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://docker.nsddd.top" target="_blank" rel="noopener noreferrer">k8s、docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="任务分配" tabindex="-1"><a class="header-anchor" href="#任务分配" aria-hidden="true">#</a> 任务分配</h2>
<blockquote>
<p>time：Within a week</p>
</blockquote>
<ul>
<li>完成 first contribute，目的：了解开源项目的贡献流程</li>
<li>完成 sealos 开发环境构建</li>
<li>了解 kuberentes 基本使用，核心概念，核心组件的作用</li>
</ul>
<blockquote>
<ul>
<li>基本使用：
<ul>
<li>创建 一个 pod 并理解什么是 pod</li>
<li>创建一个 deployment 理解 deployment 与 pod 的关系</li>
<li>创建一个 configmap， 理解挂载配置文件给 pod</li>
<li>创建一个 service，通过 service 在集群内访问 pod</li>
</ul>
</li>
<li>核心概念，核心组件的作用：
<ul>
<li>kubectl apiserver controller-manager scheduler kubelet kube-proxy etcd 这些组件分别是做什么的</li>
<li>可以用一个 kubectl apply 一个 deployment 这些组件分别做了哪些事来梳理整个流程</li>
</ul>
</li>
</ul>
</blockquote>
<p>🚸 next time：会分配一个具体的任务以及介绍 sealos 源码架构。</p>
<h3 id="资源🗓️" tabindex="-1"><a class="header-anchor" href="#资源🗓️" aria-hidden="true">#</a> 资源🗓️</h3>
<p><strong>参考资料：</strong></p>
<ol>
<li>
<p>贡献文档：<a href="https://github.com/labring/sealos/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">https://github.com/labring/sealos/blob/main/CONTRIBUTING.md<ExternalLinkIcon/></a></p>
</li>
<li>
<p>开发环境搭建文档：<a href="https://github.com/labring/sealos/blob/main/DEVELOPGUIDE.md" target="_blank" rel="noopener noreferrer">https://github.com/labring/sealos/blob/main/DEVELOPGUIDE.md<ExternalLinkIcon/></a></p>
</li>
<li>
<p>使用 sealos 快速构建 kubernetes 学习环境文档：<a href="https://github.com/labring/sealos#quickstart" target="_blank" rel="noopener noreferrer">https://github.com/labring/sealos#quickstart<ExternalLinkIcon/></a> 搭建单机环境即可。</p>
</li>
<li>
<p>kubernetes 入门文档：<a href="https://kubernetes.io/docs/tutorials/kubernetes-basics/" target="_blank" rel="noopener noreferrer">https://kubernetes.io/docs/tutorials/kubernetes-basics/<ExternalLinkIcon/></a>  安装部分跳过直接使用 sealos 一键构建。</p>
</li>
</ol>
<blockquote>
<p>⚠️ 注：中间出现任何问题一定不要怕骚扰 fanux，主动提问题很重要。孵化交流群里也非常欢迎问问题。</p>
</blockquote>
<h2 id="贡献文档" tabindex="-1"><a class="header-anchor" href="#贡献文档" aria-hidden="true">#</a> 贡献文档</h2>
<ul>
<li>[x] <a href="https://github.com/labring/sealos/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">贡献指南<ExternalLinkIcon/></a></li>
</ul>
<p>对于发现的<strong>安全</strong>问题，建议使用发送邮箱的方式告知<a href="mailto:admin@sealyun.com">admin@sealyun.com</a></p>
<p>对于<strong>一般</strong> 的问题，或许你可以选择 [issues](<a href="https://github.com/labring/sealos/issues/new/choose" target="_blank" rel="noopener noreferrer">New Issue · labring/sealos (github.com)<ExternalLinkIcon/></a>) 来指出问题</p>
<p><img src="http://sm.nsddd.top/smimage-20221019161049208.png" alt="image-20221019161049208"></p>
<p>⚡ 显然，相比较<code v-pre>issues</code>，我更喜欢<code v-pre>pr</code> ，你可以发现下面的问题并且改进</p>
<ul>
<li>如果您发现拼写错误，请尝试修复它！</li>
<li>如果您发现错误，请尝试修复它！</li>
<li>如果您发现一些多余的代码，请尝试删除它们！</li>
<li>如果发现缺少一些测试用例，请尝试添加它们！</li>
<li>如果您可以增强功能，<strong>请不要犹豫</strong>！</li>
<li>如果您发现代码是隐式的，请尝试添加注释以使其清晰！</li>
<li>如果你觉得代码很丑陋，试着重构它！</li>
<li>如果你能帮助改进文档，那就再好不过了！</li>
<li>如果您发现文档不正确，请直接进行修复！</li>
<li>.…..</li>
</ul>
<h3 id="🧷-补充阅读" tabindex="-1"><a class="header-anchor" href="#🧷-补充阅读" aria-hidden="true">#</a> 🧷 补充阅读</h3>
<ol>
<li><a href="https://nsddd.top/archives/contributors" target="_blank" rel="noopener noreferrer">如何参与github项目或许你可以参考这篇文章~<ExternalLinkIcon/></a></li>
<li><a href="https://nsddd.top/archives/actions" target="_blank" rel="noopener noreferrer">如何使用actions自动部署实现自动更新远程~<ExternalLinkIcon/></a></li>
</ol>
<h3 id="💡-步骤" tabindex="-1"><a class="header-anchor" href="#💡-步骤" aria-hidden="true">#</a> 💡 步骤</h3>
<ul>
<li>[x] <a href="https://github.com/cubxxw/awesome-cs-course/blob/master/Git/README.md" target="_blank" rel="noopener noreferrer">git的教程<ExternalLinkIcon/></a></li>
</ul>
<p>⬇️ 大致流程如下：</p>
<ol>
<li>
<p>首先在Github上fork本仓库到你的仓库</p>
</li>
<li>
<p>git clone克隆到本地</p>
</li>
<li>
<p>在本地修改对应的代码</p>
</li>
<li>
<p>git push到自己的仓库</p>
</li>
<li>
<p>在自己的仓库进行pull request的操作</p>
</li>
</ol>
<h3 id="文档规范" tabindex="-1"><a class="header-anchor" href="#文档规范" aria-hidden="true">#</a> 文档规范</h3>
<h4 id="格式" tabindex="-1"><a class="header-anchor" href="#格式" aria-hidden="true">#</a> 格式</h4>
<p>请遵守以下规则以更好地格式化文档，这将大大改善阅读体验。</p>
<ol>
<li>请不要在英文文档中使用中文标点符号，反之亦然。</li>
<li>请在适用的情况下使用大写字母，例如句子/标题的第一个字母等。</li>
<li>请为每个 Markdown 代码块指定一种语言，除非没有关联的语言。</li>
<li>请在中文和英文单词之间插入空格。</li>
<li>请使用正确的技术术语大小写，例如使用 HTTP 而不是 http，使用 MySQL 而不是 mysql，使用 Kubernetes 而不是 kubernetes 等。</li>
<li>请在提交 PR 之前检查文档中是否有任何拼写错误。</li>
</ol>
<p>您还可以查看<a href="https://docusaurus.io/docs/markdown-features" target="_blank" rel="noopener noreferrer">docusaurus<ExternalLinkIcon/></a>，以编写具有更丰富功能的文档。</p>
<p><strong>1. 将“远程上游”设置为</strong>使用以下两个命令：<code v-pre>https://github.com/labring/sealos.git</code></p>
<blockquote>
<p><a href="https://github.com/cubxxw/awesome-cs-course/blob/master/Git/markdown/git-adds.md" target="_blank" rel="noopener noreferrer">🧷 git添加远程仓库的两种方式<ExternalLinkIcon/></a></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> remote <span class="token function">add</span> upstream https://github.com/labring/sealos.git
<span class="token function">git</span> remote set-url <span class="token parameter variable">--push</span> upstream no-pushing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>使用此远程设置，您可以像这样检查 git 远程配置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> remote <span class="token parameter variable">-v</span>
origin     https://github.com/<span class="token operator">&lt;</span>your-username<span class="token operator">></span>/sealos.git <span class="token punctuation">(</span>fetch<span class="token punctuation">)</span>
origin     https://github.com/<span class="token operator">&lt;</span>your-username<span class="token operator">></span>/sealos.git <span class="token punctuation">(</span>push<span class="token punctuation">)</span>
upstream   https://github.com/labring/sealos.git <span class="token punctuation">(</span>fetch<span class="token punctuation">)</span>
upstream   no-pushing <span class="token punctuation">(</span>push<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>添加此内容，我们可以轻松地将本地分支与上游分支同步。</p>
<p><img src="http://sm.nsddd.top/smimage-20221019162733226.png" alt="image-20221019162733226"></p>
<p><strong>2. 创建分支</strong>以添加新功能或修复问题</p>
<p>更新本地工作目录和远程分叉存储库：</p>
<blockquote>
<p>推荐使用<code v-pre>fetch</code>：从安全角度出发，<code v-pre>git fetch</code>比<code v-pre>git pull</code>更安全，因为我们可以先比较本地与远程的区别后，选择性的合并。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> sealos
<span class="token function">git</span> fetch upstream
<span class="token function">git</span> checkout main
<span class="token function">git</span> rebase upstream/main
<span class="token function">git</span> push	<span class="token comment"># default origin, update your forked repository</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建新分支：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git checkout -b bug-xiongxinwei
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>对然后构建和测试代码进行任何更改。<code v-pre>new-branch</code></p>
<blockquote>
<p>推荐的命名规则：</p>
<div class="language-asciiarmor ext-asciiarmor line-numbers-mode"><pre v-pre class="language-asciiarmor"><code>分支:		命名:		说明:
 
主分支		master		主分支，所有提供给用户使用的正式版本，都在这个主分支上发布
开发分支		dev 		开发分支，永远是功能最新最全的分支
功能分支		feature-*	新功能分支，某个功能点正在开发阶段
发布版本		release-*	发布定期要上线的功能
修复分支		bug-*		修复线上代码的 bug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p><img src="http://sm.nsddd.top/smimage-20221019164941695.png" alt="image-20221019164941695"></p>
<p><strong>3. 将分支推送</strong>到分叉的存储库，尽量不要在 pr 中生成多个提交消息。</p>
<blockquote>
<p><code v-pre>git commit -a -s -m &quot;message for your changes&quot;</code></p>
<ul>
<li><code v-pre>-a</code> 参数设置修改文件后不需要执行 <code v-pre>git add</code> 命令，直接来提交</li>
<li><code v-pre>-s</code> 表示添加了一个签名，加入了自己的信息</li>
</ul>
<p><img src="http://sm.nsddd.top/smimage-20221019190552361.png" alt="image-20221019190552361"></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>golangci-lint run <span class="token parameter variable">-c</span> .golangci.yml <span class="token comment"># lint</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
<span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">"message for your changes"</span> <span class="token comment"># -a is git add ., -s adds a Signed-off-by trailer</span>
<span class="token function">git</span> rebase <span class="token parameter variable">-i</span>	<span class="token operator">&lt;</span>commit-id<span class="token operator">></span>  <span class="token comment"># 如果你的pr有多次提交</span>
<span class="token function">git</span> push   <span class="token comment"># 在rebase完成后推送到分叉库，如果是第一次推送，运行git push --set-upstream origin &lt;new-branch></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221019190409127.png" alt="image-20221019190409127"></p>
<blockquote>
<p>为每个 Markdown 代码块指定一种语言，除非没有关联的语言。</p>
</blockquote>
<p>如果不想使用 ，可以使用<code v-pre>git rebase -i</code>、<code v-pre>git commit -s --amend &amp;&amp; git push -f</code></p>
<p>如果在同一分支中开发多个功能，则应重定主分支的基调：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># create new branch, for example git checkout -b feature/infra</span>
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> <span class="token operator">&lt;</span>new branch<span class="token operator">></span>
<span class="token comment"># update some code, feature1</span>
<span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token parameter variable">-s</span> <span class="token string">"init infra"</span>
<span class="token function">git</span> push <span class="token comment"># if it's first time push, run git push --set-upstream origin &lt;new-branch></span>
<span class="token comment"># then create pull request, and merge</span>
<span class="token comment"># update some new feature, feature2, rebase main branch first.</span>
<span class="token function">git</span> rebase upstream/main
<span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token parameter variable">-s</span> <span class="token string">"init infra"</span>
<span class="token comment"># then create pull request, and merge</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提交拉取请求给主分支：</strong></p>
<p><img src="http://sm.nsddd.top/smimage-20221019192522791.png" alt="image-20221019192522791"></p>
<h2 id="使用-sealos-快速构建-kubernetes" tabindex="-1"><a class="header-anchor" href="#使用-sealos-快速构建-kubernetes" aria-hidden="true">#</a> 使用 sealos 快速构建 kubernetes</h2>
<blockquote>
<p>⚠️ 安装注意事项：</p>
<ol>
<li>需要<strong>纯净版</strong>Linux系统 <code v-pre>ubuntu16.04</code>，<code v-pre>centos7</code></li>
<li>版本使用新版，<strong>用新不用旧</strong></li>
<li>必须同步服务器时间</li>
<li>主机名不可重复</li>
<li>master结点CPU必须2C以上</li>
<li>cni组件选择<code v-pre>cilium</code>时要求内核版本不低于5.4</li>
</ol>
</blockquote>
<ul>
<li>[x] <a href="https://github.com/labring/sealos/blob/main/DEVELOPGUIDE.md" target="_blank" rel="noopener noreferrer">快速搭建指南<ExternalLinkIcon/></a></li>
</ul>
<p><code v-pre>sealos</code>现在只支持<code v-pre>linux</code>，需要<code v-pre>linux</code>服务器来测试。</p>
<p>一些工具可以非常方便地帮助您启动虚拟机，例如<a href="https://multipass.run/" target="_blank" rel="noopener noreferrer">multipass<ExternalLinkIcon/></a></p>
<h3 id="构建项目" tabindex="-1"><a class="header-anchor" href="#构建项目" aria-hidden="true">#</a> 构建项目</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /sealos <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /sealos <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> clone https://github.com/labring/sealos <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> sealos <span class="token operator">&amp;&amp;</span> <span class="token function">ls</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> build  <span class="token comment"># 大概可能因为网络原因需要等一段时间~</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您可以将 <code v-pre>bin</code> 文件 <code v-pre>scp</code> 到您的 <code v-pre>linux</code> 主机。</p>
<p>如果你使用 <code v-pre>multipaas</code>，你可以将 <code v-pre>bin</code> 目录挂载到 <code v-pre>vm</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>multipass <span class="token function">mount</span> /your-bin-dir <span class="token operator">&lt;</span>name<span class="token operator">></span><span class="token punctuation">[</span>:<span class="token operator">&lt;</span>path<span class="token operator">></span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在本地测试。</p>
<blockquote>
<p><strong>⚠️ 注意：</strong></p>
<p>所有二进制文件都<code v-pre>sealos</code>可以在任何地方构建，因为它们有<code v-pre>CGO_ENABLED=0</code>. 但是，在运行一些依赖于 CGO 的<code v-pre>sealos</code>子命令时，需要支持覆盖驱动程序。<code v-pre>images</code>因此，在构建时会打开 CGO <code v-pre>sealos</code>，从而无法<code v-pre>sealos</code>在 Linux 以外的平台上构建二进制文件。</p>
<ul>
<li>本项目中的 <code v-pre>Makefile</code> 和 <code v-pre>GoReleaser</code> 都有这个设置。</li>
</ul>
<h2 id="install-golang" tabindex="-1"><a class="header-anchor" href="#install-golang" aria-hidden="true">#</a> Install golang</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://go.dev/dl/go1.19.2.linux-amd64.tar.gz
<span class="token function">tar</span> <span class="token parameter variable">-C</span> /usr/local <span class="token parameter variable">-zxvf</span> go1.19.2.linux-amd64.tar.gz
<span class="token function">cat</span> <span class="token operator">>></span> /etc/profile <span class="token operator">&lt;&lt;</span><span class="token string">EOF
# set go path
export PATH=\<span class="token environment constant">$PATH</span>:/usr/local/go/bin
EOF</span>
<span class="token builtin class-name">source</span> /etc/profile  <span class="token operator">&amp;&amp;</span> go version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="build-the-project" tabindex="-1"><a class="header-anchor" href="#build-the-project" aria-hidden="true">#</a> Build the project</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone https://github.com/labring/sealos &amp;&amp; cd sealos
make build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<hr>
<p>😂 让我很喜欢的一点是：<code v-pre>sealos</code>能一次性把环境搭建好，想当年，我真是废了九牛二虎之力才搭建~失败的。</p>
<p><img src="http://sm.nsddd.top/smimage-20221019194939030.png" alt="image-20221019194939030"></p>
<h3 id="远程连接" tabindex="-1"><a class="header-anchor" href="#远程连接" aria-hidden="true">#</a> 远程连接</h3>
<ul>
<li>[x] <a href="https://github.com/cubxxw/awesome-cs-course/blob/master/linux/linux-web/7.md" target="_blank" rel="noopener noreferrer">远程连接 &amp; 免密远程~文档<ExternalLinkIcon/></a></li>
</ul>
<h3 id="遇到的坑和解决方案" tabindex="-1"><a class="header-anchor" href="#遇到的坑和解决方案" aria-hidden="true">#</a> 遇到的坑和解决方案</h3>
<ul>
<li>centos服务器不推荐使用（建议使用ubuntu)</li>
<li>go版本最好<code v-pre>&gt;18</code></li>
</ul>
<h2 id="使用-sealos-快速构建-kubernetes-1" tabindex="-1"><a class="header-anchor" href="#使用-sealos-快速构建-kubernetes-1" aria-hidden="true">#</a> 使用 sealos 快速构建 kubernetes</h2>
<ul>
<li>[x] <a href="https://github.com/labring/sealos#quickstart" target="_blank" rel="noopener noreferrer">sealos构建k8s指南<ExternalLinkIcon/></a></li>
</ul>
<h3 id="添加到环境变量" tabindex="-1"><a class="header-anchor" href="#添加到环境变量" aria-hidden="true">#</a> 添加到环境变量</h3>
<blockquote>
<p><code v-pre>sealos</code>位置<code v-pre>/sealos/*</code></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:/sealos/bin/linux_amd64/
<span class="token comment">#export PATH=/usr/local/bin:$PATH</span>
// <span class="token environment constant">PATH</span>是变量名，这里是指添加到<span class="token environment constant">PATH</span>这个环境变量中
// <span class="token operator">=</span>后面是要添加的环境变量
// <span class="token builtin class-name">:</span><span class="token environment constant">$PATH</span>是指把新添加的环境变量与原先的环境变量重新赋值给<span class="token environment constant">PATH</span>这个变量，这里可以看出如果有多个环境变量时，应该使用:进行分隔，如
// <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span>/usr/local/php/bin:/usr/local/mysql/bin:<span class="token environment constant">$PATH</span>
// 当然<span class="token environment constant">$PATH</span>是放在开头还是最后是没有影响的
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种方法添加的环境变量会立即生效，但是在窗口关闭后便会失效</strong></p>
<p>⬇️ 添加全局变量方法：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">vim</span> /etc/profile
// 如果只修改当前用户的环境变量，则是<span class="token variable"><span class="token variable">`</span><span class="token function">vim</span> ~/.bashrc<span class="token variable">`</span></span>
// 在文件的最后一行添加以下代码：
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span>:/usr/local/php/bin
// 规则和用法如第二条所说
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⚔️ 快捷：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/profile <span class="token operator">&lt;&lt;</span><span class="token string">EOF
# set go path
export PATH=\<span class="token environment constant">$PATH</span>:/usr/local/go/bin
EOF</span>

<span class="token builtin class-name">echo</span> <span class="token string">"source /etc/profile"</span> <span class="token operator">>></span> ~/.bashrc  <span class="token comment">#auto update  </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⚡验证：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@VM-4-3-ubuntu:/<span class="token comment"># sealos version</span>
<span class="token punctuation">{</span><span class="token string">"gitVersion"</span><span class="token builtin class-name">:</span><span class="token string">"untagged"</span>,<span class="token string">"gitCommit"</span><span class="token builtin class-name">:</span><span class="token string">"b24684f6"</span>,<span class="token string">"buildDate"</span><span class="token builtin class-name">:</span><span class="token string">"2022-10-20T19:20:05+0800"</span>,<span class="token string">"goVersion"</span><span class="token builtin class-name">:</span><span class="token string">"go1.19.2"</span>,<span class="token string">"compiler"</span><span class="token builtin class-name">:</span><span class="token string">"gc"</span>,<span class="token string">"platform"</span><span class="token builtin class-name">:</span><span class="token string">"linux/amd64"</span><span class="token punctuation">}</span>
root@VM-4-3-ubuntu:/<span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="k8s入门文档" tabindex="-1"><a class="header-anchor" href="#k8s入门文档" aria-hidden="true">#</a> k8s入门文档</h2>
<ul>
<li>[x] <a href="https://kubernetes.io/docs/tutorials/kubernetes-basics/" target="_blank" rel="noopener noreferrer">官方入门文档<ExternalLinkIcon/></a></li>
</ul>
<h3 id="docker、k8s、云原生笔记" tabindex="-1"><a class="header-anchor" href="#docker、k8s、云原生笔记" aria-hidden="true">#</a> docker、k8s、云原生笔记</h3>
<ul>
<li>[x] <a href="https://docker.nsddd.top" target="_blank" rel="noopener noreferrer">docker.nsddd.top<ExternalLinkIcon/></a></li>
</ul>
<h3 id="任务块" tabindex="-1"><a class="header-anchor" href="#任务块" aria-hidden="true">#</a> 任务块</h3>
<ul>
<li>
<p>基本使用：</p>
<ul>
<li>创建一个 <code v-pre>pod</code> 并理解什么是 <code v-pre>pod</code>   ➡️  <a href="https://docker.nsddd.top/Cloud-Native-k8s/9.html" target="_blank" rel="noopener noreferrer">🧷记录<ExternalLinkIcon/></a></li>
<li>创建一个 <code v-pre>deployment</code> 理解 <code v-pre>deployment</code> 与 <code v-pre>pod</code> 的关系  ➡️  <a href="https://docker.nsddd.top/Cloud-Native-k8s/10.html" target="_blank" rel="noopener noreferrer">🧷记录<ExternalLinkIcon/></a></li>
<li>创建一个 <code v-pre>configmap</code>， 理解挂载配置文件给 <code v-pre>pod</code>  ➡️  <a href="https://docker.nsddd.top/Cloud-Native-k8s/13.html" target="_blank" rel="noopener noreferrer">🧷记录<ExternalLinkIcon/></a></li>
<li>创建一个 <code v-pre>service</code>，通过 <code v-pre>service</code> 在集群内访问 <code v-pre>pod</code>  ➡️  <a href="https://docker.nsddd.top/Cloud-Native-k8s/11.html" target="_blank" rel="noopener noreferrer">🧷记录<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>
<p>核心概念，核心组件的作用：</p>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token code-snippet code keyword">`kubectl apiserver controller-manager scheduler kubelet kube-proxy etcd`</span>  
<span class="token blockquote punctuation">></span>这些组件分别是做什么的?

<span class="token list punctuation">+</span> 可以想象sealos很久之后形成的一个集团😂 
<span class="token list punctuation">+</span> 我们有很多的厂，master主厂，node小厂
<span class="token blockquote punctuation">></span> Node节点主要包括kubelet、kube-proxy模块和pod对象
<span class="token blockquote punctuation">></span> Master节点主要包括API Server、Scheduler、Controller manager、etcd几大组件

<span class="token list punctuation">+</span> kubectl 是 Kubernetes 自带的客户端，可以用它来直接操作 Kubernetes 集群。
<span class="token list punctuation">+</span> Api Server相当于master的秘书，master和node的所有通信都需要走Api Server
<span class="token list punctuation">+</span> controller-manager就是老大，是公司的决策者，负责集群内 Node、Namespace、Service、Token、Replication 等资源对象的管理，使集群内的资源对象维持在预期的工作状态。
<span class="token list punctuation">+</span> scheduler就是调度者，如果我们小厂有东西做不出来那么需要scheduler负责对集群内部的资源进行调度，相当于“调度室”。

<span class="token list punctuation">+</span> kubelet 就是小厂的厂长，对每个node进行操控
<span class="token list punctuation">+</span> <span class="token list punctuation">+</span> kubelet 组件通过 api-server 提供的接口监测到 kube-scheduler 产生的 pod 绑定事件，然后从 etcd 获取 pod 清单，下载镜像并启动容器。
<span class="token list punctuation">+</span> <span class="token list punctuation">+</span> 同时监视分配给该Node节点的 pods，周期性获取容器状态，再通过api-server通知各个组件。
<span class="token list punctuation">+</span> kube-proxy这个就好理解了，就相当于sealos下面每个厂的门卫大爷，集团可能不知道哪个资源在哪个厂，但是门卫大爷肯定知道啊，所以各个node的kube-proxy是相通的。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>Kube-proxy</code>负责制定数据包的转发策略，并以守护进程的模式对各个节点的<code v-pre>pod</code>信息实时监控并更新转发规则，<code v-pre>service</code>收到请求后会根据<code v-pre>kube-proxy</code>制定好的策略来进行请求的转发，从而实现负载均衡。</p>
</blockquote>
<p>可以用一个 <code v-pre>kubectl apply</code> 一个 <code v-pre>deployment</code> 这些组件分别做了哪些事来梳理整个流程</p>
</li>
</ul>
<p><strong>what is <code v-pre>pod</code>？</strong></p>
<ul>
<li><a href="https://docker.nsddd.top/Cloud-Native-k8s/9.html#%E4%BF%AE%E6%94%B9pod" target="_blank" rel="noopener noreferrer">🧷 Go to cub to learn pod <ExternalLinkIcon/></a></li>
</ul>
<p>Pod is the smallest scheduling unit in <code v-pre>Kubernetes</code>. A Pod encapsulates a container (or multiple containers). Containers in a Pod share storage, network, etc. That is, you can think of the entire pod as a virtual machine, and then each container is equivalent to a process running on the virtual machine. All containers in the same pod are scheduled and scheduled uniformly.</p>
<blockquote>
<p>在<code v-pre>Kubernetes</code>中部署应用时，都是以<code v-pre>pod</code>进行调度的，它们基本上是单个容器的包装或房子。从某种意义上说，容器的容器。 <code v-pre>pod</code>是一个逻辑包装实体，用于在<code v-pre>K8s</code>集群上执行容器。可以把每个<code v-pre>pod</code>想象成一个透明的包装，为容器提供一个插槽。<code v-pre>pod</code>是<code v-pre>Kubernetes</code>最小的可部署单位。<code v-pre>pod</code>是一组一个或多个容器，具有共享的存储/网络资源，以及如何运行容器的规范。因此，最简单地说，<code v-pre>pod</code>是一个容器如何在<code v-pre>Kubernetes</code>中“用起来”的机制。</p>
<ol>
<li>
<p>pod是k8s的最小单元，容器包含在pod中，一个pod中有一个pause容器和若干个业务容器，而容器是单独的一个容器，简而言之，pod是一组容器的集合。</p>
</li>
<li>
<p>pod相当于逻辑主机，每个pod都有自己的ip地址</p>
</li>
<li>
<p><strong>pod内的容器共享相同的ip和端口</strong></p>
</li>
<li>
<p>默认情况下，每个容器的文件系统与其他容器完全隔离</p>
</li>
</ol>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#创建一个名为nginx-learn的pod，暴露容器端口为80.</span>
root@VM-4-3-ubuntu:/<span class="token comment"># kubectl get node -A</span>
root@VM-4-3-ubuntu:/<span class="token comment"># kubectl run nginx-learn  --image=nginx:latest --image-pull-policy='IfNotPresent'  --port=80</span>
pod/nginx-learn created
root@VM-4-3-ubuntu:/<span class="token comment"># kubectl get node -A</span>
NAME            STATUS   ROLES           AGE   VERSION
vm-4-3-ubuntu   Ready    control-plane   24h   v1.25.0
root@VM-4-3-ubuntu:/<span class="token comment"># kubectl get pod</span>
NAME          READY   STATUS    RESTARTS   AGE
nginx-learn   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          58s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>delect the pod：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@VM-4-3-ubuntu:/<span class="token comment"># kubectl get pod</span>
NAME          READY   STATUS    RESTARTS   AGE
nginx-learn   <span class="token number">1</span>/1     Running   <span class="token number">0</span>          58s
root@VM-4-3-ubuntu:/<span class="token comment"># kubectl delete pod nginx-learn</span>
pod <span class="token string">"nginx-learn"</span> deleted
root@VM-4-3-ubuntu:/<span class="token comment"># kubectl get pod</span>
No resources found <span class="token keyword">in</span> default namespace.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>kubectl创建和删除一个pod相关操作：</strong></p>
<table>
<thead>
<tr>
<th><strong>命令</strong></th>
<th><strong>说明</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>run</td>
<td>在集群上运行一个pod</td>
</tr>
<tr>
<td>create</td>
<td>使用文件或者标准输入的方式创建一个pod</td>
</tr>
<tr>
<td>delete</td>
<td>使用文件或者标准输入来删除某个pod</td>
</tr>
</tbody>
</table>
<p><strong>create deployment：</strong></p>
<blockquote>
<p>Pod是单一亦或一组容器的合集</p>
<p>Pod是k8s的最小调度单位，一个Pod中可以有多个containers，彼此共享网络等，这是k8s的核心概念。</p>
<p><strong>deployment是pod版本管理的工具 用来区分不同版本的pod</strong></p>
<p>从开发者角度看，deployment顾明思意，既部署，对于完整的应用部署流程，除了运行代码(既pod)之外，需要考虑更新策略，副本数量，回滚，重启等步骤，</p>
<p>deployment，StatefulSet是Controller，保证Pod一直运行在你需要的状态。</p>
<p>有一次性的也就是job，有定时执行的也就是crontabjob，有排号的也就是sts</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl run nginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p><a href="https://so.csdn.net/so/search?q=nginx&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">nginx<ExternalLinkIcon/></a>：应用名称</p>
<p><code v-pre>--replicas</code>：指定应用运行的 pod 副本数</p>
<p><code v-pre>--image</code>：使用的镜像（默认从dockerhub拉取）</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl get deployment 或者 kubectl get deploy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看 replicaset：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get replicaset 或者 kubectl get rs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看 pod：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get pods <span class="token parameter variable">-o</span> wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>create configMap：</strong></p>
<p>可以使用 <code v-pre>kubectl create configmap</code> 或者在 <code v-pre>kustomization.yaml</code> 中的 ConfigMap 生成器来创建 ConfigMap</p>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>kubectl create configmap &lt;映射名称> &lt;数据源>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，<code v-pre>&lt;映射名称&gt;</code> 是为 ConfigMap 指定的名称，<code v-pre>&lt;数据源&gt;</code> 是要从中提取数据的目录、 文件或者字面值。ConfigMap 对象的名称必须是合法的 <a href="https://kubernetes.io/zh-cn/docs/concepts/overview/working-with-objects/names#dns-subdomain-names" target="_blank" rel="noopener noreferrer">DNS 子域名<ExternalLinkIcon/></a>。</p>
<h3 id="多结点" tabindex="-1"><a class="header-anchor" href="#多结点" aria-hidden="true">#</a> 多结点</h3>
<p>sealos现在只支持linux，需要linux服务器来测试。</p>
<p>一些工具可以非常方便地帮助您启动虚拟机，例如<a href="https://multipass.run/" target="_blank" rel="noopener noreferrer">multipass<ExternalLinkIcon/></a></p>
<h3 id="构建项目-1" tabindex="-1"><a class="header-anchor" href="#构建项目-1" aria-hidden="true">#</a> 构建项目</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> /sealos <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /sealos <span class="token operator">&amp;&amp;</span> <span class="token function">git</span> clone https://github.com/labring/sealos <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> sealos <span class="token operator">&amp;&amp;</span> <span class="token function">ls</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> build  <span class="token comment"># 大概可能因为网络原因需要等一段时间~</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您可以将 <code v-pre>bin</code> 文件 <code v-pre>scp</code> 到您的 <code v-pre>linux</code> 主机。</p>
<p>如果你使用 <code v-pre>multipaas</code>，你可以将 <code v-pre>bin</code> 目录挂载到 <code v-pre>vm</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>multipass <span class="token function">mount</span> /your-bin-dir <span class="token operator">&lt;</span>name<span class="token operator">></span><span class="token punctuation">[</span>:<span class="token operator">&lt;</span>path<span class="token operator">></span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后在本地测试。</p>
<blockquote>
<p><strong>⚠️ 注意：</strong></p>
<p>所有二进制文件都<code v-pre>sealos</code>可以在任何地方构建，因为它们有<code v-pre>CGO_ENABLED=0</code>. 但是，在运行一些依赖于 CGO 的<code v-pre>sealos</code>子命令时，需要支持覆盖驱动程序。<code v-pre>images</code>因此，在构建时会打开 CGO <code v-pre>sealos</code>，从而无法<code v-pre>sealos</code>在 Linux 以外的平台上构建二进制文件。</p>
<ul>
<li>本项目中的 <code v-pre>Makefile</code> 和 <code v-pre>GoReleaser</code> 都有这个设置。</li>
</ul>
</blockquote>
<hr>
<p>😂 让我很喜欢的一点是：<code v-pre>sealos</code>能一次性把环境搭建好，想当年，我真是废了九牛二虎之力才搭建~失败的。</p>
<p><img src="http://sm.nsddd.top/smimage-20221019194939030.png" alt="image-20221019194939030"></p>
<h2 id="核心服务快速启动" tabindex="-1"><a class="header-anchor" href="#核心服务快速启动" aria-hidden="true">#</a> 核心服务快速启动</h2>
<p><strong>💡 重新把昨天集群全部删除，新开三台服务器，纯新~</strong></p>
<p><img src="http://sm.nsddd.top/smimage-20221021151347038.png" alt="image-20221021151347038"></p>
<h3 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h3>
<blockquote>
<p>⚠️ 注意：环境一定很重要，不然都跑不起来~</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>hostnamectl set-hostname k8s-master01
hostnamectl set-hostname k8s-master02
hostnamectl set-hostname k8s-master03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>虚拟机需要配置静态IP</strong></p>
</blockquote>
<h3 id="查看内核版本" tabindex="-1"><a class="header-anchor" href="#查看内核版本" aria-hidden="true">#</a> 查看内核版本</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下载并安装 sealos, sealos 是个 golang 的二进制工具，直接下载拷贝到 bin 目录即可, release 页面也可下载 </span>
yum <span class="token function">install</span> <span class="token function">wget</span> <span class="token operator">&amp;&amp;</span> yum <span class="token function">install</span> <span class="token function">tar</span> <span class="token operator">&amp;&amp;</span><span class="token punctuation">\</span>
<span class="token function">wget</span>  https://github.com/labring/sealos/releases/download/v4.1.3/sealos_4.1.3_linux_amd64.tar.gz  <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
<span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> sealos_4.1.3_linux_amd64.tar.gz sealos <span class="token operator">&amp;&amp;</span>  <span class="token function">chmod</span> +x sealos <span class="token operator">&amp;&amp;</span> <span class="token function">mv</span> sealos /usr/bin 
<span class="token comment"># 创建一个集群</span>
sealos run labring/kubernetes:v1.25.0 labring/helm:v3.8.2 labring/calico:v3.24.1 <span class="token punctuation">\</span>
     <span class="token parameter variable">--masters</span> <span class="token number">192.168</span>.0.2,192.168.0.3<span class="token punctuation">\</span>
     <span class="token parameter variable">--nodes</span> <span class="token number">192.168</span>.0.4 <span class="token parameter variable">-p</span> <span class="token punctuation">[</span>your-ssh-passwd<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>-p</code>：passwd密码</p>
<p>开启ssh免密不需要些密码了，在这里就实现了。</p>
<p><img src="https://sm.nsddd.top/smimage-20221020111912006.png" alt="image-20221020111912006"></p>
</blockquote>
<p><img src="https://sm.nsddd.top/smimage-20221020105230320.png" alt="image-20221020105230320"></p>
<p><strong>验证集群：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://sm.nsddd.top/smimage-20221020113615770.png" alt="image-20221020113615770"></p>
<h3 id="单节点" tabindex="-1"><a class="header-anchor" href="#单节点" aria-hidden="true">#</a> 单节点</h3>
<blockquote>
<p>Single host</p>
<ul>
<li>You can use <code v-pre>multipass</code> to start multiple virtual machines from one machine</li>
<li>Recent releases also support the ——<code v-pre>Single</code> mode single-machine deployment</li>
</ul>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ sealos run labring/kubernetes:v1.25.0 labring/helm:v3.8.2 labring/calico:v3.24.1 <span class="token parameter variable">--single</span>
<span class="token comment"># remove taint</span>
$ kubectl taint <span class="token function">node</span> <span class="token parameter variable">--all</span> node-role.kubernetes.io/control-plane-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://sm.nsddd.top/smimage-20221020212025716.png" alt="image-20221020212025716"></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<div><a href = '../README.md' style='float:left'>⬆️主目录🔗  </a><a href = '2.md' style='float: right'>  ⬇️下一节🔗</a></div>
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
