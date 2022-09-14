<template><div><h1 id="redis主从扩容" tabindex="-1"><a class="header-anchor" href="#redis主从扩容" aria-hidden="true">#</a> redis主从扩容</h1>
<p>[toc]</p>
<p><strong>我们再加入结点主机得时候，对于新机加盟会有什么样的变化呢</strong></p>
<p>​</p>
<h3 id="新建两个结点并且启动" tabindex="-1"><a class="header-anchor" href="#新建两个结点并且启动" aria-hidden="true">#</a> 新建两个结点并且启动</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d --name redis-node-7 --net host --privileged=true \
-v /data/redis/share/redis-node-7:/data \
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6387

docker run -d --name redis-node-8 --net host --privileged=true \
-v /data/redis/share/redis-node-8:/data \
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6388

docker ps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/12/gXUlwdcHPBbahsR.png" alt="image-20220512200740037"></p>
<h3 id="将新增的结点7号-空槽-作为master结点加入原集群" tabindex="-1"><a class="header-anchor" href="#将新增的结点7号-空槽-作为master结点加入原集群" aria-hidden="true">#</a> 将新增的结点7号（空槽）作为master结点加入原集群</h3>
<p><strong>新的结点加入一定要重新洗牌</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker exec -it redis-node-1 /bin/bash
redis-cli --cluster add-node 192.168.121.129:6387 192.168.121.129:6381
#redis-cli --cluster add-node 新结点 原结点
reids-cli --cluster check 192.168.121.129:6381 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>slots进行槽位分段</p>
</blockquote>
<p><img src="https://s2.loli.net/2022/05/12/QerPMzas1F5vpTG.png" alt="image-20220512204012846"></p>
<p><strong>提醒我们暂时没有槽位（0，0，0），我们开始分配，使用reshard</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>redis-cli --cluster reshard 192.168.121.129:6381
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>上面我们重新分配了一个槽位</p>
</blockquote>
<p><img src="https://s2.loli.net/2022/05/12/4jQiFxfPsTXg329.png" alt="image-20220512204956570"><strong>注意：此时我们需要分配槽位</strong></p>
<blockquote>
<p>How many slots do you want to move (from 1 to 16384)?</p>
<p>您想移动多少个槽(从1移动到16384)?</p>
</blockquote>
<p><strong>此时我们需要进行计算16384/4=4096（是四台master）</strong></p>
<p><strong>接受的ID需要填6387的ID</strong></p>
<blockquote>
<p>Do you want to proceed with the proposed reshard plan (yes/no)?</p>
<p>你想继续拟议的reshard计划吗(是/否)?</p>
</blockquote>
<p><img src="https://s2.loli.net/2022/05/12/GJZbA7l5hmCEuBS.png" alt="image-20220512205709713"></p>
<p><strong>此时我们发现槽位发生变化，每一家都润了一点给七号</strong></p>
<p><strong>所以是以前的区间，前三家各自拿出一部分，这样可以节约分配成本</strong></p>
<h3 id="将8号挂载到7号上面" tabindex="-1"><a class="header-anchor" href="#将8号挂载到7号上面" aria-hidden="true">#</a> 将8号挂载到7号上面</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>redis-cli --cluster add-node 192.168.121.129:6388 192.168.121.129:6387 \
--cluster-slave --cluster-master-id 7号的编号

redis-cli --cluster check 192.168.121.129:6387
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/12/bLF4Xw6vt2yh8Cr.png" alt="image-20220512210521860"></p>
<p><strong>此时扩容成功！！！</strong></p>
</div></template>


