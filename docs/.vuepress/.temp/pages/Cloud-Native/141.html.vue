<template><div><h1 id="实现-js-sdk-设计" tabindex="-1"><a class="header-anchor" href="#实现-js-sdk-设计" aria-hidden="true">#</a> 实现 Js SDK 设计</h1>
<h2 id="环境" tabindex="-1"><a class="header-anchor" href="#环境" aria-hidden="true">#</a> 环境</h2>
<ul>
<li>SDK Core 2.3.0</li>
<li>仓库地址：https://github.com/openimsdk/openim-sdk-core</li>
<li>分支地址：https://github.com/openimsdk/openim-sdk-core/tree/test-v2.3.0release</li>
</ul>
<p>函数调用 到 网络请求调用</p>
<p>每一个用户一个 sdk core</p>
<ul>
<li><a href="./71">之前的任务</a></li>
</ul>
<h2 id="技术支持" tabindex="-1"><a class="header-anchor" href="#技术支持" aria-hidden="true">#</a> 技术支持</h2>
<h3 id="openim" tabindex="-1"><a class="header-anchor" href="#openim" aria-hidden="true">#</a> OpenIM：</h3>
<p>OpenIM是用Golang开发的开源即时通讯服务器。它采用协议缓冲区（pb）和WebSockets的独特通信方法，非常适合实时消息传递。该服务器基于微服务架构构建，便于部署和扩展。OpenIM支持Kafka，MongoDB，MySQL和Redis等多种基本组件，用于数据存储和管理。</p>
<h3 id="jssdk" tabindex="-1"><a class="header-anchor" href="#jssdk" aria-hidden="true">#</a> JSSDK：</h3>
<p>在OpenIM的上下文中，JavaScript SDK（JSSDK）指的是适用于Web的SDK，它便于与Web应用程序和其他平台（如 <code v-pre>uni-app</code> 和 <code v-pre>MiniPrograms</code>）集成。该SDK用于与OpenIM服务器交互，进行用户登录，消息创建和消息发送等各种操作。例如，您可以使用OpenIM SDK登录OpenIM服务器并向另一个用户发送文本消息。</p>
<ul>
<li>参考：https://github.com/OpenIMSDK/Open-IM-SDK-Web</li>
</ul>
<h3 id="jssdo" tabindex="-1"><a class="header-anchor" href="#jssdo" aria-hidden="true">#</a> JSSDO：</h3>
<p>由Progress指出的JSSDO是一个JavaScript类，可提供对Progress数据对象服务的资源（数据对象）的访问。它可以与服务器上的资源交互，执行标准的创建、读取、更新、删除（CRUD）操作，以及调用服务器上的业务逻辑的自定义操作。它对于管理客户端-服务器架构中的数据非常有用，特别是在支持jQuery Promises的环境中。</p>
<ul>
<li>参考：https://docs.progress.com/zh-CN/bundle/openedge-data-object-reference/page/progress.data.JSDO-class.html</li>
</ul>
<h2 id="执行计划" tabindex="-1"><a class="header-anchor" href="#执行计划" aria-hidden="true">#</a> 执行计划：</h2>
<ol>
<li><strong>学习技术</strong>：
<ul>
<li>熟悉Go，Flutter和JavaScript，因为这些将是涉及的核心技术。</li>
<li>通过审查<a href="https://github.com/openimsdk" target="_blank" rel="noopener noreferrer">GitHub仓库<ExternalLinkIcon/></a>中提供的文档和示例，彻底了解OpenIM。</li>
<li>探索<a href="https://github.com/openimsdk/open-im-sdk-web" target="_blank" rel="noopener noreferrer">OpenIM SDK for Web<ExternalLinkIcon/></a>，了解如何使用JavaScript与OpenIM服务器交互。</li>
<li>通过阅读<a href="https://documentation.progress.com/output/pdo/pdo/progress.data.jsdo-class.html" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a>和尝试示例来了解JSSDO。</li>
</ul>
</li>
<li><strong>设置环境</strong>：
<ul>
<li>在您的机器上设置Go和Flutter环境。</li>
<li>克隆OpenIM服务器和客户端SDK仓库，并按照仓库中提供的说明进行设置。</li>
</ul>
</li>
<li><strong>开发</strong>：
<ul>
<li>为您的应用程序定义所需的功能和数据结构。</li>
<li>使用OpenIM SDK for Web实现客户端逻辑，以处理用户登录，消息传递和其他必需的功能。</li>
<li>如果JSSDO是您项目的一部分，实现与数据对象服务交互并相应管理数据的必要逻辑。</li>
</ul>
</li>
<li><strong>测试和调试</strong>：
<ul>
<li>持续测试每个组件和功能，以确保它们按预期工作。</li>
<li>调试并优化代码以修复任何问题并优化性能。</li>
</ul>
</li>
<li><strong>部署</strong>：
<ul>
<li>一旦您的应用程序准备好并彻底测试过，将其部署到适当的服务器或云平台。</li>
</ul>
</li>
<li><strong>监控和维护</strong>：
<ul>
<li>监控应用程序的性能和使用情况。</li>
<li>保持系统更新，并在部署后解决出现的任何错误或问题。</li>
</ul>
</li>
</ol>
<h2 id="代码结构" tabindex="-1"><a class="header-anchor" href="#代码结构" aria-hidden="true">#</a> 代码结构</h2>
<p>下面是 OpenIM 的代码结构，如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ tree ws_wrapper
ws_wrapper
├── cmd
│   ├── Makefile
│   ├── open_im_sdk_electron.go
│   ├── open_im_sdk_my.go
│   └── open_im_sdk_server.go
├── <span class="token builtin class-name">test</span>
│   ├── client
│   │   └── client.go
│   ├── cmd
│   │   └── main.go
│   └── simulationClient.go
├── utils
│   ├── platform_number_id_to_name.go
│   └── strings.go
└── ws_local_server
    ├── constant.go
    ├── handle_func.go
    ├── ws_conversation_msg.go
    ├── ws_friend.go
    ├── ws_group.go
    ├── ws_handle.go
    ├── ws_init_login.go
    ├── ws_organization.go
    ├── ws_server.go
    ├── ws_signaling.go
    ├── ws_user.go
    └── ws_work_moments.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从目录结构来看，<code v-pre>ws_wrapper</code>目录包括了不同的模块，如<code v-pre>cmd</code>, <code v-pre>test</code>, <code v-pre>utils</code>, 和 <code v-pre>ws_local_server</code>。为了理解代码的工作方式和各个模块之间的关系，推荐按照以下步骤进行：</p>
<ol>
<li><strong>开始点</strong>: 从 <code v-pre>cmd</code> 目录开始，查看 <code v-pre>open_im_sdk_server.go</code> 文件，理解如何启动和运行 WebSocket 服务器。</li>
<li><strong>核心逻辑</strong>: 转到 <code v-pre>ws_local_server</code> 目录，理解各个文件（如 <code v-pre>ws_handle.go</code>, <code v-pre>ws_server.go</code> 等）中的核心逻辑和处理函数。</li>
<li><strong>测试</strong>: 查看 <code v-pre>test</code> 目录中的测试代码，理解如何测试 WebSocket 服务器和客户端的交互。</li>
<li><strong>实用工具</strong>: 最后，查看 <code v-pre>utils</code> 目录，理解提供的实用工具函数如何支持核心逻辑。</li>
</ol>
<p><strong>各个模块的作用可能如下：</strong></p>
<ul>
<li><strong>cmd</strong>: 包含启动服务器和客户端的代码。</li>
<li><strong>test</strong>: 提供测试客户端和服务器交互的代码。</li>
<li><strong>utils</strong>: 提供实用工具函数，可能包括字符串处理和平台编号转换等。</li>
<li><strong>ws_local_server</strong>: 包含WebSocket服务器的核心逻辑和处理函数。</li>
</ul>
<h2 id="网络框架" tabindex="-1"><a class="header-anchor" href="#网络框架" aria-hidden="true">#</a> 网络框架</h2>
<p>地址是：https://github.com/xuexihuang/new_gonet</p>
<p>您的描述似乎是关于一个jssdk服务端的设计和实现概览。我会试图基于您的描述给出一些解释和建议。</p>
<p><strong>概览解读</strong>：</p>
<ol>
<li><strong>服务端设计</strong>：
<ul>
<li>服务端似乎有一个核心(<code v-pre>core</code>)，负责处理真正的业务逻辑。</li>
<li>对于每一次登录请求，服务端会<code v-pre>new</code>出一个新的实例或核心。</li>
<li>这个核心有一对反射调用，这意味着它可能动态地根据请求的内容调用相应的方法或函数。</li>
</ul>
</li>
<li><strong>WebSocket服务端+core</strong>：
<ul>
<li>对于每一个请求，WebSocket服务端会与<code v-pre>core</code>交互，找到并执行相应的方法或功能。</li>
</ul>
</li>
<li><strong>登录和获取用户信息</strong>：
<ul>
<li>JS端发起登录请求。</li>
<li>服务端接收请求并处理登录逻辑，可能是验证凭证、创建会话等。</li>
<li>对于每一个请求，都会有一个与之对应的<code v-pre>core</code>实例来处理。</li>
</ul>
</li>
<li><strong>代码优化</strong>：
<ul>
<li>您提到的“1+1”可能是指原始的直接实现方式，之后您将其封装成函数，使代码更加模块化和可维护。</li>
</ul>
</li>
<li><strong>登录和退出的问题</strong>：
<ul>
<li>从函数调用变成网络请求调用可能增加了一些复杂性。例如，网络延迟、错误处理、会话管理等都需要考虑。</li>
</ul>
</li>
</ol>
<p><strong>建议</strong>：</p>
<ol>
<li>
<p><strong>核心实例化</strong>：每个请求一个新的<code v-pre>core</code>可能会导致资源的浪费，特别是当有大量并发请求时。考虑是否可以复用某些<code v-pre>core</code>或采取其他策略来管理资源。</p>
</li>
<li>
<p><strong>反射使用</strong>：虽然反射提供了很大的灵活性，但它也带来了一些性能和维护的挑战。确保使用反射的决策是基于真正的需求，而不仅仅是为了技术上的&quot;酷炫&quot;。</p>
</li>
<li>
<p><strong>登录和退出的管理</strong>：确保处理所有与登录和退出相关的场景，如会话超时、错误凭证、多设备登录等。</p>
</li>
<li>
<p><strong>模块化和函数封装</strong>：继续这个方向，使代码更加结构化和清晰。</p>
</li>
<li>
<p><strong>错误处理和日志</strong>：确保所有可能的错误都被适当地处理，并且有详细的日志来跟踪和调试问题。</p>
</li>
<li>
<p><strong>性能和安全性</strong>：定期审查代码以确保最佳性能和安全性。特别是在处理用户凭证和会话时，确保所有数据都被适当地加密和保护。</p>
</li>
<li>
<p><strong>测试</strong>：建立一个强大的测试套件，包括单元测试、集成测试和端到端测试，确保代码的稳定性和质量。</p>
</li>
<li>
<p><strong>文档和知识共享</strong>：为您的团队创建详细的文档，描述设计决策、代码结构和使用方法。这将帮助新成员更快地上手，也可以作为一个知识库在需要时查阅。</p>
</li>
<li>
<p><strong>基础网络库学习</strong> (第一个项目)：</p>
<ul>
<li><strong>入门文档</strong>: 从<code v-pre>README.md</code>或其他文档开始，获取项目的概述。</li>
<li><strong>核心模块</strong>: 重点关注网络模块，特别是与WebSocket相关的部分，如<code v-pre>ws_client.go</code>, <code v-pre>ws_server.go</code>, 和 <code v-pre>ws_conn.go</code>等。</li>
<li><strong>公共工具和结构</strong>: 查看<code v-pre>common</code>和<code v-pre>conf</code>目录，了解项目中的公共数据结构和配置方法。</li>
<li><strong>实际示例</strong>: 如果第一个项目提供了示例，那么学习这些示例，了解如何使用这个库。</li>
</ul>
</li>
<li>
<p><strong>深入ws_wrapper</strong>:</p>
<ul>
<li><strong>核心启动代码</strong>: 从<code v-pre>cmd</code>目录的<code v-pre>open_im_sdk_server.go</code>开始，了解如何启动<code v-pre>ws_wrapper</code>。</li>
<li><strong>核心WebSocket逻辑</strong>: 转到<code v-pre>ws_local_server</code>目录，逐个文件理解WebSocket消息的处理、会话、用户、群组、信号等的处理逻辑。</li>
<li><strong>测试</strong>: 查看<code v-pre>test</code>目录，理解客户端如何与<code v-pre>ws_wrapper</code>交互以及如何模拟客户端行为。</li>
<li><strong>实用工具</strong>: 查看<code v-pre>utils</code>，尝试理解实用函数是如何与核心逻辑交互的。</li>
</ul>
</li>
<li>
<p><strong>跨项目比较</strong>:</p>
<ul>
<li><strong>对比和连接</strong>: 在学习<code v-pre>ws_wrapper</code>时，时刻注意和第一个项目中的网络库相关的部分。这将帮助你理解<code v-pre>ws_wrapper</code>是如何利用那个库的。</li>
</ul>
</li>
<li>
<p><strong>实践</strong>:</p>
<ul>
<li><strong>设置并运行</strong>: 对于每个项目，按照文档设置并运行它。尝试做些小修改，看看它们如何影响项目的行为。</li>
<li><strong>调试</strong>: 使用Go的调试工具，如Delve，逐步跟踪代码，看看它是如何工作的。这对于理解代码流程和逻辑特别有帮助。</li>
</ul>
</li>
<li>
<p><strong>社区交流</strong>:</p>
<ul>
<li>如果这些项目是开源的，考虑加入相关社区或论坛。与其他开发者交流可以帮助你更快地理解和解决你遇到的问题。</li>
</ul>
</li>
<li>
<p><strong>笔记</strong>:</p>
<ul>
<li>记录你的学习过程和发现。随着你的学习，不断更新你的笔记。这不仅帮助你回顾，还有助于整理你的思路。</li>
</ul>
</li>
</ol>
<p>基于您提供的<code v-pre>ws_handle.go</code>文件和之前的信息，我们可以得到以下总结：</p>
<p><strong>1. 概览</strong>：</p>
<ul>
<li>该文件主要定义了WebSocket处理的基础工具和结构。特别是，它关心事件数据的结构和基于这些数据成功或失败的处理。</li>
</ul>
<p><strong>2. 主要结构</strong>：</p>
<ul>
<li><strong>EventData</strong>：一个用于传递WebSocket事件的结构。它包括：
<ul>
<li><code v-pre>Event</code>：事件名称。</li>
<li><code v-pre>ErrCode</code>：错误码。一个非零的值通常表示出现错误。</li>
<li><code v-pre>ErrMsg</code>：错误消息的描述。</li>
<li><code v-pre>Data</code>：可能的成功数据。</li>
<li><code v-pre>OperationID</code>：操作的标识符，用于跟踪或关联特定的操作。</li>
</ul>
</li>
<li><strong>BaseSuccessFailed</strong>：一个基础的成功/失败处理结构，具有以下字段：
<ul>
<li><code v-pre>funcName</code>：代表要被调用的功能的完整名称（例如：<code v-pre>open_im_sdk/open_im_sdk.Login</code>）。</li>
<li><code v-pre>operationID</code>：操作的标识符。</li>
<li><code v-pre>uid</code>：用户ID。</li>
</ul>
</li>
</ul>
<p><strong>3. 功能和方法</strong>：</p>
<ul>
<li><strong>cleanUpfuncName</strong>：一个工具函数，用于从完整的功能名称（例如：<code v-pre>open_im_sdk/open_im_sdk.Login</code>）中提取出真正的功能名（在这种情况下是<code v-pre>Login</code>）。</li>
<li><strong>OnError</strong>：当出现错误时，会记录错误并通过<code v-pre>SendOneUserMessage</code>函数发送一个错误消息给特定用户。</li>
<li><strong>OnSuccess</strong>：当操作成功时，会记录成功事件并通过<code v-pre>SendOneUserMessage</code>函数发送一个成功的消息给特定用户。</li>
</ul>
<p><strong>4. 上下文理解</strong>：</p>
<p>结合前面的信息，我们知道该文件是<code v-pre>ws_wrapper</code>项目的一部分，该项目是基于一个核心网络通信功能的WebSocket服务器实现。在这个特定文件中，我们可以看到它定义了WebSocket事件的基本处理方式。特别是，它定义了如何在成功或失败的情况下处理和响应。</p>
<p>此外，反射的使用可能意味着<code v-pre>funcName</code>可能是动态决定的，从而提供更大的灵活性。通过简化<code v-pre>funcName</code>并将其用作<code v-pre>Event</code>，该系统能够为特定用户发送有关某个特定操作的消息，无论该操作是成功还是失败。</p>
</div></template>


