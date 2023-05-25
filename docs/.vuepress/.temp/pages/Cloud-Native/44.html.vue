<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第44节-openim-first-meeting-source-code" tabindex="-1"><a class="header-anchor" href="#第44节-openim-first-meeting-source-code" aria-hidden="true">#</a> 第44节 OpenIM first meeting source code</h1>
<div><a href = '43.md' style='float:left'>⬆️上一节🔗  </a><a href = '45.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>❯ tree Open<span class="token operator">-</span>IM<span class="token operator">-</span>SDK<span class="token operator">-</span>Core <span class="token operator">-</span>L <span class="token number">2</span>
Open<span class="token operator">-</span>IM<span class="token operator">-</span>SDK<span class="token operator">-</span>Core
├── LICENSE
├── Makefile
├── README<span class="token punctuation">.</span>md
├── <span class="token keyword">go</span><span class="token punctuation">.</span>mod
├── <span class="token keyword">go</span><span class="token punctuation">.</span>sum
├── internal
│   ├── business
│   ├── cache
│   ├── common
│   ├── conversation_msg
│   ├── file
│   ├── friend
│   ├── full
│   ├── group
│   ├── heartbeart
│   ├── interaction
│   ├── login
│   ├── obj_storage
│   ├── signaling
│   ├── super_group
│   ├── user
│   ├── util
│   └── work_moments
├── main
│   ├── gordon_main<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── main<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── online_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── press_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── reliability_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
│   └── sk_main<span class="token punctuation">.</span><span class="token keyword">go</span>
├── open_im_sdk
│   ├── conversation_msg<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── friend<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── group<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── init_login<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── listener<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── signaling<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── signaling_listener<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── third<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── user<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── userRelated<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── util<span class="token punctuation">.</span><span class="token keyword">go</span>
│   └── workmoments<span class="token punctuation">.</span><span class="token keyword">go</span>
├── open_im_sdk_callback
│   ├── callback<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── for_service<span class="token punctuation">.</span><span class="token keyword">go</span>
│   └── signaling_callback<span class="token punctuation">.</span><span class="token keyword">go</span>
├── pkg
│   ├── common
│   ├── constant
│   ├── db
│   ├── log
│   ├── network
│   ├── sdk_params_callback
│   ├── server_api_params
│   ├── syncer
│   └── utils
├── sdk_struct
│   └── sdk_struct<span class="token punctuation">.</span><span class="token keyword">go</span>
├── single_test
│   ├── msg_delay_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── online_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
│   └── press_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
├── test
│   ├── Makefile
│   ├── account<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── config<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── login<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── online<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── reliability<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── sendMessage<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── t_conversation_msg<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── t_friend_sdk<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── t_group_sdk<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── t_signaling<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── work_group_create<span class="token punctuation">.</span><span class="token keyword">go</span>
│   └── work_moments<span class="token punctuation">.</span><span class="token keyword">go</span>
├── testv2
│   ├── callback<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── config<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── conversation_test<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── create_msg_test<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── file_test<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── friend_test<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── group_test<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── init<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── listener<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── signaling_test<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── test<span class="token punctuation">.</span>png
│   ├── user_test<span class="token punctuation">.</span><span class="token keyword">go</span>
│   └── work_moment_test<span class="token punctuation">.</span><span class="token keyword">go</span>
├── wasm
│   ├── cmd
│   ├── event_listener
│   ├── indexdb
│   └── wasm_wrapper
├── work_group_test
│   ├── create_work_group_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── msg_delay_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
│   └── press_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
└── ws_wrapper
    ├── cmd
    ├── test
    ├── utils
    └── ws_local_server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Open-IM-SDK-Core
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>: Open-IM SDK 核心代码</p>
<ul>
<li>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>internal
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>: 内部实现</p>
<ul>
<li><code v-pre>business</code>: 业务处理相关实现</li>
<li><code v-pre>cache</code>: 缓存相关实现</li>
<li><code v-pre>common</code>: 公用逻辑实现</li>
<li><code v-pre>conversation_msg</code>: 消息相关实现</li>
<li><code v-pre>file</code>: 文件相关实现</li>
<li><code v-pre>friend</code>: 好友相关实现</li>
<li><code v-pre>full</code>: 获取好友信息</li>
<li><code v-pre>group</code>: 群组相关实现</li>
<li><code v-pre>heartbeart</code>: 心跳相关实现，长连接</li>
<li><code v-pre>interaction</code>: 交互相关实现</li>
<li><code v-pre>login</code>: 登录相关实现</li>
<li><code v-pre>obj_storage</code>: 对象存储相关实现</li>
<li><code v-pre>signaling</code>: 信令相关实现</li>
<li><code v-pre>super_group</code>: 超级群相关实现（tg 群，有一个管道）</li>
<li><code v-pre>user</code>: 用户相关实现</li>
<li><code v-pre>util</code>: 工具函数</li>
<li><code v-pre>work_moments</code>: 工作圈相关实现</li>
</ul>
</li>
<li>
<p><code v-pre>main</code>: 主函数</p>
</li>
<li>
<p><code v-pre>open_im_sdk</code>: Open-IM SDK 对外提供的 API</p>
</li>
<li>
<p><code v-pre>open_im_sdk_callback</code>: Open-IM SDK 回调函数相关实现</p>
</li>
<li>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>pkg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>: 包</p>
<ul>
<li><code v-pre>common</code>: 公共逻辑实现</li>
<li><code v-pre>constant</code>: 常量定义</li>
<li><code v-pre>db</code>: 数据库相关实现</li>
<li><code v-pre>log</code>: 日志相关实现</li>
<li><code v-pre>network</code>: 网络相关实现</li>
<li><code v-pre>sdk_params_callback</code>: SDK 参数回调相关实现</li>
<li><code v-pre>server_api_params</code>: 服务端 API 参数相关实现</li>
<li><code v-pre>syncer</code>: 同步相关实现</li>
<li><code v-pre>utils</code>: 工具函数</li>
</ul>
</li>
<li>
<p><code v-pre>sdk_struct</code>: SDK 结构体定义</p>
</li>
<li>
<p><code v-pre>single_test</code>: 单元测试</p>
</li>
<li>
<p><code v-pre>test</code>: 测试</p>
</li>
<li>
<p><code v-pre>testv2</code>: 测试 v2</p>
</li>
<li>
<p><code v-pre>wasm</code>: WebAssembly 相关实现</p>
</li>
<li>
<p><code v-pre>work_group_test</code>: 工作群测试</p>
</li>
<li>
<p><code v-pre>ws_wrapper</code>: WebSocket 包装器</p>
</li>
</ul>
</li>
</ul>
<h2 id="open-im-sdk" tabindex="-1"><a class="header-anchor" href="#open-im-sdk" aria-hidden="true">#</a> open_im_sdk</h2>
<p>这里面都是全部对外的 sdk</p>
<h2 id="open-im-sdk-1" tabindex="-1"><a class="header-anchor" href="#open-im-sdk-1" aria-hidden="true">#</a> open_im_sdk</h2>
<p>这里面都是一些回调接口，也是对外导出，移动端实现这些接口。</p>
<p>Go语言调用 callback 先上一次 UI 层处理。</p>
<h2 id="cache" tabindex="-1"><a class="header-anchor" href="#cache" aria-hidden="true">#</a> cache</h2>
<p>这是一个Go语言程序中的一个结构体类型<code v-pre>Cache</code>，它包含了一些方法来更新和查询缓存中的数据。下面解释每个方法的功能：</p>
<ol>
<li><code v-pre>NewCache(user *user.User, friend *friend.Friend) *Cache</code>：这个方法用于创建一个新的<code v-pre>Cache</code>对象，它需要两个参数<code v-pre>user</code>和<code v-pre>friend</code>，这两个参数分别是对用户和好友的操作的接口。</li>
<li><code v-pre>Update(userID, faceURL, nickname string)</code>：这个方法用于更新缓存中指定用户ID的用户信息，包括用户的昵称和头像URL。</li>
<li><code v-pre>UpdateConversation(conversation model_struct.LocalConversation)</code>：这个方法用于更新缓存中指定会话ID的会话信息。</li>
<li><code v-pre>UpdateConversations(conversations []*model_struct.LocalConversation)</code>：这个方法用于批量更新缓存中多个会话的信息。</li>
<li><code v-pre>GetAllConversations() []*model_struct.LocalConversation</code>：这个方法用于获取缓存中所有会话的信息。</li>
<li><code v-pre>GetAllHasUnreadMessageConversations() []*model_struct.LocalConversation</code>：这个方法用于获取缓存中所有有未读消息的会话的信息。</li>
<li><code v-pre>GetConversation(conversationID string) model_struct.LocalConversation</code>：这个方法用于获取缓存中指定会话ID的会话信息。</li>
<li><code v-pre>GetUserNameAndFaceURL(ctx context.Context, userID string) (faceURL, name string, err error)</code>：这个方法用于获取指定用户ID的用户昵称和头像URL。它首先从缓存中查找，如果缓存中没有则从本地数据库中查找，如果还没有则从服务器数据库中查找。如果最终没有找到，则返回一个错误。</li>
</ol>
<p>除了<code v-pre>Cache</code>类型中的方法，这段代码还定义了一个<code v-pre>UserInfo</code>类型，用于缓存用户的昵称和头像URL。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '43.md' style='float:left'>⬆️上一节🔗  </a><a href = '45.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


