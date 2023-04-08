<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第64节-kubeadm概述、原理、以及部分源码阅读" tabindex="-1"><a class="header-anchor" href="#第64节-kubeadm概述、原理、以及部分源码阅读" aria-hidden="true">#</a> 第64节 kubeadm概述、原理、以及部分源码阅读</h1>
<div><a href = '63.md' style='float:left'>⬆️上一节🔗  </a><a href = '65.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="kubeadm" tabindex="-1"><a class="header-anchor" href="#kubeadm" aria-hidden="true">#</a> kubeadm</h2>
<ul>
<li><a href="https://github.com/kubernetes/kubeadm/blob/main/docs/design/" target="_blank" rel="noopener noreferrer">github kubeadm design docs<ExternalLinkIcon/></a></li>
</ul>
<p>我们在前面几十个小节学习中也知道了 REST API是Kubernetes的基本结构。组件和外部用户命令之间的所有操作和通信都是API服务器处理的REST API调用。因此，Kubernetes平台中的所有内容都被视为API对象，并且在API中有相应的条目。</p>
<p>大多数操作都可以通过<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/kubectl_cli/overview_of_kubectl.html" target="_blank" rel="noopener noreferrer"><code v-pre>kubectl</code><ExternalLinkIcon/></a>命令行界面或其他命令行工具(如<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/overview_of_kubeadm.html" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm</code><ExternalLinkIcon/></a>)执行，而这些工具又使用API。不过，你也可以使用REST调用直接访问API。</p>
<p>Kubeadm是一个工具，它提供<code v-pre>kubeadm init</code>和<code v-pre>kubeadm join</code>作为创建Kubernetes集群的最佳实践“快捷路径”。</p>
<blockquote>
<p>kubeadm是一个用于部署Kubernetes集群的工具。它被设计用于自动化大多数Kubernetes集群的部署任务，从而使Kubernetes集群的部署变得更加简单和高效。kubeadm负责初始化Master节点，并在节点上安装Kubernetes组件。它还可以添加Worker节点，以便将它们添加到集群中。</p>
</blockquote>
<p>kubeadm执行必要的操作来启动和运行最小可行集群。按照设计，它只关心引导，而不关心配置机器。同样，安装各种漂亮的插件(比如Kubernetes Dashboard、监控解决方案和特定于云的插件)也不在讨论范围之内。</p>
<p>相反，我们期望在kubeadm的基础上构建更高级、更定制化的工具，理想情况下，使用kubeadm作为所有部署的基础将使创建符合规范的集群变得更容易。</p>
<h2 id="kubeadm-init" tabindex="-1"><a class="header-anchor" href="#kubeadm-init" aria-hidden="true">#</a> kubeadm init</h2>
<p>此命令用于初始化Kubernetes控制平面节点。</p>
<p><code v-pre>init</code>命令执行以下阶段:</p>
<ol>
<li><strong>preflight</strong> 运行预检查</li>
<li><strong>certs</strong>：证书生成
<ul>
<li><strong>/ca</strong> 生成用于为其他Kubernetes组件提供身份的自签名Kubernetes CA</li>
<li><strong>/apiserver</strong> 生成用于提供Kubernetes API的证书</li>
<li><strong>/apiserver-kubelet-client</strong> 生成API服务器用于连接kubelet的证书</li>
<li><strong>/front-proxy-ca</strong> 生成用于提供前置代理身份的自签名CA</li>
<li><strong>/front-proxy-client</strong> 生成前置代理客户端证书</li>
<li><strong>/etcd-ca</strong> 生成用于为etcd提供身份的自签名CA</li>
<li><strong>/etcd-server</strong> 生成用于提供etcd服务的证书</li>
<li><strong>/etcd-peer</strong> 生成供etcd节点相互通信的证书</li>
<li><strong>/etcd-healthcheck-client</strong> 生成用于健康检查etcd的活性探针证书</li>
<li><strong>/apiserver-etcd-client</strong> 生成apiserver用于访问etcd的证书</li>
<li><strong>/sa</strong> 生成用于签署服务帐户令牌的私钥及其公钥</li>
</ul>
</li>
<li><strong>kubeconfig</strong>：生成所有kubeconfig文件，以建立控制平面和管理员kubeconfig文件
<ul>
<li><strong>/admin</strong> 为管理员和kubeadm本身生成kubeconfig文件</li>
<li><strong>/kubelet</strong> 为kubelet生成kubeconfig文件，仅用于集群引导目的</li>
<li><strong>/controller-manager</strong> 为控制器管理器生成kubeconfig文件</li>
<li><strong>/scheduler</strong> 为调度器生成kubeconfig文件</li>
</ul>
</li>
<li><strong>kubelet-start</strong> 写入kubelet设置并（重新）启动kubelet</li>
<li><strong>control-plane</strong>：生成所有静态Pod清单文件，以建立控制平面
<ul>
<li><strong>/apiserver</strong> 生成kube-apiserver静态Pod清单</li>
<li><strong>/controller-manager</strong> 生成kube-controller-manager静态Pod清单</li>
<li><strong>/scheduler</strong> 生成kube-scheduler静态Pod清单</li>
</ul>
</li>
<li><strong>etcd</strong>：为本地etcd生成静态Pod清单文件
<ul>
<li><strong>/local</strong> 为本地单节点etcd实例生成静态Pod清单文件</li>
</ul>
</li>
<li><strong>upload-config</strong>：将kubeadm和kubelet配置上传到ConfigMap
<ul>
<li><strong>/kubeadm</strong> 将kubeadm ClusterConfiguration上传到ConfigMap</li>
<li><strong>/kubelet</strong> 将kubelet组件配置上传到ConfigMap</li>
</ul>
</li>
<li><strong>upload-certs</strong> 将证书上传到kubeadm-certs</li>
<li><strong>mark-control-plane</strong> 将节点标记为控制平面</li>
<li><strong>bootstrap-token</strong> 生成用于将节点加入集群的引导令牌</li>
<li><strong>kubelet-finalize</strong>：在TLS引导后更新与kubelet相关的设置
<ul>
<li><strong>/experimental-cert-rotation</strong> 启用kubelet客户端证书轮换</li>
</ul>
</li>
<li><strong>addon</strong>：安装通过一致性测试所需的必要插件
<ul>
<li><strong>/coredns</strong> 将CoreDNS插件安装到Kubernetes集群</li>
<li><strong>/kube-proxy</strong> 将kube-proxy插件安装到Kubernetes集群</li>
</ul>
</li>
<li><strong>show-join-command</strong> 显示控制平面和工作节点的加入命令</li>
</ol>
<h3 id="选项" tabindex="-1"><a class="header-anchor" href="#选项" aria-hidden="true">#</a> 选项</h3>
<table>
<thead>
<tr>
<th>选项</th>
<th>类型</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>--apiserver-advertise-address</td>
<td>string</td>
<td>API Server 广告其监听的 IP 地址。如果未设置，则使用默认网络接口。</td>
</tr>
<tr>
<td>--apiserver-bind-port</td>
<td>int32</td>
<td>默认值：6443。API Server绑定的端口。</td>
</tr>
<tr>
<td>--apiserver-cert-extra-sans</td>
<td>stringSlice</td>
<td>API Server 服务证书的可选额外主体替代名称（SAN），可以是 IP 地址和 DNS 名称。</td>
</tr>
<tr>
<td>--cert-dir</td>
<td>string</td>
<td>默认值：&quot;/etc/kubernetes/pki&quot;。</td>
</tr>
<tr>
<td>--certificate-key</td>
<td>string</td>
<td>用于加密 kubeadm-certs Secret 中的控制平面证书的密钥。</td>
</tr>
<tr>
<td>--config</td>
<td>string</td>
<td>kubeadm 配置文件的路径。</td>
</tr>
<tr>
<td>--cri-socket</td>
<td>string</td>
<td>要连接的CRI套接字的路径。如果为空，kubeadm将尝试自动检测此值；仅在安装了多个CRI或存在非标准CRI套接字时使用此选项。</td>
</tr>
<tr>
<td>--dry-run</td>
<td></td>
<td>不应用任何更改；只输出将要执行的操作。</td>
</tr>
<tr>
<td>--experimental-upload-certs</td>
<td></td>
<td>上传控制平面证书到 kubeadm-certs Secret。</td>
</tr>
<tr>
<td>--feature-gates</td>
<td>string</td>
<td>一组键值对，描述各种功能的特性门。可选项为：</td>
</tr>
<tr>
<td>-h, --help</td>
<td></td>
<td>init 的帮助信息。</td>
</tr>
<tr>
<td>--ignore-preflight-errors</td>
<td>stringSlice</td>
<td>要将其错误显示为警告的检查列表。示例：“IsPrivilegedUser，Swap”。值“all”会忽略所有检查的错误。</td>
</tr>
<tr>
<td>--image-repository</td>
<td>string</td>
<td>默认值：“http://k8s.gcr.io/”。选择一个容器注册表以拉取控制平面映像。</td>
</tr>
<tr>
<td>--kubernetes-version</td>
<td>string</td>
<td>默认值：“stable-1”。为控制平面选择特定的 Kubernetes 版本。</td>
</tr>
<tr>
<td>--node-name</td>
<td>string</td>
<td>指定节点名称。</td>
</tr>
<tr>
<td>--pod-network-cidr</td>
<td>string</td>
<td>指定 Pod 网络的 IP 地址范围。如果设置，则控制平面将自动为每个节点分配 CIDR。</td>
</tr>
<tr>
<td>--service-cidr</td>
<td>string</td>
<td>默认值：“10.96.0.0/12”。使用替代 IP 地址范围来设置服务 VIP。</td>
</tr>
<tr>
<td>--service-dns-domain</td>
<td>string</td>
<td>默认值：“cluster.local”。使用替代域名为服务命名，例如“myorg.internal”。</td>
</tr>
<tr>
<td>--skip-certificate-key-print</td>
<td></td>
<td>不打印用于加密控制平面证书的密钥。</td>
</tr>
<tr>
<td>--skip-phases</td>
<td>stringSlice</td>
<td>要跳过的阶段列表。</td>
</tr>
<tr>
<td>--skip-token-print</td>
<td></td>
<td>跳过打印由“kubeadm init”生成的默认引导令牌。</td>
</tr>
<tr>
<td>--token</td>
<td>string</td>
<td>用于在节点和控制平面节点之间建立双向信任的令牌。格式为[a-z0-9] {6}。[a-z0-9] {16} - 例如abcdef.0123456789abcdef</td>
</tr>
<tr>
<td>--token-ttl duration</td>
<td></td>
<td>默认值：24h0m0s。令牌自动删除之前的持续时间（例如1s，2m，3h）。如果设置为“0”，则令牌永不过期。</td>
</tr>
</tbody>
</table>
<h3 id="从父命令继承的选项" tabindex="-1"><a class="header-anchor" href="#从父命令继承的选项" aria-hidden="true">#</a> 从父命令继承的选项</h3>
<table>
<thead>
<tr>
<th style="text-align:left">选项</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">--rootfs</td>
<td style="text-align:left">string</td>
<td style="text-align:left">[EXPERIMENTAL] The path to the 'real' host root filesystem.</td>
</tr>
</tbody>
</table>
<h3 id="初始化流程" tabindex="-1"><a class="header-anchor" href="#初始化流程" aria-hidden="true">#</a> 初始化流程</h3>
<h4 id="pre-flifht-检查" tabindex="-1"><a class="header-anchor" href="#pre-flifht-检查" aria-hidden="true">#</a> pre-flifht 检查</h4>
<p>在执行 kubeadm init 命令之前，kubeadm 会运行一个 preflight 阶段，用于检查集群节点是否满足 Kubernetes 的最低要求。在 preflight 阶段中，kubeadm 会根据用户提供的选项来执行一系列检查，以确保 Kubernetes 控制平面的正常运行。</p>
<p>常用的 preflight 阶段选项包括：</p>
<ul>
<li>-config：指定 kubeadm 配置文件的路径；</li>
<li>-cri-socket：指定容器运行时（CRI）的 socket 文件路径；</li>
<li>-skip-phases：跳过 preflight 阶段中的某些检查阶段；</li>
<li>-ignore-preflight-errors：忽略 preflight 阶段中的某些错误。</li>
</ul>
<h4 id="certificate-生成阶段" tabindex="-1"><a class="header-anchor" href="#certificate-生成阶段" aria-hidden="true">#</a> certificate 生成阶段</h4>
<p>在初始化 Kubernetes 控制平面时，kubeadm 还会自动为 Kubernetes 组件生成 TLS 证书和秘钥。这些证书和秘钥用于确保 Kubernetes 组件之间的安全通信。</p>
<p>生成自签名CA（如果提供了，则使用现有CA），为集群中的每个组件设置标识。如果用户提供了自己的CA证书和/或密钥，并将其放入通过 <code v-pre>--cert-dir</code> 选项（默认值为<code v-pre>/etc/kubernetes/pki</code> ）配置的证书目录中。可以按照<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init.html#zidingyizhengshu" target="_blank" rel="noopener noreferrer">使用自定义证书<ExternalLinkIcon/></a>文档中的描述跳过此步骤。API服务器证书拥有用于 <code v-pre>--apiserver-cert-extra-sans</code>参数（必要时小写）的额外SAN条目。</p>
<h4 id="生成-kubeconfig-文件" tabindex="-1"><a class="header-anchor" href="#生成-kubeconfig-文件" aria-hidden="true">#</a> 生成 kubeconfig 文件</h4>
<p>将kubeconfig文件写到<code v-pre>/etc/kubernetes/</code>中，供kubelet、控制器-管理器和调度器连接API服务器，每个kubeconfig文件都有自己的标识，另外还有一个名为<code v-pre>admin.conf</code>的kubeconfig文件用于管理。</p>
<h4 id="pod" tabindex="-1"><a class="header-anchor" href="#pod" aria-hidden="true">#</a> pod</h4>
<p>为API服务器、控制器管理器和调度器生成静态Pod清单。如果没有提供外部etcd，则为etcd生成额外的静态Pod清单。</p>
<p>静态Pod清单被写入<code v-pre>/etc/kubernetes/manifests</code>；kubelet监视这个目录，以便在启动时创建pod。</p>
<p>一旦控制平面pod启动并运行，<code v-pre>kubeadm init</code>流程就可以继续。</p>
<ol>
<li>
<p>将标签和污染应用到控制平面节点，这样就不会在那里运行额外的工作负载。</p>
</li>
<li>
<p>生成令牌，额外的节点可以使用该令牌在将来向控制平面注册自己。用户可以选择通过<code v-pre>--token</code>选项提供令牌，如<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_token.html" target="_blank" rel="noopener noreferrer">kubeadm token<ExternalLinkIcon/></a>文档中所述。</p>
</li>
<li>
<p>配置所有必要的配置，允许节点使用<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/authenticating_with_bootstrap_tokens.html" target="_blank" rel="noopener noreferrer">引导令牌<ExternalLinkIcon/></a>和<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/command_line_tools_reference/tls_bootstrapping.html" target="_blank" rel="noopener noreferrer">TLS引导<ExternalLinkIcon/></a>机制加入集群：</p>
<ul>
<li>编写一个ConfigMap来提供加入集群所需的所有信息，并设置相关的RBAC访问规则。</li>
<li>使引导令牌访问CSR签名API。</li>
<li>为新的CSR请求配置自动批准。</li>
</ul>
<p>有关更多信息，请参见<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_join.html" target="_blank" rel="noopener noreferrer">kubeadm join<ExternalLinkIcon/></a>。</p>
</li>
<li>
<p>通过API服务器安装DNS服务器(CoreDNS)和kube-proxy插件组件。在Kubernetes v1.11和更高版本中，CoreDNS是默认的DNS服务器。如果你要安装kube-dns而不是CoreDNS，必须在kubeadm <code v-pre>ClusterConfiguration</code>配置DNS插件。</p>
</li>
</ol>
<h3 id="使用kubeadm的初始化阶段" tabindex="-1"><a class="header-anchor" href="#使用kubeadm的初始化阶段" aria-hidden="true">#</a> 使用kubeadm的初始化阶段</h3>
<p>Kubeadm允许你分阶段创建一个控制平面节点。在v1.13中，<code v-pre>kubeadm init phase</code>命令已经从alpha级别的<code v-pre>kubeadm alpha phase</code>升级到了GA级别。</p>
<p>要查看有序的阶段和子阶段列表，可以调用<code v-pre>kubeadm init --help</code>。列表将位于帮助信息的顶部，每个阶段旁边都有一个描述。注意，通过调用<code v-pre>kubeadm init</code>，所有阶段和子阶段都将按照这个顺序执行。</p>
<p>有些阶段有独特的选项，如果你想查看可用的选项列表，请添加<code v-pre>--help</code>，例如:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> kubeadm init phase control-plane controller-manager <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>你还可以使用<code v-pre>--help</code>查看特定父阶段的子阶段列表:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> kubeadm init phase control-plane <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>kubeadm init</code>还暴露了一个名为<code v-pre>--skip-phase</code>的选项，该选项可用于跳过某些阶段。该选项接受一个阶段名称列表，这些名称可以从上面的有序列表中获取。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> kubeadm init phase control-plane all <span class="token parameter variable">--config</span><span class="token operator">=</span>configfile.yaml
<span class="token function">sudo</span> kubeadm init phase etcd <span class="token builtin class-name">local</span> <span class="token parameter variable">--config</span><span class="token operator">=</span>configfile.yaml
<span class="token comment"># you can now modify the control plane and etcd manifest files</span>
<span class="token function">sudo</span> kubeadm init --skip-phases<span class="token operator">=</span>control-plane,etcd <span class="token parameter variable">--config</span><span class="token operator">=</span>configfile.yaml
<span class="token function">sudo</span> kubeadm init phase control-plane all <span class="token parameter variable">--config</span><span class="token operator">=</span>configfile.yaml
<span class="token function">sudo</span> kubeadm init phase etcd <span class="token builtin class-name">local</span> <span class="token parameter variable">--config</span><span class="token operator">=</span>configfile.yaml
<span class="token comment"># you can now modify the control plane and etcd manifest files</span>
<span class="token function">sudo</span> kubeadm init --skip-phases<span class="token operator">=</span>control-plane,etcd <span class="token parameter variable">--config</span><span class="token operator">=</span>configfile.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该示例将编写基于<code v-pre>configfile.yaml</code>中的配置，位于<code v-pre>/etc/kubernetes/manifests</code>中的清单文件。这允许你修改文件，然后使用<code v-pre>--skip-phases</code>选项跳过这些阶段。通过调用最后一个命令，你将创建一个带有自定义清单文件的控制平面节点。</p>
<h3 id="为kubeadm-init指定配置文件" tabindex="-1"><a class="header-anchor" href="#为kubeadm-init指定配置文件" aria-hidden="true">#</a> 为kubeadm init指定配置文件</h3>
<p>可以用配置文件而不是命令行选项来配置<code v-pre>kubeadm init</code>，一些更高级的特性可能只作为配置文件选项使用。该文件通过 <code v-pre>--config</code> 选项传递。</p>
<h4 id="可以使用自定义镜像" tabindex="-1"><a class="header-anchor" href="#可以使用自定义镜像" aria-hidden="true">#</a> 可以使用自定义镜像</h4>
<p>默认情况下，kubeadm从 <code v-pre>k8s.gcr.io</code>中拉取镜像，除非请求的Kubernetes版本是CI版本，这种情况下，将使用 <code v-pre>gcr.io/kubernetes-ci-images</code> 。</p>
<p>这种情况下在国内可能会出现拉取 over time</p>
<p>你可以向kubeadm指定一个配置文件覆盖此行为。允许自定义有：</p>
<ul>
<li>提供一个替代 <code v-pre>k8s.gcr.io</code>的<code v-pre>imageRepository</code>。</li>
<li>将<code v-pre>useHyperKubeImage</code>设置为<code v-pre>true</code>以使用HyperKube图像。</li>
<li>为etcd或DNS插件提供特定的<code v-pre>imageRepository</code>和<code v-pre>imageTag</code>。</li>
</ul>
<p>请注意，配置字段<code v-pre>kubernetesVersion</code>和命令行选项 <code v-pre>--kubernetes-version</code> 都会影响镜像的版本。</p>
<h3 id="使用自定义证书" tabindex="-1"><a class="header-anchor" href="#使用自定义证书" aria-hidden="true">#</a> 使用自定义证书</h3>
<p>默认情况下，kubeadm生成集群运行所需的所有证书。你也可以通过提供自己的证书来覆盖此行为。</p>
<p>为此，你必须将它们放在由 <code v-pre>--cert-dir</code>选项或 <code v-pre>CertificatesDir</code>配置文件键指定的目录中。默认情况下，该目录为<code v-pre>/etc/kubernetes/pki</code>。</p>
<p>如果存在给定的证书和私钥对，kubeadm将跳过生成步骤，使用现有文件。例如，这意味着你可以将现有的CA复制到 <code v-pre>/etc/kubernetes/pki/ca.crt</code>和 <code v-pre>/etc/kubernetes/pki/ca.key</code>，kubeadm将使用此CA签署其余的证书。</p>
<h4 id="外部ca模式" tabindex="-1"><a class="header-anchor" href="#外部ca模式" aria-hidden="true">#</a> 外部CA模式</h4>
<p>也可以只提供<code v-pre>ca.crt</code> 文件，而不提供<code v-pre>ca.key</code>文件（这只适用于根CA文件，不适用于其他证书对）。如果所有其他证书和kubeconfig文件都到位，kubeadm将识别此条件并激活“外部CA”模式。kubeadm将在磁盘上没有CA密钥的情况下继续执行。</p>
<p>相反，使用 <code v-pre>--controllers=csrsigner</code>独立运行控制器管理器，并指向CA证书和密钥。</p>
<h3 id="指定-cri" tabindex="-1"><a class="header-anchor" href="#指定-cri" aria-hidden="true">#</a> 指定 CRI</h3>
<p>从v1.6.0开始，Kubernetes就默认启用了CRI容器运行时接口。默认情况下使用的容器运行时是Docker，它是通过<code v-pre>kubelet</code>内置的<code v-pre>dockershim </code>CRI启用的。</p>
<p>从 Kubernetes 1.20 开始，默认容器运行时为 <code v-pre>containerd</code>，而之前的版本默认容器运行时为 <code v-pre>Docker</code>。</p>
<p>成功安装<code v-pre>kubeadm</code>和<code v-pre>kubelet</code>之后，执行以下两个额外步骤:</p>
<ol>
<li>
<p>按照上面运行时shim项目清单中的安装文档，在每个节点上安装运行时shim。</p>
</li>
<li>
<p>配置kubelet使用远程CRI运行时。请记住将<code v-pre>RUNTIME_ENDPOINT</code>更改为你自己的值，比如 <code v-pre>/var/run/{your_runtime}.sock</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> /etc/systemd/system/kubelet.service.d/20-cri.conf <span class="token operator">&lt;&lt;</span>EOF<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>Environment<span class="token operator">=</span><span class="token string">"KUBELET_EXTRA_ARGS=--container-runtime=remote --container-runtime-endpoint=<span class="token variable">$RUNTIME_ENDPOINT</span>"</span>EOFsystemctl daemon-reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<p>现在<code v-pre>kubelet</code>已经准备好使用指定的CRI运行时，可以继续使用<code v-pre>kubeadm init</code>和<code v-pre>kubeadm join</code>来部署Kubernetes集群。</p>
<p>在使用外部CRI实现时，请将在执行 <code v-pre>kubeadm init</code> 和<code v-pre>kubeadm reset</code>时添加 <code v-pre>--cri-socket</code> 选项。</p>
<h3 id="离线运行-kubeadm" tabindex="-1"><a class="header-anchor" href="#离线运行-kubeadm" aria-hidden="true">#</a> 离线运行 kubeadm</h3>
<p>要在没有互联网连接的情况下运行kubeadm，你必须预先拉取所需的控制平面镜像。</p>
<p>在Kubernetes v1.11和更高版本中，你可以使用 <code v-pre>kubeadm config images</code>的子命令获取和拉取镜像:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ ./kubeadm config images list

W0319 <span class="token number">15</span>:08:46.559718   <span class="token number">50461</span> version.go:112<span class="token punctuation">]</span> could not obtain neither client nor remote version<span class="token punctuation">;</span> fall back to: <span class="token number">1.0</span>.0-placeholder-version
W0319 <span class="token number">15</span>:08:46.561620   <span class="token number">50461</span> images.go:80<span class="token punctuation">]</span> could not <span class="token function">find</span> officially supported version of etcd <span class="token keyword">for</span> Kubernetes v1.0.0-placeholder-version, falling back
to the nearest etcd version <span class="token punctuation">(</span><span class="token number">3.2</span>.24<span class="token punctuation">)</span>
registry.k8s.io/kube-apiserver:v1.0.0-placeholder-version
registry.k8s.io/kube-controller-manager:v1.0.0-placeholder-version
registry.k8s.io/kube-scheduler:v1.0.0-placeholder-version
registry.k8s.io/kube-proxy:v1.0.0-placeholder-version
registry.k8s.io/pause:3.9
registry.k8s.io/etcd:3.2.24
registry.k8s.io/coredns/coredns:v1.10.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拉取：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubeadm config images pull
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="kubeadm-join" tabindex="-1"><a class="header-anchor" href="#kubeadm-join" aria-hidden="true">#</a> kubeadm join</h2>
<p>该命令初始化Kubernetes工作节点并将其加入到集群。在希望加入现有集群的所有机器上运行此操作。</p>
<p><code v-pre>kubeadm init</code> 和 <code v-pre>kubeadm join</code> 一起提供了良好的用户体验，可以从头开始创建最佳实践的裸Kubernetes集群。然而，kubeadm是如何做到这一点的，可能并不明显。</p>
<p>在加入由kubeadm初始化的集群时，我们需要建立双向信任。这分为<em><strong>发现</strong></em>（让节点信任Kubernetes控制平面）和<em>TLS<strong>引导</strong></em>(让Kubernetes控制平面信任节点)。</p>
<p>有两种主要的发现方案。第一种方法是使用共享令牌和API服务器的IP地址。第二种方法是提供一个文件——标准kubeconfig文件的子集。该文件可以是本地文件，也可以通过HTTPS URL下载。形式为<code v-pre>kubeadm join --discovery-token abcdef.1234567890abcdef 1.2.3.4:6443</code>、 <code v-pre>kubeadm join --discovery-file path/to/file.conf</code>或<code v-pre>kubeadm join --discovery-file https://url/file.conf</code>。只能使用其中一种形式。如果发现信息是从URL加载的，则必须使用HTTPS。此外，在这种情况下，使用已安装的主机CA包验证连接。</p>
<h3 id="命令阶段" tabindex="-1"><a class="header-anchor" href="#命令阶段" aria-hidden="true">#</a> 命令阶段</h3>
<p><code v-pre>join [api-server-endpoint]</code>命令执行以下阶段:</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>The <span class="token string">"join [api-server-endpoint]"</span> command executes the <span class="token keyword">following</span> phases:
<span class="token identifier"><span class="token punctuation">`</span><span class="token punctuation">`</span></span><span class="token punctuation">`</span>
preflight              Run <span class="token keyword">join</span> pre<span class="token operator">-</span>flight checks
control<span class="token operator">-</span>plane<span class="token operator">-</span><span class="token keyword">prepare</span>  <span class="token keyword">Prepare</span> the machine <span class="token keyword">for</span> serving a control plane
  <span class="token operator">/</span>download<span class="token operator">-</span>certs        <span class="token punctuation">[</span>EXPERIMENTAL<span class="token punctuation">]</span> Download certificates shared among control<span class="token operator">-</span>plane nodes <span class="token keyword">from</span> the kubeadm<span class="token operator">-</span>certs Secret
  <span class="token operator">/</span>certs                 Generate the certificates <span class="token keyword">for</span> the new control plane components
  <span class="token operator">/</span>kubeconfig            Generate the kubeconfig <span class="token keyword">for</span> the new control plane components
  <span class="token operator">/</span>control<span class="token operator">-</span>plane         Generate the manifests <span class="token keyword">for</span> the new control plane components
kubelet<span class="token operator">-</span><span class="token keyword">start</span>          <span class="token keyword">Write</span> kubelet settings<span class="token punctuation">,</span> certificates <span class="token operator">and</span> <span class="token punctuation">(</span>re<span class="token punctuation">)</span><span class="token keyword">start</span> the kubelet
control<span class="token operator">-</span>plane<span class="token operator">-</span><span class="token keyword">join</span>     <span class="token keyword">Join</span> a machine <span class="token keyword">as</span> a control plane instance
  <span class="token operator">/</span>etcd                  <span class="token keyword">Add</span> a new <span class="token keyword">local</span> etcd member
  <span class="token operator">/</span><span class="token keyword">update</span><span class="token operator">-</span><span class="token keyword">status</span>         Register the new control<span class="token operator">-</span>plane node <span class="token keyword">into</span> the ClusterStatus maintained <span class="token operator">in</span> the kubeadm<span class="token operator">-</span>config ConfigMap <span class="token punctuation">(</span>DEPRECATED<span class="token punctuation">)</span>
  <span class="token operator">/</span>mark<span class="token operator">-</span>control<span class="token operator">-</span>plane    Mark a node <span class="token keyword">as</span> a control<span class="token operator">-</span>plane
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>preflight</code>：运行加入前检查</li>
<li><code v-pre>control-plane-prepare</code>：准备机器以服务于控制平面</li>
<li>
<ul>
<li><code v-pre>/download-certs</code>：[实验性] 从 kubeadm-certs Secret 下载控制平面节点间共享的证书</li>
<li><code v-pre>/certs</code>：为新的控制平面组件生成证书</li>
<li><code v-pre>/kubeconfig</code>：为新的控制平面组件生成 kubeconfig</li>
<li><code v-pre>/control-plane</code>：为新的控制平面组件生成清单</li>
</ul>
</li>
<li><code v-pre>kubelet-start</code>：编写 kubelet 设置，证书并启动 kubelet</li>
<li><code v-pre>control-plane-join</code>：将机器作为控制平面实例加入</li>
<li>
<ul>
<li><code v-pre>/etcd</code>：添加一个新的本地 etcd 成员</li>
<li><code v-pre>/update-status</code>：将新的控制平面节点注册到维护在 kubeadm-config ConfigMap 中的 ClusterStatus 中 (已弃用)</li>
<li><code v-pre>/mark-control-plane</code>：将节点标记为控制平面节点</li>
</ul>
</li>
</ul>
<h3 id="选项-1" tabindex="-1"><a class="header-anchor" href="#选项-1" aria-hidden="true">#</a> 选项</h3>
<table>
<thead>
<tr>
<th>选项</th>
<th>类型</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>--apiserver-advertise-address</code></td>
<td>string</td>
<td>如果节点应该托管新的控制平面实例，则是 API 服务器将广告它正在侦听的 IP 地址。如果未设置，将使用默认网络接口。</td>
</tr>
<tr>
<td><code v-pre>--apiserver-bind-port</code></td>
<td>int32</td>
<td>默认值：6443。如果节点应该托管新的控制平面实例，则是 API 服务器绑定的端口。</td>
</tr>
<tr>
<td><code v-pre>--certificate-key</code></td>
<td>string</td>
<td>使用此密钥解密由 init 上传的证书密钥。</td>
</tr>
<tr>
<td><code v-pre>--config</code></td>
<td>string</td>
<td>kubeadm 配置文件的路径。</td>
</tr>
<tr>
<td><code v-pre>--cri-socket</code></td>
<td>string</td>
<td>连接的 CRI 套接字的路径。如果为空，kubeadm 将尝试自动检测此值。仅在安装了多个 CRI 或具有非标准 CRI 套接字时使用此选项。</td>
</tr>
<tr>
<td><code v-pre>--discovery-file</code></td>
<td>string</td>
<td>对于基于文件的发现，要从中加载群集信息的文件或 URL。</td>
</tr>
<tr>
<td><code v-pre>--discovery-token</code></td>
<td>string</td>
<td>对于基于令牌的发现，用于验证从 API 服务器获取的群集信息的令牌。</td>
</tr>
<tr>
<td><code v-pre>--discovery-token-ca-cert-hash</code></td>
<td>stringSlice</td>
<td>对于基于令牌的发现，验证根 CA 公钥是否与此哈希值匹配（格式：“ : ”）。</td>
</tr>
<tr>
<td><code v-pre>--discovery-token-unsafe-skip-ca-verification</code></td>
<td></td>
<td>对于基于令牌的发现，允许加入而不使用 --discovery-token-ca-cert-hash 固定。</td>
</tr>
<tr>
<td><code v-pre>--experimental-control-plane</code></td>
<td></td>
<td>在此节点上创建新的控制平面实例。</td>
</tr>
<tr>
<td><code v-pre>-h</code>, <code v-pre>--help</code></td>
<td></td>
<td>join 的帮助信息</td>
</tr>
<tr>
<td><code v-pre>--ignore-preflight-errors</code></td>
<td>stringSlice</td>
<td>显示为警告的检查列表的错误。示例：“IsPrivilegedUser,Swap”。值“all”会忽略所有检查的错误。</td>
</tr>
<tr>
<td><code v-pre>--node-name</code></td>
<td>string</td>
<td>指定节点名称。</td>
</tr>
<tr>
<td><code v-pre>--skip-phases</code></td>
<td>stringSlice</td>
<td>要跳过的阶段列表。</td>
</tr>
<tr>
<td><code v-pre>--tls-bootstrap-token</code></td>
<td>string</td>
<td>在加入节点时，指定用于临时身份验证 Kubernetes 控制平面的令牌。</td>
</tr>
<tr>
<td><code v-pre>--token</code></td>
<td>string</td>
<td>在未提供 discovery-token 和 tls-bootstrap-token 时使用此令牌。</td>
</tr>
</tbody>
</table>
<h3 id="加入流程" tabindex="-1"><a class="header-anchor" href="#加入流程" aria-hidden="true">#</a> 加入流程</h3>
<p><code v-pre>kubeadm join</code>引导Kubernetes工作节点或控制平面节点，并将其添加到集群中。对于工作节点，该操作包括以下步骤:</p>
<ol>
<li>
<p>kubeadm从API服务器下载必要的集群信息。默认情况下，它使用引导令牌和CA密钥的哈希值来验证数据的真实性。根CA也可以通过文件或URL直接获取。</p>
</li>
<li>
<p>一旦获取了集群信息，kubelet就可以启动TLS引导流程。</p>
<p>TLS引导使用共享令牌与Kubernetes API服务器进行临时认证，提交证书签名请求(CSR)；默认情况下，控制平面自动签署此CSR请求。</p>
</li>
<li>
<p>最后，kubeadm将本地kubelet配置为使用分配给节点的最终标识连接到API服务器。</p>
</li>
</ol>
<p>对于控制平面节点，还要执行额外的步骤:</p>
<ol>
<li>从集群中下载控制平面节点之间共享的证书(如果用户显式地请求)。</li>
<li>生成控制平面组件清单、证书和kubeconfig。</li>
<li>添加新的本地etcd成员。</li>
<li>将此节点添加到kubeadm集群的ClusterStatus中。</li>
</ol>
<h3 id="使用kubeadm的加入阶段" tabindex="-1"><a class="header-anchor" href="#使用kubeadm的加入阶段" aria-hidden="true">#</a> 使用kubeadm的加入阶段</h3>
<p>Kubeadm允许你分阶段将节点加入到集群。<code v-pre>kubeadm join phase</code>命令是在v1.14.0中添加的。</p>
<p>要查看阶段的有序列表和子阶段列表，可以调用<code v-pre>kubeadm join --help</code>。列表将位于帮助的顶部，每个阶段旁边都有一个描述。注意，通过调用<code v-pre>kubeadm join</code>，所有阶段和子阶段都将按照这个顺序执行。</p>
<p>有些阶段有独特的选项，所以如果你想查看可用的选项列表，请添加<code v-pre>--help</code>，例如:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm <span class="token function">join</span> phase kubelet-start <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>与<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init_phase.html" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm init phase</code><ExternalLinkIcon/></a>命令类似，<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_join_phase.html" target="_blank" rel="noopener noreferrer"><code v-pre>kubadm join phase</code><ExternalLinkIcon/></a>允许你使用<code v-pre>--skip-phase</code>选项跳过某些阶段。</p>
<p>例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> kubeadm <span class="token function">join</span> --skip-phases<span class="token operator">=</span>preflight <span class="token parameter variable">--config</span><span class="token operator">=</span>config.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="kubeadm-upgrade" tabindex="-1"><a class="header-anchor" href="#kubeadm-upgrade" aria-hidden="true">#</a> kubeadm upgrade</h2>
<p><code v-pre>kubeadm upgrade</code>是一个用户友好的命令，它将复杂的升级逻辑封装在一个命令后面，支持计划升级和实际执行升级。</p>
<p>如果需要，<code v-pre>kubeadm upgrade</code>还可以用于降级集群。</p>
<p>检查可以升级到哪些版本，并验证当前集群是否可以升级。要跳过internet检查，请传入可选<code v-pre>[version]</code>参数。</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code>❯ ./kubeadm upgrade
Upgrade your cluster smoothly to a newer version with this command

<span class="token property">Usage</span><span class="token punctuation">:</span>
  kubeadm upgrade [flags]
  kubeadm upgrade [command]

Available <span class="token property">Commands</span><span class="token punctuation">:</span>
  apply       Upgrade your Kubernetes cluster to the specified version
  diff        Show what differences would be applied to existing static pod manifests. See <span class="token property">also</span><span class="token punctuation">:</span> kubeadm upgrade apply --dry-run
  node        Upgrade commands for a node in the cluster
  plan        Check which versions are available to upgrade to and validate whether your current cluster is upgradeable. To skip the internet check<span class="token punctuation">,</span> pass in the optional [version] parameter
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kubeadm-config" tabindex="-1"><a class="header-anchor" href="#kubeadm-config" aria-hidden="true">#</a> kubeadm config</h2>
<p>从v1.8.0开始，kubeadm将集群的配置上传到<code v-pre>kube-system</code>名称空间中名为<code v-pre>kubeadm-config</code>的ConfigMap，然后在升级时读取ConfigMap。这支持正确配置系统组件，并提供了无缝的用户体验。</p>
<p>你可以执行<code v-pre>kubeadm config view</code>来查看ConfigMap。如果使用kubeadm v1.7初始化集群。在使用<code v-pre>kubeadm upgrade</code>之前，必须使用<code v-pre>kubeadm config upload</code>创建ConfigMap。</p>
<p>在Kubernetes v1.11.0中，添加了一些新命令。你可以使用<code v-pre>kubeadm config print-default</code> 来打印默认配置，而<code v-pre>kubeadm config migrate</code> 可以将旧的配置文件转换为新版本。<code v-pre>kubeadm config images list</code> 和<code v-pre>kubeadm config images pull</code> 可用于列出和拉取kubeadm所需的镜像。</p>
<p>在 <code v-pre>Kubernetes v1.13.0</code> 以及以后的版本中，如果要列出/拉出的是kube-dns镜像，而不是CoreDNS镜像，则必须使用这里描述的<code v-pre>--config</code> 方式。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubeadm config upload <span class="token parameter variable">--help</span>

There is a ConfigMap <span class="token keyword">in</span> the kube-system namespace called <span class="token string">"kubeadm-config"</span> that kubeadm uses to store internal configuration about the
cluster. kubeadm CLI v1.8.0+ automatically creates this ConfigMap with the config used with <span class="token string">'kubeadm init'</span>, but <span class="token keyword">if</span> you
initialized your cluster using kubeadm v1.7.x or lower, you must use the <span class="token string">'config upload'</span> <span class="token builtin class-name">command</span> to create this
ConfigMap. This is required so that <span class="token string">'kubeadm upgrade'</span> can configure your upgraded cluster correctly.

Usage:
  kubeadm config <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>
  kubeadm config <span class="token punctuation">[</span>command<span class="token punctuation">]</span>

Available Commands:
  images      Interact with container images used by kubeadm
  migrate     Read an older version of the kubeadm configuration API types from a file, and output the similar config object <span class="token keyword">for</span> the newer version
  print       Print configuration

Flags:
  -h, <span class="token parameter variable">--help</span>                <span class="token builtin class-name">help</span> <span class="token keyword">for</span> config
      <span class="token parameter variable">--kubeconfig</span> string   The kubeconfig <span class="token function">file</span> to use when talking to the cluster. If the flag is not set, a <span class="token builtin class-name">set</span> of standard locations can be searched <span class="token keyword">for</span> an existing kubeconfig file. <span class="token punctuation">(</span>default <span class="token string">"/etc/kubernetes/admin.conf"</span><span class="token punctuation">)</span>

Global Flags:
      --add-dir-header           If true, adds the <span class="token function">file</span> directory to the header of the log messages
      --log-file string          If non-empty, use this log <span class="token function">file</span>
      --log-file-max-size uint   Defines the maximum size a log <span class="token function">file</span> can grow to. Unit is megabytes. If the value is <span class="token number">0</span>, the maximum <span class="token function">file</span> size is unlimited. <span class="token punctuation">(</span>default <span class="token number">1800</span><span class="token punctuation">)</span>
      --one-output               If true, only <span class="token function">write</span> logs to their native severity level <span class="token punctuation">(</span>vs also writing to each lower severity level<span class="token punctuation">)</span>
      <span class="token parameter variable">--rootfs</span> string            <span class="token punctuation">[</span>EXPERIMENTAL<span class="token punctuation">]</span> The path to the <span class="token string">'real'</span> <span class="token function">host</span> root filesystem.
      --skip-headers             If true, avoid header prefixes <span class="token keyword">in</span> the log messages
      --skip-log-headers         If true, avoid headers when opening log files
  -v, <span class="token parameter variable">--v</span> Level                  number <span class="token keyword">for</span> the log level verbosity
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kubeadm-config-upload-from-file" tabindex="-1"><a class="header-anchor" href="#kubeadm-config-upload-from-file" aria-hidden="true">#</a> kubeadm config upload from-file</h3>
<p>上传一个配置文件到集群内的ConfigMap，用于kubeadm配置。</p>
<p>使用这个命令，你可以使用提供给<code v-pre>kubeadm init</code>的相同配置文件将配置上传到集群中的ConfigMap。如果使用v1.7初始化集群。在使用<code v-pre>kubeadm upgrade</code>升级到v1.8之前，你需要使用相同的配置文件运行这个命令。</p>
<p>配置位于<code v-pre>kube-system</code>命名空间中的<code v-pre>kubeadm-config</code> ConfigMap中。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm config upload from-file <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>kubeadm config upload from-file --help </code> 查看支持的 flages</p>
</blockquote>
<h3 id="kubeadm-config-view" tabindex="-1"><a class="header-anchor" href="#kubeadm-config-view" aria-hidden="true">#</a> kubeadm config view</h3>
<p>使用这个命令，你可以在kubeadm配置所在的集群中查看ConfigMap。</p>
<p>配置位于<code v-pre>kube-system</code>命名空间中的<code v-pre>kubeadm-config</code> ConfigMap中。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm config view <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="kubeadm-reset" tabindex="-1"><a class="header-anchor" href="#kubeadm-reset" aria-hidden="true">#</a> kubeadm reset</h2>
<p>此命令将还原<code v-pre>kubeadm init</code>和<code v-pre>kubeadm join</code>所做的任何更改。</p>
<p>运行此命令，以恢复<code v-pre> kubeadm init</code>和 <code v-pre>kubeadm join</code>对该主机所做的任何更改。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm reset
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="清理外部etcd" tabindex="-1"><a class="header-anchor" href="#清理外部etcd" aria-hidden="true">#</a> 清理外部etcd</h3>
<p>如果使用外部etcd， <code v-pre>kubeadm reset</code>不会删除任何etcd数据。这意味着，如果再次使用相同的etcd端点运行<code v-pre>kubeadm init</code>，您将看到以前集群的状态。</p>
<p>要擦除etcd数据，建议使用etcdctl这样的客户端，例如:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>etcdctl del <span class="token string">""</span> <span class="token parameter variable">--prefix</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="kubeadm-token" tabindex="-1"><a class="header-anchor" href="#kubeadm-token" aria-hidden="true">#</a> kubeadm token</h2>
<p>引导令牌用于在连接集群的节点和控制平面节点之间建立双向信任，如<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/authenticating_with_bootstrap_tokens.html" target="_blank" rel="noopener noreferrer">使用引导令牌进行认证<ExternalLinkIcon/></a>中所述。</p>
<p><code v-pre>kubeadm init</code>使用24小时TTL创建初始令牌。下面的命令可以管理该令牌，并创建和管理新的令牌。</p>
<h3 id="kubeadm-token-create" tabindex="-1"><a class="header-anchor" href="#kubeadm-token-create" aria-hidden="true">#</a> kubeadm token create</h3>
<p>在服务器上创建引导令牌。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm token create <span class="token punctuation">[</span>token<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令将为您创建一个 <strong>引导令牌</strong>。你可以指定此令牌的用法、“生存时间”和可选的人性化描述。</p>
<p><code v-pre>[token]</code>是要写的实际令牌。这应该是一个安全生成的随机令牌形式<code v-pre>[a-z0-9]{6}.[a-z0-9]{16}</code>。如果没有给出<code v-pre>[token]</code>，则kubeadm将生成一个随机令牌。</p>
<blockquote>
<p>所以所 引导令牌是和 kueadme 对应的：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ kubeadm token create
qg8u0m.g31qk96l34ns9gz4

❯ kubectl get secrets -A | grep -i qg8u0m
kube-system       bootstrap-token-qg8u0m                           bootstrap.kubernetes.io/token         6      2m10s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h3 id="kubeadm-token-delete" tabindex="-1"><a class="header-anchor" href="#kubeadm-token-delete" aria-hidden="true">#</a> kubeadm token delete</h3>
<p>删除服务器上的引导令牌。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm token delete <span class="token punctuation">[</span>token-value<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ kubeadm token delete qg8u0m
bootstrap token <span class="token string">"qg8u0m"</span> deleted
❯ kubeadm token list
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="kubeadm-token-generate" tabindex="-1"><a class="header-anchor" href="#kubeadm-token-generate" aria-hidden="true">#</a> kubeadm token generate</h3>
<p>生成并打印引导令牌，但不要在服务器上创建它。</p>
<p>这个命令将输出一个随机生成的引导令牌，可以与<code v-pre>init</code>和<code v-pre>join</code>命令一起使用。</p>
<p>你不必使用此命令来生成令牌。只要格式是<code v-pre>[a-z0-9]{6}.[a-z0-9]{16}</code>，你出可以自己生成。提供此命令是为了方便以给定格式生成令牌。</p>
<p>你还可以使用<code v-pre>kubeadm init</code>而无需指定令牌，它将为你生成并打印一个令牌。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm token generate <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="kubeadm-token-list" tabindex="-1"><a class="header-anchor" href="#kubeadm-token-list" aria-hidden="true">#</a> kubeadm token list</h3>
<p>列出服务器上的引导令牌。</p>
<h2 id="kubeadm-version" tabindex="-1"><a class="header-anchor" href="#kubeadm-version" aria-hidden="true">#</a> kubeadm version</h2>
<p>这个命令打印kubeadm的版本。</p>
<h2 id="kubeadm-alpha" tabindex="-1"><a class="header-anchor" href="#kubeadm-alpha" aria-hidden="true">#</a> kubeadm alpha</h2>
<p>Kubeadm alpha命令是Kubeadm工具中的一个实验性功能，用于启用Kubernetes集群的某些高级功能。在Kubeadm alpha命令中，用户可以使用各种参数和标志来配置所需的功能并启动Kubernetes集群。</p>
<h3 id="kubeadm-alpha-certs-renew" tabindex="-1"><a class="header-anchor" href="#kubeadm-alpha-certs-renew" aria-hidden="true">#</a> kubeadm alpha certs renew</h3>
<p>你可以使用<code v-pre>all</code>子命令更新所有Kubernetes证书，或者有选择地更新它们。</p>
<h3 id="renew" tabindex="-1"><a class="header-anchor" href="#renew" aria-hidden="true">#</a> renew</h3>
<p>更新Kubernetes集群的证书。</p>
<h3 id="all" tabindex="-1"><a class="header-anchor" href="#all" aria-hidden="true">#</a> all</h3>
<p>更新所有可用证书。</p>
<p>更新运行控制平面所需的所有已知证书。无论过期日期如何，都会无条件地运行续订。为了获得更多的控制，还可以单独运行续订。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm alpha certs renew all <span class="token punctuation">[</span>flags<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="kubeadm-alpha-kubeconfig-user" tabindex="-1"><a class="header-anchor" href="#kubeadm-alpha-kubeconfig-user" aria-hidden="true">#</a> kubeadm alpha kubeconfig user</h3>
<p><code v-pre>user</code>子命令可用于为其他用户创建kubeconfig文件。</p>
<h2 id="kubeadm-init-phase" tabindex="-1"><a class="header-anchor" href="#kubeadm-init-phase" aria-hidden="true">#</a> kubeadm init phase</h2>
<p>在v1.8.0中，kubeadm引入了<code v-pre>kubeadm alpha phase</code>命令，目的是使kubeadm更加模块化。在v1.13.0中，这个命令逐渐过渡到<code v-pre>kubeadm init phase</code>。这种模块化使你能够调用引导过程的原子子步骤。因此，你可以让kubeadm完成某些部分，并在需要自定义的地方进行填充。</p>
<p><code v-pre>kubeadm init phase</code>与<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init.html#chushihualiucheng" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm init</code>工作流程<ExternalLinkIcon/></a>是一致的，并且两者都使用相同的代码。</p>
<h2 id="kubeadm-join-phase" tabindex="-1"><a class="header-anchor" href="#kubeadm-join-phase" aria-hidden="true">#</a> kubeadm join phase</h2>
<p>在v1.14.0中，kubeadm引入了<code v-pre>kubeadm join phase</code>命令，目的是使kubeadm更加模块化。这种模块化使你能够调用加入（join）过程的原子子步骤。因此，你可以让kubeadm完成某些部分，并在需要自定义的地方进行填充。</p>
<p><code v-pre>kubeadm join phase</code>与<code v-pre>kubeadm join</code>工作流程是一致的，并且在后台两者都使用相同的代码。</p>
<h2 id="细节" tabindex="-1"><a class="header-anchor" href="#细节" aria-hidden="true">#</a> 细节</h2>
<p>kubeadm 围绕着 init 和 join 为主体开展的。</p>
<p><code v-pre>kubeadm init</code>和<code v-pre>kubeadm join</code>所建立的集群应该是:</p>
<ul>
<li>
<p>安全的：</p>
<p>它应该采用最新的最佳实践，如:</p>
<ul>
<li>强制执行RBAC</li>
<li>使用节点授权器</li>
<li>使用控制平面组件之间的安全通信</li>
<li>使用API服务器和kubelet之间的安全通信</li>
<li>锁定kubelet API</li>
<li>锁定对kube-proxy和CoreDNS等系统组件的API访问</li>
<li>锁定引导令牌可以访问的内容</li>
<li>等待</li>
</ul>
</li>
<li>
<p>易用的：</p>
<p>用户运行的两个命令不应该超两个:</p>
<ul>
<li><code v-pre>kubeadm init</code></li>
<li><code v-pre>export KUBECONFIG=/etc/kubernetes/admin.conf</code></li>
<li><code v-pre>kubectl apply -f &lt;network-of-choice.yaml&gt;</code></li>
<li><code v-pre>kubeadm join --token &lt;token&gt; &lt;master-ip&gt;:&lt;master-port&gt;</code></li>
</ul>
</li>
<li>
<p>可扩展的：</p>
<ul>
<li>例如，它应该不支持所有网络提供者，相反，配置网络已超出了范围</li>
<li>应该提供使用配置文件定制各种参数的可能性</li>
</ul>
</li>
</ul>
<h3 id="常量和著名的值与路径" tabindex="-1"><a class="header-anchor" href="#常量和著名的值与路径" aria-hidden="true">#</a> 常量和著名的值与路径</h3>
<p>为了降低复杂性并简化基于kubeadm实现的部署解决方案的开发，kubeadm为众所周知的路径和文件名使用一组有限的常量值。</p>
<p>Kubernetes目录<code v-pre>/etc/kubernetes</code>在应用程序中是一个常量，因为它在大多数情况下都是给定的路径，并且是最直观的位置；其他常量路径和文件名为:</p>
<ul>
<li><strong><code v-pre>/etc/kubernetes/manifests</code> 作为kubelet应该寻找静态Pod清单的路径。静态pod的清单有:</strong>
<ul>
<li><code v-pre>etcd.yaml</code></li>
<li><code v-pre>kube-apiserver.yaml</code></li>
<li><code v-pre>kube-controller-manager.yaml</code></li>
<li><code v-pre>kube-scheduler.yaml</code></li>
</ul>
</li>
<li><strong><code v-pre>/etc/kubernetes/</code> 作为存储具有控制平面组件标识符的kubeconfig文件的路径。kubeconfig文件的名称有:</strong>
<ul>
<li><code v-pre>kubelet.conf</code> (<code v-pre>bootstrap-kubelet.conf</code> 在TLS引导期间)</li>
<li><code v-pre>controller-manager.conf</code></li>
<li><code v-pre>scheduler.conf</code></li>
<li><code v-pre>admin.conf</code> 用于集群管理员和kubeadm自己</li>
</ul>
</li>
<li><strong>证书和密钥文件名称:</strong>
<ul>
<li><code v-pre>ca.crt</code>、 <code v-pre>ca.key</code> 用于Kubernetes证书授权</li>
<li><code v-pre>apiserver.crt</code>、 <code v-pre>apiserver.key</code> 用于API服务器证书</li>
<li><code v-pre>apiserver-kubelet-client.crt</code>、 <code v-pre>apiserver-kubelet-client.key</code> 作为API服务器的客户端证书用于连接安全地连接kubelet</li>
<li><code v-pre>sa.pub</code>、 <code v-pre>sa.key</code> 在签名<code v-pre>ServiceAccount</code>时，作为控制器管理器的密钥</li>
<li><code v-pre>front-proxy-ca.crt</code>、 <code v-pre>front-proxy-ca.key</code> 用于前端代理证书授权</li>
<li><code v-pre>front-proxy-client.crt</code>、 <code v-pre>front-proxy-client.key</code> 用于前端代理客户端</li>
</ul>
</li>
</ul>
<h3 id="kubeadm初始化流程的内部设计" tabindex="-1"><a class="header-anchor" href="#kubeadm初始化流程的内部设计" aria-hidden="true">#</a> kubeadm初始化流程的内部设计</h3>
<p><code v-pre>kubeadm init</code>内部流程（第二个段落标题）由一系列要执行的原子工作任务组成，如<code v-pre>kubeadm init</code>中所述。</p>
<p><code v-pre>kubeadm init phase</code>命令允许用户分别调用每个任务，并最终提供一个可重用和可组合的API/工具箱，其他Kubernetes引导工具、任何IT自动化工具或高级用户都可以使用该API/工具箱创建自定义集群。</p>
<h3 id="预检查-preflight" tabindex="-1"><a class="header-anchor" href="#预检查-preflight" aria-hidden="true">#</a> 预检查（preflight)</h3>
<p>Kubeadm在启动 init 之前执行一组预先检查，目的是验证先决条件并避免常见的集群启动问题。在任何情况下，用户都可以使用<code v-pre>--ignore-preflight-errors</code> 选项跳过特定的预先检查（或者最终跳过所有的预先检查）。</p>
<ul>
<li>[警告]如果要使用的Kubernetes版本（使用 <code v-pre>--kubernetes-version</code>选项指定）至少比kubeadm CLI版本高一个次要版本。</li>
<li>Kubernetes系统要求:
<ul>
<li>如果运行在linux上:
<ul>
<li>[错误]如果不是拥有特定KernelSpec的内核3.10+或4</li>
<li>[错误]如果需要的cgroups子系统没有建立</li>
</ul>
</li>
<li>如果使用docker：
<ul>
<li>[警告/错误]如果Docker服务不存在，如果它被禁用，如果它不是活动的。</li>
<li>[错误]如果Docker端点不存在或不工作</li>
<li>[警告]如果docker版本&gt;17.03</li>
</ul>
</li>
<li>如果使用其它CRI引擎：
<ul>
<li>[错误]如果crictl套接字没有应答</li>
</ul>
</li>
</ul>
</li>
<li>[错误]如果用户不是root</li>
<li>[错误]如果机器主机名不是有效的DNS子域名</li>
<li>[警告]如果无法通过网络查找访问主机名</li>
<li>[错误]如果kubelet版本低于kubeadm支持的最小kubelet版本（当前次要版本 - 1）</li>
<li>[错误]如果kubelet版本比所需的控制平面版本（不支持的版本倾斜）高至少一个次要版本</li>
<li>[警告]如果kubelet服务不存在或被禁用</li>
<li>[警告]如果firewalld是活动的</li>
<li>[错误]如果API服务器bindPort或端口使用的是<code v-pre>10250/10251/10252</code></li>
<li>[错误]如果<code v-pre>/etc/kubernetes/manifest</code>文件夹已经存在且不是空的</li>
<li>[错误]如果<code v-pre>/proc/sys/net/bridge/bridge-nf-call-iptables</code>文件不存在或不包含1</li>
<li>[错误]如果advertise地址是ipv6， <code v-pre>/proc/sys/net/bridge/bridge-nf-call-ip6tables</code>不存在或不包含1。</li>
<li>[错误]如果swap是打开的</li>
<li>[错误]如果命令路径中不存在<code v-pre>ip</code>、<code v-pre>iptables</code>、<code v-pre>mount</code>、<code v-pre>nsenter</code>命令</li>
<li>[警告]如果命令路径中没有<code v-pre>ebtables</code>、<code v-pre>ethtool</code>、<code v-pre>socat</code>、<code v-pre>tc</code>、<code v-pre>touch</code>、<code v-pre>crictl</code>命令</li>
<li>[警告]如果API服务器、控制器管理器、调度器的额外参数包含一些无效选项</li>
<li>[警告]如果通过代理连接到<a href="https://api.advertiseaddress:API.BindPort/" target="_blank" rel="noopener noreferrer">https://API.AdvertiseAddress:API.BindPort<ExternalLinkIcon/></a></li>
<li>[警告]如果通过代理连接到服务子网（仅选中第一个地址）</li>
<li>[警告]如果通过代理连接到Pod子网（仅选中第一个地址）</li>
<li>如果提供外部etcd:
<ul>
<li>[错误]如果etcd版本小于3.0.14</li>
<li>[错误]如果指定etcd证书或密钥，但没有提供</li>
</ul>
</li>
<li>如果没有提供外部etcd（因此将安装本地etcd）:
<ul>
<li>[错误]如果2379端口被占用</li>
<li>[错误]如果 Etcd.DataDir文件夹已经存在并且不为空</li>
</ul>
</li>
<li>如果授权模式为ABAC:
<ul>
<li>[错误]如果<code v-pre>abac_policy.json</code>文件不存在</li>
</ul>
</li>
<li>如果授权模式是WebHook：
<ul>
<li>[错误]如果<code v-pre>webhook_authz .conf</code>文件不存在</li>
</ul>
</li>
</ul>
<p>请注意：</p>
<ol>
<li>可以使用 <code v-pre>kubeadm init phase preflight</code>命令单独执行预先检查</li>
</ol>
<h3 id="生成必要的证书" tabindex="-1"><a class="header-anchor" href="#生成必要的证书" aria-hidden="true">#</a> 生成必要的证书</h3>
<p>Kubeadm生成用于不同目的的证书和私钥对:</p>
<ul>
<li>
<p>一个用于Kubernetes集群的自签名证书颁发机构，保存在<code v-pre>ca.crt</code>文件和<code v-pre>ca.key</code>私钥文件中</p>
</li>
<li>
<p>API服务器的服务证书，使用</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ca.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>作为CA生成，并保存到</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>apiserver.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>文件及其私钥</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>apiserver.key
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>。此证书应包含以下可选名称:</p>
<ul>
<li>Kubernetes服务的内部集群IP（服务CIDR中的第一个地址，例如：如果服务子网是<code v-pre>10.96.0.0/12</code>，则集群IP为<code v-pre>10.96.0.1</code>）</li>
<li>Kubernetes DNS名称；例如：如果指定<code v-pre>--service-dns-domain</code> 为 <code v-pre>cluster.local</code>，则DNS名称为<code v-pre>kubernetes.default.svc.cluster.local</code> ，加上默认DNS名称： <code v-pre>kubernetes.default.svc</code>、<code v-pre>kubernetes.default</code>、 <code v-pre>kubernetes</code></li>
<li>节点名称</li>
<li><code v-pre>--apiserver-advertise-address</code></li>
<li>由用户指定的其他替代名称</li>
</ul>
</li>
<li>
<p>用于API服务器安全地连接到kubelet的客户端证书，使用<code v-pre>ca.crt</code>作为CA生成，并保存到<code v-pre>apiserver-kubelet-client.crt</code>文件中及其私钥<code v-pre>apiserver-kubelet-client.key</code>。这个证书应该在 <code v-pre>system:masters</code>组织中</p>
</li>
<li>
<p>用于签名服务账户令牌的私钥，并保存至 <code v-pre>sa.key</code> 文件及其公钥文件 <code v-pre>sa.pub</code></p>
</li>
<li>
<p>用于前端代理授权的证书，并保存至 <code v-pre>front-proxy-ca.crt</code>文件及其密钥文件y<code v-pre>front-proxy-ca.key</code></p>
</li>
<li>
<p>用于前端代理客户端的客户端证书，使用 <code v-pre>front-proxy-ca.crt</code>作为CA生成，并保存至 <code v-pre>front-proxy-client.crt</code> 文件及其私钥<code v-pre>front-proxy-client.key</code></p>
</li>
</ul>
<p>证书默认存储在<code v-pre>/etc/kubernetes/pki</code>中，但是这个目录可以使用<code v-pre>--cert-dir</code>选项进行配置。</p>
<p><strong>请注意：</strong></p>
<ol>
<li>如果一个给定的证书和私钥对都存在，并且它的内容符合上面的规范，那么将使用现有的文件，并且跳过给定证书的生成阶段。例如，这意味着用户可以将现有CA复制到<code v-pre>/etc/kubernetes/pki/ca.{crt,key}</code>，然后kubeadm将使用这些文件来签署其余的证书。</li>
<li>仅对于CA，可以只提供<code v-pre>ca.crt</code>文件而不提供<code v-pre>ca.key</code>文件，如果所有其他证书和kubeconfig文件已经到位，kubeadm识别这种情况并激活外部CA模式，这也意味着在控制器管理器的<code v-pre>csrsigner</code>控制器不会启动。</li>
<li>如果kubeadm在<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init.html#waibucamoshi" target="_blank" rel="noopener noreferrer">外部CA模式<ExternalLinkIcon/></a>下运行；所有证书都必须由用户提供，因为kubeadm不能自己生成证书。</li>
<li>在kubeadm以<code v-pre>--dry-run</code>模式执行时，证书文件被写入一个临时文件夹。</li>
<li>可以使用<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init_phase.html#kubeadm-init-phase-certs" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm init phase certs all</code><ExternalLinkIcon/></a> 命令单独调用证书生成。</li>
</ol>
<h3 id="为控制平面组件生成kubeconfig文件" tabindex="-1"><a class="header-anchor" href="#为控制平面组件生成kubeconfig文件" aria-hidden="true">#</a> 为控制平面组件生成kubeconfig文件</h3>
<p>带有控制平面组件标识的Kubeadm kubeconfig文件:</p>
<ul>
<li>
<p>一个kubeconfig文件，供kubelet使用，</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>/etc/kubernetes/kubelet.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>；在这个文件中嵌入了一个带有kubelet标识的客户端证书。此客户证书应该：</p>
<ul>
<li>在 <code v-pre>system:nodes</code>组织中，根据<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_node_authorization.html" target="_blank" rel="noopener noreferrer">节点授权<ExternalLinkIcon/></a>模块的要求</li>
<li>CN为 <code v-pre>system:node:&lt;hostname-lowercased&gt;</code></li>
</ul>
</li>
<li>
<p>一个kubeconfig文件，供控制器管理器使用，<code v-pre>/etc/kubernetes/controller-manager.conf</code>；在这个文件中嵌入了一个带有控制器管理器标识的客户端证书。这个客户端证书的CN应该为 <code v-pre>system:kube-controller-manager</code>，这是由默认的<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_rbac_authorization.html#hexinzujianjiaose" target="_blank" rel="noopener noreferrer">RBAC核心组件角色<ExternalLinkIcon/></a>定义的</p>
</li>
<li>
<p>一个kubeconfig文件，供调度器使用，<code v-pre>/etc/kubernetes/scheduler.conf</code>；在这个文件中嵌入了一个带有调度器标识的客户端证书。这个客户端证书CN应该为<code v-pre>system:kube-scheduler</code>，这是由默认的<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_rbac_authorization.html#hexinzujianjiaose-1" target="_blank" rel="noopener noreferrer">RBAC核心组件角色<ExternalLinkIcon/></a>定义的</p>
</li>
</ul>
<p>此外，还生成一个kubeadm自身和管理员使用的kubeconfig文件，并将其保存到<code v-pre>/etc/kubernetes/admin.conf</code>文件中。这里的<code v-pre>admin</code>定义了管理集群并希望完全控制（root）集群的实际人员。用于<code v-pre>admin</code>的嵌入式客户端证书应该：</p>
<ul>
<li>在<code v-pre>system:masters</code>组织中，如默认的<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_rbac_authorization.html#mianxiangyonghudejiaose" target="_blank" rel="noopener noreferrer">RBAC用户面向角色绑定<ExternalLinkIcon/></a>所定义的那样</li>
<li>包含一个CN，但它可以是任何值。Kubeadm使用CN <code v-pre>kubernetes-admin</code></li>
</ul>
<p>请注意：</p>
<ol>
<li><code v-pre>ca.crt</code>证书被嵌入到所有kubeconfig文件中。</li>
<li>如果存在一个给定的kubeconfig文件，并且它的内容符合上面的规范，那么将使用现有的文件，并且跳过给定kubeconfig的生成阶段。</li>
<li>如果kubeadm在外部CA模式下运行，那么用户还必须提供所有必需的kubeconfig，因为kubeadm本身不能生成任何kubeonfig</li>
<li>在kubeadm以<code v-pre>--dry-run</code>模式时，kubeconfig文件被写入一个临时文件夹。</li>
<li>可以使用<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init_phase.html#kubeadm-init-phase-kubeconfig" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm init phase kubeconfig all</code><ExternalLinkIcon/></a> 命令单独调用Kubeconfig文件生成。</li>
</ol>
<h3 id="为控制平面组件生成pod吊舱清单" tabindex="-1"><a class="header-anchor" href="#为控制平面组件生成pod吊舱清单" aria-hidden="true">#</a> 为控制平面组件生成pod吊舱清单</h3>
<p>Kubeadm将控制平面组件的静态Pod清单文件写入<code v-pre>/etc/kubernetes/manifests</code>；kubelet监控这个目录，以便在启动时创建pod。</p>
<p>静态Pod清单共享一组公共属性:</p>
<ul>
<li>
<p>所有静态pod都部署在<code v-pre>kube-system</code>命名空间中</p>
</li>
<li>
<p>所有静态pod都有 <code v-pre>tier:control-plane</code> 和<code v-pre>component:{component-name}</code> 标签</p>
</li>
<li>
<p>所有静态pod都有 <code v-pre>scheduler.alpha.kubernetes.io/critical-pod</code>注解（这将转移到适当的解决方案，即在就绪时使用Pod优先级和抢占）</p>
</li>
<li>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>hostNetwork: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>设置在所有静态pod上，允许在配置网络之前启动控制平面；结果:</p>
<ul>
<li>控制器管理器和调度器用来引用API服务器的<code v-pre>address</code>是<code v-pre>127.0.0.1</code></li>
<li>如果使用本地etcd服务器，<code v-pre>etcd-servers</code>地址将被设置为<code v-pre>127.0.0.1:2379</code></li>
</ul>
</li>
<li>
<p>控制器管理器和调度器都启用了选主功能</p>
</li>
<li>
<p>控制器管理器和调度器将使用各自的惟一标识引用kubeconfig文件</p>
</li>
<li>
<p>所有静态pod获取用户指定的所有额外选项，如<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init.html#xiangkongzhipingmianchuandizidingyixuanxiang" target="_blank" rel="noopener noreferrer">向控制平面传递自定义选项<ExternalLinkIcon/></a>中所述</p>
</li>
<li>
<p>所有静态pod获取用户（<code v-pre>hostPath</code>）指定的所有额外卷</p>
</li>
</ul>
<p>请注意：</p>
<ol>
<li>所有的镜像，对于 <code v-pre>--kubernetes-version</code>或当前架构，将从<code v-pre>k8s.gcr.io</code>拉取。如果指定了替代镜像仓库或CI镜像仓库，则使用此仓库；如果所有控制平面组件都应该使用特定的容器镜像，则将使用此镜像。有关详细信息，请参见<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init.html#shiyongzidingyijingxiang" target="_blank" rel="noopener noreferrer">使用自定义镜像<ExternalLinkIcon/></a></li>
<li>在kubeadm以<code v-pre>--dry-run</code>模式执行时，静态Pod文件被写入一个临时文件夹</li>
<li>可以使用 <a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init_phase.html#kubeadm-init-phase-control-plane" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm init phase control-plane all</code><ExternalLinkIcon/></a>命令单独调用主组件的静态Pod清单生成</li>
</ol>
<h4 id="api服务器" tabindex="-1"><a class="header-anchor" href="#api服务器" aria-hidden="true">#</a> API服务器</h4>
<p>API服务器的静态Pod清单受用户提供的参数影响:</p>
<ul>
<li>要绑定的<code v-pre>apiserver-advertise-address</code> 和<code v-pre>apiserver-bind-port</code> ；如果没有提供，这些值默认为机器上默认网络接口的IP地址和6443端口</li>
<li>用于服务的<code v-pre>service-cluster-ip-range</code></li>
<li>如果指定了外部etcd服务器，则指定 <code v-pre>etcd-servers</code> 地址和相关TLS设置（<code v-pre>etcd-cafile</code>、<code v-pre>etcd-certfile</code>、<code v-pre>etcd-keyfile</code>）；如果不提供外部etcd服务器，则使用本地etcd（通过主机网络）</li>
<li>如果指定了云提供商，则配置相应的 <code v-pre>--cloud-provider</code>，如果存在 <code v-pre>--cloud-config</code>路径（这是实验性的、alpha级别，将在未来版本中删除）</li>
</ul>
<p>其他无条件设置的API服务器选项有：</p>
<ul>
<li>
<p><code v-pre>--insecure-port=0</code> 避免与API服务器的不安全连接</p>
</li>
<li>
<p><code v-pre>--enable-bootstrap-token-auth=true</code> 启用 <code v-pre>BootstrapTokenAuthenticator</code> 认证模块。更多信息，请参见<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/command_line_tools_reference/tls_bootstrapping.html" target="_blank" rel="noopener noreferrer">TLS引导<ExternalLinkIcon/></a></p>
</li>
<li>
<p><code v-pre>--allow-privileged</code> 为<code v-pre>true</code> （必须，例如：kube-proxy）</p>
</li>
<li>
<p><code v-pre>--requestheader-client-ca-file</code> 为<code v-pre>front-proxy-ca.crt</code></p>
</li>
<li>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>--enable-admission-plugins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为：</p>
<ul>
<li><a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_admission_controllers.html#namespacelifecycle" target="_blank" rel="noopener noreferrer"><code v-pre>NamespaceLifecycle</code><ExternalLinkIcon/></a> 避免删除系统保留的命名空间</li>
<li><a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_admission_controllers.html#limitranger" target="_blank" rel="noopener noreferrer"><code v-pre>LimitRanger</code><ExternalLinkIcon/></a> 和<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_admission_controllers.html#resourcequota" target="_blank" rel="noopener noreferrer"><code v-pre>ResourceQuota</code><ExternalLinkIcon/></a> 执行命名空间限制</li>
<li><a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_admission_controllers.html#serviceaccount" target="_blank" rel="noopener noreferrer"><code v-pre>ServiceAccount</code><ExternalLinkIcon/></a> 执行服务账户自动化</li>
<li><a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_admission_controllers.html#persistentvolumelabel" target="_blank" rel="noopener noreferrer"><code v-pre>PersistentVolumeLabel</code><ExternalLinkIcon/></a> 将地区（region）或区域（zone）标签附加到云提供商定义的持久卷上（不推荐使用此准入控制器，并将在将来的版本中删除）。在默认情况下，当不明确选择使用<code v-pre>gce</code>或<code v-pre>aws</code>作为云提供商时，在v1.9以上版本中，kubeadm不会部署此准入控制器）</li>
<li><a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_admission_controllers.html#defaultstorageclass" target="_blank" rel="noopener noreferrer"><code v-pre>DefaultStorageClass</code><ExternalLinkIcon/></a> 在 <code v-pre>PersistentVolumeClaim</code>对象上强制执行默认存储类、</li>
<li><a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_admission_controllers.html#defaulttolerationseconds" target="_blank" rel="noopener noreferrer"><code v-pre>DefaultTolerationSeconds</code><ExternalLinkIcon/></a></li>
<li><a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/using_admission_controllers.html#noderestriction" target="_blank" rel="noopener noreferrer"><code v-pre>NodeRestriction</code><ExternalLinkIcon/></a> 限制kubelet可以修改的内容（例如，只有这个节点上的pod）</li>
</ul>
</li>
<li>
<p><code v-pre>--kubelet-preferred-address-types</code> 为<code v-pre>InternalIP,ExternalIP,Hostname;</code> 这使得<code v-pre>kubectl logs</code>和其他API服务器与kubelet的通信可以在节点的主机名无法解析的环境中工作</p>
</li>
<li>
<p>使用前面步骤生成的证书的选项:</p>
<ul>
<li><code v-pre>--client-ca-file</code> 为<code v-pre>ca.crt</code></li>
<li><code v-pre>--tls-cert-file</code> 为<code v-pre>apiserver.crt</code></li>
<li><code v-pre>--tls-private-key-file</code> 为<code v-pre>apiserver.key</code></li>
<li><code v-pre>--kubelet-client-certificate</code> 为<code v-pre>apiserver-kubelet-client.crt</code></li>
<li><code v-pre>--kubelet-client-key</code> 为<code v-pre>apiserver-kubelet-client.key</code></li>
<li><code v-pre>--service-account-key-file</code> 为<code v-pre>sa.pub</code></li>
<li><code v-pre>--requestheader-client-ca-file</code> 为-proxy-ca.crt`</li>
<li><code v-pre>--proxy-client-cert-file</code> 为<code v-pre>front-proxy-client.crt</code></li>
<li><code v-pre>--proxy-client-key-file</code> 为<code v-pre>front-proxy-client.key</code></li>
</ul>
</li>
<li>
<p>用于保护前端代理（</p>
<p>API聚合</p>
<p>）通信的其他选项：</p>
<ul>
<li><code v-pre>--requestheader-username-headers=X-Remote-User</code></li>
<li><code v-pre>--requestheader-group-headers=X-Remote-Group</code></li>
<li>``--requestheader-extra-headers-prefix=X-Remote-Extra-`</li>
<li><code v-pre>--requestheader-allowed-names=front-proxy-client</code></li>
</ul>
</li>
</ul>
<h4 id="控制器管理器" tabindex="-1"><a class="header-anchor" href="#控制器管理器" aria-hidden="true">#</a> 控制器管理器</h4>
<p>API服务器的静态Pod清单受用户提供的参数影响:</p>
<ul>
<li>
<p>如果调用kubeadm时指定了</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>--pod-network-cidr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>，则通过设置以下选项可以启用某些CNI网络插件所需的子网管理器特性:</p>
<ul>
<li><code v-pre>--allocate-node-cidrs=true</code></li>
<li><code v-pre>--cluster-cidr</code> 和<code v-pre>--node-cidr-mask-size</code> 选项（根据指定的CIDR）</li>
<li>如果指定了云提供商，则配置相应的 <code v-pre>--cloud-provider</code>，如果存在 <code v-pre>--cloud-config</code>路径（这是实验性的、alpha级别，将在未来版本中删除）</li>
</ul>
</li>
</ul>
<p>其他无条件设置的选项有:</p>
<ul>
<li><code v-pre>--controllers</code> 为TLS引导启用所有默认控制器以及<code v-pre>BootstrapSigner</code>和<code v-pre>TokenCleaner</code>控制器。有关详细信息，请参见<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/command_line_tools_reference/tls_bootstrapping.html" target="_blank" rel="noopener noreferrer">TLS引导<ExternalLinkIcon/></a></li>
<li><code v-pre>--use-service-account-credentials</code> 为<code v-pre>true</code></li>
<li>使用前面步骤生成的证书的选项:
<ul>
<li><code v-pre>--root-ca-file</code> 为<code v-pre>ca.crt</code></li>
<li><code v-pre>--cluster-signing-cert-file</code> 为<code v-pre>ca.crt</code>，如果禁用了外部CA模式，则设置为<code v-pre>&quot;&quot;</code></li>
<li><code v-pre>--cluster-signing-key-file</code> 为<code v-pre>ca.key</code>，如果禁用了外部CA模式，则设置为<code v-pre>&quot;&quot;</code></li>
<li><code v-pre>--service-account-private-key-file</code> 为<code v-pre>sa.key</code></li>
</ul>
</li>
</ul>
<h4 id="调度器" tabindex="-1"><a class="header-anchor" href="#调度器" aria-hidden="true">#</a> 调度器</h4>
<p>调度器的静态Pod清单不受用户提供的参数的影响。</p>
<h3 id="为本地etcd生成静态pod清单" tabindex="-1"><a class="header-anchor" href="#为本地etcd生成静态pod清单" aria-hidden="true">#</a> 为本地etcd生成静态Pod清单</h3>
<p>如果用户指定了一个外部etcd，则跳过此步骤，否则kubeadm将生成一个静态Pod清单文件，用于创建在Pod中运行的本地etcd实例，该实例具有以下属性:</p>
<ul>
<li>在 <code v-pre>localhost:2379</code> 上进行监听并使用 <code v-pre>HostNetwork=true</code></li>
<li>将 <code v-pre>hostPath</code>从<code v-pre>dataDir</code>挂载到主机的文件系统</li>
<li>用户指定的任何额外选项</li>
</ul>
<p>请注意：</p>
<ol>
<li>etcd镜像将从<code v-pre>k8.gcr.io</code>中拉取。如果指定了另一个镜像仓库，则使用此镜像仓库；如果指定了其他镜像名称，则将使用此镜像名称。有关详细信息，请参见<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init.html#shiyongzidingyijingxiang-1" target="_blank" rel="noopener noreferrer">使用自定义镜像<ExternalLinkIcon/></a></li>
<li>在kubeadm以<code v-pre>--dry-run</code>模式执行时，静态Pod文件被写入一个临时文件夹</li>
<li>本地etcd的静态Pod清单生成可以使用<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init_phase.html#kubeadm-init-phase-etcd" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm init phase etcd local</code><ExternalLinkIcon/></a> 命令单独调用</li>
</ol>
<h3 id="可选的动态kublet配置" tabindex="-1"><a class="header-anchor" href="#可选的动态kublet配置" aria-hidden="true">#</a> 可选的动态Kublet配置</h3>
<p>要使用此功能，请调用 <code v-pre>kubeadm alpha kubelet config enable-dynamic</code>。它将kubelet初始化配置写入 <code v-pre>/var/lib/kubelet/config/init/kubelet</code>文件。</p>
<p>初始化配置用于在此特定节点上启动kubelet，为kubelet的drop-in文件提供了另一种选择；这些配置将被kubelet基本配置所替代，如下面的步骤所述。有关更多信息，请参见<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/tasks/administer_cluster/set_kubelet_parameters_via_a_config_file.html" target="_blank" rel="noopener noreferrer">通过配置文件设置Kubelet参数<ExternalLinkIcon/></a>。</p>
<p>请注意：</p>
<ul>
<li>要使动态kubelet配置工作，<code v-pre>--dynamic-config-dir=/var/lib/kubelet/config/dynamic</code> 应该在 <code v-pre>/etc/systemd/system/kubelet.service.d/10-kubeadm.conf</code>中指定</li>
<li>使用配置文件<code v-pre>--config some-file.yaml</code>向<code v-pre>kubeadm init</code> 或<code v-pre>kubeadm join</code> 传递一个 <code v-pre>KubeletConfiguration</code>对象，可以更改kubelet配置。可以使用<code v-pre>---</code>分隔符将<code v-pre>KubeletConfiguration</code>对象与其他对象（如<code v-pre>InitConfiguration</code>）分隔开。有关更多细节，请查看 <code v-pre>kubeadm config print-default</code>命令。</li>
</ul>
<h3 id="等待控制平面启动" tabindex="-1"><a class="header-anchor" href="#等待控制平面启动" aria-hidden="true">#</a> 等待控制平面启动</h3>
<p>这是kubeadm集群的关键时刻。kubeadm将等待<code v-pre>localhost:6443/healthz</code>返回<code v-pre>ok</code>，但是为了检测死锁条件，如果<code v-pre>localhost:10255/healthz</code> （kubelet存活）或<code v-pre>localhost:10255/healthz/syncloop</code> （kubelet就绪）在40秒和60秒后都没有返回<code v-pre>ok</code>，则kubeadm将快速失败。</p>
<p>kubeadm依赖于kubelet来拉取控制平面镜像，并将其作为静态pod正常运行。控制平面启动后，kubeadm将完成以如下段落中描述的任务。</p>
<h3 id="在v1-9中为可选的alpha级别-写入kubelet基本配置" tabindex="-1"><a class="header-anchor" href="#在v1-9中为可选的alpha级别-写入kubelet基本配置" aria-hidden="true">#</a> （在v1.9中为可选的alpha级别）写入kubelet基本配置</h3>
<p>如果使用 <code v-pre>--feature-gates=DynamicKubeletConfig</code>调用kubeadm：</p>
<ul>
<li>将kubelet基本配置写入<code v-pre>kube-system</code>命名空间中的<code v-pre>kubelet-base-config-v1.9</code> ConfigMap</li>
<li>创建RBAC规则，授予对所有引导令牌和所有kubelet实例(即 <code v-pre>system:bootstrappers:kubeadm:default-node-token</code> 和<code v-pre>system:nodes</code>组)的ConfigMap的读访问权</li>
<li>通过 <code v-pre>Node.spec.configSource</code>指向新创建的ConfigMap，为初始控制平面节点启用动态kubelet配置特性。</li>
</ul>
<h3 id="将kubeadm集群配置保存在configmap中-供以后使用" tabindex="-1"><a class="header-anchor" href="#将kubeadm集群配置保存在configmap中-供以后使用" aria-hidden="true">#</a> 将kubeadm集群配置保存在ConfigMap中，供以后使用</h3>
<p>kubeadm将通过选项或配置文件传递给<code v-pre>kubeadm init</code>的配置保存在<code v-pre>kube-system</code>命名空间中名为<code v-pre>kubeadm-config</code>的ConfigMap中。</p>
<p>这将确保将来执行kubeadm操作（如：<code v-pre>kubeadm upgrade</code>）将能够确定实际/当前集群状态，并基于该数据做出新的决策。</p>
<p>请注意：</p>
<ol>
<li>在上传之前，敏感信息，例如令牌，将从配置中删除</li>
<li>可以使用<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init_phase.html#kubeadm-init-phase-upload-config" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm init phase upload-config</code><ExternalLinkIcon/></a> 命令单独调用主节点配置的上传</li>
<li>如果使用kubeadm v1.7初始化集群。在升级到v1.8之前，你必须手动创建主节点配置ConfigMap。为了简化这一任务，实现了 <a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_config.html" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm config upload (from-flags|from-file)</code><ExternalLinkIcon/></a></li>
</ol>
<h3 id="标记主节点" tabindex="-1"><a class="header-anchor" href="#标记主节点" aria-hidden="true">#</a> 标记主节点</h3>
<p>一旦控制平面可用，kubeadm就会执行以下操作:</p>
<ul>
<li>为主节点添加 <code v-pre>node-role.kubernetes.io/master=&quot;&quot;</code>标签</li>
<li>为主节点添加 <code v-pre>node-role.kubernetes.io/master:NoSchedule</code>污染</li>
</ul>
<p>请注意：</p>
<ul>
<li>可以使用<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init_phase.html#kubeadm-init-phase-mark-control-plane" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm init phase mark-control-plane</code><ExternalLinkIcon/></a> 命令单独调用标记控制平面阶段</li>
</ul>
<h3 id="配置tls引导用于节点加入集群" tabindex="-1"><a class="header-anchor" href="#配置tls引导用于节点加入集群" aria-hidden="true">#</a> 配置TLS引导用于节点加入集群</h3>
<p>Kubeadm<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/authenticating_with_bootstrap_tokens.html" target="_blank" rel="noopener noreferrer">使用引导令牌进行认证<ExternalLinkIcon/></a>，将新节点连接到现有集群；有关更多细节，请参见<a href="https://github.com/kubernetes/community/blob/master/contributors/design-proposals/cluster-lifecycle/bootstrap-discovery.md" target="_blank" rel="noopener noreferrer">设计提案<ExternalLinkIcon/></a>。</p>
<p><code v-pre>kubeadm init</code>确保为该进程正确配置了所有内容，这包括以下步骤以及设置API服务器和控制器选项（如前面各段落中所述）。请注意：</p>
<ul>
<li>可以使用<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init_phase.html#kubeadm-init-phase-bootstrap-token" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm init phase bootstrap-token</code><ExternalLinkIcon/></a> 命令配置节点的TLS引导，执行如下各段落描述的所有配置步骤；或者，每个步骤都可以单独调用</li>
</ul>
<h4 id="创建引导令牌" tabindex="-1"><a class="header-anchor" href="#创建引导令牌" aria-hidden="true">#</a> 创建引导令牌</h4>
<p><code v-pre>kubeadm init</code>创建第一个引导令牌，该令牌可以自动生成，也可以由用户使用 <code v-pre>--token</code>箕提供；正如引导令牌规范中所记录的那样，令牌应该以名称 <code v-pre>bootstrap-token-&lt;token-id&gt;</code> 作为Secret保存在<code v-pre>kube-system</code>命名空间中。请注意:</p>
<ol>
<li>由<code v-pre>kubeadm init</code>创建的缺省令牌将用于验证TLS引导过程中的临时用户；这些用户将是<code v-pre>system:bootstrappers:kubeadm:default-node-token</code> 组的成员</li>
<li>令牌的有效性有限，默认为24小时（间隔可以使用<code v-pre>—token-ttl</code> 选项更改）</li>
<li>可以使用<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_token.html" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm token</code><ExternalLinkIcon/></a>命令创建其他令牌，该命令为令牌管理提供了其他有用的功能</li>
</ol>
<h4 id="允许要加入的节点调用csr-api" tabindex="-1"><a class="header-anchor" href="#允许要加入的节点调用csr-api" aria-hidden="true">#</a> 允许要加入的节点调用CSR API</h4>
<p>Kubeadm确保 <code v-pre>system:bootstrappers:kubeadm:default-node-token</code>组中的用户能够访问证书签名API。</p>
<p>这是通过在上面的组和默认RBAC角色 <code v-pre>system:node-bootstrapper</code>之间创建一个名为 <code v-pre>kubeadm:kubelet-bootstrap</code>的集群角色绑定来实现的。</p>
<h4 id="为新的引导令牌设置自动批准" tabindex="-1"><a class="header-anchor" href="#为新的引导令牌设置自动批准" aria-hidden="true">#</a> 为新的引导令牌设置自动批准</h4>
<p>Kubeadm确保引导令牌将由<code v-pre>csrapprover</code>控制器自动批准其CSR请求。</p>
<p>这是通过在<code v-pre>system:bootstrappers:kubeadm:default-node-token</code> 组和默认角色 <code v-pre>system:certificates.k8s.io:certificatesigningrequests:nodeclient</code>之间创建一个名为 <code v-pre>kubeadm:node-autoapprove-bootstrap</code> 的集群角色绑定来实现的。</p>
<p>应该也创建了 <code v-pre>system:certificates.k8s.io:certificatesigningrequests:nodeclient</code>角色，该角色被授予了对<code v-pre>/apis/certificates.k8s.io/certificatesigningrequests/nodeclient</code>的POST权限。</p>
<h4 id="为节点证书旋转设置自动批准" tabindex="-1"><a class="header-anchor" href="#为节点证书旋转设置自动批准" aria-hidden="true">#</a> 为节点证书旋转设置自动批准</h4>
<p>Kubeadm确保为节点启用证书旋转，节点的新证书请求将由<code v-pre>csrapprover</code>控制器自动批准其CSR请求。</p>
<p>这是通过在<code v-pre>system:nodes</code> 组和默认角色 <code v-pre>system:certificates.k8s.io:certificatesigningrequests:selfnodeclient</code>之间创建一个名为 <code v-pre>kubeadm:node-autoapprove-certificate-rotation</code> 的集群角色绑定来实现的。</p>
<h4 id="创建公共cluster-info-configmap" tabindex="-1"><a class="header-anchor" href="#创建公共cluster-info-configmap" aria-hidden="true">#</a> 创建公共cluster-info ConfigMap</h4>
<p>这个阶段在<code v-pre>kube-public</code>命名空间中创建<code v-pre>cluster-info</code> ConfigMap。</p>
<p>此外，它还创建了一个角色和一个角色绑定，授予未经认证的用户（即 <code v-pre>system:unauthenticated</code>组中的用户）访问该ConfigMap的权限。</p>
<p>请注意：</p>
<ol>
<li>对<code v-pre>cluster-info</code> ConfigMap的访问不受速率限制。如果你把你的主节点暴露在互联网上，这可能是个问题，也可能不是；最坏的情况是DoS攻击，攻击者使用API服务器能够处理的所有正在运行的请求来访问<code v-pre>cluster-info</code> ConfigMap。</li>
</ol>
<h3 id="安装插件" tabindex="-1"><a class="header-anchor" href="#安装插件" aria-hidden="true">#</a> 安装插件</h3>
<p>Kubeadm通过API服务器安装内部DNS服务器和kube-proxy插件组件。请注意:</p>
<ol>
<li>此阶段可以使用 <a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init_phase.html#kubeadm-init-phase-addon" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm init phase addon all</code><ExternalLinkIcon/></a>命令单独调用。</li>
</ol>
<h4 id="proxy" tabindex="-1"><a class="header-anchor" href="#proxy" aria-hidden="true">#</a> proxy</h4>
<p>在 <code v-pre>kube-system</code> 命名空间中创建一个用于<code v-pre>kube-proxy</code>的ServiceAccount；然后<code v-pre>kube-proxy</code>作为DaemonSet部署:</p>
<ul>
<li>到主节点的凭据（<code v-pre>ca.crt</code>和<code v-pre>token</code>）来自ServiceAccount</li>
<li>主节点的位置来自ConfigMap</li>
<li><code v-pre>kube-proxy</code> ServiceAccount绑定到 <code v-pre>system:node-proxier</code> ClusterRole中的特权</li>
</ul>
<h4 id="dns" tabindex="-1"><a class="header-anchor" href="#dns" aria-hidden="true">#</a> DNS</h4>
<p>请注意：</p>
<ul>
<li>CoreDNS服务被命名为<code v-pre>kube-dns</code>。这样做是为了防止当用户将集群DNS从kube-dns切换到CoreDNS（反之亦然）时服务中的任何中断</li>
<li>在Kubernetes v1.10或更早的版本中，必须使用 <code v-pre>--feature-gates=CoreDNS=true</code>启用CoreDNS</li>
<li>在Kubernetes v1.11和v1.12版本中，CoreDNS是默认的DNS服务器，必须使用 <code v-pre>--feature-gates=CoreDNS=false</code>调用kubeadm来安装kube-dns</li>
<li>在Kubernetes v1.13及更高版本中，CoreDNS特性开关不再可用，可以使用这里描述的<code v-pre>--config</code>方法安装kube-dns</li>
</ul>
<p>在<code v-pre>kube-system</code>命名空间中创建了一个用于CoreDNS或kube-dns的ServiceAccount。</p>
<p>部署<code v-pre>kube-dns</code>部署和服务:</p>
<ul>
<li>这是相对未经修改的上游核心部署</li>
<li><code v-pre>kube-dns</code>服务帐户绑定到 <code v-pre>system:kube-dns</code> ClusterRole的特权</li>
</ul>
<h3 id="可选的自托管" tabindex="-1"><a class="header-anchor" href="#可选的自托管" aria-hidden="true">#</a> 可选的自托管</h3>
<p>要在现有的静态Pod控制平面上启用自托管，请使用<code v-pre>kubeadm alpha selfhosting pivot</code>。</p>
<p>自托管基本上用DaemonSet替换了用于控制平面组件的pod吊舱；这是通过对API服务器、调度器和控制器管理器静态吊舱执行以下步骤实现的:</p>
<ul>
<li>从磁盘加载静态Pod规约</li>
<li>从静态Pod清单文件中提取PodSpec</li>
<li>修改PodSpec使之与自托管兼容，更多细节:
<ul>
<li>添加节点选择器属性，定向至拥有<code v-pre>node-role.kubernetes.io/master=&quot;&quot;</code> 标签的节点</li>
<li>添加 <code v-pre>node-role.kubernetes.io/master:NoSchedule</code> 污染的容忍</li>
<li>将 <code v-pre>spec.DNSPolicy</code> 设置为<code v-pre>ClusterFirstWithHostNet</code></li>
</ul>
</li>
<li>使用上面提到的PodSpec，为自托管组件构建一个新的DaemonSet对象。</li>
<li>在<code v-pre>kube-system</code>命名空间中创建DaemonSet资源，并等待pod开始运行。</li>
<li>删除静态Pod清单文件。kubelet将停止原来运行的静态pod托管组件</li>
</ul>
<p>请注意，自托管尚未恢复到节点重启；这可以通过外部检查点或控制平面pod的kubelet检查点来修复。有关更多细节，请参见<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_init.html#zituoguan" target="_blank" rel="noopener noreferrer">自托管<ExternalLinkIcon/></a>。</p>
<h3 id="kubeadm-join-phase的内部设计" tabindex="-1"><a class="header-anchor" href="#kubeadm-join-phase的内部设计" aria-hidden="true">#</a> kubeadm join phase的内部设计</h3>
<p>与<code v-pre>kubeadm init</code>类似，<code v-pre>kubeadm join</code>内部工作流程也由一系列要执行的原子工作任务组成。</p>
<p>这分为发现（让节点信任Kubernetes主节点）和TLS引导（让Kubernetes主节点信任该节点）。</p>
<p>参见<a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/accessing_api/authenticating_with_bootstrap_tokens.html" target="_blank" rel="noopener noreferrer">使用引导令牌进行认证<ExternalLinkIcon/></a>或相应的<a href="https://github.com/kubernetes/community/blob/master/contributors/design-proposals/cluster-lifecycle/bootstrap-discovery.md" target="_blank" rel="noopener noreferrer">设计提案<ExternalLinkIcon/></a>。</p>
<h3 id="预先-preflight-检查" tabindex="-1"><a class="header-anchor" href="#预先-preflight-检查" aria-hidden="true">#</a> 预先（preflight）检查</h3>
<p><code v-pre>kubeadm</code>在启动加入集群之前执行一组预先检查，目的是验证先决条件并避免常见的集群启动问题。</p>
<p>请注意：</p>
<ol>
<li><code v-pre>kubeadm join</code>预先检查基本上是<code v-pre>kubeadm init</code>预先检查的子集</li>
<li>从v1.9开始，kubeadm为CRI-generic功能提供了更好的支持；在这种情况下，为crictl跳过或替换docker特定的控件。</li>
<li>从v1.9开始，kubeadm支持运行在Windows上的节点加入集群；在这种情况下，将跳过linux特定的控件。</li>
<li>在任何情况下，用户都可以使用<code v-pre>--ignore-preflight-errors</code> 选项跳过特定的预先检查（或者最终跳过所有的预先检查）。</li>
</ol>
<h3 id="发现cluster-info" tabindex="-1"><a class="header-anchor" href="#发现cluster-info" aria-hidden="true">#</a> 发现cluster-info</h3>
<p>有两种主要的发现方案。第一种方法是使用共享令牌和API服务器的IP地址。第二种方法是提供一个文件（它是标准kubeconfig文件的子集）。</p>
<h4 id="共享令牌发现" tabindex="-1"><a class="header-anchor" href="#共享令牌发现" aria-hidden="true">#</a> 共享令牌发现</h4>
<p>如果使用<code v-pre>--discovery-token</code>调用<code v-pre>kubeadm join</code>，则使用令牌发现；在本例中，节点基本上从<code v-pre>kube-public</code>命名空间中的<code v-pre>cluster-info</code> ConfigMap中检索集群CA证书。</p>
<p>为了防止“中间人”的攻击，我们采取了以下几个步骤:</p>
<ul>
<li>首先，通过不安全的连接检索CA证书（这是可能的，因为<code v-pre>kubeadm init</code>为<code v-pre>system:unauthenticated</code>授予了对 <code v-pre>cluster-info</code> 用户的访问权限）</li>
<li>然后CA证书经过以下验证步骤:
<ul>
<li>基本验证：对JWT签名使用令牌ID</li>
<li>公钥验证：使用提供的 <code v-pre>--discovery-token-ca-cert-hash</code>。这个值在<code v-pre>kubeadm init</code>的输出中可用，或者可以使用标准工具计算（哈希是通过Subject Public Key Info (SPKI)对象的字节计算的，如RFC7469中所示）。<code v-pre>--discovery-token-ca-cert-hash flag</code> 选项可以重复多次，以允许多个公钥。</li>
<li>作为附加验证，CA证书通过安全连接检索，然后与最初检索的CA进行比较</li>
</ul>
</li>
</ul>
<p>请注解：</p>
<ol>
<li>通过传递<code v-pre>--discovery-token-unsafe-skip-ca-verification</code> 选项，可以路过公钥验证；这削弱了kubeadm安全模型，因为其他人可能冒充Kubernetes主节点。</li>
</ol>
<h4 id="文件或https发现" tabindex="-1"><a class="header-anchor" href="#文件或https发现" aria-hidden="true">#</a> 文件或HTTPS发现</h4>
<p>如果使用<code v-pre>--discovery-file</code>调用<code v-pre>kubeadm join</code>，则使用文件发现；该文件可以是本地文件，也可以通过HTTPS URL下载；对于HTTPS，使用已安装的主节点CA 包验证节点加入集群。</p>
<p>通过文件发现，集群CA证书被添加在文件本身中；事实上，发现文件是一个kubeconfig文件，只设置了 <code v-pre>server</code>和 <code v-pre>certificate-authority-data</code>属性，如 <a href="https://www.coderdocument.com/docs/kubernetes/v1.14/reference/setup_tools_reference/kubeadm/kubeadm_join.html" target="_blank" rel="noopener noreferrer"><code v-pre>kubeadm join</code><ExternalLinkIcon/></a>参考文档中所述；当与集群建立连接时，kubeadm尝试访问<code v-pre>cluster-info</code> ConfigMap，如果可用，则使用它。</p>
<h3 id="tls引导" tabindex="-1"><a class="header-anchor" href="#tls引导" aria-hidden="true">#</a> TLS引导</h3>
<p>一旦知道集群信息，就会写入<code v-pre>bootstrap-kubelet.conf</code>文件，从而允许kubelet执行TLS引导（相反，直到v.1.7 TLS引导才由kubeadm管理）。</p>
<p>TLS引导机制使用共享令牌与Kubernetes主节点进行临时认证，为本地创建的密钥对提交证书签名请求(CSR)。</p>
<p>然后自动批准请求，保存<code v-pre>ca.crt</code>文件和<code v-pre>kubelet.conf</code>文件，kubelet将使用该文件加入集群，同时删除<code v-pre>bootstrap-kubelet.conf</code>。</p>
<p>请注意：</p>
<ul>
<li>临时认证是根据<code v-pre>kubeadm init</code>流程中保存的令牌进行验证的（或者使用<code v-pre>kubeadm token</code>创建的其他令牌）</li>
<li>临时认证解析为<code v-pre>system:bootstrappers:kubeadm:default-node-token</code> 组的用户成员，该用户组在<code v-pre>kubeadm init</code>流程中被授予访问CSR API的权限</li>
<li>自动CSR批准由<code v-pre>csrapprover</code>控制器根据<code v-pre>kubeadm init</code>流程的配置进行管理</li>
</ul>
<h4 id="在v1-9中为可选的alpha级别-写入kubelet初始化配置" tabindex="-1"><a class="header-anchor" href="#在v1-9中为可选的alpha级别-写入kubelet初始化配置" aria-hidden="true">#</a> （在v1.9中为可选的alpha级别）写入kubelet初始化配置</h4>
<p>如果使用 <code v-pre>--feature-gates=DynamicKubeletConfig</code>调用<code v-pre>kubeadm</code>：</p>
<ul>
<li>使用引导令牌凭证将kubelet基本配置写入<code v-pre>kube-system</code>命名空间中的<code v-pre>kubelet-base-config-v1.9</code> ConfigMap，并将其作为 kubelet初始化文件 <code v-pre>/var/lib/kubelet/config/init/kubelet</code> 写入磁盘。</li>
<li>一旦kubelet开始使用节点自己的凭据（<code v-pre>/etc/kubernetes/kubelet.conf</code>），更新当前节点配置，指定的节点或kubelet和配置来源于上述ConfigMap。</li>
</ul>
<p>请注意：</p>
<ol>
<li>要使动态kubelet配置工作，需要在<code v-pre>/etc/systemd/system/kubelet.service.d/10-kubeadm.conf</code>中设置<code v-pre>--dynamic-config-dir=/var/lib/kubelet/config/dynamic</code>选项。</li>
</ol>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '63.md' style='float:left'>⬆️上一节🔗  </a><a href = '65.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


