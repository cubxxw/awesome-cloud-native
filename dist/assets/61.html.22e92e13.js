import{_ as o,r as d,o as n,c as s,a as e,b as l,w as h,e as t,d as a}from"./app.ee8200d6.js";const c={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},p=t("author"),b=e("h1",{id:"\u7B2C61\u8282-\u8282\u70B9\u8D44\u6E90\u7BA1\u7406\u3001\u5F02\u5E38\u68C0\u6D4B\u4EE5\u53CA\u5E38\u89C1\u95EE\u9898\u6392\u67E5",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C61\u8282-\u8282\u70B9\u8D44\u6E90\u7BA1\u7406\u3001\u5F02\u5E38\u68C0\u6D4B\u4EE5\u53CA\u5E38\u89C1\u95EE\u9898\u6392\u67E5","aria-hidden":"true"},"#"),t(" \u7B2C61\u8282 \u8282\u70B9\u8D44\u6E90\u7BA1\u7406\u3001\u5F02\u5E38\u68C0\u6D4B\u4EE5\u53CA\u5E38\u89C1\u95EE\u9898\u6392\u67E5")],-1),m=e("div",null,[e("a",{href:"60.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"62.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),_=e("br",null,null,-1),f=t("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),k={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},P=t("http://nsddd.top"),v=a('<hr><p>[TOC]</p><h2 id="numa-node" tabindex="-1"><a class="header-anchor" href="#numa-node" aria-hidden="true">#</a> NUMA Node</h2><p>Non-Uniform Memory Access \u662F\u4E00\u79CD\u5185\u5B58\u8BBF\u95EE\u65B9\u5F0F\uFF0C\u662F\u4E3A\u591A\u5904\u7406\u5668\u8BA1\u7B97\u673A\u8BBE\u8BA1\u7684\u5185\u5B58\u67B6\u6784\u3002</p><h3 id="\u8282\u70B9\u8D44\u6E90\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u8282\u70B9\u8D44\u6E90\u7BA1\u7406" aria-hidden="true">#</a> \u8282\u70B9\u8D44\u6E90\u7BA1\u7406</h3><ul><li>\u72B6\u6001\u6C47\u62A5</li><li>\u8D44\u6E90\u9884\u7559</li><li>\u9632\u6B62\u8282\u70B9\u8D44\u6E90\u8017\u5C3D\u7684\u9632\u5FA1\u673A\u5236\u9A71\u9010</li><li>\u5BB9\u5668\u548C\u7CFB\u7EDF\u8D44\u6E90\u7684\u914D\u7F6E</li></ul><h3 id="\u72B6\u6001\u4E0A\u62A5" tabindex="-1"><a class="header-anchor" href="#\u72B6\u6001\u4E0A\u62A5" aria-hidden="true">#</a> \u72B6\u6001\u4E0A\u62A5</h3><p>kubelet \u5468\u671F\u6027\u5730\u5411 <code>API Server</code> \u8FDB\u884C\u6C47\u62A5\uFF0C\u5E76\u66F4\u65B0\u8282\u70B9\u7684\u76F8\u5173\u5065\u5EB7\u548C\u8D44\u6E90\u4F7F\u7528\u4FE1\u606F</p><ul><li>\u8282\u70B9\u57FA\u7840\u4FE1\u606F\uFF0C\u5305\u62ECIP\u5730\u5740\u3001\u64CD\u4F5C\u7CFB\u7EDF\u3001\u5185\u6838\u3001\u8FD0\u884C\u65F6\u3001kubelet\u3001 kube-proxy \u7248\u672C\u4FE1\u606F\u3002</li><li>\u8282\u70B9\u8D44\u6E90\u4FE1\u606F\u5305\u62ECCPU\u3001\u5185\u5B58\u3001HugePage\u3001\u4E34\u65F6\u5B58\u50A8\u3001GPU \u7B49\u6CE8\u518C\u8BBE\u5907\uFF0C\u4EE5\u53CA\u8FD9\u4E9B\u8D44\u6E90\u4E2D\u53EF\u4EE5\u5206\u914D\u7ED9\u5BB9\u5668\u4F7F\u7528\u7684\u90E8\u5206\u3002</li><li>\u8C03\u5EA6\u5668\u5728\u4E3A Pod \u9009\u62E9\u8282\u70B9\u65F6\u4F1A\u5C06\u673A\u5668\u7684\u72B6\u6001\u4FE1\u606F\u4F5C\u4E3A\u4F9D\u636E\u3002</li></ul><table><thead><tr><th>\u72B6\u6001</th><th>\u610F\u4E49</th></tr></thead><tbody><tr><td>Ready</td><td>\u8282\u70B9\u662F\u5426\u5065\u5EB7</td></tr><tr><td>MemoryPressure</td><td>\u8282\u70B9\u662F\u5426\u5B58\u5728\u5185\u5B58\u538B\u529B</td></tr><tr><td>PIDPressure</td><td>\u8282\u70B9\u662F\u5426\u5B58\u5728\u6BD4\u8F83\u591A\u7684\u8FDB\u7A0B</td></tr><tr><td>DiskPressure</td><td>\u8282\u70B9\u662F\u5426\u5B58\u5728\u78C1\u76D8\u538B\u529B</td></tr><tr><td>NetworkUnavailable</td><td>\u8282\u70B9\u7F51\u7EDC\u914D\u7F6E\u662F\u5426\u6B63\u786E</td></tr></tbody></table><h3 id="lease" tabindex="-1"><a class="header-anchor" href="#lease" aria-hidden="true">#</a> Lease</h3><p>\u5728\u65E9\u671F\u7248\u672C kubele t\u7684\u72B6\u6001\u4E0A\u62A5\u76F4\u63A5\u66F4\u65B0 node \u5BF9\u8C61,\u800C\u4E0A\u62A5\u7684\u4FE1\u606F\u5305\u542B\u72B6\u6001\u4FE1\u606F\u548C\u8D44\u6E90\u4FE1\u606F\uFF0C\u56E0\u6B64\u9700\u8981 \u4F20\u8F93\u7684\u6570\u636E\u5305\u8F83\u5927\uFF0C\u7ED9 APIServer \u548C etcd \u9020\u6210\u7684\u538B\u529B\u8F83\u5927\u3002</p><p>\u540E\u5F15\u5165 Lease \u5BF9\u8C61\u7528\u6765\u4FDD\u5B58\u5065\u5EB7\u4FE1\u606F\uFF0C\u5728\u9ED8\u8BA4 40s \u7684 nodeLeaseDurationSeconds \u5468\u671F\u5185\uFF0C\u82E5 Lease \u5BF9 \u8C61\u6CA1\u6709\u88AB\u66F4\u65B0\uFF0C\u5219\u5BF9\u5E94\u8282\u70B9\u53EF\u4EE5\u88AB\u5224\u5B9A\u4E3A\u4E0D\u5065\u5EB7\u3002</p><blockquote><p>\u5C06\u53D8\u5316\u9891\u7387\u4F4E\u7684\u8D44\u6E90\u4FE1\u606F\u548C\u72B6\u6001\u4FE1\u606F\u5206\u79BB\u3002</p></blockquote><h3 id="\u8D44\u6E90\u9884\u7559" tabindex="-1"><a class="header-anchor" href="#\u8D44\u6E90\u9884\u7559" aria-hidden="true">#</a> \u8D44\u6E90\u9884\u7559</h3><p>\u8BA1\u7B97\u8282\u70B9\u9664\u7528\u6237\u5BB9\u5668\u5916\uFF0C\u8FD8\u5B58\u5728\u5F88\u591A\u652F\u6491\u7CFB\u7EDF\u8FD0\u884C\u7684\u57FA\u7840\u670D\u52A1\uFF0C\u8B6C\u5982 systemd\u3001journald\u3001 sshd\u3001dockerd\u3001Containerd\u3001 kubelet \u7B49\u3002</p><p>\u4E3A\u4E86\u4F7F\u670D\u52A1\u8FDB\u7A0B\u80FD\u591F\u6B63\u5E38\u8FD0\u884C\uFF0C\u8981\u786E\u4FDD\u5B83\u4EEC\u5728\u4EFB\u4F55\u65F6\u5019\u90FD\u53EF\u4EE5\u83B7\u53D6\u8DB3\u591F\u7684\u7CFB\u7EDF\u8D44\u6E90\uFF0C\u6240\u4EE5\u6211\u4EEC\u8981\u4E3A\u8FD9\u4E9B\u7CFB\u7EDF\u8FDB\u7A0B\u9884\u7559\u8D44\u6E90\u3002 kubelet \u53EF\u4EE5\u901A\u8FC7\u4F17\u591A\u542F\u52A8\u53C2\u6570\u4E3A\u7CFB\u7EDF\u9884\u7559 CPU\u3001\u5185\u5B58\u3001PID\u7B49\u8D44\u6E90\uFF0C\u6BD4\u5982 SystemReserved\u3001KubeReserved\u7B49\u3002</p><h3 id="capacity-\u548C-allocatable" tabindex="-1"><a class="header-anchor" href="#capacity-\u548C-allocatable" aria-hidden="true">#</a> Capacity \u548C Allocatable</h3><p>\u5BB9\u91CF\u8D44\u6E90(Capacity) \u662F\u6307 kubelet \u83B7\u53D6\u7684\u8BA1\u7B97\u8282\u70B9\u5F53\u524D\u7684\u8D44\u6E90\u4FE1\u606F\u3002</p><ul><li>CPU\u662F\u4ECE <code>/proc/cpuinfo</code> \u6587\u4EF6\u4E2D\u83B7\u53D6\u7684\u8282\u70B9CPU\u6838\u6570;</li><li>memory \u662F\u4ECE/ proc/memoryinfo \u4E2D\u83B7\u53D6\u7684\u8282\u70B9\u5185\u5B58\u5927\u5C0F;</li><li>ephemeral-storage \u662F\u6307\u8282\u70B9\u6839\u5206\u533A\u7684\u5927\u5C0F\u3002</li></ul><p>\u8D44\u6E90\u53EF\u5206\u914D\u989D(Allocatable) \u662F\u7528\u6237 Pod \u53EF\u7528\u7684\u8D44\u6E90\uFF0C\u662F\u8D44\u6E90\u5BB9\u91CF\u51CF\u53BB\u5206\u914D\u7ED9\u7CFB\u7EDF\u7684\u8D44\u6E90\u7684\u5269\u4F59\u90E8\u5206\u3002</p><p>\u8282\u70B9\u8D44\u6E90\u603B\u91CF= KubeReserved + SystemReserved + Eviction-threshold + Allocatable</p><h3 id="\u8282\u70B9\u78C1\u76D8\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u8282\u70B9\u78C1\u76D8\u7BA1\u7406" aria-hidden="true">#</a> \u8282\u70B9\u78C1\u76D8\u7BA1\u7406</h3><p>\u7CFB\u7EDF\u5206\u533A nodefs</p><ul><li>\u5DE5\u4F5C\u76EE\u5F55\u548C\u5BB9\u5668\u65E5\u5FD7</li><li>kubelet \u7684\u6570\u636E\u76EE\u5F55\uFF0C\u9ED8\u8BA4\u4E3A <code>/var/lib/kubelet</code></li></ul><p>\u5BB9\u5668\u8FD0\u884C\u65F6\u5206\u533A <code>imagefs</code></p><ul><li>\u7528\u6237\u955C\u50CF\u548C\u5BB9\u5668\u53EF\u5199\u5C42</li><li>\u5BB9\u5668\u8FD0\u884C\u65F6\u5206\u533A\u662F\u53EF\u9009\u7684\uFF0C\u53EF\u4EE5\u5408\u5E76\u5230\u7CFB\u7EDF\u5206\u533A\u4E2D</li><li>\u5B58\u653E\u955C\u50CF\u7684\u76EE\u5F55\uFF0Ccontainerd \u5728 <code>/var/lib/containerd</code>\uFF0Cdocker \u5728 <code>/var/lib/docker</code></li></ul><h3 id="\u9A71\u9010\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u9A71\u9010\u7BA1\u7406" aria-hidden="true">#</a> \u9A71\u9010\u7BA1\u7406</h3><ul><li>kubelet \u4F1A\u5728\u7CFB\u7EDF\u8D44\u6E90\u4E0D\u591F\u65F6\u4E2D\u6B62\u4E00\u4E9B\u5BB9\u5668\u8FDB\u7A0B\uFF0C\u4EE5\u7A7A\u51FA\u7CFB\u7EDF\u8D44\u6E90\uFF0C\u4FDD\u8BC1\u8282\u70B9\u7684\u7A33\u5B9A\u6027\u3002</li><li><strong>\u4F46\u7531 kubelet \u53D1\u8D77\u7684\u9A71\u9010\u53EA\u505C\u6B62 Pod \u7684\u6240\u6709\u5BB9\u5668\u8FDB\u7A0B\uFF0C\u5E76\u4E0D\u4F1A\u76F4\u63A5\u5220\u9664 Pod</strong>\uFF0C\u4FBF\u4E8E\u7BA1\u7406\u5458\u53D1\u73B0\u95EE\u9898 <ul><li>Pod \u7684 status.phase \u4F1A\u88AB\u6807\u8BB0\u4E3A Failed</li><li>status.reason \u4F1A\u88AB\u8BBE\u7F6E\u4E3A Evicted</li><li>status.message \u5219\u4F1A\u8BB0\u5F55\u88AB\u9A71\u9010\u7684\u539F\u56E0</li></ul></li></ul><h3 id="\u8D44\u6E90\u53EF\u7528\u989D\u76D1\u63A7" tabindex="-1"><a class="header-anchor" href="#\u8D44\u6E90\u53EF\u7528\u989D\u76D1\u63A7" aria-hidden="true">#</a> \u8D44\u6E90\u53EF\u7528\u989D\u76D1\u63A7</h3>',30),g=t("kubelet \u4F9D\u8D56\u5185\u5D4C\u7684\u5F00\u6E90\u8F6F\u4EF6 "),x={href:"https://github.com/google/cadvisor",target:"_blank",rel:"noopener noreferrer"},y=t("cAdvisor"),C=t(",\u5468\u671F\u6027\u68C0\u67E5\u8282\u70B9\u8D44\u6E90\u4F7F\u7528\u60C5\u51B5"),D=e("li",null,"CPU \u662F\u53EF\u538B\u7F29\u8D44\u6E90\uFF0C\u6839\u636E\u4E0D\u540C\u8FDB\u7A0B\u5206\u914D\u65F6\u95F4\u914D\u989D\u548C\u6743\u91CD\uFF0CCPU \u53EF\u88AB\u591A\u4E2A\u8FDB\u7A0B\u7ADE\u76F8\u4F7F\u7528",-1),E=e("li",null,"\u9A71\u9010\u7B56\u7565\u662F\u57FA\u4E8E\u78C1\u76D8\u548C\u5185\u5B58\u8D44\u6E90\u7528\u91CF\u8FDB\u884C\u7684\uFF0C\u56E0\u4E3A\u4E24\u8005\u5C5E\u4E8E\u4E0D\u53EF\u538B\u7F29\u7684\u8D44\u6E90\uFF0C\u5F53\u6B64\u7C7B\u8D44\u6E90\u4F7F\u7528\u8017\u5C3D\u65F6\u5C06\u65E0\u6CD5\u518D\u7533\u8BF7",-1),I=a(`<table><thead><tr><th>\u68C0\u67E5\u7C7B\u578B</th><th>\u8BF4\u660E</th></tr></thead><tbody><tr><td>memory.avaliable</td><td>\u8282\u70B9\u5F53\u524D\u53EF\u7528\u5185\u5B58</td></tr><tr><td>nodefs.avaliable</td><td>\u8282\u70B9\u6839\u5206\u533A\u7684\u53EF\u7528\u78C1\u76D8\u5927\u5C0F</td></tr><tr><td>nodefs.inodesFree</td><td>\u8282\u70B9\u6839\u5206\u533A\u7684\u53EF\u4F7F\u7528 inode</td></tr><tr><td>imagefs.avaliable</td><td>\u8282\u70B9\u8FD0\u884C\u65F6\u5206\u533A\u7684\u53EF\u7528\u78C1\u76D8\u5927\u5C0F</td></tr><tr><td>imagefs.inodesFree</td><td>\u8282\u70B9\u8FD0\u884C\u65F6\u5206\u533A\u7684\u53EF\u4F7F\u7528 inode</td></tr></tbody></table><h3 id="\u9A71\u9010\u7B56\u7565" tabindex="-1"><a class="header-anchor" href="#\u9A71\u9010\u7B56\u7565" aria-hidden="true">#</a> \u9A71\u9010\u7B56\u7565</h3><p>kubelet \u83B7\u5F97\u8282\u70B9\u7684\u53EF\u7528\u989D\u4FE1\u606F\u540E\uFF0C\u4F1A\u7ED3\u5408\u8282\u70B9\u7684\u5BB9\u91CF\u4FE1\u606F\u6765\u5224\u65AD\u5F53\u524D\u8282\u70B9\u8FD0\u884C\u7684 Pod \u662F\u5426\u6EE1\u8DB3\u9A71\u9010\u6761\u4EF6\u3002</p><p>\u9A71\u9010\u6761\u4EF6\u53EF\u4EE5\u662F\u7EDD\u5BF9\u503C\u6216\u767E\u5206\u6BD4\uFF0C\u5F53\u76D1\u63A7\u8D44\u6E90\u7684\u53EF\u4F7F\u7528\u989D\u5C11\u4E8E\u8BBE\u5B9A\u7684\u6570\u503C\u6216\u767E\u5206\u6BD4\u65F6\uFF0Ckubelet \u5C31\u4F1A\u53D1\u8D77\u9A71\u9010\u64CD\u4F5C\u3002</p><p>kubelet \u53C2\u6570 evictionMinimumReclaim \u53EF\u4EE5\u8BBE\u7F6E\u6BCF\u6B21\u56DE\u6536\u7684\u8D44\u6E90\u7684\u6700\u5C0F\u503C\uFF0C\u4EE5\u9632\u6B62\u5C0F\u8D44\u6E90\u7684\u591A\u6B21\u56DE\u6536\u3002</p><table><thead><tr><th>kubelet \u53C2\u6570</th><th>\u5206\u7C7B</th><th>\u9A71\u9010\u65B9\u5F0F</th></tr></thead><tbody><tr><td>evictionSoft</td><td>\u8F6F\u9A71\u9010</td><td>\u5F53\u68C0\u6D4B\u5230\u5F53\u524D\u8D44\u6E90\u8FBE\u5230\u8F6F\u9A71\u9010\u7684\u9608\u503C\u65F6\uFF0C\u5E76\u4E0D\u4F1A\u7ACB\u5373\u542F\u52A8\u9A71\u9010\u64CD\u4F5C\uFF0C\u800C\u662F\u8981\u7B49\u5F85\u4E00\u4E2A\u5BBD\u9650\u671F\u3002\u8FD9\u4E2A\u5BBD\u9650\u671F\u9009\u53D6 EvictionSoftGracePeriod \u548C Pod \u6307\u5B9A\u7684TerminationGracePeriodSeconds \u4E2D\u8F83\u5C0F\u7684\u503C</td></tr><tr><td>evictionHard</td><td>\u786C\u9A71\u9010</td><td>\u6CA1\u6709\u5BBD\u9650\u671F\uFF0C\u4E00\u65E6\u68C0\u6D4B\u5230\u6EE1\u8DB3\u786C\u9A71\u9010\u7684\u6761\u4EF6\uFF0C\u5C31\u76F4\u63A5\u4E2D\u6B62\u5BB9\u5668\u6765\u91CA\u653E\u7D27\u5F20\u8D44\u6E90</td></tr></tbody></table><h4 id="\u57FA\u4E8E\u5185\u5B58\u538B\u529B\u7684\u9A71\u9010" tabindex="-1"><a class="header-anchor" href="#\u57FA\u4E8E\u5185\u5B58\u538B\u529B\u7684\u9A71\u9010" aria-hidden="true">#</a> \u57FA\u4E8E\u5185\u5B58\u538B\u529B\u7684\u9A71\u9010</h4><p>memory.avaiable \u8868\u793A\u5F53\u524D\u7CFB\u7EDF\u7684\u53EF\u7528\u5185\u5B58\u60C5\u51B5\u3002</p><p>kubelet \u9ED8\u8BA4\u8BBE\u7F6E\u4E86 memory.avaiable&lt;100Mi \u7684\u786C\u9A71\u9010\u6761\u4EF6\u3002</p><p>\u5F53 kubelet \u68C0\u6D4B\u5230\u5F53\u524D\u8282\u70B9\u53EF\u7528\u5185\u5B58\u8D44\u6E90\u7D27\u5F20\u5E76\u6EE1\u8DB3\u9A71\u9010\u6761\u4EF6\u65F6\uFF0C\u4F1A\u5C06\u8282\u70B9\u7684 MemoryPressure \u72B6\u6001\u8BBE\u7F6E\u4E3A True, \u8C03\u5EA6\u5668\u4F1A\u963B\u6B62 BestEffort Pod \u8C03\u5EA6\u5230\u5185\u5B58\u627F\u538B\u7684\u8282\u70B9\u3002</p><p>kubelet \u542F\u52A8\u5BF9\u5185\u5B58\u4E0D\u8DB3\u7684\u9A71\u9010\u64CD\u4F5C\u65F6\uFF0C\u4F1A\u4F9D\u7167\u5982\u4E0B\u7684\u987A\u5E8F\u9009\u53D6\u76EE\u6807 Pod:\u3001</p><ul><li>(1)\u5224\u65AD Pod \u6240\u6709\u5BB9\u5668\u7684\u5185\u5B58\u4F7F\u7528\u91CF\u603B\u548C\u662F\u5426\u8D85\u51FA\u4E86\u8BF7\u6C42\u7684\u5185\u5B58\u91CF\uFF0C\u8D85\u51FA\u8BF7\u6C42\u8D44\u6E90\u7684 Pod \u4F1A\u6210\u4E3A\u5907\u9009\u76EE\u6807\u3002</li><li>(2)\u67E5\u8BE2 Pod \u7684\u8C03\u5EA6\u4F18\u5148\u7EA7\uFF0C\u4F4E\u4F18\u5148\u7EA7\u7684 Pod \u88AB\u4F18\u5148\u9A71\u9010\u3002</li><li>(3)\u8BA1\u7B97 Pod \u6240\u6709\u5BB9\u5668\u7684\u5185\u5B58\u4F7F\u7528\u91CF\u548C Pod \u8BF7\u6C42\u7684\u5185\u5B58\u91CF\u7684\u5DEE\u503C\uFF0C\u5DEE\u503C\u8D8A\u5C0F\uFF0C\u8D8A\u4E0D\u5BB9\u6613\u88AB\u9A71\u9010\u3002 <ul><li>Pod A \u8BF7\u6C42 100Mi\uFF0C\u4F7F\u7528\u4E86 120Mi\uFF0C\u6BD4\u4F8B\u4E3A 1.2</li><li>Pod B \u8BF7\u6C42 200Mi\uFF0C\u4F7F\u7528\u4E86 300Mi\uFF0C\u6BD4\u4F8B\u4E3A1.5</li><li>Pod B \u4F1A\u88AB\u4F18\u5148\u9A71\u9010</li></ul></li></ul><h4 id="\u57FA\u4E8E\u78C1\u76D8\u538B\u529B\u7684\u9A71\u9010" tabindex="-1"><a class="header-anchor" href="#\u57FA\u4E8E\u78C1\u76D8\u538B\u529B\u7684\u9A71\u9010" aria-hidden="true">#</a> \u57FA\u4E8E\u78C1\u76D8\u538B\u529B\u7684\u9A71\u9010</h4><p>\u4EE5\u4E0B\u4EFB\u4F55\u4E00\u9879\u6EE1\u8DB3\u9A71\u9010\u6761\u4EF6\u65F6\uFF0C\u5B83\u4F1A\u5C06\u8282\u70B9\u7684 DiskPressure \u72B6\u6001\u8BBE\u7F6E\u4E3A True,\u8C03\u5EA6\u5668\u4E0D\u4F1A\u518D\u8C03\u5EA6\u4EFB\u4F55 Pod \u5230\u8BE5\u8282\u70B9\u4E0A\uFF1A</p><ul><li>nodefs.available</li><li>nodefs.inodesFree</li><li>imagefs.available</li><li>imagefs.inodesFree</li></ul><p>\u9A71\u9010\u884C\u4E3A</p><ul><li>\u6709\u5BB9\u5668\u8FD0\u884C\u65F6\u5206\u533A <ul><li>nodefs \u8FBE\u5230\u9A71\u9010\u9608\u503C\uFF0C \u90A3\u4E48 kubelet \u5220\u9664\u5DF2\u7ECF\u9000\u51FA\u7684\u5BB9\u5668</li><li>Imagefs \u8FBE\u5230\u9A71\u9010\u9608\u503C\uFF0C\u90A3\u4E48 kubelet \u5220\u9664\u6240\u6709\u672A\u4F7F\u7528\u7684\u955C\u50CF</li></ul></li><li>\u65E0\u5BB9\u5668\u8FD0\u884C\u65F6\u5206\u533A <ul><li>kubelet \u540C\u65F6\u5220\u9664\u672A\u8FD0\u884C\u7684\u5BB9\u5668\u548C\u672A\u4F7F\u7528\u7684\u955C\u50CF\u3002</li></ul></li></ul><p>\u56DE\u6536\u5DF2\u7ECF\u9000\u51FA\u7684\u5BB9\u5668\u548C\u672A\u4F7F\u7528\u7684\u955C\u50CF\u540E\uFF0C\u5982\u679C\u8282\u70B9\u4F9D\u7136\u6EE1\u8DB3\u9A71\u9010\u6761\u4EF6\uFF0Ckubelet \u5C31\u4F1A\u5F00\u59CB\u9A71\u9010\u6B63\u5728\u8FD0\u884C\u7684 Pod,\u8FDB\u4E00\u6B65\u91CA\u653E\u78C1\u76D8\u7A7A\u95F4\u3002</p><ul><li>\u5224\u65AD Pod \u7684\u78C1\u76D8\u4F7F\u7528\u91CF\u662F\u5426\u8D85\u8FC7\u8BF7\u6C42\u7684\u5927\u5C0F\uFF0C\u8D85\u51FA\u8BF7\u6C42\u8D44\u6E90\u7684 Pod \u4F1A\u6210\u4E3A\u5907\u9009\u76EE\u6807\u3002</li><li>\u67E5\u8BE2 Pod \u7684\u8C03\u5EA6\u4F18\u5148\u7EA7\uFF0C\u4F4E\u4F18\u5148\u7EA7\u7684 Pod \u4F18\u5148\u9A71\u9010\u3002</li><li>\u6839\u636E\u78C1\u76D8\u4F7F\u7528\u8D85\u8FC7\u8BF7\u6C42\u7684\u6570\u91CF\u8FDB\u884C\u6392\u5E8F\uFF0C\u5DEE\u503C\u8D8A\u5C0F\uFF0C\u8D8A\u4E0D\u5BB9\u6613\u88AB\u9A71\u9010\u3002</li></ul><h3 id="oom-killer-\u7684\u884C\u4E3A" tabindex="-1"><a class="header-anchor" href="#oom-killer-\u7684\u884C\u4E3A" aria-hidden="true">#</a> OOM Killer \u7684\u884C\u4E3A</h3><ul><li>\u7CFB\u7EDF\u7684 OOM_Killer \u53EF\u80FD\u4F1A\u91C7\u53D6 OOM \u7684\u65B9\u5F0F\u6765\u4E2D\u6B62\u67D0\u4E9B\u5BB9\u5668\u7684\u8FDB\u7A0B\uFF0C\u8FDB\u884C\u5FC5\u8981\u7684\u5185\u5B58\u56DE\u6536\u64CD\u4F5C</li><li>\u800C\u7CFB\u7EDF\u6839\u636E\u8FDB\u7A0B\u7684 oom_score \u6765\u8FDB\u884C\u4F18\u5148\u7EA7\u6392\u5E8F\uFF0C\u9009\u62E9\u5F85\u7EC8\u6B62\u7684\u8FDB\u7A0B\uFF0C\u4E14<strong>\u8FDB\u7A0B\u7684 oom_score \u8D8A\u9AD8\uFF0C\u8D8A\u5BB9\u6613\u88AB\u7EC8\u6B62</strong>\u3002</li><li>\u8FDB\u7A0B\u7684 oom_score \u662F\u6839\u636E\u5F53\u524D\u8FDB\u7A0B\u4F7F\u7528\u7684\u5185\u5B58\u5360\u8282\u70B9\u603B\u5185\u5B58\u7684\u6BD4\u4F8B\u503C\u4E58\u4EE5 10,\u518D\u52A0\u4E0A oom_score_adj \u7EFC\u5408\u5F97\u5230\u7684 <ul><li>\u6BD4\u5982\u5360\u7528\u5185\u5B58 50%\uFF0C\u90A3\u4E48\u8BA1\u7B97\u5F97\u5230\u7684\u8FD9\u90E8\u5206\u5360\u6BD4\u5206\u5C31\u662F 500\uFF0C\u5982\u679C\u662F 60% \u5C31\u662F 600 \u5206</li></ul></li><li>\u800C\u5BB9\u5668\u8FDB\u7A0B\u7684 oom_score_adj \u6B63\u662F kubelet \u6839\u636E memory.request \u8FDB\u884C\u8BBE\u7F6E\u7684</li></ul><table><thead><tr><th>Pod QoS \u7B49\u7EA7</th><th>oom_score_adj</th></tr></thead><tbody><tr><td>Guaranteed</td><td>-998</td></tr><tr><td>BestEffort</td><td>1000</td></tr><tr><td>Burstable</td><td>min(max(2,1000-(1000 * memoryRequestBytes) / machineMemoryCapacityBytes), 999)</td></tr></tbody></table><p>\u67E5\u770B\u5177\u4F53 Pod \u7684 oom_score\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>crictl ps|grep nginx
crictl inspect b2e7a8e64253d|grep pid
cat /proc/296290/oom_score
cat /proc/296290/oom_score_adj
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u67E5\u770B\u5168\u90E8\u8FDB\u7A0B\u7684 oom_score</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>#!/bin/bash
printf &#39;PID\\tOOM Score\\tOOM Adj\\tCommand\\n&#39;
while read -r pid comm; do [ -f /proc/$pid/oom_score ] &amp;&amp; [ $(cat /proc/$pid/oom_score) != 0 ] &amp;&amp; printf &#39;%d\\t%d\\t\\t%d\\t%s\\n&#39; &quot;$pid&quot; &quot;$(cat /proc/$pid/oom_score)&quot; &quot;$(cat /proc/$pid/oom_score_adj)&quot; &quot;$comm&quot;; done &lt; &lt;(ps -e -o pid= -o comm=) | sort -k 2nr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u6D4B\u8BD5\u5BF9-cpu-\u7684\u6821\u9A8C\u548C\u51C6\u5165\u884C\u4E3A" tabindex="-1"><a class="header-anchor" href="#\u6D4B\u8BD5\u5BF9-cpu-\u7684\u6821\u9A8C\u548C\u51C6\u5165\u884C\u4E3A" aria-hidden="true">#</a> \u6D4B\u8BD5\u5BF9 cpu \u7684\u6821\u9A8C\u548C\u51C6\u5165\u884C\u4E3A</h3><ul><li>\u5B9A\u4E49\u4E00\u4E2A Pod,\u5E76\u5C06\u8BE5 Pod \u4E2D\u7684 nodeName \u5C5E\u6027\u76F4\u63A5\u5199\u6210\u96C6\u7FA4\u4E2D\u7684\u8282\u70B9\u540D</li><li>\u5C06 Pod \u7684 CPU \u7684\u8D44\u6E90\u8BBE\u7F6E\u4E3A\u8D85\u51FA\u8BA1\u7B97\u8282\u70B9\u7684 CPU \u7684\u503C</li><li>\u521B\u5EFA\u8BE5 Pod</li><li>\u89C2\u5BDF\u884C\u4E3A\u5E76\u601D\u8003</li></ul><h3 id="\u65E5\u5FD7\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#\u65E5\u5FD7\u7BA1\u7406" aria-hidden="true">#</a> \u65E5\u5FD7\u7BA1\u7406</h3><p>\u8282\u70B9\u4E0A\u9700\u8981\u901A\u8FC7\u8FD0\u884C logrotate \u7684\u5B9A\u65F6\u4EFB\u52A1\u5BF9\u7CFB\u7EDF\u670D\u52A1\u65E5\u5FD7\u8FDB\u884Crotate\u6E05\u7406\uFF0C\u4EE5\u9632\u6B62\u7CFB\u7EDF\u670D\u52A1\u65E5\u5FD7\u5360\u7528\u5927\u91CF\u7684\u78C1\u76D8\u7A7A\u95F4\u3002</p><ul><li>logrotate \u7684\u6267\u884C\u5468\u671F\u4E0D\u80FD\u8FC7\u957F\uFF0C\u4EE5\u9632\u65E5\u5FD7\u77ED\u65F6\u95F4\u5185\u5927\u91CF\u589E\u957F\u3002</li><li>\u540C\u65F6\u914D\u7F6E\u65E5\u5FD7\u7684 rotate \u6761\u4EF6\uFF0C \u5728\u65E5\u5FD7\u4E0D\u5360\u7528\u592A\u591A\u7A7A\u95F4\u7684\u60C5\u51B5\u4E0B\uFF0C\u4FDD\u8BC1\u6709\u8DB3\u591F\u7684\u65E5\u5FD7\u53EF\u4F9B\u67E5\u770B\u3002</li><li>Docker <ul><li>\u9664\u4E86\u57FA\u4E8E\u7CFB\u7EDF logrotate \u7BA1\u7406\u65E5\u5FD7\uFF0C\u8FD8\u53EF\u4EE5\u4F9D\u8D56 Docker \u81EA\u5E26\u7684\u65E5\u5FD7\u7BA1\u7406\u529F\u80FD\u6765\u8BBE\u7F6E\u5BB9\u5668\u65E5\u5FD7\u7684\u6570\u91CF\u548C\u6BCF\u4E2A\u65E5\u5FD7\u6587\u4EF6\u7684\u5927\u5C0F\u3002</li><li>Docker \u5199\u5165\u6570\u636E\u4E4B\u524D\u4F1A\u5BF9\u65E5\u5FD7\u5927\u5C0F\u8FDB\u884C\u68C0\u67E5\u548C rotate \u64CD\u4F5C\uFF0C\u786E\u4FDD\u65E5\u5FD7\u6587\u4EF6\u4E0D\u4F1A\u8D85\u8FC7\u914D\u7F6E\u7684\u6570\u91CF\u548C\u5927\u5C0F\u3002</li></ul></li><li>Containerd <ul><li>\u65E5\u5FD7\u7684\u7BA1\u7406\u662F\u901A\u8FC7 kubelet \u5B9A\u671F(\u9ED8\u8BA4\u4E3A10s)\u6267\u884C du \u547D\u4EE4\uFF0C\u6765\u68C0\u67E5\u5BB9\u5668\u65E5\u5FD7\u7684\u6570\u91CF\u548C\u6587\u4EF6\u7684\u5927\u5C0F\u7684\u3002</li><li>\u6BCF\u4E2A\u5BB9\u5668\u65E5\u5FD7\u7684\u5927\u5C0F\u548C\u53EF\u4EE5\u4FDD\u7559\u7684\u6587\u4EF6\u4E2A\u6570\uFF0C\u53EF\u4EE5\u901A\u8FC7 kubelet \u7684\u914D\u7F6E\u53C2\u6570 container-log-max-size\u548Ccontainer-log-max-files \u8FDB\u884C\u8C03\u6574\u3002</li></ul></li></ul><h3 id="docker-\u5377\u7BA1\u7406" tabindex="-1"><a class="header-anchor" href="#docker-\u5377\u7BA1\u7406" aria-hidden="true">#</a> Docker \u5377\u7BA1\u7406</h3><ul><li>\u5728\u6784\u5EFA\u5BB9\u5668\u955C\u50CF\u65F6\uFF0C\u53EF\u4EE5\u5728 Dockerfile \u4E2D\u901A\u8FC7 VOLUME \u6307\u4EE4\u58F0\u660E\u4E00\u4E2A\u5B58\u50A8\u5377\uFF0C\u76EE\u524D Kubernetes \u5E76\u672A\u5C06\u5176\u7EB3\u5165\u7BA1\u63A7\u8303\u56F4\uFF0C\u4E0D\u5EFA\u8BAE\u4F7F\u7528\u3002</li><li>\u5982\u679C\u5BB9\u5668\u8FDB\u7A0B\u5728\u53EF\u5199\u5C42\u6216 emptyDir \u5377\u8FDB\u884C\u5927\u91CF\u8BFB\u5199\u64CD\u4F5C\uFF0C\u5C31\u4F1A\u5BFC\u81F4\u78C1\u76D8 I/O \u8FC7\u9AD8,\u4ECE\u800C\u5F71\u54CD\u5176\u4ED6\u5BB9\u5668\u8FDB\u7A0B\u751A\u81F3\u7CFB\u7EDF\u8FDB\u7A0B\u3002</li><li>Docker \u548C Containerd \u8FD0\u884C\u65F6\u90FD\u57FA\u4E8E CGroupv1\u3002\u5BF9\u4E8E\u5757\u8BBE\u5907,\u53EA\u652F\u6301\u5BF9 Direct I/O \u9650\u901F\uFF0C\u800C\u5BF9\u4E8EBuffer I/O \u8FD8\u4E0D\u5177\u5907\u6709\u6548\u7684\u652F\u6301\u3002\u56E0\u6B64\uFF0C\u9488\u5BF9\u8BBE\u5907\u9650\u901F\u7684\u95EE\u9898\uFF0C\u76EE\u524D\u8FD8\u6CA1\u6709\u5B8C\u7F8E\u7684\u89E3\u51B3\u65B9\u6848,\u5BF9\u4E8E\u6709\u7279\u6B8A I/O \u9700\u6C42\u7684\u5BB9\u5668\uFF0C\u5EFA\u8BAE\u4F7F\u7528\u72EC\u7ACB\u7684\u78C1\u76D8\u7A7A\u95F4\u3002</li></ul><h3 id="\u7F51\u7EDC\u8D44\u6E90" tabindex="-1"><a class="header-anchor" href="#\u7F51\u7EDC\u8D44\u6E90" aria-hidden="true">#</a> \u7F51\u7EDC\u8D44\u6E90</h3><p>\u7531\u7F51\u7EDC\u63D2\u4EF6\u901A\u8FC7 Linux Traffic Control \u4E3A Pod\u9650\u5236\u5E26\u5BBD</p><p>\u53EF\u5229\u7528 CNI\u793E\u533A\u63D0\u4F9B\u7684 bandwidth \u63D2\u4EF6</p><h3 id="\u8FDB\u7A0B\u6570" tabindex="-1"><a class="header-anchor" href="#\u8FDB\u7A0B\u6570" aria-hidden="true">#</a> \u8FDB\u7A0B\u6570</h3><p>kubelet \u9ED8\u8BA4\u4E0D\u9650\u5236 Pod \u53EF\u4EE5\u521B\u5EFA\u7684\u5B50\u8FDB\u7A0B\u6570\u91CF\uFF0C\u4F46\u53EF\u4EE5\u901A\u8FC7\u542F\u52A8\u53C2\u6570 podPidsLimit \u5F00\u542F\u9650\u5236\uFF0C\u8FD8\u53EF\u4EE5\u7531reserved \u53C2\u6570\u4E3A\u7CFB\u7EDF\u8FDB\u7A0B\u9884\u7559\u8FDB\u7A0B\u6570\u3002</p><ul><li>kubelet \u901A\u8FC7\u7CFB\u7EDF\u8C03\u7528\u5468\u671F\u6027\u5730\u83B7\u53D6\u5F53\u524D\u7CFB\u7EDF\u7684 PID \u7684\u4F7F\u7528\u91CF\uFF0C\u5E76\u8BFB\u53D6 <code>/proc/sys/kernel/pid_max</code>, \u83B7\u53D6\u7CFB\u7EDF\u652F\u6301\u7684PID \u4E0A\u9650\u3002</li><li>\u5982\u679C\u5F53\u524D\u7684\u53EF\u7528\u8FDB\u7A0B\u6570\u5C11\u4E8E\u8BBE\u5B9A\u9608\u503C\uFF0C\u90A3\u4E48 kubelet \u4F1A\u5C06\u8282\u70B9\u5BF9\u8C61\u7684 PIDPressure \u6807\u8BB0\u4E3A True</li><li>kube-scheduler \u5728\u8FDB\u884C\u8C03\u5EA6\u65F6\uFF0C \u4F1A\u4ECE\u5907\u9009\u8282\u70B9\u4E2D\u5BF9\u5904\u4E8E NodeUnderPIDPressure \u72B6\u6001\u7684\u8282\u70B9\u8FDB\u884C\u8FC7\u6EE4\u3002</li></ul><h2 id="kubernetes-\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#kubernetes-\u65E5\u5FD7" aria-hidden="true">#</a> Kubernetes \u65E5\u5FD7</h2><p>\u4E0E\u4F20\u7EDF\u7684\u65E5\u5FD7\u6536\u96C6\u76F8\u6BD4\uFF0CKubernetes \u65E5\u5FD7\u6536\u96C6\u5177\u6709\u4EE5\u4E0B\u4E0D\u540C\u4E4B\u5904\uFF1A</p><ol><li>\u5206\u5E03\u5F0F\uFF1AKubernetes \u96C6\u7FA4\u4E2D\u8FD0\u884C\u7684\u5E94\u7528\u7A0B\u5E8F\u901A\u5E38\u7531\u591A\u4E2A\u5BB9\u5668\u7EC4\u6210\uFF0C\u8FD9\u4E9B\u5BB9\u5668\u53EF\u80FD\u8DE8\u8D8A\u591A\u4E2A\u8282\u70B9\u3002\u56E0\u6B64\uFF0C\u65E5\u5FD7\u6536\u96C6\u9700\u8981\u8DE8\u8282\u70B9\u548C\u5BB9\u5668\u8FDB\u884C\u3002</li><li>\u52A8\u6001\u6027\uFF1AKubernetes \u96C6\u7FA4\u4E2D\u7684 Pod \u53EF\u4EE5\u968F\u65F6\u88AB\u521B\u5EFA\u3001\u5220\u9664\u6216\u91CD\u65B0\u542F\u52A8\u3002\u56E0\u6B64\uFF0C\u65E5\u5FD7\u6536\u96C6\u9700\u8981\u52A8\u6001\u5730\u9002\u5E94\u8FD9\u4E9B\u53D8\u5316\u3002</li><li>\u591A\u6837\u6027\uFF1AKubernetes \u96C6\u7FA4\u4E2D\u7684\u5E94\u7528\u7A0B\u5E8F\u53EF\u80FD\u4F7F\u7528\u591A\u79CD\u7F16\u7A0B\u8BED\u8A00\u548C\u65E5\u5FD7\u683C\u5F0F\u3002\u56E0\u6B64\uFF0C\u65E5\u5FD7\u6536\u96C6\u9700\u8981\u652F\u6301\u591A\u79CD\u683C\u5F0F\u548C\u8BED\u8A00\u3002</li></ol><p>\u4E3A\u4E86\u89E3\u51B3\u8FD9\u4E9B\u95EE\u9898\uFF0CKubernetes \u63D0\u4F9B\u4E86\u4E00\u4E9B\u5185\u7F6E\u7684\u65E5\u5FD7\u6536\u96C6\u673A\u5236\uFF0C\u5982 kubectl logs \u547D\u4EE4\u548C Fluentd \u63D2\u4EF6\u3002\u6B64\u5916\uFF0C\u8FD8\u53EF\u4EE5\u4F7F\u7528\u7B2C\u4E09\u65B9\u5DE5\u5177\uFF0C\u5982 Elasticsearch\u3001Fluentd \u548C Kibana \u7B49\uFF0C\u6765\u8FDB\u884C\u65E5\u5FD7\u6536\u96C6\u548C\u5206\u6790\u3002</p><h3 id="\u524D\u8A00" tabindex="-1"><a class="header-anchor" href="#\u524D\u8A00" aria-hidden="true">#</a> \u524D\u8A00</h3><p>Pod \u7684\u751F\u547D\u5468\u671F\u5F88\u77ED\uFF0C Pod \u9500\u6BC1\u540E \u65E5\u5FD7\u4E5F\u4F1A\u4E00\u540C\u88AB\u5220\u9664\uFF0C Kubernetes \u7684\u65E5\u5FD7\u7CFB\u7EDF\u5728\u8BBE\u8BA1\u7684\u65F6\u5019\uFF0C\u5FC5\u987B\u72EC\u7ACB\u4E8E\u8282\u70B9\u548Cpod \u7684\u751F\u547D\u5468\u671F\uFF0C\u4E14\u4FDD\u8BC1\u65E5\u5FD7\u6570\u636E\u53EF\u4EE5\u5B9E\u65F6\u91C7\u96C6\u5230\u670D\u52A1\u7AEF\u3002</p><p>\u5728 Kubernetes \u96C6\u7FA4\u4E2D\uFF0C\u9700\u8981\u8FDB\u884C\u65E5\u5FD7\u6536\u96C6\u7684\u5730\u65B9\u5305\u62EC\uFF1A</p><ul><li>\u5BB9\u5668\u65E5\u5FD7\uFF1A\u5728\u5BB9\u5668\u4E2D\u8FD0\u884C\u7684\u5E94\u7528\u7A0B\u5E8F\u8F93\u51FA\u7684\u65E5\u5FD7\u3002</li><li>\u8282\u70B9\u65E5\u5FD7\uFF1A\u8282\u70B9\u4E0A\u7684\u7CFB\u7EDF\u65E5\u5FD7\u548C\u5BB9\u5668\u65E5\u5FD7\u3002</li></ul><p>\u9664\u4E86\u4EE5\u4E0A\u4E24\u79CD\u65B9\u5F0F\u5916\uFF0C\u8FD8\u53EF\u4EE5\u4F7F\u7528\u65E5\u5FD7\u805A\u5408\u5DE5\u5177\uFF0C\u5982 Elasticsearch\u3001Fluentd \u548C Kibana \u7B49\uFF0C\u6765\u8FDB\u884C\u65E5\u5FD7\u6536\u96C6\u548C\u5206\u6790\u3002</p><p>\u5728\u8FDB\u884C\u65E5\u5FD7\u6536\u96C6\u65F6\uFF0C\u9700\u8981\u6CE8\u610F\u4EE5\u4E0B\u51E0\u70B9\uFF1A</p><ul><li>\u786E\u4FDD\u8282\u70B9\u548C Pod \u7684\u65F6\u95F4\u540C\u6B65\u3002</li><li>\u5C06\u65E5\u5FD7\u5B58\u50A8\u5728\u6301\u4E45\u5B58\u50A8\u4E2D\uFF0C\u907F\u514D\u6570\u636E\u4E22\u5931\u3002</li><li>\u5BF9\u4E8E\u5927\u89C4\u6A21\u96C6\u7FA4\uFF0C\u9700\u8981\u8003\u8651\u65E5\u5FD7\u7684\u538B\u7F29\u548C\u8F6C\u50A8\uFF0C\u4EE5\u51CF\u5C11\u5B58\u50A8\u7A7A\u95F4\u7684\u5360\u7528\u3002</li></ul><h3 id="\u65E5\u5FD7\u8F6E\u8F6C" tabindex="-1"><a class="header-anchor" href="#\u65E5\u5FD7\u8F6E\u8F6C" aria-hidden="true">#</a> \u65E5\u5FD7\u8F6E\u8F6C</h3><p><strong>\u65E5\u5FD7\u8F6E\u8F6C</strong>\u662F\u6307\u5728\u65E5\u5FD7\u6587\u4EF6\u8FBE\u5230\u4E00\u5B9A\u5927\u5C0F\u6216\u4E00\u5B9A\u65F6\u95F4\u540E\uFF0C\u5C06\u5176\u91CD\u547D\u540D\u5E76\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u65E5\u5FD7\u6587\u4EF6\uFF0C\u4EE5\u907F\u514D\u65E5\u5FD7\u6587\u4EF6\u8FC7\u5927\u6216\u8FC7\u65E7\u800C\u5BFC\u81F4\u7684\u6027\u80FD\u95EE\u9898\u6216\u5B58\u50A8\u95EE\u9898\u3002</p><p>\u4F18\u70B9\uFF1A</p><ul><li>\u907F\u514D\u5355\u4E2A\u65E5\u5FD7\u6587\u4EF6\u8FC7\u5927\uFF0C\u5BFC\u81F4\u8BFB\u53D6\u3001\u5199\u5165\u3001\u4F20\u8F93\u3001\u5B58\u50A8\u7B49\u65B9\u9762\u7684\u6027\u80FD\u95EE\u9898\u3002</li><li>\u907F\u514D\u65E5\u5FD7\u6587\u4EF6\u8FC7\u65E7\uFF0C\u5BFC\u81F4\u5B58\u50A8\u7A7A\u95F4\u5360\u7528\u8FC7\u591A\u3002</li></ul><p>\u7F3A\u70B9\uFF1A</p><ul><li>\u5982\u679C\u65E5\u5FD7\u8F6E\u8F6C\u8BBE\u7F6E\u4E0D\u5F53\uFF0C\u53EF\u80FD\u4F1A\u5BFC\u81F4\u65E5\u5FD7\u6587\u4EF6\u4E0D\u5B8C\u6574\uFF0C\u6216\u8005\u65E5\u5FD7\u6587\u4EF6\u6CA1\u6709\u53CA\u65F6\u8F6E\u8F6C\uFF0C\u5BFC\u81F4\u5B58\u50A8\u7A7A\u95F4\u5360\u7528\u8FC7\u591A\u3002</li></ul><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="60.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="62.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,58),M=t("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),O={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},K=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),A=t(")"),U=t("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),q={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},B=t("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function N(S,L){const i=d("ExternalLinkIcon"),r=d("RouterLink");return n(),s("div",null,[e("ul",null,[e("li",null,[e("a",u,[p,l(i)])])]),b,m,_,e("blockquote",null,[e("p",null,[f,e("a",k,[P,l(i)])])]),v,e("ul",null,[e("li",null,[g,e("a",x,[y,l(i)]),C]),D,E]),I,e("ul",null,[e("li",null,[e("p",null,[l(r,{to:"/"},{default:h(()=>[M]),_:1})])]),e("li",null,[e("p",null,[e("a",O,[K,l(i)]),A])]),e("li",null,[e("p",null,[U,e("a",q,[B,l(i)])])])])])}const R=o(c,[["render",N],["__file","61.html.vue"]]);export{R as default};
