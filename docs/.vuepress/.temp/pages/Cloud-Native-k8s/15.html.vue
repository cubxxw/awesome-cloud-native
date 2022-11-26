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
<nav class="table-of-contents"><ul><li><router-link to="#资源分析">资源分析</router-link><ul><li><router-link to="#usr-local-bin-重要二进制">/usr/local/bin 重要二进制</router-link></li></ul></li><li><router-link to="#脚本安装选项">脚本安装选项</router-link><ul><li><router-link to="#总结">总结</router-link></li></ul></li><li><router-link to="#对二进制的安装高级补充">对二进制的安装高级补充</router-link></li><li><router-link to="#通过配置文件启动-k3s">通过配置文件启动 K3s</router-link></li><li><router-link to="#k3s-server-agent-配置">K3s Server/Agent 配置</router-link></li><li><router-link to="#网络选项">网络选项</router-link><ul><li><router-link to="#flannel-选项">Flannel 选项</router-link></li><li><router-link to="#flannel-backend-使用-host-gw">flannel-backend 使用 host-gw</router-link></li><li><router-link to="#启用-directrouting">启用 Directrouting</router-link></li></ul></li><li><router-link to="#自定义-cni">自定义 CNI</router-link></li><li><router-link to="#使用外部数据库实现高可用安装">使用外部数据库实现高可用安装</router-link><ul><li><router-link to="#环境准备">环境准备</router-link></li></ul></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
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
<p><code v-pre>K3s agent</code>：管理镜像、提供 <strong>存储或创建/销毁容器</strong> 的操作将导致利用率的暂时上升，拉取镜像通常会影响 CPU 和 IO，因为它们涉及将镜像内容解压到磁盘。如果可能的话，工作负载存储(pod 临时存储和卷)应该与 agent 组件(/var/lib/rancher/k3s/agent)隔离，以确保不会出现资源冲突。</p>
</li>
</ul>
<p><strong>防止 agent 和工作负载干扰集群数据存储：</strong></p>
<ul>
<li>
<p>在 <code v-pre>server</code> 节点运行工作负载 pod 时，应确保 <code v-pre>agent</code> 和工作负载 <code v-pre>IOPS</code> 不干扰数据存储。</p>
</li>
<li>
<p>将 <code v-pre>server</code> 组件（/var/lib/rancher/k3s/server）与 <code v-pre>agent</code> 组件（/var/lib/rancher/k3s/agent）放在不同的存储介质上，后者包括 containerd 镜像存储。</p>
</li>
<li>
<p>工作负载存储（pod 临时存储和卷）也应该与数据存储隔离。</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>INSTALL_K3S_BIN_DIR_READ_ONLY</code> -- 如果设置为 true 将不会把文件写入INSTALL_K3S_BIN_DIR，强制设置INSTALL_K3S_SKIP_DOWNLOAD=true。</p>
<p><code v-pre>INSTALL_K3S_SKIP_DOWNLOAD</code> 会创建 <code v-pre>kubectl/crictl/ctr</code> 等，而 <code v-pre>INSTALL_K3S_BIN_DIR_READ_ONLY</code> 不创建。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -sfL https://get.k3s.io | INSTALL_K3S_MIRROR=cn \
  INSTALL_K3S_BIN_DIR_READ_ONLY=true \
  sh -
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
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>curl -sfL https://get.k3s.io | INSTALL_K3S_MIRROR=cn \
  INSTALL_K3S_CHANNEL="latest" \
  sh -
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>k3s agent</code> -- 运行 K3s agent 节点。这将使 K3s 作为工作节点运行，启动 Kubernetes 节点服务 kubelet 和 kube-proxy。</p>
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
<span class="token assign-left variable">K3S_TOKEN</span><span class="token operator">=</span>9077b8e6f3b67b5f3e4a7723a96b199d <span class="token punctuation">\</span>
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
<li>两个或多个<code v-pre>server 节点</code>，将为 Kubernetes API 提供服务并运行其他 control-plane 服务。</li>
<li>零个或多个<code v-pre>agent 节点</code>，用于运行您的应用和服务。</li>
<li><code v-pre>外部数据存储</code> (与单个 k3s server 设置中使用的嵌入式 SQLite 数据存储相反)</li>
<li><code v-pre>固定的注册地址</code>，位于 server 节点的前面，以允许 agent 节点向集群注册</li>
</ul>
<blockquote>
<p>Agent 通过固定的注册地址进行注册，但注册后直接与其中一个 server 节点建立连接。这是一个由 k3s agent 进程发起的 websocket 连接，并由作为 agent 进程一部分运行的客户端负载均衡器维护。</p>
</blockquote>
</div>
<h3 id="环境准备" tabindex="-1"><a class="header-anchor" href="#环境准备" aria-hidden="true">#</a> 环境准备</h3>
<div class="custom-container warning"><p class="custom-container-title">提醒</p>
<p>个人比较倾向于 etcd，Dqlite 已经被抛弃了，嵌入式 etcd 才是 yyds</p>
</div>
<ul>
<li><strong>适用场景</strong></li>
</ul>
<blockquote>
<p>资源有限的地方，如边缘计算、雾计算、物联网的接入网关等</p>
</blockquote>
<ul>
<li><strong>脚本-在线安装</strong></li>
</ul>
<blockquote>
<p>\1. master节点 指定安装版本,不指定安装最新稳定版本</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># export INSTALL_K3S_VERSION=v1.18.9
# export INSTALL_K3S_EXEC="--write-kubeconfig ~/.kube/config --cluster-cidr  10.72.0.0/16 --service-cidr  10.73.0.0/16"
# curl -sfL https://get.k3s.io | sh -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>\2. 所有worker节点 token来源于master节点，目录/var/lib/rancher/k3s/server/node-token</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># export INSTALL_K3S_VERSION=v1.18.9
# curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=XXX sh -
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><em>等价于</em></p>
<blockquote>
<p>\1. master节点</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># export INSTALL_K3S_VERSION=v1.18.9
# export INSTALL_K3S_EXEC="--write-kubeconfig ~/.kube/config --cluster-cidr  10.72.0.0/16 --service-cidr  10.73.0.0/16"
# sh k3s.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>\2. 所有worker节点 指定版本，master，还有从master获取的token</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># export INSTALL_K3S_VERSION=v1.18.9
# export K3S_URL=https://master_ip:6443 
# export K3S_TOKEN=K103b676c8815cc4fb467cb5564527c3a5b0d3415915c9a15e195ff6069589bf508::server:97d3d89ac68de226f5003869fe676718
# sh k3s.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>脚本-离线安装</strong></li>
</ul>
<blockquote>
<p>1.先在有网络的地方下载k3s安装脚本和二进制文件</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>脚本：https://get.k3s.io
选择对应版本的二进制文件: https://github.com/rancher/k3s/releases
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>2.将k3s安装脚本放在任意位置，二进制文件拷贝到目标主机的/usr/local/bin目录
3.添加环境变量</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># export INSTALL_K3S_SKIP_DOWNLOAD=true
跳过二进制文件下载
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>4.在master节点运行安装脚本 这里的版本要和上面下载的二进制文件版本一致</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># export INSTALL_K3S_VERSION=v1.18.9
# export INSTALL_K3S_EXEC="--write-kubeconfig ~/.kube/config --cluster-cidr  10.72.0.0/16 --service-cidr  10.73.0.0/16"
# sh k3s.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>5.在所有worker节点运行安装脚本 所有worker节点 指定版本，master，还有从master获取的token</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># export INSTALL_K3S_VERSION=v1.18.9
# export K3S_URL=https://master_ip:6443 
# export K3S_TOKEN=K103b676c8815cc4fb467cb5564527c3a5b0d3415915c9a15e195ff6069589bf508::server:97d3d89ac68de226f5003869fe676718
# sh k3s.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>无脚本-纯手动安装</strong></li>
</ul>
<blockquote>
<p>1.下载k3s二进制文件</p>
</blockquote>
<p><a href="https://link.zhihu.com/?target=https%3A//github.com/rancher/k3s/releases/latest" target="_blank" rel="noopener noreferrer">地址github.com/rancher/k3s/releases/latest<ExternalLinkIcon/></a></p>
<blockquote>
<p>2.启动master和worker</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>> 没有脚本启动方便，需要自己指定启动参数，如server、agent等

# sudo k3s server &amp;
> Kubeconfig is written to /etc/rancher/k3s/k3s.yaml
# sudo k3s kubectl get nodes

> On a different node run the below. NODE_TOKEN comes from
> /var/lib/rancher/k3s/server/node-token on your server
# sudo k3s agent --server https://myserver:6443 --token ${NODE_TOKEN}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>k3s默认用的containerd，如果要用docker替换containerd，则在安装k3s前安装docker</strong></li>
</ul>
<blockquote>
<p>1.安装docker</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># yum install -y yum-utils 
# yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
# yum makecache fast 
# yum list docker-ce --showduplicates | sort -r
# yum install -y docker-ce-19.03.8-3.el7
# systemctl start docker
# systemctl enable docker
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>2.安装k3s master</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># export INSTALL_K3S_VERSION=v1.18.9
# export INSTALL_K3S_EXEC="--docker --write-kubeconfig ~/.kube/config --cluster-cidr  10.72.0.0/16 --service-cidr  10.73.0.0/16"
# sh k3s.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>3.安装k3s worker</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 所有worker节点 指定版本，master，还有从master获取的token
# export INSTALL_K3S_VERSION=v1.18.9
# export K3S_URL=https://master_ip:6443 
# export K3S_TOKEN=K103b676c8815cc4fb467cb5564527c3a5b0d3415915c9a15e195ff6069589bf508::server:97d3d89ac68de226f5003869fe676718
# sh k3s.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
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


