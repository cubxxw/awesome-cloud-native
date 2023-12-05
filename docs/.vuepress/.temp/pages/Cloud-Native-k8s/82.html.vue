<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第82节-openim-application-containerization-deployment-guide" tabindex="-1"><a class="header-anchor" href="#第82节-openim-application-containerization-deployment-guide" aria-hidden="true">#</a> 第82节 OpenIM Application Containerization Deployment Guide</h1>
<div><a href = '81.md' style='float:left'>⬆️上一节🔗  </a><a href = '83.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h1 id="openim-application-containerization-deployment-guide" tabindex="-1"><a class="header-anchor" href="#openim-application-containerization-deployment-guide" aria-hidden="true">#</a> OpenIM Application Containerization Deployment Guide</h1>
<p>OpenIM supports a variety of cluster deployment methods, including but not limited to <code v-pre>helm</code>, <code v-pre>sealos</code>, <code v-pre>kustomize</code></p>
<p>Various contributors, as well as previous official releases, have provided some referenceable solutions:</p>
<ul>
<li><a href="https://github.com/OpenIMSDK/k8s-jenkins" target="_blank" rel="noopener noreferrer">k8s-jenkins Repository<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/openimsdk/open-im-server-k8s-deploy" target="_blank" rel="noopener noreferrer">open-im-server-k8s-deploy Repository<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/openim-charts" target="_blank" rel="noopener noreferrer">openim-charts Repository<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/showurl/deploy-openim" target="_blank" rel="noopener noreferrer">deploy-openim Repository<ExternalLinkIcon/></a></li>
</ul>
<h3 id="dependency-check" tabindex="-1"><a class="header-anchor" href="#dependency-check" aria-hidden="true">#</a> Dependency Check</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Kubernetes: <span class="token operator">>=</span> <span class="token number">1.16</span>.0-0
Helm: <span class="token operator">>=</span> <span class="token number">3.0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="minimum-configuration" tabindex="-1"><a class="header-anchor" href="#minimum-configuration" aria-hidden="true">#</a> Minimum Configuration</h3>
<p>The recommended minimum configuration for a production environment is as follows:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">CPU</span><span class="token punctuation">:</span> <span class="token number">4</span>
<span class="token key atrule">Memory</span><span class="token punctuation">:</span> 8G
<span class="token key atrule">Disk</span><span class="token punctuation">:</span> 100G
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="configuration-file-generation" tabindex="-1"><a class="header-anchor" href="#configuration-file-generation" aria-hidden="true">#</a> Configuration File Generation</h2>
<p>We have automated all the files, making the generation of configuration files optional for OpenIM. However, if you desire custom configurations, you can follow the steps below:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> init
<span class="token comment"># Alternatively, use script:</span>
<span class="token comment"># ./scripts/init-config.sh</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>At this point, configuration files will be generated under <code v-pre>deployments/openim/config</code>, which you can modify as per your requirements.</p>
<h2 id="cluster-setup" tabindex="-1"><a class="header-anchor" href="#cluster-setup" aria-hidden="true">#</a> Cluster Setup</h2>
<p>If you already have a <code v-pre>kubernetes</code> cluster, or if you wish to build a <code v-pre>kubernetes</code> cluster from scratch, you can skip this step.</p>
<p>For a quick start, I used <a href="https://github.com/labring/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a> to rapidly set up the cluster, with sealos also being a wrapper for kubeadm at its core:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token assign-left variable">SEALOS_VERSION</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token function">curl</span> <span class="token parameter variable">-s</span> https://api.github.com/repos/labring/sealos/releases/latest <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-oE</span> <span class="token string">'"tag_name": "[^"]+"'</span> <span class="token operator">|</span> <span class="token function">head</span> <span class="token parameter variable">-n1</span> <span class="token operator">|</span> <span class="token function">cut</span> -d<span class="token string">'"'</span> <span class="token parameter variable">-f4</span><span class="token variable">`</span></span> <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
  <span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://raw.githubusercontent.com/labring/sealos/<span class="token variable">${SEALOS_VERSION}</span>/scripts/install.sh <span class="token operator">|</span>
  <span class="token function">sh</span> <span class="token parameter variable">-s</span> <span class="token variable">${SEALOS_VERSION}</span> labring/sealos
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Supported Versions:</strong></p>
<ul>
<li>docker: <code v-pre>labring/kubernetes-docker</code>:(v1.24.0~v1.27.0)</li>
<li>containerd: <code v-pre>labring/kubernetes</code>:(v1.24.0~v1.27.0)</li>
</ul>
<h4 id="cluster-installation" tabindex="-1"><a class="header-anchor" href="#cluster-installation" aria-hidden="true">#</a> Cluster Installation:</h4>
<p>Cluster details are as follows:</p>
<table>
<thead>
<tr>
<th>Hostname</th>
<th>IP Address</th>
<th>System Info</th>
</tr>
</thead>
<tbody>
<tr>
<td>master01</td>
<td>10.0.0.9</td>
<td><code v-pre>Linux VM-0-9-ubuntu 5.15.0-76-generic #83-Ubuntu SMP Thu Jun 15 19:16:32 UTC 2023 x86_64 x86_64 x86_64 GNU/Linux</code></td>
</tr>
<tr>
<td>node01</td>
<td>10.0.0.4</td>
<td>Similar to master01</td>
</tr>
<tr>
<td>node02</td>
<td>10.0.0.10</td>
<td>Similar to master01</td>
</tr>
</tbody>
</table>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">CLUSTER_USERNAME</span><span class="token operator">=</span>ubuntu
$ <span class="token builtin class-name">export</span> <span class="token assign-left variable">CLUSTER_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span>
$ <span class="token function">sudo</span> sealos run labring/kubernetes:v1.25.0 labring/helm:v3.8.2 labring/calico:v3.24.1 <span class="token punctuation">\</span>
    <span class="token parameter variable">--masters</span> <span class="token number">10.0</span>.0.9 <span class="token punctuation">\</span>
    <span class="token parameter variable">--nodes</span> <span class="token number">10.0</span>.0.4,10.0.0.10 <span class="token punctuation">\</span>
    <span class="token parameter variable">-u</span> <span class="token string">"<span class="token variable">$CLUSTER_USERNAME</span>"</span> <span class="token punctuation">\</span>
    <span class="token parameter variable">-p</span> <span class="token string">"<span class="token variable">$CLUSTER_PASSWORD</span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>Node</strong> Uninstallation method: using <code v-pre>kubeadm</code> for uninstallation does not remove <code v-pre>etcd</code> and <code v-pre>cni</code> related configurations. Manual clearance or using <code v-pre>sealos</code> for uninstallation is needed.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ sealos reset
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<h3 id="installing-helm" tabindex="-1"><a class="header-anchor" href="#installing-helm" aria-hidden="true">#</a> Installing helm</h3>
<p>Helm simplifies the deployment and management of Kubernetes applications to a large extent by offering version control and release management through packaging.</p>
<p><strong>Using Script:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">curl</span> https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 <span class="token operator">|</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Adding Repository:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm repo <span class="token function">add</span> brigade https://openimsdk.github.io/openim-charts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="openim-image-strategy" tabindex="-1"><a class="header-anchor" href="#openim-image-strategy" aria-hidden="true">#</a> OpenIM Image Strategy</h3>
<p>Automated offerings include aliyun, ghcr, docker hub: <a href="https://github.com/openimsdk/open-im-server/blob/main/docs/conversions/images.md" target="_blank" rel="noopener noreferrer">Image Documentation<ExternalLinkIcon/></a></p>
<p><strong>Local Test Build Method:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">make</span> image
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>This command assists in quickly building the required images locally. For a detailed build strategy, refer to the <a href="https://github.com/openimsdk/open-im-server/blob/main/build/README.md" target="_blank" rel="noopener noreferrer">Build Documentation<ExternalLinkIcon/></a>.</p>
</blockquote>
<h2 id="installation" tabindex="-1"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2>
<p>Explore our Helm-Charts repository and read through: <a href="https://github.com/openimsdk/helm-charts" target="_blank" rel="noopener noreferrer">Helm-Charts Repository<ExternalLinkIcon/></a></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '81.md' style='float:left'>⬆️上一节🔗  </a><a href = '83.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


