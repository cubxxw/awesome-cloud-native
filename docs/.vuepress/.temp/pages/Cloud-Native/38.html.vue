<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第38节-rfc-sealer-问题提案-中英文" tabindex="-1"><a class="header-anchor" href="#第38节-rfc-sealer-问题提案-中英文" aria-hidden="true">#</a> 第38节 RFC: Sealer 问题提案(中英文)</h1>
<div><a href = '37.md' style='float:left'>⬆️上一节🔗  </a><a href = '39.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h2>
<p>目前，Sealer 缺乏清晰和一致的结构，这让开发人员难以进行工作和改进。此外，需要优化和自动化 GitHub actions 流程以提高效率。同样这个过程对于我来说这个过程有助于更加熟悉 sealer 的运行流程以及系统设计。</p>
<p>下面的先后循序符合设计的优先级🎯</p>
<h2 id="rfc" tabindex="-1"><a class="header-anchor" href="#rfc" aria-hidden="true">#</a> RFC:</h2>
<h3 id="改进-makefile-结构" tabindex="-1"><a class="header-anchor" href="#改进-makefile-结构" aria-hidden="true">#</a> 改进 Makefile 结构</h3>
<p>我们提出以下按优先级排序的 Makefile 结构改进：</p>
<ol>
<li>实现可选的版权信息检查（如果尚未通过 actions 实现）。</li>
<li>自动解析所有 makefile 选项的帮助信息。</li>
<li>确保一致的行为，例如强制执行提交规范。</li>
<li>添加必要的选项，例如单元测试覆盖率（我们很在意，但目前未提供）。</li>
<li>添加调试信息和选择性调试。此外，考虑提供通过 <code v-pre>sealer</code> 或 <code v-pre>seautil</code> 选择性生成二进制的选项，以提高编译速度。</li>
<li>简化 <code v-pre>/Makefile</code> 模块以提高可读性。</li>
</ol>
<h3 id="优化-github-actions-流程" tabindex="-1"><a class="header-anchor" href="#优化-github-actions-流程" aria-hidden="true">#</a> 优化 GitHub Actions 流程</h3>
<p>将进行以下更改以优化 GitHub Actions 流程：</p>
<ol>
<li>提供和自动化 CHANGELOG 管理。</li>
<li>为目前未涵盖的微操作和功能添加自动化操作。</li>
</ol>
<h3 id="目录设计" tabindex="-1"><a class="header-anchor" href="#目录设计" aria-hidden="true">#</a> 目录设计</h3>
<p><strong>script目录 :</strong> 我们建议将 <code v-pre>/hack</code> 目录迁移至 <code v-pre>/script</code> 目录，并将 Makefile 部分底层实现迁移至 <code v-pre>script/make-rules</code> 目录。</p>
<p>**CMD 命令：**sealer 的 命令越来越多，尤其是 alpha 扩展，提议或许可以将 cmd 的核心部分提取到 <code v-pre>/internal</code> 目录中（只允许内部访问）和 pkg目录下（允许调用） ，将 <code v-pre>/common</code> 目录迁移到 <code v-pre>/pkg</code> 目录下</p>
<p>**版本信息：**我建议为 Sealer 系统信息（git 信息、Go 信息等）和 pkg 运行时版本创建单独的版本。应用程序本身 info 的version ，一个是 pkg 的 runtime 的 version ，这两个 version 存放到哪个目录最规范，是都放在 <code v-pre>/pkg/version</code>下面还是 放在 <code v-pre>/utils/version</code>下面，还是分开放？ 提议：将应用程序 info 调整到 <code v-pre>/pkg/version</code> 可供外部调用，对 utils/version 放入到 runtime k8s 的模块中，并且抽象出接口供可供外部调用。</p>
<h3 id="改进版本控制" tabindex="-1"><a class="header-anchor" href="#改进版本控制" aria-hidden="true">#</a> 改进版本控制</h3>
<p>我建议为 Sealer 系统信息（git 信息、Go 信息等）和 pkg 运行时版本创建单独的版本。我建议将 Sealer 的命令核心（特别是 alpha 扩展）移动到 <code v-pre>/internal</code> 目录（仅内部访问）和 <code v-pre>/pkg</code> 目录（允许调用）。此外，我们建议补充相关文档，例如版本 API 和 Makefile 指南。</p>
<h3 id="版本接口设计方案" tabindex="-1"><a class="header-anchor" href="#版本接口设计方案" aria-hidden="true">#</a> 版本接口设计方案</h3>
<p>我们将创建一个运行时层以抽象版本层接口并设计接口。我们将提取 k3s、k0s 和 Kubernetes 的版本并从上面的版本调用它们，他们不需要关心调用的是哪个 cluster runtime 的 version</p>
<h2 id="other-rfc" tabindex="-1"><a class="header-anchor" href="#other-rfc" aria-hidden="true">#</a> Other RFC</h2>
<p>RFC：补充 k3s 的实现。</p>
<p>RFC：Sealer 目前缺乏控制 APP 调用的能力，Pack 可以帮助解决这个问题。我将 <code v-pre>buildpacks</code> 的研究并参考 <a href="http://buildpacks.io/" target="_blank" rel="noopener noreferrer">buildpacks.io<ExternalLinkIcon/></a> 的官方文档。</p>
<blockquote>
<p>我们将为 Pack 提供抽象上层 Makefile 的构建能力，使构建镜像更加容易。如果 Sealer 可以打包和分发集群，它将具有非常强大的能力。</p>
</blockquote>
<p>我们认为这些改变将为 Sealer 创建更有组织和高效的结构，并改进其功能。通过实现这些改变，我们可以使 Sealer 成为一个更加用户友好和高效的开发工具。</p>
<h2 id="tasks" tabindex="-1"><a class="header-anchor" href="#tasks" aria-hidden="true">#</a> Tasks</h2>
<table>
<thead>
<tr>
<th>类型</th>
<th>改进</th>
<th>问题</th>
<th>PR</th>
<th>状态</th>
<th>优先级</th>
</tr>
</thead>
<tbody>
<tr>
<td>Makefile</td>
<td>可选的版权信息检查、自动解析所有 makefile 选项的帮助信息、保持一致的行为、添加必要的选项、添加调试信息和选择性调试、简化 /Makefile 模块以提高可读性</td>
<td></td>
<td></td>
<td>✅</td>
<td>1</td>
</tr>
<tr>
<td>目录设计</td>
<td>将 /hack 目录迁移至 /script 目录，并将 Makefile 部分底层实现迁移至 script/make-rules 目录、将 cmd 的核心部分提取到 /internal 目录中和 /pkg 目录下、将 /common 目录迁移到 /pkg 目录下、为 Sealer 系统信息和 pkg 运行时版本创建单独的版本、将应用程序 info 调整到 /pkg/version 可供外部调用、对 utils/version 放入到 runtime k8s 的模块中，并且抽象出接口供可供外部调用</td>
<td></td>
<td></td>
<td>❌</td>
<td>2</td>
</tr>
<tr>
<td>GitHub Actions</td>
<td>提供和自动化 CHANGELOG 管理、为目前未涵盖的微操作和功能添加自动化操作</td>
<td></td>
<td></td>
<td>❌</td>
<td>3</td>
</tr>
<tr>
<td>版本控制</td>
<td>为 Sealer 系统信息和 pkg 运行时版本创建单独的版本、将 Sealer 的命令核心（特别是 alpha 扩展）移动到 /internal 目录（仅内部访问）和 /pkg 目录（允许调用）、补充相关文档，例如版本 API 和 Makefile 指南</td>
<td></td>
<td></td>
<td>❌</td>
<td>4</td>
</tr>
<tr>
<td>接口设计方案</td>
<td>创建一个运行时层以抽象版本层接口并设计接口，提取 k3s、k0s 和 Kubernetes 的版本并从上面的版本调用它们</td>
<td></td>
<td></td>
<td>❌</td>
<td>5</td>
</tr>
<tr>
<td>RFC</td>
<td>补充 k3s 的实现</td>
<td></td>
<td></td>
<td>❌</td>
<td>6</td>
</tr>
<tr>
<td>RFC</td>
<td>Sealer 目前缺乏控制 APP 调用的能力，Pack 可以帮助解决这个问题。我将 buildpacks 的研究并参考 http://buildpacks.io/ 的官方文档</td>
<td></td>
<td></td>
<td>❌</td>
<td>7</td>
</tr>
</tbody>
</table>
<h1 id="rfc-sealer-proposal" tabindex="-1"><a class="header-anchor" href="#rfc-sealer-proposal" aria-hidden="true">#</a> RFC: Sealer Proposal</h1>
<h2 id="problem" tabindex="-1"><a class="header-anchor" href="#problem" aria-hidden="true">#</a> Problem</h2>
<p>Currently, Sealer lacks a clear and consistent structure, making it difficult for developers to work with and improve. In addition, the GitHub actions workflow needs to be optimized and automated for increased efficiency. This process will help me become more familiar with the Sealer runtime and system design.</p>
<p>The following order of priority is based on our design goals 🎯</p>
<h2 id="rfc-1" tabindex="-1"><a class="header-anchor" href="#rfc-1" aria-hidden="true">#</a> RFC:</h2>
<h3 id="improve-makefile-structure" tabindex="-1"><a class="header-anchor" href="#improve-makefile-structure" aria-hidden="true">#</a> Improve Makefile Structure</h3>
<ul>
<li>[ ] Improve Makefile structure</li>
</ul>
<p>We propose the following Makefile structure improvements, sorted by priority:</p>
<ol>
<li>Implement optional copyright check (if not already implemented by actions).</li>
<li>Automatically parse help information for all makefile options.</li>
<li>Ensure consistent behavior, such as enforcing commit guidelines.</li>
<li>Add necessary options, such as unit test coverage (which we care about but currently do not provide).</li>
<li>Add debug information and selective debugging. Also, consider providing options to selectively generate binaries via <code v-pre>sealer</code> or <code v-pre>seautil</code> to improve compile speed.</li>
<li>Simplify the <code v-pre>/Makefile</code> module for readability.</li>
</ol>
<h3 id="optimize-github-actions-workflow" tabindex="-1"><a class="header-anchor" href="#optimize-github-actions-workflow" aria-hidden="true">#</a> Optimize GitHub Actions Workflow</h3>
<ul>
<li>[ ] Optimize directory structure</li>
</ul>
<p>The following changes will be made to optimize the GitHub Actions workflow:</p>
<ol>
<li>Provide and automate CHANGELOG management.</li>
<li>Add automation for micro-operations and functionality not currently covered.</li>
</ol>
<h3 id="directory-design" tabindex="-1"><a class="header-anchor" href="#directory-design" aria-hidden="true">#</a> Directory Design</h3>
<ul>
<li>[ ] Optimize actions workflow</li>
</ul>
<p><strong>Script Directory:</strong> We recommend migrating the <code v-pre>/hack</code> directory to the <code v-pre>/script</code> directory and moving the Makefile portion of the backend implementation to the <code v-pre>script/make-rules</code> directory.</p>
<p><strong>CMD Commands:</strong> Sealer's commands are increasing in number, especially with alpha extensions. We propose extracting the core of the cmd to the <code v-pre>/internal</code> directory (only internally accessible) and <code v-pre>/pkg</code> directory (allowing for calls). We recommend moving the <code v-pre>/common</code> directory to the <code v-pre>/pkg</code> directory.</p>
<p><strong>Version Information:</strong> We propose creating separate versions for Sealer system information (git information, Go information, etc.) and pkg runtime. Which directory should the two versions be stored in <code v-pre>/pkg/version</code>, <code v-pre>/utils/version</code>, or separately? We suggest adjusting the application info to <code v-pre>/pkg/version</code> for external access and placing utils/version into the runtime k8s module, abstracting an interface for external access.</p>
<h3 id="improve-version-control" tabindex="-1"><a class="header-anchor" href="#improve-version-control" aria-hidden="true">#</a> Improve Version Control</h3>
<p>We propose creating separate versions for Sealer system information (git information, Go information, etc.) and pkg runtime. We suggest moving the core of Sealer's commands (especially alpha extensions) to the <code v-pre>/internal</code> directory (internal access only) and <code v-pre>/pkg</code> directory (allowing for calls). Additionally, we propose supplementing relevant documentation, such as version API and Makefile guidelines.</p>
<h3 id="version-interface-design-scheme" tabindex="-1"><a class="header-anchor" href="#version-interface-design-scheme" aria-hidden="true">#</a> Version Interface Design Scheme</h3>
<p>We will create a runtime layer to abstract the version layer interface and design the interface. We will extract the versions of k3s, k0s, and Kubernetes and call them from the above versions. They do not need to care which cluster runtime version is being called.</p>
<h2 id="other-rfc-1" tabindex="-1"><a class="header-anchor" href="#other-rfc-1" aria-hidden="true">#</a> Other RFC</h2>
<p>RFC: Supplement k3s implementation.</p>
<p>RFC: Sealer currently lacks the ability to control APP calls, and Pack can help solve this problem. I will research <code v-pre>buildpacks</code> and refer to the official documentation of <a href="http://buildpacks.io/" target="_blank" rel="noopener noreferrer">buildpacks.io<ExternalLinkIcon/></a>.</p>
<blockquote>
<p>We will provide Pack with the ability to build the upper-level Makefile abstractly, making it easier to build images. If Sealer can package and distribute clusters, it will have a very powerful ability.</p>
<p>We believe that these changes will create a more organized and efficient structure for Sealer and improve its functionality. By implementing these changes, we can make Sealer a more user-friendly and efficient development tool.</p>
</blockquote>
<h2 id="tasks-1" tabindex="-1"><a class="header-anchor" href="#tasks-1" aria-hidden="true">#</a> Tasks</h2>
<table>
<thead>
<tr>
<th>Type</th>
<th>Improvement</th>
<th><strong>Issues</strong></th>
<th>PR</th>
<th>Status</th>
<th>Priority</th>
</tr>
</thead>
<tbody>
<tr>
<td>Makefile</td>
<td>Improve Makefile structure</td>
<td></td>
<td></td>
<td>✅</td>
<td>🥇</td>
</tr>
<tr>
<td>Directory Design</td>
<td>Optimize directory structure</td>
<td></td>
<td></td>
<td>❌</td>
<td>🥈</td>
</tr>
<tr>
<td>GitHub Actions</td>
<td>Optimize actions workflow</td>
<td></td>
<td></td>
<td>❌</td>
<td>🥉</td>
</tr>
<tr>
<td>Version Control</td>
<td>Separate versions for Sealer system and pkg runtime, move core commands to /internal and /pkg directories, supplement documentation</td>
<td></td>
<td></td>
<td>❌</td>
<td>4</td>
</tr>
<tr>
<td>Version Interface Design Scheme</td>
<td>Create runtime layer to abstract version interface, extract versions of k3s, k0s, and Kubernetes</td>
<td></td>
<td></td>
<td>❌</td>
<td>5</td>
</tr>
<tr>
<td>RFC</td>
<td>Supplement k3s implementation</td>
<td></td>
<td></td>
<td>❌</td>
<td>6</td>
</tr>
<tr>
<td>RFC</td>
<td>Add control for APP calls using Pack, research buildpacks</td>
<td></td>
<td></td>
<td>❌</td>
<td>7</td>
</tr>
</tbody>
</table>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '37.md' style='float:left'>⬆️上一节🔗  </a><a href = '39.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


