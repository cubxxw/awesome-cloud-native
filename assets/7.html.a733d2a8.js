import{_ as o,r as i,o as t,c as r,a as n,b as a,d as e,e as l}from"./app.add9352d.js";const c={},d=n("h1",{id:"\u955C\u50CF\u914D\u7F6E-\u2014-\u52A0\u901F",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u955C\u50CF\u914D\u7F6E-\u2014-\u52A0\u901F","aria-hidden":"true"},"#"),e(" \u955C\u50CF\u914D\u7F6E \u2014 \u52A0\u901F")],-1),u=n("p",null,"[toc]",-1),p=e("[x] "),m={href:"https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors",target:"_blank",rel:"noopener noreferrer"},h=e("\u963F\u91CC\u4E91\u914D\u7F6E\u955C\u50CF\u52A0\u901F\u5668"),v=n("p",null,[n("img",{src:"https://s2.loli.net/2022/05/08/O9JBrubVkPWCqnH.png",alt:"image-20220508205850357"})],-1),b=n("p",null,[n("strong",null,"\u6BCF\u4E00\u4E2A\u5F00\u53D1\u8005\u90FD\u6709\u4E00\u4E2A\u552F\u4E00\u7684\u52A0\u901F\u5668\u5730\u5740")],-1),k=n("h2",{id:"\u5B89\u88C5-\u5347\u7EA7docker\u5BA2\u6237\u7AEF",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u5B89\u88C5-\u5347\u7EA7docker\u5BA2\u6237\u7AEF","aria-hidden":"true"},"#"),e(" \u5B89\u88C5\uFF0F\u5347\u7EA7Docker\u5BA2\u6237\u7AEF")],-1),g=e("\u63A8\u8350\u5B89\u88C51.10.0\u4EE5\u4E0A\u7248\u672C\u7684Docker\u5BA2\u6237\u7AEF\uFF0C\u53C2\u8003\u6587\u6863"),f={href:"https://yq.aliyun.com/articles/110806",target:"_blank",rel:"noopener noreferrer"},_=e("docker-ce"),w=l(`<h2 id="\u914D\u7F6E\u955C\u50CF\u52A0\u901F\u5668" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E\u955C\u50CF\u52A0\u901F\u5668" aria-hidden="true">#</a> \u914D\u7F6E\u955C\u50CF\u52A0\u901F\u5668</h2><p>\u9488\u5BF9Docker\u5BA2\u6237\u7AEF\u7248\u672C\u5927\u4E8E 1.10.0 \u7684\u7528\u6237</p><p>\u60A8\u53EF\u4EE5\u901A\u8FC7\u4FEE\u6539daemon\u914D\u7F6E\u6587\u4EF6<code>/etc/docker/daemon.json</code>\u6765\u4F7F\u7528\u52A0\u901F\u5668</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code>sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39;
<span class="token punctuation">{</span>
  <span class="token property">&quot;registry-mirrors&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;https://ks0realz.mirror.aliyuncs.com&quot;</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u91CD\u65B0\u542F\u52A8docker</strong></p><blockquote><p>\u9A8C\u8BC1</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run hello-word
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u5982\u679C\u672C\u5730\u6CA1\u6709hello-word\u8FD9\u4E2A\u955C\u50CF\uFF0C\u5C31\u4F1A\u4E0B\u8F7D\u4E00\u4E2Ahello-word\u955C\u50CF\uFF0C\u5E76\u4E14\u5728\u672C\u5730\u5BB9\u5668\u5185\u8FD0\u884C</strong></p><p><strong>\u800C\u4E14\u8F93\u51FA\u63D0\u793A\u4FE1\u606F\u540E\uFF0Chello-word\u5C31\u4F1A\u505C\u6B62\u8FD0\u884C\uFF0C\u5BB9\u5668\u81EA\u52A8\u7EC8\u6B62</strong></p><h4 id="run\u505A\u4E86\u4E9B\u4EC0\u4E48" tabindex="-1"><a class="header-anchor" href="#run\u505A\u4E86\u4E9B\u4EC0\u4E48" aria-hidden="true">#</a> run\u505A\u4E86\u4E9B\u4EC0\u4E48</h4><ol><li>\u5F00\u59CBdocker\u5148\u5728\u672C\u673A\u4E2D\u5BFB\u627E\u955C\u50CF\u4EE5\u8BE5\u955C\u50CF\u4E3A\u6A21\u677F\u751F\u4EA7\u5BB9\u5668\u5B9E\u4F8B\u8FD0\u884C</li><li>\u5982\u679C\u6CA1\u6709\u7684\u8BDD\u5C31\u53BBdocker hub\u4E0A\u67E5\u627E\u955C\u50CF\uFF0C\u627E\u5230\u5C31\u4E0B\u8F7D\u5230\u672C\u5730<strong>\u5E76\u4E14\u4EE5\u8BE5\u955C\u50CF\u4E3A\u6A21\u677F\u751F\u4EA7\u5BB9\u5668\u5B9E\u4F8B\u8FD0\u884C</strong></li><li>\u5982\u679C\u6CA1\u6709\u627E\u5230\u5C31\u62A5\u9519\uFF0C\u8FD4\u56DE\u9519\u8BEF</li></ol><h4 id="\u4E3A\u4EC0\u4E48docker\u6BD4\u865A\u62DF\u673A\u5FEB" tabindex="-1"><a class="header-anchor" href="#\u4E3A\u4EC0\u4E48docker\u6BD4\u865A\u62DF\u673A\u5FEB" aria-hidden="true">#</a> \u4E3A\u4EC0\u4E48docker\u6BD4\u865A\u62DF\u673A\u5FEB</h4><p>\u56E0\u4E3Adocker\u4E0D\u9700\u8981\u50CFhypervisor\uFF08\u865A\u62DF\u673A\uFF09\u5B9E\u73B0\u786C\u4EF6\u5B9E\u4F8B\u5316\uFF0C\u8FD0\u884C\u5728docker\u5BB9\u5668\u4E0A\u7684\u7A0B\u5E8F\u76F4\u63A5\u4F7F\u7528\u7684\u90FD\u662F\u5B9E\u4F8B\u7269\u7406\u673A\u7684\u786C\u4EF6\u8D44\u6E90\uFF0C\u56E0\u6B64\u5728CPU\u3001\u5185\u5B58\u5229\u7528\u7387\u4E0Adocker\u66F4\u6709\u6548\u7387</p><h3 id="hello-word\u6848\u4F8B" tabindex="-1"><a class="header-anchor" href="#hello-word\u6848\u4F8B" aria-hidden="true">#</a> hello-word\u6848\u4F8B</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/hyerledgerFabric<span class="token comment"># docker run hello-world</span>
Unable to <span class="token function">find</span> image <span class="token string">&#39;hello-world:latest&#39;</span> locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete 
Digest: sha256:2498fce14358aa50ead0cc6c19990fc6ff866ce72aeb5546e1d59caac3d0d60f
Status: Downloaded newer image <span class="token keyword">for</span> hello-world:latest

Hello from Docker<span class="token operator">!</span>
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 <span class="token number">1</span>. The Docker client contacted the Docker daemon.
 <span class="token number">2</span>. The Docker daemon pulled the <span class="token string">&quot;hello-world&quot;</span> image from the Docker Hub.
    <span class="token punctuation">(</span>amd64<span class="token punctuation">)</span>
 <span class="token number">3</span>. The Docker daemon created a new container from that image <span class="token function">which</span> runs the
    executable that produces the output you are currently reading.
 <span class="token number">4</span>. The Docker daemon streamed that output to the Docker client, <span class="token function">which</span> sent it
    to your terminal.

To try something <span class="token function">more</span> ambitious, you can run an Ubuntu container with:
 $ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> ubuntu <span class="token function">bash</span>

Share images, automate workflows, and <span class="token function">more</span> with a <span class="token function">free</span> Docker ID:
 https://hub.docker.com/

For <span class="token function">more</span> examples and ideas, visit:
 https://docs.docker.com/get-started/

root@ubuntu:/hyerledgerFabric<span class="token comment"># docker run hello-world</span>

Hello from Docker<span class="token operator">!</span>
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 <span class="token number">1</span>. The Docker client contacted the Docker daemon.
 <span class="token number">2</span>. The Docker daemon pulled the <span class="token string">&quot;hello-world&quot;</span> image from the Docker Hub.
    <span class="token punctuation">(</span>amd64<span class="token punctuation">)</span>
 <span class="token number">3</span>. The Docker daemon created a new container from that image <span class="token function">which</span> runs the
    executable that produces the output you are currently reading.
 <span class="token number">4</span>. The Docker daemon streamed that output to the Docker client, <span class="token function">which</span> sent it
    to your terminal.

To try something <span class="token function">more</span> ambitious, you can run an Ubuntu container with:
 $ <span class="token function">docker</span> run <span class="token parameter variable">-it</span> ubuntu <span class="token function">bash</span>

Share images, automate workflows, and <span class="token function">more</span> with a <span class="token function">free</span> Docker ID:
 https://hub.docker.com/

For <span class="token function">more</span> examples and ideas, visit:
 https://docs.docker.com/get-started/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15);function y(D,x){const s=i("ExternalLinkIcon");return t(),r("div",null,[d,u,n("ul",null,[n("li",null,[p,n("strong",null,[n("a",m,[h,a(s)])])])]),v,b,k,n("p",null,[g,n("a",f,[_,a(s)])]),w])}const q=o(c,[["render",y],["__file","7.html.vue"]]);export{q as default};
