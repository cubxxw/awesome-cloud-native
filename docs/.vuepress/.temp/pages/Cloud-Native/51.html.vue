<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第51节-k8sgpt" tabindex="-1"><a class="header-anchor" href="#第51节-k8sgpt" aria-hidden="true">#</a> 第51节 k8sgpt</h1>
<div><a href = '50.md' style='float:left'>⬆️上一节🔗  </a><a href = '52.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>我也是 k8sgpt 社区的一员，参与 <code v-pre>k8sgpt</code> 社区的打造和维护，它让 Kubernetes 和 AI 结合起来，非常棒~</p>
<p>这是它的 GitHub 地址：</p>
<ul>
<li><a href="https://github.com/k8sgpt-ai/k8sgpt" target="_blank" rel="noopener noreferrer">k8sgpt<ExternalLinkIcon/></a></li>
</ul>
<table>
<thead>
<tr>
<th>Person</th>
<th>Organization</th>
<th>Other Affiliations</th>
<th>GitHub Username</th>
<th>Gitlab Username</th>
</tr>
</thead>
<tbody>
<tr>
<td>Alex Jones</td>
<td>Canonical</td>
<td>CNCF TAG App Delivery, Open Feature</td>
<td><a href="https://github.com/AlexsJones" target="_blank" rel="noopener noreferrer">alexsjones<ExternalLinkIcon/></a></td>
<td>N/A</td>
</tr>
<tr>
<td>Thomas Schuetz</td>
<td></td>
<td>CNCF TAG App Delivery, Keptn</td>
<td><a href="https://github.com/thschue" target="_blank" rel="noopener noreferrer">thschue<ExternalLinkIcon/></a></td>
<td>N/A</td>
</tr>
<tr>
<td>Brad McCoy</td>
<td>Basiq</td>
<td>CNCF, CDF, Keptn</td>
<td><a href="https://github.com/bradmccoydev" target="_blank" rel="noopener noreferrer">bradmccoydev<ExternalLinkIcon/></a></td>
<td>N/A</td>
</tr>
<tr>
<td>Johannes Kleinlercher</td>
<td>suXess-IT</td>
<td>CNCF App Delivery</td>
<td><a href="https://github.com/jkleinlercher" target="_blank" rel="noopener noreferrer">jkleinlercher<ExternalLinkIcon/></a></td>
<td>N/A</td>
</tr>
<tr>
<td>Roberth Strand</td>
<td>Amesto Fortytwo</td>
<td>CNCF App Delivery, OpenGitOps, Cloud Native Norway</td>
<td><a href="https://github.com/roberthstrand" target="_blank" rel="noopener noreferrer">roberthstrand<ExternalLinkIcon/></a></td>
<td>N/A</td>
</tr>
<tr>
<td>Alexandre Steppé</td>
<td>NapoleonGames</td>
<td></td>
<td><a href="https://github.com/HatiCode" target="_blank" rel="noopener noreferrer">Haticode<ExternalLinkIcon/></a></td>
<td>N/A</td>
</tr>
<tr>
<td>Matthis Holleville</td>
<td>Agicap</td>
<td></td>
<td><a href="https://github.com/matthisholleville" target="_blank" rel="noopener noreferrer">matthisholleville<ExternalLinkIcon/></a></td>
<td>N/A</td>
</tr>
<tr>
<td>Peter Pan</td>
<td>DaoCloud</td>
<td></td>
<td><a href="https://github.com/panpan0000" target="_blank" rel="noopener noreferrer">panpan0000<ExternalLinkIcon/></a></td>
<td>N/A</td>
</tr>
<tr>
<td>Aisuko Li</td>
<td></td>
<td></td>
<td><a href="https://github.com/Aisuko" target="_blank" rel="noopener noreferrer">aisuko<ExternalLinkIcon/></a></td>
<td>N/A</td>
</tr>
<tr>
<td>Rakshit Gondwal</td>
<td></td>
<td>WeMakeDevs</td>
<td><a href="https://github.com/rakshitgondwal" target="_blank" rel="noopener noreferrer">rakshitgondwal<ExternalLinkIcon/></a></td>
<td>N/A</td>
</tr>
<tr>
<td>Xinwei Xiong</td>
<td>OpenIMSDK</td>
<td></td>
<td><a href="https://github.com/cubxxw" target="_blank" rel="noopener noreferrer">cubxxw<ExternalLinkIcon/></a></td>
<td>N/A</td>
</tr>
</tbody>
</table>
<h2 id="快速开始" tabindex="-1"><a class="header-anchor" href="#快速开始" aria-hidden="true">#</a> 快速开始</h2>
<p>目前默认的AI提供商是OpenAI，您将需要从OpenAI生成API密钥</p>
<p>运行 <code v-pre>k8sgpt auth new</code> 在k8sgpt中设置。</p>
<p>运行 <code v-pre>k8sgpt filters</code> 以管理分析仪使用的活动过滤器。默认情况下，在分析期间执行所有过滤器。</p>
<ul>
<li>运行 <code v-pre>k8sgpt analyze</code> 以运行扫描。</li>
<li>并使用 <code v-pre>k8sgpt analyze --explain</code> 获取有关问题的更详细说明。</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '50.md' style='float:left'>⬆️上一节🔗  </a><a href = '52.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


