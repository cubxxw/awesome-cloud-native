<template><div><h1 id="chart-releaser" tabindex="-1"><a class="header-anchor" href="#chart-releaser" aria-hidden="true">#</a> Chart Releaser</h1>
<p>我们已经有了一套的 Helm Charts ，想办法把他们串起来发布出去，此时想着可以使用 chart releaser 来实现了。</p>
<p>我们的仓库地址是：https://github.com/openimsdk/helm-charts/</p>
<p>我们来介绍两种工具</p>
<ul>
<li>cr: https://github.com/helm/chart-releaser</li>
<li>ct: https://github.com/helm/chart-testing</li>
</ul>
<h2 id="cr" tabindex="-1"><a class="header-anchor" href="#cr" aria-hidden="true">#</a> CR</h2>
<p><strong>使用的工具 GitHub 地址：https://github.com/helm/chart-releaser</strong></p>
<blockquote>
<p><strong>帮助将GitHub存储库转换为Helm Chart存储库</strong></p>
</blockquote>
<p>简称为 CR:cr-release-packages</p>
<blockquote>
<p><code v-pre>cr</code> 是一个工具，旨在帮助GitHub存储库自托管自己的图表存储库，方法是将Helm图表工件添加到以图表版本命名的GitHub发布版本中，然后为可以托管在GitHub Pages（或其他地方！）上的这些发布版本创建 <code v-pre>index.yaml</code> 文件。</p>
</blockquote>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<p>Binaries (recommended) 二进制文件（推荐）</p>
<p>从版本页面下载您的首选资产并手动安装。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ brew tap helm/tap
$ brew <span class="token function">install</span> chart-releaser
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>目前， <code v-pre>cr</code> 可以从打包到目录中的一组图表创建GitHub Releases，并从GitHub Releases为图表存储库创建 <code v-pre>index.yaml</code> 文件。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ cr

Create Helm chart repositories on GitHub Pages by uploading Chart packages
and Chart metadata to GitHub Releases and creating a suitable index <span class="token function">file</span>

Usage:
  cr <span class="token punctuation">[</span>command<span class="token punctuation">]</span>

Available Commands:
  completion  Generate the autocompletion script <span class="token keyword">for</span> the specified shell
  <span class="token builtin class-name">help</span>        Help about any <span class="token builtin class-name">command</span>
  index       Update Helm repo index.yaml <span class="token keyword">for</span> the given GitHub repo
  package     Package Helm charts
  upload      Upload Helm chart packages to GitHub Releases
  version     Print version information

Flags:
      <span class="token parameter variable">--config</span> string   Config <span class="token function">file</span> <span class="token punctuation">(</span>default is <span class="token environment constant">$HOME</span>/.cr.yaml<span class="token punctuation">)</span>
  -h, <span class="token parameter variable">--help</span>            <span class="token builtin class-name">help</span> <span class="token keyword">for</span> cr

Use <span class="token string">"cr [command] --help"</span> <span class="token keyword">for</span> <span class="token function">more</span> information about a command.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>解析可以用的命令：</strong></p>
<ul>
<li><code v-pre>completion</code>
生成指定 shell 的自动补全脚本。这有助于在使用 <code v-pre>cr</code> 命令时自动提示可用的命令和参数。</li>
<li><code v-pre>help</code>
提供关于任何命令的帮助信息。</li>
<li><code v-pre>index</code>
为给定的 GitHub 仓库更新 Helm 仓库的 <code v-pre>index.yaml</code> 文件。这个文件是 Helm 仓库的索引，包含了仓库中所有图表的信息。</li>
<li><code v-pre>package</code>
打包 Helm 图表。这个过程通常涉及将图表源代码（通常是一组 YAML 文件）打包成一个压缩文件，以便发布和分发。</li>
<li><code v-pre>upload</code>
将 Helm 图表包上传到 GitHub Releases。这是将 Helm 图表发布到 GitHub 仓库的一种方式。</li>
<li><code v-pre>version</code>
打印 <code v-pre>cr</code> 工具的版本信息。</li>
</ul>
<h3 id="从helm-chart软件包创建github版本" tabindex="-1"><a class="header-anchor" href="#从helm-chart软件包创建github版本" aria-hidden="true">#</a> 从Helm Chart软件包创建GitHub版本</h3>
<p>扫描Helm chart包的路径，并在指定的GitHub存储库中创建发布，上传包。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ cr upload <span class="token parameter variable">--help</span>
Upload Helm chart packages to GitHub Releases

Usage:
  cr upload <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>

Flags:
  -c, <span class="token parameter variable">--commit</span> string                  Target commit <span class="token keyword">for</span> release
      --generate-release-notes         Whether to automatically generate the name and body <span class="token keyword">for</span> this release. See https://docs.github.com/en/rest/releases/releases
  -b, --git-base-url string            GitHub Base URL <span class="token punctuation">(</span>only needed <span class="token keyword">for</span> private GitHub<span class="token punctuation">)</span> <span class="token punctuation">(</span>default <span class="token string">"https://api.github.com/"</span><span class="token punctuation">)</span>
  -r, --git-repo string                GitHub repository
  -u, --git-upload-url string          GitHub Upload URL <span class="token punctuation">(</span>only needed <span class="token keyword">for</span> private GitHub<span class="token punctuation">)</span> <span class="token punctuation">(</span>default <span class="token string">"https://uploads.github.com/"</span><span class="token punctuation">)</span>
  -h, <span class="token parameter variable">--help</span>                           <span class="token builtin class-name">help</span> <span class="token keyword">for</span> upload
  -o, <span class="token parameter variable">--owner</span> string                   GitHub username or organization
  -p, --package-path string            Path to directory with chart packages <span class="token punctuation">(</span>default <span class="token string">".cr-release-packages"</span><span class="token punctuation">)</span>
      --release-name-template string   Go template <span class="token keyword">for</span> computing release names, using chart metadata <span class="token punctuation">(</span>default <span class="token string">"{{ .Name }}-{{ .Version }}"</span><span class="token punctuation">)</span>
      --release-notes-file string      Markdown <span class="token function">file</span> with chart release notes. If it is <span class="token builtin class-name">set</span> to empty string, or the <span class="token function">file</span> is not found, the chart description will be used instead. The <span class="token function">file</span> is <span class="token builtin class-name">read</span> from the chart package
      --skip-existing                  Skip upload <span class="token keyword">if</span> release exists
  -t, <span class="token parameter variable">--token</span> string                   GitHub Auth Token
      --make-release-latest bool       Mark the created GitHub release as <span class="token string">'latest'</span> <span class="token punctuation">(</span>default <span class="token string">"true"</span><span class="token punctuation">)</span>
      --packages-with-index            Host the package files <span class="token keyword">in</span> the GitHub Pages branch

Global Flags:
      <span class="token parameter variable">--config</span> string   Config <span class="token function">file</span> <span class="token punctuation">(</span>default is <span class="token environment constant">$HOME</span>/.cr.yaml<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="从github-releases创建存储库索引" tabindex="-1"><a class="header-anchor" href="#从github-releases创建存储库索引" aria-hidden="true">#</a> 从GitHub Releases创建存储库索引</h3>
<p>上传后，您可以创建一个可以托管在GitHub Pages（或其他地方）上的 <code v-pre>index.yaml</code> 文件。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ cr index <span class="token parameter variable">--help</span>
Update a Helm chart repository index.yaml <span class="token function">file</span> based on a the
given GitHub repository's releases.

Usage:
  cr index <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>

Flags:
  -b, --git-base-url string            GitHub Base URL <span class="token punctuation">(</span>only needed <span class="token keyword">for</span> private GitHub<span class="token punctuation">)</span> <span class="token punctuation">(</span>default <span class="token string">"https://api.github.com/"</span><span class="token punctuation">)</span>
  -r, --git-repo string                GitHub repository
  -u, --git-upload-url string          GitHub Upload URL <span class="token punctuation">(</span>only needed <span class="token keyword">for</span> private GitHub<span class="token punctuation">)</span> <span class="token punctuation">(</span>default <span class="token string">"https://uploads.github.com/"</span><span class="token punctuation">)</span>
  -h, <span class="token parameter variable">--help</span>                           <span class="token builtin class-name">help</span> <span class="token keyword">for</span> index
  -i, --index-path string              Path to index <span class="token function">file</span> <span class="token punctuation">(</span>default <span class="token string">".cr-index/index.yaml"</span><span class="token punctuation">)</span>
  -o, <span class="token parameter variable">--owner</span> string                   GitHub username or organization
  -p, --package-path string            Path to directory with chart packages <span class="token punctuation">(</span>default <span class="token string">".cr-release-packages"</span><span class="token punctuation">)</span>
      --pages-branch string            The GitHub pages branch <span class="token punctuation">(</span>default <span class="token string">"gh-pages"</span><span class="token punctuation">)</span>
      --pages-index-path string        The GitHub pages index path <span class="token punctuation">(</span>default <span class="token string">"index.yaml"</span><span class="token punctuation">)</span>
      <span class="token parameter variable">--pr</span>                             Create a pull request <span class="token keyword">for</span> index.yaml against the GitHub Pages branch <span class="token punctuation">(</span>must not be <span class="token builtin class-name">set</span> <span class="token keyword">if</span> <span class="token parameter variable">--push</span> is <span class="token builtin class-name">set</span><span class="token punctuation">)</span>
      <span class="token parameter variable">--push</span>                           Push index.yaml to the GitHub Pages branch <span class="token punctuation">(</span>must not be <span class="token builtin class-name">set</span> <span class="token keyword">if</span> <span class="token parameter variable">--pr</span> is <span class="token builtin class-name">set</span><span class="token punctuation">)</span>
      --release-name-template string   Go template <span class="token keyword">for</span> computing release names, using chart metadata <span class="token punctuation">(</span>default <span class="token string">"{{ .Name }}-{{ .Version }}"</span><span class="token punctuation">)</span>
      <span class="token parameter variable">--remote</span> string                  The Git remote used when creating a <span class="token builtin class-name">local</span> worktree <span class="token keyword">for</span> the GitHub Pages branch <span class="token punctuation">(</span>default <span class="token string">"origin"</span><span class="token punctuation">)</span>
  -t, <span class="token parameter variable">--token</span> string                   GitHub Auth Token <span class="token punctuation">(</span>only needed <span class="token keyword">for</span> private repos<span class="token punctuation">)</span>
      --packages-with-index            Host the package files <span class="token keyword">in</span> the GitHub Pages branch

Global Flags:
      <span class="token parameter variable">--config</span> string   Config <span class="token function">file</span> <span class="token punctuation">(</span>default is <span class="token environment constant">$HOME</span>/.cr.yaml<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Docker镜像被推送到 <code v-pre>helmpack/chart-martaser</code> Quay容器注册表。Docker镜像构建在Alpine之上，其默认入口点是 <code v-pre>cr</code> 。有关更多详细信息，请参阅Dockerfile。</p>
<h3 id="usage-使用" tabindex="-1"><a class="header-anchor" href="#usage-使用" aria-hidden="true">#</a> Usage 使用</h3>
<p>以下是您必须运行的三个命令，以使图表最终托管在Github页面的根目录中并可访问：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cr package <span class="token operator">&lt;</span>chart<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cr upload <span class="token parameter variable">--owner</span> <span class="token operator">&lt;</span>owner<span class="token operator">></span> --git-repo <span class="token operator">&lt;</span>repo_name<span class="token operator">></span> --packages-with-index <span class="token parameter variable">--token</span> <span class="token operator">&lt;</span>token<span class="token operator">></span> <span class="token parameter variable">--push</span> --skip-existing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不要忘记在upload命令中使用 <code v-pre>--skip-existing</code> 标志，以避免出现 <code v-pre>422 Validation Failed</code> 错误。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cr index <span class="token parameter variable">--owner</span> <span class="token operator">&lt;</span>owner<span class="token operator">></span> --git-repo <span class="token operator">&lt;</span>repo_name<span class="token operator">></span>  --packages-with-index --index-path <span class="token builtin class-name">.</span> <span class="token parameter variable">--token</span> <span class="token operator">&lt;</span>token<span class="token operator">></span> <span class="token parameter variable">--push</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="例如" tabindex="-1"><a class="header-anchor" href="#例如" aria-hidden="true">#</a> 例如</h3>
<p>在仓库的根目录中使用testChart helm chart：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cr package testChart/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果你将在中获得 <code v-pre>.tgz</code>。<code v-pre>/cr-release-pacakges</code></p>
<p>那么你要执行下面两个命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cr upload <span class="token parameter variable">--owner</span> <span class="token operator">&lt;</span>owner<span class="token operator">></span> --git-repo <span class="token operator">&lt;</span>repo_name<span class="token operator">></span> --packages-with-index <span class="token parameter variable">--token</span> <span class="token operator">&lt;</span>token<span class="token operator">></span> <span class="token parameter variable">--push</span> --skip-existing

cr index <span class="token parameter variable">--owner</span> <span class="token operator">&lt;</span>owner<span class="token operator">></span> --git-repo <span class="token operator">&lt;</span>repo_name<span class="token operator">></span>  --packages-with-index --index-path <span class="token builtin class-name">.</span> <span class="token parameter variable">--token</span> <span class="token operator">&lt;</span>token<span class="token operator">></span> <span class="token parameter variable">--push</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你应该在你的github-pages分支的根目录中获得你的图表和 <code v-pre>.tgz</code> 的版本。</p>
<p>使用引用每个图表和这些图表的每个不同版本的 <code v-pre>index.yaml</code> ：</p>
<h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3>
<p><code v-pre>cr</code> 是一个命令行应用。所有命令行标志也可以通过环境变量或配置文件设置。环境变量必须以 <code v-pre>CR_</code> 为前缀。必须使用下划线而不是连字符。</p>
<p>CLI标志、环境变量和配置文件可以混合使用。以下优先顺序适用：</p>
<ol>
<li>CLI标志</li>
<li>环境变量</li>
<li>Config文件</li>
</ol>
<h3 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> Examples</h3>
<p>下面的示例显示了配置同一事物的各种方法：</p>
<h4 id="cli" tabindex="-1"><a class="header-anchor" href="#cli" aria-hidden="true">#</a> CLI</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cr upload <span class="token parameter variable">--owner</span> myaccount --git-repo helm-charts --package-path .deploy <span class="token parameter variable">--token</span> <span class="token number">123456789</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">CR_OWNER</span><span class="token operator">=</span>myaccount
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CR_GIT_REPO</span><span class="token operator">=</span>helm-charts
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CR_PACKAGE_PATH</span><span class="token operator">=</span>.deploy
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CR_TOKEN</span><span class="token operator">=</span><span class="token string">"123456789"</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CR_GIT_BASE_URL</span><span class="token operator">=</span><span class="token string">"https://api.github.com/"</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CR_GIT_UPLOAD_URL</span><span class="token operator">=</span><span class="token string">"https://uploads.github.com/"</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CR_SKIP_EXISTING</span><span class="token operator">=</span>true

cr upload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>--package-path string</code> is Path to directory with chart packages (default <code v-pre>.cr-release-packages</code>)</p>
<h4 id="config文件" tabindex="-1"><a class="header-anchor" href="#config文件" aria-hidden="true">#</a> Config文件</h4>
<p><code v-pre>config.yaml</code>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>owner: myaccount
git-repo: helm-charts
package-path: .deploy
token: <span class="token number">123456789</span>
git-base-url: https://api.github.com/
git-upload-url: https://uploads.github.com/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置使用" tabindex="-1"><a class="header-anchor" href="#配置使用" aria-hidden="true">#</a> 配置使用</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>cr upload <span class="token parameter variable">--config</span> config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>cr</code> 支持Viper可以读取的任何格式。e. JSON、TOML、YAML、HCL和Java属性文件。</p>
<p>请注意，如果没有指定配置文件，则从当前目录加载 <code v-pre>cr.yaml</code> （或任何支持的格式），如果找到，则按此顺序加载 <code v-pre>$HOME/.cr</code> 或 <code v-pre>/etc/cr</code> 。</p>
<h2 id="ct" tabindex="-1"><a class="header-anchor" href="#ct" aria-hidden="true">#</a> CT</h2>
<p><code v-pre>ct</code> 是测试Helm Charts的工具。它旨在用于linting和测试pull请求。它自动检测针对目标分支更改的图表。</p>
<h3 id="安装-1" tabindex="-1"><a class="header-anchor" href="#安装-1" aria-hidden="true">#</a> 安装</h3>
<p>建议使用提供的Docker镜像，该镜像可以在Quay上找到。它配备了所有必要的工具安装。</p>
<h3 id="上手" tabindex="-1"><a class="header-anchor" href="#上手" aria-hidden="true">#</a> 上手</h3>
<p>下面的例子显示了配置同一件事的各种方法：</p>
<p><strong>With remote repo:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ct <span class="token function">install</span> <span class="token parameter variable">--remote</span> upstream --chart-dirs stable,incubator --build-id pr-42
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>本地回购</strong>:</p>
<p>如果您在当前目录中有一个图表，并且ct安装在主机上，那么您可以运行：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ct install --chart-dirs . --charts .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用Docker时，它可以使用：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--network</span> <span class="token function">host</span> <span class="token parameter variable">--workdir</span><span class="token operator">=</span>/data <span class="token parameter variable">--volume</span> ~/.kube/config:/root/.kube/config:ro <span class="token parameter variable">--volume</span> <span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>:/data quay.io/helmpack/chart-testing:v3.7.1 ct <span class="token function">install</span> --chart-dirs <span class="token builtin class-name">.</span> <span class="token parameter variable">--charts</span> <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请注意， <code v-pre>workdir</code> param很重要，必须与挂载的卷相同。</p>
<h4 id="环境变量-1" tabindex="-1"><a class="header-anchor" href="#环境变量-1" aria-hidden="true">#</a> 环境变量</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">CT_REMOTE</span><span class="token operator">=</span>upstream
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CT_CHART_DIRS</span><span class="token operator">=</span>stable,incubator
<span class="token builtin class-name">export</span> CT_BUILD_ID

ct <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="config文件-1" tabindex="-1"><a class="header-anchor" href="#config文件-1" aria-hidden="true">#</a> Config文件</h4>
<p><code v-pre>config.yaml</code>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>remote: upstream
chart-dirs:
  - stable
  - incubator
build-id: pr-42
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置使用-1" tabindex="-1"><a class="header-anchor" href="#配置使用-1" aria-hidden="true">#</a> 配置使用</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ct <span class="token function">install</span> <span class="token parameter variable">--config</span> config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>ct</code> 支持Viper可以读取的任何格式。e. JSON、TOML、YAML、HCL和Java属性文件。</p>
<p>请注意，如果没有指定配置文件，则从当前目录加载 <code v-pre>ct.yaml</code> （或任何支持的格式），如果找到，则按此顺序加载 <code v-pre>$HOME/.ct</code> 或 <code v-pre>/etc/ct</code> 。</p>
<h4 id="使用私有图表存储库" tabindex="-1"><a class="header-anchor" href="#使用私有图表存储库" aria-hidden="true">#</a> 使用私有图表存储库</h4>
<p>在添加chart-repos时，您可以在每个repo的基础上使用 <code v-pre>helm-repo-extra-args</code> 为 <code v-pre>helm repo add</code> 命令指定其他参数。您还可以指定OCI注册表，这些注册表将使用 <code v-pre>helm registry login</code> 命令添加，它们也支持 <code v-pre>helm-repo-extra-args</code> 进行身份验证。例如，这可以用于验证私有图表存储库。</p>
<p><code v-pre>config.yaml</code>:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">chart-repos</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> incubator=https<span class="token punctuation">:</span>//incubator.io
  <span class="token punctuation">-</span> basic<span class="token punctuation">-</span>auth=https<span class="token punctuation">:</span>//private.com
  <span class="token punctuation">-</span> ssl<span class="token punctuation">-</span>repo=https<span class="token punctuation">:</span>//self<span class="token punctuation">-</span>signed.ca
  <span class="token punctuation">-</span> oci<span class="token punctuation">-</span>registry=oci<span class="token punctuation">:</span>//nice<span class="token punctuation">-</span>oci<span class="token punctuation">-</span>registry.pt
<span class="token key atrule">helm-repo-extra-args</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> ssl<span class="token punctuation">-</span>repo=<span class="token punctuation">-</span><span class="token punctuation">-</span>ca<span class="token punctuation">-</span>file ./my<span class="token punctuation">-</span>ca.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ct <span class="token function">install</span> <span class="token parameter variable">--config</span> config.yaml --helm-repo-extra-args <span class="token string">"basic-auth=--username user --password secret"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="openim-helm-charts-的-cicd-设计" tabindex="-1"><a class="header-anchor" href="#openim-helm-charts-的-cicd-设计" aria-hidden="true">#</a> OpenIM Helm Charts 的 CICD 设计</h2>
<p>OpenIM 的 CICD 设计使用了上续的 ct 和 cr 的工具，目录设计主要是三个部分：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>+ .github/config/ <span class="token comment"># 存放配置文件 包括 ct 和 cr 的配置文件</span>
+ scripts/ <span class="token comment"># 存放本地和其他的自动化脚本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


