import{_ as i,r as d,o as a,c as p,a as e,b as o,w as s,e as t,d as c}from"./app.38b2028b.js";const h={},_={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},u=t("author"),m=e("h1",{id:"\u7B2C15\u8282-helm",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7B2C15\u8282-helm","aria-hidden":"true"},"#"),t(" \u7B2C15\u8282 helm")],-1),g=e("div",null,[e("a",{href:"14.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),e("a",{href:"16.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),f=e("br",null,null,-1),b=t("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),v={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},k=t("http://nsddd.top"),C=e("hr",null,null,-1),H={class:"table-of-contents"},x=t("helm\u4ECB\u7ECD"),R=t("v2 vs v3"),S=t("\u533A\u522B\u5BF9\u6BD4"),D=t("Helm Controller"),y=t("helm\u5B89\u88C5"),E=t("\u7528\u4E8C\u8FDB\u5236\u7248\u672C\u5B89\u88C5"),A=t("\u4F7F\u7528\u811A\u672C\u5B89\u88C5"),w=t("END \u94FE\u63A5"),L=c('<p>[TOC]</p><h2 id="helm\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#helm\u4ECB\u7ECD" aria-hidden="true">#</a> helm\u4ECB\u7ECD</h2><details class="custom-container details"><summary>\u547D\u4EE4\u901F\u67E5</summary><p>helm\u5E38\u7528\u547D\u4EE4\uFF1A</p><p>1\u3001\u67E5\u770B\u670D\u52A1\u72B6\u6001</p><p><code>service httpd status</code></p><p>2\u3001\u542F\u52A8\u670D\u52A1</p><p><code>service httpd start</code></p><p>3\u3001\u505C\u6B62\u670D\u52A1</p><p><code>service httpd stop</code></p><p>4\u3001\u91CD\u542F\u670D\u52A1</p><p><code>service httpd restart</code></p><p>5\u3001\u91CD\u8F7D\u914D\u7F6E\u6587\u4EF6</p><p><code>service httpd reload</code></p><p>6\u3001\u67E5\u770B\u7AEF\u53E3\u5360\u7528\u60C5\u51B5</p><p><code>netstat -tunlp</code></p><p>7\u3001\u67E5\u770Bhttpd\u8FDB\u7A0B</p><p><code>ps -ef | grep httpd</code></p><p>8\u3001\u67E5\u770Bhttpd\u7248\u672C</p><p><code>httpd -v</code></p><p>9\u3001\u67E5\u770Bhttpd\u914D\u7F6E\u6587\u4EF6</p><p><code>httpd -V</code></p><p>10\u3001\u67E5\u770Bhttpd\u6A21\u5757</p><p><code>httpd -l</code></p><p>11\u3001\u67E5\u770Bhttpd\u6A21\u5757\u8BE6\u7EC6\u4FE1\u606F</p><p><code>httpd -M</code></p><p>12\u3001\u67E5\u770Bhttpd\u5B89\u88C5\u8DEF\u5F84</p><p><code>httpd -V | grep SERVER_CONFIG_FILE</code></p><p>13\u3001\u67E5\u770Bhttpd\u9519\u8BEF\u65E5\u5FD7</p><p><code>cat /var/log/httpd/error_log</code></p><p>14\u3001\u67E5\u770Bhttpd\u8BBF\u95EE\u65E5\u5FD7</p><p><code>cat /var/log/httpd/access_log</code></p><p>15\u3001\u67E5\u770Bhttpd\u914D\u7F6E\u6587\u4EF6</p><p><code>cat /etc/httpd/conf/httpd.conf</code></p><p>16\u3001\u67E5\u770Bhttpd\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684\u6A21\u5757</p><p><code>cat /etc/httpd/conf/httpd.conf | grep LoadModule</code></p><p>17\u3001\u67E5\u770Bhttpd\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684\u865A\u62DF\u4E3B\u673A</p><p><code>cat /etc/httpd/conf/httpd.conf | grep VirtualHost</code></p><p>18\u3001\u67E5\u770Bhttpd\u914D\u7F6E\u6587\u4EF6\u4E2D\u7684\u76D1\u542C\u7AEF\u53E3</p><p><code>cat /etc/httpd/conf/httpd.conf | grep Listen</code></p></details><div class="custom-container danger"><p class="custom-container-title">heml\u89E3\u51B3\u4E86\u4EC0\u4E48\u95EE\u9898\uFF1F</p><p>\u6211\u4EEC\u90E8\u7F72\u5E94\u7528\uFF1F</p><p><code>k8s</code> \u4E0A\u7684\u5E94\u7528\u5BF9\u8C61\uFF0C\u90FD\u662F\u7531\u7279\u5B9A\u7684\u8D44\u6E90\u63CF\u8FF0\u7EC4\u6210\uFF0C \u5305\u62EC <code>deployment</code>\u3001<code>service</code> \u7B49\uFF0C\u90FD\u4FDD\u5B58\u5728\u5404\u81EA\u6587\u4EF6\u4E2D\u6216\u8005\u96C6\u6210\u5230\u4E00\u4E2A\u914D\u7F6E\u6587\u4EF6\uFF0C\u7136\u540E\u901A\u8FC7 <code>kubectl apply -f</code> \u90E8\u7F72</p><blockquote><p><strong>\u6211\u4EEC\u90E8\u7F72\u5C0F\u7684\u5E94\u7528\u7A0B\u5E8F\u80AF\u5B9A\u662F\u6CA1\u6709\u95EE\u9898\u7684\uFF0C\u4F46\u662F\u90E8\u7F72\u4E00\u4E2A\u590D\u6742\u7684\u5E94\u7528\u7BA1\u7406 <code>yaml</code> \u6587\u4EF6\uFF0C\u53EF\u80FD\u5C31\u6709\u4E9B\u9EBB\u70E6\u3002</strong></p></blockquote><p><strong>\u6211\u4EEC\u9700\u8981\uFF1A</strong></p><ol><li>\u5982\u4F55\u5C06\u8FD9\u4E9B\u670D\u52A1\u4F5C\u4E3A\u4E00\u4E2A\u6574\u4F53\u7BA1\u7406</li><li>\u8FD9\u4E9B\u8D44\u6E90\u6587\u4EF6\u5982\u4F55\u9AD8\u6548\u590D\u7528</li><li>\u4E0D\u652F\u6301\u5E94\u7528\u7EA7\u522B\u7684\u7248\u672C\u7BA1\u7406</li></ol></div><p>helm\u5C31\u80FD\u89E3\u51B3\u8FD9\u4E9B\u95EE\u9898\uFF0C\u5B83\u5C31\u7C7B\u4F3C\u4E8ELinux\u4E2D\u7684<code>yum</code>\u5305\u6216\u8005<code>apt</code>\u5305\u3002</p>',5),T={class:"custom-container tip"},N=e("p",{class:"custom-container-title"},"\u63D0\u793A",-1),V={href:"https://github.com/helm/helm",target:"_blank",rel:"noopener noreferrer"},K=t("\u5F00\u6E90\u9879\u76EE\u5730\u5740"),P=t("Helm \u662F Kubernetes \u7684\u9996\u9009\u5305\u7BA1\u7406\u5DE5\u5177\u3002Helm Chart \u4E3A Kubernetes YAML \u6E05\u5355\u6587\u4EF6\u63D0\u4F9B\u4E86\u6A21\u677F\u5316\u8BED\u6CD5\u3002\u901A\u8FC7 Helm\uFF0C\u6211\u4EEC\u53EF\u4EE5\u521B\u5EFA\u53EF\u914D\u7F6E\u7684\u90E8\u7F72\uFF0C\u800C\u4E0D\u4EC5\u4EC5\u662F\u4F7F\u7528\u9759\u6001\u6587\u4EF6\u3002\u6709\u5173\u521B\u5EFA\u81EA\u5DF1\u7684\u90E8\u7F72\u76EE\u5F55\u7684\u66F4\u591A\u4FE1\u606F\uFF0C\u8BF7\u67E5\u770B"),B={href:"https://helm.sh/docs/intro/quickstart/",target:"_blank",rel:"noopener noreferrer"},I=t("Helm \u5FEB\u901F\u5165\u95E8"),M=t("\u3002"),q=t("K3s \u4E0D\u9700\u8981\u4EFB\u4F55\u7279\u6B8A\u7684\u914D\u7F6E\u5C31\u53EF\u4EE5\u4F7F\u7528 Helm \u547D\u4EE4\u884C\u5DE5\u5177\u3002\u53EA\u8981\u786E\u4FDD\u4F60\u5DF2\u7ECF\u6309\u7167"),z={href:"https://docs.rancher.cn/docs/k3s/cluster-access/_index",target:"_blank",rel:"noopener noreferrer"},J=t("\u96C6\u7FA4\u8BBF\u95EE"),F=t("\u4E00\u8282\u6B63\u786E\u8BBE\u7F6E\u4E86\u4F60\u7684 kubeconfig\u3002 K3s \u5305\u542B\u4E86\u4E00\u4E9B\u989D\u5916\u7684\u529F\u80FD\uFF0C\u901A\u8FC7"),$={href:"https://docs.rancher.cn/docs/k3s/helm/_index#%E4%BD%BF%E7%94%A8-helm-crd",target:"_blank",rel:"noopener noreferrer"},O=t("rancher/helm-release CRD"),Y=t("\uFF0C\u4F7F\u4F20\u7EDF\u7684 Kubernetes \u8D44\u6E90\u6E05\u5355\u548C Helm Charts \u90E8\u7F72\u66F4\u52A0\u5BB9\u6613\u3002"),G=c('<h2 id="v2-vs-v3" tabindex="-1"><a class="header-anchor" href="#v2-vs-v3" aria-hidden="true">#</a> v2 vs v3</h2><p><strong>\u7B80\u5355\u6765\u8BF4\uFF0CHelm\u5C31\u662F\u4E00\u4E2A\u7B2C\u4E09\u65B9\u90E8\u7F72k8s\u5E94\u7528\u7684\u5DE5\u5177</strong></p><div class="custom-container tip"><p class="custom-container-title">helm v3 vs v2\u7279\u6027</p><p>\u53E6\u5916\uFF0C\u5E38\u7528\u7684Helm\u7248\u672C\u6709v2\u8DDFv3\uFF0CHelm v3\u533A\u522B\u4E8Ev2\u4E3B\u8981\u6709\u4EE5\u4E0B\u7279\u6027\uFF1A</p><ul><li>\u79FB\u9664\u4E86Tiller(from SA to kubeconfig)</li><li>\u4E09\u65B9\u4F1A\u8C08 (Three-way Strategic merge patch)</li><li>\u4F7F\u7528Secret\u4F5C\u4E3A\u9ED8\u8BA4\u5B58\u50A8</li></ul></div><h3 id="\u533A\u522B\u5BF9\u6BD4" tabindex="-1"><a class="header-anchor" href="#\u533A\u522B\u5BF9\u6BD4" aria-hidden="true">#</a> \u533A\u522B\u5BF9\u6BD4</h3><p><strong>1\u3001\u79FB\u9664\u4E86Tiller(from SA to kubeconfig)</strong></p><p>\u539F\u6765Helm v2\u9700\u8981\u5728 Kubernetes \u96C6\u7FA4\u4E2D\u90E8\u7F72<code>Tiller</code>\uFF08<code>Tiller</code> \u7528\u4E8E\u63A5\u6536 Helm \u7684\u8BF7\u6C42\uFF0C\u5E76\u6839\u636E <code>Chart</code> \u751F\u6210 Kubernetes \u7684\u90E8\u7F72\u6587\u4EF6\uFF09\uFF0C<code>Tiller pod</code> \u6839\u636E\u81EA\u8EABSA\u6743\u9650\u90E8\u7F72\u5E94\u7528\u3002\u5E76\u4E14\u5728\u591A\u79DF\u6237\u73AF\u5883\u4E0B\uFF0C\u4E3A\u4E86\u8FDB\u884C\u6743\u9650\u7BA1\u7406\u9700\u8981\u90E8\u7F72\u591A\u4E2A<code>Tiller</code>\u3002</p><p><img src="http://sm.nsddd.top/smwebp" alt="img">\u5728 Helm v3 \u4E2D\uFF0CTiller \u88AB\u79FB\u9664\u4E86\u3002\u65B0\u7684 Helm \u5BA2\u6237\u7AEF\u4F1A\u50CF kubectl \u547D\u4EE4\u4E00\u6837\uFF0C\u8BFB\u53D6\u672C\u5730\u7684 kubeconfig \u6587\u4EF6\uFF0C\u4F7F\u7528\u6211\u4EEC\u5728 kubeconfig \u4E2D\u9884\u5148\u5B9A\u4E49\u597D\u7684SA\u6743\u9650\u6765\u8FDB\u884C\u4E00\u7CFB\u5217\u64CD\u4F5C\u3002\u8FD9\u6837\u505A\u6CD5\u5373\u7B80\u5355\uFF0C\u53C8\u5B89\u5168\u3002</p><p><strong>2\u3001\u4E09\u65B9\u4F1A\u8C08 (Three-way Strategic merge patch)</strong></p><p>\u4F1A\u517C\u5BB9\u901A\u8FC7\u7B2C\u4E09\u65B9\u4FEE\u6539\u7684\u5C5E\u6027\uFF08\u5982\u901A\u8FC7kubectl edit\u4FEE\u6539\u7684\u5C5E\u6027\uFF0C\u5728helm upgrade\u65F6\u4F1A\u8003\u8651\u8FDB\u53BB\uFF09</p><p><img src="http://sm.nsddd.top/smwebp2" alt="img"></p><p><strong>3\u3001\u4F7F\u7528Secret\u4F5C\u4E3A\u9ED8\u8BA4\u5B58\u50A8</strong></p><p><strong>4\u3001crd-install hook\u8FC1\u79FB\u5230\u4E86crds/\u8DEF\u5F84\u7B49</strong></p><details class="custom-container details"><summary>\u4EC0\u4E48\u662FCRD\uFF1F</summary><p>CRD(Custom Resource Define) \u81EA\u5B9A\u4E49\u8D44\u6E90\u5B9A\u4E49\uFF0C\u662F\u5728k8s\u9AD8\u7248\u672C\uFF08v1.7+\uFF09\u4E0A\u65B0\u589E\u52A0\u7684\u65B0\u7279\u6027\uFF0C\u4E3A\u4E86\u63D0\u9AD8\u62D3\u5C55\u6027\uFF0C\u8BA9\u5F00\u53D1\u8005\u53EF\u4EE5\u81EA\u5DF1\u53BB\u5B9A\u4E49k8s\u8D44\u6E90\u5BF9\u8C61\u3002</p><p>\u5B9E\u9645\u8FD0\u884C\u65F6\u662F\u4EE5CR\uFF08Custom Resourse\u81EA\u5B9A\u4E49\u8D44\u6E90\uFF09\u5177\u4F53\u5B9E\u4F8B\u8FDB\u884C\u5448\u73B0\u3002</p><p><strong>\u5F53\u524D\u5DF2\u7ECF\u5B58\u5728\u7684\u5B98\u65B9\u8D44\u6E90\uFF1A</strong></p><ul><li><code>Pod</code>\uFF1A\u662F\u4E00\u79CD\u96C6\u5408\u4E86\u591A\u4E2A\u5E94\u7528\u5BB9\u5668\u3001\u5B58\u50A8\u8D44\u6E90\u3001\u4E13\u7528IP\u53CA\u652F\u6491\u5BB9\u5668\u8FD0\u884C\u5176\u4ED6\u914D\u7F6E\u9009\u9879\u7684\u903B\u8F91\u7EC4\u4EF6\uFF0C\u662Fk8s\u90E8\u7F72\u5355\u5143\u548C\u539F\u5B50\u8FD0\u884C\u5355\u5143\uFF0C\u7B80\u5355\u6765\u8BF4\u5C31\u662F\u4E00\u4E2A\u8FD0\u884C\u591A\u4E2A\u5E94\u7528\u7A0B\u5E8F\u7684\u5355\u4E00\u8FD0\u884C\u5B9E\u4F8B\uFF0C\u901A\u8FC7\u5171\u4EAB\u8D44\u6E90\u76F8\u4E92\u8054\u7CFB\u7684\u5E94\u7528\u5BB9\u5668\u3002\u901A\u4FD7\u7684\u8BB2\uFF0Cpod\u662F\u4E00\u4E2A\u7269\u7406\u4E3B\u673A\u6216VM\u4E3B\u673A\uFF0Cpod\u4E2D\u7684\u5E94\u7528\u5BB9\u5668\u5C31\u662F\u4E3B\u673A\u4E0A\u7684\u8FDB\u7A0B\uFF0C\u5F7C\u6B64\u9694\u79BB\u3002</li><li><code>ReplicaSet</code>\uFF1A\u5B9A\u4E49\u4E00\u7EC4\u4EFB\u4F55\u65F6\u5019\u90FD\u5904\u4E8E\u8FD0\u884C\u72B6\u6001\u7684pod\u526F\u672C\u7684\u7A33\u5B9A\u96C6\u5408\u8D44\u6E90\uFF0C\u4FDD\u8BC1\u8FD0\u884C\u6307\u5B9A\u6570\u91CF\u7684\u3001\u5B8C\u5168\u76F8\u540C\u7684pod\u7684\u53EF\u7528\u6027\u3002</li><li><code>ReplicationController</code>\uFF1A\u8DDFReplicaSet\u662F\u4E00\u6837\u7684\uFF0C\u786E\u4FDD\u5728\u4EFB\u4F55\u65F6\u5019\u90FD\u6709\u7279\u5B9A\u6570\u91CF\u7684 Pod \u526F\u672C\u5904\u4E8E\u8FD0\u884C\u72B6\u6001\u3002 \u6362\u53E5\u8BDD\u8BF4\uFF0CReplicationController \u786E\u4FDD\u4E00\u4E2A Pod \u6216\u4E00\u7EC4\u540C\u7C7B\u7684 Pod \u603B\u662F\u53EF\u7528\u7684\u3002\u4F46\u662F\u66F4\u63A8\u8350\u4F7F\u7528ReplicaSet\u7684Deployment\u53BB\u5EFA\u7ACB\u526F\u672C\u3002</li><li><code>Deployment</code>\uFF1A\u8BE5\u5BF9\u8C61\u662F\u7528\u6765\u63CF\u8FF0pod\u548CReplicaSet\u526F\u672C\u7684\u76EE\u6807\u72B6\u6001\uFF0C\u5E76\u66F4\u65B0\u4ED6\u4EEC\u4E0D\u7B26\u5408\u671F\u671B\u65F6\u7684\u72B6\u6001\u3002</li><li><code>StatefulSet</code>\uFF1A\u8BE5\u8D44\u6E90\u5BF9\u8C61\u7528\u6765\u7BA1\u7406\u6709\u72B6\u6001\u5E94\u7528pod\u7684\u5DE5\u4F5C\u8D1F\u8F7D\uFF0C\u652F\u6301pod\u96C6\u5408\u7684\u90E8\u7F72\u548C\u6269\u5BB9\u3001\u7F29\u5BB9\u3002</li><li><code>DaemonSet</code>\uFF1A\u8BE5\u5BF9\u8C61\u7528\u6765\u786E\u4FDD\u5168\u90E8\u6216\u8005\u90E8\u5206\u8282\u70B9\u90FD\u8FD0\u884C\u4E00\u4E2Apod\u526F\u672C\uFF0C\u5C31\u662F\u6211\u4EEC\u6240\u8BF4\u7684\u5B88\u62A4\u8FDB\u7A0B\u3002</li><li><code>Job</code>\uFF1A\u8BE5\u5BF9\u8C61\u7528\u6765\u6267\u884C\u76EE\u6807\u72B6\u6001\u7684pod\u526F\u672C\u7684\u4E00\u4E2A\u4EFB\u52A1\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u76D1\u542C\u4EFB\u52A1\uFF0C\u5B9E\u65F6\u63A7\u5236pod\u526F\u672C\u8FBE\u5230\u671F\u671B\u72B6\u6001\u3002</li><li><code>CronJob</code>\uFF1A\u8FD9\u662F\u4E00\u4E2A\u6709\u65F6\u95F4\u5468\u671F\u7684Job\u3002</li><li><code>HorizontalPodAutoscaling</code>\uFF1A\u8BE5\u5BF9\u8C61\u4E3Apod\u6C34\u5E73\u81EA\u52A8\u6269\u7F29\uFF0C\u81EA\u52A8\u66F4\u65B0\u5DE5\u4F5C\u8D1F\u8F7D\u8D44\u6E90\uFF08Deployment\u548CStatefulSet\uFF09\uFF0C\u76EE\u7684\u662F\u81EA\u52A8\u6269\u7F29\u5DE5\u4F5C\u8D1F\u8F7D\u4EE5\u6EE1\u8DB3\u9700\u6C42\u3002</li><li><code>Node</code>\uFF1A\u8282\u70B9\u662F\u4E00\u4E2A\u865A\u62DF\u673A\u6216\u8005\u7269\u7406\u673A\uFF0C\u8282\u70B9\u4E0A\u8FD0\u884Cpod\u6240\u9700\u7684\u5BB9\u5668\u3002</li><li><code>Namespace</code>\uFF1A\u547D\u540D\u7A7A\u95F4\uFF0C\u662F\u4E00\u79CD\u673A\u5236\uFF0C\u5C06\u540C\u4E00\u96C6\u7FA4\u7684\u8D44\u6E90\u5212\u5206\u4E00\u4E2A\u76F8\u4E92\u9694\u79BB\u7684\u7EC4\u3002</li><li><code>Service</code>\uFF1A\u5C31\u662F\u8FD0\u884C\u5728pod\u4E0A\u7684\u63D0\u4F9B\u670D\u52A1\u7684\u7EC4\u4EF6\uFF0C\u5982\u5FAE\u670D\u52A1\u7EC4\u4EF6\u3002</li><li><code>Ingress</code>\uFF1A\u662F\u5404\u4E2A\u670D\u52A1service\u76F8\u4E92\u8BBF\u95EE\u7684\u4E00\u4E2A\u4E2D\u95F4\u8DEF\u7531\u7BA1\u7406\u5668\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u6D41\u91CF\u63A7\u5236\u7B49\u3002</li><li><code>Label</code>\uFF1A\u4E3A\u6BCF\u4E2A\u5BF9\u8C61\u5B9A\u4E49\u6807\u7B7E\uFF0C\u7528\u4E8E\u6807\u7B7E\u9009\u62E9\u5668\u53EF\u4EE5\u9AD8\u6548\u5730\u67E5\u8BE2\u548C\u76D1\u542Ck8s\u5BF9\u8C61\u3002</li><li><code>CustomResourceDefinition</code>\uFF1A\u7528\u4E8E\u5F00\u53D1\u8005\u81EA\u5B9A\u4E49\u7684\u8D44\u6E90\u5BF9\u8C61\u3002</li></ul></details><p><strong>\u5982\u4F55\u4F7F\u7528CRD\uFF1A</strong></p><p>CRD \u8D44\u6E90\u53EF\u4EE5\u52A8\u6001\u6CE8\u518C\u5230\u96C6\u7FA4\u4E2D\uFF0C\u6CE8\u518C\u5B8C\u6BD5\u540E\uFF0C\u7528\u6237\u53EF\u4EE5\u901A\u8FC7 kubectl \u6765\u521B\u5EFA\u8BBF\u95EE\u8FD9\u4E2A\u81EA\u5B9A\u4E49\u7684\u8D44\u6E90\u5BF9\u8C61\uFF0C\u7C7B\u4F3C\u4E8E\u64CD\u4F5C Pod \u4E00\u6837\u3002</p><h2 id="helm-controller" tabindex="-1"><a class="header-anchor" href="#helm-controller" aria-hidden="true">#</a> Helm Controller</h2><p>Helm Controller\u5B9E\u9645\u4E0A\u5C31\u662F\u4E00\u4E2ACRD Controller\uFF0C\u7BA1\u7406\u7684\u662FHelmChart\u7C7B\u578B\u7684CRD API</p><p><img src="http://sm.nsddd.top/sm23094781.png" alt="img"></p><p><strong>\u8BBE\u8BA1\u539F\u7406\uFF1A</strong></p><p>1\u3001<code>Helm-controller</code> \u8FD0\u884C\u5728<code>master</code>\u8282\u70B9\u5E76<code>list/watch HelmChart CRD</code>\u5BF9\u8C61</p><p>2\u3001<code>CRD onChange</code>\u65F6\u6267\u884C<code>Job</code>\u66F4\u65B0</p><p>3\u3001<code>Job Container</code>\u4F7F\u7528<code>rancher/kilipper-helm</code>\u4E3A<code>entrypoint</code></p><p>4\u3001<code>Killper-helm</code>\u5185\u7F6E<code>helm cli</code>\uFF0C\u53EF\u4EE5\u5B89\u88C5/\u5347\u7EA7/\u5220\u9664\u5BF9\u5E94\u7684<code>chart</code></p><h2 id="helm\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#helm\u5B89\u88C5" aria-hidden="true">#</a> helm\u5B89\u88C5</h2><h3 id="\u7528\u4E8C\u8FDB\u5236\u7248\u672C\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u7528\u4E8C\u8FDB\u5236\u7248\u672C\u5B89\u88C5" aria-hidden="true">#</a> \u7528\u4E8C\u8FDB\u5236\u7248\u672C\u5B89\u88C5</h3>',25),W=t("\u6BCF\u4E2AHelm "),j={href:"https://github.com/helm/helm/releases",target:"_blank",rel:"noopener noreferrer"},Q=t("\u7248\u672C"),U=t("\u90FD\u63D0\u4F9B\u4E86\u5404\u79CD\u64CD\u4F5C\u7CFB\u7EDF\u7684\u4E8C\u8FDB\u5236\u7248\u672C\uFF0C\u8FD9\u4E9B\u7248\u672C\u53EF\u4EE5\u624B\u52A8\u4E0B\u8F7D\u548C\u5B89\u88C5\u3002"),X=t("\u4E0B\u8F7D "),Z={href:"https://github.com/helm/helm/releases",target:"_blank",rel:"noopener noreferrer"},ee=t("\u9700\u8981\u7684\u7248\u672C"),te=e("li",null,[t("\u89E3\u538B("),e("code",null,"tar -zxvf helm-v3.0.0-linux-amd64.tar.gz"),t(")")],-1),oe=e("li",null,[t("\u5728\u89E3\u538B\u76EE\u4E2D\u627E\u5230"),e("code",null,"helm"),t("\u7A0B\u5E8F\uFF0C\u79FB\u52A8\u5230\u9700\u8981\u7684\u76EE\u5F55\u4E2D("),e("code",null,"mv linux-amd64/helm /usr/local/bin/helm"),t(")")],-1),le=t("\u7136\u540E\u5C31\u53EF\u4EE5\u6267\u884C\u5BA2\u6237\u7AEF\u7A0B\u5E8F\u5E76 "),se={href:"https://helm.sh/zh/docs/intro/quickstart/#%E5%88%9D%E5%A7%8B%E5%8C%96",target:"_blank",rel:"noopener noreferrer"},ne=t("\u6DFB\u52A0\u7A33\u5B9A\u4ED3\u5E93"),de=t(": "),ce=e("code",null,"helm help",-1),re=t("."),ie=e("p",null,[e("strong",null,"\u6CE8\u610F"),t(" \u9488\u5BF9Linux AMD64\uFF0CHelm\u7684\u81EA\u52A8\u6D4B\u8BD5\u53EA\u6709\u5728CircleCi\u6784\u5EFA\u548C\u53D1\u5E03\u65F6\u624D\u4F1A\u6267\u884C\u3002\u6D4B\u8BD5\u5176\u4ED6\u64CD\u4F5C\u7CFB\u7EDF\u662F\u793E\u533A\u9488\u5BF9\u7CFB\u7EDF\u95EE\u9898\u8BF7\u6C42Helm\u7684\u8D23\u4EFB\u3002")],-1),ae=e("h3",{id:"\u4F7F\u7528\u811A\u672C\u5B89\u88C5",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u4F7F\u7528\u811A\u672C\u5B89\u88C5","aria-hidden":"true"},"#"),t(" \u4F7F\u7528\u811A\u672C\u5B89\u88C5")],-1),pe=t("Helm\u73B0\u5728\u6709\u4E2A\u5B89\u88C5\u811A\u672C\u53EF\u4EE5\u81EA\u52A8\u62C9\u53D6\u6700\u65B0\u7684Helm\u7248\u672C\u5E76\u5728 "),he={href:"https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3",target:"_blank",rel:"noopener noreferrer"},_e=t("\u672C\u5730\u5B89\u88C5"),ue=t("\u3002"),me=c(`<p>\u60A8\u53EF\u4EE5\u83B7\u53D6\u8FD9\u4E2A\u811A\u672C\u5E76\u5728\u672C\u5730\u6267\u884C\u3002\u5B83\u826F\u597D\u7684\u6587\u6863\u4F1A\u8BA9\u60A8\u5728\u6267\u884C\u4E4B\u524D\u77E5\u9053\u811A\u672C\u90FD\u505A\u4E86\u4EC0\u4E48\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> <span class="token parameter variable">-o</span> get_helm.sh https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3
$ <span class="token function">chmod</span> <span class="token number">700</span> get_helm.sh
$ ./get_helm.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u60F3\u76F4\u63A5\u6267\u884C\u5B89\u88C5\uFF0C\u8FD0\u884C</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">curl</span> https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 <span class="token operator">|</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="14.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="16.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,6),ge=t("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),fe={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},be=e("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),ve=t(")"),ke=t("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),Ce={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},He=t("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function xe(Re,Se){const l=d("ExternalLinkIcon"),n=d("router-link"),r=d("RouterLink");return a(),p("div",null,[e("ul",null,[e("li",null,[e("a",_,[u,o(l)])])]),m,g,f,e("blockquote",null,[e("p",null,[b,e("a",v,[k,o(l)])])]),C,e("nav",H,[e("ul",null,[e("li",null,[o(n,{to:"#helm\u4ECB\u7ECD"},{default:s(()=>[x]),_:1})]),e("li",null,[o(n,{to:"#v2-vs-v3"},{default:s(()=>[R]),_:1}),e("ul",null,[e("li",null,[o(n,{to:"#\u533A\u522B\u5BF9\u6BD4"},{default:s(()=>[S]),_:1})])])]),e("li",null,[o(n,{to:"#helm-controller"},{default:s(()=>[D]),_:1})]),e("li",null,[o(n,{to:"#helm\u5B89\u88C5"},{default:s(()=>[y]),_:1}),e("ul",null,[e("li",null,[o(n,{to:"#\u7528\u4E8C\u8FDB\u5236\u7248\u672C\u5B89\u88C5"},{default:s(()=>[E]),_:1})]),e("li",null,[o(n,{to:"#\u4F7F\u7528\u811A\u672C\u5B89\u88C5"},{default:s(()=>[A]),_:1})])])]),e("li",null,[o(n,{to:"#end-\u94FE\u63A5"},{default:s(()=>[w]),_:1})])])]),L,e("div",T,[N,e("ul",null,[e("li",null,[e("a",V,[K,o(l)])])]),e("p",null,[P,e("a",B,[I,o(l)]),M]),e("p",null,[q,e("a",z,[J,o(l)]),F,e("a",$,[O,o(l)]),Y])]),G,e("p",null,[W,e("a",j,[Q,o(l)]),U]),e("ol",null,[e("li",null,[X,e("a",Z,[ee,o(l)])]),te,oe]),e("p",null,[le,e("a",se,[ne,o(l)]),de,ce,re]),ie,ae,e("p",null,[pe,e("a",he,[_e,o(l)]),ue]),me,e("ul",null,[e("li",null,[e("p",null,[o(r,{to:"/"},{default:s(()=>[ge]),_:1})])]),e("li",null,[e("p",null,[e("a",fe,[be,o(l)]),ve])]),e("li",null,[e("p",null,[ke,e("a",Ce,[He,o(l)])])])])])}const ye=i(h,[["render",xe],["__file","15.html.vue"]]);export{ye as default};
