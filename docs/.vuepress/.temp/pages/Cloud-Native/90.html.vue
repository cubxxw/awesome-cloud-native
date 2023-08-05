<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第90节-ssh-到-github-actions" tabindex="-1"><a class="header-anchor" href="#第90节-ssh-到-github-actions" aria-hidden="true">#</a> 第90节 ssh 到 GitHub actions</h1>
<div><a href = '89.md' style='float:left'>⬆️上一节🔗  </a><a href = '91.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="环境说明" tabindex="-1"><a class="header-anchor" href="#环境说明" aria-hidden="true">#</a> 环境说明</h2>
<h3 id="情况一" tabindex="-1"><a class="header-anchor" href="#情况一" aria-hidden="true">#</a> 情况一</h3>
<p>我们有一台A服务器，以及B服务器，总共两台</p>
<p>我们登陆到A服务器，然后在A服务器进行登陆B服务器</p>
<p>如果使用账号密码登陆，那么每次就需要输入密码</p>
<p>我们进行ssh密钥认证的方式就可以免密码登陆了</p>
<h3 id="情况二" tabindex="-1"><a class="header-anchor" href="#情况二" aria-hidden="true">#</a> 情况二</h3>
<p>我们有 actions 做自动化测试，我希望 actions 可以帮助我们自动化部署到 服务器，需要 ssh 的免密登陆</p>
<h2 id="linux-免密登陆" tabindex="-1"><a class="header-anchor" href="#linux-免密登陆" aria-hidden="true">#</a> Linux 免密登陆</h2>
<h3 id="b-服务器步骤" tabindex="-1"><a class="header-anchor" href="#b-服务器步骤" aria-hidden="true">#</a> B 服务器步骤</h3>
<p>在您的 Linux 服务器上创建一个 authorized_keys 文件，以便您可以将您的 SSH 公钥添加到该文件中，以便您可以通过 SSH 密钥认证来访问该服务器。</p>
<p>要创建 authorized_keys 文件，可以按照以下步骤操作：</p>
<p>1.打开终端，登录到您的 Linux 服务器。</p>
<p>2.进入您的 home 目录，如果该目录不存在，则可以使用以下命令进行创建：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mkdir -p ~/.ssh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3.使用以下命令创建 authorized_keys 文件：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>touch ~/.ssh/authorized_keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4.使用文本编辑器（例如 vi 或 nano）打开 authorized_keys 文件，将您的 SSH 公钥（B 的步骤得到的 公钥） 复制到该文件中并保存。</p>
<p>5.为了确保该文件的权限正确，请使用以下命令设置 authorized_keys 文件的权限为 600：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>chmod 600 ~/.ssh/authorized_keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>完成上述步骤后，您的 SSH 公钥就已经被添加到了您的 Linux 服务器上，您可以使用 SSH 密钥认证方式访问该服务器了。</p>
<h3 id="在a服务器执行一下步骤" tabindex="-1"><a class="header-anchor" href="#在a服务器执行一下步骤" aria-hidden="true">#</a> 在A服务器执行一下步骤</h3>
<p>1.生成密钥对：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ ssh-keygen -t rsa -b 2048
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或者使用以下命令</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ssh-keygen -t rsa -b 4096 -C "3293172751nss@gmail.com"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检查：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ssh root@43.154.157.177
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>执行完后，会在~/.ssh/目录下生成id_rsa和id_rsa.pub两个文件，其中id_rsa是私钥，需要妥善保管，id_rsa.pub是公钥，需要放到远程服务器上进行认证。</p>
<p>2.将公钥添加到远程服务器：</p>
<p>将公钥id_rsa.pub的内容复制到远程服务器的~/.ssh/authorized_keys文件中，可以使用以下命令实现：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ ssh-copy-id user@remote-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个命令会将本地公钥添加到远程服务器上的authorized_keys文件中，如果该文件不存在，则会自动创建。在执行该命令前，请确保远程服务器上的~/.ssh/目录的权限是700，authorized_keys文件的权限是600。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '89.md' style='float:left'>⬆️上一节🔗  </a><a href = '91.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


