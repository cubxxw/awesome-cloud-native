import{_ as s,o as n,c as a,e}from"./app.942c9a5d.js";const l={},i=e(`<h1 id="docker\u9AD8\u7EA7\u7BC7" tabindex="-1"><a class="header-anchor" href="#docker\u9AD8\u7EA7\u7BC7" aria-hidden="true">#</a> Docker\u9AD8\u7EA7\u7BC7</h1><p>[toc]</p><h3 id="mysql\u4E3B\u4ECE\u590D\u5236docker\u7248" tabindex="-1"><a class="header-anchor" href="#mysql\u4E3B\u4ECE\u590D\u5236docker\u7248" aria-hidden="true">#</a> mysql\u4E3B\u4ECE\u590D\u5236docker\u7248</h3><h5 id="_1-\u65B0\u5EFA\u4E3B\u670D\u52A1\u5668\u5BB9\u5668\u5B9E\u4F8B" tabindex="-1"><a class="header-anchor" href="#_1-\u65B0\u5EFA\u4E3B\u670D\u52A1\u5668\u5BB9\u5668\u5B9E\u4F8B" aria-hidden="true">#</a> 1. \u65B0\u5EFA\u4E3B\u670D\u52A1\u5668\u5BB9\u5668\u5B9E\u4F8B</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -p 3307:3306 --name mysql-master \\
-v /mysql/mydata/mysql-master/log:/var/log/mysql \\
-v /mysql/mydata/mysql-master/data:/var/lib/mysql \\
-v /mysql/mydata/mysql-master/conf:/etc/mysql \\
-e MYSQL_ROOT_PASSWORD=123456 \\
-d mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_2-\u8FDB\u5165-mydata-mysql-master-conf\u76EE\u5F55\u4E0B\u65B0\u5EFAmy-cnf" tabindex="-1"><a class="header-anchor" href="#_2-\u8FDB\u5165-mydata-mysql-master-conf\u76EE\u5F55\u4E0B\u65B0\u5EFAmy-cnf" aria-hidden="true">#</a> 2. \u8FDB\u5165/mydata/mysql-master/conf\u76EE\u5F55\u4E0B\u65B0\u5EFAmy.cnf</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>vim my.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u914D\u7F6E\u5982\u4E0B</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token comment"># \u8BBE\u7F6Emysql\u7684\u5B89\u88C5\u76EE\u5F55</span>
<span class="token assign-left variable">basedir</span><span class="token operator">=</span>/usr/local/mysql
<span class="token comment"># \u8BBE\u7F6Emysql\u6570\u636E\u5E93\u7684\u6570\u636E\u7684\u5B58\u653E\u76EE\u5F55</span>
<span class="token assign-left variable">datadir</span><span class="token operator">=</span>/usr/local/mysql/mysqldb
<span class="token comment"># \u5141\u8BB8\u6700\u5927\u8FDE\u63A5\u6570</span>
<span class="token assign-left variable">max_connections</span><span class="token operator">=</span><span class="token number">1000</span>
<span class="token comment"># \u5141\u8BB8\u8FDE\u63A5\u5931\u8D25\u7684\u6B21\u6570\u3002\u8FD9\u662F\u4E3A\u4E86\u9632\u6B62\u6709\u4EBA\u4ECE\u8BE5\u4E3B\u673A\u8BD5\u56FE\u653B\u51FB\u6570\u636E\u5E93\u7CFB\u7EDF</span>
<span class="token assign-left variable">max_connect_errors</span><span class="token operator">=</span><span class="token number">100</span>
<span class="token comment"># \u670D\u52A1\u7AEF\u4F7F\u7528\u7684\u5B57\u7B26\u96C6\u9ED8\u8BA4\u4E3AUTF8</span>
character-set-server<span class="token operator">=</span>utf8mb4
<span class="token comment"># \u521B\u5EFA\u65B0\u8868\u65F6\u5C06\u4F7F\u7528\u7684\u9ED8\u8BA4\u5B58\u50A8\u5F15\u64CE</span>
default-storage-engine<span class="token operator">=</span>INNODB
<span class="token comment"># \u9ED8\u8BA4\u4F7F\u7528\u201Cmysql_native_password\u201D\u63D2\u4EF6\u8BA4\u8BC1</span>
<span class="token assign-left variable">default_authentication_plugin</span><span class="token operator">=</span>mysql_native_password
<span class="token comment">#\u662F\u5426\u5BF9sql\u8BED\u53E5\u5927\u5C0F\u5199\u654F\u611F\uFF0C1\u8868\u793A\u4E0D\u654F\u611F</span>
lower_case_table_names <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment">#MySQL\u8FDE\u63A5\u95F2\u7F6E\u8D85\u8FC7\u4E00\u5B9A\u65F6\u95F4\u540E(\u5355\u4F4D\uFF1A\u79D2)\u5C06\u4F1A\u88AB\u5F3A\u884C\u5173\u95ED</span>
<span class="token comment">#MySQL\u9ED8\u8BA4\u7684wait_timeout  \u503C\u4E3A8\u4E2A\u5C0F\u65F6, interactive_timeout\u53C2\u6570\u9700\u8981\u540C\u65F6\u914D\u7F6E\u624D\u80FD\u751F\u6548</span>
interactive_timeout <span class="token operator">=</span> <span class="token number">1800</span>
wait_timeout <span class="token operator">=</span> <span class="token number">1800</span>
<span class="token comment">#Metadata Lock\u6700\u5927\u65F6\u957F\uFF08\u79D2\uFF09\uFF0C \u4E00\u822C\u7528\u4E8E\u63A7\u5236 alter\u64CD\u4F5C\u7684\u6700\u5927\u65F6\u957Fsine mysql5.6</span>
<span class="token comment">#\u6267\u884C DML\u64CD\u4F5C\u65F6\u9664\u4E86\u589E\u52A0innodb\u4E8B\u52A1\u9501\u5916\u8FD8\u589E\u52A0Metadata Lock\uFF0C\u5176\u4ED6alter\uFF08DDL\uFF09session\u5C06\u963B\u585E</span>
lock_wait_timeout <span class="token operator">=</span> <span class="token number">3600</span>
<span class="token comment">#\u5185\u90E8\u5185\u5B58\u4E34\u65F6\u8868\u7684\u6700\u5927\u503C\u3002</span>
<span class="token comment">#\u6BD4\u5982\u5927\u6570\u636E\u91CF\u7684group by ,order by\u65F6\u53EF\u80FD\u7528\u5230\u4E34\u65F6\u8868\uFF0C</span>
<span class="token comment">#\u8D85\u8FC7\u4E86\u8FD9\u4E2A\u503C\u5C06\u5199\u5165\u78C1\u76D8\uFF0C\u7CFB\u7EDFIO\u538B\u529B\u589E\u5927</span>
tmp_table_size <span class="token operator">=</span> 64M
max_heap_table_size <span class="token operator">=</span> 64M
<span class="token punctuation">[</span>mysql<span class="token punctuation">]</span>
<span class="token comment"># \u8BBE\u7F6Emysql\u5BA2\u6237\u7AEF\u9ED8\u8BA4\u5B57\u7B26\u96C6</span>
default-character-set<span class="token operator">=</span>utf8mb4
<span class="token punctuation">[</span>client<span class="token punctuation">]</span>
<span class="token comment"># \u8BBE\u7F6Emysql\u5BA2\u6237\u7AEF\u8FDE\u63A5\u670D\u52A1\u7AEF\u65F6\u9ED8\u8BA4\u4F7F\u7528\u7684\u7AEF\u53E3</span>
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">3306</span>
default-character-set<span class="token operator">=</span>utf8mb4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_3-\u4FEE\u6539\u540E\u91CD\u542F\u5B9E\u4F8B" tabindex="-1"><a class="header-anchor" href="#_3-\u4FEE\u6539\u540E\u91CD\u542F\u5B9E\u4F8B" aria-hidden="true">#</a> 3.\u4FEE\u6539\u540E\u91CD\u542F\u5B9E\u4F8B</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker restart mysql-master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h5 id="_4-\u521B\u5EFA\u6570\u636E\u540C\u6B65\u7528\u6237" tabindex="-1"><a class="header-anchor" href="#_4-\u521B\u5EFA\u6570\u636E\u540C\u6B65\u7528\u6237" aria-hidden="true">#</a> 4. \u521B\u5EFA\u6570\u636E\u540C\u6B65\u7528\u6237</h5><div class="language-sql ext-sql line-numbers-mode"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">user</span> <span class="token string">&#39;slave&#39;</span><span class="token variable">@&#39;%&#39;</span>identified <span class="token keyword">by</span> <span class="token string">&#39;123456&#39;</span><span class="token punctuation">;</span>
<span class="token keyword">grant</span> <span class="token keyword">replication</span> slave<span class="token punctuation">,</span><span class="token keyword">replication</span> client <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> <span class="token string">&#39;slave&#39;</span><span class="token variable">@&#39;%&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u521B\u5EFA\u7528\u6237slava</strong></p><p><strong>\u8BBE\u7F6E\u6743\u9650</strong></p><h5 id="_5-\u65B0\u5EFA\u4ECE\u670D\u52A1\u56683308" tabindex="-1"><a class="header-anchor" href="#_5-\u65B0\u5EFA\u4ECE\u670D\u52A1\u56683308" aria-hidden="true">#</a> 5. \u65B0\u5EFA\u4ECE\u670D\u52A1\u56683308</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -p 3308:3306 --name mysql-slavea \\
-v /mysql/mydata/mysql-slave/log:/var/log/mysql \\
-v /mysql/mydata/mysql-slave/data:/var/lib/mysql \\
-v /mysql/mydata/mysql-slave/conf:/etc/mysql \\
-e MYSQL_ROOT_PASSWORD=123456 \\
-d mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u8BBE\u7F6E\u914D\u7F6E\u6587\u4EF6my-cnf" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6E\u914D\u7F6E\u6587\u4EF6my-cnf" aria-hidden="true">#</a> \u8BBE\u7F6E\u914D\u7F6E\u6587\u4EF6my.cnf</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>[mysqld]
server_id=102
binlog_ignore-db=mysql
log-bin=mall-mysql-slave1-bin
binlog_cache_size=1M
binlog_format=mixed
expire_logs_days=7
slave_skip_errors=1062
relat_log=mall-mysql-relay-bin
log_slave_updates=1
read_only=1 
#\u8BBE\u7F6E\u4E3A\u53EA\u8BFB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="\u91CD\u542F\u5B9E\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u91CD\u542F\u5B9E\u4F8B" aria-hidden="true">#</a> \u91CD\u542F\u5B9E\u4F8B</h5><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker restart mysql-slavea
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,21),t=[i];function r(d,c){return n(),a("div",null,t)}const m=s(l,[["render",r],["__file","19.html.vue"]]);export{m as default};
