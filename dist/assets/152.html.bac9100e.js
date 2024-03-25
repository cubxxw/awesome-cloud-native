import{_ as i,r as o,o as p,c as l,a as n,b as a,d as e,e as t}from"./app.9f14a191.js";const c={},r=e('<h1 id="openim-\u7684-api-\u63A5\u53E3\u8BBE\u8BA1" tabindex="-1"><a class="header-anchor" href="#openim-\u7684-api-\u63A5\u53E3\u8BBE\u8BA1" aria-hidden="true">#</a> OpenIM \u7684 API \u63A5\u53E3\u8BBE\u8BA1</h1><h2 id="\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898" aria-hidden="true">#</a> \u95EE\u9898</h2><p>\u6211\u4EEC\u76EE\u524D\u4F7F\u7528\u7C7B\u4F3C http restful \u7684\u65B9\u5F0F\u8FDB\u884C\u5BF9\u5916\u5BF9\u5185\u63D0\u4F9B\u670D\u52A1\uFF0C\u4F46\u662F\u6211\u4EEC\u4E4B\u524D\u7684 API \u7BA1\u7406\u5176\u5B9E\u662F\u6BD4\u8F83\u6DF7\u4E71\u7684\uFF0C\u5206\u4E3A\u4EE5\u4E0B\u51E0\u79CD\u60C5\u51B5:</p><ol><li>\u66B4\u9732\u7ED9 web \u7684 api\uFF1A\u6709\u4F7F\u7528 swagger \u7684\uFF0C\u6709\u5728\u6587\u6863\u5E73\u53F0\u4E0A\u5199\u6587\u6863\u7684\uFF0C\u8FD8\u6709\u6CA1\u6709\u5199\u6587\u6863\u7684</li><li>\u66B4\u9732\u7ED9\u5176\u4ED6\u670D\u52A1\u8C03\u7528\u7684 api: \u6709\u6CE8\u518C\u5230\u5185\u90E8\u7684\u63A5\u53E3\u7F51\u5173\u7684\uFF0C\u4F46\u662F\u5185\u90E8\u7684\u63A5\u53E3\u7F51\u5173\u4E0A\u6709\u7684\u6709\u53C2\u6570\uFF0C\u6709\u7684\u6CA1\u6709\uFF0C\u6CA1\u6709\u8FD4\u56DE\u503C\u5B9A\u4E49</li></ol><p>\u6240\u4EE5\u5C31\u5B58\u5728\u5F88\u591A\u95EE\u9898:</p><ol><li>\u60F3\u8981\u63A5\u53E3\u4E0D\u77E5\u9053\u4ECE\u54EA\u513F\u627E\uFF0C\u53EA\u80FD\u5230\u5904\u95EE\u4EBA</li><li>\u6709\u65F6\u5019\u4ECE\u5185\u90E8\u7F51\u5173\u5E73\u53F0\u4E0A\u627E\u5230\u63A5\u53E3\u4F46\u662F\u4E0D\u77E5\u9053\u600E\u4E48\u8C03\u7528\uFF0C\u6CA1\u6709\u5199\u4EFB\u4F55\u53C2\u6570\uFF0C\u6709\u7684\u5199\u4E86\u8FD8\u6709\u53EF\u80FD\u662F\u9519\u7684</li><li>\u6709\u7684\u538B\u6839\u6CA1\u6709\u63A5\u53E3\u6587\u6863\uFF0C\u5BF9\u63A5\u7684\u540C\u5B66\u4E5F\u6CA1\u6709\u65F6\u95F4\u5199\uFF0C\u7136\u540E\u8BA9\u4F60\u76F4\u63A5\u770B\u4EE3\u7801</li><li>\u6709\u7684\u5BF9\u63A5\u540C\u5B66\u6254\u7ED9\u4F60\u4E00\u4E2A\u63A5\u53E3\u6587\u6863\uFF0C\u7136\u540E\u8BD5\u4E86\u534A\u5929\u53D1\u73B0\uFF0C\u6709\u95EE\u9898\uFF0C\u6C9F\u901A\u6392\u67E5\u4E4B\u540E\u53D1\u73B0\u6587\u6863\u5F88\u4E45\u6CA1\u6709\u66F4\u65B0\u4E86 \uFF01\uFF01\uFF01</li></ol><h2 id="\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u65B9\u6CD5" aria-hidden="true">#</a> \u65B9\u6CD5</h2><p>\u5229\u7528 protobuf \u6765\u5B9A\u4E49\u63A5\u53E3\u7684\u65B9\u5F0F\u975E\u5E38\u4EE4\u4EBA\u5FC3\u52A8\uFF0C\u56E0\u4E3A protobuf \u5F53\u4E2D\u5305\u542B\u4E86\u63A5\u53E3\u7684\u51FD\u6570\u7B7E\u540D\uFF0C\u5165\u53C2\u548C\u8FD4\u56DE\u503C\u540C\u65F6\u8FD8\u652F\u6301\u6CE8\u91CA\uFF0C\u5C31\u662F\u4E00\u4EFD\u5929\u7136\u7684\u6587\u6863\uFF0C\u540C\u65F6\u4E5F\u4E0D\u7528\u62C5\u5FC3\u51FA\u73B0\u4EE3\u7801\u66F4\u65B0\u4E86\u4F46\u662F\u6587\u6863\u6CA1\u6709\u66F4\u65B0\u7684\u60C5\u51B5\uFF0C\u56E0\u4E3A\u5B83\u65E2\u662F\u6587\u6863\u4E5F\u662F\u4EE3\u7801\uFF0C\u670D\u52A1\u7AEF\u4E5F\u9700\u8981\u4F7F\u7528\uFF0C\u6240\u4EE5\u4EE3\u7801\u66F4\u65B0\u4E4B\u540E\u6587\u6863\u4E5F\u4E00\u5B9A\u4F1A\u66F4\u65B0\u3002\u81EA\u7136\u800C\u7136\u7684\u5C31\u5C11\u4E86\u5F88\u591A\u6C9F\u901A\u7684\u6210\u672C\u3002</p><p><img src="http://sm.nsddd.top/sm202311081708323.jpeg" alt="api \u5B9A\u4E49\u65B9\u5F0F (1).jpg"></p><p>\u5982\u4E0A\u56FE\u6240\u793A\u4E8E\u6B64\u540C\u65F6\u6211\u4EEC\u8FD8\u53EF\u4EE5\u5229\u7528 protobuf \u6587\u4EF6\u751F\u6210\u5BF9\u5E94\u8BED\u8A00\u7684\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0C\u5C31\u4E0D\u7528\u6BCF\u4E2A\u9879\u76EE\u90FD\u53BB\u7EF4\u62A4\u4E00\u5957 sdk \u4E86\uFF0C\u540C\u65F6\u6211\u4EEC\u4F7F\u7528\u63A5\u53E3\u751F\u6210\u4EE3\u7801\uFF0C\u5728 go \u5F53\u4E2D\u53EF\u4EE5\u4F7F\u7528 gomock \u975E\u5E38\u65B9\u4FBF\u7684\u5BF9\u4EE3\u7801\u8FDB\u884C mock\u3002</p><p>\u53C2\u8003\u9879\u76EE\uFF1A</p>',11),d={href:"https://github.com/googleapis/googleapis",target:"_blank",rel:"noopener noreferrer"},u=t("googleapis/googleapis"),v={href:"https://github.com/istio/api",target:"_blank",rel:"noopener noreferrer"},m=t("istio/api"),k=e(`<h3 id="api-project" tabindex="-1"><a class="header-anchor" href="#api-project" aria-hidden="true">#</a> API Project</h3><p>\u4F7F\u7528 protobuf \u5B9A\u4E49\u63A5\u53E3\u53EF\u4EE5\u89E3\u51B3\u6211\u4EEC\u627E\u5230 api \u6587\u6863\u4E4B\u540E\uFF0C\u6587\u6863\u4E0D\u51C6\u786E\uFF0C\u7F3A\u5931\u7684\u95EE\u9898\uFF0C\u4F46\u662F\u6211\u4EEC\u5E94\u8BE5\u5982\u4F55\u627E\u5230\u6211\u4EEC\u7684 api \u5462\uFF1F\u6211\u4EEC\u751F\u6210\u51FA\u7684 api \u6587\u4EF6\u8C03\u7528\u65B9\u5E94\u8BE5\u5982\u4F55\u5F15\u7528\u5462\uFF1F\u96BE\u9053\u6211\u4EEC\u7ED9\u6BCF\u4E2A\u8C03\u7528\u65B9\u90FD\u53BB\u5F00\u4E00\u4E2A\u9879\u76EE\u7684\u6743\u9650\u4E48\uFF1F\u90A3\u660E\u663E\u662F\u4E0D\u592A\u884C\u7684\uFF0C\u63A5\u4E0B\u6765\u6211\u4EEC\u5C31\u770B\u770B\u6211\u4EEC api \u8BE5\u5982\u4F55\u7BA1\u7406\u548C\u7EC4\u7EC7\u3002</p><p>\u7EDF\u4E00\u5B58\u653E api \u5B9A\u4E49\u6587\u6863\uFF0C\u7136\u540E\u901A\u8FC7 ci/cd \u751F\u6210\u5BF9\u5E94\u7684\u5BA2\u6237\u7AEF\u4EE3\u7801\u653E\u5230\u5404\u4E2A\u8BED\u8A00\u7684\u5B50\u4ED3\u5E93\u5F53\u4E2D</p><p><img src="http://sm.nsddd.top/sm202311081717157.png" alt="image-20231108171738096"></p><p>\u5DE5\u4F5C\u6D41\u7A0B\u5982\u4E0A\u56FE\u6240\u793A</p><ul><li>\u5F00\u53D1\u540C\u5B66\u4FEE\u6539\u4E86 proto \u6587\u4EF6\u5B9A\u4E49\u4E4B\u540E push \u5230\u5BF9\u5E94\u7684\u4E1A\u52A1\u5E94\u7528\u4ED3\u5E93\u5F53\u4E2D</li><li>\u7136\u540E\u89E6\u53D1 cicd \u6D41\u7A0B\u5C06 proto \u6587\u4EF6\u590D\u5236\u5230 api project \u5F53\u4E2D <ul><li>\u9996\u5148\u4F1A\u5BF9 proto \u6587\u4EF6\u8FDB\u884C\u9759\u6001\u4EE3\u7801\u5206\u6790\uFF0C\u67E5\u770B\u662F\u5426\u7B26\u5408\u89C4\u8303</li><li>\u7136\u540E clone api project \u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u5206\u652F</li><li>\u7136\u540E push \u4EE3\u7801\uFF0C\u521B\u5EFA\u4E00\u4E2A merge request \u8BF7\u6C42</li></ul></li><li>\u7136\u540E\u6211\u4EEC\u5BF9\u5E94\u8D1F\u8D23\u7684\u540C\u5B66\u6536\u5230 code review \u7684\u901A\u77E5\u4E4B\u540E\u8FDB\u884C code review\uFF0C\u6CA1\u6709\u95EE\u9898\u5C31\u4F1A\u5408\u5E76\u5230 api project \u7684\u4E3B\u5206\u652F\u5F53\u4E2D\u4E86</li><li>\u7136\u540E\u5C31\u4F1A\u89E6\u53D1 cicd \u751F\u6210\u5BF9\u5E94\u8BED\u8A00\u7684\u5BA2\u6237\u7AEF\u4EE3\u7801\uFF0Cpush \u5230\u5BF9\u5E94\u7684\u5404\u4E2A\u5B50\u4ED3\u5E93\u5F53\u4E2D\u4E86</li></ul><h3 id="api-project-layout" tabindex="-1"><a class="header-anchor" href="#api-project-layout" aria-hidden="true">#</a> API Project Layout</h3><p>\u6211\u4EEC\u7684 api \u9879\u76EE\u662F\u5982\u4F55\u5B9A\u4E49\u7684\u5462\uFF1F\u770B\u4E0B\u56FE <img src="http://sm.nsddd.top/sm202311081726561.jpeg" alt="Frame 1 (2).jpg"></p><ul><li>\u9996\u5148\u662F\u5728\u4E1A\u52A1\u9879\u76EE\u5F53\u4E2D\uFF0C\u6211\u4EEC\u9876\u5C42\u4F1A\u6709\u4E00\u4E2A api \u76EE\u5F55 <ul><li>\u5728 api \u76EE\u5F55\u5F53\u4E2D\u6211\u4EEC\u4F1A\u6309\u7167 product <code>name/app name/\u7248\u672C\u53F7/app.proto</code> \u7684\u65B9\u5F0F\u8FDB\u884C\u7EC4\u7EC7</li><li>\u5177\u4F53\u600E\u4E48\u7EC4\u7EC7\u53EF\u80FD\u6BCF\u4E2A\u516C\u53F8\u90FD\u4E0D\u592A\u4E00\u6837\uFF0C\u4F46\u662F\u603B\u7684\u6765\u8BF4\u5C31\u662F\u5E94\u7528\u7684 \u552F\u4E00\u540D\u79F0+\u7248\u672C\u53F7 \u6765\u8FDB\u884C\u4E00\u4E2A\u533A\u5206</li></ul></li><li>\u5728 api project \u5F53\u4E2D\u548C\u4E1A\u52A1\u5E94\u7528\u7C7B\u4F3C\uFF0C\u4E5F\u6709\u4E00\u4E2A api \u76EE\u5F55\uFF0C\u901A\u8FC7\u4E0A\u56FE\u7684\u4E24\u4E2A\u6846\u5C31\u53EF\u4EE5\u53D1\u73B0\u8FD9\u662F\u4E00\u6A21\u4E00\u6837\u7684 <ul><li>\u9664\u6B64\u4E4B\u5916 <code>api project</code> \u8FD8\u6709\u7528\u4E8E\u6CE8\u89E3\u7684 <code>annotations</code> \u6587\u4EF6\u5939</li><li>\u6709\u4E00\u4E9B\u7B2C\u4E09\u65B9\u7684\u5F15\u7528\uFF0C\u4F8B\u5982 <code>googleapis</code> \u5F53\u4E2D\u7684\u4E00\u4E9B <code>proto</code> \u6587\u4EF6</li></ul></li></ul><h2 id="api-\u517C\u5BB9\u6027\u5F00\u53D1" tabindex="-1"><a class="header-anchor" href="#api-\u517C\u5BB9\u6027\u5F00\u53D1" aria-hidden="true">#</a> API \u517C\u5BB9\u6027\u5F00\u53D1</h2><p>\u968F\u7740\u5E94\u7528\u7684\u4E0D\u65AD\u5F00\u53D1\uFF0C\u4E1A\u52A1\u7684\u4E0D\u65AD\u53D1\u5C55\u6211\u4EEC\u7684 api \u80AF\u5B9A\u4F1A\u4E0D\u65AD\u7684\u8FDB\u884C\u4FEE\u6539\uFF0C\u5728\u4FEE\u6539 api \u7684\u65F6\u5019\u8003\u8651 api \u7684\u517C\u5BB9\u6027\u5C31\u4F1A\u5F88\u91CD\u8981\u4E86\uFF0C\u5982\u679C\u6211\u4EEC\u505A\u4E86\u4E00\u4E9B\u7834\u574F\u6027\u7684\u53D8\u66F4\u5C31\u6709\u53EF\u80FD\u4F1A\u5BFC\u81F4\u4F9D\u8D56\u6211\u4EEC\u7684\u670D\u52A1\u6216\u8005\u662F\u5BA2\u6237\u7AEF\u62A5\u9519\uFF0C\u8FD9\u6837\u5C31\u4F1A\u5E26\u6765\u4E8B\u6545\u3002</p><h4 id="\u5411\u4E0B\u517C\u5BB9\u7684\u53D8\u66F4" tabindex="-1"><a class="header-anchor" href="#\u5411\u4E0B\u517C\u5BB9\u7684\u53D8\u66F4" aria-hidden="true">#</a> \u5411\u4E0B\u517C\u5BB9\u7684\u53D8\u66F4</h4><ul><li>\u65B0\u589E\u63A5\u53E3</li><li>\u65B0\u589E\u53C2\u6570\u5B57\u6BB5</li><li>\u65B0\u589E\u8FD4\u56DE\u5B57\u6BB5 <ul><li>\u5728\u4E0D\u6539\u53D8\u5176\u4ED6\u54CD\u5E94\u5B57\u6BB5\u7684\u884C\u4E3A\u7684\u524D\u63D0\u4E0B\uFF0C\u975E\u8D44\u6E90\uFF08\u4F8B\u5982\uFF0CListBooksResponse\uFF09\u7684\u54CD\u5E94\u6D88\u606F\u53EF\u4EE5\u6269\u5C55\u800C\u4E0D\u5FC5\u7834\u574F\u5BA2\u6237\u7AEF\u7684\u517C\u5BB9\u6027\u3002\u5373\u4F7F\u4F1A\u5F15\u5165\u5197\u4F59\uFF0C\u5148\u524D\u5728\u54CD\u5E94\u4E2D\u586B\u5145\u7684\u4EFB\u4F55\u5B57\u6BB5\u5E94\u7EE7\u7EED\u4F7F\u7528\u76F8\u540C\u7684\u8BED\u4E49\u586B\u5145\u3002</li></ul></li></ul><p>\u4E00\u822C\u800C\u8A00\u65B0\u589E\u90FD\u662F\u76F8\u5BF9\u5B89\u5168\u7684\uFF0C\u4F46\u662F\u6211\u4EEC\u8981\u6CE8\u610F\u7684\u662F\u65B0\u589E\u5B57\u6BB5\u4E0D\u80FD\u6539\u53D8\u6211\u4EEC\u539F\u672C\u7684\u903B\u8F91\uFF0C\u5982\u679C\u6539\u53D8\u4E86 api \u7684\u903B\u8F91\uFF0C\u90A3\u5C31\u4E0D\u4E00\u5B9A\u5B89\u5168\u4E86</p><h4 id="\u5411\u4E0B\u4E0D\u517C\u5BB9\u7684\u53D8\u66F4-\u7834\u574F\u6027\u53D8\u66F4" tabindex="-1"><a class="header-anchor" href="#\u5411\u4E0B\u4E0D\u517C\u5BB9\u7684\u53D8\u66F4-\u7834\u574F\u6027\u53D8\u66F4" aria-hidden="true">#</a> \u5411\u4E0B\u4E0D\u517C\u5BB9\u7684\u53D8\u66F4\uFF08\u7834\u574F\u6027\u53D8\u66F4\uFF09</h4><ul><li>\u5220\u9664\u6216\u91CD\u547D\u540D\u670D\u52A1\uFF0C\u5B57\u6BB5\uFF0C\u65B9\u6CD5\u6216\u679A\u4E3E\u503C <ul><li>\u5728\u505A\u8FD9\u79CD\u4FEE\u6539\u7684\u65F6\u5019\u9700\u8981\u4FEE\u6539\u6211\u4EEC api \u7684\u7248\u672C\u53F7\uFF0C\u5E38\u89C1\u6709\u4E24\u79CD\u65B9\u5F0F</li><li>\u5982\u679C\u53EA\u6709\u5F88\u5C11\u7684 api \u53D8\u52A8\u53EF\u4EE5\u521B\u5EFA\u4E00\u4E2A <code>XXXV2</code> \u7684\u65B9\u6CD5</li><li>\u5982\u679C\u53D8\u52A8\u7684 api \u6BD4\u8F83\u591A\uFF0C\u53EF\u4EE5\u76F4\u63A5\u65B0\u542F\u4E00\u4E2A <code>v2</code> \u7684\u5305</li></ul></li><li>\u4FEE\u6539\u5B57\u6BB5\u7684\u7C7B\u578B <ul><li>\u4E25\u7981\u4FEE\u6539\u5B57\u6BB5\u7684\u7C7B\u578B\uFF0C\u4FEE\u6539\u5B57\u6BB5\u7684\u7C7B\u578B\u53EF\u80FD\u4F1A\u5BFC\u81F4\u5BA2\u6237\u7AEF\u5D29\u6E83</li></ul></li><li>\u4FEE\u6539\u73B0\u6709\u8BF7\u6C42\u7684\u53EF\u89C1\u884C\u4E3A</li><li>\u7ED9\u8D44\u6E90\u6D88\u606F\u6DFB\u52A0 \u8BFB\u53D6/\u5199\u5165 \u5B57\u6BB5</li></ul><h3 id="api-\u547D\u540D\u89C4\u8303" tabindex="-1"><a class="header-anchor" href="#api-\u547D\u540D\u89C4\u8303" aria-hidden="true">#</a> API \u547D\u540D\u89C4\u8303</h3><h4 id="\u5305\u540D" tabindex="-1"><a class="header-anchor" href="#\u5305\u540D" aria-hidden="true">#</a> \u5305\u540D</h4><table><thead><tr><th>\u4EA7\u54C1\u540D</th><th>product</th></tr></thead><tbody><tr><td>\u5E94\u7528\u540D</td><td>app</td></tr><tr><td>\u7248\u672C\u53F7</td><td>v1</td></tr><tr><td>\u5305\u540D</td><td><code>product.app.v1</code></td></tr><tr><td>\u76EE\u5F55\u7ED3\u6784</td><td><code>api/product/app/v1/xx.proto</code></td></tr></tbody></table><h4 id="api-\u5B9A\u4E49" tabindex="-1"><a class="header-anchor" href="#api-\u5B9A\u4E49" aria-hidden="true">#</a> API \u5B9A\u4E49</h4><ul><li>\u547D\u540D\u89C4\u5219\uFF1A\u65B9\u6CD5 + \u8D44\u6E90</li><li>\u6807\u51C6\u65B9\u6CD5\uFF1A\u53C2\u8003 Google API \u8BBE\u8BA1\u6307\u5357</li></ul><table><thead><tr><th><strong>\u6807\u51C6\u65B9\u6CD5</strong></th><th><strong>HTTP \u6620\u5C04</strong></th></tr></thead><tbody><tr><td>List</td><td>GET</td></tr><tr><td>Get</td><td>GET</td></tr><tr><td>Update</td><td>PUT \u6216\u8005 PATCH</td></tr><tr><td>Create</td><td>POST</td></tr><tr><td>Delete</td><td>DELETE</td></tr></tbody></table><p>\u9664\u4E86\u6807\u51C6\u7684\u4E5F\u6709\u4E00\u4E9B\u975E\u6807\u51C6\u7684\uFF0C\u4F8B\u5982\u540C\u6B65\u6570\u636E\u53EF\u80FD\u4F1A\u7528 <code>Sync</code> \u7B49\uFF0C\u4E0D\u8FC7\u5927\u90E8\u5206\u7684 api \u5E94\u8BE5\u90FD\u662F\u6807\u51C6\u7684</p><h4 id="\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u793A\u4F8B" aria-hidden="true">#</a> \u793A\u4F8B</h4><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token comment">// api/product/app/v1/blog.proto</span>

syntax <span class="token operator">=</span> <span class="token string">&quot;proto3&quot;</span><span class="token punctuation">;</span>

<span class="token keyword">package</span> product<span class="token punctuation">.</span>app<span class="token punctuation">.</span>v1<span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string">&quot;google/api/annotations.proto&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// blog service is a blog demo</span>
service BlogService <span class="token punctuation">{</span>

	rpc <span class="token function">GetArticles</span><span class="token punctuation">(</span>GetArticlesReq<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>GetArticlesResp<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		option <span class="token punctuation">(</span>google<span class="token punctuation">.</span>api<span class="token punctuation">.</span>http<span class="token punctuation">)</span> <span class="token operator">=</span> <span class="token punctuation">{</span>
			get<span class="token punctuation">:</span> <span class="token string">&quot;/v1/articles&quot;</span>
			additional_bindings <span class="token punctuation">{</span>
				get<span class="token punctuation">:</span> <span class="token string">&quot;/v1/author/{author_id}/articles&quot;</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\u610F\uFF0C\u4E00\u822C\u800C\u8A00\u6211\u4EEC\u5E94\u8BE5\u4E3A\u6BCF\u4E2A\u63A5\u53E3\u90FD\u521B\u5EFA\u4E00\u4E2A\u81EA\u5B9A\u4E49\u7684 message\uFF0C\u4E3A\u4E86\u540E\u9762\u6269\u5C55\uFF0C\u5982\u679C\u6211\u4EEC\u7528 Empty \u7684\u8BDD\u540E\u7EED\u5C31\u6CA1\u6709\u529E\u6CD5\u65B0\u589E\u5B57\u6BB5\u4E86</p><h3 id="api-error" tabindex="-1"><a class="header-anchor" href="#api-error" aria-hidden="true">#</a> API Error</h3><p>\u5148\u8BF4\u6211\u4EEC\u5F53\u524D\u7684\u95EE\u9898\uFF0C\u6211\u4EEC\u4E00\u76F4\u7528\u7684 http \u7136\u540E\u6211\u4EEC\u8FD4\u56DE\u662F\u4F7F\u7528\u7684\u4E0B\u9762\u8FD9\u79CD\u683C\u5F0F\uFF0C\u7136\u540E http code \u7EDF\u4E00\u8FD4\u56DE 200</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token punctuation">{</span>
  <span class="token key atrule">&quot;code&quot;</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token key atrule">&quot;msg&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;xxx&quot;</span><span class="token punctuation">,</span>
  <span class="token key atrule">&quot;data&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u79CD\u505A\u6CD5\u5C31\u5B58\u5728\u4E00\u4E2A\u6BD4\u8F83\u5927\u7684\u95EE\u9898\uFF0C\u505A\u76D1\u63A7\u7684\u65F6\u5019\u4E0D\u592A\u597D\u505A\uFF0C\u5F88\u591A\u73B0\u6210\u7684\u4E1C\u897F\u6CA1\u6709\u529E\u6CD5\u76F4\u63A5\u4F7F\u7528\uFF0C\u56E0\u4E3A\u6211\u4EEC\u90FD\u8FD4\u56DE\u7684\u6210\u529F\u3002</p><p>\u53C2\u7167 google \u7684\u9519\u8BEF\u5B9A\u4E49\uFF0C\u5C06 http code \u548C grpc \u9519\u8BEF\u7801\u8FDB\u884C\u6620\u5C04\uFF0C\u8FD4\u56DE\u5BF9\u5E94\u7684\u9519\u8BEF\u4FE1\u606F</p><p>\u4F46\u662F\u8FD9\u6837\u8FD8\u662F\u4E0D\u884C\uFF0C\u56E0\u4E3A\u8FD9\u6837\u5F88\u591A\u4E1A\u52A1\u9519\u8BEF\u4FE1\u606F\u65E0\u6CD5\u533A\u5206\uFF0C\u6BDB\u8001\u5E08\u4ED6\u4EEC\u7684 kratos v2 \u7684\u505A\u6CD5\u662F\u505A\u4E86\u4E24\u5C42\uFF0C\u4F7F\u7528\u4E0B\u9762\u7684\u65B9\u5F0F\u8FDB\u884C\u5B9A\u4E49</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>message Status <span class="token punctuation">{</span>
  <span class="token comment">// \u9519\u8BEF\u7801\uFF0C\u8DDF grpc-status \u4E00\u81F4\uFF0C\u5E76\u4E14\u5728HTTP\u4E2D\u53EF\u6620\u5C04\u6210 http-status</span>
  <span class="token builtin">int32</span> code <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token comment">// \u9519\u8BEF\u539F\u56E0\uFF0C\u5B9A\u4E49\u4E3A\u4E1A\u52A1\u5224\u5B9A\u9519\u8BEF\u7801</span>
  <span class="token builtin">string</span> reason <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
  <span class="token comment">// \u9519\u8BEF\u4FE1\u606F\uFF0C\u4E3A\u7528\u6237\u53EF\u8BFB\u7684\u4FE1\u606F\uFF0C\u53EF\u4F5C\u4E3A\u7528\u6237\u63D0\u793A\u5185\u5BB9</span>
  <span class="token builtin">string</span> message <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
  <span class="token comment">// \u9519\u8BEF\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u53EF\u4EE5\u9644\u52A0\u81EA\u5B9A\u4E49\u7684\u4FE1\u606F\u5217\u8868</span>
  repeated google<span class="token punctuation">.</span>protobuf<span class="token punctuation">.</span>Any details <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u548C\u6211\u4EEC\u5F53\u524D\u7684\u65B9\u5F0F\u5DEE\u4E0D\u592A\u591A\uFF0C\u4F46\u662F\u6211\u4EEC\u662F\u5728\u539F\u6765\u7684\u57FA\u7840\u4E0A\u8FD4\u56DE\u4E86 http code\uFF0C\u5269\u4E0B\u7684\u5B57\u6BB5\u8FD8\u662F\u548C\u539F\u6765\u4FDD\u6301\u4E00\u81F4</p><h2 id="gin-\u8DEF\u7531\u6CE8\u518C" tabindex="-1"><a class="header-anchor" href="#gin-\u8DEF\u7531\u6CE8\u518C" aria-hidden="true">#</a> Gin \u8DEF\u7531\u6CE8\u518C</h2><p>\u{1F4A1}\u7B80\u5355\u7684\u4E00\u4E2A\u6848\u4F8B\u5982\u4E0B\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;github.com/gin-gonic/gin&quot;</span>

<span class="token keyword">func</span> <span class="token function">handler</span><span class="token punctuation">(</span>ctx <span class="token operator">*</span>gin<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token comment">// get params</span>
	params <span class="token operator">:=</span> <span class="token keyword">struct</span> <span class="token punctuation">{</span>
		Msg <span class="token builtin">string</span> <span class="token string">\`json:&quot;msg&quot;\`</span>
	<span class="token punctuation">}</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
	ctx<span class="token punctuation">.</span><span class="token function">BindQuery</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>params<span class="token punctuation">)</span>

	<span class="token comment">// \u4E1A\u52A1\u903B\u8F91</span>

	<span class="token comment">// \u8FD4\u56DE\u6570\u636E</span>
	ctx<span class="token punctuation">.</span><span class="token function">JSON</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> gin<span class="token punctuation">.</span>H<span class="token punctuation">{</span>
		<span class="token string">&quot;message&quot;</span><span class="token punctuation">:</span> params<span class="token punctuation">.</span>Msg<span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	r <span class="token operator">:=</span> gin<span class="token punctuation">.</span><span class="token function">Default</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token string">&quot;/ping&quot;</span><span class="token punctuation">,</span> handler<span class="token punctuation">)</span>
	r<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// \u76D1\u542C\u5E76\u5728 0.0.0.0:8080 \u4E0A\u542F\u52A8\u670D\u52A1</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u662F\u4E00\u4E2A\u7B80\u5355\u7684\u793A\u4F8B\uFF0C\u53EF\u4EE5\u53D1\u73B0 gin \u6CE8\u518C\u8DEF\u7531\u9700\u8981\u4E00\u4E2A <code>func (ctx *gin.Context)</code> \u7B7E\u540D\u7684\u51FD\u6570\uFF0C\u8FD9\u4E2A\u51FD\u6570\u4E00\u822C\u505A\u4E09\u4EF6\u4E8B\uFF0C\u83B7\u53D6\u53C2\u6570\uFF0C\u8C03\u7528\u4E1A\u52A1\u903B\u8F91\uFF0C\u8C03\u7528 gin \u7684\u65B9\u6CD5\u8FD4\u56DE http response</p><h4 id="grpc-server-interface" tabindex="-1"><a class="header-anchor" href="#grpc-server-interface" aria-hidden="true">#</a> grpc server interface</h4><p>\u5148\u770B\u4E00\u4E0B proto \u6587\u4EF6\u4E2D\u7684 rpc \u5B9A\u4E49\uFF0C\u4E00\u822C\u5C31\u662F\u5305\u542B\u4E00\u4E2A\u53C2\u6570\u548C\u4E00\u4E2A\u8FD4\u56DE\u503C\u7684\u51FD\u6570</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token comment">// The greeting service definition.</span>
service Greeter <span class="token punctuation">{</span>
  <span class="token comment">// Sends a greeting</span>
  rpc SayHello <span class="token punctuation">(</span>HelloRequest<span class="token punctuation">)</span> returns <span class="token punctuation">(</span>HelloReply<span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u770B grpc \u751F\u6210\u7684\u63A5\u53E3\uFF0C\u5176\u5B9E\u548C proto \u6587\u4EF6\u4E00\u4E00\u5BF9\u5E94\uFF0C\u53EA\u662F\u591A\u4E86\u4E00\u4E2A context \u548C error</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">type</span> GreeterServer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token comment">// Sends a greeting</span>
	<span class="token function">SayHello</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> <span class="token operator">*</span>HelloRequest<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>HelloReply<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token function">mustEmbedUnimplementedGreeterServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6240\u4EE5\u95EE\u9898\u6765\u4E86\uFF0C\u6211\u4EEC\u8BA9 service \u5C42\u5B9E\u73B0\u7C7B\u4F3C <code>GreeterServer</code> \u63A5\u53E3\u5C31\u884C\u4E86\uFF0C\u90A3\u6211\u4EEC\u4EE3\u7801\u751F\u6210\u5668\u8981\u600E\u4E48\u5199\u624D\u80FD\u591F\u5E94\u7528\u5230 http \u4E0A\u5462\uFF1F</p><h4 id="\u6982\u8981\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#\u6982\u8981\u65B9\u6848" aria-hidden="true">#</a> \u6982\u8981\u65B9\u6848</h4><ol><li><p>\u6211\u4EEC\u9700\u8981\u4ECE proto \u6587\u4EF6\u4E2D\u5F97\u77E5 http method\uFF0Chttp path \u7684\u4FE1\u606F\uFF0C\u8FD9\u6837\u6211\u4EEC\u624D\u77E5\u9053\u8981\u6CE8\u518C\u5230\u54EA\u4E2A\u8DEF\u7531\u4E0A</p><ol><li>\u8FD9\u4E2A\u53EF\u4EE5\u901A\u8FC7 <code>google/api/annotations.proto</code> \u4E3A rpc \u65B9\u6CD5\u6DFB\u52A0 Option \u5B9E\u73B0</li><li>\u6216\u8005\u662F\u901A\u8FC7\u51FD\u6570\u7B7E\u540D\u6765\u7EA6\u5B9A\uFF0C\u6211\u4EEC\u7EA6\u5B9A\u65B9\u6CD5\u540D\u4F7F\u7528\u9A7C\u5CF0\u65B9\u5F0F\u547D\u540D\uFF0C\u9996\u4E2A\u5355\u8BCD\u662F http method \u6216\u8005\u662F http method \u7684\u6620\u5C04\uFF0C\u5982\u679C\u90FD\u4E0D\u662F\u9ED8\u8BA4\u91C7\u7528 post <ol><li><code>&quot;GET&quot;, &quot;FIND&quot;, &quot;QUERY&quot;, &quot;LIST&quot;, &quot;SEARCH&quot;</code> \u2013&gt; <code>GET</code></li><li><code>&quot;POST&quot;, &quot;CREATE&quot;</code> \u2013&gt; <code>POST</code></li><li><code>&quot;PUT&quot;, &quot;UPDATE&quot;</code> \u2013&gt; <code>PUT</code></li><li><code>&quot;DELETE&quot;</code> \u2013&gt; <code>DELETE</code></li></ol></li></ol></li><li><p>\u6211\u4EEC\u9700\u8981\u6784\u5EFA</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>func handler(ctx *gin.Context)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u51FD\u6570\u7528\u4E8E\u6CE8\u518C\u8DEF\u7531</p><ol><li>\u51FD\u6570\u5185\u9700\u8981\u5904\u7406\u53C2\u6570\uFF0C\u7528\u4E8E\u8C03\u7528 service \u5C42\u7684\u4EE3\u7801</li><li>\u8C03\u7528 service \u5C42\u7684\u4EE3\u7801\u7ED3\u675F\u4E4B\u540E\uFF0C\u5C06\u8FD4\u56DE\u503C\u8C03\u7528 gin \u76F8\u5173\u65B9\u6CD5\u8FD4\u56DE</li></ol></li></ol><p>\u6240\u4EE5\u6211\u4EEC\u6700\u540E\u751F\u6210\u7684\u4EE3\u7801\u5927\u6982\u5E94\u8BE5\u662F\u8FD9\u6837\u7684\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>type GreeterService struct {
	server GreeterHTTPServer
	router gin.IRouter
}

// \u751F\u6210\u7684 gin.HandlerFunc
// \u7531\u4E8E HandlerFunc \u7B7E\u540D\u7684\u9650\u5236\uFF0C\u4E0D\u80FD\u4ECE\u53C2\u6570\u4F20\u9012 service \u63A5\u53E3\u8FDB\u6765
// \u6240\u4EE5\u6211\u4EEC\u4F7F\u7528\u4E00\u4E2A Struct \u6258\u7BA1 service \u6570\u636E
func (s *GreeterService) SayHello(ctx *gin.Context) {
	var in HelloRequest

	if err := ctx.ShouldBindJSON(\u2208); err != nil {
		// \u8FD4\u56DE\u53C2\u6570\u9519\u8BEF
		return
	}

	// \u8C03\u7528\u4E1A\u52A1\u903B\u8F91
	out, err := s.server.(GreeterHTTPServer).SayHello(ctx, \u2208)
	if err != nil {
		// \u8FD4\u56DE\u9519\u8BEF\u7ED3\u679C
		return
	}

	// \u8FD4\u56DE\u6210\u529F\u7ED3\u679C
	ctx.JSON(200, out)
	return
}

// \u8DEF\u7531\u6CE8\u518C\uFF0C\u9996\u5148\u9700\u8981 gin.IRouter \u63A5\u53E3\u7528\u4E8E\u6CE8\u518C
// \u5176\u6B21\u9700\u8981\u83B7\u53D6\u5230 SayHello \u65B9\u6CD5\u5BF9\u5E94\u7684 http method \u548C path
func (s *GreeterService) RegisterService() {
	s.router.Handle(&quot;GET&quot;, &quot;/hello&quot;, s.SayHello)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,48);function b(h,g){const s=o("ExternalLinkIcon");return p(),l("div",null,[r,n("ul",null,[n("li",null,[n("a",d,[u,a(s)])]),n("li",null,[n("a",v,[m,a(s)])])]),k])}const f=i(c,[["render",b],["__file","152.html.vue"]]);export{f as default};