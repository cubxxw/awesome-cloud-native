import{_ as e,o as n,c as s,e as a}from"./app.2ebcb929.js";const i={},t=a(`<h1 id="\u5BB9\u5668\u8BF4\u660E-\u2014-\u5BB9\u5668\u7684\u542F\u52A8\u548C\u8FD0\u884C" tabindex="-1"><a class="header-anchor" href="#\u5BB9\u5668\u8BF4\u660E-\u2014-\u5BB9\u5668\u7684\u542F\u52A8\u548C\u8FD0\u884C" aria-hidden="true">#</a> \u5BB9\u5668\u8BF4\u660E \u2014 \u5BB9\u5668\u7684\u542F\u52A8\u548C\u8FD0\u884C</h1><p>[toc]</p><p><strong>\u6709\u955C\u50CF\u624D\u80FD\u521B\u5EFA\u5BB9\u5668\uFF0C\u8FD9\u662F\u6839\u672C\u524D\u63D0\uFF08\u4E0B\u8F7D\u4E00\u4E2AUbuntu\u6216\u8005centos\u955C\u50CF\u6F14\u793A\uFF09</strong></p><p><strong>docker\u5E76\u975E\u662F\u4E00\u4E2A\u901A\u7528\u7684\u5BB9\u5668\uFF0C\u5B83\u4F9D\u8D56\u5DF2\u5B58\u5728\u5E76\u8FD0\u884C\u7684Linux\u5185\u6838\u73AF\u5883</strong></p><p><strong>docker\u5B9E\u8D28\u662F\u5728\u8FD0\u884C\u7684Linux\u4E0B\u5236\u9020\u4E86\u4E00\u4E2A\u9694\u79BB\u7684\u6587\u4EF6\u73AF\u5883\uFF0C\u5FC5\u987B\u8981\u90E8\u7F72\u5728Linux\u5185\u6838\u4E0A</strong></p><blockquote><p>\u6211\u4EEC\u4F7F\u7528\u7B14\u8BB0\u672C\uFF0C\u642D\u5EFAwin11\u7CFB\u7EDF\uFF0C\u7CFB\u7EDF\u4E0A\u7528VMware\u8F6F\u4EF6\u642D\u5EFAUbuntu\u73AF\u5883\uFF0CUbuntu\u4E0A\u4E0B\u8F7Ddocker\uFF0C\u5728docker\u4E0A\u9762\u518D\u6A21\u62DF\u4E00\u4E2AUbuntu</p></blockquote><h2 id="\u542F\u52A8\u4EA4\u4E92\u5F0F\u5BB9\u5668-\u524D\u53F0\u547D\u4EE4\u884C" tabindex="-1"><a class="header-anchor" href="#\u542F\u52A8\u4EA4\u4E92\u5F0F\u5BB9\u5668-\u524D\u53F0\u547D\u4EE4\u884C" aria-hidden="true">#</a> \u542F\u52A8\u4EA4\u4E92\u5F0F\u5BB9\u5668\uFF08\u524D\u53F0\u547D\u4EE4\u884C\uFF09</h2><ul><li><p><code>--name</code>\uFF1A\u4E3A\u5BB9\u5668\u6307\u5B9A\u4E00\u4E2A\u65B0\u7684name</p></li><li><p><code>-i</code>\uFF1A\u4EE5\u4EA4\u4E92\u5F0F\u6A21\u5F0F\u8FD0\u884C\u5BB9\u5668\uFF0C\u901A\u5E38\u4E0E<code>-t</code>\u540C\u65F6\u4F7F\u7528(interactive)</p></li><li><p><code>-t</code>\uFF1A\u4E3A\u5BB9\u5668\u91CD\u65B0\u5206\u914D\u4E00\u4E2A\u4F2A\u8F93\u5165\u7EC8\u7AEF\uFF0C\u901A\u5E38\u4E0E<code>-i</code>\u540C\u65F6\u4F7F\u7528(tyy)</p><p><strong>\u4E5F\u5373\u542F\u52A8\u4EA4\u4E92\u5F0F\u5BB9\u5668\uFF08\u524D\u7AEF\u6709\u4F2A\u7EC8\u7AEF\uFF0C\u7B49\u5F85\u4EA4\u4E92\uFF09</strong></p></li><li><p><code>-P</code>\uFF1A\u968F\u673A\u7AEF\u53E3\u6620\u5C04\uFF0C\u5927\u5199</p></li><li><p><code>-p</code>\uFF1A\u6307\u5B9A\u7AEF\u53E3\u6620\u5C04\uFF0C\u5C0F\u5199</p></li></ul><blockquote><p>\u6211\u4EEC\u666E\u901A\u542F\u52A8</p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>root@ubuntu:/hyerledgerFabric# docker run ubuntu 
root@ubuntu:/hyerledgerFabric# 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CA1\u6548\u679C\u3002\u6B64\u65F6\u9700\u8981\u7528\u5230\u4EA4\u4E92\u5F0F\u5BB9\u5668</p><h3 id="\u542F\u52A8" tabindex="-1"><a class="header-anchor" href="#\u542F\u52A8" aria-hidden="true">#</a> \u542F\u52A8</h3><ol><li>\u65B0\u5EFA+\u542F\u52A8\u5BB9\u5668\uFF0Cubuntu\u8981\u6709bash/shell\u4F5C\u4E3A\u4EA4\u4E92\u5F0F\u63A5\u53E3\u3002</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -it ubuntu /bin/bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u5982\u679C\u8981\u9000\u51FA\u7EC8\u7AEF\uFF0C\u76F4\u63A5\u8F93\u5165exit\uFF0C\u6B64\u65F6\u5BB9\u5668\u505C\u6B62</strong></p><p><strong>\u53EF\u4EE5run\u8FDB\u53BB\u5BB9\u5668\uFF0Cctrl+p+q\u9000\u51FA\uFF0C\u5BB9\u5668\u4E0D\u505C\u6B62\uFF0C\u6B64\u65F6\u53EF\u4EE5\u542F\u52A8\u5DF2\u7ECF\u505C\u6B62\u7684\u5BB9\u5668</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker start \u5BB9\u5668ID\u6216\u8005\u5BB9\u5668\u540D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u91CD\u542F\u5BB9\u5668</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker restart ID\u6216\u8005name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u505C\u6B62\u5BB9\u5668</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker stop ID\u6216\u8005name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u5F3A\u884C\u505C\u6B62\u5BB9\u5668</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker kill \u5BB9\u5668ID\u6216\u8005\u5BB9\u5668\u540D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u5220\u9664\u5DF2\u7ECF\u505C\u6B62\u7684\u5BB9\u5668</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker rm ID\u6216\u8005name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u91CD\u8981\u90E8\u5206" tabindex="-1"><a class="header-anchor" href="#\u91CD\u8981\u90E8\u5206" aria-hidden="true">#</a> \u91CD\u8981\u90E8\u5206</h2><p><strong>1. \u6709\u955C\u50CF\u624D\u80FD\u521B\u5EFA\u5BB9\u5668\uFF0C\u8FD9\u662F\u6839\u672C\u524D\u63D0\uFF08\u4E0B\u8F7D\u4E00\u4E2Aredis6.0.8\u955C\u50CF\u6F14\u793A\uFF09</strong></p><p><strong>2. \u542F\u52A8\u5B88\u62A4\u5F0F\u5BB9\u5668\uFF08\u540E\u53F0\u670D\u52A1\u5668\uFF09</strong></p><ul><li><p><strong>\u5728\u5927\u90E8\u5206\u573A\u666F\u4E0B\uFF0C\u6211\u4EEC\u5E0C\u671Bdocker\u7684\u670D\u52A1\u662F\u5728\u540E\u53F0\u8FD0\u884C\u7684\uFF0C\u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7<code>-d</code>\u6307\u5B9A\u5BB9\u5668\u7684\u540E\u53F0\u8FD0\u884C\u6A21\u5F0F</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d docker_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>redis\u524D\u540E\u53F0\u542F\u52A8\u6F14\u793Acase</p></li></ul><p><strong>\u5F88\u91CD\u8981\u4E00\u70B9\uFF1Adocker\u5BB9\u5668\u540E\u53F0\u8FD0\u884C\uFF0C==\u5FC5\u987B\u6709\u4E00\u4E2A\u524D\u53F0\u8FDB\u7A0B==\uFF0C\u5426\u5219\u4F1A\u7ACB\u5373\u662F\u81EA\u6740\uFF0C\u6240\u4EE5\u5BF9\u4E8Eubuntu\u6765\u8BF4\u5FC5\u987B\u8981\u7528<code>-it</code></strong></p><p>\u5BB9\u5668\u7684\u547D\u4EE4\u5982\u679C\u4E0D\u662F\u90A3\u79CD\u4E00\u76F4\u6302\u8D77\u7684\u547D\u4EE4\uFF08top.tail\uFF09,\u5C31\u662F\u4F1A\u81EA\u52A8\u9000\u51FA\uFF0C\u8FD9\u4E2A\u662Fdocker\u7684\u673A\u5236\u95EE\u9898</p><p><img src="https://s2.loli.net/2022/05/09/dsXLwc4beYiZNlv.png" alt="image-20220509205710035"></p><p><strong>\u4E00\u822C\u5BF9\u4E8E\u6570\u636E\u5E93\u90FD\u662F\u4F7F\u7528<code>-d</code>\u540E\u53F0\u9ED8\u9ED8\u542F\u52A8</strong></p><ul><li>\u524D\u53F0\u4EA4\u4E92\u5F0F<code>-it</code></li><li>\u540E\u53F0\u5B88\u62A4\u5F0F<code>-d</code></li></ul><blockquote><p>\u60F3\u8D77\u6211\u4EEC\u4EE5\u524D\u5B66redis\u7684\u65F6\u5019\uFF0C\u5230\u5904\u90FD\u662F\u5751\uFF0C\u5B89\u88C5\u73AF\u5883\u5565\u7684\u914D\u7F6Econfig\u5565\u7684\uFF0C\u9EBB\u70E6\u6B7B\u4E86\u3002\u73B0\u5728\u6709\u4E86docker\u4E00\u6761\u547D\u4EE4\u89E3\u51B3\u95EE\u9898</p></blockquote><h3 id="\u67E5\u770B\u5BB9\u5668\u65E5\u5FD7" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u5BB9\u5668\u65E5\u5FD7" aria-hidden="true">#</a> \u67E5\u770B\u5BB9\u5668\u65E5\u5FD7</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker logs \u5BB9\u5668ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>\u5F53redis\u51FA\u9519</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/home/smile<span class="token comment"># docker logs a22dd4f7caf4 </span>
<span class="token number">1</span>:C 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.442 <span class="token comment"># oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo</span>
<span class="token number">1</span>:C 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.442 <span class="token comment"># Redis version=6.2.6, bits=64, commit=00000000, modified=0, pid=1, just started</span>
<span class="token number">1</span>:C 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.442 <span class="token comment"># Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf</span>
<span class="token number">1</span>:M 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.443 * monotonic clock: POSIX clock_gettime
<span class="token number">1</span>:M 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.445 * Running <span class="token assign-left variable">mode</span><span class="token operator">=</span>standalone, <span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">6379</span>.
<span class="token number">1</span>:M 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.446 <span class="token comment"># Server initialized</span>
<span class="token number">1</span>:M 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.446 <span class="token comment"># WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add &#39;vm.overcommit_memory = 1&#39; to /etc/sysctl.conf and then reboot or run the command &#39;sysctl vm.overcommit_memory=1&#39; for this to take effect.</span>
<span class="token number">1</span>:M 09 May <span class="token number">2022</span> <span class="token number">12</span>:56:24.447 * Ready to accept connections
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u540E\u9762\u8FD8\u6709\u56FE\u5F62\u5316\u76D1\u63A7\u54C8\u54C8\u54C8\u54C8</p><p>\u4E00\u822C\u6709\u4E9B\u60C5\u51B5\u4E0B\uFF0C\u7528\u5230<code>logs</code>\u5F88\u6709\u5FC5\u8981\uFF0C\u6BD4\u5982\u8BF4\u6211\u4E4B\u524D\u505A\u4E00\u4E2A\u4E91\u76D8cloud\uFF0C\u7531\u4E8E\u4E91\u76D8\u7528docker\u540E\u53F0\u542F\u52A8\uFF0C\u6240\u4EE5\u51FA\u73B0\u7684\u95EE\u9898\u662F\u521D\u59CB\u5316<code>init</code>\u65F6\u5019\u7684\u4FE1\u606F\u90FD\u6CA1\u6709\u663E\u793A\u51FA\u6765\uFF0C\u8FD9\u4E2A\u65F6\u5019\u6211\u4EEC\u7528<code>docker logs \u2026</code>\u5F88\u6709\u5FC5\u8981\u4E86</p></blockquote><h3 id="\u67E5\u770B\u5BB9\u5668\u5185\u8FD0\u884C\u7684\u8FDB\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u5BB9\u5668\u5185\u8FD0\u884C\u7684\u8FDB\u7A0B" aria-hidden="true">#</a> \u67E5\u770B\u5BB9\u5668\u5185\u8FD0\u884C\u7684\u8FDB\u7A0B</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker top \u5BB9\u5668ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/09/Xe76W8HZut2SsVo.png" alt="image-20220509210625854"></p><h3 id="\u67E5\u770B\u5BB9\u5668\u5185\u90E8\u7EC6\u8282" tabindex="-1"><a class="header-anchor" href="#\u67E5\u770B\u5BB9\u5668\u5185\u90E8\u7EC6\u8282" aria-hidden="true">#</a> \u67E5\u770B\u5BB9\u5668\u5185\u90E8\u7EC6\u8282</h3><blockquote><p>\u53EF\u4EE5\u628A\u5BB9\u5668\u770B\u4F5C\u4E00\u4E2A\u7B80\u6613\u7248\u7684Linux\u73AF\u5883\u548C\u8FD0\u884C\u5728\u5176\u4E2D\u7684\u5E94\u7528\u7A0B\u5E8F</p></blockquote><p><strong>\u4EE5json\u5F62\u5F0F\u4FDD\u5B58</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker inspect \u5BB9\u5668ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/09/M57CORzx3qw9EYl.png" alt="image-20220509210901032"></p><h3 id="\u8FDB\u5165\u6B63\u5728\u8FD0\u884C\u7684\u5BB9\u5668\u5E76\u4E14\u4EE5\u547D\u4EE4\u884C\u4EA4\u4E92" tabindex="-1"><a class="header-anchor" href="#\u8FDB\u5165\u6B63\u5728\u8FD0\u884C\u7684\u5BB9\u5668\u5E76\u4E14\u4EE5\u547D\u4EE4\u884C\u4EA4\u4E92" aria-hidden="true">#</a> \u8FDB\u5165\u6B63\u5728\u8FD0\u884C\u7684\u5BB9\u5668\u5E76\u4E14\u4EE5\u547D\u4EE4\u884C\u4EA4\u4E92</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker exec -it \u5BB9\u5668ID bashShell
#\u6216\u8005
docker attach \u5BB9\u5668ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/home/smile<span class="token comment"># docker exec -it 7672921e03e4 /bin/bash</span>
root@7672921e03e4:/<span class="token comment"># uname </span>
Linux
root@ubuntu:/home/smile<span class="token comment"># docker attach 7672921e03e4</span>
root@7672921e03e4:/<span class="token comment"># </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6CE8\u610F\u533A\u522B\uFF1A</strong></p><ul><li><strong>attach\u76F4\u63A5\u8FDB\u5165\u5BB9\u5668\u542F\u52A8\u547D\u4EE4\u7684\u7EC8\u7AEF\uFF0C\u7528exit\u9000\u51FA\u4E0D\u4F1A\u4EA7\u751F\u65B0\u7684\u8FDB\u7A0B</strong></li><li><strong>exec\u662F\u5728\u5BB9\u5668\u4E2D\u6253\u5F00\u65B0\u7684\u7EC8\u7AEF\uFF0C\u5E76\u4E14\u53EF\u4EE5\u542F\u52A8\u65B0\u7684\u8FDB\u7A0B\uFF0C\u7528exit\u9000\u51FA\u4E0D\u4F1A\u5BFC\u81F4\u5BB9\u5668\u7684\u505C\u6B62</strong></li></ul><p><strong>==\u63A8\u8350\u4F7F\u7528exec==</strong></p><h3 id="\u7528redis\u6848\u4F8B\u5B9E\u64CD" tabindex="-1"><a class="header-anchor" href="#\u7528redis\u6848\u4F8B\u5B9E\u64CD" aria-hidden="true">#</a> \u7528redis\u6848\u4F8B\u5B9E\u64CD</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/home/smile<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS      NAMES
a22dd4f7caf4   redis     <span class="token string">&quot;docker-entrypoint.s\u2026&quot;</span>   <span class="token number">25</span> minutes ago   Up <span class="token number">25</span> minutes   <span class="token number">6379</span>/tcp   strange_elgamal
root@ubuntu:/home/smile<span class="token comment"># docker exec -it a22dd4f7caf4 /bin/bash    </span>
root@a22dd4f7caf4:/data<span class="token comment"># redis-cli -p 6379</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token function">ping</span>
PONG
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> <span class="token builtin class-name">set</span> k1 v1
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>&gt;</span> get k1
<span class="token string">&quot;v1&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-\u4ECE\u5BB9\u5668\u4E2D\u62F7\u8D1D\u6587\u4EF6\u5230\u4E3B\u673A\u4E0A" tabindex="-1"><a class="header-anchor" href="#_7-\u4ECE\u5BB9\u5668\u4E2D\u62F7\u8D1D\u6587\u4EF6\u5230\u4E3B\u673A\u4E0A" aria-hidden="true">#</a> <strong>7. \u4ECE\u5BB9\u5668\u4E2D\u62F7\u8D1D\u6587\u4EF6\u5230\u4E3B\u673A\u4E0A</strong></h3><blockquote><p>\u5982\u679C\u6211\u4EEC\u5728\u4E00\u5BB6\u516C\u53F8\uFF0C\u6211\u4EEC\u5728\u5BB9\u5668\u4E2D\u7684Ubuntu\u4E2D\u65B0\u521B\u5EFA\u4E86\u4E00\u4E2A\u6587\u4EF6\uFF0C\u600E\u4E48\u628A\u5BB9\u5668\u4E2D\u7684\u5185\u5BB9\u6587\u4EF6\u62F7\u8D1D\u5230\u4E3B\u673A\u4E0A\uFF0C\u7528\u6765\u5907\u4EFD<strong>\u4E0B\u9762\u662F\u5907\u4EFDhalo\u535A\u5BA2\u5230\u672C\u5730</strong></p><p><img src="https://sm.nsddd.top//typora/image-20220912191258516.png?mail:3293172751@qq.com" alt="image-20220912191258516"></p></blockquote><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker cp \u5BB9\u5668ID\uFF1A\u5BB9\u5668\u5185\u8DEF\u5F84 \u76EE\u7684\u4E3B\u673A\u8DEF\u5F84
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/09/hzrfSYwLy3E5lJq.png" alt="image-20220509213628075"></p><h3 id="\u5BFC\u5165\u548C\u5BFC\u51FA\u5BB9\u5668" tabindex="-1"><a class="header-anchor" href="#\u5BFC\u5165\u548C\u5BFC\u51FA\u5BB9\u5668" aria-hidden="true">#</a> \u5BFC\u5165\u548C\u5BFC\u51FA\u5BB9\u5668</h3><blockquote><p>\u4E0A\u4E00\u4E2A\u53EA\u80FD\u628A\u5BB9\u5668\u4E2D\u7684\u8D44\u6599\u62F7\u8D1D\u51FA\u6765\uFF0C\u8FD9\u4E2A\u53EF\u4EE5\u628A\u6574\u4E2A\u955C\u50CF\u6216\u8005\u5BB9\u5668\u8FDB\u884C\u5907\u4EFD,<strong>\u9ED8\u8BA4\u5BFC\u51FA\u5230\u5F53\u524D\u8DEF\u5F84\u4E0B\u9762</strong></p></blockquote><h4 id="\u5BFC\u51FA" tabindex="-1"><a class="header-anchor" href="#\u5BFC\u51FA" aria-hidden="true">#</a> \u5BFC\u51FA</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker export \u5BB9\u5668ID &gt; abcd.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="\u5BFC\u5165" tabindex="-1"><a class="header-anchor" href="#\u5BFC\u5165" aria-hidden="true">#</a> \u5BFC\u5165</h4><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>cat \u6587\u4EF6\u540D.tar | docker import - \u955C\u50CF\u7528\u6237/\u955C\u50CF\u540D\uFF1A\u955C\u50CF\u7248\u672C\u53F7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://s2.loli.net/2022/05/09/mipHGXC5eAakcoL.png" alt="image-20220509214436456"></p>`,68),d=[t];function r(o,l){return n(),s("div",null,d)}const p=e(i,[["render",r],["__file","10.html.vue"]]);export{p as default};
