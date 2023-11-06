<template><div><h1 id="openim-获取到用户的-token" tabindex="-1"><a class="header-anchor" href="#openim-获取到用户的-token" aria-hidden="true">#</a> OpenIM 获取到用户的 Token</h1>
<p>需要的工具： postman 等等</p>
<p>需要的环境：</p>
<ul>
<li>服务器：openim-server and openim-chat</li>
<li>本地：openim-server and openim-chat</li>
</ul>
<p>我选择本地，使用本地部署：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>git clone https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>OpenIMSDK<span class="token operator">/</span>Open<span class="token operator">-</span>IM<span class="token operator">-</span>Server openim<span class="token operator">-</span>server
cd openim<span class="token operator">-</span>server
<span class="token builtin">make</span> restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>还有 chat：</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>git clone https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>OpenIMSDK<span class="token operator">/</span>chat openim<span class="token operator">-</span>chat
cd openim<span class="token operator">-</span>chat
<span class="token builtin">make</span> start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p>需要注册用户，点击阅读文档：https://docs.openim.io/restapi/apis/usermanagement/userregister</p>
<h3 id="request-method" tabindex="-1"><a class="header-anchor" href="#request-method" aria-hidden="true">#</a> Request Method</h3>
<ul>
<li><code v-pre>post</code></li>
</ul>
<h3 id="request-url" tabindex="-1"><a class="header-anchor" href="#request-url" aria-hidden="true">#</a> Request URL</h3>
<ul>
<li><code v-pre>http://localhost:10002/user/user_register</code></li>
</ul>
<h3 id="header" tabindex="-1"><a class="header-anchor" href="#header" aria-hidden="true">#</a> Header</h3>
<table>
<thead>
<tr>
<th>Header Name</th>
<th>Example Value</th>
<th>Optional</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>operationID</td>
<td>1646445464564</td>
<td>Required</td>
<td>string</td>
<td>operationID for global link tracking</td>
</tr>
</tbody>
</table>
<h3 id="request-parameter-example" tabindex="-1"><a class="header-anchor" href="#request-parameter-example" aria-hidden="true">#</a> Request Parameter Example</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">{</span>
  <span class="token string">"secret"</span><span class="token punctuation">:</span> <span class="token string">"openIM123"</span><span class="token punctuation">,</span>
  <span class="token string">"users"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token punctuation">{</span>
      <span class="token string">"userID"</span><span class="token punctuation">:</span> <span class="token string">"11111112"</span><span class="token punctuation">,</span>
      <span class="token string">"nickname"</span><span class="token punctuation">:</span> <span class="token string">"yourNickname"</span><span class="token punctuation">,</span>
      <span class="token string">"faceURL"</span><span class="token punctuation">:</span> <span class="token string">"yourFaceURL"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>其中，我们需要稍微设置一下 nickname 和 faceURL ，当然也可以不设置，直接先注册</p>
<p><code v-pre>secret</code> 是根据你的配置中，取决于 config.yaml 文件的配置</p>
<p>userID 需要保存，因为获取 Token 需要用到</p>
</blockquote>
<h3 id="成功注册返回" tabindex="-1"><a class="header-anchor" href="#成功注册返回" aria-hidden="true">#</a> 成功注册返回</h3>
<p>如下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">{</span>
  <span class="token key atrule">"errCode"</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token key atrule">"errMsg"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
  <span class="token key atrule">"errDlt"</span><span class="token punctuation">:</span> <span class="token string">""</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>表示成功注册，我们可以进入下一步，获取 Token</p>
<h2 id="获取-token" tabindex="-1"><a class="header-anchor" href="#获取-token" aria-hidden="true">#</a> 获取 Token</h2>
<h3 id="request-method-1" tabindex="-1"><a class="header-anchor" href="#request-method-1" aria-hidden="true">#</a> Request Method</h3>
<ul>
<li><code v-pre>post</code></li>
</ul>
<h3 id="request-url-1" tabindex="-1"><a class="header-anchor" href="#request-url-1" aria-hidden="true">#</a> Request URL</h3>
<ul>
<li><code v-pre>http://localhost:10002/auth/user_token</code></li>
</ul>
<h3 id="header-1" tabindex="-1"><a class="header-anchor" href="#header-1" aria-hidden="true">#</a> Header</h3>
<table>
<thead>
<tr>
<th>Header Name</th>
<th>Example Value</th>
<th>Optional</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>operationID</td>
<td>1646445464564</td>
<td>Required</td>
<td>string</td>
<td>operationID is used for global link tracking</td>
</tr>
</tbody>
</table>
<h3 id="request-sample-parameters" tabindex="-1"><a class="header-anchor" href="#request-sample-parameters" aria-hidden="true">#</a> Request Sample Parameters</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{
  "secret": "openIM123",
  "platformID": 1,
  "userID": "11111112"
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意，<code v-pre>userID</code> 来自上一个我们注册的时候的 <code v-pre>UserID</code></p>
</blockquote>
<h3 id="successful-return-sample" tabindex="-1"><a class="header-anchor" href="#successful-return-sample" aria-hidden="true">#</a> Successful Return Sample</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">{</span>
    <span class="token key atrule">"errCode"</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token key atrule">"errMsg"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
    <span class="token key atrule">"errDlt"</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">,</span>
    <span class="token key atrule">"data"</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token key atrule">"token"</span><span class="token punctuation">:</span> <span class="token string">"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxMTExMTExMiIsIlBsYXRmb3JtSUQiOjEsImV4cCI6MTcwNjU5NTM0MCwibmJmIjoxNjk4ODE5MDQwLCJpYXQiOjE2OTg4MTkzNDB9.YOeKRSwvTF0_yRNB3XwOCIYaTC-swVzxRjnHidUo4xw"</span><span class="token punctuation">,</span>
        <span class="token key atrule">"expireTimeSeconds"</span><span class="token punctuation">:</span> <span class="token number">7776000</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时我们就已经注册成功，拿到了 Token</p>
<h2 id="检查" tabindex="-1"><a class="header-anchor" href="#检查" aria-hidden="true">#</a> 检查</h2>
<p>Post 请求：</p>
<ul>
<li><code v-pre>http://localhost:10002/user/account_check</code></li>
</ul>
<table>
<thead>
<tr>
<th>Header Name</th>
<th>Sample Value</th>
<th>Optional</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>operationID</td>
<td>1646445464564</td>
<td>Mandatory</td>
<td>string</td>
<td>operationID for global link tracing</td>
</tr>
<tr>
<td>token</td>
<td>${TOKEN}</td>
<td>Mandatory</td>
<td>string</td>
<td>Admin token</td>
</tr>
</tbody>
</table>
<p><code v-pre>${TOKEN}</code> 换成获取到的 Token： <code v-pre>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxMTExMTExMiIsIlBsYXRmb3JtSUQiOjEsImV4cCI6MTcwNjU5NTM0MCwibmJmIjoxNjk4ODE5MDQwLCJpYXQiOjE2OTg4MTkzNDB9.YOeKRSwvTF0_yRNB3XwOCIYaTC-swVzxRjnHidUo4xw</code></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">{</span>
  <span class="token string">"checkUserIDs"</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
    <span class="token string">"11111111"</span><span class="token punctuation">,</span>
    <span class="token string">"11111112"</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


