<template><div><h1 id="_109-openim-docker-deployment" tabindex="-1"><a class="header-anchor" href="#_109-openim-docker-deployment" aria-hidden="true">#</a> 109: OpenIM Docker Deployment</h1>
<p>OpenIM Docker provides a stable OpenIM build and deployment solution. With various deployment options available, Docker and Docker Compose simplify the entire process.</p>
<h2 id="directory-structure" tabindex="-1"><a class="header-anchor" href="#directory-structure" aria-hidden="true">#</a> Directory Structure</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bashCopy codeOpenIM Docker Deployment
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
<li><code v-pre>build/</code>: Used for building Docker images.</li>
<li><code v-pre>openim-server/</code>: Used for deploying openim-server.</li>
<li><code v-pre>openim-chat/</code>: Used for deploying openim-chat.</li>
<li><code v-pre>env/</code>: Contains Docker-compose environment variable files.</li>
<li><code v-pre>example/</code>: Contains various Docker-compose examples.</li>
</ul>
<h3 id="project-structure-notes" tabindex="-1"><a class="header-anchor" href="#project-structure-notes" aria-hidden="true">#</a> Project Structure Notes</h3>
<ul>
<li>For changes to <code v-pre>openim-server</code> and <code v-pre>openim-chat</code>, please contribute at https://github.com/OpenIMSDK/Open-IM-Server/ and https://github.com/OpenIMSDK/chat respectively.</li>
<li>To synchronize scripts and configuration files of the two projects, we use automation tools. You only need to ensure that the files are synchronized with the original repository.</li>
<li>For environment variable files and Docker-compose examples, make changes under the <code v-pre>env/</code> and <code v-pre>example/</code> directories.</li>
</ul>
<h2 id="how-to-use-openim-docker" tabindex="-1"><a class="header-anchor" href="#how-to-use-openim-docker" aria-hidden="true">#</a> How to Use OpenIM Docker</h2>
<h4 id="_1-obtain-images" tabindex="-1"><a class="header-anchor" href="#_1-obtain-images" aria-hidden="true">#</a> 1. Obtain Images</h4>
<p>You can obtain Docker images from the following three sources:</p>
<ul>
<li><a href="https://github.com/orgs/OpenIMSDK/packages?repo_name=Open-IM-Server" target="_blank" rel="noopener noreferrer">GitHub Packages<ExternalLinkIcon/></a></li>
<li>AliCloud (阿里云)</li>
<li>Docker Hub</li>
</ul>
<p>To ensure you get the latest version of the image, please refer to the following documents:</p>
<ul>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/version.md" target="_blank" rel="noopener noreferrer">OpenIM Version Design<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/images.md" target="_blank" rel="noopener noreferrer">OpenIM Image Strategy<ExternalLinkIcon/></a></li>
</ul>
<h4 id="_2-using-docker-compose" tabindex="-1"><a class="header-anchor" href="#_2-using-docker-compose" aria-hidden="true">#</a> 2. Using Docker-compose</h4>
<p><strong>Clone the repository:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bashCopy codegit clone https://github.com/openim-sigs/openim-docker openim/openim-docker &amp;&amp; export openim=$(pwd)/openim &amp;&amp; cd $openim/openim-docker
sudo docker compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Default launch option:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bashCopy code
docker-compose up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>Note</strong>: If image pulling is slow, you can choose the image from AliCloud. Both openim-server and openim-chat use the same image, just modify the image in the docker-compose.yml.</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bashCopy code# image: ghcr.io/openimsdk/openim-server:latest
image: registry.cn-hangzhou.aliyuncs.com/openimsdk/openim-server:latest
# image: openim/openim-server:latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Custom Start-Up</strong></p>
<p>Based on your requirements, choose the appropriate Docker-compose file to start:</p>
<ul>
<li>
<p><strong>Basic Environment Dependency</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker-compose -f example/basic-openim-server-dependency.yml up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>Only OpenIM Server</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker-compose -f example/only-openim-server.yml up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p><strong>Both OpenIM Server and Chat</strong>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker-compose -f example/full-openim-server-and-chat.yml up -d
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<p><strong>Mounting:</strong></p>
<p>In the Docker Compose file, the &quot;volumes&quot; keyword defines named volumes. Named volumes are a storage concept in Docker that allows you to create persistent storage for a container. This means that even if the container is deleted, the data stored on that volume will not be lost.</p>
<p>For easy management, we use named volumes. These volumes have the same name as the services. For instance, the openim-server service uses the openim-server named volume, and the openim-chat service uses the openim-chat named volume.</p>
<p>View all volumes:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker volume ls
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>View a specific volume:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker volume inspect &lt;volume-name>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Delete a named volume:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker volume rm &lt;volume-name>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Delete unused volumes:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker volume prune
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Customizing Your Image</strong></p>
<p>For easy customization, we provide basic images of various distributions and architectures. The repository address is https://github.com/openim-sigs/openim-base-image, for easy customization.</p>
<p><strong>Test Running Status</strong></p>
<p>To see if all services have started, you can use:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker-compose ps
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>If you find a container that hasn't started, you can view the logs of the specific service to find out the reason. For example, to view the logs of OpenIM Server:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker-compose logs openim-server
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Stop</strong></p>
<p>To stop all services running by Docker-compose:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker-compose down
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>If you used a specific <code v-pre>docker-compose</code> file, make sure to specify it in the <code v-pre>down</code> command as well.</p>
<h4 id="_3-tips" tabindex="-1"><a class="header-anchor" href="#_3-tips" aria-hidden="true">#</a> 3. Tips</h4>
<p>Ensure your Docker and Docker Compose are up-to-date to guarantee the best compatibility and performance.</p>
<h2 id="contribution" tabindex="-1"><a class="header-anchor" href="#contribution" aria-hidden="true">#</a> Contribution</h2>
<ul>
<li>Fork this repository to your GitHub account.</li>
<li>Clone the forked repository to your local environment.</li>
<li>Create a new branch and name it after your contribution.</li>
<li>Make changes where needed.</li>
<li>Commit your changes and push them to your fork.</li>
<li>Create a new Pull Request on GitHub.</li>
</ul>
<p>We encourage community contributions and improvements to this project. For the specific contribution process, please refer to <a href="https://chat.openai.com/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">CONTRIBUTING.md<ExternalLinkIcon/></a>.</p>
<h2 id="license" tabindex="-1"><a class="header-anchor" href="#license" aria-hidden="true">#</a> License</h2>
<p>This project uses the MIT license. For details, please refer to <a href="https://chat.openai.com/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE<ExternalLinkIcon/></a>.</p>
</div></template>


