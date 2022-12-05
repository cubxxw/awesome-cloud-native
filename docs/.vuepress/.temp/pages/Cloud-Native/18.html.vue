<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第18节-名词解释" tabindex="-1"><a class="header-anchor" href="#第18节-名词解释" aria-hidden="true">#</a> 第18节 名词解释</h1>
<div><a href = '17.md' style='float:left'>⬆️上一节🔗  </a><a href = '19.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="名词" tabindex="-1"><a class="header-anchor" href="#名词" aria-hidden="true">#</a> 名词</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// /var/lib/sealer/data/my-cluster/pki</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>k <span class="token operator">*</span>Runtime<span class="token punctuation">)</span> <span class="token function">getPKIPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>k<span class="token punctuation">.</span>infra<span class="token punctuation">.</span><span class="token function">GetClusterRootfsPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"pki"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// /var/lib/sealer/data/my-cluster/pki/etcd</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>k <span class="token operator">*</span>Runtime<span class="token punctuation">)</span> <span class="token function">getEtcdCertPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>k<span class="token punctuation">.</span><span class="token function">getPKIPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"etcd"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// /var/lib/sealer/data/my-cluster/rootfs/statics</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>k <span class="token operator">*</span>Runtime<span class="token punctuation">)</span> <span class="token function">getStaticFileDir</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>k<span class="token punctuation">.</span>infra<span class="token punctuation">.</span><span class="token function">GetClusterRootfsPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"statics"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// /var/lib/sealer/data/my-cluster/mount/etc/kubeadm.yml</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>k <span class="token operator">*</span>Runtime<span class="token punctuation">)</span> <span class="token function">getDefaultKubeadmConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>k<span class="token punctuation">.</span>infra<span class="token punctuation">.</span><span class="token function">GetClusterRootfsPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">"etc"</span><span class="token punctuation">,</span> <span class="token string">"kubeadm.yml"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注释上读取的是mount过程中生成的文件路径，安装过程中使用的是该路径，后续这些文件被移动到相应位置后，sealer又会执行unmount移出挂载</p>
</div>
<p><code v-pre>Public Key Infrastructure（PKI)</code> ： 中文叫做公开密钥基础设施，也就是利用公开密钥机制建立起来的基础设施。</p>
<blockquote>
<p>path：<code v-pre>/var/lib/sealer/data/my-cluster/pki</code></p>
</blockquote>
<p><code v-pre>EtcdCert</code> ：client certificate 用于通过服务器验证客户端。例如etcdctl，etcd proxy，fleetctl或docker客户端。
server certificate 由服务器使用，并由客户端验证服务器身份。例如docker服务器或kube-apiserver。
peer certificate 由 etcd 集群成员使用，供它们彼此之间通信使用。</p>
<blockquote>
<p>path：<code v-pre> /var/lib/sealer/data/my-cluster/pki/etcd</code></p>
</blockquote>
<p><code v-pre>StaticFile</code></p>
<blockquote>
<p><code v-pre> /var/lib/sealer/data/my-cluster/rootfs/statics</code></p>
</blockquote>
<p><code v-pre>DefaultKubeadmConfig</code></p>
<blockquote>
<p><code v-pre>/var/lib/sealer/data/my-cluster/mount/etc/kubeadm.yml</code></p>
</blockquote>
<p><code v-pre>DNS domain</code>：域名服务器</p>
<h2 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
	AuditPolicyYml <span class="token operator">=</span> <span class="token string">"audit-policy.yml"</span>
	KubeadmFileYml <span class="token operator">=</span> <span class="token string">"/etc/kubernetes/kubeadm.yaml"</span>
	AdminConf      <span class="token operator">=</span> <span class="token string">"admin.conf"</span>
	ControllerConf <span class="token operator">=</span> <span class="token string">"controller-manager.conf"</span>
	SchedulerConf  <span class="token operator">=</span> <span class="token string">"scheduler.conf"</span>
	KubeletConf    <span class="token operator">=</span> <span class="token string">"kubelet.conf"</span>

	<span class="token comment">// kube file</span>
	KUBECONTROLLERCONFIGFILE <span class="token operator">=</span> <span class="token string">"/etc/kubernetes/controller-manager.conf"</span>
	KUBESCHEDULERCONFIGFILE  <span class="token operator">=</span> <span class="token string">"/etc/kubernetes/scheduler.conf"</span>
	AdminKubeConfPath        <span class="token operator">=</span> <span class="token string">"/etc/kubernetes/admin.conf"</span>
	StaticPodDir             <span class="token operator">=</span> <span class="token string">"/etc/kubernetes/manifests"</span>
	LvscarePodFileName       <span class="token operator">=</span> <span class="token string">"kube-lvscare.yaml"</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>对应的目录：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z kubernetes<span class="token punctuation">]</span><span class="token comment"># pwd;ls -al</span>
/etc/kubernetes
total <span class="token number">48</span>
drwxr-xr-x   <span class="token number">4</span> root root <span class="token number">4096</span> Nov  <span class="token number">9</span> <span class="token number">16</span>:19 <span class="token builtin class-name">.</span>
drwxr-xr-x. <span class="token number">85</span> root root <span class="token number">4096</span> Nov <span class="token number">13</span> <span class="token number">12</span>:04 <span class="token punctuation">..</span>
-rw-------   <span class="token number">1</span> root root <span class="token number">5583</span> Nov  <span class="token number">9</span> <span class="token number">16</span>:19 admin.conf
-rw-r--r--   <span class="token number">1</span> root root <span class="token number">3073</span> Nov  <span class="token number">9</span> <span class="token number">16</span>:19 audit-policy.yml
-rw-------   <span class="token number">1</span> root root <span class="token number">5623</span> Nov  <span class="token number">9</span> <span class="token number">16</span>:19 controller-manager.conf
-rw-------   <span class="token number">1</span> root root <span class="token number">1999</span> Nov  <span class="token number">9</span> <span class="token number">16</span>:20 kubelet.conf
drwx------   <span class="token number">2</span> root root <span class="token number">4096</span> Nov  <span class="token number">9</span> <span class="token number">16</span>:19 manifests
drwxr-xr-x   <span class="token number">3</span> root root <span class="token number">4096</span> Nov  <span class="token number">9</span> <span class="token number">16</span>:19 pki
-rw-------   <span class="token number">1</span> root root <span class="token number">5567</span> Nov  <span class="token number">9</span> <span class="token number">16</span>:19 scheduler.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '17.md' style='float:left'>⬆️上一节🔗  </a><a href = '19.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


