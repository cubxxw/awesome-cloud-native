<template><div><h1 id="_114-深入刨析-github-crl" tabindex="-1"><a class="header-anchor" href="#_114-深入刨析-github-crl" aria-hidden="true">#</a> 114: 深入刨析 Github CRL</h1>
<p>GitHub 地址：https://github.com/cli/cli</p>
<h2 id="项目布局" tabindex="-1"><a class="header-anchor" href="#项目布局" aria-hidden="true">#</a> 项目布局</h2>
<p>Github CTL (gh) 学习对后面的 GitHub actions 来说，帮助是非常大的，尤其是学会 gh 的开发，通过调用 gh 进而调用 GitHub api，对我们来说也是帮助很大。</p>
<ul>
<li><code v-pre>cmd/</code> - <code v-pre>main</code> 用于构建二进制文件（如 <code v-pre>gh</code> 可执行文件）的软件包</li>
<li><code v-pre>pkg/</code> -大多数其他软件包，包括单个gh命令的实现</li>
<li><code v-pre>docs/</code> -面向维护者和贡献者的文档</li>
<li><code v-pre>script/</code> -构建和发布脚本</li>
<li><code v-pre>internal/</code> - Go软件包高度特定于我们的需求，因此是内部的</li>
<li><code v-pre>go.mod</code> -此项目的外部Go依赖项，由Go在构建时自动获取</li>
</ul>
<p>由于历史原因，一些辅助的Go包位于项目的顶层：</p>
<ul>
<li><code v-pre>api/</code> -向GitHub API发出请求的主要实用程序</li>
<li><code v-pre>context/</code> -弃用：仅用于引用git远程</li>
<li><code v-pre>git/</code> -从本地git仓库收集信息的实用程序</li>
<li><code v-pre>test/</code> -弃用：不使用</li>
<li><code v-pre>utils/</code> -弃用：仅用于打印表输出</li>
</ul>
<p><strong>为什么要学习 gh ，第二个因素</strong></p>
<p>OpenIM 也需要做一个 imctl，其实是和 gh 类似的，就和 kubernetes 的 kubeadm 与 client-go 的关系一样。OpenIM 需要先调用 core sdk 客户端进而掌控 OpenIM ，所以 imctl 的定位就绕不开 gh  了。</p>
<h2 id="上手" tabindex="-1"><a class="header-anchor" href="#上手" aria-hidden="true">#</a> 上手</h2>
<p>和其他项目一样，第一步先从项目的编译开始，我们阅读 Makefile 文件：</p>
<p>本质上，实际上：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@PS2023EVRHNCXG:~/workspaces/cubxxw/cli<span class="token comment"># make</span>
<span class="token assign-left variable">GOOS</span><span class="token operator">=</span> <span class="token assign-left variable">GOARCH</span><span class="token operator">=</span> <span class="token assign-left variable">GOARM</span><span class="token operator">=</span> <span class="token assign-left variable">GOFLAGS</span><span class="token operator">=</span> <span class="token assign-left variable">CGO_ENABLED</span><span class="token operator">=</span> go build <span class="token parameter variable">-o</span> script/build script/build.go
go build <span class="token parameter variable">-trimpath</span> <span class="token parameter variable">-ldflags</span> <span class="token string">"-X github.com/cli/cli/v2/internal/build.Date=2023-08-24 -X github.com/cli/cli/v2/internal/build.Version=v2.33.0 "</span> <span class="token parameter variable">-o</span> bin/gh ./cmd/gh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><code v-pre>go run script/build.go</code> -确保获取所有外部Go依赖项，然后将 <code v-pre>cmd/gh/main.go</code> 文件编译为 <code v-pre>bin/gh</code> 二进制文件。</p>
</li>
<li>
<p><code v-pre> gh auth login</code> 认证，使用 Github Token</p>
</li>
<li>
<p><code v-pre>bin/gh issue list --limit 5</code> -运行新构建的 <code v-pre>bin/gh</code> 二进制文件（注意：在Windows上，您必须使用反斜杠（如 <code v-pre>bin\gh</code> ），并将以下参数传递给进程：三号。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@PS2023EVRHNCXG:~/workspaces/cubxxw/cli<span class="token comment"># bin/gh issue list --limit 5</span>

Showing <span class="token number">5</span> of <span class="token number">431</span> <span class="token function">open</span> issues <span class="token keyword">in</span> cli/cli

<span class="token comment">#7889  add "--all" flag to gh alias delete command                             enhancement, needs-triage  about 18 hours ago</span>
<span class="token comment">#7885  gh pr checks &lt;pr-id> --watch: "something went wrong "                   bug, needs-triage          about 1 day ago</span>
<span class="token comment">#7883  Add JSON Output Option to `gh workflow list`                            enhancement, help wanted   about 18 hours ago</span>
<span class="token comment">#7881  `gh repo list &lt;user> --json parent` fails with SAML error               bug, needs-triage          about 2 days ago</span>
<span class="token comment">#7875  Fined Grained API Token are not supported since 2022 that they are out  bug, needs-user-input      about 2 days ago</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>cmd/gh/main.go</code> 中的 <code v-pre>func main()</code> 是第一个运行的Go函数。传递给进程的参数可通过 <code v-pre>os.Args</code> 获得。</p>
</li>
<li>
<p><code v-pre>main</code> 包使用 <code v-pre>root.NewCmdRoot()</code> 初始化“root”命令，并使用 <code v-pre>rootCmd.ExecuteC()</code> 将执行分派给它。</p>
</li>
<li>
<p>根命令代表顶层的 <code v-pre>gh</code> 命令，并且知道如何将执行分派给嵌套在它下面的任何其他gh命令。</p>
</li>
<li>
<p>基于 <code v-pre>[&quot;issue&quot;, &quot;list&quot;]</code> 参数，执行到达pkg/cmd/issue/list/list. go中 <code v-pre>cobra.Command</code> 的 <code v-pre>RunE</code> 块。</p>
</li>
<li>
<p>最初作为参数传递的 <code v-pre>--limit 5</code> 标志被自动解析，其值存储为 <code v-pre>opts.LimitResults</code> 。</p>
</li>
<li>
<p>调用 <code v-pre>func listRun()</code> ，负责实现 <code v-pre>gh issue list</code> 命令的逻辑。</p>
</li>
<li>
<p>该命令从GitHub API等来源收集信息，然后将最终输出写入标准输出和标准错误流，可在 <code v-pre>opts.IO</code> 中获得。</p>
</li>
<li>
<p>程序执行现在回到 <code v-pre>cmd/gh/main.go</code> 的 <code v-pre>func main()</code> 。如果在处理命令时出现任何Go错误，则函数将以非零退出状态中止该过程。否则，该过程以指示成功的状态0结束。</p>
</li>
</ol>
<h2 id="如何添加新命令" tabindex="-1"><a class="header-anchor" href="#如何添加新命令" aria-hidden="true">#</a> 如何添加新命令</h2>
<p>这个问题很有意思，因为 imctl 将会用 <code v-pre>imctl new</code> 去做一个新的命名出来，而对于 gh 来说，虽然看上去很不爽，但是他们的代码模块还是很优雅的。</p>
<ol>
<li>为新命令创建一个包，例如对于新命令 <code v-pre>gh boom</code> ，创建以下目录结构： <code v-pre>pkg/cmd/boom/</code></li>
<li>新的包应该公开一个方法，例如 <code v-pre>NewCmdBoom()</code> ，它接受 <code v-pre>*cmdutil.Factory</code> 类型并返回 <code v-pre>*cobra.Command</code> 。
<ol>
<li>任何特定于此命令的逻辑都应该保留在命令的包中，而不是添加到任何“全局”包中，如 <code v-pre>api</code> 或 <code v-pre>utils</code> 。</li>
</ol>
</li>
<li>使用上一步中的方法生成命令并将其添加到命令树中，通常在 <code v-pre>NewCmdRoot()</code> 方法中。</li>
</ol>
<p><strong>参与一个 gh 命令行工具的开发，肯定是少不了 new command 的，那么与此同时，如何做好测试显得尤为重要。</strong></p>
<p>通常情况下，gh命令会执行以下操作：</p>
<ol>
<li>从当前目录中的git存储库中查找信息</li>
<li>查询GitHub API</li>
<li>扫描用户的 <code v-pre>~/.ssh/config</code> 文件</li>
<li>克隆或获取git存储库等</li>
</ol>
<p>当然，在运行测试时，这些事情都不应该真实的发生，除非您确信任何文件系统操作都严格地限定在测试本身所创建和维护的位置。</p>
<p>为了避免实际运行诸如发出真实的的API请求或发送到 <code v-pre>git</code> 命令之类的事情，我们对它们进行了存根。您应该看看在一些现有测试中是如何做到这一点的。</p>
<p>要使代码可测试，请编写小的、独立的功能块，这些功能块被设计为组合在一起。在执行单个功能时，更喜欢使用表驱动测试来维护不同测试输入和期望的变化。</p>
</div></template>


