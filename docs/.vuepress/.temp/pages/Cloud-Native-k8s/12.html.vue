<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第12节-ingress" tabindex="-1"><a class="header-anchor" href="#第12节-ingress" aria-hidden="true">#</a> 第12节 Ingress</h1>
<div><a href = '11.md' style='float:left'>⬆️上一节🔗  </a><a href = '13.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#ingress">Ingress</router-link></li><li><router-link to="#统一网关">统一网关</router-link></li><li><router-link to="#yaml文件">yaml文件</router-link></li><li><router-link to="#安装nginx测试">安装nginx测试</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="ingress" tabindex="-1"><a class="header-anchor" href="#ingress" aria-hidden="true">#</a> Ingress</h2>
<p><strong>Ingress：service的统一网关入口（nginx实现）</strong></p>
<div class="custom-container tip"><p class="custom-container-title">解释</p>
<ul>
<li>Ingress 是对集群中服务的外部访问进行管理的 API 对象，典型的访问方式是 HTTP。</li>
<li>Ingress 可以提供负载均衡、SSL 终结和基于名称的虚拟托管。</li>
</ul>
<blockquote>
<p>K8s希望<code v-pre>Ingress</code>成为集群流量的唯一入口。</p>
</blockquote>
</div>
<div class="custom-container warning"><p class="custom-container-title">作用</p>
<ol>
<li>
<p>帮助位于集群中的<code v-pre>Service</code>能够有一个对外可达的<code v-pre>url</code>，即让集群外的客户端也可以访问到自己。(wxy：对于这一点，<code v-pre>NodePort</code>类型的<code v-pre>Service</code>也可以，后面会说到)</p>
</li>
<li>
<p>做专业的负载均衡，毕竟<code v-pre>Service</code>的负载均衡还是很初级的</p>
</li>
<li>
<p>终结<code v-pre>ssl/tls</code>。意思是说对于那些业务不提供<code v-pre>https</code>的，为了安全，可以有专门机构帮我们做安全方面的事，业务只需要专注业务就行了，所以可以说是&quot;过滤&quot;<code v-pre>ssl/tls</code></p>
</li>
<li>
<p>基于名称的虚拟<code v-pre>hosting</code>。这个我理解就是我们常说的Ingress是一个基于应用层提供服务的，因为<code v-pre>Ingress</code>不仅负责一个业务/Service, 而是可以根据名称区分不同的&quot;hosting&quot;....（wxy: 继续看看可能就理解了）</p>
</li>
</ol>
</div>
<div class="custom-container tip"><p class="custom-container-title">ingress解决了什么问题？</p>
<ol>
<li>
<p><strong>动态配置服务</strong></p>
<blockquote>
<p>如果按照传统方式, 当新增加一个服务时, 我们可能需要在流量入口加一个反向代理指向我们新的k8s服务. 而如果用了Ingress, 只需要配置好这个服务, 当服务启动时, 会自动注册到Ingress的中, 不需要而外的操作.</p>
</blockquote>
</li>
<li>
<p><strong>减少不必要的端口暴露</strong></p>
<blockquote>
<p>配置过k8s的都清楚, 第一步是要关闭防火墙的, 主要原因是k8s的很多服务会以NodePort方式映射出去, 这样就相当于给宿主机打了很多孔, 既不安全也不优雅. 而Ingress可以避免这个问题, 除了Ingress自身服务可能需要映射出去, 其他服务都不要用NodePort方式</p>
</blockquote>
</li>
</ol>
</div>
<h2 id="统一网关" tabindex="-1"><a class="header-anchor" href="#统一网关" aria-hidden="true">#</a> 统一网关</h2>
<p><code v-pre>Ingress</code>和<code v-pre>Pod</code>关系</p>
<ul>
<li><code v-pre>pod</code>和<code v-pre>Ingress</code>通过<code v-pre>service</code>关联，<code v-pre>Ingress</code>作为一个统一入口通过域名，由<code v-pre>service</code>关联一组<code v-pre>Pod</code></li>
</ul>
<p><code v-pre>Ingress</code> 公开从集群外部到集群内服务的 HTTP 和 HTTPS 路由。 流量路由由 <code v-pre>Ingress</code> 资源上定义的规则控制。</p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>我们可以看到<code v-pre>Ingress</code>是<code v-pre>Service</code>的上层，<code v-pre>Ingress</code>提供了更好的负载均衡体验~</p>
<p><img src="http://sm.nsddd.top/smimage-20221022201520335.png" alt="image-20221022201520335"></p>
<blockquote>
<p>Ingress是基于nginx的实现了方向代理。内网通过<code v-pre>Service</code>访问，<code v-pre>Service</code>实现了负载均衡。</p>
<p>Ingress其实也可以说<code v-pre>lngress controller</code> ，也就是<code v-pre>Ingress控制器</code>，包含了<code v-pre>nginx</code>，我们平常传统配置<code v-pre>nginx</code>，就是配置反向代理规则。</p>
</blockquote>
</div>
<h2 id="yaml文件" tabindex="-1"><a class="header-anchor" href="#yaml文件" aria-hidden="true">#</a> yaml文件</h2>
<p>一个最小的 Ingress 资源示例：</p>
<p><a href="https://raw.githubusercontent.com/kubernetes/website/main/content/zh-cn/examples/service/networking/minimal-ingress.yaml" target="_blank" rel="noopener noreferrer"><code v-pre>service/networking/minimal-ingress.yaml</code><ExternalLinkIcon/></a></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress  
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> minimal<span class="token punctuation">-</span>ingress
  <span class="token key atrule">annotations</span><span class="token punctuation">:</span>
    <span class="token key atrule">nginx.ingress.kubernetes.io/rewrite-target</span><span class="token punctuation">:</span> /
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">ingressClassName</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>example
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">path</span><span class="token punctuation">:</span> /testpath
        <span class="token key atrule">pathType</span><span class="token punctuation">:</span> Prefix
        <span class="token key atrule">backend</span><span class="token punctuation">:</span>  <span class="token comment"># 监听的后端名称是</span>
          <span class="token key atrule">service</span><span class="token punctuation">:</span>
            <span class="token key atrule">name</span><span class="token punctuation">:</span> test
            <span class="token key atrule">port</span><span class="token punctuation">:</span>
              <span class="token key atrule">number</span><span class="token punctuation">:</span> <span class="token number">80</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示：</p>
<p><code v-pre>lngress controller</code>会自动监听<code v-pre>yaml</code>文件，然后下发任务，配置，这样所有的流量就会打到<code v-pre>controller</code>，不需要直接配置<code v-pre>nginx</code>。</p>
<p>Ingress 需要指定 apiVersion、kind、 metadata和 spec 字段。 Ingress 对象的命名必须是合法的 DNS 子域名名称。 关于如何使用配置文件，请参见部署应用、 配置容器、 管理资源。 Ingress 经常使用注解（annotations）来配置一些选项，具体取决于 Ingress 控制器，例如重写目标注解。 不同的 Ingress 控制器支持不同的注解。 查看你所选的 Ingress 控制器的文档，以了解其支持哪些注解。</p>
</div>
<p><strong>编译文件</strong>：</p>
<p><img src="http://sm.nsddd.top/smimage-20221023202032124.png" alt="image-20221023202032124"></p>
<h2 id="安装nginx测试" tabindex="-1"><a class="header-anchor" href="#安装nginx测试" aria-hidden="true">#</a> 安装nginx测试</h2>
<details class="custom-container details"><summary>ingress 80端口实例</summary>
<p>创建应用pod、service</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code>kubectl create deplyment web01 --image=nginx:1.14
kubectl expose deployment web02  --port=80 --protocol=TCP
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>关联ingress 80端口：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> networking.k8s.io/v1beta1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Ingress
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> web01<span class="token punctuation">-</span>ingress
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">rules</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">host</span><span class="token punctuation">:</span> nginx.didi.cn			<span class="token comment"># 域名</span>
    <span class="token key atrule">http</span><span class="token punctuation">:</span>
      <span class="token key atrule">paths</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">backend</span><span class="token punctuation">:</span>
          <span class="token key atrule">serviceName</span><span class="token punctuation">:</span> web01			<span class="token comment"># 后端service名称</span>
          <span class="token key atrule">servicePort</span><span class="token punctuation">:</span> <span class="token number">80</span>					<span class="token comment"># 后端service端口</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl apply *.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<div class="custom-container danger"><p class="custom-container-title">注意svc</p>
<p>因为<code v-pre>ingress</code>需要接收所有的请求流量，所以<code v-pre>Ingress</code>就需要一个端口来接收所有的流量，这个端口还是以<code v-pre>NodePort</code>方式暴露出去的~</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl get svc -A
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '11.md' style='float:left'>⬆️上一节🔗  </a><a href = '13.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://nsddd.top/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


