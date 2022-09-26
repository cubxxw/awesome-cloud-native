import{_ as n,o as s,c as e,e as a}from"./app.add9352d.js";const o={},c=a(`<h1 id="compose\u6838\u5FC3\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#compose\u6838\u5FC3\u6982\u5FF5" aria-hidden="true">#</a> Compose\u6838\u5FC3\u6982\u5FF5</h1><p>[toc]</p><h3 id="\u4E00\u6587\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u4E00\u6587\u4EF6" aria-hidden="true">#</a> \u4E00\u6587\u4EF6</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker-compose.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="\u4E24\u8981\u7D20" tabindex="-1"><a class="header-anchor" href="#\u4E24\u8981\u7D20" aria-hidden="true">#</a> \u4E24\u8981\u7D20</h3><h5 id="\u670D\u52A1-service" tabindex="-1"><a class="header-anchor" href="#\u670D\u52A1-service" aria-hidden="true">#</a> \u670D\u52A1\uFF08service\uFF09</h5><p><strong>\u4E00\u4E2A\u4E2A\u5E94\u7528\u5BB9\u5668\u5B9E\u4F8B\uFF0C\u6BD4\u5982\u8BA2\u5355\u5FAE\u670D\u52A1\u3001\u5E93\u5B58\u5FAE\u670D\u52A1\u3001mysql\u5BB9\u5668\u3001nginx\u5BB9\u5668\u6216\u8005redis\u5BB9\u5668</strong></p><h5 id="\u5DE5\u7A0B-project" tabindex="-1"><a class="header-anchor" href="#\u5DE5\u7A0B-project" aria-hidden="true">#</a> \u5DE5\u7A0B\uFF08project\uFF09</h5><p><strong>\u7531\u4E00\u7EC4\u5173\u8054\u7684\u5E94\u7528\u5BB9\u5668\u7EC4\u6210\u7684\u4E00\u4E2A\u5B8C\u6574\u4E1A\u52A1\u5355\u5143\uFF0C\u5728 docker-compose.yml \u6587\u4EF6\u4E2D\u5B9A\u4E49\u3002</strong></p><h3 id="compose\u4F7F\u7528\u7684\u4E09\u4E2A\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#compose\u4F7F\u7528\u7684\u4E09\u4E2A\u6B65\u9AA4" aria-hidden="true">#</a> Compose\u4F7F\u7528\u7684\u4E09\u4E2A\u6B65\u9AA4</h3><ul><li><p><strong>\u7F16\u5199Dockerfile\u5B9A\u4E49\u5404\u4E2A\u5FAE\u670D\u52A1\u5E94\u7528\u5E76\u6784\u5EFA\u51FA\u5BF9\u5E94\u7684\u955C\u50CF\u6587\u4EF6</strong></p></li><li><p><strong>\u4F7F\u7528 docker-compose.yml \u5B9A\u4E49\u4E00\u4E2A\u5B8C\u6574\u4E1A\u52A1\u5355\u5143\uFF0C\u5B89\u6392\u597D\u6574\u4F53\u5E94\u7528\u4E2D\u7684\u5404\u4E2A\u5BB9\u5668\u670D\u52A1\u3002</strong></p></li><li><p><strong>\u6700\u540E\uFF0C\u6267\u884Cdocker-compose up\u547D\u4EE4 \u6765\u542F\u52A8\u5E76\u8FD0\u884C\u6574\u4E2A\u5E94\u7528\u7A0B\u5E8F\uFF0C\u5B8C\u6210\u4E00\u952E\u90E8\u7F72\u4E0A\u7EBF</strong></p></li></ul><h3 id="compose\u5E38\u7528\u547D\u4EE4" tabindex="-1"><a class="header-anchor" href="#compose\u5E38\u7528\u547D\u4EE4" aria-hidden="true">#</a> Compose\u5E38\u7528\u547D\u4EE4</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-h</span>              <span class="token comment"># \u67E5\u770B\u5E2E\u52A9</span>

<span class="token function">docker-compose</span> up              <span class="token comment"># \u542F\u52A8\u6240\u6709docker-compose\u670D\u52A1</span>

<span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>            <span class="token comment"># \u542F\u52A8\u6240\u6709docker-compose\u670D\u52A1\u5E76\u540E\u53F0\u8FD0\u884C</span>

<span class="token function">docker-compose</span> down             <span class="token comment"># \u505C\u6B62\u5E76\u5220\u9664\u5BB9\u5668\u3001\u7F51\u7EDC\u3001\u5377\u3001\u955C\u50CF\u3002</span>

<span class="token function">docker-compose</span> <span class="token builtin class-name">exec</span>  yml\u91CC\u9762\u7684\u670D\u52A1id        
<span class="token comment"># \u8FDB\u5165\u5BB9\u5668\u5B9E\u4F8B\u5185\u90E8 docker-compose exec docker-compose.yml\u6587\u4EF6\u4E2D\u5199\u7684\u670D\u52A1id /bin/bash</span>

<span class="token function">docker-compose</span> <span class="token function">ps</span>           <span class="token comment"># \u5C55\u793A\u5F53\u524Ddocker-compose\u7F16\u6392\u8FC7\u7684\u8FD0\u884C\u7684\u6240\u6709\u5BB9\u5668</span>

<span class="token function">docker-compose</span> <span class="token function">top</span>           <span class="token comment"># \u5C55\u793A\u5F53\u524Ddocker-compose\u7F16\u6392\u8FC7\u7684\u5BB9\u5668\u8FDB\u7A0B</span>

<span class="token function">docker-compose</span> logs  yml\u91CC\u9762\u7684\u670D\u52A1id   <span class="token comment"># \u67E5\u770B\u5BB9\u5668\u8F93\u51FA\u65E5\u5FD7</span>

<span class="token function">docker-compose</span> config   <span class="token comment"># \u68C0\u67E5\u914D\u7F6E</span>

<span class="token function">docker-compose</span> config <span class="token parameter variable">-q</span> <span class="token comment"># \u68C0\u67E5\u914D\u7F6E\uFF0C\u6709\u95EE\u9898\u624D\u6709\u8F93\u51FA</span>

<span class="token function">docker-compose</span> restart  <span class="token comment"># \u91CD\u542F\u670D\u52A1</span>

<span class="token function">docker-compose</span> start   <span class="token comment"># \u542F\u52A8\u670D\u52A1</span>

<span class="token function">docker-compose</span> stop    <span class="token comment"># \u505C\u6B62\u670D\u52A1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,13),i=[c];function d(r,l){return s(),e("div",null,i)}const t=n(o,[["render",d],["__file","39.html.vue"]]);export{t as default};
