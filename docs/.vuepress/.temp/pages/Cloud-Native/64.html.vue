<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第64节-automation-为飞书文档制作后台" tabindex="-1"><a class="header-anchor" href="#第64节-automation-为飞书文档制作后台" aria-hidden="true">#</a> 第64节 automation: 为飞书文档制作后台</h1>
<div><a href = '63.md' style='float:left'>⬆️上一节🔗  </a><a href = '65.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s，docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p><strong>飞书的文档地址：</strong></p>
<ul>
<li>https://gu4gn46jrh.feishu.cn/sheets/QHwrsh7nohKptxt9f6fcE0Uqnld</li>
</ul>
<p>构建一个基于Go语言实现的后台系统，用于管理和展示某ESG标准相关的飞书表格文档中的多个<code v-pre>sheet</code>。</p>
<p>系统需具有版本管理功能，能跟踪文档各个<code v-pre>sheet</code>的历史修改记录并支持比较不同版本之间的变化。</p>
<p>系统需要能够识别并解析文档中名为“港交所”的<code v-pre>sheet</code>，提取其中定义的二级议题和四级议题，并通过<code v-pre>web API</code>或其他方式将其结构化数据展示给用户。</p>
<p>同时，系统需要具有 <code v-pre>sheet</code> 识别的通用性，如果文档中新增名为“港交所1”、“港交所2”等的 <code v-pre>sheet</code>，系统也需要能够识别并进行相同的解析和展示。</p>
<p><strong>为完成这个需求，需要补充的知识如下:</strong></p>
<ol>
<li>
<p>精通Go语言，熟悉其Web框架如Gin等以开发 API</p>
</li>
<li>
<p>熟悉飞书表格文档格式，理解 <code v-pre>sheet</code>、单元格等结构，能通过飞书开放API解析文档</p>
</li>
<li>
<p>了解版本控制系统的原理，选择合适的方案实现文档版本管理</p>
</li>
<li>
<p>具有一定的前端知识，能调用飞书表格API将解析结果在网页端展示</p>
</li>
<li>
<p>熟练使用Go测试框架并编写测试用例，确保系统关键功能的正确性</p>
</li>
</ol>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案" aria-hidden="true">#</a> 解决方案</h2>
<p>你需要完成一个版本管理的界面，用于管理飞书表格的多个sheet。你需要使用Go语言实现该功能。以下是一些步骤和建议：</p>
<ol>
<li>
<p>首先，你需要了解如何使用Go语言操作Excel表格。你可以使用第三方库，例如 <code v-pre>excelize</code> 或 <code v-pre>go-xlsx</code>。</p>
</li>
<li>
<p>接下来，你需要编写代码来读取飞书表格中的所有<code v-pre>sheet</code>，并将它们显示在版本管理的界面上。</p>
</li>
<li>
<p>为了展示“港交所”<code v-pre>sheet</code>中的二级议题和四级议题，你需要编写代码来解析该<code v-pre>sheet</code>中的数据，并将其显示在界面上。</p>
</li>
<li>
<p>如果你在表格上新建了一个 <code v-pre>sheet</code>，你需要编写代码来识别和显示该<code v-pre>sheet</code>。</p>
</li>
<li>
<p>最后，你需要实现版本控制功能，例如保存历史版本、回滚到以前的版本等。</p>
</li>
</ol>
<p>总之，你需要学习如何使用 <strong>Go语言</strong> 操作 <strong>Excel</strong> 表格，并编写代码来解析和显示数据。此外，你还需要学习版本控制的相关知识。</p>
<p><strong>步骤：</strong></p>
<ol>
<li>
<p>需要使用飞书开发者平台的表格API，去获取这个表格共享链接对应的sheet列表和<code v-pre>sheet</code> 内容。</p>
</li>
<li>
<p><code v-pre>sheet</code> 内容是JSON格式的，需要解析出里面的二级议题和四级议题，以及它们的名称和内容。</p>
</li>
<li>
<p>打算做一个后台管理界面，显示这个表格所有的sheet，以及每个sheet的二级议题和四级议题。</p>
</li>
<li>
<p>需要监听该表格的更新，如果有新建的sheet，能够实时识别和显示出来。</p>
</li>
<li>
<p>可以使用Go的飞书开发者 SDK 来实现，关键要学习:</p>
</li>
</ol>
<ul>
<li>飞书表格API的使用，获取sheet列表和内容</li>
<li>JSON 解析，提取我们需要的数据</li>
<li>Go的web框架，比如Gin来做后台管理界面</li>
<li>Goroutine和channel来做异步监听表格更新</li>
</ul>
<p><strong>大致流程是:</strong></p>
<ol>
<li>
<p>初始化，使用表格API获取所有的 <code v-pre>sheet</code> 信息和内容，解析存进数据库</p>
</li>
<li>
<p>定时去轮询这个表格，如果有更新或者新建的<code v-pre>sheet</code>，解析其内容存进数据库，更新界面</p>
</li>
<li>
<p>后台界面从数据库读取数据，展示所有的<code v-pre>sheet</code>列表，以及每个<code v-pre>sheet</code>的二级议题和四级议题</p>
</li>
<li>
<p>如果用户点击某个<code v-pre>sheet</code>，读取该<code v-pre>sheet</code>的详细内容展示</p>
</li>
</ol>
<h2 id="架构图" tabindex="-1"><a class="header-anchor" href="#架构图" aria-hidden="true">#</a> 架构图</h2>
<div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> LR

<span class="token keyword">subgraph</span> External Services
feishuAPI <span class="token arrow operator">--></span> sheetParser
<span class="token keyword">end</span>

<span class="token keyword">subgraph</span> Sheet Parser <span class="token operator">&amp;</span> Manager
sheetParser<span class="token text string">[Sheet Parser]</span> <span class="token arrow operator">--></span> versionControl
versionControl<span class="token text string">[Version Control]</span> <span class="token arrow operator">--></span> sheetDisplay
<span class="token keyword">end</span>

<span class="token keyword">subgraph</span> Display
sheetDisplay<span class="token text string">[Sheet Display]</span> <span class="token arrow operator">--></span> UI
<span class="token keyword">end</span>

<span class="token keyword">subgraph</span> Backend
versionControl <span class="token arrow operator">--></span> API
<span class="token keyword">end</span>

<span class="token keyword">subgraph</span> Frontend
UI<span class="token text string">[User Interface]</span>
<span class="token keyword">end</span>

API <span class="token arrow operator">--></span> UI
UI <span class="token arrow operator">--></span> feishuAPI 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>MVC 架构设计：</strong></p>
<div class="language-mermaid ext-mermaid line-numbers-mode"><pre v-pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
A<span class="token text string">[View]</span> <span class="token arrow operator">--></span><span class="token label property">|1. User interaction|</span> B<span class="token text string">(Controller)</span>
B <span class="token arrow operator">--></span><span class="token label property">|2. Requests data|</span> C<span class="token text string">(Model)</span>
C <span class="token arrow operator">--></span><span class="token label property">|3. Returns data|</span> B
B <span class="token arrow operator">--></span><span class="token label property">|4. Updates view|</span> A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>系统的设计思路：</strong></p>
<ol>
<li><code v-pre>External Services</code>: 表示外部依赖的飞书表格服务API。</li>
<li><code v-pre>Sheet Parser &amp; Manager</code>: 表示解析和管理飞书表格的内部系统。其中Sheet Parser用于解析飞书表格；Version Control 用于提供版本控制功能；Sheet Display用于数据展示。</li>
<li><code v-pre>Display</code>: 表示数据展示层，包含用于渲染展示 parses 结果的User Interface。</li>
<li><code v-pre>Backend</code>: 表示内部API服务，Version Control通过API与外界交互。</li>
<li><code v-pre>Frontend</code>: 表示面向用户的Web页面层。User Interface通过调用Feishu API获取表格数据并将解析结果展示给用户。</li>
</ol>
<h2 id="目录设计" tabindex="-1"><a class="header-anchor" href="#目录设计" aria-hidden="true">#</a> 目录设计</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>esgtracker<span class="token operator">/</span>
├── cmd   
│   └── esgtracker     <span class="token comment">// 项目入口,启动服务 </span>
├── docs               <span class="token comment">// 文档  </span>
├── internal          
│   ├── model         <span class="token comment">// 数据模型   </span>
│   │   └── sheet<span class="token punctuation">.</span><span class="token keyword">go</span>
│   │   └── issue<span class="token punctuation">.</span><span class="token keyword">go</span>
│   ├── repository    <span class="token comment">// 数据访问层 </span>
│   │   └── sheet<span class="token punctuation">.</span><span class="token keyword">go</span> 
│   │   └── issue<span class="token punctuation">.</span><span class="token keyword">go</span>
│   └── service       <span class="token comment">// 业务逻辑层</span>
│       └── sheet<span class="token punctuation">.</span><span class="token keyword">go</span>
│       └── issue<span class="token punctuation">.</span><span class="token keyword">go</span>
│      
├── pkg              <span class="token comment">// 第三方依赖 </span>
│   └──  feishu
├── ui                  <span class="token comment">// 用户界面</span>
│   ├── html_templates
│   └── static
└── cmd<span class="token operator">/</span>esgtracker<span class="token operator">/</span>main<span class="token punctuation">.</span><span class="token keyword">go</span> <span class="token comment">// 服务入口 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解释：</p>
<ul>
<li>internal包按照域驱动设计切分为model,repository和service三层</li>
<li>model定义sheet和issue的数据结构</li>
<li>repository 定义获取和存储 <code v-pre>sheet</code> 和 <code v-pre>issue</code> 的接口</li>
<li>service 包含业务逻辑，调用 repository 存取数据</li>
<li>ui 目录包含前端静态页面和模板</li>
<li>pkg 目录管理第三方库依赖，如<code v-pre>feishu SDK</code></li>
<li>cmd 目录下面有服务入口main.go,用于启动服务</li>
</ul>
<h2 id="飞书-api" tabindex="-1"><a class="header-anchor" href="#飞书-api" aria-hidden="true">#</a> 飞书 API</h2>
<p>通过飞书表格 API，实现文档自动化工作，简单配置就可以生成跨系统的、任意颗粒度的，同时能够直接处理各项信息的工作主页。</p>
<p>利用飞书表格 API，将表单化的数据转换为条目化的测试结果，结合各种质量分析工具进行跨项目、跨测试阶段的问题分析。</p>
<details class="custom-container details"><summary>要求</summary>
<p>为了使用云文档组件，我们需要保证我们自己的应用拥有 <strong>查看、评论、编辑和管理云文档所有文件</strong> 权限。</p>
</details>
<h3 id="文档" tabindex="-1"><a class="header-anchor" href="#文档" aria-hidden="true">#</a> 文档</h3>
<p>我们提供了丰富的云文档 API，支持开发者以用户身份调用文档 API，完成创建文档、编辑文档等操作。应用可以通过集成 API，来完成自动化生成报告、批量创建文档等业务场景的文档自动化工作。</p>
<ul>
<li>
<p>创建任务后，调用 <a href="https://open.feishu.cn/document/ukTMukTMukTM/ugDM2YjL4AjN24COwYjN" target="_blank" rel="noopener noreferrer">创建文档<ExternalLinkIcon/></a> 接口，来创建并初始化文档；</p>
</li>
<li>
<p>使用 <a href="https://open.feishu.cn/document/ukTMukTMukTM/uYDM2YjL2AjN24iNwYjN" target="_blank" rel="noopener noreferrer">编辑文档内容<ExternalLinkIcon/></a> 接口，来编辑更新文档内容，包括更新标题、删除范围、插入内容。</p>
</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202305181620165.png" alt="image-20230518162043833"></p>
<blockquote>
<p><strong>Note</strong> 图片来自飞书：https://www.feishu.cn/practice_template/86581</p>
</blockquote>
<h3 id="表格" tabindex="-1"><a class="header-anchor" href="#表格" aria-hidden="true">#</a> 表格</h3>
<p>表格是承载数据的容器，也提供数据处理和呈现的功能。一个表格可能包含一个或者多个工作表，我们在处理数据时，都是针对某个工作表进行操作的。</p>
<blockquote>
<p>每篇文档都有一个 spreadsheetToken 作为唯一标识，每一个工作表都有一个 sheetId 作为唯一标识。</p>
</blockquote>
<p><strong>spreadsheetToken 以及 sheetId：</strong></p>
<p><code v-pre>spreadsheetToken</code> 是一个表格的唯一标识，你可以通过以下任一方式获取一个表格的 <code v-pre>spreadsheetToken</code>：</p>
<ul>
<li>通过表格的 URL 获取：https://sample.feishu.cn/sheets/<code v-pre>shtcnmBA*****yGehy8</code></li>
<li>通过 <a href="https://open.feishu.cn/document/ukTMukTMukTM/uEjNzUjLxYzM14SM2MTN" target="_blank" rel="noopener noreferrer">获取文件夹下文档清单 API<ExternalLinkIcon/></a> 的返回值获取表格的 spreadsheetToken</li>
</ul>
<p>sheetId 是一个工作表的唯一标识，你可以通过以下任一方式获取一个工作表的 sheetId：</p>
<ul>
<li>通过表格的 URL 获取：https://sample.feishu.cn/sheets/<code v-pre>shtcnmBA*****yGehy8?sheet=0b**12</code></li>
<li>通过 <a href="https://open.feishu.cn/document/ukTMukTMukTM/uETMzUjLxEzM14SMxMTN" target="_blank" rel="noopener noreferrer">获取表格元数据 API<ExternalLinkIcon/></a> 的返回值获取工作表的 sheetId</li>
</ul>
<blockquote>
<p>几乎所有的表格操作方法，需要传入 spreadsheetToken 来指定要操作的表格。</p>
</blockquote>
<p><strong>Range:</strong></p>
<p>Range 描述工作表的某个范围。在数据读写中，能帮助用户过滤数据的操作范围。</p>
<p>range 的描述方式为 <code v-pre>&lt;sheetId&gt;!&lt;开始位置&gt;:&lt;结束位置&gt;</code> ，共有 4 种描述方法，分别为：</p>
<ul>
<li><code v-pre>&lt;sheetId&gt;!&lt;开始单元格&gt;:&lt;结束单元格&gt;</code>
如：<code v-pre>0b**12!A1:B5</code> 就表示 <code v-pre>0b**12</code> 这个工作表中 <code v-pre>A1:B5</code> 的区域，如下图所示：</li>
</ul>
<p><img src="http://sm.nsddd.top/sm202305181712882.png" alt="image-20230518171215634"></p>
<ul>
<li><code v-pre>&lt;sheetId&gt;!&lt;开始列&gt;:&lt;结束列&gt;</code>，如：<code v-pre>0b**12!A:B</code></li>
<li><code v-pre>&lt;sheetId&gt;!&lt;开始单元格&gt;:&lt;结束列&gt;</code>，如：<code v-pre>0b**12!A1:B</code></li>
<li><code v-pre>&lt;sheetId&gt;</code>，区域留空，如：<code v-pre>0b**12</code>，代表这个表格中非空的最大行列范围内的数据</li>
</ul>
<h3 id="接入指南" tabindex="-1"><a class="header-anchor" href="#接入指南" aria-hidden="true">#</a> 接入指南</h3>
<p>我觉得多维表格的功能并不简简单单的是多维表格，多维表格（Base）是飞书云文档下的一个产品。它可以是一个表格，也可以是无数个应用。</p>
<p><strong>形态：</strong></p>
<p>一篇多维表格可以理解成是一个应用（app），标记该应用的唯一标识叫 <code v-pre>app_token</code>；</p>
<p>每篇多维表格是由多个数据表（table）组成的，标记该数据表的唯一标识叫 <code v-pre>table_id</code>；</p>
<table>
<thead>
<tr>
<th>飞书云文档中</th>
<th>飞书文档中</th>
<th>飞书表格中</th>
</tr>
</thead>
<tbody>
<tr>
<td>Base app</td>
<td>Base doc block</td>
<td>Base sheet block</td>
</tr>
<tr>
<td>即在&quot;<strong>飞书云文档</strong>&quot;中新建的多维表格</td>
<td>即在&quot;<strong>飞书文档</strong>&quot;中插入的多维表格</td>
<td>即在&quot;<strong>飞书表格</strong>&quot;中新建的多维表格</td>
</tr>
<tr>
<td>URL 以 <strong>feishu.cn/base</strong> 开头</td>
<td>URL 以 <strong>feishu.cn/docs</strong>、<strong>feishu.cn/docx</strong> 开头</td>
<td>URL 以 <strong>feishu.cn/sheets</strong> 开头</td>
</tr>
<tr>
<td>支持</td>
<td>支持</td>
<td>支持</td>
</tr>
</tbody>
</table>
<h3 id="飞书创建-robot-的步骤" tabindex="-1"><a class="header-anchor" href="#飞书创建-robot-的步骤" aria-hidden="true">#</a> 飞书创建 robot 的步骤</h3>
<ol>
<li>在租户下<a href="https://open.feishu.cn/document/home/introduction-to-custom-app-development/self-built-application-development-process" target="_blank" rel="noopener noreferrer">新建【企业自建应用】<ExternalLinkIcon/></a>；</li>
<li>申请应用接口调用权限: 根据需要调用的接口文档中描述的「权限要求」到开发者后台申请应用权限；</li>
<li>发布应用，租户管理员通过审核；</li>
<li><a href="https://open.feishu.cn/document/ukTMukTMukTM/uczNzUjL3czM14yN3MTN#2431c595" target="_blank" rel="noopener noreferrer">添加应用为文档协作者<ExternalLinkIcon/></a>，需要 文档所有者、知识库管理员 或 其他协作者 为资源 添加文档应用。文档、电子表格、多维表格、知识库 通过云文档 Web 页面右上方「...」-&gt;「...更多」-&gt; 「添加文档应用」入口添加。</li>
</ol>
<h2 id="目录说明" tabindex="-1"><a class="header-anchor" href="#目录说明" aria-hidden="true">#</a> 目录说明</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">.</span>
├── CONTRIBUTING.md                <span class="token comment"># 贡献指南</span>
├── LICENSE                        <span class="token comment"># 许可证</span>
├── Makefile                       <span class="token comment"># Makefile文件</span>
├── README.md                      <span class="token comment"># 项目说明</span>
├── cmd                            <span class="token comment"># 命令行应用程序</span>
├── configs                        <span class="token comment"># 配置文件</span>
│   └── config.yaml                <span class="token comment"># 配置文件</span>
├── docs                           <span class="token comment"># 文档</span>
│   └── README.md                  <span class="token comment"># 文档说明</span>
├── examples                       <span class="token comment"># 示例代码</span>
├── go.mod                         <span class="token comment"># Go模块文件</span>
├── internal                       <span class="token comment"># 内部包</span>
│   ├── controllers                <span class="token comment"># 控制器</span>
│   │   └── sheet.go               <span class="token comment"># 表格控制器</span>
│   ├── model                      <span class="token comment"># 模型</span>
│   │   └── sheet.go               <span class="token comment"># 表格模型</span>
│   ├── <span class="token function">service</span>                    <span class="token comment"># 服务</span>
│   │   └── sheet.go               <span class="token comment"># 表格服务</span>
│   ├── utils                      <span class="token comment"># 工具函数</span>
│   │   └── utils.go               <span class="token comment"># 工具函数</span>
│   └── views                      <span class="token comment"># 视图</span>
│       ├── disclosures            <span class="token comment"># 披露视图</span>
│       └── metrics                <span class="token comment"># 指标视图</span>
├── pkg                            <span class="token comment"># 包</span>
│   ├── feishu                     <span class="token comment"># 飞书相关的包</span>
│   │   ├── auth                   <span class="token comment"># 鉴权相关</span>
│   │   │   └── auth.go            <span class="token comment"># 鉴权包</span>
│   │   ├── chat                   <span class="token comment"># 聊天相关</span>
│   │   │   ├── chat.go            <span class="token comment"># 聊天包</span>
│   │   │   └── message.go         <span class="token comment"># 消息包</span>
│   │   └── drive                  <span class="token comment"># 云文档相关</span>
│   │       └── drive.go           <span class="token comment"># 云文档包</span>
│   ├── http                       <span class="token comment"># HTTP相关的包</span>
│   ├── logging                    <span class="token comment"># 日志相关的包</span>
│   └── version                    <span class="token comment"># 版本相关的包</span>
│       └── version.go             <span class="token comment"># 版本包</span>
├── scripts                        <span class="token comment"># 脚本</span>
│   ├── boilerplate.txt            <span class="token comment"># 代码模板</span>
│   └── githooks                   <span class="token comment"># Git钩子</span>
│       ├── commit-msg             <span class="token comment"># 提交信息钩子</span>
│       ├── pre-commit             <span class="token comment"># 提交前钩子</span>
│       └── pre-push               <span class="token comment"># 推送前钩子</span>
├── <span class="token builtin class-name">test</span>                           <span class="token comment"># 测试代码</span>
│   └── README.md                  <span class="token comment"># 测试说明</span>
└── web                            <span class="token comment"># Web应用程序</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="表设计" tabindex="-1"><a class="header-anchor" href="#表设计" aria-hidden="true">#</a> 表设计</h2>
<p>设计方案：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>CREATE TABLE <span class="token string">`sheet`</span> <span class="token punctuation">(</span>
  <span class="token string">`id`</span> <span class="token function">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> NOT NULL AUTO_INCREMENT<span class="token punctuation">,</span>
  <span class="token string">`name`</span> <span class="token function">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> NOT NULL COMMENT <span class="token char">'表名称'</span><span class="token punctuation">,</span>
  <span class="token string">`type`</span> <span class="token function">enum</span><span class="token punctuation">(</span><span class="token char">'GRI'</span><span class="token punctuation">,</span><span class="token char">'社科院'</span><span class="token punctuation">,</span><span class="token char">'港交所'</span><span class="token punctuation">,</span><span class="token char">'SASB'</span><span class="token punctuation">)</span> NOT NULL COMMENT <span class="token char">'表类型'</span><span class="token punctuation">,</span>
  PRIMARY KEY <span class="token punctuation">(</span><span class="token string">`id`</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> ENGINE<span class="token operator">=</span>InnoDB DEFAULT CHARSET<span class="token operator">=</span>utf8<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>gri 表：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>gri<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>first_dimension<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'一级维度'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>second_issue<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'二级议题'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>third_index<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'三级指标'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>fourth_question<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'四级问题'</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4 <span class="token keyword">COMMENT</span><span class="token operator">=</span><span class="token string">'GRI表'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>社科院表：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>social_science_academy<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>first_dimension<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'一级维度'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>second_issue<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'二级议题'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>third_index<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'三级指标'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>fourth_question<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'四级问题'</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4 <span class="token keyword">COMMENT</span><span class="token operator">=</span><span class="token string">'社科院表'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>港交所表：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>hkex<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>first_dimension<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'一级维度'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>second_issue<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'二级议题'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>third_index<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">1023</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'三级指标'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>fourth_question<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">1023</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'四级问题'</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4 <span class="token keyword">COMMENT</span><span class="token operator">=</span><span class="token string">'港交所表'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sasb 表：</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>sasb<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>first_dimension<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'一级维度'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>second_issue<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'二级议题'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>third_index<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'三级指标'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>fourth_question<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token keyword">DEFAULT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">'四级问题'</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4 <span class="token keyword">COMMENT</span><span class="token operator">=</span><span class="token string">'SASB表'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<h3 id="开源社的一些链接" tabindex="-1"><a class="header-anchor" href="#开源社的一些链接" aria-hidden="true">#</a> 开源社的一些链接</h3>
<ul>
<li>https://kaiyuanshe.cn/department</li>
<li>https://github.com/kaiyuanshe</li>
</ul>
<h3 id="导航" tabindex="-1"><a class="header-anchor" href="#导航" aria-hidden="true">#</a> 导航</h3>
<ul><li><div><a href = '63.md' style='float:left'>⬆️上一节🔗  </a><a href = '65.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


