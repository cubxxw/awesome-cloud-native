<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第86节-gorelease" tabindex="-1"><a class="header-anchor" href="#第86节-gorelease" aria-hidden="true">#</a> 第86节 Gorelease</h1>
<div><a href = '85.md' style='float:left'>⬆️上一节🔗  </a><a href = '87.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<p>GoReleaser 的目标是自动化发布软件时的大部分无聊工作，最好使用合理的默认值并使最常见的用例变得简单。</p>
<p><strong>需要哪些东西：</strong></p>
<ul>
<li>
<p><code v-pre>.goreleaser.yaml</code><a href="https://goreleaser.com/customization" target="_blank" rel="noopener noreferrer">部分）<ExternalLinkIcon/></a></p>
<p>包含配置的文件（有关更多信息，请参阅自定义</p>
</li>
<li>
<p>一棵干净的工作树</p>
</li>
<li>
<p>SemVer 兼容版本（例如<code v-pre>10.21.34-prerelease+buildmeta</code>）</p>
</li>
</ul>
<p><strong>GoReleaser 运行分为 4 个主要步骤：</strong></p>
<ul>
<li><strong>defaulting</strong>：为每个步骤配置合理的默认值</li>
<li><strong>Building</strong>：构建二进制文件、档案、包、Docker 镜像等</li>
<li><strong>release</strong>：将版本发布到配置的 SCM、Docker 注册表、blob 存储...</li>
<li><strong>announcing</strong>：向配置的频道宣布您的发布</li>
</ul>
<p>使用 -like 标志可能会跳过某些步骤<code v-pre>--skip-foo</code></p>
<h2 id="quick-start" tabindex="-1"><a class="header-anchor" href="#quick-start" aria-hidden="true">#</a> <strong>Quick Start</strong></h2>
<p>运行<a href="https://goreleaser.com/cmd/goreleaser_init/" target="_blank" rel="noopener noreferrer">init<ExternalLinkIcon/></a>命令来创建示例<code v-pre>.goreleaser.yaml</code>文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>goreleaser init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，让我们运行一个“仅限本地”版本，看看它是否可以使用<a href="https://goreleaser.com/cmd/goreleaser_release/" target="_blank" rel="noopener noreferrer">release<ExternalLinkIcon/></a>命令运行：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>goreleaser release <span class="token punctuation">-</span><span class="token punctuation">-</span>snapshot <span class="token punctuation">-</span><span class="token punctuation">-</span>clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时，您可以<a href="https://goreleaser.com/customization/" target="_blank" rel="noopener noreferrer">自定义<ExternalLinkIcon/></a>生成的内容<code v-pre>.goreleaser.yaml</code>或保持原样，这取决于您。最佳做法是检查<code v-pre>.goreleaser.yaml</code>源代码控制。</p>
<p>您还可以使用 GoReleaser仅为给定的 GOOS/GOARCH<a href="https://goreleaser.com/cmd/goreleaser_build/" target="_blank" rel="noopener noreferrer">构建二进制文件，这对于本地开发很有用：<ExternalLinkIcon/></a></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>goreleaser build <span class="token punctuation">-</span><span class="token punctuation">-</span>single<span class="token punctuation">-</span>target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>需要用 Token:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>export GITHUB_TOKEN="YOUR_GH_TOKEN"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>GoReleaser 将使用您存储库的最新<a href="https://git-scm.com/book/en/v2/Git-Basics-Tagging" target="_blank" rel="noopener noreferrer">Git 标签<ExternalLinkIcon/></a>。</p>
<p>现在，创建一个标签并将其推送到 GitHub：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>git tag <span class="token punctuation">-</span>a v0.1.0 <span class="token punctuation">-</span>m "First release"
git push origin v0.1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在您可以在存储库的根目录运行 GoReleaser：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>goreleaser release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions" aria-hidden="true">#</a> github actions</h2>
<p>GoReleaser 还可以通过<a href="https://github.com/features/actions" target="_blank" rel="noopener noreferrer">GitHub Actions在我们的官方<ExternalLinkIcon/></a><a href="https://github.com/goreleaser/goreleaser-action" target="_blank" rel="noopener noreferrer">GoReleaser Action<ExternalLinkIcon/></a>中使用。</p>
<p>您可以通过将 YAML 配置放入<code v-pre>.github/workflows/release.yml</code>.</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> goreleaser

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token comment"># run only against tags</span>
    <span class="token key atrule">tags</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">'*'</span>

<span class="token key atrule">permissions</span><span class="token punctuation">:</span>
  <span class="token key atrule">contents</span><span class="token punctuation">:</span> write
  <span class="token comment"># packages: write</span>
  <span class="token comment"># issues: write</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">goreleaser</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">fetch-depth</span><span class="token punctuation">:</span> <span class="token number">0</span>
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> git fetch <span class="token punctuation">-</span><span class="token punctuation">-</span>force <span class="token punctuation">-</span><span class="token punctuation">-</span>tags
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>go@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">go-version</span><span class="token punctuation">:</span> stable
      <span class="token comment"># More assembly might be required: Docker logins, GPG, etc. It all depends</span>
      <span class="token comment"># on your needs.</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> goreleaser/goreleaser<span class="token punctuation">-</span>action@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># either 'goreleaser' (default) or 'goreleaser-pro':</span>
          <span class="token key atrule">distribution</span><span class="token punctuation">:</span> goreleaser
          <span class="token key atrule">version</span><span class="token punctuation">:</span> latest
          <span class="token key atrule">args</span><span class="token punctuation">:</span> release <span class="token punctuation">-</span><span class="token punctuation">-</span>clean
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token comment"># Your GoReleaser Pro key, if you are using the 'goreleaser-pro'</span>
          <span class="token comment"># distribution:</span>
          <span class="token comment"># GORELEASER_KEY: ${{ secrets.GORELEASER_KEY }}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>GoReleaser 需要以下<a href="https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token" target="_blank" rel="noopener noreferrer">权限：<ExternalLinkIcon/></a></p>
<ul>
<li><code v-pre>contents: write</code>如果你愿意
<ul>
<li><a href="https://goreleaser.com/customization/release/" target="_blank" rel="noopener noreferrer">将档案上传为 GitHub Releases<ExternalLinkIcon/></a>，或</li>
<li>发布到<a href="https://goreleaser.com/customization/homebrew/" target="_blank" rel="noopener noreferrer">Homebrew<ExternalLinkIcon/></a>或<a href="https://goreleaser.com/customization/scoop/" target="_blank" rel="noopener noreferrer">Scoop<ExternalLinkIcon/></a>（假设它是同一存储库的一部分）</li>
</ul>
</li>
<li>或者<code v-pre>contents: read</code>如果您不需要以上任何一项</li>
<li><code v-pre>packages: write</code>如果你<a href="https://goreleaser.com/customization/docker/" target="_blank" rel="noopener noreferrer">将 Docker 镜像推送到<ExternalLinkIcon/></a>GitHub</li>
<li><code v-pre>issues: write</code>如果您使用<a href="https://goreleaser.com/customization/milestone/" target="_blank" rel="noopener noreferrer">里程碑关闭功能<ExternalLinkIcon/></a></li>
</ul>
<p><code v-pre>GITHUB_TOKEN</code>权限<a href="https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token#about-the-github_token-secret" target="_blank" rel="noopener noreferrer">仅限于<ExternalLinkIcon/></a>包含您的工作流程的存储库。</p>
<p>如果您需要将自制程序 Tap 推送到另一个存储库，则必须创建一个具有权限的自定义<a href="https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/" target="_blank" rel="noopener noreferrer">个人访问令牌，并将<ExternalLinkIcon/></a><a href="https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets" target="_blank" rel="noopener noreferrer">其添加为存储库中的机密<ExternalLinkIcon/></a>。如果您创建名为 的机密，则步骤将如下所示：<code v-pre>repoGH_PAT</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run GoReleaser
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> goreleaser/goreleaser<span class="token punctuation">-</span>action@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">version</span><span class="token punctuation">:</span> latest
          <span class="token key atrule">args</span><span class="token punctuation">:</span> release <span class="token punctuation">-</span><span class="token punctuation">-</span>clean
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GH_PAT <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定制化需求" tabindex="-1"><a class="header-anchor" href="#定制化需求" aria-hidden="true">#</a> 定制化需求</h2>
<p>GoReleaser 可以通过调整<code v-pre>.goreleaser.yaml</code>文件来定制。</p>
<p><code v-pre>[goreleaser init](https://goreleaser.com/cmd/goreleaser_init/)</code>您可以通过运行或从头开始生成示例配置。</p>
<p>您还可以通过运行来检查您的配置是否有效<code v-pre>[goreleaser check](https://goreleaser.com/cmd/goreleaser_check/)</code>，这会告诉您是否使用了已弃用或无效的选项。</p>
<h3 id="名称模板" tabindex="-1"><a class="header-anchor" href="#名称模板" aria-hidden="true">#</a> 名称模板</h3>
<table>
<thead>
<tr>
<th>钥匙</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>.ProjectName</td>
<td>项目名称</td>
</tr>
<tr>
<td>.Version</td>
<td>正在发布的版本https://goreleaser.com/customization/templates/#fn:version-prefix</td>
</tr>
<tr>
<td>.Branch</td>
<td>当前的 git 分支</td>
</tr>
<tr>
<td>.PrefixedTag</td>
<td>以 monorepo 配置标签前缀为前缀的当前 git 标签（如果有）</td>
</tr>
<tr>
<td>.Tag</td>
<td>当前的 git 标签</td>
</tr>
<tr>
<td>.PrefixedPreviousTag</td>
<td>之前的 git 标签带有 monorepo 配置标签前缀（如果有）</td>
</tr>
<tr>
<td>.PreviousTag</td>
<td>之前的 git 标签，如果没有之前的标签则为空</td>
</tr>
<tr>
<td>.ShortCommit</td>
<td>git 提交短哈希</td>
</tr>
<tr>
<td>.FullCommit</td>
<td>git 提交完整哈希值</td>
</tr>
<tr>
<td>.Commit</td>
<td>git 提交哈希（已弃用）</td>
</tr>
<tr>
<td>.CommitDate</td>
<td>RFC 3339 格式的 UTC 提交日期</td>
</tr>
<tr>
<td>.CommitTimestamp</td>
<td>Unix 格式的 UTC 提交日期</td>
</tr>
<tr>
<td>.GitURL</td>
<td>git 远程 URL</td>
</tr>
<tr>
<td>.IsGitDirty</td>
<td>当前 git 状态是否脏。自 v1.19 起。</td>
</tr>
<tr>
<td>.Major</td>
<td>版本https://goreleaser.com/customization/templates/#fn:tag-is-semver</td>
</tr>
<tr>
<td>.Minor</td>
<td>版本https://goreleaser.com/customization/templates/#fn:tag-is-semver</td>
</tr>
<tr>
<td>.Patch</td>
<td>https://goreleaser.com/customization/templates/#fn:tag-is-semver的补丁部分</td>
</tr>
<tr>
<td>.Prerelease</td>
<td>版本的预发行部分，例如betahttps://goreleaser.com/customization/templates/#fn:tag-is-semver</td>
</tr>
<tr>
<td>.RawVersion</td>
<td>https://goreleaser.com/customization/templates/#fn:tag-is-semver组成{Major}.{Minor}.{Patch}</td>
</tr>
<tr>
<td>.ReleaseNotes</td>
<td>生成的发行说明，在执行变更日志步骤后可用</td>
</tr>
<tr>
<td>.IsDraft</td>
<td>trueifrelease.draft在配置中设置，false否则。自 v1.17 起。</td>
</tr>
<tr>
<td>.IsSnapshot</td>
<td>true如果--snapshot已设置，false否则</td>
</tr>
<tr>
<td>.IsNightly</td>
<td>true如果--nightly已设置，false否则</td>
</tr>
<tr>
<td>.Env</td>
<td>包含系统环境变量的映射</td>
</tr>
<tr>
<td>.Date</td>
<td>RFC 3339 格式的当前 UTC 日期</td>
</tr>
<tr>
<td>.Now</td>
<td>当前 UTC 日期作为time.Time结构，允许所有time.Time功能（例如{{ .Now.Format &quot;2006&quot; }}）。自 v1.17 起。</td>
</tr>
<tr>
<td>.Timestamp</td>
<td>Unix 格式的当前 UTC 时间</td>
</tr>
<tr>
<td>.ModulePath</td>
<td>go 模块路径，如报告所示go list -m</td>
</tr>
<tr>
<td>incpatch &quot;v1.2.4&quot;</td>
<td>https://goreleaser.com/customization/templates/#fn:panic-if-not-semver的补丁</td>
</tr>
<tr>
<td>incminor &quot;v1.2.4&quot;</td>
<td>https://goreleaser.com/customization/templates/#fn:panic-if-not-semver的次要版本</td>
</tr>
<tr>
<td>incmajor &quot;v1.2.4&quot;</td>
<td>增加给定版本https://goreleaser.com/customization/templates/#fn:panic-if-not-semver</td>
</tr>
<tr>
<td>.ReleaseURL</td>
<td>当前版本下载地址https://goreleaser.com/customization/templates/#fn:scm-release-url</td>
</tr>
<tr>
<td>.Summary</td>
<td>git 摘要，例如v1.0.0-10-g34f56g3https://goreleaser.com/customization/templates/#fn:git-summary</td>
</tr>
<tr>
<td>.PrefixedSummary</td>
<td>以 monorepo 配置标签前缀为前缀的 git 摘要（如果有）</td>
</tr>
<tr>
<td>.TagSubject</td>
<td>带注释的标签消息主题，或者它指出的提交的消息主题https://goreleaser.com/customization/templates/#fn:git-tag-subject。从 v1.2 开始。</td>
</tr>
<tr>
<td>.TagContents</td>
<td>带注释的标签消息，或者它指出的提交消息https://goreleaser.com/customization/templates/#fn:git-tag-body . 从 v1.2 开始。</td>
</tr>
<tr>
<td>.TagBody</td>
<td>带注释的标签消息正文，或其指出的提交的消息正文https://goreleaser.com/customization/templates/#fn:git-tag-body。从 v1.2 开始。</td>
</tr>
<tr>
<td>.Runtime.Goos</td>
<td>相当于runtime.GOOS. 从 v1.5 开始。</td>
</tr>
<tr>
<td>.Runtime.Goarch</td>
<td>相当于runtime.GOARCH. 从 v1.5 开始。</td>
</tr>
<tr>
<td>.Artifacts</td>
<td>当前工件列表。字段见下表。自 v1.16-pro 起。</td>
</tr>
</tbody>
</table>
<h3 id="配置选项" tabindex="-1"><a class="header-anchor" href="#配置选项" aria-hidden="true">#</a> 配置选项</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># Default: './dist'</span>
<span class="token key atrule">dist</span><span class="token punctuation">:</span> _output/dist

<span class="token key atrule">git</span><span class="token punctuation">:</span>
  <span class="token comment"># What should be used to sort tags when gathering the current and previous</span>
  <span class="token comment"># tags if there are more than one tag in the same commit.</span>
  <span class="token comment">#</span>
  <span class="token comment"># Default: '-version:refname'</span>
  <span class="token key atrule">tag_sort</span><span class="token punctuation">:</span> <span class="token punctuation">-</span>version<span class="token punctuation">:</span>creatordate

  <span class="token comment"># What should be used to specify prerelease suffix while sorting tags when gathering</span>
  <span class="token comment"># the current and previous tags if there are more than one tag in the same commit.</span>
  <span class="token comment">#</span>
  <span class="token comment"># Since: v1.17</span>
  <span class="token key atrule">prerelease_suffix</span><span class="token punctuation">:</span> <span class="token string">"-"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构建选项" tabindex="-1"><a class="header-anchor" href="#构建选项" aria-hidden="true">#</a> 构建选项</h3>
<p>可以通过多种方式定制构建。您可以指定构建哪些<code v-pre>GOOS</code>,<code v-pre>GOARCH</code>和<code v-pre>GOARM</code>二进制文件（GoReleaser 将生成所有组合的矩阵），并且您可以更改二进制文件的名称、标志、环境变量、挂钩等。</p>
<p>builds 是配置文件中最重要的一个选项：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">builds</span><span class="token punctuation">:</span>
  <span class="token comment"># You can have multiple builds defined as a yaml list</span>
  <span class="token punctuation">-</span> <span class="token comment">#</span>
    <span class="token comment"># ID of the build.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: Binary name</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">"my-build"</span>

    <span class="token comment"># Path to main.go file or main package.</span>
    <span class="token comment"># Notice: when used with `gomod.proxy`, this must be a package.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default is `.`.</span>
    <span class="token key atrule">main</span><span class="token punctuation">:</span> ./cmd/my<span class="token punctuation">-</span>app

    <span class="token comment"># Binary name.</span>
    <span class="token comment"># Can be a path (e.g. `bin/app`) to wrap the binary in a directory.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: Project directory name</span>
    <span class="token key atrule">binary</span><span class="token punctuation">:</span> program

    <span class="token comment"># Custom flags.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">flags</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token punctuation">-</span>tags=dev
      <span class="token punctuation">-</span> <span class="token punctuation">-</span>v

    <span class="token comment"># Custom asmflags.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">asmflags</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token punctuation">-</span>D mysymbol
      <span class="token punctuation">-</span> all=<span class="token punctuation">-</span>trimpath=<span class="token punctuation">{</span><span class="token punctuation">{</span>.Env.GOPATH<span class="token punctuation">}</span><span class="token punctuation">}</span>

    <span class="token comment"># Custom gcflags.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">gcflags</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> all=<span class="token punctuation">-</span>trimpath=<span class="token punctuation">{</span><span class="token punctuation">{</span>.Env.GOPATH<span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">-</span> ./dontoptimizeme=<span class="token punctuation">-</span>N

    <span class="token comment"># Custom ldflags.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: '-s -w -X main.version={{.Version}} -X main.commit={{.Commit}} -X main.date={{.Date}} -X main.builtBy=goreleaser'</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">ldflags</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token punctuation">-</span>s <span class="token punctuation">-</span>w <span class="token punctuation">-</span>X main.build=<span class="token punctuation">{</span><span class="token punctuation">{</span>.Version<span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">-</span> ./usemsan=<span class="token punctuation">-</span>msan

    <span class="token comment"># Custom Go build mode.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Valid options:</span>
    <span class="token comment"># - `c-shared`</span>
    <span class="token comment"># - `c-archive`</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.13</span>
    <span class="token key atrule">buildmode</span><span class="token punctuation">:</span> c<span class="token punctuation">-</span>shared

    <span class="token comment"># Custom build tags templates.</span>
    <span class="token key atrule">tags</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> osusergo
      <span class="token punctuation">-</span> netgo
      <span class="token punctuation">-</span> static_build
      <span class="token punctuation">-</span> feature

    <span class="token comment"># Custom environment variables to be set during the builds.</span>
    <span class="token comment"># Invalid environment variables will be ignored.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: os.Environ() ++ env config section</span>
    <span class="token comment"># Templates: allowed (since v1.14)</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> CGO_ENABLED=0
      <span class="token comment"># complex, templated envs (v1.14+):</span>
      <span class="token punctuation">-</span> <span class="token punctuation">></span><span class="token punctuation">-</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if eq .Os "darwin" <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if eq .Arch "amd64"<span class="token punctuation">}</span><span class="token punctuation">}</span>CC=o64<span class="token punctuation">-</span>clang<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if eq .Arch "arm64"<span class="token punctuation">}</span><span class="token punctuation">}</span>CC=aarch64<span class="token punctuation">-</span>apple<span class="token punctuation">-</span>darwin20.2<span class="token punctuation">-</span>clang<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if eq .Os "windows" <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if eq .Arch "amd64" <span class="token punctuation">}</span><span class="token punctuation">}</span>CC=x86_64<span class="token punctuation">-</span>w64<span class="token punctuation">-</span>mingw32<span class="token punctuation">-</span>gcc<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>

    <span class="token comment"># GOOS list to build for.</span>
    <span class="token comment"># For more info refer to: https://golang.org/doc/install/source#environment</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: [ 'darwin', 'linux', 'windows' ]</span>
    <span class="token key atrule">goos</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> freebsd
      <span class="token punctuation">-</span> windows

    <span class="token comment"># GOARCH to build for.</span>
    <span class="token comment"># For more info refer to: https://golang.org/doc/install/source#environment</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: [ '386', 'amd64', 'arm64' ]</span>
    <span class="token key atrule">goarch</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> amd64
      <span class="token punctuation">-</span> arm
      <span class="token punctuation">-</span> arm64

    <span class="token comment"># GOARM to build for when GOARCH is arm.</span>
    <span class="token comment"># For more info refer to: https://golang.org/doc/install/source#environment</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: [ 6 ]</span>
    <span class="token key atrule">goarm</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token number">6</span>
      <span class="token punctuation">-</span> <span class="token number">7</span>

    <span class="token comment"># GOAMD64 to build when GOARCH is amd64.</span>
    <span class="token comment"># For more info refer to: https://golang.org/doc/install/source#environment</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: [ 'v1' ]</span>
    <span class="token key atrule">goamd64</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> v2
      <span class="token punctuation">-</span> v3

    <span class="token comment"># GOMIPS and GOMIPS64 to build when GOARCH is mips, mips64, mipsle or mips64le.</span>
    <span class="token comment"># For more info refer to: https://golang.org/doc/install/source#environment</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: [ 'hardfloat' ]</span>
    <span class="token key atrule">gomips</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> hardfloat
      <span class="token punctuation">-</span> softfloat

    <span class="token comment"># List of combinations of GOOS + GOARCH + GOARM to ignore.</span>
    <span class="token key atrule">ignore</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">goos</span><span class="token punctuation">:</span> darwin
        <span class="token key atrule">goarch</span><span class="token punctuation">:</span> <span class="token number">386</span>
      <span class="token punctuation">-</span> <span class="token key atrule">goos</span><span class="token punctuation">:</span> linux
        <span class="token key atrule">goarch</span><span class="token punctuation">:</span> arm
        <span class="token key atrule">goarm</span><span class="token punctuation">:</span> <span class="token number">7</span>
      <span class="token punctuation">-</span> <span class="token key atrule">goarm</span><span class="token punctuation">:</span> mips64
      <span class="token punctuation">-</span> <span class="token key atrule">gomips</span><span class="token punctuation">:</span> hardfloat
      <span class="token punctuation">-</span> <span class="token key atrule">goamd64</span><span class="token punctuation">:</span> v4

    <span class="token comment"># Optionally override the matrix generation and specify only the final list</span>
    <span class="token comment"># of targets.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Format is `{goos}_{goarch}` with their respective suffixes when</span>
    <span class="token comment"># applicable: `_{goarm}`, `_{goamd64}`, `_{gomips}`.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Special values:</span>
    <span class="token comment"># - go_118_first_class: evaluates to the first-class ports of go1.18.</span>
    <span class="token comment"># - go_first_class: evaluates to latest stable go first-class ports,</span>
    <span class="token comment">#   currently same as 1.18.</span>
    <span class="token comment">#</span>
    <span class="token comment"># This overrides `goos`, `goarch`, `goarm`, `gomips`, `goamd64` and</span>
    <span class="token comment"># `ignores`.</span>
    <span class="token key atrule">targets</span><span class="token punctuation">:</span>
      <span class="token comment"># Since: v1.9</span>
      <span class="token punctuation">-</span> go_first_class
      <span class="token comment"># Since: v1.9</span>
      <span class="token punctuation">-</span> go_118_first_class
      <span class="token punctuation">-</span> linux_amd64_v1
      <span class="token punctuation">-</span> darwin_arm64
      <span class="token punctuation">-</span> linux_arm_6

    <span class="token comment"># Set a specific go binary to use when building.</span>
    <span class="token comment"># It is safe to ignore this option in most cases.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default is "go"</span>
    <span class="token key atrule">gobinary</span><span class="token punctuation">:</span> <span class="token string">"go1.13.4"</span>

    <span class="token comment"># Sets the command to run to build.</span>
    <span class="token comment"># Can be useful if you want to build tests, for example,</span>
    <span class="token comment"># in which case you can set this to "test".</span>
    <span class="token comment"># It is safe to ignore this option in most cases.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: build.</span>
    <span class="token comment"># Since: v1.9</span>
    <span class="token key atrule">command</span><span class="token punctuation">:</span> test

    <span class="token comment"># Set the modified timestamp on the output binary, typically</span>
    <span class="token comment"># you would do this to ensure a build was reproducible. Pass</span>
    <span class="token comment"># empty string to skip modifying the output.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Templates: allowed.</span>
    <span class="token key atrule">mod_timestamp</span><span class="token punctuation">:</span> <span class="token string">"{{ .CommitTimestamp }}"</span>

    <span class="token comment"># Hooks can be used to customize the final binary,</span>
    <span class="token comment"># for example, to run generators.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">hooks</span><span class="token punctuation">:</span>
      <span class="token key atrule">pre</span><span class="token punctuation">:</span> rice embed<span class="token punctuation">-</span>go
      <span class="token key atrule">post</span><span class="token punctuation">:</span> ./script.sh <span class="token punctuation">{</span><span class="token punctuation">{</span> .Path <span class="token punctuation">}</span><span class="token punctuation">}</span>

    <span class="token comment"># If true, skip the build.</span>
    <span class="token comment"># Useful for library projects.</span>
    <span class="token key atrule">skip</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

    <span class="token comment"># By default, GoReleaser will create your binaries inside</span>
    <span class="token comment"># `dist/${BuildID}_${BuildTarget}`, which is a unique directory per build</span>
    <span class="token comment"># target in the matrix.</span>
    <span class="token comment"># You can set subdirs within that folder using the `binary` property.</span>
    <span class="token comment">#</span>
    <span class="token comment"># However, if for some reason you don't want that unique directory to be</span>
    <span class="token comment"># created, you can set this property.</span>
    <span class="token comment"># If you do, you are responsible for keeping different builds from</span>
    <span class="token comment"># overriding each other.</span>
    <span class="token key atrule">no_unique_dist_dir</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># By default, GoReleaser will check if the main filepath has a main</span>
    <span class="token comment"># function.</span>
    <span class="token comment"># This can be used to skip that check, in case you're building tests, for</span>
    <span class="token comment"># example.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.9</span>
    <span class="token key atrule">no_main_check</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># Path to project's (sub)directory containing Go code.</span>
    <span class="token comment"># This is the working directory for the Go build command(s).</span>
    <span class="token comment"># If dir does not contain a `go.mod` file, and you are using `gomod.proxy`,</span>
    <span class="token comment"># produced binaries will be invalid.</span>
    <span class="token comment"># You would likely want to use `main` instead of this.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: '.'</span>
    <span class="token key atrule">dir</span><span class="token punctuation">:</span> go

    <span class="token comment"># Builder allows you to use a different build implementation.</span>
    <span class="token comment"># This is a GoReleaser Pro feature.</span>
    <span class="token comment"># Valid options are: `go` and `prebuilt`.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: 'go'</span>
    <span class="token key atrule">builder</span><span class="token punctuation">:</span> prebuilt

    <span class="token comment"># Overrides allows to override some fields for specific targets.</span>
    <span class="token comment"># This can be specially useful when using CGO.</span>
    <span class="token comment"># Note: it'll only match if the full target matches.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.5</span>
    <span class="token key atrule">overrides</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">goos</span><span class="token punctuation">:</span> darwin
        <span class="token key atrule">goarch</span><span class="token punctuation">:</span> arm64
        <span class="token key atrule">goamd64</span><span class="token punctuation">:</span> v1
        <span class="token key atrule">goarm</span><span class="token punctuation">:</span> <span class="token string">""</span>
        <span class="token key atrule">gomips</span><span class="token punctuation">:</span> <span class="token string">""</span>
        <span class="token key atrule">ldflags</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> foo
        <span class="token key atrule">tags</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> bar
        <span class="token key atrule">asmflags</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> foobar
        <span class="token key atrule">gcflags</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> foobaz
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> CGO_ENABLED=1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>包含多个二进制文件的构建：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">builds</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">main</span><span class="token punctuation">:</span> ./cmd/cli
    <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">"cli"</span>
    <span class="token key atrule">binary</span><span class="token punctuation">:</span> cli
    <span class="token key atrule">goos</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> linux
      <span class="token punctuation">-</span> darwin
      <span class="token punctuation">-</span> windows

  <span class="token punctuation">-</span> <span class="token key atrule">main</span><span class="token punctuation">:</span> ./cmd/worker
    <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">"worker"</span>
    <span class="token key atrule">binary</span><span class="token punctuation">:</span> worker
    <span class="token key atrule">goos</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> linux
      <span class="token punctuation">-</span> darwin
      <span class="token punctuation">-</span> windows

  <span class="token punctuation">-</span> <span class="token key atrule">main</span><span class="token punctuation">:</span> ./cmd/tracker
    <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">"tracker"</span>
    <span class="token key atrule">binary</span><span class="token punctuation">:</span> tracker
    <span class="token key atrule">goos</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> linux
      <span class="token punctuation">-</span> darwin
      <span class="token punctuation">-</span> windows
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>二进制名称字段支持<a href="https://goreleaser.com/customization/templates/" target="_blank" rel="noopener noreferrer">模板化<ExternalLinkIcon/></a>。公开了以下构建详细信息：</p>
<table>
<thead>
<tr>
<th>Key</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>.Os</td>
<td>GOOS</td>
</tr>
<tr>
<td>.Arch</td>
<td>GOARCH</td>
</tr>
<tr>
<td>.Arm</td>
<td>GOARM</td>
</tr>
<tr>
<td>.Ext</td>
<td>Extension, e.g. .exe</td>
</tr>
<tr>
<td>.Target</td>
<td>Build target, e.g. darwin_amd64</td>
</tr>
</tbody>
</table>
<p>您可以通过<code v-pre>{{ .Env.VARIABLE_NAME }}</code>在模板中使用来做到这一点，例如：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">builds</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">ldflags</span><span class="token punctuation">:</span>
   <span class="token punctuation">-</span> <span class="token punctuation">-</span>s <span class="token punctuation">-</span>w <span class="token punctuation">-</span>X "main.goversion=<span class="token punctuation">{</span><span class="token punctuation">{</span>.Env.GOVERSION<span class="token punctuation">}</span><span class="token punctuation">}</span>"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后你可以运行：</p>
<p><code v-pre>GOVERSION=$(go version) goreleaser</code></p>
<h2 id="build-hooks" tabindex="-1"><a class="header-anchor" href="#build-hooks" aria-hidden="true">#</a> build hooks</h2>
<p>pre 和 post 挂钩都<strong>针对每个构建目标</strong>运行，无论这些目标是通过操作系统和架构矩阵生成还是显式定义。</p>
<p>除了上面所示的简单声明之外，还可以声明<em>多个挂钩，以帮助保持不同构建环境之间配置的可重用性。</em></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">builds</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">"with-hooks"</span>
    <span class="token key atrule">targets</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"darwin_amd64"</span>
      <span class="token punctuation">-</span> <span class="token string">"windows_amd64"</span>
    <span class="token key atrule">hooks</span><span class="token punctuation">:</span>
      <span class="token key atrule">pre</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> first<span class="token punctuation">-</span>script.sh
        <span class="token punctuation">-</span> second<span class="token punctuation">-</span>script.sh
      <span class="token key atrule">post</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> upx "<span class="token punctuation">{</span><span class="token punctuation">{</span> .Path <span class="token punctuation">}</span><span class="token punctuation">}</span>"
        <span class="token punctuation">-</span> codesign <span class="token punctuation">-</span>project="<span class="token punctuation">{</span><span class="token punctuation">{</span> .ProjectName <span class="token punctuation">}</span><span class="token punctuation">}</span>" "<span class="token punctuation">{</span><span class="token punctuation">{</span> .Path <span class="token punctuation">}</span><span class="token punctuation">}</span>"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每个钩子还可以有自己的工作目录和环境变量：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">builds</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">"with-hooks"</span>
    <span class="token key atrule">targets</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"darwin_amd64"</span>
      <span class="token punctuation">-</span> <span class="token string">"windows_amd64"</span>
    <span class="token key atrule">hooks</span><span class="token punctuation">:</span>
      <span class="token key atrule">pre</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">cmd</span><span class="token punctuation">:</span> first<span class="token punctuation">-</span>script.sh
          <span class="token key atrule">dir</span><span class="token punctuation">:</span>
            <span class="token string">"{{ dir .Dist}}"</span>
            <span class="token comment"># Always print command output, otherwise only visible in debug mode.</span>
            <span class="token comment"># Since: v1.5</span>
          <span class="token key atrule">output</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> HOOK_SPECIFIC_VAR=<span class="token punctuation">{</span><span class="token punctuation">{</span> .Env.GLOBAL_VAR <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">-</span> second<span class="token punctuation">-</span>script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>钩子的所有属性（<code v-pre>cmd</code>、<code v-pre>dir</code>和<code v-pre>env</code>）都支持使用具有可用二进制工件的钩子<a href="https://goreleaser.com/customization/templates/" target="_blank" rel="noopener noreferrer">进行模板化<ExternalLinkIcon/></a>（因为它们在构建*后运行）。*此外，以下构建详细信息也会暴露给和钩子：<code v-pre>postprepost</code></p>
<table>
<thead>
<tr>
<th>Key</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>.Name</td>
<td>Filename of the binary, e.g. bin.exe</td>
</tr>
<tr>
<td>.Ext</td>
<td>Extension, e.g. .exe</td>
</tr>
<tr>
<td>.Path</td>
<td>Absolute path to the binary</td>
</tr>
<tr>
<td>.Target</td>
<td>Build target, e.g. darwin_amd64</td>
</tr>
</tbody>
</table>
<p>环境变量按以下顺序继承和覆盖：</p>
<ul>
<li>全局 ( <code v-pre>env</code>)</li>
<li>构建 ( <code v-pre>builds[].env</code>)</li>
<li>钩子 (<code v-pre>builds[].hooks.pre[].env</code>和<code v-pre>builds[].hooks.post[].env</code>)</li>
</ul>
<h3 id="模块" tabindex="-1"><a class="header-anchor" href="#模块" aria-hidden="true">#</a> 模块</h3>
<p>如果您使用带有 go 模块或 vgo 的 Go 1.11+，当 GoReleaser 运行时，它可能会尝试下载依赖项。由于多个构建并行运行，因此很可能会失败。</p>
<p>您可以通过<code v-pre>go mod tidy</code>在调用之前运行<code v-pre>goreleaser</code>或添加一个在文件上执行此操作的<a href="https://goreleaser.com/customization/hooks" target="_blank" rel="noopener noreferrer">挂钩<ExternalLinkIcon/></a><code v-pre>.goreleaser.yaml</code>来解决此问题：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">before</span><span class="token punctuation">:</span>
  <span class="token key atrule">hooks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> go mod tidy
<span class="token comment"># rest of the file...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<h2 id="archives" tabindex="-1"><a class="header-anchor" href="#archives" aria-hidden="true">#</a> archives</h2>
<p><code v-pre>README</code>构建的二进制文件将与和文件一起归档<code v-pre>LICENSE</code>到一个<code v-pre>tar.gz</code>文件中。在此<code v-pre>archives</code>部分中，您可以自定义存档名称、其他文件和格式。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">archives</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token comment">#</span>
    <span class="token comment"># ID of this archive.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: 'default'</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>archive

    <span class="token comment"># Builds reference which build instances should be archived in this archive.</span>
    <span class="token key atrule">builds</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> default

    <span class="token comment"># Archive format. Valid options are `tar.gz`, `tgz`, `tar.xz`, `txz`, tar`, `gz`, `zip` and `binary`.</span>
    <span class="token comment"># If format is `binary`, no archives are created and the binaries are instead</span>
    <span class="token comment"># uploaded directly.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: 'tar.gz'</span>
    <span class="token key atrule">format</span><span class="token punctuation">:</span> zip

    <span class="token comment"># This will create an archive without any binaries, only the files are there.</span>
    <span class="token comment"># The name template must not contain any references to `Os`, `Arch` and etc, since the archive will be meta.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.9</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">meta</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># Archive name.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default:</span>
    <span class="token comment"># - if format is `binary`:</span>
    <span class="token comment">#   - `{{ .Binary }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ with .Arm }}v{{ . }}{{ end }}{{ with .Mips }}_{{ . }}{{ end }}{{ if not (eq .Amd64 "v1") }}{{ .Amd64 }}{{ end }}`</span>
    <span class="token comment"># - if format is anything else:</span>
    <span class="token comment">#   - `{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ with .Arm }}v{{ . }}{{ end }}{{ with .Mips }}_{{ . }}{{ end }}{{ if not (eq .Amd64 "v1") }}{{ .Amd64 }}{{ end }}`</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">name_template</span><span class="token punctuation">:</span> <span class="token string">"{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}"</span>

    <span class="token comment"># Sets the given file info to all the binaries included from the `builds`.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: copied from the source binary.</span>
    <span class="token comment"># Since: v1.14</span>
    <span class="token key atrule">builds_info</span><span class="token punctuation">:</span>
      <span class="token key atrule">group</span><span class="token punctuation">:</span> root
      <span class="token key atrule">owner</span><span class="token punctuation">:</span> root
      <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token number">0644</span>
      <span class="token comment"># format is `time.RFC3339Nano`</span>
      <span class="token key atrule">mtime</span><span class="token punctuation">:</span> <span class="token datetime number">2008-01-02T15:04:05Z</span>

    <span class="token comment"># Set this to true if you want all files in the archive to be in a single directory.</span>
    <span class="token comment"># If set to true and you extract the archive 'goreleaser_Linux_arm64.tar.gz',</span>
    <span class="token comment"># you'll get a folder 'goreleaser_Linux_arm64'.</span>
    <span class="token comment"># If set to false, all files are extracted separately.</span>
    <span class="token comment"># You can also set it to a custom folder name (templating is supported).</span>
    <span class="token key atrule">wrap_in_directory</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># If set to true, will strip the parent directories away from binary files.</span>
    <span class="token comment">#</span>
    <span class="token comment"># This might be useful if you have your binary be built with a subdir for some reason, but do no want that subdir inside the archive.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.11</span>
    <span class="token key atrule">strip_parent_binary_folder</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># This will make the destination paths be relative to the longest common</span>
    <span class="token comment"># path prefix between all the files matched and the source glob.</span>
    <span class="token comment"># Enabling this essentially mimic the behavior of nfpm's contents section.</span>
    <span class="token comment"># It will be the default by June 2023.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.14</span>
    <span class="token key atrule">rlcp</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># Can be used to change the archive formats for specific GOOSs.</span>
    <span class="token comment"># Most common use case is to archive as zip on Windows.</span>
    <span class="token key atrule">format_overrides</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">goos</span><span class="token punctuation">:</span> windows
        <span class="token key atrule">format</span><span class="token punctuation">:</span> zip

    <span class="token comment"># Additional files/globs you want to add to the archive.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: [ 'LICENSE*', 'README*', 'CHANGELOG', 'license*', 'readme*', 'changelog']</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">files</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> LICENSE.txt
      <span class="token punctuation">-</span> README_<span class="token punctuation">{</span><span class="token punctuation">{</span>.Os<span class="token punctuation">}</span><span class="token punctuation">}</span>.md
      <span class="token punctuation">-</span> CHANGELOG.md
      <span class="token punctuation">-</span> docs/*
      <span class="token punctuation">-</span> design/<span class="token important">*.png</span>
      <span class="token punctuation">-</span> templates/<span class="token important">**/*</span>
      <span class="token comment"># a more complete example, check the globbing deep dive below</span>
      <span class="token punctuation">-</span> <span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">"*.md"</span>
        <span class="token key atrule">dst</span><span class="token punctuation">:</span> docs

        <span class="token comment"># Strip parent folders when adding files to the archive.</span>
        <span class="token key atrule">strip_parent</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

        <span class="token comment"># File info.</span>
        <span class="token comment"># Not all fields are supported by all formats available formats.</span>
        <span class="token comment">#</span>
        <span class="token comment"># Default: copied from the source file</span>
        <span class="token key atrule">info</span><span class="token punctuation">:</span>
          <span class="token comment"># Templates: allowed (since v1.14)</span>
          <span class="token key atrule">owner</span><span class="token punctuation">:</span> root

          <span class="token comment"># Templates: allowed (since v1.14)</span>
          <span class="token key atrule">group</span><span class="token punctuation">:</span> root

          <span class="token comment"># Must be in time.RFC3339Nano format.</span>
          <span class="token comment">#</span>
          <span class="token comment"># Templates: allowed (since v1.14)</span>
          <span class="token key atrule">mtime</span><span class="token punctuation">:</span> <span class="token string">"{{ .CommitDate }}"</span>

          <span class="token comment"># File mode.</span>
          <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token number">0644</span>

    <span class="token comment"># Additional templated files to add to the archive.</span>
    <span class="token comment"># Those files will have their contents pass through the template engine,</span>
    <span class="token comment"># and its results will be added to the archive.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.17 (pro)</span>
    <span class="token comment"># This feature is only available in GoReleaser Pro.</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">templated_files</span><span class="token punctuation">:</span>
      <span class="token comment"># a more complete example, check the globbing deep dive below</span>
      <span class="token punctuation">-</span> <span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">"LICENSE.md.tpl"</span>
        <span class="token key atrule">dst</span><span class="token punctuation">:</span> LICENSE.md

        <span class="token comment"># File info.</span>
        <span class="token comment"># Not all fields are supported by all formats available formats.</span>
        <span class="token comment">#</span>
        <span class="token comment"># Default: copied from the source file</span>
        <span class="token key atrule">info</span><span class="token punctuation">:</span>
          <span class="token comment"># Templateable (since v1.14.0)</span>
          <span class="token key atrule">owner</span><span class="token punctuation">:</span> root

          <span class="token comment"># Templateable (since v1.14.0)</span>
          <span class="token key atrule">group</span><span class="token punctuation">:</span> root

          <span class="token comment"># Must be in time.RFC3339Nano format.</span>
          <span class="token comment"># Templateable (since v1.14.0)</span>
          <span class="token key atrule">mtime</span><span class="token punctuation">:</span> <span class="token string">"{{ .CommitDate }}"</span>

          <span class="token comment"># File mode.</span>
          <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token number">0644</span>

    <span class="token comment"># Before and after hooks for each archive.</span>
    <span class="token comment"># Skipped if archive format is binary.</span>
    <span class="token comment"># This feature is only available in GoReleaser Pro.</span>
    <span class="token key atrule">hooks</span><span class="token punctuation">:</span>
      <span class="token key atrule">before</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> make clean <span class="token comment"># simple string</span>
        <span class="token punctuation">-</span> <span class="token key atrule">cmd</span><span class="token punctuation">:</span> go generate ./<span class="token punctuation">...</span> <span class="token comment"># specify cmd</span>
        <span class="token punctuation">-</span> <span class="token key atrule">cmd</span><span class="token punctuation">:</span> go mod tidy
          <span class="token key atrule">output</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># always prints command output</span>
          <span class="token key atrule">dir</span><span class="token punctuation">:</span> ./submodule <span class="token comment"># specify command working directory</span>
        <span class="token punctuation">-</span> <span class="token key atrule">cmd</span><span class="token punctuation">:</span> touch <span class="token punctuation">{</span><span class="token punctuation">{</span> .Env.FILE_TO_TOUCH <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token string">"FILE_TO_TOUCH=something-{{ .ProjectName }}"</span> <span class="token comment"># specify hook level environment variables</span>

      <span class="token key atrule">after</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> make clean
        <span class="token punctuation">-</span> <span class="token key atrule">cmd</span><span class="token punctuation">:</span> cat <span class="token important">*.yaml</span>
          <span class="token key atrule">dir</span><span class="token punctuation">:</span> ./submodule
        <span class="token punctuation">-</span> <span class="token key atrule">cmd</span><span class="token punctuation">:</span> touch <span class="token punctuation">{</span><span class="token punctuation">{</span> .Env.RELEASE_DONE <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token string">"RELEASE_DONE=something-{{ .ProjectName }}"</span> <span class="token comment"># specify hook level environment variables</span>

    <span class="token comment"># Disables the binary count check.</span>
    <span class="token key atrule">allow_different_binary_count</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="linux-软件包" tabindex="-1"><a class="header-anchor" href="#linux-软件包" aria-hidden="true">#</a> linux 软件包</h2>
<p>GoReleaser 可以连接到<a href="https://github.com/goreleaser/nfpm" target="_blank" rel="noopener noreferrer">nfpm<ExternalLinkIcon/></a>以生成和发布<code v-pre>.deb</code>、<code v-pre>.rpm</code>、<code v-pre>.apk</code>和 Archlinux 软件包。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># .goreleaser.yaml</span>
nfpms:
  <span class="token comment"># note that this is an array of nfpm configs</span>
  - <span class="token comment">#</span>
    <span class="token comment"># ID of the nfpm config, must be unique.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: 'default'</span>
    id: foo

    <span class="token comment"># Name of the package.</span>
    <span class="token comment"># Default: ProjectName</span>
    <span class="token comment"># Templates: allowed (since v1.18)</span>
    package_name: foo

    <span class="token comment"># You can change the file name of the package.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: '{{ .PackageName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ with .Arm }}v{{ . }}{{ end }}{{ with .Mips }}_{{ . }}{{ end }}{{ if not (eq .Amd64 "v1") }}{{ .Amd64 }}{{ end }}'</span>
    <span class="token comment"># Templates: allowed</span>
    file_name_template: <span class="token string">"{{ .ConventionalFileName }}"</span>

    <span class="token comment"># Build IDs for the builds you want to create NFPM packages for.</span>
    <span class="token comment"># Defaults empty, which means no filtering.</span>
    builds:
      - foo
      - bar

    <span class="token comment"># Your app's vendor.</span>
    vendor: Drum Roll Inc.

    <span class="token comment"># Your app's homepage.</span>
    homepage: https://example.com/

    <span class="token comment"># Your app's maintainer (probably you).</span>
    maintainer: Drummer <span class="token operator">&lt;</span>drum-roll@example.com<span class="token operator">></span>

    <span class="token comment"># Your app's description.</span>
    description: <span class="token operator">|</span>-
      Drum rolls installer package.
      Software to create fast and easy drum rolls.

    <span class="token comment"># Your app's license.</span>
    license: Apache <span class="token number">2.0</span>

    <span class="token comment"># Formats to be generated.</span>
    formats:
      - apk
      - deb
      - <span class="token function">rpm</span>
      - termux.deb <span class="token comment"># Since: v1.11</span>
      - archlinux <span class="token comment"># Since: v1.13</span>

    <span class="token comment"># Umask to be used on files without explicit mode set. (overridable)</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: 0o002 (will remove world-writable permissions)</span>
    <span class="token comment"># Since: v1.19</span>
    umask: 0o002

    <span class="token comment"># Packages your package depends on. (overridable)</span>
    dependencies:
      - <span class="token function">git</span>
      - <span class="token function">zsh</span>

    <span class="token comment"># Packages it provides. (overridable)</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.11</span>
    provides:
      - bar

    <span class="token comment"># Packages your package recommends installing. (overridable)</span>
    recommends:
      - bzr
      - gtk

    <span class="token comment"># Packages your package suggests installing. (overridable)</span>
    suggests:
      - cvs
      - ksh

    <span class="token comment"># Packages that conflict with your package. (overridable)</span>
    conflicts:
      - svn
      - <span class="token function">bash</span>

    <span class="token comment"># Packages it replaces. (overridable)</span>
    replaces:
      - fish

    <span class="token comment"># Path that the binaries should be installed.</span>
    <span class="token comment"># Default: '/usr/bin'</span>
    bindir: /usr/bin

    <span class="token comment"># Version Epoch.</span>
    <span class="token comment"># Default: extracted from `version` if it is semver compatible</span>
    epoch: <span class="token number">2</span>

    <span class="token comment"># Version Prerelease.</span>
    <span class="token comment"># Default: extracted from `version` if it is semver compatible</span>
    prerelease: beta1

    <span class="token comment"># Version Metadata (previously deb.metadata).</span>
    <span class="token comment"># Setting metadata might interfere with version comparisons depending on the</span>
    <span class="token comment"># packager.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: extracted from `version` if it is semver compatible</span>
    version_metadata: <span class="token function">git</span>

    <span class="token comment"># Version Release.</span>
    release: <span class="token number">1</span>

    <span class="token comment"># Section.</span>
    section: default

    <span class="token comment"># Priority.</span>
    priority: extra

    <span class="token comment"># Makes a meta package - an empty package that contains only supporting</span>
    <span class="token comment"># files and dependencies.</span>
    <span class="token comment"># When set to `true`, the `builds` option is ignored.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: false</span>
    meta: <span class="token boolean">true</span>

    <span class="token comment"># Changelog YAML file, see: https://github.com/goreleaser/chglog</span>
    <span class="token comment">#</span>
    <span class="token comment"># You can use goreleaser/chglog to create the changelog for your project,</span>
    <span class="token comment"># pass that changelog yaml file to GoReleaser,</span>
    <span class="token comment"># and it should in turn setup it accordingly for the given available</span>
    <span class="token comment"># formats (deb and rpm at the moment).</span>
    <span class="token comment">#</span>
    <span class="token comment"># Experimental.</span>
    <span class="token comment"># Since: v1.11</span>
    changelog: ./foo.yml

    <span class="token comment"># Contents to add to the package.</span>
    <span class="token comment"># GoReleaser will automatically add the binaries.</span>
    contents:
      <span class="token comment"># Basic file that applies to all packagers</span>
      - src: path/to/foo
        dst: /usr/bin/foo

      <span class="token comment"># This will add all files in some/directory or in subdirectories at the</span>
      <span class="token comment"># same level under the directory /etc. This means the tree structure in</span>
      <span class="token comment"># some/directory will not be replicated.</span>
      - src: some/directory/
        dst: /etc

      <span class="token comment"># This will replicate the directory structure under some/directory at</span>
      <span class="token comment"># /etc, using the "tree" type.</span>
      <span class="token comment">#</span>
      <span class="token comment"># Since: v1.17</span>
      <span class="token comment"># Templates: allowed</span>
      - src: some/directory/
        dst: /etc
        type: tree

      <span class="token comment"># Simple config file</span>
      - src: path/to/foo.conf
        dst: /etc/foo.conf
        type: config

      <span class="token comment"># Simple symlink.</span>
      <span class="token comment"># Corresponds to `ln -s /sbin/foo /usr/local/bin/foo`</span>
      - src: /sbin/foo
        dst: /usr/bin/foo
        type: <span class="token string">"symlink"</span>

      <span class="token comment"># Corresponds to `%config(noreplace)` if the packager is rpm, otherwise it</span>
      <span class="token comment"># is just a config file</span>
      - src: path/to/local/bar.conf
        dst: /etc/bar.conf
        type: <span class="token string">"config|noreplace"</span>

      <span class="token comment"># The src and dst attributes also supports name templates</span>
      - src: path/<span class="token punctuation">{</span><span class="token punctuation">{</span> .Os <span class="token punctuation">}</span><span class="token punctuation">}</span>-<span class="token punctuation">{</span><span class="token punctuation">{</span> .Arch <span class="token punctuation">}</span><span class="token punctuation">}</span>/bar.conf
        dst: /etc/foo/bar-<span class="token punctuation">{</span><span class="token punctuation">{</span> .ProjectName <span class="token punctuation">}</span><span class="token punctuation">}</span>.conf

    <span class="token comment"># Additional templated contents to add to the archive.</span>
    <span class="token comment"># Those files will have their contents pass through the template engine,</span>
    <span class="token comment"># and its results will be added to the package.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.17 (pro)</span>
    <span class="token comment"># This feature is only available in GoReleaser Pro.</span>
    <span class="token comment"># Templates: allowed</span>
    templated_contents:
      <span class="token comment"># a more complete example, check the globbing deep dive below</span>
      - src: <span class="token string">"LICENSE.md.tpl"</span>
        dst: LICENSE.md

      <span class="token comment"># These files are not actually present in the package, but the file names</span>
      <span class="token comment"># are added to the package header. From the RPM directives documentation:</span>
      <span class="token comment">#</span>
      <span class="token comment"># "There are times when a file should be owned by the package but not</span>
      <span class="token comment"># installed - log files and state files are good examples of cases you</span>
      <span class="token comment"># might desire this to happen."</span>
      <span class="token comment">#</span>
      <span class="token comment"># "The way to achieve this, is to use the %ghost directive. By adding this</span>
      <span class="token comment"># directive to the line containing a file, RPM will know about the ghosted</span>
      <span class="token comment"># file, but will not add it to the package."</span>
      <span class="token comment">#</span>
      <span class="token comment"># For non rpm packages ghost files are ignored at this time.</span>
      - dst: /etc/casper.conf
        type: ghost
      - dst: /var/log/boo.log
        type: ghost

      <span class="token comment"># You can use the packager field to add files that are unique to a</span>
      <span class="token comment"># specific packager</span>
      - src: path/to/rpm/file.conf
        dst: /etc/file.conf
        type: <span class="token string">"config|noreplace"</span>
        packager: <span class="token function">rpm</span>
      - src: path/to/deb/file.conf
        dst: /etc/file.conf
        type: <span class="token string">"config|noreplace"</span>
        packager: deb
      - src: path/to/apk/file.conf
        dst: /etc/file.conf
        type: <span class="token string">"config|noreplace"</span>
        packager: apk

      <span class="token comment"># Sometimes it is important to be able to set the mtime, mode, owner, or</span>
      <span class="token comment"># group for a file that differs from what is on the local build system at</span>
      <span class="token comment"># build time.</span>
      - src: path/to/foo
        dst: /usr/local/foo
        file_info:
          mode: 0644
          mtime: <span class="token number">2008</span>-01-02T15:04:05Z
          owner: notRoot
          group: notRoot

      <span class="token comment"># If `dst` ends with a `/`, it'll create the given path and copy the given</span>
      <span class="token comment"># `src` into it, the same way `cp` works with and without trailing `/`.</span>
      - src: ./foo/bar/*
        dst: /usr/local/myapp/

      <span class="token comment"># Using the type 'dir', empty directories can be created. When building</span>
      <span class="token comment"># RPMs, however, this type has another important purpose: Claiming</span>
      <span class="token comment"># ownership of that folder. This is important because when upgrading or</span>
      <span class="token comment"># removing an RPM package, only the directories for which it has claimed</span>
      <span class="token comment"># ownership are removed. However, you should not claim ownership of a</span>
      <span class="token comment"># folder that is created by the OS or a dependency of your package.</span>
      <span class="token comment">#</span>
      <span class="token comment"># A directory in the build environment can optionally be provided in the</span>
      <span class="token comment"># 'src' field in order copy mtime and mode from that directory without</span>
      <span class="token comment"># having to specify it manually.</span>
      - dst: /some/dir
        type: <span class="token function">dir</span>
        file_info:
          mode: 0700

    <span class="token comment"># Scripts to execute during the installation of the package. (overridable)</span>
    <span class="token comment">#</span>
    <span class="token comment"># Keys are the possible targets during the installation process</span>
    <span class="token comment"># Values are the paths to the scripts which will be executed.</span>
    scripts:
      preinstall: <span class="token string">"scripts/preinstall.sh"</span>
      postinstall: <span class="token string">"scripts/postinstall.sh"</span>
      preremove: <span class="token string">"scripts/preremove.sh"</span>
      postremove: <span class="token string">"scripts/postremove.sh"</span>

    <span class="token comment"># All fields above marked as `overridable` can be overridden for a given</span>
    <span class="token comment"># package format in this section.</span>
    overrides:
      <span class="token comment"># The dependencies override can for example be used to provide version</span>
      <span class="token comment"># constraints for dependencies where  different package formats use</span>
      <span class="token comment"># different versions or for dependencies that are named differently.</span>
      deb:
        dependencies:
          - baz <span class="token punctuation">(</span><span class="token operator">>=</span> <span class="token number">1.2</span>.3-0<span class="token punctuation">)</span>
          - some-lib-dev
        <span class="token comment"># ...</span>
      rpm:
        dependencies:
          - baz <span class="token operator">>=</span> <span class="token number">1.2</span>.3-0
          - some-lib-devel
        <span class="token comment"># ...</span>
      apk:
        <span class="token comment"># ...</span>

    <span class="token comment"># Custom configuration applied only to the RPM packager.</span>
    rpm:
      <span class="token comment"># RPM specific scripts.</span>
      scripts:
        <span class="token comment"># The pretrans script runs before all RPM package transactions / stages.</span>
        pretrans: ./scripts/pretrans.sh
        <span class="token comment"># The posttrans script runs after all RPM package transactions / stages.</span>
        posttrans: ./scripts/posttrans.sh

      <span class="token comment"># The package summary.</span>
      <span class="token comment">#</span>
      <span class="token comment"># Default: first line of the description</span>
      summary: Explicit Summary <span class="token keyword">for</span> Sample Package

      <span class="token comment"># The package group.</span>
      <span class="token comment"># This option is deprecated by most distros but required by old distros</span>
      <span class="token comment"># like CentOS 5 / EL 5 and earlier.</span>
      group: Unspecified

      <span class="token comment"># The packager is used to identify the organization that actually packaged</span>
      <span class="token comment"># the software, as opposed to the author of the software.</span>
      <span class="token comment"># `maintainer` will be used as fallback if not specified.</span>
      <span class="token comment"># This will expand any env var you set in the field, eg packager: ${PACKAGER}</span>
      packager: GoReleaser <span class="token operator">&lt;</span>staff@goreleaser.com<span class="token operator">></span>

      <span class="token comment"># Compression algorithm (gzip (default), lzma or xz).</span>
      compression: lzma

      <span class="token comment"># Prefixes for relocatable packages.</span>
      <span class="token comment">#</span>
      <span class="token comment"># Since: v1.20.</span>
      prefixes:
        - /usr/bin

      <span class="token comment"># The package is signed if a key_file is set</span>
      signature:
        <span class="token comment"># PGP secret key file path (can also be ASCII-armored).</span>
        <span class="token comment"># The passphrase is taken from the environment variable</span>
        <span class="token comment"># `$NFPM_ID_RPM_PASSPHRASE` with a fallback to `$NFPM_ID_PASSPHRASE`,</span>
        <span class="token comment"># where ID is the id of the current nfpm config.</span>
        <span class="token comment"># The id will be transformed to uppercase.</span>
        <span class="token comment"># E.g. If your nfpm id is 'default' then the rpm-specific passphrase</span>
        <span class="token comment"># should be set as `$NFPM_DEFAULT_RPM_PASSPHRASE`</span>
        <span class="token comment">#</span>
        <span class="token comment"># Templates: allowed</span>
        key_file: <span class="token string">"{{ .Env.GPG_KEY_PATH }}"</span>

    <span class="token comment"># Custom configuration applied only to the Deb packager.</span>
    deb:
      <span class="token comment"># Lintian overrides</span>
      lintian_overrides:
        - statically-linked-binary
        - changelog-file-missing-in-native-package

      <span class="token comment"># Custom deb special files.</span>
      scripts:
        <span class="token comment"># Deb rules script.</span>
        rules: foo.sh
        <span class="token comment"># Deb templates file, when using debconf.</span>
        templates: templates

      <span class="token comment"># Custom deb triggers</span>
      triggers:
        <span class="token comment"># register interest on a trigger activated by another package</span>
        <span class="token comment"># (also available: interest_await, interest_noawait)</span>
        interest:
          - some-trigger-name
        <span class="token comment"># activate a trigger for another package</span>
        <span class="token comment"># (also available: activate_await, activate_noawait)</span>
        activate:
          - another-trigger-name

      <span class="token comment"># Packages which would break if this package would be installed.</span>
      <span class="token comment"># The installation of this package is blocked if `some-package`</span>
      <span class="token comment"># is already installed.</span>
      breaks:
        - some-package

      <span class="token comment"># The package is signed if a key_file is set</span>
      signature:
        <span class="token comment"># PGP secret key file path (can also be ASCII-armored).</span>
        <span class="token comment"># The passphrase is taken from the environment variable</span>
        <span class="token comment"># `$NFPM_ID_DEB_PASSPHRASE` with a fallback to `$NFPM_ID_PASSPHRASE`,</span>
        <span class="token comment"># where ID is the id of the current nfpm config.</span>
        <span class="token comment"># The id will be transformed to uppercase.</span>
        <span class="token comment"># E.g. If your nfpm id is 'default' then the deb-specific passphrase</span>
        <span class="token comment"># should be set as `$NFPM_DEFAULT_DEB_PASSPHRASE`</span>
        <span class="token comment">#</span>
        <span class="token comment"># Templates: allowed</span>
        key_file: <span class="token string">"{{ .Env.GPG_KEY_PATH }}"</span>

        <span class="token comment"># The type describes the signers role, possible values are "origin",</span>
        <span class="token comment"># "maint" and "archive".</span>
        <span class="token comment">#</span>
        <span class="token comment"># Default: 'origin'</span>
        type: origin

    apk:
      <span class="token comment"># APK specific scripts.</span>
      scripts:
        <span class="token comment"># The preupgrade script runs before APK upgrade.</span>
        preupgrade: ./scripts/preupgrade.sh
        <span class="token comment"># The postupgrade script runs after APK.</span>
        postupgrade: ./scripts/postupgrade.sh

      <span class="token comment"># The package is signed if a key_file is set</span>
      signature:
        <span class="token comment"># PGP secret key file path (can also be ASCII-armored).</span>
        <span class="token comment"># The passphrase is taken from the environment variable</span>
        <span class="token comment"># `$NFPM_ID_APK_PASSPHRASE` with a fallback to `$NFPM_ID_PASSPHRASE`,</span>
        <span class="token comment"># where ID is the id of the current nfpm config.</span>
        <span class="token comment"># The id will be transformed to uppercase.</span>
        <span class="token comment"># E.g. If your nfpm id is 'default' then the apk-specific passphrase</span>
        <span class="token comment"># should be set as `$NFPM_DEFAULT_APK_PASSPHRASE`</span>
        <span class="token comment">#</span>
        <span class="token comment"># Templates: allowed</span>
        key_file: <span class="token string">"{{ .Env.GPG_KEY_PATH }}"</span>

        <span class="token comment"># The name of the signing key. When verifying a package, the signature</span>
        <span class="token comment"># is matched to the public key store in /etc/apk/keys/&lt;key_name>.rsa.pub.</span>
        <span class="token comment">#</span>
        <span class="token comment"># Default: maintainer's email address</span>
        <span class="token comment"># Templates: allowed (since v1.15)</span>
        key_name: origin

    archlinux:
      <span class="token comment"># Archlinux-specific scripts</span>
      scripts:
        <span class="token comment"># The preupgrade script runs before pacman upgrades the package.</span>
        preupgrade: ./scripts/preupgrade.sh
        <span class="token comment"># The postupgrade script runs after pacman upgrades the package.</span>
        postupgrade: ./scripts/postupgrade.sh

      <span class="token comment"># The pkgbase can be used to explicitly specify the name to be used to refer</span>
      <span class="token comment"># to a group of packages. See: https://wiki.archlinux.org/title/PKGBUILD#pkgbase.</span>
      pkgbase: foo

      <span class="token comment"># The packager refers to the organization packaging the software, not to be confused</span>
      <span class="token comment"># with the maintainer, which is the person who maintains the software.</span>
      packager: GoReleaser <span class="token operator">&lt;</span>staff@goreleaser.com<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Learn more about the <a href="https://goreleaser.com/customization/templates/" target="_blank" rel="noopener noreferrer">name template engine<ExternalLinkIcon/></a>.</p>
<h2 id="checksums-校验" tabindex="-1"><a class="header-anchor" href="#checksums-校验" aria-hidden="true">#</a> <strong>Checksums 校验</strong></h2>
<p>GoReleaser 会生成一个文件并将其与版本一起上传，以便您的用户可以验证下载的文件是否正确。</p>
<p>该部分允许自定义文件名：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">checksum</span><span class="token operator">:</span>
  # You can change the name <span class="token keyword">of</span> the checksums file<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>ProjectName <span class="token punctuation">}</span><span class="token punctuation">}</span>_<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Version <span class="token punctuation">}</span><span class="token punctuation">}</span>_checksums<span class="token punctuation">.</span>txt
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">name_template</span><span class="token operator">:</span> <span class="token string">"{{ .ProjectName }}_checksums.txt"</span>

  # Algorithm to be used<span class="token punctuation">.</span>
  # Accepted options are sha256<span class="token punctuation">,</span> sha512<span class="token punctuation">,</span> sha1<span class="token punctuation">,</span> crc32<span class="token punctuation">,</span> md5<span class="token punctuation">,</span> sha224 and sha384<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> sha256<span class="token punctuation">.</span>
  <span class="token literal-property property">algorithm</span><span class="token operator">:</span> sha256

  # IDs <span class="token keyword">of</span> artifacts to include <span class="token keyword">in</span> the checksums file<span class="token punctuation">.</span>
  #
  # If left empty<span class="token punctuation">,</span> all published binaries<span class="token punctuation">,</span> archives<span class="token punctuation">,</span> linux packages and source archives
  # are included <span class="token keyword">in</span> the checksums file<span class="token punctuation">.</span>
  <span class="token literal-property property">ids</span><span class="token operator">:</span>
    <span class="token operator">-</span> foo
    <span class="token operator">-</span> bar

  # Disable the generation<span class="token operator">/</span>upload <span class="token keyword">of</span> the checksum file<span class="token punctuation">.</span>
  <span class="token literal-property property">disable</span><span class="token operator">:</span> <span class="token boolean">true</span>

  # You can add extra pre<span class="token operator">-</span>existing files to the checksums file<span class="token punctuation">.</span>
  # The filename on the checksum will be the last part <span class="token keyword">of</span> the <span class="token function">path</span> <span class="token punctuation">(</span>base<span class="token punctuation">)</span><span class="token punctuation">.</span>
  # If another file <span class="token keyword">with</span> the same name exists<span class="token punctuation">,</span> the last one found will be used<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">extra_files</span><span class="token operator">:</span>
    <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>path<span class="token operator">/</span>to<span class="token operator">/</span>file<span class="token punctuation">.</span>txt
    <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>glob<span class="token comment">/**/</span>to<span class="token comment">/**/</span>file<span class="token comment">/**/</span><span class="token operator">*</span>
    <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>glob<span class="token operator">/</span>foo<span class="token operator">/</span>to<span class="token operator">/</span>bar<span class="token operator">/</span>file<span class="token operator">/</span>foobar<span class="token operator">/</span>override_from_previous
    <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>single_file<span class="token punctuation">.</span>txt
      <span class="token literal-property property">name_template</span><span class="token operator">:</span> file<span class="token punctuation">.</span>txt # note that <span class="token keyword">this</span> only works <span class="token keyword">if</span> glob matches <span class="token number">1</span> file only

  # Additional templated extra files to add to the checksum<span class="token punctuation">.</span>
  # Those files will have their contents pass through the template engine<span class="token punctuation">,</span>
  # and its results will be added to the checksum<span class="token punctuation">.</span>
  #
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span> <span class="token punctuation">(</span>pro<span class="token punctuation">)</span>
  # This feature is only available <span class="token keyword">in</span> GoReleaser Pro<span class="token punctuation">.</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">templated_extra_files</span><span class="token operator">:</span>
    <span class="token operator">-</span> src<span class="token operator">:</span> <span class="token constant">LICENSE</span><span class="token punctuation">.</span>tpl
      <span class="token literal-property property">dst</span><span class="token operator">:</span> <span class="token constant">LICENSE</span><span class="token punctuation">.</span>txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="snapcraft-packages-snaps-snapcraft-packages" tabindex="-1"><a class="header-anchor" href="#snapcraft-packages-snaps-snapcraft-packages" aria-hidden="true">#</a> <strong>Snapcraft Packages (snaps) Snapcraft Packages</strong></h2>
<p>GoReleaser也可以生成软件包。Snaps 是一种新的打包格式，可让您将项目直接发布到 Ubuntu 商店。从那里，它可以安装在所有受支持的Linux发行版中，并进行自动和事务性更新。</p>
<p>您可以在 snapcraft 文档中阅读更多相关信息。</p>
<p><strong>Snaps是适用于桌面</strong>、<strong>云</strong>和<strong>物联网</strong>的 Linux 应用程序包，易于安装、安全、跨平台且无依赖性。</p>
<p>它们会<strong>自动更新，并且通常在有限的</strong>基于<strong>事务的</strong>环境中运行。<strong>安全性和稳健性</strong>是其主要特点，此外还<strong>易于安装</strong>、<strong>易于维护</strong>和<strong>易于升级</strong>。</p>
<p><strong>Snapd 发布流程</strong></p>
<p>snapd 是管理和维护快照的后台服务。它本身可以作为 snap 包或传统的 Linux 软件包（例如<em>deb</em>或 RPM）提供。</p>
<p>有两种类型的发布；主要和次要版本，由其版本号的数字状态表示，并带有次要句点和为次要版本保留的数字：</p>
<ul>
<li>主要版本发布：2.53、2.54、2.55</li>
<li>次要版本发布：2.53.1、2.53.2</li>
</ul>
<p>主要版本和次要版本之间的区别在于其计划、准备和动机。每隔几周就有一个主要发布周期，但有时我们需要包含较小更改和修复的中间次要版本发布。</p>
<p>主要版本和后续次要版本（例如 2.53 -&gt; 2.53.1）之间的差异尽可能小且有针对性，并省略主要代码重构和新功能。这并不总是可能的，因为有时错误或功能很复杂，但这是我们的首要目标。</p>
<p><strong>逐步发布流程</strong></p>
<ul>
<li><a href="https://gist.github.com/baymaxium/e1602202e7a3ef53a723ae14a3e928bc" target="_blank" rel="noopener noreferrer">https://gist.github.com/baymaxium/e1602202e7a3ef53a723ae14a3e928bc<ExternalLinkIcon/></a></li>
</ul>
<p><strong>使用Snapcraft构建发布Snap安装包</strong></p>
<p>生成一个初始工程：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>$ snapcraft init
Created snap<span class="token operator">/</span>snapcraft<span class="token punctuation">.</span>yaml<span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-images" tabindex="-1"><a class="header-anchor" href="#docker-images" aria-hidden="true">#</a> <strong>Docker Images</strong></h2>
<p>GoReleaser 可以构建和推送 Docker 镜像。让我们看看它是如何工作的。</p>
<p>您可以声明多个 Docker 映像。它们将与节生成的二进制文件和节生成的包进行匹配。</p>
<p>如果您只有一个设置，则配置就像将映像名称添加到文件中一样简单：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> user<span class="token operator">/</span>repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您还需要在项目的根文件夹中创建一个 <code v-pre>Dockerfile</code>：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token constant">FROM</span> scratch
<span class="token constant">ENTRYPOINT</span> <span class="token punctuation">[</span><span class="token string">"/mybin"</span><span class="token punctuation">]</span>
<span class="token constant">COPY</span> mybin <span class="token operator">/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此配置将生成并推送名为 的 Docker 映像。</p>
<p><strong>Customization 定制</strong></p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  # You can have multiple Docker images<span class="token punctuation">.</span>
  <span class="token operator">-</span> #
    # <span class="token constant">ID</span> <span class="token keyword">of</span> the image<span class="token punctuation">,</span> needed <span class="token keyword">if</span> you want to filter by it later <span class="token function">on</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> on custom publishers<span class="token punctuation">)</span><span class="token punctuation">.</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> myimg

    # <span class="token constant">GOOS</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">'linux'</span>
    <span class="token literal-property property">goos</span><span class="token operator">:</span> linux

    # <span class="token constant">GOARCH</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">'amd64'</span>
    <span class="token literal-property property">goarch</span><span class="token operator">:</span> amd64

    # <span class="token constant">GOARM</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">'6'</span>
    <span class="token literal-property property">goarm</span><span class="token operator">:</span> <span class="token string">""</span>

    # <span class="token constant">GOAMD64</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">'v1'</span>
    <span class="token literal-property property">goamd64</span><span class="token operator">:</span> <span class="token string">"v2"</span>

    # IDs to filter the binaries<span class="token operator">/</span>packages<span class="token punctuation">.</span>
    <span class="token literal-property property">ids</span><span class="token operator">:</span>
      <span class="token operator">-</span> mybuild
      <span class="token operator">-</span> mynfpm

    # Templates <span class="token keyword">of</span> the Docker image names<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">image_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:latest"</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:{{ .Tag }}"</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:{{ .Tag }}-{{ .Env.FOOBAR }}"</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:v{{ .Major }}"</span>
      <span class="token operator">-</span> <span class="token string">"gcr.io/myuser/myimage:latest"</span>

    # Skips the docker build<span class="token punctuation">.</span>
    # Could be useful <span class="token keyword">if</span> you want to skip building the windows docker image on
    # linux<span class="token punctuation">,</span> <span class="token keyword">for</span> example<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">14</span> <span class="token punctuation">(</span>pro<span class="token punctuation">)</span>
    # This option is only available on GoReleaser Pro<span class="token punctuation">.</span>
    <span class="token literal-property property">skip_build</span><span class="token operator">:</span> <span class="token boolean">false</span>

    # Skips the docker push<span class="token punctuation">.</span>
    # Could be useful <span class="token keyword">if</span> you also <span class="token keyword">do</span> draft releases<span class="token punctuation">.</span>
    #
    # If <span class="token keyword">set</span> to auto<span class="token punctuation">,</span> the release will not be pushed to the Docker repository
    #  <span class="token keyword">in</span> <span class="token keyword">case</span> there is an indicator <span class="token keyword">of</span> a prerelease <span class="token keyword">in</span> the tag<span class="token punctuation">,</span> e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> v1<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span>rc1<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> <span class="token function">allowed</span> <span class="token punctuation">(</span>since v1<span class="token punctuation">.</span><span class="token number">19</span><span class="token punctuation">)</span>
    <span class="token literal-property property">skip_push</span><span class="token operator">:</span> <span class="token boolean">false</span>

    # Path to the <span class="token function">Dockerfile</span> <span class="token punctuation">(</span>from the project root<span class="token punctuation">)</span><span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'Dockerfile'</span>
    <span class="token literal-property property">dockerfile</span><span class="token operator">:</span> <span class="token string">"{{ .Env.DOCKERFILE }}"</span>

    # Set the <span class="token string">"backend"</span> <span class="token keyword">for</span> the Docker pipe<span class="token punctuation">.</span>
    #
    # Valid options are<span class="token operator">:</span> docker<span class="token punctuation">,</span> buildx<span class="token punctuation">,</span> podman<span class="token punctuation">.</span>
    #
    # Podman is a GoReleaser Pro feature and is only available on Linux<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'docker'</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> docker

    # Docker build flags<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">build_flag_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"--pull"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.created={{.Date}}"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.title={{.ProjectName}}"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.revision={{.FullCommit}}"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.version={{.Version}}"</span>
      <span class="token operator">-</span> <span class="token string">"--build-arg=FOO={{.Env.Bar}}"</span>
      <span class="token operator">-</span> <span class="token string">"--platform=linux/arm64"</span>

    # Extra flags to be passed down to the push command<span class="token punctuation">.</span>
    <span class="token literal-property property">push_flags</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token operator">--</span>tls<span class="token operator">-</span>verify<span class="token operator">=</span><span class="token boolean">false</span>

    # If your Dockerfile copies files other than binaries and packages<span class="token punctuation">,</span>
    # you should list them here <span class="token keyword">as</span> well<span class="token punctuation">.</span>
    # Note that GoReleaser will create the same structure inside a temporary
    # folder<span class="token punctuation">,</span> so <span class="token keyword">if</span> you add <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">foo/bar.json</span><span class="token template-punctuation string">`</span></span> here<span class="token punctuation">,</span> on your Dockerfile you can
    # <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">COPY foo/bar.json /whatever.json</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">.</span>
    # Also note that the paths here are relative to the folder <span class="token keyword">in</span> which
    # GoReleaser is being <span class="token function">run</span> <span class="token punctuation">(</span>usually the repository root folder<span class="token punctuation">)</span><span class="token punctuation">.</span>
    # This field does not support wildcards<span class="token punctuation">,</span> you can add an entire folder here
    # and use wildcards when you <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">COPY</span><span class="token template-punctuation string">`</span></span><span class="token operator">/</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">ADD</span><span class="token template-punctuation string">`</span></span> <span class="token keyword">in</span> your Dockerfile<span class="token punctuation">.</span>
    <span class="token literal-property property">extra_files</span><span class="token operator">:</span>
      <span class="token operator">-</span> config<span class="token punctuation">.</span>yml

    # Additional templated extra files to add to the Docker image<span class="token punctuation">.</span>
    # Those files will have their contents pass through the template engine<span class="token punctuation">,</span>
    # and its results will be added to the build context the same way <span class="token keyword">as</span> the
    # extra_files field above<span class="token punctuation">.</span>
    #
    # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span> <span class="token punctuation">(</span>pro<span class="token punctuation">)</span>
    # This feature is only available <span class="token keyword">in</span> GoReleaser Pro<span class="token punctuation">.</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">templated_extra_files</span><span class="token operator">:</span>
      <span class="token operator">-</span> src<span class="token operator">:</span> <span class="token constant">LICENSE</span><span class="token punctuation">.</span>tpl
        <span class="token literal-property property">dst</span><span class="token operator">:</span> <span class="token constant">LICENSE</span><span class="token punctuation">.</span>txt
        <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token number">0644</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-images-1" tabindex="-1"><a class="header-anchor" href="#docker-images-1" aria-hidden="true">#</a> <strong>Docker Images</strong></h2>
<p>GoReleaser 可以构建和推送 Docker 镜像。让我们看看它是如何工作的。</p>
<p>您可以声明多个 Docker 映像。它们将与节生成的二进制文件和节生成的包进行匹配。</p>
<p>如果您只有一个 build 设置，则配置就像将映像名称添加到文件中一样简单：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> user<span class="token operator">/</span>repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您还需要在项目的根文件夹中创建一个：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token constant">FROM</span> scratch
<span class="token constant">ENTRYPOINT</span> <span class="token punctuation">[</span><span class="token string">"/mybin"</span><span class="token punctuation">]</span>
<span class="token constant">COPY</span> mybin <span class="token operator">/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此配置将生成并推送名为 的 Docker 映像。</p>
<p><strong>Customization</strong></p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  # You can have multiple Docker images<span class="token punctuation">.</span>
  <span class="token operator">-</span> #
    # <span class="token constant">ID</span> <span class="token keyword">of</span> the image<span class="token punctuation">,</span> needed <span class="token keyword">if</span> you want to filter by it later <span class="token function">on</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> on custom publishers<span class="token punctuation">)</span><span class="token punctuation">.</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> myimg

    # <span class="token constant">GOOS</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">'linux'</span>
    <span class="token literal-property property">goos</span><span class="token operator">:</span> linux

    # <span class="token constant">GOARCH</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">'amd64'</span>
    <span class="token literal-property property">goarch</span><span class="token operator">:</span> amd64

    # <span class="token constant">GOARM</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">'6'</span>
    <span class="token literal-property property">goarm</span><span class="token operator">:</span> <span class="token string">""</span>

    # <span class="token constant">GOAMD64</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">'v1'</span>
    <span class="token literal-property property">goamd64</span><span class="token operator">:</span> <span class="token string">"v2"</span>

    # IDs to filter the binaries<span class="token operator">/</span>packages<span class="token punctuation">.</span>
    <span class="token literal-property property">ids</span><span class="token operator">:</span>
      <span class="token operator">-</span> mybuild
      <span class="token operator">-</span> mynfpm

    # Templates <span class="token keyword">of</span> the Docker image names<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">image_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:latest"</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:{{ .Tag }}"</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:{{ .Tag }}-{{ .Env.FOOBAR }}"</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:v{{ .Major }}"</span>
      <span class="token operator">-</span> <span class="token string">"gcr.io/myuser/myimage:latest"</span>

    # Skips the docker build<span class="token punctuation">.</span>
    # Could be useful <span class="token keyword">if</span> you want to skip building the windows docker image on
    # linux<span class="token punctuation">,</span> <span class="token keyword">for</span> example<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">14</span> <span class="token punctuation">(</span>pro<span class="token punctuation">)</span>
    # This option is only available on GoReleaser Pro<span class="token punctuation">.</span>
    <span class="token literal-property property">skip_build</span><span class="token operator">:</span> <span class="token boolean">false</span>

    # Skips the docker push<span class="token punctuation">.</span>
    # Could be useful <span class="token keyword">if</span> you also <span class="token keyword">do</span> draft releases<span class="token punctuation">.</span>
    #
    # If <span class="token keyword">set</span> to auto<span class="token punctuation">,</span> the release will not be pushed to the Docker repository
    #  <span class="token keyword">in</span> <span class="token keyword">case</span> there is an indicator <span class="token keyword">of</span> a prerelease <span class="token keyword">in</span> the tag<span class="token punctuation">,</span> e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> v1<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span>rc1<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> <span class="token function">allowed</span> <span class="token punctuation">(</span>since v1<span class="token punctuation">.</span><span class="token number">19</span><span class="token punctuation">)</span>
    <span class="token literal-property property">skip_push</span><span class="token operator">:</span> <span class="token boolean">false</span>

    # Path to the <span class="token function">Dockerfile</span> <span class="token punctuation">(</span>from the project root<span class="token punctuation">)</span><span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'Dockerfile'</span>
    <span class="token literal-property property">dockerfile</span><span class="token operator">:</span> <span class="token string">"{{ .Env.DOCKERFILE }}"</span>

    # Set the <span class="token string">"backend"</span> <span class="token keyword">for</span> the Docker pipe<span class="token punctuation">.</span>
    #
    # Valid options are<span class="token operator">:</span> docker<span class="token punctuation">,</span> buildx<span class="token punctuation">,</span> podman<span class="token punctuation">.</span>
    #
    # Podman is a GoReleaser Pro feature and is only available on Linux<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'docker'</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> docker

    # Docker build flags<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">build_flag_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"--pull"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.created={{.Date}}"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.title={{.ProjectName}}"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.revision={{.FullCommit}}"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.version={{.Version}}"</span>
      <span class="token operator">-</span> <span class="token string">"--build-arg=FOO={{.Env.Bar}}"</span>
      <span class="token operator">-</span> <span class="token string">"--platform=linux/arm64"</span>

    # Extra flags to be passed down to the push command<span class="token punctuation">.</span>
    <span class="token literal-property property">push_flags</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token operator">--</span>tls<span class="token operator">-</span>verify<span class="token operator">=</span><span class="token boolean">false</span>

    # If your Dockerfile copies files other than binaries and packages<span class="token punctuation">,</span>
    # you should list them here <span class="token keyword">as</span> well<span class="token punctuation">.</span>
    # Note that GoReleaser will create the same structure inside a temporary
    # folder<span class="token punctuation">,</span> so <span class="token keyword">if</span> you add <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">foo/bar.json</span><span class="token template-punctuation string">`</span></span> here<span class="token punctuation">,</span> on your Dockerfile you can
    # <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">COPY foo/bar.json /whatever.json</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">.</span>
    # Also note that the paths here are relative to the folder <span class="token keyword">in</span> which
    # GoReleaser is being <span class="token function">run</span> <span class="token punctuation">(</span>usually the repository root folder<span class="token punctuation">)</span><span class="token punctuation">.</span>
    # This field does not support wildcards<span class="token punctuation">,</span> you can add an entire folder here
    # and use wildcards when you <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">COPY</span><span class="token template-punctuation string">`</span></span><span class="token operator">/</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">ADD</span><span class="token template-punctuation string">`</span></span> <span class="token keyword">in</span> your Dockerfile<span class="token punctuation">.</span>
    <span class="token literal-property property">extra_files</span><span class="token operator">:</span>
      <span class="token operator">-</span> config<span class="token punctuation">.</span>yml

    # Additional templated extra files to add to the Docker image<span class="token punctuation">.</span>
    # Those files will have their contents pass through the template engine<span class="token punctuation">,</span>
    # and its results will be added to the build context the same way <span class="token keyword">as</span> the
    # extra_files field above<span class="token punctuation">.</span>
    #
    # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span> <span class="token punctuation">(</span>pro<span class="token punctuation">)</span>
    # This feature is only available <span class="token keyword">in</span> GoReleaser Pro<span class="token punctuation">.</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">templated_extra_files</span><span class="token operator">:</span>
      <span class="token operator">-</span> src<span class="token operator">:</span> <span class="token constant">LICENSE</span><span class="token punctuation">.</span>tpl
        <span class="token literal-property property">dst</span><span class="token operator">:</span> <span class="token constant">LICENSE</span><span class="token punctuation">.</span>txt
        <span class="token literal-property property">mode</span><span class="token operator">:</span> <span class="token number">0644</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，您必须手动登录到要推送到的Docker注册表 - GoReleaser不会自行登录。</p>
<blockquote>
<p>请注意，您必须手动登录到要推送到的Docker注册表 - GoReleaser不会自行登录。</p>
</blockquote>
<p>这些设置应该允许您生成多个 Docker 映像，例如，使用多个语句，以及为项目中的每个二进制文件生成一个映像或一个具有多个二进制文件的映像，以及安装生成的包而不是手动复制二进制文件和配置。</p>
<h3 id="通用映像名称" tabindex="-1"><a class="header-anchor" href="#通用映像名称" aria-hidden="true">#</a> <strong>通用映像名称</strong></h3>
<p>某些用户可能希望使其映像名称尽可能通用。这可以通过在定义中添加模板语言来实现：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">project_name</span><span class="token operator">:</span> foo
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"myuser/{{.ProjectName}}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将生成并发布以下映像：</p>
<ul>
<li><code v-pre>myuser/foo</code></li>
</ul>
<h3 id="保持当前主要内容的-docker-映像更新" tabindex="-1"><a class="header-anchor" href="#保持当前主要内容的-docker-映像更新" aria-hidden="true">#</a> <strong>保持当前主要内容的 docker 映像更新</strong></h3>
<p>一些用户可能想要推送 docker 标记 、 以及何时（例如）构建。这可以通过使用多个：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:{{ .Tag }}"</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:v{{ .Major }}"</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:v{{ .Major }}.{{ .Minor }}"</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage:latest"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将生成并发布以下映像：</p>
<ul>
<li><code v-pre>myuser/myimage:v1.6.4</code></li>
<li><code v-pre>myuser/myimage:v1</code></li>
<li><code v-pre>myuser/myimage:v1.6</code></li>
<li><code v-pre>myuser/myimage:latest</code></li>
</ul>
<p>通过这些设置，您可以希望推送多个具有多个标签的 Docker 映像。</p>
<h3 id="发布到多个-docker-注册表" tabindex="-1"><a class="header-anchor" href="#发布到多个-docker-注册表" aria-hidden="true">#</a> <strong>发布到多个 docker 注册表</strong></h3>
<p>某些用户可能希望将映像推送到多个 docker 注册表。这可以通过使用多个：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"docker.io/myuser/myimage:{{ .Tag }}"</span>
      <span class="token operator">-</span> <span class="token string">"docker.io/myuser/myimage:latest"</span>
      <span class="token operator">-</span> <span class="token string">"gcr.io/myuser/myimage:{{ .Tag }}"</span>
      <span class="token operator">-</span> <span class="token string">"gcr.io/myuser/myimage:latest"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这会生成以下映像并将其发布到 和 ：</p>
<ul>
<li><code v-pre>myuser/myimage:v1.6.4</code></li>
<li><code v-pre>myuser/myimage:latest</code></li>
<li><code v-pre>gcr.io/myuser/myimage:v1.6.4</code></li>
<li><code v-pre>gcr.io/myuser/myimage:latest</code></li>
</ul>
<h3 id="应用-docker-构建标志" tabindex="-1"><a class="header-anchor" href="#应用-docker-构建标志" aria-hidden="true">#</a> <strong>应用 Docker 构建标志</strong></h3>
<p>可以使用 应用生成标志。这些标志必须是有效的 Docker 构建标志。</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage"</span>
    <span class="token literal-property property">build_flag_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"--pull"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.created={{.Date}}"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.title={{.ProjectName}}"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.revision={{.FullCommit}}"</span>
      <span class="token operator">-</span> <span class="token string">"--label=org.opencontainers.image.version={{.Version}}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将执行以下命令：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>docker build <span class="token operator">-</span>t myuser<span class="token operator">/</span>myimage <span class="token punctuation">.</span> \
  <span class="token operator">--</span>pull \
  <span class="token operator">--</span>label<span class="token operator">=</span>org<span class="token punctuation">.</span>opencontainers<span class="token punctuation">.</span>image<span class="token punctuation">.</span>created<span class="token operator">=</span><span class="token number">2020</span><span class="token operator">-</span><span class="token number">01</span><span class="token operator">-</span>19T15<span class="token operator">:</span><span class="token number">58</span><span class="token operator">:</span>07Z \
  <span class="token operator">--</span>label<span class="token operator">=</span>org<span class="token punctuation">.</span>opencontainers<span class="token punctuation">.</span>image<span class="token punctuation">.</span>title<span class="token operator">=</span>mybinary \
  <span class="token operator">--</span>label<span class="token operator">=</span>org<span class="token punctuation">.</span>opencontainers<span class="token punctuation">.</span>image<span class="token punctuation">.</span>revision<span class="token operator">=</span>da39a3ee5e6b4b0d3255bfef95601890afd80709 \
  <span class="token operator">--</span>label<span class="token operator">=</span>org<span class="token punctuation">.</span>opencontainers<span class="token punctuation">.</span>image<span class="token punctuation">.</span>version<span class="token operator">=</span><span class="token number">1.6</span><span class="token number">.4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="将特定的构建器与-docker-buildx-一起使用" tabindex="-1"><a class="header-anchor" href="#将特定的构建器与-docker-buildx-一起使用" aria-hidden="true">#</a> <strong>将特定的构建器与 Docker buildx 一起使用</strong></h3>
<p>如果启用，则在构建映像时使用上下文构建器。此构建器始终可用，并由 Docker 引擎中的 BuildKit 提供支持。如果要使用其他构建器，可以使用以下字段指定它：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage"</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> buildx
    <span class="token literal-property property">build_flag_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"--builder=mybuilder"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="podman" tabindex="-1"><a class="header-anchor" href="#podman" aria-hidden="true">#</a> Podman</h3>
<p>您可以使用而不是通过在配置上设置为：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">"myuser/myimage"</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> podman
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，GoReleaser 不会为您安装 Podman，也不会更改其任何配置。</p>
<h2 id="docker-manifests" tabindex="-1"><a class="header-anchor" href="#docker-manifests" aria-hidden="true">#</a> <strong>Docker Manifests</strong></h2>
<p>GoReleaser 还可以使用该工具创建和推送 Docker 多平台映像。</p>
<p>无需切换设备，在 Apple M2 芯片的机器上我们可以直接构建 <code v-pre>amd64</code> 也就是 Linux 平台镜像，<code v-pre>docker build</code> 命令提供了 <code v-pre>--platform</code> 参数可以构建跨平台镜像。</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>docker build <span class="token operator">--</span>platform<span class="token operator">=</span>linux<span class="token operator">/</span>amd64 <span class="token operator">-</span>t kubecub<span class="token operator">/</span>echo<span class="token operator">-</span>platform<span class="token operator">-</span>amd64 <span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行不同平台的镜像会怎么样：</p>
<p>你也许会好奇，在 Apple M2 芯片的主机设备上运行 <code v-pre>amd64</code> 平台镜像会怎样。目前咱们构建的这个简单镜像其实是能够运行的，只不过会得到一条警告信息：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>$ docker run <span class="token operator">--</span>rm kubecub<span class="token operator">/</span>echo<span class="token operator">-</span>platform<span class="token operator">-</span>amd64
<span class="token constant">WARNING</span><span class="token operator">:</span> The requested image's <span class="token function">platform</span> <span class="token punctuation">(</span>linux<span class="token operator">/</span>amd64<span class="token punctuation">)</span> does not match the detected host <span class="token function">platform</span> <span class="token punctuation">(</span>linux<span class="token operator">/</span>arm64<span class="token operator">/</span>v8<span class="token punctuation">)</span> and no specific platform was requested
Linux buildkitsandbox <span class="token number">5.15</span><span class="token number">.49</span><span class="token operator">-</span>linuxkit #<span class="token number">1</span> <span class="token constant">SMP</span> <span class="token constant">PREEMPT</span> Tue Sep <span class="token number">13</span> <span class="token number">07</span><span class="token operator">:</span><span class="token number">51</span><span class="token operator">:</span><span class="token number">32</span> <span class="token constant">UTC</span> <span class="token number">2022</span> x86_64 Linux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出内容中的 <code v-pre>x86_64</code> 就表示 <code v-pre>AMD64</code> 架构。</p>
<blockquote>
<p>注意：虽然这个简单的镜像能够运行成功，但如果容器内部程序不支持跨平台，<code v-pre>amd64</code> 平台镜像无法在 <code v-pre>arm64</code> 平台运行成功。</p>
</blockquote>
<p><strong>使用 manifest 合并多平台镜像</strong></p>
<p>我们可以使用 <code v-pre>docker manifest</code> 的子命令 <code v-pre>create</code> 创建一个 <code v-pre>manifest list</code>，即将多个平台的镜像合并为一个镜像。</p>
<p><code v-pre>create</code> 命令用法很简单，后面跟的第一个参数 <code v-pre>jianghushinian/echo-platform</code> 即为合并后的镜像，从第二个参数开始可以指定一个或多个不同平台的镜像。</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>docker manifest create kubecub<span class="token operator">/</span>echo<span class="token operator">-</span>platform kubecub<span class="token operator">/</span>echo<span class="token operator">-</span>platform<span class="token operator">-</span>arm64 kubecub<span class="token operator">/</span>echo<span class="token operator">-</span>platform<span class="token operator">-</span>amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>浏览器中登录 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fhub.docker.com%2F" target="_blank" rel="noopener noreferrer">Docker Hub<ExternalLinkIcon/></a> 查看推送成功的镜像：</p>
<blockquote>
<p>进入镜像信息详情页面的 <code v-pre>Tags</code> 标签，能够看到镜像支持 <code v-pre>amd64</code>、<code v-pre>arm64/v8</code> 这两个平台。</p>
</blockquote>
<h3 id="manifest-命令" tabindex="-1"><a class="header-anchor" href="#manifest-命令" aria-hidden="true">#</a> Manifest 命令</h3>
<p>可以发现，<code v-pre>docker manifest</code> 共提供了 <code v-pre>annotate</code>、<code v-pre>create</code>、<code v-pre>inspect</code>、<code v-pre>push</code>、<code v-pre>rm</code> 这 5 个子命。</p>
<p>可以发现，<code v-pre>create</code> 子命令支持两个可选参数 <code v-pre>-a/--amend</code> 用来修订已存在的多架构镜像。</p>
<p>指定 <code v-pre>--insecure</code> 参数则允许使用不安全的（非 https）镜像仓库。</p>
<h3 id="push" tabindex="-1"><a class="header-anchor" href="#push" aria-hidden="true">#</a> <strong>push</strong></h3>
<p><code v-pre>push</code> 子命令我们也见过了，使用 <code v-pre>push</code> 可以将多架构镜像推送到镜像仓库。</p>
<p>同样的，<code v-pre>push</code> 也有一个 <code v-pre>--insecure</code> 参数允许使用不安全的（非 https）镜像仓库。</p>
<ul>
<li><code v-pre>p/--purge</code> 选项的作用是推送本地镜像到远程仓库后，删除本地 <code v-pre>manifest list</code>。</li>
</ul>
<h3 id="inspect" tabindex="-1"><a class="header-anchor" href="#inspect" aria-hidden="true">#</a> <strong>inspect</strong></h3>
<p><code v-pre>inspect</code> 用来查看 <code v-pre>manifest</code>/<code v-pre>manifest list</code> 所包含的镜像信息。</p>
<p><code v-pre>--insecure</code> 参数允许使用不安全的（非 https）镜像仓库。这已经是我们第三次看见这个参数了，这也验证了 <code v-pre>docker manifest</code> 命令需要联网才能使用的说法，因为这些子命令基本都涉及到和远程镜像仓库的交互。</p>
<h3 id="annotate" tabindex="-1"><a class="header-anchor" href="#annotate" aria-hidden="true">#</a> <strong>annotate</strong></h3>
<p><code v-pre>annotate</code> 子命令可以给一个本地镜像 <code v-pre>manifest</code> 添加附加的信息。这有点像 K8s Annotations 的意思。</p>
<p>可选参数列表如下：</p>
<table>
<thead>
<tr>
<th>选项</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>--arch</td>
<td>设置 CPU 架构信息。</td>
</tr>
<tr>
<td>--os</td>
<td>设置操作系统信息。</td>
</tr>
<tr>
<td>--os-features</td>
<td>设置操作系统功能信息。</td>
</tr>
<tr>
<td>--os-version</td>
<td>设置操作系统版本信息。</td>
</tr>
<tr>
<td>--variant</td>
<td>设置 CPU 架构的 variant 信息（翻译过来是“变种”的意思），如 ARM 架构的 v7、v8 等。</td>
</tr>
</tbody>
</table>
<h2 id="rm" tabindex="-1"><a class="header-anchor" href="#rm" aria-hidden="true">#</a> rm</h2>
<p>最后要介绍的子命令是 <code v-pre>rm</code>，使用 <code v-pre>rm</code> 可以删除本地一个或多个多架构镜像（<code v-pre>manifest lists</code>）。</p>
<h3 id="customization" tabindex="-1"><a class="header-anchor" href="#customization" aria-hidden="true">#</a> <strong>Customization</strong></h3>
<p>您可以在一次 GoReleaser 运行中创建多个清单，以下是所有可用的选项：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">docker_manifests</span><span class="token operator">:</span>
  # You can have multiple Docker manifests<span class="token punctuation">.</span>
<span class="token operator">-</span>
  # <span class="token constant">ID</span> <span class="token keyword">of</span> the manifest<span class="token punctuation">,</span> needed <span class="token keyword">if</span> you want to filter by it later <span class="token function">on</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> on
  # custom publishers<span class="token punctuation">)</span><span class="token punctuation">.</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> myimg

  # Name <span class="token keyword">for</span> the manifest<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">name_template</span><span class="token operator">:</span> <span class="token string">"foo/bar:{{ .Version }}"</span>

  # Image name to be added to <span class="token keyword">this</span> manifest<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">image_templates</span><span class="token operator">:</span>
  <span class="token operator">-</span> <span class="token string">"foo/bar:{{ .Version }}-amd64"</span>
  <span class="token operator">-</span> <span class="token string">"foo/bar:{{ .Version }}-arm64v8"</span>

  # Extra flags to be passed down to the manifest create command<span class="token punctuation">.</span>
  <span class="token literal-property property">create_flags</span><span class="token operator">:</span>
  <span class="token operator">-</span> <span class="token operator">--</span>insecure

  # Extra flags to be passed down to the manifest push command<span class="token punctuation">.</span>
  <span class="token literal-property property">push_flags</span><span class="token operator">:</span>
  <span class="token operator">-</span> <span class="token operator">--</span>insecure

  # Skips the Docker manifest<span class="token punctuation">.</span>
  # If you <span class="token keyword">set</span> <span class="token keyword">this</span> to <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">false</span><span class="token template-punctuation string">`</span></span> or <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">auto</span><span class="token template-punctuation string">`</span></span> on your source Docker configuration<span class="token punctuation">,</span>
  #  you'll probably want to <span class="token keyword">do</span> the same here<span class="token punctuation">.</span>
  #
  # If <span class="token keyword">set</span> to <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">auto</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> the manifest will not be created <span class="token keyword">in</span> <span class="token keyword">case</span> there is an
  #  indicator <span class="token keyword">of</span> a prerelease <span class="token keyword">in</span> the tag<span class="token punctuation">,</span> e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> v1<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span>rc1<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> <span class="token function">allowed</span> <span class="token punctuation">(</span>since v1<span class="token punctuation">.</span><span class="token number">19</span><span class="token punctuation">)</span>
  <span class="token literal-property property">skip_push</span><span class="token operator">:</span> <span class="token boolean">false</span>

  # Set the <span class="token string">"backend"</span> <span class="token keyword">for</span> the Docker manifest pipe<span class="token punctuation">.</span>
  # Valid options are<span class="token operator">:</span> docker<span class="token punctuation">,</span> podman
  #
  # Relevant notes<span class="token operator">:</span>
  # <span class="token number">1.</span> podman is a GoReleaser Pro feature and is only available on Linux<span class="token punctuation">;</span>
  # <span class="token number">2.</span> <span class="token keyword">if</span> you <span class="token keyword">set</span> podman here<span class="token punctuation">,</span> the respective docker configuration need to use
  #     podman too<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">'docker'</span>
  <span class="token literal-property property">use</span><span class="token operator">:</span> docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ko" tabindex="-1"><a class="header-anchor" href="#ko" aria-hidden="true">#</a> KO</h2>
<p>https://github.com/ko-build/ko</p>
<p>KO is Build and deploy Go applications</p>
<p>install docs:</p>
<p><a href="https://ko.build/install/" target="_blank" rel="noopener noreferrer">Installation - ko: Easy Go Containers<ExternalLinkIcon/></a></p>
<p>User Actions:</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token literal-property property">steps</span><span class="token operator">:</span>
<span class="token operator">-</span> uses<span class="token operator">:</span> imjasonh<span class="token operator">/</span>setup<span class="token operator">-</span>ko@v0<span class="token punctuation">.</span><span class="token number">6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>User Ko:</strong></p>
<p><code v-pre>ko</code>取决于 Docker 配置中配置的身份验证（通常<code v-pre>~/.docker/config.json</code>）。</p>
<p>✨**如果您可以使用 推送图片<code v-pre>docker push</code>，则您已经通过了身份验证<code v-pre>ko</code>！**✨</p>
<p>由于<code v-pre>ko</code>不需要<code v-pre>docker</code>，<code v-pre>ko login</code>还提供了一个使用用户名和密码登录容器映像注册表的界面，类似于<code v-pre>[docker login](https://docs.docker.com/engine/reference/commandline/login/)</code>.</p>
<p>此外，即使未在 Docker 配置中配置身份验证，也<code v-pre>ko</code>包含使用环境中配置的凭据对以下容器注册表进行身份验证的内置支持：</p>
<ul>
<li>
<p>Google 容器注册表和 Artifact 注册表，使用<a href="https://cloud.google.com/docs/authentication/production" target="_blank" rel="noopener noreferrer">应用程序默认凭据<ExternalLinkIcon/></a><code v-pre>gcloud</code></p>
<p>或</p>
</li>
<li>
<p>Amazon Elastic Container Registry，使用<a href="https://github.com/awslabs/amazon-ecr-credential-helper/#aws-credentials" target="_blank" rel="noopener noreferrer">AWS 凭证<ExternalLinkIcon/></a></p>
</li>
<li>
<p>Azure 容器注册表，使用<a href="https://github.com/chrismellard/docker-credential-acr-env/" target="_blank" rel="noopener noreferrer">环境变量<ExternalLinkIcon/></a></p>
</li>
<li>
<p>GitHub Container Registry，使用<code v-pre>GITHUB_TOKEN</code>环境变量</p>
</li>
</ul>
<p><code v-pre>ko</code>取决于环境变量 ，<code v-pre>KO_DOCKER_REPO</code>来确定应将其构建的映像推送到何处。通常这将是远程注册表，例如：</p>
<ul>
<li><code v-pre>KO_DOCKER_REPO=gcr.io/my-project</code>， 或者</li>
<li><code v-pre>KO_DOCKER_REPO=ghcr.io/my-org/my-repo</code>， 或者</li>
<li><code v-pre>KO_DOCKER_REPO=my-dockerhub-user</code></li>
</ul>
<p><strong>步骤：</strong></p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>echo <span class="token string">"***"</span> <span class="token operator">|</span> docker login ghcr<span class="token punctuation">.</span>io <span class="token operator">-</span>u kuebcub <span class="token operator">--</span>password<span class="token operator">-</span>stdin
<span class="token keyword">export</span> <span class="token constant">GITHUB_TOKEN</span><span class="token operator">=</span><span class="token string">"******"</span>
<span class="token keyword">export</span> <span class="token constant">KO_DOCKER_REPO</span><span class="token operator">=</span>ghcr<span class="token punctuation">.</span>io<span class="token operator">/</span>kubecub<span class="token operator">/</span>exporter<span class="token punctuation">;</span> ko build <span class="token punctuation">.</span><span class="token operator">/</span>cmd<span class="token operator">/</span>exporter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>测试：</strong></p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>docker run <span class="token operator">-</span>p <span class="token number">8080</span><span class="token operator">:</span><span class="token number">8080</span> <span class="token function">$</span><span class="token punctuation">(</span>ko build <span class="token punctuation">.</span><span class="token operator">/</span>cmd<span class="token operator">/</span>app<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker-images-with-ko" tabindex="-1"><a class="header-anchor" href="#docker-images-with-ko" aria-hidden="true">#</a> <strong>Docker Images with Ko</strong></h2>
<p>请注意 ko 将再次构建您的二进制文件。这不应该过多地增加发布时间，因为它会在可能的情况下使用与构建管道相同的构建选项，因此结果可能会被缓存。</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">kos</span><span class="token operator">:</span>
<span class="token operator">-</span>
  # <span class="token constant">ID</span> <span class="token keyword">of</span> <span class="token keyword">this</span> image<span class="token punctuation">.</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> foo

  # Build <span class="token constant">ID</span> that should be used to <span class="token keyword">import</span> the build settings<span class="token punctuation">.</span>
  <span class="token literal-property property">build</span><span class="token operator">:</span> build<span class="token operator">-</span>id

  # Main path to build<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> build<span class="token punctuation">.</span>main
  <span class="token literal-property property">main</span><span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>cmd<span class="token operator">/</span><span class="token operator">...</span>

  # Working directory used to build<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> build<span class="token punctuation">.</span>dir
  <span class="token literal-property property">working_dir</span><span class="token operator">:</span> <span class="token punctuation">.</span>

  # Base image to publish to use<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">'cgr.dev/chainguard/static'</span>
  <span class="token literal-property property">base_image</span><span class="token operator">:</span> alpine

  # Labels <span class="token keyword">for</span> the image<span class="token punctuation">.</span>
  #
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span>
  <span class="token literal-property property">labels</span><span class="token operator">:</span>
    <span class="token literal-property property">foo</span><span class="token operator">:</span> bar

  # Repository to push to<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> $<span class="token constant">KO_DOCKER_REPO</span>
  <span class="token literal-property property">repository</span><span class="token operator">:</span> ghcr<span class="token punctuation">.</span>io<span class="token operator">/</span>foo<span class="token operator">/</span>bar

  # Platforms to build and publish<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">'linux/amd64'</span>
  <span class="token literal-property property">platforms</span><span class="token operator">:</span>
  <span class="token operator">-</span> linux<span class="token operator">/</span>amd64
  <span class="token operator">-</span> linux<span class="token operator">/</span>arm64

  # Tag to build and push<span class="token punctuation">.</span>
  # Empty tags are ignored<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">'latest'</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">tags</span><span class="token operator">:</span>
  <span class="token operator">-</span> latest
  <span class="token operator">-</span> <span class="token string">'{{.Tag}}'</span>
  <span class="token operator">-</span> <span class="token string">'{{if not .Prerelease}}stable{{end}}'</span>

  # Creation time given to the image
  # <span class="token keyword">in</span> seconds since the Unix epoch <span class="token keyword">as</span> a string<span class="token punctuation">.</span>
  #
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">creation_time</span><span class="token operator">:</span> <span class="token string">'{{.CommitTimestamp}}'</span>

  # Creation time given to the files <span class="token keyword">in</span> the kodata directory
  # <span class="token keyword">in</span> seconds since the Unix epoch <span class="token keyword">as</span> a string<span class="token punctuation">.</span>
  #
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">ko_data_creation_time</span><span class="token operator">:</span> <span class="token string">'{{.CommitTimestamp}}'</span>

  # <span class="token constant">SBOM</span> format to use<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">'spdx'</span>
  # Valid options are<span class="token operator">:</span> spdx<span class="token punctuation">,</span> cyclonedx<span class="token punctuation">,</span> go<span class="token punctuation">.</span>version<span class="token operator">-</span>m and none<span class="token punctuation">.</span>
  <span class="token literal-property property">sbom</span><span class="token operator">:</span> none

  # Ldflags to use on build<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> build<span class="token punctuation">.</span>ldflags
  <span class="token literal-property property">ldflags</span><span class="token operator">:</span>
  <span class="token operator">-</span> foo
  <span class="token operator">-</span> bar

  # Flags to use on build<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> build<span class="token punctuation">.</span>flags
  <span class="token literal-property property">flags</span><span class="token operator">:</span>
  <span class="token operator">-</span> foo
  <span class="token operator">-</span> bar

  # Env to use on build<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> build<span class="token punctuation">.</span>env
  <span class="token literal-property property">env</span><span class="token operator">:</span>
  <span class="token operator">-</span> <span class="token constant">FOO</span><span class="token operator">=</span>bar
  <span class="token operator">-</span> <span class="token constant">SOMETHING</span><span class="token operator">=</span>value

  # Bare uses a tag on the $<span class="token constant">KO_DOCKER_REPO</span> without anything additional<span class="token punctuation">.</span>
  <span class="token literal-property property">bare</span><span class="token operator">:</span> <span class="token boolean">true</span>

  # Whether to preserve the full <span class="token keyword">import</span> path after the repository name<span class="token punctuation">.</span>
  <span class="token literal-property property">preserve_import_paths</span><span class="token operator">:</span> <span class="token boolean">true</span>

  # Whether to use the base path without the <span class="token constant">MD5</span> hash after the repository name<span class="token punctuation">.</span>
  <span class="token literal-property property">base_import_paths</span><span class="token operator">:</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个最小的例子：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yml
<span class="token literal-property property">before</span><span class="token operator">:</span>
  <span class="token literal-property property">hooks</span><span class="token operator">:</span>
    <span class="token operator">-</span> go mod tidy

<span class="token literal-property property">builds</span><span class="token operator">:</span>
  <span class="token operator">-</span> env<span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">"CGO_ENABLED=1"</span> <span class="token punctuation">]</span>
    <span class="token literal-property property">binary</span><span class="token operator">:</span> test
    <span class="token literal-property property">goos</span><span class="token operator">:</span>
    <span class="token operator">-</span> darwin
    <span class="token operator">-</span> linux
    <span class="token literal-property property">goarch</span><span class="token operator">:</span>
    <span class="token operator">-</span> amd64
    <span class="token operator">-</span> arch64

<span class="token literal-property property">kos</span><span class="token operator">:</span>
  <span class="token operator">-</span> repository<span class="token operator">:</span> ghcr<span class="token punctuation">.</span>io<span class="token operator">/</span>caarlos0<span class="token operator">/</span>test<span class="token operator">-</span>ko
    <span class="token literal-property property">tags</span><span class="token operator">:</span>
    <span class="token operator">-</span> <span class="token string">'{{.Version}}'</span>
    <span class="token operator">-</span> latest
    <span class="token literal-property property">bare</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token literal-property property">preserve_import_paths</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token literal-property property">platforms</span><span class="token operator">:</span>
    <span class="token operator">-</span> linux<span class="token operator">/</span>amd64
    <span class="token operator">-</span> linux<span class="token operator">/</span>arm64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将为 、 和 构建二进制文件，以及 Linux 的 Docker 映像和清单。</p>
<h2 id="包的大小" tabindex="-1"><a class="header-anchor" href="#包的大小" aria-hidden="true">#</a> 包的大小</h2>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
# Whether to enable the size reporting or not<span class="token punctuation">.</span>
<span class="token literal-property property">report_sizes</span><span class="token operator">:</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="metadata-元数据" tabindex="-1"><a class="header-anchor" href="#metadata-元数据" aria-hidden="true">#</a> <strong>Metadata 元数据</strong></h2>
<p>GoReleaser 在完成运行之前会在文件夹中创建一些元数据文件。</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
#
<span class="token literal-property property">metadata</span><span class="token operator">:</span>
  # Set the modified timestamp on the metadata files<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed<span class="token punctuation">.</span>
  <span class="token literal-property property">mod_timestamp</span><span class="token operator">:</span> <span class="token string">"{{ .CommitTimestamp }}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="签名校验" tabindex="-1"><a class="header-anchor" href="#签名校验" aria-hidden="true">#</a> 签名校验</h2>
<p>GoReleaser 提供了对可执行文件和档案进行签名的方法。</p>
<p>签名与校验和文件结合使用，通常仅对校验和文件进行签名就足够了。</p>
<p>默认配置为使用以下命令为校验和文件创建独立签名<a href="https://www.gnupg.org/" target="_blank" rel="noopener noreferrer">GnuPG<ExternalLinkIcon/></a>，以及您的默认密钥。要启用签名只需添加</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">signs</span><span class="token operator">:</span>
  <span class="token operator">-</span> artifacts<span class="token operator">:</span> checksum
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要自定义签名管道，您可以使用以下选项：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">signs</span><span class="token operator">:</span>
  <span class="token operator">-</span>
    # <span class="token constant">ID</span> <span class="token keyword">of</span> the sign config<span class="token punctuation">,</span> must be unique<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'default'</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> foo

    # Name <span class="token keyword">of</span> the signature file<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'${artifact}.sig'</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">signature</span><span class="token operator">:</span> <span class="token string">"${artifact}_sig"</span>

    # Path to the signature command
    #
    # Default<span class="token operator">:</span> <span class="token string">'gpg'</span>
    <span class="token literal-property property">cmd</span><span class="token operator">:</span> gpg2

    # Command line arguments <span class="token keyword">for</span> the command
    #
    # to sign <span class="token keyword">with</span> a specific key use
    # args<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"-u"</span><span class="token punctuation">,</span> <span class="token string">"&lt;key id, fingerprint, email, ...>"</span><span class="token punctuation">,</span> <span class="token string">"--output"</span><span class="token punctuation">,</span> <span class="token string">"${signature}"</span><span class="token punctuation">,</span> <span class="token string">"--detach-sign"</span><span class="token punctuation">,</span> <span class="token string">"${artifact}"</span><span class="token punctuation">]</span>
    #
    # Default<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"--output"</span><span class="token punctuation">,</span> <span class="token string">"${signature}"</span><span class="token punctuation">,</span> <span class="token string">"--detach-sign"</span><span class="token punctuation">,</span> <span class="token string">"${artifact}"</span><span class="token punctuation">]</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">args</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"--output"</span><span class="token punctuation">,</span> <span class="token string">"${signature}"</span><span class="token punctuation">,</span> <span class="token string">"${artifact}"</span><span class="token punctuation">,</span> <span class="token string">"{{ .ProjectName }}"</span><span class="token punctuation">]</span>

    # Which artifacts to sign
    #
    #   all<span class="token operator">:</span>      all artifacts
    #   none<span class="token operator">:</span>     no signing
    #   checksum<span class="token operator">:</span> only checksum <span class="token function">file</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span>
    #   source<span class="token operator">:</span>   source archive
    #   <span class="token keyword">package</span><span class="token operator">:</span>  linux <span class="token function">packages</span> <span class="token punctuation">(</span>deb<span class="token punctuation">,</span> rpm<span class="token punctuation">,</span> apk<span class="token punctuation">)</span>
    #   archive<span class="token operator">:</span>  archives from archive pipe
    #   binary<span class="token operator">:</span>   binaries <span class="token keyword">if</span> archiving format is <span class="token keyword">set</span> to binary
    #   sbom<span class="token operator">:</span>     any Software Bill <span class="token keyword">of</span> Materials generated <span class="token keyword">for</span> other artifacts
    #
    # Default<span class="token operator">:</span> <span class="token string">'none'</span>
    <span class="token literal-property property">artifacts</span><span class="token operator">:</span> all

    # IDs <span class="token keyword">of</span> the artifacts to sign<span class="token punctuation">.</span>
    #
    # If <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">artifacts</span><span class="token template-punctuation string">`</span></span> is checksum or source<span class="token punctuation">,</span> <span class="token keyword">this</span> fields has no effect<span class="token punctuation">.</span>
    <span class="token literal-property property">ids</span><span class="token operator">:</span>
      <span class="token operator">-</span> foo
      <span class="token operator">-</span> bar

    # Stdin data to be given to the signature command <span class="token keyword">as</span> stdin<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">stdin</span><span class="token operator">:</span> <span class="token string">'{{ .Env.GPG_PASSWORD }}'</span>

    # StdinFile file to be given to the signature command <span class="token keyword">as</span> stdin<span class="token punctuation">.</span>
    <span class="token literal-property property">stdin_file</span><span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span><span class="token punctuation">.</span>password

    # Sets a certificate that your signing command should write to<span class="token punctuation">.</span>
    # You can later use <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>certificate<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span> or <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">.Env.certificate</span><span class="token template-punctuation string">`</span></span> <span class="token keyword">in</span> the <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">args</span><span class="token template-punctuation string">`</span></span> section<span class="token punctuation">.</span>
    # This is particularly useful <span class="token keyword">for</span> keyless <span class="token function">signing</span> <span class="token punctuation">(</span><span class="token keyword">for</span> instance<span class="token punctuation">,</span> <span class="token keyword">with</span> cosign<span class="token punctuation">)</span><span class="token punctuation">.</span>
    # Note that <span class="token keyword">this</span> should be a name<span class="token punctuation">,</span> not a path<span class="token punctuation">.</span>
    <span class="token literal-property property">certificate</span><span class="token operator">:</span> <span class="token string">'{{ trimsuffix .Env.artifact ".tar.gz" }}.pem'</span>

    # List <span class="token keyword">of</span> environment variables that will be passed to the signing command
    # <span class="token keyword">as</span> well <span class="token keyword">as</span> the templates<span class="token punctuation">.</span>
    <span class="token literal-property property">env</span><span class="token operator">:</span>
    <span class="token operator">-</span> <span class="token constant">FOO</span><span class="token operator">=</span>bar
    <span class="token operator">-</span> <span class="token constant">HONK</span><span class="token operator">=</span>honkhonk

    # By <span class="token keyword">default</span><span class="token punctuation">,</span> the stdout and stderr <span class="token keyword">of</span> the signing cmd are discarded unless
    # GoReleaser is running <span class="token keyword">with</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">--debug</span><span class="token template-punctuation string">`</span></span> set<span class="token punctuation">.</span>
    # You can <span class="token keyword">set</span> <span class="token keyword">this</span> to <span class="token boolean">true</span> <span class="token keyword">if</span> you want them to be displayed regardless<span class="token punctuation">.</span>
    #
    # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">2</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="可用的变量名称" tabindex="-1"><a class="header-anchor" href="#可用的变量名称" aria-hidden="true">#</a> 可用的变量名称</h3>
<p>这些环境变量可能在接受模板的字段中可用：</p>
<ul>
<li><code v-pre>${artifact}</code>：将被签名的工件的路径</li>
<li><code v-pre>${artifactID}</code>：将被签名的工件的ID</li>
<li><code v-pre>${certificate}</code>：证书文件名（如果提供）</li>
<li><code v-pre>${signature}</code>: 签名文件名</li>
</ul>
<p>假设你有一个<code v-pre>cosign.key</code>在存储库根目录和<code v-pre>COSIGN_PWD</code>环境变量设置，一个简单的使用示例如下：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">signs</span><span class="token operator">:</span>
<span class="token operator">-</span> cmd<span class="token operator">:</span> cosign
  <span class="token literal-property property">stdin</span><span class="token operator">:</span> <span class="token string">'{{ .Env.COSIGN_PWD }}'</span>
  <span class="token literal-property property">args</span><span class="token operator">:</span>
  <span class="token operator">-</span> <span class="token string">"sign-blob"</span>
  <span class="token operator">-</span> <span class="token string">"--key=cosign.key"</span>
  <span class="token operator">-</span> <span class="token string">"--output-signature=${signature}"</span>
  <span class="token operator">-</span> <span class="token string">"${artifact}"</span>
  <span class="token operator">-</span> <span class="token string">"--yes"</span> # needed on cosign <span class="token number">2.0</span><span class="token number">.0</span><span class="token operator">+</span>
  <span class="token literal-property property">artifacts</span><span class="token operator">:</span> all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，您的用户可以通过以下方式验证签名：</p>
<p><code v-pre>cosign verify-blob -key cosign.pub -signature file.tar.gz.sig file.tar.gz</code></p>
<h2 id="对-docker-映像和清单进行签名" tabindex="-1"><a class="header-anchor" href="#对-docker-映像和清单进行签名" aria-hidden="true">#</a> <strong>对 Docker 映像和清单进行签名</strong></h2>
<p>使用 GoReleaser 也可以对 Docker 映像和清单进行签名。该管道是根据通用标志管道设计的，并考虑了共签名。</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yml
<span class="token literal-property property">docker_signs</span><span class="token operator">:</span>
  <span class="token operator">-</span>
    # <span class="token constant">ID</span> <span class="token keyword">of</span> the sign config<span class="token punctuation">,</span> must be unique<span class="token punctuation">.</span>
    # Only relevant <span class="token keyword">if</span> you want to produce some sort <span class="token keyword">of</span> signature file<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'default'</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> foo

    # Path to the signature command
    #
    # Default<span class="token operator">:</span> <span class="token string">'cosign'</span>
    <span class="token literal-property property">cmd</span><span class="token operator">:</span> cosign

    # Command line arguments <span class="token keyword">for</span> the command
    #
    # Templates<span class="token operator">:</span> allowed
    # Default<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"sign"</span><span class="token punctuation">,</span> <span class="token string">"--key=cosign.key"</span><span class="token punctuation">,</span> <span class="token string">"${artifact}@${digest}"</span><span class="token punctuation">,</span> <span class="token string">"--yes"</span><span class="token punctuation">]</span>
    <span class="token literal-property property">args</span><span class="token operator">:</span>
    <span class="token operator">-</span> <span class="token string">"sign"</span>
    <span class="token operator">-</span> <span class="token string">"--key=cosign.key"</span>
    <span class="token operator">-</span> <span class="token string">"--upload=false"</span>
    <span class="token operator">-</span> <span class="token string">"${artifact}"</span>
    <span class="token operator">-</span> <span class="token string">"--yes"</span> # needed on cosign <span class="token number">2.0</span><span class="token number">.0</span><span class="token operator">+</span>

    # Which artifacts to sign
    #
    #   all<span class="token operator">:</span>       all artifacts
    #   none<span class="token operator">:</span>      no signing
    #   images<span class="token operator">:</span>    only docker images
    #   manifests<span class="token operator">:</span> only docker manifests
    #
    # Default<span class="token operator">:</span> <span class="token string">'none'</span>
    <span class="token literal-property property">artifacts</span><span class="token operator">:</span> all

    # IDs <span class="token keyword">of</span> the artifacts to sign<span class="token punctuation">.</span>
    <span class="token literal-property property">ids</span><span class="token operator">:</span>
      <span class="token operator">-</span> foo
      <span class="token operator">-</span> bar

    # Stdin data to be given to the signature command <span class="token keyword">as</span> stdin<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">stdin</span><span class="token operator">:</span> <span class="token string">'{{ .Env.COSIGN_PWD }}'</span>

    # StdinFile file to be given to the signature command <span class="token keyword">as</span> stdin<span class="token punctuation">.</span>
    <span class="token literal-property property">stdin_file</span><span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span><span class="token punctuation">.</span>password

    # List <span class="token keyword">of</span> environment variables that will be passed to the signing command <span class="token keyword">as</span> well <span class="token keyword">as</span> the templates<span class="token punctuation">.</span>
    <span class="token literal-property property">env</span><span class="token operator">:</span>
    <span class="token operator">-</span> <span class="token constant">FOO</span><span class="token operator">=</span>bar
    <span class="token operator">-</span> <span class="token constant">HONK</span><span class="token operator">=</span>honkhonk

    # By <span class="token keyword">default</span><span class="token punctuation">,</span> the stdout and stderr <span class="token keyword">of</span> the signing cmd are discarded unless GoReleaser is running <span class="token keyword">with</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">--debug</span><span class="token template-punctuation string">`</span></span> set<span class="token punctuation">.</span>
    # You can <span class="token keyword">set</span> <span class="token keyword">this</span> to <span class="token boolean">true</span> <span class="token keyword">if</span> you want them to be displayed regardless<span class="token punctuation">.</span>
    #
    # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">2</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这些环境变量可能在可模板化的字段中可用：</p>
<ul>
<li><code v-pre>${artifact}</code>: 将要签名的项目的路径</li>
<li><code v-pre>${digest}</code>: 将签名的映像/清单的摘要</li>
<li><code v-pre>${artifactID}</code>: 将要签名的项目的 ID</li>
<li><code v-pre>${certificate}</code>: 证书文件名（如果提供）</li>
</ul>
<h2 id="release" tabindex="-1"><a class="header-anchor" href="#release" aria-hidden="true">#</a> <strong>Release</strong></h2>
<p>GoReleaser 可以使用当前标签创建 GitHub/GitLab/Gitea 版本，上传所有工件，并根据自上一个标签以来的新提交生成更改日志。</p>
<p>让我们看看 GitHub 部分可以自定义的内容：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">release</span><span class="token operator">:</span>
  # Repo <span class="token keyword">in</span> which the release will be created<span class="token punctuation">.</span>
  # Default is extracted from the origin remote <span class="token constant">URL</span> or empty <span class="token keyword">if</span> its <span class="token keyword">private</span> hosted<span class="token punctuation">.</span>
  <span class="token literal-property property">github</span><span class="token operator">:</span>
    <span class="token literal-property property">owner</span><span class="token operator">:</span> user
    <span class="token literal-property property">name</span><span class="token operator">:</span> repo

  # IDs <span class="token keyword">of</span> the archives to use<span class="token punctuation">.</span>
  # Empty means all IDs<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token literal-property property">ids</span><span class="token operator">:</span>
    <span class="token operator">-</span> foo
    <span class="token operator">-</span> bar

  # If <span class="token keyword">set</span> to <span class="token boolean">true</span><span class="token punctuation">,</span> will not auto<span class="token operator">-</span>publish the release<span class="token punctuation">.</span>
  # Available only <span class="token keyword">for</span> GitHub and Gitea<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token boolean">false</span>
  <span class="token literal-property property">draft</span><span class="token operator">:</span> <span class="token boolean">true</span>

  # Whether to remove existing draft releases <span class="token keyword">with</span> the same name before creating
  # a <span class="token keyword">new</span> <span class="token class-name">one<span class="token punctuation">.</span></span>
  # Only effective <span class="token keyword">if</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">draft</span><span class="token template-punctuation string">`</span></span> is <span class="token keyword">set</span> to <span class="token boolean">true</span><span class="token punctuation">.</span>
  # Available only <span class="token keyword">for</span> GitHub<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token boolean">false</span>
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">11</span>
  <span class="token literal-property property">replace_existing_draft</span><span class="token operator">:</span> <span class="token boolean">true</span>

  # Useful <span class="token keyword">if</span> you want to delay the creation <span class="token keyword">of</span> the tag <span class="token keyword">in</span> the remote<span class="token punctuation">.</span>
  # You can create the tag locally<span class="token punctuation">,</span> but not push it<span class="token punctuation">,</span> and run GoReleaser<span class="token punctuation">.</span>
  # It'll then <span class="token keyword">set</span> the <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">target_commitish</span><span class="token template-punctuation string">`</span></span> portion <span class="token keyword">of</span> the GitHub release to the
  # value <span class="token keyword">of</span> <span class="token keyword">this</span> field<span class="token punctuation">.</span>
  # Only works on GitHub<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">''</span>
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">11</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">target_commitish</span><span class="token operator">:</span> <span class="token string">"{{ .Commit }}"</span>

  # This allows to change which tag GitHub will create<span class="token punctuation">.</span>
  # Usually you'll use <span class="token keyword">this</span> together <span class="token keyword">with</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">target_commitish</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> or <span class="token keyword">if</span> you want to
  # publish a binary from a monorepo into a <span class="token keyword">public</span> repository somewhere<span class="token punctuation">,</span> without
  # the tag prefix<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">'{{ .PrefixedCurrentTag }}'</span>
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">19</span> <span class="token punctuation">(</span>pro<span class="token punctuation">)</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">"{{ .CurrentTag }}"</span>

  # If set<span class="token punctuation">,</span> will create a release discussion <span class="token keyword">in</span> the category specified<span class="token punctuation">.</span>
  #
  # Warning<span class="token operator">:</span> <span class="token keyword">do</span> not use categories <span class="token keyword">in</span> the <span class="token string">'Announcement'</span> format<span class="token punctuation">.</span>
  #  Check https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>goreleaser<span class="token operator">/</span>goreleaser<span class="token operator">/</span>issues<span class="token operator">/</span><span class="token number">2304</span> <span class="token keyword">for</span> more info<span class="token punctuation">.</span>
  #
  # Default is empty<span class="token punctuation">.</span>
  <span class="token literal-property property">discussion_category_name</span><span class="token operator">:</span> General

  # If <span class="token keyword">set</span> to auto<span class="token punctuation">,</span> will mark the release <span class="token keyword">as</span> not ready <span class="token keyword">for</span> production
  # <span class="token keyword">in</span> <span class="token keyword">case</span> there is an indicator <span class="token keyword">for</span> <span class="token keyword">this</span> <span class="token keyword">in</span> the tag e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> v1<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span>rc1
  # If <span class="token keyword">set</span> to <span class="token boolean">true</span><span class="token punctuation">,</span> will mark the release <span class="token keyword">as</span> not ready <span class="token keyword">for</span> production<span class="token punctuation">.</span>
  # Default is <span class="token boolean">false</span><span class="token punctuation">.</span>
  <span class="token literal-property property">prerelease</span><span class="token operator">:</span> auto

  # If <span class="token keyword">set</span> to <span class="token boolean">false</span><span class="token punctuation">,</span> will <span class="token constant">NOT</span> mark the release <span class="token keyword">as</span> <span class="token string">"latest"</span><span class="token punctuation">.</span>
  # This prevents it from being shown at the top <span class="token keyword">of</span> the release list<span class="token punctuation">,</span>
  # and from being returned when calling https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>api<span class="token punctuation">.</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>repos<span class="token operator">/</span><span class="token constant">OWNER</span><span class="token operator">/</span><span class="token constant">REPO</span><span class="token operator">/</span>releases<span class="token operator">/</span>latest<span class="token punctuation">.</span>
  #
  # Available only <span class="token keyword">for</span> GitHub<span class="token punctuation">.</span>
  #
  # Default is <span class="token boolean">true</span><span class="token punctuation">.</span>
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">20.</span>
  <span class="token literal-property property">make_latest</span><span class="token operator">:</span> <span class="token boolean">true</span>

  # What to <span class="token keyword">do</span> <span class="token keyword">with</span> the release notes <span class="token keyword">in</span> <span class="token keyword">case</span> there the release already exists<span class="token punctuation">.</span>
  #
  # Valid options are<span class="token operator">:</span>
  # <span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">keep-existing</span><span class="token template-punctuation string">`</span></span><span class="token operator">:</span> keep the existing notes
  # <span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">append</span><span class="token template-punctuation string">`</span></span><span class="token operator">:</span> append the current release notes to the existing notes
  # <span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">prepend</span><span class="token template-punctuation string">`</span></span><span class="token operator">:</span> prepend the current release notes to the existing notes
  # <span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">replace</span><span class="token template-punctuation string">`</span></span><span class="token operator">:</span> replace existing notes
  #
  # Default is <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">keep-existing</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">.</span>
  <span class="token literal-property property">mode</span><span class="token operator">:</span> append

  # Header <span class="token keyword">for</span> the release body<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">header</span><span class="token operator">:</span> <span class="token operator">|</span>
    ## Some <span class="token function">title</span> <span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Date <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

    Welcome to <span class="token keyword">this</span> <span class="token keyword">new</span> <span class="token class-name">release</span><span class="token operator">!</span>

  # Footer <span class="token keyword">for</span> the release body<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">footer</span><span class="token operator">:</span> <span class="token operator">|</span>
    ## Thanks<span class="token operator">!</span>

    Those were the changes on <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Tag <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">!</span>

  # You can change the name <span class="token keyword">of</span> the release<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">'{{.Tag}}'</span> <span class="token punctuation">(</span><span class="token string">'{{.PrefixedTag}}'</span> on Pro<span class="token punctuation">)</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">name_template</span><span class="token operator">:</span> <span class="token string">"{{.ProjectName}}-v{{.Version}} {{.Env.USER}}"</span>

  # You can disable <span class="token keyword">this</span> pipe <span class="token keyword">in</span> order to not create the release on any <span class="token constant">SCM</span><span class="token punctuation">.</span>
  # Keep <span class="token keyword">in</span> mind that <span class="token keyword">this</span> might also <span class="token keyword">break</span> things that depend on the release
  # <span class="token constant">URL</span><span class="token punctuation">,</span> <span class="token keyword">for</span> instance<span class="token punctuation">,</span> homebrew taps<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> <span class="token function">allowed</span> <span class="token punctuation">(</span>since v1<span class="token punctuation">.</span><span class="token number">15</span><span class="token punctuation">)</span>
  <span class="token literal-property property">disable</span><span class="token operator">:</span> <span class="token boolean">true</span>

  # Set <span class="token keyword">this</span> to <span class="token boolean">true</span> <span class="token keyword">if</span> you want to disable just the artifact upload to the <span class="token constant">SCM</span><span class="token punctuation">.</span>
  # If <span class="token keyword">this</span> is <span class="token boolean">true</span><span class="token punctuation">,</span> GoReleaser will still create the release <span class="token keyword">with</span> the
  # changelog<span class="token punctuation">,</span> but won't upload anything to it<span class="token punctuation">.</span>
  #
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">11</span>
  # Templates<span class="token operator">:</span> <span class="token function">allowed</span> <span class="token punctuation">(</span>since v1<span class="token punctuation">.</span><span class="token number">15</span><span class="token punctuation">)</span>
  <span class="token literal-property property">skip_upload</span><span class="token operator">:</span> <span class="token boolean">true</span>

  # You can add extra pre<span class="token operator">-</span>existing files to the release<span class="token punctuation">.</span>
  # The filename on the release will be the last part <span class="token keyword">of</span> the <span class="token function">path</span> <span class="token punctuation">(</span>base<span class="token punctuation">)</span><span class="token punctuation">.</span>
  # If another file <span class="token keyword">with</span> the same name exists<span class="token punctuation">,</span> the last one found will be used<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">extra_files</span><span class="token operator">:</span>
    <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>path<span class="token operator">/</span>to<span class="token operator">/</span>file<span class="token punctuation">.</span>txt
    <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>glob<span class="token comment">/**/</span>to<span class="token comment">/**/</span>file<span class="token comment">/**/</span><span class="token operator">*</span>
    <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>glob<span class="token operator">/</span>foo<span class="token operator">/</span>to<span class="token operator">/</span>bar<span class="token operator">/</span>file<span class="token operator">/</span>foobar<span class="token operator">/</span>override_from_previous
    <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>single_file<span class="token punctuation">.</span>txt
      <span class="token literal-property property">name_template</span><span class="token operator">:</span> file<span class="token punctuation">.</span>txt # note that <span class="token keyword">this</span> only works <span class="token keyword">if</span> glob matches <span class="token number">1</span> file only

  # Additional templated extra files to add to the release<span class="token punctuation">.</span>
  # Those files will have their contents pass through the template engine<span class="token punctuation">,</span>
  # and its results will be added to the release<span class="token punctuation">.</span>
  #
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span> <span class="token punctuation">(</span>pro<span class="token punctuation">)</span>
  # This feature is only available <span class="token keyword">in</span> GoReleaser Pro<span class="token punctuation">.</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">templated_extra_files</span><span class="token operator">:</span>
    <span class="token operator">-</span> src<span class="token operator">:</span> <span class="token constant">LICENSE</span><span class="token punctuation">.</span>tpl
      <span class="token literal-property property">dst</span><span class="token operator">:</span> <span class="token constant">LICENSE</span><span class="token punctuation">.</span>txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gpg-认证" tabindex="-1"><a class="header-anchor" href="#gpg-认证" aria-hidden="true">#</a> GPG 认证</h2>
<p>GitHub 支持多种 GPG 关键算法。如果您尝试添加使用不受支持的算法生成的密钥，则可能会遇到错误。</p>
<h3 id="检查现有-gpg-密钥" tabindex="-1"><a class="header-anchor" href="#检查现有-gpg-密钥" aria-hidden="true">#</a> <strong>检查现有 GPG 密钥</strong></h3>
<p>使用该<code v-pre>gpg --list-secret-keys --keyid-format=long</code>命令列出您拥有公钥和私钥的 GPG 密钥的长格式。签署提交或标签需要私钥。</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>gpg <span class="token operator">--</span>list<span class="token operator">-</span>secret<span class="token operator">-</span>keys <span class="token operator">--</span>keyid<span class="token operator">-</span>format<span class="token operator">=</span>long
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="生成新的-gpg-密钥" tabindex="-1"><a class="header-anchor" href="#生成新的-gpg-密钥" aria-hidden="true">#</a> <strong>生成新的 GPG 密钥</strong></h3>
<p>通过 git 的参数校验。配置：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>git config <span class="token operator">--</span>global gpg<span class="token punctuation">.</span>program gpg2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>生成密钥对：</strong></p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>gpg <span class="token operator">--</span>full<span class="token operator">-</span>generate<span class="token operator">-</span>key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>检查密钥对：</strong></p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>gpg <span class="token operator">--</span>list<span class="token operator">-</span>secret<span class="token operator">-</span>keys <span class="token operator">--</span>keyid<span class="token operator">-</span>format<span class="token operator">=</span>long
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从 GPG 密钥列表中，复制您要使用的 GPG 密钥 ID 的完整形式。</p>
<ol>
<li>
<p>在此示例中，GPG 密钥 ID 为<code v-pre>3AA5C34371567BD2</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ gpg --list-secret-keys --keyid-format=long
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot &lt;hubot@example.com>
ssb   4096R/4BB6D45482678BE3 2016-03-10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>粘贴下面的文本，并将其替换为您要使用的 GPG 密钥 ID。在此示例中，GPG 密钥 ID 为<code v-pre>3AA5C34371567BD2</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>gpg --armor --export 3AA5C34371567BD2
# Prints the GPG key ID, in ASCII armor format
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>复制您的 GPG 密钥，以 开头<code v-pre>----BEGIN PGP PUBLIC KEY BLOCK-----</code>和结尾<code v-pre>----END PGP PUBLIC KEY BLOCK-----</code>。</p>
</li>
</ol>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>cat <span class="token operator">/</span>root<span class="token operator">/</span><span class="token punctuation">.</span>gnupg<span class="token operator">/</span>openpgp<span class="token operator">-</span>revocs<span class="token punctuation">.</span>d<span class="token operator">/</span>4DDA37AE0F3AEA3044B33F1B1BAD6F395338EFDE<span class="token punctuation">.</span>rev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后就是将这个密钥链接到你的 GitHub 账户了。这个操作很简单，不介绍了</p>
<p><strong>告诉 Git 你的签名密钥：</strong></p>
<p>你还需要告诉 Git 关于你的 签名 密钥，因为 如果您有多个 GPG 密钥，则需要告诉 Git 使用哪一个。</p>
<ol>
<li>
<p>如果您之前已将 Git 配置为在使用 进行签名时使用不同的密钥格式，请取消设置此配置，以便使用<code v-pre>-gpg-sign</code>默认格式。<code v-pre>openpgp</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git config --global --unset gpg.format
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<p>使用该<code v-pre>gpg --list-secret-keys --keyid-format=long</code>命令列出您拥有公钥和私钥的 GPG 密钥的长格式。签署提交或标签需要私钥。</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>gpg <span class="token operator">--</span>list<span class="token operator">-</span>secret<span class="token operator">-</span>keys <span class="token operator">--</span>keyid<span class="token operator">-</span>format<span class="token operator">=</span>long
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>从 GPG 密钥列表中，复制您要使用的 GPG 密钥 ID 的完整形式。在此示例中，GPG 密钥 ID 为<code v-pre>3AA5C34371567BD2</code>：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>$ gpg <span class="token operator">--</span>list<span class="token operator">-</span>secret<span class="token operator">-</span>keys <span class="token operator">--</span>keyid<span class="token operator">-</span>format<span class="token operator">=</span>long
<span class="token operator">/</span>Users<span class="token operator">/</span>hubot<span class="token operator">/</span><span class="token punctuation">.</span>gnupg<span class="token operator">/</span>secring<span class="token punctuation">.</span>gpg
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
sec   4096R<span class="token operator">/</span>3AA5C34371567BD2 <span class="token number">2016</span><span class="token operator">-</span><span class="token number">03</span><span class="token operator">-</span><span class="token number">10</span> <span class="token punctuation">[</span>expires<span class="token operator">:</span> <span class="token number">2017</span><span class="token operator">-</span><span class="token number">03</span><span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">]</span>
uid                          Hubot <span class="token operator">&lt;</span>hubot@example<span class="token punctuation">.</span>com<span class="token operator">></span>
ssb   4096R<span class="token operator">/</span>4BB6D45482678BE3 <span class="token number">2016</span><span class="token operator">-</span><span class="token number">03</span><span class="token operator">-</span><span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要在 Git 中设置主 GPG 签名密钥，请粘贴下面的文本，并替换为您要使用的 GPG 主密钥 ID。在此示例中，GPG 密钥 ID 为<code v-pre>3AA5C34371567BD2</code>：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>git config <span class="token operator">--</span>global user<span class="token punctuation">.</span>signingkey 3AA5C34371567BD2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者，在设置子项时包含后缀<code v-pre>!</code>。在此示例中，GPG 子密钥 ID 为<code v-pre>4BB6D45482678BE3</code>：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>git config <span class="token operator">--</span>global user<span class="token punctuation">.</span>signingkey 4BB6D45482678BE3<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者，要将 Git 配置为默认签署所有提交，请输入以下命令：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>git config <span class="token operator">--</span>global commit<span class="token punctuation">.</span>gpgsign <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><a href="https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key#telling-git-about-your-ssh-key" target="_blank" rel="noopener noreferrer">告诉 Git 你的 SSH 密钥<ExternalLinkIcon/></a></li>
</ul>
<p>您可以使用现有的 SSH 密钥来签署提交和标签，或生成专门用于签名的新密钥。有关更多信息，请参阅“<a href="https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent" target="_blank" rel="noopener noreferrer">生成新的 SSH 密钥并将其添加到 ssh-agent<ExternalLinkIcon/></a> ”。</p>
<p><strong>注意：</strong></p>
<p>我们可能需要将 <code v-pre>export GPG_TTY=$(tty)</code> 添加到环境变量中</p>
<h3 id="签名标签" tabindex="-1"><a class="header-anchor" href="#签名标签" aria-hidden="true">#</a> <strong>签名标签</strong></h3>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code>$ git tag <span class="token operator">-</span>s <span class="token constant">MYTAG</span>
# Creates a signed tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>通过运行验证您的签名标签<code v-pre>git tag -v [tag-name]</code>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ git tag -v MYTAG
# Verifies the signed tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="云存储服务" tabindex="-1"><a class="header-anchor" href="#云存储服务" aria-hidden="true">#</a> 云存储服务</h2>
<p>允许您将工件上传到 Amazon S3、Azure Blob 和 Google GCS。</p>
<p>其实不仅仅是这些，还有包括国内的 COS 和 CSS</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">blobs</span><span class="token operator">:</span>
  # You can have multiple blob configs
  <span class="token operator">-</span> # Cloud provider name<span class="token operator">:</span>
    # <span class="token operator">-</span> s3 <span class="token keyword">for</span> <span class="token constant">AWS</span> <span class="token constant">S3</span> Storage
    # <span class="token operator">-</span> azblob <span class="token keyword">for</span> Azure Blob Storage
    # <span class="token operator">-</span> gs <span class="token keyword">for</span> Google Cloud Storage
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">provider</span><span class="token operator">:</span> azblob

    # Set a custom endpoint<span class="token punctuation">,</span> useful <span class="token keyword">if</span> you're using a minio backend or
    # other s3<span class="token operator">-</span>compatible backends<span class="token punctuation">.</span>
    #
    # Implies s3ForcePathStyle and requires provider to be <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">s3</span><span class="token template-punctuation string">`</span></span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">endpoint</span><span class="token operator">:</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>minio<span class="token punctuation">.</span>foo<span class="token punctuation">.</span>bar

    # Sets the bucket region<span class="token punctuation">.</span>
    # Requires provider to be <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">s3</span><span class="token template-punctuation string">`</span></span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">region</span><span class="token operator">:</span> us<span class="token operator">-</span>west<span class="token operator">-</span><span class="token number">1</span>

    # Disables <span class="token constant">SSL</span>
    # Requires provider to be <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">s3</span><span class="token template-punctuation string">`</span></span>
    <span class="token literal-property property">disableSSL</span><span class="token operator">:</span> <span class="token boolean">true</span>

    # Bucket name<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">bucket</span><span class="token operator">:</span> goreleaser<span class="token operator">-</span>bucket

    # IDs <span class="token keyword">of</span> the artifacts you want to upload<span class="token punctuation">.</span>
    <span class="token literal-property property">ids</span><span class="token operator">:</span>
      <span class="token operator">-</span> foo
      <span class="token operator">-</span> bar

    # Path<span class="token operator">/</span>name inside the bucket<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'{{ .ProjectName }}/{{ .Tag }}'</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">folder</span><span class="token operator">:</span> <span class="token string">"foo/bar/{{.Version}}"</span>

    # Whether to disable <span class="token keyword">this</span> particular upload configuration<span class="token punctuation">.</span>
    #
    # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">disable</span><span class="token operator">:</span> <span class="token string">'{{ neq .BLOB_UPLOAD_ONLY "foo" }}'</span>

    # You can add extra pre<span class="token operator">-</span>existing files to the bucket<span class="token punctuation">.</span>
    # The filename on the release will be the last part <span class="token keyword">of</span> the <span class="token function">path</span> <span class="token punctuation">(</span>base<span class="token punctuation">)</span><span class="token punctuation">.</span>
    # If another file <span class="token keyword">with</span> the same name exists<span class="token punctuation">,</span> the last one found will be used<span class="token punctuation">.</span>
    # These globs can also include templates<span class="token punctuation">.</span>
    <span class="token literal-property property">extra_files</span><span class="token operator">:</span>
      <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>path<span class="token operator">/</span>to<span class="token operator">/</span>file<span class="token punctuation">.</span>txt
      <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>glob<span class="token comment">/**/</span>to<span class="token comment">/**/</span>file<span class="token comment">/**/</span><span class="token operator">*</span>
      <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>glob<span class="token operator">/</span>foo<span class="token operator">/</span>to<span class="token operator">/</span>bar<span class="token operator">/</span>file<span class="token operator">/</span>foobar<span class="token operator">/</span>override_from_previous
      <span class="token operator">-</span> glob<span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>single_file<span class="token punctuation">.</span>txt
        # Templates<span class="token operator">:</span> allowed
        <span class="token literal-property property">name_template</span><span class="token operator">:</span> file<span class="token punctuation">.</span>txt # note that <span class="token keyword">this</span> only works <span class="token keyword">if</span> glob matches <span class="token number">1</span> file only

    # Additional templated extra files to uploaded<span class="token punctuation">.</span>
    # Those files will have their contents pass through the template engine<span class="token punctuation">,</span>
    # and its results will be uploaded<span class="token punctuation">.</span>
    #
    # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span> <span class="token punctuation">(</span>pro<span class="token punctuation">)</span>
    # This feature is only available <span class="token keyword">in</span> GoReleaser Pro<span class="token punctuation">.</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">templated_extra_files</span><span class="token operator">:</span>
      <span class="token operator">-</span> src<span class="token operator">:</span> <span class="token constant">LICENSE</span><span class="token punctuation">.</span>tpl
        <span class="token literal-property property">dst</span><span class="token operator">:</span> <span class="token constant">LICENSE</span><span class="token punctuation">.</span>txt

  <span class="token operator">-</span> provider<span class="token operator">:</span> gs
    <span class="token literal-property property">bucket</span><span class="token operator">:</span> goreleaser<span class="token operator">-</span>bucket
    <span class="token literal-property property">folder</span><span class="token operator">:</span> <span class="token string">"foo/bar/{{.Version}}"</span>
  <span class="token operator">-</span> provider<span class="token operator">:</span> s3
    <span class="token literal-property property">bucket</span><span class="token operator">:</span> goreleaser<span class="token operator">-</span>bucket
    <span class="token literal-property property">folder</span><span class="token operator">:</span> <span class="token string">"foo/bar/{{.Version}}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fury-io-apt-和-rpm-存储库" tabindex="-1"><a class="header-anchor" href="#fury-io-apt-和-rpm-存储库" aria-hidden="true">#</a> <strong>Fury.io (apt 和 rpm 存储库）</strong></h3>
<p><strong>这是一个高级功能</strong>，但是 sealos 也使用了，用的是 bash 逻辑</p>
<p>您可以使用 GoReleaser 轻松地在 fury.io 上创建和存储库。</p>
<p>首先，您需要在 fury.io 上创建一个帐户并获取推送令牌。</p>
<p>然后，您需要将您的帐户名称传递给 GoReleaser，并将您的推送令牌作为名为 <code v-pre>FURY_TOKEN</code> ：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">furies</span><span class="token operator">:</span>
<span class="token operator">-</span> account<span class="token operator">:</span> myaccount
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将自动上传您的所有文件。</p>
<p><strong>自定义：</strong></p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># goreleaser<span class="token punctuation">.</span>yaml

<span class="token literal-property property">furies</span><span class="token operator">:</span>
  <span class="token operator">-</span>
    # fury<span class="token punctuation">.</span>io account<span class="token punctuation">.</span>
    # Config is skipped <span class="token keyword">if</span> empty
    <span class="token literal-property property">account</span><span class="token operator">:</span> <span class="token string">"{{ .Env.FURY_ACCOUNT }}"</span>

    # Skip the announcing feature <span class="token keyword">in</span> some conditions<span class="token punctuation">,</span> <span class="token keyword">for</span> instance<span class="token punctuation">,</span> when
    # publishing patch releases<span class="token punctuation">.</span>
    # Any value different <span class="token keyword">of</span> <span class="token string">'true'</span> will be considered <span class="token string">'false'</span><span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">skip</span><span class="token operator">:</span> <span class="token string">"{{gt .Patch 0}}"</span>

    # Environment variable name to <span class="token keyword">get</span> the push token from<span class="token punctuation">.</span>
    # You might want to change it <span class="token keyword">if</span> you have multiple fury configurations <span class="token keyword">for</span>
    # some reason<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'FURY_TOKEN'</span>
    <span class="token literal-property property">secret_name</span><span class="token operator">:</span> <span class="token constant">MY_ACCOUNT_FURY_TOKEN</span>

    # IDs to filter by<span class="token punctuation">.</span>
    # configurations <span class="token keyword">get</span> uploaded<span class="token punctuation">.</span>
    <span class="token literal-property property">ids</span><span class="token operator">:</span>
      <span class="token operator">-</span> packages

    # Formats to upload<span class="token punctuation">.</span>
    # Available options are <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">deb</span><span class="token template-punctuation string">`</span></span> and <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">rpm</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'deb'</span><span class="token punctuation">,</span> <span class="token string">'rpm'</span><span class="token punctuation">]</span>
    <span class="token literal-property property">formats</span><span class="token operator">:</span>
      <span class="token operator">-</span> deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="homebrew-taps" tabindex="-1"><a class="header-anchor" href="#homebrew-taps" aria-hidden="true">#</a> <strong>Homebrew Taps</strong></h2>
<p>发布到 GitHub、GitLab 或 Gitea 后，GoReleaser 可以生成 <em>homebrew-tap</em> 并将其发布到您有权访问的存储库中。</p>
<h2 id="announce" tabindex="-1"><a class="header-anchor" href="#announce" aria-hidden="true">#</a> <strong>Announce</strong></h2>
<p>GoReleaser还可以在社交网络，聊天室和电子邮件上宣布新版本！</p>
<p>它在管道的最末端运行，可以使用命令的标志或通过 skip 属性跳过：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">announce</span><span class="token operator">:</span>
  # Skip the announcing feature <span class="token keyword">in</span> some conditions<span class="token punctuation">,</span> <span class="token keyword">for</span> instance<span class="token punctuation">,</span> when
  # publishing patch releases<span class="token punctuation">.</span>
  #
  # Any value different <span class="token keyword">from</span> <span class="token string">'true'</span> is evaluated to <span class="token boolean">false</span><span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">skip</span><span class="token operator">:</span> <span class="token string">"{{gt .Patch 0}}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="目前支持很多个账户" tabindex="-1"><a class="header-anchor" href="#目前支持很多个账户" aria-hidden="true">#</a> 目前支持很多个账户</h3>
<p><strong>Discode:</strong></p>
<p>要使用 Discord，您需要创建一个 <a href="https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks" target="_blank" rel="noopener noreferrer">Webhook<ExternalLinkIcon/></a>，并在管道上设置以下环境变量：</p>
<ul>
<li><code v-pre>DISCORD_WEBHOOK_ID</code></li>
<li><code v-pre>DISCORD_WEBHOOK_TOKEN</code></li>
</ul>
<p>在此之后，您可以将以下部分添加到您的配置中：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">announce</span><span class="token operator">:</span>
  <span class="token literal-property property">discord</span><span class="token operator">:</span>
    # Whether its enabled or not<span class="token punctuation">.</span>
    <span class="token literal-property property">enabled</span><span class="token operator">:</span> <span class="token boolean">true</span>

    # Message template to use <span class="token keyword">while</span> publishing<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'{{ .ProjectName }} {{ .Tag }} is out! Check it out at {{ .ReleaseURL }}'</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">message_template</span><span class="token operator">:</span> <span class="token string">'Awesome project {{.Tag}} is out!'</span>

    # Set author <span class="token keyword">of</span> the embed<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'GoReleaser'</span>
    <span class="token literal-property property">author</span><span class="token operator">:</span> <span class="token string">''</span>

    # Color code <span class="token keyword">of</span> the embed<span class="token punctuation">.</span> You have to use decimal numeral system<span class="token punctuation">,</span> not hexadecimal<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'3888754'</span> <span class="token punctuation">(</span>the grey<span class="token operator">-</span>ish from GoReleaser<span class="token punctuation">)</span>
    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">''</span>

    # <span class="token constant">URL</span> to an image to use <span class="token keyword">as</span> the icon <span class="token keyword">for</span> the embed<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'https://goreleaser.com/static/avatar.png'</span>
    <span class="token literal-property property">icon_url</span><span class="token operator">:</span> <span class="token string">''</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要使其正常工作，您需要在管道上设置一些环境变量：</p>
<ul>
<li><code v-pre>LINKEDIN_ACCESS_TOKEN</code></li>
</ul>
<blockquote>
<p>We currently don't support posting in groups.</p>
</blockquote>
<p>然后，您可以在配置中添加类似以下内容的内容：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">announce</span><span class="token operator">:</span>
  <span class="token literal-property property">linkedin</span><span class="token operator">:</span>
    # Whether its enabled or not<span class="token punctuation">.</span>
    <span class="token literal-property property">enabled</span><span class="token operator">:</span> <span class="token boolean">true</span>

    # Message to use <span class="token keyword">while</span> publishing<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'{{ .ProjectName }} {{ .Tag }} is out! Check it out at {{ .ReleaseURL }}'</span>
    <span class="token literal-property property">message_template</span><span class="token operator">:</span> <span class="token string">'Awesome project {{.Tag}} is out!'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="slack" tabindex="-1"><a class="header-anchor" href="#slack" aria-hidden="true">#</a> slack</h3>
<p>和 discode 一样， slack 同样也是需要传入一个新的 <code v-pre>Webhook</code></p>
<ul>
<li><code v-pre>SLACK_WEBHOOK</code></li>
</ul>
<p>然后，您可以在配置中添加类似以下内容的内容：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">announce</span><span class="token operator">:</span>
  <span class="token literal-property property">slack</span><span class="token operator">:</span>
    # Whether its enabled or not<span class="token punctuation">.</span>
    <span class="token literal-property property">enabled</span><span class="token operator">:</span> <span class="token boolean">true</span>

    <span class="token operator">**</span><span class="token operator">**</span># Message template to use <span class="token keyword">while</span> publishing<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">'{{ .ProjectName }} {{ .Tag }} is out! Check it out at {{ .ReleaseURL }}'</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">message_template</span><span class="token operator">:</span> <span class="token string">'Awesome project {{.Tag}} is out!'</span>

    # The name <span class="token keyword">of</span> the channel that the user selected <span class="token keyword">as</span> a destination <span class="token keyword">for</span> webhook messages<span class="token punctuation">.</span>
    <span class="token literal-property property">channel</span><span class="token operator">:</span> <span class="token string">'#channel'</span>

    # Set your Webhook's user name<span class="token punctuation">.</span>
    <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token string">''</span>

    # Emoji to use <span class="token keyword">as</span> the icon <span class="token keyword">for</span> <span class="token keyword">this</span> message<span class="token punctuation">.</span> Overrides icon_url<span class="token punctuation">.</span>
    <span class="token literal-property property">icon_emoji</span><span class="token operator">:</span> <span class="token string">''</span>

    # <span class="token constant">URL</span> to an image to use <span class="token keyword">as</span> the icon <span class="token keyword">for</span> <span class="token keyword">this</span> message<span class="token punctuation">.</span>
    <span class="token literal-property property">icon_url</span><span class="token operator">:</span> <span class="token string">''</span>

    # Blocks <span class="token keyword">for</span> advanced formatting<span class="token punctuation">,</span> <span class="token literal-property property">see</span><span class="token operator">:</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>api<span class="token punctuation">.</span>slack<span class="token punctuation">.</span>com<span class="token operator">/</span>messaging<span class="token operator">/</span>webhooks#advanced_message_formatting
    # and https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>api<span class="token punctuation">.</span>slack<span class="token punctuation">.</span>com<span class="token operator">/</span>messaging<span class="token operator">/</span>composing<span class="token operator">/</span>layouts#adding<span class="token operator">-</span>blocks<span class="token punctuation">.</span>
    #
    # Attention<span class="token operator">:</span> goreleaser doesn't check the full structure <span class="token keyword">of</span> the Slack <span class="token constant">API</span><span class="token operator">:</span> please make sure that
    # your configuration <span class="token keyword">for</span> advanced message formatting abides by <span class="token keyword">this</span> <span class="token constant">API</span><span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">blocks</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    # Attachments<span class="token punctuation">,</span> <span class="token literal-property property">see</span><span class="token operator">:</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>api<span class="token punctuation">.</span>slack<span class="token punctuation">.</span>com<span class="token operator">/</span>reference<span class="token operator">/</span>messaging<span class="token operator">/</span>attachments
    #
    # Attention<span class="token operator">:</span> goreleaser doesn't check the full structure <span class="token keyword">of</span> the Slack <span class="token constant">API</span><span class="token operator">:</span> please make sure that
    # your configuration <span class="token keyword">for</span> advanced message formatting abides by <span class="token keyword">this</span> <span class="token constant">API</span><span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">attachments</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>
<ul>
<li><a href="https://docs.docker.com/engine/reference/commandline/manifest/" target="_blank" rel="noopener noreferrer">https://docs.docker.com/engine/reference/commandline/manifest/<ExternalLinkIcon/></a></li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '85.md' style='float:left'>⬆️上一节🔗  </a><a href = '87.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


