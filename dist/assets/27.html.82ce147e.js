import{_ as e,o as n,c as i,d}from"./app.c2b148b7.js";const t={},s=d(`<h1 id="\u865A\u60AC\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#\u865A\u60AC\u955C\u50CF" aria-hidden="true">#</a> \u865A\u60AC\u955C\u50CF</h1><p>[toc]</p><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p><strong>\u524D\u9762\u8BB2\u8FC7\u4EC0\u4E48\u662F\u865A\u60AC\u955C\u50CF\xB7\u4ED3\u5E93\u540D\u3001\u6807\u7B7E\u90FD\u662F<code>&lt;none&gt;</code>\u7684\u955C\u50CF\uFF0C\u4FD7\u79F0<code>dangling image</code></strong></p></div><h2 id="dockerfile\u5199\u4E00\u4E2A" tabindex="-1"><a class="header-anchor" href="#dockerfile\u5199\u4E00\u4E2A" aria-hidden="true">#</a> Dockerfile\u5199\u4E00\u4E2A</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>from ubuntu
CMD echo &#39;action is success&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u6D4B\u8BD5\uFF0C\u6CA1\u4EC0\u4E48</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/myfile/test# docker build .
Sending build context to Docker daemon  2.048kB
Step 1/2 : from ubuntu
 ---&gt; ba6acccedd29
Step 2/2 : CMD echo &#39;action is success&#39;
 ---&gt; Running in 5e5d12d28ce2
Removing intermediate container 5e5d12d28ce2
 ---&gt; 5c2d858f45c0
Successfully built 5c2d858f45c0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/13/rW3IABKVTEPyXsw.png" alt="image-20220513215042630"></p><p><strong>\u5DF2\u7ECF\u51FA\u73B0</strong></p><h2 id="\u67E5\u770B\u6240\u6709\u865A\u60AC\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u6240\u6709\u865A\u60AC\u955C\u50CF" aria-hidden="true">#</a> \u67E5\u770B\u6240\u6709\u865A\u60AC\u955C\u50CF</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/myfile/test# docker image ls -f dangling=true
REPOSITORY   TAG       IMAGE ID       CREATED              SIZE
&lt;none&gt;       &lt;none&gt;    5c2d858f45c0   About a minute ago   72.8MB
&lt;none&gt;       &lt;none&gt;    3f26da6b3168   9 minutes ago        231MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u865A\u60AC\u955C\u50CF\u5DF2\u7ECF\u5931\u53BB\u5B58\u5728\u4EF7\u503C\uFF0C\u53EF\u4EE5\u5220\u9664</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker image prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,13),a=[s];function c(l,r){return n(),i("div",null,a)}const u=e(t,[["render",c],["__file","27.html.vue"]]);export{u as default};
