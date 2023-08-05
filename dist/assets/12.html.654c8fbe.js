import{_ as r,r as l,o as d,c as p,a as n,b as s,w as a,e,d as i}from"./app.ee8200d6.js";const u={},k={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},m=e("author"),v=n("h1",{id:"\u7B2C12\u8282-ingress",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C12\u8282-ingress","aria-hidden":"true"},"#"),e(" \u7B2C12\u8282 Ingress")],-1),g=n("div",null,[n("a",{href:"11.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"13.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),h=n("br",null,null,-1),b=e("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),_={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},y=e("http://nsddd.top"),x=n("hr",null,null,-1),f={class:"table-of-contents"},I=e("Ingress"),w=e("\u7EDF\u4E00\u7F51\u5173"),q=e("yaml\u6587\u4EF6"),N=e("\u5B89\u88C5nginx\u6D4B\u8BD5"),P=e("END \u94FE\u63A5"),S=i('<p>[TOC]</p><h2 id="ingress" tabindex="-1"><a class="header-anchor" href="#ingress" aria-hidden="true">#</a> Ingress</h2><p><strong>Ingress\uFF1Aservice\u7684\u7EDF\u4E00\u7F51\u5173\u5165\u53E3\uFF08nginx\u5B9E\u73B0\uFF09</strong></p><div class="custom-container tip"><p class="custom-container-title">\u89E3\u91CA</p><ul><li>Ingress \u662F\u5BF9\u96C6\u7FA4\u4E2D\u670D\u52A1\u7684\u5916\u90E8\u8BBF\u95EE\u8FDB\u884C\u7BA1\u7406\u7684 API \u5BF9\u8C61\uFF0C\u5178\u578B\u7684\u8BBF\u95EE\u65B9\u5F0F\u662F HTTP\u3002</li><li>Ingress \u53EF\u4EE5\u63D0\u4F9B\u8D1F\u8F7D\u5747\u8861\u3001SSL \u7EC8\u7ED3\u548C\u57FA\u4E8E\u540D\u79F0\u7684\u865A\u62DF\u6258\u7BA1\u3002</li></ul><blockquote><p>K8s\u5E0C\u671B<code>Ingress</code>\u6210\u4E3A\u96C6\u7FA4\u6D41\u91CF\u7684\u552F\u4E00\u5165\u53E3\u3002</p></blockquote></div><div class="custom-container warning"><p class="custom-container-title">\u4F5C\u7528</p><ol><li><p>\u5E2E\u52A9\u4F4D\u4E8E\u96C6\u7FA4\u4E2D\u7684<code>Service</code>\u80FD\u591F\u6709\u4E00\u4E2A\u5BF9\u5916\u53EF\u8FBE\u7684<code>url</code>\uFF0C\u5373\u8BA9\u96C6\u7FA4\u5916\u7684\u5BA2\u6237\u7AEF\u4E5F\u53EF\u4EE5\u8BBF\u95EE\u5230\u81EA\u5DF1\u3002(wxy\uFF1A\u5BF9\u4E8E\u8FD9\u4E00\u70B9\uFF0C<code>NodePort</code>\u7C7B\u578B\u7684<code>Service</code>\u4E5F\u53EF\u4EE5\uFF0C\u540E\u9762\u4F1A\u8BF4\u5230)</p></li><li><p>\u505A\u4E13\u4E1A\u7684\u8D1F\u8F7D\u5747\u8861\uFF0C\u6BD5\u7ADF<code>Service</code>\u7684\u8D1F\u8F7D\u5747\u8861\u8FD8\u662F\u5F88\u521D\u7EA7\u7684</p></li><li><p>\u7EC8\u7ED3<code>ssl/tls</code>\u3002\u610F\u601D\u662F\u8BF4\u5BF9\u4E8E\u90A3\u4E9B\u4E1A\u52A1\u4E0D\u63D0\u4F9B<code>https</code>\u7684\uFF0C\u4E3A\u4E86\u5B89\u5168\uFF0C\u53EF\u4EE5\u6709\u4E13\u95E8\u673A\u6784\u5E2E\u6211\u4EEC\u505A\u5B89\u5168\u65B9\u9762\u7684\u4E8B\uFF0C\u4E1A\u52A1\u53EA\u9700\u8981\u4E13\u6CE8\u4E1A\u52A1\u5C31\u884C\u4E86\uFF0C\u6240\u4EE5\u53EF\u4EE5\u8BF4\u662F&quot;\u8FC7\u6EE4&quot;<code>ssl/tls</code></p></li><li><p>\u57FA\u4E8E\u540D\u79F0\u7684\u865A\u62DF<code>hosting</code>\u3002\u8FD9\u4E2A\u6211\u7406\u89E3\u5C31\u662F\u6211\u4EEC\u5E38\u8BF4\u7684Ingress\u662F\u4E00\u4E2A\u57FA\u4E8E\u5E94\u7528\u5C42\u63D0\u4F9B\u670D\u52A1\u7684\uFF0C\u56E0\u4E3A<code>Ingress</code>\u4E0D\u4EC5\u8D1F\u8D23\u4E00\u4E2A\u4E1A\u52A1/Service, \u800C\u662F\u53EF\u4EE5\u6839\u636E\u540D\u79F0\u533A\u5206\u4E0D\u540C\u7684&quot;hosting&quot;....\uFF08wxy: \u7EE7\u7EED\u770B\u770B\u53EF\u80FD\u5C31\u7406\u89E3\u4E86\uFF09</p></li></ol></div><div class="custom-container tip"><p class="custom-container-title">ingress\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898\uFF1F</p><ol><li><p><strong>\u52A8\u6001\u914D\u7F6E\u670D\u52A1</strong></p><blockquote><p>\u5982\u679C\u6309\u7167\u4F20\u7EDF\u65B9\u5F0F, \u5F53\u65B0\u589E\u52A0\u4E00\u4E2A\u670D\u52A1\u65F6, \u6211\u4EEC\u53EF\u80FD\u9700\u8981\u5728\u6D41\u91CF\u5165\u53E3\u52A0\u4E00\u4E2A\u53CD\u5411\u4EE3\u7406\u6307\u5411\u6211\u4EEC\u65B0\u7684k8s\u670D\u52A1. \u800C\u5982\u679C\u7528\u4E86Ingress, \u53EA\u9700\u8981\u914D\u7F6E\u597D\u8FD9\u4E2A\u670D\u52A1, \u5F53\u670D\u52A1\u542F\u52A8\u65F6, \u4F1A\u81EA\u52A8\u6CE8\u518C\u5230Ingress\u7684\u4E2D, \u4E0D\u9700\u8981\u800C\u5916\u7684\u64CD\u4F5C.</p></blockquote></li><li><p><strong>\u51CF\u5C11\u4E0D\u5FC5\u8981\u7684\u7AEF\u53E3\u66B4\u9732</strong></p><blockquote><p>\u914D\u7F6E\u8FC7k8s\u7684\u90FD\u6E05\u695A, \u7B2C\u4E00\u6B65\u662F\u8981\u5173\u95ED\u9632\u706B\u5899\u7684, \u4E3B\u8981\u539F\u56E0\u662Fk8s\u7684\u5F88\u591A\u670D\u52A1\u4F1A\u4EE5NodePort\u65B9\u5F0F\u6620\u5C04\u51FA\u53BB, \u8FD9\u6837\u5C31\u76F8\u5F53\u4E8E\u7ED9\u5BBF\u4E3B\u673A\u6253\u4E86\u5F88\u591A\u5B54, \u65E2\u4E0D\u5B89\u5168\u4E5F\u4E0D\u4F18\u96C5. \u800CIngress\u53EF\u4EE5\u907F\u514D\u8FD9\u4E2A\u95EE\u9898, \u9664\u4E86Ingress\u81EA\u8EAB\u670D\u52A1\u53EF\u80FD\u9700\u8981\u6620\u5C04\u51FA\u53BB, \u5176\u4ED6\u670D\u52A1\u90FD\u4E0D\u8981\u7528NodePort\u65B9\u5F0F</p></blockquote></li></ol></div><h2 id="\u7EDF\u4E00\u7F51\u5173" tabindex="-1"><a class="header-anchor" href="#\u7EDF\u4E00\u7F51\u5173" aria-hidden="true">#</a> \u7EDF\u4E00\u7F51\u5173</h2><p><code>Ingress</code>\u548C<code>Pod</code>\u5173\u7CFB</p><ul><li><code>pod</code>\u548C<code>Ingress</code>\u901A\u8FC7<code>service</code>\u5173\u8054\uFF0C<code>Ingress</code>\u4F5C\u4E3A\u4E00\u4E2A\u7EDF\u4E00\u5165\u53E3\u901A\u8FC7\u57DF\u540D\uFF0C\u7531<code>service</code>\u5173\u8054\u4E00\u7EC4<code>Pod</code></li></ul><p><code>Ingress</code> \u516C\u5F00\u4ECE\u96C6\u7FA4\u5916\u90E8\u5230\u96C6\u7FA4\u5185\u670D\u52A1\u7684 HTTP \u548C HTTPS \u8DEF\u7531\u3002 \u6D41\u91CF\u8DEF\u7531\u7531 <code>Ingress</code> \u8D44\u6E90\u4E0A\u5B9A\u4E49\u7684\u89C4\u5219\u63A7\u5236\u3002</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u6211\u4EEC\u53EF\u4EE5\u770B\u5230<code>Ingress</code>\u662F<code>Service</code>\u7684\u4E0A\u5C42\uFF0C<code>Ingress</code>\u63D0\u4F9B\u4E86\u66F4\u597D\u7684\u8D1F\u8F7D\u5747\u8861\u4F53\u9A8C~</p><p><img src="http://sm.nsddd.top/smimage-20221022201520335.png" alt="image-20221022201520335"></p><blockquote><p>Ingress\u662F\u57FA\u4E8Enginx\u7684\u5B9E\u73B0\u4E86\u65B9\u5411\u4EE3\u7406\u3002\u5185\u7F51\u901A\u8FC7<code>Service</code>\u8BBF\u95EE\uFF0C<code>Service</code>\u5B9E\u73B0\u4E86\u8D1F\u8F7D\u5747\u8861\u3002</p><p>Ingress\u5176\u5B9E\u4E5F\u53EF\u4EE5\u8BF4<code>lngress controller</code> \uFF0C\u4E5F\u5C31\u662F<code>Ingress\u63A7\u5236\u5668</code>\uFF0C\u5305\u542B\u4E86<code>nginx</code>\uFF0C\u6211\u4EEC\u5E73\u5E38\u4F20\u7EDF\u914D\u7F6E<code>nginx</code>\uFF0C\u5C31\u662F\u914D\u7F6E\u53CD\u5411\u4EE3\u7406\u89C4\u5219\u3002</p></blockquote></div><h2 id="yaml\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#yaml\u6587\u4EF6" aria-hidden="true">#</a> yaml\u6587\u4EF6</h2><p>\u4E00\u4E2A\u6700\u5C0F\u7684 Ingress \u8D44\u6E90\u793A\u4F8B\uFF1A</p>',13),C={href:"https://raw.githubusercontent.com/kubernetes/website/main/content/zh-cn/examples/service/networking/minimal-ingress.yaml",target:"_blank",rel:"noopener noreferrer"},E=n("code",null,"service/networking/minimal-ingress.yaml",-1),T=i(`<div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress  
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> minimal<span class="token punctuation">-</span>ingress
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/rewrite-target</span><span class="token punctuation">:</span> /
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ingressClassName</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>example
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /testpath
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>  <span class="token comment"># \u76D1\u542C\u7684\u540E\u7AEF\u540D\u79F0\u662F</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> test
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A\uFF1A</p><p><code>lngress controller</code>\u4F1A\u81EA\u52A8\u76D1\u542C<code>yaml</code>\u6587\u4EF6\uFF0C\u7136\u540E\u4E0B\u53D1\u4EFB\u52A1\uFF0C\u914D\u7F6E\uFF0C\u8FD9\u6837\u6240\u6709\u7684\u6D41\u91CF\u5C31\u4F1A\u6253\u5230<code>controller</code>\uFF0C\u4E0D\u9700\u8981\u76F4\u63A5\u914D\u7F6E<code>nginx</code>\u3002</p><p>Ingress \u9700\u8981\u6307\u5B9A apiVersion\u3001kind\u3001 metadata\u548C spec \u5B57\u6BB5\u3002 Ingress \u5BF9\u8C61\u7684\u547D\u540D\u5FC5\u987B\u662F\u5408\u6CD5\u7684 DNS \u5B50\u57DF\u540D\u540D\u79F0\u3002 \u5173\u4E8E\u5982\u4F55\u4F7F\u7528\u914D\u7F6E\u6587\u4EF6\uFF0C\u8BF7\u53C2\u89C1\u90E8\u7F72\u5E94\u7528\u3001 \u914D\u7F6E\u5BB9\u5668\u3001 \u7BA1\u7406\u8D44\u6E90\u3002 Ingress \u7ECF\u5E38\u4F7F\u7528\u6CE8\u89E3\uFF08annotations\uFF09\u6765\u914D\u7F6E\u4E00\u4E9B\u9009\u9879\uFF0C\u5177\u4F53\u53D6\u51B3\u4E8E Ingress \u63A7\u5236\u5668\uFF0C\u4F8B\u5982\u91CD\u5199\u76EE\u6807\u6CE8\u89E3\u3002 \u4E0D\u540C\u7684 Ingress \u63A7\u5236\u5668\u652F\u6301\u4E0D\u540C\u7684\u6CE8\u89E3\u3002 \u67E5\u770B\u4F60\u6240\u9009\u7684 Ingress \u63A7\u5236\u5668\u7684\u6587\u6863\uFF0C\u4EE5\u4E86\u89E3\u5176\u652F\u6301\u54EA\u4E9B\u6CE8\u89E3\u3002</p></div><p><strong>\u7F16\u8BD1\u6587\u4EF6</strong>\uFF1A</p><p><img src="http://sm.nsddd.top/smimage-20221023202032124.png" alt="image-20221023202032124"></p><h2 id="\u5B89\u88C5nginx\u6D4B\u8BD5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5nginx\u6D4B\u8BD5" aria-hidden="true">#</a> \u5B89\u88C5nginx\u6D4B\u8BD5</h2><details class="custom-container details"><summary>ingress 80\u7AEF\u53E3\u5B9E\u4F8B</summary><p>\u521B\u5EFA\u5E94\u7528pod\u3001service</p><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code>kubectl create deplyment web01 --image=nginx:1.14
kubectl expose deployment web02  --port=80 --protocol=TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5173\u8054 <code>ingress 80</code> \u7AEF\u53E3\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> web01<span class="token punctuation">-</span>ingress
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> nginx.didi.cn			<span class="token comment"># \u57DF\u540D</span>
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> web01			<span class="token comment"># \u540E\u7AEFservice\u540D\u79F0</span>
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>					<span class="token comment"># \u540E\u7AEFservice\u7AEF\u53E3</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>kubectl apply *.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details><div class="custom-container danger"><p class="custom-container-title">\u6CE8\u610Fsvc</p><p>\u56E0\u4E3A<code>ingress</code>\u9700\u8981\u63A5\u6536\u6240\u6709\u7684\u8BF7\u6C42\u6D41\u91CF\uFF0C\u6240\u4EE5<code>Ingress</code>\u5C31\u9700\u8981\u4E00\u4E2A\u7AEF\u53E3\u6765\u63A5\u6536\u6240\u6709\u7684\u6D41\u91CF\uFF0C\u8FD9\u4E2A\u7AEF\u53E3\u8FD8\u662F\u4EE5<code>NodePort</code>\u65B9\u5F0F\u66B4\u9732\u51FA\u53BB\u7684~</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>kubectl get svc -A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="11.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="13.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,9),V=e("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),A={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},L=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),B=e(")"),D=e("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),H={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},z=e("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function R(F,K){const t=l("ExternalLinkIcon"),o=l("router-link"),c=l("RouterLink");return d(),p("div",null,[n("ul",null,[n("li",null,[n("a",k,[m,s(t)])])]),v,g,h,n("blockquote",null,[n("p",null,[b,n("a",_,[y,s(t)])])]),x,n("nav",f,[n("ul",null,[n("li",null,[s(o,{to:"#ingress"},{default:a(()=>[I]),_:1})]),n("li",null,[s(o,{to:"#\u7EDF\u4E00\u7F51\u5173"},{default:a(()=>[w]),_:1})]),n("li",null,[s(o,{to:"#yaml\u6587\u4EF6"},{default:a(()=>[q]),_:1})]),n("li",null,[s(o,{to:"#\u5B89\u88C5nginx\u6D4B\u8BD5"},{default:a(()=>[N]),_:1})]),n("li",null,[s(o,{to:"#end-\u94FE\u63A5"},{default:a(()=>[P]),_:1})])])]),S,n("p",null,[n("a",C,[E,s(t)])]),T,n("ul",null,[n("li",null,[n("p",null,[s(c,{to:"/"},{default:a(()=>[V]),_:1})])]),n("li",null,[n("p",null,[n("a",A,[L,s(t)]),B])]),n("li",null,[n("p",null,[D,n("a",H,[z,s(t)])])])])])}const O=r(u,[["render",R],["__file","12.html.vue"]]);export{O as default};
