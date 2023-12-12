import{_ as c,r as i,o,c as r,a as n,b as e,w as d,e as s,d as l}from"./app.9f14a191.js";const p={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},v=s("author"),m=n("h1",{id:"\u7B2C58\u8282-lychee-\u5B9E\u73B0-docs-\u68C0\u67E5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C58\u8282-lychee-\u5B9E\u73B0-docs-\u68C0\u67E5","aria-hidden":"true"},"#"),s(" \u7B2C58\u8282 lychee \u5B9E\u73B0 docs \u68C0\u67E5")],-1),b=n("div",null,[n("a",{href:"57.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"59.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),k=n("br",null,null,-1),h=s("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),g={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},f=s("sealos"),y=s("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),_={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},x=s("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),E=s("\u3002Myblog:"),w={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},T=s("http://nsddd.top"),C=l(`<hr><p>[TOC]</p><h2 id="\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#\u4ECB\u7ECD" aria-hidden="true">#</a> \u4ECB\u7ECD</h2><p>\u4EC0\u4E48\u662F lychee\uFF1F</p><p>\u26A1 \u7528Rust\u7F16\u5199\u7684\u5FEB\u901F\u3001\u5F02\u6B65\u3001\u57FA\u4E8E\u6D41\u7684\u94FE\u63A5\u68C0\u67E5\u5668\u3002</p><p>\u5728Markdown\u3001HTML\u3001reStructuredText\u6216\u4EFB\u4F55\u5176\u4ED6\u6587\u672C\u6587\u4EF6\u6216\u7F51\u7AD9\u4E2D\u67E5\u627E\u635F\u574F\u7684\u8D85\u94FE\u63A5\u548C\u90AE\u4EF6\u5730\u5740\uFF01</p><p>\u53EF\u4F5C\u4E3A\u547D\u4EE4\u884C\u5B9E\u7528\u7A0B\u5E8F\u3001\u5E93\u548C GitHub Action\u4F7F\u7528\u3002</p><h2 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h2><p>\u5728\u57FA\u4E8EAPT/dpkg\u7684Linux\u53D1\u884C\u7248\uFF08\u4F8B\u5982Debian\u3001Ubuntu\u3001Linux Mint\u548CKali Linux\uFF09\uFF0C\u4EE5\u4E0B\u547D\u4EE4\u5C06\u5B89\u88C5\u6240\u6709\u5FC5\u9700\u7684\u6784\u5EFA\u4F9D\u8D56\u9879\uFF0C\u5305\u62ECRust\u5DE5\u5177\u94FE\u548C <code>cargo</code> \uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sSf</span> <span class="token string">&#39;https://sh.rustup.rs&#39;</span> <span class="token operator">|</span> <span class="token function">sh</span>
<span class="token function">apt</span> <span class="token function">install</span> gcc pkg-config libc6-dev libssl-dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528" aria-hidden="true">#</a> \u4F7F\u7528</h2><p>\u9012\u5F52\u68C0\u67E5\u5F53\u524D\u76EE\u5F55\u4E2D\u652F\u6301\u7684\u6587\u4EF6\u4E2D\u7684\u6240\u6709\u94FE\u63A5</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>lychee <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u60A8\u8FD8\u53EF\u4EE5\u6307\u5B9A\u5404\u79CD\u7C7B\u578B\u7684\u8F93\u5165\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># check links in specific local file(s):</span>
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
lychee <span class="token string">&quot;~/projects/big_project/**/README.*&quot;</span>

<span class="token comment"># ignore case when globbing and check result for each link:</span>
lychee --glob-ignore-case <span class="token parameter variable">--verbose</span> <span class="token string">&quot;~/projects/**/[r]eadme.*&quot;</span>

<span class="token comment"># check links from epub file (requires atool: https://www.nongnu.org/atool)</span>
acat <span class="token parameter variable">-F</span> <span class="token function">zip</span> <span class="token punctuation">{</span>file.epub<span class="token punctuation">}</span> <span class="token string">&quot;*.xhtml&quot;</span> <span class="token string">&quot;*.html&quot;</span> <span class="token operator">|</span> lychee -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lychee\u5C06\u5176\u4ED6\u6587\u4EF6\u683C\u5F0F\u89E3\u6790\u4E3A\u660E\u6587\uFF0C\u5E76\u4F7F\u7528linkify\u63D0\u53D6\u94FE\u63A5\u3002\u5982\u679C\u6CA1\u6709\u683C\u5F0F\u6216\u7F16\u7801\u7EC6\u8282\uFF0C\u8FD9\u901A\u5E38\u5DE5\u4F5C\u5F97\u5F88\u597D\uFF0C\u4F46\u5982\u679C\u60A8\u9700\u8981\u5BF9\u65B0\u6587\u4EF6\u683C\u5F0F\u7684\u4E13\u95E8\u652F\u6301\uFF0C\u8BF7\u8003\u8651\u521B\u5EFA\u4E00\u4E2A\u95EE\u9898\u3002</p><h2 id="docker-usage" tabindex="-1"><a class="header-anchor" href="#docker-usage" aria-hidden="true">#</a> Docker Usage</h2><p>\u4E0B\u9762\u662F\u5982\u4F55\u5C06\u672C\u5730\u76EE\u5F55\u6302\u8F7D\u5230\u5BB9\u5668\u4E2D\uFF0C\u5E76\u4F7F\u7528lychee\u68C0\u67E5\u4E00\u4E9B\u8F93\u5165\u3002\u4F20\u9012 <code>--init</code> \u53C2\u6570\uFF0C\u4EE5\u4FBF\u53EF\u4EE5\u4ECE\u7EC8\u7AEF\u505C\u6B62\u8354\u679D\u3002\u6211\u4EEC\u8FD8\u4F20\u9012 <code>-it</code> \u6765\u542F\u52A8\u4E00\u4E2A\u4EA4\u4E92\u5F0F\u7EC8\u7AEF\uFF0C\u8FD9\u662F\u663E\u793A\u8FDB\u5EA6\u6761\u6240\u5FC5\u9700\u7684\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--init</span> <span class="token parameter variable">-it</span> <span class="token parameter variable">-v</span> <span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">pwd</span><span class="token variable">\`</span></span>:/input lycheeverse/lychee /input/README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="github-token" tabindex="-1"><a class="header-anchor" href="#github-token" aria-hidden="true">#</a> GitHub Token</h3><p>\u4E3A\u4E86\u907F\u514D\u5728\u68C0\u67E5GitHub\u94FE\u63A5\u65F6\u53D7\u5230\u901F\u7387\u9650\u5236\uFF0C\u60A8\u53EF\u4EE5\u9009\u62E9\u4F7F\u7528Github\u4EE4\u724C\u8BBE\u7F6E\u73AF\u5883\u53D8\u91CF\uFF0C\u5982 <code>GITHUB_TOKEN=xxxx</code> \uFF0C\u6216\u4F7F\u7528 <code>--github-token</code> CLI\u9009\u9879\u3002\u5B83\u4E5F\u53EF\u4EE5\u5728\u914D\u7F6E\u6587\u4EF6\u4E2D\u8BBE\u7F6E\u3002 \u4E0B\u9762\u662F\u4E00\u4E2A\u793A\u4F8B\u914D\u7F6E\u6587\u4EF6\u3002</p><p>\u4EE4\u724C\u53EF\u4EE5\u5728\u60A8\u7684GitHub\u5E10\u6237\u8BBE\u7F6E\u9875\u9762\u4E2D\u751F\u6210\u3002\u6CA1\u6709\u989D\u5916\u6743\u9650\u7684\u4E2A\u4EBA\u4EE4\u724C\u8DB3\u4EE5\u68C0\u67E5\u516C\u5171\u5B58\u50A8\u5E93\u94FE\u63A5\u3002</p><h3 id="commandline-parameter\u53C2\u6570" tabindex="-1"><a class="header-anchor" href="#commandline-parameter\u53C2\u6570" aria-hidden="true">#</a> Commandline Parameter\u53C2\u6570</h3><p>\u6709\u5927\u91CF\u547D\u4EE4\u884C\u53C2\u6570\u53EF\u7528\u4E8E\u81EA\u5B9A\u4E49\u884C\u4E3A\u3002\u4E0B\u9762\u662F\u4E00\u4E2A\u5B8C\u6574\u7684\u5217\u8868\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>A fast, async <span class="token function">link</span> checker

Finds broken URLs and mail addresses inside Markdown, HTML, <span class="token variable"><span class="token variable">\`</span>reStructuredText<span class="token variable">\`</span></span>, websites and more<span class="token operator">!</span>

Usage: lychee <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> <span class="token operator">&lt;</span>inputs<span class="token operator">&gt;</span><span class="token punctuation">..</span>.

Arguments:
  <span class="token operator">&lt;</span>inputs<span class="token operator">&gt;</span><span class="token punctuation">..</span>.
          The inputs <span class="token punctuation">(</span>where to get links to check from<span class="token punctuation">)</span>. These can be: files <span class="token punctuation">(</span>e.g. <span class="token variable"><span class="token variable">\`</span>README.md<span class="token variable">\`</span></span><span class="token punctuation">)</span>, <span class="token function">file</span> globs <span class="token punctuation">(</span>e.g. <span class="token variable"><span class="token variable">\`</span>&quot;~/git/*/README.md&quot;<span class="token variable">\`</span></span><span class="token punctuation">)</span>, remote URLs <span class="token punctuation">(</span>e.g. <span class="token variable"><span class="token variable">\`</span>https://example.com/README.md<span class="token variable">\`</span></span><span class="token punctuation">)</span> or standard input <span class="token punctuation">(</span><span class="token variable"><span class="token variable">\`</span>-<span class="token variable">\`</span></span><span class="token punctuation">)</span>. NOTE: Use <span class="token variable"><span class="token variable">\`</span>--<span class="token variable">\`</span></span> to separate inputs from options that allow multiple arguments

Options:
  -c, <span class="token parameter variable">--config</span> <span class="token operator">&lt;</span>CONFIG_FILE<span class="token operator">&gt;</span>
          Configuration <span class="token function">file</span> to use
          
          <span class="token punctuation">[</span>default: lychee.toml<span class="token punctuation">]</span>

  -v, --verbose<span class="token punctuation">..</span>.
          Set verbosity level<span class="token punctuation">;</span> <span class="token function">more</span> output per occurrence <span class="token punctuation">(</span>e.g. <span class="token variable"><span class="token variable">\`</span><span class="token parameter variable">-v</span><span class="token variable">\`</span></span> or <span class="token variable"><span class="token variable">\`</span><span class="token parameter variable">-vv</span><span class="token variable">\`</span></span><span class="token punctuation">)</span>

  -q, --quiet<span class="token punctuation">..</span>.
          Less output per occurrence <span class="token punctuation">(</span>e.g. <span class="token variable"><span class="token variable">\`</span><span class="token parameter variable">-q</span><span class="token variable">\`</span></span> or <span class="token variable"><span class="token variable">\`</span><span class="token parameter variable">-qq</span><span class="token variable">\`</span></span><span class="token punctuation">)</span>

  -n, --no-progress
          Do not show progress bar.
          This is recommended <span class="token keyword">for</span> non-interactive shells <span class="token punctuation">(</span>e.g. <span class="token keyword">for</span> continuous integration<span class="token punctuation">)</span>

      <span class="token parameter variable">--cache</span>
          Use request cache stored on disk at <span class="token variable"><span class="token variable">\`</span>.lycheecache<span class="token variable">\`</span></span>

      --max-cache-age <span class="token operator">&lt;</span>MAX_CACHE_AGE<span class="token operator">&gt;</span>
          Discard all cached requests older than this duration
          
          <span class="token punctuation">[</span>default: 1d<span class="token punctuation">]</span>

      <span class="token parameter variable">--dump</span>
          Don<span class="token string">&#39;t perform any link checking. Instead, dump all the links extracted from inputs that would be checked

      --archive &lt;ARCHIVE&gt;
          Specify the use of a specific web archive. Can be used in combination with \`--suggest\`
          
          [possible values: wayback]

      --suggest
          Suggest link replacements for broken links, using a web archive. The web archive can be specified with \`--archive\`

  -m, --max-redirects &lt;MAX_REDIRECTS&gt;
          Maximum number of allowed redirects
          
          [default: 5]

      --max-retries &lt;MAX_RETRIES&gt;
          Maximum number of retries per request
          
          [default: 3]

      --max-concurrency &lt;MAX_CONCURRENCY&gt;
          Maximum number of concurrent network requests
          
          [default: 128]

  -T, --threads &lt;THREADS&gt;
          Number of threads to utilize. Defaults to number of cores available to the system

  -u, --user-agent &lt;USER_AGENT&gt;
          User agent
          
          [default: lychee/0.12.0]

  -i, --insecure
          Proceed for server connections considered insecure (invalid TLS)

  -s, --scheme &lt;SCHEME&gt;
          Only test links with the given schemes (e.g. http and https)

      --offline
          Only check local files and block network requests

      --include &lt;INCLUDE&gt;
          URLs to check (supports regex). Has preference over all excludes

      --exclude &lt;EXCLUDE&gt;
          Exclude URLs and mail addresses from checking (supports regex)

      --exclude-file &lt;EXCLUDE_FILE&gt;
          Deprecated; use \`--exclude-path\` instead

      --exclude-path &lt;EXCLUDE_PATH&gt;
          Exclude file path from getting checked

  -E, --exclude-all-private
          Exclude all private IPs from checking.
          Equivalent to \`--exclude-private --exclude-link-local --exclude-loopback\`

      --exclude-private
          Exclude private IP address ranges from checking

      --exclude-link-local
          Exclude link-local IP address range from checking

      --exclude-loopback
          Exclude loopback IP address range and localhost from checking

      --exclude-mail
          Exclude all mail addresses from checking

      --remap &lt;REMAP&gt;
          Remap URI matching pattern to different URI

      --header &lt;HEADER&gt;
          Custom request header

  -a, --accept &lt;ACCEPT&gt;
          Comma-separated list of accepted status codes for valid links

  -t, --timeout &lt;TIMEOUT&gt;
          Website timeout in seconds from connect to response finished
          
          [default: 20]

  -r, --retry-wait-time &lt;RETRY_WAIT_TIME&gt;
          Minimum wait time in seconds between retries of failed requests
          
          [default: 1]

  -X, --method &lt;METHOD&gt;
          Request method
          
          [default: get]

  -b, --base &lt;BASE&gt;
          Base URL or website root directory to check relative URLs e.g. https://example.com or \`/path/to/public\`

      --basic-auth &lt;BASIC_AUTH&gt;
          Basic authentication support. E.g. \`username:password\`

      --github-token &lt;GITHUB_TOKEN&gt;
          GitHub API token to use when checking github.com links, to avoid rate limiting
          
          [env: GITHUB_TOKEN]

      --skip-missing
          Skip missing input files (default is to error if they don&#39;</span>t exist<span class="token punctuation">)</span>

      --include-verbatim
          Find links <span class="token keyword">in</span> verbatim sections like <span class="token variable"><span class="token variable">\`</span>pre<span class="token variable">\`</span></span>- and <span class="token variable"><span class="token variable">\`</span>code<span class="token variable">\`</span></span> blocks

      --glob-ignore-case
          Ignore <span class="token keyword">case</span> when expanding filesystem path glob inputs

  -o, <span class="token parameter variable">--output</span> <span class="token operator">&lt;</span>OUTPUT<span class="token operator">&gt;</span>
          Output <span class="token function">file</span> of status report

  -f, <span class="token parameter variable">--format</span> <span class="token operator">&lt;</span>FORMAT<span class="token operator">&gt;</span>
          Output <span class="token function">format</span> of final status report <span class="token punctuation">(</span>compact, detailed, json, markdown<span class="token punctuation">)</span>
          
          <span class="token punctuation">[</span>default: compact<span class="token punctuation">]</span>

      --require-https
          When HTTPS is available, treat HTTP links as errors

  -h, <span class="token parameter variable">--help</span>
          Print <span class="token builtin class-name">help</span> <span class="token punctuation">(</span>see a summary with <span class="token string">&#39;-h&#39;</span><span class="token punctuation">)</span>

  -V, <span class="token parameter variable">--version</span>
          Print version

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u9519\u8BEF\u7801-exit-codes" tabindex="-1"><a class="header-anchor" href="#\u9519\u8BEF\u7801-exit-codes" aria-hidden="true">#</a> \u9519\u8BEF\u7801 \uFF08Exit codes\uFF09</h3><ul><li><code>0</code> \u8868\u793A\u6210\u529F\uFF08\u5DF2\u6210\u529F\u68C0\u67E5\u6240\u6709\u94FE\u63A5\u6216\u5DF2\u6309\u7167\u914D\u7F6E\u6392\u9664/\u8DF3\u8FC7\u6240\u6709\u94FE\u63A5\uFF09</li><li><code>1</code> \u7528\u4E8E\u4E22\u5931\u7684\u8F93\u5165\u548C\u4EFB\u4F55\u610F\u5916\u7684\u8FD0\u884C\u65F6\u5931\u8D25\u6216\u914D\u7F6E\u9519\u8BEF</li><li><code>2</code> \u8868\u793A\u94FE\u8DEF\u68C0\u67E5\u5931\u8D25\uFF08\u5982\u679C\u4EFB\u4F55\u672A\u6392\u9664\u7684\u94FE\u8DEF\u672A\u901A\u8FC7\u68C0\u67E5\uFF09</li></ul><h3 id="ignoring-links" tabindex="-1"><a class="header-anchor" href="#ignoring-links" aria-hidden="true">#</a> Ignoring links</h3><p>\u60A8\u53EF\u4EE5\u901A\u8FC7\u4F7F\u7528 <code>--exclude</code> \u6307\u5B9A\u6B63\u5219\u8868\u8FBE\u5F0F\u6A21\u5F0F\uFF08\u4F8B\u5982\uFF0C <code>--exclude example\\.(com|org)</code> \uFF09\u3002\u5982\u679C\u5F53\u524D\u5DE5\u4F5C\u76EE\u5F55\u4E2D\u5B58\u5728\u540D\u4E3A <code>.lycheeignore</code> \u7684\u6587\u4EF6\uFF0C\u5219\u5176\u5185\u5BB9\u4E5F\u5C06\u88AB\u6392\u9664\u3002\u8BE5\u6587\u4EF6\u5141\u8BB8\u60A8\u5217\u51FA\u591A\u4E2A\u8981\u6392\u9664\u7684\u6B63\u5219\u8868\u8FBE\u5F0F\uFF08\u6BCF\u884C\u4E00\u4E2A\u6A21\u5F0F\uFF09\u3002</p><p>\u8981\u4ECE\u626B\u63CF\u4E2D\u6392\u9664\u6587\u4EF6/\u76EE\u5F55\uFF0C\u8BF7\u4F7F\u7528 <code>lychee.toml</code> \u548C <code>exclude_path</code> \u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>exclude_path <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;some/path&quot;</span>, <span class="token string">&quot;*/dev/*&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="caching" tabindex="-1"><a class="header-anchor" href="#caching" aria-hidden="true">#</a> Caching</h3><p>\u5982\u679C\u8BBE\u7F6E\u4E86 <code>--cache</code> \u6807\u5FD7\uFF0C\u8354\u679D\u5C06\u5728\u5F53\u524D\u76EE\u5F55\u4E2D\u540D\u4E3A <code>.lycheecache</code> \u7684\u6587\u4EF6\u4E2D\u7F13\u5B58\u54CD\u5E94\u3002\u5982\u679C\u6587\u4EF6\u5B58\u5728\u5E76\u4E14\u8BBE\u7F6E\u4E86\u6807\u5FD7\uFF0C\u5219\u5728\u542F\u52A8\u65F6\u5C06\u52A0\u8F7D\u8BE5\u9AD8\u901F\u7F13\u5B58\u3002\u8FD9\u53EF\u4EE5\u5927\u5927\u52A0\u5FEB\u672A\u6765\u7684\u8FD0\u884C\u901F\u5EA6\u3002\u8BF7\u6CE8\u610F\uFF0C\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u8354\u679D\u4E0D\u4F1A\u5728\u78C1\u76D8\u4E0A\u5B58\u50A8\u4EFB\u4F55\u6570\u636E\u3002</p><h2 id="\u7528\u4F5C\u81EA\u5DF1\u7684\u5E93" tabindex="-1"><a class="header-anchor" href="#\u7528\u4F5C\u81EA\u5DF1\u7684\u5E93" aria-hidden="true">#</a> \u7528\u4F5C\u81EA\u5DF1\u7684\u5E93</h2><p>\u4F7F\u7528 rust \u8C03\u7528~</p><h2 id="actions" tabindex="-1"><a class="header-anchor" href="#actions" aria-hidden="true">#</a> actions</h2>`,36),I={href:"https://github.com/lycheeverse/lychee-action",target:"_blank",rel:"noopener noreferrer"},q=s("actions \u7684\u94FE\u63A5\u5730\u5740"),R=l(`<p>\u4F7F\u7528\u8354\u679D\u5FEB\u901F\u68C0\u67E5Markdown\u3001HTML\u548C\u6587\u672C\u6587\u4EF6\u4E2D\u7684\u94FE\u63A5\u3002</p><p><strong>\u53EF\u4EE5\u878D\u5408 issue \u7684\u4F7F\u7528\uFF0C\u6BD4\u5982\u8BF4\uFF1A</strong></p><p>\u4E0E\u201C\u4ECE\u6587\u4EF6\u521B\u5EFA\u95EE\u9898\u201D\u4E00\u8D77\u4F7F\u7528\u65F6\uFF0C\u5F53\u64CD\u4F5C\u53D1\u73B0\u94FE\u63A5\u95EE\u9898\u65F6\uFF0C\u5C06\u6253\u5F00 issue</p><blockquote><p><strong>Note</strong> \u5F53\u7136\uFF0C\u8FD9\u9700\u8981\u4F60\u7684\u6743\u9650</p></blockquote><h3 id="usage" tabindex="-1"><a class="header-anchor" href="#usage" aria-hidden="true">#</a> Usage</h3><p>\u4EE5\u4E0B\u662FGitHub\u5DE5\u4F5C\u6D41\u6587\u4EF6\u7684\u5B8C\u6574\u793A\u4F8B\uFF1A</p><p>\u5B83\u5C06\u6BCF\u5929\u68C0\u67E5\u4E00\u6B21\u6240\u6709\u5B58\u50A8\u5E93\u94FE\u63A5\uFF0C\u5E76\u5728\u51FA\u73B0\u9519\u8BEF\u65F6\u521B\u5EFA\u4E00\u4E2A\u95EE\u9898\u3002\u5C06\u6B64\u4FDD\u5B58\u5728 <code>.github/workflows/links.yml</code> \u4E0B\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Links

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">repository_dispatch</span><span class="token punctuation">:</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>
  <span class="token key atrule">schedule</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">cron</span><span class="token punctuation">:</span> <span class="token string">&quot;00 18 * * *&quot;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>(You\u4E0D\u9700\u8981\u81EA\u5DF1\u914D\u7F6E <code>GITHUB_TOKEN</code> ;\u7531Github\u81EA\u52A8\u8BBE\u7F6E\uFF09\u3002</p><p>\u5982\u679C\u60A8\u603B\u662F\u5E0C\u671B\u4F7F\u7528\u6700\u65B0\u7684\u529F\u80FD\uFF0C\u4F46\u53C8\u907F\u514D\u7834\u574F\u6027\u7684\u66F4\u6539\uFF0C\u5219\u53EF\u4EE5\u5C06\u7248\u672C\u66FF\u6362\u4E3A <code>lycheeverse/lychee-action@v1</code></p><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u53EF\u4EE5\u5BF9\u7167\u8FD9\u4E2A\u52A0\u4E00\u4E9B\u53C2\u6570\uFF0C\u6BD4\u5982 -E \u5C4F\u853D\u6240\u6709 localhost \u548C\u5185\u7F51ip\u7684\u68C0\u67E5\uFF0C\u4EE5\u53CA\u5FFD\u7565401\u548C403\u7684\u9519\u8BEF\uFF0C429\u90A3\u4E2A\u662FGitHub\u7684\u9650\u901F\u62A5\u9519\uFF08\u53EF\u52A0\u53EF\u4E0D\u52A0\uFF09</p><p><img src="http://sm.nsddd.top/sm202305131950121.png" alt="image-20230513195026852"></p></div><h3 id="alternative-approach-\u66FF\u4EE3\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#alternative-approach-\u66FF\u4EE3\u65B9\u6CD5" aria-hidden="true">#</a> Alternative approach (\u66FF\u4EE3\u65B9\u6CD5)</h3><p>\u8FD9\u5C06\u5728\u4EFB\u4F55git push\u4E8B\u4EF6\u548C\u6240\u6709pull\u8BF7\u6C42\u671F\u95F4\u68C0\u67E5\u6240\u6709\u5B58\u50A8\u5E93\u94FE\u63A5\u3002\u5982\u679C\u51FA\u73B0\u9519\u8BEF\uFF0C\u64CD\u4F5C\u5C06\u5931\u8D25\u3002</p><p>\u8FD9\u6837\u505A\u7684\u597D\u5904\u662F\u786E\u4FDD\u5728\u5408\u5E76\u8BF7\u6C42\u671F\u95F4\uFF0C\u4E0D\u4F1A\u6DFB\u52A0\u4EFB\u4F55\u65AD\u5F00\u7684\u94FE\u63A5\uFF0C\u5E76\u4E14\u5982\u679C\u4EFB\u4F55\u73B0\u6709\u94FE\u63A5\u65AD\u5F00\uFF0C\u5B83\u4EEC\u5C06\u88AB\u6355\u83B7\u3002\u5C06\u5176\u4FDD\u5B58\u5728 <code>.github/workflows/links-fail-fast.yml</code> \u4E0B\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Links (Fail Fast)

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u6807\u5FD7" tabindex="-1"><a class="header-anchor" href="#\u6807\u5FD7" aria-hidden="true">#</a> \u6807\u5FD7</h2>`,16),A={href:"https://github.com/OpenIMSDK/Open-IM-Server/actions/workflows/links.yml",target:"_blank",rel:"noopener noreferrer"},M=n("img",{src:"https://github.com/OpenIMSDK/Open-IM-Server/actions/workflows/links.yml/badge.svg",alt:"Check Links"},null,-1),U=n("h2",{id:"end-\u94FE\u63A5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#end-\u94FE\u63A5","aria-hidden":"true"},"#"),s(" END \u94FE\u63A5")],-1),L=n("ul",null,[n("li",null,[n("div",null,[n("a",{href:"57.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"59.md",style:{float:"right"}}," \uFE0F\u4E0B\u4E00\u8282\u{1F517}")])])],-1),H=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),D={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},O=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),S=s(")"),N=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),G={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},P=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function B(F,K){const a=i("ExternalLinkIcon"),t=i("RouterLink");return o(),r("div",null,[n("ul",null,[n("li",null,[n("a",u,[v,e(a)])])]),m,b,k,n("blockquote",null,[n("p",null,[h,n("a",g,[f,e(a)]),y,n("a",_,[x,e(a)]),E,n("a",w,[T,e(a)])])]),C,n("ul",null,[n("li",null,[n("a",I,[q,e(a)])])]),R,n("p",null,[n("a",A,[M,e(a)])]),U,L,n("ul",null,[n("li",null,[n("p",null,[e(t,{to:"/"},{default:d(()=>[H]),_:1})])]),n("li",null,[n("p",null,[n("a",D,[O,e(a)]),S])]),n("li",null,[n("p",null,[N,n("a",G,[P,e(a)])])])])])}const j=c(p,[["render",B],["__file","58.html.vue"]]);export{j as default};
