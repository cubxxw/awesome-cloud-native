<template><div><h1 id="_120-openim-deployment-自动化、模板化设计" tabindex="-1"><a class="header-anchor" href="#_120-openim-deployment-自动化、模板化设计" aria-hidden="true">#</a> 120: openim deployment 自动化、模板化设计</h1>
<h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例</h2>
<p>来一个案例快速了解一下模块化设计思路，用一个案例快速学习和了解模板化设计过程，下面是一个 zookeeper 的基础模板配置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">###################### Zookeeper ######################</span>
<span class="token comment"># Zookeeper configuration</span>
<span class="token comment"># It's not recommended to modify the schema</span>
<span class="token comment"># </span>
<span class="token comment"># Zookeeper address</span>
<span class="token comment"># Zookeeper username</span>
<span class="token comment"># Zookeeper password</span>
zookeeper:
  schema: <span class="token variable">${ZOOKEEPER_SCHEMA}</span>
  address: <span class="token punctuation">[</span> <span class="token variable">${ZOOKEEPER_ADDRESS}</span><span class="token builtin class-name">:</span><span class="token variable">${ZOOKEEPER_PORT}</span> <span class="token punctuation">]</span>
  username: <span class="token variable">${ZOOKEEPER_USERNAME}</span>
  password: <span class="token variable">${ZOOKEEPER_PASSWORD}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面是定义的 zookeeper 的基本配置：</p>
<blockquote>
<p>有意思的是，这个配置不仅仅可以通过修改 env 脚本文件来改配置，也可以通过设置环境变量来修改配置，例如：</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">ZOOKEEPER_PORT</span><span class="token operator">=</span><span class="token string">"12182"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>下面是配置文件的一个基础模板：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">###################### Zookeeper 配置信息 ######################</span>
def <span class="token string">"ZOOKEEPER_SCHEMA"</span> <span class="token string">"openim"</span>          <span class="token comment"># Zookeeper的模式</span>
def <span class="token string">"ZOOKEEPER_PORT"</span> <span class="token string">"12181"</span>              <span class="token comment"># Zookeeper的端口</span>
def <span class="token string">"ZOOKEEPER_ADDRESS"</span> <span class="token string">"<span class="token variable">${DOCKER_BRIDGE_GATEWAY}</span>"</span>      <span class="token comment"># Zookeeper的地址</span>
def <span class="token string">"ZOOKEEPER_USERNAME"</span> <span class="token string">""</span>              <span class="token comment"># Zookeeper的用户名</span>
def <span class="token string">"ZOOKEEPER_PASSWORD"</span> <span class="token string">""</span>              <span class="token comment"># Zookeeper的密码</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的配置，可以通过 Makefile 或者脚本一键生成如下的配置，其中命令是 <code v-pre>make init</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">###################### Zookeeper ######################</span>
<span class="token comment"># Zookeeper configuration</span>
<span class="token comment"># It's not recommended to modify the schema</span>
<span class="token comment"># </span>
<span class="token comment"># Zookeeper address</span>
<span class="token comment"># Zookeeper username</span>
<span class="token comment"># Zookeeper password</span>
zookeeper:
  schema: openim
  zkAddr: <span class="token punctuation">[</span> <span class="token number">172.28</span>.0.1:12181 <span class="token punctuation">]</span>
  username: <span class="token string">""</span>
  password: <span class="token string">""</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模板化设计技巧" tabindex="-1"><a class="header-anchor" href="#模板化设计技巧" aria-hidden="true">#</a> 模板化设计技巧</h2>
<p>在 <code v-pre>deployments</code> 目录中，定义了大量的模板，包括 <code v-pre>openim-chat</code> 的模板，以及 <code v-pre>openim-server</code> 的模板，通过这些模板去渲染配置文件，这样可以让配置高度定制化以及自动化。</p>
</div></template>


