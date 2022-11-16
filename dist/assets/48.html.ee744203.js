import{_ as a,r as i,o,c as t,a as n,b as c,e as s,d}from"./app.3800410c.js";const r={},l=n("h1",{id:"\u6784\u5EFA\u955C\u50CF",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u6784\u5EFA\u955C\u50CF","aria-hidden":"true"},"#"),s(" \u6784\u5EFA\u955C\u50CF")],-1),p=n("p",null,"[toc]",-1),u=n("h2",{id:"\u955C\u50CF",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u955C\u50CF","aria-hidden":"true"},"#"),s(" \u955C\u50CF")],-1),v=s("\u662F\u6253\u5305\u597D\u7684\u8F6F\u4EF6\uFF0C\u7531\u7A0B\u5E8F\u4EE3\u7801\u3001\u57FA\u7840\u7CFB\u7EDF\u3001"),b={href:"https://so.csdn.net/so/search?q=%E4%BE%9D%E8%B5%96%E5%85%B3%E7%B3%BB&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},m=s("\u4F9D\u8D56\u5173\u7CFB"),h=s("\u7684\u8F6F\u4EF6\u5305\u3001\u7CFB\u7EDF\u5E93\u548C\u5DE5\u5177\u7EC4\u6210 \u3002"),k=d(`<ul><li>Dockerfile\uFF1A\u662F\u5236\u4F5C\u955C\u50CF\u7684\u6587\u4EF6</li></ul><h2 id="base-\u955C\u50CF" tabindex="-1"><a class="header-anchor" href="#base-\u955C\u50CF" aria-hidden="true">#</a> base \u955C\u50CF</h2><p><strong>base \u955C\u50CF\u6709\u4E24\u5C42\u542B\u4E49\uFF1A</strong></p><p>\u4E0D\u4F9D\u8D56\u5176\u4ED6\u955C\u50CF\uFF0C\u4ECE <code>scratch</code> \u6784\u5EFA\u3002</p><ul><li><code>scratch</code>\uFF1A\u662F\u6700\u57FA\u7840\u7684docker\u955C\u50CF\uFF0C\u76F8\u5F53\u4E8E\u4E00\u4E2A\u5730\u57FA\u3002</li></ul><p>\u5176\u4ED6\u955C\u50CF\u53EF\u4EE5\u5728\u6B64\u57FA\u7840\u4E0A\u8FDB\u884C\u6269\u5C55\u3002</p><p><strong>\u7528\u522B\u7684\u955C\u50CF\u505A\u57FA\u7840\u955C\u50CF \u27A1\uFE0F \u7AD9\u5728\u5DE8\u4EBA\u7684\u80A9\u8180</strong></p><h2 id="rootfs\u548Cbootfs" tabindex="-1"><a class="header-anchor" href="#rootfs\u548Cbootfs" aria-hidden="true">#</a> rootfs\u548Cbootfs</h2><p><strong>bootfs\u548Crootfs\u91CC\u9762\u5C31\u662F\u4E00\u4E9B\u7A0B\u5E8F\u548C\u6587\u4EF6</strong></p><p>bootfs\uFF1A\u5BB9\u5668\u542F\u52A8\u7684\u65F6\u5019\u9700\u8981\u7684\u5185\u5BB9\uFF0C\u662F <code>linux kernel</code> \u63D0\u4F9B\u4E86<code>bootfs</code></p><div class="custom-container warning"><p class="custom-container-title">\u6CE8\u610F</p><p>\u5185\u6838\u7A7A\u95F4\u662F kernel\uFF0CLinux \u521A\u542F\u52A8\u65F6\u4F1A\u52A0\u8F7D bootfs \u6587\u4EF6\u7CFB\u7EDF\uFF0C\u4E4B\u540E bootfs \u4F1A\u88AB\u5378\u8F7D\u6389\u3002\u7528\u6237\u7A7A\u95F4\u7684\u6587\u4EF6\u7CFB\u7EDF\u662F rootfs\uFF0C\u5305\u542B\u6211\u4EEC\u719F\u6089\u7684 /dev, /proc, /bin \u7B49\u76EE\u5F55\u3002\u5BF9\u4E8E base \u955C\u50CF\u6765\u8BF4\uFF0C\u5E95\u5C42\u76F4\u63A5\u7528 Host \u7684 kernel\uFF0C\u81EA\u5DF1\u53EA\u9700\u8981\u63D0\u4F9B rootfs \u5C31\u884C\u4E86\u3002\u800C\u5BF9\u4E8E\u4E00\u4E2A\u7CBE\u7B80\u7684 OS\uFF0Crootfs \u53EF\u4EE5\u5F88\u5C0F\uFF0C\u53EA\u9700\u8981\u5305\u62EC\u6700\u57FA\u672C\u7684\u547D\u4EE4\u3001\u5DE5\u5177\u548C\u7A0B\u5E8F\u5E93\u5C31\u53EF\u4EE5\u4E86\u3002\u76F8\u6BD4\u5176\u4ED6 Linux \u53D1\u884C\u7248\uFF0CCentOS \u7684 rootfs \u5DF2\u7ECF\u7B97\u81C3\u80BF\u7684\u4E86\uFF0Calpine \u8FD8\u4E0D\u5230 10MB\u3002\u6211\u4EEC\u5E73\u65F6\u5B89\u88C5\u7684 CentOS \u9664\u4E86 rootfs \u8FD8\u4F1A\u9009\u88C5\u5F88\u591A\u8F6F\u4EF6\u3001\u670D\u52A1\u3001\u56FE\u5F62\u684C\u9762\u7B49\uFF0C\u9700\u8981\u597D\u51E0\u4E2A GB \u5C31\u4E0D\u8DB3\u4E3A\u5947\u4E86\u3002</p><p>\u5373\u6211\u4EEC\u7684\u5BB9\u5668\u5168\u90E8\u7528\u5BBF\u4E3B\u673A\u7684\u5185\u6838kernel\uFF0C\u800C\u5BB9\u5668\u63D0\u4F9B\u7684\u53EA\u662F\u4E0D\u540C\u7684\u7CFB\u7EDF\u6587\u4EF6\u3002bootfs\uFF0C\u5BB9\u5668\u542F\u52A8\u7684\u65F6\u5019\u9700\u8981\u7684\u5185\u5BB9\uFF1Brootfs\uFF0C\u5BB9\u5668\u5185\u90E8\u7684\u64CD\u4F5C\u7CFB\u7EDF</p></div><h2 id="base-\u955C\u50CF\u63D0\u4F9B\u7684\u662F\u6700\u5C0F\u5B89\u88C5\u7684-linux-\u53D1\u884C\u7248" tabindex="-1"><a class="header-anchor" href="#base-\u955C\u50CF\u63D0\u4F9B\u7684\u662F\u6700\u5C0F\u5B89\u88C5\u7684-linux-\u53D1\u884C\u7248" aria-hidden="true">#</a> base \u955C\u50CF\u63D0\u4F9B\u7684\u662F\u6700\u5C0F\u5B89\u88C5\u7684 Linux \u53D1\u884C\u7248</h2><p>\u4E0B\u9762\u662F CentOS \u955C\u50CF\u7684 Dockerfile \u7684\u5185\u5BB9\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>FROM scratch
ADD centos-7-docker.tar.xz /
CMD <span class="token punctuation">[</span><span class="token string">&quot;bin/bash&quot;</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u955C\u50CF\u5206\u5C42" tabindex="-1"><a class="header-anchor" href="#\u955C\u50CF\u5206\u5C42" aria-hidden="true">#</a> \u955C\u50CF\u5206\u5C42</h2><p>Docker \u652F\u6301\u901A\u8FC7\u6269\u5C55\u73B0\u6709\u955C\u50CF\uFF0C\u521B\u5EFA\u65B0\u7684\u955C\u50CF\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">docker</span> pull debian  <span class="token comment"># \u4E0B\u8F7D\u4E00\u4E2Adebian\u7684\u955C\u50CF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7F16\u5199 dockerfile\uFF1A</p><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code>FORM debian
<span class="token instruction"><span class="token keyword">RUN</span> apt-get install emacs</span>
<span class="token instruction"><span class="token keyword">RUN</span> apt-get install apache2</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;bin/bash&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u2460 \u65B0\u955C\u50CF\u4E0D\u518D\u662F\u4ECE scratch \u5F00\u59CB\uFF0C\u800C\u662F\u76F4\u63A5\u5728 Debian base \u955C\u50CF\u4E0A\u6784\u5EFA\u3002 \u2461 \u5B89\u88C5 emacs \u7F16\u8F91\u5668\u3002 \u2462 \u5B89\u88C5 apache2\u3002 \u2463 \u5BB9\u5668\u542F\u52A8\u65F6\u8FD0\u884C bash\u3002</p><p><strong>\u7F16\u8BD1\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker build -t mydebian .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5236\u4F5C\u955C\u50CF\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u5236\u4F5C\u955C\u50CF\u8FC7\u7A0B" aria-hidden="true">#</a> \u5236\u4F5C\u955C\u50CF\u8FC7\u7A0B</h2><blockquote><p>\u4F7F\u7528 <code>sealer</code> \u5236\u4F5C\u4E00\u4E2A\u96C6\u7FA4\u955C\u50CF\uFF0C\u548C <code>dockerfile</code> \u540C\u4E5F\u4E0D\u540C\u3002</p></blockquote><div class="language-docker ext-docker line-numbers-mode"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> python</span>
<span class="token comment"># \u6211\u4EEC\u5728docker\u5BB9\u5668\u7684\u5DE5\u4F5C\u76EE\u5F55\u3002\u5373\u8FDB\u5165docker\u5BB9\u5668\u7684\u65F6\u5019\uFF0C\u6240\u5728\u7684\u76EE\u5F55</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /app </span>
 
<span class="token comment"># \u590D\u5236\u5F53\u524D\u76EE\u5F55\u4E0B\u7684\u6240\u6709\u5185\u5BB9\u5230\u5BB9\u5668\u91CC\u8FB9/app\u76EE\u5F55\u4E0B</span>
<span class="token instruction"><span class="token keyword">ADD</span> . /app </span>
 
<span class="token comment"># \u5B9A\u4E49\u4E00\u4E2A\u6570\u636E\u5377</span>
<span class="token instruction"><span class="token keyword">VOLUME</span> [<span class="token string">&quot;/data_flask&quot;</span>]</span>
 
<span class="token comment"># requirements.txt\u4F1A\u5199\u660E\u6211\u8FD9\u4E2A\u9879\u76EE\u4F1A\u9700\u8981\u4E00\u4E9B\u4EC0\u4E48python\u5E93\uFF1B\\</span>
<span class="token comment"># \u8FD9\u6761\u547D\u4EE4\u662F\u544A\u8BC9\u5BB9\u5668\u628Arequirements.txt\u91CC\u9700\u8981\u7684\u5E93\u5230pypi.python.org\u8FD9\u4E2A\u7F51\u7AD9\u91CC\u8FB9\u4E0B\u8F7D</span>
<span class="token comment"># \u8FD9\u6761\u547D\u4EE4\u662F\u5728\u5236\u4F5C\u955C\u50CF\u7684\u65F6\u5019\u8981\u8FD0\u884C\u7684\uFF0C\u800C\u4E0D\u662F\u5728\u542F\u52A8\u5BB9\u5668\u7684\u65F6\u5019\u8FD0\u884C\u7684\uFF0C\u8FD9\u4E2A\u8981\u8BB0\u4F4F\u5F88\u5BB9\u6613\u6DF7\u6DC6</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip install  --trusted-host pypi.python.org -r requirements.txt</span>
 
<span class="token comment"># \u66B4\u9732\u6211\u4EEC\u7684\u7AEF\u53E3\u53F7\uFF0C\u5373\u5BB9\u5668\u5BF9\u5916\u5F00\u653E\u54EA\u4E2A\u7AEF\u53E3</span>
<span class="token instruction"><span class="token keyword">EXPOSE</span> 80</span>
 
<span class="token comment"># \u5B9A\u4E49\u73AF\u5883\u53D8\u91CF</span>
<span class="token instruction"><span class="token keyword">ENV</span> NAME World</span>
<span class="token instruction"><span class="token keyword">ENV</span> AUTHOR fan</span>
 
<span class="token comment"># \u5BB9\u5668\u8D77\u6765\u4E4B\u540E\u8FD0\u884C\u7684\u7B2C\u4E00\u4E2A\u7A0B\u5E8F\uFF0C\u8FD9\u4E2A\u662F\u5BB9\u5668\u542F\u52A8\u7684\u65F6\u5019\u8FD0\u884C\uFF0C\u8981\u548C\u4E0A\u8FB9\u533A\u5206\u5F00\u6765</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6784\u5EFA\u751F\u6210\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token comment"># -t\uFF0C\u6253\u4E2A\u6807\u8BB0\uFF0C\u7B49\u4E8E\u7ED9\u8FD9\u4E2A\u955C\u50CF\u53D6\u4E2A\u540D\u5B57</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> friendlyhello_1 <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u751F\u6210\u955C\u50CF\u7684\u65F6\u5019\uFF0C\u80CC\u540E\u4F1A\u81EA\u52A8\u751F\u6210\u4E34\u65F6\u7684\u5BB9\u5668\u53BB\u6267\u884CDockerfile\u91CC\u7684\u547D\u4EE4\uFF0C\u68C0\u6D4B\u8FD9\u4E2A\u547D\u4EE4\u662F\u5426\u53EF\u4EE5\u8FD0\u884C</p><p><strong>\u8FD0\u884C\uFF1A</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 5080:80 --name hello-1 friendlyhello_1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,30);function g(f,x){const e=i("ExternalLinkIcon");return o(),t("div",null,[l,p,u,n("p",null,[v,n("a",b,[m,c(e)]),h]),k])}const y=a(r,[["render",g],["__file","48.html.vue"]]);export{y as default};
