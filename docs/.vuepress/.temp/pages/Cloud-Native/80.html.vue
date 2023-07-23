<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第80节-跨平台编译" tabindex="-1"><a class="header-anchor" href="#第80节-跨平台编译" aria-hidden="true">#</a> 第80节 跨平台编译</h1>
<div><a href = '79.md' style='float:left'>⬆️上一节🔗  </a><a href = '81.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<p>https://github.com/OpenIMSDK/Open-IM-Server/issues/432</p>
<p>现在很多地方都对服务的国产化适配有所要求，一般的国产化平台都提供arm版本的linux云环境供我们进行服务部署，因此需要构建arm版本的镜像。</p>
<h2 id="构建方案" tabindex="-1"><a class="header-anchor" href="#构建方案" aria-hidden="true">#</a> 构建方案</h2>
<p>在上面的 issue 中我们描述了大致的构建思路和解决的步骤，我们来看一下构建的方案，我们以最常用的 amd 机器为例，来编译 arm。对于构建镜像的ARM版本，有如下两种方式：</p>
<ol>
<li>在ARM机器上使用 docker build 进行构建；</li>
<li>在X86/AMD64 的机器上使用 docker buildx 进行交叉构建；</li>
</ol>
<blockquote>
<p><strong>⚠️注意：</strong></p>
<ol>
<li>交叉构建和交叉运行的方式会有一些无法预知的问题，建议简单的构建步骤（如只是下载解压对应架构的文件）可考虑在x86下交叉构建，复杂的（如需要编译的）则直接在arm机器上进行构建；</li>
<li>实际测试发现，使用<a href="https://github.com/multiarch/qemu-user-static" target="_blank" rel="noopener noreferrer">qemu方式<ExternalLinkIcon/></a>在x86平台下运行arm版本的镜像时，执行简单的命令可以成功（如arch），执行某些复杂的程序时（如启动java虚拟机），会无响应，所以镜像的验证工作应尽量放置到arm机器上进行；</li>
</ol>
<p><strong>上面第二点按如下方式测试：</strong></p>
<ul>
<li><code v-pre>docker run --rm --platform=linux/arm64 openjdk:8u212-jre-alpine arch</code> 可正常输出；</li>
<li><code v-pre>docker run --rm --platform=linux/arm64 openjdk:8u212-jre-alpine java -version</code> 则会 <strong>卡住</strong>，且需要使用<code v-pre>docker stop</code>停止容器才可以退出容器；</li>
</ul>
</blockquote>
<h2 id="启用试验性功能" tabindex="-1"><a class="header-anchor" href="#启用试验性功能" aria-hidden="true">#</a> 启用试验性功能</h2>
<blockquote>
<p>💡 注意：buildx 仅支持 docker19.03 及以上docker版本</p>
</blockquote>
<p>如需使用 buildx，需要开启docker的实验功能后，才可以使用，开启方式：</p>
<p>编辑 <code v-pre>/etc/docker/daemon.json</code> ，添加：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token punctuation">{</span>
    <span class="token string-property property">"experimental"</span><span class="token operator">:</span> <span class="token boolean">true</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑 <code v-pre>～/.docker/config.json</code> 添加：</p>
<div class="language-jsx ext-jsx line-numbers-mode"><pre v-pre class="language-jsx"><code><span class="token string-property property">"experimental"</span> <span class="token operator">:</span> <span class="token string">"enabled"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>重启Docker使生效：</p>
<ul>
<li><code v-pre>sudo systemctl daemon-reload</code></li>
<li><code v-pre>sudo systemctl restart docker</code></li>
</ul>
<p>确认是否开启：</p>
<ul>
<li><code v-pre>docker version -f'{{.Server.Experimental}}'</code></li>
<li>如果输出true，则表示开启成功</li>
</ul>
<p>在之前的版本中构建多种系统架构支持的 Docker 镜像，要想使用统一的名字必须使用 <code v-pre>[$ docker manifest](notion://www.notion.so/docker_practice/image/manifest)</code> 命令。</p>
<p>在 Docker 19.03+ 版本中可以使用 <code v-pre>$ docker buildx build</code> 命令使用 <code v-pre>BuildKit</code> 构建镜像。该命令支持 <code v-pre>--platform</code> 参数可以同时构建支持多种系统架构的 Docker 镜像，大大简化了构建步骤。</p>
<h2 id="使用buildx构建" tabindex="-1"><a class="header-anchor" href="#使用buildx构建" aria-hidden="true">#</a> 使用buildx构建</h2>
<p>buildx 的详细使用可参考：<a href="https://docs.docker.com/engine/reference/commandline/buildx/?fileGuid=0l3NVKX0BgflYN3R" target="_blank" rel="noopener noreferrer">Docker官方文档-Reference-buildx<ExternalLinkIcon/></a></p>
<h3 id="创建-buildx-构建器" tabindex="-1"><a class="header-anchor" href="#创建-buildx-构建器" aria-hidden="true">#</a> <strong>创建 buildx 构建器</strong></h3>
<p>使用 docker buildx ls 命令查看现有的构建器</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@rbqntnwlflfxvigv:~<span class="token comment"># docker buildx ls</span>
NAME/NODE DRIVER/ENDPOINT STATUS  BUILDKIT PLATFORMS
default * <span class="token function">docker</span>                           
  default default         running <span class="token number">20.10</span>.24 linux/amd64, linux/386
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建并构建器：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下面的创建命令任选一条符合情况的即可</span>
<span class="token comment"># 1. 不指定任何参数创建</span>
<span class="token function">docker</span> buildx create <span class="token parameter variable">--use</span> <span class="token parameter variable">--name</span> multiarch-builder
<span class="token comment"># 2. 如创建后使用docker buildx ls 发现构建起没有arm架构支持，可使用--platform明确指定要支持的构建类型，如以下命令</span>
<span class="token function">docker</span> buildx create <span class="token parameter variable">--platform</span> linux/arm64,linux/arm/v7,linux/arm/v6 <span class="token parameter variable">--name</span> multiarch-builder
<span class="token comment"># 3. 如需在buildx访问私有registry，可使用host模式，并手动指定配置文件，避免buildx时无法访问本地的registry主机</span>
<span class="token function">docker</span> buildx create <span class="token parameter variable">--platform</span> linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v6  --driver-opt <span class="token assign-left variable">network</span><span class="token operator">=</span>host <span class="token parameter variable">--config</span><span class="token operator">=</span>/Users/hanlyjiang/.docker/buildx-config.toml <span class="token parameter variable">--use</span> <span class="token parameter variable">--name</span> multiarch-builder
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>buildx-config.toml 配置文件写法类似：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># &lt;https://github.com/moby/buildkit/blob/master/docs/buildkitd.toml.md></span>
<span class="token comment"># registry configures a new Docker register used for cache import or output.</span>
<span class="token punctuation">[</span>registry.<span class="token string">"zh-registry.geostar.com.cn"</span><span class="token punctuation">]</span>
  mirrors <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"zh-registry.geostar.com.cn"</span><span class="token punctuation">]</span>
  http <span class="token operator">=</span> <span class="token boolean">true</span>
  insecure <span class="token operator">=</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>启用构建器</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 初始化并激活</span>
<span class="token function">docker</span> buildx inspect multiarch-builder <span class="token parameter variable">--bootstrap</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>确认成功</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 使用 docker buildx ls 查看</span>
<span class="token function">docker</span> buildx <span class="token function">ls</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Docker 在 Linux 系统架构下是不支持 arm 架构镜像，因此我们可以运行一个新的容器让其支持该特性，Docker 桌面版则无需进行此项设置（mac系统）。</p>
<ul>
<li>在内核中使用 QEMU 仿真支持来进行多架构镜像构建</li>
</ul>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 安装模拟器（用于多平台镜像构建）</span>
$ <span class="token function">docker</span> run <span class="token parameter variable">--rm</span> <span class="token parameter variable">--privileged</span> tonistiigi/binfmt:latest <span class="token parameter variable">--install</span> all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>由于 Docker 默认的 <code v-pre>builder</code> 实例不支持同时指定多个 <code v-pre>--platform</code>，我们必须首先创建一个新的 <code v-pre>builder</code> 实例。同时由于国内拉取镜像较缓慢，我们可以使用配置了 <a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fmoby%2Fbuildkit%2Fblob%2Fmaster%2Fdocs%2Fbuildkitd.toml.md" target="_blank" rel="noopener noreferrer">镜像加速地址<ExternalLinkIcon/></a> <code v-pre>[dockerpracticesig/buildkit:master](&lt;https://github.com/docker-practice/buildx&gt;)</code> 镜像替换官方镜像</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># 适用于国内环境
root@i-3uavns2y:~# docker buildx create --use --name=mybuilder-cn --driver docker-container --driver-opt image=dockerpracticesig/buildkit:master

# 适用于腾讯云环境(腾讯云主机、coding.net 持续集成)
root@i-3uavns2y:~# docker buildx create --use --name=mybuilder-cn --driver docker-container --driver-opt image=dockerpracticesig/buildkit:master-tencent
# 使用默认镜像
root@i-3uavns2y:~# docker buildx create --name mybuilder --driver docker-container

# 使用新创建好的 builder 实例
root@i-3uavns2y:~# docker buildx use mybuilder
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看已有的 builder 实例</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>root@i<span class="token operator">-</span>tpmja312<span class="token punctuation">:</span>~# docker buildx ls
NAME<span class="token operator">/</span>NODE    DRIVER<span class="token operator">/</span>ENDPOINT             STATUS   PLATFORMS
mybuilder <span class="token operator">*</span>  docker<span class="token operator">-</span>container
  mybuilder0 unix<span class="token punctuation">:</span><span class="token operator">/</span><span class="token comment">//var/run/docker.sock inactivedefault      docker</span>
  <span class="token keyword">default</span>    <span class="token keyword">default</span>                     running  linux<span class="token operator">/</span>amd64<span class="token punctuation">,</span> linux<span class="token operator">/</span><span class="token number">386</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>docker buildx build <span class="token punctuation">-</span><span class="token punctuation">-</span>platform linux/amd64<span class="token punctuation">,</span>linux/arm/v6<span class="token punctuation">,</span>linux/arm/v7<span class="token punctuation">,</span>linux/arm64/v8<span class="token punctuation">,</span>linux/386<span class="token punctuation">,</span>linux/ppc64le<span class="token punctuation">,</span>linux/s390x <span class="token punctuation">-</span>t kubecub/hello . <span class="token punctuation">-</span><span class="token punctuation">-</span>push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="修改dockerfile" tabindex="-1"><a class="header-anchor" href="#修改dockerfile" aria-hidden="true">#</a> <strong>修改Dockerfile</strong></h3>
<p>对 Dockerfile 的修改，大致需要进行如下操作：</p>
<ol>
<li>确认基础镜像（FROM）是否有arm版本，如果有，则可以不用改动，如果没有，则需要寻找替代镜像，如没有替代镜像，则可能需要自行编译；</li>
<li>确认dockerfile的各个步骤中是否有依赖CPU架构的，如果有，则需要替换成arm架构的，如在构建jitis的镜像时，Dockerfile中有添加一个amd64架构的软件</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADD &lt;https://github.com/just-containers/s6-overlay/releases/download/v1.21.4.0/s6-overlay-amd64.tar.gz> /tmp/s6-overlay.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时需要替换为下面的地址(注意amd64替换成了aarch64，当然，需要先确认下载地址中有无对应架构的gz包，不能简单做字符替换)：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>ADD &lt;https://github.com/just-containers/s6-overlay/releases/download/v1.21.4.0/s6-overlay-aarch64.tar.gz> /tmp/s6-overlay.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当然，我们需要确认该软件有此架构的归档包，如果没有，则需要考虑从源码构建；</p>
<blockquote>
<p>提示：</p>
<p>怎么确定一个可执行文件 <code v-pre>/so</code> 库的对应的执行架构？ 可以通过 <code v-pre>file {可执行文件路径}</code> 来查看，</p>
<p>如下面时macOS上执行file命令的输入，可以发现macOS上的git程序可以兼容两种架构-<code v-pre>x86_64&amp;arm64e</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>file $(which git)
/usr/bin/git: Mach-O universal binary with 2 architectures: [x86_64:Mach-O 64-bit executable x86_64] [arm64e:Mach-O 64-bit executable arm64e]
/usr/bin/git (for architecture x86_64):	Mach-O 64-bit executable x86_64
/usr/bin/git (for architecture arm64e):	Mach-O 64-bit executable arm64e
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下面的命令则对一个so文件执行了file，可以看到其中的架构信息 <code v-pre>ARM aarch64</code>：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>file /lib/aarch64-linux-gnu/libpthread-2.23.so
/lib/aarch64-linux-gnu/libpthread-2.23.so: ELF 64-bit LSB shared object, ARM aarch64, version 1 (GNU/Linux), dynamically linked, interpreter /lib/ld-linux-aarch64.so.1, BuildID[sha1]=880365ebb22114e4c10108b73243144d5fa315dc, for GNU/Linux 3.7.0, not stripped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h3 id="docker-buildx-构建arm64镜像的命令" tabindex="-1"><a class="header-anchor" href="#docker-buildx-构建arm64镜像的命令" aria-hidden="true">#</a> docker buildx 构建arm64镜像的命令</h3>
<p>使用 --platform来指定架构，使用 <code v-pre>--push</code> 或 <code v-pre>--load</code> 来指定构建完毕后的动作。</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker buildx build --platform=linux/arm64,linux/amd64 -t xxxx:tag . --push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>提示：当指定多个架构时，只能使用 --push 推送到远程仓库，无法 <code v-pre>--load</code>，推送成功后再通过 <code v-pre>docker pull --platform</code> 来拉取指定架构的镜像</p>
</blockquote>
<h3 id="检查构建成果" tabindex="-1"><a class="header-anchor" href="#检查构建成果" aria-hidden="true">#</a> <strong>检查构建成果</strong></h3>
<ol>
<li>通过 <code v-pre>docker buildx imagetools inspect</code> 命令查看镜像信息，看是否有对应的arm架构信息；</li>
<li>实际运行镜像，确认运行正常；（在arm机器上执行）</li>
</ol>
<blockquote>
<p>提示：如运行时输出 <code v-pre>exec format error</code> 类似错误，则表示镜像中部分可执行文件架构不匹配。</p>
</blockquote>
<h2 id="在x86上运行arm镜像" tabindex="-1"><a class="header-anchor" href="#在x86上运行arm镜像" aria-hidden="true">#</a> <strong>在x86上运行arm镜像</strong></h2>
<p>可参考 <a href="https://github.com/multiarch/qemu-user-static" target="_blank" rel="noopener noreferrer">github/qemu-user-static<ExternalLinkIcon/></a> ,简要描述如下：</p>
<ul>
<li>
<p>执行如下命令安装：</p>
<p><code v-pre>docker run --rm --privileged multiarch/qemu-user-static --reset -p yes</code></p>
</li>
<li>
<p>之后即可运行arm版本的镜像，如：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run --rm -t arm64v8/fedora uname -m
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h2 id="在x86平台下使用buildx构建跨平台镜像并运行arm应用" tabindex="-1"><a class="header-anchor" href="#在x86平台下使用buildx构建跨平台镜像并运行arm应用" aria-hidden="true">#</a> <strong>在x86平台下使用Buildx构建跨平台镜像并运行arm应用</strong></h2>
<p>我们演示了一下简单的构建方法，</p>
<h3 id="安装-qemu-多平台支持" tabindex="-1"><a class="header-anchor" href="#安装-qemu-多平台支持" aria-hidden="true">#</a> 安装 qemu 多平台支持</h3>
<p>运行以下容器：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该容器会为你的设备安装 qemu 多平台支持，如果你需要运行跨平台容器，也会用到它。</p>
<h3 id="创建新的-builder-实例并设为默认" tabindex="-1"><a class="header-anchor" href="#创建新的-builder-实例并设为默认" aria-hidden="true">#</a> <strong>创建新的 builder 实例并设为默认</strong></h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker buildx create --use --name mybuilder
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>看到输出 <code v-pre>mybuilder</code> 即表示创建成功，使用 <code v-pre>--use</code> 指令将在 builder 实例创建完成时自动将其设为默认，否则需要手动使用 <code v-pre>docker buildx use mybuilder</code> 将创建的实例设为默认。</p>
<h3 id="使用-buildx-构建多平台镜像" tabindex="-1"><a class="header-anchor" href="#使用-buildx-构建多平台镜像" aria-hidden="true">#</a> <strong>使用 Buildx 构建多平台镜像</strong></h3>
<p>Buildx 的使用与 docker build 十分相似，基本上只需要将命令中的 <code v-pre>docker build</code> 替换成 <code v-pre>docker buildx build</code> 即可。如果使用 <code v-pre>docker buildx install</code> 将默认的 docker build 替换为 Buildx，那么直接使用 <code v-pre>docker build</code> 即可。</p>
<p>例如，将当前目录下的 Dockerfile 文件打包成镜像，需要使用以下命令：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker buildx build -t xxx/xxx:tag . --push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>如果替换了默认 docker build，将是这样的：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker build -t xxx/xxx:tag . --push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><code v-pre>-push</code> 指令会自动把构建好的镜像推送到远端仓库，否则只会在存放在 cache 中。</p>
<p>如果要构建多平台镜像，在指令中加入 <code v-pre>--platform=</code> 即可，等号后填写需要构建的平台，如 <code v-pre>linux/arm</code>，<code v-pre>linux/arm64</code>，<code v-pre>linux/amd64</code> 等，用 <code v-pre>,</code> 隔开。Dockerfile 本身并不需要做出更改，除非你需要做的操作在不同平台下有所区别，比如根据平台下载不同文件等。</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code>docker buildx build --platform=linux/arm,linux/arm64,linux/amd64 -t xxx/xxx:tag . --push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Buildx 将根据以上指令自动构建三个平台的镜像并推送到远端，这三个镜像会使用命令中指定的同一个 tag。</p>
<p>需要注意的是，指定的平台必须是底层镜像所支持的。</p>
<p>本地支持七种构建：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>docker buildx build <span class="token punctuation">-</span><span class="token punctuation">-</span>platform linux/amd64<span class="token punctuation">,</span>linux/arm/v6<span class="token punctuation">,</span>linux/arm/v7<span class="token punctuation">,</span>linux/arm64/v8<span class="token punctuation">,</span>linux/386<span class="token punctuation">,</span>linux/ppc64le<span class="token punctuation">,</span>linux/s390x <span class="token punctuation">-</span>t doubledong/hello . <span class="token punctuation">-</span><span class="token punctuation">-</span>push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>在 <a href="https://docs.docker.com/buildx/working-with-buildx/" target="_blank" rel="noopener noreferrer">Docker Documents<ExternalLinkIcon/></a> 查看更多详细的说明。</p>
<h2 id="使用-github-action-自动构建多平台镜像" tabindex="-1"><a class="header-anchor" href="#使用-github-action-自动构建多平台镜像" aria-hidden="true">#</a> 使用 GitHub Action 自动构建多平台镜像</h2>
<p>由于 DockerHub 的自动构建工具对多平台支持并不友好，推荐使用 GitHub Action 来构建。具体的 yaml  文件如下：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> docker build and push

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">release</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main <span class="token punctuation">]</span>
    <span class="token key atrule">types</span><span class="token punctuation">:</span> released
    <span class="token comment"># 将在main分支的release发布时自动运行该流程</span>
  <span class="token key atrule">workflow_dispatch</span><span class="token punctuation">:</span>
    <span class="token comment"># 将在GitHub Action界面创建一个run workflow按钮，点击后执行该流程</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Get the tag name
        <span class="token key atrule">run</span><span class="token punctuation">:</span> echo "TAG=$<span class="token punctuation">{</span>GITHUB_REF/refs\\/tags\\//<span class="token punctuation">}</span>" <span class="token punctuation">></span><span class="token punctuation">></span> $GITHUB_ENV
        <span class="token comment"># 获取release tag，在创建镜像时会用到</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup QEMU
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/setup<span class="token punctuation">-</span>qemu<span class="token punctuation">-</span>action@v1

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Docker Setup Buildx
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/setup<span class="token punctuation">-</span>buildx<span class="token punctuation">-</span>action@v1.3.0
        <span class="token comment"># 启用Buildx</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Login
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/login<span class="token punctuation">-</span>action@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.DOCKERHUB_USERNAME <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.DOCKERHUB_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
            <span class="token comment"># 登陆DockerHub账号，供推送镜像使用，这里的secrets需要在仓库设置页面添加</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build and Push with Version Tag
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> docker/build<span class="token punctuation">-</span>push<span class="token punctuation">-</span>action@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">context</span><span class="token punctuation">:</span> .
          <span class="token key atrule">platforms</span><span class="token punctuation">:</span> linux/amd64<span class="token punctuation">,</span>linux/arm64<span class="token punctuation">,</span>linux/arm
          <span class="token key atrule">push</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
          <span class="token key atrule">tags</span><span class="token punctuation">:</span> xxx/abc<span class="token punctuation">:</span>$<span class="token punctuation">{</span><span class="token punctuation">{</span> env.TAG <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token comment"># 使用仓库根目录中的Dockerfile构建三个平台的镜像，并推送到xxx/abc仓库，使用之前获取的tag</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="跨平台运行容器的策略" tabindex="-1"><a class="header-anchor" href="#跨平台运行容器的策略" aria-hidden="true">#</a> 跨平台运行容器的策略</h3>
<p>我们知道了如何跨平台编译，那么拉取镜像的策略是什么样的呢？</p>
<p>一般来说。默认使用 docker pull 指令只会拉取和当前平台一致的镜像，要拉取其他平台的镜像，使用–platform 指定对应的平台。</p>
<p>同样，在使用 docker run 运行容器时也需要使用–platform 指定平台。</p>
<p>如果使用 docker-compose 来管理容器，需要在 image 的同级添加类似 <code v-pre>platform: linux/arm</code> 的指令来指定平台。如果本地已有相同 tag 的其他平台镜像，需要使用 <code v-pre>docker-compose pull</code> 来拉取需要平台的镜像</p>
<h3 id="案例演示" tabindex="-1"><a class="header-anchor" href="#案例演示" aria-hidden="true">#</a> 案例演示</h3>
<p>假设有一个简单的 golang 程序源码：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>❯ cat hello.go
/<span class="token important">*************************************************************************</span>
   <span class="token punctuation">></span> File Name<span class="token punctuation">:</span> hello.go
   <span class="token punctuation">></span> Author<span class="token punctuation">:</span> smile
   <span class="token punctuation">></span> Mail<span class="token punctuation">:</span> 3293172751nss@gmail.com
   <span class="token punctuation">></span> Created Time<span class="token punctuation">:</span> Sun Jun 11 12<span class="token punctuation">:</span>37<span class="token punctuation">:</span>18 2023
<span class="token important">************************************************************************/</span>
package main

import (
        "fmt"
        "runtime"
)

func main() <span class="token punctuation">{</span>
        fmt.Printf("Hello<span class="token punctuation">,</span> %s<span class="token tag">!</span>\\n"<span class="token punctuation">,</span> runtime.GOARCH)
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>创建一个 Dockerfile 将该应用容器化：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>❯ cat Dockerfile
FROM golang<span class="token punctuation">:</span>alpine AS builder
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN go build <span class="token punctuation">-</span>o hello .

FROM alpine
RUN mkdir /app
WORKDIR /app
COPY <span class="token punctuation">-</span><span class="token punctuation">-</span>from=builder /app/hello .
CMD <span class="token punctuation">[</span><span class="token string">"./hello"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这是一个多阶段构建 Dockerfile，使用 Go 编译器来构建应用，并将构建好的二进制文件拷贝到 alpine 镜像中。</p>
<p>现在就可以使用 buildx 构建一个支持 arm、arm64 和 amd64 多架构的 Docker 镜像了，同时将其推送到 <strong>Docker Hub</strong>：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>→ docker buildx build <span class="token punctuation">-</span>t cubxxw/hello<span class="token punctuation">-</span>arch <span class="token punctuation">-</span><span class="token punctuation">-</span>platform=linux/arm<span class="token punctuation">,</span>linux/arm64<span class="token punctuation">,</span>linux/amd64 . <span class="token punctuation">-</span><span class="token punctuation">-</span>push
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>需要提前通过 docker login 命令登录认证 Docker Hub。</p>
</blockquote>
<p>现在就可以通过 <code v-pre>docker pull mirailabs/hello-arch</code> 拉取刚刚创建的镜像了，Docker 将会根据你的 CPU 架构拉取匹配的镜像。</p>
<p>背后的原理也很简单，之前已经提到过了，buildx 会通过 <code v-pre>QEMU</code> 和 <code v-pre>binfmt_misc</code> 分别为 3 个不同的 CPU 架构（arm，arm64 和 amd64）构建 3 个不同的镜像。构建完成后，就会创建一个 <strong>manifest</strong> ，其中包含了指向这 3 个镜像的指针。</p>
<p>现在就可以通过 <code v-pre>docker pull mirailabs/hello-arch</code> 拉取刚刚创建的镜像了，Docker 将会根据你的 CPU 架构拉取匹配的镜像。</p>
<p>背后的原理也很简单，之前已经提到过了，buildx 会通过 <code v-pre>QEMU</code> 和 <code v-pre>binfmt_misc</code> 分别为 3 个不同的 CPU 架构（arm，arm64 和 amd64）构建 3 个不同的镜像。构建完成后，就会创建一个 <strong>manifest list</strong>，其中包含了指向这 3 个镜像的指针。</p>
<p><strong>保存在本地：</strong></p>
<p>如果想将构建好的镜像保存在本地，可以将 <code v-pre>type</code> 指定为 <code v-pre>docker</code>，但必须分别为不同的 CPU 架构构建不同的镜像，不能合并成一个镜像，即：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>→ docker buildx build <span class="token punctuation">-</span>t cubxxw/hello<span class="token punctuation">-</span>arch <span class="token punctuation">-</span><span class="token punctuation">-</span>platform=linux/arm <span class="token punctuation">-</span>o type=docker .
→ docker buildx build <span class="token punctuation">-</span>t cubxxw/hello<span class="token punctuation">-</span>arch <span class="token punctuation">-</span><span class="token punctuation">-</span>platform=linux/arm64 <span class="token punctuation">-</span>o type=docker .
→ docker buildx build <span class="token punctuation">-</span>t cubxxw/hello<span class="token punctuation">-</span>arch <span class="token punctuation">-</span><span class="token punctuation">-</span>platform=linux/amd64 <span class="token punctuation">-</span>o type=docker .
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试多平台镜像" tabindex="-1"><a class="header-anchor" href="#测试多平台镜像" aria-hidden="true">#</a> <strong>测试多平台镜像</strong></h3>
<p>由于之前已经启用了 <code v-pre>binfmt_misc</code>，现在我们就可以运行任何 CPU 架构的 Docker 镜像了，因此可以在本地系统上测试之前生成的 3 个镜像是否有问题。</p>
<p>首先列出每个镜像的 <code v-pre>digests</code>：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">?</span> → docker buildx imagetools inspect cubxxw/hello<span class="token punctuation">-</span>arch

<span class="token key atrule">Name</span><span class="token punctuation">:</span>      docker.io/cubxxw/hello<span class="token punctuation">-</span>arch<span class="token punctuation">:</span>latest
<span class="token key atrule">MediaType</span><span class="token punctuation">:</span> application/vnd.docker.distribution.manifest.list.v2+json
<span class="token key atrule">Digest</span><span class="token punctuation">:</span>    sha256<span class="token punctuation">:</span>ec55f5ece9a12db0c6c367acda8fd1214f50ee502902f97b72f7bff268ebc35a

<span class="token key atrule">Manifests</span><span class="token punctuation">:</span>
  <span class="token key atrule">Name</span><span class="token punctuation">:</span>      docker.io/cubxxw/hello<span class="token punctuation">-</span>arch<span class="token punctuation">:</span>latest@sha256<span class="token punctuation">:</span>38e083870044cfde7f23a2eec91e307ec645282e76fd0356a29b32122b11c639
  <span class="token key atrule">MediaType</span><span class="token punctuation">:</span> application/vnd.docker.distribution.manifest.v2+json
  <span class="token key atrule">Platform</span><span class="token punctuation">:</span>  linux/arm/v7

  <span class="token key atrule">Name</span><span class="token punctuation">:</span>      docker.io/cubxxw/hello<span class="token punctuation">-</span>arch<span class="token punctuation">:</span>latest@sha256<span class="token punctuation">:</span>de273a2a3ce92a5dc1e6f2d796bb85a81fe1a61f82c4caaf08efed9cf05af66d
  <span class="token key atrule">MediaType</span><span class="token punctuation">:</span> application/vnd.docker.distribution.manifest.v2+json
  <span class="token key atrule">Platform</span><span class="token punctuation">:</span>  linux/arm64

  <span class="token key atrule">Name</span><span class="token punctuation">:</span>      docker.io/cubxxw/hello<span class="token punctuation">-</span>arch<span class="token punctuation">:</span>latest@sha256<span class="token punctuation">:</span>8b735708d7d30e9cd6eb993449b1047b7229e53fbcebe940217cb36194e9e3a2
  <span class="token key atrule">MediaType</span><span class="token punctuation">:</span> application/vnd.docker.distribution.manifest.v2+json
  <span class="token key atrule">Platform</span><span class="token punctuation">:</span>  linux/amd64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行每一个镜像并观察输出结果：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">?</span> → docker run <span class="token punctuation">-</span><span class="token punctuation">-</span>rm docker.io/cubxxw/hello<span class="token punctuation">-</span>arch<span class="token punctuation">:</span>latest@sha256<span class="token punctuation">:</span>38e083870044cfde7f23a2eec91e307ec645282e76fd0356a29b32122b11c639
Hello<span class="token punctuation">,</span> arm<span class="token tag">!</span>

<span class="token punctuation">?</span> → docker run <span class="token punctuation">-</span><span class="token punctuation">-</span>rm docker.io/cubxxw/hello<span class="token punctuation">-</span>arch<span class="token punctuation">:</span>latest@sha256<span class="token punctuation">:</span>de273a2a3ce92a5dc1e6f2d796bb85a81fe1a61f82c4caaf08efed9cf05af66d
Hello<span class="token punctuation">,</span> arm64<span class="token tag">!</span>

<span class="token punctuation">?</span> → docker run <span class="token punctuation">-</span><span class="token punctuation">-</span>rm docker.io/cubxxw/hello<span class="token punctuation">-</span>arch<span class="token punctuation">:</span>latest@sha256<span class="token punctuation">:</span>8b735708d7d30e9cd6eb993449b1047b7229e53fbcebe940217cb36194e9e3a2
Hello<span class="token punctuation">,</span> amd64<span class="token tag">!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="buildx-的跨平台构建策略" tabindex="-1"><a class="header-anchor" href="#buildx-的跨平台构建策略" aria-hidden="true">#</a> <strong><a href="https://waynerv.com/posts/building-multi-architecture-images-with-docker-buildx/#contents:buildx-%E7%9A%84%E8%B7%A8%E5%B9%B3%E5%8F%B0%E6%9E%84%E5%BB%BA%E7%AD%96%E7%95%A5" target="_blank" rel="noopener noreferrer">buildx 的跨平台构建策略<ExternalLinkIcon/></a></strong></h2>
<p>根据构建节点和目标程序语言不同，<code v-pre>buildx</code> 支持以下三种跨平台构建策略：</p>
<ol>
<li>通过 QEMU 的用户态模式创建轻量级的虚拟机，在虚拟机系统中构建镜像。</li>
<li>在一个 builder 实例中加入多个不同目标平台的节点，通过原生节点构建对应平台镜像。</li>
<li>分阶段构建并且交叉编译到不同的目标架构。</li>
</ol>
<p>QEMU 通常用于模拟完整的操作系统，它还可以通过用户态模式运行：以 <code v-pre>binfmt_misc</code> 在宿主机系统中注册一个二进制转换处理程序，并在程序运行时动态翻译二进制文件，根据需要将系统调用从目标 CPU 架构转换为当前系统的 CPU 架构。最终的效果就像在一个虚拟机中运行目标 CPU 架构的二进制文件。Docker Desktop 内置了 QEMU 支持，其他满足运行要求的平台可通过以下方式安装：</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code>docker run <span class="token punctuation">-</span><span class="token punctuation">-</span>privileged <span class="token punctuation">-</span><span class="token punctuation">-</span>rm tonistiigi/binfmt <span class="token punctuation">-</span><span class="token punctuation">-</span>install all
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="openim-跨平台编译实战" tabindex="-1"><a class="header-anchor" href="#openim-跨平台编译实战" aria-hidden="true">#</a> OpenIM 跨平台编译实战</h2>
<p>我们需要制作 OpenIM 离线部署的方案，首先来说，我们需要熟悉 OpenIM 部署需要哪些组件，查看</p>
<table>
<thead>
<tr>
<th>Service Name</th>
<th>Image</th>
<th>Supported Architectures</th>
<th>Ports</th>
</tr>
</thead>
<tbody>
<tr>
<td>mysql</td>
<td>mysql:5.7</td>
<td>amd64, arm64v8, arm32v7</td>
<td>13306:3306, 23306:33060</td>
</tr>
<tr>
<td>mongodb</td>
<td>mongo:4.0</td>
<td>amd64, arm64v8, arm32v7</td>
<td>37017:27017</td>
</tr>
<tr>
<td>redis</td>
<td>redis</td>
<td>amd64, arm64v8, arm32v7</td>
<td>16379:6379</td>
</tr>
<tr>
<td>zookeeper</td>
<td>wurstmeister/zookeeper</td>
<td>amd64</td>
<td>2181:2181</td>
</tr>
<tr>
<td>kafka</td>
<td>wurstmeister/kafka</td>
<td>amd64, arm</td>
<td>9092:9092</td>
</tr>
<tr>
<td>etcd</td>
<td>http://quay.io/coreos/etcd</td>
<td>amd64, arm64v8</td>
<td>2379:2379, 2380:2380</td>
</tr>
<tr>
<td>minio</td>
<td>minio/minio</td>
<td>amd64, arm64v8, arm32v7</td>
<td>10005:9000, 9090:9090</td>
</tr>
<tr>
<td>open_im_server</td>
<td>openim/open_im_server:v2.3.9</td>
<td>amd64</td>
<td>N/A</td>
</tr>
<tr>
<td>open_im_enterprise</td>
<td>openim/open_im_enterprise:v1.0.3</td>
<td>amd64</td>
<td>N/A</td>
</tr>
<tr>
<td>prometheus</td>
<td>prom/prometheus</td>
<td>amd64, arm64v8, arm32v7</td>
<td>N/A</td>
</tr>
<tr>
<td>grafana</td>
<td>grafana/grafana</td>
<td>amd64, arm64v8, arm32v7</td>
<td>N/A</td>
</tr>
<tr>
<td>node-exporter</td>
<td>http://quay.io/prometheus/node-exporter</td>
<td>amd64, arm64v8, arm32v7</td>
<td>9100:9100</td>
</tr>
</tbody>
</table>
<p>注意看， zookeeper 和 openim 并没有提供 arm 架构的设计方案。</p>
<p>所以我们需要自己去编译 arm 架构的镜像，这一层设计比较复杂。为了形成构建的自动化，我们将使用 CICD 和 Makefile 集成。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '79.md' style='float:left'>⬆️上一节🔗  </a><a href = '81.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


