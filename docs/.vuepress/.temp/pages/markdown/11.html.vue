<template><div><h1 id="镜像底层、联合文件系统" tabindex="-1"><a class="header-anchor" href="#镜像底层、联合文件系统" aria-hidden="true">#</a> 镜像底层、联合文件系统</h1>
<nav class="table-of-contents"><ul><li><router-link to="#镜像">镜像</router-link></li><li><router-link to="#unionfs-联合文件系统">UnionFS(联合文件系统)</router-link></li><li><router-link to="#特性">特性：</router-link></li><li><router-link to="#重点理解">重点理解</router-link></li><li><router-link to="#docker-架构">Docker 架构</router-link></li></ul></nav>
<h2 id="镜像" tabindex="-1"><a class="header-anchor" href="#镜像" aria-hidden="true">#</a> 镜像</h2>
<p><strong>镜像是一种轻量级、可执行的独立软件包，包含运行某个软件所需要的所有内容，我们把应用程序和配置依赖打包成一个可以交付的运行环境，这个打包好的运行环境就叫做Image镜像</strong></p>
<p><strong>只有通过镜像文件才能生成docker容器实例</strong></p>
<blockquote>
<p>我们在使用pull的时候，在下载的时候可以看到docker的镜像好像是一层层的下载</p>
</blockquote>
<p><img src="@source/markdown/images/YbVFK5hG9pImyH3.png" alt="image-20220509215720680"></p>
<p><strong>==所以说镜像是分层的==</strong></p>
<h2 id="unionfs-联合文件系统" tabindex="-1"><a class="header-anchor" href="#unionfs-联合文件系统" aria-hidden="true">#</a> UnionFS(联合文件系统)</h2>
<p><strong>联合文件系统是一种分层、轻量级并且高性能的文件系统，它支持对文件的修改操作来为一次提交来一层层的叠加</strong></p>
<p><strong>Union文件系统是docker镜像的基础，镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作出各种具体的应用镜像</strong></p>
<hr>
<h2 id="特性" tabindex="-1"><a class="header-anchor" href="#特性" aria-hidden="true">#</a> <strong>特性：</strong></h2>
<p><strong>一次性同时加载多个文件系统，但是从外面看起来，只能看到一个文件系统。联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录</strong></p>
<blockquote>
<p>所以docker启动非常快是有原因的，它是由一层层的文件系统组成的联合文件系统</p>
</blockquote>
<p><strong>bootfs（boot file system引导文件系统)主要包含bootloader和kernel,kernel，bootloader主要是引导加载kernel,linux刚启动时会加载bootfs文件系统，在docker镜像最底层就是引导文件系统bootfs。</strong></p>
<p><strong>在bootfs之上，包含的就是典型的linux系统中的/dev./proc,/bin,/etc等标准文件和目录</strong></p>
<p><strong>rootfs就是各种不同的操作系统发行版</strong></p>
<hr>
<blockquote>
<p>我们只是包含了最小的容量，所以内存小，只需要包含基本的命令和函数库，所以下载的Ubuntu很小，所以很多命令都没有</p>
</blockquote>
<p><strong>镜像分层的好处就是资源共享，方便复制迁移，就是为了==复用==</strong></p>
<p><strong>比如说有多个镜像从相同的base镜像构建而来，那么docker host只需要在磁盘中保存一份base镜像</strong></p>
<p><strong>同时内存中也只需要加载一份base镜像，就可以为所有容器服务了，而且镜像的每一层都可以被共享。</strong></p>
<h2 id="重点理解" tabindex="-1"><a class="header-anchor" href="#重点理解" aria-hidden="true">#</a> 重点理解</h2>
<p><strong>1. docker镜像层是只读的，容器层是可以写的</strong></p>
<p><strong>2. 当容器启动时，一个新的可写层被加载到镜像的顶部。这一层通常被称作“容器层”，“容器层”之下的都叫“镜像层”。</strong></p>
<h2 id="docker-架构" tabindex="-1"><a class="header-anchor" href="#docker-架构" aria-hidden="true">#</a> Docker 架构</h2>
<p>Docker 包括三个基本概念:</p>
<ul>
<li><strong>镜像（Image）</strong>：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。</li>
<li><strong>容器（Container）</strong>：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。</li>
<li><strong>仓库（Repository）</strong>：仓库可看成一个代码控制中心，用来保存镜像。</li>
</ul>
<p>Docker 使用客户端-服务器 (C/S) 架构模式，使用远程API来管理和创建Docker容器。</p>
<p>Docker 容器通过 Docker 镜像来创建。</p>
<p>容器与镜像的关系类似于面向对象编程中的对象与类。</p>
<table>
<thead>
<tr>
<th style="text-align:left">Docker</th>
<th style="text-align:left">面向对象</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">容器</td>
<td style="text-align:left">对象</td>
</tr>
<tr>
<td style="text-align:left">镜像</td>
<td style="text-align:left">类</td>
</tr>
</tbody>
</table>
<p><img src="@source/markdown/images/Exyomt4GJgAre3k.png" alt="img"></p>
<table>
<thead>
<tr>
<th style="text-align:left">概念</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">Docker 镜像(Images)</td>
<td style="text-align:left">Docker 镜像是用于创建 Docker 容器的模板，比如 Ubuntu 系统。</td>
</tr>
<tr>
<td style="text-align:left">Docker 容器(Container)</td>
<td style="text-align:left">容器是独立运行的一个或一组应用，是镜像运行时的实体。</td>
</tr>
<tr>
<td style="text-align:left">Docker 客户端(Client)</td>
<td style="text-align:left">Docker 客户端通过命令行或者其他工具使用 Docker SDK (https://docs.docker.com/develop/sdk/) 与 Docker 的守护进程通信。</td>
</tr>
<tr>
<td style="text-align:left">Docker 主机(Host)</td>
<td style="text-align:left">一个物理或者虚拟的机器用于执行 Docker 守护进程和容器。</td>
</tr>
<tr>
<td style="text-align:left">Docker Registry</td>
<td style="text-align:left">Docker 仓库用来保存镜像，可以理解为代码控制中的代码仓库。Docker Hub(<a href="https://hub.docker.com/" target="_blank" rel="noopener noreferrer">https://hub.docker.com<ExternalLinkIcon/></a>) 提供了庞大的镜像集合供使用。一个 Docker Registry 中可以包含多个仓库（Repository）；每个仓库可以包含多个标签（Tag）；每个标签对应一个镜像。通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 <code v-pre>&lt;仓库名&gt;:&lt;标签&gt;</code> 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 <strong>latest</strong> 作为默认标签。</td>
</tr>
<tr>
<td style="text-align:left">Docker Machine</td>
<td style="text-align:left">Docker Machine是一个简化Docker安装的命令行工具，通过一个简单的命令行即可在相应的平台上安装Docker，比如VirtualBox、 Digital Ocean、Microsoft Azure。</td>
</tr>
</tbody>
</table>
</div></template>


