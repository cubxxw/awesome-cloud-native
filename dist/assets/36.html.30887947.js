import{_ as e,o as i,c as n,e as t}from"./app.942c9a5d.js";const a={},r=t(`<h1 id="\u81EA\u5B9A\u4E49\u7F51\u7EDC\u683C\u5F0F" tabindex="-1"><a class="header-anchor" href="#\u81EA\u5B9A\u4E49\u7F51\u7EDC\u683C\u5F0F" aria-hidden="true">#</a> \u81EA\u5B9A\u4E49\u7F51\u7EDC\u683C\u5F0F</h1><p>[toc]</p><h3 id="docker-link" tabindex="-1"><a class="header-anchor" href="#docker-link" aria-hidden="true">#</a> docker link</h3><blockquote><p>\u8FD9\u4E2A\u662F\u4E00\u4E2A\u8FC7\u65F6\u7684\u4E1C\u897F\u4E86</p></blockquote><h3 id="before" tabindex="-1"><a class="header-anchor" href="#before" aria-hidden="true">#</a> before</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 8081:8080   --name tomcat81 billygoo/tomcat8-jdk8
docker run -d -p 8082:8080   --name tomcat82 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u4E0A\u8FF0\u6210\u529F\u542F\u52A8\u5E76\u7528docker exec\u8FDB\u5165\u5404\u81EA\u5BB9\u5668\u5B9E\u4F8B\u5185\u90E8</strong></p><h3 id="\u5728tomcat82\u4E2Dping-tomcat81" tabindex="-1"><a class="header-anchor" href="#\u5728tomcat82\u4E2Dping-tomcat81" aria-hidden="true">#</a> \u5728tomcat82\u4E2Dping tomcat81</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/home/smile# docker exec -it tomcat82 bash
root@518bce78283a:/usr/local/tomcat# ip addr
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
26: eth0@if27: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:11:00:06 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.17.0.6/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
root@518bce78283a:/usr/local/tomcat# ping 172.17.0.5
PING 172.17.0.5 (172.17.0.5) 56(84) bytes of data.
64 bytes from 172.17.0.5: icmp_seq=1 ttl=64 time=2.56 ms
64 bytes from 172.17.0.5: icmp_seq=2 ttl=64 time=0.110 ms
64 bytes from 172.17.0.5: icmp_seq=3 ttl=64 time=0.106 ms
^C
--- 172.17.0.5 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2018ms
rtt min/avg/max/mdev = 0.106/0.927/2.565/1.158 ms

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u80FDping\u901A</strong></p><p><strong>\u540C\u6837\u53CD\u4E5F\u80FD\u901A</strong></p><h3 id="\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898" aria-hidden="true">#</a> \u95EE\u9898</h3><p><strong>\u5728docker\u4E2Dip\u662F\u53D8\u5316\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u9009\u62E9\u7528\u5BB9\u5668\u540D\u79F0\u53BBping\u901A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@98ec1a7378a7:/usr/local/tomcat# ping tomcat82
ping: tomcat82: Name or service not known
root@98ec1a7378a7:/usr/local/tomcat# ping tomcat81
ping: tomcat81: Name or service not known
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6216\u8005\u53EF\u4EE5\u9009\u62E9\u6DFB\u52A0hosts\u6620\u5C04\uFF0C\u4F46\u662F\u6CE8\u610F\uFF0C\u6620\u5C04\u7684\u65F6\u5019ip\u4E5F\u662F\u5199\u6B7B\u7684\uFF0C\u6240\u4EE5\u6211\u4EEC\u5FC5\u987B\u8981\u6309\u7167\u670D\u52A1\u540D\u53BBping</strong></p><h3 id="after\u81EA\u5B9A\u4E49\u7F51\u7EDC\u5F15\u5165" tabindex="-1"><a class="header-anchor" href="#after\u81EA\u5B9A\u4E49\u7F51\u7EDC\u5F15\u5165" aria-hidden="true">#</a> after\u81EA\u5B9A\u4E49\u7F51\u7EDC\u5F15\u5165</h3><p><strong>\u81EA\u5B9A\u4E49\u6865\u63A5\u7F51\u7EDC,\u81EA\u5B9A\u4E49\u7F51\u7EDC\u9ED8\u8BA4\u4F7F\u7528\u7684\u662F\u6865\u63A5\u7F51\u7EDCbridge</strong></p><h3 id="\u65B0\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#\u65B0\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC" aria-hidden="true">#</a> \u65B0\u5EFA\u81EA\u5B9A\u4E49\u7F51\u7EDC</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker network create xiongxinwei@mail_network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u67E5\u770B\u7F51\u7EDC\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/text# docker network ls
NETWORK ID     NAME                       DRIVER    SCOPE
ec8278ac6963   bridge                     bridge    local
c68651290784   host                       host      local
5e7ee4274242   none                       null      local
6c8b594b19ad   xiongxinwei@mail_network   bridge    local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6211\u4EEC\u9700\u8981\u628Atomcat81\u548Ctomcat81\u7EDF\u7EDF\u52A0\u5165\u5230\u81EA\u5B9A\u4E49\u7F51\u7EDC\u6765\u4FDD\u8BC1\u670D\u52A1\u540D\u4E92\u76F8\u901A\u4FE1</strong></p><h3 id="\u65B0\u5EFA\u5BB9\u5668\u52A0\u5165\u81EA\u5B9A\u4E49\u7F51\u7EDC" tabindex="-1"><a class="header-anchor" href="#\u65B0\u5EFA\u5BB9\u5668\u52A0\u5165\u81EA\u5B9A\u4E49\u7F51\u7EDC" aria-hidden="true">#</a> \u65B0\u5EFA\u5BB9\u5668\u52A0\u5165\u81EA\u5B9A\u4E49\u7F51\u7EDC</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 8081:8080 --network xiongxinwei@mail_network  --name tomcat81 billygoo/tomcat8-jdk8
docker run -d -p 8082:8080 --network xiongxinwei@mail_network  --name tomcat82 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/15/s29kbCmWy4jeinp.png" alt="image-20220515124337089"></p><h3 id="\u67E5\u770Btomcat81\u7684ip" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770Btomcat81\u7684ip" aria-hidden="true">#</a> \u67E5\u770Btomcat81\u7684ip</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/text# docker exec -it tomcat81 bash
root@83cabf17ff0b:/usr/local/tomcat# ip addr
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
33: eth0@if34: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:12:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.18.0.2/16 brd 172.18.255.255 scope global eth0
       valid_lft forever preferred_lft forever
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u767B\u9646tomcat82\u5E76ping-tomcat81" tabindex="-1"><a class="header-anchor" href="#\u767B\u9646tomcat82\u5E76ping-tomcat81" aria-hidden="true">#</a> \u767B\u9646tomcat82\u5E76ping tomcat81</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/home/smile# docker exec -it tomcat82 bash
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u53EF\u4EE5ping\u901A\u4E86</strong></p><p>==<strong>\u6240\u4EE5\u6211\u4EEC\u505A\u591A\u4E2A\u5BB9\u5668\u7684\u89C4\u5212\uFF0C\u4E00\u5B9A\u8981\u8D70\u5BB9\u5668\u540D</strong>==</p><h3 id="\u7ED3\u8BBA" tabindex="-1"><a class="header-anchor" href="#\u7ED3\u8BBA" aria-hidden="true">#</a> \u7ED3\u8BBA</h3><ul><li><p><strong>\u81EA\u5B9A\u4E49\u7F51\u7EDC\u672C\u8EAB\u5C31\u7EF4\u62A4\u597D\u4E86\u4E3B\u673A\u540D\u548Cip\u7684\u5BF9\u5E94\u5173\u7CFB\uFF08ip\u548C\u57DF\u540D\u90FD\u80FD\u901A\uFF09</strong></p></li><li><p><strong>\u81EA\u5B9A\u4E49\u7F51\u7EDC\u672C\u8EAB\u5C31\u7EF4\u62A4\u597D\u4E86\u4E3B\u673A\u540D\u548Cip\u7684\u5BF9\u5E94\u5173\u7CFB\uFF08ip\u548C\u57DF\u540D\u90FD\u80FD\u901A\uFF09</strong></p></li><li><p><strong>\u81EA\u5B9A\u4E49\u7F51\u7EDC\u672C\u8EAB\u5C31\u7EF4\u62A4\u597D\u4E86\u4E3B\u673A\u540D\u548Cip\u7684\u5BF9\u5E94\u5173\u7CFB\uFF08ip\u548C\u57DF\u540D\u90FD\u80FD\u901A\uFF09</strong></p></li></ul><p><strong>\u81EA\u5B9A\u4E49\u7F51\u7EDC\u53EF\u4EE5\u5728\u5BB9\u5668\u4E4B\u95F4\u63D0\u4F9B\u81EA\u52A8\u7684DNS\u89E3\u6790</strong></p>`,34),d=[r];function s(l,o){return i(),n("div",null,d)}const m=e(a,[["render",s],["__file","36.html.vue"]]);export{m as default};
