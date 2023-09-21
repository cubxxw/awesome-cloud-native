<template><div><h2 id="⚡为什么要学习-docker" tabindex="-1"><a class="header-anchor" href="#⚡为什么要学习-docker" aria-hidden="true">#</a> ⚡为什么要学习 Docker？</h2>
<details class="custom-container details"><summary>为什么要学习docker？</summary>
<p>Docker 是世界领先的软件容器平台。
开发人员利用 Docker 可以消除协作编码时“在我的机器上可正常工作”的问题。
运维人员利用 Docker 可以在隔离容器中并行运行和管理应用，获得更好的计算密度。
企业利用 Docker 可以构建敏捷的软件交付管道，以更快的速度、更高的安全性和可靠的信誉为 Linux 和 Windows Server 应用发布新功能。</p>
</details>
<h2 id="🎈怎么学习docker" tabindex="-1"><a class="header-anchor" href="#🎈怎么学习docker" aria-hidden="true">#</a> 🎈怎么学习docker</h2>
<blockquote>
<p>学习docker之前最好有下面基础</p>
<ul>
<li>[x] <a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/web/README.md" target="_blank" rel="noopener noreferrer">计算机网络 – TCP/IP – 抓包 – Linux网络编程<ExternalLinkIcon/></a> （有一点网络基础就好）</li>
<li>[x] <a href="https://github.com/cubxxw/awesome-cs-course/blob/master/linux/README.md" target="_blank" rel="noopener noreferrer">有Linux的基础<ExternalLinkIcon/></a></li>
</ul>
<p><strong>编程语言不限</strong></p>
<ul>
<li>[x] <a href="https://go.nsddd.top" target="_blank" rel="noopener noreferrer">go语言docs<ExternalLinkIcon/></a></li>
</ul>
</blockquote>
<div class="custom-container danger"><p class="custom-container-title">提醒</p>
<p>⚠️ 注意：脑图页面可能没办法正常渲染，建议在下面📵<a href="https://xxw.nsddd.top/s/wRSz" target="_blank" rel="noopener noreferrer"><strong>不限速在线个人云盘</strong><ExternalLinkIcon/></a>里面找到docker脑图</p>
<p><a href="/markdown/%E8%84%91%E5%9B%BE%E7%AC%94%E8%AE%B0"> 🖱️脑图下载</a></p>
<p>图片当初是用sm图库，对于小时访问量有限制，后期会慢慢转到服务器中。</p>
</div>
<h2 id="🔮学完docker或许你可以试试这些" tabindex="-1"><a class="header-anchor" href="#🔮学完docker或许你可以试试这些" aria-hidden="true">#</a> 🔮学完docker或许你可以试试这些</h2>
<h3 id="建立你自己的docker" tabindex="-1"><a class="header-anchor" href="#建立你自己的docker" aria-hidden="true">#</a> 建立你自己的<code v-pre>Docker</code></h3>
<ul>
<li><a href="https://blog.lizzie.io/linux-containers-in-500-loc.html" target="_blank" rel="noopener noreferrer">🔱🔧🧰<strong>C</strong> ：500 行代码中的 Linux 容器<ExternalLinkIcon/></a></li>
<li><a href="https://www.infoq.com/articles/build-a-container-golang" target="_blank" rel="noopener noreferrer">🔱🔧🧰<strong>Go</strong> ：自己的构建包100 去构建自己的构建包<ExternalLinkIcon/></a></li>
<li><a href="https://www.youtube.com/watch?v=8fi7uSYlOdc" target="_blank" rel="noopener noreferrer">🔱🔧🧰<strong>Go</strong>：在 Go 中从头开始制造容器<ExternalLinkIcon/></a>[视频]</li>
<li><a href="https://github.com/Fewbytes/rubber-docker" target="_blank" rel="noopener noreferrer">🔱🔧🧰<strong>Python</strong>：Linux 容器研讨会：从头开始重构 Docker<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/tonybaloney/mocker" target="_blank" rel="noopener noreferrer">🔱🔧🧰<strong>Python</strong>：一个概念模仿Docker，用10% Python编写<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/p8952/bocker" target="_blank" rel="noopener noreferrer">🔱🔧🧰<strong>Shell</strong> ：Docker 在大约 100 行 bash 中实现<ExternalLinkIcon/></a></li>
</ul>
<h3 id="从docker进阶到k8s" tabindex="-1"><a class="header-anchor" href="#从docker进阶到k8s" aria-hidden="true">#</a> 从docker进阶到k8s</h3>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>⚠️ 正在更新⚡~关注等待~</p>
<ul>
<li><RouterLink to="/Cloud-Native-k8s/">k8s &amp; 云原生</RouterLink></li>
</ul>
</div>
<h3 id="💱安装docker" tabindex="-1"><a class="header-anchor" href="#💱安装docker" aria-hidden="true">#</a> 💱安装docker</h3>
<CodeGroup>
<CodeGroupItem title="ubuntu">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="centos">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<h2 id="🅱️最新补充" tabindex="-1"><a class="header-anchor" href="#🅱️最新补充" aria-hidden="true">#</a> 🅱️最新补充</h2>
<div class="custom-container warning"><p class="custom-container-title">温馨提示</p>
<p>这个板块是后面在使用<code v-pre>docker</code>慢慢补充的</p>
</div>
<p><RouterLink to="/markdown/41.html">💢🚝浅谈 linux 中的根文件系统（rootfs 的原理和介绍）</RouterLink></p>
<p><RouterLink to="/markdown/47.html">💢🚝补充：docker底层的内核：（rootfs / linux namespace / control groups）</RouterLink></p>
<p><RouterLink to="/markdown/42.html">💢🚝补充：Docker nginx篇</RouterLink></p>
<p><RouterLink to="/markdown/43.html">💢🚝补充：修改docker镜像的映射端口（如何修改镜像配置文件）</RouterLink></p>
<p><RouterLink to="/markdown/44.html">💢🚝补充：docker搭建Gitlab 服务器，Git版本控制流</RouterLink></p>
<p><RouterLink to="/markdown/45.html">💢🚝补充：docker搭建jenkins，CICD控制流）</RouterLink></p>
<p><RouterLink to="/markdown/46.html">💢🚝补充：docker网站迁移手段</RouterLink></p>
<h2 id="📚目录" tabindex="-1"><a class="header-anchor" href="#📚目录" aria-hidden="true">#</a> 📚目录</h2>
<p>🐋 1. <RouterLink to="/markdown/1.html">Docker概述</RouterLink></p>
<p>🐋 2. <RouterLink to="/markdown/2.html">docker系统架构</RouterLink></p>
<p>🐋 3. <RouterLink to="/markdown/3.html">docker和传统虚拟机</RouterLink></p>
<p>🐋 4. <RouterLink to="/markdown/4.html">docker安装</RouterLink></p>
<p>🐋 5. <RouterLink to="/markdown/5.html">在 Ubuntu 上安装 Docker 引擎</RouterLink></p>
<p>🐋 6. <RouterLink to="/markdown/6.html">Docker引擎（engine）详解</RouterLink></p>
<p>🐋 7. <RouterLink to="/markdown/7.html">镜像配置</RouterLink></p>
<p>🐋 8. <RouterLink to="/markdown/8.html">docker帮助启动类命令</RouterLink></p>
<p>🐋 9. <RouterLink to="/markdown/9.html">docker镜像命令</RouterLink></p>
<p>🐋 10. <RouterLink to="/markdown/10.html">ubuntu容器说明 — 容器的启动和运行</RouterLink></p>
<p>🐋 11. <RouterLink to="/markdown/11.html">深入理解镜像底层</RouterLink></p>
<p>🐋 12. <RouterLink to="/markdown/12.html">容器rootfs命令</RouterLink></p>
<p>🐋 13. <RouterLink to="/markdown/13.html">使用hub.docker</RouterLink></p>
<p>🐋 14. <RouterLink to="/markdown/14.html">容器数据卷</RouterLink></p>
<p>🐋 15. <RouterLink to="/markdown/15.html">docker基础篇最后补充-资源</RouterLink></p>
<p>🐋 16. <RouterLink to="/markdown/16.html">tomcat安装挂载</RouterLink></p>
<p>🐋 17. <RouterLink to="/markdown/17.html">docker安装MySQL</RouterLink></p>
<p>🐋 18. <RouterLink to="/markdown/18.html">docker安装redis</RouterLink></p>
<p>🐋 19. <RouterLink to="/markdown/19.html">Docker高级篇</RouterLink></p>
<p>🐋 20. <RouterLink to="/markdown/20.html">分布式存储之hash取余算法</RouterLink></p>
<p>🐋 21. <RouterLink to="/markdown/21.html">3主3从redis集群扩缩容配置案例说明</RouterLink></p>
<p>🐋 22. <RouterLink to="/markdown/22.html">redis主从扩容</RouterLink></p>
<p>🐋 23. <RouterLink to="/markdown/23.html">redis主从缩容</RouterLink></p>
<p>🐋 24. <RouterLink to="/markdown/24.html">DockerFile解析</RouterLink></p>
<p>🐋 25. <RouterLink to="/markdown/25.html">dockerfile保留字</RouterLink></p>
<p>🐋 26. <RouterLink to="/markdown/26.html">dockerfile案例</RouterLink></p>
<p>🐋 27. <RouterLink to="/markdown/27.html">虚悬镜像</RouterLink></p>
<p>🐋 28. <RouterLink to="/markdown/28.html">编写自定义镜像myubuntu</RouterLink></p>
<p>🐋 29. <RouterLink to="/markdown/29.html">Docker微服务实战</RouterLink></p>
<p>🐋 30. <RouterLink to="/markdown/30.html">docker 网络</RouterLink></p>
<p>🐋 31. <RouterLink to="/markdown/31.html">docker网络模式</RouterLink></p>
<p>🐋 32. <RouterLink to="/markdown/32.html">bridge是什么</RouterLink></p>
<p>🐋 33. <RouterLink to="/markdown/33.html">host是什么</RouterLink></p>
<p>🐋 34. <RouterLink to="/markdown/34.html">none是什么</RouterLink></p>
<p>🐋 35. <RouterLink to="/markdown/35.html">container是什么</RouterLink></p>
<p>🐋 36. <RouterLink to="/markdown/36.html">自定义网络格式</RouterLink></p>
<p>🐋 37. <RouterLink to="/markdown/37.html">Docker平台架构图解</RouterLink></p>
<p>🐋 38. <RouterLink to="/markdown/38.html">docker-compose容器编排</RouterLink></p>
<p>🐋 39. <RouterLink to="/markdown/39.html">Compose核心概念</RouterLink></p>
<p>🐋 40. <RouterLink to="/markdown/40.html">改造升级微服务工程docker_boot</RouterLink></p>
<hr>
<div class="custom-container danger"><p class="custom-container-title">继续往下看</p>
<p>下面是精心打造的菜鸟成长手册，覆盖有多广~~，喜欢请在GitHub仓库给个❤️ ，不胜感激</p>
</div>
<h1 id="菜鸟的成长手册⚡" tabindex="-1"><a class="header-anchor" href="#菜鸟的成长手册⚡" aria-hidden="true">#</a> 菜鸟的成长手册⚡</h1>
<h2 id="🧭导航" tabindex="-1"><a class="header-anchor" href="#🧭导航" aria-hidden="true">#</a> 🧭导航</h2>
<ul>
<li>
<p>🔍<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/wiki" target="_blank" rel="noopener noreferrer"><strong>快速指南(wike) — 仓库总结</strong><ExternalLinkIcon/></a></p>
</li>
<li>
<p>🔗<a href="https://gitee.com/xxw3293172751/Block_Chain" target="_blank" rel="noopener noreferrer"><strong>中国大陆加速地址（Gitee平台）</strong><ExternalLinkIcon/></a></p>
</li>
<li>
<p>📵<a href="https://xxw.nsddd.top/s/wRSz" target="_blank" rel="noopener noreferrer"><strong>不限速在线个人云盘</strong><ExternalLinkIcon/></a></p>
<p align='center'>
<a href="https://gitee.com/xxw3293172751/Block_Chain"><img src="https://img.shields.io/badge/gitee-%40xxw3293172751-green?logo=gitee" title="国内gitee镜像加速"></a>
<a href="https://wakatime.com/@3293172751/projects/hngzsvjxqc?start=2022-03-30&end=2022-04-05" title="项目的进展时长" > <img src="http://wakatime.com/badge/user/c445b3c6-a2bc-43a2-a24a-0828a17244b4/project/79cf7f10-4f61-42b7-92a8-dfc71cb99f4c.svg"></a>
<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/3293172751/cs-awesome-Block_Chain?style=plastic"></a>
<a href="https://xxw.nsddd.top/s/wRSz"><img alt="个人网盘不限速" src="https://img.shields.io/badge/cloud-xiongxinwei-red?logo=iCloud" title="个人网盘不限速下载浏览"></a>
</p>
</li>
</ul>
<div align="center">
	<a href = "https://github.com/cubxxw/awesome-cs-cloudnative-blockchain">🅱️GitHub</a>
	&emsp;&emsp; | &emsp;&emsp;
	<a href="https://interview.huihut.com">📚DocCub</a>
</div>
<div align="center">
	<a href = "readme_english.md">🔤English</a>
	&emsp;&emsp; | &emsp;&emsp;
	<a href = "README.md">🆑中文CN</a>
</div>
<br>
<details class="custom-container details"><summary>⚡ 点击（先看）</summary>
<p>⚠️ 这是一个菜鸟的成长记录，如果你也想成为工程师，想从事后端的相关工作，或者想了解区块链的相关知识，那么它可以帮助到你😎 —&gt;  <b>喜欢请给个⭐收藏~</b></p>
<p>🐧 喜欢Go语言的朋友欢迎加入Go语言自学群（QQ群号：141984758）~</p>
<p>⛓️ <b>区块链技术（也称之为分布式账本技术）</b>，是一种互联网数据库技术，其特点是<font color ="gree">去中心化，公开透明，信息不可篡改性，隐私匿名性🤑</font><a href="https://github.com/kubecub">CUB链学社</a>致力打造<b>区块链自学教育平台。</b></p>
<p>💡 侧边目录支持方式：<a href="https://interview.huihut.com" target="_blank" rel="noopener noreferrer">📚 DocCub 文档<ExternalLinkIcon/></a>、<a href="https://github.com/jawil/GayHub" target="_blank" rel="noopener noreferrer">Github + TOC 导航<ExternalLinkIcon/></a>（<a href="https://gitee.com/huihut/interview/raw/master/images/TOC%E9%A2%84%E8%A7%88.png" target="_blank" rel="noopener noreferrer">TOC预览.png<ExternalLinkIcon/></a>）</p>
<p>📄 保存为 PDF 方式：使用 Chrome 浏览器打开 <a href="https://interview.huihut.com">📚 DocCub 文档</a> 页面，缩起左侧目录-右键 - 打印 - 选择目标打印机是另存为PDF - 保存（<a href="https://gitee.com/huihut/interview/raw/master/images/%E6%89%93%E5%8D%B0%E9%A2%84%E8%A7%88.png" target="_blank" rel="noopener noreferrer">打印预览.png<ExternalLinkIcon/></a>）</p>
<p>🙏 仓库内容如有错误或改进欢迎 <a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/issues/new/choose" target="_blank" rel="noopener noreferrer">issue<ExternalLinkIcon/></a> 或 pr，建议或讨论可在 <a href="https://github.com/huihut/interview/issues/12" target="_blank" rel="noopener noreferrer">#12<ExternalLinkIcon/></a> 提出。由于本人水平有限，仓库中的知识点有来自本人原创、读书笔记、书籍、博文等，非原创均已标明出处，如有遗漏，请 <a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/issues/new/choose" target="_blank" rel="noopener noreferrer">issue<ExternalLinkIcon/></a> 提出。本仓库遵循 <a href="https://github.com/huihut/interview/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">CC BY-NC-SA 4.0（署名 - 非商业性使用 - 相同方式共享）<ExternalLinkIcon/></a> 协议，转载请注明出处，不得用于商业目的。</p>
</details>
<h2 id="📖go语言" tabindex="-1"><a class="header-anchor" href="#📖go语言" aria-hidden="true">#</a> 📖Go语言</h2>
<h4 id="🏷️前言" tabindex="-1"><a class="header-anchor" href="#🏷️前言" aria-hidden="true">#</a> 🏷️前言</h4>
<p><code v-pre>Go</code>语言的学习参考官网文档<a href="https://golang.org/#" target="_blank" rel="noopener noreferrer">go语言官方编程指南<ExternalLinkIcon/></a>，如何找到合适的Go语言学习路线<RouterLink to="/go-advancend/go_route.html">Go语言路线</RouterLink>。</p>
<div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
程序员基本素养 <span class="token arrow operator">==></span> Go基础篇 <span class="token arrow operator">==></span>开发必备技术 <span class="token arrow operator">==></span> Go进阶100篇 <span class="token arrow operator">==></span> Go高级篇章 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>🔱<a href="https://golang.org/#" target="_blank" rel="noopener noreferrer">go语言官方编程指南<ExternalLinkIcon/></a></li>
<li>🚧<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/go-advancend/go_route.md" target="_blank" rel="noopener noreferrer">Go语言路线<ExternalLinkIcon/></a></li>
</ul>
<h4 id="🔖核心" tabindex="-1"><a class="header-anchor" href="#🔖核心" aria-hidden="true">#</a> 🔖核心</h4>
<p><strong>Go语言的核心编程篇，基础部分30天记录，100篇进阶，还有正在进展的高级篇~</strong></p>
<ul>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/TOC.md" target="_blank" rel="noopener noreferrer">🖱️GO 基础部分🔥<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/go-web" target="_blank" rel="noopener noreferrer">🖱️GO web框架<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/Gomd_super/README.md" target="_blank" rel="noopener noreferrer">🖱️Go语言100篇进阶🔥<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/go-advancend/README.md" target="_blank" rel="noopener noreferrer">🖱️Go 高级篇<ExternalLinkIcon/></a></li>
</ul>
<h4 id="📝补充" tabindex="-1"><a class="header-anchor" href="#📝补充" aria-hidden="true">#</a> 📝补充</h4>
<p><code v-pre>mod</code>包是<code v-pre>Go</code>语言2018年推出的包管理工具，并会一直延续下去。命名规范以及项目目录结构📇的设定对于一名合格的工程师来说也是非常重要的。下面是作为一名合格的开发者🤵，必须要会的基本素养。</p>
<ul>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/Gomd_super/mod.md" target="_blank" rel="noopener noreferrer">🖱️Go语言包管理工具 — mod包<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/Gomd_super/go-air.md" target="_blank" rel="noopener noreferrer">🖱️Go-air实现热加载编译<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/Gomd_super/name.md" target="_blank" rel="noopener noreferrer">🖱️命名规则和代码规范<ExternalLinkIcon/></a></li>
<li>🖱️<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/Gomd_super/catalogue.md" target="_blank" rel="noopener noreferrer">Go语言目录结构<ExternalLinkIcon/></a></li>
<li>🖱️<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/Gomd_super/go_file.md" target="_blank" rel="noopener noreferrer">Go文件以及编码处理<ExternalLinkIcon/></a></li>
<li>🖱️<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/Gomd_super/zhenze.md" target="_blank" rel="noopener noreferrer">正则表达式<ExternalLinkIcon/></a></li>
<li>🖱️<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/Gomd_super/bitwise.md" target="_blank" rel="noopener noreferrer">位运算技巧<ExternalLinkIcon/></a></li>
</ul>
<blockquote>
<p>Go语言一些其他的网站和博客，值得一看</p>
<ul>
<li><a href="https://www.topgoer.cn/docs/gomianshiti/mianshiti" target="_blank" rel="noopener noreferrer">Go语言面试题<ExternalLinkIcon/></a></li>
<li><a href="http://word.topgoer.com/" target="_blank" rel="noopener noreferrer">Go语言中文官方文档<ExternalLinkIcon/></a></li>
<li><a href="http://wen.topgoer.com/docs/gozhuanjia/gogfjhk" target="_blank" rel="noopener noreferrer">Go语言专家编程地址<ExternalLinkIcon/></a></li>
</ul>
</blockquote>
<h2 id="📚cs系列" tabindex="-1"><a class="header-anchor" href="#📚cs系列" aria-hidden="true">#</a> 📚CS系列</h2>
<p>CS 系列选自<a href="https://github.com/cubxxw/awesome-cs-course" target="_blank" rel="noopener noreferrer">🎉awesome-cs-course<ExternalLinkIcon/></a>，内容涵盖 计算机操作系统、csapp系列、算法和数据结构、计算机网络、<code v-pre>linux</code>、<code v-pre>java</code>、<code v-pre>python</code>、<code v-pre>C/C++</code>、<code v-pre>vuepress</code>、<code v-pre>gitbook</code>、<code v-pre>nodejs</code>、<code v-pre>vuejs</code>、<code v-pre>halo</code>、<code v-pre>redis</code>、<code v-pre>hugo</code>、<code v-pre>nginx</code>、<code v-pre>nosql</code>、<code v-pre>mysql</code>、<code v-pre>JavaScript</code>、<code v-pre>git</code>、<code v-pre>markdown</code>、<code v-pre>web</code>前端等笔记，更多移步到<a href="https://github.com/cubxxw/awesome-cs-course" target="_blank" rel="noopener noreferrer">AWESOME系列CS仓库地址<ExternalLinkIcon/></a></p>
<ul>
<li><a href="https://github.com/cubxxw/awesome-cs-course/blob/master/java/README.md" target="_blank" rel="noopener noreferrer">Java全册☕<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/%E6%B1%87%E7%BC%96/README.md" target="_blank" rel="noopener noreferrer">汇编学习🔥<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B&amp;%E7%B3%BB%E7%BB%9F%E8%AE%BE%E8%AE%A1%E5%92%8C%E6%9E%B6%E6%9E%84/README.md" target="_blank" rel="noopener noreferrer">软件工程<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/LeetCode/" target="_blank" rel="noopener noreferrer">算法与数据结构（LeetCode刷题记录）🔥<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/web/README.md" target="_blank" rel="noopener noreferrer">计算机网络🔥<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/os" target="_blank" rel="noopener noreferrer">操作系统 — OS🔥<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/cs/README.md" target="_blank" rel="noopener noreferrer">CS必须要会的技术🔥<ExternalLinkIcon/></a></li>
</ul>
<h2 id="📘开发必备技术" tabindex="-1"><a class="header-anchor" href="#📘开发必备技术" aria-hidden="true">#</a> 📘开发必备技术</h2>
<p>🧋参与普通程序的开发或者是区块链⛓️开发必须<a href="https://github.com/cubxxw/awesome-cs-course/blob/master/linux/README.md" target="_blank" rel="noopener noreferrer">熟悉Linux指令<ExternalLinkIcon/></a>，熟悉<a href="https://github.com/cubxxw/awesome-cs-course/blob/master/Git/README.md" target="_blank" rel="noopener noreferrer">git团队开发<ExternalLinkIcon/></a>，基于<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/docker/README.md" target="_blank" rel="noopener noreferrer">docker容器<ExternalLinkIcon/></a>会让我门快速的搭建工具和环境，更好的迁移开发环境和迁移链码（blockcode)，<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/cryptology/README.md" target="_blank" rel="noopener noreferrer">密码学和信息安全<ExternalLinkIcon/></a>不仅仅是区块链工程师必须要学习的技术，更是IT从业者未来不可或缺的技术。我们都渴望系统能更加的安全不是吗📵。</p>
<ul>
<li>🖱️ <a href="https://github.com/cubxxw/awesome-cs-course/blob/master/linux/README.md" target="_blank" rel="noopener noreferrer">linux从入门到精通🔥<ExternalLinkIcon/></a></li>
<li>🖱️ <a href="https://github.com/cubxxw/awesome-cs-course/blob/master/Git/README.md" target="_blank" rel="noopener noreferrer">Git—必备神器🔥<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/docker/README.md" target="_blank" rel="noopener noreferrer">🖱️ Docker入门到进阶🔥<ExternalLinkIcon/></a>  ➡️➡️   <a href="https://3293172751.github.io/awesome-docker/markdown" target="_blank" rel="noopener noreferrer">📘DocCub–docker book地址<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/cryptology/README.md" target="_blank" rel="noopener noreferrer">🖱️ 密码学和信息安全🔥<ExternalLinkIcon/></a></li>
</ul>
<h2 id="📔区块链导航" tabindex="-1"><a class="header-anchor" href="#📔区块链导航" aria-hidden="true">#</a> 📔区块链导航</h2>
<p>我认为世界历史可以用两句话来描述：分久必合，合久必分。区块链将是催化下一个‘合久必分’时代的新技术。区块链的产生铸就了一个新的时代，我们的信念是建筑在一个数学的算法上面，In math we trust。 ——张首晟</p>
<p>从事区块链，需要哪些基础知识，看下<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/C_Universal_Brockchain%5Cchain.md" target="_blank" rel="noopener noreferrer">区块链开发需要什么<ExternalLinkIcon/></a> ，你需要一份<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/blockchain/route.md" target="_blank" rel="noopener noreferrer">区块链工程师路线<ExternalLinkIcon/></a>，或许你可以在一些区块链项目中找到灵感<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/blockchain/%E5%8C%BA%E5%9D%97%E9%93%BE%E5%85%AC%E7%9B%8A%E9%A1%B9%E7%9B%AE/README.md" target="_blank" rel="noopener noreferrer">🔗区块链公益项目（NFT+私链/联盟链/私链）<ExternalLinkIcon/></a>。区块链的<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/blockchain/README.md" target="_blank" rel="noopener noreferrer">共识算法<ExternalLinkIcon/></a>是怎么实现的呢?</p>
<ul>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/blockchain/route.md" target="_blank" rel="noopener noreferrer">🔗区块链工程师路线<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/C_Universal_Brockchain%5Cchain.md" target="_blank" rel="noopener noreferrer">🔗区块链开发需要什么❓<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/blockchain/%E5%8C%BA%E5%9D%97%E9%93%BE%E5%85%AC%E7%9B%8A%E9%A1%B9%E7%9B%AE/README.md" target="_blank" rel="noopener noreferrer">🔗区块链公益项目（NFT+私链/联盟链/私链）<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/blockchain/README.md" target="_blank" rel="noopener noreferrer">🔗共识算法——Go语言实现<ExternalLinkIcon/></a></li>
</ul>
<h2 id="🅱️区块链教程" tabindex="-1"><a class="header-anchor" href="#🅱️区块链教程" aria-hidden="true">#</a> 🅱️区块链教程</h2>
<p>💱 区块链系列包含了区块链教程，主要是<code v-pre>eth</code>、<code v-pre>btc</code>还有联盟链<code v-pre>fabric</code>超级账本组织的教程，基于这些教程扩展新的技术：<code v-pre>git</code>、<code v-pre>ipfs</code>、密码学、共识算法。以及链学项目<a href="https://github.com/kubecub" target="_blank" rel="noopener noreferrer">C-Universal Blockchain<ExternalLinkIcon/></a></p>
<blockquote>
<p>以太坊和比特币一样，底层框架都是区块链协议，区块链本质上是一个应用了密码学技术的分布式数据库系统。建议看一下<strong>以太坊白皮书（需要有golang编程基础）</strong></p>
<div align="center">
<a href="eth/TOC.md">
	<img src="http://sm.nsddd.top//typora/image-20220630192622583.png?mail:3293172751@qq.com" alt="区块链的学习" style="zoom: 20%;" />
</a></div>
</blockquote>
<ul>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/C_Universal_Brockchain/README.md" target="_blank" rel="noopener noreferrer">🖱️区块链教程🔥<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/eth/TOC.md" target="_blank" rel="noopener noreferrer">🖱️ETH and BTC<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/chainbrock-learning/SUMMARY.md" target="_blank" rel="noopener noreferrer">🖱️区块链技术指南<ExternalLinkIcon/></a></li>
</ul>
<blockquote>
<p>企业级<a href="https://learnblockchain.cn/books/enterprise/" target="_blank" rel="noopener noreferrer">区块链实战教程<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="🗃️项目" tabindex="-1"><a class="header-anchor" href="#🗃️项目" aria-hidden="true">#</a> 🗃️项目</h3>
<blockquote>
<p><strong>c-universal blockchain（CUB-链学）</strong></p>
<div align="center">
<a href="https://github.com/kubecub">
	<img src="http://sm.nsddd.top//typora/twitter_header_photo_1.png?mail:3293172751@qq.com" alt="twitter_header_photo_1" style="zoom: 20%;" />
</a></div>
<p>基于区块链的全民学习平台<code v-pre>C-Universal Blockchain</code>在保障用户安全，信息的完整性同时为大众带来更多的选择，笔记分享，视频分享，版权保护，以及其他的关于学信数据、电子证书、荣誉证明、成绩证明、信息授权的相关工具。</p>
</blockquote>
<ul>
<li><s><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master" target="_blank" rel="noopener noreferrer">🖱️GLinux内核(未开始)<ExternalLinkIcon/></a></s></li>
<li><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/blob/master/C_Universal_Brockchain/README.md" target="_blank" rel="noopener noreferrer">🖱️C-Universal Brockchain<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubecub" target="_blank" rel="noopener noreferrer">🖱️C-Universal Brockchain（链学）组织地址<ExternalLinkIcon/></a></li>
</ul>
<h2 id="✨参与贡献💕" tabindex="-1"><a class="header-anchor" href="#✨参与贡献💕" aria-hidden="true">#</a> ✨参与贡献💕</h2>
<p><strong><a href="https://nsddd.top/archives/contributors" target="_blank" rel="noopener noreferrer">🫵参与贡献💖❤️‍🩹💓💞<ExternalLinkIcon/></a></strong></p>
<p><strong>要求：</strong></p>
<ul>
<li><a href="https://github.com/cubxxw/awesome-cs-course/blob/master/markdown/README.md" target="_blank" rel="noopener noreferrer">你需要学会使用markdown🖱️<ExternalLinkIcon/></a></li>
<li><a href="https://zh-google-styleguide.readthedocs.io/en/latest/google-cpp-styleguide/" target="_blank" rel="noopener noreferrer">符合Google代码规范<ExternalLinkIcon/></a></li>
</ul>
<p>如果你也想对本项目做出贡献，那么你可以先把该项目进行 <a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/fork" target="_blank" rel="noopener noreferrer">fork<ExternalLinkIcon/></a>或者 <code v-pre>git clone</code> 到本地（推荐先用 <a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/fork" target="_blank" rel="noopener noreferrer">fock<ExternalLinkIcon/></a>到自己仓库，然后再clone到本地，对本地进行操作，最后从自己仓库贡献，然后自己建立一个分支 <code v-pre>your-branch</code>，然后上传资料到 对应目录 下，图片信息可以上传到<code v-pre> /images</code>，然后更新 <code v-pre>README</code>。</p>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<h2 id="recent-activity" tabindex="-1"><a class="header-anchor" href="#recent-activity" aria-hidden="true">#</a> <a href="https://repography.com" target="_blank" rel="noopener noreferrer"><img src="https://images.repography.com/logo.svg" alt="Repography logo"><ExternalLinkIcon/></a> / Recent activity <a href="https://repography.com" target="_blank" rel="noopener noreferrer"><img src="https://images.repography.com/26892425/3293172751/Block_Chain/recent-activity/04864df8cf8f1f104b2b9453e0b47498_badge.svg" alt="Time period"><ExternalLinkIcon/></a></h2>
<p><img src="https://repobeats.axiom.co/api/embed/7053fe17b2bd9f88a0015474635e09cff7dc1ee2.svg" alt="Alt" title="Repobeats analytics image"></p>
<p><a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/commits" target="_blank" rel="noopener noreferrer"><img src="https://images.repography.com/26892425/3293172751/Block_Chain/recent-activity/04864df8cf8f1f104b2b9453e0b47498_timeline.svg" alt="Timeline graph"><ExternalLinkIcon/></a>
<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/issues" target="_blank" rel="noopener noreferrer"><img src="https://images.repography.com/26892425/3293172751/Block_Chain/recent-activity/04864df8cf8f1f104b2b9453e0b47498_issues.svg" alt="Issue status graph"><ExternalLinkIcon/></a>
<a href="https://github.com/cubxxw/awesome-cs-cloudnative-blockchain/pulls" target="_blank" rel="noopener noreferrer"><img src="https://images.repography.com/26892425/3293172751/Block_Chain/recent-activity/04864df8cf8f1f104b2b9453e0b47498_prs.svg" alt="Pull request status graph"><ExternalLinkIcon/></a>
<img src="https://images.repography.com/26892425/3293172751/Block_Chain/recent-activity/04864df8cf8f1f104b2b9453e0b47498_words.svg" alt="Trending topics"></p>
<h2 id="版权声明-©" tabindex="-1"><a class="header-anchor" href="#版权声明-©" aria-hidden="true">#</a> 版权声明 ©</h2>
<p><a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer"><img src="http://sm.nsddd.top//typora/cs-awesome-Block_Chain?mail:3293172751@qq.com" alt="GitHub license"><ExternalLinkIcon/></a></p>
<p>本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</div></template>
