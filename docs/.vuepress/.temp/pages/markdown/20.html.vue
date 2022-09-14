<template><div><h1 id="分布式存储之hash取余算法" tabindex="-1"><a class="header-anchor" href="#分布式存储之hash取余算法" aria-hidden="true">#</a> 分布式存储之hash取余算法</h1>
<p>[toc]</p>
<blockquote>
<p>cluster(集群)模式-docker版哈希槽分区进行亿级数据存储</p>
</blockquote>
<p><strong>1~2亿条甚至更多数据需要缓存，请问如何设计这个存储案例</strong></p>
<blockquote>
<p>使用普通关系型数据库百分百不可能实现，肯定是分布式存储，用redis如何落地？或者是mongoDB</p>
</blockquote>
<h3 id="_1-hash取余分区" tabindex="-1"><a class="header-anchor" href="#_1-hash取余分区" aria-hidden="true">#</a> 1. hash取余分区</h3>
<p><strong>2亿条记录就是2亿条k,v，我们单机不行就必须要分布式多机，假如有3台机器构成一个集群，用户每次读写操作都是根据公式，hash（key)%N个机器台数，计算出hash值，用来决定数据映射到哪个节点上。</strong></p>
<ul>
<li><strong>缺点：简单粗暴，起到负载均衡和分而治之</strong></li>
<li><strong>缺点：某个redis机器宕机了，由于台数数量变化，会导致hash取余全部数据重启洗牌</strong></li>
</ul>
<h3 id="_2-一致性hash算法分区" tabindex="-1"><a class="header-anchor" href="#_2-一致性hash算法分区" aria-hidden="true">#</a> 2. 一致性hash算法分区</h3>
<p><strong>目的就是为了解决分布式缓存数据变动和映射问题，某个机器宕机了，分母数量改变了，自然取余数就不ok了</strong></p>
<h5 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤：</h5>
<ol>
<li>算法构建一致性哈希环
<ul>
<li>hash函数产生hash值，所有hash值构成一个全量集，这个集合可以成为hash空间</li>
<li>一致性hash算法就是将整个hash空间组织成一个虚拟的圆环</li>
<li>将各个服务器使用hash进行一次hash，具体可以选择服务器的IP或者主机名作为关键字映射</li>
</ul>
</li>
<li>服务器IP结点映射</li>
<li>key落到服务器的落键规则</li>
</ol>
<p><img src="https://s2.loli.net/2022/05/11/WC3KuE2olbVgmOU.png" alt="image-20220511224423420"></p>
<ul>
<li>
<p><strong>优点</strong></p>
<ul>
<li><strong>一致性hash算法的容错性</strong></li>
<li><strong>一致性hash算法的扩展性</strong></li>
</ul>
</li>
<li>
<p><strong>缺点</strong></p>
<ul>
<li><strong>一致性hash算法的数据倾斜问题</strong></li>
</ul>
<blockquote>
<p>当结点太少非常容易导致结点分布不均匀</p>
</blockquote>
</li>
</ul>
<h3 id="_3-哈希槽分区算法" tabindex="-1"><a class="header-anchor" href="#_3-哈希槽分区算法" aria-hidden="true">#</a> 3. 哈希槽分区算法</h3>
<blockquote>
<p>这个是大厂非常常见的算法，解决了数据倾斜问题</p>
</blockquote>
<p>哈希槽实质就是一个数组，数据[0,2^14-1]形成hash slot空间</p>
<p>redis cluster使用的是hash slot算法，有固定的16384个hash slot，slot是槽的概念，有点类似memcached的slot，就理解为数据管理和迁移的基本单位吧。</p>
<p><strong>redis cluster算是真正服务端的分布式缓存系统，不像memcached和2.0的redis需要在客户端进行负载均衡。</strong></p>
<p><strong>算法:</strong></p>
<p>对每个 key 计算 CRC16 值，然后对 16384 取模，可以获取 key 对应的 hash slot。</p>
<p><strong>数据分区</strong></p>
<p>Redis Cluster 采用<strong>虚拟槽分区</strong>，所有的<strong>键</strong>根据<strong>哈希函数</strong>映射到 0~16383 （redis默认是16384个槽）整数槽内，计算公式：slot = CRC16（key）&amp; 16384。每个节点负责维护一部分槽以及槽所映射的<strong>键值数据</strong>，如图所示：</p>
<blockquote>
<p>redis集群并没有使用一致性hash而是引入了哈希槽的概念，redis集群有16384个hash槽，每个key通过CRC16校验后对16384取模来决定放哪个槽，集群中每一个结点负责一部分槽，但为什么hash槽的数量是16384呢？</p>
<p>CRC16产生65535位</p>
</blockquote>
<p><img src="https:////upload-images.jianshu.io/upload_images/11772383-cef761c010b2db72.png?imageMogr2/auto-orient/strip|imageView2/2/w/782/format/webp" alt="img"></p>
<p><strong>举个例子</strong></p>
<p><img src="https:////upload-images.jianshu.io/upload_images/11772383-d3adce37a8763257.png?imageMogr2/auto-orient/strip|imageView2/2/w/874/format/webp" alt="img">
当前集群有 5 个节点，每个节点平均大约负责 3276 个<strong>槽</strong>。由于采用<strong>高质量</strong>的<strong>哈希算法</strong>，每个槽所映射的数据通常比较<strong>均匀</strong>，将数据平均划分到 5 个节点进行<strong>数据分区</strong>。Redis Cluster 就是采用<strong>虚拟槽分区</strong>。</p>
<p><strong>节点1</strong>： 包含 0 到 3276 号哈希槽。</p>
<p><strong>节点2</strong>：包含 3277 到 6553 号哈希槽。</p>
<p><strong>节点3</strong>：包含 6554 到 9830 号哈希槽。</p>
<p><strong>节点4</strong>：包含 9831 到 13107 号哈希槽。</p>
<p><strong>节点5</strong>：包含 13108 到 16383 号哈希槽。</p>
<p>所以hash slot的好处是可以像磁盘分区一样自由分配槽位，在配置文件里可以指定，也可以让redis自己选择分配，结果均匀。</p>
<p>这种结构很容易<strong>添加</strong>或者<strong>删除</strong>节点。如果<strong>增加</strong>一个节点 6，就需要从节点 1 ~ 5 获得部分<strong>槽</strong>分配到节点 6 上。如果想<strong>移除</strong>节点 1，需要将节点 1 中的<strong>槽</strong>移到节点 2 ~ 5 上，然后将<strong>没有任何槽</strong>的节点 1 从集群中<strong>移除</strong>即可。</p>
<p>由于从一个节点将<strong>哈希槽</strong>移动到另一个节点并不会<strong>停止服务</strong>，所以无论<strong>添加删除</strong>或者<strong>改变</strong>某个节点的<strong>哈希槽的数量</strong>都不会造成<strong>集群不可用</strong>的状态.</p>
<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> </h2>
<h4 id="缓存的key-hash结果是和slot绑定的-而不是和服务器节点绑定-所以节点的更替只需要迁移slot即可平滑过渡。" tabindex="-1"><a class="header-anchor" href="#缓存的key-hash结果是和slot绑定的-而不是和服务器节点绑定-所以节点的更替只需要迁移slot即可平滑过渡。" aria-hidden="true">#</a> <strong>缓存的key hash结果是和slot绑定的，而不是和服务器节点绑定，所以节点的更替只需要迁移slot即可平滑过渡。</strong></h4>
<h2 id="但是redis分片技术也有功能限制" tabindex="-1"><a class="header-anchor" href="#但是redis分片技术也有功能限制" aria-hidden="true">#</a> 但是redis分片技术也有功能限制：</h2>
<p>笔者遇到过的一些限制主要就是以下几点：</p>
<p>1.对于pipeline批量操作，只能路由到一个片区，压力相对大</p>
<p>2.hmset() map结构也是只能路由到一个片区，是根据大key进行hash，即使有很多个field。</p>
<p>3.事务，不同片区无法在同一个事务中</p>
</div></template>


