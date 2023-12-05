<template><div><h1 id="openim-的升级方案的设计" tabindex="-1"><a class="header-anchor" href="#openim-的升级方案的设计" aria-hidden="true">#</a> OpenIM 的升级方案的设计</h1>
<p>OpenIM 升级面对的几个挑战：</p>
<ul>
<li>平常版本的小幅度变化（v3.3 -&gt; v3.4)：脚本，配置文件的变化</li>
<li>重要版本的大幅度变化（v3.4 -&gt; v3.5)：Mongo 数据库替换掉 Mysql</li>
<li>环境变量没办法保存</li>
<li>集群部署没办法无感知</li>
<li>源码脚本部署面临配置文件和脚本的问题</li>
<li>DATA_DIR 变量对应的依赖中间件的数据和配置存储路径不一致</li>
</ul>
<p><strong>RFC：</strong></p>
<p>sk 说的 docker compose 的可能借鉴改进地方</p>
<p>（1）-f 分开 组件的 其他的； 密码相关通过环境变量传递，不通过配置文件设置； 同一个变量多个组件使用，就通过环境变量；
（2）脚本 config都作为镜像一部分；
（3）config 映射出来可以进行修改；
（4）config增加版本号，程序启动时检测版本号，如果不一致则失败；
（5）使用env.example ， config.example；</p>
<blockquote>
<p>参考 livekit  rocketchat mattermost部署</p>
</blockquote>
<p><strong>linux</strong>
（1）去掉configy.yaml和.env ，通过make init生成configy.yaml .env；
（2）make init做个提示，是否覆盖已有的config.yaml、env；
（3）make init以后，建议单独修改.env或者某个配置文件；
（4）共享的变量，通过环境变量，程序优先读取环境变量；
升级
（1）git pull ; 不会冲突； export barnch 3.5；
（2）make update； 覆盖.env.sample 自己对比.env和env.smaple(包含老的.env和新的模板) configy.yaml 和 config.yaml.sample合并； 变成新的.env和configy.yaml
（3）up -d</p>
<h2 id="个人想法" tabindex="-1"><a class="header-anchor" href="#个人想法" aria-hidden="true">#</a> 个人想法</h2>
<p>docker compose 一般是做测试，或者 allinone 体验的，比较希望它功能定位比较简单。</p>
<ol>
<li>升级 docker compose ，提供默认的参数选项
<ol>
<li>注意现有的 .env 自动生成的，可以通过这种方式抛弃掉，对源码来说不需要，Windows 部署的话只需要</li>
</ol>
</li>
<li>改进现有的文档体系，尤其是环境变量的文档，地址是 https://github.com/openimsdk/open-im-server/blob/main/docs/contrib/environment.md 详细说明各种配置方法</li>
<li>make init 提供一个选择性覆盖的选项</li>
</ol>
<p>docker compose down：</p>
<ol>
<li><code v-pre>docker-compose down</code>：
<ul>
<li><code v-pre>docker-compose down</code> 命令用于停止并删除 Docker Compose 配置文件中定义的所有服务和相关容器、网络以及卷。</li>
<li>它会执行以下操作：
<ul>
<li>停止运行中的服务容器。</li>
<li>移除相关的容器、网络和数据卷。</li>
<li>如果定义了<code v-pre>--volumes</code>选项，它会删除数据卷（包括持久化数据），否则数据卷会保留在本地文件系统上。</li>
</ul>
</li>
<li>通常用于彻底清理 Docker Compose 环境，包括删除数据。</li>
</ul>
</li>
<li><code v-pre>docker-compose stop</code>：
<ul>
<li><code v-pre>docker-compose stop</code> 命令用于停止 Docker Compose 配置文件中定义的所有服务的运行，但不会删除相关的容器、网络或数据卷。</li>
<li>它会执行以下操作：
<ul>
<li>停止运行中的服务容器。</li>
<li>保留相关的容器、网络和数据卷，以便稍后可以使用 <code v-pre>docker-compose start</code> 或 <code v-pre>docker-compose up</code> 重新启动服务。</li>
</ul>
</li>
<li>通常用于临时停止服务，而不希望删除相关资源。</li>
</ul>
</li>
</ol>
<p><strong>OpenIM Docker 仓库只是用来提供测试的</strong></p>
<p>目录结构设定约束，考虑用分支来</p>
<h2 id="提供的部署方案" tabindex="-1"><a class="header-anchor" href="#提供的部署方案" aria-hidden="true">#</a> 提供的部署方案</h2>
<p>所有的部署（除开 Kubernetes 但又不例外：compose 作为测试）都是依赖中间件的，所以中间件层作为通用层方案会简单很多。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>                       +----------------------------------+
                       <span class="token operator">|</span>        生态层 <span class="token punctuation">(</span>Ecology<span class="token punctuation">)</span>           <span class="token operator">|</span>
                       <span class="token operator">|</span>----------------------------------<span class="token operator">|</span>
                       <span class="token operator">|</span>  Prometheus       Grafana        <span class="token operator">|</span>
                       <span class="token operator">|</span>  chat             opnkf <span class="token punctuation">..</span>.      <span class="token operator">|</span>
                       +----------------------------------+
                              ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
                              <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span>
                       +----------------------------------+
                       <span class="token operator">|</span>          Server 层 <span class="token punctuation">(</span>Server<span class="token punctuation">)</span>       <span class="token operator">|</span>
                       <span class="token operator">|</span>----------------------------------<span class="token operator">|</span>
                       <span class="token operator">|</span>  IM 通信服务端       <span class="token punctuation">..</span>.           <span class="token operator">|</span>
                       <span class="token operator">|</span>  <span class="token punctuation">..</span>.               <span class="token punctuation">..</span>.           <span class="token operator">|</span>
                       +----------------------------------+
                              ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑ ↑
                              <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span> <span class="token operator">|</span>
                       +----------------------------------+
                       <span class="token operator">|</span>       中间件层 <span class="token punctuation">(</span>Middleware<span class="token punctuation">)</span>       <span class="token operator">|</span>
                       <span class="token operator">|</span>----------------------------------<span class="token operator">|</span>
                       <span class="token operator">|</span>  MySQL    Redis    MongoDB       <span class="token operator">|</span>
                       <span class="token operator">|</span>  Kafka    ZooKeeper <span class="token punctuation">(</span>其他<span class="token punctuation">)</span> <span class="token punctuation">..</span>.    <span class="token operator">|</span>
                       +----------------------------------+
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>源码快速部署体验 OpenIM （非稳定）</li>
<li>源码使用 System 生产部署 OpenIM （稳定）</li>
<li>Docker 的方式部署 OpenIM（不建议生产）</li>
<li>Kubernetes 的部署</li>
<li>Sealos 快捷部署</li>
<li>Debian 发布部署</li>
<li>RHEL 8 发布部署</li>
<li>根据 https://github.com/OpenIMSDK/Open-IM-Server/releases 探索更多的部署指南</li>
</ul>
<p><strong>设计图：</strong></p>
<p><img src="http://sm.nsddd.top/sm202311291147052.png" alt="Dopenim"></p>
<h3 id="_1-linux-部署方案" tabindex="-1"><a class="header-anchor" href="#_1-linux-部署方案" aria-hidden="true">#</a> 1. Linux 部署方案</h3>
<p>Linux 是最常见的服务器操作系统，支持多种包管理器。</p>
<h4 id="a-基于-debian-ubuntu-使用-deb-包" tabindex="-1"><a class="header-anchor" href="#a-基于-debian-ubuntu-使用-deb-包" aria-hidden="true">#</a> a. 基于 Debian/Ubuntu (使用 .deb 包)</h4>
<ul>
<li>使用 <code v-pre>dpkg</code> 或 <code v-pre>apt</code> 安装 <code v-pre>.deb</code> 文件。</li>
<li>配置 MySQL 或兼容数据库。</li>
<li>设置必要的依赖和环境变量。</li>
</ul>
<h4 id="b-基于-red-hat-centos-使用-rpm-包" tabindex="-1"><a class="header-anchor" href="#b-基于-red-hat-centos-使用-rpm-包" aria-hidden="true">#</a> b. 基于 Red Hat/CentOS (使用 .rpm 包)</h4>
<ul>
<li>使用 <code v-pre>rpm</code> 或 <code v-pre>yum</code>/<code v-pre>dnf</code> 安装 <code v-pre>.rpm</code> 文件。</li>
<li>类似地配置数据库和依赖项。</li>
</ul>
<h4 id="c-基于-arch-linux-使用-pkg-tar-zst-包" tabindex="-1"><a class="header-anchor" href="#c-基于-arch-linux-使用-pkg-tar-zst-包" aria-hidden="true">#</a> c. 基于 Arch Linux (使用 .pkg.tar.zst 包)</h4>
<ul>
<li>使用 <code v-pre>pacman</code> 安装 <code v-pre>.pkg.tar.zst</code> 文件。</li>
<li>配置数据库和其他依赖。</li>
</ul>
<h4 id="d-基于-alpine-linux-使用-apk-包" tabindex="-1"><a class="header-anchor" href="#d-基于-alpine-linux-使用-apk-包" aria-hidden="true">#</a> d. 基于 Alpine Linux (使用 .apk 包)</h4>
<ul>
<li>在适用于轻量级部署的 Alpine Linux 上使用 <code v-pre>apk</code> 安装 <code v-pre>.apk</code> 文件。</li>
<li>设置数据库和环境。</li>
</ul>
<h3 id="_2-windows-部署方案" tabindex="-1"><a class="header-anchor" href="#_2-windows-部署方案" aria-hidden="true">#</a> 2. Windows 部署方案</h3>
<p>Windows 也是一个流行的选择，尤其是在企业环境中。</p>
<h4 id="a-使用-zip-包" tabindex="-1"><a class="header-anchor" href="#a-使用-zip-包" aria-hidden="true">#</a> a. 使用 .zip 包</h4>
<ul>
<li>解压缩 <code v-pre>.zip</code> 文件到指定目录。</li>
<li>安装和配置 Windows 版本的 MySQL 数据库。</li>
<li>设置环境变量和任何必要的 Windows 服务。</li>
</ul>
<h3 id="_3-macos-部署方案" tabindex="-1"><a class="header-anchor" href="#_3-macos-部署方案" aria-hidden="true">#</a> 3. macOS 部署方案</h3>
<p>虽然 macOS 服务器不如 Linux 和 Windows 那么常见，但它在某些开发环境中仍有其用武之地。</p>
<h4 id="a-使用-tar-gz-包" tabindex="-1"><a class="header-anchor" href="#a-使用-tar-gz-包" aria-hidden="true">#</a> a. 使用 .tar.gz 包</h4>
<ul>
<li>解压 <code v-pre>.tar.gz</code> 文件。</li>
<li>在 macOS 上安装和配置 MySQL 或兼容数据库。</li>
<li>配置相关的环境变量和服务。</li>
</ul>
<h2 id="提供的升级方案" tabindex="-1"><a class="header-anchor" href="#提供的升级方案" aria-hidden="true">#</a> 提供的升级方案</h2>
<p>当你从一个主要版本更新到另一个主要版本时，重要的是要遵循顺序路径，不要跳过任何中间主要版本。</p>
<p>这是因为每个主要版本都是一个重大更改，跳过中间版本可能会导致兼容性问题或意外行为。</p>
<p>例如，如果要将工作区从版本1.x.x更新到版本4.x.x，则应遵循以下路径：1.x.x -&gt; 2.x.x -&gt; 3.x.x -&gt; 4.x.x。</p>
<p>例如 OpenIM 的 V3.4 到 V3.5 有重大的变化和更新，那么 OpenIM 的更新应该是 V3.0 -&gt; V3.4 -&gt; V3.5</p>
<p>数据迁移：获取到 <code v-pre>.env</code> 文件中的 <code v-pre>cat .env| grep DATA_DIR</code> 的路径，copy 这个路径备份，然后设置新的环境变量：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>export DATA_DIR="$(cat .env| grep DATA_DIR)"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>OpenIM Docker 代码复用</strong></p>
<p>方便维护 openim-docker ，使用自动化管理 openim-docker</p>
<p>目录结构：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>+ docker-compose.yaml
+ openim-server/
+ openim-chat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>去掉了 <code v-pre>.env</code> 文件，针对 windows 用户的话使用 线上的 <code v-pre>env.example</code> 并且修改默认的变量。</p>
<p>初始化使用：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>make init

❯ make init
===========> Initializing openim server project
Read more configuration information: https://github.com/openimsdk/open-im-server/blob/main/docs/contrib/environment.md
File /tmp/open-im-server/config/prometheus.yml already exists. Overwrite? (Y/N): y
Overwriting /tmp/open-im-server/config/prometheus.yml. Previous configuration will be lost.
⌚  Working with template file: /tmp/open-im-server/deployments/templates/prometheus.yml to /tmp/open-im-server/config/prometheus.yml...
yFile /tmp/open-im-server/config/alertmanager.yml already exists. Overwrite? (Y/N):y
Overwriting /tmp/open-im-server/config/alertmanager.yml. Previous configuration will be lost.
⌚  Working with template file: /tmp/open-im-server/deployments/templates/alertmanager.yml to /tmp/open-im-server/config/alertmanager.yml...
File /tmp/open-im-server/.env already exists. Overwrite? (Y/N): y
Overwriting /tmp/open-im-server/.env. Previous configuration will be lost.
⌚  Working with template file: /tmp/open-im-server/deployments/templates/env_template.yaml to /tmp/open-im-server/.env...
File /tmp/open-im-server/config/config.yaml already exists. Overwrite? (Y/N): y
Overwriting /tmp/open-im-server/config/config.yaml. Previous configuration will be lost.
⌚  Working with template file: /tmp/open-im-server/deployments/templates/openim.yaml to /tmp/open-im-server/config/config.yaml...
[success 1129 17:45:42] ==>  ✨  All configuration files have been successfully generated!

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>生成。</p>
<h3 id="openim-docker-部署和升级指南" tabindex="-1"><a class="header-anchor" href="#openim-docker-部署和升级指南" aria-hidden="true">#</a> OpenIM Docker 部署和升级指南</h3>
<h4 id="部署方案" tabindex="-1"><a class="header-anchor" href="#部署方案" aria-hidden="true">#</a> 部署方案</h4>
<ol>
<li>
<p><strong>Docker Compose 简化部署</strong></p>
<p>Docker Compose 通常用于测试或一体化体验。它提供了一个简单的部署方法，适用于快速启动和初步探索 OpenIM。</p>
<ul>
<li><strong>默认参数选项</strong>：Docker Compose 配置应包含默认的环境变量和参数设置，确保新手用户可以轻松部署。</li>
<li><strong>文档改进</strong>：重点改进环境变量的文档，确保用户可以轻松找到并理解每个配置的作用。参考文档：<a href="https://github.com/openimsdk/open-im-server/blob/main/docs/contrib/environment.md" target="_blank" rel="noopener noreferrer">OpenIM Environment Variables<ExternalLinkIcon/></a>。</li>
<li><strong>初始化选项</strong>：<code v-pre>make init</code> 命令提供覆盖现有配置的选项，使用户能够灵活处理配置更改。</li>
</ul>
</li>
<li>
<p><strong>Linux, Windows, macOS 部署</strong></p>
<p>提供了基于不同操作系统的部署方法，包括使用相应的包管理器（如 dpkg, rpm, pacman, apk）来安装和配置 OpenIM。</p>
</li>
</ol>
<h4 id="升级方案" tabindex="-1"><a class="header-anchor" href="#升级方案" aria-hidden="true">#</a> 升级方案</h4>
<ol>
<li>
<p><strong>顺序路径升级</strong></p>
<p>当从一个主版本升级到另一个主版本时，应遵循顺序路径，逐渐升级每一个主版本。例如，从 v3.0 升级到 v3.5 应按 v3.0 -&gt; v3.4 -&gt; v3.5 的顺序进行。</p>
</li>
<li>
<p><strong>数据迁移</strong></p>
<p>重要的是备份 <code v-pre>DATA_DIR</code> 目录下的数据。可以通过执行以下命令来定位和备份这些数据：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>export DATA_DIR="$(cat .env | grep DATA_DIR)"
# 备份 DATA_DIR 目录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>代码复用和自动化</strong></p>
<p>为了简化 OpenIM Docker 的维护，采用自动化工具和脚本来管理 docker-compose 配置和相关文件。</p>
</li>
<li>
<p><strong>初始化和配置</strong></p>
<p>使用 <code v-pre>make init</code> 命令来初始化项目，这将根据模板生成必要的配置文件。该过程为用户提供了覆盖现有文件的选项，确保新配置不会意外覆盖关键设置。</p>
<p>例如：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> init
<span class="token comment"># 按提示操作，生成或更新配置文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ol>
<h4 id="安装和升级步骤" tabindex="-1"><a class="header-anchor" href="#安装和升级步骤" aria-hidden="true">#</a> 安装和升级步骤</h4>
<ol>
<li><strong>安装 OpenIM</strong>
<ul>
<li>克隆或下载 OpenIM Docker 仓库。</li>
<li>运行 <code v-pre>make init</code> 初始化配置文件。</li>
<li>使用 <code v-pre>docker-compose up -d</code> 启动服务。</li>
</ul>
</li>
<li><strong>升级 OpenIM</strong>
<ul>
<li>停止当前运行的 OpenIM 服务。</li>
<li>拉取或下载最新的 OpenIM Docker 代码。</li>
<li>执行 <code v-pre>make init</code>，选择性地覆盖配置文件。</li>
<li>使用 <code v-pre>docker-compose up -d</code> 重新启动服务。</li>
</ul>
</li>
</ol>
<p>以前的都需要手动去迁移设置，以后的全部自动化</p>
<p>镜像版本设定：</p>
<p>镜像版本以后用的是 latest 或者是 某一个 具体的版本，可以选择性的设置镜像版本</p>
<p>默认使用的就是 latest</p>
<p>openim-docker 添加 CICD 和自动化的测试逻辑</p>
<p>放弃 openim-chat 的逻辑，只做自己的逻辑的自动化</p>
<p>新的版本对应数据迁移：</p>
<ul>
<li>移除 mysql 镜像，在第一次部署的时候再没有 mysql</li>
<li>升级的时候，脚本中通过二进制对 mysql 数据镜像迁移。</li>
</ul>
<p>初始化只做一次，第二次覆盖提醒</p>
<p>升级：</p>
<ul>
<li><strong>文档驱动为主</strong>，自动化为辅助</li>
<li>使用 make update 去升级配置
<ul>
<li>读取 分支名</li>
<li>读取到指定config</li>
<li>然后配置迁移</li>
</ul>
</li>
</ul>
<p><strong>今后的升级逻辑：</strong></p>
<p><code v-pre>make update</code> 快速升级要求：</p>
<ul>
<li>锁定配置</li>
<li>锁定脚本</li>
</ul>
<h2 id="kubernetes-升级" tabindex="-1"><a class="header-anchor" href="#kubernetes-升级" aria-hidden="true">#</a> kubernetes 升级</h2>
<p>通过 GitOps 去实践升级</p>
</div></template>


