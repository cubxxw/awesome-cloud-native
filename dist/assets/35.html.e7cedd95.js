import{_ as e,o as n,c as i,e as t}from"./app.942c9a5d.js";const r={},l=t(`<h1 id="container\u662F\u4EC0\u4E48" tabindex="-1"><a class="header-anchor" href="#container\u662F\u4EC0\u4E48" aria-hidden="true">#</a> container\u662F\u4EC0\u4E48</h1><p>[toc]</p><h3 id="container\u7F51\u7EDC\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#container\u7F51\u7EDC\u6A21\u5F0F" aria-hidden="true">#</a> container\u2F79\u7EDC\u6A21\u5F0F</h3><p><strong>\u65B0\u5EFA\u7684\u5BB9\u5668\u548C\u5DF2\u7ECF\u5B58\u5728\u7684\u4E00\u4E2A\u5BB9\u5668\u5171\u4EAB\u4E00\u4E2A\u7F51\u7EDCip\u914D\u7F6E\u800C\u4E0D\u662F\u548C\u5BBF\u4E3B\u673A\u5171\u4EAB\u3002\u65B0\u521B\u5EFA\u7684\u5BB9\u5668\u4E0D\u4F1A\u521B\u5EFA\u81EA\u5DF1\u7684\u7F51\u5361\uFF0C\u914D\u7F6E\u81EA\u5DF1\u7684IP\uFF0C\u800C\u662F\u548C\u4E00\u4E2A\u6307\u5B9A\u7684\u5BB9\u5668\u5171\u4EABIP\u3001\u7AEF\u53E3\u8303\u56F4\u7B49\u3002\u540C\u6837\uFF0C\u4E24\u4E2A\u5BB9\u5668\u9664\u4E86\u7F51\u7EDC\u65B9\u9762\uFF0C\u5176\u4ED6\u7684\u5982\u6587\u4EF6\u7CFB\u7EDF\u3001\u8FDB\u7A0B\u5217\u8868\u7B49\u8FD8\u662F\u9694\u79BB\u7684\u3002</strong></p><p><img src="https://s2.loli.net/2022/05/15/6fVpoYeywxavmUu.jpg" alt="graphic"></p><p>\u6848\u4F8B</p><table><thead><tr><th>\u5355\u56FE\u6807</th><th>![img](file:///C:/Users/smile/AppData/Local/Temp/msohtmlclip1/01/clip_image004.gif) CustomIcon-663735520; [&quot;&quot;, &quot;4MyPJwAAAAAAAAAAAAAAAA==&quot;]</th></tr></thead><tbody><tr><td></td><td></td></tr></tbody></table><p><strong>\u5148\u914D\u7F6E\u4E00\u4E2A8085</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 8085:8080  --name tomcat85 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u518D\u914D\u7F6E\u4E00\u4E2A8086\u501F\u75288085</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 8086:8080 --network container:tomcat85 --name tomcat86 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u8FD0\u884C\u7ED3\u679C</strong></p><p><img src="https://s2.loli.net/2022/05/15/QNitcHF6LbfRYoz.png" alt="image-20220515120645211"></p><p><strong>\u76F8\u5F53\u4E8Etomcat86\u548Ctomcat85\u516C\u7528\u540C\u4E00\u4E2Aip\u540C\u4E00\u4E2A\u7AEF\u53E3\uFF0C\u5BFC\u81F4\u7AEF\u53E3\u51B2\u7A81</strong></p><p><strong>\u672C\u6848\u4F8B\u7528tomcat\u6F14\u793A\u4E0D\u5408\u9002\u3002\u3002\u3002\u6F14\u793A\u5751\u3002\u3002\u3002\u3002\u3002\u3002o(\u2565\uFE4F\u2565)o</strong></p><hr><p>\u6362\u4E00\u4E2A\u6F14\u793A\uFF1A</p><h3 id="\u6848\u4F8B2" tabindex="-1"><a class="header-anchor" href="#\u6848\u4F8B2" aria-hidden="true">#</a> \u6848\u4F8B2</h3><table><thead><tr><th>\u5355\u56FE\u6807</th><th>![img](file:///C:/Users/smile/AppData/Local/Temp/msohtmlclip1/01/clip_image002.gif) CustomIcon--1664269521; [&quot;&quot;, &quot;L0PNnAAAAAAAAAAAAAAAAA==&quot;]</th></tr></thead><tbody><tr><td></td><td></td></tr></tbody></table><p>Alpine\u64CD\u4F5C\u7CFB\u7EDF\u662F\u4E00\u4E2A\u9762\u5411\u5B89\u5168\u7684\u8F7B\u578B Linux\u53D1\u884C\u7248</p><p><strong>Alpine Linux \u662F\u4E00\u6B3E\u72EC\u7ACB\u7684\u3001\u975E\u5546\u4E1A\u7684\u901A\u7528 Linux \u53D1\u884C\u7248\uFF0C\u4E13\u4E3A\u8FFD\u6C42\u5B89\u5168\u6027\u3001\u7B80\u5355\u6027\u548C\u8D44\u6E90\u6548\u7387\u7684\u7528\u6237\u800C\u8BBE\u8BA1\u3002 \u53EF\u80FD\u5F88\u591A\u4EBA\u6CA1\u542C\u8BF4\u8FC7\u8FD9\u4E2A Linux \u53D1\u884C\u7248\u672C\uFF0C\u4F46\u662F\u7ECF\u5E38\u7528 Docker \u7684\u670B\u53CB\u53EF\u80FD\u90FD\u7528\u8FC7\uFF0C\u56E0\u4E3A\u4ED6\u5C0F\uFF0C\u7B80\u5355\uFF0C\u5B89\u5168\u800C\u8457\u79F0\uFF0C\u6240\u4EE5\u4F5C\u4E3A\u57FA\u7840\u955C\u50CF\u662F\u975E\u5E38\u597D\u7684\u4E00\u4E2A\u9009\u62E9\uFF0C\u53EF\u8C13\u662F\u9EBB\u96C0\u867D\u5C0F\u4F46\u4E94\u810F\u4FF1\u5168\uFF0C\u955C\u50CF\u975E\u5E38\u5C0F\u5DE7\uFF0C\u4E0D\u5230 6M\u7684\u5927\u5C0F\uFF0C\u6240\u4EE5\u7279\u522B\u9002\u5408\u5BB9\u5668\u6253\u5305\u3002</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -it --name alpine1 alpine /bin/sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u518D\u5F00\u4E00\u4E2A\u5171\u7528\u7B2C\u4E00\u4E2A\u7F51\u6BB5</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -it --network container:alpine1 --name alpine2 alpine /bin/sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u8FD0\u884C\u7ED3\u679C\uFF0C\u9A8C\u8BC1\u5171\u7528\u642D\u6865</strong></p><p><strong>alpine1\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/ # ip addr
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
30: eth0@if31: &lt;BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN&gt; mtu 1500 qdisc noqueue state UP 
    link/ether 02:42:ac:11:00:08 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.8/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
/ # 

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>alpine2\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>/ # ip addr 
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
30: eth0@if31: &lt;BROADCAST,MULTICAST,UP,LOWER_UP,M-DOWN&gt; mtu 1500 qdisc noqueue state UP 
    link/ether 02:42:ac:11:00:08 brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.8/16 brd 172.17.255.255 scope global eth0
       valid_lft forever preferred_lft forever
/ # 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u53EF\u4EE5\u770B\u51FA\uFF0C\u4E24\u4E2A\u5BB9\u5668\u7F51\u7EDC\u516C\u7528\u7684</strong></p><p><strong>\u505C\u6389\u4E00\u4E2Aalpine1\uFF0Calpine2\u7F51\u7EDC\u4F1A\u600E\u4E48\u6837</strong></p><blockquote><p>eth0@if16: \u6D88\u5931\u4E86\u3002\u3002\u3002\u3002\u3002\u3002\u5173\u95EDalpine1\uFF0C\u518D\u770B\u770Balpine2</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/text# docker exec -it alpine2 /bin/sh
/ # ip addr
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
/ # 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6CA1\u6709\u4E86</strong></p>`,34),s=[l];function a(d,o){return n(),i("div",null,s)}const u=e(r,[["render",a],["__file","35.html.vue"]]);export{u as default};
