import{_ as i,r as d,o as l,c as p,a as o,b as c,w as a,e,d as s}from"./app.4ca049db.js";const u={},m=o("h1",{id:"docker\u5E95\u5C42\u7684\u5185\u6838",tabindex:"-1"},[o("a",{class:"header-anchor",href:"#docker\u5E95\u5C42\u7684\u5185\u6838","aria-hidden":"true"},"#"),e(" docker\u5E95\u5C42\u7684\u5185\u6838")],-1),h={class:"table-of-contents"},g=e("\u5E95\u5C42\u7ED3\u6784"),_=e("\u7ECF\u5178\u4E91\u8BA1\u7B97\u67B6\u6784"),k=e("\u4ECB\u7ECD"),b=e("BaaS\uFF1A\u533A\u5757\u94FE\u5373\u670D\u52A1"),f=e("docker"),S=e("rootfs"),x=e("Namespace"),v=e("control groups"),B=s('<p>[toc]</p><h2 id="\u5E95\u5C42\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u5E95\u5C42\u7ED3\u6784" aria-hidden="true">#</a> \u5E95\u5C42\u7ED3\u6784</h2><div class="custom-container warning"><p class="custom-container-title">docker\u5E95\u5C42</p><p>docker\u5E95\u5C42\u7684\u5185\u6838\uFF1A\uFF08rootfs / linux namespace / control groups\uFF09</p></div><h3 id="\u7ECF\u5178\u4E91\u8BA1\u7B97\u67B6\u6784" tabindex="-1"><a class="header-anchor" href="#\u7ECF\u5178\u4E91\u8BA1\u7B97\u67B6\u6784" aria-hidden="true">#</a> \u7ECF\u5178\u4E91\u8BA1\u7B97\u67B6\u6784</h3><p>\u57FA\u7840\u4E91\u8BA1\u7B97\u67B6\u6784\u5305\u62EC IaaS \uFF08\u57FA\u7840\u5373\u670D\u52A1\uFF09\uFF0C SaaS\uFF08\u8F6F\u4EF6\u5373\u670D\u52A1\uFF09\uFF0C PaaS\uFF08\u5E73\u53F0\u5373\u670D\u52A1\uFF09\u4E09\u5C42\u670D\u52A1\u3002</p><p><img src="http://sm.nsddd.top/smiaas-paas-saas-comparison-1024x759.jpg" alt="img"></p><h3 id="\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#\u4ECB\u7ECD" aria-hidden="true">#</a> \u4ECB\u7ECD</h3><ol><li><p><code>IaaS</code> \u57FA\u7840\u67B6\u6784\u5373\u670D\u52A1</p><blockquote><p>\u4E91\u57FA\u7840\u67B6\u6784\u670D\u52A1\u79F0\u4E3A\u57FA\u7840\u67B6\u6784\u5373\u670D\u52A1\uFF08IaaS\uFF09\uFF0C\u7531\u9AD8\u5EA6\u53EF\u6269\u5C55\u548C\u81EA\u52A8\u5316\u7684\u8BA1\u7B97\u8D44\u6E90\u7EC4\u6210\u3002 IaaS\u662F\u5B8C\u5168\u81EA\u52A9\u670D\u52A1\uFF0C\u7528\u4E8E\u8BBF\u95EE\u548C\u76D1\u63A7\u8BA1\u7B97\u3001\u7F51\u7EDC\uFF0C\u5B58\u50A8\u548C\u5176\u4ED6\u670D\u52A1\u7B49\u5185\u5BB9\uFF0C\u5B83\u5141\u8BB8\u4F01\u4E1A\u6309\u9700\u6C42\u548C\u9700\u8981\u8D2D\u4E70\u8D44\u6E90\uFF0C\u800C\u4E0D\u5FC5\u8D2D\u4E70\u5168\u90E8\u786C\u4EF6\u3002</p></blockquote></li><li><p><code>SaaS</code> \u8F6F\u4EF6\u5373\u670D\u52A1\uFF08\u4E5F\u79F0\u4E3A\u4E91\u5E94\u7528\u7A0B\u5E8F\u670D\u52A1\uFF09</p><blockquote><p>\u4EE3\u8868\u4E86\u4E91\u5E02\u573A\u4E2D\u4F01\u4E1A\u6700\u5E38\u7528\u7684\u9009\u9879\u3002 SaaS\u5229\u7528\u4E92\u8054\u7F51\u5411\u5176\u7528\u6237\u63D0\u4F9B\u5E94\u7528\u7A0B\u5E8F\uFF0C\u8FD9\u4E9B\u5E94\u7528\u7A0B\u5E8F\u7531\u7B2C\u4E09\u65B9\u4F9B\u5E94\u5546\u7BA1\u7406\u3002 \u5927\u591A\u6570SaaS\u5E94\u7528\u7A0B\u5E8F\u76F4\u63A5\u901A\u8FC7Web\u6D4F\u89C8\u5668\u8FD0\u884C\uFF0C\u4E0D\u9700\u8981\u5728\u5BA2\u6237\u7AEF\u8FDB\u884C\u4EFB\u4F55\u4E0B\u8F7D\u6216\u5B89\u88C5\u3002</p></blockquote></li><li><p><code>PaaS</code> \u5E73\u53F0\u5373\u670D\u52A1</p><blockquote><p>\u4E91\u5E73\u53F0\u670D\u52A1\u6216\u5E73\u53F0\u5373\u670D\u52A1\uFF08PaaS\uFF09\u4E3A\u67D0\u4E9B\u8F6F\u4EF6\u63D0\u4F9B\u4E91\u7EC4\u4EF6\uFF0C\u8FD9\u4E9B\u7EC4\u4EF6\u4E3B\u8981\u7528\u4E8E\u5E94\u7528\u7A0B\u5E8F\u3002 PaaS\u4E3A\u5F00\u53D1\u4EBA\u5458\u63D0\u4F9B\u4E86\u4E00\u4E2A\u6846\u67B6\uFF0C\u4F7F\u4ED6\u4EEC\u53EF\u4EE5\u57FA\u4E8E\u5B83\u521B\u5EFA\u81EA\u5B9A\u4E49\u5E94\u7528\u7A0B\u5E8F\u3002\u6240\u6709\u670D\u52A1\u5668\uFF0C\u5B58\u50A8\u548C\u7F51\u7EDC\u90FD\u53EF\u4EE5\u7531\u4F01\u4E1A\u6216\u7B2C\u4E09\u65B9\u63D0\u4F9B\u5546\u8FDB\u884C\u7BA1\u7406\uFF0C\u800C\u5F00\u53D1\u4EBA\u5458\u53EF\u4EE5\u8D1F\u8D23\u5E94\u7528\u7A0B\u5E8F\u7684\u7BA1\u7406\u3002</p></blockquote></li></ol><p><img src="http://sm.nsddd.top/sm123141231" alt="\u67E5\u770B\u6E90\u56FE\u50CF"></p><div class="custom-container tip"><p class="custom-container-title">SaaS vs PaaS vs IaaS</p><p>\u603B\u4F53\u800C\u8A00\uFF0C\u6BCF\u79CD\u4E91\u6A21\u578B\u90FD\u63D0\u4F9B\u4E86\u81EA\u5DF1\u7684\u7279\u5B9A\u529F\u80FD\u548C\u7279\u6027\uFF0C\u56E0\u6B64\u60A8\u7684\u89E3\u7EC4\u7EC7\u4E86\u89E3\u8FD9\u4E9B\u5DEE\u5F02\u81F3\u5173\u91CD\u8981\u3002 \u65E0\u8BBA\u60A8\u662F\u5728\u5BFB\u627E\u4E91\u5B58\u50A8\u8F6F\u4EF6\uFF0C\u8FD8\u662F\u4E00\u4E2A\u80FD\u521B\u5EFA\u5B9A\u81EA\u5B9A\u4E49\u5E94\u7528\u7A0B\u5E8F\u7684\u5E73\u6ED1\u5E73\u53F0\uFF0C\uFF0C\u6216\u8005\u5E0C\u671B\u5B8C\u5168\u63A7\u5236\u6574\u4E2A\u57FA\u7840\u67B6\u6784\u800C\u65E0\u9700\u5BF9\u5176\u8FDB\u884C\u7269\u7406\u7EF4\u62A4\uFF0C\u60A8\u53EF\u4EE5\u4F7F\u7528\u4E91\u670D\u52A1\u3002 \u65E0\u8BBA\u60A8\u9009\u62E9\u54EA\u4E2A\u9009\u9879\uFF0C\u8FC1\u79FB\u5230\u4E91\u90FD\u662F\u4E1A\u52A1\u548C\u6280\u672F\u7684\u672A\u6765\uFF0C\u5E76\u4E14\u5F88\u5FC5\u8981\u8BA9\u5927\u5BB6\u6B63\u786E\u7684\u4E86\u89E3\u8FD9\u4E00\u70B9\u3002</p></div><h3 id="baas-\u533A\u5757\u94FE\u5373\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#baas-\u533A\u5757\u94FE\u5373\u670D\u52A1" aria-hidden="true">#</a> BaaS\uFF1A\u533A\u5757\u94FE\u5373\u670D\u52A1</h3>',11),y={class:"custom-container details"},q=s('<summary>Baas \u533A\u5757\u94FE\u5373\u670D\u52A1\u4EC0\u4E48\u662F\u533A\u5757\u94FE\u5373\u670D\u52A1\uFF08BaaS\uFF09\uFF1F</summary><p>\u533A\u5757\u94FE\u5373\u670D\u52A1\uFF08BaaS\uFF09\u662F\u4E3A\u4ECE\u4E8B\u6784\u5EFA\u533A\u5757\u94FE\u5E94\u7528\u7A0B\u5E8F\u4E1A\u52A1\u7684\u516C\u53F8\u521B\u5EFA\u548C\u7BA1\u7406\u7684\u57FA\u4E8E\u4E91\u7684\u7F51\u7EDC\u7684\u7B2C\u4E09\u65B9\u521B\u5EFA\u548C\u7BA1\u7406\u3002\u8FD9\u4E9B\u7B2C\u4E09\u65B9\u670D\u52A1\u662F\u4E0D\u65AD\u53D1\u5C55\u7684\u533A\u5757\u94FE\u6280\u672F\u9886\u57DF\u4E2D\u76F8\u5BF9\u8F83\u65B0\u7684\u53D1\u5C55\u3002\u533A\u5757\u94FE\u6280\u672F\u7684\u5E94\u7528\u5DF2\u7ECF\u8FDC\u8FDC\u8D85\u51FA\u4E86\u5176\u5728\u52A0\u5BC6\u8D27\u5E01\u4EA4\u6613\u4E2D\u6700\u5E7F\u4E3A\u4EBA\u77E5\u7684\u7528\u9014\uFF0C\u5E76\u5DF2\u6269\u5C55\u5230\u89E3\u51B3\u5404\u79CD\u5B89\u5168\u4EA4\u6613\u3002\u56E0\u6B64\uFF0C\u5BF9\u6258\u7BA1\u670D\u52A1\u6709\u9700\u6C42\u3002</p><p><img src="http://sm.nsddd.top/smimage-20221031173356050.png" alt="image-20221031173356050"></p><p>\u73B0\u5728\u533A\u5757\u94FE\u4E0D\u5149\u662F\u5404\u4E2AIT\u5DE8\u5934\uFF0C\u91D1\u878D\u673A\u6784\uFF0C\u54A8\u8BE2\u516C\u53F8\u7B49\u4E5F\u90FD\u53C2\u4E0E\u5176\u4E2D\uFF0C\u521B\u4E1A\u578B\u533A\u5757\u94FE\u516C\u53F8\u4E5F\u5B58\u5728\u4E0D\u5C11\uFF0C\u968F\u7740\u6280\u672F\u7684\u4E0D\u65AD\u53D1\u5C55\uFF0C\u7ADE\u4E89\u4E5F\u76F8\u5F53\u6FC0\u70C8\u3002Hyperledger\u4E4B\u524D\u4E5F\u53D1\u5E03\u4E86fabric1.0\u6B63\u5F0F\u7248\uFF0C\u6539\u8FDB\u4E86\u67B6\u6784\u66F4\u9002\u5408\u5E94\u7528\u843D\u5730\u3002\u533A\u5757\u94FE\u662F\u4E00\u4E2A\u5206\u5E03\u5F0F\u7684\u5E94\u7528\uFF0C\u53BB\u4E2D\u5FC3\u5316\u591A\u8282\u70B9\uFF0C\u5373\u4F7F\u6709spv\u8BA4\u8BC1\u6A21\u5F0F\uFF0C\u8FD8\u662F\u8981\u6C42\u6709\u4E00\u90E8\u5206\u8282\u70B9\u4E0B\u8F7D\u5B8C\u6574\u7684\u6570\u636E\u8BB0\u5F55\uFF0C\u4EE5\u6BD4\u7279\u5E01\u4E3A\u4F8B\uFF0C\u76EE\u524D\u51E0\u767EG\u7684\u6570\u636E\uFF0C\u968F\u7740\u6570\u636E\u91CF\u7684\u4E0D\u65AD\u589E\u957F\uFF0C\u5BF9\u672C\u5730\u8BA1\u7B97\u8D44\u6E90\u548C\u5B58\u50A8\u8D44\u6E90\u90FD\u662F\u4E00\u79CD\u6311\u6218\uFF0C\u4E4B\u524D\u6709\u4EBA\u8FD9\u6837\u8BF4\u8FC7\uFF1A\u672C\u5730\u8D44\u6E90\u6C38\u8FDC\u662F\u6709\u9650\u7684\uFF0C\u53EA\u6709\u4E91\u8D44\u6E90\u53EF\u4EE5\u4E0D\u65AD\u6269\u5C55\uFF0C\u7406\u89E3\u4E91\u8D44\u6E90\u53EF\u4EE5\u4E0D\u65AD\u6269\u5C55\u3002\u5148\u4E0D\u8BBA\u8FD9\u79CD\u8BF4\u6CD5\u7684\u6B63\u786E\u6027\uFF0C\u533A\u5757\u94FE\u7ED3\u5408\u4E91\u8BA1\u7B97\u5B58\u50A8\u5E73\u53F0\u5FC5\u7136\u662F\u4E00\u79CD\u53D1\u5C55\u8D8B\u52BF\u3002\u4E91\u5E73\u53F0\u76EE\u524D\u6700\u4E3A\u5E7F\u6CDB\u7684\u5C31\u662Fiaas\u3001paas\u3001saas\uFF0C\u90A3\u4E48\u533A\u5757\u94FE\u7ED3\u5408\u4E91\u5E73\u53F0\u6211\u4EEC\u79F0\u4E3ABaaS\uFF0C\u7406\u89E3\u533A\u5757\u94FE\u5373\u670D\u52A1\u3002</p><p>\u90A3\u4E48\u533A\u5757\u94FE\u5207\u5165\u4E91\u5E73\u53F0\uFF0C\u6839\u636E\u8FD9\u4E2ABaaS\u4E2D\u7684\u201CB\u201D\uFF0Cblockchain\uFF0C\u5E94\u8BE5\u600E\u4E48\u7406\u89E3\u3002\u6216\u8005\u5E94\u8BE5\u533A\u5206BaaS\u548Cbtaas\uFF0CBaaS\u548Cbtaas\u6839\u636E\u7F51\u7EDC\u4E0A\u4E00\u4E9B\u8BF4\u6CD5baas\u662F\u6307\u533A\u5757\u94FE\u5373\u670D\u52A1btaas\u662F\u6307\u533A\u5757\u94FE\u6280\u672F\u5373\u670D\u52A1\u3002\u5404\u79CD\u89C2\u5FF5\u7684\u63D0\u51FA\u90FD\u6709\u81EA\u5DF1\u7684\u7406\u8BBA\u57FA\u7840\uFF0C\u8FD9\u91CC\u4E0D\u505A\u5B9A\u4E49\uFF0C\u53EA\u662F\u5BF9\u4E24\u4E2A\u7406\u89E3\u505A\u4E00\u4E2A\u7B14\u8005\u81EA\u5DF1\u7684\u7B80\u5355\u7406\u89E3\uFF0C\u5982\u6709\u4E0D\u5BF9\u5E0C\u671B\u53CA\u65F6\u6307\u6B63\u3002</p><p>\u4E0A\u56FE\u5F88\u597D\u7684\u8BF4\u660E\u7684\u8FD9\u4E24\u79CD\u6982\u5FF5\u5B9A\u4E49\u3002</p><p><strong>\u533A\u5757\u94FE\u670D\u52A1</strong>\uFF1A\u5E7F\u4E49\u7406\u89E3\uFF0C\u628A\u533A\u5757\u94FE\u7684\u5E94\u7528\uFF0C\u6BD4\u5982\u6BD4\u7279\u5E01\u3001\u4EE5\u592A\u574A\u7B49\u8FD9\u7C7B\u578B\u516C\u94FE\uFF0C\u8282\u70B9\u76F4\u63A5\u90E8\u7F72\u5728\u4E91\u5E73\u53F0\uFF0C\u8282\u70B9\u63D0\u4F9B\u67E5\u8BE2\uFF0C\u4EA4\u6613\u3001\u533A\u5757\u751F\u6210\u7B49\u64CD\u4F5C\uFF0C\u5E95\u5C42\u4F7F\u7528\u4E91\u8BA1\u7B97\u8D44\u6E90\u548C\u4E91\u5B58\u50A8\u7A7A\u95F4\uFF0C\u8FD9\u79CD\u7B80\u5355\u7406\u89E3\u4E3A\u533A\u5757\u94FE\u670D\u52A1\uFF0C\u5F53\u7136\u4E0A\u56FE\u4E5F\u8BF4\u5230\u4E86\u516C\u94FE\u7684\u5EF6\u4F38\u5E94\u7528-\u5B58\u8BC1\u578B-Factom\uFF0C\u6570\u5B57\u8EAB\u4EFD\u578B-uPort\u7B49\uFF0C\u4E91\u5E73\u53F0\u7684\u5BB9\u9519\u3001\u7F51\u7EDC\u7684\u591A\u94FE\u8DEF\u8D1F\u8F7D\u3001\u8BA1\u7B97\u8D44\u6E90\u7684\u52A8\u6001\u8C03\u6574\uFF0C\u5176\u5B9E\u9488\u5BF9\u533A\u5757\u94FE\u4E2D\u7684\u8282\u70B9\u80FD\u591F\u66F4\u597D\u7684\u5B9E\u73B0\u4ED6\u7684\u670D\u52A1\uFF0C\u4ECE\u4E00\u5B9A\u89D2\u5EA6\u6765\u8BB2\u4E5F\u8282\u7701\u4E86\u8282\u70B9\u7684\u8FD0\u884C\u6210\u672C\uFF0C\u63D0\u9AD8\u4E86\u6574\u4E2A\u7CFB\u7EDF\u4E4B\u95F4\u4EA4\u4E92\u7684\u6548\u7387\u3002\u5F53\u7136\u4ECE\u533A\u5757\u94FE\u670D\u52A1\u8FD9\u4E2A\u8BCD\u6C47\u6765\u7406\u89E3\u5C31\u662F\u4E91\u5E73\u53F0\u4E0A\u642D\u5EFA\u533A\u5757\u5E94\u7528\uFF0C\u4E1A\u52A1\u76F4\u63A5\u8BBF\u95EE\u5728\u4E91\u5E73\u53F0\u4E4B\u4E0A\u7684\u533A\u5757\u94FE\u5E94\u7528\u5E73\u53F0\uFF0C\u7ED3\u5408\u56FE\u4E0A\uFF0C\u533A\u5757\u94FE\u6D4F\u89C8\u5668\u3001\u6570\u5B57\u8D27\u5E01\u4EA4\u6613\u5E73\u53F0\u4EE5\u53CA\u4E00\u4E9B\u73B0\u6709\u7684\u533A\u5757\u94FE\u7CFB\u7EDF\u63D0\u4F9B\u5F00\u653E\u7684\u670D\u52A1\u3002</p><p><strong>\u533A\u5757\u94FE\u6280\u672F\u670D\u52A1</strong>\uFF1A\u533A\u5757\u94FE\u6280\u672F\uFF0C\u8FD9\u4E2A\u8BCD\u6C47\u5305\u542B\u7684\u4E1C\u897F\u6BD4\u8F83\u591A\uFF0C\u901A\u4FD7\u6765\u8BF4\u533A\u5757\u94FE\u6280\u672F\u5C31\u662F\uFF1A\u52A0\u5BC6\u6280\u672F\u3001\u5171\u8BC6\u673A\u5236\u3001P2P\u7684\u7F51\u7EDC\u3001\u5206\u5E03\u5F0F\u7CFB\u7EDF\u7B49\u4E00\u4E9B\u6280\u672F\u7684\u7ED3\u5408\uFF0C\u90A3\u4E48\u5728\u4E91\u5E73\u53F0\u7684\u533A\u5757\u94FE\u6280\u672F\u591A\u6307\u8FD9\u4E9B\u6280\u672F\u7684\u7ED3\u5408\u540E\u533A\u5757\u94FE\u67B6\u6784\u6846\u67B6\u6216\u8005\u533A\u5757\u94FE\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u4E3B\u8981\u662FHyperLedger\uFF0Cmultichain\uFF0C\u4EE5\u592A\u574A\u79C1\u6709\u94FE\u7B49\u591A\u4E2A\u6846\u67B6\uFF0C\u4F7F\u7528\u8FD9\u4E9B\u6846\u67B6\u53BB\u7ED3\u5408\u5E94\u7528\u4E1A\u52A1\u9700\u6C42\uFF0C\u5F00\u53D1\u51FA\u9002\u5408\u4E1A\u52A1\u7684\u5E94\u7528\uFF0C\u751A\u81F3\u8FD9\u4E9B\u5E94\u7528\u8981\u6C42\u4F18\u4E8E\u73B0\u6709\u7684\u4E92\u8054\u7F51\u6280\u672F\uFF0C\u8FD9\u79CD\u65B9\u5F0F\u79F0\u4E3A\u533A\u5757\u94FE\u6280\u672F\u670D\u52A1\u3002</p><p>\u5728\u7F51\u4E0A\u67E5\u8D44\u6599\u7684\u65F6\u5019\u770B\u5230\u6709\u4F4D\u5927\u795E\u5BF9\u8FD9\u4E24\u4E2A\u533A\u5757\u94FE\u670D\u52A1/\u6280\u672F\u670D\u52A1\u6982\u5FF5\u63D0\u51FA\u4E86\u4E00\u4E2A\u5F88\u597D\u7684\u6BD4\u55BB\uFF1Awww. 8btc.com/talk-about-baas\uFF08\u6709\u5174\u8DA3\u770B\u770B\uFF0C\u7B14\u8005\u4E5F\u662F\u770B\u4E86\u8FD9\u4E2A\u60F3\u5230\u8FD9\u6982\u5FF5\u7684\uFF09\u3002\u963F\u91CC\u4E91\u63D0\u4F9B\u4E91\u670D\u52A1\uFF0C\u4ED6\u63D0\u4F9B\u7684\u662F\u4E91\u8D44\u6E90\u7684\u5B9E\u4F8B\uFF0C\u963F\u91CC\u4E0D\u4F1A\u544A\u8BC9\u4F60\u5982\u4F55\u53BB\u642D\u5EFA\u4E91\uFF0C\u4ED6\u63D0\u4F9B\u662F\u4E91\u7684\u670D\u52A1\uFF0C\u4ED8\u8D39\u5373\u53EF\u4EAB\u53D7\u670D\u52A1\u3002\u4E0A\u9762\u8BA8\u8BBA\u7684BaaS\u53EF\u4EE5\u8BA4\u4E3A\u662F\u63D0\u4F9B\u516C\u94FE\u7684\u5B9E\u4F8B\u670D\u52A1\uFF0Cbtaas\u63D0\u4F9B\u7684\u662F\u533A\u5757\u94FE\u67B6\u6784\u6846\u67B6\uFF0C\u4F60\u9700\u8981\u5F00\u53D1\u90E8\u7F72\u4F60\u7684\u533A\u5757\u94FE\u5E94\u7528\u670D\u52A1\u3002</p><p>BaaS \u57FA\u4E8E\u8F6F\u4EF6\u5373\u670D\u52A1 \uFF08SaaS\uFF09 \u6A21\u578B\uFF0C\u5E76\u4EE5\u7C7B\u4F3C\u7684\u65B9\u5F0F\u5DE5\u4F5C\u3002\u5B83\u5141\u8BB8\u5BA2\u6237\u5229\u7528\u57FA\u4E8E\u4E91\u7684\u89E3\u51B3\u65B9\u6848\u5728\u533A\u5757\u94FE\u4E0A\u6784\u5EFA\u3001\u6258\u7BA1\u548C\u64CD\u4F5C\u81EA\u5DF1\u7684<strong>\u533A\u5757\u94FE</strong>\u5E94\u7528\u7A0B\u5E8F\u548C\u76F8\u5173\u529F\u80FD\u3002\u540C\u65F6\uFF0C\u57FA\u4E8E\u4E91\u7684\u670D\u52A1\u63D0\u4F9B\u5546\u4FDD\u6301\u57FA\u7840\u67B6\u6784\u7684\u654F\u6377\u6027\u548C\u53EF\u64CD\u4F5C\u6027\u3002</p><p>\u4F5C\u4E3A\u66F4\u5927\u7684\u533A\u5757\u94FE\u751F\u6001\u7CFB\u7EDF\u7684\u53D1\u5C55\uFF0CBaaS\u88AB\u89C6\u4E3A\u4FC3\u8FDB\u533A\u5757\u94FE\u5728\u4F01\u4E1A\u4E2D\u7684\u91C7\u7528\u3002</p><p>BaaS\u9886\u57DF\u7684\u4E3B\u8981\u53C2\u4E0E\u8005\u5305\u62EC\uFF1A</p><ul><li>\u5FAE\u8F6F\uFF0C\u4E0EConsenSys\u5408\u4F5C\uFF0C\u4E8E2015\u5E74\u5728Microsoft Azure\u4E0A\u63A8\u51FA\u4EE5\u592A\u574A\u533A\u5757\u94FE\u5373\u670D\u52A1\u3002</li><li>\u4E9A\u9A6C\u900A\u63A8\u51FA\u4E86Amazon Managed Blockchain\uFF0C\u8BE5\u670D\u52A1\u4F7F\u7528\u5305\u62ECEthereum\u548CHyperledger Fabric\u5728\u5185\u7684\u5F00\u6E90\u6846\u67B6\u201C\u53EF\u4EE5\u8F7B\u677E\u521B\u5EFA\u548C\u7BA1\u7406\u53EF\u6269\u5C55\u7684\u533A\u5757\u94FE\u7F51\u7EDC\u201D\u3002</li><li>R3\uFF0C\u4E00\u4E2A\u7531\u5168\u7403\u91D1\u878D\u673A\u6784\u7EC4\u6210\u7684\u8054\u76DF\uFF0C\u5236\u4F5C\u4E86\u4E00\u4E2A\u540D\u4E3ACorda\u7684\u5206\u5E03\u5F0F\u91D1\u878D\u8D26\u672C\u3002</li><li>PayStand\uFF0C\u4E13\u95E8\u4ECE\u4E8B\u516C\u53F8\u4E4B\u95F4\u7684\u4ED8\u6B3E\u548C\u6536\u6B3E\u3002</li></ul><p>\u6D88\u8D39\u8005\u548C\u4F01\u4E1A\u8D8A\u6765\u8D8A\u613F\u610F\u9002\u5E94\u533A\u5757\u94FE\u6280\u672F\u3002\u7136\u800C\uFF0C\u521B\u5EFA\u3001\u914D\u7F6E\u548C\u8FD0\u8425\u533A\u5757\u94FE\u4EE5\u53CA\u7EF4\u62A4\u5176\u57FA\u7840\u8BBE\u65BD\u6240\u6D89\u53CA\u7684\u6280\u672F\u590D\u6742\u6027\u548C\u8FD0\u8425\u5F00\u9500\u901A\u5E38\u4F1A\u6210\u4E3A\u969C\u788D\u3002</p><p>BaaS\u63D0\u4F9B\u4E86\u4E00\u4E2A\u5916\u90E8\u670D\u52A1\u63D0\u4F9B\u5546\u6765\u8BBE\u7F6E\u6240\u6709\u5FC5\u8981\u7684\u533A\u5757\u94FE\u6280\u672F\u548C\u57FA\u7840\u8BBE\u65BD\uFF0C\u4F46\u9700\u8981\u4ED8\u8D39\u3002\u521B\u5EFA\u540E\uFF0C\u63D0\u4F9B\u7A0B\u5E8F\u5C06\u7EE7\u7EED\u5904\u7406\u5BA2\u6237\u7AEF\u7684\u590D\u6742\u540E\u7AEF\u64CD\u4F5C\u3002</p><p>BaaS \u8FD0\u8425\u5546\u901A\u5E38\u63D0\u4F9B\u652F\u6301\u6D3B\u52A8\uFF0C\u4F8B\u5982\u5E26\u5BBD\u7BA1\u7406\u3001\u9002\u5F53\u7684\u8D44\u6E90\u5206\u914D\u3001\u6258\u7BA1\u8981\u6C42\u548C\u6570\u636E\u5B89\u5168\u529F\u80FD\u3002BaaS\u8FD0\u8425\u5546\u4F7F\u5BA2\u6237\u80FD\u591F\u4E13\u6CE8\u4E8E\u6838\u5FC3\u5DE5\u4F5C\uFF1A\u533A\u5757\u94FE\u7684\u529F\u80FD\u3002</p><p><strong>\u533A\u5757\u94FE\u5373\u670D\u52A1\uFF08BaaS\uFF09\u793A\u4F8B\uFF1A</strong></p>',17),P=e("\u4E0B\u56FE\u5C55\u793A\u4E86\u533A\u5757\u94FE\u5373\u670D\u52A1Hyperledger Cello\u7684\u5DE5\u4F5C\u6A21\u578B\uFF0C\u8FD9\u662F\u4E00\u4E2A\u7C7B\u4F3CBaaS\u7684\u533A\u5757\u94FE\u6A21\u5757\u5DE5\u5177\u5305\u548C"),C={href:"https://www.investopedia.com/terms/b/blockchain.asp",target:"_blank",rel:"noopener noreferrer"},w=e("Hyperledger"),L=e("\u9879\u76EE\u4E0B\u7684\u5B9E\u7528\u7A0B\u5E8F\u7CFB\u7EDF\u3002"),I=o("p",null,[o("img",{src:"http://sm.nsddd.top/smBlockchain-as-a-ServiceBaaS2-baedb4b071464c7cbaa71f7ef13c0c83.png",alt:"Cello"})],-1),N=o("p",null,"\u5B9E\u9645\u4E0A\uFF0CBaaS\u63D0\u4F9B\u5546\u7684\u89D2\u8272\u7C7B\u4F3C\u4E8E\u7F51\u7EDC\u6258\u7BA1\u63D0\u4F9B\u5546\u7684\u89D2\u8272\u3002\u7F51\u7AD9\u521B\u5EFA\u8005\u5728\u81EA\u5DF1\u7684\u4E2A\u4EBA\u8BA1\u7B97\u673A\u4E0A\u521B\u5EFA\u548C\u8FD0\u884C\u6240\u6709\u7F51\u7AD9\u5185\u5BB9\u3002\u4ED6\u4EEC\u53EF\u80FD\u4F1A\u96C7\u7528\u652F\u6301\u4EBA\u5458\u6216\u4E0E\u4E9A\u9A6C\u900A\u7F51\u7EDC\u670D\u52A1\u6216 HostGator \u7B49\u5916\u90E8\u6258\u7BA1\u670D\u52A1\u63D0\u4F9B\u5546\u7B7E\u7EA6\u3002\u8FD9\u4E9B\u7B2C\u4E09\u65B9\u516C\u53F8\u8D1F\u8D23\u57FA\u7840\u8BBE\u65BD\u548C\u7EF4\u62A4\u95EE\u9898\u3002",-1),z=o("p",null,"BaaS\u53EF\u80FD\u662F\u5BFC\u81F4\u533A\u5757\u94FE\u6280\u672F\u5728\u5404\u4E2A\u884C\u4E1A\u90E8\u95E8\u548C\u4E1A\u52A1\u4E2D\u66F4\u5E7F\u6CDB\u548C\u66F4\u6DF1\u5165\u6E17\u900F\u7684\u50AC\u5316\u5242\u3002\u65E0\u8BBA\u5927\u5C0F\uFF0C\u4F01\u4E1A\u73B0\u5728\u90FD\u53EF\u4EE5\u7B80\u5355\u5730\u5916\u5305\u6280\u672F\u590D\u6742\u7684\u5DE5\u4F5C\u5E76\u4E13\u6CE8\u4E8E\u5176\u6838\u5FC3\u6D3B\u52A8\uFF0C\u800C\u4E0D\u662F\u521B\u5EFA\u548C\u8FD0\u884C\u81EA\u5DF1\u7684\u533A\u5757\u94FE\u3002",-1),D=s('<h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> docker</h2><p>docker\u5C06\u6BCF\u4E2A\u5E94\u7528\u505A\u6210\u4E00\u4E2A\u6C99\u76D2\uFF0C\u5404\u4E2A\u5E94\u7528\u90FD\u8FD0\u884C\u5728\u5BB9\u5668\u4E2D\uFF08namespace\uFF09</p><ol><li>docker\u662F\u4E00\u4E2A\u5F00\u6E90\u7684\u5E94\u7528\u5BB9\u5668\u5F15\u64CE\uFF0C\u5F00\u53D1\u8005\u53EF\u4EE5\u6253\u5305\u4ED6\u4EEC\u7684\u5E94\u7528\u4EE5\u53CA\u4F9D\u8D56\u5230\u4E00\u4E2A\u5BB9\u5668\u4E2D\uFF0C\u53D1\u5E03\u5230\u6D41\u884C\u7684liunx\u7CFB\u7EDF\u4E0A\uFF0C\u6216\u8005\u5B9E\u73B0\u865A\u62DF\u5316\u3002</li><li>k8s\u662F\u4E00\u4E2A\u5F00\u6E90\u7684\u5BB9\u5668\u96C6\u7FA4\u7BA1\u7406\u7CFB\u7EDF\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u5BB9\u5668\u96C6\u7FA4\u7684\u81EA\u52A8\u5316\u90E8\u7F72\u3001\u81EA\u52A8\u6269\u7F29\u5BB9\u3001\u7EF4\u62A4\u7B49\u3002</li></ol><blockquote><p><code>docker</code> \u5982\u4ECA\u662F\u5BB9\u5668\u7684\u4EE3\u540D\u8BCD\uFF0C\u6211\u4EEC\u77E5\u9053 <code>docker</code> \u4E2D\u6700\u5C0F\u7684\u5355\u4F4D\u662F\u5BB9\u5668\uFF0C\u4F46\u662F\u5728 <code>k8s</code> \u4E2D\u6700\u5C0F\u7684\u5355\u4F4D\u662F <code>pod</code> \u3002</p><p><strong>\u6253\u5305\u65B9\u5F0F\u7684\u533A\u522B\uFF1A</strong></p><ul><li>docker \u901A\u8FC7\u955C\u50CF\u5206\u53D1</li><li>k8s \u2013 helm</li></ul></blockquote><details class="custom-container details"><summary>\u865A\u62DF\u5316\u89D2\u5EA6\uFF1A</summary><p>\u4F20\u7EDF\u7684\u865A\u62DF\u6280\u672F\uFF0C\u5728\u5C06\u7269\u7406\u786C\u4EF6\u865A\u62DF\u6210\u591A\u5957\u786C\u4EF6\u540E\uFF0C\u9700\u8981\u518D\u6BCF\u5957\u786C\u4EF6\u4E0A\u90FD\u90E8\u7F72\u4E00\u4E2A\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u63A5\u7740\u5728\u8FD9\u4E9B\u64CD\u4F5C\u7CFB\u7EDF\u4E0A\u8FD0\u884C\u76F8\u5E94\u7684\u5E94\u7528\u7A0B\u5E8F\u3002</p><p>Docker\u5BB9\u5668\u5185\u7684\u5E94\u7528\u7A0B\u5E8F\u8FDB\u7A0B\u76F4\u63A5\u8FD0\u884C\u5728\u5BBF\u4E3B\u673A(\u771F\u5B9E\u7269\u7406\u673A)\u7684\u5185\u6838\u4E0A\uFF0CDocker\u5F15\u64CE\u5C06\u4E00\u4E9B\u5404\u81EA\u72EC\u7ACB\u7684\u5E94\u7528\u7A0B\u5E8F\u548C\u5B83\u4EEC\u5404\u81EA\u7684\u4F9D\u8D56\u6253\u5305\uFF0C\u76F8\u4E92\u72EC\u7ACB\u76F4\u63A5\u8FD0\u884C\u4E8E\u672A\u7ECF\u865A\u62DF\u5316\u7684\u5BBF\u4E3B\u673A\u786C\u4EF6\u4E0A\uFF0C\u540C\u65F6\u5404\u4E2A\u5BB9\u5668\u4E5F\u6CA1\u6709\u81EA\u5DF1\u7684\u5185\u6838\uFF0C\u663E\u7136\u6BD4\u4F20\u7EDF\u865A\u62DF\u673A\u66F4\u8F7B\u4FBF\u3002\u6BCF\u4E2A\u96C6\u7FA4\u6709\u591A\u4E2A\u8282\u70B9\uFF0C\u6BCF\u4E2A\u8282\u70B9\u53EF\uFF0C\u6211\u4EEC\u7684kuberbete\u5C31\u662F\u7BA1\u7406\u8FD9\u4E9B\u5E94\u7528\u7A0B\u5E8F\u6240\u5728\u7684\u5C0F\u8FD0\u884C\u73AF\u5883\uFF08container\uFF09\u800C\u751F\u3002</p></details><details class="custom-container details"><summary>\u90E8\u7F72\u89D2\u5EA6\uFF1A</summary><p>\u4F20\u7EDF\u65B9\u5F0F\u662F\u5C06\u6240\u6709\u5E94\u7528\u76F4\u63A5\u90E8\u7F72\u5728\u540C\u4E00\u4E2A\u7269\u7406\u673A\u5668\u8282\u70B9\u4E0A\uFF0C\u8FD9\u6837\u6BCF\u4E2AApp\u7684\u4F9D\u8D56\u90FD\u662F\u5B8C\u5168\u76F8\u540C\u7684\uFF0C\u65E0\u6CD5\u505A\u5230App\u4E4B\u95F4\u9694\u79BB\uFF0C\u5F53\u7136\uFF0C\u4E3A\u4E86\u9694\u79BB\uFF0C\u6211\u4EEC\u4E5F\u53EF\u4EE5\u901A\u8FC7\u521B\u5EFA\u865A\u62DF\u673A\u7684\u65B9\u5F0F\u6765\u5C06App\u90E8\u7F72\u5230\u5176\u4E2D\uFF0C\u4F46\u8FD9\u6837\u592A\u8FC7\u7E41\u91CD\uFF0C\u6545\u6BD4\u865A\u62DF\u673A\u66F4\u8F7B\u4FBF\u7684Docker\u6280\u672F\u51FA\u73B0\uFF0C\u73B0\u5728\u6211\u4EEC\u901A\u8FC7\u90E8\u7F72Container\u5BB9\u5668\u7684\u6280\u672F\u6765\u90E8\u7F72\u5E94\u7528\uFF0C\u5168\u90E8Container\u8FD0\u884C\u5728\u5BB9\u5668\u5F15\u64CE\u4E0A\u5373\u53EF\u3002\u4EE5kubernetes\u4E3A\u4EE3\u8868\u7684\u5BB9\u5668\u96C6\u7FA4\u7BA1\u7406\u7CFB\u7EDF\uFF0C\u6211\u4EEC\u7528kubernetes\u53BB\u7BA1\u7406Docker\u96C6\u7FA4\uFF0C\u5373\u53EF\u4EE5\u5C06Docker\u770B\u6210Kubernetes\u5185\u90E8\u4F7F\u7528\u7684\u4F4E\u7EA7\u522B\u7EC4\u4EF6\u3002\u53E6\u5916\uFF0Ckubernetes\u4E0D\u4EC5\u4EC5\u652F\u6301Docker\uFF0C\u8FD8\u652F\u6301Rocket\uFF0C\u8FD9\u662F\u53E6\u4E00\u79CD\u5BB9\u5668\u6280\u672F\u3002</p></details><div class="custom-container danger"><p class="custom-container-title">\u6211\u4EEC\u5728\u4E4B\u524D\u77E5\u9053\u4E86\u865A\u62DF\u673A\u548C\u5BB9\u5668\u7684\u533A\u522B</p><p>\u865A\u62DF\u673A\u7684\u5185\u6838\u548C\u6587\u4EF6\u7CFB\u7EDF\u5B58\u5728\u4E0D\u540C\u7684\u4F4D\u7F6E\uFF0C\u7CFB\u7EDF\u52A0\u8F7D\u7684\u65F6\u5019\u53BB\u542F\u52A8\u5185\u6838\uFF0C\u6CA1\u6709\u52A0\u8F7D\u5C31\u662F\u6587\u4EF6</p><p>\u5BB9\u5668\u5C31\u662F\u628A\u6587\u4EF6\u7CFB\u7EDF\u6253\u5305\u51FA\u53BB\uFF0C\u5E94\u7528\u6240\u5728\u7684\u4F9D\u8D56\u5168\u90E8\u4FDD\u5B58\u8D77\u6765\u3002</p><img src="http://sm.nsddd.top//typora/spaces_-M5xTVjmK7ax94c8ZQcm_uploads_git-blob-6e94771ad01da3cb20e2190b01dfa54e3a69d0b2_virtualization.png?mail:3293172751@qq.com" alt="a" style="zoom:80%;"><img src="http://sm.nsddd.top//typora/spaces_-M5xTVjmK7ax94c8ZQcm_uploads_git-blob-5c1a41d44b8602c8f746e8929f484a701869ca25_docker.png?mail:3293172751@qq.com" alt="b" style="zoom:80%;"><ul><li>\u865A\u62DF\u673A\u901A\u8FC7 <code>Hypervisor</code> \u4EC5\u8FDB\u884C\u865A\u62DF\u5316\uFF0C\u5728\u8FD9\u4E0A\u9762\u53BB\u8FD0\u884C\u64CD\u4F5C\u7CFB\u7EDF <code>Centos</code></li><li>\u5BB9\u5668\u901A\u8FC7 <code>Docker Engine</code> \uFF0C\u57FA\u4E8E\u6B64\u5B9E\u73B0\u7684\u5BB9\u5668\u5E76\u4E0D\u662F\u865A\u62DF\u5316\uFF0C\u6CA1\u6709\u5BA2\u6237\u673A\u7684\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u662F\u5171\u4EAB\u5185\u6838\u7684\u3002</li></ul></div><h2 id="rootfs" tabindex="-1"><a class="header-anchor" href="#rootfs" aria-hidden="true">#</a> rootfs</h2>',8),H=e("\u6D45\u8C08 linux \u4E2D\u7684\u6839\u6587\u4EF6\u7CFB\u7EDF\uFF08rootfs \u7684\u539F\u7406\u548C\u4ECB\u7ECD\uFF09"),V=s(`<div class="custom-container tip"><p class="custom-container-title">\u4EC0\u4E48\u662F rootfs \uFF1F</p><p>\u6211\u4EEC\u5728\u6BCF\u4E2A <code>Linux</code> \u7CFB\u7EDF\u4E00\u5B9A\u6709\u4E00\u4E2A\u6839\u76EE\u5F55\uFF0C\u8FD9\u4E2A\u6839\u76EE\u5F55\u5C31\u662F <code>rootfs</code> \uFF1A</p><blockquote><p><strong><code>docker</code> \u4E5F\u4F9D\u65E7\u662F\u8FD9\u6837\uFF0C\u6211\u4EEC\u8FDB\u53BB\u5BB9\u5668\u7684\u5185\u90E8\u6839\u6587\u4EF6\u7CFB\u7EDF\u3002</strong></p></blockquote><p><img src="http://sm.nsddd.top/smimage-20221031192452458.png" alt="image-20221031192452458"></p></div><p><strong><code>rootfs</code> \u662F <code>docker</code> \u5BB9\u5668\u5728\u542F\u52A8\u65F6\u5185\u90E8\u8FDB\u7A0B\u53EF\u89C1\u7684\u6587\u4EF6\u7CFB\u7EDF\uFF0C\u5373 <code>docker</code> \u5BB9\u5668\u6839\u76EE\u5F55\uFF0C <code>rootfs</code> \u901A\u5E38\u5305\u542B\u4E00\u4E2A\u64CD\u4F5C\u7CFB\u7EDF\u8FD0\u884C\u6240\u9700\u7684\u6587\u4EF6\u7CFB\u7EDF\u3002</strong></p><p>\u5728\u4F20\u7EDF\u7684 <code>linux</code> \u542F\u52A8\u7684\u65F6\u5019\uFF0C\u9996\u5148\u6302\u8F7D\u4E00\u4E2A\u53EA\u8BFB\u7684 <code>rootfs</code> \uFF0C\u5F53\u7CFB\u7EDF\u68C0\u6D4B\u5668\u5B8C\u6574\u6027\u540E\uFF0C\u518D\u5207\u6362\u4E3A\u8BFB\u5199\u6A21\u5F0F\uFF1B \u800C\u5728 <code>docker</code> \u67B6\u6784\u4E2D\uFF0C\u5F53 <code>docekr daemon</code> \u4E3A <code>docker</code> \u5BB9\u5668\u6302\u8F7D <code>rootfs</code> \u65F6\uFF0C\u6CBF\u7528\u7684 <code>linux</code> \u5185\u6838\u542F\u52A8\u65F6\u7684\u65B9\u6CD5\uFF0C\u5373\u5C06 <code>rootfs</code> \u8BBE\u7F6E\u4E3A\u53EA\u8BFB\u6A21\u5F0F\uFF0C \u6302\u8F7D\u5B8C\u6BD5\u540E\uFF0C<strong>\u5229\u7528\u8054\u5408\u6587\u4EF6\u7CFB\u7EDF\u6280\u672F</strong> \u5728\u5DF2\u6709\u7684\u53EA\u8BFB <code>rootfs</code> \u4E0A\u518D\u6302\u8F7D\u4E00\u4E2A\u8BFB\u5199\u5C42\uFF0C\u8FD9\u6837\uFF0C\u8BFB\u5199\u5C42\u4F4D\u4E8E <code>docker</code> \u5BB9\u5668\u6587\u4EF6\u7CFB\u7EDF\u7684\u6700\u9876\u5C42\uFF0C\u5176\u4E0B\u53EF\u80FD\u8054\u5408\u6302\u8F7D\u4E86\u591A\u4E2A\u53EA\u8BFB\u5C42\u3002</p><p><code>rootfs</code> \u53EA\u662F\u4E00\u4E2A\u64CD\u4F5C\u7CFB\u7EDF\u5305\u542B\u7684\u6587\u4EF6\u3001\u914D\u7F6E\u3001\u76EE\u5F55\uFF0C\u5E76\u4E0D\u5305\u62EC\u64CD\u4F5C\u7CFB\u7EDF\uFF0C\u5728Linux\u4E2D\uFF0C\u8FD9\u4E24\u4E2A\u90E8\u5206\u662F\u5206\u5F00\u5B58\u653E\u7684\u3002</p><blockquote><p><code>linux</code> \u5185\u6838\u9ED8\u8BA4\u5B58\u653E\u5230 <code>/boot</code> \u4E0B\uFF0C\u800C <code>/usr/src</code> \u4E2D\u53EF\u67E5\u770B\u5185\u6838\u7684\u4FE1\u606F\u3002\u6709\u4E2A <code>.img</code> \u7684\u6587\u4EF6\uFF0C\u8FD9\u5C31\u662F\u7CFB\u7EDF\u5185\u6838\u6620\u50CF\u6587\u4EF6\u3002</p><p><img src="http://sm.nsddd.top/smimage-20221031195613278.png" alt="image-20221031195613278"></p></blockquote><h2 id="namespace" tabindex="-1"><a class="header-anchor" href="#namespace" aria-hidden="true">#</a> Namespace</h2><div class="custom-container tip"><p class="custom-container-title">\u4EC0\u4E48\u662F Namespace \uFF1F</p><p>\u6211\u4EEC\u7684docker\u662F\u5171\u4EAB\u540C\u4E00\u4E2A\u5185\u6838\u7684\uFF0C\u4F7F\u7528 <code>Namespace</code> \u53EF\u4EE5\u521B\u5EFA\u9694\u79BB\uFF0C\u51B3\u5B9A\u8FDB\u7A0B\u53EF\u4EE5\u770B\u5230\u6216\u8005\u4F7F\u7528\u54EA\u4E9B\u8D44\u6E90\u3002</p></div><p><code>namespace</code> \u662F Linux \u5185\u6838\u7528\u6765\u9694\u79BB\u5185\u6838\u8D44\u6E90\u7684\u65B9\u5F0F\uFF0C\u901A\u8FC7 namespace \u53EF\u4EE5\u8BA9\u4E00\u4E9B\u8FDB\u7A0B\u53EA\u80FD\u770B\u5230\u4E0E\u81EA\u5DF1\u76F8\u5173\u7684\u4E00\u90E8\u5206\u8D44\u6E90\uFF0C\u800C\u53E6\u5916\u4E00\u4E9B\u8FDB\u7A0B\u4E5F\u53EA\u80FD\u770B\u5230\u4E0E\u5B83\u4EEC\u81EA\u5DF1\u76F8\u5173\u7684\u8D44\u6E90\u3002</p><p><img src="http://sm.nsddd.top/smformat12344" alt="img"></p><div class="custom-container warning"><p class="custom-container-title">\u8FDB\u7A0B\u547D\u540D\u7A7A\u95F4\u67E5\u770B</p><p>\u8FDB\u7A0B\u547D\u540D\u7A7A\u95F4\u67E5\u770B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">ls</span> /proc/<span class="token punctuation">{</span>PD<span class="token punctuation">}</span>/ns
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221031201635589.png" alt="image-20221031201635589"></p></div><h2 id="control-groups" tabindex="-1"><a class="header-anchor" href="#control-groups" aria-hidden="true">#</a> control groups</h2><blockquote><p>\u4ECE <strong>2.6.24</strong> \u7248\u672C\u5F00\u59CB\uFF0C<code>linux</code> \u5185\u6838\u63D0\u4F9B\u4E86\u4E00\u4E2A\u53EB\u505A <code>cgroups</code>\uFF08\u63A7\u5236\u7EC4\uFF09\u7684\u7279\u6027\u3002<code>cgroups</code> \u5C31\u662F <code>control groups</code> \u7684\u7F29\u5199\uFF0C\u7528\u6765\u5BF9\u4E00\u7EC4\u8FDB\u7A0B\u6240\u5360\u7528\u7684\u8D44\u6E90\u505A\u9650\u5236\u3001\u7EDF\u8BA1\u3001\u9694\u79BB\u3002\u4E5F\u662F\u76EE\u524D\u8F7B\u91CF\u7EA7\u865A\u62DF\u5316\u6280\u672F <code>lxc</code> \uFF08linux container\uFF09\u7684\u57FA\u7840\u4E4B\u4E00\u3002\u6BCF\u4E00\u7EC4\u8FDB\u7A0B\u5C31\u662F\u4E00\u4E2A\u63A7\u5236\u7EC4\uFF0C\u4E5F\u5C31\u662F\u4E00\u4E2A <code>cgroup</code>\u3002<code>cgroups</code> \u5206\u4E3A\u51E0\u4E2A\u5B50\u7CFB\u7EDF\uFF0C\u6BCF\u4E2A\u5B50\u7CFB\u7EDF\u4EE3\u8868\u4E00\u79CD\u8BBE\u65BD\u6216\u8005\u8BF4\u662F\u8D44\u6E90\u63A7\u5236\u5668\uFF0C\u7528\u6765\u8C03\u5EA6\u67D0\u4E00\u7C7B\u8D44\u6E90\u7684\u4F7F\u7528\uFF0C\u5982 <code>cpu</code> \u65F6\u949F\u3001\u5185\u5B58\u3001\u5757\u8BBE\u5907 \u7B49\u3002</p></blockquote><div class="custom-container tip"><p class="custom-container-title">\u4EC0\u4E48\u662F control groups ?</p><p>\u6211\u4EEC\u901A\u8FC7 <code>control groups</code> \u6280\u672F\u6765\u7EA6\u675F\u8FDB\u7A0B\u5BF9\u8D44\u6E90\u7684\u4F7F\u7528\u3002</p></div><blockquote><p><strong><code>rootfs</code> \u5C31\u50CF\u662F\u623F\u95F4\u7684\u5730\u677F\uFF0C<code>Namespace</code> \u5C31\u50CF\u662F\u4E00\u4E2A\u5899\uFF0C\u9694\u79BB\u6BCF\u4E2A\u623F\u95F4\uFF0C<code>control groups</code> \u66F4\u50CF\u4E00\u4E2A\u623F\u9876\uFF0C\u9632\u6B62\u4F60\u8DD1\u51FA\u53BB\u4E86\u3002</strong></p></blockquote><p><strong>\u4EC0\u4E48\u662F\u7279\u5B9A\uFF1A</strong></p><p><code>cgroups</code> \u9002\u7528\u4E8E\u591A\u79CD\u5E94\u7528\u573A\u666F\uFF0C\u4ECE\u5355\u4E2A\u8FDB\u7A0B\u7684\u8D44\u6E90\u63A7\u5236\uFF0C\u5230\u5B9E\u73B0\u64CD\u4F5C\u7CFB\u7EDF\u5C42\u6B21\u7684\u865A\u62DF\u5316\uFF08OS Level Virtualization\uFF09\u3002</p><ol><li><p>\u9650\u5236\u8FDB\u7A0B\u7EC4\u53EF\u4EE5\u4F7F\u7528\u7684\u8D44\u6E90\u6570\u91CF\uFF08Resource limiting \uFF09\u3002\u6BD4\u5982\uFF1Amemory\u5B50\u7CFB\u7EDF\u53EF\u4EE5\u4E3A\u8FDB\u7A0B\u7EC4\u8BBE\u5B9A\u4E00\u4E2Amemory\u4F7F\u7528\u4E0A\u9650\uFF0C\u4E00\u65E6\u8FDB\u7A0B\u7EC4\u4F7F\u7528\u7684\u5185\u5B58\u8FBE\u5230\u9650\u989D\u518D\u7533\u8BF7\u5185\u5B58\uFF0C\u5C31\u4F1A\u51FA\u53D1OOM\uFF08out of memory\uFF09\u3002</p></li><li><p>\u8FDB\u7A0B\u7EC4\u7684\u4F18\u5148\u7EA7\u63A7\u5236\uFF08Prioritization \uFF09\u3002\u6BD4\u5982\uFF1A\u53EF\u4EE5\u4F7F\u7528cpu\u5B50\u7CFB\u7EDF\u4E3A\u67D0\u4E2A\u8FDB\u7A0B\u7EC4\u5206\u914D\u7279\u5B9Acpu share\u3002</p></li><li><p>\u8BB0\u5F55\u8FDB\u7A0B\u7EC4\u4F7F\u7528\u7684\u8D44\u6E90\u6570\u91CF\uFF08Accounting \uFF09\u3002\u6BD4\u5982\uFF1A\u53EF\u4EE5\u4F7F\u7528cpuacct\u5B50\u7CFB\u7EDF\u8BB0\u5F55\u67D0\u4E2A\u8FDB\u7A0B\u7EC4\u4F7F\u7528\u7684cpu\u65F6\u95F4</p></li><li><p>\u8FDB\u7A0B\u7EC4\u9694\u79BB\uFF08Isolation\uFF09\u3002\u6BD4\u5982\uFF1A\u4F7F\u7528ns\u5B50\u7CFB\u7EDF\u53EF\u4EE5\u4F7F\u4E0D\u540C\u7684\u8FDB\u7A0B\u7EC4\u4F7F\u7528\u4E0D\u540C\u7684namespace\uFF0C\u4EE5\u8FBE\u5230\u9694\u79BB\u7684\u76EE\u7684\uFF0C\u4E0D\u540C\u7684\u8FDB\u7A0B\u7EC4\u6709\u5404\u81EA\u7684\u8FDB\u7A0B\u3001\u7F51\u7EDC\u3001\u6587\u4EF6\u7CFB\u7EDF\u6302\u8F7D\u7A7A\u95F4\u3002</p></li></ol><p><strong>Cgroups\u5B50\u7CFB\u7EDF\u4ECB\u7ECD\uFF1A</strong></p><ul><li><code>blkio</code> \u2014 \u8FD9\u4E2A\u5B50\u7CFB\u7EDF\u4E3A\u5757\u8BBE\u5907\u8BBE\u5B9A\u8F93\u5165/\u8F93\u51FA\u9650\u5236\uFF0C\u6BD4\u5982\u7269\u7406\u8BBE\u5907\uFF08\u78C1\u76D8\uFF0C\u56FA\u6001\u786C\u76D8\uFF0CUSB \u7B49\u7B49\uFF09\u3002</li><li><code>cpu</code> \u2014 \u8FD9\u4E2A\u5B50\u7CFB\u7EDF\u4F7F\u7528\u8C03\u5EA6\u7A0B\u5E8F\u63D0\u4F9B\u5BF9 CPU \u7684 cgroup \u4EFB\u52A1\u8BBF\u95EE\u3002</li><li><code>cpuacct</code> \u2014 \u8FD9\u4E2A\u5B50\u7CFB\u7EDF\u81EA\u52A8\u751F\u6210 cgroup \u4E2D\u4EFB\u52A1\u6240\u4F7F\u7528\u7684 CPU \u62A5\u544A\u3002</li><li><code>cpuset</code> \u2014 \u8FD9\u4E2A\u5B50\u7CFB\u7EDF\u4E3A cgroup \u4E2D\u7684\u4EFB\u52A1\u5206\u914D\u72EC\u7ACB CPU\uFF08\u5728\u591A\u6838\u7CFB\u7EDF\uFF09\u548C\u5185\u5B58\u8282\u70B9\u3002</li><li><code>devices</code> \u2014 \u8FD9\u4E2A\u5B50\u7CFB\u7EDF\u53EF\u5141\u8BB8\u6216\u8005\u62D2\u7EDD cgroup \u4E2D\u7684\u4EFB\u52A1\u8BBF\u95EE\u8BBE\u5907\u3002</li><li><code>freezer</code> \u2014 \u8FD9\u4E2A\u5B50\u7CFB\u7EDF\u6302\u8D77\u6216\u8005\u6062\u590D cgroup \u4E2D\u7684\u4EFB\u52A1\u3002</li><li><code>memory</code> \u2014 \u8FD9\u4E2A\u5B50\u7CFB\u7EDF\u8BBE\u5B9A cgroup \u4E2D\u4EFB\u52A1\u4F7F\u7528\u7684\u5185\u5B58\u9650\u5236\uFF0C\u5E76\u81EA\u52A8\u751F\u6210\u7531\u90A3\u4E9B\u4EFB\u52A1\u4F7F\u7528\u7684\u5185\u5B58\u8D44\u6E90\u62A5\u544A\u3002</li><li><code>net_cls</code> \u2014 \u8FD9\u4E2A\u5B50\u7CFB\u7EDF\u4F7F\u7528\u7B49\u7EA7\u8BC6\u522B\u7B26\uFF08classid\uFF09\u6807\u8BB0\u7F51\u7EDC\u6570\u636E\u5305\uFF0C\u53EF\u5141\u8BB8 Linux \u6D41\u91CF\u63A7\u5236\u7A0B\u5E8F\uFF08tc\uFF09\u8BC6\u522B\u4ECE\u5177\u4F53 cgroup \u4E2D\u751F\u6210\u7684\u6570\u636E\u5305\u3002</li><li><code>ns</code> \u2014 \u540D\u79F0\u7A7A\u95F4\u5B50\u7CFB\u7EDF\u3002</li></ul>`,19);function A(E,M){const t=d("router-link"),n=d("ExternalLinkIcon"),r=d("RouterLink");return l(),p("div",null,[m,o("nav",h,[o("ul",null,[o("li",null,[c(t,{to:"#\u5E95\u5C42\u7ED3\u6784"},{default:a(()=>[g]),_:1}),o("ul",null,[o("li",null,[c(t,{to:"#\u7ECF\u5178\u4E91\u8BA1\u7B97\u67B6\u6784"},{default:a(()=>[_]),_:1})]),o("li",null,[c(t,{to:"#\u4ECB\u7ECD"},{default:a(()=>[k]),_:1})]),o("li",null,[c(t,{to:"#baas-\u533A\u5757\u94FE\u5373\u670D\u52A1"},{default:a(()=>[b]),_:1})])])]),o("li",null,[c(t,{to:"#docker"},{default:a(()=>[f]),_:1})]),o("li",null,[c(t,{to:"#rootfs"},{default:a(()=>[S]),_:1})]),o("li",null,[c(t,{to:"#namespace"},{default:a(()=>[x]),_:1})]),o("li",null,[c(t,{to:"#control-groups"},{default:a(()=>[v]),_:1})])])]),B,o("details",y,[q,o("p",null,[P,o("a",C,[w,c(n)]),L]),I,N,z]),D,o("ul",null,[o("li",null,[c(r,{to:"/markdown/41.html"},{default:a(()=>[H]),_:1})])]),V])}const T=i(u,[["render",A],["__file","47.html.vue"]]);export{T as default};
