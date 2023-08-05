import{_ as p,r as c,o as i,c as u,a as n,b as a,w as e,e as s,d as r}from"./app.ee8200d6.js";const d={},k={href:"https://github.com/cubxxw/awesome-cloud-native",target:"_blank",rel:"noopener noreferrer"},m=s("\u{1F525} \u5F00\u6E90\u5730\u5740"),b=n("h1",{id:"\u7B2C1\u8282-docker-\u5F00\u53D1",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C1\u8282-docker-\u5F00\u53D1","aria-hidden":"true"},"#"),s(" \u7B2C1\u8282 docker \u5F00\u53D1")],-1),v=n("br",null,null,-1),h=n("div",null,[n("a",{href:"0.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"2.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),_=n("br",null,null,-1),f=s("\u2764\uFE0F\u{1F495}\u{1F495}\u5B9E\u73B0\u5F53\u521D\u5B66\u4E60docker\u7684\u613F\u671B\uFF0C\u81EA\u5DF1\u64B8\u4E00\u4E2Adocker\uFF0C\u4E3A\u4E91\u539F\u751F\u5F00\u53D1\u5145\u5B9E\u57FA\u7840\u3002Myblog:"),g={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},x=s("http://nsddd.top"),D=n("hr",null,null,-1),I={class:"table-of-contents"},N=s("\u5173\u4E8E\u4E91\u5F00\u53D1"),E=s("docker \u5B9E\u73B0"),w=s("\u8FD0\u884C\u547D\u4EE4"),C=s("\u7A0B\u5E8F"),M=s("END \u94FE\u63A5"),T=n("p",null,"[TOC]",-1),P=n("h2",{id:"\u5173\u4E8E\u4E91\u5F00\u53D1",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5173\u4E8E\u4E91\u5F00\u53D1","aria-hidden":"true"},"#"),s(" \u5173\u4E8E\u4E91\u5F00\u53D1")],-1),S={href:"https://github.com/EngineerCN/content",target:"_blank",rel:"noopener noreferrer"},y=s("\u53C2\u8003 Enginerr CN "),O=r(`<div class="custom-container tip"><p class="custom-container-title">\u5173\u4E8E~</p><p>\u4E91\u5F00\u53D1\u4E00\u76F4\u662F\u6211\u5F88\u5E0C\u671B\u7684\u4E00\u4E2A\u53CD\u5411\uFF0C\u65E0\u8BBA\u662F\u540E\u9762\u7684 kubernetes \u6E90\u7801\u548C\u7ED3\u6784\uFF0C\u5305\u62EC\u73B0\u5728\u7684 docker \uFF0C\u6216\u8BB8\u90FD\u9700\u8981\u4E00\u4E9B\u7075\u611F\u6765\u523A\u6FC0\u81EA\u5DF1\u3002</p><p>\u6216\u8BB8\u7ED3\u5408\u4E86\u5F88\u591A\u5B9E\u9645\u7684\u6848\u4F8B\uFF1A kubernetes + fabric2.0 kubernetes + springcloud \u540E\u66F4\u52A0\u6DF1\u6709\u4F53\u4F1A~</p><p>\u6211\u4EEC\u4ECE\u6700\u7B80\u5355\u7684 docker \u5F00\u59CB ~</p></div><h2 id="docker-\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#docker-\u5B9E\u73B0" aria-hidden="true">#</a> docker \u5B9E\u73B0</h2><ul><li>Namespace (\u9694\u79BB)</li><li>Cgroup (\u9650\u5236)</li><li>AUFS (\u8054\u5408\u6587\u4EF6\u7CFB\u7EDF)</li></ul><p><img src="http://sm.nsddd.top/smimage-20221115214301527.png" alt="image-20221115214301527"></p><h2 id="\u8FD0\u884C\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u8FD0\u884C\u547D\u4EE4" aria-hidden="true">#</a> \u8FD0\u884C\u547D\u4EE4</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-it</span> ubuntu /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u7A0B\u5E8F" tabindex="-1"><a class="header-anchor" href="#\u7A0B\u5E8F" aria-hidden="true">#</a> \u7A0B\u5E8F</h2><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;fmt&quot;</span>
	<span class="token string">&quot;os&quot;</span>
	<span class="token string">&quot;os/exec&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">)</span>
	<span class="token keyword">switch</span> os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>	 <span class="token comment">//\u83B7\u53D6\u7B2C\u4E00\u4E2A\u53C2\u6570\uFF08\u4ECE\u7A0B\u5E8F\u540D\u5F00\u59CB\uFF09</span>
	<span class="token keyword">case</span> <span class="token string">&quot;run&quot;</span><span class="token punctuation">:</span>
		<span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;have not define&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cmd <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>	<span class="token comment">//\u83B7\u53D6\u7B2C\u4E8C\u4E2A\u53C2\u6570</span>
	cmd<span class="token punctuation">.</span>Stdin <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdin
	cmd<span class="token punctuation">.</span>Stdout <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdout
	cmd<span class="token punctuation">.</span>Stderr <span class="token operator">=</span> os<span class="token punctuation">.</span>Stderr
	cmd<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u{1F680} \u7F16\u8BD1\u7ED3\u679C\u5982\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ go run go-docker-1.go run <span class="token function">date</span>
<span class="token punctuation">[</span>C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>smile<span class="token punctuation">\\</span>AppData<span class="token punctuation">\\</span>Local<span class="token punctuation">\\</span>Temp<span class="token punctuation">\\</span>go-build3158378218<span class="token punctuation">\\</span>b001<span class="token punctuation">\\</span>exe<span class="token punctuation">\\</span>go-docker-1.exe run date<span class="token punctuation">]</span>
Tue Nov <span class="token number">15</span> <span class="token number">22</span>:07:19     <span class="token number">2022</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6211\u4EEC\u8FD0\u884C\u4E86 date \uFF0C\u662F\u4E0D\u662F\u8BF4\u5C31\u662F\u6211\u4EEC\u4F7F\u7528\u7684\u662Fdate \u8FD9\u4E2A\u6A21\u5F0F</strong></p><div class="custom-container tip"><p class="custom-container-title">\u89C2\u5BDF\u8FDB\u7A0B</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>smile@DESKTOP-N9GOOM4 MINGW64 /d/\u6587\u6863/\u6700\u8FD1\u7684/awesome-docker/docs/code-docker-super/main <span class="token punctuation">(</span>master<span class="token punctuation">)</span>
$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> 
     <span class="token environment constant">UID</span>     PID    <span class="token environment constant">PPID</span>  TTY        STIME COMMAND
   smile    <span class="token number">1159</span>       <span class="token number">1</span> cons1    <span class="token number">22</span>:08:59 /usr/bin/bash
   smile    <span class="token number">1169</span>    <span class="token number">1159</span> cons1    <span class="token number">22</span>:09:10 /usr/bin/ps
   smile    <span class="token number">1139</span>       <span class="token number">1</span> cons0    <span class="token number">22</span>:07:02 /usr/bin/bash

smile@DESKTOP-N9GOOM4 MINGW64 /d/\u6587\u6863/\u6700\u8FD1\u7684/awesome-docker/docs/code-docker-super/main <span class="token punctuation">(</span>master<span class="token punctuation">)</span>
$ <span class="token function">ps</span> aut
      PID    <span class="token environment constant">PPID</span>    PGID     WINPID   TTY         <span class="token environment constant">UID</span>    STIME COMMAND
     <span class="token number">1159</span>       <span class="token number">1</span>    <span class="token number">1159</span>     <span class="token number">166668</span>  cons1     <span class="token number">197609</span> <span class="token number">22</span>:08:59 /usr/bin/bash
     <span class="token number">1174</span>    <span class="token number">1159</span>    <span class="token number">1174</span>     <span class="token number">174676</span>  cons1     <span class="token number">197609</span> <span class="token number">22</span>:09:35 /usr/bin/ps
     <span class="token number">1139</span>       <span class="token number">1</span>    <span class="token number">1139</span>     <span class="token number">176140</span>  cons0     <span class="token number">197609</span> <span class="token number">22</span>:07:02 /usr/bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u9000\u51FA\u518D\u8FDB\u5165\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>smile@DESKTOP-N9GOOM4 MINGW64 /d/\u6587\u6863/\u6700\u8FD1\u7684/awesome-docker/docs/code-docker-super/main <span class="token punctuation">(</span>master<span class="token punctuation">)</span>
$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span>
     <span class="token environment constant">UID</span>     PID    <span class="token environment constant">PPID</span>  TTY        STIME COMMAND
   smile    <span class="token number">1194</span>    <span class="token number">1179</span> cons1    <span class="token number">22</span>:10:21 /usr/bin/ps
   smile    <span class="token number">1179</span>       <span class="token number">1</span> cons1    <span class="token number">22</span>:10:14 /usr/bin/bash
   smile    <span class="token number">1139</span>       <span class="token number">1</span> cons0    <span class="token number">22</span>:07:02 /usr/bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><p>\u7531\u6B64\u53EF\u4EE5\u7B80\u5355\uFF0C\u6211\u4EEC\u7684\u4E0D\u540C\u8FDB\u7A0B\u662F\u4E0D\u4E00\u6837\u7684\uFF0C\u53EF\u4EE5\u7406\u89E3\u4E3A\u969C\u773C\u6CD5~</p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="0.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="2.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,15),A=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),q={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},G=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),L=s(")"),U=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),W={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},B=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function V(Y,$){const t=c("ExternalLinkIcon"),o=c("router-link"),l=c("RouterLink");return i(),u("div",null,[n("ul",null,[n("li",null,[n("a",k,[m,a(t)])])]),b,v,h,_,n("blockquote",null,[n("p",null,[f,n("a",g,[x,a(t)])])]),D,n("nav",I,[n("ul",null,[n("li",null,[a(o,{to:"#\u5173\u4E8E\u4E91\u5F00\u53D1"},{default:e(()=>[N]),_:1})]),n("li",null,[a(o,{to:"#docker-\u5B9E\u73B0"},{default:e(()=>[E]),_:1})]),n("li",null,[a(o,{to:"#\u8FD0\u884C\u547D\u4EE4"},{default:e(()=>[w]),_:1})]),n("li",null,[a(o,{to:"#\u7A0B\u5E8F"},{default:e(()=>[C]),_:1})]),n("li",null,[a(o,{to:"#end-\u94FE\u63A5"},{default:e(()=>[M]),_:1})])])]),T,P,n("ul",null,[n("li",null,[n("a",S,[y,a(t)])])]),O,n("ul",null,[n("li",null,[n("p",null,[a(l,{to:"/"},{default:e(()=>[A]),_:1})])]),n("li",null,[n("p",null,[n("a",q,[G,a(t)]),L])]),n("li",null,[n("p",null,[U,n("a",W,[B,a(t)])])])])])}const R=p(d,[["render",V],["__file","1.html.vue"]]);export{R as default};
