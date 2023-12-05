<template><div><h1 id="openim-获取到用户的-token" tabindex="-1"><a class="header-anchor" href="#openim-获取到用户的-token" aria-hidden="true">#</a> OpenIM 获取到用户的 Token</h1>
<p>需要的工具：postman 或其他API测试工具</p>
<p>需要的环境：</p>
<ul>
<li>服务器：openim-server和openim-chat</li>
<li>本地：openim-server和openim-chat</li>
</ul>
<p>如果选择本地部署，可以按照以下步骤进行：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bashCopy codegit clone https://github.com/OpenIMSDK/Open-IM-Server openim-server
cd openim-server
make restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后，启动聊天服务：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>bashCopy codegit clone https://github.com/OpenIMSDK/chat openim-chat
cd openim-chat
make start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p>首先需要注册用户，详细信息可以查看文档：<a href="https://docs.openim.io/restapi/apis/usermanagement/userregister" target="_blank" rel="noopener noreferrer">用户注册文档<ExternalLinkIcon/></a></p>
<h3 id="请求方法" tabindex="-1"><a class="header-anchor" href="#请求方法" aria-hidden="true">#</a> 请求方法</h3>
<ul>
<li><code v-pre>POST</code></li>
</ul>
<h3 id="请求url" tabindex="-1"><a class="header-anchor" href="#请求url" aria-hidden="true">#</a> 请求URL</h3>
<ul>
<li><code v-pre>http://localhost:10002/user/user_register</code></li>
</ul>
<h3 id="请求头" tabindex="-1"><a class="header-anchor" href="#请求头" aria-hidden="true">#</a> 请求头</h3>
<table>
<thead>
<tr>
<th>Header 名称</th>
<th>示例值</th>
<th>是否可选</th>
<th>类型</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>operationID</td>
<td>1646445464564</td>
<td>必填</td>
<td>string</td>
<td>全局链接追踪的操作ID</td>
</tr>
</tbody>
</table>
<h3 id="请求参数示例" tabindex="-1"><a class="header-anchor" href="#请求参数示例" aria-hidden="true">#</a> 请求参数示例</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>jsonCopy code{
  "secret": "openIM123",
  "users": [
    {
      "userID": "11111112",
      "nickname": "yourNickname",
      "faceURL": "yourFaceURL"
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中，需要为用户设置一些信息，如<code v-pre>nickname</code>和<code v-pre>faceURL</code>，但这些信息也可以留空。</p>
<p><code v-pre>secret</code>参数的值根据你的配置来决定，通常是根据<code v-pre>config.yaml</code>文件中的配置而来。</p>
<p><code v-pre>userID</code>需要保存下来，因为后面获取Token会用到。</p>
<h3 id="成功注册返回示例" tabindex="-1"><a class="header-anchor" href="#成功注册返回示例" aria-hidden="true">#</a> 成功注册返回示例</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>jsonCopy code{
  "errCode": 0,
  "errMsg": "",
  "errDlt": ""
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示成功注册，现在可以继续获取Token。</p>
<h2 id="获取-token" tabindex="-1"><a class="header-anchor" href="#获取-token" aria-hidden="true">#</a> 获取 Token</h2>
<h3 id="请求方法-1" tabindex="-1"><a class="header-anchor" href="#请求方法-1" aria-hidden="true">#</a> 请求方法</h3>
<ul>
<li><code v-pre>POST</code></li>
</ul>
<h3 id="请求url-1" tabindex="-1"><a class="header-anchor" href="#请求url-1" aria-hidden="true">#</a> 请求URL</h3>
<ul>
<li><code v-pre>http://localhost:10002/auth/user_token</code></li>
</ul>
<h3 id="请求头-1" tabindex="-1"><a class="header-anchor" href="#请求头-1" aria-hidden="true">#</a> 请求头</h3>
<table>
<thead>
<tr>
<th>Header 名称</th>
<th>示例值</th>
<th>是否可选</th>
<th>类型</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>operationID</td>
<td>1646445464564</td>
<td>必填</td>
<td>string</td>
<td>全局链接追踪的操作ID</td>
</tr>
</tbody>
</table>
<h3 id="请求参数示例-1" tabindex="-1"><a class="header-anchor" href="#请求参数示例-1" aria-hidden="true">#</a> 请求参数示例</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>jsonCopy code{
  "secret": "openIM123",
  "platformID": 1,
  "userID": "11111112"
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>userID</code>需要使用前面注册时得到的<code v-pre>UserID</code>。</p>
<h3 id="成功返回示例" tabindex="-1"><a class="header-anchor" href="#成功返回示例" aria-hidden="true">#</a> 成功返回示例</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>jsonCopy code{
    "errCode": 0,
    "errMsg": "",
    "errDlt": "",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxMTExMTExMiIsIlBsYXRmb3JtSUQiOjEsImV4cCI6MTcwNjU5NTM0MCwibmJmIjoxNjk4ODE5MDQwLCJpYXQiOjE2OTg4MTkzNDB9.YOeKRSwvTF0_yRNB3XwOCIYaTC-swVzxRjnHidUo4xw",
        "expireTimeSeconds": 7776000
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在已经成功注册并获得了Token。</p>
<h2 id="检查用户" tabindex="-1"><a class="header-anchor" href="#检查用户" aria-hidden="true">#</a> 检查用户</h2>
<p>发出POST请求：</p>
<ul>
<li><code v-pre>http://localhost:10002/user/account_check</code></li>
</ul>
<p>请求头：</p>
<table>
<thead>
<tr>
<th>Header 名称</th>
<th>示例值</th>
<th>是否可选</th>
<th>类型</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>operationID</td>
<td>1646445464564</td>
<td>必填</td>
<td>string</td>
<td>全局链接追踪的操作ID</td>
</tr>
<tr>
<td>token</td>
<td>${TOKEN}</td>
<td>必填</td>
<td>string</td>
<td>Admin token</td>
</tr>
</tbody>
</table>
<p><code v-pre>${TOKEN}</code>需要替换为之前获取到的Token：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>jsonCopy code{
  "checkUserIDs": [
    "11111111",
    "11111112"
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，检查用户需要使用管理员token进行操作。可以通过以下方法获取管理员Token：</p>
<ol>
<li>注册：http://localhost:10002/auth/user_token</li>
<li>使用以下参数进行注册：</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>jsonCopy code{
  "secret": "openIM123",
  "platformID": 1,
  "userID": "openIM123456"
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请求地址为<code v-pre>http://localhost:10002/user/account_check</code>，请求体为：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>jsonCopy code{
    "errCode": 0,
    "errMsg": "",
    "errDlt": "",
    "data": {
        "results": [
            {
                "userID": "11111111",
                "accountStatus": "unregistered"
            },
            {
                "userID": "11111112",
                "accountStatus": "registered"
            }
        ]
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="获取用户信息" tabindex="-1"><a class="header-anchor" href="#获取用户信息" aria-hidden="true">#</a> 获取用户信息</h2>
<p>API 地址：<code v-pre>http://localhost:10002/user/get_users</code></p>
<p>请求体：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>jsonCopy code{
  "pagination": {
    "pageNumber": 1,
    "showNumber": 100
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>返回结果示例：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">{</span>
    <span class="token key atrule">"errCode"</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token key atrule">"errMsg"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
    <span class="token key atrule">"errDlt"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
    <span class="token key atrule">"data"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token key atrule">"total"</span><span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
        <span class="token key atrule">"users"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token key atrule">"userID"</span><span class="token punctuation">:</span> <span class="token string">"11111112"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"nickname"</span><span class="token punctuation">:</span> <span class="token string">"yourNickname"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"faceURL"</span><span class="token punctuation">:</span> <span class="token string">"yourFaceURL"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"ex"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                <span class="token key atrule">"createTime"</span><span class="token punctuation">:</span> <span class="token number">1699260936619</span><span class="token punctuation">,</span>
                <span class="token key atrule">"appMangerLevel"</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                <span class="token key atrule">"globalRecvMsgOpt"</span><span class="token punctuation">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token key atrule">"userID"</span><span class="token punctuation">:</span> <span class="token string">"openIM123456"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"nickname"</span><span class="token punctuation">:</span> <span class="token string">"system1"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"faceURL"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                <span class="token key atrule">"ex"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                <span class="token key atrule">"createTime"</span><span class="token punctuation">:</span> <span class="token number">1699241222762</span><span class="token punctuation">,</span>
                <span class="token key atrule">"appMangerLevel"</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
                <span class="token key atrule">"globalRecvMsgOpt"</span><span class="token punctuation">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token key atrule">"userID"</span><span class="token punctuation">:</span> <span class="token string">"openIM654321"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"nickname"</span><span class="token punctuation">:</span> <span class="token string">"system2"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"faceURL"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                <span class="token key atrule">"ex"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                <span class="token key atrule">"createTime"</span><span class="token punctuation">:</span> <span class="token number">1699241222762</span><span class="token punctuation">,</span>
                <span class="token key atrule">"appMangerLevel"</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
                <span class="token key atrule">"globalRecvMsgOpt"</span><span class="token punctuation">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token key atrule">"userID"</span><span class="token punctuation">:</span> <span class="token string">"openIMAdmin"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"nickname"</span><span class="token punctuation">:</span> <span class="token string">"system3"</span><span class="token punctuation">,</span>
                <span class="token key atrule">"faceURL"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                <span class="token key atrule">"ex"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
                <span class="token key atrule">"createTime"</span><span class="token punctuation">:</span> <span class="token number">1699241222762</span><span class="token punctuation">,</span>
                <span class="token key atrule">"appMangerLevel"</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
                <span class="token key atrule">"globalRecvMsgOpt"</span><span class="token punctuation">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


