<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第46节-rfc-user-interface-design" tabindex="-1"><a class="header-anchor" href="#第46节-rfc-user-interface-design" aria-hidden="true">#</a> 第46节 RFC：User interface design</h1>
<div><a href = '45.md' style='float:left'>⬆️上一节🔗  </a><a href = '47.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="驱动" tabindex="-1"><a class="header-anchor" href="#驱动" aria-hidden="true">#</a> 驱动</h2>
<p>LongConnMgr：负责所有ws网络相关：（内部双协程，分别处理收发消息）
（1）发起连接与重连（连接成功或失败，通知某些处理单元做数据同步操作，触发回调到UI层）；<br>
（2）关闭连接；
（3）发送与接收ws消息（包括发送响应消息与推送消息）；
（5）连接状态管理；
（6）定时触发心跳，以获取seq作为心跳，在连接检测的同时获取最新seq，并且传递给MsgSync协程
MsgSync 负责 同步最新的消息以及处理推送消息，以及最大seq消息：（独立协程）
（1）初始化同步最新消息；
（2）针对push消息，以及最大seq消息处理，确保消息连续有序；
friend、group、user 管理数据单元：
（1）分别负责本地数据和服务端数据对比，及回调；
（2）存储、修改、读取本地db；
（3）提供提供相关接口共外部调用；
Conversation 管理消息及会话单元：（独立协程）
（1）负责消息的创建与发送，处理，存储与触发；
（1）负责会话生成，更新，删除，并触发；
（2）根据通知消息调用相应的管理数据单元同步逻辑
（3）针对消息及会话，提供提供相关接口供外部调用（以channel通信方式）</p>
<h2 id="接口定义" tabindex="-1"><a class="header-anchor" href="#接口定义" aria-hidden="true">#</a> 接口定义</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Caller is an interface that defines the SDK's basic and message sending caller.</span>
<span class="token keyword">type</span> Caller <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token comment">// BaseCaller calls the SDK's basic caller by checking the arguments and verifying the callback.</span>
	<span class="token function">BaseCaller</span><span class="token punctuation">(</span>funcName <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> base open_im_sdk_callback<span class="token punctuation">.</span>Base<span class="token punctuation">,</span> args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token comment">// SendMessageCaller sends a message by calling the SDK's message sender.</span>
	<span class="token function">SendMessageCaller</span><span class="token punctuation">(</span>funcName <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> messageCallback open_im_sdk_callback<span class="token punctuation">.</span>SendMsgCallBack<span class="token punctuation">,</span> args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>BaseCaller 已经存在，它的逻辑是：</p>
<ul>
<li>首先，检查参数的数量是否正确，并获取操作ID。</li>
<li>然后，检查资源是否加载完成，如果没有完成，则返回一个错误。</li>
<li>最后，使用反射调用函数，将回调和参数传递给该函数，并在不同的协程中运行该函数。</li>
<li>如果出现恐慌，将恐慌转换为字符串并通过回调返回其错误。</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '45.md' style='float:left'>⬆️上一节🔗  </a><a href = '47.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


