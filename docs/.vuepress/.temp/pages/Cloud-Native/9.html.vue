<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第9节-sealer-runtime-stage-2-including-biweekly-meetings" tabindex="-1"><a class="header-anchor" href="#第9节-sealer-runtime-stage-2-including-biweekly-meetings" aria-hidden="true">#</a> 第9节 sealer runtime Stage 2 (including biweekly meetings)</h1>
<div><a href = '8.md' style='float:left'>⬆️上一节🔗  </a><a href = '10.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="code-module" tabindex="-1"><a class="header-anchor" href="#code-module" aria-hidden="true">#</a> code module</h2>
<div class="custom-container tip"><p class="custom-container-title">ISSUES 1859</p>
<p><a href="https://github.com/sealerio/sealer/issues/1859#top" target="_blank" rel="noopener noreferrer">feature] want to implement the k3s runtime module<ExternalLinkIcon/></a>#1859</p>
<p><a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">3293172751<ExternalLinkIcon/></a> opened this issue 前天 · 4 comments</p>
<p>What a good start <a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">@3293172751<ExternalLinkIcon/></a>! Now i have some suggestions maybe make you more understand about sealer runtime.</p>
<p>the Achieve Interface step is definitely correct. but it would be some misunderstand about k3s's cluterimage rootfs in your chapter  <em><strong>k3s - rootfs</strong></em> , i think we do not need to care too much about k3s install package distribution in this stage. I propose a step which is my learning path of sealer,FYI <a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">@3293172751<ExternalLinkIcon/></a> .</p>
<ul>
<li>k8s runtiem interface 逻辑是什么?</li>
<li>sealer 如何以及何时安装私人注册表?</li>
<li>runtime module 如何与 rootfs 中的脚本交互?</li>
</ul>
</div>
<h2 id="k3s-module" tabindex="-1"><a class="header-anchor" href="#k3s-module" aria-hidden="true">#</a> k3s module</h2>
<div class="custom-container tip"><p class="custom-container-title">ISSUE</p>
<p>And you mentioned about the k3s installation [online\offline]. I have little confusions.
If sqlite couldn't support cluster HA installation? How to specify the database?
Another question is about install step. AFAIK, k3s support join node by <code v-pre>k3s agent</code> <code v-pre>k3s server</code>, so whether you tried this method?
Last, k3s support custom private registry, how to config this? and whether k3s could support external CRI? <a href="https://github.com/3293172751" target="_blank" rel="noopener noreferrer">@3293172751<ExternalLinkIcon/></a></p>
<p>最后，k3s支持自定义私有注册表，如何配置?k3是否可以支持外部CRI?</p>
<p>🎉about [online\offline]</p>
<p>🎉 about HA install and  single node</p>
</div>
<p>⚠️ k3s <a href="https://github.com/k3s-io/k3s/discussions/6478" target="_blank" rel="noopener noreferrer">discussions 6478<ExternalLinkIcon/></a> 一些答疑和讨论~</p>
<h3 id="k8s-runtiem-interface-逻辑是什么" tabindex="-1"><a class="header-anchor" href="#k8s-runtiem-interface-逻辑是什么" aria-hidden="true">#</a> k8s runtiem interface 逻辑是什么?</h3>
<h2 id="关于设计统一的interface" tabindex="-1"><a class="header-anchor" href="#关于设计统一的interface" aria-hidden="true">#</a> 关于设计统一的interface</h2>
<p><strong>希望在接口 <code v-pre>interface</code>层实现各个模块的功能，统一暴露出去：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>seal run k3s~
seal run k0s~
seal run kuberntes~
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="作者" tabindex="-1"><a class="header-anchor" href="#作者" aria-hidden="true">#</a> 作者</h3>
<p>另一个问题是关于安装步骤。AFAIK，k3s 支持通过 k3s 代理 k3s 服务器加入节点吗？ 最后，k3s支持<code v-pre>自定义私有registry</code>，这个怎么配置？k3s能不能支持外部CRI？</p>
<blockquote>
<p>k3s支持通过 <code v-pre>k3s agent k3s server</code> 加入节点吗？是的，<code v-pre>k3s agent</code>节点可以加入另一个正在运行的节点的集群<code v-pre>k3s server</code>。这就是你想问的吗？k3s 支持自定义私有注册中心，</p>
<p>如何配置？您有机会查看文档吗？https://docs.k3s.io/installation/private-registryk3s</p>
<p>可以支持外部 CRI 吗？是的，使用 <code v-pre>--docker</code> 或 <code v-pre>--container-runtime-endpoint</code>。上面提到的 <code v-pre>registries.yaml</code> 支持仅适用于嵌入式 <code v-pre>containerd</code>；如果您自带 <code v-pre>CRI</code>，则由您自行正确配置。</p>
</blockquote>
<h3 id="注册表" tabindex="-1"><a class="header-anchor" href="#注册表" aria-hidden="true">#</a> 注册表</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// GenerateCert generate the containerd CA for registry TLS and k0s join token for 100 years.</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>k <span class="token operator">*</span>Runtime<span class="token punctuation">)</span> <span class="token function">GenerateCert</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> k<span class="token punctuation">.</span><span class="token function">generateK0sToken</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> k<span class="token punctuation">.</span><span class="token function">GenerateRegistryCert</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> k<span class="token punctuation">.</span><span class="token function">SendRegistryCert</span><span class="token punctuation">(</span>k<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span><span class="token function">GetMasterIPList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="rootfs交互" tabindex="-1"><a class="header-anchor" href="#rootfs交互" aria-hidden="true">#</a> rootfs交互</h3>
<p><strong>runtime:</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>k <span class="token operator">*</span>Runtime<span class="token punctuation">)</span> <span class="token function">initRegistryCmd</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"cd %s/scripts &amp;&amp; ./init-registry.sh %s %s %s"</span><span class="token punctuation">,</span> k<span class="token punctuation">.</span><span class="token function">getRootfs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> k<span class="token punctuation">.</span>RegConfig<span class="token punctuation">.</span>Port<span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%s/registry"</span><span class="token punctuation">,</span> k<span class="token punctuation">.</span><span class="token function">getRootfs</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> k<span class="token punctuation">.</span>RegConfig<span class="token punctuation">.</span>Domain<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// getRootfs return the rootfs dir like: /var/lib/sealer/data/my-k0s-cluster/rootfs</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>k <span class="token operator">*</span>Runtime<span class="token punctuation">)</span> <span class="token function">getRootfs</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> common<span class="token punctuation">.</span><span class="token function">DefaultTheClusterRootfsDir</span><span class="token punctuation">(</span>k<span class="token punctuation">.</span>cluster<span class="token punctuation">.</span>Name<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">//common</span>
<span class="token keyword">func</span> <span class="token function">DefaultTheClusterRootfsDir</span><span class="token punctuation">(</span>clusterName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>DefaultSealerDataDir<span class="token punctuation">,</span> clusterName<span class="token punctuation">,</span> <span class="token string">"rootfs"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

DefaultSealerDataDir          <span class="token operator">=</span> <span class="token string">"/var/lib/sealer/data"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '8.md' style='float:left'>⬆️上一节🔗  </a><a href = '10.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


