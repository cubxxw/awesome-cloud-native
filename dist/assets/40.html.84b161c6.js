import{_ as s,o as n,c as a,d as p}from"./app.ee8200d6.js";const e="/assets/axjNQ4Yrl3LSkKo.80c2d987.jpg",t={},o=p('<h1 id="\u6539\u9020\u5347\u7EA7\u5FAE\u670D\u52A1\u5DE5\u7A0Bdocker-boot" tabindex="-1"><a class="header-anchor" href="#\u6539\u9020\u5347\u7EA7\u5FAE\u670D\u52A1\u5DE5\u7A0Bdocker-boot" aria-hidden="true">#</a> \u6539\u9020\u5347\u7EA7\u5FAE\u670D\u52A1\u5DE5\u7A0Bdocker_boot</h1><p>[toc]</p><h2 id="\u4EE5\u524D\u7684\u57FA\u7840\u7248" tabindex="-1"><a class="header-anchor" href="#\u4EE5\u524D\u7684\u57FA\u7840\u7248" aria-hidden="true">#</a> \u4EE5\u524D\u7684\u57FA\u7840\u7248</h2><p><img src="'+e+`" alt="graphic"></p><h2 id="sql\u5EFA\u8868\u5EFA\u5E93" tabindex="-1"><a class="header-anchor" href="#sql\u5EFA\u8868\u5EFA\u5E93" aria-hidden="true">#</a> SQL\u5EFA\u8868\u5EFA\u5E93</h2><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">\`</span>t_user<span class="token punctuation">\`</span></span> <span class="token punctuation">(</span>

<span class="token identifier"><span class="token punctuation">\`</span>id<span class="token punctuation">\`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token keyword">unsigned</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>

<span class="token identifier"><span class="token punctuation">\`</span>username<span class="token punctuation">\`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;&#39;</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;\u7528\u6237\u540D&#39;</span><span class="token punctuation">,</span>

<span class="token identifier"><span class="token punctuation">\`</span>password<span class="token punctuation">\`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">50</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;&#39;</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;\u5BC6\u7801&#39;</span><span class="token punctuation">,</span>

<span class="token identifier"><span class="token punctuation">\`</span>sex<span class="token punctuation">\`</span></span> <span class="token keyword">tinyint</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;0&#39;</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;\u6027\u522B 0=\u5973 1=\u7537 &#39;</span><span class="token punctuation">,</span>

<span class="token identifier"><span class="token punctuation">\`</span>deleted<span class="token punctuation">\`</span></span> <span class="token keyword">tinyint</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span> <span class="token keyword">unsigned</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;0&#39;</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;\u5220\u9664\u6807\u5FD7\uFF0C\u9ED8\u8BA40\u4E0D\u5220\u9664\uFF0C1\u5220\u9664&#39;</span><span class="token punctuation">,</span>

<span class="token identifier"><span class="token punctuation">\`</span>update_time<span class="token punctuation">\`</span></span> <span class="token keyword">timestamp</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;\u66F4\u65B0\u65F6\u95F4&#39;</span><span class="token punctuation">,</span>

<span class="token identifier"><span class="token punctuation">\`</span>create_time<span class="token punctuation">\`</span></span> <span class="token keyword">timestamp</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CURRENT_TIMESTAMP</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;\u521B\u5EFA\u65F6\u95F4&#39;</span><span class="token punctuation">,</span>

<span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">\`</span>id<span class="token punctuation">\`</span></span><span class="token punctuation">)</span>

<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">1</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8 <span class="token keyword">COMMENT</span><span class="token operator">=</span><span class="token string">&#39;\u7528\u6237\u8868&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E00\u952E\u751F\u6210\u8BF4\u660E</p><p>\u6539POM</p>`,8),c=[o];function l(i,k){return n(),a("div",null,c)}const d=s(t,[["render",l],["__file","40.html.vue"]]);export{d as default};
