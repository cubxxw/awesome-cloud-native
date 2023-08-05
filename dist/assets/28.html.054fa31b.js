import{_ as l,r,o as a,c as i,a as t,b as o,w as d,e,d as c}from"./app.ee8200d6.js";const h={},_={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},p=e("author"),u=t("h1",{id:"\u7B2C28\u8282-linux\u7CFB\u7EDF\u79FB\u690D-\u5206\u533A-rootfs",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#\u7B2C28\u8282-linux\u7CFB\u7EDF\u79FB\u690D-\u5206\u533A-rootfs","aria-hidden":"true"},"#"),e(" \u7B2C28\u8282 Linux\u7CFB\u7EDF\u79FB\u690D\uFF0C\u5206\u533A\uFF0Crootfs")],-1),f=t("div",null,[t("a",{href:"27.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),t("a",{href:"29.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),x=t("br",null,null,-1),g=e("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),k={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},m=e("http://nsddd.top"),b=c('<hr><p>[TOC]</p><h2 id="linux\u7CFB\u7EDF\u79FB\u690D" tabindex="-1"><a class="header-anchor" href="#linux\u7CFB\u7EDF\u79FB\u690D" aria-hidden="true">#</a> Linux\u7CFB\u7EDF\u79FB\u690D</h2><p>\u79FB\u690D\u662F\u5C06 bootloader \u7684\u6E90\u4EE3\u7801\uFF0CLinux\u7684\u5185\u6838\u6E90\u4EE3\u7801\uFF0C\u6587\u4EF6\u7CFB\u7EDF\u4E2D\u7528\u6237\u6001\u7A0B\u5E8F\u4EE3\u7801\u6839\u636E\u786C\u4EF6\u505A\u51FA\u5C11\u91CF\u4FEE\u6539\uFF0C\u5C24\u5176\u662F\u5728\u76EE\u6807\u786C\u4EF6\u5E73\u53F0\u8FD0\u884C\u8D77\u6765\u7684\u8FDB\u7A0B\u3002</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u65E9\u5728Linux\u4E2D\u548Cdocker\u4E2D\u63D0\u5230\u8FC7\u5F88\u591A\u6B21\u7684 rootfs \uFF0C\u5B83\u5F88\u91CD\u8981</p><p>\u26A0\uFE0F \u4E3A\u4EC0\u4E48\u9700\u8981\u6839\u6587\u4EF6\u7CFB\u7EDF\uFF1F</p><p>(1) <strong>init\u8FDB\u7A0B</strong>\u7684\u5E94\u7528\u7A0B\u5E8F\u5728\u6839\u6587\u4EF6\u7CFB\u7EDF\u4E0A</p><p>(2) \u6839\u6587\u4EF6\u7CFB\u7EDF\u63D0\u4F9B\u4E86 <strong>\u6839\u76EE\u5F55 /</strong></p><p>(3) \u5185\u6838\u542F\u52A8\u540E\u7684**\u5E94\u7528\u5C42\u914D\u7F6E(etc\u76EE\u5F55)**\u5728\u6839\u6587\u4EF6\u7CFB\u7EDF\u4E0A\u3002\u51E0\u4E4E\u53EF\u4EE5\u8BA4\u4E3A\uFF1A<strong>\u53D1\u884C\u7248=\u5185\u6838+rootfs</strong></p><p>(4) shell<strong>\u547D\u4EE4\u7A0B\u5E8F</strong>\u5728\u6839\u6587\u4EF6\u7CFB\u7EDF\u4E0A\u3002\u8B6C\u5982ls\u3001cd\u7B49\u547D\u4EE4</p></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="27.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="29.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>',7),E=e("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),v={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},C=t("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),L=e(")"),y=e("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),N={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},w=e("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function A(B,V){const n=r("ExternalLinkIcon"),s=r("RouterLink");return a(),i("div",null,[t("ul",null,[t("li",null,[t("a",_,[p,o(n)])])]),u,f,x,t("blockquote",null,[t("p",null,[g,t("a",k,[m,o(n)])])]),b,t("ul",null,[t("li",null,[t("p",null,[o(s,{to:"/"},{default:d(()=>[E]),_:1})])]),t("li",null,[t("p",null,[t("a",v,[C,o(n)]),L])]),t("li",null,[t("p",null,[y,t("a",N,[w,o(n)])])])])])}const I=l(h,[["render",A],["__file","28.html.vue"]]);export{I as default};
