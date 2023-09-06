<template><div><h1 id="_113-openim-离线部署设计" tabindex="-1"><a class="header-anchor" href="#_113-openim-离线部署设计" aria-hidden="true">#</a> 113: OpenIM 离线部署设计</h1>
<h2 id="_1-基础镜像" tabindex="-1"><a class="header-anchor" href="#_1-基础镜像" aria-hidden="true">#</a> 1. 基础镜像</h2>
<p>以下是您需要的基础镜像及其版本：</p>
<ul>
<li>wurstmeister/kafka</li>
<li>redis:7.0.0</li>
<li>mongo:6.0.2</li>
<li>mysql:5.7</li>
<li>wurstmeister/zookeeper</li>
<li>minio/minio</li>
</ul>
<p>使用以下命令拉取这些基础镜像：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull wurstmeister/kafka
docker pull redis:7.0.0
docker pull mongo:6.0.2
docker pull mysql:5.7
docker pull wurstmeister/zookeeper
docker pull minio/minio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-openim-与-chat-镜像" tabindex="-1"><a class="header-anchor" href="#_2-openim-与-chat-镜像" aria-hidden="true">#</a> 2. OpenIM 与 Chat 镜像</h2>
<p><strong>详细了解 OpenIM 和 Chat 的版本管理及存储</strong>: <a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/version.md" target="_blank" rel="noopener noreferrer">version.md<ExternalLinkIcon/></a></p>
<h3 id="openim-镜像" tabindex="-1"><a class="header-anchor" href="#openim-镜像" aria-hidden="true">#</a> OpenIM 镜像</h3>
<ul>
<li>获取镜像版本信息: <a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/images.md" target="_blank" rel="noopener noreferrer">images.md<ExternalLinkIcon/></a></li>
<li>根据所需版本，执行以下命令：</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull ghcr.io/openimsdk/openim-server:&lt;version-name>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="chat-镜像" tabindex="-1"><a class="header-anchor" href="#chat-镜像" aria-hidden="true">#</a> Chat 镜像</h3>
<ul>
<li>执行以下命令来拉取镜像：</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull ghcr.io/openimsdk/openim-server:&lt;version-name>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-镜像存储选择" tabindex="-1"><a class="header-anchor" href="#_3-镜像存储选择" aria-hidden="true">#</a> 3. 镜像存储选择</h2>
<p><strong>存储库</strong>：</p>
<ul>
<li>阿里云：<code v-pre>registry.cn-hangzhou.aliyuncs.com/openimsdk/openim-server</code></li>
<li>Docker Hub：<code v-pre>openim/openim-server</code></li>
</ul>
<p><strong>版本选择</strong>：</p>
<ul>
<li>稳定版：如 release-v3.2 (或 3.1、3.3)</li>
<li>最新版：latest</li>
<li>main 的最新版：main</li>
</ul>
<h2 id="_4-版本选择" tabindex="-1"><a class="header-anchor" href="#_4-版本选择" aria-hidden="true">#</a> 4. 版本选择</h2>
<p>您可以选择以下版本：</p>
<ul>
<li>稳定版：如 release-v3.2</li>
<li>最新版：latest</li>
<li>main 分支的最新版：main</li>
</ul>
<h2 id="_5-离线部署步骤" tabindex="-1"><a class="header-anchor" href="#_5-离线部署步骤" aria-hidden="true">#</a> 5. 离线部署步骤</h2>
<ol>
<li><strong>拉取镜像</strong>: 执行上面的 <code v-pre>docker pull</code> 命令将所需的所有镜像拉取到本地。</li>
<li><strong>保存镜像</strong>:</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker save -o &lt;tar-file-name>.tar &lt;image-name>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li><strong>获取代码</strong>: 克隆仓库：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone https://github.com/OpenIMSDK/openim-docker.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或从<a href="https://github.com/OpenIMSDK/openim-docker/releases/" target="_blank" rel="noopener noreferrer">Releases<ExternalLinkIcon/></a>下载代码。</p>
<ol start="4">
<li><strong>传输文件</strong>: 使用 <code v-pre>scp</code> 将所有镜像和代码传输到内网服务器。</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>scp &lt;tar-file-name>.tar user@remote-ip:/path/on/remote/server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>或选择其他传输方式如硬盘。</p>
<ol start="5">
<li><strong>导入镜像</strong>: 在内网服务器上：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker load -i &lt;tar-file-name>.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="6">
<li>
<p><strong>部署</strong>：进入 <code v-pre>openim-docker</code> 仓库目录，按照 README 文档指导进行部署。</p>
</li>
<li>
<p><strong>使用 Docker-compose 部署</strong>:</p>
</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker-compose up -d

# 验证
docker-compose ps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>备注</strong>: 若您使用的是 Docker 的版本 20 之前，需确保已经安装了 <code v-pre>docker-compose</code>。</p>
</blockquote>
<h2 id="_6-参考链接" tabindex="-1"><a class="header-anchor" href="#_6-参考链接" aria-hidden="true">#</a> 6. 参考链接</h2>
<ul>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/issues/432" target="_blank" rel="noopener noreferrer">OpenIMSDK Issue #432<ExternalLinkIcon/></a></li>
<li><a href="https://nsddd.notion.site/435ee747c0bc44048da9300a2d745ad3?pvs=25" target="_blank" rel="noopener noreferrer">Notion Link<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/issues/474" target="_blank" rel="noopener noreferrer">OpenIMSDK Issue #474<ExternalLinkIcon/></a></li>
</ul>
<h1 id="openim-offline-deployment-design" tabindex="-1"><a class="header-anchor" href="#openim-offline-deployment-design" aria-hidden="true">#</a> OpenIM Offline Deployment Design</h1>
<h2 id="_1-base-images" tabindex="-1"><a class="header-anchor" href="#_1-base-images" aria-hidden="true">#</a> 1. Base Images</h2>
<p>Below are the base images and their versions you'll need:</p>
<ul>
<li>wurstmeister/kafka</li>
<li>redis:7.0.0</li>
<li>mongo:6.0.2</li>
<li>mysql:5.7</li>
<li>wurstmeister/zookeeper</li>
<li>minio/minio</li>
</ul>
<p>Use the following commands to pull these base images:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker pull wurstmeister/kafka
docker pull redis:7.0.0
docker pull mongo:6.0.2
docker pull mysql:5.7
docker pull wurstmeister/zookeeper
docker pull minio/minio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-openim-chat-images" tabindex="-1"><a class="header-anchor" href="#_2-openim-chat-images" aria-hidden="true">#</a> 2. OpenIM &amp; Chat Images</h2>
<p><strong>For detailed understanding of version management and storage of OpenIM and Chat</strong>: <a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/version.md" target="_blank" rel="noopener noreferrer">version.md<ExternalLinkIcon/></a></p>
<h3 id="openim-image" tabindex="-1"><a class="header-anchor" href="#openim-image" aria-hidden="true">#</a> OpenIM Image</h3>
<ul>
<li>Get image version info: <a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/images.md" target="_blank" rel="noopener noreferrer">images.md<ExternalLinkIcon/></a></li>
<li>Depending on the required version, execute the following command:</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull ghcr.io/openimsdk/openim-server:<span class="token operator">&lt;</span>version-name<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="chat-image" tabindex="-1"><a class="header-anchor" href="#chat-image" aria-hidden="true">#</a> Chat Image</h3>
<ul>
<li>Execute the following command to pull the image:</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> pull ghcr.io/openimsdk/openim-server:<span class="token operator">&lt;</span>version-name<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-image-storage-selection" tabindex="-1"><a class="header-anchor" href="#_3-image-storage-selection" aria-hidden="true">#</a> 3. Image Storage Selection</h2>
<p><strong>Repositories</strong>:</p>
<ul>
<li>Alibaba Cloud: <code v-pre>registry.cn-hangzhou.aliyuncs.com/openimsdk/openim-server</code></li>
<li>Docker Hub: <code v-pre>openim/openim-server</code></li>
</ul>
<p><strong>Version Selection</strong>:</p>
<ul>
<li>Stable: e.g. release-v3.2 (or 3.1, 3.3)</li>
<li>Latest: latest</li>
<li>Latest of main: main</li>
</ul>
<h2 id="_4-version-selection" tabindex="-1"><a class="header-anchor" href="#_4-version-selection" aria-hidden="true">#</a> 4. Version Selection</h2>
<p>You can select from the following versions:</p>
<ul>
<li>Stable: e.g. release-v3.2</li>
<li>Latest: latest</li>
<li>Latest from main branch: main</li>
</ul>
<h2 id="_5-offline-deployment-steps" tabindex="-1"><a class="header-anchor" href="#_5-offline-deployment-steps" aria-hidden="true">#</a> 5. Offline Deployment Steps</h2>
<ol>
<li><strong>Pull images</strong>: Execute the above <code v-pre>docker pull</code> commands to pull all required images locally.</li>
<li><strong>Save images</strong>:</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker save -o &lt;tar-file-name>.tar &lt;image-name>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li><strong>Fetch code</strong>: Clone the repository:</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>git clone https://github.com/OpenIMSDK/openim-docker.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Or download the code from <a href="https://github.com/OpenIMSDK/openim-docker/releases/" target="_blank" rel="noopener noreferrer">Releases<ExternalLinkIcon/></a>.</p>
<ol>
<li><strong>Transfer files</strong>: Use <code v-pre>scp</code> to transfer all images and code to the intranet server.</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>scp &lt;tar-file-name>.tar user@remote-ip:/path/on/remote/server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Or choose other transfer methods such as a hard drive.</p>
<ol>
<li><strong>Import images</strong>: On the intranet server:</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker load -i &lt;tar-file-name>.tar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol>
<li><strong>Deploy</strong>: Navigate to the <code v-pre>openim-docker</code> repository directory and follow the README guide for deployment.</li>
<li><strong>Deploy using Docker-compose</strong>:</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker-compose up -d

# Verify
docker-compose ps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>Note</strong>: If you're using a version of Docker prior to 20, make sure you've installed <code v-pre>docker-compose</code>.</p>
</blockquote>
<h2 id="_6-reference-links" tabindex="-1"><a class="header-anchor" href="#_6-reference-links" aria-hidden="true">#</a> 6. Reference Links</h2>
<ul>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/issues/432" target="_blank" rel="noopener noreferrer">OpenIMSDK Issue #432<ExternalLinkIcon/></a></li>
<li><a href="https://nsddd.notion.site/435ee747c0bc44048da9300a2d745ad3?pvs=25" target="_blank" rel="noopener noreferrer">Notion Link<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/issues/474" target="_blank" rel="noopener noreferrer">OpenIMSDK Issue #474<ExternalLinkIcon/></a></li>
</ul>
</div></template>


