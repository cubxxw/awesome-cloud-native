<template><div><h1 id="在-ubuntu-上安装-docker-引擎" tabindex="-1"><a class="header-anchor" href="#在-ubuntu-上安装-docker-引擎" aria-hidden="true">#</a> 在 Ubuntu 上安装 Docker 引擎</h1>
<blockquote>
<p><strong>适用于 Linux 的 Docker 桌面</strong></p>
<p>Docker Desktop 可帮助您在 Mac 和 Windows 上轻松构建、共享和运行容器，就像在 Linux 上一样。我们很高兴地分享 Docker Desktop for Linux（Beta）现在可供您测试。有关更多信息，请参阅 <a href="https://docs.docker.com/desktop/linux/" target="_blank" rel="noopener noreferrer">适用于 Linux 的 Docker 桌面<ExternalLinkIcon/></a>。</p>
</blockquote>
<p>要在 Ubuntu 上开始使用 Docker Engine，请确保 <a href="https://docs.docker.com/engine/install/ubuntu/#prerequisites" target="_blank" rel="noopener noreferrer">满足先决条件<ExternalLinkIcon/></a>，然后 <a href="https://docs.docker.com/engine/install/ubuntu/#installation-methods" target="_blank" rel="noopener noreferrer">安装 Docker<ExternalLinkIcon/></a>。</p>
<h2 id="先决条件" tabindex="-1"><a class="header-anchor" href="#先决条件" aria-hidden="true">#</a> 先决条件</h2>
<h3 id="操作系统要求" tabindex="-1"><a class="header-anchor" href="#操作系统要求" aria-hidden="true">#</a> 操作系统要求</h3>
<p>要安装 Docker Engine，您需要以下 Ubuntu 版本之一的 64 位版本：</p>
<ul>
<li>Ubuntu Jammy 22.04 (LTS)</li>
<li>Ubuntu 小鬼 21.10</li>
<li>Ubuntu 焦点 20.04 (LTS)</li>
<li>Ubuntu 仿生 18.04 (LTS)</li>
</ul>
<p><code v-pre>x86_64</code>（或<code v-pre>amd64</code>）<code v-pre>armhf</code>、<code v-pre>arm64</code>和<code v-pre>s390x</code>架构支持 Docker 引擎。</p>
<blockquote>
<p>Ubuntu 16.04 LTS “Xenial Xerus” 报废</p>
<p>Ubuntu Linux 16.04 LTS 已于 2021 年 4 月 30 日结束其五年 LTS 窗口期，不再受支持。Docker 不再发布此发行版的软件包（包括补丁和安全版本）。建议在 Ubuntu 16.04 上运行 Docker 的用户将其系统更新到当前支持的 LTS 版本的 Ubuntu。</p>
</blockquote>
<h3 id="卸载旧版本" tabindex="-1"><a class="header-anchor" href="#卸载旧版本" aria-hidden="true">#</a> 卸载旧版本</h3>
<p>旧版本的 Docker 被称为<code v-pre>docker</code>,<code v-pre>docker.io</code>或<code v-pre>docker-engine</code>. 如果安装了这些，请卸载它们：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ sudo apt-get remove docker docker-engine docker.io containerd runc
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>apt-get</code>如果报告没有安装这些软件包，那也没关系。</p>
<p>的内容<code v-pre>/var/lib/docker/</code>，包括图像、容器、卷和网络，都被保留。如果您不需要保存现有数据，并且想从全新安装开始，请参阅 本页底部的<a href="https://docs.docker.com/engine/install/ubuntu/#uninstall-docker-engine" target="_blank" rel="noopener noreferrer">卸载 Docker 引擎部分。<ExternalLinkIcon/></a></p>
<h3 id="支持的存储驱动程序" tabindex="-1"><a class="header-anchor" href="#支持的存储驱动程序" aria-hidden="true">#</a> 支持的存储驱动程序</h3>
<p>Ubuntu 上的 Docker 引擎支持<code v-pre>overlay2</code>,<code v-pre>aufs</code>和<code v-pre>btrfs</code>存储驱动程序。</p>
<p>Docker Engine<code v-pre>overlay2</code>默认使用存储驱动程序。如果需要 <code v-pre>aufs</code>改用，需要手动配置。请参阅<a href="https://docs.docker.com/storage/storagedriver/aufs-driver/" target="_blank" rel="noopener noreferrer">使用 AUFS 存储驱动程序<ExternalLinkIcon/></a></p>
<h2 id="安装方法" tabindex="-1"><a class="header-anchor" href="#安装方法" aria-hidden="true">#</a> 安装方法</h2>
<p>您可以根据需要以不同的方式安装 Docker Engine：</p>
<ul>
<li>大多数用户 <a href="https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository" target="_blank" rel="noopener noreferrer">设置 Docker 的存储库<ExternalLinkIcon/></a>并从中安装，以便于安装和升级任务。这是推荐的方法。</li>
<li>一些用户下载 DEB 包并 <a href="https://docs.docker.com/engine/install/ubuntu/#install-from-a-package" target="_blank" rel="noopener noreferrer">手动安装，<ExternalLinkIcon/></a>完全手动管理升级。这在诸如在无法访问 Internet 的气隙系统上安装 Docker 等情况下很有用。</li>
<li>在测试和开发环境中，一些用户选择使用自动化 <a href="https://docs.docker.com/engine/install/ubuntu/#install-using-the-convenience-script" target="_blank" rel="noopener noreferrer">便利脚本<ExternalLinkIcon/></a>来安装 Docker。</li>
</ul>
<h3 id="使用存储库安装" tabindex="-1"><a class="header-anchor" href="#使用存储库安装" aria-hidden="true">#</a> 使用存储库安装</h3>
<p>在新主机上首次安装 Docker Engine 之前，您需要设置 Docker 存储库。之后，您可以从存储库安装和更新 Docker。</p>
<h4 id="设置存储库" tabindex="-1"><a class="header-anchor" href="#设置存储库" aria-hidden="true">#</a> 设置存储库</h4>
<ol>
<li>
<p>更新<code v-pre>apt</code>包索引并安装包以允许<code v-pre>apt</code>通过 HTTPS 使用存储库：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ sudo apt-get update

$ sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>在设置存储库的时候，注意网络如果是国外的可能会出问题</p>
</blockquote>
</li>
<li>
<p>添加 Docker 的官方 GPG 密钥：（可以跳过）</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>使用以下命令设置<strong>稳定</strong>存储库。要添加 <strong>nightly</strong>或<strong>test</strong>存储库，请在以下命令中的单词之后添加单词<code v-pre>nightly</code>或<code v-pre>test</code>（或两者） 。<a href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer">了解<ExternalLinkIcon/></a><a href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer"><strong>夜间</strong><ExternalLinkIcon/></a><a href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer">和<ExternalLinkIcon/></a><a href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer"><strong>测试</strong><ExternalLinkIcon/></a><a href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer">频道<ExternalLinkIcon/></a>。<code v-pre>stable</code></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>我们的是amd64</p>
</blockquote>
</li>
</ol>
<h4 id="安装-docker-引擎" tabindex="-1"><a class="header-anchor" href="#安装-docker-引擎" aria-hidden="true">#</a> 安装 Docker 引擎</h4>
<ol>
<li>
<p>更新<code v-pre>apt</code>包索引，安装<em>最新版本</em>的 Docker Engine、containerd 和 Docker Compose，或者进入下一步安装特定版本：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> $ sudo apt-get update
 $ sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>有多个 Docker 存储库？</p>
<p><code v-pre>apt-get install</code>如果您启用了多个 Docker 存储库，则安装或更新而不在or 命令中指定版本<code v-pre>apt-get update</code>始终会安装可能的最高版本，这可能不适合您的稳定性需求。</p>
</blockquote>
</li>
<li>
<p>要安装<em>特定版本</em>的 Docker Engine，请在 repo 中列出可用版本，然后选择并安装：（可以跳过）</p>
<p>一种。列出您的存储库中可用的版本：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ apt-cache madison docker-ce

  docker-ce | 5:18.09.1~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
  docker-ce | 5:18.09.0~3-0~ubuntu-xenial | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
  docker-ce | 18.06.1~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
  docker-ce | 18.06.0~ce~3-0~ubuntu       | https://download.docker.com/linux/ubuntu  xenial/stable amd64 Packages
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用第二列中的版本字符串安装特定版本，例如<code v-pre>5:18.09.1~3-0~ubuntu-xenial</code>.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ sudo apt-get install docker-ce=&lt;VERSION_STRING> docker-ce-cli=&lt;VERSION_STRING> containerd.io docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><code v-pre>hello-world</code> 通过运行映像来验证 Docker 引擎是否已正确安装。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ sudo docker run hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令下载测试映像并在容器中运行它。当容器运行时，它会打印一条消息并退出。</p>
</li>
</ol>
<p>Docker 引擎已安装并正在运行。该<code v-pre>docker</code>组已创建，但未向其中添加任何用户。您需要使用<code v-pre>sudo</code>来运行 Docker 命令。继续<a href="https://docs.docker.com/engine/install/linux-postinstall/" target="_blank" rel="noopener noreferrer">Linux 后安装<ExternalLinkIcon/></a>以允许非特权用户运行 Docker 命令和其他可选配置步骤。</p>
<p><strong>查看版本信息：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker info
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><img src="https://s2.loli.net/2022/05/08/IMC5rzTvKxS9Dlf.png" alt="image-20220508171810472" style="zoom: 23%;" />
<h4 id="升级-docker-引擎" tabindex="-1"><a class="header-anchor" href="#升级-docker-引擎" aria-hidden="true">#</a> 升级 Docker 引擎</h4>
<p>要升级 Docker Engine，首先运行<code v-pre>sudo apt-get update</code>，然后按照 <a href="https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository" target="_blank" rel="noopener noreferrer">安装说明<ExternalLinkIcon/></a>，选择您要安装的新版本。</p>
<h3 id="从包安装" tabindex="-1"><a class="header-anchor" href="#从包安装" aria-hidden="true">#</a> 从包安装</h3>
<p>如果您无法使用 Docker 的存储库来安装 Docker Engine，您可以下载该 <code v-pre>.deb</code>版本的文件并手动安装。每次升级 Docker 时都需要下载一个新文件。</p>
<ol>
<li>
<p>转到<a href="https://download.docker.com/linux/ubuntu/dists/" target="_blank" rel="noopener noreferrer"><code v-pre>https://download.docker.com/linux/ubuntu/dists/</code><ExternalLinkIcon/></a>，选择您的 Ubuntu 版本，然后浏览到<code v-pre>pool/stable/</code>、选择<code v-pre>amd64</code>、 <code v-pre>armhf</code>、<code v-pre>arm64</code>或<code v-pre>s390x</code>，然后下载<code v-pre>.deb</code>您要安装的 Docker 引擎版本的文件。</p>
<blockquote>
<p><strong>笔记</strong></p>
<p>要安装<strong>nightly</strong>或<strong>test</strong>（预发布）包，<code v-pre>stable</code>请将上述 URL 中的单词更改为<code v-pre>nightly</code>or <code v-pre>test</code>。 <a href="https://docs.docker.com/engine/install/" target="_blank" rel="noopener noreferrer">了解<strong>夜间</strong>和<strong>测试</strong>频道<ExternalLinkIcon/></a>。</p>
</blockquote>
</li>
<li>
<p>安装 Docker Engine，将下面的路径更改为您下载 Docker 包的路径。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ sudo dpkg -i /path/to/package.deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Docker 守护进程自动启动。</p>
</li>
<li>
<p><code v-pre>hello-world</code> 通过运行映像来验证 Docker 引擎是否已正确安装。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ sudo docker run hello-world
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此命令下载测试映像并在容器中运行它。当容器运行时，它会打印一条消息并退出。</p>
</li>
</ol>
<p>Docker 引擎已安装并正在运行。该<code v-pre>docker</code>组已创建，但未向其中添加任何用户。您需要使用<code v-pre>sudo</code>来运行 Docker 命令。继续<a href="https://docs.docker.com/engine/install/linux-postinstall/" target="_blank" rel="noopener noreferrer">执行 Linux 的安装后步骤<ExternalLinkIcon/></a>以允许非特权用户运行 Docker 命令和其他可选配置步骤。</p>
<h4 id="升级-docker-引擎-1" tabindex="-1"><a class="header-anchor" href="#升级-docker-引擎-1" aria-hidden="true">#</a> 升级 Docker 引擎</h4>
<p>要升级 Docker Engine，请下载更新的包文件并重复 <a href="https://docs.docker.com/engine/install/ubuntu/#install-from-a-package" target="_blank" rel="noopener noreferrer">安装过程<ExternalLinkIcon/></a>，指向新文件。</p>
<h3 id="使用便捷脚本安装" tabindex="-1"><a class="header-anchor" href="#使用便捷脚本安装" aria-hidden="true">#</a> 使用便捷脚本安装</h3>
<p><a href="https://get.docker.com/" target="_blank" rel="noopener noreferrer">Docker 在get.docker.com<ExternalLinkIcon/></a>上提供了一个方便的脚本， 可以快速、非交互地将 Docker 安装到开发环境中。不建议将便利脚本用于生产环境，但可以用作示例来创建适合您需求的配置脚本。另请参阅<a href="https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository" target="_blank" rel="noopener noreferrer">使用存储库<ExternalLinkIcon/></a> 安装步骤以了解使用包存储库安装的安装步骤。该脚本的源代码是开源的，可以 <a href="https://github.com/docker/docker-install" target="_blank" rel="noopener noreferrer"><code v-pre>docker-install</code>在 GitHub 上的存储库中找到<ExternalLinkIcon/></a>。</p>
<p>在本地运行脚本之前，请务必检查从 Internet 下载的脚本。在安装之前，请让自己熟悉便捷脚本的潜在风险和限制：</p>
<ul>
<li>该脚本需要<code v-pre>root</code>或<code v-pre>sudo</code>特权才能运行。</li>
<li>该脚本会尝试检测您的 Linux 发行版和版本并为您配置包管理系统，并且不允许您自定义大多数安装参数。</li>
<li>该脚本会在不要求确认的情况下安装依赖项和建议。这可能会安装大量软件包，具体取决于主机的当前配置。</li>
<li>默认情况下，该脚本会安装 Docker、containerd 和 runc 的最新稳定版本。使用此脚本配置机器时，这可能会导致 Docker 的主要版本升级意外。在部署到生产系统之前，始终在测试环境中测试（主要）升级。</li>
<li>该脚本并非旨在升级现有的 Docker 安装。使用脚本更新现有安装时，依赖项可能不会更新到预期版本，导致使用过时的版本。</li>
</ul>
<blockquote>
<p>提示：运行前预览脚本步骤</p>
<p>您可以使用<code v-pre>DRY_RUN=1</code>选项运行脚本以了解脚本在安装期间将执行的步骤：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ curl -fsSL https://get.docker.com -o get-docker.sh
$ DRY_RUN=1 sh ./get-docker.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<p>此示例从<a href="https://get.docker.com/" target="_blank" rel="noopener noreferrer">get.docker.com<ExternalLinkIcon/></a>下载脚本 并运行它以在 Linux 上安装最新的稳定版本的 Docker：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh
Executing docker install script, commit: 7cae5f8b0decc17d6571f9f52eb840fbc13b2737
&lt;...>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>安装了 Docker。该<code v-pre>docker</code>服务在基于 Debian 的发行版上自动启动。在<code v-pre>RPM</code>基于发行版（例如 CentOS、Fedora、RHEL 或 SLES）上，您需要使用适当的<code v-pre>systemctl</code>or<code v-pre>service</code>命令手动启动它。如消息所示，默认情况下，非 root 用户无法运行 Docker 命令。</p>
<blockquote>
<p><strong>以非特权用户身份使用 Docker，还是以无根模式安装？</strong></p>
<p>安装脚本需要<code v-pre>root</code>或<code v-pre>sudo</code>具有安装和使用 Docker 的权限。如果要授予非 root 用户对 Docker 的访问权限，请参阅 <a href="https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user" target="_blank" rel="noopener noreferrer">Linux 的安装后步骤<ExternalLinkIcon/></a>。Docker 也可以在没有<code v-pre>root</code>权限的情况下安装，或者配置为以无根模式运行。有关在无根模式下运行 Docker 的说明，请参阅以 <a href="https://docs.docker.com/engine/security/rootless/" target="_blank" rel="noopener noreferrer">非 root 用户身份运行 Docker 守护程序（无根模式）<ExternalLinkIcon/></a>。</p>
</blockquote>
<h4 id="安装预发行版" tabindex="-1"><a class="header-anchor" href="#安装预发行版" aria-hidden="true">#</a> 安装预发行版</h4>
<p>Docker 还在<a href="https://test.docker.com/" target="_blank" rel="noopener noreferrer">test.docker.com<ExternalLinkIcon/></a> 上提供了一个方便的脚本，用于在 Linux 上安装 Docker 的预发行版。此脚本等效于 中的脚本<code v-pre>get.docker.com</code>，但将您的包管理器配置为启用我们包存储库中的“测试”通道，其中包括 Docker 的稳定版和预发布版（测试版、发布候选版）。使用此脚本可以提前访问新版本，并在发布稳定之前在测试环境中对其进行评估。</p>
<p>要从“test”频道在 Linux 上安装最新版本的 Docker，请运行：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ curl -fsSL https://test.docker.com -o test-docker.sh
$ sudo sh test-docker.sh
&lt;...>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="使用便利脚本后升级-docker" tabindex="-1"><a class="header-anchor" href="#使用便利脚本后升级-docker" aria-hidden="true">#</a> 使用便利脚本后升级 Docker</h4>
<p>如果您使用便捷脚本安装 Docker，则应直接使用包管理器升级 Docker。重新运行便利脚本没有任何好处，如果它尝试重新添加已经添加到主机的存储库，可能会导致问题。</p>
<h2 id="卸载-docker-引擎" tabindex="-1"><a class="header-anchor" href="#卸载-docker-引擎" aria-hidden="true">#</a> 卸载 Docker 引擎</h2>
<ol>
<li>
<p>卸载 Docker Engine、CLI、Containerd 和 Docker Compose 软件包：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ sudo apt-get purge docker-ce docker-ce-cli containerd.io docker-compose-plugin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>主机上的映像、容器、卷或自定义配置文件不会自动删除。要删除所有映像、容器和卷：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>$ sudo rm -rf /var/lib/docker
$ sudo rm -rf /var/lib/containerd
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<p>您必须手动删除任何已编辑的配置文件。</p>
</div></template>


