<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第25节-buildah-podman-以及在-rootless-模式下工作原理" tabindex="-1"><a class="header-anchor" href="#第25节-buildah-podman-以及在-rootless-模式下工作原理" aria-hidden="true">#</a> 第25节 Buildah / podman 以及在 rootless 模式下工作原理</h1>
<div><a href = '24.md' style='float:left'>⬆️上一节🔗  </a><a href = '26.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/3293172751/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="什么是-buildah" tabindex="-1"><a class="header-anchor" href="#什么是-buildah" aria-hidden="true">#</a> 什么是 Buildah</h2>
<ul>
<li><a href="https://buildah.io/" target="_blank" rel="noopener noreferrer">buildah 官方<ExternalLinkIcon/></a></li>
</ul>
<p>Buildah 是一款基于 Linux 的开源工具，用于构建兼容开发容器计划（OCI）的<a href="https://www.redhat.com/zh/topics/containers/whats-a-linux-container" target="_blank" rel="noopener noreferrer">容器<ExternalLinkIcon/></a>；这意味着，这些容器同样也与 <a href="https://www.redhat.com/zh/topics/containers/what-is-docker" target="_blank" rel="noopener noreferrer">Docker<ExternalLinkIcon/></a> 和 <a href="https://www.redhat.com/zh/topics/containers/what-is-kubernetes" target="_blank" rel="noopener noreferrer">Kubernetes<ExternalLinkIcon/></a> 兼容。借助 Buildah，您可以使用熟悉的工具从现有基础镜像创建高效的容器镜像，或者使用空白镜像从头开始构建。</p>
<p>Buildah是一个开源的命令行工具，用于构建、创建和管理 Docker 镜像。它可以帮助用户创建镜像，并不依赖于 Docker 引擎，而是直接使用容器系统和格式。</p>
<p>Buildah 的应用场景包括：</p>
<ol>
<li>开发人员和 DevOps 工程师可以使用 Buildah 在不使用 Docker 引擎的情况下快速创建镜像。</li>
<li>Buildah 可以在不需要网络连接的情况下进行本地镜像构建，这对于没有网络连接的环境很有用。</li>
<li>Buildah 可以方便地与其他容器系统结合使用，如 Podman，以实现统一的容器管理。</li>
<li>Buildah 可以通过脚本进行批量构建，从而提高镜像构建效率。</li>
</ol>
<p>这款命令行工具有以下特点：</p>
<ul>
<li>在构建容器时可以使用或不使用 Dockerfile（一种文本文件，含有用户在组装镜像时可以调用的所有命令）。</li>
<li>既可以从头开始创建容器镜像，也可以在现有容器镜像的基础上来创建。</li>
<li>不在镜像本身中包含构建工具，不仅可以缩减所构建镜像的大小，提升安全，而且会因为使用更少的资源而减轻传输负担。</li>
<li>与 Dockerfile 兼容，从而能从 Docker 轻松转换。</li>
<li>创建特定于用户的镜像，因此能够按照创建镜像的人来分门别类。</li>
</ul>
<h3 id="为什么选择buildah" tabindex="-1"><a class="header-anchor" href="#为什么选择buildah" aria-hidden="true">#</a> 为什么选择Buildah</h3>
<p>Buildah 可以带来出众的灵活性，让您无需 Dockerfile 就能构建镜像，更轻松地将其他脚本语言整合进构建过程；也能兼顾效率，使用镜像外的构建工具来创建镜像。因此，这款工具不仅能够加快创新速度，还能让新的概念化为现实。用户可以快速创建容器镜像并以之为基础进行构建，只需必要的工具和流程来准备就绪和运行便可。</p>
<p>Buildah 还能提供以下助力：</p>
<ul>
<li>检查、验证和修改镜像</li>
<li>将容器和镜像从本地存储推送到公共或私有的镜像仓库或存储库</li>
<li>将镜像推送到 Docker Hub 或从中提取</li>
<li>移除本地存储的容器镜像</li>
<li>挂载或卸载有效容器的根文件系统</li>
<li>将容器根文件系统的更新内容用作新镜像的文件系统层</li>
</ul>
<h3 id="podman" tabindex="-1"><a class="header-anchor" href="#podman" aria-hidden="true">#</a> Podman</h3>
<p>Podman 是一个开源的命令行工具，用于管理容器。它可以运行、创建、删除和管理容器，并且不需要任何守护进程。Podman 使用了容器系统和格式，并且不依赖于 Docker 引擎。</p>
<p><strong>Podman 的主要功能包括：</strong></p>
<ol>
<li>容器运行：Podman 可以运行容器，并且支持在容器内执行命令。</li>
<li>容器创建：Podman 可以从镜像创建容器，并且支持对容器进行配置。</li>
<li>容器管理：Podman 可以管理容器，包括查询容器状态、启动和停止容器等。</li>
<li>镜像管理：Podman 可以管理镜像，包括拉取镜像、查询镜像信息、删除镜像等。</li>
</ol>
<p><strong>Podman 的使用场景包括：</strong></p>
<ol>
<li>用于开发、测试和部署容器化应用。</li>
<li>用于在本地进行容器管理，不需要网络连接。</li>
<li>用于实现对容器的简单管理，并且不需要使用 Docker 引擎。</li>
</ol>
<h3 id="buildah-and-podman" tabindex="-1"><a class="header-anchor" href="#buildah-and-podman" aria-hidden="true">#</a> Buildah and Podman</h3>
<p>Buildah 和 <a href="https://www.redhat.com/zh/topics/containers/what-is-Podman" target="_blank" rel="noopener noreferrer">Podman<ExternalLinkIcon/></a> 是相辅相成的开源项目和命令行工具，都可操作和构建 OCI 镜像和容器。Buildah 诞生在前，而 Podman 使用了与 Buildah 相同的代码来进行构建。不过，相较于 Podman，Buildah 的命令要细致得多，能够对镜像进行更精细的控制，并可创建更加细化的镜像层。Podman 的&quot;build&quot;命令使用 Buildah 功能的一个子集。</p>
<p>Buildah 专门用于构建容器镜像，复制 Dockerfile 中除守护进程套接字组件之外的所有命令，而 Podman 则擅长维护和修改容器中镜像所需的工作。使用 Podman 时，您可以创建容器（使用 Buildah 来提供容器镜像），然后在生产环境中使用熟悉的命令行接口（CLI）命令来运行、维护和修改您创建的容器（如果您能够在 Docker CLI 中运行某个命令，那么也能在 Podman CLI 中运行同样的命令）。</p>
<p>Podman 和 Buildah 两者的另一区别在于：Buildah 的容器主要是为临时目的而创建的，以便将内容传输到所创建的容器镜像；而使用 Podman 时，用户创建的是将要在更长时间里使用和维护的传统容器。Buildah 的容器主要满足短期用途，而 Podman 的容器则是为长期运行而生。</p>
<p>还有一点，Buildah 和 Podman 不共享容器的内部表述内容，因此一个容器只能在其中一个工具内看到。不过，两者却会共享容器镜像的内部表述内容，在其中一者创建、修改或提取的容器镜像也可在另一者查看和使用。</p>
<p><strong>官方说法：</strong></p>
<p>Buildah 和 Podman 是两个互补的开源项目，可在大多数 Linux 平台上使用，这两个项目都位于 <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub.com<ExternalLinkIcon/></a>上， <a href="https://github.com/containers/buildah" target="_blank" rel="noopener noreferrer">此处为 Buildah<ExternalLinkIcon/></a>， <a href="https://github.com/containers/podman" target="_blank" rel="noopener noreferrer">此处为Podman<ExternalLinkIcon/></a> 。Buildah 和 Podman 都是命令行工具，适用于开放容器计划 (OCI) 图像和容器。这两个项目在专业上有所不同。</p>
<p>Buildah 专注于构建 OCI 图像。Buildah 的命令复制了 Dockerfile 中的所有命令。这允许在不需要任何 root 权限的情况下使用和不使用 Dockerfile 构建图像。Buildah 的最终目标是提供一个较低级别的 coreutils 接口来构建图像。在没有 Dockerfiles 的情况下构建图像的灵活性允许将其他脚本语言集成到构建过程中。Buildah 遵循简单的 fork-exec 模型，不作为守护进程运行，但它基于 golang 中的综合 API，可以供应给其他工具。</p>
<p>Podman 专注于帮助您维护和修改 OCI 镜像的所有命令和功能，例如拉取和标记。它还允许您创建、运行和维护从这些图像创建的那些容器。为了通过 Dockerfiles 构建容器镜像，Podman 使用 Buildah 的 golang API，并且可以独立于 Buildah 安装。</p>
<p><strong>Podman 和 Buildah 之间的主要区别在于它们的容器概念</strong>。Podman 允许用户创建“传统容器”，这些容器的目的是长期存在。虽然 Buildah 容器实际上只是为了允许将内容添加回容器镜像而创建的。一种简单的理解方式 ：</p>
<ul>
<li><code v-pre>buildah run</code>是命令模拟 <code v-pre>Dockerfile</code>  中的 <code v-pre>RUN</code> 命令，</li>
<li><code v-pre>podman run</code> 命令模拟<code v-pre>docker run</code>功能中的命令。</li>
</ul>
<p>⚠️ 由于这一点以及它们的底层存储差异，您无法从 Buildah 中看到 Podman 容器，反之亦然。</p>
<p>简而言之，Buildah 是一种创建 OCI 镜像的高效方式，而 Podman 允许您使用熟悉的容器 CLI 命令在生产环境中管理和维护这些镜像和容器。有关详细信息，请参阅《 <a href="https://github.com/containers/buildah/tree/main/docs/containertools" target="_blank" rel="noopener noreferrer">容器工具指南》<ExternalLinkIcon/></a>。</p>
<blockquote>
<p>Buildah 项目提供了一个命令行工具，可用于创建 OCI 或传统 Docker 镜像格式的镜像，然后从该镜像构建工作容器。</p>
<p>可以挂载和修改容器，然后可以根据更新后的容器保存镜像。</p>
</blockquote>
<p><strong>项目之间的一些命令重叠</strong>：</p>
<ul>
<li>构建 <code v-pre>podman build</code> 和 <code v-pre>buildah build</code> 命令有很大的重叠，因为 Podman 从 Buildah 借用了大量的 <code v-pre>podman build</code> 实现。</li>
<li>运行 <code v-pre>buildah run</code> 和 <code v-pre>podman run</code> 命令相似但不同。如上所述，Podman 和 Buildah 具有不同的容器概念。一种简单的理解方式是 <code v-pre>buildah run</code> 命令模拟 Dockerfile 中的 RUN 命令，而 <code v-pre>podman run</code> 命令模拟功能中的 <code v-pre>docker run</code> 命令。由于 Buildah 和 Podman 的容器概念有些不同，您无法从 Buildah 中看到 Podman 容器，反之亦然。</li>
<li>pull, push 这些命令在两者之间基本相同，都可以使用。</li>
<li>由于 <code v-pre>containers</code> 的不同，commit Commit 的工作方式不同。您不能从 Buildah 提交 Podman 容器，也不能从 Podman 提交 Buildah 容器。</li>
<li>tag, rmi, images 这些命令在两者之间基本相同，都可以使用。</li>
<li>rm 这条命令表面上看起来是等价的，但是由于两个项目的容器底层存储的不同，它们是不同的。（鉴于此，无法使用 Podman 命令删除 Buildah 容器，也无法使用 Buildah 命令删除 Podman 容器。)</li>
<li>mount 两者的挂载命令相似，您可以挂载容器镜像并修改其中的内容，这些内容将在您提交时保存到镜像中。</li>
</ul>
<p><strong>评价：</strong></p>
<p>Podman 和 Docker 是两个用于管理容器的工具，它们都具有高度的互操作性。Podman 可以代替部分 Docker 的功能，并且在一些方面具有优势，<strong>⚠️ 例如不需要运行为 root（docker现在也不需要了）</strong>。</p>
<p>然而，Docker 目前仍然是容器生态系统中最广泛使用的工具，并且拥有大量的生态系统，包括丰富的镜像库和插件。因此，使用者可以根据自己的需求和喜好选择使用 Podman 或 Docker。</p>
<p>简而言之，Buildah 是一种创建 OCI 镜像的有效方式，而 Podman 允许您使用熟悉的容器 cli 命令在生产环境中管理和维护这些镜像和容器。</p>
<p>总的来说，Podman 和 Docker 都是优秀的容器管理工具，具体选择哪种工具取决于使用者的需求和喜好。</p>
<h3 id="podman-rootless" tabindex="-1"><a class="header-anchor" href="#podman-rootless" aria-hidden="true">#</a> podman rootless</h3>
<p>Podman 可以在普通用户身份下运行，而不需要 root 权限。这意味着，用户可以在自己的帐户下管理容器，而不需要使用特权模式。</p>
<p>这是因为 Podman 使用了 user namespaces 来隔离容器，使容器内的进程在系统层面看起来像是 root，但实际上并不具有 root 权限。这使得用户可以在不提升权限的情况下管理容器，并且避免了某些与使用特权模式相关的安全风险。</p>
<p>因此，Podman 是一个更安全的容器管理工具，特别是对于那些不想使用特权模式的用户来说。此外，使用 Podman 可以简化容器管理的流程，并且不需要额外的配置，从而提高生产效率。</p>
<h2 id="builah-教程" tabindex="-1"><a class="header-anchor" href="#builah-教程" aria-hidden="true">#</a> builah 教程</h2>
<p><a href="https://www.centos.org/" target="_blank" rel="noopener noreferrer">CentOS：<ExternalLinkIcon/></a></p>
<p>Buildah is available in the default Extras repos for CentOS 7 and in the AppStream repo for CentOS 8 and Stream, however the available version often lags the upstream release.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>sudo yum -y install buildah
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>需要注意的是，以 root 身份运行，因为您需要以 root 身份才能安装 Buildah 软件包：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token parameter variable">-s</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<p><code v-pre>containers/image</code>项目提供了复制（推送、拉取）、检查和签署容器镜像的机制。该<code v-pre>containers/storage</code>项目提供了用于存储文件系统层、容器映像和容器的机制。Buildah 是一个利用这些底层项目的 CLI，因此允许您构建、移动和管理容器镜像和容器。</p>
<p>Buildah 适用于许多 Linux 发行版，但目前在 Windows 或 Mac 平台上不受支持。Buildah 主要专注于构建 OCI 镜像，而<a href="https://podman.io/" target="_blank" rel="noopener noreferrer">Podman<ExternalLinkIcon/></a>提供了更广泛的命令和功能集，可帮助您维护、修改和运行 OCI 镜像和容器。有关项目之间差异的更多信息，请参阅主 README.md 中的<a href="https://github.com/containers/buildah#buildah-and-podman-relationship" target="_blank" rel="noopener noreferrer">Buildah 和 Podman 关系<ExternalLinkIcon/></a>部分。</p>
<h3 id="rootless-user" tabindex="-1"><a class="header-anchor" href="#rootless-user" aria-hidden="true">#</a> rootless user</h3>
<p>如果您计划以没有 root 权限的用户身份运行 Buildah，即“无根用户”，系统管理员可能需要事先做一些额外的配置。Podman GitHub 站点上列出了为此所需的<a href="https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md" target="_blank" rel="noopener noreferrer">设置<ExternalLinkIcon/></a>。<strong>Buildah 具有与 Podman 对无根用户相同的设置和配置要求。</strong></p>
<ul>
<li><a href="https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md" target="_blank" rel="noopener noreferrer">podman rootless user<ExternalLinkIcon/></a></li>
</ul>
<h3 id="安装后验证" tabindex="-1"><a class="header-anchor" href="#安装后验证" aria-hidden="true">#</a> 安装后验证</h3>
<p>安装 Buildah 后我们可以看到没有安装图像。该<code v-pre>buildah images</code>命令将列出所有图像：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们还可以运行看到没有工作容器：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah containers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当您从现有镜像构建工作容器时，Buildah 默认将“-working-container”附加到镜像名称以构建容器名称。Buildah CLI 可以方便地返回新容器的名称。您可以通过使用标准 shell 分配将返回值分配给 shell 变量来利用这一点：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>container=$(buildah from fedora)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>不需要将容器的名称分配给 shell 变量。运行 <code v-pre>buildah from fedora</code>就够了。它只是有助于以后简化命令。要查看我们存储在 shell 变量中的容器的名称：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>echo $container
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们可以用这个新容器做什么？让我们尝试运行 bash：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>buildah run $container bash
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>请注意，我们得到了一个新的 shell 提示符，因为我们在容器内运行了一个 bash shell。应该注意的<code v-pre>buildah run</code>是，它主要用于在构建过程中调试和运行命令。像 Podman 这样功能更全的引擎或像<a href="https://github.com/kubernetes-sigs/cri-o" target="_blank" rel="noopener noreferrer">CRI-O<ExternalLinkIcon/></a>这样的容器运行时接口服务更适合在生产环境中启动容器。</p>
<p>一定要<code v-pre>exit</code>离开容器，让我们尝试运行其他东西：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>buildah run $container java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>哎呀。未安装 Java。返回了一条包含类似以下内容的消息。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>runc create failed: unable to start start container process: exec: "java": executable file not found in $PATH
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让我们尝试使用以下方法将它安装在容器中：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>buildah run $container -- dnf -y install java
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>语法基本上告诉 Buildah：在这一点之后<code v-pre>--</code>没有更多的命令选项。<code v-pre>buildah run</code>此点之后的选项用于在容器内启动的命令。如果我们指定的命令包含不适用于 Buildah 的命令行选项，则它是必需的。</p>
<p>现在运行<code v-pre>buildah run $container java</code>会显示已经安装了Java。它将返回标准 Java<code v-pre>Usage</code>输出。</p>
<h3 id="从-scratch-开始构建镜像" tabindex="-1"><a class="header-anchor" href="#从-scratch-开始构建镜像" aria-hidden="true">#</a> 从 scratch 开始构建镜像</h3>
<p>使用构建 OCI 兼容容器镜像的优势之一 <code v-pre>buildah</code> 是您可以轻松地从头开始构建容器镜像，从而从镜像中排除不必要的包。大多数用于生产的最终容器镜像可能不需要像<code v-pre>dnf</code>.</p>
<p>让我们从头开始构建一个容器和图像。特殊的“图像”名称“scratch”告诉 Buildah 创建一个空容器。容器有少量关于容器的元数据，但没有真正的 Linux 内容。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">newcontainer</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>buildah from scratch<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您可以通过运行以下命令来查看这个新的空容器：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah containers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>您应该看到类似于以下内容的输出：</p>
<p><img src="http://sm.nsddd.top/sm202302081630890.png" alt="image-20230208163025720"></p>
<p>它的容器名称默认为 working-container 并且存储在<code v-pre>$newcontainer</code>变量中。请注意图像名称 (IMAGE NAME) 是“scratch”。这是一个特殊值，表示工作容器不是基于图像。当我们运行时：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah images
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>我们没有看到列出的“scratch”图像。没有相应的划痕图像。基于“scratch”的容器从无到有。</p>
<p>那么这个容器实际上有什么作用吗？让我们来看看。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah run <span class="token variable">$newcontainer</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>没有。这真的是空的。包安装程序<code v-pre>dnf</code>甚至不在这个容器内。它本质上是内核之上的一个空层。那么可以用它做什么呢？幸运的是有一个<code v-pre>buildah mount</code>命令。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">scratchmnt</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>buildah <span class="token function">mount</span> $newcontainer<span class="token variable">)</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注意：如果尝试以无根模式挂载，该命令将失败。只能在您拥有的挂载命名空间中挂载容器。通过执行<code v-pre>buildah unshare</code>命令创建并进入用户命名空间和挂载命名空间。有关更多信息，请参阅 buildah-mount(1) 手册页。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ buildah unshare
<span class="token comment"># scratchmnt=$(buildah mount $newcontainer)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>无特权模式：</strong></p>
<p>如果您已安装 Podman 并将其设置为在无 root 权限模式下使用，则无需进行进一步配置，就能在非特权环境中使用 Buildah。如果需要为 Buildah 启用无 root 权限模式，请运行以下命令：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">usermod</span> --add-subuids <span class="token number">200000</span>-201000 --add-subgids <span class="token number">200000</span>-201000 <span class="token environment constant">$USER</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>使用 <code v-pre>sudo</code> 以超级用户的身份运行命令，以获得足够的权限来修改用户信息。</li>
<li>使用 <code v-pre>usermod</code> 命令修改用户信息。</li>
<li>使用 <code v-pre>--add-subuids</code> 选项向用户添加子用户 ID 范围，从 200000 到 201000。</li>
<li>使用 <code v-pre>--add-subgids</code> 选项向用户添加子用户组 ID 范围，从 200000 到 201000。</li>
<li>使用 <code v-pre>$USER</code> 变量指定要修改的用户名。</li>
</ul>
<p>命令将为当前用户启用无 root 权限模式。运行该命令后，注销然后重新登录即可启用更改。</p>
<p>以上命令会在主机上定义一系列本地 UID，分配给容器中的用户的 UID 将映射到这些 UID。请注意，为不同用户定义的范围不得重叠。同样重要的是，这些范围不能重复使用任何现有本地用户或组的 UID。默认情况下，在 SLES 15 中使用 <code v-pre>useradd</code> 命令添加用户会自动分配 subUID 和 subGID 范围。</p>
<p><strong>⚠️ 在无 root 权限模式下，Buildah 命令必须在用户的已修改用户名称空间中执行。要进入此用户名称空间，请运行 <code v-pre>buildah unshare</code> 命令。否则 <code v-pre>buildah mount</code> 命令将会失败。</strong></p>
<hr>
<p><strong>尝试运行bash:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">container</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>buildah from fedora<span class="token variable">)</span></span>  <span class="token comment"># 是 os base image</span>

<span class="token builtin class-name">echo</span> <span class="token variable">$container</span> <span class="token comment"># 输出这个镜像的信息</span>

buildah run <span class="token variable">$container</span> <span class="token function">bash</span>  <span class="token comment"># 运行这个镜像</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过回<code v-pre>$scratchmnt</code>显我们可以看到<a href="https://wiki.archlinux.org/index.php/Overlay_filesystem" target="_blank" rel="noopener noreferrer">覆盖挂载点<ExternalLinkIcon/></a>的路径，它被用作容器的根文件系统。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># echo $scratchmnt</span>
/var/lib/containers/storage/overlay/b78d0e11957d15b5d1fe776293bd40a36c28825fb6cf76f407b4d0a95b2a200d/merged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>/var/lib/containers/storage</code>请注意，如果您以 root 身份开始，覆盖挂载点位于下面的某个位置；<code v-pre>.local/share/containers/storage</code>如果您处于无根模式，则覆盖挂载点位于您的主目录的目录下。（参见上文<code v-pre>containers/storage</code>或有关更多信息，请参见<a href="https://github.com/containers/storage" target="_blank" rel="noopener noreferrer">容器/存储<ExternalLinkIcon/></a>。）</p>
<p>现在我们有了一个新的空容器，我们可以安装或删除软件包或简单地将内容复制到该容器中。所以让我们安装<code v-pre>bash</code>，<code v-pre>coreutils</code>以便我们可以运行 bash 脚本。这很容易成为<code v-pre>nginx</code>您的容器所需的其他包。</p>
<p>**注意：**下面示例中的版本  (35) 与运行此示例的 Linux 平台 Fedora 版本相关。如果您在主机上运行 dnf 来填充容器，您指定的版本必须对主机有效，否则 dnf 将抛出错误。即如果你要在 RHEL 平台上运行它，你需要指定<code v-pre>--releasever 8.1</code>或类似而不是<code v-pre>--releasever 35</code>. 如果您希望容器是特定的 Linux 平台，<code v-pre>scratch</code>请将示例的第一行更改为您想要的平台，即<code v-pre># newcontainer=$(buildah from fedora)</code>，然后您可以为该 Linux 平台指定合适的版本号。</p>
<div class="language-ba ext-ba line-numbers-mode"><pre v-pre class="language-ba"><code># dnf install --installroot $scratchmnt --releasever 35 bash coreutils --setopt install_weak_deps=false -y
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="镜像" tabindex="-1"><a class="header-anchor" href="#镜像" aria-hidden="true">#</a> 镜像</h3>
<p><strong>获取镜像：</strong></p>
<p>构建容器镜像的第一步是获取基础镜像，这是通过 Dockerfile 中的 FROM 语句完成的。Buildah 以类似的方式处理这个。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token punctuation">]</span>$ <span class="token function">sudo</span> buildah from fedora
Getting image <span class="token builtin class-name">source</span> signatures
Copying blob 7778c55b9bda <span class="token keyword">done</span>
Copying config e0d7a1685f <span class="token keyword">done</span>
Writing manifest to image destination
Storing signatures
fedora-working-container
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><strong>Fedora Linux</strong>（第七版以前为<strong>Fedora Core</strong>）是较具知名度的<a href="https://zh.wikipedia.org/wiki/Linux%E5%8F%91%E8%A1%8C%E5%A5%97%E4%BB%B6" target="_blank" rel="noopener noreferrer">Linux发行包<ExternalLinkIcon/></a>之一，由<a href="https://zh.wikipedia.org/wiki/Fedora%E5%B0%88%E6%A1%88" target="_blank" rel="noopener noreferrer">Fedora项目<ExternalLinkIcon/></a>社群开发、<a href="https://zh.wikipedia.org/wiki/%E7%B4%85%E5%B8%BD%E5%85%AC%E5%8F%B8" target="_blank" rel="noopener noreferrer">红帽公司<ExternalLinkIcon/></a>赞助，目标是创建一套新颖、多功能并且自由（<a href="https://zh.wikipedia.org/zh-cn/%E9%96%8B%E6%94%BE%E5%8E%9F%E5%A7%8B%E7%A2%BC" target="_blank" rel="noopener noreferrer">开放源代码<ExternalLinkIcon/></a>）的操作系统。Fedora是商业化的<a href="https://zh.wikipedia.org/wiki/Red_Hat_Enterprise_Linux" target="_blank" rel="noopener noreferrer">Red Hat Enterprise Linux<ExternalLinkIcon/></a>发行版的<a href="https://zh.wikipedia.org/wiki/%E4%B8%8A%E6%B8%B8_(%E8%BB%9F%E9%AB%94%E9%96%8B%E7%99%BC)" target="_blank" rel="noopener noreferrer">上游<ExternalLinkIcon/></a>源码。</p>
</blockquote>
<p>该命令将拉取 Fedora 的基础镜像并存储在主机上。通过执行以下操作可以检查主机上可用的镜像。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> buildah images
REPOSITORY                      TAG        IMAGE ID       CREATED        SIZE
docker.io/library/fedora        latest     e0d7a1685fed   <span class="token number">12</span> hours ago   <span class="token number">190</span> MB
docker.io/sealerio/kubernetes   v1.22.15   bb75382891e7   <span class="token number">4</span> weeks ago    <span class="token number">963</span> MB
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在拉取基础镜像后，有一个该镜像的运行容器实例，这是一个“工作容器”：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> buildah containers
CONTAINER ID  BUILDER  IMAGE ID     IMAGE NAME                       CONTAINER NAME
0e5b23a293db     *                  scratch                          working-container
883af373c2a5     *     e0d7a1685fed docker.io/library/fedora:latest  fedora-working-container
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Buildah 还提供了一个非常有用的命令来停止和删除当前正在运行的所有容器。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> buildah <span class="token function">rm</span> <span class="token parameter variable">--all</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="buildah-mount" tabindex="-1"><a class="header-anchor" href="#buildah-mount" aria-hidden="true">#</a> buildah mount</h3>
<p>buildah-mount - 挂载工作容器的根文件系统。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah <span class="token function">mount</span> <span class="token punctuation">[</span>container <span class="token punctuation">..</span>.<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>描述：</strong></p>
<p>将指定容器的根文件系统挂载到可从主机访问的位置，并返回其位置。</p>
<p><strong>如果在没有任何参数的情况下调用 mount 命令，该工具将列出所有当前装载的容器。</strong></p>
<p>在无根模式下运行时，装载在不同的命名空间中运行，以便在使用 <code v-pre>vfs</code> 以外的驱动程序时可能无法从主机访问装载的卷。为了能够访问挂载的文件系统，您可能需要单独创建挂载命名空间作为 <code v-pre>buildah unshare</code> 的一部分。在使用 <code v-pre>buildah unshare</code> 创建的环境中，您可以使用 <code v-pre>buildah mount</code> 并访问挂载的文件系统。</p>
<p>如果在无根模式下运行，则需要先执行 buildah 取消共享以使用挂载点。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ buildah unshare
<span class="token comment"># buildah mount working-container</span>
/var/lib/containers/storage/overlay/f8cac5cce73e5102ab321cc5b57c0824035b5cb82b6822e3c86ebaff69fefa9c/merged
<span class="token comment"># cp foobar  /var/lib/containers/storage/overlay/f8cac5cce73e5102ab321cc5b57c0824035b5cb82b6822e3c86ebaff69fefa9c/merged</span>
<span class="token comment"># buildah unmount working-container</span>
<span class="token comment"># exit</span>
$ buildah commit  working-container newimage
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="buildah-umount" tabindex="-1"><a class="header-anchor" href="#buildah-umount" aria-hidden="true">#</a> buildah umount</h3>
<p>buildah-umount - 卸载指定工作容器上的根文件系统。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah <span class="token function">umount</span> <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>container <span class="token punctuation">..</span>.<span class="token punctuation">]</span>

<span class="token comment"># options : --all, -a --全部， -a 将卸载所有当前装载的容器。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>💡简单的一个案例如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah <span class="token function">umount</span> containerID 
buildah <span class="token function">umount</span> containerID1 containerID2 containerID3
buildah <span class="token function">umount</span> <span class="token parameter variable">--all</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="buildah-unshare" tabindex="-1"><a class="header-anchor" href="#buildah-unshare" aria-hidden="true">#</a> buildah unshare</h3>
<p>buildah-unshare -在修改的用户名称空间内运行命令。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah unshare <span class="token punctuation">[</span>options<span class="token punctuation">]</span> <span class="token punctuation">[</span>--<span class="token punctuation">]</span> <span class="token punctuation">[</span>command<span class="token punctuation">]</span> <span class="token comment"># [选项] [--] [命令]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在新用户命名空间中启动进程（默认为 <em><code v-pre>$SHELL</code></em> ）。配置用户名称空间，以便调用用户的UID 和主 GID 分别显示为 <code v-pre>UID 0</code> 和 <code v-pre>GID 0</code> 。在 <code v-pre>newuidmap</code>（1）和<code v-pre>newgidmap</code>（1）帮助器的帮助下，<code v-pre>/etc/subuid</code>和/etc/subgid中与该用户和组匹配的任何范围也会被映射为它们自己。</p>
<p><code v-pre>buildah unshare</code> 对于排除非特权操作的故障以及手动清除与映像和容器相关的存储和其他数据非常有用。</p>
<p>如果要使用 <code v-pre>buildah mount</code> 命令，此命令也很有用。如果一个非特权用户想要挂载和使用一个容器，那么他们需要执行 buildah unshare。对于无权限用户，执行 <code v-pre>buildah mount</code> 将失败，除非该用户在 <code v-pre>buildah unshare</code> 会话中运行。</p>
<p><strong>参数选择：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>--mount, <span class="token parameter variable">-m</span> <span class="token punctuation">[</span>VARIABLE<span class="token operator">=</span><span class="token punctuation">]</span>containerNameOrID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在运行命令时挂载 <code v-pre>containerNameOrID</code> 容器，并将环境变量VARIABLE设置为挂载点的路径。如果未指定 <code v-pre>VARIABLE</code>，则默认为containerNameOrID，这可能不是环境变量的有效名称。</p>
<p><strong>💡简单的一个案例如下：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># mnt=$(buildah mount $ctr)</span>
<span class="token comment"># su sealer </span>
$ <span class="token assign-left variable">mnt</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>buildah <span class="token function">mount</span> $ctr<span class="token variable">)</span></span>
cannot <span class="token function">mount</span> using driver overlay <span class="token keyword">in</span> rootless mode. You need to run it <span class="token keyword">in</span> a <span class="token variable"><span class="token variable">`</span>buildah unshare<span class="token variable">`</span></span> session
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果您还没有执行，问题是<code v-pre>mnt=$(buildah mount $ctr)</code>拒绝使用覆盖驱动程序安装图像<code v-pre>buildah unshare</code>。</p>
<p>当您在无根模式下执行<code v-pre>buildah</code>诸如<code v-pre>bud</code>和之类的命令时，该命令会进入用户和挂载命名空间。它可以很好地挂载容器文件系统并运行命令。命令完成后退出，导致名称空间被销毁。使用命令执行此操作时，挂载的文件系统从未出现在主机挂载命名空间中。</p>
<blockquote>
<p>Buildah现在会检查这种情况，并向用户报告他们必须首先发出Buildah取消共享。</p>
<p>Buildah now checks for this situation and reports to the user that they have to issue a <code v-pre>buildah unshare</code> first.</p>
</blockquote>
<p>Buildah 有一个特殊的命令 <code v-pre>buildah unshare</code>，它允许您进入用户命名空间。如果你不使用任何命令执行它，它会在用户命名空间中启动一个 shell，你的 shell 看起来就像是以 root 身份运行的，并且主目录的所有内容看起来都像是 root 拥有的。</p>
<p>如果您查看 <code v-pre>/usr</code> 中的所有者或文件，它会将它们列为 <code v-pre>nfsnobody</code>（或没有人）拥有。这是因为您的用户 <code v-pre>ID (UID)</code> 现在是用户命名空间内的 <code v-pre>root</code>，而真正的 <code v-pre>root</code> (UID=0) 未映射到用户命名空间。内核将所有未映射到用户名称空间的 UID 所拥有的文件表示为 <code v-pre>NFSNOBODY</code> 用户。</p>
<p>当您退出 shell 时，您将退出用户命名空间，您将回到您的正常 UID，并且主目录将再次归您的 UID 所有。</p>
<p><strong>example：</strong></p>
<p><code v-pre>buildah unshare id buildah</code>  取消共享ID</p>
<p><code v-pre>buildah unshare pwd buildah</code>  取消共享密码</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah unshare <span class="token function">cat</span> /proc/self/uid_map /proc/self/gid_map
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>构建时取消 共享目录/进程/自身/uid_map /进程/自身/gid_map</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah unshare <span class="token function">rm</span> <span class="token parameter variable">-fr</span> <span class="token environment constant">$HOME</span>/.local/share/containers/storage /run/user/<span class="token variable"><span class="token variable">`</span><span class="token function">id</span> <span class="token parameter variable">-u</span><span class="token variable">`</span></span>/run
buildah unshare <span class="token parameter variable">--mount</span> containerID <span class="token function">sh</span> <span class="token parameter variable">-c</span> <span class="token string">'cat ${containerID}/etc/os-release'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你想使用buildah和mount命令，那么你可以创建一个脚本，如下所示：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> buildah-script.sh <span class="token operator">&lt;&lt;</span> <span class="token string">_EOF
#!/bin/sh
ctr=<span class="token variable"><span class="token variable">$(</span>buildah from scratch<span class="token variable">)</span></span>
mnt=<span class="token variable"><span class="token variable">$(</span>buildah <span class="token function">mount</span> $ctr<span class="token variable">)</span></span>
dnf -y install --installroot=<span class="token variable">$mnt</span> PACKAGES
dnf -y clean all --installroot=<span class="token variable">$mnt</span>
buildah config --entrypoint="/bin/PACKAGE" --env "FOO=BAR" <span class="token variable">$ctr</span>
buildah commit <span class="token variable">$ctr</span> imagename
buildah unmount <span class="token variable">$ctr</span>
_EOF</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Then execute it with:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah unshare buildah-script.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Buildah 和 Podman 有一个特殊的命令 ： <code v-pre>unshare</code> 。此命令在不创建容器或与容器交互的情况下创建并进入用户命名空间。探索这种模式以充分理解用户命名空间在做什么实际上是相当有趣的。执行 <code v-pre>buildah unshare</code> 命令将在用户命名空间中以 root 身份运行的命名空间中运行 shell 命令。现在您可以运行任何命令，包括上面描述的 <code v-pre>buildah</code> 命令。由于这些命令已经在命名空间中， <code v-pre>buildah mount</code> 命令将像在 rootful 模式下一样工作。一切都发生在命名空间内，用户得到他们所期望的。</p>
<p>现在用户可以执行上面列出的命令并创建一个 shell 脚本。然后使用 <code v-pre>buildah unshare</code> 命令直接执行此 shell 脚本。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> <span class="token operator">></span> buildahimage.sh <span class="token operator">&lt;&lt;</span> <span class="token string">EOF
ctr=<span class="token variable"><span class="token variable">$(</span>buildah from scratch<span class="token variable">)</span></span>
mnt=<span class="token variable">$buildah</span> mount <span class="token variable">$ctr</span>)
dnf -y --installroot <span class="token variable">$mnt</span> httpd 
buildah config --entrypoint .... <span class="token variable">$ctr</span>
buildah commit <span class="token variable">$ctr</span> IMAGE
buildah push IMAGE REGISTRY
EOF</span>

<span class="token function">chmod</span> +x ./buildahimage.sh
buildah unshare ./buildimage.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="无根-buildah-的工作原理-在非特权环境中构建容器" tabindex="-1"><a class="header-anchor" href="#无根-buildah-的工作原理-在非特权环境中构建容器" aria-hidden="true">#</a> 无根 Buildah 的工作原理：在非特权环境中构建容器</h2>
<p>Buildah 是用于构建开放容器计划 (OCI) 容器映像的工具和库。</p>
<p>我们都知道容器镜像的特征：</p>
<ul>
<li>rootfs 文件（etc/usr/bin)</li>
<li>容器镜像的第二部分是描述 rootfs 内容的 JSON 文件。它包含运行容器的命令、入口点、运行容器所需的环境变量、容器的工作目录等字段。</li>
</ul>
<p>基本上，这个 JSON 文件允许容器镜像的开发人员描述容器镜像的预期使用方式。<strong>此 JSON 文件中的字段已在 OCI 图像格式规范中标准化。</strong></p>
<p>然后将 rootfs 和 JSON 文件打包在一起以创建存储在容器注册表中的映像包。要创建分层映像，您需要在 rootfs 中安装更多软件并修改 JSON 文件。</p>
<p><strong>在很多年前，Docker 推出了 Dockerfile，这是一种用于构建镜像的脚本化语言，不得不说设计的很成功。但是它也有很多的缺点：</strong></p>
<ul>
<li>Dockerfile 鼓励在容器镜像中包含用于构建容器的工具。容器镜像不需要包含 yum/dnf/apt，但大多数包含其中之一及其所有依赖项。</li>
<li>每行都会创建一个图层。因此， secret 可能会被错误地添加到容器镜像中。如果您在 Dockerfile 的一行中创建一个 secret并在下一行中将其删除，则该 secret 仍在图像中。</li>
</ul>
<blockquote>
<p>Note that <a href="https://github.com/openSUSE/umoci" target="_blank" rel="noopener noreferrer">umoci<ExternalLinkIcon/></a> is an alternative to <strong>docker build</strong> that allows you to build container images without Dockerfile.</p>
</blockquote>
<p><strong>我们使用 buildah 能做什么？</strong></p>
<p>我们使用 Buildah 的目标是构建一个简单的工具，它可以在磁盘上创建一个 rootfs 目录并允许其他工具填充该目录，然后创建 JSON 文件。</p>
<p>最后，Buildah 将创建 OCI 映像并将其推送到容器注册表，供任何容器引擎使用，例如 <a href="https://github.com/docker" target="_blank" rel="noopener noreferrer">Docker<ExternalLinkIcon/></a>, Podman, <a href="https://cri-o.io/" target="_blank" rel="noopener noreferrer">CRI-O<ExternalLinkIcon/></a>, or another <strong>Buildah</strong></p>
<p>Buildah 还支持 Dockerfile，因为我们知道大多数构建容器的人都创建了 Dockerfile。</p>
<h3 id="直接使用-buildah" tabindex="-1"><a class="header-anchor" href="#直接使用-buildah" aria-hidden="true">#</a> 直接使用 buildah</h3>
<p>很多人直接使用 Buildah。 Buildah 的一个很酷的功能是您可以直接在 Bash 中编写容器构建脚本。</p>
<p>下面的示例创建了一个名为 myapp.sh 的 Bash 脚本，它使用 Buildah 来拉下 Fedora 镜像，然后在一台机器上使用 dnf 和 make 将软件安装到容器镜像 rootfs， <strong>$mnt</strong> 。然后它使用 buildah config 将一些字段添加到 JSON 文件，并将容器提交到容器镜像 myapp。最后，它将容器镜像推送到容器注册表 quay.io。 （它可以将它推送到任何容器注册表。）现在这个 OCI 镜像可以被任何容器引擎或 Kubernetes 使用。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">cat</span> myapp.sh
<span class="token comment">#!/bin/bash</span>
<span class="token assign-left variable">ctr</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>buildah from fedora<span class="token variable">)</span></span>
<span class="token assign-left variable">mnt</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span>buildah <span class="token function">mount</span> $ctr<span class="token variable">)</span></span>
dnf <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token parameter variable">--installroot</span> <span class="token variable">$mnt</span> httpd
<span class="token function">make</span> <span class="token function">install</span> <span class="token assign-left variable">DESTDIR</span><span class="token operator">=</span><span class="token variable">$mnt</span> myapp
<span class="token function">rm</span> <span class="token parameter variable">-rf</span> <span class="token variable">$mnt</span>/var/cache <span class="token variable">$mnt</span>/var/log/*
buildah config <span class="token parameter variable">--command</span> /usr/bin/myapp <span class="token parameter variable">-env</span> <span class="token assign-left variable">foo</span><span class="token operator">=</span>bar --working-dir<span class="token operator">=</span>/root <span class="token variable">$ctr</span>
buildah commit <span class="token variable">$ctr</span> myapp
buildah push myapp http://quay.io/username/myapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要创建非常小的镜像，您可以将上面脚本中的 fedora 替换为 <code v-pre>scratch</code>，Buildah 将构建一个容器镜像，该容器镜像内仅包含 httpd 包的要求。不需要 Python 或 DNF。</p>
<p>🤔 <strong>现在我们能更好的理解了 buildah 和 podman 区别：</strong></p>
<blockquote>
<p>借助 Buildah，我们拥有了一个用于构建容器镜像的低级工具。 Buildah 还为其他工具提供了一个库来构建容器镜像。 Podman 旨在取代 Docker 命令行界面 (CLI)。 Docker CLI 命令之一是 docker build。我们需要 podman build 来支持使用 Dockerfiles 构建容器镜像。 Podman 在 Buildah 库中出售，以允许它进行 podman 构建。每次进行 podman 构建时，您都在执行 Buildah 代码来构建容器镜像。如果您只打算使用 Dockerfiles 构建容器镜像，我们建议您只使用 Podman；根本不需要 Buildah。</p>
</blockquote>
<h3 id="buildah-problems-whit-rootless" tabindex="-1"><a class="header-anchor" href="#buildah-problems-whit-rootless" aria-hidden="true">#</a> buildah problems whit rootless</h3>
<p><strong>buildah 配置后支持 rootless ，默认下</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>bash-4.2$ buildah
Error during unshare<span class="token punctuation">(</span>CLONE_NEWUSER<span class="token punctuation">)</span>: Invalid argument
User namespaces are not enabled <span class="token keyword">in</span> /proc/sys/user/max_user_namespaces.
ERRO error parsing PID <span class="token string">""</span><span class="token builtin class-name">:</span> strconv.Atoi: parsing <span class="token string">""</span><span class="token builtin class-name">:</span> invalid syntax 
ERRO <span class="token punctuation">(</span>unable to determine <span class="token builtin class-name">exit</span> status<span class="token punctuation">)</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Buildah 在无根模式下运行良好。它以与 Podman 相同的方式使用用户命名空间。如果你执行：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>buildah bud <span class="token parameter variable">--tag</span> myapp <span class="token parameter variable">-f</span> Dockerfile <span class="token builtin class-name">.</span>
buildah push myapp http://quay.io/username/myapp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>在您的主目录中，一切正常。但是，如果你在普通用户执行上面描述的脚本，它就会失败！</p>
<p><strong>问题在于，在无根模式下运行 buildah mount 命令时，buildah 命令必须将其自身放入用户命名空间并创建一个新的挂载命名空间。当不在用户命名空间中运行时，无根用户不允许挂载文件系统。</strong></p>
<p>Podman 和 Buildah 等无根容器引擎在执行时会自动创建自己的用户命名空间和挂载命名空间。当容器引擎进程退出时，用户和挂载命名空间消失，用户进程回到主机挂载命名空间。此时，运行工具时创建的挂载不再对主机上的其他进程可见或无法使用。</p>
<p>当 Buildah 可执行文件退出时，用户命名空间和挂载命名空间消失，因此挂载点不再存在。这意味着在 buildah mount 之后尝试写入 <strong><code v-pre>$mnt</code></strong> 的命令将失败，因为 <strong><code v-pre>$mnt</code></strong> 不再被挂载。</p>
<p>我们怎样才能使脚本在无根模式下工作？</p>
<h2 id="fuse-overlayfs" tabindex="-1"><a class="header-anchor" href="#fuse-overlayfs" aria-hidden="true">#</a> fuse-overlayfs</h2>
<p>FUSE 中用于无根容器的 overlay+shiftfs 的实现。</p>
<h3 id="启用支持以构建非特权容器" tabindex="-1"><a class="header-anchor" href="#启用支持以构建非特权容器" aria-hidden="true">#</a> 启用支持以构建非特权容器</h3>
<p>希望使用 Buildah 构建非特权容器的用户需要在首次运行 podman 之前完成额外的设置步骤。</p>
<p>注意：如果您正在构建专用于运行非特权容器的系统，请在添加任何用户之前按照以下步骤操作。这样您就不必编辑 <code v-pre>/etc/subuid</code> 和 <code v-pre>/etc/subgid</code> ：useradd 会为您做这些，您只需要以root 身份运行 <code v-pre>touch /etc/subgid</code> 和 <code v-pre>touch /etc/subuid</code> 。</p>
<p>最后，创建 <code v-pre>/etc/subuid</code> 和 <code v-pre>/etc/subgid</code> 以包含到每个能够运行容器的用户的容器化 UID/GID 对的映射。 以下示例适用于 root 用户（和 systemd 系统单元）和示例用户 <code v-pre>buildah</code> ：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">"buildah:100000:65536"</span> <span class="token operator">>></span> /etc/subuid
<span class="token builtin class-name">echo</span> <span class="token string">"buildah:100000:65536"</span> <span class="token operator">>></span> /etc/subgid 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>如果您在应用上述更改之前确实运行了 podman，则在尝试以非特权用户身份拉取图像时会出现错误。运行 <code v-pre>podman system migrate</code> 来修复它。</p>
<p>如果一切顺利，那么在注销并重新登录 <code v-pre>buildah images</code> 后应该不会导致错误</p>
<p>⚠️ 注意：如果您看到访问 <code v-pre>/run/user/0</code> 时出现错误，那么您可能已经使用 su 成为您用于测试的用户 — 您应该以这样的用户身份登录，因为没有 <code v-pre>--login</code> 标志的 su 不会设置 <code v-pre>XDG_RUNTIME_DIR</code> 和其他环境变量来修正值。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># mount --make-shared /</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>要永久</strong>设置它，编辑<a href="https://wiki.archlinux.org/title/Fstab#Usage" target="_blank" rel="noopener noreferrer">/etc/fstab<ExternalLinkIcon/></a>并将<em>共享</em>选项添加到所需的挂载并重新启动。它将产生如下条目：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># &lt;设备> &lt;目录> &lt;类型> &lt;选项> &lt;转储> &lt;fsck> </span>
<span class="token assign-left variable">UUID</span><span class="token operator">=</span>0a3407de-014b-458b-b5c1-848e92a327a3 /     ext4   defaults,shared   <span class="token number">0</span>      <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="podman-1" tabindex="-1"><a class="header-anchor" href="#podman-1" aria-hidden="true">#</a> Podman</h2>
<p>在允许没有 root 权限的用户运行 Podman 之前，管理员必须安装或构建 Podman 并完成以下配置。</p>
<h3 id="install" tabindex="-1"><a class="header-anchor" href="#install" aria-hidden="true">#</a> install</h3>
<p><strong>centos：</strong></p>
<p>Podman 在 CentOS 7 的默认 Extras 存储库和 CentOS 8 和 Stream 的 AppStream 存储库中可用。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">podman</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>ubuntu：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token parameter variable">-y</span> update
<span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token parameter variable">-y</span> <span class="token function">install</span> <span class="token function">podman</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构建" tabindex="-1"><a class="header-anchor" href="#构建" aria-hidden="true">#</a> 构建</h3>
<p><strong>必须的：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> yum <span class="token function">install</span> <span class="token parameter variable">-y</span> <span class="token punctuation">\</span>
  btrfs-progs-devel <span class="token punctuation">\</span>
  conmon <span class="token punctuation">\</span>
  containernetworking-plugins <span class="token punctuation">\</span>
  containers-common <span class="token punctuation">\</span>
  crun <span class="token punctuation">\</span>
  device-mapper-devel <span class="token punctuation">\</span>
  <span class="token function">git</span> <span class="token punctuation">\</span>
  glib2-devel <span class="token punctuation">\</span>
  glibc-devel <span class="token punctuation">\</span>
  glibc-static <span class="token punctuation">\</span>
  go <span class="token punctuation">\</span>
  golang-github-cpuguy83-md2man <span class="token punctuation">\</span>
  gpgme-devel <span class="token punctuation">\</span>
  iptables <span class="token punctuation">\</span>
  libassuan-devel <span class="token punctuation">\</span>
  libgpg-error-devel <span class="token punctuation">\</span>
  libseccomp-devel <span class="token punctuation">\</span>
  libselinux-devel <span class="token punctuation">\</span>
  <span class="token function">make</span> <span class="token punctuation">\</span>
  pkgconfig
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>crun 安装失败，从源码安装：</strong></p>
<blockquote>
<p>测试过部分机器，Ubuntu：<code v-pre>apt install crun -y</code> ，CentOs：<code v-pre>yum install -y crun</code>。也会出现没有包的现象，两种方式，1. 编译安装； 2. 修改源</p>
</blockquote>
<ul>
<li><a href="https://github.com/containers/crun" target="_blank" rel="noopener noreferrer">https://github.com/containers/crun<ExternalLinkIcon/></a></li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">git</span> clone https://github.com/containers/crun <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> crun
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Tumbleweed 要求您将 libseccomp 的头文件位置指定为编译器标志。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># ./autogen.sh</span>
<span class="token comment"># ./configure CFLAGS='-I/usr/include/libseccomp'</span>
<span class="token comment"># make</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>root 模式  和 rootless 模式：</p>
<p>除非你也在构建 Python 绑定，否则 python 只需要 libocispec 在构建时生成 C 解析器，之后不会使用它。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ ./autogen.sh
$ ./configure
$ <span class="token function">make</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要安装到默认前缀 ( <code v-pre>/usr/local</code>)：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>**⚠️ 发现错误，参考 https://github.com/containers/crun/issues/359 **</p>
<h3 id="查看镜像" tabindex="-1"><a class="header-anchor" href="#查看镜像" aria-hidden="true">#</a> 查看镜像</h3>
<p><strong>发现一个错误：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@iZuf68xky083mr0yy6q37lZ ~<span class="token punctuation">]</span><span class="token comment"># podman image list</span>
Error: Could not get runtime: default OCI runtime <span class="token string">"runc"</span> not found: invalid argument
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>📜 对上面的解释：</strong></p>
<p>cgroup V2 Linux 内核功能允许用户限制无根容器可以使用的资源量。如果运行 Podman 的 Linux 发行版启用了 cgroup V2，那么您可能需要更改默认的 OCI 运行时。一些旧版本<code v-pre>runc</code>不能与 cgroup V2 一起使用，您可能必须切换到替代的 OCI 运行时<code v-pre>crun</code>。</p>
<p><code v-pre>--runtime</code>也可以使用以下选项在命令行中打开对 cgroup V2 的替代 OCI 运行时支持：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">podman</span> <span class="token parameter variable">--runtime</span> crun
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>containers.conf</code>或者对于所有命令，通过在系统级别或<a href="https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md#user-configuration-files" target="_blank" rel="noopener noreferrer">用户级别<ExternalLinkIcon/></a>将文件中“默认 OCI 运行时”的值从<code v-pre>runtime = &quot;runc&quot;</code>更改为<code v-pre>runtime = &quot;crun&quot;</code>.</p>
<h3 id="安装-slirp4netns" tabindex="-1"><a class="header-anchor" href="#安装-slirp4netns" aria-hidden="true">#</a> 安装 <code v-pre>slirp4netns</code></h3>
<p>slirp4netns包<a href="https://github.com/rootless-containers/slirp4netns" target="_blank" rel="noopener noreferrer">为非特权<ExternalLinkIcon/></a>网络命名空间提供用户模式网络，必须安装在机器上才能让 Podman 在无根环境中运行。大多数 Linux 发行版都可以通过它们的软件包分发软件（例如<code v-pre>yum</code>、<code v-pre>dnf</code>、<code v-pre>apt</code>、<code v-pre>zypper</code>等）获得该软件包。如果该软件包不可用，您可以<code v-pre>slirp4netns</code>从<a href="https://github.com/rootless-containers/slirp4netns" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a>构建和安装。</p>
<h3 id="确保fuse-overlayfs已安装" tabindex="-1"><a class="header-anchor" href="#确保fuse-overlayfs已安装" aria-hidden="true">#</a> 确保<code v-pre>fuse-overlayfs</code>已安装</h3>
<p>在无根环境下使用 Podman 时，建议使用<code v-pre>fuse-overlayfs</code>而不是 VFS 文件系统。为此，您<code v-pre>fuse-overlayfs</code>需要<code v-pre>$PATH</code>.</p>
<ul>
<li><a href="https://github.com/containers/fuse-overlayfs" target="_blank" rel="noopener noreferrer">https://github.com/containers/fuse-overlayfs<ExternalLinkIcon/></a></li>
</ul>
<p>您的发行版可能已经在<code v-pre>fuse-overlayfs</code>包中提供了它，但请注意您至少需要<strong>0.7.6</strong>版。这尤其需要在 Ubuntu 发行版上检查，因为<code v-pre>fuse-overlayfs</code>默认情况下通常不会安装 0.7.6 版本在 <strong>20.04</strong> 之前的 Ubuntu 版本上本机不可用。</p>
<p>该<code v-pre>fuse-overlayfs</code>项目可从<a href="https://github.com/containers/fuse-overlayfs" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a>获得，并提供了轻松构建静态<code v-pre>fuse-overlayfs</code>可执行文件的说明。</p>
<p>如果在安装之前使用 Podman <code v-pre>fuse-overlayfs</code>，可能需要调整<code v-pre>storage.conf</code>文件（请参阅下面的“用户配置文件”）以更改 to 下的选项<code v-pre>driver</code>并将选项指向可执行文件的路径：</p>
<p><code v-pre>[storage]</code> <code v-pre>&quot;overlay&quot;</code> <code v-pre>mount_program</code> <code v-pre>[storage.options.overlay]</code> <code v-pre>fuse-overlayfs</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>storage<span class="token punctuation">]</span>
  driver <span class="token operator">=</span> <span class="token string">"overlay"</span>

  <span class="token punctuation">(</span><span class="token punctuation">..</span>.<span class="token punctuation">)</span>

<span class="token punctuation">[</span>storage.options.overlay<span class="token punctuation">]</span>

  <span class="token punctuation">(</span><span class="token punctuation">..</span>.<span class="token punctuation">)</span>

  mount_program <span class="token operator">=</span> <span class="token string">"/usr/bin/fuse-overlayfs"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启用用户命名空间-centos-7-8-测试" tabindex="-1"><a class="header-anchor" href="#启用用户命名空间-centos-7-8-测试" aria-hidden="true">#</a> 启用用户命名空间 （centos 7/8 测试）</h3>
<p>文件中指定了系统允许的用户命名空间数<code v-pre>/proc/sys/user/max_user_namespaces</code>。在大多数 Linux 平台上，这是默认预设的，无需调整。但是，在 RHEL7 机器上，具有 root 权限的用户可能需要使用以下命令将其设置为合理的值： <code v-pre>sysctl user.max_user_namespaces=15000</code>。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># cat /proc/sys/user/max_user_namespaces</span>
<span class="token number">0</span>

<span class="token comment"># sysctl user.max_user_namespaces=15000</span>
user.max_user_namespaces <span class="token operator">=</span> <span class="token number">15000</span>

<span class="token comment"># cat /proc/sys/user/max_user_namespaces</span>
<span class="token number">15000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>Ubuntu 20.04 test：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:~/workspces<span class="token comment"># cat /proc/sys/user/max_user_namespaces</span>
<span class="token number">15251</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h3 id="etc-subuid和-etc-subgid配置" tabindex="-1"><a class="header-anchor" href="#etc-subuid和-etc-subgid配置" aria-hidden="true">#</a> <code v-pre>/etc/subuid</code>和<code v-pre>/etc/subgid</code>配置</h3>
<p>Rootless Podman 要求运行它的用户在文件<code v-pre>/etc/subuid</code>和<code v-pre>/etc/subgid</code>. <code v-pre>shadow-utils</code>或包在不同的<code v-pre>newuid</code>发行版上提供这些文件，它们必须安装在系统上。添加或更新这些文件中的条目需要根权限。</p>
<p>对于将被允许创建容器的每个用户，使用如下所示的字段更新<code v-pre>/etc/subuid</code>和<code v-pre>/etc/subgid</code>为用户更新。请注意，每个用户的值必须是唯一的。如果存在重叠，则用户有可能使用另一个用户的命名空间，他们可能会破坏它。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">cat</span> /etc/subuid
sealos:100000:65536
sealer:165536:65536
root:200000:1001
buildah:100000:65536

$ <span class="token function">cat</span> /etc/subgid
sealos:100000:65536
sealer:165536:65536
root:200000:1001
buildah:100000:65536
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个文件的格式是<code v-pre>USERNAME:UID:RANGE</code></p>
<ul>
<li><code v-pre>/etc/passwd</code>中或输出中列出的用户名<a href="https://man7.org/linux/man-pages/man3/getpwent.3.html" target="_blank" rel="noopener noreferrer"><code v-pre>getpwent</code><ExternalLinkIcon/></a>。</li>
<li>为用户分配的初始 UID。</li>
<li>为用户分配的 UID 范围的大小。</li>
</ul>
<p>这意味着为用户<code v-pre>sealer</code>分配了 UID 100000-165535 以及<code v-pre>/etc/passwd</code>文件中的标准 UID。注意：网络安装目前不支持此功能；这些文件必须在主机本地可用。无法使用 LDAP 或 Active Directory 进行配置。</p>
<p>如果更新<code v-pre>/etc/subuid</code>或<code v-pre>/etc/subgid</code>，则需要停止该用户拥有的所有正在运行的容器，并终止该用户在系统上运行的暂停进程。这可以通过使用命令自动完成，该<a href="https://github.com/containers/podman/blob/main/docs/source/markdown/podman-system-migrate.1.md" target="_blank" rel="noopener noreferrer"><code v-pre>podman system migrate</code><ExternalLinkIcon/></a>命令将为用户停止所有容器并终止暂停进程。</p>
<p><code v-pre>usermod</code>该程序可用于将 UID 和 GID 分配给用户，而不是直接更新文件:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">usermod</span> --add-subuids <span class="token number">100000</span>-165535 --add-subgids <span class="token number">100000</span>-165535 johndoe
<span class="token function">grep</span> johndoe /etc/subuid /etc/subgid
/etc/subuid:johndoe:100000:65536
/etc/subgid:johndoe:100000:65536
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="启动非特权-ping" tabindex="-1"><a class="header-anchor" href="#启动非特权-ping" aria-hidden="true">#</a> 启动非特权 ping</h3>
<p><strong>在非特权容器中运行的用户可能无法使用该<code v-pre>ping</code>容器中的实用程序。</strong></p>
<p>如果需要，管理员必须验证用户的 UID 是否在<code v-pre>/proc/sys/net/ipv4/ping_group_range</code>文件范围内。</p>
<p>要更改其值，管理员可以使用类似于以下的调用：<code v-pre>sysctl -w &quot;net.ipv4.ping_group_range=0 2000000&quot;</code>。</p>
<p>为了使更改持久化，管理员将需要添加一个<code v-pre>.conf</code>文件扩展名，<code v-pre>/etc/sysctl.d</code>其中包含<code v-pre>net.ipv4.ping_group_range=0 $MAX_GID</code>，其中<code v-pre>$MAX_GID</code>是运行容器的用户的最高可分配 GID。</p>
<h3 id="用户操作" tabindex="-1"><a class="header-anchor" href="#用户操作" aria-hidden="true">#</a> 用户操作</h3>
<p>在无根环境中运行 <code v-pre>Podman</code> 所需的大部分工作都落在机器管理员的肩上。</p>
<p>一旦管理员在机器上完成设置，然后在<code v-pre>/etc/subuid</code>和中为用户完成配置<code v-pre>/etc/subgid</code>，用户就可以开始使用他们希望使用的任何 <code v-pre>Podman</code> 命令。</p>
<h3 id="用户配置文件" tabindex="-1"><a class="header-anchor" href="#用户配置文件" aria-hidden="true">#</a> 用户配置文件</h3>
<p>root 的 Podman 配置文件位于<code v-pre>/usr/share/containers</code>、<code v-pre>/etc/containers</code>. 在无根环境中，它们位于<code v-pre>${XDG_CONFIG_HOME}/containers</code>（通常<code v-pre>~/.config/containers</code>）并由每个用户拥有。</p>
<p>三个主要配置文件是<a href="https://github.com/containers/common/blob/main/docs/containers.conf.5.md" target="_blank" rel="noopener noreferrer">containers.conf<ExternalLinkIcon/></a>、<a href="https://github.com/containers/storage/blob/main/docs/containers-storage.conf.5.md" target="_blank" rel="noopener noreferrer">storage.conf<ExternalLinkIcon/></a>和<a href="https://github.com/containers/image/blob/main/docs/containers-registries.conf.5.md" target="_blank" rel="noopener noreferrer">registries.conf<ExternalLinkIcon/></a>。用户可以随意修改这些文件。</p>
<h4 id="容器配置文件" tabindex="-1"><a class="header-anchor" href="#容器配置文件" aria-hidden="true">#</a> 容器配置文件</h4>
<p>Podman 读取</p>
<ol>
<li><code v-pre>/usr/share/containers/containers.conf</code></li>
<li><code v-pre>/etc/containers/containers.conf</code></li>
<li><code v-pre>$HOME/.config/containers/containers.conf</code></li>
</ol>
<p>如果它们按该顺序存在。每个文件都可以覆盖特定字段的前一个文件。</p>
<h4 id="存储配置文件" tabindex="-1"><a class="header-anchor" href="#存储配置文件" aria-hidden="true">#</a> 存储配置文件</h4>
<p>因为<code v-pre>storage.conf</code>订单是</p>
<ol>
<li><code v-pre>/etc/containers/storage.conf</code></li>
<li><code v-pre>$HOME/.config/containers/storage.conf</code></li>
</ol>
<p>在无根 Podman 中，某些字段<code v-pre>/etc/containers/storage.conf</code>被忽略。这些字段是：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">graphroot</span><span class="token operator">=</span><span class="token string">""</span>
 container storage graph <span class="token function">dir</span> <span class="token punctuation">(</span>default: <span class="token string">"/var/lib/containers/storage"</span><span class="token punctuation">)</span>
 Default directory to store all writable content created by container storage programs.

<span class="token assign-left variable">runroot</span><span class="token operator">=</span><span class="token string">""</span>
 container storage run <span class="token function">dir</span> <span class="token punctuation">(</span>default: <span class="token string">"/run/containers/storage"</span><span class="token punctuation">)</span>
 Default directory to store all temporary writable content created by container storage programs.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在无根 Podman 中，这些字段默认为</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token assign-left variable">graphroot</span><span class="token operator">=</span><span class="token string">"<span class="token environment constant">$HOME</span>/.local/share/containers/storage"</span>
<span class="token assign-left variable">runroot</span><span class="token operator">=</span><span class="token string">"<span class="token environment constant">$XDG_RUNTIME_DIR</span>/containers"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html#variables" target="_blank" rel="noopener noreferrer">$XDG_RUNTIME_DIR<ExternalLinkIcon/></a>在大多数系统上默认为<code v-pre>/run/user/$UID</code>.</p>
<h4 id="注册配置文件" tabindex="-1"><a class="header-anchor" href="#注册配置文件" aria-hidden="true">#</a> 注册配置文件</h4>
<p>注册表配置按此顺序读入</p>
<ol>
<li><code v-pre>/etc/containers/registries.conf</code></li>
<li><code v-pre>/etc/containers/registries.d/*</code></li>
<li><code v-pre>HOME/.config/containers/registries.conf</code></li>
</ol>
<p>主目录中的文件应该用于根据个人需要配置无根 Podman。默认情况下不创建这些文件。用户可以复制<code v-pre>/usr/share/containers</code>或<code v-pre>/etc/containers</code>修改文件。</p>
<h4 id="授权文件" tabindex="-1"><a class="header-anchor" href="#授权文件" aria-hidden="true">#</a> 授权文件</h4>
<p><code v-pre>podman login</code>和命令使用的默认授权文件<code v-pre>podman logout</code>位于<code v-pre>${XDG_RUNTIME_DIR}/containers/auth.json</code>.</p>
<h3 id="使用卷" tabindex="-1"><a class="header-anchor" href="#使用卷" aria-hidden="true">#</a> 使用卷</h3>
<p>Rootless Podman 不是，也永远不会是 root；它不是<code v-pre>setuid</code>二进制文件，运行时不会获得任何特权。相反，Podman 使用用户命名空间来转移它在主机上（通过<code v-pre>newuidmap</code>和<code v-pre>newgidmap</code>可执行文件）访问的一组用户的 UID 和 GID，以及 Podman 创建的容器中您自己的用户。</p>
<p>如果您的容器以 root 用户运行，那么<code v-pre>root</code>容器中实际上是您在主机上的用户。<code v-pre>UID/GID 1</code> 是用户在<code v-pre>/etc/subuid</code>和<code v-pre>/etc/subgid</code>等中的映射中指定的第一个 <code v-pre>UID/GID</code>。如果您以无根用户身份将主机中的目录挂载到容器中，并在容器中以根用户身份在该目录中创建文件，则您会看到它实际上由您的用户在主机上拥有。</p>
<p>💡简单的一个案例如下：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token operator">></span> <span class="token function">whoami</span>
john

<span class="token comment"># a folder which is empty</span>
host<span class="token operator">></span> <span class="token function">ls</span> /home/john/folder
host<span class="token operator">></span> <span class="token function">podman</span> run <span class="token parameter variable">-v</span> /home/john/folder:/container/volume mycontainer /bin/bash

<span class="token comment"># Now I'm in the container</span>
root@container<span class="token operator">></span> <span class="token function">whoami</span>
root
root@container<span class="token operator">></span> <span class="token function">touch</span> /container/volume/test
root@container<span class="token operator">></span> <span class="token function">ls</span> <span class="token parameter variable">-l</span> /container/volume
total <span class="token number">0</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> May <span class="token number">20</span> <span class="token number">21</span>:47 <span class="token builtin class-name">test</span>
root@container<span class="token operator">></span> <span class="token builtin class-name">exit</span>

<span class="token comment"># I check again</span>
host<span class="token operator">></span> <span class="token function">ls</span> <span class="token parameter variable">-l</span> /home/john/folder
total <span class="token number">0</span>
-rw-r--r-- <span class="token number">1</span> john john <span class="token number">0</span> May <span class="token number">20</span> <span class="token number">21</span>:47 <span class="token builtin class-name">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们确实认识到，这并不真正符合有多少人打算使用无根Podman -他们希望他们的UID在容器内外相匹配。因此，我们提供了 <code v-pre>--userns=keep-id</code> 标志，它确保您的用户映射到容器内自己的UID和GID。</p>
<p>区分作为无根用户运行Podman和为运行无根用户而构建的容器也很有帮助。如果您尝试运行的容器有一个 <code v-pre>USER</code> ，而不是根目录，那么在挂载卷时，您必须使用 <code v-pre>--userns=keep-id</code> 。这是因为容器用户将无法成为 <code v-pre>root</code> 并访问装载的卷。</p>
<ul>
<li>在提供要绑定装载的目录的路径时，需要提供绝对路径或以 <code v-pre>.</code> （点）开头的相对路径，否则字符串将被解释为已命名卷的名称。</li>
</ul>
<h2 id="podman-在-rootless-下是如何工作的" tabindex="-1"><a class="header-anchor" href="#podman-在-rootless-下是如何工作的" aria-hidden="true">#</a> Podman 在 rootless 下是如何工作的</h2>
<p>Podman是libpod库的一部分，使用户能够管理pod、容器和容器映像。</p>
<p>我们在 <a href="https://docker.nsddd.top" target="_blank" rel="noopener noreferrer">docker <ExternalLinkIcon/></a> 中了解到，用户名称空间是分隔容器的一个很好的特性。<strong>用户命名空间允许指定用户标识符（UID）和组标识符（GID）映射以运行容器。</strong></p>
<p>这意味着您可以在容器内以 <code v-pre>UID 0</code> 运行，在容器外以 <code v-pre>UID 100000</code> 运行。如果容器进程脱离容器，<strong>内核</strong> 会将它们视为 <code v-pre>UID 100000</code>。</p>
<p>不仅如此，UID 拥有的任何文件对象如果没有映射到用户名称空间，都将被视为&quot;nobody&quot;（65534，kernel. overflowuid）拥有，并且容器进程将不被允许访问，除非该对象可以被&quot;other&quot;（完全可读/可写）访问。</p>
<p>如果您有一个由&quot;真实&quot;根拥有权限 <code v-pre>660</code> 的文件，并且用户名称空间中的容器进程试图读取它，则它们将被阻止访问它，并将看到该文件不为任何人拥有。</p>
<p><strong>work theory：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">bash</span> <span class="token parameter variable">-c</span> <span class="token string">"echo Test > /tmp/test"</span>
$ <span class="token function">sudo</span> <span class="token function">chmod</span> <span class="token number">600</span> /tmp/test 
$ <span class="token function">sudo</span> <span class="token function">ls</span> <span class="token parameter variable">-l</span> /tmp/test 
-rw-------. <span class="token number">1</span> root root <span class="token number">5</span> Dec <span class="token number">17</span> <span class="token number">16</span>:40 /tmp/test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接下来，我将文件卷装载到一个使用用户名称空间映射 <code v-pre>0：100000：5000</code> 运行的容器中。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>sealer@iZuf~<span class="token punctuation">]</span>$ <span class="token function">sudo</span> <span class="token function">podman</span> run <span class="token parameter variable">-ti</span> <span class="token parameter variable">-v</span> /tmp/test:/tmp/test:Z <span class="token parameter variable">--uidmap</span> <span class="token number">0</span>:100000:5000 fedora <span class="token function">sh</span>
sh-5.2<span class="token comment"># id</span>
<span class="token assign-left variable">uid</span><span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> <span class="token assign-left variable">gid</span><span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span> <span class="token assign-left variable">groups</span><span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">(</span>root<span class="token punctuation">)</span>
sh-5.2<span class="token comment"># ls -al /tmp/test</span>
-rw------- <span class="token number">1</span> nobody nobody <span class="token number">5</span> Feb <span class="token number">10</span> 05:42 /tmp/test
sh-5.2<span class="token comment"># cat /tmp/test</span>
cat: /tmp/test: Permission denied
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>对于 <code v-pre>podman</code> 的命令的解释说明：</p>
<p>上面的 <code v-pre>--uidmap</code> 设置告诉Podman将容器内的5000个UID映射到容器外的UID 100000（因此范围是100000 - 104999）到容器内的UID 0（因此范围是0 - 4999）。</p>
</blockquote>
<p>在容器内，如果我的进程以UID 1运行，则它在主机上为100001</p>
<p>因为真实的的 <code v-pre>UID=0</code> 没有映射到容器中，所以root拥有的任何文件都将被视为无人拥有。即使容器内的进程具有CAP_DAC_OVERRIDE，它也不能覆盖此保护。DAC_OVERRIDE使根进程能够读/写系统上的任何文件，即使该进程不归根所有或完全不可读或可写。</p>
<p>用户命名空间权能与主机上的权能不同。它们是命名空间权能。这意味着我的容器根目录（rootfs)仅在容器内具有功能-实际上仅在映射到用户名称空间的UID范围内具有功能。</p>
<p>如果一个容器进程脱离了容器，那么它将不具有任何针对未映射到用户名称空间的UID（包括UID=0）的功能。</p>
<p>即使进程可以以某种方式进入另一个容器，如果容器使用不同范围的UID，它们也不会具有这些功能。</p>
<h3 id="使用-podman-top-显示用户名称空间" tabindex="-1"><a class="header-anchor" href="#使用-podman-top-显示用户名称空间" aria-hidden="true">#</a> 使用“podman top”显示用户名称空间</h3>
<p>使用UID映射运行一个休眠容器。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">podman</span> run <span class="token parameter variable">--uidmap</span> <span class="token number">0</span>:100000:5000 <span class="token parameter variable">-d</span> fedora <span class="token function">sleep</span> <span class="token number">1000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在就可以 运行 <code v-pre>podman</code> :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$  <span class="token function">sudo</span> <span class="token function">podman</span> <span class="token function">top</span> <span class="token parameter variable">--latest</span> user huser
<span class="token environment constant">USER</span>   HUSER
root   ?

$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token function">sleep</span>
sealer    <span class="token number">1513</span> <span class="token number">30899</span>  <span class="token number">0</span> <span class="token number">14</span>:00 pts/1    00:00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto <span class="token function">sleep</span>
<span class="token number">100000</span>   <span class="token number">31026</span> <span class="token number">31014</span>  <span class="token number">0</span> <span class="token number">13</span>:58 ?        00:00:00 <span class="token function">sleep</span> <span class="token number">1000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，<code v-pre>podman top</code> 报告用户进程在容器内以root身份运行，但在主机（HUSER）上以<code v-pre>UID 100000</code> 运行。ps命令还确认休眠进程正在以 <code v-pre>UID 100000 </code>运行。</p>
<p>现在让我们运行第二个容器，但这次我们将选择一个从 <code v-pre>200000</code> 开始的单独UID映射。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">sudo</span> <span class="token function">podman</span> run <span class="token parameter variable">--uidmap</span> <span class="token number">0</span>:200000:5000 <span class="token parameter variable">-d</span> fedora <span class="token function">sleep</span> <span class="token number">1000</span>
b5d72d262f89d1db0bc60ebdd2ef3ddc425932c593e83d2991f5921f563d9766

$ <span class="token function">sudo</span> <span class="token function">podman</span> <span class="token function">top</span> <span class="token parameter variable">--latest</span> user huser
<span class="token environment constant">USER</span>   HUSER
root   ?

$ <span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token function">sleep</span>
<span class="token number">200000</span>    <span class="token number">6466</span>  <span class="token number">6454</span>  <span class="token number">0</span> <span class="token number">14</span>:04 ?        00:00:00 <span class="token function">sleep</span> <span class="token number">1000</span>
sealer    <span class="token number">6985</span> <span class="token number">30899</span>  <span class="token number">0</span> <span class="token number">14</span>:05 pts/1    00:00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto <span class="token function">sleep</span>
<span class="token number">100000</span>   <span class="token number">31026</span> <span class="token number">31014</span>  <span class="token number">0</span> <span class="token number">13</span>:58 ?        00:00:00 <span class="token function">sleep</span> <span class="token number">1000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>⚠️ 注意，<code v-pre>podman top</code> 报告第二个容器在容器内以root用户身份运行，但在主机上的<code v-pre>UID=200000</code>。</p>
<p>还可以查看ps命令-它显示两个休眠进程都在运行：一个为100000，另一个为200000。</p>
<p>这意味着在单独的用户名称空间中运行容器可以在进程之间提供传统的UID分离，这从一开始就是 Linux/Unix 的标准安全工具。</p>
<h3 id="user-namaspace" tabindex="-1"><a class="header-anchor" href="#user-namaspace" aria-hidden="true">#</a> user namaspace</h3>
<p>在容器中，您希望在多个容器之间共享基本映像。上面的例子在每个例子中都使用了Fedora基础映像。Fedora映像中的大多数文件都是真实的 <code v-pre>UID=0</code> 的文件。</p>
<p>如果我在这个映像上运行一个容器，其用户名称空间为 <code v-pre>0：100000：5000</code>，默认情况下，它会将所有这些文件视为无人拥有，因此我们需要移动所有这些UID以匹配用户名称空间。</p>
<p>Podman可以在同一个映像上使用不同的用户名称空间，因为Nalin Dahyabhai领导的团队在容器/存储中内置了自动<code v-pre>chowning</code>。Podman使用容器/存储，并且Podman第一次在新用户命名空间中使用容器映像时，容器/存储“chowns”（即改变所有权）映像中的所有文件映射到用户名称空间中映射的UID，并创建新映像。将此图像视为：<code v-pre>0：100000：5000</code> 图像。</p>
<p>当Podman在具有相同UID映射的映像上运行另一个容器时，它使用“预chowned”映像。当我在 <code v-pre>0：200000：5000</code>上运行第二个容器时，<code v-pre>containers/storage</code> 会创建第二个映像，我们将其命名为<code v-pre>fedora：0：200000：5000</code>。</p>
<p>注意，如果您正在执行podman构建或podman提交，并将新创建的映像推送到容器注册表中，则Podman将使用容器/存储来反向转换，并将包含所有文件的映像推回真实的UID=0。</p>
<p>这可能会导致在新UID映射中创建容器的真实的慢，因为chown可能会很慢，具体取决于映像中的文件数量。同样，在普通的 <code v-pre>OverlayFS</code> 上，映像中的每个文件都被复制。正常的Fedora映像可能需要30秒来完成chown并启动容器。</p>
<h3 id="going-forward" tabindex="-1"><a class="header-anchor" href="#going-forward" aria-hidden="true">#</a> going forward</h3>
<p>我想给Podman添加一个新的标志，比如 <code v-pre>--userns=auto</code>，告诉它为您运行的每个容器自动选择一个唯一的用户名称空间。这类似于SELinux使用单独的多类别安全（MCS）标签的方式。如果设置环境变量 <code v-pre>PODMAN_USERNS=auto</code>，则甚至不需要设置标志。</p>
<p>Podman终于允许用户在单独的用户名称空间中运行容器。像<code v-pre>Buildah</code>和<code v-pre>CRI-O</code>这样的工具也将能够利用用户名称空间。但是对于 CRI-O，Kubernetes需要了解哪个用户命名空间将运行容器引擎，上游正在处理这个问题。</p>
<p>在我看来，最好的特性是以非root用户身份运行Podman和containers。这意味着您从未在主机上给予用户root权限，而在客户机/服务器模型中（如Docker使用的），您必须打开一个套接字，连接到以root身份运行的特权守护进程以启动容器。这样，您就处于守护进程中实现的安全机制与主机操作系统中实现的安全机制之间--这是一个危险的命题。</p>
<h3 id="podman-如何创建用户名称空间" tabindex="-1"><a class="header-anchor" href="#podman-如何创建用户名称空间" aria-hidden="true">#</a> Podman 如何创建用户名称空间</h3>
<p>大多数当前的Linux发行版都包含一个 <code v-pre>shadow-utils</code> 版本，该版本使用/etc/subuid和 <code v-pre>/etc/subgid</code> 文件来确定用户名称空间中的用户可用的UID和GID。</p>
<p><strong>我们创建用户的用户组的命令很熟练了：</strong></p>
<p><code v-pre>useradd</code>程序为添加到系统的每个用户自动分配<code v-pre>65536</code>个<code v-pre>UID</code>。如果 <strong>系统上已有用户，则需要自己分配UID</strong>。这些文件的格式为用户名：<code v-pre>STARTUID：TOTALUIDS</code>。</p>
<p>这意味着<code v-pre>dwalsh</code>被分配了 <code v-pre>UID 100000</code> 到 <code v-pre>165535</code> 沿着我的默认<code v-pre>UID</code>，它恰好是在 <code v-pre>/etc/passwd</code> 中定义的3265。在分配这些UID范围时需要小心，不要与系统上的任何realUID重叠。如果您有一个用户被列为 <code v-pre>UID 100001</code>，现在我（dwalsh）将能够成为这个UID，并可能读取/写入/执行该UID所拥有的文件。</p>
<p><code v-pre>Shadow-utils</code> 还添加了两个<code v-pre>setuid</code>程序（或<code v-pre>setfilecap</code>）。在Fedora上我有：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># getcap /usr/bin/newuidmap</span>
/usr/bin/newuidmap <span class="token operator">=</span> cap_setuid+ep
<span class="token comment"># getcap /usr/bin/newgidmap</span>
/usr/bin/newgidmap <span class="token operator">=</span> cap_setgid+ep
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Podman执行这些文件来设置用户名称空间。您可以通过从无根容器内部检查 <code v-pre>/proc/self/uid_map</code> 和 <code v-pre>/proc/self/gid_map</code> 来查看映射。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">podman</span> run alpine <span class="token function">cat</span> /proc/self/uid_map /proc/self/gid_map
     	<span class="token number">0</span>   	<span class="token number">3267</span>      	<span class="token number">1</span>
     	<span class="token number">1</span> 	<span class="token number">100000</span>  	<span class="token number">65536</span>
     	<span class="token number">0</span>   	<span class="token number">3267</span>      	<span class="token number">1</span>
     	<span class="token number">1</span> 	<span class="token number">100000</span>  	<span class="token number">65536</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如上所述，Podman默认将容器中的根映射到您当前的UID（3267），然后映射 <code v-pre>/etc/subuid</code> 和 <code v-pre>/etc/subgid</code> 中从1开始的已分配UID/GID的范围。</p>
<p>UID=1的容器是UID 100000，UID=2的容器是UID 100001，一直到65536，即165535。</p>
<p>用户名称空间之外的任何项，如果由未映射到用户名称空间的UID或GID拥有，则看起来属于在内核中配置的用户。overflowuid sysctl，默认值为35534，我的/etc/passwd文件将其命名为nobody。由于您的进程不能以未映射的ID运行，因此所有者和组权限不适用，因此您只能基于它们的“其他”权限访问这些文件。这包括运行容器的系统上真实的root拥有的所有文件，因为root没有映射到用户名称空间。</p>
<p><a href="https://github.com/containers/buildah/blob/main/docs/buildah-unshare.1.md" target="_blank" rel="noopener noreferrer">buildah unshare<ExternalLinkIcon/></a>会将您置于Podman运行所在的用户 (sealer) 名称空间中，但不需要进入容器的文件系统，因此您可以列出主目录的内容。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">ls</span> <span class="token parameter variable">-ild</span> /home/sealer 
<span class="token number">131079</span> drwx------ <span class="token number">10</span> sealer root <span class="token number">4096</span> Feb <span class="token number">10</span> <span class="token number">13</span>:46 /home/sealer

$ buildah unshare <span class="token function">ls</span> <span class="token parameter variable">-ld</span> /home/sealer 
drwx------ <span class="token number">10</span> root root <span class="token number">4096</span> Feb <span class="token number">10</span> <span class="token number">13</span>:46 /home/sealer
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，当列出用户名称空间之外的 <code v-pre>home dir</code> 属性时，内核将所有权报告为 <code v-pre>sealer</code>，而在用户名称空间之内，它将目录报告为 <code v-pre>root</code>所有。</p>
<p>这是因为主目录归3267所有，并且在用户名称空间中，我们将该UID视为 <code v-pre>rootfs</code> 。</p>
<h3 id="设置命名空间后-podman-接下来会发生什么" tabindex="-1"><a class="header-anchor" href="#设置命名空间后-podman-接下来会发生什么" aria-hidden="true">#</a> 设置命名空间后，podman 接下来会发生什么</h3>
<p><code v-pre>Podman</code>使用 <code v-pre>containers/storage</code> 来拉取容器映像，<code v-pre>containers/storage</code> 非常智能，<strong>可以将映像中 <code v-pre>root</code> 拥有的所有文件映射到用户名称空间的 根（rootfs)</strong>，并将不同 UID 拥有的任何其他文件映射到它们的用户名称空间 UID。默认情况下，此内容将写入 <code v-pre>~/</code>。</p>
<p><strong>本地/共享/容器/存储</strong>。容器存储在 <code v-pre>vfs</code> 模式或<code v-pre>Overlay</code>下的 rootless (non root) 下工作。注：只有安装了<code v-pre>fuse-overlayfs</code>可执行文件，才支持覆盖。</p>
<p>内核只允许用户命名空间根挂载某些类型的文件系统；现在它允许挂载<code v-pre>procfs</code>，<code v-pre>sysfs</code>，<code v-pre>tmpfs</code>，<code v-pre>fusefs</code>和<code v-pre>bind</code>挂载（只要源和目标是由运行Podman的用户拥有的。</p>
<p>如果集装箱使用保险丝覆盖，则<code v-pre>Podman</code>安装集装箱的存储器;如果存储驱动器使用vfs，则不需要安装。vfs上的<code v-pre>podman</code>需要大量的空间，因为每个容器复制整个底层文件系统。</p>
<p>然后，Podman挂载 <code v-pre>/proc</code>和 <code v-pre>/sys</code>沿着一些<code v-pre>tmpfs</code>，并在容器中创建设备。</p>
<p>为了使用主机网络以外的网络，<strong>Podman 使用 slirp 4 netns 程序为非特权网络名称空间设置用户模式网络</strong>。Slirp 4 netns允许 Podman 向主机公开容器内的端口。注意，内核仍然不允许非特权进程绑定到小于1024的端口。需要Podman-1.1或更高版本才能绑定到端口。</p>
<p>Rootless Podman可以使用用户名称空间进行容器分离，但是您只能访问 <code v-pre>/etc/subuid</code> 文件中定义的UID。</p>
<h2 id="links" tabindex="-1"><a class="header-anchor" href="#links" aria-hidden="true">#</a> Links</h2>
<ul>
<li><a href="https://github.com/containers/podman/blob/main/docs/tutorials/rootless_tutorial.md" target="_blank" rel="noopener noreferrer">Podman 在无根环境中的基本设置和使用。<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/containers/buildah/issues/2325" target="_blank" rel="noopener noreferrer">非root用户如何使用buildah<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/containers/buildah/blob/main/install.md" target="_blank" rel="noopener noreferrer">安装文档<ExternalLinkIcon/></a></li>
<li><a href="https://opensource.com/article/19/2/how-does-rootless-podman-work" target="_blank" rel="noopener noreferrer">Podman 在 rootless  模式下是如何工作的<ExternalLinkIcon/></a></li>
<li><a href="https://opensource.com/article/18/12/podman-and-user-namespaces" target="_blank" rel="noopener noreferrer">Podman 在单独的名称空间中运行容器的<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/containers/buildah/blob/main/docs/buildah-unshare.1.md" target="_blank" rel="noopener noreferrer">buildah-unshare &quot;1&quot; &quot;June 2018&quot; &quot;buildah&quot;<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/containers/buildah/blob/main/docs/buildah-mount.1.md" target="_blank" rel="noopener noreferrer">buildah-mount &quot;1&quot; &quot;March 2017&quot; &quot;buildah&quot;<ExternalLinkIcon/></a></li>
</ul>
<hr>
<ul><li><div><a href = '24.md' style='float:left'>⬆️上一节🔗  </a><a href = '26.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


