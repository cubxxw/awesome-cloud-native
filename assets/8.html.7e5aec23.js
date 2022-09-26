import{_ as e,o as d,c as i,e as a}from"./app.add9352d.js";const l={},s=a(`<h1 id="docker\u5E2E\u52A9\u542F\u52A8\u7C7B\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#docker\u5E2E\u52A9\u542F\u52A8\u7C7B\u547D\u4EE4" aria-hidden="true">#</a> docker\u5E2E\u52A9\u542F\u52A8\u7C7B\u547D\u4EE4</h1><p>[toc]</p><h3 id="\u5E2E\u52A9\u542F\u52A8\u7C7B\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#\u5E2E\u52A9\u542F\u52A8\u7C7B\u547D\u4EE4" aria-hidden="true">#</a> \u5E2E\u52A9\u542F\u52A8\u7C7B\u547D\u4EE4</h3><ol><li><p>\u542F\u52A8docker</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>systemcl start docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u505C\u6B62docker</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>systemctl stop docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u91CD\u542Fdocker</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>systemctl restart docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u67E5\u770Bdocker\u72B6\u6001</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>systemctl status docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u5F00\u673A\u542F\u52A8\uFF08\u6CA1\u6709\u914D\u7F6E\u7684\u8BDD\uFF0C\u6BCF\u6B21\u90FD\u8981\u624B\u52A8\u5F00\u673A\uFF09</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>systemctl enable docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u67E5\u770Bdocker\u6982\u8981\u4FE1\u606F</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u67E5\u770Bdocker\u6574\u4F53\u5E2E\u52A9\u6587\u6863</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>\u67E5\u770Bdocker\u547D\u4EE4\u5E2E\u52A9\u6587\u6863</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker \u5177\u4F53\u547D\u4EE4 --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><p><strong>\u7EDF\u8BA1\u5BB9\u5668\u4FE1\u606F\u2013\u53C2\u8003Linux\u7EDF\u8BA1\u78C1\u76D8</strong></p><ul><li>Linux</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>df -h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>Docker</li></ul><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker system df
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/09/3zZaQufpxAGB4hl.png" alt="image-20220509183105087"></p><h3 id="docker\u9762\u8BD5\u9898" tabindex="-1"><a class="header-anchor" href="#docker\u9762\u8BD5\u9898" aria-hidden="true">#</a> docker\u9762\u8BD5\u9898</h3><p><strong>\u8C08\u8C08docker\u865A\u60AC\u955C\u50CF\u662F\u4EC0\u4E48</strong></p><blockquote><p>\u4ED3\u5E93\u540D\u3001\u6807\u7B7E\u90FD\u662F<code>&lt;none&gt;</code>\u955C\u50CF\uFF0C\u4FD7\u79F0\u865A\u7384\u955C\u50CFdangling image,\u8FD9\u6837\u7684\u4ED3\u5E93\u6CA1\u4EC0\u4E48\u7528\uFF0C\u6709\u65F6\u5019docker\u6784\u5EFA\u65F6\u5019\u51FA\u95EE\u9898\uFF0C\u5EFA\u8BAE\u5220\u9664</p></blockquote>`,13),n=[s];function t(r,c){return d(),i("div",null,n)}const u=e(l,[["render",t],["__file","8.html.vue"]]);export{u as default};
