import{_ as i,r as c,o as d,c as r,a as e,b as n,w as a,e as s,d as l}from"./app.9772cc17.js";const p={},u=e("h1",{id:"k8s\u4ECB\u7ECD",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#k8s\u4ECB\u7ECD","aria-hidden":"true"},"#"),s(" k8s\u4ECB\u7ECD")],-1),h={class:"table-of-contents"},_=s("\u4ECB\u7ECD"),k=s("dockerfile"),m=s("run\u547D\u4EE4"),b=s("\u53C2\u8003"),g=e("p",null,"[toc]",-1),v=e("h2",{id:"\u4ECB\u7ECD",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u4ECB\u7ECD","aria-hidden":"true"},"#"),s(" \u4ECB\u7ECD")],-1),f={href:"http://kubernetes.io/",target:"_blank",rel:"noopener noreferrer"},x=s("Kubernetes"),N=s("\u662FGoogle\u57FA\u4E8EBorg\u5F00\u6E90\u7684\u5BB9\u5668\u7F16\u6392\u8C03\u5EA6\u5F15\u64CE\uFF0C\u4F5C\u4E3A"),R={href:"http://cncf.io/",target:"_blank",rel:"noopener noreferrer"},w=s("CNCF"),U=s("\uFF08Cloud Native Computing Foundation\uFF09\u6700\u91CD\u8981\u7684\u7EC4\u4EF6\u4E4B\u4E00\uFF0C\u5B83\u7684\u76EE\u6807\u4E0D\u4EC5\u4EC5\u662F\u4E00\u4E2A\u7F16\u6392\u7CFB\u7EDF\uFF0C\u800C\u662F\u63D0\u4F9B\u4E00\u4E2A\u89C4\u8303\uFF0C\u53EF\u4EE5\u8BA9\u4F60\u6765\u63CF\u8FF0\u96C6\u7FA4\u7684\u67B6\u6784\uFF0C\u5B9A\u4E49\u670D\u52A1\u7684\u6700\u7EC8\u72B6\u6001\uFF0C"),q=e("code",null,"Kubernetes",-1),C=s(" \u53EF\u4EE5\u5E2E\u4F60\u5C06\u7CFB\u7EDF\u81EA\u52A8\u5730\u8FBE\u5230\u548C\u7EF4\u6301\u5728\u8FD9\u4E2A\u72B6\u6001\u3002"),y=e("code",null,"Kubernetes",-1),S=s(" \u4F5C\u4E3A\u4E91\u539F\u751F\u5E94\u7528\u7684\u57FA\u77F3\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u4E91\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u5176\u91CD\u8981\u6027\u4E0D\u8A00\u800C\u55BB\u3002"),D={class:"custom-container tip"},F=e("p",{class:"custom-container-title"},"sealos \u662F\u4EC0\u4E48",-1),K={href:"https://www.sealos.io/zh-Hans/docs/Intro",target:"_blank",rel:"noopener noreferrer"},I=s("sealos"),O=s(" \u662F\u4EE5 kubernetes \u4E3A\u5185\u6838\u7684\u4E91\u64CD\u4F5C\u7CFB\u7EDF\u53D1\u884C\u7248"),M=e("p",null,'\u65E9\u671F\u5355\u673A\u64CD\u4F5C\u7CFB\u7EDF\u4E5F\u662F\u5206\u5C42\u67B6\u6784\uFF0C\u540E\u6765\u624D\u6F14\u53D8\u6210 linux windows \u8FD9\u79CD\u5185\u6838\u67B6\u6784\uFF0C\u4E91\u64CD\u4F5C\u7CFB\u7EDF\u4ECE\u5BB9\u5668\u8BDE\u751F\u4E4B\u65E5\u8D77\u5206\u5C42\u67B6\u6784\u88AB\u51FB\u7A7F\uFF0C\u672A\u6765\u4E5F\u4F1A\u671D\u7740\u9AD8\u5185\u805A\u7684"\u4E91\u5185\u6838"\u67B6\u6784\u8FC1\u79FB',-1),z=e("p",null,[e("img",{src:"http://sm.nsddd.top/smimage-20221017222736688.png",alt:"image-20221017222736688"})],-1),B=e("ul",null,[e("li",null,'\u4ECE\u73B0\u5728\u5F00\u59CB\uFF0C\u628A\u4F60\u6570\u636E\u4E2D\u5FC3\u6240\u6709\u673A\u5668\u60F3\u8C61\u6210\u4E00\u53F0"\u62BD\u8C61"\u7684\u8D85\u7EA7\u8BA1\u7B97\u673A\uFF0Csealos \u5C31\u662F\u7528\u6765\u7BA1\u7406\u8FD9\u53F0\u8D85\u7EA7\u8BA1\u7B97\u673A\u7684\u64CD\u4F5C\u7CFB\u7EDF\uFF0Ckubernetes \u5C31\u662F\u8FD9\u4E2A\u64CD\u4F5C\u7CFB\u7EDF\u7684\u5185\u6838\uFF01'),e("li",null,"\u4E91\u8BA1\u7B97\u4ECE\u6B64\u523B\u8D77\u518D\u65E0 IaaS PaaS SaaS \u4E4B\u5206\uFF0C\u53EA\u6709\u4E91\u64CD\u4F5C\u7CFB\u7EDF\u9A71\u52A8(CSI CNI CRI \u5B9E\u73B0) \u4E91\u64CD\u4F5C\u7CFB\u7EDF\u5185\u6838(kubernetes) \u548C \u5206\u5E03\u5F0F\u5E94\u7528\u7EC4\u6210")],-1),G=l(`<blockquote><p>\u5728\u8FD9\u91CC\uFF0C\u6211\u5C06\u4F1A\u4ECEdocker\u5230k8s\u5168\u90E8\u904D\u5386\u4E00\u904D</p><ul><li><code>Docker</code> \u7684\u4E00\u4E9B\u5E38\u7528\u65B9\u6CD5\uFF0C\u5F53\u7136\u6211\u4EEC\u7684\u91CD\u70B9\u4F1A\u5728 Kubernetes \u4E0A\u9762</li><li>\u4F1A\u7528 <code>kubeadm</code> \u6765\u642D\u5EFA\u4E00\u5957 <code>Kubernetes</code> \u7684\u96C6\u7FA4</li><li>\u7406\u89E3 <code>Kubernetes</code> \u96C6\u7FA4\u7684\u8FD0\u884C\u539F\u7406</li><li>\u5E38\u7528\u7684\u4E00\u4E9B\u63A7\u5236\u5668\u4F7F\u7528\u65B9\u6CD5</li><li>\u8FD8\u6709 <code>Kubernetes</code> \u7684\u4E00\u4E9B\u8C03\u5EA6\u7B56\u7565</li><li><code>Kubernetes</code>\u7684\u8FD0\u7EF4</li><li>\u5305\u7BA1\u7406\u5DE5\u5177 <code>Helm</code> \u7684\u4F7F\u7528</li><li>\u6700\u540E\u6211\u4EEC\u4F1A\u5B9E\u73B0\u57FA\u4E8E Kubernetes \u7684 CI/CD</li></ul></blockquote><h2 id="dockerfile" tabindex="-1"><a class="header-anchor" href="#dockerfile" aria-hidden="true">#</a> dockerfile</h2><p>\u{1F4A1}\u524D\u9762\u6211\u4EEC\u90FD\u77E5\u9053\u4E86\u7528<code>commit</code>\u63D0\u4EA4\u955C\u50CF\uFF0C\u7528<code>tag</code>\u6253\u5305\u955C\u50CF\uFF0C\u4F46\u662F\u5176\u5B9E<code>commit</code>\u547D\u4EE4\u662F\u5728\u955C\u50CF\u7684\u6BCF\u4E00\u5C42\u6BCF\u4E00\u5C42\u4E0A\u9762\u8FDB\u884C\u6DFB\u52A0\u3002\u6240\u4EE5\u6B64\u65F6\u5C31\u6709\u4E86<code>dockerfile</code>\uFF0C<code>dockerfile</code>\u5C31\u662F\u4E00\u6761\u6761\u7684\u6307\u4EE4\uFF0C\u6BCF\u4E00\u6761\u6307\u4EE4\u4EE3\u8868\u7684\u4E00\u5C42\u3002</p><blockquote><p>\u53EF\u4EE5\u60F3\u8C61<code>c</code>\u8BED\u8A00\u7684<code>makefile</code>\u3001Linux\u7684<code>bash</code>\u811A\u672C</p></blockquote><p><strong>\u76EE\u5F55\u9009\u62E9\uFF1A</strong></p><p>\u5176\u5B9E\u5BF9\u4E8E\u6211\u4E2A\u4EBA\u559C\u6B22\u5728Linux\u7684\u6839\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E13\u95E8\u5B58\u653Edocker\u7684\u955C\u50CF\uFF0C\u559C\u6B22\u5728win\u7684<code>D</code>\u76D8\u6839\u76EE\u5F55\u4E0B\u521B\u5EFAdocker\u955C\u50CF</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /docker/nginx <span class="token operator">&amp;&amp;</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /docker/tomcat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>FROM\u6307\u5B9A\u955C\u50CF\uFF1A</strong></p><p><code>FROM</code>\u5C31\u662F\u6307\u5B9A\u57FA\u7840\u955C\u50CF\uFF0C\u56E0\u6B64\u4E00\u4E2A Dockerfile \u4E2D FROM \u662F\u5FC5\u5907\u7684\u6307\u4EE4\uFF0C\u5E76\u4E14\u5FC5\u987B\u662F\u7B2C\u4E00\u6761\u6307\u4EE4\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>FROM nginx
RUN <span class="token builtin class-name">echo</span> <span class="token string">&#39;&lt;h1&gt;Hello, Docker!&lt;/h1&gt;&#39;</span> <span class="token operator">&gt;</span> /usr/share/nginx/html/index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,10),L=s("\u5728"),H={href:"https://store.docker.com/",target:"_blank",rel:"noopener noreferrer"},V=s("Docker Store"),E=s("\u4E0A\u6709\u975E\u5E38\u591A\u7684\u9AD8\u8D28\u91CF\u7684\u5B98\u65B9\u955C\u50CF\uFF0C\u6709\u53EF\u4EE5\u76F4\u63A5\u62FF\u6765\u4F7F\u7528\u7684\u670D\u52A1\u7C7B\u7684\u955C\u50CF\uFF0C\u5982 nginx\u3001redis\u3001mongo\u3001mysql\u3001httpd\u3001php\u3001tomcat \u7B49\uFF1B\u4E5F\u6709\u4E00\u4E9B\u65B9\u4FBF\u5F00\u53D1\u3001\u6784\u5EFA\u3001\u8FD0\u884C\u5404\u79CD\u8BED\u8A00\u5E94\u7528\u7684\u955C\u50CF\uFF0C\u5982 node\u3001openjdk\u3001python\u3001ruby\u3001golang \u7B49\u3002\u53EF\u4EE5\u5728\u5176\u4E2D\u5BFB\u627E\u4E00\u4E2A\u6700\u7B26\u5408\u6211\u4EEC\u6700\u7EC8\u76EE\u6807\u7684\u955C\u50CF\u4E3A\u57FA\u7840\u955C\u50CF\u8FDB\u884C\u5B9A\u5236\u3002"),j=e("blockquote",null,[e("p",null,[s("\u9664\u4E86\u9009\u62E9\u73B0\u6709\u955C\u50CF\u4E3A\u57FA\u7840\u955C\u50CF\u5916\uFF0CDocker \u8FD8\u5B58\u5728\u4E00\u4E2A\u7279\u6B8A\u7684\u955C\u50CF\uFF0C\u540D\u4E3A"),e("code",null,"scratch"),s("\u3002\u8FD9\u4E2A\u955C\u50CF\u662F\u865A\u62DF\u7684\u6982\u5FF5\uFF0C\u5E76\u4E0D\u5B9E\u9645\u5B58\u5728\uFF0C\u5B83\u8868\u793A\u4E00\u4E2A\u7A7A\u767D\u7684\u955C\u50CF\u3002")]),e("p",null,[e("strong",null,"\u26A0\uFE0F\u5176\u5B9E\u8FD9\u4E00\u70B9\u6211\u5F88\u7591\u60D1\u7684\uFF0C\u5C31\u662F\u521B\u5EFA\u4E00\u4E2A\u7A7A\u767D\u7684\u955C\u50CF\u540E\u9762\u8BE5\u600E\u4E48\u6837\u8FD0\u884C\u5462")])],-1),A={class:"custom-container tip"},P=e("p",{class:"custom-container-title"},"scratch\u7A7A\u767D\u955C\u50CF",-1),T=e("p",null,[s("\u5982\u679C\u4F60\u4EE5"),e("code",null,"scratch"),s("\u4E3A\u57FA\u7840\u955C\u50CF\u7684\u8BDD\uFF0C\u610F\u5473\u7740\u4F60\u4E0D\u4EE5\u4EFB\u4F55\u955C\u50CF\u4E3A\u57FA\u7840\uFF0C\u63A5\u4E0B\u6765\u6240\u5199\u7684\u6307\u4EE4\u5C06\u4F5C\u4E3A\u955C\u50CF\u7B2C\u4E00\u5C42\u5F00\u59CB\u5B58\u5728\u3002\u6CA1\u6709\u4EFB\u4F55\u57FA\u7840\u955C\u50CF\uFF0C\u6211\u600E\u4E48\u53BB\u6267\u884C\u6211\u7684\u7A0B\u5E8F\u5462\uFF0C\u5176\u5B9E\u5BF9\u4E8E Linux \u4E0B\u9759\u6001\u7F16\u8BD1\u7684\u7A0B\u5E8F\u6765\u8BF4\uFF0C\u5E76\u4E0D\u9700\u8981\u6709\u64CD\u4F5C\u7CFB\u7EDF\u63D0\u4F9B\u8FD0\u884C\u65F6\u652F\u6301\uFF0C\u6240\u9700\u7684\u4E00\u5207\u5E93\u90FD\u5DF2\u7ECF\u5728\u53EF\u6267\u884C\u6587\u4EF6\u91CC\u4E86\uFF0C\u56E0\u6B64\u76F4\u63A5"),e("code",null,"FROM scratch"),s("\u4F1A\u8BA9\u955C\u50CF\u4F53\u79EF\u66F4\u52A0\u5C0F\u5DE7\u3002\u4F7F\u7528 Go \u8BED\u8A00 \u5F00\u53D1\u7684\u5E94\u7528\u5F88\u591A\u4F1A\u4F7F\u7528\u8FD9\u79CD\u65B9\u5F0F\u6765\u5236\u4F5C\u955C\u50CF\uFF0C\u8FD9\u4E5F\u662F\u4E3A\u4EC0\u4E48\u6709\u4EBA\u8BA4\u4E3A Go \u662F\u7279\u522B\u9002\u5408\u5BB9\u5668\u5FAE\u670D\u52A1\u67B6\u6784\u7684\u8BED\u8A00\u7684\u539F\u56E0\u4E4B\u4E00\u3002")],-1),J=s("[x] "),Q={href:"https://go.nsddd.top",target:"_blank",rel:"noopener noreferrer"},W=s("Go\u8BED\u8A00\u7684\u5B66\u4E60\uFF08CUB\u6253\u9020\u7684Go\u8BED\u8A00\u5B66\u4E60docs\uFF09"),X=l(`<h2 id="run\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#run\u547D\u4EE4" aria-hidden="true">#</a> run\u547D\u4EE4</h2><p><code>RUN</code>\u6307\u4EE4\u662F\u7528\u6765\u6267\u884C\u547D\u4EE4\u884C\u547D\u4EE4\u7684\u3002\u7531\u4E8E\u547D\u4EE4\u884C\u7684\u5F3A\u5927\u80FD\u529B\uFF0C<code>RUN</code>\u6307\u4EE4\u5728\u5B9A\u5236\u955C\u50CF\u65F6\u662F\u6700\u5E38\u7528\u7684\u6307\u4EE4\u4E4B\u4E00\u3002\u5176\u683C\u5F0F\u6709\u4E24\u79CD\uFF1A</p><ul><li><p><code>shell</code> \u683C\u5F0F\uFF1ARUN &lt;\u547D\u4EE4&gt;\uFF0C\u5C31\u50CF\u76F4\u63A5\u5728\u547D\u4EE4\u884C\u4E2D\u8F93\u5165\u7684\u547D\u4EE4\u4E00\u6837\u3002\u521A\u624D\u5199\u7684 Dockerfile \u4E2D\u7684 RUN \u6307\u4EE4\u5C31\u662F\u8FD9\u79CD\u683C\u5F0F\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>RUN <span class="token builtin class-name">echo</span> <span class="token string">&#39;&lt;h1&gt;Hello, Docker!&lt;/h1&gt;&#39;</span> <span class="token operator">&gt;</span> /usr/share/nginx/html/index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p><code>exec</code> \u683C\u5F0F\uFF1ARUN [&quot;\u53EF\u6267\u884C\u6587\u4EF6&quot;, &quot;\u53C2\u65701&quot;, &quot;\u53C2\u65702&quot;]\uFF0C\u8FD9\u66F4\u50CF\u662F\u51FD\u6570\u8C03\u7528\u4E2D\u7684\u683C\u5F0F\u3002 \u65E2\u7136 RUN \u5C31\u50CF Shell \u811A\u672C\u4E00\u6837\u53EF\u4EE5\u6267\u884C\u547D\u4EE4\uFF0C\u90A3\u4E48\u6211\u4EEC\u662F\u5426\u5C31\u53EF\u4EE5\u50CF Shell \u811A\u672C\u4E00\u6837\u628A\u6BCF\u4E2A\u547D\u4EE4\u5BF9\u5E94\u4E00\u4E2A RUN \u5462\uFF1F\u6BD4\u5982\u8FD9\u6837\uFF1A</p><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> debian:jessie</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get update</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get install -y gcc libc6-dev make</span>
<span class="token instruction"><span class="token keyword">RUN</span> wget -O redis.tar.gz <span class="token string">&quot;http://download.redis.io/releases/redis-3.2.5.tar.gz&quot;</span></span>
<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /usr/src/redis</span>
<span class="token instruction"><span class="token keyword">RUN</span> tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1</span>
<span class="token instruction"><span class="token keyword">RUN</span> make -C /usr/src/redis</span>
<span class="token instruction"><span class="token keyword">RUN</span> make -C /usr/src/redis install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><p>\u4E4B\u524D\u8BF4\u8FC7\uFF0CDockerfile \u4E2D\u6BCF\u4E00\u4E2A\u6307\u4EE4\u90FD\u4F1A\u5EFA\u7ACB\u4E00\u5C42\uFF0CRUN \u4E5F\u4E0D\u4F8B\u5916\u3002\u6BCF\u4E00\u4E2A RUN \u7684\u884C\u4E3A\uFF0C\u5C31\u548C\u521A\u624D\u6211\u4EEC\u624B\u5DE5\u5EFA\u7ACB\u955C\u50CF\u7684\u8FC7\u7A0B\u4E00\u6837\uFF1A\u65B0\u5EFA\u7ACB\u4E00\u5C42\uFF0C\u5728\u5176\u4E0A\u6267\u884C\u8FD9\u4E9B\u547D\u4EE4\uFF0C\u6267\u884C\u7ED3\u675F\u540E\uFF0Ccommit \u8FD9\u4E00\u5C42\u7684\u4FEE\u6539\uFF0C\u6784\u6210\u65B0\u7684\u955C\u50CF\u3002</p><blockquote><p><code>Union FS</code> \u662F\u6709\u6700\u5927\u5C42\u6570\u9650\u5236\u7684\uFF0C\u6BD4\u5982 <code>AUFS</code>\uFF0C\u66FE\u7ECF\u662F\u6700\u5927\u4E0D\u5F97\u8D85\u8FC7 42 \u5C42\uFF0C\u73B0\u5728\u662F\u4E0D\u5F97\u8D85\u8FC7 127 \u5C42\u3002</p></blockquote><h2 id="\u53C2\u8003" tabindex="-1"><a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a> \u53C2\u8003</h2><p>https://www.qikqiak.com/k8s-book/</p>`,7);function Y(Z,$){const t=c("router-link"),o=c("ExternalLinkIcon");return d(),r("div",null,[u,e("nav",h,[e("ul",null,[e("li",null,[n(t,{to:"#\u4ECB\u7ECD"},{default:a(()=>[_]),_:1})]),e("li",null,[n(t,{to:"#dockerfile"},{default:a(()=>[k]),_:1})]),e("li",null,[n(t,{to:"#run\u547D\u4EE4"},{default:a(()=>[m]),_:1})]),e("li",null,[n(t,{to:"#\u53C2\u8003"},{default:a(()=>[b]),_:1})])])]),g,v,e("p",null,[e("a",f,[x,n(o)]),N,e("a",R,[w,n(o)]),U,q,C,y,S]),e("div",D,[F,e("p",null,[e("strong",null,[e("a",K,[I,n(o)]),O])]),M,z,B]),G,e("p",null,[L,e("a",H,[V,n(o)]),E]),j,e("div",A,[P,T,e("ul",null,[e("li",null,[J,e("a",Q,[W,n(o)])])])]),X])}const se=i(p,[["render",Y],["__file","k8s_011.html.vue"]]);export{se as default};
