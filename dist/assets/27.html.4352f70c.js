import{_ as i,r as o,o as l,c as u,a as e,b as s,w as d,e as n,d as t}from"./app.ee8200d6.js";const c={},h={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},p=n("author"),_=e("h1",{id:"\u7B2C27\u8282-unshare-\u548C-newuidmap",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C27\u8282-unshare-\u548C-newuidmap","aria-hidden":"true"},"#"),n(" \u7B2C27\u8282 unshare \u548C newuidmap")],-1),b=e("div",null,[e("a",{href:"26.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"28.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),m=e("br",null,null,-1),g=n("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),k={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},f=n("sealos"),v=n("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),x={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},w=n("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),y=n("\u3002Myblog:"),E={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},C=n("http://nsddd.top"),D=t(`<hr><p>[TOC]</p><h2 id="\u5BF9\u6BD4" tabindex="-1"><a class="header-anchor" href="#\u5BF9\u6BD4" aria-hidden="true">#</a> \u5BF9\u6BD4</h2><p>unshare \u548C newuidmap \u662F Linux \u7684\u7CFB\u7EDF\u8C03\u7528\uFF0C\u5B83\u4EEC\u4E3B\u8981\u7528\u4E8E\u5B9E\u73B0\u547D\u540D\u7A7A\u95F4\u9694\u79BB\u3002</p><ul><li><p><code>unshare</code>: unshare \u5141\u8BB8\u8FDB\u7A0B\u5728\u8FD0\u884C\u65F6\u521B\u5EFA\u548C\u9694\u79BB\u65B0\u7684\u547D\u540D\u7A7A\u95F4\u3002\u4F8B\u5982\uFF0C\u53EF\u4EE5\u4F7F\u7528 unshare \u521B\u5EFA\u4E00\u4E2A\u65B0\u7684 PID \u547D\u540D\u7A7A\u95F4\uFF0C\u4ECE\u800C\u4F7F\u4E00\u4E2A\u8FDB\u7A0B\u5728\u65B0\u7684\u547D\u540D\u7A7A\u95F4\u4E2D\u8FD0\u884C\uFF0C\u5E76\u4E14\u4E0E\u539F\u6765\u7684\u547D\u540D\u7A7A\u95F4\u9694\u79BB\u3002</p></li><li><p><code>newuidmap</code>: newuidmap \u5DE5\u5177\u7528\u4E8E\u5728\u5BB9\u5668\u4E2D\u63A7\u5236\u7528\u6237 ID \u6620\u5C04\uFF0C\u8FD9\u662F\u5B9E\u73B0\u5BB9\u5668\u7684\u5FC5\u8981\u6B65\u9AA4\u3002\u5728\u5BB9\u5668\u4E2D\uFF0C\u9700\u8981\u5728\u4E3B\u673A\u548C\u5BB9\u5668\u95F4\u8FDB\u884C\u7528\u6237 ID \u7684\u6620\u5C04\uFF0C\u4EE5\u4FBF\u4F7F\u5BB9\u5668\u4E2D\u7684\u8FDB\u7A0B\u5177\u6709\u8BBF\u95EE\u6587\u4EF6\u7CFB\u7EDF\u7684\u6743\u9650\u3002</p></li></ul><p>\u603B\u4F53\u6765\u8BF4\uFF0Cunshare \u53EF\u4EE5\u521B\u5EFA\u547D\u540D\u7A7A\u95F4\u9694\u79BB\uFF0C\u800C newuidmap \u5219\u7528\u4E8E\u5B9E\u73B0\u5BB9\u5668\u9694\u79BB\u4E2D\u7684\u7528\u6237 ID \u6620\u5C04\u3002</p><blockquote><p><strong>\u5B9E\u73B0 sealer \u5BF9 buildah \u5F97\u8C03\u7528\uFF0Csealer \u5728 root less \u6A21\u5F0F\u4E0B\u7684\u6B63\u5E38\u6302\u8F7D\uFF1Bbuildah\u662F\u5982\u4F55\u542F\u52A8rootless\u5BB9\u5668\u7684\u3002</strong></p></blockquote><h2 id="about-newuidmap" tabindex="-1"><a class="header-anchor" href="#about-newuidmap" aria-hidden="true">#</a> about newuidmap</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> newuidmap - \u8BBE\u7F6E\u7528\u6237\u547D\u540D\u7A7A\u95F4\u7684 uid \u6620\u5C04
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="about-unshare" tabindex="-1"><a class="header-anchor" href="#about-unshare" aria-hidden="true">#</a> about unshare</h2><p><strong>create a new PID:</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>unshare <span class="token parameter variable">-U</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="runuseer" tabindex="-1"><a class="header-anchor" href="#runuseer" aria-hidden="true">#</a> runuseer</h2><p><strong>runuser - \u4F7F\u7528\u66FF\u4EE3\u7528\u6237\u548C\u7EC4 ID \u8FD0\u884C\u547D\u4EE4</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> runuser <span class="token punctuation">[</span>\u9009\u9879<span class="token punctuation">]</span> -u\u7528\u6237<span class="token punctuation">[</span><span class="token punctuation">[</span>--<span class="token punctuation">]</span>\u547D\u4EE4<span class="token punctuation">[</span>\u53C2\u6570<span class="token punctuation">..</span>.<span class="token punctuation">]</span><span class="token punctuation">]</span>
 runuser <span class="token punctuation">[</span>\u9009\u9879<span class="token punctuation">]</span> <span class="token punctuation">[</span> - <span class="token punctuation">]</span> <span class="token punctuation">[</span>\u7528\u6237<span class="token punctuation">[</span>\u53C2\u6570<span class="token punctuation">..</span>.<span class="token punctuation">]</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,15),I=n("\u547D\u4EE4"),L=e("em",null,"runuser",-1),A=n("\u66F4\u6539\u8FD0\u884C\u547D\u4EE4\u7684\u7528\u6237\u3002"),N=e("em",null,"runuser",-1),q=n("\u7C7B\u4F3C\u4E8E"),B={href:"https://www.baeldung.com/linux/run-as-another-user#using-su",target:"_blank",rel:"noopener noreferrer"},S=e("em",null,"su",-1),V=n("\u547D\u4EE4"),P=n("\uFF0C\u4F46\u7565\u6709\u4E0D\u540C\u3002"),O=n("\u53EA\u6709"),R=e("em",null,"root",-1),T=n("\u7528\u6237\u53EF\u4EE5\u8C03\u7528"),W=e("em",null,"runuser",-1),Z=n("\u3002\u56E0\u6B64\uFF0C\u5B83\u4E0D\u4F1A\u63D0\u793A\u8F93\u5165\u5BC6\u7801\u3002\u8FD9\u79CD\u884C\u4E3A\u975E\u5E38\u9002\u5408\u811A\u672C\u7F16\u5199\uFF0C\u5728\u672C\u6587\u7684\u540E\u9762\u90E8\u5206\uFF0C\u6211\u4EEC\u5C06\u7814\u7A76\u5982\u4F55\u5C06\u5B83\u4E0E"),z={href:"https://man7.org/linux/man-pages/man8/sudo.8.html",target:"_blank",rel:"noopener noreferrer"},F=e("em",null,"sudo",-1),M=n("\u4E00\u8D77\u4F7F\u7528\uFF0C\u4EE5\u4FBF\u4E3A\u975E\u7279\u6743\u7528\u6237\u63D0\u4F9B\u5BF9\u7279\u5B9A\u547D\u4EE4\u7684\u8BBF\u95EE\u6743\u9650\u3002"),U=t(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>sealer@iZuf68xky083mr0yy6q37lZ ~<span class="token punctuation">]</span>$ runuser 
runuser: may not be used by non-root <span class="token function">users</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6743\u9650\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u6743\u9650\u7BA1\u7406" aria-hidden="true">#</a> \u6743\u9650\u7BA1\u7406</h3>`,2),Y=n("\u5C06 "),$=e("em",null,"runuser",-1),j=n("\u4E0E "),G={href:"https://www.baeldung.com/linux/sudo-privileges-user",target:"_blank",rel:"noopener noreferrer"},H=e("em",null,"sudo",-1),J=n("\u7ED3\u5408\u53EF\u4EE5\u63D0\u4F9B\u5BF9\u7528\u6237\u6743\u9650\u7684\u66F4\u7CBE\u7EC6\u63A7\u5236\u3002"),K=n("\u63A5\u4E0B\u6765\uFF0C\u8BA9"),Q=e("em",null,"baeldung",-1),X=n("\u4EE5"),ee=e("em",null,"root",-1),ne=n("\u8EAB\u4EFD\u8FD0\u884C\u811A\u672C\u3002\u6211\u4EEC\u5C06\u4F7F\u7528"),se=e("em",null,"sudo",-1),ae=n("\uFF0C\u4F46\u6211\u4EEC\u4E5F"),te={href:"https://www.baeldung.com/linux/run-as-another-user",target:"_blank",rel:"noopener noreferrer"},oe=n("\u53EF\u4EE5\u4F7F\u7528"),re=e("em",null,"su",-1),ie=n("\u3002\u8BA9\u6211\u4EEC\u901A\u8FC7\u4F7F\u7528"),le={href:"https://www.baeldung.com/linux/sudo-privileges-user#giving-limited-sudo-access-to-a-user",target:"_blank",rel:"noopener noreferrer"},ue=e("em",null,"visudo",-1),de=n("\u547D\u4EE4"),ce=n("\u5C06\u6B64\u884C\u6DFB\u52A0\u5230"),he=e("em",null,"sudoers",-1),pe=n("\u6587\u4EF6\u6765\u6DFB\u52A0\u6743\u9650\uFF1A"),_e=t(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>baeldung <span class="token assign-left variable">ALL</span><span class="token operator">=</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> NOPASSWD: /home/baeldung/script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u5173\u4E8E-rootless-\u7684\u914D\u7F6E\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u5173\u4E8E-rootless-\u7684\u914D\u7F6E\u95EE\u9898" aria-hidden="true">#</a> \u5173\u4E8E rootless \u7684\u914D\u7F6E\u95EE\u9898</h3><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="26.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="28.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,4),be=n("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),me={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},ge=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),ke=n(")"),fe=n("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),ve={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},xe=n("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function we(ye,Ee){const a=o("ExternalLinkIcon"),r=o("RouterLink");return l(),u("div",null,[e("ul",null,[e("li",null,[e("a",h,[p,s(a)])])]),_,b,m,e("blockquote",null,[e("p",null,[g,e("a",k,[f,s(a)]),v,e("a",x,[w,s(a)]),y,e("a",E,[C,s(a)])])]),D,e("p",null,[I,L,A,N,q,e("a",B,[S,V,s(a)]),P]),e("p",null,[O,R,T,W,Z,e("a",z,[F,s(a)]),M]),U,e("p",null,[Y,$,j,e("a",G,[H,s(a)]),J]),e("p",null,[K,Q,X,ee,ne,se,ae,e("a",te,[oe,re,s(a)]),ie,e("a",le,[ue,de,s(a)]),ce,he,pe]),_e,e("ul",null,[e("li",null,[e("p",null,[s(r,{to:"/"},{default:d(()=>[be]),_:1})])]),e("li",null,[e("p",null,[e("a",me,[ge,s(a)]),ke])]),e("li",null,[e("p",null,[fe,e("a",ve,[xe,s(a)])])])])])}const De=i(c,[["render",we],["__file","27.html.vue"]]);export{De as default};
