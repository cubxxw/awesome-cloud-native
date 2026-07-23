<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第30节-localregistry-s-info-into-a-secret-in-namespace-kube-system-2056" tabindex="-1"><a class="header-anchor" href="#第30节-localregistry-s-info-into-a-secret-in-namespace-kube-system-2056" aria-hidden="true">#</a> 第30节  localRegistry's info into a secret in namespace kube-system #2056</h1>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="issue-description" tabindex="-1"><a class="header-anchor" href="#issue-description" aria-hidden="true">#</a> Issue Description</h2>
<ul>
<li><a href="https://github.com/sealerio/sealer/issues/2056" target="_blank" rel="noopener noreferrer">issues#2056<ExternalLinkIcon/></a></li>
</ul>
<p>Maybe Sealer can dump localRegistry's info into a <code v-pre>secret</code> in namespace <code v-pre>kube-system</code>. Some component can use this <code v-pre>secret</code>.</p>
<p><strong>Type: <em>feature request</em></strong></p>
<p><strong>date: <em>2023-02-21</em></strong></p>
<h2 id="namespace" tabindex="-1"><a class="header-anchor" href="#namespace" aria-hidden="true">#</a> namespace</h2>
<p>Three initial namespaces for a cluster：<code v-pre>default</code>、<code v-pre>kube-system</code> 和 <code v-pre>kube-public</code>。</p>
<ul>
<li><code v-pre>Default</code>:  Used for some deployments that don't specify namespaces, this is a quick way to create messes that can be difficult to clean up if you do a lot of deployments without the right information. I'm not going to touch it because it has only one purpose and has misled me in more than one situation.</li>
<li><code v-pre>Kube-system</code> : Is the namespace of all objects associated with the Kubernetes system. Any deployment of this namespace can be a dangerous operation that could irreparably damage the system itself. Yes, I've tried; So I don't recommend it.</li>
<li><code v-pre>Kube-public</code> : It is readable by all (public), but the namespace is reserved for the system.</li>
</ul>
<blockquote>
<p>你好，sealer是搭建Kubernetes的工具，现在sealer有一个任务，需要将 localRegistry's info into a <code v-pre>secret</code> in namespace <code v-pre>kube-system</code>，Some component can use this <code v-pre>secret</code>.</p>
<p><code v-pre>Kube-system</code> 是 Kubernetes 系统相关的所有对象组成的命名空间。请问我该怎么实现这个功能</p>
<p>localRegistry的信息在命名空间kube-system中变成了一个“秘密”，一些组件可以使用这个“秘密”。</p>
</blockquote>
<p>API 集群配置文件（yaml文件）</p>
<p>端口密码，转存到 System namespace</p>
<p>默认生成。</p>
<p><code v-pre>pkg/cluster-runtime/installer.go</code></p>
<p><img src="http://sm.cubxxw.com/sm202302211739502.png" alt="be19b04545eacc4fb0a793db36c3cc7a"></p>
<h2 id="registry" tabindex="-1"><a class="header-anchor" href="#registry" aria-hidden="true">#</a> Registry</h2>
<p>There are at least three types of registry, Kubernetes Registry, Docker Registry and container registry. The following are the explanations for these registries:</p>
<p><a href="https://betterme.xin/posts/2021-09/k8s04/" target="_blank" rel="noopener noreferrer">maybe u should read this articre<ExternalLinkIcon/></a></p>
<ul>
<li>**Docker registry：**A Docker registry contains Docker images that you can pull in order to use them in your deployment. The registry is a stateless, scalable server side application that stores and lets you distribute Docker images.</li>
<li><strong>Kubernetes registry</strong>：The Kubernetes registry is an image pull secret that your deployment uses to authenticate with a Docker registry.</li>
<li><strong>Container registry：</strong> A container registry is a repository—or collection of repositories—used to store and access container images.</li>
</ul>
<h2 id="secrets" tabindex="-1"><a class="header-anchor" href="#secrets" aria-hidden="true">#</a> Secrets</h2>
<p>A Secret is an object that contains a small amount of sensitive data such as a password, a token, or a key. Such information might otherwise be put in a <a href="https://kubernetes.io/docs/concepts/workloads/pods/" target="_blank" rel="noopener noreferrer">Pod<ExternalLinkIcon/></a> specification or in a <a href="https://kubernetes.io/docs/reference/glossary/?all=true#term-image" target="_blank" rel="noopener noreferrer">container image<ExternalLinkIcon/></a>. Using a Secret means that you don't need to include confidential data in your application code.</p>
<p>Secrets are similar to <a href="https://kubernetes.io/docs/concepts/configuration/configmap/" target="_blank" rel="noopener noreferrer">ConfigMaps<ExternalLinkIcon/></a> but are specifically intended to hold confidential data.</p>
<p>⚠️ Kubernetes Secrets are, by default, stored unencrypted in the API server's underlying data store (etcd). Anyone with API access can retrieve or modify a Secret, and so can anyone with access to etcd. Additionally, anyone who is authorized to create a Pod in a namespace can use that access to read any Secret in that namespace; this includes indirect access such as the ability to create a Deployment.</p>
<p><strong>In order to safely use Secrets, take at least the following steps:</strong></p>
<ol>
<li><a href="https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/" target="_blank" rel="noopener noreferrer">Enable Encryption at Rest<ExternalLinkIcon/></a> for Secrets.</li>
<li>Enable or configure RBAC rules](https://kubernetes.io/docs/reference/access-authn-authz/authorization/) with least-privilege access to Secrets.</li>
<li>Restrict Secret access to specific containers.</li>
<li><a href="https://secrets-store-csi-driver.sigs.k8s.io/concepts.html#provider-for-the-secrets-store-csi-driver" target="_blank" rel="noopener noreferrer">Consider using external Secret store providers<ExternalLinkIcon/></a>.</li>
</ol>
<p><strong>There are several options to create a Secret:</strong></p>
<ul>
<li><a href="https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kubectl/" target="_blank" rel="noopener noreferrer">Use <code v-pre>kubectl</code><ExternalLinkIcon/></a></li>
<li><a href="https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-config-file/" target="_blank" rel="noopener noreferrer">Use a configuration file<ExternalLinkIcon/></a></li>
<li><a href="https://kubernetes.io/docs/tasks/configmap-secret/managing-secret-using-kustomize/" target="_blank" rel="noopener noreferrer">Use the Kustomize tool<ExternalLinkIcon/></a></li>
</ul>
<p><strong>查看 namespace 中所有 secret 对象：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl get secrets <span class="token parameter variable">-n</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>您应该能够看到一个名为<code v-pre>&lt;registry-name&gt;-secret</code>的Secret对象，其中<code v-pre>&lt;registry-name&gt;</code>是您在安装Docker Registry时指定的名称。此Secret对象包含 Docker Registry 的登录凭证，包括用户名和密码等信息。您可以使用以下命令获取Secret对象的详细信息：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl describe secret <span class="token operator">&lt;</span>registry-name<span class="token operator">></span>-secret <span class="token parameter variable">-n</span> kube-system
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果您安装的是其他类型的容器镜像仓库，例如Harbor或Nexus等，那么这些容器镜像仓库的信息可能存储在其他位置。</p>
</blockquote>
<p>以下是一个示例yaml文件，其中包含了一个名为<code v-pre>registry-secret</code>的Secret对象，用于存储 <code v-pre>Docker Registry</code> 的登录凭证。请将其中的占位符（<code v-pre>&lt;registry-url&gt;</code>、<code v-pre>&lt;registry-username&gt;</code>和<code v-pre>&lt;registry-password&gt;</code>）替换为您的Docker Registry的URL、用户名和密码。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Secret
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> registry<span class="token punctuation">-</span>secret
  <span class="token key atrule">namespace</span><span class="token punctuation">:</span> kube<span class="token punctuation">-</span>system
<span class="token key atrule">type</span><span class="token punctuation">:</span> kubernetes.io/dockerconfigjson
<span class="token key atrule">data</span><span class="token punctuation">:</span>
  <span class="token key atrule">.dockerconfigjson</span><span class="token punctuation">:</span> eyAiYXV0aCI6ICJodHRwczovL2RvY2tlci5leGFtcGxlLmNvbSIsICJ1c2VybmFtZSI6ICJ1c2VybmFtZSIsICJwYXNzd29yZCI6ICJwYXNzd29yZCJ9Cg==
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，<code v-pre>data</code>字段中的值是一个Base64编码的JSON字符串，其中包含Docker Registry的登录凭证。您可以使用以下命令将Docker Registry的登录凭证编码为Base64字符串：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">'{"auth": "https://&lt;registry-url>", "username": "&lt;registry-username>", "password": "&lt;registry-password>"}'</span> <span class="token operator">|</span> base64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要将这个yaml文件应用到Kubernetes集群中，可以使用以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl apply <span class="token parameter variable">-f</span> registry-secret.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将创建名为<code v-pre>registry-secret</code>的Secret对象，并将其存储在kube-system命名空间中。其他Kubernetes组件可以使用此Secret对象中的凭证来访问您的Docker Registry。</p>
<p>如果您在安装Kubernetes时将Docker Registry的登录凭证存储在Secret对象中，那么您可以使用以下命令从Secret对象中提取出Docker Registry的信息：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get secret <span class="token operator">&lt;</span>registry-secret-name<span class="token operator">></span> <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">'{.data.\.dockerconfigjson}'</span> <span class="token operator">|</span> base64 <span class="token parameter variable">--decode</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，<code v-pre>&lt;registry-secret-name&gt;</code>是您在安装Kubernetes时创建的Secret对象的名称。这个命令将输出一个JSON字符串，其中包含Docker Registry的URL、用户名和密码等信息。</p>
<p>您可以使用<code v-pre>jq</code>命令对这个JSON字符串进行解析，例如：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>kubectl get secret <span class="token operator">&lt;</span>registry<span class="token operator">-</span>secret<span class="token operator">-</span>name<span class="token operator">></span> <span class="token operator">-</span>n kube<span class="token operator">-</span>system <span class="token operator">-</span>o jsonpath<span class="token operator">=</span>'<span class="token punctuation">{</span><span class="token punctuation">.</span>data<span class="token punctuation">.</span>\<span class="token punctuation">.</span>dockerconfigjson<span class="token punctuation">}</span>' <span class="token operator">|</span> base64 <span class="token operator">--</span>decode <span class="token operator">|</span> jq <span class="token char">'.auth'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将输出Docker Registry的URL，例如：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>"https://&lt;registry-url>"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您可以使用类似的方式提取出其他登录凭证信息，例如用户名和密码：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get secret <span class="token operator">&lt;</span>registry-secret-name<span class="token operator">></span> <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">'{.data.\.dockerconfigjson}'</span> <span class="token operator">|</span> base64 <span class="token parameter variable">--decode</span> <span class="token operator">|</span> jq <span class="token string">'.username'</span>
kubectl get secret <span class="token operator">&lt;</span>registry-secret-name<span class="token operator">></span> <span class="token parameter variable">-n</span> kube-system <span class="token parameter variable">-o</span> <span class="token assign-left variable">jsonpath</span><span class="token operator">=</span><span class="token string">'{.data.\.dockerconfigjson}'</span> <span class="token operator">|</span> base64 <span class="token parameter variable">--decode</span> <span class="token operator">|</span> jq <span class="token string">'.password'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建 secret 对象：</strong></p>
<p>在<code v-pre>installer.go</code>中，可以使用以下命令创建一个名为<code v-pre>registry-secret</code>的Secret对象：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>secret :<span class="token operator">=</span> <span class="token operator">&amp;</span>corev1.Secret<span class="token punctuation">{</span>
    ObjectMeta: metav1.ObjectMeta<span class="token punctuation">{</span>
        Name:      <span class="token string">"registry-secret"</span>,
        Namespace: <span class="token string">"kube-system"</span>,
    <span class="token punctuation">}</span>,
    Data: map<span class="token punctuation">[</span>string<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span>byte<span class="token punctuation">{</span>
        <span class="token string">".dockerconfigjson"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>byte<span class="token punctuation">(</span><span class="token operator">&lt;</span>registry-login-info<span class="token operator">></span><span class="token punctuation">)</span>,
    <span class="token punctuation">}</span>,
    Type: corev1.SecretTypeDockerConfigJson,
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，<code v-pre>&lt;registry-login-info&gt;</code>是一个包含Docker Registry的登录凭证信息的JSON字符串。您需要将该字符串存储在Sealer代码中，或从外部读取并传递给Sealer代码。</p>
<p><strong>将Secret对象保存到Kubernetes中</strong></p>
<p>接下来，可以使用以下命令将上述创建的Secret对象保存到Kubernetes中：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> kubeClient<span class="token punctuation">.</span><span class="token function">CoreV1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Secrets</span><span class="token punctuation">(</span><span class="token string">"kube-system"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> secret<span class="token punctuation">,</span> metav1<span class="token punctuation">.</span>CreateOptions<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> err
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将在<code v-pre>kube-system</code>命名空间中创建一个名为<code v-pre>registry-secret</code>的Secret对象，并将其存储到Kubernetes中。</p>
<p><strong>在需要使用登录凭证的组件中引用Secret对象</strong></p>
<p>最后，您可以在需要使用Docker Registry的组件中引用上述创建的Secret对象。例如，可以将以下配置添加到Deployment对象的 <code v-pre>spec.template.spec.containers[].imagePullSecrets</code> 数组中：</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"registry-secret"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这将使Kubernetes在拉取Docker镜像时使用<code v-pre>registry-secret</code> Secret对象中存储的Docker Registry的登录凭证。</p>
<h2 id="关键目录" tabindex="-1"><a class="header-anchor" href="#关键目录" aria-hidden="true">#</a> 关键目录</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewInstaller</span><span class="token punctuation">(</span>conf v2<span class="token punctuation">.</span>ContainerRuntimeConfig<span class="token punctuation">,</span> driver infradriver<span class="token punctuation">.</span>InfraDriver<span class="token punctuation">)</span> <span class="token punctuation">(</span>Installer<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> conf<span class="token punctuation">.</span>Type <span class="token punctuation">{</span>
	<span class="token keyword">case</span> common<span class="token punctuation">.</span>Docker<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">:</span>
		conf<span class="token punctuation">.</span>Type <span class="token operator">=</span> common<span class="token punctuation">.</span>Docker
		ret <span class="token operator">:=</span> <span class="token operator">&amp;</span>DefaultInstaller<span class="token punctuation">{</span>
			rootfs<span class="token punctuation">:</span> driver<span class="token punctuation">.</span><span class="token function">GetClusterRootfsPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			driver<span class="token punctuation">:</span> driver<span class="token punctuation">,</span>
			envs<span class="token punctuation">:</span>   driver<span class="token punctuation">.</span><span class="token function">GetClusterEnv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			Info<span class="token punctuation">:</span> Info<span class="token punctuation">{</span>
				CertsDir<span class="token punctuation">:</span>               DefaultDockerCertsDir<span class="token punctuation">,</span>
				CRISocket<span class="token punctuation">:</span>              DefaultDockerCRISocket<span class="token punctuation">,</span>
				ContainerRuntimeConfig<span class="token punctuation">:</span> conf<span class="token punctuation">,</span>
				ConfigFilePath<span class="token punctuation">:</span>         filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>common<span class="token punctuation">.</span><span class="token function">GetHomeDir</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">".docker"</span><span class="token punctuation">,</span> DockerConfigFileName<span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		ret<span class="token punctuation">.</span>Info<span class="token punctuation">.</span>CgroupDriver <span class="token operator">=</span> DefaultCgroupDriver
		<span class="token keyword">if</span> cd<span class="token punctuation">,</span> ok <span class="token operator">:=</span> ret<span class="token punctuation">.</span>envs<span class="token punctuation">[</span>CgroupDriverArg<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token operator">&amp;&amp;</span> cd <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			ret<span class="token punctuation">.</span>Info<span class="token punctuation">.</span>CgroupDriver <span class="token operator">=</span> cd<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">return</span> ret<span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token keyword">case</span> common<span class="token punctuation">.</span>Containerd<span class="token punctuation">:</span>
		ret <span class="token operator">:=</span> <span class="token operator">&amp;</span>DefaultInstaller<span class="token punctuation">{</span>
			rootfs<span class="token punctuation">:</span> driver<span class="token punctuation">.</span><span class="token function">GetClusterRootfsPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			driver<span class="token punctuation">:</span> driver<span class="token punctuation">,</span>
			envs<span class="token punctuation">:</span>   driver<span class="token punctuation">.</span><span class="token function">GetClusterEnv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			Info<span class="token punctuation">:</span> Info<span class="token punctuation">{</span>
				CertsDir<span class="token punctuation">:</span>               DefaultContainerdCertsDir<span class="token punctuation">,</span>
				CRISocket<span class="token punctuation">:</span>              DefaultContainerdCRISocket<span class="token punctuation">,</span>
				ContainerRuntimeConfig<span class="token punctuation">:</span> conf<span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		ret<span class="token punctuation">.</span>Info<span class="token punctuation">.</span>CgroupDriver <span class="token operator">=</span> DefaultCgroupDriver
		<span class="token keyword">if</span> cd<span class="token punctuation">,</span> ok <span class="token operator">:=</span> ret<span class="token punctuation">.</span>envs<span class="token punctuation">[</span>CgroupDriverArg<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token operator">&amp;&amp;</span> cd <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			ret<span class="token punctuation">.</span>Info<span class="token punctuation">.</span>CgroupDriver <span class="token operator">=</span> cd<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">return</span> ret<span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"invalid container runtime type"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token keyword">func</span> <span class="token function">NewInstaller</span><span class="token punctuation">(</span>conf v2<span class="token punctuation">.</span>ContainerRuntimeConfig<span class="token punctuation">,</span> driver infradriver<span class="token punctuation">.</span>InfraDriver<span class="token punctuation">)</span> <span class="token punctuation">(</span>Installer<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">switch</span> conf<span class="token punctuation">.</span>Type <span class="token punctuation">{</span>
	<span class="token keyword">case</span> common<span class="token punctuation">.</span>Docker<span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">:</span>
		conf<span class="token punctuation">.</span>Type <span class="token operator">=</span> common<span class="token punctuation">.</span>Docker
		ret <span class="token operator">:=</span> <span class="token operator">&amp;</span>DefaultInstaller<span class="token punctuation">{</span>
			rootfs<span class="token punctuation">:</span> driver<span class="token punctuation">.</span><span class="token function">GetClusterRootfsPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			driver<span class="token punctuation">:</span> driver<span class="token punctuation">,</span>
			envs<span class="token punctuation">:</span>   driver<span class="token punctuation">.</span><span class="token function">GetClusterEnv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			Info<span class="token punctuation">:</span> Info<span class="token punctuation">{</span>
				CertsDir<span class="token punctuation">:</span>               DefaultDockerCertsDir<span class="token punctuation">,</span>
				CRISocket<span class="token punctuation">:</span>              DefaultDockerCRISocket<span class="token punctuation">,</span>
				ContainerRuntimeConfig<span class="token punctuation">:</span> conf<span class="token punctuation">,</span>
				ConfigFilePath<span class="token punctuation">:</span>         filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>common<span class="token punctuation">.</span><span class="token function">GetHomeDir</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">".docker"</span><span class="token punctuation">,</span> DockerConfigFileName<span class="token punctuation">)</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		ret<span class="token punctuation">.</span>Info<span class="token punctuation">.</span>CgroupDriver <span class="token operator">=</span> DefaultCgroupDriver
		<span class="token keyword">if</span> cd<span class="token punctuation">,</span> ok <span class="token operator">:=</span> ret<span class="token punctuation">.</span>envs<span class="token punctuation">[</span>CgroupDriverArg<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token operator">&amp;&amp;</span> cd <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			ret<span class="token punctuation">.</span>Info<span class="token punctuation">.</span>CgroupDriver <span class="token operator">=</span> cd<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">return</span> ret<span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token keyword">case</span> common<span class="token punctuation">.</span>Containerd<span class="token punctuation">:</span>
		ret <span class="token operator">:=</span> <span class="token operator">&amp;</span>DefaultInstaller<span class="token punctuation">{</span>
			rootfs<span class="token punctuation">:</span> driver<span class="token punctuation">.</span><span class="token function">GetClusterRootfsPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			driver<span class="token punctuation">:</span> driver<span class="token punctuation">,</span>
			envs<span class="token punctuation">:</span>   driver<span class="token punctuation">.</span><span class="token function">GetClusterEnv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			Info<span class="token punctuation">:</span> Info<span class="token punctuation">{</span>
				CertsDir<span class="token punctuation">:</span>               DefaultContainerdCertsDir<span class="token punctuation">,</span>
				CRISocket<span class="token punctuation">:</span>              DefaultContainerdCRISocket<span class="token punctuation">,</span>
				ContainerRuntimeConfig<span class="token punctuation">:</span> conf<span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		ret<span class="token punctuation">.</span>Info<span class="token punctuation">.</span>CgroupDriver <span class="token operator">=</span> DefaultCgroupDriver
		<span class="token keyword">if</span> cd<span class="token punctuation">,</span> ok <span class="token operator">:=</span> ret<span class="token punctuation">.</span>envs<span class="token punctuation">[</span>CgroupDriverArg<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token operator">&amp;&amp;</span> cd <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			ret<span class="token punctuation">.</span>Info<span class="token punctuation">.</span>CgroupDriver <span class="token operator">=</span> cd<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>

		<span class="token keyword">return</span> ret<span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"invalid container runtime type"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">GetHomeDir</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	home<span class="token punctuation">,</span> err <span class="token operator">:=</span> homedir<span class="token punctuation">.</span><span class="token function">Dir</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token string">"/root/.docker/config.json"</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> home
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="localregistry" tabindex="-1"><a class="header-anchor" href="#localregistry" aria-hidden="true">#</a> localregistry</h2>
<p><strong>文件：</strong></p>
<p><code v-pre>/root/.sealer/Clusterfile</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get cm <span class="token parameter variable">-n</span> kube-system sealer-clusterfile  <span class="token parameter variable">-oyaml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>这是一个在 Kubernetes 集群中使用的命令，它用于获取名为 sealer-clusterfile 的 ConfigMap 的 YAML 格式，该 ConfigMap 位于 kube-system 命名空间中。输出将包括 ConfigMap 的名称、命名空间、标签和数据。由于使用了 <code v-pre>-oyaml</code> 标志，输出将以 YAML 格式呈现。</p>
</blockquote>
<p><strong>Clusterfile:</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> sealer.io/v2
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Cluster
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">creationTimestamp</span><span class="token punctuation">:</span> <span class="token null important">null</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>cluster
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containerRuntime</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token key atrule">env</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> LocalRegistryDomain=sea.hub
  <span class="token punctuation">-</span> LocalRegistryPort=5000
  <span class="token punctuation">-</span> LocalRegistryURL=sea.hub<span class="token punctuation">:</span><span class="token number">5000</span>
  <span class="token punctuation">-</span> RegistryDomain=sea.hub
  <span class="token punctuation">-</span> RegistryPort=5000
  <span class="token punctuation">-</span> RegistryURL=sea.hub<span class="token punctuation">:</span><span class="token number">5000</span>
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">ips</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> 192.168.137.133
    <span class="token key atrule">roles</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> master
    <span class="token key atrule">ssh</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.io/sealerio/kubernetes<span class="token punctuation">:</span>v1.22.15
  <span class="token key atrule">registry</span><span class="token punctuation">:</span>
    <span class="token key atrule">localRegistry</span><span class="token punctuation">:</span>
      <span class="token key atrule">cert</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token key atrule">domain</span><span class="token punctuation">:</span> sea.hub
      <span class="token key atrule">ha</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">insecure</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">5000</span>
  <span class="token key atrule">ssh</span><span class="token punctuation">:</span>
    <span class="token key atrule">pk</span><span class="token punctuation">:</span> /root/.ssh/id_rsa
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token string">"22"</span>
    <span class="token key atrule">user</span><span class="token punctuation">:</span> root
<span class="token key atrule">status</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '29.md' style='float:left'>⬆️上一节🔗  </a><a href = '31.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


