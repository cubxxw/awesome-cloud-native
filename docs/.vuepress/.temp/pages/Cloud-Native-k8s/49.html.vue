<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第49节-深入理解-kube-apiserver" tabindex="-1"><a class="header-anchor" href="#第49节-深入理解-kube-apiserver" aria-hidden="true">#</a> 第49节 深入理解 Kube-APIServer</h1>
<div><a href = '48.md' style='float:left'>⬆️上一节🔗  </a><a href = '50.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="深入理解kube-apiserver" tabindex="-1"><a class="header-anchor" href="#深入理解kube-apiserver" aria-hidden="true">#</a> 深入理解Kube-APIServer</h2>
<p>kube-apiserver是Kubernetes最重要的核心组件之一，主要提供以下的功能</p>
<ul>
<li>提供集群管理的REST API接口，包括认证授权、数据校验以及集群状态变更等</li>
<li>提供其他模块之间的数据交互和通信的枢纽（其他模块通过API Server查询或修改数据，只有API Server才直接操作etcd）</li>
</ul>
<p><strong>apiserver 主要功能：</strong></p>
<ul>
<li><strong>认证</strong>：使用集群判断身份。</li>
<li><strong>鉴权</strong>：使用操作 CRUD，需要权限。</li>
<li><strong>准入：</strong> 对于Kubernetes来说，需要一些额外的 actions，例如写入的值不规范，需要对其进行修改，修改后需要 校验。最后需要 限流，以防止恶意或者漏洞导致拥堵
<ul>
<li>Mutating</li>
<li>Validating</li>
<li>Admission</li>
</ul>
</li>
<li><strong>限流</strong></li>
<li>APIServer对象的实现</li>
</ul>
<h2 id="访问控制" tabindex="-1"><a class="header-anchor" href="#访问控制" aria-hidden="true">#</a> 访问控制</h2>
<p><strong>API Server 是所有组件交互的 中间枢纽。</strong></p>
<p>Kubernetes API的每个请求都会经过多阶段的访问控制之后才会被接受，这包括<strong>认证</strong>、<strong>授权</strong>以及<strong>准入控制</strong>（Admission Control）等。</p>
<blockquote>
<p>前面的是 Mutating Webhook，可以改一个对象的值，而 Validating Webhook 是不可以修改对象的值，不生效的。</p>
</blockquote>
<p><img src="http://sm.nsddd.top/sm202303051431637.png" alt="img"></p>
<p><strong>更加详细的请求处理流程：</strong></p>
<p><img src="http://sm.nsddd.top/sm202303051430312.jpeg" alt="img"></p>
<blockquote>
<p><strong>📜 对上面的解释：</strong></p>
<p>如何处理API请求：API源码存在于kubernetes/pkg/api路径中，会处理集群内以及集群外客户端的请求。</p>
<p>那么，当HTTP请求到达Kubernetes API时，具体会发现什么呢？从上层看，会发现以下交互：</p>
<ol>
<li>
<p>HTTP请求由一串过滤器（filters）进行处理，这些过滤器注册在DefaultBuildHandlerChain()（参阅源码：<em>https://github.com/kubernetes/apiserver中的config.go</em>）中，并执行相应的处理。过滤器要么会将信息传递并附加到ctx.RequestInfo上（例如通过了身份认证的用户），要么返回适当的HTTP响应代码。</p>
</li>
<li>
<p>第二步，复用器（multiplexer，参阅源码：<em>https://github.com/kubernetes/apiserver中的container.go</em>）会根据HTTP路径，将HTTP请求路由到相应的处理程序（handler）。</p>
</li>
<li>
<p>第三步，routes（在routes/*中定义）会将处理程序（handler）与HTTP路径进行连接。</p>
</li>
<li>
<p>第四步，按照API Group进行注册的处理程序（参阅源码：<em>https://github.com/kubernetes/apiserver中的groupversion.go和installer.go</em>），会处理HTTP请求和上下文（context，如user、rights等），并将请求的对象从存储中传送出来。</p>
</li>
</ol>
<p>注意，为了简洁，在上图中我们省略了HTTP路径中的<code v-pre>$NAMESPACE</code>字段。</p>
<p>现在我们进一步深入的对前文中提到的DefaultBuildHandlerChain()中建立的过滤器（filters）进行介绍：</p>
<p>**WithRequestInfo()：**在requestinfo.go中定义，将RequestInfo附加到上下文中。</p>
<p>**WithMaxInFlightLimit()：**在maxinflight.go中定义，对当前的请求数量进行限制。</p>
<p>**WithTimeoutForNonLongRunningRequests()：**在timeout.go中定义，超时暂停非长时间运行请求（如大多数GET，PUT，POST，DELETE请求），这种请求与长时间运行请求（如watch和proxy请求）正好相反。</p>
<p>**WithPanicRecovery()：**在wrap.go中定义，包装一个http Handler来恢复和记录报错。</p>
<p>**WithCORS()：**在cors.go中定义，提供了一个CORS实现；CORS代表跨原始资源共享（Cross-Origin Resource Sharing），是一种允许嵌入在HTML页面中的JavaScript生成XMLHttpRequests请求到一个域（domain）的机制，这个域不同于JavaScript的初始起源。</p>
<p>**WithAuthentication()：**在authentication.go中定义，尝试以用户身份对给定的请求进行验证，并将用户信息存储在提供的上下文中。成功后，授权HTTP header将从请求中删除。</p>
<p>**WithAudit()：**在audit.go中定义，使用所有传入请求的审计日志信息来充实handler。审计日志的条目包含很多信息，例如请求的源IP、调用操作的用户信息以及请求的命名空间等。</p>
<p>**WithImpersonation()：**在impersonation.go中定义，通过检查试图对用户进行修改的请求（类似sudo），来对假用户进行处理；</p>
<p>**WithAuthorization()：**在authorization.go中定义，将所有授权的请求传递给已经将请求分发给正确的handler的复用器，否则返回禁止错误（forbidden error）。</p>
</blockquote>
<h2 id="认证" tabindex="-1"><a class="header-anchor" href="#认证" aria-hidden="true">#</a> 认证</h2>
<p>开启TLS时，<strong>所有的请求都需要首先认证。</strong> Kubernetes支持多种认证机制，并支持同时开启多个认证插件（只要有一个认证通过即可）。如果认证成功，则用户的<code v-pre>username</code>会传入授权模块做进一步授权验证；而对于认证失败的请求则返回<code v-pre>HTTP 401</code>。</p>
<h3 id="认证插件" tabindex="-1"><a class="header-anchor" href="#认证插件" aria-hidden="true">#</a> 认证插件</h3>
<p><strong>我们上一节学的 ETCD ，知道 ETCD 作为 Kubernetes 的数据库，多么的重要：</strong></p>
<blockquote>
<p>我们知道，不论是通过kubectl客户端还是REST请求访问K8s集群，最终都需要经过API Server来进行资源的操作，生效结果会被持久化至etcd中，etcd中的数据安全就变得十分重要。为了保证etcd的安全性，K8s只允许API Server 去访问操作etcd，此时API Server就担负起了整个etcd的安全。那么K8s是如何管控和保障API Server访问过程的安全的呢？</p>
<p>认证的方式主要有：客户端证书、密码、普通token、bootstrap token和JWT认证(主要用于Service Account)。认证模块会检查请求头或者客户端证书的内容，我们可以同时配置一种或几种方式对请求进行认证。多种认证方式会被依次执行，只要一种方式通过，请求便得到合法认证。当所有方式都未通过时，会返回401状态码并中断请求。认证解决的问题是校验访问方是否合法并识别其身份。</p>
</blockquote>
<p><strong>apiserver 支持多种认证方式：</strong></p>
<ul>
<li>
<p><strong>X509证书</strong></p>
<ul>
<li>使用X509客户端证书只需要API Server启动时配置--client-ca-file=SOMEFILE。在证书认证时，<strong>其CN域用作用户名，而组织机构域则用作group名</strong>。</li>
</ul>
</li>
<li>
<p><strong>静态Token文件</strong></p>
<ul>
<li>使用静态Token文件认证只需要API Server启动时配置--token-auth-file=SOMEFILE。</li>
<li>该文件为csv格式，每行至少包括三列token,username,user id,最后一列为可选的 group 字段。</li>
<li>例如：token,user,uid,&quot;group1,group2,group3”</li>
</ul>
</li>
<li>
<p><strong>引导Token</strong></p>
<ul>
<li>为了支持平滑地启动引导新的集群，Kubernetes 包含了一种动态管理的持有者令牌类型， 称作 启动引导令牌（Bootstrap Token）。</li>
<li>这些令牌以 Secret 的形式保存在 kube-system 名字空间中，可以被动态管理和创建。</li>
<li>控制器管理器包含的 TokenCleaner 控制器能够在启动引导令牌过期时将其删除。</li>
<li>在使用kubeadm部署Kubernetes时，可通过kubeadm token list命令查询。</li>
</ul>
</li>
<li>
<p><strong>静态密码文件</strong></p>
<ul>
<li>需要API Server启动时配置<code v-pre>--basic-auth-file=SOMEFILE</code>，文件格式为csv，每行至少三列<code v-pre>password, user, uid</code>，后面是可选的group名 password,user,uid,&quot;group1,group2,group3”</li>
</ul>
</li>
<li>
<p>ServiceAccount</p>
<ul>
<li>ServiceAccount是Kubernetes自动生成的，并会自动挂载到容器的/run/secrets/kubernetes.io/serviceaccount目录中。</li>
</ul>
</li>
<li>
<p>OpenID</p>
<ul>
<li>OAuth 2.0的认证机制</li>
</ul>
</li>
<li>
<p>Webhook 令牌身份认证</p>
<ul>
<li>--authentication-token-webhook-config-file 指向一个配置文件，其中描述 如何访问远程的 Webhook 服务。</li>
<li>--authentication-token-webhook-cache-ttl 用来设定身份认证决定的缓存时间。 默认时长为 2 分钟。</li>
</ul>
</li>
<li>
<p>匿名请求</p>
<ul>
<li>如果使用AlwaysAllow以外的认证模式，则匿名请求默认开启，但可用--anonymous-auth=false禁止匿名请求。</li>
</ul>
<blockquote>
<p>匿名请求不建议开启，一般用作 测试 用的。</p>
</blockquote>
</li>
</ul>
<h3 id="x509证书" tabindex="-1"><a class="header-anchor" href="#x509证书" aria-hidden="true">#</a> X509证书</h3>
<p>如果你不了解数字证书和 CA 的基本原理，可以先阅读下这篇文章<a href="https://www.zhaohuabing.com/post/2020-03-19-pki/" target="_blank" rel="noopener noreferrer">《数字证书原理》<ExternalLinkIcon/></a></p>
<p>K8s中组件之间通信，证书的验证是在协议层通过TLS完成的，TLS验证分为2种：</p>
<ul>
<li>服务器单向认证：服务器端持有证书证明自己身份，用于服务端不关心客户端身份而客户端需要确认服务器身份的场景。例如火车票购票网站，我们必须保证其是官方而非恶意服务器，但网站允许任何客户端进行连接访问；</li>
<li>双向TLS认证：双方都要持有证书，并验证对方证书确认身份。一般用于服务端持有信息比较敏感，只有特定客户端才能访问的场景。例如：K8s内组件提供的接口往往包含集群内部信息，若被非法访问会影响整体安全，所以K8s内部组件之间都是双向TLS认证。</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202303051505019.webp" alt="图2 双向TLS过程"></p>
<p>当两个组件进行双向TLS认证时，会涉及到下表中的相关文件：</p>
<table>
<thead>
<tr>
<th style="text-align:left">名称</th>
<th style="text-align:left">作用</th>
<th style="text-align:left">例子</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">服务端证书</td>
<td style="text-align:left">包含服务端公钥和服务端身份信息</td>
<td style="text-align:left">通过根证书手动或者kubeadm自动生成的API Server服务端证书文件apiserver.crt</td>
</tr>
<tr>
<td style="text-align:left">服务器私钥</td>
<td style="text-align:left">主要用于TLS认证时进行数字签名，证明自己是服务端证书的拥有者</td>
<td style="text-align:left">通过根证书手动或者kubeadm生成的API Server服务端私钥文件apiserver.key</td>
</tr>
<tr>
<td style="text-align:left">客户端证书</td>
<td style="text-align:left">包含客户端公钥和客户端身份信息</td>
<td style="text-align:left">由同一个CA根证书签发的.crt文件</td>
</tr>
<tr>
<td style="text-align:left">客户端私钥</td>
<td style="text-align:left">主要用于TLS认证时进行数字签名，证明自己是客户端证书的拥有者</td>
<td style="text-align:left">由同一个CA根证书签发的.key文件</td>
</tr>
<tr>
<td style="text-align:left">服务端CA根证书</td>
<td style="text-align:left">签发服务端证书的 CA 根证书</td>
<td style="text-align:left">通过openssl等工具生成的ca.crt文件,并在服务端启动时进行指定</td>
</tr>
<tr>
<td style="text-align:left">客户端CA根证书</td>
<td style="text-align:left">签发客户端证书的 CA 根证书</td>
<td style="text-align:left">通过openssl等工具生成的ca.crt文件,并在客户端启动时进行指定(一般与服务端使用一个)</td>
</tr>
</tbody>
</table>
<h4 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> demo</h4>
<p>不同过用户名和密码，也不通过 Token，也是可以知道你的身份。我可以办证书。</p>
<blockquote>
<p>带上证书到 API Server（学生证） ，API Server 就知道你的身份。</p>
</blockquote>
<p><strong>Kubernetes 本身就是一种 CA，API Server 本身就是一种 CA</strong></p>
<p><strong>Kubernetes 的 API Server 的证书都放在 <code v-pre>/etc/kubernetes/pki</code> 下面</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">ls</span> /etc/kubernetes/pki
apiserver.crt              apiserver.key                 ca.crt  front-proxy-ca.crt      front-proxy-client.key
apiserver-etcd-client.crt  apiserver-kubelet-client.crt  ca.key  front-proxy-ca.key      sa.key
apiserver-etcd-client.key  apiserver-kubelet-client.key  etcd    front-proxy-client.crt  sa.pub
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 k8s 里的 <code v-pre>ca</code> 来为 <code v-pre>myuser</code> 用户签发证书，并通过 <code v-pre>rbac</code> 为该用户添加权限，并配置到 <code v-pre>kubeconfig</code> 中。</p>
<p>创建一个私钥和 csr 文件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>openssl genrsa <span class="token parameter variable">-out</span> myuser.key <span class="token number">2048</span>
openssl req <span class="token parameter variable">-new</span> <span class="token parameter variable">-key</span> myuser.key <span class="token parameter variable">-out</span> myuser.csr
openssl req <span class="token parameter variable">-new</span> <span class="token parameter variable">-x509</span> <span class="token parameter variable">-days</span> <span class="token number">10000</span> <span class="token parameter variable">-key</span> .key <span class="token parameter variable">-out</span> <span class="token operator">&lt;</span>CA_public<span class="token operator">></span>.crt 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>base64 以下</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat myuser.csr | base64 | tr -d "\n"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后使用 base64 后的值往 k8s 里创建一个 csr 对象，表示我们需要签发一个证书</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cat &lt;&lt;EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: myuser
spec:
  request: LS0tLS1CRUdJTiBDRVJUSUZJQ0FURSBSRVFVRVNULS0tLS0KTUlJREJ6Q0NBZThDQVFBd2dZNHhDekFKQmdOVkJBWVRBa05PTVJFd0R3WURWUVFJREFoVGFHRnVaMGhoYVRFUgpNQThHQTFVRUJ3d0lVMmhoYm1kSVlXa3hEekFOQmdOVkJBb01CbU51WTJGdGNERVBNQTBHQTFVRUN3d0dZMjVqCllXMXdNUTh3RFFZRFZRUUREQVpqYm1OaGJYQXhKakFrQmdrcWhraUc5dzBCQ1FFV0Z6TXlPVE14TnpJM05URnUKYzNNaloyMWhhV3d1WTI5dE1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBd1o0cgpRWE9rL3NSWW9OMUJKckRnTE01cHB0aGdlczJLOVE1VFJyTGFtUkZwMThpclN5b0tjQi8rdzlGdWlPYWQ5VmdBCmdveC9MSGFCdnNibnpiVmlHVHc4ODhSQXNXODVLengwc2tlYTRiVWtrWjhpVjRLb2xRNzRIWXp0N3l5a1JMVHIKQjYrMUk3MmZQUDhHMFYxQ1JEQkN6ZE5RNUE3ZFBRcVJHbHg5Wm9lUThFYU1jQnU5dXE1Ti96aG9PRVNKL1BhRwprdFVQNHR0YWI0NSs4MkNLVEZiZWZKbENSUmpucXRoSVRuME0xRmxOVlIvYW9HR3N3NndYTjhmaXZVRzk4aXNSCmJjUWpKMVRnSEltYTZYc3lKSWFnWDVScCtqY0ZmMzdOcjljdG1GUTZBbkNUUUVmVlVLdGgybnFxK2lBUERBQWQKNUdvcEVlaUt4N0tpSjNsU253SURBUUFCb0RNd0ZRWUpLb1pJaHZjTkFRa0hNUWdNQmpFeU16UTFOakFhQmdrcQpoa2lHOXcwQkNRSXhEUXdMZUdsdmJtZDRhVzUzWldrd0RRWUpLb1pJaHZjTkFRRUxCUUFEZ2dFQkFHdk5wUk5YCjhXTzFlb0ZGT2k2eHRkSW1SKzY3eHYzSk1NSm9pYXkvdkEvalZFU3BDYXRWanBVTW9WbnlMT1pDUXhsbHRUakQKK0J1TDU1NEN1Y1pTYjN2ellMR0MwdXVqTlBBY2lSVHkrMmNKNVdmMUtTdjFVZ0lpbzNWRjJ4K1FybVJ6Uk54MApsa0w5M1BmYlIxMVdwNktLWE5UOGRGejNsdmNXV3lmSlpMOC8vV3dRZlFJV2IyRG1wQXQ1a2Jnekw4NEFNYjg0CnVITkh2RGxBN1pYS0k5NzRMSGdZUlptWW9paHkzanBiSzgxcFYzdzFFSWx6UlhZbG5tWFVrWmExVElsbjllUlEKREtaV2xmOXJGb1dVM0dDQXN2MWxCYytGMmxjY1ZyYTNDaktuTnBUdmFIWG4vQkhUREZGT1JmSTNhNGMrYzl3SgpLb3hpS3VDVW5TYkdEOGs9Ci0tLS0tRU5EIENFUlRJRklDQVRFIFJFUVVFU1QtLS0tLQo=#
  signerName: kubernetes.io/kube-apiserver-client
  expirationSeconds: 86400  # one day
  usages:
  - client auth
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后用默认的管理员账号执行命令，同意这个请求</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl certificate approve myuser
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着在查看就可以发现，证书已经被签发好了</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get csr/myuser <span class="token parameter variable">-o</span> yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 jsonpath 把我们的证书提取出来，写入到 myuser.crt 文件中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get csr myuser <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">'{.status.certificate}'</span><span class="token operator">|</span> base64 <span class="token parameter variable">-d</span> <span class="token operator">></span> myuser.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用证书和key来配置 kubeconfig 中的 user</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl config set-credentials myuser --client-key=myuser.key --client-certificate=myuser.crt --embed-certs=true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 role 和 rolebinding 为该用户添加权限</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl create role developer --verb=create --verb=get --verb=list --verb=update --verb=delete --resource=pods
kubectl create rolebinding developer-binding-myuser --role=developer --user=myuser
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>kubectl 命令中指定使用该用户进行查询：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 指定使用 myuser 这个用户来访问 apiserver
kubectl get po --user myuser
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="static-token-认证-demo" tabindex="-1"><a class="header-anchor" href="#static-token-认证-demo" aria-hidden="true">#</a> static token 认证 demo</h3>
<p><strong>static token 认证方式是 apiserver 中最简单的一种认证方式。</strong></p>
<ul>
<li>使用 静态文件 token 文件认证只需要 API Server 启动时配置 <code v-pre>–token-auth-file=SOMEFILE</code></li>
<li>改文件为 <code v-pre>csv</code> 格式，每行至少包括三列<code v-pre>token,username,user id</code></li>
</ul>
<p>首先准备一个 <code v-pre>static-token</code> 文件，完整内容如下：</p>
<blockquote>
<p><strong>该文件为csv格式，每行至少包括三列<code v-pre>token,username,user id</code>,最后一列为可选的 group 字段。</strong></p>
</blockquote>
<p><strong>新建目录，存放该文件：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">cat</span> static-token
cncamp-token,cncamp,1000,<span class="token string">"group1,group2,group3"</span>

❯ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/kubernetes/auth
❯ <span class="token function">cp</span> static-token /etc/kubernetes/auth
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改<code v-pre>/etc/kubernetes/manifests/kube-apiserver.yaml</code>文件，增加启动参数。</p>
<p><strong>做备份：API Server 启动时配置 <code v-pre>–token-auth-file=SOMEFILE</code></strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">cp</span> /etc/kubernetes/manifests/kube-apiserver.yaml ~/kube-apiserver.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p>1）添加**<code v-pre>--token-auth-file=/etc/kubernetes/auth/static-token</code>**参数，</p>
<p><img src="http://sm.nsddd.top/sm202303051620735.png" alt="asd"></p>
</li>
<li>
<p>2）同时由于 <code v-pre>apiserver</code> 是容器化运行的，还需要额外添加<code v-pre>hostpath</code> 的 <code v-pre>mount</code>，把存放 <code v-pre>static token</code> 的目录也挂载到容器中。</p>
<p><img src="http://sm.nsddd.top/sm202303051623527.png" alt="image-20230305162319477"></p>
<p><img src="http://sm.nsddd.top/sm202303051625169.png" alt="image-20230305162510114"></p>
</li>
</ul>
<p>修改完成后 kubelet 就会自动重启 <code v-pre>apiserver pod</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后我们可以拿 <code v-pre>static token</code> 去访问 <code v-pre>apiserver</code> 了：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">curl</span> https://192.168.137.133:6443/api/v1/namespaces/default <span class="token parameter variable">-H</span> <span class="token string">"Authorization: Bearer cncamp-token"</span> <span class="token parameter variable">-k</span>
<span class="token punctuation">{</span>
  <span class="token string">"kind"</span><span class="token builtin class-name">:</span> <span class="token string">"Status"</span>,
  <span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span> <span class="token string">"v1"</span>,
  <span class="token string">"metadata"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    
  <span class="token punctuation">}</span>,
  <span class="token string">"status"</span><span class="token builtin class-name">:</span> <span class="token string">"Failure"</span>,
  <span class="token string">"message"</span><span class="token builtin class-name">:</span> <span class="token string">"namespaces <span class="token entity" title="\&quot;">\"</span>default<span class="token entity" title="\&quot;">\"</span> is forbidden: User <span class="token entity" title="\&quot;">\"</span>cncamp<span class="token entity" title="\&quot;">\"</span> cannot get resource <span class="token entity" title="\&quot;">\"</span>namespaces<span class="token entity" title="\&quot;">\"</span> in API group <span class="token entity" title="\&quot;">\"</span><span class="token entity" title="\&quot;">\"</span> in the namespace <span class="token entity" title="\&quot;">\"</span>default<span class="token entity" title="\&quot;">\"</span>"</span>,
  <span class="token string">"reason"</span><span class="token builtin class-name">:</span> <span class="token string">"Forbidden"</span>,
  <span class="token string">"details"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">"name"</span><span class="token builtin class-name">:</span> <span class="token string">"default"</span>,
    <span class="token string">"kind"</span><span class="token builtin class-name">:</span> <span class="token string">"namespaces"</span>
  <span class="token punctuation">}</span>,
  <span class="token string">"code"</span><span class="token builtin class-name">:</span> <span class="token number">403</span>
<span class="token punctuation">}</span><span class="token comment">#  </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>此时 API Server 就知道当前的用户是：<code v-pre>cncamp</code></p>
</blockquote>
<p>当然了，现在访问会提升 <code v-pre>403</code>，因为还没有为该用户配置权限（<strong>授权</strong>），不过可以说明的是此时 apiserver 已经能认识我们了。</p>
<p><strong>现在就是多用户集群了，我们此时就是通过静态 Token 方式来创建多用户，此时就会产生隔离。</strong></p>
<blockquote>
<p>比如说，五个人，每个人用自己的 Token。</p>
</blockquote>
<p>当一个来自于 User 的 Request 通过认证之后，该 Request 必须要进行授权。
一个Request必须包含以下内容：</p>
<ul>
<li>the username of the requester</li>
<li>the requested action</li>
<li>the object affected by the action
该Request的授权能否通过，取决于是现有的授权规则是否声明了允许该user去完成其请求的action。</li>
</ul>
<p>如下面例子所示，用户 bob 仅仅被允许在 namespace <code v-pre>projectCaribou</code> 中读取 pod 资源：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">{</span>
    <span class="token key atrule">"apiVersion"</span><span class="token punctuation">:</span> <span class="token string">"abac.authorization.kubernetes.io/v1beta1"</span><span class="token punctuation">,</span>
    <span class="token key atrule">"kind"</span><span class="token punctuation">:</span> <span class="token string">"Policy"</span><span class="token punctuation">,</span>
    <span class="token key atrule">"spec"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token key atrule">"user"</span><span class="token punctuation">:</span> <span class="token string">"bob"</span><span class="token punctuation">,</span>
        <span class="token key atrule">"namespace"</span><span class="token punctuation">:</span> <span class="token string">"projectCaribou"</span><span class="token punctuation">,</span>
        <span class="token key atrule">"resource"</span><span class="token punctuation">:</span> <span class="token string">"pods"</span><span class="token punctuation">,</span>
        <span class="token key atrule">"readonly"</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时用户 bob 发起以下请求，是可以通过授权的:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"apiVersion"</span><span class="token operator">:</span> <span class="token string">"authorization.k8s.io/v1beta1"</span><span class="token punctuation">,</span>
  <span class="token property">"kind"</span><span class="token operator">:</span> <span class="token string">"SubjectAccessReview"</span><span class="token punctuation">,</span>
  <span class="token property">"spec"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"resourceAttributes"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"namespace"</span><span class="token operator">:</span> <span class="token string">"projectCaribou"</span><span class="token punctuation">,</span>
      <span class="token property">"verb"</span><span class="token operator">:</span> <span class="token string">"get"</span><span class="token punctuation">,</span>
      <span class="token property">"group"</span><span class="token operator">:</span> <span class="token string">"unicorn.example.org"</span><span class="token punctuation">,</span>
      <span class="token property">"resource"</span><span class="token operator">:</span> <span class="token string">"pods"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下述操作，都是会被授权机制给拒绝的：</p>
<ul>
<li>如果用户 bob 试图对 namespace <code v-pre>projectCaribou</code>中的资源进行写操作（<code v-pre>create</code> or <code v-pre>update</code>）；</li>
<li>如果用户 bob 试图对其它 namespace 中的资源进行读操作（<code v-pre>get</code>）</li>
</ul>
<p>k8s的Authorization机制要求用户使用通用的 REST 属性来和控制系统进行交互，这是因为控制系统可能需要和其它API进行交互。
k8s的Authorization机制目前支持多种授权模型，如：</p>
<ul>
<li>Node Mode, v1.7+支持，配合NodeRestriction准入控制来限制kubelet仅可访问node、endpoint、pod、service以及secret、configmap、PV和PVC等相关的资源。</li>
<li>ABAC Mode,</li>
<li>RBAC Mode,</li>
<li>Webhook Mode，</li>
<li>AlwaysDeny仅用来测试，</li>
<li>AlwaysAllow则允许所有请求（会覆盖其他模式）</li>
</ul>
<p>用户在启动kube-apiserver的时候可以指定多种模型。
如果设置了多种模型，k8s会按顺序进行检查。</p>
<ul>
<li>和<code v-pre>Authenticator机制</code>一样，只要有其中一种模型允许该 Request，那么就算 PASS 了。</li>
<li>如果所有的模型都 Say NO，则拒绝该 Request，返回 HTTP status code 403。</li>
</ul>
<p>这同时也说明，一个 Request 在默认情况下其<code v-pre>permissions</code>都是被拒绝的。</p>
<p>使用方法</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>--authorization-mode=RBAC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="request-attributes" tabindex="-1"><a class="header-anchor" href="#request-attributes" aria-hidden="true">#</a> Request Attributes</h3>
<p>K8s授权机制仅处理以下的请求属性:</p>
<ul>
<li>user, group, extra</li>
<li>API</li>
<li>请求方法如 get、post、update、patch和delete</li>
<li>请求路径（如/api和/healthz）</li>
<li>请求资源和子资源</li>
<li>Namespace</li>
<li>API Group</li>
</ul>
<h3 id="静态密码文件" tabindex="-1"><a class="header-anchor" href="#静态密码文件" aria-hidden="true">#</a> 静态密码文件</h3>
<p><strong>我们加入一个用户:（~/.kube/config)</strong></p>
<p><img src="http://sm.nsddd.top/sm202303051717736.png" alt="image-20230305171723601"></p>
<p><strong>登录：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k get ns <span class="token parameter variable">--user</span> cncamp
Error from server <span class="token punctuation">(</span>Forbidden<span class="token punctuation">)</span>: namespaces is forbidden: User <span class="token string">"cncamp"</span> cannot list resource <span class="token string">"namespaces"</span> <span class="token keyword">in</span> API group <span class="token string">""</span> at the cluster scope
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="serviceaccount" tabindex="-1"><a class="header-anchor" href="#serviceaccount" aria-hidden="true">#</a> ServiceAccount</h3>
<p><strong>ServiceAccount 为系统账户，是Kubernetes自带的。</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k get sa
NAME      SECRETS   AGE
default   <span class="token number">1</span>         136m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>Kubernetes在创建一个 namespace 的时候，namespace 创建完成后有一个 namespace controller.。它会在 namespace 下面自动创建 <code v-pre>default serviceaccount</code> 对象。</p>
</blockquote>
<p><strong>看一下细节：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k get sa default <span class="token parameter variable">-oyaml</span>
apiVersion: v1
kind: ServiceAccount
metadata:
  creationTimestamp: <span class="token string">"2023-03-05T07:02:48Z"</span>
  name: default
  namespace: default
  resourceVersion: <span class="token string">"394"</span>
  uid: e0d24106-9bf0-49af-9f06-ac0020307950
secrets:
- name: default-token-vkbzr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>看到这个 ServiceAccount yaml 文件中 有一个 secrets 字段，OMG，这就对应起来了，我们继续看一下细节。</strong></p>
<p><img src="http://sm.nsddd.top/sm202303051726706.png" alt="image-20230305172613547"></p>
<p><strong>有 ca.crt， 有namespace，所以 ServiceAccount 是 Kubernetes 自动生成的，并且会自动挂载到 任何容器 的 <code v-pre>/run/secrets/kubernetes.io/serviceaccount</code> 中</strong></p>
<p>查看某个容器细节：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ k get pod coredns-697ddfb55c-87qws <span class="token parameter variable">-oyaml</span> <span class="token parameter variable">-n</span> kube-system
<span class="token punctuation">..</span>.
- mountPath: /var/run/secrets/kubernetes.io/serviceaccount
<span class="token punctuation">..</span>.
 serviceAccountName: coredns
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Kubernetes 会把 coredns 所对应的 service mount 到 <code v-pre>/var/run/secrets/kubernetes.io/serviceaccount</code> 这个目录。</p>
<p><strong>意义在哪里：</strong></p>
<p>我们一旦进入到 Pod 中，你就可以在 Pod 中任何程序简单的 拿到 Token ，然后访问 API Server ，这就是用来控制 Kubernetes 组件中的权限。</p>
<blockquote>
<p>当我们开发 Kubernetes 的组件的时候，我们需要去 监听 API Server 和 修改 API Server 的数据，所以需要权限。</p>
</blockquote>
<p><strong>还有就是 用户权限 的管理，建立自己的 serviceaccount ，拿走自己的 Token，用来唯一标识自己的身份。</strong></p>
<p><strong>user account 和 service account 的区别：</strong></p>
<p>当你落地 Kubernetes 的时候，需要企业内所用用户登录到 Kubernetes 集群中，这个信息不是 在Kubernetes ，而是在外部平台，这样可以通过开发出一个 权限系统，但是是外部系统，所以 Kubernetes 需要到 外部 询问。</p>
<p>而 service account 主动的，或者被动的建立系统账户，只存在 Kubernetes 里面，而不是外面。</p>
<blockquote>
<p>如果是在 Kubernetes 中， 除了 <code v-pre>service account</code> ，其他都是 <code v-pre>user account</code></p>
</blockquote>
<h3 id="基于-webhook-的认证服务集成" tabindex="-1"><a class="header-anchor" href="#基于-webhook-的认证服务集成" aria-hidden="true">#</a> 基于 webhook 的认证服务集成</h3>
<p>webhook 的认证服务集成的范围很广，基本上 Kubernetes 的项目落地，都要考虑要不要将 Kubernetes 和公司认证平台整合。</p>
<p>Kubernetes 本身是一个框架，Kubernetes 提供了基于 webhook 的认证服务集成功能，可以与各种认证服务整合，如 OAuth、LDAP、Active Directory 等等。</p>
<h4 id="构建符合kubernetes规范的认证服务" tabindex="-1"><a class="header-anchor" href="#构建符合kubernetes规范的认证服务" aria-hidden="true">#</a> 构建符合Kubernetes规范的认证服务</h4>
<p>需要依照<code v-pre>Kubernetes</code>规范，构建认证服务，用来认证<code v-pre>tokenreview request</code>，构建认证服务，认证服务需要满足如下<code v-pre>Kubernetes</code>的规范。</p>
<p>API Server 提供内置的逻辑可能不够，我们需要外部自己写好的 http 服务，所以，这就是 webhook。</p>
<p><strong>URL</strong>： https://authn.example.com/authenticate</p>
<blockquote>
<p>必须以 <code v-pre>authenticate</code> 结尾</p>
</blockquote>
<p><strong>Method</strong>： POST</p>
<blockquote>
<p>必须是 POST 方法</p>
</blockquote>
<p><strong>Input</strong>:</p>
<blockquote>
<p>携带上token</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">{</span> <span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span> <span class="token string">"authentication.k8s.io/v1beta1"</span>, <span class="token string">"kind"</span><span class="token builtin class-name">:</span> <span class="token string">"TokenReview"</span>, 
<span class="token string">"spec"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span> <span class="token string">"token"</span><span class="token builtin class-name">:</span> <span class="token string">"(BEARERTOKEN)"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Output</strong>:</p>
<blockquote>
<p><strong>解析token并返回验证结果以及相应用户的数据</strong></p>
</blockquote>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> 
	<span class="token property">"apiVersion"</span><span class="token operator">:</span> <span class="token string">"authentication.k8s.io/v1beta1"</span><span class="token punctuation">,</span>
    <span class="token property">"kind"</span><span class="token operator">:</span> <span class="token string">"TokenReview"</span><span class="token punctuation">,</span>
    <span class="token property">"status"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"authenticated"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">"user"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"username"</span><span class="token operator">:</span> <span class="token string">"janedoe@example.com"</span><span class="token punctuation">,</span>
        <span class="token property">"uid"</span><span class="token operator">:</span> <span class="token string">"42"</span><span class="token punctuation">,</span>
        <span class="token property">"groups"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
            <span class="token string">"developers"</span><span class="token punctuation">,</span>
            <span class="token string">"qa"</span>
            <span class="token punctuation">]</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>转发认证请求至认证服务器：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// check user</span>
ts <span class="token operator">:=</span> oauth2<span class="token punctuation">.</span><span class="token function">StaticTokenSource</span><span class="token punctuation">(</span>
	<span class="token operator">&amp;</span>oauth2<span class="token punctuation">.</span>Token<span class="token punctuation">{</span>AccessToken<span class="token punctuation">:</span> tr<span class="token punctuation">.</span>Spec<span class="token punctuation">.</span>Token<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span>
<span class="token comment">// 传入请求 到 GitHub </span>
tc <span class="token operator">:=</span> oauth2<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ts<span class="token punctuation">)</span>
client <span class="token operator">:=</span> github<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span>tc<span class="token punctuation">)</span>
user<span class="token punctuation">,</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span>Users<span class="token punctuation">.</span><span class="token function">Get</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	log<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"[Error]"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	w<span class="token punctuation">.</span><span class="token function">WriteHeader</span><span class="token punctuation">(</span>http<span class="token punctuation">.</span>StatusUnauthorized<span class="token punctuation">)</span>
	json<span class="token punctuation">.</span><span class="token function">NewEncoder</span><span class="token punctuation">(</span>w<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token string">"apiVersion"</span><span class="token punctuation">:</span> <span class="token string">"authentication.k8s.io/v1beta1"</span><span class="token punctuation">,</span>
		<span class="token string">"kind"</span><span class="token punctuation">:</span>       <span class="token string">"TokenReview"</span><span class="token punctuation">,</span>
		<span class="token string">"status"</span><span class="token punctuation">:</span> authentication<span class="token punctuation">.</span>TokenReviewStatus<span class="token punctuation">{</span>
			Authenticated<span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="配置-apiserver" tabindex="-1"><a class="header-anchor" href="#配置-apiserver" aria-hidden="true">#</a> 配置 apiserver</h4>
<p><strong>apiserver 怎么知道请求哪个 webhook 来进行验证呢？</strong></p>
<blockquote>
<p><strong>问题</strong>：apiserver 是遇到无法识别的用户都会发到 webhook 吗？</p>
</blockquote>
<p>这就需要我们进行配置了</p>
<p><strong>可以是任何认证系统：</strong></p>
<ul>
<li>但在用户认证完成后，生成代表用户身份的token</li>
<li>该token通常是有失效时间的</li>
<li>用户获取该token以后以后，将token配置进 kubeconfig</li>
</ul>
<p>修改apiserver设置，开启认证服务，apiserver保证将所有收到的请求中的token信息，发给认证服务进行验证</p>
<ul>
<li><code v-pre>--authentication-token-webhook-config-file</code>，该文件描述如何访问认证服务</li>
<li><code v-pre>--authentication-token-webhook-cache-ttl</code>，默认2分钟</li>
</ul>
<p>配置文件需要<code v-pre>mount</code>进<code v-pre>Pod</code></p>
<p>配置文件中的服务器地址需要指向<code v-pre>authService</code></p>
<p><strong>配置文件格式如下：</strong></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"kind"</span><span class="token operator">:</span> <span class="token string">"Config"</span><span class="token punctuation">,</span>
  <span class="token property">"apiVersion"</span><span class="token operator">:</span> <span class="token string">"v1"</span><span class="token punctuation">,</span>
  <span class="token property">"preferences"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"clusters"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"github-authn"</span><span class="token punctuation">,</span>
      <span class="token property">"cluster"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"server"</span><span class="token operator">:</span> <span class="token string">"http://192.168.34.2:3000/authenticate"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"users"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"authn-apiserver"</span><span class="token punctuation">,</span>
      <span class="token property">"user"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"token"</span><span class="token operator">:</span> <span class="token string">"secret"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"contexts"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"webhook"</span><span class="token punctuation">,</span>
      <span class="token property">"context"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"cluster"</span><span class="token operator">:</span> <span class="token string">"github-authn"</span><span class="token punctuation">,</span>
        <span class="token property">"user"</span><span class="token operator">:</span> <span class="token string">"authn-apiserver"</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token property">"current-context"</span><span class="token operator">:</span> <span class="token string">"webhook"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="生产系统中遇到的陷阱" tabindex="-1"><a class="header-anchor" href="#生产系统中遇到的陷阱" aria-hidden="true">#</a> 生产系统中遇到的陷阱</h3>
<p><strong>基于 Keystone 的认证插件导致 Keystone 故障且无法恢复</strong></p>
<ol>
<li>Keystone 是企业关键服务</li>
<li>Kubernetes 以 Keystone 作为认证插件</li>
<li>Keystone 在出现故障后会抛出 401 错误</li>
<li>Kubernetes 发现 401 错误后会尝试重新认证</li>
</ol>
<p>大多数 controller都有指数级back off，重试间隔越来越慢，但 gophercloud 针对过期 token 会一直 retry</p>
<p>大量的 request 积压在 Keystone 导致服务无法恢复</p>
<blockquote>
<p>随着时间推移，apiserver 中越来越多的 token 过期，需要访问 Keystone 进行认证，因此 Keystone 压力越来越大，然后大量压力下 Keystone 根本无法正常启动，刚起来又被大量请求打死，从而形成恶性循环。</p>
</blockquote>
<p>Kubernetes 成为压死企业认证服务的最后一根稻草</p>
<p><strong>解决方案</strong>？</p>
<ul>
<li>Circuit break</li>
<li>Rate limit</li>
</ul>
<h2 id="鉴权" tabindex="-1"><a class="header-anchor" href="#鉴权" aria-hidden="true">#</a> 鉴权</h2>
<h3 id="授权" tabindex="-1"><a class="header-anchor" href="#授权" aria-hidden="true">#</a> 授权</h3>
<p>授权主要是用于对集群资源的访问控制，通过检查请求包含的相关属性值，与相对应的访问策略相比较，API请求必须满足某些策略才能被处理。跟认证类似，Kubernetes也支持多种授权机制，并支持同时开启多个授权插件（只要有一个验证通过即可）。如果授权成功，则用户的请求会发送到准入控制模块做进一步的请求验证；对于授权失败的请求则返回HTTP 403。</p>
<p><strong>Kubernetes授权仅处理以下的请求属性：</strong></p>
<ul>
<li>user, group, extra</li>
<li>API、请求方法（如get、post、update、patch和delete）和请求路径（如/api）</li>
<li>请求资源和子资源</li>
<li>Namespace</li>
<li>API Group</li>
</ul>
<p><strong>目前，Kubernetes支持以下授权插件：</strong></p>
<ul>
<li><strong>ABAC（更精确的授权系统，Kubernetes 支持 ABAC，但是 RBAC 能满足大部分需求，因为 Kubernetes 授权对象就是 Kubernetes 自己本身的对象。</strong></li>
<li>RBAC
<ul>
<li><strong>由于控制对象的 k8s 中的对象，因此 RBAC 基本可以满足绝大部分需求</strong></li>
</ul>
</li>
<li>Webhook：比如上面演示的 GitHub 授权（token 密钥 ）</li>
<li>Node
<ul>
<li>节点上的 kubelet 只能操作当前节点上的对象，不能操作那些和当前节点没有关系的对象</li>
</ul>
</li>
</ul>
<h4 id="rbac-vs-abac" tabindex="-1"><a class="header-anchor" href="#rbac-vs-abac" aria-hidden="true">#</a> RBAC vs ABAC</h4>
<p>ABAC（Attribute Based Access Control）本来是不错的概念，但是在 Kubernetes 中的实现比较难于管理和理解，而且需要对 Master 所在节点的 SSH 和文件系统权限，要使得对授权的变更成功生效，还需要重新启动 API Server。</p>
<blockquote>
<p>ABAC 类似我认证中的 static-token，将数据配置到静态文件中，然后通过 apiserver 的参数指定该文件，如果有更新还需要重启 apiserver 比较麻烦。</p>
</blockquote>
<p>而 RBAC 的授权策略可以利用 kubectl 或者 Kubernetes API 直接进行配置。RBAC 可以授权给用户，让用户有权进行授权管理，这样就可以无需接触节点，直接进行授权管理。RBAC 在 Kubernetes 中被映射为 API 资源和操作。</p>
<h4 id="kubernetes中授权系统" tabindex="-1"><a class="header-anchor" href="#kubernetes中授权系统" aria-hidden="true">#</a> Kubernetes中授权系统</h4>
<p>授权系统大致的设计思路一样的</p>
<ul>
<li>
<p>Role：角色，包括资源和verbs（动作）</p>
</li>
<li>
<p>Subject是一个虚词，主体：包括 User（外部用户） 和 ServiceAccount（系统用户)</p>
</li>
<li>
<p>Role 和 Subject 是通过 RoleBindings产生关系的，最后 RBAC 需要定义的就是谁（who) 能对 哪些对象（what）做哪些操作（how)</p>
</li>
<li>
<p>ClusterRole 表示这个角色是定义在全局范围中的，而 Role 表示这个角色和 namespace 产生关系的。</p>
</li>
<li>
<p>ClusterRoleBindings 和 RoleBindings 也是一样，也就是说如果是通过 ClusterRoleBindings 绑定某个用户，那么这个用户默认就在 所有的 Namespace 上拥有 权限。RoleBindings 会限制在 namespace</p>
</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202303051947235.png" alt="img"></p>
<blockquote>
<p><strong>最后实现的效果是： 谁（who) 能对 哪些对象（what）做哪些操作（how)</strong></p>
</blockquote>
<h4 id="role与clusterrole" tabindex="-1"><a class="header-anchor" href="#role与clusterrole" aria-hidden="true">#</a> Role与ClusterRole</h4>
<p>Role（角色）是一系列权限的集合，例如一个角色可以包含读取 Pod 的权限和列出 Pod 的权限。</p>
<p>Role只能用来给某个特定namespace中的资源作鉴权，对多namespace和集群级的资源或者是非</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># Role示例</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>reader
<span class="token key atrule">rules</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">apiGroups</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">""</span><span class="token punctuation">]</span> <span class="token comment"># "" indicates the core API group</span>
  <span class="token key atrule">resources</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"pods"</span><span class="token punctuation">]</span>
  <span class="token key atrule">verbs</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"get"</span><span class="token punctuation">,</span> <span class="token string">"watch"</span><span class="token punctuation">,</span> <span class="token string">"list"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>📜 对上面的解释：</p>
<p>如果你的 Groups 是空的，表示 是 core API group 对象，这个权限限定在 default namespace。</p>
<p>绑定了后只有 default namespace 读写权限</p>
</blockquote>
<h4 id="rolebinding" tabindex="-1"><a class="header-anchor" href="#rolebinding" aria-hidden="true">#</a> RoleBinding</h4>
<p>建立好了 Role 后你就可以绑定（binding) 了</p>
<p>RoleBinding 把角色（Role或ClusterRole）的权限映射到用户或者用户组，从而让这些用户继承角色在 namespace 中的权限。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># RoleBinding示例（引用Role）</span>
<span class="token comment"># This role binding allows "jane" to read pods in the "default" namespace.</span>
<span class="token key atrule">kind</span><span class="token punctuation">:</span> RoleBinding
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>pods
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> default
<span class="token key atrule">subjects</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> User
  <span class="token key atrule">name</span><span class="token punctuation">:</span> jane
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
  <span class="token key atrule">kind</span><span class="token punctuation">:</span> Role
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pod<span class="token punctuation">-</span>reader
  <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>📜 对上面的解释：</p>
<p>这个也是知识在 default namespace 下的权限，</p>
<p>如果是 ClusterRoleBindings，那么就不需要 <code v-pre>namespace: default</code></p>
</blockquote>
<p><strong>授权是可以传递的~</strong></p>
<p>资源类的API（如/healthz）使用ClusterRole。</p>
<p>Role 是有 namespace，只能在该 namespace 下进行 bind。</p>
<p>ClusterRole则没有namespace，在任意namespace下都可以bind。</p>
<h4 id="rolebinding-和-clusterrolebinding" tabindex="-1"><a class="header-anchor" href="#rolebinding-和-clusterrolebinding" aria-hidden="true">#</a> roleBinding 和 clusterRoleBinding</h4>
<p>roleBinding 可以引用 Role与ClusterRole，但是最终权限会被限制在 namespace 下。</p>
<p><strong>clusterRoleBinding 则只能引用ClusterRole，但最终权限则是整个集群中。</strong></p>
<h4 id="账户-组的管理" tabindex="-1"><a class="header-anchor" href="#账户-组的管理" aria-hidden="true">#</a> 账户 &amp; 组的管理</h4>
<blockquote>
<p>对应的是 <strong>多租户</strong> 的应用~</p>
</blockquote>
<p>角色绑定（Role Binding）是将角色中定义的权限赋予一个或者一组用户。</p>
<p>它包含若干 <strong>主体</strong>（用户、组或服务账户）的列表和对这些主体所获得的角色的引用。</p>
<p>组的概念：</p>
<ul>
<li>当与外部认证系统对接时，用户信息（UserInfo）可包含Group信息，授权可针对用户群组</li>
<li><strong>当对ServiceAccount授权时，Group代表某个Namespace下的所有ServiceAccount</strong></li>
</ul>
<h4 id="针对群组授权" tabindex="-1"><a class="header-anchor" href="#针对群组授权" aria-hidden="true">#</a> 针对群组授权</h4>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> rbac.authorization.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRoleBinding
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>secrets<span class="token punctuation">-</span>global
<span class="token key atrule">subjects</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> <span class="token key atrule">kind</span><span class="token punctuation">:</span> Group
    <span class="token key atrule">name</span><span class="token punctuation">:</span> manager <span class="token comment"># 'name' 是区分大小写的</span>
    <span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
<span class="token key atrule">roleRef</span><span class="token punctuation">:</span>
	<span class="token key atrule">kind</span><span class="token punctuation">:</span> ClusterRole
	<span class="token key atrule">name</span><span class="token punctuation">:</span> secret<span class="token punctuation">-</span>reader
	<span class="token key atrule">apiGroup</span><span class="token punctuation">:</span> rbac.authorization.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="规划系统角色" tabindex="-1"><a class="header-anchor" href="#规划系统角色" aria-hidden="true">#</a> 规划系统角色</h4>
<p>User</p>
<ul>
<li>管理员
<ul>
<li>所有资源的所有权限？？</li>
</ul>
</li>
<li>普通用户
<ul>
<li>是否有该用户创建的namespace下的所有object的操作权限？</li>
<li>对其他用户的namespace资源是否可读，是否可写？</li>
</ul>
</li>
</ul>
<p>SystemAccount</p>
<ul>
<li>SystemAccount是开发者（kubernetes developer或者domain developer）创建应用后，应用于apiserver通讯需要的身份</li>
<li>用户可以创建自定的ServiceAccount，kubernetes也为每个namespace创建default ServiceAccount</li>
<li>Default ServiceAccount通常需要给定权限以后才能对apiserver做写操作</li>
</ul>
<h4 id="实现方案" tabindex="-1"><a class="header-anchor" href="#实现方案" aria-hidden="true">#</a> 实现方案</h4>
<p>在cluster创建时，创建自定义的role，比如namespace-creator</p>
<p>Namespace-creator role定义用户可操作的对象和对应的读写操作。</p>
<p>创建自定义的namespace admission webhook</p>
<ul>
<li>当namespace创建请求被处理时，获取当前用户信息并annotate到namespace</li>
</ul>
<p>创建RBAC controller</p>
<ul>
<li>Watch namespace的创建事件</li>
<li>获取当前namespace的创建者信息</li>
<li>在当前namespace创建rolebinding对象，并将namespace-creator 角色和用户绑定</li>
</ul>
<h4 id="与权限相关的其他最佳实践" tabindex="-1"><a class="header-anchor" href="#与权限相关的其他最佳实践" aria-hidden="true">#</a> 与权限相关的其他最佳实践</h4>
<p>ClusterRole是非namespace绑定的，针对整个集群生效</p>
<p>通常需要创建一个管理员角色，并且绑定给开发运营团队成员</p>
<p>CustomResourceDefinition 是全局资源，普通用户创建 CustomResourceDefinition 以后，需要管理员授予相应权限后才能真正操作该对象</p>
<p>针对所有的角色管理，建议创建spec，用源代码驱动</p>
<ul>
<li>虽然可以通过edit操作来修改权限，但后期会导致权限管理混乱，可能会有很多临时创建出来的角色和角色绑定对象，重复绑定某一个资源权限</li>
</ul>
<p>权限是可以传递的，用户A可以将其对某对象的某操作，抽取成一个权限，并赋给用户B</p>
<p>防止海量的角色和角色绑定对象，因为大量的对象会导致鉴权效率低，同时给apiserver增加负担</p>
<p>ServiceAccount也需要授权的，否则你的component可能无法操作某对象</p>
<p>Tips：SSH到master节点通过insecure port访问apiserver可绕过鉴权，当需要做管理操作又没</p>
<p>有权限时可以使用（不推荐）</p>
<h4 id="运营过程中出现的陷阱" tabindex="-1"><a class="header-anchor" href="#运营过程中出现的陷阱" aria-hidden="true">#</a> 运营过程中出现的陷阱</h4>
<p>案例1:</p>
<ul>
<li>研发人员为提高系统效率，将update方法修改为patch</li>
<li>研发人员本地非安全测试环境测试通过</li>
<li>上生产，发现不work</li>
<li>原因：忘记更新rolebinding，对应的serviceaccount没有patch权限</li>
</ul>
<p>案例2:</p>
<ul>
<li>研发人员创建CRD，并针对该CRD编程</li>
<li>上生产后不工作</li>
<li>原因，该CRD未授权，对应的组件get不到对应的CRD资源</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '48.md' style='float:left'>⬆️上一节🔗  </a><a href = '50.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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
