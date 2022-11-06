import{_ as i,r as o,o as d,c as l,a as e,b as s,w as a,e as t,d as r}from"./app.9772cc17.js";const c="/assets/cYQOLURN4Zagk7P.e71a9ac8.jpg",u="/assets/dBjgcHPhobA6XSC.77c1d014.png",v={},m=e("h1",{id:"host\u662F\u4EC0\u4E48",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#host\u662F\u4EC0\u4E48","aria-hidden":"true"},"#"),t(" host\u662F\u4EC0\u4E48")],-1),p={class:"table-of-contents"},h=t("\u95EE\u9898\uFF1A"),b=t("\u539F\u56E0\uFF1A"),q=t("\u89E3\u51B3:"),g=t("\u6B63\u786E"),_=r('<p>[toc]</p><p><strong>\u76F4\u63A5\u4F7F\u7528\u5BBF\u4E3B\u673A\u7684 IP \u5730\u5740\u4E0E\u5916\u754C\u8FDB\u884C\u901A\u4FE1\uFF0C\u4E0D\u518D\u9700\u8981\u989D\u5916\u8FDB\u884CNAT \u8F6C\u6362\u3002</strong></p><p><strong>\u5BB9\u5668\u5C06\u4E0D\u4F1A\u83B7\u5F97\u4E00\u4E2A\u72EC\u7ACB\u7684Network Namespace\uFF0C \u800C\u662F\u548C\u5BBF\u4E3B\u673A\u5171\u7528\u4E00\u4E2ANetwork Namespace\u3002\u5BB9\u5668\u5C06\u4E0D\u4F1A\u865A\u62DF\u51FA\u81EA\u5DF1\u7684\u7F51\u5361\u800C\u662F\u4F7F\u7528\u5BBF\u4E3B\u673A\u7684IP\u548C\u7AEF\u53E3\u3002</strong></p><p><img src="'+c+`" alt="graphic"></p><p><strong>\u4EE3\u7801</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 8083:8080 --network host --name tomcat83 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u8B66\u544A</p><p><strong>\u8B66\u544A\uFF1A\u4E0D\u592A\u63A8\u8350\u4F7F\u7528\uFF0C<code>-p\u53C2\u6570\u4E0D\u8D77\u4EFB\u4F55\u4F5C\u7528\uFF0C\u56E0\u4E3A\u662F\u548C\u4E3B\u673A\u516C\u7528\u4E00\u4E2A\u7AEF\u53E3</code></strong></p><p><img src="`+u+`" alt="image-20220514221324259"></p></div><h2 id="\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u95EE\u9898" aria-hidden="true">#</a> \u95EE\u9898\uFF1A</h2><p>docke\u542F\u52A8\u65F6\u603B\u662F\u9047\u89C1\u6807\u9898\u4E2D\u7684\u8B66\u544A</p><h2 id="\u539F\u56E0" tabindex="-1"><a class="header-anchor" href="#\u539F\u56E0" aria-hidden="true">#</a> \u539F\u56E0\uFF1A</h2><p><strong>docker\u542F\u52A8\u65F6\u6307\u5B9A--network=host\u6216-net=host\uFF0C\u5982\u679C\u8FD8\u6307\u5B9A\u4E86-p\u6620\u5C04\u7AEF\u53E3\uFF0C\u90A3\u8FD9\u4E2A\u65F6\u5019\u5C31\u4F1A\u6709\u6B64\u8B66\u544A\uFF0C</strong></p><p><strong>\u5E76\u4E14\u901A\u8FC7-p\u8BBE\u7F6E\u7684\u53C2\u6570\u5C06\u4E0D\u4F1A\u8D77\u5230\u4EFB\u4F55\u4F5C\u7528\uFF0C\u7AEF\u53E3\u53F7\u4F1A\u4EE5\u4E3B\u673A\u7AEF\u53E3\u53F7\u4E3A\u4E3B\uFF0C\u91CD\u590D\u65F6\u5219\u9012\u589E\u3002</strong></p><h2 id="\u89E3\u51B3" tabindex="-1"><a class="header-anchor" href="#\u89E3\u51B3" aria-hidden="true">#</a> \u89E3\u51B3:</h2><p>\u89E3\u51B3\u7684\u529E\u6CD5\u5C31\u662F\u4F7F\u7528docker\u7684\u5176\u4ED6\u7F51\u7EDC\u6A21\u5F0F\uFF0C\u4F8B\u5982<code>--network=bridge</code>\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u89E3\u51B3\u95EE\u9898\uFF0C\u6216\u8005\u76F4\u63A5\u65E0\u89C6\u3002\u3002\u3002\u3002O(\u2229_\u2229)O\u54C8\u54C8~</p><h2 id="\u6B63\u786E" tabindex="-1"><a class="header-anchor" href="#\u6B63\u786E" aria-hidden="true">#</a> \u6B63\u786E</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d --network host --name tomcat83 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u65E0\u4E4B\u524D\u7684\u914D\u5BF9\u663E\u793A\u4E86\uFF0C\u770B\u5BB9\u5668\u5B9E\u4F8B\u5185\u90E8</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/home/smile# docker inspect tomcat83 | tail -n 20
            &quot;Networks&quot;: {
                &quot;host&quot;: {
                    &quot;IPAMConfig&quot;: null,
                    &quot;Links&quot;: null,
                    &quot;Aliases&quot;: null,
                    &quot;NetworkID&quot;: &quot;c68651290784a6ed6e11337383cdc7d808ed42393675ade0b5c94fa368c2c556&quot;,
                    &quot;EndpointID&quot;: &quot;a228da421b411e51ada0066671c175938494c46a3915a67c5c3d24f05e73cf47&quot;,
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6CA1\u6709\u8BBE\u7F6E-p\u7684\u7AEF\u53E3\u6620\u5C04\u4E86\uFF0C\u5982\u4F55\u8BBF\u95EE\u542F\u52A8\u7684tomcat83\uFF1F\uFF1F</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code> &quot;Gateway&quot;: &quot;&quot;,
 &quot;IPAddress&quot;: &quot;&quot;,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>http://\u5BBF\u4E3B\u673AIP:8080/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u5728CentOS\u91CC\u9762\u7528\u9ED8\u8BA4\u7684\u706B\u72D0\u6D4F\u89C8\u5668\u8BBF\u95EE\u5BB9\u5668\u5185\u7684tomcat83\u770B\u5230\u8BBF\u95EE\u6210\u529F\uFF0C\u56E0\u4E3A\u6B64\u65F6\u5BB9\u5668\u7684IP\u501F\u7528\u4E3B\u673A\u7684\uFF0C</p><p>\u6240\u4EE5\u5BB9\u5668\u5171\u4EAB\u5BBF\u4E3B\u673A\u7F51\u7EDCIP\uFF0C\u8FD9\u6837\u7684\u597D\u5904\u662F\u5916\u90E8\u4E3B\u673A\u4E0E\u5BB9\u5668\u53EF\u4EE5\u76F4\u63A5\u901A\u4FE1\u3002</p><p><img src="https://s2.loli.net/2022/05/14/z6RsQTM2k3AGBc1.png" alt="image-20220514222936473"></p>`,24);function x(f,k){const n=o("router-link");return d(),l("div",null,[m,e("nav",p,[e("ul",null,[e("li",null,[s(n,{to:"#\u95EE\u9898"},{default:a(()=>[h]),_:1})]),e("li",null,[s(n,{to:"#\u539F\u56E0"},{default:a(()=>[b]),_:1})]),e("li",null,[s(n,{to:"#\u89E3\u51B3"},{default:a(()=>[q]),_:1})]),e("li",null,[s(n,{to:"#\u6B63\u786E"},{default:a(()=>[g]),_:1})])])]),_])}const w=i(v,[["render",x],["__file","33.html.vue"]]);export{w as default};
