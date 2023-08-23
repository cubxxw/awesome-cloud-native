<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第99节-systemd-configuration-installation-and-startup" tabindex="-1"><a class="header-anchor" href="#第99节-systemd-configuration-installation-and-startup" aria-hidden="true">#</a> 第99节 Systemd Configuration, Installation, and Startup</h1>
<div><a href = '98.md' style='float:left'>⬆️上一节🔗  </a><a href = '100.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<ul>
<li><a href="#systemd-configuration-installation-and-startup">Systemd Configuration, Installation, and Startup</a>
<ul>
<li><a href="#1-introduction">1. Introduction</a></li>
<li><a href="#2-prerequisites-requires-root-permissions">2. Prerequisites (Requires root permissions)</a></li>
<li><a href="#3-create-openim-api-systemd-unit-template-file">3. Create <code v-pre>openim-api</code> systemd unit template file</a></li>
<li><a href="#4-copy-systemd-unit-template-file-to-systemd-config-directory-requires-root-permissions">4. Copy systemd unit template file to systemd config directory (Requires root permissions)</a></li>
<li><a href="#5-start-systemd-service">5. Start systemd service</a></li>
</ul>
</li>
</ul>
<h2 id="_1-introduction" tabindex="-1"><a class="header-anchor" href="#_1-introduction" aria-hidden="true">#</a> 1. Introduction</h2>
<p>Systemd is the default service management form for the latest Linux distributions, replacing the original init.</p>
<p>Format introduction:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Unit<span class="token punctuation">]</span> <span class="token builtin class-name">:</span> Unit of the <span class="token function">service</span>

Description: Brief description of the <span class="token function">service</span>

<span class="token punctuation">[</span>Service<span class="token punctuation">]</span>: Configuration of the service's runtime behavior

ExecStart: Complete path of the program

Restart: Restart configurations like no, always, on-success, on-failure, on-abnormal, on-abort, on-watchdog

<span class="token punctuation">[</span>Install<span class="token punctuation">]</span>: Installation configuration

WantedBy: Multi-user, etc.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For more details, refer to: <a href="https://www.freedesktop.org/software/systemd/man/systemd.service.html" target="_blank" rel="noopener noreferrer">Systemd Service Manual<ExternalLinkIcon/></a></p>
<p>Starting command:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl daemon-reload &amp;&amp; systemctl enable openim-api &amp;&amp; systemctl restart openim-api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Service status:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl status openim-api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Stop command:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>systemctl stop openim-api
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Why choose systemd?</strong></p>
<p><strong>Advanced requirements:</strong></p>
<ul>
<li>Convenient service runtime log recording for problem analysis</li>
<li>Service management logs</li>
<li>Option to restart upon abnormal exit</li>
</ul>
<p>The daemon does not meet these advanced requirements.</p>
<p><code v-pre>nohup</code> only logs the service's runtime outputs and errors.</p>
<p>Only systemd can fulfill all of the above requirements.</p>
<blockquote>
<p>The default logs are enhanced with timestamps, usernames, service names, PIDs, etc., making them user-friendly. You can view logs of abnormal service exits. Advanced customization is possible through the configuration files in <code v-pre>/lib/systemd/system/</code>.</p>
</blockquote>
<p>In short, systemd is the current mainstream way to manage backend services on Linux, so I've abandoned <code v-pre>nohup</code> in my new versions of bash scripts, opting instead for systemd.</p>
<h2 id="_2-prerequisites-requires-root-permissions" tabindex="-1"><a class="header-anchor" href="#_2-prerequisites-requires-root-permissions" aria-hidden="true">#</a> 2. Prerequisites (Requires root permissions)</h2>
<ol>
<li>Configure <code v-pre>environment.sh</code> based on the comments.</li>
<li>Create a data directory:</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mkdir -p ${OPENIM_DATA_DIR}/{openim-api,openim-crontask}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="3">
<li>Create a bin directory and copy <code v-pre>openim-api</code> and <code v-pre>openim-crontask</code> executable files:</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>source ./environment.sh
mkdir -p ${OPENIM_INSTALL_DIR}/bin
cp openim-api openim-crontask ${OPENIM_INSTALL_DIR}/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>Copy the configuration files of <code v-pre>openim-api</code> and <code v-pre>openim-crontask</code> to the <code v-pre>${OPENIM_CONFIG_DIR}</code> directory:</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>mkdir -p ${OPENIM_CONFIG_DIR}
cp openim-api.yaml openim-crontask.yaml ${OPENIM_CONFIG_DIR}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-create-openim-api-systemd-unit-template-file" tabindex="-1"><a class="header-anchor" href="#_3-create-openim-api-systemd-unit-template-file" aria-hidden="true">#</a> 3. Create <code v-pre>openim-api</code> systemd unit template file</h2>
<p>For each OpenIM service, we will create a systemd unit template. Follow the steps below for each service:</p>
<p>Run the following shell script to generate the <code v-pre>openim-api.service.template</code>:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>source ./environment.sh
cat > openim-api.service.template &lt;&lt;EOF
[Unit]
Description=OpenIM Server API
Documentation=https://github.com/marmotedu/iam/blob/master/init/README.md

[Service]
WorkingDirectory=${OPENIM_DATA_DIR}/openim-api
ExecStart=${OPENIM_INSTALL_DIR}/bin/openim-api --config=${OPENIM_CONFIG_DIR}/openim-api.yaml
Restart=always
RestartSec=5
StartLimitInterval=0

[Install]
WantedBy=multi-user.target
EOF
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Following the above style, create the respective template files or generate them in bulk:</p>
<p>First, make sure you've sourced the environment variables:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>source ./environment.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Use the shell script to generate the systemd unit template for each service:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>declare -a services=(
"openim-api"
... [other services]
)

for service in "${services[@]}"
do
   cat > $service.service.template &lt;&lt;EOF
[Unit]
Description=OpenIM Server - $service
Documentation=https://github.com/marmotedu/iam/blob/master/init/README.md

[Service]
WorkingDirectory=${OPENIM_DATA_DIR}/$service
ExecStart=${OPENIM_INSTALL_DIR}/bin/$service --config=${OPENIM_CONFIG_DIR}/$service.yaml
Restart=always
RestartSec=5
StartLimitInterval=0

[Install]
WantedBy=multi-user.target
EOF
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-copy-systemd-unit-template-file-to-systemd-config-directory-requires-root-permissions" tabindex="-1"><a class="header-anchor" href="#_4-copy-systemd-unit-template-file-to-systemd-config-directory-requires-root-permissions" aria-hidden="true">#</a> 4. Copy systemd unit template file to systemd config directory (Requires root permissions)</h2>
<p>Ensure you have root permissions to perform this operation:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>for service in "${services[@]}"
do
   sudo cp $service.service.template /etc/systemd/system/$service.service
done
...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-start-systemd-service" tabindex="-1"><a class="header-anchor" href="#_5-start-systemd-service" aria-hidden="true">#</a> 5. Start systemd service</h2>
<p>To start the OpenIM services:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>for service in "${services[@]}"
do
   sudo systemctl daemon-reload 
   sudo systemctl enable $service 
   sudo systemctl restart $service
done
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '98.md' style='float:left'>⬆️上一节🔗  </a><a href = '100.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


