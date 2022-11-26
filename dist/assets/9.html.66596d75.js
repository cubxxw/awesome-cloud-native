import{_ as a,r as n,o as l,c as d,a as e,b as o,w as c,e as t,d as r}from"./app.a1305279.js";const h={},_={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},u=t("author"),p=e("h1",{id:"\u7B2C9\u8282-sealer-runtime-stage-2-including-biweekly-meetings",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C9\u8282-sealer-runtime-stage-2-including-biweekly-meetings","aria-hidden":"true"},"#"),t(" \u7B2C9\u8282 sealer runtime Stage 2 (including biweekly meetings)")],-1),m=e("div",null,[e("a",{href:"8.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"10.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),f=e("br",null,null,-1),k=t("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),g={href:"https://github.com/3293172751/sealos",target:"_blank",rel:"noopener noreferrer"},b=t("sealos"),v=t("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),y={href:"https://github.com/3293172751/sealos",target:"_blank",rel:"noopener noreferrer"},x=t("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),w=t("\u3002Myblog:"),I={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},A=t("http://nsddd.top"),C=e("hr",null,null,-1),E=e("p",null,"[TOC]",-1),S=e("h2",{id:"code-module",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#code-module","aria-hidden":"true"},"#"),t(" code module")],-1),N={class:"custom-container tip"},R=e("p",{class:"custom-container-title"},"ISSUES 1859",-1),q={href:"https://github.com/sealerio/sealer/issues/1859#top",target:"_blank",rel:"noopener noreferrer"},L=t("feature] want to implement the k3s runtime module"),B=t("#1859"),F={href:"https://github.com/3293172751",target:"_blank",rel:"noopener noreferrer"},V=t("3293172751"),H=t(" opened this issue \u524D\u5929 \xB7 4 comments"),D=t("What a good start "),K={href:"https://github.com/3293172751",target:"_blank",rel:"noopener noreferrer"},T=t("@3293172751"),U=t("! Now i have some suggestions maybe make you more understand about sealer runtime."),W=t("the Achieve Interface step is definitely correct. but it would be some misunderstand about k3s's cluterimage rootfs in your chapter "),Y=e("em",null,[e("strong",null,"k3s - rootfs")],-1),j=t(", i think we do not need to care too much about k3s install package distribution in this stage. I propose a step which is my learning path of sealer,FYI "),z={href:"https://github.com/3293172751",target:"_blank",rel:"noopener noreferrer"},M=t("@3293172751"),O=t(" ."),G=e("ul",null,[e("li",null,"k8s runtiem interface \u903B\u8F91\u662F\u4EC0\u4E48?"),e("li",null,"sealer \u5982\u4F55\u4EE5\u53CA\u4F55\u65F6\u5B89\u88C5\u79C1\u4EBA\u6CE8\u518C\u8868?"),e("li",null,"runtime module \u5982\u4F55\u4E0Erootfs\u4E2D\u7684\u811A\u672C\u4EA4\u4E92?")],-1),J=e("h2",{id:"k3s-module",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#k3s-module","aria-hidden":"true"},"#"),t(" k3s module")],-1),P={class:"custom-container tip"},Q=e("p",{class:"custom-container-title"},"ISSUE",-1),X=t("And you mentioned about the k3s installation [online\\offline]. I have little confusions. If sqlite couldn't support cluster HA installation? How to specify the database? Another question is about install step. AFAIK, k3s support join node by "),Z=e("code",null,"k3s agent",-1),$=t(),ee=e("code",null,"k3s server",-1),te=t(", so whether you tried this method? Last, k3s support custom private registry, how to config this? and whether k3s could support external CRI? "),oe={href:"https://github.com/3293172751",target:"_blank",rel:"noopener noreferrer"},se=t("@3293172751"),ne=e("p",null,"\u{1F389}about [online\\offline]",-1),re=e("p",null,"\u{1F389} about HA install and single node",-1),ie=t("\u26A0\uFE0F k3s "),ae={href:"https://github.com/k3s-io/k3s/discussions/6478",target:"_blank",rel:"noopener noreferrer"},le=t("discussions 6478"),de=t(" \u4E00\u4E9B\u7B54\u7591\u548C\u8BA8\u8BBA~"),ce=r(`<h2 id="\u5173\u4E8E\u8BBE\u8BA1\u7EDF\u4E00\u7684interface" tabindex="-1"><a class="header-anchor" href="#\u5173\u4E8E\u8BBE\u8BA1\u7EDF\u4E00\u7684interface" aria-hidden="true">#</a> \u5173\u4E8E\u8BBE\u8BA1\u7EDF\u4E00\u7684interface</h2><p><strong>\u5E0C\u671B\u5728\u63A5\u53E3 <code>interface</code>\u5C42\u5B9E\u73B0\u5404\u4E2A\u6A21\u5757\u7684\u529F\u80FD\uFF0C\u7EDF\u4E00\u66B4\u9732\u51FA\u53BB\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>seal run k3s~
seal run k0s~
seal run kuberntes~
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),he={id:"\u7ACB\u65B9\u4F5310\u5929\u524D\u4F5C\u8005",tabindex:"-1"},_e=e("a",{class:"header-anchor",href:"#\u7ACB\u65B9\u4F5310\u5929\u524D\u4F5C\u8005","aria-hidden":"true"},"#",-1),ue=t(),pe={href:"https://github.com/cubxxw",target:"_blank",rel:"noopener noreferrer"},me=e("img",{src:"https://avatars.githubusercontent.com/u/86140903?s=64&v=4",alt:"img"},null,-1),fe=t("\u7ACB\u65B9\u4F53"),ke={href:"https://github.com/k3s-io/k3s/discussions/6478#discussioncomment-4156072",target:"_blank",rel:"noopener noreferrer"},ge=t("10\u5929\u524D"),be=t("\u4F5C\u8005"),ve=r('<p>\u53E6\u4E00\u4E2A\u95EE\u9898\u662F\u5173\u4E8E\u5B89\u88C5\u6B65\u9AA4\u3002AFAIK\uFF0Ck3s \u652F\u6301\u901A\u8FC7 k3s \u4EE3\u7406 k3s \u670D\u52A1\u5668\u52A0\u5165\u8282\u70B9\u5417\uFF1F \u6700\u540E\uFF0Ck3s\u652F\u6301\u81EA\u5B9A\u4E49\u79C1\u6709registry\uFF0C\u8FD9\u4E2A\u600E\u4E48\u914D\u7F6E\uFF1Fk3s\u80FD\u4E0D\u80FD\u652F\u6301\u5916\u90E8CRI\uFF1F</p><blockquote><p>k3s\u652F\u6301\u901A\u8FC7k3s agent k3s server\u52A0\u5165\u8282\u70B9\u5417\uFF1F\u662F\u7684\uFF0C<code>k3s agent</code>\u8282\u70B9\u53EF\u4EE5\u52A0\u5165\u53E6\u4E00\u4E2A\u6B63\u5728\u8FD0\u884C\u7684\u8282\u70B9\u7684\u96C6\u7FA4<code>k3s server</code>\u3002\u8FD9\u5C31\u662F\u4F60\u60F3\u95EE\u7684\u5417\uFF1Fk3s \u652F\u6301\u81EA\u5B9A\u4E49\u79C1\u6709\u6CE8\u518C\u4E2D\u5FC3\uFF0C</p><p>\u5982\u4F55\u914D\u7F6E\uFF1F\u60A8\u6709\u673A\u4F1A\u67E5\u770B\u6587\u6863\u5417\uFF1Fhttps://docs.k3s.io/installation/private-registryk3s</p><p>\u53EF\u4EE5\u652F\u6301\u5916\u90E8 CRI \u5417\uFF1F\u662F\u7684\uFF0C\u4F7F\u7528 --docker \u6216 --container-runtime-endpoint\u3002\u4E0A\u9762\u63D0\u5230\u7684 registries.yaml \u652F\u6301\u4EC5\u9002\u7528\u4E8E\u5D4C\u5165\u5F0F containerd\uFF1B\u5982\u679C\u60A8\u81EA\u5E26 CRI\uFF0C\u5219\u7531\u60A8\u81EA\u884C\u6B63\u786E\u914D\u7F6E\u3002</p></blockquote><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="8.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="10.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>',4),ye=t("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),xe={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},we=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),Ie=t(")"),Ae=t("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),Ce={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},Ee=t("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function Se(Ne,Re){const s=n("ExternalLinkIcon"),i=n("RouterLink");return l(),d("div",null,[e("ul",null,[e("li",null,[e("a",_,[u,o(s)])])]),p,m,f,e("blockquote",null,[e("p",null,[k,e("a",g,[b,o(s)]),v,e("a",y,[x,o(s)]),w,e("a",I,[A,o(s)])])]),C,E,S,e("div",N,[R,e("p",null,[e("a",q,[L,o(s)]),B]),e("p",null,[e("a",F,[V,o(s)]),H]),e("p",null,[D,e("a",K,[T,o(s)]),U]),e("p",null,[W,Y,j,e("a",z,[M,o(s)]),O]),G]),J,e("div",P,[Q,e("p",null,[X,Z,$,ee,te,e("a",oe,[se,o(s)])]),ne,re]),e("p",null,[ie,e("a",ae,[le,o(s)]),de]),ce,e("h3",he,[_e,ue,e("a",pe,[me,fe,o(s)]),e("a",ke,[ge,o(s)]),be]),ve,e("ul",null,[e("li",null,[e("p",null,[o(i,{to:"/"},{default:c(()=>[ye]),_:1})])]),e("li",null,[e("p",null,[e("a",xe,[we,o(s)]),Ie])]),e("li",null,[e("p",null,[Ae,e("a",Ce,[Ee,o(s)])])])])])}const Le=a(h,[["render",Se],["__file","9.html.vue"]]);export{Le as default};
