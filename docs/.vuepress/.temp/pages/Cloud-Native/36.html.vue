<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第36节-feature-request-local-installation-with-k3s-support-for-horizoncd" tabindex="-1"><a class="header-anchor" href="#第36节-feature-request-local-installation-with-k3s-support-for-horizoncd" aria-hidden="true">#</a> 第36节 Feature Request: Local Installation with k3s Support for HorizonCD</h1>
<div><a href = '35.md' style='float:left'>⬆️上一节🔗  </a><a href = '37.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="background" tabindex="-1"><a class="header-anchor" href="#background" aria-hidden="true">#</a> Background</h2>
<p>HorizonCD is a platform for continuous delivery and deployment that supports multiple deployment targets. Currently, HorizonCD only supports Kubernetes(minikube、kind) as a deployment target, but there is a growing demand for support of local installations.</p>
<h2 id="objective" tabindex="-1"><a class="header-anchor" href="#objective" aria-hidden="true">#</a> Objective</h2>
<p>The objective of this feature request is to add support for local installations using k3s, a lightweight Kubernetes distribution that is optimized for production workloads in resource-constrained environments.</p>
<h2 id="design" tabindex="-1"><a class="header-anchor" href="#design" aria-hidden="true">#</a> Design</h2>
<p>The following table outlines the design considerations for this feature request:</p>
<table>
<thead>
<tr>
<th>Design Consideration</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>Compatibility</td>
<td>Investigate if k3s meets the business requirements of HorizonCD</td>
</tr>
<tr>
<td>HorizonCD Version</td>
<td>Choose the most appropriate version of HorizonCD to support local installations with k3s</td>
</tr>
<tr>
<td>Container Runtime</td>
<td>Choose the appropriate CRI (Docker or Containerd) for the local installation</td>
</tr>
<tr>
<td>Helm Controller</td>
<td>Determine if the Helm controller is required for installation or if it can be installed without the Helm CLI</td>
</tr>
</tbody>
</table>
<h2 id="implementation-steps" tabindex="-1"><a class="header-anchor" href="#implementation-steps" aria-hidden="true">#</a> Implementation Steps</h2>
<p>The following steps will be taken to implement this feature request:</p>
<table>
<thead>
<tr>
<th>Implementation Steps</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>k3s Installation Script</td>
<td>Develop an installation script to deploy k3s</td>
</tr>
<tr>
<td>HorizonCD Directory Structure</td>
<td>Choose an appropriate directory structure for HorizonCD on the local installation</td>
</tr>
<tr>
<td>Docker Installation</td>
<td>Determine if Docker is required for the local installation</td>
</tr>
<tr>
<td>Makefile Deployment</td>
<td>Develop a Makefile for one-click deployment of the local installation</td>
</tr>
</tbody>
</table>
<h2 id="tasks" tabindex="-1"><a class="header-anchor" href="#tasks" aria-hidden="true">#</a> Tasks</h2>
<p>The current horizonci has a lot to improve in testing and CI, count the PR</p>
<table>
<thead>
<tr>
<th>Type</th>
<th>Improvements</th>
<th>Issue</th>
<th>PR</th>
<th>Status</th>
<th></th>
</tr>
</thead>
<tbody>
<tr>
<td>Makefile</td>
<td>Give the help information of Makefile to make it more readable, give some necessary lab</td>
<td></td>
<td>#65</td>
<td>✅</td>
<td></td>
</tr>
<tr>
<td>k3s-install</td>
<td>Suitable for developer local lightweight installation</td>
<td></td>
<td></td>
<td>❌</td>
<td></td>
</tr>
</tbody>
</table>
<p>⚠️ Please note that this feature request is currently being discussed on the <a href="https://github.com/horizoncd/horizon/discussions/81" target="_blank" rel="noopener noreferrer">HorizonCD GitHub Discussions forum<ExternalLinkIcon/></a>.</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '35.md' style='float:left'>⬆️上一节🔗  </a><a href = '37.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


