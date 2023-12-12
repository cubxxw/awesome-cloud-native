import{_ as t,r as i,o,c as u,a as n,b as l,d as s,e}from"./app.9f14a191.js";const c={},d=s(`<h1 id="openim-\u83B7\u53D6\u5230\u7528\u6237\u7684-token" tabindex="-1"><a class="header-anchor" href="#openim-\u83B7\u53D6\u5230\u7528\u6237\u7684-token" aria-hidden="true">#</a> OpenIM \u83B7\u53D6\u5230\u7528\u6237\u7684 Token</h1><p>\u9700\u8981\u7684\u5DE5\u5177\uFF1Apostman \u6216\u5176\u4ED6API\u6D4B\u8BD5\u5DE5\u5177</p><p>\u9700\u8981\u7684\u73AF\u5883\uFF1A</p><ul><li>\u670D\u52A1\u5668\uFF1Aopenim-server\u548Copenim-chat</li><li>\u672C\u5730\uFF1Aopenim-server\u548Copenim-chat</li></ul><p>\u5982\u679C\u9009\u62E9\u672C\u5730\u90E8\u7F72\uFF0C\u53EF\u4EE5\u6309\u7167\u4EE5\u4E0B\u6B65\u9AA4\u8FDB\u884C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>bashCopy codegit clone https://github.com/OpenIMSDK/Open-IM-Server openim-server
cd openim-server
make restart
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\uFF0C\u542F\u52A8\u804A\u5929\u670D\u52A1\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>bashCopy codegit clone https://github.com/OpenIMSDK/chat openim-chat
cd openim-chat
make start
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u5F00\u59CB" tabindex="-1"><a class="header-anchor" href="#\u5F00\u59CB" aria-hidden="true">#</a> \u5F00\u59CB</h2>`,9),p=e("\u9996\u5148\u9700\u8981\u6CE8\u518C\u7528\u6237\uFF0C\u8BE6\u7EC6\u4FE1\u606F\u53EF\u4EE5\u67E5\u770B\u6587\u6863\uFF1A"),r={href:"https://docs.openim.io/restapi/apis/usermanagement/userregister",target:"_blank",rel:"noopener noreferrer"},v=e("\u7528\u6237\u6CE8\u518C\u6587\u6863"),m=s(`<h3 id="\u8BF7\u6C42\u65B9\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u8BF7\u6C42\u65B9\u6CD5" aria-hidden="true">#</a> \u8BF7\u6C42\u65B9\u6CD5</h3><ul><li><code>POST</code></li></ul><h3 id="\u8BF7\u6C42url" tabindex="-1"><a class="header-anchor" href="#\u8BF7\u6C42url" aria-hidden="true">#</a> \u8BF7\u6C42URL</h3><ul><li><code>http://localhost:10002/user/user_register</code></li></ul><h3 id="\u8BF7\u6C42\u5934" tabindex="-1"><a class="header-anchor" href="#\u8BF7\u6C42\u5934" aria-hidden="true">#</a> \u8BF7\u6C42\u5934</h3><table><thead><tr><th>Header \u540D\u79F0</th><th>\u793A\u4F8B\u503C</th><th>\u662F\u5426\u53EF\u9009</th><th>\u7C7B\u578B</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>operationID</td><td>1646445464564</td><td>\u5FC5\u586B</td><td>string</td><td>\u5168\u5C40\u94FE\u63A5\u8FFD\u8E2A\u7684\u64CD\u4F5CID</td></tr></tbody></table><h3 id="\u8BF7\u6C42\u53C2\u6570\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u8BF7\u6C42\u53C2\u6570\u793A\u4F8B" aria-hidden="true">#</a> \u8BF7\u6C42\u53C2\u6570\u793A\u4F8B</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>jsonCopy code{
  &quot;secret&quot;: &quot;openIM123&quot;,
  &quot;users&quot;: [
    {
      &quot;userID&quot;: &quot;11111112&quot;,
      &quot;nickname&quot;: &quot;yourNickname&quot;,
      &quot;faceURL&quot;: &quot;yourFaceURL&quot;
    }
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5176\u4E2D\uFF0C\u9700\u8981\u4E3A\u7528\u6237\u8BBE\u7F6E\u4E00\u4E9B\u4FE1\u606F\uFF0C\u5982<code>nickname</code>\u548C<code>faceURL</code>\uFF0C\u4F46\u8FD9\u4E9B\u4FE1\u606F\u4E5F\u53EF\u4EE5\u7559\u7A7A\u3002</p><p><code>secret</code>\u53C2\u6570\u7684\u503C\u6839\u636E\u4F60\u7684\u914D\u7F6E\u6765\u51B3\u5B9A\uFF0C\u901A\u5E38\u662F\u6839\u636E<code>config.yaml</code>\u6587\u4EF6\u4E2D\u7684\u914D\u7F6E\u800C\u6765\u3002</p><p><code>userID</code>\u9700\u8981\u4FDD\u5B58\u4E0B\u6765\uFF0C\u56E0\u4E3A\u540E\u9762\u83B7\u53D6Token\u4F1A\u7528\u5230\u3002</p><h3 id="\u6210\u529F\u6CE8\u518C\u8FD4\u56DE\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u6210\u529F\u6CE8\u518C\u8FD4\u56DE\u793A\u4F8B" aria-hidden="true">#</a> \u6210\u529F\u6CE8\u518C\u8FD4\u56DE\u793A\u4F8B</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>jsonCopy code{
  &quot;errCode&quot;: 0,
  &quot;errMsg&quot;: &quot;&quot;,
  &quot;errDlt&quot;: &quot;&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8868\u793A\u6210\u529F\u6CE8\u518C\uFF0C\u73B0\u5728\u53EF\u4EE5\u7EE7\u7EED\u83B7\u53D6Token\u3002</p><h2 id="\u83B7\u53D6-token" tabindex="-1"><a class="header-anchor" href="#\u83B7\u53D6-token" aria-hidden="true">#</a> \u83B7\u53D6 Token</h2><h3 id="\u8BF7\u6C42\u65B9\u6CD5-1" tabindex="-1"><a class="header-anchor" href="#\u8BF7\u6C42\u65B9\u6CD5-1" aria-hidden="true">#</a> \u8BF7\u6C42\u65B9\u6CD5</h3><ul><li><code>POST</code></li></ul><h3 id="\u8BF7\u6C42url-1" tabindex="-1"><a class="header-anchor" href="#\u8BF7\u6C42url-1" aria-hidden="true">#</a> \u8BF7\u6C42URL</h3><ul><li><code>http://localhost:10002/auth/user_token</code></li></ul><h3 id="\u8BF7\u6C42\u5934-1" tabindex="-1"><a class="header-anchor" href="#\u8BF7\u6C42\u5934-1" aria-hidden="true">#</a> \u8BF7\u6C42\u5934</h3><table><thead><tr><th>Header \u540D\u79F0</th><th>\u793A\u4F8B\u503C</th><th>\u662F\u5426\u53EF\u9009</th><th>\u7C7B\u578B</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>operationID</td><td>1646445464564</td><td>\u5FC5\u586B</td><td>string</td><td>\u5168\u5C40\u94FE\u63A5\u8FFD\u8E2A\u7684\u64CD\u4F5CID</td></tr></tbody></table><h3 id="\u8BF7\u6C42\u53C2\u6570\u793A\u4F8B-1" tabindex="-1"><a class="header-anchor" href="#\u8BF7\u6C42\u53C2\u6570\u793A\u4F8B-1" aria-hidden="true">#</a> \u8BF7\u6C42\u53C2\u6570\u793A\u4F8B</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>jsonCopy code{
  &quot;secret&quot;: &quot;openIM123&quot;,
  &quot;platformID&quot;: 1,
  &quot;userID&quot;: &quot;11111112&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\u610F\uFF0C<code>userID</code>\u9700\u8981\u4F7F\u7528\u524D\u9762\u6CE8\u518C\u65F6\u5F97\u5230\u7684<code>UserID</code>\u3002</p><h3 id="\u6210\u529F\u8FD4\u56DE\u793A\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u6210\u529F\u8FD4\u56DE\u793A\u4F8B" aria-hidden="true">#</a> \u6210\u529F\u8FD4\u56DE\u793A\u4F8B</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>jsonCopy code{
    &quot;errCode&quot;: 0,
    &quot;errMsg&quot;: &quot;&quot;,
    &quot;errDlt&quot;: &quot;&quot;,
    &quot;data&quot;: {
        &quot;token&quot;: &quot;eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIxMTExMTExMiIsIlBsYXRmb3JtSUQiOjEsImV4cCI6MTcwNjU5NTM0MCwibmJmIjoxNjk4ODE5MDQwLCJpYXQiOjE2OTg4MTkzNDB9.YOeKRSwvTF0_yRNB3XwOCIYaTC-swVzxRjnHidUo4xw&quot;,
        &quot;expireTimeSeconds&quot;: 7776000
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u73B0\u5728\u5DF2\u7ECF\u6210\u529F\u6CE8\u518C\u5E76\u83B7\u5F97\u4E86Token\u3002</p><h2 id="\u68C0\u67E5\u7528\u6237" tabindex="-1"><a class="header-anchor" href="#\u68C0\u67E5\u7528\u6237" aria-hidden="true">#</a> \u68C0\u67E5\u7528\u6237</h2><p>\u53D1\u51FAPOST\u8BF7\u6C42\uFF1A</p><ul><li><code>http://localhost:10002/user/account_check</code></li></ul><p>\u8BF7\u6C42\u5934\uFF1A</p><table><thead><tr><th>Header \u540D\u79F0</th><th>\u793A\u4F8B\u503C</th><th>\u662F\u5426\u53EF\u9009</th><th>\u7C7B\u578B</th><th>\u63CF\u8FF0</th></tr></thead><tbody><tr><td>operationID</td><td>1646445464564</td><td>\u5FC5\u586B</td><td>string</td><td>\u5168\u5C40\u94FE\u63A5\u8FFD\u8E2A\u7684\u64CD\u4F5CID</td></tr><tr><td>token</td><td>\${TOKEN}</td><td>\u5FC5\u586B</td><td>string</td><td>Admin token</td></tr></tbody></table><p><code>\${TOKEN}</code>\u9700\u8981\u66FF\u6362\u4E3A\u4E4B\u524D\u83B7\u53D6\u5230\u7684Token\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>jsonCopy code{
  &quot;checkUserIDs&quot;: [
    &quot;11111111&quot;,
    &quot;11111112&quot;
  ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CE8\u610F\uFF0C\u68C0\u67E5\u7528\u6237\u9700\u8981\u4F7F\u7528\u7BA1\u7406\u5458token\u8FDB\u884C\u64CD\u4F5C\u3002\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u6CD5\u83B7\u53D6\u7BA1\u7406\u5458Token\uFF1A</p><ol><li>\u6CE8\u518C\uFF1Ahttp://localhost:10002/auth/user_token</li><li>\u4F7F\u7528\u4EE5\u4E0B\u53C2\u6570\u8FDB\u884C\u6CE8\u518C\uFF1A</li></ol><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>jsonCopy code{
  &quot;secret&quot;: &quot;openIM123&quot;,
  &quot;platformID&quot;: 1,
  &quot;userID&quot;: &quot;openIM123456&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8BF7\u6C42\u5730\u5740\u4E3A<code>http://localhost:10002/user/account_check</code>\uFF0C\u8BF7\u6C42\u4F53\u4E3A\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>jsonCopy code{
    &quot;errCode&quot;: 0,
    &quot;errMsg&quot;: &quot;&quot;,
    &quot;errDlt&quot;: &quot;&quot;,
    &quot;data&quot;: {
        &quot;results&quot;: [
            {
                &quot;userID&quot;: &quot;11111111&quot;,
                &quot;accountStatus&quot;: &quot;unregistered&quot;
            },
            {
                &quot;userID&quot;: &quot;11111112&quot;,
                &quot;accountStatus&quot;: &quot;registered&quot;
            }
        ]
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="\u83B7\u53D6\u7528\u6237\u4FE1\u606F" tabindex="-1"><a class="header-anchor" href="#\u83B7\u53D6\u7528\u6237\u4FE1\u606F" aria-hidden="true">#</a> \u83B7\u53D6\u7528\u6237\u4FE1\u606F</h2><p>API \u5730\u5740\uFF1A<code>http://localhost:10002/user/get_users</code></p><p>\u8BF7\u6C42\u4F53\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>jsonCopy code{
  &quot;pagination&quot;: {
    &quot;pageNumber&quot;: 1,
    &quot;showNumber&quot;: 100
  }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD4\u56DE\u7ED3\u679C\u793A\u4F8B\uFF1A</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token punctuation">{</span>
    <span class="token key atrule">&quot;errCode&quot;</span><span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token key atrule">&quot;errMsg&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token key atrule">&quot;errDlt&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
    <span class="token key atrule">&quot;data&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>
        <span class="token key atrule">&quot;total&quot;</span><span class="token punctuation">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
        <span class="token key atrule">&quot;users&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token key atrule">&quot;userID&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;11111112&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;nickname&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;yourNickname&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;faceURL&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;yourFaceURL&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;ex&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;createTime&quot;</span><span class="token punctuation">:</span> <span class="token number">1699260936619</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;appMangerLevel&quot;</span><span class="token punctuation">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;globalRecvMsgOpt&quot;</span><span class="token punctuation">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token key atrule">&quot;userID&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;openIM123456&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;nickname&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;system1&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;faceURL&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;ex&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;createTime&quot;</span><span class="token punctuation">:</span> <span class="token number">1699241222762</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;appMangerLevel&quot;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;globalRecvMsgOpt&quot;</span><span class="token punctuation">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token key atrule">&quot;userID&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;openIM654321&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;nickname&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;system2&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;faceURL&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;ex&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;createTime&quot;</span><span class="token punctuation">:</span> <span class="token number">1699241222762</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;appMangerLevel&quot;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;globalRecvMsgOpt&quot;</span><span class="token punctuation">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span>
                <span class="token key atrule">&quot;userID&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;openIMAdmin&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;nickname&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;system3&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;faceURL&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;ex&quot;</span><span class="token punctuation">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;createTime&quot;</span><span class="token punctuation">:</span> <span class="token number">1699241222762</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;appMangerLevel&quot;</span><span class="token punctuation">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
                <span class="token key atrule">&quot;globalRecvMsgOpt&quot;</span><span class="token punctuation">:</span> <span class="token number">0</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,45);function k(q,b){const a=i("ExternalLinkIcon");return o(),u("div",null,[d,n("p",null,[p,n("a",r,[v,l(a)])]),m])}const g=t(c,[["render",k],["__file","148.html.vue"]]);export{g as default};
