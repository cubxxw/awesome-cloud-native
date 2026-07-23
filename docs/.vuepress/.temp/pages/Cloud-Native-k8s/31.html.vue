<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第31节-kubernetes-的编译和调试" tabindex="-1"><a class="header-anchor" href="#第31节-kubernetes-的编译和调试" aria-hidden="true">#</a> 第31节 kubernetes 的编译和调试</h1>
<div><a href = '30.md' style='float:left'>⬆️上一节🔗  </a><a href = '32.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="编译启动本地单节点集群" tabindex="-1"><a class="header-anchor" href="#编译启动本地单节点集群" aria-hidden="true">#</a> 编译启动本地单节点集群：</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> <span class="token variable">$GOPATH</span>/src/k8s.io/kubernetes
<span class="token comment"># 编译单个组建：sudo make WHAT="cmd/kube-apiserver"  </span>
<span class="token comment"># 编译所有组件：sudo make all  </span>
<span class="token comment"># 启动本地单节点集群： sudo ./hack/local-up-cluster.sh  </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">local-up-cluster 脚本</p>
<p><code v-pre>./hack/local-up-cluster.sh  </code> 脚本是 kubernetes 社区构建的方便开发者的脚本。</p>
<p>它的作用是编译出所有需要编译的应用程序，并且在当前的机器上跑一个单节点的集群。</p>
<ul>
<li>
<p>编译单个组建：<code v-pre>sudo make WHAT=&quot;cmd/kube-apiserver&quot;</code></p>
</li>
<li>
<p>编译所有组件：<code v-pre>sudo make all</code></p>
</li>
<li>
<p>启动本地单节点集群： <code v-pre>sudo ./hack/local-up-cluster.sh</code></p>
</li>
</ul>
</div>
<h2 id="第一次启动单节点集群分析" tabindex="-1"><a class="header-anchor" href="#第一次启动单节点集群分析" aria-hidden="true">#</a> 第一次启动单节点集群分析</h2>
<p>记录第一次启动但集群的状态分析：</p>
<p>time：大概等了 20 - 30 分钟（可以先喝两杯咖啡☕）</p>
<h3 id="安装细节" tabindex="-1"><a class="header-anchor" href="#安装细节" aria-hidden="true">#</a> 安装细节</h3>
<p><strong>开始时间：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes# date
Thu 01 Dec 2022 06:45:33 AM UTC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>details 展开🔽</summary>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># sudo ./hack/local-up-cluster.sh</span>
make: Entering directory <span class="token string">'/root/go/src/k8s.io/kubernetes'</span>
make<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Entering directory <span class="token string">'/root/go/src/k8s.io/kubernetes'</span>
+++ <span class="token punctuation">[</span><span class="token number">1201</span> 06:45:46<span class="token punctuation">]</span> Building go targets <span class="token keyword">for</span> linux/amd64
    k8s.io/kubernetes/hack/make-rules/helpers/go2make <span class="token punctuation">(</span>non-static<span class="token punctuation">)</span>
+++ <span class="token punctuation">[</span><span class="token number">1201</span> 06:45:50<span class="token punctuation">]</span> Generating openapi code <span class="token keyword">for</span> KUBE
+++ <span class="token punctuation">[</span><span class="token number">1201</span> 06:46:29<span class="token punctuation">]</span> Generating openapi code <span class="token keyword">for</span> AGGREGATOR
+++ <span class="token punctuation">[</span><span class="token number">1201</span> 06:46:31<span class="token punctuation">]</span> Generating openapi code <span class="token keyword">for</span> APIEXTENSIONS
+++ <span class="token punctuation">[</span><span class="token number">1201</span> 06:46:34<span class="token punctuation">]</span> Generating openapi code <span class="token keyword">for</span> CODEGEN
+++ <span class="token punctuation">[</span><span class="token number">1201</span> 06:46:36<span class="token punctuation">]</span> Generating openapi code <span class="token keyword">for</span> SAMPLEAPISERVER
make<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span>: Leaving directory <span class="token string">'/root/go/src/k8s.io/kubernetes'</span>
+++ <span class="token punctuation">[</span><span class="token number">1201</span> 06:46:39<span class="token punctuation">]</span> Building go targets <span class="token keyword">for</span> linux/amd64
    k8s.io/kubernetes/cmd/kubectl <span class="token punctuation">(</span>static<span class="token punctuation">)</span>
    k8s.io/kubernetes/cmd/kube-apiserver <span class="token punctuation">(</span>static<span class="token punctuation">)</span>
    k8s.io/kubernetes/cmd/kube-controller-manager <span class="token punctuation">(</span>static<span class="token punctuation">)</span>
    k8s.io/kubernetes/cmd/cloud-controller-manager <span class="token punctuation">(</span>non-static<span class="token punctuation">)</span>
    k8s.io/kubernetes/cmd/kubelet <span class="token punctuation">(</span>non-static<span class="token punctuation">)</span>
    k8s.io/kubernetes/cmd/kube-proxy <span class="token punctuation">(</span>static<span class="token punctuation">)</span>
    k8s.io/kubernetes/cmd/kube-scheduler <span class="token punctuation">(</span>static<span class="token punctuation">)</span>

make: Leaving directory <span class="token string">'/root/go/src/k8s.io/kubernetes'</span>
API SERVER secure port is free, proceeding<span class="token punctuation">..</span>.
Detected <span class="token function">host</span> and ready to start services.  Doing some housekeeping first<span class="token punctuation">..</span>.
Using GO_OUT /root/go/src/k8s.io/kubernetes/_output/local/bin/linux/amd64
Starting services now<span class="token operator">!</span>
Starting etcd
etcd --advertise-client-urls http://127.0.0.1:2379 --data-dir /tmp/tmp.ZA6EXyPPss --listen-client-urls http://127.0.0.1:2379 --log-level<span class="token operator">=</span>warn <span class="token operator"><span class="token file-descriptor important">2</span>></span> <span class="token string">"/tmp/etcd.log"</span> <span class="token operator">></span>/dev/null
Waiting <span class="token keyword">for</span> etcd to come up.
+++ <span class="token punctuation">[</span><span class="token number">1201</span> 06:58:54<span class="token punctuation">]</span> On try <span class="token number">2</span>, etcd: <span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token string">"health"</span><span class="token builtin class-name">:</span><span class="token string">"true"</span>,<span class="token string">"reason"</span><span class="token builtin class-name">:</span><span class="token string">""</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token string">"header"</span>:<span class="token punctuation">{</span><span class="token string">"cluster_id"</span><span class="token builtin class-name">:</span><span class="token string">"14841639068965178418"</span>,<span class="token string">"member_id"</span><span class="token builtin class-name">:</span><span class="token string">"10276657743932975437"</span>,<span class="token string">"revision"</span><span class="token builtin class-name">:</span><span class="token string">"2"</span>,<span class="token string">"raft_term"</span><span class="token builtin class-name">:</span><span class="token string">"2"</span><span class="token punctuation">}</span><span class="token punctuation">}</span>Generating a RSA private key
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.+++++
<span class="token punctuation">..</span><span class="token punctuation">..</span>.+++++
writing new private key to <span class="token string">'/var/run/kubernetes/server-ca.key'</span>
-----
Generating a RSA private key
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>+++++
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.+++++
writing new private key to <span class="token string">'/var/run/kubernetes/client-ca.key'</span>
-----
Generating a RSA private key
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>.+++++
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>+++++
writing new private key to <span class="token string">'/var/run/kubernetes/request-header-ca.key'</span>
-----
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generate received request
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> received CSR
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generating key: rsa-2048
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> encoded CSR
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> signed certificate with serial number <span class="token number">189366430448716360665414597641985438063348873322</span>
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generate received request
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> received CSR
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generating key: rsa-2048
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> encoded CSR
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> signed certificate with serial number <span class="token number">190125437621142035036292880957413679793726301630</span>
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generate received request
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> received CSR
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generating key: rsa-2048
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> encoded CSR
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> signed certificate with serial number <span class="token number">606668605759100598551725540945577297218224811054</span>
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generate received request
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> received CSR
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generating key: rsa-2048
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> encoded CSR
<span class="token number">2022</span>/12/01 06:58:54 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> signed certificate with serial number <span class="token number">635150309675323248743719255558829775631435343029</span>
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generate received request
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> received CSR
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generating key: rsa-2048
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> encoded CSR
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> signed certificate with serial number <span class="token number">502583423540832867136826540974772275871393658467</span>
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generate received request
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> received CSR
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generating key: rsa-2048
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> encoded CSR
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> signed certificate with serial number <span class="token number">712098371673773073639809258966059598612266254784</span>
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generate received request
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> received CSR
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generating key: rsa-2048
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> encoded CSR
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> signed certificate with serial number <span class="token number">254427577071095149538770795047596258056763227355</span>
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generate received request
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> received CSR
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generating key: rsa-2048
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> encoded CSR
<span class="token number">2022</span>/12/01 06:58:55 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> signed certificate with serial number <span class="token number">583900352045971716923710917507647330423197506650</span>
Waiting <span class="token keyword">for</span> apiserver to come up
+++ <span class="token punctuation">[</span><span class="token number">1201</span> 06:59:03<span class="token punctuation">]</span> On try <span class="token number">6</span>, apiserver: <span class="token builtin class-name">:</span> ok
clusterrolebinding.rbac.authorization.k8s.io/kube-apiserver-kubelet-admin created
clusterrolebinding.rbac.authorization.k8s.io/kubelet-csr created
Cluster <span class="token string">"local-up-cluster"</span> set.
use <span class="token string">'kubectl --kubeconfig=/var/run/kubernetes/admin-kube-aggregator.kubeconfig'</span> to use the aggregated API server
serviceaccount/coredns created
clusterrole.rbac.authorization.k8s.io/system:coredns created
clusterrolebinding.rbac.authorization.k8s.io/system:coredns created
configmap/coredns created
deployment.apps/coredns created
service/kube-dns created
coredns addon successfully deployed.
Checking CNI Installation at /opt/cni/bin
WARNING <span class="token builtin class-name">:</span> The kubelet is configured to not fail even <span class="token keyword">if</span> swap is enabled<span class="token punctuation">;</span> production deployments should disable swap unless testing NodeSwap feature.
<span class="token number">2022</span>/12/01 06:59:07 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generate received request
<span class="token number">2022</span>/12/01 06:59:07 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> received CSR
<span class="token number">2022</span>/12/01 06:59:07 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generating key: rsa-2048
<span class="token number">2022</span>/12/01 06:59:07 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> encoded CSR
<span class="token number">2022</span>/12/01 06:59:07 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> signed certificate with serial number <span class="token number">396503892652732852810951929324414744717912185576</span>
kubelet <span class="token punctuation">(</span> <span class="token number">27489</span> <span class="token punctuation">)</span> is running.
<span class="token function">wait</span> kubelet ready
No resources found
No resources found
No resources found
No resources found
No resources found
No resources found
<span class="token number">127.0</span>.0.1   NotReady   <span class="token operator">&lt;</span>none<span class="token operator">></span>   1s    v1.24.0-dirty
<span class="token number">2022</span>/12/01 06:59:22 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generate received request
<span class="token number">2022</span>/12/01 06:59:22 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> received CSR
<span class="token number">2022</span>/12/01 06:59:22 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> generating key: rsa-2048
<span class="token number">2022</span>/12/01 06:59:22 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> encoded CSR
<span class="token number">2022</span>/12/01 06:59:22 <span class="token punctuation">[</span>INFO<span class="token punctuation">]</span> signed certificate with serial number <span class="token number">270579443091576203614576860806582064911709216666</span>
Create default storage class <span class="token keyword">for</span> 
storageclass.storage.k8s.io/standard created
Local Kubernetes cluster is running. Press Ctrl-C to shut it down.

Logs:
  /tmp/kube-apiserver.log
  /tmp/kube-controller-manager.log
  
  /tmp/kube-proxy.log
  /tmp/kube-scheduler.log
  /tmp/kubelet.log

To start using your cluster, you can <span class="token function">open</span> up another terminal/tab and run:

  <span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/var/run/kubernetes/admin.kubeconfig
  cluster/kubectl.sh

Alternatively, you can <span class="token function">write</span> to the default kubeconfig:

  <span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBERNETES_PROVIDER</span><span class="token operator">=</span>local

  cluster/kubectl.sh config set-cluster <span class="token builtin class-name">local</span> <span class="token parameter variable">--server</span><span class="token operator">=</span>https://localhost:6443 --certificate-authority<span class="token operator">=</span>/var/run/kubernetes/server-ca.crt
  cluster/kubectl.sh config set-credentials myself --client-key<span class="token operator">=</span>/var/run/kubernetes/client-admin.key --client-certificate<span class="token operator">=</span>/var/run/kubernetes/client-admin.crt
  cluster/kubectl.sh config set-context <span class="token builtin class-name">local</span> <span class="token parameter variable">--cluster</span><span class="token operator">=</span>local <span class="token parameter variable">--user</span><span class="token operator">=</span>myself
  cluster/kubectl.sh config use-context <span class="token builtin class-name">local</span>
  cluster/kubectl.sh

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p><strong>结束时间：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes# date
Thu 01 Dec 2022 07:04:00 AM UTC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="停止" tabindex="-1"><a class="header-anchor" href="#停止" aria-hidden="true">#</a> 停止</h3>
<p><strong>stop：<code v-pre>ctrl + c</code></strong></p>
<h3 id="日志" tabindex="-1"><a class="header-anchor" href="#日志" aria-hidden="true">#</a> 日志</h3>
<p><strong>Logs：</strong></p>
<ul>
<li><code v-pre>/tmp/kube-apiserver.log</code></li>
<li><code v-pre>/tmp/kube-controller-manager.log</code></li>
<li><code v-pre>/tmp/kube-proxy.log</code></li>
<li><code v-pre>/tmp/kube-scheduler.log</code></li>
<li><code v-pre>/tmp/kubelet.log</code></li>
</ul>
<h3 id="test-编写-pod-yaml" tabindex="-1"><a class="header-anchor" href="#test-编写-pod-yaml" aria-hidden="true">#</a> test：编写 pod.yaml</h3>
<p><strong>创建文件并编写内容：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mkdir ~/go-yaml; cd ~/go-yaml
vim pod.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>输入以下：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span> 
  <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
  <span class="token key atrule">namespaces</span><span class="token punctuation">:</span> default
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">image</span><span class="token punctuation">:</span> busybox
    <span class="token key atrule">command</span><span class="token punctuation">:</span> 
  	  <span class="token punctuation">-</span> sleep
  	  <span class="token punctuation">-</span> <span class="token string">"3600"</span>
  	<span class="token key atrule">imagePullPolicy</span><span class="token punctuation">:</span> IfNotPresent
  <span class="token key atrule">restartPolicy</span><span class="token punctuation">:</span> Always
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建它：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cluster/kubectl.sh create -f ~/go-yaml/pod.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>获取：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cluster/kubectl.sh get pod
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>细节：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cluster/kubectl.sh describe pod busybox
cluster/kubectl.sh describe node
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="再次运行脚本" tabindex="-1"><a class="header-anchor" href="#再次运行脚本" aria-hidden="true">#</a> 再次运行脚本</h3>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>我们一般再次运行的时候，编译成 <code v-pre>exe</code> 的动作也是被缓存了，不会再生成，所以修改后 debug 删除：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">make</span> clean
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<h2 id="开启本地debug功能" tabindex="-1"><a class="header-anchor" href="#开启本地debug功能" aria-hidden="true">#</a> 开启本地debug功能</h2>
<div class="custom-container tip"><p class="custom-container-title">需要开启 debug</p>
<p>一般编译单个组建，或者是编译所有的组件，都需要开启 debug 调试。</p>
<p>我们为了方便，在任何时候都把 debug 能力 build 过去。</p>
</div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> <span class="token variable">$GOPATH</span>/src/k8s.io/kubernetes
<span class="token comment"># kubernetes go编译文件</span>
<span class="token function">sudo</span> <span class="token function">vim</span> ./hack/lib/golang.sh
<span class="token comment"># 查找build_binaries()函数 vi语法</span>
?build_binaries<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="找到一下bebug判断-注释-一直开启debug能力" tabindex="-1"><a class="header-anchor" href="#找到一下bebug判断-注释-一直开启debug能力" aria-hidden="true">#</a> 找到一下bebug判断，注释，一直开启debug能力</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>	<span class="token assign-left variable">gogcflags</span><span class="token operator">=</span><span class="token string">"all=-trimpath=<span class="token variable">${trimroot}</span> <span class="token variable">${GOGCFLAGS<span class="token operator">:-</span>}</span>"</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${DBG<span class="token operator">:-</span>}</span>"</span> <span class="token operator">==</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token comment"># Debugging - disable optimizations and inlining.</span>
        <span class="token assign-left variable">gogcflags</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${gogcflags}</span> -N -l"</span>
    <span class="token keyword">fi</span>

    <span class="token assign-left variable">goldflags</span><span class="token operator">=</span><span class="token string">"all=<span class="token variable"><span class="token variable">$(</span>kube::version::ldflags<span class="token variable">)</span></span> <span class="token variable">${GOLDFLAGS<span class="token operator">:-</span>}</span>"</span>
    <span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${DBG<span class="token operator">:-</span>}</span>"</span> <span class="token operator">!=</span> <span class="token number">1</span> <span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
        <span class="token comment"># Not debugging - disable symbols and DWARF.</span>
        <span class="token assign-left variable">goldflags</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${goldflags}</span> -s -w"</span>
    <span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注释判断，将debug直接放在下面， 再保存即可：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>	<span class="token assign-left variable">gogcflags</span><span class="token operator">=</span><span class="token string">"all=-trimpath=<span class="token variable">${trimroot}</span> <span class="token variable">${GOGCFLAGS<span class="token operator">:-</span>}</span>"</span>
    <span class="token comment"># if [[ "${DBG:-}" == 1 ]]; then</span>
    <span class="token comment">#     # Debugging - disable optimizations and inlining.</span>
    <span class="token comment">#     gogcflags="${gogcflags} -N -l"</span>
    <span class="token comment"># fi</span>
	<span class="token assign-left variable">gogcflags</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${gogcflags}</span> -N -l"</span>
    <span class="token assign-left variable">goldflags</span><span class="token operator">=</span><span class="token string">"all=<span class="token variable"><span class="token variable">$(</span>kube::version::ldflags<span class="token variable">)</span></span> <span class="token variable">${GOLDFLAGS<span class="token operator">:-</span>}</span>"</span>
    <span class="token comment"># if [[ "${DBG:-}" != 1 ]]; then</span>
    <span class="token comment">#     # Not debugging - disable symbols and DWARF.</span>
    <span class="token comment">#     goldflags="${goldflags} -s -w"</span>
    <span class="token comment"># fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>观察此时的进程：</strong></p>
<p><img src="http://sm.cubxxw.com/smimage-20221201140939729.png" alt="image-20221201140939729"></p>
<h2 id="delve-调试" tabindex="-1"><a class="header-anchor" href="#delve-调试" aria-hidden="true">#</a> delve 调试</h2>
<p><strong>或许你可以选择 GDB，或许也有一个更适合的方式：go-delve:</strong></p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ul>
<li><a href="https://docker.cubxxw.com/Cloud-Native/14.html" target="_blank" rel="noopener noreferrer">delve<ExternalLinkIcon/></a></li>
</ul>
</div>
<h3 id="特性" tabindex="-1"><a class="header-anchor" href="#特性" aria-hidden="true">#</a> 特性</h3>
<ul>
<li>本地调试 和 远程调试</li>
<li>简单易用，开源</li>
</ul>
<h2 id="启动本地集群从而-debug-以-api-server-为例" tabindex="-1"><a class="header-anchor" href="#启动本地集群从而-debug-以-api-server-为例" aria-hidden="true">#</a> 启动本地集群从而 Debug - 以 API Server 为例</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>正好之前的 API server 证书出现了问题，这个问题的地址 ISSUE：</p>
<ul>
<li><a href="https://github.com/kubernetes/kubernetes/issues/114222" target="_blank" rel="noopener noreferrer">【An error occurred attempting to install kubernetes learning】 #114222<ExternalLinkIcon/></a></li>
</ul>
</div>
<h3 id="编译参数" tabindex="-1"><a class="header-anchor" href="#编译参数" aria-hidden="true">#</a> 编译参数</h3>
<ul>
<li>
<p>修改 <code v-pre>hack/lib/golang.sh</code> 文件，从而使得编译器不去优化掉支持的 debug 信息</p>
</li>
<li>
<p>禁止 <code v-pre>-w</code> 、<code v-pre>-s</code> 保留文件名，行号</p>
</li>
<li>
<p>加上 <code v-pre>-gcflags= &quot;all=-N -l&quot;</code> ，禁止优化和内联。</p>
</li>
</ul>
<p>在<code v-pre>k8s.io/kubernetes/hack/lib/golang.sh</code>中设置了<code v-pre>-s -w</code>选项来禁用符号表以及debug信息，因此在编译 <code v-pre>Kubernetes</code> 组件进行远程调试时需要去掉这两个限制，如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>-    <span class="token assign-left variable">goldflags</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${GOLDFLAGS=-s -w}</span> <span class="token variable"><span class="token variable">$(</span>kube::version::ldflags<span class="token variable">)</span></span>"</span>
+    <span class="token comment">#goldflags="${GOLDFLAGS=-s -w} $(kube::version::ldflags)"</span>
+    <span class="token assign-left variable">goldflags</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${GOLDFLAGS<span class="token operator">:-</span>}</span> <span class="token variable"><span class="token variable">$(</span>kube::version::ldflags<span class="token variable">)</span></span>"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动本地集群" tabindex="-1"><a class="header-anchor" href="#启动本地集群" aria-hidden="true">#</a> 启动本地集群</h3>
<p>如果需要，用 <code v-pre>make clean</code> 清除未编译的可执行程序。通过 <code v-pre>hack/local-up-cluster.sh</code> 脚本启动本地集群。</p>
<h3 id="重启-api-server" tabindex="-1"><a class="header-anchor" href="#重启-api-server" aria-hidden="true">#</a> 重启 API Server</h3>
<p><strong>如果要调试 API Server ，先关闭其进程，再以 dlv 启动。</strong></p>
<p>⚠️ 为什么要重启，因为 go 的 debug 依靠 dlv，所以需要用 dlv 包袱再启动下。</p>
<h3 id="连接-debug-server" tabindex="-1"><a class="header-anchor" href="#连接-debug-server" aria-hidden="true">#</a> 连接 Debug Server</h3>
<p>通过 delve 连接 debug server 并且开始调试。</p>
<h3 id="杀死-api-server-调试" tabindex="-1"><a class="header-anchor" href="#杀死-api-server-调试" aria-hidden="true">#</a> 杀死 Api Server 调试</h3>
<p><strong>查看 Api Server 的应用程序和后面的参数，这个很重要：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment">#  ps -ef | grep kube-apiserver</span>
root       <span class="token number">27052</span>    <span class="token number">8091</span> <span class="token number">10</span> 06:58 pts/0    00:00:43 /root/go/src/k8s.io/kubernetes/_output/local/bin/linux/amd64/kube-apiserver --authorization-mode<span class="token operator">=</span>Node,RBAC  --cloud-provider<span class="token operator">=</span> --cloud-config<span class="token operator">=</span>   <span class="token parameter variable">--v</span><span class="token operator">=</span><span class="token number">3</span> <span class="token parameter variable">--vmodule</span><span class="token operator">=</span> --audit-policy-file<span class="token operator">=</span>/tmp/kube-audit-policy-file --audit-log-path<span class="token operator">=</span>/tmp/kube-apiserver-audit.log --authorization-webhook-config-file<span class="token operator">=</span> --authentication-token-webhook-config-file<span class="token operator">=</span> --cert-dir<span class="token operator">=</span>/var/run/kubernetes --egress-selector-config-file<span class="token operator">=</span>/tmp/kube_egress_selector_configuration.yaml --client-ca-file<span class="token operator">=</span>/var/run/kubernetes/client-ca.crt --kubelet-client-certificate<span class="token operator">=</span>/var/run/kubernetes/client-kube-apiserver.crt --kubelet-client-key<span class="token operator">=</span>/var/run/kubernetes/client-kube-apiserver.key --service-account-key-file<span class="token operator">=</span>/tmp/kube-serviceaccount.key --service-account-lookup<span class="token operator">=</span>true --service-account-issuer<span class="token operator">=</span>https://kubernetes.default.svc --service-account-jwks-uri<span class="token operator">=</span>https://kubernetes.default.svc/openid/v1/jwks --service-account-signing-key-file<span class="token operator">=</span>/tmp/kube-serviceaccount.key --enable-admission-plugins<span class="token operator">=</span>NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DefaultTolerationSeconds,Priority,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota,NodeRestriction --disable-admission-plugins<span class="token operator">=</span> --admission-control-config-file<span class="token operator">=</span> --bind-address<span class="token operator">=</span><span class="token number">0.0</span>.0.0 --secure-port<span class="token operator">=</span><span class="token number">6443</span> --tls-cert-file<span class="token operator">=</span>/var/run/kubernetes/serving-kube-apiserver.crt --tls-private-key-file<span class="token operator">=</span>/var/run/kubernetes/serving-kube-apiserver.key --storage-backend<span class="token operator">=</span>etcd3 --storage-media-type<span class="token operator">=</span>application/vnd.kubernetes.protobuf --etcd-servers<span class="token operator">=</span>http://127.0.0.1:2379 --service-cluster-ip-range<span class="token operator">=</span><span class="token number">10.0</span>.0.0/24 --feature-gates<span class="token operator">=</span>AllAlpha<span class="token operator">=</span>false --external-hostname<span class="token operator">=</span>localhost --requestheader-username-headers<span class="token operator">=</span>X-Remote-User --requestheader-group-headers<span class="token operator">=</span>X-Remote-Group --requestheader-extra-headers-prefix<span class="token operator">=</span>X-Remote-Extra- --requestheader-client-ca-file<span class="token operator">=</span>/var/run/kubernetes/request-header-ca.crt --requestheader-allowed-names<span class="token operator">=</span>system:auth-proxy --proxy-client-cert-file<span class="token operator">=</span>/var/run/kubernetes/client-auth-proxy.crt --proxy-client-key-file<span class="token operator">=</span>/var/run/kubernetes/client-auth-proxy.key --cors-allowed-origins<span class="token operator">=</span>/127.0.0.1<span class="token punctuation">(</span>:<span class="token punctuation">[</span><span class="token number">0</span>-9<span class="token punctuation">]</span>+<span class="token punctuation">)</span>?$,/localhost<span class="token punctuation">(</span>:<span class="token punctuation">[</span><span class="token number">0</span>-9<span class="token punctuation">]</span>+<span class="token punctuation">)</span>?$
root       <span class="token number">33017</span>    <span class="token number">9251</span>  <span class="token number">0</span> 07:05 pts/1    00:00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto kube-apiserver
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>杀死</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kill -9 {api-server PID}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>启动：</strong></p>
<p>创建日志信息保存目录：<code v-pre>mkdir -p /root/kubelog/delve-log </code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo dlv  --headless exec /root/go/src/k8s.io/kubernetes/_output/local/bin/linux/amd64/kube-apiserver --listen=127.0.0.1:2345 --api-version=2 --log --log-output=debugger,gdbwire,lidbout,debuglineerr,rpc,dap,fncall,minidump --log-dest=/root/kubelog/delve-log/log -- --authorization-mode=Node,RBAC  --cloud-provider= --cloud-config=   --v=3 --vmodule= --audit-policy-file=/tmp/kube-audit-policy-file --audit-log-path=/tmp/kube-apiserver-audit.log --authorization-webhook-config-file= --authentication-token-webhook-config-file= --cert-dir=/var/run/kubernetes --egress-selector-config-file=/tmp/kube_egress_selector_configuration.yaml --client-ca-file=/var/run/kubernetes/client-ca.crt --kubelet-client-certificate=/var/run/kubernetes/client-kube-apiserver.crt --kubelet-client-key=/var/run/kubernetes/client-kube-apiserver.key --service-account-key-file=/tmp/kube-serviceaccount.key --service-account-lookup=true --service-account-issuer=https://kubernetes.default.svc --service-account-jwks-uri=https://kubernetes.default.svc/openid/v1/jwks --service-account-signing-key-file=/tmp/kube-serviceaccount.key --enable-admission-plugins=NamespaceLifecycle,LimitRanger,ServiceAccount,DefaultStorageClass,DefaultTolerationSeconds,Priority,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota,NodeRestriction --disable-admission-plugins= --admission-control-config-file= --bind-address=0.0.0.0 --secure-port=6443 --tls-cert-file=/var/run/kubernetes/serving-kube-apiserver.crt --tls-private-key-file=/var/run/kubernetes/serving-kube-apiserver.key --storage-backend=etcd3 --storage-media-type=application/vnd.kubernetes.protobuf --etcd-servers=http://127.0.0.1:2379 --service-cluster-ip-range=10.0.0.0/24 --feature-gates=AllAlpha=false --external-hostname=localhost --requestheader-username-headers=X-Remote-User --requestheader-group-headers=X-Remote-Group --requestheader-extra-headers-prefix=X-Remote-Extra- --requestheader-client-ca-file=/var/run/kubernetes/request-header-ca.crt --requestheader-allowed-names=system:auth-proxy --proxy-client-cert-file=/var/run/kubernetes/client-auth-proxy.crt --proxy-client-key-file=/var/run/kubernetes/client-auth-proxy.key --cors-allowed-origins="/127.0.0.1(:[0-9]+)?$,/localhost(:[0-9]+)?$"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>另一台机器连接：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>dlv connect localhost:2345
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="vscode-远程调试方案" tabindex="-1"><a class="header-anchor" href="#vscode-远程调试方案" aria-hidden="true">#</a> vscode 远程调试方案</h2>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">// 使用 IntelliSense 了解相关属性。 </span>
    <span class="token comment">// 悬停以查看现有属性的描述。</span>
    <span class="token comment">// 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387</span>
    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"0.2.0"</span><span class="token punctuation">,</span>
    <span class="token property">"configurations"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Connect to server"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"go"</span><span class="token punctuation">,</span>
            <span class="token property">"request"</span><span class="token operator">:</span> <span class="token string">"attach"</span><span class="token punctuation">,</span>
            <span class="token property">"mode"</span><span class="token operator">:</span> <span class="token string">"remote"</span><span class="token punctuation">,</span>
            <span class="token comment">// "remotePath": "${workspaceFolder}",</span>
            <span class="token property">"port"</span><span class="token operator">:</span> <span class="token number">2345</span><span class="token punctuation">,</span>
            <span class="token property">"host"</span><span class="token operator">:</span> <span class="token string">"192.168.71.130"</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在远程启动 API Server：</strong></p>
<blockquote>
<p>和上面的启动一样：</p>
</blockquote>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '30.md' style='float:left'>⬆️上一节🔗  </a><a href = '32.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


