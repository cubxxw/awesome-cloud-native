<template><div><ul>
<li><a href="http://cubxxw.com" target="_blank" rel="noopener noreferrer">author<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第46节-深挖容器底层技术" tabindex="-1"><a class="header-anchor" href="#第46节-深挖容器底层技术" aria-hidden="true">#</a> 第46节 深挖容器底层技术</h1>
<div><a href = '45.md' style='float:left'>⬆️上一节🔗  </a><a href = '47.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕新时代拥抱云原生，云原生具有环境统一、按需付费、即开即用、稳定性强特点。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<p>[TOC]</p>
<h2 id="linux-kernel-中-namespace-的实现" tabindex="-1"><a class="header-anchor" href="#linux-kernel-中-namespace-的实现" aria-hidden="true">#</a> linux kernel 中 namespace 的实现</h2>
<ul>
<li><a href="https://github.com/torvalds/linux/tree/master/kernel" target="_blank" rel="noopener noreferrer">Linux kernel source code address for github<ExternalLinkIcon/></a></li>
</ul>
<h3 id="进程数据结构" tabindex="-1"><a class="header-anchor" href="#进程数据结构" aria-hidden="true">#</a> 进程数据结构</h3>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">task_struct</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token operator">/</span> <span class="token operator">*</span> namespaces <span class="token operator">*</span><span class="token operator">/</span>
    <span class="token keyword">struct</span> <span class="token class-name">nsproxy</span> <span class="token operator">*</span>nsproxy<span class="token punctuation">;</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Linux Namespce 是一种 Linux Kernel 提供的资源隔离方案：</strong></p>
<ul>
<li>系统可以为不同进程分配不同的 Namespace</li>
<li>系统可以保证不同的 Namespaces 资源独立分配，进程彼此隔离，即不同的 Namespace 下进程互不干扰。</li>
</ul>
<p><strong>即使是在 Kubernetes 中，任何进程运行都是需要一个 namespaces</strong></p>
<h3 id="namespace-数据结构" tabindex="-1"><a class="header-anchor" href="#namespace-数据结构" aria-hidden="true">#</a> namespace 数据结构</h3>
<ul>
<li><a href="https://github.com/torvalds/linux/blob/master/include/linux/sched.h#L737" target="_blank" rel="noopener noreferrer">https://github.com/torvalds/linux/blob/master/include/linux/sched.h#L737<ExternalLinkIcon/></a></li>
</ul>
<p><strong>具体细节不展开，之前写过很多关于 namespces 的文章（<a href="https://docker.cubxxw.com" target="_blank" rel="noopener noreferrer">https://docker.cubxxw.com<ExternalLinkIcon/></a>)</strong></p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token comment">/*
 * A structure to contain pointers to all per-process
 * namespaces - fs (mount), uts, network, sysvipc, etc.
 *
 * The pid namespace is an exception -- it's accessed using
 * task_active_pid_ns.  The pid namespace here is the
 * namespace that children will use.
 *
 * 'count' is the number of tasks holding a reference.
 * The count for each namespace, then, will be the number
 * of nsproxies pointing to it, not the number of tasks.
 *
 * The nsproxy is shared by tasks which share all namespaces.
 * As soon as a single namespace is cloned or unshared, the
 * nsproxy is copied.
 */</span>
<span class="token keyword">struct</span> <span class="token class-name">nsproxy</span> <span class="token punctuation">{</span>
	<span class="token class-name">atomic_t</span> count<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">uts_namespace</span> <span class="token operator">*</span>uts_ns<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">ipc_namespace</span> <span class="token operator">*</span>ipc_ns<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">mnt_namespace</span> <span class="token operator">*</span>mnt_ns<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">pid_namespace</span> <span class="token operator">*</span>pid_ns_for_children<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">net</span> 	     <span class="token operator">*</span>net_ns<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">time_namespace</span> <span class="token operator">*</span>time_ns<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">time_namespace</span> <span class="token operator">*</span>time_ns_for_children<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">cgroup_namespace</span> <span class="token operator">*</span>cgroup_ns<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">extern</span> <span class="token keyword">struct</span> <span class="token class-name">nsproxy</span> init_nsproxy<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们会以 namespces 为例，即使是其他的，比如说 联合文件系统，我们之前写过一篇文章讲过，<a href="https://docker.cubxxw.com/markdown/50.html" target="_blank" rel="noopener noreferrer">可以参考那篇文章<ExternalLinkIcon/></a></strong></p>
<p><strong>我在网上找到了不同 kernel 版本对应的 namespace ，作为参考</strong></p>
<p><img src="http://sm.cubxxw.com/sm202303021701928.png" alt="image-20230302170104810"></p>
<h3 id="查看和操控主机的-namespace" tabindex="-1"><a class="header-anchor" href="#查看和操控主机的-namespace" aria-hidden="true">#</a> 查看和操控主机的  Namespace</h3>
<p><strong>查看当前系统的 namespace：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>lsns <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>type<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>-t</code>选项:只查看给定类型的Namespace</li>
</ul>
<p><strong>查看某一个进程的 namespace：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">ls</span> <span class="token parameter variable">-al</span> /proc/<span class="token operator">&lt;</span>pid<span class="token operator">></span>/ns/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>进入某一个 namespace 运行命令：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>nsenter <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>pid<span class="token operator">></span> <span class="token parameter variable">-n</span> <span class="token function">ip</span> addr
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>
<p><code v-pre>nsenter</code>:可以在指定进程的Namespace下运行指定程序的命令</p>
</li>
<li>
<p><code v-pre>-t</code>选项:指定被进入命名空间的目标进程的pid</p>
</li>
<li>
<p><code v-pre>-m</code>选项:进入mnt Namespace</p>
</li>
<li>
<p><code v-pre>-u</code>选项:进入uts Namespace</p>
</li>
<li>
<p><code v-pre>-i</code>选项:进入ipc Namespace</p>
</li>
<li>
<p><code v-pre>-n</code>选项:进入net Namespace</p>
</li>
<li>
<p><code v-pre>-p</code>选项:进入pid Namespace</p>
</li>
<li>
<p><code v-pre>-U</code>选项:进入user Namespace</p>
</li>
<li>
<p><code v-pre>-G</code>选项:设置运行程序的gid</p>
</li>
<li>
<p><code v-pre>-S</code>选项:设置运行程序的uid</p>
</li>
<li>
<p><code v-pre>-r</code>选项:设置根目录</p>
</li>
<li>
<p><code v-pre>-w</code>选项:设置工作目录</p>
</li>
</ul>
<p><a href="https://github.com/torvalds/linux/blob/master/tools/perf/util/setns.c#L7:5" target="_blank" rel="noopener noreferrer">setns<ExternalLinkIcon/></a></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code> int setns(int fd, int nstype)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>该系统调用可以让调用进程加入某个已经存在的Namespace中.</p>
<p><strong><code v-pre>setns</code>可以调整一个已经存在的进程,将该进程切换到另一个Namespace中.</strong></p>
<ul>
<li>
<p>unshare</p>
<p>该系统调用可以将调用进程移动到新的Namespace下:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code> int unshare<span class="token punctuation">(</span>int flags<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
</ul>
<h3 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例</h3>
<p>查找 主进程 的 namespace：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ lsns <span class="token parameter variable">-t</span> net
        NS TYPE NPROCS PID <span class="token environment constant">USER</span>    NETNSID NSFS                      COMMAND
<span class="token number">4026531992</span> net     <span class="token number">270</span>   <span class="token number">1</span> root unassigned /run/docker/netns/default /sbin/init text
❯ <span class="token function">ls</span> <span class="token parameter variable">-al</span> /proc/1/ns
total <span class="token number">0</span>
dr-x--x--x <span class="token number">2</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 07:47 <span class="token builtin class-name">.</span>
dr-xr-xr-x <span class="token number">9</span> root root <span class="token number">0</span> Feb <span class="token number">26</span> 05:15 <span class="token punctuation">..</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:06 cgroup -<span class="token operator">></span> <span class="token string">'cgroup:[4026531835]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:06 ipc -<span class="token operator">></span> <span class="token string">'ipc:[4026531839]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:06 mnt -<span class="token operator">></span> <span class="token string">'mnt:[4026531840]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:06 net -<span class="token operator">></span> <span class="token string">'net:[4026531992]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 07:47 pid -<span class="token operator">></span> <span class="token string">'pid:[4026531836]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:06 pid_for_children -<span class="token operator">></span> <span class="token string">'pid:[4026531836]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:06 user -<span class="token operator">></span> <span class="token string">'user:[4026531837]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:06 uts -<span class="token operator">></span> <span class="token string">'uts:[4026531838]'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在我们使用 docker 的时候，我们可以用 docker run / exec 进入一个容器，当然也可以用 nsenter，不过我们用的是 PID(0） system init 主进程测试的：</strong></p>
<blockquote>
<p>聪明的你应该猜到了，主进程的话，那必然也是一样的（因为我平常不用 docker 了，所以只是将 docker 作为 runtime），如下：</p>
</blockquote>
<p><img src="http://sm.cubxxw.com/sm202303021610738.png" alt="image-20230302161048465"></p>
<p><strong>这和我们进入 容器 中，在输入 <code v-pre>ip addr</code> 结果是一样的，网络隔离的效果一样。</strong></p>
<p>我们后面 Kubernetes 调试容器也是经常用到的。</p>
<p><strong>我以网络为例，其他的 namespace 也是一样的：</strong></p>
<ul>
<li>
<p><code v-pre>ipc Namespace</code></p>
<ul>
<li>容器中进程交互还是采用Linux常见的进程间交互(interprocess communication - IPC)方法,包括常见的信号量、消息队列和共享内存</li>
<li>容器的进程间交互,实际上还是宿主机上在同一个Pid namespace中的进程间交互,因此需要在IPC资源申请时加入namespace信息.每个IPC资源有一个唯一的32位ID</li>
</ul>
<p>如果需要进程间通信(比如要发送信号量、要共享内存),这种场景就需要通过IPC通信来完成.2个进程想要进行IPC通信,必须处于同一个ipc namespace中.</p>
</li>
<li>
<p><code v-pre>mnt Namespace</code></p>
<ul>
<li>mnt Namespace允许不同namespace的进程看到不同的文件结构,这样每个namespace中的进程所看到的文件目录就被隔离开了</li>
</ul>
<p>每个进程都有自己的文件系统.从代码的角度来看,结构体<code v-pre>task_struct</code>中有如下几个字段:</p>
<ul>
<li><code v-pre>struct mm_struct *mm, *active_mm;</code></li>
<li><code v-pre>struct fs_struct *fs;</code>(文件系统信息)</li>
<li><code v-pre>struct files_struct *files;</code>(打开文件信息)</li>
<li><code v-pre>struct signal_struct *signal</code>(信号量信息)</li>
<li><code v-pre>struct sighand_struct *sighand;</code>(信号处理对象)</li>
</ul>
<p>mnt Namespace决定了<code v-pre>task_struct</code>的实例(也就是1个进程)能够看到的文件系统.因此每个进程能够看到的文件系统也是不同的.</p>
</li>
<li>
<p><code v-pre>UTS Namespace</code></p>
<ul>
<li>UTS(UNIX Time-sharing System) Namespace允许每个容器拥有独立的hostname和domain name,使其在网络上可以被视作一个独立的节点,而非宿主机上的一个进程.</li>
</ul>
<p>UTS Namespace决定了每个进程可以有其专属的主机域名.配合net Namespace,每个进程就拥有了自己独立的主机域名和IP地址</p>
</li>
<li>
<p><code v-pre>user Namespace</code></p>
<ul>
<li>每个容器可以有不同的user和group id,也就是说可以在容器内部,以容器内部用户的角色执行程序.而非以宿主机上的用户角色来执行容器内的程序.</li>
</ul>
<p>user Namespace用于让每个进程可以有自己的用户管理系统.</p>
</li>
</ul>
<blockquote>
<p>⚠️ 我还是想提醒一下，或许你看过我的文章，或许你可以去 Wiki 上面看，因为 namespace 出现时间不一样，所以不能一概而论。</p>
</blockquote>
<h3 id="unshare" tabindex="-1"><a class="header-anchor" href="#unshare" aria-hidden="true">#</a> unshare</h3>
<p>好熟悉的地方不是吗，或许你看过我<a href="https://docker.cubxxw.com/Cloud-Native/27.html" target="_blank" rel="noopener noreferrer">以前的文章，里面提到过<ExternalLinkIcon/></a></p>
<ul>
<li><code v-pre>unshare</code>: unshare 允许进程在运行时创建和隔离新的命名空间。例如，可以使用 unshare 创建一个新的 PID 命名空间，从而使一个进程在新的命名空间中运行，并且与原来的命名空间隔离。</li>
<li><code v-pre>newuidmap</code>: newuidmap 工具用于在容器中控制用户 ID 映射，这是实现容器的必要步骤。在容器中，需要在主机和容器间进行用户 ID 的映射，以便使容器中的进程具有访问文件系统的权限。</li>
</ul>
<p><strong>create a new PID:</strong></p>
<p>也就是说这条命令的含义是:启动一个进程<code v-pre>sleep</code>,并切换该进程的net Namespace</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ unshare <span class="token parameter variable">-fn</span> <span class="token function">sleep</span> <span class="token number">60</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>test:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>unshare <span class="token parameter variable">-U</span> <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>-f</code>:切换Namespace</li>
<li><code v-pre>-n</code>:指定切换net Namespace</li>
</ul>
<p><strong>ok，我们来测试一下这个💡简单的一个案例如下：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ unshare <span class="token parameter variable">-n</span> <span class="token function">bash</span>
root@cubmaster01:/<span class="token comment"># lsns -t net</span>
        NS TYPE NPROCS    PID <span class="token environment constant">USER</span>    NETNSID NSFS                      COMMAND
<span class="token number">4026531992</span> net     <span class="token number">266</span>      <span class="token number">1</span> root unassigned /run/docker/netns/default /sbin/init text
<span class="token number">4026532657</span> net       <span class="token number">2</span> <span class="token number">948916</span> root unassigned                           <span class="token function">bash</span>
root@cubmaster01:/<span class="token comment"># ls -al /proc/948916/ns</span>
total <span class="token number">0</span>
dr-x--x--x <span class="token number">2</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:16 <span class="token builtin class-name">.</span>
dr-xr-xr-x <span class="token number">9</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:16 <span class="token punctuation">..</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:16 cgroup -<span class="token operator">></span> <span class="token string">'cgroup:[4026531835]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:16 ipc -<span class="token operator">></span> <span class="token string">'ipc:[4026531839]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:16 mnt -<span class="token operator">></span> <span class="token string">'mnt:[4026531840]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:16 net -<span class="token operator">></span> <span class="token string">'net:[4026532657]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:16 pid -<span class="token operator">></span> <span class="token string">'pid:[4026531836]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:16 pid_for_children -<span class="token operator">></span> <span class="token string">'pid:[4026531836]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:16 user -<span class="token operator">></span> <span class="token string">'user:[4026531837]'</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Mar  <span class="token number">2</span> 08:16 uts -<span class="token operator">></span> <span class="token string">'uts:[4026531838]'</span>
root@cubmaster01:/<span class="token comment"># ns</span>
nscd      nsenter   <span class="token function">nslookup</span>  nstat     nsupdate  
root@cubmaster01:/<span class="token comment"># nsenter -t 948916 -n ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK<span class="token operator">></span> mtu <span class="token number">65536</span> qdisc noop state DOWN group default qlen <span class="token number">1000</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
root@cubmaster01:/<span class="token comment"># ip a</span>
<span class="token number">1</span>: lo: <span class="token operator">&lt;</span>LOOPBACK<span class="token operator">></span> mtu <span class="token number">65536</span> qdisc noop state DOWN group default qlen <span class="token number">1000</span>
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00

root@cubmaster01:/<span class="token comment"># exit</span>
<span class="token builtin class-name">exit</span>

root@cubmaster01 / 2m 15s                                                                                         08:18:01
❯ 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>⚠️ <strong>关于Kubernetes namespace 的通信问题以及 Linux namespace 通信问题，我写过一篇文章，<a href="https://docker.cubxxw.com/Cloud-Native-k8s/45.html" target="_blank" rel="noopener noreferrer">请移步到这里<ExternalLinkIcon/></a></strong></p>
</blockquote>
<h2 id="cgroups" tabindex="-1"><a class="header-anchor" href="#cgroups" aria-hidden="true">#</a> Cgroups</h2>
<ul>
<li><a href="https://docker.cubxxw.com/markdown/47.html#control-groups" target="_blank" rel="noopener noreferrer">我们在这篇文章中也写过<ExternalLinkIcon/></a></li>
</ul>
<p><strong>但是我们今天进一步学习，刨析它的底层实现：</strong></p>
<ul>
<li>Cgroups(Control Groups)是Linux下用于对一个或一组进程进行资源控制和监控的机制</li>
<li>可以对诸如CPU使用时间、内存、磁盘I/O等进程所需资源进行限制</li>
<li>不同资源的具体管理工作由相应的Cgroup子系统(Subsystem)来实现</li>
<li>针对不同类型的资源限制,只要将限制策略在不同的子系统上进行关联即可</li>
<li>Cgroups在不同的系统资源管理子系统中,以层级树(Hierarchy)的方式来组织管理:每个Cgroup都可以包含其他的子Cgroup,因此子Cgroup能使用的资源除了受本Cgroup配置的资源参数限制外,还受到父Cgroup设置的资源限制</li>
</ul>
<p>Cgroups用于对Linux中的进程做统一的监控和资源管理.</p>
<p>Cgroups也分为不同的子系统,不同的子系统会控制不同的资源.一个进程所需的资源大约可以分为:CPU、内存、Disk I/O.这些资源都可以被Cgroups管理起来.这些资源在Cgroups中被称为Subsystem.</p>
<p>进程是一个树状结构.Cgroups也采用了类似的结构,叫做Hierarchy.</p>
<h3 id="进程数据结构-1" tabindex="-1"><a class="header-anchor" href="#进程数据结构-1" aria-hidden="true">#</a> 进程数据结构</h3>
<ul>
<li><a href="https://github.com/torvalds/linux/blob/master/include/linux/sched.h#L1208" target="_blank" rel="noopener noreferrer">进程数据结构<ExternalLinkIcon/></a></li>
</ul>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token keyword">struct</span> <span class="token class-name">task_struct</span> <span class="token punctuation">{</span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">ifdef</span> <span class="token expression">CONFIG_CGROUPS</span></span>
	<span class="token comment">/* Control Group info protected by css_set_lock: */</span>
	<span class="token keyword">struct</span> <span class="token class-name">css_set</span> __rcu		<span class="token operator">*</span>cgroups<span class="token punctuation">;</span>
	<span class="token comment">/* cg_list protected by css_set_lock and tsk->alloc_lock: */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span>		cg_list<span class="token punctuation">;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">endif</span></span>
	<span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="css-set-数据结构" tabindex="-1"><a class="header-anchor" href="#css-set-数据结构" aria-hidden="true">#</a> css_set 数据结构</h3>
<ul>
<li><a href="https://github.com/torvalds/linux/blob/master/include/linux/cgroup-defs.h#L212" target="_blank" rel="noopener noreferrer">https://github.com/torvalds/linux/blob/master/include/linux/cgroup-defs.h#L212<ExternalLinkIcon/></a></li>
</ul>
<p><strong>css_set 是 cgroup_subsys_state 对象的集合数据结构</strong></p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code><span class="token comment">/*
 * A css_set is a structure holding pointers to a set of
 * cgroup_subsys_state objects. This saves space in the task struct
 * object and speeds up fork()/exit(), since a single inc/dec and a
 * list_add()/del() can bump the reference count on the entire cgroup
 * set for a task.
 */</span>
<span class="token keyword">struct</span> <span class="token class-name">css_set</span> <span class="token punctuation">{</span>
	<span class="token comment">/*
	 * Set of subsystem states, one for each subsystem. This array is
	 * immutable after creation apart from the init_css_set during
	 * subsystem registration (at boot time).
	 */</span>
	<span class="token keyword">struct</span> <span class="token class-name">cgroup_subsys_state</span> <span class="token operator">*</span>subsys<span class="token punctuation">[</span>CGROUP_SUBSYS_COUNT<span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token comment">/* reference count */</span>
	<span class="token class-name">refcount_t</span> refcount<span class="token punctuation">;</span>

	<span class="token comment">/*
	 * For a domain cgroup, the following points to self.  If threaded,
	 * to the matching cset of the nearest domain ancestor.  The
	 * dom_cset provides access to the domain cgroup and its csses to
	 * which domain level resource consumptions should be charged.
	 */</span>
	<span class="token keyword">struct</span> <span class="token class-name">css_set</span> <span class="token operator">*</span>dom_cset<span class="token punctuation">;</span>

	<span class="token comment">/* the default cgroup associated with this css_set */</span>
	<span class="token keyword">struct</span> <span class="token class-name">cgroup</span> <span class="token operator">*</span>dfl_cgrp<span class="token punctuation">;</span>

	<span class="token comment">/* internal task count, protected by css_set_lock */</span>
	<span class="token keyword">int</span> nr_tasks<span class="token punctuation">;</span>

	<span class="token comment">/*
	 * Lists running through all tasks using this cgroup group.
	 * mg_tasks lists tasks which belong to this cset but are in the
	 * process of being migrated out or in.  Protected by
	 * css_set_rwsem, but, during migration, once tasks are moved to
	 * mg_tasks, it can be read safely while holding cgroup_mutex.
	 */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> tasks<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> mg_tasks<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> dying_tasks<span class="token punctuation">;</span>

	<span class="token comment">/* all css_task_iters currently walking this cset */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> task_iters<span class="token punctuation">;</span>

	<span class="token comment">/*
	 * On the default hierarchy, ->subsys[ssid] may point to a css
	 * attached to an ancestor instead of the cgroup this css_set is
	 * associated with.  The following node is anchored at
	 * ->subsys[ssid]->cgroup->e_csets[ssid] and provides a way to
	 * iterate through all css's attached to a given cgroup.
	 */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> e_cset_node<span class="token punctuation">[</span>CGROUP_SUBSYS_COUNT<span class="token punctuation">]</span><span class="token punctuation">;</span>

	<span class="token comment">/* all threaded csets whose ->dom_cset points to this cset */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> threaded_csets<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> threaded_csets_node<span class="token punctuation">;</span>

	<span class="token comment">/*
	 * List running through all cgroup groups in the same hash
	 * slot. Protected by css_set_lock
	 */</span>
	<span class="token keyword">struct</span> <span class="token class-name">hlist_node</span> hlist<span class="token punctuation">;</span>

	<span class="token comment">/*
	 * List of cgrp_cset_links pointing at cgroups referenced from this
	 * css_set.  Protected by css_set_lock.
	 */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> cgrp_links<span class="token punctuation">;</span>

	<span class="token comment">/*
	 * List of csets participating in the on-going migration either as
	 * source or destination.  Protected by cgroup_mutex.
	 */</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> mg_src_preload_node<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> mg_dst_preload_node<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">list_head</span> mg_node<span class="token punctuation">;</span>

	<span class="token comment">/*
	 * If this cset is acting as the source of migration the following
	 * two fields are set.  mg_src_cgrp and mg_dst_cgrp are
	 * respectively the source and destination cgroups of the on-going
	 * migration.  mg_dst_cset is the destination cset the target tasks
	 * on this cset should be migrated to.  Protected by cgroup_mutex.
	 */</span>
	<span class="token keyword">struct</span> <span class="token class-name">cgroup</span> <span class="token operator">*</span>mg_src_cgrp<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">cgroup</span> <span class="token operator">*</span>mg_dst_cgrp<span class="token punctuation">;</span>
	<span class="token keyword">struct</span> <span class="token class-name">css_set</span> <span class="token operator">*</span>mg_dst_cset<span class="token punctuation">;</span>

	<span class="token comment">/* dead and being drained, ignore for migration */</span>
	bool dead<span class="token punctuation">;</span>

	<span class="token comment">/* For RCU-protected deletion */</span>
	<span class="token keyword">struct</span> <span class="token class-name">rcu_head</span> rcu_head<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Tip：</p>
<blockquote>
<p>cgroup 主要隔离的是 CPU 资源，我们知道即使是在 Kubernetes 中，参考 《深入剖析kubernetes》 这本书的 L 314</p>
<p>Kubernetes 对 CPU 和 内存资源限额的设计，也是参考了 Borg 动态资源定义 调度的。使用 requests + limits 做法。</p>
</blockquote>
<h3 id="cgroups实现了对资源的配额和度量" tabindex="-1"><a class="header-anchor" href="#cgroups实现了对资源的配额和度量" aria-hidden="true">#</a> cgroups实现了对资源的配额和度量</h3>
<ul>
<li>blkio:该子系统用于限制每个块设备的输入输出控制.如:磁盘、光盘以及USB等</li>
<li>cpu:该子系统通过调度程序为cgroup任务提供CPU访问</li>
<li>cpuacct:产生cgroup任务的CPU资源报告</li>
<li>cpuset:如果是多核心的CPU,该子系统为cgroup任务分配单独的CPU和内存</li>
<li>divices:允许或拒绝cgroup任务对设备的访问</li>
<li>freezer:暂停和恢复cgroup任务</li>
<li>memory:设置每个cgroup的内存限制以及产生内存资源报告</li>
<li>net_cls:标记每个网络包以供cgroup方便使用</li>
<li>ns:命名空间子系统</li>
<li>pid:进程标识子系统</li>
</ul>
<p>blkio:即block IO.该子系统用于控制读写磁盘的速度</p>
<p>cpu:设置为该进程分配多少CPU的时间片</p>
<p>cpuacct:用于汇报CPU的状态</p>
<p>cpuset:用于在多CPU场景下,将某个进程绑定在某个CPU核心上.其目的是为了高效.1个进程的生命周期就和1个CPU核心绑定,对于CPU核心来讲不需要做进程切换,提高效率(比如CPU本地的cache,TLB表等都是可以复用的,减少进程切换的开销).</p>
<p>memory:控制一个进程可使用的内存大小</p>
<blockquote>
<p><a href="https://github.com/rayallen20/cloudNativeExercise/blob/master/note/module3-Docker%20core%20technology/class3-Docker%E7%9A%84%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF(%E4%B8%80)/class3-Docker%E7%9A%84%E6%A0%B8%E5%BF%83%E6%8A%80%E6%9C%AF(%E4%B8%80).md#L583" target="_blank" rel="noopener noreferrer">更多详细的参考这篇文章~<ExternalLinkIcon/></a></p>
</blockquote>
<h3 id="cpu-子系统" tabindex="-1"><a class="header-anchor" href="#cpu-子系统" aria-hidden="true">#</a> CPU 子系统</h3>
<ul>
<li><code v-pre>cpu.shares</code>:可出让的能获得CPU使用时间的相对值</li>
<li><code v-pre>cpu.cfs_period_us</code>:<code v-pre>cfs_period_us</code>用于配置时间周期长度,单位为μs(微秒)</li>
<li><code v-pre>cpu.cfs_quota_us</code>:<code v-pre>cfs_quota_us</code>用于配置当前Cgroup在<code v-pre>cfs_period_us</code>时间内最多能使用的CPU时间数,单位为μs(微秒)</li>
<li><code v-pre>cpu.stat</code>:Cgroup内的进程使用的CPU时间统计</li>
<li><code v-pre>nr_periods</code>:经过<code v-pre>cpu.cfs_period_us</code>的时间周期数量</li>
<li><code v-pre>nr_throttled</code>:在经过的周期内,有多少次因为进程在指定的时间周期内用光了配额时间而受到限制</li>
<li><code v-pre>throttled_time</code>:Cgroup中的进程被限制使用CPU的总用时,单位为ns(纳秒)</li>
</ul>
<p>CPU子系统用于控制1个进程能占用多少CPU.通过2种手段控制:</p>
<ol>
<li><code v-pre>cpu.shares</code>:相对时间</li>
<li><code v-pre>cpu.cfs_period_us</code>:绝对时间</li>
</ol>
<p>用于控制进程占用CPU的文件:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯  tree <span class="token parameter variable">-L</span> <span class="token number">1</span> /sys/fs/cgroup/cpu
/sys/fs/cgroup/cpu
├── cgroup.clone_children
├── cgroup.procs
├── cgroup.sane_behavior
├── cpuacct.stat
├── cpuacct.usage
├── cpuacct.usage_all
├── cpuacct.usage_percpu
├── cpuacct.usage_percpu_sys
├── cpuacct.usage_percpu_user
├── cpuacct.usage_sys
├── cpuacct.usage_user
├── cpu.cfs_period_us
├── cpu.cfs_quota_us
├── cpudemo
├── cpu.shares
├── cpu.stat
├── init.scope
├── kubepods.slice
├── notify_on_release
├── release_agent
├── system.slice
├── tasks
└── user.slice

<span class="token number">5</span> directories, <span class="token number">18</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="cpu-shares" tabindex="-1"><a class="header-anchor" href="#cpu-shares" aria-hidden="true">#</a> <code v-pre>cpu.shares</code></h4>
<p><strong>shares顾名思义就是占比,是一个相对值</strong>。</p>
<p>设现有3个CPU，2个CGroup(我们将它命名为Cgroup1和Cgroup2)，2个进程(我们将它命名为进程A和进程B).</p>
<p>将进程A放在CGroup1中，将进程B放在CGroup2中，此时进程和CGroup就产生关联关系了.</p>
<p>将CGroup1的<code v-pre>cpu.shares</code>设置为512,将CGroup2的<code v-pre>cpu.shares</code>设置为<code v-pre>1024.512:1024=1:2.</code>这表示OS在调用这2个进程时,会按照1:2的比例分配CPU时间片.因此说shares是一个相对值.</p>
<h4 id="cpu-cfs-periods-us" tabindex="-1"><a class="header-anchor" href="#cpu-cfs-periods-us" aria-hidden="true">#</a> <code v-pre>cpu.cfs_periods_us</code></h4>
<p>这种方式是控制进程对CPU占用的绝对时间.需要2个文件来控制.</p>
<ol>
<li><code v-pre>cpu.cfs_periods_us</code>:配置时间周期的长度.</li>
<li><code v-pre>cpu.cfs_quota_us</code>:配置在<code v-pre>cpu.cfs_periods_us</code>所定义的时间长度内,进程最多可以占用CPU的时长.</li>
</ol>
<h4 id="二者区别" tabindex="-1"><a class="header-anchor" href="#二者区别" aria-hidden="true">#</a> 二者区别</h4>
<p><code v-pre>cpu.shares</code>定义的是一个相对值.如果在多个进程竞争CPU资源的场景下,按照其定义的百分比划分CPU占用时长.如果没有竞争,则该进程可以一直占用CPU.</p>
<p><code v-pre>cpu.cfs_periods_us</code>是绝对时间.无论是否存在其他进程与该进程竞争CPU资源,按照上文举的例子来讲,每100000μs中,该进程都只能占用40000μs的CPU.</p>
<h3 id="linux-调度器" tabindex="-1"><a class="header-anchor" href="#linux-调度器" aria-hidden="true">#</a> Linux 调度器</h3>
<p>内核默认提供了 5 个调度器，Linux 内核使用 <code v-pre>struct sched_class</code> 来对调度器进行抽象，关于 Linux 内核调度器的研究，我也曾经 <a href="https://github.com/cubxxw/awesome-cs-course/blob/master/excerpt/%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3Linux%20Kernel%E8%B0%83%E5%BA%A6%E5%99%A8%E7%9A%84%E8%BA%AB%E4%B8%96%E4%B9%8B%E8%B0%9C%20-%20%E6%96%87%E7%AB%A0%E8%AF%A6%E6%83%85.md" target="_blank" rel="noopener noreferrer">摘抄过一篇文章<ExternalLinkIcon/></a></p>
<ul>
<li>Stop调度器,<code v-pre>stop_sched_class</code>:优先级最高的调度类,可以抢占其他所有进程,不能被其他进程抢占</li>
<li>Deadline调度器,<code v-pre>dl_sched_class</code>:使用红黑树,把进程按照绝对截止期限进行排序,选择最小进程进行调度运行</li>
<li>RT调度器,<code v-pre>rt_sched_class</code>:实时调度器,为每个优先级维护一个队列</li>
<li>CFS调度器,<code v-pre>cfs_sched_class</code>:完全公平调度器,采用完全公平调度算法,引入虚拟运行时间的概念</li>
<li>IDLE-Task调度器,<code v-pre>idle_sched_class</code>:空闲调度器,每个CPU都会有1个idle线程,当没有其他进程可以调度时,调度运行idle线程</li>
</ul>
<p>Linux中提供多个调度器.最高优先级的是RT(Real Time)调度器.这个调度器是轮询的.假设有多个进程使用RT调度器来调度,那么RT调度器将使用轮询的策略来调度这些进程.这样是为了保证时效性</p>
<p>优先级上其次是CFS(Completely Fair Scheduler,完全公平调度器)调度器.通常普通用户进程都是使用CFS调度器来调度的.CFS引入了一个vruntime(虚拟运行时间)的概念,是平时遇到的最多的调度器</p>
<p>其中，CFS 调度器， 对应 <code v-pre>cfs_sched_class</code> : 完全公平调度器，采用完全公平调度算法，<strong>引入虚拟运行时间概念（vruntime)</strong></p>
<p><strong>CFS 调度没有将进程维护在运行</strong></p>
<h4 id="cfs调度器原理" tabindex="-1"><a class="header-anchor" href="#cfs调度器原理" aria-hidden="true">#</a> CFS调度器原理</h4>
<ul>
<li>CFS是Completely Fair Scheduler的简写,即完全公平调度器</li>
<li>CFS实现的主要思想是维护为任务提供处理器时间方面的平衡,这意味着应该给进程分配相当数量的处理器</li>
<li>分给某个任务的时间失去平衡时,应该给失去平衡的任务分配时间,以便让该任务执行</li>
<li>CFS通过vruntime(虚拟运行时间)来实现平衡,维护提供给某个任务的时间量
<ul>
<li>vruntime = 实际运行时间 * 1024 / 进程权重</li>
</ul>
</li>
<li>进程按照各自不同的速率在物理时钟节拍内前进,优先级高则权重大,其虚拟时钟比真实时钟跑得慢,但获得比较多的运行时间</li>
</ul>
<p>也就是说,一个进程的权重越大,那么该进程的虚拟时钟(vruntime)跑的越慢,就能够获得越长的运行时间.</p>
<h4 id="runtime红黑树" tabindex="-1"><a class="header-anchor" href="#runtime红黑树" aria-hidden="true">#</a> runtime红黑树</h4>
<p>CFS调度器并没有将进程维护在运行队列中,而是维护了一个以虚拟运行时间为顺序的红黑树.红黑树的主要持有点有:</p>
<ol>
<li>自平衡,树上没有任何一条路径,会比其他路径长出2倍</li>
<li>O(log n)时间复杂度,能够在树上进行快读高效地插入或删除操作</li>
</ol>
<h4 id="cfs进程调度" tabindex="-1"><a class="header-anchor" href="#cfs进程调度" aria-hidden="true">#</a> CFS进程调度</h4>
<ul>
<li>
<p>在时钟周期开始时,调度器用<code v-pre>__schedule()</code>函数来开始调度的运行</p>
</li>
<li>
<p><code v-pre>__schedule()</code>函数调用<code v-pre>pick_next_task()</code>让进程调度器从就绪队列中选择一个最合适的进程<code v-pre>next</code>,即红黑树最左边的节点(也就是vruntime最小的进程)</p>
</li>
<li>
<p>通过<code v-pre>context_switch()</code>切换到新的地址空间,从而保证让<code v-pre>next</code>进程运行</p>
</li>
<li>
<p>在时钟周期结束时,调度器调用</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>entity_tick()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>函数来更新进程负载、进程状态以及vruntime(当前vruntime + 该时钟周期内运行的时间)</p>
<ul>
<li>在这个时钟周期内,有的进程运行了,而有的进程没有运行.那此时需要更新vruntime,然后根据更新后的vruntime做一个顺序上的调整(也就是红黑树通过插入和反转等操作进行重新排序),调整后会把一个更紧迫的进程放在红黑树的最左侧.</li>
<li>进程优先级越高的进程,按照公式<code v-pre>vruntime = 实际运行时间 * 1024 / 进程权重</code>,其vruntime值越小.vruntime值越小说明该进程越紧迫,即该进程可以占用更多的时间.这样vruntime和<code v-pre>cpu.shares</code>就产生了一个关联关系:<code v-pre>cpu.shares</code>占比越大的进程,能占有CPU的时间就越长</li>
</ul>
</li>
<li>
<p>最后将该进程的虚拟时间与就绪队列红黑树最左边的调度实体的虚拟时间作比较,如果小于最左边的时间,则不用触发调度,继续调度当前调度实体</p>
</li>
</ul>
<p>……</p>
<blockquote>
<p>更多的，我们可以深挖 Kubernetes 调度器，以及 Linux 调度器问题，我们介绍表面层。</p>
<ul>
<li>关于 深挖 Linux  CPU 调度器，我<a href="https://github.com/cubxxw/awesome-cs-course/blob/master/excerpt/%E4%B8%87%E5%AD%97%E9%95%BF%E6%96%87%EF%BC%8C%E9%94%A4%E5%AE%83%EF%BC%81%E6%8F%AD%E7%A7%98Linux%E8%BF%9B%E7%A8%8B%E8%B0%83%E5%BA%A6%E5%99%A8-51CTO.COM.md" target="_blank" rel="noopener noreferrer">也摘抄过一篇文章<ExternalLinkIcon/></a></li>
</ul>
</blockquote>
<h3 id="案例-1" tabindex="-1"><a class="header-anchor" href="#案例-1" aria-hidden="true">#</a> 案例</h3>
<p>在<code v-pre>/sys/fs/cgroup/cpu</code>下,创建目录<code v-pre>cpudemo</code>并进入：</p>
<p><img src="http://sm.cubxxw.com/sm202303021716799.png" alt="image-20230302171641725"></p>
<blockquote>
<p>惊讶的发现：可以看到控制文件被自动创建出来了</p>
</blockquote>
<p>我们继续：创建一个<code v-pre>go</code>文件,在该<code v-pre>go</code>文件中,启动2个死循环,1个死循环跑在主线程上,另一个跑在子线程上</p>
<p><img src="http://sm.cubxxw.com/sm202303021720082.png" alt="image-20230302172004968"></p>
<p>继续：编译并运行该程序.运行的同时再起一个连接执行<code v-pre>top</code>命令</p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>❯ <span class="token keyword">go</span> build busyloop<span class="token punctuation">.</span><span class="token keyword">go</span>
❯ <span class="token punctuation">.</span><span class="token operator">/</span>busyloop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>可以 用 top 看到我们的资源都被占用了</p>
<p><img src="http://sm.cubxxw.com/sm202303021724917.png" alt="image-20230302172435633"></p>
<p>可以看到<code v-pre>busyloop</code>进程吃满了2个CPU，记住PID为<code v-pre>978527</code></p>
</blockquote>
<p>继续：将该进程加入到CGroups的管理中</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token builtin class-name">cd</span> /sys/fs/cgroup/cpu/cpudemo/<span class="token punctuation">;</span> 
<span class="token builtin class-name">echo</span> <span class="token number">978527</span> <span class="token operator">></span> cgroup.procs<span class="token punctuation">;</span><span class="token function">ls</span><span class="token punctuation">;</span>
<span class="token function">cat</span> cgroup.procs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/sm202303021727739.png" alt="image-20230302172709668"></p>
<p>此时还没改,只是纳入管理.所以<code v-pre>top</code>查看还是200%</p>
<p>继续: 查看<code v-pre>cpu.shares</code>和<code v-pre>cpu.cfs_period_us</code> <code v-pre>cpu.cfs_quota_us</code>：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">cat</span> cpu.shares<span class="token punctuation">;</span><span class="token function">cat</span> cpu.cfs_period_us <span class="token punctuation">;</span><span class="token function">cat</span> cpu.cfs_quota_us
<span class="token number">1024</span>
<span class="token number">100000</span>
<span class="token parameter variable">-1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此处<code v-pre>-1</code>表示不限制，我们需要改它阿：</p>
<p>通过修改绝对时间,控制该进程对CPU的占用时长</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token builtin class-name">echo</span> <span class="token number">100000</span> <span class="token operator">></span> cpu.cfs_quota_us <span class="token operator">&amp;&amp;</span> <span class="token function">cat</span> cpu.cfs_quota_us
<span class="token number">100000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此时<code v-pre>quota</code>值和<code v-pre>period</code>值是相同的.说明只能给该进程1个CPU.</p>
<p>最后：我们可以执行<code v-pre>top</code>命令查看：</p>
<p><img src="http://sm.cubxxw.com/sm202303021730492.png" alt="image-20230302173020362"></p>
<blockquote>
<p>可以看到该进程现在只能占用1个CPU了.</p>
</blockquote>
<p>补充：将<code v-pre>quota</code>限制为50000,再<code v-pre>top</code>查看</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token builtin class-name">echo</span> <span class="token number">50000</span> <span class="token operator">></span> cpu.cfs_quota_us <span class="token punctuation">;</span><span class="token function">cat</span> cpu.cfs_quota_us
<span class="token number">50000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/sm202303021734387.png" alt="image-20230302173412314"></p>
<blockquote>
<p>则此时只能占用1个CPU的50%了.</p>
</blockquote>
<h3 id="cpuacct子系统" tabindex="-1"><a class="header-anchor" href="#cpuacct子系统" aria-hidden="true">#</a> cpuacct子系统</h3>
<p>用于统计Cgroup及其子Cgroup下进程的CPU使用情况</p>
<ul>
<li><code v-pre>cpuacct.usage</code>
<ul>
<li>包含该Cgroup及其子Cgroup下进程使用CPU时间,单位是ns(纳秒)</li>
</ul>
</li>
<li><code v-pre>cpuacct.stat</code>
<ul>
<li>包含该Cgroup及其子Cgroup下进程使用CPU时间,以及用户态和内核态的时间</li>
</ul>
</li>
</ul>
<h3 id="memory子系统" tabindex="-1"><a class="header-anchor" href="#memory子系统" aria-hidden="true">#</a> Memory子系统</h3>
<ul>
<li><code v-pre>memory.usage_in_bytes</code>
<ul>
<li>cgoup下进程使用的内存,包含cgroup及其子cgroup下的进程使用的内存</li>
</ul>
</li>
<li><code v-pre>memory.max_usage_in_bytes</code>
<ul>
<li>cgroup下进程使用内存的最大值,包含子cgroup的内存使用量</li>
</ul>
</li>
<li><code v-pre>memory.limit_in_bytes</code>
<ul>
<li>设置cgroup下进程最多能使用的内存.如果设置为-1,表示对该cgroup的内存使用不做限制</li>
</ul>
</li>
<li><code v-pre>memory.oom_control</code>
<ul>
<li>设置是否在cgroup中使用OOM(Out of Memory) Killer,默认为使用.当属于该cgroup的进程使用的内存超过最大限定值(<code v-pre>memory.max_usage_in_bytes</code>)时,会立刻被OOM Killer处理</li>
</ul>
</li>
</ul>
<p><code v-pre>memory.limit_in_bytes</code>:相当于控制进程可以用多少内存开销的限制.<code v-pre>-1</code>表示不限制</p>
<p>可压缩资源:比如CPU.压制一个进程可使用的CPU资源,不会导致该进程的死亡,只是会让这个进程运行速度变慢.</p>
<p>但内存不属于可压缩资源.因为内存一旦被限制,就不能再申请新的内存了.此时OS就会kill掉这个进程.</p>
<h3 id="cgroup-dirver" tabindex="-1"><a class="header-anchor" href="#cgroup-dirver" aria-hidden="true">#</a> Cgroup dirver</h3>
<ul>
<li>当OS使用systemd作为init system时,初始化进程生成一个根cgroup目录结构并作为cgroup管理器</li>
<li>systemd与cgroup紧密结合,并且为每个systemd unit分配cgroup</li>
<li>cgroupfs
<ul>
<li>docker默认用cgroupfs作为cgroup驱动</li>
</ul>
</li>
</ul>
<p><strong>存在问题:</strong></p>
<ul>
<li>因此,在systemd作为init system的系统中,默认并存着2套groupdriver</li>
<li>这会使得系统中docker和kubelet管理的进程被cgroupfs管理;而systemd拉起的服务由systemd驱动管理.让cgroup管理混乱且容易在资源紧张时引发问题</li>
<li><strong>因此kubelet会默认<code v-pre>--cgroup-dirver=systemd</code>,若运行时cgroup不一致,kubelet会报错</strong></li>
</ul>
<h2 id="memory子系统案例" tabindex="-1"><a class="header-anchor" href="#memory子系统案例" aria-hidden="true">#</a> Memory子系统案例</h2>
<p>现有一个GO程序如下:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token builtin class-name">cd</span> /tmp<span class="token punctuation">;</span> <span class="token function">mkdir</span> memory<span class="token punctuation">;</span><span class="token builtin class-name">cd</span> memory<span class="token punctuation">;</span><span class="token function">touch</span> malloc.go malloc.c Makefile<span class="token punctuation">;</span><span class="token function">ls</span>
Makefile  malloc.c  malloc.go

❯ go mod init memory<span class="token punctuation">;</span>tree
go: creating new go.mod: module memory
go: to <span class="token function">add</span> module requirements and sums:
        go mod tidy
<span class="token builtin class-name">.</span>
├── go.mod
├── Makefile
├── malloc.c
└── malloc.go

<span class="token number">0</span> directories, <span class="token number">4</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>文件内容如下：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token function">cat</span> Makefile malloc.c malloc.go
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>Makefile:</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ cat Makefile
build:
        CGO_ENABLED=1 GOOS=linux CGO_LDFLAGS="-static" go build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>malloc.c:</strong></p>
<div class="language-c ext-c line-numbers-mode"><pre v-pre class="language-c"><code>❯ cat malloc<span class="token punctuation">.</span>c
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdlib.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h></span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;string.h></span></span>

<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">define</span> <span class="token macro-name">BLOCK_SIZE</span> <span class="token expression"><span class="token punctuation">(</span><span class="token number">100</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1024</span><span class="token punctuation">)</span></span></span>
<span class="token keyword">char</span><span class="token operator">*</span> <span class="token function">allocMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">char</span><span class="token operator">*</span> out <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">char</span><span class="token operator">*</span><span class="token punctuation">)</span><span class="token function">malloc</span><span class="token punctuation">(</span>BLOCK_SIZE<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">memset</span><span class="token punctuation">(</span>out<span class="token punctuation">,</span> <span class="token char">'A'</span><span class="token punctuation">,</span> BLOCK_SIZE<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> out<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>malloc.go:</strong></p>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code>❯ cat malloc<span class="token punctuation">.</span><span class="token keyword">go</span>
<span class="token keyword">package</span> main

<span class="token comment">//#cgo LDFLAGS:</span>
<span class="token comment">//char* allocMemory();</span>
<span class="token keyword">import</span> <span class="token string">"C"</span>
<span class="token keyword">import</span> <span class="token punctuation">(</span>
        <span class="token string">"fmt"</span>
        <span class="token string">"time"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// only loop 10 times to avoid exhausting the host memory</span>
        holder <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">*</span>C<span class="token punctuation">.</span>char<span class="token punctuation">{</span><span class="token punctuation">}</span>
        <span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> <span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span>
                fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Allocating %dMb memory, raw memory is %d\n"</span><span class="token punctuation">,</span> i<span class="token operator">*</span><span class="token number">100</span><span class="token punctuation">,</span> i<span class="token operator">*</span><span class="token number">100</span><span class="token operator">*</span><span class="token number">1024</span><span class="token operator">*</span><span class="token number">1025</span><span class="token punctuation">)</span>
                <span class="token comment">// hold the memory, otherwise it will be freed by GC</span>
                holder <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>holder<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token operator">*</span>C<span class="token punctuation">.</span>char<span class="token punctuation">)</span><span class="token punctuation">(</span>C<span class="token punctuation">.</span><span class="token function">allocMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Minute<span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编译-运行" tabindex="-1"><a class="header-anchor" href="#编译-运行" aria-hidden="true">#</a> 编译 &amp; 运行</h3>
<p>🚀 编译结果如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ make build
CGO_ENABLED=1 GOOS=linux CGO_LDFLAGS="-static" go build
❯ 
❯ tree ./
./
├── go.mod
├── Makefile
├── malloc.c
├── malloc.go
└── memory

0 directories, 5 files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ ./memory
Allocating 100Mb memory, raw memory is 104960000

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注意:此时时hang在这的</p>
</blockquote>
<p><strong>再起一个窗口,查看该进程的内存占用情况</strong></p>
<p><img src="http://sm.cubxxw.com/sm202303021755684.png" alt="image-20230302175501610"></p>
<p><strong>在<code v-pre>/sys/fs/cgroup/memory/</code>下创建目录<code v-pre>memorydemo1</code></strong></p>
<p><img src="http://sm.cubxxw.com/sm202303021756159.png" alt="image-20230302175613089"></p>
<p><strong>查看<code v-pre>memory</code>进程的PID</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>❯ ps -ef|grep memory|grep -v grep|awk '{print $2}'
992008
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>将进程添加到cgroup配置组</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯  <span class="token builtin class-name">echo</span> <span class="token number">992008</span> <span class="token operator">></span> cgroup.procs <span class="token operator">|</span> <span class="token function">cat</span>
<span class="token number">992008</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>end：设置<code v-pre>memory.limit_in_bytes</code></strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯  <span class="token builtin class-name">echo</span> <span class="token number">104960000</span> <span class="token operator">></span> memory.limit_in_bytes <span class="token operator">|</span> <span class="token function">cat</span>
<span class="token number">104960000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>此时运行<code v-pre>memory</code>程序的窗口中,该进程已经被kill了.</p>
</blockquote>
<h2 id="文件系统" tabindex="-1"><a class="header-anchor" href="#文件系统" aria-hidden="true">#</a> 文件系统</h2>
<ul>
<li><a href="https://docker.cubxxw.com/markdown/50.html" target="_blank" rel="noopener noreferrer">之前做的一些关于 Union FS 笔记<ExternalLinkIcon/></a></li>
</ul>
<h3 id="union-fs" tabindex="-1"><a class="header-anchor" href="#union-fs" aria-hidden="true">#</a> Union FS</h3>
<p>😊 docker中namespace是创新点嘛，不是的，<strong>docker的创新点准确来说是并不是 runtime，而是在文件系统中(Union FS)。</strong></p>
<ul>
<li>将不同目录挂载到同一个虚拟文件系统下的文件系统(unite several directories into a single virtual filesystem)</li>
<li>支持为每一个成员目录(类似Git Branch)设定<code v-pre>readonly</code>、<code v-pre>readwirte</code>和<code v-pre>write-able</code>权限</li>
<li>文件系统分层,对readonly权限的branch可以逻辑上进行修改(增量地,不影响readonly部分的)</li>
<li>通常Union FS有2个用途:
<ul>
<li>可以将多个disk挂到同一个目录下</li>
<li>将一个readonly的branch和一个writeable的branch联合在一起</li>
</ul>
</li>
</ul>
<p>Union FS:通过一些技术手段,将不同的目录mount到同一个虚拟目录中.每个目录在虚拟目录中可以有独立的权限(readonly、readwirte、write-able).</p>
<p>通过这种方式,可以将多个不同来源的子目录模拟成一个完整的OS.</p>
<p><img src="http://sm.cubxxw.com/sm202303021915290.jpg" alt="container"></p>
<p>📜 <strong>对上面的解释</strong>：</p>
<p>我们可以看到 两个 dockerfile 是不一样的，但是前两条指令是一样的，也就是说在一个层。</p>
<p>但是后面两个层是不一样的，所以说后面两个 就开始判断。</p>
<p><strong>所以这些地方是复用的。</strong></p>
<p>docker pull 的时候会拉取并且判断，上面的话基础层是一样的，也就不会重复。</p>
<blockquote>
<p><strong>我们之前的学习 大致 止步于原理上，但是底层和源码实现还是缺少一部分的。</strong></p>
</blockquote>
<h3 id="docker-文件系统" tabindex="-1"><a class="header-anchor" href="#docker-文件系统" aria-hidden="true">#</a> docker 文件系统</h3>
<p>一般1个Linux会分为2个主要组成部分:</p>
<ol>
<li>Bootfs(boot file system)
<ul>
<li><code v-pre>Bootloader</code>:引导加载kernel</li>
<li><code v-pre>Kernel</code>:当kernel被加载到内存中后,umount bootfs</li>
</ul>
</li>
<li>rootfs(root file system)
<ul>
<li><code v-pre>/dev</code>,<code v-pre>/proc</code>,<code v-pre>/bin</code>,<code v-pre>/etc</code>等标准目录和文件</li>
<li>对于不同的Linux发行版,bootfs基本是一致的,但rootfs会有差别</li>
</ul>
</li>
</ol>
<h3 id="docker的启动" tabindex="-1"><a class="header-anchor" href="#docker的启动" aria-hidden="true">#</a> Docker的启动</h3>
<p><strong>Linux的启动:</strong></p>
<ul>
<li>在启动后,首先将rootfs设置为<code v-pre>readonly</code> （只读层）,进行一系列检查,然后将其切换为&quot;readwrite&quot;供用户使用</li>
</ul>
<p><strong>Docker的启动:</strong></p>
<ul>
<li>初始化时也是将rootfs以<code v-pre>readonly</code>方式加载并检查,但接下来使用<code v-pre>union mount</code>的方式将一个<code v-pre>readwrite</code>的文件系统挂载在<code v-pre>readonly</code>的rootfs之上</li>
<li>允许再次将下层的<code v-pre>FS(file system)</code>设定为<code v-pre>readonly</code>并且向上叠加</li>
<li>这样一组<code v-pre>readonly</code>和一个<code v-pre>writeable</code>的结构，构成了一个<code v-pre>container</code>的运行时态,每一个FS被称为一个FS层</li>
</ul>
<p>最上方的一层为<code v-pre>readwrite</code>,在它之下的层都是<code v-pre>readonly</code>。所有用户的修改都被记录在了顶层(即 <code v-pre>readwrite</code>的层)中,不会涉及到下方的层.</p>
<h3 id="写操作" tabindex="-1"><a class="header-anchor" href="#写操作" aria-hidden="true">#</a> 写操作</h3>
<p>由于镜像具有共享特性,所以对容器的可写层的操作需要依赖存储驱动提供的 <strong>写时复制和用时分配机制</strong>，以此来支持对容器可写层的修改,进而提高对存储和内存资源的利用率。</p>
<h4 id="写时复制" tabindex="-1"><a class="header-anchor" href="#写时复制" aria-hidden="true">#</a> 写时复制</h4>
<p><strong>写时复制</strong>：即<code v-pre>Copy-on-Write</code> 。1个镜像可以被多个容器使用,但是不需要在内存和磁盘上做多拷贝，在需要对镜像提供的文件进行修改时。该文件才会从镜像的文件系统被复制到容器的可写层文件系统,然后进行修改。而镜像中的文件不会改变。不同容器对文件的修改都相互独立、互不影响。</p>
<p>1个镜像是可以被不同的容器使用的 1 个镜像中的不同层也是被多个镜像共享的。因此有了写时复制技术，就可以确保下方的基础镜像层不会被修改.无论通过该基础镜像启动了多少个容器,这些容器的底层基础镜像都是一致的。换言之，N个使用了同一个基础镜像的容器,是共享了1个基础镜像层的文件,而非每个容器各持有一份基础镜像层文件的拷贝。</p>
<p>当需要修改基础镜像层时,是在位于该层上方的可写层中对基础层的文件做修改,最终结果相当于在上方的文件层中对下方的基础层做覆盖的操作。</p>
<h4 id="用时分配" tabindex="-1"><a class="header-anchor" href="#用时分配" aria-hidden="true">#</a> 用时分配</h4>
<p>按需分配空间,而非提前分配,即当一个文件被创建出来后,才会分配空间</p>
<h3 id="容器存储驱动优缺点比较以及应用" tabindex="-1"><a class="header-anchor" href="#容器存储驱动优缺点比较以及应用" aria-hidden="true">#</a> 容器存储驱动优缺点比较以及应用</h3>
<p>写时复制的行为需要容器的存储驱动来支持：</p>
<table>
<thead>
<tr>
<th>存储驱动</th>
<th>Docker</th>
<th>Containerd</th>
</tr>
</thead>
<tbody>
<tr>
<td>AUFS</td>
<td>在Ubuntu或Debian上支持</td>
<td>不支持</td>
</tr>
<tr>
<td>OverlayFS</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>Device Mapper</td>
<td>支持</td>
<td>支持</td>
</tr>
<tr>
<td>BtrFS</td>
<td>社区版本在Ubuntu或Debian上支持,企业版本在SLES上支持</td>
<td>支持</td>
</tr>
<tr>
<td>ZFS</td>
<td>支持</td>
<td>不支持</td>
</tr>
</tbody>
</table>
<p>为什么用 OverlayFS</p>
<table>
<thead>
<tr>
<th>存储驱动</th>
<th>优点</th>
<th>缺点</th>
<th>应用场景</th>
</tr>
</thead>
<tbody>
<tr>
<td>AUFS</td>
<td>Docker最早支持的驱动类型,稳定性高</td>
<td>并未进入主线的内核,因此只能在有限的场合下使用.另外在实现上具有多层结构,在层比较多的场景下,做写时复制有时会需要比较长的时间</td>
<td>少I/O的场景</td>
</tr>
<tr>
<td>OverlayFS</td>
<td>并入主线内核,可以在目前几乎所有发行版本上使用.实现只有2层,因此性能比AUFS高</td>
<td>写时复制机制需要复制整个文件,而不能只针对修改的部分进行复制,因此大文件操作会需要比较长的时间.其中Overlay在Docker的后续版本中被移除</td>
<td>少I/O的场景</td>
</tr>
<tr>
<td>Device Mapper</td>
<td>并入主线内核,针对块操作,性能比较高.修改文件时只需复制需要修改的块,效率高</td>
<td>不同容器之间不能共享缓存。在Dokcer的后续版本中会被移除</td>
<td>I/O密集场景</td>
</tr>
<tr>
<td>BtrFS</td>
<td>并入主线内核,虽然是文件级操作系统,但是可以对块进行操作</td>
<td>需要消耗比较多的内存,稳定性相对比较差</td>
<td>需要支持Snapshot等比较特殊的场景</td>
</tr>
<tr>
<td>ZFS</td>
<td>不同的容器之间可以共享缓存,多个容器访问相同的文件能够共享一个单一的Page Cache</td>
<td>在频繁写操作的场景下,会产生比较严重的磁盘碎片.需要消耗比较多的内存,另外稳定性相对比较差</td>
<td>容器高密度部署的场景</td>
</tr>
</tbody>
</table>
<h3 id="overlayfs" tabindex="-1"><a class="header-anchor" href="#overlayfs" aria-hidden="true">#</a> OverlayFS</h3>
<p>OverlayFS 也是一种与AUFS类似的联合文件系统，同样属于文件级的存储驱动，包含了最初的Overlay和更新更稳定的 OverlayFS2.</p>
<p><strong>Overlay只有2层：upper层和lower层</strong></p>
<ul>
<li><code v-pre>lower</code>层代表镜像层</li>
<li><code v-pre>upper</code>层代表容器可写层</li>
</ul>
<p><img src="http://sm.cubxxw.com/sm202303021935227.png" alt="image-20230302193525073"></p>
<p><strong>由此可见，如果一个文件在上层或者是在下层，那么他们在合并层是可见的。</strong></p>
<p><strong>如果一个文件在上下层都存在，那么就会出现在上层。</strong></p>
<p>所以基础镜像是下层，每一次都叠加一次，最终看到的操作系统就是上层的。</p>
<h3 id="overlayfs文件系统演示" tabindex="-1"><a class="header-anchor" href="#overlayfs文件系统演示" aria-hidden="true">#</a> OverlayFS文件系统演示</h3>
<p><strong>之前我们一直都没做镜像，我用 centos 镜像测试：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-it</span> <span class="token parameter variable">--name</span> centos2 centos
<span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> daddac4c0706 <span class="token function">bash</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在容器内创建目录：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@daddac4c0706 /<span class="token punctuation">]</span><span class="token comment"># ls </span>
bin  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
<span class="token punctuation">[</span>root@daddac4c0706 /<span class="token punctuation">]</span><span class="token comment"># mkdir upper lower merged work;ls</span>
bin  etc   lib    lost+found  media   mnt  proc  run   srv  tmp    usr  work
dev  home  lib64  lower       merged  opt  root  sbin  sys  upper  var
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>分别创建不同的文件：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">echo</span> <span class="token string">"from lower"</span> <span class="token operator">></span> lower/in_lower.txt
<span class="token builtin class-name">echo</span> <span class="token string">"from upper"</span> <span class="token operator">></span> upper/in_upper.txt
<span class="token builtin class-name">echo</span> <span class="token string">"from lower"</span> <span class="token operator">></span> lower/in_both.txt
<span class="token builtin class-name">echo</span> <span class="token string">"from upper"</span> <span class="token operator">></span> upper/in_both.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>接下来要演示的是:将<code v-pre>upper</code>目录和<code v-pre>lower</code>目录整合到一起后,文件的内容会有什么样的</p>
</blockquote>
<p><strong>挂载一个OverlayFS文件系统：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@daddac4c0706 /<span class="token punctuation">]</span><span class="token comment"># exit</span>
<span class="token builtin class-name">exit</span>
<span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># mkdir -p /tmp/overlayfs; cd /tmp/overlayfs</span>
<span class="token punctuation">[</span>root@dev overlayfs<span class="token punctuation">]</span><span class="token comment">#  mkdir upper lower merged work;ls</span>
lower  merged  upper  work
<span class="token punctuation">[</span>root@dev overlayfs<span class="token punctuation">]</span><span class="token comment"># echo "from lower" > lower/in_lower.txt</span>
<span class="token punctuation">[</span>root@dev overlayfs<span class="token punctuation">]</span><span class="token comment"># echo "from upper" > upper/in_upper.txt</span>
<span class="token punctuation">[</span>root@dev overlayfs<span class="token punctuation">]</span><span class="token comment"># echo "from lower" > lower/in_both.txt</span>
<span class="token punctuation">[</span>root@dev overlayfs<span class="token punctuation">]</span><span class="token comment"># echo "from upper" > upper/in_both.txt</span>
<span class="token punctuation">[</span>root@dev overlayfs<span class="token punctuation">]</span><span class="token comment"># sudo mount -t overlay overlay -o lowerdir=`pwd`/lower,upperdir=`pwd`/upper,workdir=`pwd`/work `pwd`/merged</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>目录结构：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev overlayfs2<span class="token punctuation">]</span><span class="token comment"># tree</span>
<span class="token builtin class-name">.</span>
├── lower
│   ├── in_both.txt
│   └── in_lower.txt
├── merged
│   ├── in_both.txt    <span class="token comment"># delete</span>
│   ├── in_lower.txt
│   └── in_upper.txt
├── upper
│   ├── in_both.txt
│   └── in_upper.txt
└── work
    └── work
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>挂载指令解析：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">mount</span> <span class="token parameter variable">-t</span> overlay overlay <span class="token parameter variable">-o</span> <span class="token assign-left variable">lowerdir</span><span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">pwd</span><span class="token variable">`</span></span>/lower,upperdir<span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">pwd</span><span class="token variable">`</span></span>/upper,workdir<span class="token operator">=</span><span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">pwd</span><span class="token variable">`</span></span>/work <span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">pwd</span><span class="token variable">`</span></span>/merged
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li><code v-pre>-t</code>:指定文件系统类型</li>
<li><code v-pre>lowerdir</code>:指定用户要挂载的lower层目录</li>
<li><code v-pre>upperdir</code>:指定用户要挂载的upper层目录</li>
<li><code v-pre>workdir</code>:指定文件系统的工作基础目录.挂载后该目录会被清空,且在使用过程中其内容对用户不可见</li>
<li><code v-pre>pwd/merged</code>:这并不是参数,而是指定最终挂载的目录</li>
</ul>
<p><strong>查看<code v-pre>./merged</code>目录中的内容</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev overlayfs2<span class="token punctuation">]</span><span class="token comment"># cd merged/</span>
<span class="token punctuation">[</span>root@dev merged<span class="token punctuation">]</span><span class="token comment"># cat in_both.txt in_lower.txt in_upper.txt</span>
from upper
from lower
from upper
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>这是合并后的层</p>
</blockquote>
<p>可以看到，当把2(多)个目录通过<code v-pre>overlay</code>的形式<code v-pre>mount</code>到一个虚拟目录时，在这个新的虚拟目录中，会整合来自上层和下层的文件。最终这个虚拟目录中会整合多个目录中的文件，如果遇到同名文件，则上层的文件会覆盖下层的文件。</p>
<p>回到容器镜像上，基础镜像层就相当于演示中的lower层。</p>
<p>若需要在这个基础镜像层中添加一些内容，则在这个基础镜像层上再加一个新的容器层,然后通过<code v-pre>overlayFS</code>的形式将这个新的容器层<code v-pre>mount</code>进去即可.</p>
<p>若需要在这个基础镜像层中做一些修改,也不需要去修改lower层,只需在上方堆叠一个同名文件即可。新的文件会覆盖掉下层中已存在的文件.</p>
<p><strong>在<code v-pre>./merged</code>中删除文件：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev merged<span class="token punctuation">]</span><span class="token comment">#  rm -f ./in_both.txt;tree ../</span>
<span class="token punctuation">..</span>/
├── lower
│   ├── in_both.txt
│   └── in_lower.txt
├── merged
│   ├── in_lower.txt
│   └── in_upper.txt
├── upper
│   ├── in_both.txt
│   └── in_upper.txt
└── work
    └── work

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>我们删除掉了 合并层 <code v-pre>in_both.txt</code> 文件，看看有没有影响到</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev merged<span class="token punctuation">]</span><span class="token comment"># cat ../upper/in_both.txt</span>
cat: <span class="token punctuation">..</span>/upper/in_both.txt: No such device or address
<span class="token punctuation">[</span>root@dev merged<span class="token punctuation">]</span><span class="token comment"># cat ../lower/in_both.txt </span>
from lower
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code v-pre>upper/in_both.txt</code>被删除了。但<code v-pre>lower/in_both.txt</code>没有受到删除操作的影响。</p>
<blockquote>
<p>对比到 docker ，容器层被删除了，但是 镜像（只读层没变化）</p>
</blockquote>
<p><strong>删除<code v-pre>in_lower.txt</code>（镜像）</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev merged<span class="token punctuation">]</span><span class="token comment"># rm -f ./in_lower.txt;tree ../</span>
<span class="token punctuation">..</span>/
├── lower
│   ├── in_both.txt
│   └── in_lower.txt
├── merged
│   └── in_upper.txt
├── upper
│   ├── in_both.txt
│   ├── in_lower.txt
│   └── in_upper.txt
└── work
    └── work

<span class="token number">5</span> directories, <span class="token number">6</span> files

<span class="token punctuation">[</span>root@dev merged<span class="token punctuation">]</span><span class="token comment"># cat ../upper/in_lower.txt </span>
cat: <span class="token punctuation">..</span>/upper/in_lower.txt: No such device or address

<span class="token punctuation">[</span>root@dev merged<span class="token punctuation">]</span><span class="token comment"># cat ../lower/in_lower.txt </span>
from lower
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code v-pre>upper/</code>目录中多了一个文件<code v-pre>in_lower.txt</code>。但这个文件是不存在的。但<code v-pre>lower/in_lower.txt</code>没有受到删除操作的影响.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev merged<span class="token punctuation">]</span><span class="token comment"># cd ..;ls -al upper</span>
total <span class="token number">12</span>
drwxr-xr-x <span class="token number">2</span> root root <span class="token number">4096</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:16 <span class="token builtin class-name">.</span>
drwxr-xr-x <span class="token number">6</span> root root <span class="token number">4096</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:06 <span class="token punctuation">..</span>
c--------- <span class="token number">1</span> root root <span class="token number">0</span>, <span class="token number">0</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:11 in_both.txt
c--------- <span class="token number">1</span> root root <span class="token number">0</span>, <span class="token number">0</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:16 in_lower.txt
-rw-r--r-- <span class="token number">1</span> root root   <span class="token number">11</span> Mar  <span class="token number">2</span> <span class="token number">20</span>:06 in_upper.txt
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p>注:<code v-pre>c---------</code>中的<code v-pre>c</code>表示字符设备文件</p>
</blockquote>
<p><strong>删除<code v-pre>in_upper.txt</code></strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev overlayfs2<span class="token punctuation">]</span><span class="token comment"># rm ./merged/in_upper.txt -f</span>
<span class="token punctuation">[</span>root@dev overlayfs2<span class="token punctuation">]</span><span class="token comment"># tree</span>
<span class="token builtin class-name">.</span>
├── lower
│   ├── in_both.txt
│   └── in_lower.txt
├── merged
├── upper
│   ├── in_both.txt
│   └── in_lower.txt
└── work
    └── work

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到： <code v-pre>upper/in_upper.txt</code>确实被删除了.</p>
<h3 id="inspect" tabindex="-1"><a class="header-anchor" href="#inspect" aria-hidden="true">#</a> inspect</h3>
<div class="language-markdown ext-md line-numbers-mode"><pre v-pre class="language-markdown"><code><span class="token title important"><span class="token punctuation">#</span> docker inspect daddac4c0706</span>

<span class="token code"><span class="token punctuation">```</span><span class="token code-language">bash</span>
<span class="token code-block language-bash language-bash language-bash">        <span class="token string">"Image"</span><span class="token builtin class-name">:</span> <span class="token string">"sha256:5d0da3dc976460b72c77d94c8a1ad043720b0416bfc16c52c45d4847e53fadb6"</span>,
        <span class="token string">"ResolvConfPath"</span><span class="token builtin class-name">:</span> <span class="token string">"/var/lib/docker/containers/daddac4c07067978995724d650ed8a6f0f8d8edfc979f13c9883f1a6971b904a/resolv.conf"</span>,
        <span class="token string">"HostnamePath"</span><span class="token builtin class-name">:</span> <span class="token string">"/var/lib/docker/containers/daddac4c07067978995724d650ed8a6f0f8d8edfc979f13c9883f1a6971b904a/hostname"</span>,
        <span class="token string">"HostsPath"</span><span class="token builtin class-name">:</span> <span class="token string">"/var/lib/docker/containers/daddac4c07067978995724d650ed8a6f0f8d8edfc979f13c9883f1a6971b904a/hosts"</span>,
        <span class="token string">"LogPath"</span><span class="token builtin class-name">:</span> <span class="token string">""</span>,</span>
<span class="token punctuation">```</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-引擎架构" tabindex="-1"><a class="header-anchor" href="#docker-引擎架构" aria-hidden="true">#</a> docker 引擎架构</h3>
<p><img src="http://sm.cubxxw.com/sm202303022022669.png" alt="image-20230302202242442"></p>
<ul>
<li><code v-pre>Docker daemon</code>：Docker后台的服务端，事实上是一套 REST API</li>
<li><code v-pre>Docker command</code>：命令行.可以把docker的命令作为一个请求发送给 Docker daemon</li>
<li><code v-pre>containerd</code>：用于控制运行时进程的组件，Docker daemon接收到该请求后，通过GRPC的调用，把请求转发到<code v-pre>containerd</code>上</li>
<li><code v-pre>shim</code>进程：<code v-pre>containerd</code>收到请求后，启动一个<code v-pre>shim</code>进程。<code v-pre>shim</code>进程通过<code v-pre>runc</code>(底层运行时的一个接口)启动容器进程</li>
</ul>
<p><strong>shim的作用</strong>：在早期,containerd和shim是不存在的.那个时代,当你通过docker命令去运行一个容器进程时,这个容器进程是由docker daemon直接拉起的。</p>
<p><strong>这样设计的问题</strong>：docker daemon成为了所有容器进程的父进程.当你升级或重启docker时,父进程就不存在了，子进程也会被重启.这导致的问题是:你无法轻易升级docker.对于早期的docker来讲,这是一个致命问题。</p>
<p><code v-pre>containerd</code>启动了一个<code v-pre>shim</code>进程后，会将该shim交给OS的<code v-pre>init system</code>(比如systemd)。这样 containerd下面是不挂任何进程的，可以随意升级或重启。即：<strong>把控制组件和数据面组件分离</strong></p>
<blockquote>
<p>docker 结构图 我们都知道，我们开始学 docker 的时候第一件事就是看架构，不管什么项目，始于架构，也忠于架构。</p>
<ul>
<li><a href="https://docker.cubxxw.com/markdown/2.html" target="_blank" rel="noopener noreferrer">docker 系统架构笔记<ExternalLinkIcon/></a></li>
</ul>
</blockquote>
<h2 id="网络" tabindex="-1"><a class="header-anchor" href="#网络" aria-hidden="true">#</a> 网络</h2>
<p><strong>😍 终于到了 网络 部分了，docker 网络是可以有 独立的 namespace ，但是也并不是这么简单的，接下来该好好研究网络了。</strong></p>
<ul>
<li><a href="https://docker.cubxxw.com/markdown/30.html" target="_blank" rel="noopener noreferrer">关于 docker 网络的基础，入门级别使用篇，请看这一篇我写的笔记<ExternalLinkIcon/></a></li>
</ul>
<p><strong>docker网络的几种模式：</strong></p>
<ul>
<li>bridge模式（默认）：使用<code v-pre>--network bridge</code>指定，默认使用<code v-pre>docker0</code></li>
<li>host模式：使用<code v-pre>--network host</code>指定</li>
<li>none模式：使用<code v-pre>--network none</code>指定（Kubernetes需要）</li>
<li>container模式：使用<code v-pre>--network container:NAME</code>或者容器ID指定（复用其他容器的网络）</li>
</ul>
<p>看到 docker0 就有一种神秘的亲切感，Kubernetes 的网络设计也是参考 docker~</p>
<blockquote>
<p>你可以把 docker0 理解为一个交换机~</p>
<p>如果上层有Kubernetes这种编排系统,Kubernetes希望通过自己的网络插件来配置网络,此时就应该使用Null模式来创建一个镜像</p>
<p>⚠️ 注意，虽然什么都不做，但是用户希望全权处理容器的网络配置时使用 nono，Docker不为用户做任何配置，但是会为用户把网络的namespace创建出来.</p>
</blockquote>
<h3 id="跨主机的网络模式" tabindex="-1"><a class="header-anchor" href="#跨主机的网络模式" aria-hidden="true">#</a> 跨主机的网络模式</h3>
<p><strong>Remote(work with remote dirvers)</strong></p>
<ul>
<li><code v-pre>Underlay</code>:
<ul>
<li>使用现有底层网络，为每一个容器配置可路由的网络IP</li>
<li>这种模式容器网络和主机网络是一样的.容器的IP段在主机层面知道如何路由.这样一来容器的数据包就可以自由传输.</li>
<li>这种模式的局限性:容器网络和主机网络共用,但容器网络对IP的消耗是巨大的.所以如果采用这种模式实现跨主机的容器间通信,需要提前规划好网段(比如有多大的网段分给容器,有多大的网段分给基础架构)</li>
</ul>
</li>
<li><code v-pre>Overlay</code>:
<ul>
<li>通过网络封包实现</li>
<li>通常容器网络和底层基础架构网络是两套网络。容器有自己的子网，这个子网在底层网络中是不能路由的。也就是说,容器网络中的网络请求是不能在基础网络中传输的,数据包是传不过去的。</li>
<li>想要实现跨主机的容器间互联互通，就需要基于Overlay技术。当容器发出的数据包要通过主机向外传输时，在主机层面再封装一层。在原始数据包的基础上通过各种协议再加一层包头，这个包头会把当前主机地址作为原地址，把对端主机地址作为目标地址。封装好的数据包就可以在基础架构网络中传输了</li>
<li>数据包到达对端主机后，对端主机解包.解开主机一层包头后,剩下的就是容器的数据包头。这样一来数据包就可以到达对端主机上的容器了</li>
</ul>
</li>
</ul>
<h3 id="单节点的容器网络模式" tabindex="-1"><a class="header-anchor" href="#单节点的容器网络模式" aria-hidden="true">#</a> 单节点的容器网络模式</h3>
<p><strong>我们上面说过 NONO 是一个空实现</strong></p>
<ul>
<li>Null模式是一个空实现</li>
<li>可以通过Null模式启动容器并在宿主机上通过命令为容器配置网络</li>
</ul>
<h4 id="案例-2" tabindex="-1"><a class="header-anchor" href="#案例-2" aria-hidden="true">#</a> 案例</h4>
<p>创建一个网络模式为Null的容器,并为该容器配置网络</p>
<p><strong>运行一个nginx的容器,并且将网络模式设置成Null</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># docker run --network=none -d nginx</span>
9dcdea440a927d7b7c60c0df3dab06b2b3cd3258507b07de339b31bd10c92d92

<span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># docker ps</span>
CONTAINER ID        IMAGE                          COMMAND                  CREATED              STATUS                       PORTS                    NAMES
9dcdea440a92        nginx                          <span class="token string">"/docker-entrypoin..."</span>   About a minute ago   Up <span class="token number">57</span> seconds                                         loving_nightingale
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>检查该容器进程的pid：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># docker inspect 9dcde|grep -i pid</span>
            <span class="token string">"Pid"</span><span class="token builtin class-name">:</span> <span class="token number">9737</span>,
            <span class="token string">"PidMode"</span><span class="token builtin class-name">:</span> <span class="token string">""</span>,
            <span class="token string">"PidsLimit"</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在宿主机上查看容器进程的网络情况</strong></p>
<p><img src="http://sm.cubxxw.com/sm202303022228599.png" alt="image-20230302222853324"></p>
<p>可以看到只有loopback地址,没有其他网络配置。也就是说现在是无法通过外部的网络调用来访问这个服务的，但是该进程的 <code v-pre>network namespace</code> 是已经被建立了.</p>
<p><strong>创建容器进程的network namespace</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># mkdir -p /var/run/netns</span>
<span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># export pid=9737</span>
<span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># ln -s /proc/$pid/ns/net /var/run/netns/$pid</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此处创建目录的目的：<strong>当我们希望把一个进程关联到一个<code v-pre>network namespace</code>上时，就需要有一个地方来保存network namespace的相关信息</strong>(如：有哪些network namespace、这些network namespace关联了哪些进程等信息)。这个地方就是<code v-pre>/var/run/netns/</code>.</p>
<p>此处创建软连接的目的:<code v-pre>/proc/$pid/ns/net</code>是容器进程的network namespace信息 ，<code v-pre>/var/run/netns/$pid</code>是我们自己创建的,用于保存容器进程的network namespace的目录.此处建立软连接是为了后续操作，在创建了链路之后,连接容器进程的network namespace和主机的network namespace用。</p>
<blockquote>
<p>⚠️ <strong>注:某些程序启动服务后,会将它们PID放置在<code v-pre>/var/run/</code>目录下</strong></p>
</blockquote>
<p><strong>检查容器进程的network namespace是否能在主机上被查看到</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># ip netns list</span>
<span class="token number">9737</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>ip netns</code>：用于管理network namespace。它可以创建命名的 network namespace,然后通过名字来引用network namespace</li>
<li><code v-pre>ip netns list</code>：显示所有命名的network namesapce，其<strong>实就是显示<code v-pre>/var/run/netns</code>目录下的所有network namespace对象</strong></li>
</ul>
<p><strong>查看Docker的网桥设备：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># if bridge-utils;then bridge;else yum install bridge-utils; fi</span>

<span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># brctl show</span>
bridge name	bridge <span class="token function">id</span>		STP enabled	interfaces
docker0		<span class="token number">8000</span>.02420bb43568	no
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当安装完Docker后，Docker默认在主机上会安装一个Bridge(桥接设备,可以理解为是一个集线器,该集线器上有很多网口。当多台主机的网线都连接到该Bridge设备后，这些主机之间就可以互通了)，该设备用于连接当前主机上的所有容器。</p>
<p><strong>有了网桥设备，想要让容器内的网络和主机互通,就比较容易了，其实只需要做2件事:</strong></p>
<ol>
<li>为容器进程配置网络</li>
<li>从容器的网络中牵一根网线到主机的namespace,并且插在docker0的Bridge上</li>
</ol>
<p>这样主机网络和容器网络就可以互通了</p>
<h3 id="默认模式–网桥和nat" tabindex="-1"><a class="header-anchor" href="#默认模式–网桥和nat" aria-hidden="true">#</a> 默认模式–网桥和NAT</h3>
<p>Docker网络的默认模式就是桥接。桥接其实就是刚才演示中的那些步骤.</p>
<p>不指定网络模式时，docker在网络连接方面做的工作，和我们刚才演示的是一样的。</p>
<h4 id="案例-3" tabindex="-1"><a class="header-anchor" href="#案例-3" aria-hidden="true">#</a> 案例</h4>
<p><strong>不指定网络模式，启动一个nginx容器</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># docker run -d nginx;docker ps</span>
9f27121bb2f4ea27809830be982a705852430c7ed324b810ee2658452f289758
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="http://sm.cubxxw.com/sm202303022249976.png" alt="image-20230302224925864"></p>
<p><strong>查看该容器的网络设备情况</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># docker inspect 9f|grep -i pid</span>
            <span class="token string">"Pid"</span><span class="token builtin class-name">:</span> <span class="token number">19942</span>,
            <span class="token string">"PidMode"</span><span class="token builtin class-name">:</span> <span class="token string">""</span>,
            <span class="token string">"PidsLimit"</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看容器网络：</strong></p>
<p><img src="http://sm.cubxxw.com/sm202303022251344.png" alt="image-20230302225109202"></p>
<blockquote>
<p>可以看到,该容器的IP地址为:<code v-pre>172.17.0.5</code>，还可以这样：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@dev workspces<span class="token punctuation">]</span><span class="token comment"># docker inspect 9f | grep -i ip</span>
            <span class="token string">"IpcMode"</span><span class="token builtin class-name">:</span> <span class="token string">""</span>,
            <span class="token string">"LinkLocalIPv6Address"</span><span class="token builtin class-name">:</span> <span class="token string">""</span>,
            <span class="token string">"LinkLocalIPv6PrefixLen"</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">"SecondaryIPAddresses"</span><span class="token builtin class-name">:</span> null,
            <span class="token string">"SecondaryIPv6Addresses"</span><span class="token builtin class-name">:</span> null,
            <span class="token string">"GlobalIPv6Address"</span><span class="token builtin class-name">:</span> <span class="token string">""</span>,
            <span class="token string">"GlobalIPv6PrefixLen"</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
            <span class="token string">"IPAddress"</span><span class="token builtin class-name">:</span> <span class="token string">"172.17.0.5"</span>,
            <span class="token string">"IPPrefixLen"</span><span class="token builtin class-name">:</span> <span class="token number">16</span>,
            <span class="token string">"IPv6Gateway"</span><span class="token builtin class-name">:</span> <span class="token string">""</span>,
                    <span class="token string">"IPAMConfig"</span><span class="token builtin class-name">:</span> null,
                    <span class="token string">"IPAddress"</span><span class="token builtin class-name">:</span> <span class="token string">"172.17.0.5"</span>,
                    <span class="token string">"IPPrefixLen"</span><span class="token builtin class-name">:</span> <span class="token number">16</span>,
                    <span class="token string">"IPv6Gateway"</span><span class="token builtin class-name">:</span> <span class="token string">""</span>,
                    <span class="token string">"GlobalIPv6Address"</span><span class="token builtin class-name">:</span> <span class="token string">""</span>,
                    <span class="token string">"GlobalIPv6PrefixLen"</span><span class="token builtin class-name">:</span> <span class="token number">0</span>,
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></blockquote>
<h4 id="端口映射" tabindex="-1"><a class="header-anchor" href="#端口映射" aria-hidden="true">#</a> 端口映射</h4>
<p><strong>若想要把容器内部的服务发布到主机上,该怎么做?</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> nginx <span class="token parameter variable">-p</span> <span class="token number">8080</span>:80 nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>其底层逻辑为:</strong>  Docker以标准模式配置网络</p>
<ul>
<li>
<p>创建veth pair</p>
</li>
<li>
<p>将veth pair的一端连接到docker0网桥</p>
</li>
<li>
<p>veth pair的另一端设置为容器network namespace的eth0</p>
</li>
<li>
<p>为容器network namespace的eth0分配ip</p>
</li>
<li>
<p>主机上的iptables规则:<code v-pre>PREROUTING -A DOCKER ! -i docker0 -p tcp -m tcp -dport 2333 -j DNAT --to-destination 172.17.0.2:22</code></p>
<blockquote>
<p>实际上就是通过主机的iptable做了一个端口转发.</p>
</blockquote>
</li>
</ul>
<h3 id="多节点的容器网络模式" tabindex="-1"><a class="header-anchor" href="#多节点的容器网络模式" aria-hidden="true">#</a> 多节点的容器网络模式</h3>
<h4 id="underlay" tabindex="-1"><a class="header-anchor" href="#underlay" aria-hidden="true">#</a> Underlay</h4>
<p>从实现上最容易的就是Underlay模式.</p>
<ul>
<li>采用Linux网桥设备(sbrctl),通过物理网络连通容器</li>
<li>创建新的网桥设备mydr0</li>
<li>将主机网卡加入网桥</li>
<li>把主机网卡的地址配置到网桥,并把默认路由规则转移到网桥mydr0</li>
<li>启动容器</li>
<li>创建veth pair,把一个peer添加到网桥mydr0</li>
<li>配置容器把veth的另一个peer分配给容器网卡</li>
</ul>
<p>也就是说,Underlay模式是不划分独立的容器网络,而是容器网络融入到基础架构网络中.</p>
<ul>
<li>优点:方案简单</li>
<li>缺点:需要较强的网段规划能力.因为容器对IP的需求很大,所以要事先规划好所有IP的分配,避免造成IP的浪费.</li>
</ul>
<h4 id="docker-libnetwork-overlay" tabindex="-1"><a class="header-anchor" href="#docker-libnetwork-overlay" aria-hidden="true">#</a> Docker Libnetwork Overlay</h4>
<ul>
<li>Docker overlay网络驱动原生支持多主机网络</li>
<li>Libnetwork是一个内置的基于VXLAN的网络驱动</li>
</ul>
<p>VXLAN是Overlay网络中最常用的一种模式.</p>
<blockquote>
<p>Kubernetes中的网络插件Flannel支持Overlay模式</p>
<ul>
<li>同一主机内的Pod可以使用网桥进行通信</li>
<li>不同主机上的Pod将通过flanneld将其流量封装在UDP数据包中</li>
</ul>
</blockquote>
<h2 id="dockerbuild" tabindex="-1"><a class="header-anchor" href="#dockerbuild" aria-hidden="true">#</a> Dockerbuild</h2>
<ul>
<li><a href="https://docker.cubxxw.com/markdown/24.html" target="_blank" rel="noopener noreferrer">如果你对 dockerfile 基础不是很了解，请看我写的这篇文章~<ExternalLinkIcon/></a></li>
</ul>
<p>Dockerfile：用来构建镜像的文档，文档内容包含了一条构建镜像所需要的命令和说明。可以认为是创建一个虚拟机时，对操作的一个。</p>
<p>可以基于Dockerfile来定义整个容器镜像。包括容器的基础镜像、中间件、可运行的文件等。</p>
<p><code v-pre>docker build</code>命令会依次读取并运行 Dockerfile 中的命令，把这些命令转换成一个真实的容器镜像。</p>
<p><strong>通常一个容器镜像分为2部分：</strong></p>
<ol>
<li>描述文件（元数据）</li>
<li>二进制文件</li>
</ol>
<h3 id="理解构建上下文-build-context" tabindex="-1"><a class="header-anchor" href="#理解构建上下文-build-context" aria-hidden="true">#</a> 理解构建上下文 (build context)</h3>
<p>我们在阅读源码的时候，经常看到 build context，不管是 sealer、sealos、Kubernetes、k3s……</p>
<ul>
<li>
<p>当运<code v-pre>docker build</code>命令时，<strong>当前工作目录被称为构建上下文</strong></p>
</li>
<li>
<p><code v-pre>docker build</code>默认查找当前目录的<code v-pre>Dockerfile</code>作构造输入，也可以通过<code v-pre>-f</code>参数指定<code v-pre>Dockerfile</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> build <span class="token parameter variable">-f</span> ./Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li>
<li>
<p>当<code v-pre>docker build</code>运行时，首先会把构建上下文传给docker daemon，把没有用的文件包包含在构建上下文中，会导致传播时间长，构建需要的资源架构出鞄鲧</p>
<ul>
<li>可以通过<code v-pre>.dockerignore</code>文件从构建上下文中排除某些文件</li>
</ul>
</li>
<li>
<p>因此需要确保构建上文清晰，比如创建一个专门的目录放Dockerfile，并在目录中运行<code v-pre>docker build</code></p>
</li>
</ul>
<h3 id="构建缓存-build-cache" tabindex="-1"><a class="header-anchor" href="#构建缓存-build-cache" aria-hidden="true">#</a> 构建缓存(Build Cache)</h3>
<p>镜像构建日志：使用<code v-pre>docker build</code>命令构建镜像时，打印每一步(每一层或Dockerfile中的每一条指令)执行过程的输出内容。通过日志可以知道构建的每一个步骤.</p>
<p>注意日志中的<code v-pre>Using cache</code>的部分，即构建缓存。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># docker build $GOPATH/src/httpServer</span>
Sending build context to Docker daemon  <span class="token number">7</span>.228MB
Step <span class="token number">1</span>/9 <span class="token builtin class-name">:</span> FROM ubuntu
 ---<span class="token operator">></span> ba6acccedd29
Step <span class="token number">2</span>/9 <span class="token builtin class-name">:</span> ENV <span class="token assign-left variable">MY_SERVICE_PORT</span><span class="token operator">=</span><span class="token number">80</span>
 ---<span class="token operator">></span> Using cache
 ---<span class="token operator">></span> 08b186233bb0
<span class="token punctuation">..</span><span class="token punctuation">..</span><span class="token punctuation">..</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Docker <strong>从上往下读取指令后</strong>，会先判别存储中是否有可用的已存储镜像，只有已存储镜像不存在时，才会重新构建。否则重复使用(reuse)已存储镜像。</p>
<ul>
<li>
<p>通常Docker简单判定Dockerfile中的命令与镜像</p>
</li>
<li>
<p>指针<code v-pre>ADD</code>和<code v-pre>COPY</code>命令，Docker判断应该镜像层每个被复制的文件的内容并生成一个checksum（校验和），与现有镜像比较时，比较的是二方的校验和</p>
</li>
<li>
<p>其他指令，比如<code v-pre>RUN apt-get -y update</code>，Docker简单比较与现有镜像中的指令字符串是否一致</p>
</li>
<li>
<p>当某一层cache失效后，所有层级的cache均一并失效，后续指令都重新构建镜像</p>
<blockquote>
<p>因此，在构建镜像时，应该尽量把<strong>很久才更新一次的(或者可以说不动的)层放在下面，把频繁更新的层放在上面</strong>。用于防止一个层缓存失效后，该层之上所有的层都缓存失效的问题。</p>
<p>⚠️ 再多解释一下，就是那些 不稳定 的命令写在前面（在下层），那些 稳当 的写在后面（在上层），符合构建策略~</p>
</blockquote>
</li>
</ul>
<h3 id="多段构建-multi-stage-build" tabindex="-1"><a class="header-anchor" href="#多段构建-multi-stage-build" aria-hidden="true">#</a> 多段构建(Multi-stage build)</h3>
<p>有一种场景，我来描述一下：</p>
<blockquote>
<p>我们构建一个业务，需要很多依赖包，正常情况下 我们 去拉取、构建、但是我们可能只需要最后一个内容或者文件，所以中间很多依赖我们可能需要去清理、删除。</p>
<p><strong>场景</strong>：此时需编译一个容器镜像，该容器镜像中运行一个GO语言编写的进程，请以最终运行该进程的镜像体积尽可能小为目标，编译容器镜像。</p>
<p>GO语言的项目通常有<code v-pre>vendor/</code>目录，因此编译时需要拉取第三方依赖包。需要注意的是,此时拉取的是第三方包的源代码，拉取之后才能完成项目的编译工作/但最终容器镜像需要的并不是这些源码，仅仅是编译之后的二进制文件，可是编译的过程又会把源代码拉取到本地,这些源代码会影响最终编译出来的镜像的体积。因此需要多段构建~</p>
<p><strong>多段构建</strong>: 在1个Dockerfile中，指定多个要构建的镜像。其中一个镜像(为方便描述称该镜像为镜像A)用于编译项目，将编译好的二进制文件放到指定的目录；另一个镜像用于运行该二进制文件(为方便描述称该镜像为镜像B)。镜像B从镜像A指定的目录中将二进制文件复制到镜像B中，并运行该二进制文件。</p>
<p>所以中间有很多没必要的依赖包，比如说我们只需要最后的二进制文件。所以 docker 提供多段构建，分成多个部分：</p>
<div class="language-docker ext-docker line-numbers-mode"><pre v-pre class="language-docker"><code>root@docker-test:/home/roach/dockerGoImg# cat Dockerfile 
<span class="token comment"># 编译用镜像</span>
<span class="token instruction"><span class="token keyword">ARG</span> GO_VERSION=1.17.6</span>
<span class="token comment"># 命名编译用镜像为builder</span>
<span class="token instruction"><span class="token keyword">FROM</span> golang:<span class="token variable">${GO_VERSION}</span> <span class="token keyword">as</span> builder</span>
<span class="token instruction"><span class="token keyword">RUN</span> mkdir -p /go/src/test</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /go/src/test</span>
<span class="token instruction"><span class="token keyword">COPY</span> main.go .</span>
<span class="token instruction"><span class="token keyword">RUN</span> go mod init testGoProject</span>
<span class="token instruction"><span class="token keyword">RUN</span> CGO_ENABLED=0 GOOS=linux go build -o app .</span>

<span class="token comment"># 运行用镜像</span>
<span class="token instruction"><span class="token keyword">FROM</span> alpine:latest</span>
<span class="token instruction"><span class="token keyword">RUN</span> apk --no-cache add ca-certificates</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /root/</span>
<span class="token comment"># 从镜像builder处复制文件</span>
<span class="token instruction"><span class="token keyword">COPY</span> <span class="token options"><span class="token property">--from</span><span class="token punctuation">=</span><span class="token string">builder</span></span> /go/src/test/app .</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">"./app"</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>我们把临时的 都放在 早期 <code v-pre>golang:${GO_VERSION} as builder</code></strong></p>
<p><strong>真正需要的放在 <code v-pre>app</code> 二进制文件放在后面 ~</strong></p>
</blockquote>
<h3 id="dockerfile-最佳实践建议" tabindex="-1"><a class="header-anchor" href="#dockerfile-最佳实践建议" aria-hidden="true">#</a> Dockerfile 最佳实践建议</h3>
<ul>
<li>不要安装无效软件包</li>
<li>应简化镜像中同时运行的进程数，理想状况下，每个镜像应该只有1个进程
<ul>
<li>这样利于管理容器：当把一个传统巨石架构的应用移植到容器平台时，想要一下就成为这种1个容器运行1个进程的架构是比较困难的。经常会有一些伴生的进程，所以这只是指导原则，当做不到的时候，也会把多个进程放在同一个容器中，这时就要选择合理的初始化进程.</li>
</ul>
</li>
<li>当无法避免同一镜像运行多进程时，应选择合理的初始化进程(init process)</li>
<li>最小化层级数
<ul>
<li>最新的docker只有<code v-pre>RUN</code>、<code v-pre>COPY</code>、<code v-pre>ADD</code>指令会创建新的层，其他指令创建的是临时层，不会影响最终镜像的大小
<ul>
<li>比如<code v-pre>EXPOSE</code>指令就不会生成新的层</li>
</ul>
</li>
<li>通过多段构建减少镜像层数</li>
<li>将命令用<code v-pre>&amp;&amp;</code>连接起来，仅执行1条<code v-pre>RUN</code>指令，可以减少层数</li>
</ul>
</li>
<li>把多行参数按字母排序，可以减少可能出现的重复参数，并且提高可读性</li>
<li>编写Dockerfile时，应该把变更频率低的编译指令优先构建，以便放在镜像底层，这样能够有效利用构建缓存(build cache)</li>
<li>复制文件时，每个文件应独立复制，这确保某个文件变更时，只影响文件对应的缓存</li>
</ul>
<p><strong>目标:易管理、少漏洞、镜像小、层级少、利用缓存</strong></p>
<h3 id="多进程的容器镜像" tabindex="-1"><a class="header-anchor" href="#多进程的容器镜像" aria-hidden="true">#</a> 多进程的容器镜像</h3>
<p>一般来说，都是推荐单进程的，毕竟根据 namespace 原理，一个进程对应一个 app。</p>
<p>但是总会有依赖的，也就是多进程。</p>
<p>推荐应该选择适当的init进程</p>
<ul>
<li>需要捕获SIGTERM信号并完成子进程的优雅终止</li>
<li>负责清理退出的子进程以避免僵尸进程</li>
</ul>
<p>这方面上如果做的不好,就会出现很大问题:</p>
<p>当Kubernetes要去终止一个进程时，会发送一个SIGTERM终止信号给容器，以便容器能够优雅退出。但如果容器这一侧做的不够好，就会出现问题。</p>
<p>比如容器中有一个初始化进程（init），用于拉起主进程。则来自Kubernetes的SIGTERM信号发送到初始化进程时，初始化进程并没有把信号传递给主进程，而是直接把这个信号给无视了。这样应用就失去了优雅终止的可能性，最终应用只能被<code v-pre>kill -9</code>，有可能导致业务故障。</p>
<p>或许这时候你应该需要 <a href="https://github.com/krallin/tini" target="_blank" rel="noopener noreferrer">Tini<ExternalLinkIcon/></a> - 小巧但适用<code v-pre>init</code>于容器，<code v-pre>init</code>Tini 是您能想到的最简单的。</p>
<p>Tini 所做的只是生成一个子进程（Tini 应该在容器中运行），并等待它退出，同时收割僵尸并执行信号转发。</p>
<h3 id="docker-tag-与-github-的版本管理" tabindex="-1"><a class="header-anchor" href="#docker-tag-与-github-的版本管理" aria-hidden="true">#</a> docker tag 与 GitHub 的版本管理</h3>
<p><strong>以Kuberbetes为例：</strong></p>
<ul>
<li>开发分支
<ul>
<li><code v-pre>git checkout master</code></li>
</ul>
</li>
<li>Release分支
<ul>
<li><code v-pre>git checkout -b release-1.21</code></li>
</ul>
</li>
<li>在并行期，所有变更同时进<code v-pre>master</code>和<code v-pre>release branch</code></li>
<li>版本发布
<ul>
<li>以 <code v-pre>release branch</code>为基础构建镜像,并为镜像标记版本信息</li>
<li><code v-pre>docker tag 93b6fb6b8635 k8s.io/kubernetes.apiserver:v1.21</code></li>
</ul>
</li>
<li>在github中保存<code v-pre>release</code>代码快照
<ul>
<li><code v-pre>git tag v1.21</code></li>
</ul>
</li>
</ul>
<blockquote>
<p>此时 标签 就对上了</p>
</blockquote>
<h3 id="docker-私有仓库" tabindex="-1"><a class="header-anchor" href="#docker-私有仓库" aria-hidden="true">#</a> docker 私有仓库</h3>
<p>如今私有仓库几乎是企业必备的需求，而且以前 docker 基础提高过：</p>
<p>在 <a href="https://docker.cubxxw.com/Cloud-Native-k8s/15.html#%E7%A7%81%E6%9C%89%E4%BB%93%E5%BA%93" target="_blank" rel="noopener noreferrer">k3s 教程中<ExternalLinkIcon/></a> 我们补充过 Kubernetes 、 k3s 私有注册表的配置，我们再提一提：</p>
<ul>
<li>docker hub : https://hub.docker.com</li>
</ul>
<blockquote>
<p>docker 官方镜像有 <a href="https://docker.cubxxw.com" target="_blank" rel="noopener noreferrer">文档，之前做过笔记<ExternalLinkIcon/></a>  就不提了</p>
</blockquote>
<p><strong>查看 registry 私有镜像仓库：</strong></p>
<p><img src="http://sm.cubxxw.com/sm202303022355132.png" alt="image-20230302235533019"></p>
<p><strong>使用registry镜像创建私有仓库：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> 宿主机端口:容器端口 registry:TAG
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行官方提供的<code v-pre>registry</code>镜像。(注：官方建议<code v-pre>TAG</code>为2)，你还需要的参数：</p>
<ul>
<li><code v-pre>-v</code>，<code v-pre>--volume</code>：挂载宿主机上的文件卷到容器内。仓库默认被创建在容器的<code v-pre>/var/lib/registry</code>目录下。可使用该参数指定镜像文件存放的路径.</li>
</ul>
<h4 id="案例-4" tabindex="-1"><a class="header-anchor" href="#案例-4" aria-hidden="true">#</a> 案例</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>❯ <span class="token builtin class-name">export</span> <span class="token assign-left variable">REG</span><span class="token operator">=</span><span class="token string">"/opt/data/registry"</span>
❯ <span class="token function">mkdir</span> <span class="token parameter variable">-p</span> <span class="token variable">$REG</span><span class="token punctuation">;</span><span class="token builtin class-name">cd</span> <span class="token variable">$REG</span>
❯ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">-p</span> <span class="token number">5003</span>:5000 <span class="token parameter variable">-v</span> <span class="token variable">$REG</span>:/var/lib/registry registry:2
30c6d0d0ac384d60f72c04e6fb479fab6baeb20fe64790248896b139b591e20a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>查看结果：</strong></p>
<p><img src="http://sm.cubxxw.com/sm202303030002418.png" alt="image-20230303000238300"></p>
<h4 id="管理私有仓库" tabindex="-1"><a class="header-anchor" href="#管理私有仓库" aria-hidden="true">#</a> 管理私有仓库</h4>
<p>我当前的环境：</p>
<ul>
<li>搭建私有仓库虚拟机 Ubuntu-master01：<code v-pre>192.168.137.133</code></li>
<li>私有仓库端口如上：<code v-pre>5003</code></li>
<li>另一台客户机，虚拟机地址：<code v-pre>192.168.137.134</code></li>
</ul>
<p><strong>在客户机上拉取镜像<code v-pre>ubuntu:18.04</code></strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># docker pull ubuntu:18.04</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>在客户机上使用<code v-pre>docker tag</code>命令,将该镜像标记为<code v-pre>192.168.137.133:5003/test</code></strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># docker tag ubuntu:18.04 192.168.137.133:5003/test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>在客户机上添加信任的私有仓库列表</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># cat /etc/docker/daemon.json </span>
<span class="token punctuation">{</span>
    <span class="token string">"registry-mirrors"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span><span class="token string">"https://sb6xpp51.mirror.aliyuncs.com"</span><span class="token punctuation">]</span>,
    <span class="token string">"insecure-registries"</span><span class="token builtin class-name">:</span> <span class="token punctuation">[</span>
    	<span class="token string">"192.168.137.133:5003"</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在客户机上使用<code v-pre>docker push</code>上传标记的镜像</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># docker push 192.168.137.133:5003/test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>在客户机上使用<code v-pre>curl</code>查看仓库<code v-pre>192.168.0.152:5000</code>中的镜像</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># curl -XGET http://192.168.137.133:5003/v2/_catalog</span>
<span class="token punctuation">{</span><span class="token string">"repositories"</span>:<span class="token punctuation">[</span><span class="token string">"test"</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>在客户机上删除打过TAG的镜像,以便后续测试拉取</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># docker images</span>
<span class="token comment"># docker rmi 192.168.137.133:5003/test</span>
<span class="token comment"># docker images</span>

<span class="token comment"># docker pull 192.168.137.133:5003/test</span>
<span class="token comment"># docker images</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '45.md' style='float:left'>⬆️上一节🔗  </a><a href = '47.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


