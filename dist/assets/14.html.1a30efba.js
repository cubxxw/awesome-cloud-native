import{_ as u,r as i,o as d,c as k,a as n,b as a,w as t,e as s,d as p}from"./app.c1668249.js";const v={},m={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},b=s("author"),f=n("h1",{id:"\u7B2C14\u8282-k3s",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C14\u8282-k3s","aria-hidden":"true"},"#"),s(" \u7B2C14\u8282 k3s")],-1),_=n("div",null,[n("a",{href:"13.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"15.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),g=n("br",null,null,-1),S=s("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),y={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},h=s("http://nsddd.top"),$=n("hr",null,null,-1),I={class:"table-of-contents"},w=s("k3s\u4ECB\u7ECD"),q=s("k3s\u548Ck8s\u533A\u522B"),L=s("\u67B6\u6784"),E=s("\u5B89\u88C5\uFF08\u5378\u8F7D\uFF09k3s"),N=s("\u955C\u50CF\u52A0\u901F"),A=s("\u8FB9\u7F18\u8BA1\u7B97"),T=s("END \u94FE\u63A5"),R=n("p",null,"[toc]",-1),K=n("h2",{id:"k3s\u4ECB\u7ECD",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#k3s\u4ECB\u7ECD","aria-hidden":"true"},"#"),s(" k3s\u4ECB\u7ECD")],-1),D={class:"custom-container tip"},O=n("p",{class:"custom-container-title"},"k3s \u2014 \u5FAE\u578Bkubernets\u53D1\u884C\u7248",-1),C=n("p",null,"k3s\u662F\u7ECFCNCF\u4E00\u81F4\u6027\u8BA4\u8BC1\u7684Kubernetes\u53D1\u884C\u7248\uFF0C\u4E13\u4E3A\u7269\u8054\u7F51\u53CA\u8FB9\u7F18\u8BA1\u7B97\u8BBE\u8BA1\u3002",-1),M={href:"https://www.rancher.cn/k3s/",target:"_blank",rel:"noopener noreferrer"},x=s("\u5B98\u65B9"),H={href:"https://docs.rancher.cn/",target:"_blank",rel:"noopener noreferrer"},U=s("\u6587\u6863"),F={href:"https://github.com/k3s-io/k3s/",target:"_blank",rel:"noopener noreferrer"},B=s("\u5F00\u6E90\u5730\u5740"),P=p("<p><strong>\u6280\u672F\u4EAE\u70B9\uFF1A</strong></p><ul><li>\u5355\u8FDB\u7A0B\u67B6\u6784\u7B80\u5316\u90E8\u7F72</li><li>\u79FB\u9664\u5404\u79CD\u975E\u5FC5\u8981\u7684\u4EE3\u7801\uFF0C\u51CF\u5C11\u8D44\u6E90\u5360\u7528</li><li><code>TLS</code> \u8BC1\u4E66\u7BA1\u7406</li><li>\u5185\u7F6E <code>Containerd</code></li><li>\u5185\u7F6E\u81EA\u8FD0\u884C <code>rootfs</code></li><li>\u5185\u7F6E <code>Helm Chart</code> \u7BA1\u7406\u673A\u5236</li><li>\u5185\u7F6E <code>L4/L7 LB</code> \u652F\u6301</li></ul><p><strong>\u9002\u5408\u573A\u666F\uFF1A</strong></p><ul><li>\u8FB9\u7F18\u8BA1\u7B97-Edge</li><li>\u7269\u8054\u7F51-IoT</li><li>CI</li><li>Development</li><li>ARM</li><li>\u5D4C\u5165 K8s</li></ul>",4),Y=p('<h2 id="k3s\u548Ck8s\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#k3s\u548Ck8s\u533A\u522B" aria-hidden="true">#</a> k3s\u548Ck8s\u533A\u522B</h2><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>K3s\u662F\u4E00\u4E2A\u72EC\u7ACB\u7684\u670D\u52A1\u5668\uFF0C\u4E0EK8s\u4E0D\u540C\uFF0C\u5B83\u662FKubernetes\u96C6\u7FA4\u7684\u4E00\u90E8\u5206\u3002K8s\u4F9D\u9760CRI-O\u6765\u6574\u5408Kubernetes\u4E0ECRI\uFF08\u5BB9\u5668\u8FD0\u884C\u65F6\u63A5\u53E3\uFF09\uFF0C\u800CK3s\u4F7F\u7528CRI-O\u4E0E\u6240\u6709\u652F\u6301\u7684\u5BB9\u5668\u8FD0\u884C\u65F6\u517C\u5BB9\u3002K8s\u4F7F\u7528kubelet\u6765\u8C03\u5EA6\u5BB9\u5668\uFF0C\u4F46K3s\u4F7F\u7528\u4E3B\u673A\u7684\u8C03\u5EA6\u673A\u5236\u6765\u8C03\u5EA6\u5BB9\u5668\u3002</p></div><p>k3s\u6709\u6BD4k8s\u66F4\u4E25\u683C\u7684\u5B89\u5168\u90E8\u7F72\uFF0C\u56E0\u4E3A\u5176\u653B\u51FB\u9762\u5C0F\u3002k3s\u7684\u53E6\u4E00\u4E2A\u4F18\u52BF\u662F\uFF0C\u5B83\u53EF\u4EE5\u51CF\u5C11\u5B89\u88C5\u3001\u8FD0\u884C\u6216\u66F4\u65B0Kubernetes\u96C6\u7FA4\u6240\u9700\u7684\u4F9D\u8D56\u6027\u548C\u6B65\u9AA4\u3002</p><h2 id="\u67B6\u6784" tabindex="-1"><a class="header-anchor" href="#\u67B6\u6784" aria-hidden="true">#</a> \u67B6\u6784</h2><p>k3s\u67B6\u6784\u5C31\u662F\u628Ak8s\u6838\u5FC3\u7EC4\u4EF6\u5C01\u88C5\u6210\u4E8C\u8FDB\u5236~</p><p>k3s\u5206\u4E3A<code>k3s server</code> \u548C <code> k3s agent</code>\uFF1A</p><ul><li>k3s server \u53EA\u6709\u4E00\u4E2A\u8FDB\u7A0B\u4F53</li><li>k3s agent \u5206\u4E3A\u4E24\u4E2A\u8FDB\u7A0B\u4F53\uFF0C\u5176\u4E2D\u4E00\u4E2A\u662F Contrainerd\uFF0C\u8D1F\u8D23\u7BA1\u7406\u8FD0\u884C\u5BB9\u5668</li></ul><blockquote><p>\u5728\u4E0B\u9762\u4E5F\u53EF\u4EE5\u6DF1\u523B\u7406\u89E3\u5230</p></blockquote><p><strong>\u67B6\u6784\u8BE6\u89E3\uFF1A</strong></p>',9),V={class:"custom-container details"},X=p('<summary>\u67B6\u6784\u8BB2\u89E3\uFF1A</summary><p>k3s\u7B97\u662F\u5BF9k8s\u7684\u67B6\u6784\u548C\u751F\u6001\u8FDB\u884C\u4E00\u90E8\u5206\u7CBE\u534E\u548C\u7F29\u8FDB</p><p><strong>\u5355\u8282\u70B9\u67B6\u6784\uFF1A</strong></p><p>K3s \u5355\u8282\u70B9\u96C6\u7FA4\u7684\u67B6\u6784\u5982\u4E0B\u56FE\u6240\u793A\uFF0C\u8BE5\u96C6\u7FA4\u6709\u4E00\u4E2A\u5185\u5D4C SQLite \u6570\u636E\u5E93\u7684\u5355\u8282\u70B9 <code>K3s server</code> \u3002</p><p>\u5728\u8FD9\u79CD\u914D\u7F6E\u4E2D\uFF0C\u6BCF\u4E2A <code>agent</code> \u8282\u70B9\u90FD\u6CE8\u518C\u5230\u540C\u4E00\u4E2A <code>server</code> \u8282\u70B9\u3002K3s \u7528\u6237\u53EF\u4EE5\u901A\u8FC7\u8C03\u7528 <code>server</code> \u8282\u70B9\u4E0A\u7684 K3s API \u6765\u64CD\u4F5C Kubernetes \u8D44\u6E90\u3002</p><p>\u5355\u8282\u70B9 <code>K3s server</code> \u7684\u67B6\u6784</p><p><img src="http://sm.nsddd.top/sm1660616402558126.png" alt="img"></p><p><strong>\u9AD8\u53EF\u7528\u67B6\u6784\uFF1A</strong></p><p>\u867D\u7136\u5355\u8282\u70B9 k3s \u96C6\u7FA4\u53EF\u4EE5\u6EE1\u8DB3\u5404\u79CD\u7528\u4F8B\uFF0C\u4F46\u5BF9\u4E8E Kubernetes control-plane \u7684\u6B63\u5E38\u8FD0\u884C\u81F3\u5173\u91CD\u8981\u7684\u73AF\u5883\uFF0C\u60A8\u53EF\u4EE5\u5728\u9AD8\u53EF\u7528\u914D\u7F6E\u4E2D\u8FD0\u884C K3s\u3002\u4E00\u4E2A\u9AD8\u53EF\u7528 K3s \u96C6\u7FA4\u7531\u4EE5\u4E0B\u51E0\u4E2A\u90E8\u5206\u7EC4\u6210\uFF1A</p><ul><li><strong><code>K3s server</code> \u8282\u70B9</strong> \uFF1A\u4E24\u4E2A\u6216\u66F4\u591A\u7684<code>server</code>\u8282\u70B9\u5C06\u4E3A Kubernetes API \u63D0\u4F9B\u670D\u52A1\u5E76\u8FD0\u884C\u5176\u4ED6 control-plane \u670D\u52A1</li><li><strong>\u5916\u90E8\u6570\u636E\u5E93</strong> \uFF1A\u4E0E\u5355\u8282\u70B9 k3s \u8BBE\u7F6E\u4E2D\u4F7F\u7528\u7684\u5D4C\u5165\u5F0F SQLite \u6570\u636E\u5B58\u50A8\u76F8\u53CD\uFF0C\u9AD8\u53EF\u7528 K3s \u9700\u8981\u6302\u8F7D\u4E00\u4E2A<code>external database</code>\u5916\u90E8\u6570\u636E\u5E93\u4F5C\u4E3A\u6570\u636E\u5B58\u50A8\u7684\u5A92\u4ECB\u3002</li></ul><p>K3s\u9AD8\u53EF\u7528\u67B6\u6784</p><p><img src="http://sm.nsddd.top/sm1660616476551520.png" alt="img"></p><p><strong>\u56FA\u5B9A <code>agent</code> \u8282\u70B9\u7684\u6CE8\u518C\u5730\u5740\uFF1A</strong></p><p>\u5728\u9AD8\u53EF\u7528 <code>K3s server</code> \u914D\u7F6E\u4E2D\uFF0C\u6BCF\u4E2A\u8282\u70B9\u8FD8\u5FC5\u987B\u4F7F\u7528\u56FA\u5B9A\u7684\u6CE8\u518C\u5730\u5740\u5411 Kubernetes API \u6CE8\u518C\uFF0C\u6CE8\u518C\u540E\uFF0C <code>agent</code> \u8282\u70B9\u76F4\u63A5\u4E0E\u5176\u4E2D\u4E00\u4E2A <code>server</code> \u8282\u70B9\u5EFA\u7ACB\u8FDE\u63A5\uFF0C\u5982\u4E0B\u56FE\u6240\u793A\uFF1A</p><p><img src="http://sm.nsddd.top/sm1660616545857393.svg" alt="k3s-production-setup"></p><p><strong>\u6CE8\u518C <code>agent</code> \u8282\u70B9\uFF1A</strong></p><p><code>agent</code> \u8282\u70B9\u7528<code>k3s agent</code>\u8FDB\u7A0B\u53D1\u8D77\u7684 websocket \u8FDE\u63A5\u6CE8\u518C\uFF0C\u8FDE\u63A5\u7531\u4F5C\u4E3A\u4EE3\u7406\u8FDB\u7A0B\u4E00\u90E8\u5206\u8FD0\u884C\u7684\u5BA2\u6237\u7AEF\u8D1F\u8F7D\u5747\u8861\u5668\u7EF4\u62A4\u3002</p><p><code>agent</code> \u5C06\u4F7F\u7528\u8282\u70B9\u96C6\u7FA4 secret \u4EE5\u53CA\u968F\u673A\u751F\u6210\u7684\u8282\u70B9\u5BC6\u7801\u5411 <code>K3s server</code> \u6CE8\u518C\uFF0C\u5BC6\u7801\u5B58\u50A8\u5728 <code>/etc/rancher/node/password</code>\u8DEF\u5F84\u4E0B\u3002 <code>K3s server</code> \u5C06\u628A\u5404\u4E2A\u8282\u70B9\u7684\u5BC6\u7801\u5B58\u50A8\u4E3A Kubernetes secrets\uFF0C\u968F\u540E\u7684\u4EFB\u4F55\u5C1D\u8BD5\u90FD\u5FC5\u987B\u4F7F\u7528\u76F8\u540C\u7684\u5BC6\u7801\u3002\u8282\u70B9\u5BC6\u7801\u79D8\u5BC6\u5B58\u50A8\u5728<code>kube-system</code>\u547D\u540D\u7A7A\u95F4\u4E2D\uFF0C\u540D\u79F0\u4F7F\u7528\u6A21\u677F<code>&lt;host&gt;.node-password.k3s</code>\u3002</p><blockquote><p>\u6CE8\u610F</p><ul><li>\u5728 K3s v1.20.2 \u4E4B\u524D\uFF0C<code> K3s server</code> \u5C06\u5BC6\u7801\u5B58\u50A8\u5728<code>/var/lib/rancher/k3s/server/cred/node-passwd</code>\u7684\u78C1\u76D8\u4E0A\u3002</li><li>\u5982\u679C\u60A8\u5220\u9664\u4E86 <code>agent</code> \u7684<code>/etc/rancher/node</code>\u76EE\u5F55\uFF0C\u5219\u9700\u8981\u4E3A\u8BE5 <code>agent</code> \u91CD\u65B0\u521B\u5EFA\u5BC6\u7801\u6587\u4EF6\uFF0C\u6216\u8005\u4ECE <code>server</code> \u4E2D\u5220\u9664\u8BE5\u6761\u76EE\u3002</li><li>\u901A\u8FC7\u4F7F\u7528<code>--with-node-id</code>\u6807\u5FD7\u542F\u52A8 <code> K3s server</code> \u6216 agent\uFF0C\u53EF\u4EE5\u5C06\u552F\u4E00\u7684\u8282\u70B9 ID \u9644\u52A0\u5230\u4E3B\u673A\u540D\u4E2D\u3002</li></ul></blockquote><p><strong>\u81EA\u52A8\u90E8\u7F72\u7684\u6E05\u5355\uFF1A</strong></p>',20),W=s("\u4F4D\u4E8E\u76EE\u5F55\u8DEF\u5F84"),G=n("code",null,"/var/lib/rancher/k3s/server/manifests",-1),z=s(" \u7684\u6E05\u5355\u5728\u6784\u5EFA\u65F6\u88AB\u6346\u7ED1\u5230 K3s \u4E8C\u8FDB\u5236\u6587\u4EF6\u4E2D\uFF0C\u5C06\u7531"),j={href:"https://github.com/k3s-io/helm-controller#helm-controller",target:"_blank",rel:"noopener noreferrer"},Q=s("rancher/helm-controller"),J=s("\u5728\u8FD0\u884C\u65F6\u5B89\u88C5\u3002"),Z=p('<p><strong>\u67B6\u6784\u56FE\uFF1A</strong></p><p><img src="http://sm.nsddd.top/smhow-it-works-k3s.svg" alt="k3s\u4E0B\u8F7D"></p><details class="custom-container details"><summary>\u8865\u5145containerd</summary><p>containerd\u4ECEdocker\u5C31\u5F00\u59CB\u719F\u6089\u7684\uFF0C\u90A3\u4E48\u81EA\u7136\u4ECEdocker\u5F00\u59CB\u4ECB\u7ECD\uFF1A</p><p><img src="https://sm.nsddd.top/sm952033-20180520115357747-1796034956.png" alt="img"></p><p>\u4ECE\u56FE\u4E2D\u53EF\u4EE5\u770B\u51FA\uFF0Cdocker \u5BF9\u5BB9\u5668\u7684\u7BA1\u7406\u548C\u64CD\u4F5C\u57FA\u672C\u90FD\u662F\u901A\u8FC7 containerd \u5B8C\u6210\u7684\u3002 \u90A3\u4E48\uFF0Ccontainerd \u662F\u4EC0\u4E48\u5462\uFF1F <strong>Containerd \u662F\u4E00\u4E2A\u5DE5\u4E1A\u7EA7\u6807\u51C6\u7684\u5BB9\u5668\u8FD0\u884C\u65F6\uFF0C\u5B83\u5F3A\u8C03\u7B80\u5355\u6027\u3001\u5065\u58EE\u6027\u548C\u53EF\u79FB\u690D\u6027\u3002Containerd \u53EF\u4EE5\u5728\u5BBF\u4E3B\u673A\u4E2D\u7BA1\u7406\u5B8C\u6574\u7684\u5BB9\u5668\u751F\u547D\u5468\u671F\uFF1A\u5BB9\u5668\u955C\u50CF\u7684\u4F20\u8F93\u548C\u5B58\u50A8\u3001\u5BB9\u5668\u7684\u6267\u884C\u548C\u7BA1\u7406\u3001\u5B58\u50A8\u548C\u7F51\u7EDC\u7B49\u3002</strong> \u8BE6\u7EC6\u70B9\u8BF4\uFF0CContainerd \u8D1F\u8D23\u5E72\u4E0B\u9762\u8FD9\u4E9B\u4E8B\u60C5\uFF1A</p><ul><li>\u7BA1\u7406\u5BB9\u5668\u7684\u751F\u547D\u5468\u671F(\u4ECE\u521B\u5EFA\u5BB9\u5668\u5230\u9500\u6BC1\u5BB9\u5668)</li><li>\u62C9\u53D6/\u63A8\u9001\u5BB9\u5668\u955C\u50CF</li><li>\u5B58\u50A8\u7BA1\u7406(\u7BA1\u7406\u955C\u50CF\u53CA\u5BB9\u5668\u6570\u636E\u7684\u5B58\u50A8)</li><li>\u8C03\u7528 runC \u8FD0\u884C\u5BB9\u5668(\u4E0E runC \u7B49\u5BB9\u5668\u8FD0\u884C\u65F6\u4EA4\u4E92)</li><li>\u7BA1\u7406\u5BB9\u5668\u7F51\u7EDC\u63A5\u53E3\u53CA\u7F51\u7EDC</li></ul><p>\u26A0\uFE0F \u6CE8\u610F\uFF1A<strong>Containerd \u88AB\u8BBE\u8BA1\u6210\u5D4C\u5165\u5230\u4E00\u4E2A\u66F4\u5927\u7684\u7CFB\u7EDF\u4E2D\uFF0C\u800C\u4E0D\u662F\u76F4\u63A5\u7531\u5F00\u53D1\u4EBA\u5458\u6216\u7EC8\u7AEF\u7528\u6237\u4F7F\u7528\u3002</strong></p><p><img src="http://sm.nsddd.top/smimage-20221031142456840.png" alt="image-20221031142456840"></p></details><h2 id="\u5B89\u88C5-\u5378\u8F7D-k3s" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-\u5378\u8F7D-k3s" aria-hidden="true">#</a> \u5B89\u88C5\uFF08\u5378\u8F7D\uFF09k3s</h2>',4),nn={class:"custom-container warning"},sn=p(`<p class="custom-container-title">\u542F\u52A8k3s\u6709\u591A\u5FEB\uFF1F</p><p>\u4E00\u884C\u4EE3\u7801\u641E\u5B9A \u2014 \u4EC5\u970030\u79D2\uFF0C\u5373\u53EF\u542F\u52A8k3s\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> -
<span class="token comment"># Check for Ready node, takes maybe 30 seconds</span>
k3s kubectl get <span class="token function">node</span>

<span class="token comment"># if u in china, u can speed up the installation in the following ways</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token function">sh</span> -
<span class="token comment"># -s \u4E0D\u8F93\u51FA\u4EFB\u4F55\u4E1C\u897F  &amp;  -f \u8FDE\u63A5\u5931\u8D25\u65F6\u4E0D\u663E\u793Ahttp\u9519\u8BEF  &amp; -L\u53C2\u6570\u4F1A\u8BA9 HTTP \u8BF7\u6C42\u8DDF\u968F\u670D\u52A1\u5668\u7684\u91CD\u5B9A\u5411\u3002curl \u9ED8\u8BA4\u4E0D\u8DDF\u968F\u91CD\u5B9A\u5411\u3002</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>\u540C\u6837\u4F60\u53EF\u4EE5\u9009\u62E9\u628Ak3s\u90E8\u7F72\u5728docker\u4E2D\uFF0C\u8FD9\u6837\u4F60\u5C31\u53EF\u4EE5\u5F88\u65B9\u4FBF\u7684\u7BA1\u7406k3s</strong></p></blockquote><p><strong>\u5B89\u88C5\u9009\u9879\uFF1A</strong></p>`,5),an={href:"https://docs.rancher.cn/docs/k3s/installation/install-options/_index#%E4%BD%BF%E7%94%A8%E8%84%9A%E6%9C%AC%E5%AE%89%E8%A3%85%E7%9A%84%E9%80%89%E9%A1%B9",target:"_blank",rel:"noopener noreferrer"},en=s("\u4F7F\u7528\u811A\u672C\u5B89\u88C5\u7684\u9009\u9879"),tn={href:"https://docs.rancher.cn/docs/k3s/installation/install-options/_index#%E4%BB%8E%E4%BA%8C%E8%BF%9B%E5%88%B6%E5%AE%89%E8%A3%85%E7%9A%84%E9%80%89%E9%A1%B9",target:"_blank",rel:"noopener noreferrer"},pn=s("\u4ECE\u4E8C\u8FDB\u5236\u4E2D\u5B89\u88C5\u7684\u9009\u9879"),ln={href:"https://docs.rancher.cn/docs/k3s/installation/install-options/_index#k3s-server-%E7%9A%84%E6%B3%A8%E5%86%8C%E9%80%89%E9%A1%B9",target:"_blank",rel:"noopener noreferrer"},on=s("K3s server \u7684\u6CE8\u518C\u9009\u9879"),cn={href:"https://docs.rancher.cn/docs/k3s/installation/install-options/_index#k3s-agent-%E7%9A%84%E6%B3%A8%E5%86%8C%E9%80%89%E9%A1%B9",target:"_blank",rel:"noopener noreferrer"},rn=s("K3s agent \u7684\u6CE8\u518C\u9009\u9879"),un={href:"https://docs.rancher.cn/docs/k3s/installation/install-options/_index#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6",target:"_blank",rel:"noopener noreferrer"},dn=s("\u914D\u7F6E\u6587\u4EF6"),kn=n("p",null,[n("strong",null,"\u79BB\u7EBF\u5B89\u88C5\uFF1A")],-1),vn={href:"https://docs.rancher.cn/docs/k3s/installation/airgap/_index/",target:"_blank",rel:"noopener noreferrer"},mn=s("https://docs.rancher.cn/docs/k3s/installation/airgap/_index/"),bn=p(`<p>\u65E5\u5FD7\u67E5\u770Bk3s\u542F\u52A8\u4FE1\u606F\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/syslog
<span class="token comment"># \u6216\u8005</span>
kubectl get all <span class="token parameter variable">-n</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),fn=p(`<details class="custom-container details"><summary>k3s \u5B89\u88C5\u811A\u672C</summary><p>https://get.k3s.io</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-o</span> noglob

<span class="token comment"># Usage:</span>
<span class="token comment">#   curl ... | ENV_VAR=... sh -</span>
<span class="token comment">#       or</span>
<span class="token comment">#   ENV_VAR=... ./install.sh</span>
<span class="token comment">#</span>
<span class="token comment"># Example:</span>
<span class="token comment">#   Installing a server without traefik:</span>
<span class="token comment">#     curl ... | INSTALL_K3S_EXEC=&quot;--disable=traefik&quot; sh -</span>
<span class="token comment">#   Installing an agent to point at a server:</span>
<span class="token comment">#     curl ... | K3S_TOKEN=xxx K3S_URL=https://server-url:6443 sh -</span>
<span class="token comment">#</span>
<span class="token comment"># Environment variables:</span>
<span class="token comment">#   - K3S_*</span>
<span class="token comment">#     Environment variables which begin with K3S_ will be preserved for the</span>
<span class="token comment">#     systemd service to use. Setting K3S_URL without explicitly setting</span>
<span class="token comment">#     a systemd exec command will default the command to &quot;agent&quot;, and we</span>
<span class="token comment">#     enforce that K3S_TOKEN or K3S_CLUSTER_SECRET is also set.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_DOWNLOAD</span>
<span class="token comment">#     If set to true will not download k3s hash or binary.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_FORCE_RESTART</span>
<span class="token comment">#     If set to true will always restart the K3s service</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SYMLINK</span>
<span class="token comment">#     If set to &#39;skip&#39; will not create symlinks, &#39;force&#39; will overwrite,</span>
<span class="token comment">#     default will symlink if command does not exist in path.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_ENABLE</span>
<span class="token comment">#     If set to true will not enable or start k3s service.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_START</span>
<span class="token comment">#     If set to true will not start k3s service.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_VERSION</span>
<span class="token comment">#     Version of k3s to download from github. Will attempt to download from the</span>
<span class="token comment">#     stable channel if not specified.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_COMMIT</span>
<span class="token comment">#     Commit of k3s to download from temporary cloud storage.</span>
<span class="token comment">#     * (for developer &amp; QA use)</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_BIN_DIR</span>
<span class="token comment">#     Directory to install k3s binary, links, and uninstall script to, or use</span>
<span class="token comment">#     /usr/local/bin as the default</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_BIN_DIR_READ_ONLY</span>
<span class="token comment">#     If set to true will not write files to INSTALL_K3S_BIN_DIR, forces</span>
<span class="token comment">#     setting INSTALL_K3S_SKIP_DOWNLOAD=true</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SYSTEMD_DIR</span>
<span class="token comment">#     Directory to install systemd service and environment files to, or use</span>
<span class="token comment">#     /etc/systemd/system as the default</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_EXEC or script arguments</span>
<span class="token comment">#     Command with flags to use for launching k3s in the systemd service, if</span>
<span class="token comment">#     the command is not specified will default to &quot;agent&quot; if K3S_URL is set</span>
<span class="token comment">#     or &quot;server&quot; if not. The final systemd command resolves to a combination</span>
<span class="token comment">#     of EXEC and script args ($@).</span>
<span class="token comment">#</span>
<span class="token comment">#     The following commands result in the same behavior:</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC=&quot;--disable=traefik&quot; sh -s -</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC=&quot;server --disable=traefik&quot; sh -s -</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC=&quot;server&quot; sh -s - --disable=traefik</span>
<span class="token comment">#       curl ... | sh -s - server --disable=traefik</span>
<span class="token comment">#       curl ... | sh -s - --disable=traefik</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_NAME</span>
<span class="token comment">#     Name of systemd service to create, will default from the k3s exec command</span>
<span class="token comment">#     if not specified. If specified the name will be prefixed with &#39;k3s-&#39;.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_TYPE</span>
<span class="token comment">#     Type of systemd service to create, will default from the k3s exec command</span>
<span class="token comment">#     if not specified.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SELINUX_WARN</span>
<span class="token comment">#     If set to true will continue if k3s-selinux policy is not found.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_SELINUX_RPM</span>
<span class="token comment">#     If set to true will skip automatic installation of the k3s RPM.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_CHANNEL_URL</span>
<span class="token comment">#     Channel URL for fetching k3s download URL.</span>
<span class="token comment">#     Defaults to &#39;https://update.k3s.io/v1-release/channels&#39;.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_CHANNEL</span>
<span class="token comment">#     Channel to use for fetching k3s download URL.</span>
<span class="token comment">#     Defaults to &#39;stable&#39;.</span>

<span class="token assign-left variable">GITHUB_URL</span><span class="token operator">=</span>https://github.com/k3s-io/k3s/releases
<span class="token assign-left variable">STORAGE_URL</span><span class="token operator">=</span>https://storage.googleapis.com/k3s-ci-builds
<span class="token assign-left variable">DOWNLOADER</span><span class="token operator">=</span>

<span class="token comment"># --- helper functions for logs ---</span>
<span class="token function-name function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&#39;[INFO] &#39;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>
<span class="token punctuation">}</span>
<span class="token function-name function">warn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&#39;[WARN] &#39;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span> <span class="token operator">&gt;</span><span class="token file-descriptor important">&amp;2</span>
<span class="token punctuation">}</span>
<span class="token function-name function">fatal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&#39;[ERROR] &#39;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span> <span class="token operator">&gt;</span><span class="token file-descriptor important">&amp;2</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- fatal if no systemd or openrc ---</span>
<span class="token function-name function">verify_system</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /sbin/openrc-run <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HAS_OPENRC</span><span class="token operator">=</span>true
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /bin/systemctl <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">type</span> systemctl <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HAS_SYSTEMD</span><span class="token operator">=</span>true
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>
    fatal <span class="token string">&#39;Can not find systemd or openrc to use as a process supervisor for k3s&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- add quotes to command arguments ---</span>
<span class="token function-name function">quote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">arg</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">printf</span> <span class="token string">&#39;%s\\n&#39;</span> <span class="token string">&quot;<span class="token variable">$arg</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&quot;s/&#39;/&#39;<span class="token entity" title="\\\\">\\\\</span><span class="token entity" title="\\\\">\\\\</span>&#39;&#39;/g;1s/^/&#39;/;\\<span class="token variable">$s</span>/\\$/&#39;/&quot;</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- add indentation and trailing slash to quoted args ---</span>
<span class="token function-name function">quote_indent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">&#39; \\\\\\n&#39;</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">arg</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">printf</span> <span class="token string">&#39;\\t%s \\\\\\n&#39;</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>quote <span class="token string">&quot;<span class="token variable">$arg</span>&quot;</span><span class="token variable">)</span></span>&quot;</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- escape most punctuation characters, except quotes, forward slash, and space ---</span>
<span class="token function-name function">escape</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">&#39;%s&#39;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/\\([][!#$%&amp;()*;&lt;=&gt;?\\_\`{|}]\\)/\\\\\\1/g;&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- escape double quotes ---</span>
<span class="token function-name function">escape_dq</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">&#39;%s&#39;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/&quot;/\\\\&quot;/g&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- ensures $K3S_URL is empty or begins with https://, exiting fatally otherwise ---</span>
<span class="token function-name function">verify_k3s_url</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">\${K3S_URL}</span>&quot;</span> <span class="token keyword">in</span>
        <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        https://*<span class="token punctuation">)</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">&quot;Only https:// URLs are supported for K3S_URL (have <span class="token variable">\${K3S_URL}</span>)&quot;</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- define needed environment variables ---</span>
<span class="token function-name function">setup_env</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment"># --- use command args if passed or create default ---</span>
    <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>
        <span class="token comment"># --- if we only have flags discover if command should be server or agent ---</span>
        <span class="token punctuation">(</span>-*<span class="token operator">|</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${K3S_URL}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span>server
            <span class="token keyword">else</span>
                <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${K3S_TOKEN}</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${K3S_TOKEN_FILE}</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${K3S_CLUSTER_SECRET}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                    fatal <span class="token string">&quot;Defaulted k3s exec command to &#39;agent&#39; because K3S_URL is defined, but K3S_TOKEN, K3S_TOKEN_FILE or K3S_CLUSTER_SECRET is not defined.&quot;</span>
                <span class="token keyword">fi</span>
                <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span>agent
            <span class="token keyword">fi</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token comment"># --- command is provided ---</span>
        <span class="token punctuation">(</span>*<span class="token punctuation">)</span>
            <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span><span class="token variable">$1</span>
            <span class="token builtin class-name">shift</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    verify_k3s_url

    <span class="token assign-left variable">CMD_K3S_EXEC</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${CMD_K3S}</span><span class="token variable"><span class="token variable">$(</span>quote_indent <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token variable">)</span></span>&quot;</span>

    <span class="token comment"># --- use systemd name if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_NAME}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s-<span class="token variable">\${INSTALL_K3S_NAME}</span>
    <span class="token keyword">else</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${CMD_K3S}</span>&quot;</span> <span class="token operator">=</span> server <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s
        <span class="token keyword">else</span>
            <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s-<span class="token variable">\${CMD_K3S}</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- check for invalid characters in system name ---</span>
    <span class="token assign-left variable">valid_chars</span><span class="token operator">=</span><span class="token punctuation">$(</span>printf <span class="token string">&#39;%s&#39;</span> <span class="token string">&quot;<span class="token variable">\${SYSTEM_NAME}</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/[][!#$%&amp;()*;&lt;=&gt;?\\_\`{|}/[:space:]]/^/g;&#39;</span> <span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${SYSTEM_NAME}</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;<span class="token variable">\${valid_chars}</span>&quot;</span>  <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">invalid_chars</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">printf</span> <span class="token string">&#39;%s&#39;</span> <span class="token string">&quot;<span class="token variable">\${valid_chars}</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/[^^]/ /g&#39;</span><span class="token variable">)</span></span>
        fatal <span class="token string">&quot;Invalid characters for system name:
            <span class="token variable">\${SYSTEM_NAME}</span>
            <span class="token variable">\${invalid_chars}</span>&quot;</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use sudo if we are not already root ---</span>
    <span class="token assign-left variable">SUDO</span><span class="token operator">=</span>sudo
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SUDO</span><span class="token operator">=</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use systemd type if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_TYPE}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEMD_TYPE</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_TYPE}</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">SYSTEMD_TYPE</span><span class="token operator">=</span>notify
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use binary install directory if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_BIN_DIR}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_BIN_DIR}</span>
    <span class="token keyword">else</span>
        <span class="token comment"># --- use /usr/local/bin if root can write to it, otherwise use /opt/bin if it exists</span>
        <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span>/usr/local/bin
        <span class="token keyword">if</span> <span class="token operator">!</span> <span class="token variable">$SUDO</span> <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;touch <span class="token variable">\${BIN_DIR}</span>/k3s-ro-test &amp;&amp; rm -rf <span class="token variable">\${BIN_DIR}</span>/k3s-ro-test&quot;</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /opt/bin <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span>/opt/bin
            <span class="token keyword">fi</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use systemd directory if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SYSTEMD_DIR}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEMD_DIR</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SYSTEMD_DIR}</span>&quot;</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">SYSTEMD_DIR</span><span class="token operator">=</span>/etc/systemd/system
    <span class="token keyword">fi</span>

    <span class="token comment"># --- set related files from system name ---</span>
    <span class="token assign-left variable">SERVICE_K3S</span><span class="token operator">=</span><span class="token variable">\${SYSTEM_NAME}</span>.service
    <span class="token assign-left variable">UNINSTALL_K3S_SH</span><span class="token operator">=</span><span class="token variable">\${UNINSTALL_K3S_SH<span class="token operator">:-</span>\${BIN_DIR}</span>/<span class="token variable">\${SYSTEM_NAME}</span>-uninstall.sh<span class="token punctuation">}</span>
    <span class="token assign-left variable">KILLALL_K3S_SH</span><span class="token operator">=</span><span class="token variable">\${KILLALL_K3S_SH<span class="token operator">:-</span>\${BIN_DIR}</span>/k3s-killall.sh<span class="token punctuation">}</span>

    <span class="token comment"># --- use service or environment location depending on systemd/openrc ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_SYSTEMD}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">FILE_K3S_SERVICE</span><span class="token operator">=</span><span class="token variable">\${SYSTEMD_DIR}</span>/<span class="token variable">\${SERVICE_K3S}</span>
        <span class="token assign-left variable">FILE_K3S_ENV</span><span class="token operator">=</span><span class="token variable">\${SYSTEMD_DIR}</span>/<span class="token variable">\${SERVICE_K3S}</span>.env
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_OPENRC}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token variable">$SUDO</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/rancher/k3s
        <span class="token assign-left variable">FILE_K3S_SERVICE</span><span class="token operator">=</span>/etc/init.d/<span class="token variable">\${SYSTEM_NAME}</span>
        <span class="token assign-left variable">FILE_K3S_ENV</span><span class="token operator">=</span>/etc/rancher/k3s/<span class="token variable">\${SYSTEM_NAME}</span>.env
    <span class="token keyword">fi</span>

    <span class="token comment"># --- get hash of config &amp; exec for currently installed k3s ---</span>
    <span class="token assign-left variable">PRE_INSTALL_HASHES</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_installed_hashes<span class="token variable">)</span></span>

    <span class="token comment"># --- if bin directory is read only skip download ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true
    <span class="token keyword">fi</span>

    <span class="token comment"># --- setup channel values</span>
    <span class="token assign-left variable">INSTALL_K3S_CHANNEL_URL</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_CHANNEL_URL<span class="token operator">:-</span>&#39;https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>update.k3s.io<span class="token operator">/</span>v1-release<span class="token operator">/</span>channels&#39;}</span>
    <span class="token assign-left variable">INSTALL_K3S_CHANNEL</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_CHANNEL<span class="token operator">:-</span>&#39;stable&#39;}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- check if skip download environment variable set ---</span>
<span class="token function-name function">can_skip_download_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_DOWNLOAD}</span>&quot;</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_DOWNLOAD}</span>&quot;</span> <span class="token operator">!=</span> binary <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">return</span> <span class="token number">1</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">can_skip_download_selinux</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>                                                        
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_DOWNLOAD}</span>&quot;</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_DOWNLOAD}</span>&quot;</span> <span class="token operator">!=</span> selinux <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span> 
        <span class="token builtin class-name">return</span> <span class="token number">1</span>                                                                     
    <span class="token keyword">fi</span>                                                                               
<span class="token punctuation">}</span>  

<span class="token comment"># --- verify an executable k3s binary is installed ---</span>
<span class="token function-name function">verify_k3s_is_executable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-x</span> <span class="token variable">\${BIN_DIR}</span>/k3s <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        fatal <span class="token string">&quot;Executable k3s binary not found at <span class="token variable">\${BIN_DIR}</span>/k3s&quot;</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- set arch and suffix, fatal if architecture not supported ---</span>
<span class="token function-name function">setup_verify_arch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$ARCH</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">ARCH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>
    <span class="token keyword">fi</span>
    <span class="token keyword">case</span> <span class="token variable">$ARCH</span> <span class="token keyword">in</span>
        amd64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>amd64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        x86_64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>amd64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        arm64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">\${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        s390x<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>s390x
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">\${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        aarch64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">\${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        arm*<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">\${ARCH}</span>hf
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">&quot;Unsupported architecture <span class="token variable">$ARCH</span>&quot;</span>
    <span class="token keyword">esac</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- verify existence of network downloader executable ---</span>
<span class="token function-name function">verify_downloader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment"># Return failure if it doesn&#39;t exist or is no executable</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> $1<span class="token variable">)</span></span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">return</span> <span class="token number">1</span>

    <span class="token comment"># Set verified executable as our downloader program and return success</span>
    <span class="token assign-left variable">DOWNLOADER</span><span class="token operator">=</span><span class="token variable">$1</span>
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create temporary directory and cleanup when done ---</span>
<span class="token function-name function">setup_tmp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">TMP_DIR</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>mktemp <span class="token parameter variable">-d</span> <span class="token parameter variable">-t</span> k3s-install.XXXXXXXXXX<span class="token variable">)</span></span>
    <span class="token assign-left variable">TMP_HASH</span><span class="token operator">=</span><span class="token variable">\${TMP_DIR}</span>/k3s.hash
    <span class="token assign-left variable">TMP_BIN</span><span class="token operator">=</span><span class="token variable">\${TMP_DIR}</span>/k3s.bin
    <span class="token function-name function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token assign-left variable">code</span><span class="token operator">=</span><span class="token variable">$?</span>
        <span class="token builtin class-name">set</span> +e
        <span class="token builtin class-name">trap</span> - EXIT
        <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">\${TMP_DIR}</span>
        <span class="token builtin class-name">exit</span> <span class="token variable">$code</span>
    <span class="token punctuation">}</span>
    <span class="token builtin class-name">trap</span> cleanup INT EXIT
<span class="token punctuation">}</span>

<span class="token comment"># --- use desired k3s version if defined or find version from channel ---</span>
<span class="token function-name function">get_release_version</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_COMMIT}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token string">&quot;commit <span class="token variable">\${INSTALL_K3S_COMMIT}</span>&quot;</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_VERSION}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_VERSION}</span>
    <span class="token keyword">else</span>
        info <span class="token string">&quot;Finding release for channel <span class="token variable">\${INSTALL_K3S_CHANNEL}</span>&quot;</span>
        <span class="token assign-left variable">version_url</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_CHANNEL_URL}</span>/<span class="token variable">\${INSTALL_K3S_CHANNEL}</span>&quot;</span>
        <span class="token keyword">case</span> <span class="token variable">$DOWNLOADER</span> <span class="token keyword">in</span>
            <span class="token function">curl</span><span class="token punctuation">)</span>
                <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-w</span> <span class="token string">&#39;%{url_effective}&#39;</span> <span class="token parameter variable">-L</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span> <span class="token parameter variable">-o</span> /dev/null <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s|.*/||&#39;</span><span class="token variable">)</span></span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
            <span class="token function">wget</span><span class="token punctuation">)</span>
                <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">wget</span> <span class="token parameter variable">-SqO</span> /dev/null $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> Location <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s|.*/||&#39;</span><span class="token variable">)</span></span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
            *<span class="token punctuation">)</span>
                fatal <span class="token string">&quot;Incorrect downloader executable &#39;<span class="token variable">$DOWNLOADER</span>&#39;&quot;</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
    <span class="token keyword">fi</span>
    info <span class="token string">&quot;Using <span class="token variable">\${VERSION_K3S}</span> as release&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download from github url ---</span>
<span class="token function-name function">download</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token variable">$#</span> <span class="token parameter variable">-eq</span> <span class="token number">2</span> <span class="token punctuation">]</span> <span class="token operator">||</span> fatal <span class="token string">&#39;download needs exactly 2 arguments&#39;</span>

    <span class="token keyword">case</span> <span class="token variable">$DOWNLOADER</span> <span class="token keyword">in</span>
        <span class="token function">curl</span><span class="token punctuation">)</span>
            <span class="token function">curl</span> <span class="token parameter variable">-o</span> <span class="token variable">$1</span> <span class="token parameter variable">-sfL</span> <span class="token variable">$2</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token function">wget</span><span class="token punctuation">)</span>
            <span class="token function">wget</span> <span class="token parameter variable">-qO</span> <span class="token variable">$1</span> <span class="token variable">$2</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">&quot;Incorrect executable &#39;<span class="token variable">$DOWNLOADER</span>&#39;&quot;</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    <span class="token comment"># Abort if download command failed</span>
    <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">||</span> fatal <span class="token string">&#39;Download failed&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download hash from github url ---</span>
<span class="token function-name function">download_hash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_COMMIT}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HASH_URL</span><span class="token operator">=</span><span class="token variable">\${STORAGE_URL}</span>/k3s<span class="token variable">\${SUFFIX}</span>-<span class="token variable">\${INSTALL_K3S_COMMIT}</span>.sha256sum
    <span class="token keyword">else</span>
        <span class="token assign-left variable">HASH_URL</span><span class="token operator">=</span><span class="token variable">\${GITHUB_URL}</span>/download/<span class="token variable">\${VERSION_K3S}</span>/sha256sum-<span class="token variable">\${ARCH}</span>.txt
    <span class="token keyword">fi</span>
    info <span class="token string">&quot;Downloading hash <span class="token variable">\${HASH_URL}</span>&quot;</span>
    download <span class="token variable">\${TMP_HASH}</span> <span class="token variable">\${HASH_URL}</span>
    <span class="token assign-left variable">HASH_EXPECTED</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">grep</span> <span class="token string">&quot; k3s<span class="token variable">\${SUFFIX}</span>$&quot;</span> $<span class="token punctuation">{</span>TMP_HASH<span class="token punctuation">}</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">HASH_EXPECTED</span><span class="token operator">=</span><span class="token variable">\${HASH_EXPECTED<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- check hash against installed version ---</span>
<span class="token function-name function">installed_hash_matches</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">\${BIN_DIR}</span>/k3s <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HASH_INSTALLED</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>sha256sum $<span class="token punctuation">{</span>BIN_DIR<span class="token punctuation">}</span>/k3s<span class="token variable">)</span></span>
        <span class="token assign-left variable">HASH_INSTALLED</span><span class="token operator">=</span><span class="token variable">\${HASH_INSTALLED<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HASH_EXPECTED}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">\${HASH_INSTALLED}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token builtin class-name">return</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">return</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download binary from github url ---</span>
<span class="token function-name function">download_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_COMMIT}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">BIN_URL</span><span class="token operator">=</span><span class="token variable">\${STORAGE_URL}</span>/k3s<span class="token variable">\${SUFFIX}</span>-<span class="token variable">\${INSTALL_K3S_COMMIT}</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">BIN_URL</span><span class="token operator">=</span><span class="token variable">\${GITHUB_URL}</span>/download/<span class="token variable">\${VERSION_K3S}</span>/k3s<span class="token variable">\${SUFFIX}</span>
    <span class="token keyword">fi</span>
    info <span class="token string">&quot;Downloading binary <span class="token variable">\${BIN_URL}</span>&quot;</span>
    download <span class="token variable">\${TMP_BIN}</span> <span class="token variable">\${BIN_URL}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- verify downloaded binary hash ---</span>
<span class="token function-name function">verify_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;Verifying binary download&quot;</span>
    <span class="token assign-left variable">HASH_BIN</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>sha256sum $<span class="token punctuation">{</span>TMP_BIN<span class="token punctuation">}</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">HASH_BIN</span><span class="token operator">=</span><span class="token variable">\${HASH_BIN<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HASH_EXPECTED}</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;<span class="token variable">\${HASH_BIN}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        fatal <span class="token string">&quot;Download sha256 does not match <span class="token variable">\${HASH_EXPECTED}</span>, got <span class="token variable">\${HASH_BIN}</span>&quot;</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- setup permissions and move binary to system directory ---</span>
<span class="token function-name function">setup_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">\${TMP_BIN}</span>
    info <span class="token string">&quot;Installing k3s to <span class="token variable">\${BIN_DIR}</span>/k3s&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">\${TMP_BIN}</span>
    <span class="token variable">$SUDO</span> <span class="token function">mv</span> <span class="token parameter variable">-f</span> <span class="token variable">\${TMP_BIN}</span> <span class="token variable">\${BIN_DIR}</span>/k3s
<span class="token punctuation">}</span>

<span class="token comment"># --- setup selinux policy ---</span>
<span class="token function-name function">setup_selinux</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token variable">\${INSTALL_K3S_CHANNEL}</span> <span class="token keyword">in</span> 
        *testing<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>testing
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *latest<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>latest
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>stable
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    <span class="token assign-left variable">rpm_site</span><span class="token operator">=</span><span class="token string">&quot;rpm.rancher.io&quot;</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${rpm_channel}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;testing&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_site</span><span class="token operator">=</span><span class="token string">&quot;rpm-testing.rancher.io&quot;</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/os-release <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">.</span> /etc/os-release
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${ID_LIKE<span class="token operator">%%</span><span class="token punctuation">[</span> <span class="token punctuation">]</span>*}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;suse&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>sle
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>microos
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>zypper
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${VERSION_ID<span class="token operator">%%</span>.*}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;7&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>el7
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>centos/7
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>yum
    <span class="token keyword">else</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>el8
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>centos/8
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>yum
    <span class="token keyword">fi</span>

    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${package_installer}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;yum&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/bin/dnf <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>dnf
    <span class="token keyword">fi</span>

    <span class="token assign-left variable">policy_hint</span><span class="token operator">=</span><span class="token string">&quot;please install:
    <span class="token variable">\${package_installer}</span> install -y container-selinux
    <span class="token variable">\${package_installer}</span> install -y https://<span class="token variable">\${rpm_site}</span>/k3s/<span class="token variable">\${rpm_channel}</span>/common/<span class="token variable">\${rpm_site_infix}</span>/noarch/k3s-selinux-0.4-1.<span class="token variable">\${rpm_target}</span>.noarch.rpm
&quot;</span>

    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$INSTALL_K3S_SKIP_SELINUX_RPM</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">||</span> can_skip_download_selinux <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-d</span> /usr/share/selinux <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">&quot;Skipping installation of SELinux RPM&quot;</span>
    <span class="token keyword">elif</span>  <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${ID_LIKE<span class="token operator">:-</span>}</span>&quot;</span> <span class="token operator">!=</span> coreos <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${VARIANT_ID<span class="token operator">:-</span>}</span>&quot;</span> <span class="token operator">!=</span> coreos <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        install_selinux_rpm <span class="token variable">\${rpm_site}</span> <span class="token variable">\${rpm_channel}</span> <span class="token variable">\${rpm_target}</span> <span class="token variable">\${rpm_site_infix}</span>
    <span class="token keyword">fi</span>

    <span class="token assign-left variable">policy_error</span><span class="token operator">=</span>fatal
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$INSTALL_K3S_SELINUX_WARN</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${ID_LIKE<span class="token operator">:-</span>}</span>&quot;</span> <span class="token operator">=</span> coreos <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${VARIANT_ID<span class="token operator">:-</span>}</span>&quot;</span> <span class="token operator">=</span> coreos <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">policy_error</span><span class="token operator">=</span>warn
    <span class="token keyword">fi</span>

    <span class="token keyword">if</span> <span class="token operator">!</span> <span class="token variable">$SUDO</span> chcon <span class="token parameter variable">-u</span> system_u <span class="token parameter variable">-r</span> object_r <span class="token parameter variable">-t</span> container_runtime_exec_t <span class="token variable">\${BIN_DIR}</span>/k3s <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token keyword">if</span> <span class="token variable">$SUDO</span> <span class="token function">grep</span> <span class="token string">&#39;^\\s*SELINUX=enforcing&#39;</span> /etc/selinux/config <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token variable">$policy_error</span> <span class="token string">&quot;Failed to apply container_runtime_exec_t to <span class="token variable">\${BIN_DIR}</span>/k3s, <span class="token variable">\${policy_hint}</span>&quot;</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> /usr/share/selinux/packages/k3s.pp <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/sbin/transactional-update <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            warn <span class="token string">&quot;Please reboot your machine to activate the changes and avoid data loss.&quot;</span>
        <span class="token keyword">else</span>
            <span class="token variable">$policy_error</span> <span class="token string">&quot;Failed to find the k3s-selinux policy, <span class="token variable">\${policy_hint}</span>&quot;</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">install_selinux_rpm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/redhat-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/centos-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/oracle-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${ID_LIKE<span class="token operator">%%</span><span class="token punctuation">[</span> <span class="token punctuation">]</span>*}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;suse&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">repodir</span><span class="token operator">=</span>/etc/yum.repos.d
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /etc/zypp/repos.d <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">repodir</span><span class="token operator">=</span>/etc/zypp/repos.d
        <span class="token keyword">fi</span>
        <span class="token builtin class-name">set</span> +o noglob
        <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable">\${repodir}</span>/rancher-k3s-common*.repo
        <span class="token builtin class-name">set</span> <span class="token parameter variable">-o</span> noglob
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/redhat-release <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${3}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;el7&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token variable">$SUDO</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils
            <span class="token variable">$SUDO</span> yum-config-manager <span class="token parameter variable">--enable</span> rhel-7-server-extras-rpms
        <span class="token keyword">fi</span>
        <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${repodir}</span>/rancher-k3s-common.repo <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[rancher-k3s-common-<span class="token variable">\${2}</span>]
name=Rancher K3s Common (<span class="token variable">\${2}</span>)
baseurl=https://<span class="token variable">\${1}</span>/k3s/<span class="token variable">\${2}</span>/common/<span class="token variable">\${4}</span>/noarch
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://<span class="token variable">\${1}</span>/public.key
EOF</span>
        <span class="token keyword">case</span> <span class="token variable">\${3}</span> <span class="token keyword">in</span>
        sle<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">&quot;zypper --gpg-auto-import-keys&quot;</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${TRANSACTIONAL_UPDATE=false}</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;true&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/sbin/transactional-update <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">&quot;transactional-update --no-selfupdate -d run <span class="token variable">\${rpm_installer}</span>&quot;</span>
                <span class="token builtin class-name">:</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_START<span class="token operator">:=</span>true}</span>&quot;</span>
            <span class="token keyword">fi</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">&quot;yum&quot;</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${rpm_installer}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;yum&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/bin/dnf <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span>dnf
        <span class="token keyword">fi</span>
        <span class="token comment"># shellcheck disable=SC2086</span>
        <span class="token variable">$SUDO</span> <span class="token variable">\${rpm_installer}</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token string">&quot;k3s-selinux&quot;</span>
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">return</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download and verify k3s ---</span>
<span class="token function-name function">download_and_verify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> can_skip_download_binary<span class="token punctuation">;</span> <span class="token keyword">then</span>
       info <span class="token string">&#39;Skipping k3s download and verify&#39;</span>
       verify_k3s_is_executable
       <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    setup_verify_arch
    verify_downloader <span class="token function">curl</span> <span class="token operator">||</span> verify_downloader <span class="token function">wget</span> <span class="token operator">||</span> fatal <span class="token string">&#39;Can not find curl or wget for downloading files&#39;</span>
    setup_tmp
    get_release_version
    download_hash

    <span class="token keyword">if</span> installed_hash_matches<span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">&#39;Skipping binary downloaded, installed k3s matches hash&#39;</span>
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    download_binary
    verify_binary
    setup_binary
<span class="token punctuation">}</span>

<span class="token comment"># --- add additional utility links ---</span>
<span class="token function-name function">create_symlinks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SYMLINK}</span>&quot;</span> <span class="token operator">=</span> skip <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token keyword">for</span> <span class="token for-or-select variable">cmd</span> <span class="token keyword">in</span> kubectl crictl ctr<span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-e</span> <span class="token variable">\${BIN_DIR}</span>/<span class="token variable">\${cmd}</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SYMLINK}</span>&quot;</span> <span class="token operator">=</span> force <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">which_cmd</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> $<span class="token punctuation">{</span>cmd<span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token boolean">true</span><span class="token variable">)</span></span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${which_cmd}</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SYMLINK}</span>&quot;</span> <span class="token operator">=</span> force <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                info <span class="token string">&quot;Creating <span class="token variable">\${BIN_DIR}</span>/<span class="token variable">\${cmd}</span> symlink to k3s&quot;</span>
                <span class="token variable">$SUDO</span> <span class="token function">ln</span> <span class="token parameter variable">-sf</span> k3s <span class="token variable">\${BIN_DIR}</span>/<span class="token variable">\${cmd}</span>
            <span class="token keyword">else</span>
                info <span class="token string">&quot;Skipping <span class="token variable">\${BIN_DIR}</span>/<span class="token variable">\${cmd}</span> symlink to k3s, command exists in PATH at <span class="token variable">\${which_cmd}</span>&quot;</span>
            <span class="token keyword">fi</span>
        <span class="token keyword">else</span>
            info <span class="token string">&quot;Skipping <span class="token variable">\${BIN_DIR}</span>/<span class="token variable">\${cmd}</span> symlink to k3s, already exists&quot;</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create killall script ---</span>
<span class="token function-name function">create_killall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    info <span class="token string">&quot;Creating killall script <span class="token variable">\${KILLALL_K3S_SH}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${KILLALL_K3S_SH}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token punctuation">\\</span>EOF
<span class="token comment">#!/bin/sh</span>
<span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">exec</span> <span class="token function">sudo</span> <span class="token variable">$0</span> <span class="token variable">$@</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">bin</span> <span class="token keyword">in</span> /var/lib/rancher/k3s/data/**/bin/<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable">$bin</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$bin</span><span class="token builtin class-name">:</span><span class="token variable">$bin</span>/aux
<span class="token keyword">done</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">service</span> <span class="token keyword">in</span> /etc/systemd/system/k3s*.service<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-s</span> <span class="token variable">$service</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemctl stop <span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $service<span class="token variable">)</span></span>
<span class="token keyword">done</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">service</span> <span class="token keyword">in</span> /etc/init.d/k3s*<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">$service</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$service</span> stop
<span class="token keyword">done</span>

<span class="token function-name function">pschildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">ps</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">ppid</span><span class="token operator">=</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">pid</span><span class="token operator">=</span> <span class="token operator">|</span> <span class="token punctuation">\\</span>
    <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/^\\s*//g; s/\\s\\s*/\\t/g;&#39;</span> <span class="token operator">|</span> <span class="token punctuation">\\</span>
    <span class="token function">grep</span> <span class="token parameter variable">-w</span> <span class="token string">&quot;^<span class="token variable">$1</span>&quot;</span> <span class="token operator">|</span> <span class="token punctuation">\\</span>
    <span class="token function">cut</span> <span class="token parameter variable">-f2</span>
<span class="token punctuation">}</span>

<span class="token function-name function">pstree</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">pid</span> <span class="token keyword">in</span> <span class="token variable">$@</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">echo</span> <span class="token variable">$pid</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">child</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span>pschildren $pid<span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
            pstree <span class="token variable">$child</span>
        <span class="token keyword">done</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token function-name function">killtree</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable"><span class="token variable">$(</span>
        <span class="token punctuation">{</span> <span class="token builtin class-name">set</span> +x<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null<span class="token punctuation">;</span>
        pstree $@<span class="token punctuation">;</span>
        <span class="token builtin class-name">set</span> -x<span class="token punctuation">;</span>
    <span class="token variable">)</span></span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">getshims</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">ps</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">pid</span><span class="token operator">=</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">args</span><span class="token operator">=</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/^ *//; s/\\s\\s*/\\t/;&#39;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-w</span> <span class="token string">&#39;k3s/data/[^/]*/bin/containerd-shim&#39;</span> <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f1</span>
<span class="token punctuation">}</span>

killtree <span class="token variable"><span class="token variable">$(</span><span class="token punctuation">{</span> <span class="token builtin class-name">set</span> +x<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null<span class="token punctuation">;</span> getshims<span class="token punctuation">;</span> <span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span><span class="token variable">)</span></span>

<span class="token function-name function">do_unmount_and_remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">set</span> +x
    <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> _ path _<span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$path</span>&quot;</span> <span class="token keyword">in</span> <span class="token variable">$1</span>*<span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$path</span>&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span> <span class="token keyword">esac</span>
    <span class="token keyword">done</span> <span class="token operator">&lt;</span> /proc/self/mounts <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&#39;umount &quot;$0&quot; &amp;&amp; rm -rf &quot;$0&quot;&#39;</span>
    <span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>
<span class="token punctuation">}</span>

do_unmount_and_remove <span class="token string">&#39;/run/k3s&#39;</span>
do_unmount_and_remove <span class="token string">&#39;/var/lib/rancher/k3s&#39;</span>
do_unmount_and_remove <span class="token string">&#39;/var/lib/kubelet/pods&#39;</span>
do_unmount_and_remove <span class="token string">&#39;/var/lib/kubelet/plugins&#39;</span>
do_unmount_and_remove <span class="token string">&#39;/run/netns/cni-&#39;</span>

<span class="token comment"># Remove CNI namespaces</span>
<span class="token function">ip</span> netns show <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">|</span> <span class="token function">grep</span> cni- <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token function">ip</span> netns delete

<span class="token comment"># Delete network interface(s) that match &#39;master cni0&#39;</span>
<span class="token function">ip</span> <span class="token function">link</span> show <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;master cni0&#39;</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> ignore iface ignore<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token assign-left variable">iface</span><span class="token operator">=</span><span class="token variable">\${iface<span class="token operator">%%</span>@*}</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$iface</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token function">ip</span> <span class="token function">link</span> delete <span class="token variable">$iface</span>
<span class="token keyword">done</span>
<span class="token function">ip</span> <span class="token function">link</span> delete cni0
<span class="token function">ip</span> <span class="token function">link</span> delete flannel.1
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-v6.1
<span class="token function">ip</span> <span class="token function">link</span> delete kube-ipvs0
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-wg
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-wg-v6
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/cni/
iptables-save <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> KUBE- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> CNI- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-iv</span> flannel <span class="token operator">|</span> iptables-restore
ip6tables-save <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> KUBE- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> CNI- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-iv</span> flannel <span class="token operator">|</span> ip6tables-restore
EOF
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">\${KILLALL_K3S_SH}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">\${KILLALL_K3S_SH}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create uninstall script ---</span>
<span class="token function-name function">create_uninstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    info <span class="token string">&quot;Creating uninstall script <span class="token variable">\${UNINSTALL_K3S_SH}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${UNINSTALL_K3S_SH}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/sh
set -x
[ \\<span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> -eq 0 ] || exec sudo \\<span class="token variable">$0</span> \\<span class="token variable">$@</span>

<span class="token variable">\${KILLALL_K3S_SH}</span>

if command -v systemctl; then
    systemctl disable <span class="token variable">\${SYSTEM_NAME}</span>
    systemctl reset-failed <span class="token variable">\${SYSTEM_NAME}</span>
    systemctl daemon-reload
fi
if command -v rc-update; then
    rc-update delete <span class="token variable">\${SYSTEM_NAME}</span> default
fi

rm -f <span class="token variable">\${FILE_K3S_SERVICE}</span>
rm -f <span class="token variable">\${FILE_K3S_ENV}</span>

remove_uninstall() {
    rm -f <span class="token variable">\${UNINSTALL_K3S_SH}</span>
}
trap remove_uninstall EXIT

if (ls <span class="token variable">\${SYSTEMD_DIR}</span>/k3s*.service || ls /etc/init.d/k3s*) &gt;/dev/null 2&gt;&amp;1; then
    set +x; echo &#39;Additional k3s services installed, skipping uninstall of k3s&#39;; set -x
    exit
fi

for cmd in kubectl crictl ctr; do
    if [ -L <span class="token variable">\${BIN_DIR}</span>/\\<span class="token variable">$cmd</span> ]; then
        rm -f <span class="token variable">\${BIN_DIR}</span>/\\<span class="token variable">$cmd</span>
    fi
done

rm -rf /etc/rancher/k3s
rm -rf /run/k3s
rm -rf /run/flannel
rm -rf /var/lib/rancher/k3s
rm -rf /var/lib/kubelet
rm -f <span class="token variable">\${BIN_DIR}</span>/k3s
rm -f <span class="token variable">\${KILLALL_K3S_SH}</span>

if type yum &gt;/dev/null 2&gt;&amp;1; then
    yum remove -y k3s-selinux
    rm -f /etc/yum.repos.d/rancher-k3s-common*.repo
elif type zypper &gt;/dev/null 2&gt;&amp;1; then
    uninstall_cmd=&quot;zypper remove -y k3s-selinux&quot;
    if [ &quot;\\<span class="token variable">\${TRANSACTIONAL_UPDATE=false}</span>&quot; != &quot;true&quot; ] &amp;&amp; [ -x /usr/sbin/transactional-update ]; then
        uninstall_cmd=&quot;transactional-update --no-selfupdate -d run \\<span class="token variable">$uninstall_cmd</span>&quot;
    fi
    \\<span class="token variable">$uninstall_cmd</span>
    rm -f /etc/zypp/repos.d/rancher-k3s-common*.repo
fi
EOF</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">\${UNINSTALL_K3S_SH}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">\${UNINSTALL_K3S_SH}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- disable current service if loaded --</span>
<span class="token function-name function">systemd_disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$SUDO</span> systemctl disable <span class="token variable">\${SYSTEM_NAME}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">||</span> <span class="token boolean">true</span>
    <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/systemd/system/<span class="token variable">\${SERVICE_K3S}</span> <span class="token operator">||</span> <span class="token boolean">true</span>
    <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/systemd/system/<span class="token variable">\${SERVICE_K3S}</span>.env <span class="token operator">||</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- capture current env and create file containing k3s_ variables ---</span>
<span class="token function-name function">create_env_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;env: Creating environment file <span class="token variable">\${FILE_K3S_ENV}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">touch</span> <span class="token variable">\${FILE_K3S_ENV}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> 0600 <span class="token variable">\${FILE_K3S_ENV}</span>
    <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token builtin class-name">export</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> x <span class="token function">v</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$v</span><span class="token punctuation">;</span> <span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&#39;^(K3S|CONTAINERD)_&#39;</span> <span class="token operator">|</span> <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${FILE_K3S_ENV}</span> <span class="token operator">&gt;</span>/dev/null
    <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token builtin class-name">export</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> x <span class="token function">v</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$v</span><span class="token punctuation">;</span> <span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-Ei</span> <span class="token string">&#39;^(NO|HTTP|HTTPS)_PROXY&#39;</span> <span class="token operator">|</span> <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> <span class="token variable">\${FILE_K3S_ENV}</span> <span class="token operator">&gt;</span>/dev/null
<span class="token punctuation">}</span>

<span class="token comment"># --- write systemd service file ---</span>
<span class="token function-name function">create_systemd_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;systemd: Creating service file <span class="token variable">\${FILE_K3S_SERVICE}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${FILE_K3S_SERVICE}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[Unit]
Description=Lightweight Kubernetes
Documentation=https://k3s.io
Wants=network-online.target
After=network-online.target

[Install]
WantedBy=multi-user.target

[Service]
Type=<span class="token variable">\${SYSTEMD_TYPE}</span>
EnvironmentFile=-/etc/default/%N
EnvironmentFile=-/etc/sysconfig/%N
EnvironmentFile=-<span class="token variable">\${FILE_K3S_ENV}</span>
KillMode=process
Delegate=yes
# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNOFILE=1048576
LimitNPROC=infinity
LimitCORE=infinity
TasksMax=infinity
TimeoutStartSec=0
Restart=always
RestartSec=5s
ExecStartPre=/bin/sh -xc &#39;! /usr/bin/systemctl is-enabled --quiet nm-cloud-setup.service&#39;
ExecStartPre=-/sbin/modprobe br_netfilter
ExecStartPre=-/sbin/modprobe overlay
ExecStart=<span class="token variable">\${BIN_DIR}</span>/k3s <span class="token entity" title="\\\\">\\\\</span>
    <span class="token variable">\${CMD_K3S_EXEC}</span>

EOF</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- write openrc service file ---</span>
<span class="token function-name function">create_openrc_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">LOG_FILE</span><span class="token operator">=</span>/var/log/<span class="token variable">\${SYSTEM_NAME}</span>.log

    info <span class="token string">&quot;openrc: Creating service file <span class="token variable">\${FILE_K3S_SERVICE}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${FILE_K3S_SERVICE}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/sbin/openrc-run

depend() {
    after network-online
    want cgroups
}

start_pre() {
    rm -f /tmp/k3s.*
}

supervisor=supervise-daemon
name=<span class="token variable">\${SYSTEM_NAME}</span>
command=&quot;<span class="token variable">\${BIN_DIR}</span>/k3s&quot;
command_args=&quot;<span class="token variable"><span class="token variable">$(</span>escape_dq <span class="token string">&quot;<span class="token variable">\${CMD_K3S_EXEC}</span>&quot;</span><span class="token variable">)</span></span>
    &gt;&gt;<span class="token variable">\${LOG_FILE}</span> 2&gt;&amp;1&quot;

output_log=<span class="token variable">\${LOG_FILE}</span>
error_log=<span class="token variable">\${LOG_FILE}</span>

pidfile=&quot;/var/run/<span class="token variable">\${SYSTEM_NAME}</span>.pid&quot;
respawn_delay=5
respawn_max=0

set -o allexport
if [ -f /etc/environment ]; then source /etc/environment; fi
if [ -f <span class="token variable">\${FILE_K3S_ENV}</span> ]; then source <span class="token variable">\${FILE_K3S_ENV}</span>; fi
set +o allexport
EOF</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> 0755 <span class="token variable">\${FILE_K3S_SERVICE}</span>

    <span class="token variable">$SUDO</span> <span class="token function">tee</span> /etc/logrotate.d/<span class="token variable">\${SYSTEM_NAME}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
<span class="token variable">\${LOG_FILE}</span> {
	missingok
	notifempty
	copytruncate
}
EOF</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- write systemd or openrc service file ---</span>
<span class="token function-name function">create_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_SYSTEMD}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> create_systemd_service_file
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_OPENRC}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> create_openrc_service_file
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- get hashes of the current k3s bin and service files</span>
<span class="token function-name function">get_installed_hashes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$SUDO</span> sha256sum <span class="token variable">\${BIN_DIR}</span>/k3s <span class="token variable">\${FILE_K3S_SERVICE}</span> <span class="token variable">\${FILE_K3S_ENV}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">||</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- enable and start systemd service ---</span>
<span class="token function-name function">systemd_enable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;systemd: Enabling <span class="token variable">\${SYSTEM_NAME}</span> unit&quot;</span>
    <span class="token variable">$SUDO</span> systemctl <span class="token builtin class-name">enable</span> <span class="token variable">\${FILE_K3S_SERVICE}</span> <span class="token operator">&gt;</span>/dev/null
    <span class="token variable">$SUDO</span> systemctl daemon-reload <span class="token operator">&gt;</span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">systemd_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;systemd: Starting <span class="token variable">\${SYSTEM_NAME}</span>&quot;</span>
    <span class="token variable">$SUDO</span> systemctl restart <span class="token variable">\${SYSTEM_NAME}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- enable and start openrc service ---</span>
<span class="token function-name function">openrc_enable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;openrc: Enabling <span class="token variable">\${SYSTEM_NAME}</span> service for default runlevel&quot;</span>
    <span class="token variable">$SUDO</span> rc-update <span class="token function">add</span> <span class="token variable">\${SYSTEM_NAME}</span> default <span class="token operator">&gt;</span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">openrc_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;openrc: Starting <span class="token variable">\${SYSTEM_NAME}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token variable">\${FILE_K3S_SERVICE}</span> restart
<span class="token punctuation">}</span>

<span class="token comment"># --- startup systemd or openrc service ---</span>
<span class="token function-name function">service_enable_and_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;/proc/cgroups&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">grep</span> memory /proc/cgroups <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> n n n enabled<span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> $enabled<span class="token punctuation">;</span> <span class="token keyword">done</span><span class="token variable">)</span></span>&quot;</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">then</span>
        info <span class="token string">&#39;Failed to find memory cgroup, you may need to add &quot;cgroup_memory=1 cgroup_enable=memory&quot; to your linux cmdline (/boot/cmdline.txt on a Raspberry Pi)&#39;</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_ENABLE}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_SYSTEMD}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemd_enable
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_OPENRC}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> openrc_enable

    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_START}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token assign-left variable">POST_INSTALL_HASHES</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_installed_hashes<span class="token variable">)</span></span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${PRE_INSTALL_HASHES}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">\${POST_INSTALL_HASHES}</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_FORCE_RESTART}</span>&quot;</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">&#39;No change detected so skipping service start&#39;</span>
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_SYSTEMD}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemd_start
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_OPENRC}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> openrc_start
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- re-evaluate args to include env command ---</span>
<span class="token builtin class-name">eval</span> <span class="token builtin class-name">set</span> -- <span class="token variable"><span class="token variable">$(</span>escape <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_EXEC}</span>&quot;</span><span class="token variable">)</span></span> <span class="token variable"><span class="token variable">$(</span>quote <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token variable">)</span></span>

<span class="token comment"># --- run the install process --</span>
<span class="token punctuation">{</span>
    verify_system
    setup_env <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>
    download_and_verify
    setup_selinux
    create_symlinks
    create_killall
    create_uninstall
    systemd_disable
    create_env_file
    create_service_file
    service_enable_and_start
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token shebang important">#!/bin/sh</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-e</span>
<span class="token builtin class-name">set</span> <span class="token parameter variable">-o</span> noglob

<span class="token comment"># Usage:</span>
<span class="token comment">#   curl ... | ENV_VAR=... sh -</span>
<span class="token comment">#       or</span>
<span class="token comment">#   ENV_VAR=... ./install.sh</span>
<span class="token comment">#</span>
<span class="token comment"># Example:</span>
<span class="token comment">#   Installing a server without traefik:</span>
<span class="token comment">#     curl ... | INSTALL_K3S_EXEC=&quot;--disable=traefik&quot; sh -</span>
<span class="token comment">#   Installing an agent to point at a server:</span>
<span class="token comment">#     curl ... | K3S_TOKEN=xxx K3S_URL=https://server-url:6443 sh -</span>
<span class="token comment">#</span>
<span class="token comment"># Environment variables:</span>
<span class="token comment">#   - K3S_*</span>
<span class="token comment">#     Environment variables which begin with K3S_ will be preserved for the</span>
<span class="token comment">#     systemd service to use. Setting K3S_URL without explicitly setting</span>
<span class="token comment">#     a systemd exec command will default the command to &quot;agent&quot;, and we</span>
<span class="token comment">#     enforce that K3S_TOKEN or K3S_CLUSTER_SECRET is also set.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_DOWNLOAD</span>
<span class="token comment">#     If set to true will not download k3s hash or binary.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_FORCE_RESTART</span>
<span class="token comment">#     If set to true will always restart the K3s service</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SYMLINK</span>
<span class="token comment">#     If set to &#39;skip&#39; will not create symlinks, &#39;force&#39; will overwrite,</span>
<span class="token comment">#     default will symlink if command does not exist in path.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_ENABLE</span>
<span class="token comment">#     If set to true will not enable or start k3s service.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_START</span>
<span class="token comment">#     If set to true will not start k3s service.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_VERSION</span>
<span class="token comment">#     Version of k3s to download from github. Will attempt to download from the</span>
<span class="token comment">#     stable channel if not specified.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_COMMIT</span>
<span class="token comment">#     Commit of k3s to download from temporary cloud storage.</span>
<span class="token comment">#     * (for developer &amp; QA use)</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_BIN_DIR</span>
<span class="token comment">#     Directory to install k3s binary, links, and uninstall script to, or use</span>
<span class="token comment">#     /usr/local/bin as the default</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_BIN_DIR_READ_ONLY</span>
<span class="token comment">#     If set to true will not write files to INSTALL_K3S_BIN_DIR, forces</span>
<span class="token comment">#     setting INSTALL_K3S_SKIP_DOWNLOAD=true</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SYSTEMD_DIR</span>
<span class="token comment">#     Directory to install systemd service and environment files to, or use</span>
<span class="token comment">#     /etc/systemd/system as the default</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_EXEC or script arguments</span>
<span class="token comment">#     Command with flags to use for launching k3s in the systemd service, if</span>
<span class="token comment">#     the command is not specified will default to &quot;agent&quot; if K3S_URL is set</span>
<span class="token comment">#     or &quot;server&quot; if not. The final systemd command resolves to a combination</span>
<span class="token comment">#     of EXEC and script args ($@).</span>
<span class="token comment">#</span>
<span class="token comment">#     The following commands result in the same behavior:</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC=&quot;--disable=traefik&quot; sh -s -</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC=&quot;server --disable=traefik&quot; sh -s -</span>
<span class="token comment">#       curl ... | INSTALL_K3S_EXEC=&quot;server&quot; sh -s - --disable=traefik</span>
<span class="token comment">#       curl ... | sh -s - server --disable=traefik</span>
<span class="token comment">#       curl ... | sh -s - --disable=traefik</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_NAME</span>
<span class="token comment">#     Name of systemd service to create, will default from the k3s exec command</span>
<span class="token comment">#     if not specified. If specified the name will be prefixed with &#39;k3s-&#39;.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_TYPE</span>
<span class="token comment">#     Type of systemd service to create, will default from the k3s exec command</span>
<span class="token comment">#     if not specified.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_MIRROR</span>
<span class="token comment">#     For Chinese users, set INSTALL_K3S_MIRROR=cn to use the mirror address to accelerate</span>
<span class="token comment">#     k3s binary file download, and the default mirror address is mirror_k3s.rancher.cn</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SELINUX_WARN</span>
<span class="token comment">#     If set to true will continue if k3s-selinux policy is not found.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_SKIP_SELINUX_RPM</span>
<span class="token comment">#     If set to true will skip automatic installation of the k3s RPM.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_CHANNEL_URL</span>
<span class="token comment">#     Channel URL for fetching k3s download URL.</span>
<span class="token comment">#     Defaults to &#39;https://update.k3s.io/v1-release/channels&#39;.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_CHANNEL</span>
<span class="token comment">#     Channel to use for fetching k3s download URL.</span>
<span class="token comment">#     Defaults to &#39;stable&#39;.</span>
<span class="token comment">#</span>
<span class="token comment">#   - INSTALL_K3S_REGISTRIES</span>
<span class="token comment">#     Setup a custom Registry or Mirror</span>
<span class="token comment">#     Defaults to null.</span>

<span class="token assign-left variable">GITHUB_URL</span><span class="token operator">=</span>https://github.com/k3s-io/k3s/releases
<span class="token assign-left variable">STORAGE_URL</span><span class="token operator">=</span>https://storage.googleapis.com/k3s-ci-builds
<span class="token assign-left variable">DOWNLOADER</span><span class="token operator">=</span>
<span class="token assign-left variable">INSTALL_K3S_MIRROR_URL</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_MIRROR_URL<span class="token operator">:-</span>&#39;rancher-mirror.oss-cn-beijing.aliyuncs.com&#39;}</span>

<span class="token comment"># --- helper functions for logs ---</span>
<span class="token function-name function">info</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&#39;[INFO] &#39;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>
<span class="token punctuation">}</span>
<span class="token function-name function">warn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&#39;[WARN] &#39;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span> <span class="token operator">&gt;</span><span class="token file-descriptor important">&amp;2</span>
<span class="token punctuation">}</span>
<span class="token function-name function">fatal</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token builtin class-name">echo</span> <span class="token string">&#39;[ERROR] &#39;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span> <span class="token operator">&gt;</span><span class="token file-descriptor important">&amp;2</span>
    <span class="token builtin class-name">exit</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- fatal if no systemd or openrc ---</span>
<span class="token function-name function">verify_system</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /sbin/openrc-run <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HAS_OPENRC</span><span class="token operator">=</span>true
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /bin/systemctl <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">type</span> systemctl <span class="token operator">&gt;</span> /dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HAS_SYSTEMD</span><span class="token operator">=</span>true
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>
    fatal <span class="token string">&#39;Can not find systemd or openrc to use as a process supervisor for k3s&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- add quotes to command arguments ---</span>
<span class="token function-name function">quote</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">arg</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">printf</span> <span class="token string">&#39;%s\\n&#39;</span> <span class="token string">&quot;<span class="token variable">$arg</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&quot;s/&#39;/&#39;<span class="token entity" title="\\\\">\\\\</span><span class="token entity" title="\\\\">\\\\</span>&#39;&#39;/g;1s/^/&#39;/;\\<span class="token variable">$s</span>/\\$/&#39;/&quot;</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- add indentation and trailing slash to quoted args ---</span>
<span class="token function-name function">quote_indent</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">&#39; \\\\\\n&#39;</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">arg</span> <span class="token keyword">in</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">printf</span> <span class="token string">&#39;\\t%s \\\\\\n&#39;</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span>quote <span class="token string">&quot;<span class="token variable">$arg</span>&quot;</span><span class="token variable">)</span></span>&quot;</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- escape most punctuation characters, except quotes, forward slash, and space ---</span>
<span class="token function-name function">escape</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">&#39;%s&#39;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/\\([][!#$%&amp;()*;&lt;=&gt;?\\_\`{|}]\\)/\\\\\\1/g;&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- escape double quotes ---</span>
<span class="token function-name function">escape_dq</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">printf</span> <span class="token string">&#39;%s&#39;</span> <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/&quot;/\\\\&quot;/g&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- ensures $K3S_URL is empty or begins with https://, exiting fatally otherwise ---</span>
<span class="token function-name function">verify_k3s_url</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">\${K3S_URL}</span>&quot;</span> <span class="token keyword">in</span>
        <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        https://*<span class="token punctuation">)</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">&quot;Only https:// URLs are supported for K3S_URL (have <span class="token variable">\${K3S_URL}</span>)&quot;</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- Setup a custom Registry or Mirror</span>
<span class="token function-name function">setup_registry</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">REGISTRIES_FILE</span><span class="token operator">=</span><span class="token string">&quot;/etc/rancher/k3s/registries.yaml&quot;</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_REGISTRIES}</span>&quot;</span> <span class="token parameter variable">-a</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;<span class="token variable">$REGISTRIES_FILE</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">INSTALL_K3S_REGISTRIES</span><span class="token operator">=</span><span class="token variable"><span class="token variable">\`</span><span class="token builtin class-name">echo</span> $<span class="token punctuation">{</span>INSTALL_K3S_REGISTRIES<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{gsub(/,/,&quot; &quot;); print $0}&#39;</span><span class="token variable">\`</span></span>
        <span class="token variable">$SUDO</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable"><span class="token variable">\`</span><span class="token function">dirname</span> $REGISTRIES_FILE<span class="token variable">\`</span></span>
        <span class="token variable">$SUDO</span> <span class="token function">cat</span> <span class="token operator">&gt;&gt;</span> <span class="token variable">$REGISTRIES_FILE</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  &quot;docker.io&quot;:
    endpoint:
EOF</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">registry</span> <span class="token keyword">in</span> <span class="token variable">\${INSTALL_K3S_REGISTRIES}</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
            <span class="token builtin class-name">echo</span> <span class="token string">&quot;      - <span class="token variable">$registry</span>&quot;</span> <span class="token operator">&gt;&gt;</span> <span class="token string">&quot;<span class="token variable">$REGISTRIES_FILE</span>&quot;</span>
        <span class="token keyword">done</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- define needed environment variables ---</span>
<span class="token function-name function">setup_env</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment"># --- use command args if passed or create default ---</span>
    <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span> <span class="token keyword">in</span>
        <span class="token comment"># --- if we only have flags discover if command should be server or agent ---</span>
        <span class="token punctuation">(</span>-*<span class="token operator">|</span><span class="token string">&quot;&quot;</span><span class="token punctuation">)</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${K3S_URL}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span>server
            <span class="token keyword">else</span>
                <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${K3S_TOKEN}</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${K3S_TOKEN_FILE}</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${K3S_CLUSTER_SECRET}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                    fatal <span class="token string">&quot;Defaulted k3s exec command to &#39;agent&#39; because K3S_URL is defined, but K3S_TOKEN, K3S_TOKEN_FILE or K3S_CLUSTER_SECRET is not defined.&quot;</span>
                <span class="token keyword">fi</span>
                <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span>agent
            <span class="token keyword">fi</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token comment"># --- command is provided ---</span>
        <span class="token punctuation">(</span>*<span class="token punctuation">)</span>
            <span class="token assign-left variable">CMD_K3S</span><span class="token operator">=</span><span class="token variable">$1</span>
            <span class="token builtin class-name">shift</span>
        <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    verify_k3s_url

    <span class="token assign-left variable">CMD_K3S_EXEC</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${CMD_K3S}</span><span class="token variable"><span class="token variable">$(</span>quote_indent <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token variable">)</span></span>&quot;</span>

    <span class="token comment"># --- use systemd name if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_NAME}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s-<span class="token variable">\${INSTALL_K3S_NAME}</span>
    <span class="token keyword">else</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${CMD_K3S}</span>&quot;</span> <span class="token operator">=</span> server <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s
        <span class="token keyword">else</span>
            <span class="token assign-left variable">SYSTEM_NAME</span><span class="token operator">=</span>k3s-<span class="token variable">\${CMD_K3S}</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- check for invalid characters in system name ---</span>
    <span class="token assign-left variable">valid_chars</span><span class="token operator">=</span><span class="token punctuation">$(</span>printf <span class="token string">&#39;%s&#39;</span> <span class="token string">&quot;<span class="token variable">\${SYSTEM_NAME}</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/[][!#$%&amp;()*;&lt;=&gt;?\\_\`{|}/[:space:]]/^/g;&#39;</span> <span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${SYSTEM_NAME}</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;<span class="token variable">\${valid_chars}</span>&quot;</span>  <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">invalid_chars</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">printf</span> <span class="token string">&#39;%s&#39;</span> <span class="token string">&quot;<span class="token variable">\${valid_chars}</span>&quot;</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/[^^]/ /g&#39;</span><span class="token variable">)</span></span>
        fatal <span class="token string">&quot;Invalid characters for system name:
            <span class="token variable">\${SYSTEM_NAME}</span>
            <span class="token variable">\${invalid_chars}</span>&quot;</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use sudo if we are not already root ---</span>
    <span class="token assign-left variable">SUDO</span><span class="token operator">=</span>sudo
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SUDO</span><span class="token operator">=</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use systemd type if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_TYPE}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEMD_TYPE</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_TYPE}</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">SYSTEMD_TYPE</span><span class="token operator">=</span>notify
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use binary install directory if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_BIN_DIR}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_BIN_DIR}</span>
    <span class="token keyword">else</span>
        <span class="token comment"># --- use /usr/local/bin if root can write to it, otherwise use /opt/bin if it exists</span>
        <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span>/usr/local/bin
        <span class="token keyword">if</span> <span class="token operator">!</span> <span class="token variable">$SUDO</span> <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&quot;touch <span class="token variable">\${BIN_DIR}</span>/k3s-ro-test &amp;&amp; rm -rf <span class="token variable">\${BIN_DIR}</span>/k3s-ro-test&quot;</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /opt/bin <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span>/opt/bin
            <span class="token keyword">fi</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>

    <span class="token comment"># --- use systemd directory if defined or create default ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SYSTEMD_DIR}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">SYSTEMD_DIR</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SYSTEMD_DIR}</span>&quot;</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">SYSTEMD_DIR</span><span class="token operator">=</span>/etc/systemd/system
    <span class="token keyword">fi</span>

    <span class="token comment"># --- set related files from system name ---</span>
    <span class="token assign-left variable">SERVICE_K3S</span><span class="token operator">=</span><span class="token variable">\${SYSTEM_NAME}</span>.service
    <span class="token assign-left variable">UNINSTALL_K3S_SH</span><span class="token operator">=</span><span class="token variable">\${UNINSTALL_K3S_SH<span class="token operator">:-</span>\${BIN_DIR}</span>/<span class="token variable">\${SYSTEM_NAME}</span>-uninstall.sh<span class="token punctuation">}</span>
    <span class="token assign-left variable">KILLALL_K3S_SH</span><span class="token operator">=</span><span class="token variable">\${KILLALL_K3S_SH<span class="token operator">:-</span>\${BIN_DIR}</span>/k3s-killall.sh<span class="token punctuation">}</span>

    <span class="token comment"># --- use service or environment location depending on systemd/openrc ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_SYSTEMD}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">FILE_K3S_SERVICE</span><span class="token operator">=</span><span class="token variable">\${SYSTEMD_DIR}</span>/<span class="token variable">\${SERVICE_K3S}</span>
        <span class="token assign-left variable">FILE_K3S_ENV</span><span class="token operator">=</span><span class="token variable">\${SYSTEMD_DIR}</span>/<span class="token variable">\${SERVICE_K3S}</span>.env
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_OPENRC}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token variable">$SUDO</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/rancher/k3s
        <span class="token assign-left variable">FILE_K3S_SERVICE</span><span class="token operator">=</span>/etc/init.d/<span class="token variable">\${SYSTEM_NAME}</span>
        <span class="token assign-left variable">FILE_K3S_ENV</span><span class="token operator">=</span>/etc/rancher/k3s/<span class="token variable">\${SYSTEM_NAME}</span>.env
    <span class="token keyword">fi</span>

    <span class="token comment"># --- get hash of config &amp; exec for currently installed k3s ---</span>
    <span class="token assign-left variable">PRE_INSTALL_HASHES</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_installed_hashes<span class="token variable">)</span></span>

    <span class="token comment"># --- if bin directory is read only skip download ---</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true
    <span class="token keyword">fi</span>

    <span class="token comment"># --- setup channel values</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_MIRROR}</span>&quot;</span> <span class="token operator">=</span> cn <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">INSTALL_K3S_CHANNEL_URL</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_MIRROR_URL}</span>/k3s/channels&quot;</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">INSTALL_K3S_CHANNEL_URL</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_CHANNEL_URL<span class="token operator">:-</span>&#39;https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>update.k3s.io<span class="token operator">/</span>v1-release<span class="token operator">/</span>channels&#39;}</span>
    <span class="token keyword">fi</span>
    <span class="token assign-left variable">INSTALL_K3S_CHANNEL</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_CHANNEL<span class="token operator">:-</span>&#39;stable&#39;}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- check if skip download environment variable set ---</span>
<span class="token function-name function">can_skip_download_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_DOWNLOAD}</span>&quot;</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_DOWNLOAD}</span>&quot;</span> <span class="token operator">!=</span> binary <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token builtin class-name">return</span> <span class="token number">1</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">can_skip_download_selinux</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>                                                        
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_DOWNLOAD}</span>&quot;</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_DOWNLOAD}</span>&quot;</span> <span class="token operator">!=</span> selinux <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span> 
        <span class="token builtin class-name">return</span> <span class="token number">1</span>                                                                     
    <span class="token keyword">fi</span>                                                                               
<span class="token punctuation">}</span>  

<span class="token comment"># --- verify an executable k3s binary is installed ---</span>
<span class="token function-name function">verify_k3s_is_executable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-x</span> <span class="token variable">\${BIN_DIR}</span>/k3s <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        fatal <span class="token string">&quot;Executable k3s binary not found at <span class="token variable">\${BIN_DIR}</span>/k3s&quot;</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- set arch and suffix, fatal if architecture not supported ---</span>
<span class="token function-name function">setup_verify_arch</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$ARCH</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">ARCH</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">uname</span> <span class="token parameter variable">-m</span><span class="token variable">)</span></span>
    <span class="token keyword">fi</span>
    <span class="token keyword">case</span> <span class="token variable">$ARCH</span> <span class="token keyword">in</span>
        amd64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>amd64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        x86_64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>amd64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        arm64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">\${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        s390x<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>s390x
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">\${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        aarch64<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm64
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">\${ARCH}</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        arm*<span class="token punctuation">)</span>
            <span class="token assign-left variable">ARCH</span><span class="token operator">=</span>arm
            <span class="token assign-left variable">SUFFIX</span><span class="token operator">=</span>-<span class="token variable">\${ARCH}</span>hf
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">&quot;Unsupported architecture <span class="token variable">$ARCH</span>&quot;</span>
    <span class="token keyword">esac</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- verify existence of network downloader executable ---</span>
<span class="token function-name function">verify_downloader</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment"># Return failure if it doesn&#39;t exist or is no executable</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> $1<span class="token variable">)</span></span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">return</span> <span class="token number">1</span>

    <span class="token comment"># Set verified executable as our downloader program and return success</span>
    <span class="token assign-left variable">DOWNLOADER</span><span class="token operator">=</span><span class="token variable">$1</span>
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create temporary directory and cleanup when done ---</span>
<span class="token function-name function">setup_tmp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">TMP_DIR</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>mktemp <span class="token parameter variable">-d</span> <span class="token parameter variable">-t</span> k3s-install.XXXXXXXXXX<span class="token variable">)</span></span>
    <span class="token assign-left variable">TMP_HASH</span><span class="token operator">=</span><span class="token variable">\${TMP_DIR}</span>/k3s.hash
    <span class="token assign-left variable">TMP_BIN</span><span class="token operator">=</span><span class="token variable">\${TMP_DIR}</span>/k3s.bin
    <span class="token function-name function">cleanup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token assign-left variable">code</span><span class="token operator">=</span><span class="token variable">$?</span>
        <span class="token builtin class-name">set</span> +e
        <span class="token builtin class-name">trap</span> - EXIT
        <span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">\${TMP_DIR}</span>
        <span class="token builtin class-name">exit</span> <span class="token variable">$code</span>
    <span class="token punctuation">}</span>
    <span class="token builtin class-name">trap</span> cleanup INT EXIT
<span class="token punctuation">}</span>

<span class="token comment"># --- use desired k3s version if defined or find version from channel ---</span>
<span class="token function-name function">get_release_version</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_COMMIT}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token string">&quot;commit <span class="token variable">\${INSTALL_K3S_COMMIT}</span>&quot;</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_VERSION}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_VERSION}</span>
    <span class="token keyword">else</span>
        info <span class="token string">&quot;Finding release for channel <span class="token variable">\${INSTALL_K3S_CHANNEL}</span>&quot;</span>
        <span class="token assign-left variable">version_url</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_CHANNEL_URL}</span>/<span class="token variable">\${INSTALL_K3S_CHANNEL}</span>&quot;</span>
        <span class="token keyword">case</span> <span class="token variable">$DOWNLOADER</span> <span class="token keyword">in</span>
            <span class="token function">curl</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_MIRROR}</span>&quot;</span> <span class="token operator">=</span> cn <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                    <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span><span class="token variable">)</span></span>
                <span class="token keyword">else</span>
                    <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">curl</span> <span class="token parameter variable">-w</span> <span class="token string">&#39;%{url_effective}&#39;</span> <span class="token parameter variable">-L</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-S</span> $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span> <span class="token parameter variable">-o</span> /dev/null <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s|.*/||&#39;</span><span class="token variable">)</span></span>
                <span class="token keyword">fi</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
            <span class="token function">wget</span><span class="token punctuation">)</span>
                <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_MIRROR}</span>&quot;</span> <span class="token operator">=</span> cn <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                    <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">wget</span> <span class="token parameter variable">-qO</span> - $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span><span class="token variable">)</span></span>
                <span class="token keyword">else</span>
                    <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">wget</span> <span class="token parameter variable">-SqO</span> /dev/null $<span class="token punctuation">{</span>version_url<span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-i</span> Location <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s|.*/||&#39;</span><span class="token variable">)</span></span>
                <span class="token keyword">fi</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
            *<span class="token punctuation">)</span>
                fatal <span class="token string">&quot;Incorrect downloader executable &#39;<span class="token variable">$DOWNLOADER</span>&#39;&quot;</span>
                <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
    <span class="token keyword">fi</span>
    info <span class="token string">&quot;Using <span class="token variable">\${VERSION_K3S}</span> as release&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download from github url ---</span>
<span class="token function-name function">download</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token variable">$#</span> <span class="token parameter variable">-eq</span> <span class="token number">2</span> <span class="token punctuation">]</span> <span class="token operator">||</span> fatal <span class="token string">&#39;download needs exactly 2 arguments&#39;</span>

    <span class="token keyword">case</span> <span class="token variable">$DOWNLOADER</span> <span class="token keyword">in</span>
        <span class="token function">curl</span><span class="token punctuation">)</span>
            <span class="token function">curl</span> <span class="token parameter variable">-o</span> <span class="token variable">$1</span> <span class="token parameter variable">-sfL</span> <span class="token variable">$2</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token function">wget</span><span class="token punctuation">)</span>
            <span class="token function">wget</span> <span class="token parameter variable">-qO</span> <span class="token variable">$1</span> <span class="token variable">$2</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            fatal <span class="token string">&quot;Incorrect executable &#39;<span class="token variable">$DOWNLOADER</span>&#39;&quot;</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    <span class="token comment"># Abort if download command failed</span>
    <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">||</span> fatal <span class="token string">&#39;Download failed&#39;</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download hash from github url ---</span>
<span class="token function-name function">download_hash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_COMMIT}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HASH_URL</span><span class="token operator">=</span><span class="token variable">\${STORAGE_URL}</span>/k3s<span class="token variable">\${SUFFIX}</span>-<span class="token variable">\${INSTALL_K3S_COMMIT}</span>.sha256sum
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_MIRROR}</span>&quot;</span> <span class="token operator">=</span> cn <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span> <span class="token builtin class-name">echo</span> $<span class="token punctuation">{</span>VERSION_K3S<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;s/+/-/g&#39;</span> <span class="token variable">)</span></span>
        <span class="token assign-left variable">HASH_URL</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_MIRROR_URL}</span>/k3s/<span class="token variable">\${VERSION_K3S}</span>/sha256sum-<span class="token variable">\${ARCH}</span>.txt
    <span class="token keyword">else</span>
        <span class="token assign-left variable">HASH_URL</span><span class="token operator">=</span><span class="token variable">\${GITHUB_URL}</span>/download/<span class="token variable">\${VERSION_K3S}</span>/sha256sum-<span class="token variable">\${ARCH}</span>.txt
    <span class="token keyword">fi</span>
    info <span class="token string">&quot;Downloading hash <span class="token variable">\${HASH_URL}</span>&quot;</span>
    download <span class="token variable">\${TMP_HASH}</span> <span class="token variable">\${HASH_URL}</span>
    <span class="token assign-left variable">HASH_EXPECTED</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">grep</span> <span class="token string">&quot; k3s<span class="token variable">\${SUFFIX}</span>$&quot;</span> $<span class="token punctuation">{</span>TMP_HASH<span class="token punctuation">}</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">HASH_EXPECTED</span><span class="token operator">=</span><span class="token variable">\${HASH_EXPECTED<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- check hash against installed version ---</span>
<span class="token function-name function">installed_hash_matches</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">\${BIN_DIR}</span>/k3s <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">HASH_INSTALLED</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>sha256sum $<span class="token punctuation">{</span>BIN_DIR<span class="token punctuation">}</span>/k3s<span class="token variable">)</span></span>
        <span class="token assign-left variable">HASH_INSTALLED</span><span class="token operator">=</span><span class="token variable">\${HASH_INSTALLED<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HASH_EXPECTED}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">\${HASH_INSTALLED}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token builtin class-name">return</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">return</span> <span class="token number">1</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download binary from github url ---</span>
<span class="token function-name function">download_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-n</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_COMMIT}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">BIN_URL</span><span class="token operator">=</span><span class="token variable">\${STORAGE_URL}</span>/k3s<span class="token variable">\${SUFFIX}</span>-<span class="token variable">\${INSTALL_K3S_COMMIT}</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_MIRROR}</span>&quot;</span> <span class="token operator">=</span> cn <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">VERSION_K3S</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span> <span class="token builtin class-name">echo</span> $<span class="token punctuation">{</span>VERSION_K3S<span class="token punctuation">}</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token string">&#39;s/+/-/g&#39;</span> <span class="token variable">)</span></span>
        <span class="token assign-left variable">BIN_URL</span><span class="token operator">=</span><span class="token variable">\${INSTALL_K3S_MIRROR_URL}</span>/k3s/<span class="token variable">\${VERSION_K3S}</span>/k3s<span class="token variable">\${SUFFIX}</span>
    <span class="token keyword">else</span>
        <span class="token assign-left variable">BIN_URL</span><span class="token operator">=</span><span class="token variable">\${GITHUB_URL}</span>/download/<span class="token variable">\${VERSION_K3S}</span>/k3s<span class="token variable">\${SUFFIX}</span>
    <span class="token keyword">fi</span>
    info <span class="token string">&quot;Downloading binary <span class="token variable">\${BIN_URL}</span>&quot;</span>
    download <span class="token variable">\${TMP_BIN}</span> <span class="token variable">\${BIN_URL}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- verify downloaded binary hash ---</span>
<span class="token function-name function">verify_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;Verifying binary download&quot;</span>
    <span class="token assign-left variable">HASH_BIN</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>sha256sum $<span class="token punctuation">{</span>TMP_BIN<span class="token punctuation">}</span><span class="token variable">)</span></span>
    <span class="token assign-left variable">HASH_BIN</span><span class="token operator">=</span><span class="token variable">\${HASH_BIN<span class="token operator">%%</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token operator">:</span>blank<span class="token operator">:</span><span class="token punctuation">]</span><span class="token punctuation">]</span>*}</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HASH_EXPECTED}</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;<span class="token variable">\${HASH_BIN}</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        fatal <span class="token string">&quot;Download sha256 does not match <span class="token variable">\${HASH_EXPECTED}</span>, got <span class="token variable">\${HASH_BIN}</span>&quot;</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- setup permissions and move binary to system directory ---</span>
<span class="token function-name function">setup_binary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">\${TMP_BIN}</span>
    info <span class="token string">&quot;Installing k3s to <span class="token variable">\${BIN_DIR}</span>/k3s&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">\${TMP_BIN}</span>
    <span class="token variable">$SUDO</span> <span class="token function">mv</span> <span class="token parameter variable">-f</span> <span class="token variable">\${TMP_BIN}</span> <span class="token variable">\${BIN_DIR}</span>/k3s
<span class="token punctuation">}</span>

<span class="token comment"># --- setup selinux policy ---</span>
<span class="token function-name function">setup_selinux</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token variable">\${INSTALL_K3S_CHANNEL}</span> <span class="token keyword">in</span> 
        *testing<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>testing
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *latest<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>latest
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_channel</span><span class="token operator">=</span>stable
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
    <span class="token keyword">esac</span>

    <span class="token assign-left variable">rpm_site</span><span class="token operator">=</span><span class="token string">&quot;rpm.rancher.io&quot;</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${rpm_channel}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;testing&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_site</span><span class="token operator">=</span><span class="token string">&quot;rpm-testing.rancher.io&quot;</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/os-release <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">.</span> /etc/os-release
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${ID_LIKE<span class="token operator">%%</span><span class="token punctuation">[</span> <span class="token punctuation">]</span>*}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;suse&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>sle
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>microos
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>zypper
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${VERSION_ID<span class="token operator">%%</span>.*}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;7&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>el7
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>centos/7
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>yum
    <span class="token keyword">else</span>
        <span class="token assign-left variable">rpm_target</span><span class="token operator">=</span>el8
        <span class="token assign-left variable">rpm_site_infix</span><span class="token operator">=</span>centos/8
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>yum
    <span class="token keyword">fi</span>

    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${package_installer}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;yum&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/bin/dnf <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">package_installer</span><span class="token operator">=</span>dnf
    <span class="token keyword">fi</span>

    <span class="token assign-left variable">policy_hint</span><span class="token operator">=</span><span class="token string">&quot;please install:
    <span class="token variable">\${package_installer}</span> install -y container-selinux
    <span class="token variable">\${package_installer}</span> install -y https://<span class="token variable">\${rpm_site}</span>/k3s/<span class="token variable">\${rpm_channel}</span>/common/<span class="token variable">\${rpm_site_infix}</span>/noarch/k3s-selinux-0.4-1.<span class="token variable">\${rpm_target}</span>.noarch.rpm
&quot;</span>

    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$INSTALL_K3S_SKIP_SELINUX_RPM</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">||</span> can_skip_download_selinux <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-d</span> /usr/share/selinux <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">&quot;Skipping installation of SELinux RPM&quot;</span>
    <span class="token keyword">elif</span>  <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${ID_LIKE<span class="token operator">:-</span>}</span>&quot;</span> <span class="token operator">!=</span> coreos <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${VARIANT_ID<span class="token operator">:-</span>}</span>&quot;</span> <span class="token operator">!=</span> coreos <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        install_selinux_rpm <span class="token variable">\${rpm_site}</span> <span class="token variable">\${rpm_channel}</span> <span class="token variable">\${rpm_target}</span> <span class="token variable">\${rpm_site_infix}</span>
    <span class="token keyword">fi</span>

    <span class="token assign-left variable">policy_error</span><span class="token operator">=</span>fatal
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$INSTALL_K3S_SELINUX_WARN</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${ID_LIKE<span class="token operator">:-</span>}</span>&quot;</span> <span class="token operator">=</span> coreos <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${VARIANT_ID<span class="token operator">:-</span>}</span>&quot;</span> <span class="token operator">=</span> coreos <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">policy_error</span><span class="token operator">=</span>warn
    <span class="token keyword">fi</span>

    <span class="token keyword">if</span> <span class="token operator">!</span> <span class="token variable">$SUDO</span> chcon <span class="token parameter variable">-u</span> system_u <span class="token parameter variable">-r</span> object_r <span class="token parameter variable">-t</span> container_runtime_exec_t <span class="token variable">\${BIN_DIR}</span>/k3s <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token keyword">if</span> <span class="token variable">$SUDO</span> <span class="token function">grep</span> <span class="token string">&#39;^\\s*SELINUX=enforcing&#39;</span> /etc/selinux/config <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token variable">$policy_error</span> <span class="token string">&quot;Failed to apply container_runtime_exec_t to <span class="token variable">\${BIN_DIR}</span>/k3s, <span class="token variable">\${policy_hint}</span>&quot;</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">elif</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-f</span> /usr/share/selinux/packages/k3s.pp <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/sbin/transactional-update <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            warn <span class="token string">&quot;Please reboot your machine to activate the changes and avoid data loss.&quot;</span>
        <span class="token keyword">else</span>
            <span class="token variable">$policy_error</span> <span class="token string">&quot;Failed to find the k3s-selinux policy, <span class="token variable">\${policy_hint}</span>&quot;</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">fi</span>
<span class="token punctuation">}</span>

<span class="token function-name function">install_selinux_rpm</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/redhat-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/centos-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/oracle-release <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${ID_LIKE<span class="token operator">%%</span><span class="token punctuation">[</span> <span class="token punctuation">]</span>*}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;suse&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token assign-left variable">repodir</span><span class="token operator">=</span>/etc/yum.repos.d
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> /etc/zypp/repos.d <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">repodir</span><span class="token operator">=</span>/etc/zypp/repos.d
        <span class="token keyword">fi</span>
        <span class="token builtin class-name">set</span> +o noglob
        <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable">\${repodir}</span>/rancher-k3s-common*.repo
        <span class="token builtin class-name">set</span> <span class="token parameter variable">-o</span> noglob
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-r</span> /etc/redhat-release <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${3}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;el7&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token variable">$SUDO</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils
            <span class="token variable">$SUDO</span> yum-config-manager <span class="token parameter variable">--enable</span> rhel-7-server-extras-rpms
        <span class="token keyword">fi</span>
        <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${repodir}</span>/rancher-k3s-common.repo <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[rancher-k3s-common-<span class="token variable">\${2}</span>]
name=Rancher K3s Common (<span class="token variable">\${2}</span>)
baseurl=https://<span class="token variable">\${1}</span>/k3s/<span class="token variable">\${2}</span>/common/<span class="token variable">\${4}</span>/noarch
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://<span class="token variable">\${1}</span>/public.key
EOF</span>
        <span class="token keyword">case</span> <span class="token variable">\${3}</span> <span class="token keyword">in</span>
        sle<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">&quot;zypper --gpg-auto-import-keys&quot;</span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${TRANSACTIONAL_UPDATE=false}</span>&quot;</span> <span class="token operator">!=</span> <span class="token string">&quot;true&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/sbin/transactional-update <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">&quot;transactional-update --no-selfupdate -d run <span class="token variable">\${rpm_installer}</span>&quot;</span>
                <span class="token builtin class-name">:</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_START<span class="token operator">:=</span>true}</span>&quot;</span>
            <span class="token keyword">fi</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        *<span class="token punctuation">)</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span><span class="token string">&quot;yum&quot;</span>
            <span class="token punctuation">;</span><span class="token punctuation">;</span>
        <span class="token keyword">esac</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${rpm_installer}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;yum&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> /usr/bin/dnf <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">rpm_installer</span><span class="token operator">=</span>dnf
        <span class="token keyword">fi</span>
        <span class="token comment"># shellcheck disable=SC2086</span>
        <span class="token variable">$SUDO</span> <span class="token variable">\${rpm_installer}</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token string">&quot;k3s-selinux&quot;</span>
    <span class="token keyword">fi</span>
    <span class="token builtin class-name">return</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- download and verify k3s ---</span>
<span class="token function-name function">download_and_verify</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> can_skip_download_binary<span class="token punctuation">;</span> <span class="token keyword">then</span>
       info <span class="token string">&#39;Skipping k3s download and verify&#39;</span>
       verify_k3s_is_executable
       <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    setup_verify_arch
    verify_downloader <span class="token function">curl</span> <span class="token operator">||</span> verify_downloader <span class="token function">wget</span> <span class="token operator">||</span> fatal <span class="token string">&#39;Can not find curl or wget for downloading files&#39;</span>
    setup_tmp
    get_release_version
    download_hash

    <span class="token keyword">if</span> installed_hash_matches<span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">&#39;Skipping binary downloaded, installed k3s matches hash&#39;</span>
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    download_binary
    verify_binary
    setup_binary
<span class="token punctuation">}</span>

<span class="token comment"># --- add additional utility links ---</span>
<span class="token function-name function">create_symlinks</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SYMLINK}</span>&quot;</span> <span class="token operator">=</span> skip <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token keyword">for</span> <span class="token for-or-select variable">cmd</span> <span class="token keyword">in</span> kubectl crictl ctr<span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token operator">!</span> <span class="token parameter variable">-e</span> <span class="token variable">\${BIN_DIR}</span>/<span class="token variable">\${cmd}</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SYMLINK}</span>&quot;</span> <span class="token operator">=</span> force <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
            <span class="token assign-left variable">which_cmd</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">command</span> <span class="token parameter variable">-v</span> $<span class="token punctuation">{</span>cmd<span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">||</span> <span class="token boolean">true</span><span class="token variable">)</span></span>
            <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">\${which_cmd}</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SYMLINK}</span>&quot;</span> <span class="token operator">=</span> force <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
                info <span class="token string">&quot;Creating <span class="token variable">\${BIN_DIR}</span>/<span class="token variable">\${cmd}</span> symlink to k3s&quot;</span>
                <span class="token variable">$SUDO</span> <span class="token function">ln</span> <span class="token parameter variable">-sf</span> k3s <span class="token variable">\${BIN_DIR}</span>/<span class="token variable">\${cmd}</span>
            <span class="token keyword">else</span>
                info <span class="token string">&quot;Skipping <span class="token variable">\${BIN_DIR}</span>/<span class="token variable">\${cmd}</span> symlink to k3s, command exists in PATH at <span class="token variable">\${which_cmd}</span>&quot;</span>
            <span class="token keyword">fi</span>
        <span class="token keyword">else</span>
            info <span class="token string">&quot;Skipping <span class="token variable">\${BIN_DIR}</span>/<span class="token variable">\${cmd}</span> symlink to k3s, already exists&quot;</span>
        <span class="token keyword">fi</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create killall script ---</span>
<span class="token function-name function">create_killall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    info <span class="token string">&quot;Creating killall script <span class="token variable">\${KILLALL_K3S_SH}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${KILLALL_K3S_SH}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token punctuation">\\</span>EOF
<span class="token comment">#!/bin/sh</span>
<span class="token punctuation">[</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token builtin class-name">exec</span> <span class="token function">sudo</span> <span class="token variable">$0</span> <span class="token variable">$@</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">bin</span> <span class="token keyword">in</span> /var/lib/rancher/k3s/data/**/bin/<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-d</span> <span class="token variable">$bin</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$bin</span><span class="token builtin class-name">:</span><span class="token variable">$bin</span>/aux
<span class="token keyword">done</span>

<span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">service</span> <span class="token keyword">in</span> /etc/systemd/system/k3s*.service<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-s</span> <span class="token variable">$service</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemctl stop <span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> $service<span class="token variable">)</span></span>
<span class="token keyword">done</span>

<span class="token keyword">for</span> <span class="token for-or-select variable">service</span> <span class="token keyword">in</span> /etc/init.d/k3s*<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-x</span> <span class="token variable">$service</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token variable">$service</span> stop
<span class="token keyword">done</span>

<span class="token function-name function">pschildren</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">ps</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">ppid</span><span class="token operator">=</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">pid</span><span class="token operator">=</span> <span class="token operator">|</span> <span class="token punctuation">\\</span>
    <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/^\\s*//g; s/\\s\\s*/\\t/g;&#39;</span> <span class="token operator">|</span> <span class="token punctuation">\\</span>
    <span class="token function">grep</span> <span class="token parameter variable">-w</span> <span class="token string">&quot;^<span class="token variable">$1</span>&quot;</span> <span class="token operator">|</span> <span class="token punctuation">\\</span>
    <span class="token function">cut</span> <span class="token parameter variable">-f2</span>
<span class="token punctuation">}</span>

<span class="token function-name function">pstree</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token for-or-select variable">pid</span> <span class="token keyword">in</span> <span class="token variable">$@</span><span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token builtin class-name">echo</span> <span class="token variable">$pid</span>
        <span class="token keyword">for</span> <span class="token for-or-select variable">child</span> <span class="token keyword">in</span> <span class="token variable"><span class="token variable">$(</span>pschildren $pid<span class="token variable">)</span></span><span class="token punctuation">;</span> <span class="token keyword">do</span>
            pstree <span class="token variable">$child</span>
        <span class="token keyword">done</span>
    <span class="token keyword">done</span>
<span class="token punctuation">}</span>

<span class="token function-name function">killtree</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable"><span class="token variable">$(</span>
        <span class="token punctuation">{</span> <span class="token builtin class-name">set</span> +x<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null<span class="token punctuation">;</span>
        pstree $@<span class="token punctuation">;</span>
        <span class="token builtin class-name">set</span> -x<span class="token punctuation">;</span>
    <span class="token variable">)</span></span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">getshims</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">ps</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">pid</span><span class="token operator">=</span> <span class="token parameter variable">-o</span> <span class="token assign-left variable">args</span><span class="token operator">=</span> <span class="token operator">|</span> <span class="token function">sed</span> <span class="token parameter variable">-e</span> <span class="token string">&#39;s/^ *//; s/\\s\\s*/\\t/;&#39;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-w</span> <span class="token string">&#39;k3s/data/[^/]*/bin/containerd-shim&#39;</span> <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-f1</span>
<span class="token punctuation">}</span>

killtree <span class="token variable"><span class="token variable">$(</span><span class="token punctuation">{</span> <span class="token builtin class-name">set</span> +x<span class="token punctuation">;</span> <span class="token punctuation">}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null<span class="token punctuation">;</span> getshims<span class="token punctuation">;</span> <span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span><span class="token variable">)</span></span>

<span class="token function-name function">do_unmount_and_remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token builtin class-name">set</span> +x
    <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> _ path _<span class="token punctuation">;</span> <span class="token keyword">do</span>
        <span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$path</span>&quot;</span> <span class="token keyword">in</span> <span class="token variable">$1</span>*<span class="token punctuation">)</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">$path</span>&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span> <span class="token keyword">esac</span>
    <span class="token keyword">done</span> <span class="token operator">&lt;</span> /proc/self/mounts <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-r</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">&#39;umount &quot;$0&quot; &amp;&amp; rm -rf &quot;$0&quot;&#39;</span>
    <span class="token builtin class-name">set</span> <span class="token parameter variable">-x</span>
<span class="token punctuation">}</span>

do_unmount_and_remove <span class="token string">&#39;/run/k3s&#39;</span>
do_unmount_and_remove <span class="token string">&#39;/var/lib/rancher/k3s&#39;</span>
do_unmount_and_remove <span class="token string">&#39;/var/lib/kubelet/pods&#39;</span>
do_unmount_and_remove <span class="token string">&#39;/var/lib/kubelet/plugins&#39;</span>
do_unmount_and_remove <span class="token string">&#39;/run/netns/cni-&#39;</span>

<span class="token comment"># Remove CNI namespaces</span>
<span class="token function">ip</span> netns show <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">|</span> <span class="token function">grep</span> cni- <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token parameter variable">-r</span> <span class="token parameter variable">-t</span> <span class="token parameter variable">-n</span> <span class="token number">1</span> <span class="token function">ip</span> netns delete

<span class="token comment"># Delete network interface(s) that match &#39;master cni0&#39;</span>
<span class="token function">ip</span> <span class="token function">link</span> show <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span>/dev/null <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&#39;master cni0&#39;</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> ignore iface ignore<span class="token punctuation">;</span> <span class="token keyword">do</span>
    <span class="token assign-left variable">iface</span><span class="token operator">=</span><span class="token variable">\${iface<span class="token operator">%%</span>@*}</span>
    <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$iface</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token function">ip</span> <span class="token function">link</span> delete <span class="token variable">$iface</span>
<span class="token keyword">done</span>
<span class="token function">ip</span> <span class="token function">link</span> delete cni0
<span class="token function">ip</span> <span class="token function">link</span> delete flannel.1
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-v6.1
<span class="token function">ip</span> <span class="token function">link</span> delete kube-ipvs0
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-wg
<span class="token function">ip</span> <span class="token function">link</span> delete flannel-wg-v6
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /var/lib/cni/
iptables-save <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> KUBE- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> CNI- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> flannel <span class="token operator">|</span> iptables-restore
ip6tables-save <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> KUBE- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> CNI- <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> flannel <span class="token operator">|</span> ip6tables-restore
EOF
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">\${KILLALL_K3S_SH}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">\${KILLALL_K3S_SH}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- create uninstall script ---</span>
<span class="token function-name function">create_uninstall</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_BIN_DIR_READ_ONLY}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>
    info <span class="token string">&quot;Creating uninstall script <span class="token variable">\${UNINSTALL_K3S_SH}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${UNINSTALL_K3S_SH}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/bin/sh
set -x
[ \\<span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span> -eq 0 ] || exec sudo \\<span class="token variable">$0</span> \\<span class="token variable">$@</span>

<span class="token variable">\${KILLALL_K3S_SH}</span>

if command -v systemctl; then
    systemctl disable <span class="token variable">\${SYSTEM_NAME}</span>
    systemctl reset-failed <span class="token variable">\${SYSTEM_NAME}</span>
    systemctl daemon-reload
fi
if command -v rc-update; then
    rc-update delete <span class="token variable">\${SYSTEM_NAME}</span> default
fi

rm -f <span class="token variable">\${FILE_K3S_SERVICE}</span>
rm -f <span class="token variable">\${FILE_K3S_ENV}</span>

remove_uninstall() {
    rm -f <span class="token variable">\${UNINSTALL_K3S_SH}</span>
}
trap remove_uninstall EXIT

if (ls <span class="token variable">\${SYSTEMD_DIR}</span>/k3s*.service || ls /etc/init.d/k3s*) &gt;/dev/null 2&gt;&amp;1; then
    set +x; echo &#39;Additional k3s services installed, skipping uninstall of k3s&#39;; set -x
    exit
fi

for cmd in kubectl crictl ctr; do
    if [ -L <span class="token variable">\${BIN_DIR}</span>/\\<span class="token variable">$cmd</span> ]; then
        rm -f <span class="token variable">\${BIN_DIR}</span>/\\<span class="token variable">$cmd</span>
    fi
done

rm -rf /etc/rancher/k3s
rm -rf /run/k3s
rm -rf /run/flannel
rm -rf /var/lib/rancher/k3s
rm -rf /var/lib/kubelet
rm -f <span class="token variable">\${BIN_DIR}</span>/k3s
rm -f <span class="token variable">\${KILLALL_K3S_SH}</span>

if type yum &gt;/dev/null 2&gt;&amp;1; then
    yum remove -y k3s-selinux
    rm -f /etc/yum.repos.d/rancher-k3s-common*.repo
elif type zypper &gt;/dev/null 2&gt;&amp;1; then
    uninstall_cmd=&quot;zypper remove -y k3s-selinux&quot;
    if [ &quot;\\<span class="token variable">\${TRANSACTIONAL_UPDATE=false}</span>&quot; != &quot;true&quot; ] &amp;&amp; [ -x /usr/sbin/transactional-update ]; then
        uninstall_cmd=&quot;transactional-update --no-selfupdate -d run \\<span class="token variable">$uninstall_cmd</span>&quot;
    fi
    \\<span class="token variable">$uninstall_cmd</span>
    rm -f /etc/zypp/repos.d/rancher-k3s-common*.repo
fi
EOF</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> <span class="token number">755</span> <span class="token variable">\${UNINSTALL_K3S_SH}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chown</span> root:root <span class="token variable">\${UNINSTALL_K3S_SH}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- disable current service if loaded --</span>
<span class="token function-name function">systemd_disable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$SUDO</span> systemctl disable <span class="token variable">\${SYSTEM_NAME}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">||</span> <span class="token boolean">true</span>
    <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/systemd/system/<span class="token variable">\${SERVICE_K3S}</span> <span class="token operator">||</span> <span class="token boolean">true</span>
    <span class="token variable">$SUDO</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> /etc/systemd/system/<span class="token variable">\${SERVICE_K3S}</span>.env <span class="token operator">||</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- capture current env and create file containing k3s_ variables ---</span>
<span class="token function-name function">create_env_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;env: Creating environment file <span class="token variable">\${FILE_K3S_ENV}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">touch</span> <span class="token variable">\${FILE_K3S_ENV}</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> 0600 <span class="token variable">\${FILE_K3S_ENV}</span>
    <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token builtin class-name">export</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> x <span class="token function">v</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$v</span><span class="token punctuation">;</span> <span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-E</span> <span class="token string">&#39;^(K3S|CONTAINERD)_&#39;</span> <span class="token operator">|</span> <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${FILE_K3S_ENV}</span> <span class="token operator">&gt;</span>/dev/null
    <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token builtin class-name">export</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> x <span class="token function">v</span><span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> <span class="token variable">$v</span><span class="token punctuation">;</span> <span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-Ei</span> <span class="token string">&#39;^(NO|HTTP|HTTPS)_PROXY&#39;</span> <span class="token operator">|</span> <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token parameter variable">-a</span> <span class="token variable">\${FILE_K3S_ENV}</span> <span class="token operator">&gt;</span>/dev/null
<span class="token punctuation">}</span>

<span class="token comment"># --- write systemd service file ---</span>
<span class="token function-name function">create_systemd_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;systemd: Creating service file <span class="token variable">\${FILE_K3S_SERVICE}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${FILE_K3S_SERVICE}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
[Unit]
Description=Lightweight Kubernetes
Documentation=https://k3s.io
Wants=network-online.target
After=network-online.target

[Install]
WantedBy=multi-user.target

[Service]
Type=<span class="token variable">\${SYSTEMD_TYPE}</span>
EnvironmentFile=-/etc/default/%N
EnvironmentFile=-/etc/sysconfig/%N
EnvironmentFile=-<span class="token variable">\${FILE_K3S_ENV}</span>
KillMode=process
Delegate=yes
# Having non-zero Limit*s causes performance problems due to accounting overhead
# in the kernel. We recommend using cgroups to do container-local accounting.
LimitNOFILE=1048576
LimitNPROC=infinity
LimitCORE=infinity
TasksMax=infinity
TimeoutStartSec=0
Restart=always
RestartSec=5s
ExecStartPre=/bin/sh -xc &#39;! /usr/bin/systemctl is-enabled --quiet nm-cloud-setup.service&#39;
ExecStartPre=-/sbin/modprobe br_netfilter
ExecStartPre=-/sbin/modprobe overlay
ExecStart=<span class="token variable">\${BIN_DIR}</span>/k3s <span class="token entity" title="\\\\">\\\\</span>
    <span class="token variable">\${CMD_K3S_EXEC}</span>

EOF</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- write openrc service file ---</span>
<span class="token function-name function">create_openrc_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token assign-left variable">LOG_FILE</span><span class="token operator">=</span>/var/log/<span class="token variable">\${SYSTEM_NAME}</span>.log

    info <span class="token string">&quot;openrc: Creating service file <span class="token variable">\${FILE_K3S_SERVICE}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token function">tee</span> <span class="token variable">\${FILE_K3S_SERVICE}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
#!/sbin/openrc-run

depend() {
    after network-online
    want cgroups
}

start_pre() {
    rm -f /tmp/k3s.*
}

supervisor=supervise-daemon
name=<span class="token variable">\${SYSTEM_NAME}</span>
command=&quot;<span class="token variable">\${BIN_DIR}</span>/k3s&quot;
command_args=&quot;<span class="token variable"><span class="token variable">$(</span>escape_dq <span class="token string">&quot;<span class="token variable">\${CMD_K3S_EXEC}</span>&quot;</span><span class="token variable">)</span></span>
    &gt;&gt;<span class="token variable">\${LOG_FILE}</span> 2&gt;&amp;1&quot;

output_log=<span class="token variable">\${LOG_FILE}</span>
error_log=<span class="token variable">\${LOG_FILE}</span>

pidfile=&quot;/var/run/<span class="token variable">\${SYSTEM_NAME}</span>.pid&quot;
respawn_delay=5
respawn_max=0

set -o allexport
if [ -f /etc/environment ]; then source /etc/environment; fi
if [ -f <span class="token variable">\${FILE_K3S_ENV}</span> ]; then source <span class="token variable">\${FILE_K3S_ENV}</span>; fi
set +o allexport
EOF</span>
    <span class="token variable">$SUDO</span> <span class="token function">chmod</span> 0755 <span class="token variable">\${FILE_K3S_SERVICE}</span>

    <span class="token variable">$SUDO</span> <span class="token function">tee</span> /etc/logrotate.d/<span class="token variable">\${SYSTEM_NAME}</span> <span class="token operator">&gt;</span>/dev/null <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
<span class="token variable">\${LOG_FILE}</span> {
	missingok
	notifempty
	copytruncate
}
EOF</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- write systemd or openrc service file ---</span>
<span class="token function-name function">create_service_file</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_SYSTEMD}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> create_systemd_service_file
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_OPENRC}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> create_openrc_service_file
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- get hashes of the current k3s bin and service files</span>
<span class="token function-name function">get_installed_hashes</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token variable">$SUDO</span> sha256sum <span class="token variable">\${BIN_DIR}</span>/k3s <span class="token variable">\${FILE_K3S_SERVICE}</span> <span class="token variable">\${FILE_K3S_ENV}</span> <span class="token operator"><span class="token file-descriptor important">2</span>&gt;</span><span class="token file-descriptor important">&amp;1</span> <span class="token operator">||</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- enable and start systemd service ---</span>
<span class="token function-name function">systemd_enable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;systemd: Enabling <span class="token variable">\${SYSTEM_NAME}</span> unit&quot;</span>
    <span class="token variable">$SUDO</span> systemctl <span class="token builtin class-name">enable</span> <span class="token variable">\${FILE_K3S_SERVICE}</span> <span class="token operator">&gt;</span>/dev/null
    <span class="token variable">$SUDO</span> systemctl daemon-reload <span class="token operator">&gt;</span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">systemd_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;systemd: Starting <span class="token variable">\${SYSTEM_NAME}</span>&quot;</span>
    <span class="token variable">$SUDO</span> systemctl restart <span class="token variable">\${SYSTEM_NAME}</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- enable and start openrc service ---</span>
<span class="token function-name function">openrc_enable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;openrc: Enabling <span class="token variable">\${SYSTEM_NAME}</span> service for default runlevel&quot;</span>
    <span class="token variable">$SUDO</span> rc-update <span class="token function">add</span> <span class="token variable">\${SYSTEM_NAME}</span> default <span class="token operator">&gt;</span>/dev/null
<span class="token punctuation">}</span>

<span class="token function-name function">openrc_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    info <span class="token string">&quot;openrc: Starting <span class="token variable">\${SYSTEM_NAME}</span>&quot;</span>
    <span class="token variable">$SUDO</span> <span class="token variable">\${FILE_K3S_SERVICE}</span> restart
<span class="token punctuation">}</span>

<span class="token comment"># --- startup systemd or openrc service ---</span>
<span class="token function-name function">service_enable_and_start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-f</span> <span class="token string">&quot;/proc/cgroups&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable"><span class="token variable">$(</span><span class="token function">grep</span> memory /proc/cgroups <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> n n n enabled<span class="token punctuation">;</span> <span class="token keyword">do</span> <span class="token builtin class-name">echo</span> $enabled<span class="token punctuation">;</span> <span class="token keyword">done</span><span class="token variable">)</span></span>&quot;</span> <span class="token parameter variable">-eq</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span>
    <span class="token keyword">then</span>
        info <span class="token string">&#39;Failed to find memory cgroup, you may need to add &quot;cgroup_memory=1 cgroup_enable=memory&quot; to your linux cmdline (/boot/cmdline.txt on a Raspberry Pi)&#39;</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_ENABLE}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_SYSTEMD}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemd_enable
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_OPENRC}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> openrc_enable

    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_SKIP_START}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">return</span>

    <span class="token assign-left variable">POST_INSTALL_HASHES</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>get_installed_hashes<span class="token variable">)</span></span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${PRE_INSTALL_HASHES}</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;<span class="token variable">\${POST_INSTALL_HASHES}</span>&quot;</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_FORCE_RESTART}</span>&quot;</span> <span class="token operator">!=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        info <span class="token string">&#39;No change detected so skipping service start&#39;</span>
        <span class="token builtin class-name">return</span>
    <span class="token keyword">fi</span>

    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_SYSTEMD}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> systemd_start
    <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">\${HAS_OPENRC}</span>&quot;</span> <span class="token operator">=</span> <span class="token boolean">true</span> <span class="token punctuation">]</span> <span class="token operator">&amp;&amp;</span> openrc_start
    <span class="token builtin class-name">return</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

<span class="token comment"># --- re-evaluate args to include env command ---</span>
<span class="token builtin class-name">eval</span> <span class="token builtin class-name">set</span> -- <span class="token variable"><span class="token variable">$(</span>escape <span class="token string">&quot;<span class="token variable">\${INSTALL_K3S_EXEC}</span>&quot;</span><span class="token variable">)</span></span> <span class="token variable"><span class="token variable">$(</span>quote <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span><span class="token variable">)</span></span>

<span class="token comment"># --- run the install process --</span>
<span class="token punctuation">{</span>
    verify_system
    setup_env <span class="token string">&quot;<span class="token variable">$@</span>&quot;</span>
    download_and_verify
    setup_selinux
    create_symlinks
    create_killall
    create_uninstall
    systemd_disable
    create_env_file
    create_service_file
    service_enable_and_start
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>k3s\u5B89\u88C5\u52A8\u6001</summary><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/sealos<span class="token comment"># curl -fL https://rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -</span>
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
<span class="token number">100</span> <span class="token number">29713</span>  <span class="token number">100</span> <span class="token number">29713</span>    <span class="token number">0</span>     <span class="token number">0</span>   148k      <span class="token number">0</span> --:--:-- --:--:-- --:--:--  149k
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Finding release <span class="token keyword">for</span> channel stable
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Using v1.25.3+k3s1 as release
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Downloading <span class="token builtin class-name">hash</span> rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/v1.25.3-k3s1/sha256sum-amd64.txt
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Downloading binary rancher-mirror.oss-cn-beijing.aliyuncs.com/k3s/v1.25.3-k3s1/k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Verifying binary download
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Installing k3s to /usr/local/bin/k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping installation of SELinux RPM
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating /usr/local/bin/kubectl symlink to k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating /usr/local/bin/crictl symlink to k3s
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Skipping /usr/local/bin/ctr symlink to k3s, <span class="token builtin class-name">command</span> exists <span class="token keyword">in</span> <span class="token environment constant">PATH</span> at /usr/bin/ctr
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating <span class="token function">killall</span> script /usr/local/bin/k3s-killall.sh
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  Creating uninstall script /usr/local/bin/k3s-uninstall.sh
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  env: Creating environment <span class="token function">file</span> /etc/systemd/system/k3s.service.env
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Creating <span class="token function">service</span> <span class="token function">file</span> /etc/systemd/system/k3s.service
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Enabling k3s unit
Created symlink /etc/systemd/system/multi-user.target.wants/k3s.service \u2192 /etc/systemd/system/k3s.service.
<span class="token punctuation">[</span>INFO<span class="token punctuation">]</span>  systemd: Starting k3s
<span class="token comment">################################################################################</span>
root@ubuntu:/sealos<span class="token comment"># k3s</span>
NAME:
   k3s - Kubernetes, but small and simple

USAGE:
   k3s <span class="token punctuation">[</span>global options<span class="token punctuation">]</span> <span class="token builtin class-name">command</span> <span class="token punctuation">[</span>command options<span class="token punctuation">]</span> <span class="token punctuation">[</span>arguments<span class="token punctuation">..</span>.<span class="token punctuation">]</span>

VERSION:
   v1.25.3+k3s1 <span class="token punctuation">(</span>f2585c16<span class="token punctuation">)</span>

COMMANDS:
   server           Run management server
   agent            Run <span class="token function">node</span> agent
   kubectl          Run kubectl
   crictl           Run crictl
   ctr              Run ctr
   check-config     Run config check
   etcd-snapshot    Trigger an immediate etcd snapshot
   secrets-encrypt  Control secrets encryption and keys rotation
   certificate      Certificates management
   completion       Install shell completion script
   help, h          Shows a list of commands or <span class="token builtin class-name">help</span> <span class="token keyword">for</span> one <span class="token builtin class-name">command</span>

GLOBAL OPTIONS:
   <span class="token parameter variable">--debug</span>                     <span class="token punctuation">(</span>logging<span class="token punctuation">)</span> Turn on debug logs <span class="token punctuation">[</span><span class="token variable">$K3S_DEBUG</span><span class="token punctuation">]</span>
   --data-dir value, <span class="token parameter variable">-d</span> value  <span class="token punctuation">(</span>data<span class="token punctuation">)</span> Folder to hold state <span class="token punctuation">(</span>default: /var/lib/rancher/k3s or <span class="token variable">\${<span class="token environment constant">HOME</span>}</span>/.rancher/k3s <span class="token keyword">if</span> not root<span class="token punctuation">)</span>
   --help, <span class="token parameter variable">-h</span>                  show <span class="token builtin class-name">help</span>
   --version, <span class="token parameter variable">-v</span>               print the version

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details></details><p><strong>\u5378\u8F7Dk3s\uFF1A</strong></p><details class="custom-container details"><summary>\u5378\u8F7Dk3s</summary><p>\u5982\u679C\u60A8\u4F7F\u7528\u5B89\u88C5\u811A\u672C\u5B89\u88C5\u4E86 K3s\uFF0C\u90A3\u4E48\u5728\u5B89\u88C5\u8FC7\u7A0B\u4E2D\u4F1A\u751F\u6210\u4E00\u4E2A\u5378\u8F7D K3s \u7684\u811A\u672C\u3002</p><blockquote><p>\u5378\u8F7D K3s \u4F1A\u5220\u9664\u96C6\u7FA4\u6570\u636E\u548C\u6240\u6709\u811A\u672C\u3002\u8981\u4F7F\u7528\u4E0D\u540C\u7684\u5B89\u88C5\u9009\u9879\u91CD\u65B0\u542F\u52A8\u96C6\u7FA4\uFF0C\u8BF7\u4F7F\u7528\u4E0D\u540C\u7684\u6807\u5FD7\u91CD\u65B0\u8FD0\u884C\u5B89\u88C5\u811A\u672C\u3002</p></blockquote></details><p>\u63D0\u4F9B\u8981\u4ECE server \u8282\u70B9\u5378\u8F7D K3s\uFF0C\u548C\u9700\u8981\u4ECEagent\u7ED3\u70B9\u5378\u8F7DK3s\uFF1A</p>`,4),_n=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,`/usr/local/bin/k3s-uninstall.sh
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),gn=n("div",{class:"language-bash ext-sh line-numbers-mode"},[n("pre",{class:"language-bash"},[n("code",null,`/usr/local/bin/k3s-agent-uninstall.sh
`)]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"})])],-1),Sn=p(`<h2 id="\u955C\u50CF\u52A0\u901F" tabindex="-1"><a class="header-anchor" href="#\u955C\u50CF\u52A0\u901F" aria-hidden="true">#</a> \u955C\u50CF\u52A0\u901F</h2><p>\u955C\u50CF\u52A0\u901F\u914D\u7F6E\u540E\uFF0C\u91CD\u542F\u670D\u52A1</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&gt;</span> /etc/rancher/k3s/registries.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  docker.io:
    endpoint:
      - &quot;https://fogjl973.mirror.aliyuncs.com&quot;
      - &quot;http://hub-mirror.c.163.com&quot;
      - &quot;https://docker.mirrors.ustc.edu.cn&quot;
      - &quot;https://registry.docker-cn.com&quot;
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u91CD\u542Fk3s\u4F7F\u914D\u7F6E\u751F\u6548</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>crictl info<span class="token operator">|</span><span class="token function">grep</span>  <span class="token parameter variable">-A</span> <span class="token number">5</span> registry
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221031112848849.png" alt="image-20221031112848849"></p><h2 id="\u8FB9\u7F18\u8BA1\u7B97" tabindex="-1"><a class="header-anchor" href="#\u8FB9\u7F18\u8BA1\u7B97" aria-hidden="true">#</a> \u8FB9\u7F18\u8BA1\u7B97</h2><p>k3s \u975E\u5E38\u652F\u6301\u8FB9\u7F18\u8BA1\u7B97\uFF0CCICD \u7684\u90E8\u7F72\uFF0C\u53EF\u4EE5\u7ED9\u6211\u4EEC\u5E26\u6765\u66F4\u597D\u7684\u4F53\u9A8C\u3002</p><div class="custom-container tip"><p class="custom-container-title">\u8FB9\u7F18\u8BA1\u7B97\u662F\u4EC0\u4E48\uFF1F</p><p><em>\u8FB9\u7F18\u8BA1\u7B97\u662F\u4E3A\u5E94\u7528\u5F00\u53D1\u8005\u548C\u670D\u52A1\u63D0\u4F9B\u5546\u5728\u7F51\u7EDC\u7684\u8FB9\u7F18\u4FA7\u63D0\u4F9B\u4E91\u670D\u52A1\u548CIT\u73AF\u5883\u670D\u52A1\uFF1B\u76EE\u6807\u662F\u5728\u9760\u8FD1\u6570\u636E\u8F93\u5165\u6216\u7528\u6237\u7684\u5730\u65B9\u63D0\u4F9B\u8BA1\u7B97\u3001\u5B58\u50A8\u548C\u7F51\u7EDC\u5E26\u5BBD</em>\u3002</p><p>\u901A\u4FD7\u5730\u8BF4\uFF1A\u8FB9\u7F18\u8BA1\u7B97\u672C\u8D28\u4E0A\u662F\u4E00\u79CD\u670D\u52A1\uFF0C\u5C31\u7C7B\u4F3C\u4E8E\u4E91\u8BA1\u7B97\u3001\u5927\u6570\u636E\u670D\u52A1\uFF0C\u4F46\u8FD9\u79CD\u670D\u52A1\u975E\u5E38\u9760\u8FD1\u7528\u6237\uFF1B\u4E3A\u4EC0\u4E48\u8981\u8FD9\u4E48\u8FD1\uFF1F\u76EE\u7684\u662F\u4E3A\u4E86\u8BA9\u7528\u6237\u611F\u89C9\u5230\u5237\u4EC0\u4E48\u5185\u5BB9\u90FD\u7279\u522B\u5FEB\u3002</p></div><p><strong>\u63D0\u5347\u4E86Quick start\u6210\u529F\u7387\uFF1A</strong></p><p>\u6211\u4EEC\u5728\u4EA4\u4ED8\u8F6F\u4EF6\u7684\u65F6\u5019\uFF0C\u4ECE\u4EE5\u524D\u7684\u7ED9\u4E00\u4E2AJava\u73AF\u5883\u5230\u73B0\u5728\u9700\u8981\u4E00\u4E2Ak8s \u73AF\u5883\uFF0Ck3s\u5219\u96C6\u6210\u4E86\uFF0C\u63D0\u4F9B\u5F00\u7BB1\u5373\u7528\u7684\u4EA4\u4E92\u4F53\u9A8C\uFF0C\u964D\u4F4E\u8F6F\u4EF6\u7684\u8D44\u6E90\u5360\u7528\uFF0C\u5E76\u4E14\u4F7F\u8FD0\u7EF4\u90E8\u7F72\u66F4\u65B9\u4FBF\u3002</p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="13.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="15.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,13),yn=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),hn={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},$n=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),In=s(")"),wn=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),qn={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},Ln=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function En(Nn,An){const e=i("ExternalLinkIcon"),l=i("router-link"),o=i("CodeGroupItem"),c=i("CodeGroup"),r=i("RouterLink");return d(),k("div",null,[n("ul",null,[n("li",null,[n("a",m,[b,a(e)])])]),f,_,g,n("blockquote",null,[n("p",null,[S,n("a",y,[h,a(e)])])]),$,n("nav",I,[n("ul",null,[n("li",null,[a(l,{to:"#k3s\u4ECB\u7ECD"},{default:t(()=>[w]),_:1})]),n("li",null,[a(l,{to:"#k3s\u548Ck8s\u533A\u522B"},{default:t(()=>[q]),_:1})]),n("li",null,[a(l,{to:"#\u67B6\u6784"},{default:t(()=>[L]),_:1})]),n("li",null,[a(l,{to:"#\u5B89\u88C5-\u5378\u8F7D-k3s"},{default:t(()=>[E]),_:1})]),n("li",null,[a(l,{to:"#\u955C\u50CF\u52A0\u901F"},{default:t(()=>[N]),_:1})]),n("li",null,[a(l,{to:"#\u8FB9\u7F18\u8BA1\u7B97"},{default:t(()=>[A]),_:1})]),n("li",null,[a(l,{to:"#end-\u94FE\u63A5"},{default:t(()=>[T]),_:1})])])]),R,K,n("div",D,[O,C,n("ul",null,[n("li",null,[n("a",M,[x,a(e)])]),n("li",null,[n("a",H,[U,a(e)])]),n("li",null,[n("a",F,[B,a(e)])])]),P]),Y,n("details",V,[X,n("p",null,[W,G,z,n("a",j,[Q,a(e)]),J])]),Z,n("div",nn,[sn,n("ul",null,[n("li",null,[n("a",an,[en,a(e)])]),n("li",null,[n("a",tn,[pn,a(e)])]),n("li",null,[n("a",ln,[on,a(e)])]),n("li",null,[n("a",cn,[rn,a(e)])]),n("li",null,[n("a",un,[dn,a(e)])])]),kn,n("ul",null,[n("li",null,[n("a",vn,[mn,a(e)])])]),bn]),fn,a(c,null,{default:t(()=>[a(o,{title:"server\u7ED3\u70B9"},{default:t(()=>[_n]),_:1}),a(o,{title:"agent\u7ED3\u70B9"},{default:t(()=>[gn]),_:1})]),_:1}),Sn,n("ul",null,[n("li",null,[n("p",null,[a(r,{to:"/"},{default:t(()=>[yn]),_:1})])]),n("li",null,[n("p",null,[n("a",hn,[$n,a(e)]),In])]),n("li",null,[n("p",null,[wn,n("a",qn,[Ln,a(e)])])])])])}const Rn=u(v,[["render",En],["__file","14.html.vue"]]);export{Rn as default};
