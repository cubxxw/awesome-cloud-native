<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第41节-速读-horizon-源码-核心设计思想" tabindex="-1"><a class="header-anchor" href="#第41节-速读-horizon-源码-核心设计思想" aria-hidden="true">#</a> 第41节 速读 horizon 源码，核心设计思想</h1>
<div><a href = '40.md' style='float:left'>⬆️上一节🔗  </a><a href = '42.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p>由于 horzon 项目理解的并没有 sealer、sealos 深入，算是一个从零开始学习的项目。</p>
<p>准备速过一遍 horzon 的源码，以及部分的细节，先看目录结构，分析现在的基本功能，再观察第一个 PR，以及最开始的 <code v-pre>Important issue</code>。</p>
<h2 id="目录结构" tabindex="-1"><a class="header-anchor" href="#目录结构" aria-hidden="true">#</a> 目录结构</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ tree <span class="token parameter variable">-L</span> <span class="token number">2</span>
<span class="token builtin class-name">.</span>
├── CODE-OF-CONDUCT.md
├── CONTRIBUTING.md
├── Horizon.svg
├── LICENSE
├── Makefile
├── README.md
├── README_ZH-CN.md
├── bin
│   └── app
├── build
│   ├── build.sh
│   ├── core
│   └── swagger
├── build-json-schema.json
├── build-ui-schema.json
├── config.yaml
├── core
│   ├── cmd
│   ├── common
│   ├── config
│   ├── controller
│   ├── errors
│   ├── http
│   ├── main.go
│   └── middleware
├── db
│   ├── 20210908_initial_schema.sql
│   ├── <span class="token number">20211124</span>.sql
│   ├── <span class="token number">20211125</span>.sql
│   ├── <span class="token number">20220113</span>.sql
│   ├── <span class="token number">20220124</span>.sql
│   ├── <span class="token number">20220330</span>.sql
│   ├── <span class="token number">20220516</span>.sql
│   ├── <span class="token number">20220519</span>.sql
│   ├── <span class="token number">20220712</span>.sql
│   ├── <span class="token number">20220722</span>.sql
│   ├── <span class="token number">20220816</span>.sql
│   ├── <span class="token number">20220823</span>.sql
│   ├── <span class="token number">20220824</span>.sql
│   ├── <span class="token number">20220908</span>.sql
│   ├── <span class="token number">20220920</span>.sql
│   ├── <span class="token number">20220921</span>.sql
│   ├── <span class="token number">20221031</span>.sql
│   ├── <span class="token number">20221110</span>.sql
│   ├── <span class="token number">20221111</span>.sql
│   ├── <span class="token number">20221117</span>.sql
│   ├── <span class="token number">20221121</span>.sql
│   ├── <span class="token number">20221201</span>.sql
│   ├── <span class="token number">20230302</span>.sql
│   └── migrations
├── go.mod
├── go.sum
├── image
│   └── readme
├── integrationtest
│   └── authpagerender_test.go
├── lib
│   ├── gitlab
│   ├── orm
│   ├── q
│   └── s3
├── mock
│   ├── lib
│   └── pkg
├── openapi
│   ├── v1
│   └── v2
├── pkg
│   ├── accesstoken
│   ├── application
│   ├── applicationregion
│   ├── auth
│   ├── authentication
│   ├── cluster
│   ├── common
│   ├── config
│   ├── context
│   ├── environment
│   ├── environmentregion
│   ├── errors
│   ├── event
│   ├── eventhandler
│   ├── <span class="token function">git</span>
│   ├── grafana
│   ├── group
│   ├── hook
│   ├── horizonapp
│   ├── idp
│   ├── <span class="token function">jobs</span>
│   ├── member
│   ├── oauth
│   ├── param
│   ├── pipelinerun
│   ├── rbac
│   ├── region
│   ├── registry
│   ├── server
│   ├── tag
│   ├── template
│   ├── templaterelease
│   ├── templaterepo
│   ├── templateschematag
│   ├── token
│   ├── user
│   ├── userlink
│   ├── util
│   └── webhook
├── roles.yaml
├── scopes.yaml
└── scripts
    ├── install.sh
    ├── k3s
    └── make-rules
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意 k3s 和 make-rules 还没有合并进去，我们📜 对上面的解释：</p>
<ul>
<li><code v-pre>CODE-OF-CONDUCT.md</code>：行为守则。</li>
<li><code v-pre>CONTRIBUTING.md</code>：贡献指南。</li>
<li><code v-pre>Horizon.svg</code>：项目图标。</li>
<li><code v-pre>LICENSE</code>：开源许可证。</li>
<li><code v-pre>Makefile</code>：构建脚本。</li>
<li><code v-pre>README.md</code>：项目说明文档。</li>
<li><code v-pre>README_ZH-CN.md</code>：中文说明文档。</li>
<li><code v-pre>bin/app</code>：二进制文件。</li>
<li><code v-pre>build/build.sh</code>：构建脚本。</li>
<li><code v-pre>build/core</code>：构建核心。</li>
<li><code v-pre>build/swagger</code>：构建 swagger 文档。</li>
<li><code v-pre>build-json-schema.json</code>：JSON 架构文件。</li>
<li><code v-pre>build-ui-schema.json</code>：UI 架构文件。</li>
<li><code v-pre>config.yaml</code>：配置文件。</li>
<li><code v-pre>core</code>：核心代码。</li>
<li><code v-pre>db</code>：数据库脚本。</li>
<li><code v-pre>go.mod</code> 和 <code v-pre>go.sum</code>：依赖管理文件。</li>
<li><code v-pre>image/readme</code>：镜像说明文档。</li>
<li><code v-pre>integrationtest/authpagerender_test.go</code>：集成测试代码。</li>
<li><code v-pre>lib/gitlab</code>：GitLab 相关代码。</li>
<li><code v-pre>lib/orm</code>：ORM 相关代码。</li>
<li><code v-pre>lib/q</code>：查询相关代码。</li>
<li><code v-pre>lib/s3</code>：S3 相关代码。</li>
<li><code v-pre>mock</code>：模拟代码。</li>
<li><code v-pre>openapi</code>：OpenAPI 相关代码。</li>
<li><code v-pre>pkg</code>：公共包。</li>
<li><code v-pre>roles.yaml</code>：角色配置文件。</li>
<li><code v-pre>scopes.yaml</code>：作用域配置文件。</li>
<li><code v-pre>scripts</code>：脚本文件。</li>
</ul>
<p>Maybe it can be fix：</p>
<ul>
<li><code v-pre>build</code> 迁移到 <code v-pre>scripts</code> 中，Dockerfile 迁移出来</li>
<li><code v-pre>core</code> 目录改成 <code v-pre>internal</code> 目录</li>
</ul>
<h2 id="第一版" tabindex="-1"><a class="header-anchor" href="#第一版" aria-hidden="true">#</a> 第一版</h2>
<p>很可惜的是 <code v-pre>horizon</code> 并没有 <code v-pre>0.1</code> 版本的，而是从 <code v-pre>2.0.1</code> 开始开源的：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>v2.0.1
v2.0.10
v2.0.11
v2.0.12
v2.0.2
v2.0.2-rc1
v2.0.3
v2.0.4
v2.0.5
v2.0.6
v2.0.7
v2.0.8
v2.0.9
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样看着太不友好了，同样对于 <strong>分支的</strong> 设定：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>dependabot<span class="token operator">/</span>go_modules<span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>prometheus<span class="token operator">/</span>client_golang<span class="token operator">-</span><span class="token number">1.11</span><span class="token number">.1</span>
dependabot<span class="token operator">/</span>go_modules<span class="token operator">/</span>golang<span class="token punctuation">.</span>org<span class="token operator">/</span>x<span class="token operator">/</span>net<span class="token operator">-</span><span class="token number">0.7</span><span class="token number">.0</span>
dependabot<span class="token operator">/</span>go_modules<span class="token operator">/</span>helm<span class="token punctuation">.</span>sh<span class="token operator">/</span>helm<span class="token operator">/</span>v3<span class="token operator">-</span><span class="token number">3.11</span><span class="token number">.1</span>
kilosonc<span class="token operator">-</span>patch<span class="token operator">-</span><span class="token number">1</span>
kilosonc<span class="token operator">-</span>patch<span class="token operator">-</span><span class="token number">2</span>
kilosonc<span class="token operator">-</span>patch<span class="token operator">-</span><span class="token number">3</span>
main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>项目中也没用 <code v-pre>CHANGELOG</code> 来描述版本信息的变更，这里可以改变下，好有 CHANGELOG 用来展示每个版本之间的变更内容，作为 Release Note 的一部分。但是，如果每次都要手动编写 CHANGELOG，会很麻烦，也不容易坚持，所以这里我们可以借助<a href="https://github.com/git-chglog/git-chglog" target="_blank" rel="noopener noreferrer">git-chglogopen in new window<ExternalLinkIcon/></a>工具来自动生成。</p>
<p>不仅如此，一个项目也需要有一个版本号，当前用得比较多的是语义化版本号规范。但如果靠开发者手动打版本号，工作效率低不说，经常还会出现漏打、打的版本号不规范等问题。所以最好的办法是，版本号也通过工具自动生成。在这里我们可以采用<a href="https://github.com/arnaud-deprez/gsemver" target="_blank" rel="noopener noreferrer">gsemveropen in new window<ExternalLinkIcon/></a>工具来自动生成版本号。</p>
<p>我们可以将其放入到 <code v-pre>scripts/ensure_tag.sh</code> 脚本中，可以通过 Makefile 和 CI 流程进行调用。</p>
<p>除此之外，对于一个优质的开源项目来说，分为开发阶段和测试解决，这些都是可以用 CICD 流程进行控制的。在开发阶段生成代码、版权检查、代码格式化、静态代码检查、单元测试、构建等操作都是可以应用到 Makefile 和 CICD 流的。</p>
<p>我们 阅读下 horizon 最早的版本（由于并没有对应合适的 branch 和 tag，我们选择 Frist commit）：</p>
<p><img src="http://sm.cubxxw.com/sm202304161046942.png" alt="image-20230416104617735"></p>
<p>第一个版本的提交是对 openAPI 的规范</p>
<blockquote>
<p>OpenAPI 是一种规范，用于定义 RESTful API，它基于 JSON 或 YAML 格式，用于描述 API 的输入参数、输出结果等详细信息，以便于生成客户端 SDK 和 API 文档。在 Horizon 项目中，openapi 文件夹存放着 OpenAPI 相关的代码。</p>
</blockquote>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">openapi</span><span class="token punctuation">:</span> 3.0.0
<span class="token key atrule">info</span><span class="token punctuation">:</span>
  <span class="token key atrule">title</span><span class="token punctuation">:</span> Horizon Group API
  <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    This API</span>
  <span class="token key atrule">version</span><span class="token punctuation">:</span> 1.0.0
<span class="token key atrule">tags</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> group
<span class="token key atrule">paths</span><span class="token punctuation">:</span>
  <span class="token key atrule">/groups</span><span class="token punctuation">:</span>
    <span class="token key atrule">get</span><span class="token punctuation">:</span>
      <span class="token key atrule">operationId</span><span class="token punctuation">:</span> listGroups
      <span class="token key atrule">summary</span><span class="token punctuation">:</span> list groups
      <span class="token key atrule">parameters</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">"#/components/parameters/searchParam"</span>
      <span class="token key atrule">responses</span><span class="token punctuation">:</span>
        <span class="token key atrule">"201"</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> null response
        <span class="token key atrule">default</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> Unexpected error
          <span class="token key atrule">content</span><span class="token punctuation">:</span>
            <span class="token key atrule">application/json</span><span class="token punctuation">:</span>
              <span class="token key atrule">schema</span><span class="token punctuation">:</span>
                <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">"#/components/schemas/error"</span>
  <span class="token key atrule">/group</span><span class="token punctuation">:</span>
    <span class="token key atrule">post</span><span class="token punctuation">:</span>
      <span class="token key atrule">operationId</span><span class="token punctuation">:</span> createGroup
      <span class="token key atrule">summary</span><span class="token punctuation">:</span> create a group
      <span class="token key atrule">requestBody</span><span class="token punctuation">:</span>
        <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">content</span><span class="token punctuation">:</span>
          <span class="token key atrule">application/json</span><span class="token punctuation">:</span>
            <span class="token key atrule">schema</span><span class="token punctuation">:</span>
              <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">"#/components/schemas/newGroup"</span>
      <span class="token key atrule">responses</span><span class="token punctuation">:</span>
        <span class="token key atrule">"201"</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> null response
        <span class="token key atrule">default</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> Unexpected error
          <span class="token key atrule">content</span><span class="token punctuation">:</span>
            <span class="token key atrule">application/json</span><span class="token punctuation">:</span>
              <span class="token key atrule">schema</span><span class="token punctuation">:</span>
                <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">"#/components/schemas/error"</span>
  /group/<span class="token punctuation">{</span>group<span class="token punctuation">}</span><span class="token punctuation">:</span>
    <span class="token key atrule">parameters</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">"#/components/parameters/groupParam"</span>
    <span class="token key atrule">get</span><span class="token punctuation">:</span>
      <span class="token key atrule">operationId</span><span class="token punctuation">:</span> getGroupDetail
      <span class="token key atrule">summary</span><span class="token punctuation">:</span> get the detail of a group
      <span class="token key atrule">responses</span><span class="token punctuation">:</span>
        <span class="token key atrule">'200'</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> Expected response to a valid request
          <span class="token key atrule">content</span><span class="token punctuation">:</span>
            <span class="token key atrule">application/json</span><span class="token punctuation">:</span>
              <span class="token key atrule">schema</span><span class="token punctuation">:</span>
                <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">"#/components/schemas/groupDetail"</span>
        <span class="token key atrule">default</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> Unexpected error
          <span class="token key atrule">content</span><span class="token punctuation">:</span>
            <span class="token key atrule">application/json</span><span class="token punctuation">:</span>
              <span class="token key atrule">schema</span><span class="token punctuation">:</span>
                <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">"#/components/schemas/error"</span>
    <span class="token key atrule">put</span><span class="token punctuation">:</span>
      <span class="token key atrule">operationId</span><span class="token punctuation">:</span> updateGroupDetail
      <span class="token key atrule">summary</span><span class="token punctuation">:</span> update detail of a group
      <span class="token key atrule">requestBody</span><span class="token punctuation">:</span>
        <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
        <span class="token key atrule">content</span><span class="token punctuation">:</span>
          <span class="token key atrule">application/json</span><span class="token punctuation">:</span>
            <span class="token key atrule">schema</span><span class="token punctuation">:</span>
              <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/groupDetail'</span>
      <span class="token key atrule">responses</span><span class="token punctuation">:</span>
        <span class="token key atrule">'200'</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> Update result
          <span class="token key atrule">content</span><span class="token punctuation">:</span>
            <span class="token key atrule">application/json</span><span class="token punctuation">:</span>
              <span class="token key atrule">schema</span><span class="token punctuation">:</span>
                <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/groupDetail'</span>
        <span class="token key atrule">default</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span>  Unexpected error
          <span class="token key atrule">content</span><span class="token punctuation">:</span>
            <span class="token key atrule">application/json</span><span class="token punctuation">:</span>
              <span class="token key atrule">schema</span><span class="token punctuation">:</span>
                <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/error'</span>
    <span class="token key atrule">delete</span><span class="token punctuation">:</span>
      <span class="token key atrule">operationId</span><span class="token punctuation">:</span> deleteGroup
      <span class="token key atrule">summary</span><span class="token punctuation">:</span> delete an empty group
      <span class="token key atrule">responses</span><span class="token punctuation">:</span>
        <span class="token key atrule">'200'</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> null response
        <span class="token key atrule">default</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span>  Unexpected error
          <span class="token key atrule">content</span><span class="token punctuation">:</span>
            <span class="token key atrule">application/json</span><span class="token punctuation">:</span>
              <span class="token key atrule">schema</span><span class="token punctuation">:</span>
                <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/error'</span>
  /group/<span class="token punctuation">{</span>group<span class="token punctuation">}</span>/subgroups<span class="token punctuation">:</span>
    <span class="token key atrule">parameters</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">"#/components/parameters/groupParam"</span>
      <span class="token punctuation">-</span> <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">"#/components/parameters/searchParam"</span>
    <span class="token key atrule">get</span><span class="token punctuation">:</span>
      <span class="token key atrule">operationId</span><span class="token punctuation">:</span> listSubGroups
      <span class="token key atrule">responses</span><span class="token punctuation">:</span>
        <span class="token key atrule">'200'</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> Return the list of groups
          <span class="token key atrule">content</span><span class="token punctuation">:</span>
            <span class="token key atrule">application/json</span><span class="token punctuation">:</span>
              <span class="token key atrule">schema</span><span class="token punctuation">:</span>
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/groupDetail'</span>
  /group/<span class="token punctuation">{</span>group<span class="token punctuation">}</span>/services<span class="token punctuation">:</span>
    <span class="token key atrule">parameters</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">"#/components/parameters/groupParam"</span>
      <span class="token punctuation">-</span> <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">"#/components/parameters/searchParam"</span>
    <span class="token key atrule">get</span><span class="token punctuation">:</span>
      <span class="token key atrule">operationId</span><span class="token punctuation">:</span> listGroupService
      <span class="token key atrule">responses</span><span class="token punctuation">:</span>
        <span class="token key atrule">'200'</span><span class="token punctuation">:</span>
          <span class="token key atrule">description</span><span class="token punctuation">:</span> Return the list of service
          <span class="token key atrule">content</span><span class="token punctuation">:</span>
            <span class="token key atrule">application/json</span><span class="token punctuation">:</span>
              <span class="token key atrule">schema</span><span class="token punctuation">:</span>
                <span class="token key atrule">type</span><span class="token punctuation">:</span> array
                <span class="token key atrule">items</span><span class="token punctuation">:</span>
                  <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'service.yaml#/components/schemas/serviceDetail'</span>
<span class="token key atrule">components</span><span class="token punctuation">:</span>
  <span class="token key atrule">parameters</span><span class="token punctuation">:</span>
    <span class="token key atrule">groupParam</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> group
      <span class="token key atrule">in</span><span class="token punctuation">:</span> path
      <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
      <span class="token key atrule">schema</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
    <span class="token key atrule">searchParam</span><span class="token punctuation">:</span>
      <span class="token key atrule">name</span><span class="token punctuation">:</span> search
      <span class="token key atrule">in</span><span class="token punctuation">:</span> query
      <span class="token key atrule">description</span><span class="token punctuation">:</span> Return the list of authorized groups matching the search criteria
      <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
      <span class="token key atrule">schema</span><span class="token punctuation">:</span>
        <span class="token key atrule">type</span><span class="token punctuation">:</span> string
  <span class="token key atrule">schemas</span><span class="token punctuation">:</span>
    <span class="token key atrule">queryGroup</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
      <span class="token key atrule">maxLength</span><span class="token punctuation">:</span> <span class="token number">100</span>
      <span class="token key atrule">description</span><span class="token punctuation">:</span> param for querying group
    <span class="token key atrule">newGroup</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> object
      <span class="token key atrule">required</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> name
        <span class="token punctuation">-</span> path
        <span class="token punctuation">-</span> visibilityLevel
      <span class="token key atrule">properties</span><span class="token punctuation">:</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span>
          <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/groupName'</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span>
          <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/groupPath'</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span>
          <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/groupDescription'</span>
        <span class="token key atrule">visibilityLevel</span><span class="token punctuation">:</span>
          <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/visibilityLevel'</span>
        <span class="token key atrule">parantId</span><span class="token punctuation">:</span>
          <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/groupId'</span>

    <span class="token key atrule">groupDetail</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> object
      <span class="token key atrule">properties</span><span class="token punctuation">:</span>
        <span class="token key atrule">id</span><span class="token punctuation">:</span>
          <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/groupId'</span>
        <span class="token key atrule">name</span><span class="token punctuation">:</span>
          <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/groupName'</span>
        <span class="token key atrule">path</span><span class="token punctuation">:</span>
          <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/groupPath'</span>
        <span class="token key atrule">description</span><span class="token punctuation">:</span>
          <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/groupDescription'</span>
        <span class="token key atrule">visibilityLevel</span><span class="token punctuation">:</span>
          <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/visibilityLevel'</span>
        <span class="token key atrule">createTime</span><span class="token punctuation">:</span>
          <span class="token key atrule">$ref</span><span class="token punctuation">:</span> <span class="token string">'#/components/schemas/date'</span>
    <span class="token key atrule">date</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
      <span class="token key atrule">format</span><span class="token punctuation">:</span> date
      <span class="token key atrule">pattern</span><span class="token punctuation">:</span> full<span class="token punctuation">-</span>date
    <span class="token key atrule">groupId</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
      <span class="token key atrule">format</span><span class="token punctuation">:</span> int64
      <span class="token key atrule">description</span><span class="token punctuation">:</span> the parent id of the subgroup<span class="token punctuation">,</span>if not provided. a root group
    <span class="token key atrule">groupName</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
      <span class="token key atrule">maxLength</span><span class="token punctuation">:</span> <span class="token number">64</span>
      <span class="token key atrule">description</span><span class="token punctuation">:</span> the group Name
    <span class="token key atrule">groupPath</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
      <span class="token key atrule">maxLength</span><span class="token punctuation">:</span> <span class="token number">1024</span>
      <span class="token key atrule">description</span><span class="token punctuation">:</span> the group path
    <span class="token key atrule">visibilityLevel</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
      <span class="token key atrule">format</span><span class="token punctuation">:</span> int32
      <span class="token key atrule">enum</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span>
      <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token number">0</span>
      <span class="token key atrule">description</span><span class="token punctuation">:</span> 0 means public(every one can see the group)<span class="token punctuation">,</span> 1 means private one member can see
    <span class="token key atrule">groupDescription</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> string
      <span class="token key atrule">maxLength</span><span class="token punctuation">:</span> <span class="token number">1024</span>
      <span class="token key atrule">description</span><span class="token punctuation">:</span> the group description
    <span class="token key atrule">error</span><span class="token punctuation">:</span>
      <span class="token key atrule">type</span><span class="token punctuation">:</span> object
      <span class="token key atrule">required</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> code
        <span class="token punctuation">-</span> message
      <span class="token key atrule">properties</span><span class="token punctuation">:</span>
        <span class="token key atrule">code</span><span class="token punctuation">:</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> integer
          <span class="token key atrule">format</span><span class="token punctuation">:</span> int32
        <span class="token key atrule">message</span><span class="token punctuation">:</span>
          <span class="token key atrule">type</span><span class="token punctuation">:</span> string

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Swagger 和 OpenAPI 的区别：</strong></p>
<ul>
<li><a href="https://k8s-iam.cubxxw.com/iam/projects/10.html#%E5%BC%80%E5%A7%8B" target="_blank" rel="noopener noreferrer">文章<ExternalLinkIcon/></a></li>
</ul>
<p>优化： 用 <a href="https://github.com/go-swagger/go-swagger" target="_blank" rel="noopener noreferrer">go-swagger<ExternalLinkIcon/></a> 来生成 Swagger API 文档</p>
<p>为什么不用 swag？</p>
<ul>
<li><strong>go-swagger 比 swag 功能更强大：</strong> go-swagger 提供了更灵活、更多的功能来描述我们的 API。</li>
<li><strong>使我们的代码更易读</strong>：如果使用 swag，我们每一个 API 都需要有一个冗长的注释，有时候代码注释比代码还要长，但是通过 go-swagger 我们可以将代码和注释分开编写，一方面可以使我们的代码保持简洁，清晰易读，另一方面我们可以在另外一个包中，统一管理这些 Swagger API 文档定义。</li>
<li><strong>更好的社区支持</strong>：go-swagger 目前有非常多的 Github star 数，出现 Bug 的概率很小，并且处在一个频繁更新的活跃状态。</li>
</ul>
<h2 id="nocalhost" tabindex="-1"><a class="header-anchor" href="#nocalhost" aria-hidden="true">#</a> nocalhost</h2>
<ul>
<li><a href="https://nocalhost.dev/zh-CN/docs/quick-start/" target="_blank" rel="noopener noreferrer">快速上手<ExternalLinkIcon/></a></li>
</ul>
<p><code v-pre>nocalhost</code> 是一种基于 Kubernetes 的本地开发平台，它可以帮助开发者在本地快速构建和测试应用程序。使用 <code v-pre>nocalhost</code>，你可以轻松地在本地运行完整的 Kubernetes 环境，并在其中部署和测试应用程序。以下是 <code v-pre>nocalhost</code> 的主要功能：</p>
<ul>
<li>通过 <code v-pre>nocalhost</code>，你可以在本地启动一个完整的 Kubernetes 环境，包括所有必要的组件和插件。</li>
<li><code v-pre>nocalhost</code> 支持各种不同类型的应用程序，包括 Java、Node.js、Python 等。</li>
<li>你可以使用 <code v-pre>nocalhost</code> 在本地构建和运行应用程序，以便于开发和测试。</li>
<li><code v-pre>nocalhost</code> 还提供了一些有用的工具和插件，例如调试器、日志查看器、数据库管理器等。</li>
<li><code v-pre>nocalhost</code> 还提供了完整的文档和教程，以便于开发者快速上手。</li>
</ul>
<h2 id="main-入口" tabindex="-1"><a class="header-anchor" href="#main-入口" aria-hidden="true">#</a> main 入口</h2>
<p>从 main.go 函数开始阅读：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	cmd<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span>cmd<span class="token punctuation">.</span><span class="token function">ParseFlags</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从 Run 函数开始实现逻辑：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Run runs the agent.</span>
<span class="token keyword">func</span> <span class="token function">Run</span><span class="token punctuation">(</span>flags <span class="token operator">*</span>Flags<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	ctx<span class="token punctuation">,</span> cancelFunc <span class="token operator">:=</span> context<span class="token punctuation">.</span><span class="token function">WithCancel</span><span class="token punctuation">(</span>context<span class="token punctuation">.</span><span class="token function">Background</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token function">setTasksBeforeExit</span><span class="token punctuation">(</span>cancelFunc<span class="token punctuation">)</span>
	configs<span class="token punctuation">,</span> err <span class="token operator">:=</span> <span class="token function">LoadConfig</span><span class="token punctuation">(</span>flags<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
	<span class="token comment">// enable pprof</span>
	<span class="token function">runPProfServer</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>configs<span class="token punctuation">.</span>PProf<span class="token punctuation">)</span>
	<span class="token comment">// init api</span>
	<span class="token function">Init</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> flags<span class="token punctuation">,</span> configs<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Run 函数实现的逻辑很简单：</p>
<ul>
<li>接受一个 <code v-pre>flags</code> 参数，它包含了代理运行的一些配置信息。</li>
<li>创建了一个上下文（<code v-pre>ctx</code>）和一个取消函数（<code v-pre>cancelFunc</code>）。这些变量用于在代理运行过程中控制程序的行为。</li>
<li>调用了 <code v-pre>LoadConfig</code> 函数，该函数用于加载代理的配置信息。如果代理配置信息加载失败，则会抛出一个异常。</li>
<li>调用了 <code v-pre>runPProfServer</code> 函数，该函数用于启动 <code v-pre>pprof</code> 服务器，以便于进行性能调试和优化。</li>
<li>最后，<code v-pre>Run</code> 函数调用了 <code v-pre>Init</code> 函数，该函数用于初始化代理并启动 API 服务。</li>
</ul>
<p>查看 <code v-pre>Init()</code> 函数的实现逻辑：</p>
<blockquote>
<p>初始化逻辑有些复杂，实现的部分应该尽可能的放在 <code v-pre>pkg</code> 或者 <code v-pre>internal</code> 目录下面。</p>
</blockquote>
<p>大致的步骤如下：</p>
<ol>
<li>初始化群组服务、管理器</li>
<li>初始化集群服务、用户服务、令牌服务、Grafana 服务等</li>
<li>创建一个参数对象，该对象包含了所有服务和服务所需的参数</li>
<li>初始化控制器，例如成员控制器、应用程序控制器、环境模板控制器等</li>
<li>初始化 API，包括 v1 API 和 v2 API，并将它们注册到路由中</li>
<li>启动云事件服务器，以便在云中处理事件</li>
<li>启动 API 服务器并监听端口</li>
</ol>
<p>使用 gorm 作为回调函数：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">RegisterCustomCallbacks</span><span class="token punctuation">(</span>db <span class="token operator">*</span>gorm<span class="token punctuation">.</span>DB<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token boolean">_</span> <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span><span class="token string">"gorm:before_create"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Before</span><span class="token punctuation">(</span><span class="token string">"gorm:create"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
		<span class="token function">Register</span><span class="token punctuation">(</span><span class="token string">"add_created_by"</span><span class="token punctuation">,</span> addCreatedByUpdatedByForCreateCallback<span class="token punctuation">)</span>

	<span class="token boolean">_</span> <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Update</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span><span class="token string">"gorm:before_update"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Before</span><span class="token punctuation">(</span><span class="token string">"gorm:update"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
		<span class="token function">Register</span><span class="token punctuation">(</span><span class="token string">"add_updated_by"</span><span class="token punctuation">,</span> addUpdatedByForUpdateDeleteCallback<span class="token punctuation">)</span>

	<span class="token boolean">_</span> <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">After</span><span class="token punctuation">(</span><span class="token string">"gorm:before_delete"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Before</span><span class="token punctuation">(</span><span class="token string">"gorm:delete"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>
		<span class="token function">Register</span><span class="token punctuation">(</span><span class="token string">"add_updated_by"</span><span class="token punctuation">,</span> addUpdatedByForUpdateDeleteCallback<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要是在执行数据库操作前后执行一些自定义的逻辑。它包含了三个回调函数：<code v-pre>Create</code>、<code v-pre>Update</code> 和 <code v-pre>Delete</code>。每个回调函数都在 GORM 的某个操作之前或之后被调用，并在回调函数中执行一些自定义的逻辑。例如，回调函数 &quot;add_created_by&quot; 和 &quot;add_updated_by&quot; 用于在创建或更新数据时添加一个 &quot;created_by&quot; 或 &quot;updated_by&quot; 字段，用于记录数据的创建或更新者。其中，<code v-pre>addCreatedByUpdatedByForCreateCallback</code> 和 <code v-pre>addUpdatedByForUpdateDeleteCallback</code> 是两个自定义函数，它们分别用于创建和更新/删除操作中的回调逻辑。该函数还包括了一些 GORM 的回调注册逻辑，用于将自定义的回调函数注册到 GORM 中，以便在执行数据库操作时自动调用这些回调函数。</p>
<h2 id="dao" tabindex="-1"><a class="header-anchor" href="#dao" aria-hidden="true">#</a> dao</h2>
<p>和 Java 的风格类似， horizon 中有很多都是 dao 目录，dao目录是一种常见的命名规范，代表数据访问对象（Data Access Object）。它通常用于存储与数据库交互的代码和相关逻辑。DAO模式分离了业务逻辑和数据访问逻辑，使得代码更易于维护和扩展。</p>
<p>在 horizon 中，dao目录通常包含一些文件，如dao.go等，其中包含与数据库交互的方法和函数。这些方法和函数可以在其他代码中被引用，用于数据的读取、写入和更新等操作。</p>
<p>这样可以保持代码的清晰，逻辑明确。</p>
<p>dao 的设计如下，我们以其中的 <code v-pre>registry</code> 目录为例：</p>
<p>包含了接口作为抽象层，供外部调用：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> DAO <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token comment">// Create a registry</span>
	<span class="token function">Create</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> registry <span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token comment">// UpdateByID update a registry</span>
	<span class="token function">UpdateByID</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">uint</span><span class="token punctuation">,</span> registry <span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token comment">// DeleteByID delete a registry by id</span>
	<span class="token function">DeleteByID</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token comment">// GetByID get by id</span>
	<span class="token function">GetByID</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token comment">// ListAll list all registries</span>
	<span class="token function">ListAll</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>DAO 接口中的 <code v-pre>Create</code>、<code v-pre>UpdateByID</code>、<code v-pre>DeleteByID</code>、<code v-pre>GetByID</code> 和 ListAll 方法都是对 registry 表进行了不同的操作。Create 方法是用来创建一个新的 registry，UpdateByID 方法是用来更新 registry 表中指定 ID 的记录，DeleteByID 方法是用来删除 registry 表中指定 ID 的记录，GetByID 方法是用来获取 registry 表中指定 ID 的记录，而 ListAll 方法是用来获取 registry 表中所有记录的列表。</p>
<p>DAO 接口定义了对 registry 表的增删改查操作，而 dao 结构体实现了这些接口。它都使用了 GORM 库来操作数据库:</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> dao <span class="token keyword">struct</span><span class="token punctuation">{</span> db <span class="token operator">*</span>gorm<span class="token punctuation">.</span>DB <span class="token punctuation">}</span>
<span class="token comment">// NewDAO returns an instance of the default DAO</span>
<span class="token keyword">func</span> <span class="token function">NewDAO</span><span class="token punctuation">(</span>db <span class="token operator">*</span>gorm<span class="token punctuation">.</span>DB<span class="token punctuation">)</span> DAO <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>dao<span class="token punctuation">{</span>db<span class="token punctuation">:</span> db<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还有一个 <code v-pre>NewDAO</code> 函数，返回的是一个接口，因为 DAO 将数据层面和业务层面剥开了。</p>
<p>需要 <code v-pre>NewDAO</code> 函数的原因是因为 DAO 接口和 dao 结构体是分离的。DAO 接口只定义了对 <code v-pre>registry</code> 表的增删改查操作，而 dao 结构体实现了这些操作。为了方便使用 DAO 接口，我们需要一个函数来创建 dao 结构体的实例，这个实例可以被用来调用 DAO 接口中定义的方法。</p>
<p>在 GORM 中，我们需要使用一个数据库连接来进行操作。因此，NewDAO 函数需要一个 GORM 数据库连接作为参数。这个数据库连接可以通过 GORM 库的 Open 函数来创建，然后再传递给 NewDAO 函数。这样就可以创建一个 dao 结构体的实例，用来对数据库中的 registry 表进行 <code v-pre>CURD</code> 操作了。</p>
<h2 id="manager" tabindex="-1"><a class="header-anchor" href="#manager" aria-hidden="true">#</a> manager</h2>
<p>我一直很好奇为什么我们有了 <code v-pre>dao</code> 还需要 <code v-pre>manager</code> ， 这里使用了 DAO 设计模式和依赖注入（DI）设计模式。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> manager

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"context"</span>

	<span class="token string">"github.com/horizoncd/horizon/pkg/registry/dao"</span>
	<span class="token string">"github.com/horizoncd/horizon/pkg/registry/models"</span>
	<span class="token string">"gorm.io/gorm"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Manager <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token comment">// Create a registry</span>
	<span class="token function">Create</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> registry <span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token comment">// UpdateByID update a registry</span>
	<span class="token function">UpdateByID</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">uint</span><span class="token punctuation">,</span> registry <span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token comment">// DeleteByID delete a registry by id</span>
	<span class="token function">DeleteByID</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
	<span class="token comment">// GetByID get by id</span>
	<span class="token function">GetByID</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token comment">// ListAll list all registries</span>
	<span class="token function">ListAll</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> manager <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	registryDAO dao<span class="token punctuation">.</span>DAO
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">New</span><span class="token punctuation">(</span>db <span class="token operator">*</span>gorm<span class="token punctuation">.</span>DB<span class="token punctuation">)</span> Manager <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>manager<span class="token punctuation">{</span>
		registryDAO<span class="token punctuation">:</span> dao<span class="token punctuation">.</span><span class="token function">NewDAO</span><span class="token punctuation">(</span>db<span class="token punctuation">)</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m manager<span class="token punctuation">)</span> <span class="token function">Create</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> registry <span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">uint</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> m<span class="token punctuation">.</span>registryDAO<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> registry<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m manager<span class="token punctuation">)</span> <span class="token function">GetByID</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> m<span class="token punctuation">.</span>registryDAO<span class="token punctuation">.</span><span class="token function">GetByID</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> id<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m manager<span class="token punctuation">)</span> <span class="token function">ListAll</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> m<span class="token punctuation">.</span>registryDAO<span class="token punctuation">.</span><span class="token function">ListAll</span><span class="token punctuation">(</span>ctx<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m manager<span class="token punctuation">)</span> <span class="token function">UpdateByID</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">uint</span><span class="token punctuation">,</span> registry <span class="token operator">*</span>models<span class="token punctuation">.</span>Registry<span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> m<span class="token punctuation">.</span>registryDAO<span class="token punctuation">.</span><span class="token function">UpdateByID</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> id<span class="token punctuation">,</span> registry<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>m manager<span class="token punctuation">)</span> <span class="token function">DeleteByID</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> id <span class="token builtin">uint</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> m<span class="token punctuation">.</span>registryDAO<span class="token punctuation">.</span><span class="token function">DeleteByID</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> id<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>manager 目录实现了 Manager 接口。Manager 接口是对 <code v-pre>DAO</code> 接口的进一步封装，提供了更高层次的抽象。它定义了对 registry 表的增删改查操作，这些操作是通过 DAO 接口来实现的。</p>
<p>它对 DAO 接口进行了进一步的封装，提供了更高层次的抽象。这样就可以将 DAO 接口与具体的实现分离，使代码更加清晰易懂。</p>
<p>当然，在这里 horizon 实现的功能就是这么一些，除此之外，它还可以对 DAO 接口中的方法进行统一处理，例如进行错误处理和日志记录。这样就可以提高代码的可维护性和可读性。</p>
<h2 id="models" tabindex="-1"><a class="header-anchor" href="#models" aria-hidden="true">#</a> models</h2>
<p>models 包定义了与 registry 表相关的数据结构。它包含了一个名为 Registry 的结构体，用来表示 registry 表中的一条记录。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> models

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"github.com/horizoncd/horizon/pkg/server/global"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Registry <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	global<span class="token punctuation">.</span>Model

	Name   <span class="token builtin">string</span>
	Server <span class="token builtin">string</span>
	Path   <span class="token builtin">string</span>
	Token  <span class="token builtin">string</span>
	<span class="token comment">// for delete</span>
	InsecureSkipTLSVerify <span class="token builtin">bool</span> <span class="token string">`gorm:"column:insecure_skip_tls_verify"`</span>
	Kind                  <span class="token builtin">string</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>Registry</code> 结构体的字段与 <code v-pre>registry</code> 表中的字段一一对应。它包含了 ID、Name、Server、Path、Token、InsecureSkipTLSVerify 和 Kind 七个字段。</p>
<ul>
<li>ID：registry 记录的唯一标识符。</li>
<li>CreatedAt：registry 记录的创建时间。</li>
<li>UpdatedAt：registry 记录的更新时间。</li>
<li>DeletedAt：registry 记录的删除时间。</li>
<li>Name：registry 的名称。</li>
<li>Server：registry 的服务器地址。</li>
<li>Path：registry 的地址路径。</li>
<li>Token：registry 的访问令牌。</li>
<li>InsecureSkipTLSVerify：是否忽略 TLS 验证。</li>
<li>Kind：registry 的类型。</li>
</ul>
<p>Registry 结构体还定义了 TableName 方法，用来指定该结构体对应的表名。</p>
<p>Registry 结构体中的这些字段都是通过 GORM 库的 tags 来映射到数据库中的表和列的。例如，ID 字段映射到了 registry 表中的 id 列，Name 字段映射到了 registry 表中的 name 列。</p>
<p>该 models 包的作用是定义了与 registry 表相关的数据结构，用于在 DAO 和 manager 中进行数据的传递和操作。</p>
<h2 id="设计思想" tabindex="-1"><a class="header-anchor" href="#设计思想" aria-hidden="true">#</a> 设计思想</h2>
<p>和 registry 目录类似，我们使用更加强大的 user 目录分析：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>❯ tree user
user
├── dao
│   └── dao<span class="token punctuation">.</span><span class="token keyword">go</span>
├── manager
│   ├── manager<span class="token punctuation">.</span><span class="token keyword">go</span>
│   └── manager_test<span class="token punctuation">.</span><span class="token keyword">go</span>
├── models
│   └── user<span class="token punctuation">.</span><span class="token keyword">go</span>
├── service
│   ├── service<span class="token punctuation">.</span><span class="token keyword">go</span>
│   └── service_test<span class="token punctuation">.</span><span class="token keyword">go</span>
└── util
    └── session<span class="token punctuation">.</span><span class="token keyword">go</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="dao-1" tabindex="-1"><a class="header-anchor" href="#dao-1" aria-hidden="true">#</a> dao</h3>
<p>dao 目录中包含了与用户信息相关的数据访问对象（Data Access Object）。它定义了一个 DAO 接口，用于对 user 表进行增删改查操作。dao 目录的主要作用是封装了对数据库的访问，使得业务逻辑和数据访问逻辑分离开来。</p>
<h3 id="manager-1" tabindex="-1"><a class="header-anchor" href="#manager-1" aria-hidden="true">#</a> manager</h3>
<p>manager 目录中包含了与用户信息相关的业务逻辑。它定义了一个 Manager 接口，用于对 user 表进行增删改查操作。manager 目录的主要作用是将 DAO 接口进一步封装，提供了更高层次的抽象。</p>
<h3 id="models-1" tabindex="-1"><a class="header-anchor" href="#models-1" aria-hidden="true">#</a> models</h3>
<p>models 目录中定义了与用户信息相关的数据结构。它包含了一个名为 User 的结构体，用来表示 user 表中的一条记录。User 结构体的字段与 user 表中的字段一一对应。它还定义了 TableName 方法，用来指定该结构体对应的表名。</p>
<h3 id="service" tabindex="-1"><a class="header-anchor" href="#service" aria-hidden="true">#</a> service</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Service <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token comment">// CheckUsersExists check users all exists, if true, return nil</span>
	<span class="token function">CheckUsersExists</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> emails <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">error</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> service <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	userManager usermanager<span class="token punctuation">.</span>Manager
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>service 目录中包含了与用户信息相关的服务。它定义了一个 Service 接口，用于对 user 表进行增删改查操作。service 目录的主要作用是将业务逻辑(manager) 进一步封装，提供了更高层次的抽象。</p>
<h3 id="util" tabindex="-1"><a class="header-anchor" href="#util" aria-hidden="true">#</a> util</h3>
<p>util 目录中包含了与用户信息相关的工具函数。它定义了一个名为 Session 的结构体，用于表示用户的会话信息。Session 结构体的字段包括了用户的 ID、登录时间和过期时间等信息。它还包含了一些方法，用于生成和验证会话信息。util 目录的主要作用是封装了与会话相关的操作。</p>
<p><strong>设计模式的设计思路和方法</strong>：</p>
<p>DAO 设计模式是一种用于将数据访问逻辑与业务逻辑分离的设计模式。它的主要思想是将数据访问逻辑封装到一个单独的类或接口中，并由一个或多个业务逻辑组件使用它。在这个案例中，dao 包定义了 DAO 接口和 dao 结构体，它们分别用于定义和实现对 registry 表的增删改查操作。Manager 接口和 manager 结构体是 DAO 接口的高层次封装，它们进一步将数据访问逻辑和业务逻辑分离开来。这样就可以使代码更加清晰易懂，并且方便维护和扩展。</p>
<p>依赖注入（DI）设计模式是一种用于解耦组件之间依赖关系的设计模式。它的主要思想是将一个组件所依赖的其他组件通过构造函数、方法参数或属性注入的方式来实现。在这个案例中，NewDAO 函数使用了 GORM 数据库连接作为参数，然后将这个参数传递给 dao.NewDAO 函数来创建 dao 结构体的实例。这样就可以将数据库连接与 dao 结构体解耦开来，使代码更加灵活和可扩展。</p>
<h2 id="rbac-目录" tabindex="-1"><a class="header-anchor" href="#rbac-目录" aria-hidden="true">#</a> rbac 目录</h2>
<p>作为一个访问控制颗粒度仅仅次于  ABAC 的 RBAC，我们看一下它的源码：</p>
<p>目录结构：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>├── rbac
│   ├── auth.go
│   ├── auth_test.go
│   ├── role
│   │   ├── roles.go
│   │   └── roles_test.go
│   └── types
│       ├── eveluation_helpers.go
│       ├── types.go
│       └── types_test.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>📜 对上面的解释：</p>
<h2 id="roles" tabindex="-1"><a class="header-anchor" href="#roles" aria-hidden="true">#</a> roles</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> CompResult <span class="token builtin">uint8</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	RoleEqual CompResult <span class="token operator">=</span> <span class="token boolean">iota</span>
	RoleBigger
	RoleSmaller
	RoleCanNotCompare
<span class="token punctuation">)</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	PE         <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"pe"</span>
	Owner      <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"owner"</span>
	Maintainer <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"maintainer"</span>
	Guest      <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"guest"</span>
<span class="token punctuation">)</span>

<span class="token keyword">var</span> <span class="token punctuation">(</span>
	ErrorRoleNotFound   <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"role not found"</span><span class="token punctuation">)</span>
	ErrorLoadCheckError <span class="token operator">=</span> errors<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span><span class="token string">"load check error"</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Service <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token comment">// ListRole Lists all the role</span>
	<span class="token function">ListRole</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span>types<span class="token punctuation">.</span>Role<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token comment">// GetRole get role by the role name</span>
	<span class="token function">GetRole</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> roleName <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token operator">*</span>types<span class="token punctuation">.</span>Role<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token comment">// RoleCompare compare if the role1's permission is higher than role2</span>
	<span class="token function">RoleCompare</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> role1<span class="token punctuation">,</span> role2 <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>CompResult<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
	<span class="token comment">// GetDefaultRole return the default role(no default role will return nil)</span>
	<span class="token function">GetDefaultRole</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">)</span> <span class="token operator">*</span>types<span class="token punctuation">.</span>Role
<span class="token punctuation">}</span>

<span class="token keyword">type</span> roleRankMapItem <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	rank <span class="token builtin">int</span>
	role types<span class="token punctuation">.</span>Role
<span class="token punctuation">}</span>
<span class="token keyword">type</span> fileRoleService <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	RolePriorityRankDesc <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span>
	DefaultRoleName      <span class="token builtin">string</span>
	Roles                <span class="token punctuation">[</span><span class="token punctuation">]</span>types<span class="token punctuation">.</span>Role
	DefaultRole          <span class="token operator">*</span>types<span class="token punctuation">.</span>Role
	roleRankMap          <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>roleRankMapItem
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="roles-1" tabindex="-1"><a class="header-anchor" href="#roles-1" aria-hidden="true">#</a> roles</h3>
<p><code v-pre>roles.go</code> 文件定义了 <code v-pre>Service</code> 接口及其默认实现 <code v-pre>fileRoleService</code>，这是一个基于文件的角色服务，它从 JSON 文件中读取角色信息。</p>
<p><code v-pre>Service</code> 接口定义了以下方法：</p>
<ul>
<li><code v-pre>ListRole</code>：列出所有角色。</li>
<li><code v-pre>GetRole</code>：根据角色名称获取角色信息。</li>
<li><code v-pre>RoleCompare</code>：比较两个角色的优先级。</li>
<li><code v-pre>GetDefaultRole</code>：获取默认角色。</li>
</ul>
<p><code v-pre>fileRoleService</code> 结构体实现了 <code v-pre>Service</code> 接口 ~</p>
<ul>
<li><code v-pre>RolePriorityRankDesc</code>：表示角色优先级的字符串切片。</li>
<li><code v-pre>DefaultRoleName</code>：表示默认角色的名称。</li>
<li><code v-pre>Roles</code>：表示所有角色的 <code v-pre>[]Role</code> 类型的切片。</li>
<li><code v-pre>DefaultRole</code>：表示默认角色的 <code v-pre>Role</code> 类型。</li>
</ul>
<p>这个结构体还包含一个私有字段 <code v-pre>roleRankMap</code>，用于缓存角色的优先级信息。</p>
<p><code v-pre>Roles</code> 字段中存储了所有角色的信息，每个角色都是一个 <code v-pre>Role</code> 结构体，包含角色名称、描述和权限规则。其中 <code v-pre>PolicyRules</code> 字段是一个 <code v-pre>[]PolicyRule</code> 类型的切片，表示该角色的所有权限规则。</p>
<p><code v-pre>GetRole</code> 方法根据角色名称获取角色信息。如果指定名称的角色不存在，则返回错误 <code v-pre>ErrorRoleNotFound</code>。</p>
<p><code v-pre>RoleCompare</code> 方法比较两个角色的优先级。如果角色 <code v-pre>role1</code> 的权限优先级高于 <code v-pre>role2</code>，则返回结果 <code v-pre>RoleBigger</code>；如果 <code v-pre>role1</code> 的权限优先级低于 <code v-pre>role2</code>，则返回结果 <code v-pre>RoleSmaller</code>。如果两个角色的权限优先级相等，则返回结果 <code v-pre>RoleEqual</code>。如果其中一个角色不存在，则返回错误 <code v-pre>ErrorRoleNotFound</code>。</p>
<p><code v-pre>GetDefaultRole</code> 方法返回默认角色。如果没有默认角色，则返回 <code v-pre>nil</code>。</p>
<h3 id="auth" tabindex="-1"><a class="header-anchor" href="#auth" aria-hidden="true">#</a> auth</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token comment">// Authorizer use the basic rbac rules to check if the user</span>
<span class="token comment">// have the permissions</span>
<span class="token keyword">type</span> Authorizer <span class="token keyword">interface</span> <span class="token punctuation">{</span>
	<span class="token function">Authorize</span><span class="token punctuation">(</span>ctx context<span class="token punctuation">.</span>Context<span class="token punctuation">,</span> attributes auth<span class="token punctuation">.</span>Attributes<span class="token punctuation">)</span> <span class="token punctuation">(</span>auth<span class="token punctuation">.</span>Decision<span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> VisitorFunc <span class="token keyword">func</span><span class="token punctuation">(</span>fmt<span class="token punctuation">.</span>Stringer<span class="token punctuation">,</span> <span class="token operator">*</span>types<span class="token punctuation">.</span>PolicyRule<span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token builtin">bool</span>

<span class="token keyword">func</span> <span class="token function">NewAuthorizer</span><span class="token punctuation">(</span>roleservice role<span class="token punctuation">.</span>Service<span class="token punctuation">,</span> memberservice memberservice<span class="token punctuation">.</span>Service<span class="token punctuation">)</span> Authorizer <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>authorizer<span class="token punctuation">{</span>
		roleService<span class="token punctuation">:</span>   roleservice<span class="token punctuation">,</span>
		memberService<span class="token punctuation">:</span> memberservice<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">type</span> authorizer <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	roleService   role<span class="token punctuation">.</span>Service
	memberService memberservice<span class="token punctuation">.</span>Service
<span class="token punctuation">}</span>

<span class="token keyword">const</span> <span class="token punctuation">(</span>
	NotChecked        <span class="token operator">=</span> <span class="token string">"not checked"</span>
	ResourceFormatErr <span class="token operator">=</span> <span class="token string">"format error"</span>
	AnonymousUser     <span class="token operator">=</span> <span class="token string">"anonymous user"</span>
	InternalError     <span class="token operator">=</span> <span class="token string">"internal error"</span>
	MemberNotExist    <span class="token operator">=</span> <span class="token string">"member not exist"</span>
	RoleNotExist      <span class="token operator">=</span> <span class="token string">"role not exist"</span>
	AdminAllow        <span class="token operator">=</span> <span class="token string">"admin allows everything"</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>auth</code> 包定义了用于身份验证和访问控制的代码。在这个包中，<code v-pre>auth.go</code> 文件定义了 <code v-pre>Authorizer</code> 接口及其默认实现 <code v-pre>authorizer</code>，用于检查用户是否具有操作资源的权限。</p>
<p><strong><code v-pre>Authorizer</code> 接口：</strong></p>
<p><code v-pre>Authorizer</code> 接口定义了一个 <code v-pre>Authorize</code> 方法，用于检查用户是否具有操作资源的权限。该方法接受一个 <code v-pre>auth.Attributes</code> 类型的参数，该参数包含用户的身份信息（如用户名、角色等）以及资源信息（如资源名称、操作方式等）。该方法返回一个 <code v-pre>auth.Decision</code> 类型的决策结果、一个字符串类型的消息以及一个 <code v-pre>error</code> 类型的错误。其中 <code v-pre>auth.Decision</code> 类型表示决策的结果，可以是 <code v-pre>auth.Allow</code>、<code v-pre>auth.Deny</code> 或 <code v-pre>auth.Abstain</code>。</p>
<p><strong><code v-pre>authorizer</code> 结构体：</strong></p>
<p><code v-pre>authorizer</code> 结构体实现了 <code v-pre>Authorizer</code> 接口，它的字段包括 <code v-pre>roleService</code> 和 <code v-pre>memberService</code>。其中 <code v-pre>roleService</code> 是一个 <code v-pre>role.Service</code> 类型的接口，用于获取角色信息，<code v-pre>memberService</code> 是一个 <code v-pre>memberservice.Service</code> 类型的接口，用于获取用户信息。</p>
<p><code v-pre>authorizer</code> 结构体还包含一些常量，如 <code v-pre>NotChecked</code>、<code v-pre>ResourceFormatErr</code>、<code v-pre>AnonymousUser</code>、<code v-pre>InternalError</code>、<code v-pre>MemberNotExist</code> 和 <code v-pre>RoleNotExist</code>，分别表示未检查、资源格式错误、匿名用户、内部错误、用户不存在和角色不存在。</p>
<p><code v-pre>authorizer</code> 结构体实现了 <code v-pre>Authorize</code> 方法，该方法首先检查资源格式是否正确，然后获取用户和角色信息，最后根据角色和权限规则判断用户是否具有操作资源的权限。</p>
<h3 id="types-包详解" tabindex="-1"><a class="header-anchor" href="#types-包详解" aria-hidden="true">#</a> <code v-pre>types</code> 包详解</h3>
<p><code v-pre>types</code> 包定义了与角色和权限相关的数据类型。在这个包中，<code v-pre>types.go</code> 文件定义了 <code v-pre>Role</code> 和 <code v-pre>PolicyRule</code> 结构体。</p>
<p><strong><code v-pre>Role</code> 结构体：</strong></p>
<p><code v-pre>Role</code> 结构体表示一个角色，包含角色的名称、描述和权限规则。定义如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> Role <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Name        <span class="token builtin">string</span>       <span class="token string">`yaml:"name" json:"name"`</span>
    Desc        <span class="token builtin">string</span>       <span class="token string">`yaml:"desc" json:"desc"`</span>
    PolicyRules <span class="token punctuation">[</span><span class="token punctuation">]</span>PolicyRule <span class="token string">`yaml:"rules" json:"rules"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>Name</code> 字段表示角色名称，<code v-pre>Desc</code> 字段表示角色描述，<code v-pre>PolicyRules</code> 字段是一个 <code v-pre>[]PolicyRule</code> 类型的切片，表示该角色的所有权限规则。</p>
<p><strong><code v-pre>PolicyRule</code> 结构体：</strong></p>
<p><code v-pre>PolicyRule</code> 结构体表示一个权限规则，包含权限的访问方式、资源、操作范围等信息。定义如下：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">type</span> PolicyRule <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Verbs           <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`yaml:"verbs" json:"verbs"`</span>
    APIGroups       <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`yaml:"apiGroups" json:"apiGroups"`</span>
    Resources       <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`yaml:"resources" json:"resources"`</span>
    Scopes          <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`yaml:"scopes" json:"scopes"`</span>
    NonResourceURLs <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span> <span class="token string">`yaml:"nonResourceURLs" json:"nonResourceURLs"`</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>Verbs</code> 字段是一个字符串切片，表示权限的访问方式（例如 get、list、create、update 等），<code v-pre>APIGroups</code> 字段是一个字符串切片，表示资源所属的 API 组，<code v-pre>Resources</code> 字段是一个字符串切片，表示资源名称，<code v-pre>Scopes</code> 字段是一个字符串切片，表示操作的范围（例如 namespace 等），<code v-pre>NonResourceURLs</code> 字段是一个字符串切片，表示非资源 URL。</p>
<p>在 <code v-pre>types.go</code> 文件中还定义了一些常量：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">const</span> <span class="token punctuation">(</span>
    APIGroupAll    <span class="token operator">=</span> <span class="token string">"*"</span>
    ResourceAll    <span class="token operator">=</span> <span class="token string">"*"</span>
    VerbAll        <span class="token operator">=</span> <span class="token string">"*"</span>
    ScopeAll       <span class="token operator">=</span> <span class="token string">"*"</span>
    NonResourceAll <span class="token operator">=</span> <span class="token string">"*"</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中 <code v-pre>APIGroupAll</code>、<code v-pre>ResourceAll</code>、<code v-pre>VerbAll</code>、<code v-pre>ScopeAll</code>、<code v-pre>NonResourceAll</code> 分别表示所有 API 组、所有资源、所有访问方式、所有操作范围、所有非资源 URL。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '40.md' style='float:left'>⬆️上一节🔗  </a><a href = '42.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
<ul>
<li>
<p><RouterLink to="/">Ⓜ️回到目录🏠</RouterLink></p>
</li>
<li>
<p><a href="https://cubxxw.com/archives/contributors" target="_blank" rel="noopener noreferrer"><strong>🫵参与贡献💞❤️‍🔥💖</strong><ExternalLinkIcon/></a>)</p>
</li>
<li>
<p>✴️版权声明 © ：本书所有内容遵循<a href="http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC" target="_blank" rel="noopener noreferrer">CC-BY-SA 3.0协议（署名-相同方式共享）©<ExternalLinkIcon/></a></p>
</li>
</ul>
</div></template>


