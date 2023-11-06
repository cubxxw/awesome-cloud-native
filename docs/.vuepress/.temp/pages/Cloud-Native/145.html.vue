<template><div><h1 id="openim-jssdk-三" tabindex="-1"><a class="header-anchor" href="#openim-jssdk-三" aria-hidden="true">#</a> OpenIM JSSDK (三)</h1>
<p>从下面的函数开始：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>wsRouter <span class="token operator">*</span>WsFuncRouter<span class="token punctuation">)</span> <span class="token function">GetSelfUserInfo</span><span class="token punctuation">(</span>input <span class="token builtin">string</span><span class="token punctuation">,</span> operationID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	userWorker <span class="token operator">:=</span> open_im_sdk<span class="token punctuation">.</span><span class="token function">GetUserWorker</span><span class="token punctuation">(</span>wsRouter<span class="token punctuation">.</span>uId<span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token operator">!</span>wsRouter<span class="token punctuation">.</span><span class="token function">checkResourceLoadingAndKeysIn</span><span class="token punctuation">(</span>userWorker<span class="token punctuation">,</span> input<span class="token punctuation">,</span> operationID<span class="token punctuation">,</span> <span class="token function">runFuncName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	userWorker<span class="token punctuation">.</span><span class="token function">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetSelfUserInfo</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>BaseSuccessFailed<span class="token punctuation">{</span><span class="token function">runFuncName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> operationID<span class="token punctuation">,</span> wsRouter<span class="token punctuation">.</span>uId<span class="token punctuation">}</span><span class="token punctuation">,</span> operationID<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码定义了 <code v-pre>WsFuncRouter</code> 结构的一个方法 <code v-pre>SetSelfInfo</code>。该方法主要用于设置用户信息。我们来逐步分析它的功能和逻辑：</p>
<ol>
<li>
<p><strong>获取与指定用户ID相关的登录管理器</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>userWorker := open_im_sdk.GetUserWorker(wsRouter.uId)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这一行代码调用了之前解释过的 <code v-pre>GetUserWorker</code> 函数，传入的参数是 <code v-pre>wsRouter</code> 结构体中存储的 <code v-pre>uId</code>（用户ID）。该函数会返回与指定用户ID相关的 <code v-pre>LoginMgr</code> 实例（或者为此用户ID创建一个新的实例）。</p>
</li>
<li>
<p><strong>检查资源是否已加载并检查关键信息</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> <span class="token operator">!</span>wsRouter<span class="token punctuation">.</span><span class="token function">checkResourceLoadingAndKeysIn</span><span class="token punctuation">(</span>userWorker<span class="token punctuation">,</span> userInfo<span class="token punctuation">,</span> operationID<span class="token punctuation">,</span> <span class="token function">runFuncName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里调用了 <code v-pre>checkResourceLoadingAndKeysIn</code> 方法（该方法的具体实现未提供）。这个方法似乎进行一些前置检查，例如资源是否已经加载、是否存在必要的关键信息等。如果这些检查不通过（方法返回 <code v-pre>false</code>），那么 <code v-pre>SetSelfInfo</code> 方法会提前返回并不执行后续的逻辑。</p>
</li>
<li>
<p><strong>设置用户信息</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>userWorker<span class="token punctuation">.</span><span class="token function">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">SetSelfInfo</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>BaseSuccessFailed<span class="token punctuation">{</span><span class="token function">runFuncName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> operationID<span class="token punctuation">,</span> wsRouter<span class="token punctuation">.</span>uId<span class="token punctuation">}</span><span class="token punctuation">,</span> userInfo<span class="token punctuation">,</span> operationID<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这一行代码是该方法的核心部分，它实际上是调用了 <code v-pre>userWorker</code> 的 <code v-pre>User</code> 方法（该方法可能返回用户相关的服务或操作接口）然后进一步调用了 <code v-pre>SetSelfInfo</code> 方法来更新用户的个人信息。</p>
<p>为 <code v-pre>SetSelfInfo</code> 方法传递了三个参数：</p>
<ul>
<li>一个是 <code v-pre>BaseSuccessFailed</code> 结构体的实例，这可能是一个用于回调的结构，其中包含了函数名、操作ID和用户ID。</li>
<li><code v-pre>userInfo</code>，这应该是一个字符串，表示要设置的用户信息。</li>
<li><code v-pre>operationID</code>，这可能是一个操作或请求的唯一标识符，用于跟踪或日志记录。</li>
</ul>
</li>
</ol>
<p><code v-pre>SetSelfInfo</code> 方法允许你为指定的用户设置其个人信息。在实际设置之前，它执行了一些前置检查以确保操作的有效性和安全性。</p>
<p>继续解析：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">runFuncName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
	pc <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uintptr</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
	runtime<span class="token punctuation">.</span><span class="token function">Callers</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> pc<span class="token punctuation">)</span>
	f <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">FuncForPC</span><span class="token punctuation">(</span>pc<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> f<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数 <code v-pre>runFuncName</code> 的目的是获取调用它的函数的名称。我们来逐步分析：</p>
<ol>
<li>
<p><strong>创建一个uintptr切片</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>pc <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uintptr</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里创建了一个长度为1的 <code v-pre>uintptr</code> 切片，名为 <code v-pre>pc</code>。这个切片用来存储返回的程序计数器地址。</p>
</li>
<li>
<p><strong>获取调用者的信息</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>runtime<span class="token punctuation">.</span><span class="token function">Callers</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> pc<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Go的 <code v-pre>runtime</code> 包提供了 <code v-pre>Callers</code> 函数，它返回调用它的函数的调用栈。第一个参数是返回的调用栈的“深度”。这里使用的值是 <code v-pre>2</code>，这意味着它会跳过 <code v-pre>runtime.Callers</code> 和 <code v-pre>runFuncName</code> 自身，来获得调用 <code v-pre>runFuncName</code> 的函数的信息。</p>
<p>返回的程序计数器地址存储在先前创建的 <code v-pre>pc</code> 切片中。</p>
</li>
<li>
<p><strong>从程序计数器获取函数信息</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>f <span class="token operator">:=</span> runtime<span class="token punctuation">.</span><span class="token function">FuncForPC</span><span class="token punctuation">(</span>pc<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>使用 <code v-pre>runtime.FuncForPC</code> 函数，我们可以获取给定程序计数器地址对应的函数的信息。因为我们只存储了一个地址在 <code v-pre>pc</code> 切片中，所以我们使用 <code v-pre>pc[0]</code>。</p>
</li>
<li>
<p><strong>返回函数名称</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">return</span> f<span class="token punctuation">.</span><span class="token function">Name</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>最后，我们返回获取到的函数的名称。</p>
</li>
</ol>
<p>我们再看看调用它的函数：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>wsRouter <span class="token operator">*</span>WsFuncRouter<span class="token punctuation">)</span> <span class="token function">checkResourceLoadingAndKeysIn</span><span class="token punctuation">(</span>mgr <span class="token operator">*</span>login<span class="token punctuation">.</span>LoginMgr<span class="token punctuation">,</span> input<span class="token punctuation">,</span> operationID<span class="token punctuation">,</span> funcName <span class="token builtin">string</span><span class="token punctuation">,</span> m <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> keys <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> k <span class="token operator">:=</span> <span class="token keyword">range</span> keys <span class="token punctuation">{</span>
		<span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> m<span class="token punctuation">[</span>k<span class="token punctuation">]</span>
		<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"key not in"</span><span class="token punctuation">,</span> keys<span class="token punctuation">,</span> input<span class="token punctuation">,</span> operationID<span class="token punctuation">,</span> funcName<span class="token punctuation">)</span>
			wsRouter<span class="token punctuation">.</span><span class="token function">GlobalSendMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span><span class="token function">cleanUpfuncName</span><span class="token punctuation">(</span>funcName<span class="token punctuation">)</span><span class="token punctuation">,</span> StatusBadParameter<span class="token punctuation">,</span> <span class="token string">"key not in"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> operationID<span class="token punctuation">}</span><span class="token punctuation">)</span>
			<span class="token keyword">return</span> <span class="token boolean">false</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> err <span class="token operator">:=</span> open_im_sdk<span class="token punctuation">.</span><span class="token function">CheckResourceLoad</span><span class="token punctuation">(</span>mgr<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Info</span><span class="token punctuation">(</span>operationID<span class="token punctuation">,</span> <span class="token string">"Resource Loading "</span><span class="token punctuation">,</span> mgr<span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		wsRouter<span class="token punctuation">.</span><span class="token function">GlobalSendMessage</span><span class="token punctuation">(</span>EventData<span class="token punctuation">{</span><span class="token function">cleanUpfuncName</span><span class="token punctuation">(</span>funcName<span class="token punctuation">)</span><span class="token punctuation">,</span> StatusResourceNotCompleted<span class="token punctuation">,</span> <span class="token string">"resource loading is not completed"</span><span class="token punctuation">,</span> <span class="token string">""</span><span class="token punctuation">,</span> operationID<span class="token punctuation">}</span><span class="token punctuation">)</span>
		<span class="token keyword">return</span> <span class="token boolean">false</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个函数 <code v-pre>checkResourceLoadingAndKeysIn</code> 似乎是一个预检查功能，确保资源加载并检查传入数据中是否存在必要的键。我们来详细分析每个部分：</p>
<ol>
<li>
<p><strong>函数参数</strong>:</p>
<ul>
<li><code v-pre>mgr *login.LoginMgr</code>: 这是一个登录管理器，从结构上看，它可能用于管理各种与用户登录、消息和其他功能相关的资源。</li>
<li><code v-pre>input string</code>: 可能是传入的数据或JSON字符串，用于检查是否包含所需的键。</li>
<li><code v-pre>operationID string</code>: 用于在日志中识别特定的操作。</li>
<li><code v-pre>funcName string</code>: 调用此检查功能的函数的名称。</li>
<li><code v-pre>m map[string]interface{}</code>: 要检查键是否存在的映射。</li>
<li><code v-pre>keys ...string</code>: 一个可变参数列表，列出要在映射中查找的键。</li>
</ul>
</li>
<li>
<p><strong>检查所有的键是否存在于映射中</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> k <span class="token operator">:=</span> <span class="token keyword">range</span> keys <span class="token punctuation">{</span>
 	<span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> m<span class="token punctuation">[</span>k<span class="token punctuation">]</span>
 	<span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
 		<span class="token operator">...</span>
 		<span class="token keyword">return</span> <span class="token boolean">false</span>
 	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个循环遍历每一个要求存在的键，检查它们是否真的存在于映射中。如果一个键不存在，它会记录一个日志消息并发送一个全局消息，然后返回 <code v-pre>false</code>。</p>
</li>
<li>
<p><strong>检查资源是否已加载</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> err <span class="token operator">:=</span> open_im_sdk<span class="token punctuation">.</span><span class="token function">CheckResourceLoad</span><span class="token punctuation">(</span>mgr<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
 	<span class="token operator">...</span>
 	<span class="token keyword">return</span> <span class="token boolean">false</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这部分使用 <code v-pre>open_im_sdk.CheckResourceLoad</code> 来检查相关的资源（可能是登录或其他相关资源）是否已经加载。如果资源未加载或有错误，它会记录日志并发送一个全局消息，然后返回 <code v-pre>false</code>。</p>
</li>
<li>
<p><strong>返回成功</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">return</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果所有的键都在映射中存在，并且所有资源都已加载，那么函数返回 <code v-pre>true</code> 表示检查成功。</p>
</li>
</ol>
</div></template>


