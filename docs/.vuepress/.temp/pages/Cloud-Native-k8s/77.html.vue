<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第77节-管理集群中的-tls-认证" tabindex="-1"><a class="header-anchor" href="#第77节-管理集群中的-tls-认证" aria-hidden="true">#</a> 第77节 管理集群中的 TLS 认证</h1>
<div><a href = '76.md' style='float:left'>⬆️上一节🔗  </a><a href = '78.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="管理集群中的-tls-认证" tabindex="-1"><a class="header-anchor" href="#管理集群中的-tls-认证" aria-hidden="true">#</a> 管理集群中的 TLS 认证</h2>
<p>Kubernetes 提供 <code v-pre>certificates.k8s.io</code> API，可让你配置由你控制的证书颁发机构（CA） 签名的 TLS 证书。 你的工作负载可以使用这些 CA 和证书来建立信任。</p>
<p><code v-pre>certificates.k8s.io</code> API使用的协议类似于 <a href="https://github.com/ietf-wg-acme/acme/" target="_blank" rel="noopener noreferrer">ACME 草案<ExternalLinkIcon/></a>。</p>
<h3 id="集群中的-tls-信任" tabindex="-1"><a class="header-anchor" href="#集群中的-tls-信任" aria-hidden="true">#</a> 集群中的 TLS 信任</h3>
<p>信任 Pod 中运行的应用程序所提供的<a href="https://kubernetes.io/zh-cn/docs/tasks/tls/managing-tls-in-a-cluster/#configuring-your-cluster-to-provide-signing" target="_blank" rel="noopener noreferrer">自定义 CA<ExternalLinkIcon/></a> 通常需要一些额外的应用程序配置。 你需要将 CA 证书包添加到 TLS 客户端或服务器信任的 CA 证书列表中。 例如，你可以使用 Golang TLS 配置通过解析证书链并将解析的证书添加到 <a href="https://pkg.go.dev/crypto/tls#Config" target="_blank" rel="noopener noreferrer"><code v-pre>tls.Config</code><ExternalLinkIcon/></a> 结构中的 <code v-pre>RootCAs</code> 字段中。</p>
<blockquote>
<p><strong>说明：</strong></p>
<p>即使自定义 CA 证书可能包含在文件系统中（在 ConfigMap <code v-pre>kube-root-ca.crt</code> 中）， 除了验证内部 Kubernetes 端点之外，你不应将该证书颁发机构用于任何目的。 内部 Kubernetes 端点的一个示例是默认命名空间中名为 <code v-pre>kubernetes</code> 的服务。</p>
<p>如果你想为你的工作负载使用自定义证书颁发机构，你应该单独生成该 CA， 并使用你的 Pod 有读权限的 <a href="https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-pod-configmap" target="_blank" rel="noopener noreferrer">ConfigMap<ExternalLinkIcon/></a> 分发该 CA 证书。</p>
</blockquote>
<h3 id="请求证书" tabindex="-1"><a class="header-anchor" href="#请求证书" aria-hidden="true">#</a> 请求证书</h3>
<p>以下部分演示如何为通过 DNS 访问的 Kubernetes 服务创建 TLS 证书。</p>
<blockquote>
<p><strong>说明：</strong> 本教程使用 CFSSL：Cloudflare's PKI 和 TLS 工具包 <a href="https://blog.cloudflare.com/introducing-cfssl/" target="_blank" rel="noopener noreferrer">点击此处<ExternalLinkIcon/></a>了解更多信息。</p>
</blockquote>
<h3 id="创建证书签名请求" tabindex="-1"><a class="header-anchor" href="#创建证书签名请求" aria-hidden="true">#</a> 创建证书签名请求</h3>
<p>通过运行以下命令生成私钥和证书签名请求（或 CSR）:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat &lt;&lt;EOF | cfssl genkey - | cfssljson -bare server
{
  "hosts": [
    "my-svc.my-namespace.svc.cluster.local",
    "my-pod.my-namespace.pod.cluster.local",
    "192.0.2.24",
    "10.0.34.2"
  ],
  "CN": "my-pod.my-namespace.pod.cluster.local",
  "key": {
    "algo": "ecdsa",
    "size": 256
  }
}
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>192.0.2.24</code> 是服务的集群 IP，<code v-pre>my-svc.my-namespace.svc.cluster.local</code> 是服务的 DNS 名称，<code v-pre>10.0.34.2</code> 是 Pod 的 IP，而 <code v-pre>my-pod.my-namespace.pod.cluster.local</code> 是 Pod 的 DNS 名称。 你能看到的输出类似于：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>2022/02/01 11:45:32 [INFO] generate received request
2022/02/01 11:45:32 [INFO] received CSR
2022/02/01 11:45:32 [INFO] generating key: ecdsa-256
2022/02/01 11:45:32 [INFO] encoded CSR
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此命令生成两个文件；它生成包含 PEM 编码 <a href="https://tools.ietf.org/html/rfc2986" target="_blank" rel="noopener noreferrer">PKCS#10<ExternalLinkIcon/></a> 证书请求的 <code v-pre>server.csr</code>， 以及 PEM 编码密钥的 <code v-pre>server-key.pem</code>，用于待生成的证书。</p>
<h3 id="创建证书签名请求-csr-对象发送到-kubernetes-api" tabindex="-1"><a class="header-anchor" href="#创建证书签名请求-csr-对象发送到-kubernetes-api" aria-hidden="true">#</a> 创建证书签名请求（CSR）对象发送到 Kubernetes API</h3>
<p>你可以使用以下命令创建 CSR 清单（YAML 格式），并发送到 API 服务器：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> kubectl apply <span class="token parameter variable">-f</span> -</span>
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: my-svc.my-namespace
spec:
  request: <span class="token variable"><span class="token variable">$(</span><span class="token function">cat</span> server.csr <span class="token operator">|</span> base64 <span class="token operator">|</span> <span class="token function">tr</span> <span class="token parameter variable">-d</span> <span class="token string">'\n'</span><span class="token variable">)</span></span>
  signerName: example.com/serving
  usages:
  - digital signature
  - key encipherment
  - server auth
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，在步骤 1 中创建的 <code v-pre>server.csr</code> 文件是 base64 编码并存储在 <code v-pre>.spec.request</code> 字段中的。你还要求提供 “digital signature（数字签名）”， “密钥加密（key encipherment）” 和 “服务器身份验证（server auth）” 密钥用途， 由 <code v-pre>example.com/serving</code> 示例签名程序签名的证书。 你也可以要求使用特定的 <code v-pre>signerName</code>。更多信息可参阅 <a href="https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/certificate-signing-requests/#signers" target="_blank" rel="noopener noreferrer">支持的签署者名称<ExternalLinkIcon/></a>。</p>
<p>在 API server 中可以看到这些 CSR 处于 Pending 状态。执行下面的命令你将可以看到：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl describe csr my-svc.my-namespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="批准证书签名请求-csr" tabindex="-1"><a class="header-anchor" href="#批准证书签名请求-csr" aria-hidden="true">#</a> 批准证书签名请求（CSR）</h3>
<p><a href="https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/certificate-signing-requests/" target="_blank" rel="noopener noreferrer">证书签名请求<ExternalLinkIcon/></a> 的批准或者是通过自动批准过程完成的，或由集群管理员一次性完成。 如果你被授权批准证书请求，你可以使用 <code v-pre>kubectl</code> 来手动完成此操作；例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl certificate approve my-svc.my-namespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>判断状态：Status:             Approved</p>
</blockquote>
<p>你现在应该能看到如下输出：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>controlplane $ kubectl get csr
NAME                  AGE     SIGNERNAME                                    REQUESTOR                  REQUESTEDDURATION   CONDITION
csr-46sxj             37d     kubernetes.io/kube-apiserver-client-kubelet   system:bootstrap:z6kr08    <span class="token operator">&lt;</span>none<span class="token operator">></span>              Approved,Issued
csr-6z592             38d     kubernetes.io/kube-apiserver-client-kubelet   system:node:controlplane   <span class="token operator">&lt;</span>none<span class="token operator">></span>              Approved,Issued
my-svc.my-namespace   9m17s   example.com/serving                           kubernetes-admin           <span class="token operator">&lt;</span>none<span class="token operator">></span>              Approved
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这意味着证书请求已被批准，并正在等待请求的签名者对其签名。</p>
<h3 id="签名证书签名请求-csr" tabindex="-1"><a class="header-anchor" href="#签名证书签名请求-csr" aria-hidden="true">#</a> 签名证书签名请求（CSR)</h3>
<p>接下来，你将扮演证书签署者的角色，颁发证书并将其上传到 API 服务器。</p>
<p>签名者通常会使用其 <code v-pre>signerName</code> 查看对象的 CertificateSigningRequest API， 检查它们是否已被批准，为这些请求签署证书，并使用已颁发的证书更新 API 对象状态。</p>
<h3 id="创建证书颁发机构" tabindex="-1"><a class="header-anchor" href="#创建证书颁发机构" aria-hidden="true">#</a> 创建证书颁发机构</h3>
<p>你需要授权在新证书上提供数字签名。</p>
<p>首先，通过运行以下命令创建签名证书：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> cfssl gencert <span class="token parameter variable">-initca</span> - <span class="token operator">|</span> cfssljson <span class="token parameter variable">-bare</span> ca</span>
{
  "CN": "My Example Signer",
  "key": {
    "algo": "rsa",
    "size": 2048
  }
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你应该看到类似于以下的输出：</p>
<div class="language-none ext-none line-numbers-mode"><pre v-pre class="language-none"><code>2022/02/01 11:50:39 [INFO] generating a new CA key and certificate from CSR
2022/02/01 11:50:39 [INFO] generate received request
2022/02/01 11:50:39 [INFO] received CSR
2022/02/01 11:50:39 [INFO] generating key: rsa-2048
2022/02/01 11:50:39 [INFO] encoded CSR
2022/02/01 11:50:39 [INFO] signed certificate with serial number 263983151013686720899716354349605500797834580472
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这会产生一个证书颁发机构密钥文件（<code v-pre>ca-key.pem</code>）和证书（<code v-pre>ca.pem</code>）。</p>
<h3 id="下载证书并使用它" tabindex="-1"><a class="header-anchor" href="#下载证书并使用它" aria-hidden="true">#</a> 下载证书并使用它</h3>
<p>现在，作为请求用户，你可以通过运行以下命令下载颁发的证书并将其保存到 <code v-pre>server.crt</code> 文件中：</p>
<p>CSR 被签署并获得批准后，你应该看到以下内容：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get csr my-svc.my-namespace <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">'{.status.certificate}'</span> <span class="token punctuation">\</span>
    <span class="token operator">|</span> base64 <span class="token parameter variable">--decode</span> <span class="token operator">></span> server.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>现在你可以将 <code v-pre>server.crt</code> 和 <code v-pre>server-key.pem</code> 填充到 <a href="https://kubernetes.io/zh-cn/docs/concepts/configuration/secret/" target="_blank" rel="noopener noreferrer">Secret<ExternalLinkIcon/></a> 中， 稍后你可以将其挂载到 Pod 中（例如，用于提供 HTTPS 的网络服务器）。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create secret tls server <span class="token parameter variable">--cert</span> server.crt <span class="token parameter variable">--key</span> server-key.pem
secret/server created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，你可以将 <code v-pre>ca.pem</code> 填充到 <a href="https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-pod-configmap/" target="_blank" rel="noopener noreferrer">ConfigMap<ExternalLinkIcon/></a> 并将其用作信任根来验证服务证书：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create configmap example-serving-ca --from-file <span class="token assign-left variable">ca.crt</span><span class="token operator">=</span>ca.pem
configmap/example-serving-ca created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="批准证书签名请求-csr-1" tabindex="-1"><a class="header-anchor" href="#批准证书签名请求-csr-1" aria-hidden="true">#</a> 批准证书签名请求（CSR）</h3>
<p>Kubernetes 管理员（具有适当权限）可以使用 <code v-pre>kubectl certificate approve</code> 和 <code v-pre>kubectl certificate deny</code> 命令手动批准（或拒绝）证书签名请求（CSR）。 但是，如果你打算大量使用此 API，则可以考虑编写自动化的证书控制器。</p>
<p><strong>注意：</strong></p>
<p>批准证书 CSR 的能力决定了在你的环境中谁信任谁。 不应广泛或轻率地授予批准 CSR 的能力。</p>
<p>在授予 <code v-pre>approve</code> 权限之前，你应该确保自己充分了解批准人的验证要求<strong>和</strong>颁发特定证书的后果。</p>
<p>无论上述机器或人使用 kubectl，“批准者”的作用是验证 CSR 满足如下两个要求：</p>
<ol>
<li>CSR 的 subject 控制用于签署 CSR 的私钥。这解决了伪装成授权主体的第三方的威胁。 在上述示例中，此步骤将验证该 Pod 控制了用于生成 CSR 的私钥。</li>
<li>CSR 的 subject 被授权在请求的上下文中执行。 这点用于处理不期望的主体被加入集群的威胁。 在上述示例中，此步骤将是验证该 Pod 是否被允许加入到所请求的服务中。</li>
</ol>
<p>当且仅当满足这两个要求时，审批者应该批准 CSR，否则拒绝 CSR。</p>
<p>有关证书批准和访问控制的更多信息， 请阅读<a href="https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/certificate-signing-requests/" target="_blank" rel="noopener noreferrer">证书签名请求<ExternalLinkIcon/></a>参考页。</p>
<h2 id="手动轮换-ca-证书" tabindex="-1"><a class="header-anchor" href="#手动轮换-ca-证书" aria-hidden="true">#</a> 手动轮换 CA 证书</h2>
<p><strong>注意：</strong></p>
<p>确保备份你的证书目录、配置文件以及其他必要文件。</p>
<p>这里的方法假定 Kubernetes 的控制面通过运行多个 API 服务器以高可用配置模式运行。 另一假定是 API 服务器可体面地终止，因而客户端可以彻底地与一个 API 服务器断开 连接并连接到另一个 API 服务器。</p>
<p>如果集群中只有一个 API 服务器，则在 API 服务器重启期间会经历服务中断期。</p>
<ol>
<li>
<p>将新的 CA 证书和私钥（例如：<code v-pre>ca.crt</code>、<code v-pre>ca.key</code>、<code v-pre>front-proxy-ca.crt</code> 和 <code v-pre>front-proxy-client.key</code>）分发到所有控制面节点，放在其 Kubernetes 证书目录下。</p>
</li>
<li>
<p>更新 <a href="https://kubernetes.io/zh-cn/docs/reference/command-line-tools-reference/kube-controller-manager/" target="_blank" rel="noopener noreferrer">kube-controller-manager<ExternalLinkIcon/></a> 的 <code v-pre>--root-ca-file</code> 标志，使之同时包含老的和新的 CA，之后重启 kube-controller-manager。</p>
<p>自此刻起，所创建的所有<a href="https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-service-account/" target="_blank" rel="noopener noreferrer">ServiceAccount<ExternalLinkIcon/></a> 都会获得同时包含老的 CA 和新的 CA 的 Secret。</p>
</li>
</ol>
<h2 id="创建外部负载均衡器" tabindex="-1"><a class="header-anchor" href="#创建外部负载均衡器" aria-hidden="true">#</a> 创建外部负载均衡器</h2>
<p>创建<a href="https://kubernetes.io/zh-cn/docs/concepts/services-networking/service/" target="_blank" rel="noopener noreferrer">服务<ExternalLinkIcon/></a>时，你可以选择自动创建云网络负载均衡器。 负载均衡器提供外部可访问的 IP 地址，可将流量发送到集群节点上的正确端口上 （<strong>假设集群在支持的环境中运行，并配置了正确的云负载均衡器驱动包</strong>）。</p>
<h3 id="基于清单文件创建服务" tabindex="-1"><a class="header-anchor" href="#基于清单文件创建服务" aria-hidden="true">#</a> 基于清单文件创建服务</h3>
<p>要创建外部负载均衡器，请将以下内容添加到你的 Service 清单文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>    <span class="token key atrule">type</span><span class="token punctuation">:</span> LoadBalancer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你的清单文件可能会如下所示：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>service
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> example
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8765</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">9376</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> LoadBalancer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-kubectl-创建-service" tabindex="-1"><a class="header-anchor" href="#使用-kubectl-创建-service" aria-hidden="true">#</a> 使用 kubectl 创建 Service</h3>
<p>你也可以使用 <code v-pre>kubectl expose</code> 命令及其 <code v-pre>--type=LoadBalancer</code> 参数创建服务：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl expose deployment example <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8765</span> --target-port<span class="token operator">=</span><span class="token number">9376</span> <span class="token punctuation">\</span>
        <span class="token parameter variable">--name</span><span class="token operator">=</span>example-service <span class="token parameter variable">--type</span><span class="token operator">=</span>LoadBalancer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此命令通过使用与引用资源（在上面的示例的情况下，名为 <code v-pre>example</code> 的 <a href="https://kubernetes.io/zh-cn/docs/concepts/workloads/controllers/deployment/" target="_blank" rel="noopener noreferrer">Deployment<ExternalLinkIcon/></a>） 相同的选择器来创建一个新的服务。</p>
<h3 id="找到你的-ip-地址" tabindex="-1"><a class="header-anchor" href="#找到你的-ip-地址" aria-hidden="true">#</a> 找到你的 IP 地址</h3>
<p>你可以通过 <code v-pre>kubectl</code> 获取服务信息，找到为你的服务创建的 IP 地址：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl describe services example-service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将获得类似如下输出：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Name:                     example-service
Namespace:                default
Labels:                   <span class="token assign-left variable">app</span><span class="token operator">=</span>example
Annotations:              <span class="token operator">&lt;</span>none<span class="token operator">></span>
Selector:                 <span class="token assign-left variable">app</span><span class="token operator">=</span>example
Type:                     LoadBalancer
IP Families:              <span class="token operator">&lt;</span>none<span class="token operator">></span>
IP:                       <span class="token number">10.3</span>.22.96
IPs:                      <span class="token number">10.3</span>.22.96
LoadBalancer Ingress:     <span class="token number">192.0</span>.2.89
Port:                     <span class="token operator">&lt;</span>unset<span class="token operator">></span>  <span class="token number">8765</span>/TCP
TargetPort:               <span class="token number">9376</span>/TCP
NodePort:                 <span class="token operator">&lt;</span>unset<span class="token operator">></span>  <span class="token number">30593</span>/TCP
Endpoints:                <span class="token number">172.17</span>.0.3:9376
Session Affinity:         None
External Traffic Policy:  Cluster
Events:                   <span class="token operator">&lt;</span>none<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>负载均衡器的 IP 地址列在 <code v-pre>LoadBalancer Ingress</code> 旁边。</p>
<p><strong>说明：</strong></p>
<p>如果你在 Minikube 上运行服务，你可以通过以下命令找到分配的 IP 地址和端口：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>minikube <span class="token function">service</span> example-service <span class="token parameter variable">--url</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="保留客户端源-ip" tabindex="-1"><a class="header-anchor" href="#保留客户端源-ip" aria-hidden="true">#</a> 保留客户端源 IP</h3>
<p>默认情况下，目标容器中看到的源 IP 将<strong>不是客户端的原始源 IP</strong>。 要启用保留客户端 IP，可以在服务的 <code v-pre>.spec</code> 中配置以下字段：</p>
<ul>
<li>
<p><code v-pre>.spec.externalTrafficPolicy</code> - 表示此 Service 是否希望将外部流量路由到节点本地或集群范围的端点。 有两个可用选项：<code v-pre>Cluster</code>（默认）和 <code v-pre>Local</code>。 <code v-pre>Cluster</code> 隐藏了客户端源 IP，可能导致第二跳到另一个节点，但具有良好的整体负载分布。 <code v-pre>Local</code> 保留客户端源 IP 并避免 LoadBalancer 和 NodePort 类型服务的第二跳， 但存在潜在的不均衡流量传播风险。</p>
</li>
<li>
<p><code v-pre>.spec.healthCheckNodePort</code> - 指定服务的 healthcheck nodePort（数字端口号）。 如果你未指定 <code v-pre>healthCheckNodePort</code>，服务控制器从集群的 NodePort 范围内分配一个端口。 你可以通过设置 API 服务器的命令行选项 <code v-pre>--service-node-port-range</code> 来配置上述范围。 在服务 <code v-pre>type</code> 设置为 LoadBalancer 并且 <code v-pre>externalTrafficPolicy</code> 设置为 <code v-pre>Local</code> 时， Service 将会使用用户指定的 <code v-pre>healthCheckNodePort</code> 值（如果你指定了它）。</p>
</li>
</ul>
<p>可以通过在服务的清单文件中将 <code v-pre>externalTrafficPolicy</code> 设置为 Local 来激活此功能。比如：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> example<span class="token punctuation">-</span>service
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> example
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8765</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">9376</span>
  <span class="token key atrule">externalTrafficPolicy</span><span class="token punctuation">:</span> Local
  <span class="token key atrule">type</span><span class="token punctuation">:</span> LoadBalancer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一些云服务供应商的负载均衡服务不允许你为每个目标配置不同的权重。</p>
<p>由于每个目标在向节点发送流量方面的权重相同，因此外部流量不会在不同 Pod 之间平均负载。 外部负载均衡器不知道每个节点上用作目标的 Pod 数量。</p>
<p>在 <code v-pre>NumServicePods &lt;&lt; _NumNodes</code> 或 <code v-pre>NumServicePods &gt;&gt; NumNodes</code> 时， 即使没有权重，也会看到接近相等的分布。</p>
<p>内部 Pod 到 Pod 的流量应该与 ClusterIP 服务类似，所有 Pod 的概率相同。</p>
<h3 id="回收负载均衡器" tabindex="-1"><a class="header-anchor" href="#回收负载均衡器" aria-hidden="true">#</a> 回收负载均衡器</h3>
<p><strong>特性状态：</strong> <code v-pre>Kubernetes v1.17 [stable]</code></p>
<p>在通常情况下，应在删除 LoadBalancer 类型 Service 后立即清除云服务供应商中的相关负载均衡器资源。 但是，众所周知，在删除关联的服务后，云资源被孤立的情况很多。 引入了针对服务负载均衡器的终结器保护，以防止这种情况发生。 通过使用终结器，在删除相关的负载均衡器资源之前，也不会删除服务资源。</p>
<p>具体来说，如果服务具有 <code v-pre>type</code> LoadBalancer，则服务控制器将附加一个名为 <code v-pre>service.kubernetes.io/load-balancer-cleanup</code> 的终结器。 仅在清除负载均衡器资源后才能删除终结器。 即使在诸如服务控制器崩溃之类的极端情况下，这也可以防止负载均衡器资源悬空。</p>
<h3 id="外部负载均衡器供应商" tabindex="-1"><a class="header-anchor" href="#外部负载均衡器供应商" aria-hidden="true">#</a> 外部负载均衡器供应商</h3>
<p>请务必注意，此功能的数据路径由 Kubernetes 集群外部的负载均衡器提供。</p>
<p>当服务 <code v-pre>type</code> 设置为 LoadBalancer 时，Kubernetes 向集群中的 Pod 提供的功能等同于 <code v-pre>type</code> 设置为 ClusterIP，并通过使用托管了相关 Kubernetes Pod 的节点作为条目对负载均衡器 （从外部到 Kubernetes）进行编程来扩展它。 Kubernetes 控制平面自动创建外部负载均衡器、健康检查（如果需要）和包过滤规则（如果需要）。 一旦云服务供应商为负载均衡器分配了 IP 地址，控制平面就会查找该外部 IP 地址并将其填充到 Service 对象中。</p>
<h2 id="kubernetes-ingress-配置泛域名-tls-证书" tabindex="-1"><a class="header-anchor" href="#kubernetes-ingress-配置泛域名-tls-证书" aria-hidden="true">#</a> Kubernetes Ingress 配置泛域名 TLS 证书</h2>
<p>让 Ingress 高可用可以用 LB， 当然也有 Local 的方法，</p>
<p>这里录了利用 <code v-pre>let's encrytp</code> 泛域名证书实现 Kubernetes 集群外部服务自动证书配置和证书到期自动更新，支持 HTTPS 访问。我们还部署了证书自动分发组件，实现证书文件自动分发到其他 namespace 。</p>
<ul>
<li>创建 Ingress 选用 HTTPS 监听协议时，选用合适的服务器证书能够确保访问安全。</li>
<li>为所有的 HTTPS 域名绑定同一个证书，简化配置 Ingress 下所有 HTTPS 规则的证书，使更新操作更加便捷。</li>
<li>为不同的域名绑定不同的证书，改善服务器与客户端 SSL/TLS。</li>
</ul>
<p>利用 dnspod 、 cert-manager 、let’s encrytp 等开源组件，实现泛域名证书的自动生成、续期管理，为现有kubernetes 集群应用启动 HTTPS，提高系统安全性。</p>
<p><strong>架构:</strong></p>
<p>在 Kubernetes 集群中使用 HTTPS 协议，需要一个证书管理器、一个证书自动签发服务</p>
<p>cert-manager 是一个云原生证书管理开源项目，用于在 Kubernetes 集群中提供 HTTPS 证书并自动续期，支持 Let’s Encrypt, HashiCorp Vault 这些免费证书的签发。在Kubernetes集群中，我们可以通过 Kubernetes Ingress 和 Let’s Encrypt 实现外部服务的自动化 HTTPS。</p>
<p><img src="http://sm.nsddd.top/sm202310122016285.png" alt="在这里插入图片描述"></p>
<p>Issuers/ClusterIssuers：定义使用什么证书颁发机构 (CA) 来去颁发证书，Issuers 和 ClusterIssuers 区别是： issuers</p>
<p>是一个名称空间级别的资源，只能用来签发自己所在 namespace 下的证书，ClusterIssuer 是个集群级别的资源 可以签发任意 namespace 下的证书</p>
<p>Certificate：定义所需的 X.509 证书，该证书将更新并保持最新。Certificate 是一个命名空间资源，当 Certificate 被创建时，它会去创建相应的 CertificateRequest 资源来去申请证书。</p>
<h3 id="安装证书管理器" tabindex="-1"><a class="header-anchor" href="#安装证书管理器" aria-hidden="true">#</a> 安装证书管理器</h3>
<p>安装证书管理器比较简单，直接执行以下脚本就可以了。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create ns cert-manager
helm uninstall cert-manager <span class="token parameter variable">-n</span> cert-manager

helm <span class="token function">install</span> cert-manager jetstack/cert-manager <span class="token punctuation">\</span>
	<span class="token parameter variable">-n</span> cert-manager <span class="token punctuation">\</span>
	<span class="token parameter variable">--version</span> v1.8.0 <span class="token punctuation">\</span>
	<span class="token parameter variable">--set</span> <span class="token assign-left variable">installCRDs</span><span class="token operator">=</span>true <span class="token punctuation">\</span>
	<span class="token parameter variable">--set</span> <span class="token assign-left variable">prometheus.enabled</span><span class="token operator">=</span>false <span class="token punctuation">\</span>
	<span class="token parameter variable">--set</span> <span class="token string">'extraArgs={--dns01-recursive-nameservers-only,--dns01-recursive-nameservers=119.29.29.29:53\,8.8.8.8:53}'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="选择证书颁发者" tabindex="-1"><a class="header-anchor" href="#选择证书颁发者" aria-hidden="true">#</a> 选择证书颁发者</h3>
<p>cert-manager支持以下几种证书颁发者</p>
<ul>
<li>SelfSigned</li>
<li>CA</li>
<li>Vault</li>
<li>Venafi</li>
<li>External</li>
<li>ACME
我们选择使用ACME来颁发证书。</li>
</ul>
<h3 id="选择证书校验方式" tabindex="-1"><a class="header-anchor" href="#选择证书校验方式" aria-hidden="true">#</a> 选择证书校验方式</h3>
<p>常用的校验方式有 HTTP-01 、DNS-01 。</p>
<h4 id="dns-01-校验原理" tabindex="-1"><a class="header-anchor" href="#dns-01-校验原理" aria-hidden="true">#</a> DNS-01 校验原理</h4>
<p>DNS-01 的校验原理是利用 DNS 提供商的 API Key 拿到 DNS 控制权限， 在 Let’s Encrypt 为 ACME 客户端提供令牌后，ACME 客户端 (cert-manager) 将创建从该令牌和我的帐户密钥派生的 TXT 记录，并将该记录放在 _acme-challenge。 然后 Let’s Encrypt 将向 DNS 系统查询该记录，如果找到匹配项，就可以颁发证书。此方法支持泛域名证书。</p>
<h4 id="http-01-校验原理" tabindex="-1"><a class="header-anchor" href="#http-01-校验原理" aria-hidden="true">#</a> HTTP-01 校验原理</h4>
<p>HTTP-01 的校验原理是给域名指向的 HTTP 服务增加一个临时 location ，Let’s Encrypt 会发送 http 请求，参数中 YOUR_DOMAIN 就是被校验的域名，TOKEN 是 ACME 协议的客户端负责放置的文件，ACME 客户端就是 cert-manager，它通过修改或创建 <a href="https://so.csdn.net/so/search?q=Ingress&amp;spm=1001.2101.3001.7020" target="_blank" rel="noopener noreferrer">Ingress<ExternalLinkIcon/></a> 规则来增加这个临时校验路径并指向提供 TOKEN 的服务。Let’s Encrypt 会对比 TOKEN 是否符合预期，校验成功后就会颁发证书。此方法仅适用于给使用 Ingress 暴露流量的服务颁发证书，不支持泛域名证书。</p>
<h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h3>
<h4 id="http-01-配置示例" tabindex="-1"><a class="header-anchor" href="#http-01-配置示例" aria-hidden="true">#</a> HTTP-01 配置示例</h4>
<p>这个配置示例仅供参考，使用这种方式，有多少的 ingress 服务，就需要申请多少张证书 ，比较麻烦，但是配置较为简单，不依赖 DNS 服务商。</p>
<h5 id="_1-创建-ca-群集证书颁发者" tabindex="-1"><a class="header-anchor" href="#_1-创建-ca-群集证书颁发者" aria-hidden="true">#</a> 1. 创建 CA 群集证书颁发者</h5>
<p>证书管理器需要 Issuer 或 ClusterIssuer 资源，才能颁发证书。 这两种 Kubernetes 资源的功能完全相同，区别在于 Issuer 适用于单一命名空间，而 ClusterIssuer 适用于所有命名空间。
<code v-pre>ClusterIssuer.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> cert<span class="token punctuation">-</span>manager.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterIssuer
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> letsencrypt
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">acme</span><span class="token punctuation">:</span>
    <span class="token key atrule">email</span><span class="token punctuation">:</span> xxxx@xyz.cn
    <span class="token key atrule">server</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//acme<span class="token punctuation">-</span>v02.api.letsencrypt.org/directory
    <span class="token key atrule">privateKeySecretRef</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> issuer<span class="token punctuation">-</span>account<span class="token punctuation">-</span>key
    <span class="token key atrule">solvers</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">http01</span><span class="token punctuation">:</span>
        <span class="token key atrule">ingress</span><span class="token punctuation">:</span>
          <span class="token key atrule">class</span><span class="token punctuation">:</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>说明：</p>
<ul>
<li><code v-pre>metadata.name</code>: 是我们创建的签发机构的名称，后面我们创建证书的时候会引用它</li>
<li><code v-pre>spec.acme.email</code>: 是你自己的邮箱，证书快过期的时候会有邮件提醒，不过 cert-manager 会利用 acme 协议自动给我们重新颁发证书来续期</li>
<li><code v-pre>spec.acme.server</code>: 是 acme 协议的服务端，我们使用 Let’s Encrypt</li>
<li><code v-pre>spec.acme.privateKeySecretRef</code>: 指示此签发机构的私钥将要存储到哪个 Secret 对象中</li>
<li><code v-pre>spec.acme.solvers</code>: 这里指示签发机构校验方式，有 http01 和 dns01 两种，该字段下配置的 class 和 name 只能同时存在一个， class 指定使用的 ingress class 名称， name 比较少用，通常用于 kubernetes 的 ingress。</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> ClusterIssuer.yaml <span class="token parameter variable">-n</span> cert-manager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_2-创建-ingress-服务" tabindex="-1"><a class="header-anchor" href="#_2-创建-ingress-服务" aria-hidden="true">#</a> 2. 创建 ingress 服务</h5>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">cert-manager.io/cluster-issuer</span><span class="token punctuation">:</span> letsencrypt
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-body-size</span><span class="token punctuation">:</span> <span class="token string">"0"</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>wikijs
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ingressClassName</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> wiki.xyz.cn
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> wikijs
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">3000</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span> /
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
  <span class="token key atrule">tls</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> wikijs.xyz.cn
    <span class="token key atrule">secretName</span><span class="token punctuation">:</span> ingress<span class="token punctuation">-</span>wikijs<span class="token punctuation">-</span>tls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：</p>
<p>在 annotations 里 设置<code v-pre>cert-manager.io/cluster-issuer</code> 为签名创建的集群证书颁发者 <code v-pre>letsencrypt</code></p>
<p>使用 yaml 文件创建 ingress 后，就可以使用该 ingress 对外提供 https 服务了。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># 创建 ingress</span>
kubectl apply <span class="token punctuation">-</span>f ingress<span class="token punctuation">-</span>wikijs.yaml <span class="token punctuation">-</span>n infra
<span class="token comment"># 查看证书是否自动创建成功</span>
kubectl <span class="token punctuation">-</span>n infra  get certificate
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="dns01配置示例" tabindex="-1"><a class="header-anchor" href="#dns01配置示例" aria-hidden="true">#</a> DNS01配置示例</h4>
<p>使用这种方式需要 DNS 服务商支持通过 API 创建 DNS 记录，正好我的 DNS 服务商是 dnspod 支持，因此在我们的及群里，最终采用了这种方式。</p>
<p>这个方式的配置会比较麻烦，踩了很久的坑，主要是因为我的集群启用了本地 DNS 服务器，默认 cert-manager 会通过本地 DNS 服务器去验证通过 API 创建的 DNS txt记录，会一直检查不到新增的 txt 记录，造成在 challenge 阶段就一直 pendding。解决方案附后。</p>
<h5 id="_1-在-dnspod-创建-api-id-和-api-token" tabindex="-1"><a class="header-anchor" href="#_1-在-dnspod-创建-api-id-和-api-token" aria-hidden="true">#</a> 1. 在 dnspod 创建 API ID 和 API Token</h5>
<p>参考dnspod 云官方文档
记录下创建的 API ID 和 API Token 。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>&lt;API ID <span class="token punctuation">></span>
&lt;API Token<span class="token punctuation">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-安装-cert-manager-webhook-dnspod" tabindex="-1"><a class="header-anchor" href="#_2-安装-cert-manager-webhook-dnspod" aria-hidden="true">#</a> 2. 安装 cert-manager-webhook-dnspod</h5>
<p>使用 helm 安装 roc/cert-manager-webhook-dnspod。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>helm repo add roc https<span class="token punctuation">:</span>//charts.imroc.cc

helm uninstall cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dnspod <span class="token punctuation">-</span>n cert<span class="token punctuation">-</span>manager
helm install cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dnspod roc/cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dnspod \
    <span class="token punctuation">-</span>n cert<span class="token punctuation">-</span>manager \
    <span class="token punctuation">-</span><span class="token punctuation">-</span>set clusterIssuer.secretId=&lt;API ID <span class="token punctuation">></span> \
    <span class="token punctuation">-</span><span class="token punctuation">-</span>set clusterIssuer.secretKey=&lt;API Token<span class="token punctuation">></span> \
    <span class="token punctuation">-</span><span class="token punctuation">-</span>set clusterIssuer.email=xxxx@xyz.cn
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-创建泛域名证书" tabindex="-1"><a class="header-anchor" href="#_3-创建泛域名证书" aria-hidden="true">#</a> 3. 创建泛域名证书</h5>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>xyz-crt.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> cert<span class="token punctuation">-</span>manager.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Certificate
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> xyz<span class="token punctuation">-</span>crt
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">secretName</span><span class="token punctuation">:</span> xyz<span class="token punctuation">-</span>crt
  <span class="token key atrule">issuerRef</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> dnspod
    <span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterIssuer
    <span class="token key atrule">group</span><span class="token punctuation">:</span> cert<span class="token punctuation">-</span>manager.io
  <span class="token key atrule">dnsNames</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">"*.xyz.cn"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_4-验证证书" tabindex="-1"><a class="header-anchor" href="#_4-验证证书" aria-hidden="true">#</a> 4. 验证证书</h5>
<p>查看证书是否创建成功</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">[</span>root@ks<span class="token punctuation">-</span>master infra<span class="token punctuation">]</span><span class="token comment"># kubectl get Certificate -n cert-manager</span>
NAME                                      READY   SECRET                                    AGE
cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dnspod<span class="token punctuation">-</span>ca            True    cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dnspod<span class="token punctuation">-</span>ca            18m
cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dnspod<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>tls   True    cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>dnspod<span class="token punctuation">-</span>webhook<span class="token punctuation">-</span>tls   18m
xyz<span class="token punctuation">-</span>crt                             True    xyz<span class="token punctuation">-</span>crt                             3m12s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上可以看出 xyz-crt 已经创建成功， READY 状态也是 True。</p>
<p>查看证书对应的域名</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">[</span>root@ks<span class="token punctuation">-</span>master infra<span class="token punctuation">]</span><span class="token comment"># kubectl describe Certificate xyz-crt -n cert-manager</span>
<span class="token key atrule">Name</span><span class="token punctuation">:</span>         xyz<span class="token punctuation">-</span>crt
<span class="token key atrule">Namespace</span><span class="token punctuation">:</span>    cert<span class="token punctuation">-</span>manager
<span class="token key atrule">Labels</span><span class="token punctuation">:</span>       &lt;none<span class="token punctuation">></span>
<span class="token key atrule">Annotations</span><span class="token punctuation">:</span>  &lt;none<span class="token punctuation">></span>
<span class="token key atrule">API Version</span><span class="token punctuation">:</span>  cert<span class="token punctuation">-</span>manager.io/v1
<span class="token key atrule">Kind</span><span class="token punctuation">:</span>         Certificate
<span class="token key atrule">Metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">Creation Timestamp</span><span class="token punctuation">:</span>  <span class="token datetime number">2022-05-07T14:19:07Z</span>
  <span class="token key atrule">Generation</span><span class="token punctuation">:</span>          <span class="token number">1</span>
  <span class="token key atrule">Managed Fields</span><span class="token punctuation">:</span>
    <span class="token key atrule">API Version</span><span class="token punctuation">:</span>  cert<span class="token punctuation">-</span>manager.io/v1
    <span class="token key atrule">Fields Type</span><span class="token punctuation">:</span>  FieldsV1
    <span class="token key atrule">fieldsV1</span><span class="token punctuation">:</span>
      <span class="token key atrule">f:status</span><span class="token punctuation">:</span>
        <span class="token key atrule">.</span><span class="token punctuation">:</span>
        <span class="token key atrule">f:conditions</span><span class="token punctuation">:</span>
    <span class="token key atrule">Manager</span><span class="token punctuation">:</span>      cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>certificates<span class="token punctuation">-</span>trigger
    <span class="token key atrule">Operation</span><span class="token punctuation">:</span>    Update
    <span class="token key atrule">Subresource</span><span class="token punctuation">:</span>  status
    <span class="token key atrule">Time</span><span class="token punctuation">:</span>         <span class="token datetime number">2022-05-07T14:19:07Z</span>
    <span class="token key atrule">API Version</span><span class="token punctuation">:</span>  cert<span class="token punctuation">-</span>manager.io/v1
    <span class="token key atrule">Fields Type</span><span class="token punctuation">:</span>  FieldsV1
    <span class="token key atrule">fieldsV1</span><span class="token punctuation">:</span>
      <span class="token key atrule">f:metadata</span><span class="token punctuation">:</span>
        <span class="token key atrule">f:annotations</span><span class="token punctuation">:</span>
          <span class="token key atrule">.</span><span class="token punctuation">:</span>
          <span class="token key atrule">f:kubectl.kubernetes.io/last-applied-configuration</span><span class="token punctuation">:</span>
      <span class="token key atrule">f:spec</span><span class="token punctuation">:</span>
        <span class="token key atrule">.</span><span class="token punctuation">:</span>
        <span class="token key atrule">f:dnsNames</span><span class="token punctuation">:</span>
        <span class="token key atrule">f:issuerRef</span><span class="token punctuation">:</span>
          <span class="token key atrule">.</span><span class="token punctuation">:</span>
          <span class="token key atrule">f:group</span><span class="token punctuation">:</span>
          <span class="token key atrule">f:kind</span><span class="token punctuation">:</span>
          <span class="token key atrule">f:name</span><span class="token punctuation">:</span>
        <span class="token key atrule">f:secretName</span><span class="token punctuation">:</span>
    <span class="token key atrule">Manager</span><span class="token punctuation">:</span>      kubectl<span class="token punctuation">-</span>client<span class="token punctuation">-</span>side<span class="token punctuation">-</span>apply
    <span class="token key atrule">Operation</span><span class="token punctuation">:</span>    Update
    <span class="token key atrule">Time</span><span class="token punctuation">:</span>         <span class="token datetime number">2022-05-07T14:19:07Z</span>
    <span class="token key atrule">API Version</span><span class="token punctuation">:</span>  cert<span class="token punctuation">-</span>manager.io/v1
    <span class="token key atrule">Fields Type</span><span class="token punctuation">:</span>  FieldsV1
    <span class="token key atrule">fieldsV1</span><span class="token punctuation">:</span>
      <span class="token key atrule">f:status</span><span class="token punctuation">:</span>
        <span class="token key atrule">f:revision</span><span class="token punctuation">:</span>
    <span class="token key atrule">Manager</span><span class="token punctuation">:</span>      cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>certificates<span class="token punctuation">-</span>issuing
    <span class="token key atrule">Operation</span><span class="token punctuation">:</span>    Update
    <span class="token key atrule">Subresource</span><span class="token punctuation">:</span>  status
    <span class="token key atrule">Time</span><span class="token punctuation">:</span>         <span class="token datetime number">2022-05-07T14:19:14Z</span>
    <span class="token key atrule">API Version</span><span class="token punctuation">:</span>  cert<span class="token punctuation">-</span>manager.io/v1
    <span class="token key atrule">Fields Type</span><span class="token punctuation">:</span>  FieldsV1
    <span class="token key atrule">fieldsV1</span><span class="token punctuation">:</span>
      <span class="token key atrule">f:status</span><span class="token punctuation">:</span>
        <span class="token key atrule">f:conditions</span><span class="token punctuation">:</span>
          k<span class="token punctuation">:</span><span class="token punctuation">{</span>"type"<span class="token punctuation">:</span><span class="token string">"Ready"</span><span class="token punctuation">}</span><span class="token punctuation">:</span>
            <span class="token key atrule">.</span><span class="token punctuation">:</span>
            <span class="token key atrule">f:lastTransitionTime</span><span class="token punctuation">:</span>
            <span class="token key atrule">f:message</span><span class="token punctuation">:</span>
            <span class="token key atrule">f:observedGeneration</span><span class="token punctuation">:</span>
            <span class="token key atrule">f:reason</span><span class="token punctuation">:</span>
            <span class="token key atrule">f:status</span><span class="token punctuation">:</span>
            <span class="token key atrule">f:type</span><span class="token punctuation">:</span>
        <span class="token key atrule">f:notAfter</span><span class="token punctuation">:</span>
        <span class="token key atrule">f:notBefore</span><span class="token punctuation">:</span>
        <span class="token key atrule">f:renewalTime</span><span class="token punctuation">:</span>
    <span class="token key atrule">Manager</span><span class="token punctuation">:</span>         cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>certificates<span class="token punctuation">-</span>readiness
    <span class="token key atrule">Operation</span><span class="token punctuation">:</span>       Update
    <span class="token key atrule">Subresource</span><span class="token punctuation">:</span>     status
    <span class="token key atrule">Time</span><span class="token punctuation">:</span>            <span class="token datetime number">2022-05-07T14:19:14Z</span>
  <span class="token key atrule">Resource Version</span><span class="token punctuation">:</span>  <span class="token number">4784901</span>
  <span class="token key atrule">UID</span><span class="token punctuation">:</span>               f2c9be82<span class="token punctuation">-</span>f4cb<span class="token punctuation">-</span>4243<span class="token punctuation">-</span>b2c3<span class="token punctuation">-</span>19f64242cc91
<span class="token key atrule">Spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">Dns Names</span><span class="token punctuation">:</span>
    <span class="token important">*.xyz.cn</span>
  <span class="token key atrule">Issuer Ref</span><span class="token punctuation">:</span>
    <span class="token key atrule">Group</span><span class="token punctuation">:</span>      cert<span class="token punctuation">-</span>manager.io
    <span class="token key atrule">Kind</span><span class="token punctuation">:</span>       ClusterIssuer
    <span class="token key atrule">Name</span><span class="token punctuation">:</span>       dnspod
  <span class="token key atrule">Secret Name</span><span class="token punctuation">:</span>  xyz<span class="token punctuation">-</span>crt
<span class="token key atrule">Status</span><span class="token punctuation">:</span>
  <span class="token key atrule">Conditions</span><span class="token punctuation">:</span>
    <span class="token key atrule">Last Transition Time</span><span class="token punctuation">:</span>  <span class="token datetime number">2022-05-07T14:19:14Z</span>
    <span class="token key atrule">Message</span><span class="token punctuation">:</span>               Certificate is up to date and has not expired
    <span class="token key atrule">Observed Generation</span><span class="token punctuation">:</span>   <span class="token number">1</span>
    <span class="token key atrule">Reason</span><span class="token punctuation">:</span>                Ready
    <span class="token key atrule">Status</span><span class="token punctuation">:</span>                <span class="token boolean important">True</span>
    <span class="token key atrule">Type</span><span class="token punctuation">:</span>                  Ready
  <span class="token key atrule">Not After</span><span class="token punctuation">:</span>               <span class="token datetime number">2022-08-05T13:19:11Z</span>
  <span class="token key atrule">Not Before</span><span class="token punctuation">:</span>              <span class="token datetime number">2022-05-07T13:19:12Z</span>
  <span class="token key atrule">Renewal Time</span><span class="token punctuation">:</span>            <span class="token datetime number">2022-07-06T13:19:11Z</span>
  <span class="token key atrule">Revision</span><span class="token punctuation">:</span>                <span class="token number">1</span>
<span class="token key atrule">Events</span><span class="token punctuation">:</span>
  Type    Reason     Age    From                                       Message
  <span class="token punctuation">---</span><span class="token punctuation">-</span>    <span class="token punctuation">---</span><span class="token punctuation">---</span>     <span class="token punctuation">---</span><span class="token punctuation">-</span>   <span class="token punctuation">---</span><span class="token punctuation">-</span>                                       <span class="token punctuation">---</span><span class="token punctuation">---</span><span class="token punctuation">-</span>
  Normal  Issuing    4m35s  cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>certificates<span class="token punctuation">-</span>trigger          Issuing certificate as Secret does not exist
  Normal  Generated  4m35s  cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>certificates<span class="token punctuation">-</span>key<span class="token punctuation">-</span>manager      Stored new private key in temporary Secret resource "xyz<span class="token punctuation">-</span>crt<span class="token punctuation">-</span>4ml59"
  Normal  Requested  4m35s  cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>certificates<span class="token punctuation">-</span>request<span class="token punctuation">-</span>manager  Created new CertificateRequest resource "xyz<span class="token punctuation">-</span>crt<span class="token punctuation">-</span>r76wp"
  Normal  Issuing    4m28s  cert<span class="token punctuation">-</span>manager<span class="token punctuation">-</span>certificates<span class="token punctuation">-</span>issuing          The certificate has been successfully issued
<span class="token punctuation">[</span>root@ks<span class="token punctuation">-</span>master infra<span class="token punctuation">]</span><span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从 Certificate 的描述信息可以看到，这个证书是对应所有 *.xyz.cn 的泛域名。所以可以直接用在集群的任何地方。</p>
<p>查看证书内容</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[root@ks-master infra]# kubectl describe secret xyz-crt -n cert-manager
Name:         xyz-crt
Namespace:    cert-manager
Labels:       &lt;none>
Annotations:  cert-manager.io/alt-names: *.xyz.cn
              cert-manager.io/certificate-name: xyz-crt
              cert-manager.io/common-name: *.xyz.cn
              cert-manager.io/ip-sans: 
              cert-manager.io/issuer-group: cert-manager.io
              cert-manager.io/issuer-kind: ClusterIssuer
              cert-manager.io/issuer-name: dnspod
              cert-manager.io/uri-sans: 

Type:  kubernetes.io/tls

Data
====
tls.crt:  5587 bytes
tls.key:  1675 bytes

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>TLS 证书保存在 cert-manager 命名空间里的 xyz-crt secret。可以供所有 *.xyz.cn 的服务使用。</p>
<h5 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h5>
<p>这个过程中，最大的坑是，我的集群使用了自建的 DNS 服务器，默认 cert-manager 会使用这个集群的自建 DNS SERVER 进行证书发行的验证，虽然通过调用 dnspod 的 webook 在 腾讯云 DNS 服务器上创建的 _acme-challenge 握手数据，但是在我的 自建 DNS 里是查不到的，所以会一直卡 pending 状态，</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@ks-master infra<span class="token punctuation">]</span><span class="token comment"># kubectl get challenge -A</span>
NAMESPACE      NAME                                       STATE     DOMAIN         AGE
cert-manager   xyz-crt-f9kp6-381578565-136350475    pending   xyz.cn   24s

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看原因是：
<code v-pre>Waiting for DNS-01 challenge propagation: DNS record for &quot;xyz.cn&quot; not yet</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[root@ks-master infra]# kcm describe challenge xyz-crt-f9kp6-381578565-136350475
Name:         xyz-crt-f9kp6-381578565-136350475
Namespace:    cert-manager
Labels:       &lt;none>
Annotations:  &lt;none>
API Version:  acme.cert-manager.io/v1
Kind:         Challenge
---
中间略
---
Status:
  Presented:   true
  Processing:  true
  Reason:      Waiting for DNS-01 challenge propagation: DNS record for "xyz.cn" not yet propagated
  State:       pending
Events:
  Type    Reason     Age   From                     Message
  ----    ------     ----  ----                     -------
  Normal  Started    41s   cert-manager-challenges  Challenge scheduled for processing
  Normal  Presented  39s   cert-manager-challenges  Presented challenge using DNS-01 challenge mechanism

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查了很多资料，在官网上找到解决方案。办法是让 cert-manager 强制使用指定的 DNS 服务器进行握手验证。</p>
<p>我是用的是 helm 安装 cert-manager，所以添加一下 set 参数</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>	<span class="token punctuation">-</span><span class="token punctuation">-</span>set 'extraArgs=<span class="token punctuation">{</span><span class="token punctuation">-</span><span class="token punctuation">-</span>dns01<span class="token punctuation">-</span>recursive<span class="token punctuation">-</span>nameservers<span class="token punctuation">-</span>only<span class="token punctuation">,</span><span class="token punctuation">-</span><span class="token punctuation">-</span>dns01<span class="token punctuation">-</span>recursive<span class="token punctuation">-</span>nameservers=119.29.29.29<span class="token punctuation">:</span>53\<span class="token punctuation">,</span>8.8.8.8<span class="token punctuation">:</span><span class="token number">53</span><span class="token punctuation">}</span>'    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="使用-tls-证书配置-ingress" tabindex="-1"><a class="header-anchor" href="#使用-tls-证书配置-ingress" aria-hidden="true">#</a> 使用 TLS 证书配置 ingress</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> wikijs
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> infra
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/proxy-body-size</span><span class="token punctuation">:</span> <span class="token string">'0'</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ingressClassName</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> wiki.xyz.cn
      <span class="token key atrule">secretName</span><span class="token punctuation">:</span> xyz<span class="token punctuation">-</span>crt
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> wiki.xyz.cn
      <span class="token key atrule">http</span><span class="token punctuation">:</span>
        <span class="token key atrule">paths</span><span class="token punctuation">:</span>
          <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /
            <span class="token key atrule">pathType</span><span class="token punctuation">:</span> ImplementationSpecific
            <span class="token key atrule">backend</span><span class="token punctuation">:</span>
              <span class="token key atrule">service</span><span class="token punctuation">:</span>
                <span class="token key atrule">name</span><span class="token punctuation">:</span> wikijs
                <span class="token key atrule">port</span><span class="token punctuation">:</span>
                  <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">3000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上配置完成后，就可以使用 https 来访问新的 wiki.js 服务了。</p>
<h2 id="let-s-encrypt" tabindex="-1"><a class="header-anchor" href="#let-s-encrypt" aria-hidden="true">#</a> Let’s Encrypt</h2>
<p>为了在您的网站上启用 HTTPS，您需要从证书颁发机构（CA）获取证书（一种文件）。 Let’s Encrypt 正是其中一家证书颁发机构。 要从 Let’s Encrypt 获取您网站域名的证书，您必须证明您对域名的实际控制权。 这一过程通常由 Web 主机上运行的 <a href="https://tools.ietf.org/html/rfc8555" target="_blank" rel="noopener noreferrer">ACME 协议<ExternalLinkIcon/></a>客户端完成。</p>
<p>申请证书的最佳方式取决于您是否具备服务器的<a href="https://en.wikipedia.org/wiki/Shell_account" target="_blank" rel="noopener noreferrer">命令行访问权限<ExternalLinkIcon/></a>（也称为 SSH 权限）。 如果您仅使用控制面板（例如 <a href="https://cpanel.net/" target="_blank" rel="noopener noreferrer">cPanel<ExternalLinkIcon/></a>、<a href="https://www.plesk.com/" target="_blank" rel="noopener noreferrer">Plesk<ExternalLinkIcon/></a> 或 <a href="https://wordpress.org/" target="_blank" rel="noopener noreferrer">WordPress<ExternalLinkIcon/></a>）管理您的网站，您很有可能没有命令行访问权限。 您可以联系您的托管服务提供商确认。</p>
<h3 id="拥有命令行访问权限" tabindex="-1"><a class="header-anchor" href="#拥有命令行访问权限" aria-hidden="true">#</a> 拥有命令行访问权限</h3>
<p>我们建议大多数具有命令行访问权限的人使用 <a href="https://certbot.eff.org/" target="_blank" rel="noopener noreferrer">Certbot<ExternalLinkIcon/></a> ACME 客户端。 它可以在不下线您的服务器的前提下自动执行证书颁发和安装。 对于不需要自动配置的用户，Certbot 还提供专家模式。 它易于使用，适用于许多操作系统，并且具有出色的（注：英文）文档。 前往 <a href="https://certbot.eff.org/" target="_blank" rel="noopener noreferrer">Certbot 官网<ExternalLinkIcon/></a>即可获取针对各类操作系统与服务器软件的使用说明。</p>
<p>如果 <a href="https://certbot.eff.org/" target="_blank" rel="noopener noreferrer">Certbot<ExternalLinkIcon/></a> 不能满足您的需求，或者您想尝试别的客户端，还有<a href="https://letsencrypt.org/zh-cn/docs/client-options/" target="_blank" rel="noopener noreferrer">更多 ACME 客户端<ExternalLinkIcon/></a>可供选择。 选定 ACME 客户端软件后，请参阅该客户端的文档。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '76.md' style='float:left'>⬆️上一节🔗  </a><a href = '78.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


