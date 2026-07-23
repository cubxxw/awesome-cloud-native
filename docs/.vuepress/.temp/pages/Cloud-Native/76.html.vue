<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第76节-openim-arm-架构设计" tabindex="-1"><a class="header-anchor" href="#第76节-openim-arm-架构设计" aria-hidden="true">#</a> 第76节 OpenIM arm 架构设计</h1>
<div><a href = '75.md' style='float:left'>⬆️上一节🔗  </a><a href = '77.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<p>我们知道使用镜像创建一个容器，该镜像必须与 Docker 宿主机系统架构一致，例如 <code v-pre>Linux x86_64</code> 架构的系统中只能使用 <code v-pre>Linux x86_64</code> 的镜像创建容器。</p>
<blockquote>
<p>Windows、macOS 除外，其使用了 <a href="https://docs.docker.com/docker-for-mac/multi-arch/" target="_blank" rel="noopener noreferrer">binfmt_misc<ExternalLinkIcon/></a> 提供了多种架构支持，在 Windows、macOS 系统上 (x86_64) 可以运行 arm 等其他架构的镜像。</p>
</blockquote>
<p>例如我们在 <code v-pre>Linux x86_64</code> 中构建一个 <code v-pre>username/test</code> 镜像。</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>FROM alpine

CMD echo <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>构建镜像后推送到 Docker Hub，之后我们尝试在树莓派 <code v-pre>Linux arm64v8</code> 中使用这个镜像。</p>
<p>可以发现这个镜像根本获取不到。</p>
<p>要解决这个问题，通常采用的做法是通过镜像名区分不同系统架构的镜像，例如在 <code v-pre>Linux x86_64</code> 和 <code v-pre>Linux arm64v8</code> 分别构建 <code v-pre>username/test</code> 和 <code v-pre>username/arm64v8-test</code> 镜像。运行时使用对应架构的镜像即可。</p>
<p>这样做显得很繁琐，那么有没有一种方法让 Docker 引擎根据系统架构自动拉取对应的镜像呢？</p>
<p>我们发现在 <code v-pre>Linux x86_64</code> 和 <code v-pre>Linux arm64v8</code> 架构的计算机中分别使用 <code v-pre>golang:alpine</code> 镜像运行容器 <code v-pre>$ docker run golang:alpine go version</code> 时，容器能够正常的运行。</p>
<p>这样做显得很繁琐，那么有没有一种方法让 Docker 引擎根据系统架构自动拉取对应的镜像呢？</p>
<p>我们发现在 <code v-pre>Linux x86_64</code> 和 <code v-pre>Linux arm64v8</code> 架构的计算机中分别使用 <code v-pre>golang:alpine</code> 镜像运行容器 <code v-pre>$ docker run golang:alpine go version</code> 时，容器能够正常的运行。</p>
<blockquote>
<p>这是什么原因呢？</p>
</blockquote>
<p>原因就是 <code v-pre>golang:alpine</code> 官方镜像有一个 <a href="https://docs.docker.com/registry/spec/manifest-v2-2/" target="_blank" rel="noopener noreferrer"><code v-pre>manifest</code> 列表 (<code v-pre>manifest list</code>)<ExternalLinkIcon/></a>。</p>
<p>当用户获取一个镜像时，Docker 引擎会首先查找该镜像是否有 <code v-pre>manifest</code> 列表，如果有的话 Docker 引擎会按照 Docker 运行环境（系统及架构）查找出对应镜像（例如 <code v-pre>golang:alpine</code>）。如果没有的话会直接获取镜像（例如上例中我们构建的 <code v-pre>username/test</code>）。</p>
<p>我们可以使用 <code v-pre>$ docker manifest inspect golang:alpine</code> 查看这个 <code v-pre>manifest</code> 列表的结构。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ <span class="token function">docker</span> manifest inspect golang:alpine
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>{
   "schemaVersion": 2,
   "mediaType": "application/vnd.docker.distribution.manifest.list.v2+json",
   "manifests": [
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:5e28ac423243b187f464d635bcfe1e909f4a31c6c8bce51d0db0a1062bec9e16",
         "platform": {
            "architecture": "amd64",
            "os": "linux"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:2945c46e26c9787da884b4065d1de64cf93a3b81ead1b949843dda1fcd458bae",
         "platform": {
            "architecture": "arm",
            "os": "linux",
            "variant": "v7"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:87fff60114fd3402d0c1a7ddf1eea1ded658f171749b57dc782fd33ee2d47b2d",
         "platform": {
            "architecture": "arm64",
            "os": "linux",
            "variant": "v8"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:607b43f1d91144f82a9433764e85eb3ccf83f73569552a49bc9788c31b4338de",
         "platform": {
            "architecture": "386",
            "os": "linux"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:25ead0e21ed5e246ce31e274b98c09aaf548606788ef28eaf375dc8525064314",
         "platform": {
            "architecture": "ppc64le",
            "os": "linux"
         }
      },
      {
         "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
         "size": 1365,
         "digest": "sha256:69f5907fa93ea591175b2c688673775378ed861eeb687776669a48692bb9754d",
         "platform": {
            "architecture": "s390x",
            "os": "linux"
         }
      }
   ]
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出 <code v-pre>manifest</code> 列表中包含了不同系统架构所对应的镜像 <code v-pre>digest</code> 值，这样 Docker 就可以在不同的架构中使用相同的 <code v-pre>manifest</code> (例如 <code v-pre>golang:alpine</code>) 获取对应的镜像。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '75.md' style='float:left'>⬆️上一节🔗  </a><a href = '77.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


