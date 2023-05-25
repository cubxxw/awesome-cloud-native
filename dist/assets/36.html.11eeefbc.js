import{_ as s,r as n,o as a,c as l,a as t,b as o,w as d,e,d as h}from"./app.96d26f19.js";const c={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},p=e("author"),_=t("h1",{id:"\u7B2C36\u8282-feature-request-local-installation-with-k3s-support-for-horizoncd",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#\u7B2C36\u8282-feature-request-local-installation-with-k3s-support-for-horizoncd","aria-hidden":"true"},"#"),e(" \u7B2C36\u8282 Feature Request: Local Installation with k3s Support for HorizonCD")],-1),f=t("div",null,[t("a",{href:"35.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),t("a",{href:"37.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),b=t("br",null,null,-1),m=e("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),k={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},g=e("sealos"),C=e("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),y={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},D=e("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),v=e("\u3002Myblog:"),w={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},x=e("http://nsddd.top"),z=h('<hr><p>[TOC]</p><h2 id="background" tabindex="-1"><a class="header-anchor" href="#background" aria-hidden="true">#</a> Background</h2><p>HorizonCD is a platform for continuous delivery and deployment that supports multiple deployment targets. Currently, HorizonCD only supports Kubernetes(minikube\u3001kind) as a deployment target, but there is a growing demand for support of local installations.</p><h2 id="objective" tabindex="-1"><a class="header-anchor" href="#objective" aria-hidden="true">#</a> Objective</h2><p>The objective of this feature request is to add support for local installations using k3s, a lightweight Kubernetes distribution that is optimized for production workloads in resource-constrained environments.</p><h2 id="design" tabindex="-1"><a class="header-anchor" href="#design" aria-hidden="true">#</a> Design</h2><p>The following table outlines the design considerations for this feature request:</p><table><thead><tr><th>Design Consideration</th><th>Description</th></tr></thead><tbody><tr><td>Compatibility</td><td>Investigate if k3s meets the business requirements of HorizonCD</td></tr><tr><td>HorizonCD Version</td><td>Choose the most appropriate version of HorizonCD to support local installations with k3s</td></tr><tr><td>Container Runtime</td><td>Choose the appropriate CRI (Docker or Containerd) for the local installation</td></tr><tr><td>Helm Controller</td><td>Determine if the Helm controller is required for installation or if it can be installed without the Helm CLI</td></tr></tbody></table><h2 id="implementation-steps" tabindex="-1"><a class="header-anchor" href="#implementation-steps" aria-hidden="true">#</a> Implementation Steps</h2><p>The following steps will be taken to implement this feature request:</p><table><thead><tr><th>Implementation Steps</th><th>Description</th></tr></thead><tbody><tr><td>k3s Installation Script</td><td>Develop an installation script to deploy k3s</td></tr><tr><td>HorizonCD Directory Structure</td><td>Choose an appropriate directory structure for HorizonCD on the local installation</td></tr><tr><td>Docker Installation</td><td>Determine if Docker is required for the local installation</td></tr><tr><td>Makefile Deployment</td><td>Develop a Makefile for one-click deployment of the local installation</td></tr></tbody></table><h2 id="tasks" tabindex="-1"><a class="header-anchor" href="#tasks" aria-hidden="true">#</a> Tasks</h2><p>The current horizonci has a lot to improve in testing and CI, count the PR</p><table><thead><tr><th>Type</th><th>Improvements</th><th>Issue</th><th>PR</th><th>Status</th><th></th></tr></thead><tbody><tr><td>Makefile</td><td>Give the help information of Makefile to make it more readable, give some necessary lab</td><td></td><td>#65</td><td>\u2705</td><td></td></tr><tr><td>k3s-install</td><td>Suitable for developer local lightweight installation</td><td></td><td></td><td>\u274C</td><td></td></tr></tbody></table>',15),H=e("\u26A0\uFE0F Please note that this feature request is currently being discussed on the "),I={href:"https://github.com/horizoncd/horizon/discussions/81",target:"_blank",rel:"noopener noreferrer"},q=e("HorizonCD GitHub Discussions forum"),E=e("."),S=t("h2",{id:"end-\u94FE\u63A5",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#end-\u94FE\u63A5","aria-hidden":"true"},"#"),e(" END \u94FE\u63A5")],-1),T=t("ul",null,[t("li",null,[t("div",null,[t("a",{href:"35.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),t("a",{href:"37.md",style:{float:"right"}}," \uFE0F\u4E0B\u4E00\u8282\u{1F517}")])])],-1),R=e("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),L={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},B=t("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),M=e(")"),N=e("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),V={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},j=e("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function A(P,F){const r=n("ExternalLinkIcon"),i=n("RouterLink");return a(),l("div",null,[t("ul",null,[t("li",null,[t("a",u,[p,o(r)])])]),_,f,b,t("blockquote",null,[t("p",null,[m,t("a",k,[g,o(r)]),C,t("a",y,[D,o(r)]),v,t("a",w,[x,o(r)])])]),z,t("p",null,[H,t("a",I,[q,o(r)]),E]),S,T,t("ul",null,[t("li",null,[t("p",null,[o(i,{to:"/"},{default:d(()=>[R]),_:1})])]),t("li",null,[t("p",null,[t("a",L,[B,o(r)]),M])]),t("li",null,[t("p",null,[N,t("a",V,[j,o(r)])])])])])}const K=s(c,[["render",A],["__file","36.html.vue"]]);export{K as default};
