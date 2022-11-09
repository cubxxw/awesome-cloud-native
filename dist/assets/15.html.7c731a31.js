import{_ as r,r as d,o as c,c as p,a as e,b as n,w as a,e as s,d as l}from"./app.a3f5aa54.js";const h={},m={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},u=s("author"),v=e("h1",{id:"\u7B2C15\u8282-helm",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C15\u8282-helm","aria-hidden":"true"},"#"),s(" \u7B2C15\u8282 helm")],-1),b=e("div",null,[e("a",{href:"14.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"16.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),g=e("br",null,null,-1),_=s("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),k={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},f=s("http://nsddd.top"),y=e("hr",null,null,-1),x={class:"table-of-contents"},C=s("helm\u4ECB\u7ECD"),q=s("v2 vs v3"),H=s("\u533A\u522B\u5BF9\u6BD4"),R=s("Helm Controller"),S=s("helm\u5B89\u88C5"),D=s("\u7528\u4E8C\u8FDB\u5236\u7248\u672C\u5B89\u88C5"),E=s("\u4F7F\u7528\u811A\u672C\u5B89\u88C5"),z=s("\u914D\u7F6Ehelm\u6E90"),A=s("\u5FEB\u901F\u4E0A\u624B"),L=s("\u548Cdocker\u4E00\u6837\uFF0C\u641C\u7D22\u53EF\u7528\u7684\u5305\uFF1A"),w=s("helm\u5305\u62C9\u53D6"),V=s("\u5B89\u88C5\u96C6\u7FA4\u955C\u50CF"),M=s("helm \u914D\u7F6E\u5B89\u88C5\u96C6\u7FA4"),T=s("END \u94FE\u63A5"),N=e("p",null,"[TOC]",-1),B=e("h2",{id:"helm\u4ECB\u7ECD",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#helm\u4ECB\u7ECD","aria-hidden":"true"},"#"),s(" helm\u4ECB\u7ECD")],-1),I={class:"custom-container tip"},K=l('<p class="custom-container-title">\u63D0\u793A</p><p>\u4F7F\u7528 <code>Helm</code> \u6211\u4EEC\u53EF\u4EE5\u975E\u5E38\u65B9\u4FBF\u7684\u5C31\u642D\u5EFA\u51FA\u6765 <code>MongoDB</code> / <code>MySQL</code> \u526F\u672C\u96C6\u7FA4\uFF0C<code>YAML</code> \u6587\u4EF6\u522B\u4EBA\u90FD\u7ED9\u6211\u4EEC\u5199\u597D\u4E86\uFF0C\u76F4\u63A5\u4F7F\u7528\u3002</p><p><code>helm</code>\u7684\u4F5C\u7528\u5C31\u662F\u628A\u8BB8\u591A\u7684\u8D44\u6E90\u5B9A\u4E49 \u6BD4\u5982<code>svc</code>\uFF0C<code>deployment</code>\uFF0C\u4E00\u6B21\u6027\u901A\u8FC7\u5168\u90E8\u5B9A\u4E49\u597D\uFF0C\u653E\u5728\u6E90\u91CC\u7EDF\u4E00\u7BA1\u7406\uFF0C\u8FD9\u6837\u5F88\u5BB9\u6613\u5728\u5176\u4ED6\u673A\u5668\u4E0A\u90E8\u7F72\uFF0C\u4E2A\u4EBA\u7406\u89E3\u8FD9\u4E2A\u7C7B\u4F3C\u4E8E\u81EA\u52A8\u5316\u8FD0\u7EF4\u4E2D<code>ansible</code>\u4E2D\u7684\u89D2\u8272\u6982\u5FF5\uFF0C\u524D\u7AEF\u9879\u76EE\u4E2D\u7684<code>npm</code>\u5305\u7BA1\u7406\u5DE5\u5177,\u540E\u7AEF\u9879\u76EE\u4E2D\u7684<code>maven</code>\u7B49\u6784\u5EFA\u5DE5\u5177\u4E00\u6837\uFF0C\u7C7B\u6BD4<code>Ansible</code>\u4F7F\u7528\u89D2\u8272\u6765\u6574\u5408<code>playbook.yaml</code>\u8FBE\u5230\u590D\u7528\u6027\u3002\u540C\u6837\u7684\uFF0C\u4F7F\u7528<code>helm</code>\u7528\u4E8E\u6574\u5408k8s\u4E2D\u7684\u8D44\u6E90\u5BF9\u8C61<code>yaml</code>\u6587\u4EF6\uFF0C\u5B9E\u73B0\u590D\u7528\u6027,\u540C\u65F6\u8BB2\u8D44\u6E90\u6587\u4EF6\u7684\u53C2\u6570\uFF0C\u548C\u53C2\u6570\u503C\u901A\u8FC7<code>temple</code>\u548C<code>value</code>\u8FDB\u884C\u4E86\u5206\u79BB\u3002</p>',3),P={href:"https://helm.sh/zh/",target:"_blank",rel:"noopener noreferrer"},G=s("\u5B98\u7F51"),J={href:"https://artifacthub.io/",target:"_blank",rel:"noopener noreferrer"},F=s("\u5E94\u7528\u4E2D\u5FC3"),Y=l('<details class="custom-container details"><summary>\u547D\u4EE4\u901F\u67E5</summary><p>helm\u5E38\u7528\u547D\u4EE4\uFF1A</p><p>1\u3001\u67E5\u770B\u670D\u52A1\u72B6\u6001</p><p><code>service httpd status</code></p><p>2\u3001\u542F\u52A8\u670D\u52A1</p><p><code>service httpd start</code></p><p>3\u3001\u505C\u6B62\u670D\u52A1</p><p><code>service httpd stop</code></p><p>4\u3001\u91CD\u542F\u670D\u52A1</p><p><code>service httpd restart</code></p><p>5\u3001\u91CD\u8F7D\u914D\u7F6E\u6587\u4EF6</p><p><code>service httpd reload</code></p><p>6\u3001\u67E5\u770B\u7AEF\u53E3\u5360\u7528\u60C5\u51B5</p><p><code>netstat -tunlp</code></p><p>7\u3001\u67E5\u770Bhttpd\u8FDB\u7A0B</p><p><code>ps -ef | grep httpd</code></p><p>8\u3001\u67E5\u770Bhttpd\u7248\u672C</p><p><code>httpd -v</code></p><p>9\u3001\u67E5\u770Bhttpd\u914D\u7F6E\u6587\u4EF6</p><p><code>httpd -V</code></p><p>10\u3001\u67E5\u770Bhttpd\u6A21\u5757</p><p><code>httpd -l</code></p><p>11\u3001\u67E5\u770Bhttpd\u6A21\u5757\u8BE6\u7EC6\u4FE1\u606F</p><p><code>httpd -M</code></p><p>12\u3001\u67E5\u770Bhttpd\u5B89\u88C5\u8DEF\u5F84</p><p><code>httpd -V | grep SERVER_CONFIG_FILE</code></p><p>13\u3001\u67E5\u770Bhttpd\u9519\u8BEF\u65E5\u5FD7</p><p><code>cat /var/log/httpd/error_log</code></p><p>14\u3001\u67E5\u770Bhttpd\u8BBF\u95EE\u65E5\u5FD7</p><p><code>cat /var/log/httpd/access_log</code></p><p>15\u3001\u67E5\u770Bhttpd\u914D\u7F6E\u6587\u4EF6</p><p><code>cat /etc/httpd/conf/httpd.conf</code></p><p>16\u3001\u67E5\u770Bhttpd\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684\u6A21\u5757</p><p><code>cat /etc/httpd/conf/httpd.conf | grep LoadModule</code></p><p>17\u3001\u67E5\u770Bhttpd\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684\u865A\u62DF\u4E3B\u673A</p><p><code>cat /etc/httpd/conf/httpd.conf | grep VirtualHost</code></p><p>18\u3001\u67E5\u770Bhttpd\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684\u76D1\u542C\u7AEF\u53E3</p><p><code>cat /etc/httpd/conf/httpd.conf | grep Listen</code></p></details><div class="custom-container danger"><p class="custom-container-title">heml\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898\uFF1F</p><p>\u6211\u4EEC\u90E8\u7F72\u5E94\u7528\uFF1F</p><p><code>k8s</code> \u4E0A\u7684\u5E94\u7528\u5BF9\u8C61\uFF0C\u90FD\u662F\u7531\u7279\u5B9A\u7684\u8D44\u6E90\u63CF\u8FF0\u7EC4\u6210\uFF0C \u5305\u62EC <code>deployment</code>\u3001<code>service</code> \u7B49\uFF0C\u90FD\u4FDD\u5B58\u5728\u5404\u81EA\u6587\u4EF6\u4E2D\u6216\u8005\u96C6\u6210\u5230\u4E00\u4E2A\u914D\u7F6E\u6587\u4EF6\uFF0C\u7136\u540E\u901A\u8FC7 <code>kubectl apply -f</code> \u90E8\u7F72</p><blockquote><p><strong>\u6211\u4EEC\u90E8\u7F72\u5C0F\u7684\u5E94\u7528\u7A0B\u5E8F\u80AF\u5B9A\u662F\u6CA1\u6709\u95EE\u9898\u7684\uFF0C\u4F46\u662F\u90E8\u7F72\u4E00\u4E2A\u590D\u6742\u7684\u5E94\u7528\u7BA1\u7406 <code>yaml</code> \u6587\u4EF6\uFF0C\u53EF\u80FD\u5C31\u6709\u4E9B\u9EBB\u70E6\u3002</strong></p></blockquote><p><strong>\u6211\u4EEC\u9700\u8981\uFF1A</strong></p><ol><li>\u5982\u4F55\u5C06\u8FD9\u4E9B\u670D\u52A1\u4F5C\u4E3A\u4E00\u4E2A\u6574\u4F53\u7BA1\u7406</li><li>\u8FD9\u4E9B\u8D44\u6E90\u6587\u4EF6\u5982\u4F55\u9AD8\u6548\u590D\u7528</li><li>\u4E0D\u652F\u6301\u5E94\u7528\u7EA7\u522B\u7684\u7248\u672C\u7BA1\u7406</li></ol></div><p>helm\u5C31\u80FD\u89E3\u51B3\u8FD9\u4E9B\u95EE\u9898\uFF0C\u5B83\u5C31\u7C7B\u4F3C\u4E8ELinux\u4E2D\u7684<code>yum</code>\u5305\u6216\u8005<code>apt</code>\u5305\u3002</p>',3),O={class:"custom-container tip"},$=e("p",{class:"custom-container-title"},"\u63D0\u793A",-1),j={href:"https://github.com/helm/helm",target:"_blank",rel:"noopener noreferrer"},Q=s("\u5F00\u6E90\u9879\u76EE\u5730\u5740"),U=s("Helm \u662F Kubernetes \u7684\u9996\u9009\u5305\u7BA1\u7406\u5DE5\u5177\u3002Helm Chart \u4E3A Kubernetes YAML \u6E05\u5355\u6587\u4EF6\u63D0\u4F9B\u4E86\u6A21\u677F\u5316\u8BED\u6CD5\u3002\u901A\u8FC7 Helm\uFF0C\u6211\u4EEC\u53EF\u4EE5\u521B\u5EFA\u53EF\u914D\u7F6E\u7684\u90E8\u7F72\uFF0C\u800C\u4E0D\u4EC5\u4EC5\u662F\u4F7F\u7528\u9759\u6001\u6587\u4EF6\u3002\u6709\u5173\u521B\u5EFA\u81EA\u5DF1\u7684\u90E8\u7F72\u76EE\u5F55\u7684\u66F4\u591A\u4FE1\u606F\uFF0C\u8BF7\u67E5\u770B"),W={href:"https://helm.sh/docs/intro/quickstart/",target:"_blank",rel:"noopener noreferrer"},X=s("Helm \u5FEB\u901F\u5165\u95E8"),Z=s("\u3002"),ee=s("K3s \u4E0D\u9700\u8981\u4EFB\u4F55\u7279\u6B8A\u7684\u914D\u7F6E\u5C31\u53EF\u4EE5\u4F7F\u7528 Helm \u547D\u4EE4\u884C\u5DE5\u5177\u3002\u53EA\u8981\u786E\u4FDD\u4F60\u5DF2\u7ECF\u6309\u7167"),se={href:"https://docs.rancher.cn/docs/k3s/cluster-access/_index",target:"_blank",rel:"noopener noreferrer"},ne=s("\u96C6\u7FA4\u8BBF\u95EE"),ae=s("\u4E00\u8282\u6B63\u786E\u8BBE\u7F6E\u4E86\u4F60\u7684 kubeconfig\u3002 K3s \u5305\u542B\u4E86\u4E00\u4E9B\u989D\u5916\u7684\u529F\u80FD\uFF0C\u901A\u8FC7"),te={href:"https://docs.rancher.cn/docs/k3s/helm/_index#%E4%BD%BF%E7%94%A8-helm-crd",target:"_blank",rel:"noopener noreferrer"},oe=s("rancher/helm-release CRD"),le=s("\uFF0C\u4F7F\u4F20\u7EDF\u7684 Kubernetes \u8D44\u6E90\u6E05\u5355\u548C Helm Charts \u90E8\u7F72\u66F4\u52A0\u5BB9\u6613\u3002"),de=l('<h2 id="v2-vs-v3" tabindex="-1"><a class="header-anchor" href="#v2-vs-v3" aria-hidden="true">#</a> v2 vs v3</h2><p><strong>\u7B80\u5355\u6765\u8BF4\uFF0CHelm\u5C31\u662F\u4E00\u4E2A\u7B2C\u4E09\u65B9\u90E8\u7F72k8s\u5E94\u7528\u7684\u5DE5\u5177</strong></p><div class="custom-container tip"><p class="custom-container-title">helm v3 vs v2\u7279\u6027</p><p>\u53E6\u5916\uFF0C\u5E38\u7528\u7684Helm\u7248\u672C\u6709v2\u8DDFv3\uFF0CHelm v3\u533A\u522B\u4E8Ev2\u4E3B\u8981\u6709\u4EE5\u4E0B\u7279\u6027\uFF1A</p><ul><li>\u79FB\u9664\u4E86Tiller(from SA to kubeconfig)</li><li>\u4E09\u65B9\u4F1A\u8C08 (Three-way Strategic merge patch)</li><li>\u4F7F\u7528Secret\u4F5C\u4E3A\u9ED8\u8BA4\u5B58\u50A8</li></ul></div><h3 id="\u533A\u522B\u5BF9\u6BD4" tabindex="-1"><a class="header-anchor" href="#\u533A\u522B\u5BF9\u6BD4" aria-hidden="true">#</a> \u533A\u522B\u5BF9\u6BD4</h3><p><strong>1\u3001\u79FB\u9664\u4E86Tiller(from SA to kubeconfig)</strong></p><p>\u539F\u6765Helm v2\u9700\u8981\u5728 Kubernetes \u96C6\u7FA4\u4E2D\u90E8\u7F72<code>Tiller</code>\uFF08<code>Tiller</code> \u7528\u4E8E\u63A5\u6536 Helm \u7684\u8BF7\u6C42\uFF0C\u5E76\u6839\u636E <code>Chart</code> \u751F\u6210 Kubernetes \u7684\u90E8\u7F72\u6587\u4EF6\uFF09\uFF0C<code>Tiller pod</code> \u6839\u636E\u81EA\u8EABSA\u6743\u9650\u90E8\u7F72\u5E94\u7528\u3002\u5E76\u4E14\u5728\u591A\u79DF\u6237\u73AF\u5883\u4E0B\uFF0C\u4E3A\u4E86\u8FDB\u884C\u6743\u9650\u7BA1\u7406\u9700\u8981\u90E8\u7F72\u591A\u4E2A<code>Tiller</code>\u3002</p><p><img src="http://sm.nsddd.top/smwebp" alt="img">\u5728 Helm v3 \u4E2D\uFF0CTiller \u88AB\u79FB\u9664\u4E86\u3002\u65B0\u7684 Helm \u5BA2\u6237\u7AEF\u4F1A\u50CF kubectl \u547D\u4EE4\u4E00\u6837\uFF0C\u8BFB\u53D6\u672C\u5730\u7684 kubeconfig \u6587\u4EF6\uFF0C\u4F7F\u7528\u6211\u4EEC\u5728 kubeconfig \u4E2D\u9884\u5148\u5B9A\u4E49\u597D\u7684SA\u6743\u9650\u6765\u8FDB\u884C\u4E00\u7CFB\u5217\u64CD\u4F5C\u3002\u8FD9\u6837\u505A\u6CD5\u5373\u7B80\u5355\uFF0C\u53C8\u5B89\u5168\u3002</p><p><strong>2\u3001\u4E09\u65B9\u4F1A\u8C08 (Three-way Strategic merge patch)</strong></p><p>\u4F1A\u517C\u5BB9\u901A\u8FC7\u7B2C\u4E09\u65B9\u4FEE\u6539\u7684\u5C5E\u6027\uFF08\u5982\u901A\u8FC7kubectl edit\u4FEE\u6539\u7684\u5C5E\u6027\uFF0C\u5728helm upgrade\u65F6\u4F1A\u8003\u8651\u8FDB\u53BB\uFF09</p><p><img src="http://sm.nsddd.top/smwebp2" alt="img"></p><p><strong>3\u3001\u4F7F\u7528Secret\u4F5C\u4E3A\u9ED8\u8BA4\u5B58\u50A8</strong></p><p><strong>4\u3001crd-install hook\u8FC1\u79FB\u5230\u4E86crds/\u8DEF\u5F84\u7B49</strong></p><details class="custom-container details"><summary>\u4EC0\u4E48\u662FCRD\uFF1F</summary><p>CRD(Custom Resource Define) \u81EA\u5B9A\u4E49\u8D44\u6E90\u5B9A\u4E49\uFF0C\u662F\u5728k8s\u9AD8\u7248\u672C\uFF08v1.7+\uFF09\u4E0A\u65B0\u589E\u52A0\u7684\u65B0\u7279\u6027\uFF0C\u4E3A\u4E86\u63D0\u9AD8\u62D3\u5C55\u6027\uFF0C\u8BA9\u5F00\u53D1\u8005\u53EF\u4EE5\u81EA\u5DF1\u53BB\u5B9A\u4E49k8s\u8D44\u6E90\u5BF9\u8C61\u3002</p><p>\u5B9E\u9645\u8FD0\u884C\u65F6\u662F\u4EE5CR\uFF08Custom Resourse\u81EA\u5B9A\u4E49\u8D44\u6E90\uFF09\u5177\u4F53\u5B9E\u4F8B\u8FDB\u884C\u5448\u73B0\u3002</p><p><strong>\u5F53\u524D\u5DF2\u7ECF\u5B58\u5728\u7684\u5B98\u65B9\u8D44\u6E90\uFF1A</strong></p><ul><li><code>Pod</code>\uFF1A\u662F\u4E00\u79CD\u96C6\u5408\u4E86\u591A\u4E2A\u5E94\u7528\u5BB9\u5668\u3001\u5B58\u50A8\u8D44\u6E90\u3001\u4E13\u7528IP\u53CA\u652F\u6491\u5BB9\u5668\u8FD0\u884C\u5176\u4ED6\u914D\u7F6E\u9009\u9879\u7684\u903B\u8F91\u7EC4\u4EF6\uFF0C\u662Fk8s\u90E8\u7F72\u5355\u5143\u548C\u539F\u5B50\u8FD0\u884C\u5355\u5143\uFF0C\u7B80\u5355\u6765\u8BF4\u5C31\u662F\u4E00\u4E2A\u8FD0\u884C\u591A\u4E2A\u5E94\u7528\u7A0B\u5E8F\u7684\u5355\u4E00\u8FD0\u884C\u5B9E\u4F8B\uFF0C\u901A\u8FC7\u5171\u4EAB\u8D44\u6E90\u76F8\u4E92\u8054\u7CFB\u7684\u5E94\u7528\u5BB9\u5668\u3002\u901A\u4FD7\u7684\u8BB2\uFF0Cpod\u662F\u4E00\u4E2A\u7269\u7406\u4E3B\u673A\u6216VM\u4E3B\u673A\uFF0Cpod\u4E2D\u7684\u5E94\u7528\u5BB9\u5668\u5C31\u662F\u4E3B\u673A\u4E0A\u7684\u8FDB\u7A0B\uFF0C\u5F7C\u6B64\u9694\u79BB\u3002</li><li><code>ReplicaSet</code>\uFF1A\u5B9A\u4E49\u4E00\u7EC4\u4EFB\u4F55\u65F6\u5019\u90FD\u5904\u4E8E\u8FD0\u884C\u72B6\u6001\u7684pod\u526F\u672C\u7684\u7A33\u5B9A\u96C6\u5408\u8D44\u6E90\uFF0C\u4FDD\u8BC1\u8FD0\u884C\u6307\u5B9A\u6570\u91CF\u7684\u3001\u5B8C\u5168\u76F8\u540C\u7684pod\u7684\u53EF\u7528\u6027\u3002</li><li><code>ReplicationController</code>\uFF1A\u8DDFReplicaSet\u662F\u4E00\u6837\u7684\uFF0C\u786E\u4FDD\u5728\u4EFB\u4F55\u65F6\u5019\u90FD\u6709\u7279\u5B9A\u6570\u91CF\u7684 Pod \u526F\u672C\u5904\u4E8E\u8FD0\u884C\u72B6\u6001\u3002 \u6362\u53E5\u8BDD\u8BF4\uFF0CReplicationController \u786E\u4FDD\u4E00\u4E2A Pod \u6216\u4E00\u7EC4\u540C\u7C7B\u7684 Pod \u603B\u662F\u53EF\u7528\u7684\u3002\u4F46\u662F\u66F4\u63A8\u8350\u4F7F\u7528ReplicaSet\u7684Deployment\u53BB\u5EFA\u7ACB\u526F\u672C\u3002</li><li><code>Deployment</code>\uFF1A\u8BE5\u5BF9\u8C61\u662F\u7528\u6765\u63CF\u8FF0pod\u548CReplicaSet\u526F\u672C\u7684\u76EE\u6807\u72B6\u6001\uFF0C\u5E76\u66F4\u65B0\u4ED6\u4EEC\u4E0D\u7B26\u5408\u671F\u671B\u65F6\u7684\u72B6\u6001\u3002</li><li><code>StatefulSet</code>\uFF1A\u8BE5\u8D44\u6E90\u5BF9\u8C61\u7528\u6765\u7BA1\u7406\u6709\u72B6\u6001\u5E94\u7528pod\u7684\u5DE5\u4F5C\u8D1F\u8F7D\uFF0C\u652F\u6301pod\u96C6\u5408\u7684\u90E8\u7F72\u548C\u6269\u5BB9\u3001\u7F29\u5BB9\u3002</li><li><code>DaemonSet</code>\uFF1A\u8BE5\u5BF9\u8C61\u7528\u6765\u786E\u4FDD\u5168\u90E8\u6216\u8005\u90E8\u5206\u8282\u70B9\u90FD\u8FD0\u884C\u4E00\u4E2Apod\u526F\u672C\uFF0C\u5C31\u662F\u6211\u4EEC\u6240\u8BF4\u7684\u5B88\u62A4\u8FDB\u7A0B\u3002</li><li><code>Job</code>\uFF1A\u8BE5\u5BF9\u8C61\u7528\u6765\u6267\u884C\u76EE\u6807\u72B6\u6001\u7684pod\u526F\u672C\u7684\u4E00\u4E2A\u4EFB\u52A1\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u76D1\u542C\u4EFB\u52A1\uFF0C\u5B9E\u65F6\u63A7\u5236pod\u526F\u672C\u8FBE\u5230\u671F\u671B\u72B6\u6001\u3002</li><li><code>CronJob</code>\uFF1A\u8FD9\u662F\u4E00\u4E2A\u6709\u65F6\u95F4\u5468\u671F\u7684Job\u3002</li><li><code>HorizontalPodAutoscaling</code>\uFF1A\u8BE5\u5BF9\u8C61\u4E3Apod\u6C34\u5E73\u81EA\u52A8\u6269\u7F29\uFF0C\u81EA\u52A8\u66F4\u65B0\u5DE5\u4F5C\u8D1F\u8F7D\u8D44\u6E90\uFF08Deployment\u548CStatefulSet\uFF09\uFF0C\u76EE\u7684\u662F\u81EA\u52A8\u6269\u7F29\u5DE5\u4F5C\u8D1F\u8F7D\u4EE5\u6EE1\u8DB3\u9700\u6C42\u3002</li><li><code>Node</code>\uFF1A\u8282\u70B9\u662F\u4E00\u4E2A\u865A\u62DF\u673A\u6216\u8005\u7269\u7406\u673A\uFF0C\u8282\u70B9\u4E0A\u8FD0\u884Cpod\u6240\u9700\u7684\u5BB9\u5668\u3002</li><li><code>Namespace</code>\uFF1A\u547D\u540D\u7A7A\u95F4\uFF0C\u662F\u4E00\u79CD\u673A\u5236\uFF0C\u5C06\u540C\u4E00\u96C6\u7FA4\u7684\u8D44\u6E90\u5212\u5206\u4E00\u4E2A\u76F8\u4E92\u9694\u79BB\u7684\u7EC4\u3002</li><li><code>Service</code>\uFF1A\u5C31\u662F\u8FD0\u884C\u5728pod\u4E0A\u7684\u63D0\u4F9B\u670D\u52A1\u7684\u7EC4\u4EF6\uFF0C\u5982\u5FAE\u670D\u52A1\u7EC4\u4EF6\u3002</li><li><code>Ingress</code>\uFF1A\u662F\u5404\u4E2A\u670D\u52A1service\u76F8\u4E92\u8BBF\u95EE\u7684\u4E00\u4E2A\u4E2D\u95F4\u8DEF\u7531\u7BA1\u7406\u5668\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u6D41\u91CF\u63A7\u5236\u7B49\u3002</li><li><code>Label</code>\uFF1A\u4E3A\u6BCF\u4E2A\u5BF9\u8C61\u5B9A\u4E49\u6807\u7B7E\uFF0C\u7528\u4E8E\u6807\u7B7E\u9009\u62E9\u5668\u53EF\u4EE5\u9AD8\u6548\u5730\u67E5\u8BE2\u548C\u76D1\u542Ck8s\u5BF9\u8C61\u3002</li><li><code>CustomResourceDefinition</code>\uFF1A\u7528\u4E8E\u5F00\u53D1\u8005\u81EA\u5B9A\u4E49\u7684\u8D44\u6E90\u5BF9\u8C61\u3002</li></ul></details><p><strong>\u5982\u4F55\u4F7F\u7528CRD\uFF1A</strong></p><p>CRD \u8D44\u6E90\u53EF\u4EE5\u52A8\u6001\u6CE8\u518C\u5230\u96C6\u7FA4\u4E2D\uFF0C\u6CE8\u518C\u5B8C\u6BD5\u540E\uFF0C\u7528\u6237\u53EF\u4EE5\u901A\u8FC7 kubectl \u6765\u521B\u5EFA\u8BBF\u95EE\u8FD9\u4E2A\u81EA\u5B9A\u4E49\u7684\u8D44\u6E90\u5BF9\u8C61\uFF0C\u7C7B\u4F3C\u4E8E\u64CD\u4F5C Pod \u4E00\u6837\u3002</p><h2 id="helm-controller" tabindex="-1"><a class="header-anchor" href="#helm-controller" aria-hidden="true">#</a> Helm Controller</h2><p>Helm Controller\u5B9E\u9645\u4E0A\u5C31\u662F\u4E00\u4E2ACRD Controller\uFF0C\u7BA1\u7406\u7684\u662FHelmChart\u7C7B\u578B\u7684CRD API</p><p><img src="http://sm.nsddd.top/sm23094781.png" alt="img"></p><p><strong>\u8BBE\u8BA1\u539F\u7406\uFF1A</strong></p><p>1\u3001<code>Helm-controller</code> \u8FD0\u884C\u5728<code>master</code>\u8282\u70B9\u5E76<code>list/watch HelmChart CRD</code>\u5BF9\u8C61</p><p>2\u3001<code>CRD onChange</code>\u65F6\u6267\u884C<code>Job</code>\u66F4\u65B0</p><p>3\u3001<code>Job Container</code>\u4F7F\u7528<code>rancher/kilipper-helm</code>\u4E3A<code>entrypoint</code></p><p>4\u3001<code>Killper-helm</code>\u5185\u7F6E<code>helm cli</code>\uFF0C\u53EF\u4EE5\u5B89\u88C5/\u5347\u7EA7/\u5220\u9664\u5BF9\u5E94\u7684<code>chart</code></p><h2 id="helm\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#helm\u5B89\u88C5" aria-hidden="true">#</a> helm\u5B89\u88C5</h2><h3 id="\u7528\u4E8C\u8FDB\u5236\u7248\u672C\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u7528\u4E8C\u8FDB\u5236\u7248\u672C\u5B89\u88C5" aria-hidden="true">#</a> \u7528\u4E8C\u8FDB\u5236\u7248\u672C\u5B89\u88C5</h3>',25),ie=s("\u6BCF\u4E2AHelm "),re={href:"https://github.com/helm/helm/releases",target:"_blank",rel:"noopener noreferrer"},ce=s("\u7248\u672C"),pe=s("\u90FD\u63D0\u4F9B\u4E86\u5404\u79CD\u64CD\u4F5C\u7CFB\u7EDF\u7684\u4E8C\u8FDB\u5236\u7248\u672C\uFF0C\u8FD9\u4E9B\u7248\u672C\u53EF\u4EE5\u624B\u52A8\u4E0B\u8F7D\u548C\u5B89\u88C5\u3002"),he=s("\u4E0B\u8F7D "),me={href:"https://github.com/helm/helm/releases",target:"_blank",rel:"noopener noreferrer"},ue=s("\u9700\u8981\u7684\u7248\u672C"),ve=e("li",null,[s("\u89E3\u538B("),e("code",null,"tar -zxvf helm-v3.0.0-linux-amd64.tar.gz"),s(")")],-1),be=e("li",null,[s("\u5728\u89E3\u538B\u76EE\u4E2D\u627E\u5230"),e("code",null,"helm"),s("\u7A0B\u5E8F\uFF0C\u79FB\u52A8\u5230\u9700\u8981\u7684\u76EE\u5F55\u4E2D("),e("code",null,"mv linux-amd64/helm /usr/local/bin/helm"),s(")")],-1),ge=s("\u7136\u540E\u5C31\u53EF\u4EE5\u6267\u884C\u5BA2\u6237\u7AEF\u7A0B\u5E8F\u5E76 "),_e={href:"https://helm.sh/zh/docs/intro/quickstart/#%E5%88%9D%E5%A7%8B%E5%8C%96",target:"_blank",rel:"noopener noreferrer"},ke=s("\u6DFB\u52A0\u7A33\u5B9A\u4ED3\u5E93"),fe=s(": "),ye=e("code",null,"helm help",-1),xe=s("."),Ce=e("p",null,[e("strong",null,"\u6CE8\u610F"),s(" \u9488\u5BF9Linux AMD64\uFF0CHelm\u7684\u81EA\u52A8\u6D4B\u8BD5\u53EA\u6709\u5728CircleCi\u6784\u5EFA\u548C\u53D1\u5E03\u65F6\u624D\u4F1A\u6267\u884C\u3002\u6D4B\u8BD5\u5176\u4ED6\u64CD\u4F5C\u7CFB\u7EDF\u662F\u793E\u533A\u9488\u5BF9\u7CFB\u7EDF\u95EE\u9898\u8BF7\u6C42Helm\u7684\u8D23\u4EFB\u3002")],-1),qe=e("h3",{id:"\u4F7F\u7528\u811A\u672C\u5B89\u88C5",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u4F7F\u7528\u811A\u672C\u5B89\u88C5","aria-hidden":"true"},"#"),s(" \u4F7F\u7528\u811A\u672C\u5B89\u88C5")],-1),He=s("Helm\u73B0\u5728\u6709\u4E2A\u5B89\u88C5\u811A\u672C\u53EF\u4EE5\u81EA\u52A8\u62C9\u53D6\u6700\u65B0\u7684Helm\u7248\u672C\u5E76\u5728 "),Re={href:"https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3",target:"_blank",rel:"noopener noreferrer"},Se=s("\u672C\u5730\u5B89\u88C5"),De=s("\u3002"),Ee=l(`<p>\u60A8\u53EF\u4EE5\u83B7\u53D6\u8FD9\u4E2A\u811A\u672C\u5E76\u5728\u672C\u5730\u6267\u884C\u3002\u5B83\u826F\u597D\u7684\u6587\u6863\u4F1A\u8BA9\u60A8\u5728\u6267\u884C\u4E4B\u524D\u77E5\u9053\u811A\u672C\u90FD\u505A\u4E86\u4EC0\u4E48\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> <span class="token parameter variable">-o</span> get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
$ <span class="token function">chmod</span> <span class="token number">700</span> get_helm.sh
$ ./get_helm.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u60F3\u76F4\u63A5\u6267\u884C\u5B89\u88C5\uFF0C\u8FD0\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 <span class="token operator">|</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u914D\u7F6Ehelm\u6E90" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6Ehelm\u6E90" aria-hidden="true">#</a> \u914D\u7F6Ehelm\u6E90</h2><p><strong>\u4F7F\u7528helm\u9700\u8981\u914D\u7F6Eyaml\u6E90,\u5E38\u89C1\u7684\u6709\u963F\u91CC\u3002\u5FAE\u8F6F\uFF0C\u548CGithub\u4E0A\u7684\u6E90</strong></p><ul><li>\u963F\u91CC\u4E91\u7684\u6E90 https://apphub.aliyuncs.com</li><li>\u5FAE\u8F6F<code>azure</code>\u7684\u6E90 http://mirror.azure.cn/kubernetes/charts/</li></ul><p><strong>\u67E5\u770B\u6240\u6709\u7684\u6E90\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>helm repo list  <span class="token comment">#\u67E5\u770B\u6240\u4EE5\u7684\u6E90</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u6DFB\u52A0\u6307\u5B9A\u7684\u6E90\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>helm repo <span class="token function">add</span> azure http://mirror.azure.cn/kubernetes/charts/

helm repo <span class="token function">add</span> ali https://apphub.aliyuncs.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5FEB\u901F\u4E0A\u624B" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u901F\u4E0A\u624B" aria-hidden="true">#</a> \u5FEB\u901F\u4E0A\u624B</h2><div class="custom-container warning"><p class="custom-container-title">helm\u5E38\u89C1\u7528\u6CD5\uFF1A</p><p>Helm\u7684\u5E38\u89C1\u7528\u6CD5\uFF0C\u5305\u62EC\u641C\u7D22Chart\u3001\u5B89\u88C5Chart\u3001\u81EA\u5B9A\u4E49Chart\u914D\u7F6E\u3001\u66F4\u65B0\u6216\u56DE\u6EDARelease\u3001\u5220\u9664Release\u3001\u521B\u5EFA\u81EA\u5B9A\u4E49Chart\u3001\u642D\u5EFA\u79C1\u6709\u4ED3\u5E93\u7B49</p></div><p><strong>\u68C0\u6D4B\u7248\u672C\u7684\u5B89\u88C5\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@VM-4-3-ubuntu:~<span class="token comment"># helm version</span>
version.BuildInfo<span class="token punctuation">{</span>Version:<span class="token string">&quot;v3.9.2&quot;</span>, GitCommit:<span class="token string">&quot;1addefbfe665c350f4daf868a9adc5600cc064fd&quot;</span>, GitTreeState:<span class="token string">&quot;clean&quot;</span>, GoVersion:<span class="token string">&quot;go1.17.12&quot;</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u548Cdocker\u4E00\u6837-\u641C\u7D22\u53EF\u7528\u7684\u5305" tabindex="-1"><a class="header-anchor" href="#\u548Cdocker\u4E00\u6837-\u641C\u7D22\u53EF\u7528\u7684\u5305" aria-hidden="true">#</a> \u548Cdocker\u4E00\u6837\uFF0C\u641C\u7D22\u53EF\u7528\u7684\u5305\uFF1A</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>helm search  repo mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="helm\u5305\u62C9\u53D6" tabindex="-1"><a class="header-anchor" href="#helm\u5305\u62C9\u53D6" aria-hidden="true">#</a> helm\u5305\u62C9\u53D6</h3><p>\u5B89\u88C5chart\u53EF\u4EE5\u76F4\u63A5\u4F7F\u7528\u547D\u4EE4\u5B89\u88C5\uFF0C\u4E5F\u53EF\u4EE5\u62C9\u53D6\u5230\u672C\u5730\u4E4B\u540E\u5B89\u88C5\uFF0C\u4E5F\u53EF\u4EE5\u76F4\u63A5\u901A\u8FC7\u547D\u540D\u884C\u5B89\u88C5</p><ul><li>\u672C\u5730\u7684Chart\u538B\u7F29\u5305(helm install mysql-1.6.4.tgz)</li><li>\u4E00\u4E2AChart\u76EE\u5F55(helm install mysql/)</li><li>\u4E00\u4E2A\u5B8C\u6574\u7684URL(helm install https://example.com/charts/mysql-1.6.4.tgz)</li></ul><p><strong>chart\u5305\u62C9\u53D6\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>helm pull azure/mysql --version=1.6.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221104202213778.png" alt="image-20221104202213778"></p><p><strong>helm install\uFF1A\u5B89\u88C5Chart\uFF1A</strong></p><blockquote><p>\u8FD9\u4E2A\u547D\u4EE4\u662F\u76F4\u63A5\u62C9\u53D6\u5B89\u88C5\uFF0C\u800C\u4E0A\u9762\u7684\u662F\u53EF\u4EE5\u5B9E\u73B0\u79BB\u7EBF\u5B89\u88C5\u7684~</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>helm <span class="token function">install</span> db azure/mysql <span class="token parameter variable">--version</span><span class="token operator">=</span><span class="token number">1.6</span>.4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u62C9\u53D6\u7684chart\u5305\u8BE6\u7EC6\u4FE1\u606F\uFF0C\u901A\u8FC7\u89E3\u538B\u4E4B\u540E\u67E5\u770B\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>tar -zxvf mysql-1.6.4.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221104203359659.png" alt="image-20221104203359659"></p><p><strong>\u5173\u952E\u6587\u4EF6\uFF1A</strong></p><p><img src="http://sm.nsddd.top/smimage-20221104203553063.png" alt="image-20221104203553063"></p><p><strong>\u5BF9\u4E8E\u4E0B\u8F7D\u597D\u7684<code>yaml</code>\u6587\u4EF6\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4FEE\u6539\u540E\u4F7F\u7528<code>helm package</code>\u91CD\u65B0\u6253\u5305</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">rm</span> <span class="token parameter variable">-rf</span> mysql-1.6.4.tgz <span class="token operator">&amp;&amp;</span> helm package  mysql/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>\u6B64\u65F6 <code>mysql</code> \u4F1A\u88AB\u91CD\u65B0\u6253\u5305\u6210 <code>tar</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@VM-4-3-ubuntu:~/helm<span class="token comment"># ls</span>
mysql  mysql-1.6.4.tgz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><p><strong>\u4E0B\u9762\u6211\u4EEC\u4FEE\u6539chart\u4E2D\u7684\u5BF9\u5E94\u955C\u50CF\u4E3A\u5DF2\u7ECF\u4E0B\u8F7D\u597D\u7684mysql\u548Cbusybox\u955C\u50CF\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ansible <span class="token number">192.168</span>.26.82 <span class="token parameter variable">-m</span> shell <span class="token parameter variable">-a</span> <span class="token string">&quot;docker images | grep mysql&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u901A\u8FC7\u4FEE\u597D\u7684yaml\u6587\u4EF6\u521B\u5EFAchart</strong>\uFF0C <strong>\u4F7F\u7528<code>helm ls</code>\u67E5\u770B\u5F53\u524D\u8FD0\u884C\u7684chart</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>helm ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u4F7F\u7528<code>helm install</code>\u8FD0\u884CChart</strong></p><blockquote><p><strong>\u8FD9\u91CC\u6211\u4EEC\u4F7F\u7528\u4E4B\u524D\u7684\u90A3\u4E2Amysq chart\u6765\u5B89\u88C5\u4E00\u4E2Amysql</strong></p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> mysql/ <span class="token operator">&amp;&amp;</span> helm <span class="token function">install</span> mydb <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u67E5\u770B\u662F\u5426\u662F\u5426\u8FD0\u884C\u6210\u529Fmydb\u7684pod\u548CSVC</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl  get pods
kubectl  get svc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u5B89\u88C5\u4E00\u4E2Amysql\u5BA2\u6237\u7AEF\u6D4B\u8BD5OK\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>yum <span class="token function">install</span>  mariadb <span class="token parameter variable">-y</span>
mysql <span class="token parameter variable">-h10.107.17.103</span> <span class="token parameter variable">-uroot</span> <span class="token parameter variable">-ptesting</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u5B89\u88C5\u96C6\u7FA4\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5\u96C6\u7FA4\u955C\u50CF" aria-hidden="true">#</a> \u5B89\u88C5\u96C6\u7FA4\u955C\u50CF</h3><p><strong>Add repository\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>helm repo <span class="token function">add</span> redis https://spy86.github.io/redis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Install chart\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>helm <span class="token function">install</span> my-redis redis/redis <span class="token parameter variable">--version</span> <span class="token number">0.1</span>.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u4F7F\u7528\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>helm repo <span class="token function">add</span> bitnami https://charts.bitnami.com/bitnami
helm <span class="token function">install</span> my-mongo bitnami/mongodb

<span class="token comment"># \u6307\u5B9A\u5BC6\u7801\u548C\u67B6\u6784</span>
helm <span class="token function">install</span> my-mongo bitnami/mongodb <span class="token parameter variable">--set</span> <span class="token assign-left variable">architecture</span><span class="token operator">=</span><span class="token string">&quot;replicaset&quot;</span>,auth.rootPassword<span class="token operator">=</span><span class="token string">&quot;mongopass&quot;</span>

<span class="token comment"># \u5220\u9664</span>
helm <span class="token function">ls</span>
helm delete my-mongo

<span class="token comment"># \u67E5\u770B\u5BC6\u7801</span>
kubectl get secret my-mongo-mongodb <span class="token parameter variable">-o</span> json
kubectl get secret my-mongo-mongodb <span class="token parameter variable">-o</span> yaml <span class="token operator">&gt;</span> secret.yaml

<span class="token comment"># \u4E34\u65F6\u8FD0\u884C\u4E00\u4E2A\u5305\u542B mongo client \u7684 debian \u7CFB\u7EDF</span>
kubectl run mongodb-client <span class="token parameter variable">--rm</span> <span class="token parameter variable">--tty</span> <span class="token parameter variable">-i</span> <span class="token parameter variable">--restart</span><span class="token operator">=</span><span class="token string">&#39;Never&#39;</span> <span class="token parameter variable">--image</span> docker.io/bitnami/mongodb:4.4.10-debian-10-r20 <span class="token parameter variable">--command</span> -- <span class="token function">bash</span>

<span class="token comment"># \u8FDB\u53BB mongodb</span>
mongo <span class="token parameter variable">--host</span> <span class="token string">&quot;my-mongo-mongodb&quot;</span> <span class="token parameter variable">-u</span> root <span class="token parameter variable">-p</span> mongopass

<span class="token comment"># \u4E5F\u53EF\u4EE5\u8F6C\u53D1\u96C6\u7FA4\u91CC\u7684\u7AEF\u53E3\u5230\u5BBF\u4E3B\u673A\u8BBF\u95EE mongodb</span>
kubectl port-forward svc/my-mongo-mongodb <span class="token number">27017</span>:27018
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="helm-\u914D\u7F6E\u5B89\u88C5\u96C6\u7FA4" tabindex="-1"><a class="header-anchor" href="#helm-\u914D\u7F6E\u5B89\u88C5\u96C6\u7FA4" aria-hidden="true">#</a> helm \u914D\u7F6E\u5B89\u88C5\u96C6\u7FA4</h2><p><strong>helm \u5B89\u88C5\u8FC7\u7A0B\u4E2D\u6709\u4E24\u79CD\u65B9\u5F0F\u4F20\u9012\u6570\u636E\uFF1A</strong></p><ul><li><code>-f(\u6216--values)</code>\uFF1A\u4F7F\u7528 YAML \u6587\u4EF6\u8986\u76D6\u9ED8\u8BA4\u914D\u7F6E\u3002\u53EF\u4EE5\u6307\u5B9A\u591A\u6B21\uFF0C\u4F18\u5148\u4F7F\u7528\u6700\u53F3\u8FB9\u7684\u6587\u4EF6\u3002</li><li><code>--set</code> \uFF1A\u901A\u8FC7\u547D\u4EE4\u884C\u7684\u65B9\u5F0F\u5BF9\u6307\u5B9A\u9879\u8FDB\u884C\u8986\u76D6</li></ul><div class="custom-container danger"><p class="custom-container-title">\u6CE8\u610F</p><p>\u5982\u679C\u540C\u65F6\u4F7F\u7528\u4E24\u79CD\u65B9\u5F0F\uFF0C\u5219 <code>--set</code> \u4E2D\u7684\u503C\u4F1A\u88AB\u5408\u5E76\u5230 <code>-f</code> \u4E2D\uFF0C\u4F46\u662F <code>\u2013set</code> \u4E2D\u7684\u503C\u4F18\u5148\u7EA7\u66F4\u9AD8</p></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="14.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="16.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,58),ze=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),Ae={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},Le=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),we=s(")"),Ve=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),Me={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},Te=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function Ne(Be,Ie){const t=d("ExternalLinkIcon"),o=d("router-link"),i=d("RouterLink");return c(),p("div",null,[e("ul",null,[e("li",null,[e("a",m,[u,n(t)])])]),v,b,g,e("blockquote",null,[e("p",null,[_,e("a",k,[f,n(t)])])]),y,e("nav",x,[e("ul",null,[e("li",null,[n(o,{to:"#helm\u4ECB\u7ECD"},{default:a(()=>[C]),_:1})]),e("li",null,[n(o,{to:"#v2-vs-v3"},{default:a(()=>[q]),_:1}),e("ul",null,[e("li",null,[n(o,{to:"#\u533A\u522B\u5BF9\u6BD4"},{default:a(()=>[H]),_:1})])])]),e("li",null,[n(o,{to:"#helm-controller"},{default:a(()=>[R]),_:1})]),e("li",null,[n(o,{to:"#helm\u5B89\u88C5"},{default:a(()=>[S]),_:1}),e("ul",null,[e("li",null,[n(o,{to:"#\u7528\u4E8C\u8FDB\u5236\u7248\u672C\u5B89\u88C5"},{default:a(()=>[D]),_:1})]),e("li",null,[n(o,{to:"#\u4F7F\u7528\u811A\u672C\u5B89\u88C5"},{default:a(()=>[E]),_:1})])])]),e("li",null,[n(o,{to:"#\u914D\u7F6Ehelm\u6E90"},{default:a(()=>[z]),_:1})]),e("li",null,[n(o,{to:"#\u5FEB\u901F\u4E0A\u624B"},{default:a(()=>[A]),_:1}),e("ul",null,[e("li",null,[n(o,{to:"#\u548Cdocker\u4E00\u6837-\u641C\u7D22\u53EF\u7528\u7684\u5305"},{default:a(()=>[L]),_:1})]),e("li",null,[n(o,{to:"#helm\u5305\u62C9\u53D6"},{default:a(()=>[w]),_:1})]),e("li",null,[n(o,{to:"#\u5B89\u88C5\u96C6\u7FA4\u955C\u50CF"},{default:a(()=>[V]),_:1})])])]),e("li",null,[n(o,{to:"#helm-\u914D\u7F6E\u5B89\u88C5\u96C6\u7FA4"},{default:a(()=>[M]),_:1})]),e("li",null,[n(o,{to:"#end-\u94FE\u63A5"},{default:a(()=>[T]),_:1})])])]),N,B,e("div",I,[K,e("ul",null,[e("li",null,[e("a",P,[G,n(t)])]),e("li",null,[e("a",J,[F,n(t)])])])]),Y,e("div",O,[$,e("ul",null,[e("li",null,[e("a",j,[Q,n(t)])])]),e("p",null,[U,e("a",W,[X,n(t)]),Z]),e("p",null,[ee,e("a",se,[ne,n(t)]),ae,e("a",te,[oe,n(t)]),le])]),de,e("p",null,[ie,e("a",re,[ce,n(t)]),pe]),e("ol",null,[e("li",null,[he,e("a",me,[ue,n(t)])]),ve,be]),e("p",null,[ge,e("a",_e,[ke,n(t)]),fe,ye,xe]),Ce,qe,e("p",null,[He,e("a",Re,[Se,n(t)]),De]),Ee,e("ul",null,[e("li",null,[e("p",null,[n(i,{to:"/"},{default:a(()=>[ze]),_:1})])]),e("li",null,[e("p",null,[e("a",Ae,[Le,n(t)]),we])]),e("li",null,[e("p",null,[Ve,e("a",Me,[Te,n(t)])])])])])}const Pe=r(h,[["render",Ne],["__file","15.html.vue"]]);export{Pe as default};
