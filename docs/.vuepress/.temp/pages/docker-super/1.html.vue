<template><div><ul>
<li><a href="https://github.com/3293172751/awesome-cloud-native" target="_blank" rel="noopener noreferrer">ð¥ å¼æºå°å<ExternalLinkIcon/></a></li>
</ul>
<h1 id="ç¬¬1è-docker-å¼å" tabindex="-1"><a class="header-anchor" href="#ç¬¬1è-docker-å¼å" aria-hidden="true">#</a> ç¬¬1è docker å¼å</h1>
<br>
<div><a href = '0.md' style='float:left'>â¬ï¸ä¸ä¸èð  </a><a href = '2.md' style='float: right'>  â¬ï¸ä¸ä¸èð</a></div>
<br>
<blockquote>
<p>â¤ï¸ððå®ç°å½åå­¦ä¹ dockerçæ¿æï¼èªå·±æ¸ä¸ä¸ªdockerï¼ä¸ºäºåçå¼ååå®åºç¡ãMyblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#å³äºäºå¼å">å³äºäºå¼å</router-link></li><li><router-link to="#docker-å®ç°">docker å®ç°</router-link></li><li><router-link to="#è¿è¡å½ä»¤">è¿è¡å½ä»¤</router-link></li><li><router-link to="#ç¨åº">ç¨åº</router-link></li><li><router-link to="#end-é¾æ¥">END é¾æ¥</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="å³äºäºå¼å" tabindex="-1"><a class="header-anchor" href="#å³äºäºå¼å" aria-hidden="true">#</a> å³äºäºå¼å</h2>
<ul>
<li><a href="https://github.com/EngineerCN/content" target="_blank" rel="noopener noreferrer">åè Enginerr CN <ExternalLinkIcon/></a></li>
</ul>
<div class="custom-container tip"><p class="custom-container-title">å³äº~</p>
<p>äºå¼åä¸ç´æ¯æå¾å¸æçä¸ä¸ªååï¼æ è®ºæ¯åé¢ç kubernetes æºç åç»æï¼åæ¬ç°å¨ç docker ï¼æè®¸é½éè¦ä¸äºçµææ¥åºæ¿èªå·±ã</p>
<p>æè®¸ç»åäºå¾å¤å®éçæ¡ä¾ï¼ kubernetes + fabric2.0   kubernetes + springcloud åæ´å æ·±æä½ä¼~</p>
<p>æä»¬ä»æç®åç docker å¼å§ ~</p>
</div>
<h2 id="docker-å®ç°" tabindex="-1"><a class="header-anchor" href="#docker-å®ç°" aria-hidden="true">#</a> docker å®ç°</h2>
<ul>
<li>Namespace (éç¦»)</li>
<li>Cgroup (éå¶)</li>
<li>AUFS (èåæä»¶ç³»ç»)</li>
</ul>
<p><img src="http://sm.nsddd.top/smimage-20221115214301527.png" alt="image-20221115214301527"></p>
<h2 id="è¿è¡å½ä»¤" tabindex="-1"><a class="header-anchor" href="#è¿è¡å½ä»¤" aria-hidden="true">#</a> è¿è¡å½ä»¤</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">-it</span> ubuntu /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="ç¨åº" tabindex="-1"><a class="header-anchor" href="#ç¨åº" aria-hidden="true">#</a> ç¨åº</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os"</span>
	<span class="token string">"os/exec"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">)</span>
	<span class="token keyword">switch</span> os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">{</span>	 <span class="token comment">//è·åç¬¬ä¸ä¸ªåæ°ï¼ä»ç¨åºåå¼å§ï¼</span>
	<span class="token keyword">case</span> <span class="token string">"run"</span><span class="token punctuation">:</span>
		<span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">default</span><span class="token punctuation">:</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"have not define"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cmd <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>	<span class="token comment">//è·åç¬¬äºä¸ªåæ°</span>
	cmd<span class="token punctuation">.</span>Stdin <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdin
	cmd<span class="token punctuation">.</span>Stdout <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdout
	cmd<span class="token punctuation">.</span>Stderr <span class="token operator">=</span> os<span class="token punctuation">.</span>Stderr
	cmd<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ð ç¼è¯ç»æå¦ä¸ï¼</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ go run go-docker-1.go run <span class="token function">date</span>
<span class="token punctuation">[</span>C:<span class="token punctuation">\</span>Users<span class="token punctuation">\</span>smile<span class="token punctuation">\</span>AppData<span class="token punctuation">\</span>Local<span class="token punctuation">\</span>Temp<span class="token punctuation">\</span>go-build3158378218<span class="token punctuation">\</span>b001<span class="token punctuation">\</span>exe<span class="token punctuation">\</span>go-docker-1.exe run date<span class="token punctuation">]</span>
Tue Nov <span class="token number">15</span> <span class="token number">22</span>:07:19     <span class="token number">2022</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>æä»¬è¿è¡äº date ï¼æ¯ä¸æ¯è¯´å°±æ¯æä»¬ä½¿ç¨çæ¯date è¿ä¸ªæ¨¡å¼</strong></p>
<div class="custom-container tip"><p class="custom-container-title">è§å¯è¿ç¨</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>smile@DESKTOP-N9GOOM4 MINGW64 /d/ææ¡£/æè¿ç/awesome-docker/docs/code-docker-super/main <span class="token punctuation">(</span>master<span class="token punctuation">)</span>
$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> 
     <span class="token environment constant">UID</span>     PID    <span class="token environment constant">PPID</span>  TTY        STIME COMMAND
   smile    <span class="token number">1159</span>       <span class="token number">1</span> cons1    <span class="token number">22</span>:08:59 /usr/bin/bash
   smile    <span class="token number">1169</span>    <span class="token number">1159</span> cons1    <span class="token number">22</span>:09:10 /usr/bin/ps
   smile    <span class="token number">1139</span>       <span class="token number">1</span> cons0    <span class="token number">22</span>:07:02 /usr/bin/bash

smile@DESKTOP-N9GOOM4 MINGW64 /d/ææ¡£/æè¿ç/awesome-docker/docs/code-docker-super/main <span class="token punctuation">(</span>master<span class="token punctuation">)</span>
$ <span class="token function">ps</span> aut
      PID    <span class="token environment constant">PPID</span>    PGID     WINPID   TTY         <span class="token environment constant">UID</span>    STIME COMMAND
     <span class="token number">1159</span>       <span class="token number">1</span>    <span class="token number">1159</span>     <span class="token number">166668</span>  cons1     <span class="token number">197609</span> <span class="token number">22</span>:08:59 /usr/bin/bash
     <span class="token number">1174</span>    <span class="token number">1159</span>    <span class="token number">1174</span>     <span class="token number">174676</span>  cons1     <span class="token number">197609</span> <span class="token number">22</span>:09:35 /usr/bin/ps
     <span class="token number">1139</span>       <span class="token number">1</span>    <span class="token number">1139</span>     <span class="token number">176140</span>  cons0     <span class="token number">197609</span> <span class="token number">22</span>:07:02 /usr/bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>éåºåè¿å¥ï¼</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>smile@DESKTOP-N9GOOM4 MINGW64 /d/ææ¡£/æè¿ç/awesome-docker/docs/code-docker-super/main <span class="token punctuation">(</span>master<span class="token punctuation">)</span>
$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span>
     <span class="token environment constant">UID</span>     PID    <span class="token environment constant">PPID</span>  TTY        STIME COMMAND
   smile    <span class="token number">1194</span>    <span class="token number">1179</span> cons1    <span class="token number">22</span>:10:21 /usr/bin/ps
   smile    <span class="token number">1179</span>       <span class="token number">1</span> cons1    <span class="token number">22</span>:10:14 /usr/bin/bash
   smile    <span class="token number">1139</span>       <span class="token number">1</span> cons0    <span class="token number">22</span>:07:02 /usr/bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p>ç±æ­¤å¯ä»¥ç®åï¼æä»¬çä¸åè¿ç¨æ¯ä¸ä¸æ ·çï¼å¯ä»¥çè§£ä¸ºéç¼æ³~</p>
<h2 id="end-é¾æ¥" tabindex="-1"><a class="header-anchor" href="#end-é¾æ¥" aria-hidden="true">#</a> END é¾æ¥</h2>
<ul><li><div><a href = '0.md' style='float:left'>â¬ï¸ä¸ä¸èð  </a><a href = '2.md' style='float: right'>  ï¸ä¸ä¸èð</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">âï¸åå°ç®å½ð </RouterLink></p>
</li>
<li>
<p><a href="https://nsddd.top/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>ð«µåä¸è´¡ç®ðâ¤ï¸âð¥ð</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>â´ï¸çæå£°æ Â© ï¼æ¬ä¹¦ææåå®¹éµå¾ª<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0åè®®ï¼ç½²å-ç¸åæ¹å¼å±äº«ï¼Â©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


