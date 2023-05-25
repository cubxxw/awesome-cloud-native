<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第58节-lychee-实现-docs-检查" tabindex="-1"><a class="header-anchor" href="#第58节-lychee-实现-docs-检查" aria-hidden="true">#</a> 第58节 lychee 实现 docs 检查</h1>
<div><a href = '57.md' style='float:left'>⬆️上一节🔗  </a><a href = '59.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>什么是 lychee？</p>
<p>⚡ 用Rust编写的快速、异步、基于流的链接检查器。</p>
<p>在Markdown、HTML、reStructuredText或任何其他文本文件或网站中查找损坏的超链接和邮件地址！</p>
<p>可作为命令行实用程序、库和 GitHub Action使用。</p>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<p>在基于APT/dpkg的Linux发行版（例如Debian、Ubuntu、Linux Mint和Kali Linux），以下命令将安装所有必需的构建依赖项，包括Rust工具链和 <code v-pre>cargo</code> ：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sSf</span> <span class="token string">'https://sh.rustup.rs'</span> <span class="token operator">|</span> <span class="token function">sh</span>
<span class="token function">apt</span> <span class="token function">install</span> gcc pkg-config libc6-dev libssl-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<p>递归检查当前目录中支持的文件中的所有链接</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>lychee <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您还可以指定各种类型的输入：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># check links in specific local file(s):</span>
lychee README.md
lychee test.html info.txt

<span class="token comment"># check links on a website:</span>
lychee https://endler.dev

<span class="token comment"># check links in directory but block network requests</span>
lychee <span class="token parameter variable">--offline</span> path/to/directory

<span class="token comment"># check links in a remote file:</span>
lychee https://raw.githubusercontent.com/lycheeverse/lychee/master/README.md

<span class="token comment"># check links in local files via shell glob:</span>
lychee ~/projects/*/README.md

<span class="token comment"># check links in local files (lychee supports advanced globbing and ~ expansion):</span>
lychee <span class="token string">"~/projects/big_project/**/README.*"</span>

<span class="token comment"># ignore case when globbing and check result for each link:</span>
lychee --glob-ignore-case <span class="token parameter variable">--verbose</span> <span class="token string">"~/projects/**/[r]eadme.*"</span>

<span class="token comment"># check links from epub file (requires atool: https://www.nongnu.org/atool)</span>
acat <span class="token parameter variable">-F</span> <span class="token function">zip</span> <span class="token punctuation">{</span>file.epub<span class="token punctuation">}</span> <span class="token string">"*.xhtml"</span> <span class="token string">"*.html"</span> <span class="token operator">|</span> lychee -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lychee将其他文件格式解析为明文，并使用linkify提取链接。如果没有格式或编码细节，这通常工作得很好，但如果您需要对新文件格式的专门支持，请考虑创建一个问题。</p>
<h2 id="docker-usage" tabindex="-1"><a class="header-anchor" href="#docker-usage" aria-hidden="true">#</a> Docker Usage</h2>
<p>下面是如何将本地目录挂载到容器中，并使用lychee检查一些输入。传递 <code v-pre>--init</code> 参数，以便可以从终端停止荔枝。我们还传递 <code v-pre>-it</code> 来启动一个交互式终端，这是显示进度条所必需的。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--init</span> <span class="token parameter variable">-it</span> <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">pwd</span><span class="token variable">`</span></span>:/input lycheeverse/lychee /input/README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="github-token" tabindex="-1"><a class="header-anchor" href="#github-token" aria-hidden="true">#</a> GitHub Token</h3>
<p>为了避免在检查GitHub链接时受到速率限制，您可以选择使用Github令牌设置环境变量，如 <code v-pre>GITHUB_TOKEN=xxxx</code> ，或使用 <code v-pre>--github-token</code> CLI选项。它也可以在配置文件中设置。 下面是一个示例配置文件。</p>
<p>令牌可以在您的GitHub帐户设置页面中生成。没有额外权限的个人令牌足以检查公共存储库链接。</p>
<h3 id="commandline-parameter参数" tabindex="-1"><a class="header-anchor" href="#commandline-parameter参数" aria-hidden="true">#</a> Commandline Parameter参数</h3>
<p>有大量命令行参数可用于自定义行为。下面是一个完整的列表。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>A fast, async <span class="token function">link</span> checker

Finds broken URLs and mail addresses inside Markdown, HTML, <span class="token variable"><span class="token variable">`</span>reStructuredText<span class="token variable">`</span></span>, websites and more<span class="token operator">!</span>

Usage: lychee <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> <span class="token operator">&lt;</span>inputs<span class="token operator">></span><span class="token punctuation">..</span>.

Arguments:
  <span class="token operator">&lt;</span>inputs<span class="token operator">></span><span class="token punctuation">..</span>.
          The inputs <span class="token punctuation">(</span>where to get links to check from<span class="token punctuation">)</span>. These can be: files <span class="token punctuation">(</span>e.g. <span class="token variable"><span class="token variable">`</span>README.md<span class="token variable">`</span></span><span class="token punctuation">)</span>, <span class="token function">file</span> globs <span class="token punctuation">(</span>e.g. <span class="token variable"><span class="token variable">`</span>"~/git/*/README.md"<span class="token variable">`</span></span><span class="token punctuation">)</span>, remote URLs <span class="token punctuation">(</span>e.g. <span class="token variable"><span class="token variable">`</span>https://example.com/README.md<span class="token variable">`</span></span><span class="token punctuation">)</span> or standard input <span class="token punctuation">(</span><span class="token variable"><span class="token variable">`</span>-<span class="token variable">`</span></span><span class="token punctuation">)</span>. NOTE: Use <span class="token variable"><span class="token variable">`</span>--<span class="token variable">`</span></span> to separate inputs from options that allow multiple arguments

Options:
  -c, <span class="token parameter variable">--config</span> <span class="token operator">&lt;</span>CONFIG_FILE<span class="token operator">></span>
          Configuration <span class="token function">file</span> to use
          
          <span class="token punctuation">[</span>default: lychee.toml<span class="token punctuation">]</span>

  -v, --verbose<span class="token punctuation">..</span>.
          Set verbosity level<span class="token punctuation">;</span> <span class="token function">more</span> output per occurrence <span class="token punctuation">(</span>e.g. <span class="token variable"><span class="token variable">`</span><span class="token parameter variable">-v</span><span class="token variable">`</span></span> or <span class="token variable"><span class="token variable">`</span><span class="token parameter variable">-vv</span><span class="token variable">`</span></span><span class="token punctuation">)</span>

  -q, --quiet<span class="token punctuation">..</span>.
          Less output per occurrence <span class="token punctuation">(</span>e.g. <span class="token variable"><span class="token variable">`</span><span class="token parameter variable">-q</span><span class="token variable">`</span></span> or <span class="token variable"><span class="token variable">`</span><span class="token parameter variable">-qq</span><span class="token variable">`</span></span><span class="token punctuation">)</span>

  -n, --no-progress
          Do not show progress bar.
          This is recommended <span class="token keyword">for</span> non-interactive shells <span class="token punctuation">(</span>e.g. <span class="token keyword">for</span> continuous integration<span class="token punctuation">)</span>

      <span class="token parameter variable">--cache</span>
          Use request cache stored on disk at <span class="token variable"><span class="token variable">`</span>.lycheecache<span class="token variable">`</span></span>

      --max-cache-age <span class="token operator">&lt;</span>MAX_CACHE_AGE<span class="token operator">></span>
          Discard all cached requests older than this duration
          
          <span class="token punctuation">[</span>default: 1d<span class="token punctuation">]</span>

      <span class="token parameter variable">--dump</span>
          Don<span class="token string">'t perform any link checking. Instead, dump all the links extracted from inputs that would be checked

      --archive &lt;ARCHIVE>
          Specify the use of a specific web archive. Can be used in combination with `--suggest`
          
          [possible values: wayback]

      --suggest
          Suggest link replacements for broken links, using a web archive. The web archive can be specified with `--archive`

  -m, --max-redirects &lt;MAX_REDIRECTS>
          Maximum number of allowed redirects
          
          [default: 5]

      --max-retries &lt;MAX_RETRIES>
          Maximum number of retries per request
          
          [default: 3]

      --max-concurrency &lt;MAX_CONCURRENCY>
          Maximum number of concurrent network requests
          
          [default: 128]

  -T, --threads &lt;THREADS>
          Number of threads to utilize. Defaults to number of cores available to the system

  -u, --user-agent &lt;USER_AGENT>
          User agent
          
          [default: lychee/0.12.0]

  -i, --insecure
          Proceed for server connections considered insecure (invalid TLS)

  -s, --scheme &lt;SCHEME>
          Only test links with the given schemes (e.g. http and https)

      --offline
          Only check local files and block network requests

      --include &lt;INCLUDE>
          URLs to check (supports regex). Has preference over all excludes

      --exclude &lt;EXCLUDE>
          Exclude URLs and mail addresses from checking (supports regex)

      --exclude-file &lt;EXCLUDE_FILE>
          Deprecated; use `--exclude-path` instead

      --exclude-path &lt;EXCLUDE_PATH>
          Exclude file path from getting checked

  -E, --exclude-all-private
          Exclude all private IPs from checking.
          Equivalent to `--exclude-private --exclude-link-local --exclude-loopback`

      --exclude-private
          Exclude private IP address ranges from checking

      --exclude-link-local
          Exclude link-local IP address range from checking

      --exclude-loopback
          Exclude loopback IP address range and localhost from checking

      --exclude-mail
          Exclude all mail addresses from checking

      --remap &lt;REMAP>
          Remap URI matching pattern to different URI

      --header &lt;HEADER>
          Custom request header

  -a, --accept &lt;ACCEPT>
          Comma-separated list of accepted status codes for valid links

  -t, --timeout &lt;TIMEOUT>
          Website timeout in seconds from connect to response finished
          
          [default: 20]

  -r, --retry-wait-time &lt;RETRY_WAIT_TIME>
          Minimum wait time in seconds between retries of failed requests
          
          [default: 1]

  -X, --method &lt;METHOD>
          Request method
          
          [default: get]

  -b, --base &lt;BASE>
          Base URL or website root directory to check relative URLs e.g. https://example.com or `/path/to/public`

      --basic-auth &lt;BASIC_AUTH>
          Basic authentication support. E.g. `username:password`

      --github-token &lt;GITHUB_TOKEN>
          GitHub API token to use when checking github.com links, to avoid rate limiting
          
          [env: GITHUB_TOKEN]

      --skip-missing
          Skip missing input files (default is to error if they don'</span>t exist<span class="token punctuation">)</span>

      --include-verbatim
          Find links <span class="token keyword">in</span> verbatim sections like <span class="token variable"><span class="token variable">`</span>pre<span class="token variable">`</span></span>- and <span class="token variable"><span class="token variable">`</span>code<span class="token variable">`</span></span> blocks

      --glob-ignore-case
          Ignore <span class="token keyword">case</span> when expanding filesystem path glob inputs

  -o, <span class="token parameter variable">--output</span> <span class="token operator">&lt;</span>OUTPUT<span class="token operator">></span>
          Output <span class="token function">file</span> of status report

  -f, <span class="token parameter variable">--format</span> <span class="token operator">&lt;</span>FORMAT<span class="token operator">></span>
          Output <span class="token function">format</span> of final status report <span class="token punctuation">(</span>compact, detailed, json, markdown<span class="token punctuation">)</span>
          
          <span class="token punctuation">[</span>default: compact<span class="token punctuation">]</span>

      --require-https
          When HTTPS is available, treat HTTP links as errors

  -h, <span class="token parameter variable">--help</span>
          Print <span class="token builtin class-name">help</span> <span class="token punctuation">(</span>see a summary with <span class="token string">'-h'</span><span class="token punctuation">)</span>

  -V, <span class="token parameter variable">--version</span>
          Print version

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="错误码-exit-codes" tabindex="-1"><a class="header-anchor" href="#错误码-exit-codes" aria-hidden="true">#</a> 错误码 （Exit codes）</h3>
<ul>
<li><code v-pre>0</code> 表示成功（已成功检查所有链接或已按照配置排除/跳过所有链接）</li>
<li><code v-pre>1</code> 用于丢失的输入和任何意外的运行时失败或配置错误</li>
<li><code v-pre>2</code> 表示链路检查失败（如果任何未排除的链路未通过检查）</li>
</ul>
<h3 id="ignoring-links" tabindex="-1"><a class="header-anchor" href="#ignoring-links" aria-hidden="true">#</a> Ignoring links</h3>
<p>您可以通过使用 <code v-pre>--exclude</code> 指定正则表达式模式（例如， <code v-pre>--exclude example\.(com|org)</code> ）。如果当前工作目录中存在名为 <code v-pre>.lycheeignore</code> 的文件，则其内容也将被排除。该文件允许您列出多个要排除的正则表达式（每行一个模式）。</p>
<p>要从扫描中排除文件/目录，请使用 <code v-pre>lychee.toml</code> 和 <code v-pre>exclude_path</code> 。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>exclude_path <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"some/path"</span>, <span class="token string">"*/dev/*"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="caching" tabindex="-1"><a class="header-anchor" href="#caching" aria-hidden="true">#</a> Caching</h3>
<p>如果设置了 <code v-pre>--cache</code> 标志，荔枝将在当前目录中名为 <code v-pre>.lycheecache</code> 的文件中缓存响应。如果文件存在并且设置了标志，则在启动时将加载该高速缓存。这可以大大加快未来的运行速度。请注意，默认情况下，荔枝不会在磁盘上存储任何数据。</p>
<h2 id="用作自己的库" tabindex="-1"><a class="header-anchor" href="#用作自己的库" aria-hidden="true">#</a> 用作自己的库</h2>
<p>使用 rust 调用~</p>
<h2 id="actions" tabindex="-1"><a class="header-anchor" href="#actions" aria-hidden="true">#</a> actions</h2>
<ul>
<li><a href="https://github.com/lycheeverse/lychee-action" target="_blank" rel="noopener noreferrer">actions 的链接地址<ExternalLinkIcon/></a></li>
</ul>
<p>使用荔枝快速检查Markdown、HTML和文本文件中的链接。</p>
<p><strong>可以融合 issue 的使用，比如说：</strong></p>
<p>与“从文件创建问题”一起使用时，当操作发现链接问题时，将打开 issue</p>
<blockquote>
<p><strong>Note</strong> 当然，这需要你的权限</p>
</blockquote>
<h3 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h3>
<p>以下是GitHub工作流文件的完整示例：</p>
<p>它将每天检查一次所有存储库链接，并在出现错误时创建一个问题。将此保存在 <code v-pre>.github/workflows/links.yml</code> 下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Links

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">repository_dispatch</span><span class="token punctuation">:</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>
  <span class="token key atrule">schedule</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">cron</span><span class="token punctuation">:</span> <span class="token string">"00 18 * * *"</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">linkChecker</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Link Checker
        <span class="token key atrule">id</span><span class="token punctuation">:</span> lychee
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> lycheeverse/lychee<span class="token punctuation">-</span>action@v1.7.0
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>secrets.GITHUB_TOKEN<span class="token punctuation">}</span><span class="token punctuation">}</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Create Issue From File
        <span class="token key atrule">if</span><span class="token punctuation">:</span> env.lychee_exit_code <span class="token tag">!=</span> 0
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> peter<span class="token punctuation">-</span>evans/create<span class="token punctuation">-</span>issue<span class="token punctuation">-</span>from<span class="token punctuation">-</span>file@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">title</span><span class="token punctuation">:</span> Link Checker Report
          <span class="token key atrule">content-filepath</span><span class="token punctuation">:</span> ./lychee/out.md
          <span class="token key atrule">labels</span><span class="token punctuation">:</span> report<span class="token punctuation">,</span> automated issue
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(You不需要自己配置 <code v-pre>GITHUB_TOKEN</code> ;由Github自动设置）。</p>
<p>如果您总是希望使用最新的功能，但又避免破坏性的更改，则可以将版本替换为 <code v-pre>lycheeverse/lychee-action@v1</code></p>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>可以对照这个加一些参数，比如 -E 屏蔽所有 localhost 和内网ip的检查，以及忽略401和403的错误，429那个是GitHub的限速报错（可加可不加）</p>
<p><img src="http://sm.nsddd.top/sm202305131950121.png" alt="image-20230513195026852"></p>
</div>
<h3 id="alternative-approach-替代方法" tabindex="-1"><a class="header-anchor" href="#alternative-approach-替代方法" aria-hidden="true">#</a> Alternative approach (替代方法)</h3>
<p>这将在任何git push事件和所有pull请求期间检查所有存储库链接。如果出现错误，操作将失败。</p>
<p>这样做的好处是确保在合并请求期间，不会添加任何断开的链接，并且如果任何现有链接断开，它们将被捕获。将其保存在 <code v-pre>.github/workflows/links-fail-fast.yml</code> 下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Links (Fail Fast)

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">linkChecker</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Link Checker
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> lycheeverse/lychee<span class="token punctuation">-</span>action@v1.7.0
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">fail</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span>secrets.GITHUB_TOKEN<span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="标志" tabindex="-1"><a class="header-anchor" href="#标志" aria-hidden="true">#</a> 标志</h2>
<p><a href="https://github.com/OpenIMSDK/Open-IM-Server/actions/workflows/links.yml" target="_blank" rel="noopener noreferrer"><img src="https://github.com/OpenIMSDK/Open-IM-Server/actions/workflows/links.yml/badge.svg" alt="Check Links"><ExternalLinkIcon/></a></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '57.md' style='float:left'>⬆️上一节🔗  </a><a href = '59.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


