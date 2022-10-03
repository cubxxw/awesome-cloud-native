import{_ as l,r as t,o as d,c as r,a as e,b as a,w as i,d as n,e as c}from"./app.2596e004.js";const o="/assets/ATxWkaiCdcJwv2g.41254c9c.png",u={},v=e("h1",{id:"\u7F16\u5199\u81EA\u5B9A\u4E49\u955C\u50CFmyubuntu",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#\u7F16\u5199\u81EA\u5B9A\u4E49\u955C\u50CFmyubuntu","aria-hidden":"true"},"#"),n(" \u7F16\u5199\u81EA\u5B9A\u4E49\u955C\u50CFmyubuntu")],-1),m={class:"table-of-contents"},b=n("\u88C5\u5907"),p=n("\u7F16\u5199\u6587\u4EF6"),h=c(`<h2 id="\u88C5\u5907" tabindex="-1"><a class="header-anchor" href="#\u88C5\u5907" aria-hidden="true">#</a> \u88C5\u5907</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/text# pwd
/text
root@ubuntu:/text# ll
total 12
drwxr-xr-x  2 root root 4096 May 13 06:56 ./
drwxr-xr-x 33 root root 4096 May 13 06:55 ../
-rw-r--r--  1 root root  321 May 13 06:56 Mydockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u7F16\u5199\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u7F16\u5199\u6587\u4EF6" aria-hidden="true">#</a> \u7F16\u5199\u6587\u4EF6</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>FROM ubuntu
MAINTAINER zzyy<span class="token operator">&lt;</span>zzyybs@126.com<span class="token operator">&gt;</span>
 
ENV MYPATH /usr/local
WORKDIR <span class="token variable">$MYPATH</span>
 
RUN <span class="token function">apt-get</span> update
RUN <span class="token function">apt-get</span> <span class="token function">install</span> net-tools
<span class="token comment">#RUN apt-get install -y iproute2</span>
<span class="token comment">#RUN apt-get install -y inetutils-ping</span>
 
EXPOSE <span class="token number">80</span>
 
CMD <span class="token builtin class-name">echo</span> <span class="token variable">$MYPATH</span>
CMD <span class="token builtin class-name">echo</span> <span class="token string">&quot;install inconfig cmd into ubuntu success--------------ok&quot;</span>
CMD /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>\u6784\u5EFA</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker build -t \u65B0\u955C\u50CF\u540D\u5B57:TAG .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>\u8FD0\u884C</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -it \u65B0\u955C\u50CF\u540D\u5B57:TAG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+o+'" alt="image-20220513221602143"></p>',9);function x(_,g){const s=t("router-link");return d(),r("div",null,[v,e("nav",m,[e("ul",null,[e("li",null,[a(s,{to:"#\u88C5\u5907"},{default:i(()=>[b]),_:1})]),e("li",null,[a(s,{to:"#\u7F16\u5199\u6587\u4EF6"},{default:i(()=>[p]),_:1})])])]),h])}const f=l(u,[["render",x],["__file","28.html.vue"]]);export{f as default};
