<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第69节-deltafifo-原理" tabindex="-1"><a class="header-anchor" href="#第69节-deltafifo-原理" aria-hidden="true">#</a> 第69节  DeltaFIFO 原理</h1>
<div><a href = '68.md' style='float:left'>⬆️上一节🔗  </a><a href = '70.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>okkey 我们知道，再上一个 Reflector 从 API Server 监听（watch）特定类型的资源，拿到变更通知后，将其放入到 DeltaFIFO 队列中。</p>
<p><strong>DeltaFIFO  是 Kubernetes 为我们提供了一个存储。</strong></p>
<p>不仅仅是 DeltaFIFO ， Kubernetes 还为我们提供了很多存储</p>
<h2 id="kubernetes-提供的存储" tabindex="-1"><a class="header-anchor" href="#kubernetes-提供的存储" aria-hidden="true">#</a> Kubernetes 提供的存储</h2>
<p>cache 主要实现了 Store，利用了 <code v-pre>threadSafeMap</code> 存放数据</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">type</span> Store interface <span class="token punctuation">{</span>

	// Add adds the given object to the accumulator associated with the given object<span class="token string">'s key
	Add(obj interface{}) error

	// Update updates the given object in the accumulator associated with the given object'</span>s key
	Update<span class="token punctuation">(</span>obj interface<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> error

	// Delete deletes the given object from the accumulator associated with the given object<span class="token string">'s key
	Delete(obj interface{}) error

	// List returns a list of all the currently non-empty accumulators
	List() []interface{}

	// ListKeys returns a list of all the keys currently associated with non-empty accumulators
	ListKeys() []string

	// Get returns the accumulator associated with the given object'</span>s key
	Get<span class="token punctuation">(</span>obj interface<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>item interface<span class="token punctuation">{</span><span class="token punctuation">}</span>, exists bool, err error<span class="token punctuation">)</span>

	// GetByKey returns the accumulator associated with the given key
	GetByKey<span class="token punctuation">(</span>key string<span class="token punctuation">)</span> <span class="token punctuation">(</span>item interface<span class="token punctuation">{</span><span class="token punctuation">}</span>, exists bool, err error<span class="token punctuation">)</span>

	// Replace will delete the contents of the store, using instead the
	// given list. Store takes ownership of the list, you should not reference
	// it after calling this function.
	Replace<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>interface<span class="token punctuation">{</span><span class="token punctuation">}</span>, string<span class="token punctuation">)</span> error

	// Resync is meaningless <span class="token keyword">in</span> the terms appearing here but has
	// meaning <span class="token keyword">in</span> some implementations that have non-trivial
	// additional behavior <span class="token punctuation">(</span>e.g., DeltaFIFO<span class="token punctuation">)</span>.
	Resync<span class="token punctuation">(</span><span class="token punctuation">)</span> error
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>📜 对上面的解释：</strong></p>
<ul>
<li><code v-pre>Add(obj interface{}) error</code>: 将给定对象添加到与给定对象的键相关联的累加器中</li>
<li><code v-pre>Update(obj interface{}) error</code>: 更新与给定对象的键相关联的累加器中的给定对象</li>
<li><code v-pre>Delete(obj interface{}) error</code>: 从与给定对象的键相关联的累加器中删除给定对象</li>
<li><code v-pre>List() []interface{}</code>: 返回所有当前非空累加器的列表</li>
<li><code v-pre>ListKeys() []string</code>: 返回当前与非空累加器关联的所有键的列表</li>
<li><code v-pre>Get(obj interface{}) (item interface{}, exists bool, err error)</code>: 返回与给定对象的键相关联的累加器中的累加器</li>
<li><code v-pre>GetByKey(key string) (item interface{}, exists bool, err error)</code>: 返回与给定键相关联的累加器</li>
<li><code v-pre>Replace([]interface{}, string) error</code>: 删除存储中的内容，使用给定的列表替换。Store 获取该列表的所有权，调用此函数后不应再引用该列表。</li>
<li><code v-pre>Resync() error</code>: 在此处出现的术语中毫无意义，但在某些具有非平凡附加行为（例如 DeltaFIFO）的实现中具有意义。</li>
</ul>
<p><strong>分类：</strong></p>
<ul>
<li><code v-pre>Add(obj interface{}) error</code>
<ul>
<li>功能：将给定对象添加到与给定对象的键相关联的累加器中</li>
<li>参数：
<ul>
<li>obj：要添加的对象</li>
</ul>
</li>
<li>返回值：无</li>
</ul>
</li>
<li><code v-pre>Update(obj interface{}) error</code>
<ul>
<li>功能：更新与给定对象的键相关联的累加器中的给定对象</li>
<li>参数：
<ul>
<li>obj：要更新的对象</li>
</ul>
</li>
<li>返回值：无</li>
</ul>
</li>
<li><code v-pre>Delete(obj interface{}) error</code>
<ul>
<li>功能：从与给定对象的键相关联的累加器中删除给定对象</li>
<li>参数：
<ul>
<li>obj：要删除的对象</li>
</ul>
</li>
<li>返回值：无</li>
</ul>
</li>
<li><code v-pre>List() []interface{}</code>
<ul>
<li>功能：返回所有当前非空累加器的列表</li>
<li>参数：无</li>
<li>返回值：所有当前非空累加器的列表</li>
</ul>
</li>
<li><code v-pre>ListKeys() []string</code>
<ul>
<li>功能：返回当前与非空累加器关联的所有键的列表</li>
<li>参数：无</li>
<li>返回值：当前与非空累加器关联的所有键的列表</li>
</ul>
</li>
<li><code v-pre>Get(obj interface{}) (item interface{}, exists bool, err error)</code>
<ul>
<li>功能：返回与给定对象的键相关联的累加器中的累加器</li>
<li>参数：
<ul>
<li>obj：要获取的对象</li>
</ul>
</li>
<li>返回值：
<ul>
<li>item：与给定对象的键相关联的累加器中的累加器</li>
<li>exists：是否存在该累加器</li>
<li>err：错误信息（如果有）</li>
</ul>
</li>
</ul>
</li>
<li><code v-pre>GetByKey(key string) (item interface{}, exists bool, err error)</code>
<ul>
<li>功能：返回与给定键相关联的累加器</li>
<li>参数：
<ul>
<li>key：要获取的键</li>
</ul>
</li>
<li>返回值：
<ul>
<li>item：与给定键相关联的累加器</li>
<li>exists：是否存在该累加器</li>
<li>err：错误信息（如果有）</li>
</ul>
</li>
</ul>
</li>
<li><code v-pre>Replace([]interface{}, string) error</code>
<ul>
<li>功能：删除存储中的内容，使用给定的列表替换。Store 获取该列表的所有权，调用此函数后不应再引用该列表。</li>
<li>参数：
<ul>
<li>[]interface{}：要替换的列表</li>
<li>string：用于记录日志的字符串</li>
</ul>
</li>
<li>返回值：错误信息（如果有）</li>
</ul>
</li>
<li><code v-pre>Resync() error</code>
<ul>
<li>功能：在此处出现的术语中毫无意义，但在某些具有非平凡附加行为（例如 DeltaFIFO）的实现中具有意义。</li>
<li>参数：无</li>
<li>返回值：错误信息（如果有）</li>
</ul>
</li>
</ul>
<h3 id="undeltastore" tabindex="-1"><a class="header-anchor" href="#undeltastore" aria-hidden="true">#</a> UndeltaStore</h3>
<p>实现了 <code v-pre>Store</code> ，利用了 cache 存放数据，数据变更的时候通过 PushFunc 发送当前完整的状态。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> UndeltaStore <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Store
	PushFunc <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到 <code v-pre>UndeltaStore</code> 结构体嵌套了一个接口，这样做的目的是将接口的方法作为结构体的一部分，以便更方便地访问接口的方法。</p>
<p>比如说 Add:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>UndeltaStore<span class="token punctuation">)</span> <span class="token function">Add</span><span class="token punctuation">(</span>obj <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> u<span class="token punctuation">.</span>Store<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	u<span class="token punctuation">.</span><span class="token function">PushFunc</span><span class="token punctuation">(</span>u<span class="token punctuation">.</span>Store<span class="token punctuation">.</span><span class="token function">List</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="heap" tabindex="-1"><a class="header-anchor" href="#heap" aria-hidden="true">#</a> Heap</h3>
<p>Heap 通过实现 Store，利用 data 数据结构存放数据，实现堆数据结构，用于优先级队列。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// heapData is an internal struct that implements the standard heap interface</span>
<span class="token comment">// and keeps the data stored in the heap.</span>
<span class="token keyword">type</span> heapData <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// items is a map from key of the objects to the objects and their index.</span>
	<span class="token comment">// We depend on the property that items in the map are in the queue and vice versa.</span>
	items <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">*</span>heapItem
	<span class="token comment">// queue implements a heap data structure and keeps the order of elements</span>
	<span class="token comment">// according to the heap invariant. The queue keeps the keys of objects stored</span>
	<span class="token comment">// in "items".</span>
	queue <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>

	<span class="token comment">// keyFunc is used to make the key used for queued item insertion and retrieval, and</span>
	<span class="token comment">// should be deterministic.</span>
	keyFunc KeyFunc
	<span class="token comment">// lessFunc is used to compare two objects in the heap.</span>
	lessFunc LessFunc
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="fifo" tabindex="-1"><a class="header-anchor" href="#fifo" aria-hidden="true">#</a> FIFO</h3>
<p>FIFO 实现了 Queue （包含 Store)，利用自己内部的 Items 数据结构存放数据。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Queue extends Store with a collection of Store keys to "process".</span>
<span class="token comment">// Every Add, Update, or Delete may put the object's key in that collection.</span>
<span class="token comment">// A Queue has a way to derive the corresponding key given an accumulator.</span>
<span class="token comment">// A Queue can be accessed concurrently from multiple goroutines.</span>
<span class="token comment">// A Queue can be "closed", after which Pop operations return an error.</span>
<span class="token keyword">type</span> Queue <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	Store

	<span class="token comment">// Pop blocks until there is at least one key to process or the</span>
	<span class="token comment">// Queue is closed.  In the latter case Pop returns with an error.</span>
	<span class="token comment">// In the former case Pop atomically picks one key to process,</span>
	<span class="token comment">// removes that (key, accumulator) association from the Store, and</span>
	<span class="token comment">// processes the accumulator.  Pop returns the accumulator that</span>
	<span class="token comment">// was processed and the result of processing.  The PopProcessFunc</span>
	<span class="token comment">// may return an ErrRequeue{inner} and in this case Pop will (a)</span>
	<span class="token comment">// return that (key, accumulator) association to the Queue as part</span>
	<span class="token comment">// of the atomic processing and (b) return the inner error from</span>
	<span class="token comment">// Pop.</span>
	<span class="token function">Pop</span><span class="token punctuation">(</span>PopProcessFunc<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>

	<span class="token comment">// AddIfNotPresent puts the given accumulator into the Queue (in</span>
	<span class="token comment">// association with the accumulator's key) if and only if that key</span>
	<span class="token comment">// is not already associated with a non-empty accumulator.</span>
	<span class="token function">AddIfNotPresent</span><span class="token punctuation">(</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token builtin">error</span>

	<span class="token comment">// HasSynced returns true if the first batch of keys have all been</span>
	<span class="token comment">// popped.  The first batch of keys are those of the first Replace</span>
	<span class="token comment">// operation if that happened before any Add, AddIfNotPresent,</span>
	<span class="token comment">// Update, or Delete; otherwise the first batch is empty.</span>
	<span class="token function">HasSynced</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>

	<span class="token comment">// Close the queue</span>
	<span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="deltafifo" tabindex="-1"><a class="header-anchor" href="#deltafifo" aria-hidden="true">#</a> DeltaFIFO</h2>
<p>接下来就是重点 DeltaFIFO  的部分了</p>
<h3 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h3>
<p><strong>DeltaFIFO 的主要应用场景如下：</strong></p>
<ul>
<li>当你希望处理每一个对象的变化最多一次</li>
<li>当你处理一个对象的时候，希望知道这个对象与你上一次处理时，发生了哪些变化。</li>
<li>当你希望一个对象删除的时候，你仍然能够处理它</li>
<li>能够周期性的处理所有的对象</li>
</ul>
<p><strong>结构体：</strong></p>
<p><code v-pre>DeltaFIFO</code>是K8s中用来存储处理数据的<code v-pre>Queue</code>，相较于传统的<code v-pre>FIFO</code>，它不仅仅存储了数据保证了先进先出，而且存储有K8s 资源对象的类型。其是连接<code v-pre>Reflector</code>(生产者)和<code v-pre>indexer</code>(消费者)的重要通道。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> DeltaFIFO <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	<span class="token comment">// lock/cond protects access to 'items' and 'queue'.</span>
	lock sync<span class="token punctuation">.</span>RWMutex
	cond sync<span class="token punctuation">.</span>Cond

	<span class="token comment">// `items` maps a key to a Deltas.</span>
	<span class="token comment">// Each such Deltas has at least one Delta.</span>
	items <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>Deltas

	<span class="token comment">// `queue` maintains FIFO order of keys for consumption in Pop().</span>
	<span class="token comment">// There are no duplicates in `queue`.</span>
	<span class="token comment">// A key is in `queue` if and only if it is in `items`.</span>
	queue <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>

	<span class="token comment">// populated is true if the first batch of items inserted by Replace() has been populated</span>
	<span class="token comment">// or Delete/Add/Update/AddIfNotPresent was called first.</span>
	populated <span class="token builtin">bool</span>
	<span class="token comment">// initialPopulationCount is the number of items inserted by the first call of Replace()</span>
	initialPopulationCount <span class="token builtin">int</span>

	<span class="token comment">// keyFunc is used to make the key used for queued item</span>
	<span class="token comment">// insertion and retrieval, and should be deterministic.</span>
	keyFunc KeyFunc

	<span class="token comment">// knownObjects list keys that are "known" --- affecting Delete(),</span>
	<span class="token comment">// Replace(), and Resync()</span>
	knownObjects KeyListerGetter

	<span class="token comment">// Used to indicate a queue is closed so a control loop can exit when a queue is empty.</span>
	<span class="token comment">// Currently, not used to gate any of CRUD operations.</span>
	closed <span class="token builtin">bool</span>

	<span class="token comment">// emitDeltaTypeReplaced is whether to emit the Replaced or Sync</span>
	<span class="token comment">// DeltaType when Replace() is called (to preserve backwards compat).</span>
	emitDeltaTypeReplaced <span class="token builtin">bool</span>

	<span class="token comment">// Called with every object if non-nil.</span>
	transformer TransformFunc
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<ul>
<li><code v-pre>items</code> 是计算的 key，value 是一个 Deltas 的结构体，</li>
<li><code v-pre>queue</code>：保证这个队列的顺序性</li>
<li><code v-pre>keyFunc</code>：我们默认使用 <code v-pre>&lt;namespce&gt;/&lt;name&gt;</code> 不指定 namespace 时候用 <code v-pre>&lt;name&gt;</code></li>
<li><code v-pre>knownObjects</code> : 专门用来存放数据的地方，其实就是 <code v-pre>Indexer</code></li>
</ul>
<h2 id="事件的生产和消费" tabindex="-1"><a class="header-anchor" href="#事件的生产和消费" aria-hidden="true">#</a> 事件的生产和消费</h2>
<p>作为一个中间管道的作用，对应的一边就是生产者，一遍就是消费者。</p>
<h3 id="生产" tabindex="-1"><a class="header-anchor" href="#生产" aria-hidden="true">#</a> 生产</h3>
<ul>
<li>Reflector 的 List</li>
<li>Reflector 的 Watch</li>
<li>Reflector 的 Resync</li>
</ul>
<h3 id="消费" tabindex="-1"><a class="header-anchor" href="#消费" aria-hidden="true">#</a> 消费</h3>
<ul>
<li>事件派发到 work queue</li>
<li>刷新本地缓存</li>
</ul>
<h2 id="indexer" tabindex="-1"><a class="header-anchor" href="#indexer" aria-hidden="true">#</a> Indexer</h2>
<p>Indexer 主要提供了一个对象根据一定检索能力，典型的实现就是通过 namespace 来构建 Key，通过 Thread Safe Store 来存储对象。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '68.md' style='float:left'>⬆️上一节🔗  </a><a href = '70.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


