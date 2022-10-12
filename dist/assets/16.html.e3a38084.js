import{_ as o,r,o as p,c,a as n,b as e,w as t,d as s,e as l}from"./app.b4cefffe.js";const i={},u=n("h1",{id:"tomcat\u5B89\u88C5\u6302\u8F7D",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#tomcat\u5B89\u88C5\u6302\u8F7D","aria-hidden":"true"},"#"),s(" tomcat\u5B89\u88C5\u6302\u8F7D")],-1),m={class:"table-of-contents"},d=s("\u67E5\u627Etomcat\u5E76\u4E14\u4E0B\u8F7D"),b=s("\u8FD0\u884C"),k=s("\u8BBF\u95EE\u732B\u9996\u9875"),v=s("\u63A8\u8350\u4F7F\u7528\u7684\u7248\u672C"),h=l(`<p>[toc]</p><h2 id="\u67E5\u627Etomcat\u5E76\u4E14\u4E0B\u8F7D" tabindex="-1"><a class="header-anchor" href="#\u67E5\u627Etomcat\u5E76\u4E14\u4E0B\u8F7D" aria-hidden="true">#</a> \u67E5\u627Etomcat\u5E76\u4E14\u4E0B\u8F7D</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker search --help </span>

Usage:  <span class="token function">docker</span> search <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> <span class="token environment constant">TERM</span>

Search the Docker Hub <span class="token keyword">for</span> images

Options:
  -f, <span class="token parameter variable">--filter</span> filter   Filter output based on conditions provided
      <span class="token parameter variable">--format</span> string   Pretty-print search using a Go template
      <span class="token parameter variable">--limit</span> int       Max number of search results <span class="token punctuation">(</span>default <span class="token number">25</span><span class="token punctuation">)</span>
      --no-trunc        Don&#39;t truncate output
root@ubuntu:/tmp/host_data<span class="token comment"># docker search --limit 3  tomcat </span>
NAME             DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
tomcat           Apache Tomcat is an <span class="token function">open</span> <span class="token builtin class-name">source</span> implementati\u2026   <span class="token number">3319</span>      <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>       
tomee            Apache TomEE is an all-Apache Java EE certif\u2026   <span class="token number">96</span>        <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>       
bitnami/tomcat   Bitnami Tomcat Docker Image                     <span class="token number">44</span>                   <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>
root@ubuntu:/tmp/host_data<span class="token comment"># docker run -it tomcat /bin/bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u8FD0\u884C" tabindex="-1"><a class="header-anchor" href="#\u8FD0\u884C" aria-hidden="true">#</a> \u8FD0\u884C</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 8080:8080 --name tomcat01 tomcat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u53EF\u4EE5\u4F7F\u7528<code>-P</code>\u968F\u673A\u5206\u914D\u7AEF\u53E3\uFF0C\u6B64\u65F6\u5185\u90E8\u548C\u5916\u90E8\u7AEF\u53E3\u4F1A\u4E0D\u4E00\u6837</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/tmp/host_data# docker run -d -P --name tomcat02 tomcat
9e194dbf7ecade3e1261bb836067e6f27c54ef4733ab38a036c1c3a526be5586
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6211\u4EEC\u4F7F\u7528docker ps\u67E5\u770B\u7AEF\u53E3\u53F7</strong></p><p><img src="https://s2.loli.net/2022/05/11/tVC5Df4Aks8uhZ9.png" alt="image-20220511165418337"></p><h2 id="\u8BBF\u95EE\u732B\u9996\u9875" tabindex="-1"><a class="header-anchor" href="#\u8BBF\u95EE\u732B\u9996\u9875" aria-hidden="true">#</a> \u8BBF\u95EE\u732B\u9996\u9875</h2><p><strong>\u4E3A\u4EC0\u4E48\u4E0A\u9762\u7684tomcat\u4E0A\u9762\u5565\u6CA1\u6709\u732B\u732B\uFF1F</strong></p><blockquote><p>\u56E0\u4E3A\u8FD9\u662F\u65B0\u7248\uFF0C\u6211\u4EEC\u8FDB\u5165tomcat\u770B\u4E00\u4E0B</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE              COMMAND                  CREATED             STATUS                          PORTS                                         NAMES
9e194dbf7eca   tomcat             <span class="token string">&quot;catalina.sh run&quot;</span>        <span class="token number">4</span> minutes ago       Up <span class="token number">4</span> minutes                    <span class="token number">0.0</span>.0.0:49153-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp, :::49153-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp   tomcat02
c6b2169449f4   ubuntu             <span class="token string">&quot;bash&quot;</span>                   <span class="token number">30</span> minutes ago      Up <span class="token number">30</span> minutes                                                                 ubuntu2
37d9f24e95a3   ubuntu             <span class="token string">&quot;bash&quot;</span>                   About an hour ago   Up About an hour                                                              u1
f19e7fbc3d18   v2fly/v2fly-core   <span class="token string">&quot;/usr/bin/v2ray -con\u2026&quot;</span>   About an hour ago   Restarting <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">21</span> seconds ago                                                 tcp
root@ubuntu:/tmp/host_data<span class="token comment"># docker exec -it 9e194dbf7eca /bin/bash</span>
root@9e194dbf7eca:/usr/local/tomcat<span class="token comment"># ls -l</span>
total <span class="token number">160</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">18994</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 BUILDING.txt
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">6210</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 CONTRIBUTING.md
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">60269</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 LICENSE
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">2333</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 NOTICE
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">3378</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 README.md
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">6905</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 RELEASE-NOTES
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">16517</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 RUNNING.txt
drwxr-xr-x <span class="token number">2</span> root root  <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:07 bin
drwxr-xr-x <span class="token number">1</span> root root  <span class="token number">4096</span> May <span class="token number">11</span> 09:00 conf
drwxr-xr-x <span class="token number">2</span> root root  <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 lib
drwxrwxrwx <span class="token number">1</span> root root  <span class="token number">4096</span> May <span class="token number">11</span> 09:00 logs
drwxr-xr-x <span class="token number">2</span> root root  <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:07 native-jni-lib
drwxrwxrwx <span class="token number">2</span> root root  <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 temp
drwxr-xr-x <span class="token number">2</span> root root  <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 webapps
drwxr-xr-x <span class="token number">7</span> root root  <span class="token number">4096</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 webapps.dist
drwxrwxrwx <span class="token number">2</span> root root  <span class="token number">4096</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 work
root@9e194dbf7eca:/usr/local/tomcat<span class="token comment"># cd webapps &amp;&amp; ls -al</span>
total <span class="token number">12</span>
drwxr-xr-x <span class="token number">2</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">1</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:07 <span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u8FD9\u662F\u56E0\u4E3A\u771F\u6B63\u6709\u8D27\u7684\u662Fwebapps.dist\uFF0C\u800Cweb apps\u91CC\u9762\u662F\u7A7A\u7684\uFF0C\u6B64\u65F6\u6211\u4EEC\u5220\u9664\u5E76\u4E14\u6539\u540D</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@9e194dbf7eca:/usr/local/tomcat/webapps<span class="token comment"># cd .. &amp;&amp;rm -r webapps</span>
root@9e194dbf7eca:/usr/local/tomcat<span class="token comment"># mv webapps.dist/ webapps &amp;&amp;cd webapps &amp;&amp;ls -al</span>
total <span class="token number">32</span>
drwxr-xr-x  <span class="token number">7</span> root root <span class="token number">4096</span> Dec  <span class="token number">2</span> <span class="token number">22</span>:01 <span class="token builtin class-name">.</span>
drwxr-xr-x  <span class="token number">1</span> root root <span class="token number">4096</span> May <span class="token number">11</span> 09:09 <span class="token punctuation">..</span>
drwxr-xr-x  <span class="token number">3</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 ROOT
drwxr-xr-x <span class="token number">15</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 docs
drwxr-xr-x  <span class="token number">7</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 examples
drwxr-xr-x  <span class="token number">6</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 host-manager
drwxr-xr-x  <span class="token number">6</span> root root <span class="token number">4096</span> Dec <span class="token number">22</span> <span class="token number">17</span>:06 manager
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/11/MvQHpWcql2d4OzI.png" alt="image-20220511170245755"></p><p>\u5982\u4E0A\u56FE\uFF0C\u6210\u529F\u4E86\uFF08\u6211\u8BBE\u7F6E\u4E86\u6620\u5C04\uFF09</p><hr><h2 id="\u63A8\u8350\u4F7F\u7528\u7684\u7248\u672C" tabindex="-1"><a class="header-anchor" href="#\u63A8\u8350\u4F7F\u7528\u7684\u7248\u672C" aria-hidden="true">#</a> \u63A8\u8350\u4F7F\u7528\u7684\u7248\u672C</h2><p><strong>\u6211\u4EEC\u7684\u7248\u672C\u662F\u6700\u65B0\u7684tomcat\uFF0C\u5176\u5B9E\u7528\u4E0D\u5230\u8FD9\u4E48\u65B0\u7684\uFF0C\u53EF\u4EE5\u5220\u9664\u540E\u91CD\u65B0\u5B89\u88C5\u4E00\u4E2A\u65E7\u7684</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 8080:8080 --name tomcat03 billygoo/tomcat8-jdk8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u67E5\u770B\u7AEF\u53E3</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE                   COMMAND                  CREATED             STATUS                         PORTS                                         NAMES
22e49c33a330   billygoo/tomcat8-jdk8   <span class="token string">&quot;catalina.sh run&quot;</span>        <span class="token number">15</span> seconds ago      Up <span class="token number">14</span> seconds                  <span class="token number">0.0</span>.0.0:8080-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp, :::8080-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp     tomcat03
9e194dbf7eca   tomcat                  <span class="token string">&quot;catalina.sh run&quot;</span>        <span class="token number">14</span> minutes ago      Up <span class="token number">14</span> minutes                  <span class="token number">0.0</span>.0.0:49153-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp, :::49153-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp   tomcat02
c6b2169449f4   ubuntu                  <span class="token string">&quot;bash&quot;</span>                   <span class="token number">40</span> minutes ago      Up <span class="token number">40</span> minutes                                                                ubuntu2
37d9f24e95a3   ubuntu                  <span class="token string">&quot;bash&quot;</span>                   About an hour ago   Up About an hour                                                             u1
f19e7fbc3d18   v2fly/v2fly-core        <span class="token string">&quot;/usr/bin/v2ray -con\u2026&quot;</span>   <span class="token number">2</span> hours ago         Restarting <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">2</span> seconds ago                                                 tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/11/dpaNZvRrhIXbSc4.png" alt="image-20220511170816781"></p><blockquote><p>\u5EFA\u8BAE\u521D\u5B66\u8005\u4F7F\u7528\u540E\u9762\u7684\u65B9\u6CD5\u5C31\u884C</p></blockquote>`,25);function g(x,f){const a=r("router-link");return p(),c("div",null,[u,n("nav",m,[n("ul",null,[n("li",null,[e(a,{to:"#\u67E5\u627Etomcat\u5E76\u4E14\u4E0B\u8F7D"},{default:t(()=>[d]),_:1})]),n("li",null,[e(a,{to:"#\u8FD0\u884C"},{default:t(()=>[b]),_:1})]),n("li",null,[e(a,{to:"#\u8BBF\u95EE\u732B\u9996\u9875"},{default:t(()=>[k]),_:1})]),n("li",null,[e(a,{to:"#\u63A8\u8350\u4F7F\u7528\u7684\u7248\u672C"},{default:t(()=>[v]),_:1})])])]),h])}const _=o(i,[["render",g],["__file","16.html.vue"]]);export{_ as default};