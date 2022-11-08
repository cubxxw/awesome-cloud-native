import{_ as d,r as t,o as c,c as r,a as n,b as e,w as a,e as s,d as p}from"./app.c1668249.js";const u={},m={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},v=s("author"),b=n("h1",{id:"\u7B2C9\u8282-pod",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C9\u8282-pod","aria-hidden":"true"},"#"),s(" \u7B2C9\u8282 Pod")],-1),k=n("div",null,[n("a",{href:"8.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"10.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),g=n("br",null,null,-1),h=s("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),f={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},y=s("http://nsddd.top"),_=n("hr",null,null,-1),x={class:"table-of-contents"},S=s("\u7406\u89E3Pod"),P=s("\u5220\u9664pod"),C=s("\u914D\u7F6E\u6587\u4EF6\u521B\u5EFApod"),I=s("\u53EF\u89C6\u5316\u754C\u9762\u521B\u5EFApod"),E=s("pod\u65E5\u5FD7"),N=s("pod - IP"),T=s("\u8FDB\u5165pod\u5E76\u4FEE\u6539pod"),R=s("\u591A\u5BB9\u5668pod\u7EC6\u8282"),q=s("\u66F4\u591A\u547D\u4EE4"),w=s("END \u94FE\u63A5"),A=p(`<p>[TOC]</p><h2 id="\u7406\u89E3pod" tabindex="-1"><a class="header-anchor" href="#\u7406\u89E3pod" aria-hidden="true">#</a> \u7406\u89E3Pod</h2><blockquote><p>\u4EC0\u4E48\u662Fpod\uFF1F</p><p><img src="http://sm.nsddd.top/sm981878-20181221191353859-412884495.png" alt="img"></p></blockquote><p>pod\u662F<strong>\u8FD0\u884C\u4E2D\u7684\u4E00\u7EC4\u5BB9\u5668</strong>\uFF0Cpod\u662Fkubernetes\u4E2D\u5E94\u7528\u7684\u6700\u5C0F\u5355\u4F4D\u3002</p><blockquote><p>\u4EC0\u4E48\u662FCRI\uFF1F\uFF08container runtime interface\uFF09</p></blockquote><p>\u6216\u8BB8\u4F60\u53EF\u4EE5\u7406\u89E3\u662Fdocker\uFF0C<strong>CRI\u5C31\u662F\u5BB9\u5668\u8FD0\u884C\u65F6\u7684\u73AF\u5883</strong>\u3002\u6211\u4EEC\u5F00\u53D1\u7684\u5E94\u7528\u5C31\u80FD\u4EE5\u5BB9\u5668\u5316\u7684\u65B9\u5F0F\u8FD0\u884C~</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>\u{1F4A1} \u90A3\u4E48k8s\u4E3A\u4E86\u7BA1\u7406\u65B9\u4FBF\uFF0C\u53C8\u5C01\u88C5\u4E86pod\uFF0C\u6240\u4EE5\u8BF4pod\u662F\u5BB9\u5668\u8FD0\u884C\u7684\u6700\u5C0F\u5355\u4F4D~</p><ul><li>\u6BCF\u4E00\u4E2A\u5BB9\u5668\u5C01\u88C5\u6210\u4E00\u4E2Apod</li><li>\u6BCF\u4E2Apod\u53EF\u80FD\u6709\u4E00\u4E2A\u6216\u8005\u591A\u4E2A\u5BB9\u5668\uFF0C\u4F46\u662F\u4E5F\u79F0\u4E4B\u4E3A\u4E00\u7EC4\u5BB9\u5668</li></ul><blockquote><p>pod\u662F\u53EF\u4EE5\u6709\u591A\u4E2A\u5BB9\u5668\u7684\uFF0C\u800C\u4E14\u7EC4\u6210\u539F\u5B50\uFF0C\u8FD9\u4E2A\u662F\u548C\u5BB9\u5668\u7684\u533A\u522B~</p></blockquote></div><p>\u26A1 \u63CF\u8FF0\u67D0\u4E00\u4E2Apod\u662F\u5982\u4F55\u8FD0\u884C\u7684</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl describe pod my-nginx-7fb96c846b-m9rjp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="custom-container details"><summary>\u5C55\u5F00\u67E5\u770B\u8BE6\u60C5\u{1F4A1}</summary><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master03 ~<span class="token punctuation">]</span><span class="token comment"># kubectl get pod</span>
NAME                        READY   STATUS    RESTARTS      AGE
my-nginx-7fb96c846b-cnhbz   <span class="token number">1</span>/1     Running   <span class="token number">2</span> <span class="token punctuation">(</span>92m ago<span class="token punctuation">)</span>   38h
my-nginx-7fb96c846b-g55km   <span class="token number">1</span>/1     Running   <span class="token number">2</span> <span class="token punctuation">(</span>92m ago<span class="token punctuation">)</span>   38h
my-nginx-7fb96c846b-m9rjp   <span class="token number">1</span>/1     Running   <span class="token number">2</span> <span class="token punctuation">(</span>92m ago<span class="token punctuation">)</span>   38h
<span class="token punctuation">[</span>root@k8s-master03 ~<span class="token punctuation">]</span><span class="token comment"># kubectl describe pod my-nginx-7fb96c846b-m9rjp</span>
Name:             my-nginx-7fb96c846b-m9rjp
Namespace:        default
Priority:         <span class="token number">0</span>
Service Account:  default
Node:             k8s-master03/192.168.0.4
Start Time:       Thu, <span class="token number">20</span> Oct <span class="token number">2022</span> <span class="token number">22</span>:05:22 +0800
Labels:           <span class="token assign-left variable">app</span><span class="token operator">=</span>nginx
                  pod-template-hash<span class="token operator">=</span>7fb96c846b
Annotations:      cni.projectcalico.org/containerID: 66626e89ebcb580eeef3f2e75d7d860fe14ee213458642f7b25a860e164ea9a3
                  cni.projectcalico.org/podIP: <span class="token number">100.66</span>.195.18/32
                  cni.projectcalico.org/podIPs: <span class="token number">100.66</span>.195.18/32
Status:           Running
IP:               <span class="token number">100.66</span>.195.18
IPs:
  IP:           <span class="token number">100.66</span>.195.18
Controlled By:  ReplicaSet/my-nginx-7fb96c846b
Containers:
  nginx:
    Container ID:   containerd://85c401a1bca6531519ad09b539ee57bb2b508b370d71053926a1df0b5421597e
    Image:          nginx:1.14.2
    Image ID:       docker.io/library/nginx@sha256:f7988fb6c02e0ce69257d9bd9cf37ae20a60f1df7563c3a2a6abe24160306b8d
    Port:           <span class="token number">80</span>/TCP
    Host Port:      <span class="token number">0</span>/TCP
    State:          Running
      Started:      Sat, <span class="token number">22</span> Oct <span class="token number">2022</span> <span class="token number">11</span>:27:59 +0800
    Last State:     Terminated
      Reason:       Unknown
      Exit Code:    <span class="token number">255</span>
      Started:      Fri, <span class="token number">21</span> Oct <span class="token number">2022</span> <span class="token number">11</span>:10:13 +0800
      Finished:     Sat, <span class="token number">22</span> Oct <span class="token number">2022</span> <span class="token number">11</span>:27:01 +0800
    Ready:          True
    Restart Count:  <span class="token number">2</span>
    Environment:    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-x77br <span class="token punctuation">(</span>ro<span class="token punctuation">)</span>
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-x77br:
    Type:                    Projected <span class="token punctuation">(</span>a volume that contains injected data from multiple sources<span class="token punctuation">)</span>
    TokenExpirationSeconds:  <span class="token number">3607</span>
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <span class="token operator">&lt;</span>nil<span class="token operator">&gt;</span>
    DownwardAPI:             <span class="token boolean">true</span>
QoS Class:                   BestEffort
Node-Selectors:              <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute <span class="token assign-left variable">op</span><span class="token operator">=</span>Exists <span class="token keyword">for</span> 300s
                             node.kubernetes.io/unreachable:NoExecute <span class="token assign-left variable">op</span><span class="token operator">=</span>Exists <span class="token keyword">for</span> 300s
Events:                      <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p><strong>\u6211\u4EEC\u53EA\u8981\u770B<code>Events</code>\u5C31\u597D\u4E86~</strong></p><p>\u53EF\u4EE5\u67E5\u770B\u72B6\u6001\u548C\u539F\u56E0\uFF0C\u53EF\u4EE5\u53BB\u6392\u67E5\u4E8B\u6545\u539F\u56E0</p><h2 id="\u5220\u9664pod" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664pod" aria-hidden="true">#</a> \u5220\u9664pod</h2><div class="custom-container tip"><p class="custom-container-title">\u7531\u4E8Ek8s\u7684\u6982\u5FF5\u5F88\u591A\uFF0C\u5220\u9664\u9700\u8981\u6307\u5B9A\u6982\u5FF5</p><ul><li>\u6307\u5B9A\u547D\u540D\u7A7A\u95F4\uFF0C\u4E0D\u6307\u5B9A\u662F\u9ED8\u8BA4</li><li>\u6307\u5B9A\u5220\u9664<code>pod</code></li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl delete pod mypodName <span class="token parameter variable">-n</span> xxxNamespace
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><h2 id="\u914D\u7F6E\u6587\u4EF6\u521B\u5EFApod" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u6587\u4EF6\u521B\u5EFApod" aria-hidden="true">#</a> \u914D\u7F6E\u6587\u4EF6\u521B\u5EFApod</h2><p>\u6211\u4EEC\u6216\u8BB8\u53EF\u4EE5\u7528\u914D\u7F6E\u6587\u4EF6\u7684\u65B9\u5F0F\u53BB\u521B\u5EFA\u4E00\u4E2Apod~</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># vim pod.yaml </span>
<span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl apply -f pod.yaml </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">yaml\u521B\u5EFApod\u683C\u5F0F</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod  <span class="token comment">#\u8D44\u6E90\u7C7B\u578B</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>  
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">run</span><span class="token punctuation">:</span> myapp
  <span class="token key atrule">name</span><span class="token punctuation">:</span> myapp  <span class="token comment">#pod\u540D\u79F0</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span> <span class="token comment">#pod\u8BE6\u7EC6\u914D\u7F6E\u4FE1\u606F</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span> <span class="token comment">#\u542F\u52A8\u4E00\u4E2A\u5BB9\u5668</span>
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx <span class="token comment">#\u542F\u52A8nginx</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> mynginx
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> tomcat<span class="token punctuation">:</span>8.5.68
    <span class="token key atrule">name</span><span class="token punctuation">:</span> mytomcat
  <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">name</span><span class="token punctuation">:</span> myredis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022153945150.png" alt="image-20221022153945150"></p><blockquote><p>\u53EF\u80FD\u4F1A\u51FA\u73B0pod\u72B6\u6001\u5904\u4E8EContainerCreating\u7684\u60C5\u51B5\uFF0C\u5E38\u89C1\u7684\u539F\u56E0\u4E4B\u4E00\u662F\u955C\u50CF\u62C9\u53D6\u5931\u8D25\u3002</p></blockquote></div><p>\u{1F4A1}\u5BB9\u5668\u7684\u521B\u5EFA\u8BE6\u60C5\u67E5\u770B\u5982\u4E0B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl describe pod mynginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="custom-container details"><summary>\u26A1 \u5C55\u5F00\u67E5\u770B\u8BE6\u60C5</summary><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl describe pod mynginx</span>
Name:             mynginx
Namespace:        default
Priority:         <span class="token number">0</span>
Service Account:  default
Node:             k8s-master03/192.168.0.4
Start Time:       Sat, <span class="token number">22</span> Oct <span class="token number">2022</span> <span class="token number">13</span>:20:17 +0800
Labels:           <span class="token assign-left variable">run</span><span class="token operator">=</span>mynginx
Annotations:      cni.projectcalico.org/containerID: 9fc6db4dd24c4816b28be43c1f2907c89adea8fadb36fb49844fea42142671e7
                  cni.projectcalico.org/podIP: <span class="token number">100.66</span>.195.25/32
                  cni.projectcalico.org/podIPs: <span class="token number">100.66</span>.195.25/32
Status:           Running
IP:               <span class="token number">100.66</span>.195.25
IPs:
  IP:  <span class="token number">100.66</span>.195.25
Containers:
  mynginx:
    Container ID:   containerd://69b25d59d551f94e8f7cc659ef3b740765e23673b60f45de7353cfbc13d52420
    Image:          nginx
    Image ID:       docker.io/library/nginx@sha256:5ffb682b98b0362b66754387e86b0cd31a5cb7123e49e7f6f6617690900d20b2
    Port:           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Host Port:      <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    State:          Running
      Started:      Sat, <span class="token number">22</span> Oct <span class="token number">2022</span> <span class="token number">13</span>:21:13 +0800
    Ready:          True
    Restart Count:  <span class="token number">0</span>
    Environment:    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-m6rqn <span class="token punctuation">(</span>ro<span class="token punctuation">)</span>
  myredis:
    Container ID:   containerd://e72e35e2f7dda8d6108a89e98c41da32b4678eab31cf26c8406eeaee5e3ecc3c
    Image:          redis
    Image ID:       docker.io/library/redis@sha256:c95835a74c37b3a784fb55f7b2c211bd20c650d5e55dae422c3caa9c01eb39fa
    Port:           <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Host Port:      <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    State:          Running
      Started:      Sat, <span class="token number">22</span> Oct <span class="token number">2022</span> <span class="token number">13</span>:21:47 +0800
    Ready:          True
    Restart Count:  <span class="token number">0</span>
    Environment:    <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
    Mounts:
      /var/run/secrets/kubernetes.io/serviceaccount from kube-api-access-m6rqn <span class="token punctuation">(</span>ro<span class="token punctuation">)</span>
Conditions:
  Type              Status
  Initialized       True 
  Ready             True 
  ContainersReady   True 
  PodScheduled      True 
Volumes:
  kube-api-access-m6rqn:
    Type:                    Projected <span class="token punctuation">(</span>a volume that contains injected data from multiple sources<span class="token punctuation">)</span>
    TokenExpirationSeconds:  <span class="token number">3607</span>
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <span class="token operator">&lt;</span>nil<span class="token operator">&gt;</span>
    DownwardAPI:             <span class="token boolean">true</span>
QoS Class:                   BestEffort
Node-Selectors:              <span class="token operator">&lt;</span>none<span class="token operator">&gt;</span>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute <span class="token assign-left variable">op</span><span class="token operator">=</span>Exists <span class="token keyword">for</span> 300s
                             node.kubernetes.io/unreachable:NoExecute <span class="token assign-left variable">op</span><span class="token operator">=</span>Exists <span class="token keyword">for</span> 300s
Events:
  Type    Reason     Age   From               Message
  ----    ------     ----  ----               -------
  Normal  Scheduled  113s  default-scheduler  Successfully assigned default/mynginx to k8s-master03
  Normal  Pulling    112s  kubelet            Pulling image <span class="token string">&quot;nginx&quot;</span>
  Normal  Pulled     58s   kubelet            Successfully pulled image <span class="token string">&quot;nginx&quot;</span> <span class="token keyword">in</span> <span class="token number">54</span>.707721222s
  Normal  Created    57s   kubelet            Created container mynginx
  Normal  Started    57s   kubelet            Started container mynginx
  Normal  Pulling    57s   kubelet            Pulling image <span class="token string">&quot;redis&quot;</span>
  Normal  Pulled     23s   kubelet            Successfully pulled image <span class="token string">&quot;redis&quot;</span> <span class="token keyword">in</span> <span class="token number">33</span>.819467112s
  Normal  Created    23s   kubelet            Created container myredis
  Normal  Started    23s   kubelet            Started container myredis
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p><img src="http://sm.nsddd.top/smimage-20221022132504701.png" alt="image-20221022132504701"></p><h2 id="\u53EF\u89C6\u5316\u754C\u9762\u521B\u5EFApod" tabindex="-1"><a class="header-anchor" href="#\u53EF\u89C6\u5316\u754C\u9762\u521B\u5EFApod" aria-hidden="true">#</a> \u53EF\u89C6\u5316\u754C\u9762\u521B\u5EFApod</h2><div class="custom-container danger"><p class="custom-container-title">\u6CE8\u610F</p><p>\u8FD9\u4E2A\u677F\u5757\u5F85\u8865\u5145~ \u6B22\u8FCEpr</p></div><h2 id="pod\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#pod\u65E5\u5FD7" aria-hidden="true">#</a> pod\u65E5\u5FD7</h2><p>\u597D\u50CF\u53EA\u6709pod\u6709\u65E5\u5FD7\u628A\uFF1F</p><blockquote><p>\u548Cdocker\u7684\u65E5\u5FD7\u4E00\u6837\u7528\u6CD5</p></blockquote><p>\u6211\u4EEC\u67E5\u770Bpod\u65E5\u5FD7\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl logs mynginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022133031267.png" alt="image-20221022133031267"></p><p>\u26A1 \u53EF\u4EE5\u52A0\u4E0A <code>-f</code> \u8FFD\u8E2A\u5F0F\u65E5\u5FD7</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>kubectl logs -f  mynginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022133159587.png" alt="image-20221022133159587"></p><h2 id="pod-ip" tabindex="-1"><a class="header-anchor" href="#pod-ip" aria-hidden="true">#</a> pod - IP</h2><p>\u26A1 \u6BCF\u4E2Apod \u2013 k8s\u90FD\u4F1A\u5206\u914D\u4E00\u4E2Aip\uFF0C\u4F7F\u7528\u4E0B\u9762\u547D\u4EE4\u67E5\u770B\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-owide</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://sm.nsddd.top/smimage-20221022150442624.png" alt="image-20221022150442624"></p><h2 id="\u8FDB\u5165pod\u5E76\u4FEE\u6539pod" tabindex="-1"><a class="header-anchor" href="#\u8FDB\u5165pod\u5E76\u4FEE\u6539pod" aria-hidden="true">#</a> \u8FDB\u5165pod\u5E76\u4FEE\u6539pod</h2><p>\u{1F5D3}\uFE0F \u56DE\u5FC6\u6211\u4EECdocker\u4FEE\u6539\u5BB9\u5668\u5185\u90E8</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> idName <span class="token comment">#/bin/bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u4F7F\u7528K8s\u8FDB\u5165pod\u547D\u4EE4\uFF1A</strong></p><blockquote><p>\u548Cdocker\u547D\u4EE4\u5927\u81F4\u4E00\u6837\uFF0C\u6CE8\u610F\u540E\u9762\u6709 <code>\u2013</code></p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> mynginx -- /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022151001187.png" alt="image-20221022151001187"></p><div class="custom-container tip"><p class="custom-container-title">\u53EF\u89C6\u5316\u754C\u9762</p><p>\u53EF\u4EE5\u76F4\u63A5\u8FDB\u53BBk8s\u7684\u53EF\u89C6\u5316\u754C\u9762\u8FDB\u884C\u4FEE\u6539~</p></div><h2 id="\u591A\u5BB9\u5668pod\u7EC6\u8282" tabindex="-1"><a class="header-anchor" href="#\u591A\u5BB9\u5668pod\u7EC6\u8282" aria-hidden="true">#</a> \u591A\u5BB9\u5668pod\u7EC6\u8282</h2><div class="custom-container warning"><p class="custom-container-title">\u63D0\u9192\u26A0\uFE0F</p><p>\u5728<code>Kubernetes</code>\u4E2D\u90E8\u7F72\u5E94\u7528\u65F6\uFF0C\u90FD\u662F\u4EE5<code>pod</code>\u8FDB\u884C\u8C03\u5EA6\u7684\uFF0C\u5B83\u4EEC\u57FA\u672C\u4E0A\u662F\u5355\u4E2A\u5BB9\u5668\u7684\u5305\u88C5\u6216\u623F\u5B50\u3002\u4ECE\u67D0\u79CD\u610F\u4E49\u4E0A\u8BF4\uFF0C\u5BB9\u5668\u7684\u5BB9\u5668\u3002 <code>pod</code>\u662F\u4E00\u4E2A\u903B\u8F91\u5305\u88C5\u5B9E\u4F53\uFF0C\u7528\u4E8E\u5728<code>K8s</code>\u96C6\u7FA4\u4E0A\u6267\u884C\u5BB9\u5668\u3002\u53EF\u4EE5\u628A\u6BCF\u4E2A<code>pod</code>\u60F3\u8C61\u6210\u4E00\u4E2A\u900F\u660E\u7684\u5305\u88C5\uFF0C\u4E3A\u5BB9\u5668\u63D0\u4F9B\u4E00\u4E2A\u63D2\u69FD\u3002<code>pod</code>\u662F<code>Kubernetes</code>\u6700\u5C0F\u7684\u53EF\u90E8\u7F72\u5355\u4F4D\u3002<code>pod</code>\u662F\u4E00\u7EC4\u4E00\u4E2A\u6216\u591A\u4E2A\u5BB9\u5668\uFF0C\u5177\u6709\u5171\u4EAB\u7684\u5B58\u50A8/\u7F51\u7EDC\u8D44\u6E90\uFF0C\u4EE5\u53CA\u5982\u4F55\u8FD0\u884C\u5BB9\u5668\u7684\u89C4\u8303\u3002\u56E0\u6B64\uFF0C\u6700\u7B80\u5355\u5730\u8BF4\uFF0C<code>pod</code>\u662F\u4E00\u4E2A\u5BB9\u5668\u5982\u4F55\u5728<code>Kubernetes</code>\u4E2D\u201C\u7528\u8D77\u6765\u201D\u7684\u673A\u5236\u3002</p><ul><li><p>pod\u662Fk8s\u7684\u6700\u5C0F\u5355\u5143\uFF0C\u5BB9\u5668\u5305\u542B\u5728pod\u4E2D\uFF0C\u4E00\u4E2Apod\u4E2D\u6709\u4E00\u4E2Apause\u5BB9\u5668\u548C\u82E5\u5E72\u4E2A\u4E1A\u52A1\u5BB9\u5668\uFF0C\u800C\u5BB9\u5668\u662F\u5355\u72EC\u7684\u4E00\u4E2A\u5BB9\u5668\uFF0C\u7B80\u800C\u8A00\u4E4B\uFF0Cpod\u662F\u4E00\u7EC4\u5BB9\u5668\u7684\u96C6\u5408\u3002</p></li><li><p>pod\u76F8\u5F53\u4E8E\u903B\u8F91\u4E3B\u673A\uFF0C\u6BCF\u4E2Apod\u90FD\u6709\u81EA\u5DF1\u7684ip\u5730\u5740</p></li><li><p><strong>pod\u5185\u7684\u5BB9\u5668\u5171\u4EAB\u76F8\u540C\u7684ip\u548C\u7AEF\u53E3</strong></p></li><li><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\uFF0C\u6BCF\u4E2A\u5BB9\u5668\u7684\u6587\u4EF6\u7CFB\u7EDF\u4E0E\u5176\u4ED6\u5BB9\u5668\u5B8C\u5168\u9694\u79BB</p></li><li><p><strong>pod\u662F\u4E00\u7EC4\u5BB9\u5668\uFF0C\u4E00\u4E2Apod\u4E5F\u662F\u53EF\u4EE5\u90E8\u7F72\u4E24\u4E2A\u751A\u81F3\u662F\u591A\u4E2A\u5BB9\u5668</strong></p></li></ul></div><h2 id="\u66F4\u591A\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u66F4\u591A\u547D\u4EE4" aria-hidden="true">#</a> \u66F4\u591A\u547D\u4EE4</h2><p><strong>\u66F4\u591A\u547D\u4EE4\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># \u67E5\u770B\u5168\u90E8</span>
kubectl get all

<span class="token comment"># \u91CD\u65B0\u90E8\u7F72</span>
kubectl rollout restart deployment test-k8s

<span class="token comment"># \u547D\u4EE4\u4FEE\u6539\u955C\u50CF\uFF0C--record \u8868\u793A\u628A\u8FD9\u4E2A\u547D\u4EE4\u8BB0\u5F55\u5230\u64CD\u4F5C\u5386\u53F2\u4E2D</span>
kubectl <span class="token builtin class-name">set</span> image deployment test-k8s test-k8s<span class="token operator">=</span>ccr.ccs.tencentyun.com/k8s-tutorial/test-k8s:v2-with-error <span class="token parameter variable">--record</span>

<span class="token comment"># \u6682\u505C\u8FD0\u884C\uFF0C\u6682\u505C\u540E\uFF0C\u5BF9 deployment \u7684\u4FEE\u6539\u4E0D\u4F1A\u7ACB\u523B\u751F\u6548\uFF0C\u6062\u590D\u540E\u624D\u5E94\u7528\u8BBE\u7F6E</span>
kubectl rollout pause deployment test-k8s

<span class="token comment"># \u6062\u590D</span>
kubectl rollout resume deployment test-k8s

<span class="token comment"># \u8F93\u51FA\u5230\u6587\u4EF6</span>
kubectl get deployment test-k8s <span class="token parameter variable">-o</span> yaml <span class="token operator">&gt;&gt;</span> app2.yaml

<span class="token comment"># \u5220\u9664\u5168\u90E8\u8D44\u6E90</span>
kubectl delete all <span class="token parameter variable">--all</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>\u9057\u7559\u95EE\u9898\uFF1A</summary><ul><li>\u6BCF\u6B21\u53EA\u80FD\u8BBF\u95EE\u4E00\u4E2A pod\uFF0C\u6CA1\u6709\u8D1F\u8F7D\u5747\u8861\u81EA\u52A8\u8F6C\u53D1\u5230\u4E0D\u540C pod</li><li>\u8BBF\u95EE\u8FD8\u9700\u8981\u7AEF\u53E3\u8F6C\u53D1</li><li>Pod \u91CD\u521B\u540E IP \u53D8\u4E86\uFF0C\u540D\u5B57\u4E5F\u53D8\u4E86</li></ul></details><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="8.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="10.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,53),j=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),D={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},M=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),O=s(")"),B=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),L={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},V=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function K(z,F){const l=t("ExternalLinkIcon"),i=t("router-link"),o=t("RouterLink");return c(),r("div",null,[n("ul",null,[n("li",null,[n("a",m,[v,e(l)])])]),b,k,g,n("blockquote",null,[n("p",null,[h,n("a",f,[y,e(l)])])]),_,n("nav",x,[n("ul",null,[n("li",null,[e(i,{to:"#\u7406\u89E3pod"},{default:a(()=>[S]),_:1})]),n("li",null,[e(i,{to:"#\u5220\u9664pod"},{default:a(()=>[P]),_:1})]),n("li",null,[e(i,{to:"#\u914D\u7F6E\u6587\u4EF6\u521B\u5EFApod"},{default:a(()=>[C]),_:1})]),n("li",null,[e(i,{to:"#\u53EF\u89C6\u5316\u754C\u9762\u521B\u5EFApod"},{default:a(()=>[I]),_:1})]),n("li",null,[e(i,{to:"#pod\u65E5\u5FD7"},{default:a(()=>[E]),_:1})]),n("li",null,[e(i,{to:"#pod-ip"},{default:a(()=>[N]),_:1})]),n("li",null,[e(i,{to:"#\u8FDB\u5165pod\u5E76\u4FEE\u6539pod"},{default:a(()=>[T]),_:1})]),n("li",null,[e(i,{to:"#\u591A\u5BB9\u5668pod\u7EC6\u8282"},{default:a(()=>[R]),_:1})]),n("li",null,[e(i,{to:"#\u66F4\u591A\u547D\u4EE4"},{default:a(()=>[q]),_:1})]),n("li",null,[e(i,{to:"#end-\u94FE\u63A5"},{default:a(()=>[w]),_:1})])])]),A,n("ul",null,[n("li",null,[n("p",null,[e(o,{to:"/"},{default:a(()=>[j]),_:1})])]),n("li",null,[n("p",null,[n("a",D,[M,e(l)]),O])]),n("li",null,[n("p",null,[B,n("a",L,[V,e(l)])])])])])}const Q=d(u,[["render",K],["__file","9.html.vue"]]);export{Q as default};
