<template><div><h1 id="_3主3从redis集群扩缩容配置案例说明" tabindex="-1"><a class="header-anchor" href="#_3主3从redis集群扩缩容配置案例说明" aria-hidden="true">#</a> 3主3从redis集群扩缩容配置案例说明</h1>
<p>[toc]</p>
<h3 id="关闭防火墙-启动docker后台服务" tabindex="-1"><a class="header-anchor" href="#关闭防火墙-启动docker后台服务" aria-hidden="true">#</a> 关闭防火墙+启动docker后台服务</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl strt docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="新建6个docker实例" tabindex="-1"><a class="header-anchor" href="#新建6个docker实例" aria-hidden="true">#</a> 新建6个docker实例</h3>
<blockquote>
<p>大规模的扩缩容，如何快速同时启动，docker提供了瞬间可达</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d --name redis-node-1 --net host --privileged=true \
-v /data/redis/share/redis-node-1:/data \
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6381

docker run -d --name redis-node-2 --net host --privileged=true \
-v /data/redis/share/redis-node-2:/data \
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6382

docker run -d --name redis-node-3 --net host --privileged=true \
-v /data/redis/share/redis-node-3:/data \
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6383

docker run -d --name redis-node-4 --net host --privileged=true \
-v /data/redis/share/redis-node-4:/data \
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6384

docker run -d --name redis-node-5 --net host --privileged=true \
-v /data/redis/share/redis-node-5:/data \
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6385

docker run -d --name redis-node-6 --net host --privileged=true \
-v /data/redis/share/redis-node-6:/data \
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6386

docker ps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/12/eEPbAR1yG45qDig.png" alt="image-20220512164801906"></p>
<h3 id="进入容器redis-node-1并为6台机器构建集群关系" tabindex="-1"><a class="header-anchor" href="#进入容器redis-node-1并为6台机器构建集群关系" aria-hidden="true">#</a> 进入容器redis-node-1并为6台机器构建集群关系</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker exec -it redis-node-1 /bin/bash

ifconfig #查看ip	192.168.121.129

redis-cli --cluster create 192.168.121.129:6381 192.168.121.129:6382 192.168.121.129:6383 192.168.121.129:6384 192.168.121.129:6385 192.168.121.129:6386 --cluster-replicas 1
# --cluster-replicas 1表示为每一个master创建一个slave结点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/12/AYPhgkbeuNwo3H5.png" alt="image-20220512165806124"></p>
<ul>
<li>
<p>Performing hash slots allocation on 6 nodes...哈希槽对六个结点进行分配</p>
</li>
<li>
<p>M：表示主机器（master主人）</p>
</li>
<li>
<p>S：表示从机器  （slaves奴隶）</p>
</li>
<li>
<p>yes接受分配~分配成功</p>
<p><img src="https://s2.loli.net/2022/05/12/QKvfi9TmObY6cG4.png" alt="image-20220512170053023"></p>
</li>
</ul>
<p>​</p>
<h3 id="以6381作为切入点-查看集群状态" tabindex="-1"><a class="header-anchor" href="#以6381作为切入点-查看集群状态" aria-hidden="true">#</a> 以6381作为切入点，查看集群状态</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>redis-cli -p 6381
cluster info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>cluster info查看槽位</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/data<span class="token comment"># redis-cli -p 6381</span>
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>></span> cluster info
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_slots_pfail:0
cluster_slots_fail:0
cluster_known_nodes:6
cluster_size:3
cluster_current_epoch:6
cluster_my_epoch:1
cluster_stats_messages_ping_sent:415
cluster_stats_messages_pong_sent:422
cluster_stats_messages_sent:837
cluster_stats_messages_ping_received:417
cluster_stats_messages_pong_received:415
cluster_stats_messages_meet_received:5
cluster_stats_messages_received:837
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>></span> cluster nodes
964043841e4c5519d3cde93cae6b32ebe5ba1830 <span class="token number">192.168</span>.121.129:6381@16381 myself,master - <span class="token number">0</span> <span class="token number">1652346428000</span> <span class="token number">1</span> connected <span class="token number">0</span>-5460
702a95b6eeb02a9d01d38152d599fdf57c70cf0c <span class="token number">192.168</span>.121.129:6386@16386 slave 447dba4f4813f9178d67e62488a4c4c5aba87635 <span class="token number">0</span> <span class="token number">1652346430721</span> <span class="token number">3</span> connected
125e88db573553be475175cd604eb9887506a121 <span class="token number">192.168</span>.121.129:6385@16385 slave cc788412e2b72c5a3ea3ba5cd9c80197a554382f <span class="token number">0</span> <span class="token number">1652346429000</span> <span class="token number">2</span> connected
cc788412e2b72c5a3ea3ba5cd9c80197a554382f <span class="token number">192.168</span>.121.129:6382@16382 master - <span class="token number">0</span> <span class="token number">1652346430000</span> <span class="token number">2</span> connected <span class="token number">5461</span>-10922
187c17cec8177135b6203328156bb7a7e73714d0 <span class="token number">192.168</span>.121.129:6384@16384 slave 964043841e4c5519d3cde93cae6b32ebe5ba1830 <span class="token number">0</span> <span class="token number">1652346429715</span> <span class="token number">1</span> connected
447dba4f4813f9178d67e62488a4c4c5aba87635 <span class="token number">192.168</span>.121.129:6383@16383 master - <span class="token number">0</span> <span class="token number">1652346428707</span> <span class="token number">3</span> connected <span class="token number">10923</span>-16383
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>1,2,3三台机器是master；4，5，6三台机器是slave</strong></p>
<p><strong>1号主机挂4号，2号主机挂5号，3号挂6号，这个是随机分配的（为什么我的这莫巧我也不知道）</strong></p>
<h3 id="主从容错切换迁移案例" tabindex="-1"><a class="header-anchor" href="#主从容错切换迁移案例" aria-hidden="true">#</a> 主从容错切换迁移案例</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>></span> <span class="token builtin class-name">set</span> k1 <span class="token function">vi</span>
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> MOVED <span class="token number">12706</span> <span class="token number">192.168</span>.121.129:6383
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>></span> <span class="token builtin class-name">set</span> k1 v1
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> MOVED <span class="token number">12706</span> <span class="token number">192.168</span>.121.129:6383
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>></span> <span class="token builtin class-name">set</span> k2 v2
OK
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>></span> <span class="token builtin class-name">set</span> k3 v3
OK
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>></span> <span class="token builtin class-name">set</span> k4 v4
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> MOVED <span class="token number">8455</span> <span class="token number">192.168</span>.121.129:6382
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>></span> <span class="token builtin class-name">set</span> k5 v5
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> MOVED <span class="token number">12582</span> <span class="token number">192.168</span>.121.129:6383
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>></span> <span class="token builtin class-name">set</span> k6 v6
OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在集群中这样用的话会失效，不能用单机版连接命令</strong></p>
<p><strong>防止路由失效加参数<code v-pre>-c</code>并新增两个key</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>redis-cli -p 6381 -c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>演示</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>root<span class="token variable">@ubuntu</span>:<span class="token operator">/</span><span class="token keyword">data</span><span class="token comment"># redis-cli -p 8381 -c</span>
Could <span class="token operator">not</span> <span class="token keyword">connect</span> <span class="token keyword">to</span> Redis at <span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span>:<span class="token number">8381</span>: Connection refused
<span class="token operator">not</span> connected<span class="token operator">></span> <span class="token keyword">exit</span>
root<span class="token variable">@ubuntu</span>:<span class="token operator">/</span><span class="token keyword">data</span><span class="token comment"># redis-cli -p 6381 -c</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span>:<span class="token number">6381</span><span class="token operator">></span> flushall
OK
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span>:<span class="token number">6381</span><span class="token operator">></span> <span class="token keyword">set</span> k1 v1
<span class="token operator">-</span><span class="token operator">></span> Redirected <span class="token keyword">to</span> slot <span class="token punctuation">[</span><span class="token number">12706</span><span class="token punctuation">]</span> located at <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6383</span>
OK
<span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6383</span><span class="token operator">></span> <span class="token keyword">set</span> k2 v2
<span class="token operator">-</span><span class="token operator">></span> Redirected <span class="token keyword">to</span> slot <span class="token punctuation">[</span><span class="token number">449</span><span class="token punctuation">]</span> located at <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6381</span>
OK
<span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6381</span><span class="token operator">></span> <span class="token keyword">set</span> k3 v3
OK
<span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6381</span><span class="token operator">></span> <span class="token keyword">set</span> k4 v4
<span class="token operator">-</span><span class="token operator">></span> Redirected <span class="token keyword">to</span> slot <span class="token punctuation">[</span><span class="token number">8455</span><span class="token punctuation">]</span> located at <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6382</span>
OK
<span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6382</span><span class="token operator">></span> <span class="token keyword">set</span> k5 v5
<span class="token operator">-</span><span class="token operator">></span> Redirected <span class="token keyword">to</span> slot <span class="token punctuation">[</span><span class="token number">12582</span><span class="token punctuation">]</span> located at <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6383</span>
OK
<span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6383</span><span class="token operator">></span> <span class="token keyword">set</span> k6 v6
<span class="token operator">-</span><span class="token operator">></span> Redirected <span class="token keyword">to</span> slot <span class="token punctuation">[</span><span class="token number">325</span><span class="token punctuation">]</span> located at <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6381</span>
OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>即5号和6号slave不是在1号机，越界了，可以用<code v-pre>-c</code>集群化。会跳转到对应的redis</strong></p>
<h3 id="查看集群信息cluster-check" tabindex="-1"><a class="header-anchor" href="#查看集群信息cluster-check" aria-hidden="true">#</a> 查看集群信息cluster check</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>redis-cli --cluster check 192.168.121.129:6381
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>将第一台机器停掉</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker stop redis-node-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/12/LbkaB4OsQe12mv3.png" alt="image-20220512180313934"></p>
<p><strong>此时1号宕机了，我们从二号开始作为突破</strong></p>
<p><strong>我们查看集群状态</strong></p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span>:<span class="token number">6382</span><span class="token operator">></span> cluster nodes
<span class="token number">187</span>c17cec8177135b6203328156bb7a7e73714d0 <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6384</span><span class="token variable">@16384</span> master <span class="token operator">-</span> <span class="token number">0</span> <span class="token number">1652349890155</span> <span class="token number">7</span> connected <span class="token number">0</span><span class="token operator">-</span><span class="token number">5460</span>
<span class="token number">125</span>e88db573553be475175cd604eb9887506a121 <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6385</span><span class="token variable">@16385</span> slave cc788412e2b72c5a3ea3ba5cd9c80197a554382f <span class="token number">0</span> <span class="token number">1652349891169</span> <span class="token number">2</span> connected
cc788412e2b72c5a3ea3ba5cd9c80197a554382f <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6382</span><span class="token variable">@16382</span> myself<span class="token punctuation">,</span>master <span class="token operator">-</span> <span class="token number">0</span> <span class="token number">1652349890000</span> <span class="token number">2</span> connected <span class="token number">5461</span><span class="token operator">-</span><span class="token number">10922</span>
<span class="token number">702</span>a95b6eeb02a9d01d38152d599fdf57c70cf0c <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6386</span><span class="token variable">@16386</span> slave <span class="token number">447</span>dba4f4813f9178d67e62488a4c4c5aba87635 <span class="token number">0</span> <span class="token number">1652349892186</span> <span class="token number">3</span> connected
<span class="token number">447</span>dba4f4813f9178d67e62488a4c4c5aba87635 <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6383</span><span class="token variable">@16383</span> master <span class="token operator">-</span> <span class="token number">0</span> <span class="token number">1652349889000</span> <span class="token number">3</span> connected <span class="token number">10923</span><span class="token operator">-</span><span class="token number">16383</span>
<span class="token number">964043841</span>e4c5519d3cde93cae6b32ebe5ba1830 <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6381</span><span class="token variable">@16381</span> master<span class="token punctuation">,</span>fail <span class="token operator">-</span> <span class="token number">1652349736906</span> <span class="token number">1652349733000</span> <span class="token number">1</span> disconnected
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>结点1还活着,但是显示得是fail，此时6384上位，显示master，完成了集群迁移</strong></p>
<p><strong>我们将6381恢复过来，再看看集群信息</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/mysql/mydata/mysql-slave/conf# docker start redis-node-1
redis-node-1
root@ubuntu:/mysql/mydata/mysql-slave/conf# docker ps |grep redis
3b80844ec9cd   redis:6.0.8             "docker-entrypoint.s…"   About an hour ago   Up About an hour                                                                      redis-node-6
1ed04c474cbf   redis:6.0.8             "docker-entrypoint.s…"   About an hour ago   Up About an hour                                                                      redis-node-5
fa6e8cac6376   redis:6.0.8             "docker-entrypoint.s…"   About an hour ago   Up About an hour                                                                      redis-node-4
de3446725228   redis:6.0.8             "docker-entrypoint.s…"   About an hour ago   Up About an hour                                                                      redis-node-3
c6cdf1fbc619   redis:6.0.8             "docker-entrypoint.s…"   About an hour ago   Up About an hour                                                                      redis-node-2
b6924b43bca4   redis:6.0.8             "docker-entrypoint.s…"   About an hour ago   Up 8 seconds                                                                          redis-node-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>此时已经恢复过来了，我们查看节点状态</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/data# redis-cli -p 6381 -c
127.0.0.1:6381> cluster nodes
125e88db573553be475175cd604eb9887506a121 192.168.121.129:6385@16385 slave cc788412e2b72c5a3ea3ba5cd9c80197a554382f 0 1652350295591 2 connected
187c17cec8177135b6203328156bb7a7e73714d0 192.168.121.129:6384@16384 master - 0 1652350294577 7 connected 0-5460
964043841e4c5519d3cde93cae6b32ebe5ba1830 192.168.121.129:6381@16381 myself,slave 187c17cec8177135b6203328156bb7a7e73714d0 0 1652350293000 7 connected
cc788412e2b72c5a3ea3ba5cd9c80197a554382f 192.168.121.129:6382@16382 master - 0 1652350293000 2 connected 5461-10922
447dba4f4813f9178d67e62488a4c4c5aba87635 192.168.121.129:6383@16383 master - 0 1652350292548 3 connected 10923-16383
702a95b6eeb02a9d01d38152d599fdf57c70cf0c 192.168.121.129:6386@16386 slave 447dba4f4813f9178d67e62488a4c4c5aba87635 0 1652350296602 3 connected
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>可见1号机器虽然活过来了，但是成为从结点，奴隶结点了</strong></p>
<p><strong>如果我们再把4号机停掉，给1号机器上位得机会，此时6381得1好机器依旧能回到主结点</strong></p>
</div></template>


