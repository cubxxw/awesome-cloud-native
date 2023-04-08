import{_ as r,r as s,o as d,c as a,a as e,b as n,w as l,e as t,d as h}from"./app.74e47ba8.js";const c={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},_=t("author"),p=e("h1",{id:"\u7B2C33\u8282-sealos-pr",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C33\u8282-sealos-pr","aria-hidden":"true"},"#"),t(" \u7B2C33\u8282 sealos PR")],-1),f=e("div",null,[e("a",{href:"32.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"34.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),m=e("br",null,null,-1),g=t("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),k={href:"https://github.com/3293172751/sealos",target:"_blank",rel:"noopener noreferrer"},b=t("sealos"),v=t("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),w={href:"https://github.com/3293172751/sealos",target:"_blank",rel:"noopener noreferrer"},y=t("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),x=t("\u3002Myblog:"),C={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},E=t("http://nsddd.top"),T=e("hr",null,null,-1),D=e("p",null,"[TOC]",-1),I=e("h1",{id:"planning-draft",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#planning-draft","aria-hidden":"true"},"#"),t(" Planning Draft")],-1),P=e("h2",{id:"problem-description",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#problem-description","aria-hidden":"true"},"#"),t(" Problem Description")],-1),S=e("p",null,"#2863",-1),q=e("p",null,"Sealos currently does not support the k3s runtime and requires the redesign of the runtime interface to avoid excessive coupling with the Processor and to add verification.",-1),N=t("Here is a record of "),z={href:"https://docker.nsddd.top/Cloud-Native-k8s/15.html",target:"_blank",rel:"noopener noreferrer"},R=t("testing various k3s installation methods"),A=t(". If you're curious about k3s, be sure to read "),B={href:"https://docker.nsddd.top/Cloud-Native-k8s/14.html",target:"_blank",rel:"noopener noreferrer"},L=t("this note"),V=t(", as well as k3s \u2022 "),F={href:"https://www.rancher.cn/k3s/",target:"_blank",rel:"noopener noreferrer"},M=t("official"),O=t(" and "),H={href:"https://docs.rancher.cn/",target:"_blank",rel:"noopener noreferrer"},G=t("documentation"),K=t(", and its GitHub \u2022 "),W={href:"https://github.com/k3s-io/k3s/",target:"_blank",rel:"noopener noreferrer"},Y=t("open source address"),$=t("."),j=h('<br><h2 id="solution" tabindex="-1"><a class="header-anchor" href="#solution" aria-hidden="true">#</a> Solution</h2><h4 id="design-a-new-runtime-interface" tabindex="-1"><a class="header-anchor" href="#design-a-new-runtime-interface" aria-hidden="true">#</a> Design a new runtime interface</h4><p>Redesign the runtime interface to avoid excessive coupling with the Processor and add verification.</p><h4 id="design-ideas-for-the-k3s-runtime-module" tabindex="-1"><a class="header-anchor" href="#design-ideas-for-the-k3s-runtime-module" aria-hidden="true">#</a> Design ideas for the k3s runtime module</h4><p>To support the k3s runtime, we need to add a new runtime module. This module needs to support the following functions:</p><ul><li>Execute k3s installation commands</li><li>Execute k3s upgrade commands</li><li>Execute k3s uninstall commands</li></ul><h4 id="design-the-k3s-directory-and-filesystem-distribution-using-sealos-image-distribution-logic" tabindex="-1"><a class="header-anchor" href="#design-the-k3s-directory-and-filesystem-distribution-using-sealos-image-distribution-logic" aria-hidden="true">#</a> Design the k3s directory and filesystem distribution using Sealos&#39; image distribution logic</h4><p>To support the k3s runtime, we need to use Sealos&#39; image distribution logic to design the k3s directory and filesystem distribution of the k3s image.</p><h4 id="optimize-the-packaging-of-kubeadm-and-k3s-binaries" tabindex="-1"><a class="header-anchor" href="#optimize-the-packaging-of-kubeadm-and-k3s-binaries" aria-hidden="true">#</a> Optimize the packaging of kubeadm and k3s binaries</h4><p>To support the k3s runtime, we need to optimize the packaging of kubeadm and k3s binaries.</p><h4 id="provide-unit-test-and-ci-flow-to-ensure-code-quality" tabindex="-1"><a class="header-anchor" href="#provide-unit-test-and-ci-flow-to-ensure-code-quality" aria-hidden="true">#</a> Provide unit test and CI flow to ensure code quality</h4><p>To ensure code quality, we need to provide unit testing and CI flow.</p><br><h2 id="tasks" tabindex="-1"><a class="header-anchor" href="#tasks" aria-hidden="true">#</a> Tasks</h2><table><thead><tr><th>Type</th><th>Improvements</th><th>Issue</th><th>PR</th><th>Status</th></tr></thead><tbody><tr><td>\u{1F680} Feature</td><td>Design a new runtime interface to avoid excessive coupling with the Processor and add verification</td><td>#1943, #2037</td><td></td><td>\u2705</td></tr><tr><td>\u{1F528} Enhancement</td><td>Implement the k3s runtime module to support k3s installation, upgrade, and uninstall commands</td><td></td><td></td><td>\u274C</td></tr><tr><td>\u{1F527} Maintenance</td><td>Design the k3s directory and filesystem distribution using Sealos&#39; image distribution logic</td><td></td><td></td><td>\u274C</td></tr><tr><td>\u{1F44C} Refactoring</td><td>Optimize the packaging of kubeadm and k3s binaries</td><td></td><td></td><td>\u274C</td></tr><tr><td>\u{1F9EA} Testing</td><td>Provide unit testing and CI flow to ensure code quality</td><td></td><td></td><td>\u274C</td></tr><tr><td>\u{1F4C8} Metrics</td><td>Compare k3s and k0s, as well as Kubernetes for various changes in sealos, for users to choose according to their scenarios</td><td></td><td></td><td>\u274C</td></tr><tr><td>\u{1F3AF} Fix</td><td>The current logic of sealos run will parse the environment variable $, which inevitably needs to be fixed.</td><td>#2861</td><td>#2862</td><td>\u2705</td></tr></tbody></table><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="32.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="34.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>',18),J=t("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),Q={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},U=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),X=t(")"),Z=t("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),ee={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},te=t("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function ne(oe,se){const o=s("ExternalLinkIcon"),i=s("RouterLink");return d(),a("div",null,[e("ul",null,[e("li",null,[e("a",u,[_,n(o)])])]),p,f,m,e("blockquote",null,[e("p",null,[g,e("a",k,[b,n(o)]),v,e("a",w,[y,n(o)]),x,e("a",C,[E,n(o)])])]),T,D,I,P,S,q,e("p",null,[N,e("a",z,[R,n(o)]),A,e("a",B,[L,n(o)]),V,e("strong",null,[e("a",F,[M,n(o)]),O,e("a",H,[G,n(o)])]),K,e("strong",null,[e("a",W,[Y,n(o)])]),$]),j,e("ul",null,[e("li",null,[e("p",null,[n(i,{to:"/"},{default:l(()=>[J]),_:1})])]),e("li",null,[e("p",null,[e("a",Q,[U,n(o)]),X])]),e("li",null,[e("p",null,[Z,e("a",ee,[te,n(o)])])])])])}const re=r(c,[["render",ne],["__file","33.html.vue"]]);export{re as default};
