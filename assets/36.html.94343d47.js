import{_ as e,o as n,c as a,e as s}from"./app.add9352d.js";const t={},i=s(`<h1 id="\u81EA\u5B9A\u4E49\u7F51\u7EDC\u683C\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u7F51\u7EDC\u683C\u5F0F" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49\u7F51\u7EDC\u683C\u5F0F</h1><p>[toc]</p><h2 id="docker-link" tabindex="-1"><a class="header-anchor" href="#docker-link" aria-hidden="true">#</a> docker link</h2><blockquote><p>\u8FD9\u4E2A\u662F\u4E00\u4E2A\u8FC7\u65F6\u7684\u4E1C\u897F\u4E86</p></blockquote><h2 id="before" tabindex="-1"><a class="header-anchor" href="#before" aria-hidden="true">#</a> before</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 8081:8080   --name tomcat81 billygoo/tomcat8-jdk8
docker run -d -p 8082:8080   --name tomcat82 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u4E0A\u8FF0\u6210\u529F\u542F\u52A8\u5E76\u7528docker exec\u8FDB\u5165\u5404\u81EA\u5BB9\u5668\u5B9E\u4F8B\u5185\u90E8</strong></p><h2 id="\u5728tomcat82\u4E2Dping-tomcat81" tabindex="-1"><a class="header-anchor" href="#\u5728tomcat82\u4E2Dping-tomcat81" aria-hidden="true">#</a> \u5728tomcat82\u4E2Dping tomcat81</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/home/smile<span class="token comment"># docker exec -it tomcat82 bash</span>
root@518bce78283a:/usr/local/tomcat<span class="token comment"># ip addr</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">65536</span> qdisc noqueue state UNKNOWN group default qlen <span class="token number">1000</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet <span class="token number">127.0</span>.0.1/8 scope <span class="token function">host</span> lo
       valid_lft forever preferred_lft forever
<span class="token number">26</span>: eth0@if27: <span class="token operator">&lt;</span>BROADCAST,MULTICAST,UP,LOWER_UP<span class="token operator">&gt;</span> mtu <span class="token number">1500</span> qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:06 brd ff:ff:ff:ff:ff:ff link-netnsid <span class="token number">0</span>
    inet <span class="token number">172.17</span>.0.6/16 brd <span class="token number">172.17</span>.255.255 scope global eth0
       valid_lft forever preferred_lft forever
root@518bce78283a:/usr/local/tomcat<span class="token comment"># ping 172.17.0.5</span>
PING <span class="token number">172.17</span>.0.5 <span class="token punctuation">(</span><span class="token number">172.17</span>.0.5<span class="token punctuation">)</span> <span class="token number">56</span><span class="token punctuation">(</span><span class="token number">84</span><span class="token punctuation">)</span> bytes of data.
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.5: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">1</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">2.56</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.5: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">2</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.110</span> ms
<span class="token number">64</span> bytes from <span class="token number">172.17</span>.0.5: <span class="token assign-left variable">icmp_seq</span><span class="token operator">=</span><span class="token number">3</span> <span class="token assign-left variable">ttl</span><span class="token operator">=</span><span class="token number">64</span> <span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token number">0.106</span> ms
^C
--- <span class="token number">172.17</span>.0.5 <span class="token function">ping</span> statistics ---
<span class="token number">3</span> packets transmitted, <span class="token number">3</span> received, <span class="token number">0</span>% packet loss, <span class="token function">time</span> 2018ms
rtt min/avg/max/mdev <span class="token operator">=</span> <span class="token number">0.106</span>/0.927/2.565/1.158 ms

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u80FDping\u901A</strong></p><p><strong>\u540C\u6837\u53CD\u4E5F\u80FD\u901A</strong></p><h2 id="\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898" aria-hidden="true">#</a> \u95EE\u9898</h2><p><strong>\u5728docker\u4E2Dip\u662F\u53D8\u5316\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u9009\u62E9\u7528\u5BB9\u5668\u540D\u79F0\u53BBping\u901A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@98ec1a7378a7:/usr/local/tomcat# ping tomcat82
ping: tomcat82: Name or service not known
root@98ec1a7378a7:/usr/local/tomcat# ping tomcat81
ping: tomcat81: Name or service not known
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6216\u8005\u53EF\u4EE5\u9009\u62E9\u6DFB\u52A0hosts\u6620\u5C04\uFF0C\u4F46\u662F\u6CE8\u610F\uFF0C\u6620\u5C04\u7684\u65F6\u5019ip\u4E5F\u662F\u5199\u6B7B\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5FC5\u987B\u8981\u6309\u7167\u670D\u52A1\u540D\u53BBping</strong></p><h2 id="after\u81EA\u5B9A\u4E49\u7F51\u7EDC\u5F15\u5165" tabindex="-1"><a class="header-anchor" href="#after\u81EA\u5B9A\u4E49\u7F51\u7EDC\u5F15\u5165" aria-hidden="true">#</a> after\u81EA\u5B9A\u4E49\u7F51\u7EDC\u5F15\u5165</h2><p><strong>\u81EA\u5B9A\u4E49\u6865\u63A5\u7F51\u7EDC,\u81EA\u5B9A\u4E49\u7F51\u7EDC\u9ED8\u8BA4\u4F7F\u7528\u7684\u662F\u6865\u63A5\u7F51\u7EDCbridge</strong></p><h2 id="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#\u65B0\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC" aria-hidden="true">#</a> \u65B0\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker network create xiongxinwei@mail_network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u67E5\u770B\u7F51\u7EDC\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/text# docker network ls
NETWORK ID     NAME                       DRIVER    SCOPE
ec8278ac6963   bridge                     bridge    local
c68651290784   host                       host      local
5e7ee4274242   none                       null      local
6c8b594b19ad   xiongxinwei@mail_network   bridge    local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6211\u4EEC\u9700\u8981\u628Atomcat81\u548Ctomcat81\u7EDF\u7EDF\u52A0\u5165\u5230\u81EA\u5B9A\u4E49\u7F51\u7EDC\u6765\u4FDD\u8BC1\u670D\u52A1\u540D\u4E92\u76F8\u901A\u4FE1</strong></p><h2 id="\u65B0\u5EFA\u5BB9\u5668\u52A0\u5165\u81EA\u5B9A\u4E49\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#\u65B0\u5EFA\u5BB9\u5668\u52A0\u5165\u81EA\u5B9A\u4E49\u7F51\u7EDC" aria-hidden="true">#</a> \u65B0\u5EFA\u5BB9\u5668\u52A0\u5165\u81EA\u5B9A\u4E49\u7F51\u7EDC</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 8081:8080 --network xiongxinwei@mail_network  --name tomcat81 billygoo/tomcat8-jdk8
docker run -d -p 8082:8080 --network xiongxinwei@mail_network  --name tomcat82 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/15/s29kbCmWy4jeinp.png" alt="image-20220515124337089"></p><h2 id="\u5DF2\u7ECF\u5B58\u5728\u7684\u5BB9\u5668\u4FEE\u6539\u4E3A\u81EA\u5B9A\u4E49\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#\u5DF2\u7ECF\u5B58\u5728\u7684\u5BB9\u5668\u4FEE\u6539\u4E3A\u81EA\u5B9A\u4E49\u7F51\u7EDC" aria-hidden="true">#</a> \u5DF2\u7ECF\u5B58\u5728\u7684\u5BB9\u5668\u4FEE\u6539\u4E3A\u81EA\u5B9A\u4E49\u7F51\u7EDC</h2><p>\u521B\u5EFA\u5BB9\u5668\u65F6\u4E0D\u6307\u5B9A\u7F51\u7EDC\u65F6\u9ED8\u8BA4\u662F\u6865\u63A5\u7F51\u7EDC\uFF0C\u540E\u7EED\u66F4\u6539\u5BB9\u5668\u7684\u7F51\u7EDC\u6709\u4E24\u79CD\u65B9\u5F0F\uFF1A</p><p><strong>\u7B2C\u4E00\u79CD\uFF1A\u505C\u6B62\u5E76\u5220\u6389\u5BB9\u5668\uFF0C\u91CD\u65B0\u521B\u5EFA\u5BB9\u5668\u6307\u5B9A\u7F51\u7EDC\u8FDE\u63A5\uFF08\u4E0D\u5EFA\u8BAE\uFF09</strong></p><p><strong>\u7B2C\u4E8C\u79CD\uFF1A\u76F4\u63A5\u4FEE\u6539\u5BB9\u5668\u7684\u7F51\u7EDC</strong></p><ol><li>\u521B\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker network create \u7F51\u7EDC\u540D\u79F0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>\u89E3\u9664\u5BB9\u5668\u6240\u7ED1\u5B9A\u7684\u73B0\u6709\u7F51\u7EDC</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker network disconnect \u7F51\u7EDC\u540D\u79F0 \u5BB9\u5668\u540D\u79F0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3"><li>\u5BB9\u5668\u91CD\u65B0\u6307\u5B9A\u7F51\u7EDC\u8FDE\u63A5</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker network connect \u7F51\u7EDC\u540D\u79F0 \u5BB9\u5668\u540D\u79F0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4"><li>\u91CD\u542F\u5BB9\u5668</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker restart \u5BB9\u5668\u540D\u79F0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5"><li>\u67E5\u770B\u5BB9\u5668\u8BE6\u7EC6\u4FE1\u606F</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker inspect \u5BB9\u5668\u540D\u79F0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker-\u4E0B\u521B\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC-\u5E76\u5728\u8FD0\u884C\u5BB9\u5668\u65F6\u7ED1\u5B9A\u7F51\u7EDC\u548Cip" tabindex="-1"><a class="header-anchor" href="#docker-\u4E0B\u521B\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC-\u5E76\u5728\u8FD0\u884C\u5BB9\u5668\u65F6\u7ED1\u5B9A\u7F51\u7EDC\u548Cip" aria-hidden="true">#</a> docker \u4E0B\u521B\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC\uFF0C\u5E76\u5728\u8FD0\u884C\u5BB9\u5668\u65F6\u7ED1\u5B9A\u7F51\u7EDC\u548Cip</h2><p>Docker\u5B89\u88C5\u540E\uFF0C\u9ED8\u8BA4\u4F1A\u521B\u5EFA\u4E09\u79CD\u7F51\u7EDC\u7C7B\u578B\uFF0Cbridge\u3001host\u548Cnone\uFF0C\u53EF\u901A\u8FC7\u5982\u4E0B\u547D\u4EE4\u67E5\u770B</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u3000\u3000docker network ls 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://sm.nsddd.top//typora/720144-20210209104212204-1769428363.png?mail:3293172751@qq.com" alt="img"></p><h3 id="bridge-\u7F51\u7EDC\u6865\u63A5" tabindex="-1"><a class="header-anchor" href="#bridge-\u7F51\u7EDC\u6865\u63A5" aria-hidden="true">#</a> bridge:\u7F51\u7EDC\u6865\u63A5</h3><p>\u9ED8\u8BA4\u60C5\u51B5\u4E0B\u542F\u52A8\u3001\u521B\u5EFA\u5BB9\u5668\u90FD\u662F\u7528\u8BE5\u6A21\u5F0F\uFF0C\u6240\u4EE5\u6BCF\u6B21Docker\u5BB9\u5668\u91CD\u542F\u65F6\u4F1A\u6309\u7167\u987A\u5E8F\u83B7\u53D6\u5BF9\u5E94ip\u5730\u5740\uFF0C\u8FD9\u5C31\u5BFC\u81F4\u5BB9\u5668\u6BCF\u6B21\u91CD\u542F\uFF0Cip\u90FD\u53D1\u751F\u53D8\u5316</p><h3 id="none-\u65E0\u6307\u5B9A\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#none-\u65E0\u6307\u5B9A\u7F51\u7EDC" aria-hidden="true">#</a> none\uFF1A\u65E0\u6307\u5B9A\u7F51\u7EDC</h3><p>\u542F\u52A8\u5BB9\u5668\u65F6\uFF0C\u53EF\u4EE5\u901A\u8FC7<code>\u2013network=none</code>\uFF0CDocker\u5BB9\u5668\u4E0D\u4F1A\u5206\u914D\u5C40\u57DF\u7F51ip</p><h3 id="host-\u4E3B\u673A\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#host-\u4E3B\u673A\u7F51\u7EDC" aria-hidden="true">#</a> host\uFF1A\u4E3B\u673A\u7F51\u7EDC</h3><p>Docker\u5BB9\u5668\u7684\u7F51\u7EDC\u4F1A\u9644\u5C5E\u5728\u4E3B\u673A\u4E0A\uFF0C\u4E24\u8005\u662F\u4E92\u901A\u7684\u3002</p><h3 id="\u521B\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC\u548C\u56FA\u5B9Aip" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC\u548C\u56FA\u5B9Aip" aria-hidden="true">#</a> \u521B\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC\u548C\u56FA\u5B9Aip</h3><p>\u521B\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC\u7C7B\u578B\uFF0C\u5E76\u4E14\u6307\u5B9A\u7F51\u6BB5</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> network create <span class="token parameter variable">--driver</span><span class="token operator">=</span>bridge <span class="token parameter variable">--gateway</span><span class="token operator">=</span><span class="token number">192.168</span>.0.1 <span class="token parameter variable">--subnet</span><span class="token operator">=</span><span class="token number">192.168</span>.0.0/16 mynetwork
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li><code>--driver</code>\uFF1A\u9A71\u52A8\u7A0B\u5E8F\u7C7B\u578B</li><li><code>--subnet</code>\uFF1A\u4EE3\u8868\u7F51\u6BB5\u7684CIDR\u683C\u5F0F\u7684\u5B50\u7F51</li><li><code>--gateway</code>\uFF1A\u4E3B\u5B50\u7F51\u7684IPV4\u548CIPV6\u7684\u7F51\u5173</li><li><code>mynetwork</code>\uFF1A\u662F\u81EA\u5B9A\u4E49\u7F51\u7EDC\u540D\u79F0</li></ul><p><strong>\u901A\u8FC7docker network ls\u53EF\u4EE5\u67E5\u770B\u5230\u7F51\u7EDC\u7C7B\u578B\u4E2D\u591A\u4E86\u4E00\u4E2Amynetwork</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> network <span class="token function">ls</span>
<span class="token function">docker</span> network inspect mynetwork
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4F7F\u7528docker network inspect mynetwork \u67E5\u770B\u7F51\u7EDC\u4FE1\u606F</p><p><img src="https://sm.nsddd.top//typora/720144-20210209105133125-1384179463.png?mail:3293172751@qq.com" alt="img"></p><p>\u4F7F\u7528\u65B0\u7684\u7F51\u7EDC\u7C7B\u578B\u521B\u5EFA\u5E76\u542F\u52A8\u5BB9\u5668</p><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code>docker run -d --name=consul -p 8500:8500 \\
--net=mynetwork --ip=192.168.0.2 \\
-e CONSUL_BIND_INTERFACE=eth0 \\
--restart=always consul agent \\
--server=true --bootstrap-expect=1 --client=0.0.0.0 -ui
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u81EA\u5B9A\u4E49\u7F51\u7EDC\u547D\u4EE4\u548C\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u7F51\u7EDC\u547D\u4EE4\u548C\u4ECB\u7ECD" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49\u7F51\u7EDC\u547D\u4EE4\u548C\u4ECB\u7ECD</h2><table><thead><tr><th style="text-align:left;">\u81EA\u5B9A\u4E49\u7F51\u7EDC\u547D\u4EE4</th><th style="text-align:left;">\u8BF4\u660E</th></tr></thead><tbody><tr><td style="text-align:left;">docker network create</td><td style="text-align:left;">\u521B\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC</td></tr><tr><td style="text-align:left;">docker network inspect</td><td style="text-align:left;">\u67E5\u770B\u81EA\u5B9A\u4E49\u7F51\u7EDC\u8BE6\u60C5</td></tr><tr><td style="text-align:left;">docker network ls</td><td style="text-align:left;">\u67E5\u770B\u7F51\u7EDC\u5217\u8868</td></tr><tr><td style="text-align:left;">docker network connect</td><td style="text-align:left;">\u4E0D\u540C\u7684\u81EA\u5B9A\u4E49\u7F51\u7EDC\u4E92\u76F8\u8FDE\u63A5</td></tr><tr><td style="text-align:left;">docker network rm</td><td style="text-align:left;">\u5220\u9664\u81EA\u5B9A\u4E49\u7F51\u7EDC</td></tr></tbody></table><p><strong>\u6211\u4EEC\u5C1D\u8BD5\u67E5\u770B\u4E00\u4E0B\u81EA\u5B9A\u4E49\u7F51\u7EDC\u8BE6\u60C5</strong></p><p><img src="https://sm.nsddd.top//typora/image-20220916205821816.png?mail:3293172751@qq.com" alt="image-20220916205821816"></p><h2 id="\u67E5\u770Btomcat81\u7684ip" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770Btomcat81\u7684ip" aria-hidden="true">#</a> \u67E5\u770Btomcat81\u7684ip</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/text# docker exec -it tomcat81 bash
root@83cabf17ff0b:/usr/local/tomcat# ip addr
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
33: eth0@if34: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:12:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.18.0.2/16 brd 172.18.255.255 scope global eth0
       valid_lft forever preferred_lft forever
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u767B\u9646tomcat82\u5E76ping-tomcat81" tabindex="-1"><a class="header-anchor" href="#\u767B\u9646tomcat82\u5E76ping-tomcat81" aria-hidden="true">#</a> \u767B\u9646tomcat82\u5E76ping tomcat81</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/home/smile# docker exec -it tomcat82 bash
root@394fa3fe7ecc:/usr/local/tomcat# ip addr
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
35: eth0@if36: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:12:00:03 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.18.0.3/16 brd 172.18.255.255 scope global eth0
       valid_lft forever preferred_lft forever
root@394fa3fe7ecc:/usr/local/tomcat# ping tomcat81
PING tomcat81 (172.18.0.2) 56(84) bytes of data.
64 bytes from 172.18.0.2 (172.18.0.2): icmp_seq=1 ttl=64 time=1.21 ms
64 bytes from 172.18.0.2 (172.18.0.2): icmp_seq=2 ttl=64 time=0.110 ms
^C
--- tomcat81 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 0.110/0.660/1.211/0.551 ms

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u53EF\u4EE5ping\u901A\u4E86</strong></p><p><strong>\u6240\u4EE5\u6211\u4EEC\u505A\u591A\u4E2A\u5BB9\u5668\u7684\u89C4\u5212\uFF0C\u4E00\u5B9A\u8981\u8D70\u5BB9\u5668\u540D</strong></p><h2 id="\u7ED3\u8BBA" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u8BBA" aria-hidden="true">#</a> \u7ED3\u8BBA</h2><ul><li><p><strong>\u81EA\u5B9A\u4E49\u7F51\u7EDC\u672C\u8EAB\u5C31\u7EF4\u62A4\u597D\u4E86\u4E3B\u673A\u540D\u548Cip\u7684\u5BF9\u5E94\u5173\u7CFB\uFF08ip\u548C\u57DF\u540D\u90FD\u80FD\u901A\uFF09</strong></p></li><li><p><strong>\u81EA\u5B9A\u4E49\u7F51\u7EDC\u672C\u8EAB\u5C31\u7EF4\u62A4\u597D\u4E86\u4E3B\u673A\u540D\u548Cip\u7684\u5BF9\u5E94\u5173\u7CFB\uFF08ip\u548C\u57DF\u540D\u90FD\u80FD\u901A\uFF09</strong></p></li><li><p><strong>\u81EA\u5B9A\u4E49\u7F51\u7EDC\u672C\u8EAB\u5C31\u7EF4\u62A4\u597D\u4E86\u4E3B\u673A\u540D\u548Cip\u7684\u5BF9\u5E94\u5173\u7CFB\uFF08ip\u548C\u57DF\u540D\u90FD\u80FD\u901A\uFF09</strong></p></li></ul><p><strong>\u81EA\u5B9A\u4E49\u7F51\u7EDC\u53EF\u4EE5\u5728\u5BB9\u5668\u4E4B\u95F4\u63D0\u4F9B\u81EA\u52A8\u7684DNS\u89E3\u6790</strong></p>`,72),r=[i];function l(d,o){return n(),a("div",null,r)}const p=e(t,[["render",l],["__file","36.html.vue"]]);export{p as default};
