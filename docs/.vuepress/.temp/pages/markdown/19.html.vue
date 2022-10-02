<template><div><h1 id="mysql主从复制docker版" tabindex="-1"><a class="header-anchor" href="#mysql主从复制docker版" aria-hidden="true">#</a> mysql主从复制docker版</h1>
<p>[toc]</p>
<h2 id="新建主服务器容器实例" tabindex="-1"><a class="header-anchor" href="#新建主服务器容器实例" aria-hidden="true">#</a> 新建主服务器容器实例</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">3307</span>:3306 <span class="token parameter variable">--name</span> mysql-master <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mysql/mydata/mysql-master/log:/var/log/mysql <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mysql/mydata/mysql-master/data:/var/lib/mysql <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mysql/mydata/mysql-master/conf:/etc/mysql <span class="token punctuation">\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
<span class="token parameter variable">-d</span> mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="进入-mydata-mysql-master-conf目录下新建my-cnf" tabindex="-1"><a class="header-anchor" href="#进入-mydata-mysql-master-conf目录下新建my-cnf" aria-hidden="true">#</a> 进入/mydata/mysql-master/conf目录下新建my.cnf</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>vim my.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>配置如下</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token comment"># 设置mysql的安装目录</span>
<span class="token assign-left variable">basedir</span><span class="token operator">=</span>/usr/local/mysql
<span class="token comment"># 设置mysql数据库的数据的存放目录</span>
<span class="token assign-left variable">datadir</span><span class="token operator">=</span>/usr/local/mysql/mysqldb
<span class="token comment"># 允许最大连接数</span>
<span class="token assign-left variable">max_connections</span><span class="token operator">=</span><span class="token number">1000</span>
<span class="token comment"># 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统</span>
<span class="token assign-left variable">max_connect_errors</span><span class="token operator">=</span><span class="token number">100</span>
<span class="token comment"># 服务端使用的字符集默认为UTF8</span>
character-set-server<span class="token operator">=</span>utf8mb4
<span class="token comment"># 创建新表时将使用的默认存储引擎</span>
default-storage-engine<span class="token operator">=</span>INNODB
<span class="token comment"># 默认使用“mysql_native_password”插件认证</span>
<span class="token assign-left variable">default_authentication_plugin</span><span class="token operator">=</span>mysql_native_password
<span class="token comment">#是否对sql语句大小写敏感，1表示不敏感</span>
lower_case_table_names <span class="token operator">=</span> <span class="token number">1</span>
<span class="token comment">#MySQL连接闲置超过一定时间后(单位：秒)将会被强行关闭</span>
<span class="token comment">#MySQL默认的wait_timeout  值为8个小时, interactive_timeout参数需要同时配置才能生效</span>
interactive_timeout <span class="token operator">=</span> <span class="token number">1800</span>
wait_timeout <span class="token operator">=</span> <span class="token number">1800</span>
<span class="token comment">#Metadata Lock最大时长（秒）， 一般用于控制 alter操作的最大时长sine mysql5.6</span>
<span class="token comment">#执行 DML操作时除了增加innodb事务锁外还增加Metadata Lock，其他alter（DDL）session将阻塞</span>
lock_wait_timeout <span class="token operator">=</span> <span class="token number">3600</span>
<span class="token comment">#内部内存临时表的最大值。</span>
<span class="token comment">#比如大数据量的group by ,order by时可能用到临时表，</span>
<span class="token comment">#超过了这个值将写入磁盘，系统IO压力增大</span>
tmp_table_size <span class="token operator">=</span> 64M
max_heap_table_size <span class="token operator">=</span> 64M
<span class="token punctuation">[</span>mysql<span class="token punctuation">]</span>
<span class="token comment"># 设置mysql客户端默认字符集</span>
default-character-set<span class="token operator">=</span>utf8mb4
<span class="token punctuation">[</span>client<span class="token punctuation">]</span>
<span class="token comment"># 设置mysql客户端连接服务端时默认使用的端口</span>
<span class="token assign-left variable">port</span><span class="token operator">=</span><span class="token number">3306</span>
default-character-set<span class="token operator">=</span>utf8mb4
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改后重启实例" tabindex="-1"><a class="header-anchor" href="#修改后重启实例" aria-hidden="true">#</a> 修改后重启实例</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker restart mysql-master
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="创建数据同步用户" tabindex="-1"><a class="header-anchor" href="#创建数据同步用户" aria-hidden="true">#</a> 创建数据同步用户</h2>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">user</span> <span class="token string">'slave'</span><span class="token variable">@'%'</span>identified <span class="token keyword">by</span> <span class="token string">'123456'</span><span class="token punctuation">;</span>
<span class="token keyword">grant</span> <span class="token keyword">replication</span> slave<span class="token punctuation">,</span><span class="token keyword">replication</span> client <span class="token keyword">on</span> <span class="token operator">*</span><span class="token punctuation">.</span><span class="token operator">*</span> <span class="token keyword">to</span> <span class="token string">'slave'</span><span class="token variable">@'%'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>创建用户slava</strong></p>
<p><strong>设置权限</strong></p>
<h2 id="新建从服务器3308" tabindex="-1"><a class="header-anchor" href="#新建从服务器3308" aria-hidden="true">#</a> 新建从服务器3308</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token number">3308</span>:3306 <span class="token parameter variable">--name</span> mysql-slavea <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mysql/mydata/mysql-slave/log:/var/log/mysql <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mysql/mydata/mysql-slave/data:/var/lib/mysql <span class="token punctuation">\</span>
<span class="token parameter variable">-v</span> /mysql/mydata/mysql-slave/conf:/etc/mysql <span class="token punctuation">\</span>
<span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span><span class="token number">123456</span> <span class="token punctuation">\</span>
<span class="token parameter variable">-d</span> mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="设置配置文件my-cnf" tabindex="-1"><a class="header-anchor" href="#设置配置文件my-cnf" aria-hidden="true">#</a> 设置配置文件my.cnf</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>mysqld<span class="token punctuation">]</span>
<span class="token assign-left variable">server_id</span><span class="token operator">=</span><span class="token number">102</span>
binlog_ignore-db<span class="token operator">=</span>mysql
log-bin<span class="token operator">=</span>mall-mysql-slave1-bin
<span class="token assign-left variable">binlog_cache_size</span><span class="token operator">=</span>1M
<span class="token assign-left variable">binlog_format</span><span class="token operator">=</span>mixed
<span class="token assign-left variable">expire_logs_days</span><span class="token operator">=</span><span class="token number">7</span>
<span class="token assign-left variable">slave_skip_errors</span><span class="token operator">=</span><span class="token number">1062</span>
<span class="token assign-left variable">relat_log</span><span class="token operator">=</span>mall-mysql-relay-bin
<span class="token assign-left variable">log_slave_updates</span><span class="token operator">=</span><span class="token number">1</span>
<span class="token assign-left variable">read_only</span><span class="token operator">=</span><span class="token number">1</span> 
<span class="token comment">#设置为只读</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="重启实例" tabindex="-1"><a class="header-anchor" href="#重启实例" aria-hidden="true">#</a> 重启实例</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker restart mysql-slavea
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


