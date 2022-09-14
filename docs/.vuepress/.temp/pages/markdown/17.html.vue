<template><div><h1 id="docker安装mysql" tabindex="-1"><a class="header-anchor" href="#docker安装mysql" aria-hidden="true">#</a> docker安装MySQL</h1>
<p>[toc]</p>
<h3 id="直接查看" tabindex="-1"><a class="header-anchor" href="#直接查看" aria-hidden="true">#</a> 直接查看</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker search --limit 3 mysql</span>
NAME      DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
mysql     MySQL is a widely used, open-source relation…   <span class="token number">12549</span>     <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>       
mariadb   MariaDB Server is a high performing <span class="token function">open</span> sou…   <span class="token number">4824</span>      <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>       
percona   Percona Server is a fork of the MySQL relati…   <span class="token number">575</span>       <span class="token punctuation">[</span>OK<span class="token punctuation">]</span>     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拉取" tabindex="-1"><a class="header-anchor" href="#拉取" aria-hidden="true">#</a> 拉取</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="运行" tabindex="-1"><a class="header-anchor" href="#运行" aria-hidden="true">#</a> 运行</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker run -P -e MYSQL_ROOT_PASSWORD=123456 -d  --name mysql01 mysql:5.7 </span>
docker: Error response from daemon: Conflict. The container name <span class="token string">"/mysql01"</span> is already <span class="token keyword">in</span> use by container <span class="token string">"646014e4386df9378362b32465d06baf8ff3dd0c79b32a4017c4d189ab7e3a88"</span><span class="token builtin class-name">.</span> You have to remove <span class="token punctuation">(</span>or <span class="token function">rename</span><span class="token punctuation">)</span> that container to be able to reuse that name.
See <span class="token string">'docker run --help'</span><span class="token builtin class-name">.</span>
root@ubuntu:/tmp/host_data<span class="token comment"># docker run -P -e MYSQL_ROOT_PASSWORD=123456 -d mysql:5.7 </span>
f680877f03bc9786ee219b3a944f23e002dd7c20181e9b067d1a0f3ab706d24f
root@ubuntu:/tmp/host_data<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE                   COMMAND                  CREATED          STATUS                          PORTS                                                                                        NAMES
f680877f03bc   mysql:5.7               <span class="token string">"docker-entrypoint.s…"</span>   <span class="token number">4</span> seconds ago    Up <span class="token number">3</span> seconds                    <span class="token number">0.0</span>.0.0:49155-<span class="token operator">></span><span class="token number">3306</span>/tcp, :::49155-<span class="token operator">></span><span class="token number">3306</span>/tcp, <span class="token number">0.0</span>.0.0:49154-<span class="token operator">></span><span class="token number">33060</span>/tcp, :::49154-<span class="token operator">></span><span class="token number">33060</span>/tcp   festive_morse
22e49c33a330   billygoo/tomcat8-jdk8   <span class="token string">"catalina.sh run"</span>        <span class="token number">10</span> minutes ago   Up <span class="token number">10</span> minutes                   <span class="token number">0.0</span>.0.0:8080-<span class="token operator">></span><span class="token number">8080</span>/tcp, :::8080-<span class="token operator">></span><span class="token number">8080</span>/tcp                                                    tomcat03
9e194dbf7eca   tomcat                  <span class="token string">"catalina.sh run"</span>        <span class="token number">24</span> minutes ago   Up <span class="token number">24</span> minutes                   <span class="token number">0.0</span>.0.0:49153-<span class="token operator">></span><span class="token number">8080</span>/tcp, :::49153-<span class="token operator">></span><span class="token number">8080</span>/tcp                                                  tomcat02
c6b2169449f4   ubuntu                  <span class="token string">"bash"</span>                   <span class="token number">50</span> minutes ago   Up <span class="token number">50</span> minutes                                                                                                                ubuntu2
37d9f24e95a3   ubuntu                  <span class="token string">"bash"</span>                   <span class="token number">2</span> hours ago      Up <span class="token number">2</span> hours                                                                                                                   u1
f19e7fbc3d18   v2fly/v2fly-core        <span class="token string">"/usr/bin/v2ray -con…"</span>   <span class="token number">2</span> hours ago      Restarting <span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span> <span class="token number">18</span> seconds ago                                                                                                tcp

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>有可能自己的服务器mysql被占用3306所以选择随即动态端口</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ps -ef|grep mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="进入容器中" tabindex="-1"><a class="header-anchor" href="#进入容器中" aria-hidden="true">#</a> 进入容器中</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/tmp/host_data<span class="token comment"># docker exec -it f680877f03bc /bin/bash</span>
root@f680877f03bc:/<span class="token comment"># mysql -uroot -p</span>
Enter password: 
Welcome to the MySQL monitor.  Commands end with <span class="token punctuation">;</span> or <span class="token punctuation">\</span>g.
Your MySQL connection <span class="token function">id</span> is <span class="token number">2</span>
Server version: <span class="token number">5.7</span>.36 MySQL Community Server <span class="token punctuation">(</span>GPL<span class="token punctuation">)</span>

Copyright <span class="token punctuation">(</span>c<span class="token punctuation">)</span> <span class="token number">2000</span>, <span class="token number">2021</span>, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type <span class="token string">'help;'</span> or <span class="token string">'\h'</span> <span class="token keyword">for</span> help. Type <span class="token string">'\c'</span> to <span class="token function">clear</span> the current input statement.

mysql<span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="mysql操作" tabindex="-1"><a class="header-anchor" href="#mysql操作" aria-hidden="true">#</a> mysql操作</h2>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>mysql&gt; show databases;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在主机上同样可以使用工具连接远程的mysql</strong></p>
<h2 id="mysql使用容器卷" tabindex="-1"><a class="header-anchor" href="#mysql使用容器卷" aria-hidden="true">#</a> mysql使用容器卷</h2>
<blockquote>
<p>我们在使用MySQL的时候担心数据被删除怎么办，此时可以用到之前的卷了</p>
</blockquote>
<p><strong>避免中文乱码，同步时候要改字符集</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d -p 3306:3306 --privileged=true 
-v /mysql/log:/var/log/mysql 
-v /mysql/data:/var/lib/mysql
-v /mysql/conf:/etc/mysql/conf.d
-e MYSQL_ROOT_PASSWORD=123456
--name mysql_beifen
mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d -p 3306:3306 --privileged=true -v /mysql/log:/var/log/mysql -v /mysql/data:/var/lib/mysql -v /mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456 --name mysql_beifen mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="操作" tabindex="-1"><a class="header-anchor" href="#操作" aria-hidden="true">#</a> 操作</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)

mysql> create database mydata;
Query OK, 1 row affected (0.00 sec)

mysql> use mydata
Database changed
mysql> create table t(
    -> id int,
    -> name varchar(20));
Query OK, 0 rows affected (0.01 sec)

mysql> insert into t values(1,"zhangsan");
Query OK, 1 row affected (0.01 sec)

mysql> select * from t;
+------+----------+
| id   | name     |
+------+----------+
|    1 | zhangsan |
+------+----------+
1 row in set (0.00 sec)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>主机上可以看到同步</strong></p>
<h3 id="删除同步" tabindex="-1"><a class="header-anchor" href="#删除同步" aria-hidden="true">#</a> 删除同步</h3>
<blockquote>
<p>我们删除MySQL再创建</p>
</blockquote>
<div class="language-mysql ext-mysql line-numbers-mode"><pre v-pre class="language-mysql"><code>root@ubuntu:/# docker run -d -p 3306:3306 --privileged=true -v /mysql/log:/var/log/mysql -v /mysql/data:/var/lib/mysql -v /mysql/conf:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=123456 --name mysql_beifen mysql:5.7
1ff6de0064bdd2eba5acaf0ec5458ca72ae0973f5fec09cf4be2968f159335d3
root@ubuntu:/# docker ps
CONTAINER ID   IMAGE                   COMMAND                  CREATED             STATUS                         PORTS                                                  NAMES
1ff6de0064bd   mysql:5.7               &quot;docker-entrypoint.s…&quot;   11 seconds ago      Up 10 seconds                  0.0.0.0:3306-&gt;3306/tcp, :::3306-&gt;3306/tcp, 33060/tcp   mysql_beifen
22e49c33a330   billygoo/tomcat8-jdk8   &quot;catalina.sh run&quot;        47 minutes ago      Up 47 minutes                  0.0.0.0:8080-&gt;8080/tcp, :::8080-&gt;8080/tcp              tomcat03
9e194dbf7eca   tomcat                  &quot;catalina.sh run&quot;        About an hour ago   Up About an hour               0.0.0.0:49153-&gt;8080/tcp, :::49153-&gt;8080/tcp            tomcat02
c6b2169449f4   ubuntu                  &quot;bash&quot;                   About an hour ago   Up About an hour                                                                      ubuntu2
37d9f24e95a3   ubuntu                  &quot;bash&quot;                   2 hours ago         Up 2 hours                                                                            u1
f19e7fbc3d18   v2fly/v2fly-core        &quot;/usr/bin/v2ray -con…&quot;   2 hours ago         Restarting (2) 2 seconds ago                                                          tcp
root@ubuntu:/# docker exec -it 1ff6de0064bd /bin/bash 
root@1ff6de0064bd:/# mysql -uroot -p123456
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.7.36 MySQL Community Server (GPL)

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>由此可见，数据恢复过来了</strong></p>
</div></template>


