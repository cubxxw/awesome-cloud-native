import{_ as c,r,o as d,c as u,a as e,b as t,w as s,e as n,d as l}from"./app.f3413bea.js";const p={},h={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},_=n("author"),b=e("h1",{id:"\u7B2C18\u8282kubernetes-api-\u8BBF\u95EE\u63A7\u5236",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C18\u8282kubernetes-api-\u8BBF\u95EE\u63A7\u5236","aria-hidden":"true"},"#"),n(" \u7B2C18\u8282kubernetes API \u8BBF\u95EE\u63A7\u5236")],-1),k=e("div",null,[e("a",{href:"17.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"19.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),m=e("br",null,null,-1),f=n("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),v={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},C=n("http://nsddd.top"),g=e("hr",null,null,-1),y={class:"table-of-contents"},I=n("\u57FA\u672C\u6982\u5FF5"),K=n("kubernetes \u6269\u5C55"),x=n("kubectl"),R=n("APIServer"),P=n("Kubernetes \u8D44\u6E90"),S=n("Controller \u63A7\u5236\u5668"),A=n("Schedule \u8C03\u5EA6\u5668"),w=n("CNI \u7F51\u7EDC\u63D2\u4EF6"),D=n("CSI \u5B58\u50A8\u63D2\u4EF6"),E=n("CRI \u5BB9\u5668\u8FD0\u884C\u65F6"),N=n("Operator"),O=n("END \u94FE\u63A5"),L=l('<p>[TOC]</p><h2 id="\u57FA\u672C\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#\u57FA\u672C\u6982\u5FF5" aria-hidden="true">#</a> \u57FA\u672C\u6982\u5FF5</h2><div class="custom-container tip"><p class="custom-container-title">\u57FA\u672C\u6982\u5FF5</p><ul><li><p><code>CRD</code> (Custom Resource Definition)\uFF1A\u81EA\u5B9A\u4E49\u8D44\u6E90\u5B9A\u4E49\uFF0C\u7528\u4E8E\u5B9A\u4E49\u81EA\u5B9A\u4E49\u8D44\u6E90\uFF0C\u5141\u8BB8\u7528\u6237\u5728\u4E0D\u66F4\u6539API\u670D\u52A1\u5668\u7684\u60C5\u51B5\u4E0B\u5B9A\u4E49\u65B0\u7684\u8D44\u6E90\u7C7B\u578B\u3002</p></li><li><p><code>CR</code> (Custom Resource)\uFF1A\u81EA\u5B9A\u4E49\u8D44\u6E90\uFF0C\u662F\u4E00\u79CDKubernetes\u539F\u751F\u8D44\u6E90\uFF0C\u7528CRD\u5B9A\u4E49\u540E\uFF0CKubernetes\u96C6\u7FA4\u4FBF\u8BC6\u522B\u8BE5\u79CD\u8D44\u6E90\u3002</p></li><li><p><code>CRD Controller</code>\uFF1A\u81EA\u5B9A\u4E49\u8D44\u6E90\u63A7\u5236\u5668\uFF0C\u7528\u4E8E\u5B9E\u73B0CRD\u7684\u81EA\u52A8\u5316\u7BA1\u7406\uFF0C\u4F8B\u5982\u81EA\u52A8\u5907\u4EFD\u3001\u81EA\u52A8\u6062\u590D\u7B49\u3002</p></li><li><p><code>webhook</code>\uFF1A\u4E00\u79CDHTTP\u56DE\u8C03\uFF0C\u5F53\u7279\u5B9A\u4E8B\u4EF6\u53D1\u751F\u65F6\uFF0C\u7531Kubernetes\u96C6\u7FA4\u8C03\u7528\u6307\u5B9A\u7684URL\u3002webhook\u53EF\u7528\u4E8E\u5B9E\u73B0\u81EA\u5B9A\u4E49\u8D44\u6E90\u7684\u81EA\u52A8\u5316\u7BA1\u7406\u3002</p></li><li><p><code>\u5DE5\u4F5C\u961F\u5217</code> (work queue)\uFF1A\u4E00\u79CD\u6D88\u606F\u961F\u5217\uFF0C\u7528\u4E8E\u5B58\u50A8\u5F85\u5904\u7406\u7684\u4E8B\u4EF6\u3002\u5DE5\u4F5C\u961F\u5217\u4E2D\u7684\u4E8B\u4EF6\u7531\u63A7\u5236\u5668\u5904\u7406\uFF0C\u786E\u4FDD\u96C6\u7FA4\u72B6\u6001\u4E0E\u9884\u671F\u72B6\u6001\u4E00\u81F4\u3002</p></li><li><p><code>Informer</code>\uFF1A\u4E00\u79CD\u673A\u5236\uFF0C\u7528\u4E8E\u76D1\u542CKubernetes\u96C6\u7FA4\u4E2D\u8D44\u6E90\u5BF9\u8C61\u7684\u53D8\u5316\uFF0C\u5F53\u8D44\u6E90\u5BF9\u8C61\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u89E6\u53D1\u76F8\u5E94\u7684\u4E8B\u4EF6\u3002</p></li><li><p><code>Lister</code>\uFF1A\u4E00\u79CD\u673A\u5236\uFF0C\u7528\u4E8E\u7F13\u5B58Kubernetes\u96C6\u7FA4\u4E2D\u7684\u8D44\u6E90\u5BF9\u8C61\uFF0C\u52A0\u5FEB\u8D44\u6E90\u5BF9\u8C61\u7684\u67E5\u8BE2\u901F\u5EA6\u3002</p></li><li><p><code>controller</code>\uFF1A\u63A7\u5236\u5668\uFF0C\u7528\u4E8E\u5B9E\u73B0\u81EA\u52A8\u5316\u7BA1\u7406\uFF0C\u4F8B\u5982\u81EA\u52A8\u5907\u4EFD\u3001\u81EA\u52A8\u6062\u590D\u7B49\u3002\u76D1\u6D4B\u8D44\u6E90\u5BF9\u8C61\u7684\u53D8\u5316\uFF0C\u5F53\u8D44\u6E90\u5BF9\u8C61\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u89E6\u53D1\u76F8\u5E94\u7684\u4E8B\u4EF6\u3002</p></li><li><p><code>Operator</code>\uFF1A\u64CD\u4F5C\u5458\uFF0C\u662F\u4E00\u79CDKubernetes\u5E94\u7528\uFF0C\u7528\u4E8E\u5B9E\u73B0\u81EA\u52A8\u5316\u7BA1\u7406\uFF0C\u4F8B\u5982\u81EA\u52A8\u5907\u4EFD\u3001\u81EA\u52A8\u6062\u590D\u7B49\u3002\u76D1\u6D4B\u8D44\u6E90\u5BF9\u8C61\u7684\u53D8\u5316\uFF0C\u5F53\u8D44\u6E90\u5BF9\u8C61\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u89E6\u53D1\u76F8\u5E94\u7684\u4E8B\u4EF6\u3002</p><blockquote><p>\u4ECE\u5B9E\u73B0\u4E0A\u6765\u8BF4\uFF0C<code>operator = CRD + webhook + controller</code></p></blockquote></li></ul></div><h2 id="kubernetes-\u6269\u5C55" tabindex="-1"><a class="header-anchor" href="#kubernetes-\u6269\u5C55" aria-hidden="true">#</a> kubernetes \u6269\u5C55</h2><div class="custom-container tip"><p class="custom-container-title">\u6269\u5C55</p><p>Kubernetes \u662F\u4E00\u4E2A\u53EF\u79FB\u690D\u7684\u3001\u53EF\u6269\u5C55\u7684\u5F00\u6E90\u5E73\u53F0\uFF0C\u7528\u4E8E\u7BA1\u7406\u5BB9\u5668\u5316\u7684\u5DE5\u4F5C\u8D1F\u8F7D\u548C\u670D\u52A1\uFF0C\u53EF\u4FC3\u8FDB\u58F0\u660E\u5F0F\u914D\u7F6E\u548C\u81EA\u52A8\u5316\u3002 Kubernetes \u62E5\u6709\u4E00\u4E2A\u5E9E\u5927\u4E14\u5FEB\u901F\u589E\u957F\u7684\u751F\u6001\u7CFB\u7EDF\u3002Kubernetes \u7684\u670D\u52A1\u3001\u652F\u6301\u548C\u5DE5\u5177\u5E7F\u6CDB\u53EF\u7528\u3002</p><p>\u867D\u7136\u73B0\u5728 Kubernetes \u5DF2\u7ECF\u662F\u5BB9\u5668\u7F16\u6392\u7684\u4E8B\u5B9E\u6807\u51C6\uFF0C\u5176\u672C\u8EAB\u7684\u529F\u80FD\u4E5F\u975E\u5E38\u4E30\u5BCC\u5E76\u4E14\u7075\u6D3B\uFF0C\u4F46\u662F\u4E5F\u4E0D\u80FD\u6EE1\u8DB3\u6240\u6709\u4EBA\u7684\u9700\u6C42\uFF0C\u5728\u9047\u5230 Kubernetes \u63D0\u4F9B\u7684\u80FD\u529B\u65E0\u6CD5\u6EE1\u8DB3\u6211\u4EEC\u9700\u6C42\u7684\u65F6\u5019\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u5229\u7528\u5176\u5F3A\u5927\u7684\u6269\u5C55\u80FD\u529B\u8FDB\u884C\u5B9A\u5236\u3002</p></div>',5),V=n("\u5728sealos\u4E0A\u5C31\u663E\u800C\u6613\u89C1\u4E86\uFF0C"),T={href:"https://github.com/labring/sealos/tree/main/controllers",target:"_blank",rel:"noopener noreferrer"},q=n("controllers"),B=n(" \u63A7\u5236\u5668\u4E2D\u5B9E\u73B0\u4E86\u5927\u91CF\u7684\u6269\u5C55\uFF0C\u4ECE\u800C\u8FBE\u5230\u6EE1\u8DB3\u6211\u4EEC\u7684\u9700\u6C42\u3002"),M=e("p",null,[e("img",{src:"http://sm.nsddd.top/smimage-20221102144550488.png",alt:"image-20221102144550488"})],-1),W=e("h3",{id:"kubectl",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#kubectl","aria-hidden":"true"},"#"),n(" kubectl")],-1),F=e("p",null,"kubectl \u662F\u6211\u4EEC\u5E73\u65F6\u548C Kubernetes \u4EA4\u4E92\u4F7F\u7528\u7684\u6700\u591A\u7684\u5BA2\u6237\u7AEF\u5DE5\u5177\uFF0C\u5E38\u89C1\u7684\u8FD0\u7EF4\u64CD\u4F5C\u90FD\u4F1A\u901A\u8FC7 kubectl \u6765\u5B8C\u6210\uFF0Ckubectl \u4E3A\u6211\u4EEC\u63D0\u4F9B\u4E86\u63D2\u4EF6\u673A\u5236\u6765\u65B9\u4FBF\u6269\u5C55\u3002",-1),H=e("p",null,[n("kubectl \u63D2\u4EF6\u5176\u5B9E\u5C31\u662F\u4EE5"),e("code",null,"kubectl-"),n("\u4E3A\u524D\u7F00\u7684\u4EFB\u610F\u53EF\u6267\u884C\u6587\u4EF6 \uFF0C\u6267\u884C kubectl \u63D2\u4EF6\u7684\u65F6\u5019\u53EF\u4EE5\u901A\u8FC7 "),e("code",null,"kubectl \u63D2\u4EF6\u540D \u53C2\u6570"),n(" \u7684\u65B9\u5F0F\u8FD0\u884C\u63D2\u4EF6\u3002")],-1),U=n("\u5C31\u50CF "),z=e("code",null,"Ubuntu",-1),Y=n(" \u4F7F\u7528 "),j=e("code",null,"apt",-1),G=n(" \u7BA1\u7406\u8F6F\u4EF6\uFF0C"),J=e("code",null,"mac",-1),Q=n(" \u53EF\u4EE5\u4F7F\u7528 "),X=e("code",null,"brew",-1),Z=n(" \u4E00\u6837\uFF0C"),$=e("code",null,"kubectl",-1),ee=n(" \u4E5F\u6709\u7C7B\u4F3C\u7684\u63D2\u4EF6\u7BA1\u7406\u5DE5\u5177 "),ne=e("code",null,"krew",-1),te=n("\uFF0C\u540C\u65F6\u6211\u4EEC\u53EF\u4EE5\u4ECE "),se={href:"https://krew.sigs.kubernetes.io/plugins/",target:"_blank",rel:"noopener noreferrer"},oe=n("https://krew.sigs.Kubernetes.io/plugins/"),ae=n(" \u67E5\u627E\u662F\u5426\u5DF2\u7ECF\u5B58\u5728\u6211\u4EEC\u9700\u8981\u7684\u63D2\u4EF6"),re=l(`<p>::: cru rools</p><ul><li>crictl\uFF1A\u7C7B docker \u7684\u547D\u4EE4\u884C\u5DE5\u5177\uFF0C\u5E2E\u52A9\u7528\u6237\u548C\u5F00\u53D1\u8005\u8C03\u8BD5\u5BB9\u5668\u95EE\u9898</li><li>critest\uFF1A\u7528\u4E8E\u9A8C\u8BC1 CRI \u63A5\u53E3\u7684\u6D4B\u8BD5\u5DE5\u5177\uFF0C\u9A8C\u8BC1\u662F\u5426\u6EE1\u8DB3 Kubelet \u8981\u6C42</li><li>\u6027\u80FD\u5DE5\u5177\uFF1A\u6D4B\u8BD5\u63A5\u53E3\u6027\u80FD</li></ul><p><strong>\u76EE\u524D\u7684 CRI \u63A5\u53E3\u5904\u4E8E V1 alpha2 \u7248\u672C\uFF0CCRI \u89C4\u8303\u80FD\u4E0D\u80FD\u66F4\u5B8C\u5584\uFF1F</strong></p><p>:::</p><h3 id="apiserver" tabindex="-1"><a class="header-anchor" href="#apiserver" aria-hidden="true">#</a> APIServer</h3><h4 id="\u805A\u5408\u5C42" tabindex="-1"><a class="header-anchor" href="#\u805A\u5408\u5C42" aria-hidden="true">#</a> \u805A\u5408\u5C42</h4><p>\u4ECE Kubernetes v1.7 \u7248\u672C\u4E4B\u540E APIServer \u5F15\u5165\u4E86\u805A\u5408\u5C42\u7684\u529F\u80FD\uFF0C\u8FD9\u4E2A\u529F\u80FD\u53EF\u4EE5\u8BA9\u6BCF\u4E2A\u5F00\u53D1\u8005\u90FD\u80FD\u591F\u5B9E\u73B0\u805A\u5408 API \u670D\u52A1\u66B4\u9732\u5B83\u4EEC\u9700\u8981\u7684\u63A5\u53E3\uFF0C\u8FD9\u4E2A\u8FC7\u7A0B\u4E0D\u9700\u8981\u91CD\u65B0\u7F16\u8BD1 Kubernetes \u7684\u4EFB\u4F55\u4EE3\u7801\u3002</p><p>\u5982\u679C\u6211\u4EEC\u5C06\u4E0B\u9762\u8FD9\u4E2A\u8D44\u6E90\u63D0\u4EA4\u7ED9 Kubernetes \u4E4B\u540E\uFF0C\u7528\u6237\u5728\u8BBF\u95EE API \u670D\u52A1\u5668\u7684 <code>/apis/metrics.Kubernetes.io/v1beta1</code> \u8DEF\u5F84\u65F6\uFF0C\u4F1A\u88AB\u8F6C\u53D1\u5230\u96C6\u7FA4\u4E2D\u7684 <code>metrics-server.kube-system.svc</code> \u670D\u52A1\u4E0A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apiregistration.Kubernetes.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> APIService
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> v1beta1.metrics.Kubernetes.io
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">service</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> metrics<span class="token punctuation">-</span>server
    <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
  <span class="token key atrule">group</span><span class="token punctuation">:</span> metrics.Kubernetes.io
  <span class="token key atrule">version</span><span class="token punctuation">:</span> v1beta1
  <span class="token key atrule">insecureSkipTLSVerify</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">groupPriorityMinimum</span><span class="token punctuation">:</span> <span class="token number">100</span>
  <span class="token key atrule">versionPriority</span><span class="token punctuation">:</span> <span class="token number">100</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="\u51C6\u5165\u63A7\u5236" tabindex="-1"><a class="header-anchor" href="#\u51C6\u5165\u63A7\u5236" aria-hidden="true">#</a> \u51C6\u5165\u63A7\u5236</h4><p>\u9664\u6B64\u4E4B\u5916\u65E0\u8BBA\u662F\u4ECE kubectl \u8FD8\u662F client-go \u7B49\u5176\u4ED6\u5BA2\u6237\u7AEF\u53D1\u8D77\u7684\u8BF7\u6C42\u90FD\u4F1A\u53D1\u9001\u5230 APIServer \u7ECF\u8FC7 \u8BA4\u8BC1 -&gt; \u9274\u6743 -&gt; \u51C6\u5165\u63A7\u5236 \u7684\u6B65\u9AA4\uFF0C\u8FD9\u5176\u4E2D\u7684\u6BCF\u4E00\u6B65\u6211\u4EEC\u90FD\u53EF\u4EE5\u5BF9\u5176\u8FDB\u884C\u6269\u5C55\uFF0C\u800C\u8FD9\u5176\u4E2D\u7528\u7684\u6700\u591A\u7684\u5C31\u662F\u51C6\u5165\u63A7\u5236\u7684\u6269\u5C55\uFF0C\u8FD9\u4E00\u5757\u540E\u7EED\u4F1A\u4E00\u7BC7\u6587\u7AE0\u8BE6\u7EC6\u8BB2\u5230\u3002</p><p>\u51C6\u5165\u63A7\u5236\u5F53\u4E2D\u53C8\u4F1A\u5148\u7ECF\u8FC7\uFF0C\u53D8\u66F4\u51C6\u5165\u63A7\u5236 MutatingAdmissionWebhook\uFF0C\u7136\u540E\u518D\u7ECF\u8FC7\u9A8C\u8BC1\u51C6\u5165\u63A7\u5236 ValidatingAdmissionWebhook\uFF0C\u4EFB\u4F55\u4E00\u4E2A\u51C6\u5165\u63A7\u5236\u5668\u8FD4\u56DE\u4E86\u9519\u8BEF\u8FD9\u4E2A\u8BF7\u6C42\u90FD\u4F1A\u5931\u8D25\uFF0C\u4F8B\u5982\u8FD9\u4E24\u4E2A\u51C6\u5165\u63A7\u5236\u5668\u6211\u4EEC\u53EF\u4EE5\u505A\u5F88\u591A\u4E8B\u60C5\uFF0C\u4F8B\u5982\u6CE8\u5165 sidecar\uFF0C\u9A8C\u8BC1\u8D44\u6E90\uFF0C\u8C03\u6574 pod \u7684\u914D\u989D\u7B49\u7B49\u3002</p><h3 id="kubernetes-\u8D44\u6E90" tabindex="-1"><a class="header-anchor" href="#kubernetes-\u8D44\u6E90" aria-hidden="true">#</a> Kubernetes \u8D44\u6E90</h3><p>\u6211\u4EEC\u5E38\u7528\u7684 Deployment\u3001Pod\u3001Node \u7B49\u90FD\u662F Kubernetes \u5B98\u65B9\u63D0\u4F9B\u7684\u5185\u7F6E\u8D44\u6E90\uFF0C\u4F46\u662F\u6709\u7684\u65F6\u5019\u5185\u7F6E\u7684\u8D44\u6E90\u65E0\u6CD5\u6EE1\u8DB3\u6211\u4EEC\u7684\u9700\u6C42\u7684\u65F6\u5019\uFF0C\u5C31\u53EF\u4EE5\u4F7F\u7528 CustomResource \u4E5F\u5C31\u662F\u81EA\u5B9A\u4E49\u8D44\u6E90\u3002\u81EA\u5B9A\u4E49\u8D44\u6E90\u5E38\u5E38\u4F1A\u548C Controller \u4E00\u8D77\u914D\u5408\u4F7F\u7528\uFF0C\u4E0D\u8FC7\u9700\u8981\u6CE8\u610F\u7684\u662F\u4F7F\u7528\u81EA\u5B9A\u4E49\u8D44\u6E90\u7684\u65F6\u5019\u9700\u8981\u601D\u8003\u4E00\u4E0B\u5982\u679C\u53EA\u662F\u4E00\u4E9B\u914D\u7F6E\u53EF\u80FD ConfigMap \u4F1A\u66F4\u52A0\u9002\u5408\uFF0C\u4E0D\u8981\u6EE5\u7528\u8FD9\u4E2A\u7279\u6027\u3002</p><h3 id="controller-\u63A7\u5236\u5668" tabindex="-1"><a class="header-anchor" href="#controller-\u63A7\u5236\u5668" aria-hidden="true">#</a> Controller \u63A7\u5236\u5668</h3><p>Kubernetes \u4E2D\u8D44\u6E90\u7684\u72B6\u6001\u7684\u7EF4\u62A4\u90FD\u662F Controller \u6765\u5B9E\u73B0\u7684\uFF0CController \u4F1A\u4E0D\u65AD\u7684\u5C1D\u8BD5\u5C06\u4E00\u4E2A\u8D44\u6E90\u8C03\u6574\u4E3A\u6211\u4EEC\u63CF\u8FF0\u7684\u72B6\u6001\uFF0C\u8FD9\u5176\u5B9E\u4E5F\u5C31\u662F\u6211\u4EEC\u5E38\u8BF4\u7684\u58F0\u660E\u5F0F api\uFF0C\u58F0\u660E\u5F0F api \u80CC\u540E\u5177\u4F53\u7684\u6D3B\u90FD\u662F Controller \u5E72\u7684\u3002Controller \u4E00\u822C\u4F1A\u914D\u5408\u7740 CRD \u4E00\u8D77\u4F7F\u7528\u3002</p><h3 id="schedule-\u8C03\u5EA6\u5668" tabindex="-1"><a class="header-anchor" href="#schedule-\u8C03\u5EA6\u5668" aria-hidden="true">#</a> Schedule \u8C03\u5EA6\u5668</h3><p>\u8C03\u5EA6\u5668\u662F\u4E00\u79CD\u7279\u6B8A\u7684\u63A7\u5236\u5668\uFF0C\u8D1F\u8D23\u76D1\u89C6 Pod \u53D8\u5316\u5E76\u5C06 Pod \u5206\u6D3E\u7ED9\u8282\u70B9\uFF0C\u8C03\u5EA6\u5668\u53EF\u4EE5\u88AB\u76F4\u63A5\u66FF\u6362\u6389\u6216\u8005\u662F\u4F7F\u7528\u591A\u4E2A\u8C03\u5EA6\u5668\uFF0C\u9664\u6B64\u4E4B\u5916\u5B98\u65B9\u9ED8\u8BA4\u7684\u8C03\u5EA6\u5668\u4E5F\u652F\u6301 WebHook\u3002</p><h3 id="cni-\u7F51\u7EDC\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#cni-\u7F51\u7EDC\u63D2\u4EF6" aria-hidden="true">#</a> CNI \u7F51\u7EDC\u63D2\u4EF6</h3><p>CNI \u7F51\u7EDC\u63D2\u4EF6\uFF0C\u5168\u79F0 Container Network Interface\uFF08\u5BB9\u5668\u7F51\u7EDC\u63A5\u53E3\uFF09\u5305\u542B\u4E00\u7EC4\u7528\u4E8E\u5F00\u53D1\u63D2\u4EF6\u53BB\u914D\u7F6E Linux \u5BB9\u5668\u4E2D\u7F51\u5361\u7684\u63A5\u53E3\u548C\u6846\u67B6\u3002\u4E00\u822C\u6211\u4EEC\u4E0D\u4F1A\u53BB\u5BF9\u7F51\u7EDC\u63D2\u4EF6\u505A\u5B9A\u5236\u5F00\u53D1\uFF0C\u800C\u662F\u91C7\u7528\u5F00\u6E90\u7684\u7EC4\u4EF6\uFF0C\u4F8B\u5982 Flannel\u3001Cilium\uFF0C\u5982\u679C\u4F7F\u7528\u4E91\u670D\u52A1\u7684 Kubernetes \u8FD8\u4F1A\u9047\u5230\u4E00\u4E9B\u5B9A\u5236\u7684\u7F51\u7EDC\u63D2\u4EF6\uFF0C \u4F8B\u5982\u963F\u91CC\u4E91\u6709 Terway\u3002</p><h3 id="csi-\u5B58\u50A8\u63D2\u4EF6" tabindex="-1"><a class="header-anchor" href="#csi-\u5B58\u50A8\u63D2\u4EF6" aria-hidden="true">#</a> CSI \u5B58\u50A8\u63D2\u4EF6</h3><p>CSI \u5B58\u50A8\u63D2\u4EF6\uFF0C\u5168\u79F0 Container Storage Interface\uFF0C\u53EF\u4EE5\u901A\u8FC7 CSI \u63A5\u53E3\u652F\u6301\u4E0D\u540C\u7684\u5B58\u50A8\u7C7B\u578B</p><h3 id="cri-\u5BB9\u5668\u8FD0\u884C\u65F6" tabindex="-1"><a class="header-anchor" href="#cri-\u5BB9\u5668\u8FD0\u884C\u65F6" aria-hidden="true">#</a> CRI \u5BB9\u5668\u8FD0\u884C\u65F6</h3><p>CRI \u5BB9\u5668\u8FD0\u884C\u65F6\uFF0C\u5168\u79F0 Container Runtime Interface\uFF0C\u662F\u4E00\u7EC4\u7528\u4E8E\u7BA1\u7406\u5BB9\u5668\u8FD0\u884C\u65F6\u548C\u955C\u50CF\u7684 gRPC \u63A5\u53E3\uFF0C\u5229\u7528\u8FD9\u4E2A\u63A5\u53E3\u53EF\u4EE5\u652F\u6301 docker\u3001containerd \u7B49\u4E0D\u540C\u7684\u5BB9\u5668\u8FD0\u884C\u65F6\u3002</p><h2 id="operator" tabindex="-1"><a class="header-anchor" href="#operator" aria-hidden="true">#</a> Operator</h2><p>Kubernetes \u662F\u4E00\u4E2A\u9AD8\u5EA6\u53EF\u6269\u5C55\u7684\u7CFB\u7EDF\uFF0C\u867D\u7136\u5B83\u7684\u6269\u5C55\u70B9\u8FD9\u4E48\u591A\uFF0C\u4F46\u662F\u4E00\u822C\u6765\u8BF4\u6211\u4EEC\u63A5\u89E6\u7684\u6BD4\u8F83\u591A\u7684\u8FD8\u662F \u81EA\u5B9A\u4E49\u8D44\u6E90\uFF0C\u63A7\u5236\u5668\uFF0C\u51C6\u5165\u63A7\u5236\uFF0C\u6709\u4E9B\u8FD8\u4F1A\u5BF9 kubectl \u548C \u8C03\u5EA6\u5668\u505A\u4E00\u4E9B\u6269\u5C55\uFF0C\u5176\u4ED6\u7684\u5927\u90E8\u5206\u4F7F\u7528\u6210\u719F\u7684\u5F00\u6E90\u7EC4\u4EF6\u5C31\u53EF\u4EE5\u4E86\u3002\u800C\u6211\u4EEC\u8FD9\u4E2A\u7CFB\u5217\u5173\u6CE8\u7684 Operator \u5C31\u4F1A\u6D89\u53CA\u5230 \u81EA\u5B9A\u4E49\u8D44\u6E90\uFF0C\u63A7\u5236\u5668\u548C\u51C6\u5165\u63A7\u5236\u3002</p><p>Operator \u9075\u5FAA Kubernetes \u7684\u7406\u5FF5\uFF0C\u5B83\u5229\u7528\u81EA\u5B9A\u4E49\u8D44\u6E90\u7BA1\u7406\u5E94\u7528\u53CA\u5176\u7EC4\u4EF6\uFF0C Operator \u6A21\u5F0F\u4F1A\u5C01\u88C5\u4F60\u7F16\u5199\u7684\u4EFB\u52A1\u81EA\u52A8\u5316\u4EE3\u7801\u3002</p><p>Operator \u5E38\u89C1\u4F7F\u7528\u8303\u56F4\u5305\u62EC\uFF1A</p><ul><li>\u6309\u9700\u90E8\u7F72\u5E94\u7528</li><li>\u83B7\u53D6/\u8FD8\u539F\u5E94\u7528\u72B6\u6001\u7684\u5907\u4EFD</li><li>\u5904\u7406\u5E94\u7528\u4EE3\u7801\u7684\u5347\u7EA7\u4EE5\u53CA\u76F8\u5173\u6539\u52A8\u3002\u4F8B\u5982\uFF0C\u6570\u636E\u5E93 schema \u6216\u989D\u5916\u7684\u914D\u7F6E\u8BBE\u7F6E</li><li>\u53D1\u5E03\u4E00\u4E2A service\uFF0C\u8981\u6C42\u4E0D\u652F\u6301 Kubernetes API \u7684\u5E94\u7528\u4E5F\u80FD\u53D1\u73B0\u5B83</li><li>\u6A21\u62DF\u6574\u4E2A\u6216\u90E8\u5206\u96C6\u7FA4\u4E2D\u7684\u6545\u969C\u4EE5\u6D4B\u8BD5\u5176\u7A33\u5B9A\u6027</li><li>\u5728\u6CA1\u6709\u5185\u90E8\u6210\u5458\u9009\u4E3E\u7A0B\u5E8F\u7684\u60C5\u51B5\u4E0B\uFF0C\u4E3A\u5206\u5E03\u5F0F\u5E94\u7528\u9009\u62E9\u9996\u9886\u89D2\u8272</li></ul><p>\u4ECE <code>Operator</code> \u7406\u5FF5\u7684\u63D0\u51FA\u5230\u73B0\u5728\u5DF2\u7ECF\u6709\u4E86\u5F88\u591A\u5DE5\u5177\u53EF\u4EE5\u5E2E\u52A9\u6211\u4EEC\u5FEB\u901F\u4F4E\u6210\u672C\u7684\u5F00\u53D1\uFF0C\u5176\u4E2D\u6700\u5E38\u7528\u7684\u5C31\u662F CoreOS \u5F00\u6E90\u7684 <code>operator-sdk</code> \u548C <code>k8s sig</code> \u5C0F\u7EC4\u7EF4\u62A4\u7684 <code>kubebuilder</code>\uFF0C\u6211\u4EEC\u8FD9\u4E2A\u7CFB\u5217\u9009\u7528 kubebuilder\u3002</p><p>\u9664\u4E86\u6211\u4EEC\u81EA\u5DF1\u5F00\u53D1\u4E4B\u5916\u8FD8\u53EF\u4EE5\u5728 https://operatorhub.io/ \u4E0A\u627E\u5230\u522B\u4EBA\u5F00\u53D1\u7684\u73B0\u6210\u7684 Operator \u8FDB\u884C\u4F7F\u7528</p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="17.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="19.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,33),le=n("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),ie={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},ce=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),de=n(")"),ue=n("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),pe={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},he=n("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function _e(be,ke){const a=r("ExternalLinkIcon"),o=r("router-link"),i=r("RouterLink");return d(),u("div",null,[e("ul",null,[e("li",null,[e("a",h,[_,t(a)])])]),b,k,m,e("blockquote",null,[e("p",null,[f,e("a",v,[C,t(a)])])]),g,e("nav",y,[e("ul",null,[e("li",null,[t(o,{to:"#\u57FA\u672C\u6982\u5FF5"},{default:s(()=>[I]),_:1})]),e("li",null,[t(o,{to:"#kubernetes-\u6269\u5C55"},{default:s(()=>[K]),_:1}),e("ul",null,[e("li",null,[t(o,{to:"#kubectl"},{default:s(()=>[x]),_:1})]),e("li",null,[t(o,{to:"#apiserver"},{default:s(()=>[R]),_:1})]),e("li",null,[t(o,{to:"#kubernetes-\u8D44\u6E90"},{default:s(()=>[P]),_:1})]),e("li",null,[t(o,{to:"#controller-\u63A7\u5236\u5668"},{default:s(()=>[S]),_:1})]),e("li",null,[t(o,{to:"#schedule-\u8C03\u5EA6\u5668"},{default:s(()=>[A]),_:1})]),e("li",null,[t(o,{to:"#cni-\u7F51\u7EDC\u63D2\u4EF6"},{default:s(()=>[w]),_:1})]),e("li",null,[t(o,{to:"#csi-\u5B58\u50A8\u63D2\u4EF6"},{default:s(()=>[D]),_:1})]),e("li",null,[t(o,{to:"#cri-\u5BB9\u5668\u8FD0\u884C\u65F6"},{default:s(()=>[E]),_:1})])])]),e("li",null,[t(o,{to:"#operator"},{default:s(()=>[N]),_:1})]),e("li",null,[t(o,{to:"#end-\u94FE\u63A5"},{default:s(()=>[O]),_:1})])])]),L,e("p",null,[V,e("a",T,[q,t(a)]),B]),M,W,F,H,e("p",null,[U,z,Y,j,G,J,Q,X,Z,$,ee,ne,te,e("a",se,[oe,t(a)]),ae]),re,e("ul",null,[e("li",null,[e("p",null,[t(i,{to:"/"},{default:s(()=>[le]),_:1})])]),e("li",null,[e("p",null,[e("a",ie,[ce,t(a)]),de])]),e("li",null,[e("p",null,[ue,e("a",pe,[he,t(a)])])])])])}const fe=c(p,[["render",_e],["__file","18.html.vue"]]);export{fe as default};
