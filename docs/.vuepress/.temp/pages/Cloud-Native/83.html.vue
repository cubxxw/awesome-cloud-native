<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第83节-custom-actions" tabindex="-1"><a class="header-anchor" href="#第83节-custom-actions" aria-hidden="true">#</a> 第83节 Custom actions</h1>
<div><a href = '82.md' style='float:left'>⬆️上一节🔗  </a><a href = '84.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="创建-actions" tabindex="-1"><a class="header-anchor" href="#创建-actions" aria-hidden="true">#</a> 创建 actions</h2>
<p><strong>actions 是可以联合收割机以创建作业和自定义工作流的单个任务。您可以创建自己的操作，或使用和自定义GitHub社区共享的操作。</strong></p>
<p>可以通过编写自定义代码来创建操作，这些代码可以以您喜欢的任何方式与您的存储库进行交互，包括与GitHub的API和任何公开可用的第三方API集成。</p>
<p>可以编写自己的操作以在工作流中使用，或与GitHub社区共享您构建的操作。要与所有人共享您构建的操作，您的存储库必须是公共的。</p>
<p>操作可以直接在机器上或Docker容器中运行。您可以定义操作的输入、输出和环境变量。</p>
<p>可以构建Docker容器、JavaScript和复合操作。操作需要一个元数据文件来定义操作的输入、输出和主入口点。元数据文件名必须为 <code v-pre>action.yml</code> 或 <code v-pre>action.yaml</code> 。有关更多信息，请参阅“GitHub操作的元数据语法。“</p>
<h2 id="docker-容器操作" tabindex="-1"><a class="header-anchor" href="#docker-容器操作" aria-hidden="true">#</a> docker 容器操作</h2>
<p>Docker容器用GitHub Actions代码打包环境。这创建了一个更加一致和可靠的工作单元，因为操作的使用者不需要担心工具或依赖项。</p>
<p>Docker容器允许您使用特定版本的操作系统、依赖项、工具和代码。对于必须在特定环境配置中运行的操作，Docker是理想的选择，因为您可以自定义操作系统和工具。</p>
<h2 id="对操作进行发布管理" tabindex="-1"><a class="header-anchor" href="#对操作进行发布管理" aria-hidden="true">#</a> 对操作进行发布管理</h2>
<p>如果您正在开发供其他人使用的操作，我们建议使用发布管理来控制分发更新的方式。</p>
<p>用户可以期望操作的修补程序版本包括必要的关键修复程序和安全修补程序，同时仍与其现有工作流保持兼容。每当您的更改影响兼容性时，您应该考虑发布新的主版本。</p>
<p>在这种发布管理方法下，用户不应该引用操作的默认分支，因为它可能包含最新的代码，因此可能不稳定。</p>
<p>相反，您可以建议用户在使用您的操作时指定一个主要版本，并且仅在遇到问题时才将他们引导到更具体的版本。</p>
<p>要使用特定的操作版本，用户可以配置他们的GitHub操作工作流，以针对标签，提交的SHA或以发布命名的分支。</p>
<h2 id="使用标签进行发布管理" tabindex="-1"><a class="header-anchor" href="#使用标签进行发布管理" aria-hidden="true">#</a> 使用标签进行发布管理</h2>
<p>我们建议使用标签进行操作发布管理。使用此方法，您的用户可以轻松区分主版本和次版本：</p>
<ul>
<li>在创建发布标签（例如 <code v-pre>v1.0.2</code> ）之前，在发布分支（例如 <code v-pre>release/v1</code> ）上创建并验证发布。</li>
<li>使用语义版本控制创建发布
<ul>
<li>文件列表的右侧，单击<strong>Releases</strong></li>
<li>页面顶部，单击<strong>草拟新版本</strong>。</li>
<li>要为发布选择标签，请选择<strong>选择标签</strong>下拉菜单。</li>
<li>如果您创建了一个新标签，请选择<strong>目标</strong>下拉菜单，然后单击包含您要发布的项目的分支。</li>
<li>在“描述此版本”字段中，为您的版本键入描述。如果您在描述中 <code v-pre>@mention</code> 任何人，发布的版本将包含一个<strong>贡献者</strong>部分，其中包含所有提及用户的头像列表。或者，您可以通过单击生成发行说明自动<strong>生成发行说明</strong>。</li>
<li>或者，要在您的版本中包含二进制文件（例如已编译的程序），请在二进制文件框中拖放或手动选择文件</li>
<li>或者，选择<strong>设置为最新版本</strong>。如果不选择此选项，将根据语义版本控制自动分配最新版本标签。</li>
<li>如果您准备好发布您的版本，请单击<strong>发布版本</strong>。要稍后处理该版本，请单击<strong>保存草稿</strong>。然后，您可以在存储库的发布提要中查看已发布或草稿的发布。有关详细信息，请参阅“<a href="https://docs.github.com/en/repositories/releasing-projects-on-github/viewing-your-repositorys-releases-and-tags" target="_blank" rel="noopener noreferrer">查看存储库的版本和标签<ExternalLinkIcon/></a>”。</li>
</ul>
</li>
<li>移动major version标签（例如 <code v-pre>v1</code> 、 <code v-pre>v2</code> ），指向当前版本的Git ref。例如：<code v-pre> git tag -a v1.4 -m &quot;my version 1.4&quot;</code></li>
<li>引入新的主要版本标记（ <code v-pre>v2</code> ），用于将破坏现有工作流的更改。例如，更改操作的输入将是一个突破性的更改。</li>
<li>主要版本最初可以使用 <code v-pre>beta</code> 标签发布，以指示其状态，例如 <code v-pre>v2-beta</code> 。 <code v-pre>-beta</code> 标签可以在准备好时移除。</li>
</ul>
<h3 id="带有查询参数的发布表单自动化" tabindex="-1"><a class="header-anchor" href="#带有查询参数的发布表单自动化" aria-hidden="true">#</a> 带有查询参数的发布表单自动化</h3>
<blockquote>
<p>要通过使用自定义信息自动填充新发布表单来快速创建发布，您可以将查询参数添加到发布表单页面的 URL。</p>
</blockquote>
<p>查询参数是 URL 的可选部分，您可以自定义以共享特定网页视图，例如搜索筛选结果、问题模板或 GitHub 上的发布表单页面。要创建自己的查询参数，您必须匹配键值对。</p>
<table>
<thead>
<tr>
<th style="text-align:left">查询参数</th>
<th style="text-align:left">例子</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>tag</code></td>
<td style="text-align:left"><code v-pre>https://github.com/octo-org/octo-repo/releases/new?tag=v1.0.1</code>基于名为“v1.0.1”的标签创建一个版本。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>target</code></td>
<td style="text-align:left"><code v-pre>https://github.com/octo-org/octo-repo/releases/new?target=release-1.0.1</code>根据对“release-1.0.1”分支的最新提交创建一个版本。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>title</code></td>
<td style="text-align:left"><code v-pre>https://github.com/octo-org/octo-repo/releases/new?tag=v1.0.1&amp;title=octo-1.0.1</code>基于名为“v1.0.1”的标签创建名为“octo-1.0.1”的版本。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>body</code></td>
<td style="text-align:left"><code v-pre>https://github.com/octo-org/octo-repo/releases/new?body=Adds+widgets+support</code>在发布正文中创建一个带有描述“添加小部件支持”的发布。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>prerelease</code></td>
<td style="text-align:left"><code v-pre>https://github.com/octo-org/octo-repo/releases/new?prerelease=1</code>创建一个将被标识为非生产就绪的版本。</td>
</tr>
</tbody>
</table>
<h3 id="如何引用版本" tabindex="-1"><a class="header-anchor" href="#如何引用版本" aria-hidden="true">#</a> 如何引用版本</h3>
<p>此示例演示了用户如何引用主要版本标记：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>steps:
    - uses: actions/javascript-action@v1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此示例演示了用户如何引用特定的修补程序版本标记：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>steps:
    - uses: actions/javascript-action@v1.0.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用分支进行版本管理" tabindex="-1"><a class="header-anchor" href="#使用分支进行版本管理" aria-hidden="true">#</a> 使用分支进行版本管理</h2>
<p>如果您更喜欢使用分支名称进行发布管理，则此示例演示如何引用命名分支：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/javascript<span class="token punctuation">-</span>action@v1<span class="token punctuation">-</span>beta
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用提交的sha进行发布管理" tabindex="-1"><a class="header-anchor" href="#使用提交的sha进行发布管理" aria-hidden="true">#</a> 使用提交的SHA进行发布管理</h2>
<p>每个Git提交都会收到一个计算出来的SHA值，这个值是唯一的，不可变的。你的动作的用户可能更喜欢依赖于提交的SHA值，因为这种方法比指定一个标签更可靠，而标签可能会被删除或移动。</p>
<p>但是，这意味着用户将不会收到对操作的进一步更新。您必须使用提交的完整SHA值，而不是缩写值。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">steps</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/javascript<span class="token punctuation">-</span>action@a824008085750b8e136effc585c3cd6082bd575f
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="github-actions-和-github-apps-的对比" tabindex="-1"><a class="header-anchor" href="#github-actions-和-github-apps-的对比" aria-hidden="true">#</a> GitHub actions 和 GitHub apps 的对比</h2>
<p>虽然GitHub Actions和GitHub Apps都提供了构建自动化和工作流工具的方法，但它们各自都有优势，使它们在不同的方面发挥作用。</p>
<p><strong>GitHub apps：</strong></p>
<ul>
<li>持续运行，并能快速响应事件。</li>
<li>在需要持久性数据时工作出色。</li>
<li>最适合不耗时的API请求。</li>
<li>在您提供的服务器或计算基础架构上运行。</li>
</ul>
<p><strong>GitHub actions：</strong></p>
<ul>
<li>提供可执行持续集成和持续部署的自动化。</li>
<li>可以直接在runner机器或Docker容器中运行。</li>
<li>可以包括对存储库的克隆的访问，从而使部署和发布工具、代码格式化程序和命令行工具能够访问代码。</li>
<li>不需要部署代码或提供应用程序。</li>
<li>有一个简单的界面来创建和使用secret，它使操作能够与第三方服务交互，而无需存储使用操作的人的凭据。</li>
</ul>
<h2 id="创建-docker-容器-actions" tabindex="-1"><a class="header-anchor" href="#创建-docker-容器-actions" aria-hidden="true">#</a> 创建 docker 容器 actions</h2>
<p>你将了解创建和使用打包的Docker容器操作所需的基本组件。为了将本指南的重点放在打包操作所需的组件上，操作代码的功能是最小的。</p>
<h3 id="creating-a-dockerfile" tabindex="-1"><a class="header-anchor" href="#creating-a-dockerfile" aria-hidden="true">#</a> Creating a Dockerfile</h3>
<p>在新的 <code v-pre>hello-world-docker-action</code> 目录中，创建一个新的 <code v-pre>Dockerfile</code> 文件。如果您遇到问题，请确保文件名的大写正确（使用大写 <code v-pre>D</code> 而不是大写 <code v-pre>f</code> ）。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code># Container image that runs your code
FROM alpine<span class="token punctuation">:</span><span class="token number">3.10</span>

# Copies your code file from your action repository to the filesystem path <span class="token string">`/`</span> of the container
COPY entrypoint<span class="token punctuation">.</span>sh <span class="token operator">/</span>entrypoint<span class="token punctuation">.</span>sh

# Code file to execute when the docker container starts up <span class="token punctuation">(</span><span class="token string">`entrypoint.sh`</span><span class="token punctuation">)</span>
ENTRYPOINT <span class="token punctuation">[</span><span class="token string">"/entrypoint.sh"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="元数据-actions-语法" tabindex="-1"><a class="header-anchor" href="#元数据-actions-语法" aria-hidden="true">#</a> 元数据 actions 语法</h3>
<p>所有操作都需要一个元数据文件。元数据文件名必须是<code v-pre>action.yml</code>或<code v-pre>action.yaml</code>. 元数据文件中的数据为您的操作定义输入、输出和运行配置。</p>
<ul>
<li>name：<strong>必填</strong>。您的操作的名称。<code v-pre>name</code>GitHub在<strong>操作</strong>选项卡中显示，以帮助直观地识别每个作业中的操作。</li>
<li>description：<em>可选</em>。对您的操作进行简短的描述。GitHub将在操作的详细信息页面上显示此描述。</li>
<li>author：<em>可选</em>。操作的作者或组织名称。</li>
<li>inputs：<em>可选</em>。定义操作的输入参数。每个输入都是一个键值对，其中键是参数名称，值是描述该参数的属性。属性包括<code v-pre>description</code>、<code v-pre>required</code>和<code v-pre>default</code>。</li>
<li>outputs：<em>可选</em>。定义操作的输出参数。每个输出都是一个键值对，其中键是参数名称，值是描述该参数的属性。属性包括<code v-pre>description</code>和<code v-pre>value</code>。</li>
<li>runs：<strong>必填</strong>。定义操作的运行配置。运行配置指定操作应该运行在哪个操作系统和环境中。运行配置包括<code v-pre>using</code>、<code v-pre>image</code>和<code v-pre>args</code>。</li>
<li>branding： <strong>可选</strong>您可以使用颜色和<a href="https://feathericons.com/" target="_blank" rel="noopener noreferrer">羽毛<ExternalLinkIcon/></a>图标创建徽章来个性化和区分您的操作。徽章显示在<a href="https://github.com/marketplace?type=actions" target="_blank" rel="noopener noreferrer">GitHub Marketplace<ExternalLinkIcon/></a>中您的操作名称旁边。</li>
</ul>
<p><strong>指定输入：</strong></p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">inputs</span><span class="token punctuation">:</span>
  <span class="token key atrule">num-octocats</span><span class="token punctuation">:</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">'Number of Octocats'</span>
    <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token string">'1'</span>
  <span class="token key atrule">octocat-eye-color</span><span class="token punctuation">:</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">'Eye color of the Octocats'</span>
    <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此示例配置两个输入：<code v-pre>num-octocats</code>和<code v-pre>octocat-eye-color</code>。输入<code v-pre>num-octocats</code>不是必需的，默认值为“1”；<code v-pre>octocat-eye-color</code>是必需的，没有默认值。使用此操作的工作流文件必须使用<code v-pre>with</code>关键字为 设置输入值<code v-pre>octocat-eye-color</code>。</p>
<p>当您在工作流文件中指定输入或使用默认输入值时，GitHub 会为输入创建一个名为 的环境变量<code v-pre>INPUT_&lt;VARIABLE_NAME&gt;</code>。创建的环境变量将输入名称转换为大写字母并将空格替换为<code v-pre>_</code>字符。</p>
<p>如果 action 是使用<a href="https://docs.github.com/en/actions/creating-actions/creating-a-composite-action" target="_blank" rel="noopener noreferrer">composite<ExternalLinkIcon/></a>编写的，那么它不会自动获取<code v-pre>INPUT_&lt;VARIABLE_NAME&gt;</code>。如果没有发生转换，您可以手动更改这些输入。</p>
<p>要访问 Docker 容器操作中的环境变量，您必须使用<code v-pre>args</code>操作元数据文件中的关键字传递输入。有关 Docker 容器操作的操作元数据文件的更多信息，请参阅“<a href="https://docs.github.com/en/actions/creating-actions/creating-a-docker-container-action#creating-an-action-metadata-file" target="_blank" rel="noopener noreferrer">创建 Docker 容器操作<ExternalLinkIcon/></a>”。</p>
<p>例如，如果工作流定义了<code v-pre>num-octocats</code>和输入，则操作代码可以使用和环境变量<code v-pre>octocat-eye-color</code>读取输入值。<code v-pre>INPUT_NUM-OCTOCATS INPUT_OCTOCAT-EYE-COLOR</code></p>
<p><strong>参数</strong>：</p>
<ul>
<li>
<p><code v-pre>inputs.&lt;input_id&gt;</code>: <strong>必需</strong><code v-pre>string</code>与输入关联的标识符。的值<code v-pre>&lt;input_id&gt;</code>是输入元数据的映射。必须<code v-pre>&lt;input_id&gt;</code>是对象内的唯一标识符<code v-pre>inputs</code>。必须<code v-pre>&lt;input_id&gt;</code>以字母 or 开头，<code v-pre>_</code>并且仅包含字母数字字符 ,<code v-pre>-</code>或<code v-pre>_</code>。</p>
</li>
<li>
<p><code v-pre>inputs.&lt;input_id&gt;.description</code> : <strong>必需</strong><code v-pre>string</code>对输入参数的描述。</p>
</li>
</ul>
<ul>
<li><code v-pre>inputs.&lt;input_id&gt;.required</code>: 表示该输入参数是否是必需的，如果为 true，则在运行工作流程时必须提供该输入参数的值，否则工作流程将失败。</li>
<li><code v-pre>inputs.&lt;input_id&gt;.default</code>: 表示该输入参数的默认值，如果在运行工作流程时未提供该输入参数的值，则使用该默认值。</li>
<li><code v-pre>inputs.&lt;input_id&gt;.env</code>: 表示将该输入参数的值作为环境变量传递给工作流程中的步骤。例如，可以使用 <code v-pre>${{ env.INPUT_NAME }}</code> 的方式在步骤中引用该输入参数的值。</li>
<li><code v-pre>inputs.&lt;input_id&gt;.group</code>: 表示将该输入参数分组，可以将多个输入参数分组到同一个组中，以便更好地组织和显示它们。</li>
</ul>
<h3 id="创建操作元数据文件" tabindex="-1"><a class="header-anchor" href="#创建操作元数据文件" aria-hidden="true">#</a> 创建操作元数据文件</h3>
<p>在上面创建的 <code v-pre>hello-world-docker-action</code> 目录中创建一个新的 <code v-pre>action.yml</code> 文件。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># action.yml</span>
<span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">'Hello World'</span>
<span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">'Greet someone and record the time'</span>
<span class="token key atrule">inputs</span><span class="token punctuation">:</span>
  <span class="token key atrule">who-to-greet</span><span class="token punctuation">:</span>  <span class="token comment"># id of input</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">'Who to greet'</span>
    <span class="token key atrule">required</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">default</span><span class="token punctuation">:</span> <span class="token string">'World'</span>
<span class="token key atrule">outputs</span><span class="token punctuation">:</span>
  <span class="token key atrule">time</span><span class="token punctuation">:</span> <span class="token comment"># id of output</span>
    <span class="token key atrule">description</span><span class="token punctuation">:</span> <span class="token string">'The time we greeted you'</span>
<span class="token key atrule">runs</span><span class="token punctuation">:</span>
  <span class="token key atrule">using</span><span class="token punctuation">:</span> <span class="token string">'docker'</span>
  <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">'Dockerfile'</span>
  <span class="token key atrule">args</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> inputs.who<span class="token punctuation">-</span>to<span class="token punctuation">-</span>greet <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>该元数据定义一个 <code v-pre>who-to-greet</code> 输入和一个 <code v-pre>time</code> 输出参数。要将输入传递给Docker容器，您应该使用 <code v-pre>inputs</code> 声明输入，并在 <code v-pre>args</code> 关键字中传递输入。您在 <code v-pre>args</code> 中包含的所有内容都将传递到容器，但为了让用户更好地发现您的操作，我们建议使用输入。</p>
<p>GitHub将从您的 Dockerfile 构建一个镜像，并使用此镜像在新容器中运行命令。</p>
<h3 id="编写操作代码" tabindex="-1"><a class="header-anchor" href="#编写操作代码" aria-hidden="true">#</a> 编写操作代码</h3>
<p>你可以选择任何基本的Docker镜像，因此，你的操作也可以选择任何语言。下面的shell脚本示例使用 <code v-pre>who-to-greet</code> 输入变量在日志文件中打印&quot;Hello [who-to-greet]&quot;。</p>
<p>接下来，脚本获取当前时间，并将其设置为输出变量，作业中稍后运行的操作可以使用该输出变量。为了让GitHub识别输出变量，你必须将它们写入 <code v-pre>$GITHUB_OUTPUT</code> 环境文件： <code v-pre>echo &quot;&lt;output name&gt;=&lt;value&gt;&quot; &gt;&gt; $GITHUB_OUTPUT</code> .有关更多信息，请参阅“GitHub操作的工作流命令。“</p>
<ol>
<li>
<p>在 <code v-pre>hello-world-docker-action</code> 目录中创建新的 <code v-pre>entrypoint.sh</code> 文件。</p>
</li>
<li>
<p>将以下代码添加到 <code v-pre>entrypoint.sh</code> 文件中。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token shebang important">#!/bin/sh -l</span>

<span class="token builtin class-name">echo</span> <span class="token string">"Hello <span class="token variable">$1</span>"</span>
<span class="token assign-left variable">time</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">date</span><span class="token variable">)</span></span>
<span class="token builtin class-name">echo</span> <span class="token string">"time=<span class="token variable">$time</span>"</span> <span class="token operator">>></span> <span class="token variable">$GITHUB_OUTPUT</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>如果 <code v-pre>entrypoint.sh</code> 执行时没有任何错误，则操作的状态设置为 <code v-pre>success</code> 。还可以在操作代码中显式设置退出代码，以提供操作的状态。有关详细信息，请参阅“设置操作的退出代码。“</p>
</blockquote>
</li>
<li>
<p>使您的 <code v-pre>entrypoint.sh</code> 文件可执行。Git提供了一种方法来显式地更改文件的权限模式，这样它就不会在每次有克隆/分叉时都被重置。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> <span class="token function">add</span> entrypoint.sh
$ <span class="token function">git</span> update-index <span class="token parameter variable">--chmod</span><span class="token operator">=</span>+x entrypoint.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></li>
<li>
<p>可选地，要检查git索引中文件的权限模式，请运行以下命令。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">git</span> ls-files <span class="token parameter variable">--stage</span> entrypoint.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ol>
<h2 id="在工作流中测试您的操作" tabindex="-1"><a class="header-anchor" href="#在工作流中测试您的操作" aria-hidden="true">#</a> 在工作流中测试您的操作</h2>
<p>现在您已经准备好在工作流中测试您的操作了。</p>
<ul>
<li>公共操作可由任何存储库中的工作流使用。</li>
</ul>
<p>以下工作流代码使用公共 <code v-pre>actions/hello-world-docker-action</code> 存储库中已完成的hello world操作。将以下工作流示例代码复制到 <code v-pre>.github/workflows/main.yml</code> 文件中，但用您的存储库和操作名称替换 <code v-pre>actions/hello-world-docker-action</code> 。您也可以将 <code v-pre>who-to-greet</code> 输入替换为您的姓名。即使公共操作没有发布到GitHub Marketplace，也可以使用它们。有关更多信息，请参阅“在GitHub Marketplace中发布操作。&quot;</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>push<span class="token punctuation">]</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">hello_world_job</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">name</span><span class="token punctuation">:</span> A job to say hello
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Hello world action step
        <span class="token key atrule">id</span><span class="token punctuation">:</span> hello
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/hello<span class="token punctuation">-</span>world<span class="token punctuation">-</span>docker<span class="token punctuation">-</span>action@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">who-to-greet</span><span class="token punctuation">:</span> <span class="token string">'Mona the Octocat'</span>
      <span class="token comment"># Use the output from the `hello` step</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Get the output time
        <span class="token key atrule">run</span><span class="token punctuation">:</span> echo "The time was $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.hello.outputs.time <span class="token punctuation">}</span><span class="token punctuation">}</span>"

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从存储库中，单击“操作”选项卡，然后选择最新的工作流运行。在“作业”下或可视化图形中，单击“作业”以打招呼。</p>
<p>单击Hello world操作步骤，您应该会看到“Hello莫纳the Octocat”或您用于 <code v-pre>who-to-greet</code> 输入的名称打印在日志中。单击获取输出时间以查看时间戳。</p>
<h2 id="使用工作流" tabindex="-1"><a class="header-anchor" href="#使用工作流" aria-hidden="true">#</a> 使用工作流</h2>
<p><a href="https://github.com/marketplace?type=actions" target="_blank" rel="noopener noreferrer">GitHub Marketplace<ExternalLinkIcon/></a> 是一个中心位置，您可以找到GitHub社区创建的操作。GitHub Marketplace页面允许您按类别过滤操作。</p>
<p>您在工作流中使用的操作可以在以下中定义：</p>
<ul>
<li>与工作流文件相同的存储库</li>
<li>任何公共存储库</li>
<li>Docker Hub上发布的Docker容器镜像</li>
</ul>
<h3 id="在工作流编辑器中浏览marketplace操作" tabindex="-1"><a class="header-anchor" href="#在工作流编辑器中浏览marketplace操作" aria-hidden="true">#</a> 在工作流编辑器中浏览Marketplace操作</h3>
<p>您可以直接在存储库的工作流编辑器中搜索和浏览操作。从侧边栏中，您可以搜索特定操作、查看特色操作以及浏览特色类别。您还可以查看某个动作从GitHub社区收到的星数。</p>
<ol>
<li>在存储库中，浏览到要编辑的工作流文件。</li>
<li>在文件视图的右上角，要打开工作流编辑器，请单击</li>
<li>在编辑器右侧，使用GitHub Marketplace侧边栏浏览操作。与 徽章表明GitHub已将操作的创建者验证为合作伙伴组织。</li>
</ol>
<h3 id="向工作流添加操作向工作流添加操作" tabindex="-1"><a class="header-anchor" href="#向工作流添加操作向工作流添加操作" aria-hidden="true">#</a> 向工作流添加操作向工作流添加操作</h3>
<p>可以通过引用工作流文件中的操作将操作添加到工作流中。</p>
<p>您可以将GitHub Actions工作流中引用的操作作为依赖关系在包含工作流的存储库的依赖关系图中查看。有关详细信息，请参阅“<a href="https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-the-dependency-graph" target="_blank" rel="noopener noreferrer">关于依赖关系图<ExternalLinkIcon/></a>”。</p>
<h3 id="从github-marketplace添加操作" tabindex="-1"><a class="header-anchor" href="#从github-marketplace添加操作" aria-hidden="true">#</a> 从GitHub Marketplace添加操作</h3>
<p>操作的列表页包括操作的版本和使用操作所需的工作流语法。
为了保持工作流的稳定，即使对操作进行了更新，您可以通过在工作流文件中指定 Git 或 Docker 标记号来引用要使用的操作版本。</p>
<ol>
<li>
<p>导航到要在工作流中使用的操作。</p>
</li>
<li>
<p>单击以查看操作的完整市场列表。</p>
</li>
<li>
<p>在“安装”下，单击 复制工作流语法。</p>
<p><img src="https://docs.github.com/assets/cb-52866/images/help/repository/actions-sidebar-detailed-view.png" alt="Screenshot of the marketplace listing for an action. The &quot;Copy to clipboard&quot; icon for the action is highlighted with a dark orange outline."></p>
</li>
<li>
<p>将语法粘贴为工作流中的新步骤。有关更多信息，请参阅“<a href="https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idsteps" target="_blank" rel="noopener noreferrer">GitHub操作的工作流语法<ExternalLinkIcon/></a>。“</p>
</li>
<li>
<p>如果操作要求您提供输入，请在工作流中设置它们。有关操作可能需要的输入的信息，请参见“<a href="https://docs.github.com/en/actions/learn-github-actions/finding-and-customizing-actions#using-inputs-and-outputs-with-an-action" target="_blank" rel="noopener noreferrer">查找和自定义操作”<ExternalLinkIcon/></a>。“</p>
</li>
</ol>
<p>您还可以为添加到工作流中的操作启用Dependabot版本更新。有关详细信息，请参阅“<a href="https://docs.github.com/en/code-security/dependabot/working-with-dependabot/keeping-your-actions-up-to-date-with-dependabot" target="_blank" rel="noopener noreferrer">使用Dependabot保持您的操作最新<ExternalLinkIcon/></a>。“</p>
<h3 id="从同一存储库添加操作" tabindex="-1"><a class="header-anchor" href="#从同一存储库添加操作" aria-hidden="true">#</a> 从同一存储库添加操作</h3>
<p>如果在工作流文件使用操作的同一存储库中定义了操作，则可以在工作流文件中使用<code v-pre>{owner}/{repo}@{ref}</code>或<code v-pre>./path/to/dir</code>语法引用该操作。</p>
<p>存储库文件结构示例：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>|-- hello-world (repository)
|   |__ .github
|       └── workflows
|           └── my-first-workflow.yml
|       └── actions
|           |__ hello-world-action
|               └── action.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>工作流文件示例：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token comment"># This step checks out a copy of your repository.</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
      <span class="token comment"># This step references the directory that contains the action.</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> ./.github/actions/hello<span class="token punctuation">-</span>world<span class="token punctuation">-</span>action
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>action.yml</code>文件用于为操作提供元数据。在“<a href="https://docs.github.com/en/actions/creating-actions/metadata-syntax-for-github-actions" target="_blank" rel="noopener noreferrer">Metadata syntax for GitHub Actions<ExternalLinkIcon/></a>.“</p>
<h3 id="从其他存储库添加操作" tabindex="-1"><a class="header-anchor" href="#从其他存储库添加操作" aria-hidden="true">#</a> 从其他存储库添加操作</h3>
<p>如果某个操作是在与工作流文件不同的存储库中定义的，则可以在工作流文件中使用<code v-pre>{owner}/{repo}@{ref}</code>语法引用该操作。</p>
<p>操作必须存储在公共存储库中。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">my_first_job</span><span class="token punctuation">:</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> My first step
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在docker-hub上引用容器" tabindex="-1"><a class="header-anchor" href="#在docker-hub上引用容器" aria-hidden="true">#</a> 在Docker Hub上引用容器</h3>
<p>如果在Docker Hub上发布的Docker容器镜像中定义了某个操作，则必须在工作流文件中使用<code v-pre>docker://{image}:{tag}</code>语法引用该操作。为了保护您的代码和数据，我们强烈建议您在将Docker Hub中的Docker容器镜像用于您的工作流程之前，先验证它的完整性。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">my_first_job</span><span class="token punctuation">:</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> My first step
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker<span class="token punctuation">:</span>//alpine<span class="token punctuation">:</span><span class="token number">3.8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有关Docker操作的一些示例，请参见<a href="https://github.com/actions/starter-workflows/blob/main/ci/docker-image.yml" target="_blank" rel="noopener noreferrer">Docker-image.yml工作流<ExternalLinkIcon/></a>和“<a href="https://docs.github.com/en/actions/creating-actions/creating-a-docker-container-action" target="_blank" rel="noopener noreferrer">创建Docker容器操作<ExternalLinkIcon/></a>。“</p>
<h2 id="action-的基本特征" tabindex="-1"><a class="header-anchor" href="#action-的基本特征" aria-hidden="true">#</a> action 的基本特征</h2>
<p>GitHub Actions允许您自定义工作流，以满足您的应用程序和团队的独特需求。例如使用变量、运行脚本以及在作业之间共享数据和工件。</p>
<h3 id="在工作流中使用变量" tabindex="-1"><a class="header-anchor" href="#在工作流中使用变量" aria-hidden="true">#</a> 在工作流中使用变量</h3>
<p>GitHub Actions包括每个工作流运行的默认环境变量。如果需要使用自定义环境变量，可以在YAML工作流文件中设置这些变量。这个例子演示了如何创建名为<code v-pre>POSTGRES_HOST</code>和<code v-pre>POSTGRES_PORT</code>的自定义变量。然后，这些变量可用于<code v-pre>node client.js</code>脚本。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">example-job</span><span class="token punctuation">:</span>
      <span class="token key atrule">steps</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Connect to PostgreSQL
          <span class="token key atrule">run</span><span class="token punctuation">:</span> node client.js
          <span class="token key atrule">env</span><span class="token punctuation">:</span>
            <span class="token key atrule">POSTGRES_HOST</span><span class="token punctuation">:</span> postgres
            <span class="token key atrule">POSTGRES_PORT</span><span class="token punctuation">:</span> <span class="token number">5432</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="向工作流添加脚本" tabindex="-1"><a class="header-anchor" href="#向工作流添加脚本" aria-hidden="true">#</a> 向工作流添加脚本</h3>
<p>您可以使用操作运行脚本和shell命令，然后在分配的运行器上执行这些命令。这个例子演示了一个动作如何使用<code v-pre>run</code>关键字在 runner 上执行<code v-pre>npm install -g bats</code>。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">example-job</span><span class="token punctuation">:</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install <span class="token punctuation">-</span>g bats
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例如，要将脚本作为操作运行，可以将脚本存储在存储库中并提供路径和shell类型。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">example-job</span><span class="token punctuation">:</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run build script
        <span class="token key atrule">run</span><span class="token punctuation">:</span> ./.github/scripts/build.sh
        <span class="token key atrule">shell</span><span class="token punctuation">:</span> bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有关更多信息，请参阅“<a href="https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsrun" target="_blank" rel="noopener noreferrer">GitHub操作的工作流语法<ExternalLinkIcon/></a>。“</p>
<h3 id="在作业之间共享数据" tabindex="-1"><a class="header-anchor" href="#在作业之间共享数据" aria-hidden="true">#</a> 在作业之间共享数据</h3>
<p>如果你的作业生成了你想与同一工作流中的另一个作业共享的文件，或者你想保存这些文件以供以后参考，你可以将它们作为工件存储在GitHub中。工件是在构建和测试代码时创建的文件。例如，工件可能包括二进制文件或包文件、测试结果、屏幕截图或日志文件。工件与创建工件的工作流运行相关联，并可由其他作业使用。在一次运行中调用的所有操作和工作流都对该运行的工件具有写访问权限。</p>
<p>例如，您可以创建一个文件，然后将其作为工件上传。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">example-job</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Save output
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">shell</span><span class="token punctuation">:</span> bash
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          expr 1 + 1 > output.log</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Upload output file
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>artifact@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> output<span class="token punctuation">-</span>log<span class="token punctuation">-</span>file
          <span class="token key atrule">path</span><span class="token punctuation">:</span> output.log
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要从单独的工作流运行中下载工件，您可以使用<code v-pre>actions/download-artifact</code>操作。例如，您可以下载名为<code v-pre>output-log-file</code>的工件。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">example-job</span><span class="token punctuation">:</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Download a single artifact
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/download<span class="token punctuation">-</span>artifact@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">name</span><span class="token punctuation">:</span> output<span class="token punctuation">-</span>log<span class="token punctuation">-</span>file
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要从同一工作流运行中下载工件，您的下载作业应指定<code v-pre>needs: upload-job-name</code>，以便在上载作业完成之前不会启动。</p>
<p>有关工件的详细信息，请参见“<a href="https://docs.github.com/en/actions/using-workflows/storing-workflow-data-as-artifacts" target="_blank" rel="noopener noreferrer">将工作流数据存储为工件<ExternalLinkIcon/></a>。“</p>
<h2 id="context" tabindex="-1"><a class="header-anchor" href="#context" aria-hidden="true">#</a> context</h2>
<p>上下文，关于 github  actions 中的 context 是什么样的</p>
<p>上下文是访问有关工作流运行、变量、运行器环境、作业和步骤的信息的一种方法。每个上下文都是一个包含属性的对象，这些属性可以是字符串或其他对象。</p>
<p>在不同的工作流运行条件下，上下文、对象和属性会有很大差异。例如，仅为矩阵中的作业填充 <code v-pre>matrix</code> 上下文。</p>
<p>可能还是不是很清楚，我们直接看下何时使用 context：</p>
<p>GitHub Actions包含一个名为context的变量集合和一个名为default变量的类似变量集合。这些变量用于工作流中的不同点：</p>
<ul>
<li>默认环境变量（Default environment variables）：这些环境变量只存在于执行作业的运行程序上。有关详细信息，请参阅“变量。“</li>
<li>上下文（context）：您可以在工作流中的任何时候使用大多数上下文，包括默认变量不可用时。例如，您可以使用具有表达式的上下文，在将作业路由到运行程序执行之前执行初始处理;这允许您使用带有条件 <code v-pre>if</code> 关键字的上下文来确定是否应运行某个步骤。一旦作业开始运行，您还可以从正在执行作业的运行程序中检索上下文变量，例如 <code v-pre>runner.os</code> 。有关可以在工作流中使用各种上下文的位置的详细信息，请参阅 “上下文。“</li>
</ul>
<p>以下示例演示了如何在作业中一起使用这些不同类型的变量：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> CI
<span class="token key atrule">on</span><span class="token punctuation">:</span> push
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">prod-check</span><span class="token punctuation">:</span>
    <span class="token key atrule">if</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref == 'refs/heads/main' <span class="token punctuation">}</span><span class="token punctuation">}</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> echo "Deploying to production server on branch $GITHUB_REF"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本例中， <code v-pre>if</code> 语句检查 <code v-pre>github.ref</code> 上下文以确定当前分支名称;如果名称是 <code v-pre>refs/heads/main</code> ，则执行后续步骤。 <code v-pre>if</code> 检查由GitHub Actions处理，只有当结果为 <code v-pre>true</code> 时，作业才会发送给runner。一旦将作业发送给运行程序，就会执行该步骤，并引用来自运行程序的 <code v-pre>$GITHUB_REF</code> 变量。</p>
<h3 id="context-availability" tabindex="-1"><a class="header-anchor" href="#context-availability" aria-hidden="true">#</a> Context availability</h3>
<p>在整个工作流运行过程中，可以使用不同的上下文。例如， <code v-pre>secrets</code> 上下文可以仅在作业内的某些位置处使用。</p>
<p>此外，某些功能可能仅在某些地方使用。例如， <code v-pre>hashFiles</code> 函数并不是在任何地方都可用。</p>
<table>
<thead>
<tr>
<th style="text-align:left">Workflow key 工作流密钥</th>
<th style="text-align:left">Context 语境</th>
<th style="text-align:left">Special functions 特殊功能</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>run-name</code></td>
<td style="text-align:left"><code v-pre>github, inputs, vars</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>concurrency</code></td>
<td style="text-align:left"><code v-pre>github, inputs, vars</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>env</code></td>
<td style="text-align:left"><code v-pre>github, secrets, inputs, vars</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.concurrency</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, inputs, vars</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.container</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, vars, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.container.credentials</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, env, vars, secrets, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.container.env.&lt;env_id&gt;</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, secrets, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.container.image</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, vars, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.continue-on-error</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, vars, matrix, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.defaults.run</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, env, vars, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.env</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, vars, secrets, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.environment</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, vars, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.environment.url</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, steps, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.if</code></td>
<td style="text-align:left"><code v-pre>github, needs, vars, inputs</code></td>
<td style="text-align:left"><code v-pre>always, cancelled, success, failure</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.name</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, vars, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.outputs.&lt;output_id&gt;</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, secrets, steps, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.runs-on</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, vars, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.secrets.&lt;secrets_id&gt;</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, secrets, inputs, vars</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.services</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, vars, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.services.&lt;service_id&gt;.credentials</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, env, vars, secrets, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.services.&lt;service_id&gt;.env.&lt;env_id&gt;</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, secrets, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.steps.continue-on-error</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, secrets, steps, inputs</code></td>
<td style="text-align:left"><code v-pre>hashFiles</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.steps.env</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, secrets, steps, inputs</code></td>
<td style="text-align:left"><code v-pre>hashFiles</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.steps.if</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, steps, inputs</code></td>
<td style="text-align:left"><code v-pre>always, cancelled, success, failure, hashFiles</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.steps.name</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, secrets, steps, inputs</code></td>
<td style="text-align:left"><code v-pre>hashFiles</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.steps.run</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, secrets, steps, inputs</code></td>
<td style="text-align:left"><code v-pre>hashFiles</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.steps.timeout-minutes</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, secrets, steps, inputs</code></td>
<td style="text-align:left"><code v-pre>hashFiles</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.steps.with</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, secrets, steps, inputs</code></td>
<td style="text-align:left"><code v-pre>hashFiles</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.steps.working-directory</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, job, runner, env, vars, secrets, steps, inputs</code></td>
<td style="text-align:left"><code v-pre>hashFiles</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.strategy</code></td>
<td style="text-align:left"><code v-pre>github, needs, vars, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.timeout-minutes</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, vars, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>jobs.&lt;job_id&gt;.with.&lt;with_id&gt;</code></td>
<td style="text-align:left"><code v-pre>github, needs, strategy, matrix, inputs, vars</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>on.workflow_call.inputs.&lt;inputs_id&gt;.default</code></td>
<td style="text-align:left"><code v-pre>github, inputs, vars</code></td>
<td style="text-align:left">None 无</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>on.workflow_call.outputs.&lt;output_id&gt;.value</code></td>
<td style="text-align:left"><code v-pre>github, jobs, vars, inputs</code></td>
<td style="text-align:left">None 无</td>
</tr>
</tbody>
</table>
<h3 id="github-context" tabindex="-1"><a class="header-anchor" href="#github-context" aria-hidden="true">#</a> GitHub context</h3>
<p><code v-pre>github</code> 上下文包含有关工作流运行和触发运行的事件的信息。您还可以在环境变量中读取大部分 <code v-pre>github</code> 上下文数据。有关环境变量的详细信息，请参阅“变量。“</p>
<table>
<thead>
<tr>
<th style="text-align:left">物业名称</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left"><code v-pre>github</code></td>
<td style="text-align:left"><code v-pre>object</code></td>
<td style="text-align:left">工作流中任何作业或步骤期间可用的顶级上下文。该对象包含下面列出的所有属性。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.action</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">当前正在运行的操作的名称或<a href="https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsid" target="_blank" rel="noopener noreferrer"><code v-pre>id</code><ExternalLinkIcon/></a>步骤的名称。GitHub 会删除特殊字符，并<code v-pre>__run</code>在当前步骤运行不带<code v-pre>id</code>. 如果您在同一个作业中多次使用相同的操作，则名称将包含一个后缀，其序列号前面带有下划线。例如，您运行的第一个脚本的名称为<code v-pre>__run</code>，第二个脚本的名称为<code v-pre>__run_2</code>。同样，第二次调用<code v-pre>actions/checkout</code>will 是<code v-pre>actionscheckout2</code>。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.action_path</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">动作所在的路径。此属性仅在复合操作中受支持。您可以使用此路径访问与操作位于同一存储库中的文件，例如通过将目录更改为路径： <code v-pre>cd ${{ github.action_path }}</code>。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.action_ref</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">对于执行操作的步骤，这是正在执行的操作的引用。例如，<code v-pre>v2</code>.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.action_repository</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">对于执行操作的步骤，这是操作的所有者和存储库名称。例如，<code v-pre>actions/checkout</code>.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.action_status</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">对于复合操作，复合操作的当前结果。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.actor</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">触发初始工作流运行的用户的用户名。如果工作流运行是重新运行，则该值可能与 不同<code v-pre>github.triggering_actor</code>。任何工作流重新运行都将使用 的权限<code v-pre>github.actor</code>，即使发起重新运行的参与者 ( <code v-pre>github.triggering_actor</code>) 具有不同的权限。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.actor_id</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">触发初始工作流程运行的人员或应用程序的帐户 ID。例如，<code v-pre>1234567</code>. 请注意，这与演员用户名不同。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.api_url</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">GitHub REST API 的 URL。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.base_ref</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left"><code v-pre>base_ref</code>工作流运行中拉取请求的或目标分支。仅当触发工作流运行的事件为 或 时，此属性才可<code v-pre>pull_request</code>用。<code v-pre>pull_request_target</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.env</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">运行器上从工作流命令设置环境变量的文件的路径。该文件对于当前步骤是唯一的，并且是作业中每个步骤的不同文件。有关更多信息，请参阅“ <a href="https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-environment-variable" target="_blank" rel="noopener noreferrer">GitHub Actions 的工作流程命令<ExternalLinkIcon/></a>”。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.event</code></td>
<td style="text-align:left"><code v-pre>object</code></td>
<td style="text-align:left">完整的事件 Webhook 负载。您可以使用此上下文访问事件的各个属性。该对象与触发工作流运行的事件的 Webhook 负载相同，并且对于每个事件都不同。 每个 GitHub Actions 事件的 Webhook 都链接在“<a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows" target="_blank" rel="noopener noreferrer">触发工作流的事件<ExternalLinkIcon/></a>”中。例如，对于由事件触发的工作流运行<a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#push" target="_blank" rel="noopener noreferrer"><code v-pre>push</code>，该对象包含<ExternalLinkIcon/></a><a href="https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#push" target="_blank" rel="noopener noreferrer">推送 webhook 负载<ExternalLinkIcon/></a>的内容。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.event_name</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">触发工作流运行的事件的名称。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.event_path</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">运行器上包含完整事件 Webhook 负载的文件的路径。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.graphql_url</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">GitHub GraphQL API 的 URL。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.head_ref</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left"><code v-pre>head_ref</code>工作流运行中拉取请求的或源分支。仅当触发工作流运行的事件为 或 时，此属性才可<code v-pre>pull_request</code>用。<code v-pre>pull_request_target</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.job</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left"><a href="https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_id" target="_blank" rel="noopener noreferrer"><code v-pre>job_id</code><ExternalLinkIcon/></a>当前工作的。 注意：此上下文属性由操作运行器设置，并且仅在<code v-pre>steps</code>作业执行期间可用。否则，该属性的值为<code v-pre>null</code>。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.job_workflow_sha</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">对于使用可重用工作流程的作业，可重用工作流程文件的提交 SHA。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.path</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">运行器上从工作流命令设置系统变量的文件的路径<code v-pre>PATH</code>。该文件对于当前步骤是唯一的，并且是作业中每个步骤的不同文件。有关更多信息，请参阅“ <a href="https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#adding-a-system-path" target="_blank" rel="noopener noreferrer">GitHub Actions 的工作流程命令<ExternalLinkIcon/></a>”。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.ref</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">触发工作流运行的分支或标签的完整引用。对于 触发的工作流程<code v-pre>push</code>，这是推送的分支或标签引用。对于 触发的工作流程<code v-pre>pull_request</code>，这是拉取请求合并分支。对于由 触发的工作流程<code v-pre>release</code>，这是创建的发布标签。对于其他触发器，这是触发工作流运行的分支或标记引用。仅当分支或标签可用于事件类型时才设置此值。给出的 ref 是完全形成的，这意味着对于分支，格式是，对于拉取请求，格式是，对于标签，格式是。例如，.<code v-pre>refs/heads/&lt;branch_name&gt;``refs/pull/&lt;pr_number&gt;/merge``refs/tags/&lt;tag_name&gt;``refs/heads/feature-branch-1</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.ref_name</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">触发工作流运行的分支或标签的短引用名称。该值与 GitHub 上显示的分支或标签名称匹配。例如，<code v-pre>feature-branch-1</code>.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.ref_protected</code></td>
<td style="text-align:left"><code v-pre>boolean</code></td>
<td style="text-align:left"><code v-pre>true</code>是否为触发工作流运行的引用配置了分支保护。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.ref_type</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">触发工作流运行的引用类型。有效值为<code v-pre>branch</code>或<code v-pre>tag</code>。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.repository</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">所有者和存储库名称。例如，.<code v-pre>octocat/Hello-World</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.repository_id</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">存储库的 ID。例如，<code v-pre>123456789</code>. 请注意，这与存储库名称不同。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.repository_owner</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">存储库所有者的用户名。例如，<code v-pre>octocat</code>.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.repository_owner_id</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">存储库所有者的帐户 ID。例如，<code v-pre>1234567</code>. 请注意，这与所有者的姓名不同。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.repositoryUrl</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">存储库的 Git URL。例如，.<code v-pre>git://github.com/octocat/hello-world.git</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.retention_days</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">工作流运行日志和工件的保留天数。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.run_id</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">存储库中运行的每个工作流程的唯一编号。如果您重新运行工作流程，此数字不会更改。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.run_number</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">存储库中特定工作流程每次运行的唯一编号。对于工作流第一次运行，该数字从 1 开始，并随着每次新运行而递增。如果您重新运行工作流程，此数字不会更改。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.run_attempt</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">存储库中特定工作流运行的每次尝试的唯一编号。对于工作流第一次尝试运行，此数字从 1 开始，并随着每次重新运行而递增。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.secret_source</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">工作流程中使用的机密的来源。可能的值为<code v-pre>None</code>、<code v-pre>Actions</code>、<code v-pre>Codespaces</code>或<code v-pre>Dependabot</code>。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.server_url</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">GitHub 服务器的 URL。例如：.<code v-pre>https://github.com</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.sha</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">触发工作流程的提交 SHA。此提交 SHA 的值取决于触发工作流的事件。有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows" target="_blank" rel="noopener noreferrer">触发工作流的事件<ExternalLinkIcon/></a>”。例如，<code v-pre>ffac537e6cbbf934b08745a378932722df287a53</code>.</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.token</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">代表存储库上安装的 GitHub 应用程序进行身份验证的令牌。这在功能上等同于<code v-pre>GITHUB_TOKEN</code>秘密。有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/security-guides/automatic-token-authentication" target="_blank" rel="noopener noreferrer">自动令牌身份验证<ExternalLinkIcon/></a>”。 注意：此上下文属性由操作运行器设置，并且仅在<code v-pre>steps</code>作业执行期间可用。否则，该属性的值为<code v-pre>null</code>。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.triggering_actor</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">启动工作流运行的用户的用户名。如果工作流运行是重新运行，则该值可能与 不同<code v-pre>github.actor</code>。任何工作流重新运行都将使用 的权限<code v-pre>github.actor</code>，即使发起重新运行的参与者 ( <code v-pre>github.triggering_actor</code>) 具有不同的权限。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.workflow</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">工作流程的名称。如果工作流文件未指定 a <code v-pre>name</code>，则此属性的值是存储库中工作流文件的完整路径。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.workflow_ref</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">工作流程的参考路径。例如，.<code v-pre>octocat/hello-world/.github/workflows/my-workflow.yml@refs/heads/my_branch</code></td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.workflow_sha</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">工作流文件的提交 SHA。</td>
</tr>
<tr>
<td style="text-align:left"><code v-pre>github.workspace</code></td>
<td style="text-align:left"><code v-pre>string</code></td>
<td style="text-align:left">步骤运行器上的默认工作目录，以及使用操作时存储库的默认位置<a href="https://github.com/actions/checkout" target="_blank" rel="noopener noreferrer"><code v-pre>checkout</code><ExternalLinkIcon/></a>。</td>
</tr>
</tbody>
</table>
<h3 id="一些功能案例" tabindex="-1"><a class="header-anchor" href="#一些功能案例" aria-hidden="true">#</a> 一些功能案例</h3>
<table>
<thead>
<tr>
<th style="text-align:left"><strong>特征</strong></th>
<th style="text-align:left"><strong>执行</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">触发工作流自动运行</td>
<td style="text-align:left"><a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#push" target="_blank" rel="noopener noreferrer"><code v-pre>push</code><ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">触发工作流自动运行</td>
<td style="text-align:left"><a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#pull_request" target="_blank" rel="noopener noreferrer"><code v-pre>pull_request</code><ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">从 UI 手动运行工作流程</td>
<td style="text-align:left"><a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch" target="_blank" rel="noopener noreferrer"><code v-pre>workflow_dispatch</code><ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">设置令牌的权限</td>
<td style="text-align:left"><a href="https://docs.github.com/en/actions/using-jobs/assigning-permissions-to-jobs" target="_blank" rel="noopener noreferrer"><code v-pre>permissions</code><ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">控制可以同时运行的工作流程或作业数量</td>
<td style="text-align:left"><a href="https://docs.github.com/en/actions/using-jobs/using-concurrency" target="_blank" rel="noopener noreferrer"><code v-pre>concurrency</code><ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">根据存储库在不同的运行器上运行作业</td>
<td style="text-align:left"><a href="https://docs.github.com/en/actions/using-jobs/choosing-the-runner-for-a-job" target="_blank" rel="noopener noreferrer"><code v-pre>runs-on</code><ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">将您的存储库克隆到运行器</td>
<td style="text-align:left"><a href="https://github.com/actions/checkout" target="_blank" rel="noopener noreferrer"><code v-pre>actions/checkout</code><ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">安装<code v-pre>node</code>在转轮上</td>
<td style="text-align:left"><a href="https://github.com/actions/setup-node" target="_blank" rel="noopener noreferrer"><code v-pre>actions/setup-node</code><ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">使用第三方操作</td>
<td style="text-align:left"><a href="https://github.com/trilom/file-changes-action" target="_blank" rel="noopener noreferrer"><code v-pre>trilom/file-changes-action</code><ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">在运行器上运行脚本</td>
<td style="text-align:left">使用<code v-pre>./script/rendered-content-link-checker.mjs</code></td>
</tr>
</tbody>
</table>
<h2 id="actions-高级功能" tabindex="-1"><a class="header-anchor" href="#actions-高级功能" aria-hidden="true">#</a> actions 高级功能</h2>
<p>本节简要介绍 GitHub Actions 的一些高级功能，可帮助您创建更复杂的工作流程。</p>
<h3 id="储存秘密" tabindex="-1"><a class="header-anchor" href="#储存秘密" aria-hidden="true">#</a> 储存秘密</h3>
<p><em>如果您的工作流程使用敏感数据（例如密码或证书），您可以将这些数据作为机密</em> 保存在 GitHub 中，然后在工作流程中将它们用作环境变量。这意味着您将能够创建和共享工作流程，而无需将敏感值直接嵌入到工作流程的 YAML 源中。</p>
<p>此示例作业演示了如何引用现有密钥作为环境变量，并将其作为参数发送到示例命令。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">example-job</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Retrieve secret
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">super_secret</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SUPERSECRET <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          example-command "$super_secret"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创造依赖工作" tabindex="-1"><a class="header-anchor" href="#创造依赖工作" aria-hidden="true">#</a> 创造依赖工作</h3>
<p>默认情况下，工作流程中的作业全部同时 <strong>并行运行</strong>。如果您的作业必须仅在另一个作业完成后运行，则可以使用关键字<code v-pre>needs</code>创建此依赖项。如果其中一项作业失败，则跳过所有相关作业；但是，如果您需要继续执行作业，则可以使用<code v-pre>if</code>条件语句进行定义。</p>
<p>在此示例中，<code v-pre>setup</code>、<code v-pre>build</code>和<code v-pre>test</code>作业串联运行，并且<code v-pre>build</code>依赖<code v-pre>test</code>于它们之前的作业是否成功完成：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">setup</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> ./setup_server.sh
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">needs</span><span class="token punctuation">:</span> setup
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> ./build_server.sh
  <span class="token key atrule">test</span><span class="token punctuation">:</span>
    <span class="token key atrule">needs</span><span class="token punctuation">:</span> build
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> ./test_server.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/using-jobs/using-jobs-in-a-workflow#defining-prerequisite-jobs" target="_blank" rel="noopener noreferrer">在工作流程中使用作业<ExternalLinkIcon/></a>”。</p>
<h3 id="使用矩阵" tabindex="-1"><a class="header-anchor" href="#使用矩阵" aria-hidden="true">#</a> 使用矩阵</h3>
<p>矩阵策略允许您在单个作业定义中使用变量来自动创建基于变量组合的多个作业运行。例如，您可以使用矩阵策略在一种语言的多个版本或多个操作系统上测试您的代码。该矩阵是使用<code v-pre>strategy</code>关键字创建的，该关键字以数组形式接收构建选项。例如，此矩阵将使用不同版本的 Node.js 多次运行作业：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">matrix</span><span class="token punctuation">:</span>
        <span class="token key atrule">node</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token number">14</span><span class="token punctuation">,</span> <span class="token number">16</span><span class="token punctuation">]</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.node <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs" target="_blank" rel="noopener noreferrer">为您的作业使用矩阵<ExternalLinkIcon/></a>”。</p>
<h3 id="缓存依赖项" tabindex="-1"><a class="header-anchor" href="#缓存依赖项" aria-hidden="true">#</a> 缓存依赖项</h3>
<p>如果您的作业经常重用依赖项，您可以考虑缓存这些文件以帮助提高性能。创建缓存后，同一存储库中的所有工作流都可以使用它。</p>
<p>此示例演示如何缓存<code v-pre>~/.npm</code>目录：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">example-job</span><span class="token punctuation">:</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Cache node modules
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/cache@v3
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">cache-name</span><span class="token punctuation">:</span> cache<span class="token punctuation">-</span>node<span class="token punctuation">-</span>modules
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> ~/.npm
          <span class="token key atrule">key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> runner.os <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>build<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> env.cache<span class="token punctuation">-</span>name <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> hashFiles('<span class="token important">**/package-lock.json')</span> <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">restore-keys</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            ${{ runner.os }}-build-${{ env.cache-name }}-</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/using-workflows/caching-dependencies-to-speed-up-workflows" target="_blank" rel="noopener noreferrer">缓存依赖项以加快工作流程<ExternalLinkIcon/></a>”。</p>
<h3 id="使用数据库和服务容器" tabindex="-1"><a class="header-anchor" href="#使用数据库和服务容器" aria-hidden="true">#</a> 使用数据库和服务容器</h3>
<p>如果你的工作需要数据库或缓存服务，你可以使用关键字<a href="https://docs.github.com/en/actions/using-jobs/running-jobs-in-a-container" target="_blank" rel="noopener noreferrer"><code v-pre>services</code><ExternalLinkIcon/></a>创建一个临时容器来托管服务；然后，生成的容器可用于该作业中的所有步骤，并在作业完成后被删除。此示例演示了作业如何用于<code v-pre>services</code>创建<code v-pre>postgres</code>容器，然后用于<code v-pre>node</code>连接到服务。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">container-job</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">container</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span>10.18<span class="token punctuation">-</span>jessie
    <span class="token key atrule">services</span><span class="token punctuation">:</span>
      <span class="token key atrule">postgres</span><span class="token punctuation">:</span>
        <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Check out repository code
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Install dependencies
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm ci
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Connect to PostgreSQL
        <span class="token key atrule">run</span><span class="token punctuation">:</span> node client.js
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">POSTGRES_HOST</span><span class="token punctuation">:</span> postgres
          <span class="token key atrule">POSTGRES_PORT</span><span class="token punctuation">:</span> <span class="token number">5432</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/using-containerized-services" target="_blank" rel="noopener noreferrer">使用容器化服务<ExternalLinkIcon/></a>”。</p>
<h3 id="使用标签来路由工作流程" tabindex="-1"><a class="header-anchor" href="#使用标签来路由工作流程" aria-hidden="true">#</a> 使用标签来路由工作流程</h3>
<p>如果您想确保特定类型的运行器将处理您的作业，您可以使用标签来控制作业的执行位置。除了默认标签 之外，您还可以为自托管运行器分配标签<code v-pre>self-hosted</code>。然后，您可以在 YAML 工作流程中引用这些标签，确保作业以可预测的方式路由。GitHub 托管的运行器已分配预定义标签。</p>
<p>此示例显示工作流如何使用标签来指定所需的运行程序：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">example-job</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>self<span class="token punctuation">-</span>hosted<span class="token punctuation">,</span> linux<span class="token punctuation">,</span> x64<span class="token punctuation">,</span> gpu<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>工作流将仅在具有<code v-pre>runs-on</code>数组中所有标签的运行器上运行。该作业将优先转到具有指定标签的空闲自托管运行器。如果没有可用的并且存在具有指定标签的 GitHub 托管运行器，则作业将转到 GitHub 托管运行器。</p>
<p>要了解有关自托管运行器标签的更多信息，请参阅“<a href="https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/using-labels-with-self-hosted-runners" target="_blank" rel="noopener noreferrer">将标签与自托管运行器结合使用<ExternalLinkIcon/></a>”。</p>
<p>要了解有关 GitHub 托管的运行器标签的更多信息，请参阅“<a href="https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources" target="_blank" rel="noopener noreferrer">关于 GitHub 托管的运行器<ExternalLinkIcon/></a>”。</p>
<h3 id="重用工作流程" tabindex="-1"><a class="header-anchor" href="#重用工作流程" aria-hidden="true">#</a> 重用工作流程</h3>
<p>您可以从一个工作流程调用另一个工作流程。这使您可以重用工作流程，避免重复并使工作流程更易于维护。有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/using-workflows/reusing-workflows" target="_blank" rel="noopener noreferrer">重用工作流程<ExternalLinkIcon/></a>”。</p>
<h3 id="使用环境" tabindex="-1"><a class="header-anchor" href="#使用环境" aria-hidden="true">#</a> 使用环境</h3>
<p>您可以使用保护规则和机密配置环境，以控制工作流中作业的执行。工作流中的每个作业都可以引用单个环境。在将引用环境的作业发送到运行器之前，为环境配置的任何保护规则都必须通过。有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment" target="_blank" rel="noopener noreferrer">使用部署环境<ExternalLinkIcon/></a>”。</p>
<h2 id="并发工作" tabindex="-1"><a class="header-anchor" href="#并发工作" aria-hidden="true">#</a> 并发工作</h2>
<p>您可以使用它<code v-pre>jobs.&lt;job_id&gt;.concurrency</code>来确保一次仅运行一个使用相同并发组的作业或工作流。并发组可以是任何字符串或表达式。允许的表达式上下文：<a href="https://docs.github.com/en/actions/learn-github-actions/contexts#github-context" target="_blank" rel="noopener noreferrer"><code v-pre>github</code><ExternalLinkIcon/></a>、<a href="https://docs.github.com/en/actions/learn-github-actions/contexts#inputs-context" target="_blank" rel="noopener noreferrer"><code v-pre>inputs</code><ExternalLinkIcon/></a>、<a href="https://docs.github.com/en/actions/learn-github-actions/contexts#vars-context" target="_blank" rel="noopener noreferrer"><code v-pre>vars</code><ExternalLinkIcon/></a>、<a href="https://docs.github.com/en/actions/learn-github-actions/contexts#needs-context" target="_blank" rel="noopener noreferrer"><code v-pre>needs</code><ExternalLinkIcon/></a>、<a href="https://docs.github.com/en/actions/learn-github-actions/contexts#strategy-context" target="_blank" rel="noopener noreferrer"><code v-pre>strategy</code><ExternalLinkIcon/></a>和<a href="https://docs.github.com/en/actions/learn-github-actions/contexts#matrix-context" target="_blank" rel="noopener noreferrer"><code v-pre>matrix</code><ExternalLinkIcon/></a>。有关表达式的详细信息，请参阅“<a href="https://docs.github.com/en/actions/learn-github-actions/expressions" target="_blank" rel="noopener noreferrer">表达式<ExternalLinkIcon/></a>”。</p>
<p>您还可以<code v-pre>concurrency</code>在工作流程级别指定。有关详细信息，请参阅<a href="https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#concurrency" target="_blank" rel="noopener noreferrer"><code v-pre>concurrency</code><ExternalLinkIcon/></a>。</p>
<p>当并发作业或工作流排队时，如果使用存储库中相同并发组的另一个作业或工作流正在进行中，则排队的作业或工作流将为<code v-pre>pending</code>。并发组中任何先前挂起的作业或工作流都将被取消。要同时取消同一并发组中任何当前正在运行的作业或工作流，请指定<code v-pre>cancel-in-progress: true</code>。</p>
<h3 id="示例-使用并发和默认行为" tabindex="-1"><a class="header-anchor" href="#示例-使用并发和默认行为" aria-hidden="true">#</a> 示例：使用并发和默认行为</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">concurrency</span><span class="token punctuation">:</span> staging_environment
<span class="token key atrule">concurrency</span><span class="token punctuation">:</span> ci<span class="token punctuation">-</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-使用并发取消任何正在进行的作业或运行" tabindex="-1"><a class="header-anchor" href="#示例-使用并发取消任何正在进行的作业或运行" aria-hidden="true">#</a> 示例：使用并发取消任何正在进行的作业或运行</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">concurrency</span><span class="token punctuation">:</span>
  <span class="token key atrule">group</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.ref <span class="token punctuation">}</span><span class="token punctuation">}</span>
  <span class="token key atrule">cancel-in-progress</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="容器中运行" tabindex="-1"><a class="header-anchor" href="#容器中运行" aria-hidden="true">#</a> 容器中运行</h2>
<p>用于<code v-pre>jobs.&lt;job_id&gt;.container</code>创建容器以运行作业中尚未指定容器的任何步骤。如果您有同时使用脚本和容器操作的步骤，则容器操作将作为具有相同卷挂载的同一网络上的同级容器运行。</p>
<p>如果您不设置 a <code v-pre>container</code>，则所有步骤都将直接在 指定的主机上运行，<code v-pre>runs-on</code>除非步骤引用配置为在容器中运行的操作。</p>
<p>案例：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> CI
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main <span class="token punctuation">]</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">container-test-job</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">container</span><span class="token punctuation">:</span>
      <span class="token key atrule">image</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span><span class="token number">14.16</span>
      <span class="token key atrule">env</span><span class="token punctuation">:</span>
        <span class="token key atrule">NODE_ENV</span><span class="token punctuation">:</span> development
      <span class="token key atrule">ports</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> <span class="token number">80</span>
      <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> my_docker_volume<span class="token punctuation">:</span>/volume_mount
      <span class="token key atrule">options</span><span class="token punctuation">:</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>cpus 1
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Check for dockerenv file
        <span class="token key atrule">run</span><span class="token punctuation">:</span> (ls /.dockerenv <span class="token important">&amp;&amp;</span> echo Found dockerenv) <span class="token punctuation">|</span><span class="token punctuation">|</span> (echo No dockerenv)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当您只指定容器镜像时，可以省略该<code v-pre>image</code>关键字。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">container-test-job</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">container</span><span class="token punctuation">:</span> node<span class="token punctuation">:</span><span class="token number">14.16</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定义容器镜像" tabindex="-1"><a class="header-anchor" href="#定义容器镜像" aria-hidden="true">#</a> 定义容器镜像</h2>
<p>用于<code v-pre>jobs.&lt;job_id&gt;.container.image</code>定义用作运行操作的容器的 Docker 映像。该值可以是 Docker Hub 映像名称或注册表名称。</p>
<p>如果镜像的容器注册表需要身份验证才能拉取镜像，您可以使用和来<code v-pre>jobs.&lt;job_id&gt;.container.credentials</code>设置。凭据与您向命令提供的值相同。</p>
<p>map username password <a href="https://docs.docker.com/engine/reference/commandline/login/" target="_blank" rel="noopener noreferrer">docker login<ExternalLinkIcon/></a></p>
<h2 id="将环境变量与容器一起使用" tabindex="-1"><a class="header-anchor" href="#将环境变量与容器一起使用" aria-hidden="true">#</a> 将环境变量与容器一起使用</h2>
<p>用于在容器中<code v-pre>jobs.&lt;job_id&gt;.container.env</code>设置一系列环境变量。<code v-pre>map</code></p>
<p><strong>在容器中安装卷：</strong></p>
<p>用于<code v-pre>jobs.&lt;job_id&gt;.container.volumes</code>设置<code v-pre>array</code>容器使用的卷。您可以使用卷在服务或作业中的其他步骤之间共享数据。您可以在主机上指定命名 Docker 卷、匿名 Docker 卷或绑定安装。</p>
<p>要指定卷，请指定源路径和目标路径：</p>
<p><code v-pre>&lt;source&gt;:&lt;destinationPath&gt;</code>。</p>
<p>是<code v-pre>&lt;source&gt;</code>主机上的卷名称或绝对路径，<code v-pre>&lt;destinationPath&gt;</code>是容器中的绝对路径。</p>
<h3 id="示例-在容器中安装卷" tabindex="-1"><a class="header-anchor" href="#示例-在容器中安装卷" aria-hidden="true">#</a> 示例：在容器中安装卷</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> my_docker_volume<span class="token punctuation">:</span>/volume_mount
  <span class="token punctuation">-</span> /data/my_data
  <span class="token punctuation">-</span> /source/directory<span class="token punctuation">:</span>/destination/directory
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="定义将应用于工作流中的所有作业或作业中所有步骤的默认设置" tabindex="-1"><a class="header-anchor" href="#定义将应用于工作流中的所有作业或作业中所有步骤的默认设置" aria-hidden="true">#</a> 定义将应用于工作流中的所有作业或作业中所有步骤的默认设置</h2>
<p>当使用相同名称定义多个默认设置时，GitHub 将使用最具体的默认设置。例如，作业中定义的默认设置将覆盖在工作流中定义的名称相同的默认设置。</p>
<h3 id="设置默认外壳和工作目录" tabindex="-1"><a class="header-anchor" href="#设置默认外壳和工作目录" aria-hidden="true">#</a> 设置默认外壳和工作目录</h3>
<p>用于 <code v-pre>jobs.&lt;job_id&gt;.defaults</code> 创建 <code v-pre>map</code> 将应用于作业中所有步骤的默认设置。您还可以为整个工作流设置默认设置。有关详细信息，请参见 <code v-pre>defaults</code>  https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#defaults。</p>
<p>当使用相同的名称定义多个默认设置时，GitHub使用最具体的默认设置。例如，在作业中定义的默认设置将覆盖在工作流中定义的同名默认设置。</p>
<h3 id="设置作业的默认shell和工作目录" tabindex="-1"><a class="header-anchor" href="#设置作业的默认shell和工作目录" aria-hidden="true">#</a> 设置作业的默认shell和工作目录</h3>
<p>用于 <code v-pre>jobs.&lt;job_id&gt;.defaults.run</code> 为作业中 <code v-pre>shell</code> <code v-pre>working-directory</code> 的所有 <code v-pre>run</code> 步骤提供默认值。此节中不允许使用上下文和表达式。</p>
<p>可以为作业中的所有步骤提供默认值 <code v-pre>shell</code> 和 <code v-pre>working-directory</code> 选项 <code v-pre>run</code> 。也可以 <code v-pre>run</code> 为整个工作流设置默认设置。有关详细信息，请参见 <code v-pre>jobs.defaults.run</code> 。不能在此关键字中使用上下文或表达式。</p>
<p>当使用相同的名称定义多个默认设置时，GitHub使用最具体的默认设置。例如，在作业中定义的默认设置将覆盖在工作流中定义的同名默认设置。</p>
<h3 id="设置-run-作业的默认步骤选项" tabindex="-1"><a class="header-anchor" href="#设置-run-作业的默认步骤选项" aria-hidden="true">#</a> 设置 <code v-pre>run</code> 作业的默认步骤选项</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">job1</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">defaults</span><span class="token punctuation">:</span>
      <span class="token key atrule">run</span><span class="token punctuation">:</span>
        <span class="token key atrule">shell</span><span class="token punctuation">:</span> bash
        <span class="token key atrule">working-directory</span><span class="token punctuation">:</span> scripts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="为作业分配权限" tabindex="-1"><a class="header-anchor" href="#为作业分配权限" aria-hidden="true">#</a> 为作业分配权限</h2>
<p>您可以使用 <code v-pre>permissions</code> 修改授予的默认权限 <code v-pre>GITHUB_TOKEN</code> ，根据需要添加或删除访问权限，以便仅允许所需的最小访问权限。有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token" target="_blank" rel="noopener noreferrer">自动令牌身份验证。<ExternalLinkIcon/></a>“</p>
<p>您可以将其用作 <code v-pre>permissions</code> 顶级关键字，以应用于工作流中的所有作业或特定作业内的作业。在 <code v-pre>permissions</code> 特定作业中添加密钥时，该作业中使用的所有操作和运行命令都将获得 <code v-pre>GITHUB_TOKEN</code> 您指定的访问权限。有关详细信息，请参见 <code v-pre>jobs.&lt;job_id&gt;.permissions</code> 。</p>
<p>可用的作用域和访问值：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">permissions</span><span class="token punctuation">:</span>
  <span class="token key atrule">actions</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">checks</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">contents</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">deployments</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">id-token</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">issues</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">discussions</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">packages</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">pages</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">pull-requests</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">repository-projects</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">security-events</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
  <span class="token key atrule">statuses</span><span class="token punctuation">:</span> read<span class="token punctuation">|</span>write<span class="token punctuation">|</span>none
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果为这些作用域中的任何一个指定了访问权限，则所有未指定的作用域都将设置为 <code v-pre>none</code> 。</p>
<p>可以使用以下语法定义所有可用作用域的读或写访问权限：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">permissions</span><span class="token punctuation">:</span> read<span class="token punctuation">-</span>all<span class="token punctuation">|</span>write<span class="token punctuation">-</span>all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>可以使用以下语法禁用所有可用作用域的权限：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">permissions</span><span class="token punctuation">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您可以使用该密钥添加和删除派生存储库的读取权限，但通常不能授予写入权限。 <code v-pre>permissions</code> key to add and remove read permissions for forked repositories, but typically you can't grant write access.此行为的例外情况是管理员用户在GitHub Actions设置中选择了“从拉取请求中发送写入令牌到工作流”选项。有关详细信息，请参阅&quot;管理存储库的GitHub操作设置。&quot;</p>
<h3 id="为github-token分配权限" tabindex="-1"><a class="header-anchor" href="#为github-token分配权限" aria-hidden="true">#</a> 为GITHUB_TOKEN分配权限</h3>
<p>此示例显示为设置的权限，该权限将应用于工作流中的所有作业。 <code v-pre>GITHUB_TOKEN</code> 这将适用于工作流中的所有作业。所有权限都被授予读访问权限。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>name<span class="token punctuation">:</span> <span class="token string">"My workflow"</span>

on<span class="token punctuation">:</span> <span class="token punctuation">[</span> push <span class="token punctuation">]</span>

permissions<span class="token punctuation">:</span> read<span class="token operator">-</span>all

jobs<span class="token punctuation">:</span>
  <span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="示例-设置特定作业的权限" tabindex="-1"><a class="header-anchor" href="#示例-设置特定作业的权限" aria-hidden="true">#</a> 示例：设置特定作业的权限</h3>
<p>此示例显示为设置的权限，该 <code v-pre>GITHUB_TOKEN</code> 权限仅适用于名为的作业 <code v-pre>stale</code> 。和作用域被授予写访问权限 <code v-pre>issues</code> <code v-pre>pull-requests</code> 。所有其他作用域都没有访问权限。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">stale</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">permissions</span><span class="token punctuation">:</span>
      <span class="token key atrule">issues</span><span class="token punctuation">:</span> write
      <span class="token key atrule">pull-requests</span><span class="token punctuation">:</span> write

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/stale@v5
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构建和测试-ci" tabindex="-1"><a class="header-anchor" href="#构建和测试-ci" aria-hidden="true">#</a> 构建和测试(CI)</h2>
<p><strong>关于持续集成（CI）：</strong></p>
<p>我们听过很多次 CICD 的大名，分别代表的是 <em>持续集成</em>，和 <em>持续部署</em></p>
<p>持续集成（CI）是一种软件实践，需要频繁地将代码提交到共享存储库。更频繁地提交代码可以更快地检测到错误，并减少开发人员在查找错误源时需要调试的代码量。</p>
<p>频繁的代码更新也使得合并来自软件开发团队的不同成员的更改变得更加容易。这对开发人员来说非常好，他们可以花更多的时间编写代码，而花更少的时间调试错误或解决合并冲突。</p>
<p>当您将代码提交到存储库时，您可以不断地构建和测试代码，以确保提交不会引入错误。</p>
<p>测试可以包括代码链接（检查样式格式）、安全检查、代码覆盖率、功能测试和其他自定义检查。</p>
<p>构建和测试代码需要服务器。您可以在将代码推送到存储库之前在本地构建和测试更新，也可以使用CI服务器来检查存储库中的新代码提交。</p>
<h3 id="关于使用github-actions进行持续集成" tabindex="-1"><a class="header-anchor" href="#关于使用github-actions进行持续集成" aria-hidden="true">#</a> 关于使用GitHub Actions进行持续集成</h3>
<p>您可以配置CI工作流，使其在GitHub事件发生时（例如，当新代码被推送到存储库时）、按设定的时间表运行，或者使用存储库调度webhook在外部事件发生时运行。</p>
<p>GitHub运行CI测试，并在pull请求中提供每个测试的结果，因此您可以查看分支中的更改是否会引入错误。当工作流中的所有配置项测试都通过时，您推送的更改就可以由团队成员审阅或合并了。</p>
<p>当测试失败时，可能是您的某个更改导致了失败。</p>
<p>当您在存储库中设置CI时，GitHub会分析存储库中的代码，并根据存储库中的语言和框架推荐CI工作流。例如，如果您使用Node.js，GitHub将建议一个启动工作流，用于安装Node.js包并运行测试。您可以使用GitHub建议的CI starter工作流，自定义建议的starter工作流，或创建自己的自定义工作流文件来运行CI测试。</p>
<p>除了帮助您为项目设置CI工作流外，您还可以使用GitHub Actions在整个软件开发生命周期中创建工作流。例如，可以使用操作来部署、打包或发布项目。有关更多信息，请参阅“<a href="https://docs.github.com/en/actions/learn-github-actions" target="_blank" rel="noopener noreferrer">学习GitHub操作<ExternalLinkIcon/></a>。“</p>
<h2 id="starter-workflow" tabindex="-1"><a class="header-anchor" href="#starter-workflow" aria-hidden="true">#</a> Starter workflow</h2>
<p>GitHub为各种语言和框架提供CI启动工作流。</p>
<p>在 <a href="https://github.com/actions/starter-workflows/tree/main/ci" target="_blank" rel="noopener noreferrer">actions/starter-workflow<ExternalLinkIcon/></a> 存储库中浏览GitHub提供的CI starter工作流的完整列表。</p>
<h2 id="关于持续部署-cd" tabindex="-1"><a class="header-anchor" href="#关于持续部署-cd" aria-hidden="true">#</a> 关于持续部署(CD)</h2>
<p>持续部署（CD）是使用自动化来发布和部署软件更新的实践。作为典型CD过程的一部分，代码在部署之前会自动构建和测试。</p>
<p>您可以设置GitHub Actions工作流来部署您的软件产品。为了验证产品是否按预期工作，您的工作流可以在存储库中构建代码并在部署之前运行测试。</p>
<p>您可以配置CD工作流，使其在GitHub事件发生时（例如，当新代码被推送到存储库的默认分支时），按照设置的时间表，手动或使用存储库调度webhook发生外部事件时运行。</p>
<p><em>接下来我们来学习使用github的 actions 来进行持续部署：</em></p>
<p>GitHub Actions提供了一些功能，可以让你控制部署。您可以：</p>
<ul>
<li>使用各种事件触发工作流。</li>
<li>配置环境以在作业继续之前设置规则并限制对机密的访问。</li>
<li>使用并发控制一次运行的部署数量。</li>
</ul>
<h3 id="触发部署" tabindex="-1"><a class="header-anchor" href="#触发部署" aria-hidden="true">#</a> 触发部署</h3>
<p>您可以使用各种事件来触发部署工作流。其中最常见的有： <code v-pre>pull_request</code> 、 <code v-pre>push</code> 和 <code v-pre>workflow_dispatch</code> 。</p>
<ul>
<li>分支上有一个推力 <code v-pre>main</code> 。</li>
<li>以分支为目标的拉取请求 <code v-pre>main</code> 被打开、同步或重新打开。</li>
<li>有人手动触发了它。</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> main
  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> main
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用并发" tabindex="-1"><a class="header-anchor" href="#使用并发" aria-hidden="true">#</a> 使用并发</h3>
<p>并发确保一次只运行使用同一并发组的单个作业或工作流。您可以使用并发性，以便环境中一次最多有一个正在进行的部署和一个挂起的部署。</p>
<p>例如，当以下工作流运行时， <code v-pre>pending</code> 如果使用并发组的任何作业或工作流 <code v-pre>production</code> 正在进行，则该工作流将暂停，状态为。它还将取消使用并发组并具有状态的任何作业或工作流 <code v-pre>production</code> , <code v-pre>pending</code> 。这意味着在中使用并发组的作业或工作流最多只能有一个正在运行和一个挂 <code v-pre>production</code> 起。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Deployment

<span class="token key atrule">concurrency</span><span class="token punctuation">:</span> production

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> main

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">deployment</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">environment</span><span class="token punctuation">:</span> production
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> deploy
        <span class="token comment"># ...deployment-specific steps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>您还可以在作业级别指定并发性。这将允许工作流中的其他作业继续进行，即使并发作业是 <code v-pre>pending</code> 。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Deployment

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> main

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">deployment</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">environment</span><span class="token punctuation">:</span> production
    <span class="token key atrule">concurrency</span><span class="token punctuation">:</span> production
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> deploy
        <span class="token comment"># ...deployment-specific steps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="choosing-a-runner" tabindex="-1"><a class="header-anchor" href="#choosing-a-runner" aria-hidden="true">#</a> Choosing a runner</h3>
<p>您可以在GitHub托管的runner或自托管的runner上运行部署工作流。来自GitHub托管的runner的流量可能来自各种网络地址。如果您正在部署到内部环境，并且您的公司限制外部流量进入专用网络，则在GitHub托管的runner上运行的GitHub Actions工作流可能无法与您的内部服务或资源通信。</p>
<h2 id="关于使用-github-actions-进行打包" tabindex="-1"><a class="header-anchor" href="#关于使用-github-actions-进行打包" aria-hidden="true">#</a> 关于使用 GitHub Actions 进行打包</h2>
<p>打包步骤是持续集成或持续交付工作流程的常见部分。在持续集成工作流程结束时创建包可以在拉取请求的代码审查期间提供帮助。</p>
<p>构建和测试代码后，打包步骤可以生成可运行或可部署的工件。根据您正在构建的应用程序的类型，可以在本地下载此包以进行手动测试，可供用户下载，或部署到临时或生产环境。</p>
<p>例如，Java 项目的持续集成工作流程可能会运行<code v-pre>mvn package</code>以生成 JAR 文件。或者，Node.js 应用程序的 CI 工作流程可能会创建 Docker 容器。</p>
<p>现在，在查看拉取请求时，您将能够查看工作流程运行并下载生成的工件。</p>
<p><img src="https://docs.github.com/assets/cb-13991/images/help/repository/artifact-drop-down-updated.png" alt="工作流程运行的“工件”部分的屏幕截图。 运行生成的工件的名称“工件”以深橙色轮廓突出显示。"></p>
<h3 id="发布包的工作流程" tabindex="-1"><a class="header-anchor" href="#发布包的工作流程" aria-hidden="true">#</a> 发布包的工作流程</h3>
<p>除了上传打包工件以在持续集成工作流程中进行测试之外，您还可以创建构建项目并将包发布到包注册表的工作流程。</p>
<ul>
<li>
<p><strong>将包发布到 GitHub Packages</strong> GitHub Packages 可以充当多种类型包的包托管服务。您可以选择与所有 GitHub 共享您的包，也可以选择与协作者或组织共享私有包。更多信息请参阅“ <a href="https://docs.github.com/en/packages/learn-github-packages/introduction-to-github-packages" target="_blank" rel="noopener noreferrer">GitHub 包简介<ExternalLinkIcon/></a>”。</p>
<p>您可能希望在每次推送到默认分支时将包发布到 GitHub Packages。这将使项目的开发人员始终能够通过从 GitHub Packages 安装它来轻松运行和测试默认分支的最新版本。</p>
</li>
<li>
<p><strong>将包发布到包注册表</strong> 对于许多项目，每当发布项目的新版本时都会执行向包注册表的发布。例如，生成 JAR 文件的项目可以将新版本上传到 Maven 中央存储库。或者，.NET 项目可能会生成 nuget 包并将其上传到 NuGet Gallery。</p>
<p>您可以通过创建一个工作流程来自动执行此操作，该工作流程在每次创建版本时将包发布到包注册表。有关详细信息，请参阅“<a href="https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository" target="_blank" rel="noopener noreferrer">管理存储库中的版本<ExternalLinkIcon/></a>”。</p>
</li>
</ul>
<h3 id="发布-docker-镜像" tabindex="-1"><a class="header-anchor" href="#发布-docker-镜像" aria-hidden="true">#</a> 发布 Docker 镜像</h3>
<p>每次在 GitHub 上创建新版本时，您都可以触发工作流程来发布图像。以下示例中的工作流在活动类型<code v-pre>release</code>的事件触发时运行<code v-pre>created</code>。有关该<code v-pre>release</code>事件的详细信息，请参阅“<a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#release" target="_blank" rel="noopener noreferrer">触发工作流的事件<ExternalLinkIcon/></a>”。</p>
<p>在下面的示例工作流程中，我们使用 Docker <code v-pre>login-action</code> 和 <code v-pre>build-push-action</code> 操作来构建 Docker 映像，如果构建成功，则将构建的映像推送到 Docker Hub。</p>
<p>要推送到 Docker Hub，您需要有一个 Docker Hub 帐户，并创建一个 Docker Hub 存储库。有关更多信息，请参阅Docker 文档中的“<a href="https://docs.docker.com/docker-hub/repos/#pushing-a-docker-container-image-to-docker-hub" target="_blank" rel="noopener noreferrer">将 Docker 容器映像推送到 Docker Hub ”。<ExternalLinkIcon/></a></p>
<p><code v-pre>login-action</code> Docker Hub 所需的选项是：</p>
<ul>
<li><code v-pre>username</code>和<code v-pre>password</code>：这是您的 Docker Hub 用户名和密码。我们建议将您的 Docker Hub 用户名和密码存储为机密，这样它们就不会在您的工作流程文件中公开。有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/security-guides/encrypted-secrets" target="_blank" rel="noopener noreferrer">加密的机密<ExternalLinkIcon/></a>”。</li>
</ul>
<p><code v-pre>metadata-action</code>Docker Hub 所需的选项是：</p>
<ul>
<li><code v-pre>images</code>：您正在构建/推送到 Docker Hub 的 Docker 映像的命名空间和名称。</li>
</ul>
<p><code v-pre>build-push-action</code> Docker Hub 所需的选项是：</p>
<ul>
<li><code v-pre>tags</code>：新图像格式的标签<code v-pre>DOCKER-HUB-NAMESPACE/DOCKER-HUB-REPOSITORY:VERSION</code>。您可以如下所示设置单个标签，或在列表中指定多个标签。</li>
<li><code v-pre>push</code>：如果设置为<code v-pre>true</code>，则镜像构建成功后将被推送到注册表。</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Publish Docker image

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">release</span><span class="token punctuation">:</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>published<span class="token punctuation">]</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">push_to_registry</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Push Docker image to Docker Hub
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Check out the repo
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
      
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Log in to Docker Hub
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/login<span class="token punctuation">-</span>action@f4ef78c080cd8ba55a85445d5b36e214a81df20a
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.DOCKER_USERNAME <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.DOCKER_PASSWORD <span class="token punctuation">}</span><span class="token punctuation">}</span>
      
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Extract metadata (tags<span class="token punctuation">,</span> labels) for Docker
        <span class="token key atrule">id</span><span class="token punctuation">:</span> meta
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/metadata<span class="token punctuation">-</span>action@9ec57ed1fcdbf14dcef7dfbe97b2010124a938b7
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">images</span><span class="token punctuation">:</span> my<span class="token punctuation">-</span>docker<span class="token punctuation">-</span>hub<span class="token punctuation">-</span>namespace/my<span class="token punctuation">-</span>docker<span class="token punctuation">-</span>hub<span class="token punctuation">-</span>repository
      
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build and push Docker image
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/build<span class="token punctuation">-</span>push<span class="token punctuation">-</span>action@3b5e8027fcad23fda98b2e3ac259d8d67585f671
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">context</span><span class="token punctuation">:</span> .
          <span class="token key atrule">file</span><span class="token punctuation">:</span> ./Dockerfile
          <span class="token key atrule">push</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">tags</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.meta.outputs.tags <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">labels</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.meta.outputs.labels <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的工作流程检查 GitHub 存储库，使用<code v-pre>login-action</code>登录到注册表，然后使用操作<code v-pre>build-push-action</code>来： 基于存储库的 构建 Docker 映像<code v-pre>Dockerfile</code>；将镜像推送到 Docker Hub，并为镜像应用标签。</p>
<h3 id="将图像发布到-github-包" tabindex="-1"><a class="header-anchor" href="#将图像发布到-github-包" aria-hidden="true">#</a> 将图像发布到 GitHub 包</h3>
<p>每次在 GitHub 上创建新版本时，您都可以触发工作流程来发布图像。以下示例中的工作流在活动类型<code v-pre>release</code>的事件触发时运行<code v-pre>created</code>。有关该<code v-pre>release</code>事件的详细信息，请参阅“<a href="https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#release" target="_blank" rel="noopener noreferrer">触发工作流的事件<ExternalLinkIcon/></a>”。</p>
<p>在下面的示例工作流程中，我们使用 Docker <code v-pre>login-action</code>、<code v-pre>metadata-action</code>和<code v-pre>build-push-action</code>操作来构建 Docker 镜像，如果构建成功，则将构建的镜像推送到 GitHub Packages。</p>
<p><code v-pre>login-action</code>GitHub 包所需的选项有：</p>
<ul>
<li><code v-pre>registry</code>：必须设置为<code v-pre>ghcr.io</code>。</li>
<li><code v-pre>username</code>：您可以使用<code v-pre>${{ github.actor }}</code>上下文自动使用触发工作流运行的用户的用户名。有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/learn-github-actions/contexts#github-context" target="_blank" rel="noopener noreferrer">上下文<ExternalLinkIcon/></a>”。</li>
<li><code v-pre>password</code>：您可以使用自动生成的<code v-pre>GITHUB_TOKEN</code>密码作为密码。有关详细信息，请参阅“<a href="https://docs.github.com/en/actions/security-guides/automatic-token-authentication" target="_blank" rel="noopener noreferrer">自动令牌身份验证<ExternalLinkIcon/></a>”。</li>
</ul>
<p><code v-pre>metadata-action</code>GitHub Packages 所需的选项是：</p>
<ul>
<li><code v-pre>images</code>：您正在构建的 Docker 映像的命名空间和名称。</li>
</ul>
<p><code v-pre>build-push-action</code>GitHub 包所需的选项有：</p>
<ul>
<li><code v-pre>context</code>：将构建的上下文定义为位于指定路径中的文件集。</li>
<li><code v-pre>push</code>：如果设置为<code v-pre>true</code>，则镜像构建成功后将被推送到注册表。</li>
<li><code v-pre>tags</code>和<code v-pre>labels</code>：这些由 的输出填充<code v-pre>metadata-action</code>。</li>
</ul>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># GitHub recommends pinning actions to a commit SHA.</span>
<span class="token comment"># To get a newer version, you will need to update the SHA.</span>
<span class="token comment"># You can also reference a tag or branch, but the action may change without warning.</span>

<span class="token key atrule">name</span><span class="token punctuation">:</span> Create and publish a Docker image

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'release'</span><span class="token punctuation">]</span>

<span class="token key atrule">env</span><span class="token punctuation">:</span>
  <span class="token key atrule">REGISTRY</span><span class="token punctuation">:</span> ghcr.io
  <span class="token key atrule">IMAGE_NAME</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.repository <span class="token punctuation">}</span><span class="token punctuation">}</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build-and-push-image</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">permissions</span><span class="token punctuation">:</span>
      <span class="token key atrule">contents</span><span class="token punctuation">:</span> read
      <span class="token key atrule">packages</span><span class="token punctuation">:</span> write

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout repository
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Log in to the Container registry
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/login<span class="token punctuation">-</span>action@65b78e6e13532edd9afa3aa52ac7964289d1a9c1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">registry</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> env.REGISTRY <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.actor <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Extract metadata (tags<span class="token punctuation">,</span> labels) for Docker
        <span class="token key atrule">id</span><span class="token punctuation">:</span> meta
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/metadata<span class="token punctuation">-</span>action@9ec57ed1fcdbf14dcef7dfbe97b2010124a938b7
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">images</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> env.REGISTRY <span class="token punctuation">}</span><span class="token punctuation">}</span>/$<span class="token punctuation">{</span><span class="token punctuation">{</span> env.IMAGE_NAME <span class="token punctuation">}</span><span class="token punctuation">}</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build and push Docker image
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/build<span class="token punctuation">-</span>push<span class="token punctuation">-</span>action@f2a1d5e99d037542a71f64918e516c093c6f3fc4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">context</span><span class="token punctuation">:</span> .
          <span class="token key atrule">push</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">tags</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.meta.outputs.tags <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">labels</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.meta.outputs.labels <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="将镜像发布到-docker-hub-和-github-包" tabindex="-1"><a class="header-anchor" href="#将镜像发布到-docker-hub-和-github-包" aria-hidden="true">#</a> 将镜像发布到 Docker Hub 和 GitHub 包</h3>
<p>在单个工作流程中，您可以通过对每个注册表使用<code v-pre>login-action</code>和操作将 Docker 映像发布到多个注册表。<code v-pre>build-push-action</code></p>
<p>以下示例工作流程使用前面部分（“<a href="https://docs.github.com/en/actions/publishing-packages/publishing-docker-images#publishing-images-to-docker-hub" target="_blank" rel="noopener noreferrer">将映像发布到 Docker Hub<ExternalLinkIcon/></a> ”和“<a href="https://docs.github.com/en/actions/publishing-packages/publishing-docker-images#publishing-images-to-github-packages" target="_blank" rel="noopener noreferrer">将映像发布到 GitHub 包<ExternalLinkIcon/></a>”）中的步骤来创建推送到两个注册表的单个工作流程。</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># This workflow uses actions that are not certified by GitHub.</span>
<span class="token comment"># They are provided by a third-party and are governed by</span>
<span class="token comment"># separate terms of service, privacy policy, and support</span>
<span class="token comment"># documentation.</span>

<span class="token comment"># GitHub recommends pinning actions to a commit SHA.</span>
<span class="token comment"># To get a newer version, you will need to update the SHA.</span>
<span class="token comment"># You can also reference a tag or branch, but the action may change without warning.</span>

<span class="token key atrule">name</span><span class="token punctuation">:</span> Publish Docker image

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">release</span><span class="token punctuation">:</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>published<span class="token punctuation">]</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">push_to_registries</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Push Docker image to multiple registries
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">permissions</span><span class="token punctuation">:</span>
      <span class="token key atrule">packages</span><span class="token punctuation">:</span> write
      <span class="token key atrule">contents</span><span class="token punctuation">:</span> read
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Check out the repo
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
      
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Log in to Docker Hub
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/login<span class="token punctuation">-</span>action@f4ef78c080cd8ba55a85445d5b36e214a81df20a
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.DOCKER_USERNAME <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.DOCKER_PASSWORD <span class="token punctuation">}</span><span class="token punctuation">}</span>
      
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Log in to the Container registry
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/login<span class="token punctuation">-</span>action@65b78e6e13532edd9afa3aa52ac7964289d1a9c1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">registry</span><span class="token punctuation">:</span> ghcr.io
          <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> github.actor <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.GITHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
      
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Extract metadata (tags<span class="token punctuation">,</span> labels) for Docker
        <span class="token key atrule">id</span><span class="token punctuation">:</span> meta
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/metadata<span class="token punctuation">-</span>action@9ec57ed1fcdbf14dcef7dfbe97b2010124a938b7
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">images</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            my-docker-hub-namespace/my-docker-hub-repository
            ghcr.io/${{ github.repository }}</span>
      
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build and push Docker images
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/build<span class="token punctuation">-</span>push<span class="token punctuation">-</span>action@3b5e8027fcad23fda98b2e3ac259d8d67585f671
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">context</span><span class="token punctuation">:</span> .
          <span class="token key atrule">push</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">tags</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.meta.outputs.tags <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">labels</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> steps.meta.outputs.labels <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="项目管理" tabindex="-1"><a class="header-anchor" href="#项目管理" aria-hidden="true">#</a> 项目管理</h2>
<p>您可以使用 GitHub Actions 通过创建工作流程来自动化项目管理任务。每个工作流包含一系列任务，这些任务在每次工作流运行时自动执行。例如，您可以创建一个工作流程，该工作流程在每次创建问题时运行，以添加标签、留下评论并将问题移至项目板上。</p>
<h3 id="添加-labels" tabindex="-1"><a class="header-anchor" href="#添加-labels" aria-hidden="true">#</a> 添加 labels</h3>
<p>本教程演示如何使用工作流中的<a href="https://github.com/marketplace/actions/github-script" target="_blank" rel="noopener noreferrer"><code v-pre>actions/github-script</code>操作来标记新打开或重新打开的问题。<ExternalLinkIcon/></a>例如，您可以<code v-pre>triage</code>在每次打开或重新打开问题时添加标签。然后，您可以通过筛选带有标签的问题来查看需要分类的所有问题<code v-pre>triage</code>。</p>
<p>该<code v-pre>actions/github-script</code>操作允许您在工作流程中轻松使用 GitHub API。</p>
<p><strong>创建工作流程：</strong></p>
<ol>
<li>选择要应用此项目管理工作流程的存储库。您可以使用具有写入权限的现有存储库，也可以创建新存储库。有关创建存储库的更多信息，请参阅“<a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository" target="_blank" rel="noopener noreferrer">创建新存储库<ExternalLinkIcon/></a>”。</li>
<li>在您的存储库中，创建一个名为 的文件<code v-pre>.github/workflows/YOUR_WORKFLOW.yml</code>，并替换<code v-pre>YOUR_WORKFLOW</code>为您选择的名称。这是一个工作流程文件。有关在 GitHub 上创建新文件的更多信息，请参阅“<a href="https://docs.github.com/en/repositories/working-with-files/managing-files/creating-new-files" target="_blank" rel="noopener noreferrer">创建新文件<ExternalLinkIcon/></a>”。</li>
</ol>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Label issues
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">issues</span><span class="token punctuation">:</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> reopened
      <span class="token punctuation">-</span> opened
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">label_issues</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">permissions</span><span class="token punctuation">:</span>
      <span class="token key atrule">issues</span><span class="token punctuation">:</span> write
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/github<span class="token punctuation">-</span>script@v6
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">script</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
            github.rest.issues.addLabels({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              labels: ["triage"]
            })</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>自定义<code v-pre>script</code>工作流程文件中的参数：</li>
</ol>
<ul>
<li>值是使用对象自动设置<code v-pre>issue_number</code>的。您不需要更改这些。<code v-pre>owner``repo``context</code></li>
<li>将值更改为<code v-pre>labels</code>要添加到问题的标签列表。用逗号分隔多个标签。例如，<code v-pre>[&quot;help wanted&quot;, &quot;good first issue&quot;]</code>. 有关标签的详细信息，请参阅“<a href="https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels#applying-labels-to-issues-and-pull-requests" target="_blank" rel="noopener noreferrer">管理标签<ExternalLinkIcon/></a>”。</li>
</ul>
<ol start="4">
<li>将工作流程文件提交到存储库的默认分支。有关详细信息，请参阅“<a href="https://docs.github.com/en/repositories/working-with-files/managing-files/creating-new-files" target="_blank" rel="noopener noreferrer">创建新文件<ExternalLinkIcon/></a>”。</li>
</ol>
<h3 id="在项目板上移动分配的问题" tabindex="-1"><a class="header-anchor" href="#在项目板上移动分配的问题" aria-hidden="true">#</a> 在项目板上移动分配的问题</h3>
<p>本教程演示如何使用该<a href="https://github.com/marketplace/actions/github-project-automation" target="_blank" rel="noopener noreferrer"><code v-pre>alex-page/github-project-automation-plus</code>操作<ExternalLinkIcon/></a>在分配问题时自动将问题移动到项目板上的特定列。例如，分配问题后，您可以将其移至<code v-pre>In Progress</code>项目板的列中。</p>
<h3 id="创建工作流程" tabindex="-1"><a class="header-anchor" href="#创建工作流程" aria-hidden="true">#</a> 创建工作流程</h3>
<ol>
<li>选择要应用此项目管理工作流程的存储库。您可以使用具有写入权限的现有存储库，也可以创建新存储库。有关创建存储库的更多信息，请参阅“<a href="https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository" target="_blank" rel="noopener noreferrer">创建新存储库<ExternalLinkIcon/></a>”。</li>
<li>在您的存储库中，选择一个项目板。您可以使用现有项目，也可以创建新项目。有关创建项目的更多信息，请参阅“<a href="https://docs.github.com/en/issues/organizing-your-work-with-project-boards/managing-project-boards/creating-a-project-board" target="_blank" rel="noopener noreferrer">创建项目（经典）<ExternalLinkIcon/></a> ”。</li>
<li>在您的存储库中，创建一个名为 的文件<code v-pre>.github/workflows/YOUR_WORKFLOW.yml</code>，并替换<code v-pre>YOUR_WORKFLOW</code>为您选择的名称。这是一个工作流程文件。有关在 GitHub 上创建新文件的更多信息，请参阅“<a href="https://docs.github.com/en/repositories/working-with-files/managing-files/creating-new-files" target="_blank" rel="noopener noreferrer">创建新文件<ExternalLinkIcon/></a>”。</li>
<li>将以下 YAML 内容复制到您的工作流程文件中。</li>
</ol>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># GitHub recommends pinning actions to a commit SHA.</span>
<span class="token comment"># To get a newer version, you will need to update the SHA.</span>
<span class="token comment"># You can also reference a tag or branch, but the action may change without warning.</span>

<span class="token key atrule">name</span><span class="token punctuation">:</span> Move assigned card
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">issues</span><span class="token punctuation">:</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> assigned
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">move-assigned-card</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> alex<span class="token punctuation">-</span>page/github<span class="token punctuation">-</span>project<span class="token punctuation">-</span>automation<span class="token punctuation">-</span>plus@7ffb872c64bd809d23563a130a0a97d01dfa8f43
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">project</span><span class="token punctuation">:</span> Docs Work
          <span class="token key atrule">column</span><span class="token punctuation">:</span> In Progress
          <span class="token key atrule">repo-token</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.PERSONAL_ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol>
<li>自定义工作流程文件中的参数：
<ul>
<li>将 的值更改<code v-pre>project</code>为您的项目板的名称。如果您有多个同名的项目板，则该<code v-pre>alex-page/github-project-automation-plus</code>操作将作用于具有指定名称的所有项目。</li>
<li>将 的值更改为<code v-pre>column</code>您希望在分配问题时将其移至的列的名称。</li>
<li>更改 的值 <code v-pre>repo-token</code>:
<ol>
<li>使用范围创建个人访问令牌（经典）<code v-pre>repo</code>。有关详细信息，请参阅“<a href="https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token" target="_blank" rel="noopener noreferrer">管理您的个人访问令牌<ExternalLinkIcon/></a>”。</li>
<li>将此个人访问令牌作为秘密存储在您的存储库中。有关存储机密的更多信息，请参阅“<a href="https://docs.github.com/en/actions/security-guides/encrypted-secrets" target="_blank" rel="noopener noreferrer">加密的机密<ExternalLinkIcon/></a>”。</li>
<li>在您的工作流程文件中，替换<code v-pre>PERSONAL_ACCESS_TOKEN</code>为您的密钥名称。</li>
</ol>
</li>
</ul>
</li>
</ol>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '82.md' style='float:left'>⬆️上一节🔗  </a><a href = '84.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


