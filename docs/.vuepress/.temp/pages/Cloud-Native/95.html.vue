<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第95节-openim-readme-美化" tabindex="-1"><a class="header-anchor" href="#第95节-openim-readme-美化" aria-hidden="true">#</a> 第95节 OpenIM README 美化</h1>
<div><a href = '94.md' style='float:left'>⬆️上一节🔗  </a><a href = '96.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="✨-about-openim" tabindex="-1"><a class="header-anchor" href="#✨-about-openim" aria-hidden="true">#</a> ✨ About OpenIM</h2>
<p>Open-IM-Server is a robust instant messaging server engineered using pure Golang, leveraging JSON over WebSocket for communication. The server treats everything as a message, facilitating straightforward customization without modifying the server code. Its microservice architecture enables deployment using clusters, ensuring high performance and scalability.</p>
<p>Whether you're looking to integrate instant messaging or real-time networking into your applications, Open-IM-Server is your go-to solution! 🚀</p>
<p>It's important to note that Open-IM-Server isn't a standalone product, and it doesn't include account registration and login services. However, we've made your life easier by open-sourcing the <a href="https://github.com/OpenIMSDK/chat" target="_blank" rel="noopener noreferrer">chat repository<ExternalLinkIcon/></a> that includes login and registration features. Deploying the chat business server alongside Open-IM-Server quickly sets up a comprehensive chat product. 👥</p>
<h2 id="why-openim" tabindex="-1"><a class="header-anchor" href="#why-openim" aria-hidden="true">#</a> 🌟 Why OpenIM</h2>
<p><strong>🔍 Function screenshot display</strong></p>
<div align="center">
<table>
<thead>
<tr>
<th style="text-align:center">multiple message</th>
<th style="text-align:center">Efficient meetings</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
<tr>
<td style="text-align:center">One-to-one and group chats</td>
<td style="text-align:center">Special features - Custom messages</td>
</tr>
<tr>
<td style="text-align:center"></td>
<td style="text-align:center"></td>
</tr>
</tbody>
</table>
</div>
<ol>
<li>
<p><strong>Comprehensive Message Type Support 💬</strong>
✅  Supports almost all types of messages, including text, images, emojis, voice, video, geographical location, files, quotes, business cards, system notifications, custom messages and more
✅ Supports one-on-one and multi-person audio and video calls</p>
<p>✅ Provides terminal support for multiple platforms such as iOS, Android, Flutter, uni-app, ReactNative, Electron, Web, H5</p>
</li>
<li>
<p><strong>Efficient Meetings Anytime, Anywhere 🌎</strong></p>
<p>✅ Based on IM (Instant Messaging) with 100% reliable forced signaling capabilities, it paves the way for IM systems, deeply integrated with chat applications</p>
<p>✅ Supports hundreds of people in a single meeting, with subscription numbers reaching thousands, and server-side audio and video recording</p>
</li>
<li>
<p><strong>One-on-one and Group Chats for Various Social Scenarios 👥</strong></p>
<p>✅ OpenIM has four roles: application administrator, group owner, group administrator, and regular member</p>
<p>✅ Powerful group features such as muting, group announcements, group validation, unlimited group members, and loading group messages as needed</p>
</li>
<li>
<p><strong>Unique Features 🌟</strong></p>
<p>✅ Supports read-and-burn private chats, customizable duration</p>
<p>✅ Message editing function broadens social scenarios, making instant communication more diverse and interesting</p>
</li>
<li>
<p><strong>Open Source 👐</strong></p>
<p>✅ The code of OpenIM is open source, self-controlled data, aimed at building a globally leading IM open source community, including client SDK and server</p>
<p>✅ Based on open source Server, many excellent open source projects have been developed, such as <a href="https://github.com/OpenIMSDK/OpenKF" target="_blank" rel="noopener noreferrer">OpenKF<ExternalLinkIcon/></a> (Open source AI customer service system)</p>
</li>
<li>
<p><strong>Easy to Expand 🔧</strong></p>
<p>✅ The OpenIM server is implemented in Golang, introducing an innovative &quot;everything is a message&quot; communication model, simplifying the implementation of custom messages and extended features</p>
</li>
<li>
<p><strong>High Performance 🏎️</strong></p>
<p>✅ OpenIM supports a hierarchical governance architecture in the cluster, tested by a large number of users, and abstracts the storage model of online messages, offline messages, and historical messages</p>
</li>
<li>
<p><strong>Full Platform Support 📺</strong></p>
<p>✅ Supports native iOS, Android; cross-platform Flutter, uni-app, ReactNative; major web front-end frameworks such as React, Vue; applets; and PC platforms supported by Electron</p>
</li>
<li>
<p><strong>The ultimate deployment experience 🤖</strong></p>
<p>✅  Supports cluster deployment</p>
<p>✅  Supports multi-architecture mirroring, our Docker images are hosted not only on GitHub but also on Alibaba Cloud and Docker Hub supporting multiple architectures. Visit <a href="https://github.com/orgs/OpenIMSDK/packages?repo_name=Open-IM-Server" target="_blank" rel="noopener noreferrer">our GitHub packages<ExternalLinkIcon/></a> and read our <a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/version.md" target="_blank" rel="noopener noreferrer">version management document<ExternalLinkIcon/></a> for more information.</p>
</li>
<li>
<p><strong>A large ecosystem of open source communities 🤲</strong></p>
<p>✅  We have tens of thousands of users and many solutions to problems.</p>
<p>✅  We have a large open source community called <a href="https://github.com/OpenIMSDK" target="_blank" rel="noopener noreferrer">OpenIMSDK<ExternalLinkIcon/></a> that runs the core modules, we have an open source community called <a href="https://github.com/openim-sigs" target="_blank" rel="noopener noreferrer">openim-sigs<ExternalLinkIcon/></a> to explore more IM-based infrastructure products.</p>
</li>
</ol>
<h2 id="quick-start" tabindex="-1"><a class="header-anchor" href="#quick-start" aria-hidden="true">#</a> 🚀 Quick Start</h2>
<details>   <summary>Deploying with Docker Compose</summary>
<ol>
<li>Clone the project</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># choose what you need</span>
<span class="token assign-left variable">BRANCH</span><span class="token operator">=</span>release-v3.1
<span class="token function">git</span> clone <span class="token parameter variable">-b</span> <span class="token variable">$BRANCH</span> https://github.com/OpenIMSDK/Open-IM-Server openim <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">export</span> <span class="token assign-left variable">openim</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/openim <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> <span class="token variable">$openim</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>Note</strong></p>
<p>Read our release policy: https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/version.md</p>
</blockquote>
<ol start="2">
<li>Modify .env</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable"><span class="token environment constant">USER</span></span><span class="token operator">=</span>root <span class="token comment">#no need to modify</span>
<span class="token assign-left variable">PASSWORD</span><span class="token operator">=</span>openIM123  <span class="token comment">#A combination of 8 or more numbers and letters, this password applies to redis, mysql, mongo, as well as accessSecret in config/config.yaml</span>
<span class="token assign-left variable">ENDPOINT</span><span class="token operator">=</span>http://127.0.0.1:10005 <span class="token comment">#minio's external service IP and port, or use the domain name storage.xx.xx, the app must be able to access this IP and port or domain,</span>
<span class="token assign-left variable">API_URL</span><span class="token operator">=</span>http://127.0.0.1:10002/object/ <span class="token comment">#the app must be able to access this IP and port or domain,</span>
<span class="token assign-left variable">DATA_DIR</span><span class="token operator">=</span>./  <span class="token comment">#designate large disk directory</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>Deploy and start</li>
</ol>
<blockquote>
<p><strong>Note</strong>
This command can only be executed once. It will modify the component passwords in docker-compose based on the <code v-pre>PASSWORD</code> variable in <code v-pre>.env</code>, and modify the component passwords in <code v-pre>config/config.yaml</code>. If the password in <code v-pre>.env</code> changes, you need to first execute <code v-pre>docker-compose down</code>; <code v-pre>rm components -rf</code> and then execute this command.</p>
</blockquote>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>make install
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="4">
<li>Check the service</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> check
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/images/docker_build.png" alt="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/images/docker_build.png"></p>
</details> 
<details>  <summary>Compile from Source</summary>
<p>Ur need <code v-pre>Go 1.18</code> or higher version, and <code v-pre>make</code>.</p>
<p>Version Details: https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/version.md</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># choose what you need</span>
<span class="token assign-left variable">BRANCH</span><span class="token operator">=</span>release-v3.1
<span class="token function">git</span> clone <span class="token parameter variable">-b</span> <span class="token variable">$BRANCH</span> https://github.com/OpenIMSDK/Open-IM-Server openim <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">export</span> <span class="token assign-left variable">openim</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/openim <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> <span class="token variable">$openim</span> <span class="token operator">&amp;&amp;</span> <span class="token function">make</span> build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Read about the <a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/version.md" target="_blank" rel="noopener noreferrer">OpenIM Version Policy<ExternalLinkIcon/></a></p>
<p><code v-pre>make help</code> to help you see the instructions supported by OpenIM.</p>
<p>All services have been successfully built as shown in the figure</p>
<p><img src="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/images/build.png" alt="Successful Compilation"></p>
</details>
<details>  <summary>Component Configuration Instructions</summary>
<p>The config/config.yaml file has detailed configuration instructions for the storage components.</p>
<ul>
<li>
<p>Zookeeper</p>
<ul>
<li>
<p>Used for RPC service discovery and registration, cluster support.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>zookeeper:
  schema: openim                          <span class="token comment">#Not recommended to modify</span>
  address: <span class="token punctuation">[</span> <span class="token number">127.0</span>.0.1:2181 <span class="token punctuation">]</span>             <span class="token comment">#address</span>
  username:                               <span class="token comment">#username</span>
  password:                               <span class="token comment">#password</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>MySQL</p>
<ul>
<li>
<p>Used for storing users, relationships, and groups, supports master-slave database.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>mysql:
  address: <span class="token punctuation">[</span> <span class="token number">127.0</span>.0.1:13306 <span class="token punctuation">]</span>            <span class="token comment">#address</span>
  username: root                          <span class="token comment">#username</span>
  password: openIM123                     <span class="token comment">#password</span>
  database: openIM_v2                     <span class="token comment">#Not recommended to modify</span>
  maxOpenConn: <span class="token number">1000</span>                       <span class="token comment">#maximum connection</span>
  maxIdleConn: <span class="token number">100</span>                        <span class="token comment">#maximum idle connection</span>
  maxLifeTime: <span class="token number">60</span>                         <span class="token comment">#maximum time a connection can be reused (seconds)</span>
  logLevel: <span class="token number">4</span>                             <span class="token comment">#log level 1=slient 2=error 3=warn 4=info</span>
  slowThreshold: <span class="token number">500</span>                      <span class="token comment">#slow statement threshold (milliseconds)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>Mongo</p>
<ul>
<li>
<p>Used for storing offline messages, supports mongo sharded clusters.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>mongo:
  uri:                                    <span class="token comment">#Use this value directly if not empty</span>
  address: <span class="token punctuation">[</span> <span class="token number">127.0</span>.0.1:37017 <span class="token punctuation">]</span>            <span class="token comment">#address</span>
  database: openIM                        <span class="token comment">#default mongo db</span>
  username: root                          <span class="token comment">#username</span>
  password: openIM123                     <span class="token comment">#password</span>
  maxPoolSize: <span class="token number">100</span>                        <span class="token comment">#maximum connections</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>Redis</p>
<ul>
<li>
<p>Used for storing message sequence numbers, latest messages, user tokens, and mysql cache, supports cluster deployment.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>redis:
  address: <span class="token punctuation">[</span> <span class="token number">127.0</span>.0.1:16379 <span class="token punctuation">]</span>            <span class="token comment">#address</span>
  username:                               <span class="token comment">#username</span>
  password: openIM123                     <span class="token comment">#password</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>Kafka</p>
<ul>
<li>
<p>Used for message queues, for message decoupling, supports cluster deployment.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>kafka:
  username:                               <span class="token comment">#username</span>
  password:                               <span class="token comment">#password</span>
  addr: <span class="token punctuation">[</span> <span class="token number">127.0</span>.0.1:9092 <span class="token punctuation">]</span>                <span class="token comment">#address</span>
  latestMsgToRedis:
    topic: <span class="token string">"latestMsgToRedis"</span>
  offlineMsgToMongo:
    topic: <span class="token string">"offlineMsgToMongoMysql"</span>
  msgToPush:
    topic: <span class="token string">"msqToPush"</span>
  msgToModify:
    topic: <span class="token string">"msgToModify"</span>
  consumerGroupID:
    msgToRedis: redis
    msgToMongo: mongo
    msgToMySql: mysql
    msgToPush: push
    msgToModify: modify
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
</ul>
</details>
<details>  <summary>Start and Stop Services</summary>
<p>Start services</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./scripts/start_all.sh;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Check services</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./scripts/check_all.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Stop services</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./scripts/stop_all.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details> 
<details>  <summary>Open IM Ports</summary>
<table>
<thead>
<tr>
<th>TCP Port</th>
<th>Description</th>
<th>Operation</th>
</tr>
</thead>
<tbody>
<tr>
<td>TCP:10001</td>
<td>ws protocol, message port such as message sending, pushing etc, used for client SDK</td>
<td>Port release or nginx reverse proxy, and firewall off</td>
</tr>
<tr>
<td>TCP:10002</td>
<td>api port, such as user, friend, group, message interfaces.</td>
<td>Port release or nginx reverse proxy, and firewall off</td>
</tr>
<tr>
<td>TCP:10005</td>
<td>Required when choosing minio storage (openIM uses minio storage by default)</td>
<td>Port release or nginx reverse proxy, and firewall off</td>
</tr>
</tbody>
</table>
</details> 
<details>  <summary>Open Chat Ports</summary>
<ul>
<li>chat warehouse: https://github.com/OpenIMSDK/chat</li>
</ul>
<table>
<thead>
<tr>
<th>TCP Port</th>
<th>Description</th>
<th>Operation</th>
</tr>
</thead>
<tbody>
<tr>
<td>TCP:10008</td>
<td>Business system, such as registration, login etc</td>
<td>Port release or nginx reverse proxy, and firewall off</td>
</tr>
<tr>
<td>TCP:10009</td>
<td>Management backend, such as statistics, banning etc</td>
<td>Port release or nginx reverse proxy, and firewall off</td>
</tr>
</tbody>
</table>
</details>
<h2 id="relationship-between-app-and-openim" tabindex="-1"><a class="header-anchor" href="#relationship-between-app-and-openim" aria-hidden="true">#</a> 🔗 Relationship Between APP and OpenIM</h2>
<p>OpenIM isn't just an open-source instant messaging component, it's an integral part of your application ecosystem. Check out this diagram to understand how AppServer, AppClient, Open-IM-Server, and Open-IM-SDK interact.</p>
<p><img src="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/images/open-im-server.png" alt="App-OpenIM Relationship"></p>
<h2 id="overall-architecture" tabindex="-1"><a class="header-anchor" href="#overall-architecture" aria-hidden="true">#</a> 🏗️ Overall Architecture</h2>
<p>Delve into the heart of Open-IM-Server's functionality with our architecture diagram.</p>
<p><img src="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/images/Architecture.jpg" alt="Overall Architecture"></p>
<h2 id="to-start-developing-openim" tabindex="-1"><a class="header-anchor" href="#to-start-developing-openim" aria-hidden="true">#</a> 🛠️ To start developing OpenIM</h2>
<p>OpenIM Our goal is to build a top-level open source community. We have a set of standards, in the <a href="https://github.com/OpenIMSDK/community" target="_blank" rel="noopener noreferrer">Community repository<ExternalLinkIcon/></a>.</p>
<p>If you'd like to contribute to this Open-IM-Server repository, please read our <a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">contributor documentation<ExternalLinkIcon/></a>.</p>
<p>Before you start, please make sure your changes are in demand. The best for that is to create a <a href="https://github.com/OpenIMSDK/Open-IM-Server/discussions/new/choose" target="_blank" rel="noopener noreferrer">new discussion<ExternalLinkIcon/></a> OR <a href="https://join.slack.com/t/openimsdk/shared_invite/zt-1tmoj26uf-_FDy3dowVHBiGvLk9e5Xkg" target="_blank" rel="noopener noreferrer">Slack Communication<ExternalLinkIcon/></a>, or if you find an issue, <a href="https://github.com/OpenIMSDK/Open-IM-Server/issues/new/choose" target="_blank" rel="noopener noreferrer">report it<ExternalLinkIcon/></a> first.</p>
<ul>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/go_code.md" target="_blank" rel="noopener noreferrer">Code Standards<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/images.md" target="_blank" rel="noopener noreferrer">Docker Images Standards<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/directory.md" target="_blank" rel="noopener noreferrer">Directory Standards<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/commit.md" target="_blank" rel="noopener noreferrer">Commit Standards<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/version.md" target="_blank" rel="noopener noreferrer">Versioning Standards<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/api.md" target="_blank" rel="noopener noreferrer">Interface Standards<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/log.md" target="_blank" rel="noopener noreferrer">Log Standards<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/OpenIMSDK/Open-IM-Server/blob/main/docs/conversions/error_code.md" target="_blank" rel="noopener noreferrer">Error Code Standards<ExternalLinkIcon/></a></li>
</ul>
<h2 id="community" tabindex="-1"><a class="header-anchor" href="#community" aria-hidden="true">#</a> 👥 Community</h2>
<ul>
<li>📚 <a href="https://github.com/OpenIMSDK/community" target="_blank" rel="noopener noreferrer">OpenIM Community<ExternalLinkIcon/></a></li>
<li>💕 <a href="https://github.com/Openim-sigs" target="_blank" rel="noopener noreferrer">OpenIM Interest Group<ExternalLinkIcon/></a></li>
<li>🚀 <a href="https://join.slack.com/t/openimsdk/shared_invite/zt-1tmoj26uf-_FDy3dowVHBiGvLk9e5Xkg" target="_blank" rel="noopener noreferrer">Join our Slack community<ExternalLinkIcon/></a></li>
<li>👀 <a href="https://openim-1253691595.cos.ap-nanjing.myqcloud.com/WechatIMG20.jpeg" target="_blank" rel="noopener noreferrer">Join our wechat (微信群)<ExternalLinkIcon/></a></li>
</ul>
<h2 id="community-meetings" tabindex="-1"><a class="header-anchor" href="#community-meetings" aria-hidden="true">#</a> 📆 Community Meetings</h2>
<p>We want anyone to get involved in our community and contributing code, we offer gifts and rewards, and we welcome you to join us every Thursday night.</p>
<p>Our conference is in the <a href="https://join.slack.com/t/openimsdk/shared_invite/zt-1tmoj26uf-_FDy3dowVHBiGvLk9e5Xkg" target="_blank" rel="noopener noreferrer">OpenIM Slack<ExternalLinkIcon/></a> 🎯, then you can search the Open-IM-Server pipeline to join</p>
<p>We take notes of each <a href="https://github.com/orgs/OpenIMSDK/discussions/categories/meeting" target="_blank" rel="noopener noreferrer">biweekly meeting<ExternalLinkIcon/></a> in <a href="https://github.com/OpenIMSDK/Open-IM-Server/discussions/categories/meeting" target="_blank" rel="noopener noreferrer">GitHub discussions<ExternalLinkIcon/></a>, Our historical meeting notes, as well as replays of the meetings are available at <a href="https://docs.google.com/document/d/1nx8MDpuG74NASx081JcCpxPgDITNTpIIos0DS6Vr9GU/edit?usp=sharing" target="_blank" rel="noopener noreferrer">Google Docs 📑<ExternalLinkIcon/></a>.</p>
<h2 id="who-are-using-openim" tabindex="-1"><a class="header-anchor" href="#who-are-using-openim" aria-hidden="true">#</a> 👀 Who are using OpenIM</h2>
<p>Check out our <a href="https://github.com/OpenIMSDK/community/blob/main/ADOPTERS.md" target="_blank" rel="noopener noreferrer">user case studies<ExternalLinkIcon/></a> page for a list of the project users. Don't hesitate to leave a <a href="https://github.com/OpenIMSDK/Open-IM-Server/issues/379" target="_blank" rel="noopener noreferrer">📝comment<ExternalLinkIcon/></a> and share your use case.</p>
<h2 id="license" tabindex="-1"><a class="header-anchor" href="#license" aria-hidden="true">#</a> 📄 License</h2>
<p>OpenIM is licensed under the Apache 2.0 license. See <a href="https://github.com/OpenIMSDK/Open-IM-Server/tree/main/LICENSE" target="_blank" rel="noopener noreferrer">LICENSE<ExternalLinkIcon/></a> for the full license text.</p>
<p>The OpenIM logo, including its variations and animated versions, displayed in this repository <a href="https://github.com/OpenIMSDK/Open-IM-Server" target="_blank" rel="noopener noreferrer">OpenIM<ExternalLinkIcon/></a> under the <a href="./assets/logo">assets/logo</a> and <a href="assets/logo-gif">assets/logo-gif</a> directories, are protected by copyright laws.</p>
<h2 id="🔮-thanks-to-our-contributors" tabindex="-1"><a class="header-anchor" href="#🔮-thanks-to-our-contributors" aria-hidden="true">#</a> 🔮 Thanks to our contributors!</h2>
<a href="https://github.com/OpenIMSDK/Open-IM-Server/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=OpenIMSDK/Open-IM-Server" />
</a>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '94.md' style='float:left'>⬆️上一节🔗  </a><a href = '96.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


