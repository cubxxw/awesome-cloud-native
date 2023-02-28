<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第44节-kubernetes-资源内部版本和外部版本" tabindex="-1"><a class="header-anchor" href="#第44节-kubernetes-资源内部版本和外部版本" aria-hidden="true">#</a> 第44节 kubernetes 资源内部版本和外部版本</h1>
<div><a href = '43.md' style='float:left'>⬆️上一节🔗  </a><a href = '45.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="资源的外部版本和资源的内部版本" tabindex="-1"><a class="header-anchor" href="#资源的外部版本和资源的内部版本" aria-hidden="true">#</a> 资源的外部版本和资源的内部版本</h2>
<p>Kubernetes的资源可以分为内部版本和外部版本。</p>
<ul>
<li>内部版本资源是Kubernetes内部使用的资源对象，它们是由Kubernetes API服务器内部使用的资源对象。</li>
<li>外部版本资源是由用户定义的资源对象，它们是由用户在Kubernetes集群外部创建和管理的。</li>
</ul>
<p>在Kubernetes中，资源类型和资源定义是在代码中定义的，具体的位置在于Kubernetes源码中的pkg/apis目录下。每一种资源都有自己的目录，里面包含着该资源类型的定义文件和对应控制器的实现文件。</p>
<p>例如，Pod资源类型的定义文件位于<code v-pre>pkg/apis/core/v1/pod.go</code>，而Pod控制器的实现文件位于<code v-pre>pkg/controller/pod/pod_controller.go</code>。</p>
<p>⚠️ 在目录 <code v-pre>kubernetes/pkg/apis/apps</code> 下面，我们可以看到 <code v-pre>apps</code> 就是定义的<code v-pre>&lt;group&gt;</code> 。</p>
<p>目录结构：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/kubernetes/pkg/apis/apps<span class="token comment"># ls</span>
doc.go  <span class="token function">install</span>  register.go  v1       v1beta2     zz_generated.deepcopy.go
fuzzer  OWNERS   types.go     v1beta1  validation
root@cubmaster01:/workspces/kubernetes/pkg/apis/apps<span class="token comment"># ls v1</span>
conversion.go       defaults.go       doc.go       zz_generated.conversion.go
conversion_test.go  defaults_test.go  register.go  zz_generated.defaults.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>ls</code> 看到的就是 <strong>资源的外部版本代码定义</strong> ，<code v-pre>ls v1</code> 看到的就是 <strong>资源的内部版本代码定义。</strong></p>
<p><strong>即内部版本一般和资源组在同一级目录下。</strong></p>
<h2 id="外部版本了的资源类型定义" tabindex="-1"><a class="header-anchor" href="#外部版本了的资源类型定义" aria-hidden="true">#</a> 外部版本了的资源类型定义</h2>
<p>在Kubernetes中，外部资源版本定义的位置所在：<code v-pre>vendor/k8s.io/api</code> 目录下，其完整的描述路径是： <code v-pre>vendor/k8s.io/api/&lt;group&gt;/&lt;version&gt;/&lt;resource.file&gt;</code></p>
<p>例如，Pod 资源的外部版本<code v-pre>k8s.io/api/core/v1/</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/kubernetes/vendor/k8s.io/api/core<span class="token comment"># ls v1/</span>
annotation_key_constants.go  register.go         types.go
doc.go                       resource.go         types_swagger_doc_generated.go
generated.pb.go              taint.go            types_test.go
generated.proto              taint_test.go       well_known_labels.go
lifecycle.go                 toleration.go       well_known_taints.go
objectreference.go           toleration_test.go  zz_generated.deepcopy.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '43.md' style='float:left'>⬆️上一节🔗  </a><a href = '45.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


