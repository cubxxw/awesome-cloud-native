import{_ as s,o as n,c as e,e as a}from"./app.2ebcb929.js";const t={},l=a(`<h1 id="_3\u4E3B3\u4ECEredis\u96C6\u7FA4\u6269\u7F29\u5BB9\u914D\u7F6E\u6848\u4F8B\u8BF4\u660E" tabindex="-1"><a class="header-anchor" href="#_3\u4E3B3\u4ECEredis\u96C6\u7FA4\u6269\u7F29\u5BB9\u914D\u7F6E\u6848\u4F8B\u8BF4\u660E" aria-hidden="true">#</a> 3\u4E3B3\u4ECEredis\u96C6\u7FA4\u6269\u7F29\u5BB9\u914D\u7F6E\u6848\u4F8B\u8BF4\u660E</h1><p>[toc]</p><h3 id="\u5173\u95ED\u9632\u706B\u5899-\u542F\u52A8docker\u540E\u53F0\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#\u5173\u95ED\u9632\u706B\u5899-\u542F\u52A8docker\u540E\u53F0\u670D\u52A1" aria-hidden="true">#</a> \u5173\u95ED\u9632\u706B\u5899+\u542F\u52A8docker\u540E\u53F0\u670D\u52A1</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>systemctl strt docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u65B0\u5EFA6\u4E2Adocker\u5B9E\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u65B0\u5EFA6\u4E2Adocker\u5B9E\u4F8B" aria-hidden="true">#</a> \u65B0\u5EFA6\u4E2Adocker\u5B9E\u4F8B</h3><blockquote><p>\u5927\u89C4\u6A21\u7684\u6269\u7F29\u5BB9\uFF0C\u5982\u4F55\u5FEB\u901F\u540C\u65F6\u542F\u52A8\uFF0Cdocker\u63D0\u4F9B\u4E86\u77AC\u95F4\u53EF\u8FBE</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d --name redis-node-1 --net host --privileged=true \\
-v /data/redis/share/redis-node-1:/data \\
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6381

docker run -d --name redis-node-2 --net host --privileged=true \\
-v /data/redis/share/redis-node-2:/data \\
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6382

docker run -d --name redis-node-3 --net host --privileged=true \\
-v /data/redis/share/redis-node-3:/data \\
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6383

docker run -d --name redis-node-4 --net host --privileged=true \\
-v /data/redis/share/redis-node-4:/data \\
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6384

docker run -d --name redis-node-5 --net host --privileged=true \\
-v /data/redis/share/redis-node-5:/data \\
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6385

docker run -d --name redis-node-6 --net host --privileged=true \\
-v /data/redis/share/redis-node-6:/data \\
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6386

docker ps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/12/eEPbAR1yG45qDig.png" alt="image-20220512164801906"></p><h3 id="\u8FDB\u5165\u5BB9\u5668redis-node-1\u5E76\u4E3A6\u53F0\u673A\u5668\u6784\u5EFA\u96C6\u7FA4\u5173\u7CFB" tabindex="-1"><a class="header-anchor" href="#\u8FDB\u5165\u5BB9\u5668redis-node-1\u5E76\u4E3A6\u53F0\u673A\u5668\u6784\u5EFA\u96C6\u7FA4\u5173\u7CFB" aria-hidden="true">#</a> \u8FDB\u5165\u5BB9\u5668redis-node-1\u5E76\u4E3A6\u53F0\u673A\u5668\u6784\u5EFA\u96C6\u7FA4\u5173\u7CFB</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker exec -it redis-node-1 /bin/bash

ifconfig #\u67E5\u770Bip	192.168.121.129

redis-cli --cluster create 192.168.121.129:6381 192.168.121.129:6382 192.168.121.129:6383 192.168.121.129:6384 192.168.121.129:6385 192.168.121.129:6386 --cluster-replicas 1
# --cluster-replicas 1\u8868\u793A\u4E3A\u6BCF\u4E00\u4E2Amaster\u521B\u5EFA\u4E00\u4E2Aslave\u7ED3\u70B9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/12/AYPhgkbeuNwo3H5.png" alt="image-20220512165806124"></p><ul><li><p>Performing hash slots allocation on 6 nodes...\u54C8\u5E0C\u69FD\u5BF9\u516D\u4E2A\u7ED3\u70B9\u8FDB\u884C\u5206\u914D</p></li><li><p>M\uFF1A\u8868\u793A\u4E3B\u673A\u5668\uFF08master\u4E3B\u4EBA\uFF09</p></li><li><p>S\uFF1A\u8868\u793A\u4ECE\u673A\u5668 \uFF08slaves\u5974\u96B6\uFF09</p></li><li><p>yes\u63A5\u53D7\u5206\u914D~\u5206\u914D\u6210\u529F</p><p><img src="https://s2.loli.net/2022/05/12/QKvfi9TmObY6cG4.png" alt="image-20220512170053023"></p></li></ul><p>\u200B</p><h3 id="\u4EE56381\u4F5C\u4E3A\u5207\u5165\u70B9-\u67E5\u770B\u96C6\u7FA4\u72B6\u6001" tabindex="-1"><a class="header-anchor" href="#\u4EE56381\u4F5C\u4E3A\u5207\u5165\u70B9-\u67E5\u770B\u96C6\u7FA4\u72B6\u6001" aria-hidden="true">#</a> \u4EE56381\u4F5C\u4E3A\u5207\u5165\u70B9\uFF0C\u67E5\u770B\u96C6\u7FA4\u72B6\u6001</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>redis-cli -p 6381
cluster info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>cluster info\u67E5\u770B\u69FD\u4F4D</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/data<span class="token comment"># redis-cli -p 6381</span>
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> cluster info
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
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> cluster nodes
964043841e4c5519d3cde93cae6b32ebe5ba1830 <span class="token number">192.168</span>.121.129:6381@16381 myself,master - <span class="token number">0</span> <span class="token number">1652346428000</span> <span class="token number">1</span> connected <span class="token number">0</span>-5460
702a95b6eeb02a9d01d38152d599fdf57c70cf0c <span class="token number">192.168</span>.121.129:6386@16386 slave 447dba4f4813f9178d67e62488a4c4c5aba87635 <span class="token number">0</span> <span class="token number">1652346430721</span> <span class="token number">3</span> connected
125e88db573553be475175cd604eb9887506a121 <span class="token number">192.168</span>.121.129:6385@16385 slave cc788412e2b72c5a3ea3ba5cd9c80197a554382f <span class="token number">0</span> <span class="token number">1652346429000</span> <span class="token number">2</span> connected
cc788412e2b72c5a3ea3ba5cd9c80197a554382f <span class="token number">192.168</span>.121.129:6382@16382 master - <span class="token number">0</span> <span class="token number">1652346430000</span> <span class="token number">2</span> connected <span class="token number">5461</span>-10922
187c17cec8177135b6203328156bb7a7e73714d0 <span class="token number">192.168</span>.121.129:6384@16384 slave 964043841e4c5519d3cde93cae6b32ebe5ba1830 <span class="token number">0</span> <span class="token number">1652346429715</span> <span class="token number">1</span> connected
447dba4f4813f9178d67e62488a4c4c5aba87635 <span class="token number">192.168</span>.121.129:6383@16383 master - <span class="token number">0</span> <span class="token number">1652346428707</span> <span class="token number">3</span> connected <span class="token number">10923</span>-16383
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>1,2,3\u4E09\u53F0\u673A\u5668\u662Fmaster\uFF1B4\uFF0C5\uFF0C6\u4E09\u53F0\u673A\u5668\u662Fslave</strong></p><p><strong>1\u53F7\u4E3B\u673A\u63024\u53F7\uFF0C2\u53F7\u4E3B\u673A\u63025\u53F7\uFF0C3\u53F7\u63026\u53F7\uFF0C\u8FD9\u4E2A\u662F\u968F\u673A\u5206\u914D\u7684\uFF08\u4E3A\u4EC0\u4E48\u6211\u7684\u8FD9\u83AB\u5DE7\u6211\u4E5F\u4E0D\u77E5\u9053\uFF09</strong></p><h3 id="\u4E3B\u4ECE\u5BB9\u9519\u5207\u6362\u8FC1\u79FB\u6848\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u4E3B\u4ECE\u5BB9\u9519\u5207\u6362\u8FC1\u79FB\u6848\u4F8B" aria-hidden="true">#</a> \u4E3B\u4ECE\u5BB9\u9519\u5207\u6362\u8FC1\u79FB\u6848\u4F8B</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token builtin class-name">set</span> k1 <span class="token function">vi</span>
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> MOVED <span class="token number">12706</span> <span class="token number">192.168</span>.121.129:6383
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token builtin class-name">set</span> k1 v1
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> MOVED <span class="token number">12706</span> <span class="token number">192.168</span>.121.129:6383
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token builtin class-name">set</span> k2 v2
OK
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token builtin class-name">set</span> k3 v3
OK
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token builtin class-name">set</span> k4 v4
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> MOVED <span class="token number">8455</span> <span class="token number">192.168</span>.121.129:6382
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token builtin class-name">set</span> k5 v5
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> MOVED <span class="token number">12582</span> <span class="token number">192.168</span>.121.129:6383
<span class="token number">127.0</span>.0.1:638<span class="token operator"><span class="token file-descriptor important">1</span>&gt;</span> <span class="token builtin class-name">set</span> k6 v6
OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u5728\u96C6\u7FA4\u4E2D\u8FD9\u6837\u7528\u7684\u8BDD\u4F1A\u5931\u6548\uFF0C\u4E0D\u80FD\u7528\u5355\u673A\u7248\u8FDE\u63A5\u547D\u4EE4</strong></p><p><strong>\u9632\u6B62\u8DEF\u7531\u5931\u6548\u52A0\u53C2\u6570<code>-c</code>\u5E76\u65B0\u589E\u4E24\u4E2Akey</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>redis-cli -p 6381 -c
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u6F14\u793A</strong></p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code>root<span class="token variable">@ubuntu</span>:<span class="token operator">/</span><span class="token keyword">data</span><span class="token comment"># redis-cli -p 8381 -c</span>
Could <span class="token operator">not</span> <span class="token keyword">connect</span> <span class="token keyword">to</span> Redis at <span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span>:<span class="token number">8381</span>: Connection refused
<span class="token operator">not</span> connected<span class="token operator">&gt;</span> <span class="token keyword">exit</span>
root<span class="token variable">@ubuntu</span>:<span class="token operator">/</span><span class="token keyword">data</span><span class="token comment"># redis-cli -p 6381 -c</span>
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span>:<span class="token number">6381</span><span class="token operator">&gt;</span> flushall
OK
<span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span>:<span class="token number">6381</span><span class="token operator">&gt;</span> <span class="token keyword">set</span> k1 v1
<span class="token operator">-</span><span class="token operator">&gt;</span> Redirected <span class="token keyword">to</span> slot <span class="token punctuation">[</span><span class="token number">12706</span><span class="token punctuation">]</span> located at <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6383</span>
OK
<span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6383</span><span class="token operator">&gt;</span> <span class="token keyword">set</span> k2 v2
<span class="token operator">-</span><span class="token operator">&gt;</span> Redirected <span class="token keyword">to</span> slot <span class="token punctuation">[</span><span class="token number">449</span><span class="token punctuation">]</span> located at <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6381</span>
OK
<span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6381</span><span class="token operator">&gt;</span> <span class="token keyword">set</span> k3 v3
OK
<span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6381</span><span class="token operator">&gt;</span> <span class="token keyword">set</span> k4 v4
<span class="token operator">-</span><span class="token operator">&gt;</span> Redirected <span class="token keyword">to</span> slot <span class="token punctuation">[</span><span class="token number">8455</span><span class="token punctuation">]</span> located at <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6382</span>
OK
<span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6382</span><span class="token operator">&gt;</span> <span class="token keyword">set</span> k5 v5
<span class="token operator">-</span><span class="token operator">&gt;</span> Redirected <span class="token keyword">to</span> slot <span class="token punctuation">[</span><span class="token number">12582</span><span class="token punctuation">]</span> located at <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6383</span>
OK
<span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6383</span><span class="token operator">&gt;</span> <span class="token keyword">set</span> k6 v6
<span class="token operator">-</span><span class="token operator">&gt;</span> Redirected <span class="token keyword">to</span> slot <span class="token punctuation">[</span><span class="token number">325</span><span class="token punctuation">]</span> located at <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6381</span>
OK
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u53735\u53F7\u548C6\u53F7slave\u4E0D\u662F\u57281\u53F7\u673A\uFF0C\u8D8A\u754C\u4E86\uFF0C\u53EF\u4EE5\u7528<code>-c</code>\u96C6\u7FA4\u5316\u3002\u4F1A\u8DF3\u8F6C\u5230\u5BF9\u5E94\u7684redis</strong></p><h3 id="\u67E5\u770B\u96C6\u7FA4\u4FE1\u606Fcluster-check" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u96C6\u7FA4\u4FE1\u606Fcluster-check" aria-hidden="true">#</a> \u67E5\u770B\u96C6\u7FA4\u4FE1\u606Fcluster check</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>redis-cli --cluster check 192.168.121.129:6381
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u5C06\u7B2C\u4E00\u53F0\u673A\u5668\u505C\u6389</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker stop redis-node-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/12/LbkaB4OsQe12mv3.png" alt="image-20220512180313934"></p><p><strong>\u6B64\u65F61\u53F7\u5B95\u673A\u4E86\uFF0C\u6211\u4EEC\u4ECE\u4E8C\u53F7\u5F00\u59CB\u4F5C\u4E3A\u7A81\u7834</strong></p><p><strong>\u6211\u4EEC\u67E5\u770B\u96C6\u7FA4\u72B6\u6001</strong></p><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token number">127.0</span><span class="token number">.0</span><span class="token number">.1</span>:<span class="token number">6382</span><span class="token operator">&gt;</span> cluster nodes
<span class="token number">187</span>c17cec8177135b6203328156bb7a7e73714d0 <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6384</span><span class="token variable">@16384</span> master <span class="token operator">-</span> <span class="token number">0</span> <span class="token number">1652349890155</span> <span class="token number">7</span> connected <span class="token number">0</span><span class="token operator">-</span><span class="token number">5460</span>
<span class="token number">125</span>e88db573553be475175cd604eb9887506a121 <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6385</span><span class="token variable">@16385</span> slave cc788412e2b72c5a3ea3ba5cd9c80197a554382f <span class="token number">0</span> <span class="token number">1652349891169</span> <span class="token number">2</span> connected
cc788412e2b72c5a3ea3ba5cd9c80197a554382f <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6382</span><span class="token variable">@16382</span> myself<span class="token punctuation">,</span>master <span class="token operator">-</span> <span class="token number">0</span> <span class="token number">1652349890000</span> <span class="token number">2</span> connected <span class="token number">5461</span><span class="token operator">-</span><span class="token number">10922</span>
<span class="token number">702</span>a95b6eeb02a9d01d38152d599fdf57c70cf0c <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6386</span><span class="token variable">@16386</span> slave <span class="token number">447</span>dba4f4813f9178d67e62488a4c4c5aba87635 <span class="token number">0</span> <span class="token number">1652349892186</span> <span class="token number">3</span> connected
<span class="token number">447</span>dba4f4813f9178d67e62488a4c4c5aba87635 <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6383</span><span class="token variable">@16383</span> master <span class="token operator">-</span> <span class="token number">0</span> <span class="token number">1652349889000</span> <span class="token number">3</span> connected <span class="token number">10923</span><span class="token operator">-</span><span class="token number">16383</span>
<span class="token number">964043841</span>e4c5519d3cde93cae6b32ebe5ba1830 <span class="token number">192.168</span><span class="token number">.121</span><span class="token number">.129</span>:<span class="token number">6381</span><span class="token variable">@16381</span> master<span class="token punctuation">,</span>fail <span class="token operator">-</span> <span class="token number">1652349736906</span> <span class="token number">1652349733000</span> <span class="token number">1</span> disconnected
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u7ED3\u70B91\u8FD8\u6D3B\u7740,\u4F46\u662F\u663E\u793A\u5F97\u662Ffail\uFF0C\u6B64\u65F66384\u4E0A\u4F4D\uFF0C\u663E\u793Amaster\uFF0C\u5B8C\u6210\u4E86\u96C6\u7FA4\u8FC1\u79FB</strong></p><p><strong>\u6211\u4EEC\u5C066381\u6062\u590D\u8FC7\u6765\uFF0C\u518D\u770B\u770B\u96C6\u7FA4\u4FE1\u606F</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/mysql/mydata/mysql-slave/conf# docker start redis-node-1
redis-node-1
root@ubuntu:/mysql/mydata/mysql-slave/conf# docker ps |grep redis
3b80844ec9cd   redis:6.0.8             &quot;docker-entrypoint.s\u2026&quot;   About an hour ago   Up About an hour                                                                      redis-node-6
1ed04c474cbf   redis:6.0.8             &quot;docker-entrypoint.s\u2026&quot;   About an hour ago   Up About an hour                                                                      redis-node-5
fa6e8cac6376   redis:6.0.8             &quot;docker-entrypoint.s\u2026&quot;   About an hour ago   Up About an hour                                                                      redis-node-4
de3446725228   redis:6.0.8             &quot;docker-entrypoint.s\u2026&quot;   About an hour ago   Up About an hour                                                                      redis-node-3
c6cdf1fbc619   redis:6.0.8             &quot;docker-entrypoint.s\u2026&quot;   About an hour ago   Up About an hour                                                                      redis-node-2
b6924b43bca4   redis:6.0.8             &quot;docker-entrypoint.s\u2026&quot;   About an hour ago   Up 8 seconds                                                                          redis-node-1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6B64\u65F6\u5DF2\u7ECF\u6062\u590D\u8FC7\u6765\u4E86\uFF0C\u6211\u4EEC\u67E5\u770B\u8282\u70B9\u72B6\u6001</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/data# redis-cli -p 6381 -c
127.0.0.1:6381&gt; cluster nodes
125e88db573553be475175cd604eb9887506a121 192.168.121.129:6385@16385 slave cc788412e2b72c5a3ea3ba5cd9c80197a554382f 0 1652350295591 2 connected
187c17cec8177135b6203328156bb7a7e73714d0 192.168.121.129:6384@16384 master - 0 1652350294577 7 connected 0-5460
964043841e4c5519d3cde93cae6b32ebe5ba1830 192.168.121.129:6381@16381 myself,slave 187c17cec8177135b6203328156bb7a7e73714d0 0 1652350293000 7 connected
cc788412e2b72c5a3ea3ba5cd9c80197a554382f 192.168.121.129:6382@16382 master - 0 1652350293000 2 connected 5461-10922
447dba4f4813f9178d67e62488a4c4c5aba87635 192.168.121.129:6383@16383 master - 0 1652350292548 3 connected 10923-16383
702a95b6eeb02a9d01d38152d599fdf57c70cf0c 192.168.121.129:6386@16386 slave 447dba4f4813f9178d67e62488a4c4c5aba87635 0 1652350296602 3 connected
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u53EF\u89C11\u53F7\u673A\u5668\u867D\u7136\u6D3B\u8FC7\u6765\u4E86\uFF0C\u4F46\u662F\u6210\u4E3A\u4ECE\u7ED3\u70B9\uFF0C\u5974\u96B6\u7ED3\u70B9\u4E86</strong></p><p><strong>\u5982\u679C\u6211\u4EEC\u518D\u628A4\u53F7\u673A\u505C\u6389\uFF0C\u7ED91\u53F7\u673A\u5668\u4E0A\u4F4D\u5F97\u673A\u4F1A\uFF0C\u6B64\u65F66381\u5F971\u597D\u673A\u5668\u4F9D\u65E7\u80FD\u56DE\u5230\u4E3B\u7ED3\u70B9</strong></p>`,42),r=[l];function c(p,i){return n(),e("div",null,r)}const d=s(t,[["render",c],["__file","21.html.vue"]]);export{d as default};
