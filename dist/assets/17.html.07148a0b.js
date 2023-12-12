import{_ as n,o as s,c as e,d as a}from"./app.9f14a191.js";const i={},l=a(`<h1 id="docker\u5B89\u88C5mysql" tabindex="-1"><a class="header-anchor" href="#docker\u5B89\u88C5mysql" aria-hidden="true">#</a> docker\u5B89\u88C5MySQL</h1><p>[toc]</p><h2 id="\u76F4\u63A5\u67E5\u770B" tabindex="-1"><a class="header-anchor" href="#\u76F4\u63A5\u67E5\u770B" aria-hidden="true">#</a> \u76F4\u63A5\u67E5\u770B</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker search --limit 3 mysql</span>
NAME      DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql     MySQL is a widely used, open-source relation\u2026   <span class="token number">12549</span>     <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>       
mariadb   MariaDB Server is a high performing <span class="token function">open</span> sou\u2026   <span class="token number">4824</span>      <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>       
percona   Percona Server is a fork of the MySQL relati\u2026   <span class="token number">575</span>       <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u62C9\u53D6" tabindex="-1"><a class="header-anchor" href="#\u62C9\u53D6" aria-hidden="true">#</a> \u62C9\u53D6</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u8FD0\u884C" tabindex="-1"><a class="header-anchor" href="#\u8FD0\u884C" aria-hidden="true">#</a> \u8FD0\u884C</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker run -P -e MYSQL_ROOT_PASSWORD=123456 -d  --name mysql01 mysql:5.7 </span>
docker: Error response from daemon: Conflict. The container name <span class="token string">&quot;/mysql01&quot;</span> is already <span class="token keyword">in</span> use by container <span class="token string">&quot;646014e4386df9378362b32465d06baf8ff3dd0c79b32a4017c4d189ab7e3a88&quot;</span><span class="token builtin class-name">.</span> You have to remove <span class="token punctuation">(</span>or <span class="token function">rename</span><span class="token punctuation">)</span> that container to be able to reuse that name.
See <span class="token string">&#39;docker run --help&#39;</span><span class="token builtin class-name">.</span>
root@ubuntu:/tmp/host_data<span class="token comment"># docker run -P -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7 </span>
f680877f03bc9786ee219b3a944f23e002dd7c20181e9b067d1a0f3ab706d24f
root@ubuntu:/tmp/host_data<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE                   COMMAND                  CREATED          STATUS                          PORTS                                                                                        NAMES
f680877f03bc   mysql:5.7               <span class="token string">&quot;docker-entrypoint.s\u2026&quot;</span>   <span class="token number">4</span> seconds ago    Up <span class="token number">3</span> seconds                    <span class="token number">0.0</span>.0.0:49155-<span class="token operator">&gt;</span><span class="token number">3306</span>/tcp, :::49155-<span class="token operator">&gt;</span><span class="token number">3306</span>/tcp, <span class="token number">0.0</span>.0.0:49154-<span class="token operator">&gt;</span><span class="token number">33060</span>/tcp, :::49154-<span class="token operator">&gt;</span><span class="token number">33060</span>/tcp   festive_morse
22e49c33a330   billygoo/tomcat8-jdk8   <span class="token string">&quot;catalina.sh run&quot;</span>        <span class="token number">10</span> minutes ago   Up <span class="token number">10</span> minutes                   <span class="token number">0.0</span>.0.0:8080-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp, :::8080-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp                                                    tomcat03
9e194dbf7eca   tomcat                  <span class="token string">&quot;catalina.sh run&quot;</span>        <span class="token number">24</span> minutes ago   Up <span class="token number">24</span> minutes                   <span class="token number">0.0</span>.0.0:49153-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp, :::49153-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp                                                  tomcat02
c6b2169449f4   ubuntu                  <span class="token string">&quot;bash&quot;</span>                   <span class="token number">50</span> minutes ago   Up <span class="token number">50</span> minutes                                                                                                                ubuntu2
37d9f24e95a3   ubuntu                  <span class="token string">&quot;bash&quot;</span>                   <span class="token number">2</span> hours ago      Up <span class="token number">2</span> hours                                                                                                                   u1
f19e7fbc3d18   v2fly/v2fly-core        <span class="token string">&quot;/usr/bin/v2ray -con\u2026&quot;</span>   <span class="token number">2</span> hours ago      Restarting <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">18</span> seconds ago                                                                                                tcp

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u6709\u53EF\u80FD\u81EA\u5DF1\u7684\u670D\u52A1\u5668mysql\u88AB\u5360\u75283306\u6240\u4EE5\u9009\u62E9\u968F\u5373\u52A8\u6001\u7AEF\u53E3</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ps -ef|grep mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u8FDB\u5165\u5BB9\u5668\u4E2D" tabindex="-1"><a class="header-anchor" href="#\u8FDB\u5165\u5BB9\u5668\u4E2D" aria-hidden="true">#</a> \u8FDB\u5165\u5BB9\u5668\u4E2D</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker exec -it f680877f03bc /bin/bash</span>
root@f680877f03bc:/<span class="token comment"># mysql -uroot -p</span>
Enter password: 
Welcome to the MySQL monitor.  Commands end with <span class="token punctuation">;</span> or <span class="token punctuation">\\</span>g.
Your MySQL connection <span class="token function">id</span> is <span class="token number">2</span>
Server version: <span class="token number">5.7</span>.36 MySQL Community Server <span class="token punctuation">(</span>GPL<span class="token punctuation">)</span>

Copyright <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token number">2000</span>, <span class="token number">2021</span>, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type <span class="token string">&#39;help;&#39;</span> or <span class="token string">&#39;\\h&#39;</span> <span class="token keyword">for</span> help. Type <span class="token string">&#39;\\c&#39;</span> to <span class="token function">clear</span> the current input statement.

mysql<span class="token operator">&gt;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#mysql\u64CD\u4F5C" aria-hidden="true">#</a> mysql\u64CD\u4F5C</h2><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>mysql&gt; show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| db07               |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)

mysql&gt; use db07
Database changed
mysql&gt; create table t1(id int,name varchar(20));
Query OK, 0 rows affected (0.01 sec)

mysql&gt; insert into t1 value(01,&quot;smile&quot;);
Query OK, 1 row affected (0.01 sec)

mysql&gt; select * from t1;
+------+-------+
| id   | name  |
+------+-------+
|    1 | smile |
+------+-------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u5728\u4E3B\u673A\u4E0A\u540C\u6837\u53EF\u4EE5\u4F7F\u7528\u5DE5\u5177\u8FDE\u63A5\u8FDC\u7A0B\u7684mysql</strong></p><h2 id="mysql\u4F7F\u7528\u5BB9\u5668\u5377" tabindex="-1"><a class="header-anchor" href="#mysql\u4F7F\u7528\u5BB9\u5668\u5377" aria-hidden="true">#</a> mysql\u4F7F\u7528\u5BB9\u5668\u5377</h2><blockquote><p>\u6211\u4EEC\u5728\u4F7F\u7528MySQL\u7684\u65F6\u5019\u62C5\u5FC3\u6570\u636E\u88AB\u5220\u9664\u600E\u4E48\u529E\uFF0C\u6B64\u65F6\u53EF\u4EE5\u7528\u5230\u4E4B\u524D\u7684\u5377\u4E86</p></blockquote><p><strong>\u907F\u514D\u4E2D\u6587\u4E71\u7801\uFF0C\u540C\u6B65\u65F6\u5019\u8981\u6539\u5B57\u7B26\u96C6</strong></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 3306:3306 --privileged=true 
-v /mysql/log:/var/log/mysql 
-v /mysql/data:/var/lib/mysql
-v /mysql/conf:/etc/mysql/conf.d
-e MYSQL_ROOT_PASSWORD=123456
--name mysql_beifen
mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker run -d -p 3306:3306 --privileged=true -v /mysql/log:/var/log/mysql -v /mysql/data:/var/lib/mysql -v /mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456 --name mysql_beifen mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u64CD\u4F5C" tabindex="-1"><a class="header-anchor" href="#\u64CD\u4F5C" aria-hidden="true">#</a> \u64CD\u4F5C</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>
mysql&gt; show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)

mysql&gt; create database mydata;
Query OK, 1 row affected (0.00 sec)

mysql&gt; use mydata
Database changed
mysql&gt; create table t(
    -&gt; id int,
    -&gt; name varchar(20));
Query OK, 0 rows affected (0.01 sec)

mysql&gt; insert into t values(1,&quot;zhangsan&quot;);
Query OK, 1 row affected (0.01 sec)

mysql&gt; select * from t;
+------+----------+
| id   | name     |
+------+----------+
|    1 | zhangsan |
+------+----------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u4E3B\u673A\u4E0A\u53EF\u4EE5\u770B\u5230\u540C\u6B65</strong></p><h2 id="\u5220\u9664\u540C\u6B65" tabindex="-1"><a class="header-anchor" href="#\u5220\u9664\u540C\u6B65" aria-hidden="true">#</a> \u5220\u9664\u540C\u6B65</h2><blockquote><p>\u6211\u4EEC\u5220\u9664MySQL\u518D\u521B\u5EFA</p></blockquote><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>root@ubuntu:/# docker run -d -p 3306:3306 --privileged=true -v /mysql/log:/var/log/mysql -v /mysql/data:/var/lib/mysql -v /mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456 --name mysql_beifen mysql:5.7
1ff6de0064bdd2eba5acaf0ec5458ca72ae0973f5fec09cf4be2968f159335d3
root@ubuntu:/# docker ps
CONTAINER ID   IMAGE                   COMMAND                  CREATED             STATUS                         PORTS                                                  NAMES
1ff6de0064bd   mysql:5.7               &quot;docker-entrypoint.s\u2026&quot;   11 seconds ago      Up 10 seconds                  0.0.0.0:3306-&gt;3306/tcp, :::3306-&gt;3306/tcp, 33060/tcp   mysql_beifen
22e49c33a330   billygoo/tomcat8-jdk8   &quot;catalina.sh run&quot;        47 minutes ago      Up 47 minutes                  0.0.0.0:8080-&gt;8080/tcp, :::8080-&gt;8080/tcp              tomcat03
9e194dbf7eca   tomcat                  &quot;catalina.sh run&quot;        About an hour ago   Up About an hour               0.0.0.0:49153-&gt;8080/tcp, :::49153-&gt;8080/tcp            tomcat02
c6b2169449f4   ubuntu                  &quot;bash&quot;                   About an hour ago   Up About an hour                                                                      ubuntu2
37d9f24e95a3   ubuntu                  &quot;bash&quot;                   2 hours ago         Up 2 hours                                                                            u1
f19e7fbc3d18   v2fly/v2fly-core        &quot;/usr/bin/v2ray -con\u2026&quot;   2 hours ago         Restarting (2) 2 seconds ago                                                          tcp
root@ubuntu:/# docker exec -it 1ff6de0064bd /bin/bash 
root@1ff6de0064bd:/# mysql -uroot -p123456
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \\g.
Your MySQL connection id is 2
Server version: 5.7.36 MySQL Community Server (GPL)

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type &#39;help;&#39; or &#39;\\h&#39; for help. Type &#39;\\c&#39; to clear the current input statement.

mysql&gt; show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mydata             |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u7531\u6B64\u53EF\u89C1\uFF0C\u6570\u636E\u6062\u590D\u8FC7\u6765\u4E86</strong></p>`,27),d=[l];function r(t,c){return s(),e("div",null,d)}const u=n(i,[["render",r],["__file","17.html.vue"]]);export{u as default};
