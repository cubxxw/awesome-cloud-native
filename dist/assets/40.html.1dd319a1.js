import{_ as r,r as s,o as a,c as d,a as t,b as o,w as h,e,d as i}from"./app.ee8200d6.js";const _={},c={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},p=e("author"),u=t("h1",{id:"\u7B2C40\u8282-istio",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#\u7B2C40\u8282-istio","aria-hidden":"true"},"#"),e(" \u7B2C40\u8282 Istio")],-1),f=t("div",null,[t("a",{href:"39.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),t("a",{href:"41.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),g=t("br",null,null,-1),b=e("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),m={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},k=e("http://nsddd.top"),y=t("hr",null,null,-1),E=t("p",null,"[TOC]",-1),v=t("h2",{id:"\u9879\u76EE\u5730\u5740",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#\u9879\u76EE\u5730\u5740","aria-hidden":"true"},"#"),e(" \u9879\u76EE\u5730\u5740")],-1),x={href:"https://github.com/istio/istio",target:"_blank",rel:"noopener noreferrer"},I=e("Github\u5730\u5740"),C={href:"https://istio.io/latest",target:"_blank",rel:"noopener noreferrer"},w=e("official website"),L={href:"https://istio.io/latest/zh/docs/concepts/traffic-management/",target:"_blank",rel:"noopener noreferrer"},A=e("oddicial docs"),B=t("h2",{id:"\u4ECB\u7ECD",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#\u4ECB\u7ECD","aria-hidden":"true"},"#"),e(" \u4ECB\u7ECD")],-1),M={href:"https://istio.io/",target:"_blank",rel:"noopener noreferrer"},N=e("Istio"),S=e(" \u662F\u7531 Google\u3001IBM \u548C Lyft \u5F00\u6E90\u7684\u5FAE\u670D\u52A1\u7BA1\u7406\u3001\u4FDD\u62A4\u548C\u76D1\u63A7\u6846\u67B6\u3002Istio \u4E3A\u5E0C\u814A\u8BED\uFF0C\u610F\u601D\u662F\u201D\u8D77\u822A\u201C\u3002"),V=i('<p>Istio \u662F\u4E00\u4E2A\u5F00\u6E90\u670D\u52A1\u7F51\u683C\u5E73\u53F0\uFF0C\u5B83\u63D0\u4F9B\u4E86\u8BB8\u591A\u529F\u80FD\uFF0C\u5305\u62EC\u8D1F\u8F7D\u5747\u8861\u3001\u670D\u52A1\u7F51\u683C\u3001\u76D1\u63A7\u3001\u5B89\u5168\u7B49\u3002</p><p>Istio \u7684\u76EE\u6807\u662F\u4F7F\u5F97\u90E8\u7F72\u3001\u8FDE\u63A5\u3001\u7BA1\u7406\u5FAE\u670D\u52A1\u53D8\u5F97\u7B80\u5355\u3002\u5B83\u63D0\u4F9B\u4E86\u4E00\u79CD\u65B9\u6CD5\u6765\u8FDE\u63A5\u3001\u7BA1\u7406\u548C\u4FDD\u62A4\u670D\u52A1\u7684\u8FD0\u884C\uFF0C\u65E0\u9700\u4FEE\u6539\u670D\u52A1\u672C\u8EAB\u3002</p><p>Istio \u8FD0\u884C\u5728 Kubernetes \u73AF\u5883\u4E2D\uFF0C\u53EF\u4EE5\u7B80\u5316\u90E8\u7F72\u3001\u8FDE\u63A5\u3001\u7BA1\u7406\u5FAE\u670D\u52A1\u7684\u8FC7\u7A0B\u3002\u5B83\u901A\u8FC7\u4F7F\u7528\u4EE3\u7406\u670D\u52A1\u5668\uFF08\u4F8B\u5982 Envoy\uFF09\u6765\u63A7\u5236\u6D41\u91CF\u3001\u9A8C\u8BC1\u548C\u6388\u6743\u670D\u52A1\u95F4\u7684\u901A\u4FE1\u3002</p><p><strong>Istio \u4E3B\u8981\u7531\u4E09\u4E2A\u7EC4\u4EF6\u7EC4\u6210\uFF1A</strong></p><ul><li>Pilot\uFF1A\u8D1F\u8D23\u7BA1\u7406\u4EE3\u7406\u7684\u914D\u7F6E\uFF0C\u5E76\u63D0\u4F9B\u670D\u52A1\u53D1\u73B0\u529F\u80FD\u3002</li><li>Mixer\uFF1A\u8D1F\u8D23\u6536\u96C6\u548C\u53D1\u9001\u7F51\u7EDC\u6D41\u91CF\u6570\u636E\u3002</li><li>Citadel\uFF1A\u8D1F\u8D23\u8EAB\u4EFD\u9A8C\u8BC1\u548C\u6388\u6743\u3002</li></ul><p><strong>Istio \u8FD8\u63D0\u4F9B\u4E86\u8BB8\u591A\u5176\u4ED6\u529F\u80FD\uFF0C\u5982\uFF1A</strong></p><ul><li>\u8BF7\u6C42\u8DEF\u7531</li><li>\u8FD0\u884C\u65F6\u914D\u7F6E</li><li>\u670D\u52A1\u95F4\u8EAB\u4EFD\u9A8C\u8BC1</li><li>\u7194\u65AD\u548C\u91CD\u8BD5</li><li>\u76D1\u63A7\u548C\u62A5\u544A</li></ul><p>Istio \u53EF\u4EE5\u5E2E\u52A9\u4F60\u7BA1\u7406\u670D\u52A1\u4E4B\u95F4\u7684\u6D41\u91CF\uFF0C\u4FDD\u62A4\u4F60\u7684\u670D\u52A1\u4E0D\u88AB\u6EE5\u7528\uFF0C\u5E76\u63D0\u4F9B\u53EF\u89C2\u5BDF\u6027\u6765\u5E2E\u52A9\u4F60\u5FEB\u901F\u8BCA\u65AD\u95EE\u9898\u3002</p><p><img src="https://sm.nsddd.top/sm202304162251167.png" alt="Istio\u7684mindmap"></p><h2 id="\u67B6\u6784" tabindex="-1"><a class="header-anchor" href="#\u67B6\u6784" aria-hidden="true">#</a> \u67B6\u6784</h2><p>Istio \u670D\u52A1\u7F51\u683C\u4ECE\u903B\u8F91\u4E0A\u5206\u4E3A\u6570\u636E\u5E73\u9762\u548C\u63A7\u5236\u5E73\u9762\u3002</p>',11),G=t("strong",null,"\u6570\u636E\u5E73\u9762",-1),P=e("\u7531\u4E00\u7EC4\u667A\u80FD\u4EE3\u7406\uFF08"),R={href:"https://www.envoyproxy.io/",target:"_blank",rel:"noopener noreferrer"},q=e("Envoy"),z=e("\uFF09\u7EC4\u6210\uFF0C\u88AB\u90E8\u7F72\u4E3A "),D={href:"https://jimmysong.io/kubernetes-handbook/GLOSSARY.html#sidecar",target:"_blank",rel:"noopener noreferrer"},O=e("sidecar"),T=e("\u3002"),Y=t("li",null,[t("strong",null,"\u63A7\u5236\u5E73\u9762"),e("\u7BA1\u7406\u5E76\u914D\u7F6E\u4EE3\u7406\u6765\u8FDB\u884C\u6D41\u91CF\u8DEF\u7531\u3002")],-1),j=i('<p><strong>Istio \u7684\u6838\u5FC3\u67B6\u6784\u7531\u4E09\u4E2A\u7EC4\u4EF6\u7EC4\u6210\uFF1A</strong></p><ul><li><strong>Envoy</strong>\uFF1A\u4E00\u79CD\u9AD8\u6027\u80FD\u4EE3\u7406\u670D\u52A1\u5668\uFF0C\u8D1F\u8D23\u5904\u7406\u670D\u52A1\u4E4B\u95F4\u7684\u6D41\u91CF\u3002\u5B83\u8FD0\u884C\u5728\u6BCF\u4E2A\u670D\u52A1\u7684\u8FB9\u754C\uFF0C\u5E76\u63D0\u4F9B\u8D1F\u8F7D\u5747\u8861\u3001\u76D1\u63A7\u3001\u5B89\u5168\u7B49\u529F\u80FD\u3002</li><li><strong>Pilot</strong>\uFF1A\u8D1F\u8D23\u7BA1\u7406 Envoy \u4EE3\u7406\u7684\u914D\u7F6E\uFF0C\u5E76\u63D0\u4F9B\u670D\u52A1\u53D1\u73B0\u529F\u80FD\u3002</li><li><strong>Mixer</strong>\uFF1A\u8D1F\u8D23\u6536\u96C6\u548C\u53D1\u9001\u7F51\u7EDC\u6D41\u91CF\u6570\u636E\u3002</li></ul><p><strong>\u4EE5\u4E0B\u662F Istio \u67B6\u6784\u7684\u9AD8\u7EA7\u6982\u8FF0\uFF1A</strong></p><ol><li>\u5E94\u7528\u7A0B\u5E8F\u670D\u52A1\u90E8\u7F72\u5728\u4E00\u7EC4\u8282\u70B9\u4E0A\uFF0C\u5E76\u4F7F\u7528 Envoy \u4EE3\u7406\u8FDB\u884C\u901A\u4FE1\u3002</li><li>Envoy \u4EE3\u7406\u8FD0\u884C\u5728\u6BCF\u4E2A\u670D\u52A1\u7684\u8FB9\u754C\uFF0C\u63A7\u5236\u6D41\u91CF\u3001\u76D1\u63A7\u548C\u4FDD\u62A4\u670D\u52A1\u95F4\u7684\u901A\u4FE1\u3002</li><li>Pilot \u7BA1\u7406 Envoy \u4EE3\u7406\u7684\u914D\u7F6E\uFF0C\u5E76\u5411 Envoy \u53D1\u9001\u670D\u52A1\u53D1\u73B0\u4FE1\u606F\u3002</li><li>Mixer \u6536\u96C6\u7F51\u7EDC\u6D41\u91CF\u6570\u636E\uFF0C\u5E76\u4E0E\u5176\u4ED6\u7EC4\u4EF6\u96C6\u6210\u6765\u63D0\u4F9B\u8BBF\u95EE\u63A7\u5236\u3001\u8BA1\u8D39\u3001\u76D1\u63A7\u7B49\u529F\u80FD\u3002</li></ol><p><img src="http://sm.nsddd.top/sm202301061530498.png" alt="image-20230106153033404"></p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="39.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="41.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>',7),F=e("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),K={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},W=t("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),H=e(")"),J=e("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),Q={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},U=e("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function X(Z,$){const n=s("ExternalLinkIcon"),l=s("RouterLink");return a(),d("div",null,[t("ul",null,[t("li",null,[t("a",c,[p,o(n)])])]),u,f,g,t("blockquote",null,[t("p",null,[b,t("a",m,[k,o(n)])])]),y,E,v,t("ul",null,[t("li",null,[t("a",x,[I,o(n)])]),t("li",null,[t("a",C,[w,o(n)])]),t("li",null,[t("a",L,[A,o(n)])])]),B,t("blockquote",null,[t("p",null,[t("a",M,[N,o(n)]),S])]),V,t("ul",null,[t("li",null,[G,P,t("a",R,[q,o(n)]),z,t("a",D,[O,o(n)]),T]),Y]),j,t("ul",null,[t("li",null,[t("p",null,[o(l,{to:"/"},{default:h(()=>[F]),_:1})])]),t("li",null,[t("p",null,[t("a",K,[W,o(n)]),H])]),t("li",null,[t("p",null,[J,t("a",Q,[U,o(n)])])])])])}const et=r(_,[["render",X],["__file","40.html.vue"]]);export{et as default};
