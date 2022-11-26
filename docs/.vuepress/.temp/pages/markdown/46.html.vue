<template><div><h1 id="docker-nfs-文件共享和传输" tabindex="-1"><a class="header-anchor" href="#docker-nfs-文件共享和传输" aria-hidden="true">#</a> docker NFS 文件共享和传输</h1>
<nav class="table-of-contents"><ul><li><router-link to="#容器迁移到另一台服务器">容器迁移到另一台服务器</router-link></li><li><router-link to="#docker-基于-nfs-实现容器文件共享">Docker 基于 NFS 实现容器文件共享</router-link><ul><li><router-link to="#安装">安装</router-link></li></ul></li></ul></nav>
<p>::: danegr 注意
前半部分是容器打包到另一台服务器并且部署</p>
<p>后半部分是重头戏：<strong>NFS容器文件共享~</strong></p>
<p>:::</p>
<h3 id="容器迁移到另一台服务器" tabindex="-1"><a class="header-anchor" href="#容器迁移到另一台服务器" aria-hidden="true">#</a> 容器迁移到另一台服务器</h3>
<details class="custom-container details"><summary>展开查看过程</summary>
<p>1.找到要打包的镜像</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>jaegertracing<span class="token operator">/</span><span class="token keyword">all</span><span class="token operator">-</span><span class="token operator">in</span><span class="token operator">-</span>one                   <span class="token number">1.16</span>      fea586ade9d0   <span class="token number">22</span> months ago   <span class="token number">50.5</span>MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2.打包成文件</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code>docker <span class="token keyword">save</span> <span class="token operator">-</span>o cc<span class="token punctuation">.</span>tar jaegertracing<span class="token operator">/</span><span class="token keyword">all</span><span class="token operator">-</span><span class="token operator">in</span><span class="token operator">-</span>one:<span class="token number">1.16</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.ls 查看刚才以打包的文件</p>
<div class="language-csharp ext-cs line-numbers-mode"><pre v-pre class="language-csharp"><code><span class="token punctuation">[</span>root@master3 <span class="token operator">~</span><span class="token punctuation">]</span># ls
anaconda<span class="token operator">-</span><span class="token return-type class-name">ks<span class="token punctuation">.</span>cfg</span>  cc<span class="token punctuation">.</span><span class="token function">tar</span><span class="token punctuation">(</span>已打包的<span class="token punctuation">)</span>  kubeadm<span class="token operator">-</span>config<span class="token punctuation">.</span>yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>4.导入到需要镜像的服务器</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>scp cc<span class="token punctuation">.</span>tar <span class="token label symbol">root@</span><span class="token number">192.168</span><span class="token punctuation">.</span><span class="token number">200.130</span><span class="token operator">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>5.解压镜像文件</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">[</span>root@node1 ~<span class="token punctuation">]</span><span class="token comment"># docker load &lt; cc.tar </span>
<span class="token key atrule">8f1b3d3ad470</span><span class="token punctuation">:</span> Loading layer <span class="token punctuation">[</span>==================================================<span class="token punctuation">></span><span class="token punctuation">]</span>  217.6kB/217.6kB
<span class="token key atrule">44874aec6671</span><span class="token punctuation">:</span> Loading layer <span class="token punctuation">[</span>==================================================<span class="token punctuation">></span><span class="token punctuation">]</span>  45.46MB/45.46MB
<span class="token key atrule">68b1a9835e66</span><span class="token punctuation">:</span> Loading layer <span class="token punctuation">[</span>==================================================<span class="token punctuation">></span><span class="token punctuation">]</span>  3.584kB/3.584kB
<span class="token key atrule">Loaded image</span><span class="token punctuation">:</span> jaegertracing/all<span class="token punctuation">-</span>in<span class="token punctuation">-</span>one<span class="token punctuation">:</span><span class="token number">1.20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>6.查看刚才导出的镜像</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@node1 ~<span class="token punctuation">]</span><span class="token comment"># docker images </span>
REPOSITORY              
registry.aliyuncs.com/google_containers/pause                          <span class="token number">3.2</span>       80d28bedfe5d   <span class="token number">20</span> months ago   683kB
registry.aliyuncs.com/google_containers/coredns                        <span class="token number">1.6</span>.7     67da37a9a360   <span class="token number">21</span> months ago   <span class="token number">43</span>.8MB
jaegertracing/all-in-one             <span class="token comment"># 已解压的镜像                      1.16      fea586ade9d0   22 months ago   50.5MB             </span>
registry.aliyuncs.com/google_containers/etcd                           <span class="token number">3.4</span>.3-0   303ce5db0e90   <span class="token number">2</span> years ago     288MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h2 id="docker-基于-nfs-实现容器文件共享" tabindex="-1"><a class="header-anchor" href="#docker-基于-nfs-实现容器文件共享" aria-hidden="true">#</a> Docker 基于 NFS 实现容器文件共享</h2>
<div class="custom-container tip"><p class="custom-container-title">什么是 NFS？</p>
<p>NFS（network file system）即网络文件系统，是 FreeBSD 支持的文件系统中的一种，它允许网络中的计算机之间的共享资源。</p>
<p>我们在docker 和 kubernetes 会经常有需求</p>
</div>
<h3 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h3>
<p><strong>服务器准备：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">192.168</span>.71.131  cubnode01
<span class="token number">192.168</span>.71.132  cubnode02
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>centos：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yum insatll -y nfs-utils rpcbind
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>ubuntu：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">apt-get</span> <span class="token parameter variable">-y</span> <span class="token function">install</span> nfs-kernel-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p><strong>编辑/etc/exports下的配置文件：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">>></span> /etc/exports <span class="token operator">&lt;&lt;-</span> <span class="token string">'EOF'
/share 192.168.71.0/24(rw,no_root_squash,sync)
EOF</span><span class="token punctuation">;</span> <span class="token function">cat</span> /etc/exports
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中：</p>
<ul>
<li><code v-pre>*</code>：允许所有的网段访问，也可以使用具体的IP</li>
<li><code v-pre>rw</code>：挂接此目录的客户端对该共享目录具有读写权限</li>
<li><code v-pre>sync</code>：资料同步写入内存和硬盘</li>
<li><code v-pre>no_root_squash</code>：root用户具有对根目录的完全管理访问权限。</li>
<li><code v-pre>no_subtree_check</code>：不检查父目录的权限</li>
</ul>
</blockquote>
<p><strong>重启服务，会自动映射端口：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo /etc/init.d/rpcbind restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>重启nfs服务：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo /etc/init.d/nfs-kernel-server restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>验证：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>exportfs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>创建共享文件夹</strong></p>
<p>如配置文件中所述，在 <code v-pre>/tmp/cubxxw/</code> 路径下创建共享文件夹<code v-pre>share_folder</code>，在其中写一个test.txt文件：</p>
</div></template>


