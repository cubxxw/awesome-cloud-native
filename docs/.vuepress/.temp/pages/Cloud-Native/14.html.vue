<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第14节-go-调试-测试-以及调试工具-dlv" tabindex="-1"><a class="header-anchor" href="#第14节-go-调试-测试-以及调试工具-dlv" aria-hidden="true">#</a> 第14节 go 调试 测试 以及调试工具 dlv</h1>
<div><a href = '13.md' style='float:left'>⬆️上一节🔗  </a><a href = '15.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="调试go工程" tabindex="-1"><a class="header-anchor" href="#调试go工程" aria-hidden="true">#</a> 调试Go工程</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>prepare：</p>
<ul>
<li>vscode</li>
<li>golang 1.92</li>
</ul>
</div>
<h3 id="demo" tabindex="-1"><a class="header-anchor" href="#demo" aria-hidden="true">#</a> demo</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>go mod init test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>In <code v-pre>main.go</code> file</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token comment">// Swap functions</span>
<span class="token keyword">func</span> <span class="token function">swap</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token operator">*</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//XOR exchange</span>
	<span class="token operator">*</span>x<span class="token punctuation">,</span> <span class="token operator">*</span>y <span class="token operator">=</span> <span class="token operator">*</span>y<span class="token punctuation">,</span> <span class="token operator">*</span>x
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
	<span class="token comment">//Swap functions</span>
	<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
		a <span class="token operator">:=</span> <span class="token string">"a"</span>
		b <span class="token operator">:=</span> <span class="token string">"b"</span>
		<span class="token function">swap</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>a<span class="token punctuation">,</span> <span class="token operator">&amp;</span>b<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vscode一键生成测试" tabindex="-1"><a class="header-anchor" href="#vscode一键生成测试" aria-hidden="true">#</a> vscode一键生成测试</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token operator">></span>gotest <span class="token keyword">for</span> package/function
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>分别是为包生成测试单元，为函数生成测试单元。</p>
</div>
<p><strong>生成如下：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"testing"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Test_main</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	tests <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span> <span class="token punctuation">{</span>
		name <span class="token builtin">string</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token comment">// TODO: Add test cases.</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span>
		t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Test_swap</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">type</span> args <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		x <span class="token operator">*</span><span class="token builtin">string</span>
		y <span class="token operator">*</span><span class="token builtin">string</span>
	<span class="token punctuation">}</span>
	tests <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span> <span class="token punctuation">{</span>
		name  <span class="token builtin">string</span>
		args  args
		want  <span class="token builtin">string</span>
		want1 <span class="token builtin">string</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token comment">// TODO: Add test cases.</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span>
		t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			got<span class="token punctuation">,</span> got1 <span class="token operator">:=</span> <span class="token function">swap</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>args<span class="token punctuation">.</span>x<span class="token punctuation">,</span> tt<span class="token punctuation">.</span>args<span class="token punctuation">.</span>y<span class="token punctuation">)</span>
			<span class="token keyword">if</span> got <span class="token operator">!=</span> tt<span class="token punctuation">.</span>want <span class="token punctuation">{</span>
				t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"swap() got = %v, want %v"</span><span class="token punctuation">,</span> got<span class="token punctuation">,</span> tt<span class="token punctuation">.</span>want<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">if</span> got1 <span class="token operator">!=</span> tt<span class="token punctuation">.</span>want1 <span class="token punctuation">{</span>
				t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"swap() got1 = %v, want %v"</span><span class="token punctuation">,</span> got1<span class="token punctuation">,</span> tt<span class="token punctuation">.</span>want1<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们在 <code v-pre>TODO: Add test cases.</code> 那边给出测试就好了：</strong></p>
<p>也有快捷键，我们先加入一个 <code v-pre>{}</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>>go:file struct
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>生成：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"testing"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">Test_main</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	tests <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span> <span class="token punctuation">{</span>
		name <span class="token builtin">string</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token comment">// TODO: Add test cases.</span>
		<span class="token punctuation">{</span>
			name<span class="token punctuation">:</span> <span class="token string">"test"</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span>
		t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">Test_swap</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">type</span> args <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		x <span class="token operator">*</span><span class="token builtin">string</span>
		y <span class="token operator">*</span><span class="token builtin">string</span>
	<span class="token punctuation">}</span>
	tests <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token keyword">struct</span> <span class="token punctuation">{</span>
		name  <span class="token builtin">string</span>
		args  args
		want  <span class="token builtin">string</span>
		want1 <span class="token builtin">string</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span>
		<span class="token comment">// TODO: Add test cases.</span>
		<span class="token punctuation">{</span>
		name<span class="token punctuation">:</span> <span class="token string">"afsdfwe"</span><span class="token punctuation">,</span>
		args<span class="token punctuation">:</span> args<span class="token punctuation">{</span>
			x<span class="token punctuation">:</span> <span class="token number">12</span><span class="token punctuation">,</span>
			y<span class="token punctuation">:</span> <span class="token number">214</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		want<span class="token punctuation">:</span>  <span class="token string">"shabi"</span><span class="token punctuation">,</span>
		want1<span class="token punctuation">:</span> <span class="token string">"wangshan "</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">{</span>
		name<span class="token punctuation">:</span> <span class="token string">"23asdfs"</span><span class="token punctuation">,</span>
		args<span class="token punctuation">:</span> args<span class="token punctuation">{</span>
			x<span class="token punctuation">:</span> <span class="token number">1254</span><span class="token punctuation">,</span>
			y<span class="token punctuation">:</span> <span class="token number">421</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		want<span class="token punctuation">:</span>  <span class="token string">"afswedwe"</span><span class="token punctuation">,</span>
		want1<span class="token punctuation">:</span> <span class="token string">"3erasfdsa"</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> tt <span class="token operator">:=</span> <span class="token keyword">range</span> tests <span class="token punctuation">{</span>
		t<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>name<span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>t <span class="token operator">*</span>testing<span class="token punctuation">.</span>T<span class="token punctuation">)</span> <span class="token punctuation">{</span>
			got<span class="token punctuation">,</span> got1 <span class="token operator">:=</span> <span class="token function">swap</span><span class="token punctuation">(</span>tt<span class="token punctuation">.</span>args<span class="token punctuation">.</span>x<span class="token punctuation">,</span> tt<span class="token punctuation">.</span>args<span class="token punctuation">.</span>y<span class="token punctuation">)</span>
			<span class="token keyword">if</span> got <span class="token operator">!=</span> tt<span class="token punctuation">.</span>want <span class="token punctuation">{</span>
				t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"swap() got = %v, want %v"</span><span class="token punctuation">,</span> got<span class="token punctuation">,</span> tt<span class="token punctuation">.</span>want<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
			<span class="token keyword">if</span> got1 <span class="token operator">!=</span> tt<span class="token punctuation">.</span>want1 <span class="token punctuation">{</span>
				t<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"swap() got1 = %v, want %v"</span><span class="token punctuation">,</span> got1<span class="token punctuation">,</span> tt<span class="token punctuation">.</span>want1<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h2>
<p>就像我们上面的测试用例那样，我们回到测试用例，可以直接设计断点调试</p>
<p><strong>选择类型（测试类型）：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>"mode": "test"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>可以是 远程的 <code v-pre>remote</code>，或者选择 <code v-pre>debug</code></p>
</blockquote>
<p><strong>测试的档案所在目录：</strong></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"program"</span><span class="token operator">:</span> <span class="token string">"${file}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Launch test function"</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"go"</span><span class="token punctuation">,</span>
    <span class="token property">"request"</span><span class="token operator">:</span> <span class="token string">"launch"</span><span class="token punctuation">,</span>
    <span class="token property">"mode"</span><span class="token operator">:</span> <span class="token string">"test"</span><span class="token punctuation">,</span>
    <span class="token property">"program"</span><span class="token operator">:</span> <span class="token string">"${workspaceFolder}"</span><span class="token punctuation">,</span>
    <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">"-test.run"</span><span class="token punctuation">,</span>
        <span class="token string">"MyTestFunction"</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h2 id="完整性的测试" tabindex="-1"><a class="header-anchor" href="#完整性的测试" aria-hidden="true">#</a> 完整性的测试</h2>
<p><strong>我们需要设置 program 在某个具体目录下的，比如说：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">{</span>
    <span class="token string">"configurations"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"Launch Package"</span><span class="token punctuation">,</span>
            <span class="token string">"type"</span><span class="token punctuation">:</span> <span class="token string">"go"</span><span class="token punctuation">,</span>
            <span class="token string">"request"</span><span class="token punctuation">:</span> <span class="token string">"launch"</span><span class="token punctuation">,</span>
            <span class="token string">"mode"</span><span class="token punctuation">:</span> <span class="token string">"auto"</span><span class="token punctuation">,</span>
            <span class="token string">"program"</span><span class="token punctuation">:</span> <span class="token string">"${fileDirname}/../main"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token string">"name"</span><span class="token punctuation">:</span> <span class="token string">"Connect to server"</span><span class="token punctuation">,</span>
            <span class="token string">"type"</span><span class="token punctuation">:</span> <span class="token string">"go"</span><span class="token punctuation">,</span>
            <span class="token string">"request"</span><span class="token punctuation">:</span> <span class="token string">"attach"</span><span class="token punctuation">,</span>
            <span class="token string">"mode"</span><span class="token punctuation">:</span> <span class="token string">"remote"</span><span class="token punctuation">,</span>
            <span class="token string">"remotePath"</span><span class="token punctuation">:</span> <span class="token string">"${workspaceFolder}"</span><span class="token punctuation">,</span>
            <span class="token string">"port"</span><span class="token punctuation">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
            <span class="token string">"host"</span><span class="token punctuation">:</span> <span class="token string">"192.168.71.130"</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>指定函数（function）测试：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Swap functions</span>
<span class="token keyword">func</span> <span class="token function">swap</span><span class="token punctuation">(</span>x<span class="token punctuation">,</span> y <span class="token operator">*</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">//XOR exchange</span>
	<span class="token operator">*</span>x<span class="token punctuation">,</span> <span class="token operator">*</span>y <span class="token operator">=</span> <span class="token operator">*</span>y<span class="token punctuation">,</span> <span class="token operator">*</span>x
	<span class="token keyword">return</span> <span class="token operator">*</span>x<span class="token punctuation">,</span> <span class="token operator">*</span>y
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>需要指定 test 参数，来指定具体的测试函数：</strong></p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Launch test function"</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"go"</span><span class="token punctuation">,</span>
    <span class="token property">"request"</span><span class="token operator">:</span> <span class="token string">"launch"</span><span class="token punctuation">,</span>
    <span class="token property">"mode"</span><span class="token operator">:</span> <span class="token string">"test"</span><span class="token punctuation">,</span>
    <span class="token property">"program"</span><span class="token operator">:</span> <span class="token string">"${workspaceFolder}"</span><span class="token punctuation">,</span>
    <span class="token property">"args"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token string">"-test.run"</span><span class="token punctuation">,</span>
        <span class="token string">"MyTestFunction"</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vscode-远程调试" tabindex="-1"><a class="header-anchor" href="#vscode-远程调试" aria-hidden="true">#</a> vscode 远程调试</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>When applied to remote-attach configurations, will look for &quot;dlv ... --headless --listen=:&quot; server started externally. In dlv-dap mode, this will apply to all other configurations as well. The extension will try to connect to an external server started with &quot;dlv dap --listen=:&quot; to ask it to launch/attach to the target process.</p>
</div>
<p><strong>首先我们需要先启动一个 devle server</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>dlv <span class="token parameter variable">--headless</span> debug Test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>我们可以在另外一台终端或者机器上模拟这个调用：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># dlv connect localhost:40609</span>
Type <span class="token string">'help'</span> <span class="token keyword">for</span> list of commands.
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> <span class="token builtin class-name">break</span> main.go:32
Breakpoint <span class="token number">1</span> <span class="token builtin class-name">set</span> at 0x4a05b2 <span class="token keyword">for</span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> /workspces/test/main.go:32
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> <span class="token builtin class-name">continue</span>
<span class="token operator">></span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> /workspces/test/main.go:32 <span class="token punctuation">(</span>hits goroutine<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>:1 total:1<span class="token punctuation">)</span> <span class="token punctuation">(</span>PC: 0x4a05b2<span class="token punctuation">)</span>
    <span class="token number">27</span>:         gid, _ :<span class="token operator">=</span> strconv.ParseInt<span class="token punctuation">(</span>idField, <span class="token number">10</span>, <span class="token number">64</span><span class="token punctuation">)</span>
    <span class="token number">28</span>:         <span class="token builtin class-name">return</span> gid
    <span class="token number">29</span>: <span class="token punctuation">}</span>
    <span class="token number">30</span>:
    <span class="token number">31</span>: func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token operator">=</span><span class="token operator">></span>  <span class="token number">32</span>:         debug<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token number">33</span>: <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建 <code v-pre>.vscode</code> 文件夹（mod rootfs目录），并在下面创建：</strong></p>
<ul>
<li>
<p>创建<code v-pre>settings.json</code></p>
</li>
<li>
<p>创建 <code v-pre>launch.json</code> 写入</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">//Use IntelliSense to learn about related properties.</span>
    <span class="token comment">//Hover to see a description of an existing property.</span>
    <span class="token comment">//For more information, please visit: https://go.microsoft.com/fwlink/?linkid=830387</span>
    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"0.2.0"</span><span class="token punctuation">,</span>
    <span class="token property">"configurations"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Connect to server"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"go"</span><span class="token punctuation">,</span>
            <span class="token property">"request"</span><span class="token operator">:</span> <span class="token string">"attach"</span><span class="token punctuation">,</span>
            <span class="token property">"mode"</span><span class="token operator">:</span> <span class="token string">"remote"</span><span class="token punctuation">,</span>
            <span class="token property">"remotePath"</span><span class="token operator">:</span> <span class="token string">"/workspace/sealer"</span><span class="token punctuation">,</span>
            <span class="token property">"port"</span><span class="token operator">:</span> <span class="token number">22</span><span class="token punctuation">,</span>
            <span class="token property">"host"</span><span class="token operator">:</span> <span class="token string">"192.168.71.130"</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Launch file"</span><span class="token punctuation">,</span>
            <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"go"</span><span class="token punctuation">,</span>
            <span class="token property">"request"</span><span class="token operator">:</span> <span class="token string">"launch"</span><span class="token punctuation">,</span>
            <span class="token property">"mode"</span><span class="token operator">:</span> <span class="token string">"debug"</span><span class="token punctuation">,</span>
            <span class="token property">"program"</span><span class="token operator">:</span> <span class="token string">"${file}"</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>方便起见可以直接在调试窗口一键创建</p>
</div>
<h2 id="dlv-vscode-go开发环境搭建" tabindex="-1"><a class="header-anchor" href="#dlv-vscode-go开发环境搭建" aria-hidden="true">#</a> dlv + VSCode + Go开发环境搭建</h2>
<div class="custom-container tip"><p class="custom-container-title">需要的问题</p>
<p>项目需要 gcc/c++ 环境，或者是大型的项目需要构建（sealos、sealer、kubernets、<a href="https://github.com/prometheus/prometheus" target="_blank" rel="noopener noreferrer">prometheus<ExternalLinkIcon/></a> ）</p>
<p>**我需要： ** 使用<code v-pre>vscode</code>编辑器编写<code v-pre>go</code>，然后进行编译、调试（打断点）。</p>
</div>
<p>dlv 是一个简称， 实际上，<a href="https://github.com/go-delve/delve" target="_blank" rel="noopener noreferrer">delve<ExternalLinkIcon/></a> 才是全称，dlv 只是启动命令，如果使用 VScode，默认使用的调试器就是基于 delve 的。</p>
<h3 id="常用指令" tabindex="-1"><a class="header-anchor" href="#常用指令" aria-hidden="true">#</a> 常用指令</h3>
<table>
<thead>
<tr>
<th>指令</th>
<th>用处</th>
<th>实操</th>
</tr>
</thead>
<tbody>
<tr>
<td>attach</td>
<td>这个命令将使Delve控制一个已经运行的进程，并开始一个新的调试会话。 当退出调试会话时，你可以选择让该进程继续运行或杀死它。</td>
<td>case1</td>
</tr>
<tr>
<td>exec</td>
<td>这个命令将使Delve执行二进制文件，并立即附加到它，开始一个新的调试会话。请注意，如果二进制文件在编译时没有关闭优化功能，可能很难正确地调试它。请考虑在Go 1.10或更高版本上用-gcflags=&quot;all=-N -l &quot;编译调试二进制文件，在Go的早期版本上用-gcflags=&quot;-N -l&quot;。</td>
<td>case2</td>
</tr>
<tr>
<td>help</td>
<td>使用手册</td>
<td>case3</td>
</tr>
<tr>
<td>debug</td>
<td>默认情况下，没有参数，Delve将编译当前目录下的 &quot;main &quot;包，并开始调试。或者，你可以指定一个包的名字，Delve将编译该包，并开始一个新的调试会话。</td>
<td>case4</td>
</tr>
<tr>
<td>test</td>
<td>test命令允许你在单元测试的背景下开始一个新的调试会话。默认情况下，Delve将调试当前目录下的测试。另外，你可以指定一个包的名称，Delve将在该包中调试测试。双破折号<code v-pre>--</code>可以用来传递参数给测试程序。</td>
<td>case5</td>
</tr>
<tr>
<td>version</td>
<td>查看dlv版本</td>
<td>case6</td>
</tr>
</tbody>
</table>
<h3 id="goroutine" tabindex="-1"><a class="header-anchor" href="#goroutine" aria-hidden="true">#</a> goroutine</h3>
<p><strong>dlv 特别支持 goroutine</strong></p>
<ul>
<li>goroutine</li>
<li>gorouties</li>
<li>thread</li>
<li>threads</li>
</ul>
<h2 id="dlv调试指令" tabindex="-1"><a class="header-anchor" href="#dlv调试指令" aria-hidden="true">#</a> dlv调试指令</h2>
<h3 id="断点管理" tabindex="-1"><a class="header-anchor" href="#断点管理" aria-hidden="true">#</a> 断点管理</h3>
<table>
<thead>
<tr>
<th>指令</th>
<th>缩写</th>
<th>用法</th>
<th>案例</th>
</tr>
</thead>
<tbody>
<tr>
<td>break</td>
<td>b</td>
<td>设置断点</td>
<td>case7</td>
</tr>
<tr>
<td>breakpoints</td>
<td>bp</td>
<td>查看当前所有断点</td>
<td>case8</td>
</tr>
<tr>
<td>clear</td>
<td>/</td>
<td>删除断点</td>
<td>case9</td>
</tr>
<tr>
<td>clearall</td>
<td>/</td>
<td>删除多个断点</td>
<td>case10</td>
</tr>
<tr>
<td>toggle</td>
<td>/</td>
<td>启用或关闭断点</td>
<td>case11</td>
</tr>
</tbody>
</table>
<h3 id="程序执行中的调试指令" tabindex="-1"><a class="header-anchor" href="#程序执行中的调试指令" aria-hidden="true">#</a> 程序执行中的调试指令</h3>
<table>
<thead>
<tr>
<th>指令</th>
<th>缩写</th>
<th>用法</th>
<th>案例</th>
</tr>
</thead>
<tbody>
<tr>
<td>continue</td>
<td>c</td>
<td>继续执行到一个断点或者程序结束吗</td>
<td>case12</td>
</tr>
<tr>
<td>next</td>
<td>n</td>
<td>执行下一行代码</td>
<td>case13</td>
</tr>
<tr>
<td>restart</td>
<td>r</td>
<td>重新执行程序</td>
<td>case14</td>
</tr>
<tr>
<td>step</td>
<td>s</td>
<td>执行代码的下一步</td>
<td>case15</td>
</tr>
<tr>
<td>step-instruction</td>
<td>si</td>
<td>执行下一行机器码</td>
<td>case16</td>
</tr>
<tr>
<td>stepout</td>
<td>so</td>
<td>跳出当前执行函数</td>
<td>case17</td>
</tr>
</tbody>
</table>
<h3 id="参数管理" tabindex="-1"><a class="header-anchor" href="#参数管理" aria-hidden="true">#</a> 参数管理</h3>
<table>
<thead>
<tr>
<th>指令</th>
<th>缩写</th>
<th>用法</th>
<th>案例</th>
</tr>
</thead>
<tbody>
<tr>
<td>args</td>
<td>/</td>
<td>打印函数input</td>
<td>case18</td>
</tr>
<tr>
<td>display</td>
<td>/</td>
<td>打印加入到display的变量的值，每次执行下一行代码或下一个断点时</td>
<td>case19</td>
</tr>
<tr>
<td>locals</td>
<td>/</td>
<td>打印局部变量</td>
<td>case20</td>
</tr>
<tr>
<td>print</td>
<td>p</td>
<td>打印表达式的结果</td>
<td>case21</td>
</tr>
<tr>
<td>set</td>
<td>/</td>
<td>设置某个变量的值</td>
<td>case22</td>
</tr>
<tr>
<td>vars</td>
<td>/</td>
<td>查看全局变量</td>
<td>case23</td>
</tr>
<tr>
<td>whatis</td>
<td>/</td>
<td>查看变量类型</td>
<td>case24</td>
</tr>
</tbody>
</table>
<h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h3>
<table>
<thead>
<tr>
<th>指令</th>
<th>缩写</th>
<th>用法</th>
<th>案例</th>
</tr>
</thead>
<tbody>
<tr>
<td>disassemble</td>
<td>disass</td>
<td>查看反编译后的代码，机器码</td>
<td>case25</td>
</tr>
<tr>
<td>exit</td>
<td>quit / q</td>
<td>退出</td>
<td>case26</td>
</tr>
<tr>
<td>funcs</td>
<td>/</td>
<td>打印程序用到的所有函数</td>
<td>case27</td>
</tr>
<tr>
<td>help</td>
<td>h</td>
<td>帮助信息</td>
<td>case28</td>
</tr>
<tr>
<td>list</td>
<td>ls / l</td>
<td>打印代码</td>
<td>case29</td>
</tr>
</tbody>
</table>
<p><strong>一个合适的流程开启我们的调试之旅：</strong></p>
<ol>
<li>建立相应的目录。到<code v-pre>/usr/local/go/bin/github.com/</code>路径下建立这样的路径,建立之后应该存在这样的路径<code v-pre>/usr/local/go/bin/github.com/derekparker/delve</code>。</li>
<li>下载调试依赖的git库：<code v-pre>https://github.com/derekparker/delve</code>需直接zip包，然后把源代码解压，然后把源代码直接放到上面的路径下（上面的路径下应该直接是源代码，可以找到Makefile文件！！！！！！）。</li>
<li>执行命令<code v-pre>make install</code>。</li>
<li>配置VSCode的launch.json文，具体怎么配置给个官网链接，英文的自己去看，看不懂你根本不配看这个文章。<code v-pre>https://github.com/Microsoft/vscode-go/wiki/Debugging-Go-code-using-VS-Code</code>。</li>
<li>打断点进行测试（测试的项目可以是我们一开始编写的hello.go文件）。</li>
</ol>
<h2 id="安装-dlv" tabindex="-1"><a class="header-anchor" href="#安装-dlv" aria-hidden="true">#</a> 安装 dlv</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/go-delve/delve.git <span class="token variable">$GOPATH</span>/src/github.com/go-delve/delve
<span class="token builtin class-name">cd</span> <span class="token variable">$GOPATH</span>/src/github.com/go-delve/delve
<span class="token function">make</span> <span class="token function">install</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$GOPATH</span>/bin

dlv version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>或者使用 get：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go get github.com/derekparker/delve/cmd/dlv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="添加debug方案" tabindex="-1"><a class="header-anchor" href="#添加debug方案" aria-hidden="true">#</a> 添加debug方案</h2>
<p>另外，需要给 <code v-pre>Visual Code</code> 添加对应的 <code v-pre>debug</code> 方案（debug configuration）。在Visual Code的菜单栏上，通过Debug-&gt;Open Configurations打开launch.json的编辑界面。在configurations数组中，加入以下内容后，保存文件。</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Launch remote"</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"go"</span><span class="token punctuation">,</span>
    <span class="token property">"request"</span><span class="token operator">:</span> <span class="token string">"launch"</span><span class="token punctuation">,</span>
    <span class="token property">"mode"</span><span class="token operator">:</span> <span class="token string">"remote"</span><span class="token punctuation">,</span>
    <span class="token property">"remotePath"</span><span class="token operator">:</span> <span class="token string">"/root/go/src/hello"</span><span class="token punctuation">,</span>
    <span class="token property">"port"</span><span class="token operator">:</span> <span class="token number">2345</span><span class="token punctuation">,</span>
    <span class="token property">"host"</span><span class="token operator">:</span> <span class="token string">"192.168.33.123"</span><span class="token punctuation">,</span>
    <span class="token property">"program"</span><span class="token operator">:</span> <span class="token string">"${fileDirname}"</span><span class="token punctuation">,</span>
    <span class="token property">"env"</span><span class="token operator">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="执行方法" tabindex="-1"><a class="header-anchor" href="#执行方法" aria-hidden="true">#</a> 执行方法</h3>
<p>**dlv的debug远程调试需要远端和近端都持有全部的源代码文件。**为了方便，这里就不改变GOPATH，在远端直接将整个项目，扔到 <code v-pre>$GOPATH/src</code> 里面。</p>
<p>源代码文件路径为 <code v-pre>$GOPATH/src/hello/main.go</code></p>
<p>在近端，直接创建 <code v-pre>hello</code>目录，就把源代码文件直接放在里面。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>dlv debug <span class="token parameter variable">--headless</span> <span class="token parameter variable">--listen</span> <span class="token string">":2345"</span> <span class="token parameter variable">--log</span> --api-version <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>画面显示以下内容则说明dlv服务端已经就绪。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>API server listening at: <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:2345
INFO<span class="token punctuation">[</span>0004<span class="token punctuation">]</span> launching process with args: <span class="token punctuation">[</span>/root/go/src/hello/debug<span class="token punctuation">]</span>  <span class="token assign-left variable">layer</span><span class="token operator">=</span>debugger
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，回到 Visual Code 进入 debug 界面，选择 “Launch remote” 方案后，点击启动来进行 go debugger，就能启动远程调试。大部分的操作和本地调试无异，堆栈、变量、watch都能正常使用。</p>
<h2 id="dlv-💡简单的一个案例" tabindex="-1"><a class="header-anchor" href="#dlv-💡简单的一个案例" aria-hidden="true">#</a> dlv 💡简单的一个案例</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PS D:<span class="token punctuation">\</span>文档<span class="token punctuation">\</span>my<span class="token punctuation">\</span>test<span class="token operator">></span> dlv <span class="token builtin class-name">exec</span> .<span class="token punctuation">\</span>main.exe    
Type <span class="token string">'help'</span> <span class="token keyword">for</span> list of commands.
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> b
Breakpoint <span class="token number">1</span> <span class="token builtin class-name">set</span> at 0x7ffc6a490651 <span class="token keyword">for</span> :0
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> b main.main
Breakpoint <span class="token number">2</span> <span class="token builtin class-name">set</span> at 0xe7e48f <span class="token keyword">for</span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> d:/文档/my/test/main.go:14
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> c
Stopped at: 0x7ffc6a490651
<span class="token operator">=</span><span class="token operator">></span>   <span class="token number">1</span>: no <span class="token builtin class-name">source</span> available
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> b main.swap
Breakpoint <span class="token number">3</span> <span class="token builtin class-name">set</span> at 0xe7e51c <span class="token keyword">for</span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> d:/文档/my/test/main.go:10
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> c
<span class="token operator">></span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> d:/文档/my/test/main.go:14 <span class="token punctuation">(</span>hits goroutine<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>:1 total:1<span class="token punctuation">)</span> <span class="token punctuation">(</span>PC: 0xe7e48f<span class="token punctuation">)</span>
Warning: debugging optimized <span class="token keyword">function</span>
     <span class="token number">9</span>:         //XOR exchange
    <span class="token number">10</span>:         *x, *y <span class="token operator">=</span> *y, *x
    <span class="token number">11</span>:         <span class="token builtin class-name">return</span> *x, *y
    <span class="token number">12</span>: <span class="token punctuation">}</span>
    <span class="token number">13</span>:
<span class="token operator">=</span><span class="token operator">></span>  <span class="token number">14</span>: func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token number">15</span>:         fmt.Println<span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
    <span class="token number">16</span>:         //Swap functions
    <span class="token number">17</span>:         <span class="token keyword">for</span> i :<span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i++ <span class="token punctuation">{</span>
    <span class="token number">18</span>:                 a :<span class="token operator">=</span> <span class="token string">"a"</span>
    <span class="token number">19</span>:                 b :<span class="token operator">=</span> <span class="token string">"b"</span>
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> bp
Breakpoint runtime-fatal-throw <span class="token punctuation">(</span>enabled<span class="token punctuation">)</span> at 0xe24a20,0xe24b20 <span class="token keyword">for</span> <span class="token punctuation">(</span>multiple functions<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> d:/app/go/src/runtime/panic.go:1059 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
Breakpoint unrecovered-panic <span class="token punctuation">(</span>enabled<span class="token punctuation">)</span> at 0xe24ec0 <span class="token keyword">for</span> runtime.fatalpanic<span class="token punctuation">(</span><span class="token punctuation">)</span> d:/app/go/src/runtime/panic.go:1143 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
        print runtime.curg._panic.arg
Breakpoint <span class="token number">1</span> <span class="token punctuation">(</span>enabled<span class="token punctuation">)</span> at 0x7ffc6a490651 <span class="token keyword">for</span> :0 <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">2</span> <span class="token punctuation">(</span>enabled<span class="token punctuation">)</span> at 0xe7e48f <span class="token keyword">for</span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> d:/文档/my/test/main.go:14 <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">3</span> <span class="token punctuation">(</span>enabled<span class="token punctuation">)</span> at 0xe7e51c <span class="token keyword">for</span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> d:/文档/my/test/main.go:10 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> <span class="token function">clear</span> <span class="token number">2</span>
Breakpoint <span class="token number">2</span> cleared at 0xe7e48f <span class="token keyword">for</span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> d:/文档/my/test/main.go:14
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> bp
Breakpoint runtime-fatal-throw <span class="token punctuation">(</span>enabled<span class="token punctuation">)</span> at 0xe24a20,0xe24b20 <span class="token keyword">for</span> <span class="token punctuation">(</span>multiple functions<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span> d:/app/go/src/runtime/panic.go:1059 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
Breakpoint unrecovered-panic <span class="token punctuation">(</span>enabled<span class="token punctuation">)</span> at 0xe24ec0 <span class="token keyword">for</span> runtime.fatalpanic<span class="token punctuation">(</span><span class="token punctuation">)</span> d:/app/go/src/runtime/panic.go:1143 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
        print runtime.curg._panic.arg
Breakpoint <span class="token number">1</span> <span class="token punctuation">(</span>enabled<span class="token punctuation">)</span> at 0x7ffc6a490651 <span class="token keyword">for</span> :0 <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">3</span> <span class="token punctuation">(</span>enabled<span class="token punctuation">)</span> at 0xe7e51c <span class="token keyword">for</span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> d:/文档/my/test/main.go:10 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> <span class="token function">ls</span>
<span class="token operator">></span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> d:/文档/my/test/main.go:14 <span class="token punctuation">(</span>PC: 0xe7e48f<span class="token punctuation">)</span>
Warning: debugging optimized <span class="token keyword">function</span>
     <span class="token number">9</span>:         //XOR exchange
    <span class="token number">10</span>:         *x, *y <span class="token operator">=</span> *y, *x
    <span class="token number">11</span>:         <span class="token builtin class-name">return</span> *x, *y
    <span class="token number">12</span>: <span class="token punctuation">}</span>
    <span class="token number">13</span>:
<span class="token operator">=</span><span class="token operator">></span>  <span class="token number">14</span>: func <span class="token function-name function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token number">15</span>:         fmt.Println<span class="token punctuation">(</span><span class="token string">"Hello, world!"</span><span class="token punctuation">)</span>
    <span class="token number">16</span>:         //Swap functions
    <span class="token number">17</span>:         <span class="token keyword">for</span> i :<span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">10</span><span class="token punctuation">;</span> i++ <span class="token punctuation">{</span>
    <span class="token number">18</span>:                 a :<span class="token operator">=</span> <span class="token string">"a"</span>
    <span class="token number">19</span>:                 b :<span class="token operator">=</span> <span class="token string">"b"</span>
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p>带参数启动程序（<code v-pre>dlv exec ./GoDbg -- arg1 arg2</code>）</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token punctuation">[</span>lday<span class="token variable">@alex</span> GoDbg<span class="token punctuation">]</span>$ dlv <span class="token keyword">exec</span> <span class="token punctuation">.</span><span class="token operator">/</span>GoDbg <span class="token comment">-- arg1 arg2 </span>
<span class="token keyword">Type</span> <span class="token string">'help'</span> <span class="token keyword">for</span> list <span class="token keyword">of</span> commands<span class="token punctuation">.</span>
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在main函数上设置断点（<code v-pre>b</code>）</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> b main.main
Breakpoint 1 set at 0x40101b for main.<span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> ./main.<span class="token property">go</span><span class="token punctuation">:</span>9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>启动调试，断点后继续执行（<code v-pre>c</code>）</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">(dlv) c
> main.main() ./main.go:9 (hits goroutine(1):1 total:1) (PC: 0x40101b)
     4:        "GoWorks/GoDbg/mylib"
     5:        "fmt"
     6:        "os"
     7:    )
     8:    
=>   9:    func main()</span> <span class="token punctuation">{</span>
    <span class="token selector">10:        fmt.Println("Golang dbg test...")
    11:    
    12:        var argc = len(os.Args)
    13:        var argv = append([]string</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> os.Args...<span class="token punctuation">)</span>
    14<span class="token punctuation">:</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>在文件dbgTest.go上通过行号设置断点（<code v-pre>b</code>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> b dbgTest.go:17
Breakpoint <span class="token number">2</span> <span class="token builtin class-name">set</span> at 0x457f51 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:17
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> b dbgTest.go:23
Breakpoint <span class="token number">3</span> <span class="token builtin class-name">set</span> at 0x4580d0 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:23
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> b dbgTest.go:26
Breakpoint <span class="token number">4</span> <span class="token builtin class-name">set</span> at 0x458123 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:26
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> b dbgTest.go:29
Breakpoint <span class="token number">5</span> <span class="token builtin class-name">set</span> at 0x458166 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:29
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>显示所有断点列表（<code v-pre>bp</code>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> bp
Breakpoint unrecovered-panic at 0x429690 <span class="token keyword">for</span> runtime.startpanic<span class="token punctuation">(</span><span class="token punctuation">)</span> /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/panic.go:524 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">1</span> at 0x40101b <span class="token keyword">for</span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> ./main.go:9 <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">2</span> at 0x457f51 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:17 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">3</span> at 0x4580d0 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:23 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">4</span> at 0x458123 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:26 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">5</span> at 0x458166 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:29 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>dlv似乎没有提供类似gdb<code v-pre>dis x</code>，禁止某个断点的功能，在文档中暂时没有查到。不过这个功能用处不大。</p>
</li>
<li>
<p>删除某个断点（<code v-pre>clear x</code>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> <span class="token function">clear</span> <span class="token number">5</span>
Breakpoint <span class="token number">5</span> cleared at 0x458166 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:29
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> bp
Breakpoint unrecovered-panic at 0x429690 <span class="token keyword">for</span> runtime.startpanic<span class="token punctuation">(</span><span class="token punctuation">)</span> /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/panic.go:524 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">1</span> at 0x40101b <span class="token keyword">for</span> main.main<span class="token punctuation">(</span><span class="token punctuation">)</span> ./main.go:9 <span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">2</span> at 0x457f51 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:17 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">3</span> at 0x4580d0 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:23 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
Breakpoint <span class="token number">4</span> at 0x458123 <span class="token keyword">for</span> GoWorks/GoDbg/mylib.DBGTestRun<span class="token punctuation">(</span><span class="token punctuation">)</span> ./mylib/dbgTest.go:26 <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>显示当前运行的代码位置（<code v-pre>ls</code>）</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> ls
<span class="token operator">></span> GoWorks<span class="token operator">/</span>GoDbg<span class="token operator">/</span>mylib<span class="token punctuation">.</span><span class="token function">DBGTestRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">.</span><span class="token operator">/</span>mylib<span class="token operator">/</span>dbgTest<span class="token punctuation">.</span><span class="token keyword">go</span><span class="token punctuation">:</span><span class="token number">17</span> <span class="token punctuation">(</span>hits <span class="token function">goroutine</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">:</span><span class="token number">1</span> total<span class="token punctuation">:</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>PC<span class="token punctuation">:</span> <span class="token number">0x457f51</span><span class="token punctuation">)</span>
    <span class="token number">12</span><span class="token punctuation">:</span>        C <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">string</span>
    <span class="token number">13</span><span class="token punctuation">:</span>        D <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
    <span class="token number">14</span><span class="token punctuation">:</span>    <span class="token punctuation">}</span>
    <span class="token number">15</span><span class="token punctuation">:</span>    
    <span class="token number">16</span><span class="token punctuation">:</span>    <span class="token keyword">func</span> <span class="token function">DBGTestRun</span><span class="token punctuation">(</span>var1 <span class="token builtin">int</span><span class="token punctuation">,</span> var2 <span class="token builtin">string</span><span class="token punctuation">,</span> var3 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span><span class="token punctuation">,</span> var4 MyStruct<span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token operator">=</span><span class="token operator">></span>  <span class="token number">17</span><span class="token punctuation">:</span>        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"DBGTestRun Begin!\n"</span><span class="token punctuation">)</span>
    <span class="token number">18</span><span class="token punctuation">:</span>        waiter <span class="token operator">:=</span> <span class="token operator">&amp;</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token number">19</span><span class="token punctuation">:</span>    
    <span class="token number">20</span><span class="token punctuation">:</span>        waiter<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token number">21</span><span class="token punctuation">:</span>        <span class="token keyword">go</span> <span class="token function">RunFunc1</span><span class="token punctuation">(</span>var1<span class="token punctuation">,</span> waiter<span class="token punctuation">)</span>
    <span class="token number">22</span><span class="token punctuation">:</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>查看当前调用栈信息（<code v-pre>bt</code>）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> bt
<span class="token number">0</span>  0x0000000000457f51 <span class="token keyword">in</span> GoWorks/GoDbg/mylib.DBGTestRun
   at ./mylib/dbgTest.go:17
<span class="token number">1</span>  0x0000000000401818 <span class="token keyword">in</span> main.main
   at ./main.go:27
<span class="token number">2</span>  0x000000000042aefb <span class="token keyword">in</span> runtime.main
   at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/proc.go:188
<span class="token number">3</span>  0x0000000000456df0 <span class="token keyword">in</span> runtime.goexit
   at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/asm_amd64.s:1998
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>输出变量信息（<code v-pre>print/p</code>）</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> <span class="token builtin">print</span> var1
<span class="token number">1</span>
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> <span class="token builtin">print</span> var2
<span class="token string">"golang dbg test"</span>
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> <span class="token builtin">print</span> var3
<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">int</span> <span class="token builtin">len</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token builtin">cap</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span>
<span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> <span class="token builtin">print</span> var4
GoWorks<span class="token operator">/</span>GoDbg<span class="token operator">/</span>mylib<span class="token punctuation">.</span>MyStruct <span class="token punctuation">{</span>
    A<span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    B<span class="token punctuation">:</span> <span class="token string">"golang dbg my struct field B"</span><span class="token punctuation">,</span>
    C<span class="token punctuation">:</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token punctuation">[</span>
        <span class="token number">1</span><span class="token punctuation">:</span> <span class="token string">"value1"</span><span class="token punctuation">,</span> 
        <span class="token number">2</span><span class="token punctuation">:</span> <span class="token string">"value2"</span><span class="token punctuation">,</span> 
        <span class="token number">3</span><span class="token punctuation">:</span> <span class="token string">"value3"</span><span class="token punctuation">,</span> 
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    D<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token builtin">len</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token builtin">cap</span><span class="token punctuation">:</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"D1"</span><span class="token punctuation">,</span><span class="token string">"D2"</span><span class="token punctuation">,</span><span class="token string">"D3"</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>*<strong>类比gdb调试，我们看到，之前我们使用gdb进行调试时，发现gdb在此时无法输出var3, var4的内容，而dlv可以*</strong></p>
</li>
<li>
<p>在第n层调用栈上执行相应指令（<code v-pre>frame n cmd</code>）</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> frame <span class="token number">1</span> ls
    <span class="token number">22</span><span class="token punctuation">:</span>        var4<span class="token punctuation">.</span>A <span class="token operator">=</span> <span class="token number">1</span>
    <span class="token number">23</span><span class="token punctuation">:</span>        var4<span class="token punctuation">.</span>B <span class="token operator">=</span> <span class="token string">"golang dbg my struct field B"</span>
    <span class="token number">24</span><span class="token punctuation">:</span>        var4<span class="token punctuation">.</span>C <span class="token operator">=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">int</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">:</span> <span class="token string">"value1"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">:</span> <span class="token string">"value2"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">:</span> <span class="token string">"value3"</span><span class="token punctuation">}</span>
    <span class="token number">25</span><span class="token punctuation">:</span>        var4<span class="token punctuation">.</span>D <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"D1"</span><span class="token punctuation">,</span> <span class="token string">"D2"</span><span class="token punctuation">,</span> <span class="token string">"D3"</span><span class="token punctuation">}</span>
    <span class="token number">26</span><span class="token punctuation">:</span>    
<span class="token operator">=</span><span class="token operator">></span>  <span class="token number">27</span><span class="token punctuation">:</span>        mylib<span class="token punctuation">.</span><span class="token function">DBGTestRun</span><span class="token punctuation">(</span>var1<span class="token punctuation">,</span> var2<span class="token punctuation">,</span> var3<span class="token punctuation">,</span> var4<span class="token punctuation">)</span>
    <span class="token number">28</span><span class="token punctuation">:</span>        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Golang dbg test over"</span><span class="token punctuation">)</span>
    <span class="token number">29</span><span class="token punctuation">:</span>    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>frame 1 ls</code>将显示程序在第1层调用栈上的具体实行位置</p>
</li>
<li>
<p>查看goroutine的信息（<code v-pre>goroutines</code>）
当我们执行到<code v-pre>dbgTest.go:26</code>时，我们已经启动了两个goroutine</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>(dlv) 
<span class="token punctuation">></span> GoWorks/GoDbg/mylib.DBGTestRun() ./mylib/dbgTest.go<span class="token punctuation">:</span><span class="token key atrule">26 (hits goroutine(1):1 total:1) (PC</span><span class="token punctuation">:</span> 0x458123)
    <span class="token key atrule">21</span><span class="token punctuation">:</span>        go RunFunc1(var1<span class="token punctuation">,</span> waiter)
    <span class="token key atrule">22</span><span class="token punctuation">:</span>    
    <span class="token key atrule">23</span><span class="token punctuation">:</span>        waiter.Add(1)
    <span class="token key atrule">24</span><span class="token punctuation">:</span>        go RunFunc2(var2<span class="token punctuation">,</span> waiter)
    <span class="token key atrule">25</span><span class="token punctuation">:</span>    
<span class="token key atrule">=>  26</span><span class="token punctuation">:</span>        waiter.Add(1)
    <span class="token key atrule">27</span><span class="token punctuation">:</span>        go RunFunc3(<span class="token important">&amp;var3</span><span class="token punctuation">,</span> waiter)
    <span class="token key atrule">28</span><span class="token punctuation">:</span>    
    <span class="token key atrule">29</span><span class="token punctuation">:</span>        waiter.Add(1)
    <span class="token key atrule">30</span><span class="token punctuation">:</span>        go RunFunc4(<span class="token important">&amp;var4</span><span class="token punctuation">,</span> waiter)
    <span class="token key atrule">31</span><span class="token punctuation">:</span>    
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时我们来查看程序的goroutine状态信息</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> goroutines
<span class="token punctuation">[</span><span class="token number">6</span> goroutines<span class="token punctuation">]</span>
* Goroutine <span class="token number">1</span> - User: ./mylib/dbgTest.go:26 GoWorks/GoDbg/mylib.DBGTestRun <span class="token punctuation">(</span>0x458123<span class="token punctuation">)</span> <span class="token punctuation">(</span>thread <span class="token number">9022</span><span class="token punctuation">)</span>
  Goroutine <span class="token number">2</span> - User: /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/proc.go:263 runtime.gopark <span class="token punctuation">(</span>0x42b2d3<span class="token punctuation">)</span>
  Goroutine <span class="token number">3</span> - User: /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/proc.go:263 runtime.gopark <span class="token punctuation">(</span>0x42b2d3<span class="token punctuation">)</span>
  Goroutine <span class="token number">4</span> - User: /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/proc.go:263 runtime.gopark <span class="token punctuation">(</span>0x42b2d3<span class="token punctuation">)</span>
  Goroutine <span class="token number">5</span> - User: ./mylib/dbgTest.go:39 GoWorks/GoDbg/mylib.RunFunc1 <span class="token punctuation">(</span>0x4583eb<span class="token punctuation">)</span> <span class="token punctuation">(</span>thread <span class="token number">9035</span><span class="token punctuation">)</span>
  Goroutine <span class="token number">6</span> - User: /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/fmt/format.go:130 fmt.<span class="token punctuation">(</span>*fmt<span class="token punctuation">)</span>.padString <span class="token punctuation">(</span>0x459545<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从输出的信息来看，先启动的goroutine 5，执行<code v-pre>RunFunc1</code>，此时还没有执行<code v-pre>fmt.Printf</code>，而后启动的goroutine 6，执行<code v-pre>RunFunc2</code>，则已经进入到<code v-pre>fmt.Printf</code>的内部调用过程中了</p>
</li>
<li>
<p>进一步查看goroutine信息（<code v-pre>goroutine x</code>）
接第11步的操作，此时我想查看goroutine 6的具体执行情况，则执行<code v-pre>goroutine 6</code></p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> goroutine 6
Switched from 1 to 6 <span class="token punctuation">(</span>thread 9022<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在此基础上，执行<code v-pre>bt</code>，则可以看到当前goroutine的调用栈情况</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> bt
 <span class="token number">0</span>  0x0000000000454730 <span class="token keyword">in</span> runtime.systemstack_switch
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/asm_amd64.s:245
 <span class="token number">1</span>  0x000000000040f700 <span class="token keyword">in</span> runtime.mallocgc
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/malloc.go:643
 <span class="token number">2</span>  0x000000000040fc43 <span class="token keyword">in</span> runtime.rawmem
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/malloc.go:809
 <span class="token number">3</span>  0x000000000043c2a5 <span class="token keyword">in</span> runtime.growslice
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/slice.go:95
 <span class="token number">4</span>  0x000000000043c015 <span class="token keyword">in</span> runtime.growslice_n
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/slice.go:44
 <span class="token number">5</span>  0x0000000000459545 <span class="token keyword">in</span> fmt.<span class="token punctuation">(</span>*fmt<span class="token punctuation">)</span>.padString
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/fmt/format.go:130
 <span class="token number">6</span>  0x000000000045a13f <span class="token keyword">in</span> fmt.<span class="token punctuation">(</span>*fmt<span class="token punctuation">)</span>.fmt_s
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/fmt/format.go:322
 <span class="token number">7</span>  0x000000000045e905 <span class="token keyword">in</span> fmt.<span class="token punctuation">(</span>*pp<span class="token punctuation">)</span>.fmtString
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/fmt/print.go:518
 <span class="token number">8</span>  0x000000000046200f <span class="token keyword">in</span> fmt.<span class="token punctuation">(</span>*pp<span class="token punctuation">)</span>.printArg
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/fmt/print.go:797
 <span class="token number">9</span>  0x0000000000468a8d <span class="token keyword">in</span> fmt.<span class="token punctuation">(</span>*pp<span class="token punctuation">)</span>.doPrintf
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/fmt/print.go:1238
<span class="token number">10</span>  0x000000000045c654 <span class="token keyword">in</span> fmt.Fprintf
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/fmt/print.go:188
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时输出了10层调用栈，但似乎最原始的我自身程序dbgTest.go的调用栈没有输出， 可以通过<code v-pre>bt</code>加depth参数，设定bt的输出深度，进而找到我们自己的调用栈，例如<code v-pre>bt 13</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> bt <span class="token number">13</span>
<span class="token punctuation">..</span>.
<span class="token number">10</span>  0x000000000045c654 <span class="token keyword">in</span> fmt.Fprintf
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/fmt/print.go:188
<span class="token number">11</span>  0x000000000045c74b <span class="token keyword">in</span> fmt.Printf
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/fmt/print.go:197
<span class="token number">12</span>  0x000000000045846f <span class="token keyword">in</span> GoWorks/GoDbg/mylib.RunFunc2
    at ./mylib/dbgTest.go:50
<span class="token number">13</span>  0x0000000000456df0 <span class="token keyword">in</span> runtime.goexit
    at /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/asm_amd64.s:1998
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们看到，我们自己dbgTest.go的调用栈在第12层。当前goroutine已经不再我们自己的调用栈上，而是进入到系统函数的调用中，在这种情况下，使用gdb进行调试时，我们发现，此时我们没有很好的方法能够输出我们需要的调用栈变量信息。**dlv可以!**此时只需简单的通过<code v-pre>frame x cmd</code>就可以输出我们想要的调用栈信息了</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>(dlv) frame 12 ls
    <span class="token key atrule">45</span><span class="token punctuation">:</span>        time.Sleep(10 * time.Second)
    <span class="token key atrule">46</span><span class="token punctuation">:</span>        waiter.Done()
    <span class="token key atrule">47</span><span class="token punctuation">:</span>    <span class="token punctuation">}</span>
    <span class="token key atrule">48</span><span class="token punctuation">:</span>    
    <span class="token key atrule">49</span><span class="token punctuation">:</span>    func RunFunc2(variable string<span class="token punctuation">,</span> waiter <span class="token important">*sync.WaitGroup)</span> <span class="token punctuation">{</span>
<span class="token key atrule">=>  50</span><span class="token punctuation">:</span>        fmt.Printf("var2<span class="token punctuation">:</span>%v\n"<span class="token punctuation">,</span> variable)
    <span class="token key atrule">51</span><span class="token punctuation">:</span>        time.Sleep(10 * time.Second)
    <span class="token key atrule">52</span><span class="token punctuation">:</span>        waiter.Done()
    <span class="token key atrule">53</span><span class="token punctuation">:</span>    <span class="token punctuation">}</span>
    <span class="token key atrule">54</span><span class="token punctuation">:</span>    
    <span class="token key atrule">55</span><span class="token punctuation">:</span>    func RunFunc3(pVariable *<span class="token punctuation">[</span><span class="token punctuation">]</span>int<span class="token punctuation">,</span> waiter <span class="token important">*sync.WaitGroup)</span> <span class="token punctuation">{</span>
(dlv) frame 12 print variable 
"golang dbg test"
(dlv) frame 12 print waiter
<span class="token important">*sync.WaitGroup</span> <span class="token punctuation">{</span>
    <span class="token key atrule">state1</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">]</span>uint8 <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token key atrule">sema</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>多好的功能啊！</p>
</li>
<li>
<p>查看当前是在哪个goroutine上（<code v-pre>goroutine</code>）
当使用<code v-pre>goroutine</code>不带参数时，dlv就会显示当前goroutine信息，这可以帮助我们在调试时确认是否需要做goroutine切换</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">(</span>dlv<span class="token punctuation">)</span> goroutine
Thread <span class="token number">9022</span> at ./mylib/dbgTest.go:26
Goroutine <span class="token number">6</span>:
    Runtime: /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/runtime/asm_amd64.s:245 runtime.systemstack_switch <span class="token punctuation">(</span>0x454730<span class="token punctuation">)</span>
    User: /home/lday/Tools/Dev_Tools/Go_Tools/go_1_6_2/src/fmt/format.go:130 fmt.<span class="token punctuation">(</span>*fmt<span class="token punctuation">)</span>.padString <span class="token punctuation">(</span>0x459545<span class="token punctuation">)</span>
    Go: ./mylib/dbgTest.go:26 GoWorks/GoDbg/mylib.DBGTestRun <span class="token punctuation">(</span>0x458123<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="dlv前端-gdlv" tabindex="-1"><a class="header-anchor" href="#dlv前端-gdlv" aria-hidden="true">#</a> dlv前端(gdlv)</h3>
<p>dlv提供了类似gdb的cli调试系统，而有第三方还提供了dlv的GUI前端(<a href="https://github.com/aarzilli/gdlv" target="_blank" rel="noopener noreferrer">gdlv<ExternalLinkIcon/></a>)，对于那些习惯了使用GUI进行调试的人来说，结合gdlv和dlv，调试会更加方便。gdlv有个问题是：他无法在xwindows server上运行，只能在server本地运行。
<img src="https://raw.githubusercontent.com/aarzilli/gdlv/master/doc/screen.png" alt="img"></p>
<h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h3>
<p>综合比较两个Golang程序调试器gdb和dlv，我认为dlv的功能更为完善，更能满足实际调试时的功能需求。两者的优缺点比较大致如下</p>
<table>
<thead>
<tr>
<th style="text-align:center">调试器</th>
<th style="text-align:center">优势</th>
<th style="text-align:center">不足</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">dlv</td>
<td style="text-align:center">对goroutine, go类型调试支持比较完善</td>
<td style="text-align:center">只支持 go, 不支持调试某些Go内部底部数据</td>
</tr>
<tr>
<td style="text-align:center">gdb</td>
<td style="text-align:center">符合现有的调试习惯，类似C/C++调试指令都有</td>
<td style="text-align:center">对goroutine场景支持不足，不能很好的应对goroutine的调试</td>
</tr>
</tbody>
</table>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>通过 <code v-pre>Visual Code+dlv</code> 来进行 go 程序的远程调试，对“开发用Windows，生产用Linux”之类的场合下，调试与系统相关的问题非常有帮助。而且，Visual Code的图形界面和代码提示实在是相当方便。</p>
<p>但是debug这个做法有两点不完善的地方。第一个是它原理上需要远端对源代码进行编译，局限了它在除了开发测试环境外的使用场景，也使得每次调试都得等它编译；另一个是因为远端和近端都得有相同的源代码，无论是dlv还是 Visual Code的Go插件，目前都没法自动将本地改动过的代码上传到远端去。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '13.md' style='float:left'>⬆️上一节🔗  </a><a href = '15.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://cubxxw.com/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


