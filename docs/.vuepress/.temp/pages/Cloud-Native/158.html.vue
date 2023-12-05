<template><div><h1 id="frp-学习以及实践" tabindex="-1"><a class="header-anchor" href="#frp-学习以及实践" aria-hidden="true">#</a> frp 学习以及实践</h1>
<p>公司内部有一台 GPU ，需要供外网访问，想到了一个非常流行的开源项目 frp ，今天来学习一下 frp 。</p>
<p>要实现公司内部GPU服务器供外网访问，FRP（Fast Reverse Proxy）是一个很好的解决方案。FRP 是一个高性能的反向代理应用，可以帮助你轻松地将内网服务暴露到公网。</p>
<p><strong>这一期是一个简单的使用教程，下一期将会学习 frp 项目，学习源码架构设计</strong></p>
<h2 id="学习-frp" tabindex="-1"><a class="header-anchor" href="#学习-frp" aria-hidden="true">#</a> 学习 FRP</h2>
<ol>
<li><strong>理解FRP的基本概念</strong>：了解FRP的工作原理，包括客户端（frpc）和服务端（frps）之间的交互方式。</li>
<li><strong>阅读官方文档</strong>：FRP的<a href="https://github.com/fatedier/frp" target="_blank" rel="noopener noreferrer">GitHub页面<ExternalLinkIcon/></a>提供了详细的安装指南和配置说明，这是学习FRP的最佳起点。</li>
<li><strong>掌握基本配置</strong>：学习如何配置FRP的服务端和客户端，理解不同配置项的含义和用途。</li>
<li><strong>了解安全设置</strong>：熟悉如何通过加密和认证提高FRP的安全性。</li>
<li><strong>探索高级功能</strong>：了解FRP的负载均衡、HTTP/HTTPS支持等高级功能。</li>
</ol>
<h2 id="实践-frp" tabindex="-1"><a class="header-anchor" href="#实践-frp" aria-hidden="true">#</a> 实践 FRP</h2>
<ol>
<li>
<p><strong>搭建FRP服务端</strong>：</p>
<ul>
<li>在一台具有公网IP的服务器上部署FRP服务端（frps）。</li>
<li>配置 <code v-pre>frps.ini</code>文件，设置监听端口、认证方式等。</li>
</ul>
<blockquote>
<p>需要注意的是，新版本的已经没有用 <code v-pre>ini</code> 文件了，而使用的</p>
</blockquote>
</li>
<li>
<p><strong>配置FRP客户端</strong>：</p>
<ul>
<li>在内网的GPU服务器上部署FRP客户端（frpc）。</li>
<li>根据需要访问的服务（例如SSH、HTTP），在frpc.ini中配置相应的代理。</li>
</ul>
</li>
<li>
<p><strong>启动和测试</strong>：</p>
<ul>
<li>启动FRP服务端和客户端。</li>
<li>从外网测试是否能成功访问内网的GPU服务器。</li>
</ul>
</li>
<li>
<p><strong>监控和维护</strong>：</p>
<ul>
<li>监控FRP服务的运行状态，确保稳定性。</li>
<li>定期更新FRP以获得新功能和安全修复。</li>
</ul>
</li>
<li>
<p><strong>安全加固</strong>：</p>
<ul>
<li>使用加密和认证来保护FRP通道。</li>
<li>考虑设置防火墙规则，限制访问FRP服务的IP范围。</li>
</ul>
</li>
<li>
<p><strong>解决可能的问题</strong>：</p>
<ul>
<li>如果遇到连接问题，检查防火墙设置和网络配置。</li>
<li>查看FRP的日志文件以获取错误信息，帮助定位问题。</li>
</ul>
</li>
</ol>
<h2 id="安装与配置-frp-fast-reverse-proxy" tabindex="-1"><a class="header-anchor" href="#安装与配置-frp-fast-reverse-proxy" aria-hidden="true">#</a> 安装与配置 FRP（Fast Reverse Proxy）</h2>
<p>FRP 是一个高性能的反向代理应用，用于实现内网穿透。此文档指导您如何安装、配置，并理解 FRP 的基本工作原理。</p>
<p>我用的是最新版的，并且希望后期能阅读源码并且调试</p>
<p>准备两台机器，在公司配置一台肉机(又称堡垒机或跳板机)，为这一台服务器(或PC)买一个公网IP(或使用公司线有公网IP)，若想最大程度提高公网IP的使用率，在肉鸡前也可以设置一台代理服务器，使用请求转发的形式，将形如ssh等远程访问的请求转发到肉鸡上。此时我们可以先访问肉鸡(ssh或其他)，登录到肉鸡后再访问公司内部的PC。</p>
<p>补充：内网穿透指的是通过互联网访问局域网的一种技术手段</p>
<blockquote>
<p>在进行 FRP 部署前，您需要准备两台机器：一台位于公司内部网络的机器（称为“跳板机”或“肉机”），另一台具有公网 IP 地址的服务器。若需提高公网 IP 使用效率，可在跳板机前设置代理服务器进行请求转发。通过这种配置，您可先访问跳板机，然后从跳板机访问公司内部网络的其他计算机。</p>
</blockquote>
<p><strong>frp的作用和原理：</strong></p>
<p>除了常规内网穿透方式以外，使用frp技术进行内网穿透也是非常好用的，frp而且最大的优势在于可以蹭公网IP。</p>
<p>frp是如何实现的：首先frp分客户端和服务端，通过分别在客户端和服务端安装配置frp，达到内网穿透的效果。一般被访问的PC上安装客户端程序，在拥有公网ip（或与互联网连通）的PC上安装服务器程序。拓扑图如下：</p>
<p><img src="http://sm.nsddd.top/sm202311251045726.png" alt="image-20231125104523412"></p>
<p>FRP 通过客户端和服务端的配合实现内网穿透，允许用户借助公网 IP 访问内部网络资源。</p>
<h3 id="frp-部署步骤" tabindex="-1"><a class="header-anchor" href="#frp-部署步骤" aria-hidden="true">#</a> FRP 部署步骤</h3>
<ol>
<li>
<p><strong>获取 FRP：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> clone https://github.com/fatedier/frp<span class="token punctuation">;</span> <span class="token builtin class-name">cd</span> frp
$ <span class="token function">make</span> build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此步骤在服务器和客户端都需要执行。</p>
</li>
<li>
<p><strong>在服务器上运行 FRP 服务端：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ./bin/frps <span class="token parameter variable">-c</span> ./conf/frps.toml 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>-c</code> 参数用于指定配置文件路径。</li>
</ul>
</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ./bin/frps <span class="token parameter variable">-c</span> ./conf/frps.toml 
<span class="token number">2023</span>/11/25 <span class="token number">10</span>:42:55 <span class="token punctuation">[</span>I<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:104<span class="token punctuation">]</span> frps uses config file: ./conf/frps.toml
<span class="token number">2023</span>/11/25 <span class="token number">10</span>:42:55 <span class="token punctuation">[</span>I<span class="token punctuation">]</span> <span class="token punctuation">[</span>service.go:206<span class="token punctuation">]</span> frps tcp listen on <span class="token number">0.0</span>.0.0:7000
<span class="token number">2023</span>/11/25 <span class="token number">10</span>:42:55 <span class="token punctuation">[</span>I<span class="token punctuation">]</span> <span class="token punctuation">[</span>root.go:113<span class="token punctuation">]</span> frps started successfully
<span class="token number">2023</span>/11/25 <span class="token number">10</span>:43:13 <span class="token punctuation">[</span>I<span class="token punctuation">]</span> <span class="token punctuation">[</span>service.go:558<span class="token punctuation">]</span> <span class="token punctuation">[</span>7ac9081dcfd23eeb<span class="token punctuation">]</span> client login info: <span class="token function">ip</span> <span class="token punctuation">[</span><span class="token number">14.155</span>.89.68:56775<span class="token punctuation">]</span> version <span class="token punctuation">[</span><span class="token number">0.52</span>.3<span class="token punctuation">]</span> <span class="token function">hostname</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> os <span class="token punctuation">[</span>linux<span class="token punctuation">]</span> arch <span class="token punctuation">[</span>amd64<span class="token punctuation">]</span>
<span class="token number">2023</span>/11/25 <span class="token number">10</span>:43:13 <span class="token punctuation">[</span>I<span class="token punctuation">]</span> <span class="token punctuation">[</span>tcp.go:82<span class="token punctuation">]</span> <span class="token punctuation">[</span>7ac9081dcfd23eeb<span class="token punctuation">]</span> <span class="token punctuation">[</span>test-tcp<span class="token punctuation">]</span> tcp proxy listen port <span class="token punctuation">[</span><span class="token number">6000</span><span class="token punctuation">]</span>
<span class="token number">2023</span>/11/25 <span class="token number">10</span>:43:13 <span class="token punctuation">[</span>I<span class="token punctuation">]</span> <span class="token punctuation">[</span>control.go:394<span class="token punctuation">]</span> <span class="token punctuation">[</span>7ac9081dcfd23eeb<span class="token punctuation">]</span> new proxy <span class="token punctuation">[</span>test-tcp<span class="token punctuation">]</span> <span class="token builtin class-name">type</span> <span class="token punctuation">[</span>tcp<span class="token punctuation">]</span> success
<span class="token number">2023</span>/11/25 <span class="token number">10</span>:43:17 <span class="token punctuation">[</span>I<span class="token punctuation">]</span> <span class="token punctuation">[</span>proxy.go:204<span class="token punctuation">]</span> <span class="token punctuation">[</span>7ac9081dcfd23eeb<span class="token punctuation">]</span> <span class="token punctuation">[</span>test-tcp<span class="token punctuation">]</span> get a user connection <span class="token punctuation">[</span><span class="token number">14.155</span>.89.68:56779<span class="token punctuation">]</span>
<span class="token number">2023</span>/11/25 <span class="token number">10</span>:43:19 <span class="token punctuation">[</span>I<span class="token punctuation">]</span> <span class="token punctuation">[</span>proxy.go:204<span class="token punctuation">]</span> <span class="token punctuation">[</span>7ac9081dcfd23eeb<span class="token punctuation">]</span> <span class="token punctuation">[</span>test-tcp<span class="token punctuation">]</span> get a user connection <span class="token punctuation">[</span><span class="token number">221.12</span>.131.95:29892<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>
<p><code v-pre>$ ./bin/frps -c ./conf/frps.toml</code></p>
<ul>
<li>这是启动 <code v-pre>frps</code> 的命令，其中 <code v-pre>-c</code> 参数指定配置文件 <code v-pre>./conf/frps.toml</code>。</li>
</ul>
</li>
<li>
<p><code v-pre>2023/11/25 10:42:55 [I] [root.go:104] frps uses config file: ./conf/frps.toml</code></p>
<ul>
<li>日志记录了 <code v-pre>frps</code> 正在使用指定的配置文件。</li>
</ul>
</li>
<li>
<p><code v-pre>2023/11/25 10:42:55 [I] [service.go:206] frps tcp listen on 0.0.0.0:7000</code></p>
<ul>
<li>服务器开始在 TCP 端口 7000 上监听，<code v-pre>0.0.0.0</code> 表示监听所有网络接口。</li>
</ul>
</li>
<li>
<p><code v-pre>2023/11/25 10:42:55 [I] [root.go:113] frps started successfully</code></p>
<ul>
<li>表明 <code v-pre>frps</code> 服务器已成功启动。</li>
</ul>
</li>
<li>
<p><code v-pre>2023/11/25 10:43:13 [I] [service.go:558] [7ac9081dcfd23eeb] client login info: ip [14.155.89.68:56775] version [0.52.3] hostname [] os [linux] arch [amd64]</code></p>
<ul>
<li>一名客户端已连接到服务器。客户端的 IP 地址是 <code v-pre>14.155.89.68</code>，端口号是 <code v-pre>56775</code>。客户端使用的 <code v-pre>frp</code> 版本是 <code v-pre>0.52.3</code>，操作系统是 Linux，处理器架构是 amd64。</li>
</ul>
</li>
<li>
<p><code v-pre>2023/11/25 10:43:13 [I] [tcp.go:82] [7ac9081dcfd23eeb] [test-tcp] tcp proxy listen port [6000]</code></p>
<ul>
<li>服务器为名为 <code v-pre>test-tcp</code> 的 TCP 代理创建了监听端口 <code v-pre>6000</code>。</li>
</ul>
</li>
<li>
<p><code v-pre>2023/11/25 10:43:13 [I] [control.go:394] [7ac9081dcfd23eeb] new proxy [test-tcp] type [tcp] success</code></p>
<ul>
<li>成功创建了新的 TCP 代理 <code v-pre>test-tcp</code>。</li>
</ul>
</li>
<li>
<p><code v-pre>2023/11/25 10:43:17 [I] [proxy.go:204] [7ac9081dcfd23eeb] [test-tcp] get a user connection [14.155.89.68:56779]</code></p>
<ul>
<li><code v-pre>test-tcp</code> 代理收到了来自 IP 地址 <code v-pre>14.155.89.68</code>，端口 <code v-pre>56779</code> 的用户连接。</li>
</ul>
</li>
<li>
<p><code v-pre>2023/11/25 10:43:19 [I] [proxy.go:204] [7ac9081dcfd23eeb] [test-tcp] get a user connection [221.12.131.95:29892]</code></p>
<ul>
<li>另一个用户连接到 <code v-pre>test-tcp</code> 代理，IP 地址是 <code v-pre>221.12.131.95</code>，端口号是 <code v-pre>29892</code></li>
</ul>
</li>
<li>
<p><strong>服务端日志解读：</strong></p>
<ul>
<li><code v-pre>frps tcp listen on 0.0.0.0:7000</code> 表示服务端开始在 TCP 端口 7000 上监听。</li>
<li>客户端连接信息、代理创建成功等日志项表明 FRP 服务端正常运行。</li>
</ul>
</li>
<li>
<p><strong>在客户端运行 FRP 客户端：</strong></p>
<ul>
<li>客户端配置同样需要指定配置文件。</li>
<li>客户端成功连接后，您可以通过设置的端口和地址访问内网资源。</li>
</ul>
</li>
</ol>
<p>下面是在客户端（对应的是 OpenIM Server 的对应的 GPU 服务）</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ./bin/frps <span class="token parameter variable">-c</span> ./conf/frps.toml 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="system-部署" tabindex="-1"><a class="header-anchor" href="#system-部署" aria-hidden="true">#</a> System 部署</h2>
<p>通过 Systemd 服务管理，可以实现 FRP 服务的自动启动和重启，从而解决了使用 <code v-pre>nohup</code> 在后台运行时电脑重启导致服务中断的问题。</p>
<h3 id="服务端-server-部署" tabindex="-1"><a class="header-anchor" href="#服务端-server-部署" aria-hidden="true">#</a> 服务端 Server 部署</h3>
<ol>
<li>
<p><strong>重命名并移动 FRP 文件：</strong> 将 FRP 服务端程序和配置文件重命名并移动到系统目录，以便于管理。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">cp</span> ./bin/frps /usr/bin/frpservice
$ <span class="token function">sudo</span> <span class="token function">cp</span> ./conf/frps.toml /etc/frpservice.toml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>创建 Systemd 服务文件：</strong> 使用文本编辑器创建一个新的服务文件 <code v-pre>frpservice.service</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">vim</span> /lib/systemd/system/frpservice.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>服务文件内容：</strong> 在服务文件中添加以下内容：</p>
<div class="language-toml ext-toml line-numbers-mode"><pre v-pre class="language-toml"><code><span class="token punctuation">[</span><span class="token table class-name">Unit</span><span class="token punctuation">]</span>
<span class="token key property">Description</span><span class="token punctuation">=</span>frpservice
<span class="token key property">After</span><span class="token punctuation">=</span>network<span class="token punctuation">.</span>target

<span class="token punctuation">[</span><span class="token table class-name">Service</span><span class="token punctuation">]</span>
<span class="token key property">Type</span><span class="token punctuation">=</span>simple
<span class="token key property">User</span><span class="token punctuation">=</span>nobody
<span class="token key property">Restart</span><span class="token punctuation">=</span>on-failure
<span class="token key property">RestartSec</span><span class="token punctuation">=</span>5s
<span class="token key property">ExecStart</span><span class="token punctuation">=</span>/usr/bin/frpservice -c /etc/frpservice<span class="token punctuation">.</span>toml
<span class="token key property">ExecReload</span><span class="token punctuation">=</span>/usr/bin/frpservice reload -c /etc/frpservice<span class="token punctuation">.</span>toml

<span class="token punctuation">[</span><span class="token table class-name">Install</span><span class="token punctuation">]</span>
<span class="token key property">WantedBy</span><span class="token punctuation">=</span>multi-user<span class="token punctuation">.</span>target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>启用并启动服务：</strong> 使服务文件具有执行权限，启用并启动 FRP 服务。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">777</span> /lib/systemd/system/frpservice.service
$ systemctl <span class="token builtin class-name">enable</span> frpservice.service
$ systemctl start frpservice.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="frp-的-web-访问" tabindex="-1"><a class="header-anchor" href="#frp-的-web-访问" aria-hidden="true">#</a> FRP 的 Web 访问</h3>
<p>FRP 支持通过 Web 访问内网资源，可以使用格式 <code v-pre>http://域名或IP:remote_port</code> 访问。</p>
<h3 id="客户端配置" tabindex="-1"><a class="header-anchor" href="#客户端配置" aria-hidden="true">#</a> 客户端配置</h3>
<ol>
<li>
<p>在客户端配置 FRP：</p>
<p>配置文件中需指定本地 Web 服务的端口（如 80）和远程访问端口（如 8080）。</p>
<div class="language-toml ext-toml line-numbers-mode"><pre v-pre class="language-toml"><code><span class="token punctuation">[</span><span class="token table class-name">web</span><span class="token punctuation">]</span>
<span class="token key property">type</span> <span class="token punctuation">=</span> tcp
<span class="token key property">local_ip</span> <span class="token punctuation">=</span> <span class="token number">127.0</span><span class="token punctuation">.</span><span class="token number">0.1</span>
<span class="token key property">local_port</span> <span class="token punctuation">=</span> <span class="token number">80</span>
<span class="token key property">remote_port</span> <span class="token punctuation">=</span> <span class="token number">8080</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h3 id="客户端-systemd-部署" tabindex="-1"><a class="header-anchor" href="#客户端-systemd-部署" aria-hidden="true">#</a> 客户端 Systemd 部署</h3>
<p>为客户端的 FRP 也创建一个 Systemd 服务，以便实现自动启动和重启。</p>
<ol>
<li>
<p><strong>重命名并移动 FRP 客户端文件：</strong> 将客户端程序和配置文件移动到系统目录。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">cp</span> ./bin/frpc /usr/bin/frpcservice
$ <span class="token function">sudo</span> <span class="token function">cp</span> ./conf/frpc.ini /etc/frpcservice.ini
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>创建 Systemd 服务文件：</strong> 编辑客户端的服务文件 <code v-pre>frpcservice.service</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">vim</span> /lib/systemd/system/frpcservice.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>服务文件内容：</strong> 类似服务端，添加以下内容：</p>
<div class="language-toml ext-toml line-numbers-mode"><pre v-pre class="language-toml"><code><span class="token punctuation">[</span><span class="token table class-name">Unit</span><span class="token punctuation">]</span>
<span class="token key property">Description</span><span class="token punctuation">=</span>frpcservice
<span class="token key property">After</span><span class="token punctuation">=</span>network<span class="token punctuation">.</span>target

<span class="token punctuation">[</span><span class="token table class-name">Service</span><span class="token punctuation">]</span>
<span class="token key property">Type</span><span class="token punctuation">=</span>simple
<span class="token key property">User</span><span class="token punctuation">=</span>nobody
<span class="token key property">Restart</span><span class="token punctuation">=</span>on-failure
<span class="token key property">RestartSec</span><span class="token punctuation">=</span>5s
<span class="token key property">ExecStart</span><span class="token punctuation">=</span>/usr/bin/frpcservice -c /etc/frpcservice<span class="token punctuation">.</span>ini

<span class="token punctuation">[</span><span class="token table class-name">Install</span><span class="token punctuation">]</span>
<span class="token key property">WantedBy</span><span class="token punctuation">=</span>multi-user<span class="token punctuation">.</span>target
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>启用并启动服务：</strong> 同服务端操作，赋予执行权限，启用并启动服务。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">777</span> /lib/systemd/system/frpcservice.service
$ systemctl <span class="token builtin class-name">enable</span> frpcservice.service
$ systemctl start frpcservice.service
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h2 id="查看日志" tabindex="-1"><a class="header-anchor" href="#查看日志" aria-hidden="true">#</a> 查看日志</h2>
<h3 id="直接查看控制台输出" tabindex="-1"><a class="header-anchor" href="#直接查看控制台输出" aria-hidden="true">#</a> 直接查看控制台输出</h3>
<p>如果您直接在控制台运行 FRP，日志将直接输出到控制台。这适用于在测试或调试时运行 FRP。</p>
<h3 id="使用日志文件" tabindex="-1"><a class="header-anchor" href="#使用日志文件" aria-hidden="true">#</a> 使用日志文件</h3>
<p>FRP 支持将日志输出到文件。您可以在 FRP 的配置文件中设置日志文件的路径。例如，对于服务端（<code v-pre>frps</code>），可以在 <code v-pre>frps.ini</code> 文件中设置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>common<span class="token punctuation">]</span>
log_file <span class="token operator">=</span> /var/log/frps.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>对于客户端（<code v-pre>frpc</code>），在 <code v-pre>frpc.ini</code> 文件中设置：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>log_file = /var/log/frpc.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>设置后，您可以使用任何文本编辑器或命令行工具（如 <code v-pre>cat</code>, <code v-pre>less</code>, <code v-pre>tail</code>）查看这些日志文件。例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">tail</span> <span class="token parameter variable">-f</span> /var/log/frps.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="使用-systemd-服务的日志" tabindex="-1"><a class="header-anchor" href="#使用-systemd-服务的日志" aria-hidden="true">#</a> 使用 Systemd 服务的日志</h3>
<p>如果您通过 Systemd 服务运行 FRP，可以使用 <code v-pre>journalctl</code> 命令查看日志。例如，如果您的服务名为 <code v-pre>frpservice</code>，可以使用以下命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>journalctl -u frpservice
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为了实时跟踪日志，可以添加 <code v-pre>-f</code> 参数：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>journalctl <span class="token parameter variable">-fu</span> frpservice
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="日志级别" tabindex="-1"><a class="header-anchor" href="#日志级别" aria-hidden="true">#</a> 日志级别</h3>
<p>确保在 FRP 的配置文件中设置了适当的日志级别。日志级别决定了记录哪些类型的信息，例如 <code v-pre>info</code>, <code v-pre>warn</code>, <code v-pre>error</code> 等。</p>
<h3 id="日志切割和管理" tabindex="-1"><a class="header-anchor" href="#日志切割和管理" aria-hidden="true">#</a> 日志切割和管理</h3>
<p>对于长期运行的服务，考虑使用日志切割工具（如 <code v-pre>logrotate</code>）来管理日志文件的大小和数量，避免日志文件过大。</p>
</div></template>


