<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第14节-调试方式" tabindex="-1"><a class="header-anchor" href="#第14节-调试方式" aria-hidden="true">#</a> 第14节 调试方式</h1>
<div><a href = '13.md' style='float:left'>⬆️上一节🔗  </a><a href = '15.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
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
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>>gotest for package/function
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vscode-远程调试" tabindex="-1"><a class="header-anchor" href="#vscode-远程调试" aria-hidden="true">#</a> vscode 远程调试</h2>
<p><strong>创建 <code v-pre>.vscode</code> 文件夹（mod rootfs目录），并在下面创建：</strong></p>
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
<h2 id="安装-dlv" tabindex="-1"><a class="header-anchor" href="#安装-dlv" aria-hidden="true">#</a> 安装 dlv</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/go-delve/delve.git <span class="token variable">$GOPATH</span>/src/github.com/go-delve/delve
<span class="token builtin class-name">cd</span> <span class="token variable">$GOPATH</span>/src/github.com/go-delve/delve
<span class="token function">make</span> <span class="token function">install</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$GOPATH</span>/bin

dlv version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>或者使用 get：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go get github.com/derekparker/delve/cmd/dlv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="添加debug方案" tabindex="-1"><a class="header-anchor" href="#添加debug方案" aria-hidden="true">#</a> 添加debug方案</h2>
<p>另外，需要给Visual Code添加对应的debug方案（debug configuration）。在Visual Code的菜单栏上，通过Debug-&gt;Open Configurations打开launch.json的编辑界面。在configurations数组中，加入以下内容后，保存文件。</p>
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
<p>dlv的debug远程调试需要远端和近端都持有全部的源代码文件。为了方便，这里就不改变GOPATH，在远端直接将整个项目，扔到 <code v-pre>$GOPATH/src</code> 里面。</p>
<p>源代码文件路径为 <code v-pre>$GOPATH/src/hello/main.go</code></p>
<p>在近端，直接创建 <code v-pre>hello</code>目录，就把源代码文件直接放在里面。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>dlv debug <span class="token parameter variable">--headless</span> <span class="token parameter variable">--listen</span> <span class="token string">":2345"</span> <span class="token parameter variable">--log</span> --api-version <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>画面显示以下内容则说明dlv服务端已经就绪。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>API server listening at: <span class="token punctuation">[</span>::<span class="token punctuation">]</span>:2345
INFO<span class="token punctuation">[</span>0004<span class="token punctuation">]</span> launching process with args: <span class="token punctuation">[</span>/root/go/src/hello/debug<span class="token punctuation">]</span>  <span class="token assign-left variable">layer</span><span class="token operator">=</span>debugger
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，回到Visual Code进入debug界面，选择“Launch remote”方案后，点击启动来进行go debugger，就能启动远程调试。大部分的操作和本地调试无异，堆栈、变量、watch都能正常使用。</p>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2>
<p>通过Visual Code+dlv来进行go程序的远程调试，对“开发用Windows，生产用Linux”之类的场合下，调试与系统相关的问题非常有帮助。而且，Visual Code的图形界面和代码提示实在是相当方便。</p>
<p>但是debug这个做法有两点不完善的地方。第一个是它原理上需要远端对源代码进行编译，局限了它在除了开发测试环境外的使用场景，也使得每次调试都得等它编译；另一个是因为远端和近端都得有相同的源代码，无论是dlv还是 Visual Code的Go插件，目前都没法自动将本地改动过的代码上传到远端去。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '13.md' style='float:left'>⬆️上一节🔗  </a><a href = '15.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


