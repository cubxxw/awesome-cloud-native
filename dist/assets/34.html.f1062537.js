import{_ as e,o as n,c as t,d as o}from"./app.08b806be.js";const i={},s=o(`<h1 id="none\u662F\u4EC0\u4E48" tabindex="-1"><a class="header-anchor" href="#none\u662F\u4EC0\u4E48" aria-hidden="true">#</a> none\u662F\u4EC0\u4E48</h1><h2 id="none" tabindex="-1"><a class="header-anchor" href="#none" aria-hidden="true">#</a> none</h2><p><strong>\u5728none\u6A21\u5F0F\u4E0B\uFF0C\u5E76\u4E0D\u4E3ADocker\u5BB9\u5668\u8FDB\u884C\u4EFB\u4F55\u7F51\u7EDC\u914D\u7F6E\u3002</strong></p><p><strong>\u4E5F\u5C31\u662F\u8BF4\uFF0C\u8FD9\u4E2ADocker\u5BB9\u5668\u6CA1\u6709\u7F51\u5361\u3001IP\u3001\u8DEF\u7531\u7B49\u4FE1\u606F\uFF0C\u53EA\u6709\u4E00\u4E2Alo</strong></p><p><strong>\u9700\u8981\u6211\u4EEC\u81EA\u5DF1\u4E3ADocker\u5BB9\u5668\u6DFB\u52A0\u7F51\u5361\u3001\u914D\u7F6EIP\u7B49\u3002</strong></p><p><strong>\u7981\u7528\u7F51\u7EDC\u529F\u80FD\uFF0C\u53EA\u6709lo\u6807\u8BC6(\u5C31\u662F127.0.0.1\u8868\u793A\u672C\u5730\u56DE\u73AF)</strong></p><blockquote><p>\u5E73\u65F6\u5F88\u5C11\u7528\uFF0C\u4E86\u89E3\u4E00\u4E0B\u5C31\u884C\u4E86</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 8084:8080 --network none --name tomcat84 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u8FDB\u5165\u5BB9\u5668\u5185\u90E8\u67E5\u770B</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/home/smile# docker ps |grep tomcat
ca21eb3e0651   billygoo/tomcat8-jdk8   &quot;catalina.sh run&quot;        55 seconds ago   Up 52 seconds                                                               tomcat84
7618e4f905d2   billygoo/tomcat8-jdk8   &quot;catalina.sh run&quot;        14 hours ago     Up 14 hours                                                                 tomcat83
518bce78283a   billygoo/tomcat8-jdk8   &quot;catalina.sh run&quot;        15 hours ago     Up 15 hours                     0.0.0.0:8082-&gt;8080/tcp, :::8082-&gt;8080/tcp   tomcat82
98ec1a7378a7   billygoo/tomcat8-jdk8   &quot;catalina.sh run&quot;        15 hours ago     Up 15 hours                     0.0.0.0:8081-&gt;8080/tcp, :::8081-&gt;8080/tcp   tomcat81
root@ubuntu:/home/smile# docker exec -it ca21eb3e0651 bash
root@ca21eb3e0651:/usr/local/tomcat# ip addr
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u5728\u5BB9\u5668\u5916\u90E8\u67E5\u770B</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/home/smile# docker inspect tomcat84|tail -n 20
            &quot;Networks&quot;: {
                &quot;none&quot;: {
                    &quot;IPAMConfig&quot;: null,
                    &quot;Links&quot;: null,
                    &quot;Aliases&quot;: null,
                    &quot;NetworkID&quot;: &quot;5e7ee4274242392a7fe5a258697861d7e94a0e73288378c5a2d5409ce8031910&quot;,
                    &quot;EndpointID&quot;: &quot;4b6bf530b14eef04a873b47f688a6d1bf5d0fa9d17ad8dd7dd39d3573ce276da&quot;,
                    &quot;Gateway&quot;: &quot;&quot;,
                    &quot;IPAddress&quot;: &quot;&quot;,
                    &quot;IPPrefixLen&quot;: 0,
                    &quot;IPv6Gateway&quot;: &quot;&quot;,
                    &quot;GlobalIPv6Address&quot;: &quot;&quot;,
                    &quot;GlobalIPv6PrefixLen&quot;: 0,
                    &quot;MacAddress&quot;: &quot;&quot;,
                    &quot;DriverOpts&quot;: null
                }
            }
        }
    }
]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u7531\u6B64\u53EF\u89C1\uFF0C\u7F51\u5361\u548CIP\u90FD\u6CA1\u6709</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>  &quot;Gateway&quot;: &quot;&quot;,
  &quot;IPAddress&quot;: &quot;&quot;,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 8084:8080 --network none --name tomcat84 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,15),d=[s];function a(l,u){return n(),t("div",null,d)}const c=e(i,[["render",a],["__file","34.html.vue"]]);export{c as default};
