import{_ as r,r as n,o as s,c as l,a as t,b as a,e as c,d as e}from"./app.864491b6.js";const i={},d=c('<h1 id="\u6DF1\u5165\u7406\u89E3\u955C\u50CF\u5E95\u5C42" tabindex="-1"><a class="header-anchor" href="#\u6DF1\u5165\u7406\u89E3\u955C\u50CF\u5E95\u5C42" aria-hidden="true">#</a> \u6DF1\u5165\u7406\u89E3\u955C\u50CF\u5E95\u5C42</h1><h2 id="\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#\u955C\u50CF" aria-hidden="true">#</a> \u955C\u50CF</h2><p><strong>\u955C\u50CF\u662F\u4E00\u79CD\u8F7B\u91CF\u7EA7\u3001\u53EF\u6267\u884C\u7684\u72EC\u7ACB\u8F6F\u4EF6\u5305\uFF0C\u5305\u542B\u8FD0\u884C\u67D0\u4E2A\u8F6F\u4EF6\u6240\u9700\u8981\u7684\u6240\u6709\u5185\u5BB9\uFF0C\u6211\u4EEC\u628A\u5E94\u7528\u7A0B\u5E8F\u548C\u914D\u7F6E\u4F9D\u8D56\u6253\u5305\u6210\u4E00\u4E2A\u53EF\u4EE5\u4EA4\u4ED8\u7684\u8FD0\u884C\u73AF\u5883\uFF0C\u8FD9\u4E2A\u6253\u5305\u597D\u7684\u8FD0\u884C\u73AF\u5883\u5C31\u53EB\u505AImage\u955C\u50CF</strong></p><p><strong>\u53EA\u6709\u901A\u8FC7\u955C\u50CF\u6587\u4EF6\u624D\u80FD\u751F\u6210docker\u5BB9\u5668\u5B9E\u4F8B</strong></p><blockquote><p>\u6211\u4EEC\u5728\u4F7F\u7528pull\u7684\u65F6\u5019\uFF0C\u5728\u4E0B\u8F7D\u7684\u65F6\u5019\u53EF\u4EE5\u770B\u5230docker\u7684\u955C\u50CF\u597D\u50CF\u662F\u4E00\u5C42\u5C42\u7684\u4E0B\u8F7D</p></blockquote><p><img src="https://s2.loli.net/2022/05/09/YbVFK5hG9pImyH3.png" alt="image-20220509215720680"></p><p><strong>==\u6240\u4EE5\u8BF4\u955C\u50CF\u662F\u5206\u5C42\u7684==</strong></p><h2 id="unionfs-\u8054\u5408\u6587\u4EF6\u7CFB\u7EDF" tabindex="-1"><a class="header-anchor" href="#unionfs-\u8054\u5408\u6587\u4EF6\u7CFB\u7EDF" aria-hidden="true">#</a> UnionFS(\u8054\u5408\u6587\u4EF6\u7CFB\u7EDF)</h2><p><strong>\u8054\u5408\u6587\u4EF6\u7CFB\u7EDF\u662F\u4E00\u79CD\u5206\u5C42\u3001\u8F7B\u91CF\u7EA7\u5E76\u4E14\u9AD8\u6027\u80FD\u7684\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u5B83\u652F\u6301\u5BF9\u6587\u4EF6\u7684\u4FEE\u6539\u64CD\u4F5C\u6765\u4E3A\u4E00\u6B21\u63D0\u4EA4\u6765\u4E00\u5C42\u5C42\u7684\u53E0\u52A0</strong></p><p><strong>Union\u6587\u4EF6\u7CFB\u7EDF\u662Fdocker\u955C\u50CF\u7684\u57FA\u7840\uFF0C\u955C\u50CF\u53EF\u4EE5\u901A\u8FC7\u5206\u5C42\u6765\u8FDB\u884C\u7EE7\u627F\uFF0C\u57FA\u4E8E\u57FA\u7840\u955C\u50CF\uFF08\u6CA1\u6709\u7236\u955C\u50CF\uFF09\uFF0C\u53EF\u4EE5\u5236\u4F5C\u51FA\u5404\u79CD\u5177\u4F53\u7684\u5E94\u7528\u955C\u50CF</strong></p><hr><h2 id="\u7279\u6027" tabindex="-1"><a class="header-anchor" href="#\u7279\u6027" aria-hidden="true">#</a> <strong>\u7279\u6027\uFF1A</strong></h2><p><strong>\u4E00\u6B21\u6027\u540C\u65F6\u52A0\u8F7D\u591A\u4E2A\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u4F46\u662F\u4ECE\u5916\u9762\u770B\u8D77\u6765\uFF0C\u53EA\u80FD\u770B\u5230\u4E00\u4E2A\u6587\u4EF6\u7CFB\u7EDF\u3002\u8054\u5408\u52A0\u8F7D\u4F1A\u628A\u5404\u5C42\u6587\u4EF6\u7CFB\u7EDF\u53E0\u52A0\u8D77\u6765\uFF0C\u8FD9\u6837\u6700\u7EC8\u7684\u6587\u4EF6\u7CFB\u7EDF\u4F1A\u5305\u542B\u6240\u6709\u5E95\u5C42\u7684\u6587\u4EF6\u548C\u76EE\u5F55</strong></p><blockquote><p>\u6240\u4EE5docker\u542F\u52A8\u975E\u5E38\u5FEB\u662F\u6709\u539F\u56E0\u7684\uFF0C\u5B83\u662F\u7531\u4E00\u5C42\u5C42\u7684\u6587\u4EF6\u7CFB\u7EDF\u7EC4\u6210\u7684\u8054\u5408\u6587\u4EF6\u7CFB\u7EDF</p></blockquote><p><strong>bootfs\uFF08boot file system\u5F15\u5BFC\u6587\u4EF6\u7CFB\u7EDF)\u4E3B\u8981\u5305\u542Bbootloader\u548Ckernel,kernel\uFF0Cbootloader\u4E3B\u8981\u662F\u5F15\u5BFC\u52A0\u8F7Dkernel,linux\u521A\u542F\u52A8\u65F6\u4F1A\u52A0\u8F7Dbootfs\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u5728docker\u955C\u50CF\u6700\u5E95\u5C42\u5C31\u662F\u5F15\u5BFC\u6587\u4EF6\u7CFB\u7EDFbootfs\u3002</strong></p><p><strong>\u5728bootfs\u4E4B\u4E0A\uFF0C\u5305\u542B\u7684\u5C31\u662F\u5178\u578B\u7684linux\u7CFB\u7EDF\u4E2D\u7684/dev./proc,/bin,/etc\u7B49\u6807\u51C6\u6587\u4EF6\u548C\u76EE\u5F55</strong></p><p><strong>rootfs\u5C31\u662F\u5404\u79CD\u4E0D\u540C\u7684\u64CD\u4F5C\u7CFB\u7EDF\u53D1\u884C\u7248</strong></p><hr><blockquote><p>\u6211\u4EEC\u53EA\u662F\u5305\u542B\u4E86\u6700\u5C0F\u7684\u5BB9\u91CF\uFF0C\u6240\u4EE5\u5185\u5B58\u5C0F\uFF0C\u53EA\u9700\u8981\u5305\u542B\u57FA\u672C\u7684\u547D\u4EE4\u548C\u51FD\u6570\u5E93\uFF0C\u6240\u4EE5\u4E0B\u8F7D\u7684Ubuntu\u5F88\u5C0F\uFF0C\u6240\u4EE5\u5F88\u591A\u547D\u4EE4\u90FD\u6CA1\u6709</p></blockquote><p><strong>\u955C\u50CF\u5206\u5C42\u7684\u597D\u5904\u5C31\u662F\u8D44\u6E90\u5171\u4EAB\uFF0C\u65B9\u4FBF\u590D\u5236\u8FC1\u79FB\uFF0C\u5C31\u662F\u4E3A\u4E86==\u590D\u7528==</strong></p><p><strong>\u6BD4\u5982\u8BF4\u6709\u591A\u4E2A\u955C\u50CF\u4ECE\u76F8\u540C\u7684base\u955C\u50CF\u6784\u5EFA\u800C\u6765\uFF0C\u90A3\u4E48docker host\u53EA\u9700\u8981\u5728\u78C1\u76D8\u4E2D\u4FDD\u5B58\u4E00\u4EFDbase\u955C\u50CF</strong></p><p><strong>\u540C\u65F6\u5185\u5B58\u4E2D\u4E5F\u53EA\u9700\u8981\u52A0\u8F7D\u4E00\u4EFDbase\u955C\u50CF\uFF0C\u5C31\u53EF\u4EE5\u4E3A\u6240\u6709\u5BB9\u5668\u670D\u52A1\u4E86\uFF0C\u800C\u4E14\u955C\u50CF\u7684\u6BCF\u4E00\u5C42\u90FD\u53EF\u4EE5\u88AB\u5171\u4EAB\u3002</strong></p><h2 id="\u91CD\u70B9\u7406\u89E3" tabindex="-1"><a class="header-anchor" href="#\u91CD\u70B9\u7406\u89E3" aria-hidden="true">#</a> \u91CD\u70B9\u7406\u89E3</h2><p><strong>1. docker\u955C\u50CF\u5C42\u662F\u53EA\u8BFB\u7684\uFF0C\u5BB9\u5668\u5C42\u662F\u53EF\u4EE5\u5199\u7684</strong></p><p><strong>2. \u5F53\u5BB9\u5668\u542F\u52A8\u65F6\uFF0C\u4E00\u4E2A\u65B0\u7684\u53EF\u5199\u5C42\u88AB\u52A0\u8F7D\u5230\u955C\u50CF\u7684\u9876\u90E8\u3002\u8FD9\u4E00\u5C42\u901A\u5E38\u88AB\u79F0\u4F5C\u201C\u5BB9\u5668\u5C42\u201D\uFF0C\u201C\u5BB9\u5668\u5C42\u201D\u4E4B\u4E0B\u7684\u90FD\u53EB\u201C\u955C\u50CF\u5C42\u201D\u3002</strong></p><h2 id="docker-\u67B6\u6784" tabindex="-1"><a class="header-anchor" href="#docker-\u67B6\u6784" aria-hidden="true">#</a> Docker \u67B6\u6784</h2><p>Docker \u5305\u62EC\u4E09\u4E2A\u57FA\u672C\u6982\u5FF5:</p><ul><li><strong>\u955C\u50CF\uFF08Image\uFF09</strong>\uFF1ADocker \u955C\u50CF\uFF08Image\uFF09\uFF0C\u5C31\u76F8\u5F53\u4E8E\u662F\u4E00\u4E2A root \u6587\u4EF6\u7CFB\u7EDF\u3002\u6BD4\u5982\u5B98\u65B9\u955C\u50CF ubuntu:16.04 \u5C31\u5305\u542B\u4E86\u5B8C\u6574\u7684\u4E00\u5957 Ubuntu16.04 \u6700\u5C0F\u7CFB\u7EDF\u7684 root \u6587\u4EF6\u7CFB\u7EDF\u3002</li><li><strong>\u5BB9\u5668\uFF08Container\uFF09</strong>\uFF1A\u955C\u50CF\uFF08Image\uFF09\u548C\u5BB9\u5668\uFF08Container\uFF09\u7684\u5173\u7CFB\uFF0C\u5C31\u50CF\u662F\u9762\u5411\u5BF9\u8C61\u7A0B\u5E8F\u8BBE\u8BA1\u4E2D\u7684\u7C7B\u548C\u5B9E\u4F8B\u4E00\u6837\uFF0C\u955C\u50CF\u662F\u9759\u6001\u7684\u5B9A\u4E49\uFF0C\u5BB9\u5668\u662F\u955C\u50CF\u8FD0\u884C\u65F6\u7684\u5B9E\u4F53\u3002\u5BB9\u5668\u53EF\u4EE5\u88AB\u521B\u5EFA\u3001\u542F\u52A8\u3001\u505C\u6B62\u3001\u5220\u9664\u3001\u6682\u505C\u7B49\u3002</li><li><strong>\u4ED3\u5E93\uFF08Repository\uFF09</strong>\uFF1A\u4ED3\u5E93\u53EF\u770B\u6210\u4E00\u4E2A\u4EE3\u7801\u63A7\u5236\u4E2D\u5FC3\uFF0C\u7528\u6765\u4FDD\u5B58\u955C\u50CF\u3002</li></ul><p>Docker \u4F7F\u7528\u5BA2\u6237\u7AEF-\u670D\u52A1\u5668 (C/S) \u67B6\u6784\u6A21\u5F0F\uFF0C\u4F7F\u7528\u8FDC\u7A0BAPI\u6765\u7BA1\u7406\u548C\u521B\u5EFADocker\u5BB9\u5668\u3002</p><p>Docker \u5BB9\u5668\u901A\u8FC7 Docker \u955C\u50CF\u6765\u521B\u5EFA\u3002</p><p>\u5BB9\u5668\u4E0E\u955C\u50CF\u7684\u5173\u7CFB\u7C7B\u4F3C\u4E8E\u9762\u5411\u5BF9\u8C61\u7F16\u7A0B\u4E2D\u7684\u5BF9\u8C61\u4E0E\u7C7B\u3002</p><table><thead><tr><th style="text-align:left;">Docker</th><th style="text-align:left;">\u9762\u5411\u5BF9\u8C61</th></tr></thead><tbody><tr><td style="text-align:left;">\u5BB9\u5668</td><td style="text-align:left;">\u5BF9\u8C61</td></tr><tr><td style="text-align:left;">\u955C\u50CF</td><td style="text-align:left;">\u7C7B</td></tr></tbody></table><p><img src="https://s2.loli.net/2022/05/09/Exyomt4GJgAre3k.png" alt="img"></p>',33),h=t("thead",null,[t("tr",null,[t("th",{style:{"text-align":"left"}},"\u6982\u5FF5"),t("th",{style:{"text-align":"left"}},"\u8BF4\u660E")])],-1),g=t("tr",null,[t("td",{style:{"text-align":"left"}},"Docker \u955C\u50CF(Images)"),t("td",{style:{"text-align":"left"}},"Docker \u955C\u50CF\u662F\u7528\u4E8E\u521B\u5EFA Docker \u5BB9\u5668\u7684\u6A21\u677F\uFF0C\u6BD4\u5982 Ubuntu \u7CFB\u7EDF\u3002")],-1),p=t("tr",null,[t("td",{style:{"text-align":"left"}},"Docker \u5BB9\u5668(Container)"),t("td",{style:{"text-align":"left"}},"\u5BB9\u5668\u662F\u72EC\u7ACB\u8FD0\u884C\u7684\u4E00\u4E2A\u6216\u4E00\u7EC4\u5E94\u7528\uFF0C\u662F\u955C\u50CF\u8FD0\u884C\u65F6\u7684\u5B9E\u4F53\u3002")],-1),k=t("tr",null,[t("td",{style:{"text-align":"left"}},"Docker \u5BA2\u6237\u7AEF(Client)"),t("td",{style:{"text-align":"left"}},"Docker \u5BA2\u6237\u7AEF\u901A\u8FC7\u547D\u4EE4\u884C\u6216\u8005\u5176\u4ED6\u5DE5\u5177\u4F7F\u7528 Docker SDK (https://docs.docker.com/develop/sdk/) \u4E0E Docker \u7684\u5B88\u62A4\u8FDB\u7A0B\u901A\u4FE1\u3002")],-1),u=t("tr",null,[t("td",{style:{"text-align":"left"}},"Docker \u4E3B\u673A(Host)"),t("td",{style:{"text-align":"left"}},"\u4E00\u4E2A\u7269\u7406\u6216\u8005\u865A\u62DF\u7684\u673A\u5668\u7528\u4E8E\u6267\u884C Docker \u5B88\u62A4\u8FDB\u7A0B\u548C\u5BB9\u5668\u3002")],-1),_=t("td",{style:{"text-align":"left"}},"Docker Registry",-1),f={style:{"text-align":"left"}},b=e("Docker \u4ED3\u5E93\u7528\u6765\u4FDD\u5B58\u955C\u50CF\uFF0C\u53EF\u4EE5\u7406\u89E3\u4E3A\u4EE3\u7801\u63A7\u5236\u4E2D\u7684\u4EE3\u7801\u4ED3\u5E93\u3002Docker Hub("),x={href:"https://hub.docker.com/",target:"_blank",rel:"noopener noreferrer"},y=e("https://hub.docker.com"),D=e(") \u63D0\u4F9B\u4E86\u5E9E\u5927\u7684\u955C\u50CF\u96C6\u5408\u4F9B\u4F7F\u7528\u3002\u4E00\u4E2A Docker Registry \u4E2D\u53EF\u4EE5\u5305\u542B\u591A\u4E2A\u4ED3\u5E93\uFF08Repository\uFF09\uFF1B\u6BCF\u4E2A\u4ED3\u5E93\u53EF\u4EE5\u5305\u542B\u591A\u4E2A\u6807\u7B7E\uFF08Tag\uFF09\uFF1B\u6BCF\u4E2A\u6807\u7B7E\u5BF9\u5E94\u4E00\u4E2A\u955C\u50CF\u3002\u901A\u5E38\uFF0C\u4E00\u4E2A\u4ED3\u5E93\u4F1A\u5305\u542B\u540C\u4E00\u4E2A\u8F6F\u4EF6\u4E0D\u540C\u7248\u672C\u7684\u955C\u50CF\uFF0C\u800C\u6807\u7B7E\u5C31\u5E38\u7528\u4E8E\u5BF9\u5E94\u8BE5\u8F6F\u4EF6\u7684\u5404\u4E2A\u7248\u672C\u3002\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7 "),m=t("strong",null,"<\u4ED3\u5E93\u540D>:<\u6807\u7B7E>",-1),I=e(" \u7684\u683C\u5F0F\u6765\u6307\u5B9A\u5177\u4F53\u662F\u8FD9\u4E2A\u8F6F\u4EF6\u54EA\u4E2A\u7248\u672C\u7684\u955C\u50CF\u3002\u5982\u679C\u4E0D\u7ED9\u51FA\u6807\u7B7E\uFF0C\u5C06\u4EE5 "),q=t("strong",null,"latest",-1),C=e(" \u4F5C\u4E3A\u9ED8\u8BA4\u6807\u7B7E\u3002"),V=t("tr",null,[t("td",{style:{"text-align":"left"}},"Docker Machine"),t("td",{style:{"text-align":"left"}},"Docker Machine\u662F\u4E00\u4E2A\u7B80\u5316Docker\u5B89\u88C5\u7684\u547D\u4EE4\u884C\u5DE5\u5177\uFF0C\u901A\u8FC7\u4E00\u4E2A\u7B80\u5355\u7684\u547D\u4EE4\u884C\u5373\u53EF\u5728\u76F8\u5E94\u7684\u5E73\u53F0\u4E0A\u5B89\u88C5Docker\uFF0C\u6BD4\u5982VirtualBox\u3001 Digital Ocean\u3001Microsoft Azure\u3002")],-1);function v(U,B){const o=n("ExternalLinkIcon");return s(),l("div",null,[d,t("table",null,[h,t("tbody",null,[g,p,k,u,t("tr",null,[_,t("td",f,[b,t("a",x,[y,a(o)]),D,m,I,q,C])]),V])])])}const N=r(i,[["render",v],["__file","11.html.vue"]]);export{N as default};
