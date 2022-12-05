<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第16节-sealer-code" tabindex="-1"><a class="header-anchor" href="#第16节-sealer-code" aria-hidden="true">#</a> 第16节 sealer code</h1>
<div><a href = '15.md' style='float:left'>⬆️上一节🔗  </a><a href = '17.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="filepath-join" tabindex="-1"><a class="header-anchor" href="#filepath-join" aria-hidden="true">#</a> filepath.Join</h2>
<p>Go语言中的路径包，用于通过正斜杠分隔的路径，例如URL中的路径。 Go语言中的 <code v-pre>filepath.Join()</code> 函数用于将 <strong>任意数量的指定路径元素连接到单个路径中，并在必要时添加分隔符</strong> 。此函数对结果调用 <code v-pre>Clean</code>，所有空字符串都将被忽略。此外，此函数在路径包下定义。在这里，您需要导入<code v-pre>“path/filepath”</code> 包才能使用这些函数。</p>
<p><strong>用法:</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Join</span><span class="token punctuation">(</span>elem <span class="token operator">...</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在此，‘elem’是指定的路径元素。</p>
<p>**返回值：**它返回加入的单路径。</p>
<p><strong>💡简单的一个案例如下：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Golang program to illustrate the usage of </span>
<span class="token comment">// filepath.Join() function </span>
  
<span class="token comment">// Including the main package </span>
<span class="token keyword">package</span> main 
  
<span class="token comment">// Importing fmt and path/filepath </span>
<span class="token keyword">import</span> <span class="token punctuation">(</span> 
    <span class="token string">"fmt"</span>
    <span class="token string">"path/filepath"</span>
<span class="token punctuation">)</span> 
  
<span class="token comment">// Calling main </span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
  
    <span class="token comment">// Calling the Join() function </span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token string">"G"</span><span class="token punctuation">,</span> <span class="token string">"F"</span><span class="token punctuation">,</span> <span class="token string">"G"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token string">"G/F"</span><span class="token punctuation">,</span> <span class="token string">"G"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token string">"gfg"</span><span class="token punctuation">,</span> <span class="token string">"GFG"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span><span class="token string">"Geeks"</span><span class="token punctuation">,</span> <span class="token string">"for"</span><span class="token punctuation">,</span> <span class="token string">"Geeks"</span><span class="token punctuation">)</span><span class="token punctuation">)</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**🚀 编译结果如下： **</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>G/F/G
G/F/G
gfg/GFG
Geeks/for/Geeks
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '15.md' style='float:left'>⬆️上一节🔗  </a><a href = '17.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


