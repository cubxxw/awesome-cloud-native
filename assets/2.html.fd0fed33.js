import{_ as e,o as r,c as i,e as o}from"./app.864491b6.js";const l={},a=o('<h1 id="\u2601\uFE0Fdocker\u7CFB\u7EDF\u67B6\u6784" tabindex="-1"><a class="header-anchor" href="#\u2601\uFE0Fdocker\u7CFB\u7EDF\u67B6\u6784" aria-hidden="true">#</a> \u2601\uFE0Fdocker\u7CFB\u7EDF\u67B6\u6784</h1><p>[toc]</p><h2 id="docker-\u7684\u603B\u67B6\u6784\u56FE" tabindex="-1"><a class="header-anchor" href="#docker-\u7684\u603B\u67B6\u6784\u56FE" aria-hidden="true">#</a> Docker \u7684\u603B\u67B6\u6784\u56FE</h2><img src="https://s2.loli.net/2022/05/08/AWZcyjfvLDJmEnq.jpg" alt="img" style="zoom:33%;"><h3 id="\u56FE\u89E3" tabindex="-1"><a class="header-anchor" href="#\u56FE\u89E3" aria-hidden="true">#</a> \u56FE\u89E3</h3><p><strong>docker \u662F\u4E00\u4E2A C/S \u6A21\u5F0F\u7684\u67B6\u6784\uFF0C\u540E\u7AEF\u662F\u4E00\u4E2A\u677E\u8026\u5408\u67B6\u6784\uFF0C\u6A21\u5757\u5404\u53F8\u5176\u804C\u3002</strong></p><p><strong>C/S\uFF1Aclient-server</strong></p><ol><li>\u7528\u6237\u662F\u4F7F\u7528 Docker Client \u4E0E Docker Daemon \u5EFA\u7ACB\u901A\u4FE1\uFF0C\u5E76\u53D1\u9001\u8BF7\u6C42\u7ED9\u540E\u8005\u3002</li><li>Docker Daemon \u4F5C\u4E3A Docker \u67B6\u6784\u4E2D\u7684\u4E3B\u4F53\u90E8\u5206\uFF0C\u9996\u5148\u63D0\u4F9B Server \u7684\u529F\u80FD\u4F7F\u5176\u53EF\u4EE5\u63A5\u53D7 Docker Client \u7684\u8BF7\u6C42\uFF1B</li><li>Engine \u6267\u884C Docker \u5185\u90E8\u7684\u4E00\u7CFB\u5217\u5DE5\u4F5C\uFF0C\u6BCF\u4E00\u9879\u5DE5\u4F5C\u90FD\u662F\u4EE5\u4E00\u4E2A Job \u7684\u5F62\u5F0F\u7684\u5B58\u5728(redis,mysql\u2026.)\u3002</li><li>Job \u7684\u8FD0\u884C\u8FC7\u7A0B\u4E2D\uFF0C\u5F53\u9700\u8981\u5BB9\u5668\u955C\u50CF\u65F6\uFF0C\u5219\u4ECE Docker Registry \u4E2D\u4E0B\u8F7D\u955C\u50CF\uFF0C\u5E76\u901A\u8FC7\u955C\u50CF\u7BA1\u7406\u9A71\u52A8 graphdriver \u5C06\u4E0B\u8F7D\u955C\u50CF\u4EE5 Graph \u7684\u5F62\u5F0F\u5B58\u50A8\uFF1B</li><li>\u5F53\u9700\u8981\u4E3A Docker \u521B\u5EFA\u7F51\u7EDC\u73AF\u5883\u65F6\uFF0C\u901A\u8FC7\u7F51\u7EDC\u7BA1\u7406\u9A71\u52A8 networkdriver \u521B\u5EFA\u5E76\u914D\u7F6E Docker \u5BB9\u5668\u7F51\u7EDC\u73AF\u5883\uFF1B</li><li>\u5F53\u9700\u8981\u9650\u5236 Docker \u5BB9\u5668\u8FD0\u884C\u8D44\u6E90\u6216\u6267\u884C\u7528\u6237\u6307\u4EE4\u7B49\u64CD\u4F5C\u65F6\uFF0C\u5219\u901A\u8FC7 execdriver \u6765\u5B8C\u6210\u3002</li><li>libcontainer \u662F\u4E00\u9879\u72EC\u7ACB\u7684\u5BB9\u5668\u7BA1\u7406\u5305\uFF0Cnetworkdriver \u4EE5\u53CA execdriver \u90FD\u662F\u901A\u8FC7 libcontainer \u6765\u5B9E\u73B0\u5177\u4F53\u5BF9\u5BB9\u5668\u8FDB\u884C\u7684\u64CD\u4F5C\u3002</li></ol><h2 id="docker-\u5404\u6A21\u5757\u7EC4\u4EF6\u5206\u6790" tabindex="-1"><a class="header-anchor" href="#docker-\u5404\u6A21\u5757\u7EC4\u4EF6\u5206\u6790" aria-hidden="true">#</a> Docker \u5404\u6A21\u5757\u7EC4\u4EF6\u5206\u6790</h2><h3 id="docker-client\u3010\u53D1\u8D77\u8BF7\u6C42\u3011" tabindex="-1"><a class="header-anchor" href="#docker-client\u3010\u53D1\u8D77\u8BF7\u6C42\u3011" aria-hidden="true">#</a> Docker Client\u3010\u53D1\u8D77\u8BF7\u6C42\u3011</h3><ol><li>Docker Client \u662F\u548C Docker Daemon \u5EFA\u7ACB\u901A\u4FE1\u7684\u5BA2\u6237\u7AEF\u3002\u7528\u6237\u4F7F\u7528\u7684\u53EF\u6267\u884C\u6587\u4EF6\u4E3A docker\uFF08\u7C7B\u4F3C\u53EF\u6267\u884C\u811A\u672C\u7684\u547D\u4EE4\uFF09\uFF0Cdocker \u547D\u4EE4\u540E\u63A5\u53C2\u6570\u7684\u5F62\u5F0F\u6765\u5B9E\u73B0\u4E00\u4E2A\u5B8C\u6574\u7684\u8BF7\u6C42\u547D\u4EE4\uFF08\u4F8B\u5982 docker images\uFF0Cdocker \u4E3A\u547D\u4EE4\u4E0D\u53EF\u53D8\uFF0Cimages \u4E3A\u53C2\u6570\u53EF\u53D8\uFF09\u3002</li><li>Docker Client \u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u4E09\u79CD\u65B9\u5F0F\u548C Docker Daemon \u5EFA\u7ACB\u901A\u4FE1\uFF1Atcp://host:port\uFF0Cunix://path_to_socket \u548C fd://socketfd\u3002</li><li>Docker Client \u53D1\u9001\u5BB9\u5668\u7BA1\u7406\u8BF7\u6C42\u540E\uFF0C\u7531 Docker Daemon \u63A5\u53D7\u5E76\u5904\u7406\u8BF7\u6C42\uFF0C\u5F53 Docker Client \u63A5\u6536\u5230\u8FD4\u56DE\u7684\u8BF7\u6C42\u76F8\u5E94\u5E76\u7B80\u5355\u5904\u7406\u540E\uFF0CDocker Client \u4E00\u6B21\u5B8C\u6574\u7684\u751F\u547D\u5468\u671F\u5C31\u7ED3\u675F\u4E86\u3002[\u4E00\u6B21\u5B8C\u6574\u7684\u8BF7\u6C42\uFF1A\u53D1\u9001\u8BF7\u6C42\u2192\u5904\u7406\u8BF7\u6C42\u2192\u8FD4\u56DE\u7ED3\u679C]\uFF0C\u4E0E\u4F20\u7EDF\u7684 C/S \u67B6\u6784\u8BF7\u6C42\u6D41\u7A0B\u5E76\u65E0\u4E0D\u540C\u3002</li></ol><h3 id="docker-daemon\u3010\u540E\u53F0\u5B88\u62A4\u8FDB\u7A0B\u3011" tabindex="-1"><a class="header-anchor" href="#docker-daemon\u3010\u540E\u53F0\u5B88\u62A4\u8FDB\u7A0B\u3011" aria-hidden="true">#</a> Docker Daemon\u3010\u540E\u53F0\u5B88\u62A4\u8FDB\u7A0B\u3011</h3><ul><li><p>Docker Daemon \u7684\u67B6\u6784\u56FE</p><p><img src="https://s2.loli.net/2022/05/08/JFbxhyeoDKrEcYv.jpg" alt="img"></p></li></ul><h4 id="docker-server\u3010\u8C03\u5EA6\u5206\u53D1\u8BF7\u6C42\u3011" tabindex="-1"><a class="header-anchor" href="#docker-server\u3010\u8C03\u5EA6\u5206\u53D1\u8BF7\u6C42\u3011" aria-hidden="true">#</a> Docker Server\u3010\u8C03\u5EA6\u5206\u53D1\u8BF7\u6C42\u3011</h4><ul><li>Docker Server \u7684\u67B6\u6784\u56FE</li></ul><p><img src="https://s2.loli.net/2022/05/08/wmt5A9KnYLIuaCs.jpg" alt="img"></p><ol><li>Docker Server \u76F8\u5F53\u4E8E C/S \u67B6\u6784\u7684\u670D\u52A1\u7AEF\u3002\u529F\u80FD\u4E3A\u63A5\u53D7\u5E76\u8C03\u5EA6\u5206\u53D1 Docker Client \u53D1\u9001\u7684\u8BF7\u6C42\u3002\u63A5\u53D7\u8BF7\u6C42\u540E\uFF0CServer \u901A\u8FC7\u8DEF\u7531\u4E0E\u5206\u53D1\u8C03\u5EA6\uFF0C\u627E\u5230\u76F8\u5E94\u7684 Handler \u6765\u6267\u884C\u8BF7\u6C42\u3002</li><li>\u5728 Docker \u7684\u542F\u52A8\u8FC7\u7A0B\u4E2D\uFF0C\u901A\u8FC7\u5305 gorilla/mux\uFF0C\u521B\u5EFA\u4E86\u4E00\u4E2A mux.Router\uFF0C\u63D0\u4F9B\u8BF7\u6C42\u7684\u8DEF\u7531\u529F\u80FD\u3002\u5728 Golang \u4E2D\uFF0Cgorilla/mux \u662F\u4E00\u4E2A\u5F3A\u5927\u7684 URL \u8DEF\u7531\u5668\u4EE5\u53CA\u8C03\u5EA6\u5206\u53D1\u5668\u3002\u8BE5 mux.Router \u4E2D\u6DFB\u52A0\u4E86\u4F17\u591A\u7684\u8DEF\u7531\u9879\uFF0C\u6BCF\u4E00\u4E2A\u8DEF\u7531\u9879\u7531 HTTP \u8BF7\u6C42\u65B9\u6CD5\uFF08PUT\u3001POST\u3001GET \u6216 DELETE\uFF09\u3001URL\u3001Handler \u4E09\u90E8\u5206\u7EC4\u6210\u3002</li><li>\u521B\u5EFA\u5B8C mux.Router \u4E4B\u540E\uFF0CDocker \u5C06 Server \u7684\u76D1\u542C\u5730\u5740\u4EE5\u53CA mux.Router \u4F5C\u4E3A\u53C2\u6570\uFF0C\u521B\u5EFA\u4E00\u4E2A httpSrv=http.Server{}\uFF0C\u6700\u7EC8\u6267\u884C httpSrv.Serve() \u4E3A\u8BF7\u6C42\u670D\u52A1\u3002</li><li>\u5728 Server \u7684\u670D\u52A1\u8FC7\u7A0B\u4E2D\uFF0CServer \u5728 listener \u4E0A\u63A5\u53D7 Docker Client \u7684\u8BBF\u95EE\u8BF7\u6C42\uFF0C\u5E76\u521B\u5EFA\u4E00\u4E2A\u5168\u65B0\u7684 goroutine \u6765\u670D\u52A1\u8BE5\u8BF7\u6C42\u3002\u5728 goroutine \u4E2D\uFF0C\u9996\u5148\u8BFB\u53D6\u8BF7\u6C42\u5185\u5BB9\uFF0C\u7136\u540E\u505A\u89E3\u6790\u5DE5\u4F5C\uFF0C\u63A5\u7740\u627E\u5230\u76F8\u5E94\u7684\u8DEF\u7531\u9879\uFF0C\u968F\u540E\u8C03\u7528\u76F8\u5E94\u7684 Handler \u6765\u5904\u7406\u8BE5\u8BF7\u6C42\uFF0C\u6700\u540E Handler \u5904\u7406\u5B8C\u8BF7\u6C42\u4E4B\u540E\u56DE\u590D\u8BE5\u8BF7\u6C42\u3002</li></ol><h4 id="engine" tabindex="-1"><a class="header-anchor" href="#engine" aria-hidden="true">#</a> Engine</h4><ol><li>Engine \u662F Docker \u67B6\u6784\u4E2D\u7684\u8FD0\u884C\u5F15\u64CE\uFF0C\u540C\u65F6\u4E5F Docker \u8FD0\u884C\u7684\u6838\u5FC3\u6A21\u5757\u3002\u5B83\u626E\u6F14 Docker container \u5B58\u50A8\u4ED3\u5E93\u7684\u89D2\u8272\uFF0C\u5E76\u4E14\u901A\u8FC7\u6267\u884C job \u7684\u65B9\u5F0F\u6765\u64CD\u7EB5\u7BA1\u7406\u8FD9\u4E9B\u5BB9\u5668\u3002</li><li>\u5728 Engine \u6570\u636E\u7ED3\u6784\u7684\u8BBE\u8BA1\u4E0E\u5B9E\u73B0\u8FC7\u7A0B\u4E2D\uFF0C\u6709\u4E00\u4E2A handler \u5BF9\u8C61\u3002\u8BE5 handler \u5BF9\u8C61\u5B58\u50A8\u7684\u90FD\u662F\u5173\u4E8E\u4F17\u591A\u7279\u5B9A job \u7684 handler \u5904\u7406\u8BBF\u95EE\u3002\u4E3E\u4F8B\u8BF4\u660E\uFF0CEngine \u7684 handler \u5BF9\u8C61\u4E2D\u6709\u4E00\u9879\u4E3A\uFF1A{&quot;create&quot;: daemon.ContainerCreate,}\uFF0C\u5219\u8BF4\u660E\u5F53\u540D\u4E3A &quot;create&quot; \u7684 job \u5728\u8FD0\u884C\u65F6\uFF0C\u6267\u884C\u7684\u662F daemon.ContainerCreate \u7684 handler\u3002</li></ol><h4 id="job" tabindex="-1"><a class="header-anchor" href="#job" aria-hidden="true">#</a> job</h4><ol><li>\u4E00\u4E2A Job \u53EF\u4EE5\u8BA4\u4E3A\u662F Docker \u67B6\u6784\u4E2D Engine \u5185\u90E8\u6700\u57FA\u672C\u7684\u5DE5\u4F5C\u6267\u884C\u5355\u5143\u3002Docker \u53EF\u4EE5\u505A\u7684\u6BCF\u4E00\u9879\u5DE5\u4F5C\uFF0C\u90FD\u53EF\u4EE5\u62BD\u8C61\u4E3A\u4E00\u4E2A job\u3002\u4F8B\u5982\uFF1A\u5728\u5BB9\u5668\u5185\u90E8\u8FD0\u884C\u4E00\u4E2A\u8FDB\u7A0B\uFF0C\u8FD9\u662F\u4E00\u4E2A job\uFF1B\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u5BB9\u5668\uFF0C\u8FD9\u662F\u4E00\u4E2A job\u3002Docker Server \u7684\u8FD0\u884C\u8FC7\u7A0B\u4E5F\u662F\u4E00\u4E2A job\uFF0C\u540D\u4E3A serveapi\u3002</li><li>Job \u7684\u8BBE\u8BA1\u8005\uFF0C\u628A Job \u8BBE\u8BA1\u5F97\u4E0E Unix \u8FDB\u7A0B\u76F8\u4EFF\u3002\u6BD4\u5982\u8BF4\uFF1AJob \u6709\u4E00\u4E2A\u540D\u79F0\uFF0C\u6709\u53C2\u6570\uFF0C\u6709\u73AF\u5883\u53D8\u91CF\uFF0C\u6709\u6807\u51C6\u7684\u8F93\u5165\u8F93\u51FA\uFF0C\u6709\u9519\u8BEF\u5904\u7406\uFF0C\u6709\u8FD4\u56DE\u72B6\u6001\u7B49\u3002</li></ol><h3 id="docker-registry\u3010\u955C\u50CF\u6CE8\u518C\u4E2D\u5FC3\u3011" tabindex="-1"><a class="header-anchor" href="#docker-registry\u3010\u955C\u50CF\u6CE8\u518C\u4E2D\u5FC3\u3011" aria-hidden="true">#</a> Docker Registry\u3010\u955C\u50CF\u6CE8\u518C\u4E2D\u5FC3\u3011</h3><ol><li>Docker Registry \u662F\u4E00\u4E2A\u5B58\u50A8\u5BB9\u5668\u955C\u50CF\u7684\u4ED3\u5E93\uFF08\u6CE8\u518C\u4E2D\u5FC3\uFF09\uFF0C\u53EF\u7406\u89E3\u4E3A\u4E91\u7AEF\u955C\u50CF\u4ED3\u5E93\uFF0C\u6309 repository \u6765\u5206\u7C7B\uFF0Cdocker pull \u6309\u7167 [repository]:[tag] \u6765\u7CBE\u786E\u5B9A\u4E49\u4E00\u4E2A image\u3002</li><li>\u5728 Docker \u7684\u8FD0\u884C\u8FC7\u7A0B\u4E2D\uFF0CDocker Daemon \u4F1A\u4E0E Docker Registry \u901A\u4FE1\uFF0C\u5E76\u5B9E\u73B0\u641C\u7D22\u955C\u50CF\u3001\u4E0B\u8F7D\u955C\u50CF\u3001\u4E0A\u4F20\u955C\u50CF\u4E09\u4E2A\u529F\u80FD\uFF0C\u8FD9\u4E09\u4E2A\u529F\u80FD\u5BF9\u5E94\u7684 job \u540D\u79F0\u5206\u522B\u4E3A &quot;<code>search</code>&quot;\uFF0C&quot;<code>pull</code>&quot; \u4E0E &quot;<code>push</code>&quot;\u3002</li><li>\u53EF\u5206\u4E3A\u516C\u6709\u4ED3\u5E93\uFF08docker hub\uFF09\u548C\u79C1\u6709\u4ED3\u5E93\u3002</li></ol><h3 id="graph\u3010docker-\u5185\u90E8\u6570\u636E\u5E93\u3011" tabindex="-1"><a class="header-anchor" href="#graph\u3010docker-\u5185\u90E8\u6570\u636E\u5E93\u3011" aria-hidden="true">#</a> Graph\u3010docker \u5185\u90E8\u6570\u636E\u5E93\u3011</h3><p>Graph \u7684\u67B6\u6784\u56FE</p><img src="https://s2.loli.net/2022/05/08/RgSq5sTlQA3v6ck.jpg" alt="img" style="zoom:67%;"><h4 id="repository" tabindex="-1"><a class="header-anchor" href="#repository" aria-hidden="true">#</a> Repository</h4><ol><li>\u5DF2\u4E0B\u8F7D\u955C\u50CF\u7684\u4FDD\u7BA1\u8005\uFF08\u5305\u62EC\u4E0B\u8F7D\u955C\u50CF\u548C dockerfile \u6784\u5EFA\u7684\u955C\u50CF\uFF09\u3002</li><li>\u4E00\u4E2A repository \u8868\u793A\u67D0\u7C7B\u955C\u50CF\u7684\u4ED3\u5E93\uFF08\u4F8B\u5982 Ubuntu\uFF09\uFF0C\u540C\u4E00\u4E2A repository \u5185\u7684\u955C\u50CF\u7528 tag \u6765\u533A\u5206\uFF08\u8868\u793A\u540C\u4E00\u7C7B\u955C\u50CF\u7684\u4E0D\u540C\u6807\u7B7E\u6216\u7248\u672C\uFF09\u3002\u4E00\u4E2A registry \u5305\u542B\u591A\u4E2A repository\uFF0C\u4E00\u4E2A repository \u5305\u542B\u540C\u7C7B\u578B\u7684\u591A\u4E2A image\u3002</li><li>\u955C\u50CF\u7684\u5B58\u50A8\u7C7B\u578B\u6709 aufs\uFF0Cdevicemapper,Btrfs\uFF0CVfs \u7B49\u3002\u5176\u4E2D centos \u7CFB\u7EDF\u4F7F\u7528 devicemapper \u7684\u5B58\u50A8\u7C7B\u578B\u3002</li><li>\u540C\u65F6\u5728 Graph \u7684\u672C\u5730\u76EE\u5F55\u4E2D\uFF0C\u5173\u4E8E\u6BCF\u4E00\u4E2A\u7684\u5BB9\u5668\u955C\u50CF\uFF0C\u5177\u4F53\u5B58\u50A8\u7684\u4FE1\u606F\u6709\uFF1A\u8BE5\u5BB9\u5668\u955C\u50CF\u7684\u5143\u6570\u636E\uFF0C\u5BB9\u5668\u955C\u50CF\u7684\u5927\u5C0F\u4FE1\u606F\uFF0C\u4EE5\u53CA\u8BE5\u5BB9\u5668\u955C\u50CF\u6240\u4EE3\u8868\u7684\u5177\u4F53 rootfs\u3002</li></ol><h4 id="graphdb" tabindex="-1"><a class="header-anchor" href="#graphdb" aria-hidden="true">#</a> GraphDB</h4><ol><li>\u5DF2\u4E0B\u8F7D\u5BB9\u5668\u955C\u50CF\u4E4B\u95F4\u5173\u7CFB\u7684\u8BB0\u5F55\u8005\u3002</li><li>GraphDB \u662F\u4E00\u4E2A\u6784\u5EFA\u5728 SQLite \u4E4B\u4E0A\u7684\u5C0F\u578B\u56FE\u6570\u636E\u5E93\uFF0C\u5B9E\u73B0\u4E86\u8282\u70B9\u7684\u547D\u540D\u4EE5\u53CA\u8282\u70B9\u4E4B\u95F4\u5173\u8054\u5173\u7CFB\u7684\u8BB0\u5F55</li></ol><h3 id="driver\u3010\u6267\u884C\u90E8\u5206\u3011" tabindex="-1"><a class="header-anchor" href="#driver\u3010\u6267\u884C\u90E8\u5206\u3011" aria-hidden="true">#</a> Driver\u3010\u6267\u884C\u90E8\u5206\u3011</h3><p>Driver \u662F Docker \u67B6\u6784\u4E2D\u7684\u9A71\u52A8\u6A21\u5757\u3002\u901A\u8FC7 Driver \u9A71\u52A8\uFF0CDocker \u53EF\u4EE5\u5B9E\u73B0\u5BF9 Docker \u5BB9\u5668\u6267\u884C\u73AF\u5883\u7684\u5B9A\u5236\u3002\u5373 Graph \u8D1F\u8D23\u955C\u50CF\u7684\u5B58\u50A8\uFF0CDriver \u8D1F\u8D23\u5BB9\u5668\u7684\u6267\u884C\u3002</p><ol><li><h4 id="graphdriver" tabindex="-1"><a class="header-anchor" href="#graphdriver" aria-hidden="true">#</a> graphdriver</h4><ul><li><p>graphdriver \u67B6\u6784\u56FE</p><img src="https://s2.loli.net/2022/05/08/AHdQ2EIVw3xtWYU.jpg" alt="img" style="zoom:50%;"></li></ul><ol><li>graphdriver \u4E3B\u8981\u7528\u4E8E\u5B8C\u6210\u5BB9\u5668\u955C\u50CF\u7684\u7BA1\u7406\uFF0C\u5305\u62EC\u5B58\u50A8\u4E0E\u83B7\u53D6\u3002</li><li>\u5B58\u50A8\uFF1Adocker pull \u4E0B\u8F7D\u7684\u955C\u50CF\u7531 graphdriver \u5B58\u50A8\u5230\u672C\u5730\u7684\u6307\u5B9A\u76EE\u5F55\uFF08Graph \u4E2D\uFF09\u3002</li><li>\u83B7\u53D6\uFF1Adocker run\uFF08create\uFF09\u7528\u955C\u50CF\u6765\u521B\u5EFA\u5BB9\u5668\u7684\u65F6\u5019\u7531 graphdriver \u5230\u672C\u5730 Graph \u4E2D\u83B7\u53D6\u955C\u50CF\u3002</li></ol></li><li><h4 id="networkdriver" tabindex="-1"><a class="header-anchor" href="#networkdriver" aria-hidden="true">#</a> networkdriver</h4><ul><li><p>networkdriver \u7684\u67B6\u6784\u56FE</p><img src="https://s2.loli.net/2022/05/08/8znfrJvIRK4OYAp.jpg" alt="img" style="zoom:50%;"></li></ul><ol><li>networkdriver \u7684\u7528\u9014\u662F\u5B8C\u6210 Docker \u5BB9\u5668\u7F51\u7EDC\u73AF\u5883\u7684\u914D\u7F6E\uFF0C\u5176\u4E2D\u5305\u62EC <ul><li>Docker \u542F\u52A8\u65F6\u4E3A Docker \u73AF\u5883\u521B\u5EFA\u7F51\u6865\uFF1B</li><li>Docker \u5BB9\u5668\u521B\u5EFA\u65F6\u4E3A\u5176\u521B\u5EFA\u4E13\u5C5E\u865A\u62DF\u7F51\u5361\u8BBE\u5907\uFF1B</li><li>Docker \u5BB9\u5668\u5206\u914D IP\u3001\u7AEF\u53E3\u5E76\u4E0E\u5BBF\u4E3B\u673A\u505A\u7AEF\u53E3\u6620\u5C04\uFF0C\u8BBE\u7F6E\u5BB9\u5668\u9632\u706B\u5899\u7B56\u7565\u7B49\u3002</li></ul></li></ol></li><li><h4 id="execdriver" tabindex="-1"><a class="header-anchor" href="#execdriver" aria-hidden="true">#</a> execdriver</h4><ul><li><p>execdriver \u7684\u67B6\u6784\u56FE</p><img src="https://s2.loli.net/2022/05/08/zxtojRYDAZ21k6P.jpg" alt="img" style="zoom:50%;"></li></ul><ol><li>execdriver \u4F5C\u4E3A Docker \u5BB9\u5668\u7684\u6267\u884C\u9A71\u52A8\uFF0C\u8D1F\u8D23\u521B\u5EFA\u5BB9\u5668\u8FD0\u884C\u547D\u540D\u7A7A\u95F4\uFF0C\u8D1F\u8D23\u5BB9\u5668\u8D44\u6E90\u4F7F\u7528\u7684\u7EDF\u8BA1\u4E0E\u9650\u5236\uFF0C\u8D1F\u8D23\u5BB9\u5668\u5185\u90E8\u8FDB\u7A0B\u7684\u771F\u6B63\u8FD0\u884C\u7B49\u3002</li></ol></li><li><p>\u73B0\u5728 execdriver \u9ED8\u8BA4\u4F7F\u7528 native \u9A71\u52A8\uFF0C\u4E0D\u4F9D\u8D56\u4E8E LXC\u3002</p></li></ol><h3 id="libcontainer\u3010\u51FD\u6570\u5E93\u3011" tabindex="-1"><a class="header-anchor" href="#libcontainer\u3010\u51FD\u6570\u5E93\u3011" aria-hidden="true">#</a> libcontainer\u3010\u51FD\u6570\u5E93\u3011</h3><ul><li><p>libcontainer \u7684\u67B6\u6784\u56FE</p><img src="https://s2.loli.net/2022/05/08/xnWCdfLy5REp7UV.jpg" alt="img" style="zoom:50%;"></li></ul><ol><li>libcontainer \u662F Docker \u67B6\u6784\u4E2D\u4E00\u4E2A\u4F7F\u7528 Go \u8BED\u8A00\u8BBE\u8BA1\u5B9E\u73B0\u7684\u5E93\uFF0C\u8BBE\u8BA1\u521D\u8877\u662F\u5E0C\u671B\u8BE5\u5E93\u53EF\u4EE5\u4E0D\u4F9D\u9760\u4EFB\u4F55\u4F9D\u8D56\uFF0C\u76F4\u63A5\u8BBF\u95EE\u5185\u6838\u4E2D\u4E0E\u5BB9\u5668\u76F8\u5173\u7684 API\u3002</li><li><strong>Docker \u53EF\u4EE5\u76F4\u63A5\u8C03\u7528 libcontainer\uFF0C\u800C\u6700\u7EC8\u64CD\u7EB5\u5BB9\u5668\u7684 namespace\u3001cgroups\u3001apparmor\u3001\u7F51\u7EDC\u8BBE\u5907\u4EE5\u53CA\u9632\u706B\u5899\u89C4\u5219\u7B49\u3002</strong></li><li>libcontainer \u63D0\u4F9B\u4E86\u4E00\u6574\u5957\u6807\u51C6\u7684\u63A5\u53E3\u6765\u6EE1\u8DB3\u4E0A\u5C42\u5BF9\u5BB9\u5668\u7BA1\u7406\u7684\u9700\u6C42\u3002\u6216\u8005\u8BF4\uFF0Clibcontainer \u5C4F\u853D\u4E86 Docker \u4E0A\u5C42\u5BF9\u5BB9\u5668\u7684\u76F4\u63A5\u7BA1\u7406\u3002</li></ol><h3 id="docker-container\u3010\u670D\u52A1\u4EA4\u4ED8\u7684\u6700\u7EC8\u5F62\u5F0F\u3011" tabindex="-1"><a class="header-anchor" href="#docker-container\u3010\u670D\u52A1\u4EA4\u4ED8\u7684\u6700\u7EC8\u5F62\u5F0F\u3011" aria-hidden="true">#</a> docker container\u3010\u670D\u52A1\u4EA4\u4ED8\u7684\u6700\u7EC8\u5F62\u5F0F\u3011</h3><ul><li><p>container \u67B6\u6784</p><img src="https://s2.loli.net/2022/05/08/IA1V6OFJQTNGyPj.jpg" alt="img" style="zoom:50%;"></li></ul><ol><li>Docker container\uFF08Docker \u5BB9\u5668\uFF09\u662F Docker \u67B6\u6784\u4E2D\u670D\u52A1\u4EA4\u4ED8\u7684\u6700\u7EC8\u4F53\u73B0\u5F62\u5F0F\u3002</li><li>Docker \u6309\u7167\u7528\u6237\u7684\u9700\u6C42\u4E0E\u6307\u4EE4\uFF0C\u8BA2\u5236\u76F8\u5E94\u7684 Docker \u5BB9\u5668\uFF1A <ul><li>\u7528\u6237\u901A\u8FC7\u6307\u5B9A\u5BB9\u5668\u955C\u50CF\uFF0C\u4F7F\u5F97 Docker \u5BB9\u5668\u53EF\u4EE5\u81EA\u5B9A\u4E49 rootfs \u7B49\u6587\u4EF6\u7CFB\u7EDF\uFF1B</li><li>\u7528\u6237\u901A\u8FC7\u6307\u5B9A\u8BA1\u7B97\u8D44\u6E90\u7684\u914D\u989D\uFF0C\u4F7F\u5F97 Docker \u5BB9\u5668\u4F7F\u7528\u6307\u5B9A\u7684\u8BA1\u7B97\u8D44\u6E90\uFF1B</li><li>\u7528\u6237\u901A\u8FC7\u914D\u7F6E\u7F51\u7EDC\u53CA\u5176\u5B89\u5168\u7B56\u7565\uFF0C\u4F7F\u5F97 Docker \u5BB9\u5668\u62E5\u6709\u72EC\u7ACB\u4E14\u5B89\u5168\u7684\u7F51\u7EDC\u73AF\u5883\uFF1B</li><li>\u7528\u6237\u901A\u8FC7\u6307\u5B9A\u8FD0\u884C\u7684\u547D\u4EE4\uFF0C\u4F7F\u5F97 Docker \u5BB9\u5668\u6267\u884C\u6307\u5B9A\u7684\u5DE5\u4F5C\u3002</li></ul></li></ol>',39),t=[a];function c(n,d){return r(),i("div",null,t)}const s=e(l,[["render",c],["__file","2.html.vue"]]);export{s as default};
