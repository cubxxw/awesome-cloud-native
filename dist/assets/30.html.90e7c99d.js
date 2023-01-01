import{_ as l,r as t,o,c,a as n,b as a,w as r,e as s,d as p}from"./app.a6c58d15.js";const d={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},v=s("author"),b=n("h1",{id:"\u7B2C30\u8282-k8s-\u5F00\u53D1\u73AF\u5883\u642D\u5EFA",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C30\u8282-k8s-\u5F00\u53D1\u73AF\u5883\u642D\u5EFA","aria-hidden":"true"},"#"),s(" \u7B2C30\u8282 K8s \u5F00\u53D1\u73AF\u5883\u642D\u5EFA")],-1),m=n("div",null,[n("a",{href:"29.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"31.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),k=n("br",null,null,-1),g=s("\u2764\uFE0F\u{1F495}\u{1F495}\u65B0\u65F6\u4EE3\u62E5\u62B1\u4E91\u539F\u751F\uFF0C\u4E91\u539F\u751F\u5177\u6709\u73AF\u5883\u7EDF\u4E00\u3001\u6309\u9700\u4ED8\u8D39\u3001\u5373\u5F00\u5373\u7528\u3001\u7A33\u5B9A\u6027\u5F3A\u7279\u70B9\u3002Myblog:"),h={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},f=s("http://nsddd.top"),x=p(`<hr><p>[TOC]</p><h2 id="\u6240\u9700\u8981\u7684\u8F6F\u4EF6\u5305" tabindex="-1"><a class="header-anchor" href="#\u6240\u9700\u8981\u7684\u8F6F\u4EF6\u5305" aria-hidden="true">#</a> \u6240\u9700\u8981\u7684\u8F6F\u4EF6\u5305</h2><ul><li>GNU Development Tool (\u975E\u5FC5\u987B\uFF1ALinux\u5F00\u53D1\u7684\u65F6\u5019\u5FC5\u5907\u5DE5\u5177)</li><li>etcd</li><li>go</li><li>docker\uFF08\u867D\u7136\u73B0\u5728\u53EA\u9700\u8981 containerd\uFF0Cdocker \u81EA\u5E26 containerd\uFF09</li><li>jq \uFF08\u67D0\u4E9B\u5E2E\u52A9\u811A\u672C\u7684\u9700\u8981\uFF0C\u547D\u4EE4\u884C\u7684json\u5904\u7406\u5668\uFF09</li><li>PyYAML \uFF08\u4E00\u4E9B\u6D4B\u8BD5\u76F8\u5173\uFF09</li><li>OpenSSL \u548C CFSSL</li><li>rsync \uFF08\u6587\u4EF6\u4F20\u8F93\uFF09</li></ul><h2 id="\u5B89\u88C5gnu" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5gnu" aria-hidden="true">#</a> \u5B89\u88C5GNU</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> build-essential  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5B89\u88C5docker" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5docker" aria-hidden="true">#</a> \u5B89\u88C5Docker</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> update  
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> <span class="token punctuation">\\</span>  
    ca-certificates <span class="token punctuation">\\</span>  
    <span class="token function">curl</span> <span class="token punctuation">\\</span>  
    gnupg <span class="token punctuation">\\</span>  
    lsb-release  

<span class="token function">curl</span> <span class="token parameter variable">-fsSL</span> https://download.docker.com/linux/ubuntu/gpg <span class="token operator">|</span> <span class="token function">sudo</span> gpg <span class="token parameter variable">--dearmor</span> <span class="token parameter variable">-o</span> /usr/share/keyrings/docker-archive-keyring.gpg  

<span class="token builtin class-name">echo</span> <span class="token punctuation">\\</span>  
  <span class="token string">&quot;deb [arch=<span class="token variable"><span class="token variable">$(</span>dpkg --print-architecture<span class="token variable">)</span></span> signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \\  
  <span class="token variable"><span class="token variable">$(</span>lsb_release <span class="token parameter variable">-cs</span><span class="token variable">)</span></span> stable&quot;</span> <span class="token operator">|</span> <span class="token function">sudo</span> <span class="token function">tee</span> /etc/apt/sources.list.d/docker.list <span class="token operator">&gt;</span> /dev/null  

<span class="token function">sudo</span> <span class="token function">apt-get</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> docker-ce docker-ce-cli containerd.io docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u4FEE\u6539containerd-\u6240\u7528\u7684\u955C\u50CF\u5E93\u5730\u5740" tabindex="-1"><a class="header-anchor" href="#\u4FEE\u6539containerd-\u6240\u7528\u7684\u955C\u50CF\u5E93\u5730\u5740" aria-hidden="true">#</a> \u4FEE\u6539ContainerD \u6240\u7528\u7684\u955C\u50CF\u5E93\u5730\u5740</h2><p><strong>Containerd\u5E94\u7528</strong>:</p><p>containerd\u7684\u9ED8\u8BA4\u914D\u7F6E\u6587\u4EF6\u4E3A<code>/etc/containerd/config.toml</code>\uFF0C\u53EF\u901A\u8FC7\u547D\u4EE4\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>containerd config default ##\u67E5\u770B\u9ED8\u8BA4\u914D\u7F6E
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u4FEE\u6539\u4FE1\u606F</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>containerd config default <span class="token operator">&gt;</span> ~/config.toml  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u7136\u540E\u7F16\u8F91<code>\uFF5Econfig.toml</code>\u53BB\u6DFB\u52A0\u4FE1\u606F\uFF1A</p><details class="custom-container details"><summary>\u751F\u6210\u7684\u914D\u7F6E\u6587\u4EF6\uFF1A</summary><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token punctuation">[</span>stream_processors<span class="token punctuation">]</span>

  <span class="token punctuation">[</span>stream_processors<span class="token punctuation">.</span><span class="token string">&quot;io.containerd.ocicrypt.decoder.v1.tar&quot;</span><span class="token punctuation">]</span>
    accepts <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;application/vnd.oci.image.layer.v1.tar+encrypted&quot;</span><span class="token punctuation">]</span>
    args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;--decryption-keys-path&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/etc/containerd/ocicrypt/keys&quot;</span><span class="token punctuation">]</span>
    env <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;OCICRYPT_KEYPROVIDER_CONFIG=/etc/containerd/ocicrypt/ocicrypt_keyprovider.conf&quot;</span><span class="token punctuation">]</span>
    path <span class="token operator">=</span> <span class="token string">&quot;ctd-decoder&quot;</span>
    returns <span class="token operator">=</span> <span class="token string">&quot;application/vnd.oci.image.layer.v1.tar&quot;</span>

  <span class="token punctuation">[</span>stream_processors<span class="token punctuation">.</span><span class="token string">&quot;io.containerd.ocicrypt.decoder.v1.tar.gzip&quot;</span><span class="token punctuation">]</span>
    accepts <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;application/vnd.oci.image.layer.v1.tar+gzip+encrypted&quot;</span><span class="token punctuation">]</span>
    args <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;--decryption-keys-path&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;/etc/containerd/ocicrypt/keys&quot;</span><span class="token punctuation">]</span>
    env <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;OCICRYPT_KEYPROVIDER_CONFIG=/etc/containerd/ocicrypt/ocicrypt_keyprovider.conf&quot;</span><span class="token punctuation">]</span>
    path <span class="token operator">=</span> <span class="token string">&quot;ctd-decoder&quot;</span>
    returns <span class="token operator">=</span> <span class="token string">&quot;application/vnd.oci.image.layer.v1.tar+gzip&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mv</span> ~/config.toml /etc/containerd/config.toml
<span class="token function">sudo</span> systemctl restart containerd  
<span class="token function">sudo</span> systemctl restart containerd.service <span class="token comment">#\u91CD\u542F\u670D\u52A1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u9700\u8981\uFF1F</p><p>\u9ED8\u8BA4 contarnerd \u914D\u7F6E\u6587\u4EF6\u6CA1\u6709\u751F\u6210\u7684\uFF0C\u6240\u4EE5 contarnerd \u9ED8\u8BA4\u628A\u914D\u7F6E\u6587\u4EF6\u5BFC\u5165\u5230\u914D\u7F6E\u6587\u4EF6\u4E2D\u53BB\u3002</p></div><h2 id="\u5B89\u88C5rsync" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5rsync" aria-hidden="true">#</a> \u5B89\u88C5rsync:</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/Downloads  
<span class="token function">wget</span> https://ghproxy.com/https://github.com/WayneD/rsync/archive/refs/tags/v3.2.4.tar.gz  
<span class="token function">tar</span> <span class="token parameter variable">-xf</span> v3.2.4.tar.gz  
<span class="token builtin class-name">cd</span> rsync-3.2.4  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>\u5B89\u88C5\u4E00\u4E9B\u5DE5\u5177\u5305</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> gcc g++ <span class="token function">gawk</span> autoconf automake python3-cmarkgfm  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> acl libacl1-dev  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> attr libattr1-dev  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> libxxhash-dev  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> libzstd-dev  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> liblz4-dev  
<span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> libssl-dev  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>\u5982\u679C\u5B89\u88C5\u5931\u8D25\u91CD\u8BD5\u5C31\u597D</p></blockquote><p><strong>\u7F16\u8BD1\uFF0C\u5B89\u88C5\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>./configure  
<span class="token function">make</span>  
<span class="token function">sudo</span> <span class="token function">cp</span> ./rsync /usr/local/bin/  
<span class="token function">sudo</span> <span class="token function">cp</span> ./rsync-ssl /usr/local/bin/  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B89\u88C5jq" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5jq" aria-hidden="true">#</a> \u5B89\u88C5jq\uFF1A</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sudo apt-get install jq  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="\u5B89\u88C5pyyaml" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5pyyaml" aria-hidden="true">#</a> \u5B89\u88C5PyYaml:</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt</span> <span class="token function">install</span> <span class="token parameter variable">-y</span> python3-pip
pip <span class="token function">install</span> pyyaml
<span class="token comment"># \u53EF\u9009 apt install ipython3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B89\u88C5etcd" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5etcd" aria-hidden="true">#</a> \u5B89\u88C5etcd\uFF1A</h2><blockquote><p><strong>etcd</strong> \u7684\u5B89\u88C5\u6BD4\u8F83\u91CD\u8981\uFF0C\u6B65\u9AA4\u4E5F\u662F\u6BD4\u8F83\u591A\u4E00\u70B9\u7684~</p></blockquote><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token assign-left variable">ETCD_VER</span><span class="token operator">=</span>v3.5.4  
<span class="token function">curl</span> <span class="token parameter variable">-L</span> https://storage.googleapis.com/etcd/<span class="token variable">\${ETCD_VER}</span>/etcd-<span class="token variable">\${ETCD_VER}</span>-linux-amd64.tar.gz <span class="token parameter variable">-o</span> /tmp/etcd-<span class="token variable">\${ETCD_VER}</span>-linux-amd64.tar.gz  
<span class="token function">mkdir</span> ~/etcd  
<span class="token function">tar</span> xzvf /tmp/etcd-<span class="token variable">\${ETCD_VER}</span>-linux-amd64.tar.gz <span class="token parameter variable">-C</span> ~/etcd --strip-components<span class="token operator">=</span><span class="token number">1</span>  
<span class="token function">rm</span> <span class="token parameter variable">-f</span> /tmp/etcd-<span class="token variable">\${ETCD_VER}</span>-linux-amd64.tar.gz  

<span class="token function">sudo</span> <span class="token function">vim</span> ~/.bashrc  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6700\u540E\u52A0\u5165\uFF1A<code>export PATH=&quot;/home/&lt;\u7528\u6237\u540D&gt;/etcd:\${PATH}&quot;</code></p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>source ~/.bashrc  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>\u5EFA\u8BAE\u52A0\u5165\u81EA\u5B9A\u4E49\u73AF\u5883\u76EE\u5F55\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>source /etc/profile.d/mypath.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u6D4B\u8BD5\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>root@cubmaster01:~/etcd<span class="token comment"># etcd --version</span>
etcd Version: <span class="token number">3.5</span>.4
Git SHA: 08407ff76
Go Version: go1.16.15
Go OS/Arch: linux/amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote><h2 id="\u5B89\u88C5golang-1-24\u53CA\u4EE5\u4E0A\u9700\u8981golang-1-18" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5golang-1-24\u53CA\u4EE5\u4E0A\u9700\u8981golang-1-18" aria-hidden="true">#</a> \u5B89\u88C5golang (1.24\u53CA\u4EE5\u4E0A\u9700\u8981golang 1.18)\uFF1A</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> ~/Downloads  
<span class="token function">wget</span> https://golang.google.cn/dl/go1.19.3.linux-amd64.tar.gz  
<span class="token function">sudo</span> <span class="token function">rm</span> <span class="token parameter variable">-rf</span> /usr/local/go <span class="token operator">&amp;&amp;</span> <span class="token function">sudo</span> <span class="token function">tar</span> <span class="token parameter variable">-C</span> /usr/local <span class="token parameter variable">-xzf</span> go1.19.3.linux-amd64.tar.gz  

<span class="token function">mkdir</span> ~/go   <span class="token comment"># \u6839\u76EE\u5F55</span>
<span class="token function">mkdir</span> ~/go/src  <span class="token comment"># \u6E90\u6587\u4EF6\u5B58\u653E</span>
<span class="token function">mkdir</span> ~/go/bin  <span class="token comment"># \u6211\u4EEC\u7528go get / go install \u5B89\u88C5\u7684\u53EF\u6267\u884C\u6587\u4EF6</span>
<span class="token function">sudo</span> <span class="token function">vim</span> /etc/profile.d/mypath.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6700\u540E\u52A0\u5165\u5982\u4E0B\u51E0\u884C\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">GOPATH</span><span class="token operator">=</span><span class="token string">&quot;/home/&lt;\u7528\u6237\u540D&gt;/go&quot;</span>  
<span class="token builtin class-name">export</span> <span class="token assign-left variable">GOBIN</span><span class="token operator">=</span><span class="token string">&quot;/home/&lt;\u7528\u6237\u540D&gt;/go/bin&quot;</span>  
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token string">&quot;/usr/local/go/bin:<span class="token variable">$GOPATH</span>/bin:<span class="token variable">\${<span class="token environment constant">PATH</span>}</span>&quot;</span>  

<span class="token builtin class-name">source</span> /etc/profile.d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container danger"><p class="custom-container-title">\u8B66\u544A</p><p>\u6709\u4E00\u4E9B\u6BD4\u8F83\u6DF1\u7684\u8BBE\u7F6E\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>sudo vim /etc/sudoers  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div><p>\u5728secure_path\u4E00\u884C\u52A0\u5165\u5982\u4E0B\u76EE\u5F55\uFF1A</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>/usr/local/go/bin \uFF08\u8FD9\u4E2A\u662F<span class="token variable">$GOPATH</span>/bin\u76EE\u5F55\uFF09
/home/<span class="token operator">&lt;</span>\u7528\u6237\u540D<span class="token operator">&gt;</span>/etcd \uFF08\u8FD9\u4E2A\u662Fetcd\u547D\u4EE4\u6240\u5728\u76EE\u5F55\uFF09
/home/<span class="token operator">&lt;</span>\u7528\u6237\u540D<span class="token operator">&gt;</span>/go/bin \uFF08\u8FD9\u4E2A\u662Fgo get\u5B89\u88C5\u7684\u7A0B\u5E8F\u6240\u5728\u4F4D\u7F6E\uFF09
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p><strong>\u{1F4A1}\u7B80\u5355\u7684\u4E00\u4E2A\u6848\u4F8B\u5982\u4E0B\uFF1A</strong></p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>Defaults	<span class="token assign-left variable">secure_path</span><span class="token operator">=</span><span class="token string">&quot;/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin:/usr/local/go/bin:/root/etcd:/root/go/bin&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><h3 id="\u8BBE\u7F6Egolang\u4EE3\u7406" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6Egolang\u4EE3\u7406" aria-hidden="true">#</a> \u8BBE\u7F6Egolang\u4EE3\u7406\uFF1A</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GO111MODULE</span><span class="token operator">=</span><span class="token string">&quot;on&quot;</span>  
go <span class="token function">env</span> <span class="token parameter variable">-w</span> <span class="token assign-left variable">GOPROXY</span><span class="token operator">=</span><span class="token string">&quot;https://goproxy.cn,direct&quot;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5B89\u88C5cfssl" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5cfssl" aria-hidden="true">#</a> \u5B89\u88C5CFSSL\uFF1A</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>go <span class="token function">install</span> github.com/cloudflare/cfssl/cmd/<span class="token punctuation">..</span>.@latest  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">\u63D0\u793A</p><p>cfssl \u7528\u4E8E kubernetes \u7684\u8BC1\u4E66\u751F\u6210\u7684\u3002</p></div><h2 id="\u4E0B\u8F7Dkubernetes\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u4E0B\u8F7Dkubernetes\u4EE3\u7801" aria-hidden="true">#</a> \u4E0B\u8F7Dkubernetes\u4EE3\u7801\uFF1A</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">mkdir</span> <span class="token variable">$GOPATH</span>/src/k8s.io  <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> <span class="token variable">$GOPATH</span>/src/k8s.io
<span class="token function">git</span> clone https://ghproxy.com/https://github.com/kubernetes/kubernetes.git  
<span class="token function">git</span> checkout <span class="token parameter variable">-b</span> kube1.24 v1.24.0  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">\u4E3A\u4EC0\u4E48\u9700\u8981\u5728 \`$GOPATH/src/k8s.io\`</p><p>kubernetes \u5386\u53F2\u60A0\u4E45\uFF0C\u6240\u4EE5\uFF0C\u6700\u597D\u662F\u9009\u62E9\u653E\u5165\u5230 <code>$GOPATH/src/k8s.io</code> \u6700\u4E0D\u5BB9\u6613\u51FA\u73B0\u9519\u8BEF\u3002</p></div><h2 id="\u8BBE\u7F6Egit" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6Egit" aria-hidden="true">#</a> \u8BBE\u7F6Egit</h2><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code> <span class="token function">git</span> remote <span class="token function">rm</span> origin <span class="token comment"># \u4E0D\u5EFA\u8BAE\u5220\u9664\uFF0C\u5982\u679C\u4F60\u4F7F\u7528\u7684\u4E0D\u662F\u6700\u65B0\u7248</span>
 <span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/cubxxw/kubernetes.git
 <span class="token function">git</span> remote <span class="token function">add</span> upstream https://github.com/kubernetes/kubernetes.git
 <span class="token function">git</span> remote set-url <span class="token parameter variable">--push</span> upstream no-pushing
 <span class="token function">git</span> remote -v<span class="token punctuation">;</span> <span class="token function">git</span> branch <span class="token parameter variable">-a</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="29.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="31.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,55),_=s("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),y={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},q=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),C=s(")"),E=s("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),T={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},O=s("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9"),A=n("h3",{id:"\u53C2\u8003",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u53C2\u8003","aria-hidden":"true"},"#"),s(" \u53C2\u8003")],-1),D={href:"https://analyticsindiamag.com/7-free-learning-resources-for-kubernetes/",target:"_blank",rel:"noopener noreferrer"},P=s("https://analyticsindiamag.com/7-free-learning-resources-for-kubernetes/");function G(w,z){const e=t("ExternalLinkIcon"),i=t("RouterLink");return o(),c("div",null,[n("ul",null,[n("li",null,[n("a",u,[v,a(e)])])]),b,m,k,n("blockquote",null,[n("p",null,[g,n("a",h,[f,a(e)])])]),x,n("ul",null,[n("li",null,[n("p",null,[a(i,{to:"/"},{default:r(()=>[_]),_:1})])]),n("li",null,[n("p",null,[n("a",y,[q,a(e)]),C])]),n("li",null,[n("p",null,[E,n("a",T,[O,a(e)])])])]),A,n("ul",null,[n("li",null,[n("a",D,[P,a(e)])])])])}const $=l(d,[["render",G],["__file","30.html.vue"]]);export{$ as default};