<template><div><ul>
<li><a href="https://github.com/3293172751/awesome-cloud-native" target="_blank" rel="noopener noreferrer">🔥 开源地址<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第3节-makefile" tabindex="-1"><a class="header-anchor" href="#第3节-makefile" aria-hidden="true">#</a> 第3节 makefile</h1>
<br>
<div><a href = '2.md' style='float:left'>⬆️上一节🔗  </a><a href = '4.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕实现当初学习docker的愿望，自己撸一个docker，为云原生开发充实基础。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#makefile">makefile</router-link></li><li><router-link to="#this-is-the-table-of-contents">This is the table of contents</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="makefile" tabindex="-1"><a class="header-anchor" href="#makefile" aria-hidden="true">#</a> makefile</h2>
<p>在大工程中随处可见~</p>
<p><em>sealer、docker、kubernetes、k3s……</em></p>
<p><strong>我们需要将这些程序丢到 bin 目录下面直接执行而不是 <code v-pre>go run</code> 执行。</strong></p>
<div class="custom-container tip"><p class="custom-container-title">强推 跟我一起写Makefile</p>
<p>https://seisman.github.io/how-to-write-makefile/overview.html</p>
</div>
<h2 id="this-is-the-table-of-contents" tabindex="-1"><a class="header-anchor" href="#this-is-the-table-of-contents" aria-hidden="true">#</a> This is the table of contents</h2>
<ul>
<li>概述
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/overview.html#id2" target="_blank" rel="noopener noreferrer">关于程序的编译和链接<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>makefile介绍
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#id1" target="_blank" rel="noopener noreferrer">makefile的规则<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#id2" target="_blank" rel="noopener noreferrer">一个示例<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#make" target="_blank" rel="noopener noreferrer">make是如何工作的<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#id3" target="_blank" rel="noopener noreferrer">makefile中使用变量<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#id4" target="_blank" rel="noopener noreferrer">让make自动推导<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#makefiles" target="_blank" rel="noopener noreferrer">另类风格的makefiles<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#id5" target="_blank" rel="noopener noreferrer">清空目标文件的规则<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#id6" target="_blank" rel="noopener noreferrer">Makefile里有什么？<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#id7" target="_blank" rel="noopener noreferrer">Makefile的文件名<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#id8" target="_blank" rel="noopener noreferrer">引用其它的Makefile<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#id9" target="_blank" rel="noopener noreferrer">环境变量MAKEFILES<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/introduction.html#id10" target="_blank" rel="noopener noreferrer">make的工作方式<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>书写规则
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/rules.html#id2" target="_blank" rel="noopener noreferrer">规则举例<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/rules.html#id3" target="_blank" rel="noopener noreferrer">规则的语法<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/rules.html#id4" target="_blank" rel="noopener noreferrer">在规则中使用通配符<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/rules.html#id5" target="_blank" rel="noopener noreferrer">文件搜寻<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/rules.html#id6" target="_blank" rel="noopener noreferrer">伪目标<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/rules.html#id7" target="_blank" rel="noopener noreferrer">多目标<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/rules.html#id8" target="_blank" rel="noopener noreferrer">静态模式<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/rules.html#id9" target="_blank" rel="noopener noreferrer">自动生成依赖性<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>书写命令
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/recipes.html#id2" target="_blank" rel="noopener noreferrer">显示命令<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/recipes.html#id3" target="_blank" rel="noopener noreferrer">命令执行<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/recipes.html#id4" target="_blank" rel="noopener noreferrer">命令出错<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/recipes.html#make" target="_blank" rel="noopener noreferrer">嵌套执行make<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/recipes.html#id5" target="_blank" rel="noopener noreferrer">定义命令包<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>使用变量
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/variables.html#id2" target="_blank" rel="noopener noreferrer">变量的基础<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/variables.html#id3" target="_blank" rel="noopener noreferrer">变量中的变量<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/variables.html#id4" target="_blank" rel="noopener noreferrer">变量高级用法<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/variables.html#id5" target="_blank" rel="noopener noreferrer">追加变量值<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/variables.html#override" target="_blank" rel="noopener noreferrer">override 指示符<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/variables.html#id6" target="_blank" rel="noopener noreferrer">多行变量<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/variables.html#id7" target="_blank" rel="noopener noreferrer">环境变量<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/variables.html#id8" target="_blank" rel="noopener noreferrer">目标变量<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/variables.html#id9" target="_blank" rel="noopener noreferrer">模式变量<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>使用条件判断
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/conditionals.html#id2" target="_blank" rel="noopener noreferrer">示例<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/conditionals.html#id3" target="_blank" rel="noopener noreferrer">语法<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>使用函数
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#id2" target="_blank" rel="noopener noreferrer">函数的调用语法<ExternalLinkIcon/></a></li>
<li>字符串处理函数
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#subst" target="_blank" rel="noopener noreferrer">subst<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#patsubst" target="_blank" rel="noopener noreferrer">patsubst<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#strip" target="_blank" rel="noopener noreferrer">strip<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#findstring" target="_blank" rel="noopener noreferrer">findstring<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#filter" target="_blank" rel="noopener noreferrer">filter<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#filter-out" target="_blank" rel="noopener noreferrer">filter-out<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#sort" target="_blank" rel="noopener noreferrer">sort<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#word" target="_blank" rel="noopener noreferrer">word<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#wordlist" target="_blank" rel="noopener noreferrer">wordlist<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#words" target="_blank" rel="noopener noreferrer">words<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#firstword" target="_blank" rel="noopener noreferrer">firstword<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>文件名操作函数
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#dir" target="_blank" rel="noopener noreferrer">dir<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#notdir" target="_blank" rel="noopener noreferrer">notdir<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#suffix" target="_blank" rel="noopener noreferrer">suffix<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#basename" target="_blank" rel="noopener noreferrer">basename<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#addsuffix" target="_blank" rel="noopener noreferrer">addsuffix<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#addprefix" target="_blank" rel="noopener noreferrer">addprefix<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#join" target="_blank" rel="noopener noreferrer">join<ExternalLinkIcon/></a></li>
</ul>
</li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#foreach" target="_blank" rel="noopener noreferrer">foreach 函数<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#if" target="_blank" rel="noopener noreferrer">if 函数<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#call" target="_blank" rel="noopener noreferrer">call函数<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#origin" target="_blank" rel="noopener noreferrer">origin函数<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#shell" target="_blank" rel="noopener noreferrer">shell函数<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/functions.html#make" target="_blank" rel="noopener noreferrer">控制make的函数<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>make 的运行
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/invoke.html#id1" target="_blank" rel="noopener noreferrer">make的退出码<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/invoke.html#makefile" target="_blank" rel="noopener noreferrer">指定Makefile<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/invoke.html#id2" target="_blank" rel="noopener noreferrer">指定目标<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/invoke.html#id3" target="_blank" rel="noopener noreferrer">检查规则<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/invoke.html#id4" target="_blank" rel="noopener noreferrer">make的参数<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>隐含规则
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id2" target="_blank" rel="noopener noreferrer">使用隐含规则<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id3" target="_blank" rel="noopener noreferrer">隐含规则一览<ExternalLinkIcon/></a></li>
<li>隐含规则使用的变量
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id5" target="_blank" rel="noopener noreferrer">关于命令的变量。<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id6" target="_blank" rel="noopener noreferrer">关于命令参数的变量<ExternalLinkIcon/></a></li>
</ul>
</li>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id7" target="_blank" rel="noopener noreferrer">隐含规则链<ExternalLinkIcon/></a></li>
<li>定义模式规则
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id9" target="_blank" rel="noopener noreferrer">模式规则介绍<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id10" target="_blank" rel="noopener noreferrer">模式规则示例<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id11" target="_blank" rel="noopener noreferrer">自动化变量<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id12" target="_blank" rel="noopener noreferrer">模式的匹配<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id13" target="_blank" rel="noopener noreferrer">重载内建隐含规则<ExternalLinkIcon/></a></li>
</ul>
</li>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id14" target="_blank" rel="noopener noreferrer">老式风格的“后缀规则”<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/implicit_rules.html#id15" target="_blank" rel="noopener noreferrer">隐含规则搜索算法<ExternalLinkIcon/></a></li>
</ul>
</li>
<li>使用make更新函数库文件
<ul>
<li><a href="https://seisman.github.io/how-to-write-makefile/archives.html#id1" target="_blank" rel="noopener noreferrer">函数库文件的成员<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/archives.html#id2" target="_blank" rel="noopener noreferrer">函数库成员的隐含规则<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/archives.html#id3" target="_blank" rel="noopener noreferrer">函数库文件的后缀规则<ExternalLinkIcon/></a></li>
<li><a href="https://seisman.github.io/how-to-write-makefile/archives.html#id4" target="_blank" rel="noopener noreferrer">注意事项<ExternalLinkIcon/></a></li>
</ul>
</li>
<li><a href="https://seisman.github.io/how-to-write-makefile/postscript.html" target="_blank" rel="noopener noreferrer">后序<ExternalLinkIcon/></a></li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '2.md' style='float:left'>⬆️上一节🔗  </a><a href = '4.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


