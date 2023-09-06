import{_ as r,r as n,o as l,c as d,a as e,b as s,w as c,e as a,d as o}from"./app.2d12850e.js";const p={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},h=a("author"),m=e("h1",{id:"\u7B2C39\u8282-update-containers-vendor-\u66F4\u65B0\u5BB9\u5668\u4F9B\u5E94\u5546",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C39\u8282-update-containers-vendor-\u66F4\u65B0\u5BB9\u5668\u4F9B\u5E94\u5546","aria-hidden":"true"},"#"),a(" \u7B2C39\u8282 Update containers vendor \u66F4\u65B0\u5BB9\u5668\u4F9B\u5E94\u5546")],-1),g=e("div",null,[e("a",{href:"38.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"40.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),v=e("br",null,null,-1),b=a("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),f={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},_=a("sealos"),k=a("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),y={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},w=a("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),x=a("\u3002Myblog:"),I={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},D=a("http://nsddd.top"),q=o('<hr><p>[TOC]</p><h2 id="issue-description" tabindex="-1"><a class="header-anchor" href="#issue-description" aria-hidden="true">#</a> Issue Description</h2><ul><li><p>https://github.com/containers/common/issues/1376</p></li><li><p>https://github.com/sealerio/sealer/issues/2147</p></li><li><p>[ ] support set load tmp dir for save and load, we could set <code>tmp-dir</code> flag to <code>sysContext.BigFilesTemporaryDir</code>.</p></li><li><p>[ ] Waiting for a separate functions Or string flag from containers SDK, which will not guess what type of input tar file. this is more time-saving.</p></li></ul>',4),E=a("more to see : "),C={href:"https://github.com/containers/common/issues/1376",target:"_blank",rel:"noopener noreferrer"},L=a("containers/common#1376"),T=o(`<h3 id="describe-what-feature-you-want" tabindex="-1"><a class="header-anchor" href="#describe-what-feature-you-want" aria-hidden="true">#</a> Describe what feature you want</h3><p>for 1 , we could use <code>--tmp-dir</code> flag to do it.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>sealer load <span class="token parameter variable">-i</span> my.tar --tmp-dir /root/my-tmp
sealer save abc:v1 <span class="token parameter variable">-o</span> my.tar --tmp-dir /root/my-tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>load: load a sealer image from a tar file: Load the sealer image from the tar file</li><li>save: save sealer image to a tar file : Save Save the sealer image as a tar file</li></ul><p>related go mod version:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>go get  github.com/containers/buildah@v1.29.1
go get  github.com/containers/common@v0.51.0
go get  github.com/containers/image/v5@v5.24.1
go get  github.com/containers/ocicrypt@v1.1.7
go get  github.com/containers/storage@v1.45.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="optimize-add-a-new-parameter-to-loadoptions" tabindex="-1"><a class="header-anchor" href="#optimize-add-a-new-parameter-to-loadoptions" aria-hidden="true">#</a> [optimize] add a new parameter to LoadOptions</h2><p>I found that If i knew the format of the tar file in advance , the program wouldn&#39;t need to guess the format, which will save a lot of time.</p><p>so , should we add a new parameter to indicate the format of load package on <code>LoadOptions</code> ?</p><ul><li>https://github.com/containers/common/blob/28ebcc64cf9af714badd8abd5521ed49545642c0/libimage/load.go#L33</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>// we have <span class="token number">4</span> functions, so a maximum of <span class="token number">4</span> errors
loadErrors :<span class="token operator">=</span> make<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>error, <span class="token number">0</span>, <span class="token number">4</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> _, f :<span class="token operator">=</span> range <span class="token punctuation">[</span><span class="token punctuation">]</span>func<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>string, string, error<span class="token punctuation">)</span><span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That sounds like a nice improvement assuming the user knows exactly the format of the archive.</p><p>If this is for a new caller, I think a set of separate functions (<code>Runtime.LoadDockerArchive</code> etc.) would be simpler.</p><p>If this is for the primary <code>podman load $path</code> code path, yes, an option probably makes sense \u2014 and it would be great to update as many callers as possible to use that option; heuristically guessing among four possibly quite expensive readers is very inefficient and historically resulted in bad error messages (which we have, sort of, fixed by just listing all of the error messages\u2026)</p><h3 id="set-up-temporary-directory" tabindex="-1"><a class="header-anchor" href="#set-up-temporary-directory" aria-hidden="true">#</a> Set up temporary directory</h3><p>the reason is that some image is very large, and require at least three times free disk to load. I see that current default temporary directory is the <code>/var/tmp/</code> directory. If we could set the work temporary directory, we can separate it from the system disk which will avoid load failure.</p><p>That\u2019s configurable in c/image via <code>BigFilesTemporaryDir</code>, and c/common/libimage seems to read <code>containers.conf</code> for that at least in some places, so that would be the setting to tweak. (I didn\u2019t check if <code>LoadDockerArchive</code> applies this setting; if not, that should be added.)</p><p>Yes setting this in containers.conf, or setting the TMPDIR environment variable allow you to customize this.</p><h2 id="\u8BA1\u5212" tabindex="-1"><a class="header-anchor" href="#\u8BA1\u5212" aria-hidden="true">#</a> \u8BA1\u5212</h2><p><strong>For sealer :</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sealer save abc:v1 -o my.tar --tmp-dir /root/my-tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><p>[x] add a flag</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>	// TODO: Waiting <span class="token keyword">for</span> implementation, not yet supported
	flags.StringVar<span class="token punctuation">(</span><span class="token operator">&amp;</span>loadOpts.TmpDir, <span class="token string">&quot;tmp-dir&quot;</span>, <span class="token string">&quot;&quot;</span>, <span class="token string">&quot;Set temporary directory when load image. if not set, use system temporary directory(<span class="token variable"><span class="token variable">\`</span>/var/tmp/<span class="token variable">\`</span></span>)&quot;</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>[ ] come true <code>MultiImageArchive</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>	// MultiImageArchive - <span class="token keyword">if</span> true, the container engine allows <span class="token keyword">for</span> storing
	// archives <span class="token punctuation">(</span>e.g., of the docker-archive transport<span class="token punctuation">)</span> with multiple
	// images.  By default, Podman creates single-image archives.
	MultiImageArchive bool <span class="token variable"><span class="token variable">\`</span>toml:<span class="token string">&quot;multi_image_archive,omitempty&quot;</span><span class="token variable">\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>[ ] update pack</p></li><li><p>[ ] Temporary load directory primitives, garbage collection</p></li></ul><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="38.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="40.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,24),A=a("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),S={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},B=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),O=a(")"),z=a("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),M={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},N=a("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function V(F,R){const t=n("ExternalLinkIcon"),i=n("RouterLink");return l(),d("div",null,[e("ul",null,[e("li",null,[e("a",u,[h,s(t)])])]),m,g,v,e("blockquote",null,[e("p",null,[b,e("a",f,[_,s(t)]),k,e("a",y,[w,s(t)]),x,e("a",I,[D,s(t)])])]),q,e("p",null,[E,e("a",C,[L,s(t)])]),T,e("ul",null,[e("li",null,[e("p",null,[s(i,{to:"/"},{default:c(()=>[A]),_:1})])]),e("li",null,[e("p",null,[e("a",S,[B,s(t)]),O])]),e("li",null,[e("p",null,[z,e("a",M,[N,s(t)])])])])])}const P=r(p,[["render",V],["__file","39.html.vue"]]);export{P as default};