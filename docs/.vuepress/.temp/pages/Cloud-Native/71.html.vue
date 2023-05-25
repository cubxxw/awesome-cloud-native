<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第71节-openim-gitlink-rfc" tabindex="-1"><a class="header-anchor" href="#第71节-openim-gitlink-rfc" aria-hidden="true">#</a> 第71节 OpenIM Gitlink RFC</h1>
<div><a href = '70.md' style='float:left'>⬆️上一节🔗  </a><a href = '72.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="计划" tabindex="-1"><a class="header-anchor" href="#计划" aria-hidden="true">#</a> 计划</h2>
<p>为什么需要，我们需要知道哪些前置知识？</p>
<p>go flutter</p>
<ul>
<li>https://github.com/go-flutter-desktop/go-flutter</li>
</ul>
<p>中等难度的水平</p>
<p>自己定义函数，被调</p>
<p>方案就是如此~</p>
<p>core 跑 app</p>
<p>wsam 实现了（方案一），但是小程序没有存储</p>
<p>每一个 skd core 放在服务端</p>
<p>一个 用户 （每一个）在服务端起一个 sdk</p>
<p>第二个 是 <code v-pre>jssdk server</code></p>
<p>js 用不起来</p>
<p><strong>印象：</strong></p>
<p>jssdk s 服务端</p>
<p>每一次登录请求 new 一个</p>
<p>new 出来后有一对反射调用</p>
<p>每一次调用 web s 服务端 + core</p>
<p>找到 core 找到反射函数，找到函数后回调</p>
<p>login + 获取用户信息 两个模块。</p>
<p>js 登录 。</p>
<p>服务端收到登录。</p>
<p><strong>登录和退出登录问题</strong></p>
<h2 id="开源" tabindex="-1"><a class="header-anchor" href="#开源" aria-hidden="true">#</a> 开源</h2>
<p>C#</p>
<ul>
<li>https://github.com/OpenIMSDK/Open-IM-SDK-Unity</li>
</ul>
<p>安卓来说，直接通过 Unity 来搞定</p>
<p>安卓的工作，unit</p>
<h2 id="c" tabindex="-1"><a class="header-anchor" href="#c" aria-hidden="true">#</a> C++</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go -> c
C++ -> C
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>函数：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (ws *WServer) msgParse(conn *UserConn, jsonMsg []byte)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>文勖:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>wsRouter <span class="token operator">*</span>WsFuncRouter<span class="token punctuation">)</span> <span class="token function">GetSelfUserInfo</span><span class="token punctuation">(</span>input <span class="token builtin">string</span><span class="token punctuation">,</span> operationID <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   userWorker <span class="token operator">:=</span> open_im_sdk<span class="token punctuation">.</span><span class="token function">GetUserWorker</span><span class="token punctuation">(</span>wsRouter<span class="token punctuation">.</span>uId<span class="token punctuation">)</span>
   <span class="token keyword">if</span> <span class="token operator">!</span>wsRouter<span class="token punctuation">.</span><span class="token function">checkResourceLoadingAndKeysIn</span><span class="token punctuation">(</span>userWorker<span class="token punctuation">,</span> input<span class="token punctuation">,</span> operationID<span class="token punctuation">,</span> <span class="token function">runFuncName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span>
   <span class="token punctuation">}</span>
   userWorker<span class="token punctuation">.</span><span class="token function">User</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">GetSelfUserInfo</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>BaseSuccessFailed<span class="token punctuation">{</span><span class="token function">runFuncName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> operationID<span class="token punctuation">,</span> wsRouter<span class="token punctuation">.</span>uId<span class="token punctuation">}</span><span class="token punctuation">,</span> operationID<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（1）看下jssdk 2个函数，比如登录和获取用户信息，从js到jssdk server整个流程；</p>
<p>（2）ws框架，换成新版本（服务端errcode版本），具体问下gordon</p>
<p>（3）重点解决几个问题：1.登录和退出登录的问题；</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '70.md' style='float:left'>⬆️上一节🔗  </a><a href = '72.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


