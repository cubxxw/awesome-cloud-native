<template><div><ul>
<li><a href="https://github.com/cubxxw/awesome-cloud-native" target="_blank" rel="noopener noreferrer">🔥 开源地址<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第1节-docker-开发" tabindex="-1"><a class="header-anchor" href="#第1节-docker-开发" aria-hidden="true">#</a> 第1节 docker 开发</h1>
<br>
<div><a href = '0.md' style='float:left'>⬆️上一节🔗  </a><a href = '2.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕实现当初学习docker的愿望，自己撸一个docker，为云原生开发充实基础。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#关于云开发">关于云开发</router-link></li><li><router-link to="#docker-实现">docker 实现</router-link></li><li><router-link to="#运行命令">运行命令</router-link></li><li><router-link to="#程序">程序</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="关于云开发" tabindex="-1"><a class="header-anchor" href="#关于云开发" aria-hidden="true">#</a> 关于云开发</h2>
<ul>
<li><a href="https://github.com/EngineerCN/content" target="_blank" rel="noopener noreferrer">参考 Enginerr CN <ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">关于~</p>
<p>云开发一直是我很希望的一个反向，无论是后面的 kubernetes 源码和结构，包括现在的 docker ，或许都需要一些灵感来刺激自己。</p>
<p>或许结合了很多实际的案例： kubernetes + fabric2.0   kubernetes + springcloud 后更加深有体会~</p>
<p>我们从最简单的 docker 开始 ~</p>
</div>
<h2 id="docker-实现" tabindex="-1"><a class="header-anchor" href="#docker-实现" aria-hidden="true">#</a> docker 实现</h2>
<ul>
<li>Namespace (隔离)</li>
<li>Cgroup (限制)</li>
<li>AUFS (联合文件系统)</li>
</ul>
<p><img src="http://sm.cubxxw.com/smimage-20221115214301527.png" alt="image-20221115214301527"></p>
<h2 id="运行命令" tabindex="-1"><a class="header-anchor" href="#运行命令" aria-hidden="true">#</a> 运行命令</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-it</span> ubuntu /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="程序" tabindex="-1"><a class="header-anchor" href="#程序" aria-hidden="true">#</a> 程序</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os"</span>
	<span class="token string">"os/exec"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">)</span>
	<span class="token keyword">switch</span> os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>	 <span class="token comment">//获取第一个参数（从程序名开始）</span>
	<span class="token keyword">case</span> <span class="token string">"run"</span><span class="token punctuation">:</span>
		<span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"have not define"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cmd <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>	<span class="token comment">//获取第二个参数</span>
	cmd<span class="token punctuation">.</span>Stdin <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdin
	cmd<span class="token punctuation">.</span>Stdout <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdout
	cmd<span class="token punctuation">.</span>Stderr <span class="token operator">=</span> os<span class="token punctuation">.</span>Stderr
	cmd<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 编译结果如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ go run go-docker-1.go run <span class="token function">date</span>
<span class="token punctuation">[</span>C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token punctuation">\</span>AppData<span class="token punctuation">\</span>Local<span class="token punctuation">\</span>Temp<span class="token punctuation">\</span>go-build3158378218<span class="token punctuation">\</span>b001<span class="token punctuation">\</span>exe<span class="token punctuation">\</span>go-docker-1.exe run date<span class="token punctuation">]</span>
Tue Nov <span class="token number">15</span> <span class="token number">22</span>:07:19     <span class="token number">2022</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们运行了 date ，是不是说就是我们使用的是date 这个模式</strong></p>
<div class="custom-container tip"><p class="custom-container-title">观察进程</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>smile@DESKTOP-N9GOOM4 MINGW64 /d/文档/最近的/awesome-docker/docs/code-docker-super/main <span class="token punctuation">(</span>master<span class="token punctuation">)</span>
$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> 
     <span class="token environment constant">UID</span>     PID    <span class="token environment constant">PPID</span>  TTY        STIME COMMAND
   smile    <span class="token number">1159</span>       <span class="token number">1</span> cons1    <span class="token number">22</span>:08:59 /usr/bin/bash
   smile    <span class="token number">1169</span>    <span class="token number">1159</span> cons1    <span class="token number">22</span>:09:10 /usr/bin/ps
   smile    <span class="token number">1139</span>       <span class="token number">1</span> cons0    <span class="token number">22</span>:07:02 /usr/bin/bash

smile@DESKTOP-N9GOOM4 MINGW64 /d/文档/最近的/awesome-docker/docs/code-docker-super/main <span class="token punctuation">(</span>master<span class="token punctuation">)</span>
$ <span class="token function">ps</span> aut
      PID    <span class="token environment constant">PPID</span>    PGID     WINPID   TTY         <span class="token environment constant">UID</span>    STIME COMMAND
     <span class="token number">1159</span>       <span class="token number">1</span>    <span class="token number">1159</span>     <span class="token number">166668</span>  cons1     <span class="token number">197609</span> <span class="token number">22</span>:08:59 /usr/bin/bash
     <span class="token number">1174</span>    <span class="token number">1159</span>    <span class="token number">1174</span>     <span class="token number">174676</span>  cons1     <span class="token number">197609</span> <span class="token number">22</span>:09:35 /usr/bin/ps
     <span class="token number">1139</span>       <span class="token number">1</span>    <span class="token number">1139</span>     <span class="token number">176140</span>  cons0     <span class="token number">197609</span> <span class="token number">22</span>:07:02 /usr/bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>退出再进入：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>smile@DESKTOP-N9GOOM4 MINGW64 /d/文档/最近的/awesome-docker/docs/code-docker-super/main <span class="token punctuation">(</span>master<span class="token punctuation">)</span>
$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span>
     <span class="token environment constant">UID</span>     PID    <span class="token environment constant">PPID</span>  TTY        STIME COMMAND
   smile    <span class="token number">1194</span>    <span class="token number">1179</span> cons1    <span class="token number">22</span>:10:21 /usr/bin/ps
   smile    <span class="token number">1179</span>       <span class="token number">1</span> cons1    <span class="token number">22</span>:10:14 /usr/bin/bash
   smile    <span class="token number">1139</span>       <span class="token number">1</span> cons0    <span class="token number">22</span>:07:02 /usr/bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p>由此可以简单，我们的不同进程是不一样的，可以理解为障眼法~</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '0.md' style='float:left'>⬆️上一节🔗  </a><a href = '2.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


