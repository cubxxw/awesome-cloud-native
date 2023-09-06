<template><div><h1 id="_127-标准化-openim-go-dev-替换-zookeeper-注册中心" tabindex="-1"><a class="header-anchor" href="#_127-标准化-openim-go-dev-替换-zookeeper-注册中心" aria-hidden="true">#</a> 127: 标准化 openim go dev，替换 zookeeper 注册中心</h1>
<h1 id="standardize-openim-go-dev" tabindex="-1"><a class="header-anchor" href="#standardize-openim-go-dev" aria-hidden="true">#</a> Standardize openim go dev</h1>
<p>I've been using the Go module from <code v-pre>github.com/OpenIMSDK/Open-IM-Server</code>. I've noticed that, as the module has reached version v3.3.0, according to the Go module's versioning semantics, it should have a <code v-pre>/v3</code> suffix in the import path for the module to be correctly recognized. This is essential for tools like <code v-pre>pkg.go.dev</code> to map to the correct version number.</p>
<p>Currently, the package at <code v-pre>https://pkg.go.dev/github.com/OpenIMSDK/Open-IM-Server</code> isn't recognizing the version correctly due to this missing suffix.</p>
<p>To resolve this, I propose a two-step solution:</p>
<ol>
<li>Add the <code v-pre>/v3</code> suffix to your module path. This will ensure that the Go toolchain and other related tools understand and recognize the correct version of your module.</li>
<li>I'd like to suggest considering changing the URL to a more succinct and potentially branded version: From: <code v-pre>github.com/OpenIMSDK/Open-IM-Server</code> To: <code v-pre>openim.cc/open-im-server</code></li>
</ol>
<p>By adopting the above changes, the final Go import path would look something like this: <code v-pre>openim.cc/open-im-server/v3</code>.</p>
<p>I believe these changes will not only enhance the recognition of the correct version but also provide a cleaner and more streamlined module path for developers.</p>
<h2 id="replace-zookeeper-dependency-in-docker-compose-for-modern-kafka" tabindex="-1"><a class="header-anchor" href="#replace-zookeeper-dependency-in-docker-compose-for-modern-kafka" aria-hidden="true">#</a> Replace Zookeeper Dependency in Docker Compose for Modern Kafka</h2>
<p>We have recently upgraded to Kafka version 3.5.1 in our Docker Compose setup. Notably, recent versions of Kafka no longer have a dependency on Zookeeper. However, our current Docker Compose file still contains configurations for Zookeeper.</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>  <span class="token key atrule">zookeeper</span><span class="token punctuation">:</span>
   <span class="token key atrule">image</span><span class="token punctuation">:</span> bitnami/zookeeper<span class="token punctuation">:</span><span class="token number">3.8</span>
   <span class="token key atrule">container_name</span><span class="token punctuation">:</span> zookeeper
   <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">"${ZOOKEEPER_PORT}:2181"</span>
   <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
     <span class="token punctuation">-</span> <span class="token string">"/etc/localtime:/etc/localtime"</span>
   <span class="token key atrule">environment</span><span class="token punctuation">:</span>
     <span class="token punctuation">-</span> ALLOW_ANONYMOUS_LOGIN=yes
     <span class="token punctuation">-</span> TZ="Asia/Shanghai"
   <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
   <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token key atrule">server</span><span class="token punctuation">:</span>
        <span class="token key atrule">ipv4_address</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>ZOOKEEPER_NETWORK_ADDRESS<span class="token punctuation">}</span>

  <span class="token key atrule">kafka</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">'bitnami/kafka:3.5.1'</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> kafka
    <span class="token key atrule">user</span><span class="token punctuation">:</span> root
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">"${KAFKA_PORT}:9094"</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./scripts/create_topic.sh<span class="token punctuation">:</span>/opt/bitnami/kafka/create_topic.sh
      <span class="token punctuation">-</span> $<span class="token punctuation">{</span>DATA_DIR<span class="token punctuation">}</span>/components/kafka<span class="token punctuation">:</span>/bitnami/kafka
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">></span><span class="token scalar string">
      bash -c "
      /opt/bitnami/scripts/kafka/run.sh &amp; sleep 5; /opt/bitnami/kafka/create_topic.sh; wait
      "</span>
    <span class="token key atrule">extra_hosts</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"host.docker.internal:host-gateway"</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
       <span class="token punctuation">-</span> TZ=Asia/Shanghai
       <span class="token punctuation">-</span> KAFKA_CFG_NODE_ID=0
       <span class="token punctuation">-</span> KAFKA_CFG_PROCESS_ROLES=controller<span class="token punctuation">,</span>broker
       <span class="token punctuation">-</span> KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=0@&lt;your_host<span class="token punctuation">></span><span class="token punctuation">:</span><span class="token number">9093</span>
       <span class="token punctuation">-</span> KAFKA_CFG_LISTENERS=PLAINTEXT<span class="token punctuation">:</span>//<span class="token punctuation">:</span><span class="token number">9092</span><span class="token punctuation">,</span>CONTROLLER<span class="token punctuation">:</span>//<span class="token punctuation">:</span><span class="token number">9093</span><span class="token punctuation">,</span>EXTERNAL<span class="token punctuation">:</span>//<span class="token punctuation">:</span><span class="token number">9094</span>
       <span class="token punctuation">-</span> KAFKA_CFG_ADVERTISED_LISTENERS=PLAINTEXT<span class="token punctuation">:</span>//kafka<span class="token punctuation">:</span><span class="token number">9092</span><span class="token punctuation">,</span>EXTERNAL<span class="token punctuation">:</span>//$<span class="token punctuation">{</span>DOCKER_BRIDGE_GATEWAY<span class="token punctuation">}</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>KAFKA_PORT<span class="token punctuation">}</span>
       <span class="token punctuation">-</span> KAFKA_CFG_LISTENER_SECURITY_PROTOCOL_MAP=CONTROLLER<span class="token punctuation">:</span>PLAINTEXT<span class="token punctuation">,</span>EXTERNAL<span class="token punctuation">:</span>PLAINTEXT<span class="token punctuation">,</span>PLAINTEXT<span class="token punctuation">:</span>PLAINTEXT
       <span class="token punctuation">-</span> KAFKA_CFG_CONTROLLER_LISTENER_NAMES=CONTROLLER
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token key atrule">server</span><span class="token punctuation">:</span>
        <span class="token key atrule">ipv4_address</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>KAFKA_NETWORK_ADDRESS<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Given this change, we should consider replacing Zookeeper to modernize our Kafka setup and possibly reduce resource overhead. One known alternative is Kraft. However, we are open to suggestions on other alternatives.</p>
<p><strong>Requirements</strong>:</p>
<ol>
<li>Identify potential alternatives to Zookeeper for Kafka.</li>
<li>Compare the pros and cons of each alternative.</li>
<li>Update Docker Compose file to reflect the new setup.</li>
</ol>
<p><strong>Potential Alternatives</strong>:</p>
<ol>
<li><strong>Kraft</strong>:
<ul>
<li>Pros:
<ul>
<li>Native to Kafka: Simplifies Kafka setup and reduces external dependencies.</li>
<li>Improved stability and fewer moving parts.</li>
</ul>
</li>
<li>Cons:
<ul>
<li>Might require some changes to our current scripts and configuration.</li>
<li>Need to validate its stability and performance in our specific use case.</li>
</ul>
</li>
</ul>
</li>
</ol>
<p><strong>table：</strong></p>
<table>
<thead>
<tr>
<th>Features</th>
<th>Nacos</th>
<th>Eureka</th>
<th>Consul</th>
<th>CoreDNS</th>
<th>Zookeeper</th>
</tr>
</thead>
<tbody>
<tr>
<td>Consistency Protocol</td>
<td>CP+AP</td>
<td>AP</td>
<td>CP</td>
<td>—</td>
<td>CP</td>
</tr>
<tr>
<td>Health Check</td>
<td>TCP/HTTP/MYSQL/Client Beat</td>
<td>Client Beat</td>
<td>TCP/HTTP/gRPC/Cmd</td>
<td>—</td>
<td>Keep Alive</td>
</tr>
<tr>
<td>Load Balancing Strategy</td>
<td>Weight/metadata/Selector</td>
<td>Ribbon</td>
<td>Fabio</td>
<td>RoundRobin</td>
<td>—</td>
</tr>
<tr>
<td>Avalanche Protection</td>
<td>Yes</td>
<td>Yes</td>
<td>No</td>
<td>No</td>
<td>No</td>
</tr>
<tr>
<td>Auto Deregister</td>
<td>Supported</td>
<td>Supported</td>
<td>Supported</td>
<td>Not Supported</td>
<td>Supported</td>
</tr>
<tr>
<td>Protocol</td>
<td>HTTP/DNS</td>
<td>HTTP</td>
<td>HTTP/DNS</td>
<td>DNS</td>
<td>TCP</td>
</tr>
<tr>
<td>Listeners Support</td>
<td>Supported</td>
<td>Supported</td>
<td>Supported</td>
<td>Not Supported</td>
<td>Supported</td>
</tr>
<tr>
<td>Multi-datacenter</td>
<td>Supported</td>
<td>Supported</td>
<td>Supported</td>
<td>Not Supported</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Cross Registry Sync</td>
<td>Supported</td>
<td>Not Supported</td>
<td>Supported</td>
<td>Not Supported</td>
<td>Not Supported</td>
</tr>
<tr>
<td>SpringCloud Integration</td>
<td>Supported</td>
<td>Supported</td>
<td>Supported</td>
<td>Not Supported</td>
<td>Supported</td>
</tr>
<tr>
<td>Dubbo Integration</td>
<td>Supported</td>
<td>Not Supported</td>
<td>Supported</td>
<td>Not Supported</td>
<td>Supported</td>
</tr>
<tr>
<td>K8S Integration</td>
<td>Supported</td>
<td>Not Supported</td>
<td>Supported</td>
<td>Supported</td>
<td>Not Supported</td>
</tr>
<tr>
<td>Programming Language</td>
<td>Java</td>
<td>Java</td>
<td>Go</td>
<td>Go</td>
<td>Java</td>
</tr>
<tr>
<td>Data Storage Backend</td>
<td>MySQL</td>
<td>In-memory</td>
<td>LevelDB</td>
<td>—</td>
<td>File System</td>
</tr>
</tbody>
</table>
<blockquote>
<p>中文:</p>
<table>
<thead>
<tr>
<th>功能特性</th>
<th>Nacos</th>
<th>Eureka</th>
<th>Consul</th>
<th>CoreDNS</th>
<th>Zookeeper</th>
</tr>
</thead>
<tbody>
<tr>
<td>一致性协议</td>
<td>CP+AP</td>
<td>AP</td>
<td>CP</td>
<td>—</td>
<td>CP</td>
</tr>
<tr>
<td>健康检查</td>
<td>TCP/HTTP/MYSQL/Client Beat</td>
<td>Client Beat</td>
<td>TCP/HTTP/gRPC/Cmd</td>
<td>—</td>
<td>Keep Alive</td>
</tr>
<tr>
<td>负载均衡策略</td>
<td>权重/metadata/Selector</td>
<td>Ribbon</td>
<td>Fabio</td>
<td>RoundRobin</td>
<td>—</td>
</tr>
<tr>
<td>雪崩保护</td>
<td>有</td>
<td>有</td>
<td>无</td>
<td>无</td>
<td>无</td>
</tr>
<tr>
<td>自动注销实例</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
<td>不支持</td>
<td>支持</td>
</tr>
<tr>
<td>访问协议</td>
<td>HTTP/DNS</td>
<td>HTTP</td>
<td>HTTP/DNS</td>
<td>DNS</td>
<td>TCP</td>
</tr>
<tr>
<td>监听支持</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
<td>不支持</td>
<td>支持</td>
</tr>
<tr>
<td>多数据中心</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
<td>不支持</td>
<td>不支持</td>
</tr>
<tr>
<td>跨注册中心同步</td>
<td>支持</td>
<td>不支持</td>
<td>支持</td>
<td>不支持</td>
<td>不支持</td>
</tr>
<tr>
<td>SpringCloud集成</td>
<td>支持</td>
<td>支持</td>
<td>支持</td>
<td>不支持</td>
<td>支持</td>
</tr>
<tr>
<td>Dubbo集成</td>
<td>支持</td>
<td>不支持</td>
<td>支持</td>
<td>不支持</td>
<td>支持</td>
</tr>
<tr>
<td>K8S集成</td>
<td>支持</td>
<td>不支持</td>
<td>支持</td>
<td>支持</td>
<td>不支持</td>
</tr>
<tr>
<td>编程语言</td>
<td>Java</td>
<td>Java</td>
<td>Go</td>
<td>Go</td>
<td>Java</td>
</tr>
<tr>
<td>数据存储后端</td>
<td>MySQL</td>
<td>内存</td>
<td>LevelDB</td>
<td>—</td>
<td>文件系统</td>
</tr>
</tbody>
</table>
<p><strong>Note:</strong></p>
<ul>
<li>&quot;一致性协议&quot; is translated to &quot;Consistency Protocol&quot;.</li>
<li>&quot;健康检查&quot; is translated to &quot;Health Check&quot;.</li>
<li>&quot;负载均衡策略&quot; is translated to &quot;Load Balancing Strategy&quot;.</li>
<li>&quot;雪崩保护&quot; is translated to &quot;Avalanche Protection&quot;.</li>
<li>&quot;自动注销实例&quot; is translated to &quot;Auto Deregister&quot;.</li>
<li>&quot;访问协议&quot; is translated to &quot;Protocol&quot;.</li>
<li>&quot;监听支持&quot; is translated to &quot;Listeners Support&quot;.</li>
<li>&quot;多数据中心&quot; is translated to &quot;Multi-datacenter&quot;.</li>
<li>&quot;跨注册中心同步&quot; is translated to &quot;Cross Registry Sync&quot;.</li>
<li>&quot;SpringCloud集成&quot; is translated to &quot;SpringCloud Integration&quot;.</li>
<li>&quot;Dubbo集成&quot; is translated to &quot;Dubbo Integration&quot;.</li>
<li>&quot;K8S集成&quot; is translated to &quot;K8S Integration&quot;.</li>
</ul>
</blockquote>
<p><strong>Action items</strong>:</p>
<ol>
<li>Conduct a feasibility study on the proposed alternatives.</li>
<li>Test the selected alternative in a sandbox environment.</li>
<li>Update Docker Compose and related configurations.</li>
<li>Document the changes and migration steps.</li>
</ol>
</div></template>


