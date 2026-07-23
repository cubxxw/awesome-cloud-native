<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第23节-kubeconfig-token" tabindex="-1"><a class="header-anchor" href="#第23节-kubeconfig-token" aria-hidden="true">#</a> 第23节 Kubeconfig &amp;&amp; token</h1>
<div><a href = '22.md' style='float:left'>⬆️上一节🔗  </a><a href = '24.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<nav class="table-of-contents"><ul><li><router-link to="#前言">前言</router-link></li><li><router-link to="#命令参数">命令参数</router-link></li><li><router-link to="#使用-kubeconfig-文件组织集群访问">使用 kubeconfig 文件组织集群访问</router-link></li><li><router-link to="#支持多集群、多用户、多认证机制">支持多集群、多用户、多认证机制</router-link></li><li><router-link to="#上下文-context">上下文（Context）</router-link></li><li><router-link to="#kubeconfig-环境变量">KUBECONFIG 环境变量</router-link></li><li><router-link to="#合并-kubeconfig-文件">合并 kubeconfig 文件</router-link></li><li><router-link to="#文件引用">文件引用</router-link></li><li><router-link to="#kubeconfig-两种实现方式">kubeconfig 两种实现方式</router-link></li><li><router-link to="#代理">代理</router-link></li><li><router-link to="#定义集群-用户和-context">定义集群，用户和 context</router-link></li><li><router-link to="#生成kubeconfig的配置步骤">生成kubeconfig的配置步骤</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>在前面安装k3s &amp; k8s 中，我们认识了 kubeconfig，但是我们依旧对这个东西很陌生</p>
<p>或许，我们必须熟悉他才可以做更多有意义的work</p>
<p>在开启了 TLS 的集群中，每当与集群交互的时候少不了的是<a href="https://cloud.tencent.com/solution/tb-digitalid?from=10680" target="_blank" rel="noopener noreferrer">身份认证<ExternalLinkIcon/></a>，使用 kubeconfig（即证书） 和 token 两种认证方式是最简单也最通用的认证方式。</p>
</div>
<details class="custom-container details"><summary>针对一次 Kubeconfig 问题的记录</summary>
<ul>
<li><a href="https://headworq.org/en/how-to-connect-to-kubernetes/#" target="_blank" rel="noopener noreferrer">关于这次问题的解决方案<ExternalLinkIcon/></a></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>赵丽颖
 今天 中午 <span class="token number">12</span>:18
Ladies and gentlemen, after the agent <span class="token function">node</span> deployment, my k3s prompts such an error. What is the cause




<span class="token number">23</span> 条回复
新增功能


icsy7867
  <span class="token number">26</span> 分钟前
It shouldn<span class="token string">'t be talking to port 8080.  But 6443.  This usually means kubectl doesn'</span>t have access to the yaml conf.
同时发送至频道


赵丽颖
  <span class="token number">25</span> 分钟前
Sorry, I don<span class="token string">'t quite understand the k3s configuration, which files should I modify?


icsy7867
  25 分钟前
Did you move the config to the location you specified?


icsy7867
  25 分钟前
And check the permissions
仅对你可见


Slackbot
  24 分钟前
/etc/rancher/k3s/config.yaml非有效命令。在 Slack 中，所有以 "/" 字符开始的消息都被解析为命令。
如果你尝试发送消息而不是运行命令，请尝试在 "/" 前加空格。


赵丽颖
  24 分钟前
/etc/rancher/k3s/config.yaml 


赵丽颖
  24 分钟前
This is the position?


icsy7867
  20 分钟前
Or k3s.yaml.  not next to a computer


icsy7867
  19 分钟前
Or is it in that directory you specified?  If so try to export that path so kubectl knows where to look


赵丽颖
  19 分钟前
image.png
 
image.png




赵丽颖
  18 分钟前
I didn'</span>t use <span class="token string">'K3S_CONFIG_FILE'</span> to specify it


赵丽颖
  <span class="token number">18</span> 分钟前
Where should it go?


赵丽颖
  <span class="token number">16</span> 分钟前
Even though I specify its location, it seems to be blank
image.png
 
image.png


icsy7867
  <span class="token number">16</span> 分钟前
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/rancher/k3s/k3s.yaml


icsy7867
  <span class="token number">16</span> 分钟前
Try running this


icsy7867
  <span class="token number">14</span> 分钟前
And <span class="token keyword">then</span> kubectl get nodes


赵丽颖
  <span class="token number">13</span> 分钟前
Thank you very much <span class="token keyword">for</span> your answer. Are you the maintainer of the k3s community


icsy7867
  <span class="token number">11</span> 分钟前
Nope.  Just someone <span class="token function">who</span> has stumbled around playing with k3s and happened to see your message :微笑:


赵丽颖
  <span class="token number">9</span> 分钟前
Nice to meet you. What you met is a junior undergraduate student from China. There is an assignment about k3s


icsy7867
  <span class="token number">5</span> 分钟前
Neat<span class="token operator">!</span>


icsy7867
  <span class="token number">5</span> 分钟前
Nice to meet you


icsy7867
  <span class="token number">5</span> 分钟前
And here<span class="token string">'s a good link
https://headworq.org/en/how-to-connect-to-kubernetes/
headworqheadworq
3 ways to connect to your K3s Kubernetes Cluster
In this article I'</span>ll show you three Kubernetes Clients – Kubectl, Lens and Kubenav.
<span class="token number">2021</span> 年 <span class="token number">1</span> 月 <span class="token number">18</span> 日 <span class="token punctuation">(</span><span class="token number">557</span> kB<span class="token punctuation">)</span>
https://headworq.org/en/how-to-connect-to-kubernetes/



icsy7867
  <span class="token number">4</span> 分钟前
The problem was kubectl was looking <span class="token keyword">for</span> a config file, couldn't <span class="token function">find</span> one and tried a basic setup.


赵丽颖
  <span class="token operator">&lt;</span> <span class="token number">1</span> 分钟前
yep, great article, thanks so much <span class="token keyword">for</span> your <span class="token builtin class-name">help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h2 id="命令参数" tabindex="-1"><a class="header-anchor" href="#命令参数" aria-hidden="true">#</a> 命令参数</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl config SUBCOMMAND

选项
      <span class="token parameter variable">--kubeconfig</span><span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> 使用特定的配置文件。

继承自父命令的选项
      --alsologtostderr<span class="token punctuation">[</span><span class="token operator">=</span>false<span class="token punctuation">]</span>: 同时输出日志到标准错误控制台和文件。
      --api-version<span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> 和服务端交互使用的API版本。
      --certificate-authority<span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> 用以进行认证授权的.cert文件路径。
      --client-certificate<span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> TLS使用的客户端证书路径。
      --client-key<span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> TLS使用的客户端密钥路径。
      <span class="token parameter variable">--cluster</span><span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> 指定使用的kubeconfig配置文件中的集群名。
      <span class="token parameter variable">--context</span><span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> 指定使用的kubeconfig配置文件中的环境名。
      --insecure-skip-tls-verify<span class="token punctuation">[</span><span class="token operator">=</span>false<span class="token punctuation">]</span>: 如果为true，将不会检查服务器凭证的有效性，这会导致你的HTTPS链接变得不安全。
      <span class="token parameter variable">--kubeconfig</span><span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> 命令行请求使用的配置文件路径。
      --log-backtrace-at<span class="token operator">=</span>:0: 当日志长度超过定义的行数时，忽略堆栈信息。
      --log-dir<span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> 如果不为空，将日志文件写入此目录。
      --log-flush-frequency<span class="token operator">=</span>5s: 刷新日志的最大时间间隔。
      --logtostderr<span class="token punctuation">[</span><span class="token operator">=</span>true<span class="token punctuation">]</span>: 输出日志到标准错误控制台，不输出到文件。
      --match-server-version<span class="token punctuation">[</span><span class="token operator">=</span>false<span class="token punctuation">]</span>: 要求服务端和客户端版本匹配。
      <span class="token parameter variable">--namespace</span><span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> 如果不为空，命令将使用此namespace。
      <span class="token parameter variable">--password</span><span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> API Server进行简单认证使用的密码。
  -s, <span class="token parameter variable">--server</span><span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> Kubernetes API Server的地址和端口号。
      <span class="token parameter variable">--stderrthreshold</span><span class="token operator">=</span><span class="token number">2</span>: 高于此级别的日志将被输出到错误控制台。
      <span class="token parameter variable">--token</span><span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> 认证到API Server使用的令牌。
      <span class="token parameter variable">--user</span><span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> 指定使用的kubeconfig配置文件中的用户名。
      <span class="token parameter variable">--username</span><span class="token operator">=</span><span class="token string">""</span><span class="token builtin class-name">:</span> API Server进行简单认证使用的用户名。
      <span class="token parameter variable">--v</span><span class="token operator">=</span><span class="token number">0</span>: 指定输出日志的级别。
      <span class="token parameter variable">--vmodule</span><span class="token operator">=</span>: 指定输出日志的模块，格式如下：pattern<span class="token operator">=</span>N，使用逗号分隔。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-kubeconfig-文件组织集群访问" tabindex="-1"><a class="header-anchor" href="#使用-kubeconfig-文件组织集群访问" aria-hidden="true">#</a> 使用 kubeconfig 文件组织集群访问</h2>
<p>使用 kubeconfig 文件来组织有关集群、用户、命名空间和身份验证机制的信息。<code v-pre>kubectl</code>命令行工具使用 kubeconfig 文件来查找选择集群和与集群的 API 服务器通信所需的信息。</p>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>**注意：**用于配置对集群的访问的文件称为<em>kubeconfig 文件</em>。这是引用配置文件的通用方式。这并不意味着有一个名为<code v-pre>kubeconfig</code>.</p>
<p>**警告：**仅使用来自可信来源的 kubeconfig 文件。使用特制的 kubeconfig 文件可能会导致恶意代码执行或文件暴露。如果您必须使用不受信任的 kubeconfig 文件，请先仔细检查它，就像检查 shell 脚本一样。</p>
</div>
<p>默认情况下，<code v-pre>kubectl</code>查找目录中命名<code v-pre>config</code>的<code v-pre>$HOME/.kube</code>文件。<code v-pre>KUBECONFIG</code>您可以通过设置环境变量或设置 <a href="https://kubernetes.io/docs/reference/generated/kubectl/kubectl/" target="_blank" rel="noopener noreferrer"><code v-pre>--kubeconfig</code><ExternalLinkIcon/></a>标志来指定其他 kubeconfig 文件。</p>
<h2 id="支持多集群、多用户、多认证机制" tabindex="-1"><a class="header-anchor" href="#支持多集群、多用户、多认证机制" aria-hidden="true">#</a> 支持多集群、多用户、多认证机制<a href="https://kubernetes.io/docs/concepts/configuration/organize-cluster-access-kubeconfig/#supporting-multiple-clusters-users-and-authentication-mechanisms" target="_blank" rel="noopener noreferrer"> <ExternalLinkIcon/></a></h2>
<p>假设您有多个集群，并且您的用户和组件以多种方式进行身份验证。例如：</p>
<ul>
<li>正在运行的 kubelet 可能会使用证书进行身份验证。</li>
<li>用户可以使用令牌进行身份验证。</li>
<li>管理员可能拥有他们提供给各个用户的证书集。</li>
</ul>
<p>使用 kubeconfig 文件，您可以组织集群、用户和命名空间。您还可以定义上下文以在集群和名称空间之间快速轻松地切换。</p>
<blockquote>
<p><code v-pre>kubectl config use-context</code> 命令快速地在集群之间进行切换。</p>
</blockquote>
<h2 id="上下文-context" tabindex="-1"><a class="header-anchor" href="#上下文-context" aria-hidden="true">#</a> 上下文（Context）</h2>
<p>通过 kubeconfig 文件中的 <em>context</em> 元素，使用简便的名称来对访问参数进行分组。 每个 context 都有三个参数：cluster、namespace 和 user。 默认情况下，<code v-pre>kubectl</code> 命令行工具使用 <strong>当前上下文</strong> 中的参数与集群进行通信。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl config use-context
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="kubeconfig-环境变量" tabindex="-1"><a class="header-anchor" href="#kubeconfig-环境变量" aria-hidden="true">#</a> KUBECONFIG 环境变量</h2>
<p><code v-pre>KUBECONFIG</code> 环境变量包含一个 kubeconfig 文件列表。 对于 Linux 和 Mac，列表以冒号分隔。对于 Windows，列表以分号分隔。 <code v-pre>KUBECONFIG</code> 环境变量不是必要的。 如果 <code v-pre>KUBECONFIG</code> 环境变量不存在，<code v-pre>kubectl</code> 使用默认的 kubeconfig 文件，<code v-pre>$HOME/.kube/config</code>。</p>
<p>如果 <code v-pre>KUBECONFIG</code> 环境变量存在，<code v-pre>kubectl</code> 使用 <code v-pre>KUBECONFIG</code> 环境变量中列举的文件合并后的有效配置。</p>
<h2 id="合并-kubeconfig-文件" tabindex="-1"><a class="header-anchor" href="#合并-kubeconfig-文件" aria-hidden="true">#</a> 合并 kubeconfig 文件</h2>
<p>要查看配置，输入以下命令：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">[</span>root@iZbp1evo5cnwagauz3w188Z ~<span class="token punctuation">]</span><span class="token comment"># kubectl config view</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">clusters</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">cluster</span><span class="token punctuation">:</span>
    <span class="token key atrule">certificate-authority-data</span><span class="token punctuation">:</span> DATA+OMITTED
    <span class="token key atrule">server</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//apiserver.cluster.local<span class="token punctuation">:</span><span class="token number">6443</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes
<span class="token key atrule">contexts</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">context</span><span class="token punctuation">:</span>
    <span class="token key atrule">cluster</span><span class="token punctuation">:</span> kubernetes
    <span class="token key atrule">user</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>admin
  <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>admin@kubernetes
<span class="token key atrule">current-context</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>admin@kubernetes
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Config
<span class="token key atrule">preferences</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token key atrule">users</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> kubernetes<span class="token punctuation">-</span>admin
  <span class="token key atrule">user</span><span class="token punctuation">:</span>
    <span class="token key atrule">client-certificate-data</span><span class="token punctuation">:</span> REDACTED
    <span class="token key atrule">client-key-data</span><span class="token punctuation">:</span> REDACTED
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如前所述，输出可能来自 kubeconfig 文件，也可能是合并多个 kubeconfig 文件的结果。</p>
<p><strong>以下是 <code v-pre>kubectl</code> 在合并 kubeconfig 文件时使用的规则。</strong></p>
<p>如果设置了 <code v-pre>--kubeconfig</code> 参数，则仅使用指定的文件。不进行合并。此参数只能使用一次。</p>
<p>否则，如果设置了 <code v-pre>KUBECONFIG</code> 环境变量，将它用作应合并的文件列表。根据以下规则合并 <code v-pre>KUBECONFIG</code> 环境变量中列出的文件：</p>
<ul>
<li>忽略空文件名。</li>
<li>对于内容无法反序列化的文件，产生错误信息。</li>
<li>第一个设置特定值或者映射键的文件将生效。</li>
<li>永远不会更改值或者映射键。示例：保留第一个文件的上下文以设置 <code v-pre>current-context</code>。示例：如果两个文件都指定了 <code v-pre>red-user</code>，则仅使用第一个文件的 <code v-pre>red-user</code> 中的值。即使第二个文件在 <code v-pre>red-user</code> 下有非冲突条目，也要丢弃它们。</li>
</ul>
<p>有关设置 <code v-pre>KUBECONFIG</code> 环境变量的示例，请参阅 <a href="https://kubernetes.io/zh-cn/docs/tasks/access-application-cluster/configure-access-multiple-clusters/#set-the-kubeconfig-environment-variable" target="_blank" rel="noopener noreferrer">设置 KUBECONFIG 环境变量<ExternalLinkIcon/></a>。</p>
<p>否则，使用默认的 kubeconfig 文件， <code v-pre>$HOME/.kube/config</code>，不进行合并。</p>
<p><strong>根据此链中的第一个匹配确定要使用的上下文:</strong></p>
<ol>
<li>如果存在，使用 <code v-pre>--context</code> 命令行参数。</li>
<li>使用合并的 kubeconfig 文件中的 <code v-pre>current-context</code>。</li>
</ol>
<p><strong>这种场景下允许空上下文:</strong></p>
<p>确定集群和用户。此时，可能有也可能没有上下文。根据此链中的第一个匹配确定集群和用户，这将运行两次：一次用于用户，一次用于集群。</p>
<ol>
<li>如果存在，使用命令行参数：<code v-pre>--user</code> 或者 <code v-pre>--cluster</code>。</li>
<li>如果上下文非空，从上下文中获取用户或集群。</li>
</ol>
<p><strong>这种场景下用户和集群可以为空:</strong></p>
<p>确定要使用的实际集群信息。此时，可能有也可能没有集群信息。基于此链构建每个集群信息；第一个匹配项会被采用：</p>
<ol>
<li>如果存在：<code v-pre>--server</code>、<code v-pre>--certificate-authority</code> 和 <code v-pre>--insecure-skip-tls-verify</code>，使用命令行参数。</li>
<li>如果合并的 kubeconfig 文件中存在集群信息属性，则使用它们。</li>
<li>如果没有 server 配置，则配置无效。</li>
</ol>
<p>确定要使用的实际用户信息。使用与集群信息相同的规则构建用户信息，但每个用户只允许一种身份认证技术：</p>
<ol>
<li>如果存在：<code v-pre>--client-certificate</code>、<code v-pre>--client-key</code>、<code v-pre>--username</code>、<code v-pre>--password</code> 和 <code v-pre>--token</code>，使用命令行参数。</li>
<li>使用合并的 kubeconfig 文件中的 <code v-pre>user</code> 字段。</li>
<li>如果存在两种冲突技术，则配置无效。</li>
<li>对于仍然缺失的任何信息，使用其对应的默认值，并可能提示输入身份认证信息。</li>
</ol>
<h2 id="文件引用" tabindex="-1"><a class="header-anchor" href="#文件引用" aria-hidden="true">#</a> 文件引用</h2>
<p>kubeconfig 文件中的文件和路径引用是相对于 kubeconfig 文件的位置。 命令行上的文件引用是相对于当前工作目录的。 在 <code v-pre>$HOME/.kube/config</code> 中，相对路径按相对路径存储，绝对路径按绝对路径存储。</p>
<h2 id="kubeconfig-两种实现方式" tabindex="-1"><a class="header-anchor" href="#kubeconfig-两种实现方式" aria-hidden="true">#</a> kubeconfig 两种实现方式</h2>
<ol>
<li>创建 Kubeconfig 文件
<ol>
<li>申请证书</li>
<li>创建 kuberconfig 文件</li>
<li>验证 kuberconfig 文件</li>
</ol>
</li>
<li>手动复制证书
<ol>
<li>集群环境</li>
<li>配置方法</li>
</ol>
</li>
</ol>
<h2 id="代理" tabindex="-1"><a class="header-anchor" href="#代理" aria-hidden="true">#</a> 代理</h2>
<p>你可以在 <code v-pre>kubeconfig</code> 文件中，为每个集群配置 <code v-pre>proxy-url</code> 来让 <code v-pre>kubectl</code> 使用代理，例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>apiVersion: v1
kind: Config

clusters:
- cluster:
    proxy-url: http://proxy.example.org:3128
    server: https://k8s.example.org/k8s/clusters/c-xxyyzz
  name: development

users:
- name: developer

contexts:
- context:
  name: development
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定义集群-用户和-context" tabindex="-1"><a class="header-anchor" href="#定义集群-用户和-context" aria-hidden="true">#</a> 定义集群，用户和 context</h2>
<p>假设用户有两个集群，一个用于正式开发工作，一个用于其它临时用途（scratch）。 在 <code v-pre>development</code> 集群中，前端开发者在名为 <code v-pre>frontend</code> 的名字空间下工作， 存储开发者在名为 <code v-pre>storage</code> 的名字空间下工作。在 <code v-pre>scratch</code> 集群中， 开发人员可能在默认名字空间下工作，也可能视情况创建附加的名字空间。 访问开发集群需要通过证书进行认证。 访问其它临时用途的集群需要通过用户名和密码进行认证。</p>
<p>创建名为 <code v-pre>config-exercise</code> 的目录。在 <code v-pre>config-exercise</code> 目录中，创建名为 <code v-pre>config-demo</code> 的文件，其内容为：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Config
<span class="token key atrule">preferences</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token key atrule">clusters</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">cluster</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> development
<span class="token punctuation">-</span> <span class="token key atrule">cluster</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> scratch

<span class="token key atrule">users</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> developer
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> experimenter

<span class="token key atrule">contexts</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">context</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dev<span class="token punctuation">-</span>frontend
<span class="token punctuation">-</span> <span class="token key atrule">context</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dev<span class="token punctuation">-</span>storage
<span class="token punctuation">-</span> <span class="token key atrule">context</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> exp<span class="token punctuation">-</span>scratch
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置文件描述了集群、用户名和上下文。<code v-pre>config-demo</code> 文件中含有描述两个集群、 两个用户和三个上下文的框架。</p>
<p>进入 <code v-pre>config-exercise</code> 目录。输入以下命令，将集群详细信息添加到配置文件中：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl config <span class="token parameter variable">--kubeconfig</span><span class="token operator">=</span>config-demo set-cluster development <span class="token parameter variable">--server</span><span class="token operator">=</span>https://1.2.3.4 --certificate-authority<span class="token operator">=</span>fake-ca-file
kubectl config <span class="token parameter variable">--kubeconfig</span><span class="token operator">=</span>config-demo set-cluster scratch <span class="token parameter variable">--server</span><span class="token operator">=</span>https://5.6.7.8 --insecure-skip-tls-verify
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">**注意：**</p>
<p>将密码保存到 Kubernetes 客户端配置中有风险。 一个较好的替代方式是使用凭据插件并单独保存这些凭据。 参阅 <a href="https://kubernetes.io/zh-cn/docs/reference/access-authn-authz/authentication/#client-go-credential-plugins" target="_blank" rel="noopener noreferrer">client-go 凭据插件<ExternalLinkIcon/></a></p>
</div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl config <span class="token parameter variable">--kubeconfig</span><span class="token operator">=</span>config-demo set-credentials developer --client-certificate<span class="token operator">=</span>fake-cert-file --client-key<span class="token operator">=</span>fake-key-seefile
kubectl config <span class="token parameter variable">--kubeconfig</span><span class="token operator">=</span>config-demo set-credentials experimenter <span class="token parameter variable">--username</span><span class="token operator">=</span>exp <span class="token parameter variable">--password</span><span class="token operator">=</span>some-password
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>::: tip<strong>说明：</strong></p>
<ul>
<li>要删除用户，可以运行 <code v-pre>kubectl --kubeconfig=config-demo config unset users.&lt;name&gt;</code></li>
<li>要删除集群，可以运行 <code v-pre>kubectl --kubeconfig=config-demo config unset clusters.&lt;name&gt;</code></li>
<li>要删除上下文，可以运行 <code v-pre>kubectl --kubeconfig=config-demo config unset contexts.&lt;name&gt;</code>
:::</li>
</ul>
<h2 id="生成kubeconfig的配置步骤" tabindex="-1"><a class="header-anchor" href="#生成kubeconfig的配置步骤" aria-hidden="true">#</a> 生成kubeconfig的配置步骤</h2>
<p><strong>定义变量：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>export KUBE_APISERVER="https://172.20.0.2:6443" 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>设置集群参数：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl config set-cluster kubernetes   --certificate-authority<span class="token operator">=</span>/etc/kubernetes/ssl/ca.pem   --embed-certs<span class="token operator">=</span>true   <span class="token parameter variable">--server</span><span class="token operator">=</span><span class="token variable">${KUBE_APISERVER}</span>   <span class="token comment">#可以指定路径kubeconfig=/root/config.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>说明：集群参数主要设置了所需要访问的集群的信息。使用 <code v-pre>set-cluster</code> 设置了需要访问的集群，如上为 <code v-pre>kubernetes</code>；<code v-pre>--certificate-authority</code>设置了该集群的公钥；<code v-pre>--embed-certs</code>为 <code v-pre>true</code> 表示将 <code v-pre>--certificate-authority</code> 证书写入到 <code v-pre>kubeconfig</code> 中；<code v-pre>--server</code>则表示该集群的 kube-apiserver 地址。</p>
</blockquote>
<p><strong>设置客户端认证参数：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl config set-credentials admin   --client-certificate<span class="token operator">=</span>/etc/kubernetes/ssl/admin.pem   --embed-certs<span class="token operator">=</span>true   --client-key<span class="token operator">=</span>/etc/kubernetes/ssl/admin-key.pem <span class="token comment">#可以指定路径kubeconfig=/root/config.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>说明：用户参数主要设置用户的相关信息，主要是用户证书。如上的用户名为admin，证书为：/etc/kubernetes/ssl/admin.pem，私钥为：/etc/kubernetes/ssl/admin-key.pem。注意客户端的证书首先要经过集群CA的签署，否则不会被集群认可。此处使用的是ca认证方式，也可以使用token认证，如kubelet的 TLS Boostrap机制下的bootstrapping使用的就是token认证方式。</p>
</blockquote>
<p><strong>设置上下文参数：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl config set-context kubernetes   <span class="token parameter variable">--cluster</span><span class="token operator">=</span>kubernetes   <span class="token parameter variable">--user</span><span class="token operator">=</span>admin <span class="token comment">#可以指定路径kubeconfig=/root/config.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>说明：上下文参数将<strong>集群参数</strong>和<strong>用户参数</strong>关联起来。如上面的上下文名称为kubenetes，集群为kubenetes，用户为admin，表示使用admin的用户凭证来访问kubenetes集群的default命名空间，也可以增加--namspace来指定访问的命名空间。</p>
</blockquote>
<p><strong>设置默认上下文</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl config use-context kubernetes  <span class="token comment">#可以指定路径kubeconfig=/root/config.conf</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>说明：最后使用kubectl config use-context kubernetes来使用名为kubenetes的环境项来作为配置。如果配置了多个环境项，可通过切换不同的环境项名字来访问到不同的集群环境。</p>
</blockquote>
<p>默认生成的 <code v-pre>kubeconfig</code> 被保存到 <code v-pre>~/.kube/config</code> 文件</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '22.md' style='float:left'>⬆️上一节🔗  </a><a href = '24.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


