<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第10节-deployment" tabindex="-1"><a class="header-anchor" href="#第10节-deployment" aria-hidden="true">#</a> 第10节 Deployment</h1>
<div><a href = '9.md' style='float:left'>⬆️上一节🔗  </a><a href = '11.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br><br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#deployment">Deployment</router-link></li><li><router-link to="#用deployment创建有何不同">用deployment创建有何不同</router-link><ul><li><router-link to="#如果想要真正的删除怎么办">如果想要真正的删除怎么办？</router-link></li></ul></li><li><router-link to="#多副本">多副本</router-link></li><li><router-link to="#工作负载-deployment扩容缩容能力">工作负载-deployment扩容缩容能力</router-link><ul><li><router-link to="#扩缩容">扩缩容</router-link></li><li><router-link to="#你可以直接修改deplot配置文件达到扩缩容">你可以直接修改deplot配置文件达到扩缩容</router-link></li></ul></li><li><router-link to="#yaml-声明式创建">yaml 声明式创建</router-link></li><li><router-link to="#自愈和故障转移">自愈和故障转移</router-link></li><li><router-link to="#depoyment滚动和更新能力">depoyment滚动和更新能力</router-link><ul><li><router-link to="#滚动更新">滚动更新</router-link></li></ul></li><li><router-link to="#版本回退">版本回退</router-link></li><li><router-link to="#其他工作负载">其他工作负载</router-link></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="deployment" tabindex="-1"><a class="header-anchor" href="#deployment" aria-hidden="true">#</a> Deployment</h2>
<p><strong>⚠️ Deployment：控制pod，使pod具有多个副本，自愈，扩缩容等能力~</strong></p>
<div class="custom-container tip"><p class="custom-container-title">deployment and pod?</p>
<p>Pod是单一亦或一组容器的合集</p>
<p>Pod是k8s的最小调度单位，一个Pod中可以有多个containers，彼此共享网络等，这是k8s的核心概念。</p>
<p><strong>deployment是pod版本管理的工具 用来区分不同版本的pod</strong></p>
<p>从开发者角度看，deployment顾明思意，既部署，对于完整的应用部署流程，除了运行代码(既pod)之外，需要考虑更新策略，副本数量，回滚，重启等步骤，</p>
<p>deployment，StatefulSet是Controller，保证Pod一直运行在你需要的状态。</p>
<p>有一次性的也就是job，有定时执行的也就是crontabjob，有排号的也就是sts</p>
</div>
<h2 id="用deployment创建有何不同" tabindex="-1"><a class="header-anchor" href="#用deployment创建有何不同" aria-hidden="true">#</a> 用deployment创建有何不同</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 清除所有pod，比较下面两条命令有啥不同</span>
kubectl delete pod my-nginx-7fb96c846b-cnhbz my-nginx-7fb96c846b-g55km my-nginx-7fb96c846b-m9rjp myapp  mynginx  <span class="token parameter variable">-n</span> default

kubectl  run mynginx <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx <span class="token comment">#第一条</span>

kubectl create deployment mytomcat <span class="token parameter variable">--image</span><span class="token operator">=</span>tomcat:8.5.68  <span class="token comment">#第二条</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>🚀 结果如下：</p>
<p><img src="http://sm.cubxxw.com/smimage-20221022160112746.png" alt="image-20221022160112746"></p>
<div class="custom-container tip"><p class="custom-container-title">📜 对上面的解释：</p>
<p>可能我们现在没办法看出来很大的区别，但是我们使用<code v-pre>delete</code>删除这个<code v-pre>deployment</code>部署<code v-pre>tomcat</code>会怎么样？</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl delete pod mytomcat-dc7db794-mkfxn mynginx 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221022160515168.png" alt="image-20221022160515168"></p>
<blockquote>
<p>可以看出是没有办法删除掉的，因为删除后k8s又拉取了，这个功能是很强大的~yyds</p>
<p><strong>这样的话即使机器宕机了也是不会影响的~</strong></p>
</blockquote>
</div>
<h3 id="如果想要真正的删除怎么办" tabindex="-1"><a class="header-anchor" href="#如果想要真正的删除怎么办" aria-hidden="true">#</a> 如果想要真正的删除怎么办？</h3>
<p>我们可以使用<code v-pre>deploy</code>查看部署（deployment简写）：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl get deploy</span>
NAME       READY   UP-TO-DATE   AVAILABLE   AGE
my-nginx   <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           42h
mytomcat   <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           10m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来可以删除了</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl get deploy</span>
NAME       READY   UP-TO-DATE   AVAILABLE   AGE
my-nginx   <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           42h
mytomcat   <span class="token number">1</span>/1     <span class="token number">1</span>            <span class="token number">1</span>           10m

<span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl delete deploy mytomcat </span>
deployment.apps <span class="token string">"mytomcat"</span> deleted

<span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl get deploy</span>
NAME       READY   UP-TO-DATE   AVAILABLE   AGE
my-nginx   <span class="token number">3</span>/3     <span class="token number">3</span>            <span class="token number">3</span>           42h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="多副本" tabindex="-1"><a class="header-anchor" href="#多副本" aria-hidden="true">#</a> 多副本</h2>
<p><strong>我们可以指定副本个数，比如说下面指定三份：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create deployment my-dep <span class="token parameter variable">--image</span><span class="token operator">=</span>nginx <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">📜 对上面的解释：</p>
<p><img src="http://sm.cubxxw.com/smimage-20221022161337428.png" alt="image-20221022161337428"></p>
<ul>
<li>UP-TO-DATE：表示成功启动的个数</li>
<li>AVAILABLE：表示一共副本的总数</li>
</ul>
<blockquote>
<p>当然同样的我们可以使用<code v-pre>dashboard</code>可视化界面进行部署~</p>
</blockquote>
<p>⚡ 我们还可以用下面命令打印<code v-pre>pod</code>详细信息：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> kubectl get pod -owide
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221022161843319.png" alt="image-20221022161843319"></p>
<p>每台机器都创建了一台，同样的，每台机器的<code v-pre>ip</code>是不一样的~</p>
</div>
<h2 id="工作负载-deployment扩容缩容能力" tabindex="-1"><a class="header-anchor" href="#工作负载-deployment扩容缩容能力" aria-hidden="true">#</a> 工作负载-deployment扩容缩容能力</h2>
<p>⚡ <strong>将现有的机器（因为满足不了需求）多部署几台pod，这个过程叫做扩容。同样的缩容就是将一些pod下线（流量高峰期过了）</strong></p>
<h3 id="扩缩容" tabindex="-1"><a class="header-anchor" href="#扩缩容" aria-hidden="true">#</a> 扩缩容</h3>
<div class="custom-container tip"><p class="custom-container-title">技巧</p>
<p>我们可以动态查看pod情况</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>watch -n 1 kubectl get pod 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<blockquote>
<p>缩容为两份</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl scale deploy/my-nginx  <span class="token parameter variable">--replicas</span><span class="token operator">=</span><span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221022163051069.png" alt="image-20221022163051069"></p>
<blockquote>
<p>扩容为三份</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl scale deploy/my-nginx  --replicas=3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221022163210228.png" alt="image-20221022163210228"></p>
<div class="custom-container warning"><p class="custom-container-title">注意：你是可以扩容多份（即使你的服务器没有这么多）</p>
<p><img src="http://sm.cubxxw.com/smimage-20221022163510801.png" alt="image-20221022163510801"></p>
</div>
<h3 id="你可以直接修改deplot配置文件达到扩缩容" tabindex="-1"><a class="header-anchor" href="#你可以直接修改deplot配置文件达到扩缩容" aria-hidden="true">#</a> 你可以直接修改deplot配置文件达到扩缩容</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl edit deploy my-nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221022163752641.png" alt="image-20221022163752641"></p>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>当然你也可以用可视化界面实现（点击缩放：可以实现扩容和缩容）</p>
</div>
<h2 id="yaml-声明式创建" tabindex="-1"><a class="header-anchor" href="#yaml-声明式创建" aria-hidden="true">#</a> yaml 声明式创建</h2>
<h2 id="自愈和故障转移" tabindex="-1"><a class="header-anchor" href="#自愈和故障转移" aria-hidden="true">#</a> 自愈和故障转移</h2>
<div class="custom-container tip"><p class="custom-container-title">自愈和故障转移</p>
<p>当我们有一台<code v-pre>pod</code>出现问题，<code v-pre>depoyment</code>会感知到错误，然后将其修复（杀死重启）。</p>
<p>也有一种情况：某一个机器突然宕机或者下线了，整个机器没办法运行，此时<code v-pre>depoyment</code>会将这个机器的所有<code v-pre>pod</code>转移到其他机器正常运行，这个过程叫做故障转移。</p>
</div>
<h2 id="depoyment滚动和更新能力" tabindex="-1"><a class="header-anchor" href="#depoyment滚动和更新能力" aria-hidden="true">#</a> depoyment滚动和更新能力</h2>
<p>🚸 如果pod有新的版本，我们怎么样去升级pod？</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>v1 --> v2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smformat,png" alt="查看源图像"></p>
<div class="custom-container warning"><p class="custom-container-title">注意⚠️</p>
<p>我们是不会同时更新所有的pod，因为这样的话需要停机维护，成本很大。</p>
<p>我们使用的方式是滚动更新，一个pod更新完了再更新下一个。</p>
<p>这样就不需要停机维护了~  也不会影响正常运行</p>
</div>
<h3 id="滚动更新" tabindex="-1"><a class="header-anchor" href="#滚动更新" aria-hidden="true">#</a> 滚动更新</h3>
<p><strong>命令：</strong></p>
<ul>
<li><code v-pre>--record</code>：显示更新的效果</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl <span class="token builtin class-name">set</span> image deploy/my-nginx <span class="token assign-left variable">nginx</span><span class="token operator">=</span><span class="token number">1.16</span>.1  <span class="token parameter variable">--record</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>升级前效果：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get pod <span class="token parameter variable">-w</span> <span class="token comment">#可以观察到实时的更新状态</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221022170358831.png" alt="image-20221022170358831"></p>
<p><strong>升级后效果：</strong></p>
<p><img src="http://sm.cubxxw.com/smimage-20221022170823962.png" alt="image-20221022170823962"></p>
<h2 id="版本回退" tabindex="-1"><a class="header-anchor" href="#版本回退" aria-hidden="true">#</a> 版本回退</h2>
<p><strong>查看当前的pod版本：</strong></p>
<blockquote>
<p><code v-pre>image</code>表示对应的当前镜像版本号</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl get deploy/my-nginx -o yaml |grep image</span>
      <span class="token punctuation">{</span><span class="token string">"apiVersion"</span><span class="token builtin class-name">:</span><span class="token string">"apps/v1"</span>,<span class="token string">"kind"</span><span class="token builtin class-name">:</span><span class="token string">"Deployment"</span>,<span class="token string">"metadata"</span>:<span class="token punctuation">{</span><span class="token string">"annotations"</span>:<span class="token punctuation">{</span><span class="token punctuation">}</span>,<span class="token string">"labels"</span>:<span class="token punctuation">{</span><span class="token string">"app"</span><span class="token builtin class-name">:</span><span class="token string">"nginx"</span><span class="token punctuation">}</span>,<span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"my-nginx"</span>,<span class="token string">"namespace"</span><span class="token builtin class-name">:</span><span class="token string">"default"</span><span class="token punctuation">}</span>,<span class="token string">"spec"</span>:<span class="token punctuation">{</span><span class="token string">"replicas"</span>:3,<span class="token string">"selector"</span>:<span class="token punctuation">{</span><span class="token string">"matchLabels"</span>:<span class="token punctuation">{</span><span class="token string">"app"</span><span class="token builtin class-name">:</span><span class="token string">"nginx"</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">"template"</span>:<span class="token punctuation">{</span><span class="token string">"metadata"</span>:<span class="token punctuation">{</span><span class="token string">"labels"</span>:<span class="token punctuation">{</span><span class="token string">"app"</span><span class="token builtin class-name">:</span><span class="token string">"nginx"</span><span class="token punctuation">}</span><span class="token punctuation">}</span>,<span class="token string">"spec"</span>:<span class="token punctuation">{</span><span class="token string">"containers"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"image"</span><span class="token builtin class-name">:</span><span class="token string">"nginx:1.14.2"</span>,<span class="token string">"name"</span><span class="token builtin class-name">:</span><span class="token string">"nginx"</span>,<span class="token string">"ports"</span>:<span class="token punctuation">[</span><span class="token punctuation">{</span><span class="token string">"containerPort"</span>:80<span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
    kubernetes.io/change-cause: kubectl <span class="token builtin class-name">set</span> image deploy/my-nginx <span class="token assign-left variable">nginx</span><span class="token operator">=</span><span class="token number">1.16</span>.1 <span class="token parameter variable">--record</span><span class="token operator">=</span>true
      - image: <span class="token number">1.16</span>.1
        imagePullPolicy: IfNotPresent
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看历史记录：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># kubectl rollout history deployment/my-nginx</span>
deployment.apps/my-nginx 
REVISION  CHANGE-CAUSE
<span class="token number">1</span>         <span class="token operator">&lt;</span>none<span class="token operator">></span>
<span class="token number">2</span>         kubectl <span class="token builtin class-name">set</span> image deploy/my-nginx <span class="token assign-left variable">nginx</span><span class="token operator">=</span><span class="token number">1.16</span>.1 <span class="token parameter variable">--record</span><span class="token operator">=</span>true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>两次版本：</p>
<ol>
<li>部署<code v-pre>my-nginx</code>产生的<code v-pre>&lt;none&gt;</code></li>
<li>版本升级镜像产生的内容</li>
</ol>
</blockquote>
<div class="custom-container warning"><p class="custom-container-title">回滚到上一次</p>
<p>我们使用<code v-pre>rollout</code>命令</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl rollout undo deploy/my-dep --to-revision<span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221022171946361.png" alt="image-20221022171946361"></p>
</div>
<h2 id="其他工作负载" tabindex="-1"><a class="header-anchor" href="#其他工作负载" aria-hidden="true">#</a> 其他工作负载</h2>
<div class="custom-container tip"><p class="custom-container-title">工作负载是在kubernetes上运行的应用程序</p>
<p>无论你的负载是单一组件还是由多个一同工作的组件构成，在Kubernetes中你可以在一组Pods中运行它。在Kuberneres中，pod代表的是集群上处于运行状态的一组容器。</p>
<p>Kubernetes Pods有确定的生命周期。例如，当某Pod在你的集群中运行时，Pod运行所在的节点出现致命错误时，所有该节点上的Pods都会失败。Kubernetes将这类失败视为最终状态：即使该节点后来恢复正常运行，你也需要创建新的Pod来恢复应用。</p>
<p>不过，为了让用户的日子略微好过一点，你并不需要直接管理每个Pod。相反，你可以使用负载资源来替你管理一组Pods。这些资源配置控制器来确保合适类型的、处于运行状态的Pod个数是正确的，与你所指定的状态相一致。</p>
<p>常用的工作负载控制器：</p>
<ul>
<li><code v-pre>Deployment</code>：无状态应用部署（微服务）</li>
<li><code v-pre>StatefulSet</code>：有状态应用部署（redis、mysql，提供存储、网络等）</li>
<li><code v-pre>DaemonSet</code>：确保所有Node运行同一个Pod（守护型应用部署，比如日志收集组件）</li>
<li><code v-pre>Job</code>：一次性任务</li>
<li><code v-pre>CronJob</code>：定时任务</li>
</ul>
</div>
<p><strong>在平常我们是不会直接的创建<code v-pre>pod</code>，而是使用工作负载来创建<code v-pre>pod</code></strong></p>
<p><img src="http://sm.cubxxw.com/smimage-20221022172816219.png" alt="image-20221022172816219"></p>
<div class="custom-container warning"><p class="custom-container-title">⚠️注意</p>
<p>我们所有的部署（mysql、redis、tomcat）都是没办法通过浏览器访问的，所以没有办法看到效果，或许我们可以通过内网的地址访问（curl）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># curl 100.66.195.43</span>
<span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">></span>
<span class="token operator">&lt;</span>html<span class="token operator">></span>
<span class="token operator">&lt;</span>head<span class="token operator">></span>
<span class="token operator">&lt;</span>title<span class="token operator">></span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/title<span class="token operator">></span>
<span class="token operator">&lt;</span>style<span class="token operator">></span>
html <span class="token punctuation">{</span> color-scheme: light dark<span class="token punctuation">;</span> <span class="token punctuation">}</span>
body <span class="token punctuation">{</span> width: 35em<span class="token punctuation">;</span> margin: <span class="token number">0</span> auto<span class="token punctuation">;</span>
font-family: Tahoma, Verdana, Arial, sans-serif<span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="token operator">&lt;</span>/style<span class="token operator">></span>
<span class="token operator">&lt;</span>/head<span class="token operator">></span>
<span class="token operator">&lt;</span>body<span class="token operator">></span>
<span class="token operator">&lt;</span>h<span class="token operator"><span class="token file-descriptor important">1</span>></span>Welcome to nginx<span class="token operator">!</span><span class="token operator">&lt;</span>/h<span class="token operator"><span class="token file-descriptor important">1</span>></span>
<span class="token operator">&lt;</span>p<span class="token operator">></span>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.<span class="token operator">&lt;</span>/p<span class="token operator">></span>

<span class="token operator">&lt;</span>p<span class="token operator">></span>For online documentation and support please refer to
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">"http://nginx.org/"</span><span class="token operator">></span>nginx.org<span class="token operator">&lt;</span>/a<span class="token operator">></span>.<span class="token operator">&lt;</span>br/<span class="token operator">></span>
Commercial support is available at
<span class="token operator">&lt;</span>a <span class="token assign-left variable">href</span><span class="token operator">=</span><span class="token string">"http://nginx.com/"</span><span class="token operator">></span>nginx.com<span class="token operator">&lt;</span>/a<span class="token operator">></span>.<span class="token operator">&lt;</span>/p<span class="token operator">></span>

<span class="token operator">&lt;</span>p<span class="token operator">></span><span class="token operator">&lt;</span>em<span class="token operator">></span>Thank you <span class="token keyword">for</span> using nginx.<span class="token operator">&lt;</span>/em<span class="token operator">></span><span class="token operator">&lt;</span>/p<span class="token operator">></span>
<span class="token operator">&lt;</span>/body<span class="token operator">></span>
<span class="token operator">&lt;</span>/html<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '9.md' style='float:left'>⬆️上一节🔗  </a><a href = '11.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


