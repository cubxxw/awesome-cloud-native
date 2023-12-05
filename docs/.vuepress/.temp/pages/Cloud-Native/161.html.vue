<template><div><h1 id="understanding-openim-api-to-rpc-call-logic-a-comprehensive-guide" tabindex="-1"><a class="header-anchor" href="#understanding-openim-api-to-rpc-call-logic-a-comprehensive-guide" aria-hidden="true">#</a> Understanding OpenIM API to RPC Call Logic: A Comprehensive Guide</h1>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>This document provides an in-depth analysis of the API to RPC (Remote Procedure Call) call logic within the OpenIM framework, focusing on the <code v-pre>SearchMsg</code> functionality. We will explore the codebase, tracing the flow from the API endpoint definition to the final RPC method invocation.</p>
<h2 id="overview-of-openim-s-structure" tabindex="-1"><a class="header-anchor" href="#overview-of-openim-s-structure" aria-hidden="true">#</a> Overview of OpenIM's Structure</h2>
<p>Before diving into the specific API, it's essential to understand OpenIM's general architecture. OpenIM is structured to separate concerns between its API layer, business logic, and data access layer, facilitating a scalable and maintainable codebase.</p>
<h2 id="api-endpoint-definition" tabindex="-1"><a class="header-anchor" href="#api-endpoint-definition" aria-hidden="true">#</a> API Endpoint Definition</h2>
<p>The journey begins in the <code v-pre>internal/api/route.go</code> file, where the API endpoints are defined. Here, <code v-pre>msgGroup.POST(&quot;/search_msg&quot;, m.SearchMsg)</code> sets up the route for the search message functionality.</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>msgGroup<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/search_msg"</span><span class="token punctuation">,</span> m<span class="token punctuation">.</span>SearchMsg<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="key-file-internal-api-route-go" tabindex="-1"><a class="header-anchor" href="#key-file-internal-api-route-go" aria-hidden="true">#</a> Key File: <code v-pre>internal/api/route.go</code></h3>
<ul>
<li><strong>Purpose</strong>: Route definition for API endpoints.</li>
<li><strong>Key Function</strong>: <code v-pre>msgGroup.POST</code></li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>MessageApi<span class="token punctuation">)</span> <span class="token function">SearchMsg</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	a2r<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>MsgClient<span class="token punctuation">.</span>SearchMessage<span class="token punctuation">,</span> m<span class="token punctuation">.</span>Client<span class="token punctuation">,</span> c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="api-function-logic" tabindex="-1"><a class="header-anchor" href="#api-function-logic" aria-hidden="true">#</a> API Function Logic</h2>
<p>Moving to <code v-pre>internal/api/msg.go</code>, we find the <code v-pre>SearchMsg</code> function. This function acts as a bridge, translating the HTTP request into a format suitable for RPC communication.</p>
<h3 id="key-file-internal-api-msg-go" tabindex="-1"><a class="header-anchor" href="#key-file-internal-api-msg-go" aria-hidden="true">#</a> Key File: <code v-pre>internal/api/msg.go</code></h3>
<ul>
<li><strong>Function</strong>: <code v-pre>SearchMsg</code></li>
<li><strong>Role</strong>: Converts HTTP requests to RPC calls.</li>
</ul>
<h2 id="rpc-call-abstraction" tabindex="-1"><a class="header-anchor" href="#rpc-call-abstraction" aria-hidden="true">#</a> RPC Call Abstraction</h2>
<p>The <code v-pre>a2r.Call</code> function in <code v-pre>github.com/OpenIMSDK/tools/a2r</code> abstracts the RPC call. It handles JSON binding, request validation, and invoking the actual RPC method.</p>
<h3 id="key-file-github-com-openimsdk-tools-a2r" tabindex="-1"><a class="header-anchor" href="#key-file-github-com-openimsdk-tools-a2r" aria-hidden="true">#</a> Key File: <code v-pre>github.com/OpenIMSDK/tools/a2r</code></h3>
<ul>
<li><strong>Function</strong>: <code v-pre>Call</code></li>
<li><strong>Responsibility</strong>: Error handling, request validation, and RPC invocation.</li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> Call<span class="token punctuation">[</span>A<span class="token punctuation">,</span> B<span class="token punctuation">,</span> C any<span class="token punctuation">]</span><span class="token punctuation">(</span>
	rpc <span class="token keyword">func</span><span class="token punctuation">(</span>client C<span class="token punctuation">,</span> ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> req <span class="token operator">*</span>A<span class="token punctuation">,</span> options <span class="token operator">...</span>grpc<span class="token punctuation">.</span>CallOption<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>B<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	client C<span class="token punctuation">,</span>
	c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> req A
	<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">BindJSON</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>req<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">ZWarn</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> <span class="token string">"gin bind json error"</span><span class="token punctuation">,</span> err<span class="token punctuation">,</span> <span class="token string">"req"</span><span class="token punctuation">,</span> req<span class="token punctuation">)</span>
		apiresp<span class="token punctuation">.</span><span class="token function">GinError</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> errs<span class="token punctuation">.</span>ErrArgs<span class="token punctuation">.</span><span class="token function">WithDetail</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 参数错误</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> checker<span class="token punctuation">.</span><span class="token function">Validate</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>req<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		apiresp<span class="token punctuation">.</span><span class="token function">GinError</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> err<span class="token punctuation">)</span> <span class="token comment">// 参数校验失败</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	data<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">rpc</span><span class="token punctuation">(</span>client<span class="token punctuation">,</span> c<span class="token punctuation">,</span> <span class="token operator">&amp;</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		apiresp<span class="token punctuation">.</span><span class="token function">GinError</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> err<span class="token punctuation">)</span> <span class="token comment">// RPC调用失败</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	apiresp<span class="token punctuation">.</span><span class="token function">GinSuccess</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> data<span class="token punctuation">)</span> <span class="token comment">// 成功</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="rpc-method-execution" tabindex="-1"><a class="header-anchor" href="#rpc-method-execution" aria-hidden="true">#</a> RPC Method Execution</h2>
<p>The actual RPC method, <code v-pre>SearchMessage</code>, is defined in <code v-pre>internal/rpc/msg/sync_msg.go</code>. This method handles the business logic for searching messages, interacting with the database, and constructing the response.</p>
<h3 id="key-file-internal-rpc-msg-sync-msg-go" tabindex="-1"><a class="header-anchor" href="#key-file-internal-rpc-msg-sync-msg-go" aria-hidden="true">#</a> Key File: <code v-pre>internal/rpc/msg/sync_msg.go</code></h3>
<ul>
<li><strong>Function</strong>: <code v-pre>SearchMessage</code></li>
<li><strong>Operation</strong>: Business logic and database interaction.</li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>msgServer<span class="token punctuation">)</span> <span class="token function">SearchMessage</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> req <span class="token operator">*</span>msg<span class="token punctuation">.</span>SearchMessageReq<span class="token punctuation">)</span> <span class="token punctuation">(</span>resp <span class="token operator">*</span>msg<span class="token punctuation">.</span>SearchMessageResp<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> chatLogs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>sdkws<span class="token punctuation">.</span>MsgData
	<span class="token keyword">var</span> total <span class="token builtin">int32</span>
	resp <span class="token operator">=</span> <span class="token operator">&amp;</span>msg<span class="token punctuation">.</span>SearchMessageResp<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token keyword">if</span> total<span class="token punctuation">,</span> chatLogs<span class="token punctuation">,</span> err <span class="token operator">=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">SearchMessage</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>

	<span class="token keyword">var</span> <span class="token punctuation">(</span>
		sendIDs  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
		recvIDs  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
		groupIDs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
		sendMap  <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>
		recvMap  <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span>
		groupMap <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">*</span>sdkws<span class="token punctuation">.</span>GroupInfo<span class="token punctuation">)</span>
	<span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> chatLog <span class="token operator">:=</span> <span class="token keyword">range</span> chatLogs <span class="token punctuation">{</span>
		<span class="token keyword">if</span> chatLog<span class="token punctuation">.</span>SenderNickname <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span>
			sendIDs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>sendIDs<span class="token punctuation">,</span> chatLog<span class="token punctuation">.</span>SendID<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">switch</span> chatLog<span class="token punctuation">.</span>SessionType <span class="token punctuation">{</span>
		<span class="token keyword">case</span> constant<span class="token punctuation">.</span>SingleChatType<span class="token punctuation">:</span>
			recvIDs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>recvIDs<span class="token punctuation">,</span> chatLog<span class="token punctuation">.</span>RecvID<span class="token punctuation">)</span>
		<span class="token keyword">case</span> constant<span class="token punctuation">.</span>GroupChatType<span class="token punctuation">,</span> constant<span class="token punctuation">.</span>SuperGroupChatType<span class="token punctuation">:</span>
			groupIDs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>groupIDs<span class="token punctuation">,</span> chatLog<span class="token punctuation">.</span>GroupID<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>sendIDs<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		sendInfos<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>User<span class="token punctuation">.</span><span class="token function">GetUsersInfo</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> sendIDs<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
		<span class="token punctuation">}</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> sendInfo <span class="token operator">:=</span> <span class="token keyword">range</span> sendInfos <span class="token punctuation">{</span>
			sendMap<span class="token punctuation">[</span>sendInfo<span class="token punctuation">.</span>UserID<span class="token punctuation">]</span> <span class="token operator">=</span> sendInfo<span class="token punctuation">.</span>Nickname
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>recvIDs<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		recvInfos<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>User<span class="token punctuation">.</span><span class="token function">GetUsersInfo</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> recvIDs<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
		<span class="token punctuation">}</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> recvInfo <span class="token operator">:=</span> <span class="token keyword">range</span> recvInfos <span class="token punctuation">{</span>
			recvMap<span class="token punctuation">[</span>recvInfo<span class="token punctuation">.</span>UserID<span class="token punctuation">]</span> <span class="token operator">=</span> recvInfo<span class="token punctuation">.</span>Nickname
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>groupIDs<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		groupInfos<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>Group<span class="token punctuation">.</span><span class="token function">GetGroupInfos</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> groupIDs<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
		<span class="token punctuation">}</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> groupInfo <span class="token operator">:=</span> <span class="token keyword">range</span> groupInfos <span class="token punctuation">{</span>
			groupMap<span class="token punctuation">[</span>groupInfo<span class="token punctuation">.</span>GroupID<span class="token punctuation">]</span> <span class="token operator">=</span> groupInfo
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> chatLog <span class="token operator">:=</span> <span class="token keyword">range</span> chatLogs <span class="token punctuation">{</span>
		pbchatLog <span class="token operator">:=</span> <span class="token operator">&amp;</span>msg<span class="token punctuation">.</span>ChatLog<span class="token punctuation">{</span><span class="token punctuation">}</span>
		utils<span class="token punctuation">.</span><span class="token function">CopyStructFields</span><span class="token punctuation">(</span>pbchatLog<span class="token punctuation">,</span> chatLog<span class="token punctuation">)</span>
		pbchatLog<span class="token punctuation">.</span>SendTime <span class="token operator">=</span> chatLog<span class="token punctuation">.</span>SendTime
		pbchatLog<span class="token punctuation">.</span>CreateTime <span class="token operator">=</span> chatLog<span class="token punctuation">.</span>CreateTime
		<span class="token keyword">if</span> chatLog<span class="token punctuation">.</span>SenderNickname <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span>
			pbchatLog<span class="token punctuation">.</span>SenderNickname <span class="token operator">=</span> sendMap<span class="token punctuation">[</span>chatLog<span class="token punctuation">.</span>SendID<span class="token punctuation">]</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">switch</span> chatLog<span class="token punctuation">.</span>SessionType <span class="token punctuation">{</span>
		<span class="token keyword">case</span> constant<span class="token punctuation">.</span>SingleChatType<span class="token punctuation">:</span>
			pbchatLog<span class="token punctuation">.</span>RecvNickname <span class="token operator">=</span> recvMap<span class="token punctuation">[</span>chatLog<span class="token punctuation">.</span>RecvID<span class="token punctuation">]</span>

		<span class="token keyword">case</span> constant<span class="token punctuation">.</span>GroupChatType<span class="token punctuation">,</span> constant<span class="token punctuation">.</span>SuperGroupChatType<span class="token punctuation">:</span>
			pbchatLog<span class="token punctuation">.</span>SenderFaceURL <span class="token operator">=</span> groupMap<span class="token punctuation">[</span>chatLog<span class="token punctuation">.</span>GroupID<span class="token punctuation">]</span><span class="token punctuation">.</span>FaceURL
			pbchatLog<span class="token punctuation">.</span>GroupMemberCount <span class="token operator">=</span> groupMap<span class="token punctuation">[</span>chatLog<span class="token punctuation">.</span>GroupID<span class="token punctuation">]</span><span class="token punctuation">.</span>MemberCount
			pbchatLog<span class="token punctuation">.</span>RecvID <span class="token operator">=</span> groupMap<span class="token punctuation">[</span>chatLog<span class="token punctuation">.</span>GroupID<span class="token punctuation">]</span><span class="token punctuation">.</span>GroupID
			pbchatLog<span class="token punctuation">.</span>GroupName <span class="token operator">=</span> groupMap<span class="token punctuation">[</span>chatLog<span class="token punctuation">.</span>GroupID<span class="token punctuation">]</span><span class="token punctuation">.</span>GroupName
			pbchatLog<span class="token punctuation">.</span>GroupOwner <span class="token operator">=</span> groupMap<span class="token punctuation">[</span>chatLog<span class="token punctuation">.</span>GroupID<span class="token punctuation">]</span><span class="token punctuation">.</span>OwnerUserID
			pbchatLog<span class="token punctuation">.</span>GroupType <span class="token operator">=</span> groupMap<span class="token punctuation">[</span>chatLog<span class="token punctuation">.</span>GroupID<span class="token punctuation">]</span><span class="token punctuation">.</span>GroupType
		<span class="token punctuation">}</span>
		resp<span class="token punctuation">.</span>ChatLogs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>ChatLogs<span class="token punctuation">,</span> pbchatLog<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	resp<span class="token punctuation">.</span>ChatLogsNum <span class="token operator">=</span> total
	<span class="token keyword">return</span> resp<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="request-and-response-structures" tabindex="-1"><a class="header-anchor" href="#request-and-response-structures" aria-hidden="true">#</a> Request and Response Structures</h2>
<p>Understanding the request and response structures is crucial. The <code v-pre>SearchMessageReq</code> and <code v-pre>SearchMessageResp</code> structs define the data format for the request and response of the search message functionality.</p>
<h3 id="structures" tabindex="-1"><a class="header-anchor" href="#structures" aria-hidden="true">#</a> Structures:</h3>
<ul>
<li><code v-pre>SearchMessageReq</code></li>
<li><code v-pre>SearchMessageResp</code></li>
</ul>
<h2 id="database-interaction" tabindex="-1"><a class="header-anchor" href="#database-interaction" aria-hidden="true">#</a> Database Interaction</h2>
<p>Finally, <code v-pre>pkg/common/db/controller/msg.go</code> contains the database logic. This file handles the actual querying of messages and the preparation of data to be sent back to the client.</p>
<h3 id="key-file-pkg-common-db-controller-msg-go" tabindex="-1"><a class="header-anchor" href="#key-file-pkg-common-db-controller-msg-go" aria-hidden="true">#</a> Key File: <code v-pre>pkg/common/db/controller/msg.go</code></h3>
<ul>
<li><strong>Role</strong>: Database querying and data preparation.</li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>db <span class="token operator">*</span>commonMsgDatabase<span class="token punctuation">)</span> <span class="token function">SearchMessage</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> req <span class="token operator">*</span>pbmsg<span class="token punctuation">.</span>SearchMessageReq<span class="token punctuation">)</span> <span class="token punctuation">(</span>total <span class="token builtin">int32</span><span class="token punctuation">,</span> msgData <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>sdkws<span class="token punctuation">.</span>MsgData<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> totalMsgs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>sdkws<span class="token punctuation">.</span>MsgData
	total<span class="token punctuation">,</span> msgs<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span>msgDocDatabase<span class="token punctuation">.</span><span class="token function">SearchMessage</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> msg <span class="token operator">:=</span> <span class="token keyword">range</span> msgs <span class="token punctuation">{</span>
		<span class="token keyword">if</span> msg<span class="token punctuation">.</span>IsRead <span class="token punctuation">{</span>
			msg<span class="token punctuation">.</span>Msg<span class="token punctuation">.</span>IsRead <span class="token operator">=</span> <span class="token boolean">true</span>
		<span class="token punctuation">}</span>
		totalMsgs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>totalMsgs<span class="token punctuation">,</span> convert<span class="token punctuation">.</span><span class="token function">MsgDB2Pb</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>Msg<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> total<span class="token punctuation">,</span> totalMsgs<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>db <span class="token operator">*</span>commonMsgDatabase<span class="token punctuation">)</span> <span class="token function">ConvertMsgsDocLen</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> conversationIDs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	db<span class="token punctuation">.</span>msgDocDatabase<span class="token punctuation">.</span><span class="token function">ConvertMsgsDocLen</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> conversationIDs<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="searchmsg-api-documentation" tabindex="-1"><a class="header-anchor" href="#searchmsg-api-documentation" aria-hidden="true">#</a> SearchMsg API Documentation</h2>
<h3 id="overview" tabindex="-1"><a class="header-anchor" href="#overview" aria-hidden="true">#</a> Overview</h3>
<p>The <code v-pre>SearchMsg</code> API allows users to search for messages based on various criteria. This document details the API request structure, required parameters, and examples of use.</p>
<h3 id="request-url" tabindex="-1"><a class="header-anchor" href="#request-url" aria-hidden="true">#</a> Request URL</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>http://x.x.x.x:10002/msg/search_msg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="header-parameters" tabindex="-1"><a class="header-anchor" href="#header-parameters" aria-hidden="true">#</a> Header Parameters</h3>
<table>
<thead>
<tr>
<th>Header Name</th>
<th>Example Value</th>
<th>Required</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>operationID</td>
<td>1646445464564</td>
<td>Yes</td>
<td>string</td>
<td>Used for global link tracing</td>
</tr>
<tr>
<td>token</td>
<td>eyJhbxxxx3Xs</td>
<td>Yes</td>
<td>string</td>
<td>Administrator's token</td>
</tr>
</tbody>
</table>
<h3 id="request-parameters" tabindex="-1"><a class="header-anchor" href="#request-parameters" aria-hidden="true">#</a> Request Parameters</h3>
<h4 id="json-payload" tabindex="-1"><a class="header-anchor" href="#json-payload" aria-hidden="true">#</a> JSON Payload</h4>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"sendID"</span><span class="token operator">:</span> <span class="token string">"exampleSender"</span><span class="token punctuation">,</span>
  <span class="token property">"recvID"</span><span class="token operator">:</span> <span class="token string">"exampleReceiver"</span><span class="token punctuation">,</span>
  <span class="token property">"msgType"</span><span class="token operator">:</span> <span class="token number">101</span><span class="token punctuation">,</span>
  <span class="token property">"sendTime"</span><span class="token operator">:</span> <span class="token string">"2023-01-01T00:00:00Z"</span><span class="token punctuation">,</span>
  <span class="token property">"sessionType"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">"pagination"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"pageNumber"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"showNumber"</span><span class="token operator">:</span> <span class="token number">20</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="parameters-description" tabindex="-1"><a class="header-anchor" href="#parameters-description" aria-hidden="true">#</a> Parameters Description</h4>
<table>
<thead>
<tr>
<th>Field Name</th>
<th>Required</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>sendID</td>
<td>Yes</td>
<td>string</td>
<td>Sender's ID</td>
</tr>
<tr>
<td>recvID</td>
<td>Yes</td>
<td>string</td>
<td>Receiver's ID</td>
</tr>
<tr>
<td>msgType</td>
<td>No</td>
<td>int</td>
<td>Type of the message</td>
</tr>
<tr>
<td>sendTime</td>
<td>No</td>
<td>string</td>
<td>Time when the message was sent (ISO 8601 format)</td>
</tr>
<tr>
<td>sessionType</td>
<td>Yes</td>
<td>int</td>
<td>Type of session (e.g., 1 for individual chat)</td>
</tr>
<tr>
<td>pagination</td>
<td>No</td>
<td>object</td>
<td>Pagination details</td>
</tr>
<tr>
<td>pagination.pageNumber</td>
<td>No</td>
<td>int</td>
<td>Page number for pagination</td>
</tr>
<tr>
<td>pagination.showNumber</td>
<td>No</td>
<td>int</td>
<td>Number of items per page</td>
</tr>
</tbody>
</table>
<h3 id="response" tabindex="-1"><a class="header-anchor" href="#response" aria-hidden="true">#</a> Response</h3>
<h4 id="success-response" tabindex="-1"><a class="header-anchor" href="#success-response" aria-hidden="true">#</a> Success Response</h4>
<p><strong>Code</strong>: 200 OK</p>
<p><strong>Content Example</strong>:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token property">"data"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"messages"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"msg123"</span><span class="token punctuation">,</span>
        <span class="token property">"content"</span><span class="token operator">:</span> <span class="token string">"Hello world!"</span><span class="token punctuation">,</span>
        ...
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"total"</span><span class="token operator">:</span> <span class="token number">150</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="error-response" tabindex="-1"><a class="header-anchor" href="#error-response" aria-hidden="true">#</a> Error Response</h3>
<p><strong>Code</strong>: 400 Bad Request</p>
<p><strong>Content Example</strong>:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"status"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token property">"error"</span><span class="token operator">:</span> <span class="token string">"Invalid request parameters"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="remarks" tabindex="-1"><a class="header-anchor" href="#remarks" aria-hidden="true">#</a> Remarks</h3>
<ul>
<li>The <code v-pre>sendTime</code> should be in ISO 8601 format for consistency.</li>
<li>Ensure that the <code v-pre>pagination</code> object is used correctly to manage large datasets.</li>
<li>The <code v-pre>msgType</code> field is optional and can be used to filter messages by type.</li>
</ul>
<h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2>
<p>This document has traced the path from an API endpoint definition to the RPC method execution within the OpenIM framework, using the <code v-pre>SearchMsg</code> functionality as an example. Understanding this flow is crucial for developers working with OpenIM, as it provides insights into the framework's design and operation.</p>
</div></template>


