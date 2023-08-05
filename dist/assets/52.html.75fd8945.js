import{_ as n,r,o as i,c as s,a as e,b as o,w as a,e as t,d as p}from"./app.ee8200d6.js";const u={},c={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},h=t("author"),b=e("h1",{id:"\u7B2C52\u8282-kubectl",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C52\u8282-kubectl","aria-hidden":"true"},"#"),t(" \u7B2C52\u8282 kubectl")],-1),P=e("div",null,[e("a",{href:"51.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"53.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),k=e("br",null,null,-1),v=t("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),g={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},m=t("http://nsddd.top"),_=e("hr",null,null,-1),I=e("p",null,"[TOC]",-1),f=e("p",null,"kubelet \u67B6\u6784kubelet \u7BA1\u7406 Pod \u7684\u6838\u5FC3\u6D41\u7A0Bkubelet \u8282\u70B9\u7BA1\u7406Pod \u7BA1\u7406Pod \u542F\u52A8\u6D41\u7A0BEND \u94FE\u63A5",-1),A={href:"https://blog.csdn.net/jettery/article/details/78891733",target:"_blank",rel:"noopener noreferrer"},S=t("Kubelet\u7EC4\u4EF6\u89E3\u6790"),C=p('<h2 id="\u7406\u89E3-kubelet" tabindex="-1"><a class="header-anchor" href="#\u7406\u89E3-kubelet" aria-hidden="true">#</a> \u7406\u89E3 kubelet</h2><p>Kubelet\u7EC4\u4EF6\u8FD0\u884C\u5728Node\u8282\u70B9\u4E0A\uFF0C\u7EF4\u6301\u8FD0\u884C\u4E2D\u7684Pods\u4EE5\u53CA\u63D0\u4F9Bkuberntes\u8FD0\u884C\u65F6\u73AF\u5883\uFF0C\u4E3B\u8981\u5B8C\u6210\u4EE5\u4E0B\u4F7F\u547D\uFF1A</p><p>\uFF11\uFF0E\u76D1\u89C6\u5206\u914D\u7ED9\u8BE5Node\u8282\u70B9\u7684pods</p><p>\uFF12\uFF0E\u6302\u8F7Dpod\u6240\u9700\u8981\u7684volumes</p><p>\uFF13\uFF0E\u4E0B\u8F7Dpod\u7684secret</p><p>\uFF14\uFF0E\u901A\u8FC7docker/rkt\u6765\u8FD0\u884Cpod\u4E2D\u7684\u5BB9\u5668</p><p>\uFF15\uFF0E\u5468\u671F\u7684\u6267\u884Cpod\u4E2D\u4E3A\u5BB9\u5668\u5B9A\u4E49\u7684liveness\u63A2\u9488</p><p>\uFF16\uFF0E\u4E0A\u62A5pod\u7684\u72B6\u6001\u7ED9\u7CFB\u7EDF\u7684\u5176\u4ED6\u7EC4\u4EF6</p><p>\uFF17\uFF0E\u4E0A\u62A5Node\u7684\u72B6\u6001</p><p>kubelet \u7BA1\u7406Pod\u7684\u6838\u5FC3\u6D41\u7A0B\u4E3B\u8981\u5305\u62EC\u4E09\u4E2A\u6B65\u9AA4\u3002\u9996\u5148\uFF0Ckubelet\u83B7\u53D6Pod\u6E05\u5355\uFF0C\u53EF\u4EE5\u901A\u8FC7\u6587\u4EF6\u3001HTTP endpoint\u3001API Server\u548CHTTP server\u7B49\u65B9\u5F0F\u83B7\u53D6\u3002\u5176\u6B21\uFF0C\u8282\u70B9\u7BA1\u7406\u4E3B\u8981\u662F\u8282\u70B9\u81EA\u6CE8\u518C\u548C\u8282\u70B9\u72B6\u6001\u66F4\u65B0\uFF0CKubelet\u5728\u542F\u52A8\u65F6\u901A\u8FC7API Server\u6CE8\u518C\u8282\u70B9\u4FE1\u606F\uFF0C\u5E76\u5B9A\u65F6\u5411API Server\u53D1\u9001\u8282\u70B9\u65B0\u6D88\u606F\uFF0CAPI Server\u5728\u63A5\u6536\u5230\u65B0\u6D88\u606F\u540E\uFF0C\u5C06\u4FE1\u606F\u5199\u5165etcd\u3002\u6700\u540E\uFF0CPod\u542F\u52A8\u6D41\u7A0B\u4E3B\u8981\u5305\u62EC\u955C\u50CF\u62C9\u53D6\u3001\u5BB9\u5668\u542F\u52A8\u3001\u63A2\u9488\u76D1\u63A7\u4EE5\u53CA\u72B6\u6001\u6C47\u62A5\u7B49\u6B65\u9AA4\u3002</p><p>kubelet\u662FKubernetes\u4E2D\u7684\u4E00\u4E2A\u8282\u70B9\u4EE3\u7406\u7A0B\u5E8F\uFF0C\u8D1F\u8D23\u7EF4\u62A4\u672C\u8282\u70B9\u4E0APod\u7684\u751F\u547D\u5468\u671F\u3002kubelet\u662FKubernetes\u4E2D\u975E\u5E38\u91CD\u8981\u7684\u7EC4\u4EF6\u4E4B\u4E00\uFF0C\u5B83\u5728Kubernetes\u96C6\u7FA4\u4E2D\u626E\u6F14\u7740\u975E\u5E38\u91CD\u8981\u7684\u89D2\u8272\u3002kubelet\u53EF\u4EE5\u5728\u6BCF\u4E2A\u8282\u70B9\u4E0A\u8FD0\u884C\uFF0C\u5B83\u76D1\u89C6\u5206\u914D\u7ED9\u8BE5Node\u8282\u70B9\u7684pods\uFF0C\u5E76\u6267\u884C\u5404\u79CD\u7BA1\u7406\u5BB9\u5668\u7684\u64CD\u4F5C\uFF0C\u5982\u6302\u8F7Dpod\u6240\u9700\u8981\u7684volumes\u3001\u4E0B\u8F7Dpod\u7684secret\u7B49\u3002</p><p>kubelet\u7684\u6838\u5FC3\u6D41\u7A0B\u4E3B\u8981\u5305\u62EC\u83B7\u53D6Pod\u6E05\u5355\u3001\u8282\u70B9\u7BA1\u7406\u548CPod\u542F\u52A8\u6D41\u7A0B\u3002\u5176\u4E2D\uFF0C\u83B7\u53D6Pod\u6E05\u5355\u7684\u65B9\u5F0F\u5305\u62EC\u6587\u4EF6\u3001HTTP endpoint\u3001API Server\u548CHTTP server\u7B49\u65B9\u5F0F\u3002\u8282\u70B9\u7BA1\u7406\u4E3B\u8981\u5305\u62EC\u8282\u70B9\u81EA\u6CE8\u518C\u548C\u8282\u70B9\u72B6\u6001\u66F4\u65B0\uFF0C\u800CPod\u542F\u52A8\u6D41\u7A0B\u4E3B\u8981\u5305\u62EC\u955C\u50CF\u62C9\u53D6\u3001\u5BB9\u5668\u542F\u52A8\u3001\u63A2\u9488\u76D1\u63A7\u4EE5\u53CA\u72B6\u6001\u6C47\u62A5\u7B49\u6B65\u9AA4\u3002</p><ul><li>\u5728\u8282\u70B9\u7BA1\u7406\u65B9\u9762\uFF0Ckubelet\u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E\u542F\u52A8\u53C2\u6570-register-node\u6765\u786E\u5B9A\u662F\u5426\u5411API Server\u6CE8\u518C\u81EA\u5DF1\u3002\u5982\u679Ckubelet\u6CA1\u6709\u9009\u62E9\u81EA\u6CE8\u518C\u6A21\u5F0F\uFF0C\u5219\u9700\u8981\u7528\u6237\u81EA\u5DF1\u914D\u7F6ENode\u8D44\u6E90\u4FE1\u606F\uFF0C\u540C\u65F6\u9700\u8981\u544A\u77E5kubelet\u96C6\u7FA4\u4E0A\u7684API Server\u7684\u4F4D\u7F6E\u3002\u5728\u542F\u52A8\u65F6\uFF0Ckubelet\u4F1A\u901A\u8FC7API Server\u6CE8\u518C\u8282\u70B9\u4FE1\u606F\uFF0C\u5E76\u5B9A\u65F6\u5411API Server\u53D1\u9001\u8282\u70B9\u65B0\u6D88\u606F\uFF0CAPI Server\u5728\u63A5\u6536\u5230\u65B0\u6D88\u606F\u540E\uFF0C\u5C06\u4FE1\u606F\u5199\u5165etcd\u3002</li><li>\u5728Pod\u7BA1\u7406\u65B9\u9762\uFF0Ckubelet\u53EF\u4EE5\u901A\u8FC7\u6587\u4EF6\u3001HTTP endpoint\u3001API Server\u548CHTTP server\u7B49\u65B9\u5F0F\u83B7\u53D6Pod\u6E05\u5355\u3002\u6587\u4EF6\u65B9\u5F0F\u4E3B\u8981\u7528\u4E8Estatic pod\uFF0C\u800CHTTP\u548CAPI Server\u65B9\u5F0F\u5219\u662FKubernetes\u4E2D\u5E38\u7528\u7684\u65B9\u5F0F\u3002HTTP server\u4E3B\u8981\u7528\u4E8Ekubelet\u4FA6\u542CHTTP\u8BF7\u6C42\uFF0C\u5E76\u54CD\u5E94\u7B80\u5355\u7684API\u4EE5\u63D0\u4EA4\u65B0\u7684Pod\u6E05\u5355\u3002</li><li>\u5728Pod\u542F\u52A8\u6D41\u7A0B\u65B9\u9762\uFF0Ckubelet\u4F1A\u6267\u884C\u5404\u79CD\u7BA1\u7406\u5BB9\u5668\u7684\u64CD\u4F5C\uFF0C\u5305\u62EC\u955C\u50CF\u62C9\u53D6\u3001\u5BB9\u5668\u542F\u52A8\u3001\u63A2\u9488\u76D1\u63A7\u4EE5\u53CA\u72B6\u6001\u6C47\u62A5\u7B49\u6B65\u9AA4\u3002\u955C\u50CF\u62C9\u53D6\u662FPod\u542F\u52A8\u8FC7\u7A0B\u4E2D\u7684\u4E00\u9879\u91CD\u8981\u5DE5\u4F5C\uFF0Ckubelet\u53EF\u4EE5\u901A\u8FC7imageManager\u6A21\u5757\u6765\u7BA1\u7406\u955C\u50CF\u3002\u5BB9\u5668\u542F\u52A8\u662FPod\u542F\u52A8\u8FC7\u7A0B\u7684\u4E0B\u4E00\u6B65\uFF0Ckubelet\u901A\u8FC7container runtime\u6765\u542F\u52A8\u5BB9\u5668\u3002\u63A2\u9488\u76D1\u63A7\u662FPod\u542F\u52A8\u8FC7\u7A0B\u4E2D\u4E00\u9879\u975E\u5E38\u91CD\u8981\u7684\u5DE5\u4F5C\uFF0Ckubelet\u4F1A\u5468\u671F\u6027\u5730\u6267\u884Cpod\u4E2D\u4E3A\u5BB9\u5668\u5B9A\u4E49\u7684liveness\u63A2\u9488\uFF0C\u5E76\u5C06\u7ED3\u679C\u4E0A\u62A5\u7ED9\u7CFB\u7EDF\u7684\u5176\u4ED6\u7EC4\u4EF6\u3002\u72B6\u6001\u6C47\u62A5\u662Fkubelet\u7684\u4E00\u4E2A\u91CD\u8981\u529F\u80FD\uFF0C\u5B83\u4F1A\u4E0A\u62A5pod\u548CNode\u7684\u72B6\u6001\u7ED9\u7CFB\u7EDF\u7684\u5176\u4ED6\u7EC4\u4EF6\uFF0C\u4EE5\u53CA\u4E0A\u62A5\u8282\u70B9\u81EA\u8EAB\u7684\u72B6\u6001\u548C\u8D44\u6E90\u4F7F\u7528\u60C5\u51B5\u7ED9API Server\u3002</li></ul><p>\u603B\u4E4B\uFF0Ckubelet\u662FKubernetes\u4E2D\u975E\u5E38\u91CD\u8981\u7684\u7EC4\u4EF6\u4E4B\u4E00\uFF0C\u5B83\u8D1F\u8D23\u7EF4\u62A4\u672C\u8282\u70B9\u4E0APod\u7684\u751F\u547D\u5468\u671F\uFF0C\u5E76\u6267\u884C\u5404\u79CD\u7BA1\u7406\u5BB9\u5668\u7684\u64CD\u4F5C\u3002kubelet\u7684\u6838\u5FC3\u6D41\u7A0B\u5305\u62EC\u83B7\u53D6Pod\u6E05\u5355\u3001\u8282\u70B9\u7BA1\u7406\u548CPod\u542F\u52A8\u6D41\u7A0B\u3002\u5728\u8282\u70B9\u7BA1\u7406\u65B9\u9762\uFF0Ckubelet\u901A\u8FC7\u8BBE\u7F6E\u542F\u52A8\u53C2\u6570-register-node\u6765\u786E\u5B9A\u662F\u5426\u5411API Server\u6CE8\u518C\u81EA\u5DF1\u3002\u5728Pod\u7BA1\u7406\u65B9\u9762\uFF0Ckubelet\u53EF\u4EE5\u901A\u8FC7\u6587\u4EF6\u3001HTTP endpoint\u3001API Server\u548CHTTP server\u7B49\u65B9\u5F0F\u83B7\u53D6Pod\u6E05\u5355\u3002\u5728Pod\u542F\u52A8\u6D41\u7A0B\u65B9\u9762\uFF0Ckubelet\u4F1A\u6267\u884C\u5404\u79CD\u7BA1\u7406\u5BB9\u5668\u7684\u64CD\u4F5C\uFF0C\u5305\u62EC\u955C\u50CF\u62C9\u53D6\u3001\u5BB9\u5668\u542F\u52A8\u3001\u63A2\u9488\u76D1\u63A7\u4EE5\u53CA\u72B6\u6001\u6C47\u62A5\u7B49\u6B65\u9AA4\u3002</p><h2 id="kubelet-\u67B6\u6784" tabindex="-1"><a class="header-anchor" href="#kubelet-\u67B6\u6784" aria-hidden="true">#</a> <strong>kubelet \u67B6\u6784</strong></h2><p>\u6BCF\u4E2A\u8282\u70B9\u4E0A\u90FD\u8FD0\u884C\u4E00\u4E00\u4E2A kubelet \u670D\u52A1\u8FDB\u7A0B\uFF0C\u9ED8\u8BA4\u76D1\u542C 10250 \u7AEF\u53E3\u3002</p><ul><li>\u63A5\u6536\u5E76\u6267\u884C master \u53D1\u6765\u7684\u6307\u4EE4;</li><li>\u7BA1\u7406 Pod \u53CA Pod \u4E2D\u7684\u5BB9\u5668;</li><li>\u6BCF\u4E2A kubelet \u8FDB\u7A0B\u4F1A\u5728 API Server\u4E0A\u6CE8\u518C\u8282\u70B9\u81EA\u8EAB\u4FE1\u606F\uFF0C\u5B9A\u671F\u5411 master \u8282\u70B9\u6C47\u62A5\u8282\u70B9\u7684\u8D44\u6E90\u4F7F\u7528\u60C5\u51B5\uFF0C\u5E76\u901A\u8FC7 cAdvisor \u76D1\u63A7\u8282\u70B9\u548C\u5BB9\u5668\u7684\u8D44\u6E90\u3002</li></ul><p>kubelet \u67B6\u6784\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="http://sm.nsddd.top/sm202303081731495.png" alt="http://sm.nsddd.top/sm202303081731495.png"></p><p>kubelet \u9ED8\u8BA4\u4F1A\u76D1\u542C 4 \u4E2A\u7AEF\u53E3\uFF1A</p><ul><li><strong>10250\uFF08kubelet API\uFF09</strong>\uFF1A<strong>kubelet server \u4E0E apiserver \u901A\u4FE1\u7684\u7AEF\u53E3\uFF0C\u5B9A\u671F\u8BF7\u6C42 apiserver \u83B7\u53D6\u81EA\u5DF1\u6240\u5E94\u5F53\u5904\u7406\u7684\u4EFB\u52A1</strong>\uFF0C\u901A\u8FC7\u8BE5\u7AEF\u53E3\u53EF\u4EE5\u8BBF\u95EE\u83B7\u53D6 node \u8D44\u6E90\u4EE5\u53CA\u72B6\u6001\u3002<strong>kubectl\u67E5\u770Bpod\u7684\u65E5\u5FD7\u548Ccmd\u547D\u4EE4\uFF0C\u90FD\u662F\u901A\u8FC7kubelet\u7AEF\u53E3 10250 \u8BBF\u95EE\u3002</strong></li><li><strong>10248\uFF08\u5065\u5EB7\u68C0\u67E5\u7AEF\u53E3)</strong>\uFF1A kubelet \u662F\u5426\u6B63\u5E38\u5DE5\u4F5C, \u901A\u8FC7 kubelet \u7684\u542F\u52A8\u53C2\u6570 \u2013healthz-port \u548C \u2013healthz-bind-address \u6765\u6307\u5B9A\u76D1\u542C\u7684\u5730\u5740\u548C\u7AEF\u53E3\u3002</li><li><strong>4194\uFF08cAdvisor \u76D1\u542C\uFF09</strong>\uFF1Akublet \u901A\u8FC7\u8BE5\u7AEF\u53E3\u53EF\u4EE5\u83B7\u53D6\u5230\u8BE5\u8282\u70B9\u7684\u73AF\u5883\u4FE1\u606F\u4EE5\u53CA node \u4E0A\u8FD0\u884C\u7684\u5BB9\u5668\u72B6\u6001\u7B49\u5185\u5BB9\uFF0C\u8BBF\u95EE <code>http://localhost:4194</code> \u53EF\u4EE5\u770B\u5230 cAdvisor \u7684\u7BA1\u7406\u754C\u9762, \u901A\u8FC7 kubelet \u7684\u542F\u52A8\u53C2\u6570 \u2013cadvisor-port \u53EF\u4EE5\u6307\u5B9A \u542F\u52A8\u7684\u7AEF\u53E3\u3002</li><li><strong>10255 \uFF08readonly API\uFF09</strong>\uFF1A\u63D0\u4F9B\u4E86 pod \u548C node \u7684\u4FE1\u606F\uFF0C\u63A5\u53E3\u4EE5\u53EA\u8BFB\u5F62\u5F0F\u66B4\u9732\u51FA\u53BB\uFF0C\u8BBF\u95EE\u8BE5\u7AEF\u53E3\u4E0D\u9700\u8981\u8BA4\u8BC1\u548C\u9274\u6743\u3002 \u83B7\u53D6 pod \u7684\u63A5\u53E3\uFF0C\u4E0E apiserver \u7684 <code>http://127.0.0.1:8080/api/v1/pods?fieldSelector=spec.nodeName=xxx</code> \u63A5\u53E3\u7C7B\u4F3C</li><li>ProbeManager\uFF1A\u5B9E\u73B0 k8s \u4E2D\u7684\u63A2\u9488\u529F\u80FD\uFF0C\u5728 pod \u4E2D\u914D\u7F6E\u4E86\u5404\u4E2A\u63A2\u9488\u540E\uFF0C\u7531 ProbeManager \u6765\u7BA1\u7406\u5E76\u6267\u884C</li><li>OOMWatcher\uFF1A\u7CFB\u7EDFOOM\u7684\u76D1\u542C\u5668\uFF0C\u5C06\u4F1A\u4E0Ecadvisor\u6A21\u5757\u4E4B\u95F4\u5EFA\u7ACBSystemOOM,\u901A\u8FC7Watch\u65B9\u5F0F\u4ECEcadvisor\u90A3\u91CC\u6536\u5230\u7684OOM\u4FE1\u53F7\uFF0C\u5E76\u8BB0\u5F55\u5230\u8282\u70B9\u7684 Event</li><li>GPUManager\uFF1A\u5BF9\u4E8ENode\u4E0A\u53EF\u4F7F\u7528\u7684GPU\u7684\u7BA1\u7406\uFF0C\u5F53\u524D\u7248\u672C\u9700\u8981\u5728kubelet\u542F\u52A8\u53C2\u6570\u4E2D\u6307\u5B9Afeature-gates\u4E2D\u6DFB\u52A0Accelerators=true\uFF0C\u5E76\u4E14\u9700\u8981\u624D\u7528runtime=Docker\u7684\u60C5\u51B5\u4E0B\u624D\u80FD\u652F\u6301\u4F7F\u7528GPU,\u5E76\u4E14\u5F53\u524D\u53EA\u652F\u6301NvidiaGPU,GPUManager\u4E3B\u8981\u9700\u8981\u5B9E\u73B0interface\u5B9A\u4E49\u7684Start()/Capacity()/AllocateGPU()\u4E09\u4E2A\u51FD\u6570</li><li>cAdvisor\uFF1AcAdvisor\u96C6\u6210\u5728kubelet\u4E2D\uFF0C\u8D77\u5230\u6536\u96C6\u672CNode\u7684\u8282\u70B9\u548C\u542F\u52A8\u7684\u5BB9\u5668\u7684\u76D1\u63A7\u7684\u4FE1\u606F\uFF0C\u542F\u52A8\u4E00\u4E2AHttp Server\u670D\u52A1\u5668\uFF0C\u5BF9\u5916\u63A5\u6536rest api\u8BF7\u6C42\uFF0EcAvisor\u6A21\u5757\u5BF9\u5916\u63D0\u4F9B\u4E86interface\u63A5\u53E3\uFF0C\u53EF\u4EE5\u901A\u8FC7interface\u63A5\u53E3\u83B7\u53D6\u5230node\u8282\u70B9\u4FE1\u606F\uFF0C\u672C\u5730\u6587\u4EF6\u7CFB\u7EDF\u7684\u72B6\u6001\u7B49\u4FE1\u606F\uFF0C\u8BE5\u63A5\u53E3\u88ABimageManager\uFF0COOMWatcher\uFF0CcontainerManager\u7B49\u6240\u4F7F\u7528</li><li>PLEG\uFF1APLEG\u5168\u79F0\u4E3APodLifecycleEvent,PLEG\u4F1A\u4E00\u76F4\u8C03\u7528container runtime\u83B7\u53D6\u672C\u8282\u70B9\u7684pods,\u4E4B\u540E\u6BD4\u8F83\u672C\u6A21\u5757\u4E2D\u4E4B\u524D\u7F13\u5B58\u7684pods\u4FE1\u606F\uFF0C\u6BD4\u8F83\u6700\u65B0\u7684pods\u4E2D\u7684\u5BB9\u5668\u7684\u72B6\u6001\u662F\u5426\u53D1\u751F\u6539\u53D8\uFF0C\u5F53\u72B6\u6001\u53D1\u751F\u5207\u6362\u7684\u65F6\u5019\uFF0C\u751F\u6210\u4E00\u4E2AeventRecord\u4E8B\u4EF6\uFF0C\u8F93\u51FA\u5230eventChannel\u4E2D\uFF0E\u3000syncPod\u6A21\u5757\u4F1A\u63A5\u6536\u5230eventChannel\u4E2D\u7684event\u4E8B\u4EF6\uFF0C\u6765\u89E6\u53D1pod\u540C\u6B65\u5904\u7406\u8FC7\u7A0B\uFF0C\u8C03\u7528contaiener runtime\u6765\u91CD\u5EFApod\uFF0C\u4FDD\u8BC1pod\u5DE5\u4F5C\u6B63\u5E38\uFF0E</li><li>StatusManager\uFF1A\u8BE5\u6A21\u5757\u8D1F\u8D23pod\u91CC\u9762\u7684\u5BB9\u5668\u7684\u72B6\u6001\uFF0C\u63A5\u53D7\u4ECE\u5176\u5B83\u6A21\u5757\u53D1\u9001\u8FC7\u6765\u7684pod\u72B6\u6001\u6539\u53D8\u7684\u4E8B\u4EF6\uFF0C\u8FDB\u884C\u5904\u7406\uFF0C\u5E76\u66F4\u65B0\u5230kube-apiserver\u4E2D\uFF0E</li><li>EvictionManager\uFF1A\u5F53node\u7684\u8282\u70B9\u8D44\u6E90\u4E0D\u8DB3\u7684\u65F6\u5019\uFF0C\u8FBE\u5230\u4E86\u914D\u7F6E\u7684evict\u7684\u7B56\u7565\uFF0C\u5C06\u4F1A\u4ECEnode\u4E0A\u9A71\u8D76pod\uFF0C\u6765\u4FDD\u8BC1node\u8282\u70B9\u7684\u7A33\u5B9A\u6027\uFF0E\u53EF\u4EE5\u901A\u8FC7kubelet\u542F\u52A8\u53C2\u6570\u6765\u51B3\u5B9Aevict\u7684\u7B56\u7565\uFF0E\u53E6\u5916\u5F53node\u7684\u5185\u5B58\u4EE5\u53CAdisk\u8D44\u6E90\u8FBE\u5230evict\u7684\u7B56\u7565\u7684\u65F6\u5019\u4F1A\u751F\u6210\u5BF9\u5E94\u7684node\u72B6\u6001\u8BB0\u5F55</li><li>VolumeManager\uFF1A\u8D1F\u8D23node\u8282\u70B9\u4E0Apod\u6240\u4F7F\u7528\u7684\uFF56olume\u7684\u7BA1\u7406\uFF0E\u4E3B\u8981\u6D89\u53CA\u5982\u4E0B\u529F\u80FD Volume\u72B6\u6001\u7684\u540C\u6B65\uFF0C\u6A21\u5757\u4E2D\u4F1A\u542F\u52A8gorountine\u53BB\u83B7\u53D6\u5F53\u524Dnode\u4E0Avolume\u7684\u72B6\u6001\u4FE1\u606F\u4EE5\u53CA\u671F\u671B\u7684volume\u7684\u72B6\u6001\u4FE1\u606F\uFF0C\u4F1A\u53BB\u5468\u671F\u6027\u7684sync\u3000volume\u7684\u72B6\u6001\uFF0C\u53E6\u5916volume\u4E0Epod\u7684\u751F\u547D\u5468\u671F\u5173\u8054\uFF0Cpod\u7684\u521B\u5EFA\u5220\u9664\u8FC7\u7A0B\u4E2Dvolume\u7684attach/detach\u6D41\u7A0B\uFF0E\u66F4\u91CD\u8981\u7684\u662Fkubernetes\u652F\u6301\u591A\u79CD\u5B58\u50A8\u7684\u63D2\u4EF6</li><li>ImageGC\uFF1A\u8D1F\u8D23Node\u8282\u70B9\u7684\u955C\u50CF\u56DE\u6536\uFF0C\u5F53\u672C\u5730\u7684\u5B58\u653E\u955C\u50CF\u7684\u672C\u5730\u78C1\u76D8\u7A7A\u95F4\u8FBE\u5230\u67D0\u9608\u503C\u7684\u65F6\u5019\uFF0C\u4F1A\u89E6\u53D1\u955C\u50CF\u7684\u56DE\u6536\uFF0C\u5220\u9664\u6389\u4E0D\u88ABpod\u6240\u4F7F\u7528\u7684\u955C\u50CF\uFF0E\u56DE\u6536\u955C\u50CF\u7684\u9608\u503C\u53EF\u4EE5\u901A\u8FC7kubelet\u7684\u542F\u52A8\u53C2\u6570\u6765\u8BBE\u7F6E\uFF0E</li><li>ContainerGC\uFF1A\u8D1F\u8D23NOde\u8282\u70B9\u4E0A\u7684dead\u72B6\u6001\u7684container,\u81EA\u52A8\u6E05\u7406\u6389node\u4E0A\u6B8B\u7559\u7684\u5BB9\u5668\uFF0E\u5177\u4F53\u7684GC\u64CD\u4F5C\u7531runtime\u6765\u5B9E\u73B0</li><li>ImageManager\uFF1A\u8C03\u7528kubecontainer.ImageService\u63D0\u4F9B\u7684PullImage/GetImageRef/ListImages/RemoveImage/ImageStates\u7684\u65B9\u6CD5\u6765\u4FDD\u8BC1pod\u8FD0\u884C\u6240\u9700\u8981\u7684\u955C\u50CF\uFF0C\u4E3B\u8981\u662F\u4E3A\u4E86kubelet\u652F\u6301cni\uFF0E</li></ul><h2 id="kubelet-\u7BA1\u7406-pod-\u7684\u6838\u5FC3\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#kubelet-\u7BA1\u7406-pod-\u7684\u6838\u5FC3\u6D41\u7A0B" aria-hidden="true">#</a> <strong>kubelet \u7BA1\u7406 Pod \u7684\u6838\u5FC3\u6D41\u7A0B</strong></h2><p><img src="http://sm.nsddd.top/sm202303081730574.png" alt="http://sm.nsddd.top/sm202303081730574.png"></p><p>\u6765\u6E90\u5305\u62EC file \u548C http \u4E24\u79CD\u7C7B\u578B\uFF1A</p><ul><li>file \u4E3B\u8981\u662F\u7528\u4E8E static pod</li><li>http \u5219\u662F apiserver \u8FDB\u884C\u8C03\u7528</li></ul><h3 id="kubelet-\u8282\u70B9\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#kubelet-\u8282\u70B9\u7BA1\u7406" aria-hidden="true">#</a> <strong>kubelet \u8282\u70B9\u7BA1\u7406</strong></h3><p>\u8282\u70B9\u7BA1\u7406\u4E3B\u8981\u662F\u8282\u70B9\u81EA\u6CE8\u518C\u548C\u8282\u70B9\u72B6\u6001\u66F4\u65B0:</p><ul><li>Kubelet \u53EF\u4EE5\u901A\u8FC7\u8BBE\u7F6E\u542F\u52A8\u53C2\u6570**-register-node**\u6765\u786E\u5B9A\u662F\u5426\u5411 API Server \u6CE8\u518C\u81EA\u5DF1;</li><li>\u5982\u679C Kubelet \u6CA1\u6709\u9009\u62E9\u81EA\u6CE8\u518C\u6A21\u5F0F\uFF0C\u5219\u9700\u8981\u7528\u6237\u81EA\u5DF1\u914D\u7F6E Node \u8D44\u6E90\u4FE1\u606F\uFF0C\u540C\u65F6\u9700\u8981\u544A\u77E5 Kubelet \u96C6\u7FA4\u4E0A\u7684API Server \u7684\u4F4D\u7F6E;</li><li>Kubelet \u5728\u542F\u52A8\u65F6\u901A\u8FC7 API Server \u6CE8\u518C\u8282\u70B9\u4FE1\u606F,\u5E76\u5B9A\u65F6\u5411 API Server \u53D1\u9001\u8282\u70B9\u65B0\u6D88\u606F\uFF0CAPI Server \u5728\u63A5\u6536\u5230\u65B0\u6D88\u606F\u540E\uFF0C\u5C06\u4FE1\u606F\u5199\u5165etcd\u3002</li></ul><h3 id="pod-\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#pod-\u7BA1\u7406" aria-hidden="true">#</a> <strong>Pod \u7BA1\u7406</strong></h3><p>\u83B7\u53D6Pod\u6E05\u5355:</p><ul><li><p>\u6587\u4EF6\uFF1A\u542F\u52A8\u53C2\u6570**-config**\u6307\u5B9A\u7684\u914D\u7F6E\u76EE\u5F55\u4E0B\u7684\u6587\u4EF6(\u9ED8\u8BA4 <code>/etc/ Kubernetes/manifests/</code> )\u3002\u8BE5\u6587\u4EF6\u6BCF20\u79D2\u91CD\u65B0\u68C0\u67E5\u4E00\u6B21( \u53EF\u914D\u7F6E)</p></li><li><p>\u914D\u7F6E\u65B9\u6CD5</p><p>kubelet \u53EF\u4EE5\u901A\u8FC7\u542F\u52A8\u53C2\u6570 <code>-config</code> \u6307\u5B9A\u914D\u7F6E\u6587\u4EF6\u7684\u76EE\u5F55\uFF0C\u9ED8\u8BA4\u4E3A <code>/etc/kubernetes/manifests/</code>\u3002\u8BE5\u76EE\u5F55\u4E0B\u7684\u6587\u4EF6\u6BCF20\u79D2\u91CD\u65B0\u68C0\u67E5\u4E00\u6B21\uFF0C\u53EF\u4EE5\u5728\u542F\u52A8\u65F6\u4F7F\u7528\u53C2\u6570 <code>-sync-frequency</code> \u6765\u66F4\u6539\u68C0\u67E5\u9891\u7387\u3002</p></li><li><p>HTTP endpoint (URL) \uFF1A\u542F\u52A8\u53C2\u6570**-manifest-url**\u8BBE\u7F6E\u3002\u6BCF20\u79D2\u68C0\u67E5\u4E00\u6B21\u8FD9\u4E2A\u7AEF\u70B9(\u53EF\u914D\u7F6E\uFF09</p></li><li><p>API Server\uFF1A\u901A\u8FC7 API Server \u76D1\u542C etcd \u76EE\u5F55\uFF0C\u540C\u6B65 Pod \u6E05\u5355\u3002</p></li><li><p>HTTP server: kubelet \u4FA6\u542C HTTP \u8BF7\u6C42\uFF0C\u5E76\u54CD\u5E94\u7B80\u5355\u7684 API \u4EE5\u63D0\u4EA4\u65B0\u7684 Pod \u6E05\u5355\u3002</p></li></ul><h3 id="pod-\u542F\u52A8\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#pod-\u542F\u52A8\u6D41\u7A0B" aria-hidden="true">#</a> <strong>Pod \u542F\u52A8\u6D41\u7A0B</strong></h3><p><img src="http://sm.nsddd.top/sm202303081731318.png" alt="http://sm.nsddd.top/sm202303081731318.png"></p><p>kubelet \u7BA1\u7406 Pod \u7684\u6838\u5FC3\u6D41\u7A0B\u5982\u4E0B\uFF1A</p><ol><li>kubelet \u901A\u8FC7 API Server \u6216\u6587\u4EF6\u7B49\u65B9\u5F0F\u83B7\u53D6 Pod \u6E05\u5355\u3002</li><li>kubelet \u901A\u8FC7 CRI\uFF08Container Runtime Interface\uFF09\u63A5\u53E3\u521B\u5EFA Pod \u7684\u5BB9\u5668\u3002</li><li>kubelet \u901A\u8FC7\u955C\u50CF\u7BA1\u7406\u5668\u68C0\u67E5\u5BB9\u5668\u6240\u9700\u7684\u955C\u50CF\u662F\u5426\u5B58\u5728\uFF0C\u5982\u679C\u4E0D\u5B58\u5728\u5C31\u4ECE\u955C\u50CF\u4ED3\u5E93\u4E2D\u62C9\u53D6\u3002</li><li>kubelet \u901A\u8FC7\u5BB9\u5668\u8FD0\u884C\u65F6\uFF08\u5982Docker\uFF09\u542F\u52A8\u5BB9\u5668\u3002</li><li>kubelet \u5B9A\u671F\u6267\u884C\u5BB9\u5668\u7684\u63A2\u9488\u76D1\u6D4B\uFF0C\u5305\u62EC liveness \u63A2\u9488\u548C readiness \u63A2\u9488\u3002</li><li>kubelet \u5B9A\u671F\u5411 API Server \u6C47\u62A5 Pod \u72B6\u6001\uFF0C\u5305\u62EC\u5BB9\u5668\u72B6\u6001\u548C\u8282\u70B9\u8D44\u6E90\u4F7F\u7528\u60C5\u51B5\u3002</li></ol><p>\u5176\u4E2D\uFF0Ckubelet \u901A\u8FC7\u83B7\u53D6 Pod \u6E05\u5355\u3001\u8282\u70B9\u7BA1\u7406\u548C Pod \u542F\u52A8\u6D41\u7A0B\u6765\u7BA1\u7406 Pod\u3002</p><p>\u6211\u4EEC\u77E5\u9053\u6BCF\u4E00\u4E2A pod \u90FD\u6709\u4E00\u4E2A \u5E95\u5EA7\uFF0C\u53EB\u505A pause\uFF1A</p><p>\u5728 Kubernetes \u4E2D\uFF0C\u5BB9\u5668\u662F\u6700\u5C0F\u7684\u8C03\u5EA6\u5355\u4F4D\uFF0C\u4F46\u5B83\u4EEC\u901A\u5E38\u4E0D\u662F\u72EC\u7ACB\u8FD0\u884C\u7684\uFF0C\u800C\u662F\u4E0E\u5176\u4ED6\u5BB9\u5668\u7EC4\u5408\u5728\u4E00\u8D77\u5F62\u6210\u4E00\u4E2A\u5B8C\u6574\u7684\u5E94\u7528\u7A0B\u5E8F\u90E8\u7F72\u5355\u5143\u2014\u2014Pod\u3002\u5728 Pod \u4E2D\uFF0C\u6240\u6709\u5BB9\u5668\u5171\u4EAB\u76F8\u540C\u7684\u7F51\u7EDC\u7A7A\u95F4\u548C\u5B58\u50A8\u5377\uFF0C\u5B83\u4EEC\u4E4B\u95F4\u53EF\u4EE5\u901A\u8FC7 localhost \u76F8\u4E92\u901A\u4FE1\u3002</p><p>\u6BCF\u4E2A Pod \u5185\u90E8\u90FD\u6709\u4E00\u4E2A pause \u5BB9\u5668\uFF0C\u5B83\u662F\u4E00\u4E2A\u4EC5\u4EC5\u5B58\u5728\u4E8E\u7F51\u7EDC\u4E2D\u7684\u5BB9\u5668\u3002\u5B83\u5728 Pod \u521B\u5EFA\u65F6\u4F5C\u4E3A\u7B2C\u4E00\u4E2A\u5BB9\u5668\u542F\u52A8\uFF0C\u5728 Pod \u4E2D\u4E0D\u627F\u62C5\u4EFB\u4F55\u7684\u4E1A\u52A1\u529F\u80FD\uFF0C\u4EC5\u4EC5\u662F\u7528\u6765\u5360\u7528\u4E00\u4E2A\u7F51\u7EDC\u7AEF\u53E3\uFF0C\u4EE5\u4FBF\u5176\u4ED6\u5BB9\u5668\u53EF\u4EE5\u4E0E\u4E4B\u901A\u4FE1\u3002pause \u5BB9\u5668\u542F\u52A8\u540E\uFF0C\u5C31\u4F1A\u8FDB\u5165\u6682\u505C\u72B6\u6001\uFF0C\u4F46\u662F\u5B83\u4ECD\u7136\u5728\u8FD0\u884C\u4E2D\uFF0C\u4EE5\u4FDD\u6301\u5BB9\u5668\u8FDB\u7A0B\u7684\u6301\u7EED\u6027\u3002\u5F53\u5BB9\u5668\u5185\u7684\u6240\u6709\u5E94\u7528\u7A0B\u5E8F\u90FD\u505C\u6B62\u6267\u884C\u65F6\uFF0Cpause \u5BB9\u5668\u4ECD\u7136\u5728\u8FD0\u884C\uFF0C\u4ECE\u800C\u4FDD\u7559\u4E86\u5BB9\u5668\u7684\u7F51\u7EDC\u548C\u5B58\u50A8\u914D\u7F6E\u3002pause \u5BB9\u5668\u5F88\u5C0F\uFF0C\u53EA\u6709\u51E0\u5341\u5146\u5B57\u8282\uFF0C\u56E0\u6B64\u521B\u5EFA\u548C\u9500\u6BC1\u975E\u5E38\u5FEB\uFF0C\u4E0D\u4F1A\u5360\u7528\u591A\u4F59\u7684\u8D44\u6E90\u3002</p><p>\u53EF\u4EE5\u628A pause \u5BB9\u5668\u770B\u4F5C\u662F Pod \u7684\u201C\u5E95\u5EA7\u201D\uFF0C\u5B83\u8D1F\u8D23\u7EF4\u62A4 Pod \u7684\u751F\u547D\u5468\u671F\uFF0C\u5F53 Pod \u4E2D\u7684\u5176\u4ED6\u5BB9\u5668\u505C\u6B62\u8FD0\u884C\u65F6\uFF0Cpause \u5BB9\u5668\u4ECD\u7136\u5728\u8FD0\u884C\uFF0C\u4EE5\u4FDD\u8BC1 Pod \u7684\u7F51\u7EDC\u548C\u5B58\u50A8\u914D\u7F6E\u4E0D\u4F1A\u4E22\u5931\u3002\u56E0\u6B64\uFF0C\u5982\u679C pause \u5BB9\u5668\u505C\u6B62\u8FD0\u884C\uFF0C\u6574\u4E2A Pod \u5C06\u4F1A\u88AB\u5220\u9664\uFF0C\u540C\u65F6\u4E5F\u4F1A\u5220\u9664 Pod \u4E2D\u7684\u6240\u6709\u5BB9\u5668\u3002\u540C\u65F6 pause \u5BB9\u5668\u4E5F\u662F kubelet \u7684\u4E00\u4E2A\u91CD\u8981\u7EC4\u6210\u90E8\u5206\uFF0Ckubelet \u4F1A\u901A\u8FC7\u76D1\u89C6 pause \u5BB9\u5668\u7684\u72B6\u6001\u6765\u5224\u65AD Pod \u7684\u72B6\u6001\u662F\u5426\u6B63\u5E38\u3002</p><p>\u603B\u4E4B\uFF0Cpause \u5BB9\u5668\u662F Kubernetes \u4E2D\u4E00\u4E2A\u975E\u5E38\u91CD\u8981\u7684\u6982\u5FF5\uFF0C\u53EF\u4EE5\u8BF4\u662F\u6574\u4E2A\u5BB9\u5668\u7F16\u6392\u7684\u57FA\u7840\u3002\u7406\u89E3 pause \u5BB9\u5668\u7684\u4F5C\u7528\u548C\u539F\u7406\uFF0C\u5BF9\u4E8E\u6DF1\u5165\u7406\u89E3 Kubernetes \u7684\u8FD0\u884C\u673A\u5236\u548C\u8C03\u5EA6\u7B56\u7565\u90FD\u662F\u975E\u5E38\u5FC5\u8981\u7684\u3002</p><p>pause\u5BB9\u5668\u7684\u6E90\u4EE3\u7801\u5730\u5740\u662F\uFF1Ahttps://github.com/kubernetes/kubernetes/blob/master/cmd/kubelet/app/pods/pause.go</p><p>\u66F4\u52A0\u8BE6\u7EC6\u7684\u6D41\u7A0B\uFF1A</p><blockquote><p>\u6309\u7EC4\u4EF6\u5206\u7C7B\uFF0C\u7EC6\u81F4\u5230\u65B9\u6CD5\u7EA7\u522B\u3002</p><p><img src="http://sm.nsddd.top/sm202303081908979.png" alt="http://sm.nsddd.top/sm202303081908979.png"></p></blockquote><p>\u53EF\u4EE5\u770B\u5230 CNI\u3001CRI\u3001CSI \u7684\u8C03\u7528\u8FC7\u7A0B\uFF0C\u8FD9\u91CC\u6709\u4E2A\u6E05\u6670\u7684\u8BA4\u8BC6\u3002</p><h2 id="kubelet-\u542F\u52A8-pod-\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#kubelet-\u542F\u52A8-pod-\u6D41\u7A0B" aria-hidden="true">#</a> kubelet \u542F\u52A8 Pod \u6D41\u7A0B</h2><ol><li>\u901A\u8FC7 API Server \u6216\u6587\u4EF6\u7B49\u65B9\u5F0F\u83B7\u53D6 Pod \u6E05\u5355\u3002</li><li>\u901A\u8FC7 CRI\uFF08Container Runtime Interface\uFF09\u63A5\u53E3\u521B\u5EFA Pod \u7684\u5BB9\u5668\u3002</li><li>\u901A\u8FC7\u955C\u50CF\u7BA1\u7406\u5668\u68C0\u67E5\u5BB9\u5668\u6240\u9700\u7684\u955C\u50CF\u662F\u5426\u5B58\u5728\uFF0C\u5982\u679C\u4E0D\u5B58\u5728\u5C31\u4ECE\u955C\u50CF\u4ED3\u5E93\u4E2D\u62C9\u53D6\u3002</li><li>\u901A\u8FC7\u5BB9\u5668\u8FD0\u884C\u65F6\uFF08\u5982 Docker\uFF09\u542F\u52A8\u5BB9\u5668\u3002</li><li>\u5B9A\u671F\u6267\u884C\u5BB9\u5668\u7684\u63A2\u9488\u76D1\u6D4B\uFF0C\u5305\u62EC liveness \u63A2\u9488\u548C readiness \u63A2\u9488\u3002</li><li>\u5B9A\u671F\u5411 API Server \u6C47\u62A5 Pod \u72B6\u6001\uFF0C\u5305\u62EC\u5BB9\u5668\u72B6\u6001\u548C\u8282\u70B9\u8D44\u6E90\u4F7F\u7528\u60C5\u51B5\u3002</li></ol><p>\u5176\u4E2D\uFF0Ckubelet \u901A\u8FC7\u83B7\u53D6 Pod \u6E05\u5355\u3001\u8282\u70B9\u7BA1\u7406\u548C Pod \u542F\u52A8\u6D41\u7A0B\u6765\u7BA1\u7406 Pod\u3002</p><h2 id="cni\u3001cri\u3001csi-\u8C03\u7528\u6B65\u9AA4\u548C\u8C03\u7528\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#cni\u3001cri\u3001csi-\u8C03\u7528\u6B65\u9AA4\u548C\u8C03\u7528\u8FC7\u7A0B" aria-hidden="true">#</a> CNI\u3001CRI\u3001CSI \u8C03\u7528\u6B65\u9AA4\u548C\u8C03\u7528\u8FC7\u7A0B</h2><p>\u4EE5\u4E0B\u4E3A\u8C03\u7528\u8FC7\u7A0B\uFF1A</p><ol><li>kubelet \u4E2D\u7684 kube-container-runtime \u8C03\u7528 CRI runtime \u8FDB\u884C\u5BB9\u5668\u7BA1\u7406\u3002</li><li>CRI runtime \u8D1F\u8D23\u4E0E\u5BB9\u5668\u8FD0\u884C\u65F6\u8FDB\u884C\u901A\u4FE1\uFF0C\u5982 Docker \u6216 containerd\u3002</li><li>CRI runtime \u901A\u8FC7 CNI plugin \u8C03\u7528 CNI \u8FDB\u884C\u7F51\u7EDC\u7BA1\u7406\u3002</li><li>CNI \u8D1F\u8D23\u8C03\u7528\u7F51\u7EDC\u63D2\u4EF6\uFF0C\u5982 flannel \u6216 Calico\u3002</li><li>CSI \u5219\u8D1F\u8D23\u4E0E\u5B58\u50A8\u63D2\u4EF6\u8FDB\u884C\u901A\u4FE1\uFF0C\u5982 Ceph \u6216 NFS\u3002</li></ol><p>\u4EE5\u4E0A\u662F kubelet \u542F\u52A8 Pod \u6D41\u7A0B\u4EE5\u53CA CNI\u3001CRI\u3001CSI \u8C03\u7528\u6B65\u9AA4\u548C\u8C03\u7528\u8FC7\u7A0B\u3002</p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="51.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="53.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>',54),T=t("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),N={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},x=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),E=t(")"),M=t("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),K={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},R=t("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function y(H,G){const l=r("ExternalLinkIcon"),d=r("RouterLink");return i(),s("div",null,[e("ul",null,[e("li",null,[e("a",c,[h,o(l)])])]),b,P,k,e("blockquote",null,[e("p",null,[v,e("a",g,[m,o(l)])])]),_,I,f,e("p",null,[e("a",A,[S,o(l)])]),C,e("ul",null,[e("li",null,[e("p",null,[o(d,{to:"/"},{default:a(()=>[T]),_:1})])]),e("li",null,[e("p",null,[e("a",N,[x,o(l)]),E])]),e("li",null,[e("p",null,[M,e("a",K,[R,o(l)])])])])])}const L=n(u,[["render",y],["__file","52.html.vue"]]);export{L as default};
