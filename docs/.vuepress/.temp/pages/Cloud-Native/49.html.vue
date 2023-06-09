<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第49节-在-sealos-上开发一款-ai-自动云原生化项目自动上线工具" tabindex="-1"><a class="header-anchor" href="#第49节-在-sealos-上开发一款-ai-自动云原生化项目自动上线工具" aria-hidden="true">#</a> 第49节 在 Sealos 上开发一款 AI 自动云原生化项目自动上线工具</h1>
<div><a href = '48.md' style='float:left'>⬆️上一节🔗  </a><a href = '50.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<ul>
<li><a href="https://summer-ospp.ac.cn/org/prodetail/23ab80139?lang=zh&amp;list=pro" target="_blank" rel="noopener noreferrer">项目主页<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/labring/sealos" target="_blank" rel="noopener noreferrer">GitHub 地址<ExternalLinkIcon/></a></li>
</ul>
<h3 id="技术领域" tabindex="-1"><a class="header-anchor" href="#技术领域" aria-hidden="true">#</a> 技术领域：</h3>
<p>熟悉 golang、Docker、kubernetes 等技术，了解 chatGPT、autoGPT 等AI技术的使用</p>
<h3 id="开源协议" tabindex="-1"><a class="header-anchor" href="#开源协议" aria-hidden="true">#</a> 开源协议：</h3>
<ul>
<li>apache-2</li>
</ul>
<h3 id="项目简述" tabindex="-1"><a class="header-anchor" href="#项目简述" aria-hidden="true">#</a> 项目简述：</h3>
<p><strong>项目背景:</strong></p>
<p>不论懂不懂云原生，写 Dockerfile 以及 yaml 文件都是一件非常痛苦的事，如果 AI 能自动帮我们解决这个问题将会价值巨大。</p>
<p><strong>项目描述:</strong></p>
<p>输入一个任意的 github 仓库地址，通过 AI 能力自动为其生成 Dockerfile 和 kubernetes 编排配置文件，并自动在 sealos 上运行。</p>
<p>AI 生成的不一定第一次就能生成非常准确的配置，首先需要可以把自动构建的错误信息返回给 AI 并让 AI 自动修复，也需要人给 AI 一些反馈信息把没有期望发生的现象反馈给 AI 让 AI 来调整。</p>
<p>最终把生成的内容 PR 回仓库，后续就可以实现完全自动化上线了。</p>
<h2 id="产出要求" tabindex="-1"><a class="header-anchor" href="#产出要求" aria-hidden="true">#</a> 产出要求</h2>
<ol>
<li>源代码，技术文档，线上服务以及测试报告</li>
<li>提供能力的源码与文档并合并到主仓库</li>
<li>功能可以正常在 sealos 上线并运行</li>
<li>提供测试报告</li>
</ol>
<h2 id="什么是-auto-gpt" tabindex="-1"><a class="header-anchor" href="#什么是-auto-gpt" aria-hidden="true">#</a> 什么是 Auto-GPT</h2>
<ul>
<li><RouterLink to="/Cloud-Native/50.html">详细介绍</RouterLink></li>
</ul>
<h2 id="go-gpt3" tabindex="-1"><a class="header-anchor" href="#go-gpt3" aria-hidden="true">#</a> go-gpt3</h2>
<p>go-gpt3 是一个 OpenAI GPT-3 API 客户端，使 <code v-pre>Go/Golang</code> 程序能够与 <code v-pre>gpt3 API</code> 进行交互。</p>
<p>支持使用带或不带流式处理的完成 API。</p>
<h3 id="user" tabindex="-1"><a class="header-anchor" href="#user" aria-hidden="true">#</a> user</h3>
<p>调用主 gpt-3 API 的简单用法，完成：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>client <span class="token operator">:=</span> gpt3<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span>apiKey<span class="token punctuation">)</span>
resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Completion</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> gpt3<span class="token punctuation">.</span>CompletionRequest<span class="token punctuation">{</span>
    Prompt<span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"2, 3, 5, 7, 11,"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Choices<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text<span class="token punctuation">)</span>
<span class="token comment">// prints " 13, 17, 19, 23, 29, 31", etc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="documentation" tabindex="-1"><a class="header-anchor" href="#documentation" aria-hidden="true">#</a> Documentation</h3>
<p>尝试这些示例中的任何一种，将内容放入 <code v-pre>main.go</code> 并运行 <code v-pre>go run main.go</code> 。我建议使用 go 模块，在这种情况下，您还需要在测试存储库中运行 <code v-pre>go mod init</code> 。或者，您可以克隆此存储库并使用 <code v-pre>go run cmd/test/main.go</code> 运行测试脚本。</p>
<p>但是我们知道，我们如果希望运行 chatgpt ，我们期望有一个 API</p>
<p>这是和 AutoGPT 一样的：</p>
<p>如下所示的 <code v-pre>.env</code> 文件才能使用这些示例：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>API_KEY<span class="token operator">=</span><span class="token operator">&lt;</span>openAI API Key<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>💡简单的一个案例如下：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"log"</span>
	<span class="token string">"os"</span>

	<span class="token string">"github.com/PullRequestInc/go-gpt3"</span>
	<span class="token string">"github.com/joho/godotenv"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	godotenv<span class="token punctuation">.</span><span class="token function">Load</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	apiKey <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Getenv</span><span class="token punctuation">(</span><span class="token string">"API_KEY"</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> apiKey <span class="token operator">==</span> <span class="token string">""</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span><span class="token string">"Missing API KEY"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	ctx <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	client <span class="token operator">:=</span> gpt3<span class="token punctuation">.</span><span class="token function">NewClient</span><span class="token punctuation">(</span>apiKey<span class="token punctuation">)</span>

	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Completion</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> gpt3<span class="token punctuation">.</span>CompletionRequest<span class="token punctuation">{</span>
		Prompt<span class="token punctuation">:</span>    <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"The first thing you should know about javascript is"</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		MaxTokens<span class="token punctuation">:</span> gpt3<span class="token punctuation">.</span><span class="token function">IntPtr</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
		Stop<span class="token punctuation">:</span>      <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">"."</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
		Echo<span class="token punctuation">:</span>      <span class="token boolean">true</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		log<span class="token punctuation">.</span><span class="token function">Fatalln</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Choices<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Text<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过 <code v-pre>os.Getenv</code> 获取到环境变量的值，其中的环境变量使用的是 <code v-pre>API_KEY</code> 来进行设置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">API_KEY</span><span class="token operator">=</span><span class="token string">"**********************************"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>I want Auto-GPT to: 根据https://github.com/go-gitea/gitea的GitHub仓库地址，生成可以供 Kubernetes 使用的 yaml 文件或者是 dockerfile 使用的 dockerfile 文件，生成yaml文件保存本地后退出
GitOpsGPT  has been created with the following details:
Name:  GitOpsGPT
Role:  an AI agent that automates the process of generating Kubernetes yaml files or Dockerfiles from a given GitHub repository URL, and saves the generated files locally.
Goals: 
-  Analyze the repository and identify the appropriate language and framework used to generate the Dockerfile or Kubernetes yaml files.
-  Generate the Dockerfile or Kubernetes yaml files based on the identified language and framework, and ensure that they are compatible with the latest version of Kubernetes.
-  Optimize the generated files for performance, security, and scalability, and ensure that they adhere to best practices and industry standards.
-  Save the generated files to a specified location on the local machine and provide a confirmation message upon completion.
-  Continuously monitor the repository for any changes and update the generated files accordingly to ensure that they remain up-to-date and compatible with the latest version of Kubernetes.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>
<ul>
<li><a href="https://github.com/sashabaranov/go-openai/" target="_blank" rel="noopener noreferrer">API<ExternalLinkIcon/></a></li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '48.md' style='float:left'>⬆️上一节🔗  </a><a href = '50.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


