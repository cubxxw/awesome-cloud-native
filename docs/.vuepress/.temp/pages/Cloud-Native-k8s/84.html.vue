<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第84节-使用docker或docker-compose安装loki" tabindex="-1"><a class="header-anchor" href="#第84节-使用docker或docker-compose安装loki" aria-hidden="true">#</a> 第84节 使用Docker或Docker Compose安装Loki</h1>
<div><a href = '83.md' style='float:left'>⬆️上一节🔗  </a><a href = '85.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="选择" tabindex="-1"><a class="header-anchor" href="#选择" aria-hidden="true">#</a> 选择</h2>
<p>如果您正在评估、测试或开发Loki，则可以使用Docker或Docker Compose安装Loki和Promtail。对于生产环境，我们建议使用Tanka或Helm安装。</p>
<p>使用这些安装说明获得的配置将Loki作为单个二进制文件运行。</p>
<h2 id="prerequisites-先决条件" tabindex="-1"><a class="header-anchor" href="#prerequisites-先决条件" aria-hidden="true">#</a> Prerequisites 先决条件</h2>
<ul>
<li><a href="https://docs.docker.com/install" target="_blank" rel="noopener noreferrer">Docker<ExternalLinkIcon/></a></li>
<li><a href="https://docs.docker.com/compose/install" target="_blank" rel="noopener noreferrer">Docker Compose<ExternalLinkIcon/></a> (optional, only needed for the Docker Compose install method)</li>
</ul>
<h2 id="install-with-docker-compose" tabindex="-1"><a class="header-anchor" href="#install-with-docker-compose" aria-hidden="true">#</a> Install with Docker Compose</h2>
<p>在命令行中运行以下命令。它们适用于Windows或Linux系统。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://raw.githubusercontent.com/grafana/loki/v2.9.1/production/docker-compose.yaml <span class="token parameter variable">-O</span> docker-compose.yaml
<span class="token function">docker-compose</span> <span class="token parameter variable">-f</span> docker-compose.yaml up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>地址是: https://raw.githubusercontent.com/grafana/loki/v2.9.1/production/docker-compose.yaml</p>
<p>Docker  Compose 的内容是：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>version: <span class="token string">"3"</span>

networks:
  loki:

services:
  loki:
    image: grafana/loki:2.9.0
    ports:
      - <span class="token string">"3100:3100"</span>
    command: <span class="token parameter variable">-config.file</span><span class="token operator">=</span>/etc/loki/local-config.yaml
    networks:
      - loki

  promtail:
    image: grafana/promtail:2.9.0
    volumes:
      - /var/log:/var/log
    command: <span class="token parameter variable">-config.file</span><span class="token operator">=</span>/etc/promtail/config.yml
    networks:
      - loki

  grafana:
    environment:
      - <span class="token assign-left variable">GF_PATHS_PROVISIONING</span><span class="token operator">=</span>/etc/grafana/provisioning
      - <span class="token assign-left variable">GF_AUTH_ANONYMOUS_ENABLED</span><span class="token operator">=</span>true
      - <span class="token assign-left variable">GF_AUTH_ANONYMOUS_ORG_ROLE</span><span class="token operator">=</span>Admin
    entrypoint:
      - <span class="token function">sh</span>
      - <span class="token parameter variable">-euc</span>
      - <span class="token operator">|</span>
        <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /etc/grafana/provisioning/datasources
        <span class="token function">cat</span> <span class="token operator">&lt;&lt;</span>EOF <span class="token operator">></span> /etc/grafana/provisioning/datasources/ds.yaml
        apiVersion: <span class="token number">1</span>
        datasources:
        - name: Loki
          type: loki
          access: proxy
          orgId: <span class="token number">1</span>
          url: http://loki:3100
          basicAuth: <span class="token boolean">false</span>
          isDefault: <span class="token boolean">true</span>
          version: <span class="token number">1</span>
          editable: <span class="token boolean">false</span>
        EOF
        /run.sh
    image: grafana/grafana:latest
    ports:
      - <span class="token string">"3000:3000"</span>
    networks:
      - loki
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="node-exporter" tabindex="-1"><a class="header-anchor" href="#node-exporter" aria-hidden="true">#</a> node-exporter</h2>
<p><code v-pre>node-exporter</code> 是一个开源的工具，用于收集与 Linux 系统上的硬件和操作系统的各种指标有关的信息，并使其能够被 Prometheus 服务获取和存储。它是 Prometheus 监控工具链的一部分。</p>
<blockquote>
<p>&quot;exporter&quot; 是一个专门的组件，其主要职责是收集非 Prometheus 系统中的指标并将其转化为 Prometheus 可读的格式。这意味着这些 &quot;exporter&quot; 组件充当了数据来源和 Prometheus 之间的中间层，确保 Prometheus 可以轻松抓取并监控这些数据。</p>
</blockquote>
<p>使用 <code v-pre>node-exporter</code> 可以提供以下等方面的指标：</p>
<ol>
<li><strong>CPU 使用情况</strong>：用户空间、系统、I/O 等待等。</li>
<li><strong>内存使用情况</strong>：使用量、缓存、交换等。</li>
<li><strong>磁盘空间</strong>：每个分区的使用量、总量、可用量等。</li>
<li><strong>I/O</strong>：读写操作、字节等。</li>
<li><strong>网络</strong>：传入/传出数据包、错误等。</li>
<li><strong>文件系统</strong>：i-nodes 使用情况、大小等。</li>
<li><strong>硬件信息</strong>：如 CPU 温度、风扇速度等（取决于系统是否有这些传感器信息）。</li>
<li>其他系统信息，如运行的进程数量、系统负载等。</li>
</ol>
<p>使用 <code v-pre>node-exporter</code>，运维团队和开发团队可以：</p>
<ol>
<li>监控服务器和基础设施的健康情况。</li>
<li>设置警报，当某些指标超出预设范围时自动通知相关人员。</li>
<li>对系统性能进行分析和优化。</li>
<li>了解系统的资源使用情况和趋势，为未来的扩展和升级做准备。</li>
</ol>
<blockquote>
<p>注意，对于 Windows 来说，应该使用 <code v-pre>wmi_exporter</code></p>
</blockquote>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '83.md' style='float:left'>⬆️上一节🔗  </a><a href = '85.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


