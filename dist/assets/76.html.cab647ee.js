import{_ as l,r as t,o as a,c as u,a as e,b as o,w as c,e as n,d as s}from"./app.5bf1abd2.js";const r={},v={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},m=n("author"),q=e("h1",{id:"\u7B2C76\u8282-openim-arm-\u67B6\u6784\u8BBE\u8BA1",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C76\u8282-openim-arm-\u67B6\u6784\u8BBE\u8BA1","aria-hidden":"true"},"#"),n(" \u7B2C76\u8282 OpenIM arm \u67B6\u6784\u8BBE\u8BA1")],-1),b=e("div",null,[e("a",{href:"75.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"77.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),p=e("br",null,null,-1),_=n("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),h={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},f=n("sealos"),g=n("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),k={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},x=n("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),y=n("\u3002Myblog:"),L={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},D=n("http://nsddd.top"),C=e("hr",null,null,-1),E=e("p",null,"[TOC]",-1),T=e("h2",{id:"\u5F00\u59CB",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u5F00\u59CB","aria-hidden":"true"},"#"),n(" \u5F00\u59CB")],-1),w=e("p",null,[n("\u6211\u4EEC\u77E5\u9053\u4F7F\u7528\u955C\u50CF\u521B\u5EFA\u4E00\u4E2A\u5BB9\u5668\uFF0C\u8BE5\u955C\u50CF\u5FC5\u987B\u4E0E Docker \u5BBF\u4E3B\u673A\u7CFB\u7EDF\u67B6\u6784\u4E00\u81F4\uFF0C\u4F8B\u5982 "),e("code",null,"Linux x86_64"),n(" \u67B6\u6784\u7684\u7CFB\u7EDF\u4E2D\u53EA\u80FD\u4F7F\u7528 "),e("code",null,"Linux x86_64"),n(" \u7684\u955C\u50CF\u521B\u5EFA\u5BB9\u5668\u3002")],-1),j=n("Windows\u3001macOS \u9664\u5916\uFF0C\u5176\u4F7F\u7528\u4E86 "),z={href:"https://docs.docker.com/docker-for-mac/multi-arch/",target:"_blank",rel:"noopener noreferrer"},N=n("binfmt_misc"),O=n(" \u63D0\u4F9B\u4E86\u591A\u79CD\u67B6\u6784\u652F\u6301\uFF0C\u5728 Windows\u3001macOS \u7CFB\u7EDF\u4E0A (x86_64) \u53EF\u4EE5\u8FD0\u884C arm \u7B49\u5176\u4ED6\u67B6\u6784\u7684\u955C\u50CF\u3002"),V=s(`<p>\u4F8B\u5982\u6211\u4EEC\u5728 <code>Linux x86_64</code> \u4E2D\u6784\u5EFA\u4E00\u4E2A <code>username/test</code> \u955C\u50CF\u3002</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>FROM alpine

CMD echo <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6784\u5EFA\u955C\u50CF\u540E\u63A8\u9001\u5230 Docker Hub\uFF0C\u4E4B\u540E\u6211\u4EEC\u5C1D\u8BD5\u5728\u6811\u8393\u6D3E <code>Linux arm64v8</code> \u4E2D\u4F7F\u7528\u8FD9\u4E2A\u955C\u50CF\u3002</p><p>\u53EF\u4EE5\u53D1\u73B0\u8FD9\u4E2A\u955C\u50CF\u6839\u672C\u83B7\u53D6\u4E0D\u5230\u3002</p><p>\u8981\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\uFF0C\u901A\u5E38\u91C7\u7528\u7684\u505A\u6CD5\u662F\u901A\u8FC7\u955C\u50CF\u540D\u533A\u5206\u4E0D\u540C\u7CFB\u7EDF\u67B6\u6784\u7684\u955C\u50CF\uFF0C\u4F8B\u5982\u5728 <code>Linux x86_64</code> \u548C <code>Linux arm64v8</code> \u5206\u522B\u6784\u5EFA <code>username/test</code> \u548C <code>username/arm64v8-test</code> \u955C\u50CF\u3002\u8FD0\u884C\u65F6\u4F7F\u7528\u5BF9\u5E94\u67B6\u6784\u7684\u955C\u50CF\u5373\u53EF\u3002</p><p>\u8FD9\u6837\u505A\u663E\u5F97\u5F88\u7E41\u7410\uFF0C\u90A3\u4E48\u6709\u6CA1\u6709\u4E00\u79CD\u65B9\u6CD5\u8BA9 Docker \u5F15\u64CE\u6839\u636E\u7CFB\u7EDF\u67B6\u6784\u81EA\u52A8\u62C9\u53D6\u5BF9\u5E94\u7684\u955C\u50CF\u5462\uFF1F</p><p>\u6211\u4EEC\u53D1\u73B0\u5728 <code>Linux x86_64</code> \u548C <code>Linux arm64v8</code> \u67B6\u6784\u7684\u8BA1\u7B97\u673A\u4E2D\u5206\u522B\u4F7F\u7528 <code>golang:alpine</code> \u955C\u50CF\u8FD0\u884C\u5BB9\u5668 <code>$ docker run golang:alpine go version</code> \u65F6\uFF0C\u5BB9\u5668\u80FD\u591F\u6B63\u5E38\u7684\u8FD0\u884C\u3002</p><p>\u8FD9\u6837\u505A\u663E\u5F97\u5F88\u7E41\u7410\uFF0C\u90A3\u4E48\u6709\u6CA1\u6709\u4E00\u79CD\u65B9\u6CD5\u8BA9 Docker \u5F15\u64CE\u6839\u636E\u7CFB\u7EDF\u67B6\u6784\u81EA\u52A8\u62C9\u53D6\u5BF9\u5E94\u7684\u955C\u50CF\u5462\uFF1F</p><p>\u6211\u4EEC\u53D1\u73B0\u5728 <code>Linux x86_64</code> \u548C <code>Linux arm64v8</code> \u67B6\u6784\u7684\u8BA1\u7B97\u673A\u4E2D\u5206\u522B\u4F7F\u7528 <code>golang:alpine</code> \u955C\u50CF\u8FD0\u884C\u5BB9\u5668 <code>$ docker run golang:alpine go version</code> \u65F6\uFF0C\u5BB9\u5668\u80FD\u591F\u6B63\u5E38\u7684\u8FD0\u884C\u3002</p><blockquote><p>\u8FD9\u662F\u4EC0\u4E48\u539F\u56E0\u5462\uFF1F</p></blockquote>`,10),A=n("\u539F\u56E0\u5C31\u662F "),B=e("code",null,"golang:alpine",-1),M=n(" \u5B98\u65B9\u955C\u50CF\u6709\u4E00\u4E2A "),S={href:"https://docs.docker.com/registry/spec/manifest-v2-2/",target:"_blank",rel:"noopener noreferrer"},$=e("code",null,"manifest",-1),I=n(" \u5217\u8868 ("),R=e("code",null,"manifest list",-1),W=n(")"),F=n("\u3002"),H=s(`<p>\u5F53\u7528\u6237\u83B7\u53D6\u4E00\u4E2A\u955C\u50CF\u65F6\uFF0CDocker \u5F15\u64CE\u4F1A\u9996\u5148\u67E5\u627E\u8BE5\u955C\u50CF\u662F\u5426\u6709 <code>manifest</code> \u5217\u8868\uFF0C\u5982\u679C\u6709\u7684\u8BDD Docker \u5F15\u64CE\u4F1A\u6309\u7167 Docker \u8FD0\u884C\u73AF\u5883\uFF08\u7CFB\u7EDF\u53CA\u67B6\u6784\uFF09\u67E5\u627E\u51FA\u5BF9\u5E94\u955C\u50CF\uFF08\u4F8B\u5982 <code>golang:alpine</code>\uFF09\u3002\u5982\u679C\u6CA1\u6709\u7684\u8BDD\u4F1A\u76F4\u63A5\u83B7\u53D6\u955C\u50CF\uFF08\u4F8B\u5982\u4E0A\u4F8B\u4E2D\u6211\u4EEC\u6784\u5EFA\u7684 <code>username/test</code>\uFF09\u3002</p><p>\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 <code>$ docker manifest inspect golang:alpine</code> \u67E5\u770B\u8FD9\u4E2A <code>manifest</code> \u5217\u8868\u7684\u7ED3\u6784\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">docker</span> manifest inspect golang:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u914D\u7F6E\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>{
   &quot;schemaVersion&quot;: 2,
   &quot;mediaType&quot;: &quot;application/vnd.docker.distribution.manifest.list.v2+json&quot;,
   &quot;manifests&quot;: [
      {
         &quot;mediaType&quot;: &quot;application/vnd.docker.distribution.manifest.v2+json&quot;,
         &quot;size&quot;: 1365,
         &quot;digest&quot;: &quot;sha256:5e28ac423243b187f464d635bcfe1e909f4a31c6c8bce51d0db0a1062bec9e16&quot;,
         &quot;platform&quot;: {
            &quot;architecture&quot;: &quot;amd64&quot;,
            &quot;os&quot;: &quot;linux&quot;
         }
      },
      {
         &quot;mediaType&quot;: &quot;application/vnd.docker.distribution.manifest.v2+json&quot;,
         &quot;size&quot;: 1365,
         &quot;digest&quot;: &quot;sha256:2945c46e26c9787da884b4065d1de64cf93a3b81ead1b949843dda1fcd458bae&quot;,
         &quot;platform&quot;: {
            &quot;architecture&quot;: &quot;arm&quot;,
            &quot;os&quot;: &quot;linux&quot;,
            &quot;variant&quot;: &quot;v7&quot;
         }
      },
      {
         &quot;mediaType&quot;: &quot;application/vnd.docker.distribution.manifest.v2+json&quot;,
         &quot;size&quot;: 1365,
         &quot;digest&quot;: &quot;sha256:87fff60114fd3402d0c1a7ddf1eea1ded658f171749b57dc782fd33ee2d47b2d&quot;,
         &quot;platform&quot;: {
            &quot;architecture&quot;: &quot;arm64&quot;,
            &quot;os&quot;: &quot;linux&quot;,
            &quot;variant&quot;: &quot;v8&quot;
         }
      },
      {
         &quot;mediaType&quot;: &quot;application/vnd.docker.distribution.manifest.v2+json&quot;,
         &quot;size&quot;: 1365,
         &quot;digest&quot;: &quot;sha256:607b43f1d91144f82a9433764e85eb3ccf83f73569552a49bc9788c31b4338de&quot;,
         &quot;platform&quot;: {
            &quot;architecture&quot;: &quot;386&quot;,
            &quot;os&quot;: &quot;linux&quot;
         }
      },
      {
         &quot;mediaType&quot;: &quot;application/vnd.docker.distribution.manifest.v2+json&quot;,
         &quot;size&quot;: 1365,
         &quot;digest&quot;: &quot;sha256:25ead0e21ed5e246ce31e274b98c09aaf548606788ef28eaf375dc8525064314&quot;,
         &quot;platform&quot;: {
            &quot;architecture&quot;: &quot;ppc64le&quot;,
            &quot;os&quot;: &quot;linux&quot;
         }
      },
      {
         &quot;mediaType&quot;: &quot;application/vnd.docker.distribution.manifest.v2+json&quot;,
         &quot;size&quot;: 1365,
         &quot;digest&quot;: &quot;sha256:69f5907fa93ea591175b2c688673775378ed861eeb687776669a48692bb9754d&quot;,
         &quot;platform&quot;: {
            &quot;architecture&quot;: &quot;s390x&quot;,
            &quot;os&quot;: &quot;linux&quot;
         }
      }
   ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53EF\u4EE5\u770B\u51FA <code>manifest</code> \u5217\u8868\u4E2D\u5305\u542B\u4E86\u4E0D\u540C\u7CFB\u7EDF\u67B6\u6784\u6240\u5BF9\u5E94\u7684\u955C\u50CF <code>digest</code> \u503C\uFF0C\u8FD9\u6837 Docker \u5C31\u53EF\u4EE5\u5728\u4E0D\u540C\u7684\u67B6\u6784\u4E2D\u4F7F\u7528\u76F8\u540C\u7684 <code>manifest</code> (\u4F8B\u5982 <code>golang:alpine</code>) \u83B7\u53D6\u5BF9\u5E94\u7684\u955C\u50CF\u3002</p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="75.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="77.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,8),Y=n("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),G={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},J=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),K=n(")"),P=n("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),Q={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},U=n("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function X(Z,ee){const i=t("ExternalLinkIcon"),d=t("RouterLink");return a(),u("div",null,[e("ul",null,[e("li",null,[e("a",v,[m,o(i)])])]),q,b,p,e("blockquote",null,[e("p",null,[_,e("a",h,[f,o(i)]),g,e("a",k,[x,o(i)]),y,e("a",L,[D,o(i)])])]),C,E,T,w,e("blockquote",null,[e("p",null,[j,e("a",z,[N,o(i)]),O])]),V,e("p",null,[A,B,M,e("a",S,[$,I,R,W,o(i)]),F]),H,e("ul",null,[e("li",null,[e("p",null,[o(d,{to:"/"},{default:c(()=>[Y]),_:1})])]),e("li",null,[e("p",null,[e("a",G,[J,o(i)]),K])]),e("li",null,[e("p",null,[P,e("a",Q,[U,o(i)])])])])])}const oe=l(r,[["render",X],["__file","76.html.vue"]]);export{oe as default};
