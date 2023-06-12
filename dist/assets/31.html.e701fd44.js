import{_ as a,r as s,o as l,c as d,a as e,b as o,w as c,e as t,d as n}from"./app.155ac445.js";const h={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},_=t("author"),p=e("h1",{id:"\u7B2C31\u8282-horizon",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C31\u8282-horizon","aria-hidden":"true"},"#"),t(" \u7B2C31\u8282 horizon")],-1),b=e("div",null,[e("a",{href:"30.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"32.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),m=e("br",null,null,-1),f=t("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),g={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},k=t("sealos"),y=t("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),v={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},w=t("k8s,docker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),z=t("\u3002Myblog:"),x={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},C=t("http://nsddd.top"),H=n('<hr><p>[TOC]</p><h2 id="horizon" tabindex="-1"><a class="header-anchor" href="#horizon" aria-hidden="true">#</a> Horizon</h2><p><strong>describe\uFF1AProduction-Grade GitOps CD PlatForm For CloudNative Applications, MiddleWares, etc.</strong></p><p>Horizon is a cloud-native application Continues Delivery (CD) platform. Platform team can let the developers deploy their code and MiddleWares to cloud and kubernetes easily, efficiency and with best practice. Horizon is inspired by ArgoCD and AWS Proton.</p><h2 id="why-horizon" tabindex="-1"><a class="header-anchor" href="#why-horizon" aria-hidden="true">#</a> Why Horizon</h2><p><strong>standardized</strong> : kubernetes is flexible and powerful, but it is complex. it&#39;s hard to let all the developers have a comprehensive understanding of kubernetes and practice best practice. so horizon introduce a template system to make the best practice under control, and also provide efficient delivery. For example, Platform Team can provide basic spec of resource tiny(0.5core, 512MB)\u3001small(1core, 1GB), middle(2core, 4GB) etc. by default, not for the developer to select limit or request resource on common case.</p><p><strong>security and reliable</strong> \uFF1Asecurity and reliable is always a challenge. In Horizon, Horizon make every change of application durable, reversible and auditable. It&#39;s done with our best practice of GitOps. And Horizon introduce rbac&amp;member system to let you have best practice on fine-grained permission control.</p><p><strong>multi-cloud</strong> : Horizon provide a consistent application platform to manage multi-cloud, hybrid cloud.</p>',9),P=e("strong",null,"infrastructure agnostic",-1),G=t(" \uFF1Ahorizon doesn't limit the kind of workload. the basic kubernetes workloads and self defined "),B={href:"https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/",target:"_blank",rel:"noopener noreferrer"},E=t("CR"),M=t(" are all supported."),q=e("p",null,[e("strong",null,"efficiency"),t(" \uFF1Aplatform team can quickly make an end to end best practice workload delivery based on Horizon template.")],-1),I=e("strong",null,"Production-Grade",-1),A=t("\uFF1AWithin "),R={href:"https://music.163.com/",target:"_blank",rel:"noopener noreferrer"},T=t("NetEase Cloud Music"),W=t(" about thousands of developer use horizon to deploy workload everyday."),D=n('<h2 id="features" tabindex="-1"><a class="header-anchor" href="#features" aria-hidden="true">#</a> Features</h2><p>In Horizon, Git is Used as the only &quot;The Source Of Truth&quot;, Horizon stores template and all values in Git repository. Every change are durable, reversible and auditable, Including code, image, environment variables, resource spec, etc.</p><p>Horizon Template is based on helm and jsonschema. The Platform Team can make the basic practice (including security, affinity, priority, resource, etc.) by default, and provide user a simple and uniform interface which is defined by jsonschema files. jsonschema is used for provide a user friend HTML form on the Horizon Based on react-jsonschema-form. It&#39;s highly Scalable and flexible to make your own best practice based on the simple template system.</p><h2 id="rpac-member" tabindex="-1"><a class="header-anchor" href="#rpac-member" aria-hidden="true">#</a> RPAC &amp; Member</h2><p>Horizon Provide a RBAC &amp; Member system Just like Gitlab. You can easily define your Own PlatForm Member and Role(Just like Kubernetes role and rolebinding). In our Practice, we Provide Role like PE, Owner, Maintainer, Guest. the Owner is binding with the Read(list pods, read all properties, etc.)/Write(deploy, builddeploy, restart, release, delete etc.) Permission, the guest just have the read permission.</p><h2 id="architecture" tabindex="-1"><a class="header-anchor" href="#architecture" aria-hidden="true">#</a> Architecture</h2><p><img src="http://sm.nsddd.top/sm202303012213841.png" alt="image-20230301221333656"></p><h2 id="how-to-install" tabindex="-1"><a class="header-anchor" href="#how-to-install" aria-hidden="true">#</a> How to install</h2><p>Horizon is built entirely on Kubernetes and has been fully tested on its v1.19.3 ~ v1.24.7 release.</p><p>We are assuming you have a basic understanding of what the Kubernetes is and how it runs.</p>',10),K=t("You can use "),N={href:"https://kind.sigs.k8s.io/docs/user/quick-start/",target:"_blank",rel:"noopener noreferrer"},O=t("Kind"),F=t(" to run a local Kubernetes cluster quickly. "),j={href:"https://minikube.sigs.k8s.io/docs/",target:"_blank",rel:"noopener noreferrer"},L=t("Minikube"),S=t(" is another highly useful tool to set up a local Kubernetes cluster."),U=n('<blockquote><p>The following table lists the minimum and recommended hardware configurations for deploying Horizon.</p><table><thead><tr><th>Resource</th><th>Minimum</th><th>Recommended</th></tr></thead><tbody><tr><td>CPU</td><td>4 CPU</td><td>8 CPU</td></tr><tr><td>Mem</td><td>8 GB</td><td>16 GB</td></tr><tr><td>Disk</td><td>40 GB</td><td>80 GB</td></tr></tbody></table></blockquote><h2 id="requirements" tabindex="-1"><a class="header-anchor" href="#requirements" aria-hidden="true">#</a> Requirements</h2>',2),V={href:"https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/",target:"_blank",rel:"noopener noreferrer"},Y=t("Kubernetes"),J=t(" cluster version 1.19.3 ~ v1.24.7."),Q=t("Installed "),X={href:"https://kubernetes.io/docs/tasks/tools/install-kubectl/",target:"_blank",rel:"noopener noreferrer"},Z=t("kubectl"),$=t(" command-line tool."),ee=t("Have a "),te={href:"https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/",target:"_blank",rel:"noopener noreferrer"},oe=t("kubeconfig"),re=t(" file (default location is "),ne=e("code",null,"~/.kube/config",-1),se=t(")."),ie=t("Installed "),ae={href:"https://helm.sh/",target:"_blank",rel:"noopener noreferrer"},le=t("helm"),de=t(" command-line tool."),ce=t("Installed "),he={href:"https://github.com/kubernetes/ingress-nginx",target:"_blank",rel:"noopener noreferrer"},ue=t("ingress-nginx"),_e=t(" or any other ingress controller."),pe=n('<h2 id="installation-process" tabindex="-1"><a class="header-anchor" href="#installation-process" aria-hidden="true">#</a> Installation Process</h2><p>We use <code>helm</code> to organize Horizon&#39;s whole dependencies, which means you can launch a whole system by Helm.</p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="30.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="32.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>',4),be=t("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),me={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},fe=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),ge=t(")"),ke=t("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),ye={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},ve=t("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function we(ze,xe){const r=s("ExternalLinkIcon"),i=s("RouterLink");return l(),d("div",null,[e("ul",null,[e("li",null,[e("a",u,[_,o(r)])])]),p,b,m,e("blockquote",null,[e("p",null,[f,e("a",g,[k,o(r)]),y,e("a",v,[w,o(r)]),z,e("a",x,[C,o(r)])])]),H,e("p",null,[P,G,e("a",B,[E,o(r)]),M]),q,e("p",null,[I,A,e("a",R,[T,o(r)]),W]),D,e("p",null,[K,e("a",N,[O,o(r)]),F,e("a",j,[L,o(r)]),S]),U,e("ol",null,[e("li",null,[e("a",V,[Y,o(r)]),J]),e("li",null,[Q,e("a",X,[Z,o(r)]),$]),e("li",null,[ee,e("a",te,[oe,o(r)]),re,ne,se]),e("li",null,[ie,e("a",ae,[le,o(r)]),de]),e("li",null,[ce,e("a",he,[ue,o(r)]),_e])]),pe,e("ul",null,[e("li",null,[e("p",null,[o(i,{to:"/"},{default:c(()=>[be]),_:1})])]),e("li",null,[e("p",null,[e("a",me,[fe,o(r)]),ge])]),e("li",null,[e("p",null,[ke,e("a",ye,[ve,o(r)])])])])])}const He=a(h,[["render",we],["__file","31.html.vue"]]);export{He as default};