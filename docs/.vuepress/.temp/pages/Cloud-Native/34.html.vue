<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第34节-localregistry-save-kubernetes-secret" tabindex="-1"><a class="header-anchor" href="#第34节-localregistry-save-kubernetes-secret" aria-hidden="true">#</a> 第34节 localregistry save Kubernetes secret</h1>
<div><a href = '33.md' style='float:left'>⬆️上一节🔗  </a><a href = '35.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="kubernetes-的-marshal" tabindex="-1"><a class="header-anchor" href="#kubernetes-的-marshal" aria-hidden="true">#</a> Kubernetes 的 Marshal</h2>
<p>在 Kubernetes 中，Marshal 是一种将数据编码为 YAML 或 JSON 格式的方法。在 <a href="http://sigs.k8s.io/yaml" target="_blank" rel="noopener noreferrer">sigs.k8s.io/yaml<ExternalLinkIcon/></a> 中，提供了一个 YAML 库，用于将 Go 对象转换为 YAML。该库支持 Kubernetes 和其他使用 YAML 的项目。</p>
<p><a href="http://sigs.k8s.io/yaml" target="_blank" rel="noopener noreferrer">sigs.k8s.io/yaml<ExternalLinkIcon/></a> 库提供了一个名为 yaml.Marshal 的函数，该函数接受一个 Go 对象并返回一个字节数组和一个错误。字节数组包含编码后的 YAML 数据，错误用于指示是否出现了任何问题。这使得在 Kubernetes 中将 Go 对象转换为 YAML 数据变得非常简单。</p>
<p>除了 yaml.Marshal 函数之外，<a href="http://sigs.k8s.io/yaml" target="_blank" rel="noopener noreferrer">sigs.k8s.io/yaml<ExternalLinkIcon/></a> 还提供了其他一些函数，用于解码 YAML 数据并将其转换回 Go 对象。这些函数包括 yaml.Unmarshal 和 yaml.NewDecoder。它们与 yaml.Marshal 函数一起使用，可以让你轻松地在 Kubernetes 中编码和解码 YAML 数据。</p>
<p>总之，<a href="http://sigs.k8s.io/yaml" target="_blank" rel="noopener noreferrer">sigs.k8s.io/yaml<ExternalLinkIcon/></a> 库为 Kubernetes 提供了一种强大的方式来处理 YAML 数据。通过使用 yaml.Marshal 和其他相关函数，可以轻松地将 Go 对象编码为 YAML，然后将其保存到 Kubernetes 中。这使得在 Kubernetes 中处理 YAML 数据变得非常容易，而且非常方便。</p>
<h3 id="yaml-builder" tabindex="-1"><a class="header-anchor" href="#yaml-builder" aria-hidden="true">#</a> yaml.Builder</h3>
<p><code v-pre>yaml.Builder</code> 是 <code v-pre>sigs.k8s.io/yaml</code> 库中的一个类型，它允许将 Go 对象编码为 YAML 格式。它使用 <code v-pre>Encoder</code> 属性来指定序列化器，该序列化器将 Go 对象转换为 YAML 格式。它还提供了 <code v-pre>Encode</code> 方法，该方法接受一个 Go 对象并返回一个字节数组和一个错误，字节数组包含编码后的 YAML 数据，错误用于指示是否出现了任何问题。</p>
<p>在 Kubernetes 中，<code v-pre>yaml.Builder</code> 可以与 <code v-pre>json.NewSerializerWithOptions</code> 和 <code v-pre>runtime.NewScheme</code> 一起使用，以将 Kubernetes 对象编码为 YAML 格式。例如，在上面的示例代码中，我们使用 <code v-pre>yaml.Builder</code> 将 <code v-pre>Pod</code> 对象编码为 YAML 格式。</p>
<h3 id="k8s-io-apimachinery-pkg-runtime-serializer-json" tabindex="-1"><a class="header-anchor" href="#k8s-io-apimachinery-pkg-runtime-serializer-json" aria-hidden="true">#</a> <a href="http://k8s.io/apimachinery/pkg/runtime/serializer/json" target="_blank" rel="noopener noreferrer">k8s.io/apimachinery/pkg/runtime/serializer/json<ExternalLinkIcon/></a></h3>
<p><code v-pre>k8s.io/apimachinery/pkg/runtime/serializer/json</code> 是 Kubernetes 的一个 Go 代码包，用于将 Kubernetes 对象序列化为 JSON 格式。它使用 <code v-pre>runtime.ObjectConvertor</code> 接口来实现序列化和反序列化。该代码包还提供了一些选项，例如 <code v-pre>json.SerializerOptions</code>，使用户可以控制序列化的行为，例如选择是否使用 YAML 或 JSON 格式。</p>
<p>以下是一个简单的示例，展示了如何使用 <code v-pre>json.NewSerializerWithOptions</code> 函数将一个 <code v-pre>Pod</code> 对象编码为 JSON 格式：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os"</span>

	<span class="token string">"k8s.io/apimachinery/pkg/apis/meta/v1"</span>
	<span class="token string">"k8s.io/apimachinery/pkg/runtime"</span>
	<span class="token string">"k8s.io/apimachinery/pkg/runtime/schema"</span>
	<span class="token string">"k8s.io/apimachinery/pkg/runtime/serializer/json"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Pod <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	v1<span class="token punctuation">.</span>TypeMeta   <span class="token string">`json:",inline"`</span>
	v1<span class="token punctuation">.</span>ObjectMeta <span class="token string">`json:"metadata"`</span>
	Spec          v1<span class="token punctuation">.</span>PodSpec <span class="token string">`json:"spec"`</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	pod <span class="token operator">:=</span> <span class="token operator">&amp;</span>Pod<span class="token punctuation">{</span>
		TypeMeta<span class="token punctuation">:</span> v1<span class="token punctuation">.</span>TypeMeta<span class="token punctuation">{</span>
			APIVersion<span class="token punctuation">:</span> <span class="token string">"v1"</span><span class="token punctuation">,</span>
			Kind<span class="token punctuation">:</span>       <span class="token string">"Pod"</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		ObjectMeta<span class="token punctuation">:</span> v1<span class="token punctuation">.</span>ObjectMeta<span class="token punctuation">{</span>
			Name<span class="token punctuation">:</span>      <span class="token string">"example-pod"</span><span class="token punctuation">,</span>
			Namespace<span class="token punctuation">:</span> <span class="token string">"default"</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		Spec<span class="token punctuation">:</span> v1<span class="token punctuation">.</span>PodSpec<span class="token punctuation">{</span>
			Containers<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>v1<span class="token punctuation">.</span>Container<span class="token punctuation">{</span>
				<span class="token punctuation">{</span>
					Name<span class="token punctuation">:</span>  <span class="token string">"example-container"</span><span class="token punctuation">,</span>
					Image<span class="token punctuation">:</span> <span class="token string">"nginx"</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>

	s <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">NewScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	s<span class="token punctuation">.</span><span class="token function">AddKnownTypes</span><span class="token punctuation">(</span>schema<span class="token punctuation">.</span>GroupVersion<span class="token punctuation">{</span>Group<span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span> Version<span class="token punctuation">:</span> <span class="token string">"v1"</span><span class="token punctuation">}</span><span class="token punctuation">,</span> pod<span class="token punctuation">)</span>

	jsonSerializer <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">NewSerializerWithOptions</span><span class="token punctuation">(</span>json<span class="token punctuation">.</span>DefaultMetaFactory<span class="token punctuation">,</span> s<span class="token punctuation">,</span> s<span class="token punctuation">,</span> json<span class="token punctuation">.</span>SerializerOptions<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	err <span class="token operator">:=</span> jsonSerializer<span class="token punctuation">.</span><span class="token function">Encode</span><span class="token punctuation">(</span>pod<span class="token punctuation">,</span> os<span class="token punctuation">.</span>Stdout<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stderr<span class="token punctuation">,</span> <span class="token string">"Error: %v\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此示例将输出以下 JSON 数据：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{
  "apiVersion": "v1",
  "kind": "Pod",
  "metadata": {
    "name": "example-pod",
    "namespace": "default"
  },
  "spec": {
    "containers": [
      {
        "name": "example-container",
        "image": "nginx"
      }
    ]
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个非常简单的 <code v-pre>Pod</code> 对象，它只包含一个容器。你可以根据需要通过修改此示例来创建更复杂的 Kubernetes 对象。</p>
<p>总之，<code v-pre>k8s.io/apimachinery/pkg/runtime/serializer/json</code> 代码包为 Kubernetes 提供了一种强大的方式来处理 JSON 数据。通过使用 <code v-pre>json.NewSerializerWithOptions</code> 函数，可以轻松地将 Kubernetes 对象编码为 JSON，然后将其保存到 Kubernetes 中。这使得在 Kubernetes 中处理 JSON 数据变得非常容易，而且非常方便。</p>
<h2 id="yaml-unmarshal" tabindex="-1"><a class="header-anchor" href="#yaml-unmarshal" aria-hidden="true">#</a> <code v-pre>yaml.Unmarshal</code></h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>package main

import (
	"fmt"

	"k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/yaml"
)

type Pod struct {
	v1.TypeMeta   `json:",inline" yaml:",inline"`
	v1.ObjectMeta `json:"metadata" yaml:"metadata"`
	Spec          v1.PodSpec `json:"spec" yaml:"spec"`
}

func main() {
	data := []byte(`
apiVersion: v1
kind: Pod
metadata:
  name: example-pod
spec:
  containers:
  - name: example-container
    image: nginx
`)

	pod := &amp;Pod{}
	err := yaml.Unmarshal(data, pod)
	if err != nil {
		fmt.Printf("error: %v\\n", err)
		return
	}

	fmt.Printf("pod name: %s\\n", pod.ObjectMeta.Name)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此示例中，我们在 <code v-pre>Pod</code> 结构体中定义了 <code v-pre>v1.TypeMeta</code> 和 <code v-pre>v1.ObjectMeta</code> 字段，这些字段由 <code v-pre>json</code> 和 <code v-pre>yaml</code> 标记注释。然后我们在 <code v-pre>main</code> 函数中定义了一个 YAML 字符串，它包含一个简单的 <code v-pre>Pod</code> 对象的定义。我们使用 <code v-pre>yaml.Unmarshal</code> 函数将 YAML 字符串解码为 <code v-pre>Pod</code> 对象。然后我们打印了该对象的名称。</p>
<p><code v-pre>yaml.Unmarshal</code> 函数接受两个参数：要解码的字节数组和一个指向要解码的对象的指针。在此示例中，我们将 YAML 字符串解码为 <code v-pre>Pod</code> 对象。如果解码成功，<code v-pre>Unmarshal</code> 函数将填充指向对象的指针，并返回 <code v-pre>nil</code>。如果解码失败，<code v-pre>Unmarshal</code> 函数将返回一个 <code v-pre>error</code>。</p>
<p>总之，<code v-pre>yaml.Unmarshal</code> 函数是将 YAML 数据解码为 Go 对象的一种方法。它是 <code v-pre>sigs.k8s.io/yaml</code> 库提供的一系列函数之一，这些函数用于编码和解码 Kubernetes 对象和其他使用 YAML 的项目。</p>
<h2 id="yaml-newdecoder" tabindex="-1"><a class="header-anchor" href="#yaml-newdecoder" aria-hidden="true">#</a> <code v-pre>yaml.NewDecoder</code></h2>
<p><code v-pre>yaml.NewDecoder</code>函数是<code v-pre>sigs.k8s.io/yaml</code>库中的一个函数，它允许将YAML数据解码为Go对象。与<code v-pre>yaml.Marshal</code>函数类似，<code v-pre>yaml.NewDecoder</code>函数需要一个接受字节数组的参数。此外，它还需要一个用于将YAML数据解码为Go对象的接收器。</p>
<p>在Kubernetes中，<code v-pre>yaml.NewDecoder</code>可以与<code v-pre>scheme.Codecs.UniversalDeserializer()</code>一起使用，以将Kubernetes对象解码为Go对象。例如，在上面的示例中，我们使用<code v-pre>yaml.NewDecoder</code>将YAML格式的<code v-pre>Pod</code>对象解码为Go对象。</p>
<p>下面是一个使用 <code v-pre>yaml.NewDecoder</code> 将 YAML 格式的 <code v-pre>Pod</code> 对象解码为 Go 对象的示例代码：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>package main

import (
	"fmt"
	"io/ioutil"

	"k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/apimachinery/pkg/util/yaml"
)

type Pod struct {
	v1.TypeMeta   `json:",inline"`
	v1.ObjectMeta `json:"metadata"`
	Spec          v1.PodSpec `json:"spec"`
}

func main() {
	data, err := ioutil.ReadFile("pod.yaml")
	if err != nil {
		fmt.Printf("error: %v\n", err)
		return
	}

	pod := &amp;Pod{}
	obj, _, err := yaml.NewDecoder(data).Decode(pod, nil, nil)
	if err != nil {
		fmt.Printf("error: %v\n", err)
		return
	}

	pod = obj.(*Pod)
	fmt.Printf("pod name: %s\n", pod.ObjectMeta.Name)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在此示例中，我们使用 <code v-pre>ioutil.ReadFile</code> 函数读取名为 <code v-pre>pod.yaml</code> 的 YAML 文件的内容。然后我们定义了一个 <code v-pre>Pod</code> 结构体，包含 <code v-pre>v1.TypeMeta</code>、<code v-pre>v1.ObjectMeta</code> 和 <code v-pre>v1.PodSpec</code> 字段。我们使用 <code v-pre>yaml.NewDecoder</code> 函数将 YAML 数据解码为 <code v-pre>Pod</code> 对象。然后我们打印了该对象的名称。</p>
<p><code v-pre>yaml.NewDecoder</code> 函数接受一个字节数组，并返回一个解码器对象。该解码器对象包含 <code v-pre>Decode</code> 方法，用于将 YAML 数据解码为 Go 对象。<code v-pre>Decode</code> 方法接受三个参数：要解码的字节数组，一个指向要解码的对象的指针，以及一个 <code v-pre>DecoderConfig</code> 对象。在此示例中，我们将 YAML 数据解码为 <code v-pre>Pod</code> 对象，并将其填充到指向对象的指针中。如果解码成功，<code v-pre>Decode</code> 方法将返回解码对象、字节数组和 <code v-pre>nil</code>。如果解码失败，<code v-pre>Decode</code> 方法将返回 <code v-pre>nil</code>、字节数组和一个 <code v-pre>error</code>。</p>
<h2 id="k8s-io-apimachinery-pkg" tabindex="-1"><a class="header-anchor" href="#k8s-io-apimachinery-pkg" aria-hidden="true">#</a> <a href="http://k8s.io/apimachinery/pkg" target="_blank" rel="noopener noreferrer">k8s.io/apimachinery/pkg<ExternalLinkIcon/></a></h2>
<p><a href="https://github.com/kubernetes/apimachinery/tree/master/pkg" target="_blank" rel="noopener noreferrer">k8s.io/apimachinery/pkg<ExternalLinkIcon/></a> 是 Kubernetes 的核心库之一，提供了许多用于处理 Kubernetes 对象和资源的 Go 代码包。这些代码包包括用于编码和解码 Kubernetes 对象的序列化器，用于处理 Kubernetes 资源的客户端，以及其他各种实用程序和库。</p>
<p><a href="https://github.com/kubernetes-sigs/controller-runtime" target="_blank" rel="noopener noreferrer">sigs.k8s.io/controller-runtime<ExternalLinkIcon/></a> 也是一个非常有用的 Kubernetes 库，它是一个高级的工具集，用于编写 Kubernetes 控制器。它使用了 <a href="https://github.com/kubernetes/apimachinery/tree/master/pkg" target="_blank" rel="noopener noreferrer">k8s.io/apimachinery/pkg<ExternalLinkIcon/></a> 中的许多代码包，使其成为 Kubernetes 应用程序开发的一个非常有用的工具。</p>
<p>如果你想学习 <a href="https://github.com/kubernetes/apimachinery/tree/master/pkg" target="_blank" rel="noopener noreferrer">k8s.io/apimachinery/pkg<ExternalLinkIcon/></a> 或 <a href="https://github.com/kubernetes-sigs/controller-runtime" target="_blank" rel="noopener noreferrer">sigs.k8s.io/controller-runtime<ExternalLinkIcon/></a> ，你可以查看它们的 GitHub 存储库，并阅读其文档和示例代码。在这些库中，你可以找到许多有用的功能和工具，用于处理 Kubernetes 对象并构建 Kubernetes 应用程序。</p>
<p><a href="https://github.com/kubernetes/apimachinery/tree/master/pkg" target="_blank" rel="noopener noreferrer">k8s.io/apimachinery/pkg<ExternalLinkIcon/></a> 是 Kubernetes 的核心库之一，提供了许多用于处理 Kubernetes 对象和资源的 Go 代码包。以下是一些常用的方法：</p>
<ul>
<li><code v-pre>runtime.NewScheme()</code>：创建一个新的 <code v-pre>Scheme</code> 对象，用于管理 Kubernetes API 对象的类型和版本。</li>
<li><code v-pre>runtime.NewObject()</code>：创建一个新的 Kubernetes 对象。</li>
<li><code v-pre>runtime.ObjectConvertor</code>：提供了将 Kubernetes 对象转换为不同格式的方法，包括将对象序列化为 JSON 或 YAML 格式。</li>
<li><code v-pre>NewClient()</code>：创建一个新的 Kubernetes 客户端，用于与 Kubernetes API 交互。</li>
<li><code v-pre>meta.Accessor</code>：提供了访问 Kubernetes 对象元数据的方法，包括获取对象名称、命名空间和标签。</li>
<li><code v-pre>labels.Selector</code>：提供了一种用于选择 Kubernetes 对象的标签选择器，可以使用标签选择器来过滤和查询 Kubernetes 对象。</li>
</ul>
<p>总之，<a href="https://github.com/kubernetes/apimachinery/tree/master/pkg" target="_blank" rel="noopener noreferrer">k8s.io/apimachinery/pkg<ExternalLinkIcon/></a> 库提供了许多有用的工具和功能，用于处理 Kubernetes 对象和构建 Kubernetes 应用程序。如果你想学习更多关于该库的信息，可以查看其 GitHub 存储库并阅读其文档和示例代码。</p>
<h2 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> context</h2>
<p>Context 是 Go语言 中用于传递请求范围数据的标准方法。它可以在程序的多个 Goroutine 中传递数据，并且支持超时、取消操作，以及请求作用域内值的存储和检索。Context 是 Go语言 并发编程中非常重要的一部分，特别是在网络编程中。</p>
<p>Context 是一个接口类型，它定义了四个方法：</p>
<ol>
<li>Done() &lt;-chan struct{}：返回一个只读的 channel，当 Context 被取消或超时时，该 channel 会被关闭。</li>
<li>Err() error：返回 Context 是否被取消或超时的原因。</li>
<li>Deadline() (deadline time.Time, ok bool)：返回 Context 的超时时间和是否设置过超时时间。</li>
<li>Value(key interface{}) interface{}：返回与指定键关联的值，如果该键不存在，则返回 nil。</li>
</ol>
<p>在 Go语言 中，Context 可以通过 WithCancel、WithDeadline、WithTimeout 和 WithValue 函数来创建。其中，WithCancel 可以用来取消 Context，WithDeadline 和 WithTimeout 可以设置 Context 的超时时间，WithValue 可以在 Context 中存储和检索请求作用域内的值。</p>
<p>使用 Context 的主要好处是可以提高代码的可读性和可维护性，同时也保证了程序在并发执行时的正确性和安全性。在网络编程中，Context 还可以用于传递请求上下文信息，如请求 ID、用户信息等。</p>
<p>总之，Context 是 Go语言 并发编程中必不可少的一部分，它可以让程序在并发执行时更加安全、可靠和高效。</p>
<h3 id="context-background" tabindex="-1"><a class="header-anchor" href="#context-background" aria-hidden="true">#</a> context.Background()</h3>
<p>context.Background() 函数返回一个空的 Context，通常用作父 Context。当一个 Goroutine 创建时，如果没有指定父 Context，就可以使用 <code v-pre>context.Background()</code>。在多个 Goroutine 中使用同一个 Context 可以保证它们之间能够协同工作，而不会出现竞争条件和资源冲突等问题。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"context"</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建一个空的 Context</span>
    ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 在 Goroutine 中使用 WithValue 设置键值对</span>
    ctx <span class="token operator">=</span> context<span class="token punctuation">.</span><span class="token function">WithValue</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"world"</span><span class="token punctuation">)</span>

    <span class="token comment">// 在 Goroutine 中使用 WithCancel 取消 Context</span>
    cancelCtx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
    <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">defer</span> fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Goroutine canceled"</span><span class="token punctuation">)</span>
        <span class="token keyword">select</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span><span class="token punctuation">:</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Goroutine finished"</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> <span class="token operator">&lt;-</span>cancelCtx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Goroutine canceled"</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 在主 Goroutine 中等待一段时间后取消 Context</span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token comment">// 在主 Goroutine 中输出 Context 中的值</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span><span class="token function">Value</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token comment">// 在主 Goroutine 中等待一段时间后输出 Done channel 的状态</span>
    <span class="token keyword">select</span> <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>ctx<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Context canceled"</span><span class="token punctuation">)</span>
    <span class="token keyword">case</span> <span class="token operator">&lt;-</span>time<span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span><span class="token number">3</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span><span class="token punctuation">:</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Context not canceled"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>world
Goroutine canceled
Context canceled
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个例子展示了如何创建一个空的 Context，并使用 WithValue 在其中存储键值对。然后，使用 WithCancel 创建一个可取消的 Context，并在一个 Goroutine 中等待一段时间后输出结果。主 Goroutine 在等待一段时间后取消 Context，然后输出存储在 Context 中的值，最后等待一段时间后输出 Done channel 的状态。可以看到，在 Goroutine 中使用 cancelCtx.Done() 可以检测到 Context 被取消的状态，而主 Goroutine 中的 ctx.Done() 也可以检测到相同的状态。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '33.md' style='float:left'>⬆️上一节🔗  </a><a href = '35.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


