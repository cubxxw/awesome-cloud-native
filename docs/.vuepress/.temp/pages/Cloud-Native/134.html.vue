<template><div><h1 id="_134-openim-website-设计" tabindex="-1"><a class="header-anchor" href="#_134-openim-website-设计" aria-hidden="true">#</a> 134: OpenIM WebSite 设计</h1>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p>最近 OpenIM 的文档问题很多，于是我考虑了很久，沉下心来，好好的把 OpenIM 的文档重新设计一遍。</p>
<p>选择主题：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com//google/docsy themes/docsy <span class="token parameter variable">--depth</span><span class="token operator">=</span><span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>开始之前：</strong></p>
<p>开始之前需要安装：npm, git, go</p>
<p><strong>注意：hugo 需要下载 带有 extended 的：</strong></p>
<ul>
<li>https://github.com/gohugoio/hugo/releases</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ wget https://ghproxy.com/https://github.com/gohugoio/hugo/releases/download/v0.118.2/hugo_extended_0.118.2_linux-amd64.tar.gz
❯ tar -zxvf hugo_extended_0.118.2_linux-amd64.tar.gz
❯ mv hugo /usr/bin
❯ hugo version
hugo v0.118.2-da7983ac4b94d97d776d7c2405040de97e95c03d+extended linux/amd64 BuildDate=2023-08-31T11:23:51Z VendorInfo=gohugoio
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>必要的依赖安装：</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ npm install -D autoprefixer
❯ npm install -D postcss-cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>从postcss-cli版本8开始，你还必须单独安装postcss:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ npm install -D postcss
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="openim-站点结构设计" tabindex="-1"><a class="header-anchor" href="#openim-站点结构设计" aria-hidden="true">#</a> OpenIM 站点结构设计</h2>
<ul>
<li>站点的地址：https://openim.io</li>
<li>代码仓库的地址：https://github.com/openim/website</li>
</ul>
<p>OpenIM 是一个开源的社区，和传统的官方网站有所区别，对网站的要求更高，不管是文档的质量，以及代码的要求要更加的严格。我参考 Kubernetes 的官方社区网站 <a href="http://kubernetes.io/" target="_blank" rel="noopener noreferrer">http://kubernetes.io/<ExternalLinkIcon/></a> 为 OpenIM 提供了一些设计技巧。</p>
<h3 id="openim-的遗留问题" tabindex="-1"><a class="header-anchor" href="#openim-的遗留问题" aria-hidden="true">#</a> OpenIM 的遗留问题</h3>
<ul>
<li>文档优化的 issue：https://github.com/openimsdk/open-im-server/issues/384</li>
</ul>
<p>自从脚本目录重构后，文档成为了 OpenIM 存在的问题。</p>
<ul>
<li>接口文档不够自动化，没有及时更新，可信度问题。</li>
<li>部署文档远远落后，出现部署报错问题</li>
<li>OpenIM 社区文档少之又少，非常不利于开发者上手，贡献者贡献。</li>
<li>OpenIM 的社区文档难以向国际化、专业化迈出脚步。</li>
<li>OpenIM 文档的文档仓库不规范，缺乏文档 README，难以上手，没有自动化功能。</li>
<li>OpenIM 的文档和各个仓库的紧密度不高，开发者开发代码，难以关注文档。</li>
<li>缺乏其他语言的文档，文档的架构设计不是特别好。</li>
<li>没有一套专业的流程（贡献，策略，方法指南）</li>
</ul>
<h3 id="模块设计" tabindex="-1"><a class="header-anchor" href="#模块设计" aria-hidden="true">#</a> 模块设计</h3>
<p><strong>我为 OpenIM 设计了最主要的几个模块：</strong></p>
<ul>
<li>Blog: OpenIM 的博客（一些最新的博客，一些精选的文章）</li>
<li>Docs：OpenIM 的体系文档</li>
<li>Community：OpenIM 的社区生态（周会，周边，线下交流…)</li>
</ul>
<h3 id="重要的设计细节" tabindex="-1"><a class="header-anchor" href="#重要的设计细节" aria-hidden="true">#</a> 重要的设计细节</h3>
<blockquote>
<p>考虑长期的维护力度以及参与度，我对整个 OpenIM 的站点设计有着很高的要求：</p>
</blockquote>
<ol>
<li><strong>用户界面 (UI)：</strong>
<ul>
<li><strong>颜色方案：</strong> 主色调采用深蓝色，代表技术与稳重，配合灰色或白色作为辅助色，以保持简洁和专业感。</li>
<li><strong>响应式设计：</strong> 适配各种屏幕大小，确保无论是桌面，平板还是手机，用户体验都是一致的。</li>
<li><strong>用户导航：</strong> 顶部导航栏清晰地展示“Blog”、“Docs”和“Community”三大模块，方便用户快速访问。</li>
</ul>
</li>
<li><strong>Blog 模块：</strong>
<ul>
<li><strong>特色文章：</strong> 在首页或博客主页面展示最新和精选的文章，以吸引用户关注。</li>
<li><strong>分类与标签：</strong> 方便用户按兴趣或主题进行浏览。</li>
<li><strong>评论功能：</strong> 用户可以在每篇文章下方留下评论，以促进交流和反馈。</li>
</ul>
</li>
<li><strong>Docs 模块：</strong>
<ul>
<li><strong>分层结构：</strong> 文档应分为“入门”，“高级”和“API 参考”等级别，帮助不同水平的用户找到合适的内容。</li>
<li><strong>搜索功能：</strong> 允许用户快速查找相关的文档内容。</li>
<li><strong>版本管理：</strong> 随着 OpenIM 的版本更新，文档也应有版本控制，方便用户查找到相应版本的文档。</li>
</ul>
</li>
<li><strong>Community 模块：</strong>
<ul>
<li><strong>活动日历：</strong> 显示即将到来的双周会、线下交流等活动日期和细节。</li>
<li><strong>会员展示：</strong> 展示活跃的社区成员或贡献者，以鼓励更多人参与。</li>
<li><strong>资源链接：</strong> 提供与 OpenIM 相关的工具、插件和其他资源的链接。</li>
</ul>
</li>
<li><strong>其他考虑：</strong>
<ul>
<li><strong>多语言支持：</strong> 考虑到 OpenIM 可能是国际性的社区，提供多语言支持会增加其受众范围。</li>
<li><strong>访问速度：</strong> 确保网站加载速度快，为此可以采用 CDN、代码优化等技术。</li>
<li><strong>安全性：</strong> 保护用户数据和网站内容不被恶意攻击或滥用，例如使用 HTTPS 和定期进行安全审查。</li>
</ul>
</li>
</ol>
<h3 id="文档自动化与同步管理方案" tabindex="-1"><a class="header-anchor" href="#文档自动化与同步管理方案" aria-hidden="true">#</a> 文档自动化与同步管理方案</h3>
<h4 id="文档分流与设计" tabindex="-1"><a class="header-anchor" href="#文档分流与设计" aria-hidden="true">#</a> 文档分流与设计</h4>
<p>对于一个大型项目或多个项目的整合，文档的管理和组织是至关重要的。通过对文档的分流，我们可以有效地为不同的目标读者提供所需的信息：</p>
<ul>
<li><strong>文档抽象层设计</strong>: 对于文档结构，我们进行了大量的设计工作，以确保每个部分都有明确的目的和读者。
<ul>
<li><strong>Community</strong>: 社区交流和参与的指南和资料。</li>
<li><strong>Blog</strong>: 更新日志、新功能介绍以及相关文章。</li>
<li><strong>Docs</strong>: 技术文档、API参考、安装与配置指南等。</li>
</ul>
</li>
</ul>
<h4 id="自动化文档生成与部署" tabindex="-1"><a class="header-anchor" href="#自动化文档生成与部署" aria-hidden="true">#</a> 自动化文档生成与部署</h4>
<p>自动化是实现高效文档管理的关键。我们提供了一套工具和流程，使文档的生成和部署变得简单：</p>
<ul>
<li>
<p><strong>自动化工具</strong>: 在Mac和Linux环境中，我们使用<code v-pre>make</code>和<code v-pre>gendocs</code>工具，对部分文档进行自动化生成。</p>
<ul>
<li>
<p>示例: 使用以下命令可以自动生成多国家的markdown文档及其基础模板。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> new-post <span class="token assign-left variable">POST_NAME</span><span class="token operator">=</span><span class="token string">"openim-offline-deployment-design"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><strong>测试与部署</strong>: 利用GitHub actions对文档进行测试，并记录测试报告。此外，我们还设计了DevOps工作流，确保文档的质量和更新的准确性。</p>
<ul>
<li>一旦文档通过测试，我们使用GitHub actions将其部署，并与netlify同步。netlify会自动完成其部署，从而生成相应的网页。</li>
<li>值得一提的是，<code v-pre>https://netlify.app/</code>在国内通过插件加速，保证了访问速度。</li>
</ul>
</li>
</ul>
<h4 id="文档双向同步方案" tabindex="-1"><a class="header-anchor" href="#文档双向同步方案" aria-hidden="true">#</a> 文档双向同步方案</h4>
<p>在多仓库管理中，文档的双向同步是个挑战。我们设计了以下方案，以简化此过程：</p>
<ul>
<li><strong>Webhook链接</strong>: 通过webhook，我们链接了<code v-pre>GitHub openim/website</code>的各个目录与各个子仓库（例如<code v-pre>openim-server</code>, <code v-pre>openim-chat</code>）。
<ul>
<li>当在这些子仓库中对markdown文档进行修改时，这些更改会自动同步到<code v-pre>website</code>仓库中。这消除了手动维护和同步的需求，大大提高了效率。</li>
</ul>
</li>
</ul>
<p>总之，本方案为文档管理、自动化部署和双向同步提供了完整的指南和工具。这不仅确保了文档的质量和准确性，还大大提高了团队的生产效率。</p>
<h2 id="英文的模块设计稿" tabindex="-1"><a class="header-anchor" href="#英文的模块设计稿" aria-hidden="true">#</a> 英文的模块设计稿</h2>
<h3 id="module-design" tabindex="-1"><a class="header-anchor" href="#module-design" aria-hidden="true">#</a> Module Design</h3>
<p><strong>I have designed the key modules for OpenIM:</strong></p>
<ul>
<li><strong>Blog:</strong> OpenIM's official blog, showcasing the latest posts and handpicked articles.</li>
<li><strong>Docs:</strong> Comprehensive documentation for the OpenIM ecosystem.</li>
<li><strong>Community:</strong> The vibrant community ecosystem of OpenIM, including biweekly meetings, affiliate events, and face-to-face interactions.</li>
</ul>
<h3 id="critical-design-details" tabindex="-1"><a class="header-anchor" href="#critical-design-details" aria-hidden="true">#</a> Critical Design Details</h3>
<blockquote>
<p>With a vision for long-term sustainability and community engagement, I hold the OpenIM site's design to the highest standards:</p>
</blockquote>
<ol>
<li>User Interface (UI):
<ul>
<li><strong>Color Scheme:</strong> Deep blue is chosen as the primary hue, signifying technology and reliability, complemented by shades of grey or white for a clean and professional aesthetic.</li>
<li><strong>Responsive Design:</strong> Optimized for various screen sizes, ensuring a consistent user experience across desktops, tablets, and mobile devices.</li>
<li><strong>User Navigation:</strong> A clear top navigation bar showcasing the three main modules: “Blog,” “Docs,” and “Community,” enabling swift user access.</li>
</ul>
</li>
<li>Blog Module:
<ul>
<li><strong>Featured Posts:</strong> The homepage or main blog page prominently displays the newest and curated articles to engage visitors.</li>
<li><strong>Categories and Tags:</strong> Facilitates content discovery based on user interests or themes.</li>
<li><strong>Comment Functionality:</strong> Users can provide feedback and engage in discussions beneath each post.</li>
</ul>
</li>
<li>Docs Module:
<ul>
<li><strong>Layered Structure:</strong> Documentation is categorized into levels like &quot;Beginner,&quot; &quot;Advanced,&quot; and &quot;API Reference,&quot; catering to users of varying expertise.</li>
<li><strong>Search Capability:</strong> Empowers users to swiftly locate pertinent documentation.</li>
<li><strong>Version Control:</strong> As OpenIM evolves, its documentation incorporates version management for users to find relevant document editions.</li>
</ul>
</li>
<li>Community Module:
<ul>
<li><strong>Event Calendar:</strong> Provides insights into upcoming biweekly meetings, offline interactions, and other event details.</li>
<li><strong>Member Showcase:</strong> Highlights active community participants or contributors to foster greater involvement.</li>
<li><strong>Resource Links:</strong> Curates links to tools, plugins, and other resources pertinent to OpenIM.</li>
</ul>
</li>
<li>Other Considerations:
<ul>
<li><strong>Multilingual Support:</strong> Given OpenIM's potential global reach, offering multiple languages broadens its audience scope.</li>
<li><strong>Access Speed:</strong> A commitment to swift website loading times using technologies like CDN and code optimization.</li>
<li><strong>Security:</strong> Ensuring protection against malicious attacks or misuse by employing HTTPS and periodic security reviews.</li>
</ul>
</li>
</ol>
<h3 id="documentation-automation-synchronization-strategy" tabindex="-1"><a class="header-anchor" href="#documentation-automation-synchronization-strategy" aria-hidden="true">#</a> Documentation Automation &amp; Synchronization Strategy</h3>
<h4 id="document-segmentation-design" tabindex="-1"><a class="header-anchor" href="#document-segmentation-design" aria-hidden="true">#</a> Document Segmentation &amp; Design</h4>
<p>For consolidating vast projects, managing and organizing documents is paramount. By segmenting the content, we effectively cater to diverse reader profiles:</p>
<ul>
<li>
<p>Document Abstraction Layers:</p>
<p>Significant design efforts ensure each section serves a distinct purpose and audience.</p>
<ul>
<li><strong>Community:</strong> Guidelines and resources for community engagement.</li>
<li><strong>Blog:</strong> Changelogs, feature introspections, and relevant articles.</li>
<li><strong>Docs:</strong> Technical documents, API references, installation, and configuration guides.</li>
</ul>
</li>
</ul>
<h4 id="automated-document-generation-deployment" tabindex="-1"><a class="header-anchor" href="#automated-document-generation-deployment" aria-hidden="true">#</a> Automated Document Generation &amp; Deployment</h4>
<p>Automation is the cornerstone of efficient documentation management. We've instituted tools and workflows to simplify document creation and deployment:</p>
<ul>
<li>
<p><strong>Automation Tools:</strong> On Mac and Linux platforms, we employ <code v-pre>make</code> and <code v-pre>gendocs</code> to automate certain documentation processes.</p>
<ul>
<li>
<p>Example: The following command auto-generates multilingual markdown documents and their foundational templates.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">make</span> new-post <span class="token assign-left variable">POST_NAME</span><span class="token operator">=</span><span class="token string">"openim-offline-deployment-design"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p><strong>Testing &amp; Deployment:</strong> GitHub actions test the documents, generating test reports. Additionally, a DevOps workflow ensures documentation accuracy and relevance.</p>
<ul>
<li>Upon passing tests, GitHub actions deploy these, synchronizing with Netlify. Netlify then completes the deployment, rendering the corresponding web pages.</li>
<li>Notably, <code v-pre>https://netlify.app/</code> leverages plugins for accelerated access in regions like China.</li>
</ul>
</li>
</ul>
<h4 id="bidirectional-document-synchronization-strategy" tabindex="-1"><a class="header-anchor" href="#bidirectional-document-synchronization-strategy" aria-hidden="true">#</a> Bidirectional Document Synchronization Strategy</h4>
<p>In multi-repository management, bidirectional document synchronization is challenging. We've devised the following solution to streamline this process:</p>
<ul>
<li>
<p>Webhook Integration:</p>
<p>Webhooks link the directories of</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>GitHub openim/website
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>with sub-repositories like <code v-pre>openim-server</code> and <code v-pre>openim-chat</code> :</p>
<ul>
<li>Modifications made to markdown documents in these sub-repositories automatically reflect in the <code v-pre>website</code> repository, eliminating manual maintenance and synchronization, thereby enhancing efficiency.</li>
</ul>
</li>
</ul>
<p>In summary, this strategy offers a comprehensive guide and toolset for document management, automated deployment, and bidirectional synchronization. This not only guarantees document precision and quality but also significantly elevates the team's productivity.</p>
<h2 id="添加内容" tabindex="-1"><a class="header-anchor" href="#添加内容" aria-hidden="true">#</a> 添加内容</h2>
<p><strong>替代站点结构：</strong></p>
<p>默认情况下，您的网站有一个主页（使用 <code v-pre>_default</code> 布局）， <code v-pre>/docs/</code> 下的文档部分， <code v-pre>/blog/</code> 下的博客部分和 <code v-pre>/community/</code> 下的社区部分。每个节的类型（决定了它使用的布局）与其目录名相匹配。</p>
<p>在某些情况下，您可能想要有不同的目录结构，但仍然使用 Docsy 的布局。一个常见的示例是“Dosc site”，其中大多数页面（包括主页）都使用 docs 布局，或者您可能更希望使用<code v-pre>/news/</code>博客布局处理目录。</p>
<p>对于该<code v-pre>/news/</code>部分，您可以在索引页中指定以下前言，这会将该部分及其下面的所有内容的类型更改为“blog”：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">title</span><span class="token punctuation">:</span> <span class="token string">"Latest News"</span>
<span class="token key atrule">linkTitle</span><span class="token punctuation">:</span> <span class="token string">"News"</span>
<span class="token key atrule">menu</span><span class="token punctuation">:</span>
  <span class="token key atrule">main</span><span class="token punctuation">:</span>
    <span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">30</span>

<span class="token key atrule">cascade</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">"blog"</span>
<span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果您想创建一个“Doc”网站，在顶层指定类似以下内容<code v-pre>_index.md</code>会将所有顶层部分设置为“文档”，“新闻”除外：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">title</span><span class="token punctuation">:</span> <span class="token string">"My Wonderful Site"</span>

<span class="token key atrule">cascade</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">"blog"</span>
    <span class="token key atrule">toc_root</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">_target</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"/news/**"</span>
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> <span class="token string">"docs"</span>
    <span class="token key atrule">_target</span><span class="token punctuation">:</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> <span class="token string">"/**"</span>
<span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意这里添加<code v-pre>toc_root</code>。将某个部分设置为 true 会使其被视为网站的单独部分，并具有自己的左侧导航菜单。</p>
<h3 id="风格" tabindex="-1"><a class="header-anchor" href="#风格" aria-hidden="true">#</a> 风格</h3>
<p>We don’t mandate any particular style for your page contents. However, if you’d like some guidance on how to write and format clear, concise technical documentation, we recommend the <a href="https://developers.google.com/style/" target="_blank" rel="noopener noreferrer">Google Developer Documentation Style Guide<ExternalLinkIcon/></a>, particularly the <a href="https://developers.google.com/style/highlights" target="_blank" rel="noopener noreferrer">Style Guide Highlights<ExternalLinkIcon/></a>.</p>
<h3 id="文档开头" tabindex="-1"><a class="header-anchor" href="#文档开头" aria-hidden="true">#</a> 文档开头</h3>
<p>文档开头的部分被称为“front matter”。这部分用于定义文章或页面的元数据。Hugo 支持几种不同的 front matter 格式，包括 YAML、TOML 和 JSON。</p>
<ul>
<li>使用 <code v-pre>+++</code> 是 TOML 格式的标识。</li>
<li>使用 <code v-pre>---</code> 是 YAML 格式的标识。</li>
</ul>
<p><strong>front matter 支持很多类型：</strong></p>
<ol>
<li><strong>title</strong>: 文章或页面的标题。</li>
<li><strong>description</strong>: 文章或页面的简短描述。</li>
<li><strong>date</strong>: 文章或页面的发布日期。</li>
<li><strong>lastmod</strong>: 文章或页面的最后修改日期。</li>
<li><strong>draft</strong>: 如果设置为 <code v-pre>true</code>，该文章或页面将被视为草稿，不会在生成的网站中显示。</li>
<li><strong>slug</strong>: 自定义的URL片段，代替自动生成的URL。</li>
<li><strong>aliases</strong>: 为内容设置其他URL，通常用于重定向。</li>
<li><strong>tags</strong>: 与内容相关的标签列表。</li>
<li><strong>categories</strong>: 与内容相关的分类列表。</li>
<li><strong>author</strong>: 文章或页面的作者。</li>
<li><strong>layout</strong>: 指定内容的特定布局（如果有的话）。</li>
<li><strong>type</strong>: 内容的类型（例如 &quot;post&quot;, &quot;page&quot; 等）。</li>
<li><strong>weight</strong>: 在列表中的排序权重。数字越小，内容在列表中的位置越高。</li>
<li><strong>featured_image</strong>: 文章或页面的特色图像。</li>
<li><strong>expiryDate</strong>: 内容的过期日期。在此日期后，内容将不再公开显示。</li>
<li><strong>series</strong>: 将内容链接到一个系列。</li>
<li><strong>url</strong>: 手动指定该页面的URL。</li>
</ol>
<p>您需要提供的最少标题是标题（<strong>title</strong>）：其他一切都取决于您</p>
<h3 id="添加文档和博客文章" tabindex="-1"><a class="header-anchor" href="#添加文档和博客文章" aria-hidden="true">#</a> 添加文档和博客文章</h3>
<p>您最常用的模板可能是 <code v-pre>docs</code> 模板（如本页所用）或非常相似的 <code v-pre>blog</code> 模板。这两个模板包括：</p>
<ul>
<li>左导航</li>
<li>GitHub链接（从您的站点配置填充），供读者编辑页面或创建问 issue</li>
<li>页面菜单</li>
</ul>
<p>以及所有站点页面使用的公共页眉和页脚。应用哪个模板取决于您是将内容添加到 <code v-pre>blog</code> 还是 <code v-pre>docs</code> 内容目录。您可以在导航和搜索中找到有关如何创建导航和页面菜单的更多信息。</p>
<h3 id="管理和组织文档" tabindex="-1"><a class="header-anchor" href="#管理和组织文档" aria-hidden="true">#</a> 管理和组织文档</h3>
<p>虽然Docsy的顶级部分允许您为不同类型的内容创建站点部分，但您可能还希望在 <code v-pre>docs</code> 部分中组织文档内容。例如，此站点的 <code v-pre>docs</code> 部分目录有多个子目录，分别用于“入门”、“内容”和“自定义”等。每个子目录都有一个 <code v-pre>_index.md</code> （也可以是一个 <code v-pre>_index.html</code> ），它充当一个章节索引页面，并告诉Hugo相关目录是文档的一个子章节。</p>
<p>Docsy的 <code v-pre>docs</code> 布局为您提供了一个左侧导航窗格，其中包含一个基于您的 <code v-pre>docs</code> 文件结构自动生成的嵌套菜单。 <code v-pre>docs/</code> 目录中的每个独立页面或子部分 <code v-pre>_index.md</code> 或 <code v-pre>_index.html</code> 页面使用来自页面或索引的链接名称和 <code v-pre>weight</code> 元数据获得顶级菜单项。</p>
<p>要将文档添加到子部分，只需将页面文件添加到相关子目录。除了子部分索引页之外，您添加到子部分的任何页面都将显示在子菜单中（请向左查看运行中的子菜单！），再次按页码 <code v-pre>weight</code> 排序。在导航和搜索中了解有关添加Docsy导航元数据的更多信息</p>
<h3 id="文档部分登录页" tabindex="-1"><a class="header-anchor" href="#文档部分登录页" aria-hidden="true">#</a> 文档部分登录页</h3>
<p>默认情况下，文档部分的登录页（部分目录中的 <code v-pre>_index.md</code> 或 <code v-pre>_index.html</code> ）使用的布局会将格式化的链接列表添加到部分中的页面，并带有它们的frontmatter描述。此站点中的“内容和自定义”登录页就是一个很好的例子。</p>
<p>要显示指向该部分页面的简单项目符号链接列表，请在登录页的frontmatter中指定 <code v-pre>simple_list: true</code> ：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">title</span><span class="token punctuation">:</span> <span class="token string">"Simple List Page"</span>
<span class="token key atrule">simple_list</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">20</span>
<span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要完全不显示链接，请在登录页的frontmatter中指定 <code v-pre>no_list: true</code> ：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">title</span><span class="token punctuation">:</span> <span class="token string">"No List Page"</span>
<span class="token key atrule">no_list</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
<span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">20</span>
<span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="组织和管理-blog-页面" tabindex="-1"><a class="header-anchor" href="#组织和管理-blog-页面" aria-hidden="true">#</a> 组织和管理 blog 页面</h3>
<p>Docsy的 <code v-pre>blog</code> 布局也为你提供了一个左侧导航菜单（就像 <code v-pre>docs</code> 布局一样），以及一个应用于 <code v-pre>/blog/_index.md</code> 的列表类型的博客索引页面，并自动以倒序时间顺序显示你最近所有帖子的片段。</p>
<p>要创建不同的博客类别来组织您的帖子，请在 <code v-pre>blog/</code> 中创建子文件夹。例如，在我们的示例站点中，我们有 <code v-pre>news</code> 和 <code v-pre>releases</code> 。每个类别都需要有自己的 <code v-pre>_index.md</code> 或 <code v-pre>_index.html</code> 登陆页面文件，指定类别标题，以便在左侧导航和顶级博客登陆页面中正确显示。以下是 <code v-pre>releases</code> 的索引页：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">title</span><span class="token punctuation">:</span> <span class="token string">"New Releases"</span>
<span class="token key atrule">linkTitle</span><span class="token punctuation">:</span> <span class="token string">"Releases"</span>
<span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">20</span>
<span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>若要向博客文章添加作者和日期信息，请将其添加到页面frontmatter：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">date</span><span class="token punctuation">:</span> <span class="token datetime number">2018-10-06</span>
<span class="token key atrule">title</span><span class="token punctuation">:</span> <span class="token string">"Easy documentation with Docsy"</span>
<span class="token key atrule">linkTitle</span><span class="token punctuation">:</span> <span class="token string">"Announcing Docsy"</span>
<span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">"The Docsy Hugo theme lets project maintainers and contributors focus on content, not on reinventing a website infrastructure from scratch"</span>
<span class="token key atrule">author</span><span class="token punctuation">:</span> Riona MacNamara
<span class="token key atrule">resources</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">src</span><span class="token punctuation">:</span> <span class="token string">"**.{png,jpg}"</span>
    <span class="token key atrule">title</span><span class="token punctuation">:</span> <span class="token string">"Image #:counter"</span>
    <span class="token key atrule">params</span><span class="token punctuation">:</span>
    <span class="token key atrule">byline</span><span class="token punctuation">:</span> <span class="token string">"Photo: Riona MacNamara / CC-BY-CA"</span>
<span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你已经复制了示例站点，并且你不想要一个博客部分，或者想链接到一个外部博客，只需删除 <code v-pre>blog</code> 子目录。</p>
<h3 id="添加-community-页面" tabindex="-1"><a class="header-anchor" href="#添加-community-页面" aria-hidden="true">#</a> 添加 community 页面</h3>
<p><code v-pre>community</code> 登录页模板具有样板内容，这些内容会自动填充 <code v-pre>hugo.toml</code> / <code v-pre>hugo.yaml</code> / <code v-pre>hugo.json</code> 中指定的项目名称和社区链接，为您的用户提供指向资源的快速链接，以帮助他们参与您的项目。默认情况下，相同的链接也会添加到您的网站页脚。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">params</span><span class="token punctuation">:</span>
  <span class="token key atrule">links</span><span class="token punctuation">:</span>
    <span class="token key atrule">user</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> User mailing list
        <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">'https://example.org/mail'</span>
        <span class="token key atrule">icon</span><span class="token punctuation">:</span> fa fa<span class="token punctuation">-</span>envelope
        <span class="token key atrule">desc</span><span class="token punctuation">:</span> Discussion and help from your fellow users
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Twitter
        <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">'https://example.org/twitter'</span>
        <span class="token key atrule">icon</span><span class="token punctuation">:</span> fab fa<span class="token punctuation">-</span>twitter
        <span class="token key atrule">desc</span><span class="token punctuation">:</span> Follow us on Twitter to get the latest news<span class="token tag">!</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Stack Overflow
        <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">'https://example.org/stack'</span>
        <span class="token key atrule">icon</span><span class="token punctuation">:</span> fab fa<span class="token punctuation">-</span>stack<span class="token punctuation">-</span>overflow
        <span class="token key atrule">desc</span><span class="token punctuation">:</span> Practical questions and curated answers
    <span class="token key atrule">developer</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> GitHub
        <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">'https://github.com/google/docsy'</span>
        <span class="token key atrule">icon</span><span class="token punctuation">:</span> fab fa<span class="token punctuation">-</span>github
        <span class="token key atrule">desc</span><span class="token punctuation">:</span> Development takes place here<span class="token tag">!</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Slack
        <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">'https://example.org/slack'</span>
        <span class="token key atrule">icon</span><span class="token punctuation">:</span> fab fa<span class="token punctuation">-</span>slack
        <span class="token key atrule">desc</span><span class="token punctuation">:</span> Chat with other project developers
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Developer mailing list
        <span class="token key atrule">url</span><span class="token punctuation">:</span> <span class="token string">'https://example.org/mail'</span>
        <span class="token key atrule">icon</span><span class="token punctuation">:</span> fa fa<span class="token punctuation">-</span>envelope
        <span class="token key atrule">desc</span><span class="token punctuation">:</span> Discuss development issues around the project

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果您正在创建自己的网站并希望使用此模板添加页面，请在内容根目录中添加 <code v-pre>/community/_index.md</code> 文件。如果你已经复制了示例站点，并且不想要社区页面，只需删除项目存储库中的 <code v-pre>/content/en/community/</code> 目录。</p>
<h3 id="添加静态的资源内容" tabindex="-1"><a class="header-anchor" href="#添加静态的资源内容" aria-hidden="true">#</a> 添加静态的资源内容</h3>
<p>您可能希望在您的网站上提供一些非Hugo构建的内容：例如，如果您使用Doxygen、Javadoc或其他文档生成工具生成了参考文档。</p>
<p>要添加要“按原样”提供的静态内容，只需将内容作为文件夹和/或文件添加到站点的 <code v-pre>static</code> 目录中。部署站点时，此目录中的内容将在站点根路径上提供。因此，例如，如果您在 <code v-pre>/static/reference/cpp/</code> 添加了内容，用户可以在 <code v-pre>http://{server-url}/reference/cpp/</code> 访问该内容，并且您可以从 <code v-pre>/reference/cpp/{file name}</code> 的其他页面链接到此目录中的页面。</p>
<h3 id="rss-feeds" tabindex="-1"><a class="header-anchor" href="#rss-feeds" aria-hidden="true">#</a> RSS feeds</h3>
<p>默认情况下，Hugo将为主页和任何部分创建RSS提要。对于主RSS提要，您可以通过在 <code v-pre>hugo.toml</code> / <code v-pre>hugo.yaml</code> / <code v-pre>hugo.json</code> 中设置站点参数来控制要包含的部分。这是默认配置：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">rss_sections</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> blog
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>要禁用所有RSS源，请将以下内容添加到您的 <code v-pre>hugo.toml</code> / <code v-pre>hugo.yaml</code> / <code v-pre>hugo.json</code> ：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">disableKinds</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> RSS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="sitemap" tabindex="-1"><a class="header-anchor" href="#sitemap" aria-hidden="true">#</a> Sitemap</h3>
<p>默认情况下，Hugo会为您生成的站点创建一个 <code v-pre>sitemap.xml</code> 文件：例如，这里是这个站点的站点地图。</p>
<p>您可以在 <code v-pre>hugo.toml</code> / <code v-pre>hugo.yaml</code> / <code v-pre>hugo.json</code> 中配置站点地图的更新频率、站点地图文件名和默认页面优先级：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">sitemap</span><span class="token punctuation">:</span>
  <span class="token key atrule">changefreq</span><span class="token punctuation">:</span> monthly
  <span class="token key atrule">filename</span><span class="token punctuation">:</span> sitemap.xml
  <span class="token key atrule">priority</span><span class="token punctuation">:</span> <span class="token number">0.5</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如说我的 blog 的站点地图：https://nsddd.top/sitemap.xml</p>
<p>要为给定页面覆盖这些值中的任何一个，请在页面frontmatter中指定它：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">title</span><span class="token punctuation">:</span> <span class="token string">"Adding Content"</span>
<span class="token key atrule">linkTitle</span><span class="token punctuation">:</span> <span class="token string">"Adding Content"</span>
<span class="token key atrule">weight</span><span class="token punctuation">:</span> <span class="token number">1</span>
<span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token punctuation">></span><span class="token scalar string">
  Add different types of content to your Docsy site.  </span>
<span class="token key atrule">sitemap</span><span class="token punctuation">:</span>
  <span class="token key atrule">priority</span><span class="token punctuation">:</span> <span class="token number">1.0</span>
<span class="token punctuation">---</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="外观" tabindex="-1"><a class="header-anchor" href="#外观" aria-hidden="true">#</a> 外观</h2>
<p>默认情况下，使用Docsy的站点具有主题的默认字体、颜色和一般外观。</p>
<p>但是，如果你想要自己的配色方案（你很可能会！）你可以很容易地用你自己的项目特定值覆盖主题默认值- Hugo会在寻找建立网站的信息时首先查看你的项目文件。</p>
<p>由于Docsy使用Bootstrap 4和SCSS进行样式化，您可以在其特殊的SCSS项目变量文件中覆盖单个值（例如项目颜色和字体），或者通过创建自己的样式来进行更严格的定制。</p>
<p>Docsy还提供了样式化代码块的选项，使用Chroma或Prism进行高亮显示。</p>
<h3 id="project-style-files" tabindex="-1"><a class="header-anchor" href="#project-style-files" aria-hidden="true">#</a> Project style files</h3>
<p>要自定义项目的外观，请创建您自己的以下Docsy占位符文件之一或两个版本（注意 <code v-pre>_project.scss</code> 后缀）：</p>
<ul>
<li><code v-pre>assets/scss/_variables_project.scss</code> 用于添加主题变量（如站点颜色）的项目特定定义，以及您想要设置的任何其他Bootstrap变量值。您可以在 <code v-pre>assets/scss/_variables.scss</code> 中找到Docsy主题变量及其默认值的列表。有关其他Bootstrap 4变量的信息，请参阅变量默认值和Bootstrap的 <code v-pre>v4-dev/scss/_variables.scss</code> 文件。</li>
<li><code v-pre>assets/scss/</code> <code v-pre>_styles_project.scss</code> 是您可以添加自己的自定义SCSS样式的地方，包括覆盖Docsy主题SCSS文件中的任何样式。</li>
</ul>
<blockquote>
<p>PostCSS（CSS浏览器前缀的自动修复）在服务器模式下运行时不会启用（有点慢），因此Chrome是开发的推荐选择。</p>
</blockquote>
<h3 id="site-colors" tabindex="-1"><a class="header-anchor" href="#site-colors" aria-hidden="true">#</a> Site colors</h3>
<p>要自定义站点的颜色，请将SCSS变量覆盖添加到 <code v-pre>assets/scss/_variables_project.scss</code> 。例如，可以按以下方式设置主站点颜色和辅助站点颜色：</p>
<div class="language-scss ext-scss line-numbers-mode"><pre v-pre class="language-scss"><code><span class="token property"><span class="token variable">$primary</span></span><span class="token punctuation">:</span> #390040<span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$secondary</span></span><span class="token punctuation">:</span> #A23B72<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，该主题具有渐变背景（ <code v-pre>$enable-gradients</code> ）和阴影（ <code v-pre>$enable-shadows</code> ）等功能。也可以通过将变量设置为 <code v-pre>false</code> 在项目变量文件中切换这些变量。</p>
<h3 id="fonts" tabindex="-1"><a class="header-anchor" href="#fonts" aria-hidden="true">#</a> Fonts</h3>
<p>主题使用 <a href="https://fonts.google.com/specimen/Open+Sans" target="_blank" rel="noopener noreferrer">Open Sans<ExternalLinkIcon/></a> 作为其主要字体。要禁用Google字体并使用系统字体，请在 <code v-pre>assets/scss/_variables_project.scss</code> 中设置此SCSS变量：</p>
<div class="language-scss ext-scss line-numbers-mode"><pre v-pre class="language-scss"><code><span class="token property"><span class="token variable">$td-enable-google-fonts</span></span><span class="token punctuation">:</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>要配置另一个Google Font：</p>
<div class="language-scss ext-scss line-numbers-mode"><pre v-pre class="language-scss"><code><span class="token property"><span class="token variable">$google_font_name</span></span><span class="token punctuation">:</span> <span class="token string">"Open Sans"</span><span class="token punctuation">;</span>
<span class="token property"><span class="token variable">$google_font_family</span></span><span class="token punctuation">:</span> <span class="token string">"Open+Sans:300,300i,400,400i,700,700i"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>请注意，如果您决定使用具有不同权重的字体（在内置配置中，这是 <code v-pre>300</code> （浅色）， <code v-pre>400</code> （中等）和 <code v-pre>700</code> （粗体）），您还需要调整与权重相关的变量，即：从 <code v-pre>$font-weight-</code> 开始的变量。</p>
<h3 id="css-utilities" tabindex="-1"><a class="header-anchor" href="#css-utilities" aria-hidden="true">#</a> CSS utilities</h3>
<p>有关可用CSS实用程序类的文档，请参阅Bootstrap文档。这一主题本身在这方面的贡献很少。然而，我们添加了一些颜色状态CSS类，这些类在动态环境中可能很有用：</p>
<ul>
<li><code v-pre>.-bg-&lt;color&gt;</code></li>
<li><code v-pre>.-text-&lt;color&gt;</code></li>
</ul>
<p><code v-pre>&lt;color&gt;</code> 的值可以是颜色名称 <code v-pre>primary</code> 、 <code v-pre>white</code> 、 <code v-pre>dark</code> 、 <code v-pre>warning</code> 、 <code v-pre>light</code> 、 <code v-pre>success</code> 、 <code v-pre>300</code> 、 <code v-pre>blue</code> 、 <code v-pre>orange</code> 等中的任一个。</p>
<p>使用 <code v-pre>.-bg-&lt;color&gt;</code> 时，文本颜色将被调整以获得适当的对比度：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>-bg-primary p-3 display-4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Background: Primary<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>-bg-200 p-3 display-4<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Background: Gray 200<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用色度高亮显示代码" tabindex="-1"><a class="header-anchor" href="#使用色度高亮显示代码" aria-hidden="true">#</a> 使用色度高亮显示代码</h3>
<p>使用Hugo 0.60及更高版本，您可以使用默认应用于您的围栏代码块的色度从一系列代码块高亮和颜色样式中进行选择。如果你复制了最近的 <code v-pre>hugo.toml</code> ，你的网站使用Tango（像这个网站），否则Hugo默认为Monokai。您可以使用您的 <code v-pre>hugo.toml</code> / <code v-pre>hugo.yaml</code> / <code v-pre>hugo.json</code> 切换到任何可用的Chroma样式（包括Docsy默认Tango）：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">markup</span><span class="token punctuation">:</span>
  <span class="token key atrule">goldmark</span><span class="token punctuation">:</span>
    <span class="token key atrule">renderer</span><span class="token punctuation">:</span>
      <span class="token key atrule">unsafe</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">highlight</span><span class="token punctuation">:</span>
    <span class="token key atrule">style</span><span class="token punctuation">:</span> tango

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>默认情况下，代码高亮显示样式不会应用于没有指定语言的代码块，相反，您会得到Docsy默认的灰色和黑色文本样式。</p>
<p>如果您希望代码突出显示样式应用于所有代码块（即使没有语言），请在您的 <code v-pre>hugo.toml</code> / <code v-pre>hugo.yaml</code> / <code v-pre>hugo.json</code> 中的 <code v-pre>[markup.highlight]</code> 下取消注释或添加以下行。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">guessSyntax</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果您使用的Docsy版本高于 <code v-pre>0.6.0</code> ，代码块会在右上角显示一个“复制到剪贴板”图标。要禁用此功能，请在配置文件中将 <code v-pre>disable_click2copy_chroma</code> 设置为 <code v-pre>true</code> ：</p>
<p>您可以在Hugo中找到有关代码高亮显示的更多信息，并在语法高亮显示中使用色度。</p>
<h2 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h2>
<h2 id="can-i-use-the-latest-hugo-version-on-netlify" tabindex="-1"><a class="header-anchor" href="#can-i-use-the-latest-hugo-version-on-netlify" aria-hidden="true">#</a> Can I use the latest Hugo version on Netlify?</h2>
<p>Yes you can! Read <RouterLink to="/hosting-and-deployment/hosting-on-netlify/#configure-hugo-version-in-netlify">this</RouterLink>.</p>
<h2 id="i-get-this-feature-is-not-available-in-your-current-hugo-version" tabindex="-1"><a class="header-anchor" href="#i-get-this-feature-is-not-available-in-your-current-hugo-version" aria-hidden="true">#</a> I get &quot;this feature is not available in your current Hugo version&quot;</h2>
<p>If you process <code v-pre>SCSS</code> or <code v-pre>SASS</code> to <code v-pre>CSS</code> in your Hugo project, you need the Hugo <code v-pre>extended</code> version, or else you may see this error message:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>error: failed to transform resource: TOCSS: failed to transform <span class="token string">"scss/main.scss"</span> <span class="token punctuation">(</span>text/x-scss<span class="token punctuation">)</span>: this feature is not available <span class="token keyword">in</span> your current Hugo version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>We release two set of binaries for technical reasons. The extended is what you get by default, as an example, when you run <code v-pre>brew install hugo</code> on <code v-pre>macOS</code>. On the <a href="https://github.com/gohugoio/hugo/releases" target="_blank" rel="noopener noreferrer">release page<ExternalLinkIcon/></a>, look for archives with <code v-pre>extended</code> in the name.</p>
<p>To confirm, run <code v-pre>hugo version</code> and look for the word <code v-pre>extended</code>.</p>
<h2 id="can-i-use-the-latest-hugo-version-on-netlify-1" tabindex="-1"><a class="header-anchor" href="#can-i-use-the-latest-hugo-version-on-netlify-1" aria-hidden="true">#</a> Can I use the latest Hugo version on Netlify?</h2>
<p>这个标题问的是：“我可以在 Netlify 上使用最新的 Hugo 版本吗？”</p>
<p>答案是：“当然可以！”并为读者提供了一个链接，以供查看如何在 Netlify 上配置 Hugo 的版本。</p>
<h2 id="i-get-this-feature-is-not-available-in-your-current-hugo-version-1" tabindex="-1"><a class="header-anchor" href="#i-get-this-feature-is-not-available-in-your-current-hugo-version-1" aria-hidden="true">#</a> I get &quot;this feature is not available in your current Hugo version&quot;</h2>
<p>这个标题描述了一个用户可能遇到的问题：“我得到了'在您当前的 Hugo 版本中，此功能不可用'这样的消息。”</p>
<p>文本接下来解释了产生这个问题的原因：如果你在 Hugo 项目中将 <code v-pre>SCSS</code> 或 <code v-pre>SASS</code> 处理为 <code v-pre>CSS</code>，那么你需要 Hugo 的 <code v-pre>extended</code>（扩展）版本，否则你可能会看到这个错误信息。</p>
<p>接着给出了一个错误信息的示例，这条错误信息说明在尝试转换 SCSS 文件时出现了问题，因为当前的 Hugo 版本不支持这个特性。</p>
<p>接着，文本解释了 Hugo 为何会发布两种版本的二进制文件，并提到了如何在 macOS 上通过 <code v-pre>brew</code> 工具安装 Hugo 扩展版本。要确定是否已经安装了扩展版本，用户可以运行 <code v-pre>hugo version</code> 并检查输出信息中是否有 “extended” 这个词。</p>
<p>最后，提供了 Hugo 的官方发布页面链接，用户可以在那里找到并下载带有 <code v-pre>extended</code> 标识的版本。</p>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考" aria-hidden="true">#</a> 参考</h2>
<h2 id="docsy-theme-examples" tabindex="-1"><a class="header-anchor" href="#docsy-theme-examples" aria-hidden="true">#</a> Docsy theme examples</h2>
<p>Example sites that have low to no customization:</p>
<table>
<thead>
<tr>
<th>Site</th>
<th>Repo</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://www.docsy.dev/docs" target="_blank" rel="noopener noreferrer">This Docsy documentation site<ExternalLinkIcon/></a></td>
<td>https://github.com/google/docsy</td>
</tr>
<tr>
<td><a href="https://example.docsy.dev/" target="_blank" rel="noopener noreferrer">“Goldydocs” - a Docsy example site<ExternalLinkIcon/></a></td>
<td>https://github.com/google/docsy-example</td>
</tr>
<tr>
<td>https://www.kubeflow.org/</td>
<td>https://github.com/kubeflow/website</td>
</tr>
<tr>
<td>https://agones.dev/site/</td>
<td>https://github.com/googleforgames/agones/tree/main/site</td>
</tr>
<tr>
<td>https://googlecontainertools.github.io/kpt/</td>
<td>https://github.com/GoogleContainerTools/kpt/tree/main/docs</td>
</tr>
<tr>
<td><a href="https://www.navidrome.org/" target="_blank" rel="noopener noreferrer">Navidrome Music Server<ExternalLinkIcon/></a></td>
<td>https://github.com/navidrome/website</td>
</tr>
<tr>
<td>https://docs.agilebase.co.uk/</td>
<td>https://github.com/okohll/abdocs</td>
</tr>
<tr>
<td>https://jvmperf.net/</td>
<td>https://github.com/cchesser/java-perf-workshop</td>
</tr>
<tr>
<td><a href="https://www.grpc.io/" target="_blank" rel="noopener noreferrer">gRPC<ExternalLinkIcon/></a></td>
<td>https://github.com/grpc/grpc.io</td>
</tr>
<tr>
<td><a href="https://tekton.dev/" target="_blank" rel="noopener noreferrer">tekton.dev<ExternalLinkIcon/></a></td>
<td>https://github.com/tektoncd</td>
</tr>
<tr>
<td><a href="https://fluxcd.io/" target="_blank" rel="noopener noreferrer">fluxcd.io<ExternalLinkIcon/></a></td>
<td>https://github.com/fluxcd/website</td>
</tr>
<tr>
<td><a href="https://graphviz.org/" target="_blank" rel="noopener noreferrer">Graphviz<ExternalLinkIcon/></a></td>
<td>https://gitlab.com/graphviz/graphviz.gitlab.io</td>
</tr>
<tr>
<td><a href="https://www.cloudpods.org/" target="_blank" rel="noopener noreferrer">Cloudpods<ExternalLinkIcon/></a></td>
<td>https://github.com/yunionio/docs</td>
</tr>
<tr>
<td><a href="https://www.selenium.dev/" target="_blank" rel="noopener noreferrer">Selenium<ExternalLinkIcon/></a></td>
<td>https://github.com/SeleniumHQ/seleniumhq.github.io</td>
</tr>
<tr>
<td><a href="https://fission.io/" target="_blank" rel="noopener noreferrer">fission.io<ExternalLinkIcon/></a></td>
<td>https://github.com/fission/fission.io</td>
</tr>
<tr>
<td><a href="https://gchq.github.io/stroom-docs" target="_blank" rel="noopener noreferrer">Stroom<ExternalLinkIcon/></a></td>
<td>https://github.com/gchq/stroom-docs</td>
</tr>
<tr>
<td><a href="https://opentelemetry.io/" target="_blank" rel="noopener noreferrer">OpenTelemetry<ExternalLinkIcon/></a></td>
<td>https://github.com/open-telemetry/opentelemetry.io</td>
</tr>
<tr>
<td><a href="https://www.cloudwego.io/" target="_blank" rel="noopener noreferrer">CloudWeGo<ExternalLinkIcon/></a></td>
<td>https://github.com/cloudwego/cloudwego.github.io</td>
</tr>
<tr>
<td><a href="https://etcd.io/" target="_blank" rel="noopener noreferrer">etcd<ExternalLinkIcon/></a></td>
<td>https://github.com/etcd-io/website</td>
</tr>
<tr>
<td><a href="https://protobuf.dev/" target="_blank" rel="noopener noreferrer">protobuf.dev<ExternalLinkIcon/></a></td>
<td>https://github.com/protocolbuffers/protocolbuffers.github.io</td>
</tr>
</tbody>
</table>
<h2 id="customized-docsy-examples" tabindex="-1"><a class="header-anchor" href="#customized-docsy-examples" aria-hidden="true">#</a> Customized Docsy examples</h2>
<p>Example sites that include a moderate to high amount of customization:</p>
<table>
<thead>
<tr>
<th>Site</th>
<th>Repo</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://airflow.apache.org/" target="_blank" rel="noopener noreferrer">Apache Airflow<ExternalLinkIcon/></a></td>
<td>https://github.com/apache/airflow-site/</td>
</tr>
<tr>
<td><a href="https://mostlydocs.netlify.app/" target="_blank" rel="noopener noreferrer">Docsy Mostly Docs<ExternalLinkIcon/></a></td>
<td>https://github.com/gwatts/mostlydocs/</td>
</tr>
<tr>
<td><a href="https://kubernetes.io/" target="_blank" rel="noopener noreferrer">Kubernetes<ExternalLinkIcon/></a></td>
<td>https://github.com/kubernetes/website</td>
</tr>
<tr>
<td><a href="https://xltdoc.xceptance.com/" target="_blank" rel="noopener noreferrer">XLT<ExternalLinkIcon/></a></td>
<td>https://github.com/Xceptance/xlt-documentation</td>
</tr>
<tr>
<td><a href="https://docs.dapr.io/" target="_blank" rel="noopener noreferrer">Dapr<ExternalLinkIcon/></a></td>
<td>https://github.com/dapr/docs</td>
</tr>
</tbody>
</table>
</div></template>


