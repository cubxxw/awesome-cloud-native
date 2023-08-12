import{_ as l,r as t,o as c,c as d,a as n,b as s,w as r,e,d as i}from"./app.5bf1abd2.js";const p={},u={href:"http://nsddd.top",target:"_blank",rel:"noopener noreferrer"},v=e("author"),m=n("h1",{id:"\u7B2C67\u8282-\u6DF1\u5165\u5B66\u4E60-beego-\u6E90\u7801",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u7B2C67\u8282-\u6DF1\u5165\u5B66\u4E60-beego-\u6E90\u7801","aria-hidden":"true"},"#"),e(" \u7B2C67\u8282 \u6DF1\u5165\u5B66\u4E60 beego \u6E90\u7801")],-1),b=n("div",null,[n("a",{href:"66.md",style:{float:"left"}},"\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} "),n("a",{href:"68.md",style:{float:"right"}}," \u2B07\uFE0F\u4E0B\u4E00\u8282\u{1F517}")],-1),k=n("br",null,null,-1),g=e("\u2764\uFE0F\u{1F495}\u{1F495}\u8BB0\u5F55"),h={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},f=e("sealos"),_=e("\u5F00\u6E90\u9879\u76EE\u7684\u5B66\u4E60\u8FC7\u7A0B\u3002"),x={href:"https://github.com/cubxxw/sealos",target:"_blank",rel:"noopener noreferrer"},q=e("k8s\uFF0Cdocker\u548C\u4E91\u539F\u751F\u7684\u5B66\u4E60"),w=e("\u3002Myblog:"),y={href:"http://nsddd.top/",target:"_blank",rel:"noopener noreferrer"},C=e("http://nsddd.top"),T=n("hr",null,null,-1),R=n("p",null,"[TOC]",-1),P=n("h2",{id:"\u4ECB\u7ECD",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#\u4ECB\u7ECD","aria-hidden":"true"},"#"),e(" \u4ECB\u7ECD")],-1),A=n("p",null,"Beego \u7528\u4E8E\u5FEB\u901F\u5F00\u53D1 Go \u4E2D\u7684\u4F01\u4E1A\u5E94\u7528\u7A0B\u5E8F\uFF0C\u5305\u62EC RESTful API\u3001Web \u5E94\u7528\u7A0B\u5E8F\u548C\u540E\u7AEF\u670D\u52A1\u3002",-1),S=n("p",null,[n("strong",null,"GitHub\u5730\u5740\uFF1A")],-1),E={href:"https://github.com/beego/beego/",target:"_blank",rel:"noopener noreferrer"},N=e("https://github.com/beego/beego/"),L=i(`<hr><p><img src="http://sm.nsddd.top/sm202305191917988.png" alt="architecture"></p><p><strong>Beego\u7531\u56DB\u4E2A\u90E8\u5206\u7EC4\u6210\uFF1A</strong></p><ol><li>\u57FA\u7840\u6A21\u5757\uFF1A\u5305\u62EC\u65E5\u5FD7\u6A21\u5757\u3001\u914D\u7F6E\u6A21\u5757\u3001\u8C03\u901F\u5668\u6A21\u5757;</li><li>\u4EFB\u52A1\uFF1A\u7528\u4E8E\u8FD0\u884C\u5B9A\u65F6\u4EFB\u52A1\u6216\u5468\u671F\u6027\u4EFB\u52A1;</li><li>\u5BA2\u6237\u7AEF\uFF1A\u5305\u62ECORM\u6A21\u5757\u3001httplib\u6A21\u5757\u3001\u7F13\u5B58\u6A21\u5757;</li><li>\u670D\u52A1\u5668\uFF1A\u5305\u62EC\u7F51\u7EDC\u6A21\u5757\u3002\u6211\u4EEC\u5C06\u6765\u652F\u6301 gRPC;</li></ol><p>Beego \u5C31\u76F8\u5F53\u4E8E\u662F\u4E00\u4E2A <strong>\u79EF\u6728\u5F0F\u96C6\u5408</strong>\uFF0C\u5C06\u6BCF\u4E00\u4E2A\u6A21\u5757\u90FD\u96C6\u6210\u5728\u9879\u76EE\u4E2D\uFF0C\u6BD4\u5982\u8BF4 cache \u7684\u7F13\u5B58\u6A21\u5757\u3002</p><h3 id="mvc-\u67B6\u6784" tabindex="-1"><a class="header-anchor" href="#mvc-\u67B6\u6784" aria-hidden="true">#</a> MVC \u67B6\u6784</h3><p>\u8FD9\u91CC\u4F7F\u7528markdown Draw.io\u7684mermaid\u6269\u5C55\u6765\u753BMVC\u67B6\u6784\u56FE:</p><div class="language-mermaid ext-mermaid line-numbers-mode"><pre class="language-mermaid"><code><span class="token keyword">graph</span> LR
    client<span class="token text string">(Client)</span> <span class="token arrow operator">--&gt;</span> view<span class="token text string">(View)</span>
    view <span class="token arrow operator">--&gt;</span> controller<span class="token text string">(Controller)</span>
    controller <span class="token arrow operator">--&gt;</span> model<span class="token text string">(Model)</span>
    model <span class="token arrow operator">--&gt;</span> database<span class="token text string">(Database)</span>

    <span class="token keyword">classDef</span> blue <span class="token style"><span class="token property">fill</span><span class="token operator">:</span>#bbf<span class="token punctuation">,</span><span class="token property">stroke</span><span class="token operator">:</span>#f66<span class="token punctuation">,</span><span class="token property">stroke-width</span><span class="token operator">:</span>2px</span><span class="token punctuation">;</span>
    <span class="token keyword">classDef</span> orange <span class="token style"><span class="token property">fill</span><span class="token operator">:</span>#f96<span class="token punctuation">,</span><span class="token property">stroke</span><span class="token operator">:</span>#f66<span class="token punctuation">,</span><span class="token property">stroke-width</span><span class="token operator">:</span>2px</span><span class="token punctuation">;</span>
    <span class="token keyword">classDef</span> green <span class="token style"><span class="token property">fill</span><span class="token operator">:</span>#9f9<span class="token punctuation">,</span><span class="token property">stroke</span><span class="token operator">:</span>#0f0<span class="token punctuation">,</span><span class="token property">stroke-width</span><span class="token operator">:</span>2px</span><span class="token punctuation">;</span>

    <span class="token keyword">class</span> Client blue
    <span class="token keyword">class</span> View blue
    <span class="token keyword">class</span> Controller orange
    <span class="token keyword">class</span> Model orange
    <span class="token keyword">class</span> Database green
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u56FE\u5C55\u793A\u4E86\u4E00\u4E2A\u57FA\u672C\u7684MVC\u67B6\u6784:- \u5BA2\u6237\u7AEF(Client)\u8C03\u7528View\u5C42</p><ul><li>\u5BA2\u6237\u7AEF(Client)\u8C03\u7528View\u5C42</li><li>View\u5C42\u63A5\u6536\u5BA2\u6237\u7AEF\u8BF7\u6C42\uFF0C\u59D4\u6258\u7ED9Controller\u5C42</li><li>Controller\u5C42\u8C03\u7528Model\u5C42\u83B7\u53D6\u6570\u636E\u6216\u4E1A\u52A1\u903B\u8F91</li><li>Model\u5C42\u5C06\u8BF7\u6C42\u8F6C\u53D1\u7ED9\u6570\u636E\u5E93</li><li>\u6570\u636E\u5E93\u67E5\u8BE2\u54CD\u5E94\uFF0CModel\u5C42\u5C06\u7ED3\u679C\u8FD4\u56DE\u7ED9Controller</li><li>Controller\u5C42\u5C06Model\u5C42\u7ED3\u679C\u8FD4\u56DE\u7ED9View\u5C42</li><li>View\u5C42\u5C06\u7ED3\u679C\u5448\u73B0\u7ED9\u5BA2\u6237\u7AEF</li></ul><p>beego \u4F7F\u7528\u7684\u67B6\u6784\u662F MVC \u67B6\u6784\uFF1A</p><p><img src="http://sm.nsddd.top/sm202305191932281.png" alt="Http Request"></p><p>\u6D41\u7A0B\u56FE\u8BF4\u660E\uFF1A</p><ol><li>http\u8BF7\u6C42\u4ECE\u5DE6\u4FA7main\u5165\u53E3\u51FD\u6570\u5F00\u59CB\u8FDB\u5165\u6846\u67B6</li><li>UrL\u8DEF\u7531\u89E3\u6790\u7136\u540E\u786E\u5B9A\u6267\u884C\u90A3\u4E2A\u63A7\u5236\u5668(controller)</li><li>\u6267\u884C\u8BF7\u6C42\u524D\u7684\u8FC7\u6EE4\u5668 \uFF08\u8FC7\u6EE4\u5668\u4E00\u822C\u7528\u6765\u62E6\u622A\u8BF7\u6C42\uFF0C\u4F8B\u5982\u505Aapi\u7B7E\u540D\u6821\u9A8C\uFF0Csession\u5904\u7406\uFF0C\u5B89\u5168\u9A8C\u8BC1\u7B49\u7B49\uFF09</li><li>\u6267\u884C\u63A7\u5236\u5668 \uFF08\u63A7\u5236\u5668\u6839\u636E\u9700\u8981\u8C03\u7528model\uFF0Csession, \u65E5\u5FD7\u7B49\u6A21\u5757\uFF09</li><li>\u6267\u884C\u8BF7\u6C42\u540E\u7684\u8FC7\u6EE4\u5668</li><li>\u89C6\u56FE\u8F93\u51FA\u8FD4\u56DE\u7ED9\u7528\u6237</li></ol><h2 id="\u76EE\u5F55\u7ED3\u6784" tabindex="-1"><a class="header-anchor" href="#\u76EE\u5F55\u7ED3\u6784" aria-hidden="true">#</a> \u76EE\u5F55\u7ED3\u6784</h2><p>beego \u662F\u4E00\u4E2A Go \u8BED\u8A00\u5F00\u53D1\u7684 Web \u6846\u67B6\uFF0C\u5B83\u7684\u76EE\u5F55\u7ED3\u6784\u5982\u4E0B:</p><ul><li><p><code>app</code>: \u7528\u4E8E\u653E\u7F6E\u5E94\u7528\u7A0B\u5E8F\u7684\u63A7\u5236\u5668\u3001\u6A21\u578B\u3001\u89C6\u56FE\u7B49\u3002</p></li><li><p><code>conf</code>: \u7528\u4E8E\u653E\u7F6E\u914D\u7F6E\u6587\u4EF6\uFF0C\u5982 app.conf\u3002</p></li><li><p><code>controllers</code>: \u7528\u4E8E\u653E\u7F6E\u63A7\u5236\u5668\u4EE3\u7801\uFF0C\u63A7\u5236\u5668\u8D1F\u8D23\u89E3\u6790\u7528\u6237\u7684\u8F93\u5165\uFF0C\u5904\u7406\u540E\u8FD4\u56DE\u76F8\u5E94\u7684\u7ED3\u679C\u3002</p></li><li><p><code>models</code>: \u7528\u4E8E\u653E\u7F6E\u6A21\u578B\u4EE3\u7801\uFF0C\u6A21\u578B\u662F\u4E0E\u6570\u636E\u5E93\u4EA4\u4E92\u7684\u90E8\u5206\u3002</p></li><li><p><code>routers</code>: \u7528\u4E8E\u8BBE\u7F6E URL \u8DEF\u7531\u6620\u5C04\uFF0C\u6BD4\u5982\u5C06 /user \u6620\u5C04\u5230 controllers/user.go\u3002</p></li><li><p><code>static</code>: \u7528\u4E8E\u653E\u7F6E\u9759\u6001\u8D44\u6E90\uFF0C\u5982 JS\u3001CSS\u3001\u56FE\u7247\u7B49\u3002</p></li><li><p><code>tests</code>: \u7528\u4E8E\u653E\u7F6E\u6D4B\u8BD5\u4EE3\u7801\u3002</p></li><li><p><code>views</code>: \u7528\u4E8E\u653E\u7F6E\u6A21\u677F\u6587\u4EF6\uFF0Cbeego \u652F\u6301\u591A\u79CD\u6A21\u677F\uFF0C\u5982 goTemplate\u3001fastTemplate \u7B49\u3002</p></li><li><p><code>main.go</code>: \u7A0B\u5E8F\u5165\u53E3\u6587\u4EF6\uFF0C\u7528\u4E8E\u521D\u59CB\u5316 Beego\u3002</p></li><li><p><code>conf/</code>: \u7528\u4E8E\u5B58\u653E\u914D\u7F6E\u6587\u4EF6</p></li><li><p><code>logs/</code>: \u7528\u4E8E\u5B58\u653E\u65E5\u5FD7\u6587\u4EF6</p></li></ul><p>\u9664\u6B64\u4E4B\u5916\uFF0C\u8FD8\u6709:</p><ul><li><code>cache</code>: \u7528\u4E8E\u8BBE\u7F6E\u7F13\u5B58\uFF0C\u5982 redis\u3001memcached \u7B49\u3002</li><li><code>toolbox</code>: \u7528\u4E8E\u653E\u7F6E\u5DE5\u5177\u51FD\u6570\u3002</li><li><code>docs</code>: \u7528\u4E8E\u653E\u7F6E\u6587\u6863\u3002</li><li><code>plugins</code>: beego \u7684\u63D2\u4EF6\u673A\u5236\u5141\u8BB8\u5F00\u53D1\u8005\u6269\u5C55\u66F4\u591A\u529F\u80FD\u3002</li></ul><h3 id="beego-\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#beego-\u5B89\u88C5" aria-hidden="true">#</a> Beego \u5B89\u88C5</h3><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>go get github.com/beego/beego/v2@latest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>\u547D\u4EE4\uFF1A</strong></p><ul><li>new\uFF1A\u57FA\u4E8E\u7F51\u7AD9\u5F00\u53D1</li><li>api\uFF1A\u624B\u673A\u63A5\u53E3\u5F00\u53D1</li><li>run\uFF1A\u8FD0\u884C</li></ul><h2 id="beego-\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#beego-\u4F7F\u7528" aria-hidden="true">#</a> Beego \u4F7F\u7528</h2><h3 id="new" tabindex="-1"><a class="header-anchor" href="#new" aria-hidden="true">#</a> new</h3><p><code>new</code>: \u7528\u4E8E\u521B\u5EFA\u4E00\u4E2A beego \u9879\u76EE\u7684\u811A\u624B\u67B6</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>beego new PROJECT_NAME
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u547D\u4EE4\u4F1A\u521B\u5EFA\u4E00\u4E2A\u6587\u4EF6\u5939 PROJECT_NAME,\u5E76\u5728\u91CC\u9762\u521D\u59CB\u5316 beego \u9879\u76EE\u7684\u57FA\u672C\u76EE\u5F55\u7ED3\u6784\u548C\u6587\u4EF6\u3002</p><h3 id="api" tabindex="-1"><a class="header-anchor" href="#api" aria-hidden="true">#</a> api</h3><p><code>api</code>:\u7528\u4E8E\u5FEB\u901F\u521B\u5EFA RESTful API \u670D\u52A1\u3002\u683C\u5F0F\u4E3A:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>beego api <span class="token punctuation">[</span>name<span class="token punctuation">]</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8FD9\u4E2A\u547D\u4EE4\u4F1A\u81EA\u52A8\u5728 controllers \u76EE\u5F55\u4E0B\u521B\u5EFA\u540D\u4E3A name \u7684 API \u63A7\u5236\u5668,\u5E76\u5728 <code>conf/app.conf</code> \u91CC\u6CE8\u518C\u8BE5 API\u3002</p><h3 id="run" tabindex="-1"><a class="header-anchor" href="#run" aria-hidden="true">#</a> run</h3><p><code>run</code>: \u7528\u4E8E\u8FD0\u884C\u548C\u7F16\u8BD1 beego \u9879\u76EE\u3002</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>beego run   <span class="token comment"># \u8FD0\u884C\u9879\u76EE</span>
beego build <span class="token comment"># \u7F16\u8BD1\u9879\u76EE</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>run \u547D\u4EE4\u4F1A\u76D1\u542C\u6587\u4EF6\u53D8\u5316\u5E76\u81EA\u52A8\u7F16\u8BD1\u548C\u91CD\u8F7D,\u65B9\u4FBF\u5F00\u53D1\u8C03\u8BD5\u3002build \u547D\u4EE4\u4F1A\u7F16\u8BD1\u751F\u6210\u53EF\u6267\u884C\u6587\u4EF6,\u7528\u4E8E\u90E8\u7F72\u4E0A\u7EBF\u3002</p><p>\u6240\u4EE5,\u5982\u679C\u4F60\u8981\u5F00\u53D1\u4E00\u4E2A beego Web\u5E94\u7528,\u901A\u5E38\u7684\u6D41\u7A0B\u662F:</p><ol><li><p>\u4F7F\u7528 beego new myproject \u521D\u59CB\u5316\u9879\u76EE</p></li><li><p>\u7F16\u5199\u4EE3\u7801(\u63A7\u5236\u5668\u3001\u6A21\u578B\u3001\u8DEF\u7531\u7B49)</p></li><li><p>\u4F7F\u7528 beego run \u8FD0\u884C\u9879\u76EE\u8FDB\u884C\u5F00\u53D1\u8C03\u8BD5</p></li><li><p>\u4F7F\u7528 beego build \u7F16\u8BD1\u53D1\u5E03\u53EF\u6267\u884C\u6587\u4EF6</p></li><li><p>\u90E8\u7F72\u53EF\u6267\u884C\u6587\u4EF6\u5230\u751F\u4EA7\u73AF\u5883</p></li></ol><h2 id="\u4F7F\u7528" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528" aria-hidden="true">#</a> \u4F7F\u7528</h2><h3 id="\u63A7\u5236\u5668\u7684\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#\u63A7\u5236\u5668\u7684\u903B\u8F91" aria-hidden="true">#</a> \u63A7\u5236\u5668\u7684\u903B\u8F91</h3><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> controllers

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	beego <span class="token string">&quot;github.com/beego/beego/v2/server/web&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5B9A\u4E49\u4E00\u4E2A\u63A7\u5236\u5668\u7ED3\u6784\u4F53</span>
<span class="token comment">// \u6211\u4EEC\u4E00\u822C\u4E00\u4E2A\u6A21\u5757\u5B9A\u4E49\u4E00\u4E2A\u63A7\u5236\u5668</span>
<span class="token keyword">type</span> MainController <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5D4C\u5957beego\u57FA\u7840\u63A7\u5236\u5668\uFF0C\u5728go\u8BED\u8A00\u4E2D\u5D4C\u5957struct\uFF0C\u5C31\u7C7B\u4F3C\u7EE7\u627F\u7684\u6982\u5FF5\u3002</span>
    <span class="token comment">// \u8FD9\u91CC\u5C31\u76F8\u5F53\u4E8E\uFF0C\u7EE7\u627F\u4E86beego.Controller\u7684\u65B9\u6CD5\u548C\u5C5E\u6027\u3002</span>
	beego<span class="token punctuation">.</span>Controller 
<span class="token punctuation">}</span>

<span class="token comment">// \u8986\u76D6beego.Controller\u7684Get\u65B9\u6CD5\uFF0C\u7528\u4E8E\u5904\u7406RESTful\u8BF7\u6C42\u4E2D\u7684get\u8BF7\u6C42</span>
<span class="token comment">// beego.Controller\u9ED8\u8BA4\u652F\u6301\u591A\u79CDRESTful\u65B9\u6CD5\uFF0C\u4F8B\u5982\uFF1APost\u3001Put\u3001Delete\u7B49\u7B49</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>MainController<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Data\u662F\u7EE7\u627F\u8FC7\u6765\u7684\u5C5E\u6027\uFF0C\u662Fmap\u7C7B\u578B\uFF0C\u53EF\u4EE5\u4FDD\u5B58\u4EFB\u610F\u7C7B\u578B\u6570\u636E\uFF0C\u4E3B\u8981\u7528\u4E8E\u4FDD\u5B58\u8BF7\u6C42\u54CD\u5E94\u6570\u636E</span>
    <span class="token comment">// \u6211\u4EEC\u53EF\u4EE5\u901A\u8FC7Data\u5C06\u53C2\u6570\uFF0C\u4F20\u5165\u89C6\u56FE\u6A21\u677F\u6587\u4EF6\u3002</span>
	<span class="token comment">// \u8FD9\u91CC\u8BBE\u7F6E\u4E86\u4E24\u4E2A\u53C2\u6570</span>
	c<span class="token punctuation">.</span>Data<span class="token punctuation">[</span><span class="token string">&quot;Website&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;nsddd.com&quot;</span>
	c<span class="token punctuation">.</span>Data<span class="token punctuation">[</span><span class="token string">&quot;Email&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;nsddd@demo.com&quot;</span>
	
	<span class="token comment">// \u8BBE\u7F6E\u9700\u8981\u6E32\u67D3\u7684\u6A21\u677F\u6587\u4EF6\uFF0C\u6846\u67B6\u4F1A\u53BBviews\u76EE\u5F55\u67E5\u627E\u8FD9\u4E2A\u6A21\u677F\u6587\u4EF6</span>
	c<span class="token punctuation">.</span>TplName <span class="token operator">=</span> <span class="token string">&quot;index.tpl&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u8BBE\u7F6Eurl\u8DEF\u7531" tabindex="-1"><a class="header-anchor" href="#\u8BBE\u7F6Eurl\u8DEF\u7531" aria-hidden="true">#</a> \u8BBE\u7F6EUrl\u8DEF\u7531</h3><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> routers

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;nsddd/controllers&quot;</span>
	beego <span class="token string">&quot;github.com/beego/beego/v2/server/web&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// go \u5305\u521D\u59CB\u5316\u51FD\u6570\uFF0Cgo\u8BED\u8A00\u4E2D\u5728\u5BFC\u5165\u4E00\u4E2A\u5305\u7684\u65F6\u5019\uFF0C\u5982\u679C\u88AB\u5BFC\u5165\u5305\u5B58\u5728init\u51FD\u6570\uFF0C\u4F1A\u6267\u884Cinit\u51FD\u6570</span>
<span class="token comment">// \u56E0\u6B64\u8FD9\u91CC\u53EF\u4EE5\u4F7F\u7528init\u51FD\u6570\u521D\u59CB\u5316\u8DEF\u7531\u8BBE\u7F6E</span>
<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u4F7F\u7528beego.Router\u51FD\u6570\uFF0C\u6CE8\u518C\u8DEF\u7531\u89C4\u5219\u3002</span>
    <span class="token comment">// \u7B2C\u4E00\u4E2A\u53C2\u6570\u662Furl\u8DEF\u7531\uFF0C\u7B2C\u4E8C\u4E2A\u53C2\u6570\u662F\u63A7\u5236\u5668</span>
    <span class="token comment">// \u8FD9\u91CC\u7684\u610F\u601D\u5C31\u662F\u5C06\u8BBF\u95EE / \u8FD9\u4E2Aurl\u7684\u8BF7\u6C42\uFF0C\u4EA4\u7ED9controllers.MainController\u63A7\u5236\u5668\u5904\u7406\u3002</span>
    beego<span class="token punctuation">.</span><span class="token function">Router</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>controllers<span class="token punctuation">.</span>MainController<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u6211\u4EEC\u589E\u52A0\u4E0B\u9762\u8DEF\u7531\u8BBE\u7F6E:</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>beego<span class="token punctuation">.</span><span class="token function">Router</span><span class="token punctuation">(</span><span class="token string">&quot;/nsddd&quot;</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>controllers<span class="token punctuation">.</span>MainController<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u8BBF\u95EE:http://localhost:8080/nsddd \u548C http://localhost:8080/ \u5F97\u5230\u7684\u7ED3\u679C\u4E00\u6837\uFF0C\u56E0\u4E3A\u8FD9\u4E24\u4E2Aurl\u5730\u5740\u90FD\u662F\u7531\u540C\u4E00\u4E2A\u63A7\u5236\u5668\u5904\u7406\u3002</p><p><code>beego RESTful</code>\u8DEF\u7531\u89C4\u5219\uFF0C\u9ED8\u8BA4\u662F\u901A\u8FC7 <strong>\u8BF7\u6C42\u65B9\u6CD5</strong> \u786E\u8BA4\u7531\u90A3\u4E2A\u63A7\u5236\u5668\u65B9\u6CD5\u6267\u884C\uFF0C\u4F8B\u5982get\u8BF7\u6C42\uFF0C\u7531Get\u65B9\u6CD5\u6267\u884C\uFF0CPOST\u8BF7\u6C42\u7531Post\u65B9\u6CD5\u6267\u884C\u3002</p><h3 id="\u7F16\u5199model\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#\u7F16\u5199model\u903B\u8F91" aria-hidden="true">#</a> \u7F16\u5199model\u903B\u8F91</h3><p>\u8FD9\u91CC\u6211\u4EEC\u770B\u4E00\u4E2Amysql\u6570\u636E\u5E93\u64CD\u4F5C\u7684\u4F8B\u5B50\u3002</p><p><em>\u5B9A\u4E49\u8868\u7684\u7ED3\u6784\uFF1A</em></p><div class="language-mysql ext-mysql line-numbers-mode"><pre class="language-mysql"><code>CREATE TABLE \`users\` (
  \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT &#39;\u81EA\u589EID&#39;,
  \`username\` varchar(30) NOT NULL COMMENT &#39;\u8D26\u53F7&#39;,
  \`password\` varchar(100) NOT NULL COMMENT &#39;\u5BC6\u7801&#39;,
   PRIMARY KEY (\`id\`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u521D\u59CB\u5316\u6570\u636E\u5E93\u8FDE\u63A5" tabindex="-1"><a class="header-anchor" href="#\u521D\u59CB\u5316\u6570\u636E\u5E93\u8FDE\u63A5" aria-hidden="true">#</a> \u521D\u59CB\u5316\u6570\u636E\u5E93\u8FDE\u63A5</h3><p>\u4E00\u822C\u521D\u59CB\u5316\u6570\u636E\u5E93\u8FDE\u63A5\u90FD\u662F\u5728main.go\u5165\u53E3\u7684\u5730\u65B9\u8BBE\u7F6E\u4E00\u6B21\u5C31\u884C\uFF0C\u4E0B\u9762\u770B\u4E0Bmain.go\u6587\u4EF6\u6539\u6210\u4EC0\u4E48\u6837\u4E86\u3002</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	beego <span class="token string">&quot;github.com/beego/beego/v2/server/web&quot;</span>
	<span class="token string">&quot;github.com/beego/beego/v2/client/orm&quot;</span>
	<span class="token boolean">_</span> <span class="token string">&quot;nsddd/routers&quot;</span>
	<span class="token comment">//\u5BFC\u5165mysql\u9A71\u52A8\uFF0C\u8FD9\u662F\u5FC5\u987B\u7684</span>
	<span class="token boolean">_</span> <span class="token string">&quot;github.com/go-sql-driver/mysql&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">//\u521D\u59CB\u5316\u5E94\u7528\u8BBE\u7F6E\uFF0C \u6211\u4EEC\u901A\u8FC7init\u51FD\u6570\u521D\u59CB\u5316\u6570\u636E\u5E93\u8FDE\u63A5\uFF0Cgo\u8BED\u8A00\u4E2D\u8FD9\u4E2A\u51FD\u6570\u4F1A\u4F18\u5148\u6267\u884C</span>
<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8FD9\u91CC\u6CE8\u518C\u4E00\u4E2Adefault\u9ED8\u8BA4\u6570\u636E\u5E93\uFF0C\u6570\u636E\u5E93\u9A71\u52A8\u662Fmysql.</span>
    <span class="token comment">// \u7B2C\u4E09\u4E2A\u53C2\u6570\u662F\u6570\u636E\u5E93dsn, \u914D\u7F6E\u6570\u636E\u5E93\u7684\u8D26\u53F7\u5BC6\u7801\uFF0C\u6570\u636E\u5E93\u540D\u7B49\u53C2\u6570</span>
    <span class="token comment">//  dsn\u53C2\u6570\u8BF4\u660E\uFF1A</span>
    <span class="token comment">//      username    - mysql\u8D26\u53F7</span>
    <span class="token comment">//      password    - mysql\u5BC6\u7801</span>
    <span class="token comment">//      db_name     - \u6570\u636E\u5E93\u540D</span>
    <span class="token comment">//      127.0.0.1:3306 - \u6570\u636E\u5E93\u7684\u5730\u5740\u548C\u7AEF\u53E3</span>
	orm<span class="token punctuation">.</span><span class="token function">RegisterDataBase</span><span class="token punctuation">(</span><span class="token string">&quot;default&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;username:password@tcp(127.0.0.1:3306)/db_name?charset=utf8&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	beego<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u521D\u59CB\u5316\u6570\u636E\u5E93\u8FDE\u63A5-1" tabindex="-1"><a class="header-anchor" href="#\u521D\u59CB\u5316\u6570\u636E\u5E93\u8FDE\u63A5-1" aria-hidden="true">#</a> \u521D\u59CB\u5316\u6570\u636E\u5E93\u8FDE\u63A5</h3><blockquote><p>\u4E00\u822C\u521D\u59CB\u5316\u6570\u636E\u5E93\u8FDE\u63A5\u90FD\u662F\u5728main.go\u5165\u53E3\u7684\u5730\u65B9\u8BBE\u7F6E\u4E00\u6B21\u5C31\u884C\uFF0C\u4E0B\u9762\u770B\u4E0Bmain.go\u6587\u4EF6\u6539\u6210\u4EC0\u4E48\u6837\u4E86\u3002</p></blockquote><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	beego <span class="token string">&quot;github.com/beego/beego/v2/server/web&quot;</span>
	<span class="token string">&quot;github.com/beego/beego/v2/client/orm&quot;</span>
	<span class="token boolean">_</span> <span class="token string">&quot;nsddd/routers&quot;</span>
	<span class="token comment">//\u5BFC\u5165mysql\u9A71\u52A8\uFF0C\u8FD9\u662F\u5FC5\u987B\u7684</span>
	<span class="token boolean">_</span> <span class="token string">&quot;github.com/go-sql-driver/mysql&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">//\u521D\u59CB\u5316\u5E94\u7528\u8BBE\u7F6E\uFF0C \u6211\u4EEC\u901A\u8FC7init\u51FD\u6570\u521D\u59CB\u5316\u6570\u636E\u5E93\u8FDE\u63A5\uFF0Cgo\u8BED\u8A00\u4E2D\u8FD9\u4E2A\u51FD\u6570\u4F1A\u4F18\u5148\u6267\u884C</span>
<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8FD9\u91CC\u6CE8\u518C\u4E00\u4E2Adefault\u9ED8\u8BA4\u6570\u636E\u5E93\uFF0C\u6570\u636E\u5E93\u9A71\u52A8\u662Fmysql.</span>
    <span class="token comment">// \u7B2C\u4E09\u4E2A\u53C2\u6570\u662F\u6570\u636E\u5E93dsn, \u914D\u7F6E\u6570\u636E\u5E93\u7684\u8D26\u53F7\u5BC6\u7801\uFF0C\u6570\u636E\u5E93\u540D\u7B49\u53C2\u6570</span>
    <span class="token comment">//  dsn\u53C2\u6570\u8BF4\u660E\uFF1A</span>
    <span class="token comment">//      username    - mysql\u8D26\u53F7</span>
    <span class="token comment">//      password    - mysql\u5BC6\u7801</span>
    <span class="token comment">//      db_name     - \u6570\u636E\u5E93\u540D</span>
    <span class="token comment">//      127.0.0.1:3306 - \u6570\u636E\u5E93\u7684\u5730\u5740\u548C\u7AEF\u53E3</span>
	orm<span class="token punctuation">.</span><span class="token function">RegisterDataBase</span><span class="token punctuation">(</span><span class="token string">&quot;default&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;username:password@tcp(127.0.0.1:3306)/db_name?charset=utf8&quot;</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	beego<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E3A\u4E86\u521D\u59CB\u5316mysql\u8FDE\u63A5\uFF0C\u5728\u5165\u53E3main.go\u6587\u4EF6\uFF0C\u589E\u52A0init\u51FD\u6570\u521D\u59CB\u5316\u6570\u636E\u5E93\u8BBE\u7F6E\u3002</p><h3 id="\u521B\u5EFAmodel" tabindex="-1"><a class="header-anchor" href="#\u521B\u5EFAmodel" aria-hidden="true">#</a> \u521B\u5EFAmodel</h3><p>\u7136\u540E\u521B\u5EFA\u4E00\u4E2Auser model, \u6587\u4EF6\u8DEF\u5F84\uFF1Ansddd/models/user.go , \u4EE3\u7801\u5982\u4E0B</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> models

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;github.com/beego/beego/v2/client/orm&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// \u5B9A\u4E49User\u6A21\u578B\uFF0C\u7ED1\u5B9Ausers\u8868\u7ED3\u6784, \u5176\u5B9E\u5C31\u662F\u7528\u6765\u4FDD\u5B58sql\u67E5\u8BE2\u7ED3\u679C\u3002</span>
<span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Id <span class="token builtin">int</span>
	Username <span class="token builtin">string</span>
	Password <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u5B9A\u4E49User \u6A21\u578B\u7ED1\u5B9A\u90A3\u4E2A\u8868\uFF1F</span>
<span class="token keyword">func</span> <span class="token punctuation">(</span>u <span class="token operator">*</span>User<span class="token punctuation">)</span> <span class="token function">TableName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u8FD4\u56DEmysql\u8868\u540D</span>
	<span class="token keyword">return</span> <span class="token string">&quot;users&quot;</span>
<span class="token punctuation">}</span>

<span class="token comment">//\u521D\u59CB\u5316\u51FD\u6570\uFF0C\u53EF\u4EE5\u7528\u6765\u5411orm\u6CE8\u518Cmodel</span>
<span class="token keyword">func</span> <span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// \u5411orm\u6CE8\u518Cuser\u6A21\u578B</span>
	orm<span class="token punctuation">.</span><span class="token function">RegisterModel</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>User<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// \u6839\u636Eid\u67E5\u8BE2\u7528\u6237\u4FE1\u606F</span>
<span class="token keyword">func</span> <span class="token function">GetUserById</span><span class="token punctuation">(</span>id <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token operator">*</span>User <span class="token punctuation">{</span>
	<span class="token keyword">if</span>  id <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span>  <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
    
    <span class="token comment">// \u521B\u5EFAorm\u5BF9\u8C61, \u540E\u9762\u90FD\u662F\u901A\u8FC7orm\u5BF9\u8C61\u64CD\u4F5C\u6570\u636E\u5E93</span>
	o <span class="token operator">:=</span> orm<span class="token punctuation">.</span><span class="token function">NewOrm</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	
	<span class="token comment">// \u521D\u59CB\u5316\u4E00\u4E2AUser\u6A21\u578B\u5BF9\u8C61</span>
	user <span class="token operator">:=</span> User<span class="token punctuation">{</span><span class="token punctuation">}</span>
	<span class="token comment">// \u8BBE\u7F6E\u67E5\u8BE2\u53C2\u6570</span>
	user<span class="token punctuation">.</span>Id <span class="token operator">=</span> id
	
	<span class="token comment">// \u8C03\u7528Read\u65B9\u6CD5\uFF0C\u6839\u636Euser\u8BBE\u7F6E\u7684\u53C2\u6570\uFF0C\u67E5\u8BE2\u4E00\u6761\u8BB0\u5F55\uFF0C\u7ED3\u679C\u4FDD\u5B58\u5230user\u7ED3\u6784\u4F53\u53D8\u91CF\u4E2D</span>
	<span class="token comment">// \u9ED8\u8BA4\u662F\u6839\u636E\u4E3B\u952E\u8FDB\u884C\u67E5\u8BE2</span>
	<span class="token comment">// \u7B49\u4EF7sql\uFF1A SELECT \`id\`, \`username\`, \`password\` FROM \`users\` WHERE \`id\` = 1</span>
	err <span class="token operator">:=</span> o<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">)</span>
	
	<span class="token comment">// \u68C0\u6D4B\u67E5\u8BE2\u7ED3\u679C\uFF0C</span>
	<span class="token keyword">if</span> err <span class="token operator">==</span> orm<span class="token punctuation">.</span>ErrNoRows <span class="token punctuation">{</span>
		<span class="token comment">// \u627E\u4E0D\u5230\u8BB0\u5F55</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> err <span class="token operator">==</span> orm<span class="token punctuation">.</span>ErrMissPK <span class="token punctuation">{</span>
		<span class="token comment">// \u627E\u4E0D\u5230\u4F4F\u5EFA</span>
		<span class="token keyword">return</span> <span class="token boolean">nil</span>
	<span class="token punctuation">}</span>
	
	<span class="token keyword">return</span> <span class="token operator">&amp;</span>user
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u901A\u8FC7\u63A7\u5236\u5668\u8C03\u7528model" tabindex="-1"><a class="header-anchor" href="#\u901A\u8FC7\u63A7\u5236\u5668\u8C03\u7528model" aria-hidden="true">#</a> \u901A\u8FC7\u63A7\u5236\u5668\u8C03\u7528model</h3><p>\u4FEE\u6539 \u63A7\u5236\u5668\u7684\u4EE3\u7801\uFF0C\u4E8B\u5B9E\u4E0A \u63A7\u5236\u5668\u4E5F\u662F\u6700\u540E\u53BB\u64CD\u4F5C\u7684\uFF0C\u6211\u4EEC\u7B2C\u4E00\u6B65\u5E94\u8BE5\u5904\u7406\u6570\u636E\u5E93\u7684\u4E00\u4E9B\u64CD\u4F5C\u3002</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>c <span class="token operator">*</span>MainController<span class="token punctuation">)</span> <span class="token function">Get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	c<span class="token punctuation">.</span>Data<span class="token punctuation">[</span><span class="token string">&quot;Website&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;nsddd.com&quot;</span>
	c<span class="token punctuation">.</span>Data<span class="token punctuation">[</span><span class="token string">&quot;Email&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;nsddd@demo.com&quot;</span>
	
	<span class="token comment">// \u8C03\u7528model\uFF0C\u67E5\u8BE2\u7528\u6237id\u4E3A1 \u7684\u7528\u6237\u4FE1\u606F</span>
    user <span class="token operator">:=</span> models<span class="token punctuation">.</span><span class="token function">GetUserById</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	
	<span class="token comment">// \u7136\u540E\u5C06user\u6570\u636E\u4FDD\u5B58\u5230Data\u4E2D, \u5C06\u53C2\u6570\u4F20\u7ED9\u540E\u9762\u7684views\u89C6\u56FE\u6A21\u677F\u5904\u7406</span>
	c<span class="token punctuation">.</span>Data<span class="token punctuation">[</span><span class="token string">&quot;user&quot;</span><span class="token punctuation">]</span> <span class="token operator">=</span> user
	
	<span class="token comment">// \u4F7F\u7528\u65B0\u7684\u89C6\u56FE\u6A21\u677Fuser.tpl</span>
	c<span class="token punctuation">.</span>TplName <span class="token operator">=</span> <span class="token string">&quot;user.tpl&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u7F16\u5199view\u89C6\u56FE\u903B\u8F91" tabindex="-1"><a class="header-anchor" href="#\u7F16\u5199view\u89C6\u56FE\u903B\u8F91" aria-hidden="true">#</a> \u7F16\u5199view\u89C6\u56FE\u903B\u8F91</h3><p>\u8FD9\u91CC\u7F16\u5199\u4E00\u4E2A\u65B0\u7684\u89C6\u56FE\u6A21\u677F, \u4EE3\u7801\u5982\u4E0B:</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token operator">&lt;</span><span class="token operator">!</span>DOCTYPE html<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>html lang<span class="token operator">=</span><span class="token string">&quot;zh-CN&quot;</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>head<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>title<span class="token operator">&gt;</span>Demo<span class="token operator">&lt;</span><span class="token operator">/</span>title<span class="token operator">&gt;</span>
	<span class="token operator">&lt;</span>meta charset<span class="token operator">=</span><span class="token string">&quot;utf-8&quot;</span><span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>head<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span>h1<span class="token operator">&gt;</span>\u7F51\u7AD9<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">.</span>Website<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>h1<span class="token operator">&gt;</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span> <span class="token keyword">if</span> <span class="token punctuation">.</span>user <span class="token punctuation">}</span><span class="token punctuation">}</span>
\u7528\u6237\u540D<span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token punctuation">.</span>user<span class="token punctuation">.</span>Username<span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token punctuation">{</span><span class="token punctuation">{</span><span class="token keyword">else</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
\u67E5\u627E\u4E0D\u5230\u7528\u6237
<span class="token punctuation">{</span><span class="token punctuation">{</span> end <span class="token punctuation">}</span><span class="token punctuation">}</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>body<span class="token operator">&gt;</span>
<span class="token operator">&lt;</span><span class="token operator">/</span>html<span class="token operator">&gt;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,67),M=e("\u8BBF\u95EEurl: "),I={href:"http://localhost:8080/",target:"_blank",rel:"noopener noreferrer"},B=e("http://localhost:8080"),D=e(", \u5982\u679C\u67E5\u8BE2\u7684\u7528\u6237\u5B58\u5728\uFF0C\u5219\u663E\u793A\u7528\u6237\u540D\uFF0C\u5426\u5219\u663E\u793A\u67E5\u627E\u4E0D\u5230\u7528\u6237\u3002"),H=i(`<h3 id="\u9879\u76EE\u6253\u5305" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u6253\u5305" aria-hidden="true">#</a> \u9879\u76EE\u6253\u5305</h3><p>\u9879\u76EE\u5B8C\u6210\u540E\u9700\u8981\u5C06\u4EE3\u7801\u6253\u5305\u53D1\u5E03\u5230\u7EBF\u4E0A\uFF0C\u8FD9\u91CC\u4F9D\u7136\u63A8\u8350\u4F7F\u7528bee\u5DE5\u5177\u6253\u5305\uFF0Cbee\u5DE5\u5177\u53EF\u4EE5\u4E00\u952E\u5C06\u9879\u76EE\u9700\u8981\u7684\u76F8\u5173\u6587\u4EF6\u4E00\u8D77\u6253\u5305\u6210\u4E00\u4E2A\u538B\u7F29\u5305\uFF0C\u53EA\u9700\u8981\u5230\u7EBF\u4E0A\u89E3\u538B\u5373\u53EF\u3002</p><p>\u4E0B\u9762\u662Fbee\u6253\u5305\u7684\u4F8B\u5B50\uFF0C \u9996\u5148\u5C06\u547D\u4EE4\u7A97\u53E3\u7684\u76EE\u5F55\u5207\u6362\u5230 &quot;\u9879\u76EE\u6839\u76EE\u5F55&quot;, \u7136\u540E\u6267\u884C\u4E0B\u9762\u547D\u4EE4</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>bee pack
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u6253\u5305\u6210\u529F\u540E\u518D\u9879\u76EE\u6839\u76EE\u5F55\u4E0B\u751F\u6210\u4E00\u4E2A <code>nsddd.tar.gz</code> \u7684\u538B\u7F29\u5305\uFF0C\u547D\u540D\u683C\u5F0F: <code>\${\u9879\u76EE\u540D}.tar.gz</code></p><p>\u6211\u4EEC\u53EF\u4EE5\u89E3\u538B\u7F29\uFF0C\u770B\u770B\u538B\u7F29\u5305\u5305\u542B\u4EC0\u4E48\u5185\u5BB9\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>nsddd.tar.gz
\u251C\u2500\u2500 conf            - \u914D\u7F6E\u6587\u4EF6\u5B58\u653E\u76EE\u5F55,\u8FD9\u91CC\u5305\u542B\u6211\u4EEC\u7684\u914D\u7F6E\u6587\u4EF6
\u251C\u2500\u2500 static          - \u9759\u6001\u8D44\u6E90\u76EE\u5F55\uFF0C\u5305\u542B\u6211\u4EEC\u9759\u6001\u8D44\u6E90\u6587\u4EF6
\u251C\u2500\u2500 views           - \u89C6\u56FE\u6A21\u677F\u76EE\u5F55\uFF0C\u5305\u542B\u6A21\u677F\u6587\u4EF6
\u2514\u2500\u2500 nsddd         - \u8FD9\u4E2A\u5C31\u662F\u6211\u4EEC\u7684\u9879\u76EE\u6253\u5305\u540E\u7684\u53EF\u6267\u884C\u7A0B\u5E8F\uFF0C\u6309\u6211\u4EEC\u9879\u76EE\u547D\u540D
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="beego-\u6E90\u7801" tabindex="-1"><a class="header-anchor" href="#beego-\u6E90\u7801" aria-hidden="true">#</a> beego \u6E90\u7801</h2><p>\u5B98\u65B9\u63D0\u4F9B\u7684\u793A\u4F8B\u975E\u5E38\u7B80\u5355\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;github.com/astaxie/beego&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    beego<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),O=e("\u90A3\u4E48\uFF0C\u4ECE"),F=n("code",null,"Run()",-1),G=e("\u65B9\u6CD5\u5F00\u59CB\uFF0C\u5728"),U={href:"https://github.com/astaxie/beego/blob/master/beego.go#L179",target:"_blank",rel:"noopener noreferrer"},V=e("beego.go#179"),W=e("\uFF1A"),z=i(`<div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">initBeforeHTTPRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> EnableAdmin <span class="token punctuation">{</span>
        <span class="token keyword">go</span> beeAdminApp<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    BeeApp<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5728\u6700\u91CC\u9762\u7684\u770B\u770B <code>initBeforeHTTPRun()</code></p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token comment">// TODO move to module init function</span>
<span class="token keyword">func</span> <span class="token function">initBeforeHTTPRun</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	initHttpOnce<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span><span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token comment">// init hooks</span>
		<span class="token function">AddAPPStartHook</span><span class="token punctuation">(</span>
			registerMime<span class="token punctuation">,</span>
			registerDefaultErrorHandler<span class="token punctuation">,</span>
			registerSession<span class="token punctuation">,</span>
			registerTemplate<span class="token punctuation">,</span>
			registerAdmin<span class="token punctuation">,</span>
			registerGzip<span class="token punctuation">,</span>
			<span class="token comment">// registerCommentRouter,</span>
		<span class="token punctuation">)</span>

		<span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> hk <span class="token operator">:=</span> <span class="token keyword">range</span> hooks <span class="token punctuation">{</span>
			<span class="token keyword">if</span> err <span class="token operator">:=</span> <span class="token function">hk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
				<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4ECE\u4EE3\u7801\u770B\u5230\u5728<code>Run()</code>\u7684\u7B2C\u4E00\u6B65\uFF0C\u521D\u59CB\u5316<code>AppConfig</code>\uFF0C\u8C03\u7528<code>hooks</code>\uFF0C\u521D\u59CB\u5316<code>GlobalSessions</code>\uFF0C\u7F16\u8BD1\u6A21\u677F<code>BuildTemplate()</code>\uFF0C\u548C\u52A0\u8F7D\u4E2D\u95F4\u4EF6<code>middleware.RegisterErrorHandler()</code>\uFF0C\u5206\u522B\u7B80\u5355\u53D9\u8FF0\u3002</p><h3 id="\u52A0\u8F7D\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u52A0\u8F7D\u914D\u7F6E" aria-hidden="true">#</a> \u52A0\u8F7D\u914D\u7F6E</h3><p>\u52A0\u8F7D\u914D\u7F6E\u7684\u4EE3\u7801\u662F\uFF1A</p><div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">if</span> AppConfigPath <span class="token operator">!=</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>AppPath<span class="token punctuation">,</span> <span class="token string">&quot;conf&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;app.conf&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    err <span class="token operator">:=</span> <span class="token function">ParseConfig</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token operator">&amp;&amp;</span> AppConfigPath <span class="token operator">!=</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>workPath<span class="token punctuation">,</span> <span class="token string">&quot;conf&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;app.conf&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// configuration is critical to app, panic here if parse failed</span>
        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,7),J=e("\u5224\u65AD\u914D\u7F6E\u6587\u4EF6\u662F\u4E0D\u662F"),X=n("code",null,"AppPath/conf/app.conf",-1),K=e("\uFF0C\u5982\u679C\u4E0D\u662F\u5C31"),Y=n("code",null,"ParseConfig()",-1),j=e("\u3002\u663E\u7136\u4ED6\u4E4B\u524D\u5C31\u5DF2\u7ECF\u52A0\u8F7D\u8FC7\u4E00\u6B21\u4E86\u3002\u627E\u4E86\u4E00\u4E0B\uFF0C\u5728"),Q={href:"https://github.com/astaxie/beego/blob/master/config.go#L152",target:"_blank",rel:"noopener noreferrer"},$=e("config.go#L152"),Z=e("\uFF0C\u5177\u4F53\u52A0\u8F7D\u4EC0\u4E48\u5C31\u4E0D\u8BF4\u660E\u4E86\u3002\u9700\u8981\u8BF4\u660E\u7684\u662F"),nn=n("code",null,"AppPath",-1),en=e("\u548C"),sn=n("code",null,"workPath",-1),an=e("\u8FD9\u4FE9\u53D8\u91CF\u3002\u627E\u5230\u5B9A\u4E49"),tn={href:"https://github.com/astaxie/beego/blob/master/config.go#L72",target:"_blank",rel:"noopener noreferrer"},on=e("config.go#72"),ln=e("\uFF1A"),cn=i(`<div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code>workPath<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> os<span class="token punctuation">.</span><span class="token function">Getwd</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
workPath<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> filepath<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span>workPath<span class="token punctuation">)</span>
<span class="token comment">// initialize default configurations</span>
AppPath<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">=</span> filepath<span class="token punctuation">.</span><span class="token function">Abs</span><span class="token punctuation">(</span>filepath<span class="token punctuation">.</span><span class="token function">Dir</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

AppConfigPath <span class="token operator">=</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>AppPath<span class="token punctuation">,</span> <span class="token string">&quot;conf&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;app.conf&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">if</span> workPath <span class="token operator">!=</span> AppPath <span class="token punctuation">{</span>
    <span class="token keyword">if</span> utils<span class="token punctuation">.</span><span class="token function">FileExists</span><span class="token punctuation">(</span>AppConfigPath<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        os<span class="token punctuation">.</span><span class="token function">Chdir</span><span class="token punctuation">(</span>AppPath<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        AppConfigPath <span class="token operator">=</span> filepath<span class="token punctuation">.</span><span class="token function">Join</span><span class="token punctuation">(</span>workPath<span class="token punctuation">,</span> <span class="token string">&quot;conf&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;app.conf&quot;</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>workPath</code>\u662F<code>os.Getwd()</code>\uFF0C\u5373\u5F53\u524D\u7684\u76EE\u5F55\uFF1B<code>AppPath</code>\u662F<code>os.Args[0]</code>\uFF0C\u5373\u4E8C\u8FDB\u5236\u6587\u4EF6\u6240\u5728\u76EE\u5F55\u3002\u6709\u4E9B\u60C5\u51B5\u4E0B\u8FD9\u4E24\u4E2A\u662F\u4E0D\u540C\u7684\u3002\u6BD4\u5982\u628A\u547D\u4EE4\u52A0\u5230<code>PATH</code>\u4E2D\uFF0C\u7136\u540Ecd\u5230\u522B\u7684\u76EE\u5F55\u6267\u884C\u3002<code>beego</code>\u4EE5\u4E8C\u8FDB\u5236\u6587\u4EF6\u6240\u5728\u76EE\u5F55\u4E3A\u4F18\u5148\u3002\u5982\u679C\u4E8C\u8FDB\u5236\u6587\u4EF6\u6240\u5728\u76EE\u5F55\u6CA1\u6709\u53D1\u73B0<code>conf/app.conf</code>\uFF0C\u518D\u53BB<code>workPath</code>\u91CC\u627E\u3002</p><h3 id="hooks" tabindex="-1"><a class="header-anchor" href="#hooks" aria-hidden="true">#</a> Hooks</h3>`,3),dn=n("code",null,"hooks",-1),rn=e("\u5C31\u662F\u94A9\u5B50\uFF0C\u5728\u52A0\u8F7D\u914D\u7F6E\u540E\u5C31\u6267\u884C\uFF0C\u8FD9\u662F\u8981\u505A\u5565\u5462\uFF1F\u5728 "),pn={href:"https://github.com/astaxie/beego/blob/master/beego.go#L173",target:"_blank",rel:"noopener noreferrer"},un=e("beego.go#L173"),vn=e(" \u6DFB\u52A0\u65B0\u7684hook\uFF1A"),mn=i(`<div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token comment">// The hookfunc will run in beego.Run()</span>
<span class="token comment">// such as sessionInit, middlerware start, buildtemplate, admin start</span>
<span class="token keyword">func</span> <span class="token function">AddAPPStartHook</span><span class="token punctuation">(</span>hf hookfunc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    hooks <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>hooks<span class="token punctuation">,</span> hf<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),bn=n("code",null,"hooks",-1),kn=e("\u7684\u5B9A\u4E49\u5728"),gn={href:"https://github.com/astaxie/beego/blob/master/beego.go#L19",target:"_blank",rel:"noopener noreferrer"},hn=e("beego.go#L19"),fn=e("\uFF1A"),_n=i(`<div class="language-go ext-go line-numbers-mode"><pre class="language-go"><code><span class="token keyword">type</span> hookfunc <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">error</span> <span class="token comment">//hook function to run</span>
<span class="token keyword">var</span> hooks <span class="token punctuation">[</span><span class="token punctuation">]</span>hookfunc       <span class="token comment">//hook function slice to store the hookfunc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>hook</code>\u5C31\u662F<code>func() error</code>\u7C7B\u578B\u7684\u51FD\u6570\u3002\u90A3\u4E48\u4E3A\u4EC0\u4E48\u8C03\u7528<code>hooks</code>\u53EF\u4EE5\u5B9E\u73B0\u4EE3\u7801\u6CE8\u91CA\u4E2D\u7684\u5982<code>middleware start, build template</code>\u5462\uFF1F\u56E0\u4E3A<code>beego</code>\u4F7F\u7528\u7684\u662F\u5355\u5B9E\u4F8B\u7684\u6A21\u5F0F\u3002</p><h3 id="\u5355\u5B9E\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u5355\u5B9E\u4F8B" aria-hidden="true">#</a> \u5355\u5B9E\u4F8B</h3><p><code>beego</code>\u7684\u6838\u5FC3\u7ED3\u6784\u662F<code>beego.APP</code>\uFF0C\u4FDD\u5B58\u8DEF\u7531\u8C03\u5EA6\u7ED3\u6784<code>*beego.ControllerRegistor</code>\u3002\u4ECE<code>beego.Run()</code>\u65B9\u6CD5\u7684\u4EE3\u7801<code>BeeApp.Run()</code>\u53D1\u73B0\uFF0C<code>beego</code>\u6709\u4E00\u4E2A\u5168\u5C40\u53D8\u91CF<code>BeeApp</code>\u662F\u5B9E\u9645\u8C03\u7528\u7684<code>*beego.APP</code>\u5B9E\u4F8B\u3002\u4E5F\u5C31\u662F\u8BF4\u6574\u4E2A<code>beego</code>\u5C31\u662F\u4E00\u4E2A\u5B9E\u4F8B\uFF0C\u4E0D\u9700\u8981\u7C7B\u4F3C<code>NewApp()</code>\u8FD9\u6837\u7684\u5199\u6CD5\u3002</p>`,4),xn=e("\u56E0\u6B64\uFF0C\u5F88\u591A\u7ED3\u6784\u90FD\u4F5C\u4E3A\u5168\u5C40\u53D8\u91CF\u5982"),qn=n("code",null,"beego.BeeApp",-1),wn=e("\u66B4\u9732\u5728\u5916\u3002\u8BE6\u7EC6\u7684\u5B9A\u4E49\u5728 "),yn={href:"https://github.com/astaxie/beego/blob/master/config.go#L18",target:"_blank",rel:"noopener noreferrer"},Cn=e("config.go#L18"),Tn=e("\uFF0C\u7279\u522B\u6CE8\u610F\u4E00\u4E0B"),Rn=n("code",null,"SessionProvider(string)",-1),Pn=e("\uFF0C\u9A6C\u4E0A\u5C31\u8981\u63D0\u5230\u3002"),An=i('<h3 id="\u4F1A\u8BDD-globalsessions" tabindex="-1"><a class="header-anchor" href="#\u4F1A\u8BDD-globalsessions" aria-hidden="true">#</a> \u4F1A\u8BDD <code>GlobalSessions</code></h3><p>\u7EE7\u7EED<code>beego.Run()</code>\u7684\u9605\u8BFB\uFF0C<code>hooks</code>\u8C03\u7528\u5B8C\u6BD5\u540E\uFF0C\u521D\u59CB\u5316\u4F1A\u8BDD<code>GlobalSessions</code>\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if SessionOn {\n    var err error\n    sessionConfig := AppConfig.String(&quot;sessionConfig&quot;)\n    if sessionConfig == &quot;&quot; {\n        sessionConfig = `{&quot;cookieName&quot;:&quot;` + SessionName + `&quot;,` +\n            `&quot;gclifetime&quot;:` + strconv.FormatInt(SessionGCMaxLifetime, 10) + `,` +\n            `&quot;providerConfig&quot;:&quot;` + SessionSavePath + `&quot;,` +\n            `&quot;secure&quot;:` + strconv.FormatBool(HttpTLS) + `,` +\n            `&quot;sessionIDHashFunc&quot;:&quot;` + SessionHashFunc + `&quot;,` +\n            `&quot;sessionIDHashKey&quot;:&quot;` + SessionHashKey + `&quot;,` +\n            `&quot;enableSetCookie&quot;:` + strconv.FormatBool(SessionAutoSetCookie) + `,` +\n            `&quot;cookieLifeTime&quot;:` + strconv.Itoa(SessionCookieLifeTime) + `}`\n    }\n    GlobalSessions, err = session.NewManager(SessionProvider,\n        sessionConfig)\n    if err != nil {\n        panic(err)\n    }\n    go GlobalSessions.GC()\n}\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>beego.SessionOn</code>\u5B9A\u4E49\u662F\u5426\u542F\u52A8Session\u529F\u80FD\uFF0C\u7136\u540E<code>sessionConfig</code>\u662FSession\u7684\u914D\u7F6E\uFF0C\u5982\u679C\u914D\u7F6E\u4E3A\u7A7A\uFF0C\u5C31\u4F7F\u7528\u62FC\u63A5\u7684\u9ED8\u8BA4\u914D\u7F6E\u3002<code>sessionConfig</code>\u662Fjson\u683C\u5F0F\u3002</p><p><code>session.NewManager()</code>\u8FD4\u56DE<code>*session.Manager</code>\uFF0Csession\u7684\u6570\u636E\u5B58\u50A8\u5F15\u64CE\u662F<code>beego.SessionProvider</code>\u5B9A\u4E49\uFF0C\u6BD4\u5982&quot;file\u201D\uFF0C\u6587\u4EF6\u5B58\u50A8\u3002</p>',5),Sn=n("code",null,"go GlobalSessions.GC()",-1),En=e("\u5F00\u542F\u4E00\u4E2Agoroutine\u6765\u5904\u7406session\u7684\u56DE\u6536\u3002\u9605\u8BFB\u4E00\u4E0B"),Nn=n("code",null,"GC()",-1),Ln=e("\u7684\u4EE3\u7801\uFF0C\u5728 "),Mn={href:"https://github.com/astaxie/beego/blob/master/session/session.go#L183",target:"_blank",rel:"noopener noreferrer"},In=e("session/session.go#L183"),Bn=e("\uFF1A"),Dn=i(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>func (manager *Manager) GC() {
    manager.provider.SessionGC()
    time.AfterFunc(time.Duration(manager.config.Gclifetime)*time.Second, func() { manager.GC() })
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u662F\u4E2A<strong>\u65E0\u9650\u5FAA\u73AF</strong>\u3002<code>time.AfterFunc()</code>\u5728\u7ECF\u8FC7\u4E00\u6BB5\u65F6\u95F4\u95F4\u9694<code>time.Duration(...)</code>\u4E4B\u540E\uFF0C\u53C8\u8C03\u7528\u81EA\u5DF1\uFF0C\u76F8\u5F53\u4E8E\u53C8\u5F00\u59CB\u542F\u52A8<code>time.AfterFunc()</code>\u7B49\u5F85\u4E0B\u4E00\u6B21\u5230\u671F\u3002<code>manager.provider.SessionGC()</code>\u662F\u4E0D\u540Csession\u5B58\u50A8\u5F15\u64CE\u7684\u56DE\u6536\u65B9\u6CD5\uFF08\u5176\u5B9E\u662F<code>session.Provider</code>\u63A5\u53E3\u7684\uFF09\u3002</p><h3 id="\u6A21\u677F\u6784\u5EFA" tabindex="-1"><a class="header-anchor" href="#\u6A21\u677F\u6784\u5EFA" aria-hidden="true">#</a> \u6A21\u677F\u6784\u5EFA</h3><p>\u7EE7\u7EED<code>beego.Run()</code>\uFF0Csession\u521D\u59CB\u5316\u540E\uFF0C\u6784\u5EFA\u6A21\u677F\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>err := BuildTemplate(ViewsPath)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,5),Hn=n("code",null,"beego.ViewsPath",-1),On=e("\u662F\u6A21\u677F\u7684\u76EE\u5F55\u5566\uFF0C\u4E0D\u591A\u8BF4\u3002\u4ED4\u7EC6\u6765\u770B\u770B"),Fn=n("code",null,"BuildTemplate()",-1),Gn=e("\u51FD\u6570\uFF0C"),Un={href:"https://github.com/astaxie/beego/blob/master/template.go#L114",target:"_blank",rel:"noopener noreferrer"},Vn=e("template.goL#114"),Wn=e("\uFF1A"),zn=i(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// build all template files in a directory.
// it makes beego can render any template file in view directory.
func BuildTemplate(dir string) error {
    if _, err := os.Stat(dir); err != nil {
        if os.IsNotExist(err) {
            return nil
        } else {
            return errors.New(&quot;dir open err&quot;)
        }
    }
    self := &amp;templatefile{
        root:  dir,
        files: make(map[string][]string),
    }
    err := filepath.Walk(dir, func(path string, f os.FileInfo, err error) error {
        return self.visit(path, f, err)
    })
    if err != nil {
        fmt.Printf(&quot;filepath.Walk() returned %v\\n&quot;, err)
        return err
    }
    for _, v := range self.files {
        for _, file := range v {
            t, err := getTemplate(self.root, file, v...)
            if err != nil {
                Trace(&quot;parse template err:&quot;, file, err)
            } else {
                BeeTemplates[file] = t
            }
        }
    }
    return nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6BD4\u8F83\u590D\u6742\u3002\u4E00\u70B9\u70B9\u6765\u770B\uFF0C<code>os.Stat(dir)</code>\u5224\u65AD\u76EE\u5F55\u662F\u5426\u5B58\u5728\u3002<code>filepath.Walk()</code>\u8D70\u4E00\u8FB9\u76EE\u5F55\u91CC\u7684\u6587\u4EF6\uFF0C\u8BB0\u5F55\u5728<code>self.files</code>\u91CC\u9762\u3002\u5FAA\u73AF<code>self.files</code>\u4E2D\u7684<code>file</code>\uFF08map[dir][]file])\uFF0C\u7528<code>getTemplate</code>\u83B7\u53D6<code>*template.Template</code>\u5B9E\u4F8B\uFF0C\u4FDD\u5B58\u5728<code>beego.BeeTemplates</code>\uFF08map[string]*template.Template\uFF09\u3002</p><p>\u4E3A\u4EC0\u4E48\u8981<strong>\u9884\u5148\u7F16\u8BD1</strong>\u6A21\u677F\uFF1F\u60F3\u50CF\u4E00\u4E0B\uFF0C\u5982\u679C\u6BCF\u6B21\u8BF7\u6C42\uFF0C\u90FD\u53BB\u5BFB\u627E\u6A21\u677F\u518D\u7F16\u8BD1\u4E00\u904D\u3002\u8FD9\u663E\u7136\u662F\u4E2A\u6D6A\u8D39\u7684\u3002\u800C\u4E14\u5982\u679C\u6A21\u677F\u590D\u6742\uFF0C\u5D4C\u5957\u4F17\u591A\uFF0C\u7F16\u8BD1\u901F\u5EA6\u4F1A\u662F\u5F88\u5927\u7684\u95EE\u9898\u3002\u56E0\u6B64\u5B58\u4E0B\u7F16\u8BD1\u597D\u7684<code>*template.Template</code>\u662F\u5FC5\u7136\u7684\u9009\u62E9\u3002\u4F46\u662F\uFF0C\u7F16\u8BD1\u540E\u6A21\u677F\u7684\u4FEE\u6539\u4E0D\u80FD\u7ACB\u5373\u54CD\u5E94\u4E86\uFF0C\u600E\u4E48\u529E\u5462\uFF1F\u5148\u7EE7\u7EED\u770B\u4E0B\u53BB\u3002</p><h3 id="\u4E2D\u95F4\u4EF6" tabindex="-1"><a class="header-anchor" href="#\u4E2D\u95F4\u4EF6" aria-hidden="true">#</a> \u4E2D\u95F4\u4EF6</h3><p><code>middleware</code>\u5305\u76EE\u524D\u4F3C\u4E4E\u53EA\u6709\u9519\u8BEF\u5904\u7406\u7684\u529F\u80FD\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>middleware.RegisterErrorHandler()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u53EA\u662F\u6CE8\u518C\u9ED8\u8BA4\u7684\u9519\u8BEF\u5904\u7406\u65B9\u6CD5 <code>middleware.NotFound</code> \u7B49\u51E0\u4E2A\u3002</p><h3 id="beeadminapp" tabindex="-1"><a class="header-anchor" href="#beeadminapp" aria-hidden="true">#</a> beeAdminApp</h3><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if EnableAdmin {
    go beeAdminApp.Run()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),Jn=n("code",null,"beeAdminApp",-1),Xn=e("\u4E5F\u662F\u4E00\u4E2A"),Kn=n("code",null,"*beego.adminApp",-1),Yn=e("\uFF0C\u8D1F\u8D23\u7CFB\u7EDF\u76D1\u63A7\u3001\u6027\u80FD\u68C0\u6D4B\u3001\u8BBF\u95EE\u7EDF\u8BA1\u548C\u5065\u5EB7\u68C0\u67E5\u7B49\u3002\u5177\u4F53\u7684\u4ECB\u7ECD\u548C\u4F7F\u7528\u53EF\u4EE5\u8BBF\u95EE"),jn={href:"http://www.oschina.net/#",target:"_blank",rel:"noopener noreferrer"},Qn=e("\u6587\u6863"),$n=e("\u3002"),Zn=i(`<h2 id="http\u670D\u52A1" tabindex="-1"><a class="header-anchor" href="#http\u670D\u52A1" aria-hidden="true">#</a> HTTP\u670D\u52A1</h2><p>\u5199\u4E86\u8FD9\u4E48\u591A\uFF0C\u7EC8\u4E8E\u8981\u5F00\u59CB\u8BB2\u6838\u5FC3\u7ED3\u6784<code>beego.BeeApp</code>\u7684\u542F\u52A8\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>BeeApp.Run()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,3),ne=n("code",null,"Run()",-1),ee=e("\u7684\u5B9E\u73B0\u4EE3\u7801\u5728"),se={href:"https://github.com/astaxie/beego/blob/master/app.go#L29",target:"_blank",rel:"noopener noreferrer"},ae=e("app.go#L29"),ie=e("\u3002\u4EE3\u7801\u8F83\u957F\uFF0C\u770B\u770B\u6700\u91CD\u8981\u7684\u4E00\u6BB5\uFF1A"),te=i(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if UseFcgi {
    if HttpPort == 0 {
        l, err = net.Listen(&quot;unix&quot;, addr)
    } else {
        l, err = net.Listen(&quot;tcp&quot;, addr)
    }
    if err != nil {
        BeeLogger.Critical(&quot;Listen: &quot;, err)
    }
    err = fcgi.Serve(l, app.Handlers)
} else {
    if EnableHotUpdate {
        server := &amp;http.Server{
            Handler:      app.Handlers,
            ReadTimeout:  time.Duration(HttpServerTimeOut) * time.Second,
            WriteTimeout: time.Duration(HttpServerTimeOut) * time.Second,
        }
        laddr, err := net.ResolveTCPAddr(&quot;tcp&quot;, addr)
        if nil != err {
            BeeLogger.Critical(&quot;ResolveTCPAddr:&quot;, err)
        }
        l, err = GetInitListener(laddr)
        theStoppable = newStoppable(l)
        err = server.Serve(theStoppable)
        theStoppable.wg.Wait()
        CloseSelf()
    } else {
        s := &amp;http.Server{
            Addr:         addr,
            Handler:      app.Handlers,
            ReadTimeout:  time.Duration(HttpServerTimeOut) * time.Second,
            WriteTimeout: time.Duration(HttpServerTimeOut) * time.Second,
        }
        if HttpTLS {
            err = s.ListenAndServeTLS(HttpCertFile, HttpKeyFile)
        } else {
            err = s.ListenAndServe()
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),oe=n("code",null,"beego.UseFcgi",-1),le=e("\u5B9A\u4E49\u662F\u5426\u4F7F\u7528"),ce=n("code",null,"fast-cgi",-1),de=e("\u670D\u52A1\uFF0C\u800C\u4E0D\u662FHTTP\u3002\u53E6\u4E00\u90E8\u5206\u662F\u542F\u52A8HTTP\u3002\u91CC\u9762\u6709\u4E2A\u91CD\u8981\u529F\u80FD"),re=n("code",null,"EnableHotUpdate",-1),pe=e("\u2014\u2014\u2014\u2014"),ue=n("strong",null,"\u70ED\u66F4\u65B0",-1),ve=e("\u3002\u5BF9\u4ED6\u7684\u63CF\u8FF0\uFF0C\u53EF\u4EE5\u770B\u770B\u5B98\u65B9"),me={href:"http://beego.me/docs/advantage/reload.md",target:"_blank",rel:"noopener noreferrer"},be=e("\u6587\u6863"),ke=e("\u3002"),ge=n("h3",{id:"_2-1-http\u8FC7\u7A0B\u603B\u89C8",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-1-http\u8FC7\u7A0B\u603B\u89C8","aria-hidden":"true"},"#"),e(" 2.1 HTTP\u8FC7\u7A0B\u603B\u89C8")],-1),he=e("\u4E0A\u9762\u7684\u4EE3\u7801\u770B\u5F97\u5230"),fe=n("code",null,"*http.Server.Handler",-1),_e=e("\u662F"),xe=n("code",null,"app.Handlers",-1),qe=e("\uFF0C\u5373"),we=n("code",null,"*beego.ControllerRegistor",-1),ye=e("\uFF0C"),Ce=n("code",null,"ServeHTTP",-1),Te=e("\u5C31\u5B9A\u4E49\u5728\u4EE3\u7801"),Re={href:"https://github.com/astaxie/beego/blob/master/router.go#L431",target:"_blank",rel:"noopener noreferrer"},Pe=e("router.go#L431"),Ae=e("\u3002\u975E\u5E38\u957F\uFF0C\u6211\u4EEC\u68C0\u51FA\u91CD\u8981\u7684\u90E8\u5206\u6765\u8BF4\u8BF4\u3002"),Se=i(`<p>\u9996\u5148\u662F\u8981\u521B\u5EFA\u5F53\u524D\u8BF7\u6C42\u7684\u4E0A\u4E0B\u6587\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// init context
context := &amp;beecontext.Context{
    ResponseWriter: w,
    Request:        r,
    Input:          beecontext.NewInput(r),
    Output:         beecontext.NewOutput(),
}
context.Output.Context = context
context.Output.EnableGzip = EnableGzip
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>context</code>\u7684\u7C7B\u578B\u662F<code>*context.Context</code>\uFF0C\u628A\u5F53\u524D\u7684<code>w(http.ResponseWriter)</code>\u548C<code>r(*http.Request)</code>\u5199\u5728<code>context</code>\u7684\u5B57\u6BB5\u4E2D\u3002</p><p>\u7136\u540E\uFF0C\u5B9A\u4E49\u4E86\u8FC7\u6EE4\u5668<code>filter</code>\u7684\u8C03\u7528\u65B9\u6CD5\uFF0C\u628A<code>context</code>\u4F20\u9012\u7ED9\u8FC7\u6EE4\u5668\u64CD\u4F5C\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>do_filter := func(pos int) (started bool) {
    if p.enableFilter {
        if l, ok := p.filters[pos]; ok {
            for _, filterR := range l {
                if ok, p := filterR.ValidRouter(r.URL.Path); ok {
                    context.Input.Params = p
                    filterR.filterFunc(context)
                    if w.started {
                        return true
                    }
                }
            }
        }
    }
    return false
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\uFF0C\u52A0\u8F7DSession\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if SessionOn {
    context.Input.CruSession = GlobalSessions.SessionStart(w, r)
    defer func() {
        context.Input.CruSession.SessionRelease(w)
    }()
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>defer</code>\u4E2D\u7684<code>SessionRelease()</code>\u662F\u5C06session\u6301\u4E45\u5316\u5230\u5B58\u50A8\u5F15\u64CE\u4E2D\uFF0C\u6BD4\u5982\u5199\u5165\u6587\u4EF6\u4FDD\u5B58\u3002</p><p>\u7136\u540E\uFF0C\u5224\u65AD\u8BF7\u6C42\u65B9\u5F0F\u662F\u5426\u652F\u6301\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if !utils.InSlice(strings.ToLower(r.Method), HTTPMETHOD) {
    http.Error(w, &quot;Method Not Allowed&quot;, 405)
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u8FD9\u91CC\u770B\u4E00\u770B\u5230 <code>goto Admin</code>\uFF0C\u5C31\u662F\u6267\u884C<code>AdminApp</code>\u7684\u76D1\u63A7\u64CD\u4F5C\uFF0C\u8BB0\u5F55\u8FD9\u6B21\u8BF7\u6C42\u7684\u76F8\u5173\u4FE1\u606F\u3002<code>Admin</code>\u5B9A\u4E49\u5728\u6574\u4E2AHTTP\u6267\u884C\u7684\u6700\u540E\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>Admin:
    //admin module record QPS
    if EnableAdmin {
        timeend := time.Since(starttime)
        if FilterMonitorFunc(r.Method, requestPath, timeend) {
            if runrouter != nil {
                go toolbox.StatisticsMap.AddStatistics(r.Method, requestPath, runrouter.Name(), timeend)
            } else {
                go toolbox.StatisticsMap.AddStatistics(r.Method, requestPath, &quot;&quot;, timeend)
            }
        }
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6240\u4EE5<code>goto Admin</code>\u76F4\u63A5\u5C31\u8DF3\u8FC7\u4E2D\u95F4\u8FC7\u7A0B\uFF0C\u8D70\u5230HTTP\u6267\u884C\u7684\u6700\u540E\u4E86\u3002\u663E\u7136\uFF0C\u5F53\u8BF7\u6C42\u65B9\u5F0F\u4E0D\u652F\u6301\u7684\u65F6\u5019\uFF0C\u76F4\u63A5\u8DF3\u5230HTTP\u6267\u884C\u6700\u540E\u3002\u5982\u679C\u4E0D\u542F\u7528<code>AdminApp</code>\uFF0C\u90A3\u5C31\u662FHTTP\u6267\u884C\u8FC7\u7A0B\u7ED3\u675F\u3002</p><p>\u7EE7\u7EED\u9605\u8BFB\uFF0C\u5F00\u59CB\u5904\u7406\u9759\u6001\u6587\u4EF6\u4E86\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if serverStaticRouter(context) {
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7136\u540E\u5904\u7406POST\u8BF7\u6C42\u7684\u5185\u5BB9\u4F53\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if context.Input.IsPost() {
    if CopyRequestBody &amp;&amp; !context.Input.IsUpload() {
        context.Input.CopyBody()
    }
    context.Input.ParseFormOrMulitForm(MaxMemory)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6267\u884C\u4E24\u4E2A\u524D\u7F6E\u7684\u8FC7\u6EE4\u5668\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if do_filter(BeforeRouter) {
    goto Admin
}

if do_filter(AfterStatic) {
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u4E0D\u8FC7\u6211\u89C9\u5F97\u8FD9\u4FE9\u987A\u5E8F\u602A\u602A\u7684\uFF0C\u5E94\u8BE5\u5148<code>AfterStatic</code>\u540E<code>BeforeRouter</code>\u3002\u9700\u8981\u6CE8\u610F\uFF0C\u8FC7\u6EE4\u5668\u5982\u679C\u8FD4\u56DE<code>false</code>\uFF0C\u6574\u4E2A\u6267\u884C\u5C31\u7ED3\u675F\uFF08\u8DF3\u5230\u6700\u540E\uFF09\u3002</p><p>\u7EE7\u7EED\u9605\u8BFB\uFF0C\u7136\u540E\u5224\u65AD\u6709\u6CA1\u6709\u6307\u5B9A\u6267\u884C\u7684\u63A7\u5236\u5668\u548C\u65B9\u6CD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if context.Input.RunController != nil &amp;&amp; context.Input.RunMethod != &quot;&quot; {
    findrouter = true
    runMethod = context.Input.RunMethod
    runrouter = context.Input.RunController
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u8FC7\u6EE4\u5668\u6267\u884C\u540E\uFF0C\u5BF9<code>context</code>\u6307\u5B9A\u4E86\u6267\u884C\u7684\u63A7\u5236\u5668\u548C\u65B9\u6CD5\uFF0C\u5C31\u7528\u6307\u5B9A\u7684\u3002</p><p>\u7EE7\u7EED\uFF0C\u8DEF\u7531\u7684\u5BFB\u627E\u5F00\u59CB\uFF0C\u6709\u4E09\u79CD\u8DEF\u7531\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if !findrouter {
    for _, route := range p.fixrouters {
        n := len(requestPath)
        if requestPath == route.pattern {
            runMethod = p.getRunMethod(r.Method, context, route)
            if runMethod != &quot;&quot; {
                runrouter = route.controllerType
                findrouter = true
                break
            }
        }
        //......
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>p.fixrouters</code>\u5C31\u662F\u4E0D\u5E26\u6B63\u5219\u7684\u8DEF\u7531\uFF0C\u6BD4\u5982<code>/user</code>\u3002<code>route.controllerType</code>\u7684\u7C7B\u578B\u662F<code>reflect.Type</code>\uFF0C\u540E\u9762\u4F1A\u7528\u6765\u521B\u5EFA\u63A7\u5236\u5668\u5B9E\u4F8B\u3002<code>p.getRunMethod()</code>\u83B7\u53D6\u5B9E\u9645\u8BF7\u6C42\u65B9\u5F0F\u3002\u4E3A\u4E86\u6EE1\u8DB3\u6D4F\u89C8\u5668\u65E0\u6CD5\u53D1\u9001\u8868\u5355<code>PUT</code>\u548C<code>DELETE</code>\u65B9\u6CD5\uFF0C\u53EF\u4EE5\u7528\u8868\u5355\u57DF<code>_method</code>\u503C\u4EE3\u66FF\u3002\uFF08\u6CE8\u660E\u4E00\u4E0B<code>p</code>\u5C31\u662F<code>*beego.ControllerRegistor</code>\u3002</p><p>\u63A5\u4E0B\u6765\u5F53\u7136\u662F\u6B63\u5219\u7684\u8DEF\u7531\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if !findrouter {
    //find a matching Route
    for _, route := range p.routers {

        //check if Route pattern matches url
        if !route.regex.MatchString(requestPath) {
            continue
        }
        // ......
        runMethod = p.getRunMethod(r.Method, context, route)
        if runMethod != &quot;&quot; {
            runrouter = route.controllerType
            context.Input.Params = params
            findrouter = true
            break
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6B63\u5219\u8DEF\u7531\u6BD4\u5982<code>/user/:id:int</code>\uFF0C\u8FD9\u79CD\u5E26\u53C2\u6570\u7684\u3002\u5339\u914D\u540E\u7684\u53C2\u6570\u4F1A\u8BB0\u5F55\u5728<code>context.Input.Params</code>\u4E2D\u3002</p><p>\u8FD8\u6CA1\u627E\u5230\uFF0C\u5C31\u770B\u770B\u662F\u5426\u9700\u8981\u81EA\u52A8\u8DEF\u7531\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if !findrouter &amp;&amp; p.enableAuto {
    // ......
    for cName, methodmap := range p.autoRouter {
        // ......
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u628A\u6240\u6709\u8DEF\u7531\u89C4\u5219\u8D70\u5B8C\uFF0C\u8FD8\u662F\u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u89C4\u5219\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if !findrouter {
    middleware.Exception(&quot;404&quot;, rw, r, &quot;&quot;)
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u53E6\u4E00\u79CD\u60C5\u51B5\u5C31\u662F\u627E\u5230\u8DEF\u7531\u89C4\u5219\u54AF\uFF0C\u4E14\u770B\u4E0B\u6587\u3002</p><h3 id="_2-2-\u8DEF\u7531\u8C03\u7528" tabindex="-1"><a class="header-anchor" href="#_2-2-\u8DEF\u7531\u8C03\u7528" aria-hidden="true">#</a> 2.2 \u8DEF\u7531\u8C03\u7528</h3><p>\u4E0A\u9762\u7684\u4EE3\u7801\u53D1\u73B0\u8DEF\u7531\u7684\u8C03\u7528\u4F9D\u8D56<code>runrouter</code>\u548C<code>runmethod</code>\u53D8\u91CF\u3002\u4ED6\u4EEC\u503C\u89C9\u5F97\u4E86\u5230\u5E95\u8C03\u7528\u4EC0\u4E48\u63A7\u5236\u5668\u548C\u65B9\u6CD5\u3002\u6765\u770B\u770B\u5177\u4F53\u5B9E\u73B0\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if findrouter {
    //execute middleware filters
    if do_filter(BeforeExec) {
        goto Admin
    }

    //Invoke the request handler
    vc := reflect.New(runrouter)
    execController, ok := vc.Interface().(ControllerInterface)
    if !ok {
        panic(&quot;controller is not ControllerInterface&quot;)
    }

    //call the controller init function
    execController.Init(context, runrouter.Name(), runMethod, vc.Interface())

    //if XSRF is Enable then check cookie where there has any cookie in the  request&#39;s cookie _csrf
    if EnableXSRF {
        execController.XsrfToken()
        if r.Method == &quot;POST&quot; || r.Method == &quot;DELETE&quot; || r.Method == &quot;PUT&quot; ||
            (r.Method == &quot;POST&quot; &amp;&amp; (r.Form.Get(&quot;_method&quot;) == &quot;delete&quot; || r.Form.Get(&quot;_method&quot;) == &quot;put&quot;)) {
            execController.CheckXsrfCookie()
        }
    }

    //call prepare function
    execController.Prepare()

    if !w.started {
        //exec main logic
        switch runMethod {
        case &quot;Get&quot;:
            execController.Get()
        case &quot;Post&quot;:
            execController.Post()
        case &quot;Delete&quot;:
            execController.Delete()
        case &quot;Put&quot;:
            execController.Put()
        case &quot;Head&quot;:
            execController.Head()
        case &quot;Patch&quot;:
            execController.Patch()
        case &quot;Options&quot;:
            execController.Options()
        default:
            in := make([]reflect.Value, 0)
            method := vc.MethodByName(runMethod)
            method.Call(in)
        }

        //render template
        if !w.started &amp;&amp; !context.Input.IsWebsocket() {
            if AutoRender {
                if err := execController.Render(); err != nil {
                    panic(err)
                }

            }
        }
    }

    // finish all runrouter. release resource
    execController.Finish()

    //execute middleware filters
    if do_filter(AfterExec) {
        goto Admin
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7814\u8BFB\u4E00\u4E0B\uFF0C\u6700\u5F00\u59CB\u7684\u53C8\u662F\u8FC7\u6EE4\u5668\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if do_filter(BeforeExec) {
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>BeforeExec</code>\u6267\u884C\u63A7\u5236\u5668\u65B9\u6CD5\u524D\u7684\u8FC7\u6EE4\u3002</p><p>\u7136\u540E\uFF0C\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u63A7\u5236\u5668\u5B9E\u4F8B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>vc := reflect.New(runrouter)
execController, ok := vc.Interface().(ControllerInterface)
if !ok {
    panic(&quot;controller is not ControllerInterface&quot;)
}

//call the controller init function
execController.Init(context, runrouter.Name(), runMethod, vc.Interface())
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>reflect.New()</code>\u521B\u5EFA\u65B0\u7684\u5B9E\u4F8B\uFF0C\u7528<code>vc.Interface().(ControllerInterface)</code>\u53D6\u51FA\uFF0C\u8C03\u7528\u63A5\u53E3\u7684<code>Init</code>\u65B9\u6CD5\uFF0C\u5C06\u8BF7\u6C42\u7684\u4E0A\u4E0B\u6587\u7B49\u4F20\u9012\u8FDB\u53BB\u3002 \u8FD9\u91CC\u5C31\u8BF4\u660E\u4E3A\u4EC0\u4E48\u4E0D\u80FD\u5B58\u4E0B\u63A7\u5236\u5668\u5B9E\u4F8B\u7ED9\u6BCF\u6B21\u8BF7\u6C42\u4F7F\u7528\uFF0C\u56E0\u4E3A\u6BCF\u6B21\u8BF7\u6C42\u7684\u4E0A\u4E0B\u6587\u662F<strong>\u4E0D\u540C\u7684</strong>\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>execController.Prepare()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>\u63A7\u5236\u5668\u7684\u51C6\u5907\u5DE5\u4F5C\uFF0C\u8FD9\u91CC\u53EF\u4EE5\u5199\u7528\u6237\u767B\u5F55\u9A8C\u8BC1\u7B49\u3002</p><p>\u7136\u540E\u6839\u636E<code>runmethod</code>\u6267\u884C\u63A7\u5236\u5668\u5BF9\u5E94\u7684\u65B9\u6CD5\uFF0C\u975E\u63A5\u53E3\u5B9A\u4E49\u7684\u65B9\u6CD5\uFF0C\u7528<code>reflect.Call</code>\u8C03\u7528\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if !w.started &amp;&amp; !context.Input.IsWebsocket() {
    if AutoRender {
        if err := execController.Render(); err != nil {
            panic(err)
        }
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5982\u679C\u81EA\u52A8\u6E32\u67D3<code>AutoRender</code>\uFF0C\u5C31\u8C03\u7528<code>Render()</code>\u65B9\u6CD5\u6E32\u67D3\u9875\u9762\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>execController.Finish()

//execute middleware filters
if do_filter(AfterExec) {
    goto Admin
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u63A7\u5236\u5668\u6700\u540E\u4E00\u5200<code>Finish</code>\u641E\u5B9A\uFF0C\u7136\u540E\u8FC7\u6EE4\u5668<code>AfterExec</code>\u4F7F\u7528\u3002</p><p>\u603B\u7ED3\u8D77\u6765\uFF0C<code>beego.ControllerInterface</code>\u63A5\u53E3\u65B9\u6CD5\u7684<code>Init</code>,<code>Prepare</code>,<code>Render</code>\u548C<code>Finish</code>\u53D1\u6325\u5F88\u5927\u4F5C\u7528\u3002\u90A3\u5C31\u6765\u7814\u7A76\u4E00\u4E0B\u3002</p><h2 id="\u63A7\u5236\u5668\u548C\u89C6\u56FE" tabindex="-1"><a class="header-anchor" href="#\u63A7\u5236\u5668\u548C\u89C6\u56FE" aria-hidden="true">#</a> \u63A7\u5236\u5668\u548C\u89C6\u56FE</h2><h3 id="\u63A7\u5236\u5668\u63A5\u53E3" tabindex="-1"><a class="header-anchor" href="#\u63A7\u5236\u5668\u63A5\u53E3" aria-hidden="true">#</a> \u63A7\u5236\u5668\u63A5\u53E3</h3>`,53),Ee=e("\u63A7\u5236\u5668\u63A5\u53E3"),Ne=n("code",null,"beego.ControllerInterface",-1),Le=e("\u7684\u5B9A\u4E49\u5728"),Me={href:"https://github.com/astaxie/beego/blob/master/controller.go#L47",target:"_blank",rel:"noopener noreferrer"},Ie=e("controller.go#L47"),Be=e("\uFF1A"),De=i(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>type ControllerInterface interface {
    Init(ct *context.Context, controllerName, actionName string, app interface{})
    Prepare()
    Get()
    Post()
    Delete()
    Put()
    Head()
    Patch()
    Options()
    Finish()
    Render() error
    XsrfToken() string
    CheckXsrfCookie() bool
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),He=e("\u5B98\u65B9\u7684\u5B9E\u73B0"),Oe=n("code",null,"beego.Controller",-1),Fe=e("\u5B9A\u4E49\u5728"),Ge={href:"https://github.com/astaxie/beego/blob/master/controller.go#L29",target:"_blank",rel:"noopener noreferrer"},Ue=e("controller.go#L29"),Ve=e("\uFF1A"),We=i(`<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>type Controller struct {
    Ctx            *context.Context
    Data           map[interface{}]interface{}
    controllerName string
    actionName     string
    TplNames       string
    Layout         string
    LayoutSections map[string]string // the key is the section name and the value is the template name
    TplExt         string
    _xsrf_token    string
    gotofunc       string
    CruSession     session.SessionStore
    XSRFExpire     int
    AppController  interface{}
    EnableReander  bool
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5185\u5BB9\u597D\u591A\uFF0C\u6CA1\u5FC5\u8981\u5168\u90E8\u90FD\u770B\u770B\uFF0C\u91CD\u70B9\u5728<code>Init</code>,<code>Prepare</code>,<code>Render</code>\u548C<code>Finish</code>\u8FD9\u56DB\u4E2A\u3002</p><h3 id="\u63A7\u5236\u5668\u7684\u5B9E" tabindex="-1"><a class="header-anchor" href="#\u63A7\u5236\u5668\u7684\u5B9E" aria-hidden="true">#</a> \u63A7\u5236\u5668\u7684\u5B9E</h3><p><code>Init</code>\u65B9\u6CD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Init generates default values of controller operations.
func (c *Controller) Init(ctx *context.Context, controllerName, actionName string, app interface{}) {
    c.Layout = &quot;&quot;
    c.TplNames = &quot;&quot;
    c.controllerName = controllerName
    c.actionName = actionName
    c.Ctx = ctx
    c.TplExt = &quot;tpl&quot;
    c.AppController = app
    c.EnableReander = true
    c.Data = ctx.Input.Data
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6CA1\u4EC0\u4E48\u8BDD\u8BF4\uFF0C\u4E00\u5806\u8D4B\u503C\u3002\u552F\u4E00\u8981\u8C08\u7684\u662F<code>c.EnableReander</code>\uFF0C\u8FD9\u79CD\u62FC\u5199\u9519\u8BEF\u5B9E\u5728\u662F\uFF0C\u6389\u9634\u6C9F\u91CC\u3002\u5B9E\u9645\u7684\u610F\u601D\u662F<code>EnableRender</code>\u3002</p><p><code>Prepare</code>\u548C<code>Finish</code>\u65B9\u6CD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Prepare runs after Init before request function execution.
func (c *Controller) Prepare() {

}

// Finish runs after request function execution.
func (c *Controller) Finish() {

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u7A7A\u7684\uFF01\u539F\u6765\u6211\u8981\u81EA\u5DF1\u586B\u5185\u5BB9\u554A\u3002</p><p><code>Render</code>\u65B9\u6CD5\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// Render sends the response with rendered template bytes as text/html type.
func (c *Controller) Render() error {
    if !c.EnableReander {
        return nil
    }
    rb, err := c.RenderBytes()

    if err != nil {
        return err
    } else {
        c.Ctx.Output.Header(&quot;Content-Type&quot;, &quot;text/html; charset=utf-8&quot;)
        c.Ctx.Output.Body(rb)
    }
    return nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="\u89C6\u56FE\u6E32\u67D3" tabindex="-1"><a class="header-anchor" href="#\u89C6\u56FE\u6E32\u67D3" aria-hidden="true">#</a> \u89C6\u56FE\u6E32\u67D3</h3><p>\u6E32\u67D3\u7684\u6838\u5FC3\u65B9\u6CD5\u662F<code>c.RenderBytes()</code>:</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>// RenderBytes returns the bytes of rendered template string. Do not send out response.
func (c *Controller) RenderBytes() ([]byte, error) {
    //if the controller has set layout, then first get the tplname&#39;s content set the content to the layout
    if c.Layout != &quot;&quot; {
        if c.TplNames == &quot;&quot; {
            c.TplNames = strings.ToLower(c.controllerName) + &quot;/&quot; + strings.ToLower(c.actionName) + &quot;.&quot; + c.TplExt
        }
        if RunMode == &quot;dev&quot; {
            BuildTemplate(ViewsPath)
        }
        newbytes := bytes.NewBufferString(&quot;&quot;)
        if _, ok := BeeTemplates[c.TplNames]; !ok {
            panic(&quot;can&#39;t find templatefile in the path:&quot; + c.TplNames)
            return []byte{}, errors.New(&quot;can&#39;t find templatefile in the path:&quot; + c.TplNames)
        }
        err := BeeTemplates[c.TplNames].ExecuteTemplate(newbytes, c.TplNames, c.Data)
        if err != nil {
            Trace(&quot;template Execute err:&quot;, err)
            return nil, err
        }
        tplcontent, _ := ioutil.ReadAll(newbytes)
        c.Data[&quot;LayoutContent&quot;] = template.HTML(string(tplcontent))

        if c.LayoutSections != nil {
            for sectionName, sectionTpl := range c.LayoutSections {
                if sectionTpl == &quot;&quot; {
                    c.Data[sectionName] = &quot;&quot;
                    continue
                }

                sectionBytes := bytes.NewBufferString(&quot;&quot;)
                err = BeeTemplates[sectionTpl].ExecuteTemplate(sectionBytes, sectionTpl, c.Data)
                if err != nil {
                    Trace(&quot;template Execute err:&quot;, err)
                    return nil, err
                }
                sectionContent, _ := ioutil.ReadAll(sectionBytes)
                c.Data[sectionName] = template.HTML(string(sectionContent))
            }
        }

        ibytes := bytes.NewBufferString(&quot;&quot;)
        err = BeeTemplates[c.Layout].ExecuteTemplate(ibytes, c.Layout, c.Data)
        if err != nil {
            Trace(&quot;template Execute err:&quot;, err)
            return nil, err
        }
        icontent, _ := ioutil.ReadAll(ibytes)
        return icontent, nil
    } else {
        //......
    }
    return []byte{}, nil
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u770B\u8D77\u6765\u5F88\u590D\u6742\uFF0C\u4E3B\u8981\u662F\u4E24\u79CD\u60C5\u51B5\uFF0C\u6709\u6CA1\u6709Layout\u3002\u5982\u679C\u6709Layout\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>err := BeeTemplates[c.TplNames].ExecuteTemplate(newbytes, c.TplNames, c.Data)
// ......
tplcontent, _ := ioutil.ReadAll(newbytes)
c.Data[&quot;LayoutContent&quot;] = template.HTML(string(tplcontent))
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6E32\u67D3\u6A21\u677F\u6587\u4EF6\uFF0C\u5C31\u662F\u5E03\u5C40\u7684\u4E3B\u5185\u5BB9\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>for sectionName, sectionTpl := range c.LayoutSections {
    if sectionTpl == &quot;&quot; {
        c.Data[sectionName] = &quot;&quot;
        continue
    }

    sectionBytes := bytes.NewBufferString(&quot;&quot;)
    err = BeeTemplates[sectionTpl].ExecuteTemplate(sectionBytes, sectionTpl, c.Data)
    // ......
    sectionContent, _ := ioutil.ReadAll(sectionBytes)
    c.Data[sectionName] = template.HTML(string(sectionContent))
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6E32\u67D3\u5E03\u5C40\u91CC\u7684\u522B\u7684\u533A\u5757<code>c.LayoutSections</code>\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>ibytes := bytes.NewBufferString(&quot;&quot;)
err = BeeTemplates[c.Layout].ExecuteTemplate(ibytes, c.Layout, c.Data)
// ......
icontent, _ := ioutil.ReadAll(ibytes)
return icontent, nil
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u6700\u540E\u662F\u6E32\u67D3\u5E03\u5C40\u6587\u4EF6\uFF0C<code>c.Data</code>\u91CC\u5E26\u6709\u6240\u6709\u5E03\u5C40\u7684\u4E3B\u5185\u5BB9\u548C\u533A\u5757\uFF0C\u53EF\u4EE5\u76F4\u63A5\u8D4B\u503C\u5728\u5E03\u5C40\u91CC\u3002</p><p>\u6E32\u67D3\u8FC7\u7A0B\u6709\u8DA3\u7684\u4EE3\u7801\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>if RunMode == &quot;dev&quot; {
    BuildTemplate(ViewsPath)
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>\u5F00\u53D1\u72B6\u6001\u4E0B\uFF0C\u6BCF\u6B21\u6E32\u67D3\u90FD\u4F1A\u91CD\u65B0<code>BuildTemplate()</code>\u3002\u8FD9\u6837\u5C31\u53EF\u4EE5\u7406\u89E3\uFF0C\u6700\u521D\u6E32\u67D3\u6A21\u677F\u5E76\u5B58\u4E0B<code>*template.Template</code>\uFF0C\u751F\u4EA7\u6A21\u5F0F\u4E0B\uFF0C\u662F\u4E0D\u4F1A\u54CD\u5E94\u5373\u65F6\u7684\u6A21\u7248\u4FEE\u6539\u3002</p><h2 id="end-\u94FE\u63A5" tabindex="-1"><a class="header-anchor" href="#end-\u94FE\u63A5" aria-hidden="true">#</a> END \u94FE\u63A5</h2><ul><li><div><a href="66.md" style="float:left;">\u2B06\uFE0F\u4E0A\u4E00\u8282\u{1F517} </a><a href="68.md" style="float:right;"> \uFE0F\u4E0B\u4E00\u8282\u{1F517}</a></div></li></ul>`,26),ze=e("\u24C2\uFE0F\u56DE\u5230\u76EE\u5F55\u{1F3E0}"),Je={href:"https://nsddd.top/archives/contributors",target:"_blank",rel:"noopener noreferrer"},Xe=n("strong",null,"\u{1FAF5}\u53C2\u4E0E\u8D21\u732E\u{1F49E}\u2764\uFE0F\u200D\u{1F525}\u{1F496}",-1),Ke=e(")"),Ye=e("\u2734\uFE0F\u7248\u6743\u58F0\u660E \xA9 \uFF1A\u672C\u4E66\u6240\u6709\u5185\u5BB9\u9075\u5FAA"),je={href:"http://zh.wikipedia.org/wiki/Wikipedia:CC-by-sa-3.0%E5%8D%8F%E8%AE%AE%E6%96%87%E6%9C%AC",target:"_blank",rel:"noopener noreferrer"},Qe=e("CC-BY-SA 3.0\u534F\u8BAE\uFF08\u7F72\u540D-\u76F8\u540C\u65B9\u5F0F\u5171\u4EAB\uFF09\xA9");function $e(Ze,ns){const a=t("ExternalLinkIcon"),o=t("RouterLink");return c(),d("div",null,[n("ul",null,[n("li",null,[n("a",u,[v,s(a)])])]),m,b,k,n("blockquote",null,[n("p",null,[g,n("a",h,[f,s(a)]),_,n("a",x,[q,s(a)]),w,n("a",y,[C,s(a)])])]),T,R,P,A,S,n("ul",null,[n("li",null,[n("a",E,[N,s(a)])])]),L,n("p",null,[M,n("a",I,[B,s(a)]),D]),H,n("p",null,[O,F,G,n("a",U,[V,s(a)]),W]),z,n("p",null,[J,X,K,Y,j,n("a",Q,[$,s(a)]),Z,nn,en,sn,an,n("a",tn,[on,s(a)]),ln]),cn,n("p",null,[dn,rn,n("a",pn,[un,s(a)]),vn]),mn,n("p",null,[bn,kn,n("a",gn,[hn,s(a)]),fn]),_n,n("p",null,[xn,qn,wn,n("a",yn,[Cn,s(a)]),Tn,Rn,Pn]),An,n("p",null,[Sn,En,Nn,Ln,n("a",Mn,[In,s(a)]),Bn]),Dn,n("p",null,[Hn,On,Fn,Gn,n("a",Un,[Vn,s(a)]),Wn]),zn,n("p",null,[Jn,Xn,Kn,Yn,n("a",jn,[Qn,s(a)]),$n]),Zn,n("p",null,[ne,ee,n("a",se,[ae,s(a)]),ie]),te,n("p",null,[oe,le,ce,de,re,pe,ue,ve,n("a",me,[be,s(a)]),ke]),ge,n("p",null,[he,fe,_e,xe,qe,we,ye,Ce,Te,n("a",Re,[Pe,s(a)]),Ae]),Se,n("p",null,[Ee,Ne,Le,n("a",Me,[Ie,s(a)]),Be]),De,n("p",null,[He,Oe,Fe,n("a",Ge,[Ue,s(a)]),Ve]),We,n("ul",null,[n("li",null,[n("p",null,[s(o,{to:"/"},{default:r(()=>[ze]),_:1})])]),n("li",null,[n("p",null,[n("a",Je,[Xe,s(a)]),Ke])]),n("li",null,[n("p",null,[Ye,n("a",je,[Qe,s(a)])])])])])}const ss=l(p,[["render",$e],["__file","67.html.vue"]]);export{ss as default};
