<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第78节-开源的文档自动化设计" tabindex="-1"><a class="header-anchor" href="#第78节-开源的文档自动化设计" aria-hidden="true">#</a> 第78节 开源的文档自动化设计</h1>
<div><a href = '77.md' style='float:left'>⬆️上一节🔗  </a><a href = '79.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>任何一个顶级的开源项目都离不开文档，但是要做好一个优质的文档，也是一件非常不简单的事情。</p>
<h2 id="存储方式" tabindex="-1"><a class="header-anchor" href="#存储方式" aria-hidden="true">#</a> 存储方式</h2>
<ul>
<li>可以使用 github page</li>
<li>可以使用 vercel 部署</li>
<li>可以使用 cos</li>
</ul>
<h2 id="对象存储实现网页部署" tabindex="-1"><a class="header-anchor" href="#对象存储实现网页部署" aria-hidden="true">#</a> 对象存储实现网页部署</h2>
<p>首先配置是最基础的。</p>
<p>注意，我们需要提供存储桶的名称，并且选择所属的地域，选择一个就近的位置就好了，访问权限因为我们要部署静态网页，人人都需要能访问，所以设置为公有读、私有写。</p>
<p>设置完成后点击<code v-pre>确定</code>即可。新建完成后你将进入你新建的COS控制台管理页面，默认情况下，这个页面没有任何数据，需要你上传文件。</p>
<blockquote>
<p>当你上传文件后，虽然已经上传了，但是暂时还是无法通过静态页面方式去访问这个文件的。</p>
</blockquote>
<h3 id="静态页面设置" tabindex="-1"><a class="header-anchor" href="#静态页面设置" aria-hidden="true">#</a> 静态页面设置</h3>
<p>接下来，我们要打开COS的静态页面访问功能，请选择页面菜单栏中的基础配置，拉取页面到最下方，然后找到静态网站设置。</p>
<p><img src="http://sm.nsddd.top/sm202306091843730.png" alt="image"></p>
<p>现在，打开浏览器访问系统自动给出的<code v-pre>访问节点</code>内的网址<code v-pre>https://openim-*******.cos-website.ap-guangzhou.myqcloud.com </code>。我们看到我们部署的静态网站已经可以正常访问了。</p>
<h2 id="使用自定义域名进行访问" tabindex="-1"><a class="header-anchor" href="#使用自定义域名进行访问" aria-hidden="true">#</a> 使用自定义域名进行访问</h2>
<p>默认情况下是不能通过自己的域名进行访问的，我们需要修改相关设置才能通过自己的域名进行访问。请点击菜单栏的域名管理，我们选择菜单栏的域名管理，在请输入域名处填写你自己的域名，我这里以<code v-pre>kubecub.nsddd.top</code>为例，源站类型设置为<code v-pre>静态网站源站</code>，然后点击保存。</p>
<h2 id="文档自动化设计思路" tabindex="-1"><a class="header-anchor" href="#文档自动化设计思路" aria-hidden="true">#</a> 文档自动化设计思路</h2>
<p>使用 https://github.com/peaceiris/actions-gh-pages 可以实现对 GitHub pages 的自动化部署</p>
<p>这是最简单的逻辑，在 https://vercel.com/，可以设置自动对 GitHub 仓库的拉取操作来完成自动化。</p>
<p>同样，如果使用 cos 的话，这个自动化设计倒是有点意思了。</p>
<h3 id="makefile-设计" tabindex="-1"><a class="header-anchor" href="#makefile-设计" aria-hidden="true">#</a> makefile 设计</h3>
<p>我们先看看如何设计 makefile，作为 CICD 的基础：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>## install<span class="token punctuation">.</span>coscli<span class="token punctuation">:</span> Install coscli<span class="token punctuation">,</span> used to upload files to cos
# example<span class="token punctuation">:</span> <span class="token punctuation">.</span><span class="token operator">/</span>coscli  cp<span class="token operator">/</span>sync <span class="token operator">-</span>r  <span class="token operator">/</span>home<span class="token operator">/</span>off<span class="token operator">-</span>line<span class="token operator">/</span>docker<span class="token operator">-</span>off<span class="token operator">-</span>line<span class="token operator">/</span> cos<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>openim<span class="token operator">-</span><span class="token number">1306374445</span><span class="token operator">/</span>openim<span class="token operator">/</span>openim<span class="token operator">/</span>image<span class="token operator">/</span>amd<span class="token operator">/</span>off<span class="token operator">-</span>line<span class="token operator">/</span>off<span class="token operator">-</span>line<span class="token operator">/</span> <span class="token operator">-</span>e cos<span class="token punctuation">.</span>ap<span class="token operator">-</span>guangzhou<span class="token punctuation">.</span>myqcloud<span class="token punctuation">.</span>com
# https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>cloud<span class="token punctuation">.</span>tencent<span class="token punctuation">.</span>com<span class="token operator">/</span>document<span class="token operator">/</span>product<span class="token operator">/</span><span class="token number">436</span><span class="token operator">/</span><span class="token number">71763</span>
<span class="token punctuation">.</span>PHONY<span class="token punctuation">:</span> install<span class="token punctuation">.</span>coscli
install<span class="token punctuation">.</span>coscli<span class="token punctuation">:</span>
	@wget <span class="token operator">-</span>q https<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>github<span class="token punctuation">.</span>com<span class="token operator">/</span>tencentyun<span class="token operator">/</span>coscli<span class="token operator">/</span>releases<span class="token operator">/</span>download<span class="token operator">/</span>v0<span class="token punctuation">.</span><span class="token number">13.0</span><span class="token operator">-</span>beta<span class="token operator">/</span>coscli<span class="token operator">-</span>linux <span class="token operator">-</span>O $<span class="token punctuation">{</span>TOOLS_DIR<span class="token punctuation">}</span><span class="token operator">/</span>coscli
	@chmod <span class="token operator">+</span>x $<span class="token punctuation">{</span>TOOLS_DIR<span class="token punctuation">}</span><span class="token operator">/</span>coscli

## install<span class="token punctuation">.</span>coscmd<span class="token punctuation">:</span> Install coscmd<span class="token punctuation">,</span> used to upload files to cos
<span class="token punctuation">.</span>PHONY<span class="token punctuation">:</span> install<span class="token punctuation">.</span>coscmd
install<span class="token punctuation">.</span>coscmd<span class="token punctuation">:</span>
	@<span class="token keyword">if</span> which pip <span class="token operator">&amp;</span><span class="token operator">></span><span class="token operator">/</span>dev<span class="token operator">/</span>null<span class="token punctuation">;</span> then pip install coscmd<span class="token punctuation">;</span> <span class="token keyword">else</span> pip3 install coscmd<span class="token punctuation">;</span> fi
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当然这只是第一步，很简单的一步哈哈哈。</p>
<p>我们如何将自动化融入进来？</p>
<p>我发现了一个很优秀的 actions 工具：https://github.com/BetaHuhn/repo-file-sync-action自动化同步代码或者文档。</p>
<p>我们可以利用 <strong>repo-file-sync-action</strong>，来实现目录的代码或者文档的同步操作。</p>
<p>我们可以在主仓库只需要写文档就行了，然后 actions 通过操作来 同步到 文档仓库，文档仓库不仅仅有文档，还有部署工具以及部署后的网页、资源存储。</p>
<p>当我们同步到我们的文档仓库后，我们下一步要做的事情，就是可以利用 cos，来对仓库进行存储。</p>
<p>比如说：</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token punctuation">.</span><span class="token operator">/</span>coscli  sync <span class="token operator">-</span>r  <span class="token operator">/</span>home<span class="token operator">/</span>off<span class="token operator">-</span>line<span class="token operator">/</span>docker<span class="token operator">-</span>off<span class="token operator">-</span>line<span class="token operator">/</span> cos<span class="token punctuation">:</span><span class="token operator">/</span><span class="token operator">/</span>openim<span class="token operator">-</span><span class="token number">1306374445</span><span class="token operator">/</span>openim<span class="token operator">/</span>openim<span class="token operator">/</span>image<span class="token operator">/</span>amd<span class="token operator">/</span>off<span class="token operator">-</span>line<span class="token operator">/</span>off<span class="token operator">-</span>line<span class="token operator">/</span> <span class="token operator">-</span>e cos<span class="token punctuation">.</span>ap<span class="token operator">-</span>guangzhou<span class="token punctuation">.</span>myqcloud<span class="token punctuation">.</span>com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>sync</code> 和 <code v-pre>cp</code> 不一样的是，它会自动校验目录是否一样，如果不一样的话就同步。</p>
<p>最后你可以通过  cos 来进行部署。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '77.md' style='float:left'>⬆️上一节🔗  </a><a href = '79.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


