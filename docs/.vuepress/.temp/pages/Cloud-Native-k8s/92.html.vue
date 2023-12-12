<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第92节" tabindex="-1"><a class="header-anchor" href="#第92节" aria-hidden="true">#</a> 第92节</h1>
<div><a href = '91.md' style='float:left'>⬆️上一节🔗  </a><a href = '93.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Copyright © 2023 OpenIM. All rights reserved.</span>
<span class="token comment">//</span>
<span class="token comment">// Licensed under the Apache License, Version 2.0 (the "License");</span>
<span class="token comment">// you may not use this file except in compliance with the License.</span>
<span class="token comment">// You may obtain a copy of the License at</span>
<span class="token comment">//</span>
<span class="token comment">//     http://www.apache.org/licenses/LICENSE-2.0</span>
<span class="token comment">//</span>
<span class="token comment">// Unless required by applicable law or agreed to in writing, software</span>
<span class="token comment">// distributed under the License is distributed on an "AS IS" BASIS,</span>
<span class="token comment">// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.</span>
<span class="token comment">// See the License for the specific language governing permissions and</span>
<span class="token comment">// limitations under the License.</span>

<span class="token keyword">package</span> msg

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	utils2 <span class="token string">"github.com/OpenIMSDK/tools/utils"</span>

	<span class="token string">"github.com/redis/go-redis/v9"</span>

	cbapi <span class="token string">"github.com/openimsdk/open-im-server/v3/pkg/callbackstruct"</span>
	<span class="token string">"github.com/OpenIMSDK/protocol/constant"</span>
	<span class="token string">"github.com/OpenIMSDK/protocol/msg"</span>
	<span class="token string">"github.com/OpenIMSDK/protocol/sdkws"</span>
	<span class="token string">"github.com/OpenIMSDK/tools/errs"</span>
	<span class="token string">"github.com/OpenIMSDK/tools/log"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>msgServer<span class="token punctuation">)</span> <span class="token function">GetConversationsHasReadAndMaxSeq</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> req <span class="token operator">*</span>msg<span class="token punctuation">.</span>GetConversationsHasReadAndMaxSeqReq<span class="token punctuation">)</span> <span class="token punctuation">(</span>resp <span class="token operator">*</span>msg<span class="token punctuation">.</span>GetConversationsHasReadAndMaxSeqResp<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> conversationIDs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>ConversationIDs<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		conversationIDs<span class="token punctuation">,</span> err <span class="token operator">=</span> m<span class="token punctuation">.</span>ConversationLocalCache<span class="token punctuation">.</span><span class="token function">GetConversationIDs</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		conversationIDs <span class="token operator">=</span> req<span class="token punctuation">.</span>ConversationIDs
	<span class="token punctuation">}</span>
	hasReadSeqs<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">GetHasReadSeqs</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> conversationIDs<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	conversations<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>Conversation<span class="token punctuation">.</span><span class="token function">GetConversations</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> conversationIDs<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	conversationMaxSeqMap <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">int64</span><span class="token punctuation">)</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> conversation <span class="token operator">:=</span> <span class="token keyword">range</span> conversations <span class="token punctuation">{</span>
		<span class="token keyword">if</span> conversation<span class="token punctuation">.</span>MaxSeq <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			conversationMaxSeqMap<span class="token punctuation">[</span>conversation<span class="token punctuation">.</span>ConversationID<span class="token punctuation">]</span> <span class="token operator">=</span> conversation<span class="token punctuation">.</span>MaxSeq
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	maxSeqs<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">GetMaxSeqs</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> conversationIDs<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	resp <span class="token operator">=</span> <span class="token operator">&amp;</span>msg<span class="token punctuation">.</span>GetConversationsHasReadAndMaxSeqResp<span class="token punctuation">{</span>Seqs<span class="token punctuation">:</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">*</span>msg<span class="token punctuation">.</span>Seqs<span class="token punctuation">)</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> conversarionID<span class="token punctuation">,</span> maxSeq <span class="token operator">:=</span> <span class="token keyword">range</span> maxSeqs <span class="token punctuation">{</span>
		resp<span class="token punctuation">.</span>Seqs<span class="token punctuation">[</span>conversarionID<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token operator">&amp;</span>msg<span class="token punctuation">.</span>Seqs<span class="token punctuation">{</span>
			HasReadSeq<span class="token punctuation">:</span> hasReadSeqs<span class="token punctuation">[</span>conversarionID<span class="token punctuation">]</span><span class="token punctuation">,</span>
			MaxSeq<span class="token punctuation">:</span>     maxSeq<span class="token punctuation">,</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> v<span class="token punctuation">,</span> ok <span class="token operator">:=</span> conversationMaxSeqMap<span class="token punctuation">[</span>conversarionID<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
			resp<span class="token punctuation">.</span>Seqs<span class="token punctuation">[</span>conversarionID<span class="token punctuation">]</span><span class="token punctuation">.</span>MaxSeq <span class="token operator">=</span> v
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> resp<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>msgServer<span class="token punctuation">)</span> <span class="token function">SetConversationHasReadSeq</span><span class="token punctuation">(</span>
	ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span>
	req <span class="token operator">*</span>msg<span class="token punctuation">.</span>SetConversationHasReadSeqReq<span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token punctuation">(</span>resp <span class="token operator">*</span>msg<span class="token punctuation">.</span>SetConversationHasReadSeqResp<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	maxSeq<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">GetMaxSeq</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> req<span class="token punctuation">.</span>HasReadSeq <span class="token operator">></span> maxSeq <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> errs<span class="token punctuation">.</span>ErrArgs<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span><span class="token string">"hasReadSeq must not be bigger than maxSeq"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">SetHasReadSeq</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>HasReadSeq<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">sendMarkAsReadNotification</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">,</span> constant<span class="token punctuation">.</span>SingleChatType<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span>
		req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span>HasReadSeq<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>msg<span class="token punctuation">.</span>SetConversationHasReadSeqResp<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>msgServer<span class="token punctuation">)</span> <span class="token function">MarkMsgsAsRead</span><span class="token punctuation">(</span>
	ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span>
	req <span class="token operator">*</span>msg<span class="token punctuation">.</span>MarkMsgsAsReadReq<span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token punctuation">(</span>resp <span class="token operator">*</span>msg<span class="token punctuation">.</span>MarkMsgsAsReadResp<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>Seqs<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> errs<span class="token punctuation">.</span>ErrArgs<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span><span class="token string">"seqs must not be empty"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	maxSeq<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">GetMaxSeq</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	hasReadSeq <span class="token operator">:=</span> req<span class="token punctuation">.</span>Seqs<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>Seqs<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span>
	<span class="token keyword">if</span> hasReadSeq <span class="token operator">></span> maxSeq <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> errs<span class="token punctuation">.</span>ErrArgs<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span><span class="token string">"hasReadSeq must not be bigger than maxSeq"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	conversation<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>Conversation<span class="token punctuation">.</span><span class="token function">GetConversation</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">MarkSingleChatMsgsAsRead</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>Seqs<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	currentHasReadSeq<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">GetHasReadSeq</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> errs<span class="token punctuation">.</span><span class="token function">Unwrap</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">!=</span> redis<span class="token punctuation">.</span>Nil <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> hasReadSeq <span class="token operator">></span> currentHasReadSeq <span class="token punctuation">{</span>
		err <span class="token operator">=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">SetHasReadSeq</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">,</span> hasReadSeq<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">sendMarkAsReadNotification</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">,</span> conversation<span class="token punctuation">.</span>ConversationType<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span>
		m<span class="token punctuation">.</span><span class="token function">conversationAndGetRecvID</span><span class="token punctuation">(</span>conversation<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">)</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span>Seqs<span class="token punctuation">,</span> hasReadSeq<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>msg<span class="token punctuation">.</span>MarkMsgsAsReadResp<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>msgServer<span class="token punctuation">)</span> <span class="token function">MarkConversationAsRead</span><span class="token punctuation">(</span>
	ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span>
	req <span class="token operator">*</span>msg<span class="token punctuation">.</span>MarkConversationAsReadReq<span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token punctuation">(</span>resp <span class="token operator">*</span>msg<span class="token punctuation">.</span>MarkConversationAsReadResp<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	conversation<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>Conversation<span class="token punctuation">.</span><span class="token function">GetConversation</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	hasReadSeq<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">GetHasReadSeq</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> errs<span class="token punctuation">.</span><span class="token function">Unwrap</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">!=</span> redis<span class="token punctuation">.</span>Nil <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">var</span> seqs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int64</span>

	log<span class="token punctuation">.</span><span class="token function">ZDebug</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">"MarkConversationAsRead"</span><span class="token punctuation">,</span> <span class="token string">"hasReadSeq"</span><span class="token punctuation">,</span> hasReadSeq<span class="token punctuation">,</span>
		<span class="token string">"req.HasReadSeq"</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span>HasReadSeq<span class="token punctuation">)</span>
	<span class="token keyword">if</span> conversation<span class="token punctuation">.</span>ConversationType <span class="token operator">==</span> constant<span class="token punctuation">.</span>SingleChatType <span class="token punctuation">{</span>
		<span class="token keyword">for</span> i <span class="token operator">:=</span> hasReadSeq <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> req<span class="token punctuation">.</span>HasReadSeq<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
			seqs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>seqs<span class="token punctuation">,</span> i<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">//avoid client missed call MarkConversationMessageAsRead by order</span>
		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> val <span class="token operator">:=</span> <span class="token keyword">range</span> req<span class="token punctuation">.</span>Seqs <span class="token punctuation">{</span>
			<span class="token keyword">if</span> <span class="token operator">!</span>utils2<span class="token punctuation">.</span><span class="token function">Contain</span><span class="token punctuation">(</span>val<span class="token punctuation">,</span> seqs<span class="token operator">...</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
				seqs <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>seqs<span class="token punctuation">,</span> val<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>seqs<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">ZDebug</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">"MarkConversationAsRead"</span><span class="token punctuation">,</span> <span class="token string">"seqs"</span><span class="token punctuation">,</span> seqs<span class="token punctuation">,</span> <span class="token string">"conversationID"</span><span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">MarkSingleChatMsgsAsRead</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">,</span> seqs<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> req<span class="token punctuation">.</span>HasReadSeq <span class="token operator">></span> hasReadSeq <span class="token punctuation">{</span>
			err <span class="token operator">=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">SetHasReadSeq</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>HasReadSeq<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
			<span class="token punctuation">}</span>
			hasReadSeq <span class="token operator">=</span> req<span class="token punctuation">.</span>HasReadSeq
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">sendMarkAsReadNotification</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">,</span> conversation<span class="token punctuation">.</span>ConversationType<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span>
			m<span class="token punctuation">.</span><span class="token function">conversationAndGetRecvID</span><span class="token punctuation">(</span>conversation<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">)</span><span class="token punctuation">,</span> seqs<span class="token punctuation">,</span> hasReadSeq<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
		<span class="token punctuation">}</span>
		
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> conversation<span class="token punctuation">.</span>ConversationType <span class="token operator">==</span> constant<span class="token punctuation">.</span>SuperGroupChatType <span class="token operator">||</span>
		conversation<span class="token punctuation">.</span>ConversationType <span class="token operator">==</span> constant<span class="token punctuation">.</span>NotificationChatType <span class="token punctuation">{</span>
		<span class="token keyword">if</span> req<span class="token punctuation">.</span>HasReadSeq <span class="token operator">></span> hasReadSeq <span class="token punctuation">{</span>
			err <span class="token operator">=</span> m<span class="token punctuation">.</span>MsgDatabase<span class="token punctuation">.</span><span class="token function">SetHasReadSeq</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">,</span> req<span class="token punctuation">.</span>HasReadSeq<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
			<span class="token punctuation">}</span>
			hasReadSeq <span class="token operator">=</span> req<span class="token punctuation">.</span>HasReadSeq
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> err <span class="token operator">=</span> m<span class="token punctuation">.</span><span class="token function">sendMarkAsReadNotification</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>ConversationID<span class="token punctuation">,</span> constant<span class="token punctuation">.</span>SingleChatType<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span>
			req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> seqs<span class="token punctuation">,</span> hasReadSeq<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
		<span class="token punctuation">}</span>

	<span class="token punctuation">}</span>

	reqCall <span class="token operator">:=</span> <span class="token operator">&amp;</span>cbapi<span class="token punctuation">.</span>CallbackGroupMsgReadReq<span class="token punctuation">{</span>
		SendID<span class="token punctuation">:</span>       conversation<span class="token punctuation">.</span>OwnerUserID<span class="token punctuation">,</span>
		ReceiveID<span class="token punctuation">:</span>    req<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span>
		UnreadMsgNum<span class="token punctuation">:</span> req<span class="token punctuation">.</span>HasReadSeq<span class="token punctuation">,</span>
		ContentType<span class="token punctuation">:</span>  <span class="token function">int64</span><span class="token punctuation">(</span>conversation<span class="token punctuation">.</span>ConversationType<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">CallbackGroupMsgRead</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> reqCall<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token operator">&amp;</span>msg<span class="token punctuation">.</span>MarkConversationAsReadResp<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>msgServer<span class="token punctuation">)</span> <span class="token function">sendMarkAsReadNotification</span><span class="token punctuation">(</span>
	ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span>
	conversationID <span class="token builtin">string</span><span class="token punctuation">,</span>
	sessionType <span class="token builtin">int32</span><span class="token punctuation">,</span>
	sendID<span class="token punctuation">,</span> recvID <span class="token builtin">string</span><span class="token punctuation">,</span>
	seqs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int64</span><span class="token punctuation">,</span>
	hasReadSeq <span class="token builtin">int64</span><span class="token punctuation">,</span>
<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	tips <span class="token operator">:=</span> <span class="token operator">&amp;</span>sdkws<span class="token punctuation">.</span>MarkAsReadTips<span class="token punctuation">{</span>
		MarkAsReadUserID<span class="token punctuation">:</span> sendID<span class="token punctuation">,</span>
		ConversationID<span class="token punctuation">:</span>   conversationID<span class="token punctuation">,</span>
		Seqs<span class="token punctuation">:</span>             seqs<span class="token punctuation">,</span>
		HasReadSeq<span class="token punctuation">:</span>       hasReadSeq<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	err <span class="token operator">:=</span> m<span class="token punctuation">.</span>notificationSender<span class="token punctuation">.</span><span class="token function">NotificationWithSesstionType</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> sendID<span class="token punctuation">,</span> recvID<span class="token punctuation">,</span> constant<span class="token punctuation">.</span>HasReadReceipt<span class="token punctuation">,</span> sessionType<span class="token punctuation">,</span> tips<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">ZWarn</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">"send has read Receipt err"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>标准化的：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>// Copyright © <span class="token number">2023</span> OpenIM. All rights reserved.
//
// Licensed under the Apache License, Version <span class="token number">2.0</span> <span class="token punctuation">(</span>the <span class="token string">"License"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
// you may not use this <span class="token function">file</span> except <span class="token keyword">in</span> compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to <span class="token keyword">in</span> writing, software
// distributed under the License is distributed on an <span class="token string">"AS IS"</span> BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License <span class="token keyword">for</span> the specific language governing permissions and
// limitations under the License.

package msg

<span class="token function">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	cbapi <span class="token string">"github.com/openimsdk/open-im-server/v3/pkg/callbackstruct"</span>

	utils2 <span class="token string">"github.com/OpenIMSDK/tools/utils"</span>

	<span class="token string">"github.com/redis/go-redis/v9"</span>

	<span class="token string">"github.com/OpenIMSDK/protocol/constant"</span>
	<span class="token string">"github.com/OpenIMSDK/protocol/conversation"</span>
	<span class="token string">"github.com/OpenIMSDK/protocol/msg"</span>
	<span class="token string">"github.com/OpenIMSDK/protocol/sdkws"</span>
	<span class="token string">"github.com/OpenIMSDK/tools/errs"</span>
	<span class="token string">"github.com/OpenIMSDK/tools/log"</span>
<span class="token punctuation">)</span>

// GetConversationsReq get the session list request
func <span class="token punctuation">(</span>m *msgServer<span class="token punctuation">)</span> GetConversationsHasReadAndMaxSeq<span class="token punctuation">(</span>ctx context.Context, req *msg.GetConversationsHasReadAndMaxSeqReq<span class="token punctuation">)</span> <span class="token punctuation">(</span>resp *msg.GetConversationsHasReadAndMaxSeqResp, err error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	var conversationIDs <span class="token punctuation">[</span><span class="token punctuation">]</span>string
	<span class="token keyword">if</span> len<span class="token punctuation">(</span>req.ConversationIDs<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		conversationIDs, err <span class="token operator">=</span> m.ConversationLocalCache.GetConversationIDs<span class="token punctuation">(</span>ctx, req.UserID<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
			<span class="token builtin class-name">return</span> nil, err
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		conversationIDs <span class="token operator">=</span> req.ConversationIDs
	<span class="token punctuation">}</span>
	hasReadSeqs, err :<span class="token operator">=</span> m.MsgDatabase.GetHasReadSeqs<span class="token punctuation">(</span>ctx, req.UserID, conversationIDs<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> nil, err
	<span class="token punctuation">}</span>
	conversations, err :<span class="token operator">=</span> m.Conversation.GetConversations<span class="token punctuation">(</span>ctx, req.UserID, conversationIDs<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> nil, err
	<span class="token punctuation">}</span>
	conversationMaxSeqMap :<span class="token operator">=</span> make<span class="token punctuation">(</span>map<span class="token punctuation">[</span>string<span class="token punctuation">]</span>int64<span class="token punctuation">)</span>
	<span class="token keyword">for</span> _, conversation :<span class="token operator">=</span> range conversations <span class="token punctuation">{</span>
		<span class="token keyword">if</span> conversation.MaxSeq <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
			conversationMaxSeqMap<span class="token punctuation">[</span>conversation.ConversationID<span class="token punctuation">]</span> <span class="token operator">=</span> conversation.MaxSeq
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	maxSeqs, err :<span class="token operator">=</span> m.MsgDatabase.GetMaxSeqs<span class="token punctuation">(</span>ctx, conversationIDs<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> nil, err
	<span class="token punctuation">}</span>
	resp <span class="token operator">=</span> <span class="token operator">&amp;</span>msg.GetConversationsHasReadAndMaxSeqResp<span class="token punctuation">{</span>Seqs: make<span class="token punctuation">(</span>map<span class="token punctuation">[</span>string<span class="token punctuation">]</span>*msg.Seqs<span class="token punctuation">)</span><span class="token punctuation">}</span>
	<span class="token keyword">for</span> conversarionID, maxSeq :<span class="token operator">=</span> range maxSeqs <span class="token punctuation">{</span>
		resp.Seqs<span class="token punctuation">[</span>conversarionID<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token operator">&amp;</span>msg.Seqs<span class="token punctuation">{</span>
			HasReadSeq: hasReadSeqs<span class="token punctuation">[</span>conversarionID<span class="token punctuation">]</span>,
			MaxSeq:     maxSeq,
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> v, ok :<span class="token operator">=</span> conversationMaxSeqMap<span class="token punctuation">[</span>conversarionID<span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
			resp.Seqs<span class="token punctuation">[</span>conversarionID<span class="token punctuation">]</span>.MaxSeq <span class="token operator">=</span> <span class="token function">v</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token builtin class-name">return</span> resp, nil
<span class="token punctuation">}</span>

func <span class="token punctuation">(</span>m *msgServer<span class="token punctuation">)</span> SetConversationHasReadSeq<span class="token punctuation">(</span>ctx context.Context, req *msg.SetConversationHasReadSeqReq<span class="token punctuation">)</span> <span class="token punctuation">(</span>resp *msg.SetConversationHasReadSeqResp, err error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	maxSeq, err :<span class="token operator">=</span> m.MsgDatabase.GetMaxSeq<span class="token punctuation">(</span>ctx, req.ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> req.HasReadSeq <span class="token operator">></span> maxSeq <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> nil, errs.ErrArgs.Wrap<span class="token punctuation">(</span><span class="token string">"hasReadSeq must not be bigger than maxSeq"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err :<span class="token operator">=</span> m.MsgDatabase.SetHasReadSeq<span class="token punctuation">(</span>ctx, req.UserID, req.ConversationID, req.HasReadSeq<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> nil, err
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">=</span> m.sendMarkAsReadNotification<span class="token punctuation">(</span>ctx, req.ConversationID, constant.SingleChatType, req.UserID,
		req.UserID, nil, req.HasReadSeq<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span>
	<span class="token punctuation">}</span>
	<span class="token builtin class-name">return</span> <span class="token operator">&amp;</span>msg.SetConversationHasReadSeqResp<span class="token punctuation">{</span><span class="token punctuation">}</span>, nil
<span class="token punctuation">}</span>

// MarkMsgsAsRead mark the message as <span class="token builtin class-name">read</span>
func <span class="token punctuation">(</span>m *msgServer<span class="token punctuation">)</span> MarkMsgsAsRead<span class="token punctuation">(</span>ctx context.Context, req *msg.MarkMsgsAsReadReq<span class="token punctuation">)</span> <span class="token punctuation">(</span>resp *msg.MarkMsgsAsReadResp, err error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> len<span class="token punctuation">(</span>req.Seqs<span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">1</span> <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> nil, errs.ErrArgs.Wrap<span class="token punctuation">(</span><span class="token string">"seqs must not be empty"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	maxSeq, err :<span class="token operator">=</span> m.MsgDatabase.GetMaxSeq<span class="token punctuation">(</span>ctx, req.ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span>
	<span class="token punctuation">}</span>
	hasReadSeq :<span class="token operator">=</span> req.Seqs<span class="token punctuation">[</span>len<span class="token punctuation">(</span>req.Seqs<span class="token punctuation">)</span>-1<span class="token punctuation">]</span>
	<span class="token keyword">if</span> hasReadSeq <span class="token operator">></span> maxSeq <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> nil, errs.ErrArgs.Wrap<span class="token punctuation">(</span><span class="token string">"hasReadSeq must not be bigger than maxSeq"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	conversation, err :<span class="token operator">=</span> m.Conversation.GetConversation<span class="token punctuation">(</span>ctx, req.UserID, req.ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">=</span> m.MsgDatabase.MarkSingleChatMsgsAsRead<span class="token punctuation">(</span>ctx, req.UserID, req.ConversationID, req.Seqs<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span>
	<span class="token punctuation">}</span>
	currentHasReadSeq, err :<span class="token operator">=</span> m.MsgDatabase.GetHasReadSeq<span class="token punctuation">(</span>ctx, req.UserID, req.ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token operator">&amp;&amp;</span> errs.Unwrap<span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">!=</span> redis.Nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> hasReadSeq <span class="token operator">></span> currentHasReadSeq <span class="token punctuation">{</span>
		err <span class="token operator">=</span> m.MsgDatabase.SetHasReadSeq<span class="token punctuation">(</span>ctx, req.UserID, req.ConversationID, hasReadSeq<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
			<span class="token builtin class-name">return</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">=</span> m.sendMarkAsReadNotification<span class="token punctuation">(</span>ctx, req.ConversationID, conversation.ConversationType, req.UserID,
		m.conversationAndGetRecvID<span class="token punctuation">(</span>conversation, req.UserID<span class="token punctuation">)</span>, req.Seqs, hasReadSeq<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span>
	<span class="token punctuation">}</span>
	<span class="token builtin class-name">return</span> <span class="token operator">&amp;</span>msg.MarkMsgsAsReadResp<span class="token punctuation">{</span><span class="token punctuation">}</span>, nil
<span class="token punctuation">}</span>

func <span class="token punctuation">(</span>m *msgServer<span class="token punctuation">)</span> MarkConversationAsRead<span class="token punctuation">(</span>ctx context.Context, req *msg.MarkConversationAsReadReq<span class="token punctuation">)</span> <span class="token punctuation">(</span>resp *msg.MarkConversationAsReadResp, err error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	conversation, err :<span class="token operator">=</span> m.Conversation.GetConversation<span class="token punctuation">(</span>ctx, req.UserID, req.ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> nil, err
	<span class="token punctuation">}</span>
	hasReadSeq, err :<span class="token operator">=</span> m.MsgDatabase.GetHasReadSeq<span class="token punctuation">(</span>ctx, req.UserID, req.ConversationID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token operator">&amp;&amp;</span> errs.Unwrap<span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token operator">!=</span> redis.Nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> nil, err
	<span class="token punctuation">}</span>
	seqs :<span class="token operator">=</span> generateSeqs<span class="token punctuation">(</span>hasReadSeq, req<span class="token punctuation">)</span>

	<span class="token keyword">if</span> len<span class="token punctuation">(</span>seqs<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token operator">||</span> req.HasReadSeq <span class="token operator">></span> hasReadSeq <span class="token punctuation">{</span>
		err <span class="token operator">=</span> m.updateReadStatus<span class="token punctuation">(</span>ctx, req, conversation, seqs, hasReadSeq<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
			<span class="token builtin class-name">return</span> nil, err
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token builtin class-name">return</span> <span class="token operator">&amp;</span>msg.MarkConversationAsReadResp<span class="token punctuation">{</span><span class="token punctuation">}</span>, nil
<span class="token punctuation">}</span>

// generateSeqs generate <span class="token function">seq</span> that needs to be marked as <span class="token builtin class-name">read</span>
func generateSeqs<span class="token punctuation">(</span>hasReadSeq int64, req *msg.MarkConversationAsReadReq<span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>int64 <span class="token punctuation">{</span>
	var seqs <span class="token punctuation">[</span><span class="token punctuation">]</span>int64
	<span class="token keyword">for</span> _, val :<span class="token operator">=</span> range req.Seqs <span class="token punctuation">{</span>
		<span class="token keyword">if</span> val <span class="token operator">></span> hasReadSeq <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>utils2.Contain<span class="token punctuation">(</span>val, seqs<span class="token punctuation">..</span>.<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			seqs <span class="token operator">=</span> append<span class="token punctuation">(</span>seqs, val<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token builtin class-name">return</span> seqs
<span class="token punctuation">}</span>

func <span class="token punctuation">(</span>m *msgServer<span class="token punctuation">)</span> updateReadStatus<span class="token punctuation">(</span>ctx context.Context, req *msg.MarkConversationAsReadReq, conversation *conversation.Conversation, seqs <span class="token punctuation">[</span><span class="token punctuation">]</span>int64, hasReadSeq int64<span class="token punctuation">)</span> error <span class="token punctuation">{</span>
	<span class="token keyword">if</span> conversation.ConversationType <span class="token operator">==</span> constant.SingleChatType <span class="token operator">&amp;&amp;</span> len<span class="token punctuation">(</span>seqs<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span>
		log.ZDebug<span class="token punctuation">(</span>ctx, <span class="token string">"MarkConversationAsRead"</span>, <span class="token string">"seqs"</span>, seqs, <span class="token string">"conversationID"</span>, req.ConversationID<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err :<span class="token operator">=</span> m.MsgDatabase.MarkSingleChatMsgsAsRead<span class="token punctuation">(</span>ctx, req.UserID, req.ConversationID, seqs<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
			<span class="token builtin class-name">return</span> err
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	reqCall :<span class="token operator">=</span> <span class="token operator">&amp;</span>cbapi.CallbackGroupMsgReadReq<span class="token punctuation">{</span>
		SendID:       conversation.OwnerUserID,
		ReceiveID:    req.UserID,
		UnreadMsgNum: req.HasReadSeq,
		ContentType:  int64<span class="token punctuation">(</span>conversation.ConversationType<span class="token punctuation">)</span>,
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err :<span class="token operator">=</span> CallbackGroupMsgRead<span class="token punctuation">(</span>ctx, reqCall<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> err
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> req.HasReadSeq <span class="token operator">></span> hasReadSeq <span class="token punctuation">{</span>
		<span class="token keyword">if</span> err :<span class="token operator">=</span> m.MsgDatabase.SetHasReadSeq<span class="token punctuation">(</span>ctx, req.UserID, req.ConversationID, req.HasReadSeq<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
			<span class="token builtin class-name">return</span> err
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	recvID :<span class="token operator">=</span> m.conversationAndGetRecvID<span class="token punctuation">(</span>conversation, req.UserID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> conversation.ConversationType <span class="token operator">==</span> constant.SuperGroupChatType <span class="token operator">||</span> conversation.ConversationType <span class="token operator">==</span> constant.NotificationChatType <span class="token punctuation">{</span>
		recvID <span class="token operator">=</span> req.UserID
	<span class="token punctuation">}</span>

	<span class="token builtin class-name">return</span> m.sendMarkAsReadNotification<span class="token punctuation">(</span>ctx, req.ConversationID, conversation.ConversationType, req.UserID, recvID, seqs, req.HasReadSeq<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

func <span class="token punctuation">(</span>m *msgServer<span class="token punctuation">)</span> sendMarkAsReadNotification<span class="token punctuation">(</span>
	ctx context.Context,
	conversationID string,
	sessionType int32,
	sendID, recvID string,
	seqs <span class="token punctuation">[</span><span class="token punctuation">]</span>int64,
	hasReadSeq int64,
<span class="token punctuation">)</span> error <span class="token punctuation">{</span>
	tips :<span class="token operator">=</span> <span class="token operator">&amp;</span>sdkws.MarkAsReadTips<span class="token punctuation">{</span>
		MarkAsReadUserID: sendID,
		ConversationID:   conversationID,
		Seqs:             seqs,
		HasReadSeq:       hasReadSeq,
	<span class="token punctuation">}</span>
	err :<span class="token operator">=</span> m.notificationSender.NotificationWithSesstionType<span class="token punctuation">(</span>ctx, sendID, recvID, constant.HasReadReceipt, sessionType, tips<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		log.ZWarn<span class="token punctuation">(</span>ctx, <span class="token string">"send has read Receipt err"</span>, err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token builtin class-name">return</span> nil
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>阅读下面的代码：
<span class="token string">``</span><span class="token string">`
// Copyright © 2023 OpenIM. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package msg

import (
	"context"
	cbapi "github.com/openimsdk/open-im-server/v3/pkg/callbackstruct"

	utils2 "github.com/OpenIMSDK/tools/utils"

	"github.com/redis/go-redis/v9"

	"github.com/OpenIMSDK/protocol/constant"
	"github.com/OpenIMSDK/protocol/conversation"
	"github.com/OpenIMSDK/protocol/msg"
	"github.com/OpenIMSDK/protocol/sdkws"
	"github.com/OpenIMSDK/tools/errs"
	"github.com/OpenIMSDK/tools/log"
)

// GetConversationsReq get the session list request
func (m *msgServer) GetConversationsHasReadAndMaxSeq(ctx context.Context, req *msg.GetConversationsHasReadAndMaxSeqReq) (resp *msg.GetConversationsHasReadAndMaxSeqResp, err error) {
	var conversationIDs []string
	if len(req.ConversationIDs) == 0 {
		conversationIDs, err = m.ConversationLocalCache.GetConversationIDs(ctx, req.UserID)
		if err != nil {
			return nil, err
		}
	} else {
		conversationIDs = req.ConversationIDs
	}
	hasReadSeqs, err := m.MsgDatabase.GetHasReadSeqs(ctx, req.UserID, conversationIDs)
	if err != nil {
		return nil, err
	}
	conversations, err := m.Conversation.GetConversations(ctx, req.UserID, conversationIDs)
	if err != nil {
		return nil, err
	}
	conversationMaxSeqMap := make(map[string]int64)
	for _, conversation := range conversations {
		if conversation.MaxSeq != 0 {
			conversationMaxSeqMap[conversation.ConversationID] = conversation.MaxSeq
		}
	}
	maxSeqs, err := m.MsgDatabase.GetMaxSeqs(ctx, conversationIDs)
	if err != nil {
		return nil, err
	}
	resp = &amp;msg.GetConversationsHasReadAndMaxSeqResp{Seqs: make(map[string]*msg.Seqs)}
	for conversarionID, maxSeq := range maxSeqs {
		resp.Seqs[conversarionID] = &amp;msg.Seqs{
			HasReadSeq: hasReadSeqs[conversarionID],
			MaxSeq:     maxSeq,
		}
		if v, ok := conversationMaxSeqMap[conversarionID]; ok {
			resp.Seqs[conversarionID].MaxSeq = v
		}
	}
	return resp, nil
}

func (m *msgServer) SetConversationHasReadSeq(ctx context.Context, req *msg.SetConversationHasReadSeqReq) (resp *msg.SetConversationHasReadSeqResp, err error) {
	maxSeq, err := m.MsgDatabase.GetMaxSeq(ctx, req.ConversationID)
	if err != nil {
		return
	}
	if req.HasReadSeq > maxSeq {
		return nil, errs.ErrArgs.Wrap("hasReadSeq must not be bigger than maxSeq")
	}
	if err := m.MsgDatabase.SetHasReadSeq(ctx, req.UserID, req.ConversationID, req.HasReadSeq); err != nil {
		return nil, err
	}
	if err = m.sendMarkAsReadNotification(ctx, req.ConversationID, constant.SingleChatType, req.UserID,
		req.UserID, nil, req.HasReadSeq); err != nil {
		return
	}
	return &amp;msg.SetConversationHasReadSeqResp{}, nil
}

// MarkMsgsAsRead mark the message as read
func (m *msgServer) MarkMsgsAsRead(ctx context.Context, req *msg.MarkMsgsAsReadReq) (resp *msg.MarkMsgsAsReadResp, err error) {
	if len(req.Seqs) &lt; 1 {
		return nil, errs.ErrArgs.Wrap("seqs must not be empty")
	}
	maxSeq, err := m.MsgDatabase.GetMaxSeq(ctx, req.ConversationID)
	if err != nil {
		return
	}
	hasReadSeq := req.Seqs[len(req.Seqs)-1]
	if hasReadSeq > maxSeq {
		return nil, errs.ErrArgs.Wrap("hasReadSeq must not be bigger than maxSeq")
	}
	conversation, err := m.Conversation.GetConversation(ctx, req.UserID, req.ConversationID)
	if err != nil {
		return
	}
	if err = m.MsgDatabase.MarkSingleChatMsgsAsRead(ctx, req.UserID, req.ConversationID, req.Seqs); err != nil {
		return
	}
	currentHasReadSeq, err := m.MsgDatabase.GetHasReadSeq(ctx, req.UserID, req.ConversationID)
	if err != nil &amp;&amp; errs.Unwrap(err) != redis.Nil {
		return
	}
	if hasReadSeq > currentHasReadSeq {
		err = m.MsgDatabase.SetHasReadSeq(ctx, req.UserID, req.ConversationID, hasReadSeq)
		if err != nil {
			return
		}
	}
	if err = m.sendMarkAsReadNotification(ctx, req.ConversationID, conversation.ConversationType, req.UserID,
		m.conversationAndGetRecvID(conversation, req.UserID), req.Seqs, hasReadSeq); err != nil {
		return
	}
	return &amp;msg.MarkMsgsAsReadResp{}, nil
}

func (m *msgServer) MarkConversationAsRead(ctx context.Context, req *msg.MarkConversationAsReadReq) (resp *msg.MarkConversationAsReadResp, err error) {
	conversation, err := m.Conversation.GetConversation(ctx, req.UserID, req.ConversationID)
	if err != nil {
		return nil, err
	}
	hasReadSeq, err := m.MsgDatabase.GetHasReadSeq(ctx, req.UserID, req.ConversationID)
	if err != nil &amp;&amp; errs.Unwrap(err) != redis.Nil {
		return nil, err
	}
	seqs := generateSeqs(hasReadSeq, req)

	if len(seqs) > 0 || req.HasReadSeq > hasReadSeq {
		err = m.updateReadStatus(ctx, req, conversation, seqs, hasReadSeq)
		if err != nil {
			return nil, err
		}
	}
	return &amp;msg.MarkConversationAsReadResp{}, nil
}

// generateSeqs generate seq that needs to be marked as read
func generateSeqs(hasReadSeq int64, req *msg.MarkConversationAsReadReq) []int64 {
	var seqs []int64
	for _, val := range req.Seqs {
		if val > hasReadSeq &amp;&amp; !utils2.Contain(val, seqs...) {
			seqs = append(seqs, val)
		}
	}
	return seqs
}

func (m *msgServer) updateReadStatus(ctx context.Context, req *msg.MarkConversationAsReadReq, conversation *conversation.Conversation, seqs []int64, hasReadSeq int64) error {
	if conversation.ConversationType == constant.SingleChatType &amp;&amp; len(seqs) > 0 {
		log.ZDebug(ctx, "MarkConversationAsRead", "seqs", seqs, "conversationID", req.ConversationID)
		if err := m.MsgDatabase.MarkSingleChatMsgsAsRead(ctx, req.UserID, req.ConversationID, seqs); err != nil {
			return err
		}
	}
	reqCall := &amp;cbapi.CallbackGroupMsgReadReq{
		SendID:       conversation.OwnerUserID,
		ReceiveID:    req.UserID,
		UnreadMsgNum: req.HasReadSeq,
		ContentType:  int64(conversation.ConversationType),
	}
	if err := CallbackGroupMsgRead(ctx, reqCall); err != nil {
		return err
	}

	if req.HasReadSeq > hasReadSeq {
		if err := m.MsgDatabase.SetHasReadSeq(ctx, req.UserID, req.ConversationID, req.HasReadSeq); err != nil {
			return err
		}
	}

	recvID := m.conversationAndGetRecvID(conversation, req.UserID)
	if conversation.ConversationType == constant.SuperGroupChatType || conversation.ConversationType == constant.NotificationChatType {
		recvID = req.UserID
	}

	return m.sendMarkAsReadNotification(ctx, req.ConversationID, conversation.ConversationType, req.UserID, recvID, seqs, req.HasReadSeq)
}

func (m *msgServer) sendMarkAsReadNotification(
	ctx context.Context,
	conversationID string,
	sessionType int32,
	sendID, recvID string,
	seqs []int64,
	hasReadSeq int64,
) error {
	tips := &amp;sdkws.MarkAsReadTips{
		MarkAsReadUserID: sendID,
		ConversationID:   conversationID,
		Seqs:             seqs,
		HasReadSeq:       hasReadSeq,
	}
	err := m.notificationSender.NotificationWithSesstionType(ctx, sendID, recvID, constant.HasReadReceipt, sessionType, tips)
	if err != nil {
		log.ZWarn(ctx, "send has read Receipt err", err)
	}
	return nil
}
`</span><span class="token string">``</span>

有一个 bug ，但我在 web 端上阅读了两条消息，只有最下面一条（最新的一条）消息标记为已读，上面一条没有标记，判断是哪里的问题，如何解决
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '91.md' style='float:left'>⬆️上一节🔗  </a><a href = '93.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


