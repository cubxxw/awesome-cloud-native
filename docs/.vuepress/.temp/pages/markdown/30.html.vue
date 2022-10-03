<template><div><h1 id="docker-网络" tabindex="-1"><a class="header-anchor" href="#docker-网络" aria-hidden="true">#</a> docker 网络</h1>
<p>[toc]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p><img src="@source/markdown/images/9LKNck24Hi8G6qP.png" alt="image-20220513224338885"></p>
<p><strong>使用redis创建三主三从reids实例的时候</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -d --name redis-node-1 --net host --privileged=true \
-v /data/redis/share/redis-node-1:/data \
redis:6.0.8 --cluster-enabled yes --appendonly yes --port 6381
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>--net host</code>：网络模式</p>
<p><strong>在CentOS7的安装过程中如果有选择相关虚拟化的的服务安装系统后，启动网卡时会发现有一个以网桥连接的私网地址的virbr0网卡(virbr0网卡：它还有一个固定的默认IP地址192.168.122.1)，是做虚拟机网桥的使用的，其作用是为连接其上的虚机网卡提供 NAT访问外网的功能。</strong></p>
<p>我们之前学习Linux安装，勾选安装系统的时候附带了libvirt服务才会生成的一个东西，如果不需要可以直接将libvirtd服务卸载，</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum remove libvirt-libs.x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="docker启动后-网络情况" tabindex="-1"><a class="header-anchor" href="#docker启动后-网络情况" aria-hidden="true">#</a> docker启动后，网络情况</h2>
<p><strong>会产生一个名为docker0的虚拟网桥</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/text<span class="token comment"># ifconfig</span>
docker0: <span class="token assign-left variable">flags</span><span class="token operator">=</span><span class="token number">416</span><span class="token operator"><span class="token file-descriptor important">3</span>&lt;</span>UP,BROADCAST,RUNNING,MULTICAST<span class="token operator">></span>  mtu <span class="token number">1500</span>
        inet <span class="token number">172.17</span>.0.1  netmask <span class="token number">255.255</span>.0.0  broadcast <span class="token number">172.17</span>.255.255
        inet6 fe80::42:1cff:fea2:e40d  prefixlen <span class="token number">64</span>  scopeid 0x2<span class="token operator"><span class="token file-descriptor important">0</span>&lt;</span>link<span class="token operator">></span>
        ether 02:42:1c:a2:e4:0d  txqueuelen <span class="token number">0</span>  <span class="token punctuation">(</span>Ethernet<span class="token punctuation">)</span>
        RX packets <span class="token number">1018</span>  bytes <span class="token number">47380</span> <span class="token punctuation">(</span><span class="token number">47.3</span> KB<span class="token punctuation">)</span>
        RX errors <span class="token number">0</span>  dropped <span class="token number">0</span>  overruns <span class="token number">0</span>  frame <span class="token number">0</span>
        TX packets <span class="token number">1092</span>  bytes <span class="token number">22527365</span> <span class="token punctuation">(</span><span class="token number">22.5</span> MB<span class="token punctuation">)</span>
        TX errors <span class="token number">0</span>  dropped <span class="token number">0</span> overruns <span class="token number">0</span>  carrier <span class="token number">0</span>  collisions <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查看docker网络命令" tabindex="-1"><a class="header-anchor" href="#查看docker网络命令" aria-hidden="true">#</a> 查看docker网络命令</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@ubuntu:/text<span class="token comment"># docker network --help</span>

Usage:  <span class="token function">docker</span> network COMMAND

Manage networks

Commands:
  connect     Connect a container to a network
  create      Create a network
  disconnect  Disconnect a container from a network
  inspect     Display detailed information on one or <span class="token function">more</span> networks
  <span class="token function">ls</span>          List networks
  prune       Remove all unused networks
  <span class="token function">rm</span>          Remove one or <span class="token function">more</span> networks

Run <span class="token string">'docker network COMMAND --help'</span> <span class="token keyword">for</span> <span class="token function">more</span> information on a command.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>查看网络</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker network ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>查看网络源数据</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker network inspect XXX网络名字
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>删除网络</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker network rm XXX网络名字
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h2 id="作用" tabindex="-1"><a class="header-anchor" href="#作用" aria-hidden="true">#</a> 作用</h2>
<p><strong>·     容器间的互联和通信以及端口映射</strong></p>
<p><strong>·     容器IP变动时候可以通过服务名直接网络通信而不受到影响</strong></p>
</div></template>


