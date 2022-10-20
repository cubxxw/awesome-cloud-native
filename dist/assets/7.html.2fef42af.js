import{_ as i,r as a,o as l,c,a as e,b as n,w as t,d as s,e as p}from"./app.ce08e6d8.js";const g={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},h=s("author"),m=e("h1",{id:"\u7B2C7\u8282-k8s\u5728\u7EBF\u5B9E\u9A8C\u5B66\u4E60\u5E73\u53F0",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C7\u8282-k8s\u5728\u7EBF\u5B9E\u9A8C\u5B66\u4E60\u5E73\u53F0","aria-hidden":"true"},"#"),s(" \u7B2C7\u8282 k8s\u5728\u7EBF\u5B9E\u9A8C\u5B66\u4E60\u5E73\u53F0")],-1),b=e("div",null,[e("a",{href:"6.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"8.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),_=e("br",null,null,-1),v=s("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),k={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},f=s("http://nsddd.top"),x=e("hr",null,null,-1),y={class:"table-of-contents"},w=s("Play with Kubernetes \u4ECB\u7ECD"),C=s("\u642D\u5EFA Kubernetes \u96C6\u7FA4"),E=s("Kubernetes \u96C6\u7FA4\u7684\u4F7F\u7528"),K=s("END \u94FE\u63A5"),N=p(`<p>[TOC]</p><h2 id="play-with-kubernetes-\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#play-with-kubernetes-\u4ECB\u7ECD" aria-hidden="true">#</a> Play with Kubernetes \u4ECB\u7ECD</h2><p>\uFF081\uFF09<code>Play with Kubernetes</code> \u4E00\u4E2A\u63D0\u4F9B\u4E86\u5728\u6D4F\u89C8\u5668\u4E2D\u4F7F\u7528\u514D\u8D39 <strong>CentOS Linux</strong> \u865A\u62DF\u673A\u7684\u4F53\u9A8C\u5E73\u53F0\uFF0C\u5176\u5185\u90E8\u5B9E\u9645\u4E0A\u662F <strong>Docker-in-Docker</strong>\uFF08<strong>DinD</strong>\uFF09\u6280\u672F\u6A21\u62DF\u4E86\u591A\u865A\u62DF\u673A/<strong>PC</strong> \u7684\u6548\u679C\u3002 \uFF082\uFF09<code>Play with Kubernetes</code> \u5E73\u53F0\u6709\u5982\u4E0B\u51E0\u4E2A\u7279\u8272\uFF1A</p><ul><li>\u5141\u8BB8\u6211\u4EEC\u4F7F\u7528 <strong>github</strong> \u6216 <strong>dockerhub</strong> \u8D26\u53F7\u767B\u5F55</li><li>\u5728\u767B\u5F55\u540E\u4F1A\u5F00\u59CB\u5012\u8BA1\u65F6\uFF0C\u8BA9\u6211\u4EEC\u6709 <strong>4</strong> \u5C0F\u65F6\u7684\u65F6\u95F4\u53BB\u5B9E\u8DF5</li><li><strong>K8s</strong> \u73AF\u5883\u4F7F\u7528 <strong>kubeadm</strong> \u6765\u90E8\u7F72\uFF08\u4F7F\u7528\u7528 <strong>weave</strong> \u7F51\u7EDC\uFF09</li><li>\u5E73\u53F0\u5171\u63D0\u4F9B <strong>5</strong> \u53F0 <strong>centos7</strong> \u8BBE\u5907\u4F9B\u6211\u4EEC\u4F7F\u7528\uFF08<strong>docker</strong> \u7248\u672C\u4E3A <strong>17.09.0-ce</strong>\uFF09</li></ul><h2 id="\u642D\u5EFA-kubernetes-\u96C6\u7FA4" tabindex="-1"><a class="header-anchor" href="#\u642D\u5EFA-kubernetes-\u96C6\u7FA4" aria-hidden="true">#</a> \u642D\u5EFA Kubernetes \u96C6\u7FA4</h2><p>\uFF081\uFF09\u9996\u5148\u8BBF\u95EE\u5176\u7F51\u7AD9\uFF0C\u5E76\u4F7F\u7528 <strong>github</strong> \u6216 <strong>dockerhub</strong> \u8D26\u53F7\u8FDB\u884C\u767B\u5F55\u3002</p><ul><li><strong>PWK</strong> \u5B98\u7F51\u5730\u5740\uFF1Ahttps://labs.play-with-k8s.com/</li></ul><p>\uFF082\uFF09\u767B\u5F55\u540E\u70B9\u51FB\u9875\u9762\u4E0A\u7684 <strong>Start</strong> \u6309\u94AE\uFF0C\u6211\u4EEC\u4FBF\u62E5\u6709\u4E00\u4E2A\u81EA\u5DF1\u7684\u5B9E\u9A8C\u5BA4\u73AF\u5883\u3002</p><p><img src="http://sm.nsddd.top/smimage-20221019215214900.png" alt="image-20221019215214900"></p><p>\uFF083\uFF09\u5355\u51FB\u5DE6\u4FA7\u7684\u201C<strong>Add New Instance</strong>\u201D \u6765\u521B\u5EFA\u7B2C\u4E00\u4E2A <strong>Kubernetes</strong> \u96C6\u7FA4\u8282\u70B9\u3002\u5B83\u4F1A\u81EA\u52A8\u5C06\u5176\u547D\u540D\u4E3A\u201C<strong>node1</strong>\u201D\uFF0C\u8FD9\u4E2A\u5C06\u4F5C\u4E3A\u6211\u4EEC\u7FA4\u96C6\u7684\u4E3B\u8282\u70B9\u3002</p><p><img src="http://sm.nsddd.top/smimage-20221019215413938.png" alt="image-20221019215413938"></p><p>\uFF084\uFF09\u7531\u4E8E\u521A\u521B\u5EFA\u7684\u4E3B\u8282\u70B9 <strong>IP</strong> \u662F <code>192.168.0.5</code>\uFF0C\u56E0\u6B64\u6211\u4EEC\u6267\u884C\u5982\u4E0B\u547D\u4EE4\u8FDB\u884C\u521D\u59CB\u5316\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubeadm init --apiserver-advertise-address <span class="token number">192.168</span>.0.5 --pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\uFF085\uFF09\u521D\u59CB\u5316\u5B8C\u6BD5\u5B8C\u6210\u4E4B\u540E\uFF0C\u754C\u9762\u4E0A\u4F1A\u663E\u793A <code>kubeadm join</code> \u547D\u4EE4\uFF0C\u8FD9\u4E2A\u7528\u4E8E\u540E\u7EED <strong>node</strong> \u8282\u70B9\u52A0\u5165\u96C6\u7FA4\u4F7F\u7528\uFF0C\u9700\u8981\u7262\u8BB0\u3002</p><p><img src="http://sm.nsddd.top/smimage-20221019215641859.png" alt="image-20221019215641859"></p><p>\uFF086\uFF09\u63A5\u7740\u8FD8\u9700\u8981\u6267\u884C\u5982\u4E0B\u547D\u4EE4\u5B89\u88C5 <code>Pod</code> \u7F51\u7EDC\uFF08\u8FD9\u91CC\u6211\u4EEC\u4F7F\u7528 <code>flannel</code>\uFF09\uFF0C\u5426\u5219 <code>Pod</code> \u4E4B\u95F4\u65E0\u6CD5\u901A\u4FE1\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\uFF087\uFF09\u6700\u540E\u6211\u4EEC\u6267\u884C <code>kubectl get nodes</code> \u67E5\u770B\u8282\u70B9\u72B6\u6001\uFF0C\u53EF\u4EE5\u770B\u5230\u76EE\u524D\u53EA\u6709\u4E00\u4E2A <strong>Master</strong> \u8282\u70B9\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221019221408948.png" alt="image-20221019221408948"></p><p>\uFF088\uFF09\u6211\u4EEC\u5355\u51FB\u5DE6\u4FA7\u7684\u201C<strong>Add New Instance</strong>\u201D\u6309\u94AE\u7EE7\u7EED\u521B\u5EFA <strong>4</strong> \u4E2A\u8282\u70B9\u4F5C\u4E3A <strong>node</strong> \u8282\u70B9</p><p><img src="http://sm.nsddd.top/smimage-20221019221428071.png" alt="image-20221019221428071"></p><p>\uFF089\uFF09\u8FD9 <code>4</code> \u4E2A\u8282\u70B9\u90FD\u6267\u884C\u7C7B\u4F3C\u5982\u4E0B\u7684 <code>kubeadm join</code> \u547D\u4EE4\u52A0\u5165\u96C6\u7FA4\uFF08\u5373\u4E4B\u524D <code>master</code> \u8282\u70B9\u521D\u59CB\u5316\u5B8C\u6210\u540E\u7EA2\u6846\u90E8\u5206\u5185\u5BB9\uFF09</p><p><img src="http://sm.nsddd.top/smimage-20221019222217349.png" alt="image-20221019222217349"></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubeadm <span class="token function">join</span> <span class="token number">192.168</span>.0.18:6443 <span class="token parameter variable">--token</span> mb680t.mue309o4jo5gjfyb --discovery-token-ca-cert-hash sha256:714f1794efcf23flec7f2dc6eae029466022d7c74c991cf91decf8ff22be61ab
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221019222531962.png" alt="image-20221019222531962"></p><p>\uFF0810\uFF09\u6700\u540E\u6211\u4EEC\u5728\u4E3B\u8282\u70B9\u6267\u884C <code>kubectl get nodes</code> \u67E5\u770B\u8282\u70B9\u72B6\u6001\uFF0C\u53EF\u4EE5\u770B\u5230\u4E00\u4E2A\u5305\u542B\u6709 <code>5</code> \u4E2A\u8282\u70B9\u96C6\u7FA4\u5DF2\u7ECF\u90E8\u7F72\u6210\u529F\u4E86\u3002</p><p><img src="http://sm.nsddd.top/smimage-20221019222932955.png" alt="image-20221019222932955"></p><h2 id="kubernetes-\u96C6\u7FA4\u7684\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#kubernetes-\u96C6\u7FA4\u7684\u4F7F\u7528" aria-hidden="true">#</a> Kubernetes \u96C6\u7FA4\u7684\u4F7F\u7528</h2><p>\uFF081\uFF09\u6267\u884C\u5982\u4E0B\u547D\u4EE4\u901A\u8FC7 <strong>yaml</strong> \u6587\u4EF6\u90E8\u7F72\u8FD0\u884C <strong>nginx</strong> \u670D\u52A1\uFF08\u8BE5 <strong>yaml</strong> \u6587\u4EF6\u4E2D\u6307\u660E\u4E86\u526F\u672C\u6570\u91CF\u4E3A <strong>3</strong>\uFF09</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> https://raw.githubusercontent.com/kubernetes/website/master/content/en/examples/application/nginx-app.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\uFF082\uFF09\u6267\u884C\u5982\u4E0B\u547D\u4EE4\u67E5\u770B\u526F\u672C\uFF08<strong>pod</strong>\uFF09\u60C5\u51B5\uFF0C\u53EF\u4EE5\u770B\u5230\u786E\u5B9E\u6709\u4E09\u4E2A\u526F\u672C\u5206\u522B\u90E8\u7F72\u5728\u4E09\u4E2A <strong>node</strong> \u8282\u70B9\u4E0A\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>kubectl get pods -o wide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221020220601596.png" alt="image-20221020220601596"></p><p>\uFF083\uFF09\u6267\u884C\u5982\u4E0B\u547D\u4EE4\u5219\u53EF\u4EE5\u67E5\u770B <strong>services</strong> \u72B6\u6001\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>kubectl get service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221020220633446.png" alt="image-20221020220633446"></p><p>\uFF084\uFF09\u5F53\u90E8\u7F72\u5B8C\u6BD5\u540E\uFF0C\u9875\u9762\u4E0A\u65B9\u4F1A\u51FA\u73B0\u4E00\u4E2A\u5E26\u6709\u6570\u5B57\u7684\u84DD\u8272\u6309\u94AE\uFF0C\u6309\u94AE\u6570\u5B57\u5373\u4E3A <strong>Services</strong> \u968F\u673A\u914D\u7F6E\u7684\u5916\u90E8 <strong>port</strong>\u3002\u70B9\u51FB\u84DD\u8272\u6309\u94AE\uFF0C\u5373\u53EF\u770B\u5230 <strong>Nginx</strong> \u670D\u52A1\u7684\u6B22\u8FCE\u9875\u9762\u3002\uFF08\u4F46\u6211\u6D4B\u8BD5\u65F6\u4E00\u76F4\u6CA1\u6709\u51FA\u73B0\uFF0C\u4E0D\u6E05\u695A\u662F\u4EC0\u4E48\u539F\u56E0\uFF0C\u4F60\u5982\u679C\u6E05\u695A\u53EF\u4EE5<code>pr</code>\uFF09</p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="6.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="8.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,40),P=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),D={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},A=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),j=s(")"),I=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),L={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},S=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function B(V,M){const o=a("ExternalLinkIcon"),r=a("router-link"),d=a("RouterLink");return l(),c("div",null,[e("ul",null,[e("li",null,[e("a",u,[h,n(o)])])]),m,b,_,e("blockquote",null,[e("p",null,[v,e("a",k,[f,n(o)])])]),x,e("nav",y,[e("ul",null,[e("li",null,[n(r,{to:"#play-with-kubernetes-\u4ECB\u7ECD"},{default:t(()=>[w]),_:1})]),e("li",null,[n(r,{to:"#\u642D\u5EFA-kubernetes-\u96C6\u7FA4"},{default:t(()=>[C]),_:1})]),e("li",null,[n(r,{to:"#kubernetes-\u96C6\u7FA4\u7684\u4F7F\u7528"},{default:t(()=>[E]),_:1})]),e("li",null,[n(r,{to:"#end-\u94FE\u63A5"},{default:t(()=>[K]),_:1})])])]),N,e("ul",null,[e("li",null,[e("p",null,[n(d,{to:"/"},{default:t(()=>[P]),_:1})])]),e("li",null,[e("p",null,[e("a",D,[A,n(o)]),j])]),e("li",null,[e("p",null,[I,e("a",L,[S,n(o)])])])])])}const R=i(g,[["render",B],["__file","7.html.vue"]]);export{R as default};
