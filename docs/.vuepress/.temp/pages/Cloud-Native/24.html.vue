<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第24节-kubernetes-rootless-design" tabindex="-1"><a class="header-anchor" href="#第24节-kubernetes-rootless-design" aria-hidden="true">#</a> 第24节 Kubernetes rootless design</h1>
<div><a href = '23.md' style='float:left'>⬆️上一节🔗  </a><a href = '25.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="以非-root-用户身份运行-kubernetes-节点组件" tabindex="-1"><a class="header-anchor" href="#以非-root-用户身份运行-kubernetes-节点组件" aria-hidden="true">#</a> 以非 root 用户身份运行 Kubernetes 节点组件</h2>
<h2 id="staging-src-k8s-io-client-go" tabindex="-1"><a class="header-anchor" href="#staging-src-k8s-io-client-go" aria-hidden="true">#</a> <a href="https://github.com/kubernetes/kubernetes/tree/master/staging" target="_blank" rel="noopener noreferrer">staging<ExternalLinkIcon/></a>/<a href="https://github.com/kubernetes/kubernetes/tree/master/staging/src" target="_blank" rel="noopener noreferrer">src<ExternalLinkIcon/></a>/<a href="https://github.com/kubernetes/kubernetes/tree/master/staging/src/k8s.io" target="_blank" rel="noopener noreferrer">k8s.io<ExternalLinkIcon/></a>/<strong>client-go</strong>/</h2>
<p><code v-pre>staging/src/k8s.io/client-go/</code>是Kubernetes客户端库的一个子目录，其中包含用于与Kubernetes API通信的代码。</p>
<ul>
<li><code v-pre>discovery</code>：用于查询Kubernetes API服务的代码，包括可用资源的枚举，版本的检测等。</li>
<li><code v-pre>rest</code>：定义了客户端与Kubernetes API的REST交互的代码，包括请求的序列化/反序列化，HTTP请求的管理等。</li>
<li><code v-pre>tools</code>：定义了一些帮助工具，如工具来生成REST客户端代码。</li>
<li><code v-pre>transport</code>：定义了客户端与Kubernetes API进行安全通信所需的代码，如TLS加密等。</li>
<li><code v-pre>util</code>：定义了一些常用的工具函数，如字符串处理，时间处理等。</li>
</ul>
<p><code v-pre>tools</code>目录是Kubernetes客户端库的一个子目录，它包含一些帮助工具，用于生成客户端代码或帮助开发人员开发客户端代码。</p>
<p><code v-pre>loader.go</code>文件是Kubernetes客户端库中的一个源代码文件，位于<code v-pre>staging/src/k8s.io/client-go/tools/clientcmd</code>目录中。</p>
<p>它实现了Kubeconfig配置文件加载器，主要功能是从Kubeconfig文件中读取配置信息并将其转换为客户端库可以使用的形式。该文件定义了一组函数，用于从Kubeconfig文件读取配置，从中提取出当前使用的集群，用户和上下文，并为客户端库提供一个简单的API，以便通过预先配置的Kubeconfig文件访问Kubernetes集群配置。</p>
<p>通过使用该文件中定义的加载器，开发人员可以在Kubernetes客户端应用程序中简化配置读取逻辑，减少代码量，提高代码可读性和可维护性。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '23.md' style='float:left'>⬆️上一节🔗  </a><a href = '25.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


