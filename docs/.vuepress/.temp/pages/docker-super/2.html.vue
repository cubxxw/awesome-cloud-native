<template><div><ul>
<li><a href="https://github.com/cubxxw/awesome-cloud-native" target="_blank" rel="noopener noreferrer">🔥 开源地址<ExternalLinkIcon/></a></li>
</ul>
<h1 id="第2节-命名空间" tabindex="-1"><a class="header-anchor" href="#第2节-命名空间" aria-hidden="true">#</a> 第2节 命名空间</h1>
<br>
<div><a href = '1.md' style='float:left'>⬆️上一节🔗  </a><a href = '3.md' style='float: right'>  ⬇️下一节🔗</a></div>
<br>
<blockquote>
<p>❤️💕💕实现当初学习docker的愿望，自己撸一个docker，为云原生开发充实基础。Myblog:<a href="http://cubxxw.com/" target="_blank" rel="noopener noreferrer">http://cubxxw.com<ExternalLinkIcon/></a></p>
</blockquote>
<hr>
<nav class="table-of-contents"><ul><li><router-link to="#前言">前言</router-link></li><li><router-link to="#linux-namespace">Linux Namespace</router-link></li><li><router-link to="#create-a-pid">create a  pid</router-link></li><li><router-link to="#update-go-code-about-unshare">update go-code about unshare</router-link><ul><li><router-link to="#issues">Issues</router-link></li><li><router-link to="#solution">Solution</router-link></li><li><router-link to="#ref">Ref</router-link></li></ul></li><li><router-link to="#end-链接">END 链接</router-link></li></ul></nav>
<p>[TOC]</p>
<h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2>
<div class="custom-container tip"><p class="custom-container-title">提示</p>
<p>基础篇两篇讲解 rootfs 我们直接上手即可</p>
</div>
<h2 id="linux-namespace" tabindex="-1"><a class="header-anchor" href="#linux-namespace" aria-hidden="true">#</a> Linux Namespace</h2>
<table>
<thead>
<tr>
<th style="text-align:center">Namespace类型</th>
<th style="text-align:center">系统调用参数</th>
<th style="text-align:center">内核版本</th>
<th style="text-align:center">用途</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center">Mount Namespace</td>
<td style="text-align:center">CLONE NEWNS</td>
<td style="text-align:center">2.4.19</td>
<td style="text-align:center">隔离进程看到挂载点视图</td>
</tr>
<tr>
<td style="text-align:center">UTS Namespace</td>
<td style="text-align:center">CLONE NEWUTS</td>
<td style="text-align:center">2.6.19</td>
<td style="text-align:center">隔离nodename和domainname</td>
</tr>
<tr>
<td style="text-align:center">IPC Namespace</td>
<td style="text-align:center">CLONE NEWIPC</td>
<td style="text-align:center">2.6.19</td>
<td style="text-align:center">隔离System V IPC 和 POSIX Message Queues</td>
</tr>
<tr>
<td style="text-align:center">PID Namespace</td>
<td style="text-align:center">CLONE NEWPID</td>
<td style="text-align:center">2.6.24</td>
<td style="text-align:center">隔离进程ID</td>
</tr>
<tr>
<td style="text-align:center">Network Namespace</td>
<td style="text-align:center">CLONE NEWNET</td>
<td style="text-align:center">2.6.29</td>
<td style="text-align:center">隔离网络设备，IP地址端口等网络栈</td>
</tr>
<tr>
<td style="text-align:center">User Namespace</td>
<td style="text-align:center">CLONE NEWUSER</td>
<td style="text-align:center">3.8</td>
<td style="text-align:center">隔离用户组ID</td>
</tr>
</tbody>
</table>
<p>Linux kernel Clone flags https://man7.org/linux/man-pages/man2/clone.2.html</p>
<blockquote>
<p>所以说 归到底还是和Linux特别熟悉~，这种熟悉可能不仅仅是cmd</p>
</blockquote>
<h2 id="create-a-pid" tabindex="-1"><a class="header-anchor" href="#create-a-pid" aria-hidden="true">#</a> create a  pid</h2>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>[root@VM-4-6-centos ~]# sudo unshare --fork --pid --mount-proc bash
[root@VM-4-6-centos ~]# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD
root         1     0  0 22:18 pts/1    00:00:00 bash
root        32     1  0 22:18 pts/1    00:00:00 ps -ef
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><em>Of course you can set it yourself</em></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>unshare --help
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote>
<p><strong>run cmd in child and parent shell:</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>root@VM-4-6-centos ~<span class="token punctuation">]</span><span class="token comment"># ps -ef</span>
<span class="token environment constant">UID</span>        PID  <span class="token environment constant">PPID</span>  C STIME TTY          TIME CMD
root         <span class="token number">1</span>     <span class="token number">0</span>  <span class="token number">0</span> <span class="token number">22</span>:18 pts/1    00:00:00 <span class="token function">bash</span>
root        <span class="token number">32</span>     <span class="token number">1</span>  <span class="token number">0</span> <span class="token number">22</span>:18 pts/1    00:00:00 <span class="token function">ps</span> <span class="token parameter variable">-ef</span>
<span class="token punctuation">[</span>root@VM-4-6-centos ~<span class="token punctuation">]</span><span class="token comment"># sleep 1000 &amp;</span>
<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token number">33</span>
<span class="token punctuation">[</span>root@VM-4-6-centos ~<span class="token punctuation">]</span><span class="token comment"># ll /proc/33/n</span>
net/       ns/        numa_maps  
<span class="token punctuation">[</span>root@VM-4-6-centos ~<span class="token punctuation">]</span><span class="token comment"># ll /proc/33/ns</span>
total <span class="token number">0</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Nov <span class="token number">15</span> <span class="token number">22</span>:22 ipc -<span class="token operator">></span> ipc:<span class="token punctuation">[</span><span class="token number">4026531839</span><span class="token punctuation">]</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Nov <span class="token number">15</span> <span class="token number">22</span>:22 mnt -<span class="token operator">></span> mnt:<span class="token punctuation">[</span><span class="token number">4026532627</span><span class="token punctuation">]</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Nov <span class="token number">15</span> <span class="token number">22</span>:22 net -<span class="token operator">></span> net:<span class="token punctuation">[</span><span class="token number">4026531956</span><span class="token punctuation">]</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Nov <span class="token number">15</span> <span class="token number">22</span>:22 pid -<span class="token operator">></span> pid:<span class="token punctuation">[</span><span class="token number">4026532628</span><span class="token punctuation">]</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Nov <span class="token number">15</span> <span class="token number">22</span>:22 user -<span class="token operator">></span> user:<span class="token punctuation">[</span><span class="token number">4026531837</span><span class="token punctuation">]</span>
lrwxrwxrwx <span class="token number">1</span> root root <span class="token number">0</span> Nov <span class="token number">15</span> <span class="token number">22</span>:22 uts -<span class="token operator">></span> uts:<span class="token punctuation">[</span><span class="token number">4026531838</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>compare the /proc：</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>ll /proc/<span class="token operator">&lt;</span>pid<span class="token operator">></span>/ns
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="update-go-code-about-unshare" tabindex="-1"><a class="header-anchor" href="#update-go-code-about-unshare" aria-hidden="true">#</a> update go-code about unshare</h2>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span><span class="token punctuation">(</span>
	<span class="token string">"os"</span>
	<span class="token string">"fmt"</span>
	<span class="token string">"os/exec"</span>
	<span class="token string">"syscall"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">)</span>
	<span class="token keyword">switch</span> os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token string">"run"</span><span class="token punctuation">:</span>
			<span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
		<span class="token keyword">default</span><span class="token punctuation">:</span>
			<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"have not define"</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	cmd <span class="token operator">:=</span> exec<span class="token punctuation">.</span><span class="token function">Command</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
	cmd<span class="token punctuation">.</span>SysProcAttr <span class="token operator">=</span> <span class="token operator">&amp;</span>syscall<span class="token punctuation">.</span>SysProcAttr<span class="token punctuation">{</span>
		Cloneflags<span class="token punctuation">:</span> syscall<span class="token punctuation">.</span>CLONE_NEWUTS<span class="token punctuation">,</span>
	<span class="token punctuation">}</span>
	cmd<span class="token punctuation">.</span>Stdin <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdin
	cmd<span class="token punctuation">.</span>Stdout <span class="token operator">=</span> os<span class="token punctuation">.</span>Stdout
	cmd<span class="token punctuation">.</span>Stderr <span class="token operator">=</span> os<span class="token punctuation">.</span>Stderr
	<span class="token keyword">if</span> err<span class="token operator">:=</span>cmd<span class="token punctuation">.</span><span class="token function">Run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> err<span class="token operator">!=</span><span class="token boolean">nil</span><span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="issues" tabindex="-1"><a class="header-anchor" href="#issues" aria-hidden="true">#</a> Issues</h3>
<div class="language-go ext-go line-numbers-mode"><pre v-pre class="language-go"><code><span class="token builtin">panic</span><span class="token punctuation">:</span> fork<span class="token operator">/</span>exec <span class="token operator">/</span>bin<span class="token operator">/</span>sh<span class="token punctuation">:</span> operation not permitted

goroutine <span class="token number">1</span> <span class="token punctuation">[</span>running<span class="token punctuation">]</span><span class="token punctuation">:</span>
main<span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token operator">/</span><span class="token keyword">go</span><span class="token operator">/</span>src<span class="token operator">/</span>main<span class="token punctuation">.</span><span class="token keyword">go</span><span class="token punctuation">:</span><span class="token number">28</span> <span class="token operator">+</span><span class="token number">0x15c</span>
main<span class="token punctuation">.</span><span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 
	<span class="token operator">/</span><span class="token keyword">go</span><span class="token operator">/</span>src<span class="token operator">/</span>main<span class="token punctuation">.</span><span class="token keyword">go</span><span class="token punctuation">:</span><span class="token number">13</span> <span class="token operator">+</span><span class="token number">0xcc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="solution" tabindex="-1"><a class="header-anchor" href="#solution" aria-hidden="true">#</a> Solution</h3>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>docker run -itd --privileged golang
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="ref" tabindex="-1"><a class="header-anchor" href="#ref" aria-hidden="true">#</a> Ref</h3>
<p>exec.Command: https://pkg.go.dev/os/exec@go1.18.3#Command</p>
<p>SysProcAttr: https://pkg.go.dev/syscall@go1.18.3#SysProcAttr</p>
<h2 id="end-链接" tabindex="-1"><a class="header-anchor" href="#end-链接" aria-hidden="true">#</a> END 链接</h2>
<ul><li><div><a href = '1.md' style='float:left'>⬆️上一节🔗  </a><a href = '3.md' style='float: right'>  ️下一节🔗</a></div></li></ul>
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


