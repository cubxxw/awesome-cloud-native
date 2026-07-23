<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第98节-open-im-server-development-tools-guide" tabindex="-1"><a class="header-anchor" href="#第98节-open-im-server-development-tools-guide" aria-hidden="true">#</a> 第98节 Open-IM-Server Development Tools Guide</h1>
<div><a href = '97.md' style='float:left'>⬆️上一节🔗  </a><a href = '99.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p>Open-IM-Server boasts a robust set of tools encapsulated within its Makefile system, designed to ease development, code formatting, and tool management. This guide aims to familiarize developers with the features and usage of the Makefile toolset provided within the Open-IM-Server project.</p>
<h2 id="getting-started" tabindex="-1"><a class="header-anchor" href="#getting-started" aria-hidden="true">#</a> Getting Started</h2>
<p>Executing <code v-pre>make tools</code> ensures verification and installation of the default tools:</p>
<ul>
<li>golangci-lint</li>
<li>goimports</li>
<li>addlicense</li>
<li>deepcopy-gen</li>
<li>conversion-gen</li>
<li>ginkgo</li>
<li>go-junit-report</li>
<li>go-gitlint</li>
</ul>
<p>The installation path is situated at <code v-pre>/root/workspaces/openim/Open-IM-Server/_output/tools/</code>.</p>
<h2 id="toolset-categories" tabindex="-1"><a class="header-anchor" href="#toolset-categories" aria-hidden="true">#</a> Toolset Categories</h2>
<p>The Makefile logically groups tools into different categories for better management:</p>
<ul>
<li><strong>Development Tools</strong>: <code v-pre>BUILD_TOOLS</code></li>
<li><strong>Code Analysis Tools</strong>: <code v-pre>ANALYSIS_TOOLS</code></li>
<li><strong>Code Generation Tools</strong>: <code v-pre>GENERATION_TOOLS</code></li>
<li><strong>Testing Tools</strong>: <code v-pre>TEST_TOOLS</code></li>
<li><strong>Version Control Tools</strong>: <code v-pre>VERSION_CONTROL_TOOLS</code></li>
<li><strong>Utility Tools</strong>: <code v-pre>UTILITY_TOOLS</code></li>
<li><strong>Tencent Cloud Object Storage Tools</strong>: <code v-pre>COS_TOOLS</code></li>
</ul>
<h2 id="installation-commands" tabindex="-1"><a class="header-anchor" href="#installation-commands" aria-hidden="true">#</a> Installation Commands</h2>
<ol>
<li><strong>golangci-lint</strong>: high performance Go code linter with integration of multiple inspection tools.</li>
<li><strong>goimports</strong>: Used to format Go source files and automatically add or remove imports.</li>
<li><strong>addlicense</strong>: Adds a license header to the source file.</li>
<li>**deepcopy-gen and conversions-gen **: Generate deepcopy and conversion functionality.</li>
<li><strong>ginkgo</strong>: Testing framework for Go.</li>
<li><strong>go-junit-report</strong>: Converts Go test output to junit xml format.</li>
<li><strong>go-gitlint</strong>: For checking git commit information. ... (And so on, list all the tools according to the <code v-pre>make tools.help</code> output above)...</li>
</ol>
<h3 id="basic-installation" tabindex="-1"><a class="header-anchor" href="#basic-installation" aria-hidden="true">#</a> Basic Installation</h3>
<ul>
<li><code v-pre>tools.install</code>: Installs tools mentioned in the <code v-pre>BUILD_TOOLS</code> list.</li>
<li><code v-pre>tools.install-all</code>: Installs all tools from the <code v-pre>ALL_TOOLS</code> list.</li>
</ul>
<h3 id="individual-tool-installation" tabindex="-1"><a class="header-anchor" href="#individual-tool-installation" aria-hidden="true">#</a> Individual Tool Installation</h3>
<ul>
<li><code v-pre>tools.install.%</code>: Installs a single tool in the <code v-pre>$GOBIN/</code> directory.</li>
<li><code v-pre>tools.install-all.%</code>: Parallelly installs an individual tool located in <code v-pre>./tools/*</code>.</li>
</ul>
<h3 id="tool-verification" tabindex="-1"><a class="header-anchor" href="#tool-verification" aria-hidden="true">#</a> Tool Verification</h3>
<ul>
<li><code v-pre>tools.verify.%</code>: Checks if a specific tool is installed, and if not, installs it.</li>
</ul>
<h2 id="detailed-tool-descriptions" tabindex="-1"><a class="header-anchor" href="#detailed-tool-descriptions" aria-hidden="true">#</a> Detailed Tool Descriptions</h2>
<p>The following commands serve the purpose of installing particular development tools:</p>
<ul>
<li><code v-pre>install.golangci-lint</code>: Installs <code v-pre>golangci-lint</code>.</li>
<li><code v-pre>install.addlicense</code>: Installs <code v-pre>addlicense</code>. ... (and so on for every tool as mentioned in the provided Makefile source)...</li>
</ul>
<p>The commands primarily leverage Go's <code v-pre>install</code> operation, fetching and installing tools from their respective repositories. This method is especially convenient as it auto-handles dependencies and installation paths. For tools not written directly with Go (like <code v-pre>install.coscli</code>), other installation methods like wget or pip are employed.</p>
<h2 id="best-practices" tabindex="-1"><a class="header-anchor" href="#best-practices" aria-hidden="true">#</a> Best Practices</h2>
<ol>
<li><strong>Regular Updates</strong>: To ensure tools are up-to-date, periodically run the <code v-pre>make tools</code> command.</li>
<li><strong>Individual Tools</strong>: If only specific tools are required, employ the <code v-pre>make install.&lt;tool-name&gt;</code> command for individual installations.</li>
<li><strong>Verification</strong>: Before code submissions, use the <code v-pre>make tools.verify.%</code> command to guarantee that all necessary tools are present and up-to-date.</li>
</ol>
<h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2>
<p>The Makefile provided by Open-IM-Server presents a centralized approach to manage and install all necessary tools during the development process. It ensures that all developers employ consistent tool versions, reducing potential issues due to version disparities. Whether you're a maintainer or a contributor to the Open-IM-Server project, understanding the workings of this Makefile will significantly enhance your developmental efficiency.</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '97.md' style='float:left'>⬆️上一节🔗  </a><a href = '99.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


