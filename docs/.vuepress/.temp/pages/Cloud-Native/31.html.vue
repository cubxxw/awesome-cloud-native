<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第31节-horizon" tabindex="-1"><a class="header-anchor" href="#第31节-horizon" aria-hidden="true">#</a> 第31节 horizon</h1>
<div><a href = '30.md' style='float:left'>⬆️上一节🔗  </a><a href = '32.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="horizon" tabindex="-1"><a class="header-anchor" href="#horizon" aria-hidden="true">#</a> Horizon</h2>
<p><strong>describe：Production-Grade GitOps CD PlatForm For CloudNative Applications, MiddleWares, etc.</strong></p>
<p>Horizon is a cloud-native application Continues Delivery (CD) platform. Platform team can let the developers deploy their code and MiddleWares to cloud and kubernetes easily, efficiency and with best practice. Horizon is inspired by ArgoCD and AWS Proton.</p>
<h2 id="why-horizon" tabindex="-1"><a class="header-anchor" href="#why-horizon" aria-hidden="true">#</a> Why Horizon</h2>
<p><strong>standardized</strong> : kubernetes is flexible and powerful, but it is complex. it's hard to let all the developers have a comprehensive understanding of kubernetes and practice best practice. so horizon introduce a template system to make the best practice under control, and also provide efficient delivery. For example, Platform Team can provide basic spec of resource tiny(0.5core, 512MB)、small(1core, 1GB), middle(2core, 4GB) etc. by default, not for the developer to select limit or request resource on common case.</p>
<p><strong>security and reliable</strong> ：security and reliable is always a challenge. In Horizon, Horizon make every change of application durable, reversible and auditable. It's done with our best practice of GitOps. And Horizon introduce rbac&amp;member system to let you have best practice on fine-grained permission control.</p>
<p><strong>multi-cloud</strong> : Horizon provide a consistent application platform to manage multi-cloud, hybrid cloud.</p>
<p><strong>infrastructure agnostic</strong> ：horizon doesn't limit the kind of workload. the basic kubernetes workloads and self defined <a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/" target="_blank" rel="noopener noreferrer">CR<ExternalLinkIcon/></a> are all supported.</p>
<p><strong>efficiency</strong> ：platform team can quickly make an end to end best practice workload delivery based on Horizon template.</p>
<p><strong>Production-Grade</strong>：Within <a href="https://music.163.com/" target="_blank" rel="noopener noreferrer">NetEase Cloud Music<ExternalLinkIcon/></a> about thousands of developer use horizon to deploy workload everyday.</p>
<h2 id="features" tabindex="-1"><a class="header-anchor" href="#features" aria-hidden="true">#</a> Features</h2>
<p>In Horizon, Git is Used as the only &quot;The Source Of Truth&quot;, Horizon stores template and all values in Git repository. Every change are durable, reversible and auditable, Including code, image, environment variables, resource spec, etc.</p>
<p>Horizon Template is based on helm and jsonschema. The Platform Team can make the basic practice (including security, affinity, priority, resource, etc.) by default, and provide user a simple and uniform interface which is defined by jsonschema files. jsonschema is used for provide a user friend HTML form on the Horizon Based on react-jsonschema-form. It's highly Scalable and flexible to make your own best practice based on the simple template system.</p>
<h2 id="rpac-member" tabindex="-1"><a class="header-anchor" href="#rpac-member" aria-hidden="true">#</a> RPAC &amp; Member</h2>
<p>Horizon Provide a RBAC &amp; Member system Just like Gitlab. You can easily define your Own PlatForm Member and Role(Just like Kubernetes role and rolebinding). In our Practice, we Provide Role like PE, Owner, Maintainer, Guest. the Owner is binding with the Read(list pods, read all properties, etc.)/Write(deploy, builddeploy, restart, release, delete etc.) Permission, the guest just have the read permission.</p>
<h2 id="architecture" tabindex="-1"><a class="header-anchor" href="#architecture" aria-hidden="true">#</a> Architecture</h2>
<p><img src="http://sm.nsddd.top/sm202303012213841.png" alt="image-20230301221333656"></p>
<h2 id="how-to-install" tabindex="-1"><a class="header-anchor" href="#how-to-install" aria-hidden="true">#</a> How to install</h2>
<p>Horizon is built entirely on Kubernetes and has been fully tested on its v1.19.3 ~ v1.24.7 release.</p>
<p>We are assuming you have a basic understanding of what the Kubernetes is and how it runs.</p>
<p>You can use <a href="https://kind.sigs.k8s.io/docs/user/quick-start/" target="_blank" rel="noopener noreferrer">Kind<ExternalLinkIcon/></a> to run a local Kubernetes cluster quickly. <a href="https://minikube.sigs.k8s.io/docs/" target="_blank" rel="noopener noreferrer">Minikube<ExternalLinkIcon/></a> is another highly useful tool to set up a local Kubernetes cluster.</p>
<blockquote>
<p>The following table lists the minimum and recommended hardware configurations for deploying Horizon.</p>
<table>
<thead>
<tr>
<th>Resource</th>
<th>Minimum</th>
<th>Recommended</th>
</tr>
</thead>
<tbody>
<tr>
<td>CPU</td>
<td>4 CPU</td>
<td>8 CPU</td>
</tr>
<tr>
<td>Mem</td>
<td>8 GB</td>
<td>16 GB</td>
</tr>
<tr>
<td>Disk</td>
<td>40 GB</td>
<td>80 GB</td>
</tr>
</tbody>
</table>
</blockquote>
<h2 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements" aria-hidden="true">#</a> Requirements</h2>
<ol>
<li><a href="https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/" target="_blank" rel="noopener noreferrer">Kubernetes<ExternalLinkIcon/></a> cluster version 1.19.3 ~ v1.24.7.</li>
<li>Installed <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl/" target="_blank" rel="noopener noreferrer">kubectl<ExternalLinkIcon/></a> command-line tool.</li>
<li>Have a <a href="https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/" target="_blank" rel="noopener noreferrer">kubeconfig<ExternalLinkIcon/></a> file (default location is <code v-pre>~/.kube/config</code>).</li>
<li>Installed <a href="https://helm.sh/" target="_blank" rel="noopener noreferrer">helm<ExternalLinkIcon/></a> command-line tool.</li>
<li>Installed <a href="https://github.com/kubernetes/ingress-nginx" target="_blank" rel="noopener noreferrer">ingress-nginx<ExternalLinkIcon/></a> or any other ingress controller.</li>
</ol>
<h2 id="installation-process" tabindex="-1"><a class="header-anchor" href="#installation-process" aria-hidden="true">#</a> Installation Process</h2>
<p>We use <code v-pre>helm</code> to organize Horizon's whole dependencies, which means you can launch a whole system by Helm.</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '30.md' style='float:left'>⬆️上一节🔗  </a><a href = '32.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


