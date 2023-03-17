<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第32节-horizon-issues-46" tabindex="-1"><a class="header-anchor" href="#第32节-horizon-issues-46" aria-hidden="true">#</a> 第32节 horizon issues #46</h1>
<div><a href = '31.md' style='float:left'>⬆️上一节🔗  </a><a href = '33.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="helm-install-set-host" tabindex="-1"><a class="header-anchor" href="#helm-install-set-host" aria-hidden="true">#</a> helm install --set host</h2>
<p><strong>What would you like to be added</strong>:</p>
<p>helm 在腾讯云安装时候，需要改变hosts，文档告知 helm --set 对用户比较好，同时一些外部以来如<code v-pre>gitlab</code>和<code v-pre>registry</code>可选安装</p>
<p><strong>Helm：</strong></p>
<ul>
<li>https://artifacthub.io/packages/search?ts_query_web=horizon+&amp;sort=relevance&amp;page=1</li>
</ul>
<h2 id="procedure" tabindex="-1"><a class="header-anchor" href="#procedure" aria-hidden="true">#</a> procedure</h2>
<ul>
<li>https://github.com/horizoncd/helm-charts/</li>
</ul>
<p><a href="https://helm.sh/" target="_blank" rel="noopener noreferrer">必须安装Helm<ExternalLinkIcon/></a>才能使用图表。请参阅 Helm 的<a href="https://helm.sh/docs/" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>以开始使用。</p>
<p>正确设置 Helm 后，按如下方式添加存储库：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ helm repo <span class="token function">add</span> horizon https://horizoncd.github.io/helm-charts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后您可以运行<code v-pre>helm search repo horizon</code>以查看图表。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ helm search repo horizon
NAME                    CHART VERSION   APP VERSION     DESCRIPTION                                       
horizon/horizon         <span class="token number">2.1</span>.1           v2.0.5          A CICD DevOps Platform                            
horizon/gitlab          <span class="token number">2.0</span>.2           <span class="token number">15.5</span>.1          GitLab Community Edition                          
horizon/tektoncd        <span class="token number">2.1</span>.0           <span class="token number">0.28</span>.0          Helm chart <span class="token keyword">for</span> Tekton pipelines，Tekton trigger<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://horizoncd.github.io/" target="_blank" rel="noopener noreferrer">所有Horizon<ExternalLinkIcon/></a>社区<a href="https://helm.sh/" target="_blank" rel="noopener noreferrer">Helm<ExternalLinkIcon/></a>图表的源代码都可以在 Github 上找到：<a href="https://github.com/horizoncd/helm-charts/" target="_blank" rel="noopener noreferrer">https://github.com/horizo ncd/helm-charts/<ExternalLinkIcon/></a></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '31.md' style='float:left'>⬆️上一节🔗  </a><a href = '33.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


