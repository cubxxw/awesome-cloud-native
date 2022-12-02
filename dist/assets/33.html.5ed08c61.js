import{_ as s,r as n,o as d,c as h,a as e,b as t,w as i,e as r,d as l}from"./app.e4d6ccd1.js";const c={},p={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},u=r("author"),_=e("h1",{id:"\u7B2C33\u8282-postman\u8BF7\u6C42server",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C33\u8282-postman\u8BF7\u6C42server","aria-hidden":"true"},"#"),r(" \u7B2C33\u8282 Postman\u8BF7\u6C42Server")],-1),f=e("div",null,[e("a",{href:"32.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"34.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),b=e("br",null,null,-1),m=r("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),v={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},x=r("http://nsddd.top"),g=l('<hr><p>[TOC]</p><h2 id="\u9700\u8981" tabindex="-1"><a class="header-anchor" href="#\u9700\u8981" aria-hidden="true">#</a> \u9700\u8981</h2><p><strong>\u56E0\u4E3A\u6211\u4EEC\u4E00\u822C debug \u6211\u4EEC\u7684\u4EE3\u7801\uFF0C\u90A3\u4E48\u9700\u8981\u8FD9\u4E2A\u4EE3\u7801\u88AB\u89E6\u53D1\u6389\u3002kubernetes \u7684Informer \u4F1A\u5BFC\u81F4\u8BB8\u8BB8\u591A\u591A\u7684\u5BA2\u6237\u7AEF\u90FD\u6709\u672C\u5730\u7684\u7F13\u5B58\u3002</strong></p><p>Informer \u5185\u90E8\u5B9E\u73B0\u6781\u5176\u590D\u6742\uFF0C\u6240\u4EE5\u5F88\u5C11\u6709\u76F8\u5173\u7684\u6587\u7AE0\uFF0C\u5982\u679C\u9700\u8981\u8BF7\u8C37\u6B4C\u641C\u7D22\u5916\u6587\u3002</p><p>Informer \u662F Client-go \u4E2D\u7684\u4E00\u4E2A\u6838\u5FC3\u5DE5\u5177\u5305\u3002\u5728 Kubernetes \u6E90\u7801\u4E2D\uFF0C\u5982\u679C Kubernetes \u7684\u67D0\u4E2A\u7EC4\u4EF6\uFF0C\u9700\u8981 List/Get Kubernetes \u4E2D\u7684 Object\uFF0C\u5728\u7EDD\u5927\u591A \u6570\u60C5\u51B5\u4E0B\uFF0C\u4F1A\u76F4\u63A5\u4F7F\u7528 Informer \u5B9E\u4F8B\u4E2D\u7684 Lister()\u65B9\u6CD5\uFF08\u8BE5\u65B9\u6CD5\u5305\u542B \u4E86 Get \u548C List \u65B9\u6CD5\uFF09\uFF0C\u800C\u5F88\u5C11\u76F4\u63A5\u8BF7\u6C42 Kubernetes API\u3002Informer \u6700\u57FA\u672C \u7684\u529F\u80FD\u5C31\u662F List/Get Kubernetes \u4E2D\u7684 Object\u3002</p><h2 id="postman\u8BF7\u6C42-api-server" tabindex="-1"><a class="header-anchor" href="#postman\u8BF7\u6C42-api-server" aria-hidden="true">#</a> Postman\u8BF7\u6C42 APi Server</h2><p><strong>\u6700\u5927\u7684\u95EE\u9898\uFF1A\u5982\u4F55\u767B\u9646\u548C\u6388\u6743\u3002</strong></p><h2 id="\u5EFA\u7ACB-server-account" tabindex="-1"><a class="header-anchor" href="#\u5EFA\u7ACB-server-account" aria-hidden="true">#</a> \u5EFA\u7ACB Server Account</h2><p>Server Account \u673A\u5236\u662F Kubernetes \u4E2D\u7EC4\u4EF6\u548C API Server \u4EA4\u4E92\u7684\u6807\u51C6\u65B9\u5F0F</p><h2 id="\u5EFA\u7ACB-secret-1-24" tabindex="-1"><a class="header-anchor" href="#\u5EFA\u7ACB-secret-1-24" aria-hidden="true">#</a> \u5EFA\u7ACB Secret ( &gt;=1.24)</h2><p>\u51FA\u4E8E\u5B89\u5168\u8003\u8651\uFF0C1.24\u7248\u672C\u548C\u4EE5\u540E\u7248\u672C\uFF0C\u4E0D\u518D\u81EA\u52A8\u4E3A\u4E00\u4E2A Server Account \u521B\u5EFA Secret \uFF0C\u9700\u8981\u81EA\u5DF1\u624B\u52A8\u521B\u5EFA\u3002</p><h2 id="\u5EFA\u7ACB-clusterrole" tabindex="-1"><a class="header-anchor" href="#\u5EFA\u7ACB-clusterrole" aria-hidden="true">#</a> \u5EFA\u7ACB ClusterRole</h2><p>\u4E3A SA \u6388\u6743\uFF0C\u80FD\u591F\u64CD\u4F5C API \u5BF9\u8C61</p><h2 id="\u83B7\u53D6-secret-\u4E2D\u7684\u8BC1\u4E66" tabindex="-1"><a class="header-anchor" href="#\u83B7\u53D6-secret-\u4E2D\u7684\u8BC1\u4E66" aria-hidden="true">#</a> \u83B7\u53D6 Secret \u4E2D\u7684\u8BC1\u4E66</h2><p>Token \u5C06\u653E\u5728http Header \u4E2D\u53D1\u9001\u5230 API Server \u4ECE\u800C\u8FDB\u884C\u9274\u6743</p><h2 id="\u63D0\u53D6-secret-\u4E2D\u7684\u8BC1\u4E66" tabindex="-1"><a class="header-anchor" href="#\u63D0\u53D6-secret-\u4E2D\u7684\u8BC1\u4E66" aria-hidden="true">#</a> \u63D0\u53D6 Secret \u4E2D\u7684\u8BC1\u4E66</h2><p>\u4E3A\u4E86\u80FD\u548C API Server \u5EFA\u7ACB\u5B89\u5168\u8FDE\u63A5\uFF0CPostman\u9700\u8981 \u6539 SA \u5BF9\u5E94\u8BC1\u4E66</p><h2 id="\u4E0B\u8F7D\u8BC1\u4E66\u5E76\u4E14\u4E0A\u4F20\u5230-postman" tabindex="-1"><a class="header-anchor" href="#\u4E0B\u8F7D\u8BC1\u4E66\u5E76\u4E14\u4E0A\u4F20\u5230-postman" aria-hidden="true">#</a> \u4E0B\u8F7D\u8BC1\u4E66\u5E76\u4E14\u4E0A\u4F20\u5230 Postman</h2><p>\u628A\u4E0B\u8F7D\u597D\u7684\u8BC1\u4E66 \u4E0B\u8F7D\u5230 Postman \u6240\u5728\u673A\u5668\uFF0C\u5E76\u4E0A\u4F20\u5230 Postman \u8BBE\u7F6E\u4E2D</p><h2 id="\u8BBF\u95EE" tabindex="-1"><a class="header-anchor" href="#\u8BBF\u95EE" aria-hidden="true">#</a> \u8BBF\u95EE</h2><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="32.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="34.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>',23),k=r("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),S={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},A=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),I=r(")"),P=r("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),C={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},E=r("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function L(y,K){const a=n("ExternalLinkIcon"),o=n("RouterLink");return d(),h("div",null,[e("ul",null,[e("li",null,[e("a",p,[u,t(a)])])]),_,f,b,e("blockquote",null,[e("p",null,[m,e("a",v,[x,t(a)])])]),g,e("ul",null,[e("li",null,[e("p",null,[t(o,{to:"/"},{default:i(()=>[k]),_:1})])]),e("li",null,[e("p",null,[e("a",S,[A,t(a)]),I])]),e("li",null,[e("p",null,[P,e("a",C,[E,t(a)])])])])])}const w=s(c,[["render",L],["__file","33.html.vue"]]);export{w as default};
