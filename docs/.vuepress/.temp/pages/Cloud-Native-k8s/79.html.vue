<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第79节-openim-使用-harbor-搭建企业级镜像仓库" tabindex="-1"><a class="header-anchor" href="#第79节-openim-使用-harbor-搭建企业级镜像仓库" aria-hidden="true">#</a> 第79节 OpenIM 使用 Harbor 搭建企业级镜像仓库</h1>
<div><a href = '78.md' style='float:left'>⬆️上一节🔗  </a><a href = '80.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="需求" tabindex="-1"><a class="header-anchor" href="#需求" aria-hidden="true">#</a> 需求</h2>
<p>OpenIM 提供了多种公共的镜像注册地址，比如说 aliyun， github， Docker hub ~</p>
<p>阅读 https://github.com/openimsdk/open-im-server/blob/main/docs/conversions/images.md 获取更多的镜像构建指南。</p>
<p>大部分企业都会选择自己做镜像仓库，使用 Harbor 来搭建企业级的镜像仓库，将它集成 CICD Pipeline 流程中，最终替换 Docker Hub，进一步降低镜像存储的成本。</p>
<p>此外，在生产环境下，Harbor 一般都会开启 TLS，所以你还需要准备一个可用的域名。</p>
<blockquote>
<p>中国的服务器使用域名，需要对域名进行备案</p>
</blockquote>
<h2 id="安装-helm" tabindex="-1"><a class="header-anchor" href="#安装-helm" aria-hidden="true">#</a> 安装 Helm</h2>
<p>Helm，以及 集群的部署参考 https://github.com/openimsdk/open-im-server/tree/main/deployments</p>
<h2 id="安装-cert-manager" tabindex="-1"><a class="header-anchor" href="#安装-cert-manager" aria-hidden="true">#</a> 安装 Cert-manager</h2>
<p>接下来我们安装 Cert-manager，它会为我们自动签发免费的 Let’s Encrypt HTTPS 证书，并在过期前自动续期。</p>
<p>首先，运行 helm repo add 命令添加官方 Helm 仓库。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm repo <span class="token function">add</span> jetstack https://charts.jetstack.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，运行 helm repo update 更新本地缓存。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm repo update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，运行 helm install 来安装 Cert-manager。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm <span class="token function">install</span> cert-manager jetstack/cert-manager <span class="token punctuation">\</span>
<span class="token parameter variable">--namespace</span> cert-manager <span class="token punctuation">\</span>
--create-namespace <span class="token punctuation">\</span>
<span class="token parameter variable">--version</span> v1.10.0 <span class="token punctuation">\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">ingressShim.defaultIssuerName</span><span class="token operator">=</span>letsencrypt-prod <span class="token punctuation">\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">ingressShim.defaultIssuerKind</span><span class="token operator">=</span>ClusterIssuer <span class="token punctuation">\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">ingressShim.defaultIssuerGroup</span><span class="token operator">=</span>cert-manager.io <span class="token punctuation">\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">installCRDs</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此外，还需要为 Cert-manager 创建 ClusterIssuer，用来提供签发机构。将下面的内容保存为 <code v-pre>cluster-issuer.yaml</code>。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> cert<span class="token punctuation">-</span>manager.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterIssuer
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> letsencrypt<span class="token punctuation">-</span>prod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">acme</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//acme<span class="token punctuation">-</span>v02.api.letsencrypt.org/directory
    <span class="token key atrule">email</span><span class="token punctuation">:</span> <span class="token string">"cubxxw@openim.io"</span>
    <span class="token key atrule">privateKeySecretRef</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> letsencrypt<span class="token punctuation">-</span>prod
    <span class="token key atrule">solvers</span><span class="token punctuation">:</span>    
    <span class="token punctuation">-</span> <span class="token key atrule">http01</span><span class="token punctuation">:</span>
        <span class="token key atrule">ingress</span><span class="token punctuation">:</span>
          <span class="token key atrule">class</span><span class="token punctuation">:</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，这里你需要将 <code v-pre>spec.acme.email</code> 替换为你真实的邮箱地址。然后运行 kubectl apply 提交到集群内。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$ kubectl apply <span class="token punctuation">-</span>f cluster<span class="token punctuation">-</span>issuer.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="安装和配置-harbor" tabindex="-1"><a class="header-anchor" href="#安装和配置-harbor" aria-hidden="true">#</a> 安装和配置 Harbor</h2>
<p>现在，我们同样使用 Helm 来安装 Harbor，首先添加 Harbor 官方仓库。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm repo <span class="token function">add</span> harbor https://helm.goharbor.io
$ helm repo update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，由于我们需要定制化安装 Harbor，所以需要修改 Harbor 的安装参数，将下面的内容保存为 <code v-pre>values.yaml</code>。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">expose</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ingress
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">certSource</span><span class="token punctuation">:</span> secret
    <span class="token key atrule">secret</span><span class="token punctuation">:</span>
      <span class="token key atrule">secretName</span><span class="token punctuation">:</span> <span class="token string">"harbor-secret-tls"</span>
      <span class="token key atrule">notarySecretName</span><span class="token punctuation">:</span> <span class="token string">"notary-secret-tls"</span>
  <span class="token key atrule">ingress</span><span class="token punctuation">:</span>
    <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
      <span class="token key atrule">core</span><span class="token punctuation">:</span> harbor.openim.io
      <span class="token key atrule">notary</span><span class="token punctuation">:</span> notary.openim.io
    <span class="token key atrule">className</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
      <span class="token key atrule">kubernetes.io/tls-acme</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">persistence</span><span class="token punctuation">:</span>
  <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
    <span class="token key atrule">registry</span><span class="token punctuation">:</span>
      <span class="token key atrule">size</span><span class="token punctuation">:</span> 20Gi
    <span class="token key atrule">chartmuseum</span><span class="token punctuation">:</span>
      <span class="token key atrule">size</span><span class="token punctuation">:</span> 10Gi
    <span class="token key atrule">jobservice</span><span class="token punctuation">:</span>
      <span class="token key atrule">jobLog</span><span class="token punctuation">:</span>
        <span class="token key atrule">size</span><span class="token punctuation">:</span> 10Gi
      <span class="token key atrule">scanDataExports</span><span class="token punctuation">:</span>
        <span class="token key atrule">size</span><span class="token punctuation">:</span> 10Gi
    <span class="token key atrule">database</span><span class="token punctuation">:</span>
      <span class="token key atrule">size</span><span class="token punctuation">:</span> 10Gi
    <span class="token key atrule">redis</span><span class="token punctuation">:</span>
      <span class="token key atrule">size</span><span class="token punctuation">:</span> 10Gi
    <span class="token key atrule">trivy</span><span class="token punctuation">:</span>
      <span class="token key atrule">size</span><span class="token punctuation">:</span> 10Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，我还为 Harbor 配置了 ingress 访问域名，分别是 <code v-pre>harbor.openim.io</code> 和 <code v-pre>notary.openim.io</code>，你需要将它们分别替换成你的真实域名。</p>
<p>然后，再通过 helm install 命令来安装 Harbor，并指定参数配置文件 values.yaml。</p>
<blockquote>
<p><strong>Note</strong></p>
<p>如果 OpenIM 集群部署的 命名空间 是 <code v-pre>openim</code>， 那么需要使用 <code v-pre>-n</code> 指定命名空间。如果命名空间不存在，则可以使用 <code v-pre>--create-namespace</code> chaun'jian</p>
</blockquote>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$ helm install harbor harbor/harbor <span class="token punctuation">-</span>f values.yaml <span class="token punctuation">-</span><span class="token punctuation">-</span>namespace harbor <span class="token punctuation">-</span><span class="token punctuation">-</span>create<span class="token punctuation">-</span>namespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>等待所有 Pod 处于就绪状态。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$ kubectl wait <span class="token punctuation">-</span><span class="token punctuation">-</span>for=condition=Ready pods <span class="token punctuation">-</span><span class="token punctuation">-</span>all <span class="token punctuation">-</span>n harbor <span class="token punctuation">-</span><span class="token punctuation">-</span>timeout 600s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>到这里，Harbor 就已经安装完成了。</p>
<h3 id="配置-dns-解析" tabindex="-1"><a class="header-anchor" href="#配置-dns-解析" aria-hidden="true">#</a> 配置 DNS 解析</h3>
<p>接下来，我们为域名配置 DNS 解析。首先，获取 Ingress-Nginx Loadbalancer 的外网 IP。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$ kubectl get services <span class="token punctuation">-</span><span class="token punctuation">-</span>namespace ingress<span class="token punctuation">-</span>nginx ingress<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>controller <span class="token punctuation">-</span><span class="token punctuation">-</span>output jsonpath='<span class="token punctuation">{</span>.status.loadBalancer.ingress<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>.ip<span class="token punctuation">}</span>'
43.134.63.160
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，为域名配置 DNS 解析。在这个例子中，我需要分别为 <code v-pre>harbor.openim.io</code> 和 <code v-pre>notary.openim.io</code> 配置 A 记录，并指向 <code v-pre>43.134.63.160</code>。</p>
<h2 id="访问-harbor-dashboard" tabindex="-1"><a class="header-anchor" href="#访问-harbor-dashboard" aria-hidden="true">#</a> 访问 Harbor Dashboard</h2>
<p>在访问 Harbor Dashboard 之前，首先我们要确认 Cert-manager 是否已经成功签发了 HTTPS 证书，你可以通过 kubectl get certificate 命令来确认。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get certificate <span class="token parameter variable">-A</span>                     
NAMESPACE   NAME                READY   SECRET              AGE
harbor      harbor-secret-tls   True    harbor-secret-tls   8s
harbor      notary-secret-tls   True    notary-secret-tls   8s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于我们在部署 Harbor 的时候需要配置两个域名，所以这里会出现两个证书。当这两个证书的 Ready 状态都为 True 时，说明 HTTPS 证书已经签发成功了。此外，Cert-manager 自动从 Ingress 对象中读取了 tls 配置，还自动创建了名为 harbor-secret-tls 和 notary-secret-tls 两个包含证书信息的 Secret。</p>
<p>接下来，打开 <a href="https://harbor.openim.io" target="_blank" rel="noopener noreferrer">https://harbor.openim.io<ExternalLinkIcon/></a>  进入 Harbor Dashboard，使用默认账号 admin 和 Harbor12345 即可登录控制台。</p>
<h2 id="推送镜像测试" tabindex="-1"><a class="header-anchor" href="#推送镜像测试" aria-hidden="true">#</a> 推送镜像测试</h2>
<p>现在，让我们来尝试将本地的镜像推送到 Harbor 仓库。首先，在本地拉取 busybox 镜像。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> pull busybox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后，运行 docker login 命令登录到 Harbor 仓库，使用默认的账号密码。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> login harbor.openim.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接下来，重新给 busybox 镜像打标签，指向 Harbor 镜像仓库。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> tag busybox:latest harbor.openim.io/library/busybox:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>和推送到 Docker Hub 的 Tag 相比，推送到 Harbor 需要指定完整的镜像仓库地址、项目名和镜像名。在这里，我使用了默认的 library 项目，当然你也可以新建一个项目，并将 library 替换为新的项目名。</p>
<p>最后，将镜像推送到仓库。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$ docker push harbor.openim.io/library/busybox<span class="token punctuation">:</span>latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>镜像推送成功后，访问 Harbor 控制台，进入 library 项目详情，你将看到我们刚才推送的镜像。</p>
<p>到这里，Harbor 镜像仓库就已经配置好了。</p>
<h2 id="推荐使用-s3-存储镜像" tabindex="-1"><a class="header-anchor" href="#推荐使用-s3-存储镜像" aria-hidden="true">#</a> 推荐使用 S3 存储镜像</h2>
<p>除了使用持久卷来存储镜像以外，Harbor 还支持外部存储。如果你希望大规模使用 Harbor 又不想关注存储问题，那么使用外部存储是一个非常的选择。例如使用 AWS S3 存储桶来存储镜像。</p>
<p>S3 存储方案的优势是，它能为我们提供接近无限存储容量的存储系统，并且按量计费的方式成本也相对可控，同时它还具备高可用性和容灾能力。</p>
<p>要使用 S3 来存储镜像，你需要在安装时修改 Harbor 的安装配置 values.yaml。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">expose</span><span class="token punctuation">:</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> ingress
  <span class="token key atrule">tls</span><span class="token punctuation">:</span>
    <span class="token key atrule">enabled</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">certSource</span><span class="token punctuation">:</span> secret
    <span class="token key atrule">secret</span><span class="token punctuation">:</span>
      <span class="token key atrule">secretName</span><span class="token punctuation">:</span> <span class="token string">"harbor-secret-tls"</span>
      <span class="token key atrule">notarySecretName</span><span class="token punctuation">:</span> <span class="token string">"notary-secret-tls"</span>
  <span class="token key atrule">ingress</span><span class="token punctuation">:</span>
    <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
      <span class="token key atrule">core</span><span class="token punctuation">:</span> harbor.openim.io
      <span class="token key atrule">notary</span><span class="token punctuation">:</span> notary.openim.io
    <span class="token key atrule">className</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
      <span class="token key atrule">kubernetes.io/tls-acme</span><span class="token punctuation">:</span> <span class="token string">"true"</span>
<span class="token key atrule">persistence</span><span class="token punctuation">:</span>
  <span class="token key atrule">imageChartStorage</span><span class="token punctuation">:</span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> s3
    <span class="token key atrule">s3</span><span class="token punctuation">:</span>
      <span class="token key atrule">region</span><span class="token punctuation">:</span> us<span class="token punctuation">-</span>west<span class="token punctuation">-</span><span class="token number">1</span>
      <span class="token key atrule">bucket</span><span class="token punctuation">:</span> bucketname
      <span class="token key atrule">accesskey</span><span class="token punctuation">:</span> AWS_ACCESS_KEY_ID
      <span class="token key atrule">secretkey</span><span class="token punctuation">:</span> AWS_SECRET_ACCESS_KEY
      <span class="token key atrule">rootdirectory</span><span class="token punctuation">:</span> /harbor
  <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
    <span class="token key atrule">chartmuseum</span><span class="token punctuation">:</span>
      <span class="token key atrule">size</span><span class="token punctuation">:</span> 10Gi
    <span class="token key atrule">jobservice</span><span class="token punctuation">:</span>
      <span class="token key atrule">jobLog</span><span class="token punctuation">:</span>
        <span class="token key atrule">size</span><span class="token punctuation">:</span> 10Gi
      <span class="token key atrule">scanDataExports</span><span class="token punctuation">:</span>
        <span class="token key atrule">size</span><span class="token punctuation">:</span> 10Gi
     <span class="token punctuation">...</span><span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，要将 S3 相关配置 region、bucket、accesskey、secretkey 和 rootdirectory 字段修改为实际的值。然后，再使用 <code v-pre>helm install -f values.yaml</code> 来安装。</p>
<h2 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements" aria-hidden="true">#</a> Requirements</h2>
<p>OpenIM provides various public image registry addresses, such as aliyun, github, Docker Hub, and more.</p>
<p>Read https://github.com/openimsdk/open-im-server/blob/main/docs/conversions/images.md for more image building guidelines.</p>
<p>Most enterprises choose to set up their own image repository using Harbor, integrating it into their CI/CD pipeline to eventually replace Docker Hub and further reduce image storage costs.</p>
<p>Additionally, in a production environment, Harbor generally enables TLS, so you will also need to prepare a valid domain name.</p>
<blockquote>
<p>Chinese servers use domain names and require domain registration.</p>
</blockquote>
<h2 id="install-helm" tabindex="-1"><a class="header-anchor" href="#install-helm" aria-hidden="true">#</a> Install Helm</h2>
<p>Helm, along with cluster deployment references, can be found at https://github.com/openimsdk/open-im-server/tree/main/deployments.</p>
<h2 id="install-cert-manager" tabindex="-1"><a class="header-anchor" href="#install-cert-manager" aria-hidden="true">#</a> Install Cert-manager</h2>
<p>Next, let's install Cert-manager, which will automatically issue free Let's Encrypt HTTPS certificates for us and renew them before they expire.</p>
<p>First, run the following command to add the official Helm repository:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm repo <span class="token function">add</span> jetstack https://charts.jetstack.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Then, update the local cache:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm repo update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Next, run the following command to install Cert-manager:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm <span class="token function">install</span> cert-manager jetstack/cert-manager <span class="token punctuation">\</span>
<span class="token parameter variable">--namespace</span> cert-manager <span class="token punctuation">\</span>
--create-namespace <span class="token punctuation">\</span>
<span class="token parameter variable">--version</span> v1.10.0 <span class="token punctuation">\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">ingressShim.defaultIssuerName</span><span class="token operator">=</span>letsencrypt-prod <span class="token punctuation">\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">ingressShim.defaultIssuerKind</span><span class="token operator">=</span>ClusterIssuer <span class="token punctuation">\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">ingressShim.defaultIssuerGroup</span><span class="token operator">=</span>cert-manager.io <span class="token punctuation">\</span>
<span class="token parameter variable">--set</span> <span class="token assign-left variable">installCRDs</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Additionally, you need to create a ClusterIssuer for Cert-manager to provide the signing authority. Save the following content as <code v-pre>cluster-issuer.yaml</code>:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> cert<span class="token punctuation">-</span>manager.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterIssuer
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> letsencrypt<span class="token punctuation">-</span>prod
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">acme</span><span class="token punctuation">:</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//acme<span class="token punctuation">-</span>v02.api.letsencrypt.org/directory
    <span class="token key atrule">email</span><span class="token punctuation">:</span> <span class="token string">"your-email@example.com"</span>
    <span class="token key atrule">privateKeySecretRef</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> letsencrypt<span class="token punctuation">-</span>prod
    <span class="token key atrule">solvers</span><span class="token punctuation">:</span>    
    <span class="token punctuation">-</span> <span class="token key atrule">http01</span><span class="token punctuation">:</span>
        <span class="token key atrule">ingress</span><span class="token punctuation">:</span>
          <span class="token key atrule">class</span><span class="token punctuation">:</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Please replace <code v-pre>spec.acme.email</code> with your actual email address, and then apply it to the cluster:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl apply <span class="token parameter variable">-f</span> cluster-issuer.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="install-and-configure-harbor" tabindex="-1"><a class="header-anchor" href="#install-and-configure-harbor" aria-hidden="true">#</a> Install and Configure Harbor</h2>
<p>Now, we'll also use Helm to install Harbor. First, add the official Harbor repository:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm repo <span class="token function">add</span> harbor https://helm.goharbor.io
$ helm repo update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Next, since we need to customize the installation of Harbor, you'll need to modify Harbor's installation parameters. Save the following content as <code v-pre>values.yaml</code>:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>expose:
  type: ingress
  tls:
    enabled: <span class="token boolean">true</span>
    certSource: secret
    secret:
      secretName: <span class="token string">"harbor-secret-tls"</span>
      notarySecretName: <span class="token string">"notary-secret-tls"</span>
  ingress:
    hosts:
      core: harbor.openim.io
      notary: notary.openim.io
    className: nginx
    annotations:
      kubernetes.io/tls-acme: <span class="token string">"true"</span>
persistence:
  persistentVolumeClaim:
    registry:
      size: 20Gi
    chartmuseum:
      size: 10Gi
    jobservice:
      jobLog:
        size: 10Gi
      scanDataExports:
        size: 10Gi
    database:
      size: 10Gi
    redis:
      size: 10Gi
    trivy:
      size: 10Gi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Additionally, I've configured ingress access domains for Harbor as <code v-pre>harbor.openim.io</code> and <code v-pre>notary.openim.io</code>. You need to replace them with your actual domain names.</p>
<p>Then, install Harbor using the following <code v-pre>helm install</code> command, specifying the configuration file <code v-pre>values.yaml</code>:</p>
<blockquote>
<p><strong>Note</strong>: If the OpenIM cluster is deployed in a namespace other than <code v-pre>openim</code>, you need to use <code v-pre>-n</code> to specify the namespace. If the namespace does not exist, you can use <code v-pre>--create-namespace</code>.</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm <span class="token function">install</span> harbor harbor/harbor <span class="token parameter variable">-f</span> values.yaml <span class="token parameter variable">--namespace</span> harbor --create-namespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Wait for all pods to be in a ready state:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl <span class="token function">wait</span> <span class="token parameter variable">--for</span><span class="token operator">=</span>condition<span class="token operator">=</span>Ready pods <span class="token parameter variable">--all</span> <span class="token parameter variable">-n</span> harbor <span class="token parameter variable">--timeout</span> 600s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>At this point, Harbor has been successfully installed.</p>
<h3 id="configure-dns-resolution" tabindex="-1"><a class="header-anchor" href="#configure-dns-resolution" aria-hidden="true">#</a> Configure DNS Resolution</h3>
<p>Next, configure DNS resolution for your domain name. First, get the external IP of the Ingress-Nginx LoadBalancer:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get services <span class="token parameter variable">--namespace</span> ingress-nginx ingress-nginx-controller <span class="token parameter variable">--output</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">'{.status.loadBalancer.ingress[0].ip}'</span>
<span class="token number">43.134</span>.63.160
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Then, configure DNS resolution for your domain names. In this example, I need to configure A records for <code v-pre>harbor.openim.io</code> and <code v-pre>notary.openim.io</code> and point them to <code v-pre>43.134.63.160</code>.</p>
<h2 id="access-harbor-dashboard" tabindex="-1"><a class="header-anchor" href="#access-harbor-dashboard" aria-hidden="true">#</a> Access Harbor Dashboard</h2>
<p>Before accessing the Harbor Dashboard, first confirm whether Cert-manager has successfully issued the HTTPS certificate. You can use the <code v-pre>kubectl get certificate</code> command to check:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get certificate <span class="token parameter variable">-A</span>                     
NAMESPACE   NAME                READY   SECRET              AGE
harbor      harbor-secret-tls   True    harbor-secret-tls   8s
harbor      notary-secret-tls   True    notary-secret-tls   8s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Since we configured two domains when deploying Harbor, you will see two certificates here. When both certificates have a <code v-pre>Ready</code> status of <code v-pre>True</code>, it means that the HTTPS certificates have been successfully issued. Additionally, Cert-manager automatically reads the tls configuration from the Ingress object and creates two secrets, <code v-pre>harbor-secret-tls</code> and <code v-pre>notary-secret-tls</code>, containing certificate information.</p>
<p>Next, open <a href="https://harbor.openim.io/" target="_blank" rel="noopener noreferrer">https://harbor.openim.io<ExternalLinkIcon/></a> to access the Harbor Dashboard. You can log in to the console using the default account <code v-pre>admin</code> and password <code v-pre>Harbor12345</code>.</p>
<h2 id="test-image-push" tabindex="-1"><a class="header-anchor" href="#test-image-push" aria-hidden="true">#</a> Test Image Push</h2>
<p>Now, let's try pushing a local image to the Harbor repository. First, pull the busybox image locally:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> pull busybox
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Then, run the <code v-pre>docker login</code> command to log in to the Harbor repository using the default credentials:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> login harbor.openim.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Next, re-tag the busybox image to point to the Harbor image repository:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> tag busybox:latest harbor.openim.io/library/busybox:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Compared to pushing to Docker Hub, pushing to Harbor requires specifying the full image repository address, project name, and image name. Here, I used the default <code v-pre>library</code> project, but you can create a new project and replace <code v-pre>library</code> with the new project name.</p>
<p>Finally, push the image to the repository:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> push harbor.openim.io/library/busybox:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>After successfully pushing the image, visit the Harbor console, go to the <code v-pre>library</code> project details, and you will see theimage that we just pushed.</p>
<p>At this point, your Harbor image repository is configured and operational.</p>
<h2 id="recommended-use-s3-storage-for-images" tabindex="-1"><a class="header-anchor" href="#recommended-use-s3-storage-for-images" aria-hidden="true">#</a> Recommended: Use S3 Storage for Images</h2>
<p>In addition to using persistent volumes for image storage, Harbor also supports external storage. If you want to use Harbor extensively and don't want to worry about storage, using external storage is an excellent choice. For example, you can use an AWS S3 bucket to store images.</p>
<p>The advantages of an S3 storage solution include near-infinite storage capacity, cost control with pay-as-you-go billing, high availability, and disaster recovery capabilities.</p>
<p>To use S3 for image storage, you need to modify the Harbor installation configuration in <code v-pre>values.yaml</code> during installation:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>expose:
  type: ingress
  tls:
    enabled: <span class="token boolean">true</span>
    certSource: secret
    secret:
      secretName: <span class="token string">"harbor-secret-tls"</span>
      notarySecretName: <span class="token string">"notary-secret-tls"</span>
  ingress:
    hosts:
      core: harbor.openim.io
      notary: notary.openim.io
    className: nginx
    annotations:
      kubernetes.io/tls-acme: <span class="token string">"true"</span>
persistence:
  imageChartStorage:
    type: s3
    s3:
      region: us-west-1
      bucket: bucketname
      accesskey: AWS_ACCESS_KEY_ID
      secretkey: AWS_SECRET_ACCESS_KEY
      rootdirectory: /harbor
  persistentVolumeClaim:
    chartmuseum:
      size: 10Gi
    jobservice:
      jobLog:
        size: 10Gi
      scanDataExports:
        size: 10Gi
     <span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Make sure to replace the S3 configuration fields (<code v-pre>region</code>, <code v-pre>bucket</code>, <code v-pre>accesskey</code>, <code v-pre>secretkey</code>, and <code v-pre>rootdirectory</code>) with your actual values. Then, install Harbor using <code v-pre>helm install</code> with the <code v-pre>-f values.yaml</code> option.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ helm <span class="token function">install</span> harbor harbor/harbor <span class="token parameter variable">-f</span> values.yaml <span class="token parameter variable">--namespace</span> harbor --create-namespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>With this configuration, Harbor will use S3 storage for images.</p>
<p>Congratulations! You have now completed the installation and configuration of Harbor, and you have the option to use S3 storage for your images if desired. Your Docker images can be securely stored and managed in your own Harbor image repository.</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '78.md' style='float:left'>⬆️上一节🔗  </a><a href = '80.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


