<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第5节-集群搭建" tabindex="-1"><a class="header-anchor" href="#第5节-集群搭建" aria-hidden="true">#</a> 第5节 集群搭建</h1>
<div><a href = '4.md' style='float:left'>⬆️上一节🔗  </a><a href = '6.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#购买三台机器">购买三台机器</router-link><ul><li><router-link to="#推荐使用一个远程ssh工具">推荐使用一个远程ssh工具</router-link></li><li><router-link to="#创建私有网络">创建私有网络</router-link></li><li><router-link to="#使用交换机划分为隔离网络的小区域">使用交换机划分为隔离网络的小区域</router-link></li><li><router-link to="#过程截图">过程截图</router-link></li><li><router-link to="#搭建成功">搭建成功</router-link></li><li><router-link to="#显示图形化界面">显示图形化界面</router-link></li><li><router-link to="#必须要打开安全组的组内通信">必须要打开安全组的组内通信</router-link></li><li><router-link to="#vpc设置端口转化">vpc设置端口转化</router-link></li><li><router-link to="#准备链接">准备链接</router-link></li></ul></li><li><router-link to="#docker安装">docker安装</router-link><ul><li><router-link to="#_1、移除以前docker相关包">1、移除以前docker相关包</router-link></li><li><router-link to="#_2、配置yum源">2、配置yum源</router-link></li><li><router-link to="#_3、安装docker">3、安装docker</router-link></li><li><router-link to="#_4、启动">4、启动</router-link></li><li><router-link to="#_5、配置加速">5、配置加速</router-link></li></ul></li><li><router-link to="#kubeadm创建集群预备环境">kubeadm创建集群预备环境</router-link><ul><li><router-link to="#安装kubeadm">安装kubeadm</router-link></li><li><router-link to="#设置所有机器的主机名称">设置所有机器的主机名称</router-link></li><li><router-link to="#将-selinux-设置为-permissive-模式">将 SELinux 设置为 permissive 模式</router-link></li><li><router-link to="#关闭所有机器的交换分区">关闭所有机器的交换分区</router-link></li><li><router-link to="#允许-iptables-检查桥接流量">允许 iptables 检查桥接流量</router-link></li></ul></li><li><router-link to="#安装集群的三大件">安装集群的三大件</router-link></li><li><router-link to="#使用kubeadm引导集群">使用kubeadm引导集群</router-link><ul><li><router-link to="#下载各个机器需要的镜像">下载各个机器需要的镜像</router-link></li><li><router-link to="#初始化主结点">初始化主结点</router-link></li><li><router-link to="#根据提示继续">根据提示继续</router-link></li><li><router-link to="#加入node节点">加入node节点</router-link></li></ul></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="购买三台机器" tabindex="-1"><a class="header-anchor" href="#购买三台机器" aria-hidden="true">#</a> 购买三台机器</h2>
<blockquote>
<p>在青鸟云上创建账户，并且联系客户申请IP扩容为三个</p>
<p><img src="http://sm.cubxxw.com/smimage-20221018114541669.png" alt="image-20221018114541669"></p>
</blockquote>
<h3 id="推荐使用一个远程ssh工具" tabindex="-1"><a class="header-anchor" href="#推荐使用一个远程ssh工具" aria-hidden="true">#</a> 推荐使用一个远程ssh工具</h3>
<blockquote>
<p>支持批量的输入，很适合集群的搭建~</p>
</blockquote>
<ul>
<li>[x] <a href="https://electerm.github.io/electerm/" target="_blank" rel="noopener noreferrer">electerm开源地址<ExternalLinkIcon/></a></li>
</ul>
<p><img src="http://sm.cubxxw.com/smimage-20221018122201424.png" alt="image-20221018122201424"></p>
<h3 id="创建私有网络" tabindex="-1"><a class="header-anchor" href="#创建私有网络" aria-hidden="true">#</a> 创建私有网络</h3>
<p><img src="http://sm.cubxxw.com/smimage-20221018142107989.png" alt="image-20221018142107989"></p>
<p><img src="http://sm.cubxxw.com/smimage-20221018142057391.png" alt="image-20221018142057391"></p>
<h3 id="使用交换机划分为隔离网络的小区域" tabindex="-1"><a class="header-anchor" href="#使用交换机划分为隔离网络的小区域" aria-hidden="true">#</a> 使用交换机划分为隔离网络的小区域</h3>
<p><img src="http://sm.cubxxw.com/smimage-20221018142311011.png" alt="image-20221018142311011"></p>
<h3 id="过程截图" tabindex="-1"><a class="header-anchor" href="#过程截图" aria-hidden="true">#</a> 过程截图</h3>
<p><img src="http://sm.cubxxw.com/smimage-20221018143420128.png" alt="image-20221018143420128"></p>
<blockquote>
<p>⚠️ 上面一定要注意：内网的范围一定要选择<code v-pre>172.31.0.24/24</code></p>
<p>因为后面安装docker的时候，docker占了<code v-pre>172.17</code>占了</p>
</blockquote>
<h3 id="搭建成功" tabindex="-1"><a class="header-anchor" href="#搭建成功" aria-hidden="true">#</a> 搭建成功</h3>
<p><img src="http://sm.cubxxw.com/smimage-20221018143510468.png" alt="image-20221018143510468"></p>
<h3 id="显示图形化界面" tabindex="-1"><a class="header-anchor" href="#显示图形化界面" aria-hidden="true">#</a> 显示图形化界面</h3>
<blockquote>
<p>可以看到<code v-pre>vpc</code>和防火墙以及三台主机之间的关联。</p>
</blockquote>
<p><img src="http://sm.cubxxw.com/smimage-20221018143709858.png" alt="image-20221018143709858"></p>
<h3 id="必须要打开安全组的组内通信" tabindex="-1"><a class="header-anchor" href="#必须要打开安全组的组内通信" aria-hidden="true">#</a> 必须要打开安全组的组内通信</h3>
<blockquote>
<p><strong>只有打开组内通信</strong>，防火墙即使不开端口也是可以互相访问的~</p>
</blockquote>
<p><img src="http://sm.cubxxw.com/smimage-20221018143918187.png" alt="image-20221018143918187"></p>
<h3 id="vpc设置端口转化" tabindex="-1"><a class="header-anchor" href="#vpc设置端口转化" aria-hidden="true">#</a> vpc设置端口转化</h3>
<blockquote>
<p>vpc默认免费的是不会提供公网IP的，因为现在公网的IP紧缺，所以vpc在一定程度上需要满足这个条件，使用vpc的端口转化，可以帮助我们解决问题。这是因为vpc外网端口可以自定义。</p>
<p>⚠️ 注意要开放对应的安全组</p>
</blockquote>
<table>
<thead>
<tr>
<th style="text-align:left">类型</th>
<th style="text-align:left">ID</th>
<th style="text-align:left">名称</th>
<th style="text-align:left">角色</th>
<th style="text-align:left">状态</th>
<th style="text-align:left">IP 地址</th>
<th style="text-align:left">IPv6 地址</th>
<th style="text-align:left">DHCP 选项</th>
<th style="text-align:left">操作</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">云服务器</td>
<td style="text-align:left"><a href="https://console.qingcloud.com/sh1/instances/instances/i-jj9igf99/" target="_blank" rel="noopener noreferrer">i-jj9igf99<ExternalLinkIcon/></a></td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td style="text-align:left">运行中</td>
<td style="text-align:left">192.168.0.2</td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td style="text-align:left">[ 修改 ]</td>
</tr>
<tr>
<td style="text-align:left">云服务器</td>
<td style="text-align:left"><a href="https://console.qingcloud.com/sh1/instances/instances/i-hdazrzq7/" target="_blank" rel="noopener noreferrer">i-hdazrzq7<ExternalLinkIcon/></a></td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td style="text-align:left">运行中</td>
<td style="text-align:left">192.168.0.3</td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td style="text-align:left">[ 修改 ]</td>
</tr>
<tr>
<td style="text-align:left">云服务器</td>
<td style="text-align:left"><a href="https://console.qingcloud.com/sh1/instances/instances/i-bujgg88x/" target="_blank" rel="noopener noreferrer">i-bujgg88x<ExternalLinkIcon/></a></td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td style="text-align:left">运行中</td>
<td style="text-align:left">192.168.0.4</td>
<td style="text-align:left"></td>
<td style="text-align:left"></td>
<td style="text-align:left">[ 修改 ]</td>
</tr>
</tbody>
</table>
<p><img src="http://sm.cubxxw.com/smimage-20221018151846925.png" alt="image-20221018151846925"></p>
<h3 id="准备链接" tabindex="-1"><a class="header-anchor" href="#准备链接" aria-hidden="true">#</a> 准备链接</h3>
<blockquote>
<p>我开始也设置了一些基础的脚本，方便ce'shi</p>
</blockquote>
<p><img src="http://sm.cubxxw.com/smimage-20221018152452648.png" alt="image-20221018152452648"></p>
<h2 id="docker安装" tabindex="-1"><a class="header-anchor" href="#docker安装" aria-hidden="true">#</a> docker安装</h2>
<h3 id="_1、移除以前docker相关包" tabindex="-1"><a class="header-anchor" href="#_1、移除以前docker相关包" aria-hidden="true">#</a> 1、移除以前docker相关包</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum remove <span class="token function">docker</span> <span class="token punctuation">\</span>
                  docker-client <span class="token punctuation">\</span>
                  docker-client-latest <span class="token punctuation">\</span>
                  docker-common <span class="token punctuation">\</span>
                  docker-latest <span class="token punctuation">\</span>
                  docker-latest-logrotate <span class="token punctuation">\</span>
                  docker-logrotate <span class="token punctuation">\</span>
                  docker-engine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、配置yum源" tabindex="-1"><a class="header-anchor" href="#_2、配置yum源" aria-hidden="true">#</a> 2、配置yum源</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> yum-utils
<span class="token function">sudo</span> yum-config-manager <span class="token punctuation">\</span>
	--add-repo <span class="token punctuation">\</span>
	http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、安装docker" tabindex="-1"><a class="header-anchor" href="#_3、安装docker" aria-hidden="true">#</a> 3、安装docker</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce docker-ce-cli containerd.io


<span class="token comment">#以下是在安装k8s的时候使用</span>
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> docker-ce-20.10.7 docker-ce-cli-20.10.7  containerd.io-1.4.6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、启动" tabindex="-1"><a class="header-anchor" href="#_4、启动" aria-hidden="true">#</a> 4、启动</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl <span class="token builtin class-name">enable</span> <span class="token function">docker</span> <span class="token parameter variable">--now</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_5、配置加速" tabindex="-1"><a class="header-anchor" href="#_5、配置加速" aria-hidden="true">#</a> 5、配置加速</h3>
<p>这里额外添加了docker的生产环境核心配置cgroup</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/docker
<span class="token function">sudo</span> <span class="token function">tee</span> /etc/docker/daemon.json <span class="token operator">&lt;&lt;-</span><span class="token string">'EOF'
{
  "registry-mirrors": ["https://82m9ar63.mirror.aliyuncs.com"],
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF</span>
<span class="token function">sudo</span> systemctl daemon-reload
<span class="token function">sudo</span> systemctl restart <span class="token function">docker</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kubeadm创建集群预备环境" tabindex="-1"><a class="header-anchor" href="#kubeadm创建集群预备环境" aria-hidden="true">#</a> kubeadm创建集群预备环境</h2>
<p>虽然有了 Kubernetes 的一些 预开发版本，比如说 k3s、 k0s、 minikuber、Kind、但是官方还是最推荐的 Kubeadm，而且在 kubernetes 1.3版本后也是可以将 kubeadm 用于生产环境。</p>
<h3 id="安装kubeadm" tabindex="-1"><a class="header-anchor" href="#安装kubeadm" aria-hidden="true">#</a> 安装kubeadm</h3>
<ul>
<li>
<p>一台兼容的 Linux 主机。Kubernetes 项目为基于 Debian 和 Red Hat 的 Linux 发行版以及一些不提供包管理器的发行版提供通用的指令</p>
</li>
<li>
<p>每台机器 2 GB 或更多的 RAM （如果少于这个数字将会影响你应用的运行内存)</p>
</li>
<li>
<p>2 CPU 核或更多（我测试的 2核2G 的很卡）</p>
</li>
<li>
<p>集群中的所有机器的网络彼此均能相互连接(公网和内网都可以)</p>
</li>
<li>
<p><strong>设置防火墙放行规则</strong></p>
</li>
<li>
<p>节点之中不可以有重复的主机名、MAC 地址或 product_uuid。请参见<a href="https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#verify-mac-address" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a>了解更多详细信息。</p>
</li>
<li>
<p>主机名：<code v-pre>[root@i-0xkmp3n1 /]# </code> 一般不会重复     <strong>设置不同hostname</strong></p>
</li>
<li>
<p>开启机器上的某些端口。请参见<a href="https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#check-required-ports" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a> 了解更多详细信息。--  <strong>内网互信</strong></p>
</li>
<li>
<p>禁用交换分区。为了保证 kubelet 正常工作，你 <strong>必须</strong> 禁用交换分区。 <strong>永久关闭</strong></p>
</li>
</ul>
<h3 id="设置所有机器的主机名称" tabindex="-1"><a class="header-anchor" href="#设置所有机器的主机名称" aria-hidden="true">#</a> 设置所有机器的主机名称</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>hostnamectl set-hostname k8s-master <span class="token comment"># 第一台机器</span>
hostnamectl set-hostname k8s-node2 <span class="token comment"># 第二台机器</span>
hostnamectl set-hostname k8s-node3 <span class="token comment"># 第三台机器</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="将-selinux-设置为-permissive-模式" tabindex="-1"><a class="header-anchor" href="#将-selinux-设置为-permissive-模式" aria-hidden="true">#</a> 将 SELinux 设置为 permissive 模式</h3>
<blockquote>
<p>将 SELinux 设置为 permissive 模式（相当于将其禁用）</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> setenforce <span class="token number">0</span>  <span class="token comment">#临时</span>
<span class="token function">sudo</span> <span class="token function">sed</span> <span class="token parameter variable">-i</span> <span class="token string">'s/^SELINUX=enforcing$/SELINUX=permissive/'</span> /etc/selinux/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="关闭所有机器的交换分区" tabindex="-1"><a class="header-anchor" href="#关闭所有机器的交换分区" aria-hidden="true">#</a> 关闭所有机器的交换分区</h3>
<blockquote>
<p>查看分区：<code v-pre>free -m</code></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#关闭swap</span>
swapoff <span class="token parameter variable">-a</span>  <span class="token comment">#临时</span>
<span class="token function">sed</span> <span class="token parameter variable">-ri</span> <span class="token string">'s/.*swap.*/#&amp;/'</span> /etc/fstab <span class="token comment">#永久</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="允许-iptables-检查桥接流量" tabindex="-1"><a class="header-anchor" href="#允许-iptables-检查桥接流量" aria-hidden="true">#</a> 允许 iptables 检查桥接流量</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/modules-load.d/k8s.conf</span>
br_netfilter
EOF</span>

<span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/sysctl.d/k8s.conf</span>
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF</span>
<span class="token function">sudo</span> <span class="token function">sysctl</span> <span class="token parameter variable">--system</span>  <span class="token comment"># 让配置生效</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装集群的三大件" tabindex="-1"><a class="header-anchor" href="#安装集群的三大件" aria-hidden="true">#</a> 安装集群的三大件</h2>
<p>我们上一节看到了马车的三大件，我们集群也是有三大件的😂😂</p>
<p>集群的搭建也是很有意思的，和redis的三主三从，Hadoop的搭建类似</p>
<blockquote>
<p>安装kubelet、kubeadm、kubectl</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">&lt;&lt;</span><span class="token string">EOF<span class="token bash punctuation"> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/yum.repos.d/kubernetes.repo</span>
[kubernetes]
name=Kubernetes
baseurl=http://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=0
repo_gpgcheck=0
gpgkey=http://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg
   http://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
exclude=kubelet kubeadm kubectl
EOF</span>


<span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> kubelet-1.20.9 kubeadm-1.20.9 kubectl-1.20.9 <span class="token parameter variable">--disableexcludes</span><span class="token operator">=</span>kubernetes   <span class="token comment"># 安装三大件</span>

<span class="token function">sudo</span> systemctl <span class="token builtin class-name">enable</span> <span class="token parameter variable">--now</span> kubelet   <span class="token comment"># 所有机器启动kublet</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>需要注意的是：kubelet 现在每隔几秒就会重启，因为它陷入了一个等待 kubeadm 指令的死循环</p>
</blockquote>
<h2 id="使用kubeadm引导集群" tabindex="-1"><a class="header-anchor" href="#使用kubeadm引导集群" aria-hidden="true">#</a> 使用kubeadm引导集群</h2>
<ol>
<li>下载各个机器需要的镜像</li>
<li>初始化主结点</li>
<li>根据提示继续</li>
<li>加入node结点</li>
</ol>
<blockquote>
<p>其实在<code v-pre>k8s</code>中，除了<code v-pre>kubelet</code> （因为 kubelet 不能被阉割，它是容器和宿主机的桥梁），剩下的镜像都是以容器的方式运行。<code v-pre>kubelet</code>类似于厂长，我们为了避免下载中断，所以准备的是脚本。</p>
</blockquote>
<h3 id="下载各个机器需要的镜像" tabindex="-1"><a class="header-anchor" href="#下载各个机器需要的镜像" aria-hidden="true">#</a> 下载各个机器需要的镜像</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">tee</span> ./images.sh <span class="token operator">&lt;&lt;-</span><span class="token string">'EOF'
#!/bin/bash
images=(
kube-apiserver:v1.20.9
kube-proxy:v1.20.9
kube-controller-manager:v1.20.9
kube-scheduler:v1.20.9
coredns:1.7.0
etcd:3.4.13-0
pause:3.2
)
for imageName in ${images[@]} ; do
docker pull registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images/$imageName
done
EOF</span>
   
<span class="token function">chmod</span> +x ./images.sh <span class="token operator">&amp;&amp;</span> ./images.sh  <span class="token comment">#授予权限并且执行脚本</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>大概等了一会会就可以检索了</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221018173701125.png" alt="image-20221018173701125"></p>
</blockquote>
<h3 id="初始化主结点" tabindex="-1"><a class="header-anchor" href="#初始化主结点" aria-hidden="true">#</a> 初始化主结点</h3>
<blockquote>
<p>⚠️ 下面一定要按照自己的情况修改</p>
<p>使用<code v-pre>ip addr(ip a)</code>查看自己的内网地址。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>192.168.0.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/smimage-20221018174044509.png" alt="image-20221018174044509"></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#所有机器添加master域名映射，以下需要修改为自己的</span>
<span class="token builtin class-name">echo</span> <span class="token string">"192.168.0.2  cluster-endpoint"</span> <span class="token operator">>></span> /etc/hosts  <span class="token comment"># 每一个结点都需要输入</span>
<span class="token comment"># 需要每一个结点能ping通</span>

<span class="token comment">#主节点初始化 --apiserver-advertise-address改为master结点ip</span>
kubeadm init <span class="token punctuation">\</span>
--apiserver-advertise-address<span class="token operator">=</span><span class="token number">192.168</span>.0.2 <span class="token punctuation">\</span>  
--control-plane-endpoint<span class="token operator">=</span>cluster-endpoint <span class="token punctuation">\</span>
--image-repository registry.cn-hangzhou.aliyuncs.com/lfy_k8s_images <span class="token punctuation">\</span>
--kubernetes-version v1.20.9 <span class="token punctuation">\</span>
--service-cidr<span class="token operator">=</span><span class="token number">10.96</span>.0.0/16 <span class="token punctuation">\</span>
--pod-network-cidr<span class="token operator">=</span><span class="token number">192.168</span>.0.0/16

<span class="token comment">#所有网络范围不重叠</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>参考：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm init --pod-network-cidr<span class="token operator">=</span><span class="token number">10.244</span>.0.0/16 --apiserver-advertise-address<span class="token operator">=</span><span class="token number">192.168</span>.131.128
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<p>📜 对上面的解释：</p>
<blockquote>
<p>一定要注意每一个结点都需要能 <code v-pre>ping</code>通<code v-pre>cluster-endpoint</code></p>
<p>主节点初始化：注意版本和网络范围的配置，这个挺麻烦的后面除非特别深入这一块，否则不要改。</p>
<p><code v-pre>--apiserver-advertise-address</code>一定要改成自己的<code v-pre>master</code>结点的<code v-pre>ip</code></p>
<p><strong>如果要改：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>--service-cidr<span class="token operator">=</span><span class="token number">10.96</span>.0.0/16 <span class="token punctuation">\</span>
--pod-network-cidr<span class="token operator">=</span><span class="token number">192.168</span>.0.0/16
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>所有网络范围一定不能重叠！！！</p>
<p><code v-pre>--apiserver-advertise-address</code> 可以设置 control-plane 节点 API server 的 通告地址。
<code v-pre>--control-plane-endpoint</code> 可以设置所有control-plane 节点的 shared endpoint。
<code v-pre>--control-plane-endpoint</code> 允许IP地址，也允许DNS names。请联系管理员设置DNS和IP的映射。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>你的Kubernetes控制平面已经初始化成功<span class="token operator">!</span>

要开始使用您的集群，您需要作为普通用户运行以下命令:

  <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token environment constant">$HOME</span>/.kube
  <span class="token function">sudo</span> <span class="token function">cp</span> <span class="token parameter variable">-i</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/.kube/config
  <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/.kube/config

或者，如果你是root用户，你可以运行:

  <span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/kubernetes/admin.conf

现在应该将pod网络部署到集群。
Run <span class="token string">"kubectl apply -f [podnetwork].yaml"</span> with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

您现在可以通过复制证书颁发机构来加入任意数量的控制平面节点
和每个节点上的服务帐户密钥，然后以root身份运行以下命令:

  kubeadm <span class="token function">join</span> cluster-endpoint:6443 <span class="token parameter variable">--token</span> hums8f.vyx71prsg74ofce7 <span class="token punctuation">\</span>
    --discovery-token-ca-cert-hash sha256:a394d059dd51d68bb007a532a037d0a477131480ae95f75840c461e85e2c6ae3 <span class="token punctuation">\</span>
    --control-plane 

然后你可以加入任意数量的工作节点，在每个工作节点上以root身份运行以下命令:

kubeadm <span class="token function">join</span> cluster-endpoint:6443 <span class="token parameter variable">--token</span> hums8f.vyx71prsg74ofce7 <span class="token punctuation">\</span>
    --discovery-token-ca-cert-hash sha256:a394d059dd51d68bb007a532a037d0a477131480ae95f75840c461e85e2c6ae3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意替换 token</p>
</blockquote>
<p><strong>继续：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#查看集群所有节点</span>
kubectl get nodes

<span class="token comment">#根据配置文件，给集群创建资源</span>
kubectl apply <span class="token parameter variable">-f</span> xxxx.yaml

<span class="token comment">#查看集群部署了哪些应用？</span>
<span class="token function">docker</span> <span class="token function">ps</span>   <span class="token operator">==</span><span class="token operator">=</span>   kubectl get pods <span class="token parameter variable">-A</span>

<span class="token comment"># 运行中的应用在docker里面叫容器，在k8s里面叫Pod</span>
kubectl get pods <span class="token parameter variable">-A</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="根据提示继续" tabindex="-1"><a class="header-anchor" href="#根据提示继续" aria-hidden="true">#</a> 根据提示继续</h3>
<p>master成功后提示如下：</p>
<p><img src="http://sm.cubxxw.com/smimage-20221018185049721.png" alt=""></p>
<p>1、设置<code v-pre>.kube/config</code></p>
<p>2、安装网络组件</p>
<ul>
<li>[x] <a href="https://docs.projectcalico.org/getting-started/kubernetes/self-managed-onprem/onpremises#install-calico-with-kubernetes-api-datastore-more-than-50-nodes" target="_blank" rel="noopener noreferrer">calico官网<ExternalLinkIcon/></a></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> https://docs.projectcalico.org/manifests/calico.yaml <span class="token parameter variable">-O</span>
kubectl apply <span class="token parameter variable">-f</span> calico.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="加入node节点" tabindex="-1"><a class="header-anchor" href="#加入node节点" aria-hidden="true">#</a> 加入node节点</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kubeadm <span class="token function">join</span> cluster-endpoint:6443 <span class="token parameter variable">--token</span> x5g4uy.wpjjdbgra92s25pp <span class="token punctuation">\</span>
	--discovery-token-ca-cert-hash sha256:6255797916eaee52bf9dda9429db616fcd828436708345a308f4b917d3457a22
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>新令牌</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubeadm token create --print-join-command
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><em><strong>高可用部署方式，也是在这一步的时候，使用添加主节点的命令即可</strong></em></p>
</blockquote>
<p>当然，这些其实都是小问题，后期的运维和维护才是 大 boss， 这也是我们穷尽一生去学习的。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '4.md' style='float:left'>⬆️上一节🔗  </a><a href = '6.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://cubxxw.com/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


