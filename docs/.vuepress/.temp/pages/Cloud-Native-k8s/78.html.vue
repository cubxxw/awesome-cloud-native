<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第78节-kubernetes-的-kustomize-学习" tabindex="-1"><a class="header-anchor" href="#第78节-kubernetes-的-kustomize-学习" aria-hidden="true">#</a> 第78节 Kubernetes 的 kustomize 学习</h1>
<div><a href = '77.md' style='float:left'>⬆️上一节🔗  </a><a href = '79.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p><strong>关于 kustomize</strong></p>
<ul>
<li><a href="https://github.com/kubernetes-sigs/kustomize" target="_blank" rel="noopener noreferrer">github 地址<ExternalLinkIcon/></a></li>
<li><a href="https://kubectl.docs.kubernetes.io/zh/installation/" target="_blank" rel="noopener noreferrer">Get Started <ExternalLinkIcon/></a></li>
</ul>
<p>Kustomize 是一个专为 Kubernetes 设计的开源配置管理工具，它能帮助用户定制 Kubernetes 对象，并以声明式的方式管理这些对象，而无需修改原始的 <a href="https://devopscube.com/kustomize-tutorial/" target="_blank" rel="noopener noreferrer">YAML 文件1<ExternalLinkIcon/></a>。这意味着你可以保留应用和组件的基本设置，同时通过应用名为“补丁”的声明式 YAML 文档来覆盖默认设置，而不会<a href="https://www.densify.com/kubernetes-tools/kustomize" target="_blank" rel="noopener noreferrer">更改原始文件<ExternalLinkIcon/></a>。Kustomize 提供了一种声明式的方法，符合 Kubernetes 的哲学，并且能够以一种可重用、快速生成、易于调试和可伸缩的方式定制 Kubernetes 配置。</p>
<p><strong>Kustomize 的主要功能包括:</strong></p>
<ul>
<li><strong>声明式配置</strong>: 允许你以声明式的方式定义和管理 Kubernetes 对象，例如部署、Daemonsets、服务、ConfigMaps 等，为多个环境提供支持，而无需修改原始的 YAML 文件</li>
<li><strong>配置层叠</strong>: 通过利用层叠来保留应用和组件的基本设置，并通过覆盖声明式的 YAML 文档（称为补丁）来选择性地覆盖默认设置</li>
<li><strong>集成与独立使用</strong>: Kustomize 可以作为一个独立的工具使用，或者与 kubectl 结合使用。从 <code v-pre>Kubernetes 1.14</code> 版本开始，kubectl 也开始支持使用 kustomization 文件来管理 Kubernetes 对象</li>
</ul>
<p>Kustomize 提供了一种自定义 Kubernetes 资源配置的解决方案，该方案摆脱了模板和 DSL。</p>
<h2 id="版本关系-kubectl-集成" tabindex="-1"><a class="header-anchor" href="#版本关系-kubectl-集成" aria-hidden="true">#</a> 版本关系 &amp; kubectl 集成</h2>
<p>要查找kubectl最新版本中嵌入的kustomize版本，请运行 <code v-pre>kubectl version</code> ：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ kubectl version <span class="token parameter variable">--short</span> <span class="token parameter variable">--client</span>
Client Version: v1.26.0
Kustomize Version: v4.5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>kubectl v1.14中添加了v2.0.3的kustomize构建流。kubectl中的kustomize流在kubectl v1.21更新到v4.0.5之前一直冻结在v2.0.3。它将定期更新，这些更新将反映在Kubernetes发布说明中。</p>
<table>
<thead>
<tr>
<th>Kubectl version</th>
<th>Kustomize version</th>
</tr>
</thead>
<tbody>
<tr>
<td>&lt; v1.14</td>
<td>n/a</td>
</tr>
<tr>
<td>v1.14-v1.20</td>
<td>v2.0.3 v2.03</td>
</tr>
<tr>
<td>v1.21</td>
<td>v4.0.5 V4.05</td>
</tr>
<tr>
<td>v1.22</td>
<td>v4.2.0 v4.2 0</td>
</tr>
<tr>
<td>v1.23</td>
<td>v4.4.1 V4.1</td>
</tr>
<tr>
<td>v1.24</td>
<td>v4.5.4</td>
</tr>
<tr>
<td>v1.25</td>
<td>v4.5.7</td>
</tr>
<tr>
<td>v1.26</td>
<td>v4.5.7</td>
</tr>
<tr>
<td>v1.27</td>
<td>v5.0.1</td>
</tr>
</tbody>
</table>
<h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<p><strong>从源代码安装kustomize CLI，而不克隆存储库</strong></p>
<p>For <code v-pre>go version</code> ≥ <code v-pre>go1.17</code> 对于 <code v-pre>go version</code> ≥ <code v-pre>go1.17</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">GOBIN</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/ <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span>on go <span class="token function">install</span> sigs.k8s.io/kustomize/kustomize/v5@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p><strong>Note</strong>
除了直接使用 kustomize 命令外，kubernetes 自 v1.14 之后也可以使用 <code v-pre>kubectl kustomize</code>的方式执行 kustomize</p>
</blockquote>
<h2 id="kubectl-资源" tabindex="-1"><a class="header-anchor" href="#kubectl-资源" aria-hidden="true">#</a> kubectl 资源</h2>
<h3 id="annotation-注释" tabindex="-1"><a class="header-anchor" href="#annotation-注释" aria-hidden="true">#</a> annotation 注释</h3>
<p>更新一个或多个资源上的批注，Kubernetes 注解（annotations）为资源提供了附加元数据。与标签（labels）不同，注解不用于选择和查找资源。注解可以存储大量的数据，比如使用工具、库等为资源提供的长描述、声明检查的时间戳、联系信息或其他信息。</p>
<p><strong>是什么？</strong></p>
<p>Annotation（注解）是一种将非标识性元数据附加到对象的方式。客户端工具和库（如 <code v-pre>kubectl</code> 和 Helm）可以检索这些元数据。</p>
<p><strong>注解与标签（Labels）的区别</strong></p>
<p>虽然注解和标签都用于附加元数据，但它们在目的上有所不同：</p>
<ul>
<li><strong>标签</strong>: 标签是用于选择对象和查找满足某些条件的对象集合。</li>
<li><strong>注解</strong>: 注解主要用于存储辅助数据，以便通过工具和库进行检索。</li>
</ul>
<p><strong>使用 <code v-pre>kubectl</code> 添加和修改注解</strong></p>
<p>要使用 <code v-pre>kubectl</code> 为资源添加注解，您可以使用 <code v-pre>annotate</code> 命令。例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl annotate pods my-pod example.com/some-annotation<span class="token operator">=</span><span class="token string">"some value"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这会为名为 <code v-pre>my-pod</code> 的 Pod 添加一个名为 <code v-pre>example.com/some-annotation</code> 的注解，并将其值设置为 &quot;some value&quot;。</p>
<p><strong>更新和删除注解</strong></p>
<p>使用同样的 <code v-pre>annotate</code> 命令，您可以修改或删除注解。例如，要更改上面示例中的注解值，只需再次运行相同的命令，并为其提供一个新值。如果要删除注解，可以使用 <code v-pre>-</code> 符号：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl annotate pods my-pod example.com/some-annotation-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查询使用注解的资源</strong></p>
<p>尽管您不能直接使用 <code v-pre>kubectl</code> 查询特定的注解值，但您可以使用 <code v-pre>kubectl get</code> 命令和 <code v-pre>-o json</code> 或 <code v-pre>-o yaml</code> 输出格式选项查看资源的所有注解。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl get pods my-pod -o=jsonpath='{.metadata.annotations}'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="kustomize-使用" tabindex="-1"><a class="header-anchor" href="#kustomize-使用" aria-hidden="true">#</a> Kustomize 使用</h2>
<p>在一些包含YAML资源文件（部署、服务、映射等）的目录中，创建kustomization文件。</p>
<p>当然，Kustomize 和 Helm 可以一起使用，下面是一些使用它们的方法和功能:</p>
<ol>
<li><strong>HelmChartInflationGenerator</strong>: Kustomize 中内建了一个非常有用的功能叫做 &quot;HelmChartInflationGenerator&quot;，它可以让你在 Kustomize 清单中使用 Helm 图表。当运行 Kustomize 命令时，它会<a href="https://medium.com" target="_blank" rel="noopener noreferrer">扩展 Helm 图表以包括 Helm 生成的所有文件<ExternalLinkIcon/></a>。</li>
<li><strong>helmCharts 插件</strong>: 你可以直接在 Kustomize 中使用 HelmCharts 插件。例如，你可以将 <code v-pre>values-prod.yaml</code> 文件放在与 <code v-pre>kustomization.yaml</code> 文件相同的目录中，然后通过 Kustomize 覆盖 Helm 图表中的默认值。</li>
<li><strong>helm template 和 kubectl kustomize</strong>: 你可以首先使用 <code v-pre>helm template</code> 命令生成清单，并将其导出到一个文件中，然后运行 <code v-pre>kubectl kustomize</code> 命令来应用 Kustomize 修改。另一种方式是使用 <code v-pre>helm install</code> (或 <code v-pre>helm upgrade --install</code>) 命令，并指定一个自定义的后渲染器来运行 <code v-pre>kubectl kustomize</code>。</li>
<li><strong>覆盖 Helm 图表</strong>: Kustomize 可以覆盖现有的 Helm 图表，并使用 <code v-pre>HelmChartInflationGenerator</code> 覆盖一组自定义值。例如，可以使用 Kustomize 部署 Bitnami 的 NGINX Helm 图表，并覆盖默认值以提供自定义的 <code v-pre>nginx.conf</code> 和自定义的首页。</li>
</ol>
<p>这个文件应该声明这些资源，以及应用于它们的任何定制，例如。添加一个共同的 lables。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>base: kustomization + resources
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>File structure: 文件结构：</p>
<blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>~/someApp
├── deployment.yaml
├── kustomization.yaml
└── service.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此目录中的资源可能是其他人配置的分支。如果是这样的话，您可以很容易地从源材料中进行改基以获得改进，因为您并不直接修改资源。</p>
</blockquote>
<p>生成自定义的YAML：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kustomize build ~/someApp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>YAML可以直接应用于集群：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kustomize build ~/someApp <span class="token operator">|</span> kubectl apply <span class="token parameter variable">-f</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>和 helm 的区别：</strong></p>
<p>Kustomize 没有模板语法，只需要一个二进制命令就可以生成对应的 yaml 文件非常的轻量，而 helm 支持 GoTemplate，组件上也要多一些，并且 helm 通过 chart 包来进行发布相对来说还是要重量级一些。个人觉得 Kustomize 更适合做 gitops 而 helm 更合适做应用包的分发。</p>
<p>当然，我们在后面会详细的讨论和 helm 的区别。</p>
<h3 id="kustomization-yml" tabindex="-1"><a class="header-anchor" href="#kustomization-yml" aria-hidden="true">#</a> kustomization.yml</h3>
<p>一个常见的 <code v-pre>kustomization.yml</code> 如下所示，一般包含 <code v-pre>apiVsersion</code> 和 <code v-pre>kind</code> 两个固定字段</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kustomize.config.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Kustomization

<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> manager.yaml

<span class="token key atrule">configMapGenerator</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">files</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> controller_manager_config.yaml
  <span class="token key atrule">name</span><span class="token punctuation">:</span> manager<span class="token punctuation">-</span>config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>kustomize 提供了比较丰富的字段选择，除此之外还可以自定义插件，下面会大概列举一下每个字段的含义，当我们需要用到的时候知道有这么个能力，然后再去 <a href="https://kubectl.docs.kubernetes.io/zh/guides/" target="_blank" rel="noopener noreferrer">Kustomize 官方文档 <ExternalLinkIcon/></a>查找对应的 API 文档就行了</p>
<ul>
<li><code v-pre>resources</code> 表示 k8s 资源的位置，这个可以是一个文件，也可以指向一个文件夹，读取的时候会按照顺序读取，路径可以是相对路径也可以是绝对路径，如果是相对路径那么就是相对于 <code v-pre>kustomization.yml</code>的路径</li>
<li><code v-pre>crds</code> 和 <code v-pre>resources</code> 类似，只是 <code v-pre>crds</code> 是我们自定义的资源</li>
<li><code v-pre>namespace</code> 为所有资源添加 namespace</li>
<li><code v-pre>images</code> 修改镜像的名称、tag 或 image digest ，而无需使用 patches</li>
<li><code v-pre>replicas</code> 修改资源副本数</li>
<li><code v-pre>namePrefix</code> 为所有资源和引用的名称添加前缀</li>
<li><code v-pre>nameSuffix</code> 为所有资源和引用的名称添加后缀</li>
<li><code v-pre>patches</code> 在资源上添加或覆盖字段，Kustomization 使用 <code v-pre>patches</code> 字段来提供该功能。</li>
<li><code v-pre>patchesJson6902</code> 列表中的每个条目都应可以解析为 kubernetes 对象和将应用于该对象的 <a href="https://tools.ietf.org/html/rfc6902" target="_blank" rel="noopener noreferrer">JSON patch<ExternalLinkIcon/></a>。</li>
<li><code v-pre>patchesStrategicMerge</code> 使用 strategic merge patch 标准 Patch resources.</li>
<li><code v-pre>vars</code> 类似指定变量</li>
<li><code v-pre>commonAnnotations</code> 为所有资源加上 <code v-pre>annotations</code> 如果对应的 key 已经存在值，这个值将会被覆盖</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">commonAnnotations</span><span class="token punctuation">:</span>
  <span class="token key atrule">app.lailin.xyz/inject</span><span class="token punctuation">:</span> agent

<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> deploy.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>commonLabels</code> 为所有资源的加上 label 和 label selector <strong>注意：这个操作会比较危险</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kustomize.config.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Kustomization

<span class="token key atrule">commonLabels</span><span class="token punctuation">:</span>
  <span class="token key atrule">app</span><span class="token punctuation">:</span> bingo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>configMapGenerator</code> 可以生成 config map，列表中的每一条都会生成一个 configmap</li>
<li><code v-pre>secretGenerator</code> 用于生成 secret 资源</li>
<li><code v-pre>generatorOptions</code> 用于控制 <code v-pre>configMapGenerator</code> 和 <code v-pre>secretGenerator</code> 的行为</li>
</ul>
<h3 id="注释-transformer" tabindex="-1"><a class="header-anchor" href="#注释-transformer" aria-hidden="true">#</a> 注释 Transformer</h3>
<p>向所有资源添加注释(annotations)（非标识元数据）。和标签一样，它们也是键值对。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>commonAnnotations:
  oncallPager: 800-555-1212
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个列表中的每个条目都会创建一个ConfigMap资源（它是n个map的生成器）。</p>
<p>下面的示例创建了三个ConfigMap。一个是给定文件的名称和内容，一个是键/值作为数据，第三个是通过 <code v-pre>options</code> 为单个ConfigMap设置注释和标签。</p>
<p>每个MapGenerator项都接受一个参数 <code v-pre>behavior: [create|replace|merge]</code> 。这允许覆盖层修改或替换来自父级的现有CNOMAP。</p>
<p>此外，每个条目都有一个 <code v-pre>options</code> 字段，该字段具有与kustomization文件的 <code v-pre>generatorOptions</code> 字段相同的子字段。</p>
<p>该 <code v-pre>options</code> 字段允许向生成的实例添加标签和/或注释，或者单独禁用该实例的名称后缀散列。此处添加的标签和注释不会被与kustomization文件 <code v-pre>generatorOptions</code> 字段关联的全局选项覆盖。然而，由于布尔值的行为方式，如果全局 <code v-pre>generatorOptions</code> 字段指定 <code v-pre>disableNameSuffixHash: true</code> ，这将胜过任何本地覆盖它的尝试。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># These labels are added to all configmaps and secrets.</span>
<span class="token key atrule">generatorOptions</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">fruit</span><span class="token punctuation">:</span> apple

<span class="token key atrule">configMapGenerator</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>java<span class="token punctuation">-</span>server<span class="token punctuation">-</span>props
  <span class="token key atrule">behavior</span><span class="token punctuation">:</span> merge
  <span class="token key atrule">files</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> application.properties
  <span class="token punctuation">-</span> more.properties
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>java<span class="token punctuation">-</span>server<span class="token punctuation">-</span>env<span class="token punctuation">-</span>vars
  <span class="token key atrule">literals</span><span class="token punctuation">:</span> 
  <span class="token punctuation">-</span> JAVA_HOME=/opt/java/jdk
  <span class="token punctuation">-</span> JAVA_TOOL_OPTIONS=<span class="token punctuation">-</span>agentlib<span class="token punctuation">:</span>hprof
  <span class="token key atrule">options</span><span class="token punctuation">:</span>
    <span class="token key atrule">disableNameSuffixHash</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">labels</span><span class="token punctuation">:</span>
      <span class="token key atrule">pet</span><span class="token punctuation">:</span> dog
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> dashboards
  <span class="token key atrule">files</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> mydashboard.json
  <span class="token key atrule">options</span><span class="token punctuation">:</span>
    <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
      <span class="token key atrule">dashboard</span><span class="token punctuation">:</span> <span class="token string">"1"</span>
    <span class="token key atrule">labels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app.kubernetes.io/name</span><span class="token punctuation">:</span> <span class="token string">"app1"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也可以定义一个键来设置不同于文件名的名称。</p>
<p>下面的示例创建了一个ConfigMap，文件名为 <code v-pre>myFileName.ini</code> ，而创建ConfigMap的实际文件名为 <code v-pre>whatever.ini</code> 。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">configMapGenerator</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> app<span class="token punctuation">-</span>whatever
  <span class="token key atrule">files</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> myFileName.ini=whatever.ini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="imagetagtransformer" tabindex="-1"><a class="header-anchor" href="#imagetagtransformer" aria-hidden="true">#</a> ImageTagTransformer</h3>
<p>图像修改图像的名称、标签和/或摘要，而不创建补丁。例如，给定这个kubernetes Deployment片段：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">containers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> mypostgresdb
  <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span><span class="token number">8</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginxapp
  <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx<span class="token punctuation">:</span>1.7.9
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp
  <span class="token key atrule">image</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>demo<span class="token punctuation">-</span>app<span class="token punctuation">:</span>latest
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> alpine<span class="token punctuation">-</span>app
  <span class="token key atrule">image</span><span class="token punctuation">:</span> alpine<span class="token punctuation">:</span><span class="token number">3.7</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过以下方式更改 <code v-pre>image</code> ：</p>
<ul>
<li><code v-pre>postgres:8</code> 到 <code v-pre>my-registry/my-postgres:v1</code> ，</li>
<li>nginx标签 <code v-pre>1.7.9</code> 到 <code v-pre>1.8.0</code> ，</li>
<li>映像名称 <code v-pre>my-demo-app</code> 到 <code v-pre>my-app</code> ，</li>
<li>alpine的标签 <code v-pre>3.7</code> 到摘要值</li>
</ul>
<p>所有这些都具有以下kustomization：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">images</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> postgres
  <span class="token key atrule">newName</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>registry/my<span class="token punctuation">-</span>postgres
  <span class="token key atrule">newTag</span><span class="token punctuation">:</span> v1
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">newTag</span><span class="token punctuation">:</span> 1.8.0
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>demo<span class="token punctuation">-</span>app
  <span class="token key atrule">newName</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>app
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> alpine
  <span class="token key atrule">digest</span><span class="token punctuation">:</span> sha256<span class="token punctuation">:</span>24a0c4b4a4c0eb97a1aabb8e29f18e917d05abfe1b7a7c07857230879ce7d3d3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="注释transformer" tabindex="-1"><a class="header-anchor" href="#注释transformer" aria-hidden="true">#</a> <em>注释Transformer</em></h3>
<p>向所有资源添加注释（非标识元数据）。和标签一样，它们也是键值对。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>commonAnnotations:
  oncallPager: <span class="token number">800</span>-555-1212
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过-transformers-字段使用" tabindex="-1"><a class="header-anchor" href="#通过-transformers-字段使用" aria-hidden="true">#</a> 通过 <code v-pre>transformers</code> 字段使用</h3>
<p>在 Kustomize 中，<code v-pre>transformers</code> 字段允许您指定一系列转换器，这些转换器可以对原始的资源清单进行修改和调整。</p>
<p>要在 Kustomize 中使用 <code v-pre>transformers</code>，您需要在 <code v-pre>kustomization.yaml</code> 文件中指定它，并列出您要使用的转换器配置文件的路径。</p>
<p>例如：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kustomize.config.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Kustomization

<span class="token key atrule">resources</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> deployment.yaml

<span class="token key atrule">transformers</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> transformers/add<span class="token punctuation">-</span>labels.yaml
<span class="token punctuation">-</span> transformers/change<span class="token punctuation">-</span>image<span class="token punctuation">-</span>tag.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的示例中，<code v-pre>add-labels.yaml</code> 和 <code v-pre>change-image-tag.yaml</code> 将会作为转换器应用，依次修改 <code v-pre>deployment.yaml</code> 中的资源。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> builtin
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ImageTagTransformer
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> not<span class="token punctuation">-</span>important<span class="token punctuation">-</span>to<span class="token punctuation">-</span>example
<span class="token key atrule">imageTag</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
  <span class="token key atrule">newTag</span><span class="token punctuation">:</span> v2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="labeltransformer" tabindex="-1"><a class="header-anchor" href="#labeltransformer" aria-hidden="true">#</a> LabelTransformer</h3>
<p>为所有资源和选择器添加标签</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">commonLabels</span><span class="token punctuation">:</span>
  <span class="token key atrule">someName</span><span class="token punctuation">:</span> someValue
  <span class="token key atrule">owner</span><span class="token punctuation">:</span> alice
  <span class="token key atrule">app</span><span class="token punctuation">:</span> bingo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="namespacetransformer" tabindex="-1"><a class="header-anchor" href="#namespacetransformer" aria-hidden="true">#</a> NamespaceTransformer</h3>
<p>将命名空间添加到所有资源</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">namespace</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>namespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="对比-helm-的使用" tabindex="-1"><a class="header-anchor" href="#对比-helm-的使用" aria-hidden="true">#</a> 对比 helm 的使用</h2>
<p>Helm 使用的是模板，一个 Helm Chart 包中包含了很多模板和值文件，当被渲染时模板中的变量会使用值文件中对应的值替换。而 Kustomize 使用的是一种无模板的方式，它对 YAML 文件进行修补和合并操作，此外 Kustomize 也已经被原生内置到 kubectl 中了。这两个工具在 Kubernetes 的生态系统中都被广泛使用，<strong>而且这两个工具也可以一起结合使用。</strong></p>
<p>没错，对于 OpenIM 来说，光光使用 helm 其实也很难满足 OpenIM 的部署需求了，我们更倾向于来使用 Kustomize 。</p>
<p>我们知道很多项目其实都会为应用程序提供 Helm Chart 包，而模板变量的值通过值文件来控制。一个长期存在的问题就是我们应该如何定制上游的 Helm Chart 包，例如从 Helm Chart 包中添加或者一个 Kubernetes 资源清单，如果是通用的变更，最好的选择当然是直接贡献给上游仓库，但是如果是自定义的变更呢？</p>
<p>通常我们可以自己 fork 上游的 Helm Chart 仓库，然后在自己的 repo 中对 Chart 包进行额外的变动。但是这样做，显然会带来额外的负担，特别是当 Chart 包只需要一点小改动的时候。</p>
<p>这个时候我们可以使用 Kustomize 来定制现有的 Helm Chart，而不需要执行 fork 操作。</p>
<h3 id="kustomize-插件学习" tabindex="-1"><a class="header-anchor" href="#kustomize-插件学习" aria-hidden="true">#</a> Kustomize 插件学习</h3>
<p>在Kustomize的GitHub仓库中，有一些插件可以用来扩展其功能。以下是对这些插件的简要介绍：</p>
<ol>
<li><strong>Exec插件</strong>：此插件可以运行可执行脚本作为一个 <a href="https://github.com/badjware/kustomize-plugins" target="_blank" rel="noopener noreferrer">插件<ExternalLinkIcon/></a>。</li>
<li><strong>RemoteResources生成器</strong>：此插件可以从远程位置下载 <a href="https://github.com/badjware/kustomize-plugins" target="_blank" rel="noopener noreferrer">Kubernetes资源<ExternalLinkIcon/></a>。</li>
<li><strong>PlaceholderTransformer转换器</strong>：此插件可以在Kubernetes资源中执行任意的键/值替换。</li>
<li><strong>SSMParameterPlaceholderTransformer转换器</strong>：此插件可以在Kubernetes资源中执行任意的键/值替换，并从AWS系统管理器参数中获取值。</li>
<li><strong>EnvironmentPlaceholderTransformer转换器</strong>：此插件可以在Kubernetes资源中执行任意的键/值替换，并从环境变量中获取值。</li>
</ol>
<p>其他相关信息包括，用户可以创建转换器或生成器插件，以实现新的行为，这通常意味着需要编写代码，例如Go插件、Go二进制文件、C++ <a href="https://github.com/kubernetes-sigs/kustomize/blob/master/examples/configureBuiltinPlugin.md" target="_blank" rel="noopener noreferrer">二进制文件或Bash脚本等<ExternalLinkIcon/></a>。在2020年3月时，Kustomize的外部插件还处于alpha功能阶段，所以需要使用<code v-pre>--enable_alpha_plugins</code>标志来调用构建。</p>
<p>同时，还有一些其他的GitHub仓库也提供了Kustomize插件的集合，例如badjware/kustomize-plugins仓库，sapcc/kustomize-plugins仓库和pollination/kustomize-plugins仓库，其中一些插件可以用来生成Kubernetes secrets，从GCP的密封秘密中生成等。</p>
<p>这些插件通过编写代码，使得用户可以扩展Kustomize的功能，以满足特定的需求，例如通过执行任意的键/值替换来修改Kubernetes资源。</p>
<h3 id="chartinflator" tabindex="-1"><a class="header-anchor" href="#chartinflator" aria-hidden="true">#</a> ChartInflator</h3>
<p>Kustomize 提供了一个很好的插件生态系统，允许扩展 Kustomize 的功能。其中就有一个名为 <strong>ChartInflator</strong> 的非内置插件，它允许 Kustomize 来渲染 Helm Charts，并执行任何需要的变更。</p>
<p><strong>首先先安装 <code v-pre>ChartInflator</code> 插件：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>$ chartinflator_dir="./kustomize/plugin/kustomize.config.k8s.io/v1/chartinflator"

<span class="token comment"># 创建插件目录</span>
$ mkdir <span class="token punctuation">-</span>p $<span class="token punctuation">{</span>chartinflator_dir<span class="token punctuation">}</span>

<span class="token comment"># 下载插件</span>
$ curl <span class="token punctuation">-</span>L https<span class="token punctuation">:</span>//raw.githubusercontent.com/kubernetes<span class="token punctuation">-</span>sigs/kustomize/kustomize/v3.8.2/plugin/someteam.example.com/v1/chartinflator/ChartInflator <span class="token punctuation">></span> $<span class="token punctuation">{</span>chartinflator_dir<span class="token punctuation">}</span>/ChartInflator

<span class="token comment"># 设置插件执行权限</span>
$ chmod u+x $<span class="token punctuation">{</span>chartinflator_dir<span class="token punctuation">}</span>/ChartInflator
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如我们要定制 <strong>Vault Helm Chart</strong> 包，接下来创建 ChartInflator 资源清单和 Helm 的 <code v-pre>values.yaml</code> 值文件：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># ChartInflator 资源清单</span>
$ cat &lt;&lt; EOF <span class="token punctuation">></span><span class="token punctuation">></span> chartinflator<span class="token punctuation">-</span>vault.yaml
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kustomize.config.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> ChartInflator
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> vault<span class="token punctuation">-</span>official<span class="token punctuation">-</span>helm<span class="token punctuation">-</span>chart
<span class="token key atrule">chartRepo</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//helm.releases.hashicorp.com  
<span class="token key atrule">chartName</span><span class="token punctuation">:</span> vault
<span class="token key atrule">chartRelease</span><span class="token punctuation">:</span> hashicorp
<span class="token key atrule">chartVersion</span><span class="token punctuation">:</span> 0.7.0
<span class="token key atrule">releaseName</span><span class="token punctuation">:</span> vault
<span class="token key atrule">values</span><span class="token punctuation">:</span> values.yaml
EOF

<span class="token comment"># 创建 values 值文件</span>
$ helm repo add hashicorp https<span class="token punctuation">:</span>//helm.releases.hashicorp.com 
$ helm show values <span class="token punctuation">-</span><span class="token punctuation">-</span>version 0.7.0 hashicorp/vault <span class="token punctuation">></span> values.yaml

<span class="token comment"># 创建 Kustomize 文件</span>
$ kustomize init
$ cat &lt;&lt; EOF <span class="token punctuation">></span><span class="token punctuation">></span> kustomization.yaml
<span class="token key atrule">generators</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> chartinflator<span class="token punctuation">-</span>vault.yaml
EOF

<span class="token comment"># 为所有资源添加一个 label 标签</span>
$ kustomize edit add label env<span class="token punctuation">:</span>dev

<span class="token comment"># 最后生成的 kustomize 文件如下所示：</span>
$ cat kustomization.yaml
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> kustomize.config.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Kustomization
<span class="token key atrule">generators</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> chartinflator<span class="token punctuation">-</span>vault.yaml
<span class="token key atrule">commonLabels</span><span class="token punctuation">:</span>
  <span class="token key atrule">env</span><span class="token punctuation">:</span> dev

<span class="token comment"># 整个资源清单目录结构</span>
$ tree .
.
├── chartinflator<span class="token punctuation">-</span>vault.yaml
├── kustomization.yaml
├── kustomize
│   └── plugin
│       └── kustomize.config.k8s.io
│           └── v1
│               └── chartinflator
│                   └── ChartInflator
└── values.yaml

5 directories<span class="token punctuation">,</span> 4 files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在就可以来渲染 Chart 模板了，执行如下所示的命令即可：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>$ kustomize build <span class="token operator">--</span>enable_alpha_plugins <span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>正常渲染完成后我们可以看到所有的资源上都被添加了一个 <code v-pre>env: dev</code> 的标签，这是实时完成的，不需要维护任何额外的文件的。</p>
<h3 id="用单个清单文件定制" tabindex="-1"><a class="header-anchor" href="#用单个清单文件定制" aria-hidden="true">#</a> 用单个清单文件定制</h3>
<p>另一种使用 Kustomize 定制 Chart 的方法是使用 <code v-pre>helm template</code> 命令来生成一个单一的资源清单，这种方式可以对 Chart 进行更多的控制，但它需要更多的工作来出来处理更新该生成文件的版本控制。</p>
<p>通常我们可以使用 Make 来进行辅助处理，如下示例所示：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code># Makefile
<span class="token constant">CHART_REPO_NAME</span>   <span class="token operator">:</span><span class="token operator">=</span> hashicorp
<span class="token constant">CHART_REPO_URL</span>    <span class="token operator">:</span><span class="token operator">=</span> https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>helm<span class="token punctuation">.</span>releases<span class="token punctuation">.</span>hashicorp<span class="token punctuation">.</span>com
<span class="token constant">CHART_NAME</span>        <span class="token operator">:</span><span class="token operator">=</span> vault
<span class="token constant">CHART_VERSION</span>     <span class="token operator">:</span><span class="token operator">=</span> <span class="token number">0.7</span><span class="token number">.0</span>
<span class="token constant">CHART_VALUES_FILE</span> <span class="token operator">:</span><span class="token operator">=</span> values<span class="token punctuation">.</span>yaml

add<span class="token operator">-</span>chart<span class="token operator">-</span>repo<span class="token operator">:</span>
    helm repo add $<span class="token punctuation">{</span><span class="token constant">CHART_REPO_NAME</span><span class="token punctuation">}</span> $<span class="token punctuation">{</span><span class="token constant">CHART_REPO_URL</span><span class="token punctuation">}</span>
    helm repo update

generate<span class="token operator">-</span>chart<span class="token operator">-</span>manifest<span class="token operator">:</span>
    helm template $<span class="token punctuation">{</span><span class="token constant">CHART_NAME</span><span class="token punctuation">}</span> $<span class="token punctuation">{</span><span class="token constant">CHART_REPO_NAME</span><span class="token punctuation">}</span><span class="token operator">/</span>$<span class="token punctuation">{</span><span class="token constant">CHART_NAME</span><span class="token punctuation">}</span> \
        <span class="token operator">--</span>version $<span class="token punctuation">{</span><span class="token constant">CHART_VERSION</span><span class="token punctuation">}</span> \
        <span class="token operator">--</span>values $<span class="token punctuation">{</span><span class="token constant">CHART_VALUES_FILE</span><span class="token punctuation">}</span> <span class="token operator">></span> $<span class="token punctuation">{</span><span class="token constant">CHART_NAME</span><span class="token punctuation">}</span><span class="token punctuation">.</span>yaml

get<span class="token operator">-</span>chart<span class="token operator">-</span>values<span class="token operator">:</span>
    @helm show values <span class="token operator">--</span>version $<span class="token punctuation">{</span><span class="token constant">CHART_VERSION</span><span class="token punctuation">}</span> \
    $<span class="token punctuation">{</span><span class="token constant">CHART_REPO_NAME</span><span class="token punctuation">}</span><span class="token operator">/</span>$<span class="token punctuation">{</span><span class="token constant">CHART_NAME</span><span class="token punctuation">}</span>

generate<span class="token operator">-</span>chart<span class="token operator">-</span>values<span class="token operator">:</span>
    @echo <span class="token string">"Create values file: ${CHART_VALUES_FILE}"</span>
    @<span class="token function">$</span><span class="token punctuation">(</span><span class="token constant">MAKE</span><span class="token punctuation">)</span> <span class="token operator">-</span>s get<span class="token operator">-</span>chart<span class="token operator">-</span>values <span class="token operator">></span> $<span class="token punctuation">{</span><span class="token constant">CHART_VALUES_FILE</span><span class="token punctuation">}</span>

diff<span class="token operator">-</span>chart<span class="token operator">-</span>values<span class="token operator">:</span>
    @echo <span class="token string">"Diff: Local &lt;==> Remote"</span>
    @<span class="token function">$</span><span class="token punctuation">(</span><span class="token constant">MAKE</span><span class="token punctuation">)</span> <span class="token operator">-</span>s get<span class="token operator">-</span>chart<span class="token operator">-</span>values <span class="token operator">|</span> \
    diff <span class="token operator">--</span>suppress<span class="token operator">-</span>common<span class="token operator">-</span>lines <span class="token operator">--</span>side<span class="token operator">-</span>by<span class="token operator">-</span>side $<span class="token punctuation">{</span><span class="token constant">CHART_VALUES_FILE</span><span class="token punctuation">}</span> <span class="token operator">-</span> <span class="token operator">||</span> \
    exit <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要定制上游的 Vault Helm Chart，我们可以做如下操作：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code># 初始化 chart 文件
$ make generate<span class="token operator">-</span>chart<span class="token operator">-</span>values generate<span class="token operator">-</span>chart<span class="token operator">-</span>manifest 

# 创建 Kustomize 文件并添加一个 label 标签
$ kustomize init
$ kustomize edit add resource vault<span class="token punctuation">.</span>yaml
$ kustomize edit add label env<span class="token operator">:</span>dev

# 最后生成的文件结构如下所示
$ tree <span class="token punctuation">.</span>
<span class="token punctuation">.</span>
├── kustomization<span class="token punctuation">.</span>yaml
├── makefile
├── values<span class="token punctuation">.</span>yaml
└── vault<span class="token punctuation">.</span>yaml

<span class="token number">0</span> directories<span class="token punctuation">,</span> <span class="token number">4</span> files

# kustomize 文件内容如下所示
$ cat kustomization<span class="token punctuation">.</span>yaml
<span class="token literal-property property">apiVersion</span><span class="token operator">:</span> kustomize<span class="token punctuation">.</span>config<span class="token punctuation">.</span>k8s<span class="token punctuation">.</span>io<span class="token operator">/</span>v1beta1
<span class="token literal-property property">kind</span><span class="token operator">:</span> Kustomization
<span class="token literal-property property">resources</span><span class="token operator">:</span>
<span class="token operator">-</span> vault<span class="token punctuation">.</span>yaml
<span class="token literal-property property">commonLabels</span><span class="token operator">:</span>
  <span class="token literal-property property">env</span><span class="token operator">:</span> dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后同样用 <code v-pre>kustomize build</code> 命令来渲染：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>$ kustomize build <span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在渲染的结果中同样可以看到所有的资源里面都被添加进了一个 <code v-pre>env: dev</code> 的标签。</p>
<p>这种方法，需要以某种方式运行 make 命令来生成更新的一体化资源清单文件，另外，要将更新过程与你的 GitOps 工作流整合起来可能有点麻烦。</p>
<h3 id="使用-post-rendering-定制" tabindex="-1"><a class="header-anchor" href="#使用-post-rendering-定制" aria-hidden="true">#</a> 使用 Post Rendering 定制</h3>
<p><strong>Post Rendering</strong> 是 Helm 3 带来的一个新功能，在前面的2种方法中，Kustomize 是用来处理生成图表清单的主要工具，但在这里，Kustomize 是作为 Helm 的辅助工具而存在的。</p>
<p>下面我们来看下如何使用这种方法来进行定制：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code># 创建 Kustomize 文件并添加一个 label 标签
$ kustomize init
$ kustomize edit add label env<span class="token operator">:</span>dev

# 创建一个包装 Kustomize 的脚本文件，后面在 Helm 中会使用到
$ cat <span class="token operator">&lt;&lt;</span> <span class="token constant">EOF</span> <span class="token operator">></span> kustomize<span class="token operator">-</span>wrapper<span class="token punctuation">.</span>sh
#<span class="token operator">!</span><span class="token operator">/</span>bin<span class="token operator">/</span>bash
cat <span class="token operator">&lt;</span><span class="token operator">&amp;</span><span class="token number">0</span> <span class="token operator">></span> chart<span class="token punctuation">.</span>yaml
kustomize edit add resource chart<span class="token punctuation">.</span>yaml
kustomize build <span class="token punctuation">.</span> <span class="token operator">&amp;&amp;</span> rm chart<span class="token punctuation">.</span>yaml
<span class="token constant">EOF</span>
$ chmod <span class="token operator">+</span>x kustomize<span class="token operator">-</span>wrapper<span class="token punctuation">.</span>sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们可以直接使用 Helm 渲染或者安装 Chart：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>$ helm repo add hashicorp https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>helm<span class="token punctuation">.</span>releases<span class="token punctuation">.</span>hashicorp<span class="token punctuation">.</span>com 
$ helm template vault hashicorp<span class="token operator">/</span>vault <span class="token operator">--</span>post<span class="token operator">-</span>renderer <span class="token punctuation">.</span><span class="token operator">/</span>kustomize<span class="token operator">-</span>wrapper<span class="token punctuation">.</span>sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>正常情况下我们也可以看到最后渲染出来的每一个资源文件中都被添加进了一个 <code v-pre>env:dev</code> 的标签。</p>
<p>这种方法就是需要管理一个额外的脚本，其余的和第一种方式基本上差不多，只是不使用 Kustomize 的插件，而是直接使用 Helm 本身的功能来渲染上游的 Chart 包。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '77.md' style='float:left'>⬆️上一节🔗  </a><a href = '79.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


