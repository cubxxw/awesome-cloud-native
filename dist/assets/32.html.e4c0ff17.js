import{_ as a,r as d,o as r,c as v,a as e,b as n,w as c,e as i,d as u}from"./app.f7df423e.js";const o={},m={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},t=i("author"),b=e("h1",{id:"\u7B2C32\u8282-kubernetes-\u76EE\u5F55\u7ED3\u6784",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C32\u8282-kubernetes-\u76EE\u5F55\u7ED3\u6784","aria-hidden":"true"},"#"),i(" \u7B2C32\u8282 kubernetes \u76EE\u5F55\u7ED3\u6784")],-1),p=e("div",null,[e("a",{href:"31.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"33.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),h=e("br",null,null,-1),g=i("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),f={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},k=i("http://nsddd.top"),y=u(`<hr><p>[TOC]</p><h2 id="\u5206\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u5206\u7C7B" aria-hidden="true">#</a> \u5206\u7C7B</h2><p>Kubernetes\u7684\u4EE3\u7801\u90FD\u5728kubernetes\u76EE\u5F55\u4E0B\uFF0C\u5982\u56FE\uFF0C\u6839\u636E\u529F\u80FD\u4E3B\u8981\u5206\u6210\u4EE5\u4E0B\u51E0\u7C7B\uFF1A 1\u3001<code>\u6587\u6863\u7C7B</code>\uFF08api\u3001docs\u3001logo\uFF09 2\u3001<code>\u5DE5\u5177\u7C7B</code>\uFF08build\u3001cluster\u3001Godeps\u3001hack\u3001staging\u3001translations\uFF09 3\u3001<code>\u4EE3\u7801\u7C7B</code>\uFF08cmd\u3001pkg\u3001plugin\u3001test\u3001third_party\uFF09</p><p>\u5DE5\u5177\u7C7B\u4E3B\u8981\u7528\u5230\u7684build\u76EE\u5F55\u4E0B\u7684\u6587\u4EF6\uFF0C\u81EA\u5DF1\u52A8\u624B\u7F16\u8BD1\u7684\u65F6\u5019\u4F1A\u7528\u5230\uFF1B</p><p><strong>\u6838\u5FC3\u4EE3\u7801\u96C6\u4E2D\u5728cmd\u548Cpkg\u4E2D\u3002</strong></p><p>cmd\u5185\u90E8\u5305\u542B\u5404\u4E2A\u7EC4\u4EF6\u7684\u5165\u53E3\uFF0C\u5177\u4F53\u6838\u5FC3\u7684\u5B9E\u73B0\u90E8\u5206\u5728pkg\u76EE\u5F55\u4E0B\u3002</p><p>\u6211\u4EEC\u6BCF\u4E00\u4E2A \u53EF\u6267\u884C\u6587\u4EF6\u90FD\u5BF9\u5E94 cmd</p><p><strong>\u5173\u4E8E\u5176\u4ED6\u76EE\u5F55\uFF1A</strong></p><p><code>plugin</code> \u76EE\u5F55\u4E4B\u524D\u7684\u7248\u672C\u5305\u62EC <code>scheduler</code> \u90E8\u5206\u7684\u4EE3\u7801\uFF0C\u5F53\u524D\u7248\u672C\uFF08\u5E94\u8BE5\u662F\u57281.10\u4E4B\u540E\uFF09\u5DF2\u7ECF\u5C06scheduler\u90E8\u5206\u4EE3\u7801\u79FB\u5230\u548C\u5176\u4ED6\u7EC4\u4EF6\u4E00\u81F4\u7684 <code>pkg</code> \u76EE\u5F55\uFF0C\u6240\u4EE5\u76EE\u524D <code>plugin</code> \u4E3B\u8981\u5305\u542B\u7684\u662F<code>\u8BA4\u8BC1</code>\u4E0E<code>\u9274\u6743</code>\u90E8\u5206\u7684\u4EE3\u7801\u3002</p><h2 id="\u6839\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#\u6839\u76EE\u5F55" aria-hidden="true">#</a> \u6839\u76EE\u5F55</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1</span>
<span class="token builtin class-name">.</span>
\u251C\u2500\u2500 api
\u251C\u2500\u2500 build
\u251C\u2500\u2500 CHANGELOG
\u251C\u2500\u2500 CHANGELOG.md -<span class="token operator">&gt;</span> CHANGELOG/README.md
\u251C\u2500\u2500 cluster
\u251C\u2500\u2500 cmd
\u251C\u2500\u2500 code-of-conduct.md
\u251C\u2500\u2500 CONTRIBUTING.md
\u251C\u2500\u2500 docs
\u251C\u2500\u2500 go.mod
\u251C\u2500\u2500 go.sum
\u251C\u2500\u2500 hack
\u251C\u2500\u2500 LICENSE
\u251C\u2500\u2500 LICENSES
\u251C\u2500\u2500 logo
\u251C\u2500\u2500 Makefile -<span class="token operator">&gt;</span> build/root/Makefile
\u251C\u2500\u2500 Makefile.generated_files -<span class="token operator">&gt;</span> build/root/Makefile.generated_files
\u251C\u2500\u2500 _output
\u251C\u2500\u2500 OWNERS
\u251C\u2500\u2500 OWNERS_ALIASES
\u251C\u2500\u2500 pkg
\u251C\u2500\u2500 plugin
\u251C\u2500\u2500 README.md
\u251C\u2500\u2500 SECURITY_CONTACTS
\u251C\u2500\u2500 staging
\u251C\u2500\u2500 SUPPORT.md
\u251C\u2500\u2500 <span class="token builtin class-name">test</span>
\u251C\u2500\u2500 third_party
\u2514\u2500\u2500 vendor
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pkg" tabindex="-1"><a class="header-anchor" href="#pkg" aria-hidden="true">#</a> pkg</h2><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u5927\u91CF\u7684 kubernetes \u7684\u6E90\u7801\u6240\u5728\uFF0C\u9664\u4E86\u88AB\u62BD\u79BB\u4E3A\u5355\u72EC\u7EC4\u4EF6\u7684\u90E8\u5206\uFF0C\u4F8B\u5982 api server \u7684\u4EE3\u7801\uFF0Cproxy \u7EC4\u4EF6\u7684\u4EE3\u7801\uFF0Ckubelet \u7EC4\u4EF6\u7684\u4EE3\u7801\u3002</p><ul><li>\u4E1A\u52A1\u903B\u8F91\u90FD\u5728 pkg</li><li>\u547D\u4EE4\u884C\u53C2\u6570\u90FD\u5728 cmd</li></ul></div><p><strong>\u5173\u4E8E\u4E24\u4E2A\u7EC4\u4EF6\uFF1A <code>./pkg/api</code> \u548C <code>./pkg/apis</code></strong></p><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>Api \u6587\u4EF6\u5939\u4E0B\u5305\u542B\u548COpen API \u76F8\u5173\u7684\u6A21\u578B\u5B9A\u4E49\u7B49\u5185\u5BB9\u3002</p><p><strong>\u540D\u79F0\u4E0D\u4E00\u6837\uFF0C\u4F5C\u7528\u662F\u5B8C\u5168\u4E0D\u4E00\u6837\u7684\u3002</strong></p><ul><li><p>\u7528\u4E8E\u6839\u636E OpenAPI \u89C4\u8303\u5F62\u6210\u7B26\u5408\u5176\u89C4\u5B9A\u7684 API</p></li><li><p>apis \u662F\u5305\u542B\u5185\u5EFA API Groups \u548C API Objects \u7684\uFF0C\u800C scheme \u76F8\u5173\u7684\u4EE3\u7801\u5927\u90E8\u5206\u5728\u8FD9\u91CC\u3002</p></li></ul></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 pkg</span>
pkg
\u251C\u2500\u2500 api
\u251C\u2500\u2500 apis
\u251C\u2500\u2500 auth
\u251C\u2500\u2500 capabilities
\u251C\u2500\u2500 client
\u251C\u2500\u2500 cloudprovider
\u251C\u2500\u2500 cluster
\u251C\u2500\u2500 controller
\u251C\u2500\u2500 controlplane
\u251C\u2500\u2500 credentialprovider
\u251C\u2500\u2500 features
\u251C\u2500\u2500 fieldpath
\u251C\u2500\u2500 generated
\u251C\u2500\u2500 kubeapiserver
\u251C\u2500\u2500 kubectl
\u251C\u2500\u2500 kubelet
\u251C\u2500\u2500 kubemark
\u251C\u2500\u2500 OWNERS
\u251C\u2500\u2500 printers
\u251C\u2500\u2500 probe
\u251C\u2500\u2500 proxy
\u251C\u2500\u2500 <span class="token function">quota</span>
\u251C\u2500\u2500 registry
\u251C\u2500\u2500 routes
\u251C\u2500\u2500 scheduler
\u251C\u2500\u2500 security
\u251C\u2500\u2500 securitycontext
\u251C\u2500\u2500 serviceaccount
\u251C\u2500\u2500 util
\u251C\u2500\u2500 volume
\u2514\u2500\u2500 windows
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd" aria-hidden="true">#</a> cmd</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 cmd</span>
cmd
\u251C\u2500\u2500 clicheck
\u251C\u2500\u2500 cloud-controller-manager
\u251C\u2500\u2500 dependencycheck
\u251C\u2500\u2500 dependencyverifier
\u251C\u2500\u2500 gendocs
\u251C\u2500\u2500 genkubedocs
\u251C\u2500\u2500 genman
\u251C\u2500\u2500 genswaggertypedocs
\u251C\u2500\u2500 genutils
\u251C\u2500\u2500 genyaml
\u251C\u2500\u2500 importverifier
\u251C\u2500\u2500 kubeadm
\u251C\u2500\u2500 kube-apiserver
\u251C\u2500\u2500 kube-controller-manager
\u251C\u2500\u2500 kubectl
\u251C\u2500\u2500 kubectl-convert
\u251C\u2500\u2500 kubelet
\u251C\u2500\u2500 kubemark
\u251C\u2500\u2500 kube-proxy
\u251C\u2500\u2500 kube-scheduler
\u251C\u2500\u2500 linkcheck
\u251C\u2500\u2500 OWNERS
\u251C\u2500\u2500 preferredimports
\u251C\u2500\u2500 prune-junit-xml
\u2514\u2500\u2500 yamlfmt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p><code>kube-apiserver</code> \u4E2D\u6709 <code>apiserver.go</code> \u6587\u4EF6\uFF0C\u5C31\u662F <code>apiserver</code> \u542F\u52A8\u5165\u53E3</p></div><h2 id="build" tabindex="-1"><a class="header-anchor" href="#build" aria-hidden="true">#</a> build</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 build</span>
build
\u251C\u2500\u2500 build-image
\u251C\u2500\u2500 common.sh
\u251C\u2500\u2500 copy-output.sh
\u251C\u2500\u2500 dependencies.yaml
\u251C\u2500\u2500 lib
\u251C\u2500\u2500 make-build-image.sh
\u251C\u2500\u2500 make-clean.sh
\u251C\u2500\u2500 nsswitch.conf
\u251C\u2500\u2500 OWNERS
\u251C\u2500\u2500 package-tarballs.sh
\u251C\u2500\u2500 pause
\u251C\u2500\u2500 README.md
\u251C\u2500\u2500 release-images.sh
\u251C\u2500\u2500 release-in-a-container.sh
\u251C\u2500\u2500 release.sh
\u251C\u2500\u2500 root
\u251C\u2500\u2500 run.sh
\u251C\u2500\u2500 server-image
\u251C\u2500\u2500 shell.sh
\u251C\u2500\u2500 tools.go
\u2514\u2500\u2500 util.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vendor" tabindex="-1"><a class="header-anchor" href="#vendor" aria-hidden="true">#</a> vendor</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 vendor/</span>
vendor/
\u251C\u2500\u2500 bitbucket.org
\u251C\u2500\u2500 cloud.google.com
\u251C\u2500\u2500 github.com
\u251C\u2500\u2500 go.etcd.io
\u251C\u2500\u2500 golang.org
\u251C\u2500\u2500 gonum.org
\u251C\u2500\u2500 google.golang.org
\u251C\u2500\u2500 go.opencensus.io
\u251C\u2500\u2500 go.opentelemetry.io
\u251C\u2500\u2500 gopkg.in
\u251C\u2500\u2500 go.starlark.net
\u251C\u2500\u2500 go.uber.org
\u251C\u2500\u2500 k8s.io
\u251C\u2500\u2500 modules.txt
\u251C\u2500\u2500 OWNERS
\u2514\u2500\u2500 sigs.k8s.io
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="hack" tabindex="-1"><a class="header-anchor" href="#hack" aria-hidden="true">#</a> hack</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 hack/</span>
hack/
\u251C\u2500\u2500 benchmark-go.sh
\u251C\u2500\u2500 boilerplate
\u251C\u2500\u2500 build-cross.sh
\u251C\u2500\u2500 build-go.sh
\u251C\u2500\u2500 cherry_pick_pull.sh
\u251C\u2500\u2500 conformance
\u251C\u2500\u2500 dev-build-and-push.sh
\u251C\u2500\u2500 dev-build-and-up.sh
\u251C\u2500\u2500 dev-push-conformance.sh
\u251C\u2500\u2500 e2e-internal
\u251C\u2500\u2500 e2e-node-test.sh
\u251C\u2500\u2500 generate-docs.sh
\u251C\u2500\u2500 gen-swagger-doc
\u251C\u2500\u2500 get-build.sh
\u251C\u2500\u2500 ginkgo-e2e.sh
\u251C\u2500\u2500 grab-profiles.sh
\u251C\u2500\u2500 install-etcd.sh
\u251C\u2500\u2500 jenkins
\u251C\u2500\u2500 lib
\u251C\u2500\u2500 lint-dependencies.sh
\u251C\u2500\u2500 list-feature-tests.sh
\u251C\u2500\u2500 local-up-cluster.sh
\u251C\u2500\u2500 logcheck.conf
\u251C\u2500\u2500 make-rules
\u251C\u2500\u2500 module-graph.sh
\u251C\u2500\u2500 OWNERS
\u251C\u2500\u2500 pin-dependency.sh
\u251C\u2500\u2500 print-workspace-status.sh
\u251C\u2500\u2500 README.md
\u251C\u2500\u2500 run-in-gopath.sh
\u251C\u2500\u2500 run-prometheus-on-etcd-scrapes.sh
\u251C\u2500\u2500 serve-prom-scrapes.sh
\u251C\u2500\u2500 testdata
\u251C\u2500\u2500 test-go.sh
\u251C\u2500\u2500 test-integration.sh
\u251C\u2500\u2500 tools
\u251C\u2500\u2500 unwanted-dependencies.json
\u251C\u2500\u2500 update-all.sh
\u251C\u2500\u2500 update-codegen.sh
\u251C\u2500\u2500 update-conformance-yaml.sh
\u251C\u2500\u2500 update-generated-api-compatibility-data.sh
\u251C\u2500\u2500 update-generated-device-plugin-dockerized.sh
\u251C\u2500\u2500 update-generated-device-plugin.sh
\u251C\u2500\u2500 update-generated-docs.sh
\u251C\u2500\u2500 update-generated-kms-dockerized.sh
\u251C\u2500\u2500 update-generated-kms.sh
\u251C\u2500\u2500 update-generated-kubelet-plugin-registration-dockerized.sh
\u251C\u2500\u2500 update-generated-kubelet-plugin-registration.sh
\u251C\u2500\u2500 update-generated-pod-resources-dockerized.sh
\u251C\u2500\u2500 update-generated-pod-resources.sh
\u251C\u2500\u2500 update-generated-protobuf-dockerized.sh
\u251C\u2500\u2500 update-generated-protobuf.sh
\u251C\u2500\u2500 update-generated-runtime-dockerized.sh
\u251C\u2500\u2500 update-generated-runtime.sh
\u251C\u2500\u2500 update-generated-stable-metrics.sh
\u251C\u2500\u2500 update-generated-swagger-docs.sh
\u251C\u2500\u2500 update-gofmt.sh
\u251C\u2500\u2500 update-import-aliases.sh
\u251C\u2500\u2500 update-internal-modules.sh
\u251C\u2500\u2500 update-kustomize.sh
\u251C\u2500\u2500 update-mocks.sh
\u251C\u2500\u2500 update-netparse-cve.sh
\u251C\u2500\u2500 update-openapi-spec.sh
\u251C\u2500\u2500 update-translations.sh
\u251C\u2500\u2500 update-vendor-licenses.sh
\u251C\u2500\u2500 update-vendor.sh
\u251C\u2500\u2500 update-yamlfmt.sh
\u251C\u2500\u2500 verify-all.sh
\u251C\u2500\u2500 verify-api-groups.sh
\u251C\u2500\u2500 verify-boilerplate.sh
\u251C\u2500\u2500 verify-cli-conventions.sh
\u251C\u2500\u2500 verify-codegen.sh
\u251C\u2500\u2500 verify-conformance-requirements.sh
\u251C\u2500\u2500 verify-conformance-yaml.sh
\u251C\u2500\u2500 verify-description.sh
\u251C\u2500\u2500 verify-e2e-test-ownership.sh
\u251C\u2500\u2500 verify-external-dependencies-version.sh
\u251C\u2500\u2500 verify-flags
\u251C\u2500\u2500 verify-flags-underscore.py
\u251C\u2500\u2500 verify-generated-device-plugin.sh
\u251C\u2500\u2500 verify-generated-docs.sh
\u251C\u2500\u2500 verify-generated-files-remake.sh
\u251C\u2500\u2500 verify-generated-files.sh
\u251C\u2500\u2500 verify-generated-kms.sh
\u251C\u2500\u2500 verify-generated-kubelet-plugin-registration.sh
\u251C\u2500\u2500 verify-generated-pod-resources.sh
\u251C\u2500\u2500 verify-generated-protobuf.sh
\u251C\u2500\u2500 verify-generated-runtime.sh
\u251C\u2500\u2500 verify-generated-stable-metrics.sh
\u251C\u2500\u2500 verify-generated-swagger-docs.sh
\u251C\u2500\u2500 verify-gofmt.sh
\u251C\u2500\u2500 verify-golangci-lint.sh
\u251C\u2500\u2500 verify-govet-levee.sh
\u251C\u2500\u2500 verify-govet.sh
\u251C\u2500\u2500 verify-import-aliases.sh
\u251C\u2500\u2500 verify-import-boss.sh
\u251C\u2500\u2500 verify-imports.sh
\u251C\u2500\u2500 verify-internal-modules.sh
\u251C\u2500\u2500 verify-linkcheck.sh
\u251C\u2500\u2500 verify-mocks.sh
\u251C\u2500\u2500 verify-netparse-cve.sh
\u251C\u2500\u2500 verify-non-mutating-validation.sh
\u251C\u2500\u2500 verify-no-vendor-cycles.sh
\u251C\u2500\u2500 verify-openapi-spec.sh
\u251C\u2500\u2500 verify-pkg-names.sh
\u251C\u2500\u2500 verify-prerelease-lifecycle-tags.sh
\u251C\u2500\u2500 verify-prometheus-imports.sh
\u251C\u2500\u2500 verify-publishing-bot.py
\u251C\u2500\u2500 verify-readonly-packages.sh
\u251C\u2500\u2500 verify-shellcheck.sh
\u251C\u2500\u2500 verify-spelling.sh
\u251C\u2500\u2500 verify-staging-meta-files.sh
\u251C\u2500\u2500 verify-test-code.sh
\u251C\u2500\u2500 verify-test-featuregates.sh
\u251C\u2500\u2500 verify-test-images.sh
\u251C\u2500\u2500 verify-typecheck-providerless.sh
\u251C\u2500\u2500 verify-typecheck.sh
\u251C\u2500\u2500 verify-vendor-licenses.sh
\u251C\u2500\u2500 verify-vendor.sh
\u2514\u2500\u2500 verify-yamlfmt.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="plugin" tabindex="-1"><a class="header-anchor" href="#plugin" aria-hidden="true">#</a> plugin</h2><p><code>plugin</code>\u76EE\u5F55\u4E4B\u524D\u7684\u7248\u672C\u5305\u62EC <code>scheduler</code> \u90E8\u5206\u7684\u4EE3\u7801\uFF0C\u5F53\u524D\u7248\u672C\uFF08\u5E94\u8BE5\u662F\u57281.10\u4E4B\u540E\uFF09\u5DF2\u7ECF\u5C06scheduler\u90E8\u5206\u4EE3\u7801\u79FB\u5230\u548C\u5176\u4ED6\u7EC4\u4EF6\u4E00\u81F4\u7684pkg\u76EE\u5F55\uFF0C\u6240\u4EE5\u76EE\u524D <code>plugin</code> \u4E3B\u8981\u5305\u542B\u7684\u662F<code>\u8BA4\u8BC1</code>\u4E0E<code>\u9274\u6743</code>\u90E8\u5206\u7684\u4EE3\u7801\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree plugin/ -L 4</span>
plugin/
\u251C\u2500\u2500 OWNERS
\u2514\u2500\u2500 pkg
    \u251C\u2500\u2500 admission
    \u2502   \u251C\u2500\u2500 admit
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u2514\u2500\u2500 admission_test.go
    \u2502   \u251C\u2500\u2500 alwayspullimages
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u2514\u2500\u2500 admission_test.go
    \u2502   \u251C\u2500\u2500 antiaffinity
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u251C\u2500\u2500 admission_test.go
    \u2502   \u2502   \u2514\u2500\u2500 doc.go
    \u2502   \u251C\u2500\u2500 certificates
    \u2502   \u2502   \u251C\u2500\u2500 approval
    \u2502   \u2502   \u251C\u2500\u2500 OWNERS
    \u2502   \u2502   \u251C\u2500\u2500 signing
    \u2502   \u2502   \u251C\u2500\u2500 subjectrestriction
    \u2502   \u2502   \u2514\u2500\u2500 util.go
    \u2502   \u251C\u2500\u2500 defaulttolerationseconds
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u2514\u2500\u2500 admission_test.go
    \u2502   \u251C\u2500\u2500 deny
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u2514\u2500\u2500 admission_test.go
    \u2502   \u251C\u2500\u2500 eventratelimit
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u251C\u2500\u2500 admission_test.go
    \u2502   \u2502   \u251C\u2500\u2500 apis
    \u2502   \u2502   \u251C\u2500\u2500 cache.go
    \u2502   \u2502   \u251C\u2500\u2500 cache_test.go
    \u2502   \u2502   \u251C\u2500\u2500 config.go
    \u2502   \u2502   \u251C\u2500\u2500 doc.go
    \u2502   \u2502   \u2514\u2500\u2500 limitenforcer.go
    \u2502   \u251C\u2500\u2500 extendedresourcetoleration
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u2514\u2500\u2500 admission_test.go
    \u2502   \u251C\u2500\u2500 gc
    \u2502   \u2502   \u251C\u2500\u2500 gc_admission.go
    \u2502   \u2502   \u2514\u2500\u2500 gc_admission_test.go
    \u2502   \u251C\u2500\u2500 imagepolicy
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u251C\u2500\u2500 admission_test.go
    \u2502   \u2502   \u251C\u2500\u2500 certs_test.go
    \u2502   \u2502   \u251C\u2500\u2500 config.go
    \u2502   \u2502   \u251C\u2500\u2500 config_test.go
    \u2502   \u2502   \u251C\u2500\u2500 doc.go
    \u2502   \u2502   \u251C\u2500\u2500 gencerts.sh
    \u2502   \u2502   \u2514\u2500\u2500 OWNERS
    \u2502   \u251C\u2500\u2500 limitranger
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u251C\u2500\u2500 admission_test.go
    \u2502   \u2502   \u2514\u2500\u2500 interfaces.go
    \u2502   \u251C\u2500\u2500 namespace
    \u2502   \u2502   \u251C\u2500\u2500 autoprovision
    \u2502   \u2502   \u2514\u2500\u2500 exists
    \u2502   \u251C\u2500\u2500 network
    \u2502   \u2502   \u251C\u2500\u2500 defaultingressclass
    \u2502   \u2502   \u2514\u2500\u2500 denyserviceexternalips
    \u2502   \u251C\u2500\u2500 noderestriction
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u251C\u2500\u2500 admission_test.go
    \u2502   \u2502   \u2514\u2500\u2500 OWNERS
    \u2502   \u251C\u2500\u2500 nodetaint
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u2514\u2500\u2500 admission_test.go
    \u2502   \u251C\u2500\u2500 OWNERS
    \u2502   \u251C\u2500\u2500 podnodeselector
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u2514\u2500\u2500 admission_test.go
    \u2502   \u251C\u2500\u2500 podtolerationrestriction
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u251C\u2500\u2500 admission_test.go
    \u2502   \u2502   \u251C\u2500\u2500 apis
    \u2502   \u2502   \u251C\u2500\u2500 config.go
    \u2502   \u2502   \u2514\u2500\u2500 doc.go
    \u2502   \u251C\u2500\u2500 priority
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u2514\u2500\u2500 admission_test.go
    \u2502   \u251C\u2500\u2500 resourcequota
    \u2502   \u2502   \u2514\u2500\u2500 admission_test.go
    \u2502   \u251C\u2500\u2500 runtimeclass
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u251C\u2500\u2500 admission_test.go
    \u2502   \u2502   \u2514\u2500\u2500 OWNERS
    \u2502   \u251C\u2500\u2500 security
    \u2502   \u2502   \u251C\u2500\u2500 doc.go
    \u2502   \u2502   \u251C\u2500\u2500 podsecurity
    \u2502   \u2502   \u2514\u2500\u2500 podsecuritypolicy
    \u2502   \u251C\u2500\u2500 securitycontext
    \u2502   \u2502   \u2514\u2500\u2500 scdeny
    \u2502   \u251C\u2500\u2500 serviceaccount
    \u2502   \u2502   \u251C\u2500\u2500 admission.go
    \u2502   \u2502   \u251C\u2500\u2500 admission_test.go
    \u2502   \u2502   \u251C\u2500\u2500 doc.go
    \u2502   \u2502   \u2514\u2500\u2500 OWNERS
    \u2502   \u2514\u2500\u2500 storage
    \u2502       \u251C\u2500\u2500 persistentvolume
    \u2502       \u251C\u2500\u2500 storageclass
    \u2502       \u2514\u2500\u2500 storageobjectinuseprotection
    \u2514\u2500\u2500 auth
        \u251C\u2500\u2500 authenticator
        \u2502   \u251C\u2500\u2500 OWNERS
        \u2502   \u2514\u2500\u2500 token
        \u251C\u2500\u2500 authorizer
        \u2502   \u251C\u2500\u2500 doc.go
        \u2502   \u251C\u2500\u2500 <span class="token function">node</span>
        \u2502   \u251C\u2500\u2500 OWNERS
        \u2502   \u2514\u2500\u2500 rbac
        \u251C\u2500\u2500 doc.go
        \u2514\u2500\u2500 OWNERS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="31.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="33.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,31),_=i("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),E={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},x=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),N=i(")"),O=i("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),S={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},R=i("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function A(C,W){const s=d("ExternalLinkIcon"),l=d("RouterLink");return r(),v("div",null,[e("ul",null,[e("li",null,[e("a",m,[t,n(s)])])]),b,p,h,e("blockquote",null,[e("p",null,[g,e("a",f,[k,n(s)])])]),y,e("ul",null,[e("li",null,[e("p",null,[n(l,{to:"/"},{default:c(()=>[_]),_:1})])]),e("li",null,[e("p",null,[e("a",E,[x,n(s)]),N])]),e("li",null,[e("p",null,[O,e("a",S,[R,n(s)])])])])])}const L=a(o,[["render",A],["__file","32.html.vue"]]);export{L as default};
