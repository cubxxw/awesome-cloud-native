<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第30节-k8s-开发环境搭建" tabindex="-1"><a class="header-anchor" href="#第30节-k8s-开发环境搭建" aria-hidden="true">#</a> 第30节 K8s 开发环境搭建</h1>
<div><a href = '29.md' style='float:left'>⬆️上一节🔗  </a><a href = '31.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="所需要的软件包" tabindex="-1"><a class="header-anchor" href="#所需要的软件包" aria-hidden="true">#</a> 所需要的软件包</h2>
<ul>
<li>GNU Development Tool (非必须：Linux开发的时候必备工具)</li>
<li>etcd</li>
<li>go</li>
<li>docker（虽然现在只需要 containerd，docker 自带 containerd）</li>
<li>jq （某些帮助脚本的需要，命令行的json处理器）</li>
<li>PyYAML （一些测试相关）</li>
<li>OpenSSL 和 CFSSL</li>
<li>rsync （文件传输）</li>
</ul>
<h2 id="安装gnu" tabindex="-1"><a class="header-anchor" href="#安装gnu" aria-hidden="true">#</a> 安装GNU</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> build-essential  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="安装docker" tabindex="-1"><a class="header-anchor" href="#安装docker" aria-hidden="true">#</a> 安装Docker</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> update  
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token punctuation">\</span>  
    ca-certificates <span class="token punctuation">\</span>  
    <span class="token function">curl</span> <span class="token punctuation">\</span>  
    gnupg <span class="token punctuation">\</span>  
    lsb-release  

<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/ubuntu/gpg <span class="token operator">|</span> <span class="token function">sudo</span> gpg <span class="token parameter variable">--dearmor</span> <span class="token parameter variable">-o</span> /usr/share/keyrings/docker-archive-keyring.gpg  

<span class="token builtin class-name">echo</span> <span class="token punctuation">\</span>  
  <span class="token string">"deb [arch=<span class="token variable"><span class="token variable">$(</span>dpkg --print-architecture<span class="token variable">)</span></span> signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \  
  <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> stable"</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/docker.list <span class="token operator">></span> /dev/null  

<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="修改containerd-所用的镜像库地址" tabindex="-1"><a class="header-anchor" href="#修改containerd-所用的镜像库地址" aria-hidden="true">#</a> 修改ContainerD 所用的镜像库地址</h2>
<p><strong>Containerd应用</strong>:</p>
<p>containerd的默认配置文件为<code v-pre>/etc/containerd/config.toml</code>，可通过命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>containerd config default ##查看默认配置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>修改信息</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>containerd config default <span class="token operator">></span> ~/config.toml  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后编辑<code v-pre>～config.toml</code>去添加信息：</p>
<details class="custom-container details"><summary>生成的配置文件：</summary>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">[</span>stream_processors<span class="token punctuation">]</span>

  <span class="token punctuation">[</span>stream_processors<span class="token punctuation">.</span><span class="token string">"io.containerd.ocicrypt.decoder.v1.tar"</span><span class="token punctuation">]</span>
    accepts <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"application/vnd.oci.image.layer.v1.tar+encrypted"</span><span class="token punctuation">]</span>
    args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"--decryption-keys-path"</span><span class="token punctuation">,</span> <span class="token string">"/etc/containerd/ocicrypt/keys"</span><span class="token punctuation">]</span>
    env <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"OCICRYPT_KEYPROVIDER_CONFIG=/etc/containerd/ocicrypt/ocicrypt_keyprovider.conf"</span><span class="token punctuation">]</span>
    path <span class="token operator">=</span> <span class="token string">"ctd-decoder"</span>
    returns <span class="token operator">=</span> <span class="token string">"application/vnd.oci.image.layer.v1.tar"</span>

  <span class="token punctuation">[</span>stream_processors<span class="token punctuation">.</span><span class="token string">"io.containerd.ocicrypt.decoder.v1.tar.gzip"</span><span class="token punctuation">]</span>
    accepts <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"application/vnd.oci.image.layer.v1.tar+gzip+encrypted"</span><span class="token punctuation">]</span>
    args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"--decryption-keys-path"</span><span class="token punctuation">,</span> <span class="token string">"/etc/containerd/ocicrypt/keys"</span><span class="token punctuation">]</span>
    env <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"OCICRYPT_KEYPROVIDER_CONFIG=/etc/containerd/ocicrypt/ocicrypt_keyprovider.conf"</span><span class="token punctuation">]</span>
    path <span class="token operator">=</span> <span class="token string">"ctd-decoder"</span>
    returns <span class="token operator">=</span> <span class="token string">"application/vnd.oci.image.layer.v1.tar+gzip"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mv</span> ~/config.toml /etc/containerd/config.toml
<span class="token function">sudo</span> systemctl restart containerd  
<span class="token function">sudo</span> systemctl restart containerd.service <span class="token comment">#重启服务</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">需要？</p>
<p>默认 contarnerd 配置文件没有生成的，所以 contarnerd 默认把配置文件导入到配置文件中去。</p>
</div>
<h2 id="安装rsync" tabindex="-1"><a class="header-anchor" href="#安装rsync" aria-hidden="true">#</a> 安装rsync:</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/Downloads  
<span class="token function">wget</span> https://ghproxy.com/https://github.com/WayneD/rsync/archive/refs/tags/v3.2.4.tar.gz  
<span class="token function">tar</span> <span class="token parameter variable">-xf</span> v3.2.4.tar.gz  
<span class="token builtin class-name">cd</span> rsync-3.2.4  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>安装一些工具包</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> gcc g++ <span class="token function">gawk</span> autoconf automake python3-cmarkgfm  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> acl libacl1-dev  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> attr libattr1-dev  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> libxxhash-dev  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> libzstd-dev  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> liblz4-dev  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> libssl-dev  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>如果安装失败重试就好</p>
</blockquote>
<p><strong>编译，安装：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>./configure  
<span class="token function">make</span>  
<span class="token function">sudo</span> <span class="token function">cp</span> ./rsync /usr/local/bin/  
<span class="token function">sudo</span> <span class="token function">cp</span> ./rsync-ssl /usr/local/bin/  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装jq" tabindex="-1"><a class="header-anchor" href="#安装jq" aria-hidden="true">#</a> 安装jq：</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo apt-get install jq  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="安装pyyaml" tabindex="-1"><a class="header-anchor" href="#安装pyyaml" aria-hidden="true">#</a> 安装PyYaml:</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> python3-pip
pip <span class="token function">install</span> pyyaml
<span class="token comment"># 可选 apt install ipython3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装etcd" tabindex="-1"><a class="header-anchor" href="#安装etcd" aria-hidden="true">#</a> 安装etcd：</h2>
<blockquote>
<p><strong>etcd</strong> 的安装比较重要，步骤也是比较多一点的~</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">ETCD_VER</span><span class="token operator">=</span>v3.5.4  
<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://storage.googleapis.com/etcd/<span class="token variable">${ETCD_VER}</span>/etcd-<span class="token variable">${ETCD_VER}</span>-linux-amd64.tar.gz <span class="token parameter variable">-o</span> /tmp/etcd-<span class="token variable">${ETCD_VER}</span>-linux-amd64.tar.gz  
<span class="token function">mkdir</span> ~/etcd  
<span class="token function">tar</span> xzvf /tmp/etcd-<span class="token variable">${ETCD_VER}</span>-linux-amd64.tar.gz <span class="token parameter variable">-C</span> ~/etcd --strip-components<span class="token operator">=</span><span class="token number">1</span>  
<span class="token function">rm</span> <span class="token parameter variable">-f</span> /tmp/etcd-<span class="token variable">${ETCD_VER}</span>-linux-amd64.tar.gz  

<span class="token function">sudo</span> <span class="token function">vim</span> ~/.bashrc  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后加入：<code v-pre>export PATH=&quot;/home/&lt;用户名&gt;/etcd:${PATH}&quot;</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>source ~/.bashrc  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>建议加入自定义环境目录：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>source /etc/profile.d/mypath.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>测试：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/etcd<span class="token comment"># etcd --version</span>
etcd Version: <span class="token number">3.5</span>.4
Git SHA: 08407ff76
Go Version: go1.16.15
Go OS/Arch: linux/amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h2 id="安装golang-1-24及以上需要golang-1-18" tabindex="-1"><a class="header-anchor" href="#安装golang-1-24及以上需要golang-1-18" aria-hidden="true">#</a> 安装golang (1.24及以上需要golang 1.18)：</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/Downloads  
<span class="token function">wget</span> https://golang.google.cn/dl/go1.19.3.linux-amd64.tar.gz  
<span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /usr/local/go <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">tar</span> <span class="token parameter variable">-C</span> /usr/local <span class="token parameter variable">-xzf</span> go1.19.3.linux-amd64.tar.gz  

<span class="token function">mkdir</span> ~/go   <span class="token comment"># 根目录</span>
<span class="token function">mkdir</span> ~/go/src  <span class="token comment"># 源文件存放</span>
<span class="token function">mkdir</span> ~/go/bin  <span class="token comment"># 我们用go get / go install 安装的可执行文件</span>
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/profile.d/mypath.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后加入如下几行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPATH</span><span class="token operator">=</span><span class="token string">"/home/&lt;用户名>/go"</span>  
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOBIN</span><span class="token operator">=</span><span class="token string">"/home/&lt;用户名>/go/bin"</span>  
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">"/usr/local/go/bin:<span class="token variable">$GOPATH</span>/bin:<span class="token variable">${<span class="token environment constant">PATH</span>}</span>"</span>  

<span class="token builtin class-name">source</span> /etc/profile.d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">警告</p>
<p>有一些比较深的设置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">vim</span> /etc/sudoers  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div>
<p>在secure_path一行加入如下目录：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>/usr/local/go/bin （这个是<span class="token variable">$GOPATH</span>/bin目录）
/home/<span class="token operator">&lt;</span>用户名<span class="token operator">></span>/etcd （这个是etcd命令所在目录）
/home/<span class="token operator">&lt;</span>用户名<span class="token operator">></span>/go/bin （这个是go get安装的程序所在位置）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>💡简单的一个案例如下：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Defaults	<span class="token assign-left variable">secure_path</span><span class="token operator">=</span><span class="token string">"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin:/usr/local/go/bin:/root/etcd:/root/go/bin"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<h3 id="设置golang代理" tabindex="-1"><a class="header-anchor" href="#设置golang代理" aria-hidden="true">#</a> 设置golang代理：</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span><span class="token string">"on"</span>  
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span><span class="token string">"https://goproxy.cn,direct"</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="安装cfssl" tabindex="-1"><a class="header-anchor" href="#安装cfssl" aria-hidden="true">#</a> 安装CFSSL：</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>go <span class="token function">install</span> github.com/cloudflare/cfssl/cmd/<span class="token punctuation">..</span>.@latest  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>cfssl 用于 kubernetes 的证书生成的。</p>
</div>
<h2 id="下载kubernetes代码" tabindex="-1"><a class="header-anchor" href="#下载kubernetes代码" aria-hidden="true">#</a> 下载kubernetes代码：</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token variable">$GOPATH</span>/src/k8s.io  <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> <span class="token variable">$GOPATH</span>/src/k8s.io
<span class="token function">git</span> clone https://ghproxy.com/https://github.com/kubernetes/kubernetes.git  
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> kube1.24 v1.24.0  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">为什么需要在 `$GOPATH/src/k8s.io`</p>
<p>kubernetes 历史悠久，所以，最好是选择放入到 <code v-pre>$GOPATH/src/k8s.io</code> 最不容易出现错误。</p>
</div>
<h2 id="设置git" tabindex="-1"><a class="header-anchor" href="#设置git" aria-hidden="true">#</a> 设置git</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> <span class="token function">git</span> remote <span class="token function">rm</span> origin <span class="token comment"># 不建议删除，如果你使用的不是最新版</span>
 <span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/cubxxw/kubernetes.git
 <span class="token function">git</span> remote <span class="token function">add</span> upstream https://github.com/kubernetes/kubernetes.git
 <span class="token function">git</span> remote set-url <span class="token parameter variable">--push</span> upstream no-pushing
 <span class="token function">git</span> remote -v<span class="token punctuation">;</span> <span class="token function">git</span> branch <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kubernetes-makefile" tabindex="-1"><a class="header-anchor" href="#kubernetes-makefile" aria-hidden="true">#</a> Kubernetes Makefile</h2>
<p>或许可以直接编译， 事实上 Kubernetes 官方也推荐 Kind 工具。</p>
<p>在 Kubernetes 中的 Github README.md 文档中介绍了：</p>
<h3 id="to-start-developing-k8s" tabindex="-1"><a class="header-anchor" href="#to-start-developing-k8s" aria-hidden="true">#</a> To start developing K8s</h3>
<p><a href="https://git.k8s.io/community" target="_blank" rel="noopener noreferrer">社区存储库<ExternalLinkIcon/></a>包含了所有关于从源代码构建Kubernetes的信息，包括如何贡献代码和文档，联系谁等等。</p>
<p><strong>如果您想立即构建Kubernetes，有两种选择：</strong></p>
<h4 id="你有一个工作的go语言环境。" tabindex="-1"><a class="header-anchor" href="#你有一个工作的go语言环境。" aria-hidden="true">#</a> 你有一个工作的Go语言环境。</h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>mkdir <span class="token operator">-</span>p $GOPATH<span class="token operator">/</span>src<span class="token operator">/</span>k8s<span class="token punctuation">.</span>io
cd $GOPATH<span class="token operator">/</span>src<span class="token operator">/</span>k8s<span class="token punctuation">.</span>io
git clone https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>kubernetes<span class="token operator">/</span>kubernetes
cd kubernetes
<span class="token builtin">make</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="您有一个工作的docker环境。" tabindex="-1"><a class="header-anchor" href="#您有一个工作的docker环境。" aria-hidden="true">#</a> 您有一个工作的Docker环境。</h4>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>git clone https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>kubernetes<span class="token operator">/</span>kubernetes
cd kubernetes
<span class="token builtin">make</span> quick<span class="token operator">-</span>release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For the full story, head over to the <a href="https://git.k8s.io/community/contributors/devel#readme" target="_blank" rel="noopener noreferrer">developer's documentation<ExternalLinkIcon/></a>.</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '29.md' style='float:left'>⬆️上一节🔗  </a><a href = '31.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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
<h3 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h3>
<ul>
<li><a href="https://analyticsindiamag.com/7-free-learning-resources-for-kubernetes/" target="_blank" rel="noopener noreferrer">https://analyticsindiamag.com/7-free-learning-resources-for-kubernetes/<ExternalLinkIcon/></a></li>
</ul>
</div></template>


