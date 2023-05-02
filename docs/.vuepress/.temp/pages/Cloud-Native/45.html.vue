<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第45节-openmi-发消息的时候做了什么" tabindex="-1"><a class="header-anchor" href="#第45节-openmi-发消息的时候做了什么" aria-hidden="true">#</a> 第45节 OpenMI 发消息的时候做了什么</h1>
<div><a href = '44.md' style='float:left'>⬆️上一节🔗  </a><a href = '46.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="流程" tabindex="-1"><a class="header-anchor" href="#流程" aria-hidden="true">#</a> 流程</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Conversation<span class="token punctuation">)</span> <span class="token function">CreateTextMessage</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> text <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>sdk_struct<span class="token punctuation">.</span>MsgStruct<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> sdk_struct<span class="token punctuation">.</span>MsgStruct<span class="token punctuation">{</span><span class="token punctuation">}</span>
	err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">initBasicInfo</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>s<span class="token punctuation">,</span> constant<span class="token punctuation">.</span>UserMsgType<span class="token punctuation">,</span> constant<span class="token punctuation">.</span>Text<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	s<span class="token punctuation">.</span>Content <span class="token operator">=</span> text
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>s<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Conversation<span class="token punctuation">)</span> <span class="token function">CreateAdvancedTextMessage</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> text <span class="token builtin">string</span><span class="token punctuation">,</span> messageEntities <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>sdk_struct<span class="token punctuation">.</span>MessageEntity<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>sdk_struct<span class="token punctuation">.</span>MsgStruct<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	s <span class="token operator">:=</span> sdk_struct<span class="token punctuation">.</span>MsgStruct<span class="token punctuation">{</span><span class="token punctuation">}</span>
	err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">initBasicInfo</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>s<span class="token punctuation">,</span> constant<span class="token punctuation">.</span>UserMsgType<span class="token punctuation">,</span> constant<span class="token punctuation">.</span>AdvancedText<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	s<span class="token punctuation">.</span>MessageEntityElem<span class="token punctuation">.</span>Text <span class="token operator">=</span> text
	s<span class="token punctuation">.</span>MessageEntityElem<span class="token punctuation">.</span>MessageEntityList <span class="token operator">=</span> messageEntities
	s<span class="token punctuation">.</span>Content <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">StructToJsonString</span><span class="token punctuation">(</span>s<span class="token punctuation">.</span>MessageEntityElem<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>s<span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><code v-pre>CreateTextMessage(ctx context.Context, text string) (*sdk_struct.MsgStruct, error)</code>：这个方法用于创建一个普通文本消息。它接收一个上下文对象<code v-pre>ctx</code>和一个字符串<code v-pre>text</code>作为参数，返回一个指向<code v-pre>sdk_struct.MsgStruct</code>类型对象的指针和一个错误对象。该方法首先创建一个空的<code v-pre>sdk_struct.MsgStruct</code>对象<code v-pre>s</code>，然后调用<code v-pre>initBasicInfo</code>方法来初始化消息的基本信息，包括消息类型和内容类型。最后，将文本消息内容<code v-pre>text</code>赋值给<code v-pre>s.Content</code>字段，并返回<code v-pre>s</code>指针和nil。</li>
<li><code v-pre>CreateAdvancedTextMessage(ctx context.Context, text string, messageEntities []*sdk_struct.MessageEntity) (*sdk_struct.MsgStruct, error)</code>：这个方法用于创建一个高级文本消息，支持自定义消息实体。它接收一个上下文对象<code v-pre>ctx</code>、一个字符串<code v-pre>text</code>和一个<code v-pre>sdk_struct.MessageEntity</code>类型的切片<code v-pre>messageEntities</code>作为参数，返回一个指向<code v-pre>sdk_struct.MsgStruct</code>类型对象的指针和一个错误对象。该方法首先创建一个空的<code v-pre>sdk_struct.MsgStruct</code>对象<code v-pre>s</code>，然后调用<code v-pre>initBasicInfo</code>方法来初始化消息的基本信息，包括消息类型和内容类型。接下来，将文本消息内容<code v-pre>text</code>赋值给<code v-pre>s.MessageEntityElem.Text</code>字段，并将<code v-pre>sdk_struct.MessageEntity</code>类型的切片<code v-pre>messageEntities</code>赋值给<code v-pre>s.MessageEntityElem.MessageEntityList</code>字段。最后，将<code v-pre>s.MessageEntityElem</code>结构体序列化成<code v-pre>JSON</code>格式的字符串并赋值给<code v-pre>s.Content</code>字段，并返回<code v-pre>s</code>指针和<code v-pre>nil</code>。</li>
</ol>
<h3 id="结构体字段" tabindex="-1"><a class="header-anchor" href="#结构体字段" aria-hidden="true">#</a> 结构体字段</h3>
<p>这是一个很重并且很大的一个消息结构体，MsgStruct 结构体是我们给客户端用到的结构体。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> MsgStruct <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	ClientMsgID          <span class="token builtin">string</span>                <span class="token string">`json:"clientMsgID,omitempty"`</span>
	ServerMsgID          <span class="token builtin">string</span>                <span class="token string">`json:"serverMsgID,omitempty"`</span>
	CreateTime           <span class="token builtin">int64</span>                 <span class="token string">`json:"createTime"`</span>
	SendTime             <span class="token builtin">int64</span>                 <span class="token string">`json:"sendTime"`</span>
	SessionType          <span class="token builtin">int32</span>                 <span class="token string">`json:"sessionType"`</span>
	SendID               <span class="token builtin">string</span>                <span class="token string">`json:"sendID,omitempty"`</span>
	RecvID               <span class="token builtin">string</span>                <span class="token string">`json:"recvID,omitempty"`</span>
	MsgFrom              <span class="token builtin">int32</span>                 <span class="token string">`json:"msgFrom"`</span>
	ContentType          <span class="token builtin">int32</span>                 <span class="token string">`json:"contentType"`</span>
	SenderPlatformID     <span class="token builtin">int32</span>                 <span class="token string">`json:"platformID"`</span>
	SenderNickname       <span class="token builtin">string</span>                <span class="token string">`json:"senderNickname,omitempty"`</span>
	SenderFaceURL        <span class="token builtin">string</span>                <span class="token string">`json:"senderFaceUrl,omitempty"`</span>
	GroupID              <span class="token builtin">string</span>                <span class="token string">`json:"groupID,omitempty"`</span>
	Content              <span class="token builtin">string</span>                <span class="token string">`json:"content,omitempty"`</span>
	Seq                  <span class="token builtin">int64</span>                 <span class="token string">`json:"seq"`</span>
	IsRead               <span class="token builtin">bool</span>                  <span class="token string">`json:"isRead"`</span>
	Status               <span class="token builtin">int32</span>                 <span class="token string">`json:"status"`</span>
	IsReact              <span class="token builtin">bool</span>                  <span class="token string">`json:"isReact,omitempty"`</span>
	IsExternalExtensions <span class="token builtin">bool</span>                  <span class="token string">`json:"isExternalExtensions,omitempty"`</span>
	OfflinePush          sdkws<span class="token punctuation">.</span>OfflinePushInfo <span class="token string">`json:"offlinePush,omitempty"`</span>
	AttachedInfo         <span class="token builtin">string</span>                <span class="token string">`json:"attachedInfo,omitempty"`</span>
	Ex                   <span class="token builtin">string</span>                <span class="token string">`json:"ex,omitempty"`</span>
	PictureElem          <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		SourcePath      <span class="token builtin">string</span>          <span class="token string">`json:"sourcePath,omitempty"`</span>
		SourcePicture   PictureBaseInfo <span class="token string">`json:"sourcePicture,omitempty"`</span>
		BigPicture      PictureBaseInfo <span class="token string">`json:"bigPicture,omitempty"`</span>
		SnapshotPicture PictureBaseInfo <span class="token string">`json:"snapshotPicture,omitempty"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"pictureElem,omitempty"`</span>
	SoundElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		UUID      <span class="token builtin">string</span> <span class="token string">`json:"uuid,omitempty"`</span>
		SoundPath <span class="token builtin">string</span> <span class="token string">`json:"soundPath,omitempty"`</span>
		SourceURL <span class="token builtin">string</span> <span class="token string">`json:"sourceUrl,omitempty"`</span>
		DataSize  <span class="token builtin">int64</span>  <span class="token string">`json:"dataSize"`</span>
		Duration  <span class="token builtin">int64</span>  <span class="token string">`json:"duration"`</span>
		SoundType <span class="token builtin">string</span> <span class="token string">`json:"soundType,omitempty"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"soundElem,omitempty"`</span>
	VideoElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		VideoPath      <span class="token builtin">string</span> <span class="token string">`json:"videoPath,omitempty"`</span>
		VideoUUID      <span class="token builtin">string</span> <span class="token string">`json:"videoUUID,omitempty"`</span>
		VideoURL       <span class="token builtin">string</span> <span class="token string">`json:"videoUrl,omitempty"`</span>
		VideoType      <span class="token builtin">string</span> <span class="token string">`json:"videoType,omitempty"`</span>
		VideoSize      <span class="token builtin">int64</span>  <span class="token string">`json:"videoSize"`</span>
		Duration       <span class="token builtin">int64</span>  <span class="token string">`json:"duration"`</span>
		SnapshotPath   <span class="token builtin">string</span> <span class="token string">`json:"snapshotPath,omitempty"`</span>
		SnapshotUUID   <span class="token builtin">string</span> <span class="token string">`json:"snapshotUUID,omitempty"`</span>
		SnapshotSize   <span class="token builtin">int64</span>  <span class="token string">`json:"snapshotSize"`</span>
		SnapshotURL    <span class="token builtin">string</span> <span class="token string">`json:"snapshotUrl,omitempty"`</span>
		SnapshotWidth  <span class="token builtin">int32</span>  <span class="token string">`json:"snapshotWidth"`</span>
		SnapshotHeight <span class="token builtin">int32</span>  <span class="token string">`json:"snapshotHeight"`</span>
		SnapshotType   <span class="token builtin">string</span> <span class="token string">`json:"snapshotType,omitempty"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"videoElem,omitempty"`</span>
	FileElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		FilePath  <span class="token builtin">string</span> <span class="token string">`json:"filePath,omitempty"`</span>
		UUID      <span class="token builtin">string</span> <span class="token string">`json:"uuid,omitempty"`</span>
		SourceURL <span class="token builtin">string</span> <span class="token string">`json:"sourceUrl,omitempty"`</span>
		FileName  <span class="token builtin">string</span> <span class="token string">`json:"fileName,omitempty"`</span>
		FileSize  <span class="token builtin">int64</span>  <span class="token string">`json:"fileSize"`</span>
		FileType  <span class="token builtin">string</span> <span class="token string">`json:"fileType,omitempty"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"fileElem,omitempty"`</span>
	MergeElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Title             <span class="token builtin">string</span>           <span class="token string">`json:"title,omitempty"`</span>
		AbstractList      <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>         <span class="token string">`json:"abstractList,omitempty"`</span>
		MultiMessage      <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>MsgStruct     <span class="token string">`json:"multiMessage,omitempty"`</span>
		MessageEntityList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>MessageEntity <span class="token string">`json:"messageEntityList,omitempty"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"mergeElem,omitempty"`</span>
	AtElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Text         <span class="token builtin">string</span>     <span class="token string">`json:"text,omitempty"`</span>
		AtUserList   <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>   <span class="token string">`json:"atUserList,omitempty"`</span>
		AtUsersInfo  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>AtInfo  <span class="token string">`json:"atUsersInfo,omitempty"`</span>
		QuoteMessage <span class="token operator">*</span>MsgStruct <span class="token string">`json:"quoteMessage,omitempty"`</span>
		IsAtSelf     <span class="token builtin">bool</span>       <span class="token string">`json:"isAtSelf"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"atElem,omitempty"`</span>
	FaceElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Index <span class="token builtin">int</span>    <span class="token string">`json:"index"`</span>
		Data  <span class="token builtin">string</span> <span class="token string">`json:"data,omitempty"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"faceElem,omitempty"`</span>
	LocationElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Description <span class="token builtin">string</span>  <span class="token string">`json:"description,omitempty"`</span>
		Longitude   <span class="token builtin">float64</span> <span class="token string">`json:"longitude"`</span>
		Latitude    <span class="token builtin">float64</span> <span class="token string">`json:"latitude"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"locationElem,omitempty"`</span>
	CustomElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Data        <span class="token builtin">string</span> <span class="token string">`json:"data,omitempty"`</span>
		Description <span class="token builtin">string</span> <span class="token string">`json:"description,omitempty"`</span>
		Extension   <span class="token builtin">string</span> <span class="token string">`json:"extension,omitempty"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"customElem,omitempty"`</span>
	QuoteElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Text              <span class="token builtin">string</span>           <span class="token string">`json:"text,omitempty"`</span>
		QuoteMessage      <span class="token operator">*</span>MsgStruct       <span class="token string">`json:"quoteMessage,omitempty"`</span>
		MessageEntityList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>MessageEntity <span class="token string">`json:"messageEntityList,omitempty"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"quoteElem,omitempty"`</span>
	NotificationElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Detail      <span class="token builtin">string</span> <span class="token string">`json:"detail,omitempty"`</span>
		DefaultTips <span class="token builtin">string</span> <span class="token string">`json:"defaultTips,omitempty"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"notificationElem,omitempty"`</span>
	MessageEntityElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Text              <span class="token builtin">string</span>           <span class="token string">`json:"text,omitempty"`</span>
		MessageEntityList <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>MessageEntity <span class="token string">`json:"messageEntityList,omitempty"`</span>
	<span class="token punctuation">}</span> <span class="token string">`json:"messageEntityElem,omitempty"`</span>
	AttachedInfoElem AttachedInfoElem <span class="token string">`json:"attachedInfoElem,omitempty"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个名为 <code v-pre>MsgStruct</code> 的结构体，包含了一个即时通讯消息的各种元素。下面是每个字段的解释：</p>
<ul>
<li><code v-pre>ClientMsgID</code>：客户端生成的消息 ID。</li>
<li><code v-pre>ServerMsgID</code>：服务器生成的消息 ID。</li>
<li><code v-pre>CreateTime</code>：消息创建时间，Unix 时间戳。</li>
<li><code v-pre>SendTime</code>：消息发送时间，Unix 时间戳。</li>
<li><code v-pre>SessionType</code>：会话类型，如单聊、群聊等。</li>
<li><code v-pre>SendID</code>：消息发送者的 ID。</li>
<li><code v-pre>RecvID</code>：消息接收者的 ID。</li>
<li><code v-pre>MsgFrom</code>：消息来源，如发送方或接收方。</li>
<li><code v-pre>ContentType</code>：消息内容类型，如文本、图片、音频等。</li>
<li><code v-pre>SenderPlatformID</code>：发送者使用的平台 ID。</li>
<li><code v-pre>SenderNickname</code>：发送者的昵称。</li>
<li><code v-pre>SenderFaceURL</code>：发送者的头像 URL。</li>
<li><code v-pre>GroupID</code>：如果是群聊消息，群聊 ID。</li>
<li><code v-pre>Content</code>：消息内容。</li>
<li><code v-pre>Seq</code>：消息序列号。</li>
<li><code v-pre>IsRead</code>：消息是否已读。</li>
<li><code v-pre>Status</code>：消息状态，如发送中、发送成功、发送失败等。</li>
<li><code v-pre>IsReact</code>：是否需要反馈。</li>
<li><code v-pre>IsExternalExtensions</code>：是否包含扩展信息。</li>
<li><code v-pre>OfflinePush</code>：离线推送信息，包括标题、内容、声音等。</li>
<li><code v-pre>AttachedInfo</code>：附加信息。</li>
<li><code v-pre>Ex</code>：预留字段。</li>
<li><code v-pre>PictureElem</code>：图片消息元素，包括原图、大图、快照等。</li>
<li><code v-pre>SoundElem</code>：音频消息元素，包括 UUID、路径、大小、时长等。</li>
<li><code v-pre>VideoElem</code>：视频消息元素，包括路径、UUID、大小、时长、快照等。</li>
<li><code v-pre>FileElem</code>：文件消息元素，包括路径、UUID、大小、名称、类型等。</li>
<li><code v-pre>MergeElem</code>：合并消息元素，包括标题、摘要、多条消息、消息实体等。</li>
<li><code v-pre>AtElem</code>：@ 消息元素，包括文本、@ 用户列表、@ 用户信息、引用消息、是否 @ 自己等。</li>
<li><code v-pre>FaceElem</code>：表情消息元素，包括表情索引、数据等。</li>
<li><code v-pre>LocationElem</code>：位置消息元素，包括描述、经度、纬度等。</li>
<li><code v-pre>CustomElem</code>：自定义消息元素，包括数据、描述、扩展等。</li>
<li><code v-pre>QuoteElem</code>：引用消息元素，包括文本、引用的消息、消息实体等。</li>
<li><code v-pre>NotificationElem</code>：通知消息元素，包括详情、默认提示等。</li>
<li><code v-pre>MessageEntityElem</code>：消息实体元素，包括文本、消息实体列表等。</li>
<li><code v-pre>AttachedInfoElem</code>：附加信息元素，包括类型、数据等。</li>
</ul>
<h3 id="发送消息需要的结构体字段" tabindex="-1"><a class="header-anchor" href="#发送消息需要的结构体字段" aria-hidden="true">#</a> 发送消息需要的结构体字段</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> TextElem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Text <span class="token builtin">string</span> <span class="token string">`json:"text,omitempty"`</span>
<span class="token punctuation">}</span>


<span class="token keyword">type</span> MsgStruct <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	ClientMsgID          <span class="token builtin">string</span>                <span class="token string">`json:"clientMsgID,omitempty"`</span>
	CreateTime           <span class="token builtin">int64</span>                 <span class="token string">`json:"createTime"`</span>
	SendTime             <span class="token builtin">int64</span>                 <span class="token string">`json:"sendTime"`</span>
	MsgFrom              <span class="token builtin">int32</span>                 <span class="token string">`json:"msgFrom"`</span>
	ContentType          <span class="token builtin">int32</span>                 <span class="token string">`json:"contentType"`</span>
	SenderPlatformID     <span class="token builtin">int32</span>                 <span class="token string">`json:"platformID"`</span>
	SenderNickname       <span class="token builtin">string</span>                <span class="token string">`json:"senderNickname,omitempty"`</span>
	SenderFaceURL        <span class="token builtin">string</span>                <span class="token string">`json:"senderFaceUrl,omitempty"`</span>
	Status               <span class="token builtin">int32</span>                 <span class="token string">`json:"status"`</span>
	IsReact              <span class="token builtin">bool</span>                  <span class="token string">`json:"isReact,omitempty"`</span>
	IsExternalExtensions <span class="token builtin">bool</span>                  <span class="token string">`json:"isExternalExtensions,omitempty"`</span>
	OfflinePush          sdkws<span class="token punctuation">.</span>OfflinePushInfo <span class="token string">`json:"offlinePush,omitempty"`</span>
	AttachedInfo         <span class="token builtin">string</span>                <span class="token string">`json:"attachedInfo,omitempty"`</span>
	Ex                   <span class="token builtin">string</span>                <span class="token string">`json:"ex,omitempty"`</span>
	TextElem             TextElem              <span class="token string">`json:"textElem,omitempty"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建结构体的逻辑部分：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Conversation<span class="token punctuation">)</span> <span class="token function">initBasicInfo</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> message <span class="token operator">*</span>sdk_struct<span class="token punctuation">.</span>MsgStruct<span class="token punctuation">,</span> msgFrom<span class="token punctuation">,</span> contentType <span class="token builtin">int32</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	message<span class="token punctuation">.</span>CreateTime <span class="token operator">=</span> utils<span class="token punctuation">.</span><span class="token function">GetCurrentTimestampByMill</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	message<span class="token punctuation">.</span>SendTime <span class="token operator">=</span> message<span class="token punctuation">.</span>CreateTime
	message<span class="token punctuation">.</span>IsRead <span class="token operator">=</span> <span class="token boolean">false</span>
	message<span class="token punctuation">.</span>Status <span class="token operator">=</span> constant<span class="token punctuation">.</span>MsgStatusSending
	message<span class="token punctuation">.</span>SendID <span class="token operator">=</span> c<span class="token punctuation">.</span>loginUserID
	userInfo<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>db<span class="token punctuation">.</span><span class="token function">GetLoginUser</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> c<span class="token punctuation">.</span>loginUserID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		message<span class="token punctuation">.</span>SenderFaceURL <span class="token operator">=</span> userInfo<span class="token punctuation">.</span>FaceURL
		message<span class="token punctuation">.</span>SenderNickname <span class="token operator">=</span> userInfo<span class="token punctuation">.</span>Nickname
	<span class="token punctuation">}</span>
	ClientMsgID <span class="token operator">:=</span> utils<span class="token punctuation">.</span><span class="token function">GetMsgID</span><span class="token punctuation">(</span>message<span class="token punctuation">.</span>SendID<span class="token punctuation">)</span>
	message<span class="token punctuation">.</span>ClientMsgID <span class="token operator">=</span> ClientMsgID
	message<span class="token punctuation">.</span>MsgFrom <span class="token operator">=</span> msgFrom
	message<span class="token punctuation">.</span>ContentType <span class="token operator">=</span> contentType
	message<span class="token punctuation">.</span>SenderPlatformID <span class="token operator">=</span> c<span class="token punctuation">.</span>platformID
	message<span class="token punctuation">.</span>IsExternalExtensions <span class="token operator">=</span> c<span class="token punctuation">.</span>IsExternalExtensions
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '44.md' style='float:left'>⬆️上一节🔗  </a><a href = '46.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


