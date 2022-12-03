<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第32节-kubernetes-目录结构" tabindex="-1"><a class="header-anchor" href="#第32节-kubernetes-目录结构" aria-hidden="true">#</a> 第32节 kubernetes 目录结构</h1>
<div><a href = '31.md' style='float:left'>⬆️上一节🔗  </a><a href = '33.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="分类" tabindex="-1"><a class="header-anchor" href="#分类" aria-hidden="true">#</a> 分类</h2>
<p>Kubernetes的代码都在kubernetes目录下，如图，根据功能主要分成以下几类：
1、<code v-pre>文档类</code>（api、docs、logo）
2、<code v-pre>工具类</code>（build、cluster、Godeps、hack、staging、translations）
3、<code v-pre>代码类</code>（cmd、pkg、plugin、test、third_party）</p>
<p>工具类主要用到的build目录下的文件，自己动手编译的时候会用到；</p>
<p><strong>核心代码集中在cmd和pkg中。</strong></p>
<p>cmd内部包含各个组件的入口，具体核心的实现部分在pkg目录下。</p>
<p>我们每一个 可执行文件都对应 cmd</p>
<p><strong>关于其他目录：</strong></p>
<p><code v-pre>plugin</code> 目录之前的版本包括 <code v-pre>scheduler</code> 部分的代码，当前版本（应该是在1.10之后）已经将scheduler部分代码移到和其他组件一致的 <code v-pre>pkg</code> 目录，所以目前 <code v-pre>plugin</code> 主要包含的是<code v-pre>认证</code>与<code v-pre>鉴权</code>部分的代码。</p>
<h2 id="根目录" tabindex="-1"><a class="header-anchor" href="#根目录" aria-hidden="true">#</a> 根目录</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1</span>
<span class="token builtin class-name">.</span>
├── api
├── build
├── CHANGELOG
├── CHANGELOG.md -<span class="token operator">></span> CHANGELOG/README.md
├── cluster
├── cmd
├── code-of-conduct.md
├── CONTRIBUTING.md
├── docs
├── go.mod
├── go.sum
├── hack
├── LICENSE
├── LICENSES
├── logo
├── Makefile -<span class="token operator">></span> build/root/Makefile
├── Makefile.generated_files -<span class="token operator">></span> build/root/Makefile.generated_files
├── _output
├── OWNERS
├── OWNERS_ALIASES
├── pkg
├── plugin
├── README.md
├── SECURITY_CONTACTS
├── staging
├── SUPPORT.md
├── <span class="token builtin class-name">test</span>
├── third_party
└── vendor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pkg" tabindex="-1"><a class="header-anchor" href="#pkg" aria-hidden="true">#</a> pkg</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>大量的 kubernetes 的源码所在，除了被抽离为单独组件的部分，例如 api server 的代码，proxy 组件的代码，kubelet 组件的代码。</p>
<ul>
<li>业务逻辑都在 pkg</li>
<li>命令行参数都在 cmd</li>
</ul>
</div>
<p><strong>关于两个组件： <code v-pre>./pkg/api</code> 和 <code v-pre>./pkg/apis</code></strong></p>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>Api 文件夹下包含和Open API 相关的模型定义等内容。</p>
<p><strong>名称不一样，作用是完全不一样的。</strong></p>
<ul>
<li>
<p>用于根据 OpenAPI 规范形成符合其规定的 API</p>
</li>
<li>
<p>apis 是包含内建 API Groups 和 API Objects 的，而 scheme 相关的代码大部分在这里。</p>
</li>
</ul>
</div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 pkg</span>
pkg
├── api
├── apis
├── auth
├── capabilities
├── client
├── cloudprovider
├── cluster
├── controller
├── controlplane
├── credentialprovider
├── features
├── fieldpath
├── generated
├── kubeapiserver
├── kubectl
├── kubelet
├── kubemark
├── OWNERS
├── printers
├── probe
├── proxy
├── <span class="token function">quota</span>
├── registry
├── routes
├── scheduler
├── security
├── securitycontext
├── serviceaccount
├── util
├── volume
└── windows
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd" aria-hidden="true">#</a> cmd</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 cmd</span>
cmd
├── clicheck
├── cloud-controller-manager
├── dependencycheck
├── dependencyverifier
├── gendocs
├── genkubedocs
├── genman
├── genswaggertypedocs
├── genutils
├── genyaml
├── importverifier
├── kubeadm
├── kube-apiserver
├── kube-controller-manager
├── kubectl
├── kubectl-convert
├── kubelet
├── kubemark
├── kube-proxy
├── kube-scheduler
├── linkcheck
├── OWNERS
├── preferredimports
├── prune-junit-xml
└── yamlfmt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p><code v-pre>kube-apiserver</code> 中有 <code v-pre>apiserver.go</code> 文件，就是 <code v-pre>apiserver</code> 启动入口</p>
</div>
<h2 id="build" tabindex="-1"><a class="header-anchor" href="#build" aria-hidden="true">#</a> build</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 build</span>
build
├── build-image
├── common.sh
├── copy-output.sh
├── dependencies.yaml
├── lib
├── make-build-image.sh
├── make-clean.sh
├── nsswitch.conf
├── OWNERS
├── package-tarballs.sh
├── pause
├── README.md
├── release-images.sh
├── release-in-a-container.sh
├── release.sh
├── root
├── run.sh
├── server-image
├── shell.sh
├── tools.go
└── util.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vendor" tabindex="-1"><a class="header-anchor" href="#vendor" aria-hidden="true">#</a> vendor</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 vendor/</span>
vendor/
├── bitbucket.org
├── cloud.google.com
├── github.com
├── go.etcd.io
├── golang.org
├── gonum.org
├── google.golang.org
├── go.opencensus.io
├── go.opentelemetry.io
├── gopkg.in
├── go.starlark.net
├── go.uber.org
├── k8s.io
├── modules.txt
├── OWNERS
└── sigs.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hack" tabindex="-1"><a class="header-anchor" href="#hack" aria-hidden="true">#</a> hack</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 hack/</span>
hack/
├── benchmark-go.sh
├── boilerplate
├── build-cross.sh
├── build-go.sh
├── cherry_pick_pull.sh
├── conformance
├── dev-build-and-push.sh
├── dev-build-and-up.sh
├── dev-push-conformance.sh
├── e2e-internal
├── e2e-node-test.sh
├── generate-docs.sh
├── gen-swagger-doc
├── get-build.sh
├── ginkgo-e2e.sh
├── grab-profiles.sh
├── install-etcd.sh
├── jenkins
├── lib
├── lint-dependencies.sh
├── list-feature-tests.sh
├── local-up-cluster.sh
├── logcheck.conf
├── make-rules
├── module-graph.sh
├── OWNERS
├── pin-dependency.sh
├── print-workspace-status.sh
├── README.md
├── run-in-gopath.sh
├── run-prometheus-on-etcd-scrapes.sh
├── serve-prom-scrapes.sh
├── testdata
├── test-go.sh
├── test-integration.sh
├── tools
├── unwanted-dependencies.json
├── update-all.sh
├── update-codegen.sh
├── update-conformance-yaml.sh
├── update-generated-api-compatibility-data.sh
├── update-generated-device-plugin-dockerized.sh
├── update-generated-device-plugin.sh
├── update-generated-docs.sh
├── update-generated-kms-dockerized.sh
├── update-generated-kms.sh
├── update-generated-kubelet-plugin-registration-dockerized.sh
├── update-generated-kubelet-plugin-registration.sh
├── update-generated-pod-resources-dockerized.sh
├── update-generated-pod-resources.sh
├── update-generated-protobuf-dockerized.sh
├── update-generated-protobuf.sh
├── update-generated-runtime-dockerized.sh
├── update-generated-runtime.sh
├── update-generated-stable-metrics.sh
├── update-generated-swagger-docs.sh
├── update-gofmt.sh
├── update-import-aliases.sh
├── update-internal-modules.sh
├── update-kustomize.sh
├── update-mocks.sh
├── update-netparse-cve.sh
├── update-openapi-spec.sh
├── update-translations.sh
├── update-vendor-licenses.sh
├── update-vendor.sh
├── update-yamlfmt.sh
├── verify-all.sh
├── verify-api-groups.sh
├── verify-boilerplate.sh
├── verify-cli-conventions.sh
├── verify-codegen.sh
├── verify-conformance-requirements.sh
├── verify-conformance-yaml.sh
├── verify-description.sh
├── verify-e2e-test-ownership.sh
├── verify-external-dependencies-version.sh
├── verify-flags
├── verify-flags-underscore.py
├── verify-generated-device-plugin.sh
├── verify-generated-docs.sh
├── verify-generated-files-remake.sh
├── verify-generated-files.sh
├── verify-generated-kms.sh
├── verify-generated-kubelet-plugin-registration.sh
├── verify-generated-pod-resources.sh
├── verify-generated-protobuf.sh
├── verify-generated-runtime.sh
├── verify-generated-stable-metrics.sh
├── verify-generated-swagger-docs.sh
├── verify-gofmt.sh
├── verify-golangci-lint.sh
├── verify-govet-levee.sh
├── verify-govet.sh
├── verify-import-aliases.sh
├── verify-import-boss.sh
├── verify-imports.sh
├── verify-internal-modules.sh
├── verify-linkcheck.sh
├── verify-mocks.sh
├── verify-netparse-cve.sh
├── verify-non-mutating-validation.sh
├── verify-no-vendor-cycles.sh
├── verify-openapi-spec.sh
├── verify-pkg-names.sh
├── verify-prerelease-lifecycle-tags.sh
├── verify-prometheus-imports.sh
├── verify-publishing-bot.py
├── verify-readonly-packages.sh
├── verify-shellcheck.sh
├── verify-spelling.sh
├── verify-staging-meta-files.sh
├── verify-test-code.sh
├── verify-test-featuregates.sh
├── verify-test-images.sh
├── verify-typecheck-providerless.sh
├── verify-typecheck.sh
├── verify-vendor-licenses.sh
├── verify-vendor.sh
└── verify-yamlfmt.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="plugin" tabindex="-1"><a class="header-anchor" href="#plugin" aria-hidden="true">#</a> plugin</h2>
<p><code v-pre>plugin</code>目录之前的版本包括 <code v-pre>scheduler</code> 部分的代码，当前版本（应该是在1.10之后）已经将scheduler部分代码移到和其他组件一致的pkg目录，所以目前 <code v-pre>plugin</code> 主要包含的是<code v-pre>认证</code>与<code v-pre>鉴权</code>部分的代码。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree plugin/ -L 4</span>
plugin/
├── OWNERS
└── pkg
    ├── admission
    │   ├── admit
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── alwayspullimages
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── antiaffinity
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   └── doc.go
    │   ├── certificates
    │   │   ├── approval
    │   │   ├── OWNERS
    │   │   ├── signing
    │   │   ├── subjectrestriction
    │   │   └── util.go
    │   ├── defaulttolerationseconds
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── deny
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── eventratelimit
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   ├── apis
    │   │   ├── cache.go
    │   │   ├── cache_test.go
    │   │   ├── config.go
    │   │   ├── doc.go
    │   │   └── limitenforcer.go
    │   ├── extendedresourcetoleration
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── gc
    │   │   ├── gc_admission.go
    │   │   └── gc_admission_test.go
    │   ├── imagepolicy
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   ├── certs_test.go
    │   │   ├── config.go
    │   │   ├── config_test.go
    │   │   ├── doc.go
    │   │   ├── gencerts.sh
    │   │   └── OWNERS
    │   ├── limitranger
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   └── interfaces.go
    │   ├── namespace
    │   │   ├── autoprovision
    │   │   └── exists
    │   ├── network
    │   │   ├── defaultingressclass
    │   │   └── denyserviceexternalips
    │   ├── noderestriction
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   └── OWNERS
    │   ├── nodetaint
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── OWNERS
    │   ├── podnodeselector
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── podtolerationrestriction
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   ├── apis
    │   │   ├── config.go
    │   │   └── doc.go
    │   ├── priority
    │   │   ├── admission.go
    │   │   └── admission_test.go
    │   ├── resourcequota
    │   │   └── admission_test.go
    │   ├── runtimeclass
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   └── OWNERS
    │   ├── security
    │   │   ├── doc.go
    │   │   ├── podsecurity
    │   │   └── podsecuritypolicy
    │   ├── securitycontext
    │   │   └── scdeny
    │   ├── serviceaccount
    │   │   ├── admission.go
    │   │   ├── admission_test.go
    │   │   ├── doc.go
    │   │   └── OWNERS
    │   └── storage
    │       ├── persistentvolume
    │       ├── storageclass
    │       └── storageobjectinuseprotection
    └── auth
        ├── authenticator
        │   ├── OWNERS
        │   └── token
        ├── authorizer
        │   ├── doc.go
        │   ├── <span class="token function">node</span>
        │   ├── OWNERS
        │   └── rbac
        ├── doc.go
        └── OWNERS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '31.md' style='float:left'>⬆️上一节🔗  </a><a href = '33.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


