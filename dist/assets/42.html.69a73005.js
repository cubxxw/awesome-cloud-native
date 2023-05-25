import{_ as r,r as n,o as a,c as s,a as e,b as t,w as h,e as o,d}from"./app.96d26f19.js";const c={},_={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},u=o("author"),p=e("h1",{id:"\u7B2C42\u8282-rfc-\u5BF9-horizon-\u5DE5\u7A0B\u548C\u4EE3\u7801\u7EC6\u8282\u4E0A\u90E8\u5206\u6539\u8FDB\u7B56\u7565",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C42\u8282-rfc-\u5BF9-horizon-\u5DE5\u7A0B\u548C\u4EE3\u7801\u7EC6\u8282\u4E0A\u90E8\u5206\u6539\u8FDB\u7B56\u7565","aria-hidden":"true"},"#"),o(" \u7B2C42\u8282 RFC: \u5BF9 horizon \u5DE5\u7A0B\u548C\u4EE3\u7801\u7EC6\u8282\u4E0A\u90E8\u5206\u6539\u8FDB\u7B56\u7565")],-1),f=e("div",null,[e("a",{href:"41.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"43.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),g=e("br",null,null,-1),m=o("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),b={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},k=o("sealos"),x=o("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),C={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},w=o("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),T=o("\u3002Myblog:"),E={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},y=o("http://nsddd.top"),v=d('<hr><p>[TOC]</p><h2 id="horizon-\u76EE\u524D\u5B58\u5728\u7684\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#horizon-\u76EE\u524D\u5B58\u5728\u7684\u95EE\u9898" aria-hidden="true">#</a> horizon \u76EE\u524D\u5B58\u5728\u7684\u95EE\u9898</h2><ul><li>Makefile \u529F\u80FD\u592A\u5355\u4E00\uFF0C\u53EF\u6269\u5C55\u6027\u5F31\uFF0C\u4E0D\u652F\u6301\u4EA4\u53C9\u7F16\u8BD1\u548C\u5BB9\u5668\u7F16\u8BD1\uFF0C\u4E0D\u652F\u6301\u5176\u4ED6\u6269\u5C55\u80FD\u529B</li><li>\u5E76\u6CA1\u6709\u5BF9\u65E5\u5FD7\u505A\u51FA\u5F88\u597D\u7684\u5904\u7406</li><li>\u6CA1\u6709\u5BF9\u7248\u6743\u505A\u5F88\u597D\u7684\u5904\u7406</li><li>\u6CA1\u6709\u4E00\u4E2A\u5B8C\u7F8E\u7684 CICD \u6D41\u7A0B</li><li>\u6CA1\u6709\u4E00\u5957\u5408\u9002\u7684\u9519\u8BEF\u7801\u8BBE\u8BA1\u65B9\u6848</li><li>\u867D\u7136\u6709 Swagger \u4F46\u662F\u5E76\u6CA1\u6709\u751F\u6210 API \u6587\u6863</li><li>\u6CA1\u6709\u4F18\u96C5\u7684 tag\u3001branch\u3001release\uFF0C\u4EE5\u53CA commit \u89C4\u8303</li></ul><h2 id="makefile-\u8BBE\u8BA1" tabindex="-1"><a class="header-anchor" href="#makefile-\u8BBE\u8BA1" aria-hidden="true">#</a> Makefile \u8BBE\u8BA1</h2><p>makefile \u8BBE\u8BA1\u662F\u5DE5\u7A0B\u8BBE\u8BA1\u5F88\u5927\u7684\u4E00\u4E2A\u6A21\u5757\uFF0C\u5C06\u5176\u62BD\u51FA\u57FA\u672C\u7684\u5B50\u6A21\u5757\uFF0C\u5404\u53F8\u5176\u804C\u3002</p><ul><li>\u652F\u6301\u4EA4\u53C9\u7F16\u8BD1(arm, amd)</li><li>\u652F\u6301 docker \u4E8C\u8FDB\u5236\u7F16\u8BD1</li><li>\u5E76\u884C\u7F16\u8BD1</li></ul><p>The current project has the following shortcomings:</p><ul><li>[ ] The Makefile has too simple functionality, weak extensibility, does not support cross-compilation and container compilation, and does not support other extension capabilities.</li><li>[ ] There is no good handling of logs (can be encapsulated with zap).</li><li>[ ] There is no good handling of copyright.</li><li>[ ] There is no perfect CICD process.</li><li>[ ] The robot setting is unreasonable.</li><li>[ ] There is no suitable error code design solution.</li><li>[ ] Although there is Swagger, API documentation is not generated.</li><li>[ ] There is no elegant tag, branch, release, and commit specification.</li><li>[ ] The documentation is not elegant enough.</li><li>[ ] Unit coverage should be used, embedded in actions and Makefiles</li></ul><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="41.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="43.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>',11),z=o("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),A={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},I=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),M=o(")"),N=o("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),B={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},D=o("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function L(S,V){const i=n("ExternalLinkIcon"),l=n("RouterLink");return a(),s("div",null,[e("ul",null,[e("li",null,[e("a",_,[u,t(i)])])]),p,f,g,e("blockquote",null,[e("p",null,[m,e("a",b,[k,t(i)]),x,e("a",C,[w,t(i)]),T,e("a",E,[y,t(i)])])]),v,e("ul",null,[e("li",null,[e("p",null,[t(l,{to:"/"},{default:h(()=>[z]),_:1})])]),e("li",null,[e("p",null,[e("a",A,[I,t(i)]),M])]),e("li",null,[e("p",null,[N,e("a",B,[D,t(i)])])])])])}const F=r(c,[["render",L],["__file","42.html.vue"]]);export{F as default};
