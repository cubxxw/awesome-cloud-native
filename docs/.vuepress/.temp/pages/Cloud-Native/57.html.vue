<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第57节-提案-sealer-构建工程设计" tabindex="-1"><a class="header-anchor" href="#第57节-提案-sealer-构建工程设计" aria-hidden="true">#</a> 第57节 提案 sealer 构建工程设计</h1>
<div><a href = '56.md' style='float:left'>⬆️上一节🔗  </a><a href = '58.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h1 id="中文-sealer-构建工程设计" tabindex="-1"><a class="header-anchor" href="#中文-sealer-构建工程设计" aria-hidden="true">#</a> [中文] sealer 构建工程设计</h1>
<h2 id="起因" tabindex="-1"><a class="header-anchor" href="#起因" aria-hidden="true">#</a> 起因</h2>
<p>sealer 的 Makefile 设计过于单一和简陋，构建脚本(<a href="http://build.sh" target="_blank" rel="noopener noreferrer">build.sh<ExternalLinkIcon/></a>) 过于陈旧和厚重，我们可以通过一些设计方案来对 Makefile 和 <a href="http://build.sh" target="_blank" rel="noopener noreferrer">build.sh<ExternalLinkIcon/></a> 进行设计以及改进，让它们看上去很友好。</p>
<p>Makefile 的重构设计到很多的改变，包括一些模块的微调和 CICD actions 的变化，这些都会涉及到，也会慢慢设计，为此，之前我提过一个 RFC，移步到 → https://github.com/sealerio/sealer/issues/2148</p>
<p><strong>Notion 文档：</strong></p>
<ul>
<li><a href="https://nsddd.notion.site/sealer-construction-engineering-design-e98b303493d5492e98aff79afadc1cce" target="_blank" rel="noopener noreferrer">https://nsddd.notion.site/sealer-construction-engineering-design-e98b303493d5492e98aff79afadc1cce<ExternalLinkIcon/></a></li>
</ul>
<h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例</h2>
<aside> ❓ 是否有相同的案例，或者经验？</aside>
<p>这是有的，在网易的 <a href="https://github.com/horizoncd" target="_blank" rel="noopener noreferrer">horizoncd<ExternalLinkIcon/></a> 社区中，我成功设计了一套完整的 Makefile 流程并且可以使用。并且帮助他们改进了<a href="https://github.com/horizoncd/horizon/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">贡献者文档<ExternalLinkIcon/></a>。在它们的项目中，我们能找到一套已经实现的方案，并且提出了设计文稿：https://github.com/horizoncd/horizon/issues/100：</p>
<p><a href="https://github.com/horizoncd/horizon" target="_blank" rel="noopener noreferrer">GitHub - horizoncd/horizon: Production-Grade GitOps CD PlatForm For CloudNative Applications, MiddleWares, etc.<ExternalLinkIcon/></a></p>
<p>🎯 相比较 horizon，sealer 的设计有哪些危险信号：</p>
<ul>
<li>sealer 支持多二进制编译，需要很好的扩展性，并且正确的通过 <strong>并行编译</strong> 提高编译速度。</li>
<li>sealer 有些 <code v-pre>cgo\c</code> 代码涉及到 <code v-pre>containers_image_openpgp exclude_graphdriver_devicemapper exclude_graphdriver_btrfs</code> 进行编译。</li>
</ul>
<p><a href="https://github.com/mtrmac/image/blob/ed2844ccc615a447b98344d1bbefca61b3cb7749/README.md" target="_blank" rel="noopener noreferrer">image/README.md at ed2844ccc615a447b98344d1bbefca61b3cb7749 · mtrmac/image<ExternalLinkIcon/></a></p>
<p>这样提高了编译和测试的难度，经过调研，我选择的测试方案是 <code v-pre>junit-report</code> ，在本地使用 <code v-pre>tmp</code> 临时目录作为缓存，提高覆盖率测试速度。</p>
<h2 id="模块方案" tabindex="-1"><a class="header-anchor" href="#模块方案" aria-hidden="true">#</a> 模块方案</h2>
<p>迁移目录 <a href="https://github.com/sealerio/sealer/pull/2161/files#diff-73b8ec8a05213857da6e9598e34c5d7a18a6e5349250908ae6710578236977f2" target="_blank" rel="noopener noreferrer">version/version.go → pkg/version/version.go<ExternalLinkIcon/></a></p>
<p>将 <code v-pre>hack/</code> 改名为 <code v-pre>scripts/</code></p>
<p>这些文件的作用如下：</p>
<ul>
<li>LICENSE_TEMPLATE：包含许可证的文本模板。</li>
<li>boilerplate.go.txt：生成新 Go 文件时使用的文本模板（不再使用）。</li>
<li><a href="http://build.sh/" target="_blank" rel="noopener noreferrer">build.sh<ExternalLinkIcon/></a>：新的构建脚本</li>
<li><code v-pre>coverage.awk</code>：用于从 Go 测试文件中提取覆盖率数据的 AWK 脚本。</li>
<li><code v-pre>make-rules/</code>：包含 Makefile 规则的目录。
<ul>
<li><a href="http://common.mk/" target="_blank" rel="noopener noreferrer">common.mk<ExternalLinkIcon/></a>：包含通用变量和规则的 Makefile，所有 mk 通用。</li>
<li><a href="http://copyright.mk/" target="_blank" rel="noopener noreferrer">copyright.mk<ExternalLinkIcon/></a>：用于生成代码中的版权信息的 Makefile。</li>
<li><a href="http://dependencies.mk/" target="_blank" rel="noopener noreferrer">dependencies.mk<ExternalLinkIcon/></a>：包含依赖关系图和生成依赖关系的 Makefile 规则。</li>
<li><a href="http://gen.mk/" target="_blank" rel="noopener noreferrer">gen.mk<ExternalLinkIcon/></a>：用于生成代码的 Makefile。</li>
<li><a href="http://golang.mk/" target="_blank" rel="noopener noreferrer">golang.mk<ExternalLinkIcon/></a>：包含与 Go 编译器和工具链相关的 Makefile 规则。</li>
<li><a href="http://image.mk/" target="_blank" rel="noopener noreferrer">image.mk<ExternalLinkIcon/></a>：包含与 Docker 镜像生成相关的 Makefile 规则。</li>
<li><a href="http://tools.mk/" target="_blank" rel="noopener noreferrer">tools.mk<ExternalLinkIcon/></a>：包含构建与测试工具的 Makefile 规则。</li>
</ul>
</li>
</ul>
<hr>
<aside> 🔥 分为三个模块，分别是新扩展的 Makefile 演示、脚本改进的演示，以及 CICD 流的改进：
</aside>
<h2 id="makefile" tabindex="-1"><a class="header-anchor" href="#makefile" aria-hidden="true">#</a> makefile</h2>
<p>最常用的帮助信息，放入到 <code v-pre>Makefile/</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>❯ <span class="token builtin">make</span> help

Usage<span class="token punctuation">:</span> <span class="token builtin">make</span> <span class="token operator">&lt;</span>TARGETS<span class="token operator">></span> <span class="token operator">&lt;</span>OPTIONS<span class="token operator">></span> <span class="token operator">...</span>

Targets<span class="token punctuation">:</span>

  build                        Build binaries by <span class="token keyword">default</span>
  tidy                         tidy <span class="token keyword">go</span><span class="token punctuation">.</span>mod
  vendor                       vendor <span class="token keyword">go</span><span class="token punctuation">.</span>mod
  fmt                          Run <span class="token keyword">go</span> fmt against code<span class="token punctuation">.</span>
  vet                          Run <span class="token keyword">go</span> vet against code<span class="token punctuation">.</span>
  lint                         Check syntax and styling of <span class="token keyword">go</span> sources<span class="token punctuation">.</span>
  style                        code style <span class="token operator">-</span><span class="token operator">></span> fmt<span class="token punctuation">,</span>vet<span class="token punctuation">,</span>lint
  linux                        Build the all with a build script
  linux<span class="token punctuation">.</span><span class="token operator">%</span>                      Build binaries <span class="token keyword">for</span> Linux <span class="token punctuation">(</span><span class="token builtin">make</span> linux<span class="token punctuation">.</span>amd64 OR <span class="token builtin">make</span> linux<span class="token punctuation">.</span>arm64<span class="token punctuation">)</span>
  format                       Gofmt <span class="token punctuation">(</span>reformat<span class="token punctuation">)</span> <span class="token keyword">package</span> sources <span class="token punctuation">(</span>exclude vendor dir <span class="token keyword">if</span> existed<span class="token punctuation">)</span><span class="token punctuation">.</span>
  test                         Run unit test<span class="token punctuation">.</span>
  cover                        Run unit test and get test coverage<span class="token punctuation">.</span>
  updates                      Check <span class="token keyword">for</span> updates to <span class="token keyword">go</span><span class="token punctuation">.</span>mod dependencies
  imports                      task to automatically handle <span class="token keyword">import</span> packages in Go files using goimports tool
  clean                        Remove all files that are created by building<span class="token punctuation">.</span>
  tools                        Install dependent tools<span class="token punctuation">.</span>
  build<span class="token operator">-</span>in<span class="token operator">-</span>docker              sealer should be compiled in linux platform<span class="token punctuation">,</span> otherwise there will be GraphDriver problem<span class="token punctuation">.</span>
  gen                          Generate all necessary files<span class="token punctuation">.</span>
  verify<span class="token operator">-</span>copyright             Verify the license headers <span class="token keyword">for</span> all files<span class="token punctuation">.</span>
  add<span class="token operator">-</span>copyright                Add copyright ensure source code files have license headers<span class="token punctuation">.</span>
  help                         Show this help info<span class="token punctuation">.</span>
  all<span class="token operator">-</span>help                     Show all help details info<span class="token punctuation">.</span>

Options<span class="token punctuation">:</span>

  DEBUG            Whether or not to generate debug symbols<span class="token punctuation">.</span> Default is <span class="token number">0.</span>

  BINS             Binaries to build<span class="token punctuation">.</span> Default is all binaries under cmd<span class="token punctuation">.</span>
                   This option is available when using<span class="token punctuation">:</span> <span class="token builtin">make</span> <span class="token punctuation">{</span>build<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">.</span>multiarch<span class="token punctuation">)</span>
                   Example<span class="token punctuation">:</span> <span class="token builtin">make</span> build BINS<span class="token operator">=</span><span class="token string">"sealer sealctl"</span>

  PLATFORMS        Platform to build <span class="token keyword">for</span><span class="token punctuation">.</span> Default is linux_arm64 and linux_amd64<span class="token punctuation">.</span>
                   This option is available when using<span class="token punctuation">:</span> <span class="token builtin">make</span> <span class="token punctuation">{</span>build<span class="token punctuation">}</span><span class="token punctuation">.</span>multiarch
                   Example<span class="token punctuation">:</span> <span class="token builtin">make</span> build<span class="token punctuation">.</span>multiarch PLATFORMS<span class="token operator">=</span><span class="token string">"linux_arm64 linux_amd64"</span>

  V                Set to <span class="token number">1</span> enable verbose build<span class="token punctuation">.</span> Default is <span class="token number">0.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>能解决更多问题，更加细致的 <code v-pre>Makefile</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">make</span> help-all
  go.build.verify                     Verify that a suitable version of Go exists
  go.bin.%                            Verify binary <span class="token keyword">for</span> specific platform
  go.build.%                          Build binary <span class="token keyword">for</span> specific platform
  go.build                            Build binaries
  go.build.multiarch                  Build multi-arch binaries
  go.linux-a                          Build the project with a build script, use
  go.linux-p                        
  go.linux.%                          Build linux_amd64 OR linux_arm64 binaries
  go.lint                             Run golangci to lint <span class="token builtin class-name">source</span> codes
  go.test                             Run unit <span class="token builtin class-name">test</span>
  go.test.junit-report                Run unit <span class="token builtin class-name">test</span>
  go.test.cover                       Run unit <span class="token builtin class-name">test</span> with coverage
  go.format                           Run unit <span class="token builtin class-name">test</span> and <span class="token function">format</span> codes
  imports                             task to automatically handle <span class="token function">import</span> packages <span class="token keyword">in</span> Go files using goimports tool
  go.updates                          Check <span class="token keyword">for</span> updates to go.mod dependencies
  go.clean                            Clean all builds directories and files
  copyright.help                      Show copyright <span class="token builtin class-name">help</span>
---------------------------------------------------------------------------------
  copyright.verify                    Validate boilerplate headers <span class="token keyword">for</span> assign files
  copyright.add                       Add the boilerplate headers <span class="token keyword">for</span> all files
  copyright.help                      Show copyright <span class="token builtin class-name">help</span>
---------------------------------------------------------------------------------
  tools.install                       Install a must tools
  tools.install-all                   Install all tools
  tools.install.%                     Install a single tool <span class="token keyword">in</span> <span class="token variable">$GOBIN</span>/
  tools.install-all.%                 Parallelism <span class="token function">install</span> a single tool <span class="token keyword">in</span> ./tools/*
  tools.verify.%                      Check <span class="token keyword">if</span> a tool is installed and <span class="token function">install</span> it
  install.golangci-lint               Install golangci-lint
  install.goimports                   Install goimports, used to <span class="token function">format</span> go <span class="token builtin class-name">source</span> files
  install.addlicense                  Install addlicense, used to <span class="token function">add</span> license header to <span class="token builtin class-name">source</span> files
  install.deepcopy-gen                Install deepcopy-gen, used to generate deep copy functions
  install.conversion-gen              Install conversion-gen, used to generate conversion functions
  install.ginkgo                      Install ginkgo to run a single <span class="token builtin class-name">test</span> or <span class="token builtin class-name">set</span> of tests
  install.go-junit-report             Install go-junit-report, used to convert go <span class="token builtin class-name">test</span> output to junit xml
  install.kube-score                  Install kube-score, used to check kubernetes yaml files
  install.kubeconform                 Install kubeconform, used to check kubernetes yaml files
  Install go-gitlint                  Install go-gitlint, used to check <span class="token function">git</span> commit message
  install.gsemver                     Install gsemver, used to generate semver
  install.git-chglog                  Install git-chglog, used to generate changelog
  install.github-release              Install github-release, used to create github release
  install.gvm                         Install gvm, gvm is a Go version manager, built on <span class="token function">top</span> of the official go tool.
  install.golines                     Install golines, used to <span class="token function">format</span> long lines
  install.go-mod-outdated             Install go-mod-outdated, used to check outdated dependencies
  install.mockgen                     Install mockgen, used to generate mock functions
  install.gotests                     Install gotests, used to generate <span class="token builtin class-name">test</span> functions
  install.protoc-gen-go               Install protoc-gen-go, used to generate go <span class="token builtin class-name">source</span> files from protobuf files
  install.cfssl                       Install cfssl, used to generate certificates
  install.depth                       Install depth, used to check dependency tree
  install.go-callvis                  Install go-callvis, used to visualize call graph
  install.gothanks                    Install gothanks, used to thank go dependencies
  install.richgo                      Install richgo
  install.rts                         Install rts
  install.codegen                     Install code generator, used to generate code
  tools.help                          Display <span class="token builtin class-name">help</span> information about the tools package
---------------------------------------------------------------------------------
  image.verify                        Verify <span class="token function">docker</span> version
  image.daemon.verify                 Verify <span class="token function">docker</span> daemon experimental features
  image.build                         Build <span class="token function">docker</span> images
  image.build.multiarch               Build <span class="token function">docker</span> images <span class="token keyword">for</span> all platforms
  image.build.%                       Build <span class="token function">docker</span> image <span class="token keyword">for</span> a specific platform
  image.push                          Push <span class="token function">docker</span> images
  image.push.multiarch                Push <span class="token function">docker</span> images <span class="token keyword">for</span> all platforms
  image.push.%                        Push <span class="token function">docker</span> image <span class="token keyword">for</span> a specific platform
  image.manifest.push                 Push manifest list <span class="token keyword">for</span> multi-arch images
  image.manifest.push.%               Push manifest list <span class="token keyword">for</span> multi-arch images <span class="token keyword">for</span> a specific platform
  image.manifest.remove.%             Remove <span class="token builtin class-name">local</span> manifest list
  image.manifest.push.multiarch       Push manifest list <span class="token keyword">for</span> multi-arch images <span class="token keyword">for</span> all platforms
  image.manifest.push.multiarch.%     Push manifest list <span class="token keyword">for</span> multi-arch images <span class="token keyword">for</span> all platforms <span class="token keyword">for</span> a specific image
  image.help                          Print <span class="token builtin class-name">help</span> <span class="token keyword">for</span> image targets
---------------------------------------------------------------------------------

Usage: <span class="token function">make</span> <span class="token operator">&lt;</span>TARGETS<span class="token operator">></span> <span class="token operator">&lt;</span>OPTIONS<span class="token operator">></span> <span class="token punctuation">..</span>.

Targets:

  build                        Build binaries by default
  tidy                         tidy go.mod
  vendor                       vendor go.mod
  <span class="token function">fmt</span>                          Run go <span class="token function">fmt</span> against code.
  vet                          Run go vet against code.
  lint                         Check syntax and styling of go sources.
  style                        code style -<span class="token operator">></span> fmt,vet,lint
  linux                        Build the all with a build script
  linux.%                      Build binaries <span class="token keyword">for</span> Linux <span class="token punctuation">(</span>make linux.amd64 OR <span class="token function">make</span> linux.arm64<span class="token punctuation">)</span>
  <span class="token function">format</span>                       Gofmt <span class="token punctuation">(</span>reformat<span class="token punctuation">)</span> package sources <span class="token punctuation">(</span>exclude vendor <span class="token function">dir</span> <span class="token keyword">if</span> existed<span class="token punctuation">)</span>.
  <span class="token builtin class-name">test</span>                         Run unit test.
  cover                        Run unit <span class="token builtin class-name">test</span> and get <span class="token builtin class-name">test</span> coverage.
  updates                      Check <span class="token keyword">for</span> updates to go.mod dependencies
  imports                      task to automatically handle <span class="token function">import</span> packages <span class="token keyword">in</span> Go files using goimports tool
  clean                        Remove all files that are created by building.
  tools                        Install dependent tools.
  build-in-docker              sealer should be compiled <span class="token keyword">in</span> linux platform, otherwise there will be GraphDriver problem.
  gen                          Generate all necessary files.
  verify-copyright             Verify the license headers <span class="token keyword">for</span> all files.
  add-copyright                Add copyright ensure <span class="token builtin class-name">source</span> code files have license headers.
  <span class="token builtin class-name">help</span>                         Show this <span class="token builtin class-name">help</span> info.
  all-help                     Show all <span class="token builtin class-name">help</span> details info.

Options:

  DEBUG            Whether or not to generate debug symbols. Default is <span class="token number">0</span>.

  BINS             Binaries to build. Default is all binaries under cmd.
                   This option is available when using: <span class="token function">make</span> <span class="token punctuation">{</span>build<span class="token punctuation">}</span><span class="token punctuation">(</span>.multiarch<span class="token punctuation">)</span>
                   Example: <span class="token function">make</span> build <span class="token assign-left variable">BINS</span><span class="token operator">=</span><span class="token string">"sealer sealctl"</span>

  PLATFORMS        Platform to build for. Default is linux_arm64 and linux_amd64.
                   This option is available when using: <span class="token function">make</span> <span class="token punctuation">{</span>build<span class="token punctuation">}</span>.multiarch
                   Example: <span class="token function">make</span> build.multiarch <span class="token assign-left variable">PLATFORMS</span><span class="token operator">=</span><span class="token string">"linux_arm64 linux_amd64"</span>

  V                Set to <span class="token number">1</span> <span class="token builtin class-name">enable</span> verbose build. Default is <span class="token number">0</span>.

Make example:

<span class="token comment"># make build BINS=sealer                                         Only a single sealer binary is built.</span>
<span class="token comment"># make -j  all                                           Run tidy gen add-copyright format lint cover build concurrently.</span>
<span class="token comment"># make gen                                                       Generate all necessary files.</span>
<span class="token comment"># make linux.arm64                                               sealer is compiled on arm64 platform.</span>
<span class="token comment"># make verify-copyright                                          Verify the license headers for all files.</span>
<span class="token comment"># make install-deepcopy-gen                                      Install deepcopy-gen tools if the license is missing.</span>
<span class="token comment"># make build BINS=sealer V=1 DEBUG=1                             Build debug binaries for only sealer.</span>
<span class="token comment"># make build.multiarch PLATFORMS="linux_arm64 linux_amd64" V=1   Build binaries for both platforms.</span>

Ariables:

  DEBUG: <span class="token number">0</span>
  BINS: sealer seautil
  PLATFORMS: linux_amd64 linux_arm64
  V:
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="可观测的编译信息" tabindex="-1"><a class="header-anchor" href="#可观测的编译信息" aria-hidden="true">#</a> 可观测的编译信息</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">make</span> build
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span><span class="token operator">></span> Verify that a suitable version of Go exists, current version: go version go1.20 linux/amd64
<span class="token assign-left variable">COMMAND</span><span class="token operator">=</span>sealer
<span class="token assign-left variable">PLATFORM</span><span class="token operator">=</span>linux_amd64
<span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span>/root/workspaces/sealer/_output/bin
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span><span class="token operator">></span> Building binary sealer v0.9.3.dirty <span class="token keyword">for</span> linux_amd64
<span class="token assign-left variable">COMMAND</span><span class="token operator">=</span>seautil
<span class="token assign-left variable">PLATFORM</span><span class="token operator">=</span>linux_amd64
<span class="token assign-left variable">BIN_DIR</span><span class="token operator">=</span>/root/workspaces/sealer/_output/bin
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span><span class="token operator">></span> Building binary seautil v0.9.3.dirty <span class="token keyword">for</span> linux_amd64
<span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span><span class="token operator">></span> Building binary sealer seautil v0.9.3.dirty <span class="token keyword">for</span> linux_amd64

❯ sealer version <span class="token comment">#-o yaml</span>
sealerVersion:
  major: <span class="token string">""</span>
  minor: <span class="token string">""</span>
  gitversion: untagged
  gitcommit: 7c086967e1ee44d33e095780639b0ee006edf6ad
  gittreestate: dirty
  builddate: <span class="token string">"2023-05-07T11:43:30Z"</span>
  goversion: go1.20
  compiler: gc
  platform: linux/amd64

❯ sealer version <span class="token parameter variable">-o</span> json
<span class="token punctuation">{</span><span class="token string">"sealerVersion"</span>:<span class="token punctuation">{</span><span class="token string">"gitVersion"</span><span class="token builtin class-name">:</span><span class="token string">"untagged"</span>,<span class="token string">"gitCommit"</span><span class="token builtin class-name">:</span><span class="token string">"7c086967e1ee44d33e095780639b0ee006edf6ad"</span>,<span class="token string">"gitTreeState"</span><span class="token builtin class-name">:</span><span class="token string">"dirty"</span>,<span class="token string">"buildDate"</span><span class="token builtin class-name">:</span><span class="token string">"2023-05-07T11:43:30Z"</span>,<span class="token string">"goVersion"</span><span class="token builtin class-name">:</span><span class="token string">"go1.20"</span>,<span class="token string">"compiler"</span><span class="token builtin class-name">:</span><span class="token string">"gc"</span>,<span class="token string">"platform"</span><span class="token builtin class-name">:</span><span class="token string">"linux/amd64"</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>很方便的打印出当前编译状态，甚至是编译的环境，以及通过 <code v-pre>v0.9.3.dirty</code> 判断 git 是否干净。</p>
<p>在 sealer 的 cmd 中，优化了可观测性代码部分。</p>
<h3 id="工具包" tabindex="-1"><a class="header-anchor" href="#工具包" aria-hidden="true">#</a> 工具包</h3>
<p>本工具包使用 Makefile 实现了一些 CICD 动作，包括代码分析、代码生成、测试、版本控制和实用工具。这些工具的安装方式如下：</p>
<ul>
<li>安装 golangci-lint: 用于代码分析</li>
<li>安装 goimports: 用于格式化 Go 源文件</li>
<li>安装 addlicense: 用于为源文件添加许可证头</li>
<li>安装 deepcopy-gen: 用于生成深度复制函数</li>
<li>安装 conversion-gen: 用于生成转换函数</li>
<li>安装 ginkgo: 用于运行单个测试或测试集</li>
<li>安装 go-junit-report: 用于将 Go 测试输出转换为 junit xml 格式</li>
<li>安装 kube-score: 用于检查 Kubernetes yaml 文件</li>
<li>安装 kubeconform: 用于检查 Kubernetes yaml 文件</li>
<li>安装 go-gitlint: 用于检查 git 提交信息</li>
<li>安装 gsemver: 用于生成 semver</li>
<li>安装 git-chglog: 用于生成 changelog</li>
<li>安装 github-release: 用于创建 Github Release</li>
<li>安装 golines: 用于格式化长行</li>
<li>安装 go-mod-outdated: 用于检查过时的依赖关系</li>
<li>安装 mockgen: 用于生成模拟函数</li>
<li>安装 gotests: 用于生成测试函数</li>
<li>安装 protoc-gen-go: 用于从 protobuf 文件生成 Go 源文件</li>
<li>安装 cfssl: 用于生成证书</li>
<li>安装 depth: 用于检查依赖树</li>
<li>安装 go-callvis: 用于可视化调用图</li>
<li>安装 gothanks: 用于感谢 Go 依赖项</li>
<li>安装 richgo: 用于丰富的测试输出</li>
<li>安装 rts: 用于查找 Go 类型定义</li>
<li>安装 codegen: 用于代码生成</li>
</ul>
<p>这些工具的安装路径为 $GOBIN 或 $TOOLS_DIR。有些工具需要从 Github 或私有源代码仓库进行安装，有些工具需要进行编译，需要一些特定的参数来安装。</p>
<p>这些工具的使用需要在 Makefile 中调用特定的目标，如下：</p>
<ul>
<li>tools.install: 用于安装必须的工具</li>
<li>tools.install-all: 用于安装所有工具</li>
<li>tools.install.%: 用于安装单个工具</li>
<li>tools.install-all.%: 用于并行安装单个工具</li>
<li>tools.verify.%: 用于检查工具是否已安装并安装它</li>
</ul>
<h3 id="工具说明" tabindex="-1"><a class="header-anchor" href="#工具说明" aria-hidden="true">#</a> 工具说明</h3>
<p>下面是每个工具的详细说明：</p>
<ul>
<li>golangci-lint: 用于对 Go 代码进行快速检查的工具，它可以检查常见的错误和潜在的错误，比如：代码风格、不安全的代码、空指针引用、性能问题等。</li>
<li>goimports: 用于格式化 Go 代码的工具，它可以自动添加或删除未使用的导入，将导入分组，并将包名按字典序排序。</li>
<li>addlicense: 用于自动为源文件添加许可证头的工具，可以设置多种类型的许可证。</li>
<li>deepcopy-gen: 用于为 Go 结构体生成深度复制函数的代码生成器。</li>
<li>conversion-gen: 用于为 Go 结构体生成转换函数的代码生成器。</li>
<li>ginkgo: 用于运行单个测试或测试集的测试框架，可以使用 Gomega 断言库。</li>
<li>go-junit-report: 用于将 Go 测试输出转换为 junit xml 格式的工具，用于与其他测试工具或 CICD 流程集成。</li>
<li>kube-score: 用于检查 Kubernetes yaml 文件的工具，它可以检查文件中的最佳实践和安全问题。</li>
<li>kubeconform: 用于检查 Kubernetes yaml 文件的工具，它可以检查文件中的最佳实践和安全问题。</li>
<li>……</li>
</ul>
<h3 id="设计技巧" tabindex="-1"><a class="header-anchor" href="#设计技巧" aria-hidden="true">#</a> 设计技巧</h3>
<p>这里有一个巧妙的设计，我们新增了一个 <code v-pre>tools</code> 目录。不是所有工具都安装在 <code v-pre>GOPATH/bin</code> 目录下，而是将 <code v-pre>tools.install</code> 安装逻辑放入了 <code v-pre>GOPATH/bin</code>，将 <code v-pre>tools.verify.%</code> 逻辑都放在了 <code v-pre>tools</code> 的管理之下。其他的 <code v-pre>targer</code> 对象是通过 <code v-pre>tools.verify.%</code> 调用的。这对于后期维护非常方便，尤其是在使用工具下的 <code v-pre>gvm</code> 管理 Go 语言版本时。</p>
<h3 id="存在的问题" tabindex="-1"><a class="header-anchor" href="#存在的问题" aria-hidden="true">#</a> 存在的问题</h3>
<p>因为 cgo 的原因，单元测试和测试覆盖率依旧很难保证顺利运行</p>
<p>使用 <code v-pre>go.build.multiarch</code> 编译的时候，可以保证 <code v-pre>amd64</code> 顺利通过，但是不能保证 <code v-pre>arm64</code> 编译。</p>
<ul>
<li>
<p>报错信息</p>
<p>cgo: C compiler &quot;aarch64-linux-gnu-gcc&quot; not found: exec: &quot;aarch64-linux-gnu-gcc&quot;: executable file not found in $PATH</p>
</li>
</ul>
<p>需要优化一些关于版本的代码</p>
<h3 id="构建脚本优化" tabindex="-1"><a class="header-anchor" href="#构建脚本优化" aria-hidden="true">#</a> 构建脚本优化</h3>
<p>一样的，通过帮助信息，可以很清晰的了解：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ ./scripts/build.sh <span class="token parameter variable">-h</span>

Usage: ./scripts/build.sh <span class="token punctuation">[</span>-h<span class="token punctuation">]</span> <span class="token punctuation">[</span>-p PLATFORMS<span class="token punctuation">]</span> <span class="token punctuation">[</span>-a<span class="token punctuation">]</span> <span class="token punctuation">[</span>-b BINARIES<span class="token punctuation">]</span>

Build Sealer binaries <span class="token keyword">for</span> one or <span class="token function">more</span> platforms.
    DOTO: I recommend using a Makefile <span class="token keyword">for</span> a <span class="token function">more</span> immersive experience

    -h, <span class="token parameter variable">--help</span>      display this <span class="token builtin class-name">help</span> and <span class="token builtin class-name">exit</span>

    -p, <span class="token parameter variable">--platform</span>  build binaries <span class="token keyword">for</span> the specified platform<span class="token punctuation">(</span>s<span class="token punctuation">)</span>, e.g. linux/amd64 or linux/arm64.
                    Multiple platforms should be separated by comma, e.g. linux/amd64,linux/arm64.

    -a, <span class="token parameter variable">--all</span>       build binaries <span class="token keyword">for</span> all supported platforms

    -b, <span class="token parameter variable">--binary</span>    build the specified binary/binaries, e.g. sealer or seautil.
                    Multiple binaries should be separated by comma, e.g. sealer,seautil.
                    <span class="token punctuation">(</span>note: currently only supported <span class="token keyword">in</span> Makefile<span class="token punctuation">)</span>

+ <span class="token builtin class-name">exit</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>构建脚本 <code v-pre>build.sh</code> 支持多种选项，包括构建指定 binary/binaries（仅在 Makefile 中支持）、构建指定 platform(s) 和构建所有支持的 platform(s)，不过目前不支持~</li>
</ul>
<h3 id="cicd-actions-的改进策略" tabindex="-1"><a class="header-anchor" href="#cicd-actions-的改进策略" aria-hidden="true">#</a> CICD actions 的改进策略</h3>
<p>Makefile 的改进，可能导致部分 actions 没办法顺利通过。后面我将会继续优化 CICD 流程。</p>
<p>……</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '56.md' style='float:left'>⬆️上一节🔗  </a><a href = '58.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


