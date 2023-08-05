import{_ as s,r as o,o as l,c as d,a as e,b as n,w as h,e as t,d as i}from"./app.ee8200d6.js";const c={},p={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},_=t("author"),u=e("h1",{id:"\u7B2C-42-\u8282-kubernetes-\u7684\u591A\u79DF\u6237",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C-42-\u8282-kubernetes-\u7684\u591A\u79DF\u6237","aria-hidden":"true"},"#"),t(" \u7B2C 42 \u8282 Kubernetes \u7684\u591A\u79DF\u6237")],-1),f=e("div",null,[e("a",{href:"41.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"43.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),b=e("br",null,null,-1),C=t("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),A={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},B=t("http://nsddd.top"),k=i('<hr><p>[TOC]</p><h2 id="pbac" tabindex="-1"><a class="header-anchor" href="#pbac" aria-hidden="true">#</a> PBAC</h2><p>PBAC\uFF08\u57FA\u4E8E\u89D2\u8272\u7684\u8BBF\u95EE\u63A7\u5236\uFF09\u662F\u6307\u5728 Kubernetes \u4E2D\u4F7F\u7528\u89D2\u8272\u6765\u63A7\u5236\u5BF9\u8D44\u6E90\u7684\u8BBF\u95EE\u3002\u6BCF\u4E2A\u89D2\u8272\u90FD\u5B9A\u4E49\u4E86\u4E00\u7EC4\u7279\u5B9A\u7684\u6743\u9650\uFF0C\u5E76\u5141\u8BB8\u5C06\u8FD9\u4E9B\u6743\u9650\u5206\u914D\u7ED9\u7528\u6237\u6216\u7EC4\u3002\u8FD9\u4F7F\u60A8\u53EF\u4EE5\u7CBE\u786E\u5730\u63A7\u5236\u5BF9\u8D44\u6E90\u7684\u8BBF\u95EE\uFF0C\u800C\u65E0\u9700\u4E3A\u6BCF\u4E2A\u7528\u6237\u6216\u7EC4\u914D\u7F6E\u5355\u72EC\u7684\u6743\u9650\u3002</p><p>Kubernetes \u5177\u6709\u5185\u7F6E\u7684 RBAC\uFF08\u57FA\u4E8E\u89D2\u8272\u7684\u8BBF\u95EE\u63A7\u5236\uFF09\u529F\u80FD\uFF0C\u5141\u8BB8\u60A8\u4E3A\u7528\u6237\u548C\u7EC4\u5206\u914D\u89D2\u8272\u3002\u60A8\u53EF\u4EE5\u4F7F\u7528 kubectl \u547D\u4EE4\u884C\u5DE5\u5177\u6216 API \u6765\u521B\u5EFA\u548C\u7BA1\u7406\u89D2\u8272\u3002\u4F8B\u5982\uFF0C\u60A8\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u201C\u7BA1\u7406\u5458\u201D\u89D2\u8272\uFF0C\u8BE5\u89D2\u8272\u5177\u6709\u5BF9\u96C6\u7FA4\u4E2D\u6240\u6709\u8D44\u6E90\u7684\u5B8C\u5168\u8BBF\u95EE\u6743\u9650\uFF0C\u5E76\u5C06\u8BE5\u89D2\u8272\u5206\u914D\u7ED9\u60A8\u7684\u56E2\u961F\u4E2D\u7684\u7BA1\u7406\u4EBA\u5458\u3002\u53E6\u4E00\u65B9\u9762\uFF0C\u60A8\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A\u201C\u53EA\u8BFB\u201D\u89D2\u8272\uFF0C\u8BE5\u89D2\u8272\u4EC5\u5141\u8BB8\u8BFB\u53D6\u96C6\u7FA4\u4E2D\u7684\u8D44\u6E90\uFF0C\u5E76\u5C06\u5176\u5206\u914D\u7ED9\u60A8\u7684\u56E2\u961F\u4E2D\u7684\u5F00\u53D1\u4EBA\u5458\u3002</p><p>PBAC \u5728 Kubernetes \u4E2D\u975E\u5E38\u6709\u7528\uFF0C\u56E0\u4E3A\u5B83\u4F7F\u60A8\u53EF\u4EE5\u5728\u96C6\u7FA4\u4E2D\u6709\u6548\u5730\u7BA1\u7406\u7528\u6237\u548C\u7EC4\u7684\u8BBF\u95EE\u6743\u9650\u3002\u8FD9\u53EF\u4EE5\u6709\u52A9\u4E8E\u4FDD\u62A4\u96C6\u7FA4\u4E2D\u7684\u8D44\u6E90\u514D\u53D7\u610F\u5916\u6216\u6076\u610F\u64CD\u4F5C\uFF0C\u5E76\u4F7F\u60A8\u80FD\u591F\u66F4\u8F7B\u677E\u5730\u7BA1\u7406\u7528\u6237\u548C\u7EC4\u7684\u3002</p><h2 id="\u591A\u79DF\u6237" tabindex="-1"><a class="header-anchor" href="#\u591A\u79DF\u6237" aria-hidden="true">#</a> \u591A\u79DF\u6237</h2><p>\u591A\u79DF\u6237\u662F\u6307\u5C06\u4E00\u4E2A\u96C6\u7FA4\u7684\u8D44\u6E90\u5206\u914D\u7ED9\u591A\u4E2A\u7EC4\u7EC7\u6216\u7528\u6237\u7684\u80FD\u529B\u3002\u8FD9\u610F\u5473\u7740\u96C6\u7FA4\u4E2D\u7684\u8D44\u6E90\u53EF\u4EE5\u88AB\u591A\u4E2A\u79DF\u6237\uFF08\u5373\u7EC4\u7EC7\u6216\u7528\u6237\uFF09\u5171\u4EAB\uFF0C\u4F46\u6BCF\u4E2A\u79DF\u6237\u4EC5\u80FD\u8BBF\u95EE\u5176\u6240\u5C5E\u7684\u8D44\u6E90\u3002</p><p>\u591A\u79DF\u6237\u662F\u4E00\u79CD\u5E38\u7528\u7684\u5728\u4E91\u73AF\u5883\u4E2D\u5B9E\u73B0\u8D44\u6E90\u9694\u79BB\u7684\u65B9\u6CD5\u3002\u5B83\u4F7F\u60A8\u53EF\u4EE5\u5728\u540C\u4E00\u96C6\u7FA4\u4E2D\u8FD0\u884C\u591A\u4E2A\u5E94\u7528\u7A0B\u5E8F\uFF0C\u800C\u65E0\u9700\u62C5\u5FC3\u4E0D\u540C\u5E94\u7528\u7A0B\u5E8F\u4E4B\u95F4\u7684\u8D44\u6E90\u51B2\u7A81\u3002\u8FD9\u5BF9\u4E8E\u5728\u4E91\u73AF\u5883\u4E2D\u8FD0\u884C\u5E94\u7528\u7A0B\u5E8F\u7684\u7EC4\u7EC7\u6765\u8BF4\u975E\u5E38\u91CD\u8981\uFF0C\u56E0\u4E3A\u5B83\u53EF\u4EE5\u5E2E\u52A9\u4FDD\u62A4\u5176\u4ED6\u79DF\u6237\u7684\u5E94\u7528\u7A0B\u5E8F\u514D\u53D7\u610F\u5916\u6216\u6076\u610F\u64CD\u4F5C\u7684\u5F71\u54CD\u3002</p><p>\u591A\u79DF\u6237\u53EF\u4EE5\u4F7F\u7528\u5404\u79CD\u6280\u672F\u6765\u5B9E\u73B0\uFF0C\u5305\u62EC PBAC\uFF08\u57FA\u4E8E\u89D2\u8272\u7684\u8BBF\u95EE\u63A7\u5236\uFF09\u548C\u547D\u540D\u7A7A\u95F4\u3002\u4F8B\u5982\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528 PBAC \u5728\u96C6\u7FA4\u4E2D\u4E3A\u6BCF\u4E2A\u79DF\u6237\u5206\u914D\u4E0D\u540C\u7684\u89D2\u8272\uFF0C\u4ECE\u800C\u63A7\u5236\u5BF9\u8D44\u6E90\u7684\u8BBF\u95EE\u3002\u6216\u8005\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528\u547D\u540D\u7A7A\u95F4\u5C06\u6BCF\u4E2A\u79DF\u6237\u7684\u8D44\u6E90\u9694\u79BB\u5728\u4E0D\u540C\u7684\u547D\u540D\u7A7A\u95F4\u4E2D\uFF0C\u4ECE\u800C\u9632\u6B62\u8D44\u6E90\u51B2\u7A81\u3002</p><p>\u603B\u7684\u6765\u8BF4\uFF0C\u591A\u79DF\u6237\u662F\u5728\u4E91\u73AF\u5883\u4E2D\u5B9E\u73B0\u8D44\u6E90\u9694\u79BB\u7684\u91CD\u8981\u65B9\u6CD5\uFF0C\u5B83\u53EF\u4EE5\u5E2E\u52A9\u7EC4\u7EC7\u6709\u6548\u5730\u5171\u4EAB\u8D44\u6E90\uFF0C\u540C\u65F6\u4FDD\u62A4\u5176\u4ED6\u79DF\u6237\u7684\u5E94\u7528\u7A0B\u5E8F\u514D\u53D7\u610F\u5916\u6216\u6076\u610F\u64CD\u4F5C\u7684\u5F71\u54CD\u3002</p><p>\u591A\u79DF\u6237\u53EF\u4EE5\u901A\u8FC7\u4F7F\u7528\u5404\u79CD\u6280\u672F\u6765\u5B9E\u73B0\uFF0C\u5982 PBAC\uFF08\u57FA\u4E8E\u89D2\u8272\u7684\u8BBF\u95EE\u63A7\u5236\uFF09\u548C\u547D\u540D\u7A7A\u95F4\u3002\u4F8B\u5982\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528 PBAC \u5728\u96C6\u7FA4\u4E2D\u4E3A\u6BCF\u4E2A\u79DF\u6237\u5206\u914D\u4E0D\u540C\u7684\u89D2\u8272\uFF0C\u4ECE\u800C\u63A7\u5236\u5BF9\u8D44\u6E90\u7684\u8BBF\u95EE\u3002\u6216\u8005\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528\u547D\u540D\u7A7A\u95F4\u5C06\u6BCF\u4E2A\u79DF\u6237\u7684\u8D44\u6E90\u9694\u79BB\u5728\u4E0D\u540C\u7684\u547D\u540D\u7A7A\u95F4\u4E2D\uFF0C\u4ECE\u800C\u9632\u6B62\u8D44\u6E90\u51B2\u7A81\u3002</p><p>\u591A\u79DF\u6237\u6709\u52A9\u4E8E\u63D0\u9AD8\u96C6\u7FA4\u7684\u6548\u7387\uFF0C\u56E0\u4E3A\u5B83\u5141\u8BB8\u591A\u4E2A\u7EC4\u7EC7\u6216\u7528\u6237\u5171\u4EAB\u8D44\u6E90\u3002\u5B83\u8FD8\u53EF\u4EE5\u63D0\u9AD8\u5B89\u5168\u6027\uFF0C\u56E0\u4E3A\u5B83\u53EF\u4EE5\u5E2E\u52A9\u4FDD\u62A4\u5176\u4ED6\u79DF\u6237\u7684\u5E94\u7528\u7A0B\u5E8F\u514D\u53D7\u610F\u5916\u6216\u6076\u610F\u64CD\u4F5C\u7684\u5F71\u54CD\u3002\u591A\u79DF\u6237\u8FD8\u6709\u52A9\u4E8E\u63D0\u9AD8\u53EF\u7BA1\u7406\u6027\uFF0C\u56E0\u4E3A\u5B83\u5141\u8BB8\u60A8\u66F4\u597D\u5730\u63A7\u5236\u5BF9\u96C6\u7FA4\u4E2D\u7684\u8D44\u6E90\u7684\u8BBF\u95EE\u3002</p><h2 id="\u5173\u8054" tabindex="-1"><a class="header-anchor" href="#\u5173\u8054" aria-hidden="true">#</a> \u5173\u8054</h2><p>PBAC\uFF08\u57FA\u4E8E\u89D2\u8272\u7684\u8BBF\u95EE\u63A7\u5236\uFF09\u548C\u591A\u79DF\u6237\u662F\u4E24\u4E2A\u76F8\u5173\u4F46\u4E0D\u540C\u7684\u6982\u5FF5\u3002</p><p>PBAC \u662F\u6307\u5728 Kubernetes \u4E2D\u4F7F\u7528\u89D2\u8272\u6765\u63A7\u5236\u5BF9\u8D44\u6E90\u7684\u8BBF\u95EE\u3002\u5B83\u5141\u8BB8\u60A8\u4E3A\u7528\u6237\u548C\u7EC4\u5206\u914D\u89D2\u8272\uFF0C\u4ECE\u800C\u7CBE\u786E\u5730\u63A7\u5236\u5BF9\u8D44\u6E90\u7684\u8BBF\u95EE\u3002</p><p>\u591A\u79DF\u6237\u662F\u6307\u5C06\u4E00\u4E2A\u96C6\u7FA4\u7684\u8D44\u6E90\u5206\u914D\u7ED9\u591A\u4E2A\u7EC4\u7EC7\u6216\u7528\u6237\u7684\u80FD\u529B\u3002\u8FD9\u610F\u5473\u7740\u96C6\u7FA4\u4E2D\u7684\u8D44\u6E90\u53EF\u4EE5\u88AB\u591A\u4E2A\u79DF\u6237\uFF08\u5373\u7EC4\u7EC7\u6216\u7528\u6237\uFF09\u5171\u4EAB\uFF0C\u4F46\u6BCF\u4E2A\u79DF\u6237\u4EC5\u80FD\u8BBF\u95EE\u5176\u6240\u5C5E\u7684\u8D44\u6E90\u3002\u591A\u79DF\u6237\u53EF\u4EE5\u4F7F\u7528 PBAC \u5B9E\u73B0\uFF0C\u56E0\u4E3A PBAC \u5141\u8BB8\u60A8\u4E3A\u6BCF\u4E2A\u79DF\u6237\u5206\u914D\u4E0D\u540C\u7684\u89D2\u8272\uFF0C\u4ECE\u800C\u63A7\u5236\u5BF9\u8D44\u6E90\u7684\u8BBF\u95EE\u3002</p><p>\u56E0\u6B64\uFF0CPBAC \u548C\u591A\u79DF\u6237\u4E4B\u95F4\u5B58\u5728\u8054\u7CFB\uFF0C\u56E0\u4E3A PBAC \u53EF\u4EE5\u7528\u4E8E\u5B9E\u73B0\u591A\u79DF\u6237\u3002\u4F46\u662F\uFF0CPBAC \u53EF\u4EE5\u7528\u4E8E\u66F4\u5E7F\u6CDB\u7684\u573A\u666F\uFF0C\u800C\u4E0D\u4EC5\u4EC5\u662F\u591A\u79DF\u6237\u3002\u4F8B\u5982\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528 PBAC \u6765\u63A7\u5236\u5BF9\u5355\u4E2A\u7EC4\u7EC7\u5185\u90E8\u7684\u8D44\u6E90\u7684\u8BBF\u95EE\uFF0C\u800C\u4E0D\u662F\u5C06\u96C6\u7FA4\u4E2D\u7684\u8D44\u6E90\u5206\u914D\u7ED9\u591A\u4E2A\u7EC4\u7EC7\u3002</p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="41.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="43.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>',20),P=t("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),m={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},x=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),E=t(")"),g=t("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),v={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},y=t("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function K(N,w){const r=o("ExternalLinkIcon"),a=o("RouterLink");return l(),d("div",null,[e("ul",null,[e("li",null,[e("a",p,[_,n(r)])])]),u,f,b,e("blockquote",null,[e("p",null,[C,e("a",A,[B,n(r)])])]),k,e("ul",null,[e("li",null,[e("p",null,[n(a,{to:"/"},{default:h(()=>[P]),_:1})])]),e("li",null,[e("p",null,[e("a",m,[x,n(r)]),E])]),e("li",null,[e("p",null,[g,e("a",v,[y,n(r)])])])])])}const V=s(c,[["render",K],["__file","42.html.vue"]]);export{V as default};
