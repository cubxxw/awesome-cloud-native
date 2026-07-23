<template><div><h1 id="_130-重新搭建我的博客-静态" tabindex="-1"><a class="header-anchor" href="#_130-重新搭建我的博客-静态" aria-hidden="true">#</a> 130: 重新搭建我的博客（静态）</h1>
<p>冤大头回来了 …</p>
<p>太难了这次，准备简历的时候，发现我的博客没了，我最亲爱的，陪伴了一年的，备受好评的博客 <a href="cubxxw.com">cubxxw.com</a> 牺牲了 呜呜呜呜</p>
<p>别急别急，吸取教训，第一件事是什么，坚决不用动态博客了，从大一的第一代博客使用 workpress， 那时候用的服务器管理工具是 著名顶顶的 宝塔 ， 虽然现在我还在用，哈哈哈，不过以后绝对绝对不会再用了 。第二代博客还记得吗 ，第二代博客就是我刚刚牺牲掉的博客，使用 docker 搭建，存活了两年（大二到大三），服务器中途都换了一次，不过得益于 Docker 优雅的移植性haha，所以我的博客得以存活。</p>
<p>那这次为啥挂了？？？ 挂的时间是 2023 年 9 月 1 日。原因是 Java 出现故障，发现 swtich 空间不足，然后，准备移植的，修复的，实在是觉得无力维护，我希望我的博客可以长久生存几年，十几年，甚至是几十年上百年。</p>
<p>所以，从头开始 !!!</p>
<h2 id="选择合适的博客模板" tabindex="-1"><a class="header-anchor" href="#选择合适的博客模板" aria-hidden="true">#</a> 选择合适的博客模板</h2>
<p>之前用过 vuepress 做笔记，vuepress 相对来说不是特别合适我现在做的，因为已经有视觉疲惫了哈哈哈，看着很不舒服，所以用我很喜欢的一个开源项目，大家很多人也耳熟能详的顶级开源项目：hugo ,  GitHub 地址是：https://github.com/gohugoio/hugo</p>
<p>接下来就是选择合适的主题了，我参考了几个热门的 theme 选择了 https://github.com/adityatelange/hugo-PaperMod</p>
<h3 id="安装-hugo" tabindex="-1"><a class="header-anchor" href="#安装-hugo" aria-hidden="true">#</a> 安装 Hugo</h3>
<p>我热衷于源码，可以随时改代码，提 PR ，于是用源码构建：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> clone https://github.com/cubxxw/hugo.git
❯ <span class="token builtin class-name">cd</span> hugo 
❯ go build
❯ <span class="token function">mv</span> hugo /usr/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="部署主题" tabindex="-1"><a class="header-anchor" href="#部署主题" aria-hidden="true">#</a> 部署主题</h3>
<p>选择我们使用的主题：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> clone https://github.com/adityatelange/hugo-PaperMod themes/PaperMod <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span>

<span class="token comment"># 如果希望后面更新主题</span>
❯ <span class="token builtin class-name">cd</span> themes/PaperMod
❯ <span class="token function">git</span> pull
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用 git <a href="https://www.atlassian.com/git/tutorials/git-submodule" target="_blank" rel="noopener noreferrer">submodule<ExternalLinkIcon/></a> with</strong></p>
<blockquote>
<p>代码可能是要提交到 Github 的，所以外模块包含子项目的 git 可以用 git submodule 来管理。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> submodule <span class="token function">add</span> <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span> https://github.com/adityatelange/hugo-PaperMod.git themes/PaperMod
❯ <span class="token function">git</span> submodule update <span class="token parameter variable">--init</span> <span class="token parameter variable">--recursive</span> <span class="token comment"># needed when you reclone your repo (submodules may not get cloned automatically)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>Note</strong>: You may use <code v-pre> --branch v7.0</code> to end of above command if you want to stick to specific release.</p>
</blockquote>
<p><strong>用方法2更新主题</strong>:</p>
<blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">git</span> submodule update <span class="token parameter variable">--remote</span> <span class="token parameter variable">--merge</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<p><strong>添加主题到 hugo.toml 中：</strong></p>
<p>推荐使用 yaml 或者是 toml ，我比较喜欢用 yaml 哈哈，当然，用 https://tooltt.com/yaml2toml/ 工具可以随便转换</p>
<div class="language-toml ext-toml line-numbers-mode"><pre v-pre class="language-toml"><code><span class="token key property">baseURL</span> <span class="token punctuation">=</span> <span class="token string">'https://cubxxw.com'</span>
<span class="token key property">languageCode</span> <span class="token punctuation">=</span> <span class="token string">'en-us'</span>
<span class="token key property">title</span> <span class="token punctuation">=</span> <span class="token string">'cubxxw is blog'</span>
<span class="token key property">theme</span> <span class="token punctuation">=</span> <span class="token string">"PaperMod"</span>

<span class="token key property">enableRobotsTXT</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
<span class="token key property">buildDrafts</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">buildFuture</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">buildExpired</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">googleAnalytics</span> <span class="token punctuation">=</span> <span class="token string">"UA-123-45"</span>
<span class="token key property">pygmentsUseClasses</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>

<span class="token punctuation">[</span><span class="token table class-name">minify</span><span class="token punctuation">]</span>
<span class="token key property">disableXML</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
<span class="token key property">minifyOutput</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>

<span class="token punctuation">[</span><span class="token table class-name">params</span><span class="token punctuation">]</span>
<span class="token key property">env</span> <span class="token punctuation">=</span> <span class="token string">"production"</span>
<span class="token key property">title</span> <span class="token punctuation">=</span> <span class="token string">"ExampleSite"</span>
<span class="token key property">description</span> <span class="token punctuation">=</span> <span class="token string">"ExampleSite description"</span>
<span class="token key property">keywords</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span> <span class="token string">"Blog"</span><span class="token punctuation">,</span> <span class="token string">"Portfolio"</span><span class="token punctuation">,</span> <span class="token string">"PaperMod"</span> <span class="token punctuation">]</span>
<span class="token key property">author</span> <span class="token punctuation">=</span> <span class="token string">"Me"</span>
<span class="token key property">images</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span> <span class="token string">"&lt;link or path of image for opengraph, twitter-cards>"</span> <span class="token punctuation">]</span>
<span class="token key property">DateFormat</span> <span class="token punctuation">=</span> <span class="token string">"January 2, 2006"</span>
<span class="token key property">defaultTheme</span> <span class="token punctuation">=</span> <span class="token string">"auto"</span>
<span class="token key property">disableThemeToggle</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">ShowReadingTime</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
<span class="token key property">ShowShareButtons</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
<span class="token key property">ShowPostNavLinks</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
<span class="token key property">ShowBreadCrumbs</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
<span class="token key property">ShowCodeCopyButtons</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">ShowWordCount</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
<span class="token key property">ShowRssButtonInSectionTermList</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
<span class="token key property">UseHugoToc</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
<span class="token key property">disableSpecial1stPost</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">disableScrollToTop</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">comments</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">hidemeta</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">hideSummary</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">showtoc</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
<span class="token key property">tocopen</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>

  <span class="token punctuation">[</span><span class="token table class-name">params.assets</span><span class="token punctuation">]</span>
  <span class="token key property">favicon</span> <span class="token punctuation">=</span> <span class="token string">"&lt;link / abs url>"</span>
  <span class="token key property">favicon16x16</span> <span class="token punctuation">=</span> <span class="token string">"&lt;link / abs url>"</span>
  <span class="token key property">favicon32x32</span> <span class="token punctuation">=</span> <span class="token string">"&lt;link / abs url>"</span>
  <span class="token key property">apple_touch_icon</span> <span class="token punctuation">=</span> <span class="token string">"&lt;link / abs url>"</span>
  <span class="token key property">safari_pinned_tab</span> <span class="token punctuation">=</span> <span class="token string">"&lt;link / abs url>"</span>

  <span class="token punctuation">[</span><span class="token table class-name">params.label</span><span class="token punctuation">]</span>
  <span class="token key property">text</span> <span class="token punctuation">=</span> <span class="token string">"Home"</span>
  <span class="token key property">icon</span> <span class="token punctuation">=</span> <span class="token string">"/apple-touch-icon.png"</span>
  <span class="token key property">iconHeight</span> <span class="token punctuation">=</span> <span class="token number">35</span>

  <span class="token punctuation">[</span><span class="token table class-name">params.profileMode</span><span class="token punctuation">]</span>
  <span class="token key property">enabled</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
  <span class="token key property">title</span> <span class="token punctuation">=</span> <span class="token string">"ExampleSite"</span>
  <span class="token key property">subtitle</span> <span class="token punctuation">=</span> <span class="token string">"This is subtitle"</span>
  <span class="token key property">imageUrl</span> <span class="token punctuation">=</span> <span class="token string">"&lt;img location>"</span>
  <span class="token key property">imageWidth</span> <span class="token punctuation">=</span> <span class="token number">120</span>
  <span class="token key property">imageHeight</span> <span class="token punctuation">=</span> <span class="token number">120</span>
  <span class="token key property">imageTitle</span> <span class="token punctuation">=</span> <span class="token string">"my image"</span>

    <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">params.profileMode.buttons</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
    <span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">"Posts"</span>
    <span class="token key property">url</span> <span class="token punctuation">=</span> <span class="token string">"posts"</span>

    <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">params.profileMode.buttons</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
    <span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">"Tags"</span>
    <span class="token key property">url</span> <span class="token punctuation">=</span> <span class="token string">"tags"</span>

  <span class="token punctuation">[</span><span class="token table class-name">params.homeInfoParams</span><span class="token punctuation">]</span>
  <span class="token key property">Title</span> <span class="token punctuation">=</span> <span class="token string">"Hi there 👋"</span>
  <span class="token key property">Content</span> <span class="token punctuation">=</span> <span class="token string">"Welcome to my blog"</span>

  <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">params.socialIcons</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
  <span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">"twitter"</span>
  <span class="token key property">url</span> <span class="token punctuation">=</span> <span class="token string">"https://twitter.com/"</span>

  <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">params.socialIcons</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
  <span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">"stackoverflow"</span>
  <span class="token key property">url</span> <span class="token punctuation">=</span> <span class="token string">"https://stackoverflow.com"</span>

  <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">params.socialIcons</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
  <span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">"github"</span>
  <span class="token key property">url</span> <span class="token punctuation">=</span> <span class="token string">"https://github.com/"</span>

<span class="token punctuation">[</span><span class="token table class-name">params.analytics.google</span><span class="token punctuation">]</span>
<span class="token key property">SiteVerificationTag</span> <span class="token punctuation">=</span> <span class="token string">"XYZabc"</span>

<span class="token punctuation">[</span><span class="token table class-name">params.analytics.bing</span><span class="token punctuation">]</span>
<span class="token key property">SiteVerificationTag</span> <span class="token punctuation">=</span> <span class="token string">"XYZabc"</span>

<span class="token punctuation">[</span><span class="token table class-name">params.analytics.yandex</span><span class="token punctuation">]</span>
<span class="token key property">SiteVerificationTag</span> <span class="token punctuation">=</span> <span class="token string">"XYZabc"</span>

  <span class="token punctuation">[</span><span class="token table class-name">params.cover</span><span class="token punctuation">]</span>
  <span class="token key property">hidden</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
  <span class="token key property">hiddenInList</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
  <span class="token key property">hiddenInSingle</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>

  <span class="token punctuation">[</span><span class="token table class-name">params.editPost</span><span class="token punctuation">]</span>
  <span class="token key property">URL</span> <span class="token punctuation">=</span> <span class="token string">"https://github.com/&lt;path_to_repo>/content"</span>
  <span class="token key property">Text</span> <span class="token punctuation">=</span> <span class="token string">"Suggest Changes"</span>
  <span class="token key property">appendFilePath</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>

  <span class="token punctuation">[</span><span class="token table class-name">params.fuseOpts</span><span class="token punctuation">]</span>
  <span class="token key property">isCaseSensitive</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
  <span class="token key property">shouldSort</span> <span class="token punctuation">=</span> <span class="token boolean">true</span>
  <span class="token key property">location</span> <span class="token punctuation">=</span> <span class="token number">0</span>
  <span class="token key property">distance</span> <span class="token punctuation">=</span> <span class="token number">1_000</span>
  <span class="token key property">threshold</span> <span class="token punctuation">=</span> <span class="token number">0.4</span>
  <span class="token key property">minMatchCharLength</span> <span class="token punctuation">=</span> <span class="token number">0</span>
  <span class="token key property">keys</span> <span class="token punctuation">=</span> <span class="token punctuation">[</span> <span class="token string">"title"</span><span class="token punctuation">,</span> <span class="token string">"permalink"</span><span class="token punctuation">,</span> <span class="token string">"summary"</span><span class="token punctuation">,</span> <span class="token string">"content"</span> <span class="token punctuation">]</span>

<span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">menu.main</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token key property">identifier</span> <span class="token punctuation">=</span> <span class="token string">"categories"</span>
<span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">"categories"</span>
<span class="token key property">url</span> <span class="token punctuation">=</span> <span class="token string">"/categories/"</span>
<span class="token key property">weight</span> <span class="token punctuation">=</span> <span class="token number">10</span>

<span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">menu.main</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token key property">identifier</span> <span class="token punctuation">=</span> <span class="token string">"tags"</span>
<span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">"tags"</span>
<span class="token key property">url</span> <span class="token punctuation">=</span> <span class="token string">"/tags/"</span>
<span class="token key property">weight</span> <span class="token punctuation">=</span> <span class="token number">20</span>

<span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token table class-name">menu.main</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token key property">identifier</span> <span class="token punctuation">=</span> <span class="token string">"example"</span>
<span class="token key property">name</span> <span class="token punctuation">=</span> <span class="token string">"example.org"</span>
<span class="token key property">url</span> <span class="token punctuation">=</span> <span class="token string">"https://example.org"</span>
<span class="token key property">weight</span> <span class="token punctuation">=</span> <span class="token number">30</span>

<span class="token punctuation">[</span><span class="token table class-name">markup.highlight</span><span class="token punctuation">]</span>
<span class="token key property">noClasses</span> <span class="token punctuation">=</span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>然后就是创建一个文件：</strong></p>
<blockquote>
<p>样本<code v-pre>Page.md</code></p>
</blockquote>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token front-matter-block"><span class="token punctuation">---</span>
<span class="token front-matter yaml language-yaml"><span class="token key atrule">title</span><span class="token punctuation">:</span> <span class="token string">"My 1st post"</span>
<span class="token key atrule">date</span><span class="token punctuation">:</span> <span class="token datetime number">2020-09-15T11:30:03+00:00</span>
<span class="token comment"># weight: 1</span>
<span class="token comment"># aliases: ["/first"]</span>
<span class="token key atrule">tags</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"first"</span><span class="token punctuation">]</span>
<span class="token key atrule">author</span><span class="token punctuation">:</span> <span class="token string">"Me"</span>
<span class="token comment"># author: ["Me", "You"] # multiple authors</span>
<span class="token key atrule">showToc</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">TocOpen</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">draft</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">hidemeta</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">comments</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">"Desc Text."</span>
<span class="token key atrule">canonicalURL</span><span class="token punctuation">:</span> <span class="token string">"https://canonical.url/to/page"</span>
<span class="token key atrule">disableHLJS</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># to disable highlightjs</span>
<span class="token key atrule">disableShare</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">disableHLJS</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">hideSummary</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">searchHidden</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">ShowReadingTime</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">ShowBreadCrumbs</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">ShowPostNavLinks</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">ShowWordCount</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">ShowRssButtonInSectionTermList</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">UseHugoToc</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">cover</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">"&lt;image path/url>"</span> <span class="token comment"># image path/url</span>
    <span class="token key atrule">alt</span><span class="token punctuation">:</span> <span class="token string">"&lt;alt text>"</span> <span class="token comment"># alt text</span>
    <span class="token key atrule">caption</span><span class="token punctuation">:</span> <span class="token string">"&lt;text>"</span> <span class="token comment"># display caption under cover</span>
    <span class="token key atrule">relative</span><span class="token punctuation">:</span> <span class="token boolean important">false</span> <span class="token comment"># when using page bundles set this to true</span>
    <span class="token key atrule">hidden</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># only hide on current single page</span>
<span class="token key atrule">editPost</span><span class="token punctuation">:</span>
    <span class="token key atrule">URL</span><span class="token punctuation">:</span> <span class="token string">"https://github.com/&lt;path_to_repo>/content"</span>
    <span class="token key atrule">Text</span><span class="token punctuation">:</span> <span class="token string">"Suggest Changes"</span> <span class="token comment"># edit text</span>
    <span class="token key atrule">appendFilePath</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># to append file path to Edit link</span></span>
<span class="token punctuation">---</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过创建来使用它<code v-pre>archetypes/post.md</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ hugo new <span class="token parameter variable">--kind</span> post archetypes/Page.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>下面的所有例子都使用 <code v-pre>yml/yaml</code> 格式，我建议使用 <code v-pre>yml</code> 而不是 <code v-pre>toml</code> ，因为它更容易阅读。</strong></p>
<p>当然，作为云原生的配置文件， yaml 比 toml 更加受到我的 love 💌</p>
<h3 id="hugo-的基础命令" tabindex="-1"><a class="header-anchor" href="#hugo-的基础命令" aria-hidden="true">#</a> hugo 的基础命令</h3>
<p><strong>添加内容：</strong></p>
<p>你可以使用 <code v-pre>hugo new</code> 命令来添加新的内容，例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ hugo new posts/my-first-post.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令会在生成 <code v-pre>content/posts/my-first-post.md</code> 文件，</p>
<p>然后，编辑 <code v-pre>content/posts/my-first-post.md</code> 文件，添加你的内容。</p>
<p><strong>生成所有的内容：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ hugo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>上述命令会生成所有的页面，并把它们放在 <code v-pre>public/</code> 目录中。</p>
</blockquote>
<p><strong>你可以使用 <code v-pre>hugo server</code> 命令来本地预览你的网站：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ hugo server <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>-D</code> 参数意味着包括草稿内容。然后，在浏览器中访问 <code v-pre>http://localhost:1313</code> 来查看你的站点。</p>
<p><strong>定义路径</strong></p>
<p>默认的情况下，路径是强相关的，比如说你在哪个目录中定义，那么路径就是这个目录的路径，但是这并不是绝对的。</p>
<p>比如说上面：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ hugo new posts/my-first-post.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该帖子的默认访问URL通常会是：</p>
<ul>
<li>http://localhost:1313/posts/my-first-post/</li>
</ul>
<p>注意以下几点：</p>
<ol>
<li><strong>末尾的斜杠</strong>：Hugo默认生成的是&quot;pretty URLs&quot;，这意味着它们会以斜杠结尾。你可以在Hugo的配置文件中修改这一行为。</li>
<li><strong>草稿和发布</strong>：新创建的帖子默认是草稿状态（在帖子的头部信息中，<code v-pre>draft: true</code>）。如果你使用<code v-pre>hugo server</code>来预览你的站点，并没有加<code v-pre>-D</code>参数，你是看不到草稿的。为了预览草稿内容，你需要使用<code v-pre>hugo server -D</code>。</li>
<li><strong>自定义路径</strong>：如果你想要为特定的帖子定义一个自定义的路径，你可以在该帖子的头部信息（front matter）中使用<code v-pre>url</code>属性来指定。</li>
</ol>
<h2 id="主题配置" tabindex="-1"><a class="header-anchor" href="#主题配置" aria-hidden="true">#</a> 主题配置</h2>
<p>接下来的环境，开始我们的主题配置，主题的配置使得 hugo 的主题得以丰富</p>
<h3 id="默认主题-暗-亮" tabindex="-1"><a class="header-anchor" href="#默认主题-暗-亮" aria-hidden="true">#</a> 默认主题 暗/亮</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">params</span><span class="token punctuation">:</span>
    <span class="token comment"># defaultTheme: light</span>
    <span class="token comment"># defaultTheme: dark</span>
    <span class="token key atrule">defaultTheme</span><span class="token punctuation">:</span> auto <span class="token comment"># to switch between dark or light according to browser theme</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="archives-布局" tabindex="-1"><a class="header-anchor" href="#archives-布局" aria-hidden="true">#</a> Archives 布局</h3>
<p>在 <code v-pre>content</code> 目录中创建一个带有 <code v-pre>archive.md</code> 的页面，内容如下</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── config.yml
├── content/
│   ├── archives.md   <span class="token operator">&lt;</span>--- Create archive.md here
│   └── posts/
├── static/
└── themes/
    └── PaperMod/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>并添加以下内容:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>---
title: <span class="token string">"Archive"</span>
layout: <span class="token string">"archives"</span>
url: <span class="token string">"/archives/"</span>
summary: archives
---
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：<strong>Archives</strong> 布局不支持多语言月份翻译。</p>
<h3 id="启动" tabindex="-1"><a class="header-anchor" href="#启动" aria-hidden="true">#</a> 启动</h3>
<p><strong>使用 <code v-pre>hugo server</code> 启动：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ hugo server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后访问：http://localhost:1313/</p>
<p><img src="http://sm.cubxxw.com/sm202309132220842.png" alt="image-20230913222054387"></p>
<p>点击 <strong>月亮</strong> ，支持设置 <strong>明暗</strong> 。</p>
<h3 id="常规模式-默认模式" tabindex="-1"><a class="header-anchor" href="#常规模式-默认模式" aria-hidden="true">#</a> 常规模式（默认模式）</h3>
<p>使用第1个条目作为某些信息:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">homeInfoParams</span><span class="token punctuation">:</span>
    <span class="token key atrule">Title</span><span class="token punctuation">:</span> Hi there 👋
    <span class="token key atrule">Content</span><span class="token punctuation">:</span> My name is Xinwei(bear) Xiong. My loyalty is to adventure 🤖
  <span class="token key atrule">socialIcons</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> twitter
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//twitter.com/xxw3293172751
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> stackoverflow
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//stackoverflow.com/users/17393425/xinwei<span class="token punctuation">-</span>xiong
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> github
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/cubxxw
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> zhihu
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//www.zhihu.com/people/3293172751
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> linkedin
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//www.linkedin.com/in/cubxxw
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> bilibili
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//space.bilibili.com/1233089591
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> youtube
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//https//www.youtube.com/channel/UCd3qbRbMwYlh5uKneo_2m_w
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> liberapay
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//liberapay.com/xiongxinwei/donate
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> email
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//mail.google.com/mail/u/0/<span class="token punctuation">?</span>fs=1<span class="token important">&amp;tf=cm&amp;to=3293172751nss@gmail.com</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> weibo
      <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//weibo.com/u/6248930985
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="profile模式" tabindex="-1"><a class="header-anchor" href="#profile模式" aria-hidden="true">#</a> Profile模式</h3>
<p>将 Index/Home 显示为带有社交链接和图像的完整页面</p>
<p>在配置文件中添加以下内容:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>params<span class="token punctuation">:</span>
    profileMode<span class="token punctuation">:</span>
        enabled<span class="token punctuation">:</span> <span class="token boolean">true</span>
        title<span class="token punctuation">:</span> <span class="token string">"&lt;Title>"</span> # optional <span class="token keyword">default</span> will be site title
        subtitle<span class="token punctuation">:</span> <span class="token string">"This is subtitle"</span>
        imageUrl<span class="token punctuation">:</span> <span class="token string">"&lt;image link>"</span> # optional
        imageTitle<span class="token punctuation">:</span> <span class="token string">"&lt;title of image as alt>"</span> # optional
        imageWidth<span class="token punctuation">:</span> <span class="token number">120</span> # custom size
        imageHeight<span class="token punctuation">:</span> <span class="token number">120</span> # custom size
        buttons<span class="token punctuation">:</span>
            <span class="token operator">-</span> name<span class="token punctuation">:</span> Archive
            url<span class="token punctuation">:</span> <span class="token string">"/archive"</span>
            <span class="token operator">-</span> name<span class="token punctuation">:</span> Github
            url<span class="token punctuation">:</span> <span class="token string">"https://github.com/"</span>

    socialIcons<span class="token punctuation">:</span> # optional
        <span class="token operator">-</span> name<span class="token punctuation">:</span> <span class="token string">"&lt;platform>"</span>
            url<span class="token punctuation">:</span> <span class="token string">"&lt;link>"</span>
        <span class="token operator">-</span> name<span class="token punctuation">:</span> <span class="token string">"&lt;platform 2>"</span>
            url<span class="token punctuation">:</span> <span class="token string">"&lt;link2>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="breadcrumb-导航" tabindex="-1"><a class="header-anchor" href="#breadcrumb-导航" aria-hidden="true">#</a> BreadCrumb 导航</h3>
<p>在文章标题上方添加 BreadCrumb 导航，以显示子章节和主页导航</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">params</span><span class="token punctuation">:</span>
    <span class="token key atrule">ShowBreadCrumbs</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>可以禁用特定页面的封面:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">ShowBreadCrumbs</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编辑帖子链接" tabindex="-1"><a class="header-anchor" href="#编辑帖子链接" aria-hidden="true">#</a> 编辑帖子链接</h3>
<p>添加一个按钮，通过使用文章的文件路径链接到编辑目的地来建议更改。</p>
<p>对于站点配置用途：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">Params</span><span class="token punctuation">:</span>
    <span class="token key atrule">editPost</span><span class="token punctuation">:</span>
        <span class="token key atrule">URL</span><span class="token punctuation">:</span> <span class="token string">"https://github.com/&lt;gitlab user>/&lt;repo name>/tree/&lt;branch name>/&lt;path to content>/"</span>
        <span class="token key atrule">Text</span><span class="token punctuation">:</span> <span class="token string">"Suggest Changes"</span> <span class="token comment"># edit text</span>
        <span class="token key atrule">appendFilePath</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># to append file path to Edit link</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可针对单个页面进行修改:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">editPost</span><span class="token punctuation">:</span>
    <span class="token key atrule">URL</span><span class="token punctuation">:</span> <span class="token string">"https://github.com/&lt;path_to_repo>/content"</span>
    <span class="token key atrule">Text</span><span class="token punctuation">:</span> <span class="token string">"Suggest Changes"</span> <span class="token comment"># edit text</span>
    <span class="token key atrule">appendFilePath</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment"># to append file path to Edit link</span>
<span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="icons-表情-图标" tabindex="-1"><a class="header-anchor" href="#icons-表情-图标" aria-hidden="true">#</a> Icons 表情 &amp; 图标</h3>
<ul>
<li>https://github.com/adityatelange/hugo-PaperMod/wiki/Icons</li>
</ul>
<h3 id="配置文件变量" tabindex="-1"><a class="header-anchor" href="#配置文件变量" aria-hidden="true">#</a> 配置文件变量</h3>
<ul>
<li>https://github.com/adityatelange/hugo-PaperMod/wiki/Variables</li>
</ul>
<h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2>
<p>使用 GitHub actions 进行部署，在 Makefile 中集成一些高级的命令</p>
<p>下面是 Makefile 的配置：</p>
<div class="language-makefile ext-makefile line-numbers-mode"><pre v-pre class="language-makefile"><code><span class="token comment">###################################=> common commands &lt;=#############################################</span>
<span class="token comment"># ========================== Capture Environment ===============================</span>
<span class="token comment"># get the repo root and output path</span>
ROOT_PACKAGE<span class="token operator">=</span>github.com/cubxxw/blog
OUT_DIR<span class="token operator">=</span><span class="token variable">$</span><span class="token punctuation">(</span>REPO_ROOT<span class="token punctuation">)</span>/_output
<span class="token comment"># ==============================================================================</span>

<span class="token comment"># define the default goal</span>
<span class="token comment">#</span>

SHELL <span class="token operator">:=</span> /bin/bash
DIRS<span class="token operator">=</span><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> ls<span class="token punctuation">)</span>
GO<span class="token operator">=</span>go

.DEFAULT_GOAL <span class="token operator">:=</span> help

<span class="token comment"># include the common makefile</span>
COMMON_SELF_DIR <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">dir</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">lastword</span> <span class="token variable">$</span><span class="token punctuation">(</span>MAKEFILE_LIST<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token comment"># ROOT_DIR: root directory of the code base</span>
<span class="token keyword">ifeq</span> <span class="token punctuation">(</span><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">origin</span> ROOT_DIR<span class="token punctuation">)</span>,undefined<span class="token punctuation">)</span>
ROOT_DIR <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">abspath</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> cd <span class="token variable">$</span><span class="token punctuation">(</span>COMMON_SELF_DIR<span class="token punctuation">)</span>/. &amp;&amp; pwd -P<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span>
<span class="token comment"># OUTPUT_DIR: The directory where the build output is stored.</span>
<span class="token keyword">ifeq</span> <span class="token punctuation">(</span><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">origin</span> OUTPUT_DIR<span class="token punctuation">)</span>,undefined<span class="token punctuation">)</span>
OUTPUT_DIR <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span>ROOT_DIR<span class="token punctuation">)</span>/_output
<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> mkdir -p <span class="token variable">$</span><span class="token punctuation">(</span>OUTPUT_DIR<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span>

<span class="token comment"># BIN_DIR: The directory where the build output is stored.</span>
<span class="token keyword">ifeq</span> <span class="token punctuation">(</span><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">origin</span> BIN_DIR<span class="token punctuation">)</span>,undefined<span class="token punctuation">)</span>
BIN_DIR <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span>OUTPUT_DIR<span class="token punctuation">)</span>/bin
<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> mkdir -p <span class="token variable">$</span><span class="token punctuation">(</span>BIN_DIR<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span>

<span class="token keyword">ifeq</span> <span class="token punctuation">(</span><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">origin</span> TOOLS_DIR<span class="token punctuation">)</span>,undefined<span class="token punctuation">)</span>
TOOLS_DIR <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span>OUTPUT_DIR<span class="token punctuation">)</span>/tools
<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> mkdir -p <span class="token variable">$</span><span class="token punctuation">(</span>TOOLS_DIR<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span>

<span class="token keyword">ifeq</span> <span class="token punctuation">(</span><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">origin</span> TMP_DIR<span class="token punctuation">)</span>,undefined<span class="token punctuation">)</span>
TMP_DIR <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span>OUTPUT_DIR<span class="token punctuation">)</span>/tmp
<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> mkdir -p <span class="token variable">$</span><span class="token punctuation">(</span>TMP_DIR<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">endif</span>

<span class="token keyword">ifeq</span> <span class="token punctuation">(</span><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">origin</span> VERSION<span class="token punctuation">)</span>, undefined<span class="token punctuation">)</span>
VERSION <span class="token operator">:=</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> git describe --tags --always --match<span class="token operator">=</span><span class="token string">"v*"</span> --dirty <span class="token operator">|</span> sed <span class="token string">'s/-/./g'</span><span class="token punctuation">)</span>	<span class="token comment">#v2.3.3.631.g00abdc9b.dirty</span>
<span class="token keyword">endif</span>

<span class="token comment"># Check if the tree is dirty. default to dirty(maybe u should commit?)</span>
GIT_TREE_STATE<span class="token operator">:=</span><span class="token string">"dirty"</span>
<span class="token keyword">ifeq</span> <span class="token punctuation">(</span>, <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> git status --porcelain 2>/dev/null<span class="token punctuation">)</span><span class="token punctuation">)</span>
	GIT_TREE_STATE<span class="token operator">=</span><span class="token string">"clean"</span>
<span class="token keyword">endif</span>
GIT_COMMIT<span class="token operator">:=</span><span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">shell</span> git rev-parse HEAD<span class="token punctuation">)</span>

<span class="token comment"># COMMA: Concatenate multiple strings to form a list of strings</span>
COMMA <span class="token operator">:=</span> ,
<span class="token comment"># SPACE: Used to separate strings</span>
SPACE <span class="token operator">:=</span>
<span class="token comment"># SPACE: Replace multiple consecutive Spaces with a single space</span>
SPACE <span class="token operator">+=</span>

<span class="token comment">## run-default: Run hugo server with default mode.</span>
<span class="token target symbol">run-default</span><span class="token punctuation">:</span>
	<span class="token operator">@</span><span class="token variable">$</span><span class="token punctuation">(</span>TOOLS_DIR<span class="token punctuation">)</span>/hugo server -D --gc -p 13132 --config config.default.yml

<span class="token comment">## run-profile-mode: Run hugo server with profile mode.</span>
<span class="token target symbol">run-profile-mode</span><span class="token punctuation">:</span>
	<span class="token operator">@</span><span class="token variable">$</span><span class="token punctuation">(</span>TOOLS_DIR<span class="token punctuation">)</span>/hugo server -D --gc -p 13133 --config config.profileMode.yml

<span class="token comment">## chroma-css: Generate chroma css.</span>
<span class="token target symbol">chroma-css</span><span class="token punctuation">:</span>
	<span class="token operator">@</span><span class="token variable">$</span><span class="token punctuation">(</span>TOOLS_DIR<span class="token punctuation">)</span>/hugo gen chromastyles --style<span class="token operator">=</span>dracula > assets/css/lib/chroma-dark.css
	<span class="token operator">@</span><span class="token variable">$</span><span class="token punctuation">(</span>TOOLS_DIR<span class="token punctuation">)</span>/hugo gen chromastyles --style<span class="token operator">=</span>github > assets/css/lib/chroma-light.css

<span class="token comment">## run: Run hugo server.</span>
<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> run
<span class="token target symbol">run</span><span class="token punctuation">:</span> tools.verify.hugo
	<span class="token operator">@</span><span class="token variable">$</span><span class="token punctuation">(</span>TOOLS_DIR<span class="token punctuation">)</span>/hugo
	<span class="token operator">@</span><span class="token variable">$</span><span class="token punctuation">(</span>TOOLS_DIR<span class="token punctuation">)</span>/hugo server -D --gc -p 13131 --config config.yml

<span class="token comment">## build: Build site with non-production settings and put deliverables in ./public</span>
<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> build
<span class="token target symbol">build</span><span class="token punctuation">:</span> tools.verify.hugo module-check
	<span class="token operator">@</span><span class="token variable">$</span><span class="token punctuation">(</span>TOOLS_DIR<span class="token punctuation">)</span>/hugo --cleanDestinationDir --minify --environment development

<span class="token comment">## module-check: Check if all of the required submodules are correctly initialized.</span>
<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> module-check
<span class="token target symbol">module-check</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>git submodule status --recursive <span class="token operator">|</span> awk <span class="token string">'/^[+-]/ {err = 1; printf "\033[31mWARNING\033[0m Submodule not initialized: \033[34m%s\033[0m\n",$$2} END { if (err != 0) print "You need to run \033[32mmake module-init\033[0m to initialize missing modules first"; exit err }'</span> 1>&amp;2

<span class="token comment">## module-update: Updating themes</span>
<span class="token target symbol">module-update</span><span class="token punctuation">:</span> tools.verify.hugo
	<span class="token operator">@</span>git submodule update --remote --merge

<span class="token comment">## clean: Clean all builds.</span>
<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> clean
<span class="token target symbol">clean</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>echo <span class="token string">"===========> Cleaning all builds TMP_DIR($(TMP_DIR)) AND BIN_DIR($(BIN_DIR))"</span>
	<span class="token operator">@</span>-rm -vrf <span class="token variable">$</span><span class="token punctuation">(</span>TMP_DIR<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>BIN_DIR<span class="token punctuation">)</span>
	<span class="token operator">@</span>echo <span class="token string">"===========> End clean..."</span>

<span class="token comment">## help: Show this help info.</span>
<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> help
<span class="token target symbol">help</span><span class="token punctuation">:</span> Makefile
	<span class="token operator">@</span>printf <span class="token string">"\n\033[1mUsage: make &lt;TARGETS> ...\033[0m\n\n\\033[1mTargets:\\033[0m\n\n"</span>
	<span class="token operator">@</span>sed -n <span class="token string">'s/^##//p'</span> <span class="token variable">$&lt;</span> <span class="token operator">|</span> awk -F<span class="token string">':'</span> <span class="token string">'{printf "\033[36m%-28s\033[0m %s\n", $$1, $$2}'</span> <span class="token operator">|</span> sed -e <span class="token string">'s/^/ /'</span>

<span class="token comment">################################### Tools #####################################</span>

BUILD_TOOLS <span class="token operator">?=</span> hugo

<span class="token comment">## tools.verify.%: Check if a tool is installed and install it</span>
<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> tools.verify.%
<span class="token target symbol">tools.verify.%</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>echo <span class="token string">"===========> Verifying $* is installed"</span>
	<span class="token operator">@</span>if [ ! -f <span class="token variable">$</span><span class="token punctuation">(</span>TOOLS_DIR<span class="token punctuation">)</span>/<span class="token variable">$*</span> ]<span class="token punctuation">;</span> then GOBIN<span class="token operator">=</span><span class="token variable">$</span><span class="token punctuation">(</span>TOOLS_DIR<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>MAKE<span class="token punctuation">)</span> tools.install.<span class="token variable">$*;</span> fi
	<span class="token operator">@</span>echo <span class="token string">"===========> $* is install in $(TOOLS_DIR)/$*"</span>

<span class="token comment">## tools: Install a must tools</span>
<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> tools
<span class="token target symbol">tools</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>addprefix tools.verify., <span class="token variable">$</span><span class="token punctuation">(</span>BUILD_TOOLS<span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment">## tools.install.%: Install a single tool in $GOBIN/</span>
<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> tools.install.%
<span class="token target symbol">tools.install.%</span><span class="token punctuation">:</span>
	<span class="token operator">@</span>echo <span class="token string">"===========> Installing $,The default installation path is $(GOBIN)/$*"</span>
	<span class="token operator">@</span><span class="token variable">$</span><span class="token punctuation">(</span>MAKE<span class="token punctuation">)</span> install.<span class="token variable">$*</span>

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> install.addlicense
<span class="token target symbol">install.addlicense</span><span class="token punctuation">:</span>
	<span class="token operator">@</span><span class="token variable">$</span><span class="token punctuation">(</span>GO<span class="token punctuation">)</span> install github.com/google/addlicense<span class="token operator">@</span>latest

<span class="token builtin-target builtin">.PHONY</span><span class="token punctuation">:</span> install.hugo
<span class="token target symbol">install.hugo</span><span class="token punctuation">:</span>
	<span class="token operator">@</span><span class="token variable">$</span><span class="token punctuation">(</span>GO<span class="token punctuation">)</span> install github.com/gohugoio/hugo<span class="token operator">@</span>latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然 Makefile 是针对本地的，如果是远程服务器就需要依靠 github actions:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Sample workflow for building and deploying a Hugo site to GitHub Pages</span>
name: Deploy Hugo site to Pages

on:
  <span class="token comment"># Runs on pushes targeting the default branch</span>
  push:
    branches: <span class="token punctuation">[</span><span class="token string">"main"</span><span class="token punctuation">]</span>

  <span class="token comment"># Allows you to run this workflow manually from the Actions tab</span>
  workflow_dispatch:

<span class="token comment"># Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages</span>
permissions:
  contents: <span class="token builtin class-name">read</span>
  pages: <span class="token function">write</span>
  id-token: <span class="token function">write</span>

<span class="token comment"># Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.</span>
<span class="token comment"># However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.</span>
concurrency:
  group: <span class="token string">"pages"</span>
  cancel-in-progress: <span class="token boolean">false</span>

<span class="token comment"># Default to bash</span>
defaults:
  run:
    shell: <span class="token function">bash</span>

jobs:
  <span class="token comment"># Build job</span>
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: <span class="token number">0.114</span>.0
    steps:
      - name: Install Hugo CLI
        run: <span class="token operator">|</span>
          <span class="token function">wget</span> <span class="token parameter variable">-O</span> <span class="token variable">${{ runner.temp }</span><span class="token punctuation">}</span>/hugo.deb https://github.com/gohugoio/hugo/releases/download/v<span class="token variable">${HUGO_VERSION}</span>/hugo_extended_<span class="token variable">${HUGO_VERSION}</span>_linux-amd64.deb <span class="token punctuation">\</span>
          <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> dpkg <span class="token parameter variable">-i</span> <span class="token variable">${{ runner.temp }</span><span class="token punctuation">}</span>/hugo.deb
      - name: Install Dart Sass
        run: <span class="token function">sudo</span> snap <span class="token function">install</span> dart-sass
      - name: Checkout
        uses: actions/checkout@v3
        with:
          submodules: recursive
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v3
      - name: Install Node.js dependencies
        run: <span class="token string">"[[ -f package-lock.json || -f npm-shrinkwrap.json ]] &amp;&amp; npm ci || true"</span>
      - name: Build with Hugo
        env:
          <span class="token comment"># For maximum backward compatibility with Hugo modules</span>
          HUGO_ENVIRONMENT: production
          HUGO_ENV: production
        run: <span class="token operator">|</span>
          hugo <span class="token punctuation">\</span>
            <span class="token parameter variable">--minify</span> <span class="token punctuation">\</span>
            <span class="token parameter variable">--baseURL</span> <span class="token string">"<span class="token variable">${{ steps.pages.outputs.base_url }</span>}/"</span>
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v2
        with:
          path: ./public

  <span class="token comment"># Deployment job</span>
  deploy:
    environment:
      name: github-pages
      url: <span class="token variable">${{ steps.deployment.outputs.page_url }</span><span class="token punctuation">}</span>
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="评论插件" tabindex="-1"><a class="header-anchor" href="#评论插件" aria-hidden="true">#</a> 评论插件</h2>
<p>要添加评论，请创建一个 html 文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>layouts/partials/comments.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>并粘贴您的评论提供商提供的代码</p>
<p>也在配置中添加这个</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">params</span><span class="token punctuation">:</span>
    <span class="token key atrule">comments</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>我使用 ：https://utteranc.es/ 这是一个基于 GitHub 的评论的插件</p>
<h2 id="多语言" tabindex="-1"><a class="header-anchor" href="#多语言" aria-hidden="true">#</a> 多语言</h2>
<ul>
<li>https://gohugo.io/content-management/multilingual/#menus</li>
</ul>
<p>Hugo 支持同时创建多种语言的网站。</p>
<p><code v-pre>languages</code>应该在站点配置的一个部分中定义可用的语言。</p>
<p><strong>按文件名翻译</strong></p>
<ol>
<li><code v-pre>/content/about.en.md</code></li>
<li><code v-pre>/content/about.fr.md</code></li>
</ol>
<p>第一个文件被指定为英语，并链接到第二个文件。第二个文件被指定为法语并链接到第一个文件。</p>
<p>它们的语言是根据作为后缀添加到文件名的语言代码指定的。</p>
<p>通过具有相同的路径和基本文件名，内容片段被链接在一起作为翻译的页面。</p>
<blockquote>
<p>如果文件没有语言代码，则将为其分配默认语言。</p>
</blockquote>
<p><strong>按内容目录翻译</strong></p>
<p>当然也可以根据文件目录去翻译，该系统对每种语言使用不同的内容目录。每种语言的内容目录都使用 <code v-pre>contentDir</code> 参数设置。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">languages</span><span class="token punctuation">:</span>
  <span class="token key atrule">en</span><span class="token punctuation">:</span>
    <span class="token key atrule">contentDir</span><span class="token punctuation">:</span> content/english
    <span class="token key atrule">languageName</span><span class="token punctuation">:</span> English
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">10</span>
  <span class="token key atrule">fr</span><span class="token punctuation">:</span>
    <span class="token key atrule">contentDir</span><span class="token punctuation">:</span> content/french
    <span class="token key atrule">languageName</span><span class="token punctuation">:</span> Français
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>contentDir</code> 的值可以是任何有效路径-甚至是绝对路径引用。唯一的限制是内容目录不能重叠。</p>
<p>最后的示例如下：</p>
<ol>
<li><code v-pre>/content/english/about.md</code></li>
<li><code v-pre>/content/french/about.md</code></li>
</ol>
<p>第一个文件被指定为英语，并链接到第二个文件。第二个文件被指定为法语并链接到第一个文件。</p>
<p>它们的语言是根据它们所在的内容目录指定的。</p>
<p>通过具有相同的路径和基本名称（相对于其语言内容目录），内容片段被链接在一起作为翻译页面。</p>
<p><strong>绕过默认链接</strong></p>
<p>任何页面共享相同的 <code v-pre>translationKey</code> 集在封面将被链接为翻译的网页，无论基地名称或位置。</p>
<p>考虑以下示例：</p>
<ol>
<li><code v-pre>/content/about-us.en.md</code></li>
<li><code v-pre>/content/om.nn.md</code></li>
<li><code v-pre>/content/presentation/a-propos.fr.md</code></li>
</ol>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">translationKey</span><span class="token punctuation">:</span> about
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>通过在所有三个页面中将 <code v-pre>translationKey</code> front matter参数设置为 <code v-pre>about</code> ，它们将被链接为翻译页面。</p>
<h3 id="使用-hugo-new-content-生成多语言内容" tabindex="-1"><a class="header-anchor" href="#使用-hugo-new-content-生成多语言内容" aria-hidden="true">#</a> 使用 <code v-pre>hugo new content</code> 生成多语言内容</h3>
<p><strong>下面给定的是翻译的文件</strong>：</p>
<p>针对同一目录：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>hugo new content posts/my-hugo.en.md
hugo new content posts/my-hugo.de.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>针对不同目录：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>hugo new content content/en/posts/test.md
hugo new content content/de/posts/test.md
hugo new content content/zh/posts/test.md
hugo new content content/fr/posts/test.md
hugo new content content/es/posts/test.md
hugo new content content/zh-tw/posts/test.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们将以下参数添加到我们的配置文件中:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># config.yaml</span>
<span class="token key atrule">languages</span><span class="token punctuation">:</span>
  <span class="token key atrule">en</span><span class="token punctuation">:</span>
    <span class="token key atrule">languageName</span><span class="token punctuation">:</span> English
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">1</span>
  <span class="token key atrule">fr</span><span class="token punctuation">:</span>
    <span class="token key atrule">languageName</span><span class="token punctuation">:</span> Français
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">es</span><span class="token punctuation">:</span>
    <span class="token key atrule">languageName</span><span class="token punctuation">:</span> Spanish
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们的语言将可以使用<code v-pre>site.Languages</code>并按 排序<code v-pre>Weight</code>。越低……越优先。正如我们稍后将介绍的，强烈建议将默认语言放在第一位。</p>
</div></template>


