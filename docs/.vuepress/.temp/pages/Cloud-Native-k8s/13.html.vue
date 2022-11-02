<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第13节-存储抽象" tabindex="-1"><a class="header-anchor" href="#第13节-存储抽象" aria-hidden="true">#</a> 第13节 存储抽象</h1>
<div><a href = '12.md' style='float:left'>⬆️上一节🔗  </a><a href = '14.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="存储抽象" tabindex="-1"><a class="header-anchor" href="#存储抽象" aria-hidden="true">#</a> 存储抽象</h2>
<div class="custom-container danger"><p class="custom-container-title">STOP</p>
<p>这一部分内容非常重要~</p>
<p>我们在前面学docker的时候实现挂载<code v-pre>–mount</code></p>
<p>同样对于k8s来说，我们也需要这个挂载的实现，而且挂载功能更强。</p>
<blockquote>
<p>我们如果使用了k8s，这样挂载会有一个很严重的问题，如果<code v-pre>pod</code>宕机，重新启动到别的机器~那么此时可能会出现挂载失败。</p>
</blockquote>
<p><strong>⚡ k8s将所有的挂载的层次统一管理起来，形成存储层。</strong></p>
</div>
<h2 id="环境准备nfs" tabindex="-1"><a class="header-anchor" href="#环境准备nfs" aria-hidden="true">#</a> 环境准备NFS</h2>
<h3 id="所有结点" tabindex="-1"><a class="header-anchor" href="#所有结点" aria-hidden="true">#</a> 所有结点</h3>
<p><strong>安装NFS：</strong></p>
<CodeGroup>
<CodeGroupItem title="Ubuntu">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="Centos">
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> nfs-utils
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></CodeGroupItem>
</CodeGroup>
<h3 id="主节点" tabindex="-1"><a class="header-anchor" href="#主节点" aria-hidden="true">#</a> 主节点</h3>
<blockquote>
<p>给master结点暴露文件夹<code v-pre>/nfs/data/</code></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#nfs 主节点</span>
<span class="token builtin class-name">echo</span> <span class="token string">"/nfs/data/ *(insecure,rw,sync,no_root_squash)"</span> <span class="token operator">></span> /etc/exports
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建文件夹：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>启动rpc远程绑定（设置开机启动）：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> rpcbind <span class="token parameter variable">--now</span>
systemctl <span class="token builtin class-name">enable</span> nfs-server <span class="token parameter variable">--now</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>检查：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>exportfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022204801491.png" alt="image-20221022204801491"></p>
<blockquote>
<p>查看私有网络的ip地址给从结点使用：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># ip a | grep "eth0"</span>
<span class="token number">2</span>: eth0: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc mq state UP group default qlen <span class="token number">1000</span>
    inet <span class="token number">192.168</span>.0.2/24 brd <span class="token number">192.168</span>.0.255 scope global dynamic noprefixroute eth0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h3 id="从结点" tabindex="-1"><a class="header-anchor" href="#从结点" aria-hidden="true">#</a> 从结点</h3>
<p><strong>测试结点检查：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master03 ~<span class="token punctuation">]</span><span class="token comment"># showmount -e 192.168.0.2</span>
Export list <span class="token keyword">for</span> <span class="token number">192.168</span>.0.2:
/nfs/data *
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建<code v-pre>/nfs/data</code></strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>同步：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mount -t nfs 192.168.0.2:/nfs/data /nfs/data
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="验证" tabindex="-1"><a class="header-anchor" href="#验证" aria-hidden="true">#</a> 验证</h3>
<p><strong>在主节点中，创建文件，在其他结点就可以发现同步了~</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># mount -t nfs 192.168.0.2:/nfs/data /nfs/data</span>
<span class="token punctuation">[</span>root@k8s-master01 ~<span class="token punctuation">]</span><span class="token comment"># cd /nfs/data/</span>
<span class="token punctuation">[</span>root@k8s-master01 data<span class="token punctuation">]</span><span class="token comment"># echo "111" >> README.md</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022210439304.png" alt="image-20221022210439304"></p>
<h2 id="原生方式数据挂载" tabindex="-1"><a class="header-anchor" href="#原生方式数据挂载" aria-hidden="true">#</a> 原生方式数据挂载</h2>
<p><strong>创建文件<code v-pre>deploy.yaml</code>：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>demo
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>demo
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>demo
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pv<span class="token punctuation">-</span>demo
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> html
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/nginx/html
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> html
          <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
            <span class="token key atrule">server</span><span class="token punctuation">:</span> 172.31.0.4
            <span class="token key atrule">path</span><span class="token punctuation">:</span> /nfs/data/nginx<span class="token punctuation">-</span>pv
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p><code v-pre>/usr/share/nginx/html</code>和<code v-pre>/nfs/data/nginx-pv</code>形成一个映射关系（类似于<code v-pre>docker -v</code>）</p>
</div>
<p>🚀 编译结果如下：</p>
<p><img src="http://sm.nsddd.top/smimage-20221022213410525.png" alt="image-20221022213410525"></p>
<div class="custom-container tip"><p class="custom-container-title">提醒</p>
<p>我们发现一直没办法刷新出来（0/1），我们使用描述命令来打开看看</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl describe pod nginx-pv-demo-75ff4fbcf7-5prbw 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022214019506.png" alt="image-20221022214019506"></p>
<p><strong>failedmount表示挂载失败</strong></p>
<p>⬇️ 重新部署一下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master02 data<span class="token punctuation">]</span><span class="token comment"># kubectl delete -f deploy.yaml </span>
deployment.apps <span class="token string">"nginx-pv-demo"</span> deleted
<span class="token punctuation">[</span>root@k8s-master02 data<span class="token punctuation">]</span><span class="token comment"># kubectl apply -f deploy.yaml </span>
deployment.apps/nginx-pv-demo created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h2 id="pv-pvc" tabindex="-1"><a class="header-anchor" href="#pv-pvc" aria-hidden="true">#</a> PV&amp;PVC</h2>
<div class="custom-container warning"><p class="custom-container-title">pv & pvc</p>
<p>原生方式的问题：
删除<code v-pre>deploy.yaml </code>文件不会删除，浪费空间。</p>
<p><strong>PV</strong>：持久卷（Persistent Volume），将应用需要持久化的数据保存到指定位置，比如Volume的类型、挂载目录、远程存储服务器地址等</p>
<p><strong>PVC</strong>：持久卷申明（Persistent Volume Claim），申明需要使用的持久卷规格，比如存储大小、读写权限等。</p>
<p><img src="http://sm.nsddd.top/smimage-20221022220215815.png" alt="image-20221022220215815"></p>
<blockquote>
<p>我们的<code v-pre>pod</code>需要用多大的空间，需要用PVC写一份申请书，按照申请书给出一个实际的大小空间，申请书删除掉，那么这个空间就会被回收，空间删除掉，申请书也被删除了~</p>
</blockquote>
</div>
<p><strong><code v-pre>StorageClass</code>：充当PV的模板，自动为PVC创建PV</strong></p>
<blockquote>
<p>存储的时候需要<code v-pre>StorageClass</code>指定块存储或者文件存储~</p>
<p><strong>我们在前面也是知道了存储是分类的，我们需要指定<code v-pre>StorageClass</code></strong></p>
</blockquote>
<p><img src="http://sm.nsddd.top/smimage-20221022220407744.png" alt="image-20221022220407744"></p>
<h3 id="创建pv池" tabindex="-1"><a class="header-anchor" href="#创建pv池" aria-hidden="true">#</a> 创建pv池</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#nfs主节点</span>
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data/01
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data/02
<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /nfs/data/03
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">创建PV</p>
<p>注意：server修改为自己的<code v-pre>eth0</code>地址</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 data<span class="token punctuation">]</span><span class="token comment"># ip a | grep eth0</span>
<span class="token number">2</span>: eth0: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">></span> mtu <span class="token number">1500</span> qdisc mq state UP group default qlen <span class="token number">1000</span>
    inet <span class="token number">192.168</span>.0.2/24 brd <span class="token number">192.168</span>.0.255 scope global dynamic noprefixroute eth0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>写入配置文件<code v-pre>pv.yaml</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume  <span class="token comment"># 资源类型pv</span>
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pv01<span class="token punctuation">-</span>10m  <span class="token comment"># 名字无所谓</span>
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>   <span class="token comment"># 限制容量</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 10M
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany  <span class="token comment"># 可读可写</span>
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs   <span class="token comment"># 指定为nfs</span>
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /nfs/data/01 <span class="token comment"># 01文件夹位置</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.0.2  <span class="token comment"># 修改eth0地址</span>
<span class="token punctuation">---</span>  <span class="token comment"># 三个横线代表分割完整文档</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pv02<span class="token punctuation">-</span>1gi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 1Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /nfs/data/02
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.0.2
<span class="token punctuation">---</span>
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolume
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> pv03<span class="token punctuation">-</span>3gi
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">capacity</span><span class="token punctuation">:</span>
    <span class="token key atrule">storage</span><span class="token punctuation">:</span> 3Gi
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs
  <span class="token key atrule">nfs</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /nfs/data/03
    <span class="token key atrule">server</span><span class="token punctuation">:</span> 192.168.0.2

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>🚀 编译结果如下：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master01 data<span class="token punctuation">]</span><span class="token comment"># kubectl apply -f pv.yaml </span>
persistentvolume/pv01-10m created
persistentvolume/pv02-1gi created
persistentvolume/pv03-3gi created
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p><strong>获取系统资源命令：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get persistentvolume
<span class="token comment"># 也可以简写</span>
kubectl get <span class="token function">pv</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022221346394.png" alt="image-20221022221346394"></p>
<div class="custom-container warning"><p class="custom-container-title">PVC创建与绑定</p>
<p>⚡ 创建PVC <code v-pre>pvc.ymal</code></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">kind</span><span class="token punctuation">:</span> PersistentVolumeClaim
<span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pvc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">accessModes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> ReadWriteMany
  <span class="token key atrule">resources</span><span class="token punctuation">:</span>
    <span class="token key atrule">requests</span><span class="token punctuation">:</span>
      <span class="token key atrule">storage</span><span class="token punctuation">:</span> 200Mi  <span class="token comment"># 我需要200M，找到合适的空间绑定</span>
  <span class="token key atrule">storageClassName</span><span class="token punctuation">:</span> nfs  <span class="token comment"># 对应的是上面的空间名称（分组）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022222002874.png" alt="image-20221022222002874"></p>
<p>📜 对上面的解释：</p>
<blockquote>
<p>绑定了合适的PV</p>
</blockquote>
<p>⚡ 创建Pod绑定PVC</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> apps/v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Deployment
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">labels</span><span class="token punctuation">:</span>
    <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>pvc
  <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>pvc
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">replicas</span><span class="token punctuation">:</span> <span class="token number">2</span>
  <span class="token key atrule">selector</span><span class="token punctuation">:</span>
    <span class="token key atrule">matchLabels</span><span class="token punctuation">:</span>
      <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>pvc
  <span class="token key atrule">template</span><span class="token punctuation">:</span>
    <span class="token key atrule">metadata</span><span class="token punctuation">:</span>
      <span class="token key atrule">labels</span><span class="token punctuation">:</span>
        <span class="token key atrule">app</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>pvc
    <span class="token key atrule">spec</span><span class="token punctuation">:</span>
      <span class="token key atrule">containers</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx
        <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> html
          <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /usr/share/nginx/html
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> html
          <span class="token key atrule">persistentVolumeClaim</span><span class="token punctuation">:</span>
            <span class="token key atrule">claimName</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>pvc

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h2 id="删除策略" tabindex="-1"><a class="header-anchor" href="#删除策略" aria-hidden="true">#</a> 删除策略</h2>
<blockquote>
<p>删除PVC时候是有回收策略的，比如说是要一起删除掉或者是把<code v-pre>PV</code>保留。</p>
</blockquote>
<h2 id="configmap" tabindex="-1"><a class="header-anchor" href="#configmap" aria-hidden="true">#</a> ConfigMap</h2>
<div class="custom-container tip"><p class="custom-container-title">为什么需要ConfigMap</p>
<p>我们在使用docker的时候，通常是将某一个容器创建时候就挂载，这样就会保存下来。</p>
<p>ConfigMap就是把之前的配置文件创建为配置集合</p>
</div>
<h3 id="redis把之前文件创建为一个配置集" tabindex="-1"><a class="header-anchor" href="#redis把之前文件创建为一个配置集" aria-hidden="true">#</a> redis把之前文件创建为一个配置集</h3>
<p><strong>创建文件：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master03 data<span class="token punctuation">]</span><span class="token comment">#  echo "appendonly yes # 表示数据需要持久化存储" >> redis.conf &amp;&amp; cat redis.conf</span>
appendonly <span class="token function">yes</span> <span class="token comment"># 表示数据需要持久化存储</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建一个配置集：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@k8s-master03 data<span class="token punctuation">]</span><span class="token comment"># kubectl create cm redis-conf --from-file=redis.conf</span>
configmap/redis-conf created
<span class="token punctuation">[</span>root@k8s-master03 data<span class="token punctuation">]</span><span class="token comment"># rm redis.conf -f</span>
<span class="token punctuation">[</span>root@k8s-master03 data<span class="token punctuation">]</span><span class="token comment"># kubectl get cm</span>
NAME               DATA   AGE
kube-root-ca.crt   <span class="token number">1</span>      2d11h
redis-conf         <span class="token number">1</span>      19s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">注意：</p>
<p>这个配置集存在<code v-pre>etcd</code>档案库中，只要k8s还活着，配置集就不会丢。</p>
<p><strong>查看配置集：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl get cm redis-conf <span class="token parameter variable">-oyaml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221022224249770.png" alt="image-20221022224249770"></p>
</div>
<p><strong>⚠️ 如何引用上面的配置集：</strong></p>
<div class="custom-container tip"><p class="custom-container-title">创建一个Pod</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Pod
<span class="token key atrule">metadata</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
<span class="token key atrule">spec</span><span class="token punctuation">:</span>
  <span class="token key atrule">containers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">image</span><span class="token punctuation">:</span> redis
    <span class="token key atrule">command</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> redis<span class="token punctuation">-</span>server
      <span class="token punctuation">-</span> <span class="token string">"/redis-master/redis.conf"</span>  <span class="token comment">#指的是redis容器内部的位置</span>
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">containerPort</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">volumeMounts</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /data
      <span class="token key atrule">name</span><span class="token punctuation">:</span> data
    <span class="token punctuation">-</span> <span class="token key atrule">mountPath</span><span class="token punctuation">:</span> /redis<span class="token punctuation">-</span>master  <span class="token comment"># 挂载路径</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> config
  <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> data
      <span class="token key atrule">emptyDir</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> config
      <span class="token key atrule">configMap</span><span class="token punctuation">:</span> <span class="token comment"># 你想要的配置文件从配置集configMap中取出</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span> redis<span class="token punctuation">-</span>conf  <span class="token comment"># 取出上面redis-conf 配置集</span>
        <span class="token key atrule">items</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">key</span><span class="token punctuation">:</span> redis.conf
          <span class="token key atrule">path</span><span class="token punctuation">:</span> redis.conf

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3>
<p>我们修改配置文件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl edit cm redis-conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>在redis-config下面：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">redis.conf</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    appendonly yes # 表示数据需要持久化存储
    requirepass 123456  # 添加</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">记住</p>
<ul>
<li>挂载目录用PV &amp; PVC</li>
<li>挂载配置文件用configMap</li>
</ul>
</div>
</div>
<blockquote>
<p>统一管理的思想很重要：</p>
<ul>
<li>所有的配置文件统一管理，这就是调度的特色</li>
<li>类似还有用户名和密码统一管理~</li>
</ul>
</blockquote>
<h2 id="secret" tabindex="-1"><a class="header-anchor" href="#secret" aria-hidden="true">#</a> Secret</h2>
<div class="custom-container tip"><p class="custom-container-title">Secret作用和介绍</p>
<p><code v-pre>secret</code>用来保存小片敏感数据的k8s资源，例如密码，token，或者秘钥。这类数据当然也可以存放在Pod或者镜像中，但是放在Secret中是为了更方便的控制如何使用数据，并减少暴露的风险。</p>
<ul>
<li>
<p>用户可以创建自己的<code v-pre>secret</code>，系统也会有自己的<code v-pre>secret</code>。</p>
</li>
<li>
<p>Pod需要先引用才能使用某个secret</p>
</li>
</ul>
<p><code v-pre>Secret</code> 类似于 <a href="https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-pod-configmap/" target="_blank" rel="noopener noreferrer">ConfigMap<ExternalLinkIcon/></a> 但专门用于保存机密数据。</p>
</div>
<h3 id="secret的使用" tabindex="-1"><a class="header-anchor" href="#secret的使用" aria-hidden="true">#</a> secret的使用</h3>
<p><strong>Pod有2种方式来使用<code v-pre>secret</code>：</strong></p>
<ol>
<li>作为volume的一个域被一个或多个容器挂载</li>
<li>在拉取镜像的时候被kubelet引用。</li>
<li>或许也可以作为容器的环境变量</li>
</ol>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>默认情况下，Kubernetes Secret 未加密地存储在 API 服务器的底层数据存储（etcd）中。 任何拥有 API 访问权限的人都可以检索或修改 Secret，任何有权访问 etcd 的人也可以。 此外，任何有权限在命名空间中创建 Pod 的人都可以使用该访问权限读取该命名空间中的任何 Secret； 这包括间接访问，例如创建 Deployment 的能力。</p>
</div>
<p><strong>创建一个secret：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubectl create secret docke-registry xiongxinwei-docker <span class="token punctuation">\</span>
--docker-username<span class="token operator">=</span><span class="token number">3293172751</span> <span class="token punctuation">\</span>
--docker-password<span class="token operator">=</span><span class="token number">24643</span><span class="token punctuation">..</span><span class="token punctuation">..</span>. <span class="token punctuation">\</span>
--docker-email<span class="token operator">=</span><span class="token number">3293172751</span>@qq.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">命令格式：</p>
<p>🧷命令格式：</p>
<ul>
<li><code v-pre>--docker-server</code>：Docker仓库地址。</li>
<li><code v-pre>--docker-username</code>：Docker仓库用户名。</li>
<li><code v-pre>--docker-password</code>：Docker仓库密码。</li>
<li><code v-pre>--docker-email</code>：Docker仓库邮箱。</li>
</ul>
</div>
<p><strong>获取secret：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kuberctl get secret
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '12.md' style='float:left'>⬆️上一节🔗  </a><a href = '14.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


