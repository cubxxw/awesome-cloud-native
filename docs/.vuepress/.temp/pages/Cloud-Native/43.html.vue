<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第43节-k8sgpt-kubernetes-sre超能力" tabindex="-1"><a class="header-anchor" href="#第43节-k8sgpt-kubernetes-sre超能力" aria-hidden="true">#</a> 第43节 k8sgpt Kubernetes SRE超能力</h1>
<div><a href = '42.md' style='float:left'>⬆️上一节🔗  </a><a href = '44.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p><code v-pre>k8sgpt</code>是一个用简单的英语扫描<code v-pre>Kubernetes</code>集群、诊断和分类问题的工具。</p>
<p>它将SRE经验编入其分析程序，并帮助提取最相关的信息，并用人工智能丰富它。</p>
<ul>
<li><a href="https://github.com/k8sgpt-ai/k8sgpt/issues/305" target="_blank" rel="noopener noreferrer">Issues 地址 <ExternalLinkIcon/></a></li>
</ul>
<h2 id="提议" tabindex="-1"><a class="header-anchor" href="#提议" aria-hidden="true">#</a> 提议</h2>
<p>很高兴能看到这样一个很有前景，有未来，而且很活跃的项目，关键是 k8sgpt 有着 chatgpt 的超能力。</p>
<p>作为一个 Kubernetes 的爱好者，也是深深的被 k8sgpt 所吸引，于是我把代码拉取到本地准备深入学习一下 k8sgpt。</p>
<p>我遇到了一些不是很友好的地方：</p>
<ul>
<li>
<p>makefile 并没有提供编译和测试的功能，目前很简单：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">cat</span> Makefile
.PHONY: docker-build
IMG ?<span class="token operator">=</span> ghcr.io/k8sgpt-ai/k8sgpt:latest

deploy:
ifndef SECRET
        <span class="token variable"><span class="token variable">$(</span>error SECRET environment variable is not <span class="token builtin class-name">set</span><span class="token variable">)</span></span>
endif
        kubectl create ns k8sgpt <span class="token operator">||</span> <span class="token boolean">true</span>
        kubectl create secret generic ai-backend-secret --from-literal<span class="token operator">=</span>secret-key<span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>SECRET<span class="token variable">)</span></span> <span class="token parameter variable">--namespace</span><span class="token operator">=</span>k8sgpt <span class="token operator">||</span> <span class="token boolean">true</span>
        kubectl apply <span class="token parameter variable">-f</span> container/manifests
undeploy:
        kubectl delete secret ai-backend-secret <span class="token parameter variable">--namespace</span><span class="token operator">=</span>k8sgpt
        kubectl delete <span class="token parameter variable">-f</span> container/manifests
        kubectl delete ns k8sgpt
docker-build:
        <span class="token function">docker</span> buildx build --build-arg<span class="token operator">=</span>VERSION<span class="token operator">=</span><span class="token string">"$<span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> describe <span class="token parameter variable">--tags</span> <span class="token parameter variable">--abbrev</span><span class="token operator">=</span><span class="token number">0</span><span class="token variable">)</span></span>"</span> --build-arg<span class="token operator">=</span>COMMIT<span class="token operator">=</span><span class="token string">"$<span class="token variable"><span class="token variable">$(</span><span class="token function">git</span> rev-parse <span class="token parameter variable">--short</span> HEAD<span class="token variable">)</span></span>"</span> --build-arg <span class="token assign-left variable">DATE</span><span class="token operator">=</span><span class="token string">"$<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +%FT%TZ<span class="token variable">)</span></span>"</span> <span class="token parameter variable">--platform</span><span class="token operator">=</span><span class="token string">"linux/amd64,linux/arm64"</span> <span class="token parameter variable">-t</span> <span class="token variable">${IMG}</span> <span class="token parameter variable">-f</span> container/Dockerfile <span class="token builtin class-name">.</span> <span class="token parameter variable">--push</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>编译后对 二进制的处理并不是很友好，即使在 <a href="https://github.com/k8sgpt-ai/k8sgpt/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">contributing 文档<ExternalLinkIcon/></a> 中告诉我：Building the binary is as simple as running <code v-pre>go build .</code> in the root of the repository.</p>
</li>
</ul>
<h2 id="建议" tabindex="-1"><a class="header-anchor" href="#建议" aria-hidden="true">#</a> 建议</h2>
<p>作为我参与 k8sgpt 的第一步，想听一听大家的建议，有什么好的功能和提议~</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '42.md' style='float:left'>⬆️上一节🔗  </a><a href = '44.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://cubxxw.com/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


