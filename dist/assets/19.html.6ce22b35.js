import{_ as a,r as n,o as r,c as i,a as e,b as o,w as d,e as t,d as c}from"./app.a6c58d15.js";const h={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},_=t("author"),p=e("h1",{id:"\u7B2C19\u8282-sealos-\u90E8\u7F72-k3s",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C19\u8282-sealos-\u90E8\u7F72-k3s","aria-hidden":"true"},"#"),t(" \u7B2C19\u8282 sealos \u90E8\u7F72 k3s")],-1),f=e("div",null,[e("a",{href:"18.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"20.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),k=e("br",null,null,-1),b=t("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),m={href:"https://github.com/3293172751/sealos",target:"_blank",rel:"noopener noreferrer"},y=t("sealos"),g=t("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),S={href:"https://github.com/3293172751/sealos",target:"_blank",rel:"noopener noreferrer"},w=t("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),x=t("\u3002Myblog:"),v={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},E=t("http://nsddd.top"),C=c('<hr><p>[TOC]</p><h2 id="\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u65B9\u5F0F" aria-hidden="true">#</a> \u65B9\u5F0F</h2><p><code>Sealos</code> \u662F\u4E00\u4E2A\u7528\u4E8E\u90E8\u7F72 <code>Kubernetes</code> \u96C6\u7FA4\u7684\u5DE5\u5177\u3002\u5B83\u53EF\u4EE5\u7528\u6765\u90E8\u7F72\u4E00\u4E2A\u8F7B\u91CF\u7EA7\u4E14\u6613\u4E8E\u4F7F\u7528\u7684Kubernetes\u53D1\u884C\u7248\uFF0C\u79F0\u4E3Ak3s\u3002\u8981\u4F7F\u7528Sealos\u90E8\u7F72k3s\uFF0C\u60A8\u53EF\u4EE5\u6309\u7167\u4EE5\u4E0B\u6B65\u9AA4\u64CD\u4F5C\uFF1A</p><p>1.\u6309\u7167Sealos\u7F51\u7AD9\u4E0A\u7684\u8BF4\u660E\u5B89\u88C5Sealos\u3002</p><p>2.\u5B89\u88C5Sealos\u540E\uFF0C\u521B\u5EFA\u4E00\u4E2A\u914D\u7F6E\u6587\u4EF6\uFF0C\u6307\u5B9Ak3s\u90E8\u7F72\u7684\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u4F8B\u5982\u96C6\u7FA4\u4E2D\u7684\u8282\u70B9\u6570\u91CF\u548C\u5B83\u4EEC\u7684\u7F51\u7EDC\u8BBE\u7F6E\u3002</p><p>3.\u4F7F\u7528<code>sealos install</code>\u547D\u4EE4\u4F7F\u7528\u524D\u9762\u521B\u5EFA\u7684\u914D\u7F6E\u6587\u4EF6\u6765\u90E8\u7F72k3s\u3002\u8FD9\u5C06\u8BBE\u7F6E\u6240\u6709\u5FC5\u8981\u7684\u7EC4\u4EF6\uFF0C\u5982etcd\u548CKubernetes\u63A7\u5236\u5E73\u9762\uFF0C\u6765\u8FD0\u884Ck3s\u96C6\u7FA4\u3002</p><p>4.\u90E8\u7F72\u5B8C\u6210\u540E\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528<code>kubectl</code>\u547D\u4EE4\u884C\u5DE5\u5177\u6765\u7BA1\u7406\u548C\u4E0E\u60A8\u7684k3s\u96C6\u7FA4\u4EA4\u4E92\u3002</p><p>\u8BF7\u6CE8\u610F\uFF0C\u8FD9\u53EA\u662F\u4F7F\u7528Sealos\u90E8\u7F72k3s\u7684\u4E00\u822C\u6982\u8FF0\u3002\u6709\u5173\u7279\u5B9A\u7684\u8BF4\u660E\u548C\u66F4\u591A\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u60A8\u53EF\u4EE5\u53C2\u8003Sealos\u548Ck3s\u6587\u6863\u3002</p><h3 id="sealos" tabindex="-1"><a class="header-anchor" href="#sealos" aria-hidden="true">#</a> sealos</h3><p>Sealos is a tool for deploying Kubernetes clusters. It can be used to deploy a lightweight and easy-to-use Kubernetes distribution called k3s. To use Sealos to deploy k3s, you can follow these steps:</p><ol><li>Install Sealos on your system by following the instructions on the Sealos website.</li><li>Once Sealos is installed, create a configuration file that specifies the details of your k3s deployment, such as the number of nodes in the cluster and their network settings.</li><li>Use the <code>sealos install</code> command to deploy k3s using the configuration file you created in the previous step. This will set up all of the necessary components, such as etcd and the Kubernetes control plane, to run a k3s cluster.</li><li>After the deployment is complete, you can use the <code>kubectl</code> command-line tool to manage and interact with your k3s cluster.</li></ol><p>Keep in mind that this is just a general overview of how to use Sealos to deploy k3s. For specific instructions and more detailed information, you can refer to the Sealos and k3s documentation.</p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="18.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="20.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>',15),K=t("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),A={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},N=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),B=t(")"),I=t("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),L={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},T=t("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function V(D,F){const s=n("ExternalLinkIcon"),l=n("RouterLink");return r(),i("div",null,[e("ul",null,[e("li",null,[e("a",u,[_,o(s)])])]),p,f,k,e("blockquote",null,[e("p",null,[b,e("a",m,[y,o(s)]),g,e("a",S,[w,o(s)]),x,e("a",v,[E,o(s)])])]),C,e("ul",null,[e("li",null,[e("p",null,[o(l,{to:"/"},{default:d(()=>[K]),_:1})])]),e("li",null,[e("p",null,[e("a",A,[N,o(s)]),B])]),e("li",null,[e("p",null,[I,e("a",L,[T,o(s)])])])])])}const R=a(h,[["render",V],["__file","19.html.vue"]]);export{R as default};
