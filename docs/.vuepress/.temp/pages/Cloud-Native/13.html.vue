<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第13节-go-context-上下文" tabindex="-1"><a class="header-anchor" href="#第13节-go-context-上下文" aria-hidden="true">#</a> 第13节 go context 上下文</h1>
<div><a href = '12.md' style='float:left'>⬆️上一节🔗  </a><a href = '14.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> context</h2>
<p>针对项目中进程出现的 context 学习</p>
<div class="custom-container tip"><p class="custom-container-title">参考</p>
<ul>
<li>
<p>https://segmentfault.com/a/1190000040917752</p>
</li>
<li>
<p>https://zhuanlan.zhihu.com/p/68792989</p>
</li>
</ul>
</div>
<div class="custom-container warning"><p class="custom-container-title">控制并发的方式</p>
<p>控制并发的方式有两种：</p>
<ol>
<li>WaitGroup</li>
<li>context</li>
</ol>
</div>
<p>context 主要用来在 goroutine 之间传递上下文信息，包括：取消信号、超时时间、截止时间、k-v 等。</p>
<p>随着 context 包的引入，标准库中很多接口因此加上了 context 参数，例如 database/sql 包。context 几乎成为了并发控制和超时控制的标准做法。</p>
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
<h2 id="它和-select-多路复用" tabindex="-1"><a class="header-anchor" href="#它和-select-多路复用" aria-hidden="true">#</a> 它和 select 多路复用</h2>
<p>感觉两者差距不大：</p>
<p>select多路复用</p>
<p>在我们实际开发中，可能不好确定什么时候关闭该管道，此时我们就不能用close，可以使用select解决方法</p>
<p><strong>注意：使用多路复用的时候不需要关闭<code v-pre>chan</code></strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">select</span><span class="token punctuation">{</span>
	<span class="token keyword">case</span> v<span class="token operator">:=</span> <span class="token operator">&lt;-</span>管道
	<span class="token operator">...</span><span class="token punctuation">.</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
	语句
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>粗糙版的退出策略：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">worker</span><span class="token punctuation">(</span>channel <span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        <span class="token keyword">select</span> <span class="token punctuation">{</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"hello world!"</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> <span class="token operator">&lt;-</span>channel<span class="token punctuation">:</span>
			<span class="token keyword">return</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    channel <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>

    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token function">worker</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    <span class="token function">close</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">问题</p>
<p>当 main 中的 close 函数执行关闭信道后，在极短时间内，可能会有一部分协程完成了。</p>
<p>加锁解决：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">worker</span><span class="token punctuation">(</span>wg <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">,</span> channel <span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">defer</span> wg<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        <span class="token keyword">select</span> <span class="token punctuation">{</span>
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"hello world!"</span><span class="token punctuation">)</span>
        <span class="token keyword">case</span> <span class="token operator">&lt;-</span> channel<span class="token punctuation">:</span>
            <span class="token keyword">return</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    channel <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>

    <span class="token keyword">var</span> wg sync<span class="token punctuation">.</span>WaitGroup
    <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
        wg<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token keyword">go</span> <span class="token function">worker</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>wg<span class="token punctuation">,</span> channel<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
    <span class="token function">close</span><span class="token punctuation">(</span>channel<span class="token punctuation">)</span>
    wg<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>当我们使用了 sync.WaitGroup 函数就可以保证当所有协程都完成了 wg.Done 即所有协程都被关闭后 wg.Wait 才会被放行
也就是说当信道被 close 后，会被卡在 wg.Wait，wg.Wait 函数会等到所有协程的 wg.Done 都被执行后(所有协程都被关闭后)才会放行 wg.Wait，这样也就完美解决了使用 select 和 close 当主协程 main 关闭前让所有的协程都安全的退出的问题。</p>
</blockquote>
</div>
<p>很不好解决一个请求衍生了很多协程，这些协程之间是相互关联的：需要共享一些全局变量、有共同的 deadline 等，而且可以同时被关闭。再用 <code v-pre>channel+select</code> 就会比较麻烦，这时就可以通过 context 来实现。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>context 用来解决 goroutine 之间<code v-pre>退出通知</code>、<code v-pre>元数据传递</code>的功能。</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="源码" tabindex="-1"><a class="header-anchor" href="#源码" aria-hidden="true">#</a> 源码</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Context <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token comment">// 当 context 被取消或者到了 deadline，返回一个被关闭的 channel</span>
    <span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">// 在 channel Done 关闭后，返回 context 取消原因</span>
    <span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span>

    <span class="token comment">// 返回 context 是否会被取消以及自动取消时间（即 deadline）</span>
    <span class="token function">Deadline</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>deadline time<span class="token punctuation">.</span>Time<span class="token punctuation">,</span> ok <span class="token builtin">bool</span><span class="token punctuation">)</span>

    <span class="token comment">// 获取 key 对应的 value</span>
    <span class="token function">Value</span><span class="token punctuation">(</span>key <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Context</code> 是一个接口，定义了 4 个方法，它们都是<code v-pre>幂等</code>的。也就是说连续多次调用同一个方法，得到的结果都是相同的。</p>
<ul>
<li><code v-pre>Done()</code> 返回一个 channel，可以表示 context 被取消的信号：当这个 channel 被关闭时，说明 context 被取消了。注意，这是一个只读的channel。 我们又知道，读一个关闭的 channel 会读出相应类型的零值。并且源码里没有地方会向这个 channel 里面塞入值。换句话说，这是一个 <code v-pre>receive-only</code> 的 channel。因此在子协程里读这个 channel，除非被关闭，否则读不出来任何东西。也正是利用了这一点，子协程从 channel 里读出了值（零值）后，就可以做一些收尾工作，尽快退出。</li>
<li><code v-pre>Err()</code> 返回一个错误，表示 channel 被关闭的原因。例如是被取消，还是超时。</li>
<li><code v-pre>Deadline()</code> 返回 context 的截止时间，通过此时间，函数就可以决定是否进行接下来的操作，如果时间太短，就可以不往下做了，否则浪费系统资源。当然，也可以用这个 deadline 来设置一个 I/O 操作的超时时间。</li>
<li><code v-pre>Value()</code> 获取之前设置的 key 对应的 value。</li>
</ul>
<h3 id="context-所有函数、接口和结构体" tabindex="-1"><a class="header-anchor" href="#context-所有函数、接口和结构体" aria-hidden="true">#</a> context 所有函数、接口和结构体</h3>
<p><img src="http://sm.nsddd.top/smv2-6a27526f536505cea08a5813ccce05b2_b.jpg" alt="img"></p>
<h3 id="canceler" tabindex="-1"><a class="header-anchor" href="#canceler" aria-hidden="true">#</a> canceler</h3>
<p>再来看另外一个接口：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> canceler <span class="token keyword">interface</span> <span class="token punctuation">{</span>
    <span class="token function">cancel</span><span class="token punctuation">(</span>removeFromParent <span class="token builtin">bool</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span>
    <span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>实现了上面定义的两个方法的 Context，就表明该 Context 是可取消的。源码中有两个类型实现了 canceler 接口：<code v-pre>*cancelCtx</code> 和 <code v-pre>*timerCtx</code>。注意是加了 <code v-pre>*</code> 号的，是这两个结构体的指针实现了 canceler 接口。</p>
<p>Context 接口设计成这个样子的原因：</p>
<ul>
<li>“<strong>取消</strong>” 操作应该是建议性，而非强制性</li>
</ul>
<p>caller 不应该去关心、干涉 callee 的情况，决定如何以及何时 return 是 callee 的责任。caller 只需发送“取消”信息，callee 根据收到的信息来做进一步的决策，因此接口并没有定义 cancel 方法。</p>
<ul>
<li>“<strong>取消</strong>” 操作应该可传递</li>
</ul>
<p>“取消”某个函数时，和它相关联的其他函数也应该“取消”。因此，<code v-pre>Done()</code> 方法返回一个只读的 channel，所有相关函数监听此 channel。一旦 channel 关闭，通过 channel 的“广播机制”，所有监听者都能收到。</p>
<h2 id="结构体" tabindex="-1"><a class="header-anchor" href="#结构体" aria-hidden="true">#</a> 结构体</h2>
<h3 id="emptyctx" tabindex="-1"><a class="header-anchor" href="#emptyctx" aria-hidden="true">#</a> emptyCtx</h3>
<p>源码中定义了 <code v-pre>Context</code> 接口后，并且给出了一个实现：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> emptyCtx <span class="token builtin">int</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>emptyCtx<span class="token punctuation">)</span> <span class="token function">Deadline</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>deadline time<span class="token punctuation">.</span>Time<span class="token punctuation">,</span> ok <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>emptyCtx<span class="token punctuation">)</span> <span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>emptyCtx<span class="token punctuation">)</span> <span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span><span class="token operator">*</span>emptyCtx<span class="token punctuation">)</span> <span class="token function">Value</span><span class="token punctuation">(</span>key <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看这段源码，非常 happy。因为每个函数都实现的异常简单，要么是直接返回，要么是返回 nil。</p>
<p>所以，这实际上是一个空的 context，永远不会被 cancel，没有存储值，也没有 deadline。</p>
<p><strong>它被包装成：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> <span class="token punctuation">(</span>
    background <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>emptyCtx<span class="token punctuation">)</span>
    todo       <span class="token operator">=</span> <span class="token function">new</span><span class="token punctuation">(</span>emptyCtx<span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过下面两个导出的函数（首字母大写）对外公开：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Context <span class="token punctuation">{</span>
    <span class="token keyword">return</span> background
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">TODO</span><span class="token punctuation">(</span><span class="token punctuation">)</span> Context <span class="token punctuation">{</span>
    <span class="token keyword">return</span> todo
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>background 通常用在 main 函数中，作为所有 context 的根节点。</p>
<p>todo 通常用在并不知道传递什么 context的情形。例如，调用一个需要传递 context 参数的函数，你手头并没有其他 context 可以传递，这时就可以传递 todo。这常常发生在重构进行中，给一些函数添加了一个 Context 参数，但不知道要传什么，就用 todo “占个位子”，最终要换成其他 context。</p>
<h3 id="cancelctx" tabindex="-1"><a class="header-anchor" href="#cancelctx" aria-hidden="true">#</a> cancelCtx</h3>
<p>再来看一个重要的 context：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> cancelCtx <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Context

    <span class="token comment">// 保护之后的字段</span>
    mu       sync<span class="token punctuation">.</span>Mutex
    done     <span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    children <span class="token keyword">map</span><span class="token punctuation">[</span>canceler<span class="token punctuation">]</span><span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
    err      <span class="token builtin">error</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是个可以取消的 Context，实现了 canceler 接口。它直接将接口 Context 作为它的一个匿名字段，这样，它就可以被看成一个 Context。</p>
<p>先来看 <code v-pre>Done()</code> 方法的实现：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>cancelCtx<span class="token punctuation">)</span> <span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token punctuation">{</span>
    c<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> c<span class="token punctuation">.</span>done <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        c<span class="token punctuation">.</span>done <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    d <span class="token operator">:=</span> c<span class="token punctuation">.</span>done
    c<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> d
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>c.done 是“懒汉式”创建，只有调用了 Done() 方法的时候才会被创建。再次说明，函数返回的是一个只读的 channel，而且没有地方向这个 channel 里面写数据。所以，直接调用读这个 channel，协程会被 block 住。一般通过搭配 select 来使用。一旦关闭，就会立即读出零值。</p>
<p><code v-pre>Err()</code> 和 <code v-pre>String()</code> 方法比较简单，不多说。推荐看源码，非常简单。</p>
<p>接下来，我们重点关注 <code v-pre>cancel()</code> 方法的实现：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>cancelCtx<span class="token punctuation">)</span> <span class="token function">cancel</span><span class="token punctuation">(</span>removeFromParent <span class="token builtin">bool</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 必须要传 err</span>
    <span class="token keyword">if</span> err <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"context: internal error: missing cancel error"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    c<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> c<span class="token punctuation">.</span>err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        c<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span> <span class="token comment">// 已经被其他协程取消</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 给 err 字段赋值</span>
    c<span class="token punctuation">.</span>err <span class="token operator">=</span> err
    <span class="token comment">// 关闭 channel，通知其他协程</span>
    <span class="token keyword">if</span> c<span class="token punctuation">.</span>done <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        c<span class="token punctuation">.</span>done <span class="token operator">=</span> closedchan
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">close</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>done<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 遍历它的所有子节点</span>
    <span class="token keyword">for</span> child <span class="token operator">:=</span> <span class="token keyword">range</span> c<span class="token punctuation">.</span>children <span class="token punctuation">{</span>
        <span class="token comment">// 递归地取消所有子节点</span>
        child<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 将子节点置空</span>
    c<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token boolean">nil</span>
    c<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> removeFromParent <span class="token punctuation">{</span>
        <span class="token comment">// 从父节点中移除自己 </span>
        <span class="token function">removeChild</span><span class="token punctuation">(</span>c<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> c<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>总体来看，<code v-pre>cancel()</code> 方法的功能就是关闭 channel：c.done；递归地取消它的所有子节点；从父节点从删除自己。达到的效果是通过关闭 channel，将取消信号传递给了它的所有子节点。goroutine 接收到取消信号的方式就是 select 语句中的<code v-pre>读 c.done</code> 被选中。</p>
<p>我们再来看创建一个可取消的 Context 的方法：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">WithCancel</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">)</span> <span class="token punctuation">(</span>ctx Context<span class="token punctuation">,</span> cancel CancelFunc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    c <span class="token operator">:=</span> <span class="token function">newCancelCtx</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span>
    <span class="token function">propagateCancel</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> <span class="token operator">&amp;</span>c<span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token operator">&amp;</span>c<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> c<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> Canceled<span class="token punctuation">)</span> <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">newCancelCtx</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">)</span> cancelCtx <span class="token punctuation">{</span>
    <span class="token keyword">return</span> cancelCtx<span class="token punctuation">{</span>Context<span class="token punctuation">:</span> parent<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个暴露给用户的方法，传入一个父 Context（这通常是一个 <code v-pre>background</code>，作为根节点），返回新建的 context，新 context 的 done channel 是新建的（前文讲过）。</p>
<p>当 WithCancel 函数返回的 CancelFunc 被调用或者是父节点的 done channel 被关闭（父节点的 CancelFunc 被调用），此 context（子节点） 的 done channel 也会被关闭。</p>
<p>注意传给 WithCancel 方法的参数，前者是 true，也就是说取消的时候，需要将自己从父节点里删除。第二个参数则是一个固定的取消错误类型：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">var</span> Canceled <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"context canceled"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>还注意到一点，调用子节点 cancel 方法的时候，传入的第一个参数 <code v-pre>removeFromParent</code> 是 false。</p>
<p><strong>两个问题需要回答：</strong></p>
<ol>
<li>什么时候会传 true？</li>
<li>为什么有时传 true，有时传 false？</li>
</ol>
<p>当 <code v-pre>removeFromParent</code> 为 true 时，会将当前节点的 context 从父节点 context 中删除：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">removeChild</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> child canceler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    p<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token function">parentCancelCtx</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span>
    <span class="token keyword">if</span> <span class="token operator">!</span>ok <span class="token punctuation">{</span>
        <span class="token keyword">return</span>
    <span class="token punctuation">}</span>
    p<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> p<span class="token punctuation">.</span>children <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token function">delete</span><span class="token punctuation">(</span>p<span class="token punctuation">.</span>children<span class="token punctuation">,</span> child<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    p<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最关键的一行：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>delete(p.children, child)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>什么时候会传 true 呢？答案是调用 <code v-pre>WithCancel()</code> 方法的时候，也就是新创建一个可取消的 context 节点时，返回的 cancelFunc 函数会传入 true。这样做的结果是：当调用返回的 cancelFunc 时，会将这个 context 从它的父节点里“除名”，因为父节点可能有很多子节点，你自己取消了，所以我要和你断绝关系，对其他人没影响。</p>
<p>在取消函数内部，我知道，我所有的子节点都会因为我的一：<code v-pre>c.children = nil</code> 而化为灰烬。我自然就没有必要再多做这一步，最后我所有的子节点都会和我断绝关系，没必要一个个做。另外，如果遍历子节点的时候，调用 child.cancel 函数传了 true，还会造成同时遍历和删除一个 map 的境地，会有问题的。</p>
<p><img src="https://pic4.zhimg.com/v2-f7ea0b0baec68b718a514419636e875b_b.jpg" alt="img"></p>
<p>如上左图，代表一棵 <code v-pre>context</code> 树。当调用左图中标红 context 的 cancel 方法后，该 context 从它的父 context 中去除掉了：实线箭头变成了虚线。且虚线圈框出来的 context 都被取消了，圈内的 context 间的父子关系都荡然无存了。</p>
<p>重点看 <code v-pre>propagateCancel()</code>：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">propagateCancel</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">,</span> child canceler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 父节点是个空节点</span>
    <span class="token keyword">if</span> parent<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token comment">// parent is never canceled</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 找到可以取消的父 context</span>
    <span class="token keyword">if</span> p<span class="token punctuation">,</span> ok <span class="token operator">:=</span> <span class="token function">parentCancelCtx</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token punctuation">{</span>
        p<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">if</span> p<span class="token punctuation">.</span>err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
            <span class="token comment">// 父节点已经被取消了，本节点（子节点）也要取消</span>
            child<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> p<span class="token punctuation">.</span>err<span class="token punctuation">)</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// 父节点未取消</span>
            <span class="token keyword">if</span> p<span class="token punctuation">.</span>children <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
                p<span class="token punctuation">.</span>children <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">map</span><span class="token punctuation">[</span>canceler<span class="token punctuation">]</span><span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// "挂到"父节点上</span>
            p<span class="token punctuation">.</span>children<span class="token punctuation">[</span>child<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">struct</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        p<span class="token punctuation">.</span>mu<span class="token punctuation">.</span><span class="token function">Unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果没有找到可取消的父 context。新启动一个协程监控父节点或子节点取消信号</span>
        <span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">select</span> <span class="token punctuation">{</span>
            <span class="token keyword">case</span> <span class="token operator">&lt;-</span>parent<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                child<span class="token punctuation">.</span><span class="token function">cancel</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> parent<span class="token punctuation">.</span><span class="token function">Err</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token keyword">case</span> <span class="token operator">&lt;-</span>child<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个方法的作用就是向上寻找可以“挂靠”的“可取消”的 context，并且“挂靠”上去。这样，调用上层 cancel 方法的时候，就可以层层传递，将那些挂靠的子 context 同时“取消”。</p>
<p>这里着重解释下为什么会有 else 描述的情况发生。<code v-pre>else</code> 是指当前节点 context 没有向上找到可以取消的父节点，那么就要再启动一个协程监控父节点或者子节点的取消动作。</p>
<p>这里就有疑问了，既然没找到可以取消的父节点，那 <code v-pre>case &lt;-parent.Done()</code> 这个 case 就永远不会发生，所以可以忽略这个 case；而 <code v-pre>case &lt;-child.Done()</code> 这个 case 又啥事不干。那这个 <code v-pre>else</code> 不就多余了吗？</p>
<p>其实不然。我们来看 <code v-pre>parentCancelCtx</code> 的代码：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">parentCancelCtx</span><span class="token punctuation">(</span>parent Context<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>cancelCtx<span class="token punctuation">,</span> <span class="token builtin">bool</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">for</span> <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> c <span class="token operator">:=</span> parent<span class="token punctuation">.</span><span class="token punctuation">(</span><span class="token keyword">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token operator">*</span>cancelCtx<span class="token punctuation">:</span>
            <span class="token keyword">return</span> c<span class="token punctuation">,</span> <span class="token boolean">true</span>
        <span class="token keyword">case</span> <span class="token operator">*</span>timerCtx<span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token operator">&amp;</span>c<span class="token punctuation">.</span>cancelCtx<span class="token punctuation">,</span> <span class="token boolean">true</span>
        <span class="token keyword">case</span> <span class="token operator">*</span>valueCtx<span class="token punctuation">:</span>
            parent <span class="token operator">=</span> c<span class="token punctuation">.</span>Context
        <span class="token keyword">default</span><span class="token punctuation">:</span>
            <span class="token keyword">return</span> <span class="token boolean">nil</span><span class="token punctuation">,</span> <span class="token boolean">false</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里只会识别三种 Context 类型：*cancelCtx，*timerCtx，*valueCtx。若是把 Context 内嵌到一个类型里，就识别不出来了。</p>
<p>由于 context 包的代码并不多，所以我直接把它 copy 出来了，然后在 else 语句里加上了几条打印语句，来验证上面的说法：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> MyContext <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里的 Context 是我 copy 出来的，所以前面不用加 context.</span>
    Context
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    childCancel <span class="token operator">:=</span> <span class="token boolean">true</span>

    parentCtx<span class="token punctuation">,</span> parentFunc <span class="token operator">:=</span> <span class="token function">WithCancel</span><span class="token punctuation">(</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    mctx <span class="token operator">:=</span> MyContext<span class="token punctuation">{</span>parentCtx<span class="token punctuation">}</span>

    childCtx<span class="token punctuation">,</span> childFun <span class="token operator">:=</span> <span class="token function">WithCancel</span><span class="token punctuation">(</span>mctx<span class="token punctuation">)</span>

    <span class="token keyword">if</span> childCancel <span class="token punctuation">{</span>
        <span class="token function">childFun</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">parentFunc</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>parentCtx<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>mctx<span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>childCtx<span class="token punctuation">)</span>

    <span class="token comment">// 防止主协程退出太快，子协程来不及打印 </span>
    time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">10</span> <span class="token operator">*</span> time<span class="token punctuation">.</span>Second<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我自已在 else 里添加的打印语句我就不贴出来了，感兴趣的可以自己动手实验下。我们看下三个 context 的打印结果：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>context.Background.WithCancel
{context.Background.WithCancel}
{context.Background.WithCancel}.WithCancel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>果然，mctx，childCtx 和正常的 parentCtx 不一样，因为它是一个自定义的结构体类型。</p>
<p><code v-pre>else</code> 这段代码说明，如果把 ctx 强行塞进一个结构体，并用它作为父节点，调用 WithCancel 函数构建子节点 context 的时候，Go 会新启动一个协程来监控取消信号，明显有点浪费嘛。</p>
<p>再来说一下，select 语句里的两个 case 其实都不能删。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>select {
    case &lt;-parent.Done():
        child.cancel(false, parent.Err())
    case &lt;-child.Done():
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>第一个 case 说明当父节点取消，则取消子节点。如果去掉这个 case，那么父节点取消的信号就不能传递到子节点。</p>
<p>第二个 case 是说如果子节点自己取消了，那就退出这个 select，父节点的取消信号就不用管了。如果去掉这个 case，那么很可能父节点一直不取消，这个 goroutine 就泄漏了。当然，如果父节点取消了，就会重复让子节点取消，不过，这也没什么影响嘛。</p>
<h3 id="timerctx" tabindex="-1"><a class="header-anchor" href="#timerctx" aria-hidden="true">#</a> timerCtx</h3>
<p>timerCtx 基于 cancelCtx，只是多了一个 time.Timer 和一个 deadline。Timer 会在 deadline 到来时，自动取消 context。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>type timerCtx struct {
    cancelCtx
    timer *time.Timer // Under cancelCtx.mu.

    deadline time.Time
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>timerCtx 首先是一个 cancelCtx，所以它能取消。看下 cancel() 方法：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (c *timerCtx) cancel(removeFromParent bool, err error) {
    // 直接调用 cancelCtx 的取消方法
    c.cancelCtx.cancel(false, err)
    if removeFromParent {
        // 从父节点中删除子节点
        removeChild(c.cancelCtx.Context, c)
    }
    c.mu.Lock()
    if c.timer != nil {
        // 关掉定时器，这样，在deadline 到来时，不会再次取消
        c.timer.Stop()
        c.timer = nil
    }
    c.mu.Unlock()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建 timerCtx 的方法：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc) {
    return WithDeadline(parent, time.Now().Add(timeout))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>WithTimeout</code> 函数直接调用了 <code v-pre>WithDeadline</code>，传入的 deadline 是当前时间加上 timeout 的时间，也就是从现在开始再经过 timeout 时间就算超时。也就是说，<code v-pre>WithDeadline</code> 需要用的是绝对时间。重点来看它：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func WithDeadline(parent Context, deadline time.Time) (Context, CancelFunc) {
    if cur, ok := parent.Deadline(); ok &amp;&amp; cur.Before(deadline) {
        // 如果父节点 context 的 deadline 早于指定时间。直接构建一个可取消的 context。
        // 原因是一旦父节点超时，自动调用 cancel 函数，子节点也会随之取消。
        // 所以不用单独处理子节点的计时器时间到了之后，自动调用 cancel 函数
        return WithCancel(parent)
    }

    // 构建 timerCtx
    c := &amp;timerCtx{
        cancelCtx: newCancelCtx(parent),
        deadline:  deadline,
    }
    // 挂靠到父节点上
    propagateCancel(parent, c)

    // 计算当前距离 deadline 的时间
    d := time.Until(deadline)
    if d &lt;= 0 {
        // 直接取消
        c.cancel(true, DeadlineExceeded) // deadline has already passed
        return c, func() { c.cancel(true, Canceled) }
    }
    c.mu.Lock()
    defer c.mu.Unlock()
    if c.err == nil {
        // d 时间后，timer 会自动调用 cancel 函数。自动取消
        c.timer = time.AfterFunc(d, func() {
            c.cancel(true, DeadlineExceeded)
        })
    }
    return c, func() { c.cancel(true, Canceled) }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说仍然要把子节点挂靠到父节点，一旦父节点取消了，会把取消信号向下传递到子节点，子节点随之取消。</p>
<p>有一个特殊情况是，如果要创建的这个子节点的 deadline 比父节点要晚，也就是说如果父节点是时间到自动取消，那么一定会取消这个子节点，导致子节点的 deadline 根本不起作用，因为子节点在 deadline 到来之前就已经被父节点取消了。</p>
<p>这个函数的最核心的一句是：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>c.timer = time.AfterFunc(d, func() {
    c.cancel(true, DeadlineExceeded)
})
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>c.timer 会在 d 时间间隔后，自动调用 cancel 函数，并且传入的错误就是 <code v-pre>DeadlineExceeded</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>var DeadlineExceeded error = deadlineExceededError{}

type deadlineExceededError struct{}

func (deadlineExceededError) Error() string   { return "context deadline exceeded" }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是超时错误。</p>
<h3 id="valuectx" tabindex="-1"><a class="header-anchor" href="#valuectx" aria-hidden="true">#</a> valueCtx</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>type valueCtx struct {
    Context
    key, val interface{}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它实现了两个方法：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (c *valueCtx) String() string {
    return fmt.Sprintf("%v.WithValue(%#v, %#v)", c.Context, c.key, c.val)
}

func (c *valueCtx) Value(key interface{}) interface{} {
    if c.key == key {
        return c.val
    }
    return c.Context.Value(key)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由于它直接将 Context 作为匿名字段，因此仅管它只实现了 2 个方法，其他方法继承自父 context。但它仍然是一个 Context，这是 Go 语言的一个特点。</p>
<p>创建 valueCtx 的函数：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func WithValue(parent Context, key, val interface{}) Context {
    if key == nil {
        panic("nil key")
    }
    if !reflect.TypeOf(key).Comparable() {
        panic("key is not comparable")
    }
    return &amp;valueCtx{parent, key, val}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>对 key 的要求是可比较，因为之后需要通过 key 取出 context 中的值，可比较是必须的。</p>
<p>通过层层传递 context，最终形成这样一棵树：</p>
<p><img src="https://pic1.zhimg.com/v2-b0dbe9549219fca2c96f1699fb61fbc0_b.jpg" alt="img"></p>
<p>和链表有点像，只是它的方向相反：Context 指向它的父节点，链表则指向下一个节点。通过 WithValue 函数，可以创建层层的 valueCtx，存储 goroutine 间可以共享的变量。</p>
<p>取值的过程，实际上是一个递归查找的过程：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func (c *valueCtx) Value(key interface{}) interface{} {
    if c.key == key {
        return c.val
    }
    return c.Context.Value(key)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>它会顺着链路一直往上找，比较当前节点的 key 是否是要找的 key，如果是，则直接返回 value。否则，一直顺着 context 往前，最终找到根节点（一般是 emptyCtx），直接返回一个 nil。所以用 Value 方法的时候要判断结果是否为 nil。</p>
<p>因为查找方向是往上走的，所以，父节点没法获取子节点存储的值，子节点却可以获取父节点的值。</p>
<p><code v-pre>WithValue</code> 创建 context 节点的过程实际上就是创建链表节点的过程。两个节点的 key 值是可以相等的，但它们是两个不同的 context 节点。查找的时候，会向上查找到最后一个挂载的 context 节点，也就是离得比较近的一个父节点 context。所以，整体上而言，用 <code v-pre>WithValue</code> 构造的其实是一个低效率的链表。</p>
<p>如果你接手过项目，肯定经历过这样的窘境：在一个处理过程中，有若干子函数、子协程。各种不同的地方会向 context 里塞入各种不同的 k-v 对，最后在某个地方使用。</p>
<p>你根本就不知道什么时候什么地方传了什么值？这些值会不会被“覆盖”（底层是两个不同的 context 节点，查找的时候，只会返回一个结果）？你肯定会崩溃的。</p>
<p>而这也是 <code v-pre>context.Value</code> 最受争议的地方。很多人建议尽量不要通过 context 传值。</p>
<h2 id="如何使用-context" tabindex="-1"><a class="header-anchor" href="#如何使用-context" aria-hidden="true">#</a> 如何使用 context</h2>
<p>context 使用起来非常方便。源码里对外提供了一个创建根节点 context 的函数：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func Background() Context
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>background 是一个空的 context， 它不能被取消，没有值，也没有超时时间。</p>
<p>有了根节点 context，又提供了四个函数创建子节点 context：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func WithCancel(parent Context) (ctx Context, cancel CancelFunc)
func WithDeadline(parent Context, deadline time.Time) (Context, CancelFunc)
func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)
func WithValue(parent Context, key, val interface{}) Context
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>context 会在函数传递间传递。只需要在适当的时间调用 cancel 函数向 goroutines 发出取消信号或者调用 Value 函数取出 context 中的值。</p>
<p>在官方博客里，对于使用 context 提出了几点建议：</p>
<ol>
<li>Do not store Contexts inside a struct type; instead, pass a Context explicitly to each function that needs it. The Context should be the first parameter, typically named ctx.</li>
<li>Do not pass a nil Context, even if a function permits it. Pass context.TODO if you are unsure about which Context to use.</li>
<li>Use context Values only for request-scoped data that transits processes and APIs, not for passing optional parameters to functions.</li>
<li>The same Context may be passed to functions running in different goroutines; Contexts are safe for simultaneous use by multiple goroutines.</li>
</ol>
<p>我翻译一下：</p>
<ol>
<li>不要将 Context 塞到结构体里。直接将 Context 类型作为函数的第一参数，而且一般都命名为 ctx。</li>
<li>不要向函数传入一个 nil 的 context，如果你实在不知道传什么，标准库给你准备好了一个 context：todo。</li>
<li>不要把本应该作为函数参数的类型塞到 context 中，context 存储的应该是一些共同的数据。例如：登陆的 session、cookie 等。</li>
<li>同一个 context 可能会被传递到多个 goroutine，别担心，context 是并发安全的。</li>
</ol>
<h2 id="传递共享的数据" tabindex="-1"><a class="header-anchor" href="#传递共享的数据" aria-hidden="true">#</a> 传递共享的数据</h2>
<p>对于 Web 服务端开发，往往希望将一个请求处理的整个过程串起来，这就非常依赖于 Thread Local（对于 Go 可理解为单个协程所独有） 的变量，而在 Go 语言中并没有这个概念，因此需要在函数调用的时候传递 context。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>package main

import (
    "context"
    "fmt"
)

func main() {
    ctx := context.Background()
    process(ctx)

    ctx = context.WithValue(ctx, "traceId", "qcrao-2019")
    process(ctx)
}

func process(ctx context.Context) {
    traceId, ok := ctx.Value("traceId").(string)
    if ok {
        fmt.Printf("process over. trace_id=%s\n", traceId)
    } else {
        fmt.Printf("process over. no trace_id\n")
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>process over. no trace_id
process over. trace_id=qcrao-2019
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>第一次调用 process 函数时，ctx 是一个空的 context，自然取不出来 traceId。第二次，通过 <code v-pre>WithValue</code> 函数创建了一个 context，并赋上了 <code v-pre>traceId</code> 这个 key，自然就能取出来传入的 value 值。</p>
<p>当然，现实场景中可能是从一个 HTTP 请求中获取到的 Request-ID。所以，下面这个样例可能更适合：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>const requestIDKey int = 0

func WithRequestID(next http.Handler) http.Handler {
    return http.HandlerFunc(
        func(rw http.ResponseWriter, req *http.Request) {
            // 从 header 中提取 request-id
            reqID := req.Header.Get("X-Request-ID")
            // 创建 valueCtx。使用自定义的类型，不容易冲突
            ctx := context.WithValue(
                req.Context(), requestIDKey, reqID)

            // 创建新的请求
            req = req.WithContext(ctx)

            // 调用 HTTP 处理函数
            next.ServeHTTP(rw, req)
        }
    )
}

// 获取 request-id
func GetRequestID(ctx context.Context) string {
    ctx.Value(requestIDKey).(string)
}

func Handle(rw http.ResponseWriter, req *http.Request) {
    // 拿到 reqId，后面可以记录日志等等
    reqID := GetRequestID(req.Context())
    ...
}

func main() {
    handler := WithRequestID(http.HandlerFunc(Handle))
    http.ListenAndServe("/", handler)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="取消-goroutine" tabindex="-1"><a class="header-anchor" href="#取消-goroutine" aria-hidden="true">#</a> 取消 goroutine</h2>
<p>我们先来设想一个场景：打开外卖的订单页，地图上显示外卖小哥的位置，而且是每秒更新 1 次。app 端向后台发起 websocket 连接（现实中可能是轮询）请求后，后台启动一个协程，每隔 1 秒计算 1 次小哥的位置，并发送给端。如果用户退出此页面，则后台需要“取消”此过程，退出 goroutine，系统回收资源。</p>
<p>后端可能的实现如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func Perform() {
    for {
        calculatePos()
        sendResult()
        time.Sleep(time.Second)
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果需要实现“取消”功能，并且在不了解 context 功能的前提下，可能会这样做：给函数增加一个指针型的 bool 变量，在 for 语句的开始处判断 bool 变量是发由 true 变为 false，如果改变，则退出循环。</p>
<p>上面给出的简单做法，可以实现想要的效果，没有问题，但是并不优雅，并且一旦协程数量多了之后，并且各种嵌套，就会很麻烦。优雅的做法，自然就要用到 context。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func Perform(ctx context.Context) {
    for {
        calculatePos()
        sendResult()

        select {
        case &lt;-ctx.Done():
            // 被取消，直接返回
            return
        case &lt;-time.After(time.Second):
            // block 1 秒钟 
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主流程可能是这样的：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ctx, cancel := context.WithTimeout(context.Background(), time.Hour)
go Perform(ctx)

// ……
// app 端返回页面，调用cancel 函数
cancel()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意一个细节，WithTimeOut 函数返回的 context 和 cancelFun 是分开的。context 本身并没有取消函数，这样做的原因是取消函数只能由外层函数调用，防止子节点 context 调用取消函数，从而严格控制信息的流向：由父节点 context 流向子节点 context。</p>
<h2 id="防止-goroutine-泄漏" tabindex="-1"><a class="header-anchor" href="#防止-goroutine-泄漏" aria-hidden="true">#</a> 防止 goroutine 泄漏</h2>
<p>前面那个例子里，goroutine 还是会自己执行完，最后返回，只不过会多浪费一些系统资源。这里改编一个“如果不用 context 取消，goroutine 就会泄漏的例子”，来自参考资料：<code v-pre>【避免协程泄漏】</code>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func gen() &lt;-chan int {
    ch := make(chan int)
    go func() {
        var n int
        for {
            ch &lt;- n
            n++
            time.Sleep(time.Second)
        }
    }()
    return ch
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个可以生成无限整数的协程，但如果我只需要它产生的前 5 个数，那么就会发生 goroutine 泄漏：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func main() {
    for n := range gen() {
        fmt.Println(n)
        if n == 5 {
            break
        }
    }
    // ……
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 n == 5 的时候，直接 break 掉。那么 gen 函数的协程就会执行无限循环，永远不会停下来。发生了 goroutine 泄漏。</p>
<p>用 context 改进这个例子：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>func gen(ctx context.Context) &lt;-chan int {
    ch := make(chan int)
    go func() {
        var n int
        for {
            select {
            case &lt;-ctx.Done():
                return
            case ch &lt;- n:
                n++
                time.Sleep(time.Second)
            }
        }
    }()
    return ch
}

func main() {
    ctx, cancel := context.WithCancel(context.Background())
    defer cancel() // 避免其他地方忘记 cancel，且重复调用不影响

    for n := range gen(ctx) {
        fmt.Println(n)
        if n == 5 {
            cancel()
            break
        }
    }
    // ……
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>增加一个 context，在 break 前调用 cancel 函数，取消 goroutine。gen 函数在接收到取消信号后，直接退出，系统回收资源。</p>
<h2 id="context-真的这么好吗" tabindex="-1"><a class="header-anchor" href="#context-真的这么好吗" aria-hidden="true">#</a> context 真的这么好吗</h2>
<p>读完全文，你一定有这种感觉：context 就是为 server 而设计的。说什么处理一个请求，需要启动多个 goroutine 并行地去处理，并且在这些 goroutine 之间还要传递一些共享的数据等等，这些都是写一个 server 要做的事。</p>
<p>没错，Go 很适合写 server，但它终归是一门通用的语言。你在用 Go 做 Leetcode 上面的题目的时候，肯定不会认为它和一般的语言有什么差别。所以，很多特性好不好，应该从 <code v-pre>Go 只是一门普通的语言，很擅长写 server</code> 的角度来看。</p>
<p>从这个角度来看，context 并没有那么美好。Go 官方建议我们把 Context 作为函数的第一个参数，甚至连名字都准备好了。这造成一个后果：因为我们想控制所有的协程的取消动作，所以需要在几乎所有的函数里加上一个 Context 参数。很快，我们的代码里，context 将像病毒一样扩散的到处都是。</p>
<p>在参考资料<code v-pre>【Go2 应该去掉 context】</code>这篇英文博客里，作者甚至调侃说：如果要把 Go 标准库的大部分函数都加上 context 参数的话，例如下面这样：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>n, err := r.Read(context.TODO(), p)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>就给我来一枪吧！</p>
<p>原文是这样说的：<code v-pre>put a bullet in my head, please.</code>我当时看到这句话的时候，会心一笑。这可能就是陶渊明说的：每有会意，便欣然忘食。当然，我是在晚饭会看到这句话的。</p>
<p>为了表达自己对 context 并没有什么好感，作者接着又说了一句：If you use ctx.Value in my (non-existent) company, you’re fired. 简直太幽默了，哈哈。</p>
<p>另外，像 <code v-pre>WithCancel</code>、<code v-pre>WithDeadline</code>、<code v-pre>WithTimeout</code>、<code v-pre>WithValue</code> 这些创建函数，实际上是创建了一个个的链表结点而已。我们知道，对链表的操作，通常都是 <code v-pre>O(n)</code> 复杂度的，效率不高。</p>
<p>那么，context 包到底解决了什么问题呢？答案是：<code v-pre>cancelation</code>。仅管它并不完美，但它确实很简洁地解决了问题。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>到这里，整个 context 包的内容就全部讲完了。源码非常短，很适合学习，一定要去读一下。</p>
<p>context 包是 Go 1.7 引入的标准库，主要用于在 goroutine 之间传递取消信号、超时时间、截止时间以及一些共享的值等。它并不是太完美，但几乎成了并发控制和超时控制的标准做法。</p>
<p>使用上，先创建一个根节点的 context，之后根据库提供的四个函数创建相应功能的子节点 context。由于它是并发安全的，所以可以放心地传递。</p>
<p>当使用 context 作为函数参数时，直接把它放在第一个参数的位置，并且命名为 ctx。另外，不要把 context 嵌套在自定义的类型里。</p>
<p>最后，大家下次在看到代码里有用到 context 的，观察下是怎么使用的，肯定逃不出我们讲的几种类型。熟悉之后会发现：context 可能并不完美，但它确实简洁高效地解决了问题。</p>
<h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h3>
<p>【zhihu.com】 https://zhuanlan.zhihu.com/p/68792989</p>
<p>【context 官方博客】<a href="https://link.zhihu.com/?target=https%3A//blog.golang.org/context" target="_blank" rel="noopener noreferrer">https://blog.golang.org/context<ExternalLinkIcon/></a></p>
<p>【今日头条构建Go的实践】https://zhuanlan.zhihu.com/p/26695984</p>
<p>【飞雪无情的博客】<a href="https://link.zhihu.com/?target=https%3A//www.flysnow.org/2017/05/12/go-in-action-go-context.html" target="_blank" rel="noopener noreferrer">https://www.flysnow.org/2017/05/12/go-in-action-go-context.html<ExternalLinkIcon/></a></p>
<p>【context 源码】<a href="https://link.zhihu.com/?target=https%3A//juejin.im/post/5a6873fef265da3e317e55b6" target="_blank" rel="noopener noreferrer">https://juejin.im/post/5a6873fef265da3e317e55b6<ExternalLinkIcon/></a></p>
<p>【腾讯云源码阅读】<a href="https://link.zhihu.com/?target=https%3A//cloud.tencent.com/developer/section/1140703" target="_blank" rel="noopener noreferrer">https://cloud.tencent.com/developer/section/1140703<ExternalLinkIcon/></a></p>
<p>【更宏观地一些思考，english】<a href="https://link.zhihu.com/?target=https%3A//siadat.github.io/post/context" target="_blank" rel="noopener noreferrer">https://siadat.github.io/post/context<ExternalLinkIcon/></a></p>
<p>【避免协程泄漏】<a href="https://link.zhihu.com/?target=https%3A//rakyll.org/leakingctx/" target="_blank" rel="noopener noreferrer">https://rakyll.org/leakingctx/<ExternalLinkIcon/></a></p>
<p>【应用分类】<a href="https://link.zhihu.com/?target=https%3A//dreamerjonson.com/2019/05/09/golang-73-context/index.html" target="_blank" rel="noopener noreferrer">https://dreamerjonson.com/2019/05/09/golang-73-context/index.html<ExternalLinkIcon/></a></p>
<p>【官方文档示例翻译版】<a href="https://link.zhihu.com/?target=https%3A//brantou.github.io/2017/05/19/go-concurrency-patterns-context/" target="_blank" rel="noopener noreferrer">https://brantou.github.io/2017/05/19/go-concurrency-patterns-context/<ExternalLinkIcon/></a></p>
<p>【例子，english】<a href="https://link.zhihu.com/?target=http%3A//p.agnihotry.com/post/understanding_the_context_package_in_golang/" target="_blank" rel="noopener noreferrer">http://p.agnihotry.com/post/understanding_the_context_package_in_golang/<ExternalLinkIcon/></a></p>
<p>【Go2 应该去掉 context】<a href="https://link.zhihu.com/?target=https%3A//faiface.github.io/post/context-should-go-away-go2/" target="_blank" rel="noopener noreferrer">https://faiface.github.io/post/context-should-go-away-go2/<ExternalLinkIcon/></a></p>
<p>【源码，比较详细】<a href="https://link.zhihu.com/?target=https%3A//juejin.im/post/5c1514c86fb9a049b82a5acb" target="_blank" rel="noopener noreferrer">https://juejin.im/post/5c1514c86fb9a049b82a5acb<ExternalLinkIcon/></a></p>
<p>【Golang Context 是好的设计吗？】<a href="https://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000017394302" target="_blank" rel="noopener noreferrer">https://segmentfault.com/a/1190000017394302<ExternalLinkIcon/></a></p>
<p>【今日头条的 Go 实践】<a href="https://link.zhihu.com/?target=https%3A//36kr.com/p/5073181" target="_blank" rel="noopener noreferrer">https://36kr.com/p/5073181<ExternalLinkIcon/></a></p>
<p>【实例】<a href="https://zhuanlan.zhihu.com/p/60180409" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/60<ExternalLinkIcon/></a></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
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


