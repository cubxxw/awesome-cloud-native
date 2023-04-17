<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第68节-reflector-原理" tabindex="-1"><a class="header-anchor" href="#第68节-reflector-原理" aria-hidden="true">#</a> 第68节 Reflector 原理</h1>
<div><a href = '67.md' style='float:left'>⬆️上一节🔗  </a><a href = '69.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p><code v-pre>reflector</code>在 <code v-pre>client-go</code> 里面的主要作用是与<code v-pre>apiserver</code>进行交互，获取自定义资源数据更新到 <code v-pre>Delta FIFO</code> 队列里面，所以它主要分为两部分功能，一部分是list和watch的功能，另一部分是更新缓存的功能。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewReflector</span><span class="token punctuation">(</span>lw ListerWatcher<span class="token punctuation">,</span> expectedType <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> store Store<span class="token punctuation">,</span> resyncPeriod time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token operator">*</span>Reflector <span class="token punctuation">{</span>
  <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>参数说明：</strong></p>
<ul>
<li><code v-pre>lw</code>: <code v-pre>ListerWatcher</code> 接口的实现，用于获取 Kubernetes API Server 中资源的状态。</li>
<li><code v-pre>expectedType</code>: 指定了需要被处理的 Kubernetes API 对象的类型。</li>
<li><code v-pre>store</code>: 存储 Kubernetes 资源对象的数据结构，用于与 Kubernetes API 交互。</li>
<li><code v-pre>resyncPeriod</code>: 周期性地重新同步资源对象的时间间隔。</li>
</ul>
<p><strong>注意：</strong></p>
<p><code v-pre>Kubernetes</code> 中对 API Server 是一个长连接而不是轮询。</p>
<p>List 和 Watch 可以保证 可靠性、实时性和顺序性。</p>
<ul>
<li>
<p><code v-pre>List</code> 方法指定类型资源对象全量更新，并且更新到缓存上。可以列出 Kubernetes API Server 中指定类型的所有资源对象。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -iv https://127.0.0.1:8001/api/v1/namespaces/default/pods
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>Watch</code> 方法可以监听 Kubernetes API Server 中指定类型的资源对象的变化，当资源对象发生变化时，会返回一个 <code v-pre>watch.Event</code> 对象，其中包含了发生变化的资源对象的信息。假如要监听pod的变化时，可以在List这个API上加一个参数<code v-pre>watch=true</code> 就可以监听资源对象的事件变化）。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -iv https://127.0.0.1:8001/api/v1/namespaces/default/pod\?watch\=ture
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h2 id="resourceversion与bookmarks" tabindex="-1"><a class="header-anchor" href="#resourceversion与bookmarks" aria-hidden="true">#</a> ResourceVersion与Bookmarks</h2>
<h3 id="resourceversion" tabindex="-1"><a class="header-anchor" href="#resourceversion" aria-hidden="true">#</a> ResourceVersion</h3>
<p>在K8S中每一个资源对象都有一个ResourceVersion，当资源对象发生变更时ResourceVersion就会发生递增的变更，使对应到 ETCD 的 <code v-pre>reversion</code> 的变更</p>
<ul>
<li>保证客户端数据一致性和顺序性</li>
<li>并发控制(可以保证多个客户端并发去更改资源对象时，出现的并发问题)</li>
</ul>
<p><strong>Bookmarks：</strong></p>
<ul>
<li>减少apiserver负载（高版本的apiserver才支持Bookmarks）</li>
<li>更新客户端保存的最近一次ResourceVersion</li>
</ul>
<blockquote>
<p>所以说我们的客户端当接受到bookmark的事件的时候，我们可以从这个事件里面的ResourceVersion提取出来，然后更新我们本地的ResourceVersion，然后接着以这个ResourceVersion去watch我们的资源对象的变更。</p>
</blockquote>
<p>Bookmarks是Kubernetes API Server的一个配置选项，它允许客户端在长轮询请求中传递一个所谓的“书签”，这个书签是一个字符串，它描述了客户端最后一次看到的资源版本。这样，API Server就可以只返回新的或更新的资源，而不是整个资源列表。这样可以减少网络流量和API Server的负载。</p>
<p>所以说我们的客户端当接受到<code v-pre>bookmark</code>的事件的时候，我们可以从这个事件里面的ResourceVersion提取出来，然后更新我们本地的ResourceVersion，然后接着以这个ResourceVersion去watch我们的资源对象的变更。</p>
<h2 id="reflector与restclient" tabindex="-1"><a class="header-anchor" href="#reflector与restclient" aria-hidden="true">#</a> Reflector与RESTClient</h2>
<p>我们知道 Kubernetes 中 所有的组件需要去操作集群资源的时候都需要通过调用 kube-apiserver 提供的 RESTful 接口，kube-apiserver 进一步和 ETCD 交互，完成资源的信息更新。</p>
<p>那么 Reflector如果要跟apiserver进行交互的话，就会通过RESTClient或者是其他的client。以下例子是<code v-pre>informer</code>里面的，它实现了相应的接口，并提供了list和watch方法，里面的逻辑就是调用的clientset。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>        <span class="token operator">...</span>
        <span class="token operator">&amp;</span>cache<span class="token punctuation">.</span>ListWatch<span class="token punctuation">{</span>
            ListFunc<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>options metav1<span class="token punctuation">.</span>ListOptions<span class="token punctuation">)</span> <span class="token punctuation">(</span>runtime<span class="token punctuation">.</span>Object<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> tweakListOptions <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                    <span class="token function">tweakListOptions</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>options<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> client<span class="token punctuation">.</span><span class="token function">CoreV1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Pods</span><span class="token punctuation">(</span>namespace<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">List</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">TODO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            WatchFunc<span class="token punctuation">:</span> <span class="token keyword">func</span><span class="token punctuation">(</span>options metav1<span class="token punctuation">.</span>ListOptions<span class="token punctuation">)</span> <span class="token punctuation">(</span>watch<span class="token punctuation">.</span>Interface<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> tweakListOptions <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                    <span class="token function">tweakListOptions</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>options<span class="token punctuation">)</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">return</span> client<span class="token punctuation">.</span><span class="token function">CoreV1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Pods</span><span class="token punctuation">(</span>namespace<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Watch</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">TODO</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> options<span class="token punctuation">)</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '67.md' style='float:left'>⬆️上一节🔗  </a><a href = '69.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


