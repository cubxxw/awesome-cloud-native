<template><div><h1 id="docker搭建jenkins" tabindex="-1"><a class="header-anchor" href="#docker搭建jenkins" aria-hidden="true">#</a> docker搭建jenkins</h1>
<p>[toc]</p>
<h2 id="搭建" tabindex="-1"><a class="header-anchor" href="#搭建" aria-hidden="true">#</a> 搭建</h2>
<p>我是使用docker安装的</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code>docker pull jenkins/jenkins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行就好了</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d -P jenkins/jenkins
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>推荐使用后台<code v-pre>-d</code>运行，并且使用<code v-pre>-P</code>随机端口（本机端口可能被占用）</p>
</blockquote>
<p><img src="http://sm.nsddd.top/smimage-20221014112221910.png?xxw@nsddd.top" alt="image-20221014112221910"></p>
<h2 id="查看日志信息" tabindex="-1"><a class="header-anchor" href="#查看日志信息" aria-hidden="true">#</a> 查看日志信息</h2>
<p>因为后台不显示日志，我们需要看下日志</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker logs 83a154037dc6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>复制密码</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>5ec07ddf4e2e4289ab410e23e2431131
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221014112347419.png?xxw@nsddd.top" alt="image-20221014112347419"></p>
<h2 id="登陆" tabindex="-1"><a class="header-anchor" href="#登陆" aria-hidden="true">#</a> 登陆</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://localhost:49154
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>输入密码</p>
<p><img src="http://sm.nsddd.top/smimage-20221014112445132.png?xxw@nsddd.top" alt="image-20221014112445132"></p>
<p><strong>选择安装推荐的插件，然后等待插件安装完成，这个时间可以喝一杯咖啡，看一下docker文档</strong></p>
<ul>
<li>[x] <a href="https://docker.nsddd.top" target="_blank" rel="noopener noreferrer">docker.nsddd.top<ExternalLinkIcon/></a></li>
</ul>
<h2 id="使用" tabindex="-1"><a class="header-anchor" href="#使用" aria-hidden="true">#</a> 使用</h2>
<p><strong>创建用户名密码：</strong></p>
<p>创建第一个管理员用户:</p>
<table>
<thead>
<tr>
<th>用户名:</th>
<th>smile</th>
</tr>
</thead>
<tbody>
<tr>
<td>密码:</td>
<td>1234</td>
</tr>
<tr>
<td>确认密码:</td>
<td>1234</td>
</tr>
<tr>
<td>全名:</td>
<td>xiongxinwei</td>
</tr>
<tr>
<td>电子邮件地址:</td>
<td>3283172751@qq.com</td>
</tr>
</tbody>
</table>
<p><strong>配置实例：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://localhost:49154/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们使用GitHub作为版本控制服务器，我会使用的是最近创建的项目，<a href="https://github.com/cubxxw/cubgo-os" target="_blank" rel="noopener noreferrer">Go语言实现os<ExternalLinkIcon/></a>来进行演示</p>
<p><strong>创建任务名称：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>cubgo-os
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>选择自由风格：<code v-pre>Freestyle project</code></strong></p>
<p><strong>构建选项：</strong></p>
<p><img src="http://sm.nsddd.top/smimage-20221014113528513.png?xxw@nsddd.top" alt="image-20221014113528513"></p>
</div></template>


