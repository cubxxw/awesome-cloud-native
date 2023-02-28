<template><div><h1 id="sealer-rootless-design" tabindex="-1"><a class="header-anchor" href="#sealer-rootless-design" aria-hidden="true">#</a> sealer rootless design</h1>
<h2 id="🔍-desired-state" tabindex="-1"><a class="header-anchor" href="#🔍-desired-state" aria-hidden="true">#</a> 🔍 Desired state</h2>
<ul>
<li>[ ] sealer run (cluster)</li>
<li>[ ] sealer images (image)</li>
<li>[ ] 通过删除 setuid 加固 Linux 二进制文件[^1]</li>
<li>[ ]</li>
</ul>
<blockquote>
<p><code v-pre>setuid</code> 是一个 Unix 操作系统的权限标志，用于给予特定程序在运行时特定的权限。当一个程序具有 <code v-pre>setuid</code> 标志时，它以其文件所有者的身份运行，而不是以当前用户的身份运行。这可以用于允许非特权用户执行特权操作，例如访问特殊文件或执行特殊操作。</p>
</blockquote>
<h2 id="📖-solution-ideas" tabindex="-1"><a class="header-anchor" href="#📖-solution-ideas" aria-hidden="true">#</a> 📖 Solution Ideas</h2>
<p>或许可以参考 docker 的 docker 用户组权限设置，来解决 rootless 问题</p>
<ul>
<li><a href="https://rootlesscontaine.rs/" target="_blank" rel="noopener noreferrer">https://rootlesscontaine.rs/<ExternalLinkIcon/></a></li>
</ul>
<p>借助 <code v-pre>buildah</code> 无根模式的设计，构建出 rootless。</p>
<blockquote>
<p>⚠️ 注意： <code v-pre>buildah</code> 默认是支持五根模式的！</p>
</blockquote>
<p>方案：</p>
<ul>
<li>[ ] Alias sealer = /usr/bin/sealer  (unalias sealer)</li>
<li>[ ] With the <code v-pre>group</code> ownership the <code v-pre>sealer</code> group</li>
<li>[ ] Add related documents</li>
</ul>
<p>There are 3 ways to use <code v-pre>Sealer</code> and <code v-pre>Buildah</code> in a container:</p>
<ol>
<li>Linux kernel with rootless overlayfs.
具有无根覆盖层的 Linux 内核。</li>
<li>Linux kernel without rootless overlayfs and privileged container.
没有无根覆盖层和特权容器的 Linux 内核。</li>
<li>Linux kernel without rootless overlayfs and non-privileged container with special options.
没有无根覆盖层的 Linux 内核和具有特殊选项的非特权容器。</li>
</ol>
<h3 id="🖊️-todo" tabindex="-1"><a class="header-anchor" href="#🖊️-todo" aria-hidden="true">#</a> 🖊️ TODO</h3>
<ul>
<li>
<p>[ ] <code v-pre>rootless</code> 模式下一键安装 <code v-pre>sealer</code> 脚本（没有权限）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://github.com/sealerio/sealer/releases/download/v0.9.0/sealer-v0.9.0-linux-amd64.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\</span>
<span class="token function">tar</span> zxvf sealer-v0.9.0-linux-amd64.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">mv</span> sealer /usr/bin <span class="token punctuation">;</span> sealer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>[ ] 单节点非高可以用状态安装取消 <code v-pre>–masters</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> sealer run docker.io/sealerio/kubernetes:v1.22.15 
<span class="token comment">#2023-02-05 16:32:44 [ERROR] [root.go:75] sealer-v0.9.0: you must input master ip Or use Clusterfile</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>[ ]</p>
</li>
</ul>
<h3 id="🏷️-error-logged" tabindex="-1"><a class="header-anchor" href="#🏷️-error-logged" aria-hidden="true">#</a> 🏷️ Error logged</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>test@cubmaster01:/tmp$ sealer run docker.io/sealerio/kubernetes:v1.22.15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>第一个无权限：</p>
<blockquote>
<p>参考 docker 的组权限：</p>
<p>如果您不想在<code v-pre>docker</code>命令前加上<code v-pre>sudo</code>，请创建一个名为 的 Unix 组<code v-pre>docker</code>并将用户添加到其中。当 Docker 守护进程启动时，它会创建一个可供<code v-pre>docker</code>组成员访问的 Unix 套接字。在某些 Linux 发行版上，系统会在使用包管理器安装 Docker Engine 时自动创建此组。在这种情况下，您无需手动创建组。</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">2023</span>-02-05 <span class="token number">13</span>:40:49 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-unknown: <span class="token function">open</span> /etc/containers/policy.json: permission denied
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>权限分配：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">groupadd</span> seal<span class="token punctuation">;</span>
<span class="token function">sudo</span> <span class="token function">useradd</span> sealer<span class="token punctuation">;</span><span class="token function">sudo</span> sealer <span class="token function">mkdir</span> /home/sealer<span class="token punctuation">;</span> <span class="token function">chmod</span> <span class="token number">777</span> /home/sealer 
<span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-g</span> seal sealer<span class="token punctuation">;</span>
<span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-aG</span> seal <span class="token environment constant">$USER</span><span class="token punctuation">;</span>
<span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">777</span>	/etc/containers/storage.conf<span class="token punctuation">;</span>

<span class="token comment"># Free of secret（roor user)</span>
<span class="token function">sudo</span> <span class="token builtin class-name">echo</span> <span class="token string">"sealer ALL=(ALL) NOPASSWD: NOPASSWD: ALL"</span> <span class="token operator">>></span> /etc/sudoers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sudo 提权：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ubuntu@i-02v830ud:~$ <span class="token function">sudo</span> sealer run docker.io/sealerio/kubernetes:v1.22.15 <span class="token parameter variable">--masters</span> <span class="token number">10.160</span>.25.43
<span class="token number">2023</span>-02-06 <span class="token number">10</span>:34:55 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: failed to <span class="token function">install</span> docker: execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on <span class="token function">host</span> <span class="token punctuation">(</span><span class="token number">10.160</span>.25.43<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>failed to execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on host<span class="token punctuation">(</span><span class="token number">10.160</span>.25.43<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>exit status <span class="token number">1</span><span class="token punctuation">))</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>解决方案：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">2023</span>-02-07 <span class="token number">16</span>:29:37 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: failed to <span class="token function">install</span> docker: execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on <span class="token function">host</span> <span class="token punctuation">(</span><span class="token number">10.0</span>.4.3<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>failed to execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on host<span class="token punctuation">(</span><span class="token number">10.0</span>.4.3<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>exit status <span class="token number">127</span><span class="token punctuation">))</span><span class="token number">2023</span>-02-07 <span class="token number">16</span>:29:37 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: failed to <span class="token function">install</span> docker: execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on <span class="token function">host</span> <span class="token punctuation">(</span><span class="token number">10.0</span>.4.3<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>failed to execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on host<span class="token punctuation">(</span><span class="token number">10.0</span>.4.3<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>exit status <span class="token number">127</span><span class="token punctuation">))</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<p>docker 守护进程 搭载失败：</p>
<p>（root user and sudo user)</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>docker: Error response from daemon: cgroups: cgroup mountpoint does not exist: unknown.docker: Error response from daemon: cgroups: cgroup mountpoint does not exist: unknown.
---
<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: failed to execute command<span class="token punctuation">(</span>RegistryDomain<span class="token operator">=</span><span class="token string">"sea.hub"</span> <span class="token assign-left variable">RegistryPort</span><span class="token operator">=</span><span class="token string">"5000"</span> <span class="token assign-left variable">RegistryURL</span><span class="token operator">=</span><span class="token string">"sea.hub:5000"</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /var/lib/sealer/data/my-cluster/rootfs/scripts <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> init-registry.sh <span class="token number">5000</span> /var/lib/sealer/data/my-cluster/rootfs/registry sea.hub<span class="token punctuation">)</span> on host<span class="token punctuation">(</span><span class="token number">10.160</span>.25.43<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>exit status <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mount 挂载：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ubuntu@i-02v830ud:~$ sealer run docker.io/sealerio/kubernetes:v1.22.15 <span class="token parameter variable">--masters</span> <span class="token number">10.160</span>.25.43
<span class="token number">2023</span>-02-06 <span class="token number">14</span>:15:06 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: cannot <span class="token function">mount</span> using driver overlay <span class="token keyword">in</span> rootless mode. You need to run it <span class="token keyword">in</span> a <span class="token variable"><span class="token variable">`</span>buildah unshare<span class="token variable">`</span></span> session
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>[ ] 三节点 <code v-pre>Kubectl</code> 与服务器 <code v-pre>localhost:8080</code> 连接被拒绝：</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>sealer@iZuf68xky083mr0yy6q37lZ ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> kubectl get nodes
W0208 <span class="token number">20</span>:11:28.049909    <span class="token number">4138</span> loader.go:221<span class="token punctuation">]</span> Config not found: /home/sealer/admin.conf
The connection to the server localhost:8080 was refused - did you specify the right <span class="token function">host</span> or port?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解决：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/kubernetes/admin.conf 
<span class="token function">cp</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/
<span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/admin.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>[ ] 非 <code v-pre>sudo</code> 不能使用 <code v-pre>kubectl</code> ：</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>sealer@iZuf68xky083mr0yy6q37lZ ~<span class="token punctuation">]</span>$ kubectl get nodes 
W0208 <span class="token number">21</span>:02:48.870473   <span class="token number">30557</span> loader.go:221<span class="token punctuation">]</span> Config not found: /home/sealer/admin.conf
The connection to the server localhost:8080 was refused - did you specify the right <span class="token function">host</span> or port?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>[ ] sealer images</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>sealer@iZuf68xky083mr0yy6q37lZ ~<span class="token punctuation">]</span>$ sealer images
<span class="token number">2023</span>-02-09 <span class="token number">11</span>:09:47 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: unable to <span class="token function">make</span> rootless runtime: <span class="token function">mkdir</span> /run/user/0/containers: permission de
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>https://github.com/containers/storage/issues/1505</li>
</ul>
<p>解决（非正常手段）：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> /run/user/0 ； <span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">700</span> /run/user/0 <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">whoami</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span> /run/user/0
<span class="token comment"># 只需创建旧用户目录并授予您的用户使用该目录的权利</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>[ ] <code v-pre>WARN[0000] &quot;/&quot; is not a shared mount, this could cause issues or missing mounts with rootless containers</code></li>
</ul>
<p>解决：无根模式运行的 Buildah/Podman 期望共享绑定挂载，检查它是否设置为私有：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">]</span>$ findmnt <span class="token parameter variable">-o</span> PROPAGATION /
PROPAGATION
shared
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这种情况下，请参阅 <a href="https://man.archlinux.org/man/mount.8#Shared_subtree_operations" target="_blank" rel="noopener noreferrer">mount(8) §Shared subtree operations<ExternalLinkIcon/></a> 并临时将挂载设置为共享：</p>
<h2 id="🔥-conclusion" tabindex="-1"><a class="header-anchor" href="#🔥-conclusion" aria-hidden="true">#</a> 🔥 Conclusion</h2>
<p>We believe the security of managing the docker daemon needs a lot of improvement, before we can think of opening up access to non-privileged users directly. Until these fixes are made <code v-pre>sudo</code> is the best option. We’re working on better options, but for the time being we strongly recommend using <code v-pre>sudo</code>.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">sealer_path</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">whereis</span> sealer <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">':'</span> <span class="token parameter variable">-f2</span><span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token variable">$sealer_path</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">sealer</span><span class="token operator">=</span><span class="token string">'sudo $sealer_path'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>sealos :</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sealos_path=$(whereis sealos | cut -d ':' -f2) &amp;&amp; alias sealos='sudo $sealos_path'sealos_path=$(whereis sealos | cut -d ':' -f2) &amp;&amp; alias sealos='sudo $sealos_path'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<p><strong>故障排查（是否为Linux安装）：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"bytes"</span>
	<span class="token string">"os/exec"</span>
	<span class="token string">"strings"</span>

	<span class="token string">"github.com/sirupsen/logrus"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	out<span class="token punctuation">,</span> err <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">"docker"</span><span class="token punctuation">,</span> <span class="token string">"info"</span><span class="token punctuation">,</span> <span class="token string">"--format"</span><span class="token punctuation">,</span> <span class="token string">"'{{.OSType}}'"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Output</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logrus<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Failed to get docker info: %v"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	ostype <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>bytes<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> <span class="token string">"'"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> ostype <span class="token operator">==</span> <span class="token string">"Linux"</span> <span class="token punctuation">{</span>
		logrus<span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">"Host information: OSType=%s"</span><span class="token punctuation">,</span> ostype<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		logrus<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">"Error: Unsupported OSType %s"</span><span class="token punctuation">,</span> ostype<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="🗃️-reference" tabindex="-1"><a class="header-anchor" href="#🗃️-reference" aria-hidden="true">#</a> 🗃️ Reference</h2>
<ul>
<li>https://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo</li>
<li>https://projectatomic.io/blog/2015/08/why-we-dont-let-non-root-users-run-docker-in-centos-fedora-or-rhel/</li>
<li>https://docs.docker.com/engine/security/rootless/</li>
<li>https://github.com/containers/buildah/issues/3491</li>
<li>https://github.com/containers/podman/issues/2739</li>
<li>https://rootlesscontaine.rs/getting-started/common/cgroup2/ &amp;&amp; https://rootlesscontaine.rs/</li>
<li><a href="https://kubernetes.io/docs/tasks/configure-pod-container/security-context/" target="_blank" rel="noopener noreferrer">非root身份运行pod<ExternalLinkIcon/></a></li>
<li><a href="https://kubernetes.io/docs/tasks/administer-cluster/kubelet-in-userns/" target="_blank" rel="noopener noreferrer">以非 root 用户身份运行 Kubernetes 节点组件<ExternalLinkIcon/></a></li>
<li><a href="https://wiki.archlinux.org/title/users_and_groups" target="_blank" rel="noopener noreferrer">linux 用户与组 design<ExternalLinkIcon/></a></li>
<li><a href="https://wiki.archlinuxcn.org/wiki/%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E5%88%97%E8%A1%A8/%E5%AE%89%E5%85%A8" target="_blank" rel="noopener noreferrer">应用程序列表/安全<ExternalLinkIcon/></a></li>
<li>https://en.wikipedia.org/wiki/Security-Enhanced_Linux</li>
<li><a href="https://linux-audit.com/linux-capabilities-hardening-linux-binaries-by-removing-setuid/" target="_blank" rel="noopener noreferrer">Linux 功能：通过删除 setuid 强化 Linux 二进制文件<ExternalLinkIcon/></a></li>
<li><a href="https://rootlesscontaine.rs/getting-started/common/subuid/" target="_blank" rel="noopener noreferrer">/etc/subuid 和 /etc/subgid<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/enhancements/tree/master/keps/sig-node/2033-kubelet-in-userns-aka-rootless" target="_blank" rel="noopener noreferrer">KEP-2033：Kubelet-in-UserNS（又名 Rootless 模式）<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/containers/podman/blob/main/rootless.md" target="_blank" rel="noopener noreferrer">podman 缺点<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/kubernetes/minikube/issues/9495" target="_blank" rel="noopener noreferrer">minikube 调查支持无根的要求<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/containers/podman/blob/main/troubleshooting.md" target="_blank" rel="noopener noreferrer">Podman故障排查<ExternalLinkIcon/></a></li>
<li><a href="https://fabianlee.org/2022/08/02/buildah-installing-buildah-and-podman-on-ubuntu-20-04/" target="_blank" rel="noopener noreferrer">podman AND buildah for Ubuntu 20.04 install<ExternalLinkIcon/></a></li>
</ul>
<h3 id="advance-of-right" tabindex="-1"><a class="header-anchor" href="#advance-of-right" aria-hidden="true">#</a> Advance of right</h3>
<ul>
<li>
<p><strong><a href="https://wiki.archlinuxcn.org/wiki/Doas" target="_blank" rel="noopener noreferrer">doas<ExternalLinkIcon/></a></strong> — OpenBSD 的<em>doas</em>命令的可移植版本，与 sudo 相比以体积小得多而闻名。</p>
</li>
<li>
<p><strong><a href="https://man.archlinux.org/man/pkexec.1" target="_blank" rel="noopener noreferrer">pkexec(1)<ExternalLinkIcon/></a></strong> — 一个<a href="https://wiki.archlinuxcn.org/wiki/Polkit" target="_blank" rel="noopener noreferrer">Polkit<ExternalLinkIcon/></a>应用程序，允许授权用户以另一个用户身份运行命令或交互式 shell。使用 Polkit 规则配置。</p>
</li>
<li>
<p><strong><a href="https://wiki.archlinuxcn.org/wiki/Su" target="_blank" rel="noopener noreferrer">su<ExternalLinkIcon/></a></strong> — 用于假定系统上另一个用户身份的命令。</p>
</li>
<li>
<p><strong><a href="https://wiki.archlinuxcn.org/wiki/Sudo" target="_blank" rel="noopener noreferrer">sudo<ExternalLinkIcon/></a></strong> - 委托以 root 或其他用户身份运行命令的能力的命令，同时提供审计跟踪。</p>
</li>
</ul>
<p>[1]:  <em>通常允许受信任的二进制文件使用 root 权限来执行是有意义的。软件的不幸之处在于它可能包含错误。因此，即使是 setuid 二进制文件的最小错误也可能导致完全妥协。</em></p>
</div></template>


