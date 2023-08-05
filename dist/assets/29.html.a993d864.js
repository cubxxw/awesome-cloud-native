import{_ as r,r as o,o as p,c as l,a as n,b as e,w as c,e as s,d as t}from"./app.ee8200d6.js";const u={},d={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},h=s("author"),m=n("h1",{id:"\u7B2C29\u8282-feat-support-nvidia-docker-and-nonroot-2048",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C29\u8282-feat-support-nvidia-docker-and-nonroot-2048","aria-hidden":"true"},"#"),s(" \u7B2C29\u8282 Feat/support nvidia docker and nonroot #2048")],-1),k=n("div",null,[n("a",{href:"28.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"30.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),b=n("br",null,null,-1),g=s("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),_={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},v=s("sealos"),f=s("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),y={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},x=s("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),w=s("\u3002Myblog:"),C={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},A=s("http://nsddd.top"),S=t('<hr><p>[TOC]</p><h2 id="proposal" tabindex="-1"><a class="header-anchor" href="#proposal" aria-hidden="true">#</a> Proposal</h2><ul><li>https://github.com/sealerio/sealer/pull/2048/</li></ul><p><strong>This PR support two feature:</strong></p><ol><li>Detect nvidia gpu, if exist, should force use docker sock for kubelet</li><li>Support install cluster using non root sudoer.</li></ol><p><strong>Resolved Issue\uFF1A</strong></p>',7),q={href:"https://github.com/sealerio/sealer/issues/2001",target:"_blank",rel:"noopener noreferrer"},I=s("https://github.com/sealerio/sealer/issues/2001"),P={href:"https://github.com/sealerio/sealer/issues/1591",target:"_blank",rel:"noopener noreferrer"},V=s("https://github.com/sealerio/sealer/issues/1591"),E={href:"https://github.com/sealerio/sealer/issues/1999",target:"_blank",rel:"noopener noreferrer"},L=s("https://github.com/sealerio/sealer/issues/1999"),D=t(`<h2 id="learn-github-modify-someone-else-s-pull-request-and-commit" tabindex="-1"><a class="header-anchor" href="#learn-github-modify-someone-else-s-pull-request-and-commit" aria-hidden="true">#</a> Learn GitHub modify someone else&#39;s pull request and commit</h2><p>Sometimes we need to make some changes to the pull request that community developers submit to our project, such as some configuration files and resource files. In this case we can respond directly to the request to make the change, but instead we can use a simpler solution: <strong>we can directly commit to the pull request.</strong></p><p>I&#39;ll take this warehouse as an example~</p><p>As a classic example, this pr and tutorial is very helpful in regulating the development process.</p><p>**First, **Find the pull request branch name that needs to be modified:</p><ul><li>VinceCui:feat/support-nvidia-docker-and-nonroot</li></ul><p><img src="http://sm.nsddd.top/sm202302181813288.png" alt="image-20230218181350175"></p><h3 id="add-remote-repository" tabindex="-1"><a class="header-anchor" href="#add-remote-repository" aria-hidden="true">#</a> Add remote repository</h3><p>**First you need to add the <code>pull request</code> author&#39;s repository locally as another remote repository: **</p><ul><li>https://github.com/VinceCui/sealer/tree/feat/support-nvidia-docker-and-nonroot</li></ul><p><img src="http://sm.nsddd.top/sm202302181837003.png" alt="image-20230218183733938"></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> remote set-url VinceCui https://ghproxy.com/https://github.com/VinceCui/sealer/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**Synchronize warehouse and update remote warehouse content: **</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> fetch VinceCui feat/support-nvidia-docker-and-nonroot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**After the synchronization is complete, we need to switch to the branch from which the other party initiated the pull request, which is the branch from which we want to commit the new commit: **</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> checkout <span class="token parameter variable">-b</span> VinceCui VinceCui/feat/support-nvidia-docker-and-nonroot
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**Submitted and modified: **</p><p>After switching to <code>VinceCui/feat</code> branch, the file changes can be made, and the commit process is the same as usual:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">git</span> commit <span class="token parameter variable">-a</span> <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;feat: something&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Once you&#39;ve made sure the changes are complete and committed, push them to the other repository. Pay attention to the push target branch here, git may prompt inconsistent branch name, just push as prompted:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">git</span> push VinceCui HEAD:main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Once the push is complete, you should be able to see the change on the GitHub pull request page.</p><h2 id="pr-site-solutions" tabindex="-1"><a class="header-anchor" href="#pr-site-solutions" aria-hidden="true">#</a> PR Site Solutions</h2><p>\u5173\u4E8E PR \u4FE1\u606F\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token comment">// InfraDriver treat the entire cluster as an operating system kernel,</span>
<span class="token comment">// interface function here is the target system call.</span>
<span class="token keyword">type</span> InfraDriver <span class="token keyword">interface</span> <span class="token punctuation">{</span>
        <span class="token comment">// CmdAsync exec command on remote host, and asynchronous return logs</span>
<span class="token operator">-</span>        <span class="token function">CmdAsync</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> cmd <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token operator">+</span>        <span class="token function">CmdAsync</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> env <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> cmd <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
        <span class="token comment">// Cmd exec command on remote host, and return combined standard output and standard error</span>
<span class="token operator">-</span>        <span class="token function">Cmd</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> cmd <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token operator">+</span>        <span class="token function">Cmd</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> env <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> cmd <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
        <span class="token comment">// CmdToString exec command on remote host, and return spilt standard output and standard error</span>
<span class="token operator">-</span>        <span class="token function">CmdToString</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> cmd<span class="token punctuation">,</span> spilt <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token operator">+</span>        <span class="token function">CmdToString</span><span class="token punctuation">(</span>host net<span class="token punctuation">.</span>IP<span class="token punctuation">,</span> env <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> cmd<span class="token punctuation">,</span> spilt <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="resolve" tabindex="-1"><a class="header-anchor" href="#resolve" aria-hidden="true">#</a> resolve</h4>`,26),R=s("Resolved issue: "),N={href:"https://github.com/sealerio/sealer/issues/1491",target:"_blank",rel:"noopener noreferrer"},T=s("#1491"),F=s("\u3001"),$={href:"https://github.com/sealerio/sealer/issues/1999",target:"_blank",rel:"noopener noreferrer"},O=s("#1999"),B=t(`<p><strong>Resolved remote read permission to <code>sshd_config</code> file:</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">ls</span> <span class="token parameter variable">-al</span> /etc/ssh/sshd_config
-rw------- <span class="token number">1</span> root root <span class="token number">3797</span> Feb <span class="token number">15</span> <span class="token number">16</span>:35 /etc/ssh/sshd_config
$ <span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">644</span> /etc/ssh/sshd_config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="existing-problem" tabindex="-1"><a class="header-anchor" href="#existing-problem" aria-hidden="true">#</a> existing problem</h4><ul><li><strong>Still needs to assign non-secret permissions to user sudo(Every node except master0):</strong></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># echo &quot;sealer ALL=(ALL) NOPASSWD: NOPASSWD: ALL&quot; &gt;&gt; /etc/sudoers</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,5),z=s("The rootless feature of "),H={href:"https://github.com/containers/buildah",target:"_blank",rel:"noopener noreferrer"},W=s("buildah"),j=s(" is not addressed:"),G=n("h2",{id:"end-links",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#end-links","aria-hidden":"true"},"#"),s(" END Links")],-1),M=n("ul",null,[n("li",null,[n("div",null,[n("a",{href:"28.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"30.md",style:{float:"right"}}," \uFE0F\u4E0B\u4E00\u8282\u{1F517}")])])],-1),Y=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),J={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},K=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),Q=s(")"),U=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),X={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},Z=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function nn(sn,en){const a=o("ExternalLinkIcon"),i=o("RouterLink");return p(),l("div",null,[n("ul",null,[n("li",null,[n("a",d,[h,e(a)])])]),m,k,b,n("blockquote",null,[n("p",null,[g,n("a",_,[v,e(a)]),f,n("a",y,[x,e(a)]),w,n("a",C,[A,e(a)])])]),S,n("ul",null,[n("li",null,[n("a",q,[I,e(a)])]),n("li",null,[n("a",P,[V,e(a)])]),n("li",null,[n("a",E,[L,e(a)])])]),D,n("p",null,[R,n("a",N,[T,e(a)]),F,n("a",$,[O,e(a)])]),B,n("ul",null,[n("li",null,[n("strong",null,[z,n("a",H,[W,e(a)]),j])])]),G,M,n("ul",null,[n("li",null,[n("p",null,[e(i,{to:"/"},{default:c(()=>[Y]),_:1})])]),n("li",null,[n("p",null,[n("a",J,[K,e(a)]),Q])]),n("li",null,[n("p",null,[U,n("a",X,[Z,e(a)])])])])])}const tn=r(u,[["render",nn],["__file","29.html.vue"]]);export{tn as default};
