import{_ as o,r as t,o as r,c,a as n,b as a,d as e,e as l}from"./app.942c9a5d.js";const i={},p=n("h1",{id:"docker\u5B89\u88C5",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#docker\u5B89\u88C5","aria-hidden":"true"},"#"),e(" docker\u5B89\u88C5")],-1),d=n("p",null,"[toc]",-1),u=n("h2",{id:"\u5B89\u88C5docker",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5B89\u88C5docker","aria-hidden":"true"},"#"),e(" \u5B89\u88C5docker")],-1),k=e("[x] "),h={href:"https://hub.docker.com/",target:"_blank",rel:"noopener noreferrer"},_=e("docker\u955C\u50CF\u4ED3\u5E93"),m=e("[x] "),g={href:"https://docs.docker.com/",target:"_blank",rel:"noopener noreferrer"},b=e("docker\u5B98\u7F51\u6587\u6863"),v=l(`<hr><p><strong>docker\u4F9D\u8D56\u4E8ELinux\u5185\u6838\uFF0C\u56E0\u6B64\u5176\u5B83\u7CFB\u7EDF\u8981\u90E8\u7F72\u5FC5\u987B\u8981\u5B89\u88C5\u4E00\u4E2A\u865A\u62DFLinux\u73AF\u5883</strong></p><p><strong>\u6CE8\u610F\u7248\u672C\u3002\u67E5\u770B\u5F53\u524Dlinux\u7684\u5185\u6838\u7248\u672C\u53F7</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/hyerledgerFabric/fabric-samples/first-network# uname -r
5.13.0-40-generic
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker\u7684\u57FA\u672C\u7EC4\u6210" tabindex="-1"><a class="header-anchor" href="#docker\u7684\u57FA\u672C\u7EC4\u6210" aria-hidden="true">#</a> docker\u7684\u57FA\u672C\u7EC4\u6210</h2><ul><li><strong>\u955C\u50CF\uFF08image)</strong></li><li><strong>\u5BB9\u5668\uFF08container)</strong></li><li><strong>\u4ED3\u5E93\uFF08repository\uFF09</strong></li></ul><div class="language-java ext-java line-numbers-mode"><pre class="language-java"><code>java
<span class="token class-name">Book</span> b1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Book</span> b2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Book</span> b3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Book</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>\u955C\u50CF\u5C31\u662F\u4E0A\u9762\u7684Book\uFF0Cjava\u53EB\u7C7B\u6A21\u677F</li><li>\u5BB9\u5668\u5C31\u662Fnew Book()\u662F\u7ECF\u8FC7\u540C\u4E00\u4EFD\u955C\u50CFnew\u51FA\u7684\u4E0D\u540C\u5B9E\u4F8B\u5BF9\u8C61</li><li>\u4ED3\u5E93\u662F\u96C6\u4E2D\u5B58\u653E\u955C\u50CF\u7684\u5730\u65B9\uFF0C\u5728hub.docker.com\u4E2D\u6709\u5F88\u591A\u955C\u50CF</li></ol><blockquote><ul><li><p>\u5373\u4E00\u4E2A\u955C\u50CF\u53EF\u4EE5\u521B\u5EFA\u51FA\u5F88\u591A\u4E2Adocker\u5BB9\u5668</p></li><li><p>\u955C\u50CF\u76F8\u5F53\u4E8Eroot\u6587\u4EF6\u7CFB\u7EDF</p></li><li><p>\u53EF\u4EE5\u628A\u5BB9\u5668\u60F3\u8C61\u4E3A\u4E00\u4E2A\u7B80\u6613\u7248\u7684linux\u73AF\u5883\uFF08\u5305\u62EC\u7528\u6237\u6743\u9650\u3001\u8FDB\u7A0B\u7A7A\u95F4\u3001\u7528\u6237\u7A7A\u95F4\u548C\u7F51\u7EDC\u7A7A\u95F4\uFF09\u548C\u8FD0\u884C\u5728\u5176\u4E2D\u7684\u5E94\u7528\u7A0B\u5E8F</p></li></ul></blockquote><p><img src="https://s2.loli.net/2022/05/08/jM4BQrA2tPp5NDo.png" alt="image-20220508140536297"><strong>officaial image\u662F\u5B98\u65B9\u7684\u955C\u50CF</strong></p><blockquote><p>\u7C7B\u4F3C\u4E8Egithub\uFF0C\u6709\u516C\u5F00\u4ED3\u5E93\uFF08public\uFF09\u548C\u79C1\u6709\uFF08private\uFF09\u4E24\u79CD\u5F62\u5F0F</p></blockquote><p>\u6700\u5927\u7684\u516C\u5F00\u4ED3\u5E93\u662F<strong>docker hub(https://hub.docker.com)</strong></p><p>\u56FD\u5185\u4E5F\u6709\u516C\u5F00\u4ED3\u5E93\u5982\u963F\u91CC\u4E91\u3001\u7F51\u6613\u4E91\u3002</p><p><strong>\u6211\u4EEC\u53EF\u4EE5\u628A\u955C\u50CF\u53D1\u5E03\u5230\u4ED3\u5E93\u4E2D\uFF0C\u9700\u8981\u7684\u65F6\u5019\u518D\u4ECE\u4ED3\u5E93\u4E2D\u62C9\u53D6\u5C31\u53EF\u4EE5\u4E86</strong></p>`,14);function x(f,B){const s=t("ExternalLinkIcon");return r(),c("div",null,[p,d,u,n("ul",null,[n("li",null,[n("p",null,[k,n("a",h,[_,a(s)])])]),n("li",null,[n("p",null,[m,n("a",g,[b,a(s)])])])]),v])}const j=o(i,[["render",x],["__file","4.html.vue"]]);export{j as default};
