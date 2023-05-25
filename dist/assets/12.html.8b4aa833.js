import{_ as t,r as i,o as c,c as d,a as n,b as s,w as r,e,d as o}from"./app.e902a46c.js";const u={},v={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},p=e("author"),b=n("h1",{id:"\u7B2C12\u8282-sealer-\u6570\u636E\u5B58\u50A8\u76EE\u5F55",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C12\u8282-sealer-\u6570\u636E\u5B58\u50A8\u76EE\u5F55","aria-hidden":"true"},"#"),e(" \u7B2C12\u8282 sealer \u6570\u636E\u5B58\u50A8\u76EE\u5F55")],-1),m=n("div",null,[n("a",{href:"11.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"13.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),h=n("br",null,null,-1),k=e("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),_={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},f=e("sealos"),g=e("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),y={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},x=e("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),w=e("\u3002Myblog:"),E={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},C=e("http://nsddd.top"),Z=o(`<hr><p>[TOC]</p><h2 id="\u5BF9\u6BD4" tabindex="-1"><a class="header-anchor" href="#\u5BF9\u6BD4" aria-hidden="true">#</a> \u5BF9\u6BD4</h2><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u6570\u636E\u5B58\u50A8\u4E00\u822C\u90FD\u4F1A\u9009\u62E9 <code>/var/lib/</code> \u4E0B\u9762\uFF0C\u5305\u62EC <strong>docker</strong> \u3001<strong>k3s</strong>\u3001<strong>kubernetes</strong> \u7B49\u7B49</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos lib<span class="token punctuation">]</span><span class="token comment"># ls rancher/k3s/</span>
agent  data  server

<span class="token punctuation">[</span>root@VM-4-6-centos lib<span class="token punctuation">]</span><span class="token comment"># ls docker/</span>
containers  image  network  overlay2  plugins  swarm  tmp  trust  volumes

<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z lib<span class="token punctuation">]</span><span class="token comment"># ls sealos </span>
data  logs

<span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z lib<span class="token punctuation">]</span><span class="token comment"># ls sealer</span>
data  log  metadata  tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h2 id="\u7B2C\u4E00\u5C42" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E00\u5C42" aria-hidden="true">#</a> \u7B2C\u4E00\u5C42</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z sealer<span class="token punctuation">]</span><span class="token comment"># tree -L 3</span>
<span class="token builtin class-name">.</span>
\u251C\u2500\u2500 data
\u2502   \u251C\u2500\u2500 my-cluster
\u2502   \u2502   \u251C\u2500\u2500 admin.conf
\u2502   \u2502   \u251C\u2500\u2500 certs
\u2502   \u2502   \u251C\u2500\u2500 controller-manager.conf
\u2502   \u2502   \u251C\u2500\u2500 kubelet.conf
\u2502   \u2502   \u251C\u2500\u2500 pki
\u2502   \u2502   \u251C\u2500\u2500 rootfs
\u2502   \u2502   \u2514\u2500\u2500 scheduler.conf
\u2502   \u2514\u2500\u2500 overlay2
\u2502       \u251C\u2500\u2500 1066d3057<span class="token punctuation">..</span><span class="token punctuation">..</span>
\u2502       \u251C\u2500\u2500 4f57aa0fb<span class="token punctuation">..</span><span class="token punctuation">..</span>
\u2502       \u251C\u2500\u2500 6af04e85d<span class="token punctuation">..</span><span class="token punctuation">..</span>
\u2502       \u251C\u2500\u2500 70b6c7cb2<span class="token punctuation">..</span><span class="token punctuation">..</span>
\u2502       \u251C\u2500\u2500 869b45ef4<span class="token punctuation">..</span><span class="token punctuation">..</span>
\u2502       \u251C\u2500\u2500 907a935ec<span class="token punctuation">..</span><span class="token punctuation">..</span>
\u2502       \u251C\u2500\u2500 b66e77105<span class="token punctuation">..</span><span class="token punctuation">..</span>
\u2502       \u251C\u2500\u2500 bdfff9613<span class="token punctuation">..</span><span class="token punctuation">..</span>
\u2502       \u2514\u2500\u2500 ebd0f721b<span class="token punctuation">..</span><span class="token punctuation">..</span>
\u251C\u2500\u2500 log
\u2502   \u251C\u2500\u2500 <span class="token number">2022</span>-11-09.log
\u2502   \u251C\u2500\u2500 <span class="token number">2022</span>-11-10.log
\u2502   \u251C\u2500\u2500 <span class="token number">2022</span>-11-13.log
\u2502   \u251C\u2500\u2500 <span class="token number">2022</span>-11-25.log
\u2502   \u2514\u2500\u2500 <span class="token number">2022</span>-11-27.log
\u251C\u2500\u2500 metadata
\u2502   \u251C\u2500\u2500 imagedb
\u2502   \u2502   \u251C\u2500\u2500 3de6a23e655a1a6bc683828de2303844c49681c18e7dc410bc569a284e7c8ab0.yaml
\u2502   \u2502   \u251C\u2500\u2500 46f8c423be130a508116f41cda013502094804525c1274bc84296b674fe17618.yaml
\u2502   \u2502   \u2514\u2500\u2500 deb14be4949d93160ee16ed9c08e5677957e8e727f4f823ce34a2d69b17044c0.yaml
\u2502   \u251C\u2500\u2500 images_metadata.json
\u2502   \u2514\u2500\u2500 layerdb
\u2502       \u2514\u2500\u2500 sha256
\u2514\u2500\u2500 tmp

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7B2C\u4E8C\u5C42-data-cluster" tabindex="-1"><a class="header-anchor" href="#\u7B2C\u4E8C\u5C42-data-cluster" aria-hidden="true">#</a> \u7B2C\u4E8C\u5C42 data - cluster</h2><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u8BB0\u5F55\uFF0Cdata \u7684cluster \u4E2D\u7684 rootfs \u76EE\u5F55\u53EF\u4EE5\u8BF4\u5C31\u662F CloudRootfs \u8FD0\u884C kubernetes \u96C6\u7FA4\u6240\u9700\u7684\u6240\u6709\u6587\u4EF6\u3002</p></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z my-cluster<span class="token punctuation">]</span><span class="token comment"># tree -L 2</span>
<span class="token builtin class-name">.</span>
\u251C\u2500\u2500 admin.conf
\u251C\u2500\u2500 certs
\u2502   \u251C\u2500\u2500 sea.hub.crt
\u2502   \u2514\u2500\u2500 sea.hub.key
\u251C\u2500\u2500 controller-manager.conf
\u251C\u2500\u2500 kubelet.conf
\u251C\u2500\u2500 pki
\u2502   \u251C\u2500\u2500 apiserver.crt
\u2502   \u251C\u2500\u2500 apiserver-etcd-client.crt
\u2502   \u251C\u2500\u2500 apiserver-etcd-client.key
\u2502   \u251C\u2500\u2500 apiserver.key
\u2502   \u251C\u2500\u2500 apiserver-kubelet-client.crt
\u2502   \u251C\u2500\u2500 apiserver-kubelet-client.key
\u2502   \u251C\u2500\u2500 ca.crt
\u2502   \u251C\u2500\u2500 ca.key
\u2502   \u251C\u2500\u2500 etcd
\u2502   \u251C\u2500\u2500 front-proxy-ca.crt
\u2502   \u251C\u2500\u2500 front-proxy-ca.key
\u2502   \u251C\u2500\u2500 front-proxy-client.crt
\u2502   \u251C\u2500\u2500 front-proxy-client.key
\u2502   \u251C\u2500\u2500 sa.key
\u2502   \u2514\u2500\u2500 sa.pub
\u251C\u2500\u2500 rootfs
\u2502   \u251C\u2500\u2500 bin
\u2502   \u251C\u2500\u2500 certs
\u2502   \u251C\u2500\u2500 cri
\u2502   \u251C\u2500\u2500 etc
\u2502   \u251C\u2500\u2500 images
\u2502   \u251C\u2500\u2500 Kubefile
\u2502   \u251C\u2500\u2500 manifests
\u2502   \u251C\u2500\u2500 Metadata
\u2502   \u251C\u2500\u2500 README.md
\u2502   \u251C\u2500\u2500 registry
\u2502   \u251C\u2500\u2500 scripts
\u2502   \u2514\u2500\u2500 statics
\u2514\u2500\u2500 scheduler.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="11.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="13.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,11),L=e("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),V={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},z=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),A=e(")"),M=e("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),N={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},B=e("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function R(D,I){const a=i("ExternalLinkIcon"),l=i("RouterLink");return c(),d("div",null,[n("ul",null,[n("li",null,[n("a",v,[p,s(a)])])]),b,m,h,n("blockquote",null,[n("p",null,[k,n("a",_,[f,s(a)]),g,n("a",y,[x,s(a)]),w,n("a",E,[C,s(a)])])]),Z,n("ul",null,[n("li",null,[n("p",null,[s(l,{to:"/"},{default:r(()=>[L]),_:1})])]),n("li",null,[n("p",null,[n("a",V,[z,s(a)]),A])]),n("li",null,[n("p",null,[M,n("a",N,[B,s(a)])])])])])}const T=t(u,[["render",R],["__file","12.html.vue"]]);export{T as default};
