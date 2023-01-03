<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第-36-节-一些疑问" tabindex="-1"><a class="header-anchor" href="#第-36-节-一些疑问" aria-hidden="true">#</a> 第 36 节 一些疑问</h1>
<div><a href = '35.md' style='float:left'>⬆️上一节🔗  </a><a href = '37.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="cgroups-介绍" tabindex="-1"><a class="header-anchor" href="#cgroups-介绍" aria-hidden="true">#</a> Cgroups 介绍</h2>
<p>Cgroups（简称控制组）是 Linux 内核的一项功能，允许管理员将资源（如 CPU 时间，内存和磁盘 I/O）分配给进程组。这允许管理员优先处理某些进程，限制其他进程的可用资源，并监视每个组中进程的资源使用情况。</p>
<p>Cgroups按层次组织，每个组都分配了特定的资源。一个组可以包含多个进程，一个进程也可以是多个组的成员。这允许管理员创建组的层次结构，并以灵活，细粒度的方式为每个组分配资源。</p>
<p>Cgroups使用虚拟文件系统实现，每个组在文件系统中以目录的形式表示。每个组的资源限制和使用情况都以相应目录中的文件的形式暴露。这允许用户空间程序通过读写这些文件查询和控制每个组的资源分配。</p>
<p>Cgroups在基于Linux的系统中常用于管理资源分配，尤其是在容器的情况下。它们也用于其他场景，如限制特定用户或应用程序的可用资源，或用于监视和调试目的。</p>
<h2 id="sys-目录" tabindex="-1"><a class="header-anchor" href="#sys-目录" aria-hidden="true">#</a> sys 目录</h2>
<p>在 Linux 操作系统中，/sys 目录是一个虚拟文件系统，它提供了内核数据结构的视图。它包含有关系统硬件、设备和设备驱动程序的信息。
sys 目录是 sysfs 文件系统的一部分，它是作为将内核信息导出到用户空间的一种方式引入 Linux 内核的。它允许用户空间程序向内核查询有关系统硬件的信息，包括硬件的配置和状态。
/sys 目录包含许多子目录和文件，它们提供有关系统各个方面的信息。例如，</p>
<ul>
<li>/sys/class 目录包含有关系统设备类的信息，</li>
<li>/sys/block 目录包含有关系统块设备的信息。</li>
</ul>
<blockquote>
<p>对于需要收集有关系统硬件和设备信息的系统管理员和开发人员来说，/sys 目录是一个有用的资源。它也可以被用户空间程序用来访问和控制系统硬件和设备的某些方面。</p>
</blockquote>
<h2 id="fs-目录" tabindex="-1"><a class="header-anchor" href="#fs-目录" aria-hidden="true">#</a> fs 目录</h2>
<p>Linux 操作系统默认目录结构中不存在“/fs”目录。您可能引用的是/sys 目录，该目录是一个虚拟文件系统，提供了查看内核数据结构的视图。
/sys 目录是 sysfs 文件系统的一部分，它是在 Linux 内核中引入的，用于将内核信息导出到用户空间。它允许用户空间程序查询内核以获得有关系统硬件的信息，包括硬件的配置和状态。
或者，您可能会引用/proc/fs 目录，其中包含有关当前挂载在系统上的文件系统的信息。/proc/fs 目录包含许多文件和子目录，它们提供有关文件系统的信息，包括它们的类型、挂载点和其他相关详细信息。也有可能您指的是/var/fs 目录，该目录在 Linux 操作系统中默认不存在。这个目录可能用于存储与文件系统相关的文件，但它的用途取决于在特定系统上如何配置和使用它。</p>
<h2 id="目录" tabindex="-1"><a class="header-anchor" href="#目录" aria-hidden="true">#</a> 目录</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root@cubmaster01:/sys/fs/cgroup/cpu<span class="token comment"># mkdir container</span>
root@cubmaster01:/sys/fs/cgroup/cpu<span class="token comment"># ls container/</span>
cgroup.clone_children  cpuacct.usage         cpuacct.usage_percpu_sys   cpuacct.usage_user  cpu.shares      cpu.uclamp.min
cgroup.procs           cpuacct.usage_all     cpuacct.usage_percpu_user  cpu.cfs_period_us   cpu.stat        notify_on_release
cpuacct.stat           cpuacct.usage_percpu  cpuacct.usage_sys          cpu.cfs_quota_us    cpu.uclamp.max  tasks
root@cubmaster01:/sys/fs/cgroup/cpu<span class="token comment"># ls -al container/</span>
total <span class="token number">0</span>
drwxr-xr-x <span class="token number">2</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 <span class="token builtin class-name">.</span>
dr-xr-xr-x <span class="token number">5</span> root root <span class="token number">0</span> Dec <span class="token number">30</span> 08:09 <span class="token punctuation">..</span>
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cgroup.clone_children
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cgroup.procs
-r--r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpuacct.stat
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpuacct.usage
-r--r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpuacct.usage_all
-r--r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpuacct.usage_percpu
-r--r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpuacct.usage_percpu_sys
-r--r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpuacct.usage_percpu_user
-r--r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpuacct.usage_sys
-r--r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpuacct.usage_user
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpu.cfs_period_us
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpu.cfs_quota_us
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpu.shares
-r--r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpu.stat
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpu.uclamp.max
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 cpu.uclamp.min
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 notify_on_release
-rw-r--r-- <span class="token number">1</span> root root <span class="token number">0</span> Dec <span class="token number">31</span> 04:26 tasks
root@cubmaster01:/sys/fs/cgroup/cpu<span class="token comment"># time</span>

real    0m0.000s
user    0m0.000s
sys     0m0.000s
root@cubmaster01:/sys/fs/cgroup/cpu<span class="token comment"># date</span>
Sat <span class="token number">31</span> Dec <span class="token number">2022</span> 04:26:34 AM UTC
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pivot-root-和-chroot" tabindex="-1"><a class="header-anchor" href="#pivot-root-和-chroot" aria-hidden="true">#</a> pivot_root 和 chroot</h2>
<p>pivot_root 和 chroot 是两个类 unix 操作系统函数，用于更改进程的根文件系统。然而，它们有一些重要的区别:</p>
<p>Pivot_root用于修改整个系统的根文件系统，chroot用于修改单个进程的根文件系统。</p>
<p>Pivot_root要求新的根文件系统是当前根文件系统的子目录，而chroot可以将根文件系统更改为系统上的任何目录。</p>
<p>Pivot_root通常在引导过程中使用，而chroot通常用于在包含的环境中运行程序。</p>
<p>Pivot_root需要比chroot更多的权限，因为它涉及更改整个系统的根文件系统。</p>
<p>总而言之，pivot_root用于更改整个系统的根文件系统，而chroot用于更改单个进程的根文件系统。Pivot_root通常在引导过程中使用，而chroot通常用于在包含的环境中运行程序。</p>
<h2 id="copy-on-write" tabindex="-1"><a class="header-anchor" href="#copy-on-write" aria-hidden="true">#</a> Copy-on-Write</h2>
<p>Docker 使用的是一种叫做 “写时拷贝”（Copy-on-Write，简称 COW）的技术来管理容器的存储。</p>
<p>在 COW 机制下，Docker 在创建一个容器时，并不会真正地复制镜像中的文件和数据到容器中。相反，它会在容器中创建一个新的文件系统层，并将它挂载在镜像的最底层（即 <code v-pre>init</code> 层）之上。这样，当容器中的进程尝试修改镜像中的文件或数据时，Docker 会自动将修改的数据复制到容器的文件系统层中，而不会直接修改镜像本身。</p>
<p>这种 COW 机制的好处在于，可以在保证容器隔离性的同时，大大降低了容器存储的空间占用。因为容器只保存对镜像做出的修改，所以容器的存储空间只需要保留这些修改的数据即可。这对于在大量容器中运行相同的应用程序，或者使用较小的存储设备来运行容器都是非常有用的。</p>
<blockquote>
<p>Docker 中的 <code v-pre>init</code> 层是一个特殊的层，它位于镜像的最底层。它负责在容器启动时执行初始化操作，如初始化进程管理器、运行容器的入口点程序等。</p>
</blockquote>
<p>在不同的 Docker 镜像中，<code v-pre>init</code> 层的具体实现可能略有不同。例如，在基于 Alpine Linux 的镜像中，<code v-pre>init</code> 层通常是 <code v-pre>busybox</code> 程序，它可以提供一组基本的 Unix 工具。在基于 Ubuntu 的镜像中，<code v-pre>init</code> 层可能是 <code v-pre>systemd</code> 程序，它可以提供更加复杂的进程管理功能。</p>
<p>总的来说，<code v-pre>init</code> 层是 Docker 容器启动过程中不可或缺的一部分，它负责在容器内部初始化基础环境，为后续的应用程序提供运行条件。</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '35.md' style='float:left'>⬆️上一节🔗  </a><a href = '37.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


