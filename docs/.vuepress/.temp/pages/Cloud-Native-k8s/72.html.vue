<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第72节-prow-的部署方案" tabindex="-1"><a class="header-anchor" href="#第72节-prow-的部署方案" aria-hidden="true">#</a> 第72节 Prow 的部署方案</h1>
<div><a href = '71.md' style='float:left'>⬆️上一节🔗  </a><a href = '73.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>因为上一讲引出 Prow 的部署都比较繁琐，所以这一讲，我们从头开始来，进行 Prow 的部署方案设计。</p>
<p>我使用的组织地址是：https://github.com/openim-sigs</p>
<p>我创建的仓库地址是：https://github.com/openim-sigs/test-infra</p>
<h2 id="安装-kubernetes" tabindex="-1"><a class="header-anchor" href="#安装-kubernetes" aria-hidden="true">#</a> 安装 kubernetes</h2>
<p>使用 kubeadm 安装是一样的，我选择了简单的 sealos 部署，我的机器信息如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>master01<span class="token punctuation">:</span> <span class="token number">43.134</span><span class="token number">.63</span><span class="token number">.160</span>  <span class="token number">10.0</span><span class="token number">.0</span><span class="token number">.9</span>
node01<span class="token punctuation">:</span> <span class="token number">43.128</span><span class="token number">.72</span><span class="token number">.19</span>  <span class="token number">10.0</span><span class="token number">.0</span><span class="token number">.10</span>
node02<span class="token punctuation">:</span> <span class="token number">150.109</span><span class="token number">.93</span><span class="token number">.151</span>  <span class="token number">10.0</span><span class="token number">.0</span><span class="token number">.4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sealos:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span>  https://raw.githubusercontent.com/labring/sealos/v4.3.0/scripts/install.sh <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> v4.2.0 labring/sealos
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>kubernets:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>sealos run labring/kubernetes:v1.25.0 labring/helm:v3.8.2 labring/calico:v3.24.1 <span class="token punctuation">\</span>
     <span class="token parameter variable">--masters</span> <span class="token number">10.0</span>.0.9 <span class="token punctuation">\</span>
     <span class="token parameter variable">--nodes</span> <span class="token number">10.0</span>.0.10,10.0.0.4 <span class="token parameter variable">-p</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="github-app" tabindex="-1"><a class="header-anchor" href="#github-app" aria-hidden="true">#</a> GitHub App</h2>
<p>我们之前学习过 Github APP</p>
<p><strong>准备 hmac-token</strong></p>
<p><strong>准备 Github-token</strong></p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<ul>
<li>https://github.com/gitcpu-io/install-prow</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '71.md' style='float:left'>⬆️上一节🔗  </a><a href = '73.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


