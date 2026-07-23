<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第11节-service" tabindex="-1"><a class="header-anchor" href="#第11节-service" aria-hidden="true">#</a> 第11节 service</h1>
<div><a href = '10.md' style='float:left'>⬆️上一节🔗  </a><a href = '12.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#service">service</router-link></li><li><router-link to="#将pod统一暴露成一组服务">将pod统一暴露成一组服务</router-link><ul><li><router-link to="#修改nginx配置文件">修改nginx配置文件</router-link></li><li><router-link to="#使用service配置公共地址">使用service配置公共地址</router-link></li></ul></li><li><router-link to="#yaml配置文件实现service">yaml配置文件实现service</router-link></li><li><router-link to="#测试service的服务发现">测试service的服务发现</router-link></li><li><router-link to="#service服务暴露公网nodeport">service服务暴露公网nodeport</router-link></li><li><router-link to="#多端口">多端口</router-link></li><li><router-link to="#删除service">删除service</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> service</h2>
<blockquote>
<p>我们发现一个问题，就是使用<code v-pre>pod -owide</code>查看的<code v-pre>ip</code>是每一个<code v-pre>pod</code>结点都不一样的，那么是不是会出现一个问题：就是当我们有一个<code v-pre>pod</code>结点宕机了，这个岂不是凉凉了（还需要修改前端的地址嘛？）太麻烦了，我们可以直接使用<code v-pre>service</code>对外暴露一个公开为网络服务的抽象方法。</p>
</blockquote>
<p>🔥Service：Pod的服务发现和负载均衡</p>
<ul>
<li>Service 通过 label 关联对应的 Pod</li>
<li>Servcie 生命周期不跟 Pod 绑定，不会因为 Pod 重创改变 IP</li>
<li>提供了负载均衡功能，自动转发流量到不同 Pod</li>
<li>可对集群外部提供访问端口</li>
<li>集群内部可通过服务名字访问</li>
</ul>
<p><img src="http://sm.cubxxw.com/smkwpuoh0h.png" alt="img"></p>
<h2 id="将pod统一暴露成一组服务" tabindex="-1"><a class="header-anchor" href="#将pod统一暴露成一组服务" aria-hidden="true">#</a> 将pod统一暴露成一组服务</h2>
<h3 id="修改nginx配置文件" tabindex="-1"><a class="header-anchor" href="#修改nginx配置文件" aria-hidden="true">#</a> 修改nginx配置文件</h3>
<div class="custom-container tip"><p class="custom-container-title">进入nginx并且修改配置文件访问</p>
<p>查看当前pod详细信息：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl get pod -owide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221022175600469.png" alt="image-20221022175600469"></p>
<p>进入容器内部命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> my-dep-6d4ddbf4f7-bllhd -- /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>修改配置文件（index.html）：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl exec -it my-dep-6d4ddbf4f7-bllhd -- /bin/bash</span>
root@my-dep-6d4ddbf4f7-bllhd:/<span class="token comment"># cd /usr/share/nginx/html/</span>
root@my-dep-6d4ddbf4f7-bllhd:/usr/share/nginx/html<span class="token comment"># echo "my name is xiongxinwei email:xxw@cubxxw.com" > index.html </span>
root@my-dep-6d4ddbf4f7-bllhd:/usr/share/nginx/html<span class="token comment"># exit </span>
<span class="token builtin class-name">exit</span>
<span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># curl 100.66.195.43</span>
my name is xiongxinwei email:xxw@cubxxw.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>此时已经修改成功~</p>
</blockquote>
<p>同样的方式修改：</p>
<ul>
<li>my-dep-6d4ddbf4f7-dckmw</li>
<li>my-dep-6d4ddbf4f7-vvxt8</li>
</ul>
</div>
<h3 id="使用service配置公共地址" tabindex="-1"><a class="header-anchor" href="#使用service配置公共地址" aria-hidden="true">#</a> 使用service配置公共地址</h3>
<p><strong>查看信息：</strong></p>
<p><img src="http://sm.cubxxw.com/smimage-20221022180728395.png" alt="image-20221022180728395"></p>
<p><strong>暴露成为一个固定的ip：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl expose deploy my-dep --port=8000 --target-port=80</span>
service/my-dep exposed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看service的IP：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl get service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221022181104154.png" alt="image-20221022181104154"></p>
<div class="custom-container tip"><p class="custom-container-title">我们访问 `10.96.2.163:8000`</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token number">10.96</span>.2.163:8000
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>效果：</strong></p>
<p><img src="http://sm.cubxxw.com/smimage-20221022181355962.png" alt="image-20221022181355962"></p>
<p><strong>这样就实现了负载均衡了~</strong></p>
</div>
<h2 id="yaml配置文件实现service" tabindex="-1"><a class="header-anchor" href="#yaml配置文件实现service" aria-hidden="true">#</a> yaml配置文件实现service</h2>
<p><strong>编写yaml文件：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
  	<span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
  <span class="token key atrule">name</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span> 
  	<span class="token key atrule">app</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>dep
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8000</span>
  	<span class="token key atrule">protocol</span><span class="token punctuation">:</span> TCP
  	<span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">特别注意的参数</p>
</div>
<p><strong>⚠️ 在容器内部也可使用域名访问：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl exec -it  my-dep-6d4ddbf4f7-dckmw  -- bin/bash</span>
root@my-dep-6d4ddbf4f7-dckmw:/<span class="token comment"># curl 100.66.195.42  # ip方式访问</span>
my name is xiongxinwei email:3293172751@qq.com
root@my-dep-6d4ddbf4f7-dckmw:/<span class="token comment"># curl my-dep.default.svc:8000  # 域名方式访问</span>
my name is xiongxinwei email:xiongxinwei@mail.com
root@my-dep-6d4ddbf4f7-dckmw:/<span class="token comment"># curl my-dep.default.svc:8000 #也能实现负载均衡</span>
my name is xiongxinwei email:xxw@cubxxw.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">注意</p>
<p>在机器上是没办法这样访问的</p>
<p><img src="http://sm.cubxxw.com/smimage-20221022192356049.png" alt="image-20221022192356049"></p>
</div>
<h2 id="测试service的服务发现" tabindex="-1"><a class="header-anchor" href="#测试service的服务发现" aria-hidden="true">#</a> 测试service的服务发现</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>我们测试一下其中一台主机下线，service继续实现负载均衡</p>
<p>再开启也是恢复到了默认页面，新开启的nginx而不是以前的~</p>
</div>
<h2 id="service服务暴露公网nodeport" tabindex="-1"><a class="header-anchor" href="#service服务暴露公网nodeport" aria-hidden="true">#</a> service服务暴露公网nodeport</h2>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>我们之前的还是只能在服务器内部访问，要想实现在公网访问，我们还可以用另外一种方式</p>
</div>
<p><strong>删除之前的<code v-pre>my-dep</code>service</strong></p>
<p><img src="http://sm.cubxxw.com/smimage-20221022193330095.png" alt="image-20221022193330095"></p>
<p><strong>重新暴露：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl expose deploy my-dep <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8000</span> --target-port<span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--type</span><span class="token operator">=</span>NodePort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">警告service默认模式</p>
<ul>
<li><code v-pre>--type=NodePort</code>：默认情况，集群内部的访问</li>
<li><code v-pre>--type=ClusterIP</code>：设置为集群外部可以访问</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl expose deploy my-dep <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8000</span> --target-port<span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--type</span><span class="token operator">=</span>NodePort
kubectl expose deploy my-dep <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8000</span> --target-port<span class="token operator">=</span><span class="token number">80</span> <span class="token parameter variable">--type</span><span class="token operator">=</span>ClusterIP
kubectl expose deploy my-dep <span class="token parameter variable">--port</span><span class="token operator">=</span><span class="token number">8000</span> --target-port<span class="token operator">=</span><span class="token number">80</span> <span class="token comment">#默认情况，集群内部的访问</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221022193953537.png" alt="image-20221022193953537"></p>
</div>
<p>我们还可以看到暴露的多了一个端口<code v-pre>80:31729/TCP  </code>，这个是随机开放的端口。这样的话，我们访问任何一台机器的<code v-pre>30948</code>端口都可以访问~</p>
<blockquote>
<p>这个端口是随机暴露的， 但是也是有范围，就是<code v-pre>30000 - 32767</code>之间，我们可以开启防火墙和vpc的端口转化。</p>
</blockquote>
<p>🔥我们可以直接在浏览器上面访问这个页面了~</p>
<img src="http://sm.cubxxw.com/smimage-20221022194722363.png" alt="image-20221022194722363" style="zoom:80%;" />
<h2 id="多端口" tabindex="-1"><a class="header-anchor" href="#多端口" aria-hidden="true">#</a> 多端口</h2>
<p>多端口时必须配置 name， <a href="https://kubernetes.io/zh/docs/concepts/services-networking/service/#multi-port-services" target="_blank" rel="noopener noreferrer">文档<ExternalLinkIcon/></a></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Service
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>k8s
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>k8s
  <span class="token key atrule">type</span><span class="token punctuation">:</span> NodePort
  <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>        <span class="token comment"># 本 Service 的端口</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>k8s    <span class="token comment"># 必须配置</span>
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8080</span>  <span class="token comment"># 容器端口</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">31000</span>   <span class="token comment"># 节点端口，范围固定 30000 ~ 32767</span>
    <span class="token punctuation">-</span> <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8090</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>other
      <span class="token key atrule">targetPort</span><span class="token punctuation">:</span> <span class="token number">8090</span>
      <span class="token key atrule">nodePort</span><span class="token punctuation">:</span> <span class="token number">32000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221103212958297.png" alt="image-20221103212958297"></p>
<div class="custom-container tip"><p class="custom-container-title">说明</p>
<p>与一般的Kubernetes名称一样，端口名称只能包含小写字母数字字符 和 <code v-pre>-</code>。 端口名称还必须以字母数字字符开头和结尾。</p>
<p>例如，名称 <code v-pre>123-abc</code> 和 <code v-pre>web</code> 有效，但是 <code v-pre>123_abc</code> 和 <code v-pre>-web</code> 无效。</p>
</div>
<h2 id="删除service" tabindex="-1"><a class="header-anchor" href="#删除service" aria-hidden="true">#</a> 删除service</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl delete svc/kubernetes-bootcamp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221103213132408.png" alt="image-20221103213132408"></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '10.md' style='float:left'>⬆️上一节🔗  </a><a href = '12.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://cubxxw.com/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


