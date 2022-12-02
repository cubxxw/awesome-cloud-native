<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第34节-kubernetes-开发之旅" tabindex="-1"><a class="header-anchor" href="#第34节-kubernetes-开发之旅" aria-hidden="true">#</a> 第34节 Kubernetes 开发之旅</h1>
<div><a href = '33.md' style='float:left'>⬆️上一节🔗  </a><a href = '35.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="💡它很重要" tabindex="-1"><a class="header-anchor" href="#💡它很重要" aria-hidden="true">#</a> 💡它很重要</h2>
<p>它就像是数据库一样重要，缺了它，我们什么都没办法实现，但是相比较控制器，它又不是我们核心。</p>
<p>但是我们作为第一步，我希望可以从它开始学习~</p>
<h2 id="三个重要的-api-名词" tabindex="-1"><a class="header-anchor" href="#三个重要的-api-名词" aria-hidden="true">#</a> 三个重要的 API 名词</h2>
<h3 id="api-object" tabindex="-1"><a class="header-anchor" href="#api-object" aria-hidden="true">#</a> API Object</h3>
<p>是 Kubernetes 内部管理的基本元素，是 Kubernetes 在 ETCD 中信息存储单元。</p>
<p>例如 Deployment，Pod，Service，都是 API Object。内部代码常用 <code v-pre>API</code> 称呼。</p>
<h3 id="api-group" tabindex="-1"><a class="header-anchor" href="#api-group" aria-hidden="true">#</a> API  Group</h3>
<p>一组 API Object 组成的一个具有共有性质的对象集合。</p>
<p>例如：apps 这个 group ，它由 Deployment，ReplicaSet，StatefulSet。</p>
<h3 id="legacy-api-object" tabindex="-1"><a class="header-anchor" href="#legacy-api-object" aria-hidden="true">#</a> Legacy API Object</h3>
<p>绝大多数的 API Object 都被归在 API Group 下面，特别是新版中引入的一定非遵从这一原则。</p>
<p>但是在 Kubernetes 项目项目初始化阶段所引入的 API Object 没有显示定义在 API Group 下面，例如 Pod，Event，Node等等，在代码中有时也称呼他们为 <code v-pre>core</code> 、API Object</p>
<h2 id="api-server-在-cobra-的实现" tabindex="-1"><a class="header-anchor" href="#api-server-在-cobra-的实现" aria-hidden="true">#</a> API Server 在 cobra 的实现</h2>
<p><code v-pre>API Server</code>：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	command <span class="token operator">:=</span> app<span class="token punctuation">.</span><span class="token function">NewAPIServerCommand</span><span class="token punctuation">(</span><span class="token punctuation">)</span>	
	code <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>command<span class="token punctuation">)</span>	<span class="token comment">//跑 command</span>
	os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span>code<span class="token punctuation">)</span>	<span class="token comment">//一直跑，除非调用 code </span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>很简洁的主程序~</p>
</blockquote>
<h2 id="server-chain" tabindex="-1"><a class="header-anchor" href="#server-chain" aria-hidden="true">#</a> server chain</h2>
<p><strong>构建过程 从右向左； 请求流向 从左向右：</strong></p>
<p>链表结构，</p>
<h2 id="master-中转载-api" tabindex="-1"><a class="header-anchor" href="#master-中转载-api" aria-hidden="true">#</a> Master 中转载 API</h2>
<p>API Server 的内容 是 API Object</p>
<p>通过 Restful 服务对外提供操作 API Object 的能力。</p>
<h2 id="详解-scheme-机制" tabindex="-1"><a class="header-anchor" href="#详解-scheme-机制" aria-hidden="true">#</a> 详解 Scheme 机制</h2>
<div class="custom-container warning"><p class="custom-container-title">定义</p>
<p>Scheme 是一个接口体，内含处理外部 Version 之间的转换， GVK 和 Go Type之间的转换之用的数据和方法。</p>
</div>
<p>Scheme 定义了资源序列化和反序列化的方法以及资源类型和版本的对应关系；这里我们可以理解成一张纪录表。定义在 <a href="https://github.com/kubernetes/kubernetes/blob/master/staging/src/k8s.io/apimachinery/pkg/runtime/scheme.go" target="_blank" rel="noopener noreferrer">k8s.io/apimachinery/pkg/runtime/scheme.go<ExternalLinkIcon/></a> 中。需要关注的 <code v-pre>gvkToTypeype</code> 和 <code v-pre>typeToGVK</code> 字段</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Schemes are not expected to change at runtime and are only threadsafe after</span>
<span class="token comment">// registration is complete.</span>
<span class="token keyword">type</span> Scheme <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// gvkToType allows one to figure out the go type of an object with</span>
	<span class="token comment">// the given version and name.</span>
	gvkToType <span class="token keyword">map</span><span class="token punctuation">[</span>schema<span class="token punctuation">.</span>GroupVersionKind<span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Type

	<span class="token comment">// typeToGVK allows one to find metadata for a given go object.</span>
	<span class="token comment">// The reflect.Type we index by should *not* be a pointer.</span>
	typeToGVK <span class="token keyword">map</span><span class="token punctuation">[</span>reflect<span class="token punctuation">.</span>Type<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span>schema<span class="token punctuation">.</span>GroupVersionKind

	<span class="token comment">// unversionedTypes are transformed without conversion in ConvertToVersion.</span>
	unversionedTypes <span class="token keyword">map</span><span class="token punctuation">[</span>reflect<span class="token punctuation">.</span>Type<span class="token punctuation">]</span>schema<span class="token punctuation">.</span>GroupVersionKind

	<span class="token comment">// unversionedKinds are the names of kinds that can be created in the context of any group</span>
	<span class="token comment">// or version</span>
	<span class="token comment">// TODO: resolve the status of unversioned types.</span>
	unversionedKinds <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>reflect<span class="token punctuation">.</span>Type

	<span class="token comment">// Map from version and resource to the corresponding func to convert</span>
	<span class="token comment">// resource field labels in that version to internal version.</span>
	fieldLabelConversionFuncs <span class="token keyword">map</span><span class="token punctuation">[</span>schema<span class="token punctuation">.</span>GroupVersionKind<span class="token punctuation">]</span>FieldLabelConversionFunc

	<span class="token comment">// defaulterFuncs is a map to funcs to be called with an object to provide defaulting</span>
	<span class="token comment">// the provided object must be a pointer.</span>
	defaulterFuncs <span class="token keyword">map</span><span class="token punctuation">[</span>reflect<span class="token punctuation">.</span>Type<span class="token punctuation">]</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// converter stores all registered conversion functions. It also has</span>
	<span class="token comment">// default converting behavior.</span>
	converter <span class="token operator">*</span>conversion<span class="token punctuation">.</span>Converter

	<span class="token comment">// versionPriority is a map of groups to ordered lists of versions for those groups indicating the</span>
	<span class="token comment">// default priorities of these versions as registered in the scheme</span>
	versionPriority <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>

	<span class="token comment">// observedVersions keeps track of the order we've seen versions during type registration</span>
	observedVersions <span class="token punctuation">[</span><span class="token punctuation">]</span>schema<span class="token punctuation">.</span>GroupVersion

	<span class="token comment">// schemeName is the name of this scheme.  If you don't specify a name, the stack of the NewScheme caller will be used.</span>
	<span class="token comment">// This is useful for error reporting to indicate the origin of the scheme.</span>
	schemeName <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>和 API Server 通信的时候能够处理新的 types 类型就需要知道有新的types类型，AddToScheme 会利用到反射，新定义的 types 类型的结构体的命名必须和自定义的 Kind 的命名一致，否则找不到对应的kind</p>
<h2 id="version" tabindex="-1"><a class="header-anchor" href="#version" aria-hidden="true">#</a> Version</h2>
<p>每一个 API Group 都会有很多 version，每一个 version 包含很多个 kind （一个 KInd会出现在多个 version 下）</p>
<p>这些 Version 又称为 External Version ，它们面向 API Server 外部，Internal Version 是 API Server 在内部程序中处理数据时 API Object 的实际类型。</p>
<h2 id="gvk" tabindex="-1"><a class="header-anchor" href="#gvk" aria-hidden="true">#</a> GVK</h2>
<p>Group，Version，Kind 。这三元组确定了一个 Kind，当然并不是缺一不可。GVK 理解为一个字符串，是三者拼接的结果。</p>
<h2 id="type" tabindex="-1"><a class="header-anchor" href="#type" aria-hidden="true">#</a> Type</h2>
<p>代码中常见 &quot;TYPE&quot; 。</p>
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


