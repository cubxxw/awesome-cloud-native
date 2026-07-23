<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第33节-sealos-pr" tabindex="-1"><a class="header-anchor" href="#第33节-sealos-pr" aria-hidden="true">#</a> 第33节 sealos PR</h1>
<div><a href = '32.md' style='float:left'>⬆️上一节🔗  </a><a href = '34.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h1 id="planning-draft" tabindex="-1"><a class="header-anchor" href="#planning-draft" aria-hidden="true">#</a> Planning Draft</h1>
<h2 id="problem-description" tabindex="-1"><a class="header-anchor" href="#problem-description" aria-hidden="true">#</a> Problem Description</h2>
<p>#2863</p>
<p>Sealos currently does not support the k3s runtime and requires the redesign of the runtime interface to avoid excessive coupling with the Processor and to add verification.</p>
<p>Here is a record of <a href="https://docker.cubxxw.com/Cloud-Native-k8s/15.html" target="_blank" rel="noopener noreferrer">testing various k3s installation methods<ExternalLinkIcon/></a>. If you're curious about k3s, be sure to read <a href="https://docker.cubxxw.com/Cloud-Native-k8s/14.html" target="_blank" rel="noopener noreferrer">this note<ExternalLinkIcon/></a>, as well as k3s • <strong><a href="https://www.rancher.cn/k3s/" target="_blank" rel="noopener noreferrer">official<ExternalLinkIcon/></a> and <a href="https://docs.rancher.cn/" target="_blank" rel="noopener noreferrer">documentation<ExternalLinkIcon/></a></strong>, and its GitHub • <strong><a href="https://github.com/k3s-io/k3s/" target="_blank" rel="noopener noreferrer">open source address<ExternalLinkIcon/></a></strong>.</p>
<br>
<h2 id="solution" tabindex="-1"><a class="header-anchor" href="#solution" aria-hidden="true">#</a> Solution</h2>
<h4 id="design-a-new-runtime-interface" tabindex="-1"><a class="header-anchor" href="#design-a-new-runtime-interface" aria-hidden="true">#</a> Design a new runtime interface</h4>
<p>Redesign the runtime interface to avoid excessive coupling with the Processor and add verification.</p>
<h4 id="design-ideas-for-the-k3s-runtime-module" tabindex="-1"><a class="header-anchor" href="#design-ideas-for-the-k3s-runtime-module" aria-hidden="true">#</a> Design ideas for the k3s runtime module</h4>
<p>To support the k3s runtime, we need to add a new runtime module. This module needs to support the following functions:</p>
<ul>
<li>Execute k3s installation commands</li>
<li>Execute k3s upgrade commands</li>
<li>Execute k3s uninstall commands</li>
</ul>
<h4 id="design-the-k3s-directory-and-filesystem-distribution-using-sealos-image-distribution-logic" tabindex="-1"><a class="header-anchor" href="#design-the-k3s-directory-and-filesystem-distribution-using-sealos-image-distribution-logic" aria-hidden="true">#</a> Design the k3s directory and filesystem distribution using Sealos' image distribution logic</h4>
<p>To support the k3s runtime, we need to use Sealos' image distribution logic to design the k3s directory and filesystem distribution of the k3s image.</p>
<h4 id="optimize-the-packaging-of-kubeadm-and-k3s-binaries" tabindex="-1"><a class="header-anchor" href="#optimize-the-packaging-of-kubeadm-and-k3s-binaries" aria-hidden="true">#</a> Optimize the packaging of kubeadm and k3s binaries</h4>
<p>To support the k3s runtime, we need to optimize the packaging of kubeadm and k3s binaries.</p>
<h4 id="provide-unit-test-and-ci-flow-to-ensure-code-quality" tabindex="-1"><a class="header-anchor" href="#provide-unit-test-and-ci-flow-to-ensure-code-quality" aria-hidden="true">#</a> Provide unit test and CI flow to ensure code quality</h4>
<p>To ensure code quality, we need to provide unit testing and CI flow.</p>
<br>
<h2 id="tasks" tabindex="-1"><a class="header-anchor" href="#tasks" aria-hidden="true">#</a> Tasks</h2>
<table>
<thead>
<tr>
<th>Type</th>
<th>Improvements</th>
<th>Issue</th>
<th>PR</th>
<th>Status</th>
</tr>
</thead>
<tbody>
<tr>
<td>🚀 Feature</td>
<td>Design a new runtime interface to avoid excessive coupling with the Processor and add verification</td>
<td>#1943, #2037</td>
<td></td>
<td>✅</td>
</tr>
<tr>
<td>🔨 Enhancement</td>
<td>Implement the k3s runtime module to support k3s installation, upgrade, and uninstall commands</td>
<td></td>
<td></td>
<td>❌</td>
</tr>
<tr>
<td>🔧 Maintenance</td>
<td>Design the k3s directory and filesystem distribution using Sealos' image distribution logic</td>
<td></td>
<td></td>
<td>❌</td>
</tr>
<tr>
<td>👌 Refactoring</td>
<td>Optimize the packaging of kubeadm and k3s binaries</td>
<td></td>
<td></td>
<td>❌</td>
</tr>
<tr>
<td>🧪 Testing</td>
<td>Provide unit testing and CI flow to ensure code quality</td>
<td></td>
<td></td>
<td>❌</td>
</tr>
<tr>
<td>📈 Metrics</td>
<td>Compare k3s and k0s, as well as Kubernetes for various changes in sealos, for users to choose according to their scenarios</td>
<td></td>
<td></td>
<td>❌</td>
</tr>
<tr>
<td>🎯 Fix</td>
<td>The current logic of sealos run will parse the environment variable $, which inevitably needs to be fixed.</td>
<td>#2861</td>
<td>#2862</td>
<td>✅</td>
</tr>
</tbody>
</table>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '32.md' style='float:left'>⬆️上一节🔗  </a><a href = '34.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


