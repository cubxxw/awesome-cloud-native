<template><div><h1 id="openim-docker-deployment" tabindex="-1"><a class="header-anchor" href="#openim-docker-deployment" aria-hidden="true">#</a> OpenIM Docker Deployment</h1>
<p>OpenIM Docker 提供了一个稳定的 OpenIM 构建和部署解决方案，有非常多的部署方案提供选择，使用 Docker 和 Docker Compose 简化了整个过程。</p>
<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>OpenIM Docker Deployment
│
├── 📁 **build/**
│   ├── 📄 Dockerfile-server
│   └── 📄 Dockerfile-chat
│
├── 📁 **openim-server/**
│   ├── 📄 docker-compose.yml
│   └── 📁 **configs/**
│       ├── 📄 server-config.yaml
│       └── 📄 other-config.yaml
│
├── 📁 **openim-chat/**
│   ├── 📄 docker-compose.yml
│   └── 📁 **configs/**
│       ├── 📄 chat-config.yaml
│       └── 📄 other-config.yaml
│
├── 📁 **env/**
│   ├── 📄 openim-server.env
│   └── 📄 openim-chat.env
│
└── 📁 **example/**
    ├── 📄 basic-openim-server-dependency.yml
    ├── 📄 only-openim-server.yml
    └── 📄 full-openim-server-and-chat.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>build/</code>：用于构建 Docker 镜像。</li>
<li><code v-pre>openim-server/</code>：用于部署 openim-server。</li>
<li><code v-pre>openim-chat/</code>：用于部署 openim-chat。</li>
<li><code v-pre>env/</code>：存放 Docker-compose 的环境变量文件。</li>
<li><code v-pre>example/</code>：包含各种 Docker-compose 示例。</li>
</ul>
<p>了解您的要求后，我将在使用方法指南中加入这部分内容。</p>
<h3 id="openim-docker-使用方法" tabindex="-1"><a class="header-anchor" href="#openim-docker-使用方法" aria-hidden="true">#</a> OpenIM Docker 使用方法</h3>
<h4 id="_1-获取镜像" tabindex="-1"><a class="header-anchor" href="#_1-获取镜像" aria-hidden="true">#</a> 1. 获取镜像</h4>
<p>您可以从以下三个源获取 Docker 镜像：</p>
<ul>
<li><a href="https://github.com/orgs/OpenIMSDK/packages?repo_name=Open-IM-Server" target="_blank" rel="noopener noreferrer">GitHub Packages<ExternalLinkIcon/></a></li>
<li>阿里云</li>
<li>Docker Hub</li>
</ul>
<p>为了确保获取到最新版本的镜像，请参考以下文档：</p>
<ul>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/version.md" target="_blank" rel="noopener noreferrer">openim 版本设计<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/images.md" target="_blank" rel="noopener noreferrer">openim 镜像策略<ExternalLinkIcon/></a></li>
</ul>
<h4 id="_2-使用-docker-compose" tabindex="-1"><a class="header-anchor" href="#_2-使用-docker-compose" aria-hidden="true">#</a> 2. 使用 Docker-compose</h4>
<p><strong>默认启动选择：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="项目结构" tabindex="-1"><a class="header-anchor" href="#项目结构" aria-hidden="true">#</a> 项目结构</h2>
<ul>
<li>对于 <code v-pre>openim-server</code> 和 <code v-pre>openim-chat</code> 的更改，请分别前往 https://github.com/OpenIMSDK/Open-IM-Server/ 和 https://github.com/OpenIMSDK/chat 进行贡献。</li>
<li>为了同步两个项目的脚本和配置文件，我们使用自动化工具。您只需要确保文件与原始仓库保持同步。</li>
<li>对于环境变量文件和 Docker-compose 示例，请在 <code v-pre>env/</code> 和 <code v-pre>example/</code> 目录下进行更改。</li>
</ul>
<p><strong>定制启动</strong></p>
<p>根据您的需求，选择相应的 Docker-compose 文件进行启动：</p>
<ul>
<li>
<p><strong>基础环境依赖</strong>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> basic-openim-server-dependency.yml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>仅 OpenIM Server</strong>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> only-openim-server.yml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>OpenIM Server 和 Chat</strong>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> full-openim-server-and-chat.yml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p><strong>测试运行状态</strong></p>
<p>要查看所有服务是否都已启动，可以使用：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果您发现没有启动的容器，您可以查看特定服务的日志以找出原因。例如，查看 OpenIM Server 的日志：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> logs openim-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>停止</strong></p>
<p>停止 Docker-compose 运行的所有服务：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> down
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果您使用了特定的 <code v-pre>docker-compose</code> 文件，请确保也在 <code v-pre>down</code> 命令中指定它。</p>
<h4 id="_3-提示" tabindex="-1"><a class="header-anchor" href="#_3-提示" aria-hidden="true">#</a> 3. 提示</h4>
<p>确保您的 Docker 和 Docker Compose 是最新版本，以确保最佳兼容性和性能。</p>
<h2 id="贡献" tabindex="-1"><a class="header-anchor" href="#贡献" aria-hidden="true">#</a> 贡献</h2>
<p>我们鼓励社区贡献并完善这个项目。具体的贡献流程，请查看 <RouterLink to="/Cloud-Native/CONTRIBUTING.html">CONTRIBUTING.md</RouterLink>。</p>
<h2 id="协议" tabindex="-1"><a class="header-anchor" href="#协议" aria-hidden="true">#</a> 协议</h2>
<p>本项目使用 MIT 协议。详情请查看 <a href="./LICENSE">LICENSE</a>。</p>
<h1 id="openim-docker-deployment-1" tabindex="-1"><a class="header-anchor" href="#openim-docker-deployment-1" aria-hidden="true">#</a> OpenIM Docker Deployment</h1>
<p>OpenIM Docker 提供了一个稳定的 OpenIM 构建和部署解决方案，有非常多的部署方案提供选择，使用 Docker 和 Docker Compose 简化了整个过程。</p>
<h2 id="目录结构-1" tabindex="-1"><a class="header-anchor" href="#目录结构-1" aria-hidden="true">#</a> 目录结构</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>OpenIM Docker Deployment
│
├── 📁 **build/**
│   ├── 📄 Dockerfile-server
│   └── 📄 Dockerfile-chat
│
├── 📁 **openim-server/**
│   ├── 📄 docker-compose.yml
│   └── 📁 **configs/**
│       ├── 📄 server-config.yaml
│       └── 📄 other-config.yaml
│
├── 📁 **openim-chat/**
│   ├── 📄 docker-compose.yml
│   └── 📁 **configs/**
│       ├── 📄 chat-config.yaml
│       └── 📄 other-config.yaml
│
├── 📁 **env/**
│   ├── 📄 openim-server.env
│   └── 📄 openim-chat.env
│
└── 📁 **example/**
    ├── 📄 basic-openim-server-dependency.yml
    ├── 📄 only-openim-server.yml
    └── 📄 full-openim-server-and-chat.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>build/</code>：用于构建 Docker 镜像。</li>
<li><code v-pre>openim-server/</code>：用于部署 openim-server。</li>
<li><code v-pre>openim-chat/</code>：用于部署 openim-chat。</li>
<li><code v-pre>env/</code>：存放 Docker-compose 的环境变量文件。</li>
<li><code v-pre>example/</code>：包含各种 Docker-compose 示例。</li>
</ul>
<p>了解您的要求后，我将在使用方法指南中加入这部分内容。</p>
<h3 id="openim-docker-使用方法-1" tabindex="-1"><a class="header-anchor" href="#openim-docker-使用方法-1" aria-hidden="true">#</a> OpenIM Docker 使用方法</h3>
<h4 id="_1-获取镜像-1" tabindex="-1"><a class="header-anchor" href="#_1-获取镜像-1" aria-hidden="true">#</a> 1. 获取镜像</h4>
<p>您可以从以下三个源获取 Docker 镜像：</p>
<ul>
<li><a href="https://github.com/orgs/OpenIMSDK/packages?repo_name=Open-IM-Server" target="_blank" rel="noopener noreferrer">GitHub Packages<ExternalLinkIcon/></a></li>
<li>阿里云</li>
<li>Docker Hub</li>
</ul>
<p>为了确保获取到最新版本的镜像，请参考以下文档：</p>
<ul>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/version.md" target="_blank" rel="noopener noreferrer">openim 版本设计<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/images.md" target="_blank" rel="noopener noreferrer">openim 镜像策略<ExternalLinkIcon/></a></li>
</ul>
<h4 id="_2-使用-docker-compose-1" tabindex="-1"><a class="header-anchor" href="#_2-使用-docker-compose-1" aria-hidden="true">#</a> 2. 使用 Docker-compose</h4>
<p><strong>默认启动选择：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>定制启动</strong></p>
<p>根据您的需求，选择相应的 Docker-compose 文件进行启动：</p>
<ul>
<li>
<p><strong>基础环境依赖</strong>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> basic-openim-server-dependency.yml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>仅 OpenIM Server</strong>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> only-openim-server.yml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>OpenIM Server 和 Chat</strong>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> full-openim-server-and-chat.yml up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p><strong>测试运行状态</strong></p>
<p>要查看所有服务是否都已启动，可以使用：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果您发现没有启动的容器，您可以查看特定服务的日志以找出原因。例如，查看 OpenIM Server 的日志：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> logs openim-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>停止</strong></p>
<p>停止 Docker-compose 运行的所有服务：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> down
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果您使用了特定的 <code v-pre>docker-compose</code> 文件，请确保也在 <code v-pre>down</code> 命令中指定它。</p>
<h4 id="_3-提示-1" tabindex="-1"><a class="header-anchor" href="#_3-提示-1" aria-hidden="true">#</a> 3. 提示</h4>
<p>确保您的 Docker 和 Docker Compose 是最新版本，以确保最佳兼容性和性能。</p>
<h2 id="贡献-1" tabindex="-1"><a class="header-anchor" href="#贡献-1" aria-hidden="true">#</a> 贡献</h2>
<p>我们鼓励社区贡献并完善这个项目。具体的贡献流程，请查看 <RouterLink to="/Cloud-Native/CONTRIBUTING.html">CONTRIBUTING.md</RouterLink>。</p>
<h2 id="协议-1" tabindex="-1"><a class="header-anchor" href="#协议-1" aria-hidden="true">#</a> 协议</h2>
<p>本项目使用 MIT 协议。详情请查看 <a href="./LICENSE">LICENSE</a>。</p>
<h1 id="openim-docker-deployment-guide" tabindex="-1"><a class="header-anchor" href="#openim-docker-deployment-guide" aria-hidden="true">#</a> OpenIM Docker Deployment Guide</h1>
<p>Welcome to the world of OpenIM Docker! To make it easier for you to deploy OpenIM, we offer a stable and convenient Docker solution. With just Docker and Docker Compose, you can easily launch or manage the entire service.</p>
<h2 id="a-glimpse-at-the-project-structure" tabindex="-1"><a class="header-anchor" href="#a-glimpse-at-the-project-structure" aria-hidden="true">#</a> A Glimpse at the Project Structure</h2>
<div class="language-bashOpenIM ext-bashOpenIM line-numbers-mode"><pre v-pre class="language-bashOpenIM"><code>│
├── 📁 **build/**
│   ├── 📄 Dockerfile-server
│   └── 📄 Dockerfile-chat
│
├── 📁 **openim-server/**
│   ├── 📄 docker-compose.yml
│   └── 📁 **configs/**
│       ├── 📄 server-config.yaml
│       └── 📄 other-config.yaml
│
├── 📁 **openim-chat/**
│   ├── 📄 docker-compose.yml
│   └── 📁 **configs/**
│       ├── 📄 chat-config.yaml
│       └── 📄 other-config.yaml
│
├── 📁 **env/**
│   ├── 📄 openim-server.env
│   └── 📄 openim-chat.env
│
└── 📁 **example/**
    ├── 📄 basic-openim-server-dependency.yml
    ├── 📄 only-openim-server.yml
    └── 📄 full-openim-server-and-chat.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>build/</code>: Files required for Docker builds reside here.</li>
<li><code v-pre>openim-server/</code>: Everything you need to deploy the OpenIM service can be found here.</li>
<li><code v-pre>openim-chat/</code>: This is where the OpenIM chat service is deployed.</li>
<li><code v-pre>env/</code>: The home of environment variables that Docker-compose needs.</li>
<li><code v-pre>example/</code>: Want real Docker-compose examples? Look no further!</li>
</ul>
<p>Next, we'll delve into the operational guide detailing how to use these files.</p>
<h3 id="how-to-use-openim-docker" tabindex="-1"><a class="header-anchor" href="#how-to-use-openim-docker" aria-hidden="true">#</a> How to Use OpenIM Docker</h3>
<h4 id="_1-acquire-the-image" tabindex="-1"><a class="header-anchor" href="#_1-acquire-the-image" aria-hidden="true">#</a> 1. Acquire the Image</h4>
<p>First, choose one of the following platforms to download the Docker image:</p>
<ul>
<li><a href="https://github.com/orgs/OpenIMSDK/packages?repo_name=Open-IM-Server" target="_blank" rel="noopener noreferrer">GitHub Packages<ExternalLinkIcon/></a></li>
<li>Alibaba Cloud</li>
<li>Docker Hub</li>
</ul>
<p>To ensure that you download the latest image, please refer to these two documents:</p>
<ul>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/version.md" target="_blank" rel="noopener noreferrer">openim version introduction<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/images.md" target="_blank" rel="noopener noreferrer">openim image selection guide<ExternalLinkIcon/></a></li>
</ul>
<h4 id="_2-launch-the-service-with-docker-compose" tabindex="-1"><a class="header-anchor" href="#_2-launch-the-service-with-docker-compose" aria-hidden="true">#</a> 2. Launch the Service with Docker-compose</h4>
<p><strong>One-click launch:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up <span class="token parameter variable">-d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Customized launches based on needs:</strong></p>
<ul>
<li>
<p><strong>Launch basic environment only</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bashCopy code
docker-compose -f basic-openim-server-dependency.yml up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Launch OpenIM Server only</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bashCopy code
docker-compose -f only-openim-server.yml up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p><strong>Launch both OpenIM Server and chat functionality</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bashCopy code
docker-compose -f full-openim-server-and-chat.yml up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
<p><strong>Check operational status</strong></p>
<p>To confirm all services are up and running:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>If a particular service isn't running, you can inspect its logs, for instance:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> logs openim-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Shut down the service</strong></p>
<p>To stop all services run by Docker-compose:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> down
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>When using a specific <code v-pre>docker-compose</code> file, remember to specify it in the <code v-pre>down</code> command.</p>
<h4 id="_3-a-little-tip" tabindex="-1"><a class="header-anchor" href="#_3-a-little-tip" aria-hidden="true">#</a> 3. A Little Tip</h4>
<p>Please ensure that both your Docker and Docker Compose are updated to the latest versions for the best compatibility and performance.</p>
<h2 id="contribute-your-strength" tabindex="-1"><a class="header-anchor" href="#contribute-your-strength" aria-hidden="true">#</a> Contribute Your Strength</h2>
<p>If you're interested in our project, we warmly welcome you to participate and contribute to it! Please refer to <a href="https://github.com/openim-sigs/openim-docker/tree/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">CONTRIBUTING.md<ExternalLinkIcon/></a> for more details.</p>
<h2 id="license" tabindex="-1"><a class="header-anchor" href="#license" aria-hidden="true">#</a> License</h2>
<p>This project is licensed under the MIT license. For specific content, please check <a href="https://github.com/openim-sigs/openim-docker/tree/main/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE<ExternalLinkIcon/></a>.</p>
</div></template>


