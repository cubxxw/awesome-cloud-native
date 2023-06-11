import{_ as l,r as i,o as c,c as d,a as n,b as e,w as t,e as s,d as r}from"./app.155ac445.js";const p={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},v=s("author"),k=n("h1",{id:"\u7B2C44\u8282-openim-first-meeting-source-code",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C44\u8282-openim-first-meeting-source-code","aria-hidden":"true"},"#"),s(" \u7B2C44\u8282 OpenIM first meeting source code")],-1),m=n("div",null,[n("a",{href:"43.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"45.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),_=n("br",null,null,-1),b=s("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),g={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},h=s("sealos"),w=s("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),y={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},f=s("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),x=s("\u3002Myblog:"),C={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},I=s("http://nsddd.top"),D=r(`<hr><p>[TOC]</p><h2 id="\u76EE\u5F55\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u76EE\u5F55\u7ED3\u6784" aria-hidden="true">#</a> \u76EE\u5F55\u7ED3\u6784</h2><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>\u276F tree Open<span class="token operator">-</span>IM<span class="token operator">-</span>SDK<span class="token operator">-</span>Core <span class="token operator">-</span>L <span class="token number">2</span>
Open<span class="token operator">-</span>IM<span class="token operator">-</span>SDK<span class="token operator">-</span>Core
\u251C\u2500\u2500 LICENSE
\u251C\u2500\u2500 Makefile
\u251C\u2500\u2500 README<span class="token punctuation">.</span>md
\u251C\u2500\u2500 <span class="token keyword">go</span><span class="token punctuation">.</span>mod
\u251C\u2500\u2500 <span class="token keyword">go</span><span class="token punctuation">.</span>sum
\u251C\u2500\u2500 internal
\u2502   \u251C\u2500\u2500 business
\u2502   \u251C\u2500\u2500 cache
\u2502   \u251C\u2500\u2500 common
\u2502   \u251C\u2500\u2500 conversation_msg
\u2502   \u251C\u2500\u2500 file
\u2502   \u251C\u2500\u2500 friend
\u2502   \u251C\u2500\u2500 full
\u2502   \u251C\u2500\u2500 group
\u2502   \u251C\u2500\u2500 heartbeart
\u2502   \u251C\u2500\u2500 interaction
\u2502   \u251C\u2500\u2500 login
\u2502   \u251C\u2500\u2500 obj_storage
\u2502   \u251C\u2500\u2500 signaling
\u2502   \u251C\u2500\u2500 super_group
\u2502   \u251C\u2500\u2500 user
\u2502   \u251C\u2500\u2500 util
\u2502   \u2514\u2500\u2500 work_moments
\u251C\u2500\u2500 main
\u2502   \u251C\u2500\u2500 gordon_main<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 main<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 online_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 press_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 reliability_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u2514\u2500\u2500 sk_main<span class="token punctuation">.</span><span class="token keyword">go</span>
\u251C\u2500\u2500 open_im_sdk
\u2502   \u251C\u2500\u2500 conversation_msg<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 friend<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 group<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 init_login<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 listener<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 signaling<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 signaling_listener<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 third<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 user<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 userRelated<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 util<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u2514\u2500\u2500 workmoments<span class="token punctuation">.</span><span class="token keyword">go</span>
\u251C\u2500\u2500 open_im_sdk_callback
\u2502   \u251C\u2500\u2500 callback<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 for_service<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u2514\u2500\u2500 signaling_callback<span class="token punctuation">.</span><span class="token keyword">go</span>
\u251C\u2500\u2500 pkg
\u2502   \u251C\u2500\u2500 common
\u2502   \u251C\u2500\u2500 constant
\u2502   \u251C\u2500\u2500 db
\u2502   \u251C\u2500\u2500 log
\u2502   \u251C\u2500\u2500 network
\u2502   \u251C\u2500\u2500 sdk_params_callback
\u2502   \u251C\u2500\u2500 server_api_params
\u2502   \u251C\u2500\u2500 syncer
\u2502   \u2514\u2500\u2500 utils
\u251C\u2500\u2500 sdk_struct
\u2502   \u2514\u2500\u2500 sdk_struct<span class="token punctuation">.</span><span class="token keyword">go</span>
\u251C\u2500\u2500 single_test
\u2502   \u251C\u2500\u2500 msg_delay_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 online_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u2514\u2500\u2500 press_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
\u251C\u2500\u2500 test
\u2502   \u251C\u2500\u2500 Makefile
\u2502   \u251C\u2500\u2500 account<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 config<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 login<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 online<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 reliability<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 sendMessage<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 t_conversation_msg<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 t_friend_sdk<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 t_group_sdk<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 t_signaling<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 work_group_create<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u2514\u2500\u2500 work_moments<span class="token punctuation">.</span><span class="token keyword">go</span>
\u251C\u2500\u2500 testv2
\u2502   \u251C\u2500\u2500 callback<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 config<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 conversation_test<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 create_msg_test<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 file_test<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 friend_test<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 group_test<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 init<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 listener<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 signaling_test<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 test<span class="token punctuation">.</span>png
\u2502   \u251C\u2500\u2500 user_test<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u2514\u2500\u2500 work_moment_test<span class="token punctuation">.</span><span class="token keyword">go</span>
\u251C\u2500\u2500 wasm
\u2502   \u251C\u2500\u2500 cmd
\u2502   \u251C\u2500\u2500 event_listener
\u2502   \u251C\u2500\u2500 indexdb
\u2502   \u2514\u2500\u2500 wasm_wrapper
\u251C\u2500\u2500 work_group_test
\u2502   \u251C\u2500\u2500 create_work_group_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u251C\u2500\u2500 msg_delay_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2502   \u2514\u2500\u2500 press_open_im<span class="token punctuation">.</span><span class="token keyword">go</span>
\u2514\u2500\u2500 ws_wrapper
    \u251C\u2500\u2500 cmd
    \u251C\u2500\u2500 test
    \u251C\u2500\u2500 utils
    \u2514\u2500\u2500 ws_local_server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Open-IM-SDK-Core
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>: Open-IM SDK \u6838\u5FC3\u4EE3\u7801</p><ul><li><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>internal
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>: \u5185\u90E8\u5B9E\u73B0</p><ul><li><code>business</code>: \u4E1A\u52A1\u5904\u7406\u76F8\u5173\u5B9E\u73B0</li><li><code>cache</code>: \u7F13\u5B58\u76F8\u5173\u5B9E\u73B0</li><li><code>common</code>: \u516C\u7528\u903B\u8F91\u5B9E\u73B0</li><li><code>conversation_msg</code>: \u6D88\u606F\u76F8\u5173\u5B9E\u73B0</li><li><code>file</code>: \u6587\u4EF6\u76F8\u5173\u5B9E\u73B0</li><li><code>friend</code>: \u597D\u53CB\u76F8\u5173\u5B9E\u73B0</li><li><code>full</code>: \u83B7\u53D6\u597D\u53CB\u4FE1\u606F</li><li><code>group</code>: \u7FA4\u7EC4\u76F8\u5173\u5B9E\u73B0</li><li><code>heartbeart</code>: \u5FC3\u8DF3\u76F8\u5173\u5B9E\u73B0\uFF0C\u957F\u8FDE\u63A5</li><li><code>interaction</code>: \u4EA4\u4E92\u76F8\u5173\u5B9E\u73B0</li><li><code>login</code>: \u767B\u5F55\u76F8\u5173\u5B9E\u73B0</li><li><code>obj_storage</code>: \u5BF9\u8C61\u5B58\u50A8\u76F8\u5173\u5B9E\u73B0</li><li><code>signaling</code>: \u4FE1\u4EE4\u76F8\u5173\u5B9E\u73B0</li><li><code>super_group</code>: \u8D85\u7EA7\u7FA4\u76F8\u5173\u5B9E\u73B0\uFF08tg \u7FA4\uFF0C\u6709\u4E00\u4E2A\u7BA1\u9053\uFF09</li><li><code>user</code>: \u7528\u6237\u76F8\u5173\u5B9E\u73B0</li><li><code>util</code>: \u5DE5\u5177\u51FD\u6570</li><li><code>work_moments</code>: \u5DE5\u4F5C\u5708\u76F8\u5173\u5B9E\u73B0</li></ul></li><li><p><code>main</code>: \u4E3B\u51FD\u6570</p></li><li><p><code>open_im_sdk</code>: Open-IM SDK \u5BF9\u5916\u63D0\u4F9B\u7684 API</p></li><li><p><code>open_im_sdk_callback</code>: Open-IM SDK \u56DE\u8C03\u51FD\u6570\u76F8\u5173\u5B9E\u73B0</p></li><li><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>pkg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>: \u5305</p><ul><li><code>common</code>: \u516C\u5171\u903B\u8F91\u5B9E\u73B0</li><li><code>constant</code>: \u5E38\u91CF\u5B9A\u4E49</li><li><code>db</code>: \u6570\u636E\u5E93\u76F8\u5173\u5B9E\u73B0</li><li><code>log</code>: \u65E5\u5FD7\u76F8\u5173\u5B9E\u73B0</li><li><code>network</code>: \u7F51\u7EDC\u76F8\u5173\u5B9E\u73B0</li><li><code>sdk_params_callback</code>: SDK \u53C2\u6570\u56DE\u8C03\u76F8\u5173\u5B9E\u73B0</li><li><code>server_api_params</code>: \u670D\u52A1\u7AEF API \u53C2\u6570\u76F8\u5173\u5B9E\u73B0</li><li><code>syncer</code>: \u540C\u6B65\u76F8\u5173\u5B9E\u73B0</li><li><code>utils</code>: \u5DE5\u5177\u51FD\u6570</li></ul></li><li><p><code>sdk_struct</code>: SDK \u7ED3\u6784\u4F53\u5B9A\u4E49</p></li><li><p><code>single_test</code>: \u5355\u5143\u6D4B\u8BD5</p></li><li><p><code>test</code>: \u6D4B\u8BD5</p></li><li><p><code>testv2</code>: \u6D4B\u8BD5 v2</p></li><li><p><code>wasm</code>: WebAssembly \u76F8\u5173\u5B9E\u73B0</p></li><li><p><code>work_group_test</code>: \u5DE5\u4F5C\u7FA4\u6D4B\u8BD5</p></li><li><p><code>ws_wrapper</code>: WebSocket \u5305\u88C5\u5668</p></li></ul></li></ul><h2 id="open-im-sdk" tabindex="-1"><a class="header-anchor" href="#open-im-sdk" aria-hidden="true">#</a> open_im_sdk</h2><p>\u8FD9\u91CC\u9762\u90FD\u662F\u5168\u90E8\u5BF9\u5916\u7684 sdk</p><h2 id="open-im-sdk-1" tabindex="-1"><a class="header-anchor" href="#open-im-sdk-1" aria-hidden="true">#</a> open_im_sdk</h2><p>\u8FD9\u91CC\u9762\u90FD\u662F\u4E00\u4E9B\u56DE\u8C03\u63A5\u53E3\uFF0C\u4E5F\u662F\u5BF9\u5916\u5BFC\u51FA\uFF0C\u79FB\u52A8\u7AEF\u5B9E\u73B0\u8FD9\u4E9B\u63A5\u53E3\u3002</p><p>Go\u8BED\u8A00\u8C03\u7528 callback \u5148\u4E0A\u4E00\u6B21 UI \u5C42\u5904\u7406\u3002</p><h2 id="cache" tabindex="-1"><a class="header-anchor" href="#cache" aria-hidden="true">#</a> cache</h2><p>\u8FD9\u662F\u4E00\u4E2AGo\u8BED\u8A00\u7A0B\u5E8F\u4E2D\u7684\u4E00\u4E2A\u7ED3\u6784\u4F53\u7C7B\u578B<code>Cache</code>\uFF0C\u5B83\u5305\u542B\u4E86\u4E00\u4E9B\u65B9\u6CD5\u6765\u66F4\u65B0\u548C\u67E5\u8BE2\u7F13\u5B58\u4E2D\u7684\u6570\u636E\u3002\u4E0B\u9762\u89E3\u91CA\u6BCF\u4E2A\u65B9\u6CD5\u7684\u529F\u80FD\uFF1A</p><ol><li><code>NewCache(user *user.User, friend *friend.Friend) *Cache</code>\uFF1A\u8FD9\u4E2A\u65B9\u6CD5\u7528\u4E8E\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684<code>Cache</code>\u5BF9\u8C61\uFF0C\u5B83\u9700\u8981\u4E24\u4E2A\u53C2\u6570<code>user</code>\u548C<code>friend</code>\uFF0C\u8FD9\u4E24\u4E2A\u53C2\u6570\u5206\u522B\u662F\u5BF9\u7528\u6237\u548C\u597D\u53CB\u7684\u64CD\u4F5C\u7684\u63A5\u53E3\u3002</li><li><code>Update(userID, faceURL, nickname string)</code>\uFF1A\u8FD9\u4E2A\u65B9\u6CD5\u7528\u4E8E\u66F4\u65B0\u7F13\u5B58\u4E2D\u6307\u5B9A\u7528\u6237ID\u7684\u7528\u6237\u4FE1\u606F\uFF0C\u5305\u62EC\u7528\u6237\u7684\u6635\u79F0\u548C\u5934\u50CFURL\u3002</li><li><code>UpdateConversation(conversation model_struct.LocalConversation)</code>\uFF1A\u8FD9\u4E2A\u65B9\u6CD5\u7528\u4E8E\u66F4\u65B0\u7F13\u5B58\u4E2D\u6307\u5B9A\u4F1A\u8BDDID\u7684\u4F1A\u8BDD\u4FE1\u606F\u3002</li><li><code>UpdateConversations(conversations []*model_struct.LocalConversation)</code>\uFF1A\u8FD9\u4E2A\u65B9\u6CD5\u7528\u4E8E\u6279\u91CF\u66F4\u65B0\u7F13\u5B58\u4E2D\u591A\u4E2A\u4F1A\u8BDD\u7684\u4FE1\u606F\u3002</li><li><code>GetAllConversations() []*model_struct.LocalConversation</code>\uFF1A\u8FD9\u4E2A\u65B9\u6CD5\u7528\u4E8E\u83B7\u53D6\u7F13\u5B58\u4E2D\u6240\u6709\u4F1A\u8BDD\u7684\u4FE1\u606F\u3002</li><li><code>GetAllHasUnreadMessageConversations() []*model_struct.LocalConversation</code>\uFF1A\u8FD9\u4E2A\u65B9\u6CD5\u7528\u4E8E\u83B7\u53D6\u7F13\u5B58\u4E2D\u6240\u6709\u6709\u672A\u8BFB\u6D88\u606F\u7684\u4F1A\u8BDD\u7684\u4FE1\u606F\u3002</li><li><code>GetConversation(conversationID string) model_struct.LocalConversation</code>\uFF1A\u8FD9\u4E2A\u65B9\u6CD5\u7528\u4E8E\u83B7\u53D6\u7F13\u5B58\u4E2D\u6307\u5B9A\u4F1A\u8BDDID\u7684\u4F1A\u8BDD\u4FE1\u606F\u3002</li><li><code>GetUserNameAndFaceURL(ctx context.Context, userID string) (faceURL, name string, err error)</code>\uFF1A\u8FD9\u4E2A\u65B9\u6CD5\u7528\u4E8E\u83B7\u53D6\u6307\u5B9A\u7528\u6237ID\u7684\u7528\u6237\u6635\u79F0\u548C\u5934\u50CFURL\u3002\u5B83\u9996\u5148\u4ECE\u7F13\u5B58\u4E2D\u67E5\u627E\uFF0C\u5982\u679C\u7F13\u5B58\u4E2D\u6CA1\u6709\u5219\u4ECE\u672C\u5730\u6570\u636E\u5E93\u4E2D\u67E5\u627E\uFF0C\u5982\u679C\u8FD8\u6CA1\u6709\u5219\u4ECE\u670D\u52A1\u5668\u6570\u636E\u5E93\u4E2D\u67E5\u627E\u3002\u5982\u679C\u6700\u7EC8\u6CA1\u6709\u627E\u5230\uFF0C\u5219\u8FD4\u56DE\u4E00\u4E2A\u9519\u8BEF\u3002</li></ol><p>\u9664\u4E86<code>Cache</code>\u7C7B\u578B\u4E2D\u7684\u65B9\u6CD5\uFF0C\u8FD9\u6BB5\u4EE3\u7801\u8FD8\u5B9A\u4E49\u4E86\u4E00\u4E2A<code>UserInfo</code>\u7C7B\u578B\uFF0C\u7528\u4E8E\u7F13\u5B58\u7528\u6237\u7684\u6635\u79F0\u548C\u5934\u50CFURL\u3002</p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="43.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="45.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,16),L=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),E={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},U=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),M=s(")"),S=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),A={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},R=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function K(N,O){const a=i("ExternalLinkIcon"),o=i("RouterLink");return c(),d("div",null,[n("ul",null,[n("li",null,[n("a",u,[v,e(a)])])]),k,m,_,n("blockquote",null,[n("p",null,[b,n("a",g,[h,e(a)]),w,n("a",y,[f,e(a)]),x,n("a",C,[I,e(a)])])]),D,n("ul",null,[n("li",null,[n("p",null,[e(o,{to:"/"},{default:t(()=>[L]),_:1})])]),n("li",null,[n("p",null,[n("a",E,[U,e(a)]),M])]),n("li",null,[n("p",null,[S,n("a",A,[R,e(a)])])])])])}const B=l(p,[["render",K],["__file","44.html.vue"]]);export{B as default};
