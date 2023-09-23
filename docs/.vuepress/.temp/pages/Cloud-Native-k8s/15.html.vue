<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第15节-k3s-补充" tabindex="-1"><a class="header-anchor" href="#第15节-k3s-补充" aria-hidden="true">#</a> 第15节 k3s 补充</h1>
<div><a href = '14.md' style='float:left'>⬆️上一节🔗  </a><a href = '16.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#资源分析">资源分析</router-link><ul><li><router-link to="#usr-local-bin-重要二进制">/usr/local/bin 重要二进制</router-link></li></ul></li><li><router-link to="#脚本安装选项">脚本安装选项</router-link><ul><li><router-link to="#总结">总结</router-link></li></ul></li><li><router-link to="#对二进制的安装高级补充">对二进制的安装高级补充</router-link></li><li><router-link to="#通过配置文件启动-k3s">通过配置文件启动 K3s</router-link></li><li><router-link to="#k3s-server-agent-配置">K3s Server/Agent 配置</router-link></li><li><router-link to="#网络选项">网络选项</router-link><ul><li><router-link to="#flannel-选项">Flannel 选项</router-link></li><li><router-link to="#flannel-backend-使用-host-gw">flannel-backend 使用 host-gw</router-link></li><li><router-link to="#启用-directrouting">启用 Directrouting</router-link></li></ul></li><li><router-link to="#自定义-cni">自定义 CNI</router-link></li><li><router-link to="#使用外部数据库实现高可用安装">使用外部数据库实现高可用安装</router-link><ul><li><router-link to="#环境准备">环境准备</router-link></li><li><router-link to="#外部数据库高可用">外部数据库高可用</router-link></li><li><router-link to="#agent-加入">agent 加入</router-link></li><li><router-link to="#没有-cli-标志启动-agent-加入">没有 CLI 标志启动 agent 加入</router-link></li></ul></li><li><router-link to="#嵌入式db-ha">嵌入式DB HA</router-link></li><li><router-link to="#集群数据存储选项">集群数据存储选项</router-link><ul><li><router-link to="#配置参数">配置参数</router-link></li></ul></li><li><router-link to="#私有仓库">私有仓库</router-link><ul><li><router-link to="#registries-yaml-文件">registries.yaml 文件</router-link></li><li><router-link to="#配置-containerd">配置 Containerd</router-link></li><li><router-link to="#将映像添加到专用注册表">将映像添加到专用注册表</router-link></li></ul></li><li><router-link to="#离线安装">离线安装</router-link><ul><li><router-link to="#通过私有镜像仓库安装-k3s">通过私有镜像仓库安装 K3s</router-link></li></ul></li><li><router-link to="#升级-k3s">升级 K3s</router-link><ul><li><router-link to="#通过脚本升级">通过脚本升级</router-link></li><li><router-link to="#在线脚本升级">在线脚本升级</router-link></li><li><router-link to="#channels-说明">Channels 说明</router-link></li><li><router-link to="#使用安装脚本升级-k3s">使用安装脚本升级 K3s</router-link></li><li><router-link to="#自动升级">自动升级</router-link></li></ul></li><li><router-link to="#连接到-k3s-kubernets-集群的三种方式">连接到 k3s kubernets 集群的三种方式</router-link><ul><li><router-link to="#kubeconfig">kubeconfig</router-link></li><li><router-link to="#kubectl">kubectl</router-link></li><li><router-link to="#lens-kubernetes-ide">Lens Kubernetes IDE</router-link></li></ul></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>页面内容太多卡顿，新开后半部分补充~</p>
<ul>
<li><a href="https://docker.nsddd.top/Cloud-Native/7.html" target="_blank" rel="noopener noreferrer">k3s vs k0s<ExternalLinkIcon/></a></li>
</ul>
</div>
<h2 id="资源分析" tabindex="-1"><a class="header-anchor" href="#资源分析" aria-hidden="true">#</a> 资源分析</h2>
<p>资源占用率低是 k3s 突出的特点，针对 k3s 特性，分析资源的占用：</p>
<p><strong>影响资源利用率的因素：</strong></p>
<ul>
<li>
<p><code v-pre>K3s server</code>：K3s server 的利用率数据主要是由支持 Kubernetes 数据存储（kine 或 etcd）、API Server、Controller-Manager 和 Scheduler 控制。 <strong>创建/修改/删除</strong> 资源将导致暂时的利用率上升。大量使用 Kubernetes 数据存储的 operators 或应用程序也将增加 server 的资源需求。</p>
</li>
<li>
<p><code v-pre>K3s agent</code>：管理镜像、提供 <strong>存储或创建/销毁容器</strong> 的操作将导致利用率的暂时上升，拉取镜像通常会影响 CPU 和 IO，因为它们涉及将镜像内容解压到磁盘。如果可能的话，工作负载存储(pod 临时存储和卷)应该与 agent 组件( <code v-pre>/var/lib/rancher/k3s/agent</code> )隔离，以确保不会出现资源冲突。</p>
</li>
</ul>
<p><strong>防止 agent 和工作负载干扰集群数据存储：</strong></p>
<ul>
<li>
<p>在 <code v-pre>server</code> 节点运行工作负载 pod 时，应确保 <code v-pre>agent</code> 和工作负载 <code v-pre>IOPS</code> 不干扰数据存储。</p>
</li>
<li>
<p>将 <code v-pre>server</code> 组件（<code v-pre>/var/lib/rancher/k3s/server</code>）与 <code v-pre>agent</code> 组件（<code v-pre>/var/lib/rancher/k3s/agent</code>）放在不同的存储介质上，后者包括 <code v-pre>containerd</code> 镜像存储。</p>
</li>
<li>
<p>工作负载存储（<code v-pre>pod</code> 临时存储和卷）也应该与数据存储隔离。</p>
</li>
</ul>
<h3 id="usr-local-bin-重要二进制" tabindex="-1"><a class="header-anchor" href="#usr-local-bin-重要二进制" aria-hidden="true">#</a> /usr/local/bin 重要二进制</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>后面的测试都是和 <code v-pre>/usr/local/bin</code> 息息相关，就比如说每一次测试删除：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/usr/local/bin/k3s-uninstall.sh 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>同样的还有停止 k3s：</strong></p>
<p>为了在升级期间实现高可用性，K3s 容器在 K3s 服务停止时会继续运行。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/usr/local/bin/k3s-killall.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>killall 脚本能清理容器、K3s 目录和网络组件，同时还能删除 iptables 链以及所有相关规则。集群数据不会被删除。</p>
<p>🏄‍♂️ 同样可以使用 <code v-pre>systemctl start k3s</code> ，目前发现效果一样，如果你觉得不一样，联系下我~</p>
<p><strong>当然 k3s 都是围绕着 k3s 脚本为中心的：</strong></p>
</div>
<h2 id="脚本安装选项" tabindex="-1"><a class="header-anchor" href="#脚本安装选项" aria-hidden="true">#</a> 脚本安装选项</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>我们现在已经知道了关于脚本的选项两种方式，<strong>环境变量</strong> 或者 <strong>标志</strong> 。</p>
<p>⚠️ 注意，如果你选择 <strong>下载install.sh</strong> 使用 https://ghproxy.com ，后面的所有脚本我都是使用：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn   <span class="token assign-left variable">INSTALL_K3S_SYMLINK</span><span class="token operator">=</span>skip  <span class="token function">sh</span> install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>以 &quot;K3S_&quot;开头的环境变量将被保留，供 systemd 和 openrc 服务使用。</p>
<p>在没有明确设置 exec 命令的情况下设置<code v-pre>K3S_URL</code>，会将命令默认为 &quot;agent&quot;。</p>
<p>运行 agent 时还必须设置<code v-pre>K3S_TOKEN</code>。</p>
</div>
<p><code v-pre>INSTALL_K3S_SKIP_DOWNLOAD</code> -- (用于离线安装) 如果设置为 &quot;true &quot;将不会下载 K3s 的哈希值或二进制。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
    <span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true <span class="token punctuation">\</span>
    <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>INSTALL_K3S_SYMLINK</code> -- 默认情况下，如果路径中不存在命令，将为 <code v-pre>kubectl</code>、<code v-pre>crictl</code> 和 <code v-pre>ctr</code> 二进制文件创建符号链接。如果设置为 <code v-pre>'skip'</code> 将不会创建符号链接，而 <code v-pre>'force'</code> 将覆盖。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_SYMLINK</span><span class="token operator">=</span>skip <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>测试(默认情况）：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@etcnode01:/usr/local/bin<span class="token comment"># ls -al</span>
total <span class="token number">66164</span>
drwxr-xr-x  <span class="token number">2</span> root root     <span class="token number">4096</span> Nov <span class="token number">26</span> 09:40 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">10</span> root root     <span class="token number">4096</span> Aug <span class="token number">31</span> 06:52 <span class="token punctuation">..</span>
lrwxrwxrwx  <span class="token number">1</span> root root        <span class="token number">3</span> Nov <span class="token number">26</span> 06:19 crictl -<span class="token operator">></span> k3s
-rwxr-xr-x  <span class="token number">1</span> root root <span class="token number">67735552</span> Nov <span class="token number">26</span> 06:19 k3s
-rwxr-xr-x  <span class="token number">1</span> root root     <span class="token number">1433</span> Nov <span class="token number">26</span> 06:19 k3s-agent-uninstall.sh
-rwxr-xr-x  <span class="token number">1</span> root root     <span class="token number">2026</span> Nov <span class="token number">26</span> 06:19 k3s-killall.sh
lrwxrwxrwx  <span class="token number">1</span> root root        <span class="token number">3</span> Nov <span class="token number">26</span> 06:19 kubectl -<span class="token operator">></span> k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>测试（指定环境变量）：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/usr/local/bin<span class="token comment"># ls -al</span>
total <span class="token number">66168</span>
drwxr-xr-x  <span class="token number">2</span> root root     <span class="token number">4096</span> Nov <span class="token number">26</span> <span class="token number">11</span>:16 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">10</span> root root     <span class="token number">4096</span> Aug <span class="token number">31</span> 06:52 <span class="token punctuation">..</span>
-rwxr-xr-x  <span class="token number">1</span> root root <span class="token number">67735552</span> Nov <span class="token number">26</span> <span class="token number">11</span>:16 k3s
-rwxr-xr-x  <span class="token number">1</span> root root     <span class="token number">2026</span> Nov <span class="token number">26</span> <span class="token number">11</span>:16 k3s-killall.sh
-rwxr-xr-x  <span class="token number">1</span> root root     <span class="token number">1397</span> Nov <span class="token number">26</span> <span class="token number">11</span>:16 k3s-uninstall.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>⚠️ 我在上一节介绍了使用 <strong>别名</strong> ，它可以派上用场了。</p>
</div>
<p><code v-pre>INSTALL_K3S_SKIP_ENABLE</code> -- 如果设置为 &quot;true&quot;，将不启用或启动 K3s 服务。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_SKIP_ENABLE</span><span class="token operator">=</span>true <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>开启：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>systemctl start k3s
kubectl get nodes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p><code v-pre>INSTALL_K3S_SKIP_START</code> -- 如果设置为 &quot;true &quot;将不会启动 K3s 服务。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_SKIP_START</span><span class="token operator">=</span>true <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>INSTALL_K3S_VERSION</code> -- 从 Github 下载 K3s 的版本。如果没有指定，将尝试从&quot;stable&quot;频道下载。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_VERSION</span><span class="token operator">=</span><span class="token string">"v1.19.9+k3s1"</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意后面是 <code v-pre>+</code></p>
</blockquote>
<p><code v-pre>INSTALL_K3S_BIN_DIR</code> -- 安装 K3s 二进制文件、链接和卸载脚本的目录，或者使用 <code v-pre>/usr/local/bin</code> 作为默认目录。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_BIN_DIR</span><span class="token operator">=</span>/opt/bin <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>这里有个坑，它給设置 二进制文件路径，但是不给改变环境变量路径~</p>
<p>一个 idea ：如果我们创建的 hash 目录，我们是不是可以将 roofs 设置为环境变量，就比如说 <code v-pre>cd ~k3s</code>   OR   <code v-pre>cd $K3S</code></p>
<p>我们只需要拿到 hash 路径  <code v-pre>export K3S=&quot;/var/lib/rancher/k3s/data/${HASH}/bin&quot;</code></p>
</div>
<p><code v-pre>INSTALL_K3S_BIN_DIR_READ_ONLY</code> -- 如果设置为 true 将不会把文件写入INSTALL_K3S_BIN_DIR，强制设置INSTALL_K3S_SKIP_DOWNLOAD=true。</p>
<p><code v-pre>INSTALL_K3S_SKIP_DOWNLOAD</code> 会创建 <code v-pre>kubectl/crictl/ctr</code> 等，而 <code v-pre>INSTALL_K3S_BIN_DIR_READ_ONLY</code> 不创建。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_BIN_DIR_READ_ONLY</span><span class="token operator">=</span>true <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>INSTALL_K3S_SYSTEMD_DIR</code> -- 安装 systemd 服务和环境文件的目录，或者使用/etc/systemd/system 作为默认目录。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_SYSTEMD_DIR</span><span class="token operator">=</span>/opt/systemd <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">测试</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/runtime<span class="token comment"># INSTALL_K3S_MIRROR=cn   INSTALL_K3S_SYSTEMD_DIR=/opt/systemd sh install.sh </span>
root@cubmaster01:/opt/systemd<span class="token comment"># ls -al</span>
total <span class="token number">12</span>
drwxr-xr-x <span class="token number">2</span> root root <span class="token number">4096</span> Nov <span class="token number">26</span> <span class="token number">11</span>:53 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">6</span> root root <span class="token number">4096</span> Nov <span class="token number">26</span> <span class="token number">11</span>:51 <span class="token punctuation">..</span>
-rw-r--r-- <span class="token number">1</span> root root  <span class="token number">829</span> Nov <span class="token number">26</span> <span class="token number">11</span>:53 k3s.service
-rw------- <span class="token number">1</span> root root    <span class="token number">0</span> Nov <span class="token number">26</span> <span class="token number">11</span>:53 k3s.service.env
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p><code v-pre>INSTALL_K3S_EXEC</code> -- 带有标志的命令，用于在服务中启动 K3s。<strong>如果未指定命令，并且设置了 K3S_URL，它将默认为“agent”。如果未设置 K3S_URL，它将默认为“server”。</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--docker"</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**最后的 systemd 命令解析为这个环境变量和脚本参数的组合。**为了说明这一点，以下命令的结果与注册一个没有 flannel 的 server 的行为相同：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--flannel-backend none"</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> -
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"server --flannel-backend none"</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> -
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"server"</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> - --flannel-backend none
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> - server --flannel-backend none
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> - --flannel-backend none
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>INSTALL_K3S_NAME</code> -- 要创建的 <code v-pre>systemd</code> 服务名称，如果以服务器方式运行 k3s，则默认为 <code v-pre>'k3s'</code>；如果以 <code v-pre>agent</code> 方式运行 <code v-pre>k3s</code>，则默认为 <code v-pre>'k3s-agent'</code> 。如果指定了服务名，则服务名将以 <code v-pre>'k3s-'</code> 为前缀。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_NAME</span><span class="token operator">=</span><span class="token string">"seal"</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>INSTALL_K3S_TYPE</code> -- 要创建的 systemd 服务类型，默认为 notify</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_TYPE</span><span class="token operator">=</span><span class="token string">"exec"</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>INSTALL_K3S_SKIP_SELINUX_RPM</code> -- 如果设置为 <code v-pre>&quot;true &quot;</code> 将跳过 <code v-pre>k3s RPM</code> 的自动安装。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_SKIP_SELINUX_RPM</span><span class="token operator">=</span>true <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">K3s RPM</p>
<p><a href="https://en.wikipedia.org/wiki/Security-Enhanced_Linux" target="_blank" rel="noopener noreferrer">安全增强的 Linux（SELinux）<ExternalLinkIcon/></a>是对 Linux 的安全增强。</p>
<p>它由 Red Hat 开发，是 Linux 上强制性访问控制（MAC）的一个实现。强制性访问控制允许系统管理员定义应用程序和用户如何访问不同的资源，如文件、设备、网络和进程间通信。SELinux 还通过使操作系统在默认情况下具有限制性而增强了安全性。</p>
<p>在历史上被政府机构使用后，SELinux 现在是行业标准，在 CentOS 7 和 8 上默认启用。要检查 SELinux 是否在你的系统上启用和执行，请使用<code v-pre>getenforce</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>getenforce
Enforcing
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p><code v-pre>INSTALL_K3S_CHANNEL_URL</code> -- 用于获取 K3s 下载网址的频道 URL。默认为 https://update.k3s.io/v1-release/channels 。</p>
<p><code v-pre>INSTALL_K3S_CHANNEL</code> -- 用于获取 K3s 下载 URL 的通道。默认值为 &quot;stable&quot;。选项包括：<code v-pre>stable</code>, <code v-pre>latest</code>, <code v-pre>testing</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_CHANNEL</span><span class="token operator">=</span><span class="token string">"latest"</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>K3S_CONFIG_FILE</code> -- 指定配置文件的位置。默认目录为<code v-pre>/etc/rancher/k3s/config.yaml</code>。</p>
<div class="custom-container tip"><p class="custom-container-title">我们先指定下文件：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /opt/config.yaml <span class="token operator">&lt;&lt;-</span><span class="token string">EOF
node-label:
- "foo=bar"
- "something=amazing"
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">K3S_CONFIG_FILE</span><span class="token operator">=</span>/opt/config.yaml <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.nsddd.top/smimage-20221126211751303.png" alt="image-20221126211751303"></p>
<p><code v-pre>K3S_TOKEN</code> -- 用于将 server 或 agent 加入集群的共享 secret。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>rancher-k3s <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">希望你可以找到它的位置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /var/lib/rancher/k3s/server/token
K1042465c14be8de6a57c482b4162f673addcb652acb13c8119a9900b5d27c234f7::server:rancher-k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p><code v-pre>K3S_TOKEN_FILE</code> -- 指定 <code v-pre>cluster-secret</code>,<code v-pre>token</code> 的文件目录。</p>
<div class="custom-container tip"><p class="custom-container-title">我们需要先指定文件</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /opt/token.txt <span class="token operator">&lt;&lt;-</span><span class="token string">EOF
rancher-k3s
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">K3S_TOKEN_FILE</span><span class="token operator">=</span>/opt/token.txt <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">希望你可以找到它的位置</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/runtime<span class="token comment"># cat /var/lib/rancher/k3s/server/token</span>
K10fbe884032e42976a1dd419e5d171b9bc38d50e13dc852afbc97ffb99c765f06e::server:rancher-k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<ol>
<li>以 &quot;K3S_&quot;开头的环境变量将被保留，供 systemd 和 openrc 服务使用。</li>
<li>在没有明确设置 exec 命令的情况下设置 K3S_URL，会将命令默认为 &quot;agent&quot;。</li>
<li>运行 agent 时还必须设置 K3S_TOKEN。</li>
</ol>
</div>
<h2 id="对二进制的安装高级补充" tabindex="-1"><a class="header-anchor" href="#对二进制的安装高级补充" aria-hidden="true">#</a> 对二进制的安装高级补充</h2>
<p>安装脚本主要是配置 K3s 作为服务运行。如果你选择不使用脚本，你可以通过 <a href="https://github.com/rancher/k3s/releases/latest" target="_blank" rel="noopener noreferrer">发布页面<ExternalLinkIcon/></a>下载二进制文件，将其放在你的环境变量路径上，然后执行它来运行 K3s。K3s 二进制支持以下命令：</p>
<p><code v-pre>k3s server</code> -- 运行 K3s server，它还将启动 Kubernetes control-plane 组件，如 API server, controller-manager, 和 scheduler。</p>
<blockquote>
<p>和 kubernetes 的控制层面很类似~</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/runtime<span class="token comment"># k3s server</span>
INFO<span class="token punctuation">[</span>0000<span class="token punctuation">]</span> Acquiring lock <span class="token function">file</span> /var/lib/rancher/k3s/data/.lock 
INFO<span class="token punctuation">[</span>0000<span class="token punctuation">]</span> Preparing data <span class="token function">dir</span> /var/lib/rancher/k3s/data/2ef87ff954adbb390309ce4dc07500f29c319f84feec1719bfb5059c8808ec6a 
INFO<span class="token punctuation">[</span>0000<span class="token punctuation">]</span> Starting k3s v1.25.3+k3s1 <span class="token punctuation">(</span>f2585c16<span class="token punctuation">)</span>         
INFO<span class="token punctuation">[</span>0000<span class="token punctuation">]</span> Configuring sqlite3 database connection pooling: <span class="token assign-left variable">maxIdleConns</span><span class="token operator">=</span><span class="token number">2</span>, <span class="token assign-left variable">maxOpenConns</span><span class="token operator">=</span><span class="token number">0</span>, <span class="token assign-left variable">connMaxLifetime</span><span class="token operator">=</span>0s 
INFO<span class="token punctuation">[</span>0000<span class="token punctuation">]</span> Configuring database table schema and indexes, this may take a moment<span class="token punctuation">..</span>. 
INFO<span class="token punctuation">[</span>0000<span class="token punctuation">]</span> Database tables and indexes are up to <span class="token function">date</span>   
INFO<span class="token punctuation">[</span>0000<span class="token punctuation">]</span> Kine available at unix://kine.sock 
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>k3s agent</code> -- 运行 <code v-pre>K3s agent</code> 节点。这将使 <code v-pre>K3s</code> 作为工作节点运行，启动 <code v-pre>Kubernetes</code> 节点服务 <code v-pre>kubelet</code> 和 <code v-pre>kube-proxy</code>。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>root@etcnode01:~# k3s agent --server https://192.168.71.130:6443 --token K10fcaced71fc70ca6b77921a7e374dc03c34fdd1fb11973d69a2a8e937b61beb22::server:82c397ed440c496f5448ec3c4b11c112
INFO[0000] Starting k3s agent v1.25.4+k3s1 (0dc63334)   
INFO[0000] Running load balancer k3s-agent-load-balancer 127.0.0.1:6444 -> [192.168.71.130:6443] 
ERRO[0004] failed to get CA certs: Get "https://127.0.0.1:6444/cacerts": read tcp 127.0.0.1:60386->127.0.0.1:6444: read: connection reset by peer 
......
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/opt<span class="token comment"># k3s kubectl get nodes</span>
NAME          STATUS   ROLES                  AGE   VERSION
cubmaster01   Ready    control-plane,master   96m   v1.25.3+k3s1
cubnode02     Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>                 52m   v1.25.4+k3s1
etcnode01     Ready    <span class="token operator">&lt;</span>none<span class="token operator">></span>                 67m   v1.25.4+k3s1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p><code v-pre>k3s kubectl</code> -- 运行嵌入式 kubectl CLI。如果没有设置 KUBECONFIG 环境变量，当启动 K3s 服务器节点时，将自动尝试使用在<code v-pre>/etc/rancher/k3s/k3s.yaml</code> 创建的配置文件。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@k3s1:~<span class="token comment"># k3s kubectl get nodes</span>
NAME   STATUS   ROLES                  AGE     VERSION
k3s1   Ready    control-plane,master   8m14s   v1.20.5+k3s1
k3s2   Ready    <span class="token operator">&lt;</span>none                11s     v1.20.5+k3s1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>k3s crictl</code> -- 运行一个嵌入式 crictl。这是一个用于与 Kubernetes 的容器运行时接口（CRI）交互的 CLI。对调试很有用。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@k3s1:~<span class="token comment"># k3s crictl ps</span>
CONTAINER           IMAGE               CREATED             STATE               NAME                     ATTEMPT             POD ID
9ceb610df16c7       aa764f7db3051       <span class="token number">8</span> minutes ago       Running             traefik                  <span class="token number">0</span>                   373c79416fa65
cadceb62ae08d       897ce3c5fc8ff       <span class="token number">8</span> minutes ago       Running             lb-port-443              <span class="token number">0</span>                   f8a0ecfe56562
a26a49be485ac       897ce3c5fc8ff       <span class="token number">8</span> minutes ago       Running             lb-port-80               <span class="token number">0</span>                   f8a0ecfe56562
01894072f2298       148c192562719       <span class="token number">8</span> minutes ago       Running             local-path-provisioner   <span class="token number">1</span>                   b9d55e63f632f
5ccd6ed05120f       296a6d5035e2d       <span class="token number">9</span> minutes ago       Running             coredns                  <span class="token number">0</span>                   2bae007d8e486
be0765e77a703       9dd718864ce61       <span class="token number">9</span> minutes ago       Running             metrics-server           <span class="token number">0</span>                   53ab949c026ce
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>k3s ctr</code> -- 运行一个嵌入式的 ctr。这是为 containerd（K3s 使用的容器守护进程）提供的 CLI。对调试很有用。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@k3s1:~<span class="token comment"># k3s ctr container ls</span>
CONTAINER                                                           IMAGE                                                                                                               RUNTIME
01894072f2298208f3c109f9fb1d5e12e677d11cd5d0b0a3a66f550ae38644e4    docker.io/rancher/local-path-provisioner:v0.0.19                                                                    io.containerd.runc.v2
2bae007d8e486afffbbf1ffb88e97b92d367aff4b06842217de4fb5d22ecf1b9    docker.io/rancher/pause:3.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>k3s server</code> 和 <code v-pre>k3s agent</code> 命令有额外的配置选项，可以通过 <code v-pre>k3s server --help</code> 或 <code v-pre>k3s agent --help</code> 查看。</p>
<h2 id="通过配置文件启动-k3s" tabindex="-1"><a class="header-anchor" href="#通过配置文件启动-k3s" aria-hidden="true">#</a> 通过配置文件启动 K3s</h2>
<p>除了使用环境变量和 CLI 参数来配置 K3s，K3s 还可以使用配置文件。默认目录位于 <code v-pre>/etc/rancher/k3s/config.yaml</code>（或者是 <code v-pre>k3s.yaml</code> 文件）</p>
<div class="custom-container warning"><p class="custom-container-title">提示</p>
<p>如果同时使用配置文件和 CLI 参数。 在这种情况下，值将从两个来源加载，但 CLI 参数优先级更高。 对于可重复的参数，如--node-label，CLI 参数将覆盖列表中的所有值。</p>
</div>
<h2 id="k3s-server-agent-配置" tabindex="-1"><a class="header-anchor" href="#k3s-server-agent-配置" aria-hidden="true">#</a> K3s Server/Agent 配置</h2>
<p><strong><code v-pre>write-kubeconfig</code> -- 将管理客户端的 kubeconfig 写入这个文件</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">K3S_KUBECONFIG_OUTPUT</span><span class="token operator">=</span>/root/.kube/config <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用 docker 作为容器运行时</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--docker"</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">测试</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/runtime<span class="token comment"># docker ps</span>
CONTAINER ID   IMAGE                              COMMAND                  CREATED              STATUS              PORTS     NAMES
9e9e8cd5eb22   rancher/mirrored-library-traefik   <span class="token string">"/entrypoint.sh --gl…"</span>   <span class="token number">14</span> seconds ago       Up <span class="token number">12</span> seconds                 k8s_traefik_traefik-bb69b68cd-ps2j6_kube-system_4905ff4a-b161-498e-b1d4-fed57a5d65a8_0
8fb6d8f2c3dc   dbd43b6716a0                       <span class="token string">"entry"</span>                  <span class="token number">32</span> seconds ago       Up <span class="token number">31</span> seconds                 k8s_lb-tcp-443_svclb-traefik-59fdd98e-vjxlk_kube-system_4a45d7e2-5af8-4a48-99c4-1057c5ba96b0_0
6033d7ecc824   dbd43b6716a0                       <span class="token string">"entry"</span>                  <span class="token number">32</span> seconds ago       Up <span class="token number">31</span> seconds                 k8s_lb-tcp-80_svclb-traefik-59fdd98e-vjxlk_kube-system_4a45d7e2-5af8-4a48-99c4-1057c5ba96b0_0
6b95dbafc4ee   rancher/mirrored-pause:3.6         <span class="token string">"/pause"</span>                 <span class="token number">32</span> seconds ago       Up <span class="token number">31</span> seconds                 k8s_POD_traefik-bb69b68cd-ps2j6_kube-system_4905ff4a-b161-498e-b1d4-fed57a5d65a8_0
b13f33df38d9   rancher/mirrored-pause:3.6         <span class="token string">"/pause"</span>                 <span class="token number">33</span> seconds ago       Up <span class="token number">31</span> seconds                 k8s_POD_svclb-traefik-59fdd98e-vjxlk_kube-system_4a45d7e2-5af8-4a48-99c4-1057c5ba96b0_0
5e8ce9d7d95e   rancher/mirrored-coredns-coredns   <span class="token string">"/coredns -conf /etc…"</span>   <span class="token number">51</span> seconds ago       Up <span class="token number">50</span> seconds                 k8s_coredns_coredns-597584b69b-sn7n2_kube-system_d778542c-14b4-4c25-bc1f-b8b525a662a2_1
03db38691203   rancher/local-path-provisioner     <span class="token string">"local-path-provisio…"</span>   <span class="token number">56</span> seconds ago       Up <span class="token number">55</span> seconds                 k8s_local-path-provisioner_local-path-provisioner-79f67d76f8-prcsc_kube-system_45729047-9cc5-4d39-9f9b-9c99d9dfefb7_1
9b087eb2f2d0   e57a417f15d3                       <span class="token string">"/metrics-server --c…"</span>   About a minute ago   Up About a minute             k8s_metrics-server_metrics-server-5c8978b444-bw47f_kube-system_b820f87d-9063-49a8-9ed9-5c501e11f88a_1
a1ead6d83564   rancher/mirrored-pause:3.6         <span class="token string">"/pause"</span>                 About a minute ago   Up About a minute             k8s_POD_coredns-597584b69b-sn7n2_kube-system_d778542c-14b4-4c25-bc1f-b8b525a662a2_0
7a1020d7a01f   rancher/mirrored-pause:3.6         <span class="token string">"/pause"</span>                 About a minute ago   Up About a minute             k8s_POD_local-path-provisioner-79f67d76f8-prcsc_kube-system_45729047-9cc5-4d39-9f9b-9c99d9dfefb7_0
cd0e940354a9   rancher/mirrored-pause:3.6         <span class="token string">"/pause"</span>                 About a minute ago   Up About a minute             k8s_POD_metrics-server-5c8978b444-bw47f_kube-system_b820f87d-9063-49a8-9ed9-5c501e11f88a_0

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p><strong>针对多网卡主机安装 K3s 集群</strong></p>
<p><strong>k3s server:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
<span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--node-ip=192.168.99.211"</span> <span class="token punctuation">\</span>
<span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>K3s agent:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
<span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span>https://192.168.99.211:6443 <span class="token punctuation">\</span>
<span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>xiongxinwei <span class="token punctuation">\</span>
<span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--node-ip=192.168.99.212"</span> <span class="token punctuation">\</span>
<span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>--tls-san -- 在 TLS 证书中添加其他主机名或 IP 作为主题备用名称</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--tls-san 3.97.6.45"</span>  <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改<code v-pre>kube-apiserver</code>、<code v-pre>kube-scheduler</code> 、<code v-pre>kube-controller-manager</code>、 <code v-pre>kube-cloud-controller-manager</code>、 <code v-pre>kubelet</code>、 <code v-pre>kube-proxy</code> 参数</p>
<p><strong>kubelet-arg：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--kubelet-arg=max-pods=200'</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>kube-apiserver：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--kube-apiserver-arg=service-node-port-range=40000-50000'</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>kube-proxy-arg：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--kube-proxy-arg=proxy-mode=ipvs'</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong><code v-pre>--data-dir -- K3s</code> 数据存储目录，默认为 <code v-pre>/var/lib/rancher/k3s</code> 或 <code v-pre>${HOME}/.rancher/k3s</code>(如果不是 root 用户)</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--data-dir=/opt/k3s-data'</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>这就有点意思了，我们默认的安装迁移了：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/opt/k3s-data/server<span class="token comment"># cd /opt/k3s-data/;ls</span>
agent  server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>当然，我们自己设计目录结构的时候或许可以用到~</strong></p>
</div>
<p><strong>禁用组件 --disable：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--disable traefik'</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p><strong>禁用前：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos k3s<span class="token punctuation">]</span><span class="token comment"># ls /var/lib/rancher/k3s/server/manifests</span>
ccm.yaml  coredns.yaml  local-storage.yaml  metrics-server  rolebindings.yaml  traefik.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>禁用后：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/workspces/runtime<span class="token comment"># ls /var/lib/rancher/k3s/server/manifests</span>
ccm.yaml  coredns.yaml  local-storage.yaml  metrics-server  rolebindings.yaml
root@cubmaster01:/workspces/runtime<span class="token comment"># kubectl get pods -A | grep traefik</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p><strong>添加 label 和 taint:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
  <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'--node-label foo=bar,hello=world --node-taint key1=value1:NoExecute'</span> <span class="token punctuation">\</span>
  <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="网络选项" tabindex="-1"><a class="header-anchor" href="#网络选项" aria-hidden="true">#</a> 网络选项</h2>
<p>默认情况下，<code v-pre>K3s</code> 将以 <code v-pre>flannel</code> 作为 <code v-pre>CNI</code> 运行，使用 <code v-pre>VXLAN</code> 作为默认后端。<code v-pre>CNI</code>和默认后端都可以通过参数修改。</p>
<h3 id="flannel-选项" tabindex="-1"><a class="header-anchor" href="#flannel-选项" aria-hidden="true">#</a> Flannel 选项</h3>
<p>Flannel 的默认后端是 VXLAN。要启用加密，请使用下面的 IPSec（Internet Protocol Security）或 WireGuard 选项。</p>
<table>
<thead>
<tr>
<th style="text-align:left">CLI Flag 和 Value</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>--flannel-backend=vxlan</code></td>
<td style="text-align:left">(默认) 使用 VXLAN 后端。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--flannel-backend=ipsec</code></td>
<td style="text-align:left">使用 IPSEC 后端，对网络流量进行加密。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--flannel-backend=host-gw</code></td>
<td style="text-align:left">使用 host-gw 后端。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--flannel-backend=wireguard</code></td>
<td style="text-align:left">使用 WireGuard 后端，对网络流量进行加密。可能需要额外的内核模块和配置。</td>
</tr>
</tbody>
</table>
<h3 id="flannel-backend-使用-host-gw" tabindex="-1"><a class="header-anchor" href="#flannel-backend-使用-host-gw" aria-hidden="true">#</a> flannel-backend 使用 <code v-pre>host-gw</code></h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># K3s master</span>
root@k3s1:~<span class="token comment"># curl -sfL https://get.k3s.io | \</span>
        <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--flannel-backend=host-gw"</span> <span class="token punctuation">\</span>
        <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token function">sh</span> -

<span class="token comment"># K3s agent </span>
root@k3s2:~<span class="token comment"># curl -sfL https://get.k3s.io | \</span>
        <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span>https://172.16.64.6:6443 <span class="token punctuation">\</span>
        <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>85892cbfef2177603f25be30344dbcd0 <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@k3s1:~<span class="token comment"># cat /var/lib/rancher/k3s/agent/etc/flannel/net-conf.json</span>
<span class="token punctuation">{</span>
	<span class="token string">"Network"</span><span class="token builtin class-name">:</span> <span class="token string">"10.42.0.0/16"</span>,
	<span class="token string">"Backend"</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
		<span class="token string">"Type"</span><span class="token builtin class-name">:</span> <span class="token string">"host-gw"</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

root@k3s1:~<span class="token comment"># route -n</span>
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
<span class="token number">0.0</span>.0.0         <span class="token number">172.16</span>.64.1     <span class="token number">0.0</span>.0.0         UG    <span class="token number">100</span>    <span class="token number">0</span>        <span class="token number">0</span> enp0s2
<span class="token number">10.42</span>.0.0       <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.255.0   U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> cni0
<span class="token number">10.42</span>.1.0       <span class="token number">172.16</span>.64.9     <span class="token number">255.255</span>.255.0   UG    <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> enp0s2
<span class="token number">172.16</span>.64.0     <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.255.0   U     <span class="token number">0</span>      <span class="token number">0</span>        <span class="token number">0</span> enp0s2
<span class="token number">172.16</span>.64.1     <span class="token number">0.0</span>.0.0         <span class="token number">255.255</span>.255.255 UH    <span class="token number">100</span>    <span class="token number">0</span>        <span class="token number">0</span> enp0s2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h3 id="启用-directrouting" tabindex="-1"><a class="header-anchor" href="#启用-directrouting" aria-hidden="true">#</a> 启用 Directrouting</h3>
<p>当主机在同一子网时，启用 direct routes(如host-gw)。<code v-pre>vxlan</code> 只用于将数据包封装到不同子网的主机上，同子网的主机之间使用 <code v-pre>host-gw</code>。默认值为 <code v-pre>false</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># K3s master 和 agent</span>
<span class="token function">cat</span> <span class="token operator">>></span> /etc/net-conf.json <span class="token operator">&lt;&lt;</span><span class="token string">EOF 
{
        "Network": "10.42.0.0/16",
        "Backend": {
            "Type": "vxlan",
            "Directrouting": true
	}
}
EOF</span>

<span class="token comment"># K3s master</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh <span class="token operator">|</span> <span class="token punctuation">\</span>
        <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--flannel-conf=/etc/net-conf.json"</span> <span class="token punctuation">\</span>
        <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="自定义-cni" tabindex="-1"><a class="header-anchor" href="#自定义-cni" aria-hidden="true">#</a> 自定义 CNI</h2>
<p>使用 <code v-pre>--flannel-backend=none</code> 运行 K3s，然后在安装你选择的 CNI。</p>
<h4 id="calico" tabindex="-1"><a class="header-anchor" href="#calico" aria-hidden="true">#</a> Calico</h4>
<p>按照<a href="https://docs.projectcalico.org/master/reference/cni-plugin/configuration" target="_blank" rel="noopener noreferrer">Calico CNI 插件指南<ExternalLinkIcon/></a>。修改 Calico YAML，在 container_settings 部分中允许 IP 转发，例如：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>"container_settings": {
              "allow_ip_forwarding": true
          }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>如不配置 <code v-pre>&quot;allow_ip_forwarding&quot;: true</code>， <code v-pre>svclb-traefik</code> 将会报错：<code v-pre>/usr/bin/entry: line 6: can't create /proc/sys/net/ipv4/ip_forward: Read-only file system</code></p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@k3s1:~<span class="token comment"># curl -sfL http://rancher-mirror.cnrancher.com/k3s/k3s-install.sh | \</span>
        <span class="token assign-left variable">INSTALL_K3S_MIRROR</span><span class="token operator">=</span>cn <span class="token punctuation">\</span>
        <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">"--flannel-backend=none \
        --cluster-cidr=192.168.200.0/24"</span> <span class="token punctuation">\</span>
        <span class="token function">sh</span> -
root@k3s1:~<span class="token comment"># kubectl apply -f https://raw.githubusercontent.com/kingsd041/k3s-tutorial/main/05-安装-网络选项/calico.yaml</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**参考：**https://docs.projectcalico.org/getting-started/kubernetes/k3s/quickstart</p>
<h2 id="使用外部数据库实现高可用安装" tabindex="-1"><a class="header-anchor" href="#使用外部数据库实现高可用安装" aria-hidden="true">#</a> 使用外部数据库实现高可用安装</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>单节点 k3s server 集群可以满足各种用例，但是对于需要 Kubernetes control-plane 稳定运行的重要环境，您可以在 HA 配置中运行 K3s。一个 K3s HA 集群由以下几个部分组成：</p>
<ul>
<li><strong>两个或多个</strong> <code v-pre>server 节点</code>，将为 Kubernetes API 提供服务并运行其他 control-plane 服务。</li>
<li><strong>零个或多个</strong> <code v-pre>agent 节点</code>，用于运行您的应用和服务。</li>
<li><code v-pre>外部数据存储</code> (与单个 k3s server 设置中使用的嵌入式 SQLite 数据存储相反)</li>
<li><code v-pre>固定的注册地址</code>，位于 server 节点的前面，以允许 agent 节点向集群注册</li>
</ul>
<blockquote>
<p>Agent 通过固定的注册地址进行注册，但注册后直接与其中一个 <code v-pre>server</code> 节点建立连接。这是一个由 <code v-pre>k3s agent</code> 进程发起的 <code v-pre>websocket</code> 连接，并由作为 <code v-pre>agent</code> 进程一部分运行的客户端负载均衡器维护。</p>
<p><strong>嵌入式 ETCD 使用的共识算法 Raft 建议你使用最少 3 个且数量为奇数的节点</strong></p>
</blockquote>
</div>
<h3 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h3>
<div class="custom-container warning"><p class="custom-container-title">提醒</p>
<p>个人比较倾向于 etcd，Dqlite 已经被抛弃了，嵌入式 etcd 才是 yyds</p>
<p>使用之前的 3 台主机实验。<strong>创建一个外部数据存储</strong></p>
</div>
<table>
<thead>
<tr>
<th>主机名</th>
<th>角色</th>
<th>IP</th>
</tr>
</thead>
<tbody>
<tr>
<td>k3s-server-1</td>
<td>k3s master</td>
<td>192.168.71.130</td>
</tr>
<tr>
<td>k3s-server-2</td>
<td>k3s master</td>
<td>192.168.71.131</td>
</tr>
<tr>
<td>k3s-db</td>
<td>DB</td>
<td>121.43.165.25</td>
</tr>
<tr>
<td>k3s-lb</td>
<td>LB</td>
<td>172.31.13.97</td>
</tr>
<tr>
<td>k3s-agent</td>
<td>k3s agent</td>
<td>172.31.15.130</td>
</tr>
</tbody>
</table>
<h3 id="外部数据库高可用" tabindex="-1"><a class="header-anchor" href="#外部数据库高可用" aria-hidden="true">#</a> 外部数据库高可用</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># k3s-db</span>
<span class="token function">docker</span> run <span class="token parameter variable">--name</span> some-mysql <span class="token parameter variable">--restart</span><span class="token operator">=</span>unless-stopped <span class="token parameter variable">-p</span> <span class="token number">3306</span>:3306 <span class="token parameter variable">-e</span> <span class="token assign-left variable">MYSQL_ROOT_PASSWORD</span><span class="token operator">=</span>password <span class="token parameter variable">-d</span> mysql:5.7
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启动 k3s server 节点:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># k3s-server-1 和 k3s-server-2 节点</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> - server <span class="token punctuation">\</span>
  --datastore-endpoint<span class="token operator">=</span><span class="token string">"mysql://root:password@tcp(192.168.71.130:3306)/database-name"</span> --tls-san <span class="token number">172.31</span>.13.97
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">注意</p>
<p><code v-pre>--tls-san</code>：在 TLS 证书中添加其他主机名或 IP 作为主题备用名称，本例为 LB 的 IP
否则通过 LB IP 连接 k3s api 时将会报错：<code v-pre>Unable to connect to the server: x509: certificate is valid for 10.43.0.1, 127.0.0.1, 172.31.2.134, 172.31.2.42, not 172.31.13.97</code></p>
<p><code v-pre>--tls-san</code> 可省略</p>
</div>
<div class="custom-container tip"><p class="custom-container-title">验证</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>默认情况下，server 节点将是可调度的，因此你的工作负载可以在它们上启动。如果你希望有一个专用的 control-plane，在这个平面上不会运行用户工作负载，你可以使用 taints。<code v-pre>node-taint</code> 参数将允许你用污点配置节点，例如<code v-pre>--node-taint CriticalAddonsOnly=true:NoExecute</code>。</p>
</div>
<h3 id="agent-加入" tabindex="-1"><a class="header-anchor" href="#agent-加入" aria-hidden="true">#</a> agent 加入</h3>
<p>Agent 节点需要一个 URL 来注册，你应该在 server 节点前面有一个稳定的 endpoint，不会随时间推移而改变。可以使用许多方法来设置此 endpoint，例如：</p>
<ul>
<li>一个 4 层（TCP）负载均衡器</li>
<li>轮询 DNS</li>
<li>虚拟或弹性 IP 地址</li>
</ul>
<p>使用 nginx 作为负载均衡器，将 6443 端口流量转发到 k3s server:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># k3s-lb 节点</span>
<span class="token function">cat</span> <span class="token operator">>></span> /etc/nginx.conf <span class="token operator">&lt;&lt;</span><span class="token string">EOF
worker_processes 4;
worker_rlimit_nofile 40000;

events {
    worker_connections 8192;
}

stream {
    upstream k3s_api {
        least_conn;
        server 172.31.2.134:6443 max_fails=3 fail_timeout=5s;
        server 172.31.2.42:6443 max_fails=3 fail_timeout=5s;
    }
    server {
        listen     6443;
        proxy_pass k3s_api;
    }
}
EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><em>运行：</em></p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code>docker run -d --restart=unless-stopped \
  -p 6443:6443 \
  -v /etc/nginx.conf:/etc/nginx/nginx.conf \
  nginx:1.14
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="没有-cli-标志启动-agent-加入" tabindex="-1"><a class="header-anchor" href="#没有-cli-标志启动-agent-加入" aria-hidden="true">#</a> 没有 CLI 标志启动 agent 加入</h3>
<p>如果第一个服务器节点是在没有 <code v-pre>--token</code> CLI 标志或 <code v-pre>K3S_TOKEN</code> 变量的情况下启动的，则可以从已加入群集的任何服务器检索令牌值：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> /var/lib/rancher/k3s/server/token
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后<a href="https://docs.k3s.io/reference/server-config#cluster-options" target="_blank" rel="noopener noreferrer">可以使用令牌添加<ExternalLinkIcon/></a>其他服务器节点:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token function">sh</span> <span class="token parameter variable">-s</span> - server <span class="token punctuation">\</span>
  <span class="token punctuation">\</span>
  --datastore-endpoint<span class="token operator">=</span><span class="token string">"mysql://username:password@tcp(hostname:3306)/database-name"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>在 HA 集群中加入 agent 节点与在单个 server 集群中加入 agent 节点是一样的。你只需要指定 agent 应该注册到的 URL 和它应该使用的 token 即可。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># k3s-agent 节点</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span>https://172.31.13.97:6443 <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>mynodetoken <span class="token function">sh</span> -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div>
<p>有一些配置标志在所有服务器节点中必须相同：</p>
<ul>
<li>网络相关标志： --cluster-dns， -<code v-pre>--cluster-domain</code>， --cluster-cidr， -<code v-pre>--service-cidr</code> <code v-pre>--cluster-dns``--cluster-cidr</code></li>
<li>控制某些组件部署的标志：--disable-helm-controller、--<code v-pre>--disable-kube-proxy</code>、-<code v-pre>--disable-network-policy</code> 以及传递给 -<code v-pre>--disable</code> 的任何组件 <code v-pre>--disable-helm-controller</code></li>
<li>功能相关标志：-<code v-pre>--secrets-encryption</code></li>
</ul>
<div class="custom-container warning"><p class="custom-container-title">注意</p>
<p>确保保留此令牌的副本，因为从备份还原和添加节点时需要该副本。以前，K3s 在使用外部 SQL 数据存储时不会强制使用令牌。</p>
</div>
<h2 id="嵌入式db-ha" tabindex="-1"><a class="header-anchor" href="#嵌入式db-ha" aria-hidden="true">#</a> 嵌入式DB HA</h2>
<p>要在这种模式下运行 K3s，你必须有奇数的服务器节点。我们建议从三个节点开始。</p>
<p>要开始运行，首先启动一个服务器节点，使用 cluster-init 标志来启用集群，并使用一个标记作为共享的密钥来加入其他服务器到集群中。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>SECRET k3s server --cluster-init
<span class="token comment"># 或：</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>SECRET <span class="token function">sh</span> <span class="token parameter variable">-s</span> - --cluster-init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动第一台服务器后，使用共享密钥将第二台和第三台服务器加入集群。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>SECRET k3s server <span class="token parameter variable">--server</span> https://<span class="token operator">&lt;</span>ip or <span class="token function">hostname</span> of server<span class="token operator"><span class="token file-descriptor important">1</span>></span>:6443
<span class="token comment"># 或:</span>
<span class="token function">curl</span> <span class="token parameter variable">-sfL</span> https://get.k3s.io <span class="token operator">|</span> <span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>SECRET <span class="token function">sh</span> <span class="token parameter variable">-s</span> - <span class="token parameter variable">--server</span> https://<span class="token operator">&lt;</span>ip or <span class="token function">hostname</span> of server<span class="token operator"><span class="token file-descriptor important">1</span>></span>:6443
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查询 ETCD 集群状态：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">ETCDCTL_ENDPOINTS</span><span class="token operator">=</span><span class="token string">'https://172.31.12.136:2379,https://172.31.4.43:2379,https://172.31.4.190:2379'</span> 
<span class="token assign-left variable">ETCDCTL_CACERT</span><span class="token operator">=</span><span class="token string">'/var/lib/rancher/k3s/server/tls/etcd/server-ca.crt'</span> 
<span class="token assign-left variable">ETCDCTL_CERT</span><span class="token operator">=</span><span class="token string">'/var/lib/rancher/k3s/server/tls/etcd/server-client.crt'</span> 
<span class="token assign-left variable">ETCDCTL_KEY</span><span class="token operator">=</span><span class="token string">'/var/lib/rancher/k3s/server/tls/etcd/server-client.key'</span> 
<span class="token assign-left variable">ETCDCTL_API</span><span class="token operator">=</span><span class="token number">3</span> etcdctl endpoint status --write-out<span class="token operator">=</span>table
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>etcd 证书默认目录：<code v-pre>/var/lib/rancher/k3s/server/tls/etcd</code>
etcd 数据默认目录：<code v-pre>/var/lib/rancher/k3s/server/db/etcd</code></p>
</div>
<h2 id="集群数据存储选项" tabindex="-1"><a class="header-anchor" href="#集群数据存储选项" aria-hidden="true">#</a> 集群数据存储选项</h2>
<div class="custom-container tip"><p class="custom-container-title">官方介绍：</p>
<p>使用 etcd 以外的数据存储运行 Kubernetes 的能力使 K3s 区别于其他 Kubernetes 发行版。该功能为 Kubernetes 操作者提供了灵活性。可用的数据存储选项允许您选择一个最适合您用例的数据存储。例如：</p>
<ul>
<li>如果你的团队没有操作 etcd 的专业知识，可以选择 MySQL 或 PostgreSQL 等企业级 SQL 数据库。</li>
<li>如果您需要在 CI/CD 环境中运行一个简单的、短暂的集群，您可以使用嵌入式 SQLite 数据库。</li>
<li>如果你希望在边缘部署 Kubernetes，并需要一个高可用的解决方案，但又无法承担在边缘管理数据库的操作开销，你可以使用 K3s 建立在嵌入式 etcd 之上的嵌入式 HA 数据存储。</li>
</ul>
</div>
<h3 id="配置参数" tabindex="-1"><a class="header-anchor" href="#配置参数" aria-hidden="true">#</a> 配置参数</h3>
<p>使用外部数据存储，如 PostgreSQL、MySQL 或 etcd，你必须设置<code v-pre>datastore-endpoint</code>参数，以便 K3s 知道如何连接到它。你也可以指定参数来配置连接的认证和加密。下表参数，它们可以作为 CLI 标志或环境变量传递。</p>
<table>
<thead>
<tr>
<th style="text-align:left">CLI Flag</th>
<th style="text-align:left">环境变量</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>--datastore-endpoint</code></td>
<td style="text-align:left"><code v-pre>K3S_DATASTORE_ENDPOINT</code></td>
<td style="text-align:left">指定一个 PostgresSQL、MySQL 或 etcd 连接字符串。用于描述与数据存储的连接。这个字符串的结构是特定于每个后端的，详情如下。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--datastore-cafile</code></td>
<td style="text-align:left"><code v-pre>K3S_DATASTORE_CAFILE</code></td>
<td style="text-align:left">TLS 证书颁发机构（CA）文件，用于帮助确保与数据存储的通信安全。如果你的数据存储通过 TLS 服务请求，使用由自定义证书颁发机构签署的证书，你可以使用这个参数指定该 CA，这样 K3s 客户端就可以正确验证证书。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--datastore-certfile</code></td>
<td style="text-align:left"><code v-pre>K3S_DATASTORE_CERTFILE</code></td>
<td style="text-align:left">TLS 证书文件，用于对数据存储进行基于客户端证书的验证。要使用这个功能，你的数据存储必须被配置为支持基于客户端证书的认证。如果你指定了这个参数，你还必须指定<code v-pre>datastore-keyfile</code>参数。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>--datastore-keyfile</code></td>
<td style="text-align:left"><code v-pre>K3S_DATASTORE_KEYFILE</code></td>
<td style="text-align:left">TLS 密钥文件，用于对数据存储进行基于客户端证书的认证。更多细节请参见前面的<code v-pre>datastore-certfile</code>参数。</td>
</tr>
</tbody>
</table>
<p>作为最佳实践，我们建议将这些参数设置为环境变量，而不是命令行参数，这样你的数据库证书或其他敏感信息就不会作为进程信息的一部分暴露出来。</p>
<div class="custom-container warning"><p class="custom-container-title">官方建议</p>
<p>作为最佳实践，我们建议将这些参数设置为环境变量，而不是命令行参数，这样你的数据库证书或其他敏感信息就不会作为 <strong>进程信息</strong> 的一部分暴露出来。</p>
</div>
<h2 id="私有仓库" tabindex="-1"><a class="header-anchor" href="#私有仓库" aria-hidden="true">#</a> 私有仓库</h2>
<p>可以将 Containerd 配置为连接到私有注册表，并使用它们在节点上拉取私有映像。</p>
<p>K3s 默认使用 containerd 作为容器运行时，所以在 docker 上配置镜像仓库是不生效的</p>
<p>K3s registry 配置目录为： <code v-pre>/etc/rancher/k3s/registries.yaml</code>。K3s 启动时，K3s 会检查 <code v-pre>/etc/rancher/k3s/</code> 中是否存在 <code v-pre>registries.yaml</code> 文件，并指示 <code v-pre>containerd</code> 使用文件中定义的镜像仓库。如果你想使用一个私有的镜像仓库，那么你需要在每个使用镜像仓库的节点上以 root 身份创建这个文件。</p>
<p>请注意，server 节点默认是可以调度的。如果你没有在 server 节点上设置污点，那么将在它们上运行工作负载，请确保在每个 server 节点上创建 <code v-pre>registries.yaml</code> 文件。</p>
<h3 id="registries-yaml-文件" tabindex="-1"><a class="header-anchor" href="#registries-yaml-文件" aria-hidden="true">#</a> registries.yaml 文件</h3>
<p><strong>组成部分：</strong></p>
<ol>
<li><code v-pre>mirrors</code>：定义专用注册表的名称和端点的指令</li>
<li><code v-pre>configs</code>：<code v-pre>configs</code>部分定义每个镜像的 TLS 和凭据配置。对于每个镜像，您可以定义<code v-pre>auth</code>和/或 <code v-pre>tls</code>.</li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>containerd 使用了类似 K8S 中 svc 与 endpoint 的概念，svc 可以理解为 <strong>访问名称</strong>，这个名称会解析到对应的 endpoint 上。 也可以理解 mirror 配置就是一个反向代理，它把客户端的请求代理到 endpoint 配置的后端镜像仓库。mirror 名称可以随意填写，但是必须符合IP或域名的定义规则。并且可以配置多个 endpoint，默认解析到第一个 endpoint，如果第一个 endpoint 没有返回数据，则自动切换到第二个 endpoint，以此类推。<code v-pre>INSTALL_K3S_MIRROR=cn</code></p>
<p><strong>💡简单的一个案例如下：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">mirrors</span><span class="token punctuation">:</span>
  <span class="token key atrule">"172.31.6.200:5000"</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"http://172.31.6.200:5000"</span>
      <span class="token punctuation">-</span> <span class="token string">"http://x.x.x.x:5000"</span>
      <span class="token punctuation">-</span> <span class="token string">"http://y.y.y.y:5000"</span>
  <span class="token key atrule">"rancher.ksd.top:5000"</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"http://172.31.6.200:5000"</span>
  <span class="token key atrule">"docker.io"</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"https://fogjl973.mirror.aliyuncs.com"</span>
      <span class="token punctuation">-</span> <span class="token string">"https://registry-1.docker.io"</span>

<span class="token key atrule">configs</span><span class="token punctuation">:</span>
  <span class="token key atrule">"172.31.6.200:5000"</span><span class="token punctuation">:</span>
    <span class="token key atrule">auth</span><span class="token punctuation">:</span>
      <span class="token key atrule">username</span><span class="token punctuation">:</span> admin
      <span class="token key atrule">password</span><span class="token punctuation">:</span> Harbor@12345
    <span class="token key atrule">tls</span><span class="token punctuation">:</span>
      <span class="token key atrule">cert_file</span><span class="token punctuation">:</span> /home/ubuntu/harbor2.kingsd.top.cert
      <span class="token key atrule">key_file</span><span class="token punctuation">:</span>  /home/ubuntu/harbor2.kingsd.top.key
      <span class="token key atrule">ca_file</span><span class="token punctuation">:</span>   /home/ubuntu/ca.crt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以通过 <code v-pre>crictl pull 172.31.6.200:5000/library/alpine</code> 和 <code v-pre>crictl pull rancher.ksd.top:5000/library/alpine</code> 获取到镜像，但镜像都是从同一个仓库获取到的。</p>
</div>
<h4 id="mirrors" tabindex="-1"><a class="header-anchor" href="#mirrors" aria-hidden="true">#</a> mirrors</h4>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">mirrors</span><span class="token punctuation">:</span>
  <span class="token key atrule">mycustomreg.com</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"https://mycustomreg.com:5000"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Rewrites:</strong></p>
<p>每个镜像都可以有一组 <code v-pre>Rewrites</code>。<code v-pre>Rewrites</code> 可以根据正则表达式更改图像的标签。如果镜像注册表中的组织/项目结构与上游结构不同，这将非常有用。</p>
<p>例如，以下配置将以透明方式从 <code v-pre>registry.example.com:5000/mirrorproject/rancher-images/coredns-coredns:1.6.3</code> 拉取映像 <code v-pre>docker.io/rancher/coredns-coredns:1.6.3</code>:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">mirrors</span><span class="token punctuation">:</span>
  <span class="token key atrule">docker.io</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"https://registry.example.com:5000"</span>
    <span class="token key atrule">rewrite</span><span class="token punctuation">:</span>
      <span class="token key atrule">"^rancher/(.*)"</span><span class="token punctuation">:</span> <span class="token string">"mirrorproject/rancher-images/$1"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>映像仍将存储在原始名称下，以便 <code v-pre>crictl image ls</code> 将显示节点上可用的 <code v-pre>docker.io/rancher/coredns-coredns:1.6.3</code>，即使映像是从具有不同名称的镜像注册表中提取的。</p>
</blockquote>
<h4 id="configs" tabindex="-1"><a class="header-anchor" href="#configs" aria-hidden="true">#</a> configs</h4>
<p><code v-pre>configs</code>部分定义每个镜像的 TLS 和凭据配置。对于每个镜像，您可以定义<code v-pre>auth</code>和/或 <code v-pre>tls</code>.</p>
<p><code v-pre>tls</code> 部分包括：</p>
<table>
<thead>
<tr>
<th>命令</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>cert_file</code></td>
<td>将用于向注册表进行身份验证的客户端证书路径</td>
</tr>
<tr>
<td><code v-pre>key_file</code></td>
<td>将用于向注册表进行身份验证的客户端密钥路径</td>
</tr>
<tr>
<td><code v-pre>ca_file</code></td>
<td>定义用于验证注册表的服务器证书文件的 CA 证书路径</td>
</tr>
<tr>
<td><code v-pre>insecure_skip_verify</code></td>
<td>定义是否应跳过注册表的 TLS 验证的布尔值</td>
</tr>
</tbody>
</table>
<p>身份验证部分由用户名/密码或<code v-pre>auth</code>令牌组成：</p>
<table>
<thead>
<tr>
<th>命令</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code v-pre>username</code></td>
<td>专用注册表基本身份验证的用户名</td>
</tr>
<tr>
<td><code v-pre>password</code></td>
<td>专用注册表基本身份验证的用户密码</td>
</tr>
<tr>
<td><code v-pre>auth</code></td>
<td>专用注册表基本身份验证的身份验证令牌</td>
</tr>
</tbody>
</table>
<h4 id="使用-tls" tabindex="-1"><a class="header-anchor" href="#使用-tls" aria-hidden="true">#</a> 使用 TLS</h4>
<p>以下示例显示了使用 TLS 时如何在每个节点上配置 /<code v-pre>/etc/rancher/k3s/registries.yaml</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/rancher/k3s/registries.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  "harbor.kingsd.top":
    endpoint:
      - "https://harbor.kingsd.top"
configs:
  "harbor.kingsd.top":
    auth:
      username: admin
      password: Harbor@12345
EOF</span>
systemctl restart k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>自签名证书:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/rancher/k3s/registries.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  "harbor2.kingsd.top":
    endpoint:
      - "https://harbor2.kingsd.top"
configs:
  "harbor2.kingsd.top":
    auth:
      username: admin
      password: Harbor@12345
    tls:
      cert_file: /home/ubuntu/harbor2.kingsd.top.cert
      key_file:  /home/ubuntu/harbor2.kingsd.top.key
      ca_file:   /home/ubuntu/ca.crt
EOF</span>
systemctl restart k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>不使用 TLS (Http registry):</strong></p>
<blockquote>
<p>在没有 TLS 通信的情况下，需要为 endpoints 指定http://，否则将默认为 https</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/rancher/k3s/registries.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  "172.31.19.227:5000":
    endpoint:
      - "http://172.31.19.227:5000"
EOF</span>
systemctl restart k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>带身份验证的和不带身份验证的（auth)</strong></p>
<CodeGroup>
<CodeGroupItem title="带身份验证">
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">mirrors</span><span class="token punctuation">:</span>
  <span class="token key atrule">docker.io</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"https://mycustomreg.com:5000"</span>
<span class="token key atrule">configs</span><span class="token punctuation">:</span>
  <span class="token key atrule">"mycustomreg:5000"</span><span class="token punctuation">:</span>
    <span class="token key atrule">auth</span><span class="token punctuation">:</span>
      <span class="token key atrule">username</span><span class="token punctuation">:</span> xxxxxx <span class="token comment"># this is the registry username</span>
      <span class="token key atrule">password</span><span class="token punctuation">:</span> xxxxxx <span class="token comment"># this is the registry password</span>
    <span class="token key atrule">tls</span><span class="token punctuation">:</span>
      <span class="token key atrule">cert_file</span><span class="token punctuation">:</span> <span class="token comment"># path to the cert file used in the registry</span>
      <span class="token key atrule">key_file</span><span class="token punctuation">:</span>  <span class="token comment"># path to the key file used in the registry</span>
      <span class="token key atrule">ca_file</span><span class="token punctuation">:</span>   <span class="token comment"># path to the ca file used in the registry</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<CodeGroupItem title="不带身份验证">
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">mirrors</span><span class="token punctuation">:</span>
  <span class="token key atrule">docker.io</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"https://mycustomreg.com:5000"</span>
<span class="token key atrule">configs</span><span class="token punctuation">:</span>
  <span class="token key atrule">"mycustomreg:5000"</span><span class="token punctuation">:</span>
    <span class="token key atrule">tls</span><span class="token punctuation">:</span>
      <span class="token key atrule">cert_file</span><span class="token punctuation">:</span> <span class="token comment"># path to the cert file used in the registry</span>
      <span class="token key atrule">key_file</span><span class="token punctuation">:</span>  <span class="token comment"># path to the key file used in the registry</span>
      <span class="token key atrule">ca_file</span><span class="token punctuation">:</span>   <span class="token comment"># path to the ca file used in the registry</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></CodeGroupItem>
<blockquote>
<p>在没有 TLS 通信的情况下，您需要为端点指定 <code v-pre>http://</code>，否则它将默认为 https。</p>
</blockquote>
<p>为了使注册表更改生效，您需要在每个节点上重新启动 K3。</p>
</CodeGroup>
<p><strong>配置 Mirror:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/rancher/k3s/registries.yaml <span class="token operator">&lt;&lt;</span><span class="token string">EOF
mirrors:
  "docker.io":
    endpoint:
      - "https://fogjl973.mirror.aliyuncs.com"
      - "https://registry-1.docker.io"
EOF</span>
systemctl restart k3s
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><details class="custom-container details"><summary>完整示例</summary>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">mirrors</span><span class="token punctuation">:</span>
  <span class="token key atrule">"harbor.kingsd.top"</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"https://harbor.kingsd.top"</span>
  <span class="token key atrule">"harbor2.kingsd.top"</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"https://harbor2.kingsd.top"</span>
  <span class="token key atrule">"172.31.19.227:5000"</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"http://172.31.19.227:5000"</span>
  <span class="token key atrule">"docker.io"</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"https://fogjl973.mirror.aliyuncs.com"</span>
      <span class="token punctuation">-</span> <span class="token string">"https://registry-1.docker.io"</span>

<span class="token key atrule">configs</span><span class="token punctuation">:</span>
  <span class="token key atrule">"harbor.kingsd.top"</span><span class="token punctuation">:</span>
    <span class="token key atrule">auth</span><span class="token punctuation">:</span>
      <span class="token key atrule">username</span><span class="token punctuation">:</span> admin
      <span class="token key atrule">password</span><span class="token punctuation">:</span> Harbor@12345

  <span class="token key atrule">"harbor2.kingsd.top"</span><span class="token punctuation">:</span>
    <span class="token key atrule">auth</span><span class="token punctuation">:</span>
      <span class="token key atrule">username</span><span class="token punctuation">:</span> admin
      <span class="token key atrule">password</span><span class="token punctuation">:</span> Harbor@12345
    <span class="token key atrule">tls</span><span class="token punctuation">:</span>
      <span class="token key atrule">cert_file</span><span class="token punctuation">:</span> /home/ubuntu/harbor2.kingsd.top.cert
      <span class="token key atrule">key_file</span><span class="token punctuation">:</span>  /home/ubuntu/harbor2.kingsd.top.key
      <span class="token key atrule">ca_file</span><span class="token punctuation">:</span>   /home/ubuntu/ca.crt

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="配置-containerd" tabindex="-1"><a class="header-anchor" href="#配置-containerd" aria-hidden="true">#</a> 配置 Containerd</h3>
<p>K3s 将会在<code v-pre>/var/lib/rancher/k3s/agent/etc/containerd/config.toml</code>中为 containerd 生成 <code v-pre>config.toml</code>。</p>
<p>如果要对这个文件进行高级设置，你可以在同一目录中创建另一个名为 <code v-pre>config.toml.tmpl</code> 的文件，此文件将会代替默认设置。</p>
<p><code v-pre>config.toml.tmpl</code>将被视为 Go 模板文件，并且<code v-pre>config.Node</code>结构被传递给模板。截取下面模板示例介绍了如何使用结构来自定义配置文件。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> templates

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/rancher/wharfie/pkg/registries"</span>

	<span class="token string">"github.com/k3s-io/k3s/pkg/daemons/config"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> ContainerdRuntimeConfig <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	RuntimeType <span class="token builtin">string</span>
	BinaryName  <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> ContainerdConfig <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	NodeConfig            <span class="token operator">*</span>config<span class="token punctuation">.</span>Node
	DisableCgroup         <span class="token builtin">bool</span>
	SystemdCgroup         <span class="token builtin">bool</span>
	IsRunningInUserNS     <span class="token builtin">bool</span>
	EnableUnprivileged    <span class="token builtin">bool</span>
	PrivateRegistryConfig <span class="token operator">*</span>registries<span class="token punctuation">.</span>Registry
	ExtraRuntimes         <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>ContainerdRuntimeConfig
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="将映像添加到专用注册表" tabindex="-1"><a class="header-anchor" href="#将映像添加到专用注册表" aria-hidden="true">#</a> 将映像添加到专用注册表</h3>
<p>首先，从 GitHub 获取您正在使用的版本.txt k3s-images 文件。从 docker.io 中提取 k3s 映像.txt 文件中列出的 K3s 映像</p>
<p>示例：<code v-pre>docker pull docker.io/rancher/coredns-coredns:1.6.3</code></p>
<p>然后，将映像重新标记到专用注册表。</p>
<p>示例：docker tag coredns-coredns：<code v-pre>docker tag coredns-coredns:1.6.3 mycustomreg:5000/coredns-coredns</code></p>
<p>最后，将映像推送到专用注册表。</p>
<p>示例：<code v-pre>docker push mycustomreg.com:5000/coredns-coredns</code></p>
<h2 id="离线安装" tabindex="-1"><a class="header-anchor" href="#离线安装" aria-hidden="true">#</a> 离线安装</h2>
<p>离线安装的过程主要分为以下两个步骤：</p>
<p><strong>步骤 1</strong>：部署镜像，本文提供了两种部署方式，分别是<strong>部署私有镜像仓库</strong>和<strong>手动部署镜像</strong>。请在这两种方式中选择一种执行。</p>
<p><strong>步骤 2</strong>：安装 K3s，本文提供了两种安装方式，分别是<strong>单节点安装</strong>和<strong>高可用安装</strong>。完成镜像部署后，请在这两种方式中选择一种执行。</p>
<p><strong>离线升级 K3s 版本</strong>：完成离线安装 K3s 后，您还可以通过脚本升级 K3s 版本，或启用自动升级功能，以保持离线环境中的 K3s 版本与最新的 K3s 版本同步。</p>
<h3 id="通过私有镜像仓库安装-k3s" tabindex="-1"><a class="header-anchor" href="#通过私有镜像仓库安装-k3s" aria-hidden="true">#</a> 通过私有镜像仓库安装 K3s</h3>
<p><strong>将所需镜像上传到私有镜像仓库：</strong></p>
<p>K3s 镜像列表可以从 https://github.com/k3s-io/k3s/releases 获取。</p>
<p><strong>创建镜像仓库 YAML：</strong></p>
<p>按照<a href="http://docs.rancher.cn/docs/k3s/installation/private-registry/_index/" target="_blank" rel="noopener noreferrer">私有镜像仓库配置指南<ExternalLinkIcon/></a> 创建并配置<code v-pre>registry.yaml</code>文件。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>mkdir <span class="token punctuation">-</span>p /etc/rancher/k3s/
cat <span class="token punctuation">></span><span class="token punctuation">></span> /etc/rancher/k3s/registries.yaml &lt;&lt;EOF
<span class="token key atrule">mirrors</span><span class="token punctuation">:</span>
  <span class="token key atrule">"docker.io"</span><span class="token punctuation">:</span>
    <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"https://harbor.kingsd.top"</span>
<span class="token key atrule">configs</span><span class="token punctuation">:</span>
  <span class="token key atrule">"docker.io"</span><span class="token punctuation">:</span>
    <span class="token key atrule">auth</span><span class="token punctuation">:</span>
      <span class="token key atrule">username</span><span class="token punctuation">:</span> admin
      <span class="token key atrule">password</span><span class="token punctuation">:</span> Harbor@12345
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>安装单节点 K3s：</strong></p>
<ol>
<li>
<p>从<a href="https://github.com/rancher/k3s/releases" target="_blank" rel="noopener noreferrer">K3s GitHub Release<ExternalLinkIcon/></a>页面获取 K3s 二进制文件，K3s 二进制文件需要与离线镜像的版本匹配。</p>
</li>
<li>
<p>获取 K3s 安装脚本：https://get.k3s.io。</p>
</li>
<li>
<p>将二进制文件放在每个节点的<code v-pre>/usr/local/bin</code>中，并确保拥有可执行权限。将安装脚本放在每个节点的任意位置，并将其命名为<code v-pre>install.sh</code>。</p>
</li>
<li>
<p>安装 K3s server：</p>
</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>INSTALL_K3S_SKIP_DOWNLOAD=true ./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5">
<li>将 agent 加入到 K3s 集群</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>INSTALL_K3S_SKIP_DOWNLOAD=true K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken ./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>通过手动部署镜像安装 K3s：</strong></p>
<p>请按照以下步骤准备镜像和 K3s 二进制文件：</p>
<ol>
<li>
<p>从<a href="https://github.com/rancher/k3s/releases" target="_blank" rel="noopener noreferrer">K3s GitHub Release<ExternalLinkIcon/></a>页面获取你所运行的 K3s 版本的镜像 tar 文件。</p>
</li>
<li>
<p>将 tar 文件放在<code v-pre>images</code>目录下，例如：</p>
</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /var/lib/rancher/k3s/agent/images/
<span class="token function">sudo</span> <span class="token function">cp</span> ./k3s-airgap-images-<span class="token variable">$ARCH</span>.tar /var/lib/rancher/k3s/agent/images/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>
<p>将 k3s 二进制文件放在 <code v-pre>/usr/local/bin/k3s</code>路径上，并确保拥有可执行权限。</p>
</li>
<li>
<p>安装 K3s server：</p>
</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>INSTALL_K3S_SKIP_DOWNLOAD=true ./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5">
<li>将 agent 加入到 K3s 集群</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>INSTALL_K3S_SKIP_DOWNLOAD=true K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken ./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>指定<code v-pre>INSTALL_K3S_SKIP_DOWNLOAD=true</code>参数指定使用本地 K3s 二进制文件进行安装。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">INSTALL_K3S_SKIP_DOWNLOAD</span><span class="token operator">=</span>true <span class="token assign-left variable">INSTALL_K3S_EXEC</span><span class="token operator">=</span><span class="token string">'server --datastore-endpoint=mysql://username:password@tcp(hostname:3306)/database-name'</span> ./install.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="升级-k3s" tabindex="-1"><a class="header-anchor" href="#升级-k3s" aria-hidden="true">#</a> 升级 K3s</h2>
<h3 id="通过脚本升级" tabindex="-1"><a class="header-anchor" href="#通过脚本升级" aria-hidden="true">#</a> 通过脚本升级</h3>
<p>离线环境的升级可以通过以下步骤完成：</p>
<ol>
<li>从<a href="https://github.com/rancher/k3s/releases" target="_blank" rel="noopener noreferrer">K3s GitHub Release<ExternalLinkIcon/></a>页面下载要升级到的 K3s 版本。将 tar 文件放在每个节点的<code v-pre>/var/lib/rancher/k3s/agent/images/</code>目录下。删除旧的 tar 文件。</li>
<li>复制并替换每个节点上<code v-pre>/usr/local/bin</code>中的旧 K3s 二进制文件。复制https://get.k3s.io 的安装脚本（因为它可能在上次发布后发生了变化）。再次运行脚本。</li>
<li>重启 K3s 服务。</li>
</ol>
<h3 id="在线脚本升级" tabindex="-1"><a class="header-anchor" href="#在线脚本升级" aria-hidden="true">#</a> 在线脚本升级</h3>
<div class="custom-container warning"><p class="custom-container-title">在线脚本升级</p>
<p>当升级 K3s 时，K3s 服务会重启或停止，但 K3s 容器会继续运行。 要停止所有的 K3s 容器并重置容器的状态，可以使用 <code v-pre>k3s-killall.sh</code> 脚本。 killall 脚本清理容器、K3s 目录和网络组件，同时也删除了 iptables 链和所有相关规则。集群数据不会被删除。</p>
<p>你可以通过使用安装脚本升级 K3s，或者手动安装所需版本的二进制文件。</p>
<blockquote>
<p>注意： 升级时，先逐个升级 server 节点，然后再升级其他 agent 节点。</p>
</blockquote>
</div>
<h3 id="channels-说明" tabindex="-1"><a class="header-anchor" href="#channels-说明" aria-hidden="true">#</a> Channels 说明</h3>
<p>通过安装脚本或使用我们的<a href="http://docs.rancher.cn/docs/k3s/upgrades/basic/_index" target="_blank" rel="noopener noreferrer">自动升级<ExternalLinkIcon/></a>功能进行的升级可以绑定到不同的发布 channels。以下是可用的 channels。</p>
<table>
<thead>
<tr>
<th style="text-align:left">CHANNEL</th>
<th style="text-align:left">描 述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">stable</td>
<td style="text-align:left">(默认)稳定版建议用于生产环境。这些版本已经过一段时间的社区强化。</td>
</tr>
<tr>
<td style="text-align:left">latest</td>
<td style="text-align:left">推荐使用最新版本尝试最新的功能。 这些版本还没有经过社区强化。</td>
</tr>
<tr>
<td style="text-align:left">v1.19 (例子)</td>
<td style="text-align:left">每一个支持的 Kubernetes 次要版本都有一个发布 channel，它们分别是<code v-pre>v1.19</code>、<code v-pre>v1.20</code>和<code v-pre>v1.21</code>。。这些 channel 会选择最新的可用补丁版本，不一定是稳定版本。</td>
</tr>
</tbody>
</table>
<p>对于详细的最新 channels 列表，您可以访问<a href="https://update.k3s.io/v1-release/channels" target="_blank" rel="noopener noreferrer">k3s channel 服务 API<ExternalLinkIcon/></a>。关于 channels 工作的更多技术细节，请参见<a href="https://github.com/rancher/channelserver" target="_blank" rel="noopener noreferrer">channelserver 项目<ExternalLinkIcon/></a>。</p>
<h3 id="使用安装脚本升级-k3s" tabindex="-1"><a class="header-anchor" href="#使用安装脚本升级-k3s" aria-hidden="true">#</a> 使用安装脚本升级 K3s</h3>
<p>要从旧版本升级 K3s，你可以使用 <strong>相同的标志</strong> 重新运行安装脚本:</p>
<ul>
<li>升级到最新 <code v-pre>stable</code> 版本</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -sfL https://get.k3s.io | sh -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>升级到 <code v-pre>latest</code> 版本</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -sfL https://get.k3s.io | INSTALL_K3S_CHANNEL=latest sh -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>升级到 <code v-pre>v1.20</code> 的最新版本</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -sfL https://get.k3s.io | INSTALL_K3S_CHANNEL="v1.20" sh -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>升级到指定版本</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -sfL https://get.k3s.io | INSTALL_K3S_VERSION=vX.Y.Z-rc1 sh -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="使用二进制文件手动升级-k3s" tabindex="-1"><a class="header-anchor" href="#使用二进制文件手动升级-k3s" aria-hidden="true">#</a> 使用二进制文件手动升级 K3s</h4>
<ol>
<li>从<a href="https://github.com/rancher/k3s/releases" target="_blank" rel="noopener noreferrer">发布<ExternalLinkIcon/></a>下载所需版本的 K3s 二进制文件</li>
<li>将下载的二进制文件复制到<code v-pre>/usr/local/bin/k3s</code>（或您所需的位置）</li>
<li>停止旧的 K3s 二进制文件</li>
<li>启动新的 K3s 二进制文件</li>
</ol>
<h3 id="自动升级" tabindex="-1"><a class="header-anchor" href="#自动升级" aria-hidden="true">#</a> 自动升级</h3>
<blockquote>
<p>注意： 此功能从 v1.17.4+k3s1 开始提供支持。</p>
</blockquote>
<p>你可以使用 Rancher 的 system-upgrad-controller 来管理 K3s 集群升级。这是一种 Kubernetes 原生的集群升级方法。它利用<a href="https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/#custom-resources" target="_blank" rel="noopener noreferrer">自定义资源定义(CRD)<ExternalLinkIcon/></a>、<code v-pre>计划</code>和<a href="https://kubernetes.io/docs/concepts/architecture/controller/" target="_blank" rel="noopener noreferrer">控制器<ExternalLinkIcon/></a>，根据配置的计划安排升级。</p>
<p>控制器通过监控计划和选择要在其上运行升级<a href="https://kubernetes.io/docs/concepts/workloads/controllers/jobs-run-to-completion/" target="_blank" rel="noopener noreferrer"> job<ExternalLinkIcon/></a> 的节点来调度升级。计划通过<a href="https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/" target="_blank" rel="noopener noreferrer">标签选择器<ExternalLinkIcon/></a>定义哪些节点应该升级。当一个 job 成功运行完成后，控制器会给它运行的节点打上相应的标签。</p>
<p>关于 system-upgrade-controller 的设计和架构或其与 K3s 集成的更多细节，请参见以下 Git 仓库：</p>
<ul>
<li><a href="https://github.com/rancher/system-upgrade-controller" target="_blank" rel="noopener noreferrer">system-upgrade-controller<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/rancher/k3s-upgrade" target="_blank" rel="noopener noreferrer">k3s-upgrade<ExternalLinkIcon/></a></li>
</ul>
<p>要以这种方式进行自动升级，你必须：</p>
<ol>
<li>将 system-upgrade-controller 安装到您的集群中</li>
<li>配置计划</li>
</ol>
<h4 id="安装-system-upgrade-controller" tabindex="-1"><a class="header-anchor" href="#安装-system-upgrade-controller" aria-hidden="true">#</a> 安装 system-upgrade-controller</h4>
<p>System-upgrade-controller 可以作为 deployment 安装到您的集群中。Deployment 需要一个 service-account、clusterRoleBinding 和一个 configmap。要安装这些组件，请运行以下命令:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl apply -f https://github.com/rancher/system-upgrade-controller/releases/download/v0.6.2/system-upgrade-controller.yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="配置计划" tabindex="-1"><a class="header-anchor" href="#配置计划" aria-hidden="true">#</a> 配置计划</h4>
<p>建议您最少创建两个计划：升级 server（master）节点的计划和升级 agent（worker）节点的计划。根据需要，您可以创建其他计划来控制跨节点的滚动升级。以下两个示例计划将把您的集群升级到 K3s v1.20.4+k3s1。创建计划后，控制器将接收这些计划并开始升级您的集群。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># Server plan
apiVersion: upgrade.cattle.io/v1
kind: Plan
metadata:
  name: server-plan
  namespace: system-upgrade
spec:
  concurrency: 1
  cordon: true
  nodeSelector:
    matchExpressions:
    - key: node-role.kubernetes.io/master
      operator: In
      values:
      - "true"
  serviceAccountName: system-upgrade
  upgrade:
    image: rancher/k3s-upgrade
  version: v1.20.4+k3s1

---
# Agent plan
apiVersion: upgrade.cattle.io/v1
kind: Plan
metadata:
  name: agent-plan
  namespace: system-upgrade
spec:
  concurrency: 1
  cordon: true
  nodeSelector:
    matchExpressions:
    - key: node-role.kubernetes.io/master
      operator: DoesNotExist
  prepare:
    args:
    - prepare
    - server-plan
    image: rancher/k3s-upgrade
  serviceAccountName: system-upgrade
  upgrade:
    image: rancher/k3s-upgrade
  version: v1.20.4+k3s1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>关于这些计划，有几个重要的事情需要提醒：</p>
<p>首先，必须在部署控制器的同一命名空间中创建计划。</p>
<p>其次，<code v-pre>concurrency</code>字段表示可以同时升级多少个节点。</p>
<p>第三，<code v-pre>server-plan</code>通过指定一个标签选择器来选择带有<code v-pre>node-role.kubernetes.io/master</code>标签的节点，从而锁定 server 节点。<code v-pre>agent-plan</code>通过指定一个标签选择器来选择没有该标签的节点，以 agent 节点为目标。</p>
<p>第四，<code v-pre>agent-plan</code>中的 <code v-pre>prepare</code> 步骤会使该计划等待<code v-pre>server-plan</code>完成后再执行升级 jobs。</p>
<p>第五，两个计划的<code v-pre>version</code>字段都设置为 v1.17.4+k3s1。或者，你可以省略 <code v-pre>version</code> 字段，将 <code v-pre>channel</code> 字段设置为解析到 K3s 版本的 URL。这将导致控制器监控该 URL，并在它解析到新版本时随时升级集群。这与 <a href="/docs/k3s/upgrades/basic/_index#%E5%8F%91%E5%B8%83-channels">release channels</a> 配合得很好。因此，你可以用下面的 channel 配置你的计划，以确保你的集群总是自动升级到 K3s 的最新稳定版本。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>apiVersion: upgrade.cattle.io/v1
kind: Plan
...
spec:
  ...
  channel: https://update.k3s.io/v1-release/channels/stable

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所述，一旦控制器检测到计划已创建，升级就会立即开始。更新计划将使控制器重新评估计划并确定是否需要再次升级。</p>
<p>您可以通过 kubectl 查看 plans 和 jobs 来监控升级的进度：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>kubectl -n system-upgrade get plans -o yaml
kubectl -n system-upgrade get jobs -o yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="连接到-k3s-kubernets-集群的三种方式" tabindex="-1"><a class="header-anchor" href="#连接到-k3s-kubernets-集群的三种方式" aria-hidden="true">#</a> 连接到 k3s kubernets 集群的三种方式</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>同时也是对 <a href="https://docker.nsddd.top/Cloud-Native-k8s/23.html" target="_blank" rel="noopener noreferrer">23 节<ExternalLinkIcon/></a>，<a href="https://docker.nsddd.top/Cloud-Native-k8s/23.html" target="_blank" rel="noopener noreferrer">Kubeconfig &amp;&amp; token<ExternalLinkIcon/></a> 的补充</p>
<ul>
<li><a href="https://headworq.org/en/how-to-connect-to-kubernetes/#" target="_blank" rel="noopener noreferrer">参考https://headworq.org/en/how-to-connect-to-kubernetes/#<ExternalLinkIcon/></a></li>
</ul>
</div>
<h3 id="kubeconfig" tabindex="-1"><a class="header-anchor" href="#kubeconfig" aria-hidden="true">#</a> kubeconfig</h3>
<p>在 K3s 安装过程中，<strong>kubeconfig</strong> 文件被写入 <code v-pre>/etc/rancher/k3s/k3s.yaml</code>。您将需要此文件才能使用首选的 Kubernetes 客户端连接到您的集群。你的 kubeconfig 会喜欢这样：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">apiVersion</span><span class="token punctuation">:</span> v1
<span class="token key atrule">clusters</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">cluster</span><span class="token punctuation">:</span>
    <span class="token key atrule">certificate-authority-data</span><span class="token punctuation">:</span> LS0<span class="token punctuation">...</span>
    <span class="token key atrule">server</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//127.0.0.1<span class="token punctuation">:</span><span class="token number">6443</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> default
<span class="token key atrule">contexts</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">context</span><span class="token punctuation">:</span>
    <span class="token key atrule">cluster</span><span class="token punctuation">:</span> default
    <span class="token key atrule">user</span><span class="token punctuation">:</span> default
  <span class="token key atrule">name</span><span class="token punctuation">:</span> default
<span class="token key atrule">current-context</span><span class="token punctuation">:</span> default
<span class="token key atrule">kind</span><span class="token punctuation">:</span> Config
<span class="token key atrule">preferences</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token key atrule">users</span><span class="token punctuation">:</span>
<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> default
  <span class="token key atrule">user</span><span class="token punctuation">:</span>
    <span class="token key atrule">client-certificate-data</span><span class="token punctuation">:</span> LS<span class="token punctuation">...</span>
    <span class="token key atrule">client-key-data</span><span class="token punctuation">:</span> LS<span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">注意</p>
<p>如果要从其他主机进行连接，则必须更改服务器端点并输入可访问群集的主机名/IP 地址。如果群集节点上的防火墙处于活动状态，则可能必须先打开端口 6443/tcp（<a href="https://headworq.org/en-how-to-install-k3s-kubernets-on-ubuntu/" target="_blank" rel="noopener noreferrer">请参阅此处<ExternalLinkIcon/></a>）).</p>
</div>
<p><strong>出于好奇，我们可以检查k3s-agent单元文件如何使用环境文件 ( <code v-pre>/etc/systemd/system/k3s-agent.service.env</code> ) 来存储变量变量K3S_URL和K3S_TOKEN：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubnode02:/workspces/runtime<span class="token comment"># cat /etc/systemd/system/k3s-agent.service</span>
<span class="token punctuation">[</span>Unit<span class="token punctuation">]</span>
<span class="token assign-left variable">Description</span><span class="token operator">=</span>Lightweight Kubernetes
<span class="token assign-left variable">Documentation</span><span class="token operator">=</span>https://k3s.io
<span class="token assign-left variable">Wants</span><span class="token operator">=</span>network-online.target
<span class="token assign-left variable">After</span><span class="token operator">=</span>network-online.target

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>
<span class="token assign-left variable">WantedBy</span><span class="token operator">=</span>multi-user.target

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>
<span class="token assign-left variable">Type</span><span class="token operator">=</span>notify
<span class="token assign-left variable">EnvironmentFile</span><span class="token operator">=</span>-/etc/default/%N
<span class="token assign-left variable">EnvironmentFile</span><span class="token operator">=</span>-/etc/sysconfig/%N
<span class="token assign-left variable">EnvironmentFile</span><span class="token operator">=</span>-/etc/systemd/system/k3s-agent.service.env
<span class="token assign-left variable">KillMode</span><span class="token operator">=</span>process
<span class="token assign-left variable">Delegate</span><span class="token operator">=</span>yes
<span class="token comment"># Having non-zero Limit*s causes performance problems due to accounting overhead</span>
<span class="token comment"># in the kernel. We recommend using cgroups to do container-local accounting.</span>
<span class="token assign-left variable">LimitNOFILE</span><span class="token operator">=</span><span class="token number">1048576</span>
<span class="token assign-left variable">LimitNPROC</span><span class="token operator">=</span>infinity
<span class="token assign-left variable">LimitCORE</span><span class="token operator">=</span>infinity
<span class="token assign-left variable">TasksMax</span><span class="token operator">=</span>infinity
<span class="token assign-left variable">TimeoutStartSec</span><span class="token operator">=</span><span class="token number">0</span>
<span class="token assign-left variable">Restart</span><span class="token operator">=</span>always
<span class="token assign-left variable">RestartSec</span><span class="token operator">=</span>5s
<span class="token assign-left variable">ExecStartPre</span><span class="token operator">=</span>/bin/sh <span class="token parameter variable">-xc</span> <span class="token string">'! /usr/bin/systemctl is-enabled --quiet nm-cloud-setup.service'</span>
<span class="token assign-left variable">ExecStartPre</span><span class="token operator">=</span>-/sbin/modprobe br_netfilter
<span class="token assign-left variable">ExecStartPre</span><span class="token operator">=</span>-/sbin/modprobe overlay
<span class="token assign-left variable">ExecStart</span><span class="token operator">=</span>/usr/local/bin/k3s <span class="token punctuation">\</span>
    agent <span class="token punctuation">\</span>
	<span class="token string">'--server'</span> <span class="token punctuation">\</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>如果不依赖systemctl服务进行管理，只能nohup自己搞，要么写程序的时候做一个进程或者线程deamon守护，一直让它持续跑。
ExecStart几个段，和你平时执行的一句话命令是一样的
只不过写成了配置文件，交给systemctl管理整一个服务
environmentFile相当于你每次执行的手工环境变量全整好了</p>
<p><code v-pre>nohup  命令   &amp;</code></p>
</div>
<p><strong>k3s-agent.service.env</strong> 的内容如下所示：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubnode02:/workspces/runtime<span class="token comment"># cat /etc/systemd/system/k3s-agent.service.env</span>
<span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span><span class="token string">'SECRET'</span>
<span class="token assign-left variable">K3S_URL</span><span class="token operator">=</span><span class="token string">'https://192.168.71.130:6443'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要手动启动<code v-pre>k3s</code> 代理，我们还可以使用环境变量的选项<code v-pre>--server</code>和<code v-pre>--token inetad</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>k3s agent <span class="token parameter variable">--server</span> https://192.168.71.130:6443 <span class="token parameter variable">--token</span> <span class="token string">"K10b625ace11027708856a6369064ef7cbd8e695a65457c9815e5f7ec2c3eca0635::server:SECRET"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="kubectl" tabindex="-1"><a class="header-anchor" href="#kubectl" aria-hidden="true">#</a> kubectl</h3>
<p>连接到 Kubernetes 集群的最常见方法是 <code v-pre>'kubectl'</code> 命令。该命令在 K3s 安装期间自动安装在群集节点上。</p>
<p>要连接到集群，你必须让 <code v-pre>kubectl</code> 知道在哪里可以找到 <code v-pre>kubeconfig</code>。您可以通过 <strong>将 kubeconfig 文件指定为选项、设置环境变量或将其复制到 <code v-pre>~/.kube/config</code></strong> 来做到这一点——任何更适合您的方法：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 指定kubeconfig文件作为选项，</span>
kubectl <span class="token parameter variable">--kubeconfig</span><span class="token operator">=</span>/etc/rancher/k3s/k3s.yaml  get nodes
<span class="token comment"># &lt;output></span>

<span class="token comment"># 设置环境变量</span>
<span class="token builtin class-name">export</span> <span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/rancher/k3s/k3s.yaml
kubectl get nodes
<span class="token comment"># &lt;output></span>

<span class="token comment"># copying it to '~/.kube/config' </span>
<span class="token function">cp</span> /etc/rancher/k3s/k3s.yaml ~/.kube/config
kubectl get nodes
<span class="token comment"># &lt;output></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有了 kubeconfig，你可以尝试以下两个命令。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># kubectl get nodes</span>
NAME          STATUS   ROLES                       AGE   VERSION
cubmaster01   Ready    control-plane,etcd,master   15m   v1.25.4+k3s1
<span class="token comment"># kubectl get pods --all-namespaces</span>
NAMESPACE     NAME                                      READY   STATUS      RESTARTS   AGE
kube-system   coredns-597584b69b-rb9bh                  <span class="token number">1</span>/1     Running     <span class="token number">0</span>          15m
kube-system   helm-install-traefik-crd-9h7rn            <span class="token number">0</span>/1     Completed   <span class="token number">0</span>          15m
kube-system   helm-install-traefik-fn7n7                <span class="token number">0</span>/1     Completed   <span class="token number">1</span>          15m
kube-system   local-path-provisioner-79f67d76f8-v5nxz   <span class="token number">1</span>/1     Running     <span class="token number">0</span>          15m
kube-system   metrics-server-5c8978b444-xbdbk           <span class="token number">1</span>/1     Running     <span class="token number">0</span>          15m
kube-system   svclb-traefik-f1a0eea9-ch5hp              <span class="token number">2</span>/2     Running     <span class="token number">0</span>          14m
kube-system   traefik-bb69b68cd-wzt8q                   <span class="token number">1</span>/1     Running     <span class="token number">0</span>          14m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lens-kubernetes-ide" tabindex="-1"><a class="header-anchor" href="#lens-kubernetes-ide" aria-hidden="true">#</a> Lens Kubernetes IDE</h3>
<p>如果您更喜欢图形界面来管理您的集群，您绝对应该查看 <a href="https://k8slens.dev/" target="_blank" rel="noopener noreferrer">Lens<ExternalLinkIcon/></a>。它确实可以更轻松地管理工作负载，配置映射，机密，服务，入口，并为您提供正在发生的事情的概述。最好的事情是，它是完全免费和开源的。</p>
<blockquote>
<p>“Lens 为 Kubernetes 中运行的所有内容提供了完整的态势感知。它降低了刚起步的人的进入门槛，并从根本上提高了拥有更多经验的人的生产力。</p>
<p>https://github.com/lensapp/lens/</p>
</blockquote>
<p><a href="https://kubenav.io/" target="_blank" rel="noopener noreferrer">Kubenav<ExternalLinkIcon/></a> 也是一个图形化的 Kubernetes 工具。Kubenav 最好的一点是它可用于移动 Android 和 iOS 设备，因此您可以在旅途中管理您的 Kubernetes 集群;)。Kubenav 也是开源的，可在 iOS App Store 和 Play Store 上使用。您也可以从 <a href="https://github.com/kubenav/kubenav/" target="_blank" rel="noopener noreferrer">Github 存储库<ExternalLinkIcon/></a>下载桌面版本.</p>
<p>安装后导航到“群集”，然后按加号添加群集。向下滚动到“导入 Kubeconfig”，将内容粘贴到文本字段中，然后按“添加”。</p>
<p><img src="http://sm.nsddd.top/smimage-20221127124516263.png" alt="image-20221127124516263"></p>
<p>注意：Kubernetes API 端口 （TCP/6443） 必须可用于您的手机。如果您不想打开该端口到互联网，您可以通过VPN连接到集群。请参阅我在 <a href="https://headworq.org/en-how-to-install-wiregurad-on-ubuntu/" target="_blank" rel="noopener noreferrer">Ubuntu 上设置 Wireguard 的指南<ExternalLinkIcon/></a>.</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '14.md' style='float:left'>⬆️上一节🔗  </a><a href = '16.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://nsddd.top/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


