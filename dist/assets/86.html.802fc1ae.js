import{_ as l,r as o,o as p,c,a as n,b as a,w as r,e as s,d as t}from"./app.a9132acd.js";const d={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},m=s("author"),v=n("h1",{id:"\u7B2C86\u8282-gorelease",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C86\u8282-gorelease","aria-hidden":"true"},"#"),s(" \u7B2C86\u8282 Gorelease")],-1),k=n("div",null,[n("a",{href:"85.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"87.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),b=n("br",null,null,-1),h=s("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),g={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},y=s("sealos"),f=s("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),_={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},w=s("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),x=s("\u3002Myblog:"),q={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},D=s("http://nsddd.top"),T=n("hr",null,null,-1),G=n("p",null,"[TOC]",-1),P=n("h1",{id:"goreleaser-\u81EA\u52A8\u5316\u4F60\u7684\u8F6F\u4EF6\u53D1\u5E03",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#goreleaser-\u81EA\u52A8\u5316\u4F60\u7684\u8F6F\u4EF6\u53D1\u5E03","aria-hidden":"true"},"#"),s(" GoReleaser\uFF1A\u81EA\u52A8\u5316\u4F60\u7684\u8F6F\u4EF6\u53D1\u5E03")],-1),S=n("p",null,"GoReleaser \u7684\u76EE\u6807\u662F\u81EA\u52A8\u5316\u53D1\u5E03\u8F6F\u4EF6\u65F6\u7684\u5927\u90E8\u5206\u7E41\u7410\u5DE5\u4F5C\uFF0C\u901A\u8FC7\u4F7F\u7528\u5408\u7406\u7684\u9ED8\u8BA4\u503C\u5E76\u4F7F\u6700\u5E38\u89C1\u7684\u7528\u4F8B\u53D8\u5F97\u7B80\u5355\u3002",-1),j=n("h2",{id:"\u51C6\u5907\u5DE5\u4F5C",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u51C6\u5907\u5DE5\u4F5C","aria-hidden":"true"},"#"),s(" \u51C6\u5907\u5DE5\u4F5C\uFF1A")],-1),E=n("code",null,".goreleaser.yaml",-1),A=s(" \u6587\u4EF6\uFF1A\u5305\u542B\u6240\u6709\u914D\u7F6E\u4FE1\u606F\u3002\uFF08\u6709\u5173\u66F4\u591A\u4FE1\u606F\uFF0C\u8BF7\u53C2\u9605 "),R={href:"https://goreleaser.com/customization/",target:"_blank",rel:"noopener noreferrer"},C=s("\u81EA\u5B9A\u4E49"),O=s("\uFF09"),I=n("li",null,"\u5E72\u51C0\u7684\u5DE5\u4F5C\u6811\uFF1A\u786E\u4FDD\u4EE3\u7801\u662F\u6700\u65B0\u7684\uFF0C\u5E76\u4E14\u5DF2\u7ECF\u63D0\u4EA4\u4E86\u6240\u6709\u6539\u52A8\u3002",-1),N=n("li",null,[s("\u7B26\u5408 SemVer \u7684\u7248\u672C\u53F7\uFF08\u4F8B\u5982 "),n("code",null,"10.21.34-prerelease+buildmeta"),s("\uFF09")],-1),B=t('<h2 id="goreleaser-\u7684\u8FD0\u884C\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#goreleaser-\u7684\u8FD0\u884C\u6B65\u9AA4" aria-hidden="true">#</a> GoReleaser \u7684\u8FD0\u884C\u6B65\u9AA4\uFF1A</h2><p>GoReleaser \u7684\u8FD0\u884C\u4E3B\u8981\u5206\u4E3A\u4EE5\u4E0B\u56DB\u4E2A\u6B65\u9AA4\uFF1A</p><ol><li><strong>defaulting</strong>\uFF1A\u4E3A\u6BCF\u4E2A\u6B65\u9AA4\u914D\u7F6E\u5408\u7406\u7684\u9ED8\u8BA4\u503C</li><li><strong>building</strong>\uFF1A\u6784\u5EFA\u4E8C\u8FDB\u5236\u6587\u4EF6\u3001\u6863\u6848\u3001\u5305\u3001Docker \u955C\u50CF\u7B49</li><li><strong>releasing</strong>\uFF1A\u5C06\u7248\u672C\u53D1\u5E03\u5230\u914D\u7F6E\u7684 SCM\u3001Docker \u6CE8\u518C\u8868\u3001blob \u5B58\u50A8\u7B49</li><li><strong>announcing</strong>\uFF1A\u5411\u914D\u7F6E\u7684\u9891\u9053\u5BA3\u5E03\u60A8\u7684\u53D1\u5E03</li></ol><p>\u4F7F\u7528 <code>-like</code> \u6807\u5FD7\u53EF\u80FD\u4F1A\u8DF3\u8FC7\u67D0\u4E9B\u6B65\u9AA4\uFF0C\u5982 <code>--skip-foo</code></p><h2 id="\u5FEB\u901F\u5F00\u59CB" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u901F\u5F00\u59CB" aria-hidden="true">#</a> \u5FEB\u901F\u5F00\u59CB</h2>',5),L=s("\u9996\u5148\uFF0C\u8FD0\u884C "),M={href:"https://goreleaser.com/cmd/goreleaser_init/",target:"_blank",rel:"noopener noreferrer"},H=s("init"),F=s(" \u547D\u4EE4\u6765\u521B\u5EFA\u793A\u4F8B\u7684 "),z=n("code",null,".goreleaser.yaml",-1),K=s(" \u6587\u4EF6\uFF1A"),U=n("div",{class:"language-text ext-text line-numbers-mode"},[n("pre",{class:"language-text"},[n("code",null,`goreleaser init
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),Y=s("\u7136\u540E\uFF0C\u6211\u4EEC\u8FD0\u884C\u4E00\u4E2A\u201C\u4EC5\u9650\u672C\u5730\u201D\u7248\u672C\uFF0C\u770B\u770B\u5B83\u662F\u5426\u53EF\u4EE5\u4F7F\u7528 "),$={href:"https://goreleaser.com/cmd/goreleaser_release/",target:"_blank",rel:"noopener noreferrer"},V=s("release"),W=s(" \u547D\u4EE4\u8FD0\u884C\uFF1A"),X=n("div",{class:"language-text ext-text line-numbers-mode"},[n("pre",{class:"language-text"},[n("code",null,`goreleaser release --snapshot --rm-dist
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),Z=s("\u6B64\u65F6\uFF0C\u60A8\u53EF\u4EE5 "),J={href:"https://goreleaser.com/customization/",target:"_blank",rel:"noopener noreferrer"},Q=s("\u81EA\u5B9A\u4E49"),nn=s(" \u751F\u6210\u7684 "),sn=n("code",null,".goreleaser.yaml",-1),an=s(" \u6587\u4EF6\uFF0C\u6216\u4FDD\u6301\u539F\u6837\uFF0C\u8FD9\u53D6\u51B3\u4E8E\u60A8\u3002\u6700\u4F73\u505A\u6CD5\u662F\u5C06 "),en=n("code",null,".goreleaser.yaml",-1),tn=s(" \u6587\u4EF6\u653E\u5165\u7248\u672C\u63A7\u5236\u7CFB\u7EDF\u4E2D\u3002"),on=s("\u60A8\u8FD8\u53EF\u4EE5\u4F7F\u7528 GoReleaser \u4E3A\u7ED9\u5B9A\u7684 GOOS/GOARCH "),ln={href:"https://goreleaser.com/cmd/goreleaser_build/",target:"_blank",rel:"noopener noreferrer"},pn=s("\u6784\u5EFA\u4E8C\u8FDB\u5236\u6587\u4EF6"),cn=s("\uFF0C\u8FD9\u5BF9\u4E8E\u672C\u5730\u5F00\u53D1\u975E\u5E38\u6709\u7528\uFF1A"),rn=t(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>goreleaser build --single-target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u51C6\u5907 GitHub \u7684 Token\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>export GITHUB_TOKEN=&quot;YOUR_GH_TOKEN&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,3),dn=s("GoReleaser \u5C06\u4F7F\u7528\u60A8\u5B58\u50A8\u5E93\u7684\u6700\u65B0 "),un={href:"https://git-scm.com/book/en/v2/Git-Basics-Tagging",target:"_blank",rel:"noopener noreferrer"},mn=s("Git \u6807\u7B7E"),vn=s("\u3002"),kn=t(`<p>\u521B\u5EFA\u4E00\u4E2A\u6807\u7B7E\u5E76\u5C06\u5176\u63A8\u9001\u5230 GitHub\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git push origin v0.1.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u73B0\u5728\uFF0C\u60A8\u53EF\u4EE5\u5728\u9879\u76EE\u7684\u6839\u76EE\u5F55\u8FD0\u884C GoReleaser\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>goreleaser release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5728-github-actions-\u4E2D\u4F7F\u7528-goreleaser" tabindex="-1"><a class="header-anchor" href="#\u5728-github-actions-\u4E2D\u4F7F\u7528-goreleaser" aria-hidden="true">#</a> \u5728 GitHub Actions \u4E2D\u4F7F\u7528 GoReleaser</h2>`,5),bn=s("GoReleaser \u8FD8\u53EF\u4EE5\u901A\u8FC7 "),hn={href:"https://github.com/features/actions",target:"_blank",rel:"noopener noreferrer"},gn=s("GitHub Actions"),yn=s(" \u5728\u6211\u4EEC\u7684\u5B98\u65B9 "),fn={href:"https://github.com/goreleaser/goreleaser-action",target:"_blank",rel:"noopener noreferrer"},_n=s("GoReleaser Action"),wn=s(" \u4E2D\u4F7F\u7528\u3002"),xn=t(`<p>\u60A8\u53EF\u4EE5\u901A\u8FC7\u5C06 YAML \u914D\u7F6E\u653E\u5165 <code>.github/workflows/release.yml</code> \u6587\u4EF6\u4E2D\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>bashcodename: goreleaser

on:
  push:
    <span class="token comment"># \u53EA\u5BF9\u6807\u7B7E\u8FDB\u884C\u8FD0\u884C</span>
    tags:
      - <span class="token string">&#39;*&#39;</span>

permissions:
  contents: <span class="token function">write</span>
  <span class="token comment"># packages: write</span>
  <span class="token comment"># issues: write</span>

jobs:
  goreleaser:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: <span class="token number">0</span>
      - run: <span class="token function">git</span> fetch <span class="token parameter variable">--force</span> <span class="token parameter variable">--tags</span>
      - uses: actions/setup-go@v4
        with:
          go-version: stable
      <span class="token comment"># \u66F4\u591A\u8BBE\u7F6E\u53EF\u80FD\u9700\u8981\uFF0C\u5982 Docker \u767B\u5F55\u3001GPG \u7B49\u3002\u8FD9\u4E9B\u90FD\u53D6\u51B3\u4E8E\u60A8\u7684\u9700\u6C42\u3002</span>
      - uses: goreleaser/goreleaser-action@v4
        with:
          <span class="token comment"># \u53EF\u4EE5\u9009\u62E9 &#39;goreleaser&#39;\uFF08\u9ED8\u8BA4\uFF09\u6216 &#39;goreleaser-pro&#39;</span>
          distribution: goreleaser
          version: latest
          args: release --rm-dist
        env:
          GITHUB_TOKEN: <span class="token variable">\${{ secrets.GITHUB_TOKEN }</span><span class="token punctuation">}</span>
          <span class="token comment"># \u5982\u679C\u4F60\u6B63\u5728\u4F7F\u7528 &#39;goreleaser-pro&#39; \u53D1\u884C\u7248\uFF0C\u4F60\u9700\u8981 GoReleaser Pro \u7684\u5BC6\u94A5\uFF1A</span>
          <span class="token comment"># GORELEASER_KEY: \${{ secrets.GORELEASER_KEY }}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),qn=s("GoReleaser \u9700\u8981\u4EE5\u4E0B "),Dn={href:"https://docs.github.com/en/actions/reference/authentication-in-a-workflow#permissions-for-the-github_token",target:"_blank",rel:"noopener noreferrer"},Tn=s("\u6743\u9650"),Gn=s("\uFF1A"),Pn=n("div",{class:"language-text ext-text line-numbers-mode"},[n("pre",{class:"language-text"},[n("code",null,`contents: write
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),Sn=n("p",null,"\uFF0C\u5982\u679C\u4F60\u6253\u7B97\uFF1A",-1),jn={href:"https://goreleaser.com/customization/release/",target:"_blank",rel:"noopener noreferrer"},En=s("\u5C06\u6863\u6848\u4E0A\u4F20\u4E3A GitHub Releases"),An=s("\uFF0C\u6216"),Rn=s("\u53D1\u5E03\u5230 "),Cn={href:"https://goreleaser.com/customization/homebrew/",target:"_blank",rel:"noopener noreferrer"},On=s("Homebrew"),In=s(" \u6216 "),Nn={href:"https://goreleaser.com/customization/scoop/",target:"_blank",rel:"noopener noreferrer"},Bn=s("Scoop"),Ln=s("\uFF08\u5047\u8BBE\u5B83\u662F\u540C\u4E00\u5B58\u50A8\u5E93\u7684\u4E00\u90E8\u5206\uFF09"),Mn=n("code",null,"packages: write",-1),Hn=s("\uFF0C\u5982\u679C\u4F60\u6253\u7B97 "),Fn={href:"https://goreleaser.com/customization/docker/",target:"_blank",rel:"noopener noreferrer"},zn=s("\u5C06 Docker \u955C\u50CF\u63A8\u9001\u5230"),Kn=s(" GitHub"),Un=n("code",null,"issues: write",-1),Yn=s("\uFF0C\u5982\u679C\u4F60\u4F7F\u7528\u4E86 "),$n={href:"https://goreleaser.com/customization/milestone/",target:"_blank",rel:"noopener noreferrer"},Vn=s("\u91CC\u7A0B\u7891\u5173\u95ED\u529F\u80FD"),Wn=n("code",null,"GITHUB_TOKEN",-1),Xn=s(" \u6743\u9650 "),Zn={href:"https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token#about-the-github_token-secret",target:"_blank",rel:"noopener noreferrer"},Jn=s("\u53EA\u9650\u4E8E"),Qn=s(" \u5305\u542B\u4F60\u7684\u5DE5\u4F5C\u6D41\u7684\u5B58\u50A8\u5E93\u3002"),ns=t(`<p>\u5982\u679C\u4F60\u9700\u8981\u5C06 Homebrew Tap \u63A8\u9001\u5230\u53E6\u4E00\u4E2A\u5B58\u50A8\u5E93\uFF0C\u90A3\u4E48\u4F60\u5FC5\u987B\u521B\u5EFA\u4E00\u4E2A\u6709\u6743\u8BBF\u95EE\u7684\u4E2A\u4EBA\u8BBF\u95EE\u4EE4\u724C\uFF0C\u5E76\u5C06\u5176\u6DFB\u52A0\u4E3A\u5B58\u50A8\u5E93\u7684\u79D8\u5BC6\u3002\u5982\u679C\u4F60\u521B\u5EFA\u4E86\u4E00\u4E2A\u540D\u4E3A <code>GH_PAT</code> \u7684\u79D8\u5BC6\uFF0C\u90A3\u4E48\u6B65\u9AA4\u5C06\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code>      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run GoReleaser
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> goreleaser/goreleaser<span class="token punctuation">-</span>action@v4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">version</span><span class="token punctuation">:</span> latest
          <span class="token key atrule">args</span><span class="token punctuation">:</span> release <span class="token punctuation">-</span><span class="token punctuation">-</span>rm<span class="token punctuation">-</span>dist
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">GITHUB_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GH_PAT <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B9A\u5236\u5316\u9700\u6C42" tabindex="-1"><a class="header-anchor" href="#\u5B9A\u5236\u5316\u9700\u6C42" aria-hidden="true">#</a> \u5B9A\u5236\u5316\u9700\u6C42</h2><p>GoReleaser \u53EF\u4EE5\u901A\u8FC7\u8C03\u6574<code>.goreleaser.yaml</code>\u6587\u4EF6\u6765\u5B9A\u5236\u3002</p>`,5),ss={href:"https://goreleaser.com/cmd/goreleaser_init/",target:"_blank",rel:"noopener noreferrer"},as=s("goreleaser init"),es=s("\u60A8\u53EF\u4EE5\u901A\u8FC7\u8FD0\u884C\u6216\u4ECE\u5934\u5F00\u59CB\u751F\u6210\u793A\u4F8B\u914D\u7F6E\u3002"),ts=s("\u60A8\u8FD8\u53EF\u4EE5\u901A\u8FC7\u8FD0\u884C\u6765\u68C0\u67E5\u60A8\u7684\u914D\u7F6E\u662F\u5426\u6709\u6548"),os={href:"https://goreleaser.com/cmd/goreleaser_check/",target:"_blank",rel:"noopener noreferrer"},is=s("goreleaser check"),ls=s("\uFF0C\u8FD9\u4F1A\u544A\u8BC9\u60A8\u662F\u5426\u4F7F\u7528\u4E86\u5DF2\u5F03\u7528\u6216\u65E0\u6548\u7684\u9009\u9879\u3002"),ps=n("h3",{id:"\u540D\u79F0\u6A21\u677F",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u540D\u79F0\u6A21\u677F","aria-hidden":"true"},"#"),s(" \u540D\u79F0\u6A21\u677F")],-1),cs=n("thead",null,[n("tr",null,[n("th",null,"\u94A5\u5319"),n("th",null,"\u63CF\u8FF0")])],-1),rs=n("tr",null,[n("td",null,[n("code",null,".ProjectName")]),n("td",null,"\u9879\u76EE\u540D\u79F0")],-1),ds=n("td",null,[n("code",null,".Version")],-1),us=s("\u6B63\u5728\u53D1\u5E03\u7684\u7248\u672C ("),ms={href:"https://goreleaser.com/customization/templates/#fn:version-prefix",target:"_blank",rel:"noopener noreferrer"},vs=s("\u8BE6\u60C5"),ks=s(")"),bs=n("tr",null,[n("td",null,[n("code",null,".Branch")]),n("td",null,"\u5F53\u524D\u7684 git \u5206\u652F")],-1),hs=n("tr",null,[n("td",null,[n("code",null,".PrefixedTag")]),n("td",null,"\u4EE5 monorepo \u914D\u7F6E\u6807\u7B7E\u524D\u7F00\u4E3A\u524D\u7F00\u7684\u5F53\u524D git \u6807\u7B7E\uFF08\u5982\u679C\u6709\uFF09")],-1),gs=n("tr",null,[n("td",null,[n("code",null,".Tag")]),n("td",null,"\u5F53\u524D\u7684 git \u6807\u7B7E")],-1),ys=n("tr",null,[n("td",null,[n("code",null,".PrefixedPreviousTag")]),n("td",null,"\u4E4B\u524D\u7684 git \u6807\u7B7E\u5E26\u6709 monorepo \u914D\u7F6E\u6807\u7B7E\u524D\u7F00\uFF08\u5982\u679C\u6709\uFF09")],-1),fs=n("tr",null,[n("td",null,[n("code",null,".PreviousTag")]),n("td",null,"\u4E4B\u524D\u7684 git \u6807\u7B7E\uFF0C\u5982\u679C\u6CA1\u6709\u4E4B\u524D\u7684\u6807\u7B7E\u5219\u4E3A\u7A7A")],-1),_s=n("tr",null,[n("td",null,[n("code",null,".ShortCommit")]),n("td",null,"git \u63D0\u4EA4\u77ED\u54C8\u5E0C")],-1),ws=n("tr",null,[n("td",null,[n("code",null,".FullCommit")]),n("td",null,"git \u63D0\u4EA4\u5B8C\u6574\u54C8\u5E0C\u503C")],-1),xs=n("tr",null,[n("td",null,[n("code",null,".Commit")]),n("td",null,"git \u63D0\u4EA4\u54C8\u5E0C\uFF08\u5DF2\u5F03\u7528\uFF09")],-1),qs=n("tr",null,[n("td",null,[n("code",null,".CommitDate")]),n("td",null,"RFC 3339 \u683C\u5F0F\u7684 UTC \u63D0\u4EA4\u65E5\u671F")],-1),Ds=n("tr",null,[n("td",null,[n("code",null,".CommitTimestamp")]),n("td",null,"Unix \u683C\u5F0F\u7684 UTC \u63D0\u4EA4\u65E5\u671F")],-1),Ts=n("tr",null,[n("td",null,[n("code",null,".GitURL")]),n("td",null,"git \u8FDC\u7A0B URL")],-1),Gs=n("tr",null,[n("td",null,[n("code",null,".IsGitDirty")]),n("td",null,"\u5F53\u524D git \u72B6\u6001\u662F\u5426\u810F\u3002\u81EA v1.19 \u8D77\u3002")],-1),Ps=n("td",null,[n("code",null,".Major")],-1),Ss=s("\u7248\u672C ("),js={href:"https://goreleaser.com/customization/templates/#fn:tag-is-semver",target:"_blank",rel:"noopener noreferrer"},Es=s("\u8BE6\u60C5"),As=s(")"),Rs=n("td",null,[n("code",null,".Minor")],-1),Cs=s("\u7248\u672C ("),Os={href:"https://goreleaser.com/customization/templates/#fn:tag-is-semver",target:"_blank",rel:"noopener noreferrer"},Is=s("\u8BE6\u60C5"),Ns=s(")"),Bs=n("td",null,[n("code",null,".Patch")],-1),Ls=s("\u8865\u4E01\u90E8\u5206 ("),Ms={href:"https://goreleaser.com/customization/templates/#fn:tag-is-semver",target:"_blank",rel:"noopener noreferrer"},Hs=s("\u8BE6\u60C5"),Fs=s(")"),zs=n("td",null,[n("code",null,".Prerelease")],-1),Ks=s("\u7248\u672C\u7684\u9884\u53D1\u884C\u90E8\u5206\uFF0C\u4F8B\u5982beta ("),Us={href:"https://goreleaser.com/customization/templates/#fn:tag-is-semver",target:"_blank",rel:"noopener noreferrer"},Ys=s("\u8BE6\u60C5"),$s=s(")"),Vs=n("td",null,[n("code",null,".RawVersion")],-1),Ws=s("\u7EC4\u6210 "),Xs=n("code",null,"{Major}.{Minor}.{Patch}",-1),Zs=s(" ("),Js={href:"https://goreleaser.com/customization/templates/#fn:tag-is-semver",target:"_blank",rel:"noopener noreferrer"},Qs=s("\u8BE6\u60C5"),na=s(")"),sa=n("tr",null,[n("td",null,[n("code",null,".ReleaseNotes")]),n("td",null,"\u751F\u6210\u7684\u53D1\u884C\u8BF4\u660E\uFF0C\u5728\u6267\u884C\u53D8\u66F4\u65E5\u5FD7\u6B65\u9AA4\u540E\u53EF\u7528")],-1),aa=n("tr",null,[n("td",null,[n("code",null,".IsDraft")]),n("td",null,[s("true if "),n("code",null,"release.draft"),s(" \u5728\u914D\u7F6E\u4E2D\u8BBE\u7F6E\uFF0Cfalse\u5426\u5219\u3002\u81EA v1.17 \u8D77\u3002")])],-1),ea=n("tr",null,[n("td",null,[n("code",null,".IsSnapshot")]),n("td",null,[s("true \u5982\u679C "),n("code",null,"--snapshot"),s(" \u5DF2\u8BBE\u7F6E\uFF0Cfalse\u5426\u5219")])],-1),ta=n("tr",null,[n("td",null,[n("code",null,".IsNightly")]),n("td",null,[s("true \u5982\u679C "),n("code",null,"--nightly"),s(" \u5DF2\u8BBE\u7F6E\uFF0Cfalse\u5426\u5219")])],-1),oa=n("tr",null,[n("td",null,[n("code",null,".Env")]),n("td",null,"\u5305\u542B\u7CFB\u7EDF\u73AF\u5883\u53D8\u91CF\u7684\u6620\u5C04")],-1),ia=n("tr",null,[n("td",null,[n("code",null,".Date")]),n("td",null,"RFC 3339 \u683C\u5F0F\u7684\u5F53\u524D UTC \u65E5\u671F")],-1),la=n("tr",null,[n("td",null,[n("code",null,".Now")]),n("td",null,[s("\u5F53\u524D UTC \u65E5\u671F\u4F5C\u4E3A "),n("code",null,"time.Time"),s(" \u7ED3\u6784\uFF0C\u5141\u8BB8\u6240\u6709 "),n("code",null,"time.Time"),s(" \u529F\u80FD\uFF08\u4F8B\u5982 "),n("code",null,'{{ .Now.Format "2006" }}'),s(" \uFF09\u3002\u81EA v1.17 \u8D77\u3002")])],-1),pa=n("tr",null,[n("td",null,[n("code",null,".Timestamp")]),n("td",null,"Unix \u683C\u5F0F\u7684\u5F53\u524D UTC \u65F6\u95F4")],-1),ca=n("tr",null,[n("td",null,[n("code",null,".ModulePath")]),n("td",null,[s("go \u6A21\u5757\u8DEF\u5F84\uFF0C\u5982\u62A5\u544A\u6240\u793A "),n("code",null,"go list -m")])],-1),ra=n("td",null,[n("code",null,'incpatch "v1.2.4"')],-1),da=s("\u8865\u4E01 ("),ua={href:"https://goreleaser.com/customization/templates/#fn:panic-if-not-semver",target:"_blank",rel:"noopener noreferrer"},ma=s("\u8BE6\u60C5"),va=s(")"),ka=n("td",null,[n("code",null,'incminor "v1.2.4"')],-1),ba=s("\u6B21\u8981\u7248\u672C ("),ha={href:"https://goreleaser.com/customization/templates/#fn:panic-if-not-semver",target:"_blank",rel:"noopener noreferrer"},ga=s("\u8BE6\u60C5"),ya=s(")"),fa=n("td",null,[n("code",null,'incmajor "v1.2.4"')],-1),_a=s("\u589E\u52A0\u7ED9\u5B9A\u7248\u672C ("),wa={href:"https://goreleaser.com/customization/templates/#fn:panic-if-not-semver",target:"_blank",rel:"noopener noreferrer"},xa=s("\u8BE6\u60C5"),qa=s(")"),Da=n("td",null,[n("code",null,".ReleaseURL")],-1),Ta=s("\u5F53\u524D\u7248\u672C\u4E0B\u8F7D\u5730\u5740 ("),Ga={href:"https://goreleaser.com/customization/templates/#fn:scm-release-url",target:"_blank",rel:"noopener noreferrer"},Pa=s("\u8BE6\u60C5"),Sa=s(")"),ja=n("td",null,[n("code",null,".Summary")],-1),Ea=s("git \u6458\u8981\uFF0C\u4F8B\u5982 "),Aa=n("code",null,"v1.0.0-10-g34f56g3",-1),Ra=s(" ("),Ca={href:"https://goreleaser.com/customization/templates/#fn:git-summary",target:"_blank",rel:"noopener noreferrer"},Oa=s("\u8BE6\u60C5"),Ia=s(")"),Na=n("tr",null,[n("td",null,[n("code",null,".PrefixedSummary")]),n("td",null,"\u4EE5 monorepo \u914D\u7F6E\u6807\u7B7E\u524D\u7F00\u4E3A\u524D\u7F00\u7684 git \u6458\u8981\uFF08\u5982\u679C\u6709\uFF09")],-1),Ba=n("td",null,[n("code",null,".TagSubject")],-1),La=s("\u5E26\u6CE8\u91CA\u7684\u6807\u7B7E\u6D88\u606F\u4E3B\u9898\uFF0C\u6216\u8005\u5B83\u6307\u51FA\u7684\u63D0\u4EA4\u7684\u6D88\u606F\u4E3B\u9898 ("),Ma={href:"https://goreleaser.com/customization/templates/#fn:git-tag-subject",target:"_blank",rel:"noopener noreferrer"},Ha=s("\u8BE6\u60C5"),Fa=s(")\u3002\u4ECE v1.2 \u5F00\u59CB\u3002"),za=n("td",null,[n("code",null,".TagContents")],-1),Ka=s("\u5E26\u6CE8\u91CA\u7684\u6807\u7B7E\u6D88\u606F\uFF0C\u6216\u8005\u5B83\u6307\u51FA\u7684\u63D0\u4EA4\u6D88\u606F ("),Ua={href:"https://goreleaser.com/customization/templates/#fn:git-tag-body",target:"_blank",rel:"noopener noreferrer"},Ya=s("\u8BE6\u60C5"),$a=s(") . \u4ECE v1.2 \u5F00\u59CB\u3002"),Va=n("td",null,[n("code",null,".TagBody")],-1),Wa=s("\u5E26\u6CE8\u91CA\u7684\u6807\u7B7E\u6D88\u606F\u6B63\u6587\uFF0C\u6216\u5176\u6307\u51FA\u7684\u63D0\u4EA4\u7684\u6D88\u606F\u6B63\u6587 ("),Xa={href:"https://goreleaser.com/customization/templates/#fn:git-tag-body",target:"_blank",rel:"noopener noreferrer"},Za=s("\u8BE6\u60C5"),Ja=s(")\u3002\u4ECE v1.2 \u5F00\u59CB\u3002"),Qa=n("tr",null,[n("td",null,[n("code",null,".Runtime.Goos")]),n("td",null,[s("\u76F8\u5F53\u4E8E "),n("code",null,"runtime.GOOS"),s(". \u4ECE v1.5 \u5F00\u59CB\u3002")])],-1),ne=n("tr",null,[n("td",null,[n("code",null,".Runtime.Goarch")]),n("td",null,[s("\u76F8\u5F53\u4E8E "),n("code",null,"runtime.GOARCH"),s(". \u4ECE v1.5 \u5F00\u59CB\u3002")])],-1),se=n("tr",null,[n("td",null,[n("code",null,".Artifacts")]),n("td",null,"\u5F53\u524D\u5DE5\u4EF6\u5217\u8868\u3002\u5B57\u6BB5\u89C1\u4E0B\u8868\u3002\u81EA v1.16-pro \u8D77\u3002")],-1),ae=t(`<h3 id="\u914D\u7F6E\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u9009\u9879" aria-hidden="true">#</a> \u914D\u7F6E\u9009\u9879</h3><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># Default: &#39;./dist&#39;</span>
<span class="token key atrule">dist</span><span class="token punctuation">:</span> _output/dist

<span class="token key atrule">git</span><span class="token punctuation">:</span>
  <span class="token comment"># What should be used to sort tags when gathering the current and previous</span>
  <span class="token comment"># tags if there are more than one tag in the same commit.</span>
  <span class="token comment">#</span>
  <span class="token comment"># Default: &#39;-version:refname&#39;</span>
  <span class="token key atrule">tag_sort</span><span class="token punctuation">:</span> <span class="token punctuation">-</span>version<span class="token punctuation">:</span>creatordate

  <span class="token comment"># What should be used to specify prerelease suffix while sorting tags when gathering</span>
  <span class="token comment"># the current and previous tags if there are more than one tag in the same commit.</span>
  <span class="token comment">#</span>
  <span class="token comment"># Since: v1.17</span>
  <span class="token key atrule">prerelease_suffix</span><span class="token punctuation">:</span> <span class="token string">&quot;-&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6784\u5EFA\u9009\u9879" tabindex="-1"><a class="header-anchor" href="#\u6784\u5EFA\u9009\u9879" aria-hidden="true">#</a> \u6784\u5EFA\u9009\u9879</h3><p>\u53EF\u4EE5\u901A\u8FC7\u591A\u79CD\u65B9\u5F0F\u5B9A\u5236\u6784\u5EFA\u3002\u60A8\u53EF\u4EE5\u6307\u5B9A\u6784\u5EFA\u54EA\u4E9B<code>GOOS</code>,<code>GOARCH</code>\u548C<code>GOARM</code>\u4E8C\u8FDB\u5236\u6587\u4EF6\uFF08GoReleaser \u5C06\u751F\u6210\u6240\u6709\u7EC4\u5408\u7684\u77E9\u9635\uFF09\uFF0C\u5E76\u4E14\u60A8\u53EF\u4EE5\u66F4\u6539\u4E8C\u8FDB\u5236\u6587\u4EF6\u7684\u540D\u79F0\u3001\u6807\u5FD7\u3001\u73AF\u5883\u53D8\u91CF\u3001\u6302\u94A9\u7B49\u3002</p><p><strong>builds \u662F\u914D\u7F6E\u6587\u4EF6\u4E2D\u6700\u91CD\u8981\u7684\u4E00\u4E2A\u9009\u9879\uFF1A</strong></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">builds</span><span class="token punctuation">:</span>
  <span class="token comment"># You can have multiple builds defined as a yaml list</span>
  <span class="token punctuation">-</span> <span class="token comment">#</span>
    <span class="token comment"># ID of the build.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: Binary name</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">&quot;my-build&quot;</span>

    <span class="token comment"># Path to main.go file or main package.</span>
    <span class="token comment"># Notice: when used with \`gomod.proxy\`, this must be a package.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default is \`.\`.</span>
    <span class="token key atrule">main</span><span class="token punctuation">:</span> ./cmd/my<span class="token punctuation">-</span>app

    <span class="token comment"># Binary name.</span>
    <span class="token comment"># Can be a path (e.g. \`bin/app\`) to wrap the binary in a directory.</span>
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
    <span class="token comment"># Default: &#39;-s -w -X main.version={{.Version}} -X main.commit={{.Commit}} -X main.date={{.Date}} -X main.builtBy=goreleaser&#39;</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">ldflags</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token punctuation">-</span>s <span class="token punctuation">-</span>w <span class="token punctuation">-</span>X main.build=<span class="token punctuation">{</span><span class="token punctuation">{</span>.Version<span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">-</span> ./usemsan=<span class="token punctuation">-</span>msan

    <span class="token comment"># Custom Go build mode.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Valid options:</span>
    <span class="token comment"># - \`c-shared\`</span>
    <span class="token comment"># - \`c-archive\`</span>
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
      <span class="token punctuation">-</span> <span class="token punctuation">&gt;</span><span class="token punctuation">-</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if eq .Os &quot;darwin&quot; <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if eq .Arch &quot;amd64&quot;<span class="token punctuation">}</span><span class="token punctuation">}</span>CC=o64<span class="token punctuation">-</span>clang<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if eq .Arch &quot;arm64&quot;<span class="token punctuation">}</span><span class="token punctuation">}</span>CC=aarch64<span class="token punctuation">-</span>apple<span class="token punctuation">-</span>darwin20.2<span class="token punctuation">-</span>clang<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if eq .Os &quot;windows&quot; <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> if eq .Arch &quot;amd64&quot; <span class="token punctuation">}</span><span class="token punctuation">}</span>CC=x86_64<span class="token punctuation">-</span>w64<span class="token punctuation">-</span>mingw32<span class="token punctuation">-</span>gcc<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">-</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>

    <span class="token comment"># GOOS list to build for.</span>
    <span class="token comment"># For more info refer to: https://golang.org/doc/install/source#environment</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: [ &#39;darwin&#39;, &#39;linux&#39;, &#39;windows&#39; ]</span>
    <span class="token key atrule">goos</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> freebsd
      <span class="token punctuation">-</span> windows

    <span class="token comment"># GOARCH to build for.</span>
    <span class="token comment"># For more info refer to: https://golang.org/doc/install/source#environment</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: [ &#39;386&#39;, &#39;amd64&#39;, &#39;arm64&#39; ]</span>
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
    <span class="token comment"># Default: [ &#39;v1&#39; ]</span>
    <span class="token key atrule">goamd64</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> v2
      <span class="token punctuation">-</span> v3

    <span class="token comment"># GOMIPS and GOMIPS64 to build when GOARCH is mips, mips64, mipsle or mips64le.</span>
    <span class="token comment"># For more info refer to: https://golang.org/doc/install/source#environment</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: [ &#39;hardfloat&#39; ]</span>
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
    <span class="token comment"># Format is \`{goos}_{goarch}\` with their respective suffixes when</span>
    <span class="token comment"># applicable: \`_{goarm}\`, \`_{goamd64}\`, \`_{gomips}\`.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Special values:</span>
    <span class="token comment"># - go_118_first_class: evaluates to the first-class ports of go1.18.</span>
    <span class="token comment"># - go_first_class: evaluates to latest stable go first-class ports,</span>
    <span class="token comment">#   currently same as 1.18.</span>
    <span class="token comment">#</span>
    <span class="token comment"># This overrides \`goos\`, \`goarch\`, \`goarm\`, \`gomips\`, \`goamd64\` and</span>
    <span class="token comment"># \`ignores\`.</span>
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
    <span class="token comment"># Default is &quot;go&quot;</span>
    <span class="token key atrule">gobinary</span><span class="token punctuation">:</span> <span class="token string">&quot;go1.13.4&quot;</span>

    <span class="token comment"># Sets the command to run to build.</span>
    <span class="token comment"># Can be useful if you want to build tests, for example,</span>
    <span class="token comment"># in which case you can set this to &quot;test&quot;.</span>
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
    <span class="token key atrule">mod_timestamp</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ .CommitTimestamp }}&quot;</span>

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
    <span class="token comment"># \`dist/\${BuildID}_\${BuildTarget}\`, which is a unique directory per build</span>
    <span class="token comment"># target in the matrix.</span>
    <span class="token comment"># You can set subdirs within that folder using the \`binary\` property.</span>
    <span class="token comment">#</span>
    <span class="token comment"># However, if for some reason you don&#39;t want that unique directory to be</span>
    <span class="token comment"># created, you can set this property.</span>
    <span class="token comment"># If you do, you are responsible for keeping different builds from</span>
    <span class="token comment"># overriding each other.</span>
    <span class="token key atrule">no_unique_dist_dir</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># By default, GoReleaser will check if the main filepath has a main</span>
    <span class="token comment"># function.</span>
    <span class="token comment"># This can be used to skip that check, in case you&#39;re building tests, for</span>
    <span class="token comment"># example.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.9</span>
    <span class="token key atrule">no_main_check</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># Path to project&#39;s (sub)directory containing Go code.</span>
    <span class="token comment"># This is the working directory for the Go build command(s).</span>
    <span class="token comment"># If dir does not contain a \`go.mod\` file, and you are using \`gomod.proxy\`,</span>
    <span class="token comment"># produced binaries will be invalid.</span>
    <span class="token comment"># You would likely want to use \`main\` instead of this.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: &#39;.&#39;</span>
    <span class="token key atrule">dir</span><span class="token punctuation">:</span> go

    <span class="token comment"># Builder allows you to use a different build implementation.</span>
    <span class="token comment"># This is a GoReleaser Pro feature.</span>
    <span class="token comment"># Valid options are: \`go\` and \`prebuilt\`.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: &#39;go&#39;</span>
    <span class="token key atrule">builder</span><span class="token punctuation">:</span> prebuilt

    <span class="token comment"># Overrides allows to override some fields for specific targets.</span>
    <span class="token comment"># This can be specially useful when using CGO.</span>
    <span class="token comment"># Note: it&#39;ll only match if the full target matches.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.5</span>
    <span class="token key atrule">overrides</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">goos</span><span class="token punctuation">:</span> darwin
        <span class="token key atrule">goarch</span><span class="token punctuation">:</span> arm64
        <span class="token key atrule">goamd64</span><span class="token punctuation">:</span> v1
        <span class="token key atrule">goarm</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
        <span class="token key atrule">gomips</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u5305\u542B\u591A\u4E2A\u4E8C\u8FDB\u5236\u6587\u4EF6\u7684\u6784\u5EFA\uFF1A</strong></p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">builds</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">main</span><span class="token punctuation">:</span> ./cmd/cli
    <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">&quot;cli&quot;</span>
    <span class="token key atrule">binary</span><span class="token punctuation">:</span> cli
    <span class="token key atrule">goos</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> linux
      <span class="token punctuation">-</span> darwin
      <span class="token punctuation">-</span> windows

  <span class="token punctuation">-</span> <span class="token key atrule">main</span><span class="token punctuation">:</span> ./cmd/worker
    <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">&quot;worker&quot;</span>
    <span class="token key atrule">binary</span><span class="token punctuation">:</span> worker
    <span class="token key atrule">goos</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> linux
      <span class="token punctuation">-</span> darwin
      <span class="token punctuation">-</span> windows

  <span class="token punctuation">-</span> <span class="token key atrule">main</span><span class="token punctuation">:</span> ./cmd/tracker
    <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">&quot;tracker&quot;</span>
    <span class="token key atrule">binary</span><span class="token punctuation">:</span> tracker
    <span class="token key atrule">goos</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> linux
      <span class="token punctuation">-</span> darwin
      <span class="token punctuation">-</span> windows
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,8),ee=s("\u4E8C\u8FDB\u5236\u540D\u79F0\u5B57\u6BB5\u652F\u6301"),te={href:"https://goreleaser.com/customization/templates/",target:"_blank",rel:"noopener noreferrer"},oe=s("\u6A21\u677F\u5316"),ie=s("\u3002\u516C\u5F00\u4E86\u4EE5\u4E0B\u6784\u5EFA\u8BE6\u7EC6\u4FE1\u606F\uFF1A"),le=t(`<table><thead><tr><th>Key</th><th>Description</th></tr></thead><tbody><tr><td>.Os</td><td>GOOS</td></tr><tr><td>.Arch</td><td>GOARCH</td></tr><tr><td>.Arm</td><td>GOARM</td></tr><tr><td>.Ext</td><td>Extension, e.g. .exe</td></tr><tr><td>.Target</td><td>Build target, e.g. darwin_amd64</td></tr></tbody></table><p>\u60A8\u53EF\u4EE5\u901A\u8FC7<code>{{ .Env.VARIABLE_NAME }}</code>\u5728\u6A21\u677F\u4E2D\u4F7F\u7528\u6765\u505A\u5230\u8FD9\u4E00\u70B9\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">builds</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">ldflags</span><span class="token punctuation">:</span>
   <span class="token punctuation">-</span> <span class="token punctuation">-</span>s <span class="token punctuation">-</span>w <span class="token punctuation">-</span>X &quot;main.goversion=<span class="token punctuation">{</span><span class="token punctuation">{</span>.Env.GOVERSION<span class="token punctuation">}</span><span class="token punctuation">}</span>&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u4F60\u53EF\u4EE5\u8FD0\u884C\uFF1A</p><p><code>GOVERSION=$(go version) goreleaser</code></p><h2 id="build-hooks" tabindex="-1"><a class="header-anchor" href="#build-hooks" aria-hidden="true">#</a> build hooks</h2><p>pre \u548C post \u6302\u94A9\u90FD <strong>\u9488\u5BF9\u6BCF\u4E2A\u6784\u5EFA\u76EE\u6807</strong> \u8FD0\u884C\uFF0C\u65E0\u8BBA\u8FD9\u4E9B\u76EE\u6807\u662F\u901A\u8FC7\u64CD\u4F5C\u7CFB\u7EDF\u548C\u67B6\u6784\u77E9\u9635\u751F\u6210\u8FD8\u662F\u663E\u5F0F\u5B9A\u4E49\u3002</p><p>\u9664\u4E86\u4E0A\u9762\u6240\u793A\u7684\u7B80\u5355\u58F0\u660E\u4E4B\u5916\uFF0C\u8FD8\u53EF\u4EE5\u58F0\u660E\u591A\u4E2A\u6302\u94A9\uFF0C\u4EE5\u5E2E\u52A9\u4FDD\u6301\u4E0D\u540C\u6784\u5EFA\u73AF\u5883\u4E4B\u95F4\u914D\u7F6E\u7684\u53EF\u91CD\u7528\u6027\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">builds</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">&quot;with-hooks&quot;</span>
    <span class="token key atrule">targets</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;darwin_amd64&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;windows_amd64&quot;</span>
    <span class="token key atrule">hooks</span><span class="token punctuation">:</span>
      <span class="token key atrule">pre</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> first<span class="token punctuation">-</span>script.sh
        <span class="token punctuation">-</span> second<span class="token punctuation">-</span>script.sh
      <span class="token key atrule">post</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> upx &quot;<span class="token punctuation">{</span><span class="token punctuation">{</span> .Path <span class="token punctuation">}</span><span class="token punctuation">}</span>&quot;
        <span class="token punctuation">-</span> codesign <span class="token punctuation">-</span>project=&quot;<span class="token punctuation">{</span><span class="token punctuation">{</span> .ProjectName <span class="token punctuation">}</span><span class="token punctuation">}</span>&quot; &quot;<span class="token punctuation">{</span><span class="token punctuation">{</span> .Path <span class="token punctuation">}</span><span class="token punctuation">}</span>&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6BCF\u4E2A\u94A9\u5B50\u8FD8\u53EF\u4EE5\u6709\u81EA\u5DF1\u7684\u5DE5\u4F5C\u76EE\u5F55\u548C\u73AF\u5883\u53D8\u91CF\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">builds</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">id</span><span class="token punctuation">:</span> <span class="token string">&quot;with-hooks&quot;</span>
    <span class="token key atrule">targets</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;darwin_amd64&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;windows_amd64&quot;</span>
    <span class="token key atrule">hooks</span><span class="token punctuation">:</span>
      <span class="token key atrule">pre</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">cmd</span><span class="token punctuation">:</span> first<span class="token punctuation">-</span>script.sh
          <span class="token key atrule">dir</span><span class="token punctuation">:</span>
            <span class="token string">&quot;{{ dir .Dist}}&quot;</span>
            <span class="token comment"># Always print command output, otherwise only visible in debug mode.</span>
            <span class="token comment"># Since: v1.5</span>
          <span class="token key atrule">output</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> HOOK_SPECIFIC_VAR=<span class="token punctuation">{</span><span class="token punctuation">{</span> .Env.GLOBAL_VAR <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token punctuation">-</span> second<span class="token punctuation">-</span>script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),pe=s("\u94A9\u5B50\u7684\u6240\u6709\u5C5E\u6027\uFF08"),ce=n("code",null,"cmd",-1),re=s("\u3001"),de=n("code",null,"dir",-1),ue=s("\u548C"),me=n("code",null,"env",-1),ve=s("\uFF09\u90FD\u652F\u6301\u4F7F\u7528\u5177\u6709\u53EF\u7528\u4E8C\u8FDB\u5236\u5DE5\u4EF6\u7684\u94A9\u5B50"),ke={href:"https://goreleaser.com/customization/templates/",target:"_blank",rel:"noopener noreferrer"},be=s("\u8FDB\u884C\u6A21\u677F\u5316"),he=s("\uFF08\u56E0\u4E3A\u5B83\u4EEC\u5728\u6784\u5EFA*\u540E\u8FD0\u884C\uFF09\u3002*\u6B64\u5916\uFF0C\u4EE5\u4E0B\u6784\u5EFA\u8BE6\u7EC6\u4FE1\u606F\u4E5F\u4F1A\u66B4\u9732\u7ED9\u548C\u94A9\u5B50\uFF1A"),ge=n("code",null,"postprepost",-1),ye=t('<table><thead><tr><th>Key</th><th>Description</th></tr></thead><tbody><tr><td>.Name</td><td>Filename of the binary, e.g.\xA0bin.exe</td></tr><tr><td>.Ext</td><td>Extension, e.g.\xA0.exe</td></tr><tr><td>.Path</td><td>Absolute path to the binary</td></tr><tr><td>.Target</td><td>Build target, e.g.\xA0darwin_amd64</td></tr></tbody></table><p>\u73AF\u5883\u53D8\u91CF\u6309\u4EE5\u4E0B\u987A\u5E8F\u7EE7\u627F\u548C\u8986\u76D6\uFF1A</p><ul><li>\u5168\u5C40 ( <code>env</code>)</li><li>\u6784\u5EFA ( <code>builds[].env</code>)</li><li>\u94A9\u5B50 (<code>builds[].hooks.pre[].env</code>\u548C<code>builds[].hooks.post[].env</code>)</li></ul><h3 id="\u6A21\u5757" tabindex="-1"><a class="header-anchor" href="#\u6A21\u5757" aria-hidden="true">#</a> \u6A21\u5757</h3><p>\u5982\u679C\u60A8\u4F7F\u7528\u5E26\u6709 go \u6A21\u5757\u6216 vgo \u7684 Go 1.11+\uFF0C\u5F53 GoReleaser \u8FD0\u884C\u65F6\uFF0C\u5B83\u53EF\u80FD\u4F1A\u5C1D\u8BD5\u4E0B\u8F7D\u4F9D\u8D56\u9879\u3002\u7531\u4E8E\u591A\u4E2A\u6784\u5EFA\u5E76\u884C\u8FD0\u884C\uFF0C\u56E0\u6B64\u5F88\u53EF\u80FD\u4F1A\u5931\u8D25\u3002</p>',5),fe=s("\u60A8\u53EF\u4EE5\u901A\u8FC7"),_e=n("code",null,"go mod tidy",-1),we=s("\u5728\u8C03\u7528\u4E4B\u524D\u8FD0\u884C"),xe=n("code",null,"goreleaser",-1),qe=s("\u6216\u6DFB\u52A0\u4E00\u4E2A\u5728\u6587\u4EF6\u4E0A\u6267\u884C\u6B64\u64CD\u4F5C\u7684"),De={href:"https://goreleaser.com/customization/hooks",target:"_blank",rel:"noopener noreferrer"},Te=s("\u6302\u94A9"),Ge=n("code",null,".goreleaser.yaml",-1),Pe=s("\u6765\u89E3\u51B3\u6B64\u95EE\u9898\uFF1A"),Se=t(`<div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">before</span><span class="token punctuation">:</span>
  <span class="token key atrule">hooks</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> go mod tidy
<span class="token comment"># rest of the file...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="archives" tabindex="-1"><a class="header-anchor" href="#archives" aria-hidden="true">#</a> archives</h2><p><code>README</code>\u6784\u5EFA\u7684\u4E8C\u8FDB\u5236\u6587\u4EF6\u5C06\u4E0E\u548C\u6587\u4EF6\u4E00\u8D77\u5F52\u6863<code>LICENSE</code>\u5230\u4E00\u4E2A<code>tar.gz</code>\u6587\u4EF6\u4E2D\u3002\u5728\u6B64<code>archives</code>\u90E8\u5206\u4E2D\uFF0C\u60A8\u53EF\u4EE5\u81EA\u5B9A\u4E49\u5B58\u6863\u540D\u79F0\u3001\u5176\u4ED6\u6587\u4EF6\u548C\u683C\u5F0F\u3002</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># .goreleaser.yaml</span>
<span class="token key atrule">archives</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token comment">#</span>
    <span class="token comment"># ID of this archive.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: &#39;default&#39;</span>
    <span class="token key atrule">id</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>archive

    <span class="token comment"># Builds reference which build instances should be archived in this archive.</span>
    <span class="token key atrule">builds</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> default

    <span class="token comment"># Archive format. Valid options are \`tar.gz\`, \`tgz\`, \`tar.xz\`, \`txz\`, tar\`, \`gz\`, \`zip\` and \`binary\`.</span>
    <span class="token comment"># If format is \`binary\`, no archives are created and the binaries are instead</span>
    <span class="token comment"># uploaded directly.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: &#39;tar.gz&#39;</span>
    <span class="token key atrule">format</span><span class="token punctuation">:</span> zip

    <span class="token comment"># This will create an archive without any binaries, only the files are there.</span>
    <span class="token comment"># The name template must not contain any references to \`Os\`, \`Arch\` and etc, since the archive will be meta.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Since: v1.9</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">meta</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

    <span class="token comment"># Archive name.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default:</span>
    <span class="token comment"># - if format is \`binary\`:</span>
    <span class="token comment">#   - \`{{ .Binary }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ with .Arm }}v{{ . }}{{ end }}{{ with .Mips }}_{{ . }}{{ end }}{{ if not (eq .Amd64 &quot;v1&quot;) }}{{ .Amd64 }}{{ end }}\`</span>
    <span class="token comment"># - if format is anything else:</span>
    <span class="token comment">#   - \`{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ with .Arm }}v{{ . }}{{ end }}{{ with .Mips }}_{{ . }}{{ end }}{{ if not (eq .Amd64 &quot;v1&quot;) }}{{ .Amd64 }}{{ end }}\`</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">name_template</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ .ProjectName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}&quot;</span>

    <span class="token comment"># Sets the given file info to all the binaries included from the \`builds\`.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: copied from the source binary.</span>
    <span class="token comment"># Since: v1.14</span>
    <span class="token key atrule">builds_info</span><span class="token punctuation">:</span>
      <span class="token key atrule">group</span><span class="token punctuation">:</span> root
      <span class="token key atrule">owner</span><span class="token punctuation">:</span> root
      <span class="token key atrule">mode</span><span class="token punctuation">:</span> <span class="token number">0644</span>
      <span class="token comment"># format is \`time.RFC3339Nano\`</span>
      <span class="token key atrule">mtime</span><span class="token punctuation">:</span> <span class="token datetime number">2008-01-02T15:04:05Z</span>

    <span class="token comment"># Set this to true if you want all files in the archive to be in a single directory.</span>
    <span class="token comment"># If set to true and you extract the archive &#39;goreleaser_Linux_arm64.tar.gz&#39;,</span>
    <span class="token comment"># you&#39;ll get a folder &#39;goreleaser_Linux_arm64&#39;.</span>
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
    <span class="token comment"># Enabling this essentially mimic the behavior of nfpm&#39;s contents section.</span>
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
    <span class="token comment"># Default: [ &#39;LICENSE*&#39;, &#39;README*&#39;, &#39;CHANGELOG&#39;, &#39;license*&#39;, &#39;readme*&#39;, &#39;changelog&#39;]</span>
    <span class="token comment"># Templates: allowed</span>
    <span class="token key atrule">files</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> LICENSE.txt
      <span class="token punctuation">-</span> README_<span class="token punctuation">{</span><span class="token punctuation">{</span>.Os<span class="token punctuation">}</span><span class="token punctuation">}</span>.md
      <span class="token punctuation">-</span> CHANGELOG.md
      <span class="token punctuation">-</span> docs/*
      <span class="token punctuation">-</span> design/<span class="token important">*.png</span>
      <span class="token punctuation">-</span> templates/<span class="token important">**/*</span>
      <span class="token comment"># a more complete example, check the globbing deep dive below</span>
      <span class="token punctuation">-</span> <span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;*.md&quot;</span>
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
          <span class="token key atrule">mtime</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ .CommitDate }}&quot;</span>

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
      <span class="token punctuation">-</span> <span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">&quot;LICENSE.md.tpl&quot;</span>
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
          <span class="token key atrule">mtime</span><span class="token punctuation">:</span> <span class="token string">&quot;{{ .CommitDate }}&quot;</span>

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
            <span class="token punctuation">-</span> <span class="token string">&quot;FILE_TO_TOUCH=something-{{ .ProjectName }}&quot;</span> <span class="token comment"># specify hook level environment variables</span>

      <span class="token key atrule">after</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> make clean
        <span class="token punctuation">-</span> <span class="token key atrule">cmd</span><span class="token punctuation">:</span> cat <span class="token important">*.yaml</span>
          <span class="token key atrule">dir</span><span class="token punctuation">:</span> ./submodule
        <span class="token punctuation">-</span> <span class="token key atrule">cmd</span><span class="token punctuation">:</span> touch <span class="token punctuation">{</span><span class="token punctuation">{</span> .Env.RELEASE_DONE <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token punctuation">-</span> <span class="token string">&quot;RELEASE_DONE=something-{{ .ProjectName }}&quot;</span> <span class="token comment"># specify hook level environment variables</span>

    <span class="token comment"># Disables the binary count check.</span>
    <span class="token key atrule">allow_different_binary_count</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="linux-\u8F6F\u4EF6\u5305" tabindex="-1"><a class="header-anchor" href="#linux-\u8F6F\u4EF6\u5305" aria-hidden="true">#</a> linux \u8F6F\u4EF6\u5305</h2>`,5),je=s("GoReleaser \u53EF\u4EE5\u8FDE\u63A5\u5230"),Ee={href:"https://github.com/goreleaser/nfpm",target:"_blank",rel:"noopener noreferrer"},Ae=s("nfpm"),Re=s("\u4EE5\u751F\u6210\u548C\u53D1\u5E03 "),Ce=n("code",null,".deb",-1),Oe=s("\u3001"),Ie=n("code",null,".rpm",-1),Ne=s("\u3001"),Be=n("code",null,".apk",-1),Le=s(" \u548C "),Me=n("code",null,"Archlinux",-1),He=s(" \u8F6F\u4EF6\u5305\u3002"),Fe=t(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># .goreleaser.yaml</span>
nfpms:
  <span class="token comment"># note that this is an array of nfpm configs</span>
  - <span class="token comment">#</span>
    <span class="token comment"># ID of the nfpm config, must be unique.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: &#39;default&#39;</span>
    id: foo

    <span class="token comment"># Name of the package.</span>
    <span class="token comment"># Default: ProjectName</span>
    <span class="token comment"># Templates: allowed (since v1.18)</span>
    package_name: foo

    <span class="token comment"># You can change the file name of the package.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: &#39;{{ .PackageName }}_{{ .Version }}_{{ .Os }}_{{ .Arch }}{{ with .Arm }}v{{ . }}{{ end }}{{ with .Mips }}_{{ . }}{{ end }}{{ if not (eq .Amd64 &quot;v1&quot;) }}{{ .Amd64 }}{{ end }}&#39;</span>
    <span class="token comment"># Templates: allowed</span>
    file_name_template: <span class="token string">&quot;{{ .ConventionalFileName }}&quot;</span>

    <span class="token comment"># Build IDs for the builds you want to create NFPM packages for.</span>
    <span class="token comment"># Defaults empty, which means no filtering.</span>
    builds:
      - foo
      - bar

    <span class="token comment"># Your app&#39;s vendor.</span>
    vendor: Drum Roll Inc.

    <span class="token comment"># Your app&#39;s homepage.</span>
    homepage: https://example.com/

    <span class="token comment"># Your app&#39;s maintainer (probably you).</span>
    maintainer: Drummer <span class="token operator">&lt;</span>drum-roll@example.com<span class="token operator">&gt;</span>

    <span class="token comment"># Your app&#39;s description.</span>
    description: <span class="token operator">|</span>-
      Drum rolls installer package.
      Software to create fast and easy drum rolls.

    <span class="token comment"># Your app&#39;s license.</span>
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
    <span class="token comment"># Default: &#39;/usr/bin&#39;</span>
    bindir: /usr/bin

    <span class="token comment"># Version Epoch.</span>
    <span class="token comment"># Default: extracted from \`version\` if it is semver compatible</span>
    epoch: <span class="token number">2</span>

    <span class="token comment"># Version Prerelease.</span>
    <span class="token comment"># Default: extracted from \`version\` if it is semver compatible</span>
    prerelease: beta1

    <span class="token comment"># Version Metadata (previously deb.metadata).</span>
    <span class="token comment"># Setting metadata might interfere with version comparisons depending on the</span>
    <span class="token comment"># packager.</span>
    <span class="token comment">#</span>
    <span class="token comment"># Default: extracted from \`version\` if it is semver compatible</span>
    version_metadata: <span class="token function">git</span>

    <span class="token comment"># Version Release.</span>
    release: <span class="token number">1</span>

    <span class="token comment"># Section.</span>
    section: default

    <span class="token comment"># Priority.</span>
    priority: extra

    <span class="token comment"># Makes a meta package - an empty package that contains only supporting</span>
    <span class="token comment"># files and dependencies.</span>
    <span class="token comment"># When set to \`true\`, the \`builds\` option is ignored.</span>
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
      <span class="token comment"># /etc, using the &quot;tree&quot; type.</span>
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
      <span class="token comment"># Corresponds to \`ln -s /sbin/foo /usr/local/bin/foo\`</span>
      - src: /sbin/foo
        dst: /usr/bin/foo
        type: <span class="token string">&quot;symlink&quot;</span>

      <span class="token comment"># Corresponds to \`%config(noreplace)\` if the packager is rpm, otherwise it</span>
      <span class="token comment"># is just a config file</span>
      - src: path/to/local/bar.conf
        dst: /etc/bar.conf
        type: <span class="token string">&quot;config|noreplace&quot;</span>

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
      - src: <span class="token string">&quot;LICENSE.md.tpl&quot;</span>
        dst: LICENSE.md

      <span class="token comment"># These files are not actually present in the package, but the file names</span>
      <span class="token comment"># are added to the package header. From the RPM directives documentation:</span>
      <span class="token comment">#</span>
      <span class="token comment"># &quot;There are times when a file should be owned by the package but not</span>
      <span class="token comment"># installed - log files and state files are good examples of cases you</span>
      <span class="token comment"># might desire this to happen.&quot;</span>
      <span class="token comment">#</span>
      <span class="token comment"># &quot;The way to achieve this, is to use the %ghost directive. By adding this</span>
      <span class="token comment"># directive to the line containing a file, RPM will know about the ghosted</span>
      <span class="token comment"># file, but will not add it to the package.&quot;</span>
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
        type: <span class="token string">&quot;config|noreplace&quot;</span>
        packager: <span class="token function">rpm</span>
      - src: path/to/deb/file.conf
        dst: /etc/file.conf
        type: <span class="token string">&quot;config|noreplace&quot;</span>
        packager: deb
      - src: path/to/apk/file.conf
        dst: /etc/file.conf
        type: <span class="token string">&quot;config|noreplace&quot;</span>
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

      <span class="token comment"># If \`dst\` ends with a \`/\`, it&#39;ll create the given path and copy the given</span>
      <span class="token comment"># \`src\` into it, the same way \`cp\` works with and without trailing \`/\`.</span>
      - src: ./foo/bar/*
        dst: /usr/local/myapp/

      <span class="token comment"># Using the type &#39;dir&#39;, empty directories can be created. When building</span>
      <span class="token comment"># RPMs, however, this type has another important purpose: Claiming</span>
      <span class="token comment"># ownership of that folder. This is important because when upgrading or</span>
      <span class="token comment"># removing an RPM package, only the directories for which it has claimed</span>
      <span class="token comment"># ownership are removed. However, you should not claim ownership of a</span>
      <span class="token comment"># folder that is created by the OS or a dependency of your package.</span>
      <span class="token comment">#</span>
      <span class="token comment"># A directory in the build environment can optionally be provided in the</span>
      <span class="token comment"># &#39;src&#39; field in order copy mtime and mode from that directory without</span>
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
      preinstall: <span class="token string">&quot;scripts/preinstall.sh&quot;</span>
      postinstall: <span class="token string">&quot;scripts/postinstall.sh&quot;</span>
      preremove: <span class="token string">&quot;scripts/preremove.sh&quot;</span>
      postremove: <span class="token string">&quot;scripts/postremove.sh&quot;</span>

    <span class="token comment"># All fields above marked as \`overridable\` can be overridden for a given</span>
    <span class="token comment"># package format in this section.</span>
    overrides:
      <span class="token comment"># The dependencies override can for example be used to provide version</span>
      <span class="token comment"># constraints for dependencies where  different package formats use</span>
      <span class="token comment"># different versions or for dependencies that are named differently.</span>
      deb:
        dependencies:
          - baz <span class="token punctuation">(</span><span class="token operator">&gt;=</span> <span class="token number">1.2</span>.3-0<span class="token punctuation">)</span>
          - some-lib-dev
        <span class="token comment"># ...</span>
      rpm:
        dependencies:
          - baz <span class="token operator">&gt;=</span> <span class="token number">1.2</span>.3-0
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
      <span class="token comment"># \`maintainer\` will be used as fallback if not specified.</span>
      <span class="token comment"># This will expand any env var you set in the field, eg packager: \${PACKAGER}</span>
      packager: GoReleaser <span class="token operator">&lt;</span>staff@goreleaser.com<span class="token operator">&gt;</span>

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
        <span class="token comment"># \`$NFPM_ID_RPM_PASSPHRASE\` with a fallback to \`$NFPM_ID_PASSPHRASE\`,</span>
        <span class="token comment"># where ID is the id of the current nfpm config.</span>
        <span class="token comment"># The id will be transformed to uppercase.</span>
        <span class="token comment"># E.g. If your nfpm id is &#39;default&#39; then the rpm-specific passphrase</span>
        <span class="token comment"># should be set as \`$NFPM_DEFAULT_RPM_PASSPHRASE\`</span>
        <span class="token comment">#</span>
        <span class="token comment"># Templates: allowed</span>
        key_file: <span class="token string">&quot;{{ .Env.GPG_KEY_PATH }}&quot;</span>

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
      <span class="token comment"># The installation of this package is blocked if \`some-package\`</span>
      <span class="token comment"># is already installed.</span>
      breaks:
        - some-package

      <span class="token comment"># The package is signed if a key_file is set</span>
      signature:
        <span class="token comment"># PGP secret key file path (can also be ASCII-armored).</span>
        <span class="token comment"># The passphrase is taken from the environment variable</span>
        <span class="token comment"># \`$NFPM_ID_DEB_PASSPHRASE\` with a fallback to \`$NFPM_ID_PASSPHRASE\`,</span>
        <span class="token comment"># where ID is the id of the current nfpm config.</span>
        <span class="token comment"># The id will be transformed to uppercase.</span>
        <span class="token comment"># E.g. If your nfpm id is &#39;default&#39; then the deb-specific passphrase</span>
        <span class="token comment"># should be set as \`$NFPM_DEFAULT_DEB_PASSPHRASE\`</span>
        <span class="token comment">#</span>
        <span class="token comment"># Templates: allowed</span>
        key_file: <span class="token string">&quot;{{ .Env.GPG_KEY_PATH }}&quot;</span>

        <span class="token comment"># The type describes the signers role, possible values are &quot;origin&quot;,</span>
        <span class="token comment"># &quot;maint&quot; and &quot;archive&quot;.</span>
        <span class="token comment">#</span>
        <span class="token comment"># Default: &#39;origin&#39;</span>
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
        <span class="token comment"># \`$NFPM_ID_APK_PASSPHRASE\` with a fallback to \`$NFPM_ID_PASSPHRASE\`,</span>
        <span class="token comment"># where ID is the id of the current nfpm config.</span>
        <span class="token comment"># The id will be transformed to uppercase.</span>
        <span class="token comment"># E.g. If your nfpm id is &#39;default&#39; then the apk-specific passphrase</span>
        <span class="token comment"># should be set as \`$NFPM_DEFAULT_APK_PASSPHRASE\`</span>
        <span class="token comment">#</span>
        <span class="token comment"># Templates: allowed</span>
        key_file: <span class="token string">&quot;{{ .Env.GPG_KEY_PATH }}&quot;</span>

        <span class="token comment"># The name of the signing key. When verifying a package, the signature</span>
        <span class="token comment"># is matched to the public key store in /etc/apk/keys/&lt;key_name&gt;.rsa.pub.</span>
        <span class="token comment">#</span>
        <span class="token comment"># Default: maintainer&#39;s email address</span>
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
      packager: GoReleaser <span class="token operator">&lt;</span>staff@goreleaser.com<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),ze=s("Learn more about the\xA0"),Ke={href:"https://goreleaser.com/customization/templates/",target:"_blank",rel:"noopener noreferrer"},Ue=s("name template engine"),Ye=s("."),$e=t(`<h2 id="checksums-\u6821\u9A8C" tabindex="-1"><a class="header-anchor" href="#checksums-\u6821\u9A8C" aria-hidden="true">#</a> Checksums\xA0\u6821\u9A8C</h2><p>GoReleaser \u4F1A\u751F\u6210\u4E00\u4E2A\u6587\u4EF6\u5E76\u5C06\u5176\u4E0E\u7248\u672C\u4E00\u8D77\u4E0A\u4F20\uFF0C\u4EE5\u4FBF\u60A8\u7684\u7528\u6237\u53EF\u4EE5\u9A8C\u8BC1\u4E0B\u8F7D\u7684\u6587\u4EF6\u662F\u5426\u6B63\u786E\u3002</p><p>\u8BE5\u90E8\u5206\u5141\u8BB8\u81EA\u5B9A\u4E49\u6587\u4EF6\u540D\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">checksum</span><span class="token operator">:</span>
  # You can change the name <span class="token keyword">of</span> the checksums file<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>ProjectName <span class="token punctuation">}</span><span class="token punctuation">}</span>_<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token punctuation">.</span>Version <span class="token punctuation">}</span><span class="token punctuation">}</span>_checksums<span class="token punctuation">.</span>txt
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">name_template</span><span class="token operator">:</span> <span class="token string">&quot;{{ .ProjectName }}_checksums.txt&quot;</span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="snapcraft-packages-snaps-snapcraft-packages" tabindex="-1"><a class="header-anchor" href="#snapcraft-packages-snaps-snapcraft-packages" aria-hidden="true">#</a> Snapcraft Packages (snaps)\xA0Snapcraft Packages</h2><p>GoReleaser\u4E5F\u53EF\u4EE5\u751F\u6210\u8F6F\u4EF6\u5305\u3002Snaps \u662F\u4E00\u79CD\u65B0\u7684\u6253\u5305\u683C\u5F0F\uFF0C\u53EF\u8BA9\u60A8\u5C06\u9879\u76EE\u76F4\u63A5\u53D1\u5E03\u5230 Ubuntu \u5546\u5E97\u3002\u4ECE\u90A3\u91CC\uFF0C\u5B83\u53EF\u4EE5\u5B89\u88C5\u5728\u6240\u6709\u53D7\u652F\u6301\u7684Linux\u53D1\u884C\u7248\u4E2D\uFF0C\u5E76\u8FDB\u884C\u81EA\u52A8\u548C\u4E8B\u52A1\u6027\u66F4\u65B0\u3002</p><p>\u60A8\u53EF\u4EE5\u5728 snapcraft \u6587\u6863\u4E2D\u9605\u8BFB\u66F4\u591A\u76F8\u5173\u4FE1\u606F\u3002</p><p><strong>Snaps\u662F\u9002\u7528\u4E8E\u684C\u9762</strong>\u3001<strong>\u4E91</strong>\u548C<strong>\u7269\u8054\u7F51</strong>\u7684 Linux \u5E94\u7528\u7A0B\u5E8F\u5305\uFF0C\u6613\u4E8E\u5B89\u88C5\u3001\u5B89\u5168\u3001\u8DE8\u5E73\u53F0\u4E14\u65E0\u4F9D\u8D56\u6027\u3002</p><p>\u5B83\u4EEC\u4F1A<strong>\u81EA\u52A8\u66F4\u65B0\uFF0C\u5E76\u4E14\u901A\u5E38\u5728\u6709\u9650\u7684</strong>\u57FA\u4E8E<strong>\u4E8B\u52A1\u7684</strong>\u73AF\u5883\u4E2D\u8FD0\u884C\u3002<strong>\u5B89\u5168\u6027\u548C\u7A33\u5065\u6027</strong>\u662F\u5176\u4E3B\u8981\u7279\u70B9\uFF0C\u6B64\u5916\u8FD8<strong>\u6613\u4E8E\u5B89\u88C5</strong>\u3001<strong>\u6613\u4E8E\u7EF4\u62A4</strong>\u548C<strong>\u6613\u4E8E\u5347\u7EA7</strong>\u3002</p><p><strong>Snapd \u53D1\u5E03\u6D41\u7A0B</strong></p><p>snapd \u662F\u7BA1\u7406\u548C\u7EF4\u62A4\u5FEB\u7167\u7684\u540E\u53F0\u670D\u52A1\u3002\u5B83\u672C\u8EAB\u53EF\u4EE5\u4F5C\u4E3A snap \u5305\u6216\u4F20\u7EDF\u7684 Linux \u8F6F\u4EF6\u5305\uFF08\u4F8B\u5982 <em>deb</em> \u6216 RPM\uFF09\u63D0\u4F9B\u3002</p><p>\u6709\u4E24\u79CD\u7C7B\u578B\u7684\u53D1\u5E03\uFF1B\u4E3B\u8981\u548C\u6B21\u8981\u7248\u672C\uFF0C\u7531\u5176\u7248\u672C\u53F7\u7684\u6570\u5B57\u72B6\u6001\u8868\u793A\uFF0C\u5E76\u5E26\u6709\u6B21\u8981\u53E5\u70B9\u548C\u4E3A\u6B21\u8981\u7248\u672C\u4FDD\u7559\u7684\u6570\u5B57\uFF1A</p><ul><li>\u4E3B\u8981\u7248\u672C\u53D1\u5E03\uFF1A2.53\u30012.54\u30012.55</li><li>\u6B21\u8981\u7248\u672C\u53D1\u5E03\uFF1A2.53.1\u30012.53.2</li></ul><p>\u4E3B\u8981\u7248\u672C\u548C\u6B21\u8981\u7248\u672C\u4E4B\u95F4\u7684\u533A\u522B\u5728\u4E8E\u5176\u8BA1\u5212\u3001\u51C6\u5907\u548C\u52A8\u673A\u3002\u6BCF\u9694\u51E0\u5468\u5C31\u6709\u4E00\u4E2A\u4E3B\u8981\u53D1\u5E03\u5468\u671F\uFF0C\u4F46\u6709\u65F6\u6211\u4EEC\u9700\u8981\u5305\u542B\u8F83\u5C0F\u66F4\u6539\u548C\u4FEE\u590D\u7684\u4E2D\u95F4\u6B21\u8981\u7248\u672C\u53D1\u5E03\u3002</p><p>\u4E3B\u8981\u7248\u672C\u548C\u540E\u7EED\u6B21\u8981\u7248\u672C\uFF08\u4F8B\u5982 2.53 -&gt; 2.53.1\uFF09\u4E4B\u95F4\u7684\u5DEE\u5F02\u5C3D\u53EF\u80FD\u5C0F\u4E14\u6709\u9488\u5BF9\u6027\uFF0C\u5E76\u7701\u7565\u4E3B\u8981\u4EE3\u7801\u91CD\u6784\u548C\u65B0\u529F\u80FD\u3002\u8FD9\u5E76\u4E0D\u603B\u662F\u53EF\u80FD\u7684\uFF0C\u56E0\u4E3A\u6709\u65F6\u9519\u8BEF\u6216\u529F\u80FD\u5F88\u590D\u6742\uFF0C\u4F46\u8FD9\u662F\u6211\u4EEC\u7684\u9996\u8981\u76EE\u6807\u3002</p><p><strong>\u9010\u6B65\u53D1\u5E03\u6D41\u7A0B</strong></p>`,16),Ve={href:"https://gist.github.com/baymaxium/e1602202e7a3ef53a723ae14a3e928bc",target:"_blank",rel:"noopener noreferrer"},We=s("https://gist.github.com/baymaxium/e1602202e7a3ef53a723ae14a3e928bc"),Xe=t(`<p><strong>\u4F7F\u7528Snapcraft\u6784\u5EFA\u53D1\u5E03Snap\u5B89\u88C5\u5305</strong></p><p>\u751F\u6210\u4E00\u4E2A\u521D\u59CB\u5DE5\u7A0B\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>$ snapcraft init
Created snap<span class="token operator">/</span>snapcraft<span class="token punctuation">.</span>yaml<span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-images" tabindex="-1"><a class="header-anchor" href="#docker-images" aria-hidden="true">#</a> Docker Images</h2><p>GoReleaser \u53EF\u4EE5\u6784\u5EFA\u548C\u63A8\u9001 Docker \u955C\u50CF\u3002\u8BA9\u6211\u4EEC\u770B\u770B\u5B83\u662F\u5982\u4F55\u5DE5\u4F5C\u7684\u3002</p><p>\u60A8\u53EF\u4EE5\u58F0\u660E\u591A\u4E2A Docker \u6620\u50CF\u3002\u5B83\u4EEC\u5C06\u4E0E\u8282\u751F\u6210\u7684\u4E8C\u8FDB\u5236\u6587\u4EF6\u548C\u8282\u751F\u6210\u7684\u5305\u8FDB\u884C\u5339\u914D\u3002</p><p>\u5982\u679C\u60A8\u53EA\u6709\u4E00\u4E2A\u8BBE\u7F6E\uFF0C\u5219\u914D\u7F6E\u5C31\u50CF\u5C06\u6620\u50CF\u540D\u79F0\u6DFB\u52A0\u5230\u6587\u4EF6\u4E2D\u4E00\u6837\u7B80\u5355\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> user<span class="token operator">/</span>repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u60A8\u8FD8\u9700\u8981\u5728\u9879\u76EE\u7684\u6839\u6587\u4EF6\u5939\u4E2D\u521B\u5EFA\u4E00\u4E2A <code>Dockerfile</code>\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token constant">FROM</span> scratch
<span class="token constant">ENTRYPOINT</span> <span class="token punctuation">[</span><span class="token string">&quot;/mybin&quot;</span><span class="token punctuation">]</span>
<span class="token constant">COPY</span> mybin <span class="token operator">/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u914D\u7F6E\u5C06\u751F\u6210\u5E76\u63A8\u9001\u540D\u4E3A \u7684 Docker \u6620\u50CF\u3002</p><p><strong>Customization\xA0\u5B9A\u5236</strong></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  # You can have multiple Docker images<span class="token punctuation">.</span>
  <span class="token operator">-</span> #
    # <span class="token constant">ID</span> <span class="token keyword">of</span> the image<span class="token punctuation">,</span> needed <span class="token keyword">if</span> you want to filter by it later <span class="token function">on</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> on custom publishers<span class="token punctuation">)</span><span class="token punctuation">.</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> myimg

    # <span class="token constant">GOOS</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">&#39;linux&#39;</span>
    <span class="token literal-property property">goos</span><span class="token operator">:</span> linux

    # <span class="token constant">GOARCH</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">&#39;amd64&#39;</span>
    <span class="token literal-property property">goarch</span><span class="token operator">:</span> amd64

    # <span class="token constant">GOARM</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">&#39;6&#39;</span>
    <span class="token literal-property property">goarm</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>

    # <span class="token constant">GOAMD64</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">&#39;v1&#39;</span>
    <span class="token literal-property property">goamd64</span><span class="token operator">:</span> <span class="token string">&quot;v2&quot;</span>

    # IDs to filter the binaries<span class="token operator">/</span>packages<span class="token punctuation">.</span>
    <span class="token literal-property property">ids</span><span class="token operator">:</span>
      <span class="token operator">-</span> mybuild
      <span class="token operator">-</span> mynfpm

    # Templates <span class="token keyword">of</span> the Docker image names<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">image_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:latest&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:{{ .Tag }}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:{{ .Tag }}-{{ .Env.FOOBAR }}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:v{{ .Major }}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;gcr.io/myuser/myimage:latest&quot;</span>

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
    # Default<span class="token operator">:</span> <span class="token string">&#39;Dockerfile&#39;</span>
    <span class="token literal-property property">dockerfile</span><span class="token operator">:</span> <span class="token string">&quot;{{ .Env.DOCKERFILE }}&quot;</span>

    # Set the <span class="token string">&quot;backend&quot;</span> <span class="token keyword">for</span> the Docker pipe<span class="token punctuation">.</span>
    #
    # Valid options are<span class="token operator">:</span> docker<span class="token punctuation">,</span> buildx<span class="token punctuation">,</span> podman<span class="token punctuation">.</span>
    #
    # Podman is a GoReleaser Pro feature and is only available on Linux<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;docker&#39;</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> docker

    # Docker build flags<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">build_flag_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;--pull&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.created={{.Date}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.title={{.ProjectName}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.revision={{.FullCommit}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.version={{.Version}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--build-arg=FOO={{.Env.Bar}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--platform=linux/arm64&quot;</span>

    # Extra flags to be passed down to the push command<span class="token punctuation">.</span>
    <span class="token literal-property property">push_flags</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token operator">--</span>tls<span class="token operator">-</span>verify<span class="token operator">=</span><span class="token boolean">false</span>

    # If your Dockerfile copies files other than binaries and packages<span class="token punctuation">,</span>
    # you should list them here <span class="token keyword">as</span> well<span class="token punctuation">.</span>
    # Note that GoReleaser will create the same structure inside a temporary
    # folder<span class="token punctuation">,</span> so <span class="token keyword">if</span> you add <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">foo/bar.json</span><span class="token template-punctuation string">\`</span></span> here<span class="token punctuation">,</span> on your Dockerfile you can
    # <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">COPY foo/bar.json /whatever.json</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">.</span>
    # Also note that the paths here are relative to the folder <span class="token keyword">in</span> which
    # GoReleaser is being <span class="token function">run</span> <span class="token punctuation">(</span>usually the repository root folder<span class="token punctuation">)</span><span class="token punctuation">.</span>
    # This field does not support wildcards<span class="token punctuation">,</span> you can add an entire folder here
    # and use wildcards when you <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">COPY</span><span class="token template-punctuation string">\`</span></span><span class="token operator">/</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">ADD</span><span class="token template-punctuation string">\`</span></span> <span class="token keyword">in</span> your Dockerfile<span class="token punctuation">.</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-images-1" tabindex="-1"><a class="header-anchor" href="#docker-images-1" aria-hidden="true">#</a> Docker Images</h2><p>GoReleaser \u53EF\u4EE5\u6784\u5EFA\u548C\u63A8\u9001 Docker \u955C\u50CF\u3002\u8BA9\u6211\u4EEC\u770B\u770B\u5B83\u662F\u5982\u4F55\u5DE5\u4F5C\u7684\u3002</p><p>\u60A8\u53EF\u4EE5\u58F0\u660E\u591A\u4E2A Docker \u6620\u50CF\u3002\u5B83\u4EEC\u5C06\u4E0E\u8282\u751F\u6210\u7684\u4E8C\u8FDB\u5236\u6587\u4EF6\u548C\u8282\u751F\u6210\u7684\u5305\u8FDB\u884C\u5339\u914D\u3002</p><p>\u5982\u679C\u60A8\u53EA\u6709\u4E00\u4E2A build \u8BBE\u7F6E\uFF0C\u5219\u914D\u7F6E\u5C31\u50CF\u5C06\u6620\u50CF\u540D\u79F0\u6DFB\u52A0\u5230\u6587\u4EF6\u4E2D\u4E00\u6837\u7B80\u5355\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> user<span class="token operator">/</span>repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u60A8\u8FD8\u9700\u8981\u5728\u9879\u76EE\u7684\u6839\u6587\u4EF6\u5939\u4E2D\u521B\u5EFA\u4E00\u4E2A\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token constant">FROM</span> scratch
<span class="token constant">ENTRYPOINT</span> <span class="token punctuation">[</span><span class="token string">&quot;/mybin&quot;</span><span class="token punctuation">]</span>
<span class="token constant">COPY</span> mybin <span class="token operator">/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B64\u914D\u7F6E\u5C06\u751F\u6210\u5E76\u63A8\u9001\u540D\u4E3A \u7684 Docker \u6620\u50CF\u3002</p><p><strong>Customization</strong></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  # You can have multiple Docker images<span class="token punctuation">.</span>
  <span class="token operator">-</span> #
    # <span class="token constant">ID</span> <span class="token keyword">of</span> the image<span class="token punctuation">,</span> needed <span class="token keyword">if</span> you want to filter by it later <span class="token function">on</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> on custom publishers<span class="token punctuation">)</span><span class="token punctuation">.</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> myimg

    # <span class="token constant">GOOS</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">&#39;linux&#39;</span>
    <span class="token literal-property property">goos</span><span class="token operator">:</span> linux

    # <span class="token constant">GOARCH</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">&#39;amd64&#39;</span>
    <span class="token literal-property property">goarch</span><span class="token operator">:</span> amd64

    # <span class="token constant">GOARM</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">&#39;6&#39;</span>
    <span class="token literal-property property">goarm</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span>

    # <span class="token constant">GOAMD64</span> <span class="token keyword">of</span> the built binaries<span class="token operator">/</span>packages that should be used<span class="token punctuation">.</span>
    # Default<span class="token operator">:</span> <span class="token string">&#39;v1&#39;</span>
    <span class="token literal-property property">goamd64</span><span class="token operator">:</span> <span class="token string">&quot;v2&quot;</span>

    # IDs to filter the binaries<span class="token operator">/</span>packages<span class="token punctuation">.</span>
    <span class="token literal-property property">ids</span><span class="token operator">:</span>
      <span class="token operator">-</span> mybuild
      <span class="token operator">-</span> mynfpm

    # Templates <span class="token keyword">of</span> the Docker image names<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">image_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:latest&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:{{ .Tag }}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:{{ .Tag }}-{{ .Env.FOOBAR }}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:v{{ .Major }}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;gcr.io/myuser/myimage:latest&quot;</span>

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
    # Default<span class="token operator">:</span> <span class="token string">&#39;Dockerfile&#39;</span>
    <span class="token literal-property property">dockerfile</span><span class="token operator">:</span> <span class="token string">&quot;{{ .Env.DOCKERFILE }}&quot;</span>

    # Set the <span class="token string">&quot;backend&quot;</span> <span class="token keyword">for</span> the Docker pipe<span class="token punctuation">.</span>
    #
    # Valid options are<span class="token operator">:</span> docker<span class="token punctuation">,</span> buildx<span class="token punctuation">,</span> podman<span class="token punctuation">.</span>
    #
    # Podman is a GoReleaser Pro feature and is only available on Linux<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;docker&#39;</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> docker

    # Docker build flags<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">build_flag_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;--pull&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.created={{.Date}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.title={{.ProjectName}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.revision={{.FullCommit}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.version={{.Version}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--build-arg=FOO={{.Env.Bar}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--platform=linux/arm64&quot;</span>

    # Extra flags to be passed down to the push command<span class="token punctuation">.</span>
    <span class="token literal-property property">push_flags</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token operator">--</span>tls<span class="token operator">-</span>verify<span class="token operator">=</span><span class="token boolean">false</span>

    # If your Dockerfile copies files other than binaries and packages<span class="token punctuation">,</span>
    # you should list them here <span class="token keyword">as</span> well<span class="token punctuation">.</span>
    # Note that GoReleaser will create the same structure inside a temporary
    # folder<span class="token punctuation">,</span> so <span class="token keyword">if</span> you add <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">foo/bar.json</span><span class="token template-punctuation string">\`</span></span> here<span class="token punctuation">,</span> on your Dockerfile you can
    # <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">COPY foo/bar.json /whatever.json</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">.</span>
    # Also note that the paths here are relative to the folder <span class="token keyword">in</span> which
    # GoReleaser is being <span class="token function">run</span> <span class="token punctuation">(</span>usually the repository root folder<span class="token punctuation">)</span><span class="token punctuation">.</span>
    # This field does not support wildcards<span class="token punctuation">,</span> you can add an entire folder here
    # and use wildcards when you <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">COPY</span><span class="token template-punctuation string">\`</span></span><span class="token operator">/</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">ADD</span><span class="token template-punctuation string">\`</span></span> <span class="token keyword">in</span> your Dockerfile<span class="token punctuation">.</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BF7\u6CE8\u610F\uFF0C\u60A8\u5FC5\u987B\u624B\u52A8\u767B\u5F55\u5230\u8981\u63A8\u9001\u5230\u7684Docker\u6CE8\u518C\u8868 - GoReleaser\u4E0D\u4F1A\u81EA\u884C\u767B\u5F55\u3002</p><blockquote><p>\u8BF7\u6CE8\u610F\uFF0C\u60A8\u5FC5\u987B\u624B\u52A8\u767B\u5F55\u5230\u8981\u63A8\u9001\u5230\u7684Docker\u6CE8\u518C\u8868 - GoReleaser\u4E0D\u4F1A\u81EA\u884C\u767B\u5F55\u3002</p></blockquote><p>\u8FD9\u4E9B\u8BBE\u7F6E\u5E94\u8BE5\u5141\u8BB8\u60A8\u751F\u6210\u591A\u4E2A Docker \u6620\u50CF\uFF0C\u4F8B\u5982\uFF0C\u4F7F\u7528\u591A\u4E2A\u8BED\u53E5\uFF0C\u4EE5\u53CA\u4E3A\u9879\u76EE\u4E2D\u7684\u6BCF\u4E2A\u4E8C\u8FDB\u5236\u6587\u4EF6\u751F\u6210\u4E00\u4E2A\u6620\u50CF\u6216\u4E00\u4E2A\u5177\u6709\u591A\u4E2A\u4E8C\u8FDB\u5236\u6587\u4EF6\u7684\u6620\u50CF\uFF0C\u4EE5\u53CA\u5B89\u88C5\u751F\u6210\u7684\u5305\u800C\u4E0D\u662F\u624B\u52A8\u590D\u5236\u4E8C\u8FDB\u5236\u6587\u4EF6\u548C\u914D\u7F6E\u3002</p><h3 id="\u901A\u7528\u6620\u50CF\u540D\u79F0" tabindex="-1"><a class="header-anchor" href="#\u901A\u7528\u6620\u50CF\u540D\u79F0" aria-hidden="true">#</a> \u901A\u7528\u6620\u50CF\u540D\u79F0</h3><p>\u67D0\u4E9B\u7528\u6237\u53EF\u80FD\u5E0C\u671B\u4F7F\u5176\u6620\u50CF\u540D\u79F0\u5C3D\u53EF\u80FD\u901A\u7528\u3002\u8FD9\u53EF\u4EE5\u901A\u8FC7\u5728\u5B9A\u4E49\u4E2D\u6DFB\u52A0\u6A21\u677F\u8BED\u8A00\u6765\u5B9E\u73B0\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">project_name</span><span class="token operator">:</span> foo
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/{{.ProjectName}}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u5C06\u751F\u6210\u5E76\u53D1\u5E03\u4EE5\u4E0B\u6620\u50CF\uFF1A</p><ul><li><code>myuser/foo</code></li></ul><h3 id="\u4FDD\u6301\u5F53\u524D\u4E3B\u8981\u5185\u5BB9\u7684-docker-\u6620\u50CF\u66F4\u65B0" tabindex="-1"><a class="header-anchor" href="#\u4FDD\u6301\u5F53\u524D\u4E3B\u8981\u5185\u5BB9\u7684-docker-\u6620\u50CF\u66F4\u65B0" aria-hidden="true">#</a> \u4FDD\u6301\u5F53\u524D\u4E3B\u8981\u5185\u5BB9\u7684 docker \u6620\u50CF\u66F4\u65B0</h3><p>\u4E00\u4E9B\u7528\u6237\u53EF\u80FD\u60F3\u8981\u63A8\u9001 docker \u6807\u8BB0 \u3001 \u4EE5\u53CA\u4F55\u65F6\uFF08\u4F8B\u5982\uFF09\u6784\u5EFA\u3002\u8FD9\u53EF\u4EE5\u901A\u8FC7\u4F7F\u7528\u591A\u4E2A\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:{{ .Tag }}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:v{{ .Major }}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:v{{ .Major }}.{{ .Minor }}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage:latest&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u5C06\u751F\u6210\u5E76\u53D1\u5E03\u4EE5\u4E0B\u6620\u50CF\uFF1A</p><ul><li><code>myuser/myimage:v1.6.4</code></li><li><code>myuser/myimage:v1</code></li><li><code>myuser/myimage:v1.6</code></li><li><code>myuser/myimage:latest</code></li></ul><p>\u901A\u8FC7\u8FD9\u4E9B\u8BBE\u7F6E\uFF0C\u60A8\u53EF\u4EE5\u5E0C\u671B\u63A8\u9001\u591A\u4E2A\u5177\u6709\u591A\u4E2A\u6807\u7B7E\u7684 Docker \u6620\u50CF\u3002</p><h3 id="\u53D1\u5E03\u5230\u591A\u4E2A-docker-\u6CE8\u518C\u8868" tabindex="-1"><a class="header-anchor" href="#\u53D1\u5E03\u5230\u591A\u4E2A-docker-\u6CE8\u518C\u8868" aria-hidden="true">#</a> \u53D1\u5E03\u5230\u591A\u4E2A docker \u6CE8\u518C\u8868</h3><p>\u67D0\u4E9B\u7528\u6237\u53EF\u80FD\u5E0C\u671B\u5C06\u6620\u50CF\u63A8\u9001\u5230\u591A\u4E2A docker \u6CE8\u518C\u8868\u3002\u8FD9\u53EF\u4EE5\u901A\u8FC7\u4F7F\u7528\u591A\u4E2A\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;docker.io/myuser/myimage:{{ .Tag }}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;docker.io/myuser/myimage:latest&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;gcr.io/myuser/myimage:{{ .Tag }}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;gcr.io/myuser/myimage:latest&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4F1A\u751F\u6210\u4EE5\u4E0B\u6620\u50CF\u5E76\u5C06\u5176\u53D1\u5E03\u5230 \u548C \uFF1A</p><ul><li><code>myuser/myimage:v1.6.4</code></li><li><code>myuser/myimage:latest</code></li><li><code>gcr.io/myuser/myimage:v1.6.4</code></li><li><code>gcr.io/myuser/myimage:latest</code></li></ul><h3 id="\u5E94\u7528-docker-\u6784\u5EFA\u6807\u5FD7" tabindex="-1"><a class="header-anchor" href="#\u5E94\u7528-docker-\u6784\u5EFA\u6807\u5FD7" aria-hidden="true">#</a> \u5E94\u7528 Docker \u6784\u5EFA\u6807\u5FD7</h3><p>\u53EF\u4EE5\u4F7F\u7528 \u5E94\u7528\u751F\u6210\u6807\u5FD7\u3002\u8FD9\u4E9B\u6807\u5FD7\u5FC5\u987B\u662F\u6709\u6548\u7684 Docker \u6784\u5EFA\u6807\u5FD7\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage&quot;</span>
    <span class="token literal-property property">build_flag_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;--pull&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.created={{.Date}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.title={{.ProjectName}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.revision={{.FullCommit}}&quot;</span>
      <span class="token operator">-</span> <span class="token string">&quot;--label=org.opencontainers.image.version={{.Version}}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u5C06\u6267\u884C\u4EE5\u4E0B\u547D\u4EE4\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>docker build <span class="token operator">-</span>t myuser<span class="token operator">/</span>myimage <span class="token punctuation">.</span> \\
  <span class="token operator">--</span>pull \\
  <span class="token operator">--</span>label<span class="token operator">=</span>org<span class="token punctuation">.</span>opencontainers<span class="token punctuation">.</span>image<span class="token punctuation">.</span>created<span class="token operator">=</span><span class="token number">2020</span><span class="token operator">-</span><span class="token number">01</span><span class="token operator">-</span>19T15<span class="token operator">:</span><span class="token number">58</span><span class="token operator">:</span>07Z \\
  <span class="token operator">--</span>label<span class="token operator">=</span>org<span class="token punctuation">.</span>opencontainers<span class="token punctuation">.</span>image<span class="token punctuation">.</span>title<span class="token operator">=</span>mybinary \\
  <span class="token operator">--</span>label<span class="token operator">=</span>org<span class="token punctuation">.</span>opencontainers<span class="token punctuation">.</span>image<span class="token punctuation">.</span>revision<span class="token operator">=</span>da39a3ee5e6b4b0d3255bfef95601890afd80709 \\
  <span class="token operator">--</span>label<span class="token operator">=</span>org<span class="token punctuation">.</span>opencontainers<span class="token punctuation">.</span>image<span class="token punctuation">.</span>version<span class="token operator">=</span><span class="token number">1.6</span><span class="token number">.4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5C06\u7279\u5B9A\u7684\u6784\u5EFA\u5668\u4E0E-docker-buildx-\u4E00\u8D77\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u5C06\u7279\u5B9A\u7684\u6784\u5EFA\u5668\u4E0E-docker-buildx-\u4E00\u8D77\u4F7F\u7528" aria-hidden="true">#</a> \u5C06\u7279\u5B9A\u7684\u6784\u5EFA\u5668\u4E0E Docker buildx \u4E00\u8D77\u4F7F\u7528</h3><p>\u5982\u679C\u542F\u7528\uFF0C\u5219\u5728\u6784\u5EFA\u6620\u50CF\u65F6\u4F7F\u7528\u4E0A\u4E0B\u6587\u6784\u5EFA\u5668\u3002\u6B64\u6784\u5EFA\u5668\u59CB\u7EC8\u53EF\u7528\uFF0C\u5E76\u7531 Docker \u5F15\u64CE\u4E2D\u7684 BuildKit \u63D0\u4F9B\u652F\u6301\u3002\u5982\u679C\u8981\u4F7F\u7528\u5176\u4ED6\u6784\u5EFA\u5668\uFF0C\u53EF\u4EE5\u4F7F\u7528\u4EE5\u4E0B\u5B57\u6BB5\u6307\u5B9A\u5B83\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage&quot;</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> buildx
    <span class="token literal-property property">build_flag_templates</span><span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;--builder=mybuilder&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="podman" tabindex="-1"><a class="header-anchor" href="#podman" aria-hidden="true">#</a> Podman</h3><p>\u60A8\u53EF\u4EE5\u4F7F\u7528\u800C\u4E0D\u662F\u901A\u8FC7\u5728\u914D\u7F6E\u4E0A\u8BBE\u7F6E\u4E3A\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">dockers</span><span class="token operator">:</span>
  <span class="token operator">-</span> image_templates<span class="token operator">:</span>
      <span class="token operator">-</span> <span class="token string">&quot;myuser/myimage&quot;</span>
    <span class="token literal-property property">use</span><span class="token operator">:</span> podman
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BF7\u6CE8\u610F\uFF0CGoReleaser \u4E0D\u4F1A\u4E3A\u60A8\u5B89\u88C5 Podman\uFF0C\u4E5F\u4E0D\u4F1A\u66F4\u6539\u5176\u4EFB\u4F55\u914D\u7F6E\u3002</p><h2 id="docker-manifests" tabindex="-1"><a class="header-anchor" href="#docker-manifests" aria-hidden="true">#</a> Docker Manifests</h2><p>GoReleaser \u8FD8\u53EF\u4EE5\u4F7F\u7528\u8BE5\u5DE5\u5177\u521B\u5EFA\u548C\u63A8\u9001 Docker \u591A\u5E73\u53F0\u6620\u50CF\u3002</p><p>\u65E0\u9700\u5207\u6362\u8BBE\u5907\uFF0C\u5728 Apple M2 \u82AF\u7247\u7684\u673A\u5668\u4E0A\u6211\u4EEC\u53EF\u4EE5\u76F4\u63A5\u6784\u5EFA\xA0<code>amd64</code>\xA0\u4E5F\u5C31\u662F Linux \u5E73\u53F0\u955C\u50CF\uFF0C<code>docker build</code>\xA0\u547D\u4EE4\u63D0\u4F9B\u4E86\xA0<code>--platform</code>\xA0\u53C2\u6570\u53EF\u4EE5\u6784\u5EFA\u8DE8\u5E73\u53F0\u955C\u50CF\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>docker build <span class="token operator">--</span>platform<span class="token operator">=</span>linux<span class="token operator">/</span>amd64 <span class="token operator">-</span>t kubecub<span class="token operator">/</span>echo<span class="token operator">-</span>platform<span class="token operator">-</span>amd64 <span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD0\u884C\u4E0D\u540C\u5E73\u53F0\u7684\u955C\u50CF\u4F1A\u600E\u4E48\u6837\uFF1A</p><p>\u4F60\u4E5F\u8BB8\u4F1A\u597D\u5947\uFF0C\u5728 Apple M2 \u82AF\u7247\u7684\u4E3B\u673A\u8BBE\u5907\u4E0A\u8FD0\u884C\xA0<code>amd64</code>\xA0\u5E73\u53F0\u955C\u50CF\u4F1A\u600E\u6837\u3002\u76EE\u524D\u54B1\u4EEC\u6784\u5EFA\u7684\u8FD9\u4E2A\u7B80\u5355\u955C\u50CF\u5176\u5B9E\u662F\u80FD\u591F\u8FD0\u884C\u7684\uFF0C\u53EA\u4E0D\u8FC7\u4F1A\u5F97\u5230\u4E00\u6761\u8B66\u544A\u4FE1\u606F\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>$ docker run <span class="token operator">--</span>rm kubecub<span class="token operator">/</span>echo<span class="token operator">-</span>platform<span class="token operator">-</span>amd64
<span class="token constant">WARNING</span><span class="token operator">:</span> The requested image&#39;s <span class="token function">platform</span> <span class="token punctuation">(</span>linux<span class="token operator">/</span>amd64<span class="token punctuation">)</span> does not match the detected host <span class="token function">platform</span> <span class="token punctuation">(</span>linux<span class="token operator">/</span>arm64<span class="token operator">/</span>v8<span class="token punctuation">)</span> and no specific platform was requested
Linux buildkitsandbox <span class="token number">5.15</span><span class="token number">.49</span><span class="token operator">-</span>linuxkit #<span class="token number">1</span> <span class="token constant">SMP</span> <span class="token constant">PREEMPT</span> Tue Sep <span class="token number">13</span> <span class="token number">07</span><span class="token operator">:</span><span class="token number">51</span><span class="token operator">:</span><span class="token number">32</span> <span class="token constant">UTC</span> <span class="token number">2022</span> x86_64 Linux
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8F93\u51FA\u5185\u5BB9\u4E2D\u7684\xA0<code>x86_64</code>\xA0\u5C31\u8868\u793A\xA0<code>AMD64</code>\xA0\u67B6\u6784\u3002</p><blockquote><p>\u6CE8\u610F\uFF1A\u867D\u7136\u8FD9\u4E2A\u7B80\u5355\u7684\u955C\u50CF\u80FD\u591F\u8FD0\u884C\u6210\u529F\uFF0C\u4F46\u5982\u679C\u5BB9\u5668\u5185\u90E8\u7A0B\u5E8F\u4E0D\u652F\u6301\u8DE8\u5E73\u53F0\uFF0C<code>amd64</code>\xA0\u5E73\u53F0\u955C\u50CF\u65E0\u6CD5\u5728\xA0<code>arm64</code>\xA0\u5E73\u53F0\u8FD0\u884C\u6210\u529F\u3002</p></blockquote><p><strong>\u4F7F\u7528 manifest \u5408\u5E76\u591A\u5E73\u53F0\u955C\u50CF</strong></p><p>\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 <code>docker manifest</code> \u7684\u5B50\u547D\u4EE4 <code>create</code> \u521B\u5EFA\u4E00\u4E2A <code>manifest list</code>\uFF0C\u5373\u5C06\u591A\u4E2A\u5E73\u53F0\u7684\u955C\u50CF\u5408\u5E76\u4E3A\u4E00\u4E2A\u955C\u50CF\u3002</p><p><code>create</code> \u547D\u4EE4\u7528\u6CD5\u5F88\u7B80\u5355\uFF0C\u540E\u9762\u8DDF\u7684\u7B2C\u4E00\u4E2A\u53C2\u6570 <code>jianghushinian/echo-platform</code> \u5373\u4E3A\u5408\u5E76\u540E\u7684\u955C\u50CF\uFF0C\u4ECE\u7B2C\u4E8C\u4E2A\u53C2\u6570\u5F00\u59CB\u53EF\u4EE5\u6307\u5B9A\u4E00\u4E2A\u6216\u591A\u4E2A\u4E0D\u540C\u5E73\u53F0\u7684\u955C\u50CF\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>docker manifest create kubecub<span class="token operator">/</span>echo<span class="token operator">-</span>platform kubecub<span class="token operator">/</span>echo<span class="token operator">-</span>platform<span class="token operator">-</span>arm64 kubecub<span class="token operator">/</span>echo<span class="token operator">-</span>platform<span class="token operator">-</span>amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,67),Ze=s("\u6D4F\u89C8\u5668\u4E2D\u767B\u5F55\xA0"),Je={href:"https://link.juejin.cn/?target=https%3A%2F%2Fhub.docker.com%2F",target:"_blank",rel:"noopener noreferrer"},Qe=s("Docker Hub"),nt=s("\xA0\u67E5\u770B\u63A8\u9001\u6210\u529F\u7684\u955C\u50CF\uFF1A"),st=t(`<blockquote><p>\u8FDB\u5165\u955C\u50CF\u4FE1\u606F\u8BE6\u60C5\u9875\u9762\u7684\xA0<code>Tags</code>\xA0\u6807\u7B7E\uFF0C\u80FD\u591F\u770B\u5230\u955C\u50CF\u652F\u6301\xA0<code>amd64</code>\u3001<code>arm64/v8</code>\xA0\u8FD9\u4E24\u4E2A\u5E73\u53F0\u3002</p></blockquote><h3 id="manifest-\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#manifest-\u547D\u4EE4" aria-hidden="true">#</a> Manifest \u547D\u4EE4</h3><p>\u53EF\u4EE5\u53D1\u73B0\uFF0C<code>docker manifest</code>\xA0\u5171\u63D0\u4F9B\u4E86\xA0<code>annotate</code>\u3001<code>create</code>\u3001<code>inspect</code>\u3001<code>push</code>\u3001<code>rm</code>\xA0\u8FD9 5 \u4E2A\u5B50\u547D\u3002</p><p>\u53EF\u4EE5\u53D1\u73B0\uFF0C<code>create</code>\xA0\u5B50\u547D\u4EE4\u652F\u6301\u4E24\u4E2A\u53EF\u9009\u53C2\u6570\xA0<code>-a/--amend</code>\xA0\u7528\u6765\u4FEE\u8BA2\u5DF2\u5B58\u5728\u7684\u591A\u67B6\u6784\u955C\u50CF\u3002</p><p>\u6307\u5B9A\xA0<code>--insecure</code>\xA0\u53C2\u6570\u5219\u5141\u8BB8\u4F7F\u7528\u4E0D\u5B89\u5168\u7684\uFF08\u975E https\uFF09\u955C\u50CF\u4ED3\u5E93\u3002</p><h3 id="push" tabindex="-1"><a class="header-anchor" href="#push" aria-hidden="true">#</a> push</h3><p><code>push</code>\xA0\u5B50\u547D\u4EE4\u6211\u4EEC\u4E5F\u89C1\u8FC7\u4E86\uFF0C\u4F7F\u7528\xA0<code>push</code>\xA0\u53EF\u4EE5\u5C06\u591A\u67B6\u6784\u955C\u50CF\u63A8\u9001\u5230\u955C\u50CF\u4ED3\u5E93\u3002</p><p>\u540C\u6837\u7684\uFF0C<code>push</code>\xA0\u4E5F\u6709\u4E00\u4E2A\xA0<code>--insecure</code>\xA0\u53C2\u6570\u5141\u8BB8\u4F7F\u7528\u4E0D\u5B89\u5168\u7684\uFF08\u975E https\uFF09\u955C\u50CF\u4ED3\u5E93\u3002</p><ul><li><code>p/--purge</code>\xA0\u9009\u9879\u7684\u4F5C\u7528\u662F\u63A8\u9001\u672C\u5730\u955C\u50CF\u5230\u8FDC\u7A0B\u4ED3\u5E93\u540E\uFF0C\u5220\u9664\u672C\u5730\xA0<code>manifest list</code>\u3002</li></ul><h3 id="inspect" tabindex="-1"><a class="header-anchor" href="#inspect" aria-hidden="true">#</a> inspect</h3><p><code>inspect</code>\xA0\u7528\u6765\u67E5\u770B\xA0<code>manifest</code>/<code>manifest list</code>\xA0\u6240\u5305\u542B\u7684\u955C\u50CF\u4FE1\u606F\u3002</p><p><code>--insecure</code>\xA0\u53C2\u6570\u5141\u8BB8\u4F7F\u7528\u4E0D\u5B89\u5168\u7684\uFF08\u975E https\uFF09\u955C\u50CF\u4ED3\u5E93\u3002\u8FD9\u5DF2\u7ECF\u662F\u6211\u4EEC\u7B2C\u4E09\u6B21\u770B\u89C1\u8FD9\u4E2A\u53C2\u6570\u4E86\uFF0C\u8FD9\u4E5F\u9A8C\u8BC1\u4E86\xA0<code>docker manifest</code>\xA0\u547D\u4EE4\u9700\u8981\u8054\u7F51\u624D\u80FD\u4F7F\u7528\u7684\u8BF4\u6CD5\uFF0C\u56E0\u4E3A\u8FD9\u4E9B\u5B50\u547D\u4EE4\u57FA\u672C\u90FD\u6D89\u53CA\u5230\u548C\u8FDC\u7A0B\u955C\u50CF\u4ED3\u5E93\u7684\u4EA4\u4E92\u3002</p><h3 id="annotate" tabindex="-1"><a class="header-anchor" href="#annotate" aria-hidden="true">#</a> annotate</h3><p><code>annotate</code>\xA0\u5B50\u547D\u4EE4\u53EF\u4EE5\u7ED9\u4E00\u4E2A\u672C\u5730\u955C\u50CF\xA0<code>manifest</code>\xA0\u6DFB\u52A0\u9644\u52A0\u7684\u4FE1\u606F\u3002\u8FD9\u6709\u70B9\u50CF K8s Annotations \u7684\u610F\u601D\u3002</p><p>\u53EF\u9009\u53C2\u6570\u5217\u8868\u5982\u4E0B\uFF1A</p><table><thead><tr><th>\u9009\u9879</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>--arch</td><td>\u8BBE\u7F6E CPU \u67B6\u6784\u4FE1\u606F\u3002</td></tr><tr><td>--os</td><td>\u8BBE\u7F6E\u64CD\u4F5C\u7CFB\u7EDF\u4FE1\u606F\u3002</td></tr><tr><td>--os-features</td><td>\u8BBE\u7F6E\u64CD\u4F5C\u7CFB\u7EDF\u529F\u80FD\u4FE1\u606F\u3002</td></tr><tr><td>--os-version</td><td>\u8BBE\u7F6E\u64CD\u4F5C\u7CFB\u7EDF\u7248\u672C\u4FE1\u606F\u3002</td></tr><tr><td>--variant</td><td>\u8BBE\u7F6E CPU \u67B6\u6784\u7684 variant \u4FE1\u606F\uFF08\u7FFB\u8BD1\u8FC7\u6765\u662F\u201C\u53D8\u79CD\u201D\u7684\u610F\u601D\uFF09\uFF0C\u5982 ARM \u67B6\u6784\u7684 v7\u3001v8 \u7B49\u3002</td></tr></tbody></table><h2 id="rm" tabindex="-1"><a class="header-anchor" href="#rm" aria-hidden="true">#</a> rm</h2><p>\u6700\u540E\u8981\u4ECB\u7ECD\u7684\u5B50\u547D\u4EE4\u662F\xA0<code>rm</code>\uFF0C\u4F7F\u7528\xA0<code>rm</code>\xA0\u53EF\u4EE5\u5220\u9664\u672C\u5730\u4E00\u4E2A\u6216\u591A\u4E2A\u591A\u67B6\u6784\u955C\u50CF\uFF08<code>manifest lists</code>\uFF09\u3002</p><h3 id="customization" tabindex="-1"><a class="header-anchor" href="#customization" aria-hidden="true">#</a> Customization</h3><p>\u60A8\u53EF\u4EE5\u5728\u4E00\u6B21 GoReleaser \u8FD0\u884C\u4E2D\u521B\u5EFA\u591A\u4E2A\u6E05\u5355\uFF0C\u4EE5\u4E0B\u662F\u6240\u6709\u53EF\u7528\u7684\u9009\u9879\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">docker_manifests</span><span class="token operator">:</span>
  # You can have multiple Docker manifests<span class="token punctuation">.</span>
<span class="token operator">-</span>
  # <span class="token constant">ID</span> <span class="token keyword">of</span> the manifest<span class="token punctuation">,</span> needed <span class="token keyword">if</span> you want to filter by it later <span class="token function">on</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> on
  # custom publishers<span class="token punctuation">)</span><span class="token punctuation">.</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> myimg

  # Name <span class="token keyword">for</span> the manifest<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">name_template</span><span class="token operator">:</span> <span class="token string">&quot;foo/bar:{{ .Version }}&quot;</span>

  # Image name to be added to <span class="token keyword">this</span> manifest<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">image_templates</span><span class="token operator">:</span>
  <span class="token operator">-</span> <span class="token string">&quot;foo/bar:{{ .Version }}-amd64&quot;</span>
  <span class="token operator">-</span> <span class="token string">&quot;foo/bar:{{ .Version }}-arm64v8&quot;</span>

  # Extra flags to be passed down to the manifest create command<span class="token punctuation">.</span>
  <span class="token literal-property property">create_flags</span><span class="token operator">:</span>
  <span class="token operator">-</span> <span class="token operator">--</span>insecure

  # Extra flags to be passed down to the manifest push command<span class="token punctuation">.</span>
  <span class="token literal-property property">push_flags</span><span class="token operator">:</span>
  <span class="token operator">-</span> <span class="token operator">--</span>insecure

  # Skips the Docker manifest<span class="token punctuation">.</span>
  # If you <span class="token keyword">set</span> <span class="token keyword">this</span> to <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">false</span><span class="token template-punctuation string">\`</span></span> or <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">auto</span><span class="token template-punctuation string">\`</span></span> on your source Docker configuration<span class="token punctuation">,</span>
  #  you&#39;ll probably want to <span class="token keyword">do</span> the same here<span class="token punctuation">.</span>
  #
  # If <span class="token keyword">set</span> to <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">auto</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> the manifest will not be created <span class="token keyword">in</span> <span class="token keyword">case</span> there is an
  #  indicator <span class="token keyword">of</span> a prerelease <span class="token keyword">in</span> the tag<span class="token punctuation">,</span> e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> v1<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span>rc1<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> <span class="token function">allowed</span> <span class="token punctuation">(</span>since v1<span class="token punctuation">.</span><span class="token number">19</span><span class="token punctuation">)</span>
  <span class="token literal-property property">skip_push</span><span class="token operator">:</span> <span class="token boolean">false</span>

  # Set the <span class="token string">&quot;backend&quot;</span> <span class="token keyword">for</span> the Docker manifest pipe<span class="token punctuation">.</span>
  # Valid options are<span class="token operator">:</span> docker<span class="token punctuation">,</span> podman
  #
  # Relevant notes<span class="token operator">:</span>
  # <span class="token number">1.</span> podman is a GoReleaser Pro feature and is only available on Linux<span class="token punctuation">;</span>
  # <span class="token number">2.</span> <span class="token keyword">if</span> you <span class="token keyword">set</span> podman here<span class="token punctuation">,</span> the respective docker configuration need to use
  #     podman too<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">&#39;docker&#39;</span>
  <span class="token literal-property property">use</span><span class="token operator">:</span> docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ko" tabindex="-1"><a class="header-anchor" href="#ko" aria-hidden="true">#</a> KO</h2><p>https://github.com/ko-build/ko</p><p>KO is Build and deploy Go applications</p><p>install docs:</p>`,25),at={href:"https://ko.build/install/",target:"_blank",rel:"noopener noreferrer"},et=s("Installation - ko: Easy Go Containers"),tt=t(`<p>User Actions:</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code><span class="token literal-property property">steps</span><span class="token operator">:</span>
<span class="token operator">-</span> uses<span class="token operator">:</span> imjasonh<span class="token operator">/</span>setup<span class="token operator">-</span>ko@v0<span class="token punctuation">.</span><span class="token number">6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>User Ko:</strong></p><p><code>ko</code>\u53D6\u51B3\u4E8E Docker \u914D\u7F6E\u4E2D\u914D\u7F6E\u7684\u8EAB\u4EFD\u9A8C\u8BC1\uFF08\u901A\u5E38<code>~/.docker/config.json</code>\uFF09\u3002</p><p>\u2728**\u5982\u679C\u60A8\u53EF\u4EE5\u4F7F\u7528 \u63A8\u9001\u56FE\u7247<code>docker push</code>\uFF0C\u5219\u60A8\u5DF2\u7ECF\u901A\u8FC7\u4E86\u8EAB\u4EFD\u9A8C\u8BC1<code>ko</code>\uFF01**\u2728</p><p>\u7531\u4E8E<code>ko</code>\u4E0D\u9700\u8981<code>docker</code>\uFF0C<code>ko login</code>\u8FD8\u63D0\u4F9B\u4E86\u4E00\u4E2A\u4F7F\u7528\u7528\u6237\u540D\u548C\u5BC6\u7801\u767B\u5F55\u5BB9\u5668\u6620\u50CF\u6CE8\u518C\u8868\u7684\u754C\u9762\uFF0C\u7C7B\u4F3C\u4E8E<code>[docker login](https://docs.docker.com/engine/reference/commandline/login/)</code>.</p><p>\u6B64\u5916\uFF0C\u5373\u4F7F\u672A\u5728 Docker \u914D\u7F6E\u4E2D\u914D\u7F6E\u8EAB\u4EFD\u9A8C\u8BC1\uFF0C\u4E5F<code>ko</code>\u5305\u542B\u4F7F\u7528\u73AF\u5883\u4E2D\u914D\u7F6E\u7684\u51ED\u636E\u5BF9\u4EE5\u4E0B\u5BB9\u5668\u6CE8\u518C\u8868\u8FDB\u884C\u8EAB\u4EFD\u9A8C\u8BC1\u7684\u5185\u7F6E\u652F\u6301\uFF1A</p>`,7),ot=s("Google \u5BB9\u5668\u6CE8\u518C\u8868\u548C Artifact \u6CE8\u518C\u8868\uFF0C\u4F7F\u7528"),it={href:"https://cloud.google.com/docs/authentication/production",target:"_blank",rel:"noopener noreferrer"},lt=s("\u5E94\u7528\u7A0B\u5E8F\u9ED8\u8BA4\u51ED\u636E"),pt=n("code",null,"gcloud",-1),ct=n("p",null,"\u6216",-1),rt=s("Amazon Elastic Container Registry\uFF0C\u4F7F\u7528"),dt={href:"https://github.com/awslabs/amazon-ecr-credential-helper/#aws-credentials",target:"_blank",rel:"noopener noreferrer"},ut=s("AWS \u51ED\u8BC1"),mt=s("Azure \u5BB9\u5668\u6CE8\u518C\u8868\uFF0C\u4F7F\u7528"),vt={href:"https://github.com/chrismellard/docker-credential-acr-env/",target:"_blank",rel:"noopener noreferrer"},kt=s("\u73AF\u5883\u53D8\u91CF"),bt=n("li",null,[n("p",null,[s("GitHub Container Registry\uFF0C\u4F7F\u7528"),n("code",null,"GITHUB_TOKEN"),s("\u73AF\u5883\u53D8\u91CF")])],-1),ht=t(`<p><code>ko</code>\u53D6\u51B3\u4E8E\u73AF\u5883\u53D8\u91CF \uFF0C<code>KO_DOCKER_REPO</code>\u6765\u786E\u5B9A\u5E94\u5C06\u5176\u6784\u5EFA\u7684\u6620\u50CF\u63A8\u9001\u5230\u4F55\u5904\u3002\u901A\u5E38\u8FD9\u5C06\u662F\u8FDC\u7A0B\u6CE8\u518C\u8868\uFF0C\u4F8B\u5982\uFF1A</p><ul><li><code>KO_DOCKER_REPO=gcr.io/my-project</code>\uFF0C \u6216\u8005</li><li><code>KO_DOCKER_REPO=ghcr.io/my-org/my-repo</code>\uFF0C \u6216\u8005</li><li><code>KO_DOCKER_REPO=my-dockerhub-user</code></li></ul><p><strong>\u6B65\u9AA4\uFF1A</strong></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>echo <span class="token string">&quot;***&quot;</span> <span class="token operator">|</span> docker login ghcr<span class="token punctuation">.</span>io <span class="token operator">-</span>u kuebcub <span class="token operator">--</span>password<span class="token operator">-</span>stdin
<span class="token keyword">export</span> <span class="token constant">GITHUB_TOKEN</span><span class="token operator">=</span><span class="token string">&quot;******&quot;</span>
<span class="token keyword">export</span> <span class="token constant">KO_DOCKER_REPO</span><span class="token operator">=</span>ghcr<span class="token punctuation">.</span>io<span class="token operator">/</span>kubecub<span class="token operator">/</span>exporter<span class="token punctuation">;</span> ko build <span class="token punctuation">.</span><span class="token operator">/</span>cmd<span class="token operator">/</span>exporter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6D4B\u8BD5\uFF1A</strong></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>docker run <span class="token operator">-</span>p <span class="token number">8080</span><span class="token operator">:</span><span class="token number">8080</span> <span class="token function">$</span><span class="token punctuation">(</span>ko build <span class="token punctuation">.</span><span class="token operator">/</span>cmd<span class="token operator">/</span>app<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker-images-with-ko" tabindex="-1"><a class="header-anchor" href="#docker-images-with-ko" aria-hidden="true">#</a> Docker Images with Ko</h2><p>\u8BF7\u6CE8\u610F ko \u5C06\u518D\u6B21\u6784\u5EFA\u60A8\u7684\u4E8C\u8FDB\u5236\u6587\u4EF6\u3002\u8FD9\u4E0D\u5E94\u8BE5\u8FC7\u591A\u5730\u589E\u52A0\u53D1\u5E03\u65F6\u95F4\uFF0C\u56E0\u4E3A\u5B83\u4F1A\u5728\u53EF\u80FD\u7684\u60C5\u51B5\u4E0B\u4F7F\u7528\u4E0E\u6784\u5EFA\u7BA1\u9053\u76F8\u540C\u7684\u6784\u5EFA\u9009\u9879\uFF0C\u56E0\u6B64\u7ED3\u679C\u53EF\u80FD\u4F1A\u88AB\u7F13\u5B58\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
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
  # Default<span class="token operator">:</span> <span class="token string">&#39;cgr.dev/chainguard/static&#39;</span>
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
  # Default<span class="token operator">:</span> <span class="token string">&#39;linux/amd64&#39;</span>
  <span class="token literal-property property">platforms</span><span class="token operator">:</span>
  <span class="token operator">-</span> linux<span class="token operator">/</span>amd64
  <span class="token operator">-</span> linux<span class="token operator">/</span>arm64

  # Tag to build and push<span class="token punctuation">.</span>
  # Empty tags are ignored<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">&#39;latest&#39;</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">tags</span><span class="token operator">:</span>
  <span class="token operator">-</span> latest
  <span class="token operator">-</span> <span class="token string">&#39;{{.Tag}}&#39;</span>
  <span class="token operator">-</span> <span class="token string">&#39;{{if not .Prerelease}}stable{{end}}&#39;</span>

  # Creation time given to the image
  # <span class="token keyword">in</span> seconds since the Unix epoch <span class="token keyword">as</span> a string<span class="token punctuation">.</span>
  #
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">creation_time</span><span class="token operator">:</span> <span class="token string">&#39;{{.CommitTimestamp}}&#39;</span>

  # Creation time given to the files <span class="token keyword">in</span> the kodata directory
  # <span class="token keyword">in</span> seconds since the Unix epoch <span class="token keyword">as</span> a string<span class="token punctuation">.</span>
  #
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">ko_data_creation_time</span><span class="token operator">:</span> <span class="token string">&#39;{{.CommitTimestamp}}&#39;</span>

  # <span class="token constant">SBOM</span> format to use<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">&#39;spdx&#39;</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u662F\u4E00\u4E2A\u6700\u5C0F\u7684\u4F8B\u5B50\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yml
<span class="token literal-property property">before</span><span class="token operator">:</span>
  <span class="token literal-property property">hooks</span><span class="token operator">:</span>
    <span class="token operator">-</span> go mod tidy

<span class="token literal-property property">builds</span><span class="token operator">:</span>
  <span class="token operator">-</span> env<span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token string">&quot;CGO_ENABLED=1&quot;</span> <span class="token punctuation">]</span>
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
    <span class="token operator">-</span> <span class="token string">&#39;{{.Version}}&#39;</span>
    <span class="token operator">-</span> latest
    <span class="token literal-property property">bare</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token literal-property property">preserve_import_paths</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token literal-property property">platforms</span><span class="token operator">:</span>
    <span class="token operator">-</span> linux<span class="token operator">/</span>amd64
    <span class="token operator">-</span> linux<span class="token operator">/</span>arm64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u5C06\u4E3A \u3001 \u548C \u6784\u5EFA\u4E8C\u8FDB\u5236\u6587\u4EF6\uFF0C\u4EE5\u53CA Linux \u7684 Docker \u6620\u50CF\u548C\u6E05\u5355\u3002</p><h2 id="\u5305\u7684\u5927\u5C0F" tabindex="-1"><a class="header-anchor" href="#\u5305\u7684\u5927\u5C0F" aria-hidden="true">#</a> \u5305\u7684\u5927\u5C0F</h2><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
# Whether to enable the size reporting or not<span class="token punctuation">.</span>
<span class="token literal-property property">report_sizes</span><span class="token operator">:</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="metadata-\u5143\u6570\u636E" tabindex="-1"><a class="header-anchor" href="#metadata-\u5143\u6570\u636E" aria-hidden="true">#</a> Metadata\xA0\u5143\u6570\u636E</h2><p>GoReleaser \u5728\u5B8C\u6210\u8FD0\u884C\u4E4B\u524D\u4F1A\u5728\u6587\u4EF6\u5939\u4E2D\u521B\u5EFA\u4E00\u4E9B\u5143\u6570\u636E\u6587\u4EF6\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
#
<span class="token literal-property property">metadata</span><span class="token operator">:</span>
  # Set the modified timestamp on the metadata files<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed<span class="token punctuation">.</span>
  <span class="token literal-property property">mod_timestamp</span><span class="token operator">:</span> <span class="token string">&quot;{{ .CommitTimestamp }}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7B7E\u540D\u6821\u9A8C" tabindex="-1"><a class="header-anchor" href="#\u7B7E\u540D\u6821\u9A8C" aria-hidden="true">#</a> \u7B7E\u540D\u6821\u9A8C</h2><p>GoReleaser \u63D0\u4F9B\u4E86\u5BF9\u53EF\u6267\u884C\u6587\u4EF6\u548C\u6863\u6848\u8FDB\u884C\u7B7E\u540D\u7684\u65B9\u6CD5\u3002</p><p>\u7B7E\u540D\u4E0E\u6821\u9A8C\u548C\u6587\u4EF6\u7ED3\u5408\u4F7F\u7528\uFF0C\u901A\u5E38\u4EC5\u5BF9\u6821\u9A8C\u548C\u6587\u4EF6\u8FDB\u884C\u7B7E\u540D\u5C31\u8DB3\u591F\u4E86\u3002</p>`,20),gt=s("\u9ED8\u8BA4\u914D\u7F6E\u4E3A\u4F7F\u7528\u4EE5\u4E0B\u547D\u4EE4\u4E3A\u6821\u9A8C\u548C\u6587\u4EF6\u521B\u5EFA\u72EC\u7ACB\u7B7E\u540D"),yt={href:"https://www.gnupg.org/",target:"_blank",rel:"noopener noreferrer"},ft=s("GnuPG"),_t=s("\uFF0C\u4EE5\u53CA\u60A8\u7684\u9ED8\u8BA4\u5BC6\u94A5\u3002\u8981\u542F\u7528\u7B7E\u540D\u53EA\u9700\u6DFB\u52A0"),wt=t(`<div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">signs</span><span class="token operator">:</span>
  <span class="token operator">-</span> artifacts<span class="token operator">:</span> checksum
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8981\u81EA\u5B9A\u4E49\u7B7E\u540D\u7BA1\u9053\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528\u4EE5\u4E0B\u9009\u9879\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">signs</span><span class="token operator">:</span>
  <span class="token operator">-</span>
    # <span class="token constant">ID</span> <span class="token keyword">of</span> the sign config<span class="token punctuation">,</span> must be unique<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;default&#39;</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> foo

    # Name <span class="token keyword">of</span> the signature file<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;\${artifact}.sig&#39;</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">signature</span><span class="token operator">:</span> <span class="token string">&quot;\${artifact}_sig&quot;</span>

    # Path to the signature command
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;gpg&#39;</span>
    <span class="token literal-property property">cmd</span><span class="token operator">:</span> gpg2

    # Command line arguments <span class="token keyword">for</span> the command
    #
    # to sign <span class="token keyword">with</span> a specific key use
    # args<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;-u&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&lt;key id, fingerprint, email, ...&gt;&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;--output&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\${signature}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;--detach-sign&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\${artifact}&quot;</span><span class="token punctuation">]</span>
    #
    # Default<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;--output&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\${signature}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;--detach-sign&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\${artifact}&quot;</span><span class="token punctuation">]</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">args</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;--output&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\${signature}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\${artifact}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;{{ .ProjectName }}&quot;</span><span class="token punctuation">]</span>

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
    # Default<span class="token operator">:</span> <span class="token string">&#39;none&#39;</span>
    <span class="token literal-property property">artifacts</span><span class="token operator">:</span> all

    # IDs <span class="token keyword">of</span> the artifacts to sign<span class="token punctuation">.</span>
    #
    # If <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">artifacts</span><span class="token template-punctuation string">\`</span></span> is checksum or source<span class="token punctuation">,</span> <span class="token keyword">this</span> fields has no effect<span class="token punctuation">.</span>
    <span class="token literal-property property">ids</span><span class="token operator">:</span>
      <span class="token operator">-</span> foo
      <span class="token operator">-</span> bar

    # Stdin data to be given to the signature command <span class="token keyword">as</span> stdin<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">stdin</span><span class="token operator">:</span> <span class="token string">&#39;{{ .Env.GPG_PASSWORD }}&#39;</span>

    # StdinFile file to be given to the signature command <span class="token keyword">as</span> stdin<span class="token punctuation">.</span>
    <span class="token literal-property property">stdin_file</span><span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span><span class="token punctuation">.</span>password

    # Sets a certificate that your signing command should write to<span class="token punctuation">.</span>
    # You can later use <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span>certificate<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">\`</span></span> or <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">.Env.certificate</span><span class="token template-punctuation string">\`</span></span> <span class="token keyword">in</span> the <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">args</span><span class="token template-punctuation string">\`</span></span> section<span class="token punctuation">.</span>
    # This is particularly useful <span class="token keyword">for</span> keyless <span class="token function">signing</span> <span class="token punctuation">(</span><span class="token keyword">for</span> instance<span class="token punctuation">,</span> <span class="token keyword">with</span> cosign<span class="token punctuation">)</span><span class="token punctuation">.</span>
    # Note that <span class="token keyword">this</span> should be a name<span class="token punctuation">,</span> not a path<span class="token punctuation">.</span>
    <span class="token literal-property property">certificate</span><span class="token operator">:</span> <span class="token string">&#39;{{ trimsuffix .Env.artifact &quot;.tar.gz&quot; }}.pem&#39;</span>

    # List <span class="token keyword">of</span> environment variables that will be passed to the signing command
    # <span class="token keyword">as</span> well <span class="token keyword">as</span> the templates<span class="token punctuation">.</span>
    <span class="token literal-property property">env</span><span class="token operator">:</span>
    <span class="token operator">-</span> <span class="token constant">FOO</span><span class="token operator">=</span>bar
    <span class="token operator">-</span> <span class="token constant">HONK</span><span class="token operator">=</span>honkhonk

    # By <span class="token keyword">default</span><span class="token punctuation">,</span> the stdout and stderr <span class="token keyword">of</span> the signing cmd are discarded unless
    # GoReleaser is running <span class="token keyword">with</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">--debug</span><span class="token template-punctuation string">\`</span></span> set<span class="token punctuation">.</span>
    # You can <span class="token keyword">set</span> <span class="token keyword">this</span> to <span class="token boolean">true</span> <span class="token keyword">if</span> you want them to be displayed regardless<span class="token punctuation">.</span>
    #
    # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">2</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u53EF\u7528\u7684\u53D8\u91CF\u540D\u79F0" tabindex="-1"><a class="header-anchor" href="#\u53EF\u7528\u7684\u53D8\u91CF\u540D\u79F0" aria-hidden="true">#</a> \u53EF\u7528\u7684\u53D8\u91CF\u540D\u79F0</h3><p>\u8FD9\u4E9B\u73AF\u5883\u53D8\u91CF\u53EF\u80FD\u5728\u63A5\u53D7\u6A21\u677F\u7684\u5B57\u6BB5\u4E2D\u53EF\u7528\uFF1A</p><ul><li><code>\${artifact}</code>\uFF1A\u5C06\u88AB\u7B7E\u540D\u7684\u5DE5\u4EF6\u7684\u8DEF\u5F84</li><li><code>\${artifactID}</code>\uFF1A\u5C06\u88AB\u7B7E\u540D\u7684\u5DE5\u4EF6\u7684ID</li><li><code>\${certificate}</code>\uFF1A\u8BC1\u4E66\u6587\u4EF6\u540D\uFF08\u5982\u679C\u63D0\u4F9B\uFF09</li><li><code>\${signature}</code>: \u7B7E\u540D\u6587\u4EF6\u540D</li></ul><p>\u5047\u8BBE\u4F60\u6709\u4E00\u4E2A<code>cosign.key</code>\u5728\u5B58\u50A8\u5E93\u6839\u76EE\u5F55\u548C<code>COSIGN_PWD</code>\u73AF\u5883\u53D8\u91CF\u8BBE\u7F6E\uFF0C\u4E00\u4E2A\u7B80\u5355\u7684\u4F7F\u7528\u793A\u4F8B\u5982\u4E0B\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">signs</span><span class="token operator">:</span>
<span class="token operator">-</span> cmd<span class="token operator">:</span> cosign
  <span class="token literal-property property">stdin</span><span class="token operator">:</span> <span class="token string">&#39;{{ .Env.COSIGN_PWD }}&#39;</span>
  <span class="token literal-property property">args</span><span class="token operator">:</span>
  <span class="token operator">-</span> <span class="token string">&quot;sign-blob&quot;</span>
  <span class="token operator">-</span> <span class="token string">&quot;--key=cosign.key&quot;</span>
  <span class="token operator">-</span> <span class="token string">&quot;--output-signature=\${signature}&quot;</span>
  <span class="token operator">-</span> <span class="token string">&quot;\${artifact}&quot;</span>
  <span class="token operator">-</span> <span class="token string">&quot;--yes&quot;</span> # needed on cosign <span class="token number">2.0</span><span class="token number">.0</span><span class="token operator">+</span>
  <span class="token literal-property property">artifacts</span><span class="token operator">:</span> all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\uFF0C\u60A8\u7684\u7528\u6237\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u9A8C\u8BC1\u7B7E\u540D\uFF1A</p><p><code>cosign verify-blob -key cosign.pub -signature file.tar.gz.sig file.tar.gz</code></p><h2 id="\u5BF9-docker-\u6620\u50CF\u548C\u6E05\u5355\u8FDB\u884C\u7B7E\u540D" tabindex="-1"><a class="header-anchor" href="#\u5BF9-docker-\u6620\u50CF\u548C\u6E05\u5355\u8FDB\u884C\u7B7E\u540D" aria-hidden="true">#</a> \u5BF9 Docker \u6620\u50CF\u548C\u6E05\u5355\u8FDB\u884C\u7B7E\u540D</h2><p>\u4F7F\u7528 GoReleaser \u4E5F\u53EF\u4EE5\u5BF9 Docker \u6620\u50CF\u548C\u6E05\u5355\u8FDB\u884C\u7B7E\u540D\u3002\u8BE5\u7BA1\u9053\u662F\u6839\u636E\u901A\u7528\u6807\u5FD7\u7BA1\u9053\u8BBE\u8BA1\u7684\uFF0C\u5E76\u8003\u8651\u4E86\u5171\u7B7E\u540D\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yml
<span class="token literal-property property">docker_signs</span><span class="token operator">:</span>
  <span class="token operator">-</span>
    # <span class="token constant">ID</span> <span class="token keyword">of</span> the sign config<span class="token punctuation">,</span> must be unique<span class="token punctuation">.</span>
    # Only relevant <span class="token keyword">if</span> you want to produce some sort <span class="token keyword">of</span> signature file<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;default&#39;</span>
    <span class="token literal-property property">id</span><span class="token operator">:</span> foo

    # Path to the signature command
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;cosign&#39;</span>
    <span class="token literal-property property">cmd</span><span class="token operator">:</span> cosign

    # Command line arguments <span class="token keyword">for</span> the command
    #
    # Templates<span class="token operator">:</span> allowed
    # Default<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;sign&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;--key=cosign.key&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;\${artifact}@\${digest}&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;--yes&quot;</span><span class="token punctuation">]</span>
    <span class="token literal-property property">args</span><span class="token operator">:</span>
    <span class="token operator">-</span> <span class="token string">&quot;sign&quot;</span>
    <span class="token operator">-</span> <span class="token string">&quot;--key=cosign.key&quot;</span>
    <span class="token operator">-</span> <span class="token string">&quot;--upload=false&quot;</span>
    <span class="token operator">-</span> <span class="token string">&quot;\${artifact}&quot;</span>
    <span class="token operator">-</span> <span class="token string">&quot;--yes&quot;</span> # needed on cosign <span class="token number">2.0</span><span class="token number">.0</span><span class="token operator">+</span>

    # Which artifacts to sign
    #
    #   all<span class="token operator">:</span>       all artifacts
    #   none<span class="token operator">:</span>      no signing
    #   images<span class="token operator">:</span>    only docker images
    #   manifests<span class="token operator">:</span> only docker manifests
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;none&#39;</span>
    <span class="token literal-property property">artifacts</span><span class="token operator">:</span> all

    # IDs <span class="token keyword">of</span> the artifacts to sign<span class="token punctuation">.</span>
    <span class="token literal-property property">ids</span><span class="token operator">:</span>
      <span class="token operator">-</span> foo
      <span class="token operator">-</span> bar

    # Stdin data to be given to the signature command <span class="token keyword">as</span> stdin<span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">stdin</span><span class="token operator">:</span> <span class="token string">&#39;{{ .Env.COSIGN_PWD }}&#39;</span>

    # StdinFile file to be given to the signature command <span class="token keyword">as</span> stdin<span class="token punctuation">.</span>
    <span class="token literal-property property">stdin_file</span><span class="token operator">:</span> <span class="token punctuation">.</span><span class="token operator">/</span><span class="token punctuation">.</span>password

    # List <span class="token keyword">of</span> environment variables that will be passed to the signing command <span class="token keyword">as</span> well <span class="token keyword">as</span> the templates<span class="token punctuation">.</span>
    <span class="token literal-property property">env</span><span class="token operator">:</span>
    <span class="token operator">-</span> <span class="token constant">FOO</span><span class="token operator">=</span>bar
    <span class="token operator">-</span> <span class="token constant">HONK</span><span class="token operator">=</span>honkhonk

    # By <span class="token keyword">default</span><span class="token punctuation">,</span> the stdout and stderr <span class="token keyword">of</span> the signing cmd are discarded unless GoReleaser is running <span class="token keyword">with</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">--debug</span><span class="token template-punctuation string">\`</span></span> set<span class="token punctuation">.</span>
    # You can <span class="token keyword">set</span> <span class="token keyword">this</span> to <span class="token boolean">true</span> <span class="token keyword">if</span> you want them to be displayed regardless<span class="token punctuation">.</span>
    #
    # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">2</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E9B\u73AF\u5883\u53D8\u91CF\u53EF\u80FD\u5728\u53EF\u6A21\u677F\u5316\u7684\u5B57\u6BB5\u4E2D\u53EF\u7528\uFF1A</p><ul><li><code>\${artifact}</code>: \u5C06\u8981\u7B7E\u540D\u7684\u9879\u76EE\u7684\u8DEF\u5F84</li><li><code>\${digest}</code>: \u5C06\u7B7E\u540D\u7684\u6620\u50CF/\u6E05\u5355\u7684\u6458\u8981</li><li><code>\${artifactID}</code>: \u5C06\u8981\u7B7E\u540D\u7684\u9879\u76EE\u7684 ID</li><li><code>\${certificate}</code>: \u8BC1\u4E66\u6587\u4EF6\u540D\uFF08\u5982\u679C\u63D0\u4F9B\uFF09</li></ul><h2 id="release" tabindex="-1"><a class="header-anchor" href="#release" aria-hidden="true">#</a> Release</h2><p>GoReleaser \u53EF\u4EE5\u4F7F\u7528\u5F53\u524D\u6807\u7B7E\u521B\u5EFA GitHub/GitLab/Gitea \u7248\u672C\uFF0C\u4E0A\u4F20\u6240\u6709\u5DE5\u4EF6\uFF0C\u5E76\u6839\u636E\u81EA\u4E0A\u4E00\u4E2A\u6807\u7B7E\u4EE5\u6765\u7684\u65B0\u63D0\u4EA4\u751F\u6210\u66F4\u6539\u65E5\u5FD7\u3002</p><p>\u8BA9\u6211\u4EEC\u770B\u770B GitHub \u90E8\u5206\u53EF\u4EE5\u81EA\u5B9A\u4E49\u7684\u5185\u5BB9\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
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
  # Only effective <span class="token keyword">if</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">draft</span><span class="token template-punctuation string">\`</span></span> is <span class="token keyword">set</span> to <span class="token boolean">true</span><span class="token punctuation">.</span>
  # Available only <span class="token keyword">for</span> GitHub<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token boolean">false</span>
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">11</span>
  <span class="token literal-property property">replace_existing_draft</span><span class="token operator">:</span> <span class="token boolean">true</span>

  # Useful <span class="token keyword">if</span> you want to delay the creation <span class="token keyword">of</span> the tag <span class="token keyword">in</span> the remote<span class="token punctuation">.</span>
  # You can create the tag locally<span class="token punctuation">,</span> but not push it<span class="token punctuation">,</span> and run GoReleaser<span class="token punctuation">.</span>
  # It&#39;ll then <span class="token keyword">set</span> the <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">target_commitish</span><span class="token template-punctuation string">\`</span></span> portion <span class="token keyword">of</span> the GitHub release to the
  # value <span class="token keyword">of</span> <span class="token keyword">this</span> field<span class="token punctuation">.</span>
  # Only works on GitHub<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">11</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">target_commitish</span><span class="token operator">:</span> <span class="token string">&quot;{{ .Commit }}&quot;</span>

  # This allows to change which tag GitHub will create<span class="token punctuation">.</span>
  # Usually you&#39;ll use <span class="token keyword">this</span> together <span class="token keyword">with</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">target_commitish</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">,</span> or <span class="token keyword">if</span> you want to
  # publish a binary from a monorepo into a <span class="token keyword">public</span> repository somewhere<span class="token punctuation">,</span> without
  # the tag prefix<span class="token punctuation">.</span>
  #
  # Default<span class="token operator">:</span> <span class="token string">&#39;{{ .PrefixedCurrentTag }}&#39;</span>
  # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">19</span> <span class="token punctuation">(</span>pro<span class="token punctuation">)</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">&quot;{{ .CurrentTag }}&quot;</span>

  # If set<span class="token punctuation">,</span> will create a release discussion <span class="token keyword">in</span> the category specified<span class="token punctuation">.</span>
  #
  # Warning<span class="token operator">:</span> <span class="token keyword">do</span> not use categories <span class="token keyword">in</span> the <span class="token string">&#39;Announcement&#39;</span> format<span class="token punctuation">.</span>
  #  Check https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>goreleaser<span class="token operator">/</span>goreleaser<span class="token operator">/</span>issues<span class="token operator">/</span><span class="token number">2304</span> <span class="token keyword">for</span> more info<span class="token punctuation">.</span>
  #
  # Default is empty<span class="token punctuation">.</span>
  <span class="token literal-property property">discussion_category_name</span><span class="token operator">:</span> General

  # If <span class="token keyword">set</span> to auto<span class="token punctuation">,</span> will mark the release <span class="token keyword">as</span> not ready <span class="token keyword">for</span> production
  # <span class="token keyword">in</span> <span class="token keyword">case</span> there is an indicator <span class="token keyword">for</span> <span class="token keyword">this</span> <span class="token keyword">in</span> the tag e<span class="token punctuation">.</span>g<span class="token punctuation">.</span> v1<span class="token punctuation">.</span><span class="token number">0.0</span><span class="token operator">-</span>rc1
  # If <span class="token keyword">set</span> to <span class="token boolean">true</span><span class="token punctuation">,</span> will mark the release <span class="token keyword">as</span> not ready <span class="token keyword">for</span> production<span class="token punctuation">.</span>
  # Default is <span class="token boolean">false</span><span class="token punctuation">.</span>
  <span class="token literal-property property">prerelease</span><span class="token operator">:</span> auto

  # If <span class="token keyword">set</span> to <span class="token boolean">false</span><span class="token punctuation">,</span> will <span class="token constant">NOT</span> mark the release <span class="token keyword">as</span> <span class="token string">&quot;latest&quot;</span><span class="token punctuation">.</span>
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
  # <span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">keep-existing</span><span class="token template-punctuation string">\`</span></span><span class="token operator">:</span> keep the existing notes
  # <span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">append</span><span class="token template-punctuation string">\`</span></span><span class="token operator">:</span> append the current release notes to the existing notes
  # <span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">prepend</span><span class="token template-punctuation string">\`</span></span><span class="token operator">:</span> prepend the current release notes to the existing notes
  # <span class="token operator">-</span> <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">replace</span><span class="token template-punctuation string">\`</span></span><span class="token operator">:</span> replace existing notes
  #
  # Default is <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">keep-existing</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">.</span>
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
  # Default<span class="token operator">:</span> <span class="token string">&#39;{{.Tag}}&#39;</span> <span class="token punctuation">(</span><span class="token string">&#39;{{.PrefixedTag}}&#39;</span> on Pro<span class="token punctuation">)</span>
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">name_template</span><span class="token operator">:</span> <span class="token string">&quot;{{.ProjectName}}-v{{.Version}} {{.Env.USER}}&quot;</span>

  # You can disable <span class="token keyword">this</span> pipe <span class="token keyword">in</span> order to not create the release on any <span class="token constant">SCM</span><span class="token punctuation">.</span>
  # Keep <span class="token keyword">in</span> mind that <span class="token keyword">this</span> might also <span class="token keyword">break</span> things that depend on the release
  # <span class="token constant">URL</span><span class="token punctuation">,</span> <span class="token keyword">for</span> instance<span class="token punctuation">,</span> homebrew taps<span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> <span class="token function">allowed</span> <span class="token punctuation">(</span>since v1<span class="token punctuation">.</span><span class="token number">15</span><span class="token punctuation">)</span>
  <span class="token literal-property property">disable</span><span class="token operator">:</span> <span class="token boolean">true</span>

  # Set <span class="token keyword">this</span> to <span class="token boolean">true</span> <span class="token keyword">if</span> you want to disable just the artifact upload to the <span class="token constant">SCM</span><span class="token punctuation">.</span>
  # If <span class="token keyword">this</span> is <span class="token boolean">true</span><span class="token punctuation">,</span> GoReleaser will still create the release <span class="token keyword">with</span> the
  # changelog<span class="token punctuation">,</span> but won&#39;t upload anything to it<span class="token punctuation">.</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gpg-\u8BA4\u8BC1" tabindex="-1"><a class="header-anchor" href="#gpg-\u8BA4\u8BC1" aria-hidden="true">#</a> GPG \u8BA4\u8BC1</h2><p>GitHub \u652F\u6301\u591A\u79CD GPG \u5173\u952E\u7B97\u6CD5\u3002\u5982\u679C\u60A8\u5C1D\u8BD5\u6DFB\u52A0\u4F7F\u7528\u4E0D\u53D7\u652F\u6301\u7684\u7B97\u6CD5\u751F\u6210\u7684\u5BC6\u94A5\uFF0C\u5219\u53EF\u80FD\u4F1A\u9047\u5230\u9519\u8BEF\u3002</p><h3 id="\u68C0\u67E5\u73B0\u6709-gpg-\u5BC6\u94A5" tabindex="-1"><a class="header-anchor" href="#\u68C0\u67E5\u73B0\u6709-gpg-\u5BC6\u94A5" aria-hidden="true">#</a> \u68C0\u67E5\u73B0\u6709 GPG \u5BC6\u94A5</h3><p>\u4F7F\u7528\u8BE5<code>gpg --list-secret-keys --keyid-format=long</code>\u547D\u4EE4\u5217\u51FA\u60A8\u62E5\u6709\u516C\u94A5\u548C\u79C1\u94A5\u7684 GPG \u5BC6\u94A5\u7684\u957F\u683C\u5F0F\u3002\u7B7E\u7F72\u63D0\u4EA4\u6216\u6807\u7B7E\u9700\u8981\u79C1\u94A5\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>gpg <span class="token operator">--</span>list<span class="token operator">-</span>secret<span class="token operator">-</span>keys <span class="token operator">--</span>keyid<span class="token operator">-</span>format<span class="token operator">=</span>long
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u751F\u6210\u65B0\u7684-gpg-\u5BC6\u94A5" tabindex="-1"><a class="header-anchor" href="#\u751F\u6210\u65B0\u7684-gpg-\u5BC6\u94A5" aria-hidden="true">#</a> \u751F\u6210\u65B0\u7684 GPG \u5BC6\u94A5</h3><p>\u901A\u8FC7 git \u7684\u53C2\u6570\u6821\u9A8C\u3002\u914D\u7F6E\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>git config <span class="token operator">--</span>global gpg<span class="token punctuation">.</span>program gpg2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u751F\u6210\u5BC6\u94A5\u5BF9\uFF1A</strong></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>gpg <span class="token operator">--</span>full<span class="token operator">-</span>generate<span class="token operator">-</span>key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u68C0\u67E5\u5BC6\u94A5\u5BF9\uFF1A</strong></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>gpg <span class="token operator">--</span>list<span class="token operator">-</span>secret<span class="token operator">-</span>keys <span class="token operator">--</span>keyid<span class="token operator">-</span>format<span class="token operator">=</span>long
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4ECE GPG \u5BC6\u94A5\u5217\u8868\u4E2D\uFF0C\u590D\u5236\u60A8\u8981\u4F7F\u7528\u7684 GPG \u5BC6\u94A5 ID \u7684\u5B8C\u6574\u5F62\u5F0F\u3002</p><ol><li><p>\u5728\u6B64\u793A\u4F8B\u4E2D\uFF0CGPG \u5BC6\u94A5 ID \u4E3A<code>3AA5C34371567BD2</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ gpg --list-secret-keys --keyid-format=long
/Users/hubot/.gnupg/secring.gpg
------------------------------------
sec   4096R/3AA5C34371567BD2 2016-03-10 [expires: 2017-03-10]
uid                          Hubot &lt;hubot@example.com&gt;
ssb   4096R/4BB6D45482678BE3 2016-03-10
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u7C98\u8D34\u4E0B\u9762\u7684\u6587\u672C\uFF0C\u5E76\u5C06\u5176\u66FF\u6362\u4E3A\u60A8\u8981\u4F7F\u7528\u7684 GPG \u5BC6\u94A5 ID\u3002\u5728\u6B64\u793A\u4F8B\u4E2D\uFF0CGPG \u5BC6\u94A5 ID \u4E3A<code>3AA5C34371567BD2</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>gpg --armor --export 3AA5C34371567BD2
# Prints the GPG key ID, in ASCII armor format
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>\u590D\u5236\u60A8\u7684 GPG \u5BC6\u94A5\uFF0C\u4EE5 \u5F00\u5934<code>----BEGIN PGP PUBLIC KEY BLOCK-----</code>\u548C\u7ED3\u5C3E<code>----END PGP PUBLIC KEY BLOCK-----</code>\u3002</p></li></ol><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>cat <span class="token operator">/</span>root<span class="token operator">/</span><span class="token punctuation">.</span>gnupg<span class="token operator">/</span>openpgp<span class="token operator">-</span>revocs<span class="token punctuation">.</span>d<span class="token operator">/</span>4DDA37AE0F3AEA3044B33F1B1BAD6F395338EFDE<span class="token punctuation">.</span>rev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7136\u540E\u5C31\u662F\u5C06\u8FD9\u4E2A\u5BC6\u94A5\u94FE\u63A5\u5230\u4F60\u7684 GitHub \u8D26\u6237\u4E86\u3002\u8FD9\u4E2A\u64CD\u4F5C\u5F88\u7B80\u5355\uFF0C\u4E0D\u4ECB\u7ECD\u4E86</p><p><strong>\u544A\u8BC9 Git \u4F60\u7684\u7B7E\u540D\u5BC6\u94A5\uFF1A</strong></p><p>\u4F60\u8FD8\u9700\u8981\u544A\u8BC9 Git \u5173\u4E8E\u4F60\u7684 \u7B7E\u540D \u5BC6\u94A5\uFF0C\u56E0\u4E3A \u5982\u679C\u60A8\u6709\u591A\u4E2A GPG \u5BC6\u94A5\uFF0C\u5219\u9700\u8981\u544A\u8BC9 Git \u4F7F\u7528\u54EA\u4E00\u4E2A\u3002</p><ol><li><p>\u5982\u679C\u60A8\u4E4B\u524D\u5DF2\u5C06 Git \u914D\u7F6E\u4E3A\u5728\u4F7F\u7528 \u8FDB\u884C\u7B7E\u540D\u65F6\u4F7F\u7528\u4E0D\u540C\u7684\u5BC6\u94A5\u683C\u5F0F\uFF0C\u8BF7\u53D6\u6D88\u8BBE\u7F6E\u6B64\u914D\u7F6E\uFF0C\u4EE5\u4FBF\u4F7F\u7528<code>-gpg-sign</code>\u9ED8\u8BA4\u683C\u5F0F\u3002<code>openpgp</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>git config --global --unset gpg.format
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><p>\u4F7F\u7528\u8BE5<code>gpg --list-secret-keys --keyid-format=long</code>\u547D\u4EE4\u5217\u51FA\u60A8\u62E5\u6709\u516C\u94A5\u548C\u79C1\u94A5\u7684 GPG \u5BC6\u94A5\u7684\u957F\u683C\u5F0F\u3002\u7B7E\u7F72\u63D0\u4EA4\u6216\u6807\u7B7E\u9700\u8981\u79C1\u94A5\u3002</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>gpg <span class="token operator">--</span>list<span class="token operator">-</span>secret<span class="token operator">-</span>keys <span class="token operator">--</span>keyid<span class="token operator">-</span>format<span class="token operator">=</span>long
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u4ECE GPG \u5BC6\u94A5\u5217\u8868\u4E2D\uFF0C\u590D\u5236\u60A8\u8981\u4F7F\u7528\u7684 GPG \u5BC6\u94A5 ID \u7684\u5B8C\u6574\u5F62\u5F0F\u3002\u5728\u6B64\u793A\u4F8B\u4E2D\uFF0CGPG \u5BC6\u94A5 ID \u4E3A<code>3AA5C34371567BD2</code>\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>$ gpg <span class="token operator">--</span>list<span class="token operator">-</span>secret<span class="token operator">-</span>keys <span class="token operator">--</span>keyid<span class="token operator">-</span>format<span class="token operator">=</span>long
<span class="token operator">/</span>Users<span class="token operator">/</span>hubot<span class="token operator">/</span><span class="token punctuation">.</span>gnupg<span class="token operator">/</span>secring<span class="token punctuation">.</span>gpg
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
sec   4096R<span class="token operator">/</span>3AA5C34371567BD2 <span class="token number">2016</span><span class="token operator">-</span><span class="token number">03</span><span class="token operator">-</span><span class="token number">10</span> <span class="token punctuation">[</span>expires<span class="token operator">:</span> <span class="token number">2017</span><span class="token operator">-</span><span class="token number">03</span><span class="token operator">-</span><span class="token number">10</span><span class="token punctuation">]</span>
uid                          Hubot <span class="token operator">&lt;</span>hubot@example<span class="token punctuation">.</span>com<span class="token operator">&gt;</span>
ssb   4096R<span class="token operator">/</span>4BB6D45482678BE3 <span class="token number">2016</span><span class="token operator">-</span><span class="token number">03</span><span class="token operator">-</span><span class="token number">10</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8981\u5728 Git \u4E2D\u8BBE\u7F6E\u4E3B GPG \u7B7E\u540D\u5BC6\u94A5\uFF0C\u8BF7\u7C98\u8D34\u4E0B\u9762\u7684\u6587\u672C\uFF0C\u5E76\u66FF\u6362\u4E3A\u60A8\u8981\u4F7F\u7528\u7684 GPG \u4E3B\u5BC6\u94A5 ID\u3002\u5728\u6B64\u793A\u4F8B\u4E2D\uFF0CGPG \u5BC6\u94A5 ID \u4E3A<code>3AA5C34371567BD2</code>\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>git config <span class="token operator">--</span>global user<span class="token punctuation">.</span>signingkey 3AA5C34371567BD2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6216\u8005\uFF0C\u5728\u8BBE\u7F6E\u5B50\u9879\u65F6\u5305\u542B\u540E\u7F00<code>!</code>\u3002\u5728\u6B64\u793A\u4F8B\u4E2D\uFF0CGPG \u5B50\u5BC6\u94A5 ID \u4E3A<code>4BB6D45482678BE3</code>\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>git config <span class="token operator">--</span>global user<span class="token punctuation">.</span>signingkey 4BB6D45482678BE3<span class="token operator">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6216\u8005\uFF0C\u8981\u5C06 Git \u914D\u7F6E\u4E3A\u9ED8\u8BA4\u7B7E\u7F72\u6240\u6709\u63D0\u4EA4\uFF0C\u8BF7\u8F93\u5165\u4EE5\u4E0B\u547D\u4EE4\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>git config <span class="token operator">--</span>global commit<span class="token punctuation">.</span>gpgsign <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,48),xt={href:"https://docs.github.com/en/authentication/managing-commit-signature-verification/telling-git-about-your-signing-key#telling-git-about-your-ssh-key",target:"_blank",rel:"noopener noreferrer"},qt=s("\u544A\u8BC9 Git \u4F60\u7684 SSH \u5BC6\u94A5"),Dt=s("\u60A8\u53EF\u4EE5\u4F7F\u7528\u73B0\u6709\u7684 SSH \u5BC6\u94A5\u6765\u7B7E\u7F72\u63D0\u4EA4\u548C\u6807\u7B7E\uFF0C\u6216\u751F\u6210\u4E13\u95E8\u7528\u4E8E\u7B7E\u540D\u7684\u65B0\u5BC6\u94A5\u3002\u6709\u5173\u66F4\u591A\u4FE1\u606F\uFF0C\u8BF7\u53C2\u9605\u201C"),Tt={href:"https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent",target:"_blank",rel:"noopener noreferrer"},Gt=s("\u751F\u6210\u65B0\u7684 SSH \u5BC6\u94A5\u5E76\u5C06\u5176\u6DFB\u52A0\u5230 ssh-agent"),Pt=s("\xA0\u201D\u3002"),St=t(`<p><strong>\u6CE8\u610F\uFF1A</strong></p><p>\u6211\u4EEC\u53EF\u80FD\u9700\u8981\u5C06 <code>export GPG_TTY=$(tty)</code> \u6DFB\u52A0\u5230\u73AF\u5883\u53D8\u91CF\u4E2D</p><h3 id="\u7B7E\u540D\u6807\u7B7E" tabindex="-1"><a class="header-anchor" href="#\u7B7E\u540D\u6807\u7B7E" aria-hidden="true">#</a> \u7B7E\u540D\u6807\u7B7E</h3><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code>$ git tag <span class="token operator">-</span>s <span class="token constant">MYTAG</span>
# Creates a signed tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u901A\u8FC7\u8FD0\u884C\u9A8C\u8BC1\u60A8\u7684\u7B7E\u540D\u6807\u7B7E<code>git tag -v [tag-name]</code>\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>$ git tag -v MYTAG
# Verifies the signed tag
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4E91\u5B58\u50A8\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u4E91\u5B58\u50A8\u670D\u52A1" aria-hidden="true">#</a> \u4E91\u5B58\u50A8\u670D\u52A1</h2><p>\u5141\u8BB8\u60A8\u5C06\u5DE5\u4EF6\u4E0A\u4F20\u5230 Amazon S3\u3001Azure Blob \u548C Google GCS\u3002</p><p>\u5176\u5B9E\u4E0D\u4EC5\u4EC5\u662F\u8FD9\u4E9B\uFF0C\u8FD8\u6709\u5305\u62EC\u56FD\u5185\u7684 COS \u548C CSS</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">blobs</span><span class="token operator">:</span>
  # You can have multiple blob configs
  <span class="token operator">-</span> # Cloud provider name<span class="token operator">:</span>
    # <span class="token operator">-</span> s3 <span class="token keyword">for</span> <span class="token constant">AWS</span> <span class="token constant">S3</span> Storage
    # <span class="token operator">-</span> azblob <span class="token keyword">for</span> Azure Blob Storage
    # <span class="token operator">-</span> gs <span class="token keyword">for</span> Google Cloud Storage
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">provider</span><span class="token operator">:</span> azblob

    # Set a custom endpoint<span class="token punctuation">,</span> useful <span class="token keyword">if</span> you&#39;re using a minio backend or
    # other s3<span class="token operator">-</span>compatible backends<span class="token punctuation">.</span>
    #
    # Implies s3ForcePathStyle and requires provider to be <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">s3</span><span class="token template-punctuation string">\`</span></span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">endpoint</span><span class="token operator">:</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>minio<span class="token punctuation">.</span>foo<span class="token punctuation">.</span>bar

    # Sets the bucket region<span class="token punctuation">.</span>
    # Requires provider to be <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">s3</span><span class="token template-punctuation string">\`</span></span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">region</span><span class="token operator">:</span> us<span class="token operator">-</span>west<span class="token operator">-</span><span class="token number">1</span>

    # Disables <span class="token constant">SSL</span>
    # Requires provider to be <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">s3</span><span class="token template-punctuation string">\`</span></span>
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
    # Default<span class="token operator">:</span> <span class="token string">&#39;{{ .ProjectName }}/{{ .Tag }}&#39;</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">folder</span><span class="token operator">:</span> <span class="token string">&quot;foo/bar/{{.Version}}&quot;</span>

    # Whether to disable <span class="token keyword">this</span> particular upload configuration<span class="token punctuation">.</span>
    #
    # Since<span class="token operator">:</span> v1<span class="token punctuation">.</span><span class="token number">17</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">disable</span><span class="token operator">:</span> <span class="token string">&#39;{{ neq .BLOB_UPLOAD_ONLY &quot;foo&quot; }}&#39;</span>

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
    <span class="token literal-property property">folder</span><span class="token operator">:</span> <span class="token string">&quot;foo/bar/{{.Version}}&quot;</span>
  <span class="token operator">-</span> provider<span class="token operator">:</span> s3
    <span class="token literal-property property">bucket</span><span class="token operator">:</span> goreleaser<span class="token operator">-</span>bucket
    <span class="token literal-property property">folder</span><span class="token operator">:</span> <span class="token string">&quot;foo/bar/{{.Version}}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fury-io-apt-\u548C-rpm-\u5B58\u50A8\u5E93" tabindex="-1"><a class="header-anchor" href="#fury-io-apt-\u548C-rpm-\u5B58\u50A8\u5E93" aria-hidden="true">#</a> Fury.io (apt \u548C rpm \u5B58\u50A8\u5E93\uFF09</h3><p><strong>\u8FD9\u662F\u4E00\u4E2A\u9AD8\u7EA7\u529F\u80FD</strong>\uFF0C\u4F46\u662F sealos \u4E5F\u4F7F\u7528\u4E86\uFF0C\u7528\u7684\u662F bash \u903B\u8F91</p><p>\u60A8\u53EF\u4EE5\u4F7F\u7528 GoReleaser \u8F7B\u677E\u5730\u5728 fury.io \u4E0A\u521B\u5EFA\u548C\u5B58\u50A8\u5E93\u3002</p><p>\u9996\u5148\uFF0C\u60A8\u9700\u8981\u5728 fury.io \u4E0A\u521B\u5EFA\u4E00\u4E2A\u5E10\u6237\u5E76\u83B7\u53D6\u63A8\u9001\u4EE4\u724C\u3002</p><p>\u7136\u540E\uFF0C\u60A8\u9700\u8981\u5C06\u60A8\u7684\u5E10\u6237\u540D\u79F0\u4F20\u9012\u7ED9 GoReleaser\uFF0C\u5E76\u5C06\u60A8\u7684\u63A8\u9001\u4EE4\u724C\u4F5C\u4E3A\u540D\u4E3A <code>FURY_TOKEN</code> \uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">furies</span><span class="token operator">:</span>
<span class="token operator">-</span> account<span class="token operator">:</span> myaccount
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u5C06\u81EA\u52A8\u4E0A\u4F20\u60A8\u7684\u6240\u6709\u6587\u4EF6\u3002</p><p><strong>\u81EA\u5B9A\u4E49\uFF1A</strong></p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># goreleaser<span class="token punctuation">.</span>yaml

<span class="token literal-property property">furies</span><span class="token operator">:</span>
  <span class="token operator">-</span>
    # fury<span class="token punctuation">.</span>io account<span class="token punctuation">.</span>
    # Config is skipped <span class="token keyword">if</span> empty
    <span class="token literal-property property">account</span><span class="token operator">:</span> <span class="token string">&quot;{{ .Env.FURY_ACCOUNT }}&quot;</span>

    # Skip the announcing feature <span class="token keyword">in</span> some conditions<span class="token punctuation">,</span> <span class="token keyword">for</span> instance<span class="token punctuation">,</span> when
    # publishing patch releases<span class="token punctuation">.</span>
    # Any value different <span class="token keyword">of</span> <span class="token string">&#39;true&#39;</span> will be considered <span class="token string">&#39;false&#39;</span><span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">skip</span><span class="token operator">:</span> <span class="token string">&quot;{{gt .Patch 0}}&quot;</span>

    # Environment variable name to <span class="token keyword">get</span> the push token from<span class="token punctuation">.</span>
    # You might want to change it <span class="token keyword">if</span> you have multiple fury configurations <span class="token keyword">for</span>
    # some reason<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;FURY_TOKEN&#39;</span>
    <span class="token literal-property property">secret_name</span><span class="token operator">:</span> <span class="token constant">MY_ACCOUNT_FURY_TOKEN</span>

    # IDs to filter by<span class="token punctuation">.</span>
    # configurations <span class="token keyword">get</span> uploaded<span class="token punctuation">.</span>
    <span class="token literal-property property">ids</span><span class="token operator">:</span>
      <span class="token operator">-</span> packages

    # Formats to upload<span class="token punctuation">.</span>
    # Available options are <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">deb</span><span class="token template-punctuation string">\`</span></span> and <span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token string">rpm</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&#39;deb&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;rpm&#39;</span><span class="token punctuation">]</span>
    <span class="token literal-property property">formats</span><span class="token operator">:</span>
      <span class="token operator">-</span> deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="homebrew-taps" tabindex="-1"><a class="header-anchor" href="#homebrew-taps" aria-hidden="true">#</a> Homebrew Taps</h2><p>\u53D1\u5E03\u5230 GitHub\u3001GitLab \u6216 Gitea \u540E\uFF0CGoReleaser \u53EF\u4EE5\u751F\u6210 <em>homebrew-tap</em> \u5E76\u5C06\u5176\u53D1\u5E03\u5230\u60A8\u6709\u6743\u8BBF\u95EE\u7684\u5B58\u50A8\u5E93\u4E2D\u3002</p><h2 id="announce" tabindex="-1"><a class="header-anchor" href="#announce" aria-hidden="true">#</a> Announce</h2><p>GoReleaser\u8FD8\u53EF\u4EE5\u5728\u793E\u4EA4\u7F51\u7EDC\uFF0C\u804A\u5929\u5BA4\u548C\u7535\u5B50\u90AE\u4EF6\u4E0A\u5BA3\u5E03\u65B0\u7248\u672C\uFF01</p><p>\u5B83\u5728\u7BA1\u9053\u7684\u6700\u672B\u7AEF\u8FD0\u884C\uFF0C\u53EF\u4EE5\u4F7F\u7528\u547D\u4EE4\u7684\u6807\u5FD7\u6216\u901A\u8FC7 skip \u5C5E\u6027\u8DF3\u8FC7\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">announce</span><span class="token operator">:</span>
  # Skip the announcing feature <span class="token keyword">in</span> some conditions<span class="token punctuation">,</span> <span class="token keyword">for</span> instance<span class="token punctuation">,</span> when
  # publishing patch releases<span class="token punctuation">.</span>
  #
  # Any value different <span class="token keyword">from</span> <span class="token string">&#39;true&#39;</span> is evaluated to <span class="token boolean">false</span><span class="token punctuation">.</span>
  #
  # Templates<span class="token operator">:</span> allowed
  <span class="token literal-property property">skip</span><span class="token operator">:</span> <span class="token string">&quot;{{gt .Patch 0}}&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u76EE\u524D\u652F\u6301\u5F88\u591A\u4E2A\u8D26\u6237" tabindex="-1"><a class="header-anchor" href="#\u76EE\u524D\u652F\u6301\u5F88\u591A\u4E2A\u8D26\u6237" aria-hidden="true">#</a> \u76EE\u524D\u652F\u6301\u5F88\u591A\u4E2A\u8D26\u6237</h3><p><strong>Discode:</strong></p>`,27),jt=s("\u8981\u4F7F\u7528 Discord\uFF0C\u60A8\u9700\u8981\u521B\u5EFA\u4E00\u4E2A "),Et={href:"https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks",target:"_blank",rel:"noopener noreferrer"},At=s("Webhook"),Rt=s("\uFF0C\u5E76\u5728\u7BA1\u9053\u4E0A\u8BBE\u7F6E\u4EE5\u4E0B\u73AF\u5883\u53D8\u91CF\uFF1A"),Ct=t(`<ul><li><code>DISCORD_WEBHOOK_ID</code></li><li><code>DISCORD_WEBHOOK_TOKEN</code></li></ul><p>\u5728\u6B64\u4E4B\u540E\uFF0C\u60A8\u53EF\u4EE5\u5C06\u4EE5\u4E0B\u90E8\u5206\u6DFB\u52A0\u5230\u60A8\u7684\u914D\u7F6E\u4E2D\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">announce</span><span class="token operator">:</span>
  <span class="token literal-property property">discord</span><span class="token operator">:</span>
    # Whether its enabled or not<span class="token punctuation">.</span>
    <span class="token literal-property property">enabled</span><span class="token operator">:</span> <span class="token boolean">true</span>

    # Message template to use <span class="token keyword">while</span> publishing<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;{{ .ProjectName }} {{ .Tag }} is out! Check it out at {{ .ReleaseURL }}&#39;</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">message_template</span><span class="token operator">:</span> <span class="token string">&#39;Awesome project {{.Tag}} is out!&#39;</span>

    # Set author <span class="token keyword">of</span> the embed<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;GoReleaser&#39;</span>
    <span class="token literal-property property">author</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>

    # Color code <span class="token keyword">of</span> the embed<span class="token punctuation">.</span> You have to use decimal numeral system<span class="token punctuation">,</span> not hexadecimal<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;3888754&#39;</span> <span class="token punctuation">(</span>the grey<span class="token operator">-</span>ish from GoReleaser<span class="token punctuation">)</span>
    <span class="token literal-property property">color</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>

    # <span class="token constant">URL</span> to an image to use <span class="token keyword">as</span> the icon <span class="token keyword">for</span> the embed<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;https://goreleaser.com/static/avatar.png&#39;</span>
    <span class="token literal-property property">icon_url</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8981\u4F7F\u5176\u6B63\u5E38\u5DE5\u4F5C\uFF0C\u60A8\u9700\u8981\u5728\u7BA1\u9053\u4E0A\u8BBE\u7F6E\u4E00\u4E9B\u73AF\u5883\u53D8\u91CF\uFF1A</p><ul><li><code>LINKEDIN_ACCESS_TOKEN</code></li></ul><blockquote><p>We currently don&#39;t support posting in groups.</p></blockquote><p>\u7136\u540E\uFF0C\u60A8\u53EF\u4EE5\u5728\u914D\u7F6E\u4E2D\u6DFB\u52A0\u7C7B\u4F3C\u4EE5\u4E0B\u5185\u5BB9\u7684\u5185\u5BB9\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">announce</span><span class="token operator">:</span>
  <span class="token literal-property property">linkedin</span><span class="token operator">:</span>
    # Whether its enabled or not<span class="token punctuation">.</span>
    <span class="token literal-property property">enabled</span><span class="token operator">:</span> <span class="token boolean">true</span>

    # Message to use <span class="token keyword">while</span> publishing<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;{{ .ProjectName }} {{ .Tag }} is out! Check it out at {{ .ReleaseURL }}&#39;</span>
    <span class="token literal-property property">message_template</span><span class="token operator">:</span> <span class="token string">&#39;Awesome project {{.Tag}} is out!&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="slack" tabindex="-1"><a class="header-anchor" href="#slack" aria-hidden="true">#</a> slack</h3><p>\u548C discode \u4E00\u6837\uFF0C slack \u540C\u6837\u4E5F\u662F\u9700\u8981\u4F20\u5165\u4E00\u4E2A\u65B0\u7684 <code>Webhook</code></p><ul><li><code>SLACK_WEBHOOK</code></li></ul><p>\u7136\u540E\uFF0C\u60A8\u53EF\u4EE5\u5728\u914D\u7F6E\u4E2D\u6DFB\u52A0\u7C7B\u4F3C\u4EE5\u4E0B\u5185\u5BB9\u7684\u5185\u5BB9\uFF1A</p><div class="language-jsx ext-jsx line-numbers-mode"><pre class="language-jsx"><code># <span class="token punctuation">.</span>goreleaser<span class="token punctuation">.</span>yaml
<span class="token literal-property property">announce</span><span class="token operator">:</span>
  <span class="token literal-property property">slack</span><span class="token operator">:</span>
    # Whether its enabled or not<span class="token punctuation">.</span>
    <span class="token literal-property property">enabled</span><span class="token operator">:</span> <span class="token boolean">true</span>

    <span class="token operator">**</span><span class="token operator">**</span># Message template to use <span class="token keyword">while</span> publishing<span class="token punctuation">.</span>
    #
    # Default<span class="token operator">:</span> <span class="token string">&#39;{{ .ProjectName }} {{ .Tag }} is out! Check it out at {{ .ReleaseURL }}&#39;</span>
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">message_template</span><span class="token operator">:</span> <span class="token string">&#39;Awesome project {{.Tag}} is out!&#39;</span>

    # The name <span class="token keyword">of</span> the channel that the user selected <span class="token keyword">as</span> a destination <span class="token keyword">for</span> webhook messages<span class="token punctuation">.</span>
    <span class="token literal-property property">channel</span><span class="token operator">:</span> <span class="token string">&#39;#channel&#39;</span>

    # Set your Webhook&#39;s user name<span class="token punctuation">.</span>
    <span class="token literal-property property">username</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>

    # Emoji to use <span class="token keyword">as</span> the icon <span class="token keyword">for</span> <span class="token keyword">this</span> message<span class="token punctuation">.</span> Overrides icon_url<span class="token punctuation">.</span>
    <span class="token literal-property property">icon_emoji</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>

    # <span class="token constant">URL</span> to an image to use <span class="token keyword">as</span> the icon <span class="token keyword">for</span> <span class="token keyword">this</span> message<span class="token punctuation">.</span>
    <span class="token literal-property property">icon_url</span><span class="token operator">:</span> <span class="token string">&#39;&#39;</span>

    # Blocks <span class="token keyword">for</span> advanced formatting<span class="token punctuation">,</span> <span class="token literal-property property">see</span><span class="token operator">:</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>api<span class="token punctuation">.</span>slack<span class="token punctuation">.</span>com<span class="token operator">/</span>messaging<span class="token operator">/</span>webhooks#advanced_message_formatting
    # and https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>api<span class="token punctuation">.</span>slack<span class="token punctuation">.</span>com<span class="token operator">/</span>messaging<span class="token operator">/</span>composing<span class="token operator">/</span>layouts#adding<span class="token operator">-</span>blocks<span class="token punctuation">.</span>
    #
    # Attention<span class="token operator">:</span> goreleaser doesn&#39;t check the full structure <span class="token keyword">of</span> the Slack <span class="token constant">API</span><span class="token operator">:</span> please make sure that
    # your configuration <span class="token keyword">for</span> advanced message formatting abides by <span class="token keyword">this</span> <span class="token constant">API</span><span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">blocks</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    # Attachments<span class="token punctuation">,</span> <span class="token literal-property property">see</span><span class="token operator">:</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>api<span class="token punctuation">.</span>slack<span class="token punctuation">.</span>com<span class="token operator">/</span>reference<span class="token operator">/</span>messaging<span class="token operator">/</span>attachments
    #
    # Attention<span class="token operator">:</span> goreleaser doesn&#39;t check the full structure <span class="token keyword">of</span> the Slack <span class="token constant">API</span><span class="token operator">:</span> please make sure that
    # your configuration <span class="token keyword">for</span> advanced message formatting abides by <span class="token keyword">this</span> <span class="token constant">API</span><span class="token punctuation">.</span>
    #
    # Templates<span class="token operator">:</span> allowed
    <span class="token literal-property property">attachments</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u94FE\u63A5" aria-hidden="true">#</a> \u94FE\u63A5</h2>`,14),Ot={href:"https://docs.docker.com/engine/reference/commandline/manifest/",target:"_blank",rel:"noopener noreferrer"},It=s("https://docs.docker.com/engine/reference/commandline/manifest/"),Nt=n("h2",{id:"end-\u94FE\u63A5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#end-\u94FE\u63A5","aria-hidden":"true"},"#"),s(" END \u94FE\u63A5")],-1),Bt=n("ul",null,[n("li",null,[n("div",null,[n("a",{href:"85.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"87.md",style:{float:"right"}}," \uFE0F\u4E0B\u4E00\u8282\u{1F517}")])])],-1),Lt=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),Mt={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},Ht=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),Ft=s(")"),zt=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),Kt={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},Ut=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function Yt($t,Vt){const e=o("ExternalLinkIcon"),i=o("RouterLink");return p(),c("div",null,[n("ul",null,[n("li",null,[n("a",u,[m,a(e)])])]),v,k,b,n("blockquote",null,[n("p",null,[h,n("a",g,[y,a(e)]),f,n("a",_,[w,a(e)]),x,n("a",q,[D,a(e)])])]),T,G,P,S,j,n("ul",null,[n("li",null,[E,A,n("a",R,[C,a(e)]),O]),I,N]),B,n("p",null,[L,n("a",M,[H,a(e)]),F,z,K]),U,n("p",null,[Y,n("a",$,[V,a(e)]),W]),X,n("p",null,[Z,n("a",J,[Q,a(e)]),nn,sn,an,en,tn]),n("p",null,[on,n("a",ln,[pn,a(e)]),cn]),rn,n("p",null,[dn,n("a",un,[mn,a(e)]),vn]),kn,n("p",null,[bn,n("a",hn,[gn,a(e)]),yn,n("a",fn,[_n,a(e)]),wn]),xn,n("p",null,[qn,n("a",Dn,[Tn,a(e)]),Gn]),n("ul",null,[n("li",null,[Pn,Sn,n("ul",null,[n("li",null,[n("a",jn,[En,a(e)]),An]),n("li",null,[Rn,n("a",Cn,[On,a(e)]),In,n("a",Nn,[Bn,a(e)]),Ln])])]),n("li",null,[n("p",null,[Mn,Hn,n("a",Fn,[zn,a(e)]),Kn])]),n("li",null,[n("p",null,[Un,Yn,n("a",$n,[Vn,a(e)])])])]),n("p",null,[Wn,Xn,n("a",Zn,[Jn,a(e)]),Qn]),ns,n("p",null,[n("a",ss,[as,a(e)]),es]),n("p",null,[ts,n("a",os,[is,a(e)]),ls]),ps,n("table",null,[cs,n("tbody",null,[rs,n("tr",null,[ds,n("td",null,[us,n("a",ms,[vs,a(e)]),ks])]),bs,hs,gs,ys,fs,_s,ws,xs,qs,Ds,Ts,Gs,n("tr",null,[Ps,n("td",null,[Ss,n("a",js,[Es,a(e)]),As])]),n("tr",null,[Rs,n("td",null,[Cs,n("a",Os,[Is,a(e)]),Ns])]),n("tr",null,[Bs,n("td",null,[Ls,n("a",Ms,[Hs,a(e)]),Fs])]),n("tr",null,[zs,n("td",null,[Ks,n("a",Us,[Ys,a(e)]),$s])]),n("tr",null,[Vs,n("td",null,[Ws,Xs,Zs,n("a",Js,[Qs,a(e)]),na])]),sa,aa,ea,ta,oa,ia,la,pa,ca,n("tr",null,[ra,n("td",null,[da,n("a",ua,[ma,a(e)]),va])]),n("tr",null,[ka,n("td",null,[ba,n("a",ha,[ga,a(e)]),ya])]),n("tr",null,[fa,n("td",null,[_a,n("a",wa,[xa,a(e)]),qa])]),n("tr",null,[Da,n("td",null,[Ta,n("a",Ga,[Pa,a(e)]),Sa])]),n("tr",null,[ja,n("td",null,[Ea,Aa,Ra,n("a",Ca,[Oa,a(e)]),Ia])]),Na,n("tr",null,[Ba,n("td",null,[La,n("a",Ma,[Ha,a(e)]),Fa])]),n("tr",null,[za,n("td",null,[Ka,n("a",Ua,[Ya,a(e)]),$a])]),n("tr",null,[Va,n("td",null,[Wa,n("a",Xa,[Za,a(e)]),Ja])]),Qa,ne,se])]),ae,n("p",null,[ee,n("a",te,[oe,a(e)]),ie]),le,n("p",null,[pe,ce,re,de,ue,me,ve,n("a",ke,[be,a(e)]),he,ge]),ye,n("p",null,[fe,_e,we,xe,qe,n("a",De,[Te,a(e)]),Ge,Pe]),Se,n("p",null,[je,n("a",Ee,[Ae,a(e)]),Re,Ce,Oe,Ie,Ne,Be,Le,Me,He]),Fe,n("p",null,[ze,n("a",Ke,[Ue,a(e)]),Ye]),$e,n("ul",null,[n("li",null,[n("a",Ve,[We,a(e)])])]),Xe,n("p",null,[Ze,n("a",Je,[Qe,a(e)]),nt]),st,n("p",null,[n("a",at,[et,a(e)])]),tt,n("ul",null,[n("li",null,[n("p",null,[ot,n("a",it,[lt,a(e)]),pt]),ct]),n("li",null,[n("p",null,[rt,n("a",dt,[ut,a(e)])])]),n("li",null,[n("p",null,[mt,n("a",vt,[kt,a(e)])])]),bt]),ht,n("p",null,[gt,n("a",yt,[ft,a(e)]),_t]),wt,n("ul",null,[n("li",null,[n("a",xt,[qt,a(e)])])]),n("p",null,[Dt,n("a",Tt,[Gt,a(e)]),Pt]),St,n("p",null,[jt,n("a",Et,[At,a(e)]),Rt]),Ct,n("ul",null,[n("li",null,[n("a",Ot,[It,a(e)])])]),Nt,Bt,n("ul",null,[n("li",null,[n("p",null,[a(i,{to:"/"},{default:r(()=>[Lt]),_:1})])]),n("li",null,[n("p",null,[n("a",Mt,[Ht,a(e)]),Ft])]),n("li",null,[n("p",null,[zt,n("a",Kt,[Ut,a(e)])])])])])}const Xt=l(d,[["render",Yt],["__file","86.html.vue"]]);export{Xt as default};
