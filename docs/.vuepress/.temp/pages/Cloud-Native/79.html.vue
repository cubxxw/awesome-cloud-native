<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第79节-coscli-学习" tabindex="-1"><a class="header-anchor" href="#第79节-coscli-学习" aria-hidden="true">#</a> 第79节 coscli 学习</h1>
<div><a href = '78.md' style='float:left'>⬆️上一节🔗  </a><a href = '80.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕记录<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">sealos<ExternalLinkIcon/></a>开源项目的学习过程。<a href="https://github.com/cubxxw/sealos" target="_blank" rel="noopener noreferrer">k8s,docker和云原生的学习<ExternalLinkIcon/></a>。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[toc]</p>
<h2 id="为什么需要它" tabindex="-1"><a class="header-anchor" href="#为什么需要它" aria-hidden="true">#</a> 为什么需要它</h2>
<p>我们有业务需要用到 cos，但是作为程序员，更多时候我们希望有一个优质的管理工具来帮助我们管理 cos，此时我们就用到了 coscli。</p>
<p>COSCLI 是腾讯云对象存储（Cloud Object Storage，COS）提供的客户端命令行工具。通过 COSCLI 工具，您可以通过简单的命令行指令对您 COS 中的对象（Object）实现批量上传、下载、删除等操作。</p>
<p>COSCLI 使用 Go 编写，基于 Cobra 框架，支持配置多个存储桶和跨桶操作。您可以通过 <code v-pre>./coscli [command] --help</code> 来查看 COSCLI 的使用方法。</p>
<p>在介绍 COSCLI 工具之前，我们先介绍 coscmd 工具。</p>
<blockquote>
<p><strong>参考网站：</strong></p>
<ul>
<li>https://github.com/tencentyun/coscli （基于 go 语言）</li>
<li>https://github.com/tencentyun/coscmd  （基于 Python）</li>
</ul>
</blockquote>
<p><strong>COS 和 CMD 之间是什么关系？</strong></p>
<p>coscmd 和 coscli 都是腾讯云对象存储（COS）的命令行工具，用于管理 COS 中的对象（文件）。它们的区别在于：</p>
<ul>
<li>coscmd 是 Python 语言实现的 COS 命令行工具，支持 Windows、Linux 和 macOS 等多个操作系统，提供了丰富的命令和选项，使用起来比较灵活。</li>
<li>coscli 是 Go 语言实现的 COS 命令行工具，支持 Windows、Linux 和 macOS 等多个操作系统，提供了基本的 COS 操作命令，使用起来比较简单。</li>
</ul>
<p>一般来说，如果你需要更多的 COS 操作命令和选项，或者需要在 Python 环境下使用 COS 命令行工具，可以选择使用 coscmd；如果你只需要基本的 COS 操作命令，或者更喜欢在 Go 环境下使用 COS 命令行工具，可以选择使用 coscli。</p>
<h2 id="coscmd" tabindex="-1"><a class="header-anchor" href="#coscmd" aria-hidden="true">#</a> coscmd</h2>
<p>使用 COSCMD 工具，用户可通过简单的命令行指令实现对对象（Object）的批量上传、下载、删除等操作。</p>
<p>腾讯云COS命令行工具, 目前可以支持 Python2.6 与 Python2.7 以及 Python3.x。</p>
<h3 id="在-docker-上使用" tabindex="-1"><a class="header-anchor" href="#在-docker-上使用" aria-hidden="true">#</a> 在 docker 上使用</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>docker run <span class="token operator">--</span>rm <span class="token operator">-</span>it tencentcom<span class="token operator">/</span>tencentyun<span class="token operator">-</span>coscmd <span class="token operator">--</span>version
docker run <span class="token operator">--</span>rm <span class="token operator">-</span>it tencentcom<span class="token operator">/</span>tencentyun<span class="token operator">-</span>coscmd <span class="token operator">-</span>h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="在-coding-ci-上使用" tabindex="-1"><a class="header-anchor" href="#在-coding-ci-上使用" aria-hidden="true">#</a> 在 Coding-CI 上使用</h3>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">master</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">stages</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> run with tencentyun<span class="token punctuation">-</span>coscmd
      <span class="token key atrule">image</span><span class="token punctuation">:</span> tencentcom/tencentyun<span class="token punctuation">-</span>coscmd
      <span class="token key atrule">commands</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
        coscmd --version
        coscmd -h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="命令行安装指南" tabindex="-1"><a class="header-anchor" href="#命令行安装指南" aria-hidden="true">#</a> 命令行安装指南</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>pip <span class="token function">install</span> <span class="token parameter variable">-U</span> coscmd

<span class="token comment">## 或者手动安装</span>
python setup.py <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="coscli" tabindex="-1"><a class="header-anchor" href="#coscli" aria-hidden="true">#</a> CosCli</h2>
<h3 id="config-命令" tabindex="-1"><a class="header-anchor" href="#config-命令" aria-hidden="true">#</a> config 命令</h3>
<p>以下 config 命令用于生成与修改配置文件：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./coscli config [command] [flag]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p><strong>说明：</strong></p>
<ul>
<li>正确填写各配置项后，您可以使用<code v-pre>./coscli config show</code>来查看配置信息。</li>
<li>关于此命令的其他通用选项（例如切换存储桶、切换用户账号等），请参见 <a href="https://cloud.tencent.com/document/product/436/71763" target="_blank" rel="noopener noreferrer">通用选项<ExternalLinkIcon/></a> 文档。</li>
<li>生成的配置文件，默认网络传输协议为 https。如需更改为 http，可直接进入配置文件进行修改即可。</li>
</ul>
</blockquote>
<p><strong>config 命令包含以下子命令：</strong></p>
<table>
<thead>
<tr>
<th style="text-align:left">command 名称</th>
<th style="text-align:left">command 用途</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">add</td>
<td style="text-align:left">添加一个新的存储桶配置。</td>
</tr>
<tr>
<td style="text-align:left">delete</td>
<td style="text-align:left">删除一个已经存在的存储桶配置。</td>
</tr>
<tr>
<td style="text-align:left">init</td>
<td style="text-align:left">交互式地生成配置文件。</td>
</tr>
<tr>
<td style="text-align:left">set</td>
<td style="text-align:left">修改配置文件 base 组中的一个或多个配置项。base 组包含 <code v-pre>secretid</code>、<code v-pre>secretkey</code>、<code v-pre>sessiontoken</code> 信息。</td>
</tr>
<tr>
<td style="text-align:left">show</td>
<td style="text-align:left">打印指定配置文件中的信息。</td>
</tr>
</tbody>
</table>
<p><strong>config 及其子命令包含以下可选 flag：</strong></p>
<table>
<thead>
<tr>
<th style="text-align:left">flag 简写</th>
<th style="text-align:left">flag 全称</th>
<th style="text-align:left">flag 用途</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">-h</td>
<td style="text-align:left">--help</td>
<td style="text-align:left">查看该命令的具体用法</td>
</tr>
<tr>
<td style="text-align:left">-c</td>
<td style="text-align:left">--config-path</td>
<td style="text-align:left">指定要使用的配置文件路径。</td>
</tr>
</tbody>
</table>
<p><strong>config add 子命令包含以下可选 flag：</strong></p>
<table>
<thead>
<tr>
<th style="text-align:left">flag 简写</th>
<th style="text-align:left">flag 全称</th>
<th style="text-align:left">flag 用途</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">-h</td>
<td style="text-align:left">--help</td>
<td style="text-align:left">查看该命令的具体用法</td>
</tr>
<tr>
<td style="text-align:left">-a</td>
<td style="text-align:left">--alias</td>
<td style="text-align:left">存储桶别名。</td>
</tr>
<tr>
<td style="text-align:left">-b</td>
<td style="text-align:left">--bucket</td>
<td style="text-align:left">存储桶名称。</td>
</tr>
<tr>
<td style="text-align:left">-r</td>
<td style="text-align:left">--region</td>
<td style="text-align:left">存储桶地域。</td>
</tr>
<tr>
<td style="text-align:left">-o</td>
<td style="text-align:left">--ofs</td>
<td style="text-align:left">元数据加速桶标记。详情请参见 <a href="https://cloud.tencent.com/document/product/436/56971" target="_blank" rel="noopener noreferrer">元数据加速概览<ExternalLinkIcon/></a>。</td>
</tr>
</tbody>
</table>
<h3 id="创建存储桶-mb" tabindex="-1"><a class="header-anchor" href="#创建存储桶-mb" aria-hidden="true">#</a> 创建存储桶 - mb</h3>
<p>mb 命令用于创建存储桶。</p>
<h3 id="命令格式" tabindex="-1"><a class="header-anchor" href="#命令格式" aria-hidden="true">#</a> 命令格式</h3>
<div class="language-plaintext ext-plaintext line-numbers-mode"><pre v-pre class="language-plaintext"><code>./coscli mb cos://&lt;BucketName-APPID> -e &lt;endpoint> [flag]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>使用 mb 命令创建存储桶，需要携带全局 flag <code v-pre>-e</code> 或 <code v-pre>--endpoint</code> 指定存储桶所在地域。</p>
</blockquote>
<p>mb 命令包含以下参数：</p>
<table>
<thead>
<tr>
<th style="text-align:left">参数格式</th>
<th style="text-align:left">参数用途</th>
<th style="text-align:left">示例</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">cos://<code v-pre>&lt;BucketName-APPID&gt;</code></td>
<td style="text-align:left">用于自定义存储桶名称</td>
<td style="text-align:left">cos://examplebucket-1250000000</td>
</tr>
</tbody>
</table>
<p>mb 命令包含以下可选 flag：</p>
<table>
<thead>
<tr>
<th style="text-align:left">flag 简写</th>
<th style="text-align:left">flag 全称</th>
<th style="text-align:left">flag 用途</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">-h</td>
<td style="text-align:left">--help</td>
<td style="text-align:left">查看该命令的具体用法</td>
</tr>
<tr>
<td style="text-align:left">-r</td>
<td style="text-align:left">--region</td>
<td style="text-align:left">存储桶地域</td>
</tr>
</tbody>
</table>
<p><strong>案例：</strong></p>
<blockquote>
<div class="language-plaintext ext-plaintext line-numbers-mode"><pre v-pre class="language-plaintext"><code>// 创建存储桶 bucket3
./coscli mb cos://bucket3-1250000000 -e cos.ap-chengdu.myqcloud.com
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h3 id="同步上传下载或拷贝文件-sync" tabindex="-1"><a class="header-anchor" href="#同步上传下载或拷贝文件-sync" aria-hidden="true">#</a> 同步上传下载或拷贝文件 - sync</h3>
<p>sync 命令用于同步上传、下载或拷贝文件，与 cp 命令不同的是：sync 命令首先会对比同名文件的 crc64，如果 crc64 值相同则不进行传输。</p>
<div class="language-plaintext ext-plaintext line-numbers-mode"><pre v-pre class="language-plaintext"><code>./coscli sync &lt;source_path> &lt;destination_path> [flag]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>cp 命令包含以下参数：</strong></p>
<table>
<thead>
<tr>
<th style="text-align:left">参数格式</th>
<th style="text-align:left">参数用途</th>
<th style="text-align:left">示例</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">source_path</td>
<td style="text-align:left">源文件路径。可以为本地路径或 COS 文件路径。COS 路径支持使用 <a href="https://cloud.tencent.com/document/product/436/63144#.E9.85.8D.E7.BD.AE.E5.8F.82.E6.95.B0" target="_blank" rel="noopener noreferrer">配置参数<ExternalLinkIcon/></a> 中的桶别名，或桶名称进行访问。如使用桶名称访问，需要额外携带 <code v-pre>endpoint</code> flag。</td>
<td style="text-align:left">本地路径：~/example.txt 使用桶别名指定 COS 文件路径：cos://bucketalias/example.txt 使用桶名称指定 COS 文件路径：cos://examplebucket-1250000000/example.txt</td>
</tr>
<tr>
<td style="text-align:left">destination_path</td>
<td style="text-align:left">目的文件路径。可以为本地路径或 COS 文件路径。COS 路径支持使用 <a href="https://cloud.tencent.com/document/product/436/63144#.E9.85.8D.E7.BD.AE.E5.8F.82.E6.95.B0" target="_blank" rel="noopener noreferrer">配置参数<ExternalLinkIcon/></a> 中的桶别名，或桶名称进行访问。如使用桶名称访问，需要额外携带 <code v-pre>endpoint</code> flag。</td>
<td style="text-align:left">本地路径：~/example.txt 使用桶别名指定 COS 文件路径：cos://bucketalias/example.txt 使用桶名称指定 COS 文件路径：cos://examplebucket-1250000000/example.txt</td>
</tr>
</tbody>
</table>
<p>sync 命令包含以下可选 flag：</p>
<table>
<thead>
<tr>
<th style="text-align:left">flag 简写</th>
<th style="text-align:left">flag 全称</th>
<th style="text-align:left">flag 用途</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">无</td>
<td style="text-align:left">--include</td>
<td style="text-align:left">包含特定模式的文件</td>
</tr>
<tr>
<td style="text-align:left">无</td>
<td style="text-align:left">--exclude</td>
<td style="text-align:left">排除特定模式的文件</td>
</tr>
<tr>
<td style="text-align:left">-r</td>
<td style="text-align:left">--recursive</td>
<td style="text-align:left">是否递归遍历文件夹下所有文件</td>
</tr>
<tr>
<td style="text-align:left">无</td>
<td style="text-align:left">--storage-class</td>
<td style="text-align:left">指定上传文件的存储类型（默认 STANDARD），更多存储类型，请参见 <a href="https://cloud.tencent.com/document/product/436/33417" target="_blank" rel="noopener noreferrer">存储类型概述<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td style="text-align:left">无</td>
<td style="text-align:left">--part-size</td>
<td style="text-align:left">文件分块大小（默认32MB，最大支持5GB）</td>
</tr>
<tr>
<td style="text-align:left">无</td>
<td style="text-align:left">--thread-num</td>
<td style="text-align:left">并发线程数（默认并发5）</td>
</tr>
<tr>
<td style="text-align:left">无</td>
<td style="text-align:left">--rate-limiting</td>
<td style="text-align:left">单链接速率限制（0.1 - 100MB/s）</td>
</tr>
<tr>
<td style="text-align:left">无</td>
<td style="text-align:left">--snapshot-path</td>
<td style="text-align:left">指定保存上传或者下载文件时的快照信息所在的目录。在下一次上传或者下载文件时，coscli 会读取指定目录下的快照信息进行增量上传或者下载。本选项用来加速目录文件同步。</td>
</tr>
<tr>
<td style="text-align:left">无</td>
<td style="text-align:left">--meta</td>
<td style="text-align:left">上传文件的元信息。包括部分 HTTP 标准属性（HTTP Header）以及以 <code v-pre>x-cos-meta-</code> 开头的用户自定义元数据（User Meta）。文件元信息格式为 <code v-pre>header:value#header:value</code>，示例为 <code v-pre>Expires:2022-10-12T00:00:00.000Z#Cache-Control:no-cache#Content-Encoding:gzip#x-cos-meta-x:x</code>。</td>
</tr>
</tbody>
</table>
<blockquote>
<div class="language-plaintext ext-plaintext line-numbers-mode"><pre v-pre class="language-plaintext"><code>./coscli sync ~/example.txt cos://bucket1/example.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-plaintext ext-plaintext line-numbers-mode"><pre v-pre class="language-plaintext"><code>./coscli sync cos://bucket1/example.txt ~/example.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-plaintext ext-plaintext line-numbers-mode"><pre v-pre class="language-plaintext"><code>./coscli sync cos://bucket1/example.txt cos://bucket1/example_copy.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接" aria-hidden="true">#</a> 链接</h2>
<ul>
<li>https://cloud.tencent.com/developer/article/1355233</li>
<li>https://github.com/BetaHuhn/repo-file-sync-action</li>
<li>https://cloud.tencent.com/document/product/436/63670</li>
</ul>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '78.md' style='float:left'>⬆️上一节🔗  </a><a href = '80.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


