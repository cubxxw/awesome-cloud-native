<template><div><ul>
<li><a href="http://nsddd.top" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第65节-ebpf-刨析以及源码学习" tabindex="-1"><a class="header-anchor" href="#第65节-ebpf-刨析以及源码学习" aria-hidden="true">#</a> 第65节 eBPF 刨析以及源码学习</h1>
<div><a href = '64.md' style='float:left'>⬆️上一节🔗  </a><a href = '66.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://nsddd.top/" target="_blank" rel="noopener noreferrer">http://nsddd.top<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="开始" tabindex="-1"><a class="header-anchor" href="#开始" aria-hidden="true">#</a> 开始</h2>
<blockquote>
<p>什么是 eBPF —— 新一代网络、安全和可观测性工具介绍</p>
<p>eBPF 被称作过去 50年 操作系统最大的变更。</p>
</blockquote>
<p>这一节开始学习一个很重要的技术：eBPF，eBPF 是一个非常重要也是非常牛掰的技术，接下来我们开始学习 eBPF.</p>
<ul>
<li><a href="https://github.com/cilium/ebpf" target="_blank" rel="noopener noreferrer">github project address<ExternalLinkIcon/></a></li>
<li><a href="https://pkg.go.dev/github.com/cilium/ebpf" target="_blank" rel="noopener noreferrer">go pkg<ExternalLinkIcon/></a></li>
</ul>
<p><strong>本文学习 What is eBPF ？</strong></p>
<p>更多参考 https://ebpf.io/</p>
<p>这是它的官网：https://ebpf.io/what-is-ebpf/</p>
<p>eBPF 代表<strong>扩展的伯克利数据包过滤器（Extended Berkeley Packet Filter）</strong></p>
<p>动态改变内核行为的能力非常有用。传统上，如果我们想观察应用程序的行为，我们在应用程序中添加代码，以产生日志和追踪。eBPF 允许我们收集关于应用程序行为的定制信息，通过在内核中观察它，而不必修改应用程序。我们可以在这种可观测性的基础上创建 eBPF 安全工具，从内核中检测甚至防止恶意活动。我们可以用 eBPF 创建强大的、高性能的网络功能，在内核内处理网络数据包，避免昂贵的用户空间转换。</p>
<p>eBPF 编程的能力异常强大，但也很复杂。对于我们大多数人来说，eBPF 的效用不是来自于自己写的程序，而是来自于使用别人创造的工具。有越来越多的项目和供应商在 eBPF 平台上创建了新一代的工具，包括可观测性、安全性、网络等。</p>
<h2 id="改变内核很困难" tabindex="-1"><a class="header-anchor" href="#改变内核很困难" aria-hidden="true">#</a> 改变内核很困难？</h2>
<p>由于 eBPF 允许在 Linux 内核中运行自定义代码，在解释 eBPF 之前我需要确保你对内核的作用有所了解。然后我们将讨论为什么在修改内核行为这件事情上，eBPF 改变了游戏规则。</p>
<p>Linux 内核是应用程序和它们所运行的硬件之间的软件层。应用程序运行在被称为<strong>用户空间</strong>的非特权层，它不能直接访问硬件。相反，应用程序使用系统调用（syscall）接口发出请求，要求内核代表它行事。这种硬件访问可能涉及到文件的读写，发送或接收网络流量，或者只是访问内存。内核还负责协调并发进程，使许多应用程序可以同时运行。</p>
<p>谷歌在很久之前对容器的研究中，也是做了一个容器应用程序内核项目 <a href="https://github.com/google/gvisor" target="_blank" rel="noopener noreferrer">gVisor<ExternalLinkIcon/></a></p>
<p>应用程序开发者通常不直接使用系统调用接口，因为编程语言给了我们更高级别的抽象和<strong>标准库</strong>，开发者更容易掌握这些接口。因此，很多人都不知道在程序运行时内核做了什么。如果你想了解内核调用频率，你可以使用 strace 工具来显示程序所做的所有系统调用。这里有一个例子，用 cat 从文件中读取 hello 这个词并将其写到屏幕上涉及到 100 多个系统调用：</p>
<p><img src="http://sm.nsddd.top/sm202303192030754.png" alt="image-20230319203030478"></p>
<p>由于应用程序在很大程度上依赖于内核，这意味着 <strong>如果我们能够观测到应用程序与内核的交互，我们就可以了解到很多关于它的行为方式</strong>。例如，如果你能够截获打开文件的系统调用，你就可以准确地看到任何应用程序访问了哪些文件。但是，怎么才能做到这种拦截呢？让我们考虑一下，如果我们想修改内核，添加新的代码，在系统调用时创建某种输出，会涉及到什么问题。</p>
<h3 id="向内核添加新功能" tabindex="-1"><a class="header-anchor" href="#向内核添加新功能" aria-hidden="true">#</a> 向内核添加新功能</h3>
<p>Linux 内核很复杂，对任何代码库进行修改都需要对现有的代码有一定的熟悉，所以除非你已经是一个内核开发者，否则这很可能是一个挑战。</p>
<p>但你将面临的挑战并不是纯粹的技术问题。Linux 是一个通用的操作系统，在不同的环境和情况下使用。这意味着，如果你想对内核进行修改，这并不是简单地写出能用的代码。它必须被社区（更确切地说，是被 Linux 的创造者和主要开发者 Linus Torvalds）接受，你的改变将是为了大家的更大利益。而这并不是必然的——提交的内核补丁只有三分之一被接受 。</p>
<p>假如，你已经想出了一个好方法来拦截打开文件的系统调用。经过几个月的讨论和一些艰苦的开发工作，让我们想象一下，这个变化被接受到内核中。很好！但是，要到什么时候它才会出现在每个人的机器上呢？</p>
<p>每隔两三个月就会有一个新的 Linux 内核版本，但是即使一个变化已经进入了其中一个版本，它仍然需要一段时间才能在大多数人的生产环境中使用。这是因为我们大多数人并不直接使用 Linux 内核——我们使用像 Debian、Red Hat、Alpine、Ubuntu 等 Linux 发行版，它们将 Linux 内核的一个版本与其他各种组件打包在一起。你可能会发现，你最喜欢的发行版使用的是几年前的内核版本。</p>
<p>所以这个过程是非常非常漫长的~</p>
<h3 id="内核模块" tabindex="-1"><a class="header-anchor" href="#内核模块" aria-hidden="true">#</a> 内核模块</h3>
<p>如果你不想等上好几年才把你的改动写进内核，还有一个选择。<strong>Linux 内核可以接受内核模块（module），这些模块可以根据需要加载和卸载。</strong> 如果你想改变或扩展内核行为，编写一个模块是理所当然的。在我们打开文件的系统调用的例子中，你可以写一个内核模块来实现。</p>
<p>这里最大的挑战是，这仍然是全面的内核编程。用户在使用内核模块时历来非常谨慎，原因很简单：如果内核代码崩溃了，就会导致机器和上面运行的所有东西瘫痪。用户如何确保内核模块可以安全运行呢？</p>
<p>“安全运行”并不仅仅意味着不崩溃——用户想知道内核模块从安全角度来看是否安全。是否包括攻击者可以利用的漏洞？我们是否相信模块的作者不会在其中加入恶意代码？因为内核是特权代码，它可以访问机器上的一切，包括所有的数据，所以内核中的恶意代码将是一个令人担忧的严重问题。这也适用于内核模块。</p>
<p>考虑到内核的安全性，这就是为什么 Linux 发行商需要这么长时间来发布新版本的一个重要原因。如果其他人已经在各种情况下运行了数月或数年的内核版本，那些漏洞可能已经被修复。发行版的维护者可以有一些信心，他们提供给用户 / 客户的内核是经过加固的，也就是说，可以安全运行。</p>
<p>eBPF 提供了一个非常不同的安全方法：<strong>eBPF 验证器（verifier）</strong>，它确保一个 eBPF 程序只有在安全运行的情况下才被加载。</p>
<h3 id="ebpf-验证和安全" tabindex="-1"><a class="header-anchor" href="#ebpf-验证和安全" aria-hidden="true">#</a> eBPF 验证和安全</h3>
<p>由于 eBPF 允许我们在内核中运行任意代码，需要有一种机制来确保它的安全运行，不会使用户的机器崩溃，也不会损害他们的数据。这个机制就是 eBPF 验证器。</p>
<p>验证器对 eBPF 程序进行分析，以确保无论输入什么，它都会在一定数量的指令内安全地终止。例如，如果一个程序解除对一个指针的定义，验证器要求该程序首先检查指针，以确保它不是空的（null）。解除对指针的引用意味着 “查找这个地址的值”，而空值或零值不是一个有效的查找地址。如果你在一个应用程序中解引用一个空指针，该应用程序就会崩溃；而在内核中解引用一个空指针则会使整个机器崩溃，所以避免这种情况至关重要。</p>
<p>验证也确保了 eBPF 程序只能访问其应该访问的内存。例如，有一个 eBPF 程序在网络堆栈中触发，并通过内核的 <strong>套接字缓冲区（socket buffer）</strong>，其中包括正在传输的数据。有一些特殊的辅助函数，如 <code v-pre>bpf_skb_load_bytes()</code>，这个 eBPF 程序可以调用，从套接字缓冲区读取字节数据。另一个由系统调用触发的 eBPF 程序，没有可用的套接字缓冲区，将不允许使用这个辅助函数。验证器还确保程序只读取套接字缓冲区内的数据字节——它不允许访问任意的内存。这里的目的是确保 eBPF 程序是安全的。</p>
<p>当然，仍然有可能编写一个恶意的 eBPF 程序。如果你可以出于合法的原因观测数据，你也可以出于非法的原因观测它。要注意只从可验证的来源加载可信的 eBPF 程序，并且只将管理 eBPF 工具的权限授予你信任的拥有 root 权限的人。</p>
<h3 id="ebpf-程序的动态加载" tabindex="-1"><a class="header-anchor" href="#ebpf-程序的动态加载" aria-hidden="true">#</a> eBPF 程序的动态加载</h3>
<p><strong>eBPF 程序可以动态地加载到内核中和从内核中删除。</strong> 不管是什么原因导致该事件的发生，一旦它们被附加到一个事件上就会被该事件所触发。例如，如果你将一个程序附加到打开文件的系统调用，那么只要任何进程试图打开一个文件，它就会被触发。当程序被加载时，该进程是否已经在运行，这并不重要。</p>
<p>这也是使用 eBPF 的可观测性或安全工具的巨大优势之一——即刻获得了对机器上发生的一切事件的可视性。</p>
<h2 id="ebpf-程序" tabindex="-1"><a class="header-anchor" href="#ebpf-程序" aria-hidden="true">#</a> eBPF 程序</h2>
<p>我们可以用什么语言来编写 eBPF 程序？</p>
<p>内核接受字节码形式的 eBPF 程序 。人工编写这种字节码是可能的，就像用汇编语言写应用程序代码一样——但对人类来说，使用一种可以被编译（即自动翻译）为字节码的高级语言通常更实用。</p>
<p>由于一些原因，eBPF 程序不能用任意的高级语言编写。首先，语言编译器需要支持发出内核所期望的 eBPF 字节码格式。其次，许多编译语言都有运行时特性——例如 Go 的内存管理和垃圾回收，使它们不适合。在撰写本文时，编写 eBPF 程序的唯一选择是 C（用 clang/llvm 编译）和最新的 Rust。迄今为止，绝大多数的 eBPF 代码都是用 C 语言发布的，考虑到它是 Linux 内核的语言，这是有道理的。</p>
<p>至少，用户空间的程序需要加载到内核中，并将其附加到正确的事件中。有一些实用程序，如 bpftool，可以帮助我们解决这个问题，但这些都是低级别的工具，假定你有丰富的 eBPF 知识，它们是为 eBPF 专家设计的，而不是普通用户。在大多数基于 eBPF 的工具中，有一个用户空间的应用程序，负责将 eBPF 程序加载到内核中，传入任何配置参数，并以用户友好的方式显示 eBPF 程序收集的信息。</p>
<p>至少在理论上，eBPF 工具的用户空间部分可以用任何语言编写，但在实践中，有一些库只支持相当少的语言。其中包括 C、Go、Rust 和 Python。这种语言的选择更加复杂，因为并不是所有的语言都有支持 libbpf 的库，libbpf 已经成为使 eBPF 程序在不同版本的内核中可移植的流行选择。</p>
<h3 id="附属于事件的自定义程序" tabindex="-1"><a class="header-anchor" href="#附属于事件的自定义程序" aria-hidden="true">#</a> 附属于事件的自定义程序</h3>
<p>eBPF 程序本身通常是用 C 或 Rust 编写的，并编入一个对象文件 。这是一个标准的 ELF（可执行和可链接格式，Executable and Linkable Format）文件，可以用像 <strong>readelf</strong> 这样的工具来检查，它包含程序字节码和任何映射的定义（我们很快就会讨论）。</p>
<p><img src="http://sm.nsddd.top/sm202303192047719.png" alt="image-20230319204748438"></p>
<p>eBPF 程序加载到内核中时必须被附加到事件上。每当事件发生，相关的 eBPF 程序就会运行。有一个非常广泛的事件，你可以将程序附加到其中；我不会涵盖所有的事件，但以下是一些更常用的选项。</p>
<h3 id="从函数中进入或退出" tabindex="-1"><a class="header-anchor" href="#从函数中进入或退出" aria-hidden="true">#</a> 从函数中进入或退出</h3>
<p>你可以附加一个 eBPF 程序，在内核函数进入或退出时被触发。当前的许多 eBPF 例子都使用了 <code v-pre>kprobes</code>（附加到一个内核函数入口点）和 <code v-pre>kretprobes</code>（函数退出）的机制。在最新的内核版本中，有一个更有效的替代方法，叫做 <code v-pre>fentry/fexit</code> 。</p>
<p>请注意，你不能保证在一个内核版本中定义的所有函数一定会在未来的版本中可用，除非它们是稳定 API 的一部分，如 syscall 接口。</p>
<p>你也可以用 <code v-pre>uprobes</code> 和 <code v-pre>uretprobes</code> 将 eBPF 程序附加到用户空间函数上。</p>
<h3 id="tracepoints" tabindex="-1"><a class="header-anchor" href="#tracepoints" aria-hidden="true">#</a> Tracepoints</h3>
<p>你也可以将 eBPF 程序附加到内核内定义的 <code v-pre>tracepoints</code> 。通过在 <code v-pre>/sys/kernel/debug/tracing/events</code> 下查找机器上的事件。</p>
<h3 id="perf-事件" tabindex="-1"><a class="header-anchor" href="#perf-事件" aria-hidden="true">#</a> Perf 事件</h3>
<p>Perf  是一个收集性能数据的子系统。你可以将 eBPF 程序挂到所有收集 perf 数据的地方，这可以通过在你的机器上运行 <code v-pre>perf list</code> 来确定。</p>
<h3 id="linux-安全模块接口" tabindex="-1"><a class="header-anchor" href="#linux-安全模块接口" aria-hidden="true">#</a> Linux 安全模块接口</h3>
<p>LSM 接口在内核允许某些操作之前检查安全策略。你可能见过 AppArmor 或 SELinux，利用了这个接口。通过 eBPF，你可以将自定义程序附加到相同的检查点上，从而实现灵活、动态的安全策略和一些运行时安全工具的新方法。</p>
<h3 id="网络接口——express-data-path" tabindex="-1"><a class="header-anchor" href="#网络接口——express-data-path" aria-hidden="true">#</a> 网络接口——eXpress Data Path</h3>
<p>eXpress Data Path（XDP）允许将 eBPF 程序附加到网络接口上，这样一来，每当收到一个数据包就会触发 eBPF 程序。它可以检查甚至修改数据包，程序的退出代码可以告诉内核如何处理该数据包：传递、放弃或重定向。这可以构成一些非常有效的网络功能的基础。</p>
<h3 id="套接字和其他网络钩子" tabindex="-1"><a class="header-anchor" href="#套接字和其他网络钩子" aria-hidden="true">#</a> 套接字和其他网络钩子</h3>
<p>当应用程序在网络套接字上打开或执行其他操作时，以及当消息被发送或接收时，你可以附加运行 eBPF 程序。在内核的网络堆栈中也有称为 <strong>流量控制（traffic control）</strong> 或 <strong>tc</strong> 的 钩子，eBPF 程序可以在初始数据包处理后运行。</p>
<p>一些功能可以单独用 eBPF 程序实现，但在许多情况下，我们希望 eBPF 代码能从用户空间的应用程序接收信息，或将数据传递给用户空间的应用程序。允许数据在 eBPF 程序和用户空间之间，或在不同的 eBPF 程序之间传递的机制被称为 <strong>map</strong>。</p>
<h3 id="ebpf-map" tabindex="-1"><a class="header-anchor" href="#ebpf-map" aria-hidden="true">#</a> eBPF Map</h3>
<p>map 的开发是 eBPF 缩略语中的 <strong>e</strong> 代表 <strong>extended</strong> 重要区别之一。</p>
<p>map 是与 eBPF 程序一起定义的数据结构体。有各种不同类型的 map ，但它们本质上都是键值存储。eBPF 程序可以读取和写入 map，用户空间代码也可以。map 的常见用途包括：</p>
<ul>
<li>eBPF 程序写入关于事件的指标和其他数据，供用户空间代码以后检索。</li>
<li>用户空间代码编写配置信息，供 eBPF 程序读取并作出相应的行为。</li>
<li>eBPF 程序将数据写入 map ，供另一个 eBPF 程序以后检索，允许跨多个内核事件的信息协调。</li>
</ul>
<p>如果内核和用户空间的代码都要访问同一个映射，它们需要对存储在该映射中的数据结构体有一个共同的理解。这可以通过在用户空间和内核代码中加入定义这些数据结构体的头文件来实现，但是如果这些代码不是用相同的语言编写的，作者将需要仔细创建逐个字节兼容的结构体定义。</p>
<p>我们已经讨论了 eBPF 工具的主要组成部分：在内核中运行的 eBPF 程序，加载和与这些程序交互的用户空间代码，以及允许程序共享数据的 map 。为了更具体化，让我们看一个例子。</p>
<h3 id="opensnoop-示例" tabindex="-1"><a class="header-anchor" href="#opensnoop-示例" aria-hidden="true">#</a> Opensnoop 示例</h3>
<p>在 eBPF 程序的例子中，我选择了 <code v-pre>opennoop</code>，一个可以显示任何进程所打开的文件的工具。这个工具的原始版本是 Brendan Gregg 最初在 <a href="https://github.com/iovisor/bcc/blob/master/tools/opensnoop.py" target="_blank" rel="noopener noreferrer">BCC 项目<ExternalLinkIcon/></a>中编写的许多 BPF 工具之一，你可以在 GitHub 上找到。它后来被重写为 <code v-pre>libbpf</code>（你将在下一章见到它），在这个例子中，我使用 <code v-pre>libbpf-tools</code> 目录下的较新版本。</p>
<p>当你运行 <code v-pre>opensnoop</code> 时，你将看到的输出在很大程度上取决于当时在虚拟机上发生了什么，但它应该看起来像这样。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>PID    COMM	FD	ERR	<span class="token environment constant">PATH</span>
<span class="token number">93965</span>  <span class="token function">cat</span>	<span class="token number">3</span>	<span class="token number">0</span>	/etc/ld.so.cache
<span class="token number">93965</span>  <span class="token function">cat</span>	<span class="token number">3</span>	<span class="token number">0</span>	/lib/x86_64-linux-gnu/libc.so.6
<span class="token number">93965</span>  <span class="token function">cat</span>	<span class="token number">3</span>	<span class="token number">0</span>	/usr/lib/locale/locale-archive
<span class="token number">93965</span>  <span class="token function">cat</span>	<span class="token number">3</span>	<span class="token number">0</span>	/usr/share/locale/locale.alias
<span class="token punctuation">..</span>.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每一行输出表示一个进程打开（或试图打开）一个文件。这些列显示了进程的 ID，运行的命令，文件描述符，错误代码的指示，以及被打开的文件的路径。</p>
<p>Opensnoop 的工作方式是将 eBPF 程序附加到 <code v-pre>open()</code> 和 <code v-pre>openat()</code> 系统调用上，所有应用程序都必须通过这些调用来要求内核打开文件。让我们深入了解一下这是如何实现的。</p>
<p>eBPF 代码是用 C 语言编写的，在 <a href="https://github.com/iovisor/bcc/blob/master/libbpf-tools/opensnoop.bpf.c" target="_blank" rel="noopener noreferrer"><code v-pre>opensnoop.bpf.c</code><ExternalLinkIcon/></a> 文件中。在这个文件的开头，你可以看到两个 eBPF map 的定义 —— <code v-pre>start</code> 和 <code v-pre>events</code>：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token punctuation">{</span>
        <span class="token function">__uint</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> BPF_MAP_TYPE_HASH<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">__uint</span><span class="token punctuation">(</span>max_entries<span class="token punctuation">,</span> <span class="token number">10240</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">__type</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> u32<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">__type</span><span class="token punctuation">(</span>value<span class="token punctuation">,</span> <span class="token keyword">struct</span> <span class="token class-name">args_t</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> start <span class="token function">SEC</span><span class="token punctuation">(</span><span class="token string">".maps"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">struct</span> <span class="token punctuation">{</span>
        <span class="token function">__uint</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> BPF_MAP_TYPE_PERF_EVENT_ARRAY<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">__uint</span><span class="token punctuation">(</span>key_size<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>u32<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">__uint</span><span class="token punctuation">(</span>value_size<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>u32<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> events <span class="token function">SEC</span><span class="token punctuation">(</span><span class="token string">".maps"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当 ELF 对象文件被创建时，它包含了每个 map 和每个要加载到内核的程序的部分，<code v-pre>SEC()</code> 宏定义了这些部分。</p>
<p>当我们研究这个程序的时候，你会看到，在系统调用被处理的时候，<code v-pre>start</code> map 被用来临时存储系统调用的参数 —— 包括被打开的文件的名称。<code v-pre>events</code> map <a href="https://lib.jimmysong.io/what-is-ebpf/ebpf-programs/#fn:7" target="_blank" rel="noopener noreferrer">7<ExternalLinkIcon/></a> 用于将事件信息从内核中的 eBPF 代码传递给用户空间的可执行程序。如 <a href="https://lib.jimmysong.io/what-is-ebpf/ebpf-programs/#figure-f-3-2" target="_blank" rel="noopener noreferrer">图 3-2<ExternalLinkIcon/></a> 所示。</p>
<p><img src="http://sm.nsddd.top/sm202303192152204.jpeg" alt="图 3-2"></p>
<p>在 <code v-pre>opensnoop.bpf.c</code> 文件的后面，你会发现两个极其相似的函数：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">SEC</span><span class="token punctuation">(</span><span class="token string">"tracepoint/syscalls/sys_enter_open"</span><span class="token punctuation">)</span>
<span class="token keyword">int</span> <span class="token function">tracepoint__syscalls__sys_enter_open</span><span class="token punctuation">(</span><span class="token keyword">struct</span>         <span class="token class-name">trace_event_raw_sys_enter</span><span class="token operator">*</span> ctx<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>和</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">SEC</span><span class="token punctuation">(</span><span class="token string">"tracepoint/syscalls/sys_enter_openat"</span><span class="token punctuation">)</span>
<span class="token keyword">int</span> <span class="token function">tracepoint__syscalls__sys_enter_openat</span><span class="token punctuation">(</span><span class="token keyword">struct</span>
    <span class="token class-name">trace_event_raw_sys_enter</span><span class="token operator">*</span> ctx<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>有两个不同的系统调用用于打开文件 <a href="https://lib.jimmysong.io/what-is-ebpf/ebpf-programs/#fn:8" target="_blank" rel="noopener noreferrer">8<ExternalLinkIcon/></a>：<code v-pre>openat()</code> 和 <code v-pre>open()</code>。它们是相同的，除了 <code v-pre>openat()</code> 有一个额外的参数是目录文件描述符，而且要打开的文件的路径名是相对于该目录而言的。同样，除了处理参数上的差异，opennoop 中的两个函数也是相同的。</p>
<p>正如你所看到的，它们都需要一个参数，即一个指向名为 <code v-pre>trace_event_raw_sys_enter</code> 结构体的指针。你可以在你运行的特定内核生成的 <code v-pre>vmlinux</code> 头文件中找到这个结构体的定义。编写 eBPF 程序之道包括找出每个程序接收的结构体作为其上下文，以及如何访问其中的信息。</p>
<p>这两个函数使用一个 BPF 辅助函数来检索调用这个 syscall 的进程 ID：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>u64 id <span class="token operator">=</span> <span class="token function">bpf_get_current_pid_tgid</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这段代码得到了文件名和传递给系统调用的标志，并把它们放在一个叫做 <code v-pre>args</code> 的结构体中：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>args<span class="token punctuation">.</span>fname <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token keyword">char</span> <span class="token operator">*</span><span class="token punctuation">)</span>ctx<span class="token operator">-></span>args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>            
args<span class="token punctuation">.</span>flags <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>ctx<span class="token operator">-></span>args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这个结构体被写入 <code v-pre>start</code> map 中，使用当前程序 ID 作为键。</p>
<p>这就是 eBPF 程序在进入 syscall 时所做的一切。但在 <code v-pre>opensnoop.bpf.c</code> 中定义了另一对 eBPF 程序，当系统调用退出时被触发。</p>
<p>这个程序和它的双胞胎 <code v-pre>openat()</code> 在函数 <code v-pre>trace_exit()</code> 中共享代码。你有没有注意到，所有被 eBPF 程序调用的函数的前缀都是 <code v-pre>static __always_inline</code>？这迫使编译器将这些函数的指令放在内联中，因为在旧的内核中，BPF 程序不允许跳转到一个单独的函数。新的内核和 LLVM 版本可以支持非内联的函数调用，但这是一种安全的方式，可以确保 BPF 验证器满意（现在还有一个 BPF 尾部调用的概念，即执行从一个 BPF 程序跳转到另一个程序。你可以在 <a href="https://docs.cilium.io/en/v1.10/bpf/#bpf-to-bpf-calls" target="_blank" rel="noopener noreferrer">eBPF 文档<ExternalLinkIcon/></a>中阅读更多关于 BPF 函数调用和尾部调用的内容）。</p>
<p><code v-pre>trace_exit()</code> 函数创建一个空的事件结构体：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">event</span> event <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该结构体将用即将结束的 <code v-pre>open/openat</code> 系统调用的信息填充，并通过 <code v-pre>events</code> map 发送到用户空间。</p>
<p>在 <code v-pre>start</code> 哈希 map 中应该有一个与当前进程 ID 相对应的条目：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>ap <span class="token operator">=</span> <span class="token function">bpf_map_lookup_elem</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>start<span class="token punctuation">,</span> <span class="token operator">&amp;</span>pid<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这里有先前在调用 <code v-pre>sys_enter_open(at)</code> 时写入的关于文件名和标志的信息。标志字段是一个直接存储在结构体中的整数，所以直接从结构体中读取它是可以的：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>event<span class="token punctuation">.</span>flags <span class="token operator">=</span> ap<span class="token operator">-></span>flags<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>相反，文件名被写入用户空间内存的一些字节中，验证者需要确定这个 eBPF 程序从内存的那个位置读取这个字节数是安全的。这是用另一个辅助函数 <code v-pre>bpf_probe_read_user_str()</code> 完成的：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">bpf_probe_read_user_str</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>event<span class="token punctuation">.</span>fname<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>fname<span class="token punctuation">)</span><span class="token punctuation">,</span> ap<span class="token operator">-></span>fname<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>当前的命令名称（即进行 <code v-pre>open(at)</code> 系统调用的可执行文件的名称）也被复制到事件结构体中，使用另一个 BPF 辅助函数：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">bpf_get_current_comm</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>event<span class="token punctuation">.</span>comm<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>event<span class="token punctuation">.</span>comm<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>事件结构体被写入 <code v-pre>events</code> perf buffer map 中：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token function">bpf_perf_event_output</span><span class="token punctuation">(</span>ctx<span class="token punctuation">,</span> <span class="token operator">&amp;</span>events<span class="token punctuation">,</span> BPF_F_CURRENT_CPU<span class="token punctuation">,</span> <span class="token operator">&amp;</span>event<span class="token punctuation">,</span> <span class="token keyword">sizeof</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用户空间的代码从这个 map 中读取事件信息。在我们讨论这个问题之前，让我们简单看看 Makefile。</p>
<h3 id="libbpf-tools-makefile" tabindex="-1"><a class="header-anchor" href="#libbpf-tools-makefile" aria-hidden="true">#</a> libbpf-tools Makefile</h3>
<p>当你构建 eBPF 代码时，你得到一个包含 eBPF 程序和 map 的二进制定义的对象文件。你还需要一个额外的用户空间可执行文件，它将把这些程序和 map 加载到内核中，作为用户 <a href="https://lib.jimmysong.io/what-is-ebpf/ebpf-programs/#fn:9" target="_blank" rel="noopener noreferrer">9<ExternalLinkIcon/></a> 的接口。我们看看如何构建 <code v-pre>opensnoop</code> 的 Makefile，看看它是如何创建 eBPF 对象文件和可执行文件的。</p>
<p>Makefile 由一组规则组成，这些规则的语法可能有点不透明，所以如果你不熟悉 Makefile，也不特别关心这些细节，请随意跳过这一节。</p>
<p>我们正在看的 opensnoop 的例子是一大批示例工具的其中之一，它们都是用 Makefile 构建的，你可以在 <code v-pre>libbpf-tools</code> 目录中找到。在这个文件中，并不是所有的东西都特别有意义，但有几个规则我想强调一下。第一条规则是使用 <code v-pre>bpf.c</code> 文件并使用 clang 编译器来创建一个 BPF 目标对象文件。</p>
<div class="language-makefile ext-makefile line-numbers-mode"><pre v-pre class="language-makefile"><code><span class="token target symbol"><span class="token variable">$</span>(OUTPUT)/%.bpf.o</span><span class="token punctuation">:</span> %.bpf.c <span class="token variable">$</span><span class="token punctuation">(</span>LIBBPF_OBJ<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">wildcard</span> %.h<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>AR.. 
<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">call</span> msg,BPF,<span class="token variable">$@</span><span class="token punctuation">)</span>
<span class="token variable">$</span><span class="token punctuation">(</span>Q<span class="token punctuation">)</span><span class="token variable">$</span><span class="token punctuation">(</span>CLANG<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGS<span class="token punctuation">)</span> -target bpf -D__TARGET_ARCH_<span class="token variable">$</span><span class="token punctuation">(</span>ARCH<span class="token punctuation">)</span> \
              -I<span class="token variable">$</span><span class="token punctuation">(</span>ARCH<span class="token punctuation">)</span>/ <span class="token variable">$</span><span class="token punctuation">(</span>INCLUDES<span class="token punctuation">)</span> -c <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">filter</span> %.c,<span class="token variable">$^</span><span class="token punctuation">)</span> -o <span class="token variable">$@</span> &amp;&amp; \
<span class="token variable">$</span><span class="token punctuation">(</span>LLVM_STRIP<span class="token punctuation">)</span> -g <span class="token variable">$@</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，<code v-pre>opensnoop.bpf.c</code> 被编译成 <code v-pre>\$(OUTPUT)/open snoop.bpf.o</code>。这个对象文件包含将被加载到内核的 eBPF 程序和 map。</p>
<p>另一条规则使用 <code v-pre>bpftool gen skeleton</code>，从该 <code v-pre>bpf.o</code> 对象文件中包含的 map 和程序定义中创建一个骨架头文件：</p>
<div class="language-makefile ext-makefile line-numbers-mode"><pre v-pre class="language-makefile"><code><span class="token target symbol"><span class="token variable">$</span>(OUTPUT)/%.skel.h</span><span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>OUTPUT<span class="token punctuation">)</span>/%.bpf.o <span class="token operator">|</span> <span class="token variable">$</span><span class="token punctuation">(</span>OUTPUT<span class="token punctuation">)</span> 
<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">call</span> msg,GEN-SKEL,<span class="token variable">$@</span><span class="token punctuation">)</span>
<span class="token variable">$</span><span class="token punctuation">(</span>Q<span class="token punctuation">)</span><span class="token variable">$</span><span class="token punctuation">(</span>BPFTOOL<span class="token punctuation">)</span> gen skeleton <span class="token variable">$&lt;</span> > <span class="token variable">$@</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>opensnoop.c</code> 用户空间代码包括这个 <code v-pre>opensnoop.skel.h</code> 头文件，以获得它与内核中的 eBPF 程序共享的 map 的定义。这使得用户空间和内核代码能够了解存储在这些 map 中的数据结构体的布局。</p>
<p>下面的规则将用户空间的代码 <code v-pre>opensnoop.c</code> 的编译成为 <code v-pre>$(OUTPUT)/opensnoop.o</code> 的二进制对象：</p>
<div class="language-makefile ext-makefile line-numbers-mode"><pre v-pre class="language-makefile"><code><span class="token target symbol"><span class="token variable">$</span>(OUTPUT)/%.o</span><span class="token punctuation">:</span> %.c <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">wildcard</span> %.h<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>LIBBPF_OBJ<span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token variable">$</span><span class="token punctuation">(</span>OUTPUT<span class="token punctuation">)</span>
<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">call</span> msg,CC,<span class="token variable">$@</span><span class="token punctuation">)</span>
<span class="token variable">$</span><span class="token punctuation">(</span>Q<span class="token punctuation">)</span><span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGS<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>INCLUDES<span class="token punctuation">)</span> -c <span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">filter</span> %.c,<span class="token variable">$^</span><span class="token punctuation">)</span> -o <span class="token variable">$@</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，有一条规则是使用 <code v-pre>cc</code> 将用户空间的应用对象（在我们的例子中是 <code v-pre>opensnoop.o</code>）链接成一组可执行文件：</p>
<div class="language-makefile ext-makefile line-numbers-mode"><pre v-pre class="language-makefile"><code><span class="token target symbol"><span class="token variable">$</span>(APPS)</span><span class="token punctuation">:</span> %<span class="token punctuation">:</span> <span class="token variable">$</span><span class="token punctuation">(</span>OUTPUT<span class="token punctuation">)</span>/%.o <span class="token variable">$</span><span class="token punctuation">(</span>LIBBPF_OBJ<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>COMMON_OBJ<span class="token punctuation">)</span> <span class="token operator">|</span> <span class="token variable">$</span><span class="token punctuation">(</span>OUT... 
<span class="token variable">$</span><span class="token punctuation">(</span><span class="token function">call</span> msg,BINARY,<span class="token variable">$@</span><span class="token punctuation">)</span>
<span class="token variable">$</span><span class="token punctuation">(</span>Q<span class="token punctuation">)</span><span class="token variable">$</span><span class="token punctuation">(</span>CC<span class="token punctuation">)</span> <span class="token variable">$</span><span class="token punctuation">(</span>CFLAGS<span class="token punctuation">)</span> <span class="token variable">$^</span> <span class="token variable">$</span><span class="token punctuation">(</span>LDFLAGS<span class="token punctuation">)</span> -lelf -lz -o <span class="token variable">$@</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在你已经看到 eBPF 和用户空间程序分别是如何生成的，让我们看看用户空间的代码。</p>
<h3 id="opensnoop-用户空间代码" tabindex="-1"><a class="header-anchor" href="#opensnoop-用户空间代码" aria-hidden="true">#</a> Opensnoop 用户空间代码</h3>
<p>如前所述，与 eBPF 代码交互的用户空间代码几乎可以用任何编程语言编写。我们在本节讨论的例子是用 C 语言写的，但如果你有兴趣，你可以把它与用 Python 写的原始 BCC 版本相比较，你可以在 <a href="https://github.com/iovisor/bcc/blob/master/tools/opensnoop.py" target="_blank" rel="noopener noreferrer">bcc/tools<ExternalLinkIcon/></a> 中找到。</p>
<p>用户空间的代码在 <code v-pre>opensnoop.c</code> 文件中。文件的前半部分有 <code v-pre>#include</code> 指令（其中之一是自动生成的 <code v-pre>opensnoop.skel.h</code> 文件），各种定义，以及处理不同命令行选项的代码，我们在此不再赘述。我们还将略过 <code v-pre>print_event()</code> 等函数，该函数将一个事件的信息显示到屏幕上。从 eBPF 的角度来看，所有有趣的代码都在 <code v-pre>main()</code> 函数中。</p>
<p>你会看到像 <code v-pre>opennoop_bpf__open()</code>、<code v-pre>open snoop_bpf__load()</code> 和 <code v-pre>opensnoop_bpf__attach()</code> 这样的函数。这些都是在由 <code v-pre>bpftool gen skeleton</code> <a href="https://lib.jimmysong.io/what-is-ebpf/ebpf-programs/#fn:10" target="_blank" rel="noopener noreferrer">10<ExternalLinkIcon/></a> 自动生成的代码中定义的。这个自动生成的代码处理所有在 eBPF 对象文件中定义的单个 eBPF 程序、map 和附着点。</p>
<p>opennoop 启动和运行后，它的工作就是监听 <code v-pre>events</code> 的 perf buffer，并将每个事件中包含的信息写到屏幕上。首先，它打开与 perf buffer 相关的文件描述符，并将 <code v-pre>handle_event()</code> 设置为新事件到来时要调用的函数：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>pb <span class="token operator">=</span> <span class="token function">perf_buffer__new</span><span class="token punctuation">(</span><span class="token function">bpf_map__fd</span><span class="token punctuation">(</span>obj<span class="token operator">-></span>maps<span class="token punctuation">.</span>events<span class="token punctuation">)</span><span class="token punctuation">,</span>
	PERF_BUFFER_PAGES<span class="token punctuation">,</span> handle_event<span class="token punctuation">,</span> handle_lost_events<span class="token punctuation">,</span>
	<span class="token constant">NULL</span><span class="token punctuation">,</span> <span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后它对缓冲区事件进行轮询，直到达到一个时间限制，或者用户中断程序：</p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span>exiting<span class="token punctuation">)</span> <span class="token punctuation">{</span>
	err <span class="token operator">=</span> <span class="token function">perf_buffer__poll</span><span class="token punctuation">(</span>pb<span class="token punctuation">,</span> PERF_POLL_TIMEOUT_MS<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传递给 <code v-pre>handle_event()</code> 的数据参数指向 eBPF 程序为该事件写进 map 的事件结构体。</p>
<p>用户空间的代码可以检索这些信息，将其格式化并写出来给用户看。</p>
<p>正如你所看到的，opensnoop 注册了 eBPF 程序，每当有应用程序进行 <code v-pre>open()</code> 或 <code v-pre>openat()</code> 系统调用时都会被调用。这些运行在内核中的 eBPF 程序收集有关该系统调用的上下文信息 —— 可执行文件名和进程 ID—— 以及被打开的文件的信息。这些信息被写进一个 map ，用户空间可以从中读取并显示给用户。</p>
<p>你会在 <code v-pre>libbpf-tools</code> 目录中找到几十个这样的 eBPF 工具的例子，每个例子通常都是一个系统调用，或者是一系列相关的系统调用，如 <code v-pre>open()</code> 和 <code v-pre>openat()</code>。</p>
<p>系统调用是一个稳定的内核接口，它提供了一个非常强大的方式来观察（虚拟）机器上正在发生的事情。但是，不要以为 eBPF 编程只能用于拦截系统调用。还有很多其他的固定接口，包括 LSM 和网络堆栈中的各种点，eBPF 可以连接到这些接口。如果你愿意承担内核版本变更的风险，eBPF 程序可以附加的范围是绝对宽广的。</p>
<h2 id="ebpf-的复杂性" tabindex="-1"><a class="header-anchor" href="#ebpf-的复杂性" aria-hidden="true">#</a> eBPF 的复杂性</h2>
<p><strong>跨内核的可移植性：</strong></p>
<p>eBPF 程序可以访问内核数据结构，而这些结构可能在不同的内核版本中发生变化。这些结构本身被定义在头文件中，构成了 Linux 源代码的一部分。在过去编译 eBPF 程序时，必须基于你想运行这些程序的内核兼容的头文件集。</p>
<h3 id="bcc-对可移植性的处理方法" tabindex="-1"><a class="header-anchor" href="#bcc-对可移植性的处理方法" aria-hidden="true">#</a> BCC 对可移植性的处理方法</h3>
<p>为了解决跨内核的可移植性问题，BCC （BPF 编译器集合，BPF Compiler Collection）项目采取了在运行时编译 eBPF 代码的方法，在目标机器上就地进行。这意味着编译工具链需要安装到每个你想让代码运行  的目标机器上，而且你必须在工具启动之前等待编译完成，而且文件系统上必须有内核头文件（实际上并不总是这样）。这就引出了 BPF CO-RE。</p>
<h3 id="co-re" tabindex="-1"><a class="header-anchor" href="#co-re" aria-hidden="true">#</a> CO-RE</h3>
<p>CO-RE（Compile Once, Run Everyone，编译一次，到处运行）方法由以下元素组成。</p>
<p><strong>BTF（BPF Type Format）</strong></p>
<p>这是一种用于表达数据结构和函数签名布局的格式。现代 Linux 内核支持 BTF，因此你可以从运行中的系统中生成一个名为 <code v-pre>vmlinux.h</code> 的头文件，其中包含一个 BPF 程序可能需要的关于内核的所有数据结构信息。</p>
<p><strong>libbpf，BPF 库</strong></p>
<p>libbpf 一方面提供了加载 eBPF 程序和映射到内核的功能，另一方面也在可移植性方面也起着重要的作用：它依靠 BTF 信息来调整 eBPF 代码，以弥补其编译时的数据结构与目标机器上的数据结构之间的差异。</p>
<p><strong>编译器支持</strong></p>
<p>clang 编译器得到了增强，因此当它编译 eBPF 程序时，它包括所谓的 BTF 重定位（relocation），这使得 libbpf 在加载 BPF 程序和映射到内核时知道要调整什么。</p>
<p><strong>可选的 BPF 骨架</strong></p>
<p>使用 <code v-pre>bpftool gen skeleton</code> 可以从编译的 BPF 对象文件中自动生成一个骨架，其中包含用户空间代码可以方便调用的函数，以管理 BPF 程序的生命周期 —— 将它们加载到内核，附加到事件等等。这些函数是更高层次的抽象，对开发者来说比直接使用 libbpf 更方便。</p>
<p>关于 CO-RE 的更详细的解释，请阅读 Andrii Nakryiko 的出色 <a href="https://nakryiko.com/posts/bpf-portability-and-co-re/" target="_blank" rel="noopener noreferrer">描述<ExternalLinkIcon/></a>。</p>
<p>自 5.4 版本 <a href="https://lib.jimmysong.io/what-is-ebpf/ebpf-complexity/#fn:3" target="_blank" rel="noopener noreferrer">3<ExternalLinkIcon/></a> 以来，<code v-pre>vmlinux</code> 文件形式的 BTF 信息已经包含在 Linux 内核中，但 libbpf 可以利用的原始 BTF 数据也可以为旧内核生成。在 <a href="https://github.com/aquasecurity/btfhub" target="_blank" rel="noopener noreferrer">BTF Hub<ExternalLinkIcon/></a> 上有关于如何生成 BTF 文件的信息，以及用于各种 Linux 发行版的文件档案。</p>
<p>BPF CO-RE 方法使得 eBPF 程序更易于在任意 Linux 发行版上运行 —— 或者至少在新 Linux 发行版上支持任意 eBPF 能力。但这并不能使 eBPF 更优雅：它本质上仍然是内核编程。</p>
<h3 id="linux-内核知识" tabindex="-1"><a class="header-anchor" href="#linux-内核知识" aria-hidden="true">#</a> Linux 内核知识</h3>
<p>很快就会发现，为了编写更高级的工具，你需要一些关于 Linux 内核的领域知识。你需要了解你可以访问的数据结构，取决于你的 eBPF 代码被调用的环境。不是所有应用程序的开发者都有解析网络数据包、访问套接字缓冲区或处理系统调用参数的经验。</p>
<p>内核将如何对你 eBPF 代码的行为做出反应？内核由数百万行代码组成。它的文档可能是稀少的，所以你可能会发现自己不得不阅读内核的源代码来弄清楚某些东西是如何工作的。</p>
<p>你还需要弄清楚你的 eBPF 代码应该附加到哪些事件。由于可以将 <code v-pre>kprobe</code> 附加到整个内核的任何函数入口点，这可能不是一个简单的决定。在某些情况下，这可能很明确 —— 例如，如果你想访问一个传入的网络数据包，那么适当的网络接口上的 XDP 钩子是一个明显的选择。如果你想提供对特定内核事件的可观测性，在内核代码中找到合适的点可能并不难。</p>
<p>但在其他情况下，选择可能不那么明显。例如，简单地使用 <code v-pre>kprobes</code> 来钩住构成内核系统调用接口的函数的工具，可能会被名为 <code v-pre>time-of-check</code> 到 <code v-pre>time-of-use</code>（TOCTTOU）的安全漏洞所影响。攻击者有一个小的机会窗口，他们可以在 eBPF 代码读取参数后，但在参数被复制到内核内存之前，改变系统调用的参数。在 DEF CON 29 <a href="https://lib.jimmysong.io/what-is-ebpf/ebpf-complexity/#fn:4" target="_blank" rel="noopener noreferrer">4<ExternalLinkIcon/></a> 上，Rex Guo 和 Junyuan Zeng 做了一个关于这个问题的 <a href="https://www.youtube.com/watch?v=yaAdM8pWKG8&amp;ab_channel=DEFCONConference" target="_blank" rel="noopener noreferrer">出色演讲<ExternalLinkIcon/></a>。一些被最广泛使用的 eBPF 工具是以相当天真的方式编写的，极易受到这种攻击。这不是一个简单的漏洞，而且有办法减轻这些攻击，但如果你正在保护高度敏感的数据，对抗复杂的、有动机的对手，请深入了解你使用的工具是否可能受到影响。</p>
<p>你已经看到了 BPF CO-RE 是如何使 eBPF 程序在不同的内核版本上工作的，但它只考虑到了数据结构布局的变化，而没有考虑到内核行为的更大变化。例如，如果你想把一个 eBPF 程序附加到内核中的一个特定的函数或 tracepoint 上，你可能需要一个 B 计划，如果该函数或 tracepoint 在不同的内核版本中不存在，该怎么做。</p>
<h2 id="编排多个-ebpf-程序" tabindex="-1"><a class="header-anchor" href="#编排多个-ebpf-程序" aria-hidden="true">#</a> 编排多个 eBPF 程序</h2>
<p>当前有很多基于 eBPF 的工具提供了一套可观测能力，通过将 eBPF 程序与一组内核事件挂钩来实现。其中大部分是由 Brendan Gregg 和其他人在 BCC 和 <code v-pre>bpftrace</code> 工具中所做的工作而开创的。很多工具（通常是商业的）可能会提供更漂亮的图形和用户界面，但他们还是在这些 eBPF 程序的基础上实现的。</p>
<p>当你想写代码来编排不同类型的事件之间的交互时，事情就变得相当复杂了。举个例子，Cilium 通过内核的网络堆栈 在不同的点上观察到网络数据包，基于来自 Kubernetes CNI（容器网络接口）关于 Kubernetes pod 的信息，对流量进行操作。构建这个系统需要 Cilium 开发人员深入了解内核如何处理网络流量，以及用户空间的 <strong>pod</strong> 和 <strong>容器</strong> 概念如何映射到内核概念，如 cgroups 和命 namespace。在实践中，一些 Cilium 的维护者也是内核的开发者，他们致力于增强 eBPF 和网络支持；因此，他们拥有这些知识。</p>
<p>底线是，尽管 eBPF 提供了一个极其有效和强大的平台来连接到内核，但对于没有大量内核经验的普通开发者来说，这并不容易。如果你对 eBPF 编程感兴趣，我非常鼓励你把它作为练习来学习；在这个领域积累经验可能是非常有价值的，因为它在未来几年内一定会成为受欢迎的专业技能。但实际上，大多数组织不太可能在内部建立许多定制的 eBPF 工具，而是利用专业 eBPF 社区的项目和产品。</p>
<p><strong>我们要知道在某个领域深挖下去是非常困难的，Cilium 追随到底也是一个目前最推荐的 CNI 插件之一。</strong></p>
<h2 id="云原生环境中的-ebpf" tabindex="-1"><a class="header-anchor" href="#云原生环境中的-ebpf" aria-hidden="true">#</a> 云原生环境中的 eBPF</h2>
<p>我们知道未来的世界是云原生的世界，如今云原生的应用成指数级增长。</p>
<h3 id="每台主机一个内核" tabindex="-1"><a class="header-anchor" href="#每台主机一个内核" aria-hidden="true">#</a> 每台主机一个内核</h3>
<p>要理解为什么 eBPF 在云原生世界中如此强大，你需要搞清楚一个概念：<strong>每台机器（或虚拟机）只有一个内核，所有运行在该机器上的容器都共享同一个内核</strong> ，内核了解主机上运行的所有应用代码。</p>
<p><img src="http://sm.nsddd.top/sm202303192205066.png" alt="image-20230319220548953"></p>
<p>对于这些 container 来说，Kernel 至关重要。一些频繁的 System calls 会严重的影响 performance index</p>
<p>通过对内核的检测，就像我们在使用 eBPF 时做的那样，我们可以同时检测在该机器上运行的所有应用程序代码。当我们将 eBPF 程序加载到内核并将其附加到事件上时，它就会被触发，而不考虑哪个进程与该事件有关。</p>
<h3 id="ebpf-与-sidecar-模式的比较" tabindex="-1"><a class="header-anchor" href="#ebpf-与-sidecar-模式的比较" aria-hidden="true">#</a> eBPF 与 sidecar 模式的比较</h3>
<p>步入 Kubernetes 的可观测性来看，在 eBPF 之前，Kubernetes 的可观测性和安全工具大多都采用了 sidecar 模式。这种模式允许你在与应用程序相同的 pod 中，单独部署一个工具容器。这种模式的发明是一个进步，因为这意味着不再需要直接在应用程序中编写工具代码。仅仅通过部署 sidecar，工具就获得了同一 pod 中的其他容器的可视性。注入 sidecar 的过程通常是自动化的，所以这提供了一种机制，以确保你的所有应用程序都被仪器化。</p>
<p>每个 sidecar 容器都会消耗资源，而这要乘以注入了 sidecar 的 pod 的数量。这可能是非常重要的 —— 例如，如果每个 sidecar 需要它自己的路由信息副本，或策略规则，这就是浪费（关于这一点，Thomas Graf 写了一篇 <a href="https://isovalent.com/blog/post/2021-12-08-ebpf-servicemesh" target="_blank" rel="noopener noreferrer">关于服务网格 sidecar 与 eBPF 的比较<ExternalLinkIcon/></a>）。</p>
<p>Sidecar 的另一个问题是，你不能保证机器上的每一个应用程序都被正确检测。设想下有一个攻击者设法破坏了你的一台主机，并启动了一个单独的 pod 来运行，比如，加密货币挖矿程序。他们不可能对你有礼貌，用你的 sidecar 可观测或安全工具来检测他们的挖矿 pod。你需要一个单独的系统来了解这种活动。</p>
<p>但同样的加密货币矿工与运行在该主机上的合法 pod 共享内核。如果你使用基于 eBPF 的工具，如所示，矿工会自动受到它的影响。</p>
<p><img src="http://sm.nsddd.top/sm202303192210973.png" alt="image-20230319221050760"></p>
<h3 id="ebpf-和进程隔离" tabindex="-1"><a class="header-anchor" href="#ebpf-和进程隔离" aria-hidden="true">#</a> eBPF 和进程隔离</h3>
<p>我主张将功能整合到一个单一的、基于 eBPF 的代理中，而不是每个 pod 的 sidecar 中。如果该代理可以访问机器上运行的所有 pod，这不是一种安全风险吗？我们不是失去了应用程序之间的隔离，而这种隔离可以防止它们相互干扰吗？</p>
<p>作为一个容器安全领域的过来人，我可以体会到你对此的担忧，但重要的是要挖掘底层机制，以真正理解为什么它不是一开始可能出现的缺陷。</p>
<p>请注意，这些 pod 共享同一个内核，而内核原生不能感知 pod 或容器。相反，内核对进程进行操作，并使用 cgroup 和 namespace 来隔离进程。这些结构由内核监管，以隔离用户空间中的进程，防止它们互相干扰。只要数据在内核中处理（例如，从磁盘中读取或发送到网络中），你就依赖于内核的正确行为。只有内核代码控制文件权限。没有其他层面的东西可以阻止内核忽略文件权限的东西，内核可以从任何文件中读取数据 —— 只是内核本身不会这样做。</p>
<p>存在于 Linux 系统中的安全控制措施假定内核本身是可以信任的。它们的存在是为了防止在用户空间运行的代码产生不良行为。</p>
<p>我们在中看到，eBPF 检查器确保 eBPF 程序只能访问它有权限的内存。检查器检查程序时不可能超出其职权范围，包括确保内存为当前进程所拥有或为当前网络包的一部分。这意味着 eBPF 代码比它周围的内核代码受到更严格的控制，内核代码不需要通过任何类型的检查器。</p>
<p>如果攻击者逃脱了容器化的应用程序而到了节点上，而且还能够提升权限，那么该攻击者就可以危害到同一节点上的其他应用程序。由于这些逃逸是未知的，作为一个容器安全专家，我不建议在没有额外安全工具的情况下，在共享机器上与不受信任的应用程序或用户一起运行敏感的应用程序。对于高度敏感的数据，你甚至可能不希望在虚拟机中与不受信任的用户在同一裸机上运行。但是，如果你准备在同一台虚拟机上并行运行应用程序（这在许多不是特别敏感的应用程序中是完全合理的），那么 eBPF 就不会在共享内核已经存在的风险之上增加额外的风险。</p>
<p>当然，恶意的 eBPF 程序可能造成各种破坏，当然也很容易写出劣迹的 eBPF 代码 —— 例如，复制每个网络数据包并将其发送给窃听者。默认情况下，非 root 用户没有加载 eBPF 程序的权限， 只有当你真正信任他们时，你才应该授予用户或软件系统这种权限，就像 root 权限一样。因此，必须小心你所运行的代码的出处（有一个倡议正在进行中，以支持 eBPF 程序的签名检查来帮助解决这个问题）。你也可以使用 eBPF 程序来监视其他的 eBPF 程序！现在你已经对为什么 eBPF 是云原生工具的强大基础有了一个概念，下一章给你举一些来自云原生生态系统中的 eBPF 工具的具体例子。</p>
<h2 id="ebpf-工具" tabindex="-1"><a class="header-anchor" href="#ebpf-工具" aria-hidden="true">#</a> eBPF 工具</h2>
<p>eBPF 的三个方面的能力：网络、可观测性、安全。</p>
<h3 id="网络" tabindex="-1"><a class="header-anchor" href="#网络" aria-hidden="true">#</a> 网络</h3>
<p>eBPF 程序可以连接到网络接口和内核的网络堆栈的各个点。在每个点上，eBPF 程序可以丢弃数据包，将其发送到不同的目的地，甚至修改其内容。这就实现了一些非常强大的功能。让我们来看看通常用 eBPF 实现的几个网络功能。</p>
<h4 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h4>
<p>Facebook 正在大规模的使用 eBPF 的网络功能，因此你不必对 eBPF 用于网络的可扩展性有任何怀疑。他们是 BPF 的早期采用者，并在 2018 年推出了 <a href="https://engineering.fb.com/2018/05/22/open-source/open-sourcing-katran-a-scalable-network-load-balancer/" target="_blank" rel="noopener noreferrer">Katran<ExternalLinkIcon/></a>，一个开源的四层负载均衡器。</p>
<p>另一个高度扩展的负载均衡器的例子是来自 Cloudflare 的 <a href="https://blog.cloudflare.com/unimog-cloudflares-edge-load-balancer/" target="_blank" rel="noopener noreferrer">Unimog<ExternalLinkIcon/></a> 边缘负载均衡器。通过在内核中运行，eBPF 程序可以操作网络数据包，并将其转发到适当的目的地，而不需要数据包通过网络堆栈和用户空间。</p>
<p>Cilium 项目作为一个 eBPF Kubernetes 网络插件更为人所知（我一会儿会讨论），但作为独立的负载均衡器，它也被用于大型电信公司和企业内部部署。同样，<strong>因为它能够在早期阶段处理数据包，而不需要进入到用户空间，它具有很高的性能。</strong></p>
<h4 id="kubernetes网络" tabindex="-1"><a class="header-anchor" href="#kubernetes网络" aria-hidden="true">#</a> Kubernetes网络</h4>
<p>CNCF 项目 Cilium 最初基于 eBPF 的 CNI 实现。它最初是由一群从事 eBPF 工作的内核维护者发起的，他们认识到 eBPF 在云原生网络中的应用潜力。它现在被用作谷歌 Kubernetes 引擎、亚马逊 EKS Anywhere 和阿里云的默认数据平面。</p>
<p>在云原生环境下，pod 在不断的启停，每个 pod 都会被分配一个 IP 地址。在启用 eBPF 网络之前，当 pod 启停的时候，每个节点都必须为它们更新 iptables 规则，以便在 pod 之间进行路由；而当这些 iptable 规则规模变大后，将十分不便于管理。Cilium 极大地简化了路由，仅需在 eBPF 中创建的一个简单的查找表，就可以获得 <a href="https://cilium.io/blog/2021/05/11/cni-benchmark/" target="_blank" rel="noopener noreferrer">可观的性能改进<ExternalLinkIcon/></a>。</p>
<p>另一个在传统的 iptables 版本之外还增加了 eBPF 实现的 Kubernetes CNI 是 <a href="https://github.com/projectcalico/calico" target="_blank" rel="noopener noreferrer">Calico<ExternalLinkIcon/></a>。</p>
<p><img src="https://lib.jimmysong.io/what-is-ebpf/images/f-6-1.jpg" alt="pod-eBPF"></p>
<h4 id="服务网格" tabindex="-1"><a class="header-anchor" href="#服务网格" aria-hidden="true">#</a> 服务网格</h4>
<p>eBPF 作为服务网格数据平面的基础也是非常有意义的。许多服务网格在七层，即应用层运行，并使用代理组件（如 Envoy）来辅助应用程序（Istio)。在 Kubernetes 中，这些代理通常以 sidecar 模式部署，每个 pod 中有一个代理容器，这样代理就可以访问 pod 的网络命名空间。eBPF 有一个比 sidecar 模型更有效的方法。由于内核可以访问主机中所有 pod 的命名空间，我们可以使用 eBPF 连接 pod 中的应用和主机上的代理。</p>
<p><img src="http://sm.nsddd.top/sm202303192218828.jpeg" alt="图 6-2"></p>
<blockquote>
<p>eBPF 实现了服务网格的高效无 sidecar 模型，每个节点一个代理，而不是每个应用 pod 一个代理</p>
</blockquote>
<h3 id="可观测性" tabindex="-1"><a class="header-anchor" href="#可观测性" aria-hidden="true">#</a> 可观测性</h3>
<p>正如你在本报告前面所看到的，eBPF 程序可以获得对机器上发生的一切的可观测性。通过收集事件数据并将其传递给用户空间，eBPF 实现了一系列强大的可观测性工具，可以向你展示你的应用程序是如何执行和表现的，而不需要对这些应用程序做任何改变。</p>
<p>在本报告的前面，你已经看到了 BCC 项目，几年来，Brendan Gregg 在 Netflix 做了开创性的工作，展示了这些 eBPF 工具如何被用来 <a href="https://www.brendangregg.com/" target="_blank" rel="noopener noreferrer">观测我们感兴趣的几乎任何指标<ExternalLinkIcon/></a>，而且是大规模和高性能的。</p>
<p>Kinvolk 的 <a href="https://github.com/kinvolk/inspektor-gadget" target="_blank" rel="noopener noreferrer">Inspektor Gadget<ExternalLinkIcon/></a> 将其中一些起源于 BCC 的工具带入了 Kubernetes 的世界，这样你就可以在命令行上轻松观测特定的工作负载。</p>
<p>新一代的项目和工具正在这项工作的基础上，提供基于 GUI 的观测能力。CNCF 项目 <a href="https://px.dev/" target="_blank" rel="noopener noreferrer">Pixie<ExternalLinkIcon/></a> 可以让你运行预先写好的或自定义的脚本，通过一个强大的、视觉上吸引人的用户界面查看指标和日志。因为它是基于 eBPF 的，这意味着你可以自动检测所有应用程序，获得性能数据，而无需进行任何代码修改或配置。显示的只是 Pixie 中众多可视化的一个例子。</p>
<p><img src="http://sm.nsddd.top/sm202303192220647.png" alt="image-20230319222037405"></p>
<p>另一个名为 <a href="https://github.com/parca-dev/parca" target="_blank" rel="noopener noreferrer">Parca<ExternalLinkIcon/></a> 的可观测性项目专注于连续剖析，使用 eBPF 对 CPU 使用率等指标进行有效采样，可以用来检测性能瓶颈。</p>
<p>Cilium 的 <a href="https://github.com/cilium/hubble" target="_blank" rel="noopener noreferrer">Hubble<ExternalLinkIcon/></a> 组件是一个具有命令行界面和用户界面的可观测性工具（如 <a href="https://lib.jimmysong.io/what-is-ebpf/ebpf-tools/#figure-f-6-4" target="_blank" rel="noopener noreferrer">图 6-4<ExternalLinkIcon/></a> 所示），它专注于 Kubernetes 集群中的网络流。</p>
<p><img src="http://sm.nsddd.top/sm202303192221723.png" alt="image-20230319222100579"></p>
<p>在云原生环境中，IP 地址不断被动态重新分配，基于 IP 地址的传统网络观测工具的作用非常有限。作为一个 CNI，Cilium 可以访问工作负载身份信息，这意味着 Hubble 可以显示由 Kubernetes pod、服务和命名空间标识的服务映射和流量数据。这对于诊断网络问题十分有用。</p>
<p>能够观测到活动，这是安全工具的基础，这些工具将正在发生的事情与策略或规则相比较，以了解该活动是预期的还是可疑的。让我们来看看一些使用 eBPF 来提供云原生安全能力的工具。</p>
<h3 id="安全" tabindex="-1"><a class="header-anchor" href="#安全" aria-hidden="true">#</a> 安全</h3>
<p>有一些强大的云原生工具，通过使用 eBPF 检测甚至防止恶意活动来增强安全性。我将其分为两类：一类是确保网络活动的安全，另一类是确保应用程序在运行时的预期行为。</p>
<h3 id="网络安全" tabindex="-1"><a class="header-anchor" href="#网络安全" aria-hidden="true">#</a> 网络安全</h3>
<p>由于 eBPF 可以检查和操纵网络数据包，它在网络安全方面有许多用途。基本原理是，如果一个网络数据包被认为是恶意的或有问题的，因为它不符合一些安全验证标准，就可以被简单地丢弃。eBPF 可以很高效的来验证这一点，因为它可以钩住内核中网络堆栈的相关部分，甚至在网卡上。这意味着策略外的或恶意的数据包可以在产生网络堆栈处理和传递到用户空间的处理成本之前被丢弃。</p>
<p>这里有一个 eBPF 早期在生产中大规模使用的一个例子 —— <a href="https://blog.cloudflare.com/how-to-drop-10-million-packets/" target="_blank" rel="noopener noreferrer">Cloudflare<ExternalLinkIcon/></a> 的 DDoS（分布式拒绝服务）保护。DDoS 攻击者用许多网络信息淹没目标机，希望目标机忙于处理这些信息，导致无法提供有效工作。Cloudflare 的工程师使用 eBPF 程序，在数据包到达后立即对其进行检查，并迅速确定一个数据包是否是这种攻击的一部分，如果是，则将其丢弃。数据包不必通过内核的网络堆栈，因此需要的处理资源要少得多，而且目标可以应对更大规模的恶意流量。</p>
<p>eBPF 程序也被用于动态缓解 ”死亡数据包“ 的内核漏洞 。攻击者以这样的方式制作一个网络工作数据包——利用了内核中的一个错误，使其无法正确处理该数据包。与其等待内核补丁的推出，不如通过加载一个 eBPF 程序来缓解攻击，该程序可以寻找这些特别制作的数据包并将其丢弃。这一点的真正好处是，eBPF 程序可以动态加载，而不必改变机器上的任何东西。</p>
<p>在 Kubernetes 中，<a href="https://networkpolicy.io/" target="_blank" rel="noopener noreferrer">网络策略<ExternalLinkIcon/></a> 是一等资源，但它是由网络插件来执行的。一些 CNI，包括 Cilium 和 Calico，为更强大的规则提供了扩展的网络策略功能，例如允许或禁止流量到一个由完全限定域名而不是仅仅由 IP 地址指定的目的地。在 <a href="https://app.networkpolicy.io/" target="_blank" rel="noopener noreferrer">app.networkpolicy.io<ExternalLinkIcon/></a> 有一个探索网络策略及其效果的好工具。</p>
<p><img src="http://sm.nsddd.top/sm202303192222568.jpeg" alt="图 6-5"></p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '64.md' style='float:left'>⬆️上一节🔗  </a><a href = '66.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


