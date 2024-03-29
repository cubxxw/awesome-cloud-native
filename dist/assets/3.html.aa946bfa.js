import{_ as t,r as l,o as c,c as d,a as s,b as e,w as r,e as n,d as i}from"./app.9f14a191.js";const p={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},v=n("author"),m=s("h1",{id:"\u7B2C3\u8282-\u5B66\u4E60-sealos-\u7684\u9879\u76EE\u7ED3\u6784",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#\u7B2C3\u8282-\u5B66\u4E60-sealos-\u7684\u9879\u76EE\u7ED3\u6784","aria-hidden":"true"},"#"),n(" \u7B2C3\u8282 \u5B66\u4E60 sealos \u7684\u9879\u76EE\u7ED3\u6784")],-1),b=s("br",null,null,-1),h=s("div",null,[s("a",{href:"2.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),s("a",{href:"4.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),k=s("br",null,null,-1),g=n("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),_={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},f=n("sealos"),y=n("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),x={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},w=n("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),S=n("\u3002Myblog:"),C={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},L=n("http://nsddd.top"),E=s("hr",null,null,-1),q=s("p",null,"[TOC]",-1),I=s("h2",{id:"\u76EE\u5F55\u7ED3\u6784",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#\u76EE\u5F55\u7ED3\u6784","aria-hidden":"true"},"#"),n(" \u76EE\u5F55\u7ED3\u6784")],-1),F={id:"controllers",tabindex:"-1"},P=s("a",{class:"header-anchor",href:"#controllers","aria-hidden":"true"},"#",-1),T=n(),A={href:"https://github.com/labring/sealos/tree/main/controllers",target:"_blank",rel:"noopener noreferrer"},D=n("controllers"),M=i(`<details class="custom-container details"><summary>\u76EE\u5F55\u6298\u53E0</summary><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>PS C:<span class="token punctuation">\\</span>Users<span class="token punctuation">\\</span>smile<span class="token punctuation">\\</span>Desktop<span class="token punctuation">\\</span>my<span class="token punctuation">\\</span>sealos<span class="token punctuation">\\</span>controllers<span class="token operator">&gt;</span> tree      
\u5377 \u7CFB\u7EDF \u7684\u6587\u4EF6\u5939 <span class="token environment constant">PATH</span> \u5217\u8868
\u5377\u5E8F\u5217\u53F7\u4E3A DE95-1D97
C:.
\u251C\u2500app  <span class="token comment"># \u6211\u4EEC\u6574\u4E2A\u5E94\u7528\u751F\u547D\u5468\u671F</span>
\u2502  \u251C\u2500api
\u2502  \u2502  \u2514\u2500v1
\u2502  \u251C\u2500config  
\u2502  \u2502  \u251C\u2500crd
\u2502  \u2502  \u2502  \u251C\u2500bases
\u2502  \u2502  \u2502  \u2514\u2500patches
\u2502  \u2502  \u251C\u2500default
\u2502  \u2502  \u251C\u2500manager
\u2502  \u2502  \u251C\u2500prometheus
\u2502  \u2502  \u251C\u2500rbac
\u2502  \u2502  \u2514\u2500samples
\u2502  \u251C\u2500controllers
\u2502  \u251C\u2500deploy
\u2502  \u2502  \u2514\u2500manifests
\u2502  \u2514\u2500hack
\u251C\u2500cluster <span class="token comment"># \u4E13\u95E8\u7BA1\u7406aws\u4E0Ak8s\u751F\u547D\u5468\u671F</span>
\u2502  \u251C\u2500api
\u2502  \u2502  \u2514\u2500v1
\u2502  \u251C\u2500applier
\u2502  \u251C\u2500config
\u2502  \u2502  \u251C\u2500crd
\u2502  \u2502  \u2502  \u251C\u2500bases
\u2502  \u2502  \u2502  \u2514\u2500patches
\u2502  \u2502  \u251C\u2500default
\u2502  \u2502  \u251C\u2500manager
\u2502  \u2502  \u251C\u2500prometheus
\u2502  \u2502  \u251C\u2500rbac
\u2502  \u2502  \u2514\u2500samples
\u2502  \u251C\u2500controllers
\u2502  \u251C\u2500deploy
\u2502  \u2502  \u2514\u2500manifests
\u2502  \u2514\u2500hack
\u251C\u2500infra  <span class="token comment"># \u7BA1\u7406\u57FA\u7840\u8BBE\u65BD\uFF0C\u7BA1\u7406\u865A\u62DF\u673A\u3001\u5BB9\u5668\u6216\u8005\u7F51\u7EDC\u3001\u78C1\u76D8</span>
\u2502  \u251C\u2500api
\u2502  \u2502  \u2514\u2500v1
\u2502  \u251C\u2500common
\u2502  \u251C\u2500config
\u2502  \u2502  \u251C\u2500crd
\u2502  \u2502  \u2502  \u251C\u2500bases
\u2502  \u2502  \u2502  \u2514\u2500patches
\u2502  \u2502  \u251C\u2500default
\u2502  \u2502  \u251C\u2500manager
\u2502  \u2502  \u251C\u2500prometheus
\u2502  \u2502  \u251C\u2500rbac
\u2502  \u2502  \u2514\u2500samples
\u2502  \u251C\u2500controllers
\u2502  \u251C\u2500deploy
\u2502  \u2502  \u2514\u2500manifests
\u2502  \u251C\u2500drivers
\u2502  \u2502  \u2514\u2500aws
\u2502  \u2514\u2500hack
\u251C\u2500metering  <span class="token comment"># \u81EA\u5B9A\u4E49\u8BA1\u91CF\uFF0C\u8BA1\u8D39\u8D44\u6E90</span>
\u2502  \u251C\u2500api
\u2502  \u2502  \u2514\u2500v1
\u2502  \u251C\u2500config
\u2502  \u2502  \u251C\u2500crd
\u2502  \u2502  \u2502  \u251C\u2500bases
\u2502  \u2502  \u2502  \u2514\u2500patches
\u2502  \u2502  \u251C\u2500default
\u2502  \u2502  \u251C\u2500manager
\u2502  \u2502  \u251C\u2500prometheus
\u2502  \u2502  \u251C\u2500rbac
\u2502  \u2502  \u2514\u2500samples
\u2502  \u251C\u2500controllers
\u2502  \u251C\u2500deploy
\u2502  \u2502  \u2514\u2500manifests
\u2502  \u2514\u2500hack
\u251C\u2500terminal  <span class="token comment"># cmd</span>
\u2502  \u251C\u2500api
\u2502  \u2502  \u2514\u2500v1
\u2502  \u251C\u2500config
\u2502  \u2502  \u251C\u2500crd
\u2502  \u2502  \u2502  \u251C\u2500bases
\u2502  \u2502  \u2502  \u2514\u2500patches
\u2502  \u2502  \u251C\u2500default
\u2502  \u2502  \u251C\u2500manager
\u2502  \u2502  \u251C\u2500prometheus
\u2502  \u2502  \u251C\u2500rbac
\u2502  \u2502  \u2514\u2500samples
\u2502  \u251C\u2500controllers
\u2502  \u251C\u2500deploy
\u2502  \u2502  \u2514\u2500manifests
\u2502  \u251C\u2500hack
\u2502  \u2514\u2500scripts
\u2514\u2500user  
    \u251C\u2500api
    \u2502  \u2514\u2500v1
    \u251C\u2500config
    \u2502  \u251C\u2500certmanager
    \u2502  \u251C\u2500crd
    \u2502  \u2502  \u251C\u2500bases
    \u2502  \u2502  \u2514\u2500patches
    \u2502  \u251C\u2500default
    \u2502  \u251C\u2500manager
    \u2502  \u251C\u2500prometheus
    \u2502  \u251C\u2500rbac
    \u2502  \u251C\u2500samples
    \u2502  \u2514\u2500webhook
    \u251C\u2500controllers
    \u2502  \u251C\u2500cache
    \u2502  \u2514\u2500helper
    \u251C\u2500deploy
    \u2502  \u2514\u2500manifests
    \u2514\u2500hack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,1),N={href:"https://github.com/labring/sealos/tree/main/controllers",target:"_blank",rel:"noopener noreferrer"},R=n("controllers"),B=n(" \u63A7\u5236\u5668\u7528\u6765\u7BA1\u7406\u96C6\u7FA4\uFF08k8s \u6709\u4E00\u4E9B\u5185\u7F6E\u7684\u529F\u80FD "),V=s("code",null,"pod",-1),J=n("\uFF0Cdeloyment\u8FD9\u4E9B\uFF0C\u540C\u6837\u53EF\u4EE5controllers\u6269\u5C55\uFF09\uFF1A"),O=i(`<blockquote><p>\u8FD9\u4E9B\u529F\u80FD\u90FD\u662F <code>k8s</code> \u6CA1\u6709\u7684\u529F\u80FD~</p></blockquote><p>\u6211\u4EEC\u8DD1\u4E86\u5F88\u591A\u670D\u52A1\u5668\u90FD\u662F\u901A\u8FC7<code>infra</code>\u7BA1\u7406\u4ED6\u4EEC</p><p><code>metering</code>\u662F\u7528\u4F5C\u8BA1\u91CF\uFF0C\u6211\u4EEC\u7528\u8FC7\u591A\u5C11\u8D44\u6E90</p><p><code>terminal</code>\u5C31\u662F\u684C\u9762\u4E0A\u7684\u7EC8\u7AEF\u5E94\u7528</p><p><code>user</code>\u5C31\u662F\u7528\u6237\u7684\u7BA1\u7406\uFF0C\u56E0\u4E3A<code>cloud.sealos</code>\u662F\u4E00\u4E2A\u591A\u79DF\u6237\u7684\u96C6\u7FA4</p><h3 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd" aria-hidden="true">#</a> cmd</h3><p>\u4EE3\u7801\u7684\u5165\u53E3\u5C31\u662F\u5728cmd\u4E2D</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos cmd<span class="token punctuation">]</span><span class="token comment"># tree -d</span>
<span class="token builtin class-name">.</span>
\u251C\u2500\u2500 image-cri-shim  <span class="token comment"># \u955C\u50CF\u4EE3\u7406 </span>
\u2502   \u2514\u2500\u2500 cmd  
\u251C\u2500\u2500 lvscare  <span class="token comment"># \u8D1F\u8F7D\u5747\u8861</span>
\u2502   \u2514\u2500\u2500 cmd
\u251C\u2500\u2500 sealctl  <span class="token comment"># \u5C01\u88C5\u4E86\u4E00\u4E9Bshell\uFF0C\u5728\u670D\u52A1\u5668\u4E0A\u6CA1\u6709shell\u5DE5\u5177\uFF0C\u5C01\u88C5\u5185\u6838\u6253\u4EA4\u9053\u547D\u4EE4</span>
\u2502   \u2514\u2500\u2500 cmd
\u2514\u2500\u2500 sealos  <span class="token comment"># \u6838\u5FC3\u5165\u53E3\u2B07\uFE0F</span>
    \u2514\u2500\u2500 cmd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u8BE6\u7EC6\u4ECB\u7ECD\uFF1A</strong></p><ul><li><code>image-cri-shim</code>\uFF1A\u62E6\u622A\u901A\u4FE1\uFF0C\u68C0\u6D4B\u5DF2\u7ECF\u6709\u7684\u955C\u50CF\uFF0C\u66FF\u6362</li><li><code>lvscare</code>\uFF1A\u8D1F\u8F7D\u5747\u8861\u5668\uFF0C\u6BCF\u4E2A\u7ED3\u70B9\u90FD\u4F1A\u8DD1<code>lvscare</code>\uFF0C\u90FD\u53BB\u8DD1\u4E09\u4E2A<code>master</code>\uFF0C\u505A\u8D1F\u8F7D\u5747\u8861\uFF0C<code>master</code> \u6302\u6389\u5C31\u4F1A\u6E05\u6389\u7ED3\u70B9\u3002</li><li><code>sealctl</code>\uFF1A\u5C01\u88C5\u4E86\u4E00\u4E9B <code>shell</code> \uFF0C\u5728\u670D\u52A1\u5668\u4E0A\u6CA1\u6709 <code>shell</code> \u5DE5\u5177\uFF0C\u5C01\u88C5\u5185\u6838\u6253\u4EA4\u9053\u547D\u4EE4\uFF0Csealos\u4F9D\u8D56\u7684\u547D\u4EE4\u884C\u3002</li><li><code>sealos</code>\uFF1A<code>sealos run</code> \u7C7B\u4F3C\u4E8E <code>k8s</code> \u5B9E\u73B0</li></ul>`,10),z={class:"custom-container details"},j=i(`<summary>k8s\u6307\u4EE4\u5F0F\u548C\u58F0\u660E\u5F0F\uFF1A</summary><p><code>K8S</code>\u7684\u67B6\u6784\uFF0C\u5176\u4E2D\u6709\u4E00\u70B9\u5F88\u91CD\u8981\u7684\u662F\u6574\u4F53\u67B6\u6784\u91C7\u7528\u7684\u662F <code>\u58F0\u660E\u5F0F\u7F16\u7A0B</code>\uFF0C\u4E3B\u8981\u7684\u7F16\u7A0B\u8303\u5F0F\u6709\u4E09\u79CD\uFF1A<code>\u547D\u4EE4\u5F0F\u7F16\u7A0B</code>\uFF0C<code>\u58F0\u660E\u5F0F\u7F16\u7A0B</code> \u548C <code>\u51FD\u6570\u5F0F\u7F16\u7A0B</code>\u3002</p><p><strong>\u547D\u4EE4\u5F0F\u7F16\u7A0B\uFF1A</strong></p><p>\u547D\u4EE4\u5F0F\u7F16\u7A0B\u7684\u4E3B\u8981\u601D\u60F3\u662F\u5173\u6CE8 <code>\u8BA1\u7B97\u673A\u6267\u884C\u7684\u6B65\u9AA4</code>\uFF0C\u5373\u4E00\u6B65\u4E00\u6B65\u544A\u8BC9\u8BA1\u7B97\u673A\u5148\u505A\u4EC0\u4E48\u518D\u505A\u4EC0\u4E48\u3002 \u6BD4\u5982\uFF1A\u5982\u679C\u4F60\u60F3\u5728\u4E00\u4E2A\u6570\u5B57\u96C6\u5408 <code>collection</code>(\u53D8\u91CF\u540D) \u4E2D\u7B5B\u9009\u5927\u4E8E 5 \u7684\u6570\u5B57\uFF0C\u4F60\u9700\u8981\u8FD9\u6837\u544A\u8BC9\u8BA1\u7B97\u673A\uFF1A \u7B2C\u4E00\u6B65\uFF0C\u521B\u5EFA\u4E00\u4E2A\u5B58\u50A8\u7ED3\u679C\u7684\u96C6\u5408\u53D8\u91CF <code>results</code>\uFF1B \u7B2C\u4E8C\u6B65\uFF0C\u904D\u5386\u8FD9\u4E2A\u6570\u5B57\u96C6\u5408 <code>collection</code>\uFF1B \u7B2C\u4E09\u6B65\uFF1A\u4E00\u4E2A\u4E00\u4E2A\u5730\u5224\u65AD\u6BCF\u4E2A\u6570\u5B57\u662F\u4E0D\u662F\u5927\u4E8E 5\uFF0C\u5982\u679C\u662F\u5C31\u5C06\u8FD9\u4E2A\u6570\u5B57\u6DFB\u52A0\u5230\u7ED3\u679C\u96C6\u5408\u53D8\u91CF <code>results</code>\u4E2D\u3002</p><p>\u4EE3\u7801\u5B9E\u73B0\u5982\u4E0B\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token comment">//\u521B\u5EFA\u4E00\u4E2A\u5B58\u50A8\u7ED3\u679C\u7684\u96C6\u5408\u53D8\u91CF\uFF0C\u7528\u4E8E\u5B58\u50A8\u6240\u6709\u7684\u8282\u70B9\u7684\u7ED3\u679C</span>
<span class="token keyword">var</span> results <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>
<span class="token comment">//\u904D\u5386\u8FD9\u4E2A\u96C6\u5408\uFF0C\u6253\u5370\u51FA\u6240\u6709\u8282\u70B9\u7684\u7ED3\u679C</span>
<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> results <span class="token punctuation">{</span>
	<span class="token comment">//\u5224\u65AD\u6BCF\u4E2A\u6570\u5B57\u65F6\u5019\u5927\u4E8E5</span>
	<span class="token keyword">if</span> v <span class="token operator">&gt;</span> <span class="token number">5</span> <span class="token punctuation">{</span>
		<span class="token comment">//\u6DFB\u52A0\u5230\u96C6\u5408results\u4E2D</span>
		results<span class="token punctuation">[</span>k<span class="token punctuation">]</span> <span class="token operator">=</span> v
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F88\u660E\u663E\uFF0C\u8FD9\u4E2A\u6837\u5B50\u7684\u4EE3\u7801\u662F\u5F88\u5E38\u89C1\u7684\u4E00\u79CD\uFF0C\u4E0D\u7BA1\u4F60\u7528\u7684\u662F<code>C</code>,<code>C++</code>\u8FD8\u662F<code>C#</code>,<code>Java</code>,<code>Javascript</code>,<code>BASIC</code>,<code>Python</code>,<code>Ruby</code>\u7B49\u7B49\uFF0C\u4F60\u90FD\u53EF\u4EE5\u4EE5\u8FD9\u4E2A\u65B9\u5F0F\u5199\u3002</p><p><strong>\u58F0\u660E\u5F0F\u7F16\u7A0B\uFF1A</strong></p><p>\u58F0\u660E\u5F0F\u7F16\u7A0B\u662F\u4EE5\u6570\u636E\u7ED3\u6784\u7684\u5F62\u5F0F\u6765\u8868\u8FBE\u7A0B\u5E8F\u6267\u884C\u7684\u903B\u8F91\u3002\u5B83\u7684\u4E3B\u8981\u601D\u60F3\u662F\u544A\u8BC9\u8BA1\u7B97\u673A<code>\u5E94\u8BE5\u505A\u4EC0\u4E48\uFF0C\u4F46\u4E0D\u6307\u5B9A\u5177\u4F53\u8981\u600E\u4E48\u505A</code>\u3002 SQL \u8BED\u53E5\u5C31\u662F\u6700\u660E\u663E\u7684\u4E00\u79CD\u58F0\u660E\u5F0F\u7F16\u7A0B\u7684\u4F8B\u5B50\uFF0C\u4F8B\u5982\uFF1A</p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code> <span class="token keyword">SELECT</span> <span class="token operator">*</span> <span class="token keyword">FROM</span> collection <span class="token keyword">WHERE</span> num <span class="token operator">&gt;</span> <span class="token number">5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u9664\u4E86<code>SQL</code>\uFF0C\u7F51\u9875\u7F16\u7A0B\u4E2D\u7528\u5230\u7684<code>HTML</code>\u548C<code>CSS</code>\u4E5F\u90FD\u5C5E\u4E8E\u58F0\u660E\u5F0F\u7F16\u7A0B\u3002</p><p>\u901A\u8FC7\u89C2\u5BDF\u58F0\u660E\u5F0F\u7F16\u7A0B\u7684\u4EE3\u7801\u6211\u4EEC\u53EF\u4EE5\u53D1\u73B0\u5B83\u6709\u4E00\u4E2A\u7279\u70B9\u662F\u5B83\u4E0D\u9700\u8981\u521B\u5EFA\u53D8\u91CF\u7528\u6765\u5B58\u50A8\u6570\u636E\u3002 \u53E6\u4E00\u4E2A\u7279\u70B9\u662F\u5B83\u4E0D\u5305\u542B\u5FAA\u73AF\u63A7\u5236\u7684\u4EE3\u7801\u5982<code>for</code>\uFF0C<code>while</code>\u3002</p><p><strong>\u51FD\u6570\u5F0F\u7F16\u7A0B\uFF1A</strong></p>`,13),G=n("\u51FD\u6570\u5F0F\u7F16\u7A0B\u548C\u58F0\u660E\u5F0F\u7F16\u7A0B\u662F\u6709\u6240\u5173\u8054\u7684\uFF0C\u56E0\u4E3A\u4ED6\u4EEC\u601D\u60F3\u662F\u4E00\u81F4\u7684\uFF1A\u5373\u53EA\u5173\u6CE8\u505A\u4EC0\u4E48\u800C\u4E0D\u662F\u600E\u4E48\u505A\u3002\u4F46\u51FD\u6570\u5F0F\u7F16\u7A0B\u4E0D\u4EC5\u4EC5\u5C40\u9650\u4E8E\u58F0\u660E\u5F0F\u7F16\u7A0B\u3002 \u51FD\u6570\u5F0F\u7F16\u7A0B\u6700\u91CD\u8981\u7684\u7279\u70B9\u662F**\u201C\u51FD\u6570\u7B2C\u4E00\u4F4D\u201D**\uFF0C\u5373\u51FD\u6570\u53EF\u4EE5\u51FA\u73B0\u5728\u4EFB\u4F55\u5730\u65B9\uFF0C\u6BD4\u5982\u4F60\u53EF\u4EE5\u628A\u51FD\u6570\u4F5C\u4E3A\u53C2\u6570\u4F20\u9012\u7ED9\u53E6\u4E00\u4E2A\u51FD\u6570\uFF0C\u4E0D\u4EC5\u5982\u6B64\u4F60\u8FD8\u53EF\u4EE5\u5C06\u51FD\u6570\u4F5C\u4E3A\u8FD4\u56DE\u503C\u3002\u5927\u90E8\u5206\u5E38\u89C1\u7684\u7F16\u7A0B\u8BED\u8A00\u4E00\u534A\u90FD\u5DF2\u7ECF\u63D0\u4F9B\u4E86\u5BF9\u8FD9\u79CD\u7F16\u7A0B\u65B9\u5F0F\u7684\u652F\u6301\uFF0C\u6BD4\u5982 JavaScript\uFF0C\u518D\u6709 C# \u4E2D\u7684 LINQ \u548C Java \u4E2D\u7684 "),H=s("code",null,"Lambda",-1),U=n(" \u548C\u95ED\u5305\u7684\u6982\u5FF5\u3002"),Q=s("code",null,"Java 8",-1),W=n("\u6700\u5927\u7684\u4E00\u4E2A\u5BF9\u51FD\u6570\u5F0F\u7F16\u7A0B\u652F\u6301\u7684\u66F4\u65B0\u5C31\u662F"),K=s("code",null,"Stream API",-1),Y=n("\uFF0C\u611F\u5174\u8DA3\u7684\u53EF\u4EE5\u4E86\u89E3\u4E0B\uFF0C\u5B98\u65B9\u6587\u6863\u5730\u5740\uFF1A"),$={href:"https://link.zhihu.com/?target=https%3A//link.jianshu.com%3Ft%3Dhttps%3A%2F%2Fdocs.oracle.com%2Fjavase%2F8%2Fdocs%2Fapi%2Fjava%2Futil%2Fstream%2Fpackage-summary.html",target:"_blank",rel:"noopener noreferrer"},X=n("https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html"),Z=i(`<p>\u76F8\u6BD4\u4E8E\u4EE5\u524D\u7684\u547D\u4EE4\u5F0F\u7F16\u7A0B\uFF0C\u5728 Java \u4E2D\u6211\u4E2A\u4EBA\u73B0\u5728\u66F4\u503E\u5411\u4E8E\u51FD\u6570\u5F0F\u7F16\u7A0B\u7684\u65B9\u6CD5\uFF0C\u5B83\u53EF\u4EE5\u8BA9\u4EE3\u7801\u7684\u903B\u8F91\u66F4\u6E05\u6670\u66F4\u4F18\u96C5\uFF0C\u6BD4\u5982\u540C\u6837\u7684\u903B\u8F91\u7528<code>Java 8</code>\u7684<code>Stream</code>\u65B9\u5F0F\u5199\u5C31\u662F\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>List<span class="token operator">&lt;</span>Number<span class="token operator">&gt;</span> results <span class="token operator">=</span> collection.stream<span class="token punctuation">(</span><span class="token punctuation">)</span>
                                 .filter<span class="token punctuation">(</span>n -<span class="token operator">&gt;</span> n <span class="token operator">&gt;</span> <span class="token number">5</span><span class="token punctuation">)</span>
                                 .collect<span class="token punctuation">(</span>Collectors.toList<span class="token punctuation">(</span><span class="token punctuation">))</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ss=i(`<p><strong>sealos\uFF1A\u6838\u5FC3\u5165\u53E3\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos cmd<span class="token punctuation">]</span><span class="token comment"># cd sealos/cmd/ &amp;&amp; tree </span>
<span class="token builtin class-name">.</span>
\u251C\u2500\u2500 add.go
\u251C\u2500\u2500 apply.go
\u251C\u2500\u2500 delete.go
\u251C\u2500\u2500 docs.go
\u251C\u2500\u2500 exec.go
\u251C\u2500\u2500 gen.go
\u251C\u2500\u2500 images.go
\u251C\u2500\u2500 reset.go
\u251C\u2500\u2500 root.go
\u251C\u2500\u2500 run.go  <span class="token comment"># \u6574\u4E2Asealos\u5165\u53E3</span>
\u251C\u2500\u2500 scp.go
\u2514\u2500\u2500 version.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),ns={id:"desktop-\u524D\u7AEF\u90E8\u5206",tabindex:"-1"},es=s("a",{class:"header-anchor",href:"#desktop-\u524D\u7AEF\u90E8\u5206","aria-hidden":"true"},"#",-1),as=n(),is={href:"https://github.com/labring/sealos/tree/main/desktop",target:"_blank",rel:"noopener noreferrer"},ls=n("desktop"),os=n(" \u524D\u7AEF\u90E8\u5206"),ts=s("h2",{id:"cloud\u662F\u4EE5\u524D\u5199\u7684\u4E00\u4E9B\u4E1C\u897F-\u2013-\u4E0D\u91CD\u8981",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#cloud\u662F\u4EE5\u524D\u5199\u7684\u4E00\u4E9B\u4E1C\u897F-\u2013-\u4E0D\u91CD\u8981","aria-hidden":"true"},"#"),n(" cloud\u662F\u4EE5\u524D\u5199\u7684\u4E00\u4E9B\u4E1C\u897F \u2013 \u4E0D\u91CD\u8981")],-1),cs={id:"scripts-\u4E00\u4E9B\u811A\u672C",tabindex:"-1"},ds=s("a",{class:"header-anchor",href:"#scripts-\u4E00\u4E9B\u811A\u672C","aria-hidden":"true"},"#",-1),rs=n(),ps={href:"https://github.com/labring/sealos/tree/main/scripts",target:"_blank",rel:"noopener noreferrer"},us=n("scripts"),vs=n(" \u4E00\u4E9B\u811A\u672C"),ms={id:"service",tabindex:"-1"},bs=s("a",{class:"header-anchor",href:"#service","aria-hidden":"true"},"#",-1),hs=n(),ks={href:"https://github.com/labring/sealos/tree/main/service",target:"_blank",rel:"noopener noreferrer"},gs=n("service"),_s=s("p",null,[n("\u6709\u4E00\u4E9B "),s("code",null,"http"),n(" \u670D\u52A1\uFF0C"),s("code",null,"test"),n(" \u5C31\u662F\u96C6\u7FA4\u6D4B\u8BD5\u3002")],-1),fs=s("p",null,[s("code",null,"GitHub"),n(" \u7B2C\u4E09\u65B9\u767B\u9646\u56DE\u8C03~")],-1),ys={id:"pkg-\u5927\u91CF\u7684\u5B9E\u73B0\u90E8\u5206",tabindex:"-1"},xs=s("a",{class:"header-anchor",href:"#pkg-\u5927\u91CF\u7684\u5B9E\u73B0\u90E8\u5206","aria-hidden":"true"},"#",-1),ws=n(),Ss={href:"https://github.com/labring/sealos/tree/main/pkg",target:"_blank",rel:"noopener noreferrer"},Cs=n("pkg"),Ls=n(" \u5927\u91CF\u7684\u5B9E\u73B0\u90E8\u5206"),Es=i(`<p><strong>\u5728\u8FD9\u91CC\uFF0C\u6211\u4EEC\u9700\u8981\u548C<code>cluster.go</code>\u7ED3\u5408\u8D77\u6765\u4E86\uFF0C\u8FD9\u4E2A\u8D2F\u7A7F\u59CB\u7EC8\u7684\uFF0C<code>cluster.go</code>\u63CF\u8FF0\u6574\u4E2A\u96C6\u7FA4\u671F\u671B\u72B6\u6001 -- \u51E0\u4E2A<code>master</code>\uFF0C\u51E0\u4E2A<code>node</code>\uFF0C<code>ssh</code>\u5BC6\u7801\u3001\u7AEF\u53E3\u53F7\u3001\u96C6\u7FA4\u955C\u50CF\u3001\u8D2F\u7A7F\u59CB\u7EC8\uFF0C\u7279\u522B\u7279\u522B\u91CD\u8981 -- <code>sealos run</code> \u4E5F\u662F\u6E32\u67D3\u6210\u7ED3\u6784\u4F53\u4F20\u9012\u7ED9\u5176\u4ED6\u6A21\u5757~</strong></p><blockquote><p>\u4E5F\u662F\u6211\u9700\u8981\u505A\u7684\u4E3B\u8981\u90E8\u5206\uFF1A</p><ul><li><code>apply</code>\uFF1A\u671F\u671B\u72B6\u6001\u548C\u5B9E\u9645\u72B6\u6001\u4E00\u81F4 \u521B\u5EFA\u7684\u65F6\u5019\uFF1A</li><li><code>ssh</code>\uFF1A\u8FDC\u7A0B\u8BBF\u95EE</li><li><code>types</code>\uFF1A\u5F88\u91CD\u8981\uFF0C\u6574\u4E2Apkg\u7ED3\u6784\u4F53\u7684\u5B9A\u4E49\uFF08\u8D2F\u7A7F\u59CB\u7EC8\uFF09</li><li><code>rountime</code>\uFF1A\u7ED3\u70B9\u7684\u5B9E\u73B0 \u2014 \u5B9E\u73B0\u5982\u4F55\u53BB\u88C5 <code>k8s</code></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>buildimage   <span class="token comment">#\u955C\u50CF\u6784\u5EFA</span>
cert k8s  <span class="token comment">#\u8BC1\u4E66\u7BA1\u7406</span>
checker   <span class="token comment">#\u9884\u5904\u7406--\u68C0\u67E5\u96C6\u7FA4\u80FD\u5426\u88C5\u4E0A</span>
client-go   <span class="token comment">#\u8C03\u7528k8s\u63A5\u53E3</span>
cloud   <span class="token comment">#\u662F\u7528rust\u5199\u7684\u524D\u7AEF\u6A21\u5757\uFF0C\u5199\u4E86\u4E00\u534A</span>
config   <span class="token comment">#\u914D\u7F6E\u6587\u4EF6</span>
filesystem   <span class="token comment">#\u5206\u53D1\u5230\u6BCF\u4E2A\u7ED3\u70B9</span>
guest   <span class="token comment">#\u6267\u884C\u955C\u50CF\u7684cmd</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><h2 id="types-\u7C7B\u578B" tabindex="-1"><a class="header-anchor" href="#types-\u7C7B\u578B" aria-hidden="true">#</a> types \u7C7B\u578B</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos pkg<span class="token punctuation">]</span><span class="token comment"># cd types/</span>
<span class="token punctuation">[</span>root@VM-4-6-centos types<span class="token punctuation">]</span><span class="token comment"># tree  </span>
\u251C\u2500\u2500 v1beta1
\u2502   \u251C\u2500\u2500 cluster_args.go
\u2502   \u251C\u2500\u2500 cluster.go  
<span class="token comment"># cluster.go\u63CF\u8FF0\u6574\u4E2A\u96C6\u7FA4\u671F\u671B\u72B6\u6001 -- \u51E0\u4E2Amaster\uFF0C\u51E0\u4E2Anode\uFF0Cssh\u5BC6\u7801\u3001\u7AEF\u53E3\u53F7\u3001\u96C6\u7FA4\u955C\u50CF\u3001\u8D2F\u7A7F\u59CB\u7EC8\uFF0C\u7279\u522B\u7279\u522B\u91CD\u8981  -- sealos run\u4E5F\u662F\u6E32\u67D3\u6210\u7ED3\u6784\u4F53\u4F20\u9012\u7ED9\u5176\u4ED6\u6A21\u5757~</span>
\u2502   \u251C\u2500\u2500 config.go  
\u2502   \u251C\u2500\u2500 constants.go
\u2502   \u251C\u2500\u2500 defaults_cluster.go
\u2502   \u251C\u2500\u2500 defaults.go
\u2502   \u251C\u2500\u2500 defaults_infra.go
\u2502   \u251C\u2500\u2500 doc.go
\u2502   \u251C\u2500\u2500 helper.go
\u2502   \u251C\u2500\u2500 infra.go															
\u2502   \u251C\u2500\u2500 register.go 
\u2502   \u2514\u2500\u2500 zz_generated.deepcopy.go
\u2514\u2500\u2500 validation
    \u2514\u2500\u2500 validation_infra.go

<span class="token number">2</span> directories, <span class="token number">13</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><code>cluster.go</code>\u63CF\u8FF0\u6574\u4E2A\u96C6\u7FA4\u671F\u671B\u72B6\u6001\uFF08\u4F7F\u7528\u7684\u662F\u547D\u4EE4\u5F0F\uFF09 -- \u51E0\u4E2A<code>master</code>\uFF0C\u51E0\u4E2A<code>node</code>\uFF0C<code>ssh</code>\u5BC6\u7801\u3001\u7AEF\u53E3\u53F7\u3001\u96C6\u7FA4\u955C\u50CF\u3001\u8D2F\u7A7F\u59CB\u7EC8\uFF0C\u7279\u522B\u7279\u522B\u91CD\u8981 -- <code>sealos run</code>\u4E5F\u662F\u6E32\u67D3\u6210\u7ED3\u6784\u4F53\u4F20\u9012\u7ED9\u5176\u4ED6\u6A21\u5757~</p><ul><li>\u96C6\u7FA4\u6CA1\u6709\uFF0C\u521B\u5EFA\u3002</li><li>\u96C6\u7FA4\u6709\uFF0C\u5B57\u6BB5\u6328\u7740\u6BD4\u5BF9\u3002</li></ul><p><strong>\u73B0\u5728\u7684\u5199\u6CD5\u4E0D\u662F\u5F88\u6EE1\u610F~\uFF0C\u5BF9\u4E8E\u5347\u7EA7\u7B49\u5176\u4ED6\u64CD\u4F5C\u9700\u8981\u4F18\u5316\u3002</strong></p></blockquote><h3 id="rountime" tabindex="-1"><a class="header-anchor" href="#rountime" aria-hidden="true">#</a> rountime</h3>`,6),qs={href:"https://github.com/labring/sealos/blob/main/pkg/runtime/runtime.go",target:"_blank",rel:"noopener noreferrer"},Is=n("runtime.go"),Fs=i(`<p><strong>\u6211\u4EEC\u770B\u4E0B interface\uFF1A</strong></p><blockquote><p>\u5404\u4E2A\u7ED3\u70B9\u505A\u4E86\u4EC0\u4E48\uFF0C\u6211\u4EEC\u5199\u4E86 <code>*KubeadmRuntime</code> \u5B9E\u73B0\uFF0C\u6211\u4EEC\u4E5F\u53EF\u4EE5\u5199\u4E00\u4E2A\u4E8C\u8FDB\u5236\u7684\u5B9E\u73B0\uFF0C\u4E5F\u53EF\u4EE5\u5199\u4E00\u4E2A <code>k3s</code> \u6216\u8005 <code>k0s</code> \u5B9E\u73B0\u3002</p></blockquote><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">type</span> Interface <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">Reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">JoinNodes</span><span class="token punctuation">(</span>newNodesIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">DeleteNodes</span><span class="token punctuation">(</span>nodeIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">JoinMasters</span><span class="token punctuation">(</span>newMastersIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">DeleteMasters</span><span class="token punctuation">(</span>mastersIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token function">SyncNodeIPVS</span><span class="token punctuation">(</span>mastersIPList<span class="token punctuation">,</span> nodeIPList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ssh\u5E93" tabindex="-1"><a class="header-anchor" href="#ssh\u5E93" aria-hidden="true">#</a> ssh\u5E93</h3><p><code>copy</code> \u6A21\u5757\u5230\u67D0\u4E00\u4E2A\u7ED3\u70B9\uFF0C\u505A\u4E00\u4E9B\u8FDC\u7A0B\u6267\u884C\u547D\u4EE4</p><h2 id="\u76EE\u7684" tabindex="-1"><a class="header-anchor" href="#\u76EE\u7684" aria-hidden="true">#</a> \u76EE\u7684</h2>`,6),Ps={href:"https://github.com/labring/sealos/issues/1943",target:"_blank",rel:"noopener noreferrer"},Ts=n("\u4F7F\u7528k0s\u6216\u8005k3s\u5B9E\u73B0"),As=i(`<div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>sealos run k0s:latest <span class="token parameter variable">--masters</span> xxx <span class="token parameter variable">--nodes</span> xxxx <span class="token parameter variable">--passwd</span> xxxx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="custom-container details"><summary>\u518D\u521B\u5EFA\u4E00\u4E2Ak0s\u6216\u8005k3s\uFF0C\u73B0\u6709\u4E00\u4E2Ak8s</summary><p><img src="http://sm.nsddd.top/smimage-20221023230147303.png" alt="image-20221023230147303"></p><p><strong>\u5C31\u6BD4\u5982\u8BF4\u4E0B\u9762\u7684\u62C9\u53D6\u547D\u4EE4\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># Download and install sealos. sealos is a golang binary so you can just download and copy to bin. You may also download it from release page.</span>
$ <span class="token function">wget</span>  https://github.com/labring/sealos/releases/download/v4.1.3/sealos_4.1.3_linux_amd64.tar.gz  <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
    <span class="token function">tar</span> <span class="token parameter variable">-zxvf</span> sealos_4.1.3_linux_amd64.tar.gz sealos <span class="token operator">&amp;&amp;</span>  <span class="token function">chmod</span> +x sealos <span class="token operator">&amp;&amp;</span> <span class="token function">mv</span> sealos /usr/bin 
<span class="token comment"># Create a cluster	</span>
$ sealos run labring/kubernetes:v1.25.0 labring/helm:v3.8.2 labring/calico:v3.24.1 <span class="token punctuation">\\</span>
     <span class="token parameter variable">--masters</span> <span class="token number">192.168</span>.64.2,192.168.64.22,192.168.64.20 <span class="token punctuation">\\</span>
     <span class="token parameter variable">--nodes</span> <span class="token number">192.168</span>.64.21,192.168.64.19 <span class="token parameter variable">-p</span> <span class="token punctuation">[</span>your-ssh-passwd<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><blockquote><p>\u6CE8\u610F\uFF1A\u6211\u4EEC\u8FD8\u9700\u8981\u5224\u65AD\u8F93\u5165\u7684\u662Fk0s\u8FD8\u662Fk8s\uFF0C\u7136\u540E\u6839\u636E\u8FD9\u4E2A\u6765\u9009\u62E9\u5408\u9002\u7684\u63A5\u53E3\u63A5\u5165~</p></blockquote><h2 id="test" tabindex="-1"><a class="header-anchor" href="#test" aria-hidden="true">#</a> test</h2><p>\u6D4B\u8BD5\uFF0C\u5173\u4E8E makefile</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:/workspces/sealos<span class="token comment"># make help</span>

Usage: <span class="token function">make</span> <span class="token operator">&lt;</span>TARGETS<span class="token operator">&gt;</span> <span class="token operator">&lt;</span>OPTIONS<span class="token operator">&gt;</span> <span class="token punctuation">..</span>.

Targets:
  build                Build <span class="token builtin class-name">source</span> code <span class="token keyword">for</span> <span class="token function">host</span> platform.
  build.multiarch      Build <span class="token builtin class-name">source</span> code <span class="token keyword">for</span> multiple platforms. See option PLATFORMS.
  lint                 Check syntax and styling of go sources.
  <span class="token function">format</span>               Gofmt <span class="token punctuation">(</span>reformat<span class="token punctuation">)</span> package sources.
  coverage             Run unit tests and output <span class="token builtin class-name">test</span> coverage.
  compress             Compress the binaries using upx <span class="token keyword">for</span> <span class="token function">host</span> platform.
  compress.multiarch   Compress the binaries using upx <span class="token keyword">for</span> multiple platforms. See option PLATFORMS.
  verify-license       Verify the license headers <span class="token keyword">for</span> all files.
  add-license          Ensure <span class="token builtin class-name">source</span> code files have license headers.
  gen                  Generate all necessary files.
  tools                Install dependent tools.
  clean                Remove all files that are created by building.
  update-contrib       Update list of contributors.
  <span class="token builtin class-name">help</span>                 Show this <span class="token builtin class-name">help</span> info.

Options:
  DEBUG            Whether or not to generate debug symbols. Default is <span class="token number">0</span>.

  BINS             Binaries to build. Default is all binaries under cmd.
                   This option is available when using: <span class="token function">make</span> <span class="token punctuation">{</span>build/compress<span class="token punctuation">}</span><span class="token punctuation">(</span>.multiarch<span class="token punctuation">)</span>
                   Example: <span class="token function">make</span> build <span class="token assign-left variable">BINS</span><span class="token operator">=</span><span class="token string">&quot;sealos sealctl&quot;</span>

  PLATFORMS        Platform to build for. Default is linux_arm64 and linux_amd64.
                   This option is available when using: <span class="token function">make</span> <span class="token punctuation">{</span>build/compress<span class="token punctuation">}</span>.multiarch
                   Example: <span class="token function">make</span> build.multiarch <span class="token assign-left variable">PLATFORMS</span><span class="token operator">=</span><span class="token string">&quot;linux_arm64 linux_amd64&quot;</span>

  V                Set to <span class="token number">1</span> <span class="token builtin class-name">enable</span> verbose build. Default is <span class="token number">0</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="2.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="4.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,8),Ds=n("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),Ms={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},Ns=s("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),Rs=n(")"),Bs=n("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),Vs={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},Js=n("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function Os(zs,js){const a=l("ExternalLinkIcon"),o=l("RouterLink");return c(),d("div",null,[s("ul",null,[s("li",null,[s("a",u,[v,e(a)])])]),m,b,h,k,s("blockquote",null,[s("p",null,[g,s("a",_,[f,e(a)]),y,s("a",x,[w,e(a)]),S,s("a",C,[L,e(a)])])]),E,q,I,s("h3",F,[P,T,s("a",A,[D,e(a)])]),M,s("p",null,[s("a",N,[R,e(a)]),B,V,J]),O,s("details",z,[j,s("p",null,[G,H,U,Q,W,K,Y,s("a",$,[X,e(a)])]),Z]),ss,s("h2",ns,[es,as,s("a",is,[ls,e(a)]),os]),ts,s("h2",cs,[ds,rs,s("a",ps,[us,e(a)]),vs]),s("h2",ms,[bs,hs,s("a",ks,[gs,e(a)])]),_s,fs,s("h2",ys,[xs,ws,s("a",Ss,[Cs,e(a)]),Ls]),Es,s("ul",null,[s("li",null,[s("a",qs,[Is,e(a)])])]),Fs,s("ul",null,[s("li",null,[s("a",Ps,[Ts,e(a)])])]),As,s("ul",null,[s("li",null,[s("p",null,[e(o,{to:"/"},{default:r(()=>[Ds]),_:1})])]),s("li",null,[s("p",null,[s("a",Ms,[Ns,e(a)]),Rs])]),s("li",null,[s("p",null,[Bs,s("a",Vs,[Js,e(a)])])])])])}const Hs=t(p,[["render",Os],["__file","3.html.vue"]]);export{Hs as default};
