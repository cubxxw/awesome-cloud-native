import{_ as o,r as l,o as d,c as t,a as e,b as n,w as c,e as i,d as a}from"./app.bc2ec9df.js";const u={},p={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},v=i("author"),b=e("h1",{id:"\u7B2C32\u8282-kubernetes-\u76EE\u5F55\u7ED3\u6784",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C32\u8282-kubernetes-\u76EE\u5F55\u7ED3\u6784","aria-hidden":"true"},"#"),i(" \u7B2C32\u8282 kubernetes \u76EE\u5F55\u7ED3\u6784")],-1),m=e("div",null,[e("a",{href:"31.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"33.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),k=e("br",null,null,-1),g=i("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),h={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},f=i("http://nsddd.top"),_=a(`<hr><p>[TOC]</p><h2 id="\u5206\u7C7B" tabindex="-1"><a class="header-anchor" href="#\u5206\u7C7B" aria-hidden="true">#</a> \u5206\u7C7B</h2><p><strong>Kubernetes \u662FGo\u8BED\u8A00\u5F00\u53D1\u7684\uFF0C\u76F8\u5BF9\u6765\u8BF4\u5927\u90E8\u5206\u7ED3\u6784\u8FD8\u662F\u5F88\u6E05\u6670\u7684\u3002</strong></p><p>Kubernetes\u7684\u4EE3\u7801\u90FD\u5728 kubernetes\u76EE\u5F55\u4E0B\uFF0C\u5982\u56FE\uFF0C\u6839\u636E\u529F\u80FD\u4E3B\u8981\u5206\u6210\u4EE5\u4E0B\u51E0\u7C7B\uFF1A 1\u3001<code>\u6587\u6863\u7C7B</code>\uFF08api\u3001docs\u3001logo\uFF09 2\u3001<code>\u5DE5\u5177\u7C7B</code>\uFF08build\u3001cluster\u3001Godeps\u3001hack\u3001staging\u3001translations\uFF09 3\u3001<code>\u4EE3\u7801\u7C7B</code>\uFF08cmd\u3001pkg\u3001plugin\u3001test\u3001third_party\uFF09</p><p>\u5DE5\u5177\u7C7B\u4E3B\u8981\u7528\u5230\u7684 build\u76EE\u5F55\u4E0B\u7684\u6587\u4EF6\uFF0C\u81EA\u5DF1\u52A8\u624B\u7F16\u8BD1\u7684\u65F6\u5019\u4F1A\u7528\u5230\uFF1B</p><p><strong>\u6838\u5FC3\u4EE3\u7801\u96C6\u4E2D\u5728cmd\u548Cpkg\u4E2D\u3002\u8FD9\u4E24\u4E2A\u662F Kubernetes \u6700\u91CD\u8981\u7684\u4E24\u4E2A\u5305~</strong></p><p>cmd\u5185\u90E8\u5305\u542B\u5404\u4E2A\u7EC4\u4EF6\u7684\u5165\u53E3\uFF0C\u5177\u4F53\u6838\u5FC3\u7684\u5B9E\u73B0\u90E8\u5206\u5728pkg\u76EE\u5F55\u4E0B\u3002</p><p>\u6211\u4EEC\u6BCF\u4E00\u4E2A \u53EF\u6267\u884C\u6587\u4EF6\u90FD\u5BF9\u5E94 cmd</p><p><strong>\u5173\u4E8E\u5176\u4ED6\u76EE\u5F55\uFF1A</strong></p><p><code>plugin</code> \u76EE\u5F55\u4E4B\u524D\u7684\u7248\u672C\u5305\u62EC <code>scheduler</code> \u90E8\u5206\u7684\u4EE3\u7801\uFF0C\u5F53\u524D\u7248\u672C\uFF08\u5E94\u8BE5\u662F\u57281.10\u4E4B\u540E\uFF09\u5DF2\u7ECF\u5C06scheduler\u90E8\u5206\u4EE3\u7801\u79FB\u5230\u548C\u5176\u4ED6\u7EC4\u4EF6\u4E00\u81F4\u7684 <code>pkg</code> \u76EE\u5F55\uFF0C\u6240\u4EE5\u76EE\u524D <code>plugin</code> \u4E3B\u8981\u5305\u542B\u7684\u662F<code>\u8BA4\u8BC1</code>\u4E0E<code>\u9274\u6743</code>\u90E8\u5206\u7684\u4EE3\u7801\u3002</p><h2 id="\u6839\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#\u6839\u76EE\u5F55" aria-hidden="true">#</a> \u6839\u76EE\u5F55</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>makefile \u652F\u6301\u4EA4\u53C9\u7F16\u8BD1\u7684\uFF1B</strong></p><p>Kubernetes \u7684\u7F16\u8BD1\u65B9\u6CD5\u6709\u4E09\u79CD\uFF0Cmakefile \u548C docker \u662F\u652F\u6301\u4EA4\u53C9\u7F16\u8BD1\u7684\u3002</p><h2 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> api</h2><p>\u987E\u540D\u601D\u4E49\uFF0C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>\u276F tree api/ <span class="token parameter variable">-L</span> <span class="token number">2</span>
api/
\u251C\u2500\u2500 api-rules
\u2502   \u251C\u2500\u2500 aggregator_violation_exceptions.list
\u2502   \u251C\u2500\u2500 apiextensions_violation_exceptions.list
\u2502   \u251C\u2500\u2500 codegen_violation_exceptions.list
\u2502   \u251C\u2500\u2500 README.md
\u2502   \u251C\u2500\u2500 sample_apiserver_violation_exceptions.list
\u2502   \u2514\u2500\u2500 violation_exceptions.list
\u251C\u2500\u2500 openapi-spec
\u2502   \u251C\u2500\u2500 README.md
\u2502   \u251C\u2500\u2500 swagger.json
\u2502   \u2514\u2500\u2500 v3
\u2514\u2500\u2500 OWNERS

<span class="token number">3</span> directories, <span class="token number">9</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6211\u4EEC\u53EF\u4EE5\u770B\u5230 <code>swagger.json</code></strong></p><blockquote><p>\u6211\u4EEC\u90FD\u77E5\u9053 api \u58F0\u660E\u90FD\u662F\u6709\u4E00\u4E2A json \u6587\u4EF6\uFF0C\u901A\u8FC7\u58F0\u660E\u62C9\u53D6\u6240\u6709\u7684 API</p><p>\u5982\u679C\u6211\u4EEC\u9700\u8981\u770B API \u6587\u6863\uFF0C\u770B <code>swagger.json</code></p></blockquote><h2 id="pkg" tabindex="-1"><a class="header-anchor" href="#pkg" aria-hidden="true">#</a> pkg</h2><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u5927\u91CF\u7684 kubernetes \u7684\u6E90\u7801\u6240\u5728\uFF0C\u9664\u4E86\u88AB\u62BD\u79BB\u4E3A\u5355\u72EC\u7EC4\u4EF6\u7684\u90E8\u5206\uFF0C\u4F8B\u5982 api server \u7684\u4EE3\u7801\uFF0Cproxy \u7EC4\u4EF6\u7684\u4EE3\u7801\uFF0Ckubelet \u7EC4\u4EF6\u7684\u4EE3\u7801\u3002</p><ul><li>\u4E1A\u52A1\u903B\u8F91\u90FD\u5728 pkg</li><li>\u547D\u4EE4\u884C\u53C2\u6570\u90FD\u5728 cmd</li></ul></div><p><strong>\u5173\u4E8E\u4E24\u4E2A\u7EC4\u4EF6\uFF1A <code>./pkg/api</code> \u548C <code>./pkg/apis</code></strong></p><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>Api \u6587\u4EF6\u5939\u4E0B\u5305\u542B\u548COpen API \u76F8\u5173\u7684\u6A21\u578B\u5B9A\u4E49\u7B49\u5185\u5BB9\u3002</p><p><strong>\u540D\u79F0\u4E0D\u4E00\u6837\uFF0C\u4F5C\u7528\u662F\u5B8C\u5168\u4E0D\u4E00\u6837\u7684\u3002</strong></p><ul><li><p>\u7528\u4E8E\u6839\u636E OpenAPI \u89C4\u8303\u5F62\u6210\u7B26\u5408\u5176\u89C4\u5B9A\u7684 API</p></li><li><p>apis \u662F\u5305\u542B\u5185\u5EFA API Groups \u548C API Objects \u7684\uFF0C\u800C scheme \u76F8\u5173\u7684\u4EE3\u7801\u5927\u90E8\u5206\u5728\u8FD9\u91CC\u3002</p></li></ul></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 pkg</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="apis-\u76EE\u5F55\u7684\u8BE6\u89E3" tabindex="-1"><a class="header-anchor" href="#apis-\u76EE\u5F55\u7684\u8BE6\u89E3" aria-hidden="true">#</a> apis \u76EE\u5F55\u7684\u8BE6\u89E3</h3><p><strong>\u76EE\u5F55\u7ED3\u6784\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes/pkg/apis<span class="token comment"># tree -L 1</span>
<span class="token builtin class-name">.</span>
\u251C\u2500\u2500 abac
\u251C\u2500\u2500 admission
\u251C\u2500\u2500 admissionregistration
\u251C\u2500\u2500 apidiscovery
\u251C\u2500\u2500 apiserverinternal
\u251C\u2500\u2500 apps
\u251C\u2500\u2500 authentication
\u251C\u2500\u2500 authorization
\u251C\u2500\u2500 autoscaling
\u251C\u2500\u2500 batch
\u251C\u2500\u2500 certificates
\u251C\u2500\u2500 coordination
\u251C\u2500\u2500 core
\u251C\u2500\u2500 discovery
\u251C\u2500\u2500 events
\u251C\u2500\u2500 extensions
\u251C\u2500\u2500 flowcontrol
\u251C\u2500\u2500 imagepolicy
\u251C\u2500\u2500 networking
\u251C\u2500\u2500 <span class="token function">node</span>
\u251C\u2500\u2500 OWNERS
\u251C\u2500\u2500 policy
\u251C\u2500\u2500 rbac
\u251C\u2500\u2500 resource
\u251C\u2500\u2500 scheduling
\u2514\u2500\u2500 storage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728Kubernetes\u6E90\u7801\u4E2D\uFF0C<code>core</code>\u76EE\u5F55\u548C<code>apps</code>\u76EE\u5F55\u662F\u4E24\u4E2A\u4E0D\u540C\u7684\u76EE\u5F55\uFF0C\u7528\u4E8E\u5B58\u653E\u4E0D\u540C\u7684API\u5BF9\u8C61\u3002</p><ul><li><code>core</code>\u76EE\u5F55\u4E0B\u5B58\u653E\u7684\u662F\u57FA\u7840\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Pod\u3001Service\u3001ReplicationController \u7B49\u3002\u8FD9\u4E9BAPI\u5BF9\u8C61\u662FKubernetes\u7684\u6838\u5FC3\u529F\u80FD\uFF0C\u63D0\u4F9B\u4E86\u57FA\u672C\u7684\u8C03\u5EA6\u3001\u7BA1\u7406\u548C\u76D1\u63A7\u529F\u80FD\u3002</li><li><code>apps</code>\u76EE\u5F55\u4E0B\u5B58\u653E\u7684\u662F\u6269\u5C55\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Deployment\u3001StatefulSet \u7B49\u3002\u8FD9\u4E9BAPI\u5BF9\u8C61\u662F\u5BF9\u57FA\u7840\u529F\u80FD\u7684\u6269\u5C55\uFF0C\u63D0\u4F9B\u4E86\u66F4\u591A\u7684\u8C03\u5EA6\u3001\u7BA1\u7406\u548C\u76D1\u63A7\u529F\u80FD\u3002</li></ul><p>\u603B\u4E4B\uFF0C<code>core</code>\u76EE\u5F55\u548C<code>apps</code>\u76EE\u5F55\u662F\u7528\u6765\u5B58\u653E\u4E0D\u540C\u7C7B\u578B\u7684API\u5BF9\u8C61\u7684\u3002\u5982\u679C\u4F60\u60F3\u4E86\u89E3\u67D0\u4E2A\u7279\u5B9A\u7684API\u5BF9\u8C61\u7684\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u53EF\u4EE5\u5728\u76F8\u5E94\u7684\u76EE\u5F55\u4E0B\u627E\u5230\u5BF9\u5E94\u7684\u6587\u4EF6\u3002</p><p><strong>\u4E3B\u8981\u76EE\u5F55\u7684\u89E3\u91CA\uFF1A</strong></p><p><code>pkg/apis</code>\u76EE\u5F55\u662FKubernetes\u6E90\u7801\u4E2D\u7528\u4E8E\u5B58\u653EAPI\u5BF9\u8C61\u7684\u76EE\u5F55\u3002\u8FD9\u4E2A\u76EE\u5F55\u4E2D\u5305\u542B\u4E86\u5F88\u591A\u5B50\u76EE\u5F55\uFF0C\u6BCF\u4E2A\u5B50\u76EE\u5F55\u5B58\u653E\u4E86\u4E0D\u540C\u7C7B\u578B\u7684API\u5BF9\u8C61\u3002</p><p>\u8FD9\u4E9B\u5B50\u76EE\u5F55\u7684\u540D\u79F0\u901A\u5E38\u7531\u4E24\u90E8\u5206\u7EC4\u6210\uFF0C\u4F8B\u5982 <code>core/v1</code>\u3001<code>apps/v1</code> \u7B49\u3002\u524D\u9762\u7684\u90E8\u5206\u8868\u793AAPI\u5BF9\u8C61\u7684\u7C7B\u578B\uFF0C\u540E\u9762\u7684\u90E8\u5206\u8868\u793AAPI\u5BF9\u8C61\u7684\u7248\u672C\u3002</p><p>\u4E0B\u9762\u662F\u4E00\u4E9B\u5E38\u89C1\u7684\u5B50\u76EE\u5F55\u53CA\u5176\u542B\u4E49\uFF1A</p><ul><li><p><code>core/v1</code>\uFF1A\u8FD9\u4E2A\u76EE\u5F55\u4E0B\u5B58\u653E\u7684\u662F\u57FA\u7840\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Pod\u3001Service\u3001ReplicationController \u7B49\u3002\u8FD9\u4E9BAPI\u5BF9\u8C61\u662FKubernetes\u7684\u6838\u5FC3\u529F\u80FD\uFF0C\u63D0\u4F9B\u4E86\u57FA\u672C\u7684\u8C03\u5EA6\u3001\u7BA1\u7406\u548C\u76D1\u63A7\u529F\u80FD\u3002</p></li><li><p><code>apps/v1</code>\uFF1A\u8FD9\u4E2A\u76EE\u5F55\u4E0B\u5B58\u653E\u7684\u662F\u6269\u5C55\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Deployment\u3001StatefulSet \u7B49</p></li><li><p><code>batch/v1</code>\uFF1A\u8FD9\u4E2A\u76EE\u5F55\u4E0B\u5B58\u653E\u7684\u662F\u6279\u5904\u7406\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Job\u3001CronJob \u7B49\u3002\u8FD9\u4E9BAPI\u5BF9\u8C61\u4E3B\u8981\u7528\u4E8E\u6267\u884C\u6279\u91CF\u4EFB\u52A1\uFF0C\u652F\u6301\u5468\u671F\u6027\u6267\u884C\u3001\u5931\u8D25\u91CD\u8BD5\u7B49\u529F\u80FD\u3002</p></li><li><p><code>networking.k8s.io/v1</code>\uFF1A\u8FD9\u4E2A\u76EE\u5F55\u4E0B\u5B58\u653E\u7684\u662F\u7F51\u7EDC\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Ingress\u3001Service \u8D1F\u8F7D\u5747\u8861\u5668\u7B49\u3002\u8FD9\u4E9BAPI\u5BF9\u8C61\u4E3B\u8981\u7528\u4E8E\u63D0\u4F9B\u96C6\u7FA4\u5185\u90E8\u53CA\u5916\u90E8\u7684\u7F51\u7EDC\u8BBF\u95EE\u80FD\u529B\u3002</p></li><li><p><code>extensions/v1beta1</code>\uFF1A\u8FD9\u4E2A\u76EE\u5F55\u4E0B\u5B58\u653E\u7684\u662F\u6269\u5C55\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Deployment\u3001Ingress \u7B49\u3002\u8FD9\u4E9BAPI\u5BF9\u8C61\u662F\u5BF9\u57FA\u7840\u529F\u80FD\u7684\u6269\u5C55\uFF0C\u63D0\u4F9B\u4E86\u66F4\u591A\u7684\u8C03\u5EA6\u3001\u7BA1\u7406\u548C\u76D1\u63A7\u529F\u80FD\u3002</p></li></ul><p>\u8FD9\u4E9B\u5B50\u76EE\u5F55\u53EA\u662F\u90E8\u5206\u76EE\u5F55\uFF0CKubernetes\u4E2D\u8FD8\u6709\u8BB8\u591A\u5176\u4ED6\u5B50\u76EE\u5F55\uFF0C\u6BCF\u4E2A\u5B50\u76EE\u5F55\u5B58\u653E\u7684\u662F\u4E0D\u540C\u7C7B\u578B\u7684API\u5BF9\u8C61\u3002\u5982\u679C\u4F60\u60F3\u4E86\u89E3\u66F4\u591A\u4FE1\u606F\uFF0C\u53EF\u4EE5\u5728Kubernetes\u6E90\u7801\u4ED3\u5E93\u4E2D\u67E5\u770B\u3002</p><blockquote><p>\u5728Kubernetes\u6E90\u7801\u4E2D\uFF0CAPI\u5BF9\u8C61\u7684\u5B9A\u4E49\u4E00\u822C\u90FD\u4F4D\u4E8E<code>pkg/apis</code>\u76EE\u5F55\u4E0B\u3002\u4F8B\u5982\uFF0CDeployment\u5BF9\u8C61\u7684\u5B9A\u4E49\u5C31\u4F4D\u4E8E<code>pkg/apis/apps/v1/deployment.go</code>\u6587\u4EF6\u4E2D\u3002</p><p>\u5177\u4F53\u7684\u4F4D\u7F6E\u53EF\u80FD\u4F1A\u6709\u6240\u4E0D\u540C\uFF0C\u4F46\u901A\u5E38\u90FD\u5728\u8FD9\u4E2A\u76EE\u5F55\u6216\u5176\u5B50\u76EE\u5F55\u4E0B\u3002\u5982\u679C\u4F60\u60F3\u67E5\u770B\u67D0\u4E2A\u7279\u5B9A\u7684API\u5BF9\u8C61\u7684\u5B9A\u4E49\uFF0C\u4F60\u53EF\u4EE5\u5728Kubernetes\u6E90\u7801\u4ED3\u5E93\u4E2D\u641C\u7D22\u5173\u952E\u5B57\uFF0C\u627E\u5230\u5BF9\u5E94\u7684\u6587\u4EF6\u3002</p><p>Pod\u5BF9\u8C61\u7684\u5B9A\u4E49\u4F4D\u4E8EKubernetes\u6E90\u7801\u4E2D\u7684<code>pkg/apis/core/v1/pod.go</code>\u6587\u4EF6\u4E2D\u3002</p><p>\u8FD9\u4E2A\u6587\u4EF6\u4E2D\u5B9A\u4E49\u4E86Pod\u5BF9\u8C61\u7684\u6240\u6709\u5B57\u6BB5\uFF0C\u5305\u62EC\u540D\u79F0\u3001\u547D\u540D\u7A7A\u95F4\u3001\u72B6\u6001\u3001\u5BB9\u5668\u5217\u8868\u7B49\u3002\u5982\u679C\u4F60\u60F3\u4E86\u89E3Pod\u5BF9\u8C61\u7684\u66F4\u591A\u7EC6\u8282\uFF0C\u53EF\u4EE5\u5728\u8FD9\u4E2A\u6587\u4EF6\u4E2D\u67E5\u770B\u3002</p></blockquote><h3 id="\u5176\u4ED6\u76EE\u5F55\u89E3\u91CA" tabindex="-1"><a class="header-anchor" href="#\u5176\u4ED6\u76EE\u5F55\u89E3\u91CA" aria-hidden="true">#</a> \u5176\u4ED6\u76EE\u5F55\u89E3\u91CA</h3><p><code>pkg/apis</code>\u76EE\u5F55\u4E0B\u7684\u8FD9\u4E9B\u5B50\u76EE\u5F55\u90FD\u662F\u7528\u4E8E\u5B58\u653E\u4E0D\u540C\u7C7B\u578B\u7684API\u5BF9\u8C61\u7684\u3002</p><ul><li><code>abac</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u6388\u6743\u548C\u8BA4\u8BC1\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 AttributePolicies\u3001Policy \u7B49\u3002</li><li><code>admission</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u5165\u95E8\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 AdmissionConfiguration\u3001Webhook \u7B49\u3002</li><li><code>admissionregistration</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u5165\u95E8\u6CE8\u518C\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 InitializerConfiguration\u3001ValidatingWebhookConfiguration \u7B49\u3002</li><li><code>apidiscovery</code>\u76EE\u5F55\u5B58\u653E\u7684\u662FAPI\u53D1\u73B0\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 APIGroup\u3001APIResourceList \u7B49\u3002</li><li><code>apiserverinternal</code>\u76EE\u5F55\u5B58\u653E\u7684\u662FAPI\u670D\u52A1\u5668\u5185\u90E8\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 GroupResources\u3001ServerResources \u7B49\u3002</li><li><code>authentication</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u8EAB\u4EFD\u9A8C\u8BC1\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 TokenReview\u3001UserInfo \u7B49\u3002</li><li><code>authorization</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u6388\u6743\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 SelfSubjectAccessReview\u3001SubjectAccessReview \u7B49\u3002</li><li><code>autoscaling</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u81EA\u52A8\u4F38\u7F29\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 HorizontalPodAutoscaler\u3001Scale \u7B49\u3002</li><li><code>certificates</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u8BC1\u4E66\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 CertificateSigningRequest\u3001CertificateSigningRequestList \u7B49\u3002</li><li><code>coordination</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u534F\u8C03\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Lease\u3001Lock \u7B49\u3002</li><li><code>core</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u57FA\u7840\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Pod\u3001Service\u3001ReplicationController</li><li><code>discovery</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u53D1\u73B0\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 EndpointSlice\u3001ServiceAccountToken \u7B49\u3002</li><li><code>events</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u4E8B\u4EF6\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Event\u3001EventList \u7B49\u3002</li><li><code>extensions</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u6269\u5C55\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Deployment\u3001Ingress \u7B49\u3002</li><li><code>flowcontrol</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u6D41\u91CF\u63A7\u5236\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 FlowSchema\u3001FlowSchemaList \u7B49\u3002</li><li><code>imagepolicy</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u955C\u50CF\u7B56\u7565\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 ImageReview\u3001ImageReviewStatus \u7B49\u3002</li><li><code>networking</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u7F51\u7EDC\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Ingress\u3001Service \u8D1F\u8F7D\u5747\u8861\u5668\u7B49\u3002</li><li><code>node</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u8282\u70B9\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 Node\u3001NodeList \u7B49\u3002</li><li><code>OWNERS</code>\u76EE\u5F55\u5B58\u653E\u7684\u662FOWNERS\u6587\u4EF6</li><li><code>policy</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u7B56\u7565\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 PodDisruptionBudget\u3001PodSecurityPolicy \u7B49\u3002</li><li><code>rbac</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u57FA\u4E8E\u89D2\u8272\u7684\u8BBF\u95EE\u63A7\u5236\uFF08RBAC\uFF09\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 ClusterRole\u3001RoleBinding \u7B49\u3002</li><li><code>resource</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u8D44\u6E90\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 ConfigMap\u3001PersistentVolume \u7B49\u3002</li><li><code>scheduling</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u8C03\u5EA6\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 PriorityClass\u3001Scheduling \u7B49\u3002</li><li><code>storage</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u5B58\u50A8\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 StorageClass\u3001VolumeAttachment \u7B49\u3002</li><li><code>pkg/apis/apps</code>\u76EE\u5F55\u5B58\u653E\u7684\u662FKubernetes\u7684\u6269\u5C55API\u5BF9\u8C61\u3002\u8FD9\u4E9BAPI\u5BF9\u8C61\u662F\u5BF9\u57FA\u7840\u529F\u80FD\u7684\u6269\u5C55\uFF0C\u63D0\u4F9B\u4E86\u66F4\u591A\u7684\u8C03\u5EA6\u3001\u7BA1\u7406\u548C\u76D1\u63A7\u529F\u80FD\u3002\u8FD9\u4E9BAPI\u5BF9\u8C61\u4E3B\u8981\u7528\u4E8E\u652F\u6301\u5E94\u7528\u7684\u90E8\u7F72\u3001\u6269\u5C55\u548C\u7BA1\u7406\u3002</li></ul><blockquote><p>\u4F8B\u5982\uFF0C<code>pkg/apis/apps/v1</code>\u76EE\u5F55\u4E0B\u5B58\u653E\u7684\u662FDeployment\u3001StatefulSet\u3001DaemonSet\u7B49API\u5BF9\u8C61\u3002\u8FD9\u4E9BAPI\u5BF9\u8C61\u4E3B\u8981\u7528\u4E8E\u652F\u6301\u5E94\u7528\u7684\u90E8\u7F72\u3001\u6269\u5C55\u548C\u7BA1\u7406\u3002</p><p>\u5728<code>pkg/apis/apps</code>\u76EE\u5F55\u4E0B\uFF0C\u4F60\u4F1A\u53D1\u73B0\u6709\u8BB8\u591A\u5B50\u76EE\u5F55\uFF0C\u6BCF\u4E2A\u5B50\u76EE\u5F55\u5B58\u653E\u7684\u662F\u4E0D\u540C\u7248\u672C\u7684API\u5BF9\u8C61\u3002\u4F8B\u5982\uFF0C<code>pkg/apis/apps/v1</code>\u76EE\u5F55\u4E0B\u5B58\u653E\u7684\u662FDeployment\u3001StatefulSet\u3001DaemonSet\u7B49API\u5BF9\u8C61\u7684v1\u7248\u672C\uFF0C<code>pkg/apis/apps/v1beta1</code>\u76EE\u5F55\u4E0B\u5B58\u5728<code>pkg/apis/apps</code>\u76EE\u5F55\u4E0B\uFF0C\u4F60\u4F1A\u53D1\u73B0\u6709\u8BB8\u591A\u5B50\u76EE\u5F55\uFF0C\u6BCF\u4E2A\u5B50\u76EE\u5F55\u5B58\u653E\u7684\u662F\u4E0D\u540C\u7248\u672C\u7684API\u5BF9\u8C61\u3002\u4F8B\u5982\uFF0C<code>pkg/apis/apps/v1</code>\u76EE\u5F55\u4E0B\u5B58\u653E\u7684\u662FDeployment\u3001StatefulSet\u3001DaemonSet\u7B49API\u5BF9\u8C61\u7684v1\u7248\u672C\uFF0C<code>pkg/apis/apps/v1beta1</code>\u76EE\u5F55\u4E0B\u5B58\u653E\u7684\u662FDeployment\u3001StatefulSet\u3001DaemonSet\u7B49API\u5BF9\u8C61\u7684v1beta1\u7248\u672C\u3002</p><p>\u8FD9\u4E9B\u5B50\u76EE\u5F55\u662F\u4E3A\u4E86\u652F\u6301Kubernetes\u7684\u591A\u7248\u672C\u7279\u6027\u800C\u8BBE\u8BA1\u7684\u3002\u5728Kubernetes\u4E2D\uFF0CAPI\u5BF9\u8C61\u53EF\u4EE5\u6709\u591A\u4E2A\u7248\u672C\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5728\u4E0D\u7834\u574F\u73B0\u6709\u4EE3\u7801\u7684\u60C5\u51B5\u4E0B\uFF0C\u63D0\u4F9B\u65B0\u7684\u529F\u80FD\u548C\u6539\u8FDB\u3002\u8FD9\u4F7F\u5F97Kubernetes\u66F4\u52A0\u7075\u6D3B\uFF0C\u4E5F\u4F7F\u5F97Kubernetes\u7684\u66F4\u65B0\u548C\u5347\u7EA7\u53D8\u5F97\u66F4\u52A0\u5BB9\u6613\u3002</p><p>\u5728<code>pkg/apis/apps</code>\u76EE\u5F55\u4E0B\uFF0C\u4F60\u8FD8\u4F1A\u53D1\u73B0\u6709\u5F88\u591A\u6587\u4EF6\uFF0C\u8FD9\u4E9B\u6587\u4EF6\u662FKubernetes\u7684\u4EE3\u7801\u751F\u6210\u5668\u4F7F\u7528\u7684\u3002Kubernetes\u7684\u4EE3\u7801\u751F\u6210\u5668\u662F\u4E00\u79CD\u5DE5\u5177\uFF0C\u53EF\u4EE5\u6839\u636E\u7528\u6237\u7684\u8F93\u5165\u751F\u6210Kubernetes\u7684API\u5BF9\u8C61\u4EE3\u7801\u3002\u8FD9\u4F7F\u5F97Kubernetes\u7684API\u5BF9\u8C61\u53EF\u4EE5\u66F4\u52A0\u5FEB\u901F\u3001\u7B80\u5355\u5730\u5F00\u53D1\uFF0C\u4E5F\u4F7F\u5F97Kubernetes\u7684API\u5BF9\u8C61\u53EF\u4EE5\u66F4\u52A0\u4E00\u81F4\u3001\u7EDF\u4E00\u5730\u7BA1\u7406\u3002</p><p>\u9664\u4E86<code>pkg/apis/apps</code>\u76EE\u5F55\uFF0CKubernetes\u8FD8\u6709\u8BB8\u591A\u5176\u4ED6\u76EE\u5F55\uFF0C\u8FD9\u4E9B\u76EE\u5F55\u4E5F\u662FKubernetes\u7684\u4EE3\u7801\u751F\u6210\u5668\u4F7F\u7528\u7684\u3002\u4F8B\u5982\uFF0C<code>pkg/apis/authorization</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u8BA4\u8BC1\u548C\u6388\u6743\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C<code>pkg/apis/batch</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u6279\u5904\u7406\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C<code>pkg/apis/coordination</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u534F\u8C03\u76F8\u5173\u7684API\u5BF9\u8C61\u7B49\u3002</p></blockquote><hr><h3 id="rbac" tabindex="-1"><a class="header-anchor" href="#rbac" aria-hidden="true">#</a> RBAC</h3><details class="custom-container details"><summary>about RBAC</summary><p>\u5728\u4E0A\u9762\u6211\u4EEC\u770B\u5230\uFF0C<code>rbac</code>\u76EE\u5F55\u5B58\u653E\u7684\u662F\u57FA\u4E8E\u89D2\u8272\u7684\u8BBF\u95EE\u63A7\u5236\uFF08RBAC\uFF09\u76F8\u5173\u7684API\u5BF9\u8C61\uFF0C\u4F8B\u5982 ClusterRole\u3001RoleBinding \u7B49\u3002</p><p>\u90A3\u4E48 RBAC \u662F\u4EC0\u4E48\u5462\uFF0C\u5B83\u662F\u4E00\u57FA\u4E8E\u89D2\u8272\u7684\u6743\u9650\u63A7\u5236\uFF0C\u6216\u8BB8\u4E0B\u9762\u7684\u4E00\u53E5\u8BDD\u80FD\u5E2E\u52A9\u4F60\u7406\u89E3\u5B83\uFF1A</p><p><strong>\u6211\u4EEC\u90FD\u77E5\u9053 Kubernetes \u4E2D\u6240\u6709\u7684 API\u5BF9\u8C61\u90FD\u4FDD\u5B58\u5728 etcd \u4E2D\uFF0C\u53EF\u662F\uFF0C\u5BF9\u4E8E\u8FD9\u4E9B API \u5BF9\u8C61\u7684\u64CD\u4F5C\u4E00\u5B9A\u662F\u901A\u8FC7\u8BBF\u95EE kube-apiServer \u5B9E\u73B0\u7684\u3002\u5176\u4E2D\u4E00\u4E2A\u975E\u5E38\u91CD\u8981\u7684\u539F\u56E0\u5C31\u662F\uFF0C\u9700\u8981 API Server \u6765\u5E2E\u5FD9\u5DE6\u6388\u6743\u5DE5\u4F5C\u3002\u800C\u5728 Kubernetes \u7684\u9879\u76EE\u4E2D\uFF0C\u8D1F\u8D23\u5B8C\u6210\u6388\u6743\u5DE5\u4F5C\u7684\u673A\u5236\u662F RBAC\u3002\u26A0\uFE0F</strong></p><p>so\uFF0Cdirectory structure\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:/workspces/kubernetes/pkg/apis/rbac<span class="token comment"># ls -al</span>
total <span class="token number">92</span>
drwxr-xr-x  <span class="token number">8</span> root root  <span class="token number">4096</span> Jan  <span class="token number">4</span> 06:58 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">27</span> root root  <span class="token number">4096</span> Jan  <span class="token number">4</span> 06:58 <span class="token punctuation">..</span>
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">698</span> Nov <span class="token number">30</span> 03:40 doc.go
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Nov <span class="token number">30</span> 03:40 fuzzer
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">12362</span> Nov <span class="token number">30</span> 03:40 helpers.go
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">9453</span> Nov <span class="token number">30</span> 03:40 helpers_test.go
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Nov <span class="token number">30</span> 03:40 <span class="token function">install</span>
-rw-r--r--  <span class="token number">1</span> root root   <span class="token number">205</span> Nov <span class="token number">30</span> 03:40 OWNERS
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">1811</span> Nov <span class="token number">30</span> 03:40 register.go
-rw-r--r--  <span class="token number">1</span> root root  <span class="token number">7897</span> Jan  <span class="token number">4</span> 06:58 types.go
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Nov <span class="token number">30</span> 03:40 v1
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Nov <span class="token number">30</span> 03:40 v1alpha1
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Nov <span class="token number">30</span> 03:40 v1beta1
drwxr-xr-x  <span class="token number">2</span> root root  <span class="token number">4096</span> Jan  <span class="token number">4</span> 06:58 validation
-rw-r--r--  <span class="token number">1</span> root root <span class="token number">11402</span> Dec  <span class="token number">9</span> 09:16 zz_generated.deepcopy.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u{1F4DC} \u5BF9\u4E0A\u9762\u7684\u89E3\u91CA\uFF1A</p><blockquote><ul><li><code>doc.go</code> \u6587\u4EF6\u5305\u542B\u5BF9\u6574\u4E2A\u5305\u7684\u6587\u6863\u7684\u5F15\u7528\u3002</li><li><code>helpers.go</code> \u6587\u4EF6\u5305\u542B\u7528\u4E8E\u5B9E\u73B0 RBAC \u529F\u80FD\u7684\u5E2E\u52A9\u7A0B\u5E8F\u51FD\u6570\u7684\u4EE3\u7801\u3002</li><li><code>helpers_test.go</code> \u6587\u4EF6\u5305\u542B\u7528\u4E8E\u6D4B\u8BD5 <code>helpers.go</code> \u4E2D\u7684\u51FD\u6570\u7684\u4EE3\u7801\u3002</li><li><code>install</code> \u76EE\u5F55\u5305\u542B\u7528\u4E8E\u5B89\u88C5 RBAC API \u7684\u4EE3\u7801\u3002</li><li><code>OWNERS</code> \u6587\u4EF6\u5305\u542B\u5BF9\u8FD9\u4E2A\u76EE\u5F55\u7684\u7EF4\u62A4\u8005\u7684\u5217\u8868\u3002</li><li><code>register.go</code> \u6587\u4EF6\u5305\u542B\u7528\u4E8E\u6CE8\u518C RBAC API \u7684\u4EE3\u7801\u3002</li><li><code>types.go</code> \u6587\u4EF6\u5305\u542B\u7528\u4E8E\u5B9A\u4E49 RBAC API \u5BF9\u8C61\u7684\u4EE3\u7801\u3002</li><li><code>validation</code> \u76EE\u5F55\u5305\u542B\u7528\u4E8E\u9A8C\u8BC1 RBAC API \u5BF9\u8C61\u7684\u4EE3\u7801\u3002</li><li><code>v1</code> \u76EE\u5F55\u5305\u542B v1 \u7248\u672C\u7684 RBAC API \u5BF9\u8C61\u7684\u5B9A\u4E49\u3002</li><li><code>v1alpha1</code> \u76EE\u5F55\u5305\u542B v1alpha1 \u7248\u672C\u7684 RBAC API \u5BF9\u8C61\u7684\u5B9A\u4E49\u3002</li><li><code>v1beta1</code> \u76EE\u5F55\u5305\u542B v1beta1 \u7248\u672C\u7684 RBAC API \u5BF9\u8C61\u7684\u5B9A\u4E49\u3002</li><li><code>fuzzer</code> \u6587\u4EF6\u5305\u542B\u7528\u4E8E\u6267\u884C\u6A21\u7CCA\u6D4B\u8BD5\u7684\u4EE3\u7801\u3002</li><li><code>zz_generated.deepcopy.go</code> \u6587\u4EF6\u5305\u542B\u7528\u4E8E\u751F\u6210\u6DF1\u62F7\u8D1D\u51FD\u6570\u7684\u4EE3\u7801\u3002</li></ul></blockquote><p>\u53EF\u4EE5\u4F7F\u7528 <code>types.go</code> \u6587\u4EF6\u4E2D\u5B9A\u4E49\u7684 <code>Role</code> \u548C <code>RoleBinding</code> \u5BF9\u8C61\u6765\u521B\u5EFA\u548C\u7BA1\u7406\u89D2\u8272\u3002\u60A8\u53EF\u4EE5\u4F7F\u7528 <code>register.go</code> \u4E2D\u7684\u4EE3\u7801\u6765\u6CE8\u518C RBAC API\uFF0C\u4ECE\u800C\u4F7F\u5176\u53EF\u4EE5\u5728\u96C6\u7FA4\u4E2D\u4F7F\u7528\u3002\u60A8\u53EF\u4EE5\u4F7F\u7528 <code>validation</code> \u76EE\u5F55\u4E2D\u7684\u4EE3\u7801\u6765\u9A8C\u8BC1 RBAC API \u5BF9\u8C61\uFF0C\u4EE5\u786E\u4FDD\u5B83\u4EEC\u7B26\u5408\u8981\u6C42\u3002</p><p>\u8FD9\u4E9B\u6587\u4EF6\u548C\u76EE\u5F55\u5171\u540C\u6784\u6210\u4E86 Kubernetes \u4E2D\u7684 RBAC \u529F\u80FD\u3002RBAC \u529F\u80FD\u4F7F\u60A8\u53EF\u4EE5\u5728\u96C6\u7FA4\u4E2D\u521B\u5EFA\u548C\u7BA1\u7406\u89D2\u8272\uFF0C\u5E76\u5C06\u89D2\u8272\u5206\u914D\u7ED9\u7528\u6237\u548C\u7EC4\uFF0C\u4ECE\u800C\u63A7\u5236\u5BF9\u8D44\u6E90\u7684\u8BBF\u95EE\u3002</p></details><h3 id="oweners-\u7EF4\u62A4\u8005\u7684\u5217\u8868" tabindex="-1"><a class="header-anchor" href="#oweners-\u7EF4\u62A4\u8005\u7684\u5217\u8868" aria-hidden="true">#</a> OWENERS \u7EF4\u62A4\u8005\u7684\u5217\u8868</h3>`,46),y={href:"https://github.com/kubernetes/community/blob/master/contributors/guide/owners.md",target:"_blank",rel:"noopener noreferrer"},A=i("\u{1F50D} GitHub md"),I=a(`<p>\u5728 <code>details</code> \u5185\u5BB9\u4E2D\uFF0C\u6211\u4EEC\u770B\u5230\u4E86 <code>OWNERS</code> \u6587\u4EF6\uFF0C\u9488\u5BF9 Kubernetes \u7684\u9879\u76EE\u5BF9\u7EF4\u62A4\u8005\u7684\u5217\u8868\u6587\u4EF6\u505A\u51FA\u5206\u6790\uFF0C\u8FD9\u4E2A\u6587\u4EF6\uFF0C\u4E0D\u7B80\u5355\uFF01 \u2B55</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># See the OWNERS docs at https://go.k8s.io/owners</span>

<span class="token comment"># approval on api packages bubbles to api-approvers</span>
<span class="token key atrule">reviewers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> sig<span class="token punctuation">-</span>auth<span class="token punctuation">-</span>authorizers<span class="token punctuation">-</span>approvers
  <span class="token punctuation">-</span> sig<span class="token punctuation">-</span>auth<span class="token punctuation">-</span>authorizers<span class="token punctuation">-</span>reviewers
<span class="token key atrule">labels</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> sig/auth
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u{1F4DC} \u5BF9\u4E0A\u9762\u7684\u89E3\u91CA\uFF1A</p><p>OWNERS \u6587\u4EF6\u901A\u5E38\u5305\u542B\u6709\u5173\u76EE\u5F55\u7684\u7EF4\u62A4\u4EBA\u5458\u7684\u4FE1\u606F\u3002\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0COWNERS \u6587\u4EF6\u5305\u542B\u6709\u5173 <code>pkg/apis/rbac</code> \u76EE\u5F55\u7684\u7EF4\u62A4\u4EBA\u5458\u7684\u4FE1\u606F\u3002</p><p>OWNERS \u6587\u4EF6\u4E2D\u7684 <code>reviewers</code> \u5B57\u6BB5\u5305\u542B\u4E00\u4E2A\u7528\u6237\u540D\u5217\u8868\uFF0C\u8868\u793A\u5728\u8BE5\u76EE\u5F55\u4E2D\u6240\u6709\u4EE3\u7801\u66F4\u6539\u63D0\u4EA4\u4E4B\u524D\u5FC5\u987B\u63D0\u4F9B\u6279\u51C6\u7684\u7528\u6237\u3002\u8FD9\u4E9B\u7528\u6237\u88AB\u79F0\u4E3A\u5BA1\u6838\u5458\u3002\u4F8B\u5982\uFF0C\u5728\u672C\u4F8B\u4E2D\uFF0C\u6240\u6709\u4EE3\u7801\u66F4\u6539\u90FD\u5FC5\u987B\u5728 <code>sig-auth-authorizers-approvers</code> \u548C <code>sig-auth-authorizers-reviewers</code> \u4E24\u4E2A\u7528\u6237\u4E2D\u7684\u4E00\u4E2A\u6279\u51C6\u4E4B\u540E\u624D\u80FD\u63D0\u4EA4\u3002</p><p>OWNERS \u6587\u4EF6\u4E2D\u7684 <code>labels</code> \u5B57\u6BB5\u5305\u542B\u4E00\u4E2A\u6807\u7B7E\u5217\u8868\uFF0C\u8868\u793A\u4E0E\u8BE5\u76EE\u5F55\u76F8\u5173\u7684\u4E3B\u9898\u6216\u5173\u6CE8\u70B9\u3002\u8FD9\u4E9B\u6807\u7B7E\u53EF\u4EE5\u5E2E\u52A9\u60A8\u5FEB\u901F\u4E86\u89E3\u8BE5\u76EE\u5F55\u6240\u5173\u6CE8\u7684\u5185\u5BB9\u3002\u4F8B\u5982\uFF0C\u5728\u672C\u4F8B\u4E2D\uFF0C\u8BE5\u76EE\u5F55\u4E0E <code>sig/auth</code> \u4E3B\u9898\u6709\u5173\u3002</p><p>OWNERS \u6587\u4EF6\u662F\u7528\u4E8E\u63CF\u8FF0\u4E0E\u76EE\u5F55\u76F8\u5173\u7684\u4FE1\u606F\u7684\u6587\u4EF6\uFF0C\u4F8B\u5982\u5BA1\u6838\u5458\u548C\u5173\u6CE8\u70B9\u3002\u8FD9\u4E9B\u4FE1\u606F\u6709\u52A9\u4E8E\u534F\u8C03\u548C\u7BA1\u7406\u8BE5\u76EE\u5F55\u4E2D\u7684\u4EE3\u7801\u3002</p><p>\u2753 \u6211\u4EEC\u63D0\u5230\u4E86\u4EE3\u7801\u751F\u6210\u5668\uFF0C\u5176\u5B9E\u518D \u300A\u6DF1\u5165\u89E3\u6790Kubernetes\u7684\u6E90\u7801\u300B \u8FD9\u672C\u4E66\u4E2D\uFF0C\u6211\u4EEC\u4E86\u89E3\u5230\u4E86\u4EE3\u7801\u751F\u6210\u5668\uFF0C\u4F46\u662F\u4E66\u4E2D\u5199\u7684\u903B\u8F91\u4E0D\u662F\u5F88\u6E05\u6670\uFF0C\u5BFC\u81F4\u5BF9 \u4EE3\u7801\u751F\u6210\u5668 \u7684\u7406\u89E3\u4E0D\u662F\u5F88\u900F\u5F7B~</p><blockquote><p>\u{1F42D} \u6240\u4EE5\u8FD8\u662F\u63A8\u8350\u770B \u300A\u6DF1\u5165\u5256\u6790Kubernetes\u300B</p></blockquote><h3 id="\u4EE3\u7801\u751F\u6210\u5668" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7801\u751F\u6210\u5668" aria-hidden="true">#</a> \u4EE3\u7801\u751F\u6210\u5668</h3><p>Kubernetes\u7684\u4EE3\u7801\u751F\u6210\u5668\u662F\u4E00\u79CD\u5DE5\u5177\uFF0C\u7528\u4E8E\u751F\u6210Kubernetes\u7684API\u5BF9\u8C61\u4EE3\u7801\u3002\u5B83\u53EF\u4EE5\u6839\u636E\u7528\u6237\u7684\u8F93\u5165\uFF0C\u81EA\u52A8\u751F\u6210Kubernetes API\u5BF9\u8C61\u7684 Go \u4EE3\u7801\u3002Kubernetes\u7684\u4EE3\u7801\u751F\u6210\u5668\u4F7F\u7528\u4E86\u4E00\u79CD\u53EB\u505A OpenAPI \u7684\u6280\u672F\uFF0C\u53EF\u4EE5\u901A\u8FC7\u5B9A\u4E49 API \u5BF9\u8C61\u7684\u6A21\u578B\u6765\u751F\u6210\u4EE3\u7801\u3002</p><p>Kubernetes\u7684\u4EE3\u7801\u751F\u6210\u5668\u6709\u8BB8\u591A\u4F18\u70B9\uFF0C\u4F8B\u5982\uFF1A</p><ul><li>\u51CF\u5C11\u91CD\u590D\u5DE5\u4F5C\uFF1A\u4F7F\u7528\u4EE3\u7801\u751F\u6210\u5668\uFF0C\u53EF\u4EE5\u51CF\u5C11\u624B\u5199\u4EE3\u7801\u7684\u5DE5\u4F5C\u91CF\u3002</li><li>\u63D0\u9AD8\u4EE3\u7801\u8D28\u91CF\uFF1A\u4F7F\u7528\u4EE3\u7801\u751F\u6210\u5668\uFF0C\u53EF\u4EE5\u4FDD\u8BC1\u751F\u6210\u7684\u4EE3\u7801\u8D28\u91CF\u66F4\u9AD8\uFF0C\u56E0\u4E3A\u5B83\u662F\u6839\u636E\u6A21\u677F\u751F\u6210\u7684\u3002</li><li>\u4FDD\u8BC1\u4EE3\u7801\u4E00\u81F4\u6027\uFF1A\u4F7F\u7528\u4EE3\u7801\u751F\u6210\u5668\uFF0C\u53EF\u4EE5\u4FDD\u8BC1\u751F\u6210\u7684\u4EE3\u7801\u98CE\u683C\u4E00\u81F4\uFF0C\u56E0\u4E3A\u5B83\u662F\u6839\u636E\u6A21\u677F\u751F\u6210\u7684\u3002</li></ul><p>Kubernetes\u7684\u4EE3\u7801\u751F\u6210\u5668\u5BF9Kubernetes\u7684\u4F5C\u7528\u975E\u5E38\u91CD\u8981\uFF0C\u5B83\u4F7F\u5F97Kubernetes\u7684API\u5BF9\u8C61\u53EF\u4EE5\u66F4\u52A0\u5FEB\u901F\u3001\u7B80\u5355\u5730\u5F00\u53D1\uFF0C\u4E5F\u4F7F\u5F97Kubernetes\u7684API\u5BF9\u8C61\u53EF\u4EE5\u66F4\u52A0\u4E00\u81F4\u3001\u7EDF\u4E00\u5730\u7BA1\u7406\u3002</p><p>\u901A\u8FC7\u4F7F\u7528\u4EE3\u7801\u751F\u6210\u5668\uFF0CKubernetes\u7684\u5F00\u53D1\u4EBA\u5458\u53EF\u4EE5\u4E13\u6CE8\u4E8EAPI\u5BF9\u8C61\u7684\u4E1A\u52A1\u903B\u8F91\uFF0C\u800C\u4E0D\u5FC5\u62C5\u5FC3\u5E95\u5C42\u5B9E\u73B0\u7EC6\u8282\u3002\u8FD9\u5927\u5927\u964D\u4F4E\u4E86\u5F00\u53D1\u96BE\u5EA6\uFF0C\u4E5F\u63D0\u9AD8\u4E86\u5F00\u53D1\u6548\u7387\u3002</p><p>\u6B64\u5916\uFF0C\u4F7F\u7528\u4EE3\u7801\u751F\u6210\u5668\u8FD8\u53EF\u4EE5\u4FDD\u8BC1Kubernetes\u7684API\u5BF9\u8C61\u4EE3\u7801\u8D28\u91CF\u66F4\u9AD8\uFF0C\u56E0\u4E3A\u5B83\u662F\u6839\u636E\u6A21\u677F\u751F\u6210\u7684\u3002\u8FD9\u80FD\u591F\u907F\u514D\u4EBA\u4E3A\u758F\u5FFD\u5BFC\u81F4\u7684\u4EE3\u7801\u9519\u8BEF\uFF0C\u4F7F\u5F97Kubernetes\u7684API\u5BF9\u8C61\u66F4\u52A0\u53EF\u9760\u3002</p><p>\u603B\u7684\u6765\u8BF4\uFF0CKubernetes\u7684\u4EE3\u7801\u751F\u6210\u5668\u662F\u4E00\u79CD\u975E\u5E38\u6709\u7528\u7684\u5DE5\u5177\uFF0C\u5B83\u4E3AKubernetes\u7684API\u5BF9\u8C61\u7684\u5F00\u53D1\u548C\u7BA1\u7406\u5E26\u6765\u4E86\u5F88\u591A\u4FBF\u5229\u3002</p><p><code>Kubernetes</code>\u6E90\u7801\u4E2D\u7684\u4EE3\u7801\u751F\u6210\u5668\u4F8B\u5B50\uFF0C\u4EE5\u53CA\u5B83\u4EEC\u6240\u5728\u7684\u5730\u5740\u76EE\u5F55\uFF1A</p><ul><li>Deployment\u4EE3\u7801\u751F\u6210\u5668\uFF1A<code>pkg/apis/apps/v1/codegen</code></li><li>Service\u4EE3\u7801\u751F\u6210\u5668\uFF1A<code>pkg/apis/core/v1/codegen</code></li><li>Pod\u4EE3\u7801\u751F\u6210\u5668\uFF1A<code>pkg/apis/core/v1/codegen</code></li><li>ReplicationController\u4EE3\u7801\u751F\u6210\u5668\uFF1A<code>pkg/apis/core/v1/codegen</code></li><li>Job\u4EE3\u7801\u751F\u6210\u5668\uFF1A<code>pkg/apis/batch/v1/codegen</code></li><li>CronJob\u4EE3\u7801\u751F\u6210\u5668\uFF1A<code>pkg/apis/batch/v1beta1/codegen</code></li></ul>`,19),P={class:"custom-container danger"},x=e("p",{class:"custom-container-title"},"\u63D0\u9192",-1),K=e("p",null,"\u66F4\u591A\u5173\u4E8E\u4EE3\u7801\u751F\u6210\u5668\u7684\u77E5\u8BC6\uFF0C\u63A8\u8350\u9605\u8BFB\uFF1A",-1),C={href:"https://cloud.redhat.com/blog/kubernetes-deep-dive-code-generation-customresources",target:"_blank",rel:"noopener noreferrer"},S=i("Kubernetes Deep Dive\uFF1ACustomResources \u7684\u4EE3\u7801\u751F\u6210"),R=e("h2",{id:"staging",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#staging","aria-hidden":"true"},"#"),i(" staging")],-1),E=i("\u8FD9\u4E2A\u76EE\u5F55\u51C6\u786E\u6765\u8BF4\u662F\u5B58\u653E\u6838\u5FC3\u7EC4\u4EF6\u7684\uFF0C\u4F46\u662F\u662F\u4E34\u65F6\u5B58\u50A8\u7684\uFF0C\u6211\u4EEC\u53EF\u4EE5\u53C2\u8003 "),w={href:"https://github.com/kubernetes/kubernetes/tree/master/staging",target:"_blank",rel:"noopener noreferrer"},N=i("README.md"),O=i(" \u6587\u4EF6"),B=e("p",null,"\u6B64\u76EE\u5F55\u662F\u5DF2\u62C6\u5206\u5230\u81EA\u5DF1\u7684\u5B58\u50A8\u5E93\u7684\u5305\u7684\u6682\u5B58\u533A\u3002\u8FD9\u91CC\u7684\u5185\u5BB9\u5C06\u5B9A\u671F\u53D1\u5E03\u5230\u5404\u81EA\u7684\u9876\u7EA7 k8s.io \u5B58\u50A8\u5E93\u3002",-1),W=e("p",null,"\u76EE\u524D\u5728\u6B64\u5904\u6682\u5B58\u7684\u5B58\u50A8\u5E93\uFF1A",-1),M={href:"https://github.com/kubernetes/api",target:"_blank",rel:"noopener noreferrer"},D=e("code",null,"k8s.io/api",-1),L={href:"https://github.com/kubernetes/apiextensions-apiserver",target:"_blank",rel:"noopener noreferrer"},z=e("code",null,"k8s.io/apiextensions-apiserver",-1),T={href:"https://github.com/kubernetes/apimachinery",target:"_blank",rel:"noopener noreferrer"},q=e("code",null,"k8s.io/apimachinery",-1),G={href:"https://github.com/kubernetes/apiserver",target:"_blank",rel:"noopener noreferrer"},j=e("code",null,"k8s.io/apiserver",-1),J={href:"https://github.com/kubernetes/cli-runtime",target:"_blank",rel:"noopener noreferrer"},U=e("code",null,"k8s.io/cli-runtime",-1),V={href:"https://github.com/kubernetes/client-go",target:"_blank",rel:"noopener noreferrer"},F=e("code",null,"k8s.io/client-go",-1),H={href:"https://github.com/kubernetes/cloud-provider",target:"_blank",rel:"noopener noreferrer"},Y=e("code",null,"k8s.io/cloud-provider",-1),Q={href:"https://github.com/kubernetes/cluster-bootstrap",target:"_blank",rel:"noopener noreferrer"},X=e("code",null,"k8s.io/cluster-bootstrap",-1),Z={href:"https://github.com/kubernetes/code-generator",target:"_blank",rel:"noopener noreferrer"},$=e("code",null,"k8s.io/code-generator",-1),ee={href:"https://github.com/kubernetes/component-base",target:"_blank",rel:"noopener noreferrer"},ne=e("code",null,"k8s.io/component-base",-1),se={href:"https://github.com/kubernetes/component-helpers",target:"_blank",rel:"noopener noreferrer"},ie=e("code",null,"k8s.io/component-helpers",-1),ae={href:"https://github.com/kubernetes/controller-manager",target:"_blank",rel:"noopener noreferrer"},le=e("code",null,"k8s.io/controller-manager",-1),re={href:"https://github.com/kubernetes/cri-api",target:"_blank",rel:"noopener noreferrer"},oe=e("code",null,"k8s.io/cri-api",-1),de={href:"https://github.com/kubernetes/csi-translation-lib",target:"_blank",rel:"noopener noreferrer"},te=e("code",null,"k8s.io/csi-translation-lib",-1),ce={href:"https://github.com/kubernetes/kms",target:"_blank",rel:"noopener noreferrer"},ue=e("code",null,"k8s.io/kms",-1),pe={href:"https://github.com/kubernetes/kube-aggregator",target:"_blank",rel:"noopener noreferrer"},ve=e("code",null,"k8s.io/kube-aggregator",-1),be={href:"https://github.com/kubernetes/kube-controller-manager",target:"_blank",rel:"noopener noreferrer"},me=e("code",null,"k8s.io/kube-controller-manager",-1),ke={href:"https://github.com/kubernetes/kube-proxy",target:"_blank",rel:"noopener noreferrer"},ge=e("code",null,"k8s.io/kube-proxy",-1),he={href:"https://github.com/kubernetes/kube-scheduler",target:"_blank",rel:"noopener noreferrer"},fe=e("code",null,"k8s.io/kube-scheduler",-1),_e={href:"https://github.com/kubernetes/kubectl",target:"_blank",rel:"noopener noreferrer"},ye=e("code",null,"k8s.io/kubectl",-1),Ae={href:"https://github.com/kubernetes/kubelet",target:"_blank",rel:"noopener noreferrer"},Ie=e("code",null,"k8s.io/kubelet",-1),Pe={href:"https://github.com/kubernetes/legacy-cloud-providers",target:"_blank",rel:"noopener noreferrer"},xe=e("code",null,"k8s.io/legacy-cloud-providers",-1),Ke={href:"https://github.com/kubernetes/metrics",target:"_blank",rel:"noopener noreferrer"},Ce=e("code",null,"k8s.io/metrics",-1),Se={href:"https://github.com/kubernetes/mount-utils",target:"_blank",rel:"noopener noreferrer"},Re=e("code",null,"k8s.io/mount-utils",-1),Ee={href:"https://github.com/kubernetes/noderesourcetopology-api",target:"_blank",rel:"noopener noreferrer"},we=e("code",null,"k8s.io/noderesourcetopology-api",-1),Ne={href:"https://github.com/kubernetes/pod-security-admission",target:"_blank",rel:"noopener noreferrer"},Oe=e("code",null,"k8s.io/pod-security-admission",-1),Be={href:"https://github.com/kubernetes/sample-apiserver",target:"_blank",rel:"noopener noreferrer"},We=e("code",null,"k8s.io/sample-apiserver",-1),Me={href:"https://github.com/kubernetes/sample-cli-plugin",target:"_blank",rel:"noopener noreferrer"},De=e("code",null,"k8s.io/sample-cli-plugin",-1),Le={href:"https://github.com/kubernetes/sample-controller",target:"_blank",rel:"noopener noreferrer"},ze=e("code",null,"k8s.io/sample-controller",-1),Te=a(`<p><code>staging/</code> \u76EE\u5F55\u4E2D\u7684\u4EE3\u7801\u662F\u6743\u5A01\u7684\uFF0C\u5373\u4EE3\u7801\u7684\u552F\u4E00\u526F\u672C\u3002\u60A8\u53EF\u4EE5\u76F4\u63A5\u4FEE\u6539\u6B64\u7C7B\u4EE3\u7801\u3002</p><h3 id="\u4F7F\u7528-kubernetes-\u4EE3\u7801\u4E2D\u7684\u6682\u5B58\u5B58\u50A8\u5E93" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-kubernetes-\u4EE3\u7801\u4E2D\u7684\u6682\u5B58\u5B58\u50A8\u5E93" aria-hidden="true">#</a> \u4F7F\u7528 Kubernetes \u4EE3\u7801\u4E2D\u7684\u6682\u5B58\u5B58\u50A8\u5E93</h3><p>Kubernetes \u4EE3\u7801\u901A\u8FC7\u76EE\u5F55\u4E2D\u7684\u7B26\u53F7\u94FE\u63A5\u4F7F\u7528\u6B64\u76EE\u5F55\u4E2D\u7684\u5B58\u50A8\u5E93 <code>vendor/k8s.io</code>\u5230\u6B64\u6682\u5B58\u533A\u57DF\u3002\u4F8B\u5982\uFF0C\u5F53 Kubernetes \u4EE3\u7801\u4ECE<code>k8s.io/client-go</code>\u5B58\u50A8\u5E93\u5BFC\u5165\u4E00\u4E2A\u5305\u65F6\uFF0C\u8BE5\u5BFC\u5165\u88AB\u89E3\u6790\u4E3A<code>staging/src/k8s.io/client-go</code>\u76F8\u5BF9\u4E8E\u9879\u76EE\u6839\u76EE\u5F55\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token comment">// pkg/example/some_code.go</span>
<span class="token keyword">package</span> example

<span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">&quot;k8s.io/client-go/dynamic&quot;</span> <span class="token comment">// resolves to staging/src/k8s.io/client-go/dynamic</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E00\u65E6\u5B8C\u6210\u5411\u5916\u90E8\u5B58\u50A8\u5E93\u7684\u8F6C\u6362\uFF0C\u8FD9\u4E9B\u5B58\u50A8\u5E93\u5B9E\u9645\u4E0A\u5C06\u7531<code>k8s.io/&lt;package-name&gt;</code>.</p><h2 id="src-k8s" tabindex="-1"><a class="header-anchor" href="#src-k8s" aria-hidden="true">#</a> src/k8s</h2><p>src/k8s.io/\u76EE\u5F55\u662FKubernetes\u9879\u76EE\u7684\u6839\u76EE\u5F55\uFF0C\u5305\u542B\u4E86Kubernetes\u7CFB\u7EDF\u7684\u6240\u6709\u6E90\u4EE3\u7801\u3002\u8FD9\u662Fsrc/k8s.io/\u76EE\u5F55\u7684\u9AD8\u5C42\u7ED3\u6784\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:/workspces/kubernetes/staging/src/k8s.io<span class="token comment"># tree -L 1</span>
<span class="token builtin class-name">.</span>
\u251C\u2500\u2500 api
\u251C\u2500\u2500 apiextensions-apiserver
\u251C\u2500\u2500 apimachinery
\u251C\u2500\u2500 apiserver
\u251C\u2500\u2500 client-go
\u251C\u2500\u2500 cli-runtime
\u251C\u2500\u2500 cloud-provider
\u251C\u2500\u2500 cluster-bootstrap
\u251C\u2500\u2500 code-generator
\u251C\u2500\u2500 component-base
\u251C\u2500\u2500 component-helpers
\u251C\u2500\u2500 controller-manager
\u251C\u2500\u2500 cri-api
\u251C\u2500\u2500 csi-translation-lib
\u251C\u2500\u2500 dynamic-resource-allocation
\u251C\u2500\u2500 kms
\u251C\u2500\u2500 kube-aggregator
\u251C\u2500\u2500 kube-controller-manager
\u251C\u2500\u2500 kubectl
\u251C\u2500\u2500 kubelet
\u251C\u2500\u2500 kube-proxy
\u251C\u2500\u2500 kube-scheduler
\u251C\u2500\u2500 legacy-cloud-providers
\u251C\u2500\u2500 metrics
\u251C\u2500\u2500 mount-utils
\u251C\u2500\u2500 noderesourcetopology-api
\u251C\u2500\u2500 pod-security-admission
\u251C\u2500\u2500 sample-apiserver
\u251C\u2500\u2500 sample-cli-plugin
\u2514\u2500\u2500 sample-controller
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u76EE\u5F55\u529F\u80FD\uFF1A</strong></p><ul><li><code>api/</code>\u76EE\u5F55\u5305\u542BKubernetes API\u7684\u5B9A\u4E49\u3002</li><li><code>apiextensions-apiserver/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u6269\u5C55Kubernetes API\u7684\u4EE3\u7801\u3002</li><li><code>apimachinery/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u6784\u5EFAKubernetes API\u7684\u5DE5\u5177\u3002</li><li><code>apiserver/</code>\u76EE\u5F55\u5305\u542BKubernetes API\u670D\u52A1\u5668\u7684\u6E90\u4EE3\u7801\u3002</li><li><code>client-go/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u8BBF\u95EEKubernetes API\u7684\u5BA2\u6237\u7AEF\u5E93\u3002</li><li><code>cli-runtime/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u6269\u5C55kubectl\u7684\u5E93\u3002</li><li><code>cloud-provider/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u652F\u6301\u4E91\u5E73\u53F0\u7684\u4EE3\u7801\u3002</li><li><code>cluster-bootstrap/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u5F15\u5BFC\u65B0\u96C6\u7FA4\u7684\u5DE5\u5177\u3002</li><li><code>code-generator/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u751F\u6210Kubernetes\u4EE3\u7801\u7684\u5DE5\u5177\u3002</li><li><code>component-base/</code>\u76EE\u5F55\u5305\u542BKubernetes\u7EC4\u4EF6\u7684\u57FA\u7840\u5E93\u3002</li><li><code>component-helpers/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u5E2E\u52A9\u6784\u5EFAKubernetes\u7EC4\u4EF6\u7684\u5E93\u3002</li><li><code>controller-manager/</code>\u76EE\u5F55\u5305\u542BKubernetes\u63A7\u5236\u5668\u7BA1\u7406\u5668\u7684\u4EE3\u7801\u3002</li><li><code>csi-translation-lib/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u5728Kubernetes\u548C\u5BB9\u5668\u5B58\u50A8\u63A5\u53E3(CSI)\u4E4B\u95F4\u8FDB\u884C\u8F6C\u6362\u7684\u5E93\u3002</li><li><code>cri-api/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u8FD0\u884C\u5BB9\u5668\u7684\u4EE3\u7801\u3002</li><li><code>dynamic-resource-allocation/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u52A8\u6001\u5206\u914D\u8D44\u6E90\u7684\u4EE3\u7801\u3002</li><li><code>kms/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u7BA1\u7406\u52A0\u5BC6\u5BC6\u94A5\u7684\u4EE3\u7801\u3002</li><li><code>kube-aggregator/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u63D0\u4F9B\u805A\u5408API\u670D\u52A1\u5668\u7684\u4EE3\u7801\u3002</li><li><code>kube-controller-manager/</code>\u76EE\u5F55\u5305\u542BKubernetes\u63A7\u5236\u5668\u7BA1\u7406\u5668\u7684\u4EE3\u7801\u3002</li><li><code>kubectl/</code>\u76EE\u5F55\u5305\u542Bkubectl\u547D\u4EE4\u884C\u5DE5\u5177\u7684\u6E90\u4EE3\u7801\u3002</li><li><code>kubelet/</code>\u76EE\u5F55\u5305\u542Bkubelet\u7684\u6E90\u4EE3\u7801\u3002</li><li><code>kube-proxy/</code>\u76EE\u5F55\u5305\u542BKubernetes\u4EE3\u7406\u7684\u4EE3\u7801\u3002</li><li><code>kube-scheduler/</code>\u76EE\u5F55\u5305\u542BKubernetes\u8C03\u5EA6\u7A0B\u5E8F\u7684\u4EE3\u7801\u3002</li><li><code>legacy-cloud-providers/</code>\u76EE\u5F55\u5305\u542B\u5DF2\u5E9F\u5F03\u7684\u4E91\u63D0\u4F9B\u5546\u4EE3\u7801\u3002</li><li><code>metrics/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u6536\u96C6Kubernetes\u5EA6\u91CF\u6307\u6807\u7684\u4EE3\u7801\u3002</li><li><code>mount-utils/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u6302\u8F7D\u6587\u4EF6\u7CFB\u7EDF\u7684\u5DE5\u5177\u3002</li><li><code>noderesourcetopology-api/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u63CF\u8FF0\u8282\u70B9\u8D44\u6E90\u62D3\u6251\u7ED3\u6784\u7684API\u3002</li><li><code>pod-security-admission/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u63A7\u5236pod\u5B89\u5168\u6027\u7684\u4EE3\u7801\u3002</li><li><code>sample-apiserver/</code>\u76EE\u5F55\u5305\u542BKubernetes\u793A\u4F8BAPI\u670D\u52A1\u5668\u7684\u4EE3\u7801\u3002</li><li><code>sample-cli-plugin/</code>\u76EE\u5F55\u5305\u542B\u7528\u4E8E\u6269\u5C55kubectl\u7684\u793A\u4F8B\u63D2\u4EF6\u7684\u4EE3\u7801\u3002</li><li><code>sample-controller/</code>\u76EE\u5F55\u5305\u542BKubernetes\u793A\u4F8B\u63A7\u5236\u5668\u7684\u4EE3\u7801\u3002</li></ul><h3 id="staging-src-k8s-io-api" tabindex="-1"><a class="header-anchor" href="#staging-src-k8s-io-api" aria-hidden="true">#</a> staging/src/k8s.io/api/</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:/workspces/kubernetes/staging/src/k8s.io<span class="token comment"># ls api</span>
admission              authorization       coordination  flowcontrol  <span class="token function">node</span>       roundtrip_test.go
admissionregistration  autoscaling         core          go.mod       OWNERS     scheduling
apidiscovery           batch               discovery     go.sum       policy     SECURITY_CONTACTS
apiserverinternal      certificates        doc.go        imagepolicy  rbac       storage
apps                   code-of-conduct.md  events        LICENSE      README.md  testdata
authentication         CONTRIBUTING.md     extensions    networking   resource
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u529F\u80FD\uFF1A</strong></p><ul><li><code>admission/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u63A7\u5236\u5BF9\u8D44\u6E90\u7684\u8BBF\u95EE\u3002</li><li><code>admissionregistration/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u6CE8\u518C\u8D44\u6E90\u8BBF\u95EE\u63A7\u5236\u7EC4\u4EF6\u3002</li><li><code>apidiscovery/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u63CF\u8FF0Kubernetes API\u7684\u53D1\u73B0\u673A\u5236\u3002</li><li><code>apiserverinternal/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u5B9E\u73B0Kubernetes API\u670D\u52A1\u5668\u7684\u5185\u90E8\u529F\u80FD\u3002</li><li><code>apps/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u7BA1\u7406\u5E94\u7528\u7A0B\u5E8F\u8D44\u6E90\u3002</li><li><code>authentication/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u63A7\u5236\u8EAB\u4EFD\u9A8C\u8BC1\u3002</li><li><code>authorization/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u63A7\u5236\u6388\u6743\u3002</li><li><code>autoscaling/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u63A7\u5236\u8D44\u6E90\u7684\u81EA\u52A8\u6269\u5C55\u3002</li><li><code>batch/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u7BA1\u7406\u6279\u5904\u7406\u8D44\u6E90\u3002</li><li><code>certificates/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u7BA1\u7406\u8BC1\u4E66\u8D44\u6E90\u3002</li><li><code>coordination/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u7BA1\u7406\u5206\u5E03\u5F0F\u534F\u8C03\u8D44\u6E90\u3002</li><li><code>core/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u7BA1\u7406\u6838\u5FC3\u8D44\u6E90\u3002</li><li><code>rbac/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u7BA1\u7406\u89D2\u8272\u57FA\u672C\u8BBF\u95EE\u63A7\u5236(RBAC)\u8D44\u6E90\u3002</li><li><code>scheduling/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u7BA1\u7406\u8C03\u5EA6\u8D44\u6E90\u3002</li><li><code>storage/</code>\u76EE\u5F55\u5305\u542B\u4EE3\u7801\uFF0C\u7528\u4E8E\u7BA1\u7406\u5B58\u50A8\u8D44\u6E90\u3002</li></ul><p>\u9664\u4E86\u8FD9\u4E9B\u76EE\u5F55\u4E4B\u5916\uFF0C\u8FD8\u6709\u4E00\u4E9B\u6587\u4EF6\uFF0C\u5B83\u4EEC\u4E5F\u662F\u91CD\u8981\u7684\u90E8\u5206\uFF1A</p><ul><li><code>doc.go</code>\u662F\u6587\u6863\u7684\u5165\u53E3\u6587\u4EF6\u3002</li><li><code>go.mod</code>\u548C<code>go.sum</code>\u662FGo\u7684\u4F9D\u8D56\u7BA1\u7406\u6587\u4EF6\u3002</li><li><code>LICENSE</code>\u6587\u4EF6\u5305\u542BKubernetes\u4F7F\u7528\u7684\u8BB8\u53EF\u8BC1\u3002</li><li><code>OWNERS</code>\u6587\u4EF6\u5305\u542B\u8D1F\u8D23\u7EF4\u62A4\u76EE\u5F55\u7684\u4EBA\u5458\u5217\u8868\u3002</li><li><code>README.md</code>\u6587\u4EF6\u5305\u542B\u6709\u5173\u76EE\u5F55\u7684\u4FE1\u606F\u3002</li><li><code>SECURITY_CONTACTS</code>\u6587\u4EF6\u5305\u542B\u6709\u5173\u5B89\u5168\u95EE\u9898\u7684\u8054\u7CFB\u4EBA\u5217\u8868\u3002</li><li><code>testdata/</code>\u76EE\u5F55\u5305\u542B\u6D4B\u8BD5\u6570\u636E\u3002</li><li><code>code-of-conduct.md</code>\u6587\u4EF6\u5305\u542B\u6709\u5173Kubernetes\u793E\u533A\u884C\u4E3A\u51C6\u5219\u7684\u4FE1\u606F\u3002</li><li><code>CONTRIBUTING.md</code>\u6587\u4EF6\u5305\u542B\u6709\u5173\u5982\u4F55\u4E3AKubernetes\u8D21\u732E\u4EE3\u7801\u7684\u4FE1\u606F\u3002</li><li><code>roundtrip_test.go</code>\u6587\u4EF6\u5305\u542B\u7528\u4E8E\u6D4B\u8BD5\u7684\u4EE3\u7801\u3002</li></ul><p><strong>\u26A0\uFE0F \u{1F4DC} \u5BF9\u4E0A\u9762\u7684\u89E3\u91CA\uFF1A</strong></p><blockquote><p>\u6211\u4EEC\u53EF\u4EE5\u8FDB\u4E00\u6B65\u518D\u89C2\u5BDF <code>apps</code> \u76EE\u5F55\uFF0C\u8FD9\u4E2A\u540D\u79F0\u5F88\u773C\u719F\uFF0Cpkg/apis/apps/ \u76EE\u5F55\u548C staging/src/k8s.io/api/apps/ \u5B83\u4EEC\u7684\u76EE\u5F55\u7ED3\u6784\u5F88\u63A5\u8FD1\uFF0C\u8BF7\u95EE\u5B83\u4EEC\u6709\u4EC0\u4E48\u4E0D\u4E00\u6837\uFF0C\u6211\u60F3\u4E86\u89E3\u5B83\u4EEC\u7684\u5BF9\u6BD4\u800C\u52A0\u6DF1\u5BF9\u5B83\u4EEC\u7684\u7406\u89E3</p></blockquote><h2 id="pkg-apis-apps-\u76EE\u5F55\u548C-staging-src-k8s-io-api-apps-\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#pkg-apis-apps-\u76EE\u5F55\u548C-staging-src-k8s-io-api-apps-\u76EE\u5F55" aria-hidden="true">#</a> pkg/apis/apps/ \u76EE\u5F55\u548C staging/src/k8s.io/api/apps/\u76EE\u5F55</h2><p>pkg/apis/\u548Cstaging/src/k8s.io/api/\u76EE\u5F55\u90FD\u662FKubernetes\u6E90\u7801\u7684\u4E00\u90E8\u5206\u3002\u5B83\u4EEC\u4E4B\u95F4\u7684\u4E3B\u8981\u533A\u522B\u662F\uFF0Cpkg/apis/\u76EE\u5F55\u4E0B\u7684\u4EE3\u7801\u66F4\u52A0\u62BD\u8C61\uFF0C\u901A\u5E38\u662F\u7531staging/src/k8s.io/api/\u76EE\u5F55\u4E0B\u7684\u4EE3\u7801\u5B9E\u73B0\u7684\u3002</p><p>\u5728Kubernetes\u4E2D\uFF0Cpkg/apis/\u76EE\u5F55\u4E0B\u7684\u4EE3\u7801\u5B9A\u4E49\u4E86API\u8D44\u6E90\u7684\u62BD\u8C61\u63A5\u53E3\u3002\u8FD9\u4E9B\u63A5\u53E3\u63CF\u8FF0\u4E86\u8D44\u6E90\u7684\u7C7B\u578B\u3001\u5B57\u6BB5\u548C\u64CD\u4F5C\uFF0C\u4F46\u6CA1\u6709\u5B9E\u73B0\u5177\u4F53\u7684\u903B\u8F91\u3002\u76F8\u53CD\uFF0Cstaging/src/k8s.io/api/\u76EE\u5F55\u4E0B\u7684\u4EE3\u7801\u5B9E\u73B0\u4E86\u8FD9\u4E9B\u63A5\u53E3\u3002\u8FD9\u4E9B\u5B9E\u73B0\u63D0\u4F9B\u4E86\u8D44\u6E90\u7684\u5177\u4F53\u529F\u80FD\uFF0C\u5E76\u5C06\u5176\u4E0EKubernetes\u7CFB\u7EDF\u7684\u5176\u4ED6\u90E8\u5206\u96C6\u6210\u5728\u4E00\u8D77\u3002</p><p>\u4F8B\u5982\uFF0Cpkg/apis/apps/\u76EE\u5F55\u4E0B\u5B9A\u4E49\u4E86\u4E00\u7EC4\u63A5\u53E3\uFF0C\u7528\u4E8E\u8868\u793A\u5E94\u7528\u7A0B\u5E8F\u8D44\u6E90\u3002 staging/src/k8s.io/api/apps/\u76EE\u5F55\u4E0B\u7684\u4EE3\u7801\u5B9E\u73B0\u4E86\u8FD9\u4E9B\u63A5\u53E3\uFF0C\u5E76\u63D0\u4F9B\u4E86\u5E94\u7528\u7A0B\u5E8F\u8D44\u6E90\u7684\u5177\u4F53\u529F\u80FD\u3002</p><p><strong>\u4E3A\u4E86\u8DDF\u6E05\u695A\u7684\u4E86\u89E3\uFF0C\u6211\u622A\u53D6\u4E86\u5B83\u4EEC\u7684\u76EE\u5F55\u7ED3\u6784\uFF1A</strong></p><p><img src="http://sm.nsddd.top/sm202301071411550.png" alt="image-20230107141113159"></p><p><strong>\u603B\u7ED3\uFF1A</strong></p><ol><li>pkg/apis/apps/\u76EE\u5F55\u548Cstaging/src/k8s.io/api/apps/\u76EE\u5F55\u90FD\u662FKubernetes\u6E90\u7801\u7684\u4E00\u90E8\u5206\u3002\u5B83\u4EEC\u90FD\u662F\u7528\u4E8E\u7BA1\u7406\u5E94\u7528\u7A0B\u5E8F\u8D44\u6E90\u7684\u4EE3\u7801\u3002</li><li>pkg/apis/apps/\u76EE\u5F55\u4E2D\u7684\u4EE3\u7801\u5B9A\u4E49\u4E86\u62BD\u8C61\u7684API\u63A5\u53E3\uFF0C\u7528\u4E8E\u63CF\u8FF0\u5E94\u7528\u7A0B\u5E8F\u8D44\u6E90\u7684\u7C7B\u578B\u3001\u5B57\u6BB5\u548C\u64CD\u4F5C\u3002\u5B83\u5E76\u6CA1\u6709\u63D0\u4F9B\u8D44\u6E90\u7684\u5177\u4F53\u529F\u80FD\u3002</li><li>staging/src/k8s.io/api/apps/\u76EE\u5F55\u4E2D\u7684\u4EE3\u7801\u5B9E\u73B0\u4E86pkg/apis/apps/\u76EE\u5F55\u4E2D\u7684\u63A5\u53E3\u3002\u5B83\u63D0\u4F9B\u4E86\u5E94\u7528\u7A0B\u5E8F\u8D44\u6E90\u7684\u5177\u4F53\u529F\u80FD\uFF0C\u5E76\u5C06\u5176\u4E0EKubernetes\u7CFB\u7EDF\u7684\u5176\u4ED6\u90E8\u5206\u96C6\u6210\u5728\u4E00\u8D77\u3002</li><li>\u603B\u7684\u6765\u8BF4\uFF0Cpkg/apis/\u76EE\u5F55\u4E2D\u7684\u4EE3\u7801\u662FKubernetes\u4E2DAPI\u8D44\u6E90\u7684\u62BD\u8C61\u63A5\u53E3\uFF0C\u800Cstaging/src/k8s.io/api/\u76EE\u5F55\u4E2D\u7684\u4EE3\u7801\u5219\u662F\u8FD9\u4E9B\u63A5\u53E3\u7684\u5177\u4F53\u5B9E\u73B0\u3002</li></ol><h2 id="cmd" tabindex="-1"><a class="header-anchor" href="#cmd" aria-hidden="true">#</a> cmd</h2><p><strong>cmd \u7B97\u662F \u5165\u53E3\uFF0C\u4E5F\u662F\u547D\u4EE4\u884C\u7684\u5B9A\u4E49\u5730\u65B9\u3002</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 cmd</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p><code>kube-apiserver</code> \u4E2D\u6709 <code>apiserver.go</code> \u6587\u4EF6\uFF0C\u5C31\u662F <code>apiserver</code> \u542F\u52A8\u5165\u53E3</p></div>`,30),qe=a(`<p>cmd \u6709\u5F88\u591A\u7684\u5B50\u76EE\u5F55\uFF0C\u4E0D\u540C\u7684\u5B50\u76EE\u5F55\u90FD\u5BF9\u5E94\u7684\u63A5\u53E3\uFF0C\u6BD4\u5982\u4E0A\u9762\u7684 <code>API Server</code></p><p>\u6211\u4EEC\u751A\u81F3\u53EF\u4EE5\u76F4\u63A5\u5728\u91CC\u9762 <code>go build</code> \uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>\u276F <span class="token builtin class-name">cd</span> cmd/kube-apiserver<span class="token punctuation">;</span><span class="token function">ls</span>
apiserver.go  app  OWNERS
\u276F go build apiserver.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u4E0D\u8FC7\u4E00\u822C\u4F7F\u7528 \u529F\u80FD\u5F3A\u5927 \u7684 Makefile \uFF0C\u800C\u4E14Makefile\u652F\u6301\u4EA4\u53C9\u7F16\u8BD1\u3002</strong></p><p>Kubernetes \u662F\u5F88\u591A\u7EC4\u4EF6\u7684 \u4E8C\u8FDB\u5236 \u76F8\u4E92\u914D\u5408 \u90E8\u7F72\u8D77\u6765\u7684\u3002</p><h3 id="kube-apiserver" tabindex="-1"><a class="header-anchor" href="#kube-apiserver" aria-hidden="true">#</a> kube-apiserver</h3><p>\u4EE5 kube-apiserver cmd \u76EE\u5F55\u4E3A\u4F8B\uFF1A</p><p><img src="http://sm.nsddd.top/sm202303031350297.png" alt="image-20230303135004177"></p><p>\u{1F4DC} \u5BF9\u4E0A\u9762\u7684\u89E3\u91CA\uFF1A</p><ul><li><code>options</code> \uFF1A \u4E00\u822C\u91CC\u9762\u7684 options \u662F\u89E3\u6790 \u5165\u53C2\uFF0C\u5E76\u4E14\u8FDB\u884C\u5165\u53C2\u6821\u9A8C</li><li>\u91CC\u9762\u7684\u6838\u5FC3\u90FD\u662F\u8C03\u5230 <code>pkg/*</code> \u4E0B\u9762\u7684\uFF0C\u6BD4\u5982\u8BF4 api\u3001apis\u5BF9\u8C61</li></ul><h2 id="build" tabindex="-1"><a class="header-anchor" href="#build" aria-hidden="true">#</a> build</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/go/src/k8s.io/kubernetes<span class="token comment"># tree -L 1 build</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="test" tabindex="-1"><a class="header-anchor" href="#test" aria-hidden="true">#</a> test</h2><p>e2e \u6D4B\u8BD5\u4EE3\u7801</p><h2 id="kubernetes-\u7684-etc-\u76EE\u5F55" tabindex="-1"><a class="header-anchor" href="#kubernetes-\u7684-etc-\u76EE\u5F55" aria-hidden="true">#</a> Kubernetes \u7684 ETC \u76EE\u5F55</h2><p>Kubernetes \u662F\u4E00\u4E2A\u5E7F\u6CDB\u4F7F\u7528\u7684\u5BB9\u5668\u7F16\u6392\u5E73\u53F0\uFF0C\u4E0B\u9762\u662F Kubernetes \u7684\u76EE\u5F55\u548C\u6587\u4EF6\uFF0C\u5305\u62EC\u4E86\u5E73\u53F0\u7684\u6838\u5FC3\u7EC4\u4EF6\u548C\u8BC1\u4E66\u7B49\u76F8\u5173\u6587\u4EF6\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>\u251C\u2500\u2500 audit-policy.yml
\u251C\u2500\u2500 controller-manager.conf
\u251C\u2500\u2500 kubeadm.yaml
\u251C\u2500\u2500 kubelet.conf
\u251C\u2500\u2500 manifests
\u2502   \u251C\u2500\u2500 etcd.yaml
\u2502   \u251C\u2500\u2500 kube-apiserver.yaml
\u2502   \u251C\u2500\u2500 kube-controller-manager.yaml
\u2502   \u2514\u2500\u2500 kube-scheduler.yaml
\u251C\u2500\u2500 pki
\u2502   \u251C\u2500\u2500 apiserver.crt
\u2502   \u251C\u2500\u2500 apiserver-etcd-client.crt
\u2502   \u251C\u2500\u2500 apiserver-etcd-client.key
\u2502   \u251C\u2500\u2500 apiserver.key
\u2502   \u251C\u2500\u2500 apiserver-kubelet-client.crt
\u2502   \u251C\u2500\u2500 apiserver-kubelet-client.key
\u2502   \u251C\u2500\u2500 ca.crt
\u2502   \u251C\u2500\u2500 ca.key
\u2502   \u251C\u2500\u2500 etcd
\u2502   \u2502   \u251C\u2500\u2500 ca.crt
\u2502   \u2502   \u251C\u2500\u2500 ca.key
\u2502   \u2502   \u251C\u2500\u2500 healthcheck-client.crt
\u2502   \u2502   \u251C\u2500\u2500 healthcheck-client.key
\u2502   \u2502   \u251C\u2500\u2500 peer.crt
\u2502   \u2502   \u251C\u2500\u2500 peer.key
\u2502   \u2502   \u251C\u2500\u2500 server.crt
\u2502   \u2502   \u2514\u2500\u2500 server.key
\u2502   \u251C\u2500\u2500 front-proxy-ca.crt
\u2502   \u251C\u2500\u2500 front-proxy-ca.key
\u2502   \u251C\u2500\u2500 front-proxy-client.crt
\u2502   \u251C\u2500\u2500 front-proxy-client.key
\u2502   \u251C\u2500\u2500 sa.key
\u2502   \u2514\u2500\u2500 sa.pub
\u2514\u2500\u2500 scheduler.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="audit-policy-yml" tabindex="-1"><a class="header-anchor" href="#audit-policy-yml" aria-hidden="true">#</a> audit-policy.yml</h3><p><code>audit-policy.yml</code> \u662F Kubernetes \u7684\u5BA1\u6838\u7B56\u7565\u6587\u4EF6\uFF0C\u5B83\u89C4\u5B9A\u4E86\u54EA\u4E9B\u4E8B\u4EF6\u9700\u8981\u88AB\u8BB0\u5F55\uFF0C\u4EE5\u53CA\u8BB0\u5F55\u7684\u5185\u5BB9\u3002</p><h3 id="controller-manager-conf" tabindex="-1"><a class="header-anchor" href="#controller-manager-conf" aria-hidden="true">#</a> controller-manager.conf</h3><p><code>controller-manager.conf</code> \u662F Kubernetes \u7684\u63A7\u5236\u5668\u7BA1\u7406\u5668\u7684\u914D\u7F6E\u6587\u4EF6\u3002</p><h3 id="kubeadm-yaml" tabindex="-1"><a class="header-anchor" href="#kubeadm-yaml" aria-hidden="true">#</a> kubeadm.yaml</h3><p><code>kubeadm.yaml</code> \u662F Kubernetes \u7684\u521D\u59CB\u5316\u914D\u7F6E\u6587\u4EF6\uFF0C\u5305\u542B\u4E86\u521D\u59CB\u5316\u96C6\u7FA4\u6240\u9700\u8981\u7684\u4FE1\u606F\u3002</p><h3 id="kubelet-conf" tabindex="-1"><a class="header-anchor" href="#kubelet-conf" aria-hidden="true">#</a> kubelet.conf</h3><p><code>kubelet.conf</code> \u662F Kubernetes \u7684 kubelet \u7EC4\u4EF6\u7684\u914D\u7F6E\u6587\u4EF6\u3002</p><h3 id="manifests" tabindex="-1"><a class="header-anchor" href="#manifests" aria-hidden="true">#</a> manifests</h3><p><code>manifests</code> \u76EE\u5F55\u5305\u542B Kubernetes \u7684\u6838\u5FC3\u7EC4\u4EF6\u7684\u914D\u7F6E\u6587\u4EF6\uFF0C\u5B83\u4EEC\u662F\uFF1A</p><ul><li><code>etcd.yaml</code>: etcd \u662F Kubernetes \u96C6\u7FA4\u7684\u6570\u636E\u5E93\uFF0C\u5B58\u50A8\u4E86\u96C6\u7FA4\u7684\u72B6\u6001\u4FE1\u606F\u3002</li><li><code>kube-apiserver.yaml</code>: kube-apiserver \u662F Kubernetes \u7684 API \u670D\u52A1\u5668\uFF0C\u8D1F\u8D23\u5904\u7406 API \u8BF7\u6C42\u3002</li><li><code>kube-controller-manager.yaml</code>: kube-controller-manager \u662F Kubernetes \u7684\u63A7\u5236\u5668\u7BA1\u7406\u5668\uFF0C\u8D1F\u8D23\u7BA1\u7406\u96C6\u7FA4\u7684\u5404\u79CD\u63A7\u5236\u5668\u3002</li><li><code>kube-scheduler.yaml</code>: kube-scheduler \u662F Kubernetes \u7684\u8C03\u5EA6\u5668\uFF0C\u8D1F\u8D23\u5C06 Pod \u5206\u914D\u5230\u5408\u9002\u7684\u8282\u70B9\u4E0A\u8FD0\u884C\u3002</li></ul><h3 id="pki" tabindex="-1"><a class="header-anchor" href="#pki" aria-hidden="true">#</a> pki</h3><p><code>pki</code> \u76EE\u5F55\u5305\u542B Kubernetes \u7684\u8BC1\u4E66\u548C\u5BC6\u94A5\u6587\u4EF6\uFF0C\u5B83\u4EEC\u662F\uFF1A</p><ul><li><code>apiserver.crt</code>: kube-apiserver \u7684\u8BC1\u4E66\u3002</li><li><code>apiserver-etcd-client.crt</code> \u548C <code>apiserver-etcd-client.key</code>: kube-apiserver \u548C etcd \u4E4B\u95F4\u901A\u4FE1\u7684\u8BC1\u4E66\u548C\u5BC6\u94A5\u3002</li><li><code>apiserver.key</code>: kube-apiserver \u7684\u79C1\u94A5\u3002</li><li><code>apiserver-kubelet-client.crt</code> \u548C <code>apiserver-kubelet-client.key</code>: kube-apiserver \u548C kubelet \u4E4B\u95F4\u901A\u4FE1\u7684\u8BC1\u4E66\u548C\u5BC6\u94A5\u3002</li><li><code>ca.crt</code> \u548C <code>ca.key</code>: Kubernetes \u7684\u6839\u8BC1\u4E66\u548C\u5BC6\u94A5\u3002</li><li><code>etcd</code> \u76EE\u5F55\uFF1Aetcd \u7684\u8BC1\u4E66\u548C\u5BC6\u94A5\u6587\u4EF6\u3002</li><li><code>front-proxy-ca.crt</code> \u548C <code>front-proxy-ca.key</code>: \u524D\u7F6E\u4EE3\u7406\u7684\u8BC1\u4E66\u548C\u5BC6\u94A5\u3002</li><li><code>front-proxy-client.crt</code> \u548C <code>front-proxy-client.key</code>: \u524D\u7F6E\u4EE3\u7406\u548C kube-apiserver \u4E4B\u95F4\u901A\u4FE1\u7684\u8BC1\u4E66\u548C\u5BC6\u94A5\u3002</li><li><code>sa.key</code> \u548C <code>sa.pub</code>: Kubernetes \u7684 Service Account \u7684\u8BC1\u4E66\u548C\u5BC6\u94A5\u3002</li></ul><h3 id="scheduler-conf" tabindex="-1"><a class="header-anchor" href="#scheduler-conf" aria-hidden="true">#</a> scheduler.conf</h3><p><code>scheduler.conf</code> \u662F Kubernetes \u7684\u8C03\u5EA6\u5668\u7684\u914D\u7F6E\u6587\u4EF6\u3002</p><h3 id="\u8865\u5145" tabindex="-1"><a class="header-anchor" href="#\u8865\u5145" aria-hidden="true">#</a> \u8865\u5145</h3><p>\u8FD9\u91CC\u53EF\u4EE5\u5728 \u8865\u5145\u90E8\u5206 sealer \u7684\u5B9E\u73B0\u5B9E\u73B0\uFF1A</p><details class="custom-container details"><summary>\u5C55\u5F00\u5982\u4E0B\uFF1A</summary><p>SaveAll\u51FD\u6570\u7528\u4E8E\u5C06\u6240\u6709\u914D\u7F6E\u4FE1\u606F\u4FDD\u5B58\u5230\u6587\u4EF6\u4E2D\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>func <span class="token punctuation">(</span>c *ClusterFile<span class="token punctuation">)</span> SaveAll<span class="token punctuation">(</span>opts SaveOptions<span class="token punctuation">)</span> error <span class="token punctuation">{</span>
	var <span class="token punctuation">(</span>
		clusterfileBytes <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span>byte
		config           <span class="token punctuation">[</span><span class="token punctuation">]</span>byte
		plugin           <span class="token punctuation">[</span><span class="token punctuation">]</span>byte
	<span class="token punctuation">)</span>
	fileName :<span class="token operator">=</span> common.GetDefaultClusterfile<span class="token punctuation">(</span><span class="token punctuation">)</span>
	err :<span class="token operator">=</span> os.MkdirAll<span class="token punctuation">(</span>filepath.Dir<span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>, os.ModePerm<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> fmt.Errorf<span class="token punctuation">(</span><span class="token string">&quot;failed to mkdir %s: %v&quot;</span>, fileName, err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	cluster, err :<span class="token operator">=</span> yaml.Marshal<span class="token punctuation">(</span>c.cluster<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> err
	<span class="token punctuation">}</span>
	
	clusterfileBytes <span class="token operator">=</span> append<span class="token punctuation">(</span>clusterfileBytes, cluster<span class="token punctuation">)</span>

	<span class="token keyword">if</span> len<span class="token punctuation">(</span>c.configs<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> _, cg :<span class="token operator">=</span> range c.configs <span class="token punctuation">{</span>
			config, err <span class="token operator">=</span> yaml.Marshal<span class="token punctuation">(</span>cg<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
				<span class="token builtin class-name">return</span> err
			<span class="token punctuation">}</span>
			clusterfileBytes <span class="token operator">=</span> append<span class="token punctuation">(</span>clusterfileBytes, config<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> len<span class="token punctuation">(</span>c.plugins<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">for</span> _, p :<span class="token operator">=</span> range c.plugins <span class="token punctuation">{</span>
			plugin, err <span class="token operator">=</span> yaml.Marshal<span class="token punctuation">(</span>p<span class="token punctuation">)</span>
			<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
				<span class="token builtin class-name">return</span> err
			<span class="token punctuation">}</span>
			clusterfileBytes <span class="token operator">=</span> append<span class="token punctuation">(</span>clusterfileBytes, plugin<span class="token punctuation">)</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> len<span class="token punctuation">(</span>c.kubeadmConfig.InitConfiguration.TypeMeta.Kind<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		initConfiguration, err :<span class="token operator">=</span> yaml.Marshal<span class="token punctuation">(</span>c.kubeadmConfig.InitConfiguration<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
			<span class="token builtin class-name">return</span> err
		<span class="token punctuation">}</span>
		clusterfileBytes <span class="token operator">=</span> append<span class="token punctuation">(</span>clusterfileBytes, initConfiguration<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> len<span class="token punctuation">(</span>c.kubeadmConfig.JoinConfiguration.TypeMeta.Kind<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		joinConfiguration, err :<span class="token operator">=</span> yaml.Marshal<span class="token punctuation">(</span>c.kubeadmConfig.JoinConfiguration<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
			<span class="token builtin class-name">return</span> err
		<span class="token punctuation">}</span>
		clusterfileBytes <span class="token operator">=</span> append<span class="token punctuation">(</span>clusterfileBytes, joinConfiguration<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">if</span> len<span class="token punctuation">(</span>c.kubeadmConfig.ClusterConfiguration.TypeMeta.Kind<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		clusterConfiguration, err :<span class="token operator">=</span> yaml.Marshal<span class="token punctuation">(</span>c.kubeadmConfig.ClusterConfiguration<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
			<span class="token builtin class-name">return</span> err
		<span class="token punctuation">}</span>
		clusterfileBytes <span class="token operator">=</span> append<span class="token punctuation">(</span>clusterfileBytes, clusterConfiguration<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> len<span class="token punctuation">(</span>c.kubeadmConfig.KubeletConfiguration.TypeMeta.Kind<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		kubeletConfiguration, err :<span class="token operator">=</span> yaml.Marshal<span class="token punctuation">(</span>c.kubeadmConfig.KubeletConfiguration<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
			<span class="token builtin class-name">return</span> err
		<span class="token punctuation">}</span>
		clusterfileBytes <span class="token operator">=</span> append<span class="token punctuation">(</span>clusterfileBytes, kubeletConfiguration<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> len<span class="token punctuation">(</span>c.kubeadmConfig.KubeProxyConfiguration.TypeMeta.Kind<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		kubeProxyConfiguration, err :<span class="token operator">=</span> yaml.Marshal<span class="token punctuation">(</span>c.kubeadmConfig.KubeProxyConfiguration<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
			<span class="token builtin class-name">return</span> err
		<span class="token punctuation">}</span>
		clusterfileBytes <span class="token operator">=</span> append<span class="token punctuation">(</span>clusterfileBytes, kubeProxyConfiguration<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	content :<span class="token operator">=</span> bytes.Join<span class="token punctuation">(</span>clusterfileBytes, <span class="token punctuation">[</span><span class="token punctuation">]</span>byte<span class="token punctuation">(</span><span class="token string">&quot;---<span class="token entity" title="\\n">\\n</span>&quot;</span><span class="token punctuation">))</span>
	err <span class="token operator">=</span> utilsos.NewCommonWriter<span class="token punctuation">(</span>fileName<span class="token punctuation">)</span>.WriteFile<span class="token punctuation">(</span>content<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> nil <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> fmt.Errorf<span class="token punctuation">(</span><span class="token string">&quot;failed to save clusterfile to disk:%v&quot;</span>, err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">if</span> opts.CommitToCluster <span class="token punctuation">{</span>
		<span class="token builtin class-name">return</span> saveToCluster<span class="token punctuation">(</span>content, opts.ConfPath<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token builtin class-name">return</span> nil
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6709\u610F\u601D\u7684\u662F\uFF1A\u90E8\u5206\u7684 Kubernetes \u7684\u4FDD\u5B58\u4E2D\uFF0Cconfig \u548C plug \u662F\u4EE5\u4E00\u7EF4\u5207\u7247\u7684\u5F62\u5F0F\u5B58\u50A8\u7684\uFF0C\u800CclusterfileBytes \u7528\u6765\u6536\u96C6 \u6240\u6709\u7684 \u5185\u5BB9\uFF0C\u4F7F\u7528\u7684\u662F\u4E8C\u7EF4\u6570\u7EC4\u7684\u65B9\u5F0F\u5B58\u50A8\u7684\uFF0CKubeadmConfig \u662F\u968F\u4FBF\u5B58\u50A8\u7684\u3002\u83B7\u53D6\u5230 config \u548C plug \u4E5F\u53EA\u662F \u5224\u65AD\u662F\u5426\u4E3A 0</p></details><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="31.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="33.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,45),Ge=i("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),je={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},Je=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),Ue=i(")"),Ve=i("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),Fe={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},He=i("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function Ye(Qe,Xe){const s=l("ExternalLinkIcon"),r=l("RouterLink");return d(),t("div",null,[e("ul",null,[e("li",null,[e("a",p,[v,n(s)])])]),b,m,k,e("blockquote",null,[e("p",null,[g,e("a",h,[f,n(s)])])]),_,e("ul",null,[e("li",null,[e("a",y,[A,n(s)])])]),I,e("div",P,[x,K,e("ul",null,[e("li",null,[e("a",C,[S,n(s)])])]),R,e("p",null,[E,e("a",w,[N,n(s)]),O]),B,W,e("ul",null,[e("li",null,[e("a",M,[D,n(s)])]),e("li",null,[e("a",L,[z,n(s)])]),e("li",null,[e("a",T,[q,n(s)])]),e("li",null,[e("a",G,[j,n(s)])]),e("li",null,[e("a",J,[U,n(s)])]),e("li",null,[e("a",V,[F,n(s)])]),e("li",null,[e("a",H,[Y,n(s)])]),e("li",null,[e("a",Q,[X,n(s)])]),e("li",null,[e("a",Z,[$,n(s)])]),e("li",null,[e("a",ee,[ne,n(s)])]),e("li",null,[e("a",se,[ie,n(s)])]),e("li",null,[e("a",ae,[le,n(s)])]),e("li",null,[e("a",re,[oe,n(s)])]),e("li",null,[e("a",de,[te,n(s)])]),e("li",null,[e("a",ce,[ue,n(s)])]),e("li",null,[e("a",pe,[ve,n(s)])]),e("li",null,[e("a",be,[me,n(s)])]),e("li",null,[e("a",ke,[ge,n(s)])]),e("li",null,[e("a",he,[fe,n(s)])]),e("li",null,[e("a",_e,[ye,n(s)])]),e("li",null,[e("a",Ae,[Ie,n(s)])]),e("li",null,[e("a",Pe,[xe,n(s)])]),e("li",null,[e("a",Ke,[Ce,n(s)])]),e("li",null,[e("a",Se,[Re,n(s)])]),e("li",null,[e("a",Ee,[we,n(s)])]),e("li",null,[e("a",Ne,[Oe,n(s)])]),e("li",null,[e("a",Be,[We,n(s)])]),e("li",null,[e("a",Me,[De,n(s)])]),e("li",null,[e("a",Le,[ze,n(s)])])]),Te]),qe,e("ul",null,[e("li",null,[e("p",null,[n(r,{to:"/"},{default:c(()=>[Ge]),_:1})])]),e("li",null,[e("p",null,[e("a",je,[Je,n(s)]),Ue])]),e("li",null,[e("p",null,[Ve,e("a",Fe,[He,n(s)])])])])])}const $e=o(u,[["render",Ye],["__file","32.html.vue"]]);export{$e as default};
