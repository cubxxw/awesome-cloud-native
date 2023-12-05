import{_ as n,o as e,c as s,d as a}from"./app.9f3e6cab.js";const i={},l=a(`<h1 id="openim-jssdk-\u56DB-wasm" tabindex="-1"><a class="header-anchor" href="#openim-jssdk-\u56DB-wasm" aria-hidden="true">#</a> OpenIM JSSDK (\u56DB) Wasm</h1><h2 id="\u76EE\u5F55\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u76EE\u5F55\u7ED3\u6784" aria-hidden="true">#</a> \u76EE\u5F55\u7ED3\u6784</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u276F tree wasm ws_wrapper
wasm
\u251C\u2500\u2500 cmd
\u2502   \u251C\u2500\u2500 Makefile
\u2502   \u251C\u2500\u2500 main.go
\u2502   \u2514\u2500\u2500 static
\u2502       \u2514\u2500\u2500 wasm_exec.js
\u251C\u2500\u2500 event_listener
\u2502   \u251C\u2500\u2500 callback_writer.go
\u2502   \u251C\u2500\u2500 caller.go
\u2502   \u2514\u2500\u2500 listener.go
\u251C\u2500\u2500 exec
\u2502   \u2514\u2500\u2500 executor.go
\u251C\u2500\u2500 indexdb
\u2502   \u251C\u2500\u2500 black_model.go
\u2502   \u251C\u2500\u2500 cache_message.go
\u2502   \u251C\u2500\u2500 chat_log_model.go
\u2502   \u251C\u2500\u2500 chat_log_reaction_extension_model.go
\u2502   \u251C\u2500\u2500 conversation_model.go
\u2502   \u251C\u2500\u2500 conversation_unread_message_model.go
\u2502   \u251C\u2500\u2500 friend_model.go
\u2502   \u251C\u2500\u2500 friend_request_model.go
\u2502   \u251C\u2500\u2500 group_member_model.go
\u2502   \u251C\u2500\u2500 group_model.go
\u2502   \u251C\u2500\u2500 group_request.model.go
\u2502   \u251C\u2500\u2500 init.go
\u2502   \u251C\u2500\u2500 notification_model.go
\u2502   \u251C\u2500\u2500 stranger_model.go
\u2502   \u251C\u2500\u2500 super_group_chat_log_model.go
\u2502   \u251C\u2500\u2500 super_group_model.go
\u2502   \u251C\u2500\u2500 temp_struct
\u2502   \u2502   \u2514\u2500\u2500 struct.go
\u2502   \u251C\u2500\u2500 upload_model.go
\u2502   \u2514\u2500\u2500 user_model.go
\u2514\u2500\u2500 wasm_wrapper
    \u251C\u2500\u2500 wasm_conversation_msg.go
    \u251C\u2500\u2500 wasm_friend.go
    \u251C\u2500\u2500 wasm_group.go
    \u251C\u2500\u2500 wasm_init_login.go
    \u251C\u2500\u2500 wasm_signaling.go
    \u251C\u2500\u2500 wasm_third.go
    \u2514\u2500\u2500 wasm_user.go
ws_wrapper
\u251C\u2500\u2500 cmd
\u2502   \u251C\u2500\u2500 Makefile
\u2502   \u251C\u2500\u2500 open_im_sdk_electron.go
\u2502   \u251C\u2500\u2500 open_im_sdk_my.go
\u2502   \u2514\u2500\u2500 open_im_sdk_server.go
\u251C\u2500\u2500 logs
\u2502   \u2514\u2500\u2500 sdk.all.2023-10-30
\u251C\u2500\u2500 test
\u2502   \u251C\u2500\u2500 client
\u2502   \u2502   \u2514\u2500\u2500 client.go
\u2502   \u251C\u2500\u2500 cmd
\u2502   \u2502   \u2514\u2500\u2500 main.go
\u2502   \u2514\u2500\u2500 simulationClient.go
\u251C\u2500\u2500 utils
\u2502   \u251C\u2500\u2500 platform_number_id_to_name.go
\u2502   \u2514\u2500\u2500 strings.go
\u2514\u2500\u2500 ws_local_server
    \u251C\u2500\u2500 constant.go
    \u251C\u2500\u2500 handle_func.go
    \u251C\u2500\u2500 ws_conversation_msg.go
    \u251C\u2500\u2500 ws_friend.go
    \u251C\u2500\u2500 ws_group.go
    \u251C\u2500\u2500 ws_handle.go
    \u251C\u2500\u2500 ws_init_login.go
    \u251C\u2500\u2500 ws_organization.go
    \u251C\u2500\u2500 ws_server.go
    \u251C\u2500\u2500 ws_signaling.go
    \u251C\u2500\u2500 ws_user.go
    \u2514\u2500\u2500 ws_work_moments.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u4EE3\u7801\u6A21\u5757\u89E3\u6790" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u6A21\u5757\u89E3\u6790" aria-hidden="true">#</a> \u4EE3\u7801\u6A21\u5757\u89E3\u6790</h3><h4 id="_1-wasm" tabindex="-1"><a class="header-anchor" href="#_1-wasm" aria-hidden="true">#</a> 1. <strong>wasm</strong></h4><p>\u770B\u8D77\u6765\u8FD9\u662F\u4E00\u4E2AWebAssembly (WASM)\u76F8\u5173\u7684\u4EE3\u7801\u5E93\u3002WebAssembly\u662F\u4E00\u79CD\u4E3AWeb\u8BBE\u8BA1\u7684\u65B0\u7684\u4EE3\u7801\u683C\u5F0F\uFF0C\u80FD\u591F\u4EE5\u63A5\u8FD1\u4E8E\u672C\u5730\u901F\u5EA6\u5728\u6D4F\u89C8\u5668\u4E2D\u8FD0\u884C\u3002</p><ul><li><code>cmd</code>: \u547D\u4EE4\u884C\u5DE5\u5177\u6216\u5E94\u7528\u7A0B\u5E8F\u7684\u4E3B\u8981\u6587\u4EF6\u3002 <ul><li><code>Makefile</code>: \u6784\u5EFA\u811A\u672C\uFF0C\u901A\u5E38\u7528\u4E8E\u7F16\u8BD1\u548C\u6253\u5305\u4EE3\u7801\u3002</li><li><code>main.go</code>: Go\u5E94\u7528\u7A0B\u5E8F\u7684\u5165\u53E3\u70B9\u3002</li><li><code>static/wasm_exec.js</code>: WebAssembly\u7684Go\u8FD0\u884C\u65F6\u6240\u9700\u7684JavaScript\u4EE3\u7801\u3002</li></ul></li><li><code>event_listener</code>: \u76D1\u542C\u5E76\u5904\u7406\u7279\u5B9A\u7684\u4E8B\u4EF6\u6216\u56DE\u8C03\u3002 <ul><li><code>callback_writer.go</code>, <code>caller.go</code>, <code>listener.go</code>: \u8FD9\u4E9B\u6587\u4EF6\u53EF\u80FD\u4E0E\u4E8B\u4EF6\u76D1\u542C\u548C\u56DE\u8C03\u6267\u884C\u76F8\u5173\u3002</li></ul></li><li><code>exec</code>: \u6267\u884C\u6216\u8FD0\u884C\u4EE3\u7801\u7684\u6A21\u5757\u3002 <ul><li><code>executor.go</code>: \u53EF\u80FD\u7528\u4E8E\u6267\u884C\u67D0\u4E9B\u64CD\u4F5C\u6216\u51FD\u6570\u7684\u4EE3\u7801\u3002</li></ul></li><li><code>indexdb</code>: \u770B\u8D77\u6765\u662F\u4E0EIndexedDB\u76F8\u5173\u7684\u6A21\u5757\uFF0CIndexedDB\u662F\u4E00\u79CD\u5728\u6D4F\u89C8\u5668\u4E2D\u5B58\u50A8\u7ED3\u6784\u5316\u6570\u636E\u7684\u65B9\u5F0F\u3002 <ul><li>\u5404\u79CD<code>_model.go</code>\u6587\u4EF6\uFF1A\u5B9A\u4E49\u6570\u636E\u5E93\u6A21\u578B\u6216\u7ED3\u6784\u7684\u5730\u65B9\u3002</li><li><code>init.go</code>: \u521D\u59CB\u5316\u6570\u636E\u5E93\u6216\u6A21\u578B\u7684\u5730\u65B9\u3002</li><li><code>temp_struct/struct.go</code>: \u4E34\u65F6\u7684\u7ED3\u6784\u6216\u6A21\u578B\u5B9A\u4E49\u3002</li></ul></li><li><code>wasm_wrapper</code>: \u63D0\u4F9B\u4E86\u4E0EWebAssembly\u4EA4\u4E92\u7684\u65B9\u6CD5\u6216\u51FD\u6570\u3002 <ul><li>\u5404\u79CD<code>wasm_*.go</code>\u6587\u4EF6\uFF1A\u53EF\u80FD\u4E3A\u4E0D\u540C\u7684\u529F\u80FD\u63D0\u4F9BWASM\u5C01\u88C5\u6216\u63A5\u53E3\u3002</li></ul></li></ul><h4 id="_2-ws-wrapper" tabindex="-1"><a class="header-anchor" href="#_2-ws-wrapper" aria-hidden="true">#</a> 2. <strong>ws_wrapper</strong></h4><p>\u8FD9\u4F3C\u4E4E\u662F\u4E00\u4E2AWebSocket\u7684\u5C01\u88C5\u6216\u5E93\uFF0C\u7528\u4E8E\u5B9E\u73B0\u5B9E\u65F6\u901A\u4FE1\u3002</p><ul><li><code>cmd</code>: \u547D\u4EE4\u884C\u5DE5\u5177\u6216\u5E94\u7528\u7A0B\u5E8F\u7684\u4E3B\u8981\u6587\u4EF6\u3002 <ul><li><code>Makefile</code>: \u6784\u5EFA\u811A\u672C\u3002</li><li><code>open_im_sdk_*.go</code>\u6587\u4EF6\uFF1A\u5404\u79CD\u7248\u672C\u7684SDK\u7684\u5B9E\u73B0\u3002</li></ul></li><li><code>logs</code>: \u5B58\u50A8\u65E5\u5FD7\u6587\u4EF6\u3002</li><li><code>test</code>: \u5305\u542B\u6D4B\u8BD5\u5BA2\u6237\u7AEF\u548C\u6A21\u62DF\u5BA2\u6237\u7AEF\u7684\u6D4B\u8BD5\u4EE3\u7801\u3002</li><li><code>utils</code>: \u5DE5\u5177\u6216\u5E2E\u52A9\u51FD\u6570\u3002</li><li><code>ws_local_server</code>: WebSocket\u7684\u672C\u5730\u670D\u52A1\u5668\u5B9E\u73B0\u3002 <ul><li>\u5404\u79CD<code>ws_*.go</code>\u6587\u4EF6\uFF1A\u4E3A\u4E0D\u540C\u7684\u529F\u80FD\u6216\u6A21\u5757\u63D0\u4F9BWebSocket\u5B9E\u73B0\u3002</li></ul></li></ul><h3 id="\u5B66\u4E60\u5EFA\u8BAE" tabindex="-1"><a class="header-anchor" href="#\u5B66\u4E60\u5EFA\u8BAE" aria-hidden="true">#</a> \u5B66\u4E60\u5EFA\u8BAE\uFF1A</h3><ol><li><strong>\u4E86\u89E3\u80CC\u666F\u77E5\u8BC6</strong>\uFF1A\u9996\u5148\uFF0C\u60A8\u9700\u8981\u5BF9WebAssembly, Go, WebSocket, IndexedDB\u6709\u4E00\u5B9A\u7684\u4E86\u89E3\u3002\u8FD9\u5C06\u5E2E\u52A9\u60A8\u66F4\u597D\u5730\u7406\u89E3\u4EE3\u7801\u7684\u610F\u56FE\u3002</li><li><strong>\u5F00\u59CB\u4E8E\u201Cmain.go\u201D</strong>\uFF1A\u901A\u5E38\uFF0C<code>main.go</code>\u662F\u5E94\u7528\u7A0B\u5E8F\u7684\u5165\u53E3\u70B9\uFF0C\u4ECE\u8FD9\u91CC\u5F00\u59CB\u53EF\u4EE5\u5E2E\u52A9\u60A8\u4E86\u89E3\u4EE3\u7801\u7684\u6267\u884C\u6D41\u7A0B\u3002</li><li><strong>\u6DF1\u5165\u7814\u7A76\u6838\u5FC3\u6A21\u5757</strong>\uFF1A<code>wasm</code> \u548C <code>ws_wrapper</code> \u662F\u4E24\u4E2A\u6838\u5FC3\u6A21\u5757\u3002\u60A8\u5E94\u8BE5\u91CD\u70B9\u5173\u6CE8\u8FD9\u4E24\u4E2A\u6A21\u5757\uFF0C\u5C24\u5176\u662F\u4E0E\u6570\u636E\u4EA4\u4E92\u548C\u901A\u4FE1\u7684\u90E8\u5206\u3002</li><li><strong>\u9605\u8BFB\u6D4B\u8BD5\u4EE3\u7801</strong>\uFF1A<code>test</code>\u76EE\u5F55\u901A\u5E38\u5305\u542B\u4E86\u5982\u4F55\u4F7F\u7528\u8BE5\u5E93\u6216\u6A21\u5757\u7684\u793A\u4F8B\u3002\u8FD9\u53EF\u4EE5\u5E2E\u52A9\u60A8\u4E86\u89E3\u5982\u4F55\u5B9E\u9645\u4F7F\u7528\u5B83\u3002</li><li><strong>\u5B9E\u8DF5</strong>\uFF1A\u5C1D\u8BD5\u8FD0\u884C\u4EE3\u7801\uFF0C\u8FDB\u884C\u4E00\u4E9B\u57FA\u672C\u7684\u64CD\u4F5C\uFF0C\u5982\u53D1\u9001WebSocket\u6D88\u606F\uFF0C\u6216\u4F7F\u7528WASM\u51FD\u6570\u3002\u5B9E\u8DF5\u662F\u6700\u597D\u7684\u5B66\u4E60\u65B9\u6CD5\u3002</li><li><strong>\u7F16\u5199\u6587\u6863\u548C\u6CE8\u91CA</strong>\uFF1A\u5F53\u60A8\u5BF9\u67D0\u4E2A\u90E8\u5206\u7684\u4EE3\u7801\u6709\u4E86\u7406\u89E3\u540E\uFF0C\u5C1D\u8BD5\u7F16\u5199\u6216\u5B8C\u5584\u6587\u6863\u548C\u6CE8\u91CA\u3002\u8FD9\u4E0D\u4EC5\u53EF\u4EE5\u5E2E\u52A9\u60A8\u5DE9\u56FA\u6240\u5B66\uFF0C\u8FD8\u53EF\u4EE5\u4E3A\u5176\u4ED6\u5F00\u53D1\u8005\u63D0\u4F9B\u5E2E\u52A9\u3002</li></ol><h2 id="\u6267\u884C-wasm" tabindex="-1"><a class="header-anchor" href="#\u6267\u884C-wasm" aria-hidden="true">#</a> \u6267\u884C wasm</h2><p>\u8FD0\u884C\u4E00\u4E2A <code>.wasm</code> \u6587\u4EF6\u901A\u5E38\u9700\u8981 WebAssembly \u7684\u73AF\u5883\u548C\u76F8\u5E94\u7684 JavaScript \u8C03\u7528\u3002\u4E0B\u9762\u662F\u4E00\u4E2A\u7B80\u5355\u7684\u65B9\u6CD5\uFF0C\u7528\u4E8E\u5728\u6D4F\u89C8\u5668\u4E2D\u6267\u884C\u60A8\u7684 <code>openIM.wasm</code> \u6587\u4EF6\uFF1A</p><h3 id="_1-\u51C6\u5907-javascript-\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#_1-\u51C6\u5907-javascript-\u4EE3\u7801" aria-hidden="true">#</a> 1. \u51C6\u5907 JavaScript \u4EE3\u7801</h3><p>\u786E\u4FDD\u60A8\u6709 <code>wasm_exec.js</code>\uFF0C\u8FD9\u662F Go \u63D0\u4F9B\u7684\u7528\u4E8E\u5728 WebAssembly \u73AF\u5883\u4E2D\u4E0E Go \u4EE3\u7801\u4EA4\u4E92\u7684 JavaScript \u6587\u4EF6\u3002</p><p>\u7136\u540E\uFF0C\u7F16\u5199\u4E00\u4E2A\u7B80\u5355\u7684 HTML \u6587\u4EF6 <code>index.html</code> \u6765\u52A0\u8F7D\u5E76\u6267\u884C\u60A8\u7684 <code>.wasm</code> \u6587\u4EF6\uFF1A</p><div class="language-heml ext-heml line-numbers-mode"><pre class="language-heml"><code>&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
    &lt;meta charset=&quot;UTF-8&quot;&gt;
    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;
    &lt;title&gt;OpenIM WASM Demo&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;script src=&quot;wasm_exec.js&quot;&gt;&lt;/script&gt;
    &lt;script&gt;
        async function runWasm() {
            const go = new Go();
            const result = await WebAssembly.instantiateStreaming(fetch(&quot;openIM.wasm.wasm&quot;), go.importObject);
            go.run(result.instance);
        }
        runWasm();
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-\u8FD0\u884C\u4E00\u4E2A\u672C\u5730\u670D\u52A1\u5668" tabindex="-1"><a class="header-anchor" href="#_2-\u8FD0\u884C\u4E00\u4E2A\u672C\u5730\u670D\u52A1\u5668" aria-hidden="true">#</a> 2. \u8FD0\u884C\u4E00\u4E2A\u672C\u5730\u670D\u52A1\u5668</h3><p>\u7531\u4E8E\u8DE8\u57DF\u9650\u5236\uFF0C\u60A8\u901A\u5E38\u9700\u8981\u5728\u672C\u5730\u670D\u52A1\u5668\u4E0A\u8FD0\u884C\u6B64HTML\u6587\u4EF6\u3002\u60A8\u53EF\u4EE5\u4F7F\u7528\u5404\u79CD\u5DE5\u5177\u6765\u5FEB\u901F\u542F\u52A8\u4E00\u4E2A\u672C\u5730\u670D\u52A1\u5668\u3002\u4F8B\u5982\uFF0C\u4F7F\u7528 Python \u7684\u7B80\u5355HTTP\u670D\u52A1\u5668\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>python3 <span class="token parameter variable">-m</span> http.server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6216\u8005\uFF0C\u5982\u679C\u60A8\u6709\u5B89\u88C5 Node.js \u548C npm\uFF0C\u53EF\u4EE5\u4F7F\u7528 <code>http-server</code>\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> http-server
http-server <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u542F\u52A8\u670D\u52A1\u5668\u540E\uFF0C\u6253\u5F00\u6D4F\u89C8\u5668\u5E76\u5BFC\u822A\u5230 <code>http://localhost:8000/</code>\uFF08\u6216\u60A8\u9009\u62E9\u7684\u5176\u4ED6\u7AEF\u53E3\uFF09\uFF0C\u7136\u540E\u67E5\u770B <code>openIM.wasm</code> \u7684\u8FD0\u884C\u7ED3\u679C\u3002</p><h3 id="_3-\u8C03\u8BD5" tabindex="-1"><a class="header-anchor" href="#_3-\u8C03\u8BD5" aria-hidden="true">#</a> 3. \u8C03\u8BD5</h3><p>\u6253\u5F00\u6D4F\u89C8\u5668\u7684\u5F00\u53D1\u8005\u5DE5\u5177\uFF0C\u67E5\u770B\u63A7\u5236\u53F0\u8F93\u51FA\u3002\u8FD9\u6709\u52A9\u4E8E\u60A8\u6355\u83B7\u548C\u8C03\u8BD5\u53EF\u80FD\u9047\u5230\u7684\u4EFB\u4F55\u9519\u8BEF\u3002</p><p><strong>\u6CE8\u610F</strong>\uFF1A\u7531\u4E8E WebAssembly \u7684\u5F02\u6B65\u52A0\u8F7D\u548C\u6267\u884C\u6027\u8D28\uFF0C\u786E\u4FDD\u60A8\u7684 Go \u4EE3\u7801\u80FD\u591F\u4E0E\u6B64\u79CD\u65B9\u5F0F\u517C\u5BB9\uFF0C\u5E76\u4E14\u60A8\u7684 HTML \u548C JS \u80FD\u591F\u6B63\u786E\u8C03\u7528 <code>.wasm</code> \u6587\u4EF6\u4E2D\u7684\u51FD\u6570\u6216\u65B9\u6CD5\u3002</p><h2 id="main-\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#main-\u4EE3\u7801" aria-hidden="true">#</a> main \u4EE3\u7801</h2><p>\u7EE7\u7EED\u5F00\u59CB main \u7684\u4EE3\u7801\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">defer</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">if</span> r <span class="token operator">:=</span> <span class="token function">recover</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> r <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			log<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token string">&quot;MAIN&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;panic info is:&quot;</span><span class="token punctuation">,</span> r<span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>debug<span class="token punctuation">.</span><span class="token function">Stack</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;runtime env&quot;</span><span class="token punctuation">,</span> runtime<span class="token punctuation">.</span>GOARCH<span class="token punctuation">,</span> runtime<span class="token punctuation">.</span>GOOS<span class="token punctuation">)</span>
	<span class="token function">registerFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token operator">&lt;-</span><span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">registerFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//register global listener function</span>
	globalFuc <span class="token operator">:=</span> wasm_wrapper<span class="token punctuation">.</span><span class="token function">NewWrapperCommon</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span>wasm_wrapper<span class="token punctuation">.</span>COMMONEVENTFUNC<span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>globalFuc<span class="token punctuation">.</span>CommonEventFunc<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token comment">//register init login function</span>
	wrapperInitLogin <span class="token operator">:=</span> wasm_wrapper<span class="token punctuation">.</span><span class="token function">NewWrapperInitLogin</span><span class="token punctuation">(</span>globalFuc<span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;initSDK&quot;</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>InitSDK<span class="token punctuation">)</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;login&quot;</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>Login<span class="token punctuation">)</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;logout&quot;</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>Logout<span class="token punctuation">)</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;getLoginStatus&quot;</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>GetLoginStatus<span class="token punctuation">)</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;setAppBackgroundStatus&quot;</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>SetAppBackgroundStatus<span class="token punctuation">)</span><span class="token punctuation">)</span>
	js<span class="token punctuation">.</span><span class="token function">Global</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">&quot;networkStatusChanged&quot;</span><span class="token punctuation">,</span> js<span class="token punctuation">.</span><span class="token function">FuncOf</span><span class="token punctuation">(</span>wrapperInitLogin<span class="token punctuation">.</span>NetworkStatusChanged<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u6BB5\u4EE3\u7801\u662F\u7528 Go \u7F16\u5199\u7684\uFF0C\u5E76\u7528\u4E8E\u4E0E WebAssembly (Wasm) \u8FDB\u884C\u4EA4\u4E92\u3002\u5B83\u57FA\u4E8E OpenIM SDK\uFF0C\u65E8\u5728\u63D0\u4F9B\u5404\u79CD\u5373\u65F6\u6D88\u606F\uFF08IM\uFF09\u529F\u80FD\u3002\u4EE5\u4E0B\u662F\u4EE3\u7801\u7684\u7B80\u8981\u89E3\u91CA\uFF1A</p><ol><li><strong>\u6784\u5EFA\u6807\u8BB0</strong>: <ul><li><code>//go:build js &amp;&amp; wasm</code> \u548C <code>// +build js,wasm</code> \u662F\u6784\u5EFA\u7EA6\u675F\uFF0C\u786E\u4FDD\u6B64\u4EE3\u7801\u4EC5\u5728 Go \u4E0E JavaScript \u548C WebAssembly \u76EE\u6807\u6784\u5EFA\u65F6\u4F7F\u7528\u3002</li></ul></li><li><strong>\u5F15\u5165\u5305</strong>: <ul><li>\u5BFC\u5165\u4E86\u591A\u4E2A Go \u6807\u51C6\u5E93\u548C OpenIM SDK \u7684\u5E93\u3002</li></ul></li><li><strong>\u4E3B\u51FD\u6570</strong>: <ul><li><code>main</code> \u51FD\u6570\u9996\u5148\u8BBE\u7F6E\u4E86\u4E00\u4E2A panic \u6062\u590D\u673A\u5236\uFF0C\u7528\u4E8E\u6355\u83B7\u548C\u8BB0\u5F55\u4EFB\u4F55\u8FD0\u884C\u65F6\u7684\u6050\u614C\u3002</li><li>\u6253\u5370\u51FA\u5F53\u524D\u8FD0\u884C\u7684\u67B6\u6784\u548C\u64CD\u4F5C\u7CFB\u7EDF\u3002</li><li>\u8C03\u7528 <code>registerFunc</code> \u6765\u6CE8\u518C\u5404\u79CD\u529F\u80FD\u3002</li><li>\u6700\u540E\uFF0C\u4F7F\u7528 <code>&lt;-make(chan bool)</code> \u65E0\u9650\u7B49\u5F85\uFF0C\u786E\u4FDD\u4E3B\u51FD\u6570\u4E0D\u4F1A\u9000\u51FA\u3002</li></ul></li><li><strong>\u6CE8\u518C\u51FD\u6570</strong>: <ul><li><code>registerFunc</code> \u51FD\u6570\u662F\u6B64\u4EE3\u7801\u7684\u6838\u5FC3\uFF0C\u5B83\u5C06\u5404\u79CD\u5373\u65F6\u6D88\u606F\uFF08IM\uFF09\u529F\u80FD\u4E0E JavaScript \u5168\u5C40\u5BF9\u8C61\u8FDB\u884C\u7ED1\u5B9A\uFF0C\u4F7F\u5F97\u5728\u6D4F\u89C8\u5668\u73AF\u5883\u4E2D\u53EF\u4EE5\u901A\u8FC7 JavaScript \u8C03\u7528\u5B83\u4EEC\u3002</li><li>\u4F7F\u7528 <code>wasm_wrapper</code> \u5305\u521B\u5EFA\u4E86\u4E0D\u540C\u7684\u51FD\u6570\u201C\u5305\u88C5\u5668\u201D\u5B9E\u4F8B\uFF0C\u5982 <code>NewWrapperCommon</code>, <code>NewWrapperInitLogin</code>, <code>NewWrapperConMsg</code> \u7B49\u3002</li><li>\u5BF9\u4E8E\u6BCF\u4E2A\u5305\u88C5\u5668\uFF0C\u90FD\u5C06\u5176\u65B9\u6CD5\u6CE8\u518C\u4E3A JavaScript \u53EF\u8C03\u7528\u7684\u51FD\u6570\u3002\u4F8B\u5982\uFF0C<code>js.Global().Set(&quot;initSDK&quot;, js.FuncOf(wrapperInitLogin.InitSDK))</code> \u4F1A\u5C06 <code>initSDK</code> \u51FD\u6570\u6DFB\u52A0\u5230\u5168\u5C40 JavaScript \u5BF9\u8C61\uFF0C\u5141\u8BB8 JS \u8C03\u7528\u8BE5\u529F\u80FD\u3002</li></ul></li><li><strong>\u529F\u80FD\u6CE8\u518C</strong>: <ul><li>\u4EE3\u7801\u4E2D\u6CE8\u518C\u4E86\u5927\u91CF\u7684\u529F\u80FD\uFF0C\u5982\u767B\u5F55\u3001\u6D88\u606F\u521B\u5EFA\u3001\u6D88\u606F\u53D1\u9001\u3001\u83B7\u53D6\u4F1A\u8BDD\u5217\u8868\u3001\u5904\u7406\u7FA4\u7EC4\u3001\u7528\u6237\u3001\u597D\u53CB\u7B49\u3002</li></ul></li></ol><p>\u7531\u4E8E\u4EE3\u7801\u8FC7\u957F\uFF0C\u6211\u65E0\u6CD5\u89E3\u91CA\u6BCF\u4E2A\u51FD\u6570\u7684\u8BE6\u7EC6\u5185\u5BB9\uFF0C\u4F46\u5927\u4F53\u4E0A\uFF0C\u5B83\u6DB5\u76D6\u4E86 IM SDK \u63D0\u4F9B\u7684\u5927\u90E8\u5206\u529F\u80FD\uFF0C\u5E76\u5141\u8BB8\u5728\u6D4F\u89C8\u5668\u73AF\u5883\u4E2D\u4F7F\u7528 WebAssembly \u8C03\u7528\u8FD9\u4E9B\u529F\u80FD\u3002</p><h3 id="\u7ED3\u6784\u4F53-wrappercommon" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u6784\u4F53-wrappercommon" aria-hidden="true">#</a> \u7ED3\u6784\u4F53\uFF1AWrapperCommon</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>type WrapperCommon struct {
	commonFunc *js.Value
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>type WrapperCommon struct {...}</code>: \u5B9A\u4E49\u4E86\u4E00\u4E2A\u540D\u4E3A<code>WrapperCommon</code>\u7684\u7ED3\u6784\u4F53\u3002</li><li><code>commonFunc *js.Value</code>: \u5728\u8FD9\u4E2A\u7ED3\u6784\u4F53\u5185\uFF0C\u6709\u4E00\u4E2A\u540D\u4E3A<code>commonFunc</code>\u7684\u5B57\u6BB5\uFF0C\u5B83\u7684\u7C7B\u578B\u662F\u4E00\u4E2A\u6307\u5411<code>js.Value</code>\u7684\u6307\u9488\u3002\u8FD9\u91CC\uFF0C<code>js.Value</code>\u5F88\u53EF\u80FD\u6765\u81EA\u4E8EGo\u7684WebAssembly\u7ED1\u5B9A\u5305\uFF0C\u901A\u5E38\u7528\u4E8E\u4E0EJavaScript\u4EE3\u7801\u4E92\u64CD\u4F5C\u3002</li></ol><h3 id="\u51FD\u6570-newwrappercommon" tabindex="-1"><a class="header-anchor" href="#\u51FD\u6570-newwrappercommon" aria-hidden="true">#</a> \u51FD\u6570\uFF1ANewWrapperCommon</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>func NewWrapperCommon() *WrapperCommon {
	return &amp;WrapperCommon{}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li><code>func NewWrapperCommon() *WrapperCommon</code>: \u5B9A\u4E49\u4E86\u4E00\u4E2A\u540D\u4E3A<code>NewWrapperCommon</code>\u7684\u51FD\u6570\uFF0C\u8FD9\u4E2A\u51FD\u6570\u6CA1\u6709\u63A5\u53D7\u4EFB\u4F55\u53C2\u6570\u5E76\u8FD4\u56DE\u4E00\u4E2A\u6307\u5411<code>WrapperCommon</code>\u7C7B\u578B\u7684\u6307\u9488\u3002</li><li><code>return &amp;WrapperCommon{}</code>: \u8FD9\u91CC\uFF0C\u51FD\u6570\u521B\u5EFA\u4E86\u4E00\u4E2A\u65B0\u7684<code>WrapperCommon</code>\u5B9E\u4F8B\uFF0C\u5E76\u8FD4\u56DE\u4E86\u8BE5\u5B9E\u4F8B\u7684\u6307\u9488\u3002\u8FD9\u662F\u4E00\u4E2A\u5E38\u89C1\u7684\u505A\u6CD5\uFF0C\u79F0\u4E3A\u5DE5\u5382\u65B9\u6CD5\u6216\u6784\u9020\u51FD\u6570\uFF0C\u7528\u4E8E\u521B\u5EFA\u548C\u521D\u59CB\u5316\u4E00\u4E2A\u65B0\u7684\u5BF9\u8C61\u5B9E\u4F8B\u3002</li></ol><p>\u8FD9\u6BB5\u4EE3\u7801\u7B80\u5355\u7684\u5C55\u793A\u4E86\u5982\u4F55\u5B9A\u4E49\u4E00\u4E2A\u7ED3\u6784\u4F53\u548C\u5982\u4F55\u4E3A\u8BE5\u7ED3\u6784\u4F53\u63D0\u4F9B\u4E00\u4E2A\u6784\u9020\u51FD\u6570\u3002\u4F46\u4ECE\u8FD9\u6BB5\u4EE3\u7801\u4E2D\uFF0C\u6211\u4EEC\u8FD8\u770B\u4E0D\u51FA<code>WrapperCommon</code>\u7684\u5B9E\u9645\u7528\u9014\uFF0C\u4EE5\u53CA<code>commonFunc</code>\u5B57\u6BB5\u7684\u5177\u4F53\u7528\u6CD5\u3002\u8981\u5B8C\u5168\u7406\u89E3\u8FD9\u90E8\u5206\u4EE3\u7801\uFF0C\u53EF\u80FD\u9700\u8981\u66F4\u591A\u4E0A\u4E0B\u6587\u6216\u76F8\u5173\u4EE3\u7801\u3002</p><h2 id="\u7EE7\u7EED-listener-\u4EE3\u7801\u89E3\u91CA" tabindex="-1"><a class="header-anchor" href="#\u7EE7\u7EED-listener-\u4EE3\u7801\u89E3\u91CA" aria-hidden="true">#</a> \u7EE7\u7EED listener \u4EE3\u7801\u89E3\u91CA</h2><p>\u8FD9\u6BB5\u4EE3\u7801\u5B9A\u4E49\u4E86\u4E00\u4E2A<code>ConnCallback</code>\u7ED3\u6784\u4F53\u548C\u4E00\u7CFB\u5217\u76F8\u5173\u7684\u65B9\u6CD5\u3002\u6211\u4EEC\u4ECE\u5934\u5F00\u59CB\u9010\u4E00\u89E3\u91CA\u3002</p><h3 id="\u7ED3\u6784\u4F53\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u6784\u4F53\u5B9A\u4E49" aria-hidden="true">#</a> \u7ED3\u6784\u4F53\u5B9A\u4E49</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>type ConnCallback struct {
	uid string
	CallbackWriter
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u5B9A\u4E49\u4E86\u4E00\u4E2A\u53EB<code>ConnCallback</code>\u7684\u7ED3\u6784\u4F53\u3002\u5B83\u6709\u4E24\u4E2A\u6210\u5458\u53D8\u91CF\uFF1A<code>uid</code>\uFF08\u5B57\u7B26\u4E32\u7C7B\u578B\uFF09\u548C\u4E00\u4E2A\u533F\u540D\u7684<code>CallbackWriter</code>\u6210\u5458\uFF08\u8FD9\u610F\u5473\u7740<code>ConnCallback</code>\u7EE7\u627F\u4E86<code>CallbackWriter</code>\u7684\u6240\u6709\u5B57\u6BB5\u548C\u65B9\u6CD5\uFF09\u3002</p><h3 id="\u6784\u9020\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#\u6784\u9020\u51FD\u6570" aria-hidden="true">#</a> \u6784\u9020\u51FD\u6570</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>func NewConnCallback(funcName string, callback *js.Value) *ConnCallback {
	return &amp;ConnCallback{CallbackWriter: NewEventData(callback).SetEvent(funcName)}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u51FD\u6570\u662F<code>ConnCallback</code>\u7684\u6784\u9020\u51FD\u6570\uFF0C\u7528\u4E8E\u521B\u5EFA<code>ConnCallback</code>\u7684\u65B0\u5B9E\u4F8B\u3002\u5B83\u63A5\u6536\u4E00\u4E2A\u51FD\u6570\u540D<code>funcName</code>\u548C\u4E00\u4E2A<code>callback</code>\uFF08\u53EF\u80FD\u662F\u4E00\u4E2AJavaScript\u7684\u56DE\u8C03\u51FD\u6570\uFF09\uFF0C\u7136\u540E\u5B83\u521D\u59CB\u5316<code>CallbackWriter</code>\u5B57\u6BB5\u5E76\u8FD4\u56DE\u65B0\u7684<code>ConnCallback</code>\u5B9E\u4F8B\u3002</p><h3 id="\u65B9\u6CD5\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6CD5\u5B9A\u4E49" aria-hidden="true">#</a> \u65B9\u6CD5\u5B9A\u4E49</h3><p>\u4EE5\u4E0B\u662F<code>ConnCallback</code>\u7684\u65B9\u6CD5\uFF0C\u8FD9\u4E9B\u65B9\u6CD5\u901A\u5E38\u4F1A\u5728\u4E0D\u540C\u7684\u8FDE\u63A5\u72B6\u6001\u4E0B\u88AB\u8C03\u7528\uFF0C\u5982\u6210\u529F\u8FDE\u63A5\u3001\u8FDE\u63A5\u5931\u8D25\u7B49\u3002</p><ol><li><strong>OnConnecting()</strong>\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>func (i *ConnCallback) OnConnecting() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u5F00\u59CB\u8FDE\u63A5\u65F6\uFF0C\u6B64\u65B9\u6CD5\u4F1A\u88AB\u8C03\u7528\u3002\u5B83\u4F7F\u7528<code>utils.GetSelfFuncName()</code>\u6765\u83B7\u53D6\u5F53\u524D\u51FD\u6570\u7684\u540D\u79F0\uFF0C\u5E76\u8BBE\u7F6E\u4E3A\u4E8B\u4EF6\u540D\uFF0C\u7136\u540E\u53D1\u9001\u6D88\u606F\u3002</p><ol><li><strong>OnConnectSuccess()</strong>\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>func (i *ConnCallback) OnConnectSuccess() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u8FDE\u63A5\u6210\u529F\u65F6\uFF0C\u6B64\u65B9\u6CD5\u4F1A\u88AB\u8C03\u7528\u3002\u540C\u6837\u7684\uFF0C\u5B83\u4E5F\u8BBE\u7F6E\u5F53\u524D\u51FD\u6570\u7684\u540D\u79F0\u4E3A\u4E8B\u4EF6\u540D\u5E76\u53D1\u9001\u6D88\u606F\u3002</p><ol><li><strong>OnConnectFailed(errCode int32, errMsg string)</strong>\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>func (i *ConnCallback) OnConnectFailed(errCode int32, errMsg string) {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetErrCode(errCode).SetErrMsg(errMsg).SendMessage()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u8FDE\u63A5\u5931\u8D25\u65F6\uFF0C\u6B64\u65B9\u6CD5\u4F1A\u88AB\u8C03\u7528\u3002\u9664\u4E86\u8BBE\u7F6E\u4E8B\u4EF6\u540D\uFF0C\u5B83\u8FD8\u8BBE\u7F6E\u9519\u8BEF\u7801\u548C\u9519\u8BEF\u6D88\u606F\uFF0C\u7136\u540E\u53D1\u9001\u3002</p><ol><li><strong>OnKickedOffline()</strong> \u548C <strong>OnUserTokenExpired()</strong>\uFF1A \u8FD9\u4E24\u4E2A\u65B9\u6CD5\u4E0E\u524D\u9762\u7684\u65B9\u6CD5\u7C7B\u4F3C\uFF0C\u5B83\u4EEC\u5728\u7279\u5B9A\u7684\u4E8B\u4EF6\u53D1\u751F\u65F6\u88AB\u8C03\u7528\uFF0C\u5E76\u8BBE\u7F6E\u5BF9\u5E94\u7684\u4E8B\u4EF6\u540D\u53D1\u9001\u6D88\u606F\u3002</li><li><strong>OnSelfInfoUpdated(userInfo string)</strong>\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>func (i *ConnCallback) OnSelfInfoUpdated(userInfo string) {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(userInfo).SendMessage()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F53\u7528\u6237\u4FE1\u606F\u66F4\u65B0\u65F6\uFF0C\u6B64\u65B9\u6CD5\u88AB\u8C03\u7528\u3002\u5B83\u8BBE\u7F6E\u4E8B\u4EF6\u540D\uFF0C\u5E76\u5C06\u66F4\u65B0\u7684\u7528\u6237\u4FE1\u606F\u4F5C\u4E3A\u6570\u636E\u53D1\u9001\u3002</p><p><strong>\u7EE7\u7EED\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u4F60\u597D\uFF0C\u6211\u6B63\u5728\u5B66\u4E60\u8FD9\u5757\u7684\u903B\u8F91\uFF0C\u8BF7\u8BE6\u7EC6\u5E2E\u6211\u89E3\u6790\u4EE3\u7801\u7684\u8BBE\u8BA1\uFF0C\u529F\u80FD\uFF0C\u4EE5\u53CA\u4F5C\u7528\uFF1A
\`\`\`
type OnConnListener interface {
	OnConnecting()
	OnConnectSuccess()
	OnConnectFailed(errCode int32, errMsg string)
	OnKickedOffline()
	OnUserTokenExpired()
}

\u4E0B\u9762\u662F ws_wrapper/ws_local_server/ws_init_login.go
func (i *InitCallback) OnConnectFailed(ErrCode int32, ErrMsg string) {
	var ed EventData
	ed.Event = cleanUpfuncName(runFuncName())
	ed.ErrCode = ErrCode
	ed.ErrMsg = ErrMsg
	SendOneUserMessage(ed, i.uid)
}

\u4E0B\u9762\u662F wasm/event_listener/listener.go
func (i *ConnCallback) OnConnectFailed(errCode int32, errMsg string) {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetErrCode(errCode).SetErrMsg(errMsg).SendMessage()
}
type EventData struct {
	Event       string \`json:&quot;event&quot;\`
	ErrCode     int32  \`json:&quot;errCode&quot;\`
	ErrMsg      string \`json:&quot;errMsg&quot;\`
	Data        string \`json:&quot;data&quot;\`
	OperationID string \`json:&quot;operationID&quot;\`
}
func cleanUpfuncName(funcName string) string {
	end := strings.LastIndex(funcName, &quot;.&quot;)
	if end == -1 {
		log.Info(&quot;&quot;, &quot;funcName not include.&quot;, funcName)
		return &quot;&quot;
	}
	return funcName[end+1:]
}
func SendOneUserMessage(data interface{}, uid string) {
	var chMsg ChanMsg
	chMsg.data, _ = json.Marshal(data)
	chMsg.uid = uid
	err := send2Ch(WS.ch, &amp;chMsg, 2)
	if err != nil {
		log.Info(&quot;&quot;, &quot;send2ch failed, &quot;, err, string(chMsg.data), uid)
		return
	}
	log.Info(&quot;&quot;, &quot;send response to web: &quot;, string(chMsg.data))
}
func send2Ch(ch chan ChanMsg, value *ChanMsg, timeout int64) error {
	var flag = 0
	select {
	case ch &lt;- *value:
		flag = 1
	case &lt;-time.After(time.Second * time.Duration(timeout)):
		flag = 2
	}
	if flag == 1 {
		return nil
	} else {
		log.Info(&quot;&quot;, &quot;send cmd timeout, &quot;, timeout, value)
		return errors.New(&quot;send cmd timeout&quot;)
	}
}


\`\`\`
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F60\u63D0\u4F9B\u7684\u4EE3\u7801\u662F\u7528Go\u8BED\u8A00\u7F16\u5199\u7684\uFF0C\u6D89\u53CA\u5230WebSocket\u8FDE\u63A5\u4E8B\u4EF6\u76D1\u542C\u548C\u5904\u7406\u7684\u903B\u8F91\u3002\u6211\u5C06\u9010\u4E00\u89E3\u91CA\u6BCF\u4E2A\u90E8\u5206\u7684\u8BBE\u8BA1\u3001\u529F\u80FD\u548C\u4F5C\u7528\u3002</p><p>\u9996\u5148\uFF0C\u5B9A\u4E49\u4E86\u4E00\u4E2A\u540D\u4E3A <code>OnConnListener</code> \u7684\u63A5\u53E3\uFF0C\u5305\u542B\u51E0\u4E2A\u65B9\u6CD5\uFF1A</p><ul><li><code>OnConnecting()</code>\uFF1A\u5F53WebSocket\u5F00\u59CB\u8FDE\u63A5\u65F6\u8C03\u7528\u3002</li><li><code>OnConnectSuccess()</code>\uFF1A\u5F53WebSocket\u6210\u529F\u8FDE\u63A5\u65F6\u8C03\u7528\u3002</li><li><code>OnConnectFailed(errCode int32, errMsg string)</code>\uFF1A\u5F53WebSocket\u8FDE\u63A5\u5931\u8D25\u65F6\u8C03\u7528\uFF0C\u4F20\u9012\u9519\u8BEF\u4EE3\u7801\u548C\u6D88\u606F\u3002</li><li><code>OnKickedOffline()</code>\uFF1A\u5F53\u7528\u6237\u88AB\u8E22\u4E0B\u7EBF\u65F6\u8C03\u7528\u3002</li><li><code>OnUserTokenExpired()</code>\uFF1A\u5F53\u7528\u6237\u7684token\u8FC7\u671F\u65F6\u8C03\u7528\u3002</li></ul><p>\u8FD9\u4E2A\u63A5\u53E3\u5B9A\u4E49\u4E86WebSocket\u8FDE\u63A5\u751F\u547D\u5468\u671F\u4E2D\u53EF\u80FD\u53D1\u751F\u7684\u4E8B\u4EF6\u3002\u4EFB\u4F55\u5B9E\u73B0\u8FD9\u4E2A\u63A5\u53E3\u7684\u7C7B\u578B\u90FD\u5FC5\u987B\u5B9E\u73B0\u8FD9\u4E9B\u65B9\u6CD5\u3002</p><p>\u63A5\u4E0B\u6765\uFF0C\u6211\u4EEC\u770B\u5230 <code>InitCallback</code> \u548C <code>ConnCallback</code> \u7C7B\u578B\u5206\u522B\u5B9E\u73B0\u4E86 <code>OnConnListener</code> \u63A5\u53E3\u4E2D\u7684 <code>OnConnectFailed</code> \u65B9\u6CD5\u3002\u4E0D\u540C\u7684\u5B9E\u73B0\u8BF4\u660E\u4E86\u5728\u4E0D\u540C\u7684\u4E0A\u4E0B\u6587\u4E2D\u5904\u7406\u8FDE\u63A5\u5931\u8D25\u4E8B\u4EF6\u7684\u591A\u6837\u6027\uFF1A</p><ul><li><code>InitCallback</code> \u4F1A\u6784\u5EFA\u4E00\u4E2A <code>EventData</code> \u7ED3\u6784\u4F53\uFF0C\u8BBE\u7F6E\u76F8\u5E94\u7684\u4E8B\u4EF6\u540D\u79F0\u3001\u9519\u8BEF\u4EE3\u7801\u548C\u9519\u8BEF\u6D88\u606F\uFF0C\u7136\u540E\u901A\u8FC7 <code>SendOneUserMessage</code> \u53D1\u9001\u7ED9\u7279\u5B9A\u7684\u7528\u6237\u3002</li><li><code>ConnCallback</code> \u5219\u662F\u901A\u8FC7\u4E00\u7CFB\u5217\u94FE\u5F0F\u8C03\u7528\u8BBE\u7F6E\u4E8B\u4EF6\u540D\u79F0\u3001\u9519\u8BEF\u4EE3\u7801\u548C\u9519\u8BEF\u6D88\u606F\uFF0C\u5E76\u901A\u8FC7 <code>SendMessage()</code> \u65B9\u6CD5\u6765\u53D1\u9001\u8FD9\u4E9B\u4FE1\u606F\u3002</li></ul><p>\u8FD9\u663E\u793A\u4E86\u4E0D\u540C\u5BF9\u8C61\u53EF\u80FD\u4F1A\u4EE5\u4E0D\u540C\u7684\u65B9\u5F0F\u5904\u7406\u76F8\u540C\u7684\u4E8B\u4EF6\u3002</p><p><code>EventData</code> \u7ED3\u6784\u4F53\u7528\u4E8E\u5C01\u88C5\u53D1\u9001\u7684\u4E8B\u4EF6\u6570\u636E\uFF0C\u5305\u542B\u4E8B\u4EF6\u540D\u3001\u9519\u8BEF\u4EE3\u7801\u3001\u9519\u8BEF\u6D88\u606F\u3001\u6570\u636E\u548C\u64CD\u4F5CID\u3002\u5B83\u662F\u4E00\u4E2A\u7B80\u5355\u7684\u6570\u636E\u5BB9\u5668\u3002</p><p><code>cleanUpfuncName</code> \u51FD\u6570\u7528\u4E8E\u5904\u7406\u51FD\u6570\u540D\u5B57\u7B26\u4E32\uFF0C\u5B83\u627E\u5230\u6700\u540E\u4E00\u4E2A\u70B9\u53F7\uFF08<code>.</code>\uFF09\u5E76\u622A\u53D6\u5B83\u4E4B\u540E\u7684\u5B57\u7B26\u4E32\u4F5C\u4E3A\u4E8B\u4EF6\u540D\u3002\u5982\u679C\u6CA1\u6709\u627E\u5230\u70B9\u53F7\uFF0C\u5219\u8BB0\u5F55\u4E00\u6761\u4FE1\u606F\u65E5\u5FD7\uFF0C\u5E76\u8FD4\u56DE\u7A7A\u5B57\u7B26\u4E32\u3002</p><p><code>SendOneUserMessage</code> \u51FD\u6570\u7528\u4E8E\u5C06 <code>EventData</code> \u7ED3\u6784\u4F53\u5E8F\u5217\u5316\u4E3AJSON\u683C\u5F0F\uFF0C\u5E76\u901A\u8FC7WebSocket\u901A\u9053\u53D1\u9001\u7ED9\u6307\u5B9A\u7528\u6237\u3002\u5982\u679C\u53D1\u9001\u8FC7\u7A0B\u4E2D\u51FA\u73B0\u9519\u8BEF\uFF0C\u4F1A\u8BB0\u5F55\u65E5\u5FD7\u4FE1\u606F\u3002</p><p><code>send2Ch</code> \u51FD\u6570\u662F\u4E00\u4E2A\u8F85\u52A9\u51FD\u6570\uFF0C\u5B83\u8D1F\u8D23\u5C06\u6D88\u606F\u53D1\u9001\u5230\u4E00\u4E2AGo\u901A\u9053\uFF0C\u5982\u679C\u5728\u6307\u5B9A\u7684\u8D85\u65F6\u65F6\u95F4\u5185\u53D1\u9001\u5931\u8D25\uFF0C\u5219\u8BB0\u5F55\u9519\u8BEF\u5E76\u8FD4\u56DE\u4E00\u4E2A\u8D85\u65F6\u9519\u8BEF\u3002</p><p>\u5728\u8FD9\u6BB5\u4EE3\u7801\u4E2D\uFF0C\u4E8B\u4EF6\u76D1\u542C\u548C\u6D88\u606F\u53D1\u9001\u662F\u5F02\u6B65\u7684\uFF0C\u4F7F\u7528\u4E86Go\u7684\u5E76\u53D1\u7279\u6027\uFF08\u901A\u8FC7goroutines\u548Cchannels\uFF09\u3002\u8FD9\u79CD\u8BBE\u8BA1\u6A21\u5F0F\u53EF\u4EE5\u9AD8\u6548\u5730\u5904\u7406\u5E76\u53D1\u4E8B\u4EF6\u548C\u6D88\u606F\u4F20\u9012\uFF0C\u9002\u7528\u4E8E\u9AD8\u5E76\u53D1\u7684\u7F51\u7EDC\u670D\u52A1\uFF0C\u4F8B\u5982WebSocket\u670D\u52A1\u5668\u3002</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>\u4F60\u73B0\u5728\u662F\u4E00\u4E2A\u4F18\u79C0\u7684\u7A0B\u5E8F\u5458\u5DE5\u7A0B\u5E08\uFF0C\u53EF\u80FD\u7F16\u5199\u4F18\u96C5\u7684\u4EE3\u7801\u4EE5\u53CA\u6E05\u6670\u7684\u6CE8\u91CA

\u6211\u73B0\u5728\u5E0C\u671B\u4F60\u57FA\u4E8E \u73B0\u6709\u7684 wasm \u7684\u51FD\u6570\u7F16\u5199\u65B0\u7684\u51FD\u6570\uFF0C\u6211\u4F1A\u7ED9\u4F60\u4E00\u4E2A\u6848\u4F8B\uFF0C\u7136\u540E\u4F60\u6765\u6839\u636E\u6211\u7ED9\u4F60\u7684\u6848\u4F8B\u53BB\u6A21\u62DF\u5199\u4E00\u4E2A\u9AD8\u8D28\u91CF\u7684\u4EE3\u7801\u548C\u6CE8\u91CA

\u9996\u5148\uFF0C\u6211\u8981\u544A\u8BC9\u4F60\u7684\u662F\u7ED3\u6784\u4F53\uFF1A
<span class="token string">\`\`</span><span class="token string">\`go
type EventData struct {
	Event       string \`</span>json<span class="token punctuation">:</span><span class="token string">&quot;event&quot;</span><span class="token string">\`
	ErrCode     int32  \`</span>json<span class="token punctuation">:</span><span class="token string">&quot;errCode&quot;</span><span class="token string">\`
	ErrMsg      string \`</span>json<span class="token punctuation">:</span><span class="token string">&quot;errMsg&quot;</span><span class="token string">\`
	Data        string \`</span>json<span class="token punctuation">:</span><span class="token string">&quot;data&quot;</span><span class="token string">\`
	OperationID string \`</span>json<span class="token punctuation">:</span><span class="token string">&quot;operationID&quot;</span><span class="token string">\`
}
\`</span><span class="token string">\`\`</span>

\u6211\u53C2\u8003 wasm \u6A21\u5757\u7684\u4EE3\u7801\uFF1A
<span class="token string">\`\`</span><span class="token string">\`go
type ConnCallback struct {
	uid string
	CallbackWriter
}

func NewConnCallback(funcName string, callback *js.Value) *ConnCallback {
	return &amp;ConnCallback{CallbackWriter: NewEventData(callback).SetEvent(funcName)}
}

func (i *ConnCallback) OnConnecting() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()
}

func (i *ConnCallback) OnConnectSuccess() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()

}
func (i *ConnCallback) OnConnectFailed(errCode int32, errMsg string) {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetErrCode(errCode).SetErrMsg(errMsg).SendMessage()
}

func (i *ConnCallback) OnKickedOffline() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()
}

func (i *ConnCallback) OnUserTokenExpired() {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SendMessage()
}

func (i *ConnCallback) OnSelfInfoUpdated(userInfo string) {
	i.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(userInfo).SendMessage()
}
\`</span><span class="token string">\`\`</span>

\u7136\u540E\u91CD\u6784\u540E\u7684\u4EE3\u7801\u5982\u4E0B\uFF1A

ws listener \u4E2D\u7684\u51FD\u6570\uFF1A

<span class="token string">\`\`</span><span class="token string">\`go
type ConnCallback struct {
	respMessage *RespMessage
}

func NewConnCallback(respMessage *RespMessage) *ConnCallback {
	return &amp;ConnCallback{respMessage: respMessage}
}

func (c ConnCallback) OnConnecting() {
	c.respMessage.sendEventSuccessRespNoData(getSelfFuncName())
}

func (c ConnCallback) OnConnectSuccess() {
	c.respMessage.sendEventSuccessRespNoData(getSelfFuncName())
}

func (c ConnCallback) OnConnectFailed(errCode int32, errMsg string) {
	c.respMessage.sendEventFailedRespNoData(getSelfFuncName(), errCode, errMsg)
}

func (c ConnCallback) OnKickedOffline() {
	c.respMessage.sendEventSuccessRespNoData(getSelfFuncName())
}

func (c ConnCallback) OnUserTokenExpired() {
	c.respMessage.sendEventSuccessRespNoData(getSelfFuncName())
}
\`</span><span class="token string">\`\`</span>

\u4EE5\u53CA reponder \u51FD\u6570\uFF1A

<span class="token string">\`\`</span><span class="token string">\`
func (r *RespMessage) sendEventSuccessRespNoData(event string) {
	r.respMessagesChan &lt;- &amp;EventData{
		Event: event,
	}
}

func (r *RespMessage) sendEventSuccessRespWithData(event string, data string) {
	r.respMessagesChan &lt;- &amp;EventData{
		Event: event,
		Data:  data,
	}
}

func (r *RespMessage) sendEventFailedRespNoData(event string, errCode int32, errMsg string) {
	r.respMessagesChan &lt;- &amp;EventData{
		Event:   event,
		ErrCode: errCode,
		ErrMsg:  errMsg,
	}
}

func (r *RespMessage) sendEventFailedREspNoErr(event string) {
	r.respMessagesChan &lt;- &amp;EventData{
		Event: event,
	}
}
\`</span><span class="token string">\`\`</span>

\u6211\u73B0\u5728\u60F3\u8BA9\u4F60\uFF0C\u6839\u636E\u4E0B\u9762\u7684\u91CD\u6784\u524D\u7684\u4EE3\u7801\u5982\u4E0B\uFF1A
<span class="token string">\`\`</span><span class="token string">\`go

type GroupCallback struct {
	CallbackWriter
}

func NewGroupCallback(callback *js.Value) *GroupCallback {
	return &amp;GroupCallback{CallbackWriter: NewEventData(callback)}
}

func (f *GroupCallback) OnJoinedGroupAdded(groupInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupInfo).SendMessage()
}
func (f *GroupCallback) OnJoinedGroupDeleted(groupInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupInfo).SendMessage()
}
func (f *GroupCallback) OnGroupMemberAdded(groupMemberInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupMemberInfo).SendMessage()
}
func (f *GroupCallback) OnGroupMemberDeleted(groupMemberInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupMemberInfo).SendMessage()
}
func (f *GroupCallback) OnGroupApplicationAdded(groupApplication string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupApplication).SendMessage()
}
func (f *GroupCallback) OnGroupApplicationDeleted(groupApplication string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupApplication).SendMessage()
}
func (f *GroupCallback) OnGroupInfoChanged(groupInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupInfo).SendMessage()
}
func (f *GroupCallback) OnGroupMemberInfoChanged(groupMemberInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupMemberInfo).SendMessage()
}
func (f *GroupCallback) OnGroupApplicationAccepted(groupApplication string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupApplication).SendMessage()
}
func (f *GroupCallback) OnGroupApplicationRejected(groupApplication string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupApplication).SendMessage()
}
func (f *GroupCallback) OnGroupDismissed(groupInfo string) {
	f.CallbackWriter.SetEvent(utils.GetSelfFuncName()).SetData(groupInfo).SendMessage()
}
\`</span><span class="token string">\`\`</span>

\u8BF7\u4F60\u57FA\u4E8E\u4E0A\u9762\u91CD\u6784\u524D\u7684\u4EE3\u7801\u6A21\u4EFF\u5199\u51FA\u91CD\u6784\u540E\u7684\u4EE3\u7801 ws listener \u4E2D\u7684\u51FD\u6570\uFF0C\u4EE5\u53CA\u5FC5\u8981\u7684 \u4EE5\u53CA reponder \u4E2D\u4E0D\u5B58\u5728\u7684\u51FD\u6570\uFF08\u5982\u679C\u5B58\u5728\u7684\u4E0D\u7528\u5199\uFF09\uFF0C\u4EE5\u53CA\u5FC5\u8981\u7684\u4E13\u4E1A\u7684\u51FD\u6570\u6CE8\u91CA\uFF0C\u8BF7\u76F4\u63A5\u7ED9\u51FA\u4EE3\u7801\uFF1A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,77),t=[l];function c(d,o){return e(),s("div",null,t)}const u=n(i,[["render",c],["__file","146.html.vue"]]);export{u as default};
