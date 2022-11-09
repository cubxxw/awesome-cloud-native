import{_ as o,r as l,o as a,c as d,a as e,b as t,w as h,e as s,d as n}from"./app.08b806be.js";const c={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},_=s("author"),p=e("h1",{id:"\u7B2C5\u8282-sealer-runtime",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C5\u8282-sealer-runtime","aria-hidden":"true"},"#"),s(" \u7B2C5\u8282 sealer runtime")],-1),b=e("br",null,null,-1),m=e("div",null,[e("a",{href:"4.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"6.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),k=e("br",null,null,-1),f=s("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),g={href:"https://github.com/3293172751/sealos",target:"_blank",rel:"noopener noreferrer"},v=s("sealos"),x=s("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),w={href:"https://github.com/3293172751/sealos",target:"_blank",rel:"noopener noreferrer"},y=s("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),C=s("\u3002Myblog:"),E={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},q=s("http://nsddd.top"),A=n(`<hr><p>[TOC]</p><h2 id="\u6CE8\u610F" tabindex="-1"><a class="header-anchor" href="#\u6CE8\u610F" aria-hidden="true">#</a> \u6CE8\u610F</h2><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>k8s \u4ECE v1.24 \u5F00\u59CB\uFF0Ckubernetes \u9ED8\u8BA4\u5BB9\u5668\u8FD0\u884C\u65F6\u4F7F\u7528 <code>containerd</code> \uFF0C\u4E0D\u518D\u4F7F\u7528 <code>docker</code>\u3002</p><p>k3s \u5C06\u6240\u6709 kubernetes \u63A7\u5236\u5C42\u9762\u7EC4\u4EF6\u90FD\u5C01\u88C5\u5230 \u5355\u4E2A\u4E8C\u8FDB\u5236\u4E2D \uFF0C\u5360\u7528\u8D44\u6E90\u5C0F\uFF0C\u4E14\u5305\u542B\u4E86 kubernetes \u8FD0\u884C\u65F6\u6240\u9700\u8981\u7684\u5916\u90E8\u4F9D\u8D56\u548C\u672C\u5730\u5B58\u50A8\u63D0\u4F9B\u7A0B\u5E8F\u3002</p><p>k3s \u63D0\u4F9B\u79BB\u7EBF\u5B89\u88C5\u5305\uFF0C\u53EF\u4EE5\u907F\u514D\u7F51\u7EDC\u8D44\u6E90\u8BBF\u95EE\u95EE\u9898\u3002</p></div><h2 id="\u79BB\u7EBF\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u79BB\u7EBF\u5B89\u88C5" aria-hidden="true">#</a> \u79BB\u7EBF\u5B89\u88C5</h2><p>\u4E0B\u8F7D\u79BB\u7EBF\u5B89\u88C5\u811A\u672C\uFF1Ahttps://get.k3s.io</p><p>\u4E0B\u8F7D<strong>k3s</strong>\u4E8C\u8FDB\u5236\u6587\u4EF6\uFF1Ak3s</p><p>\u4E0B\u8F7D\u5FC5\u8981\u7684<code>images</code>\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">wget</span> https://ghproxy.com/https://github.com/k3s-io/k3s/releases/download/v1.25.3%2Bk3s1/k3s-airgap-images-amd64.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,9),B=s("These files are available in the "),I={href:"https://github.com/k3s-io/k3s/",target:"_blank",rel:"noopener noreferrer"},N=s("GitHub"),R=s(" repository"),T=e("p",null,[e("img",{src:"http://sm.nsddd.top/smimage-20221109164523589.png",alt:"image-20221109164523589"})],-1),z=e("h2",{id:"\u524D\u8A00",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u524D\u8A00","aria-hidden":"true"},"#"),s(" \u524D\u8A00")],-1),L=e("p",null,[e("strong",null,"\u8BAE\u9898\uFF1A")],-1),S={href:"https://github.com/sealerio/sealer/issues/1839",target:"_blank",rel:"noopener noreferrer"},j=s("https://github.com/sealerio/sealer/issues/1839"),M={href:"https://github.com/sealerio/sealer/issues/1770",target:"_blank",rel:"noopener noreferrer"},V=s("https://github.com/sealerio/sealer/issues/1770"),D=e("h3",{id:"what-is-the-problem-this-feature-will-solve",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#what-is-the-problem-this-feature-will-solve","aria-hidden":"true"},"#"),s(" What is the problem this feature will solve?")],-1),G=e("ul",null,[e("li",null,"Brings all the benefits of k3s. @https://www.rancher.cn/k3s/"),e("li",null,"No k3s no sealos.")],-1),Y=e("blockquote",null,[e("p",null,"Sealos wants to hit the mass market, which is consistent with the direction of k3s. The lightweight k3s is more popular with mass developers.")],-1),K=e("p",null,"\u6211\u4EEC\u5728\u8DEF\u7EBF\u56FE\u4E2D\u5BF9 k8s\u3001k0s\u3001k3s \u8FD0\u884C\u65F6\u652F\u6301\u7684\u5DE5\u4F5C\u5E94\u8BE5\u6709\u4E00\u4E2A\u8FDB\u5EA6\u8BB0\u5F55\uFF0C\u5E94\u8BE5\u662F\u8BA9\u5DE5\u4F5C\u8FDB\u5EA6\u66F4\u52A0\u6E05\u6670\uFF0C\u5E76\u5438\u5F15\u66F4\u591A\u7684\u53C2\u4E0E\u8005\u52A0\u5165\u8FD9\u4E2A\u6838\u5FC3\u5DE5\u4F5C\u3002\u8FD9\u91CC\u7B80\u5355\u4ECB\u7ECD\u4E00\u4E0B\u90E8\u5206\u5DE5\u4F5C\uFF1A \u9605\u8BFB Sealer \u4E3B\u5206\u652F\u4EE3\u7801\uFF0C\u7406\u89E3 runtime \u6A21\u5757\u4E2D\u7684\u4EE3\u7801\uFF0C\u638C\u63E1\u4ECE cmd \u6A21\u5757\u5230 runtime \u6A21\u5757\u7684\u4EE3\u7801\u8C03\u7528\u903B\u8F91\u3002 \u901A\u8FC7k8s\u3001k0s\u3001k3s\u5B98\u7F51\u9605\u8BFB\u5E76\u8BBE\u8BA1\u8FD0\u884C\u65F6\u63A5\u53E3\u5B9E\u73B0\u65B9\u6CD5\u3002",-1),W=s("\u4E3A\u6307\u5B9A\u7684\u8FD0\u884C\u65F6\u8BFB\u53D6\u548C\u8BBE\u8BA1 clusterImage\u3002\u4E3B\u8981\u53C2\u8003\uFF1A "),F={href:"http://sealer.cool/docs/advanced/define-cloudimage.html#customize-the-cloudrootfs",target:"_blank",rel:"noopener noreferrer"},H=s("ClusterImage"),O=s("\u3001"),U={href:"https://github.com/sealerio/basefs",target:"_blank",rel:"noopener noreferrer"},J=s("basefs"),P=s("\u3002"),Q=n('<p>\u7C7B\u578B\uFF1A\u529F\u80FD\u8BF7\u6C42</p><ul><li>\u5355\u7ED3\u70B9\u6210\u4E3A\u9AD8\u53EF\u7528~</li></ul><p>docker~ run cmd</p><p>init</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u8FDB\u5C55</p></div><h2 id="clusterlmage" tabindex="-1"><a class="header-anchor" href="#clusterlmage" aria-hidden="true">#</a> Clusterlmage</h2><ul><li>Bin \u6587\u4EF6\uFF0C\u5982 docker\u3001containerd\u3001crictl\u3001kubeadm\u3001kubectl...</li><li>\u914D\u7F6E\u6587\u4EF6\uFF0C\u5982 kubelet systemd config\u3001docker systemd config\u3001docker daemon.json...</li><li>\u6CE8\u518C\u8868\u6CCA\u575E\u7A97\u56FE\u50CF\u3002</li><li>\u4E00\u4E9B\u5143\u6570\u636E\uFF0C\u4F8B\u5982 Kubernetes \u7248\u672C\u3002</li><li>\u6CE8\u518C\u8868\u6587\u4EF6\uFF0C\u5305\u542B\u6240\u6709\u7684docker\u955C\u50CF\uFF0C\u6BD4\u5982kubernetes\u6838\u5FC3\u7EC4\u4EF6docker\u955C\u50CF...</li><li>\u811A\u672C\uFF0C\u4E00\u4E9B\u7528\u4E8E\u5B89\u88C5 docker \u548C kubelet \u7684 shell \u811A\u672C... sealer \u5C06\u8C03\u7528 init.sh \u548C clean.sh\u3002</li><li>\u5176\u4ED6\u9759\u6001\u6587\u4EF6</li></ul><h2 id="\u95EE\u9898\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898\u63CF\u8FF0" aria-hidden="true">#</a> \u95EE\u9898\u63CF\u8FF0</h2><p>\u6211\u4EEC\u9700\u8981\u66F4\u65B0 k0s \u8FD0\u884C\u65F6\u4EE3\u7801\u4EE5\u9002\u5E94\u65B0\u7ED3\u6784\u3002 \u7C7B\u578B\uFF1A\u529F\u80FD\u8BF7\u6C42</p><h3 id="\u63CF\u8FF0\u4F60\u60F3\u8981\u4EC0\u4E48\u529F\u80FD" tabindex="-1"><a class="header-anchor" href="#\u63CF\u8FF0\u4F60\u60F3\u8981\u4EC0\u4E48\u529F\u80FD" aria-hidden="true">#</a> \u63CF\u8FF0\u4F60\u60F3\u8981\u4EC0\u4E48\u529F\u80FD</h3><h2 id="\u8C03\u7814" tabindex="-1"><a class="header-anchor" href="#\u8C03\u7814" aria-hidden="true">#</a> \u8C03\u7814</h2><p>\u9996\u5148\u9700\u8981\u8C03\u7814\uFF0C\u7136\u540E\u51FA\u4E00\u4E2A\u8BBE\u8BA1\u7A3F\uFF0C\u6BD4\u5982install\u6A21\u5757\u600E\u4E48\u548Ck3s\u7ED3\u5408</p><p>apply\u4F1A\u5BF9\u6BD4\u4E00\u4E0B\u65B0\u65E7\u96C6\u7FA4\u7684\u5DEE\u522B\uFF0C\u7136\u540E\u518D\u786E\u5B9A\u662F\u5426\u8C03\u7528runtime\u6765\u6269\u7F29\u5BB9\u96C6\u7FA4</p><blockquote><p>\u76EE\u524Dk3s\u8FD8\u6CA1\u6709\u5B9E\u73B0\uFF0Ck0s\u5728\u6700\u65B0\u4EE3\u7801\u4E2D\u8FD8\u6CA1\u6709\u9002\u914D\u8D77\u6765\uFF0C\u4E0A\u9762\u8FD9\u4E2A\u6587\u6863\u662F\u57280.8.6\u7248\u672C\uFF0C\u4E5F\u5C31\u662F9\u6708\u4E0B\u65EC\u53D1\u5E03\u7684\u90A3\u4E2A\u7248\u672C\u4EE3\u7801\u524D\u8BBE\u8BA1\u7684\uFF0C\u73B0\u5728\u7684\u8BDD\u5927\u4F53\u601D\u8DEF\u4E00\u81F4\uFF0C\u5982\u679C\u9700\u8981\u5B9E\u73B0k3s\u7684\u8BDD\uFF0C\u9996\u5148\u9700\u8981\u719F\u8BFBk3s\u7684\u5B98\u65B9\u5B89\u88C5\u6587\u6863\uFF0C\u5176\u6B21\u9605\u8BFBsealer runtime\u7684\u63A5\u53E3\u903B\u8F91\uFF0Cinstall/scaleup\u7B49\u63A5\u53E3\u5E72\u4E9B\u4EC0\u4E48\u4E8B\u513F\u3002\u6700\u540E\u8FD8\u9700\u8981\u770B\u4E00\u4E0B\u5982\u4F55\u4E0Erootfs\u8FDB\u884C\u4EA4\u4E92\uFF0C\u4E5F\u5C31\u662F\u96C6\u7FA4\u955C\u50CF\u90A3\u4E2A\u90E8\u5206\u3002\u5982\u679C\u6709\u5174\u8DA3\u7684\u8BDD\uFF0C\u6B22\u8FCE\u5BF9sealer\u8FDB\u884C\u8D21\u732E\u3002k0s\u3001k3s runtime\u90E8\u5206\u7684\u4EE3\u7801\u4F1A\u662F\u7531\u6211\u4E3B\u8981\u8D1F\u8D23\u3002</p><p>\u8FD9\u4E2A\u4E0D\u597D\u8BF4\uFF0C\u76EE\u524D\u65B0\u67B6\u6784\u4E0B\u7684cri\u8FD8\u6CA1\u6709\u652F\u6301containerd\uFF0Ck0s\u90E8\u5206\u4FEE\u6539\u8D77\u6765\u5F88\u5FEB\u5E76\u4E14\u5DF2\u7ECF\u63A8\u52A8\u4E86\uFF0C\u9884\u8BA11\u4E2A\u6708\u5C31\u53EF\u4EE5\u4E86\uFF0C\u53EF\u4EE5\u671F\u5F85sealer\u4E0B\u4E2A\u5927\u7248\u672C\u7684\u66F4\u65B0\u54E6\u5982\u679C\u73B0\u5728\u60F3\u4F53\u9A8Ck0s\u7684\u8BDD\uFF0C\u53EF\u4EE5\u5207\u6362\u52309\u670830\u53F7\u7684\u90A3\u6B21starcomingup\u7684\u63D0\u4EA4\uFF0C\u57FA\u4E8E\u90A3\u6B21commit\u8FDB\u884C\u7F16\u8BD1\uFF0Ck0s\u955C\u50CF\u7684\u8BDD\u53EF\u4EE5\u4F53\u9A8C\u4E00\u4E0B</p><p>\u4F46\u662F\u4E0D\u5EFA\u8BAE\u4E0A\u751F\u4EA7\u54E6</p></blockquote><h2 id="\u5148\u51B3\u6761\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u5148\u51B3\u6761\u4EF6" aria-hidden="true">#</a> \u5148\u51B3\u6761\u4EF6</h2>',15),X=s("\u5BB9\u5668\u5316\u4E3A\u57FA\u4E8E CRI"),Z={href:"https://github.com/YTGhost",target:"_blank",rel:"noopener noreferrer"},$=s("@YTGhost"),ee=s("\u8BF7\u5E2E\u6211\u8DDF\u8E2A\u8FD9\u9879\u5DE5\u4F5C"),se=n('<h2 id="\u5B89\u88C5-\u653E\u5927-\u7F29\u5C0F-\u91CD\u7F6E-\u5347\u7EA7" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5-\u653E\u5927-\u7F29\u5C0F-\u91CD\u7F6E-\u5347\u7EA7" aria-hidden="true">#</a> \u5B89\u88C5/\u653E\u5927/\u7F29\u5C0F/\u91CD\u7F6E/\u5347\u7EA7</h2><ul><li>\u5220\u9664\u6CE8\u518C\u8868\u4EA4\u4E92\u903B\u8F91</li><li>\u66F4\u6539\u4E3A <code>infra-driver</code> \u547D\u4EE4</li></ul><h2 id="\u66F4\u6539-basefs-\u811A\u672C" tabindex="-1"><a class="header-anchor" href="#\u66F4\u6539-basefs-\u811A\u672C" aria-hidden="true">#</a> \u66F4\u6539 basefs \u811A\u672C</h2><ul><li>\u5BB9\u5668 <code>d.sh</code></li><li>\u6709\u4E9B\u4E1C\u897F\u9700\u8981\u9075\u5FAA <code>k8s</code> \u9886\u5148\u7684\u903B\u8F91</li></ul><h2 id="\u5165\u53E3\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u5165\u53E3\u51FD\u6570" aria-hidden="true">#</a> \u5165\u53E3\u51FD\u6570</h2><ul><li>ChooseClusterRuntime()\uFF1A\u4F7F\u7528Metadata\u6765\u533A\u5206\u96C6\u7FA4Runtime\uFF0C\u9700\u8981\u6DFB\u52A0\u4E00\u4E2A\u5B57\u6BB5\u6765\u533A\u5206k0s\u3001k3s\u3001k8s</li></ul><h3 id="\u9644\u52A0\u4E0A\u4E0B\u6587" tabindex="-1"><a class="header-anchor" href="#\u9644\u52A0\u4E0A\u4E0B\u6587" aria-hidden="true">#</a> \u9644\u52A0\u4E0A\u4E0B\u6587</h3><p>\u5728\u6B64\u5904\u6DFB\u52A0\u6709\u5173\u529F\u80FD\u8BF7\u6C42\u7684\u4EFB\u4F55\u5176\u4ED6\u4E0A\u4E0B\u6587\u6216\u5C4F\u5E55\u622A\u56FE\u3002</p><p>sealos \u4E3B\u8BAE\u9898</p>',9),te={href:"https://github.com/sealerio/sealer/issues?q=is%3Aissue+is%3Aopen+k3s",target:"_blank",rel:"noopener noreferrer"},ie=s("k3s \u6240\u6709\u8BAE\u9898"),ne={href:"https://github.com/labring/sealos/issues/1943",target:"_blank",rel:"noopener noreferrer"},le=s("https://github.com/labring/sealos/issues/1943"),re=e("li",null,[e("p",null,"https://github.com/sealerio/sealer/issues/1399")],-1),oe=e("p",null,"\u7B56\u5212\u6587\u6863",-1),ae=e("ul",null,[e("li",null,"https://www.yuque.com/zhouxinyuan-6woia/nodno9/iswdqd")],-1),de=e("h2",{id:"issues",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#issues","aria-hidden":"true"},"#"),s(" issues")],-1),he=s("\u6211\u4EEC\u5728\u8DEF\u7EBF\u56FE\u4E2D\u5BF9 k8s\u3001k0s\u3001k3s \u8FD0\u884C\u65F6\u652F\u6301\u7684\u5DE5\u4F5C\u5E94\u8BE5\u6709\u4E00\u4E2A\u8FDB\u5EA6\u8BB0\u5F55\uFF0C\u5E94\u8BE5\u662F\u8BA9\u5DE5\u4F5C\u8FDB\u5EA6\u66F4\u52A0\u6E05\u6670\uFF0C\u5E76\u5438\u5F15\u66F4\u591A\u7684\u53C2\u4E0E\u8005\u52A0\u5165\u8FD9\u4E2A\u6838\u5FC3\u5DE5\u4F5C\u3002\u8FD9\u91CC\u7B80\u5355\u4ECB\u7ECD\u4E00\u4E0B\u90E8\u5206\u5DE5\u4F5C\uFF1A \u9605\u8BFBSealer\u4E3B\u5206\u652F\u4EE3\u7801\uFF0C\u7406\u89E3 "),ce=e("code",null,"runtime",-1),ue=s(" \u6A21\u5757\u4E2D\u7684\u4EE3\u7801\uFF0C\u638C\u63E1\u4ECEcmd\u6A21\u5757\u5230runtime\u6A21\u5757\u7684\u4EE3\u7801\u8C03\u7528\u903B\u8F91\u3002 \u901A\u8FC7k8s\u3001k0s\u3001k3s\u5B98\u7F51\u9605\u8BFB\u5E76\u8BBE\u8BA1\u8FD0\u884C\u65F6\u63A5\u53E3\u5B9E\u73B0\u65B9\u6CD5\u3002 \u4E3A\u6307\u5B9A\u7684\u8FD0\u884C\u65F6\u8BFB\u53D6\u548C\u8BBE\u8BA1 clusterImage\u3002\u4E3B\u8981\u53C2\u8003\uFF1A "),_e={href:"http://sealer.cool/docs/advanced/define-cloudimage.html#customize-the-cloudrootfs",target:"_blank",rel:"noopener noreferrer"},pe=s("ClusterImage"),be=s("\u3001"),me={href:"https://github.com/sealerio/basefs",target:"_blank",rel:"noopener noreferrer"},ke=s("basefs"),fe=s("\u3002 \u7C7B\u578B\uFF1A"),ge=e("em",null,"\u529F\u80FD\u8BF7\u6C42",-1),ve={href:"https://github.com/sealerio/sealer/pull/1686",target:"_blank",rel:"noopener noreferrer"},xe=s("k0s \u8DDF\u8FDB\u6587\u6863"),we={href:"https://github.com/sealerio/sealer/pull/1686/files",target:"_blank",rel:"noopener noreferrer"},ye=s("1686\u8BAE\u9898\u8DDF\u8FDB\u4EE3\u7801"),Ce=n(`<h2 id="k0s-runtime\u8BBE\u8BA1readme" tabindex="-1"><a class="header-anchor" href="#k0s-runtime\u8BBE\u8BA1readme" aria-hidden="true">#</a> k0s runtime\u8BBE\u8BA1readme</h2><ul><li>https://github.com/sealerio/sealer/blob/main/pkg/runtime/k0s/README.md</li></ul><h3 id="\u57FA\u7840\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u57FA\u7840\u6587\u4EF6" aria-hidden="true">#</a> \u57FA\u7840\u6587\u4EF6</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">.</span>
\u251C\u2500\u2500 amd64
\u2502   \u251C\u2500\u2500 bin
\u2502   \u2502   \u251C\u2500\u2500 k0s
\u2502   \u2502   \u251C\u2500\u2500 kubectl
\u2502   \u2502   \u251C\u2500\u2500 nerdctl
\u2502   \u2502   \u2514\u2500\u2500 seautil
\u2502   \u251C\u2500\u2500 images
\u2502   \u2502   \u2514\u2500\u2500 registry.tar.gz
\u2502   \u2514\u2500\u2500 Metadata
\u251C\u2500\u2500 imageList
\u251C\u2500\u2500 Kubefile
\u2514\u2500\u2500 rootfs
    \u251C\u2500\u2500 etc
    \u2502   \u251C\u2500\u2500 dump-config.toml
    \u2502   \u2514\u2500\u2500 registry.yml
    \u2514\u2500\u2500 scripts
        \u251C\u2500\u2500 containerd.sh
        \u251C\u2500\u2500 init-registry.sh
        \u2514\u2500\u2500 init.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#\u4ECB\u7ECD" aria-hidden="true">#</a> \u4ECB\u7ECD</h3><p>\u6211\u4EEC\u5B9A\u4E49 k0s \u8FD0\u884C\u65F6\u6709 5 \u4E2A\u9636\u6BB5\u6765\u5B89\u88C5/\u6269\u5C55/\u91CD\u7F6E\u96C6\u7FA4\u3002</p>`,6),Ee=s("basefs \u5305\u542B\u4E8C\u8FDB\u5236\u3001shell \u811A\u672C\u3001\u914D\u7F6E\u6587\u4EF6\u548C\u955C\u50CF\u3002\u4E86\u89E3\u6709\u5173"),qe={href:"https://github.com/sealerio/basefs",target:"_blank",rel:"noopener noreferrer"},Ae=s("sealerio/basefs \u7684\u66F4\u591A\u4FE1\u606F"),Be={href:"https://github.com/k0sproject/k0s",target:"_blank",rel:"noopener noreferrer"},Ie=s("\u901A\u8FC7\u6267\u884Ck0s"),Ne=s("\u547D\u4EE4\u5B89\u88C5\u6587\u4EF6\u7CFB\u7EDF\u5F15\u5BFC\u96C6\u7FA4\u4E4B\u524D\u7684\u8FD0\u884C\u65F6\u3002"),Re=n('<ul><li>init <ul><li>\u5F53 sealer \u5BFC\u81F4\u5148\u5B89\u88C5\u96C6\u7FA4\u65F6\uFF0Cinit \u9636\u6BB5\u5C06 rootfs/bin \u590D\u5236\u5230 init.sh \u811A\u672C\u4E2D\u7684 /usr/bin</li><li>\u521B\u5EFA\u5F15\u5BFC\u914D\u7F6E /etc/k0s/k0s.yaml \u4EE5\u5F15\u5BFC\u63A7\u5236\u5668\u521D\u59CB\u5316</li><li>\u751F\u6210 k0s \u52A0\u5165\u4EE4\u724C /etc/k0s/worker-token \u548C /etc/k0s/controller-token\uFF0C\u4E5F\u662F\u79C1\u6709\u6CE8\u518C\u8868\u8BC1\u4E66</li><li>\u521D\u59CB\u5316\u63A7\u5236\u5668\u8282\u70B9</li><li>\u83B7\u53D6 ~/.kube/config \u7684\u914D\u7F6E\u4EE5\u7BA1\u7406\u96C6\u7FA4\u3002</li></ul></li><li>join <ul><li>\u52A0\u5165\u9636\u6BB5\u51C6\u5907\u6CE8\u518C\u8868\u8BC1\u4E66\uFF0C\u5E76\u7528\u4E8E<code>k0s join</code>\u6269\u5C55\u96C6\u7FA4\u3002</li></ul></li><li>delete <ul><li>\u5220\u9664\u4E0E\u52A0\u5165\u76F8\u540C\uFF0C\u4F46\u5B83\u56DE\u6536\u52A0\u5165\u9636\u6BB5\u5B89\u88C5\u7684\u4EFB\u4F55\u5185\u5BB9\u3002</li></ul></li><li>reset <ul><li>\u901A\u8FC7 k0s \u91CD\u7F6E\u4EE5\u79FB\u9664\u8BE5\u96C6\u7FA4\u5E76\u79FB\u9664\u7531 sealer \u751F\u6210\u7684\u96C6\u7FA4\u7684\u4EFB\u4F55\u76F8\u5173\u5185\u5BB9\u3002</li></ul></li><li>Upgrade <ul><li>upgrade \u53EF\u4EE5\u5347\u7EA7 k0s \u96C6\u7FA4\u3002</li></ul></li></ul><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="4.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="6.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>',3),Te=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),ze={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},Le=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),Se=s(")"),je=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),Me={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},Ve=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function De(Ge,Ye){const i=l("ExternalLinkIcon"),r=l("RouterLink");return a(),d("div",null,[e("ul",null,[e("li",null,[e("a",u,[_,t(i)])])]),p,b,m,k,e("blockquote",null,[e("p",null,[f,e("a",g,[v,t(i)]),x,e("a",w,[y,t(i)]),C,e("a",E,[q,t(i)])])]),A,e("blockquote",null,[e("p",null,[e("strong",null,[B,e("a",I,[N,t(i)]),R])]),T]),z,L,e("ul",null,[e("li",null,[e("a",S,[j,t(i)])]),e("li",null,[e("a",M,[V,t(i)])])]),D,G,Y,K,e("p",null,[W,e("a",F,[H,t(i)]),O,e("a",U,[J,t(i)]),P]),Q,e("ul",null,[e("li",null,[X,e("a",Z,[$,t(i)]),ee])]),se,e("ul",null,[e("li",null,[e("p",null,[e("a",te,[ie,t(i)])])]),e("li",null,[e("p",null,[e("a",ne,[le,t(i)])])]),re]),oe,ae,de,e("p",null,[he,ce,ue,e("a",_e,[pe,t(i)]),be,e("a",me,[ke,t(i)]),fe,ge]),e("ul",null,[e("li",null,[e("a",ve,[xe,t(i)])]),e("li",null,[e("a",we,[ye,t(i)])])]),Ce,e("p",null,[Ee,e("a",qe,[Ae,t(i)])]),e("p",null,[e("a",Be,[Ie,t(i)]),Ne]),Re,e("ul",null,[e("li",null,[e("p",null,[t(r,{to:"/"},{default:h(()=>[Te]),_:1})])]),e("li",null,[e("p",null,[e("a",ze,[Le,t(i)]),Se])]),e("li",null,[e("p",null,[je,e("a",Me,[Ve,t(i)])])])])])}const We=o(c,[["render",De],["__file","5.html.vue"]]);export{We as default};