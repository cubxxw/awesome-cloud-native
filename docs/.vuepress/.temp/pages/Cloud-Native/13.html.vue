<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第13节-go-context-上下文" tabindex="-1"><a class="header-anchor" href="#第13节-go-context-上下文" aria-hidden="true">#</a> 第13节 go context 上下文</h1>
<div><a href = '12.md' style='float:left'>⬆️上一节🔗  </a><a href = '14.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> context</h2>
<p>针对项目中进程出现的 context 学习</p>
<div class="custom-container tip"><p class="custom-container-title">参考</p>
<ul>
<li>https://segmentfault.com/a/1190000040917752</li>
</ul>
</div>
<div class="custom-container warning"><p class="custom-container-title">控制并发的方式</p>
<p>控制并发的方式有两种：</p>
<ol>
<li>WaitGroup</li>
<li>context</li>
</ol>
</div>
<h2 id="我们需要它" tabindex="-1"><a class="header-anchor" href="#我们需要它" aria-hidden="true">#</a> 我们需要它</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>WaitGroup 很容易实现，我们两个协程需要控制一个协程执行完毕，再执行另一个协程。</p>
<p>但是有一个问题，我可能需要去通知这个 job 去停止，需要主动通知停止？</p>
<p>很容易想到 <a href="https://go.nsddd.top/markdown/19.html" target="_blank" rel="noopener noreferrer">Channel (channel + select)<ExternalLinkIcon/></a> 解决问题。</p>
<p>但是我们可以想到一个问题，如果我们有多个 goroutine ，或者 goroutine 中有 goruntime 我们该怎么样去解决问题？</p>
<p>⚡ 使用 context</p>
</div>
<p>我们在之前的 各个协程（函数）返回中知道了，协程可以嵌套，甚至可以不断调用下去。</p>
<p>context 或许可以等待一个时间，一段时间后无论有多少协程，统统结束掉。</p>
<p><strong>第一层超时，后面全部超时</strong></p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p><code v-pre>context</code>可以用来在<code v-pre>goroutine</code>之间传递上下文信息，相同的<code v-pre>context</code>可以传递给运行在不同<code v-pre>goroutine</code>中的函数，上下文对于多个<code v-pre>goroutine</code>同时使用是安全的，<code v-pre>context</code>包定义了上下文类型，可以使用<code v-pre>background</code>、<code v-pre>TODO</code>创建一个上下文，在函数调用链之间传播<code v-pre>context</code>，也可以使用<code v-pre>WithDeadline</code>、<code v-pre>WithTimeout</code>、<code v-pre>WithCancel</code> 或 <code v-pre>WithValue</code> 创建的修改副本替换它，听起来有点绕，其实总结起就是一句话：<code v-pre>context</code>的作用就是在不同的<code v-pre>goroutine</code>之间同步请求特定的数据、取消信号以及处理请求的截止日期。</p>
<p>目前我们常用的一些库都是支持<code v-pre>context</code>的，例如<code v-pre>gin</code>、<code v-pre>database/sql</code>等库都是支持<code v-pre>context</code>的，这样更方便我们做并发控制了，只要在服务器入口创建一个<code v-pre>context</code>上下文，不断透传下去即可。</p>
</div>
<h2 id="创建context" tabindex="-1"><a class="header-anchor" href="#创建context" aria-hidden="true">#</a> 创建<code v-pre>context</code></h2>
<p><code v-pre>context</code>包主要提供了两种方式创建<code v-pre>context</code>:</p>
<ul>
<li><code v-pre>context.Backgroud()</code></li>
<li><code v-pre>context.TODO()</code></li>
</ul>
<p>这两个函数其实只是互为别名，没有差别，官方给的定义是：</p>
<ul>
<li><code v-pre>context.Background</code> 是上下文的默认值，所有其他的上下文都应该从它衍生（Derived）出来(最上层的）。</li>
<li><code v-pre>context.TODO</code> 应该只在不确定应该使用哪种上下文时使用；</li>
</ul>
<p>上面的两种方式是创建根<code v-pre>context</code>，不具备任何功能，具体实践还是要依靠<code v-pre>context</code>包提供的<code v-pre>With</code>系列函数来进行派生：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithCancel</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">)</span> <span class="token punctuation">(</span>ctx Context<span class="token punctuation">,</span> cancel CancelFunc<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">WithDeadline</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> deadline time<span class="token punctuation">.</span>Time<span class="token punctuation">)</span> <span class="token punctuation">(</span>Context<span class="token punctuation">,</span> CancelFunc<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">WithTimeout</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> timeout time<span class="token punctuation">.</span>Duration<span class="token punctuation">)</span> <span class="token punctuation">(</span>Context<span class="token punctuation">,</span> CancelFunc<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">WithValue</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> key<span class="token punctuation">,</span> val <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> Context
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '12.md' style='float:left'>⬆️上一节🔗  </a><a href = '14.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


