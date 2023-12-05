<template><div><h1 id="openim-mongo-替换-mysql" tabindex="-1"><a class="header-anchor" href="#openim-mongo-替换-mysql" aria-hidden="true">#</a> OpenIM Mongo 替换 Mysql</h1>
<h2 id="目标" tabindex="-1"><a class="header-anchor" href="#目标" aria-hidden="true">#</a> 目标</h2>
<p>完成 <code v-pre>openim-rpc-friend</code> 的 Mysql -&gt; Mongo 的替换。</p>
<p><strong>有些接口实现了，没有调用就可以删了</strong></p>
<h2 id="阅读" tabindex="-1"><a class="header-anchor" href="#阅读" aria-hidden="true">#</a> 阅读</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> conversationServer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	groupRpcClient                 <span class="token operator">*</span>rpcclient<span class="token punctuation">.</span>GroupRpcClient
	conversationDatabase           controller<span class="token punctuation">.</span>ConversationDatabase
	conversationNotificationSender <span class="token operator">*</span>notification<span class="token punctuation">.</span>ConversationNotificationSender
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><code v-pre>groupRpcClient</code>: 这个字段是指向 <code v-pre>rpcclient.GroupRpcClient</code> 类型的指针。在Go中，指针是用于存储另一个变量的内存地址的变量。<code v-pre>rpcclient.GroupRpcClient</code> 很可能是一个用于RPC（远程过程调用）通信的客户端类型。它可能被用来与远程服务或服务器组进行交互。</li>
<li><code v-pre>conversationDatabase</code>: 这个字段的类型是 <code v-pre>controller.ConversationDatabase</code>。这表明 <code v-pre>conversationDatabase</code> 是用来处理与会话数据库相关的操作的。这可能包括查询、更新、删除会话数据等。</li>
<li><code v-pre>conversationNotificationSender</code>: 这是指向 <code v-pre>notification.ConversationNotificationSender</code> 类型的指针。这个字段很可能被用来发送与会话相关的通知。例如，在会话中添加新消息时，可能需要通知相关用户。</li>
<li><code v-pre>notification</code>: 这个字段并不直接出现在结构体定义中，但从 <code v-pre>conversationNotificationSender</code> 字段可以推测，<code v-pre>notification</code> 可能是一个包含了与通知发送相关功能的包（package）。</li>
</ol>
<p>start 初始化和启动与会话（如聊天应用中的会话）相关的服务。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Start</span><span class="token punctuation">(</span>client discoveryregistry<span class="token punctuation">.</span>SvcDiscoveryRegistry<span class="token punctuation">,</span> server <span class="token operator">*</span>grpc<span class="token punctuation">.</span>Server<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token comment">// db, err := relation.NewGormDB(): 初始化一个GORM数据库实例。GORM是一个流行的Go ORM库，用于与SQL数据库交互。</span>
	db<span class="token punctuation">,</span> err <span class="token operator">:=</span> relation<span class="token punctuation">.</span><span class="token function">NewGormDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 使用GORM的自动迁移功能来创建或更新会话模型的数据库表</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">AutoMigrate</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tablerelation<span class="token punctuation">.</span>ConversationModel<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 初始化一个Redis缓存实例。Redis通常用于快速缓存数据。</span>
	rdb<span class="token punctuation">,</span> err <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">NewRedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 初始化一个MongoDB数据库实例。</span>
	mongo<span class="token punctuation">,</span> err <span class="token operator">:=</span> unrelation<span class="token punctuation">.</span><span class="token function">NewMongo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 使用MongoDB创建一个专门处理会话数据的数据库实例。</span>
	conversationDB<span class="token punctuation">,</span> err <span class="token operator">:=</span> newmgo<span class="token punctuation">.</span><span class="token function">NewConversationMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
    
    <span class="token comment">// 初始化一个用于群组操作的RPC客户端。</span>
	groupRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewGroupRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
    
    <span class="token comment">// 初始化一个用于消息操作的RPC客户端。</span>
	msgRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewMessageRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
    
    <span class="token comment">// 在gRPC服务器上注册一个新的会话服务，传入之前初始化的各种组件。</span>
	pbconversation<span class="token punctuation">.</span><span class="token function">RegisterConversationServer</span><span class="token punctuation">(</span>server<span class="token punctuation">,</span> <span class="token operator">&amp;</span>conversationServer<span class="token punctuation">{</span>
		conversationNotificationSender<span class="token punctuation">:</span> notification<span class="token punctuation">.</span><span class="token function">NewConversationNotificationSender</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>msgRpcClient<span class="token punctuation">)</span><span class="token punctuation">,</span>
		groupRpcClient<span class="token punctuation">:</span>                 <span class="token operator">&amp;</span>groupRpcClient<span class="token punctuation">,</span>
		conversationDatabase<span class="token punctuation">:</span>           controller<span class="token punctuation">.</span><span class="token function">NewConversationDatabase</span><span class="token punctuation">(</span>conversationDB<span class="token punctuation">,</span> cache<span class="token punctuation">.</span><span class="token function">NewConversationRedis</span><span class="token punctuation">(</span>rdb<span class="token punctuation">,</span> cache<span class="token punctuation">.</span><span class="token function">GetDefaultOpt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> conversationDB<span class="token punctuation">)</span><span class="token punctuation">,</span> tx<span class="token punctuation">.</span><span class="token function">NewGorm</span><span class="token punctuation">(</span>db<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="详细介绍-gorm-的-automigrate" tabindex="-1"><a class="header-anchor" href="#详细介绍-gorm-的-automigrate" aria-hidden="true">#</a> 详细介绍 GORM 的 AutoMigrate</h3>
<p>GORM 的 <code v-pre>AutoMigrate</code> 方法是一个在Go语言中使用GORM库时非常有用的功能，主要用于数据库迁移。以下是对这个方法的详细解析：</p>
<h4 id="功能" tabindex="-1"><a class="header-anchor" href="#功能" aria-hidden="true">#</a> 功能</h4>
<ul>
<li><strong>自动迁移</strong>：<code v-pre>AutoMigrate</code> 会自动根据你的Go结构体（通常用于表示数据库中的表）来创建或修改数据库表。这意味着它可以根据结构体的定义来创建新的表，或者根据结构体的修改来调整现有的表（如添加、删除或修改字段）。</li>
</ul>
<h4 id="工作原理" tabindex="-1"><a class="header-anchor" href="#工作原理" aria-hidden="true">#</a> 工作原理</h4>
<ul>
<li>
<p><strong>与结构体同步</strong>：<code v-pre>AutoMigrate</code> 接收一个或多个结构体作为参数，并根据这些结构体的定义在数据库中创建或更新表。例如，如果你有一个如下所示的结构体：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    gorm<span class="token punctuation">.</span>Model
    Name <span class="token builtin">string</span>
    Age  <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>AutoMigrate(&amp;User{})</code> 会在数据库中创建一个名为 <code v-pre>users</code> 的表（GORM默认使用结构体名称的复数形式作为表名），其中包含 <code v-pre>name</code> 和 <code v-pre>age</code> 字段，以及GORM模型中的默认字段（如 <code v-pre>ID</code>, <code v-pre>CreatedAt</code>, <code v-pre>UpdatedAt</code>, <code v-pre>DeletedAt</code>）。</p>
</li>
<li>
<p><strong>安全性</strong>：<code v-pre>AutoMigrate</code> 通常只会添加缺失的字段、创建缺失的索引或外键，并不会删除或修改现有字段。这意味着它是一个相对安全的操作，不会导致数据丢失。</p>
</li>
</ul>
<h4 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h4>
<ul>
<li><strong>应用程序启动时</strong>：通常在应用程序启动时调用 <code v-pre>AutoMigrate</code>，以确保数据库结构与应用程序的最新结构体定义保持同步。</li>
<li><strong>开发过程中</strong>：在开发过程中，当你修改了结构体的定义后，可以使用 <code v-pre>AutoMigrate</code> 来快速更新数据库结构，而不需要手动进行数据库迁移。</li>
</ul>
<h4 id="注意事项" tabindex="-1"><a class="header-anchor" href="#注意事项" aria-hidden="true">#</a> 注意事项</h4>
<ul>
<li><strong>不是数据库版本控制工具</strong>：虽然 <code v-pre>AutoMigrate</code> 很方便，但它不应该被视为一个完整的数据库版本控制解决方案。对于更复杂的数据库迁移和版本控制，可能需要使用专门的迁移工具，如 <code v-pre>golang-migrate/migrate</code>。</li>
<li><strong>谨慎使用</strong>：在生产环境中使用 <code v-pre>AutoMigrate</code> 时应格外小心，因为错误的使用可能会导致数据丢失或表结构的意外变化。</li>
</ul>
<h3 id="初始化-mongo" tabindex="-1"><a class="header-anchor" href="#初始化-mongo" aria-hidden="true">#</a> 初始化 mongo</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// NewMongo Initialize MongoDB connection.</span>
<span class="token keyword">func</span> <span class="token function">NewMongo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>Mongo<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	specialerror<span class="token punctuation">.</span><span class="token function">AddReplace</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span>ErrNoDocuments<span class="token punctuation">,</span> errs<span class="token punctuation">.</span>ErrRecordNotFound<span class="token punctuation">)</span>
	uri <span class="token operator">:=</span> <span class="token string">"mongodb://sample.host:27017/?maxPoolSize=20&amp;w=majority"</span>
	<span class="token keyword">if</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>Uri <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		uri <span class="token operator">=</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>Uri
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		mongodbHosts <span class="token operator">:=</span> <span class="token string">""</span>
		<span class="token keyword">for</span> i<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>Address <span class="token punctuation">{</span>
			<span class="token keyword">if</span> i <span class="token operator">==</span> <span class="token function">len</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>Address<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
				mongodbHosts <span class="token operator">+=</span> v
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
				mongodbHosts <span class="token operator">+=</span> v <span class="token operator">+</span> <span class="token string">","</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>Password <span class="token operator">!=</span> <span class="token string">""</span> <span class="token operator">&amp;&amp;</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>Username <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span>
			uri <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"mongodb://%s:%s@%s/%s?maxPoolSize=%d&amp;authSource=admin"</span><span class="token punctuation">,</span>
				config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>Username<span class="token punctuation">,</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>Password<span class="token punctuation">,</span> mongodbHosts<span class="token punctuation">,</span>
				config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>Database<span class="token punctuation">,</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>MaxPoolSize<span class="token punctuation">)</span>
		<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
			uri <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"mongodb://%s/%s/?maxPoolSize=%d&amp;authSource=admin"</span><span class="token punctuation">,</span>
				mongodbHosts<span class="token punctuation">,</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>Database<span class="token punctuation">,</span>
				config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Mongo<span class="token punctuation">.</span>MaxPoolSize<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"mongo:"</span><span class="token punctuation">,</span> uri<span class="token punctuation">)</span>
	<span class="token keyword">var</span> mongoClient <span class="token operator">*</span>mongo<span class="token punctuation">.</span>Client
	<span class="token keyword">var</span> err <span class="token builtin">error</span> <span class="token operator">=</span> <span class="token boolean">nil</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> maxRetry<span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		ctx<span class="token punctuation">,</span> cancel <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithTimeout</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> time<span class="token punctuation">.</span>Second<span class="token operator">*</span><span class="token number">10</span><span class="token punctuation">)</span>
		<span class="token keyword">defer</span> <span class="token function">cancel</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		mongoClient<span class="token punctuation">,</span> err <span class="token operator">=</span> mongo<span class="token punctuation">.</span><span class="token function">Connect</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> options<span class="token punctuation">.</span><span class="token function">Client</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ApplyURI</span><span class="token punctuation">(</span>uri<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token operator">&amp;</span>Mongo<span class="token punctuation">{</span>db<span class="token punctuation">:</span> mongoClient<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
		<span class="token punctuation">}</span>
		<span class="token keyword">if</span> cmdErr<span class="token punctuation">,</span> ok <span class="token operator">:=</span> err<span class="token punctuation">.</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span>CommandError<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
			<span class="token keyword">if</span> cmdErr<span class="token punctuation">.</span>Code <span class="token operator">==</span> <span class="token number">13</span> <span class="token operator">||</span> cmdErr<span class="token punctuation">.</span>Code <span class="token operator">==</span> <span class="token number">18</span> <span class="token punctuation">{</span>
				<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
			<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
				fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Failed to connect to MongoDB: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>specialerror.AddReplace(mongo.ErrNoDocuments, errs.ErrRecordNotFound)</code>: 这行代码将MongoDB的 <code v-pre>ErrNoDocuments</code> 错误替换为自定义错误 <code v-pre>ErrRecordNotFound</code>。这通常用于统一错误处理。</p>
</li>
<li>
<p>在 URL 构建中</p>
<ul>
<li>函数首先定义了一个默认的MongoDB URI。</li>
<li>如果 <code v-pre>config.Config.Mongo.Uri</code> 非空，则使用这个作为URI。</li>
<li>如果为空，则根据配置 (<code v-pre>config.Config.Mongo.Address</code> 等) 构建URI。如果提供了用户名和密码，则在URI中包含这些凭据；否则，不包含。</li>
</ul>
</li>
<li>
<p>数据库尝试链接</p>
<ul>
<li>使用 <code v-pre>for</code> 循环和重试逻辑（由 <code v-pre>maxRetry</code> 控制）来尝试连接数据库。</li>
<li><code v-pre>context.WithTimeout(context.Background(), time.Second*10)</code>: 创建一个最多10秒的超时上下文，确保连接尝试不会无限期等待。</li>
<li><code v-pre>mongo.Connect(ctx, options.Client().ApplyURI(uri))</code>: 尝试使用上面构建的URI连接MongoDB。</li>
<li>如果连接成功，返回一个封装了 <code v-pre>mongoClient</code> 的 <code v-pre>Mongo</code> 实例。</li>
</ul>
</li>
</ul>
<p><strong>解析下面的<code v-pre>PopulateGroupMember</code>：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (g *GroupNotificationSender) PopulateGroupMember(ctx context.Context, members ...*relation.GroupMemberModel) error {
	if len(members) == 0 {
		return nil
	}
	emptyUserIDs := make(map[string]struct{})
	for _, member := range members {
		if member.Nickname == "" || member.FaceURL == "" {
			emptyUserIDs[member.UserID] = struct{}{}
		}
	}
	if len(emptyUserIDs) > 0 {
		users, err := g.getUsersInfo(ctx, utils.Keys(emptyUserIDs))
		if err != nil {
			return err
		}
		userMap := make(map[string]CommonUser)
		for i, user := range users {
			userMap[user.GetUserID()] = users[i]
		}
		for i, member := range members {
			user, ok := userMap[member.UserID]
			if !ok {
				continue
			}
			if member.Nickname == "" {
				members[i].Nickname = user.GetNickname()
			}
			if member.FaceURL == "" {
				members[i].FaceURL = user.GetFaceURL()
			}
		}
	}
	return nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其作用是在一个群组通知发送器(<code v-pre>GroupNotificationSender</code>)中填充群组成员的信息。代码的主要逻辑如下：</p>
<ol>
<li><strong>方法定义</strong>：<code v-pre>PopulateGroupMember</code>是<code v-pre>GroupNotificationSender</code>类型的一个方法，它接受一个<code v-pre>context.Context</code>和多个<code v-pre>*relation.GroupMemberModel</code>类型的参数。</li>
<li><strong>检查成员列表是否为空</strong>：首先检查传入的群组成员(<code v-pre>members</code>)是否为空。如果没有成员，则直接返回，不执行任何操作。</li>
<li><strong>查找空信息的用户</strong>：使用一个循环遍历所有成员。如果成员的昵称(<code v-pre>Nickname</code>)或头像URL(<code v-pre>FaceURL</code>)为空，则将其用户ID(<code v-pre>UserID</code>)添加到一个名为<code v-pre>emptyUserIDs</code>的map中。这个map用于存储需要更新信息的用户ID。</li>
<li><strong>获取用户信息</strong>：如果<code v-pre>emptyUserIDs</code>中有数据，即存在需要更新信息的用户，就调用<code v-pre>g.getUsersInfo</code>方法，获取这些用户的详细信息。这个方法需要上下文(<code v-pre>ctx</code>)和用户ID列表。</li>
<li><strong>错误处理</strong>：如果在获取用户信息过程中出现错误，该方法会返回相应的错误。</li>
<li><strong>更新成员信息</strong>：使用获取到的用户信息更新群组成员的信息。首先，创建一个新的map(<code v-pre>userMap</code>)，用于将用户ID映射到用户信息。然后，遍历每个成员，如果在<code v-pre>userMap</code>中找到对应的用户信息，并且该成员的昵称或头像URL为空，则用获取到的用户信息进行更新。</li>
<li><strong>返回</strong>：最后，如果整个过程顺利，该方法返回<code v-pre>nil</code>，表示没有错误发生。</li>
</ol>
<h2 id="主要的变化部分" tabindex="-1"><a class="header-anchor" href="#主要的变化部分" aria-hidden="true">#</a> 主要的变化部分</h2>
<p>所有的 <code v-pre>interface{}</code> 都变成了 <code v-pre>any</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>conversationDB :<span class="token operator">=</span> relation.NewConversationGorm<span class="token punctuation">(</span>db<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>替换为：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>	mongo<span class="token punctuation">,</span> err <span class="token operator">:=</span> unrelation<span class="token punctuation">.</span><span class="token function">NewMongo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	conversationDB<span class="token punctuation">,</span> err <span class="token operator">:=</span> newmgo<span class="token punctuation">.</span><span class="token function">NewConversationMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>User 中：</strong></p>
<p>以前的逻辑：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>userDB := relation.NewUserGorm(db)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>更新为：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>userDB<span class="token punctuation">,</span> err <span class="token operator">:=</span> newmgo<span class="token punctuation">.</span><span class="token function">NewUserMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> err
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以前的逻辑：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>user <span class="token operator">:=</span> convert<span class="token punctuation">.</span><span class="token function">UserPb2DB</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>UserInfo<span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>
err <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> user<span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>更新为：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>data <span class="token operator">:=</span> convert<span class="token punctuation">.</span><span class="token function">UserPb2DBMap</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>UserInfo<span class="token punctuation">)</span>
<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> errs<span class="token punctuation">.</span>ErrArgs<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span><span class="token string">"no data to update"</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">if</span> err <span class="token operator">:=</span> s<span class="token punctuation">.</span><span class="token function">UpdateByMap</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> req<span class="token punctuation">.</span>UserInfo<span class="token punctuation">.</span>UserID<span class="token punctuation">,</span> data<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>UserPb2DB</code> 函数：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">UserPb2DB</span><span class="token punctuation">(</span>user <span class="token operator">*</span>sdkws<span class="token punctuation">.</span>UserInfo<span class="token punctuation">)</span> <span class="token operator">*</span>relationtb<span class="token punctuation">.</span>UserModel <span class="token punctuation">{</span>
	<span class="token keyword">var</span> userDB relationtb<span class="token punctuation">.</span>UserModel
	userDB<span class="token punctuation">.</span>UserID <span class="token operator">=</span> user<span class="token punctuation">.</span>UserID
	userDB<span class="token punctuation">.</span>Nickname <span class="token operator">=</span> user<span class="token punctuation">.</span>Nickname
	userDB<span class="token punctuation">.</span>FaceURL <span class="token operator">=</span> user<span class="token punctuation">.</span>FaceURL
	userDB<span class="token punctuation">.</span>Ex <span class="token operator">=</span> user<span class="token punctuation">.</span>Ex
	userDB<span class="token punctuation">.</span>CreateTime <span class="token operator">=</span> time<span class="token punctuation">.</span><span class="token function">UnixMilli</span><span class="token punctuation">(</span>user<span class="token punctuation">.</span>CreateTime<span class="token punctuation">)</span>
	userDB<span class="token punctuation">.</span>AppMangerLevel <span class="token operator">=</span> user<span class="token punctuation">.</span>AppMangerLevel
	userDB<span class="token punctuation">.</span>GlobalRecvMsgOpt <span class="token operator">=</span> user<span class="token punctuation">.</span>GlobalRecvMsgOpt
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>userDB
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>UserPb2DBMap</code> 函数的逻辑：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">UserPb2DBMap</span><span class="token punctuation">(</span>user <span class="token operator">*</span>sdkws<span class="token punctuation">.</span>UserInfo<span class="token punctuation">)</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any <span class="token punctuation">{</span>
	<span class="token keyword">if</span> user <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	val <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any<span class="token punctuation">)</span>
	<span class="token keyword">if</span> user<span class="token punctuation">.</span>Nickname <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		val<span class="token punctuation">[</span><span class="token string">"nickname"</span><span class="token punctuation">]</span> <span class="token operator">=</span> user<span class="token punctuation">.</span>Nickname
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> user<span class="token punctuation">.</span>FaceURL <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		val<span class="token punctuation">[</span><span class="token string">"face_url"</span><span class="token punctuation">]</span> <span class="token operator">=</span> user<span class="token punctuation">.</span>FaceURL
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> user<span class="token punctuation">.</span>Ex <span class="token operator">!=</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		val<span class="token punctuation">[</span><span class="token string">"ex"</span><span class="token punctuation">]</span> <span class="token operator">=</span> user<span class="token punctuation">.</span>FaceURL
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> user<span class="token punctuation">.</span>AppMangerLevel <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		val<span class="token punctuation">[</span><span class="token string">"app_manger_level"</span><span class="token punctuation">]</span> <span class="token operator">=</span> user<span class="token punctuation">.</span>AppMangerLevel
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> user<span class="token punctuation">.</span>GlobalRecvMsgOpt <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		val<span class="token punctuation">[</span><span class="token string">"global_recv_msg_opt"</span><span class="token punctuation">]</span> <span class="token operator">=</span> user<span class="token punctuation">.</span>GlobalRecvMsgOpt
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> val
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最初，使用 <code v-pre>relation.NewUserGorm(db)</code> 建立到数据库的基于VMM的连接。</p>
<p><code v-pre>convert.UserPb2DB</code> 函数将用户信息从协议缓冲区（protobuf）格式转换为与IBM兼容的数据库模型。</p>
<p>更新后的用户数据随后被传递给服务的 <code v-pre>Update</code> 方法。</p>
<p>代码现在使用 <code v-pre>newmgo.NewUserMongo(mongo.GetDatabase())</code> 建立到MongoDB的连接。这表明从关系数据库方法（RIMM）到NoSQL方法（MongoDB）的转变。</p>
<p>更新效率：使用 <code v-pre>UserPb2DBMap</code> 的新逻辑允许部分更新，因为只有更改的字段才包含在映射中。这比关系模型更有效，因为关系模型可能需要更新整行。</p>
<h2 id="以前-mysql-的逻辑" tabindex="-1"><a class="header-anchor" href="#以前-mysql-的逻辑" aria-hidden="true">#</a> 以前 Mysql 的逻辑</h2>
<p>我正在阅读和学习源码：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func Start(client registry.SvcDiscoveryRegistry, server *grpc.Server) error {
	rdb, err := cache.NewRedis()
	if err != nil {
		return err
	}
	mongo, err := unrelation.NewMongo()
	if err != nil {
		return err
	}
	users := make([]*tablerelation.UserModel, 0)
	if len(config.Config.Manager.UserID) != len(config.Config.Manager.Nickname) {
		return errors.New("len(config.Config.Manager.AppManagerUid) != len(config.Config.Manager.Nickname)")
	}
	for k, v := range config.Config.Manager.UserID {
		users = append(users, &amp;tablerelation.UserModel{UserID: v, Nickname: config.Config.Manager.Nickname[k], AppMangerLevel: constant.AppAdmin})
	}
	userDB, err := newmgo.NewUserMongo(mongo.GetDatabase())
	if err != nil {
		return err
	}
	tx, err := tx2.NewAuto(context.Background(), mongo.GetClient())
	if err != nil {
		return err
	}
	cache := cache.NewUserCacheRedis(rdb, userDB, cache.GetDefaultOpt())
	userMongoDB := unrelation.NewUserMongoDriver(mongo.GetDatabase())
	database := controller.NewUserDatabase(userDB, cache, tx, userMongoDB)
	friendRpcClient := rpcclient.NewFriendRpcClient(client)
	groupRpcClient := rpcclient.NewGroupRpcClient(client)
	msgRpcClient := rpcclient.NewMessageRpcClient(client)
	u := &amp;userServer{
		UserDatabase:             database,
		RegisterCenter:           client,
		friendRpcClient:          &amp;friendRpcClient,
		groupRpcClient:           &amp;groupRpcClient,
		friendNotificationSender: notification.NewFriendNotificationSender(&amp;msgRpcClient, notification.WithDBFunc(database.FindWithError)),
		userNotificationSender:   notification.NewUserNotificationSender(&amp;msgRpcClient, notification.WithUserFunc(database.FindWithError)),
	}
	pbuser.RegisterUserServer(server, u)
	return u.UserDatabase.InitOnce(context.Background(), users)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>帮我讲解这段源码的实现，步骤，以及设计实现，以及可以改进的思路</p>
<p>微服务或服务端应用程序的启动函数。它初始化各种服务和数据库连接，然后将服务注册到一个gRPC服务器。</p>
<h3 id="代码分析" tabindex="-1"><a class="header-anchor" href="#代码分析" aria-hidden="true">#</a> 代码分析</h3>
<ol>
<li><strong>初始化Redis缓存</strong>: <code v-pre>cache.NewRedis()</code> 创建一个新的Redis缓存实例。</li>
<li><strong>初始化MongoDB连接</strong>: <code v-pre>unrelation.NewMongo()</code> 用于创建和配置MongoDB连接。</li>
<li><strong>检查用户ID和昵称配置</strong>: 代码确保配置中的用户ID数量与昵称数量相等，如果不相等，则返回错误。</li>
<li><strong>构造用户模型</strong>: 遍历配置中的用户ID和昵称，创建用户模型数组。</li>
<li><strong>创建用户数据库实例</strong>: <code v-pre>newmgo.NewUserMongo(mongo.GetDatabase())</code> 用于初始化用户数据库操作的MongoDB实现。</li>
<li><strong>创建事务处理器</strong>: <code v-pre>tx2.NewAuto(context.Background(), mongo.GetClient())</code> 用于MongoDB的事务处理。</li>
<li><strong>创建缓存实例</strong>: 结合Redis缓存和用户数据库，创建用户缓存。</li>
<li><strong>创建用户MongoDB驱动</strong>: <code v-pre>unrelation.NewUserMongoDriver(mongo.GetDatabase())</code> 用于操作用户数据。</li>
<li><strong>初始化控制器</strong>: <code v-pre>controller.NewUserDatabase(userDB, cache, tx, userMongoDB)</code> 创建一个控制器，集成了用户数据库、缓存、事务处理器和MongoDB驱动。</li>
<li><strong>初始化RPC客户端</strong>: 创建用于与好友、群组和消息服务通信的RPC客户端。</li>
<li><strong>设置用户服务器</strong>: 创建一个用户服务器实例，并注册到gRPC服务器。</li>
<li><strong>初始化用户数据库</strong>: 使用初始用户模型数据初始化数据库。</li>
</ol>
<h3 id="设计实现" tabindex="-1"><a class="header-anchor" href="#设计实现" aria-hidden="true">#</a> 设计实现</h3>
<ul>
<li><strong>模块化设计</strong>: 每个功能（如数据库访问、缓存、RPC通信）都被分解为独立的模块，有助于代码的维护和扩展。</li>
<li><strong>错误处理</strong>: 在每个重要步骤之后都有错误检查，确保在出现问题时能够及时返回错误。</li>
<li><strong>配置验证</strong>: 检查配置的有效性，例如用户ID和昵称的数量匹配。</li>
</ul>
<h3 id="改进思路" tabindex="-1"><a class="header-anchor" href="#改进思路" aria-hidden="true">#</a> 改进思路</h3>
<ol>
<li><strong>配置和错误处理</strong>: 可以使用更先进的配置管理和错误处理库来简化代码和增强可读性。</li>
<li><strong>依赖注入</strong>: 使用依赖注入框架可以更好地管理对象的创建和依赖关系，减少代码耦合。</li>
<li><strong>日志记录</strong>: 在关键步骤中添加更详细的日志记录，有助于调试和跟踪问题。</li>
<li><strong>代码重构</strong>: 某些代码块（例如RPC客户端初始化）可以进一步抽象和封装，以减少重复代码。</li>
<li><strong>异步处理</strong>: 考虑在适当的地方引入异步处理，以提高性能和响应速度。</li>
<li><strong>单元测试</strong>: 加强单元测试，确保代码的可靠性和未来的可维护性。</li>
<li><strong>配置外部化</strong>: 将配置文件外部化，而不是硬编码在代码中，以增强灵活性和可配置性。</li>
</ol>
<h3 id="创建数据库事务" tabindex="-1"><a class="header-anchor" href="#创建数据库事务" aria-hidden="true">#</a> 创建数据库事务</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">NewAuto</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> cli <span class="token operator">*</span>mongo<span class="token punctuation">.</span>Client<span class="token punctuation">)</span> <span class="token punctuation">(</span>tx<span class="token punctuation">.</span>CtxTx<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">var</span> res <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>any
	<span class="token keyword">if</span> err <span class="token operator">:=</span> cli<span class="token punctuation">.</span><span class="token function">Database</span><span class="token punctuation">(</span><span class="token string">"admin"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">RunCommand</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> bson<span class="token punctuation">.</span>M<span class="token punctuation">{</span><span class="token string">"isMaster"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Decode</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>res<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> ok <span class="token operator">:=</span> res<span class="token punctuation">[</span><span class="token string">"setName"</span><span class="token punctuation">]</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token function">NewMongoTx</span><span class="token punctuation">(</span>cli<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token function">NewInvalidTx</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>具体针对MongoDB。让我们逐步分析这个函数：</p>
<h3 id="函数-newauto-分析" tabindex="-1"><a class="header-anchor" href="#函数-newauto-分析" aria-hidden="true">#</a> 函数 <code v-pre>NewAuto</code> 分析</h3>
<ol>
<li><strong>函数签名</strong>:
<ul>
<li><code v-pre>NewAuto(ctx context.Context, cli *mongo.Client) (tx.CtxTx, error)</code>: 这个函数接收一个上下文（<code v-pre>context.Context</code>）和一个MongoDB客户端（<code v-pre>*mongo.Client</code>），返回一个事务处理器接口（<code v-pre>tx.CtxTx</code>）和一个错误（<code v-pre>error</code>）。</li>
</ul>
</li>
<li><strong>运行MongoDB命令</strong>:
<ul>
<li><code v-pre>cli.Database(&quot;admin&quot;).RunCommand(ctx, bson.M{&quot;isMaster&quot;: 1}).Decode(&amp;res)</code>: 这行代码向MongoDB的admin数据库发送一个命令（<code v-pre>isMaster: 1</code>），来检查当前连接的MongoDB节点是否是主节点（master）。这个命令的响应被解码到变量 <code v-pre>res</code> 中。</li>
</ul>
</li>
<li><strong>检查响应</strong>:
<ul>
<li><code v-pre>if _, ok := res[&quot;setName&quot;]; ok { ... }</code>: 检查响应中是否包含键 <code v-pre>setName</code>。<code v-pre>setName</code> 存在表明当前MongoDB实例是一个复制集的一部分。</li>
</ul>
</li>
<li><strong>返回适当的事务处理器</strong>:
<ul>
<li>如果是复制集，使用 <code v-pre>NewMongoTx(cli)</code> 返回一个适合MongoDB复制集的事务处理器。</li>
<li>如果不是复制集，使用 <code v-pre>NewInvalidTx()</code> 返回一个无效的事务处理器。</li>
</ul>
</li>
</ol>
<h3 id="设计意图" tabindex="-1"><a class="header-anchor" href="#设计意图" aria-hidden="true">#</a> 设计意图</h3>
<ul>
<li><strong>动态检测</strong>: 通过检查MongoDB的配置（是否是复制集），动态地确定使用哪种类型的事务处理器。</li>
<li><strong>灵活性和兼容性</strong>: 代码可以处理不同的MongoDB部署配置（单节点或复制集），提高了通用性。</li>
</ul>
<h3 id="可能的改进" tabindex="-1"><a class="header-anchor" href="#可能的改进" aria-hidden="true">#</a> 可能的改进</h3>
<ol>
<li><strong>更详细的错误处理</strong>: 当 <code v-pre>RunCommand</code> 失败时，除了返回错误外，也可以记录更多关于错误的上下文信息，以便更好地理解错误发生的原因。</li>
<li><strong>配置检查优化</strong>: 如果这个函数经常被调用，频繁地运行 <code v-pre>isMaster</code> 命令可能会影响性能。可以考虑缓存这个信息或者在初始化时确定这个设置。</li>
<li><strong>增加日志记录</strong>: 在关键步骤（如命令执行、判断逻辑）添加日志记录，有助于调试和跟踪问题。</li>
<li><strong>异常情况处理</strong>: 在无法确定事务处理器类型时，除了返回一个无效的事务处理器外，还可以考虑提供一种默认的处理策略或者更明确的错误提示。</li>
</ol>
<h2 id="启动-rpc" tabindex="-1"><a class="header-anchor" href="#启动-rpc" aria-hidden="true">#</a> 启动 RPC</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>fnc <span class="token punctuation">(</span>a <span class="token operator">*</span>RpcCmd<span class="token punctuation">)</span> <span class="token function">StartSvr</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> rpcFn <span class="token keyword">func</span><span class="token punctuation">(</span>discov discoveryregistry<span class="token punctuation">.</span>SvcDiscoveryRegistry<span class="token punctuation">,</span> server <span class="token operator">*</span>grpc<span class="token punctuation">.</span>Server<span class="token punctuation">)</span> <span class="token builtin">error</span><span class="token punctuation">,</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> a<span class="token punctuation">.</span><span class="token function">GetPortFlag</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"port is required"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> startrpc<span class="token punctuation">.</span><span class="token function">Start</span><span class="token punctuation">(</span>a<span class="token punctuation">.</span><span class="token function">GetPortFlag</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> a<span class="token punctuation">.</span><span class="token function">GetPrometheusPortFlag</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> rpcFn<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数-startsvr-分析" tabindex="-1"><a class="header-anchor" href="#函数-startsvr-分析" aria-hidden="true">#</a> 函数 <code v-pre>StartSvr</code> 分析</h3>
<ol>
<li><strong>函数签名</strong>:
<ul>
<li><code v-pre>func (a *RpcCmd) StartSvr(name string, rpcFn func(discoveryregistry.SvcDiscoveryRegistry, *grpc.Server) error) error</code>: 这个函数是 <code v-pre>RpcCmd</code> 结构体的一个方法。它接收一个服务名称 <code v-pre>name</code> 和一个函数 <code v-pre>rpcFn</code>，这个函数自身接收一个服务发现注册表和一个gRPC服务器，并返回一个错误。<code v-pre>StartSvr</code> 函数也返回一个错误。</li>
</ul>
</li>
<li><strong>检查端口</strong>:
<ul>
<li><code v-pre>if a.GetPortFlag() == 0 { return errors.New(&quot;port is required&quot;) }</code>: 这行代码检查是否已经指定了端口号（通过 <code v-pre>GetPortFlag()</code> 方法）。如果没有指定端口号（即端口为0），则返回一个错误，表明端口是必需的。</li>
</ul>
</li>
<li><strong>启动RPC服务</strong>:
<ul>
<li><code v-pre>return startrpc.Start(a.GetPortFlag(), name, a.GetPrometheusPortFlag(), rpcFn)</code>: 如果端口号存在，该行代码使用提供的端口号、服务名称、Prometheus端口（用于监控）和RPC函数来启动RPC服务。</li>
</ul>
</li>
</ol>
<h3 id="设计意图-1" tabindex="-1"><a class="header-anchor" href="#设计意图-1" aria-hidden="true">#</a> 设计意图</h3>
<ul>
<li><strong>参数验证</strong>: 通过检查端口号，确保在启动服务前所有必需的配置都已设置。</li>
<li><strong>模块化</strong>: 将RPC服务的启动逻辑封装在一个单独的函数中，有助于代码的重用和维护。</li>
<li><strong>灵活性</strong>: 通过将RPC启动逻辑作为一个函数参数传递，这个方法可以启动不同类型的RPC服务。</li>
</ul>
<h2 id="mongo-中的事务" tabindex="-1"><a class="header-anchor" href="#mongo-中的事务" aria-hidden="true">#</a> Mongo 中的事务</h2>
<p>在一次业务实践中需要在 MongoDB 中使用自增 ID，而 MongoDB 本身并不支持自增 ID。我们需要通过一个单独的集合保存 ID，使用 <code v-pre>FindOneAndUpdate</code> 和 <code v-pre>$inc</code> 操作符实现 ID 的自增.</p>
<p>然而此时需要操作两个集合，因 MongoDB 的原子性只是针对单文档的，故会出现 ID 增加而插入失败的情况。</p>
<p>好在 MongoDB 在 4.0 中，支持了副本集上的多文档事务，在版本 4.2 中，引入了分布式事务，这增加了对分片群集上的多文档事务的支持，并合并了对副本集上多文档事务的现有支持。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">//开启一个会话</span>
sess <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">getMongo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">startSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">//开启事务</span>
sess<span class="token punctuation">.</span><span class="token function">startTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">//回滚</span>
sess<span class="token punctuation">.</span><span class="token function">abortTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">//提交</span>
sess<span class="token punctuation">.</span><span class="token function">commitTransaction</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token comment">//结束会话</span>
sess<span class="token punctuation">.</span><span class="token function">endSession</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重构后的-mongo-的逻辑" tabindex="-1"><a class="header-anchor" href="#重构后的-mongo-的逻辑" aria-hidden="true">#</a> 重构后的 Mongo 的逻辑</h2>
<p>参考 user 模块 mysql 重构为 mongo 代码:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func Start(client registry.SvcDiscoveryRegistry, server *grpc.Server) error {
	db, err := relation.NewGormDB()
	if err != nil {
		return err
	}
	rdb, err := cache.NewRedis()
	if err != nil {
		return err
	}
	mongo, err := unrelation.NewMongo()
	if err != nil {
		return err
	}
	if err := db.AutoMigrate(&amp;tablerelation.UserModel{}); err != nil {
		return err
	}
	users := make([]*tablerelation.UserModel, 0)
	if len(config.Config.Manager.UserID) != len(config.Config.Manager.Nickname) {
		return errors.New("len(config.Config.Manager.AppManagerUid) != len(config.Config.Manager.Nickname)")
	}
	for k, v := range config.Config.Manager.UserID {
		users = append(users, &amp;tablerelation.UserModel{UserID: v, Nickname: config.Config.Manager.Nickname[k], AppMangerLevel: constant.AppAdmin})
	}
	userDB := relation.NewUserGorm(db)
	cache := cache.NewUserCacheRedis(rdb, userDB, cache.GetDefaultOpt())
	userMongoDB := unrelation.NewUserMongoDriver(mongo.GetDatabase())
	database := controller.NewUserDatabase(userDB, cache, tx.NewGorm(db), userMongoDB)
	friendRpcClient := rpcclient.NewFriendRpcClient(client)
	groupRpcClient := rpcclient.NewGroupRpcClient(client)
	msgRpcClient := rpcclient.NewMessageRpcClient(client)
	u := &amp;userServer{
		UserDatabase:             database,
		RegisterCenter:           client,
		friendRpcClient:          &amp;friendRpcClient,
		groupRpcClient:           &amp;groupRpcClient,
		friendNotificationSender: notification.NewFriendNotificationSender(&amp;msgRpcClient, notification.WithDBFunc(database.FindWithError)),
		userNotificationSender:   notification.NewUserNotificationSender(&amp;msgRpcClient, notification.WithUserFunc(database.FindWithError)),
	}
	pbuser.RegisterUserServer(server, u)
	return u.UserDatabase.InitOnce(context.Background(), users)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是 user重构后的代码：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Start</span><span class="token punctuation">(</span>client registry<span class="token punctuation">.</span>SvcDiscoveryRegistry<span class="token punctuation">,</span> server <span class="token operator">*</span>grpc<span class="token punctuation">.</span>Server<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	db<span class="token punctuation">,</span> err <span class="token operator">:=</span> relation<span class="token punctuation">.</span><span class="token function">NewGormDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	rdb<span class="token punctuation">,</span> err <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">NewRedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	mongo<span class="token punctuation">,</span> err <span class="token operator">:=</span> unrelation<span class="token punctuation">.</span><span class="token function">NewMongo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">AutoMigrate</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>tablerelation<span class="token punctuation">.</span>UserModel<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	users <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>tablerelation<span class="token punctuation">.</span>UserModel<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Manager<span class="token punctuation">.</span>UserID<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">len</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Manager<span class="token punctuation">.</span>Nickname<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"len(config.Config.Manager.AppManagerUid) != len(config.Config.Manager.Nickname)"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Manager<span class="token punctuation">.</span>UserID <span class="token punctuation">{</span>
		users <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>users<span class="token punctuation">,</span> <span class="token operator">&amp;</span>tablerelation<span class="token punctuation">.</span>UserModel<span class="token punctuation">{</span>UserID<span class="token punctuation">:</span> v<span class="token punctuation">,</span> Nickname<span class="token punctuation">:</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Manager<span class="token punctuation">.</span>Nickname<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">,</span> AppMangerLevel<span class="token punctuation">:</span> constant<span class="token punctuation">.</span>AppAdmin<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	userDB<span class="token punctuation">,</span> err <span class="token operator">:=</span> newmgo<span class="token punctuation">.</span><span class="token function">NewUserMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	cache <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">NewUserCacheRedis</span><span class="token punctuation">(</span>rdb<span class="token punctuation">,</span> userDB<span class="token punctuation">,</span> cache<span class="token punctuation">.</span><span class="token function">GetDefaultOpt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	userMongoDB <span class="token operator">:=</span> unrelation<span class="token punctuation">.</span><span class="token function">NewUserMongoDriver</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	database <span class="token operator">:=</span> controller<span class="token punctuation">.</span><span class="token function">NewUserDatabase</span><span class="token punctuation">(</span>userDB<span class="token punctuation">,</span> cache<span class="token punctuation">,</span> tx<span class="token punctuation">.</span><span class="token function">NewMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> userMongoDB<span class="token punctuation">)</span>
	friendRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewFriendRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
	groupRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewGroupRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
	msgRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewMessageRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
	u <span class="token operator">:=</span> <span class="token operator">&amp;</span>userServer<span class="token punctuation">{</span>
		UserDatabase<span class="token punctuation">:</span>             database<span class="token punctuation">,</span>
		RegisterCenter<span class="token punctuation">:</span>           client<span class="token punctuation">,</span>
		friendRpcClient<span class="token punctuation">:</span>          <span class="token operator">&amp;</span>friendRpcClient<span class="token punctuation">,</span>
		groupRpcClient<span class="token punctuation">:</span>           <span class="token operator">&amp;</span>groupRpcClient<span class="token punctuation">,</span>
		friendNotificationSender<span class="token punctuation">:</span> notification<span class="token punctuation">.</span><span class="token function">NewFriendNotificationSender</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>msgRpcClient<span class="token punctuation">,</span> notification<span class="token punctuation">.</span><span class="token function">WithDBFunc</span><span class="token punctuation">(</span>database<span class="token punctuation">.</span>FindWithError<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		userNotificationSender<span class="token punctuation">:</span>   notification<span class="token punctuation">.</span><span class="token function">NewUserNotificationSender</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>msgRpcClient<span class="token punctuation">,</span> notification<span class="token punctuation">.</span><span class="token function">WithUserFunc</span><span class="token punctuation">(</span>database<span class="token punctuation">.</span>FindWithError<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	pbuser<span class="token punctuation">.</span><span class="token function">RegisterUserServer</span><span class="token punctuation">(</span>server<span class="token punctuation">,</span> u<span class="token punctuation">)</span>
	<span class="token keyword">return</span> u<span class="token punctuation">.</span>UserDatabase<span class="token punctuation">.</span><span class="token function">InitOnce</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> users<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>帮我模仿重构 friend 代码：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func Start(client registry.SvcDiscoveryRegistry, server *grpc.Server) error {
	db, err := relation.NewGormDB()
	if err != nil {
		return err
	}
	if err := db.AutoMigrate(&amp;tablerelation.FriendModel{}, &amp;tablerelation.FriendRequestModel{}, &amp;tablerelation.BlackModel{}); err != nil {
		return err
	}
	rdb, err := cache.NewRedis()
	if err != nil {
		return err
	}
	blackDB := relation.NewBlackGorm(db)
	friendDB := relation.NewFriendGorm(db)
	userRpcClient := rpcclient.NewUserRpcClient(client)
	msgRpcClient := rpcclient.NewMessageRpcClient(client)
	notificationSender := notification.NewFriendNotificationSender(
		&amp;msgRpcClient,
		notification.WithRpcFunc(userRpcClient.GetUsersInfo),
	)
	pbfriend.RegisterFriendServer(server, &amp;friendServer{
		friendDatabase: controller.NewFriendDatabase(
			friendDB,
			relation.NewFriendRequestGorm(db),
			cache.NewFriendCacheRedis(rdb, friendDB, cache.GetDefaultOpt()),
			tx.NewGorm(db),
		),
		blackDatabase: controller.NewBlackDatabase(
			blackDB,
			cache.NewBlackCacheRedis(rdb, blackDB, cache.GetDefaultOpt()),
		),
		userRpcClient:         &amp;userRpcClient,
		notificationSender:    notificationSender,
		RegisterCenter:        client,
		conversationRpcClient: rpcclient.NewConversationRpcClient(client),
	})
	return nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给出改进后的代码</p>
<h2 id="速读一遍" tabindex="-1"><a class="header-anchor" href="#速读一遍" aria-hidden="true">#</a> 速读一遍</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	rpcCmd <span class="token operator">:=</span> cmd<span class="token punctuation">.</span><span class="token function">NewRpcCmd</span><span class="token punctuation">(</span>cmd<span class="token punctuation">.</span>RpcUserServer<span class="token punctuation">)</span>
	rpcCmd<span class="token punctuation">.</span><span class="token function">AddPortFlag</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	rpcCmd<span class="token punctuation">.</span><span class="token function">AddPrometheusPortFlag</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> rpcCmd<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> rpcCmd<span class="token punctuation">.</span><span class="token function">StartSvr</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>RpcRegisterName<span class="token punctuation">.</span>OpenImUserName<span class="token punctuation">,</span> user<span class="token punctuation">.</span>Start<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>创建RPC命令对象</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>rpcCmd := cmd.NewRpcCmd(cmd.RpcUserServer)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行代码调用了<code v-pre>cmd</code>包中的<code v-pre>NewRpcCmd</code>函数，创建了一个RPC命令对象。传递给这个函数的参数<code v-pre>cmd.RpcUserServer</code>可能是一个配置或者常量，用于指定RPC服务的类型或配置。</p>
</li>
<li>
<p><strong>添加端口标志</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>rpcCmd.AddPortFlag()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行代码对<code v-pre>rpcCmd</code>对象调用<code v-pre>AddPortFlag</code>方法。这个方法可能用于添加或配置与RPC服务监听端口相关的命令行参数。</p>
</li>
<li>
<p><strong>添加普罗米修斯端口标志</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>rpcCmd.AddPrometheusPortFlag()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>类似于上面的端口标志添加，这行代码可能是为了配置Prometheus（一个开源监控系统）端口的相关参数。</p>
</li>
<li>
<p><strong>执行RPC命令</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if err := rpcCmd.Exec(); err != nil {
    panic(err.Error())
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这里，<code v-pre>Exec</code>方法被调用以执行RPC命令。如果执行中出现错误，程序会触发panic，打印错误信息并终止。</p>
</li>
<li>
<p><strong>启动RPC服务</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>if err := rpcCmd.StartSvr(config.Config.RpcRegisterName.OpenImUserName, user.Start); err != nil {
    panic(err.Error())
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，<code v-pre>StartSvr</code>方法被调用来启动RPC服务。这个方法接受两个参数：一是配置中的RPC注册名（可能是服务名称），二是启动服务时调用的函数（在这个例子中是<code v-pre>user.Start</code>）。</p>
</li>
</ol>
<p><strong>继续来看启动函数：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Start</span><span class="token punctuation">(</span>client registry<span class="token punctuation">.</span>SvcDiscoveryRegistry<span class="token punctuation">,</span> server <span class="token operator">*</span>grpc<span class="token punctuation">.</span>Server<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	rdb<span class="token punctuation">,</span> err <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">NewRedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	mongo<span class="token punctuation">,</span> err <span class="token operator">:=</span> unrelation<span class="token punctuation">.</span><span class="token function">NewMongo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	users <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>tablerelation<span class="token punctuation">.</span>UserModel<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> <span class="token function">len</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Manager<span class="token punctuation">.</span>UserID<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token function">len</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Manager<span class="token punctuation">.</span>Nickname<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"len(config.Config.Manager.AppManagerUid) != len(config.Config.Manager.Nickname)"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Manager<span class="token punctuation">.</span>UserID <span class="token punctuation">{</span>
		users <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>users<span class="token punctuation">,</span> <span class="token operator">&amp;</span>tablerelation<span class="token punctuation">.</span>UserModel<span class="token punctuation">{</span>UserID<span class="token punctuation">:</span> v<span class="token punctuation">,</span> Nickname<span class="token punctuation">:</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Manager<span class="token punctuation">.</span>Nickname<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">,</span> AppMangerLevel<span class="token punctuation">:</span> constant<span class="token punctuation">.</span>AppAdmin<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	userDB<span class="token punctuation">,</span> err <span class="token operator">:=</span> mgo<span class="token punctuation">.</span><span class="token function">NewUserMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	tx<span class="token punctuation">,</span> err <span class="token operator">:=</span> tx2<span class="token punctuation">.</span><span class="token function">NewAuto</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> mongo<span class="token punctuation">.</span><span class="token function">GetClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	cache <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">NewUserCacheRedis</span><span class="token punctuation">(</span>rdb<span class="token punctuation">,</span> userDB<span class="token punctuation">,</span> cache<span class="token punctuation">.</span><span class="token function">GetDefaultOpt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	userMongoDB <span class="token operator">:=</span> unrelation<span class="token punctuation">.</span><span class="token function">NewUserMongoDriver</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	database <span class="token operator">:=</span> controller<span class="token punctuation">.</span><span class="token function">NewUserDatabase</span><span class="token punctuation">(</span>userDB<span class="token punctuation">,</span> cache<span class="token punctuation">,</span> tx<span class="token punctuation">,</span> userMongoDB<span class="token punctuation">)</span>
	friendRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewFriendRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
	groupRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewGroupRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
	msgRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewMessageRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
	u <span class="token operator">:=</span> <span class="token operator">&amp;</span>userServer<span class="token punctuation">{</span>
		UserDatabase<span class="token punctuation">:</span>             database<span class="token punctuation">,</span>
		RegisterCenter<span class="token punctuation">:</span>           client<span class="token punctuation">,</span>
		friendRpcClient<span class="token punctuation">:</span>          <span class="token operator">&amp;</span>friendRpcClient<span class="token punctuation">,</span>
		groupRpcClient<span class="token punctuation">:</span>           <span class="token operator">&amp;</span>groupRpcClient<span class="token punctuation">,</span>
		friendNotificationSender<span class="token punctuation">:</span> notification<span class="token punctuation">.</span><span class="token function">NewFriendNotificationSender</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>msgRpcClient<span class="token punctuation">,</span> notification<span class="token punctuation">.</span><span class="token function">WithDBFunc</span><span class="token punctuation">(</span>database<span class="token punctuation">.</span>FindWithError<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		userNotificationSender<span class="token punctuation">:</span>   notification<span class="token punctuation">.</span><span class="token function">NewUserNotificationSender</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>msgRpcClient<span class="token punctuation">,</span> notification<span class="token punctuation">.</span><span class="token function">WithUserFunc</span><span class="token punctuation">(</span>database<span class="token punctuation">.</span>FindWithError<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	pbuser<span class="token punctuation">.</span><span class="token function">RegisterUserServer</span><span class="token punctuation">(</span>server<span class="token punctuation">,</span> u<span class="token punctuation">)</span>
	<span class="token keyword">return</span> u<span class="token punctuation">.</span>UserDatabase<span class="token punctuation">.</span><span class="token function">InitOnce</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> users<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>初始化缓存和数据库连接</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>coderdb<span class="token punctuation">,</span> err <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">NewRedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
mongo<span class="token punctuation">,</span> err <span class="token operator">:=</span> unrelation<span class="token punctuation">.</span><span class="token function">NewMongo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这两行代码分别初始化Redis缓存和Mongo数据库的连接。如果其中任何一个初始化过程出现错误，函数将返回该错误。</p>
</li>
<li>
<p><strong>配置管理员用户</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>users <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>tablerelation<span class="token punctuation">.</span>UserModel<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token operator">...</span>
<span class="token keyword">for</span> k<span class="token punctuation">,</span> v <span class="token operator">:=</span> <span class="token keyword">range</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Manager<span class="token punctuation">.</span>UserID <span class="token punctuation">{</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码创建了一个用户模型的切片，并基于配置中的管理员用户ID和昵称填充这个切片。它还检查ID和昵称数量是否匹配，不匹配则返回错误。</p>
</li>
<li>
<p><strong>创建数据库和事务实例</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>userDB<span class="token punctuation">,</span> err <span class="token operator">:=</span> mgo<span class="token punctuation">.</span><span class="token function">NewUserMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
tx<span class="token punctuation">,</span> err <span class="token operator">:=</span> tx2<span class="token punctuation">.</span><span class="token function">NewAuto</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> mongo<span class="token punctuation">.</span><span class="token function">GetClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这里初始化了用户数据库的Mongo实例和一个自动事务处理器。</p>
</li>
<li>
<p><strong>创建缓存和数据库访问层</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>cache <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">NewUserCacheRedis</span><span class="token punctuation">(</span>rdb<span class="token punctuation">,</span> userDB<span class="token punctuation">,</span> cache<span class="token punctuation">.</span><span class="token function">GetDefaultOpt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
userMongoDB <span class="token operator">:=</span> unrelation<span class="token punctuation">.</span><span class="token function">NewUserMongoDriver</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
database <span class="token operator">:=</span> controller<span class="token punctuation">.</span><span class="token function">NewUserDatabase</span><span class="token punctuation">(</span>userDB<span class="token punctuation">,</span> cache<span class="token punctuation">,</span> tx<span class="token punctuation">,</span> userMongoDB<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这部分代码设置了用户缓存，并创建了一个数据库访问层，它结合了Redis缓存、Mongo数据库和事务处理器。</p>
</li>
<li>
<p><strong>初始化RPC客户端</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>friendRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewFriendRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
groupRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewGroupRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
msgRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewMessageRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里创建了几个RPC客户端，用于与其他服务（如朋友服务、群组服务和消息服务）进行通信。</p>
</li>
<li>
<p><strong>配置用户服务</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>u <span class="token operator">:=</span> <span class="token operator">&amp;</span>userServer<span class="token punctuation">{</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这一步，创建了一个<code v-pre>userServer</code>实例，它封装了上面创建的所有组件和服务。</p>
</li>
<li>
<p><strong>注册RPC服务和初始化数据库</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>pbuser<span class="token punctuation">.</span><span class="token function">RegisterUserServer</span><span class="token punctuation">(</span>server<span class="token punctuation">,</span> u<span class="token punctuation">)</span>
<span class="token keyword">return</span> u<span class="token punctuation">.</span>UserDatabase<span class="token punctuation">.</span><span class="token function">InitOnce</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> users<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，这个<code v-pre>userServer</code>实例被注册为一个RPC服务，并且调用<code v-pre>InitOnce</code>方法来初始化用户数据库。</p>
</li>
</ol>
<p><strong>Third</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Start</span><span class="token punctuation">(</span>client discoveryregistry<span class="token punctuation">.</span>SvcDiscoveryRegistry<span class="token punctuation">,</span> server <span class="token operator">*</span>grpc<span class="token punctuation">.</span>Server<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	mongo<span class="token punctuation">,</span> err <span class="token operator">:=</span> unrelation<span class="token punctuation">.</span><span class="token function">NewMongo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	logdb<span class="token punctuation">,</span> err <span class="token operator">:=</span> mgo<span class="token punctuation">.</span><span class="token function">NewLogMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	s3db<span class="token punctuation">,</span> err <span class="token operator">:=</span> mgo<span class="token punctuation">.</span><span class="token function">NewS3Mongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	apiURL <span class="token operator">:=</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Object<span class="token punctuation">.</span>ApiURL
	<span class="token keyword">if</span> apiURL <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"api url is empty"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> url<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Object<span class="token punctuation">.</span>ApiURL<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> apiURL<span class="token punctuation">[</span><span class="token function">len</span><span class="token punctuation">(</span>apiURL<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">!=</span> <span class="token char">'/'</span> <span class="token punctuation">{</span>
		apiURL <span class="token operator">+=</span> <span class="token string">"/"</span>
	<span class="token punctuation">}</span>
	apiURL <span class="token operator">+=</span> <span class="token string">"object/"</span>
	rdb<span class="token punctuation">,</span> err <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">NewRedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	<span class="token comment">// 根据配置文件策略选择 oss 方式</span>
	enable <span class="token operator">:=</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Object<span class="token punctuation">.</span>Enable
	<span class="token keyword">var</span> o s3<span class="token punctuation">.</span>Interface
	<span class="token keyword">switch</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Object<span class="token punctuation">.</span>Enable <span class="token punctuation">{</span>
	<span class="token keyword">case</span> <span class="token string">"minio"</span><span class="token punctuation">:</span>
		o<span class="token punctuation">,</span> err <span class="token operator">=</span> minio<span class="token punctuation">.</span><span class="token function">NewMinio</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">NewMinioCache</span><span class="token punctuation">(</span>rdb<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token string">"cos"</span><span class="token punctuation">:</span>
		o<span class="token punctuation">,</span> err <span class="token operator">=</span> cos<span class="token punctuation">.</span><span class="token function">NewCos</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">case</span> <span class="token string">"oss"</span><span class="token punctuation">:</span>
		o<span class="token punctuation">,</span> err <span class="token operator">=</span> oss<span class="token punctuation">.</span><span class="token function">NewOSS</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		err <span class="token operator">=</span> fmt<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"invalid object enable: %s"</span><span class="token punctuation">,</span> enable<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	third<span class="token punctuation">.</span><span class="token function">RegisterThirdServer</span><span class="token punctuation">(</span>server<span class="token punctuation">,</span> <span class="token operator">&amp;</span>thirdServer<span class="token punctuation">{</span>
		apiURL<span class="token punctuation">:</span>        apiURL<span class="token punctuation">,</span>
		thirdDatabase<span class="token punctuation">:</span> controller<span class="token punctuation">.</span><span class="token function">NewThirdDatabase</span><span class="token punctuation">(</span>cache<span class="token punctuation">.</span><span class="token function">NewMsgCacheModel</span><span class="token punctuation">(</span>rdb<span class="token punctuation">)</span><span class="token punctuation">,</span> logdb<span class="token punctuation">)</span><span class="token punctuation">,</span>
		userRpcClient<span class="token punctuation">:</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewUserRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span><span class="token punctuation">,</span>
		s3dataBase<span class="token punctuation">:</span>    controller<span class="token punctuation">.</span><span class="token function">NewS3Database</span><span class="token punctuation">(</span>rdb<span class="token punctuation">,</span> o<span class="token punctuation">,</span> s3db<span class="token punctuation">)</span><span class="token punctuation">,</span>
		defaultExpire<span class="token punctuation">:</span> time<span class="token punctuation">.</span>Hour <span class="token operator">*</span> <span class="token number">24</span> <span class="token operator">*</span> <span class="token number">7</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><strong>初始化Mongo数据库连接</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>mongo<span class="token punctuation">,</span> err <span class="token operator">:=</span> unrelation<span class="token punctuation">.</span><span class="token function">NewMongo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这一行初始化Mongo数据库的连接。如果出现错误，则函数返回该错误。</p>
</li>
<li>
<p><strong>创建日志和S3数据库实例</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>logdb<span class="token punctuation">,</span> err <span class="token operator">:=</span> mgo<span class="token punctuation">.</span><span class="token function">NewLogMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
s3db<span class="token punctuation">,</span> err <span class="token operator">:=</span> mgo<span class="token punctuation">.</span><span class="token function">NewS3Mongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这两行代码分别初始化日志数据库和S3数据库的实例。</p>
</li>
<li>
<p><strong>配置和验证API URL</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>apiURL <span class="token operator">:=</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Object<span class="token punctuation">.</span>ApiURL
<span class="token operator">...</span>
<span class="token keyword">if</span> <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> url<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span>config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Object<span class="token punctuation">.</span>ApiURL<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> err
<span class="token punctuation">}</span>
<span class="token operator">...</span>
apiURL <span class="token operator">+=</span> <span class="token string">"object/"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这部分代码获取API URL的配置，检查其有效性，并对其进行必要的格式调整。</p>
</li>
<li>
<p><strong>初始化Redis缓存</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>rdb<span class="token punctuation">,</span> err <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">NewRedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这行代码初始化Redis缓存。如果初始化失败，函数将返回错误。</p>
</li>
<li>
<p><strong>配置对象存储服务（OSS）</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> o s3<span class="token punctuation">.</span>Interface
<span class="token keyword">switch</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>Object<span class="token punctuation">.</span>Enable <span class="token punctuation">{</span>
    <span class="token keyword">case</span> <span class="token string">"minio"</span><span class="token punctuation">:</span>
        <span class="token operator">...</span>
    <span class="token keyword">case</span> <span class="token string">"cos"</span><span class="token punctuation">:</span>
        <span class="token operator">...</span>
    <span class="token keyword">case</span> <span class="token string">"oss"</span><span class="token punctuation">:</span>
        <span class="token operator">...</span>
    <span class="token keyword">default</span><span class="token punctuation">:</span>
        <span class="token operator">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>根据配置，这段代码选择并初始化相应的对象存储服务，例如Minio、COS或OSS。</p>
</li>
<li>
<p><strong>注册RPC服务和初始化数据库</strong>:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>third<span class="token punctuation">.</span><span class="token function">RegisterThirdServer</span><span class="token punctuation">(</span>server<span class="token punctuation">,</span> <span class="token operator">&amp;</span>thirdServer<span class="token punctuation">{</span>
    <span class="token operator">...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，这个<code v-pre>thirdServer</code>实例被注册为一个RPC服务。这个实例集成了API URL、数据库、缓存以及用户RPC客户端。</p>
</li>
</ol>
<p><strong>Friend:</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Start</span><span class="token punctuation">(</span>client registry<span class="token punctuation">.</span>SvcDiscoveryRegistry<span class="token punctuation">,</span> server <span class="token operator">*</span>grpc<span class="token punctuation">.</span>Server<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token comment">// Initialize MongoDB</span>
	mongo<span class="token punctuation">,</span> err <span class="token operator">:=</span> unrelation<span class="token punctuation">.</span><span class="token function">NewMongo</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	<span class="token comment">// Initialize Redis</span>
	rdb<span class="token punctuation">,</span> err <span class="token operator">:=</span> cache<span class="token punctuation">.</span><span class="token function">NewRedis</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	friendMongoDB<span class="token punctuation">,</span> err <span class="token operator">:=</span> mgo<span class="token punctuation">.</span><span class="token function">NewFriendMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	friendRequestMongoDB<span class="token punctuation">,</span> err <span class="token operator">:=</span> mgo<span class="token punctuation">.</span><span class="token function">NewFriendRequestMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	blackMongoDB<span class="token punctuation">,</span> err <span class="token operator">:=</span> mgo<span class="token punctuation">.</span><span class="token function">NewBlackMongo</span><span class="token punctuation">(</span>mongo<span class="token punctuation">.</span><span class="token function">GetDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	<span class="token comment">// Initialize RPC clients</span>
	userRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewUserRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>
	msgRpcClient <span class="token operator">:=</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewMessageRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span>

	<span class="token comment">// Initialize notification sender</span>
	notificationSender <span class="token operator">:=</span> notification<span class="token punctuation">.</span><span class="token function">NewFriendNotificationSender</span><span class="token punctuation">(</span>
		<span class="token operator">&amp;</span>msgRpcClient<span class="token punctuation">,</span>
		notification<span class="token punctuation">.</span><span class="token function">WithRpcFunc</span><span class="token punctuation">(</span>userRpcClient<span class="token punctuation">.</span>GetUsersInfo<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">)</span>
	tx<span class="token punctuation">,</span> err <span class="token operator">:=</span> tx2<span class="token punctuation">.</span><span class="token function">NewAuto</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> mongo<span class="token punctuation">.</span><span class="token function">GetClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>
	<span class="token comment">// Register Friend server with refactored MongoDB and Redis integrations</span>
	pbfriend<span class="token punctuation">.</span><span class="token function">RegisterFriendServer</span><span class="token punctuation">(</span>server<span class="token punctuation">,</span> <span class="token operator">&amp;</span>friendServer<span class="token punctuation">{</span>
		friendDatabase<span class="token punctuation">:</span> controller<span class="token punctuation">.</span><span class="token function">NewFriendDatabase</span><span class="token punctuation">(</span>
			friendMongoDB<span class="token punctuation">,</span>
			friendRequestMongoDB<span class="token punctuation">,</span>
			cache<span class="token punctuation">.</span><span class="token function">NewFriendCacheRedis</span><span class="token punctuation">(</span>rdb<span class="token punctuation">,</span> friendMongoDB<span class="token punctuation">,</span> cache<span class="token punctuation">.</span><span class="token function">GetDefaultOpt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
			tx<span class="token punctuation">,</span>
		<span class="token punctuation">)</span><span class="token punctuation">,</span>
		blackDatabase<span class="token punctuation">:</span> controller<span class="token punctuation">.</span><span class="token function">NewBlackDatabase</span><span class="token punctuation">(</span>
			blackMongoDB<span class="token punctuation">,</span>
			cache<span class="token punctuation">.</span><span class="token function">NewBlackCacheRedis</span><span class="token punctuation">(</span>rdb<span class="token punctuation">,</span> blackMongoDB<span class="token punctuation">,</span> cache<span class="token punctuation">.</span><span class="token function">GetDefaultOpt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		<span class="token punctuation">)</span><span class="token punctuation">,</span>
		userRpcClient<span class="token punctuation">:</span>         <span class="token operator">&amp;</span>userRpcClient<span class="token punctuation">,</span>
		notificationSender<span class="token punctuation">:</span>    notificationSender<span class="token punctuation">,</span>
		RegisterCenter<span class="token punctuation">:</span>        client<span class="token punctuation">,</span>
		conversationRpcClient<span class="token punctuation">:</span> rpcclient<span class="token punctuation">.</span><span class="token function">NewConversationRpcClient</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong>初始化MongoDB和Redis</strong>:
<ul>
<li>这部分代码初始化MongoDB和Redis连接。MongoDB用于存储数据，而Redis可能用于缓存以提高性能。</li>
</ul>
</li>
<li><strong>创建不同类型的MongoDB实例</strong>:
<ul>
<li><code v-pre>friendMongoDB</code>, <code v-pre>friendRequestMongoDB</code>, <code v-pre>blackMongoDB</code>分别初始化了针对朋友关系、朋友请求和黑名单的MongoDB实例。</li>
</ul>
</li>
<li><strong>初始化RPC客户端</strong>:
<ul>
<li><code v-pre>userRpcClient</code> 和 <code v-pre>msgRpcClient</code> 分别初始化了用户和消息的RPC客户端，这表明<code v-pre>Friend</code>服务需要与用户服务和消息服务进行通信。</li>
</ul>
</li>
<li><strong>初始化通知发送器</strong>:
<ul>
<li><code v-pre>notificationSender</code> 初始化了一个朋友通知发送器，它可能用于在朋友关系的各种操作（如添加朋友、朋友请求等）时发送通知。</li>
</ul>
</li>
<li><strong>初始化事务处理器</strong>:
<ul>
<li><code v-pre>tx</code> 表示一个自动事务处理器，它可能用于处理涉及多个数据库操作的复杂事务。</li>
</ul>
</li>
<li><strong>注册Friend服务</strong>:
<ul>
<li><code v-pre>pbfriend.RegisterFriendServer</code> 这行代码将<code v-pre>friendServer</code>实例注册为一个gRPC服务。这个服务包括朋友数据库、黑名单数据库、RPC客户端以及通知发送器。</li>
</ul>
</li>
<li><strong>服务功能</strong>:
<ul>
<li>根据这段代码，<code v-pre>Friend</code>服务可能负责管理用户间的朋友关系，处理朋友请求，维护黑名单，以及处理与这些功能相关的通知和通信。</li>
</ul>
</li>
</ol>
<p>总体来看，<code v-pre>Friend</code>服务似乎是一个专门处理用户社交关系（如朋友关系、朋友请求和黑名单）的后端服务。它通过RPC客户端与其他服务（如用户服务和消息服务）交互，并利用MongoDB和Redis进行数据存储和缓存管理。这样的服务对于社交网络、通讯应用或任何涉及用户间交互的平台来说都是非常重要的。</p>
<p><strong>继续解读：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// NewUserRpcClient initializes a UserRpcClient based on the provided service discovery registry.</span>
<span class="token keyword">func</span> <span class="token function">NewUserRpcClient</span><span class="token punctuation">(</span>client discoveryregistry<span class="token punctuation">.</span>SvcDiscoveryRegistry<span class="token punctuation">)</span> UserRpcClient <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token function">UserRpcClient</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token function">NewUser</span><span class="token punctuation">(</span>client<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// UserRpcClient represents the structure for a User RPC client.</span>
<span class="token keyword">type</span> UserRpcClient User

<span class="token comment">// NewUser initializes and returns a User instance based on the provided service discovery registry.</span>
<span class="token keyword">func</span> <span class="token function">NewUser</span><span class="token punctuation">(</span>discov discoveryregistry<span class="token punctuation">.</span>SvcDiscoveryRegistry<span class="token punctuation">)</span> <span class="token operator">*</span>User <span class="token punctuation">{</span>
	conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> discov<span class="token punctuation">.</span><span class="token function">GetConn</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> config<span class="token punctuation">.</span>Config<span class="token punctuation">.</span>RpcRegisterName<span class="token punctuation">.</span>OpenImUserName<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	client <span class="token operator">:=</span> user<span class="token punctuation">.</span><span class="token function">NewUserClient</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>User<span class="token punctuation">{</span>Discov<span class="token punctuation">:</span> discov<span class="token punctuation">,</span> Client<span class="token punctuation">:</span> client<span class="token punctuation">,</span> conn<span class="token punctuation">:</span> conn<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	conn   grpc<span class="token punctuation">.</span>ClientConnInterface
	Client user<span class="token punctuation">.</span>UserClient
	Discov discoveryregistry<span class="token punctuation">.</span>SvcDiscoveryRegistry
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li><strong><code v-pre>NewUserRpcClient</code>函数</strong>:
<ul>
<li>这个函数接受一个服务发现注册表对象（<code v-pre>discoveryregistry.SvcDiscoveryRegistry</code>）。</li>
<li>它调用<code v-pre>NewUser</code>函数来创建一个<code v-pre>User</code>实例，并将其转换为<code v-pre>UserRpcClient</code>类型。</li>
<li>这种设计模式表明，<code v-pre>UserRpcClient</code>是<code v-pre>User</code>的包装或别名，可能用于提供更具体的或附加的功能。</li>
</ul>
</li>
<li><strong><code v-pre>UserRpcClient</code>类型</strong>:
<ul>
<li><code v-pre>UserRpcClient</code>被定义为<code v-pre>User</code>类型的别名。</li>
<li>这意味着它继承了<code v-pre>User</code>类型的所有字段和方法，但也可以定义额外的方法或覆盖现有的方法。</li>
</ul>
</li>
<li><strong><code v-pre>NewUser</code>函数</strong>:
<ul>
<li>这个函数同样接受服务发现注册表对象。</li>
<li>它使用这个注册表来获取与用户服务的连接（通过<code v-pre>discov.GetConn</code>方法）。</li>
<li>如果获取连接过程中出现错误，函数会触发panic，这表明无法连接至用户服务是一个严重的错误情况。</li>
<li>一旦连接被建立，它使用这个连接来创建一个gRPC客户端（<code v-pre>user.NewUserClient</code>）。</li>
</ul>
</li>
<li><strong><code v-pre>User</code>结构体</strong>:
<ul>
<li><code v-pre>User</code>结构体包含三个字段：<code v-pre>conn</code>（gRPC连接），<code v-pre>Client</code>（用户服务的gRPC客户端），和<code v-pre>Discov</code>（服务发现注册表）。</li>
<li>这个结构体封装了与用户服务通信所需的所有元素。</li>
</ul>
</li>
</ol>
<h2 id="s3-模块学习" tabindex="-1"><a class="header-anchor" href="#s3-模块学习" aria-hidden="true">#</a> s3 模块学习</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Controller<span class="token punctuation">)</span> <span class="token function">CompleteUpload</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> uploadID <span class="token builtin">string</span><span class="token punctuation">,</span> partHashs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>UploadResult<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> log<span class="token punctuation">.</span><span class="token function">ZDebug</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">"return"</span><span class="token punctuation">)</span>
	upload<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">parseMultipartUploadID</span><span class="token punctuation">(</span>uploadID<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> md5Sum <span class="token operator">:=</span> md5<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>partHashs<span class="token punctuation">,</span> partSeparator<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> hex<span class="token punctuation">.</span><span class="token function">EncodeToString</span><span class="token punctuation">(</span>md5Sum<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">!=</span> upload<span class="token punctuation">.</span>Hash <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"md5 mismatching"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> info<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">StatObject</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> c<span class="token punctuation">.</span><span class="token function">HashPath</span><span class="token punctuation">(</span>upload<span class="token punctuation">.</span>Hash<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token operator">&amp;</span>UploadResult<span class="token punctuation">{</span>
			Key<span class="token punctuation">:</span>  info<span class="token punctuation">.</span>Key<span class="token punctuation">,</span>
			Size<span class="token punctuation">:</span> info<span class="token punctuation">.</span>Size<span class="token punctuation">,</span>
			Hash<span class="token punctuation">:</span> info<span class="token punctuation">.</span>ETag<span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token operator">!</span>c<span class="token punctuation">.</span><span class="token function">IsNotFound</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	cleanObject <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> key <span class="token operator">:=</span> <span class="token keyword">range</span> cleanObject <span class="token punctuation">{</span>
			<span class="token boolean">_</span> <span class="token operator">=</span> c<span class="token punctuation">.</span>impl<span class="token punctuation">.</span><span class="token function">DeleteObject</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> key<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">var</span> targetKey <span class="token builtin">string</span>
	<span class="token keyword">switch</span> upload<span class="token punctuation">.</span>Type <span class="token punctuation">{</span>
	<span class="token keyword">case</span> UploadTypeMultipart<span class="token punctuation">:</span>
		parts <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>s3<span class="token punctuation">.</span>Part<span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>partHashs<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">for</span> i<span class="token punctuation">,</span> part <span class="token operator">:=</span> <span class="token keyword">range</span> partHashs <span class="token punctuation">{</span>
			parts<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">=</span> s3<span class="token punctuation">.</span>Part<span class="token punctuation">{</span>
				PartNumber<span class="token punctuation">:</span> i <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">,</span>
				ETag<span class="token punctuation">:</span>       part<span class="token punctuation">,</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// todo: 验证大小</span>
		result<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>impl<span class="token punctuation">.</span><span class="token function">CompleteMultipartUpload</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> upload<span class="token punctuation">.</span>ID<span class="token punctuation">,</span> upload<span class="token punctuation">.</span>Key<span class="token punctuation">,</span> parts<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
		<span class="token punctuation">}</span>
		targetKey <span class="token operator">=</span> result<span class="token punctuation">.</span>Key
	<span class="token keyword">case</span> UploadTypePresigned<span class="token punctuation">:</span>
		uploadInfo<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span><span class="token function">StatObject</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> upload<span class="token punctuation">.</span>Key<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
		<span class="token punctuation">}</span>
		cleanObject<span class="token punctuation">[</span>uploadInfo<span class="token punctuation">.</span>Key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
		<span class="token keyword">if</span> uploadInfo<span class="token punctuation">.</span>Size <span class="token operator">!=</span> upload<span class="token punctuation">.</span>Size <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"upload size mismatching"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		md5Sum <span class="token operator">:=</span> md5<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span>uploadInfo<span class="token punctuation">.</span>ETag<span class="token punctuation">}</span><span class="token punctuation">,</span> partSeparator<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> md5val <span class="token operator">:=</span> hex<span class="token punctuation">.</span><span class="token function">EncodeToString</span><span class="token punctuation">(</span>md5Sum<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> md5val <span class="token operator">!=</span> upload<span class="token punctuation">.</span>Hash <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> errs<span class="token punctuation">.</span>ErrArgs<span class="token punctuation">.</span><span class="token function">Wrap</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"md5 mismatching %s != %s"</span><span class="token punctuation">,</span> md5val<span class="token punctuation">,</span> upload<span class="token punctuation">.</span>Hash<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		<span class="token comment">// 防止在这个时候，并发操作，导致文件被覆盖</span>
		copyInfo<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>impl<span class="token punctuation">.</span><span class="token function">CopyObject</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> uploadInfo<span class="token punctuation">.</span>Key<span class="token punctuation">,</span> upload<span class="token punctuation">.</span>Key<span class="token operator">+</span><span class="token string">"."</span><span class="token operator">+</span>c<span class="token punctuation">.</span><span class="token function">UUID</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
		<span class="token punctuation">}</span>
		cleanObject<span class="token punctuation">[</span>copyInfo<span class="token punctuation">.</span>Key<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
		<span class="token keyword">if</span> copyInfo<span class="token punctuation">.</span>ETag <span class="token operator">!=</span> uploadInfo<span class="token punctuation">.</span>ETag <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"[concurrency]copy md5 mismatching"</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
		hashCopyInfo<span class="token punctuation">,</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>impl<span class="token punctuation">.</span><span class="token function">CopyObject</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> copyInfo<span class="token punctuation">.</span>Key<span class="token punctuation">,</span> c<span class="token punctuation">.</span><span class="token function">HashPath</span><span class="token punctuation">(</span>upload<span class="token punctuation">.</span>Hash<span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
		<span class="token punctuation">}</span>
		log<span class="token punctuation">.</span><span class="token function">ZInfo</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token string">"hashCopyInfo"</span><span class="token punctuation">,</span> <span class="token string">"value"</span><span class="token punctuation">,</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%+v"</span><span class="token punctuation">,</span> hashCopyInfo<span class="token punctuation">)</span><span class="token punctuation">)</span>
		targetKey <span class="token operator">=</span> hashCopyInfo<span class="token punctuation">.</span>Key
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"invalid upload id type"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> c<span class="token punctuation">.</span>cache<span class="token punctuation">.</span><span class="token function">DelS3Key</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>impl<span class="token punctuation">.</span><span class="token function">Engine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> targetKey<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">ExecDel</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>UploadResult<span class="token punctuation">{</span>
		Key<span class="token punctuation">:</span>  targetKey<span class="token punctuation">,</span>
		Size<span class="token punctuation">:</span> upload<span class="token punctuation">.</span>Size<span class="token punctuation">,</span>
		Hash<span class="token punctuation">:</span> upload<span class="token punctuation">.</span>Hash<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="第一部分-路由定义" tabindex="-1"><a class="header-anchor" href="#第一部分-路由定义" aria-hidden="true">#</a> 第一部分：路由定义</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>objectGroup<span class="token punctuation">.</span><span class="token function">POST</span><span class="token punctuation">(</span><span class="token string">"/complete_multipart_upload"</span><span class="token punctuation">,</span> t<span class="token punctuation">.</span>CompleteMultipartUpload<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>这一行定义了一个HTTP POST路由，当客户端向<code v-pre>/complete_multipart_upload</code>发送POST请求时，会调用<code v-pre>CompleteMultipartUpload</code>方法。</li>
</ul>
<h3 id="第二部分-处理请求" tabindex="-1"><a class="header-anchor" href="#第二部分-处理请求" aria-hidden="true">#</a> 第二部分：处理请求</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>ThirdApi<span class="token punctuation">)</span> <span class="token function">CompleteMultipartUpload</span><span class="token punctuation">(</span>c <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    a2r<span class="token punctuation">.</span><span class="token function">Call</span><span class="token punctuation">(</span>third<span class="token punctuation">.</span>ThirdClient<span class="token punctuation">.</span>CompleteMultipartUpload<span class="token punctuation">,</span> o<span class="token punctuation">.</span>Client<span class="token punctuation">,</span> c<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这个函数是一个路由处理器，它使用<code v-pre>gin.Context</code>来处理HTTP请求。它调用<code v-pre>a2r.Call</code>方法，将请求转发给实际处理函数。</li>
</ul>
<h3 id="第三部分-业务逻辑" tabindex="-1"><a class="header-anchor" href="#第三部分-业务逻辑" aria-hidden="true">#</a> 第三部分：业务逻辑</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>t <span class="token operator">*</span>thirdServer<span class="token punctuation">)</span> <span class="token function">CompleteMultipartUpload</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> req <span class="token operator">*</span>third<span class="token punctuation">.</span>CompleteMultipartUploadReq<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>third<span class="token punctuation">.</span>CompleteMultipartUploadResp<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这是核心的业务逻辑函数。它首先进行一些检查，然后调用<code v-pre>s3Database</code>的<code v-pre>CompleteMultipartUpload</code>方法来完成上传。接着，它创建一个对象模型并保存到数据库。最后返回一个响应。</li>
</ul>
<h3 id="第四部分-完成上传" tabindex="-1"><a class="header-anchor" href="#第四部分-完成上传" aria-hidden="true">#</a> 第四部分：完成上传</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>s <span class="token operator">*</span>s3Database<span class="token punctuation">)</span> <span class="token function">CompleteMultipartUpload</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> uploadID <span class="token builtin">string</span><span class="token punctuation">,</span> parts <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>cont<span class="token punctuation">.</span>UploadResult<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> s<span class="token punctuation">.</span>s3<span class="token punctuation">.</span><span class="token function">CompleteUpload</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> uploadID<span class="token punctuation">,</span> parts<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这个函数实际上只是一个简单的封装，调用另一个<code v-pre>CompleteUpload</code>函数来完成上传。</li>
</ul>
<h3 id="第五部分-完成上传的实现" tabindex="-1"><a class="header-anchor" href="#第五部分-完成上传的实现" aria-hidden="true">#</a> 第五部分：完成上传的实现</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>Controller<span class="token punctuation">)</span> <span class="token function">CompleteUpload</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> uploadID <span class="token builtin">string</span><span class="token punctuation">,</span> partHashs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>UploadResult<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这是一个更复杂的函数，包含实际完成上传的逻辑。它处理多部分上传的不同场景（如多部分上传、预签名上传等），验证MD5值，处理文件复制和移动，最后返回上传结果。</li>
</ul>
<h3 id="关键点" tabindex="-1"><a class="header-anchor" href="#关键点" aria-hidden="true">#</a> 关键点</h3>
<ol>
<li><strong>错误处理</strong>：在每个函数中，错误情况都被仔细处理，并返回相应的错误信息。</li>
<li><strong>MD5验证</strong>：代码在多个地方验证上传部分的MD5哈希值，确保数据的一致性和完整性。</li>
<li><strong>并发处理</strong>：在处理上传的最后阶段，代码考虑了并发操作的情况，确保数据的一致性。</li>
</ol>
<p>整体而言，这是一段处理文件上传的后端服务代码，特别关注于多部分上传的完成和验证。代码结构清晰，有适当的错误处理和日志记录，符合现代后端开发的标准。</p>
<h3 id="复制对象存储" tabindex="-1"><a class="header-anchor" href="#复制对象存储" aria-hidden="true">#</a> 复制对象存储</h3>
<p><strong>继续开始看看复制对象存储是如何做的：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>o <span class="token operator">*</span>OSS<span class="token punctuation">)</span> <span class="token function">CopyObject</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> src <span class="token builtin">string</span><span class="token punctuation">,</span> dst <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>s3<span class="token punctuation">.</span>CopyObjectInfo<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	result<span class="token punctuation">,</span> err <span class="token operator">:=</span> o<span class="token punctuation">.</span>bucket<span class="token punctuation">.</span><span class="token function">CopyObject</span><span class="token punctuation">(</span>src<span class="token punctuation">,</span> dst<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>s3<span class="token punctuation">.</span>CopyObjectInfo<span class="token punctuation">{</span>
		Key<span class="token punctuation">:</span>  dst<span class="token punctuation">,</span>
		ETag<span class="token punctuation">:</span> strings<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span>strings<span class="token punctuation">.</span><span class="token function">ReplaceAll</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>ETag<span class="token punctuation">,</span> <span class="token string">`"`</span><span class="token punctuation">,</span> <span class="token string">``</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数定义" tabindex="-1"><a class="header-anchor" href="#函数定义" aria-hidden="true">#</a> 函数定义</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (o *OSS) CopyObject(ctx context.Context, src string, dst string) (*s3.CopyObjectInfo, error) {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>o *OSS</code>: 这个函数是<code v-pre>OSS</code>结构体的一个方法，其中<code v-pre>OSS</code>可能是对某个对象存储服务的封装。</li>
<li><code v-pre>ctx context.Context</code>: 传入的上下文，用于控制函数的执行和取消。</li>
<li><code v-pre>src string</code>: 源对象的路径或标识符。</li>
<li><code v-pre>dst string</code>: 目标对象的路径或标识符。</li>
<li>返回值：返回一个指向<code v-pre>s3.CopyObjectInfo</code>的指针和一个错误。如果复制成功，错误将是<code v-pre>nil</code>，否则会包含错误信息。</li>
</ul>
<h3 id="函数体" tabindex="-1"><a class="header-anchor" href="#函数体" aria-hidden="true">#</a> 函数体</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>result, err := o.bucket.CopyObject(src, dst)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>这一行调用<code v-pre>o.bucket.CopyObject</code>方法来实际执行复制操作，其中<code v-pre>src</code>是源对象，<code v-pre>dst</code>是目标对象。</li>
<li>如果复制过程中发生错误，<code v-pre>err</code>将被赋值，并且该函数将返回错误。</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>return &amp;s3.CopyObjectInfo{
	Key:  dst,
	ETag: strings.ToLower(strings.ReplaceAll(result.ETag, `"`, ``)),
}, nil
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>如果复制成功，函数返回一个新的<code v-pre>s3.CopyObjectInfo</code>实例。这个实例包含目标对象的键（<code v-pre>Key</code>）和经过处理的ETag。</li>
<li><code v-pre>ETag</code>是一种标记，通常用于验证对象的完整性。这里的<code v-pre>ETag</code>被转换为小写，并且去除了所有的双引号。</li>
</ul>
<p><strong>Minio</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>m <span class="token operator">*</span>Minio<span class="token punctuation">)</span> <span class="token function">CopyObject</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> src <span class="token builtin">string</span><span class="token punctuation">,</span> dst <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>s3<span class="token punctuation">.</span>CopyObjectInfo<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">if</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span><span class="token function">initMinio</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	result<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>core<span class="token punctuation">.</span>Client<span class="token punctuation">.</span><span class="token function">CopyObject</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> minio<span class="token punctuation">.</span>CopyDestOptions<span class="token punctuation">{</span>
		Bucket<span class="token punctuation">:</span> m<span class="token punctuation">.</span>bucket<span class="token punctuation">,</span>
		Object<span class="token punctuation">:</span> dst<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> minio<span class="token punctuation">.</span>CopySrcOptions<span class="token punctuation">{</span>
		Bucket<span class="token punctuation">:</span> m<span class="token punctuation">.</span>bucket<span class="token punctuation">,</span>
		Object<span class="token punctuation">:</span> src<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>s3<span class="token punctuation">.</span>CopyObjectInfo<span class="token punctuation">{</span>
		Key<span class="token punctuation">:</span>  dst<span class="token punctuation">,</span>
		ETag<span class="token punctuation">:</span> strings<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>ETag<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="函数定义-1" tabindex="-1"><a class="header-anchor" href="#函数定义-1" aria-hidden="true">#</a> 函数定义</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (m *Minio) CopyObject(ctx context.Context, src string, dst string) (*s3.CopyObjectInfo, error) {
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>m *Minio</code>: 这是<code v-pre>Minio</code>结构体的一个方法。<code v-pre>Minio</code>结构体可能代表了对Minio服务的封装。</li>
<li><code v-pre>ctx context.Context</code>: 传入的上下文，用于控制函数的执行和取消。</li>
<li><code v-pre>src string</code>: 源对象的路径或标识符。</li>
<li><code v-pre>dst string</code>: 目标对象的路径或标识符。</li>
<li>返回值：返回一个指向<code v-pre>s3.CopyObjectInfo</code>的指针和一个错误。如果复制成功，错误将是<code v-pre>nil</code>，否则会包含错误信息。</li>
</ul>
<h3 id="函数体-1" tabindex="-1"><a class="header-anchor" href="#函数体-1" aria-hidden="true">#</a> 函数体</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">if</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span><span class="token function">initMinio</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> err
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这一行调用<code v-pre>m.initMinio</code>方法来初始化Minio客户端。如果初始化过程中出现错误，将返回错误。</li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>result<span class="token punctuation">,</span> err <span class="token operator">:=</span> m<span class="token punctuation">.</span>core<span class="token punctuation">.</span>Client<span class="token punctuation">.</span><span class="token function">CopyObject</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> minio<span class="token punctuation">.</span>CopyDestOptions<span class="token punctuation">{</span>
	Bucket<span class="token punctuation">:</span> m<span class="token punctuation">.</span>bucket<span class="token punctuation">,</span>
	Object<span class="token punctuation">:</span> dst<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> minio<span class="token punctuation">.</span>CopySrcOptions<span class="token punctuation">{</span>
	Bucket<span class="token punctuation">:</span> m<span class="token punctuation">.</span>bucket<span class="token punctuation">,</span>
	Object<span class="token punctuation">:</span> src<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>这里实际执行复制操作，使用<code v-pre>CopyObject</code>方法。方法接受目标和源的选项，包括存储桶名称（<code v-pre>Bucket</code>）和对象名称（<code v-pre>Object</code>）。</li>
<li>如果复制过程中发生错误，<code v-pre>err</code>将被赋值，并且该函数将返回错误。</li>
</ul>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">return</span> <span class="token operator">&amp;</span>s3<span class="token punctuation">.</span>CopyObjectInfo<span class="token punctuation">{</span>
	Key<span class="token punctuation">:</span>  dst<span class="token punctuation">,</span>
	ETag<span class="token punctuation">:</span> strings<span class="token punctuation">.</span><span class="token function">ToLower</span><span class="token punctuation">(</span>result<span class="token punctuation">.</span>ETag<span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>如果复制成功，函数返回一个新的<code v-pre>s3.CopyObjectInfo</code>实例。这个实例包含目标对象的键（<code v-pre>Key</code>）和ETag（用于验证对象的完整性）。</li>
<li><code v-pre>ETag</code>被转换为小写。</li>
</ul>
</div></template>


