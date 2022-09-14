<template><div><h1 id="自定义网络格式" tabindex="-1"><a class="header-anchor" href="#自定义网络格式" aria-hidden="true">#</a> 自定义网络格式</h1>
<p>[toc]</p>
<h3 id="docker-link" tabindex="-1"><a class="header-anchor" href="#docker-link" aria-hidden="true">#</a> docker link</h3>
<blockquote>
<p>这个是一个过时的东西了</p>
</blockquote>
<h3 id="before" tabindex="-1"><a class="header-anchor" href="#before" aria-hidden="true">#</a> before</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d -p 8081:8080   --name tomcat81 billygoo/tomcat8-jdk8
docker run -d -p 8082:8080   --name tomcat82 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>上述成功启动并用docker exec进入各自容器实例内部</strong></p>
<h3 id="在tomcat82中ping-tomcat81" tabindex="-1"><a class="header-anchor" href="#在tomcat82中ping-tomcat81" aria-hidden="true">#</a> 在tomcat82中ping tomcat81</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/home/smile# docker exec -it tomcat82 bash
root@518bce78283a:/usr/local/tomcat# ip addr
1: lo: &lt;LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
26: eth0@if27: &lt;BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>能ping通</strong></p>
<p><strong>同样反也能通</strong></p>
<h3 id="问题" tabindex="-1"><a class="header-anchor" href="#问题" aria-hidden="true">#</a> 问题</h3>
<p><strong>在docker中ip是变化的，所以我们选择用容器名称去ping通</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@98ec1a7378a7:/usr/local/tomcat# ping tomcat82
ping: tomcat82: Name or service not known
root@98ec1a7378a7:/usr/local/tomcat# ping tomcat81
ping: tomcat81: Name or service not known
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>或者可以选择添加hosts映射，但是注意，映射的时候ip也是写死的，所以我们必须要按照服务名去ping</strong></p>
<h3 id="after自定义网络引入" tabindex="-1"><a class="header-anchor" href="#after自定义网络引入" aria-hidden="true">#</a> after自定义网络引入</h3>
<p><strong>自定义桥接网络,自定义网络默认使用的是桥接网络bridge</strong></p>
<h3 id="新建自定义网络" tabindex="-1"><a class="header-anchor" href="#新建自定义网络" aria-hidden="true">#</a> 新建自定义网络</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker network create xiongxinwei@mail_network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>查看网络：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/text# docker network ls
NETWORK ID     NAME                       DRIVER    SCOPE
ec8278ac6963   bridge                     bridge    local
c68651290784   host                       host      local
5e7ee4274242   none                       null      local
6c8b594b19ad   xiongxinwei@mail_network   bridge    local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们需要把tomcat81和tomcat81统统加入到自定义网络来保证服务名互相通信</strong></p>
<h3 id="新建容器加入自定义网络" tabindex="-1"><a class="header-anchor" href="#新建容器加入自定义网络" aria-hidden="true">#</a> 新建容器加入自定义网络</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d -p 8081:8080 --network xiongxinwei@mail_network  --name tomcat81 billygoo/tomcat8-jdk8
docker run -d -p 8082:8080 --network xiongxinwei@mail_network  --name tomcat82 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/15/s29kbCmWy4jeinp.png" alt="image-20220515124337089"></p>
<h3 id="查看tomcat81的ip" tabindex="-1"><a class="header-anchor" href="#查看tomcat81的ip" aria-hidden="true">#</a> 查看tomcat81的ip</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/text# docker exec -it tomcat81 bash
root@83cabf17ff0b:/usr/local/tomcat# ip addr
1: lo: &lt;LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
33: eth0@if34: &lt;BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 02:42:ac:12:00:02 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet 172.18.0.2/16 brd 172.18.255.255 scope global eth0
       valid_lft forever preferred_lft forever
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="登陆tomcat82并ping-tomcat81" tabindex="-1"><a class="header-anchor" href="#登陆tomcat82并ping-tomcat81" aria-hidden="true">#</a> 登陆tomcat82并ping tomcat81</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@ubuntu:/home/smile# docker exec -it tomcat82 bash
root@394fa3fe7ecc:/usr/local/tomcat# ip addr
1: lo: &lt;LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
35: eth0@if36: &lt;BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
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

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>可以ping通了</strong></p>
<p>==<strong>所以我们做多个容器的规划，一定要走容器名</strong>==</p>
<h3 id="结论" tabindex="-1"><a class="header-anchor" href="#结论" aria-hidden="true">#</a> 结论</h3>
<ul>
<li>
<p><strong>自定义网络本身就维护好了主机名和ip的对应关系（ip和域名都能通）</strong></p>
</li>
<li>
<p><strong>自定义网络本身就维护好了主机名和ip的对应关系（ip和域名都能通）</strong></p>
</li>
<li>
<p><strong>自定义网络本身就维护好了主机名和ip的对应关系（ip和域名都能通）</strong></p>
</li>
</ul>
<p><strong>自定义网络可以在容器之间提供自动的DNS解析</strong></p>
</div></template>


