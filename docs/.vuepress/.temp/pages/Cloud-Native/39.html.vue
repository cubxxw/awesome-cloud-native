<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第39节-update-containers-vendor-更新容器供应商" tabindex="-1"><a class="header-anchor" href="#第39节-update-containers-vendor-更新容器供应商" aria-hidden="true">#</a> 第39节 Update containers vendor 更新容器供应商</h1>
<div><a href = '38.md' style='float:left'>⬆️上一节🔗  </a><a href = '40.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="issue-description" tabindex="-1"><a class="header-anchor" href="#issue-description" aria-hidden="true">#</a> Issue Description</h2>
<ul>
<li>
<p>https://github.com/containers/common/issues/1376</p>
</li>
<li>
<p>https://github.com/sealerio/sealer/issues/2147</p>
</li>
<li>
<p>[ ] support set load tmp dir for save and load, we could set <code v-pre>tmp-dir</code> flag to <code v-pre>sysContext.BigFilesTemporaryDir</code>.</p>
</li>
<li>
<p>[ ] Waiting for a separate functions Or string flag from containers SDK, which will not guess what type of input tar file. this is more time-saving.</p>
</li>
</ul>
<p>more to see : <a href="https://github.com/containers/common/issues/1376" target="_blank" rel="noopener noreferrer">containers/common#1376<ExternalLinkIcon/></a></p>
<h3 id="describe-what-feature-you-want" tabindex="-1"><a class="header-anchor" href="#describe-what-feature-you-want" aria-hidden="true">#</a> Describe what feature you want</h3>
<p>for 1 , we could use <code v-pre>--tmp-dir</code> flag to do it.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealer load <span class="token parameter variable">-i</span> my.tar --tmp-dir /root/my-tmp
sealer save abc:v1 <span class="token parameter variable">-o</span> my.tar --tmp-dir /root/my-tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>load: load a sealer image from a tar file: Load the sealer image from the tar file</li>
<li>save: save sealer image to a tar file : Save Save the sealer image as a tar file</li>
</ul>
<p>related go mod version:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go get  github.com/containers/buildah@v1.29.1
go get  github.com/containers/common@v0.51.0
go get  github.com/containers/image/v5@v5.24.1
go get  github.com/containers/ocicrypt@v1.1.7
go get  github.com/containers/storage@v1.45.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="optimize-add-a-new-parameter-to-loadoptions" tabindex="-1"><a class="header-anchor" href="#optimize-add-a-new-parameter-to-loadoptions" aria-hidden="true">#</a> [optimize] add a new parameter to LoadOptions</h2>
<p>I found that If i knew the format of the tar file in advance , the program wouldn't need to guess the format, which will save a lot of time.</p>
<p>so , should we add a new parameter to indicate the format of load package on <code v-pre>LoadOptions</code> ?</p>
<ul>
<li>https://github.com/containers/common/blob/28ebcc64cf9af714badd8abd5521ed49545642c0/libimage/load.go#L33</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>// we have <span class="token number">4</span> functions, so a maximum of <span class="token number">4</span> errors
loadErrors :<span class="token operator">=</span> make<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>error, <span class="token number">0</span>, <span class="token number">4</span><span class="token punctuation">)</span>
<span class="token keyword">for</span> _, f :<span class="token operator">=</span> range <span class="token punctuation">[</span><span class="token punctuation">]</span>func<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>string, string, error<span class="token punctuation">)</span><span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That sounds like a nice improvement assuming the user knows exactly the format of the archive.</p>
<p>If this is for a new caller, I think a set of separate functions (<code v-pre>Runtime.LoadDockerArchive</code> etc.) would be simpler.</p>
<p>If this is for the primary <code v-pre>podman load $path</code> code path, yes, an option probably makes sense — and it would be great to update as many callers as possible to use that option; heuristically guessing among four possibly quite expensive readers is very inefficient and historically resulted in bad error messages (which we have, sort of, fixed by just listing all of the error messages…)</p>
<h3 id="set-up-temporary-directory" tabindex="-1"><a class="header-anchor" href="#set-up-temporary-directory" aria-hidden="true">#</a> Set up temporary directory</h3>
<p>the reason is that some image is very large, and require at least three times free disk to load. I see that current default temporary directory is the <code v-pre>/var/tmp/</code> directory. If we could set the work temporary directory, we can separate it from the system disk which will avoid load failure.</p>
<p>That’s configurable in c/image via <code v-pre>BigFilesTemporaryDir</code>, and c/common/libimage seems to read <code v-pre>containers.conf</code> for that at least in some places, so that would be the setting to tweak. (I didn’t check if <code v-pre>LoadDockerArchive</code> applies this setting; if not, that should be added.)</p>
<p>Yes setting this in containers.conf, or setting the TMPDIR environment variable allow you to customize this.</p>
<h2 id="计划" tabindex="-1"><a class="header-anchor" href="#计划" aria-hidden="true">#</a> 计划</h2>
<p><strong>For sealer :</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sealer save abc:v1 -o my.tar --tmp-dir /root/my-tmp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>[x]  add a flag</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>	// TODO: Waiting <span class="token keyword">for</span> implementation, not yet supported
	flags.StringVar<span class="token punctuation">(</span><span class="token operator">&amp;</span>loadOpts.TmpDir, <span class="token string">"tmp-dir"</span>, <span class="token string">""</span>, <span class="token string">"Set temporary directory when load image. if not set, use system temporary directory(<span class="token variable"><span class="token variable">`</span>/var/tmp/<span class="token variable">`</span></span>)"</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>[ ] come true <code v-pre>MultiImageArchive</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>	// MultiImageArchive - <span class="token keyword">if</span> true, the container engine allows <span class="token keyword">for</span> storing
	// archives <span class="token punctuation">(</span>e.g., of the docker-archive transport<span class="token punctuation">)</span> with multiple
	// images.  By default, Podman creates single-image archives.
	MultiImageArchive bool <span class="token variable"><span class="token variable">`</span>toml:<span class="token string">"multi_image_archive,omitempty"</span><span class="token variable">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>[ ] update pack</p>
</li>
<li>
<p>[ ] Temporary load directory primitives, garbage collection</p>
</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '38.md' style='float:left'>⬆️上一节🔗  </a><a href = '40.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://nsddd.top/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


