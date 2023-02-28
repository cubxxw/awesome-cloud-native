import{_ as o,r as i,o as l,c,a as n,b as e,d as t,e as s}from"./app.af1c630d.js";const p={},r=t('<h1 id="sealer-rootless-design" tabindex="-1"><a class="header-anchor" href="#sealer-rootless-design" aria-hidden="true">#</a> sealer rootless design</h1><h2 id="\u{1F50D}-desired-state" tabindex="-1"><a class="header-anchor" href="#\u{1F50D}-desired-state" aria-hidden="true">#</a> \u{1F50D} Desired state</h2><ul><li>[ ] sealer run (cluster)</li><li>[ ] sealer images (image)</li><li>[ ] \u901A\u8FC7\u5220\u9664 setuid \u52A0\u56FA Linux \u4E8C\u8FDB\u5236\u6587\u4EF6[^1]</li><li>[ ]</li></ul><blockquote><p><code>setuid</code> \u662F\u4E00\u4E2A Unix \u64CD\u4F5C\u7CFB\u7EDF\u7684\u6743\u9650\u6807\u5FD7\uFF0C\u7528\u4E8E\u7ED9\u4E88\u7279\u5B9A\u7A0B\u5E8F\u5728\u8FD0\u884C\u65F6\u7279\u5B9A\u7684\u6743\u9650\u3002\u5F53\u4E00\u4E2A\u7A0B\u5E8F\u5177\u6709 <code>setuid</code> \u6807\u5FD7\u65F6\uFF0C\u5B83\u4EE5\u5176\u6587\u4EF6\u6240\u6709\u8005\u7684\u8EAB\u4EFD\u8FD0\u884C\uFF0C\u800C\u4E0D\u662F\u4EE5\u5F53\u524D\u7528\u6237\u7684\u8EAB\u4EFD\u8FD0\u884C\u3002\u8FD9\u53EF\u4EE5\u7528\u4E8E\u5141\u8BB8\u975E\u7279\u6743\u7528\u6237\u6267\u884C\u7279\u6743\u64CD\u4F5C\uFF0C\u4F8B\u5982\u8BBF\u95EE\u7279\u6B8A\u6587\u4EF6\u6216\u6267\u884C\u7279\u6B8A\u64CD\u4F5C\u3002</p></blockquote><h2 id="\u{1F4D6}-solution-ideas" tabindex="-1"><a class="header-anchor" href="#\u{1F4D6}-solution-ideas" aria-hidden="true">#</a> \u{1F4D6} Solution Ideas</h2><p>\u6216\u8BB8\u53EF\u4EE5\u53C2\u8003 docker \u7684 docker \u7528\u6237\u7EC4\u6743\u9650\u8BBE\u7F6E\uFF0C\u6765\u89E3\u51B3 rootless \u95EE\u9898</p>',6),u={href:"https://rootlesscontaine.rs/",target:"_blank",rel:"noopener noreferrer"},d=s("https://rootlesscontaine.rs/"),k=t(`<p>\u501F\u52A9 <code>buildah</code> \u65E0\u6839\u6A21\u5F0F\u7684\u8BBE\u8BA1\uFF0C\u6784\u5EFA\u51FA rootless\u3002</p><blockquote><p>\u26A0\uFE0F \u6CE8\u610F\uFF1A <code>buildah</code> \u9ED8\u8BA4\u662F\u652F\u6301\u4E94\u6839\u6A21\u5F0F\u7684\uFF01</p></blockquote><p>\u65B9\u6848\uFF1A</p><ul><li>[ ] Alias sealer = /usr/bin/sealer (unalias sealer)</li><li>[ ] With the <code>group</code> ownership the <code>sealer</code> group</li><li>[ ] Add related documents</li></ul><p>There are 3 ways to use <code>Sealer</code> and <code>Buildah</code> in a container:</p><ol><li>Linux kernel with rootless overlayfs. \u5177\u6709\u65E0\u6839\u8986\u76D6\u5C42\u7684 Linux \u5185\u6838\u3002</li><li>Linux kernel without rootless overlayfs and privileged container. \u6CA1\u6709\u65E0\u6839\u8986\u76D6\u5C42\u548C\u7279\u6743\u5BB9\u5668\u7684 Linux \u5185\u6838\u3002</li><li>Linux kernel without rootless overlayfs and non-privileged container with special options. \u6CA1\u6709\u65E0\u6839\u8986\u76D6\u5C42\u7684 Linux \u5185\u6838\u548C\u5177\u6709\u7279\u6B8A\u9009\u9879\u7684\u975E\u7279\u6743\u5BB9\u5668\u3002</li></ol><h3 id="\u{1F58A}\uFE0F-todo" tabindex="-1"><a class="header-anchor" href="#\u{1F58A}\uFE0F-todo" aria-hidden="true">#</a> \u{1F58A}\uFE0F TODO</h3><ul><li><p>[ ] <code>rootless</code> \u6A21\u5F0F\u4E0B\u4E00\u952E\u5B89\u88C5 <code>sealer</code> \u811A\u672C\uFF08\u6CA1\u6709\u6743\u9650\uFF09</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">wget</span> https://github.com/sealerio/sealer/releases/download/v0.9.0/sealer-v0.9.0-linux-amd64.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token punctuation">\\</span>
<span class="token function">tar</span> zxvf sealer-v0.9.0-linux-amd64.tar.gz <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">mv</span> sealer /usr/bin <span class="token punctuation">;</span> sealer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>[ ] \u5355\u8282\u70B9\u975E\u9AD8\u53EF\u4EE5\u7528\u72B6\u6001\u5B89\u88C5\u53D6\u6D88 <code>\u2013masters</code></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> sealer run docker.io/sealerio/kubernetes:v1.22.15 
<span class="token comment">#2023-02-05 16:32:44 [ERROR] [root.go:75] sealer-v0.9.0: you must input master ip Or use Clusterfile</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>[ ]</p></li></ul><h3 id="\u{1F3F7}\uFE0F-error-logged" tabindex="-1"><a class="header-anchor" href="#\u{1F3F7}\uFE0F-error-logged" aria-hidden="true">#</a> \u{1F3F7}\uFE0F Error logged</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>test@cubmaster01:/tmp$ sealer run docker.io/sealerio/kubernetes:v1.22.15
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7B2C\u4E00\u4E2A\u65E0\u6743\u9650\uFF1A</p><blockquote><p>\u53C2\u8003 docker \u7684\u7EC4\u6743\u9650\uFF1A</p><p>\u5982\u679C\u60A8\u4E0D\u60F3\u5728<code>docker</code>\u547D\u4EE4\u524D\u52A0\u4E0A<code>sudo</code>\uFF0C\u8BF7\u521B\u5EFA\u4E00\u4E2A\u540D\u4E3A \u7684 Unix \u7EC4<code>docker</code>\u5E76\u5C06\u7528\u6237\u6DFB\u52A0\u5230\u5176\u4E2D\u3002\u5F53 Docker \u5B88\u62A4\u8FDB\u7A0B\u542F\u52A8\u65F6\uFF0C\u5B83\u4F1A\u521B\u5EFA\u4E00\u4E2A\u53EF\u4F9B<code>docker</code>\u7EC4\u6210\u5458\u8BBF\u95EE\u7684 Unix \u5957\u63A5\u5B57\u3002\u5728\u67D0\u4E9B Linux \u53D1\u884C\u7248\u4E0A\uFF0C\u7CFB\u7EDF\u4F1A\u5728\u4F7F\u7528\u5305\u7BA1\u7406\u5668\u5B89\u88C5 Docker Engine \u65F6\u81EA\u52A8\u521B\u5EFA\u6B64\u7EC4\u3002\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u60A8\u65E0\u9700\u624B\u52A8\u521B\u5EFA\u7EC4\u3002</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">2023</span>-02-05 <span class="token number">13</span>:40:49 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-unknown: <span class="token function">open</span> /etc/containers/policy.json: permission denied
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6743\u9650\u5206\u914D\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">groupadd</span> seal<span class="token punctuation">;</span>
<span class="token function">sudo</span> <span class="token function">useradd</span> sealer<span class="token punctuation">;</span><span class="token function">sudo</span> sealer <span class="token function">mkdir</span> /home/sealer<span class="token punctuation">;</span> <span class="token function">chmod</span> <span class="token number">777</span> /home/sealer 
<span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-g</span> seal sealer<span class="token punctuation">;</span>
<span class="token function">sudo</span> <span class="token function">usermod</span> <span class="token parameter variable">-aG</span> seal <span class="token environment constant">$USER</span><span class="token punctuation">;</span>
<span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">777</span>	/etc/containers/storage.conf<span class="token punctuation">;</span>

<span class="token comment"># Free of secret\uFF08roor user)</span>
<span class="token function">sudo</span> <span class="token builtin class-name">echo</span> <span class="token string">&quot;sealer ALL=(ALL) NOPASSWD: NOPASSWD: ALL&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/sudoers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>sudo \u63D0\u6743\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ubuntu@i-02v830ud:~$ <span class="token function">sudo</span> sealer run docker.io/sealerio/kubernetes:v1.22.15 <span class="token parameter variable">--masters</span> <span class="token number">10.160</span>.25.43
<span class="token number">2023</span>-02-06 <span class="token number">10</span>:34:55 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: failed to <span class="token function">install</span> docker: execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on <span class="token function">host</span> <span class="token punctuation">(</span><span class="token number">10.160</span>.25.43<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>failed to execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on host<span class="token punctuation">(</span><span class="token number">10.160</span>.25.43<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>exit status <span class="token number">1</span><span class="token punctuation">))</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u89E3\u51B3\u65B9\u6848\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token number">2023</span>-02-07 <span class="token number">16</span>:29:37 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: failed to <span class="token function">install</span> docker: execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on <span class="token function">host</span> <span class="token punctuation">(</span><span class="token number">10.0</span>.4.3<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>failed to execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on host<span class="token punctuation">(</span><span class="token number">10.0</span>.4.3<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>exit status <span class="token number">127</span><span class="token punctuation">))</span><span class="token number">2023</span>-02-07 <span class="token number">16</span>:29:37 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: failed to <span class="token function">install</span> docker: execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on <span class="token function">host</span> <span class="token punctuation">(</span><span class="token number">10.0</span>.4.3<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>failed to execute command<span class="token punctuation">(</span>bash /var/lib/sealer/data/my-cluster/rootfs/scripts/docker.sh <span class="token punctuation">)</span> on host<span class="token punctuation">(</span><span class="token number">10.0</span>.4.3<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>exit status <span class="token number">127</span><span class="token punctuation">))</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><p>docker \u5B88\u62A4\u8FDB\u7A0B \u642D\u8F7D\u5931\u8D25\uFF1A</p><p>\uFF08root user and sudo user)</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>docker: Error response from daemon: cgroups: cgroup mountpoint does not exist: unknown.docker: Error response from daemon: cgroups: cgroup mountpoint does not exist: unknown.
---
<span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: failed to execute command<span class="token punctuation">(</span>RegistryDomain<span class="token operator">=</span><span class="token string">&quot;sea.hub&quot;</span> <span class="token assign-left variable">RegistryPort</span><span class="token operator">=</span><span class="token string">&quot;5000&quot;</span> <span class="token assign-left variable">RegistryURL</span><span class="token operator">=</span><span class="token string">&quot;sea.hub:5000&quot;</span> <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> /var/lib/sealer/data/my-cluster/rootfs/scripts <span class="token operator">&amp;&amp;</span> <span class="token function">bash</span> init-registry.sh <span class="token number">5000</span> /var/lib/sealer/data/my-cluster/rootfs/registry sea.hub<span class="token punctuation">)</span> on host<span class="token punctuation">(</span><span class="token number">10.160</span>.25.43<span class="token punctuation">)</span>: error<span class="token punctuation">(</span>exit status <span class="token number">1</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mount \u6302\u8F7D\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ubuntu@i-02v830ud:~$ sealer run docker.io/sealerio/kubernetes:v1.22.15 <span class="token parameter variable">--masters</span> <span class="token number">10.160</span>.25.43
<span class="token number">2023</span>-02-06 <span class="token number">14</span>:15:06 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: cannot <span class="token function">mount</span> using driver overlay <span class="token keyword">in</span> rootless mode. You need to run it <span class="token keyword">in</span> a <span class="token variable"><span class="token variable">\`</span>buildah unshare<span class="token variable">\`</span></span> session
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>[ ] \u4E09\u8282\u70B9 <code>Kubectl</code> \u4E0E\u670D\u52A1\u5668 <code>localhost:8080</code> \u8FDE\u63A5\u88AB\u62D2\u7EDD\uFF1A</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>sealer@iZuf68xky083mr0yy6q37lZ ~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> kubectl get nodes
W0208 <span class="token number">20</span>:11:28.049909    <span class="token number">4138</span> loader.go:221<span class="token punctuation">]</span> Config not found: /home/sealer/admin.conf
The connection to the server localhost:8080 was refused - did you specify the right <span class="token function">host</span> or port?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u89E3\u51B3\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">KUBECONFIG</span><span class="token operator">=</span>/etc/kubernetes/admin.conf 
<span class="token function">cp</span> /etc/kubernetes/admin.conf <span class="token environment constant">$HOME</span>/
<span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span><span class="token variable"><span class="token variable">$(</span><span class="token function">id</span> <span class="token parameter variable">-g</span><span class="token variable">)</span></span> <span class="token environment constant">$HOME</span>/admin.conf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>[ ] \u975E <code>sudo</code> \u4E0D\u80FD\u4F7F\u7528 <code>kubectl</code> \uFF1A</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>sealer@iZuf68xky083mr0yy6q37lZ ~<span class="token punctuation">]</span>$ kubectl get nodes 
W0208 <span class="token number">21</span>:02:48.870473   <span class="token number">30557</span> loader.go:221<span class="token punctuation">]</span> Config not found: /home/sealer/admin.conf
The connection to the server localhost:8080 was refused - did you specify the right <span class="token function">host</span> or port?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>[ ] sealer images</li></ul><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">[</span>sealer@iZuf68xky083mr0yy6q37lZ ~<span class="token punctuation">]</span>$ sealer images
<span class="token number">2023</span>-02-09 <span class="token number">11</span>:09:47 <span class="token punctuation">[</span>ERROR<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:75<span class="token punctuation">]</span> sealer-v0.9.0: unable to <span class="token function">make</span> rootless runtime: <span class="token function">mkdir</span> /run/user/0/containers: permission de
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>https://github.com/containers/storage/issues/1505</li></ul><p>\u89E3\u51B3\uFF08\u975E\u6B63\u5E38\u624B\u6BB5\uFF09\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mkdir</span> /run/user/0 \uFF1B <span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">700</span> /run/user/0 <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">chown</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">whoami</span><span class="token variable">)</span></span><span class="token builtin class-name">:</span> /run/user/0
<span class="token comment"># \u53EA\u9700\u521B\u5EFA\u65E7\u7528\u6237\u76EE\u5F55\u5E76\u6388\u4E88\u60A8\u7684\u7528\u6237\u4F7F\u7528\u8BE5\u76EE\u5F55\u7684\u6743\u5229</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>[ ] <code>WARN[0000] &quot;/&quot; is not a shared mount, this could cause issues or missing mounts with rootless containers</code></li></ul><p>\u89E3\u51B3\uFF1A\u65E0\u6839\u6A21\u5F0F\u8FD0\u884C\u7684 Buildah/Podman \u671F\u671B\u5171\u4EAB\u7ED1\u5B9A\u6302\u8F7D\uFF0C\u68C0\u67E5\u5B83\u662F\u5426\u8BBE\u7F6E\u4E3A\u79C1\u6709\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token punctuation">]</span>$ findmnt <span class="token parameter variable">-o</span> PROPAGATION /
PROPAGATION
shared
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,37),h=s("\u5728\u8FD9\u79CD\u60C5\u51B5\u4E0B\uFF0C\u8BF7\u53C2\u9605 "),m={href:"https://man.archlinux.org/man/mount.8#Shared_subtree_operations",target:"_blank",rel:"noopener noreferrer"},b=s("mount(8) \xA7Shared subtree operations"),v=s(" \u5E76\u4E34\u65F6\u5C06\u6302\u8F7D\u8BBE\u7F6E\u4E3A\u5171\u4EAB\uFF1A"),g=t(`<h2 id="\u{1F525}-conclusion" tabindex="-1"><a class="header-anchor" href="#\u{1F525}-conclusion" aria-hidden="true">#</a> \u{1F525} Conclusion</h2><p>We believe the security of managing the docker daemon needs a lot of improvement, before we can think of opening up access to non-privileged users directly. Until these fixes are made <code>sudo</code> is the best option. We\u2019re working on better options, but for the time being we strongly recommend using <code>sudo</code>.</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">sealer_path</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">whereis</span> sealer <span class="token operator">|</span> <span class="token function">cut</span> <span class="token parameter variable">-d</span> <span class="token string">&#39;:&#39;</span> <span class="token parameter variable">-f2</span><span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token variable">$sealer_path</span>
<span class="token builtin class-name">alias</span> <span class="token assign-left variable">sealer</span><span class="token operator">=</span><span class="token string">&#39;sudo $sealer_path&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>sealos :</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sealos_path=$(whereis sealos | cut -d &#39;:&#39; -f2) &amp;&amp; alias sealos=&#39;sudo $sealos_path&#39;sealos_path=$(whereis sealos | cut -d &#39;:&#39; -f2) &amp;&amp; alias sealos=&#39;sudo $sealos_path&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><p><strong>\u6545\u969C\u6392\u67E5\uFF08\u662F\u5426\u4E3ALinux\u5B89\u88C5\uFF09\uFF1A</strong></p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;bytes&quot;</span>
	<span class="token string">&quot;os/exec&quot;</span>
	<span class="token string">&quot;strings&quot;</span>

	<span class="token string">&quot;github.com/sirupsen/logrus&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	out<span class="token punctuation">,</span> err <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span><span class="token string">&quot;docker&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;info&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;--format&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;&#39;{{.OSType}}&#39;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Output</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		logrus<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;Failed to get docker info: %v&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	ostype <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">TrimSpace</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>bytes<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> <span class="token string">&quot;&#39;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> ostype <span class="token operator">==</span> <span class="token string">&quot;Linux&quot;</span> <span class="token punctuation">{</span>
		logrus<span class="token punctuation">.</span><span class="token function">Infof</span><span class="token punctuation">(</span><span class="token string">&quot;Host information: OSType=%s&quot;</span><span class="token punctuation">,</span> ostype<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		logrus<span class="token punctuation">.</span><span class="token function">Errorf</span><span class="token punctuation">(</span><span class="token string">&quot;Error: Unsupported OSType %s&quot;</span><span class="token punctuation">,</span> ostype<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u{1F5C3}\uFE0F-reference" tabindex="-1"><a class="header-anchor" href="#\u{1F5C3}\uFE0F-reference" aria-hidden="true">#</a> \u{1F5C3}\uFE0F Reference</h2>`,7),f=n("li",null,"https://askubuntu.com/questions/477551/how-can-i-use-docker-without-sudo",-1),_=n("li",null,"https://projectatomic.io/blog/2015/08/why-we-dont-let-non-root-users-run-docker-in-centos-fedora-or-rhel/",-1),x=n("li",null,"https://docs.docker.com/engine/security/rootless/",-1),y=n("li",null,"https://github.com/containers/buildah/issues/3491",-1),q=n("li",null,"https://github.com/containers/podman/issues/2739",-1),w=n("li",null,"https://rootlesscontaine.rs/getting-started/common/cgroup2/ && https://rootlesscontaine.rs/",-1),R={href:"https://kubernetes.io/docs/tasks/configure-pod-container/security-context/",target:"_blank",rel:"noopener noreferrer"},E=s("\u975Eroot\u8EAB\u4EFD\u8FD0\u884Cpod"),O={href:"https://kubernetes.io/docs/tasks/administer-cluster/kubelet-in-userns/",target:"_blank",rel:"noopener noreferrer"},A=s("\u4EE5\u975E root \u7528\u6237\u8EAB\u4EFD\u8FD0\u884C Kubernetes \u8282\u70B9\u7EC4\u4EF6"),L={href:"https://wiki.archlinux.org/title/users_and_groups",target:"_blank",rel:"noopener noreferrer"},$=s("linux \u7528\u6237\u4E0E\u7EC4 design"),S={href:"https://wiki.archlinuxcn.org/wiki/%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E5%88%97%E8%A1%A8/%E5%AE%89%E5%85%A8",target:"_blank",rel:"noopener noreferrer"},T=s("\u5E94\u7528\u7A0B\u5E8F\u5217\u8868/\u5B89\u5168"),P=n("li",null,"https://en.wikipedia.org/wiki/Security-Enhanced_Linux",-1),D={href:"https://linux-audit.com/linux-capabilities-hardening-linux-binaries-by-removing-setuid/",target:"_blank",rel:"noopener noreferrer"},N=s("Linux \u529F\u80FD\uFF1A\u901A\u8FC7\u5220\u9664 setuid \u5F3A\u5316 Linux \u4E8C\u8FDB\u5236\u6587\u4EF6"),B={href:"https://rootlesscontaine.rs/getting-started/common/subuid/",target:"_blank",rel:"noopener noreferrer"},U=s("/etc/subuid \u548C /etc/subgid"),W={href:"https://github.com/kubernetes/enhancements/tree/master/keps/sig-node/2033-kubelet-in-userns-aka-rootless",target:"_blank",rel:"noopener noreferrer"},C=s("KEP-2033\uFF1AKubelet-in-UserNS\uFF08\u53C8\u540D Rootless \u6A21\u5F0F\uFF09"),I={href:"https://github.com/containers/podman/blob/main/rootless.md",target:"_blank",rel:"noopener noreferrer"},Z=s("podman \u7F3A\u70B9"),K={href:"https://github.com/kubernetes/minikube/issues/9495",target:"_blank",rel:"noopener noreferrer"},F=s("minikube \u8C03\u67E5\u652F\u6301\u65E0\u6839\u7684\u8981\u6C42"),G={href:"https://github.com/containers/podman/blob/main/troubleshooting.md",target:"_blank",rel:"noopener noreferrer"},V=s("Podman\u6545\u969C\u6392\u67E5"),z={href:"https://fabianlee.org/2022/08/02/buildah-installing-buildah-and-podman-on-ubuntu-20-04/",target:"_blank",rel:"noopener noreferrer"},H=s("podman AND buildah for Ubuntu 20.04 install"),j=n("h3",{id:"advance-of-right",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#advance-of-right","aria-hidden":"true"},"#"),s(" Advance of right")],-1),M={href:"https://wiki.archlinuxcn.org/wiki/Doas",target:"_blank",rel:"noopener noreferrer"},Y=s("doas"),J=s(" \u2014 OpenBSD \u7684"),Q=n("em",null,"doas",-1),X=s("\u547D\u4EE4\u7684\u53EF\u79FB\u690D\u7248\u672C\uFF0C\u4E0E sudo \u76F8\u6BD4\u4EE5\u4F53\u79EF\u5C0F\u5F97\u591A\u800C\u95FB\u540D\u3002"),nn={href:"https://man.archlinux.org/man/pkexec.1",target:"_blank",rel:"noopener noreferrer"},sn=s("pkexec(1)"),an=s(" \u2014 \u4E00\u4E2A"),en={href:"https://wiki.archlinuxcn.org/wiki/Polkit",target:"_blank",rel:"noopener noreferrer"},tn=s("Polkit"),on=s("\u5E94\u7528\u7A0B\u5E8F\uFF0C\u5141\u8BB8\u6388\u6743\u7528\u6237\u4EE5\u53E6\u4E00\u4E2A\u7528\u6237\u8EAB\u4EFD\u8FD0\u884C\u547D\u4EE4\u6216\u4EA4\u4E92\u5F0F shell\u3002\u4F7F\u7528 Polkit \u89C4\u5219\u914D\u7F6E\u3002"),ln={href:"https://wiki.archlinuxcn.org/wiki/Su",target:"_blank",rel:"noopener noreferrer"},cn=s("su"),pn=s(" \u2014 \u7528\u4E8E\u5047\u5B9A\u7CFB\u7EDF\u4E0A\u53E6\u4E00\u4E2A\u7528\u6237\u8EAB\u4EFD\u7684\u547D\u4EE4\u3002"),rn={href:"https://wiki.archlinuxcn.org/wiki/Sudo",target:"_blank",rel:"noopener noreferrer"},un=s("sudo"),dn=s(" - \u59D4\u6258\u4EE5 root \u6216\u5176\u4ED6\u7528\u6237\u8EAB\u4EFD\u8FD0\u884C\u547D\u4EE4\u7684\u80FD\u529B\u7684\u547D\u4EE4\uFF0C\u540C\u65F6\u63D0\u4F9B\u5BA1\u8BA1\u8DDF\u8E2A\u3002"),kn=n("p",null,[s("[1]: "),n("em",null,"\u901A\u5E38\u5141\u8BB8\u53D7\u4FE1\u4EFB\u7684\u4E8C\u8FDB\u5236\u6587\u4EF6\u4F7F\u7528 root \u6743\u9650\u6765\u6267\u884C\u662F\u6709\u610F\u4E49\u7684\u3002\u8F6F\u4EF6\u7684\u4E0D\u5E78\u4E4B\u5904\u5728\u4E8E\u5B83\u53EF\u80FD\u5305\u542B\u9519\u8BEF\u3002\u56E0\u6B64\uFF0C\u5373\u4F7F\u662F setuid \u4E8C\u8FDB\u5236\u6587\u4EF6\u7684\u6700\u5C0F\u9519\u8BEF\u4E5F\u53EF\u80FD\u5BFC\u81F4\u5B8C\u5168\u59A5\u534F\u3002")],-1);function hn(mn,bn){const a=i("ExternalLinkIcon");return l(),c("div",null,[r,n("ul",null,[n("li",null,[n("a",u,[d,e(a)])])]),k,n("p",null,[h,n("a",m,[b,e(a)]),v]),g,n("ul",null,[f,_,x,y,q,w,n("li",null,[n("a",R,[E,e(a)])]),n("li",null,[n("a",O,[A,e(a)])]),n("li",null,[n("a",L,[$,e(a)])]),n("li",null,[n("a",S,[T,e(a)])]),P,n("li",null,[n("a",D,[N,e(a)])]),n("li",null,[n("a",B,[U,e(a)])]),n("li",null,[n("a",W,[C,e(a)])]),n("li",null,[n("a",I,[Z,e(a)])]),n("li",null,[n("a",K,[F,e(a)])]),n("li",null,[n("a",G,[V,e(a)])]),n("li",null,[n("a",z,[H,e(a)])])]),j,n("ul",null,[n("li",null,[n("p",null,[n("strong",null,[n("a",M,[Y,e(a)])]),J,Q,X])]),n("li",null,[n("p",null,[n("strong",null,[n("a",nn,[sn,e(a)])]),an,n("a",en,[tn,e(a)]),on])]),n("li",null,[n("p",null,[n("strong",null,[n("a",ln,[cn,e(a)])]),pn])]),n("li",null,[n("p",null,[n("strong",null,[n("a",rn,[un,e(a)])]),dn])])]),kn])}const gn=o(p,[["render",hn],["__file","TODO.html.vue"]]);export{gn as default};
